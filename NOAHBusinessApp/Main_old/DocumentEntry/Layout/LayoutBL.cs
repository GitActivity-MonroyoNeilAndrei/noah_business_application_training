using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

using NoahWebLib;
using NoahWebLib.NoahWebFunction;
using NoahWebLib.NoahWebDataAccess;
using NoahWebLib.Security;
using NoahWebLib.NoahWebUI;

using System.Globalization;

using DALComponent;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using System.Web.Configuration;

namespace Noah_Web.forms_BusinessLayer
{
    public class LayoutBL : nwAction
    {
        #region Variables needed
        string _strFinal = ""; // container of string result
        string _strmet = "";
        string _strParameter = "";
        string _strValue = "";
        string _strtool_Met = "";
        string _strtool_Poz = "";
        string _strtemp1 = "";
        string _strtemp2 = "";
        string _strtemp3 = "";
        string _strtemp4 = "";
        string _strtemp5 = "";
        string UserDefinedConnectionString = "";
        bool isNewRow;
        string ToolboxOrderData = ""; // toolbox Orderby
        DataTable emptyDT;

        public string Result = "";
        nwEntry based = new nwEntry();
        #endregion

        #region Standard Functionality
        WebApplib WebApp = new WebApplib();
        Promptlib custom_Prompt = new Promptlib();
        nwObject nwObject = new nwObject();
        DataAccess nwDataAccess = new DataAccess();
        JSFunction custom_js = new JSFunction();
        nwAction nwAction = new nwAction();
        nwSFObjects SFObjects = new nwSFObjects();
        #endregion

        public void main(ref string strFinal, string strmet,
           string strParameter, string strValue, string strtool_Met,
           string strtool_Poz, string strtemp1, string strtemp2,
           string strtemp3, string strtemp4, string strtemp5, ref nwEntry baseds, string UserDefinedConnection)
        {

            _strmet = strmet;
            _strParameter = strParameter;
            _strValue = strValue;
            _strtool_Met = strtool_Met;
            _strtool_Poz = strtool_Poz;
            _strtemp1 = strtemp1;
            _strtemp2 = strtemp2;
            _strtemp3 = strtemp3;
            _strtemp4 = strtemp4;
            _strtemp5 = strtemp5;
            based = baseds;
            this.UserDefinedConnectionString = UserDefinedConnection;
            dal = new LayoutDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
            if (_strmet == "get_Initialize") strFinal = get_Initialize();
            else if (_strmet == "func_Toolbox") strFinal = func_Toolbox(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "get_LookUp") strFinal = get_LookUp(strtool_Met, strtool_Poz, strParameter, strValue);

            else if (_strmet == "getToolBoxData") strFinal = getToolBoxData(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "get_Method") strFinal = get_Method(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "act_Method") strFinal = act_Method(strtool_Met, strParameter, strValue);
            else strFinal = js.makeJSPostScript("alert('error:" + strmet + " not excute');");

            Result = strFinal;
        }

        public string strConn = "";
        string name = "";
        string RecordOperationResult = String.Empty;
        string InfoOperationResult = String.Empty;
        LayoutDAL dal;
        int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();
        public string get_Initialize()
        {
            string strFinal = "";
            
            Main_Load();

            execute(ref strFinal);

            return js.makeJSPostScript(strFinal);
        }
        public LayoutBL()
        {
            //dal = new DataAccessLayer(this.UserDefinedConnectionString,""); 
        }

        public string act_Method(string strMethod, string strParameter, string strValue)
        {
            string strFinal = "", strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                //Logout
                case "actLogout":
                    UserLogout(based.SecurityAccess.RecUser, "acc1");
                    break;
                case "actAccess":
                    CheckMenuItemAccess();//
                    break;
                    
                default:
                    Prompt.Information("act_Method not found: " + strMethod, "Error");
                    break;
            }
            return js.makeJSPostScript(execute());
        }

        private void Main_Load()
        {
            Success();
        }

        private void Success()
        {
            if (based.isInterface == true) dal.UpdateVersion();

           
            


        }
        #region Dont Change

