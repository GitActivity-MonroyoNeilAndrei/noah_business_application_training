using NoahWebLib;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using NoahWebMainLib.NoahWebMainDataAccess;
using System.Data;


using NoahWebLib.Standards;
using Noah_Web.forms_BusinessLayer;

namespace InterfaceV3.Controllers
{
    public class HomeController : nwStandardGateway
    {

        public DataSet dsData = new DataSet();
        public ActionResult Index()
        {
            if (!Request.Url.AbsolutePath.ToLower().Contains("/home")) {
                Response.Redirect("home?");
            }
           


            string title = nwSystem.GetAppSettings("PageTitle");
            if(title.Trim() =="" )
                title = "NOAH Business Applications";
            ViewBag.Message = title;

            mainDataAccess main = new mainDataAccess();
            main.isAccessLoad = true;
            dsData =main.UserAccess(User, this);

            return View(@"~\Main\DocumentEntry\Home\Home.cshtml");

        }
        public ActionResult checktoken(string id)
        {
            try {
                nwSystem.TokenKeyValue tk = nwSystem.GetGeneralTokenKeyValue(id);

                Response.Write(tk.key.ToString() + "<br>");
                Response.Write(tk.datetime.ToString() + "<br>");
                Response.Write(tk.randomString.ToString() + "<br>");
                Response.Write(tk.user.ToString() + "<br>");
            } catch(Exception err)
            {
                Response.Write(err.ToString());
            }
            return null;
        }


        public ActionResult Home_Gateway()
        {
            #region  Variable needed dafaulted all as true
            isErrorCheckerMessageShow = true;
            isCompanyGet = true;
            #endregion

            Gateway_Start(User, this);

            if (DLLAutoGateway == false) // for redirecting of BL (4 tier)
            {
                try
                {
                    HomeBL menuBL = new HomeBL();
                    based.Title = "Home";
                    menuBL.main(ref strFinal, strmet,
                                            strParameter, strValue, strtool_Met,
                                            strtool_Poz, strtemp1, strtemp2,
                                            strtemp3, strtemp4, strtemp5, ref based, this.Connection);

                }
                catch (Exception err)
                {
                    strFinal = err.Message.ToString();
                }



                Gateway_End(User, this);
            }
            return null;
        }



    }
}