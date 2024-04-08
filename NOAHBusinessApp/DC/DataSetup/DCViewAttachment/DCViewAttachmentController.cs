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
    public class DCViewAttachmentController : nwStandardGateway
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
            return View(@"~\DC\DataSetup\DCViewAttachment\DCViewAttachment.cshtml");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Upload()
        {
            //app layer
            nwStandardUploadingSnipet nwUpload = new nwStandardUploadingSnipet(this);
            nwUpload.UploadLink = "DCViewAttachment/Upload";
            nwUpload.AdditonalPath = "DCViewAttachment";
            nwUpload.Bind();

            nwUpload.Upload_Start();
            //your code
            nwUpload.UploadingType = nwStandardUploading.nwUploadingType.DefaultServerPath;
            //nwUpload.UploadingType = nwStandardUploading.nwUploadingType.UserDefinedPath;
            nwUpload.Upload_End();

            return null;
        }


        public ActionResult DCViewAttachment_Gateway()
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
                    DCViewAttachmentBL DCViewAttachmentBL = new DCViewAttachmentBL();
                    based.Title = "View Attachment";
                    DCViewAttachmentBL.main(ref strFinal, strmet,
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