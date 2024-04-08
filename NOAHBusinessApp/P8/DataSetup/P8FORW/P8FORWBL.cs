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
using NPOI.SS.Formula.Functions;

namespace Noah_Web.forms_BusinessLayer
{
    public class P8FORWBL : nwAction
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

        public static int startindex1 = 0,
            SPR_DA_DATASOURCEID = ++startindex1,
            SPR_DA_NAME = ++startindex1,
            SPR_DA_DATASOURCE = ++startindex1,
            SPR_DA_DATASOURCEDESC = ++startindex1,
            SPR_DA_TYPE = ++startindex1,
            SPR_DA_TYPEDESC = ++startindex1,
            SPR_DA_SOURCE = ++startindex1,
            SPR_DA_PARAMETERSETUP = ++startindex1,
            SPR_DA_PARAMETERSETUPHASDATA = ++startindex1,
            SPR_DA_RIGHTS = ++startindex1,
            SPR_DA_RIGHTSHASDATA = ++startindex1;

        public static int startindex5 = 0,
               SPR_DAPSH_SUBTYPE = ++startindex5,
               SPR_DAPSH_NAME = ++startindex5,
               SPR_DAPSH_MAINPARAM = ++startindex5,
               SPR_DAPSH_MAINPARAMVALUE = ++startindex5,
               SPR_DAPSH_COLUMN = ++startindex5,
               SPR_DAPSH_COLUMNHASDATA = ++startindex5;

        public static int startindex12 = 0,
                       SPR_DAPSL_INCLUDE = ++startindex12,
                       SPR_DAPSL_PARAM = ++startindex12,
                       SPR_DAPSL_DESC = ++startindex12,
                       SPR_DAPSL_INITIALVALUE = ++startindex12;

        public static int startindex18 = 0,
                       SPR_DAPSC_INCLUDE = ++startindex18,
                       SPR_DAPSC_COLUMN = ++startindex18,
                       SPR_DAPSC_ALIAS = ++startindex18;


        public static int startindex13 = 0,
               SPR_DAR_USER = ++startindex13,
               SPR_DAR_USERDESC = ++startindex13;


        /// <summary>
        /// /////
        /// </summary>

        public static int startindex14 = 0,
                       SPR_SBF_COLUMN = ++startindex14,
                       SPR_SBF_COLUMNDESC = ++startindex14,
                       SPR_SBF_OPERATION = ++startindex14,
                       SPR_SBF_OPERATIONDESC = ++startindex14,
                       SPR_SBF_VALUE = ++startindex14,
                       SPR_SBF_CELLREFERENCE = ++startindex14;

        public static int startindex15 = 0,
              SPR_SBE_EVENT = ++startindex15,
              SPR_SBE_EVENTDESC = ++startindex15,
              SPR_SBE_CELLREFERENCE = ++startindex15;

        public static int startindex19 = 0,
                SPR_SBC_COLUMN = ++startindex19,
                SPR_SBC_CELLREFERENCE = ++startindex19;

        public static int startindex17 = 0,
               SPR_SBP_PARAM = ++startindex17,
               SPR_SBP_PARAMDESC = ++startindex17,
               SPR_SBP_VALUE = ++startindex17,
               SPR_SBP_CELLREFERENCE = ++startindex17;

        public static int startindex20 = 0,
                SPR_SBS_COLUMN = ++startindex20,
                SPR_SBS_SORT = ++startindex20;

        //public static int startindex21 = 0,
        //       SPR_SBPFIXED_PARAM = ++startindex21,
        //       SPR_SBPFIXED_PARAMDESC = ++startindex21,
        //       SPR_SBPFIXED_VALUE = ++startindex21,
        //       SPR_SBPFIXED_CELLREFERENCE = ++startindex21;
        public static int startindex22 = 0,
    SPR_SBD_CELLSOURCE = ++startindex22,
    SPR_SBD_CELLDESTINATION = ++startindex22;

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

            dal = new P8FORWDAL(this.UserDefinedConnectionString, this.based.SecurityAccess.ConnectionString, "");
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
        P8FORWDAL dal;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();
        private static int StartIndex = 0,
            SPR_AddOnUnit = StartIndex,
            SPR_AddOnUnitDesc = ++StartIndex,
            SPR_InventType = ++StartIndex;

        public P8FORWBL()
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

            if (strMethod.StartsWith("getlugsbcolumnnamec"))
            {
                strSQL = dal.getlugcolumn(WebApp.nwobjectText("idvallugsbdatasourcetype"), based.SecurityAccess.RecUser, WebApp.nwobjectText("columnlist"));
                nwObject.ColumnSort("Code", "Asc");
                strMethod = strMethod.Substring(3);
                strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
            }
            else if (strMethod.StartsWith("getlugsbcolumnnames"))
            {
                strSQL = dal.getlugcolumn(WebApp.nwobjectText("idvallugsbdatasourcetype"), based.SecurityAccess.RecUser, WebApp.nwobjectText("columnlist"));
                nwObject.ColumnSort("Code", "Asc");
                strMethod = strMethod.Substring(3);
                strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
            }
            else
            {

                switch (strMethod)
                {
                    case "gettoolboxInquire":
                        strSQL = "select 1";
                        strMethod = strMethod.Substring(3);
                        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;
                    //Data Source
                    case "getlugdatasourceadddataconnectivity":
                        strSQL = dal.getlugdatasourceadddataconnectivity();
                        nwObject.ColumnSort("Code", "Asc");
                        nwObject.ColumnHide(1);
                        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;
                    case "getlugdatasourcetype":
                    case "getlugdatasourceadddatasourcetype":
                        strSQL = dal.getlugsourcetype();
                        nwObject.ColumnSort("Code", "Asc");
                        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;
                    case "getlugdatasourceadddatasource":
                        //strSQL = dal.getlugSource();
                        emptyDT = dal.getlugSource(WebApp.nwobjectText("idvallugdatasourceadddataconnectivity"), WebApp.nwobjectText("idvallugdatasourceadddatasourcetype"));
                        nwObject.ColumnSort("Code", "Asc");
                        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;
                    case "getlugdatasourceadddatamainparam":
                        //strSQL = dal.getlugSource();
                        emptyDT = dal.getlugParameter(WebApp.nwobjectText("txtdatasourcepsdatasource"), WebApp.nwobjectText("txtdatasourcepstype"), WebApp.nwobjectText("txtdatasourcepssource"));
                        nwObject.ColumnSort("Code", "Asc");
                        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;
                    case "getlugdatasourceruser":
                        //strSQL = dal.getlugSource();
                        emptyDT = dal.getluguser(WebApp.nwobjectText("UserList"));
                        nwObject.ColumnSort("Code", "Asc");
                        strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;

                    //case "getlugdatasourcecolumntype": //Data Source
                    case "getluglookuptype": //Lookup
                        strSQL = dal.getdatatype();
                        nwObject.ColumnSort("Code", "Asc");
                        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;

                    //Data Condition
                    //case "getlugdataconditioneventevent":
                    case "getlugsbeventevent":
                        strSQL = dal.getlugdataconditioneventevent();
                        nwObject.ColumnSort("Code", "Asc");
                        nwObject.ColumnWidth(2,"500px");
                        strMethod = strMethod.Substring(3);
                        strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;
                    case "getlugsbsource":
                        //case "getlugdataconditionsource": //Data Condition
                        //case "getluglookupsource": //Lookup
                        //case "getlugtablesource": //Table
                        strSQL = dal.getlugsource(based.SecurityAccess.RecUser);
                        nwObject.ColumnSort("Code", "Asc");
                        strMethod = strMethod.Substring(3);
                        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;
                    case "getlugsbdatasourcetype":
                        //case "getlugdataconditionsource": //Data Condition
                        //case "getluglookupsource": //Lookup
                        //case "getlugtablesource": //Table
                        strSQL = dal.getlugdatasourcetype(WebApp.nwobjectText("txtsbdatasourceid"), based.SecurityAccess.RecUser);
                        nwObject.ColumnSort("Code", "Asc");
                        strMethod = strMethod.Substring(3);
                        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;
                    case "getlugsbfcolumn":
                        strSQL = dal.getlugsbfcolumn(WebApp.nwobjectText("idvallugsbdatasourcetype"), based.SecurityAccess.RecUser);
                        nwObject.ColumnSort("Code", "Asc");
                        strMethod = strMethod.Substring(3);
                        strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;


                    //case string method when method.StartsWith("getlugsbcolumnnamec"):
                    //case var s when strMethod.Contains("ee"):
                    //    strSQL = dal.getlugdatasourcetype(WebApp.nwobjectText("txtsbdatasourceid"), based.SecurityAccess.RecUser);
                    //    nwObject.ColumnSort("Code", "Asc");
                    //    strMethod = strMethod.Substring(3);
                    //    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    //    break;
                    //case "getlugdataconditionvalue":
                    //    strSQL = dal.getlugdataconditionvalue(WebApp.nwobjectText("txtdataconditiondatasourceid"));
                    //    nwObject.ColumnSort("Code", "Asc");
                    //    strMethod = strMethod.Substring(3);
                    //    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    //    break;
                    case "getlugsbfoperation": //Data Condition
                    //case "getluglookupwhereoperation": //Lookup
                        strSQL = dal.getoperation();
                        nwObject.ColumnSort("Code", "Asc");
                        strMethod = strMethod.Substring(3);
                        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;
                    //Lookup

                    //strSQL = dal.getluglookupsource();
                    //nwObject.ColumnSort("Code", "Asc");
                    //strMethod = strMethod.Substring(3);
                    //strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    //break;


                    //case "getlug-p8forw-adddatabindings":
                    //    emptyDT = (DataTable)JsonConvert.DeserializeObject(WebApp.nwobjectText("p8forw_json_adddatabindings"), (typeof(DataTable)));
                    //    strMethod = strMethod.Substring(3);
                    //    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    //    break;
                    //case "getlugp8forwlookup":
                    //    strSQL = dal.getlugp8forwlookup();
                    //    nwObject.ColumnSort("Code", "Asc");
                    //    strMethod = strMethod.Substring(3);
                    //    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    //    break;
                    //case "getlug-p8forw-addtolist":
                    //    emptyDT = (DataTable)JsonConvert.DeserializeObject(WebApp.nwobjectText("p8forw_json_source"), (typeof(DataTable)));
                    //    strMethod = strMethod.Substring(3);
                    //    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    //    break;

                    case "getlug-datasource-source":
                        //DataTable dt_source = (DataTable)JsonConvert.DeserializeObject(WebApp.nwobjectText("p8forw_json_source"), (typeof(DataTable)));
                        //emptyDT = dal.getname(WebApp.nwobjectTextSQL("type"));
                        //if (dt_source?.Rows?.Count > 0)
                        //{
                        //    foreach (DataRow row in emptyDT.AsEnumerable().ToList())
                        //    {
                        //        string source = row.Field<string>("code");
                        //        if (dt_source.AsEnumerable().Any(r => r.Field<string>("source") == source))
                        //        {
                        //            row.Delete();
                        //        }
                        //    }
                        //    emptyDT.AcceptChanges();
                        //}

                        emptyDT = dal.getdatasourcesource(WebApp.nwobjectTextSQL("type"), WebApp.nwobjectText("source"));
                        strMethod = strMethod.Substring(3);
                        nwObject.ColumnHide(3);
                        strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;
                    case "getlug-datacondition-source":
                        emptyDT = (DataTable)JsonConvert.DeserializeObject(WebApp.nwobjectText("p8forw_jsondata"), (typeof(DataTable)));
                        //emptyDT = (DataTable)JsonConvert.DeserializeObject(WebApp.nwobjectText("p8forw_datasource_source"), (typeof(DataTable)));
                        //emptyDT = dal.getdcsource();
                        strMethod = strMethod.Substring(3);
                        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;
                    case "getlug-datacondition-value":
                        emptyDT = dal.getdcvalue(WebApp.nwobjectText("idvallug-datacondition-source"));
                        strMethod = strMethod.Substring(3);
                        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;

                    case "getlug-databindings-source":
                        emptyDT = (DataTable)JsonConvert.DeserializeObject(WebApp.nwobjectText("p8forw_datasource_source"), (typeof(DataTable)));
                        //emptyDT = dt_source; //dal.getlugdatabindingssource();
                        strMethod = strMethod.Substring(3);
                        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;

                    case "getlugsbtemplate":
                        strSQL = dal.getlugsbtemplate();
                        nwObject.ColumnSort("Code", "Asc");
                        strMethod = strMethod.Substring(3);
                        strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                        break;
                        

                }
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
                    p8forw_checklicense();
                    LoadRecent();
                    break;

                //case "actp8forw_createtemplate":
                //    string Code = CreateNew();
                //    LoadTemplate(Code);
                //    js.ADD("nwLoading_End('actp8forw_createtemplate')");
                //    break;
                case "actp8forw_loadtemplate":
                    string Code = WebApp.nwobjectTextSQL("txt-p8forw-code");
                    LoadTemplate(Code);
                    js.ADD("nwLoading_End('actp8forw_loadtemplate')");
                    break;
                case "actCreateGrid_datasource":
                    CreateGrid_datasource();
                    js.ADD("nwLoading_End('actCreateGrid_datasource')");
                    p8forw_checklicense();
                    break;
                case "actsave_datasource":
                    save_datasource();
                    js.ADD("nwLoading_End('actsave_datasource')");
                    break;
                case "actdelete_datasource":
                    delete_datasource();
                    js.ADD("nwLoading_End('actdelete_datasource')");
                    break;
                case "actcolor_datasourceps":
                    color_datasourceps();
                    js.ADD("nwLoading_End('actcolor_datasourceps')");
                    break;
                case "actcolor_datasourcer":
                    color_datasourcer();
                    js.ADD("nwLoading_End('actcolor_datasourcer')");
                    break;
                case "actcolor_datasourcepsh":
                    color_datasourcepsh();
                    js.ADD("nwLoading_End('actcolor_datasourcepsh')");
                    break;
                case "actCreateGrid_datasourcepsh":
                    CreateGrid_datasource_psh();
                    js.ADD("nwLoading_End('actCreateGrid_datasourcepsh')");
                    p8forw_checklicense();
                    break;
                case "actsave_datasourceps":
                    save_datasourceps();
                    js.ADD("nwLoading_End('actsave_datasourceps')");
                    break;
                case "actdelete_datasourceps":
                    delete_datasourceps();
                    js.ADD("nwLoading_End('actdelete_datasourceps')");
                    break;
                case "actdef_datasourcepsl":
                    string sourcetype = WebApp.nwobjectText("txtdatasourcepstype");
                    if (sourcetype == "P") {
                        DataTable dtdefparam = dal.getDefParameter(WebApp.nwobjectText("txtdatasourcepsdatasource"),
                            sourcetype, WebApp.nwobjectText("txtdatasourcepssource"));
                        try
                        {
                            js.makeValueText("#idvallugdatasourceadddatamainparam", dtdefparam.Rows[0]["code"].ToString());
                            js.makeValueText("#descvallugdatasourceadddatamainparam", dtdefparam.Rows[0]["parameter"].ToString());
                        }
                    catch{ }
                    }
                    js.ADD("nwLoading_End('actdef_datasourcepsl')");
                    break;
                case "actCreateGrid_datasourcepsl":
                    CreateGrid_datasource_psl();
                    js.ADD("nwLoading_End('actCreateGrid_datasourcepsl')");
                    break;
                case "actCreateGrid_datasourcepsc":
                    CreateGrid_datasource_psc();
                    p8forw_checklicense();
                    js.ADD("nwLoading_End('actCreateGrid_datasourcepsc')");
                    break;
                case "actsave_datasourcepsc":
                    save_datasourcepsc();
                    js.ADD("nwLoading_End('actsave_datasourcepsc')");
                    break;

                case "actCreateGrid_datasourcer":
                    CreateGrid_datasource_r();
                    p8forw_checklicense();
                    js.ADD("nwLoading_End('actCreateGrid_datasourcer')");
                    break;

                case "actsave_datasourcer":
                    save_datasourcer();
                    js.ADD("nwLoading_End('actsave_datasourcer')");
                    break;

                case "act_loadsbhdr":
                    Load_sbhdr();
                    js.ADD($@"p8forw_loadsbhdrdone()");
                    js.ADD("nwLoading_End('act_loadsbhdr')");
                    break;
                case "actCreateGrid_sbevent":
                    CreateGrid_sbevent(false);
                    js.ADD("nwLoading_End('actCreateGrid_sbevent')");
                    break;
                case "actCreateGrid_sbdrill":
                    CreateGrid_sbdrill(false);
                    js.ADD("nwLoading_End('actCreateGrid_sbdrill')");
                    break;
                //case "actCreateGrid_sb":
                //    CreateGrid_sb(false);
                //    js.ADD("nwLoading_End('actCreateGrid_sb')");
                //    break;
                case "actCreateGrid_sbc":
                    CreateGrid_sbc(false);
                    js.ADD("nwLoading_End('actCreateGrid_sbc')");
                    break;
                case "actCreateGrid_sbf":
                    CreateGrid_sbf(false);
                    js.ADD("nwLoading_End('actCreateGrid_sbf')");
                    break;
                case "actCreateGrid_sbp":
                    CreateGrid_sbp(false);
                    js.ADD("nwLoading_End('actCreateGrid_sbp')");
                    break;
                //case "actCreateGrid_sbpfixed":
                //    CreateGrid_sbpfixed(false);
                //    js.ADD("nwLoading_End('actCreateGrid_sbpfixed')");
                //    break;
                case "actCreateGrid_sbs":
                    CreateGrid_sbs(false);
                    //add this function on last grid as always.
                    //js.ADD("formatsqlselectsyntax_sb()");
                    js.ADD("nwLoading_End('actCreateGrid_sbs')");
                    break;
                //case "act_binddone":
                //    //add this function on last grid as always.
                //    js.ADD("p8forw_sb_binddone()");
                //    js.ADD("nwLoading_End('act_binddone')");
                //    break;
                    
                //02052024 end


                case "actsave_p8forw":
                    save_p8forw();
                    break;

                //case "actPreview":
                //    string strurl = WebApp.nwobjectText("url");
                //    string strtitle = WebApp.nwobjectText("title");
                //    strurl = nwSystem.StringEncryptAES(strurl);
                //    strurl = strurl.Replace("+", "AAGxAAG");

                //    strtitle = nwSystem.StringEncryptAES(strtitle);
                //    strtitle = strtitle.Replace("+", "AAGxAAG");


                //    js.ADD($"opennewTab('{strurl}', '{strtitle}')");

                //    js.ADD("nwLoading_End('actPreview')");
                //    break;
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

            js.ADD("actforw_mainload()");

        }

