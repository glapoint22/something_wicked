using System;
using System.Linq;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.IO;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.Collections.Generic;
using System.Text.RegularExpressions;

/// <summary>
/// Summary description for SomethingWicked
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class SomethingWicked : WebService
{
    private string slideImages = "Images/Slide_Images/";

    [WebMethod]
    public void GetData()
    {
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        Data data = new Data();

        using (SqlConnection con = new SqlConnection(cs))
        {
            data.images = GetSlideImages();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Connection = con;
            
            //Open the connection
            con.Open();

            //Get the data
            data.shows = GetSchedule(con, cmd);
            data.songs = GetSongs(con, cmd);
            data.videos = GetVideos(con, cmd);
            data.photos = GetDisplayPhotos(con, cmd);
            data.members = GetMembers(con, cmd);

            //Close the connection
            con.Close();
        }

        JavaScriptSerializer js = new JavaScriptSerializer();
        string json = js.Serialize(data);
        json = Regex.Replace(json, @"\""\\/Date\((\d+)\)\\/\""", "$1");
        json = Regex.Replace(json, "\\watch\\?\\w+=(.{11})(\\\\\\w+=[\\w\\.-]+)*", "embed/$1?autoplay=1");
        Context.Response.Write(json);
    }



    private string[] GetSlideImages()
    {
        //Grab all the images that are in the slide images folder
        return Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory + "/" + slideImages).Select(file => slideImages + Path.GetFileName(file)).ToArray();
    }


    private List<Show> GetSchedule(SqlConnection con, SqlCommand cmd)
    {
        List<Show> schedule = new List<Show>();

        
        cmd.CommandText = "GetSchedule";
        SqlDataReader rdr = cmd.ExecuteReader();

        while (rdr.Read())
        {
            Show show = new Show();
            show.dateTime = (DateTime)rdr["DateTime"];
            show.venue = rdr["Venue"].ToString();
            show.location = rdr["Location"].ToString();
            show.URL = rdr["URL"].ToString();
            show.duration = (float)rdr.GetDouble(4);
            schedule.Add(show);
        }
        rdr.Close();
        return schedule;
    }

    private List<Song> GetSongs(SqlConnection con, SqlCommand cmd)
    {
        List<Song> songs = new List<Song>();
        cmd.CommandText = "GetMusic";
        SqlDataReader rdr = cmd.ExecuteReader();

        while (rdr.Read())
        {
            Song song = new Song();
            song.name = rdr["Song"].ToString();
            song.artist = rdr["Artist"].ToString();
            song.genre = rdr["Genre"].ToString();
            song.URL = rdr["URL"].ToString();
            songs.Add(song);
        }

        rdr.Close();
        return songs;
    }


    private List<Media> GetVideos(SqlConnection con, SqlCommand cmd)
    {
        List<Media> videos = new List<Media>();
        cmd.CommandText = "GetVideos";
        SqlDataReader rdr = cmd.ExecuteReader();

        while (rdr.Read())
        {
            Media video = new Media();
            video.title = rdr["Title"].ToString();
            video.thumbnail = rdr["Thumbnail"].ToString();
            video.URL = rdr["URL"].ToString();
            videos.Add(video);
        }

        rdr.Close();
        return videos;
    }


    private List<Media> GetDisplayPhotos(SqlConnection con, SqlCommand cmd)
    {
        List<Media> photos = new List<Media>();
        cmd.CommandText = "GetPhotos";
        SqlDataReader rdr = cmd.ExecuteReader();

        while (rdr.Read())
        {
            Media photo = new Media();
            photo.title = rdr["Title"].ToString();
            photo.thumbnail = rdr["Thumbnail"].ToString();
            photo.URL = rdr["URL"].ToString();
            photos.Add(photo);
        }
        rdr.Close();
        return photos;
    }


    [WebMethod]
    public void GetPhotos(string photosDirectory)
    {
        //Grab all the images that are in the specified photos folder
        string[] photos = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory + "/" + photosDirectory).Select(file => photosDirectory + Path.GetFileName(file)).ToArray();

        //Serialize the images array to json and send the response
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(photos));
    }


    private List<Media> GetMembers(SqlConnection con, SqlCommand cmd)
    {
        List<Media> members = new List<Media>();
        cmd.CommandText = "GetMembers";
        SqlDataReader rdr = cmd.ExecuteReader();

        while (rdr.Read())
        {
            Media member = new Media();
            member.id = (int)rdr["ID"];
            member.title = rdr["Name"].ToString();
            member.thumbnail = rdr["Thumbnail"].ToString();
            members.Add(member);
        }
        rdr.Close();
        return members;
    }



    [WebMethod]
    public void GetBio(int memberID)
    {
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        string bio = string.Empty;

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();

            SqlCommand cmd = new SqlCommand("GetBio", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@memberID", SqlDbType.Int).Value = memberID;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                bio = rdr["Bio"].ToString();
            }

            con.Close();
        }

        Context.Response.Write(bio);
    }
}


public struct Show
{
    public DateTime dateTime;
    public string venue;
    public string location;
    public string URL;
    public float duration;
}

public struct Song
{
    public string name;
    public string artist;
    public string genre;
    public string URL;
}

public struct Media
{
    public int id;
    public string title;
    public string thumbnail;
    public string URL;
}

public struct Data
{
    public string[] images;
    public List<Show> shows;
    public List<Song> songs;
    public List<Media> videos;
    public List<Media> photos;
    public List<Media> members;
}
