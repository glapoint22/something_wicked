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
public class SomethingWicked : System.Web.Services.WebService
{
    [WebMethod]
    public void GetSlideImages()
    {
        //Grab all the images that are in the slide images folder
        string imageFolder = "Slide_Images";
        string[] images = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory + "/" + imageFolder).Select(file => imageFolder + "/" + Path.GetFileName(file)).ToArray();

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
        List<Song> Songs = new List<Song>();

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
                Songs.Add(song);
            }

            con.Close();
        }

        JavaScriptSerializer js = new JavaScriptSerializer();
        string json = js.Serialize(Songs);
        Context.Response.Write(json);
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
