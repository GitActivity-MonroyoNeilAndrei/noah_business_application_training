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
    public class BasicInformationBL : nwAction
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
            dal = new BasicInformationDAL(this.UserDefinedConnectionString, this.based.SecurityAccess.ConnectionString, "");
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
        BasicInformationDAL dal;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();
        private static int StartIndex = 0,
            SPR_AddOnUnit = StartIndex,
            SPR_AddOnUnitDesc = ++StartIndex,
            SPR_InventType = ++StartIndex;

        public BasicInformationBL()
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
                    string filt0 = WebApp.nwobjectText("idvallugSeller");
                    strSQL = dal.inquireQuery(filt0); ;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

            }

            return strFinal;
        }

        private void InitializeValues()
        {
            nwToolBox.bindingNavigatorSaveItem.Enable =
            nwToolBox.bindingNavigatorAddNewItem.Enable =
            nwToolBox.bindingNavigatorPrintItem.Enable =
            nwToolBox.bindingNavigatorInquireItem.Enable =
            nwToolBox.bindingNavigatorDeleteItem.Enable =
            nwToolBox.bindingNavigatorDeleteItem.Visible =
            nwToolBox.bindingNavigatorExportItem.Enable =
            nwToolBox.bindingNavigatorImportItem.Enable =
            nwToolBox.bindingNavigatorProcessItem.Enable = false;
            GenerateReport(true, InitializeGrid());
            LoadComboBox();
            DataTable dr2 = dal.GetUserName("O0000000003"/*based.SecurityAccess.RecUser*/);
            js.makeValueText("#txtCustName", dr2.Rows[0]["Registered Name"] + "");
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
                    break;
                case eRecordOperation.Save:
                    break;

                case eRecordOperation.Delete:
                    break;

                case eRecordOperation.Process:
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

                case "actGetDataDetails":
                    GetDataDetails();
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
            //Header

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
        }

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
            GenerateReport(true, InitializeGrid());
            LoadComboBox();
            string AccountNo = WebApp.nwobjectText("dpAccNo");
            DataTable dr1 = dal.GetContact("O0000000003"/*based.SecurityAccess.RecUser*/);
            js.makeValueText("#txtMobileNo", dr1.Rows[0]["Mobile Number"] + "");
            js.makeValueText("#txtEmailAdd", dr1.Rows[0]["Email Address"] + "");
            js.makeValueText("#txtPhoneNo", dr1.Rows[0]["Phone Number"] + "");
            DataTable dr2 = dal.GetUserName("O0000000003"/*based.SecurityAccess.RecUser*/);
            js.makeValueText("#txtCustName", dr2.Rows[0]["Registered Name"] + "");
        }

        private void RefreshData()
        {
            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
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
            string gridCon = "AddOnUnitConGrid"; //container
            nwGrid nwspread = new nwGrid(gridCon);
            nwspread.Type = nwGridType.SpreadCanvas;
            nwspread.varSpreadBook = "nwGridMainCon_Book";
            nwspread.varSpreadSheet = "nwGridMainCon_Sheet";

            setSortByColumns(dtSource);

            if (dtSource.Rows.Count < 4)
            {
                while (dtSource.Rows.Count < 4)
                {
                    dtSource.Rows.Add();
                }
            }
            else
            {
                dtSource.Rows.Add();
            }

            nwspread.dataSource(dtSource);

            //pager 
            nwspread.PagerDataEditable(true);
            nwspread.PagerPerPage(30);


            //column width
            nwspread.nwobject(SPR_AddOnUnit).Width(300);
            nwspread.nwobject(SPR_AddOnUnitDesc).Width(300);
            nwspread.nwobject(SPR_InventType).Width(300);

            //color for rows
            for (int i = SPR_AddOnUnit; i < dtSource.Columns.Count; i++)
            {
                nwspread.nwobject(i).BackgroundColor("Gainsboro");
            }

            // for saving column width
            nwspread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-" + gridCon, "O0000000003"/*based.SecurityAccess.RecUser*/);

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

            dt.Columns.Add("Add on Unit Code");
            dt.Columns.Add("Add on Unit Description");
            dt.Columns.Add("Add on Inventory Type");

            return dt;
        }

        private DataTable GetDataLIN()
        {
            string query = string.Empty;
            string AccountNo = WebApp.nwobjectText("dpAccNo");

            DataTable dt = dal.GetDataLIN("O0000000003"/*based.SecurityAccess.RecUser*/, AccountNo);

            return dt;
        }

        private void LoadComboBox()
        {
            js.makeComboBox("#dpAccNo", dal.ComboBox("O0000000003"/*based.SecurityAccess.RecUser*/));
        }

        private void GetDataDetails()
        {
            string AccountNo = WebApp.nwobjectText("dpAccNo");
            if(AccountNo == "")
            {
                js.makeValueText("#txtAccStats", "" + "");
                js.makeValueText("#txtBaseUnit", "" + "");
                js.makeValueText("#txtBaseUnitDesc", "" + "");
                js.makeValueText("#txtInventType", "" + "");
                GenerateReport(true, InitializeGrid());
            }
            else
            {
                DataTable dt = dal.GetDetails("O0000000003"/*based.SecurityAccess.RecUser*/, AccountNo);
                js.makeValueText("#txtAccStats", dt.Rows[0]["status"] + "");
                js.makeValueText("#txtBaseUnit", dt.Rows[0]["Base Unit Code"] + "");
                js.makeValueText("#txtBaseUnitDesc", dt.Rows[0]["Base Unit Description"] + "");
                js.makeValueText("#txtInventType", dt.Rows[0]["Inventory Type"] + "");
                GenerateReport(true, GetDataLIN());
            }
        }
    }
}