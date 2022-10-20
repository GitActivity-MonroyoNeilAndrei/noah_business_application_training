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
using System.Threading.Tasks;

namespace Noah_Web.forms_BusinessLayer
{
    public class PMOCustomerLedgerBL : nwAction
    {
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
        private string PRINTTYPE = "CustomerVendorLedger";
       
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

        #region Addition Functionality
        PMOCustomerLedgerGetSet GetSet = new PMOCustomerLedgerGetSet();
        #endregion

        //billing statement Tab
        private int SPR_BSNO_BS = 1,
                    SPR_BSDATE_BS = 2,
                    SPR_DUEDATE_BS = 3,
                    SPR_CLEARED_BS = 4,
                    SPR_DETAILS_BS = 5,
                    SPR_AMOUNTDUE_BS = 6,
                    SPR_PENALTY_BS = 7,
                    SPR_TOTALAMTDUE_BS = 8,
                    SPR_PAYMENTS_BS = 9,
                    SPR_OUTSTANDINGBALANCE_BS = 10;

        //Customer's Tab
        private int SPR_NO_UO = 1,
                    SPR_BSNO_UO = 2,
                    SPR_BSDATE_UO = 3,
                    SPR_DUEDATE_UO = 4,
                    SPR_ORNO_UO = 5,
                    SPR_MAN_ORNO = 6,
                    SPR_ORDATE_UO = 7,
                    SPR_TOTALAMNTDUE = 8,
                    SPR_PENALTY_CT = 9,
                    SPR_ADJUSTMENT_CT = 10,
                    SPR_AMTPD_UO = 11,
                    SPR_OUTSTANDINGBALANCE_UO = 12;

        private int SPR_AsOfCol = 1,
                 SPR_Amount = 2,
                 SPR_Total = 3,
                 SPR_SortBy = 4,
                 SPR_Tag = 5,
                 SPR_RowNo = 6;

        private int SPR_VndrValueDate = 1,
                 SPR_VndrDocno = 2,
                 SPR_VndrPCCC = 3,
                 SPR_VndrParticulars = 4,
                 SPR_VndrModeOfPayment = 5,
                 SPR_VndrCheckPaymentDetails = 6,
                 SPR_VndrCheckDate = 7,
                 SPR_VndrDocumentAmount = 8,
                 SPR_VndrRunningBal = 9,
                 SPR_VndrGLAccount = 10,
                 SPR_VndrRefDocno = 11,
                 SPR_VndrTag = 12,
                 SPR_VndrRowno = 13;

        private int
                 SPR_CustValueDate = 1,
                 SPR_CustDocno = 2,
                 SPR_PCCC = 3,
                 SPR_CustParticulars = 4,
                 SPR_CustModeOfPayment = 5,
                 SPR_CustCheckPaymentDetails = 6,
                 SPR_CustCheckDate = 7,
                 SPR_CustOrLot = 8,
                 SPR_CustDocumentAmount = 9,
                 SPR_CustRunningBal = 10,
                 SPR_CustGLAccount = 11,
                 SPR_CustORStatus = 12,
                 SPR_CustPRNo = 13,
                 SPR_CustRefDocno = 14,
                 SPR_CustRowno = 15,
                 SPR_CustTag = 16;

        //NDB SPR Declaration
        private int SPR_Charges = 1,
                 SPR_Vatex = 2,
                 SPR_Vat = 3,
                 SPR_Vatin = 4,
                 SPR_Cwt = 5,
                 SPR_DetailsAmountDue = 6;
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
            dal = new PMOCustomerLedgerDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        internal PMOCustomerLedgerDAL dal;
        //int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public PMOCustomerLedgerBL()
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
            GetSetHdr();
            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.inquireQuery();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugAccountNo":
                    strSQL = dal.getAccountDetails();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugName":
                    string location = WebApp.nwobjectText("luglocacc");
                    strSQL = dal.getlugName(GetSet.LedgerType,location);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnWidth(2, "180");
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(5);
                    nwObject.ColumnHide(6);
                    nwObject.ColumnHide(7);
                    nwObject.ColumnHide(8);
                    nwObject.ColumnHide(9);
                    nwObject.ColumnHide(10);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getluglocacc":
                    string filterq = WebApp.nwobjectText("luglocacc");
                    strSQL = dal.getlocationlookup(based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnSort("Code", "Asc");
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugPCCC":
                    strSQL = dal.getPCCC(WebApp.nwobjectText("luglocacc"), based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnSort("Code", "Asc");
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   
                    break;
            }

            return strFinal;
        }

        ///// Standard RecordOperation 

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";

            switch (i)
            {
                case eRecordOperation.AddNew:
                    nwToolBox.bindingNavigatorAddNewItem.Enable =
                    nwToolBox.bindingNavigatorRefreshItem.Enable =
                    nwToolBox.bindingNavigatorSaveItem.Enable = true;

                    nwToolBox.bindingNavigatorPrintItem.Enable =
                    nwToolBox.bindingNavigatorInquireItem.Enable =
                    nwToolBox.bindingNavigatorImportItem.Visible =
                    nwToolBox.bindingNavigatorDeleteItem.Enable =
                    nwToolBox.bindingNavigatorDeleteItem.Visible =
                    nwToolBox.bindingNavigatorExportItem.Enable = false;
                   

                    GenerateGridBillingStatment(true);
                    GenerateGridCustomerLedger(true);
                    break;

                case eRecordOperation.Save:
                    RecordOperationResult = AreValidEntries();

                    if (RecordOperationResult == string.Empty)
                    {
                        DataTable dt = LoadSchema();
                        RecordOperationResult = dal.SaveData(dt, isNewRow);
                    }
                    else
                    {
                        RecordOperationResult = RecordOperationResult.Insert(0, "Error(s) Found:\n");
                        js.ADD("isNewRow=" + isNewRow.ToString().ToLower());
                    }
                    break;

                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("txtCode"), WebApp.nwobjectText("idvallugMainStages"));
                    break;

                case eRecordOperation.Process:
                    tempstr = "Process";
                    Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Refresh:
                    
