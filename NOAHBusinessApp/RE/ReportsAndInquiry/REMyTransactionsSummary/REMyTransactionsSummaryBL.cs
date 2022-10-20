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
using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Threading;

namespace Noah_Web.forms_BusinessLayer
{
    public class REMyTransactionsSummaryBL : nwAction
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


        private const int
            SPR_RowNum = 1,
            SPR_TransactionType = 2,
            SPR_TransactionNo = 3,
            SPR_TransactionDate = 4,
            SPR_ExpirationDate = 5,
            SPR_HoldingExpirationDate = 6,
            SPR_CustomerName = 7,
            SPR_CustomerClassification = 8,
            SPR_Project = 9,
            SPR_UnitCode = 10,
            SPR_UnitDescription = 11,
            SPR_TotalContractPrice = 12,
            SPR_SourceofSale = 13,
            SPR_ApprovalDate = 14,
            SPR_ApprovedBy = 15,
            //SPR_ApprovalHist = 16,
            SPR_Status = 16,
            SPR_TranType = 17;


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
            dal = new REMyTransactionsSummaryDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
            if (_strmet == "get_Initialize") strFinal = get_Initialize();
            else if (_strmet == "func_Toolbox") strFinal = func_Toolbox(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "get_LookUp") strFinal = get_LookUp(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "getToolBoxDataRet") strFinal = getToolBoxDataRet(strtemp1, strtemp2, strtemp3, strtemp4, strtemp5);
            else if (_strmet == "getToolBoxDataCreate") strFinal = getToolBoxDataCreate(strtemp1, strtemp2, strtemp3, Convert.ToInt32(strtemp4), Convert.ToInt32(strtemp5));
            else if (_strmet == "getToolBoxData") strFinal = getToolBoxData(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "get_Method") strFinal = get_Method(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "act_Method") strFinal = act_Method(strtool_Met, strParameter, strValue);
            else strFinal = js.makeJSPostScript("alert('error:" + strmet + " not excute');");

