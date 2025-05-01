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
    public class ChangePasswordController : nwStandardGateway
    {
        public ActionResult Index()
        {
            isPublic = true;
            return View(@"~\forms_standards\Standard\ChangePassword\ChangePassword.cshtml");
        }

        public ActionResult ChangePassword_Gateway()
        {
            isPublic = true;

            #region  Variable needed dafaulted all as true
            isErrorCheckerMessageShow = true;
            isCompanyGet = true;
            #endregion

            Gateway_Start(User, this);

            if (DLLAutoGateway == false) // for redirecting of BL (4 tier)
            {
                try
                {
                    ChangePasswordBL menuBL = new ChangePasswordBL();
                    based.Title = "Change Password";
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