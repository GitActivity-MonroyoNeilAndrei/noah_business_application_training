using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


using System.Web.Mvc;
using NoahWebLib.Standards;
using Noah_Web.forms_BusinessLayer;
using NoahWebMainLib.NoahWebMainDataAccess;

namespace NOAHBusinessApp.Controllers.IV
{
    public class APApprovedPaymentRequestEntryController : nwStandardGateway
    {

        public ActionResult Index()
        {
            nwStandardUploadingSnipet nwUpload = new nwStandardUploadingSnipet(this);
            nwUpload.UploadDefaultConfig();

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
            return View(@"~\AP\DocumentEntry\APApprovedPaymentRequestEntry\APApprovedPaymentRequestEntry.cshtml");
        }

        public ActionResult APApprovedPaymentRequestEntry_Gateway()
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
                    APApprovedPaymentRequestEntryBL APApprovedPaymentRequestEntryBL = new APApprovedPaymentRequestEntryBL();
                    based.Title = "Approved Payment Request Entry";
                    APApprovedPaymentRequestEntryBL.main(ref strFinal, strmet,
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