            Result = strFinal;
        }

        public string strConn = "";
        string RecordOperationResult = String.Empty;
        REMyTransactionsSummaryDAL dal;
        int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public REMyTransactionsSummaryBL()
        {
            //dal = new DataAccessLayer(this.UserDefinedConnectionString,""); 
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

            string strOrder = " isnull(Moddate,Recdate) DESC,Recdate DESC";
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
            string filter = WebApp.nwobjectText("luglocacc");
            strConn = this.UserDefinedConnectionString;
            var lookupFilter = WebApp.nwobjectText("lookupFilter");


            DateTime dateFilterFrom = WebApp.nwobjectDate("dateFilterFrom");
            DateTime dateFilterTo = WebApp.nwobjectDate("dateFilterTo");

            string trantype = WebApp.nwobjectText("lugTrantype");
            string project = WebApp.nwobjectText("lugProject");
            string unitCode = WebApp.nwobjectText("lugUnitCode");
            string customerCode = WebApp.nwobjectText("lugCustomerCode");
            string customerClass = WebApp.nwobjectText("lugCustomerClass");
            string sourceOfSale = WebApp.nwobjectText("lugSourceofSale");


            //dt = dal.getDataLin(dateFilterFrom, dateFilterTo, trantype, project, unitCode,
            //       customerCode, customerClass, sourceOfSale, based.SecurityAccess.RecUser, "Grid");
            // bool isSingle = true;
            switch (strMethod)
            {

    
                case "getTransactionType":
                case "getProject":
                case "getUnit":
                case "getCustomer":
                case "getCustomerClassification":
                case "getSourceofSale":
                    strSQL = dal.getLookup(trantype, project, unitCode,
                         customerCode, customerClass, sourceOfSale, based.SecurityAccess.RecUser, strMethod.Substring(3));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

            }

            return strFinal;
        }

        ///// Standard RecordOperation 

        private void InitializeValues()
        {
            js.ADD("$(\"#txtCode\").focus();");
            CreateGrid(true, InitializeGrid());

        }




        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";

            RecordOperationResult = String.Empty;

            switch (i)
            {
                case eRecordOperation.AddNew:
                    js.ADD("$('#cmbluglocacc').find('option').remove();");
                    js.ADD("$('.spantext').remove()");

                    LoadComboBox();
                    js.ADD($"$('#cboAnnual').val('{SFObject.GetServerDateTime(UserDefinedConnectionString).Year}');");

                    js.ADD("DisableFieldscustom(); $('#cboAnnual').val(currentYear); ReloadQuarter(); ReloadMonth();  EnableFields(); ClearFields();$('#cmbMonth').enable(true);$('#radioMonthly').prop('checked',true);");
                    break;

                case eRecordOperation.Save:
                    RecordOperationResult = ValidateData();

                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dt2 = LoadSchema();
                        // RecordOperationResult = dal.SaveData(dt2, isNewRow);
                    }
                    else
                        RecordOperationResult = RecordOperationResult.Insert(0, "Error(s) Found:\n");

                    break;
                    js.ADD("$('#nwGridMainCon').enable(false);");

                case eRecordOperation.Delete:

                    //RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("txtCode"));

                    break;

                case eRecordOperation.Process:
                    tempstr = "Process";
                    Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Refresh:
                    RefreshData();
                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    Inquire();
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
                    dal.focusRecordPK = WebApp.nwobjectText("txtCode");
                    js.ADD(" loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtCode") + "') ");
                    RefreshData();
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    Prompt.Information(RecordOperationResult, based.Title);
                }
                else
                {
                    Prompt.Error(RecordOperationResult, based.Title);
                }
            }
        }


        public string act_Method(string strMethod, string strParameter, string strValue)
        {
            string strFinal = "", strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actBindCollection":
                    //Data_Enable();
                    BindCollection();

                    break;
                case "actBindCollectionEmpty":

                    js.ADD("nwLoading_End('xSample')");
                    break;
                case "actCleargrid":
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
                    strFinal = getToolBoxDataRet(tableName, dal.GetData(), this.UserDefinedConnectionString, "1", "50");
                    break;
            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {

        }

        private void Inquire()
        {
            nwToolBox.bindingNavigatorInquireItem.PrimaryKey = dal.primaryKey;
        }



        private void BindCollection()
        {
            js.ADD("nwLoading_End('xSample');");
        }

        private string ValidateData()
        {
            string errorResult = String.Empty;

            return errorResult;
        }

        //create grid
        public void CreateGrid(bool isInitialize, DataTable dtGridLin)
        {
            string gridID = "nwGridMainCon";
            nwGrid grid = new nwGrid(gridID);
            DataTable dt = new DataTable();

            grid.Type = nwGridType.SpreadCanvas;

            dt = dtGridLin;
            string LISTINGFILENAME = "";
            if (dal.LISTINGFILENAME + " Listing" == "") LISTINGFILENAME = "Sheet 1";
            else LISTINGFILENAME = dal.LISTINGFILENAME + " Listing";

            ListingAndPrint frmlist = new ListingAndPrint
                                                   (ListingAndPrint.FormType.NOAH_Standard1, dal.LISTINGSTARTROW, dtGridLin,
                                                   LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName
                                                   , LISTINGFILENAME);
            frmlist.SetSpreadType(nwGridType.SpreadCanvas);

            frmlist.m_Spread.ExportFileName = LISTINGFILENAME;
            frmlist.MenuItemName = based.Title;

           

            frmlist.m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);
            frmlist.m_Spread.buttonResetColumn = true;
            frmlist.m_Spread.buttonSaveColumn = true;


            js.ADD(frmlist.CreateScript("nwGridMainCon", "nwGridMainCon"));
           

        }

        private DataTable LoadSchema()
        {
            DataTable dtHDR = new DataTable();
            return dtHDR;
        }

        public void Data_Enable()
        {
            nwToolBox.bindingNavigatorAddNewItem.Enable =
            nwToolBox.bindingNavigatorSaveItem.Enable =
            nwToolBox.bindingNavigatorPrintItem.Enable =
            nwToolBox.bindingNavigatorInquireItem.Enable =
            nwToolBox.bindingNavigatorDeleteItem.Enable =
            nwToolBox.bindingNavigatorExportItem.Enable = true;

            nwToolBox.bindingNavigatorExportItem.Visible = true;
            nwToolBox.bindingNavigatorImportItem.Visible =

            nwToolBox.bindingNavigatorProcessItem.Visible = false;
        }

        private void Main_Load()
        {

            if (based.isInterface == true) dal.UpdateVersion();
            // js.ADD(" $('#noah-webui-default-Refresh').click();");
            DateTime currentDate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
            js.ADD(string.Format(@"currentYear = '{0}'"
                        , currentDate.ToString("yyyy")));

            js.ADD(string.Format(@"currentDate = '{0}'"
                        , currentDate.ToString("MM/dd/yyyy")));
            js.ADD(string.Format(@"BasedTitle = '{0}'", based.Title));
            LoadComboBox();
            js.ADD($"$('#cboAnnual').val('{SFObject.GetServerDateTime(UserDefinedConnectionString).Year}');");
            js.ADD("DisableFieldscustom(); $('#cboAnnual').val(currentYear); ReloadQuarter(); ReloadMonth();  EnableFields(); ClearFields();$('#cboAnnual').enable(true);$('#radioAnnual').prop('checked',true);");
            js.ADD("cust_GetPara();");


            CreateGrid(true, InitializeGrid());

        }

        private void RefreshData()
        {
            DataTable dt = dtGridLin("Grid");
            CreateGrid(false, dt);

            if (dt.Rows.Count > 0)
            {
                js.ADD("EnableFieldsDone();");
            }
            else
            {
                js.ADD("DisableFieldsEmpty();");
            }
        }


        public DataTable dtGridLin(string filter)
        {
            DataTable dt = new DataTable();
            DateTime dateFilterFrom = WebApp.nwobjectDate("dateFilterFrom");
            DateTime dateFilterTo = WebApp.nwobjectDate("dateFilterTo");
            string trantype = WebApp.nwobjectText("lugTrantype");
            string project = WebApp.nwobjectText("lugProject");
            string unitCode = WebApp.nwobjectText("lugUnitCode");
            string customerCode = WebApp.nwobjectText("lugCustomerCode");
            string customerClass = WebApp.nwobjectText("lugCustomerClass");
            string sourceOfSale = WebApp.nwobjectText("lugSourceofSale");

            dt = dal.getDataLin(dateFilterFrom, dateFilterTo, trantype, project, unitCode,
                               customerCode, customerClass, sourceOfSale, based.SecurityAccess.RecUser, filter);
            return dt;
        }

        public string DataTableToJSON(DataTable dt)
        {
            string json = JsonConvert.SerializeObject(dt);
            return json;
        }

        private void LoadComboBox()
        {
            js.makeComboBox("#cboAnnual", dal.GetYearList());

        }


        private DataTable InitializeGrid()
        {
            DataTable dt = new DataTable();


            dt.Columns.Add("Transaction Type"); //2
            dt.Columns.Add("Transaction No."); //3
            dt.Columns.Add("Transaction Date"); //4
            dt.Columns.Add("Transaction Expiration Date"); //5
            dt.Columns.Add("Customer"); //6
            dt.Columns.Add("Customer Classification"); //7
            dt.Columns.Add("Project"); //8
            dt.Columns.Add("Unit Code"); //9
            dt.Columns.Add("Unit Description"); //10
            dt.Columns.Add("Total Contract Price"); //11
            dt.Columns.Add("Source of Sale"); //12
            dt.Columns.Add("Transaction Approval Date"); //13
            dt.Columns.Add("Approved By"); //14
            dt.Columns.Add("Approval History"); //15
            dt.Columns.Add("Current Transaction Status"); //16
            dt.Columns.Add("TranType"); //18

            return dt;
        }

    }
}

