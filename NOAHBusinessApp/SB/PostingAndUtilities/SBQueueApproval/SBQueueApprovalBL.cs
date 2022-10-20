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
    public class SBQueueApprovalBL : nwAction
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
            dal = new SBQueueApprovalDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        SBQueueApprovalDAL dal;

        private static int StartIndex = 0,
            SPR_CheckBox = StartIndex,
            SPR_ID = ++StartIndex,
            SPR_SellerCode = ++StartIndex,
            SPR_SellerName = ++StartIndex,
            SPR_CustomerCode = ++StartIndex,
            SPR_CustomerName = ++StartIndex,
            SPR_UnitCode = ++StartIndex,
            SPR_UnitDesc = ++StartIndex,
            SPR_QueueNumber = ++StartIndex;

        private string xfile = string.Empty;
        public SBQueueApprovalBL()
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
                    tempstr = "Save";
                    break;

                case eRecordOperation.Delete:
                    tempstr = "Delete";
                    Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Process:
                    tempstr = "Process";
                    ProcessData();
                    break;

                case eRecordOperation.Refresh:
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
            GenerateReport(false, InitializeGrid());
        }

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
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
            string gridCon = "conGrid";
            nwGrid nwspread = new nwGrid(gridCon);
            nwspread.Type = nwGridType.SpreadCanvas;
            nwspread.varSpreadBook = "nwGridMainCon_Book";
            nwspread.varSpreadSheet = "nwGridMainCon_Sheet";

            //setSortByColumns(dtSource);

            //if (dtSource.Rows.Count < 5)
            //{
            //    while (dtSource.Rows.Count < 5)
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

            //pager 
            nwspread.PagerDataEditable(true);
            nwspread.PagerPerPage(30);


            //column width
            nwspread.nwobject(SPR_CheckBox).Width(50);
            nwspread.nwobject(SPR_ID).Width(0);
            nwspread.nwobject(SPR_SellerCode).Width(0);
            nwspread.nwobject(SPR_SellerName).Width(150);
            nwspread.nwobject(SPR_CustomerCode).Width(0);
            nwspread.nwobject(SPR_CustomerName).Width(150);
            nwspread.nwobject(SPR_UnitCode).Width(0);
            nwspread.nwobject(SPR_UnitDesc).Width(150);
            nwspread.nwobject(SPR_QueueNumber).Width(150);

            //color for rows
            for (int i = SPR_CheckBox; i < dtSource.Columns.Count; i++)
            {
                nwspread.nwobject(i).BackgroundColor("Gainsboro");
            }

            // for saving column width
            nwspread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-" + gridCon, based.SecurityAccess.RecUser);

            //template 
            nwspread.nwobject(SPR_CheckBox).ObjectType("checkbox");
            nwspread.nwobject(SPR_CheckBox).Enabled(enable);

            //align
            nwspread.nwobject(SPR_CheckBox).TextAlign("center");

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

            // customize button

            // enable / disable nwspread
            js.ADD("$('#" + gridCon + "').enable(" + enable.ToString().ToLower() + ")");

        }

        private DataTable InitializeGrid()
        {
            DataTable dt = new DataTable();

            dt.Columns.Add(" ");
            dt.Columns.Add("ID");
            dt.Columns.Add("Seller Code");
            dt.Columns.Add("Seller Name");
            dt.Columns.Add("Customer Code");
            dt.Columns.Add("Customer Name");
            dt.Columns.Add("Unit Code");
            dt.Columns.Add("Unit");
            dt.Columns.Add("Queue Number");

            dt.Rows.Add();

            return dt;
        }

        private DataTable GetDataLIN()
        {
            DataTable dt = dal.GetDataLIN(based.SecurityAccess.RecUser);

            return dt;
        }

        private DataTable LoadSchemaLIN()
        {
            #region don't change
            DataTable tmpDtLIN = new DataTable();
            tmpDtLIN = dal.LoadSchema(based.SecurityAccess.RecUser);
            #endregion

            DataSet ds = WebApp.DataSet("conGrid");
            DataTable dt = ds.Tables[0];

            if (tmpDtLIN.Rows.Count == 0)
            {
                tmpDtLIN.Rows.Clear();
                foreach (DataRow dRow in dt.Rows)
                {

                    if (dRow[SPR_CheckBox].ToString() != string.Empty)
                    {
                        DataRow dr = tmpDtLIN.NewRow();
                        dr["Status"] = dRow[SPR_CheckBox];

                        dr["TransactionNo"] = dRow[SPR_ID].ToString();
                        dr["Seller Name"] = dRow[SPR_SellerCode].ToString();
                        dr["Customer Name"] = dRow[SPR_CustomerCode].ToString();
                        dr["Unit"] = dRow[SPR_UnitCode].ToString();
                        dr["Queue Number"] = dRow[SPR_QueueNumber].ToString();

                        tmpDtLIN.Rows.Add(dr);
                    }
                }
            }
            return tmpDtLIN;
        }

        private void ProcessData()
        {
            DataTable dt = WebApp.nwGridDataWithID("conGrid");
            DataTable tmpDt = new DataTable();

            RecordOperationResult = ValidateDataOnProcess(ref tmpDt, dt);

            if (RecordOperationResult.Length <= 0)
            {

                if (tmpDt.Rows.Count > 0)
                {
                    RecordOperationResult = dal.ProcessData(tmpDt, based.SecurityAccess.RecUser);

                    if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                    {
                        GenerateReport(true, GetDataLIN());
                        Prompt.Information("Process has successfully completed.", based.Title);
                    }
                    else
                    {
                        if (RecordOperationResult.IndexOf("Error") != 0 || RecordOperationResult.IndexOf("Cannot be continued") != 0)
                        {
                            Prompt.Information(RecordOperationResult, based.Title);
                        }
                        else
                        {
                            Prompt.Error(RecordOperationResult, based.Title);
                        }
                    }
                }
            }
            else
            {
                Prompt.Information(RecordOperationResult, based.Title);
            }
        }

        private string ValidateDataOnProcess(ref DataTable tmpDt, DataTable apprvlDt)
        {
            string errorresult = String.Empty;
            string finalApprover = string.Empty;

            tmpDt = LoadSchemaLIN();

            if (tmpDt.Rows.Count <= 0)
            {
                errorresult += "Cannot be continued. No document has been selected.";
            }
                
            return errorresult;
        }
    }
}