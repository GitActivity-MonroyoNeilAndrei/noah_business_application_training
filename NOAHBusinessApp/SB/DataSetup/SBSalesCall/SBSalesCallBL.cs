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
using System.Data.SqlClient;


namespace Noah_Web.forms_BusinessLayer
{
    public class SBSalesCallBL : nwAction
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
        string focusRecordPK = "";
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

        #region SPR
        //const int SPR_BIRCODE = 1,
        //SPR_BIRDESC = 2;
        //SPR_ITEMGROUPTYPECODE = 3,
        //SPR_ITEMGROUPTYPEDESC = 4,
        //SPR_BASEUOM = 5,
        //SPR_VATTAXDESC = 6,
        //SPR_EWTDESC = 7,
        //SPR_REMARKS = 8,
        //SPR_TAGREMARKS = 9,
        //SPR_VATTAXCODE = 10,
        //SPR_EWTCODE = 11,
        //SPR_BASEUOMCODE = 12;



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
            dal = new SBSalesCallDAL(this.UserDefinedConnectionString, this.based.SecurityAccess.ConnectionString, "");
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
        public string TranNo = string.Empty;
        public string Trantype = "VENIPE";
        public string Stat = string.Empty;
        string RecordOperationResult = String.Empty;
        SBSalesCallDAL dal;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public SBSalesCallBL()
        {

        }

        public string get_Initialize()
        {
            string strFinal = "";
            SetBindings();
            Main_Load();
            execute(ref strFinal);
            return js.makeJSPostScript(strFinal);
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
                        if (string.IsNullOrEmpty(RecordOperationResult) == true) strF = "isNewRow=false;" + strF;
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
            strConn = this.UserDefinedConnectionString;

            string strFinal = "";
            string strSQL = "";
            string mouseDownFunc = "";
            string mouseOverFunc = "";

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.inquireQuery(based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    //nwObject.ColumnHide(1);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    //.dataGridView1.Columns["CustomerID"].Visible = false;
                    break;

                case "getlugProspectCust":
                    string filt = WebApp.nwobjectText("idvallugProspectCust");
                    strSQL = dal.lugProspectCust(filt);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnSort("Code", "ASC");
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugSalesForceAct":
                    string filt2 = WebApp.nwobjectText("idvallugSalesForceAct");
                    strSQL = dal.lugSalesForceAct(filt2);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnSort("Code", "ASC");
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugLoc":
                    string filt3 = WebApp.nwobjectText("idvallugLoc");
                    strSQL = dal.lugLoc(filt3);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnSort("Code", "ASC");
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugProj":
                    string filt4 = WebApp.nwobjectText("idvallugProj");
                    string loc1 = WebApp.nwobjectText("idvallugLoc");
                    strSQL = dal.lugProj(filt4, loc1);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnSort("Code", "ASC");
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugTowerPhase":
                    string filt5 = WebApp.nwobjectText("idvallugTowerPhase");
                    string proj1 = WebApp.nwobjectText("idvallugProj");
                    strSQL = dal.lugTowerPhase(filt5, proj1);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnSort("Code", "ASC");
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

            }

            return strFinal;
        }

        private void InitializeValues()
        {
            nwToolBox.bindingNavigatorSaveItem.Enable = true;
            nwToolBox.bindingNavigatorAddNewItem.Enable = false;
            nwToolBox.bindingNavigatorInquireItem.Enable = true;
            nwToolBox.bindingNavigatorDeleteItem.Visible =
            nwToolBox.bindingNavigatorDeleteItem.Enable = false;
            nwToolBox.bindingNavigatorProcessItem.Enable = false;
            nwToolBox.bindingNavigatorExportItem.Visible = false;
            var serverdate = Parser.ParseDateTime(dal.getNoahDate(), Parser.DateTimeType.Min);
            //js.makeValueText("#txtTranDate", serverdate.ToString("MM/dd/yyyy"));
            js.ADD("$(\"#idvallugProspectCust\").focus();");
        }

        ///// Standard RecordOperation 
        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";

            RecordOperationResult = String.Empty;

