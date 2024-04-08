using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


using System.Web.Mvc;
using NoahWebLib.Standards;
using Noah_Web.forms_BusinessLayer;
using NoahWebMainLib.NoahWebMainDataAccess;

namespace NOAHBusinessApp.Controllers.SA
{
    public class NOAHSpreadDesignerController : nwStandardGateway
    {
        public ActionResult Index()
        {
            mainDataAccess main = new mainDataAccess();
            string nwtk = "";
            try
            {
                nwtk = Request.QueryString["nwtk"].ToString();
            }
            catch { }
            if(nwtk == "")
            main.MenuAccess(User, this);

            return View(@"~\forms_standards\StandardLayout\NOAHSpreadDesigner\NOAHSpreadDesigner.cshtml");
        }


        public ActionResult NOAHSpreadDesigner_Gateway()
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
                    NOAHSpreadDesignerBL menuBL = new NOAHSpreadDesignerBL();
                    based.Title = "NOAH Spread Designer";
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