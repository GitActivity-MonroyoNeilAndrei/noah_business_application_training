using InterfaceV3.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using NoahWebLib;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

using InterfaceV3;

namespace NOAHBusinessApp.Controllers
{
   // [Authorize]
    public class DefaultController : Controller
    {
        // GET: Default
        nwSFObjects SFObjects = new nwSFObjects();


        //public ActionResult Index()
        public async Task<ActionResult> Index()
        {
            NoahWebLib.Standards.nwStandardApp.LoadSecurity(Response);

            string key = "";
            string suser = "";

            try
            {
                key = Request.QueryString["lky"].ToString();
                key = nwSystem.StringDecryptAES(key);

                suser = key.Split('|')[1].ToString();

            }
            catch { }

            if (suser.Trim() != "")
            {
                try



                {
                    string UName = nwSystem.FilterSQL(suser);
                   
                    string pass = SFObjects.returnText("Select password from [fpti].[user] where code = '"+ UName + "'", nwSystem.ARKDB_ConnectionString());

                    pass = nwSystem.StringDecrypt(pass);

                    var result = await SignInManager.PasswordSignInAsync(UName, pass, false, shouldLockout: false);

                    //UName = nwSystem.StringDecrypt(UName);
                    FormsAuthentication.RedirectFromLoginPage(UName, false);


                }
                catch { }
                // Response.Redirect("~/home/?" + Request.QueryString.ToString());
                RedirectToAction("home", "index");

            }
            else
            {
               // Response.Redirect("~/account/LogOff/?" + Request.QueryString.ToString());
                RedirectToAction("account", "LogOff");
            }

            return null;
        }



        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;



        //public DefaultController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        //{
        //    UserManager = userManager;
        //    SignInManager = signInManager;
        //}

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }



    }

  
}