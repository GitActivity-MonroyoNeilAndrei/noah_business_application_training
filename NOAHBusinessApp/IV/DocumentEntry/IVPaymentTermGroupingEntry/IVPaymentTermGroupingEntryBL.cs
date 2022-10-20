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

namespace Noah_Web.forms_BusinessLayer
{
    public class IVPaymentTermGroupingEntryBL : nwAction
    {

        public static string nwDocno = string.Empty;
        #region Variables needed
        //string _strFinal = ""; // container of string result
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

        private const int
           //Grid
            SPR_CODE = 1,
            SPR_DESCRIPTION = 2,
            SPR_FINANCETYPE = 3,
            SPR_LTO = 4,
            SPR_UNITCODE = 5,
            SPR_EFFCTVDATEFROM = 6,
            SPR_EFFCTVDATETO = 7,
            SPR_DISCOUNTCODE = 8,
            SPR_DISCOUNTDESC = 9,
            SPR_DISCOUNTRATE = 10,
            SPR_BASISDISCOUNT = 11,
            SPR_APPDISCOUNT = 12,
            SPR_VIEW = 13;


        private const int
        //Grid details
        SPR_DTL_CODE = 1,
        SPR_DTL_CATEGORYCODE = 2,
        SPR_DTL_CATEGORYDESC = 3,
        SPR_DTL_CONTRACTRATE = 4,
        SPR_DTL_CONTRACTAMOUNT = 5,
        SPR_DTL_DEPOSITMONTHS = 6,
        SPR_DTL_TERMCODE = 7,
        SPR_DTL_TERMDESC = 8,
        SPR_DTL_PERIOD = 9,
        SPR_DTL_DPDISCOUNT = 10,
        SPR_DTL_DPDISCOUNTRATE = 11,
        SPR_DTL_OTHERCHARGESALLOC = 12;