                    string accountNo = WebApp.nwobjectText("AccountNo");
                    if (accountNo != "") {
                        GenerateGridBillingStatment(false);
                        GenerateGridCustomerLedger(false);
                        nwToolBox.bindingNavigatorExportItem.Enable = true;
                    }
                    else {
                        GenerateGridBillingStatment(true);
                        GenerateGridCustomerLedger(true);
                    }
                    RefreshData();
                    js.ADD("nwLoading_End('actbindcollection');");
                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    break;

                case eRecordOperation.Import:
                    tempstr = "import";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Export:

                    string activeTab = WebApp.nwobjectText("activeTab");
                    string xCode = WebApp.nwobjectText("xCode");
                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, 
                                                           dal.LISTINGSTARTROW, 
                                                           dal.LISTINGQUERY(activeTab, xCode),
                                                           dal.LISTINGFILENAME + " Listing", 
                                                           UserDefinedConnectionString, 
                                                           SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                           based.SecurityAccess.RecUserName, 
                                                           dal.LISTINGFILENAME + " Listing");
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
                    js.ADD("loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtCode") + "') ");
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
            string accountNo = string.Empty;
            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();
                    break;
                case "actBindCollectionEmpty":
                    js.ADD("nwLoading_End('actbindcollection')");
                    break;

                case "actGetSetHdr":
                    GetSetHdr();
                    break;
                case "ValidatePrinting":
                    js.ADD(@"msgBoxContainerQuestion ='PromptPrinting';
                                 parent_MessageBoxQuestion('Do you want to print the selected transaction(s)?', 'Debit Memo Batch Printing', ''); ");
                    //}
                    break;
                case "actClearGrid":
                    GenerateGridCustVndrAcctSumm(true);
                    GenerateGridVndrTranDtl(true);
                    GenerateGridBillingStatment(true);
                    GenerateGridCustTranDtl(true);
                    js.ADD("nwLoading_End('nwLoading')");

                    break;
                case "actSetDynamicLevels":
                    accountNo = WebApp.nwobjectText("AccountNo");
                    loadDynamicTable(accountNo);
                    js.ADD("$('#txtAccountStatus').val('"+ dal.getAccountStatus(accountNo)+ "');");
                    GenerateGridBillingStatment(true);
                    GenerateGridCustomerLedger(true);
                    js.ADD("nwLoading_End('actSetDynamicLevels')");
                    break;
                case "actsetLevelCodeDesc":
                    setLevelCodeDesc();
                    js.ADD("nwLoading_End('actsetLevelCodeDesc')");
                    break;
                case "actGenerateGridTotalAmountDueDetails":
                    generateBillingStmntDetails();
                    js.ADD("nwLoading_End('actGenerateGridTotalAmountDueDetails')");
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
                    standardBL.PrimaryKey = "Code";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(), this.UserDefinedConnectionString);
                    break;
            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#txtCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Code");
            SFObject.SetControlBinding("#txtDescription", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Description");
            SFObject.SetControlBinding("#idvallugMainStages", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MainStagesCode");
            SFObject.SetControlBinding("#descvallugMainStages", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MainStagesShortDesc");
            SFObject.SetControlBinding("#txtLongDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MainStagesDesc");
            SFObject.SetControlBinding("#radioSystemAssigned", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "SystemAssigned");
            SFObject.SetControlBinding("#radioManuallyTag", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "ManuallyTagged");
            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");
        }

        private void BindCollection()
        {
            string accountNo = WebApp.nwobjectText("accountNo");
            js.ADD("nwLoading_End('actbindcollection');");
        }

        private string AreValidEntries()
        {
            string location = WebApp.nwobjectText("location");
            string errorResult = string.Empty;

            if (WebApp.nwobjectText("cmbLedgerType").Trim().Length <= 0)
                errorResult += "Cannot continue. Ledger Type is required.\n";

            if(location == "")
            {
                errorResult += "Cannot continue. Location is required.\n";
            }

            if (WebApp.nwobjectText("idvallugName").Trim().Length <= 0)
                errorResult += "Cannot continue. Name is required.\n";

            if (WebApp.nwobjectText("txtDateasof").Trim().Length <= 0)
                errorResult += "Cannot continue. As Of Date is required.\n";

            return errorResult;
        }



        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema();
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["Code"] = WebApp.nwobjectText("txtCode");
            dr["Description"] = WebApp.nwobjectText("txtDescription");
            dr["MainStages"] = WebApp.nwobjectText("idvallugMainStages");
            dr["SubStagesType"] = WebApp.nwobjectText("SubStagesType");
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
            if (based.isInterface == true) { dal.UpdateVersion(); }
            GenerateGridBillingStatment(true);
            GenerateGridCustomerLedger(true);
            nwToolBox.bindingNavigatorPrintItem.Visible = 
            nwToolBox.bindingNavigatorPrintItem.Enable = 
            nwToolBox.bindingNavigatorRefreshItem.Enable = false;
        }

        private void RefreshData()
        {
            //js.ADD("ClearFields();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
            js.ADD("RefreshData()");


        }

        private void GetSetHdr()
        {
            GetSet.LedgerType = WebApp.nwobjectText("cmbLedgerTypeVal");
            GetSet.Name = WebApp.nwobjectText("idvallugName");
            GetSet.RegisteredName = WebApp.nwobjectText("txtRegisteredName");
            GetSet.TradeName = WebApp.nwobjectText("txtTradeName");
            GetSet.Address = WebApp.nwobjectText("txtAddress");
            GetSet.Contact = WebApp.nwobjectText("txtContact");
            GetSet.VendorAccount = WebApp.nwobjectText("txtVendorAcct");
            GetSet.CustomerAccount = WebApp.nwobjectText("txtCustomerAcct");
            GetSet.CheckPayeeName = WebApp.nwobjectText("txtCheckPayeeName");
        }

        public void GenerateGridCustVndrAcctSumm(bool isInitialize)
        {
            string gridID = "nwGridCustVndrAcctSumm";
            string gridIDCon = "nwGridCustVndrAcctSummCon";

            nwGrid nwGridCon = new nwGrid(gridID);

            nwGridCon.CreateExcelGrid(5, SPR_RowNo);
            nwGridCon.TableHeight(300);

            #region Column Title
            nwGridCon.nwobject(SPR_AsOfCol - 1).ColumnName("A");
            nwGridCon.nwobject(SPR_Amount - 1).ColumnName("B");
            nwGridCon.nwobject(SPR_Total - 1).ColumnName("C");
            #endregion

            #region Column Width
            nwGridCon.nwobject(SPR_AsOfCol - 1).Width(250);
            nwGridCon.nwobject(SPR_Amount - 1).Width(150);
            nwGridCon.nwobject(SPR_Total - 1).Width(150);

            nwGridCon.nwobject(SPR_SortBy - 1).Width(0);
            nwGridCon.nwobject(SPR_Tag - 1).Width(0);
            nwGridCon.nwobject(SPR_RowNo - 1).Width(0);
            #endregion

            #region Column Color   
            nwGridCon.nwobject(SPR_AsOfCol - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Amount - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Total - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_SortBy - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Tag - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_RowNo - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Templates                                     
            #endregion

            #region Column Button      
            #endregion

            DataTable dt = new DataTable();

            string jsCode = string.Empty;
            if (!isInitialize)
            {
                var vendor = WebApp.nwobjectText("txtVendorAcct");
                var customer = WebApp.nwobjectText("txtCustomerAcct");
                var DateAsOf = WebApp.nwobjectText("txtDateasof");
                var locacc = WebApp.nwobjectText("luglocacc");
                var PCCC = WebApp.nwobjectText("lugPCCC");

                dt = dal.getCustVndrAcctSummDT(based.SecurityAccess.RecUser, vendor, customer, DateAsOf,locacc,PCCC);

                //ListingAndPrint nwGridCon = new ListingAndPrint(ListingAndPrint.FormType.Empty, 1, dt, "", this.UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName, "");

                if (dt.Rows.Count > 0)
                {
                    nwGridCon.CreateExcelGrid(dt.Rows.Count + 1, SPR_Total);
                    nwGridCon.dataSource(dt);
                    nwGridCon.maxRow(dt.Rows.Count + 1);
                }

                #region Merge Cell

                DataView dv = new DataView();
                DataTable dtFilter = new DataTable();
                int RowNo = 0;

                //Merge colspan no -1 
                nwGridCon.Rows(0).Merge(1, SPR_Total);
                nwGridCon.Rows(dt.Rows.Count - 5).Merge(1, SPR_Amount);
                nwGridCon.Rows(dt.Rows.Count - 5, SPR_Total - 1).TextAlign("right");
                nwGridCon.Rows(dt.Rows.Count - 5).FontWeight("Bold");
                nwGridCon.Rows(0, SPR_AsOfCol - 1).FontWeight("Bold");
                nwGridCon.Rows(1, SPR_Amount - 1).FontWeight("Bold");
                nwGridCon.Rows(1, SPR_Total - 1).FontWeight("Bold");
                nwGridCon.Rows(1, SPR_Amount - 1).TextAlign("Center");
                nwGridCon.Rows(1, SPR_Total - 1).TextAlign("Center");
                nwGridCon.Rows(1, SPR_SortBy - 1).TextAlign("Center");

                dv = dt.AsDataView();
                dv.RowFilter = "Tag = 1";
                foreach (DataRow dr in dv.ToTable().Rows)
                {
                    RowNo = Convert.ToInt32(dr["Rowno"].ToString());
                    nwGridCon.Rows(RowNo - 1, 1).TextAlign("right");
                    nwGridCon.Rows(RowNo - 1, 2).TextAlign("right");
                    nwGridCon.Rows(RowNo - 1, 3).TextAlign("right");
                }

                dv = dt.AsDataView();
                dv.RowFilter = "Tag = 2";
                foreach (DataRow dr in dv.ToTable().Rows)
                {
                    RowNo = Convert.ToInt32(dr["Rowno"].ToString());
                    nwGridCon.Rows(RowNo - 1, 1).TextAlign("right");
                    nwGridCon.Rows(RowNo - 1, 2).TextAlign("right");
                    nwGridCon.Rows(RowNo - 1, 3).TextAlign("right");
                }

                #region Comment
                //dv = dt.AsDataView();
                //dv.RowFilter = "Tag = 7";
                //RowNo = Convert.ToInt32(dv.ToTable().Rows[0]["Rowno"].ToString());
                //nwGridCon.Rows(RowNo).Merge(1, SPR_Total);

                //dv = dt.AsDataView();
                //dv.RowFilter = "Tag = 8";
                //RowNo = Convert.ToInt32(dv.ToTable().Rows[0]["Rowno"].ToString());
                //nwGridCon.Rows(RowNo).Merge(1, SPR_Amount);
                //nwGridCon.Rows(RowNo, SPR_AsOfCol - 1).FontWeight("Bold");
                //nwGridCon.Rows(RowNo, SPR_Total - 1).FontWeight("Bold");
                //nwGridCon.Rows(RowNo, SPR_Total - 1).TextAlign("right");

                //dv = dt.AsDataView();
                //dv.RowFilter = "Tag = 10";
                //RowNo = Convert.ToInt32(dv.ToTable().Rows[0]["Rowno"].ToString());
                //nwGridCon.Rows(RowNo).Merge(1, SPR_Amount);
                ////nwGridCon.Rows(RowNo, SPR_AsOfCol - 1).FontWeight("Bold");

                //dv = dt.AsDataView();
                //dv.RowFilter = "Tag = 11";
                //RowNo = Convert.ToInt32(dv.ToTable().Rows[0]["Rowno"].ToString());
                //nwGridCon.Rows(RowNo).Merge(1, SPR_Amount);
                ////nwGridCon.Rows(RowNo, SPR_AsOfCol - 1).FontWeight("Bold");

                //nwGridCon.Rows(1, SPR_Total - 1).FontWeight("Bold");

                //nwGridCon.m_Spread.AddCellSpan(4, 3, 2, 4); 
                #endregion

                #endregion
             
                jsCode = "$('#" + gridID + "-nwData tr:eq(" + (dt.Rows.Count - 5) + ") td:eq(" + SPR_Total + ")').addClass('doublerule');";
            }

            //## THEME FORMAT
            // #DEDEDE = gainsboro
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#DEDEDE");
            nwGridCon.BodyBorderColor("#DEDEDE");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");
            nwGridCon.HoverColor("#DEDEDE", "inherit");
            nwGridCon.SelectedRowHover("#DEDEDE");
            nwGridCon.SelectedRowHoverColor("inherit");

            //js.ADD(nwGridCon.CreateScript(gridIDCon, gridID));
            //js.makeCSS(gridIDCon, "border", "1px solid #BBB1B1");

            js.makeHTML("#" + gridIDCon + "", nwGridCon.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD(jsCode);
        }
        public void GenerateGridCustTranDtl(bool isInitialize)
        {
            string gridID = "nwGridCustTranDtl";
            string gridIDCon = "nwGridCustTranDtlCon";

            nwGrid nwGridCon = new nwGrid(gridID);

            nwGridCon.CreateExcelGrid(1, SPR_CustTag);
            nwGridCon.TableHeight(300);

            #region Column Title
            nwGridCon.nwobject(SPR_CustValueDate - 1).ColumnName("Value Date");
            nwGridCon.nwobject(SPR_CustDocno - 1).ColumnName("Document No.");
            nwGridCon.nwobject(SPR_PCCC - 1).ColumnName(dal.getDynamicPCCCName());
            nwGridCon.nwobject(SPR_CustParticulars - 1).ColumnName("Particulars");
            nwGridCon.nwobject(SPR_CustModeOfPayment - 1).ColumnName("Mode of Payment");
            nwGridCon.nwobject(SPR_CustCheckPaymentDetails - 1).ColumnName("Check Details");
            nwGridCon.nwobject(SPR_CustCheckDate - 1).ColumnName("Check Date");
            nwGridCon.nwobject(SPR_CustOrLot - 1).ColumnName("OR No.");
            nwGridCon.nwobject(SPR_CustDocumentAmount - 1).ColumnName("Document Amount");
            nwGridCon.nwobject(SPR_CustRunningBal - 1).ColumnName("Running Balance");
            nwGridCon.nwobject(SPR_CustGLAccount - 1).ColumnName("GL Account");
            nwGridCon.nwobject(SPR_CustORStatus - 1).ColumnName("OR Status");
            nwGridCon.nwobject(SPR_CustPRNo - 1).ColumnName("PR No.");
            nwGridCon.nwobject(SPR_CustRefDocno - 1).ColumnName("Reference No.");
            //nwGridCon.nwobject(SPR_CustRowno - 1).ColumnName("Rowno");
            #endregion

            #region Column Width
            nwGridCon.nwobject(SPR_CustValueDate - 1).Width(150);
            nwGridCon.nwobject(SPR_CustDocno - 1).Width(200);
            nwGridCon.nwobject(SPR_CustRefDocno - 1).Width(200);
            nwGridCon.nwobject(SPR_CustParticulars - 1).Width(150);
            nwGridCon.nwobject(SPR_CustModeOfPayment - 1).Width(100);
            nwGridCon.nwobject(SPR_CustCheckPaymentDetails - 1).Width(100);
            nwGridCon.nwobject(SPR_CustCheckDate - 1).Width(100);
            nwGridCon.nwobject(SPR_CustOrLot - 1).Width(100);
            nwGridCon.nwobject(SPR_CustRunningBal - 1).Width(100);
            nwGridCon.nwobject(SPR_CustGLAccount - 1).Width(200);
            nwGridCon.nwobject(SPR_CustORStatus - 1).Width(100);
            nwGridCon.nwobject(SPR_CustPRNo - 1).Width(200);
            nwGridCon.nwobject(SPR_CustRowno - 1).Width(0);
            nwGridCon.nwobject(SPR_CustTag - 1).Width(0);
            #endregion

            #region Column Alignment
            nwGridCon.nwobject(SPR_CustDocumentAmount - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_CustRunningBal - 1).TextAlign("right");
            #endregion

            #region Column Color   
            nwGridCon.nwobject(SPR_CustValueDate - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_CustDocno - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PCCC - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_CustRefDocno - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_CustParticulars - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_CustModeOfPayment - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_CustCheckPaymentDetails - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_CustCheckDate - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_CustOrLot - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_CustDocumentAmount - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_CustRunningBal - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_CustGLAccount - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_CustORStatus - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_CustPRNo - 1).BackgroundColor("gainsboro");
            #endregion

            DataTable dt = new DataTable();

            string jsCode = string.Empty;
            if (!isInitialize)
            {
                var customer = WebApp.nwobjectText("txtCustomerAcct");
                var DateAsOf = WebApp.nwobjectText("txtDateasof");
                var locacc = WebApp.nwobjectText("luglocacc");
                var PCCC  = WebApp.nwobjectText("lugPCCC");

                if (customer == "")
                {
                    dt = dal.getGridCustTranDT(based.SecurityAccess.RecUser, "0", DateAsOf, locacc,PCCC);
                }else
                {
                    dt = dal.getGridCustTranDT(based.SecurityAccess.RecUser, customer, DateAsOf, locacc, PCCC);
                }
               

                if (dt.Rows.Count > 9)
                {
                    nwGridCon.CreateExcelGrid(dt.Rows.Count + 1, SPR_CustPRNo);
                    nwGridCon.dataSource(dt);
                    nwGridCon.maxRow(dt.Rows.Count + 1);

                 
                }

                #region Column Templates                                     
                #endregion

                #region Column Button      
                #endregion


            }

            nwGridCon.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);
            nwGridCon.buttonResetColumn = true;
            nwGridCon.buttonSaveColumn = true;
            nwGridCon.buttonSearchFind = true;

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");
            nwGridCon.HoverColor("#DEDEDE", "inherit");
            nwGridCon.SelectedRowHover("#DEDEDE");
            nwGridCon.SelectedRowHoverColor("inherit");

            js.makeHTML("#" + gridIDCon + "", nwGridCon.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            js.ADD(jsCode);
        }

        public void GenerateGridVndrTranDtl(bool isInitialize)
        {
            string gridID = "nwGridVndrTranDtl";
            string gridIDCon = "nwGridVndrTranDtlCon";

            nwGrid nwGridCon = new nwGrid(gridID);

            nwGridCon.CreateExcelGrid(5, SPR_VndrRowno);
            nwGridCon.TableHeight(300);

            #region Column Title
            nwGridCon.nwobject(SPR_VndrRefDocno - 1).ColumnName("Reference No.");
            nwGridCon.nwobject(SPR_VndrValueDate - 1).ColumnName("Value Date");
            nwGridCon.nwobject(SPR_VndrDocno - 1).ColumnName("Document No.");
            nwGridCon.nwobject(SPR_VndrPCCC - 1).ColumnName(dal.getDynamicPCCCName());
            nwGridCon.nwobject(SPR_VndrParticulars - 1).ColumnName("Particulars");
            nwGridCon.nwobject(SPR_VndrModeOfPayment - 1).ColumnName("Mode of Payment");
            nwGridCon.nwobject(SPR_VndrCheckPaymentDetails - 1).ColumnName("Check Details");
            nwGridCon.nwobject(SPR_VndrCheckDate - 1).ColumnName("Check Date");
            nwGridCon.nwobject(SPR_VndrDocumentAmount - 1).ColumnName("Document Amount");
            nwGridCon.nwobject(SPR_VndrRunningBal - 1).ColumnName("Running Balance"); ;
            nwGridCon.nwobject(SPR_VndrGLAccount - 1).ColumnName("GL Account");
            nwGridCon.nwobject(SPR_VndrTag - 1).ColumnName("Tag");
            nwGridCon.nwobject(SPR_VndrRowno - 1).ColumnName("Rowno");
            #endregion

            #region Column Width
            nwGridCon.nwobject(SPR_VndrValueDate - 1).Width(150); ;
            nwGridCon.nwobject(SPR_VndrDocno - 1).Width(200); ;
            nwGridCon.nwobject(SPR_VndrRefDocno - 1).Width(200); ;
            nwGridCon.nwobject(SPR_VndrParticulars - 1).Width(250); ;
            nwGridCon.nwobject(SPR_VndrModeOfPayment - 1).Width(100); ;
            nwGridCon.nwobject(SPR_VndrDocumentAmount - 1).Width(100); ;
            nwGridCon.nwobject(SPR_VndrRunningBal - 1).Width(100); ;
            nwGridCon.nwobject(SPR_VndrGLAccount - 1).Width(200); ;

            nwGridCon.nwobject(SPR_VndrCheckDate - 1).Width(100); ;
            nwGridCon.nwobject(SPR_VndrCheckPaymentDetails - 1).Width(100); ;
            nwGridCon.nwobject(SPR_VndrPCCC - 1).Width(100); ;

            nwGridCon.nwobject(SPR_VndrTag - 1).Width(0); ;
            nwGridCon.nwobject(SPR_VndrRowno - 1).Width(0); ;
            #endregion

            #region Column Alignment
            nwGridCon.nwobject(SPR_VndrDocumentAmount - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_VndrRunningBal - 1).TextAlign("right"); ;
            #endregion

            #region Column Color   
            nwGridCon.nwobject(SPR_VndrValueDate - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_VndrDocno - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_VndrRefDocno - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_VndrParticulars - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_VndrModeOfPayment - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_VndrCheckPaymentDetails - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_VndrPCCC - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_VndrCheckDate - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_VndrDocumentAmount - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_VndrRunningBal - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_VndrGLAccount - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Templates                                     
            #endregion

            #region Column Button      
            #endregion

            DataTable dt = new DataTable();

            string jsCode = string.Empty;
            if (!isInitialize)
            {
                var vendor = WebApp.nwobjectText("txtVendorAcct");
                var DateAsOf = WebApp.nwobjectText("txtDateasof");
                var locacc = WebApp.nwobjectText("luglocacc");
                var PCCC = WebApp.nwobjectText("lugPCCC");
          
               

                if (vendor == "")
                {
                    dt = dal.getGridVndrTranDT(based.SecurityAccess.RecUser, "0" , DateAsOf, locacc, PCCC);
                }else
                {
                    dt = dal.getGridVndrTranDT(based.SecurityAccess.RecUser, vendor, DateAsOf, locacc, PCCC);
                }
               

                if (dt.Rows.Count > 9)
                {
                    nwGridCon.CreateExcelGrid(dt.Rows.Count + 1, SPR_VndrRowno);
                    nwGridCon.dataSource(dt);
                    nwGridCon.maxRow(dt.Rows.Count + 1);

                    #region Merge Cell
                    DataView dv = new DataView();
                    DataTable dtFilter = new DataTable();
                    int RowNo = 0;

                    dv = dt.AsDataView();

                    // Fix for multiple page
                    int multiPage = dv.ToTable().Rows.Count >= 500 ? -1 : 0;

                    dv.RowFilter = "Tag = 3";
                    foreach (DataRow dr in dv.ToTable().Rows)
                    {
                        RowNo = Convert.ToInt32(dr["Rowno"].ToString());
                        RowNo += multiPage;
                        nwGridCon.Rows(RowNo -1, SPR_VndrDocumentAmount - 1).FontWeight("Bold");
                        nwGridCon.Rows(RowNo - 1, SPR_VndrModeOfPayment - 1).FontWeight("Bold");
                        int newROwno = RowNo - 1;

                        jsCode += "$('#" + gridID + "-nwData tr:eq(" + newROwno  + ") td:eq(" + SPR_VndrDocumentAmount + ")').addClass('doublerule');";
                        jsCode += "$('#" + gridID + "-nwData tr:eq(" + newROwno + ") td:eq(" + SPR_VndrModeOfPayment + ")').addClass('doublerule');";
                    }

                    dv = dt.AsDataView();
                    dv.RowFilter = "Tag = 5";
                    foreach (DataRow dr in dv.ToTable().Rows)
                    {
                        RowNo = Convert.ToInt32(dr["Rowno"].ToString());
                        RowNo += multiPage;
                        nwGridCon.Rows(RowNo - 1, SPR_VndrValueDate - 1).FontWeight("Bold");
                        nwGridCon.Rows(RowNo - 1, SPR_VndrDocno - 1).FontWeight("Bold");
                        nwGridCon.Rows(RowNo - 1, SPR_VndrDocno - 1).TextAlign("right");
                    }

                    dv = dt.AsDataView();
                    dv.RowFilter = "Tag = 6";
                    foreach (DataRow dr in dv.ToTable().Rows)
                    {
                        RowNo = Convert.ToInt32(dr["Rowno"].ToString());
                        RowNo += multiPage;
                        nwGridCon.Rows(RowNo -1, SPR_VndrValueDate - 1).FontWeight("Bold");
                        nwGridCon.Rows(RowNo - 1, SPR_VndrDocno - 1).FontWeight("Bold");
                        nwGridCon.Rows(RowNo - 1, SPR_VndrDocno - 1).TextAlign("right");
                    }

                    dv = dt.AsDataView();
                    dv.RowFilter = "Tag = 7";
                    foreach (DataRow dr in dv.ToTable().Rows)
                    {
                        RowNo = Convert.ToInt32(dr["Rowno"].ToString());
                        RowNo += multiPage;
                        nwGridCon.Rows(RowNo - 1, SPR_VndrValueDate - 1).FontWeight("Bold");
                        nwGridCon.Rows(RowNo - 1, SPR_VndrDocno - 1).FontWeight("Bold");
                        nwGridCon.Rows(RowNo -1 , SPR_VndrDocno - 1).TextAlign("right");
                        nwGridCon.Rows(RowNo , SPR_VndrDocno - 1).TextAlign("right");
                    }

                    #endregion
                }
            }

            nwGridCon.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);
            nwGridCon.buttonResetColumn = true;
            nwGridCon.buttonSaveColumn = true;
            nwGridCon.buttonSearchFind = true;

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");
            nwGridCon.HoverColor("#DEDEDE", "inherit");
            nwGridCon.SelectedRowHover("#DEDEDE");
            nwGridCon.SelectedRowHoverColor("inherit");

            js.makeHTML("#" + gridIDCon + "", nwGridCon.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            js.ADD(jsCode);
        }


        private void loaddefault()
        {
            DataTable dtDefault = new DataTable();
            dtDefault = dal.getDefaultFilter(based.SecurityAccess.RecUser);
            if (dtDefault.Rows.Count == 0)
            {
            }
            else
            {
                int b;
                for (b = 0; b <= dtDefault.Rows.Count - 1; b++)
                {
                    js.ADD($"defaultonload('{dtDefault.Rows[b]["Code"].ToString()}','{dtDefault.Rows[b]["Description"].ToString()}')");

                }
            }
        }

        public void GenerateGridBillingStatment(bool isInitialize)
        {
            string gridCon = "nwGridBillingStatementCon"; //container
            nwGrid nwspread = new nwGrid(gridCon);
            nwspread.Type = nwGridType.SpreadCanvas;
            nwspread.varSpreadBook = "nwGridMainCon_Book";
            nwspread.varSpreadSheet = "nwGridMainCon_Sheet";

            DataTable dt = new DataTable();
            DataTable dt2 = new DataTable();

            dt2.Columns.Add("Billing Statement No.");
            dt2.Columns.Add("Billing Date");
            dt2.Columns.Add("Due Date");
            dt2.Columns.Add("Cleared");
            dt2.Columns.Add("Details");
            dt2.Columns.Add("Billed Amount");
            dt2.Columns.Add("Penalty");
            dt2.Columns.Add("Total Amount Due");
            dt2.Columns.Add("Payment/Adjustment");
            dt2.Columns.Add("Outstanding Balance.");
            dt2.Rows.Add("", "", "", "", "...", "", "", "", "", "");
            dt2.Rows.Add("", "", "", "", "...", "", "", "", "", "");
            dt2.Rows.Add("", "", "", "", "...", "", "", "", "", "");
            dt2.Rows.Add("", "", "", "", "...", "", "", "", "", "");


            string jsCode = string.Empty;
            if (!isInitialize)
            {
                var AccountNo = WebApp.nwobjectText("AccountNo");
                dt = dal.getBillingStatementTab(AccountNo);

                ////ListingAndPrint nwGridCon = new ListingAndPrint(ListingAndPrint.FormType.Empty, 1, dt, "", this.UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName, "");
                if (dt.Rows.Count > 0)
                {
                    nwspread.dataSource(dt);
                }
                else
                {
                    nwspread.dataSource(dt2);
                }

            }
            else
            {
                nwspread.dataSource(dt2);
            }

            nwspread.PagerDataEditable(true);
            nwspread.PagerPerPage(30);

            #region Column Title
            nwspread.SetColumnName((SPR_BSNO_BS - 1), "Billing Statement No.");
            nwspread.SetColumnName((SPR_BSDATE_BS - 1), "Billing Date");
            nwspread.SetColumnName((SPR_DUEDATE_BS - 1), "Due Date");
            nwspread.SetColumnName((SPR_CLEARED_BS - 1), "Cleared");
            nwspread.SetColumnName((SPR_DETAILS_BS - 1), "Details");
            nwspread.SetColumnName((SPR_AMOUNTDUE_BS - 1), "Billed Amount");
            nwspread.SetColumnName((SPR_PENALTY_BS - 1), "Penalty");
            nwspread.SetColumnName((SPR_TOTALAMTDUE_BS - 1), "Total Amount Due");
            nwspread.SetColumnName((SPR_PAYMENTS_BS - 1), "Payment/Adjustment");
            nwspread.SetColumnName((SPR_OUTSTANDINGBALANCE_BS - 1), "Outstanding Balance.");
            #endregion

            #region Column Width
            nwspread.nwobject(SPR_BSNO_BS - 1).Width(150);
            nwspread.nwobject(SPR_BSDATE_BS - 1).Width(150);
            nwspread.nwobject(SPR_DUEDATE_BS - 1).Width(150);
            nwspread.nwobject(SPR_CLEARED_BS - 1).Width(150);
            nwspread.nwobject(SPR_DETAILS_BS - 1).Width(150);
            nwspread.nwobject(SPR_AMOUNTDUE_BS - 1).Width(150);
            nwspread.nwobject(SPR_PENALTY_BS - 1).Width(150);
            nwspread.nwobject(SPR_TOTALAMTDUE_BS - 1).Width(150);
            nwspread.nwobject(SPR_PAYMENTS_BS - 1).Width(150);
            nwspread.nwobject(SPR_OUTSTANDINGBALANCE_BS - 1).Width(150);
            #endregion

            #region Column Color   
            nwspread.nwobject(SPR_BSNO_BS - 1).BackgroundColor("gainsboro");
            nwspread.nwobject(SPR_BSDATE_BS - 1).BackgroundColor("gainsboro");
            nwspread.nwobject(SPR_DUEDATE_BS - 1).BackgroundColor("gainsboro");
            nwspread.nwobject(SPR_CLEARED_BS - 1).BackgroundColor("gainsboro");
            nwspread.nwobject(SPR_DETAILS_BS - 1).BackgroundColor("gainsboro");
            nwspread.nwobject(SPR_AMOUNTDUE_BS - 1).BackgroundColor("gainsboro");
            nwspread.nwobject(SPR_PENALTY_BS - 1).BackgroundColor("gainsboro");
            nwspread.nwobject(SPR_TOTALAMTDUE_BS - 1).BackgroundColor("gainsboro");
            nwspread.nwobject(SPR_PAYMENTS_BS - 1).BackgroundColor("gainsboro");
            nwspread.nwobject(SPR_OUTSTANDINGBALANCE_BS - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Templates  
            nwspread.nwobject(SPR_AMOUNTDUE_BS - 1).TextAlign("right");
            nwspread.nwobject(SPR_PENALTY_BS - 1).TextAlign("right");
            nwspread.nwobject(SPR_TOTALAMTDUE_BS - 1).TextAlign("right");
            nwspread.nwobject(SPR_PAYMENTS_BS - 1).TextAlign("right");
            nwspread.nwobject(SPR_OUTSTANDINGBALANCE_BS - 1).TextAlign("right");
            nwspread.nwobject(SPR_DETAILS_BS - 1).TextAlign("center");
            //nwspread.nwobject(SPR_DETAILS_BS - 1).ObjectType("button");
            //nwspread.nwobject(SPR_CLEARED_BS - 1).CheckBox(true);
            nwspread.nwobject(SPR_CLEARED_BS - 1).ObjectType("checkbox");
            js.ADD("CreatedGridDone();");
            #endregion

            #region Column Button      
            #endregion

            //## THEME FORMAT
            // #DEDEDE = gainsboro
            nwspread.HeaderBorderColor("#DEDEDE");
            nwspread.rowBackground("#FFFFFF", "#FFFFFF");
            nwspread.TableBorderColor("#BBB");
            nwspread.BodyBorderColor("#BBB");
            nwspread.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwspread.HeaderTextColor("#131313");
            nwspread.HoverColor("#DEDEDE", "inherit");
            nwspread.SelectedRowHover("#DEDEDE");
            nwspread.SelectedRowHoverColor("inherit");

            //js.ADD("$('#" + gridCon + "').enable(" + isInitialize.ToString().ToLower() + ")");

            js.ADD(nwspread.createTable());
        }

        public void GenerateGridCustomerLedger(bool isInitialize)
        {

            string gridID = "nwGridCustomerLedgerCon";
            string gridIDCon = "nwGridCustomerLedgerCon";

            nwGrid nwGridCon = new nwGrid(gridID);

            nwGridCon.CreateExcelGrid(5, SPR_OUTSTANDINGBALANCE_UO);
            nwGridCon.TableHeight(300);

            #region Column Title
            nwGridCon.nwobject(SPR_NO_UO - 1).ColumnName("No.");
            nwGridCon.nwobject(SPR_BSNO_UO - 1).ColumnName("Billing Statement No.");
            nwGridCon.nwobject(SPR_BSDATE_UO - 1).ColumnName("Billing Date");
            nwGridCon.nwobject(SPR_DUEDATE_UO - 1).ColumnName("Due Date");
            nwGridCon.nwobject(SPR_ORNO_UO - 1).ColumnName("Document No.");
            nwGridCon.nwobject(SPR_MAN_ORNO - 1).ColumnName("Manual OR No.");
            nwGridCon.nwobject(SPR_ORDATE_UO - 1).ColumnName("Document Date");
            nwGridCon.nwobject(SPR_TOTALAMNTDUE - 1).ColumnName("Amount");
            nwGridCon.nwobject(SPR_PENALTY_CT - 1).ColumnName("Penalty");
            nwGridCon.nwobject(SPR_ADJUSTMENT_CT - 1).ColumnName("Adjustment");
            nwGridCon.nwobject(SPR_TOTALAMNTDUE - 1).ColumnName("Amount");
            nwGridCon.nwobject(SPR_AMTPD_UO - 1).ColumnName("Amount Paid");
            nwGridCon.nwobject(SPR_OUTSTANDINGBALANCE_UO - 1).ColumnName("Outstanding Balance.");


            nwGridCon.nwobject(SPR_AMTPD_UO - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_OUTSTANDINGBALANCE_UO - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_TOTALAMNTDUE - 1).TextAlign("right");


            nwGridCon.nwobject(SPR_ADJUSTMENT_CT - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_PENALTY_CT - 1).TextAlign("right");

            #endregion

            #region Column Width
            nwGridCon.nwobject(SPR_NO_UO - 1).Width(150);
            nwGridCon.nwobject(SPR_BSNO_UO - 1).Width(150);
            nwGridCon.nwobject(SPR_BSDATE_UO - 1).Width(150);
            nwGridCon.nwobject(SPR_DUEDATE_UO - 1).Width(150);
            nwGridCon.nwobject(SPR_ORNO_UO - 1).Width(150);
            nwGridCon.nwobject(SPR_ORDATE_UO - 1).Width(150);
            nwGridCon.nwobject(SPR_AMTPD_UO - 1).Width(150);
            nwGridCon.nwobject(SPR_OUTSTANDINGBALANCE_UO - 1).Width(150);
            #endregion

            #region Column Color   

            nwGridCon.nwobject(SPR_MAN_ORNO - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_TOTALAMNTDUE - 1).BackgroundColor("gainsboro");


            nwGridCon.nwobject(SPR_ADJUSTMENT_CT - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PENALTY_CT - 1).BackgroundColor("gainsboro");

            nwGridCon.nwobject(SPR_BSNO_BS - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_NO_UO - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_BSNO_UO - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_BSDATE_UO - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_DUEDATE_UO - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_ORNO_UO - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_ORDATE_UO - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_AMTPD_UO - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_OUTSTANDINGBALANCE_UO - 1).BackgroundColor("gainsboro");
            #endregion


            nwGridCon.nwobject(SPR_NO_UO - 1).TextAlign("center");
            nwGridCon.nwobject(SPR_NO_UO - 1).TextDecoration("bold");
            #region Column Templates                                     
            #endregion

            #region Column Button      
            #endregion

            DataTable dt = new DataTable();

            string jsCode = string.Empty;
            if (!isInitialize)
            {
                var AccountNo = WebApp.nwobjectText("AccountNo");
                dt = dal.getCustomerLedgerTab(AccountNo);
                //ListingAndPrint nwGridCon = new ListingAndPrint(ListingAndPrint.FormType.Empty, 1, dt, "", this.UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName, "");

                if (dt.Rows.Count > 0)
                {
                    nwGridCon.CreateExcelGrid(dt.Rows.Count + 1, SPR_Total);
                    nwGridCon.dataSource(dt);
                    nwGridCon.maxRow(dt.Rows.Count + 1);
                }

            }

            //## THEME FORMAT
            // #DEDEDE = gainsboro
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");
            

            js.makeHTML("#" + gridIDCon + "", nwGridCon.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("generateNextNum();");
        }

        public void generateBillingStmntDetails() {
            string gridID = "nwGridPopupDetails";
            string gridIDCon = "nwGridPopupDetails";

            nwGrid nwGridCon = new nwGrid(gridID);

            nwGridCon.CreateExcelGrid(5, SPR_DetailsAmountDue);
            nwGridCon.TableHeight(300);

            #region Column Title
            nwGridCon.nwobject(SPR_Charges - 1).ColumnName("Charges");
            nwGridCon.nwobject(SPR_Vatex - 1).ColumnName("VATEX");
            nwGridCon.nwobject(SPR_Vat - 1).ColumnName("VAT");
            nwGridCon.nwobject(SPR_Vatin - 1).ColumnName("VATIN");
            nwGridCon.nwobject(SPR_Cwt - 1).ColumnName("CWT");
            nwGridCon.nwobject(SPR_DetailsAmountDue - 1).ColumnName("Amount Due");

            nwGridCon.nwobject(SPR_Vatex - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Vat - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Vatin - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Cwt - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_DetailsAmountDue - 1).TextAlign("right");
            #endregion

            #region Column Width
            nwGridCon.nwobject(SPR_Charges - 1).Width(150);
            nwGridCon.nwobject(SPR_Vatex - 1).Width(150);
            nwGridCon.nwobject(SPR_Vat - 1).Width(150);
            nwGridCon.nwobject(SPR_Vatin - 1).Width(150);
            nwGridCon.nwobject(SPR_Cwt - 1).Width(150);
            nwGridCon.nwobject(SPR_DetailsAmountDue - 1).Width(150);
            #endregion

            #region Column Color   
            nwGridCon.nwobject(SPR_Charges - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Vatex - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Vat - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Vatin - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Cwt - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_DetailsAmountDue - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Templates                                     
            #endregion

            #region Column Button      
            #endregion

            DataTable dt = new DataTable();

            string jsCode = string.Empty;
            var AccountNo = WebApp.nwobjectText("accountNo");
            var billingStmntNum = WebApp.nwobjectText("billingStmntNum");

            dt = dal.getBillingStmntDetails(AccountNo, billingStmntNum);

            if (dt.Rows.Count > 0)
            {
                nwGridCon.CreateExcelGrid(dt.Rows.Count + 1, SPR_DetailsAmountDue);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);
            }
            #region THEME FORMAT
            #endregion DEDEDE = gainsboro
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");


            js.makeHTML("#nwGridPopupDetails", nwGridCon.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("insertRowDetails()");
        }
        public void setLevelCodeDesc() {
            string accountNo = WebApp.nwobjectText("accountNo");
            string lvl1 = WebApp.nwobjectText("lvl1");
            string lvl2 = WebApp.nwobjectText("lvl2");
            string lvl3 = WebApp.nwobjectText("lvl3");
            string lvl4 = WebApp.nwobjectText("lvl4");
            if (lvl1 != "" && lvl1 != "undefined") {
                DataTable dt = dal.getLevelCodeDesc(accountNo, lvl1);
                if (dt.Rows.Count > 0) {
                    js.ADD("$('#idvalluglevel1').val('" + dt.Rows[0]["Code"].ToString() + "')");
                    js.ADD("$('#descvalluglevel1').val('" + dt.Rows[0]["Description"].ToString() + "')");
                }
                
            }
            if (lvl2 != "" && lvl2 != "undefined")
            {
                DataTable dt = dal.getLevelCodeDesc(accountNo, lvl2);
                if (dt.Rows.Count > 0) {
                    js.ADD("$('#idvalluglevel2').val('" + dt.Rows[0]["Code"].ToString() + "')");
                    js.ADD("$('#descvalluglevel2').val('" + dt.Rows[0]["Description"].ToString() + "')");
                }
            }
            if (lvl3 != "" && lvl3 != "undefined")
            {
                DataTable dt = dal.getLevelCodeDesc(accountNo, lvl3);
                if (dt.Rows.Count > 0)
                {
                    js.ADD("$('#idvalluglevel3').val('" + dt.Rows[0]["Code"].ToString() + "')");
                    js.ADD("$('#descvalluglevel3').val('" + dt.Rows[0]["Description"].ToString() + "')");
                }
                
            }
            if (lvl4 != "" && lvl4 != "undefined")
            {
                DataTable dt = dal.getLevelCodeDesc(accountNo, lvl4);
                if (dt.Rows.Count > 0) {
                    js.ADD("$('#idvalluglevel4').val('" + dt.Rows[0]["Code"].ToString() + "')");
                    js.ADD("$('#descvalluglevel4').val('" + dt.Rows[0]["Description"].ToString() + "')");
                }
                
            }
        }
        public void loadDynamicTable(string AccountNo)
        {
            DataTable dt = dal.DynamicLabel(AccountNo);
            int init = 1;
            if (dt.Rows.Count > 0)
            {
                foreach (DataRow dr in dt.Rows)
                {

                    if (dr["Value"].ToString() != "")
                    {
                        js.ADD("$('#level" + init + "').text('" + dr["Value"].ToString() + "');");
                        string lvl = dr["PerLevel"].ToString().Remove(0, 5);
                        js.ADD("$('#descvalluglevel" + init + "').attr('nwLevel','" + dr["PerLevel"].ToString() + "');");
                    }
                    else
                    {

                        js.ADD("$('#level" + init + "').text('Level " + init + "');");

                    }
                    init++;

                }
                js.ADD("setLevelCodeDesc();");
            }
            else {
                js.ADD("$('#level1').text('Level 1');");
                js.ADD("$('#level2').text('Level 2');");
                js.ADD("$('#level3').text('Level 3');");
                js.ADD("$('#level4').text('Level 4');");
            }
        }
    }
}
