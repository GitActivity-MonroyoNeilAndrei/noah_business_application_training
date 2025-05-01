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
    public class APBIRFormsAuthorizedSignatoryReportBL : nwAction
    {
        static int SPR_STARTINDEX = 0,
                  SPR_LOCATION = ++SPR_STARTINDEX,
                  SPR_BIRFORMSAUTHSIGN = ++SPR_STARTINDEX,
                  SPR_EFFECTIVEDATE = ++SPR_STARTINDEX,
                  SPR_DESIGNATION = ++SPR_STARTINDEX,
                  SPR_TAXIDENTIFICATIONNO = ++SPR_STARTINDEX,
                  SPR_BIRFORMCODE = ++SPR_STARTINDEX,
                  SPR_BIRFORMNAME = ++SPR_STARTINDEX;


        const int SPR_EndOfHdrRow = 7;

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
            dal = new APBIRFormsAuthorizedSignatoryReportDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        APBIRFormsAuthorizedSignatoryReportDAL dal;
        int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();


        public APBIRFormsAuthorizedSignatoryReportBL()
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

            DateTime dateFilterFrom = Parser.ParseDateTime(WebApp.nwobjectDate("dateFilterFrom"), Parser.DateTimeType.Min);
            DateTime dateFilterTo = Parser.ParseDateTime(WebApp.nwobjectDate("dateFilterTo"), Parser.DateTimeType.Min);


            string Location = WebApp.nwobjectText("Location");

            string SignatoryList = WebApp.nwobjectText("Signatory");
            string DesignationList = WebApp.nwobjectText("Designation");


            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.INQUIREQUERY(based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getLocation":
                    strSQL = dal.getAddToList(20, dateFilterFrom.ToString("MM/dd/yyyy"), dateFilterTo.ToString("MM/dd/yyyy"), Location, SignatoryList, DesignationList, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getSignatory":
                    strSQL = dal.getAddToList(21, dateFilterFrom.ToString("MM/dd/yyyy"), dateFilterTo.ToString("MM/dd/yyyy"), Location, SignatoryList, DesignationList, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getDesignation":
                    strSQL = dal.getAddToList(22, dateFilterFrom.ToString("MM/dd/yyyy"), dateFilterTo.ToString("MM/dd/yyyy"), Location, SignatoryList, DesignationList, based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

            }

            return strFinal;
        }

        ///// Standard RecordOperation 

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string result = "", tempstr = "";
            DataTable dt = new DataTable();

            switch (i)
            {
                case eRecordOperation.AddNew:
                    nwToolBox.bindingNavigatorAddNewItem.Enable = true;
                    nwToolBox.bindingNavigatorSaveItem.Enable = true;
                    nwToolBox.bindingNavigatorPrintItem.Enable =
                    nwToolBox.bindingNavigatorInquireItem.Enable =
                    nwToolBox.bindingNavigatorImportItem.Visible =
                    nwToolBox.bindingNavigatorDeleteItem.Enable =
                    nwToolBox.bindingNavigatorDeleteItem.Visible =
                    nwToolBox.bindingNavigatorExportItem.Enable = true;

                    loadDeafultHeader();
                    LoadComboBox();
                    loaddefault();
                    GenerateGrid(true);

                    break;

                case eRecordOperation.Save:
                    RecordOperationResult = AreValidEntries();

                    if (RecordOperationResult == "")
                    {
                        //DataTable dtHDR = LoadSchema();
                        //RecordOperationResult = dal.SaveData(dtHDR, isNewRow);
                    }
                    break;

                case eRecordOperation.Delete:
                    //RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("txtDocno"), based.SecurityAccess.RecUser);
                    break;

                case eRecordOperation.Process:
                    //GenerateGridProcess(true, "LoadDetails");
                    break;
                case eRecordOperation.Refresh:
                    nwAction.nwToolBox.bindingNavigatorExportItem.Enable = true;
                    RefreshData();
                    js.ADD("nwLoading_End('xRefreshBtn');");
                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    break;
                case eRecordOperation.Import:
                    break;
                case eRecordOperation.Export:
                    break;
                case eRecordOperation.Print:
                    break;
                case eRecordOperation.Closing:
                    break;
                case eRecordOperation.Search:
                    break;
            }

            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.IndexOf("Error") == 0 || RecordOperationResult.Contains("Cannot"))
                {
                    Prompt.Error(RecordOperationResult, based.Title);
                }
                else
                {
                    RefreshData();
                    js.ADD("loc_LookupInquireWithValue('" + dal.docno + "') ");
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    Prompt.Information(RecordOperationResult, based.Title);

                }
            }


            //return result;
        }

        private void LoadComboBox()
        {
            js.makeComboBox("#cboAnnual", dal.GetYearList());

            DateTime CurrentDate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
            string date = dal.getServerDate();
            string year = Parser.ParseString(Parser.ParseDateTime(dal.getServerDate(), Parser.DateTimeType.Min).Year);
            string month = Parser.ParseString(Parser.ParseDateTime(dal.getServerDate(), Parser.DateTimeType.Min).Month);
            js.ADD($"CurrentDate='{date}';");
            js.ADD($"currentYear='{year}';");

            js.makeValueText("#txtAnually", CurrentDate.ToString("yyyy"));
            js.ADD($"$('select#cmbMonth').val({CurrentDate.Month})");
            js.ADD("setToCurrentDate();");

            //if (dal.chkRptAccAssgn(based.SecurityAccess.RecUser) != "1")
            //    js.makeProp("#rbACCA", "disabled", "true");

            string lblcc = dal.chkLabelCC();
            if (lblcc != "")
            {
                js.ADD($"lblCC = '{lblcc}'");
                js.makeHTML("#lblCC", "Per " + lblcc + " Access");
            }

        }



        private void loaddefault()
        {
            js.ADD("$('div.spantext').remove()");
            // js add the recuser to console log
            js.ADD($"console.log('RecUser: {based.SecurityAccess.RecUser}')");
            DataTable dtLoc = dal.getDefloc(based.SecurityAccess.RecUser);
            if (dtLoc.Rows.Count > 0)
                js.ADD($"defaultonload('{dtLoc.Rows[0][0].ToString()}','{dtLoc.Rows[0][1].ToString()}')");
        }

        private void loadDeafultHeader()
        {
            DateTime serverdate = SFObjects.GetServerDateTime(this.UserDefinedConnectionString).Date;
            string year = Parser.ParseString(SFObject.GetServerDateTime(UserDefinedConnectionString).Year);
            js.ADD($"CurrentDate='{serverdate}';");
            js.ADD($"currentYear='{year}';");
            js.makeValueText("#dtpFrom", serverdate.ToString("MM/dd/yyyy"));
            js.makeValueText("#dtpTo", serverdate.ToString("MM/dd/yyyy"));
            js.makeValueText("#txtAnually", serverdate.ToString("yyyy"));
            js.ADD($"$('select#cmbMonth').val({serverdate.Month})");
            js.ADD("cuz_new()");
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
                    js.ADD("nwLoading_End('xactBindCollection')");
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
                    standardBL.PrimaryKey = "Docno";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(based.SecurityAccess.RecUser), this.UserDefinedConnectionString);
                    break;
            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RECUSER");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RECDATE");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "MODUSER");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "MODDATE");
        }

        //////////////// end of standard / standard custumize

        private void BindCollection()
        {
            GenerateGrid(false);
        }

        private string AreValidEntries()
        {
            string errorResult = String.Empty;

            return errorResult;
        }

      
        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
            loaddefault();
            LoadComboBox(); //get annual
            GenerateGrid(true);
        }

        private void RefreshData()
        {
            GenerateGrid(false);
        }
        

        public void GenerateGrid(bool load)
        {
            string gridID = "nwGridCon";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();

            DateTime dateFilterFrom = Parser.ParseDateTime(WebApp.nwobjectDate("dateFilterFrom"), Parser.DateTimeType.Min);
            DateTime dateFilterTo = Parser.ParseDateTime(WebApp.nwobjectDate("dateFilterTo"), Parser.DateTimeType.Min);


            string Location = WebApp.nwobjectText("Location");
            string SignatoryList = WebApp.nwobjectText("Signatory");
            string DesignationList = WebApp.nwobjectText("Designation");

            dt = dal.GetReportData(dateFilterFrom.ToString("MM/dd/yyyy"), dateFilterTo.ToString("MM/dd/yyyy"), load, Location, SignatoryList, DesignationList, based.SecurityAccess.RecUser);

            ListingAndPrint frmlist = new ListingAndPrint(ListingAndPrint.FormType.NOAH_Standard1, 10, dt, "", UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName, "");

            frmlist.SetSpreadType(nwGridType.SpreadCanvas);

            frmlist.MenuItemName = based.Title;
            frmlist.m_Spread.buttonSearchFind = true;

            frmlist.SetSpreadType(nwGridType.SpreadCanvas);

            frmlist.m_Spread.SetText(1, 5, "LOCATION NAME: ");

            if (load)
            {
                frmlist.LOCATION_NAME = "All Locations";
            }
            else
            {
                frmlist.LOCATION_NAME = WebApp.nwobjectText("LocationFilter");
            }
            
            string DateGridHeader = dateFilterFrom.ToShortDateString();
            if (DateGridHeader == "1/1/1900")
            {
                DateGridHeader = dal.getServerDate();
            }
            else
            {
                DateGridHeader = dal.getServerDate();
            }


            frmlist.DATE_PARAMETER = WebApp.nwobjectText("DateGridHeader");

            frmlist.m_Spread.Rows(0).FontWeight("Bold");
            frmlist.m_Spread.Rows(1).FontWeight("Bold");
            frmlist.m_Spread.Rows(2).FontWeight("Bold");
            frmlist.m_Spread.Rows(3).FontWeight("Bold");
            frmlist.m_Spread.Rows(4).FontWeight("Bold");
            frmlist.m_Spread.Rows(5).FontWeight("Bold");
            frmlist.m_Spread.Rows(6).FontWeight("Bold");
            frmlist.m_Spread.Rows(7).FontWeight("Bold");
            frmlist.m_Spread.Rows(8).FontWeight("Bold");


            frmlist.m_Spread.nwobject(SPR_LOCATION - 1).Width(200);


            // frmlist.m_Spread.nwobject(SPR_QTY - 1).TextAlign("right");
            // frmlist.m_Spread.nwobject(SPR_UNITCOSTVATIN - 1).TextAlign("right");
            // frmlist.m_Spread.nwobject(SPR_UNITCOSTVATEX - 1).TextAlign("right");
            // frmlist.m_Spread.nwobject(SPR_OCYAMOUNTVATIN - 1).TextAlign("right");
            // frmlist.m_Spread.nwobject(SPR_OCYAMOUNTVATEX - 1).TextAlign("right");
            // frmlist.m_Spread.nwobject(SPR_VAT - 1).TextAlign("right");

            frmlist.m_Spread.PagerPerPage(100);
            frmlist.m_Spread.ExportFileName = based.Title;

            frmlist.m_Spread.buttonSearchFind = true;
            frmlist.m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);
            frmlist.m_Spread.buttonResetColumn = true;
            frmlist.m_Spread.buttonSaveColumn = true;

            //NEWCODE
            frmlist.m_Spread.buttonExport = true;
            frmlist.m_Spread.buttonExportHide = true;
            frmlist.m_Spread.GetSaveSort(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser); // this line will be default and suggested line code if there are many grid in one menu item  change -1 to -2 and so on...
            frmlist.m_Spread.buttonSortColumn = true;  // show Sort Menu

            //## THEME FORMAT
            frmlist.m_Spread.HeaderBorderColor("#DEDEDE");
            frmlist.m_Spread.rowBackground("#FFFFFF", "#FFFFFF");
            frmlist.m_Spread.TableBorderColor("#BBB");
            frmlist.m_Spread.BodyBorderColor("#BBB");
            frmlist.m_Spread.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            frmlist.m_Spread.HeaderTextColor("#131313");
            frmlist.m_Spread.HoverColor("#DEDEDE", "inherit");
            frmlist.m_Spread.SelectedRowHover("#DEDEDE");
            frmlist.m_Spread.SelectedRowHoverColor("inherit");


            // Added for new Spread
            frmlist.varSpreadBook = "nwGridMainCon_Book";
            frmlist.varSpreadSheet = "nwGridMainCon_Sheet";

            // Updated for new Spread
            js.ADD(frmlist.CreateScript("nwGridMainCon", "nwGridMainCon"));

        }

    }
}