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

namespace Noah_Web.forms_BusinessLayer
{
    public class SBRequestBulkHoldingBL : nwAction
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
            //Addchars();
            dal = new SBRequestBulkHoldingDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
            if (_strmet == "get_Initialize")
            {
                WebApp = new WebApplib(strParameter, strValue);
                strFinal = get_Initialize();
            }
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
        SBRequestBulkHoldingDAL dal;
        int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        private static int StartIndex = 0,

            SPR_PROJECT = StartIndex,
            SPR_PHASE_TOWER = ++StartIndex,
            SPR_BLOCK_FLOOR = ++StartIndex,
            SPR_LOT = ++StartIndex,
            SPR_SELLING_PRICE = ++StartIndex,
            SPR_QUEUE_NUM = ++StartIndex;

        

        public const int
                        SPR_ITEMCODE = 1,
                        SPR_ITEMDESC = 2,
                        SPR_DEBITMAIN = 3,
                        SPR_DEBITMAINDESC = 4,
                        SPR_CREDITMAIN = 5,
                        SPR_CREDITMAINDESC = 6;

        public SBRequestBulkHoldingBL()
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
            string strName = "";
            strConn = this.UserDefinedConnectionString;

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.inquireQuery();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugLocAcctForms":
                    strSQL = dal.getlugLocAcctForms();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugReasonBulkHold":
                    strSQL = dal.getlugReasonBulkHold();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugCustomer":
                    strSQL = dal.getlugCustomer();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugProject":
                    strSQL = dal.getlugProject();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugDirectSeller": 
                    strSQL = dal.getlugDirectSeller();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getUnit":
                    strSQL = dal.getUnit(WebApp.nwobjectText("idvallugProject"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
            }

            return strFinal;
        }

        /*Standard RecordOperation*/

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string result = "", tempstr = "";

