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
    public class P8FORWViewerBL : nwAction
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
        string ConnectionStringNOAH = "";
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
        public static int startindex1 = 0,
                SPR_DA_DATASOURCEID = ++startindex1,
                SPR_DA_SOURCE = ++startindex1,
                SPR_DA_NAME = ++startindex1,
                SPR_DA_TYPE = ++startindex1,
                SPR_DA_TYPEDESC = ++startindex1,
                SPR_DA_ISUPDATENEW = ++startindex1,
            SPR_DA_ISUSED = ++startindex1;

        public static int startindex5 = 0,
               SPR_DAC_COLUMN = ++startindex5,
               SPR_DAC_NAME = ++startindex5,
               SPR_DAC_TYPE = ++startindex5,
               SPR_DAC_VALUETYPE = ++startindex5;

        public static int startindex2 = 0,
                SPR_DC_COLUMN = ++startindex2,
                SPR_DC_NAME = ++startindex2,
                SPR_DC_OPERATION = ++startindex2,
                SPR_DC_OPERATIONDESC = ++startindex2,
                SPR_DC_VALUE = ++startindex2,
                SPR_DC_CELLREFERENCE = ++startindex2;
        //SPR_DC_UNIQUECODE = ++startindex2;

        public static int startindex3 = 0,
              SPR_DB_PARAMETER = ++startindex3,
              SPR_DB_VALUE = ++startindex3,
              SPR_DB_CELLREFERENCE = ++startindex3;
        //SPR_DB_UNIQUECODE = ++startindex3;

        public static int startindex4 = 0,
             SPR_DBC_SHOW = ++startindex4,
             SPR_DBC_PRIORITYLEVEL = ++startindex4,
             SPR_DBC_COLUMNNAME = ++startindex4,
             SPR_DBC_COLUMNDISPLAY = ++startindex4;
        //SPR_DBC_UNIQUECODE = ++startindex4

        public static int startindex6 = 0,
                        SPR_LU_COLUMN = ++startindex6,
                        SPR_LU_NAME = ++startindex6,
                        SPR_LU_SHOW = ++startindex6,
                        SPR_LU_SEQUENCE = ++startindex6,
                        SPR_LU_CELLREFERENCE = ++startindex6;

        public static int startindex7 = 0,
               SPR_LUW_COLUMN = ++startindex7,
               SPR_LUW_NAME = ++startindex7,
               SPR_LUW_OPERATION = ++startindex7,
               SPR_LUW_OPERATIONDESC = ++startindex7,
               SPR_LUW_VALUE = ++startindex7,
               SPR_LUW_CELLREFERENCE = ++startindex7;
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

            string ConnectionStringNOAH = "";
            bool hasconnected = false;
            string DynamicDB = SFObject.returnText("Select DynamicDB from [dbo].[gen_Connectivity] where DynamicDB = '1'", this.UserDefinedConnectionString);
            if (DynamicDB == "1")
            {
                string nwcomc = "";
                try  { 
                      var Request = HttpContext.Current.Request;
                 nwcomc = Request.QueryString["nwcomc"].ToString();
                    nwcomc = nwcomc.Split(',').Last();
                    nwcomc = nwSystem.StringDecrypt(nwcomc);
                }
                catch { }
                if (!string.IsNullOrWhiteSpace(nwcomc))
                {
                    ConnectionStringNOAH = nwcomc;
                    hasconnected = IsServerConnected(nwcomc);
                }
                if (!hasconnected)
                {
                    ConnectionStringNOAH = getConnNOAH();
                    hasconnected = IsServerConnected(ConnectionStringNOAH);
                }
                if (!hasconnected)
                {
                    ConnectionStringNOAH = this.UserDefinedConnectionString;
                }
            }
            if (!hasconnected)
            {
                js.ADD("console.error(`${'" + "cannot connect to database." + "'}`)");
            }
            this.ConnectionStringNOAH = ConnectionStringNOAH;

            dal = new P8FORWViewerDAL(this.UserDefinedConnectionString, this.based.SecurityAccess.ConnectionString, this.ConnectionStringNOAH, "");
            if (_strmet == "get_Initialize") strFinal = get_Initialize(strParameter, strValue);
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
        P8FORWViewerDAL dal;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();
        private static int StartIndex = 0,
            SPR_AddOnUnit = StartIndex,
            SPR_AddOnUnitDesc = ++StartIndex,
            SPR_InventType = ++StartIndex;

        public P8FORWViewerBL()
        {

        }
        public string get_Initialize(string strParameter, string strValue)
        {
            WebApp = new WebApplib(strParameter, strValue);

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
                    strSQL = "select 1" ;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getluglookupsqlsyntax":
                    //strConn = this.ConnectionStringNOAH;
                    emptyDT = JsonToDatatable(WebApp.nwobjectText("jsondata"));
                    //strSQL = WebApp.nwobjectText("sqlsyntax");
                    //DataTable lookuplin = JsonToDatatable(WebApp.nwobjectText("lookuplin"));
                    //foreach(DataRow dr in lookuplin.Rows)
                    //{
                    //    int rowno = Parser.ParseInt(dr["rowno"].ToString());
                    //    string hide = dr["hide"].ToString();
                    //    if(hide == "1")
                    //    {
                    //        nwObject.ColumnHide(rowno);
                    //    }
                    //}
                    strMethod = strMethod.Substring(3);

                    //nwObject.ColumnSort("Code", "Asc");
                    if (WebApp.nwobjectText("isAddToList") == "1")
                    {
                        strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    }else
                    {
                        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    }
                    break;
            }

            return strFinal;
        }

        private void InitializeValues()
        {
           
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
                case "actforw_mainload":
                    string Code = WebApp.nwobjectTextSQL("txt-P8FORW-code");
                    //bool _P8FORWViewer_isview = WebApp.nwobjectBool("_P8FORWViewer_isview");
                    //ReloadDataSourceColumn();
                    //DataTable json_datasource = dal.getdatasourcesource("", "");
                    try
                    {
                        int startindextemp = -1;
                        DataSet ds = dal.LoadDocumentSet(Code);
                        js.ADD("ToolLoad(" + DatatableToJson(ds.Tables[++startindextemp]) // json_datasource
                            //+ ", " + JsonConvert.SerializeObject(ds.Tables[++startindex5]) // json_forw
                            //+ ", " + JsonConvert.SerializeObject(ds.Tables[++startindex5]) // json_type
                            //+ ", " + JsonConvert.SerializeObject(ds.Tables[++startindex5]) // json_operation
                            //+ ", " + JsonConvert.SerializeObject(ds.Tables[++startindex5]) // json_datacondition
                            //+ ", " + JsonConvert.SerializeObject(ds.Tables[++startindex5]) // json_type
                            //+ ", " + JsonConvert.SerializeObject(ds.Tables[++startindex5]) // json_operation
                            //+ ", " + JsonConvert.SerializeObject(ds.Tables[++startindex5]) // json_dataconditionlin
                            //+ ", " + JsonConvert.SerializeObject(ds.Tables[++startindex5]) // json_databindingshdr
                            //+ ", " + JsonConvert.SerializeObject(ds.Tables[++startindex5]) // json_databindingslin
                            //+ ", " + JsonConvert.SerializeObject(ds.Tables[++startindex5]) //json_databindingslin_column
                            //+ ", " + JsonConvert.SerializeObject(ds.Tables[++startindex5]) //json_operation
                            //+ ", " + JsonConvert.SerializeObject(ds.Tables[++startindex5]) //json_lookup
                            //+ ", " + JsonConvert.SerializeObject(ds.Tables[++startindex5]) //json_addtolist
                       + ");");
                    }
                    catch { }
                    js.ADD("nwLoading_End('actforw_mainload')");
                    break;
                case "actforw_getdatasource":
                    DataTable jsonp8forwsbhdr_ds = JsonToDatatable(WebApp.nwobjectText("jsonp8forwsbhdr"));
                    string datasourcetype_ds = "";
                    foreach (DataRow row in jsonp8forwsbhdr_ds.Rows)
                    {
                        datasourcetype_ds += row["datasourcetype"].ToString() + "|";
                    }
                    if (!string.IsNullOrEmpty(datasourcetype_ds))
                    {
                        datasourcetype_ds = datasourcetype_ds.TrimEnd('|');
                    }
                    DataSet dt_ds_sb = dal.getDataGrid_sb(datasourcetype_ds);
                    //string resultJson = JsonConvert.SerializeObject(dt_ds_sbc);
                    try
                    {
                        js.JSONfromDataTable("_FORWViewer_DataSource", dt_ds_sb.Tables[0]);
                    }
                    catch { }
                    try
                    {
                        js.JSONfromDataTable("_FORWViewer_DataSourceTypeHdr", dt_ds_sb.Tables[1]);
                    }catch { }
                    try
                    {
                        js.JSONfromDataTable("_FORWViewer_DataSourceTypeLin", dt_ds_sb.Tables[2]);
                    }
                    catch { }
                    try
                    {
                        js.JSONfromDataTable("_FORWViewer_DataSourceTypeColumn", dt_ds_sb.Tables[3]);
                    }
                    catch { }
                    js.ADD("p8forw_DataSourceDone()");
                    //js.ADD(string.Format("p8forw_bindtable({0},{1})", config, resultJson));
                    js.ADD("nwLoading_End('actforw_getdatasource')");
                    break;
                case "actExecuteSQL":
                    DataTable jsonp8forwsbhdr = JsonToDatatable(WebApp.nwobjectText("jsonp8forwsbhdr"));
                    
                    int len = 0;
                    try { len = jsonp8forwsbhdr.Rows.Count; } catch { }
                    for (int i =0;i < len; i++)
                    {
                        try
                        {
                            DataRow item = jsonp8forwsbhdr.Rows[i];
                           // string config = DataRowToJson(item).Replace(@"""", @"\""").Replace(@"'", @"\'").Replace(@"`", @"\`");
                            bool aggregatesum = Parser.ParseBool(GetColumnValue(item, "aggregatesum").ToLower());
                            string col = GetColumnValue(item, "col");
                            string row = GetColumnValue(item, "row");
                            string datasourceid = GetColumnValue(item, "datasourceid");
                            string datasourcetype = GetColumnValue(item, "datasourcetype");
                            string hidecolumnheader = GetColumnValue(item, "hidecolumnheader");
                            string objecttype = GetColumnValue(item, "objecttype");

                            
                            string sqlcolumn = GetColumnValue(item, "sqlcolumn_final");
                            string sqlfilter = GetColumnValue(item, "sqlfilter_final");
                            string sqlsort = GetColumnValue(item, "sqlsort_final");
                            string sqlsyntax = GetColumnValue(item, "sqlsyntax_final");
                      
                            List<string> sqlcolumnlist = new List<string>();
                            List<string> sqlfilterlist = new List<string>();
                            List<string> sqlsortlist = new List<string>();
                            sqlcolumnlist = SplitByDelimiter(sqlcolumn, ",");
                            sqlfilterlist = SplitByDelimiter(sqlfilter, "and");
                            sqlsortlist = SplitByDelimiter(sqlsort, ",");

                            DataTable dtresult = dal.sqlsyntaxtable(sqlsyntax);
                            //filter data
                            foreach (var filter in sqlfilterlist)
                            {
                                try
                                {
                                    DataView dvFilter = new DataView(dtresult);
                                    dvFilter.RowFilter = filter;
                                    dtresult = dvFilter.ToTable();
                                    dtresult.AcceptChanges();
                                }
                                catch (Exception ex)
                                {
                                    string error = "FORW Error - Filter by: " + ex.Message;
                                    js.ADD("console.error(`${'" + error.Replace(@"""", @"\""").Replace(@"'", @"\'").Replace(@"`", @"\`") + "'}`)");
                                }
                            }
                            // Sort the data
                            foreach (var sort in sqlsortlist)
                            {
                                try
                                {
                                    dtresult.DefaultView.Sort = sort;
                                }
                                catch (Exception ex)
                                {
                                    string error = "FORW Error - Sort by: " + ex.Message;
                                    js.ADD("console.error(`${'" + error.Replace(@"""", @"\""").Replace(@"'", @"\'").Replace(@"`", @"\`") + "'}`)");
                                }
                            }
                            //get column assign in forw
                            DataTable drfinaltable = new DataTable();
                            foreach (var column in sqlcolumnlist)
                            {
                                string[] parts = SplitColumnName(column);
                                string columnName = parts[0].TrimStart('[').TrimEnd(']');
                                string alias = parts.Length > 1 ? string.Join(" ", parts, 1, parts.Length - 1) : columnName;
                                if (dtresult.Columns.Contains(columnName))
                                {
                                    // Update the column name
                                    dtresult.Columns[columnName].ColumnName = alias;
                                    //Add Column in Final Table
                                    drfinaltable.Columns.Add(alias);
                                }
                            }
                            // Copy data from dtresult to drfinaltable
                            foreach (DataRow dr in dtresult.Rows)
                            {
                                DataRow newRowData = drfinaltable.NewRow();
                                // Iterate over the columns of drfinaltable to identify corresponding columns in dtresult
                                foreach (DataColumn column in drfinaltable.Columns)
                                {
                                    // Check if the column exists in dtresult with the same name
                                    if (dtresult.Columns.Contains(column.ColumnName))
                                    {
                                        // Copy the data from dtresult to drfinaltable
                                        newRowData[column.ColumnName] = dr[column.ColumnName];
                                    }
                                }
                                // Add the new row to drfinaltable
                                drfinaltable.Rows.Add(newRowData);
                            }
                            if (drfinaltable.Rows.Count <= 0)
                            {
                                DataRow newRowData = drfinaltable.NewRow();
                                drfinaltable.Rows.Add(newRowData);
                            }
                            // Add the DataRow to the DataTable
                            // Clone the structure of the source DataTable
                            DataTable dtconfig = jsonp8forwsbhdr.Clone();
                            // Import the DataRow into the new DataTable
                            dtconfig.ImportRow(item);
                            string config = DatatableToJson(dtconfig);
                            string resultJson = DatatableToJson(drfinaltable);

                            if (objecttype == "table")
                            {
                                js.ADD($"p8forw_bindtable({config},{resultJson})");
                            }
                            else if (objecttype == "lookup")
                            {
                                js.ADD($"p8forw_bindlookup({config},{resultJson})");
                            }
                            else
                            {
                                js.ADD($"p8forw_bindstring({config},{resultJson})");
                            }

                            //strFinal = get_LookUp(strtool_Met, strtool_Poz, strParameter, strValue);
                        }
                        catch { }
                        js.ADD("nwLoading_End('actExecuteSQL')");
                        
                    }
                    break;
                case "actLoadDataSource":
                     DataTable json_datasource = dal.LoadDataSource(WebApp.nwobjectText("jsondatasourcelist"));
                    try
                    {
                        js.ADD("LoadDataSource(" + DatatableToJson(json_datasource) 
                       + ");");
                    }
                    catch { }
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
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", "select 1", this.UserDefinedConnectionString);
                    break;
            }

            return strFinal;
        }

        private void SetBindings()
        {
            //Header
            //FOOTER
        }

        //////////////// end of standard / standard custumize

        private void BindCollection()
        {
            js.ADD("nwLoading_End('actBindCollection');");
        }

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();

            //js.ADD("setTimeout(function () {actforw_mainload() }, 1500);");
            js.ADD("actforw_mainload()");

        }

        #region Standard Functionality

        private string getGridColName(int col, bool hasRemoveNull)
        {
            return string.Format("column{0} {1}", (col - 1).ToString(), hasRemoveNull ? "<> ''" : "").Trim();

        }

        private DataTable getFilteredGrid(DataTable dt, string colName, string colSort)
        {
            DataTable dtDetails = new DataTable();
            dtDetails = new DataView(dt, colName, colSort, DataViewRowState.CurrentRows).ToTable();
            return dtDetails;
        }

        #endregion
        private string DatatableToJson(DataTable dt)
        {

            return JsonConvert.SerializeObject(dt);
        }
        private DataTable JsonToDatatable(string json)
        {
            try
            {
                return JsonConvert.DeserializeObject<DataTable>(json);
            }catch
            {
                return null; 
            }
        }
        private string DataRowToJson(DataRow dataRow)
        {
            // Convert DataRow to JSON string using Newtonsoft.Json
            return JsonConvert.SerializeObject(dataRow.Table);
        }

        private string getConnNOAH()
        {
            //remove this
            DataTable dtrecords = new DataTable();
            DataTable dtconfig = new DataTable();
            string connCP = @"connect timeout=360;Data Source={0};Initial Catalog={1};user id={2};password={3}; connection timeout=240; pooling=false";
            string server = "", database = "", user = "", password = "";

            dtconfig = SFObjects.LoadDataTable("SELECT top 1 * FROM dbo.gen_Connectivity where DynamicDB = 1", this.UserDefinedConnectionString);
            if (dtconfig.Rows.Count <= 0)
            {
                dtconfig = SFObjects.LoadDataTable("SELECT top 1 * FROM dbo.gen_Connectivity", this.UserDefinedConnectionString);
            }
            if (dtconfig.Rows.Count > 0)
            {
                try
                {
                    nwConfiguration nwConfig = new nwConfiguration();
                    server = nwConfig.nwDecrpytString(dtconfig.Rows[0]["ConnectivityServer"].ToString());
                    database = nwConfig.nwDecrpytString(dtconfig.Rows[0]["ConnectivityDataBase"].ToString());
                    user = nwConfig.nwDecrpytString(dtconfig.Rows[0]["ConnectivityUsername"].ToString());
                    password = nwConfig.nwDecrpytString(dtconfig.Rows[0]["ConnectivityPassword"].ToString());
                }
                catch
                { 
                try
                {
                    nwConfiguration nwConfig = new nwConfiguration();
                    server = dtconfig.Rows[0]["ConnectivityServer"].ToString();
                    database = dtconfig.Rows[0]["ConnectivityDataBase"].ToString();
                    user =dtconfig.Rows[0]["ConnectivityUsername"].ToString();
                    password = dtconfig.Rows[0]["ConnectivityPassword"].ToString();
                }
                catch
                {
                }
                }
            }
            else
            {
                connCP = this.UserDefinedConnectionString;
            }

            return connCP = string.Format(connCP, server, database, user, password);
        }
        public bool IsServerConnected(string ConnectionString)
        {

            var task = Task.Run(() => IsServerConnected1(ConnectionString));
            if (task.Wait(TimeSpan.FromSeconds(1)))
                return task.Result;
            else
                return false;

        }
        public bool IsServerConnected1(string ConnectionString)
        {
            using (var l_oConnection = new SqlConnection(ConnectionString))
            {
                try
                {
                    l_oConnection.Open();
                    return true;
                }
                catch
                {
                    return false;
                }
            }
        }

        private DataTable CloneAndConvertToString(DataTable originalDataTable)
        {
            DataTable stringDataTable = originalDataTable.Clone();
            foreach (DataColumn column in stringDataTable.Columns)
            {
                column.DataType = typeof(string);
            }
            return stringDataTable;
        }
        public string GetColumnValue(DataRow row, string columnName)
        {
            if (row.Table.Columns.Contains(columnName) && row[columnName] != DBNull.Value)
            {
                return row[columnName].ToString();
            }
            else
            {
                // You can handle the case where the column doesn't exist or has a DBNull value
                return "";
            }
        }

        public List<string> SplitByDelimiter(string input, string delimiter)
        {
            List<string> parts = new List<string>();
            bool insideQuotes = false;
            int startIndex = 0;
            int delimiterLength = delimiter.Length;

            for (int i = 0; i < input.Length; i++)
            {
                if (input[i] == '\'')
                {
                    insideQuotes = !insideQuotes; // Toggle inside/outside of quotes
                }
                else if (input.Substring(i).StartsWith(delimiter) && !insideQuotes)
                {
                    parts.Add(input.Substring(startIndex, i - startIndex));
                    startIndex = i + delimiterLength; // Move startIndex after the delimiter
                    i += delimiterLength - 1; // Skip the delimiter characters
                }
            }

            parts.Add(input.Substring(startIndex)); // Add the last part after the last delimiter

            return parts;
        }

        public string[] SplitColumnName(string columnName)
        {
            string[] parts = { };
            int count = columnName.Count(c => c == '[');
            if(count == 2)
            {
                parts = columnName.Split(new char[] { '[', ']' }, StringSplitOptions.RemoveEmptyEntries);

                // Remove leading and trailing whitespace from each part
                for (int i = 0; i < parts.Length; i++)
                {
                    parts[i] = parts[i].Trim();
                }
                // Filter out empty strings after trimming
                parts = parts.Where(part => !string.IsNullOrEmpty(part)).ToArray();
            }

            return parts;
        }
    }
}