        public string Result = "";
        private static int isAdd = 0;
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
            //Addchars();
            dal = new IVPaymentTermGroupingEntryDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        string RecordOperationResult = String.Empty;
        IVPaymentTermGroupingEntryDAL dal;
        //int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public IVPaymentTermGroupingEntryBL()
        {
            //dal = new DataAccessLayer(this.UserDefinedConnectionString,""); 
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
            //string strName = "";
            strConn = this.UserDefinedConnectionString;

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.inquireQuery(based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnSort("Code", "ASCENDING");
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugLocation":
                    strSQL = dal.luglocForm(based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugProject":
                    string locform = WebApp.nwobjectText("idvallugLocation");
                    strSQL = dal.lugProject(locform);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugFinanceType":
                    strSQL = dal.lugFinanceType();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugUnitCode":
                    strSQL = dal.lugUnitCode();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugDiscountCode":
                    strSQL = dal.lugDiscount();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugCategory":
                    strSQL = dal.lugCategory();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugTerm":
                    strSQL = dal.lugTerm(WebApp.nwobjectText("financingType"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugBasisDisccount":
                    strSQL = dal.getBasisDiscount();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugAppDiscount":
                    strSQL = dal.getAppDiscount();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
            }

            return strFinal;
        }

        ///// Standard RecordOperation 

        public void
            RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";

            switch (i)
            {
                case eRecordOperation.AddNew:

                    nwToolBox.bindingNavigatorSaveItem.Enable = true;
                    nwToolBox.bindingNavigatorSaveItem.Visible = true;
                    nwToolBox.bindingNavigatorAddNewItem.Enable = false;
                    nwToolBox.bindingNavigatorPrintItem.Enable =
                    nwToolBox.bindingNavigatorInquireItem.Enable =
                    nwToolBox.bindingNavigatorImportItem.Visible =
                    nwToolBox.bindingNavigatorDeleteItem.Enable =
                    nwToolBox.bindingNavigatorDeleteItem.Visible =
                    nwToolBox.bindingNavigatorExportItem.Enable = false;
                    nwToolBox.bindingNavigatorProcessItem.Enable = false;
                    nwToolBox.bindingNavigatorProcessItem.Visible = false;
                    GenerateGrid(false, false);

                    DataTable def = dal.loadDefaultLocation(based.SecurityAccess.RecUser);
                    if (def.Rows.Count > 0)
                    {
                        js.makeValueText("#idvallugLocation", def.Rows[0][0].ToString());
                        js.makeValueText("#descvallugLocation", def.Rows[0][1].ToString());
                    }

                    isAdd = 1;
                    break;

                case eRecordOperation.Save:

                    DataTable dtHDR = LoadSchema();
                    //DataTable dtLIN = WebApp.nwGridData(WebApp.nwobjectText("nwGridCon"));

                    DataSet ds = WebApp.DataSet("nwGridCon");
                    DataTable dtLIN = new DataTable();
                    try
                    {
                        dtLIN = ds.Tables[0];
                    }
                    catch { }

                    DataTable dtJson = JsonConvert.DeserializeObject<DataTable>(WebApp.nwobjectText("jsonTbl"));

                    DataTable dtLINLoadschema  = LoadSchemaLin();

                    RecordOperationResult = ValidateData(dtHDR, dtLINLoadschema, dtJson);

                    if (RecordOperationResult.Length <= 0)
                    {
                        RecordOperationResult = dal.SaveData(dtHDR, dtLIN, dtJson, based.SecurityAccess.RecUser, isNewRow);
                    }
                    else
                        Prompt.Information(RecordOperationResult, based.Title);
                    break;

                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("txtTransactionNo"));
                    break;

                case eRecordOperation.Process:

                    DataTable dtHDRProcess = LoadSchema();
                    DataTable dtLINLoadschemaProcess = LoadSchemaLin();
                    DataTable dtJsonProcess = JsonConvert.DeserializeObject<DataTable>(WebApp.nwobjectText("jsonTbl"));

                    isAdd = 2;

                    string docno = WebApp.nwobjectText("txtTransactionNo");

                    RecordOperationResult = ValidateData(dtHDRProcess, dtLINLoadschemaProcess, dtJsonProcess);

                    if (RecordOperationResult == string.Empty)
                        RecordOperationResult = dal.ProcessData(docno, based.SecurityAccess.RecUser);

                    break;

                case eRecordOperation.Refresh:
                    RefreshData();
                    js.ADD("nwLoading_End('xRefreshBtn');");

                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    Inquire();
                    break;

                case eRecordOperation.Import:
                    tempstr = "import";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Export:

                    string LISTINGFILENAME = "";
                    if (dal.LISTINGFILENAME + " Listing" == "") LISTINGFILENAME = "Sheet 1";
                    else LISTINGFILENAME = dal.LISTINGFILENAME + " Listing";

                    string sql = string.Empty;
                    sql = string.Format($@"SELECT SG.fn_getEmployeeName('{based.SecurityAccess.RecUser}')");
                    string sysuser = SFObject.returnText(sql, this.UserDefinedConnectionString);

                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, dal.LISTINGSTARTROW, dal.LISTINGQUERY(),
                                                           LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                           sysuser, LISTINGFILENAME);

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

            if(RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.IndexOf("Error") != 0 && RecordOperationResult.IndexOf("Cannot be saved") != 0)
                {
                    js.ADD("loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtCode") + "') ");
                    RefreshData();
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    Prompt.Information(RecordOperationResult, based.Title);
                }
                else
                {
                    if (RecordOperationResult.IndexOf("Error") != 0)
                        Prompt.Error(RecordOperationResult, based.Title);
                    else
                        Prompt.Error(RecordOperationResult, based.Title);
                }
            }
        }

        ////////////////////// For Customize 
        public string get_Initialize()
        {
            string strFinal = "";

            SetBindings();
            Main_Load();

            execute(ref strFinal);

            return js.makeJSPostScript(strFinal);
        }

