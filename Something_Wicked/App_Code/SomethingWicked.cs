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
    private string photosDirectory = "/Images/Photos/";

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
        //json = Regex.Replace(json, "\\watch\\?\\w+=(.{11})(\\\\\\w+=[\\w\\.-]+)*", "embed/$1?autoplay=1");
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
            song.videoID = rdr["videoID"].ToString();
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
            video.id = rdr["ID"].ToString();
            video.title = rdr["Title"].ToString();
            video.thumbnail = string.Format("http://img.youtube.com/vi/{0}/hqdefault.jpg", video.id);
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
            photo.id = rdr["ID"].ToString();
            photo.title = rdr["Title"].ToString();
            photo.thumbnail = rdr["Thumbnail"].ToString();
            photos.Add(photo);
        }
        rdr.Close();
        return photos;
    }


    [WebMethod]
    public void GetPhotos(string id)
    {
        Photos photos = new Photos();
        photos.list = new string[0];

        if (Directory.Exists(AppDomain.CurrentDomain.BaseDirectory + photosDirectory + id)){

            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand cmd = new SqlCommand("GetPhotosTitle", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@ID", SqlDbType.VarChar).Value = id;

                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    photos.title = rdr["Title"].ToString();
                }

                con.Close();
            }


            //Grab all the images that are in the specified photos folder
            photos.list = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory + photosDirectory + id).Select(file => photosDirectory  + id  + "/" + Path.GetFileName(file)).ToArray();
        }


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
            member.id = rdr["ID"].ToString();
            member.title = rdr["Name"].ToString();
            member.thumbnail = rdr["Thumbnail"].ToString();
            members.Add(member);
        }
        rdr.Close();
        return members;
    }



    [WebMethod]
    public void GetBio(string name)
    {
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        Member member = new Member();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();

            SqlCommand cmd = new SqlCommand("GetBio", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@name", SqlDbType.VarChar).Value = name;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                member.bio = rdr["Bio"].ToString();
                member.name = rdr["Name"].ToString();
                member.thumbnail = rdr["Thumbnail"].ToString();
            }

            con.Close();
        }

        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(member));
    }


    [WebMethod]
    public void GetVideo(string id)
    {
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        Video video = new Video();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();

            SqlCommand cmd = new SqlCommand("GetVideo", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Add("@id", SqlDbType.VarChar).Value = id;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                video.title = rdr["Title"].ToString();
                video.url = string.Format("https://www.youtube.com/embed/{0}?autoplay=1", rdr["ID"].ToString());
            }

            con.Close();
        }

        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(video));
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
    public string videoID;
}

public struct Media
{
    public string id;
    public string title;
    public string thumbnail;
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

public struct Photos
{
    public string title;
    public string[] list;
}

public struct Member
{
    public string bio;
    public string name;
    public string thumbnail;

}
public struct Video
{
    public string title;
    public string url;
}
