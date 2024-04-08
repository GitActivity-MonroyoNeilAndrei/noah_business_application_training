using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NOAHBusinessApp.Controllers
{
    public class SCMSController : Controller
    {
        // GET: SCMS
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SaveGsheet()
        {
            string token = ""; string sUser = ""; string sUrl = "";
            try
            {
                token = Request.QueryString["token"].ToString();
            }
            catch { }
            try
            {
                sUser = Request.QueryString["sUser"].ToString();
            }
            catch { }
            try
            {
                sUrl = Request.QueryString["sUrl"].ToString();
            }
            catch { }


            string xuser = User.Identity.Name.ToString();
            string jsonresult = "{}";
            if(xuser != "")
            {
                // save
                // Get data to this sUrl
                jsonresult = "{\"status\":200,\"message\":\"save sucssfully: " + sUrl + "\"}";
            }
            else
            {
                jsonresult = "{\"status\":400,\"message\":\"Invalid Login\"}";
            }
            //token validated 
            Response.Clear();
            Response.Write(jsonresult);
            return null;
        }
    }
}