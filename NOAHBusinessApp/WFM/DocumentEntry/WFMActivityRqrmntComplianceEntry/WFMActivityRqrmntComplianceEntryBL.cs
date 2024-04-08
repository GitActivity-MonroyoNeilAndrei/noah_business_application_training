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
//using Newtonsoft.Json;    //Deprecated by Microsoft in .NET Core 3.0 (2020)

namespace Noah_Web.forms_BusinessLayer
{
    public class WFMActivityRqrmntComplianceEntryBL : nwAction
    {
        public static string nwDocno = string.Empty;
        
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
        private string ToolboxOrderData = ""; // toolbox Orderby

        DataTable emptyDT = new DataTable();

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
            dal = new WFMActivityRqrmntComplianceEntryDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
            if (_strmet == "get_Initialize") strFinal = get_Initialize(strParameter, strValue);
            else if (_strmet == "func_Toolbox") strFinal = func_Toolbox(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "get_LookUp") strFinal = get_LookUp(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "getToolBoxData") strFinal = getToolBoxData(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "get_Method") strFinal = get_Method(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "act_Method") strFinal = act_Method(strtool_Met, strParameter, strValue);
            else strFinal = js.makeJSPostScript("alert('error:" + strmet + " not excute');");

            Result = strFinal;
        }

        public string strConn = "";
        string RecordOperationResult = String.Empty;
        private string transacno = String.Empty;
        //private string transtypecode = "HOLDPR";
        WFMActivityRqrmntComplianceEntryDAL dal;
        int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();
        

        public WFMActivityRqrmntComplianceEntryBL()
        {
        }

        //Spreads
        private static int StartIndex_UnitDtls = 0,
        SPR_UnitCode = StartIndex_UnitDtls,
        SPR_ProjectCode = ++StartIndex_UnitDtls,
        SPR_Project = ++StartIndex_UnitDtls,
        SPR_PhaseTowerCode = ++StartIndex_UnitDtls,
        SPR_PhaseTower = ++StartIndex_UnitDtls,
        SPR_BlockFloorCode = ++StartIndex_UnitDtls,
        SPR_BlockFloor = ++StartIndex_UnitDtls,
        SPR_LotUnitSlotNoCode = ++StartIndex_UnitDtls,
        SPR_LotUnitSlotNo = ++StartIndex_UnitDtls,
        SPR_SellingPrice = ++StartIndex_UnitDtls,
        SPR_QueueNo = ++StartIndex_UnitDtls,
        SPR_AccNo = ++StartIndex_UnitDtls,
        SPR_RefBaseAddOn = ++StartIndex_UnitDtls,
        SPR_HasRefBaseAddOn = ++StartIndex_UnitDtls;

        private static int StartIndex_RefbaseDtls = 0,
        SPR_RBAOUnitCode = StartIndex_RefbaseDtls,
        SPR_RBAOUnitDesc = ++StartIndex_RefbaseDtls;

        #region Dont Change

