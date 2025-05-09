﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


using System.Web.Mvc;
using NoahWebLib.Standards;
using Noah_Web.forms_BusinessLayer;
using NoahWebMainLib.NoahWebMainDataAccess;

namespace NOAHBusinessApp.Controllers.SB
{
    public class APBIRFormsAuthorizedSignatoryReportController : nwStandardGateway
    {
        public ActionResult Index()
        {
            mainDataAccess main = new mainDataAccess();
            bool isvalid = false;
            try
            {
                if (Request.QueryString["nwtk"].ToString() != "")
                {
                    isvalid = true;
                }
            }
            catch { }
            if (isvalid == false)
            {
                main.MenuAccess(User, this);
            }
            return View(@"~\AP\ReportsAndInquiry\APBIRFormsAuthorizedSignatoryReport\APBIRFormsAuthorizedSignatoryReport.cshtml");
        }

        public ActionResult APBIRFormsAuthorizedSignatoryReport_Gateway()
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
                    APBIRFormsAuthorizedSignatoryReportBL menuBL = new APBIRFormsAuthorizedSignatoryReportBL();
                    based.Title = "BIR Forms Authorized Signatory Report";
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