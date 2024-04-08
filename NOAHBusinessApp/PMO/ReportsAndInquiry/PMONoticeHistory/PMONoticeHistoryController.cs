using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


using System.Web.Mvc;
using NoahWebLib.Standards;
using Noah_Web.forms_BusinessLayer;
using NoahWebMainLib.NoahWebMainDataAccess;

namespace NOAHBusinessApp.Controllers.SB
{
    public class PMONoticeHistoryController : nwStandardGateway
    {
        public ActionResult Index()
        {
            mainDataAccess main = new mainDataAccess();
            main.MenuAccess(User, this); //security
            return View(@"~\PMO\ReportsAndInquiry\PMONoticeHistory\PMONoticeHistory.cshtml");
        }

        public ActionResult PMONoticeHistory_Gateway()
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
                    PMONoticeHistoryBL menuBL = new PMONoticeHistoryBL();
                    based.Title = "Notice History";
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