        public string func_Toolbox(string strMethod, string poz, string strParameter, string strValue)
        {

            try
            {
                WebApp = new WebApplib(strParameter, strValue);
                int pozt = -1;
                try { pozt = System.Convert.ToInt32(poz); }
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
        #endregion

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
            int ver = int.Parse(dal.MenuItemVersion[0].ToString());
            strConn = this.UserDefinedConnectionString;
            string tranType = WebApp.nwobjectText("idvallugTranType");
            string locform = WebApp.nwobjectText("idvallugLocForm");
            string f1 = WebApp.nwobjectText("field1");
            string f2 = WebApp.nwobjectText("field2");
            string f3 = WebApp.nwobjectText("field3");
            string f4 = WebApp.nwobjectText("field4");
            string f5 = WebApp.nwobjectText("field5");
            string f6 = WebApp.nwobjectText("field6");
            string f7 = WebApp.nwobjectText("field7");
            string f8 = WebApp.nwobjectText("field8");
            string f9 = WebApp.nwobjectText("field9");
            string f10 = WebApp.nwobjectText("field10");
            string f11 = WebApp.nwobjectText("field11");
            string f12 = WebApp.nwobjectText("field12");
            string f13 = WebApp.nwobjectText("field13");
            string f14 = WebApp.nwobjectText("field14");
            string f15 = WebApp.nwobjectText("field15");
            string f16 = WebApp.nwobjectText("field16");
            string f17 = WebApp.nwobjectText("field17");
            string f18 = WebApp.nwobjectText("field18");
            string f19 = WebApp.nwobjectText("field19");
            string f20 = WebApp.nwobjectText("field20");
            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.InqurireQry(based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugTranType":
                    strSQL = dal.getlugTranType(based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugLocForm":
                    strSQL = dal.getLocation(tranType, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField1":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 1, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField2":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 2, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField3":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 3, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField4":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 4, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField5":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 5, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField6":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 6, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField7":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 7, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField8":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 8, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField9":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 9, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField10":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 10, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField11":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 11, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField12":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 12, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField13":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 13, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField14":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 14, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField15":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 15, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField16":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 16, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField17":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 17, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField18":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 18, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField19":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 19, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugField20":
                    strSQL = dal.getLookup(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("idvallugLocForm"), 20, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16, f17, f18, f19, f20, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

            }

            return strFinal;
        }

        public void setDefaultLocation()
        {
            DataTable dt = dal.getDefaultLocation(based.SecurityAccess.RecUser);
            if (dt.Rows.Count > 0)
            {
                js.makeValueText("#idvallugLocForm", dt.Rows[0]["Code"].ToString());
                js.makeValueText("#descvallugLocForm", dt.Rows[0]["Description"].ToString());
                js.makeValueText("#idvallugCurrency", dt.Rows[0]["Currency Code"].ToString());
                js.makeValueText("#descvallugCurrency", dt.Rows[0]["Currecy Description"].ToString());
            }
        }

        ///// Standard RecordOperation 
        private void InitializeValues()
        {
            nwToolBox.bindingNavigatorSaveItem.Enable = true;
            nwToolBox.bindingNavigatorAddNewItem.Enable =
            nwToolBox.bindingNavigatorPrintItem.Enable =
            nwToolBox.bindingNavigatorInquireItem.Enable =
            nwToolBox.bindingNavigatorImportItem.Visible =
            nwToolBox.bindingNavigatorDeleteItem.Enable =
            nwToolBox.bindingNavigatorExportItem.Enable = 
            nwToolBox.bindingNavigatorProcessItem.Enable = false;

            nwToolBox.bindingNavigatorImportItem.Visible = false;
            nwToolBox.bindingNavigatorExportItem.Visible = false;
            nwToolBox.bindingNavigatorPrintItem.Visible = false;

            var serverdate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
            js.makeValueText("#txtDocDate", serverdate.ToString("MM/dd/yyyy"));
            setDefaultLocation();
            CheckingOfReqCompliance();
            CheckingOfReviewAttach();
        }

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string result = "", tempstr = "";
            DataTable dt = new DataTable();
            switch (i)
            {
                case eRecordOperation.AddNew:
                    InitializeValues();
                    break;

                case eRecordOperation.Save:
                    RecordOperationResult = ValidateData("be saved");
                    if (RecordOperationResult == string.Empty)
                    {
                        dt = LoadSchema();
                        RecordOperationResult = dal.SaveData(dt, isNewRow);
                    }
                    break;

                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("txtDocno"), based.SecurityAccess.RecUser);
                    break;

                case eRecordOperation.Process:
                    RecordOperationResult = ValidateData("be processed");
                    if (RecordOperationResult.Length <= 0)
                    {
                        RecordOperationResult = dal.ProcessData(WebApp.nwobjectText("txtDocno"), based.SecurityAccess.RecUser);
                    }
                    break;

                case eRecordOperation.Refresh:
                    RefreshData();
                    js.makeProp("#txtCode", "disabled", true);
                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    break;

                case eRecordOperation.Import:
                    tempstr = "import";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Export:

                    string LISTINGFILENAME = "";
                    if (dal.LISTINGFILENAME + " Listing" == "") LISTINGFILENAME = "Sheet 1";
                    else LISTINGFILENAME = dal.LISTINGFILENAME + " Listing";

                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, dal.LISTINGSTARTROW, dal.LISTINGQUERY(),
                                                           LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                           based.SecurityAccess.RecUserName, LISTINGFILENAME);

                    //## FOR EXPORTING ###
                    Random rnd = new Random();
                    string SessionID = DateTime.Now.ToString("yyyyddMMhhmmss") + rnd.Next(0, 9999).ToString().PadRight(4, '0');
                    HttpContext.Current.Session["Config_" + SessionID] = frmlist.m_Spread.ExportConfig();
                    HttpContext.Current.Session["Data_" + SessionID] = frmlist.m_Spread.GetDataSource();
                    HttpContext.Current.Session["Filename_" + SessionID] = LISTINGFILENAME;
                    HttpContext.Current.Session["Header_" + SessionID] = "0";
                    js.ADD("ExportSessionID='" + SessionID + "'");
                    //## END ##

                    js.Show("#nwExportContainerMain", 0);
                    js.ADD(frmlist.CreateScript());


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
                if (RecordOperationResult.ToLower().Contains("success") || RecordOperationResult.ToLower().Contains("completed"))
                {
                    RefreshData();
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    Prompt.Information(RecordOperationResult, based.Title);
                }
                else
                {

                    Prompt.Error(RecordOperationResult, based.Title);
                }
            }

            //return result;
        }

        public string get_Initialize(string strParameter, string strValue)
        {
            WebApp = new WebApplib(strParameter, strValue);
            string strFinal = "";
            SetBindings();
            Main_Load();

            execute(ref strFinal);

            return js.makeJSPostScript(strFinal);
        }
        public string act_Method(string strMethod, string strParameter, string strValue)
        {

            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();
                    js.ADD("nwLoading_End('actbindcollection');");
                    break;

                case "actBindCollectionEmpty":
                    js.ADD("nwLoading_End('actBindCollectionEmpty')");
                    break;
                case "actValidateEmp":
                    actValidateEmp();
                    js.ADD("nwLoading_End('actValidateEmp')");
                    break;
                case "actChkDocno":
                    CheckingOfReqCompliance();

                    js.ADD("nwLoading_End('actChkDocno')");
                    break;

                case "actChkReviewAttach":
                    CheckingOfReviewAttach();

                    js.ADD("nwLoading_End('actChkReviewAttach')");
                    break;

                case "actLoadField":
                    LoadField();
                    if (WebApp.nwobjectText("wftag") == "4")
                    {
                        CheckingOfReviewAttach();
                    }
                    js.ADD("nwLoading_End('xLoadDynDtls')");
                    break;

                case "actDynamicField":
                    DynamicFields();
                    js.ADD("nwLoading_End('xlugTranType')");
                    break;

                case "actGetBasePercentage":
                    if (WebApp.nwobjectText("idvallugTranType") == "REQDP1")
                    {
                        string baseprcnt = dal.getBasePercent(WebApp.nwobjectText("ntpno"), WebApp.nwobjectText("idvallugTranType"));
                        js.makeValueText("#txtBasePercentage", baseprcnt);
                    }
                    if (WebApp.nwobjectText("idvallugTranType") == "REQDP2")
                    {
                        string percent = dal.getPercent(WebApp.nwobjectText("ntpno"), WebApp.nwobjectText("idvallugTranType"));
                        js.ADD(string.Format($"$('[name=6]').val('{percent}');"));
                        js.ADD("ComputeDPAmount();");
                    }
                    if (WebApp.nwobjectText("idvallugTranType") == "REQDPF")
                    {
                        string percent = dal.getBasePercent(WebApp.nwobjectText("ntpno"), WebApp.nwobjectText("idvallugTranType"));
                        js.ADD(string.Format($"$('[name=6]').val('{percent}');"));
                        js.ADD("ComputeDPAmount();");
                    }
                    if (WebApp.nwobjectText("idvallugTranType") == "RQRET1" || WebApp.nwobjectText("idvallugTranType") == "RQRET2")
                    {
                        string percent = dal.getPercentRet(WebApp.nwobjectText("ntpno"), WebApp.nwobjectText("idvallugTranType"));
                        js.ADD(string.Format($"$('[name=6]').val('{percent}');"));
                        js.ADD("ComputeDPAmount();");
                    }
                    if (WebApp.nwobjectText("idvallugTranType") == "RQRETF")
                    {
                        string percent = dal.getPercentRet(WebApp.nwobjectText("ntpno"), WebApp.nwobjectText("idvallugTranType"));
                        js.ADD(string.Format($"$('[name=6]').val('{percent}');"));
                        js.ADD("ComputeDPAmount();");
                    }
                    break;

                default:
                    Prompt.Information("act_Method not found: " + strMethod, "Error");
                    break;
            }
            return js.makeJSPostScript(execute());
        }
        public string getToolBoxData(string tableName, string getMethod, string strParameter, string strValue)
        {
            string strFinal = ""; string sql = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (getMethod)
            {
                case "toolbox":
                    nwStandardBL standardBL = new nwStandardBL(WebApp);

                    standardBL.PrimaryKey = "docno";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(nwDocno, based.SecurityAccess.RecUser), this.UserDefinedConnectionString);
                    break;
            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#txtDocno", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "docno");
            SFObject.SetControlBinding("#idvallugTranType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "tranType");
            SFObject.SetControlBinding("#descvallugTranType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "actTypeDesc");
            SFObject.SetControlBinding("#idvallugLocForm", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "locForm");
            SFObject.SetControlBinding("#descvallugLocForm", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "locFormDesc");
            SFObject.SetControlBinding("#txtDocDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "docdate");
            SFObject.SetControlBinding("#txtDateSubmitted", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "submitdate");
            SFObject.SetControlBinding("#txtDatePosted", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "dateposted");
            SFObject.SetControlBinding("#txtRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "remarks");
            SFObject.SetControlBinding("#txtDocStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "status");
            SFObject.SetControlBinding("#txtRefDocno", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "refDocno");
            SFObject.SetControlBinding("#txtCC", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "cc");
            SFObject.SetControlBinding("#txtPC", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "pc");
            SFObject.SetControlBinding("#txtAmount", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "amount");
            SFObject.SetControlBinding("#txtVendor", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "vendor");
            SFObject.SetControlBinding("#txtRefno", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "refNo");
            SFObject.SetControlBinding("#idvallugRsnForDisAproval", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "rsnDisapproval");
            SFObject.SetControlBinding("#descvallugRsnForDisAproval", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "rsnDisapprovalDesc");
            SFObject.SetControlBinding("#txtDisapprvRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "disapprvRemarks");

            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");
        }


        //////////////// end of standard / standard custumize

        private void actValidateEmp()
        {
            string emp = WebApp.nwobjectText("idvallugEmployee");




        }

        private void BindCollection()
        {
            string docno = WebApp.nwobjectText("txtDocno");

            CheckingOfReqCompliance();
            CheckingOfReviewAttach();
            //string nwDocno = WebApp.nwobjectText("nwDocno");
            if (nwDocno.Length > 0)
            {
                js.ADD("isView()");
            }
            DynamicFields();
            LoadedDataRefresh();
            string isLevel1 = dal.isLevel1(nwDocno);
            js.ADD(string.Format("isLevel1='{0}'", isLevel1));
            js.ADD("Level1Controls();");
        }

        private void CheckingOfReviewAttach()
        {
            string elem = string.Empty;
            elem = "$('#btnReviewAttach')";
            string docno = WebApp.nwobjectText("txtRefDocno");
            if (docno != "")
            {
                if (dal.chkifHasRequirementCompliance(docno, 0, 0))
                {
                    js.ADD($"{elem}.removeClass('btnGray')");
                    js.ADD($"{elem}.removeClass('btnOrange')");
                    js.ADD($"{elem}.addClass('btnGreen')");
                }
                else
                {
                    js.ADD($"{elem}.removeClass('btnGray')");
                    js.ADD($"{elem}.removeClass('btnGreen')");
                    js.ADD($"{elem}.addClass('btnBlue')");
                }
                js.ADD($"{elem}.enable(true);");
            }
            else
            {
                js.ADD($"{elem}.enable(false);");
            }
        }
        private void CheckingOfReqCompliance() //Function Upon window Close
        {
            string elem = string.Empty;
            elem = "$('#btnReqComp')";
            string docno = WebApp.nwobjectText("txtDocno");
            if (docno != "")
            {
                if (dal.chkifHasRequirementCompliance(docno, 0, 0))
                {
                    js.ADD($"{elem}.removeClass('btnGray')");
                    js.ADD($"{elem}.removeClass('btnOrange')");
                    js.ADD($"{elem}.addClass('btnGreen')");
                }
                else
                {
                    js.ADD($"{elem}.removeClass('btnGray')");
                    js.ADD($"{elem}.removeClass('btnGreen')");
                    js.ADD($"{elem}.addClass('btnOrange')");
                }
                js.ADD($"{elem}.enable(true);");
            }
            else
            {
                js.ADD($"{elem}.enable(false);");
            }
        }




        private string ValidateData(string xAct)
        {
            string errorResult = String.Empty;
            string tranType = WebApp.nwobjectText("idvallugTranType");
            if (tranType.Length <= 0)
            {
                errorResult += $"Cannot {xAct}. Transaction/Activity Type is required.\n";
            }
            if (WebApp.nwobjectText("idvallugLocForm").Length <= 0)
            {
                errorResult += $"Cannot {xAct}. Location with Accountable Forms is required.\n";
            }
            if (WebApp.nwobjectText("field1") == "1" && !(WebApp.nwobjectText("idvallugField1").Length > 0 || WebApp.nwobjectText("txtField1").Length > 0) || (WebApp.nwobjectText("fieldname1") == "6" && WebApp.nwobjectDouble("txtField1") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField1")} is required.\n";
            }
            if (WebApp.nwobjectText("field2") == "1" && !(WebApp.nwobjectText("idvallugField2").Length > 0 || WebApp.nwobjectText("txtField2").Length > 0) || (WebApp.nwobjectText("fieldname2") == "6" && WebApp.nwobjectDouble("txtField2") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField2")} is required.\n";
            }
            if (WebApp.nwobjectText("field3") == "1" && !(WebApp.nwobjectText("idvallugField3").Length > 0 || WebApp.nwobjectText("txtField3").Length > 0) || (WebApp.nwobjectText("fieldname3") == "6" && WebApp.nwobjectDouble("txtField3") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField3")} is required.\n";
            }
            if (WebApp.nwobjectText("field4") == "1" && !(WebApp.nwobjectText("idvallugField4").Length > 0 || WebApp.nwobjectText("txtField4").Length > 0) || (WebApp.nwobjectText("fieldname4") == "6" && WebApp.nwobjectDouble("txtField4") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField4")} is required.\n";
            }
            if (WebApp.nwobjectText("field5") == "1" && !(WebApp.nwobjectText("idvallugField5").Length > 0 || WebApp.nwobjectText("txtField5").Length > 0) || (WebApp.nwobjectText("fieldname5") == "6" && WebApp.nwobjectDouble("txtField5") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField5")} is required.\n";
            }
            if (WebApp.nwobjectText("field6") == "1" && !(WebApp.nwobjectText("idvallugField6").Length > 0 || WebApp.nwobjectText("txtField6").Length > 0) || (WebApp.nwobjectText("fieldname6") == "6" && WebApp.nwobjectDouble("txtField6") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField6")} is required.\n";
            }
            if (WebApp.nwobjectText("field7") == "1" && !(WebApp.nwobjectText("idvallugField7").Length > 0 || WebApp.nwobjectText("txtField7").Length > 0) || (WebApp.nwobjectText("fieldname7") == "6" && WebApp.nwobjectDouble("txtField7") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField7")} is required.\n";
            }
            if (WebApp.nwobjectText("field8") == "1" && !(WebApp.nwobjectText("idvallugField8").Length > 0 || WebApp.nwobjectText("txtField8").Length > 0) || (WebApp.nwobjectText("fieldname8") == "6" && WebApp.nwobjectDouble("txtField8") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField8")} is required.\n";
            }
            if (WebApp.nwobjectText("field9") == "1" && !(WebApp.nwobjectText("idvallugField9").Length > 0 || WebApp.nwobjectText("txtField9").Length > 0) || (WebApp.nwobjectText("fieldname9") == "6" && WebApp.nwobjectDouble("txtField9") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField9")} is required.\n";
            }
            if (WebApp.nwobjectText("field10") == "1" && !(WebApp.nwobjectText("idvallugField10").Length > 0 || WebApp.nwobjectText("txtField10").Length > 0) || (WebApp.nwobjectText("fieldname10") == "6" && WebApp.nwobjectDouble("txtField10") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField10")} is required.\n";
            }
            if (WebApp.nwobjectText("field11") == "1" && !(WebApp.nwobjectText("idvallugField11").Length > 0 || WebApp.nwobjectText("txtField11").Length > 0) || (WebApp.nwobjectText("fieldname11") == "6" && WebApp.nwobjectDouble("txtField11") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField11")} is required.\n";
            }
            if (WebApp.nwobjectText("field12") == "1" && !(WebApp.nwobjectText("idvallugField12").Length > 0 || WebApp.nwobjectText("txtField12").Length > 0) || (WebApp.nwobjectText("fieldname12") == "6" && WebApp.nwobjectDouble("txtField12") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField12")} is required.\n";
            }
            if (WebApp.nwobjectText("field13") == "1" && !(WebApp.nwobjectText("idvallugField13").Length > 0 || WebApp.nwobjectText("txtField13").Length > 0) || (WebApp.nwobjectText("fieldname13") == "6" && WebApp.nwobjectDouble("txtField13") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField13")} is required.\n";
            }
            if (WebApp.nwobjectText("field14") == "1" && !(WebApp.nwobjectText("idvallugField14").Length > 0 || WebApp.nwobjectText("txtField14").Length > 0) || (WebApp.nwobjectText("fieldname14") == "6" && WebApp.nwobjectDouble("txtField14") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField14")} is required.\n";
            }
            if (WebApp.nwobjectText("field15") == "1" && !(WebApp.nwobjectText("idvallugField15").Length > 0 || WebApp.nwobjectText("txtField15").Length > 0) || (WebApp.nwobjectText("fieldname15") == "6" && WebApp.nwobjectDouble("txtField15") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField15")} is required.\n";
            }
            if (WebApp.nwobjectText("field16") == "1" && !(WebApp.nwobjectText("idvallugField16").Length > 0 || WebApp.nwobjectText("txtField16").Length > 0) || (WebApp.nwobjectText("fieldname16") == "6" && WebApp.nwobjectDouble("txtField16") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField16")} is required.\n";
            }
            if (WebApp.nwobjectText("field17") == "1" && !(WebApp.nwobjectText("idvallugField17").Length > 0 || WebApp.nwobjectText("txtField17").Length > 0) || (WebApp.nwobjectText("fieldname17") == "6" && WebApp.nwobjectDouble("txtField17") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField17")} is required.\n";
            }
            if (WebApp.nwobjectText("field18") == "1" && !(WebApp.nwobjectText("idvallugField18").Length > 0 || WebApp.nwobjectText("txtField18").Length > 0) || (WebApp.nwobjectText("fieldname18") == "6" && WebApp.nwobjectDouble("txtField18") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField18")} is required.\n";
            }
            if (WebApp.nwobjectText("field19") == "1" && !(WebApp.nwobjectText("idvallugField19").Length > 0 || WebApp.nwobjectText("txtField19").Length > 0) || (WebApp.nwobjectText("fieldname19") == "6" && WebApp.nwobjectDouble("txtField19") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField19")} is required.\n";
            }
            if (WebApp.nwobjectText("field20") == "1" && !(WebApp.nwobjectText("idvallugField20").Length > 0 || WebApp.nwobjectText("txtField20").Length > 0) || (WebApp.nwobjectText("fieldname20") == "6" && WebApp.nwobjectDouble("txtField20") <= 0))
            {
                errorResult += $"Cannot {xAct}. {WebApp.nwobjectText("lblField20")} is required.\n";
            }
            if (dal.isDuplicateRefno(WebApp.nwobjectText("txtDocno"), WebApp.nwobjectText("txtVendor"), WebApp.nwobjectText("ReferenceNo"), tranType))
            {
                errorResult += $"Cannot {xAct}. Duplicate Reference No.\n";
            }

            if (xAct == "be processed")
            {
                string docno = WebApp.nwobjectText("txtDocno");

                //HEADER
                int isValReqComp = dal.ValidateReqComplianceHDR(docno, tranType);

                if (isValReqComp == 0)
                    errorResult += "Cannot be processed. Requirements Compliance is required. \n";

                else if (isValReqComp == 2)
                    errorResult += "Cannot be processed. Transaction Requirements has been updated. Please reload details. \n";

                if (!dal.isForRevision(WebApp.nwobjectText("txtDocno")))
                {
                    errorResult += "Cannot be processed. Please review and revise transaction details first.\n";
                }
            }

            return errorResult;
        }

        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema();
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["docno"] = WebApp.nwobjectText("txtDocno");
            dr["locForm"] = WebApp.nwobjectText("idvallugLocForm");
            dr["tranType"] = WebApp.nwobjectText("idvallugTranType");
            dr["remarks"] = WebApp.nwobjectText("txtRemarks");

            dr["col1"] = WebApp.nwobjectText("idvallugField1").Equals("") ? WebApp.nwobjectText("txtField1") : WebApp.nwobjectText("idvallugField1");
            dr["col2"] = WebApp.nwobjectText("idvallugField2").Equals("") ? WebApp.nwobjectText("txtField2") : WebApp.nwobjectText("idvallugField2");
            dr["col3"] = WebApp.nwobjectText("idvallugField3").Equals("") ? WebApp.nwobjectText("txtField3") : WebApp.nwobjectText("idvallugField3");
            dr["col4"] = WebApp.nwobjectText("idvallugField4").Equals("") ? WebApp.nwobjectText("txtField4") : WebApp.nwobjectText("idvallugField4");
            dr["col5"] = WebApp.nwobjectText("idvallugField5").Equals("") ? WebApp.nwobjectText("txtField5") : WebApp.nwobjectText("idvallugField5");
            dr["col6"] = WebApp.nwobjectText("idvallugField6").Equals("") ? WebApp.nwobjectText("txtField6") : WebApp.nwobjectText("idvallugField6");
            dr["col7"] = WebApp.nwobjectText("idvallugField7").Equals("") ? WebApp.nwobjectText("txtField7") : WebApp.nwobjectText("idvallugField7");
            dr["col8"] = WebApp.nwobjectText("idvallugField8").Equals("") ? WebApp.nwobjectText("txtField8") : WebApp.nwobjectText("idvallugField8");
            dr["col9"] = WebApp.nwobjectText("idvallugField9").Equals("") ? WebApp.nwobjectText("txtField9") : WebApp.nwobjectText("idvallugField9");
            dr["col10"] = WebApp.nwobjectText("idvallugField10").Equals("") ? WebApp.nwobjectText("txtField10") : WebApp.nwobjectText("idvallugField10");
            dr["col11"] = WebApp.nwobjectText("idvallugField11").Equals("") ? WebApp.nwobjectText("txtField11") : WebApp.nwobjectText("idvallugField11");
            dr["col12"] = WebApp.nwobjectText("idvallugField12").Equals("") ? WebApp.nwobjectText("txtField12") : WebApp.nwobjectText("idvallugField12");
            dr["col13"] = WebApp.nwobjectText("idvallugField13").Equals("") ? WebApp.nwobjectText("txtField13") : WebApp.nwobjectText("idvallugField13");
            dr["col14"] = WebApp.nwobjectText("idvallugField14").Equals("") ? WebApp.nwobjectText("txtField14") : WebApp.nwobjectText("idvallugField14");
            dr["col15"] = WebApp.nwobjectText("idvallugField15").Equals("") ? WebApp.nwobjectText("txtField15") : WebApp.nwobjectText("idvallugField15");
            dr["col16"] = WebApp.nwobjectText("idvallugField16").Equals("") ? WebApp.nwobjectText("txtField16") : WebApp.nwobjectText("idvallugField16");
            dr["col17"] = WebApp.nwobjectText("idvallugField17").Equals("") ? WebApp.nwobjectText("txtField17") : WebApp.nwobjectText("idvallugField17");
            dr["col18"] = WebApp.nwobjectText("idvallugField18").Equals("") ? WebApp.nwobjectText("txtField18") : WebApp.nwobjectText("idvallugField18");
            dr["col19"] = WebApp.nwobjectText("idvallugField19").Equals("") ? WebApp.nwobjectText("txtField19") : WebApp.nwobjectText("idvallugField19");
            dr["col20"] = WebApp.nwobjectText("idvallugField20").Equals("") ? WebApp.nwobjectText("txtField20") : WebApp.nwobjectText("idvallugField20");

            dr["col1Desc"] = WebApp.nwobjectText("idvallugField1").Equals("") ? "" : WebApp.nwobjectText("descvallugField1");
            dr["col2Desc"] = WebApp.nwobjectText("idvallugField2").Equals("") ? "" : WebApp.nwobjectText("descvallugField2");
            dr["col3Desc"] = WebApp.nwobjectText("idvallugField3").Equals("") ? "" : WebApp.nwobjectText("descvallugField3");
            dr["col4Desc"] = WebApp.nwobjectText("idvallugField4").Equals("") ? "" : WebApp.nwobjectText("descvallugField4");
            dr["col5Desc"] = WebApp.nwobjectText("idvallugField5").Equals("") ? "" : WebApp.nwobjectText("descvallugField5");
            dr["col6Desc"] = WebApp.nwobjectText("idvallugField6").Equals("") ? "" : WebApp.nwobjectText("descvallugField6");
            dr["col7Desc"] = WebApp.nwobjectText("idvallugField7").Equals("") ? "" : WebApp.nwobjectText("descvallugField7");
            dr["col8Desc"] = WebApp.nwobjectText("idvallugField8").Equals("") ? "" : WebApp.nwobjectText("descvallugField8");
            dr["col9Desc"] = WebApp.nwobjectText("idvallugField9").Equals("") ? "" : WebApp.nwobjectText("descvallugField9");
            dr["col10Desc"] = WebApp.nwobjectText("idvallugField10").Equals("") ? "" : WebApp.nwobjectText("descvallugField10");
            dr["col11Desc"] = WebApp.nwobjectText("idvallugField11").Equals("") ? "" : WebApp.nwobjectText("descvallugField11");
            dr["col12Desc"] = WebApp.nwobjectText("idvallugField12").Equals("") ? "" : WebApp.nwobjectText("descvallugField12");
            dr["col13Desc"] = WebApp.nwobjectText("idvallugField13").Equals("") ? "" : WebApp.nwobjectText("descvallugField13");
            dr["col14Desc"] = WebApp.nwobjectText("idvallugField14").Equals("") ? "" : WebApp.nwobjectText("descvallugField14");
            dr["col15Desc"] = WebApp.nwobjectText("idvallugField15").Equals("") ? "" : WebApp.nwobjectText("descvallugField15");
            dr["col16Desc"] = WebApp.nwobjectText("idvallugField16").Equals("") ? "" : WebApp.nwobjectText("descvallugField16");
            dr["col17Desc"] = WebApp.nwobjectText("idvallugField17").Equals("") ? "" : WebApp.nwobjectText("descvallugField17");
            dr["col18Desc"] = WebApp.nwobjectText("idvallugField18").Equals("") ? "" : WebApp.nwobjectText("descvallugField18");
            dr["col19Desc"] = WebApp.nwobjectText("idvallugField19").Equals("") ? "" : WebApp.nwobjectText("descvallugField19");
            dr["col20Desc"] = WebApp.nwobjectText("idvallugField20").Equals("") ? "" : WebApp.nwobjectText("descvallugField20");

            dr["refDocno"] = WebApp.nwobjectText("txtRefDocno");
            dr["maxTag"] = WebApp.nwobjectText("txtmaxTag");
            dr["cc"] = WebApp.nwobjectText("txtCC");
            dr["pc"] = WebApp.nwobjectText("txtPC");
            dr["vendor"] = WebApp.nwobjectText("txtVendor");

            string amount = string.Empty;
            if (WebApp.nwobjectText("fieldname1") == "3")
            { amount = WebApp.nwobjectText("idvallugField1").Equals("") ? WebApp.nwobjectText("txtField1") : WebApp.nwobjectText("idvallugField1"); }
            if (WebApp.nwobjectText("fieldname2") == "3")
            { amount = WebApp.nwobjectText("idvallugField2").Equals("") ? WebApp.nwobjectText("txtField2") : WebApp.nwobjectText("idvallugField2"); }
            if (WebApp.nwobjectText("fieldname3") == "3")
            { amount = WebApp.nwobjectText("idvallugField3").Equals("") ? WebApp.nwobjectText("txtField3") : WebApp.nwobjectText("idvallugField3"); }
            if (WebApp.nwobjectText("fieldname4") == "3")
            { amount = WebApp.nwobjectText("idvallugField4").Equals("") ? WebApp.nwobjectText("txtField4") : WebApp.nwobjectText("idvallugField4"); }
            if (WebApp.nwobjectText("fieldname5") == "3")
            { amount = WebApp.nwobjectText("idvallugField5").Equals("") ? WebApp.nwobjectText("txtField5") : WebApp.nwobjectText("idvallugField5"); }
            if (WebApp.nwobjectText("fieldname6") == "3")
            { amount = WebApp.nwobjectText("idvallugField6").Equals("") ? WebApp.nwobjectText("txtField6") : WebApp.nwobjectText("idvallugField6"); }
            if (WebApp.nwobjectText("fieldname7") == "3")
            { amount = WebApp.nwobjectText("idvallugField7").Equals("") ? WebApp.nwobjectText("txtField7") : WebApp.nwobjectText("idvallugField7"); }
            if (WebApp.nwobjectText("fieldname8") == "3")
            { amount = WebApp.nwobjectText("idvallugField8").Equals("") ? WebApp.nwobjectText("txtField8") : WebApp.nwobjectText("idvallugField8"); }
            if (WebApp.nwobjectText("fieldname9") == "3")
            { amount = WebApp.nwobjectText("idvallugField9").Equals("") ? WebApp.nwobjectText("txtField9") : WebApp.nwobjectText("idvallugField9"); }
            if (WebApp.nwobjectText("fieldname10") == "3")
            { amount = WebApp.nwobjectText("idvallugField10").Equals("") ? WebApp.nwobjectText("txtField10") : WebApp.nwobjectText("idvallugField10"); }
            if (WebApp.nwobjectText("fieldname11") == "3")
            { amount = WebApp.nwobjectText("idvallugField11").Equals("") ? WebApp.nwobjectText("txtField11") : WebApp.nwobjectText("idvallugField11"); }
            if (WebApp.nwobjectText("fieldname12") == "3")
            { amount = WebApp.nwobjectText("idvallugField12").Equals("") ? WebApp.nwobjectText("txtField12") : WebApp.nwobjectText("idvallugField12"); }
            if (WebApp.nwobjectText("fieldname13") == "3")
            { amount = WebApp.nwobjectText("idvallugField13").Equals("") ? WebApp.nwobjectText("txtField13") : WebApp.nwobjectText("idvallugField13"); }
            if (WebApp.nwobjectText("fieldname14") == "3")
            { amount = WebApp.nwobjectText("idvallugField14").Equals("") ? WebApp.nwobjectText("txtField14") : WebApp.nwobjectText("idvallugField14"); }
            if (WebApp.nwobjectText("fieldname15") == "3")
            { amount = WebApp.nwobjectText("idvallugField15").Equals("") ? WebApp.nwobjectText("txtField15") : WebApp.nwobjectText("idvallugField15"); }
            if (WebApp.nwobjectText("fieldname16") == "3")
            { amount = WebApp.nwobjectText("idvallugField16").Equals("") ? WebApp.nwobjectText("txtField16") : WebApp.nwobjectText("idvallugField16"); }
            if (WebApp.nwobjectText("fieldname17") == "3")
            { amount = WebApp.nwobjectText("idvallugField17").Equals("") ? WebApp.nwobjectText("txtField17") : WebApp.nwobjectText("idvallugField17"); }
            if (WebApp.nwobjectText("fieldname18") == "3")
            { amount = WebApp.nwobjectText("idvallugField18").Equals("") ? WebApp.nwobjectText("txtField18") : WebApp.nwobjectText("idvallugField18"); }
            if (WebApp.nwobjectText("fieldname19") == "3")
            { amount = WebApp.nwobjectText("idvallugField19").Equals("") ? WebApp.nwobjectText("txtField19") : WebApp.nwobjectText("idvallugField19"); }
            if (WebApp.nwobjectText("fieldname20") == "3")
            { amount = WebApp.nwobjectText("idvallugField20").Equals("") ? WebApp.nwobjectText("txtField20") : WebApp.nwobjectText("idvallugField20"); }

            dr["amount"] = amount;
            dr["refNo"] = WebApp.nwobjectText("ReferenceNo");

            dr["RecUser"] = based.SecurityAccess.RecUser;
            dr["ModUser"] = based.SecurityAccess.RecUser;

            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion

            return dtHDR;
        }





        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
            js.ADD(string.Format(@"baseTitle = '{0}'", based.Title));
            js.ADD("mainLoad();");
        }

        private void RefreshData()
        {
            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
            js.ADD("RefreshData();");
            nwDocno = WebApp.nwobjectText("nwDocno");
        }


        public static int
            SPR_INDEX = 1,
            SPR_SELECT = SPR_INDEX,
            SPR_EmpCode = ++SPR_INDEX,
            SPR_EmpName = ++SPR_INDEX,
            SPR_TranNo = ++SPR_INDEX,
            SPR_RECDATE = ++SPR_INDEX,
            SPR_LAST_COL = SPR_INDEX;



        private void CreateGrid(bool isInitialize)
        {
            string gridID = "nwGrid";
            nwGrid m_spread = new nwGrid(gridID);

            m_spread.RowHeight(5);
            m_spread.CreateExcelGrid(5, SPR_LAST_COL);
            m_spread.TableHeight(500);
            m_spread.minRow(10);
            DataTable dt = new DataTable();

            if (!isInitialize)
            {

                dt = dal.GetLinData();
                if (dt.Rows.Count > 0)
                {
                    m_spread.dataSource(dt);
                    m_spread.minRow(dt.Rows.Count);
                }

            }


            #region Column Name
            m_spread.nwobject(SPR_SELECT - 1).ColumnName("Select");
            m_spread.nwobject(SPR_EmpCode - 1).ColumnName("Employee Code");
            m_spread.nwobject(SPR_EmpName - 1).ColumnName("Employee Name");
            m_spread.nwobject(SPR_TranNo - 1).ColumnName("Transaction No.");
            m_spread.nwobject(SPR_RECDATE - 1).ColumnName("Date Created");

            #endregion

            #region Template

            m_spread.nwobject(SPR_SELECT - 1).CheckBox(true);
            #endregion

            #region Special
            /* For Look with Input*/
            //_spread.nwobject(SPR_LOOKUPCODE - 1).LookUp("lugCodeDesc", true);

            /* For Merging Cells*/
            //m_spread.Rows(0,1).Merge(2,2);

            // m_spread.nwobject(SPR_INPUT - 1).FontFamily("bold");

            #endregion

            #region Header Grouping

            //m_spread.HeaderGroupADD("Test", SPR_LOOKUPCODE - 1, 2);

            #endregion

            #region Width

            m_spread.nwobject(SPR_SELECT - 1).Width(50);
            m_spread.nwobject(SPR_EmpCode - 1).Width(200);
            m_spread.nwobject(SPR_EmpName - 1).Width(200);

            #endregion

            #region Color


            m_spread.nwobject(SPR_EmpCode - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_EmpName - 1).BackgroundColor("white");

            #endregion

            #region Grid Buttons

            m_spread.buttonDelete = false;
            m_spread.buttonInsert = false;
            m_spread.buttonSearchFind = false;

            m_spread.buttonResetColumn = true;
            m_spread.buttonSaveColumn = true;
            m_spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);


            #endregion

            m_spread.HeaderBorderColor("#DEDEDE");
            m_spread.rowBackground("#FFFFFF", "#FFFFFF");
            m_spread.TableBorderColor("#BBB");
            m_spread.BodyBorderColor("#BBB");
            m_spread.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            m_spread.HeaderTextColor("#131313");

            js.makeHTML("#nwGridCon", m_spread.createTable());

            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",1,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
        }

        private void LoadField()
        {
            DataTable dt = new DataTable();
            //int qryType = int.Parse(dal.MenuItemVersion[0].ToString()) <= 9 ? 24 : 35;
            dt = dal.getLoadedFields(WebApp.nwobjectText("idvallugTranType"), WebApp.nwobjectText("fieldCode"), WebApp.nwobjectInt("fieldTag"), based.SecurityAccess.RecUser,35);

            if (dt.Rows.Count > 0)
            {
                foreach (DataRow dRow in dt.Rows)
                {
                    string alias = dRow["alias"].ToString();
                    string tag = dRow["fieldtag"].ToString();
                    string wftag = dRow["wftag"].ToString();
                    if (alias.Contains("lug"))
                    {
                        js.makeValueText($"#idval{alias}{tag}", dRow["code"].ToString());
                        js.makeValueText($"#descval{alias}{tag}", dRow["description"].ToString());
                    }
                    else
                    {
                        js.makeValueText($"#{alias}{tag}", dRow["code"].ToString());
                    }
                    if (wftag == "1")
                    {
                        js.makeValueText("#txtPC", dRow["code"].ToString());
                    }
                    if (wftag == "2")
                    {
                        js.makeValueText("#txtCC", dRow["code"].ToString());
                    }
                    if (wftag == "3")
                    {
                        js.makeValueText("#txtAmount", dRow["code"].ToString());
                    }
                }
                js.ADD("GetBasePercentage();");
            }
        }
        private void DynamicFields()
        {
            js.ADD("$('.dynaField').remove();");
            DataTable dt = new DataTable();
            int qryType = 34;
            dt = dal.getDynamicFields(WebApp.nwobjectText("idvallugTranType"),qryType);
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i <= dt.Rows.Count - 1; i++)
                {
                    js.ADD($"$('#field{dt.Rows[i]["fieldTag"]}').append('{dt.Rows[i]["html"]}');");
                    js.makeValueText("#txtmaxTag", dt.Rows[i]["maxtag"].ToString());
                }

            }
        }
        private void LoadedDataRefresh()
        {
            DataTable dt = new DataTable();
            dt = dal.getLoadedFieldsRefresh(WebApp.nwobjectText("txtDocno"));
            if (dt.Rows.Count > 0)
            {
                js.makeValueText("#idvallugField1", dt.Rows[0]["col1"].ToString());
                js.makeValueText("#descvallugField1", dt.Rows[0]["col1Desc"].ToString());
                js.makeValueText("#txtField1", dt.Rows[0]["col1"].ToString());

                js.makeValueText("#idvallugField2", dt.Rows[0]["col2"].ToString());
                js.makeValueText("#descvallugField2", dt.Rows[0]["col2Desc"].ToString());
                js.makeValueText("#txtField2", dt.Rows[0]["col2"].ToString());

                js.makeValueText("#idvallugField3", dt.Rows[0]["col3"].ToString());
                js.makeValueText("#descvallugField3", dt.Rows[0]["col3Desc"].ToString());
                js.makeValueText("#txtField3", dt.Rows[0]["col3"].ToString());

                js.makeValueText("#idvallugField4", dt.Rows[0]["col4"].ToString());
                js.makeValueText("#descvallugField4", dt.Rows[0]["col4Desc"].ToString());
                js.makeValueText("#txtField4", dt.Rows[0]["col4"].ToString());

                js.makeValueText("#idvallugField5", dt.Rows[0]["col5"].ToString());
                js.makeValueText("#descvallugField5", dt.Rows[0]["col5Desc"].ToString());
                js.makeValueText("#txtField5", dt.Rows[0]["col5"].ToString());

                js.makeValueText("#idvallugField6", dt.Rows[0]["col6"].ToString());
                js.makeValueText("#descvallugField6", dt.Rows[0]["col6Desc"].ToString());
                js.makeValueText("#txtField6", dt.Rows[0]["col6"].ToString());

                js.makeValueText("#idvallugField7", dt.Rows[0]["col7"].ToString());
                js.makeValueText("#descvallugField7", dt.Rows[0]["col7Desc"].ToString());
                js.makeValueText("#txtField7", dt.Rows[0]["col7"].ToString());

                js.makeValueText("#idvallugField8", dt.Rows[0]["col8"].ToString());
                js.makeValueText("#descvallugField8", dt.Rows[0]["col8Desc"].ToString());
                js.makeValueText("#txtField8", dt.Rows[0]["col8"].ToString());

                js.makeValueText("#idvallugField9", dt.Rows[0]["col9"].ToString());
                js.makeValueText("#descvallugField9", dt.Rows[0]["col9Desc"].ToString());
                js.makeValueText("#txtField9", dt.Rows[0]["col9"].ToString());

                js.makeValueText("#idvallugField10", dt.Rows[0]["col10"].ToString());
                js.makeValueText("#descvallugField10", dt.Rows[0]["col10Desc"].ToString());
                js.makeValueText("#txtField10", dt.Rows[0]["col10"].ToString());

                js.makeValueText("#idvallugField11", dt.Rows[0]["col11"].ToString());
                js.makeValueText("#descvallugField11", dt.Rows[0]["col11Desc"].ToString());
                js.makeValueText("#txtField11", dt.Rows[0]["col11"].ToString());

                js.makeValueText("#idvallugField12", dt.Rows[0]["col12"].ToString());
                js.makeValueText("#descvallugField12", dt.Rows[0]["col12Desc"].ToString());
                js.makeValueText("#txtField12", dt.Rows[0]["col12"].ToString());

                js.makeValueText("#idvallugField13", dt.Rows[0]["col13"].ToString());
                js.makeValueText("#descvallugField13", dt.Rows[0]["col13Desc"].ToString());
                js.makeValueText("#txtField13", dt.Rows[0]["col13"].ToString());

                js.makeValueText("#idvallugField14", dt.Rows[0]["col14"].ToString());
                js.makeValueText("#descvallugField14", dt.Rows[0]["col14Desc"].ToString());
                js.makeValueText("#txtField14", dt.Rows[0]["col14"].ToString());

                js.makeValueText("#idvallugField15", dt.Rows[0]["col15"].ToString());
                js.makeValueText("#descvallugField15", dt.Rows[0]["col15Desc"].ToString());
                js.makeValueText("#txtField15", dt.Rows[0]["col15"].ToString());

                js.makeValueText("#idvallugField16", dt.Rows[0]["col16"].ToString());
                js.makeValueText("#descvallugField16", dt.Rows[0]["col16Desc"].ToString());
                js.makeValueText("#txtField16", dt.Rows[0]["col16"].ToString());

                js.makeValueText("#idvallugField17", dt.Rows[0]["col17"].ToString());
                js.makeValueText("#descvallugField17", dt.Rows[0]["col17Desc"].ToString());
                js.makeValueText("#txtField17", dt.Rows[0]["col17"].ToString());

                js.makeValueText("#idvallugField18", dt.Rows[0]["col18"].ToString());
                js.makeValueText("#descvallugField18", dt.Rows[0]["col18Desc"].ToString());
                js.makeValueText("#txtField18", dt.Rows[0]["col18"].ToString());

                js.makeValueText("#idvallugField19", dt.Rows[0]["col19"].ToString());
                js.makeValueText("#descvallugField19", dt.Rows[0]["col19Desc"].ToString());
                js.makeValueText("#txtField19", dt.Rows[0]["col19"].ToString());

                js.makeValueText("#idvallugField20", dt.Rows[0]["col20"].ToString());
                js.makeValueText("#descvallugField20", dt.Rows[0]["col20Desc"].ToString());
                js.makeValueText("#txtField20", dt.Rows[0]["col20"].ToString());
            }

            js.ADD("VwEntryDisableFields();");
        }


    }
}