            switch (i)
            {
                case eRecordOperation.AddNew:
                    InitializeValues();
                    var serverdate = Parser.ParseDateTime(dal.getNoahDate(), Parser.DateTimeType.Min);
                    js.makeValueText("#txtServerDate", serverdate.ToString("MM/dd/yyyy HH:mm:ss"));
                    js.makeValueText("#txtStartDate", serverdate.ToString("MM/dd/yyyy HH:mm:ss"));
                    js.makeValueText("#txtEndDate", serverdate.ToString("MM/dd/yyyy HH:mm:ss"));
                    string curuser = based.SecurityAccess.RecUser;
                    js.makeValueText("#idvallugSeller", curuser);
                    DataTable dr2 = dal.GetUserName(curuser);
                    js.makeValueText("#descvallugSeller", dr2.Rows[0]["SellerName"] + "");
                    js.makeValueText("#radiolists", "Inactive");
                    break;
                case eRecordOperation.Save:
                    nwToolBox.bindingNavigatorImportItem.Enable = false;
                    nwToolBox.bindingNavigatorImportItem.Visible = true;

                    RecordOperationResult = ValidateData();

                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dt = new DataTable();

                        dt = LoadSchema();
                        RecordOperationResult = dal.SaveData(dt, isNewRow, Trantype);
                    }

                    //RefreshData();


                    break;

                case eRecordOperation.Delete:
                    nwToolBox.bindingNavigatorImportItem.Visible = true;
                    nwToolBox.bindingNavigatorImportItem.Enable = false;
                    RecordOperationResult = ValidateData();
                    if (RecordOperationResult.Length <= 0)
                    {
                        string Vendor = string.Empty;
                        Vendor = WebApp.nwobjectText("txtTransactionNo");
                        RecordOperationResult = dal.DeleteData(Vendor, based.SecurityAccess.RecUser);
                    }

                    break;

                case eRecordOperation.Process:

                    nwToolBox.bindingNavigatorImportItem.Visible = true;
                    nwToolBox.bindingNavigatorImportItem.Enable = false;
                    RecordOperationResult = ValidateData();
                    if (RecordOperationResult.Length <= 0)
                    {
                        string curuserx = based.SecurityAccess.RecUser;
                        string ID = string.Empty;
                        string RecStats = string.Empty;
                        string StartDate = string.Empty;
                        string EndDate = string.Empty;
                        ID = WebApp.nwobjectText("txtTransactionNo");
                        DateTime datepickfrom = Parser.ParseDateTime(WebApp.nwobjectText("txtStartDate"), Parser.DateTimeType.Min);
                        DateTime datepickto = Parser.ParseDateTime(WebApp.nwobjectText("txtEndDate"), Parser.DateTimeType.Min);
                        RecStats = WebApp.nwobjectText("radiolists");
                        StartDate = datepickfrom.ToString("MM/dd/yyyy HH:mm:ss");
                        EndDate = datepickto.ToString("MM/dd/yyyy HH:mm:ss");
                        DataTable dt = new DataTable();

                        dt = LoadSchema();
                        RecordOperationResult = dal.ProcessTransaction(dt,curuserx, ID, RecStats, StartDate, EndDate);

                        //RecordOperationResult = dal.ProcessTransaction(curuserx, ID, RecStats);
                    }

                    break;

                case eRecordOperation.Refresh:
                    RefreshData();
                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    break;