        public string func_Toolbox(string strMethod, string poz, string strParameter, string strValue)
        {
            try
            {
                WebApp = new WebApplib(strParameter, strValue);
                int pozt = -1;
                try { pozt = Convert.ToInt32(poz); }
                catch { }
                try
                {

                    isNewRow = WebApp.nwobjectBool("isNewRow");
                }
                catch { }
                string strF = "";
                #region do not change (calling RecordOperation)
                switch (strMethod)
                {
                    case "0":
                        RecordOperation(eRecordOperation.AddNew, pozt);
                        break;
                    case "1":
                        RecordOperation(eRecordOperation.Save, pozt);
                        if (String.IsNullOrEmpty(RecordOperationResult) == true) strF = "isNewRow=false;" + strF;
                        break;
                    case "2":
                        RecordOperation(eRecordOperation.Delete, pozt);
                        break;
                    case "3":
                        RecordOperation(eRecordOperation.Refresh, pozt);
                        break;
                    case "4":
                        RecordOperation(eRecordOperation.Inquire, pozt);
                        break;
                    case "5":
                        RecordOperation(eRecordOperation.Process, pozt);
                        break;
                    case "6":
                        RecordOperation(eRecordOperation.Import, pozt);
                        break;
                    case "7":
                        RecordOperation(eRecordOperation.Export, pozt);
                        break;
                    case "8":
                        RecordOperation(eRecordOperation.Print, pozt);
                        break;
                    case "9":
                        RecordOperation(eRecordOperation.Closing, pozt);
                        break;
                    case "10":
                        RecordOperation(eRecordOperation.Search, pozt);
                        break;
                }
                #endregion
                //strF += ";" + Prompt.Excute();
                strF += execute();
                return js.makeJSPostScript(strF);

            }
            catch (Exception err)
            {
                return err.ToString();
            }
        }
        public string get_LookUp(string strSearch, string poz, string strParameter, string strValue)
        {
            string strFinal = "";
            WebApp = new WebApplib(strParameter, strValue);
            strFinal += get_Method(strSearch, poz, strParameter, strValue);
            if (strFinal.Trim() == "") strFinal = "<tr><td>Error Occur.<td></tr>";
            strFinal = js.makeHTML("#menuCreatorContainer .tablecontainter", strFinal);
            strFinal = js.makeJSPostScript(strFinal);
            return strFinal;
        }
        public string getToolBoxDataRet(string tableName, string sa, string sc, string si, string sb)
        {
            string strFinal = "";
            int startIndex = 1; int batchRowcounts = -1;
            try { startIndex = Convert.ToInt32(si); }
            catch { }
            try { batchRowcounts = Convert.ToInt32(sb); }
            catch { }
            strFinal = getToolBoxDataCreate(tableName, sa, sc, startIndex, batchRowcounts);

            return js.makeJSPostScript(strFinal);
        }
        public string getToolBoxDataCreate(string tableName, string sql, string strconn, int startIndex, int batchRowcounts)
        {
            string strFinal = String.Empty; string strRet = String.Empty; string sqlOrig = sql;
            DataTable dt = new DataTable();
            int startColumn = 0; int rownumber = startIndex;

            string strOrder = " ISNULL(Moddate,Recdate) DESC,Recdate DESC";
            if (ToolboxOrderData.Trim() != "") strOrder = ToolboxOrderData;
            if (batchRowcounts >= 1)
            {
                startColumn = 1;
                sql = String.Format(@"Select x.* from(select ROW_NUMBER()  over (order by {3}) as [aagrowNum], b.* from ({0})  b) x where x.aagrowNum>={1} AND  x.aagrowNum <={2} order by x.aagrowNum", sql, startIndex, startIndex + batchRowcounts, strOrder);
            }


            dt = SFObjects.LoadDataTable(sql, strconn);
            int rowCount = dt.Rows.Count;

            for (int i = 0; i < rowCount; i++)
            {
                strFinal += "<tr id=\"" + tableName + "-tr" + rownumber + "\">";
                for (int i2 = startColumn; i2 < dt.Columns.Count; i2++)
                {
                    strFinal += "<td class=\"aag" + dt.Columns[i2].ColumnName.ToString().ToLower() + "\">" + dt.Rows[i][i2].ToString().Replace("'", "\\'") + "</td>";
                }
                strFinal += "</tr>";
                rownumber += 1;
            }
            if (batchRowcounts >= 1 && rowCount >= batchRowcounts)
            {
                strRet = "func_ToolboxDataBat(\'" + tableName + "\', \'" + sqlOrig.Replace("\\", "\\\\") + "\', \'" + strconn.Replace("\\", "\\\\") + "\', \'" + (startIndex + batchRowcounts + 1).ToString() + "\', \'" + (batchRowcounts).ToString() + "\');";
            }
            else
            {
                strRet = "func_ToolboxDataRetst();";
            }

            if (batchRowcounts >= 1 && startIndex > 1) strFinal = js.makeAppend(tableName, strFinal);
            else strFinal = js.makeHTML(tableName, strFinal);

            return strFinal + strRet + "func_toolboxCountTotal();";
        }

