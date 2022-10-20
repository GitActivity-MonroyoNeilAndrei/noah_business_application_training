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
using System.Threading;
//using Newtonsoft.Json;    //Deprecated

namespace Noah_Web.forms_BusinessLayer
{
    public class SBTransferOfUnitBL : nwAction
    {
        #region Variables needed
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
        private string ToolboxOrderData = "";

        private const int
            SPR_ProjectCode = 1,
            SPR_ProjectName = 2,
            SPR_BlockFloor = 3,
            SPR_LotUnitSlotNo = 4,
            SPR_Customer = 5,
            SPR_HoldingDate = 6,
            SPR_HoldingExpiryDate = 7,
            SPR_HoldingExpiryExt = 8,
            SPR_QueueNo = 9,
            SPR_AgeinDays = 10,
            SPR_Docno = 11,
            SPR_Transfer = 12,
            SPR_UnitCode = 13;

        DataTable emptyDT = new DataTable();

        public string Result = "";
        public string Trantype = "STRNUN";
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
            dal = new SBTransferOfUnitDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        SBTransferOfUnitDAL dal;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public SBTransferOfUnitBL()
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
                        //InitializeValues();
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
                    case "11":
                        BindHeader();
                        js.ADD("func_Refresh();");
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
            string strFinal = String.Empty;
            string strRet = String.Empty;
            string sqlOrig = sql;

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
            strConn = this.UserDefinedConnectionString;

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.inquireQuery_popup();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugLocform":
                    strSQL = dal.getLocForm(based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugReason":
                    strSQL = dal.getReason();
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                //added from submenu folder
                case "getpopup-default-Inquire":
                    strSQL = dal.inquireQuery_popup();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                    break;

                case "getlugLocAccForms":
                    strSQL = dal.lugLocAccForms_popup();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugReTranUnit":
                    strSQL = dal.lugReTranUnit_popup();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    //nwObject.ColumnHide(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugRefHoldTrans":
                    strSQL = dal.lugRefHoldTrans_popup();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "gettxtDocNo":
                    strSQL = dal.txtDocNo_popup();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "gettxtDocDate":
                    strSQL = dal.txtDocDate_popup();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugNewUnit":
                    strSQL = dal.lugNewUnit_popup();
                    //nwObject.ColumnSort("Code", "asc");
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;



            }
            return strFinal;
        }

        ///// Standard RecordOperation
        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";
            RecordOperationResult = string.Empty;

            switch (i)
            {
                case eRecordOperation.AddNew:
                    nwToolBox.bindingNavigatorSaveItem.Enable = true;
                    nwToolBox.bindingNavigatorAddNewItem.Enable =
                    nwToolBox.bindingNavigatorPrintItem.Enable =
                    nwToolBox.bindingNavigatorInquireItem.Enable =
                    nwToolBox.bindingNavigatorImportItem.Visible =
                    nwToolBox.bindingNavigatorDeleteItem.Enable =
                    nwToolBox.bindingNavigatorDeleteItem.Visible =
                    nwToolBox.bindingNavigatorExportItem.Enable = false;

                    //added from submenu folder
                    //js.ADD("ClearFields();");
                    //js.makeValueText("#txtDocDate", dal.txtDocDate_popup().ToString());

                    //string locaccforms = "";
                    //string container = "";
                    //if (HttpContext.Current != null)
                    //{
                    //    var request = HttpContext.Current.Request;
                    //    locaccforms = WebApp.nwobjectText("locaccforms");
                    //    container = dal.txtidvalLugLocAccForms_popup(locaccforms);
                    //    js.makeValueText("#idvallugLocAccForms", container);
                    //    js.makeValueText("#descvallugLocAccForms", dal.txtdescvalLugLocAccForms_popup(locaccforms));
                    //}

                    //InitializeValues();

                    break;

                case eRecordOperation.Save:

                    //added from submenu folder

                    

                    RecordOperationResult = ValidateData_popup();

                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dt = new DataTable();

                        dt = LoadSchema_popup();
                        RecordOperationResult = dal.SaveData_popup(dt, isNewRow, Trantype);

                        string docnum = "";
                        string docno = "";
                        docnum = dal.txtDocNo_popup().ToString();
                        docno = WebApp.nwobjectText("idvallugLocAccForms") + "-STRNUN-" + docnum;

                        js.ADD("$('#txtDocNo').val('" + docno + "')");

                        //js.makeValueText("#txtDocNo", docno);

                        nwToolBox.bindingNavigatorProcessItem.Enable = true;

                    }



                    tempstr = "Save";
                    Prompt.Information(tempstr, based.Title);
                    js.ADD("EnableFieldsDone();");

                    break;

