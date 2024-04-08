using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


using System.Web.Mvc;
using NoahWebLib.Standards;
using Noah_Web.forms_BusinessLayer;
using NoahWebMainLib.NoahWebMainDataAccess;

namespace NOAHBusinessApp.Controllers.RE
{
    public class P8FORWViewerController : nwStandardGateway
    {
        public ActionResult Index()
        {
            mainDataAccess main = new mainDataAccess();
            main.MenuAccess(User, this); 
            return View(@"~\P8\ReportsAndInquiry\P8FORWViewer\P8FORWViewer.cshtml");
        }

        public ActionResult P8FORWViewer_Gateway()
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
                    P8FORWViewerBL menuBL = new P8FORWViewerBL();
                    based.Title = "P8 FORW";
                    this.Connection = NoahWebLib.nwSystem.CoreDB_ConnectionString();
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