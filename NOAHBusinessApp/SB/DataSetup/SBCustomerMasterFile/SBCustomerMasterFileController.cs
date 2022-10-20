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
    public class SBCustomerMasterFileController : nwStandardGateway
    {
        public ActionResult Index()
        {
            nwStandardUploadingSnipet nwUpload = new nwStandardUploadingSnipet(this);
            nwUpload.UploadDefaultConfig();

            mainDataAccess main = new mainDataAccess();
            main.MenuAccess(User, this);
            return View(@"~\SB\DataSetup\SBCustomerMasterFile\SBCustomerMasterFile.cshtml");
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Upload()
        {
            //app layer
            nwStandardUploadingSnipet nwUpload = new nwStandardUploadingSnipet(this);
            nwUpload.UploadLink = "SBCustomerMasterFile/Upload";
            nwUpload.AdditonalPath = "SBCustomerMasterFile";
            nwUpload.Bind();

            nwUpload.Upload_Start();
            //your code
            nwUpload.UploadingType = nwStandardUploading.nwUploadingType.DefaultServerPath;
            nwUpload.Upload_End();

            return null;
        }

        public ActionResult SBCustomerMasterFile_Gateway()
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
                    SBCustomerMasterFileBL menuBL = new SBCustomerMasterFileBL();
                    based.Title = "My Customers";
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