            switch (i)
            {
                case eRecordOperation.AddNew:
                    InitializeValues();
                    break;

                case eRecordOperation.Save:
                    RecordOperationResult = AreValidEntries();

                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dt = LoadSchema();
                        RecordOperationResult = dal.SaveData(dt, isNewRow);
                    }
                    else
                        RecordOperationResult = RecordOperationResult.Insert(0, "");
                    break;

                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("Docno"), based.SecurityAccess.RecUser);
                    break;

                case eRecordOperation.Process:
                    string Docno = WebApp.nwobjectText("txtDocNo");
                    string locform = WebApp.nwobjectText("idvallugLocAcctForms");
                    DateTime currentDate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
                    string date = currentDate.ToString();
                    if (RecordOperationResult == string.Empty)
                    {
                        RecordOperationResult = dal.Process(Docno, date, locform);
                    }
                    break;

                case eRecordOperation.Refresh:
                    RefreshData();
                    js.ADD("loc_LookupInquireWithValue('" + string.Empty + "') ");
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
                    js.Hide("#btnnwExportCSV", 0);
                    js.ADD(frmlist.CreateScript());
                    js.ADD("nwLoading_End('xSample')");
                  

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
                if (RecordOperationResult.IndexOf("Error") == 0 || RecordOperationResult.Contains("Cannot"))
                {
                    RecordOperationResult = RecordOperationResult.Replace("Error [50000]:", "");
                    Prompt.Error(RecordOperationResult, based.Title);
                }
                else
                {
                    RefreshData();
                    js.ADD("loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtCode") + "') ");
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    Prompt.Information(RecordOperationResult, based.Title);
                }
            }


            //return result;
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
            string strFinal = "", strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();
                    break;

                case "actBindCollectionEmpty":
                    js.ADD("nwLoading_End('xSample')");
                    break;

                case "actHasRqrdCompli":
                    setRqmtCompProp();
                    js.ADD("nwLoading_End('actHasRqrdCompli')");
                    break;

                case "actCallSeller":
                    DataTable dt2 = dtGridLin2();

                    CreateGrid2(false, dt2);

                    break;
                case "actSelectProject":
                    //DataTable dt1 = dtGridLin();
                    DataTable dt1 = InitializeGrid();
                    CreateGrid(false, dt1);
                    break;

                default:
                    Prompt.Information("act_Method not found: " + strMethod, "Error");
                    break;
            }
            return js.makeJSPostScript(execute());
        }

        public string getToolBoxData(string tableName, string getMethod, string strParameter, string strValue)
        {
            //string codevalue = WebApp.nwobjectText("codevalue");

            string strFinal = ""; string sql = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (getMethod)
            {
                case "toolbox":
                    string codevalue = WebApp.nwobjectText("codevalue"); // codevalue will be filter of primary key add these filter

                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "Docno";
                 
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(codevalue), this.UserDefinedConnectionString);
                    break;
            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#idvallugLocAcctForms", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LocForm");
            SFObject.SetControlBinding("#descvallugLocAcctForms", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LocFormDesc");
            SFObject.SetControlBinding("#idvallugReasonBulkHold", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ReasonBulkHold");
            SFObject.SetControlBinding("#descvallugReasonBulkHold", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ReasonBulkHoldDesc");
            SFObject.SetControlBinding("#idvallugCustomer", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Customer");
            SFObject.SetControlBinding("#descvallugCustomer", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CustomerDesc");
            SFObject.SetControlBinding("#idvallugProject", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Project");
            SFObject.SetControlBinding("#descvallugProject", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ProjectDesc");
            SFObject.SetControlBinding("#idvallugDirectSeller", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "sellerCode");
            SFObject.SetControlBinding("#descvallugDirectSeller", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "sellerName");

            SFObject.SetControlBinding("#txtnoUnitHeld", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "noUnitHeld");
            SFObject.SetControlBinding("#txtRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Remarks");
            SFObject.SetControlBinding("#txtDocNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Docno");
            SFObject.SetControlBinding("#txtDocDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "DocDate");
            SFObject.SetControlBinding("#txtDocStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "DocStatusDesc");
            SFObject.SetControlBinding("#txtStatusCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "DocStatus");
            SFObject.SetControlBinding("#txtRsnDisapprove", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RsnDisapprove");
            SFObject.SetControlBinding("#txtRemarksDisapprove", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RemarksDisapprove");

            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "moddate");
        }

        //////////////// end of standard / standard custumize

        private void InitializeValues()
        {
            nwToolBox.bindingNavigatorSaveItem.Enable = true;
            nwToolBox.bindingNavigatorAddNewItem.Enable = false;
            nwToolBox.bindingNavigatorInquireItem.Enable = true;
            nwToolBox.bindingNavigatorDeleteItem.Visible =
            nwToolBox.bindingNavigatorDeleteItem.Enable = false;
            nwToolBox.bindingNavigatorProcessItem.Enable = false;
            nwToolBox.bindingNavigatorExportItem.Visible = false;

            DefaultLocAcctForms();
        }


        private void BindCollection()
        {
            js.ADD("RefreshData();");

            //if (WebApp.nwobjectText("txtCode").Length > 0)
            //    js.ADD("isExists(" + dal.isExisted(WebApp.nwobjectText("txtCode")) + ")");
            js.ADD("nwLoading_End('actBindCollection');");
            js.ADD("nwLoading_End('xSample');");
        }

        private string AreValidEntries()
        {
            string errorResult = String.Empty;

            if (WebApp.nwobjectText("LocForm").Length <= 0)
            {
                errorResult += "Cannot be saved. Location with Accountable Forms is required.\n";
            }
            if (WebApp.nwobjectText("ReasonBulkHold").Length <= 0)
            {
                errorResult += "Cannot be saved. Reason for Bulk Holding is required.\n";
            }
            if (WebApp.nwobjectText("Customer").Length <= 0)
            {
                errorResult += "Cannot be saved. Customer is required.\n";
            }
            if (WebApp.nwobjectText("noUnitHeld").Length <= 0)
            {
                errorResult += "Cannot be saved. Number of unit to be held is required.\n";
            }


            //if (dal.hasData(WebApp.nwobjectText("txtCode")) == 1 && isNewRow)
            //{
            //    errorResult += "Cannot be saved. Duplicate records are not allowed.\n";
            //}

            return errorResult;
        }
        
        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema();
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["Docno"] = WebApp.nwobjectText("Docno");
            dr["LocForm"] = WebApp.nwobjectText("LocForm");
            dr["ReasonBulkHold"] = WebApp.nwobjectText("ReasonBulkHold");
            dr["Customer"] = WebApp.nwobjectText("Customer");
            dr["Project"] = WebApp.nwobjectText("Project");
            dr["sellerCode"] = WebApp.nwobjectText("sellerCode");
            dr["noUnitHeld"] = WebApp.nwobjectText("noUnitHeld");
            dr["Remarks"] = WebApp.nwobjectText("Remarks");
            dr["DocDate"] = WebApp.nwobjectDate("DocDate").Equals("") ? (object)DBNull.Value : WebApp.nwobjectDate("DocDate");
            
            dr["recuser"] = based.SecurityAccess.RecUser;
            dr["moduser"] = based.SecurityAccess.RecUser;
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion

            return dtHDR;
        }

        public void Data_Enable()
        {
            nwToolBox.bindingNavigatorAddNewItem.Enable =
            nwToolBox.bindingNavigatorSaveItem.Enable =
            nwToolBox.bindingNavigatorPrintItem.Enable =
            nwToolBox.bindingNavigatorInquireItem.Enable =
            nwToolBox.bindingNavigatorDeleteItem.Enable = true;
            nwToolBox.bindingNavigatorExportItem.Visible =
            nwToolBox.bindingNavigatorImportItem.Visible =
            nwToolBox.bindingNavigatorProcessItem.Visible = false;
        }

        private void Main_Load()
        {

            DataTable dt1 = InitializeGrid();
            DataTable dt2 = dtGridLin2();

            CreateGrid(false, dt1);
            js.ADD("nwGridMainCon_Book.ActiveSheet.Refresh;");

            CreateGrid2(false, dt2);

            js.ADD("nwGridMainCon_Book2.ActiveSheet.Refresh;");

            if (based.isInterface == true) dal.UpdateVersion();
  
            based.SecurityAccess.RecUser = WebApp.nwobjectText("txtRecuser");
        }

        private void RefreshData()
        {

            js.ADD("nwGridMainCon_Book2.ActiveSheet.Refresh;");
            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\");"); // goto: getToolBoxData
                                                                                
            //js.ADD("$('#noah-webui-default-Delete').enable(false)");
         
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



        //create grid
        public void CreateGrid(bool isInitialize, DataTable dtGridLin)
        {
            string gridID = "nwGridCon1";

            nwGrid grid = new nwGrid(gridID);

            DataTable dt1 = new DataTable();

            grid.Type = nwGridType.SpreadCanvas;
            grid.varSpreadBook = "nwGridMainCon_Book";
            grid.varSpreadSheet = "nwGridMainCon_Sheet";
            dt1 = dtGridLin;

            if (!isInitialize) //grid should load data, when the function is called the parameter for initialize is false
            {
                if (dt1.Rows.Count <= 0)
                {  //as per the old code there should be but if its not passing right then there will be no rows
                    Console.Write("no record to show"); // open console if this message appears
                }
                dt1.Rows.Add();      //add an empty row after the loaded rows
          
            }
            else //new grid load, no data. Parameter is true (ex CreateGrid (true,dt);)
            {

                while (dt1.Rows.Count < 5)
                {

                    dt1.Rows.Add();      //create 5 empty rows
                }

            }


            grid.dataSource(dt1);

            grid.RowHeight(5);

            grid.TableHeight(200);


            for (int i = 0; i < dtGridLin.Columns.Count; i++)
            {
                grid.nwobject(i).BackgroundColor("Gainsboro");
            }




            grid.nwobject(SPR_LOT).TextAlign("center");
            grid.nwobject(SPR_LOT).BackgroundColor("aqua");
            js.ADD(grid.createTable());


        }

        public void CreateGrid2(bool isInitialize, DataTable dtGridLin2)
        {
            string gridID2 = "nwGridCon2";

            nwGrid grid2 = new nwGrid(gridID2);

            DataTable dt2 = new DataTable();

            grid2.Type = nwGridType.SpreadCanvas;

            dt2 = dtGridLin2;

            if (!isInitialize) //grid should load data, when the function is called the parameter for initialize is false
            {
                if (dt2.Rows.Count <= 0)
                {  //as per the old code there should be but if its not passing right then there will be no rows
                    Console.Write("no record to show"); // open console if this message appears
                }
                dt2.Rows.Add();      //add an empty row after the loaded rows

            }
            else //new grid load, no data. Parameter is true (ex CreateGrid (true,dt);)
            {

    

                while (dt2.Rows.Count < 5)
                {

                    dt2.Rows.Add();      //create 5 empty rows
                }
            }



            grid2.dataSource(dt2);

            grid2.RowHeight(5);

            grid2.TableHeight(200);


            for (int i = 0; i < dtGridLin2.Columns.Count; i++)
            {
                grid2.nwobject(i).BackgroundColor("Gainsboro");
            }



            grid2.varSpreadBook = "nwGridMainCon_Book2";
            grid2.varSpreadSheet = "nwGridMainCon_Sheet2";
            js.ADD(grid2.createTable());


        }

        public DataTable dtGridLin()
        {
            DataTable dt1 = new DataTable();
            string project = WebApp.nwobjectText("idvallugProject");
            dt1 = dal.getUnitDetails(project);


            return dt1;
        }

        public DataTable dtGridLin2()
        {
            DataTable dt2 = new DataTable();
            string seller = WebApp.nwobjectText("idvallugDirectSeller");
            dt2 = dal.getSellerDetails(seller);

            return dt2;
        }

        private DataTable InitializeGrid()
        {
            DataTable dt = new DataTable();


            dt.Columns.Add("Project Code"); //1
            dt.Columns.Add("Phase/Tower"); //2
            dt.Columns.Add("Block/Floor"); //3
            dt.Columns.Add("Lot/Unit/Slot No."); //4
            dt.Columns.Add("Selling Price (VATEX)"); //5
            dt.Columns.Add("Queue No."); //6



            return dt;
        }
        private DataTable InitializeGrid2()
        {
            DataTable dt = new DataTable();


            dt.Columns.Add("SellerName"); //1
            dt.Columns.Add("SellerRole"); //2




            return dt;
        }

    }
}