using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


using System.Web.Mvc;
using NoahWebLib.Standards;
using Noah_Web.forms_BusinessLayer;

namespace NOAHBusinessApp.Controllers.SA
{
    public class SAUserAccessReportController : nwStandardGateway
    {

        public ActionResult Index()
        {

            return View(@"~\SA\ReportsAndInquiry\SAUserAccessReport\SAUserAccessReport.cshtml");

        }

        public ActionResult SAUserAccessReport_Gateway()
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
                    SAUserAccessReportBL menuBL = new SAUserAccessReportBL();
                    based.Title = "User Access Report";
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