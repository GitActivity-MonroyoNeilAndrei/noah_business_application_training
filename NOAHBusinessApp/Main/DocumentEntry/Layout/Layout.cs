using DALComponent;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Web;
//using System.Web.Mvc;
using NoahWebLib;
using System.Data;

using System.Web.Mvc;

namespace NOAHBusinessApp.Main.DocumentEntry
{
    public class Layout
    {
        public class NKSystemDefault
        {
            public bool isPopup = false;
        }
        
        public static NKSystemDefault SetSystemDefaults(System.Web.HttpContextBase Context, IPrincipal User)
        {
            

            NKSystemDefault def = new NKSystemDefault();
            string strpop = "";
            try
            {
                strpop = Context.Request.QueryString["nkpop"].ToString();
            }
            catch { }
            if(strpop == "y") def.isPopup = true;



            return def;
        }
        public static string SetDefaults(IPrincipal User)
        {
            LayoutDAL dal;

            string dbcon = nwSystem.Noah_ConnectionString(); // change if dyanmic
            dal = new LayoutDAL(dbcon,nwSystem.ARKDB_ConnectionString(), "");
            string strf = "";
            string recuser = User.Identity.GetUserName();
            
            //General
            try
            {
                string server = nwSystem.GetServerLink(dbcon);
                strf += $"$ServerLink=`{server}`;";

               

                //Company Logo
                DataTable dtLogo = dal.getLogo();
                string imagestring = picChange(dtLogo.Rows[0][0]);
                strf += "$(`.hdr-logo`).attr(`src`,`" + imagestring + "`);";

                string banner = dal.getBanner();
                string file = banner.Replace("#baselink#", "").Replace("\\", "/");
                strf += "ChangeBanner(`" + file + "`);";

                //Seller Picture
                string image = dal.getUserImage(recuser);
                image = image.Replace("\\", "//");
                strf += "ChangeUserImage(`" + image + "`);";


                //strf = "<script id =`sdefault`>"+ strf + "</script>";
            }
            catch (Exception e) {
                strf = e.ToString();
            }
            return strf;
        }

        static string picChange(object img)
        {
            string strFinal = "";
            try
            {
                if (img != null)
                {
                    var b64String = Convert.ToBase64String((byte[])img);
                    var dataUrl = "data:image/png;base64," + b64String;
                    strFinal = dataUrl;
                }
            }
            catch (Exception e)
            {
                //strFinal = e.ToString();
            }
            return strFinal;
        }
    }
}