                case eRecordOperation.Delete:
                    //RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("txtCode"));
                    //if (RecordOperationResult == "")
                    //    RecordOperationResult = "Deleted successfully";

                    //added from submenu folder
                    string deldocno = WebApp.nwobjectText("txtDocNo");
                    RecordOperationResult = dal.deletedata_popup(deldocno);

                    tempstr = "Delete";
                    Prompt.Information(tempstr, based.Title);

                    break;

                case eRecordOperation.Process:
                    ProcessData();
                    tempstr = "Process";
                    Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Refresh:
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
                    string LISTINGFILENAME = "";
                    if (dal.LISTINGFILENAME + " Listing" == "") LISTINGFILENAME = "Sheet 1";
                    else LISTINGFILENAME = dal.LISTINGFILENAME + " Listing";

                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, dal.LISTINGSTARTROW, dal.LISTINGQUERY(),
                                                           LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
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

                    break;

                case eRecordOperation.Print:
                    tempstr = "print";
                    break;

                case eRecordOperation.Closing:
                    RecordOperationResult = AreValidEntries(0);
                    if (RecordOperationResult.Length <= 0)
                    {
                        isNewRow = checkIsNewRow();
                        DataTable dtHDR = LoadSchemaHDR();
                        RecordOperationResult = dal.SaveData(dtHDR, isNewRow, 0);
                    }
                    break;