        #endregion

        #region standard
        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";

            RecordOperationResult = String.Empty;
            InfoOperationResult = String.Empty;
            switch (i)
            {
                case eRecordOperation.AddNew:

                    break;

                case eRecordOperation.Save:



                    break;

                case eRecordOperation.Delete:

                    break;

                case eRecordOperation.Process:
                    tempstr = "Process";
                    Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Refresh:

                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    //Inquire();
                    nwToolBox.bindingNavigatorInquireItem.PrimaryKey = dal.primaryKey;
                    // Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Import:
                    tempstr = "import";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Export:


                    break;
                case eRecordOperation.Print:
                    tempstr = "print";
                    // Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Closing:
                    tempstr = "closing";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Search:
                    tempstr = "search";
                    //Prompt.Information(tempstr, based.Title);
                    break;
            }

            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.IndexOf("Error") != 0)
                {
                    //dal.focusRecordPK = WebApp.nwobjectText("txtCode");

                    //js.ADD("loc_LookupInquireWithValue('" + dal.focusRecordPK + "') ");
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    Prompt.Information(RecordOperationResult, based.Title);
                }
                else
                {
                    Prompt.Error(RecordOperationResult, based.Title);
                }
            }
        }

        public string get_Method(string strMethod, string strSearchVal, string strParameter, string strValue)
        {
            WebApp = new WebApplib(strParameter, strValue);
            DataTable dtLookupConfig = WebApp.get_LookupConfig();
            nwObject.LookupConfig(dtLookupConfig);

            string strFinal = "";
            string strSQL = "";
            string mouseDownFunc = "";
            string mouseOverFunc = "";
            string strName = "";
            strConn = this.UserDefinedConnectionString;

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = "";//dal.inquireQuery();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                    break;

            }

            return strFinal;
        }

        public string getToolBoxData(string tableName, string getMethod, string strParameter, string strValue)
        {
            string strFinal = ""; string sql = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (getMethod)
            {
                case "toolbox":
                    //strFinal = getToolBoxDataRet(tableName, dal.GetData(), this.UserDefinedConnectionString, "1", "50");

                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "Code";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(), this.UserDefinedConnectionString);



                    break;
            }

            return strFinal;
        }
        #endregion
        private void UnitBind()
        {
            string proj = WebApp.nwobjectText("pcode");
            string phase = WebApp.nwobjectText("phtw");
            js.ADD($"imgObj={JsonConvert.SerializeObject(dal.GetHDRImgSrc(proj, phase))}");//added by eme 01/28/2019
            js.ADD($"unitImgObj={JsonConvert.SerializeObject(dal.GetUnitImgSrc(proj, phase))}");//added by eme 01/28/2019
            js.ADD("nwLoading_End('xSample');");
            js.ADD("nwLoading_End('actBindCollection');");
        }

        public void SetDefaults()
        {
   
            //General
            try
            {

                RefreshDashCount(true,"all");

                //Color Scheme
                string color = "";

                //available
                color = dal.getStatusColor("003");
                js.ADD("cavail='" + color + "'");
                js.makeCSS("#boxlegavail", "background-color", color);

                //reopened
                js.ADD("creopened='" + color + "'");
                js.makeCSS("#boxlegreopened", "background-color", color);
                js.makeCSS("#cntReopenedtcp", "color", color);

                //hold
                color = dal.getStatusColor("008");
                js.ADD("conhold='" + color + "'");
                js.makeCSS("#boxlegonhold", "background-color", color);
                js.makeCSS("#cntHoldtcp", "color", color);

                //reserved
                color = dal.getStatusColor("005");
                js.ADD("creserved='" + color + "'");
                js.makeCSS("#boxlegreserved", "background-color", color);
                js.makeCSS("#cntReservedtcp", "color", color);

                //sold
                color = dal.getStatusColor("006");
                js.ADD("csold='" + color + "'");
                js.makeCSS("#boxlegsold", "background-color", color);
                js.makeCSS("#cntSoldtcp", "color", color);

                //reserved progress
                color = dal.getStatusColor("004");
                js.ADD("creservedprogress='" + color + "'");

                //on-hold back office 007
                color = dal.getStatusColor("007");
                js.ADD("conholdbo='" + color + "'");

            }
            catch(Exception e){ }


        }
        //dashboard count
        private void RefreshDashCount(bool isMain,string proj)
        {
            if (proj == "")
                proj = "all";
            //Numbers of Reserved/Booked/On-Hold
            string dtcnt = "";
            //Reserved
            dtcnt = dal.getCountStatus("005", based.SecurityAccess.RecUser, proj, 0);
            js.ADD("$('#cntReservedbs').text('" + dtcnt + "')");
            js.ADD("$('#cntReservedtbl').text('Reserved - " + dtcnt + "')");
            if (isMain)
                js.ADD("$('#cntReserved').text('" + dtcnt + "')");


            //Sold
            dtcnt = dal.getCountStatus("006", based.SecurityAccess.RecUser, proj, 0);
            js.ADD("$('#cntSoldbs').text('" + dtcnt + "')");
            js.ADD("$('#cntSoldtbl').text('Sold/Booked - " + dtcnt + "')");
            if (isMain)
                js.ADD("$('#cntSold').text('" + dtcnt + "')");

            //Reopen
            dtcnt = dal.getCountStatus("003", based.SecurityAccess.RecUser, proj, 1);
            js.ADD("$('#cntReopenedbs').text('" + dtcnt + "')");
            js.ADD("$('#cntReopenedtbl').text('Re-Opened - " + dtcnt + "')");
            if (isMain)
                js.ADD("$('#cntreopened').text('" + dtcnt + "')");

            //Hold
            dtcnt = dal.getCountStatus("008", based.SecurityAccess.RecUser, proj, 0);
            js.ADD("$('#cntHoldbs').text('" + dtcnt + "')");
            js.ADD("$('#cntHoldtbl').text('On-Hold - " + dtcnt + "')");
            if (isMain)
                js.ADD("$('#cntHold').text('" + dtcnt + "')");
        }


        //Check menu Access
        //public void CheckMenuItemAccess()
        //{
        //    DataTable dtItems = dal.GetPortalMenuItems();

        //    for(int i=0; i<= dtItems.Rows.Count -1; i++)
        //    {
        //        string micode = dtItems.Rows[i][0].ToString();
        //        string access = dal.GetPortalUserAccess(based.SecurityAccess.RecUser, micode);
        //        switch (micode)
        //        {
        //            case "REMYCUST": //my Customers
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnCustomerInfo').hide()");
        //                else
        //                    js.ADD("$('#btnCustomerInfo').show()");
        //                break;
        //            case "REMYPROSPECT": //My Prospects
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnProspectCust').hide()");
        //                else
        //                    js.ADD("$('#btnProspectCust').show()");
        //                break;
        //            case "SALESCALL": //Holding of Unit
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnSalesCall').hide()");
        //                else
        //                    js.ADD("$('#btnSalesCall').show()");
        //                break;
        //            case "REHOLDING": //Holding of Unit
        //                if(access == "False" || access == "")
        //                {
        //                    js.ADD("$('#btnHoldingUnit').hide()");
        //                    js.ADD("$('#btnHoldingUnit').attr('hasAccess','')");
        //                }
        //                else
        //                {
        //                    js.ADD("$('#btnHoldingUnit').show()");
        //                    js.ADD("$('#btnHoldingUnit').attr('hasAccess','yes')");
        //                }
        //                break;
        //            case "RERESERVATION": //Reservation Entry
        //                if (access == "False" || access == "")
        //                {
        //                    js.ADD("$('#btnReseration').hide()");
        //                    js.ADD("$('#btnReseration').attr('hasAccess','')");
        //                }
        //                else
        //                {
        //                    js.ADD("$('#btnReseration').show()");
        //                    js.ADD("$('#btnReseration').attr('hasAccess','yes')");
        //                }
        //                break;
        //            case "REEXTENSION": // Holding - Request for Extension
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnHoldingExt').hide()");
        //                else
        //                    js.ADD("$('#btnHoldingExt').show()");
        //                break;
        //            case "REINVAVAILABILITY": //Inventory Availability Summary
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnInvAvailability').hide()");
        //                else
        //                    js.ADD("$('#btnInvAvailability').show()");
        //                break;
        //            case "REBOOKING": //My Booking Summary
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnBookingSummary').hide()");
        //                else
        //                    js.ADD("$('#btnBookingSummary').show()");
        //                break;
        //            case "REMYTRANSACTIONS": //My Transactions Summary
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnTransactionSummary').hide()");
        //                else
        //                    js.ADD("$('#btnTransactionSummary').show()");
        //                break;
        //            case "RECOMMISSION": //My Commissions Summary
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnCommissions').hide()");
        //                else
        //                    js.ADD("$('#btnCommissions').show()");
        //                break;
        //            case "SBCLIENTREGDEACT": //Client Registration Deactivation
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnClientReg').hide()");
        //                else
        //                    js.ADD("$('#btnClientReg').show()");
        //                break;
        //            case "SBCLIENTREGDEACTSUMM": //Client Registration Deactivation Summary
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnClientRegSummary').hide()");
        //                else
        //                    js.ADD("$('#btnClientRegSummary').show()");
        //                break;
        //            case "QUEUEAPPVL": //Queue Approval
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnQueueApproval').hide()");
        //                else
        //                    js.ADD("$('#btnQueueApproval').show()");
        //                break;
        //            case "SPLTOEntry": //Lease to Own Entry
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnLeaseToOwn').hide()");
        //                else
        //                    js.ADD("$('#btnLeaseToOwn').show()");
        //                break;
        //            case "IVPaymentTermGroupingEntry": //Payment Term Grouping Entry
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnIVPayTermGroup').hide()");
        //                else
        //                    js.ADD("$('#btnIVPayTermGroup').show()");
        //                break;
        //            case "SBRequestBulkHolding": //Request For Bulk Holding
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnRequestBulkHold').hide()");
        //                else
        //                    js.ADD("$('#btnRequestBulkHold').show()");
        //                break;
        //            case "SBTransferOfUnit": //Transfer of Unit
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnTransOfUnit').hide()");
        //                else
        //                    js.ADD("$('#btnTransOfUnit').show()");
        //                break;
        //            case "RELineUpTransactionReport": //Line Up Transaction Report
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnLineUpTransRprt').hide()");
        //                else
        //                    js.ADD("$('#btnLineUpTransRprt').show()");
        //                break;
        //            case "WFMActivityDetailsEntry": //Activity Details Entry
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnActDetEntry').hide()");
        //                else
        //                    js.ADD("$('#btnActDetEntry').show()");
        //                break;
        //            case "SBLETTEROFINTENT": //Letter of Intent (LOI)
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnLOIEntry').hide()");
        //                else
        //                    js.ADD("$('#btnLOIEntry').show()");
        //                break;
        //            case "SBLOIHoldUnit": //LOI Holding of Unit
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnLOIHoldUnit').hide()");
        //                else
        //                    js.ADD("$('#btnLOIHoldUnit').show()");
        //                break;
        //            case "RELOIBOOKING": //My LOI Booking Summary
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnLOIMyBookSumm').hide()");
        //                else
        //                    js.ADD("$('#btnLOIMyBookSumm').show()");
        //                break;
        //            case "RELOIRANKING": //Ranking Summary
        //                if (access == "False" || access == "")
        //                    js.ADD("$('#btnLOIRankSumm').hide()");
        //                else
        //                    js.ADD("$('#btnLOIRankSumm').show()");
        //                break;
        //        }
        //    }

        //}

        public void CheckMenuItemAccess()
        {
            DataTable dtItems = dal.GetPortalMenuItems(WebConfigurationManager.AppSettings["PortalType"]);

            for (int i = 0; i <= dtItems.Rows.Count - 1; i++)
            {
                string micode = dtItems.Rows[i][0].ToString();
                string mid = dtItems.Rows[i][1].ToString();
                string access = dal.GetPortalUserAccess(based.SecurityAccess.RecUser, micode);
                if (access == "False" || access == "")
                    js.ADD("$('#" + mid + "').hide()");
                else
                    js.ADD("$('#" + mid + "').show()");

            }

        }


        //User Logout
        public void UserLogout(string Code, string UserType)
        {
            HttpContext.Current.Session["noahwebUserID"] = "";
            strConn = WebConfigurationManager.AppSettings["NoahWebConnectArk"];
            SFObjects.ExcuteQuery(string.Format(@"EXEC [FPTI_NW].[nsp_noahweb_UserLogStatus] @RecUser = '{0}', @userAccType = '{1}', @QueryType = 2", Code, UserType), strConn);

            SFObjects.ExcuteQuery(string.Format(@"UPDATE FPTI_NW.noahweb_UserLogStatus SET 
                            sessionID={0}
	                        WHERE userID='{1}'", "NULL", Code), strConn);

            SFObjects.ExcuteQuery(string.Format(@"DECLARE @recuser VARCHAR(100)='{0}'
                    UPDATE  FPTI.ConnectivityH 
                    SET LogOutDate = dbo.GetNoahDate()
                    WHERE LogOutDate IS NULL  AND SysUser = @recuser AND LogDate = 
                    (SELECT MAX(LogDate) FROM  FPTI.ConnectivityH WHERE LogOutDate IS NULL  AND SysUser = @recuser)", Code.Replace("'", "''"))
                       , strConn);


            js.ADD("window.location.href = '../../../Login/default.aspx';");

        }

    }
}