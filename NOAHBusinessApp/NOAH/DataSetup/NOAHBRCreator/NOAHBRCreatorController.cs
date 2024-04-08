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
    public class NOAHBRCreatorController : nwStandardGateway
    {
        public ActionResult Index()
        {
            mainDataAccess main = new mainDataAccess();
            main.MenuAccess(User, this);
            return View(@"~\NOAH\DataSetup\NOAHBRCreator\NOAHBRCreator.cshtml");
        }


        public ActionResult Index2()
        {
            Response.Write("AA1");
            return null;
            //return View(@"~\SA\DataSetup\NOAHBRCreator\NOAHBRCreator.cshtml");
        }

        public ActionResult NOAHBRCreator_Gateway()
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
                    NOAHBRCreatorBL menuBL = new NOAHBRCreatorBL();
                    based.Title = "User Account";
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