        //private void save_datasource()
        //{
        //   DataTable dt = LoadSchema_datasource(true);
        //   RecordOperationResult = dal.save_datasource(dt,based.SecurityAccess.RecUser);

        //    if (RecordOperationResult != String.Empty)
        //    {
        //        if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
        //        {
        //            Prompt.Information("Saved successfully", "Data Source");
        //        }
        //        else
        //        {
        //            Prompt.Error(RecordOperationResult, "Data Source");
        //        }
        //    }

        //}


        private void save_datasource()
        {
            RecordOperationResult = ValidateData_datasource("saved");
            if (string.IsNullOrWhiteSpace(RecordOperationResult))
            {
                DataTable dt = LoadSchema_datasource(true);
                RecordOperationResult = dal.save_datasource(dt);
            }
            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                {
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, eRecordOperation.Save);
                    Prompt.Information(RecordOperationResult, based.Title);
                    js.ADD("p8forw_datasource_refresh()");
                }
                else
                {
                    //Prompt.Error("Cannot be continued. Error found. please contact administrator", based.Title);
                    Prompt.Error(RecordOperationResult, based.Title);
                }
            }
        }

        private string ValidateData_datasource(string toolbox)
        {
            string errorResult = String.Empty;
            if (string.IsNullOrWhiteSpace(WebApp.nwobjectText("txtdatasourceadddataname")))
            {
                errorResult += "Cannot be " + toolbox + ". Name is required. \n";
            }
            if (string.IsNullOrWhiteSpace(WebApp.nwobjectText("idvallugdatasourceadddataconnectivity")))
            {
                errorResult += "Cannot be " + toolbox + ". Connectivity is required. \n";
            }
            if (string.IsNullOrWhiteSpace(WebApp.nwobjectText("idvallugdatasourceadddatasourcetype")))
            {
                errorResult += "Cannot be " + toolbox + ". Source Type is required. \n";
            }
            if (string.IsNullOrWhiteSpace(WebApp.nwobjectText("idvallugdatasourceadddatasource")))
            {
                errorResult += "Cannot be " + toolbox + ". Source is required. \n";
            }

            return errorResult;
        }

        private void save_datasourceps()
        {

            RecordOperationResult = ValidateData_datasourceps("saved");
            if (string.IsNullOrWhiteSpace(RecordOperationResult))
            {
                DataTable dt = LoadSchema_datasourcepsh(true);
                DataTable dtlin = LoadSchemaLin_datasourcepsl(true);
                RecordOperationResult = dal.save_datasourceps(dt,dtlin);
            }
            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                {
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, eRecordOperation.Save);
                    Prompt.Information(RecordOperationResult, based.Title);
                    js.ADD("p8forw_datasourceps_refresh()");
                }
                else
                {
                    //Prompt.Error("Cannot be continued. Error found. please contact administrator", based.Title);
                    Prompt.Error(RecordOperationResult, based.Title);
                }
            }
        }

        private string ValidateData_datasourceps(string toolbox)
        {
            string errorResult = String.Empty;

            if (string.IsNullOrWhiteSpace(WebApp.nwobjectText("txtdatasourcepsadddataname")))
            {
                errorResult += "Cannot be " + toolbox + ". Name is required. \n";
            }
            if (!string.IsNullOrWhiteSpace(WebApp.nwobjectText("idvallugdatasourceadddatamainparam")))
            {
                if (string.IsNullOrWhiteSpace("txtdatasourcepsadddatamainparamvalue"))
                {
                    errorResult += "Cannot be " + toolbox + ". Main Parameter Value is required. \n";
                }
            }

            //dtps = LoadSchemaLin_datasourceps(false);
            //int row = 0;
            //foreach (DataRow dr in dtps.Rows)
            //{
            //    row++;
            //    string ID = dr["ID"].ToString();
            //    string Name = dr["Name"].ToString();
            //    if (!string.IsNullOrWhiteSpace(ID))
            //    {
            //        if (string.IsNullOrWhiteSpace(Name))
            //        {
            //            errorResult += "Cannot be " + toolbox + ". Name in row " + row + " is required.\n";
            //        }
            //    }
            //}


            return errorResult;
        }

        private DataTable LoadSchema_datasourcepsh(bool Filter)
        {

            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema_datasourceps();
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["DataSourceID"] = WebApp.nwobjectText("txtdatasourcepsdatasourceid");
            dr["SubType"] = WebApp.nwobjectText("txtdatasourcepsadddatasubtype");
            dr["Name"] = WebApp.nwobjectText("txtdatasourcepsadddataname");
            dr["MainParam"] = WebApp.nwobjectText("idvallugdatasourceadddatamainparam");
            dr["MainParamValue"] = WebApp.nwobjectText("txtdatasourcepsadddatamainparamvalue");
            dr["RecUser"] = based.SecurityAccess.RecUser;
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion

            return dtHDR;

        }

        private DataTable LoadSchemaLin_datasourcepsl(bool Filter)
        {
            DataSet ds = WebApp.DataSet("nwGridCon_datasourcepsl");
            DataTable dtLin = new DataTable();
            try
            {
                dtLin = ds.Tables[0];
                int row = 0;
                foreach (DataColumn dc in dtLin.Columns)
                {
                    dc.ColumnName = "column" + row;
                    row++;
                }
                dtLin.AcceptChanges();
            }
            catch { }
            if (Filter)
            {
                dtLin = getFilteredGrid(dtLin, getGridColName(SPR_DAPSL_INCLUDE, true, "=", "'1'") + " or " + getGridColName(SPR_DAPSL_INITIALVALUE, true), "");
            }
            dtLin.Columns[getGridColName(SPR_DAPSL_INCLUDE, false)].ColumnName = "Include";
            dtLin.Columns[getGridColName(SPR_DAPSL_PARAM, false)].ColumnName = "Param";
            dtLin.Columns[getGridColName(SPR_DAPSL_DESC, false)].ColumnName = "Description";
            dtLin.Columns[getGridColName(SPR_DAPSL_INITIALVALUE, false)].ColumnName = "InitialValue";

            return dtLin;
        }


        private DataTable LoadSchema_datasource(bool Filter)
        {

            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema_datasource();
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["DataSourceID"] = WebApp.nwobjectText("txtdatasourceadddatadatasourceid");
            dr["Type"] = WebApp.nwobjectText("idvallugdatasourceadddatasourcetype");
            dr["DataSource"] = WebApp.nwobjectText("idvallugdatasourceadddataconnectivity");
            dr["TableName"] = WebApp.nwobjectText("idvallugdatasourceadddatasource");
            dr["Name"] = WebApp.nwobjectText("txtdatasourceadddataname");
            dr["DataSourceCreatedBy"] = based.SecurityAccess.RecUser;
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion

            return dtHDR;

        }


        private DataTable LoadSchemaLin_datasourcer(bool Filter)
        {
            DataSet ds = WebApp.DataSet("nwGridCon_datasourcer");
            DataTable dtLin = new DataTable();
            try
            {
                dtLin = ds.Tables[0];
                int row = 0;
                foreach (DataColumn dc in dtLin.Columns)
                {
                    dc.ColumnName = "column" + row;
                    row++;
                }
                dtLin.AcceptChanges();
            }
            catch { }
            if (Filter)
            {
                dtLin = getFilteredGrid(dtLin, getGridColName(SPR_DAR_USER, true), "");
            }
            dtLin.Columns[getGridColName(SPR_DAR_USER, false)].ColumnName = "UserID";

            return dtLin;
        }
        private void delete_datasource()
        {

            RecordOperationResult = dal.delete_datasource(WebApp.nwobjectText("DataSourceID"),based.SecurityAccess.RecUser);
            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                {
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, eRecordOperation.Save);
                    Prompt.Information(RecordOperationResult, based.Title);
                    js.ADD("p8forw_datasource_refresh()");
                }
                else
                {
                    //Prompt.Error("Cannot be continued. Error found. please contact administrator", based.Title);
                    Prompt.Error(RecordOperationResult, based.Title);
                }
            }
        }
        

        private void color_datasourceps()
        {
            bool hasdata = dal.hasdata_datasourceps(WebApp.nwobjectText("DataSourceID"));
            if (hasdata)
            {
                js.ADD("nwGridCon_datasource_Book.ActiveSheet.SetBackground((SPR_DA_PARAMETERSETUP - 1), _row, `green`)");
            }else
            {
                js.ADD("nwGridCon_datasource_Book.ActiveSheet.SetBackground((SPR_DA_PARAMETERSETUP - 1), _row, `orange`)");
            }
        }
        private void color_datasourcer()
        {
            bool hasdata = dal.hasdata_datasourcer(WebApp.nwobjectText("DataSourceID"));
            if (hasdata)
            {
                js.ADD("nwGridCon_datasource_Book.ActiveSheet.SetBackground((SPR_DA_RIGHTS - 1), _row, `green`)");
            }
            else
            {
                js.ADD("nwGridCon_datasource_Book.ActiveSheet.SetBackground((SPR_DA_RIGHTS - 1), _row, `orange`)");
            }
        }
        private void color_datasourcepsh()
        {
            bool hasdata = dal.hasdata_datasourcepsh(WebApp.nwobjectText("SubType"));
            if (hasdata)
            {
                js.ADD("nwGridCon_datasourcepsh_Book.ActiveSheet.SetBackground((SPR_DAPSH_COLUMN - 1), _row, `green`)");
            }
            else
            {
                js.ADD("nwGridCon_datasourcepsh_Book.ActiveSheet.SetBackground((SPR_DAPSH_COLUMN - 1), _row, `orange`)");
            }
        }
        private void delete_datasourceps()
        {

            RecordOperationResult = dal.delete_datasourceps(WebApp.nwobjectText("SubType"), based.SecurityAccess.RecUser);
            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                {
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, eRecordOperation.Save);
                    Prompt.Information(RecordOperationResult, based.Title);
                    js.ADD("p8forw_datasourceps_refresh()");
                }
                else
                {
                    //Prompt.Error("Cannot be continued. Error found. please contact administrator", based.Title);
                    Prompt.Error(RecordOperationResult, based.Title);
                }
            }
        }

        private void save_datasourcer()
        {
            RecordOperationResult = ValidateData_datasourcer("saved");
            if (string.IsNullOrWhiteSpace(RecordOperationResult))
            {
                DataTable dtLin = LoadSchemaLin_datasourcer(true);
                RecordOperationResult = dal.save_datasourcer(WebApp.nwobjectText("txtdatasourcerdatasourceid"),dtLin,based.SecurityAccess.RecUser);
            }
            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                {
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, eRecordOperation.Save);
                    Prompt.Information(RecordOperationResult, based.Title);
                    //js.ADD("p8forw_datasourcer_refresh()");
                }
                else
                {
                    //Prompt.Error("Cannot be continued. Error found. please contact administrator", based.Title);
                    Prompt.Error(RecordOperationResult, based.Title);
                }
            }
        }

        private string ValidateData_datasourcer(string toolbox)
        {
            string errorResult = String.Empty;
           
            return errorResult;
        }


        private DataTable LoadSchemaLin_datasourcepsc(bool Filter)
        {
            DataSet ds = WebApp.DataSet("nwGridCon_datasourcepsc");
            DataTable dtLin = new DataTable();
            try
            {
                dtLin = ds.Tables[0];
                int row = 0;
                foreach (DataColumn dc in dtLin.Columns)
                {
                    dc.ColumnName = "column" + row;
                    row++;
                }
                dtLin.AcceptChanges();
            }
            catch { }
            if (Filter)
            {
                string sourcetype = WebApp.nwobjectText("txtdatasourcepstype");
                if (sourcetype == "P")
                {
                    dtLin = getFilteredGrid(dtLin, getGridColName(SPR_DAPSC_COLUMN, true), "");
                }
                else
                {
                    dtLin = getFilteredGrid(dtLin, getGridColName(SPR_DAPSC_INCLUDE, true), "");
                }
            }
            dtLin.Columns[getGridColName(SPR_DAPSC_INCLUDE, false)].ColumnName = "include";
            dtLin.Columns[getGridColName(SPR_DAPSC_COLUMN, false)].ColumnName = "column";
            dtLin.Columns[getGridColName(SPR_DAPSC_ALIAS, false)].ColumnName = "alias";

            return dtLin;
        }

        private void save_datasourcepsc()
        {
            RecordOperationResult = ValidateData_datasourcepsc("saved");
            if (string.IsNullOrWhiteSpace(RecordOperationResult))
            {
                DataTable dtLin = LoadSchemaLin_datasourcepsc(true);
                RecordOperationResult = dal.save_datasourcepsc(WebApp.nwobjectText("txtdatasourcepscsubtype"), dtLin, based.SecurityAccess.RecUser);
            }
            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                {
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, eRecordOperation.Save);
                    Prompt.Information(RecordOperationResult, based.Title);
                    //js.ADD("p8forw_datasourcer_refresh()");
                }
                else
                {
                    //Prompt.Error("Cannot be continued. Error found. please contact administrator", based.Title);
                    Prompt.Error(RecordOperationResult, based.Title);
                }
            }
        }

        private string ValidateData_datasourcepsc(string toolbox)
        {
            string errorResult = String.Empty;

            return errorResult;
        }



        //string DataSourceColumnList = "";
        //private DataTable LoadSchema_datasourcecolumn(bool Filter)
        //{
        //    DataTable dt = JsonToDatatable(WebApp.nwobjectText("jsonnwGridCon_datasourcecolumn"));

        //    DataTable dtLin = new DataTable();
        //    dtLin = dal.LoadSchema_datasourcecolumn();
        //    foreach (DataRow items in dt.Rows)
        //    {
        //        string hasupdate = items["hasupdate"].ToString();
        //        if (hasupdate == "1")
        //        {
        //            string datasourceid = items["datasourceid"].ToString();
        //            DataSourceColumnList += datasourceid + "#P8#";
        //            DataRow dr = dtLin.NewRow();
        //            dr["datasourceid"] = datasourceid;
        //            dr["column"] = items["column"].ToString();
        //            dr["name"] = items["name"].ToString();
        //            dr["type"] = items["type"].ToString();
        //            dr["valuetype"] = items["valuetype"].ToString();
        //            dtLin.Rows.Add(dr);
        //        }

        //    }
        //    dtLin.AcceptChanges();
        //    DataSourceColumnList = DataSourceColumnList.Substring(0, DataSourceColumnList.Length - 4);
        //    return dtLin;
        //}



      


        public void CreateGrid_sbevent(bool initialize)
        {

            string gridID = "nwGridCon_sbevent";
            nwGrid m_spread = new nwGrid(gridID);
            m_spread.Type = nwGridType.SpreadCanvas;

            DataTable dt = new DataTable();
            DataTable jsondt = JsonToDatatable(WebApp.nwobjectText("jsonsbevent"));
            //DataTable dtDefault = dal.getDataGrid_sbevent(jsondt);

            if (jsondt?.Rows?.Count > 0)
            {
                dt = dal.getDataGrid_sbevent(26,jsondt);
            }
            if(dt == null || dt?.Rows?.Count <= 0) { 
                dt = dal.getDataGrid_sbevent(18);
            }
            dt.AcceptChanges();

            int minrow = 5;
            if (dt?.Rows?.Count > 0)
            {
                m_spread.dataSource(dt);
                //minrow = dt.Rows.Count;
                try { minrow = dt?.Rows?.Count < 5 ? minrow : dt.Rows.Count; } catch { }
                m_spread.minRow(minrow);
            }
            else
            {
                m_spread.CreateExcelGrid(minrow, SPR_SBE_CELLREFERENCE);
                m_spread.minRow(minrow);
            }

            m_spread.RowNumber(true);
            m_spread.RowHeight(25);
            m_spread.TableHeight(180);

            m_spread.nwobject(SPR_SBE_EVENT - 1).ColumnName("Event code");
            m_spread.nwobject(SPR_SBE_EVENTDESC - 1).ColumnName("Refresh Event");
            m_spread.nwobject(SPR_SBE_CELLREFERENCE - 1).ColumnName("Cell Reference");
            //frmlist.m_Spread.nwobject(SPR_DC_UNIQUECODE - 1).ColumnName("Unique Code");

            //m_spread.nwobject(SPR_DC_NAME - 1).Input("forwdataconditionname");
            //m_spread.nwobject(SPR_DC_NAME - 1).Enabled(true);

            m_spread.nwobject(SPR_SBE_EVENTDESC - 1).LookUp("lugsbeventevent", false, true);
            m_spread.nwobject(SPR_SBE_EVENTDESC - 1).Enabled(true);

            m_spread.nwobject(SPR_SBE_CELLREFERENCE - 1).Input("SPR_SBE_CELLREFERENCE");
            m_spread.nwobject(SPR_SBE_CELLREFERENCE - 1).Enabled(true);

            m_spread.nwobject(SPR_SBE_EVENT - 1).Width(0);
            m_spread.nwobject(SPR_SBE_EVENTDESC - 1).Width(150);
            m_spread.nwobject(SPR_SBE_CELLREFERENCE - 1).Width(150);
            //frmlist.m_Spread.nwobject(SPR_DC_UNIQUECODE - 1).Width(150);

            m_spread.nwobject(SPR_SBE_EVENT - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_SBE_EVENTDESC - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_SBE_CELLREFERENCE - 1).BackgroundColor("white");

            m_spread.buttonResetColumn = false;
            m_spread.buttonSaveColumn = false;
            m_spread.buttonSearchFind = false;
            m_spread.buttonInsert = true;
            m_spread.buttonDelete = true;
            m_spread.buttonCopyRow = true;

            //frmlist.m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

            m_spread.varSpreadBook = "nwGridCon_sbevent_Book";
            m_spread.varSpreadSheet = "nwGridCon_sbevent_Sheet";
            //## THEME FORMAT
            m_spread.SetTheme(nwGridTheme.Default);
            js.ADD(m_spread.createTable());


            js.ADD("nwGridCon_sbevent_Book.ActiveSheet.RenderStatus = false;");
            js.ADD("CreateGridDone_sbevent();");
            js.ADD("setTimeout(function(){ nwGridCon_sbevent_Book.ActiveSheet.RenderStatus = true;nwGridCon_sbevent_Book.ActiveSheet.Refresh() },100);");


        }



        

        public void CreateGrid_sbdrill(bool initialize)
        {

            string gridID = "nwGridCon_sbdrill";
            nwGrid m_spread = new nwGrid(gridID);
            m_spread.Type = nwGridType.SpreadCanvas;

            DataTable dt = new DataTable();
            DataTable jsondt = JsonToDatatable(WebApp.nwobjectText("jsonsbdrill"));
            //DataTable dtDefault = dal.getDataGrid_sbevent(jsondt);

            if (jsondt?.Rows?.Count > 0)
            {
                dt = jsondt;//dal.getDataGrid_sbdrill(26, jsondt);
            }
            //if (dt == null || dt?.Rows?.Count <= 0)
            //{
            //    dt = dal.getDataGrid_sbdrill(18);
            //}
            dt.AcceptChanges();

            int minrow = 5;
            if (dt?.Rows?.Count > 0)
            {
                m_spread.dataSource(dt);
                //minrow = dt.Rows.Count;
                try { minrow = dt?.Rows?.Count < 5 ? minrow : dt.Rows.Count; } catch { }
                m_spread.minRow(minrow);
            }
            else
            {
                m_spread.CreateExcelGrid(minrow, SPR_SBD_CELLDESTINATION);
                m_spread.minRow(minrow);
            }

            m_spread.RowNumber(true);
            m_spread.RowHeight(25);
            m_spread.TableHeight(180);

            m_spread.nwobject(SPR_SBD_CELLSOURCE - 1).Width(200);
            m_spread.nwobject(SPR_SBD_CELLSOURCE - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_SBD_CELLSOURCE - 1).ColumnName("Cell Source");
            m_spread.nwobject(SPR_SBD_CELLSOURCE - 1).Input("SPR_SBD_CELLSOURCE");
            m_spread.nwobject(SPR_SBD_CELLSOURCE - 1).Enabled(true);

            m_spread.nwobject(SPR_SBD_CELLDESTINATION - 1).Width(200);
            m_spread.nwobject(SPR_SBD_CELLDESTINATION - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_SBD_CELLDESTINATION - 1).ColumnName("Cell Destination");
            m_spread.nwobject(SPR_SBD_CELLDESTINATION - 1).Input("SPR_SBD_CELLREFERENCE");
            m_spread.nwobject(SPR_SBD_CELLDESTINATION - 1).Enabled(true);

            m_spread.buttonResetColumn = false;
            m_spread.buttonSaveColumn = false;
            m_spread.buttonSearchFind = false;
            m_spread.buttonInsert = true;
            m_spread.buttonDelete = true;
            m_spread.buttonCopyRow = true;

            //frmlist.m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

            m_spread.varSpreadBook = "nwGridCon_sbdrill_Book";
            m_spread.varSpreadSheet = "nwGridCon_sbdrill_Sheet";
            //## THEME FORMAT
            m_spread.SetTheme(nwGridTheme.Default);
            js.ADD(m_spread.createTable());


            js.ADD("nwGridCon_sbdrill_Book.ActiveSheet.RenderStatus = false;");
            js.ADD("CreateGridDone_sbdrill();");
            js.ADD("setTimeout(function(){ nwGridCon_sbdrill_Book.ActiveSheet.RenderStatus = true;nwGridCon_sbdrill_Book.ActiveSheet.Refresh() },100);");


        }

        //public void CreateGrid_sb(bool initialize)
        //{

        //    string gridID = "nwGridCon_sb";
        //    nwGrid m_spread = new nwGrid(gridID);
        //    m_spread.Type = nwGridType.SpreadCanvas;

        //    #region GRID

        //    #region Filter 
        //    DataTable dt = new DataTable();
        //    DataTable jsondt = JsonToDatatable(WebApp.nwobjectText("jsonsblin"));
        //    DataTable dtDefault = dal.getDataGrid_sb();
        //    #endregion
        //    if (jsondt?.Rows?.Count > 0)
        //    {
        //        dt = dtDefault.Clone();
        //        foreach (DataRow dr in jsondt.Rows)
        //        {
        //            dt.ImportRow(dr);
        //        }
        //    }
        //    else
        //    {
        //        dt = dtDefault.Copy();
        //    }
        //    dt.AcceptChanges();

        //    int minrow = 5;
        //    if (dt?.Rows?.Count > 0)
        //    {
        //        m_spread.dataSource(dt);
        //        //minrow = dt.Rows.Count;
        //        try { minrow = dt?.Rows?.Count < 5 ? minrow : dt.Rows.Count; } catch { }
        //        m_spread.minRow(minrow);
        //    }
        //    else
        //    {
        //        m_spread.CreateExcelGrid(minrow, SPR_SB_TYPEDESC);
        //        m_spread.minRow(minrow);
        //    }


        //    m_spread.RowNumber(true);
        //    m_spread.RowHeight(25);
        //    m_spread.TableHeight(350);


        //    m_spread.nwobject(SPR_SB_COLUMN - 1).ColumnName("Column");
        //    m_spread.nwobject(SPR_SB_NAME - 1).ColumnName("Column Name");
        //    m_spread.nwobject(SPR_SB_TYPE - 1).ColumnName("Type Code");
        //    m_spread.nwobject(SPR_SB_TYPEDESC - 1).ColumnName("Type");

        //    //frmlist.m_Spread.nwobject(SPR_DC_UNIQUECODE - 1).ColumnName("Unique Code");

        //    //m_spread.nwobject(SPR_DC_NAME - 1).Input("forwdataconditionname");
        //    //m_spread.nwobject(SPR_DC_NAME - 1).Enabled(true);

        //    //m_spread.nwobject(SPR_T_TYPE - 1).CheckBox(true, "SPR_T_TYPE");


        //    m_spread.nwobject(SPR_SB_COLUMN - 1).Input("SPR_SB_COLUMN");
        //    m_spread.nwobject(SPR_SB_COLUMN - 1).Enabled(true);
        //    m_spread.nwobject(SPR_SB_NAME - 1).Input("SPR_SB_NAME");
        //    m_spread.nwobject(SPR_SB_NAME - 1).Enabled(true);

        //    m_spread.nwobject(SPR_SB_TYPEDESC - 1).LookUp("luglookuptype", false, false);
        //    m_spread.nwobject(SPR_SB_TYPEDESC - 1).Enabled(true);


        //    m_spread.nwobject(SPR_SB_COLUMN - 1).Width(150);
        //    m_spread.nwobject(SPR_SB_NAME - 1).Width(150);
        //    m_spread.nwobject(SPR_SB_TYPE - 1).Width(75);
        //    m_spread.nwobject(SPR_SB_TYPEDESC - 1).Width(100);

        //    //frmlist.m_Spread.nwobject(SPR_DC_UNIQUECODE - 1).Width(150);

        //    m_spread.nwobject(SPR_SB_COLUMN - 1).BackgroundColor("white");
        //    m_spread.nwobject(SPR_SB_NAME - 1).BackgroundColor("white");
        //    m_spread.nwobject(SPR_SB_TYPE - 1).BackgroundColor("gainsboro");
        //    m_spread.nwobject(SPR_SB_TYPEDESC - 1).BackgroundColor("cyan");

        //    m_spread.buttonResetColumn = false;
        //    m_spread.buttonSaveColumn = false;
        //    m_spread.buttonSearchFind = false;
        //    m_spread.buttonInsert = true;
        //    m_spread.buttonDelete = true;

        //    //frmlist.m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

        //    m_spread.varSpreadBook = "nwGridCon_sb_Book";
        //    m_spread.varSpreadSheet = "nwGridCon_sb_Sheet";
        //    //## THEME FORMAT
        //    m_spread.SetTheme(nwGridTheme.Default);
        //    js.ADD(m_spread.createTable());


        //    js.ADD("nwGridCon_sb_Book.ActiveSheet.RenderStatus = false;");
        //    js.ADD("CreateGridDone_sb();");
        //    js.ADD("setTimeout(function(){ nwGridCon_sb_Book.ActiveSheet.RenderStatus = true;nwGridCon_sb_Book.ActiveSheet.Refresh() },500);");

        //    #endregion
        //}


        public void CreateGrid_sbf(bool initialize)
        {

            string gridID = "nwGridCon_sbf";
            nwGrid m_spread = new nwGrid(gridID);
            m_spread.Type = nwGridType.SpreadCanvas;

            #region GRID

            #region Filter 
            DataTable dt = new DataTable();

            DataTable jsondt = JsonToDatatable(WebApp.nwobjectText("jsonsbf"));
            string datasourcetype = WebApp.nwobjectText("idvallugsbdatasourcetype");
            //DataTable dtDefault = dal.getDataGrid_sbf(WebApp.nwobjectText("datasourcetype"));
            #endregion
            if (jsondt?.Rows?.Count > 0)
            {
                dt = dal.getDataGrid_sbf(datasourcetype, 23, jsondt);
            }
            if (dt == null || dt?.Rows?.Count <= 0)
            {
                dt = dal.getDataGrid_sbf(datasourcetype, 15);
            }

            ////if (jsondt?.Rows?.Count > 0)
            ////{
            //try
            //{
            //    dt = UpdateDataTableRows("column", dtDefault, dt);
            //    dt.AcceptChanges();
            //}
            //catch { }
            ////dt = dtDefault.Clone();
            ////foreach (DataRow dr in jsondt.Rows)
            ////{
            ////    dt.ImportRow(dr);
            ////}
            ////}
            ////else
            ////{
            ////    dt = dtDefault.Copy();
            ////}
            int minrow = 5;
            if (dt?.Rows?.Count > 0)
            {
                m_spread.dataSource(dt);
                //minrow = dt.Rows.Count;
                try { minrow = dt?.Rows?.Count < 5 ? minrow : dt.Rows.Count; } catch { }
                m_spread.minRow(minrow);
            }
            else
            {
                m_spread.CreateExcelGrid(minrow, SPR_SBF_CELLREFERENCE);
                m_spread.minRow(minrow);
            }

            ////dt = dal.getDataGrid_condition();
            //ListingAndPrint frmlist = new ListingAndPrint(ListingAndPrint.FormType.Empty1, 0, dt, "", UserDefinedConnectionString,
            //                                  SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName, "", false);

            // Added for new Spread
            //frmlist.SetSpreadType(nwGridType.SpreadCanvas);

            m_spread.RowNumber(true);
            m_spread.RowHeight(25);
            m_spread.TableHeight(180);


            m_spread.nwobject(SPR_SBF_COLUMN - 1).ColumnName("Column Code");
            m_spread.nwobject(SPR_SBF_COLUMNDESC- 1).ColumnName("Column/Field");
            //m_spread.nwobject(SPR_TW_NAME - 1).ColumnName("Column Name");
            m_spread.nwobject(SPR_SBF_OPERATION - 1).ColumnName("Operation Code");
            m_spread.nwobject(SPR_SBF_OPERATIONDESC - 1).ColumnName("Operation");
            m_spread.nwobject(SPR_SBF_VALUE - 1).ColumnName("Value");
            m_spread.nwobject(SPR_SBF_CELLREFERENCE - 1).ColumnName("Cell Reference");
            //frmlist.m_Spread.nwobject(SPR_TW_UNIQUECODE - 1).ColumnName("Unique Code");

            //m_spread.nwobject(SPR_SBF_COLUMN - 1).Input("SPR_SBW_COLUMN");
            //m_spread.nwobject(SPR_SBF_COLUMN - 1).Enabled(true);
            m_spread.nwobject(SPR_SBF_COLUMNDESC - 1).LookUp("lugsbfcolumn", false, true);
            m_spread.nwobject(SPR_SBF_COLUMNDESC - 1).Enabled(true);

            m_spread.nwobject(SPR_SBF_OPERATIONDESC - 1).LookUp("lugsbfoperation", false, false);
            m_spread.nwobject(SPR_SBF_OPERATIONDESC - 1).Enabled(true);

            m_spread.nwobject(SPR_SBF_VALUE - 1).Input("SPR_SBW_VALUE");
            m_spread.nwobject(SPR_SBF_VALUE - 1).Enabled(true);

            m_spread.nwobject(SPR_SBF_CELLREFERENCE - 1).Input("SPR_SBW_CELLREFERENCE");
            m_spread.nwobject(SPR_SBF_CELLREFERENCE - 1).Enabled(true);

            m_spread.nwobject(SPR_SBF_COLUMN - 1).Width(0);
            m_spread.nwobject(SPR_SBF_COLUMNDESC - 1).Width(125);
            m_spread.nwobject(SPR_SBF_OPERATION - 1).Width(0);
            m_spread.nwobject(SPR_SBF_OPERATIONDESC - 1).Width(75);
            m_spread.nwobject(SPR_SBF_VALUE - 1).Width(125);
            m_spread.nwobject(SPR_SBF_CELLREFERENCE - 1).Width(125);
            //frmlist.m_Spread.nwobject(SPR_TW_UNIQUECODE - 1).Width(150);


            m_spread.nwobject(SPR_SBF_COLUMN - 1).BackgroundColor("white");
            //m_spread.nwobject(SPR_TW_NAME - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_SBF_OPERATION - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_SBF_OPERATIONDESC - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_SBF_VALUE - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_SBF_CELLREFERENCE - 1).BackgroundColor("white");
            //frmlist.m_Spread.nwobject(SPR_TW_UNIQUECODE - 1).BackgroundColor("gainsboro");

            m_spread.buttonResetColumn = false;
            m_spread.buttonSaveColumn = false;
            m_spread.buttonSearchFind = false;
            m_spread.buttonInsert = true;
            m_spread.buttonDelete = true;
            m_spread.buttonCopyRow = true;

            //frmlist.m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

            m_spread.varSpreadBook = "nwGridCon_sbf_Book";
            m_spread.varSpreadSheet = "nwGridCon_sbf_Sheet";
            //## THEME FORMAT
            m_spread.SetTheme(nwGridTheme.Default);
            js.ADD(m_spread.createTable());


            js.ADD("nwGridCon_sbf_Book.ActiveSheet.RenderStatus = false;");
            js.ADD("CreateGridDone_sbf();");
            js.ADD("setTimeout(function(){ nwGridCon_sbf_Book.ActiveSheet.RenderStatus = true;nwGridCon_sbf_Book.ActiveSheet.Refresh() },1000);");

            #endregion
        }
        
        public void Load_sbhdr()
        {
            string udt = "dbo.udt_sidebar_hdr";
            DataTable udtdt = dal.GetUDTColumns(udt);
            DataTable jsondt = JsonToDatatable(WebApp.nwobjectText("jsonhdr"));
            if (jsondt?.Rows?.Count > 0)
            {
                foreach (DataRow dr in jsondt.Rows)
                {
                    udtdt.ImportRow(dr);
                }
            }
            DataTable dt = new DataTable();
            dt = dal.getDataGrid_sbhdr(udt, udtdt);
            if (dt?.Rows?.Count > 0) { 
                    DataRow dr = dt.Rows[0];
                    js.makeValueText("#txtsbobjecttype", GetColumnValue(dr, "objecttype"));
                    js.makeValueText("#idvallugsbsource", GetColumnValue(dr, "source"));
                    js.makeValueText("#descvallugsbsource", GetColumnValue(dr, "sourcedesc"));
                    js.makeValueText("#txtsbdatasourceid", GetColumnValue(dr, "datasourceid"));
                    js.makeValueText("#txtsbType", GetColumnValue(dr, "type"));
                    js.makeValueText("#idvallugsbdatasourcetype", GetColumnValue(dr, "datasourcetype"));
                    js.makeValueText("#descvallugsbdatasourcetype", GetColumnValue(dr, "datasourcetypedesc"));
                    js.makeProp("#chksbhidecolumnheader","checked", Parser.ParseBool(GetColumnValue(dr, "hidecolumnheader")));
                    js.makeProp("#chksbisoverwrite", "checked", Parser.ParseBool(GetColumnValue(dr, "overwrite")));
                    js.makeValueText("#txtsbsqlsyntax", GetColumnValue(dr, "sqlsyntax"));
                    js.makeValueText("#txtsbsqlcolumn", GetColumnValue(dr, "sqlcolumn"));
                    js.makeValueText("#txtsbsqlfilter", GetColumnValue(dr, "sqlfilter"));
                    js.makeValueText("#txtsbsqlsort", GetColumnValue(dr, "sqlsort"));
            
                //data condition
                js.makeProp("#chkaggregatesum", "checked", Parser.ParseBool(GetColumnValue(dr, "aggregatesum")));

                //drill
                js.makeValueText("#idvallugsbtemplate", GetColumnValue(dr, "template"));
                js.makeValueText("#descvallugsbtemplate", GetColumnValue(dr, "templatedesc"));


            }
        }

        public void CreateGrid_sbc(bool initialize)
        {
           
            DataTable dt = new DataTable();
            DataTable jsondt = JsonToDatatable(WebApp.nwobjectText("jsonsbc"));
            string datasourcetype = WebApp.nwobjectText("idvallugsbdatasourcetype");
            string udt = "[dbo].[udt_sidebar_column]";
            if (jsondt?.Rows?.Count > 0)
            {
                DataTable udtdt = dal.GetUDTColumns(udt);
                foreach (DataRow dr in jsondt.Rows)
                {
                    udtdt.ImportRow(dr);
                }
                dt = dal.getDataGrid_sbc(datasourcetype, 22, udt, udtdt);
                //DataTable dtDefault = dal.getDataGrid_sbc(WebApp.nwobjectText("idvallugsbdatasourcetype"),22);
                //try
                //{
                //    dt = UpdateDataTableRows("column", dtDefault, jsondt);
                //    dt.AcceptChanges();
                //}
                //catch { }
            }
            if (dt == null || dt?.Rows?.Count <= 0)
            {
                dt = dal.getDataGrid_sbc(datasourcetype, 14, udt);
            }
            string jsonstring = DatatableToJson(dt).Replace(@"""", @"\""").Replace(@"'", @"\'").Replace(@"`", @"\`");
            js.ADD($@"CreateGrid_sbc('{jsonstring}')");
        }
//        public void CreateGrid_sbpfixed(bool initialize)
//        {

//            string gridID = "nwGridCon_sbpfixed";
//            nwGrid m_spread = new nwGrid(gridID);
//            m_spread.Type = nwGridType.SpreadCanvas;

//            #region GRID

//            #region Filter 
//            DataTable dt = new DataTable();
//;
//            string datasourcetype = WebApp.nwobjectText("idvallugsbdatasourcetype");
//            #endregion
//                dt = dal.getDataGrid_sbpfixed(datasourcetype);

//            int minrow = 5;
//            if (dt?.Rows?.Count > 0)
//            {
//                m_spread.dataSource(dt);
//                //minrow = dt.Rows.Count;
//                try { minrow = dt?.Rows?.Count < 5 ? minrow : dt.Rows.Count; } catch { }
//                m_spread.minRow(minrow);
//            }
//            else
//            {
//                m_spread.CreateExcelGrid(minrow, SPR_SBPFIXED_CELLREFERENCE);
//                m_spread.minRow(minrow);
//            }

//            ////dt = dal.getDataGrid_condition();
//            //ListingAndPrint frmlist = new ListingAndPrint(ListingAndPrint.FormType.Empty1, 0, dt, "", UserDefinedConnectionString,
//            //                                  SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName, "", false);

//            // Added for new Spread
//            //frmlist.SetSpreadType(nwGridType.SpreadCanvas);

//            m_spread.RowNumber(true);
//            m_spread.RowHeight(25);
//            m_spread.TableHeight(180);


//            m_spread.nwobject(SPR_SBPFIXED_PARAM - 1).ColumnName("Parameter Code");
//            m_spread.nwobject(SPR_SBPFIXED_PARAMDESC - 1).ColumnName("Parameter");
//            m_spread.nwobject(SPR_SBPFIXED_VALUE - 1).ColumnName("Value");
//            m_spread.nwobject(SPR_SBPFIXED_CELLREFERENCE - 1).ColumnName("Cell Reference");
//            //frmlist.m_Spread.nwobject(SPR_TW_UNIQUECODE - 1).ColumnName("Unique Code");


//            //m_spread.nwobject(SPR_SBP_VALUE - 1).Input("SPR_SBP_VALUE");
//            //m_spread.nwobject(SPR_SBP_VALUE - 1).Enabled(true);

//            //m_spread.nwobject(SPR_SBP_CELLREFERENCE - 1).Input("SPR_SBP_CELLREFERENCE");
//            //m_spread.nwobject(SPR_SBP_CELLREFERENCE - 1).Enabled(true);

//            m_spread.nwobject(SPR_SBPFIXED_PARAM - 1).Width(0);
//            m_spread.nwobject(SPR_SBPFIXED_PARAMDESC - 1).Width(150);
//            m_spread.nwobject(SPR_SBPFIXED_VALUE - 1).Width(150);
//            m_spread.nwobject(SPR_SBPFIXED_CELLREFERENCE - 1).Width(0);

//            m_spread.nwobject(SPR_SBPFIXED_PARAM - 1).BackgroundColor("gainsboro");
//            m_spread.nwobject(SPR_SBPFIXED_PARAMDESC - 1).BackgroundColor("gainsboro");
//            m_spread.nwobject(SPR_SBPFIXED_VALUE - 1).BackgroundColor("gainsboro");
//            m_spread.nwobject(SPR_SBPFIXED_CELLREFERENCE - 1).BackgroundColor("gainsboro");

//            m_spread.buttonResetColumn = false;
//            m_spread.buttonSaveColumn = false;
//            m_spread.buttonSearchFind = false;
//            m_spread.buttonInsert = false;
//            m_spread.buttonDelete = false;

//            //frmlist.m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

//            m_spread.varSpreadBook = "nwGridCon_sbpfixed_Book";
//            m_spread.varSpreadSheet = "nwGridCon_sbpfixed_Sheet";
//            //## THEME FORMAT
//            m_spread.SetTheme(nwGridTheme.Default);
//            js.ADD(m_spread.createTable());


//            js.ADD("nwGridCon_sbpfixed_Book.ActiveSheet.RenderStatus = false;");
//            js.ADD("CreateGridDone_sbpfixed();");
//            js.ADD("setTimeout(function(){ nwGridCon_sbpfixed_Book.ActiveSheet.RenderStatus = true;nwGridCon_sbpfixed_Book.ActiveSheet.Refresh() },1000);");

//            #endregion
//        }
        public void CreateGrid_sbp(bool initialize)
        {

            string gridID = "nwGridCon_sbp";
            nwGrid m_spread = new nwGrid(gridID);
            m_spread.Type = nwGridType.SpreadCanvas;

            #region GRID

            #region Filter 
            DataTable dt = new DataTable();

            DataTable jsondt = JsonToDatatable(WebApp.nwobjectText("jsonsbp"));
            string datasourcetype = WebApp.nwobjectText("idvallugsbdatasourcetype");
            #endregion
            if (jsondt?.Rows?.Count > 0)
            {
                dt = dal.getDataGrid_sbp(datasourcetype, 24, jsondt);
            }
            if (dt == null || dt?.Rows?.Count <= 0)
            {
                dt = dal.getDataGrid_sbp(datasourcetype, 16);
            }

            //DataTable dtDefault = dal.getDataGrid_sbp(WebApp.nwobjectText("datasourcetype"));
            //#endregion
            ////if (jsondt?.Rows?.Count > 0)
            ////{
            //try
            //{
            //    dt = UpdateDataTableRows("param", dtDefault, dt);
            //    dt.AcceptChanges();
            //}catch { }
            //dt = dtDefault.Clone();
            //foreach (DataRow dr in jsondt.Rows)
            //{
            //    dt.ImportRow(dr);
            //}
            //}
            //else
            //{
            //    dt = dtDefault.Copy();
            //}
            int minrow = 5;
            if (dt?.Rows?.Count > 0)
            {
                m_spread.dataSource(dt);
                //minrow = dt.Rows.Count;
                try { minrow = dt?.Rows?.Count < 5 ? minrow : dt.Rows.Count; } catch { }
                m_spread.minRow(minrow);
            }
            else
            {
                m_spread.CreateExcelGrid(minrow, SPR_SBP_CELLREFERENCE);
                m_spread.minRow(minrow);
            }

            ////dt = dal.getDataGrid_condition();
            //ListingAndPrint frmlist = new ListingAndPrint(ListingAndPrint.FormType.Empty1, 0, dt, "", UserDefinedConnectionString,
            //                                  SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName, "", false);

            // Added for new Spread
            //frmlist.SetSpreadType(nwGridType.SpreadCanvas);

            m_spread.RowNumber(true);
            m_spread.RowHeight(25);
            m_spread.TableHeight(180);


            m_spread.nwobject(SPR_SBP_PARAM - 1).ColumnName("Parameter Code");
            m_spread.nwobject(SPR_SBP_PARAMDESC - 1).ColumnName("Parameter");
            m_spread.nwobject(SPR_SBP_VALUE - 1).ColumnName("Value");
            m_spread.nwobject(SPR_SBP_CELLREFERENCE - 1).ColumnName("Cell Reference");
            //frmlist.m_Spread.nwobject(SPR_TW_UNIQUECODE - 1).ColumnName("Unique Code");


            m_spread.nwobject(SPR_SBP_VALUE - 1).Input("SPR_SBP_VALUE");
            m_spread.nwobject(SPR_SBP_VALUE - 1).Enabled(true);

            m_spread.nwobject(SPR_SBP_CELLREFERENCE - 1).Input("SPR_SBP_CELLREFERENCE");
            m_spread.nwobject(SPR_SBP_CELLREFERENCE - 1).Enabled(true);

            m_spread.nwobject(SPR_SBP_PARAM - 1).Width(0);
            m_spread.nwobject(SPR_SBP_PARAMDESC - 1).Width(150);
            m_spread.nwobject(SPR_SBP_VALUE - 1).Width(150);
            m_spread.nwobject(SPR_SBP_CELLREFERENCE - 1).Width(150);

            m_spread.nwobject(SPR_SBP_PARAM - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_SBP_PARAMDESC - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_SBP_VALUE - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_SBP_CELLREFERENCE - 1).BackgroundColor("white");

            m_spread.buttonResetColumn = false;
            m_spread.buttonSaveColumn = false;
            m_spread.buttonSearchFind = false;
            m_spread.buttonInsert = false;
            m_spread.buttonDelete = false;

            //frmlist.m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

            m_spread.varSpreadBook = "nwGridCon_sbp_Book";
            m_spread.varSpreadSheet = "nwGridCon_sbp_Sheet";
            //## THEME FORMAT
            m_spread.SetTheme(nwGridTheme.Default);
            js.ADD(m_spread.createTable());


            js.ADD("nwGridCon_sbp_Book.ActiveSheet.RenderStatus = false;");
            js.ADD("CreateGridDone_sbp();");
            js.ADD("setTimeout(function(){ nwGridCon_sbp_Book.ActiveSheet.RenderStatus = true;nwGridCon_sbp_Book.ActiveSheet.Refresh() },1000);");

            #endregion
        }

        public void CreateGrid_sbs(bool initialize)
        {
            DataTable dt = new DataTable();
            DataTable jsondt = JsonToDatatable(WebApp.nwobjectText("jsonsbs"));
            string datasourcetype = WebApp.nwobjectText("idvallugsbdatasourcetype");
            if (jsondt?.Rows?.Count > 0)
            {
                dt = dal.getDataGrid_sbs(datasourcetype, 25, jsondt);
            }
            if (dt == null || dt?.Rows?.Count <= 0)
            {
                dt = dal.getDataGrid_sbs(datasourcetype, 17);
            }
         
            //DataTable dtDefault = dal.getDataGrid_sbs(WebApp.nwobjectText("idvallugsbdatasourcetype"));
            //if (jsondt?.Rows?.Count > 0)
            //{
            //    dt = jsondt;
            //    //try
            //    //{
            //    //    dt = UpdateDataTableRows("column", dtDefault, jsondt);
            //    //    dt.AcceptChanges();
            //    //}
            //    //catch { }
            //}
            //else
            //{
            //    dt = dtDefault;
            //}
            DataTable dtsort = dal.getsort();
            p8forw_combobox("sbsort", "cbxsort", SPR_SBS_SORT-1, dtsort);

            string jsonstring = DatatableToJson(dt).Replace(@"""", @"\""").Replace(@"'", @"\'").Replace(@"`", @"\`");
            js.ADD($@"CreateGrid_sbs('{jsonstring}')");
        }

        public void p8forw_combobox(string objectid,string id,int i,DataTable dtsort)
        {
            string jsonstring = DatatableToJson(dtsort).Replace(@"""", @"\""").Replace(@"'", @"\'").Replace(@"`", @"\`");
            js.ADD($@"p8forw_combobox('{objectid}','{id}','{i}','{jsonstring}')");
        }
        private void save_p8forw()
        {
            //string jsonString = WebApp.nwobjectText("p8forw_json");
            //jsonString = jsonString.Trim();

            //DataTable dt = JsonConvert.DeserializeObject<DataTable>(jsonString);

            DataTable dt = JsonToDatatable(WebApp.nwobjectText("p8forw_json"));
            string Code = "";
            try
            {
                Code = dt.Rows[0]["Code"].ToString();
            }
            catch { }
            bool isNewRow = WebApp.nwobjectBool("isNewRow");
           // int querytype = 71;
            RecordOperationResult = dal.save_p8forw(dt, based.SecurityAccess.RecUser, isNewRow); //querytype, 
            js.ADD("isNewRow = false;");
            if (isNewRow)
            {
                Code = RecordOperationResult;
                js.makeValueText("#txt-p8forw-code", Code);
                LoadTemplate(Code);
            }
            else
            {
                PromptMessage();
            }
            LoadRecent(Code);
        }


        private void PromptMessage()
        {
            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                {
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, eRecordOperation.Save);
                    Prompt.Information(RecordOperationResult, based.Title);
                }
                else
                {
                    //Prompt.Error("Cannot be continued. Error found. please contact administrator", based.Title);
                    Prompt.Error(RecordOperationResult, based.Title);
                }
            }
        }


        //updated 01/22/2024
        public void CreateGrid_datasource()
        {

            string gridID = "nwGridCon_datasource";
            nwGrid m_spread = new nwGrid(gridID);
            m_spread.Type = nwGridType.SpreadCanvas;

            #region GRID

            #region Filter 
            DataTable dt = new DataTable();
            //for (int i = 0; i < SPR_DA_COLUMN; i++)
            //{
            //    dt.Columns.Add("column" + (i + 1));
            //}
            //dt.AcceptChanges();
            #endregion

            dt = dal.getDataGrid_datasource();

            int minrow = 5;
            if (dt?.Rows?.Count > 0)
            {
                m_spread.dataSource(dt);
                // minrow = dt.Rows.Count;
                try { minrow = dt?.Rows?.Count < 5 ? minrow : dt.Rows.Count; } catch { }
                m_spread.minRow(minrow);
            }
            else
            {
                m_spread.CreateExcelGrid(5, SPR_DA_RIGHTSHASDATA);
                m_spread.minRow(minrow);
            }



            //ListingAndPrint frmlist = new ListingAndPrint(ListingAndPrint.FormType.Empty1, 0, dt, "", UserDefinedConnectionString,
            //                                  SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName, "", false);

            // Added for new Spread
            //frmlist.SetSpreadType(nwGridType.SpreadCanvas);

            m_spread.RowNumber(true);
            m_spread.RowHeight(25);
            m_spread.TableHeight(350);


            m_spread.nwobject(SPR_DA_DATASOURCEID           - 1).ColumnName("Data Source ID");
            m_spread.nwobject(SPR_DA_NAME                   - 1).ColumnName("Name");
            m_spread.nwobject(SPR_DA_DATASOURCE             - 1).ColumnName("Connectivity Code");
            m_spread.nwobject(SPR_DA_DATASOURCEDESC         - 1).ColumnName("Connectivity");
            m_spread.nwobject(SPR_DA_TYPE                   - 1).ColumnName("Source Type Code");
            m_spread.nwobject(SPR_DA_TYPEDESC               - 1).ColumnName("Source Type");
            m_spread.nwobject(SPR_DA_SOURCE                 - 1).ColumnName("Table/Function/View/SP");
            m_spread.nwobject(SPR_DA_PARAMETERSETUP         - 1).ColumnName("Data Source Type");
            m_spread.nwobject(SPR_DA_PARAMETERSETUPHASDATA  - 1).ColumnName("Data Source Type Has Data");
            m_spread.nwobject(SPR_DA_RIGHTS                 - 1).ColumnName("Rights");
            m_spread.nwobject(SPR_DA_RIGHTSHASDATA          - 1).ColumnName("Rights Has Data");


            m_spread.nwobject(SPR_DA_DATASOURCEID           - 1).Width(150);
            m_spread.nwobject(SPR_DA_NAME                   - 1).Width(200);
            m_spread.nwobject(SPR_DA_DATASOURCE             - 1).Width(0);
            m_spread.nwobject(SPR_DA_DATASOURCEDESC         - 1).Width(150);
            m_spread.nwobject(SPR_DA_TYPE                   - 1).Width(0);
            m_spread.nwobject(SPR_DA_TYPEDESC               - 1).Width(125);
            m_spread.nwobject(SPR_DA_SOURCE                 - 1).Width(150);
            m_spread.nwobject(SPR_DA_PARAMETERSETUP         - 1).Width(75);
            m_spread.nwobject(SPR_DA_PARAMETERSETUPHASDATA  - 1).Width(0);
            m_spread.nwobject(SPR_DA_RIGHTS                 - 1).Width(75);
            m_spread.nwobject(SPR_DA_RIGHTSHASDATA          - 1).Width(0);


            m_spread.nwobject(SPR_DA_DATASOURCEID           - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DA_NAME                   - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DA_DATASOURCE             - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DA_DATASOURCEDESC         - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DA_TYPE                   - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DA_TYPEDESC               - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DA_SOURCE                 - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DA_PARAMETERSETUP         - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DA_PARAMETERSETUPHASDATA  - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DA_RIGHTS                 - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DA_RIGHTSHASDATA          - 1).BackgroundColor("gainsboro");

            m_spread.nwobject(SPR_DA_PARAMETERSETUP - 1).ObjectType("button");
            m_spread.nwobject(SPR_DA_PARAMETERSETUP - 1).TextAlign("center");
            m_spread.nwobject(SPR_DA_PARAMETERSETUP - 1).TextColor("white");

            m_spread.nwobject(SPR_DA_RIGHTS - 1).ObjectType("button");
            m_spread.nwobject(SPR_DA_RIGHTS - 1).TextAlign("center");
            m_spread.nwobject(SPR_DA_RIGHTS - 1).TextColor("white");
            //m_spread.nwobject(SPR_DA_TYPEDESC - 1).LookUp("lugdatasourcetype", false, false);
            //m_spread.nwobject(SPR_DA_TYPEDESC - 1).Enabled(true);

            //m_spread.nwobject(SPR_DA_SOURCE - 1).Input("SPR_DA_SOURCE");
            //m_spread.nwobject(SPR_DA_SOURCE - 1).Enabled(true);
            //m_spread.nwobject(SPR_DA_NAME - 1).Input("SPR_DA_NAME");
            //m_spread.nwobject(SPR_DA_NAME - 1).Enabled(true);

            //m_spread.nwobject(SPR_DA_DATASOURCEID - 1).Width(150);
            //m_spread.nwobject(SPR_DA_SOURCE - 1).Width(200);
            //m_spread.nwobject(SPR_DA_NAME - 1).Width(200);
            //m_spread.nwobject(SPR_DA_TYPE - 1).Width(150);
            //m_spread.nwobject(SPR_DA_TYPEDESC - 1).Width(125);
            //m_spread.nwobject(SPR_DA_ISUPDATENEW - 1).Width(150);
            //m_spread.nwobject(SPR_DA_ISUSED - 1).Width(150);


            //m_spread.nwobject(SPR_DA_DATASOURCEID - 1).BackgroundColor("gainsboro");
            //m_spread.nwobject(SPR_DA_SOURCE - 1).BackgroundColor("white");
            //m_spread.nwobject(SPR_DA_NAME - 1).BackgroundColor("white");
            //m_spread.nwobject(SPR_DA_TYPE - 1).BackgroundColor("gainsboro");
            //m_spread.nwobject(SPR_DA_TYPEDESC - 1).BackgroundColor("cyan");
            //m_spread.nwobject(SPR_DA_ISUPDATENEW - 1).BackgroundColor("gainsboro");
            //m_spread.nwobject(SPR_DA_ISUSED - 1).BackgroundColor("gainsboro");


            m_spread.ButtonMenuAdd("DDAddData","Add Data",0);
            m_spread.ButtonMenuAdd("DDDeleteData", "Delete Data",1);
            m_spread.ButtonMenuAdd("DDModifiedData", "Modified Data", 1);
            m_spread.buttonResetColumn = false;
            m_spread.buttonSaveColumn = false;
            m_spread.buttonSearchFind = true;
            m_spread.buttonInsert = false;
            m_spread.buttonDelete = false;
            // frmlist.m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

            m_spread.varSpreadBook = "nwGridCon_datasource_Book";
            m_spread.varSpreadSheet = "nwGridCon_datasource_Sheet";
            //## THEME FORMAT
            m_spread.SetTheme(nwGridTheme.Default);
            js.ADD(m_spread.createTable());
            //js.ADD(frmlist.CreateScript("nwGridCon_datasource", "nwGridCon_datasource"));


            js.ADD("nwGridCon_datasource_Book.ActiveSheet.RenderStatus = false;");
            js.ADD("CreateGridDone_datasource();");
            js.ADD("setTimeout(function(){ nwGridCon_datasource_Book.ActiveSheet.RenderStatus = true;nwGridCon_datasource_Book.ActiveSheet.Refresh() },1000);");

            #endregion
        }


 
        public void CreateGrid_datasource_psh()
        {

        string gridID = "nwGridCon_datasourcepsh";
            nwGrid m_spread = new nwGrid(gridID);
            m_spread.Type = nwGridType.SpreadCanvas;

            #region GRID

            #region Filter 
            DataTable dt = new DataTable();
            //for (int i = 0; i < SPR_DA_COLUMN; i++)
            //{
            //    dt.Columns.Add("column" + (i + 1));
            //}
            //dt.AcceptChanges();
            #endregion

            dt = dal.getDataGrid_datasourcepsh(WebApp.nwobjectText("txtdatasourcepsdatasourceid"));

            int minrow = 5;
            if (dt?.Rows?.Count > 0)
            {
                m_spread.dataSource(dt);
                // minrow = dt.Rows.Count;
                try { minrow = dt?.Rows?.Count < 5 ? minrow : dt.Rows.Count; } catch { }
                m_spread.minRow(minrow);
            }
            else
            {
                m_spread.CreateExcelGrid(5, SPR_DAPSH_COLUMNHASDATA);
                m_spread.minRow(minrow);
            }


        //ListingAndPrint frmlist = new ListingAndPrint(ListingAndPrint.FormType.Empty1, 0, dt, "", UserDefinedConnectionString,
        //                                  SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName, "", false);

        // Added for new Spread
        //frmlist.SetSpreadType(nwGridType.SpreadCanvas);

        m_spread.RowNumber(true);
            m_spread.RowHeight(25);
            m_spread.TableHeight(180);



            m_spread.nwobject(SPR_DAPSH_SUBTYPE - 1).ColumnName("Sub Type");
            m_spread.nwobject(SPR_DAPSH_NAME - 1).ColumnName("Name");
            m_spread.nwobject(SPR_DAPSH_MAINPARAM - 1).ColumnName("Main Parameter");
            m_spread.nwobject(SPR_DAPSH_MAINPARAMVALUE - 1).ColumnName("Main Parameter Value");
            m_spread.nwobject(SPR_DAPSH_COLUMN - 1).ColumnName("Column/Field");
            m_spread.nwobject(SPR_DAPSH_COLUMNHASDATA - 1).ColumnName("Column Has Data");

            
            m_spread.nwobject(SPR_DAPSH_SUBTYPE - 1).Width(125);
            m_spread.nwobject(SPR_DAPSH_NAME - 1).Width(200);
            m_spread.nwobject(SPR_DAPSH_MAINPARAM - 1).Width(150);
            m_spread.nwobject(SPR_DAPSH_MAINPARAMVALUE - 1).Width(150);
            m_spread.nwobject(SPR_DAPSH_COLUMN - 1).Width(100);
            m_spread.nwobject(SPR_DAPSH_COLUMNHASDATA - 1).Width(0);

            
            m_spread.nwobject(SPR_DAPSH_SUBTYPE - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DAPSH_NAME - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DAPSH_MAINPARAM - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DAPSH_MAINPARAMVALUE - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DAPSH_COLUMN - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DAPSH_COLUMNHASDATA - 1).BackgroundColor("gainsboro");

            m_spread.nwobject(SPR_DAPSH_COLUMN - 1).ObjectType("button");
            m_spread.nwobject(SPR_DAPSH_COLUMN - 1).TextAlign("center");
            m_spread.nwobject(SPR_DAPSH_COLUMN - 1).TextColor("white");
            //m_spread.nwobject(SPR_DAPSH_NAME - 1).Input("forwdatasourcepshname");
            //m_spread.nwobject(SPR_DAPSH_NAME - 1).Enabled(true);

            //m_spread.nwobject(SPR_DAPSH_MAINPARAM - 1).Input("forwdatasourcepshmainparam");
            //m_spread.nwobject(SPR_DAPSH_MAINPARAM - 1).Enabled(true);

            //m_spread.nwobject(SPR_DAPSH_MAINPARAMVALUE - 1).Input("forwdatasourcepshmainparamvalue");
            //m_spread.nwobject(SPR_DAPSH_MAINPARAMVALUE - 1).Enabled(true);

            //m_spread.nwobject(SPR_DAPSH_SUBTYPE - 1).Input("forwdatasourcepshsubtype");
            //m_spread.nwobject(SPR_DAPSH_SUBTYPE - 1).Enabled(true);


            m_spread.ButtonMenuAdd("PSHAddData", "Add Data", 0);
            m_spread.ButtonMenuAdd("PSHDeleteData", "Delete Data", 1);
            m_spread.ButtonMenuAdd("PSHModifiedData", "Modified Data", 1);
            m_spread.buttonResetColumn = false;
            m_spread.buttonSaveColumn = false;
            m_spread.buttonSearchFind = true;
            m_spread.buttonInsert = false;
            m_spread.buttonDelete = false;
            // frmlist.m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

            m_spread.varSpreadBook = "nwGridCon_datasourcepsh_Book";
            m_spread.varSpreadSheet = "nwGridCon_datasourcepsh_Sheet";
            //## THEME FORMAT
            m_spread.SetTheme(nwGridTheme.Default);
            js.ADD(m_spread.createTable());
            //js.ADD(frmlist.CreateScript("nwGridCon_datasource", "nwGridCon_datasource"));


            js.ADD("nwGridCon_datasourcepsh_Book.ActiveSheet.RenderStatus = false;");
            js.ADD("CreateGridDone_datasourcepsh();");
            js.ADD("setTimeout(function(){ nwGridCon_datasourcepsh_Book.ActiveSheet.RenderStatus = true;nwGridCon_datasourcepsh_Book.ActiveSheet.Refresh() },1000);");

            #endregion
        }

        public void CreateGrid_datasource_psl()
        {

            string gridID = "nwGridCon_datasourcepsl";
            nwGrid m_spread = new nwGrid(gridID);
            m_spread.Type = nwGridType.SpreadCanvas;

            #region GRI
           
            DataTable dt = new DataTable();
            DataTable dtDefault = new DataTable();
            dtDefault = dal.getDataGrid_datasourcepsldefault(WebApp.nwobjectText("txtdatasourcepsdatasource"), WebApp.nwobjectText("txtdatasourcepstype"), WebApp.nwobjectText("txtdatasourcepssource"));

            try
            {
               dt = dal.getDataGrid_datasourcepsl(WebApp.nwobjectText("txtdatasourcepsadddatasubtype"));
               dt = UpdateDataTableRows("param", dtDefault, dt);

                //List<string> columnsToUpdate = new List<string> { "ColumnName1", "ColumnName2" };
                //dt = UpdateDataTableRows("param", dtDefault, dt, columnsToUpdate);

                //if (dt?.Rows?.Count > 0)
                //{
                //    js.ADD($"_jsonnwGridCon_datasourcepsl = {DatatableToJson(dt)}");
                //}
            }
            catch { }
            int minrow = 5;
            if (dt?.Rows?.Count > 0)
            {
                m_spread.dataSource(dt);
                 minrow = dt.Rows.Count;
               // try { minrow = dt?.Rows?.Count < 5 ? minrow : dt.Rows.Count; } catch { }
                m_spread.minRow(minrow);
            }
            else
            {
                m_spread.CreateExcelGrid(5, SPR_DAPSL_INITIALVALUE);
                m_spread.minRow(minrow);
            }


            //ListingAndPrint frmlist = new ListingAndPrint(ListingAndPrint.FormType.Empty1, 0, dt, "", UserDefinedConnectionString,
            //                                  SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName, "", false);

            // Added for new Spread
            //frmlist.SetSpreadType(nwGridType.SpreadCanvas);

            m_spread.RowNumber(true);
            m_spread.RowHeight(25);
            m_spread.TableHeight(180);

            
            m_spread.nwobject(SPR_DAPSL_INCLUDE - 1).ColumnName("Include");
            m_spread.nwobject(SPR_DAPSL_PARAM - 1).ColumnName("Parameter");
            m_spread.nwobject(SPR_DAPSL_DESC - 1).ColumnName("Description");
            m_spread.nwobject(SPR_DAPSL_INITIALVALUE - 1).ColumnName("Default Value");
            
            m_spread.nwobject(SPR_DAPSL_INCLUDE - 1).Width(75);
            m_spread.nwobject(SPR_DAPSL_PARAM - 1).Width(150);
            m_spread.nwobject(SPR_DAPSL_DESC - 1).Width(150);
            m_spread.nwobject(SPR_DAPSL_INITIALVALUE - 1).Width(150);

            m_spread.nwobject(SPR_DAPSL_INCLUDE - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_DAPSL_PARAM - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DAPSL_DESC - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_DAPSL_INITIALVALUE - 1).BackgroundColor("white");

            m_spread.nwobject(SPR_DAPSL_INCLUDE - 1).ObjectType("checkbox");
            m_spread.nwobject(SPR_DAPSL_INCLUDE - 1).Enabled(true);

            m_spread.nwobject(SPR_DAPSL_DESC - 1).Input("forwdatasourcepslparam");
            m_spread.nwobject(SPR_DAPSL_DESC - 1).Enabled(true);

            m_spread.nwobject(SPR_DAPSL_INITIALVALUE - 1).Input("forwdatasourcepslinitialvalue");
            m_spread.nwobject(SPR_DAPSL_INITIALVALUE - 1).Enabled(true);

            m_spread.buttonResetColumn = false;
            m_spread.buttonSaveColumn = false;
            m_spread.buttonSearchFind = true;
            m_spread.buttonInsert = false;
            m_spread.buttonDelete = false;
            // frmlist.m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

            m_spread.varSpreadBook = "nwGridCon_datasourcepsl_Book";
            m_spread.varSpreadSheet = "nwGridCon_datasourcepsl_Sheet";
            //## THEME FORMAT
            m_spread.SetTheme(nwGridTheme.Default);
            js.ADD(m_spread.createTable());
            //js.ADD(frmlist.CreateScript("nwGridCon_datasource", "nwGridCon_datasource"));


            js.ADD("nwGridCon_datasourcepsl_Book.ActiveSheet.RenderStatus = false;");
            js.ADD("CreateGridDone_datasourcepsl();");
            js.ADD("setTimeout(function(){ nwGridCon_datasourcepsl_Book.ActiveSheet.RenderStatus = true;nwGridCon_datasourcepsl_Book.ActiveSheet.Refresh() },100);");

            #endregion
        }



        public void CreateGrid_datasource_psc()
        {
           
            string gridID = "nwGridCon_datasourcepsc";
            nwGrid m_spread = new nwGrid(gridID);
            m_spread.Type = nwGridType.SpreadCanvas;

            #region GRI
            string sourcetype = WebApp.nwobjectText("txtdatasourcepstype");
            string SubType = WebApp.nwobjectText("txtdatasourcepscsubtype");
            DataTable dt = new DataTable();


            try
            {
                dt = dal.getDataGrid_datasourcepsc(WebApp.nwobjectText("txtdatasourcepscsubtype"));
                if (sourcetype == "V" || sourcetype == "U" || 
                    (sourcetype == "P" && dt.Rows.Count <= 0))
                {
                    DataTable dtDefault = new DataTable();
                    dtDefault = dal.getDataGrid_datasourcepscdefault(WebApp.nwobjectText("txtdatasourcepsdatasource"),
                    sourcetype, WebApp.nwobjectText("txtdatasourcepssource"), SubType);
                    dt = UpdateDataTableRows("column", dtDefault, dt);
                }
                //else if (sourcetype == "P")
                //{
                //    DataTable dtDefault = new DataTable();
                //    dtDefault = dal.getDataGrid_datasourcepscdefault(WebApp.nwobjectText("txtdatasourcepsdatasource"),
                //    sourcetype, WebApp.nwobjectText("txtdatasourcepssource"));
                //    dt = UpdateDataTableRows("column", dtDefault, dt);
                //}
            }
            catch { }
            int minrow = 5;
            if (dt?.Rows?.Count > 0)
            {
                m_spread.dataSource(dt);
                minrow = dt.Rows.Count;
                // try { minrow = dt?.Rows?.Count < 5 ? minrow : dt.Rows.Count; } catch { }
                m_spread.minRow(minrow);
            }
            else
            {
                m_spread.CreateExcelGrid(5, SPR_DAPSC_ALIAS);
                m_spread.minRow(minrow);
            }


            //ListingAndPrint frmlist = new ListingAndPrint(ListingAndPrint.FormType.Empty1, 0, dt, "", UserDefinedConnectionString,
            //                                  SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName, "", false);

            // Added for new Spread
            //frmlist.SetSpreadType(nwGridType.SpreadCanvas);

            m_spread.RowNumber(true);
            m_spread.RowHeight(25);
            m_spread.TableHeight(180);


            m_spread.nwobject(SPR_DAPSC_INCLUDE - 1).ColumnName("Include");
            m_spread.nwobject(SPR_DAPSC_COLUMN - 1).ColumnName("Column/Field");
            m_spread.nwobject(SPR_DAPSC_ALIAS - 1).ColumnName("Alias");

            m_spread.nwobject(SPR_DAPSC_INCLUDE - 1).Width(75);
            m_spread.nwobject(SPR_DAPSC_COLUMN - 1).Width(150);
            m_spread.nwobject(SPR_DAPSC_ALIAS - 1).Width(150);

            m_spread.nwobject(SPR_DAPSC_INCLUDE - 1).BackgroundColor("white");
            m_spread.nwobject(SPR_DAPSC_COLUMN - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DAPSC_ALIAS - 1).BackgroundColor("white");

            m_spread.nwobject(SPR_DAPSC_INCLUDE - 1).ObjectType("checkbox");
            m_spread.nwobject(SPR_DAPSC_INCLUDE - 1).Enabled(true);

            m_spread.nwobject(SPR_DAPSC_ALIAS - 1).Input("forwdatasourcepscalias");
            m_spread.nwobject(SPR_DAPSC_ALIAS - 1).Enabled(true);

            m_spread.buttonResetColumn = false;
            m_spread.buttonSaveColumn = false;
            m_spread.buttonSearchFind = true;
            m_spread.buttonInsert = false;
            m_spread.buttonDelete = false;
            //m_spread.ButtonMenuAdd("btnloadcolumn","Load Column");
            if (sourcetype == "P" || sourcetype == "FN")
            {
                m_spread.nwobject(SPR_DAPSC_INCLUDE - 1).Width(0);
                m_spread.nwobject(SPR_DAPSC_COLUMN - 1).BackgroundColor("white");
                m_spread.nwobject(SPR_DAPSC_COLUMN - 1).Input("forwdatasourcepsccolumn");
                m_spread.nwobject(SPR_DAPSC_COLUMN - 1).Enabled(true);
                m_spread.buttonInsert = true;
                m_spread.buttonDelete = true;

            }
      
            // frmlist.m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

            m_spread.varSpreadBook = "nwGridCon_datasourcepsc_Book";
            m_spread.varSpreadSheet = "nwGridCon_datasourcepsc_Sheet";
            //## THEME FORMAT
            m_spread.SetTheme(nwGridTheme.Default);
            js.ADD(m_spread.createTable());
            //js.ADD(frmlist.CreateScript("nwGridCon_datasource", "nwGridCon_datasource"));


            js.ADD("nwGridCon_datasourcepsc_Book.ActiveSheet.RenderStatus = false;");
            js.ADD("CreateGridDone_datasourcepsc();");
            js.ADD("setTimeout(function(){ nwGridCon_datasourcepsc_Book.ActiveSheet.RenderStatus = true;nwGridCon_datasourcepsc_Book.ActiveSheet.Refresh() },100);");

            #endregion
        }
        //public void CreateGrid_datasourcecolumn()
        //{
        //    string gridID = "nwGridCon_datasourcecolumn";
        //    nwGrid m_spread = new nwGrid(gridID);
        //    m_spread.Type = nwGridType.SpreadCanvas;

        //    #region GRID

        //    #region Filter 
        //    ReloadDataSourceColumn();
        //    //for (int i = 0; i < SPR_DA_COLUMN; i++)
        //    //{
        //    //    dt.Columns.Add("column" + (i + 1));
        //    //}
        //    //dt.AcceptChanges();
        //    #endregion

        //    //if (!initialize)
        //    //{
        //    //    dt = dal.getDataGrid_datasource();
        //    //}

        //    int minrow = 5;
        //    //if (dt?.Rows?.Count > 0)
        //    //{
        //    //    m_spread.dataSource(dt);
        //    //    // minrow = dt.Rows.Count;
        //    //    try { minrow = dt?.Rows?.Count < 5 ? minrow : dt.Rows.Count; } catch { }
        //    //    m_spread.minRow(minrow);
        //    //}
        //    //else
        //    //{
        //        m_spread.CreateExcelGrid(minrow, SPR_DAC_VALUETYPE);
        //        m_spread.minRow(minrow);
        //    //}

        //    //ListingAndPrint frmlist = new ListingAndPrint(ListingAndPrint.FormType.Empty1, 0, dt, "", UserDefinedConnectionString,
        //    //                                  SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName, "", false);

        //    // Added for new Spread
        //    //frmlist.SetSpreadType(nwGridType.SpreadCanvas);

        //    m_spread.RowNumber(true);
        //    m_spread.RowHeight(25);
        //    m_spread.TableHeight(350);

        //    m_spread.nwobject(SPR_DAC_COLUMN - 1).ColumnName("Column Name");
        //    m_spread.nwobject(SPR_DAC_NAME - 1).ColumnName("Display Name");
        //    m_spread.nwobject(SPR_DAC_TYPE - 1).ColumnName("Type Code");
        //    m_spread.nwobject(SPR_DAC_TYPEDESC - 1).ColumnName("Type");
        //    m_spread.nwobject(SPR_DAC_VALUETYPE - 1).ColumnName("Value Type");


        //    m_spread.nwobject(SPR_DAC_COLUMN - 1).Input("SPR_DAC_COLUMN");
        //    m_spread.nwobject(SPR_DAC_COLUMN - 1).Enabled(true);
        //    m_spread.nwobject(SPR_DAC_NAME - 1).Input("SPR_DAC_NAME");
        //    m_spread.nwobject(SPR_DAC_NAME - 1).Enabled(true);
        //    m_spread.nwobject(SPR_DAC_TYPEDESC - 1).LookUp("lugdatasourcecolumntype", false, false);
        //    m_spread.nwobject(SPR_DAC_TYPEDESC - 1).Enabled(true);

        //    m_spread.nwobject(SPR_DAC_COLUMN - 1).Width(200);
        //    m_spread.nwobject(SPR_DAC_NAME - 1).Width(200);
        //    m_spread.nwobject(SPR_DAC_TYPE - 1).Width(200);
        //    m_spread.nwobject(SPR_DAC_TYPEDESC - 1).Width(200);
        //    m_spread.nwobject(SPR_DAC_VALUETYPE - 1).Width(200);

        //    m_spread.nwobject(SPR_DAC_COLUMN - 1).BackgroundColor("white");
        //    m_spread.nwobject(SPR_DAC_NAME - 1).BackgroundColor("white");
        //    m_spread.nwobject(SPR_DAC_TYPE - 1).BackgroundColor("gainsboro");
        //    m_spread.nwobject(SPR_DAC_TYPEDESC - 1).BackgroundColor("cyan");
        //    m_spread.nwobject(SPR_DAC_VALUETYPE - 1).BackgroundColor("gainsboro");


        //    m_spread.buttonResetColumn = false;
        //    m_spread.buttonSaveColumn = false;
        //    m_spread.buttonSearchFind = true;
        //    m_spread.buttonInsert = true;
        //    m_spread.buttonDelete = true;

        //    // frmlist.m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

        //    m_spread.varSpreadBook = "nwGridCon_datasourcecolumn_Book";
        //    m_spread.varSpreadSheet = "nwGridCon_datasourcecolumn_Sheet";
        //    //## THEME FORMAT
        //    m_spread.SetTheme(nwGridTheme.Default);
        //    js.ADD(m_spread.createTable());
        //    //js.ADD(frmlist.CreateScript("nwGridCon_datasource", "nwGridCon_datasource"));


        //    js.ADD("nwGridCon_datasourcecolumn_Book.ActiveSheet.RenderStatus = false;");
        //    js.ADD("CreateGridDone_datasourcecolumn();");
        //    js.ADD("setTimeout(function(){ nwGridCon_datasourcecolumn_Book.ActiveSheet.RenderStatus = true;nwGridCon_datasourcecolumn_Book.ActiveSheet.Refresh() },200);");

        //    #endregion
        //}

        public void CreateGrid_datasource_r()
        {

            string gridID = "nwGridCon_datasourcer";
            nwGrid m_spread = new nwGrid(gridID);
            m_spread.Type = nwGridType.SpreadCanvas;

            #region GRID

            #region Filter 
            DataTable dt = new DataTable();
            //for (int i = 0; i < SPR_DA_COLUMN; i++)
            //{
            //    dt.Columns.Add("column" + (i + 1));
            //}
            //dt.AcceptChanges();
            #endregion

            dt = dal.getDataGrid_datasourcer(WebApp.nwobjectText("txtdatasourcerdatasourceid"));

            int minrow = 5;
            if (dt?.Rows?.Count > 0)
            {
                m_spread.dataSource(dt);
                // minrow = dt.Rows.Count;
                try { minrow = dt?.Rows?.Count < 5 ? minrow : dt.Rows.Count; } catch { }
                m_spread.minRow(minrow);
            }
            else
            {
                m_spread.CreateExcelGrid(5, SPR_DAR_USERDESC);
                m_spread.minRow(minrow);
            }

       
            //ListingAndPrint frmlist = new ListingAndPrint(ListingAndPrint.FormType.Empty1, 0, dt, "", UserDefinedConnectionString,
            //                                  SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString), based.SecurityAccess.RecUserName, "", false);

            // Added for new Spread
            //frmlist.SetSpreadType(nwGridType.SpreadCanvas);

            m_spread.RowNumber(true);
            m_spread.RowHeight(25);
            m_spread.TableHeight(180);

            m_spread.nwobject(SPR_DAR_USER - 1).ColumnName("User Code");
            m_spread.nwobject(SPR_DAR_USERDESC - 1).ColumnName("User");

            m_spread.nwobject(SPR_DAR_USER - 1).Width(0);
            m_spread.nwobject(SPR_DAR_USERDESC - 1).Width(175);

            m_spread.nwobject(SPR_DAR_USER - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DAR_USERDESC - 1).BackgroundColor("cyan");

            m_spread.nwobject(SPR_DAR_USERDESC - 1).LookUp("lugdatasourceruser", false, true);
            m_spread.nwobject(SPR_DAR_USERDESC - 1).Enabled(true);
            //m_spread.nwobject(SPR_DAPSH_NAME - 1).Input("forwdatasourcepshname");
            //m_spread.nwobject(SPR_DAPSH_NAME - 1).Enabled(true);

            //m_spread.nwobject(SPR_DAPSH_MAINPARAM - 1).Input("forwdatasourcepshmainparam");
            //m_spread.nwobject(SPR_DAPSH_MAINPARAM - 1).Enabled(true);

            //m_spread.nwobject(SPR_DAPSH_MAINPARAMVALUE - 1).Input("forwdatasourcepshmainparamvalue");
            //m_spread.nwobject(SPR_DAPSH_MAINPARAMVALUE - 1).Enabled(true);

            //m_spread.nwobject(SPR_DAPSH_SUBTYPE - 1).Input("forwdatasourcepshsubtype");
            //m_spread.nwobject(SPR_DAPSH_SUBTYPE - 1).Enabled(true);

            m_spread.buttonResetColumn = false;
            m_spread.buttonSaveColumn = false;
            m_spread.buttonSearchFind = true;
            m_spread.buttonInsert = false;
            m_spread.buttonDelete = true;
            // frmlist.m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

            m_spread.varSpreadBook = "nwGridCon_datasourcer_Book";
            m_spread.varSpreadSheet = "nwGridCon_datasourcer_Sheet";
            //## THEME FORMAT
            m_spread.SetTheme(nwGridTheme.Default);
            js.ADD(m_spread.createTable());
            //js.ADD(frmlist.CreateScript("nwGridCon_datasource", "nwGridCon_datasource"));


            js.ADD("nwGridCon_datasourcer_Book.ActiveSheet.RenderStatus = false;");
            js.ADD("CreateGridDone_datasourcer();");
            js.ADD("setTimeout(function(){ nwGridCon_datasourcer_Book.ActiveSheet.RenderStatus = true;nwGridCon_datasourcer_Book.ActiveSheet.Refresh() },1000);");

            #endregion
        }


        private void ReloadDataSourceColumn()
        {
            DataTable dt = new DataTable();
            try
            {
                dt = dal.getDataGrid_datasourcecolumn();
                if (dt?.Rows?.Count > 0)
                {
                    js.ADD($"_jsonnwGridCon_datasourcecolumn = {DatatableToJson(dt)}");
                }
            }
            catch { }
        }

     


      
        #region Standard Functionality

        private string getGridColName(int col, bool hasRemoveNull,string operator1 = "<>",string data = "''")
        {
            return string.Format("column{0} {1}", (col - 1).ToString(), hasRemoveNull ? operator1 + " "+data : "").Trim();

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
        static bool CheckIfExists(DataTable dataTable,string ColumnName, string Data)
        {
            // Use LINQ to check if the ID exists in the DataTable
            var matchingRows = dataTable.AsEnumerable()
                .Where(row => row.Field<string>(ColumnName) == Data);

            return matchingRows.Any();
        }


        static DataTable UpdateDataTableRows(string commonColumnName, DataTable mainTable, DataTable updateTable)
        {
            // Assuming "ID" is the common column between both DataTables
            //string commonColumnName = "ID";

            // LINQ join to match rows based on common column
            var query =
                from mainRow in mainTable.AsEnumerable()
                join updateRow in updateTable.AsEnumerable() on mainRow.Field<string>(commonColumnName) equals updateRow.Field<string>(commonColumnName)
                select new { mainRow, updateRow };

            // Update matching rows
            foreach (var pair in query)
            {
                DataRow mainRow = pair.mainRow;
                DataRow updateRow = pair.updateRow;

                // Update the columns in the main DataTable with values from the update DataTable
                foreach (DataColumn column in mainTable.Columns)
                {
                    if (updateRow.Table.Columns.Contains(column.ColumnName))
                    {
                        mainRow[column] = updateRow[column.ColumnName];
                    }
                }
            }
            return mainTable;
        }

        static string GetColumnValue(DataRow row, string columnName)
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

        private void p8forw_checklicense()
        {
            string licensetype = dal.getlicensetype();
            js.makeRemoveClass("#customToolbox", "license1 license2 license3");
            if (licensetype == "1")
            {
                js.makeAddClass("#customToolbox", "license1");
            }
            else if (licensetype == "2")
            {
                js.makeAddClass("#customToolbox", "license2");
            }
            else if (licensetype == "3")
            {
                js.makeAddClass("#customToolbox", "license3");
            }
        }


        #region LoadRecent
        private void LoadRecent(string Code = "")
        {
            string filtercode = "";
            if (!string.IsNullOrWhiteSpace(Code))
            {
                filtercode = $@" and (b.Code in ('{Code}')) ";
            }
            
            string sql = "";
            sql = $@"SELECT b.[Code],b.[Description], c.image  ,b.ModDate,b.RecDate
                            FROM P8.FORW b with(nolock)
                            left join [DD].[ReportGeneratorSC] c with(nolock)
                            on  b.[Code] =  c.[Code]
                            WHERE b.RecUser = '{based.SecurityAccess.RecUser}'
                            {filtercode}
                            ORDER by ISNULL(b.ModDate,b.RecDate) DESC
                            ";
            //offset {currrow} rows fetch next {maxrow} rows only
            //}
            DataTable dt = SFObject.LoadDataTable(sql, this.UserDefinedConnectionString);
            if (!string.IsNullOrWhiteSpace(Code))
            {
                js.JSONfromDataTable("_NSTemplateListTemp", dt);
                js.ADD("NOAHSpread_LoadRecent_Add()");
            }
            else
            {
                js.JSONfromDataTable("_NSTemplateList", dt);
                js.ADD("NOAHSpread_LoadRecentDone()");
            }
            
        }

        #endregion

        private void LoadTemplate(string Code)
        {
            DataTable json_datasource = new DataTable();
            try
            {
                int startindextemp = -1;
                DataSet ds = dal.LoadDocumentSet(Code);
                js.ADD("ToolLoad(" + JsonConvert.SerializeObject(ds.Tables[++startindextemp]) // json_datasource
               + ");");
            }
            catch { }
            js.ADD("nwLoading_End('actp8forw_loadtemplate')");
        }
    }
}