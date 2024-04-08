using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


using System.Web.Mvc;
using NoahWebLib.Standards;
using Noah_Web.forms_BusinessLayer;
using NoahWebMainLib.NoahWebMainDataAccess;
using NoahWebLib;

namespace NOAHBusinessApp.Controllers.SB
{
    public class ForgotPasswordController : nwStandardGateway
    {
        public ActionResult Index()
        {
            isPublic = true;
            return View(@"~\forms_standards\Standard\ForgotPassword\ForgotPassword.cshtml");
        }

        public ActionResult ForgotPassword_Gateway()
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
                    ForgotPasswordBL menuBL = new ForgotPasswordBL();
                    based.Title = "Forgot Password";
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