                case eRecordOperation.Import:
                    tempstr = "import";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Export:
                    tempstr = "export";
                    break;
                case eRecordOperation.Print:
                    tempstr = "print";
                    break;
                case eRecordOperation.Closing:
                    tempstr = "closing";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Search:
                    tempstr = "search";
                    break;
            }

            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.IndexOf("Error") != 0 && RecordOperationResult.IndexOf("Cannot be saved") != 0)
                {
                    js.ADD("loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtCode") + "') ");
                    RefreshData();
                    if (WebApp.nwobjectText("radiolists") == "Cancel")
                    {
                        RecordOperationResult = Prompt.PromptToolBoxMessage("A sales call has been cancelled.", i);
                    }
                    else if (WebApp.nwobjectText("radiolists") == "Reschedule")
                    {
                        RecordOperationResult = Prompt.PromptToolBoxMessage("A sales call has been rescheduled.", i);
                    }
                    else if (WebApp.nwobjectText("radiolists") == "Attended")
                    {
                        RecordOperationResult = Prompt.PromptToolBoxMessage("A sales call has been attended.", i);
                    }
                    else
                    {
                        RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    }


                    Prompt.Information(RecordOperationResult, based.Title);
                }
                else
                {
                    if (RecordOperationResult.IndexOf("Error") != 0 && RecordOperationResult.IndexOf("Cannot be saved") != 0)
                    {
                        if (WebApp.nwobjectText("radiolists") == "Cancel")
                        {
                            RecordOperationResult = Prompt.PromptToolBoxMessage("A sales call has been cancelled.", i);
                        }
                        else if (WebApp.nwobjectText("radiolists") == "Reschedule")
                        {
                            RecordOperationResult = Prompt.PromptToolBoxMessage("A sales call has been rescheduled.", i);
                        }
                        else if (WebApp.nwobjectText("radiolists") == "Attended")
                        {
                            RecordOperationResult = Prompt.PromptToolBoxMessage("A sales call has been attended.", i);
                        }
                        else
                        {
                            RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                        }


                        Prompt.Information(RecordOperationResult, based.Title);
                    }
                    else
                    {
                        Prompt.Error(RecordOperationResult, based.Title);
                    }
                }
            }
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
                    js.ADD("nwLoading_End('actBindCollectionEmpty')");
                    break;

                case "actValidateEffectiveDate":
                    if (ValidateEffectiveDate().Length > 0)
                        Prompt.Error(ValidateEffectiveDate(), based.Title);
                    break;

                case "actChangeServerDate":
                    var serverdate = Parser.ParseDateTime(dal.getNoahDate(), Parser.DateTimeType.Min);
                    //js.makeValueText("#txtServerDate", serverdate.ToString("MM/dd/yyyy HH:mm:ss").Replace(" ", "T"));
                    js.makeValueText("#txtServerDate", serverdate.ToString("MM/dd/yyyy HH:mm:ss"));

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

                    string curusers = based.SecurityAccess.RecUser;
                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "Transaction Number";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(curusers,codevalue), this.UserDefinedConnectionString);
                    break;
            }

            return strFinal;
        }

        //////////////////////// Common

        private void SetBindings()
        {
            //Header
            SFObject.SetControlBinding("#txtTransactionNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Transaction Number");
            SFObject.SetControlBinding("#idvallugSeller", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Seller Code");
            SFObject.SetControlBinding("#descvallugSeller", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Seller Name");
            SFObject.SetControlBinding("#idvallugProspectCust", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Prospect Customer Code");
            SFObject.SetControlBinding("#descvallugProspectCust", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Prospect Customer Name");
            SFObject.SetControlBinding("#idvallugSalesForceAct", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Sales Force Activty Code");
            SFObject.SetControlBinding("#descvallugSalesForceAct", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Sales Force Activty Description");
            SFObject.SetControlBinding("#idvallugLoc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Location Code");
            SFObject.SetControlBinding("#descvallugLoc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Location Description");
            SFObject.SetControlBinding("#idvallugProj", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Project Code");
            SFObject.SetControlBinding("#descvallugProj", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Project Description");
            SFObject.SetControlBinding("#idvallugTowerPhase", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Tower/Phase Code");
            SFObject.SetControlBinding("#descvallugTowerPhase", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Phase/Tower Description");
            SFObject.SetControlBinding("#txtMobileNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Mobile Number");
            SFObject.SetControlBinding("#txtEmailAdd", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Email Address");



            SFObject.SetControlBinding("#txtOldStartDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Start Date");
            SFObject.SetControlBinding("#txtOldEndDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "End Date");



            SFObject.SetControlBinding("#txtStartDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Start Date");
            SFObject.SetControlBinding("#txtEndDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "End Date");
            SFObject.SetControlBinding("#txtNotifSched", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Notification Schedule");

            SFObject.SetControlBinding("#ComboBox1", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Notification Manner");

            SFObject.SetControlBinding("#ComboBox2", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Receiver");

            SFObject.SetControlBinding("#txtRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Remarks");

            SFObject.SetControlBinding("#txtRecordStat", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Record Status");
            SFObject.SetControlBinding("#radiolists", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Record Status");


            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");
        }

        //////////////// end of standard / standard custumize

        private void BindCollection()
        {
            js.ADD("nwLoading_End('actBindCollection');");
            DateTime serverdates = Parser.ParseDateTime(dal.getNoahDate(), Parser.DateTimeType.Min);
            //string serverdatex = serverdates.ToString("MM/dd/yyyy HH:mm:ss").Replace(" ", "T");
            string serverdatex = serverdates.ToString("MM/dd/yyyy HH:mm:ss");

            //new
            js.ADD($"$('#txtServerDate').val('{serverdatex}');");
        }

        public string ValidateEffectiveDate()
        {
            string errorResult = string.Empty;
            DateTime serverdate1 = Parser.ParseDateTime(dal.getNoahDate(), Parser.DateTimeType.Min);
            DateTime serverdate = Parser.ParseDateTime(serverdate1, Parser.DateTimeType.Min);
            DateTime datepickfrom = Parser.ParseDateTime(WebApp.nwobjectText("datepickfrom"), Parser.DateTimeType.Min);
            DateTime datepickto = Parser.ParseDateTime(WebApp.nwobjectText("datepickto"), Parser.DateTimeType.Min);
            //string serverdatea = serverdate.ToString("MM/dd/yyyy HH:mm:ss").Replace(" ", "T");
            //string datepickfroma = datepickfrom.ToString("MM/dd/yyyy HH:mm:ss").Replace(" ", "T");
            string serverdatea = serverdate.ToString("MM/dd/yyyy HH:mm:ss");
            string datepickfroma = datepickfrom.ToString("MM/dd/yyyy HH:mm:ss");
            if (WebApp.nwobjectText("datepickfrom").Length > 0)
            {
                if (datepickfrom < serverdate)
                {
                    js.ADD($"$('#txtServerDate').val('{serverdatea}');");
                    js.ADD($"$('#txtStartDate').val('{serverdatea}');");
                    js.ADD($"$('#txtEndDate').val('{serverdatea}');");
                    errorResult += "Start Date should not be earlier than the current server date. " + datepickfrom + "\n";
                }

                if (datepickto < datepickfrom)
                {
                    //js.ADD($"$('#txtStartDate').val('{datepickfrom.ToString("MM/dd/yyyy")}');");
                    js.ADD($"$('#txtEndDate').val('{datepickfroma}');");
                    errorResult = "End Date should not be earlier than the Start date. \n";
                }
            }

            return errorResult;
        }

        private string ValidateData()
        {
            string errorResult = String.Empty;

            if (WebApp.nwobjectText("idvallugProspectCust").Length <= 0)
            {
                errorResult += "Cannot be saved. Prospect Customer is required.\n";
            }

            if (WebApp.nwobjectText("idvallugSalesForceAct").Length <= 0)
            {
                errorResult += "Cannot be saved. Sales Force Activity is required.\n";
            }

            if (WebApp.nwobjectText("txtStartDate").Length <= 0)
            {
                errorResult += "Cannot be saved. Start Date is required.\n";
            }

            if (WebApp.nwobjectText("txtEndDate").Length <= 0)
            {
                errorResult += "Cannot be saved. End Date is required.\n";
            }

            if (WebApp.nwobjectText("txtStartDate").Length > 0 && WebApp.nwobjectText("txtEndDate").Length > 0)
            {
                errorResult += ValidateEffectiveDate();
            }

            if (WebApp.nwobjectText("txtEmailAdd").Length <= 0 && WebApp.nwobjectText("ComboBox1").IndexOf("Email") >= 0)
            {
                errorResult += "Cannot be saved. Email is required.\n";
            }

            if (WebApp.nwobjectText("txtMobileNo").Length <= 0 && WebApp.nwobjectText("ComboBox1").IndexOf("SMS") >= 0)
            {
                errorResult += "Cannot be saved. Mobile No. is required.\n";
            }
            

            return errorResult;
        }

        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema();
            #endregion

            DateTime datepickfrom = Parser.ParseDateTime(WebApp.nwobjectText("txtStartDate"), Parser.DateTimeType.Min);
            DateTime datepickto = Parser.ParseDateTime(WebApp.nwobjectText("txtEndDate"), Parser.DateTimeType.Min);

            string realdtfrom = datepickfrom.ToString("MM/dd/yyyy HH:mm:ss");
            string realdtto = datepickto.ToString("MM/dd/yyyy HH:mm:ss");

            DataRow dr = dtHDR.NewRow();
            dr["TransactionNo"] = WebApp.nwobjectText("idvallugSeller") + WebApp.nwobjectText("idvallugProspectCust") + realdtfrom;
            dr["Seller"] = WebApp.nwobjectText("idvallugSeller");
            dr["ProspectCust"] = WebApp.nwobjectText("idvallugProspectCust");
            dr["SalesForceAct"] = WebApp.nwobjectText("idvallugSalesForceAct");
            dr["Location"] = WebApp.nwobjectText("idvallugLoc");
            dr["Project"] = WebApp.nwobjectText("idvallugProj");
            dr["Tower"] = WebApp.nwobjectText("idvallugTowerPhase");
            dr["MobileNo"] = WebApp.nwobjectText("txtMobileNo");
            dr["EmailAdd"] = WebApp.nwobjectText("txtEmailAdd");
            dr["DateTimeFrom"] = realdtfrom;
            dr["DateTimeTo"] = realdtto;
            dr["NotifSchedule"] = WebApp.nwobjectText("txtNotifSched");
            dr["NotifManner"] = WebApp.nwobjectText("ComboBox1");
            dr["Receiver"] = WebApp.nwobjectText("ComboBox2");
            dr["Remarks"] = WebApp.nwobjectText("txtRemarks");
            dr["RecordStats"] = WebApp.nwobjectText("radiolists");
            dr["Recuser"] = based.SecurityAccess.RecUser;
            dr["Moduser"] = based.SecurityAccess.RecUser;
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion
            return dtHDR;
        }

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
            RefreshData();
        }

        private void RefreshData()
        {
            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
            js.ADD("RefreshData();");
        }

    }
}