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
using System.Text.RegularExpressions;
using System.Data.SqlClient;
using System.Text;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace Noah_Web.forms_BusinessLayer
{
    public class SBDeactivatedClientRegSummRptBL : nwAction
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
            dal = new SBDeactivatedClientRegSummRptDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        SBDeactivatedClientRegSummRptDAL dal;

        private static int StartIndex = 0,
            SPR_CustomerCode = StartIndex,
            SPR_CustomerName = ++StartIndex,
            SPR_CustClass = ++StartIndex,
            SPR_DateCreated = ++StartIndex,
            SPR_CreatedBy = ++StartIndex,
            SPR_DeactivationDate = ++StartIndex,
            SPR_DeactivatedBy = ++StartIndex,
            SPR_RsnForDeactivation = ++StartIndex;

        private string xfile = string.Empty;
        public SBDeactivatedClientRegSummRptBL()
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
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                    break;
                case "getCustomer":
                    strSQL = dal.InquireCustomer(WebApp.nwobjectText("CustomerClassification"), getDate().Item1, getDate().Item2);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getCustomerClassification":
                    strSQL = dal.InquireCustomerClassification(WebApp.nwobjectText("Customer"), getDate().Item1, getDate().Item2);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
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
                    LoadComboBox();
                    break;

                case eRecordOperation.Save:
                    tempstr = "Save";
                    break;

                case eRecordOperation.Delete:
                    tempstr = "Delete";
                    Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Process:
                    tempstr = "Process";
                    Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Refresh:
                    //InitializeValues();
                    RecordOperationResult = ValidateData();

                    if (RecordOperationResult.Length <= 0)
                    {
                        RefreshData();
                    }
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
                    string customerList = WebApp.nwobjectText("Customer");
                    string custClassList = WebApp.nwobjectText("CustomerClassification");
                    string startdate = getDate().Item1;
                    string enddate = getDate().Item2;

                    DataTable dtExport = dal.GetDataLIN(customerList.Replace("'", ""),
                                                  custClassList.Replace("'", ""),
                                                  startdate,
                                                  enddate);

                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, dal.LISTINGSTARTROW, dtExport, dal.LISTINGFILENAME + " Listing", UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                           based.SecurityAccess.RecUserName, dal.LISTINGFILENAME + " Listing");
                    frmlist.m_Spread.PagerPerPage(50);

                    //## FOR EXPORTING ###
                    Random rnd = new Random();
                    string SessionID = DateTime.Now.ToString("yyyyddMMhhmmss") + rnd.Next(0, 9999).ToString().PadRight(4, '0');
                    HttpContext.Current.Session["Config_" + SessionID] = frmlist.m_Spread.ExportConfig();
                    HttpContext.Current.Session["Data_" + SessionID] = frmlist.m_Spread.GetDataSource();
                    HttpContext.Current.Session["Filename_" + SessionID] = dal.LISTINGFILENAME + " Listing";
                    HttpContext.Current.Session["Header_" + SessionID] = "0";
                    js.ADD("ExportSessionID='" + SessionID + "'");
                    //## END ##

                    //frmlist.m_Spread.nwobject(4).TextAlign("right");

                    js.Show("#nwExportContainerMain", 0);
                    js.ADD(frmlist.CreateScript());
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
                    //Prompt.Information(tempstr, based.Title);
                    break;
            }

            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                {
                    js.ADD("loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtCode") + "') ");
                    RefreshData();
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
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

        public string get_Initialize()
        {
            string strFinal = "";

            SetBindings();
            Main_Load();

            #region P8Designation
            DataTable P8Designation = new DataTable();
            js.nwTempTable_OverWrite("P8Designation", P8Designation);
            #endregion

            js.ADD($"$DateToday='{dal.getNoahDate()}'; LoadDatePicker();");
            js.ADD($"LoadDefaults();");

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

        private string ValidateData()
        {
            string errorResult = string.Empty;

            return errorResult;
        }

        private void SetBindings()
        {
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

        private void InitializeValues()
        {
            nwToolBox.bindingNavigatorRefreshItem.Enable = true;
            nwToolBox.bindingNavigatorPrintItem.Enable = false;
            //nwToolBox.bindingNavigatorPrintItem.Enable = false;
            GenerateReport(false, InitializeGrid());
        }

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
            LoadComboBox();
            GenerateReport(false, InitializeGrid());
        }

        private void RefreshData()
        {
            GenerateReport(true, GetDataLIN());
            DataTable dt = GetDataLIN();

            if (dt.Rows.Count > 0)
            {
                js.ADD("EnableFieldsDone();");
            }
            else
            {
                js.ADD("DisableFieldsEmpty();");
            }
        }

        private void setSortByColumns(DataTable dt)
        {
            DataTable dtcolumn = new DataTable();
            dtcolumn.Columns.Add("Columns");
            foreach (DataColumn dc in dt.Columns)
            {
                DataRow dr = dtcolumn.NewRow();
                if (dc.ToString() != "Select")
                {
                    dr[0] = dc.ToString();
                    dtcolumn.Rows.Add(dr);
                }
            }

            js.makeHTML("#dbSortByCol", nwObject.make_OptionLookup(@"", this.based.SecurityAccess.ConnectionString, dtcolumn));
        }

        private void GenerateReport(bool enable, DataTable dtSource)
        {
            //string gridID = "reportGrid"; // id
            string gridCon = "conGrid"; //container
            nwGrid nwspread = new nwGrid(gridCon);
            nwspread.Type = nwGridType.SpreadCanvas;
            nwspread.varSpreadBook = "nwGridMainCon_Book";
            nwspread.varSpreadSheet = "nwGridMainCon_Sheet";

            setSortByColumns(dtSource);

            //if (dtSource.Rows.Count <= 0)
            //{
            //    while (dtSource.Rows.Count < 10)
            //    {
            //        dtSource.Rows.Add();
            //    }
            //    nwspread.dataSource(dtSource);
            //}
            //else
            //{
            //    dtSource.Rows.Add();
            //}

            nwspread.dataSource(dtSource);

            //nwspread buttons
            //nwspread.buttonSaveColumn = true;
            //nwspread.buttonResetColumn = true;
            //nwspread.buttonSearchFind = true;

            nwspread.minRow(10);
            nwspread.RowHeight(25);
            nwspread.TableHeight(250);

            //pager 
            nwspread.PagerDataEditable(true);
            nwspread.PagerPerPage(30);


            //column width
            nwspread.nwobject(SPR_CustomerCode).Width(150);
            nwspread.nwobject(SPR_CustomerName).Width(240);
            nwspread.nwobject(SPR_CustClass).Width(100);
            nwspread.nwobject(SPR_DateCreated).Width(170);
            nwspread.nwobject(SPR_CreatedBy).Width(150);
            nwspread.nwobject(SPR_DeactivationDate).Width(170);
            nwspread.nwobject(SPR_DeactivatedBy).Width(150);
            nwspread.nwobject(SPR_RsnForDeactivation).Width(150);

            //color for rows
            for (int i = SPR_CustomerCode; i < dtSource.Columns.Count; i++)
            {
                nwspread.nwobject(i).BackgroundColor("Gainsboro");
            }

            // for saving column width
            nwspread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-" + gridCon, based.SecurityAccess.RecUser);

            //template 

            //align

            //required field

            //CSS for nwspread
            nwspread.HeaderBorderColor("#DEDEDE");
            nwspread.rowBackground("#FFFFFF", "#FFFFFF");
            nwspread.TableBorderColor("#BBB");
            nwspread.BodyBorderColor("#BBB");
            nwspread.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwspread.HeaderTextColor("#131313");
            nwspread.HoverColor("#CAE1FF", "inherit");
            nwspread.SelectedRowHover("#CAE1FF");

            //Display nwspread
            js.ADD(nwspread.createTable());
            //js.makeHTML("#" + gridCon, nwspread.createTable());
            //js.ADD("nwGrid_TableAdjust(\"" + gridCon + "\")");
            //js.ADD("nwGrid_makeResize(\"" + gridCon + "\")");
            //js.ADD("nwGrid_TableFreeze(\"" + gridCon + "\",0,0)");

            // customize button

            // enable / disable nwspread
            js.ADD("$('#" + gridCon + "').enable(" + enable.ToString().ToLower() + ")");

        }

        private DataTable InitializeGrid()
        {
            DataTable dt = new DataTable();

            dt.Columns.Add("Customer Code");
            dt.Columns.Add("Customer");
            dt.Columns.Add("Customer Classification");
            dt.Columns.Add("Date Created");
            dt.Columns.Add("Created By");
            dt.Columns.Add("Deactivation Date");
            dt.Columns.Add("Deactivated By");
            dt.Columns.Add("Reason for Deactivation");

            dt.Rows.Add();

            return dt;
        }

        private DataTable GetDataLIN()
        {
            string query = string.Empty;
            string customerList = WebApp.nwobjectText("Customer");
            string custClassList = WebApp.nwobjectText("CustomerClassification");
            //string sortby = "[" + WebApp.nwobjectText("dbSortByCol") + "] " + WebApp.nwobjectText("dpSortByType");

            string startdate = getDate().Item1;
            string enddate = getDate().Item2;

            DataTable dt = dal.GetDataLIN(customerList.Replace("'", ""),
                                          custClassList.Replace("'", ""),
                                          startdate,
                                          enddate);

            //IEnumerable<DataRow> datarow = Enumerable.Empty<DataRow>();

            //if (dt.Rows.Count > 0)
            //{
            //    if (WebApp.nwobjectText("dpSortByType") == "ASC")
            //        datarow = dt.AsEnumerable().OrderBy(x => x[WebApp.nwobjectText("dbSortByCol")]);
            //    else
            //        datarow = dt.AsEnumerable().OrderByDescending(x => x[WebApp.nwobjectText("dbSortByCol")]);

            //    dt = datarow.CopyToDataTable<DataRow>();
            //}
            return dt;
        }

        private void LoadComboBox()
        {
            js.makeComboBox("#dpAnnually", dal.GetYearList());
        }

        private Tuple<string, string> getDate()
        {
            string startdate = string.Empty;
            string enddate = string.Empty;
            string annually = WebApp.nwobjectText("dpAnnually");
            string quarterly = WebApp.nwobjectText("dpQuarterly");
            string monthly = WebApp.nwobjectText("dpMonthly");
            string radio = WebApp.nwobjectText("dateFilterSel");

            if (radio == "annually")
            {
                startdate = new DateTime(Parser.ParseInt(annually), 1, 1).ToString();
                enddate = new DateTime(Parser.ParseInt(annually), 12, 31).ToString();
            }
            else if (radio == "quarterly")
            {
                DateTime datetime = DateTime.Now;
                int currQuarter = Parser.ParseInt(quarterly) + 1;
                startdate = new DateTime(datetime.Year, 3 * currQuarter - 2, 1).ToString();
                if (currQuarter == 4) //Last quarter
                    enddate = new DateTime(datetime.Year, 12, 31).ToString();
                else
                    enddate = new DateTime(datetime.Year, 3 * currQuarter + 1, 1).AddDays(-1).ToString();
            }
            else if (radio == "monthly")
            {
                startdate = new DateTime(Convert.ToDateTime(monthly).Year, Convert.ToDateTime(monthly).Month, 1).ToString();
                enddate = new DateTime(Convert.ToDateTime(monthly).Year, Convert.ToDateTime(monthly).Month, DateTime.DaysInMonth(Convert.ToDateTime(monthly).Year, Convert.ToDateTime(monthly).Month)).ToString();
            }
            else
            {
                startdate = WebApp.nwobjectText("txtFrom");
                enddate = WebApp.nwobjectText("txtTo");
            }
            return Tuple.Create(startdate, enddate);
        }
    }
}