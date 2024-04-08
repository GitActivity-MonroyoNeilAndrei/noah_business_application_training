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
    public class PMOPaymentHistoryBL : nwAction
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
            //Addchars();
            dal = new PMOPaymentHistoryDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        string InfoOperationResult = String.Empty;
        PMOPaymentHistoryDAL dal;

        private static int StartIndex = 0,
            SPR_BILLDOCNO = StartIndex,
            SPR_PAYTYPE = ++StartIndex,
            SPR_DATE = ++StartIndex,
            SPR_AMOUNT = ++StartIndex,
            SPR_MOP = ++StartIndex,
            SPR_VIEW = ++StartIndex;
            //SPR_DOWNLOAD = ++StartIndex;

        public PMOPaymentHistoryBL()
        {
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
                        InitializeValues();
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
            strConn = this.UserDefinedConnectionString;

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.inquireQuery();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugPayment":

                    strSQL = dal.lugPaymentType();
                    //nwObject.ColumnSort("[Payment Type]", "ASC");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugMOP":

                    strSQL = dal.lugMOP();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                    //case "getCustomer":
                    //    strSQL = dal.InquireCustomerList(WebApp.nwobjectText("CustomerClassification"));
                    //    nwObject.ColumnSort("Code", "asc");
                    //    strMethod = strMethod.Substring(3);
                    //    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    //    break;

                    //case "getCustomerClassification":
                    //    strSQL = dal.InquireCustClassList(WebApp.nwobjectText("Customer"));
                    //    strMethod = strMethod.Substring(3);
                    //    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    //    break;
            }

            return strFinal;
        } 

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";

            switch (i)
            {
                case eRecordOperation.AddNew:
                    //tempstr = "New";
                    //Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Save:
                    tempstr = "Save";
                    Prompt.Information(tempstr, based.Title);

                    break;

                case eRecordOperation.Delete:
                    tempstr = "Delete";
                    Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Process:
                    //tempstr = "Process";
                    //Prompt.Information(tempstr, based.Title);
                    ProcessData();
                    break;

                case eRecordOperation.Refresh:
                    RefreshData(true);
                    //LoadGrid(false, InitializeGrid());
                    //js.ADD("nwLoading_End('xLoading');");
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

                    frmlist.m_Spread.PagerPerPage(50);

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
                if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                {
                    js.ADD("loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtCode") + "') ");
                    RefreshData(true);
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    //Prompt.Information(RecordOperationResult, based.Title);  // customize eme 09302017
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
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();
                    break;
                case "actBindCollectionEmpty":
                    js.ADD("nwLoading_End('xLoading')");
                    break;
                case "actOnLoad":
                    RefreshData(true);
                    break;
                case "actFilterPayment":
                    RefreshData(false);
                    break;
                case "actFilterDate":
                    RefreshData(false);
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
            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");
        }

        private void BindCollection()
        {
            js.ADD("nwLoading_End('xLoading');");
        }

        private string ValidateDataOnProcess(ref DataTable tmpDt, DataTable apprvlDt) //ValidateDataOnProcess(ref tmpDt=blanktable, dt=conGrid)
        {
            string errorresult = String.Empty;
            string finalApprover = string.Empty;
            int xrow = 0;

            tmpDt = LoadSchema(); //load schema is used as reference



            foreach (DataRow row in apprvlDt.Rows) // apprvlDt.Rows = rows of conGrid
            {
                xrow++;

                //var valdeact1 = row[SPR_PAYTYPE].ToString();

                //if (row[SPR_PAYTYPE].ToString() == "1")
                //{
                //    row[SPR_PAYTYPE] = "true";
                //    var valdeact1a = row[SPR_PAYTYPE].ToString();
                //}
                //else
                //{
                //    row[SPR_PAYTYPE] = "false";
                //    var valdeact1b = row[SPR_PAYTYPE].ToString();
                //}

                if (row[SPR_PAYTYPE].ToString() == "true")
                {


                    DataRow tmpDr = tmpDt.NewRow();

                    tmpDr["CustomerCode"] = row[SPR_VIEW];
                    tmpDr["Reason"] = row[SPR_AMOUNT];

                    var valdeact2 = row[SPR_PAYTYPE].ToString();



                    if (row[SPR_PAYTYPE].ToString() == "true")
                    {
                        if (string.IsNullOrEmpty(row[SPR_AMOUNT].ToString()))
                            errorresult += "Cannot continue. Reason for Deactivation is required at row [" + xrow + "].\n";

                        tmpDr["Status"] = 3; //process
                    }
                    tmpDt.Rows.Add(tmpDr);
                }
            }

            if (tmpDt.Rows.Count <= 0)
                errorresult += "Cannot be continued. No customer has been selected.";

            return errorresult;
        }

        private DataTable LoadSchema()
        {
            DataTable tmpDt = new DataTable();
            tmpDt.Columns.Add("CustomerCode", typeof(string));
            tmpDt.Columns.Add("Reason", typeof(string));
            tmpDt.Columns.Add("Status", typeof(string));

            //string customerList = WebApp.nwobjectText("Customer");
            //string custClassList = WebApp.nwobjectText("CustomerClassification");

            //#region don't change
            //DataTable tmpDt = new DataTable();
            //tmpDt = dal.LoadSchema(customerList, custClassList);
            //#endregion

            //DataSet ds = WebApp.DataSet("conGrid");
            //DataTable dt = new DataTable();
            //try
            //{
            //    dt = ds.Tables[0];
            //}
            //catch { }

            //int rownum = 0;

            return tmpDt;
        }

        private DataTable LoadSchemaLIN()
        {
            string customerList = WebApp.nwobjectText("Customer");
            string custClassList = WebApp.nwobjectText("CustomerClassification");

            #region don't change
            DataTable tmpDtLIN = new DataTable();
            tmpDtLIN = dal.LoadSchema(customerList, custClassList);
            #endregion

            DataSet ds = WebApp.DataSet("conGrid");
            DataTable dt = ds.Tables[0];

            if (tmpDtLIN.Rows.Count > 0)
            {
                tmpDtLIN.Rows.Clear();
                foreach (DataRow dRow in dt.Rows)
                {

                    if (dRow[SPR_PAYTYPE].ToString() != string.Empty)
                    {
                        DataRow dr = tmpDtLIN.NewRow();
                        dr["Deactivate"] = dRow[SPR_PAYTYPE].ToString();
                        if (dRow[SPR_PAYTYPE].ToString() == "1")
                        {
                            dr["Deactivate"] = "true";
                        }
                        else
                            dr["Deactivate"] = "false";

                        dr["View Details"] = dRow[SPR_DATE].ToString();
                        dr["Reason for Deactivation"] = dRow[SPR_AMOUNT].ToString();
                        dr["Customer Code"] = dRow[SPR_VIEW].ToString();
                        //dr["Customer Name"] = dRow[SPR_DOWNLOAD].ToString();


                        tmpDtLIN.Rows.Add(dr);
                    }
                }
            }
            return tmpDtLIN;
        }

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
            //LoadGrid(false, InitializeGrid());
            var serverdate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
            js.makeValueText("#dateFilterFrom", "01/01/" + DateTime.Now.Year.ToString());
            js.makeValueText("#dateFilterTo", serverdate.ToString("MM/dd/yyyy"));
            //LoadGrid(false, GetDataLIN());
            //js.ADD($"$DateToday='{dal.getNoahDate()}';");
            //js.makeText("#lblAsOf", "As of: " + SFObjects.GetServerDateTime(this.UserDefinedConnectionString));
        }


        private void RefreshData(bool isInitialize)
        {
            LoadGrid(false, GetDataLIN(isInitialize));
            //LoadGrid(false, GetDataLIN());

            DataTable dt = GetDataLIN(isInitialize);

            //if (dt.Rows.Count > 0)
            //{
            //    js.ADD("EnableFieldsDone();");
            //}
            //else
            //{
            //    js.ADD("DisableFieldsEmpty();");
            //}

            js.ADD("nwLoading_End('xLoading');");

            //if (dt.Rows.Count > 0)
            //    nwToolBox.bindingNavigatorProcessItem.Enable = true;
            //else
            //    nwToolBox.bindingNavigatorProcessItem.Enable = false;

            //js.ADD("ClearFields();");
            //js.ADD("func_Toolbox_Clear();");
            //js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
            //js.ADD("RefreshData()");


        }

        //private void LoadGrid(bool isInitialize, DataTable dtSource)
        private void LoadGrid(bool isInitialize, DataTable dtSource)
        {
            //string gridID = "Grid";
            string gridID = "conGrid";
            nwGrid grid = new nwGrid(gridID);
            DataTable dt = new DataTable();
            int rowCount = 0;
            grid.Type = nwGridType.SpreadCanvas;

            try
            {
                rowCount = dtSource.Rows.Count;
            }
            catch (Exception e) { }

            if (rowCount > 0)
            {
                grid.CreateExcelGrid(dtSource.Rows.Count, dtSource.Columns.Count);
                grid.dataSource(dtSource);
                grid.maxRow(dt.Rows.Count + 1);
            }
            else
            {
                grid.CreateExcelGrid(1, SPR_VIEW + 1);
            }

            grid.nwobject(SPR_BILLDOCNO).ColumnName("Billing Docno");
            grid.nwobject(SPR_PAYTYPE).ColumnName("Payment Type");
            grid.nwobject(SPR_DATE).ColumnName("Date");
            grid.nwobject(SPR_AMOUNT).ColumnName("Amount");
            grid.nwobject(SPR_MOP).ColumnName("Mode of Payment");
            grid.nwobject(SPR_VIEW).ColumnName("View");

            //grid.dataSource(dtSource);
            grid.TableHeight(400);

            //CSS for GRID
            grid.HeaderBorderColor("#DEDEDE");
            grid.rowBackground("#FFFFFF", "#FFFFFF");
            grid.TableBorderColor("#BBB");
            grid.BodyBorderColor("#BBB");
            grid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            grid.HeaderTextColor("#131313");
            grid.HoverColor("#CAE1FF", "inherit");
            grid.SelectedRowHover("#DEDEDE");

            //column width
            grid.nwobject(SPR_BILLDOCNO).Width(100);
            grid.nwobject(SPR_PAYTYPE).Width(100);
            grid.nwobject(SPR_DATE).Width(100);
            grid.nwobject(SPR_AMOUNT).Width(100);
            grid.nwobject(SPR_MOP).Width(100);
            grid.nwobject(SPR_VIEW).Width(100);

            // align

            grid.nwobject(SPR_AMOUNT).TextAlign("Left");
            grid.nwobject(SPR_VIEW).TextAlign("center");
            grid.nwobject(SPR_VIEW).TextColor("white");
            grid.nwobject(SPR_VIEW).BackgroundColor("green");
            //grid.nwobject(SPR_DOWNLOAD).TextAlign("center");
            //grid.nwobject(SPR_DOWNLOAD).TextColor("white");
            //grid.nwobject(SPR_DOWNLOAD).BackgroundColor("green");

            //color for rows

            //template 


            //grid.nwobject(SPR_BILLDOCNO).CheckBox(true);
            //grid.nwobject(SPR_DATE).ObjectType("button");

            //grid.nwobject(SPR_DATE).Template("<button type='button' class='gridbtn btnDetails'></button>");
            //grid.nwobject(SPR_AMOUNT).Template("<input type='text' class='txtReason' maxlength='80' disabled='disabled'/>");


            //required field

            grid.SetTheme(nwGridTheme.Default);

            //Display Grid
            grid.varSpreadBook = "nwGridMainCon_Book";
            grid.varSpreadSheet = "nwGridMainCon_Sheet";
            js.ADD(grid.createTable());
            js.ADD("CreatedGridDone()"); //for view details column

            //js.makeHTML("#" + gridHTML, grid.createTable());
            //js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            //js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            //js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");

            // enable / disable grid
            //if (enable && dt.Rows.Count > 0)
            //    js.ADD("$('#" + gridHTML + "').enable(true)");
            //else
            //    js.ADD("$('#" + gridHTML + "').enable(false)");
            //js.ADD("$('#" + gridID + "').enable(" + isInitialize.ToString().ToLower() + ")");
        }

        private void ProcessData()
        {
            DataTable dt = LoadSchemaLIN();
            DataTable tmpDt = new DataTable();

            //string customerList = WebApp.nwobjectText("Customer");
            //string custClassList = WebApp.nwobjectText("CustomerClassification");

            //dt = dal.LoadSchema(customerList, custClassList);

            RecordOperationResult = ValidateDataOnProcess(ref tmpDt, dt); //nag continue

            if (RecordOperationResult.Length <= 0) //nag continue
            {
                if (tmpDt.Rows.Count > 0) //nag continue
                {
                    int numrow = tmpDt.Rows.Count;
                    RecordOperationResult = dal.ProcessData(tmpDt, based.SecurityAccess.RecUser);
                    Console.WriteLine("numrow: " + numrow);
                    if (RecordOperationResult.ToLower().IndexOf("success") >= 0) //nag continue
                    {
                        //LoadGrid(false, GetDataLIN());
                        
                        Prompt.Information("Process Completed.", based.Title);
                    }
                    else
                    {
                        if (RecordOperationResult.IndexOf("Error") != 0) //nag continue
                            Prompt.Information(RecordOperationResult, based.Title);
                        else
                            Prompt.Error(RecordOperationResult, based.Title); //nag continue
                    }
                }
            }
            else
                Prompt.Information(RecordOperationResult, based.Title); //di na umabot dito
        }

        //new

        //private DataTable InitializeGrid()
        //{
        //    DataTable dt = new DataTable();

        //    dt.Columns.Add("Billing Docno");
        //    dt.Columns.Add("Date");
        //    dt.Columns.Add("Amount");
        //    dt.Columns.Add("View");
        //    dt.Columns.Add("Download");

        //    return dt;
        //}

        private DataTable InitializeGrid()
        {
            DataTable dt = new DataTable();

            dt.Columns.Add("Billing Docno");
            dt.Columns.Add("Payment Type");
            dt.Columns.Add("Date");
            dt.Columns.Add("Amount");
            dt.Columns.Add("Mode of Payment");
            dt.Columns.Add("View");
            //dt.Columns.Add("Download");


            return dt;
        }

        private void InitializeValues()
        {
            nwToolBox.bindingNavigatorRefreshItem.Enable = true;
            //var serverdate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
                        //LoadGrid(false, GetDataLIN());
            LoadGrid(false, InitializeGrid());
        }

        private DataTable GetDataLIN(bool isInitialize)
        {
            DataTable dt = new DataTable();
            string recuser = based.SecurityAccess.RecUser;
            string PaymentType = WebApp.nwobjectText("paymentType");
            string modePayment = WebApp.nwobjectText("modePayment");
            DateTime dateFilterFrom = Parser.ParseDateTime(WebApp.nwobjectDate("dateFilterFrom"), Parser.DateTimeType.Min);
            DateTime dateFilterTo = Parser.ParseDateTime(WebApp.nwobjectDate("dateFilterTo"), Parser.DateTimeType.Min);

            string fromDate = isInitialize == false ? dateFilterFrom.ToString("MM/dd/yyyy") : "01/01/" + DateTime.Now.Year.ToString();
            string toDate = isInitialize == false ? dateFilterTo.ToString("MM/dd/yyyy") : DateTime.Now.ToString("MM/dd/yyyy");

            dt = dal.getDetails(fromDate, toDate, "", "", recuser);

            if (PaymentType != "")
            {
                try
                {
                    dt = dt.Select("[Payment Type] = '" + PaymentType + "'").CopyToDataTable();
                }
                catch (Exception e)
                {
                    dt.Clear();
                }
            }

            if (modePayment != "")
            {
                try
                {
                    dt = dt.Select("[Mode of Payment] = '" + modePayment + "'").CopyToDataTable();
                }
                catch (Exception e)
                {
                    dt.Clear();
                }
            }

            return dt;
        }


    }
}