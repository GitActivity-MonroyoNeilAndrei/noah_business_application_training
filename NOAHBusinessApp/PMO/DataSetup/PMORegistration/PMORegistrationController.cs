using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


using System.Web.Mvc;
using NoahWebLib.Standards;
using Noah_Web.forms_BusinessLayer;
using NoahWebMainLib.NoahWebMainDataAccess;
using DALComponent;

namespace NOAHBusinessApp.Controllers.PMO
{
    public class PMORegistrationController : nwStandardGateway
    {
        public ActionResult Index()
        {

            nwStandardUploadingSnipet nwUpload = new nwStandardUploadingSnipet(this);
            nwUpload.UploadDefaultConfig();

            isPublic = true;
            mainDataAccess main = new mainDataAccess();
            main.MenuAccessPublic(User, this);


            return View(@"~\PMO\DataSetup\PMORegistration\PMORegistration.cshtml");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Upload()
        {
            //app layer
            nwStandardUploadingSnipet nwUpload = new nwStandardUploadingSnipet(this);
            
            nwUpload.UploadLink = "PMORegistration/Upload";
            nwUpload.AdditonalPath = "PMORegistration";
            nwUpload.Bind();

            nwUpload.Upload_Start();
            //your code
            //nwUpload.UploadingType = nwStandardUploading.nwUploadingType.CurrentMenuPath;
            //nwUpload.UploadingType = nwStandardUploading.nwUploadingType.DefaultServerPath;
            Gateway_Start(User, this);
            nwUpload.UploadingType = nwStandardUploading.nwUploadingType.UserDefinedPath;
            PMORegistrationDAL dal = new PMORegistrationDAL(this.Connection, based.SecurityAccess.ConnectionString, "");
            nwUpload.DestinationPath = dal.serverPath();

            nwUpload.Upload_End();

            return null;
        }


        public ActionResult PMORegistration_Gateway()
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
                    PMORegistrationBL PMORegistrationBL = new PMORegistrationBL();
                    based.Title = "Portal Registration";
                    PMORegistrationBL.main(ref strFinal, strmet,
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