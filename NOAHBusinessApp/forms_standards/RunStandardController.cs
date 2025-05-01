using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NOAHBusinessApp.forms_standards
{
    public class RunStandardController : NoahWebLib.Standards.nwStandardRunLib
    {
        // GET: RunStandard
        public ActionResult Index()
        {
            #region  Variable needed dafaulted all as true
            isErrorCheckerMessageShow = true;
            isCompanyGet = true;
            #endregion

           RunStandard_Start(User, this);
            if (DLLAutoGateway == false) // for redirecting of BL (4 tier)
            {
                try
                {

                    NoahWebLib.nwStandardBL dataentry = new NoahWebLib.nwStandardBL();
                    based.Title = " ";
                    dataentry.main(ref strFinal, strmet,
                                strParameter, strValue, strtool_Met,
                                strtool_Poz, strtemp1, strtemp2,
                                strtemp3, strtemp4, strtemp5, ref based, this.Connection);

                }
                catch (Exception err)
                {
                    strFinal = err.Message.ToString();
                    strFinal = err.ToString();
                }

                RunStandard_End();
            }

            return null;
        }
    }
}