        public string act_Method(string strMethod, string strParameter, string strValue)
        {
            //string strFinal = "", strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();
                    js.ADD("nwLoading_End('actBindCollection');");
                    break;

                case "actBindCollectionEmpty":
                    js.ADD("nwLoading_End('actBindCollectionEmpty')");
                    break;

                case "actbtnAddTranType":
                    GeneratePaymentTermDTL(true,false);
                    js.ADD("getPaymentCodeCustomFunct();");
                    js.ADD("nwLoading_End('actbtnAddTranType');");   
                    break;

                case "actSaveTranType":
                    js.ADD("nwLoading_End('xSaveTranTypeLoad')");
                    break;

                case "validateInput":
                    DataTable dt = new DataTable();
                    dt = dal.validatePaymentCodeLIN();

                    string x = WebApp.nwobjectText("validatePaymentCode");
                    foreach (DataRow items in dt.Rows)
                    {
                        if (WebApp.nwobjectText("validatePaymentCode") == items["Code"].ToString())
                        {
                            Prompt.Information("Cannot be saved.\nDuplicate Payment Code Code are not allowed", based.Title);
                            js.ADD("ClearFieldsLinupCodeValidation();");
                            js.ADD("nwPopupForm_HideModal('nwAddPaymentTermDTL');");
                        }
                    }
                    break;

                case "actHasRqrdCompli":
                    setRqmtCompProp();
                    js.ADD("nwLoading_End('actHasRqrdCompli')");
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
                    string codevalue = WebApp.nwobjectText("codevalue"); // codevalue will be filter of primary key add these filter
                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "Docno";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(codevalue,based.SecurityAccess.RecUser), this.UserDefinedConnectionString);
                    break;
            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#txtTransactionNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Docno");
            SFObject.SetControlBinding("#idvallugLocation", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LocationCode");
            SFObject.SetControlBinding("#descvallugLocation", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Locformdesc");

            SFObject.SetControlBinding("#idvallugProject", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Project");
            SFObject.SetControlBinding("#descvallugProject", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ProjectDesc");
            SFObject.SetControlBinding("#txtRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Remarks");

            SFObject.SetControlBinding("#dtpTranDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Docdate");
            SFObject.SetControlBinding("#txtTransactionNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Docno");
            SFObject.SetControlBinding("#txtStatusHidden", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Status");
            SFObject.SetControlBinding("#txtStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "StatusDesc");
            SFObject.SetControlBinding("#txtReasonDissapprove", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ReasonforDisapproval");
            SFObject.SetControlBinding("#txtRemarksDissapprove", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "DisapprovalRemarks");


            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");
        }

        private void BindCollection()
        {

            isAdd = 0;
            GenerateGrid(true, false);
            GeneratePaymentTermDTL(true, false);
            setRqmtCompProp();
            js.ADD("EnableFieldsDone();");

            string docno = WebApp.nwobjectText("txtTransactionNo");

            if (docno != string.Empty)
            {
                DataTable paymentTermDT = dal.getpaymentTermDT(docno);
                js.ADD($"json={DatatableToJson(paymentTermDT)}");
                js.ADD("nwGrid_Book.ActiveSheet.RowAdd();");
            }

            DataTable dt = new DataTable();
            dt = dal.changeViewDetailsColor(docno);

     
            //Change color of viewDetails
            DataTable dtLIN = dal.getDetails(docno);
            int x = 0;
            foreach (DataRow items in dt.Rows)
            {
                foreach (DataRow dtlin in dtLIN.Rows)
                {
                    if (dtlin[0].ToString() == items["PaymentCode"].ToString())
                    {
                        js.ADD($"nwGrid_Book.ActiveSheet.SetObjectType(SPR_VIEW - 1, {x}, 'button', 'green', '...');");
                        //js.ADD("$('#nwGridCon-nwData').find('tr:eq("+x+")').find('td:eq(13)').removeClass('btnOrange');");
                        //js.ADD("$('#nwGridCon-nwData').find('tr:eq(" + x + ")').find('td:eq(13)').removeClass('btnGray');");
                        //js.ADD("$('#nwGridCon-nwData').find('tr:eq(" + x + ")').find('td:eq(13)').addClass('btnGreen');");
                        x++;
                    }
                }

            }
        }

        private string ValidateData(DataTable dtHDR, DataTable dtLIN, DataTable dtjson)
        {
            string errorResult = String.Empty;

            if (WebApp.nwobjectText("idvallugLocation").Length <= 0)
                errorResult += "Cannot be saved. Location with Accountable Forms  is required.\n";

            if (WebApp.nwobjectText("idvallugProject").Length <= 0)
                errorResult += "Cannot be saved. Project  is required.\n";

            if (dtLIN.Rows.Count <= 0)
            {
                errorResult += "Cannot be saved. Atleast One line details is required.\n";
            }

            //lin row validation
            if (dtLIN.Rows.Count > 0)
            {
                string varX = "";
                int i = 0;

                foreach (DataRow items in dtLIN.Rows)
                {
                    varX = items["Code"].ToString();

                    if (varX != "" && items["Description"].ToString() == "")
                    {
                        errorResult += "Cannot be saved. Description is required at row " + (i + 1) + ".\n";
                    }
                    if (varX != "" && items["EffectiveDateFrom"].ToString() == "")
                    {
                        errorResult += "Cannot be saved. Effective Date  is required at row " + (i + 1) + ".\n";
                    }

                    i++;
                }

            }

            DataTable dt = new DataTable();
            dt = dal.validatePaymentCodeLIN();

            //Validate Unique PaymentCode upon Add
            if (isAdd == 1)
            {
                int linrow = 0;
                foreach (DataRow items in dt.Rows)
                {
                    foreach (DataRow dtLinUnputs in dtLIN.Rows)
                    {
                        //Validate existing data in SQL
                        if (dtLinUnputs[1].ToString().ToUpper() == items["Code"].ToString().ToUpper())
                        {
                            errorResult += "Cannot be saved.\nDuplicate Payment term Grouping Code are not allowed";
                        }
                        //Validate existing data in Grid UI
                        for (int i = linrow + 1; i < dtLIN.Rows.Count; i++)
                        {
                            if (dtLinUnputs[i].ToString().ToUpper() != "")
                            {
                                if (dtLIN.Rows[linrow]["Code"].ToString().ToUpper() == dtLIN.Rows[i]["Code"].ToString().ToUpper())
                                {
                                    errorResult += "Cannot be saved.Duplicate Payment term Grouping Code are not allowed\n";
                                }

                            }
                        }
                        linrow++;
                    }
                }
            }

            //Validate Process
            if (isAdd == 2)
            {
                string docno = WebApp.nwobjectText("txtTransactionNo");
                int rownum = 0;
                foreach (DataRow dtItems in dtLIN.Rows)
                {
                    rownum++;
                    //DataTable dtLinValidate = dal.hasSavePaymentTermDetails(docno, dtItems["Code"].ToString(), rownum);
                    //string value = dtLinValidate.Rows[0][0].ToString();
                    string value = dal.hasSavePaymentTermDetails(docno, dtItems["Code"].ToString());

                    if (value == "0")
                    {

                        errorResult += "Cannot be saved. Atleast One Payment Term Grouping Details  is required.\n";
                    }
                }
            }

            if (dtjson.Rows.Count == 0)
            {
                errorResult += "Cannot be saved. Payment Term Details  is required.\n";

            }
            else
            {
                DataView viewLine = new DataView(dtLIN);
                DataTable dtLine = viewLine.ToTable(true, "Code");

                DataView viewDetails = new DataView(dtjson);
                DataTable dtDetails = viewDetails.ToTable(true, "payment_DTL_Code");

                if ((dtLine.Rows.Count != dtDetails.Rows.Count))
                    errorResult += "Cannot be saved. Payment Term Details  is required.\n";
            }

            return errorResult;
        }


        public string validateSaveTranType(DataTable dt) {
            //DataRow dr = dt.Rows[0];
            //string errorResult = String.Empty;
            //if (dal.isAlreadyExists(dr["SellerRoleCode"].ToString())) {
            //    errorResult += "Cannot be saved. Duplicate records are not allowed.\n";
            //}
            return "";
        }

        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema();
            #endregion

            DataRow dr = dtHDR.NewRow();

            dr["Docno"] = WebApp.nwobjectText("txtTransactionNo");
            dr["LocationCode"] = WebApp.nwobjectText("idvallugLocation");
            dr["ProjectCode"] = WebApp.nwobjectText("idvallugProject");
            dr["Remarks"] = WebApp.nwobjectText("txtRemarks");

            dr["Recuser"] = based.SecurityAccess.RecUser;
            dr["Moduser"] = based.SecurityAccess.RecUser;

            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion

            return dtHDR;
        }

        private DataTable LoadSchemaLin()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadSchemaLIN();
            #endregion

           // DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridCon"));

            DataSet ds = WebApp.DataSet("nwGridCon");
            DataTable dt = new DataTable();
            try
            {
                dt = ds.Tables[0];
            }
            catch { }

            foreach (DataRow dr_details in dt.Rows)
            {
                if (dr_details[SPR_CODE - 1].ToString() != string.Empty)
                {
                    DataRow dr = dtLIN.NewRow();

                    dr["Code"] = dr_details[SPR_CODE - 1].ToString();
                    dr["description"] = dr_details[SPR_DESCRIPTION - 1].ToString();
                    dr["financingType"] = dr_details[SPR_FINANCETYPE - 1].ToString();
                    dr["lto"] = dr_details[SPR_LTO - 1].ToString();
                    dr["unitCode"] = dr_details[SPR_UNITCODE - 1].ToString();
                    dr["effectiveDateFrom"] = dr_details[SPR_EFFCTVDATEFROM - 1].ToString() == "" ? (object)DBNull.Value : dr_details[SPR_EFFCTVDATEFROM - 1].ToString();
                    dr["effectiveDateTo"] = dr_details[SPR_EFFCTVDATETO - 1].ToString() == "" ? (object)DBNull.Value : dr_details[SPR_EFFCTVDATETO - 1].ToString();
                    dr["discountCode"] = dr_details[SPR_DISCOUNTCODE - 1].ToString();
                    dr["discountRate"] = dr_details[SPR_DISCOUNTRATE - 1].ToString() == "" ? "0" : dr_details[SPR_DISCOUNTRATE - 1].ToString();
                    dr["basisofDiscount"] = dr_details[SPR_BASISDISCOUNT - 1].ToString();
                    dr["ApplicationofDiscount"] = dr_details[SPR_APPDISCOUNT - 1].ToString();

                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                }
            }
            return dtLIN;
        }




        private void Main_Load()
        {
            //nwToolBox.bindingNavigatorAddNewItem.Visible = true;
            //nwToolBox.bindingNavigatorAddNewItem.Enable = true;
            //nwToolBox.bindingNavigatorSaveItem.Visible = false;
            //nwToolBox.bindingNavigatorDeleteItem.Visible = true;
            //nwToolBox.bindingNavigatorRefreshItem.Visible = true;
            //nwToolBox.bindingNavigatorRefreshItem.Enable = true;
            //nwToolBox.bindingNavigatorInquireItem.Visible = true;
            //nwToolBox.bindingNavigatorExportItem.Visible = true;

            js.ADD("Main_Load();");

            if (based.isInterface == true) dal.UpdateVersion();
            js.ADD($"basedTitle = '{based.Title}'");
            //Filter(true);
            GenerateGrid(false, false);
            js.ADD("setAccess();");

            js.ADD("DisableFields();");
        }
        private void Inquire()
        {
            nwToolBox.bindingNavigatorInquireItem.PrimaryKey = dal.primaryKey;
        }

        private void RefreshData()
        {

            nwDocno = WebApp.nwobjectText("nwDocno");
            // Filter(true);
            js.ADD("ClearFields();");
            js.ADD("EnableFieldsDone();");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
            js.ADD("RefreshData()");
        }

        public void GenerateGrid(bool isLoad, bool isInquire)
        {
            string gridID = "nwGridCon";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();
            nwGridCon.Type = nwGridType.SpreadCanvas; // Newspread

            nwGridCon.RowHeight(5);
            nwGridCon.CreateExcelGrid(5, SPR_VIEW);
            nwGridCon.TableHeight(200);
            nwGridCon.minRow(5);

            if (isLoad)
            {
                string id = WebApp.nwobjectText("txtTransactionNo");
                dt = dal.getDetails(id);
                nwGridCon.dataSource(dt);
                nwGridCon.minRow(dt.Rows.Count);
            }
            else
            {
                nwGridCon.CreateExcelGrid(5, SPR_VIEW);
            }

            #region Column Title         
            nwGridCon.nwobject(SPR_CODE - 1).ColumnName("Code");
            nwGridCon.nwobject(SPR_DESCRIPTION - 1).ColumnName("Description");
            nwGridCon.nwobject(SPR_FINANCETYPE - 1).ColumnName("Financing Type");
            nwGridCon.nwobject(SPR_LTO - 1).ColumnName("LTO");
            nwGridCon.nwobject(SPR_UNITCODE - 1).ColumnName("Unit Code");
            nwGridCon.nwobject(SPR_EFFCTVDATEFROM - 1).ColumnName("Effective Date From");
            nwGridCon.nwobject(SPR_EFFCTVDATETO - 1).ColumnName("Effective Date To");
            nwGridCon.nwobject(SPR_DISCOUNTCODE - 1).ColumnName("Discount Code");
            nwGridCon.nwobject(SPR_DISCOUNTDESC - 1).ColumnName("Discount Description");
            nwGridCon.nwobject(SPR_DISCOUNTRATE - 1).ColumnName("Discount Rate");
            nwGridCon.nwobject(SPR_BASISDISCOUNT - 1).ColumnName("Basis of Discount");
            nwGridCon.nwobject(SPR_APPDISCOUNT - 1).ColumnName("Application of Discount");
            nwGridCon.nwobject(SPR_VIEW - 1).ColumnName("Payment Term Details");

            nwGridCon.nwobject(SPR_CODE - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_DESCRIPTION - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_EFFCTVDATEFROM - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_UNITCODE - 1).HeaderFieldOptional(true);
            nwGridCon.nwobject(SPR_EFFCTVDATETO - 1).HeaderFieldOptional(true);
            nwGridCon.nwobject(SPR_DISCOUNTCODE - 1).HeaderFieldOptional(true);
            nwGridCon.nwobject(SPR_DISCOUNTRATE - 1).HeaderFieldOptional(true);
            nwGridCon.nwobject(SPR_BASISDISCOUNT - 1).HeaderFieldOptional(true);
            nwGridCon.nwobject(SPR_APPDISCOUNT - 1).HeaderFieldOptional(true);
            nwGridCon.nwobject(SPR_VIEW - 1).HeaderFieldRequired(true);
            #endregion

            #region Column Width
            nwGridCon.nwobject(SPR_CODE - 1).Width(80);
            nwGridCon.nwobject(SPR_DESCRIPTION - 1).Width(150);
            nwGridCon.nwobject(SPR_LTO - 1).Width(30);
            nwGridCon.nwobject(SPR_UNITCODE - 1).Width(80);
            nwGridCon.nwobject(SPR_DISCOUNTCODE - 1).Width(80);
            nwGridCon.nwobject(SPR_DISCOUNTDESC - 1).Width(150);
            nwGridCon.nwobject(SPR_DISCOUNTRATE - 1).Width(80);
            #endregion

            #region Column Color
            nwGridCon.nwobject(SPR_FINANCETYPE - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_UNITCODE - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_DISCOUNTCODE - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_BASISDISCOUNT - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_APPDISCOUNT - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_DISCOUNTCODE - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_DISCOUNTDESC - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Templates      
            nwGridCon.nwobject(SPR_CODE - 1).Template("<input class='txtLinCode'   maxlength='30'  value='{" + (SPR_CODE - 1) + "}' />");
            nwGridCon.nwobject(SPR_DESCRIPTION - 1).Template("<input class='txtLinDesc'   maxlength='500'  value='{" + (SPR_DESCRIPTION - 1) + "}' />");
            nwGridCon.nwobject(SPR_EFFCTVDATEFROM - 1).InputDate("nwDatePick");
            nwGridCon.nwobject(SPR_EFFCTVDATETO - 1).InputDate("nwDatePick");
            nwGridCon.nwobject(SPR_LTO - 1).CheckBox(false, "", true);
            nwGridCon.nwobject(SPR_DISCOUNTRATE - 1).Input("isNumber");

            //nwGridCon.nwobject(SPR_EFFCTVDATEFROM - 1).Template("<input class='nwDatePick isDate '  value='{" + (SPR_EFFCTVDATEFROM - 1) + "}'   />");
            //nwGridCon.nwobject(SPR_EFFCTVDATETO - 1).Template("<input class='nwDatePick isDate '   value='{" + (SPR_EFFCTVDATETO - 1) + "}'   />");
            //nwGridCon.nwobject(SPR_BASISDISCOUNT - 1).Template("   <select name=\"BasisDiscount\" id=\"BasisDiscount\">  <option selected value=\"{" + (SPR_BASISDISCOUNT - 1) + "}\">{" + (SPR_BASISDISCOUNT - 1) + "}</option>  <option value=\"Selling Price\">Selling Price</option>  <option value=\"Total Contract Price\">Total Contract Price</option> </select>");
            //nwGridCon.nwobject(SPR_APPDISCOUNT - 1).Template("   <select name=\"ApplicationDiscount\" id=\"ApplicationDiscount\">  <option selected value=\"{" + (SPR_APPDISCOUNT - 1) + "}\">{" + (SPR_APPDISCOUNT - 1) + "}</option>  <option value=\"Selling Price\">Selling Price</option>  <option value=\"Total Contract Price\">Total Contract Price</option> </select>");
            //nwGridCon.nwobject(SPR_DISCOUNTRATE - 1).Template("<input class='isNumber'  value='{" + (SPR_DISCOUNTRATE - 1) + "}'  />");
            //nwGridCon.nwobject(SPR_VIEW - 1).Template("<div style=\"text-align:center\">...</div>");
            //nwGridCon.nwobject(SPR_VIEW - 1).Class("btnGray nwBtnPaymentDTL");
            #endregion

            #region Column Button
            nwGridCon.buttonDelete = true;
            nwGridCon.buttonInsert = true;
            #endregion

            //## THEME FORMAT
            //nwGridCon.HeaderBorderColor("#DEDEDE");
            //nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            //nwGridCon.TableBorderColor("#BBB");
            //nwGridCon.BodyBorderColor("#BBB");
            //nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            //nwGridCon.HeaderTextColor("#131313");
            //nwGridCon.HoverColor("#DEDEDE", "inherit");
            //nwGridCon.SelectedRowHover("#DEDEDE");
            //nwGridCon.SelectedRowHoverColor("inherit");

            nwGridCon.varSpreadBook = "nwGrid_Book";
            nwGridCon.varSpreadSheet = "nwGrid_Sheet";
            js.ADD(nwGridCon.createTable());
            js.ADD("enableLineGrid();GridButton();");

            //js.makeHTML("#nwGridCon", nwGridCon.createTable());
            //js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            //js.ADD("nwGrid_TableFreeze(\"" + gridID + "\", 0, 0)");
            //js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
        }



        public void GeneratePaymentTermDTL(bool isLoad, bool isInquire)
        {
            string gridID = "nwGrid1Con";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();
            nwGridCon.Type = nwGridType.SpreadCanvas; // Newspread

            nwGridCon.RowHeight(5);
            nwGridCon.CreateExcelGrid(5, SPR_DTL_OTHERCHARGESALLOC);
            nwGridCon.TableHeight(200);
            nwGridCon.minRow(1);

            string sellerClassHDR = WebApp.nwobjectText("txtTransactionNo");
            string id = WebApp.nwobjectText("hasSQLData");

            if (WebApp.nwobjectBool("hasJson"))
            {
                dt = LoadDisplaySellerRole(JsonToDatatable(WebApp.nwobjectText("jsonPaymentTermDTL")));
                DataTable tblFiltered = dt.AsEnumerable()
                             .Where(r => r.Field<string>("payment_DTL_Code") == id)
                             .CopyToDataTable();
                nwGridCon.CreateExcelGrid(tblFiltered.Rows.Count, SPR_DTL_OTHERCHARGESALLOC);
                nwGridCon.dataSource(tblFiltered);
                nwGridCon.minRow(tblFiltered.Rows.Count + 1);
            }
            else
            {
                if (sellerClassHDR != "")
                {
                    DataTable  dtLoaded = dal.getDetailsSellerRole(sellerClassHDR, id);
                    nwGridCon.dataSource(dtLoaded);
                    nwGridCon.minRow(dtLoaded.Rows.Count + 1);
                }
            }

            #region Column Title         
            nwGridCon.nwobject(SPR_DTL_CODE - 1).ColumnName("Code");
            nwGridCon.nwobject(SPR_DTL_CATEGORYCODE - 1).ColumnName("Category Code");
            nwGridCon.nwobject(SPR_DTL_CATEGORYDESC - 1).ColumnName("Category Description");
            nwGridCon.nwobject(SPR_DTL_CONTRACTRATE - 1).ColumnName("Contract Rate");
            nwGridCon.nwobject(SPR_DTL_CONTRACTAMOUNT - 1).ColumnName("Contract Amount");
            nwGridCon.nwobject(SPR_DTL_DEPOSITMONTHS - 1).ColumnName("Deposits in Months");
            nwGridCon.nwobject(SPR_DTL_TERMCODE - 1).ColumnName("Term Code");
            nwGridCon.nwobject(SPR_DTL_TERMDESC - 1).ColumnName("Term Description");
            nwGridCon.nwobject(SPR_DTL_PERIOD - 1).ColumnName("Period");
            nwGridCon.nwobject(SPR_DTL_DPDISCOUNT- 1).ColumnName("DP Discount");
            nwGridCon.nwobject(SPR_DTL_DPDISCOUNTRATE - 1).ColumnName("DP Discount Rate");
            nwGridCon.nwobject(SPR_DTL_OTHERCHARGESALLOC - 1).ColumnName("Other Charges Allocation");

            nwGridCon.nwobject(SPR_DTL_CODE - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_DTL_CATEGORYCODE - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_DTL_TERMCODE - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_DTL_CONTRACTRATE - 1).HeaderFieldOptional(true);
            nwGridCon.nwobject(SPR_DTL_CONTRACTAMOUNT - 1).HeaderFieldOptional(true);
            nwGridCon.nwobject(SPR_DTL_DEPOSITMONTHS - 1).HeaderFieldOptional(true);
            nwGridCon.nwobject(SPR_DTL_DPDISCOUNTRATE - 1).HeaderFieldOptional(true);
            #endregion

            #region Column Width
            nwGridCon.nwobject(SPR_DTL_CODE - 1).Width(150);

            #endregion

            #region Column Color
            nwGridCon.nwobject(SPR_DTL_CODE - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_DTL_CATEGORYCODE - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_DTL_CATEGORYDESC - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_DTL_TERMCODE - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_DTL_TERMDESC - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_DTL_PERIOD - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Templates  
            //nwGridCon.nwobject(SPR_DTL_CONTRACTRATE - 1).Template("<input class='isNumber'    value='{" + (SPR_DTL_CONTRACTRATE - 1) + "}'  />");
            //nwGridCon.nwobject(SPR_DTL_CONTRACTAMOUNT - 1).Template("<input class='isNumber' value='{" + (SPR_DTL_CONTRACTAMOUNT- 1) + "}'   />");
            //nwGridCon.nwobject(SPR_DTL_DEPOSITMONTHS - 1).Template("<input class='isNumber' value='{" + (SPR_DTL_DPDISCOUNT - 1) + "}'  />");
            //nwGridCon.nwobject(SPR_DTL_DPDISCOUNTRATE - 1).Template("<input class='isNumber'  value='{" + (SPR_DTL_DPDISCOUNTRATE - 1) + "}'  />");
            nwGridCon.nwobject(SPR_DTL_CONTRACTRATE - 1).Input("isNumber");
            nwGridCon.nwobject(SPR_DTL_CONTRACTAMOUNT - 1).Input("isNumber");
            nwGridCon.nwobject(SPR_DTL_DEPOSITMONTHS - 1).Input("isNumber");
            nwGridCon.nwobject(SPR_DTL_DPDISCOUNT - 1).CheckBox(true);
            nwGridCon.nwobject(SPR_DTL_DPDISCOUNTRATE - 1).Input("isNumber");
            nwGridCon.nwobject(SPR_DTL_OTHERCHARGESALLOC - 1).CheckBox(true);
            #endregion

            #region Column Button

            #endregion

            //## THEME FORMAT
            //nwGridCon.HeaderBorderColor("#DEDEDE");
            //nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            //nwGridCon.TableBorderColor("#BBB");
            //nwGridCon.BodyBorderColor("#BBB");
            //nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            //nwGridCon.HeaderTextColor("#131313");
            //nwGridCon.HoverColor("#DEDEDE", "inherit");
            //nwGridCon.SelectedRowHover("#DEDEDE");
            //nwGridCon.SelectedRowHoverColor("inherit");
            //js.makeHTML("#nwGrid1Con", nwGridCon.createTable());
            //js.makeHTML("#nwGridCon", nwGridCon.createTable());
            //js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            //js.ADD("nwGrid_TableFreeze(\"" + gridID + "\", 0, 0)");
            //js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            nwGridCon.varSpreadBook = "nwGrid1_Book";
            nwGridCon.varSpreadSheet = "nwGrid1_Sheet";
            js.ADD(nwGridCon.createTable());
            js.ADD("addDTLRow()");
        }

        private DataTable LoadDisplaySellerRole(DataTable dt)
        {
            #region don't change
            DataTable dtCD = new DataTable();
            dtCD.Columns.Add("payment_DTL_Code", typeof(string));
            dtCD.Columns.Add("payment_DTL_categoryCode", typeof(string));
            dtCD.Columns.Add("payment_DTL_categoryDesc", typeof(string));
            dtCD.Columns.Add("payment_DTL_contractRate", typeof(string));
            dtCD.Columns.Add("payment_DTL_contractAmount", typeof(string));
            dtCD.Columns.Add("payment_DTL_depositsMonth", typeof(string));
            dtCD.Columns.Add("payment_DTL_termCode", typeof(string));
            dtCD.Columns.Add("payment_DTL_termDesc", typeof(string));
            dtCD.Columns.Add("payment_DTL_termPeriod", typeof(string));
            dtCD.Columns.Add("payment_DTL_dpDiscount", typeof(string));
            dtCD.Columns.Add("payment_DTL_dpDiscountRate", typeof(string));
            dtCD.Columns.Add("payment_DTL_otherAlloc", typeof(string));
            #endregion

            foreach (DataRow dRow in dt.Rows)
            {
              
                DataRow dr = dtCD.NewRow();
                dr["payment_DTL_Code"] = dRow["payment_DTL_Code"].ToString();
                dr["payment_DTL_categoryCode"] = dRow["payment_DTL_categoryCode"].ToString();
                dr["payment_DTL_categoryDesc"] = dRow["payment_DTL_categoryDesc"].ToString();
                dr["payment_DTL_contractRate"] = dRow["payment_DTL_contractRate"].ToString();
                dr["payment_DTL_contractAmount"] = dRow["payment_DTL_contractAmount"].ToString();
                dr["payment_DTL_depositsMonth"] = dRow["payment_DTL_depositsMonth"].ToString();
                dr["payment_DTL_termCode"] = dRow["payment_DTL_termCode"].ToString();
                dr["payment_DTL_termDesc"] = dRow["payment_DTL_termDesc"].ToString();
                dr["payment_DTL_termPeriod"] = dRow["payment_DTL_termPeriod"].ToString();
                dr["payment_DTL_dpDiscount"] = dRow["payment_DTL_dpDiscount"].ToString();
                dr["payment_DTL_dpDiscountRate"] = dRow["payment_DTL_dpDiscountRate"].ToString();
                dr["payment_DTL_otherAlloc"] = dRow["payment_DTL_otherAlloc"].ToString();
               
                dtCD.Rows.Add(dr);
                dtCD.AcceptChanges();
           
            }

            return dtCD;
        }

        private string DatatableToJson(DataTable dt)
        {
            return JsonConvert.SerializeObject(dt);
        }

        private DataTable JsonToDatatable(string json)
        {
            return JsonConvert.DeserializeObject<DataTable>(json);
        }

        private void setRqmtCompProp()
        {
            if (dal.hasSavedRqrdCompli(WebApp.nwobjectText("txtTransactionNo")) == "True")
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

        //public void Filter(bool Initialize)
        //{
        //    if (Initialize)
        //    {
        //        string strSQL = dal.getType();
        //        string strCom = nwObject.make_OptionLookup(strSQL, this.UserDefinedConnectionString, null);
        //        js.makeHTML("#cboType", strCom);
        //        js.makeCSS("#cboType", "background-color", "inherit");
        //    }
        //}


    }
}