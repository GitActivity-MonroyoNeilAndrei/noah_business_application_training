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
    public class SBPaymentTermOptionsBL : nwAction
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
            SPR_TransactionType = 1,
            SPR_TransactionNo = 2,
            SPR_TransactionDate = 3,
            SPR_ExpirationDate = 4,
            SPR_CustomerName = 5,
            SPR_CustomerClassification = 6,
            SPR_Project = 7,
            SPR_UnitCode = 8,
            SPR_UnitDescription = 9,
            SPR_TotalContractPrice = 10,
            SPR_SourceofSale = 11,
            SPR_ApprovalDate = 12,
            SPR_ApprovedBy = 13,
            SPR_ApprovalHist = 14,
            SPR_Status = 15,
            SPR_TranType = 16;


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
            dal = new SBPaymentTermOptionsDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        SBPaymentTermOptionsDAL dal;
        int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public SBPaymentTermOptionsBL()
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

            //string payterm = WebApp.nwobjectText("lugPayTerm");
            //string project = WebApp.nwobjectText("lugProject");
            //string phaseTower = WebApp.nwobjectText("lugPhaseTower");
            //string unit = WebApp.nwobjectText("lugUnit");
            //string inventoryType = WebApp.nwobjectText("lugInventoryType");
            //string inventoryClass = WebApp.nwobjectText("lugInventoryClass");
            //string itemstatus = WebApp.nwobjectText("lugItemStatus");

            string paymentterm = WebApp.nwobjectText("lugPaymentTerm");

            switch (strMethod)
            {
                //case "getlugPayTerm":
                //case "getlugProject":
                //case "getlugPhaseTower":
                //case "getlugUnit":
                //case "getlugInventoryType":
                //case "getlugInventoryClass":
                //case "getlugItemStatus":
                //    strSQL = dal.getLookup(payterm, project, phaseTower,
                //               unit, inventoryType, inventoryClass, itemstatus, strMethod.Substring(3));
                //    strMethod = strMethod.Substring(3);
                //    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                //    break;

                case "getPaymentTerm":
                    strSQL = dal.getLookup();
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(2);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    nwObject.ColumnHide(8);
                    nwObject.ColumnHide(9);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                    //case "gettxtStandardTerm":
                    //    strSQL = dal.StandardTerm();
                    //    strMethod = strMethod.Substring(3);
                    //    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    //    break;




            }

            return strFinal;
        }

        ///// Standard RecordOperation 

        private void InitializeValues()
        {
            //getStandardTerm();           
            DataTable dr2 = dal.getStandardTerm();
            js.makeValueText("#txtStandardTerm", dr2.Rows[0]["Description"] + "");
            //js.ADD("$(\"#txtCode\").focus();");
        }

        //private void getStandardTerm()
        //{

        //    DataTable tmpDT = dal.StandardTerm();
        //    //int rowNum = 1;
        //    if (tmpDT.Rows.Count > 0)
        //    {
        //        js.ADD("$(\"#txtStandardTerm\", tmpDT.Rows[0]["Description"]);
        //    }

        //    //return tmpDT;
        //}




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

                    DataTable dt = dtGridLin("Grid");

                    string LISTINGFILENAME = "";
                    if (dal.LISTINGFILENAME + " Listing" == "") LISTINGFILENAME = "Sheet 1";
                    else LISTINGFILENAME = dal.LISTINGFILENAME + " Listing";
                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Empty, dal.LISTINGSTARTROW, dt,
                                                           LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName
                                                           , LISTINGFILENAME);
                    frmlist.m_Spread.SetText(1, 1, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString));
                    frmlist.m_Spread.SetText(1, 2, "Location Name: " + WebApp.nwobjectText("LocationFilter"));
                    frmlist.m_Spread.SetText(1, 3, LISTINGFILENAME);
                    frmlist.m_Spread.SetText(1, 4, "System User: " + based.SecurityAccess.RecUserName);
                    frmlist.m_Spread.SetText(1, 5, "System Date: " + SFObject.GetServerDateTime(this.UserDefinedConnectionString));

                    frmlist.m_Spread.nwobject(SPR_TotalContractPrice - 1).TextAlign("right");
                    //frmlist.m_Spread.nwobject(SPR_ApprovalHist - 1).Width(0);
                    //frmlist.m_Spread.nwobject(SPR_TranType - 1).Width(0);

                    //## FOR EXPORTING ###
                    Random rnd = new Random();
                    string SessionID = DateTime.Now.ToString("yyyyddMMhhmmss") + rnd.Next(0, 9999).ToString().PadRight(4, '0');
                    HttpContext.Current.Session["Config_" + SessionID] = frmlist.m_Spread.ExportConfig();
                    HttpContext.Current.Session["Data_" + SessionID] = frmlist.m_Spread.GetDataSource();
                    HttpContext.Current.Session["Filename_" + SessionID] = dal.LISTINGFILENAME + " Listing";
                    HttpContext.Current.Session["Header_" + SessionID] = "0";
                    js.ADD("ExportSessionID='" + SessionID + "'");
                    //## END ##

                    js.Show("#nwExportContainerMain", 0);
                    js.ADD(frmlist.CreateScript());
                    break;
                case eRecordOperation.Print:
                    tempstr = "print";
                    ShowPrintPreview();
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
                    js.ADD("GenerateGrid(json, 'false')");
                    break;

                case "actGenerateHistory":
                    DataTable dt = dal.getHistory(WebApp.nwobjectText("trantype"), WebApp.nwobjectText("docno"));
                    if (dt.Rows.Count > 0)
                    { js.ADD($"jsonHist=JSON.parse('{DataTableToJSON(dt)}')"); }
                    else { js.ADD($"jsonHist=[]"); }

                    js.ADD("GenerateHistory(jsonHist)");
                    js.ADD("func_replaceRemarks()");
                    js.ADD("nwLoading_End('actGenerateHistory')");
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
            SFObject.SetControlBinding("#txtStandardTerm", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Description");
        }

        private void Inquire()
        {
            nwToolBox.bindingNavigatorInquireItem.PrimaryKey = dal.primaryKey;
        }

        //private void Export(ListingAndPrint.FormType type)
        //{
        //    string s = SFObjects.returnText("select UPPER(DivisionName) from SG.BIRCASConfig",this.UserDefinedConnectionString);
        //    new NoahUI.ListingAndPrint(type,
        //        dal.listingStartRow, dal.listingQry, dal.listingName, dal.ConnectionString,
        //        s, SFObjects.returnText(String.Format("select description from fpti.[user] where code = '{0}'", based.SecurityAccess.RecUser), this.UserDefinedConnectionString), dao.listingName).ShowDialog();
        //}

        //////////////// end of standard / standard custumize

        private void BindCollection()
        {
            js.ADD("nwLoading_End('xSample');");


        }

        private string ValidateData()
        {
            string errorResult = String.Empty;

            return errorResult;
        }


        private DataTable LoadSchema()
        {
            DataTable dtHDR = new DataTable();
            return dtHDR;
        }

        public void Data_Enable()
        {
            nwToolBox.bindingNavigatorAddNewItem.Visible = false;
            nwToolBox.bindingNavigatorAddNewItem.Enable = false;
            nwToolBox.bindingNavigatorExportItem.Visible = false;
            nwToolBox.bindingNavigatorExportItem.Enable = false;
            nwToolBox.bindingNavigatorRefreshItem.Visible = false;
            nwToolBox.bindingNavigatorRefreshItem.Enable = false;
            nwToolBox.bindingNavigatorPrintItem.Visible = true;
            nwToolBox.bindingNavigatorPrintItem.Enable = true;
        }

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
            InitializeValues();
            // js.ADD(" $('#noah-webui-default-Refresh').click();");
            //js.ADD("cust_GetPara();");
            //DataTable dt = dtGridLin("Init");
            //if (dt.Rows.Count > 0)
            //{ js.ADD($"json=JSON.parse('{DataTableToJSON(dt)}')"); }
            //else { js.ADD($"json=[]"); }
            //js.ADD("GenerateGrid(json, 'false')");


            nwToolBox.bindingNavigatorAddNewItem.Visible = false;
            nwToolBox.bindingNavigatorAddNewItem.Enable = false;
            nwToolBox.bindingNavigatorExportItem.Visible = false;
            nwToolBox.bindingNavigatorExportItem.Enable = false;
            nwToolBox.bindingNavigatorRefreshItem.Visible = false;
            nwToolBox.bindingNavigatorRefreshItem.Enable = false;
            nwToolBox.bindingNavigatorPrintItem.Visible = true;
            nwToolBox.bindingNavigatorPrintItem.Enable = true;
        }

        private void RefreshData()
        {
            //DataTable dt = dtGridLin("Grid");
            //if (dt.Rows.Count > 0)
            //{ js.ADD($"json=JSON.parse('{DataTableToJSON(dt)}')"); }
            //else { js.ADD($"json=[]"); }

            //js.ADD("GenerateGrid(json, 'true')");
            nwToolBox.bindingNavigatorAddNewItem.Visible = false;
            nwToolBox.bindingNavigatorAddNewItem.Enable = false;
            nwToolBox.bindingNavigatorExportItem.Visible = false;
            nwToolBox.bindingNavigatorExportItem.Enable = false;
            nwToolBox.bindingNavigatorPrintItem.Visible = true;
        }


        public DataTable dtGridLin(string filter)
        {
            DataTable dt = new DataTable();
            string project = WebApp.nwobjectText("lugProject");
            string phaseTower = WebApp.nwobjectText("lugPhaseTower");
            string unit = WebApp.nwobjectText("lugUnit");
            string inventoryType = WebApp.nwobjectText("lugInventoryType");
            string inventoryClass = WebApp.nwobjectText("lugInventoryClass");
            string itemstatus = WebApp.nwobjectText("lugItemStatus");

            string paymentterm = WebApp.nwobjectText("lugPaymentTerm");

            dt = dal.getDataLin(project, phaseTower,
                               unit, inventoryType, inventoryClass, itemstatus, filter);
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
            //js.makeComboBox("#sortBy", SetColumnFilter());

            //js.makeComboBox("#cboCivilStatus", dal.getCivilStatus());
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
            dt.Columns.Add("TranType"); //1

            return dt;
        }
        private void ShowPrintPreview()
        {
            string Docno = dal.getDocno();
            string url = dal.DWLink();
            string printid = "RD0000000304-BF73E";

            //devmode
            //if (based.isInterface == false)
            //{
            //    //js.ADD("nwTrustedLinks.push('209.146.24.62:676');");
            //url = @"http://localhost:50760/";
            //}

            DataTable dtPreview = new DataTable();
            dtPreview.Columns.Add("klin");
            //dtPreview.Columns.Add("RecUser");
            //dtPreview.Columns.Add("DocnoList");

            //dtPreview.Columns.Add("tagPrintStat");
            dtPreview.Columns.Add("Docno");
            dtPreview.Columns.Add("dcpagename");

            DataRow dr = dtPreview.NewRow();
            DataRow drPreview = dtPreview.NewRow();

            drPreview["klin"] = printid;
            //drPreview["RecUser"] = WebApp.nwobjectText("txtUser");
            //drPreview["DocnoList"] = WebApp.nwobjectText("txtDocno");           
            //drPreview["tagPrintStat"] = 0;
            drPreview["Docno"] = Docno;
            drPreview["dcpagename"] = Docno;
            dtPreview.Rows.Add(drPreview);

            string dtPreviewJson = JsonConvert.SerializeObject(dtPreview);

            js.ADD(string.Format("ShowDocWriterPreview('{0}',{1},'{2}')", url, dtPreviewJson, based.Title));
        }


        //private DataTable LoadSchema()
        //{

        //    #region don't change
        //    DataTable dtHDR = new DataTable();
        //    dtHDR = dal.LoadSchema();
        //    #endregion

        //    DataRow dr = dtHDR.NewRow();
        //    //dr["ID"] = WebApp.nwobjectText("idvallugLocacc") + WebApp.nwobjectText("txtEffectiveDate");
        //    //dr["Locacc"] = WebApp.nwobjectText("idvallugLocacc");
        //    //dr["EffectiveDate"] = WebApp.nwobjectText("txtEffectiveDate");
        //    //dr["AuthorizedSignatory"] = WebApp.nwobjectText("idvallugAuthorizedSignatory");
        //    //dr["Recuser"] = based.SecurityAccess.RecUser;
        //    //dr["Moduser"] = based.SecurityAccess.RecUser;
        //    dr["Description"] = WebApp.nwobjectText("txtStandardTerm");
        //    dtHDR.Rows.Add(dr);

        //    #region don't change
        //    dtHDR.AcceptChanges();
        //    #endregion
        //    return dtHDR;
        //}

    }
}