                case eRecordOperation.Search:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("txtTransactionNo"));
                    if (RecordOperationResult.ToLower().Contains("success"))
                        RecordOperationResult = "Deleted successfully";
                    break;

            }
            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.IndexOf("Error") != 0 && RecordOperationResult.IndexOf("Cannot save") != 0)
                {
                    BindHeader();
                    js.ADD("func_Refresh();");
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
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                //newly added
                case "actbtnAdd":
                    InitializeValues_popup();
                    js.ADD("func_ToolboxADD();");
                    js.ADD("nwLoading_End('actbtnAdd')");
                    break;


                case "actSave":
                    js.makeValueText("#txtDocDate", dal.txtDocDate_popup().ToString());

                    RecordOperationResult = ValidateData_popup();

                    if (RecordOperationResult.Length <= 0)
                    {
                        //DataTable dt = new DataTable();

                        //dt = LoadSchema_popup();
                        //RecordOperationResult = dal.SaveData_popup(dt, isNewRow, Trantype);

                        //string docnum = "";
                        //string docno = "";
                        //docnum = dal.txtDocNo_popup().ToString();
                        //docno = WebApp.nwobjectText("idvallugLocAccForms") + "-STRNUN-" + docnum;

                        //js.ADD("$('#txtDocNo').val('" + docno + "')");

                        //js.makeValueText("#txtDocNo", docno);



                        nwToolBox.bindingNavigatorProcessItem.Enable = true;
                    }
                    break;


                //case "actbtnInquire":
                //    js.ADD("func_ToolboxInquire();");
                //    js.ADD("nwLoading_End('actInquire')");
                //    break;

                //case "actInquire":

                //    string strFinal = "";
                //    string strSQL = "";
                //    string mouseDownFunc = "";
                //    string mouseOverFunc = "";

                //    strSQL = dal.inquireQuery();
                //    strMethod = strMethod.Substring(3);
                //    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                //    js.ADD("nwLoading_End('actInquire')");
                //    break;


                //-----------------------

                case "actBindCollection":
                    BindCollection();
                    break;

                case "actBindCollectionEmpty":
                    js.ADD("nwLoading_End('xSample')");
                    break;

                case "actRefresh":
                    js.ADD("nwLoading_End('actRefresh')");
                    break;

                case "actbtnRefresh":

                    ShowHDR();

                    js.ADD("func_Refresh();");
                    js.ADD("nwLoading_End('actbtnRefresh')");
                    break;

                case "actLoadRequest":
                    DataTable displaydoc = new DataTable();

                    js.makeValueText("#txtDocDate", dal.txtDocDate_popup().ToString());

                    //displaydoc = dal.displaydoc_popup(locaccforms);

                    ShowHDR();

                    js.ADD("func_Refresh();");

                    //hasQueue = dal.getQueue(WebApp.nwobjectText("refDocno"), WebApp.nwobjectText("unitC"));
                    //if (hasQueue.Rows.Count > 1)
                    //{  //has queue can't request
                    //    Prompt.Error("Cannot Proceed. There is queue for this Unit.", based.Title);
                    //}
                    //else
                    //{    //has no queue, Proceed
                    //    if (checkIsNewRow() && WebApp.nwobjectText("refDocno") == "")
                    //    {
                    //        LoadNew();
                    //    }
                    //    else
                    //    {
                    //BindHeader();
                    //js.ADD("func_Refresh();");
                    //    }
                    //}

                    js.ADD("nwLoading_End('actLoadRequest')");
                    break;

                case "actProcess":
                    RecordOperationResult = AreValidEntries(0);
                    if (RecordOperationResult.Length <= 0)
                    {
                        isNewRow = checkIsNewRow();
                        DataTable dtHDR = LoadSchemaHDR();
                        RecordOperationResult = dal.SaveData(dtHDR, isNewRow, 1);
                    }

                    if (RecordOperationResult.ToLower().Contains("success"))
                    {
                        var RowCounter_actProcess = Int32.Parse(dal.rowcounter());
                        if (RowCounter_actProcess != 0)
                        {
                            HeaderToU();
                        }
                        Prompt.Information("Process completed", based.Title);
                        js.ADD("func_Refresh();");
                    }
                    else
                    {
                        Prompt.Error(RecordOperationResult, based.Title);
                    }
                    js.ADD("nwLoading_End('actProcess')");
                    break;

                case "actHasRqrdCompli":
                    setRqmtCompProp();
                    js.ADD("nwLoading_End('actHasRqrdCompli')");
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
                    //strFinal = getToolBoxDataRet(tableName, dal.GetData(), this.UserDefinedConnectionString, "1", "50");
                    break;


                //newly added
                case "toolbox_popup":
                    nwStandardBL standardBL_popup = new nwStandardBL(WebApp);
                    standardBL_popup.PrimaryKey = "docno";
                    strFinal = standardBL_popup.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator_popup", dal.GetData_popup(), this.UserDefinedConnectionString);
                    //strFinal = getToolBoxDataRet(tableName, dal.GetData(), this.UserDefinedConnectionString, "1", "50");
                    break;
            }



            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            //SFObject.SetControlBinding("#txtCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Code");
            //SFObject.SetControlBinding("#txtDescription", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Description");

            //added from submenu folder
            SFObject.SetControlBinding("#idvallugLocAccForms", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "locform");
            SFObject.SetControlBinding("#descvallugLocAccForms", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "locdesc");
            SFObject.SetControlBinding("#idvallugReTranUnit", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "reasonfortransunit");
            SFObject.SetControlBinding("#descvallugReTranUnit", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "resdesc");
            SFObject.SetControlBinding("#idvallugNewUnit", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "newunit");
            SFObject.SetControlBinding("#descvallugNewUnit", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "unitdesc");
            SFObject.SetControlBinding("#descvallugRefHoldTrans", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "refholdtrans");

            SFObject.SetControlBinding("#txtRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "remarks");
            SFObject.SetControlBinding("#txtDocNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "docno");
            SFObject.SetControlBinding("#txtDocStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "docstatdesc");
            SFObject.SetControlBinding("#txtDocDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "docdate");
            SFObject.SetControlBinding("#txtReasDis", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "reasonfordisapproval");
            SFObject.SetControlBinding("#txtRemDis", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "remarksfordisapproval");

            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");
        }

        private bool checkIsNewRow()
        {
            bool checkIsNewRow = dal.isExist(WebApp.nwobjectText("txtRefDocno"), based.SecurityAccess.RecUser, 1) == 1 ? false : true;
            return checkIsNewRow;
        }

        private void LoadNew()
        {
            js.ADD("$('.noah-webui-Footer-SubMod').css('display', 'none')");
            isNewRow = true;
            js.ADD("isNewRow=true;");

            DataTable dtDefault = dal.getDefault(based.SecurityAccess.RecUser);
            if (dtDefault.Rows.Count >= 1)
            {
                DataRow r = dtDefault.Rows[0];
                js.makeValueText("#idvallugLocform", r["DefaultLocAcctblFormsCode"].ToString());
                js.makeValueText("#descvallugLocform", r["Description"].ToString());
            }

            js.ADD("$('#lugLocform').enable(true)");
            js.ADD(" $('.req').css('display', 'none')");

            DataTable dtNewExpDate = dal.getNewExpiryDate(WebApp.nwobjectText("txtRefDocno"), based.SecurityAccess.RecUser);
            if (dtNewExpDate.Rows.Count >= 1)
            {
                DataRow r = dtNewExpDate.Rows[0];
                js.makeValueText("#txtRequestDate", r["serverDate"].ToString());
                js.makeValueText("#txtHoldingExpiryDate", r["newExpiryDate"].ToString());
            }

            js.ADD("EnableFields()");
        }

        private void BindHeader()
        {
            //js.ADD("ClearFields();");
            string nwDocno = WebApp.nwobjectText("refDocno");

            DataTable dtHDR = dal.LoadDataBind(WebApp.nwobjectText("txtRefDocno"), based.SecurityAccess.RecUser, nwDocno);
            if (dtHDR.Rows.Count >= 1)
            {
                DataRow r = dtHDR.Rows[0];
                js.makeValueText("#idvallugLocform", r["locform"].ToString());
                js.makeValueText("#descvallugLocform", r["locformDesc"].ToString());
                js.makeValueText("#idvallugReason", r["reasonForExtension"].ToString());
                js.makeValueText("#descvallugReason", r["reasonForExtensionDesc"].ToString());
                js.makeValueText("#txtIsReq", r["isReqRemarks"].ToString());
                js.makeValueText("#txtRemarks", r["remarks"].ToString());
                js.makeValueText("#txtTransactionNo", r["docno"].ToString());
                js.makeValueText("#txtRequestDate", r["requestDate"].ToString());
                js.makeValueText("#txtHoldingExpiryDate", r["extendedExpiryDate"].ToString());
                js.makeValueText("#txtStatus", r["statusDesc"].ToString());
                js.makeValueText("#txtStatusCode", r["status"].ToString());
                js.makeValueText("#txtRefDocno", r["refDocno"].ToString());
                js.makeValueText("#txtReason", r["reasonReturn"].ToString());
                js.makeValueText("#txtReturnRemarks", r["RemarksDisapproval"].ToString());

                //Footer
                js.makeText("#nwtxt_RecUser", r["recuser"].ToString());
                js.makeText("#nwtxt_RecDate", r["recdate"].ToString());
                js.makeText("#nwtxt_ModUser", r["moduser"].ToString());
                js.makeText("#nwtxt_ModDate", r["moddate"].ToString());
                if (r["moduser"].ToString() != "")
                { js.ADD("$('.noah-webui-Footer-SubMod').css('display', 'inline')"); }
                else { js.ADD("$('.noah-webui-Footer-SubMod').css('display', 'none')"); }
                js.ADD("EnableFieldsDone() ");
            }
            //NOTE: not sure if need
            else
            {
                if (dal.isExist(WebApp.nwobjectText("txtRefDocno"), based.SecurityAccess.RecUser, 0) == 1)
                {
                    js.ADD("func_DisableHasData()");
                }
                else
                {
                    LoadNew();
                    js.ADD("DisableFieldsEmpty()");
                }
            }
        }
        private void BindCollection()
        {
            js.ADD("nwLoading_End('actbindcollection');");
        }

        private string AreValidEntries(int tag)
        {
            string errorResult = String.Empty;
            string process = "";
            if (tag == 0)
            {
                process = "saved";
            }
            else
            {
                process = "processed";
            }

            if (WebApp.nwobjectText("idvallugLocform").Length <= 0)
                errorResult += $"Cannot be {process}. Location with Accountable Forms is required.\n";

            if (WebApp.nwobjectText("idvallugReason").Trim().Length <= 0)
                errorResult += $"Cannot be {process}. Reason for Extension is required.\n";

            return errorResult;
        }

        private DataTable LoadSchemaHDR()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchemaHDR();
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["docno"] = WebApp.nwobjectText("txtTransactionNo");
            dr["locform"] = WebApp.nwobjectText("idvallugLocform");
            dr["reasonForExtension"] = WebApp.nwobjectText("idvallugReason");
            dr["remarks"] = WebApp.nwobjectText("txtRemarks");
            dr["extendedExpiryDate"] = WebApp.nwobjectText("txtHoldingExpiryDate");
            dr["status"] = WebApp.nwobjectText("txtStatusCode") == "" ? "1" : WebApp.nwobjectText("txtStatusCode");
            dr["refDocno"] = WebApp.nwobjectText("txtRefDocno");
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
            if (based.isInterface == true) dal.UpdateVersion();

            GenerateGrid(true);

            DateTime currentDate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
            js.ADD("$('#srvrDt').text('" + currentDate.ToString("MM/dd/yyyy hh:mm:ss tt") + "')");

            LoadComboBox();

            js.makeValueText("#txtServerlink", dal.getServerlink());

            Data_Enable_popup();
        }

        private void LoadComboBox()
        {
            js.makeComboBox("#cmbProject", dal.LoadProject());
        }

        private void RefreshData()
        {
            GenerateGrid(true);

            DateTime currentDate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
            js.ADD("$('#srvrDt').text('" + currentDate.ToString("MM/dd/yyyy hh:mm:ss tt") + "')");

            //added from submenu folder
            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid_popup\", \"toolbox_popup\")"); // goto: getToolBoxData

            js.ADD("nwLoading_End('xLoading');");
        }

        public void GenerateGrid(bool isInitialize)
        {
            var gridID = "nwGridMainCon";
            nwGrid grid = new nwGrid(gridID);
            DataTable dt = new DataTable();

            grid.Type = nwGridType.SpreadCanvas;

            string nwDocno = WebApp.nwobjectText("txtRefDocno");

            if (!isInitialize)
            {
                if (!string.IsNullOrEmpty(nwDocno))
                {
                    dt = dal.getDetailsApproval(nwDocno);
                    dt.Rows.Add();
                }
                else
                {
                    dt = dal.getDetails(based.SecurityAccess.RecUser, WebApp.nwobjectText("cmbProject"), 0);
                    dt.Rows.Add();
                }
            }
            else //if initialize
            {
                dt = dal.getDetails(based.SecurityAccess.RecUser, WebApp.nwobjectText("cmbProject"), 1);
                while (dt.Rows.Count < 5)
                {
                    dt.Rows.Add();
                }
            }

            if (dt.Rows.Count <= 0 || dt.Rows.Count < 5)
            {
                while (dt.Rows.Count < 5)
                {
                    dt.Rows.Add();
                }
            }

            grid.dataSource(dt);

            grid.RowHeight(50);
            grid.TableHeight(200);

            //Column Name
            grid.nwobject(SPR_ProjectCode - 1).ColumnName("Project Code");
            grid.nwobject(SPR_ProjectName - 1).ColumnName("Project Description");
            grid.nwobject(SPR_BlockFloor - 1).ColumnName("Block/Floor");
            grid.nwobject(SPR_LotUnitSlotNo - 1).ColumnName("Lot/Unit/Slot No.");
            grid.nwobject(SPR_Customer - 1).ColumnName("Customer");
            grid.nwobject(SPR_HoldingDate - 1).ColumnName("Holding Date");
            grid.nwobject(SPR_HoldingExpiryDate - 1).ColumnName("Holding Expiry Date");
            //grid.nwobject(SPR_HoldingExpiryExt - 1).ColumnName("Holding Expiry Date (Extended)");
            grid.nwobject(SPR_QueueNo - 1).ColumnName("Queue No.");
            grid.nwobject(SPR_AgeinDays - 1).ColumnName("Age (in Days)");
            grid.nwobject(SPR_Transfer - 1).ColumnName("Trasnfer Of Unit");

            //width
            grid.nwobject(SPR_ProjectCode - 1).Width(200);
            grid.nwobject(SPR_ProjectName - 1).Width(200);
            grid.nwobject(SPR_BlockFloor - 1).Width(150);
            grid.nwobject(SPR_LotUnitSlotNo - 1).Width(150);
            grid.nwobject(SPR_Customer - 1).Width(200);
            grid.nwobject(SPR_HoldingDate - 1).Width(150);
            grid.nwobject(SPR_HoldingExpiryDate - 1).Width(150);
            grid.nwobject(SPR_HoldingExpiryExt - 1).Width(0);
            grid.nwobject(SPR_QueueNo - 1).Width(75);
            grid.nwobject(SPR_AgeinDays - 1).Width(75);
            grid.nwobject(SPR_Docno - 1).Width(0);
            grid.nwobject(SPR_Transfer - 1).Width(150);
            grid.nwobject(SPR_UnitCode - 1).Width(0);
            //grid.nwobject(SPR_Status - 1).Width(0);

            //Text align
            grid.nwobject(SPR_QueueNo - 1).TextAlign("right");
            grid.nwobject(SPR_AgeinDays - 1).TextAlign("right");
            grid.nwobject(SPR_Transfer - 1).TextAlign("center");

            //Color
            grid.nwobject(SPR_ProjectCode - 1).BackgroundColor("gainsboro");
            grid.nwobject(SPR_ProjectName - 1).BackgroundColor("gainsboro");
            grid.nwobject(SPR_BlockFloor - 1).BackgroundColor("gainsboro");
            grid.nwobject(SPR_LotUnitSlotNo - 1).BackgroundColor("gainsboro");
            grid.nwobject(SPR_Customer - 1).BackgroundColor("gainsboro");
            grid.nwobject(SPR_HoldingDate - 1).BackgroundColor("gainsboro");
            grid.nwobject(SPR_HoldingExpiryDate - 1).BackgroundColor("gainsboro");
            //grid.nwobject(SPR_HoldingExpiryExt - 1).BackgroundColor("gainsboro");
            grid.nwobject(SPR_QueueNo - 1).BackgroundColor("gainsboro");
            grid.nwobject(SPR_AgeinDays - 1).BackgroundColor("gainsboro");

            grid.nwobject(SPR_Transfer - 1).Class("btnGray");

            //## THEME FORMAT
            grid.HeaderBorderColor("#DEDEDE");
            grid.rowBackground("#FFFFFF", "#FFFFFF");
            grid.TableBorderColor("#BBB");
            grid.BodyBorderColor("#BBB");
            grid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            grid.HeaderTextColor("#131313");
            grid.HoverColor("#CAE1FF", "inherit");
            grid.SelectedRowHover("#CAE1FF");
            grid.SelectedRowHoverColor("inherit");
            grid.HeaderBorderColor("silver");
            grid.BodyFontFamily = "Century Gothic";
            grid.HeaderFontFamily = "Century Gothic";

            grid.varSpreadBook = "nwGridMainCon_Book";
            grid.varSpreadSheet = "nwGridMainCon_Sheet";
            js.ADD(grid.createTable());
            js.ADD("CreateGridDone()");
        }

        private void setRqmtCompProp()
        {
            if (dal.hasSavedRqrdCompli(WebApp.nwobjectText("txtTransactionNo")) == "True")
            {
                js.ADD("$('#btnReqCompliance').removeClass('btnGray');");
                js.ADD("$('#btnReqCompliance').removeClass('btnOrange');");
                js.ADD("$('#btnReqCompliance').addClass('btnGreen');");
            }
            else
            {
                js.ADD("$('#btnReqCompliance').removeClass('btnGray');");
                js.ADD("$('#btnReqCompliance').removeClass('btnGreen');");
                js.ADD("$('#btnReqCompliance').addClass('btnOrange');");
            }
        }

        //added from submenu folder
        private void ProcessData()
        {
            if (RecordOperationResult.Length <= 0)
            {
                string recuser = based.SecurityAccess.RecUser;
                string LocAccForms = string.Empty;
                string ReTranUnit = string.Empty;
                string NewUnit = string.Empty;
                string RefHoldTrans = string.Empty;
                string Remarks = string.Empty;
                string DocNo = string.Empty;
                string DocDate = string.Empty;
                string DocStatus = string.Empty;
                string ReasDis = string.Empty;
                string RemDis = string.Empty;

                LocAccForms = WebApp.nwobjectText("idvallugLocAccForms");
                ReTranUnit = WebApp.nwobjectText("idvallugReTranUnit");
                NewUnit = WebApp.nwobjectText("idvallugNewUnit");
                RefHoldTrans = WebApp.nwobjectText("descvallugRefHoldTrans");
                Remarks = WebApp.nwobjectText("txtRemarks");
                DocNo = WebApp.nwobjectText("txtDocNo");
                DocDate = WebApp.nwobjectText("txtDocDate");
                DocStatus = "1";//WebApp.nwobjectText("txtDocStatus");
                ReasDis = WebApp.nwobjectText("txtReasDis");
                RemDis = WebApp.nwobjectText("txtRemDis");

                //DAL Connection
                RecordOperationResult = dal.ProcessData_popup(DocNo);

            }
        }

        private DataTable LoadSchema_popup()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema_popup();
            #endregion

            string docno = "";
            docno = WebApp.nwobjectText("idvallugLocAccForms") + "-STRNUN-" + dal.txtDocNo_popup().ToString();

            DataRow dr = dtHDR.NewRow();
            dr["locform"] = WebApp.nwobjectText("idvallugLocAccForms");
            dr["locdesc"] = WebApp.nwobjectText("descvallugLocAccForms");
            dr["reasonfortransunit"] = WebApp.nwobjectText("idvallugReTranUnit");
            dr["resdesc"] = WebApp.nwobjectText("descvallugReTranUnit");
            dr["newunit"] = WebApp.nwobjectText("idvallugNewUnit");
            dr["unitdesc"] = WebApp.nwobjectText("descvallugNewUnit");
            dr["refholdtrans"] = WebApp.nwobjectText("descvallugRefHoldTrans");
            dr["remarks"] = WebApp.nwobjectText("txtRemarks");
            dr["docno"] = docno;
            dr["docstatus"] = "1"; // WebApp.nwobjectText("docstat");
            dr["docdate"] = dal.txtDocDate_popup();
            dr["reasonfordisapproval"] = WebApp.nwobjectText("txtReasDis");
            dr["remarksfordisapproval"] = WebApp.nwobjectText("txtRemDis");
            dr["recuser"] = based.SecurityAccess.RecUser;
            //dr["recDate"] = null;
            dr["moduser"] = based.SecurityAccess.RecUser;
            //dr["modDate"] = null;
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion
            return dtHDR;
        }

        private void InitializeValues_popup()
        {
            nwToolBox.bindingNavigatorSaveItem.Enable = true;
            nwToolBox.bindingNavigatorAddNewItem.Enable =
            nwToolBox.bindingNavigatorPrintItem.Enable =
            nwToolBox.bindingNavigatorInquireItem.Enable =
            nwToolBox.bindingNavigatorImportItem.Visible =
            nwToolBox.bindingNavigatorDeleteItem.Visible = false;
            nwToolBox.bindingNavigatorExportItem.Enable = false;

            js.ADD("$(\"#lugReTranUnit\").focus();");
            //LoadGrid(true, InitializeGrid());
        }

        private string ValidateData_popup()
        {
            string errorResult = String.Empty;

            if (WebApp.nwobjectText("idvallugLocAccForms").Length <= 0)
            {
                errorResult += "Cannot be saved. Location with Accountable Forms is required.\n";
            }

            if (WebApp.nwobjectText("idvallugReTranUnit").Length <= 0)
            {
                errorResult += "Cannot be saved. Reason for Transfer of Unit is required.\n";
            }

            if (WebApp.nwobjectText("idvallugNewUnit").Length <= 0)
            {
                errorResult += "Cannot be saved. New Unit is required.\n";
            }
            return errorResult;
        }

        public void Data_Enable_popup()
        {
            nwToolBox.bindingNavigatorAddNewItem.Enable = true;
            nwToolBox.bindingNavigatorSaveItem.Enable = false;
            nwToolBox.bindingNavigatorPrintItem.Enable =
            nwToolBox.bindingNavigatorInquireItem.Enable = false;
            nwToolBox.bindingNavigatorDeleteItem.Visible = false;
            nwToolBox.bindingNavigatorDeleteItem.Enable = true;
            nwToolBox.bindingNavigatorExportItem.Enable = false;

            nwToolBox.bindingNavigatorImportItem.Visible = false;
            nwToolBox.bindingNavigatorProcessItem.Visible = true;
            nwToolBox.bindingNavigatorAddNewItem.Visible = true;
        }

        private void HeaderToU()
        {
            DataTable getter = new DataTable();
            getter = dal.displaydoc_popup(WebApp.nwobjectText("txtRefDocno"));

            DataRow r = getter.Rows[0];

            var docstat = r["docstatus"].ToString();
            if (docstat != "")
            {
                if (docstat == "1")
                {
                    var docstatdesc = dal.docstatdesc(docstat);

                    js.makeValueText("#idvallugLocAccForms", r["locform"].ToString());
                    js.makeValueText("#descvallugLocAccForms", r["locdesc"].ToString());
                    js.makeValueText("#idvallugReTranUnit", r["reasonfortransunit"].ToString());
                    js.makeValueText("#descvallugReTranUnit", r["resdesc"].ToString());
                    js.makeValueText("#idvallugNewUnit", r["newunit"].ToString());
                    js.makeValueText("#descvallugNewUnit", r["unitdesc"].ToString());
                    js.makeValueText("#descvallugRefHoldTrans", r["refholdtrans"].ToString());

                    js.makeValueText("#txtRemarks", r["remarks"].ToString());
                    js.makeValueText("#txtDocNo", r["docno"].ToString());
                    js.makeValueText("#txtDocDate", r["docdate"].ToString());
                    js.makeValueText("#txtDocStatus", docstatdesc);
                    js.makeValueText("#txtReasDis", r["reasonfordisapproval"].ToString());
                    js.makeValueText("#txtRemDis", r["remarksfordisapproval"].ToString());

                    js.ADD("EnableFields_popup()");
                }
                else
                {
                    js.makeValueText("#idvallugLocAccForms", r["locform"].ToString());
                    js.makeValueText("#descvallugLocAccForms", r["locdesc"].ToString());
                    js.makeValueText("#idvallugReTranUnit", r["reasonfortransunit"].ToString());
                    js.makeValueText("#descvallugReTranUnit", r["resdesc"].ToString());
                    js.makeValueText("#idvallugNewUnit", r["newunit"].ToString());
                    js.makeValueText("#descvallugNewUnit", r["unitdesc"].ToString());
                    js.makeValueText("#descvallugRefHoldTrans", r["refholdtrans"].ToString());

                    js.makeValueText("#txtRemarks", r["remarks"].ToString());
                    js.makeValueText("#txtDocNo", r["docno"].ToString());
                    js.makeValueText("#txtDocDate", r["docdate"].ToString());
                    js.makeValueText("#txtDocStatus", r["docstatdesc"].ToString());
                    js.makeValueText("#txtReasDis", r["reasonfordisapproval"].ToString());
                    js.makeValueText("#txtRemDis", r["remarksfordisapproval"].ToString());
                    js.ADD("DataProcessed_popup()");
                }
            }
            else
            {
                js.makeValueText("#idvallugLocAccForms", r["locform"].ToString());
                js.makeValueText("#descvallugLocAccForms", r["locdesc"].ToString());
                js.makeValueText("#idvallugReTranUnit", r["reasonfortransunit"].ToString());
                js.makeValueText("#descvallugReTranUnit", r["resdesc"].ToString());
                js.makeValueText("#idvallugNewUnit", r["newunit"].ToString());
                js.makeValueText("#descvallugNewUnit", r["unitdesc"].ToString());
                js.makeValueText("#descvallugRefHoldTrans", r["refholdtrans"].ToString());

                js.makeValueText("#txtRemarks", r["remarks"].ToString());
                js.makeValueText("#txtDocNo", r["docno"].ToString());
                js.makeValueText("#txtDocDate", r["docdate"].ToString());
                js.makeValueText("#txtDocStatus", r["docstatdesc"].ToString());
                js.makeValueText("#txtReasDis", r["reasonfordisapproval"].ToString());
                js.makeValueText("#txtRemDis", r["remarksfordisapproval"].ToString());
                js.ADD("DisableFields_popup()");
            }



            //js.ADD("$('idvallugLocAccForms').val('" + getter.Rows[0]["locform"] + "');");
            //js.ADD("$('descvallugLocAccForms').val('" + getter.Rows[0]["locdesc"] + "');");
            //js.ADD("$('idvallugReTranUnit').val('" + getter.Rows[0]["reasonfortransunit"] + "');");
            //js.ADD("$('descvallugReTranUnit').val('" + getter.Rows[0]["resdesc"] + "');");
            //js.ADD("$('idvallugNewUnit').val('" + getter.Rows[0]["newunit"] + "');");
            //js.ADD("$('descvallugNewUnit').val('" + getter.Rows[0]["unitdesc"] + "');");
            //js.ADD("$('descvallugRefHoldTrans').val('" + getter.Rows[0]["refholdtrans"] + "');");
            //js.ADD("$('txtRemarks').val('" + getter.Rows[0]["remarks"] + "');");
            //js.ADD("$('txtDocNo').val('" + getter.Rows[0]["docno"] + "');");
            //js.ADD("$('txtDocDate').val('" + getter.Rows[0]["docdate"] + "');");
            //js.ADD("$('txtDocStatus').val('" + getter.Rows[0]["docstatus"] + "');");
            //js.ADD("$('txtReasDis').val('" + getter.Rows[0]["reasonfordisapproval"] + "');");
            //js.ADD("$('txtRemDis').val('" + getter.Rows[0]["remarksfordisapproval"] + "');");
        }

        private void ShowHDR()
        {
            string locaccforms = "";
            locaccforms = WebApp.nwobjectText("txtRefDocno");

            //var txtidvallugLocAccForms = dal.txtidvalLugLocAccForms_popup(locaccforms);
            //var txtdescvallugLocAccForms = dal.txtdescvalLugLocAccForms_popup(locaccforms);

            //js.ADD("$('#idvallugLocAccForms').val('" + txtidvallugLocAccForms + "')");
            //js.ADD("$('#descvallugLocAccForms').val('" + txtdescvallugLocAccForms + "')");
            //js.ADD("$('#descvallugRefHoldTrans').val('" + locaccforms + "')");

            //js.makeValueText("#idvallugLocAccForms", dal.txtidvalLugLocAccForms_popup(locaccforms));
            //js.makeValueText("#descvallugLocAccForms", dal.txtdescvalLugLocAccForms_popup(locaccforms));
            //js.makeValueText("#descvallugRefHoldTrans", locaccforms);

            var RowCounter = Int32.Parse(dal.rowcounter());
            if (RowCounter != 0)
            {
                HeaderToU();
                //nwToolBox.bindingNavigatorDeleteItem.Enable = true;
                //nwToolBox.bindingNavigatorProcessItem.Enable = true;
                //nwToolBox.bindingNavigatorSaveItem.Enable = false;
                //js.ADD("EnableFields_popup()");
            }
            else
            {

                var txtidvallugLocAccForms = dal.txtidvalLugLocAccForms_popup(locaccforms);
                var txtdescvallugLocAccForms = dal.txtdescvalLugLocAccForms_popup(locaccforms);

                js.ADD("$('#idvallugLocAccForms').val('" + txtidvallugLocAccForms + "')");
                js.ADD("$('#descvallugLocAccForms').val('" + txtdescvallugLocAccForms + "')");
                js.ADD("$('#descvallugRefHoldTrans').val('" + locaccforms + "')");

                js.ADD("DisableFields_popup()");

                //HeaderToU();
                //js.ADD("DisableFields_popup()");
                //nwToolBox.bindingNavigatorDeleteItem.Enable = false;
                //nwToolBox.bindingNavigatorProcessItem.Enable = false;
                //nwToolBox.bindingNavigatorSaveItem.Enable = true;
            }
        }

        //end
    }
}