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
    public class SBHoldingOfUnitBL : nwAction
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
            dal = new SBHoldingOfUnitDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        private string transtypecode = "HOLDPR";
        SBHoldingOfUnitDAL dal;

        public SBHoldingOfUnitBL()
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
            strConn = this.UserDefinedConnectionString;

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.Inquire(based.SecurityAccess.RecUser, WebApp.nwobjectText("unitCode"));
                    nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                    break;

                case "getlugCustClassification":
                    strSQL = dal.InquireCustClassification();
                    nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                    break;

                case "getlugCustomer":
                    strSQL = dal.InquireCustomer(WebApp.nwobjectText("customerType"), WebApp.nwobjectText("custClassification"), based.SecurityAccess.RecUser, WebApp.nwobjectText("unitCode"));
                    nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                    break;

                case "getlugProsCustomer":
                    strSQL = dal.InquireProsCustomer(WebApp.nwobjectText("customerType"), WebApp.nwobjectText("custClassification"), based.SecurityAccess.RecUser, WebApp.nwobjectText("unitCode"));
                    nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                    break;

                case "getlugLocAcctForms":
                    strSQL = dal.InquireLocAcctForms(based.SecurityAccess.RecUser);
                    nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                    break;

                case "getlugHoldingType":
                    strSQL = dal.InquireHoldingType();
                    nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                    break;

                case "getlugRBAOUnitCode":
                    strSQL = dal.getlugRBAOUnitCode(WebApp.nwobjectText("unit"));
                    nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
            }

            return strFinal;
        }

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";
            switch (i)
            {
                case eRecordOperation.AddNew:
                    InitializeValues();
                    break;

                case eRecordOperation.Save:
                    RecordOperationResult = ValidateData("saved");

                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dtHDR = LoadSchemaHDR("save");
                        DataTable dtUnitDtls = LoadSchemaUnitLIN();
                        RecordOperationResult = dal.SaveData(dtHDR, dtUnitDtls, isNewRow);
                    }
                    else
                        Prompt.Information(RecordOperationResult, based.Title);

                    break;

                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("transNo"), based.SecurityAccess.RecUser);
                    break;

                case eRecordOperation.Process:
                    RecordOperationResult = ValidateData("processed");

                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dtHDR = LoadSchemaHDR("process");
                        DataTable dtUnitDtls = LoadSchemaUnitLIN();

                        RecordOperationResult = dal.ProcessData(dtHDR, dtUnitDtls);
                    }
                    else
                        Prompt.Information(RecordOperationResult, based.Title);
                    break;

                case eRecordOperation.Refresh:
                    RefreshData();
                    js.ADD("nwLoading_End('xLoading');");
                    break;

                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    break;

                case eRecordOperation.Import:
                    tempstr = "import";
                    Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Export:

                    string xsessionid = WebApp.nwobjectText("gridExportSessionID");
                    DataTable dtExport = new DataTable();
                    try
                    {
                        dtExport = (DataTable)HttpContext.Current.Session["Data_" + xsessionid];
                    }
                    catch { }

                    string LISTINGFILENAME = "";
                    if (dal.LISTINGFILENAME + " Listing" == "") LISTINGFILENAME = "Sheet 1";
                    else LISTINGFILENAME = dal.LISTINGFILENAME + " Listing";

                    ListingAndPrint frmlist = new ListingAndPrint(ListingAndPrint.FormType.Listing, dal.LISTINGSTARTROW, dtExport, //dal.LISTINGQUERY(""),
                                                           LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                           based.SecurityAccess.RecUserName, LISTINGFILENAME);

                    frmlist.m_Spread.nwobject(17).TextAlign("right");
                    frmlist.m_Spread.nwobject(18).TextAlign("right");
                    frmlist.m_Spread.nwobject(19).TextAlign("right");
                    frmlist.m_Spread.PagerPerPage(30);
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
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Closing:
                    tempstr = "closing";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Search:
                    tempstr = "search";
                    Prompt.Information(tempstr, based.Title);
                    break;
            }

            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                {
                    js.ADD("loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtCode") + "') ");
                    RefreshData();
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i).TrimEnd('.');
                    if (i == eRecordOperation.Process) RecordOperationResult = "Process completed";

                    Prompt.Information(RecordOperationResult, based.Title);
                }
                else
                {
                    if (RecordOperationResult.IndexOf("Error") != 0)
                        Prompt.Information(RecordOperationResult, based.Title);
                    else
                        Prompt.Error(RecordOperationResult, based.Title);
                }
            }
        }

        public string get_Initialize(string strParameter, string strValue)
        {
            string strFinal = "";
            WebApp = new WebApplib(strParameter, strValue);
            string unitCode = WebApp.nwobjectText("unitCode");
            bool isUnitExist = dal.isUnitExist(unitCode, based.SecurityAccess.RecUser);

            //Global Variables
            js.ADD($"DateToday='{dal.getNoahDate()}'");
            js.ADD($"HoldExpDate='{dal.getHoldingExpiryDate(unitCode, "", based.SecurityAccess.RecUser)}'");
            js.ADD($"ServerLink='{dal.Serverlink()}'");
            js.ADD($"MinDate='{dal.getMinDate()}'");
            js.ADD($"MaxDate='{dal.getMaxDate()}'");

            if (unitCode != "" && !isUnitExist)
            {
                js.ADD("$('#noah-webui-default-New').click();");
            }
            else
            {
                RefreshData();
            }

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
                    break;

                case "actBindCollectionEmpty":
                    string unitCode = WebApp.nwobjectText("unitCode");
                    bool isUnitExist = dal.isUnitExist(unitCode, based.SecurityAccess.RecUser);
                    if (unitCode != "" && !isUnitExist)
                    {
                        js.ADD("$('#noah-webui-default-New').click();");
                    }
                    js.ADD("nwLoading_End('xLoading')");
                    break;

                case "actInitializeDetails":
                    string nwTypeCode = "", nwClassCode = "";
                    if (HttpContext.Current != null)
                    {
                        var request = HttpContext.Current.Request;
                        nwTypeCode = request.QueryString["nwTypeCode"];
                        nwClassCode = request.QueryString["nwClassCode"];
                    }
                    js.ADD($"HoldExpDate='{dal.getHoldingExpiryDate(WebApp.nwobjectText("unitCode"), WebApp.nwobjectText("custClassification"), based.SecurityAccess.RecUser)}'");
                    js.ADD("$('#txtHoldingExpiryDate').val(moment(new Date('" + dal.getHoldingExpiryDate(WebApp.nwobjectText("unitCode"), WebApp.nwobjectText("custClassification"), based.SecurityAccess.RecUser) + "')).format('MM/DD/YYYY HH:mm:ss'));");

                    CreateUnitDtlsGrid(true, dal.GetDefLineUnitDtls(WebApp.nwobjectText("unitCode"), WebApp.nwobjectText("custClassification"), based.SecurityAccess.RecUser, nwTypeCode, nwClassCode));
                    break;

                case "actRefBaseOn":
                    CreateGridRefBaseOn(true);
                    js.ADD("nwLoading_End('actRefBaseOnLoading')");
                    break;

                case "actHasRqrdCompli":
                    setRqmtCompProp();
                    js.ADD("nwLoading_End('actHasRqrdCompli')");
                    break;

                case "actbtnSaveRefBase":
                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dt = LoadSchemaRBAO();
                        RecordOperationResult = dal.SaveRBAO(dt, isNewRow);
                        Prompt.Information("Saved successfully", "Holding Of Unit, Rerference Base / Add On");
                        js.ADD("nwPopupForm_HideModal('nwReferenceBaseAddOn');");
                    }
                    else
                        Prompt.Error(RecordOperationResult, "Holding Of Unit, Rerference Base / Add On");
                    break;

                case "actbtnRefreshRefBase":
                    //js.ADD("nwGridMainCon_BookRBAO.ActiveSheet.Refresh();");
                    CreateGridRefBaseOn(true);
                    js.ADD("nwLoading_End('actRefBaseOnLoading')");
                    break;

                default:
                    Prompt.Information("act_Method not found: " + strMethod, "Error");
                    break;
            }
            return js.makeJSPostScript(execute());
        }
        public string getToolBoxData(string tableName, string getMethod, string strParameter, string strValue)
        {
            string strFinal = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (getMethod)
            {
                case "toolbox":
                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "transNo";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetDataHDR(based.SecurityAccess.RecUser, WebApp.nwobjectText("unitCode")));

                    break;
            }

            return strFinal;
        }

        private void InitializeValues()
        {
            nwToolBox.bindingNavigatorSaveItem.Enable = true;
            //nwToolBox.bindingNavigatorAddNewItem.Enable =
            nwToolBox.bindingNavigatorInquireItem.Enable =
            nwToolBox.bindingNavigatorDeleteItem.Visible =
            nwToolBox.bindingNavigatorProcessItem.Enable = false;
            nwToolBox.bindingNavigatorExportItem.Enable = true;

            DefaultLocAcctForms();
            LoadDefualtHoldingType();

            string nwTypeCode = "", nwClassCode = "";
            if (HttpContext.Current != null)
            {
                var request = HttpContext.Current.Request;
                nwTypeCode = request.QueryString["nwTypeCode"];
                nwClassCode = request.QueryString["nwClassCode"];
            }
            CreateUnitDtlsGrid(true, dal.GetDefLineUnitDtls(WebApp.nwobjectText("unitCode"), "", based.SecurityAccess.RecUser, nwTypeCode, nwClassCode)); //note blank 1st load customer classification

            //Load Sale Type
            DataTable dtSType = dal.GetSaleType(WebApp.nwobjectText("unitCode"));
            js.makeValueText("#txtSaleType", dtSType.Rows[0]["allowlease"] + "");
        }

        private void DefaultLocAcctForms()
        {
            DataTable dtLoc = dal.GetDefaultLocAcctForms(based.SecurityAccess.RecUser);
            if (dtLoc.Rows.Count > 0)
            {
                js.makeValueText("#idvallugLocAcctForms", dtLoc.Rows[0]["Code"] + "");
                js.makeValueText("#descvallugLocAcctForms", dtLoc.Rows[0]["Description"] + "");
            }
            else
            {
                js.makeValueText("#idvallugLocAcctForms", "");
                js.makeValueText("#descvallugLocAcctForms", "");
            }
        }
        private void LoadDefualtHoldingType()
        {
            //default holding type to 002
            DataTable dtHoldingType = new DataTable();
            dtHoldingType = SFObjects.LoadDataTable(dal.InquireHoldingType(), this.UserDefinedConnectionString);
            var dataRows = dtHoldingType.AsEnumerable().Where(x => x["Code"].ToString() == "002");
            if (dataRows.Any())
            {
                DataRow row = dataRows.Single();
                js.makeValueText("#idvallugHoldingType", row["Code"].ToString());
                js.makeValueText("#descvallugHoldingType", row["Description"].ToString());
            }
        }

        private void SetBindings()
        {
            SFObject.SetControlBinding("#rdIndividual", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "individual");
            SFObject.SetControlBinding("#rdCompany", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "company");
            SFObject.SetControlBinding("#idvallugCustClassification", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "custClassificationCode");
            SFObject.SetControlBinding("#descvallugCustClassification", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "custClassificationDesc");
            SFObject.SetControlBinding("#idvallugCustomer", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CustomerCode");
            SFObject.SetControlBinding("#idvallugProsCustomer", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "prosCustomerCode");

            SFObject.SetControlBinding("#txtLastName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LastName");
            SFObject.SetControlBinding("#txtFirstName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "FirstName");
            SFObject.SetControlBinding("#txtMiddleName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MiddleName");
            SFObject.SetControlBinding("#txtRegName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RegisteredName");
            SFObject.SetControlBinding("#txtTradeName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TradeName");
            SFObject.SetControlBinding("#idvallugLocAcctForms", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "locCode");
            SFObject.SetControlBinding("#descvallugLocAcctForms", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "locDesc");
            SFObject.SetControlBinding("#txtTransactionNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "transNo");
            SFObject.SetControlBinding("#idvallugHoldingType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "holdingTypeCode");
            SFObject.SetControlBinding("#descvallugHoldingType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "holdingTypeDesc");
            SFObject.SetControlBinding("#txtHoldingDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "holdingDate");
            SFObject.SetControlBinding("#txtHoldingExpiryDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "holdingExpDate");
            SFObject.SetControlBinding("#txtRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Remarks");
            SFObject.SetControlBinding("#txtRecordStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "docStatus");
            SFObject.SetControlBinding("#txtReasonForReturnCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "reasonForReturnCode");
            SFObject.SetControlBinding("#txtReasonForReturnDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "reasonForReturnDesc");
            SFObject.SetControlBinding("#txtRemarksForReturn", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "remarkForReturn");

            SFObject.SetControlBinding("#txtSaleType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "saletype");

            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RecUser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RecDate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "ModUser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "ModDate");
        }

        private void BindCollection()
        {
            string transNo = WebApp.nwobjectText("transNo");
            bool enable = transNo == "" ? false : true; // disable if transaction no is empty

            CreateUnitDtlsGrid(enable, dal.GetDataLineUnitDtls(transNo, WebApp.nwobjectText("unitCode")));
            setRqmtCompProp();
            js.ADD("nwLoading_End('xLoading');");
        }

        private string ValidateData(string type)
        {
            DataSet ds = WebApp.DataSet("conUnitDtlsGrid");
            DataTable dtUnitDtls = new DataTable();
            try
            {
                dtUnitDtls = ds.Tables[0];
            }
            catch { }

            string errorResult = String.Empty;

            ////////////////Header Validation
            if (WebApp.nwobjectText("custClassification").Length <= 0)
                errorResult += $"Cannot be {type}. Customer Classification is required.\n";

            if (WebApp.nwobjectText("proscustomer").Length <= 0)
                errorResult += $"Cannot be {type}. Propect Customer is required.\n";

            if (WebApp.nwobjectText("customer").Length <= 0)
                errorResult += $"Cannot be {type}. Customer is required.\n";


            if (WebApp.nwobjectText("locCode").Length <= 0)
                errorResult += $"Cannot be {type}. Location with Accountable Forms is required.\n";

            if (WebApp.nwobjectText("holdingType").Length <= 0)
                errorResult += $"Cannot be {type}. Holding Type is required.\n";

            if (WebApp.nwobjectText("holdDate").Length <= 0)
                errorResult += $"Cannot be {type}. Holding Date is required.\n";

            if (WebApp.nwobjectText("holdExpDate").Length <= 0)
                errorResult += $"Cannot be {type}. Holding Expiry Date is required.\n";

            ////////////////Unit Dtls Validation
            IEnumerable<DataRow> dataRow = dtUnitDtls.AsEnumerable().Where(item => (item[SPR_ProjectCode].ToString() != ""));

            if (!dataRow.Any())// if Line Details all blank
                errorResult += $"Cannot be {type}. At least one unit details is required.\n";

            //Check if specific unit exceeds allowable foreign ownership for a tower/pahse
            if (type == "saved")
            {
                if (dtUnitDtls.Rows.Count > 0)
                {
                    foreach (DataRow dRow in dtUnitDtls.Rows)
                    {
                        string uc = dRow[SPR_UnitCode].ToString();
                        string projCode = dRow[SPR_ProjectCode].ToString();
                        string tranNo = WebApp.nwobjectText("transNo");
                        string fov = dal.validateForeignOwnership(uc, projCode, tranNo);
                        if (fov == "1")
                        {
                            errorResult += $"Cannot be {type}. Exceeded the allowable foreign ownership for this tower. Please select from other tower.\n";
                        }
                    }
                }
            }


            ////////Upon Processing Validation
            if (type == "processed")
            {
                string rsnReturned = WebApp.nwobjectText("reasonForReturn");
                string uc = WebApp.nwobjectText("unitCode");
                string customer = WebApp.nwobjectText("customer");

                string withAddOn = dal.withMandatoryAddOn(uc);
                if (withAddOn != "")
                {
                    errorResult += $"Cannot be {type}. This Unit Requires add-on. Please wait add-on unit to be processed.\n";
                }

                if (rsnReturned == "RE016")
                {
                    errorResult += $"Cannot be {type}. This Unit Requires add-on. Please cancel Both Main and Add on Unit.\n";
                }


            }

            return errorResult;
        }

        private DataTable LoadSchemaHDR(string xtype)
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchemaHDR();
            #endregion

            DataRow dr = dtHDR.NewRow();
            string transNo = WebApp.nwobjectText("transNo");
            string locCode = WebApp.nwobjectText("locCode");
            transacno = string.IsNullOrWhiteSpace(transNo) ? generateTransNo(locCode.Trim(), transtypecode) : transNo;


            dr["CustomerType"] = WebApp.nwobjectText("customerType");
            dr["CustClassification"] = WebApp.nwobjectText("custClassification");
            dr["prosCustomerCode"] = WebApp.nwobjectText("proscustomer");
            dr["CustomerCode"] = WebApp.nwobjectText("customer");
            dr["LocForm"] = WebApp.nwobjectText("locCode");
            dr["TransactionNo"] = transacno;
            dr["HoldingType"] = WebApp.nwobjectText("holdingType");
            dr["HoldingDate"] = WebApp.nwobjectDate("holdDate").Equals("") ? (object)DBNull.Value : WebApp.nwobjectDate("holdDate");   //date
            dr["HoldingExpiryDate"] = WebApp.nwobjectDate("holdExpDate").Equals("") ? (object)DBNull.Value : WebApp.nwobjectDate("holdExpDate"); //date
            dr["Remarks"] = WebApp.nwobjectText("remarks");
            dr["Status"] = dal.getDocumentStatus(transacno, xtype);
            dr["saletype"] = WebApp.nwobjectText("saletype");

            dr["Recuser"] = based.SecurityAccess.RecUser;

            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion

            return dtHDR;
        }

        private DataTable LoadSchemaUnitLIN()
        {
            #region don't change
            DataTable dtUnit = new DataTable();
            dtUnit = dal.LoadSchemaUnitDtl();
            #endregion

            DataSet ds = WebApp.DataSet("conUnitDtlsGrid");
            DataTable dt = new DataTable();
            try
            {
                dt = ds.Tables[0];
            }
            catch { }

            int rownum = 1;

            if (dt.Rows.Count > 0)
            {
                foreach (DataRow dRow in dt.Rows)
                {
                    if (dRow[SPR_ProjectCode].ToString() != string.Empty)
                    {
                        DataRow dr = dtUnit.NewRow();
                        dr["UnitCode"] = dRow[SPR_UnitCode].ToString();
                        dr["QueueNo"] = dRow[SPR_QueueNo].ToString();
                        dr["AccNo"] = dRow[SPR_AccNo].ToString();
                        dr["HasRefBaseAddOn"] = dRow[SPR_HasRefBaseAddOn].ToString();
                        dr["rowno"] = rownum;

                        rownum++;
                        dtUnit.Rows.Add(dr);
                        dtUnit.AcceptChanges();
                    }
                }
            }

            return dtUnit;

        }

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
        }

        private void RefreshData()
        {
            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
            js.ADD("RefreshData()");
        }

        private void CreateUnitDtlsGrid(bool enable, DataTable dtSource)
        {
            string gridID = "conUnitDtlsGrid";
            nwGrid mspread = new nwGrid(gridID);

            mspread.Type = nwGridType.SpreadCanvas;

            if (dtSource.Rows.Count <= 0)
            {
                while (dtSource.Rows.Count != 5)
                {
                    dtSource.Rows.Add();
                }
            }
            else
            {
                dtSource.Rows.Add();
            }

            mspread.dataSource(dtSource);

            mspread.RowHeight(25);
            mspread.TableHeight(235);

            //for saving column width
            mspread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + gridID, based.SecurityAccess.RecUser);

            //column width
            mspread.nwobject(SPR_UnitCode).Width(0);
            mspread.nwobject(SPR_ProjectCode).Width(0);
            mspread.nwobject(SPR_Project).Width(200);
            mspread.nwobject(SPR_PhaseTowerCode).Width(0);
            mspread.nwobject(SPR_PhaseTower).Width(200);
            mspread.nwobject(SPR_BlockFloorCode).Width(0);
            mspread.nwobject(SPR_BlockFloor).Width(200);
            mspread.nwobject(SPR_LotUnitSlotNoCode).Width(0);
            mspread.nwobject(SPR_LotUnitSlotNo).Width(150);
            mspread.nwobject(SPR_SellingPrice).Width(200);
            mspread.nwobject(SPR_QueueNo).Width(100);
            mspread.nwobject(SPR_AccNo).Width(150);
            mspread.nwobject(SPR_RefBaseAddOn).Width(150);
            mspread.nwobject(SPR_HasRefBaseAddOn).Width(0);

            //column color
            for (int i = SPR_ProjectCode; i <= SPR_RefBaseAddOn; i++)
            {
                mspread.nwobject(i).BackgroundColor("gainsboro");
            }

            //pager 
            mspread.PagerPerPage(50);

            //CSS for GRID
            mspread.HeaderBorderColor("#DEDEDE");
            mspread.rowBackground("#FFFFFF", "#FFFFFF");
            mspread.TableBorderColor("#BBB");
            mspread.BodyBorderColor("#BBB");
            mspread.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            mspread.HeaderTextColor("#131313");
            mspread.HoverColor("#CAE1FF", "inherit");
            mspread.SelectedRowHover("#CAE1FF");
            mspread.SelectedRowHoverColor("inherit");
            mspread.HeaderBorderColor("silver");

            //align
            mspread.nwobject(SPR_SellingPrice).TextAlign("right");
            mspread.nwobject(SPR_QueueNo).TextAlign("right");
            mspread.nwobject(SPR_RefBaseAddOn).TextAlign("center");

            mspread.varSpreadBook = "nwGridMainCon_BookUnit";
            mspread.varSpreadSheet = "nwGridMainCon_SheetUnit";
            js.ADD(mspread.createTable());

            // enable / disable grid
            js.ADD("$('#" + gridID + "').enable(" + enable.ToString().ToLower() + ")");
            js.ADD("$('#" + gridID + "').enable(" + "true" + ")");
            js.ADD("CreateUnitDtlsGridDone()");
        }

        public void CreateGridRefBaseOn(bool isLoad)
        {
            string gridID = "nwGridRefBaseOn";
            nwGrid grid = new nwGrid(gridID);
            DataTable dt = new DataTable();

            grid.Type = nwGridType.SpreadCanvas;

            dt = dal.getRefBaseAddOn(WebApp.nwobjectText("unit"));

            if (dt.Rows.Count <= 0)
            {
                while (dt.Rows.Count < 3)
                {
                    dt.Rows.Add();
                }
            }

            grid.dataSource(dt);

            grid.RowHeight(25);

            //pager 
            grid.PagerDataEditable(true);
            grid.PagerPerPage(30);
            grid.TableHeight(200);

            #region Column Name           
            grid.nwobject(SPR_RBAOUnitCode).ColumnName("Unit Code");
            grid.nwobject(SPR_RBAOUnitDesc).ColumnName("Unit Description");
            #endregion

            #region Background Color           
            grid.nwobject(SPR_RBAOUnitCode).BackgroundColor("Cyan");
            grid.nwobject(SPR_RBAOUnitDesc).BackgroundColor("Gainsboro");
            #endregion

            #region Column Width
            grid.nwobject(SPR_RBAOUnitCode).Width(200);
            grid.nwobject(SPR_RBAOUnitDesc).Width(200);
            #endregion

            #region Column Template
            grid.nwobject(SPR_RBAOUnitCode).LookUp("lugRBAOUnitCode", true);
            grid.nwobject(SPR_RBAOUnitCode).Enabled(true);

            grid.nwobject(SPR_RBAOUnitCode).LookUp("lugRBAOUnitCode", true);
            #endregion

            grid.GetSaveSort(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser); // this line will be default and suggested line code if there are many grid in one menu item  change -1 to -2 and so on...
            grid.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

            //## THEME FORMAT
            grid.HeaderBorderColor("#DEDEDE");
            grid.rowBackground("#FFFFFF", "#FFFFFF");
            grid.TableBorderColor("#BBB");
            grid.BodyBorderColor("#BBB");
            grid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            grid.HeaderTextColor("#131313");
            grid.HoverColor("#DEDEDE", "inherit");
            grid.SelectedRowHover("#DEDEDE");
            grid.SelectedRowHoverColor("inherit");

            grid.varSpreadBook = "nwGridMainCon_BookRBAO";
            grid.varSpreadSheet = "nwGridMainCon_SheetRBAO";
            js.ADD(grid.createTable());
        }

        // generate transaction no
        private string generateTransNo(string locAcctForms, string tranType)
        {
            return dal.getDocumentNo(locAcctForms, tranType);
        }

        private DataTable LoadSchemaRBAO()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadSchemaRBAO();
            #endregion

            DataSet ds = WebApp.DataSet("nwGridRefBaseOn");
            DataTable dt = new DataTable();
            try
            {
                dt = ds.Tables[0];
            }
            catch { }

            int rownum = 1;

            if (dt.Rows.Count > 0)
            {
                foreach (DataRow dRow in dt.Rows)
                {
                    if (dRow[SPR_RBAOUnitCode].ToString() != string.Empty)
                    {
                        DataRow dr = dtLIN.NewRow();
                        dr["UnitCode"] = WebApp.nwobjectText("unitCode");
                        dr["Code"] = dRow[SPR_RBAOUnitCode].ToString();
                        dr["Desc"] = dRow[SPR_RBAOUnitDesc].ToString();
                        dr["rowno"] = rownum;

                        rownum++;
                        dtLIN.Rows.Add(dr);
                        dtLIN.AcceptChanges();
                    }
                }
            }

            return dtLIN;
        }

        private void setRqmtCompProp()
        {
            if (dal.hasSavedRqrdCompli(WebApp.nwobjectText("transNo")) == "True")
            {
                js.ADD("$('#btnReqCompliance').removeClass('btnGray');");
                js.ADD("$('#btnReqCompliance').removeClass('btnOrange');");
                js.ADD("$('#btnReqCompliance').addClass('btnGreen');");
            }
            else
            {
                js.ADD("$('#btnReqCompliance').removeClass('btnGray');");
                js.ADD("$('#btnReqCompliance').removeClass('btnGreen');");
                js.ADD("$('#btnReqCompliance').addClass('btnOrange');");
            }
        }

    }
}