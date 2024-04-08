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
    public class P8FORWController : nwStandardGateway
    {
        public ActionResult Index()
        {
            mainDataAccess main = new mainDataAccess();
            main.MenuAccess(User, this); 
            return View(@"~\P8\DataSetup\P8FORW\P8FORW.cshtml");
        }

        public ActionResult P8FORW_Gateway()
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
                    P8FORWBL menuBL = new P8FORWBL();
                    based.Title = "P8 FORW";
                    string strUser = "";

   


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