using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


using System.Web.Mvc;
using NoahWebLib.Standards;
using Noah_Web.forms_BusinessLayer;
using NoahWebMainLib.NoahWebMainDataAccess;
using NoahWebLib;
using System.Data.SqlClient;
using NoahWebLib.Security;

namespace NOAHBusinessApp.Controllers.Standard
{
    public class MenuitemController : nwStandardGateway
    {
        public static string url = "";
        public ActionResult Index()
        {
            //isPublic = true;
            mainDataAccess main = new mainDataAccess();
            main.MenuAccess(User, this);

            string menutitle = "";
            try
            {
                ViewBag.menutitle = "Menuitem";
                menutitle = Request.QueryString["ntitle"].ToString();
                menutitle = nwSystem.StringDecryptAES(menutitle, true);
                ViewBag.menutitle = menutitle;
            }
            catch { }
            string menuversion = "";
            try
            {
                ViewBag.menuversion = "";
                menuversion = Request.QueryString["nver"].ToString();
                menuversion = nwSystem.StringDecryptAES(menuversion, true);
                ViewBag.menuversion = menuversion;
            }
            catch { }
            

            ViewBag.url = getMenuitemLinkDetails();

            //Response.Write("<iframe class='nkFrameMenu' src='"+url+"' ></iframe>");

            return View(@"~\forms_standards\Standard\Menuitem\Menuitem.cshtml");
        }
        public ActionResult NotFound()
        {

            return View(@"~\forms_standards\Standard\Menuitem\MenuItemNotFound.cshtml");
        }
        public ActionResult NoAccess()
        {

            return View(@"~\forms_standards\Standard\Menuitem\MenuItemNoAccess.cshtml");
        }
        



        public string getMenuitemLinkDetails()
        {
            string url = "";
            string nl = "";
            string nmid = "";
            try
            {
                nl=Request.QueryString["plink"].ToString();
                nl =  nwSystem.StringDecryptAES(nl, true);
                url = nl;
            }
            catch { }
            try
            {
                nmid = Request.QueryString["nmid"].ToString();
                nmid = nwSystem.StringDecryptAES(nmid, true);
            }
            catch { }
            if(url != "")
                url=MakeLinkNoahWebConnected(url, nmid);
            else
                url = @"Menuitem\NotFound";


            return url;
        }
        private string MakeLinkNoahWebConnected(string nLink, string nmenuID)
        {
            string strCon = nwSystem.ARKDB_ConnectionString();
            string strConDB = nwSystem.ARKDB_ConnectionString();
            string usercode = "";
            string compcode = "";

            NOAHEncryptor ne = new NOAHEncryptor();
            try { strCon = ne.EncryptToString(strCon); }
            catch { }

            NoahWebLib.Security.nwConfiguration nwconfig = new NoahWebLib.Security.nwConfiguration();
            try {
                compcode = Request.QueryString["nsc"].ToString();
                NoahWebLib.nwSystem.TokenKeyValue tk = NoahWebLib.nwSystem.GetGeneralTokenKeyValue(compcode);
                compcode=tk.key;
                NoahWebLib.nwSFObjects SFObjects = new NoahWebLib.nwSFObjects();
                string dbname = SFObjects.returnText($@"Select RefDatabase from FPTI.[company] where code = '{compcode}'", strConDB);

                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder(strConDB);
                builder.InitialCatalog = dbname;
                strConDB = builder.ConnectionString;
                strConDB = nwconfig.nwEncrpytString(strConDB);
            } catch { }
            
            
            try
            {
                usercode = Request.QueryString["nsu"].ToString();
                NoahWebLib.nwSystem.TokenKeyValue tk = NoahWebLib.nwSystem.GetGeneralTokenKeyValue(usercode);
                usercode = tk.key;
            }
            catch { }


            string str = "";
           
            string strID = usercode;
            string strUsePowerID = usercode;
          

            try { strUsePowerID = ne.EncryptToString(strUsePowerID); }
            catch { }
            try { strID = ne.EncryptToString(strID);}
            catch{}
         
            try
            {
                nmenuID = ne.EncryptToString(nmenuID);
            }
            catch { }

            if (strUsePowerID == strID) { strUsePowerID = ""; }
            else strUsePowerID = "nwpu=" + strUsePowerID;

            if (nLink.IndexOf("?") >= 0)
                str += nLink + "&nwu=" + strID;
            else
                str += nLink + "?nwu=" + strID;


            str += "&nwcom=" + compcode + "&nwmid=" + nmenuID + "&nwcon=" + strCon + "&nwcomc=" + strConDB + "&a2z4i7e=silver&" + strUsePowerID;

            string sessionID = HttpContext.Session.SessionID;
            string key = nwSystem.RandomStrings(15) + "|" + sessionID + "|" + nmenuID;
            key = nwSystem.StringEncrypt(key);
            str += "&nwtk=" + key;
            

            try
            {
               string nwdev = Request.QueryString["nwdev"].ToString();
               if(nwdev == "p8dev") str +=  "&nwdev=p8dev";
            }
            catch { }

                return str;
        }

        public ActionResult Menuitem_Gateway()
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
                    MenuitemBL menuBL = new MenuitemBL();
                    based.Title = "MenuItem";
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