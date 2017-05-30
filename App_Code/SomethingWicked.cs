using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Serialization;
using System.IO;

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
    public void GetImages()
    {
        string[] images = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory + "/Images").Select(file => "Images/" + Path.GetFileName(file)).ToArray();

        JavaScriptSerializer js = new JavaScriptSerializer();
        Context.Response.Write(js.Serialize(images));
    }

}
