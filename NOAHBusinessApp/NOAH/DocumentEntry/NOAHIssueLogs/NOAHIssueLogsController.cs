using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


using System.Web.Mvc;
using NoahWebLib.Standards;
using Noah_Web.forms_BusinessLayer;
using NoahWebMainLib.NoahWebMainDataAccess;
using DALComponent;
using DataAccessLayers;

namespace NOAHBusinessApp.Controllers.RND
{
    public class NOAHIssueLogsController : nwStandardGateway
    {
        public ActionResult Index()
        {


            //nwStandardUploadingSnipet nwUpload = new nwStandardUploadingSnipet(this);
            //nwUpload.UploadDefaultConfig();


            mainDataAccess main = new mainDataAccess();
            main.MenuAccess(User, this); 
            return View(@"~\NOAH\DocumentEntry\NOAHIssueLogs\NOAHIssueLogs.cshtml");
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Upload()
        {
            //app layer
            nwStandardUploadingSnipet nwUpload = new nwStandardUploadingSnipet(this);


            //nwUpload.UploadDefaultConfig();


            nwUpload.UploadLink = "NOAHIssueLogs/Upload";
            nwUpload.AdditonalPath = "NOAHIssueLogs";
            nwUpload.Bind();

            nwUpload.Upload_Start();
            //your code
            //nwUpload.UploadingType = nwStandardUploading.nwUploadingType.CurrentMenuPath;
            //nwUpload.UploadingType = nwStandardUploading.nwUploadingType.DefaultServerPath;
            Gateway_Start(User, this);
            nwUpload.UploadingType = nwStandardUploading.nwUploadingType.DefaultServerPath;
            DataAccessLayers.NOAHIssueLogsDAL dao = new NOAHIssueLogsDAL(this.Connection, based.SecurityAccess.ConnectionString, "");
            //nwUpload.DestinationPath = dao.serverPaths();

            nwUpload.Upload_End();

            return null;
        }


        public ActionResult NOAHIssueLogs_Gateway()
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
                    NOAHIssueLogsBL menuBL = new NOAHIssueLogsBL();
                    based.Title = "FPTI Issuelogs";
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