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
    private string videoThumbnails = "Images/Video_Thumbnails/";
    private string photoThumbnails = "Images/Photo_Thumbnails/";
    private string memberThumbnails = "Images/Member_Thumbnails/";



    [WebMethod]
    public void GetSlideImages()
    {
        //Grab all the images that are in the slide images folder
        string[] images = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory + "/" + slideImages).Select(file => slideImages + Path.GetFileName(file)).ToArray();

        //Serialize the images array to json and send the response
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(images));
    }


    [WebMethod]
    public void GetSchedule()
    {
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        List<Show> schedule = new List<Show>();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();

            SqlCommand cmd = new SqlCommand("GetSchedule", con);
            cmd.CommandType = CommandType.StoredProcedure;

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

            con.Close();
        }

        JavaScriptSerializer js = new JavaScriptSerializer();
        string json = js.Serialize(schedule);
        json = Regex.Replace(json, @"\""\\/Date\((\d+)\)\\/\""", "$1");
        Context.Response.Write(json);
    }

    [WebMethod]
    public void GetMusic()
    {
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        List<Song> songs = new List<Song>();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();

            SqlCommand cmd = new SqlCommand("GetMusic", con);
            cmd.CommandType = CommandType.StoredProcedure;

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

            con.Close();
        }

        JavaScriptSerializer js = new JavaScriptSerializer();
        string json = js.Serialize(songs);
        json = Regex.Replace(json, "\\watch\\?\\w+=(.{11})(\\\\\\w+=[\\w\\.-]+)*", "embed/$1?autoplay=1");
        Context.Response.Write(json);
    }


    [WebMethod]
    public void GetVideos()
    {
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        List<Media> videos = new List<Media>();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();

            SqlCommand cmd = new SqlCommand("GetVideos", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                Media video = new Media();
                video.title = rdr["Title"].ToString();
                video.thumbnail = rdr["Thumbnail"].ToString();
                video.URL = rdr["URL"].ToString();
                videos.Add(video);
            }

            con.Close();
        }

        

        JavaScriptSerializer js = new JavaScriptSerializer();
        string json = js.Serialize(videos);
        json = Regex.Replace(json, "(?!thumbnail\\\":\\\")([\\w?-]+\\.png)", videoThumbnails + "$1");
        json = Regex.Replace(json, "\\watch\\?\\w+=(.{11})(\\\\\\w+=[\\w\\.-]+)*", "embed/$1?autoplay=1");
        Context.Response.Write(json);
    }


    [WebMethod]
    public void GetDisplayPhotos()
    {
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        List<Media> videos = new List<Media>();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();

            SqlCommand cmd = new SqlCommand("GetPhotos", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                Media video = new Media();
                video.title = rdr["Title"].ToString();
                video.thumbnail = rdr["Thumbnail"].ToString();
                video.URL = rdr["URL"].ToString();
                videos.Add(video);
            }

            con.Close();
        }



        JavaScriptSerializer js = new JavaScriptSerializer();
        string json = js.Serialize(videos);
        json = Regex.Replace(json, "(?!thumbnail\\\":\\\")([\\w?-]+\\.png)", photoThumbnails + "$1");
        Context.Response.Write(json);
    }


    [WebMethod]
    public void GetPhotos(string photosDir)
    {
        //Grab all the images that are in the specified photos folder
        string[] photos = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory + "/" + photosDir).Select(file => photosDir + Path.GetFileName(file)).ToArray();

        //Serialize the images array to json and send the response
        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(photos));
    }


    [WebMethod]
    public void GetMembers()
    {
        string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
        List<Media> members = new List<Media>();

        using (SqlConnection con = new SqlConnection(cs))
        {
            con.Open();

            SqlCommand cmd = new SqlCommand("GetMembers", con);
            cmd.CommandType = CommandType.StoredProcedure;

            SqlDataReader rdr = cmd.ExecuteReader();

            while (rdr.Read())
            {
                Media member = new Media();
                member.id = (int)rdr["ID"];
                member.title = rdr["Name"].ToString();
                member.thumbnail = rdr["Thumbnail"].ToString();
                members.Add(member);
            }

            con.Close();
        }



        JavaScriptSerializer js = new JavaScriptSerializer();
        string json = js.Serialize(members);
        json = Regex.Replace(json, "(?!thumbnail\\\":\\\")([\\w?-]+\\.png)", memberThumbnails + "$1");
        Context.Response.Write(json);
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
