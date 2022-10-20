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
    public class SACompanyBL : nwAction
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

        enum User
        {
            SPR_DELETE = 1,
            SPR_USERCODE,
            SPR_USERDESC
        }

        enum DesktopMod
        {
            SPR_DELETE = 1,
            SPR_MODULECODE,
            SPR_MODULEDESC,
            SPR_WEBMODULECODE,
            SPR_WEBMODULEDESC
        }

        enum WebMod
        {
            SPR_DELETE = 1,
            SPR_MODULECODE,
            SPR_MODULEDESC
        }


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
            dal = new SACompanyDAL(this.UserDefinedConnectionString, "");
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
        SACompanyDAL dal;
        int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();       
                       

        public SACompanyBL()
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
            string Company = WebApp.nwobjectText("Company");

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.GetInquire();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                    
                case "getcbo":
                    emptyDT = dal.combobox();
                    strFinal = nwObject.make_OptionLookup(strSQL, strConn, emptyDT);
                    strSQL = js.makeHTML("#Custom", strFinal);
                    strFinal = strSQL;
                    break;

                case "getlugCode":
                    strSQL = dal.GetlugCode();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


                case "getlug_grid1":
                    strSQL = dal.GetlugGrid1();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlug_grid2":
                    strSQL = dal.GetlugGrid2();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getaddmodule":
                    strSQL = dal.GetAddModule(WebApp.nwobjectText("inCode"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getaddmoduleweb":
                    strSQL = dal.GetAddModuleWeb(WebApp.nwobjectText("Modulefilter"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getadduser":

                    strSQL = dal.GetAddUser(WebApp.nwobjectText("filter"));

                    try
                    {
                        DataTable dtfilter = new DataTable();
                        dtfilter = WebApp.nwGridDataWithID("nwGrid1");
                        dtfilter.Columns.RemoveAt(0);
                        nwObject.SetUniqueData = dtfilter;
                        nwObject.SetUniqueHideData = true;
                    }
                    catch { }

                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getcopymodule":
                    strSQL = dal.GetCopyModule(WebApp.nwobjectText("inCode"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getcopyuserweb":
                    strSQL = dal.GetCopyUserWeb(WebApp.nwobjectText("inCode"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                    
                case "getcopyuser":
                    strSQL = dal.GetCopyUser(WebApp.nwobjectText("inCode"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

            }

            return strFinal;
        }

        /*Standard RecordOperation*/

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string result = "";
            string tempstr = "";

            switch (i)
            {
                case eRecordOperation.AddNew:
                    InitializeValues();

                    break;
                case eRecordOperation.Save:
                    RecordOperationResult = string.Empty;

                    if (AreValidEntries() == true)
                    {
                        DataTable dtData, dtDataLin, dtDataLin2, dtLin3 = new DataTable();
                        dtData = LoadSchema();
                        dtDataLin = LoadSchemaLin();
                        dtDataLin2 = LoadSchemaLin2();
                        dtLin3 = LoadSchemaLin3();
                        RecordOperationResult = dal.SaveData(dtData, dtDataLin, dtDataLin2, dtLin3, isNewRow);

                        if (RecordOperationResult.IndexOf("successfully") >= 0)
                            RecordOperationResult = "Saved successfully.";

                        Prompt.Information(RecordOperationResult, based.Title);
                        if (RecordOperationResult.ToLower().IndexOf("successfully") != -1)
                        {
                            RefreshData();
                            js.ADD("cust_GetPara(); $(\"#inCode\").attr(\"disabled\", true);");
                            js.ADD("$(\"#inDesc\").focus();");
                        }
                    }
                    else
                    {
                        RecordOperationResult = "err";
                    }

                    break;
                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("inCode"), based.SecurityAccess.RecUser);

                    Prompt.Information(RecordOperationResult, based.Title);
                    RefreshData();
                    break;

                case eRecordOperation.Process:
                    tempstr = "Process";
                    Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Refresh:
                    RefreshData();
                    isNewRow = false;
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
                    string LISTINGFILENAME = "", sql = "";
                    LISTINGFILENAME = "Company Admin Listing";
                    DataTable dt_Record = new DataTable();
                    dt_Record = dal.GetData();

                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, 6, dt_Record,
                                                           LISTINGFILENAME, based.SecurityAccess.ConnectionString, SFObject.returnText(string.Format(@"SELECT Description FROM fpti.Company where code = '{0}'", based.SecurityAccess.Company), UserDefinedConnectionString),
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
                    js.ADD(frmlist.CreateScript());

                    js.ADD("nwLoading_End('xSample')");
                    break;
                case eRecordOperation.Print:
                    tempstr = "print";
                    ExportGrid();
                    js.ADD("tableToPrint(\"nwExportContainer\");");
                    break;
                case eRecordOperation.Closing:
                    tempstr = "closing";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Search:
                    tempstr = "search";
                    Prompt.Information(tempstr, based.Title);
                    break;
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
            string strFinal = "";
            string strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actItemChange":
                    // strFinal = Item_Change();
                    js.LoadingEnd("actItemChange");
                    break;
                case "actBindCollection":
                    
                    BindCollection();
                    
                    break;
                case "actLoadGrid3":
                    CreateGridUserSetup(false);
                    js.LoadingEnd("actLoadGrid3");
                    break;
                case "actLoadMainHistorical":
                    DataTable dtMainHistory = new DataTable();
                    dtMainHistory = SFObjects.LoadDataTable(dal.Historical(WebApp.nwobjectText("code")), this.UserDefinedConnectionString);
                    Historical(dtMainHistory);
                    js.ADD("nwLoading_End('actLoadMainHistorical')");
                    break;
                case "actLoadGrid":
                    CreateGridDesktopModule("grid2", WebApp.nwobjectText("copyCode"), false);
                    js.LoadingEnd("actLoadGrid");
                    break;
                case "actLoadGrid2":
                    CreateGridWebModule(WebApp.nwobjectText("copymoduleweb"), false);
                    js.LoadingEnd("actLoadGrid2");
                    break;
                case "actpromp":
                    Prompt.Information("Code Required", based.Title);
                    js.LoadingEnd("actpromp");
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
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(WebApp.nwobjectText("nwaccess"), dal.CheckConfig(), based.SecurityAccess.RecUser), based.SecurityAccess.ConnectionString);

                    break;

            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#inCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Code");
            SFObject.SetControlBinding("#inDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Description");
            SFObject.SetControlBinding("#lugCode .idval", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RefDatabase");
            SFObject.SetControlBinding("#lugCode .descval", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RefDatabase");
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RecUser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RecDate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "ModUser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "ModDate");


        }

        //////////////// end of standard / standard custumize

        private void BindCollection()
        {
            Data_Enable();
            CreateGridUserSetup(false);
            CreateGridDesktopModule("grid2", WebApp.nwobjectText("inCode"), false);
            CreateGridWebModule(WebApp.nwobjectText("inCode"), false);
            js.LoadingEnd("actBindCollection");
        }

        
        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();

            CreateGridUserSetup(true);
            CreateGridDesktopModule("", "", true);
            CreateGridWebModule(WebApp.nwobjectText("inCode"), true);

        }

        private void RefreshData()
        {

            Data_Enable();
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")");

        }

        public void CreateGridUserSetup(bool isInitialize)
        {

            string gridID = "Grid1";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();

            int rowCnt = 10;
            int colCnt = (int)User.SPR_USERDESC;

            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
            nwGridCon.TableHeight(400);

            nwGridCon.nwobject((int)User.SPR_DELETE - 1).ColumnName("");
            nwGridCon.nwobject((int)User.SPR_USERCODE - 1).ColumnName("User Code");
            nwGridCon.nwobject((int)User.SPR_USERDESC - 1).ColumnName("User Description");

            nwGridCon.nwobject((int)User.SPR_DELETE - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject((int)User.SPR_USERCODE - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject((int)User.SPR_USERDESC - 1).BackgroundColor("gainsboro");

            nwGridCon.nwobject((int)User.SPR_DELETE - 1).Width(30);
            nwGridCon.nwobject((int)User.SPR_USERCODE - 1).Width(321);
            nwGridCon.nwobject((int)User.SPR_USERDESC - 1).Width(500);

            nwGridCon.nwobject((int)User.SPR_DELETE - 1).Template("<button class=\"nwGrid_Delete\"></button>");

            nwGridCon.PagerDataEditable(true);
            nwGridCon.PagerPerPage(50);

            if (!isInitialize)
            {

                string Company = WebApp.nwobjectText("inCode");
                string CopyCompany = WebApp.nwobjectText("CopyCompany");

                if (CopyCompany.Length > 0)
                {
                    Company = CopyCompany;
                }

                dt = dal.GetDataUser(Company);
                nwGridCon.CreateExcelGrid(dt.Rows.Count + 1, colCnt);
                nwGridCon.dataSource(dt);

            }

            nwGridCon.HeaderTextColor("black");
            nwGridCon.backgroundColor("#FFFFFF");
            nwGridCon.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            nwGridCon.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");
            js.makeHTML("#nwGrid1", nwGridCon.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            js.ADD("checknull(\"Grid1\")");
        }

        public void CreateGridDesktopModule(string grid, string copy, bool isInitialize)
        {
            string gridID = "Grid2";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();

            int rowCnt = 10;
            int colCnt = (int)DesktopMod.SPR_WEBMODULEDESC;

            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
            nwGridCon.TableHeight(200);

            nwGridCon.nwobject((int)DesktopMod.SPR_DELETE - 1).ColumnName("");
            nwGridCon.nwobject((int)DesktopMod.SPR_MODULECODE - 1).ColumnName("Desktop Module Code");
            nwGridCon.nwobject((int)DesktopMod.SPR_MODULEDESC - 1).ColumnName("Desktop Module Description");
            nwGridCon.nwobject((int)DesktopMod.SPR_WEBMODULECODE - 1).ColumnName("Web Module Code");
            nwGridCon.nwobject((int)DesktopMod.SPR_WEBMODULEDESC - 1).ColumnName("Web Module Description");

            nwGridCon.nwobject((int)DesktopMod.SPR_DELETE - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject((int)DesktopMod.SPR_MODULECODE - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject((int)DesktopMod.SPR_MODULEDESC - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject((int)DesktopMod.SPR_WEBMODULECODE - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject((int)DesktopMod.SPR_WEBMODULEDESC - 1).BackgroundColor("gainsboro");

            nwGridCon.nwobject((int)DesktopMod.SPR_DELETE - 1).Width(30);
            nwGridCon.nwobject((int)DesktopMod.SPR_MODULECODE - 1).Width(150);
            nwGridCon.nwobject((int)DesktopMod.SPR_MODULEDESC - 1).Width(400);
            nwGridCon.nwobject((int)DesktopMod.SPR_WEBMODULECODE - 1).Width(150);
            nwGridCon.nwobject((int)DesktopMod.SPR_WEBMODULEDESC - 1).Width(400);

            nwGridCon.nwobject((int)DesktopMod.SPR_DELETE - 1).Template("<button class=\"nwGrid_Delete\"></button>");

            if (!isInitialize)
            {

                dt = dal.GetDataModule(copy);
                nwGridCon.CreateExcelGrid(dt.Rows.Count + 1, colCnt);
                nwGridCon.dataSource(dt);

            }

            nwGridCon.HeaderTextColor("black");
            nwGridCon.backgroundColor("#FFFFFF");
            nwGridCon.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            nwGridCon.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            js.makeHTML("#nwGrid2", nwGridCon.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            js.ADD("checknull(\"Grid2\")");

        }

        public void ExportGrid()
        {

            nwGrid soh = new nwGrid("nwExportContainer");
            DataTable dt_soh = new DataTable();

            dt_soh = dal.GetData();
            if (dt_soh.Columns.Count < 1)
            {
                dt_soh.Columns.Add("Column1", typeof(string));
                dt_soh.Columns.Add("Column2", typeof(string));
                dt_soh.Columns.Add("Column3", typeof(string));
                dt_soh.Columns.Add("Column4", typeof(string));
            }
            else
            {
                //  dt_soh.Columns[0].ColumnName = " ";
                dt_soh.Columns[0].AllowDBNull = true;
                dt_soh.Columns[1].AllowDBNull = true;
                dt_soh.Columns[2].AllowDBNull = true;
                dt_soh.Columns[3].AllowDBNull = true;
                dt_soh.Columns[4].AllowDBNull = true;
                dt_soh.Columns[5].AllowDBNull = true;
                dt_soh.Columns[6].AllowDBNull = true;
            }

            soh.dataSource(dt_soh);
            // soh.minRow(1);
            soh.RowHeight(20);
            soh.TableHeight(900);
            soh.HeaderTextColor("black");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            js.makeHTML("#nwExportContainer", soh.createTable());
            string strF = "";
            strF = string.Format(@"<div class='nwCuz-014'>{0}</div><div>Company</div><div>System User:{1}</div><div>System Date:{2}</div>"
                    , based.SecurityAccess.Company,
                    based.SecurityAccess.RecUser
                    , SFObject.GetServerDateTime(based.SecurityAccess.ConnectionString).ToString());

            js.makePrepend("#nwExportContainer", strF);


        }


        public void CreateGridWebModule(string Company, bool isInitialize)
        {

            string gridID = "Grid3";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();

            int rowCnt = 10;
            int colCnt = (int)WebMod.SPR_MODULEDESC;

            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
            nwGridCon.TableHeight(200);

            nwGridCon.nwobject((int)WebMod.SPR_DELETE - 1).ColumnName("");
            nwGridCon.nwobject((int)WebMod.SPR_MODULECODE - 1).ColumnName("Web Module Code");
            nwGridCon.nwobject((int)WebMod.SPR_MODULEDESC - 1).ColumnName("Web Module Description");

            nwGridCon.nwobject((int)WebMod.SPR_DELETE - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject((int)WebMod.SPR_MODULECODE - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject((int)WebMod.SPR_MODULEDESC - 1).BackgroundColor("gainsboro");

            nwGridCon.nwobject((int)WebMod.SPR_DELETE - 1).Width(30);
            nwGridCon.nwobject((int)WebMod.SPR_MODULECODE - 1).Width(321);
            nwGridCon.nwobject((int)WebMod.SPR_MODULEDESC - 1).Width(780);

            nwGridCon.nwobject((int)WebMod.SPR_DELETE - 1).Template("<button class=\"nwGrid_Delete\"></button>");

            if (!isInitialize)
            {

                dt = dal.GetWebModule(Company);
                nwGridCon.CreateExcelGrid(dt.Rows.Count + 1, colCnt);
                nwGridCon.dataSource(dt);

            }

            nwGridCon.HeaderTextColor("black");
            nwGridCon.backgroundColor("#FFFFFF");
            nwGridCon.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            nwGridCon.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            js.makeHTML("#nwGrid3", nwGridCon.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            js.ADD("checknull(\"Grid3\")");

        }

        

        private bool AreValidEntries()
        {
            string errorResult = String.Empty;


            if (SFObject.returnText(string.Format(@"Select 1 from [FPTI].[Company] where Code = '{0}'", WebApp.nwobjectText("inCode")), based.SecurityAccess.ConnectionString) == "1" && isNewRow == true)
                errorResult += "Cannot be saved. Code already exist.\n";


            if (WebApp.nwobjectText("inCode").Equals(string.Empty))
                errorResult += "Cannot be saved. Code is required.\n";
            else
            {
                if (WebApp.nwobjectText("inCode").Contains(" "))
                    errorResult += "Cannot be saved. Code should not contain spaces.\n";
            }
            if (WebApp.nwobjectText("inDesc").Trim().Equals(string.Empty))
                errorResult += "Cannot be saved. Description is required.\n";


            if (WebApp.nwobjectText("idvallugCode") == string.Empty)
                errorResult += "Cannot be saved. Database is required.\n";

            //  errorResult += CheckUserBeingUsed();

            if (!errorResult.Equals(string.Empty))
                Prompt.Error(errorResult, based.Title);

            return errorResult.Equals(String.Empty);
        }


        public DataTable LoadSchemaLin()
        {
            #region don't change
            DataTable dtData = new DataTable();
            dtData = dal.GetSchemaLin();
            #endregion

            DataRow drDataToAdd;

            int rowNo = 1;
            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGrid1"), true);
            for (int row = 0; row < dt.Rows.Count; row++)
            {
                if (dt.Rows[row][1].ToString().Trim() != "")
                {
                    drDataToAdd = dtData.NewRow();
                    drDataToAdd["Company"] = WebApp.nwobjectText("inCode");
                    drDataToAdd["SysUser"] = dt.Rows[row][1].ToString();

                    drDataToAdd["recuser"] = drDataToAdd["moduser"] = based.SecurityAccess.RecUser;
                    drDataToAdd["recdate"] = drDataToAdd["moddate"] = SFObject.GetServerDateTime(based.SecurityAccess.ConnectionString);


                    #region don't change
                    dtData.Rows.Add(drDataToAdd);
                    dtData.AcceptChanges();
                    #endregion
                    rowNo++;
                }
            }

            return dtData;
        }

        public DataTable LoadSchemaLin2()
        {
            #region don't change
            DataTable dtData = new DataTable();
            dtData = dal.GetSchemaLin2();
            #endregion

            DataRow drDataToAdd;

            int rowNo = 1;
            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGrid2"), true);
            for (int row = 0; row < dt.Rows.Count; row++)
            {
                if (dt.Rows[row][1].ToString().Trim() != "")
                {
                    drDataToAdd = dtData.NewRow();
                    drDataToAdd["Company"] = WebApp.nwobjectText("inCode");
                    drDataToAdd["Module"] = dt.Rows[row][1].ToString();

                    drDataToAdd["recuser"] = drDataToAdd["moduser"] = based.SecurityAccess.RecUser;
                    drDataToAdd["recdate"] = drDataToAdd["moddate"] = SFObject.GetServerDateTime(based.SecurityAccess.ConnectionString);

                    #region don't change
                    dtData.Rows.Add(drDataToAdd);
                    dtData.AcceptChanges();
                    #endregion
                    rowNo++;
                }
            }

            return dtData;
        }


        public DataTable LoadSchemaLin3()
        {
            #region don't change
            DataTable dtData = new DataTable();
            dtData = dal.GetSchemaLin3();
            #endregion

            DataRow drDataToAdd;

            int rowNo = 1;
            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGrid3"), true);
            DataTable dt2 = WebApp.nwGridData(WebApp.nwobjectText("nwGrid2"), true);
            dal.DeleteDataModuleWeb(WebApp.nwobjectText("inCode"));

            for (int irow = 0; irow < dt2.Rows.Count; irow++)
            {
                if (dt2.Rows[irow][3].ToString().Trim() != "")
                {
                    drDataToAdd = dtData.NewRow();
                    drDataToAdd["CompanyID"] = WebApp.nwobjectText("inCode");
                    drDataToAdd["AppID"] = dt2.Rows[irow][3].ToString();
                    drDataToAdd["DateModified"] = SFObject.GetServerDateTime(based.SecurityAccess.ConnectionString);
                    drDataToAdd["dataSort"] = irow + 1;
                    dtData.Rows.Add(drDataToAdd);
                    dtData.AcceptChanges();
                }

            }
            for (int row = 0; row < dt.Rows.Count; row++)
            {
                if (dt.Rows[row][1].ToString().Trim() != "")
                {
                    drDataToAdd = dtData.NewRow();
                    drDataToAdd["CompanyID"] = WebApp.nwobjectText("inCode");
                    drDataToAdd["AppID"] = dt.Rows[row][1].ToString();

                    drDataToAdd["DateModified"] = SFObject.GetServerDateTime(based.SecurityAccess.ConnectionString);
                    drDataToAdd["dataSort"] = dtData.Rows.Count + 1;
                    #region don't change
                    dtData.Rows.Add(drDataToAdd);
                    dtData.AcceptChanges();
                    #endregion
                    rowNo++;
                }
            }

            return dtData;
        }


        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtData = new DataTable();
            dtData = dal.GetSchema();
            #endregion

            DataRow drDataToAdd = dtData.NewRow();
            drDataToAdd["Code"] = WebApp.nwobjectText("inCode");
            drDataToAdd["Description"] = WebApp.nwobjectText("inDesc");
            drDataToAdd["RefDatabase"] = (WebApp.nwobjectText("idvallugCode") == "-" || WebApp.nwobjectText("idvallugCode") == "") ? drDataToAdd["RefDatabase"] = "" : drDataToAdd["RefDatabase"] = WebApp.nwobjectText("idvallugCode");
            #region don't change 
            drDataToAdd["recuser"] = drDataToAdd["moduser"] = based.SecurityAccess.RecUser;
            drDataToAdd["recdate"] = drDataToAdd["moddate"] = SFObject.GetServerDateTime(based.SecurityAccess.ConnectionString); //will be populated as getdate() in sproc

            dtData.Rows.Add(drDataToAdd);
            dtData.AcceptChanges();
            #endregion

            return dtData;
        }

        public void Data_Enable()
        {
            nwToolBox.bindingNavigatorAddNewItem.Enable =
            // nwToolBox.bindingNavigatorDeleteItem.Enable =
            //nwToolBox.bindingNavigatorDeleteItem.Visible =
            nwToolBox.bindingNavigatorSaveItem.Enable =
            nwToolBox.bindingNavigatorPrintItem.Enable =
            nwToolBox.bindingNavigatorInquireItem.Enable =
            nwToolBox.bindingNavigatorDeleteItem.Enable =
            nwToolBox.bindingNavigatorExportItem.Enable = true;
            nwToolBox.bindingNavigatorImportItem.Visible = false;
            nwToolBox.bindingNavigatorProcessItem.Visible = false;
        }

        private void Historical(DataTable dtrecords)
        {

            string LISTINGFILENAME = "";
            if (dal.LISTINGFILENAME + " History Listing" == "") LISTINGFILENAME = "Sheet 1";
            else LISTINGFILENAME = dal.LISTINGFILENAME + " History Listing";

            int maxrow = dal.listingStartRow + dtrecords.Rows.Count;


            int dataindex = dal.listingStartRow;

            ListingAndPrint frmlist = new ListingAndPrint
                                                   (ListingAndPrint.FormType.Listing, dal.listingStartRow, dtrecords,
                                                   LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                   based.SecurityAccess.RecUserName, LISTINGFILENAME);


            //loop valdiation
            string tempstring1 = "";
            string tempstring2 = "";
            string toChange = "";
            string toChange3 = "";
            string toChange5 = "";
            string toChange7 = "";


            for (int i = 0; i < dtrecords.Rows.Count; i++)
            {
                frmlist.m_Spread.Rows(i + dataindex).TextColor("black");
            }


            for (int i = 0; i < dtrecords.Rows.Count; i++)
            {
                for (int ic = 0; ic < dtrecords.Columns.Count; ic++)
                {
                    if (toChange + toChange3 + toChange5 + toChange7 !=
                        dtrecords.Rows[i][0].ToString()
                        + dtrecords.Rows[i][3].ToString()
                        + dtrecords.Rows[i][5].ToString()
                        + dtrecords.Rows[i][7].ToString())
                    {
                        tempstring2 = "";
                        tempstring1 = dtrecords.Rows[i][ic].ToString();
                        try
                        {
                            tempstring2 = dtrecords.Rows[i + 1][ic].ToString();
                        }
                        catch
                        {
                            tempstring1 = tempstring2 = "";
                        }
                        try
                        {
                            if (dtrecords.Rows[i][0].ToString() == dtrecords.Rows[i + 1][0].ToString()
                                && dtrecords.Rows[i][3].ToString() == dtrecords.Rows[i + 1][3].ToString()
                                && dtrecords.Rows[i][5].ToString() == dtrecords.Rows[i + 1][5].ToString()
                                && dtrecords.Rows[i][7].ToString() == dtrecords.Rows[i + 1][7].ToString())
                            {
                                if (tempstring1 != tempstring2)
                                {
                                    frmlist.m_Spread.Rows(i + dataindex, ic).TextColor("red");
                                }

                            }
                        }
                        catch { }

                    }
                }

                //frmlist.m_Spread.Rows(0, 0).BackgroundColor("Transparent");
                toChange = dtrecords.Rows[i][0].ToString();
                toChange3 = dtrecords.Rows[i][3].ToString();
                toChange5 = dtrecords.Rows[i][5].ToString();
                toChange7 = dtrecords.Rows[i][7].ToString();
            }


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

            js.ADD("nwLoading_End('xSample')");

        }

        public void InitializeValues() {

            nwToolBox.bindingNavigatorSaveItem.Enable = true;
            nwToolBox.bindingNavigatorAddNewItem.Enable =
             nwToolBox.bindingNavigatorPrintItem.Enable =
             nwToolBox.bindingNavigatorInquireItem.Enable =
             nwToolBox.bindingNavigatorImportItem.Visible =
             nwToolBox.bindingNavigatorDeleteItem.Enable =
             nwToolBox.bindingNavigatorExportItem.Enable = false;
            CreateGridUserSetup(true);
            CreateGridDesktopModule("", "", true);
            CreateGridWebModule("", true);
            isNewRow = true;

        }
        

    }
}