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
using System.Data.SqlClient;
using System.Web.WebPages;


namespace Noah_Web.forms_BusinessLayer
{
    public class APApprovedPaymentRequestEntry2BL : nwAction
    {
        #region Variables needed
        public static string nwDocno;
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
        const int SPR_DOCUMENTNO = 1,
                  SPR_DOCUMENTPOSTINGDATE = 2,
                  SPR_REFNO = 3,
                  SPR_REFDATE = 4,
                  SPR_DUEDATE = 5,
                  SPR_ITEMGROUPTYPECODE = 6,
                  SPR_ITEMGROUPTYPEDESC = 7,
                  SPR_ITEMCODE = 8,
                  SPR_ITEMDESC = 9,
                  SPR_UOM = 10,
                  SPR_QTY = 11,
                  SPR_AMOUNT = 12,
                  SPR_TOTALAMOUNT = 13,
                  SPR_REVIEWATTACHMENT = 14,
                  SPR_LINEID = 15,
                  SPR_REVIEWATTACHMENTTAG = 16,
                  SPR_BASEUOMCODE = 17;



        #endregion

        #region
        int SPR3_Checkbox = 1,
            SPR3_TRANSACTIONNO = 2,
            SPR3_DATECREATED = 3,
            SPR3_VENDORPAYEECODE = 4,
            SPR3_VENDORPAYEENAME = 5,
            SPR3_CURRENCY = 6,
            SPR3_CHECKPAYEENAME = 7,
            SPR3_REMARKS = 8;
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
            dal = new APApprovedPaymentRequestEntry2DAL(this.UserDefinedConnectionString, this.based.SecurityAccess.ConnectionString, "");
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
        public string Trantype = "APVNAM";
        public string Stat = string.Empty;
        string RecordOperationResult = String.Empty;
        APApprovedPaymentRequestEntry2DAL dal;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public APApprovedPaymentRequestEntry2BL()
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
            strConn = this.UserDefinedConnectionString;

            string strFinal = "";
            string strSQL = "";
            string mouseDownFunc = "";
            string mouseOverFunc = "";

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.inquireQuery(based.SecurityAccess.RecUser); ;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugLocForm":
                    string trantype = WebApp.nwobjectText("TranType");
                    strSQL = dal.lugLocForm(trantype, based.SecurityAccess.RecUser);
                    nwObject.ColumnSort("Code", "Asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugPayee":
                    string locForm = WebApp.nwobjectText("idvallugLocForm");
                    strSQL = dal.lugPayee(locForm);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    nwObject.ColumnHide(5);
                    nwObject.ColumnHide(6);
                    nwObject.ColumnSort("Code", "Asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugDocumentNo":
                    strSQL = dal.DocumentNo(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("idvallugPayee"));
                    nwObject.ColumnHide(4);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugItemGroupTypeCode":
                    strSQL = dal.ItemGType();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugItemCode":
                    strSQL = dal.ItemCode(WebApp.nwobjectText("txtItemGroupTypeCode"));
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(5);
                    nwObject.ColumnHide(6);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugUOM":
                    strSQL = dal.UOM();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                //case "getlugPackSizeUOM":
                //    strSQL = dal.PackSizeUOM(WebApp.nwobjectText("txtItemCode"));
                //    strMethod = strMethod.Substring(3);
                //    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                //    break;

                //case "getlugMDRUOM":
                //    strSQL = dal.MDRUOM(WebApp.nwobjectText("txtItemCode"));
                //    strMethod = strMethod.Substring(3);
                //    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                //    break;

                case "getlugCurrency":
                    strSQL = dal.Currency();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugVendor":
                    strSQL = dal.Vendor();
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnSort("Vendor Code", "ASC");
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugDocDtlHdr":
                    strSQL = dal.DocDTLhdr();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;



            }

            return strFinal;
        }

        private void InitializeValues()
        {
            DataTable dt = new DataTable();
            //nwToolBox.bindingNavigatorSaveItem.Enable = true;
            //nwToolBox.bindingNavigatorAddNewItem.Enable =
            //nwToolBox.bindingNavigatorPrintItem.Enable =
            ////nwToolBox.bindingNavigatorInquireItem.Enable =
            //nwToolBox.bindingNavigatorDeleteItem.Enable =
            ////nwToolBox.bindingNavigatorDeleteItem.Visible =
            //nwToolBox.bindingNavigatorExportItem.Enable =
            //nwToolBox.bindingNavigatorProcessItem.Enable = false;
            //nwToolBox.bindingNavigatorImportItem.Enable = true;
            var serverdate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
            js.makeValueText("#txtTranDate", serverdate.ToString("MM/dd/yyyy"));
            dt = dal.getDefaultLocform(based.SecurityAccess.RecUser);

            if (dt.Rows.Count > 0)
            {
                js.makeValueText("#idvallugLocForm", dt.Rows[0]["LocForm Code"].ToString());
                js.makeValueText("#descvallugLocForm", dt.Rows[0]["LocForm Description"].ToString());
            }

            CreateGrid(true);
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
                    js.ADD("$('.nwgbtnRemarks').enable(false);");
                    break;
                case eRecordOperation.Save:

                    nwToolBox.bindingNavigatorImportItem.Enable = false;
                    nwToolBox.bindingNavigatorImportItem.Visible = true;

                    RecordOperationResult = ValidateData();

                    if (RecordOperationResult.Length <= 0)
                    {


                        DataTable dt = new DataTable();
                        DataTable dlin = new DataTable();

                        dt = LoadSchema();
                        dlin = LoadSchemaLIN();
                        RecordOperationResult = dal.SaveData(dt, dlin, isNewRow, Trantype);

                    }

                    break;

                case eRecordOperation.Delete:
                    nwToolBox.bindingNavigatorImportItem.Visible = true;
                    nwToolBox.bindingNavigatorImportItem.Enable = false;
                    //RecordOperationResult = ValidateData();
                    //if (RecordOperationResult.Length <= 0)
                    //{
                    string Vendor = string.Empty;
                    Vendor = WebApp.nwobjectText("txtTransactionNo");
                    RecordOperationResult = dal.DeleteData(Vendor, based.SecurityAccess.RecUser);
                    //}

                    break;

                case eRecordOperation.Process:
                    CreateProcessGrid(true);
                    break;

                case eRecordOperation.Refresh:
                    nwToolBox.bindingNavigatorImportItem.Enable = false;
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

                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, dal.LISTINGSTARTROW, dal.LISTINGQUERY(),
                                                           dal.LISTINGFILENAME + " Listing", UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                           based.SecurityAccess.RecUserName, dal.LISTINGFILENAME + " Listing");

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
                    js.ADD(" $('#nwExportContainer').attr(\"p8title\",\"" + (dal.LISTINGFILENAME + " Listing") + "\");");

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

            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
                {
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


        public string act_Method(string strMethod, string strParameter, string strValue)
        {
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();
                    break;

                case "actBindCollectionEmpty":
                    //js.ADD("nwLoading_End('actBindCollectionEmpty')");
                    break;

                case "actItemGroupTypeDefault":
                    DefaultItemGroupType();
                    break;

                case "actdefaultVAT":
                    break;

                case "actprocess":
                    RecordOperationResult = Processvalidation();
                    if (RecordOperationResult.Length <= 0)
                    {
                        string recuser = based.SecurityAccess.RecUser;
                        DataTable dt6 = new DataTable();
                        DataSet ds6 = WebApp.DataSet("nwGridCon3");
                        if (ds6.Tables.Count > 0)
                        {
                            dt6 = ds6.Tables[0];
                        }
                        DataTable dtProcess = WebApp.nwGridData(WebApp.nwobjectText("nwGridCon3"));
                        RecordOperationResult = dal.MultiUpdateProcess(dt6, recuser);

                        if (RecordOperationResult.Contains("Cannot"))
                        {
                            Prompt.Error(RecordOperationResult, based.Title);
                        }
                        else
                        {
                            Prompt.Information(RecordOperationResult, based.Title);
                            js.ADD("processclose();");
                            RefreshData();
                        }
                    }
                    else
                    {
                        Prompt.Error(RecordOperationResult, based.Title);
                    }
                    js.ADD("nwLoading_End('xactprocess')");
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
                    standardBL.PrimaryKey = "Transaction No.";
                    string codevalue = WebApp.nwobjectText("codevalue");
                    if (codevalue.Length > 0)
                        nwDocno = codevalue;
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(nwDocno), this.UserDefinedConnectionString);
                    break;
            }

            return strFinal;
        }



        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#idvallugLocForm", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "locForm");
            SFObject.SetControlBinding("#descvallugLocForm", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "locFormDesc");
            SFObject.SetControlBinding("#idvallugPayee", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "vendor");
            SFObject.SetControlBinding("#descvallugPayee", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Vendor/Payee Name");
            SFObject.SetControlBinding("#idvallugSubPayee", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PayeeSubType");
            SFObject.SetControlBinding("#descvallugSubPayee", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "payeeSubTypeDesc");
            SFObject.SetControlBinding("#idvallugCurrency", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "currency");
            SFObject.SetControlBinding("#descvallugCurrency", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "currDesc");
            SFObject.SetControlBinding("#txtPayeeName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "checkPayeeName");
            SFObject.SetControlBinding("#txtRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "remarks");

            SFObject.SetControlBinding("#txtTransactionNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Transaction No.");
            SFObject.SetControlBinding("#txtDateSubmitted", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "dateSubmit");
            SFObject.SetControlBinding("#txtDatePosted", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "postdate");
            SFObject.SetControlBinding("#txtDocumentStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "status");
            SFObject.SetControlBinding("#idvallugRsnDisapproval", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "reasonDisapproval");
            SFObject.SetControlBinding("#descvallugRsnDisapproval", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "reasonDisapprovalDesc");
            SFObject.SetControlBinding("#txtDisRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "disapprovalRemarks");

            //SFObject.SetControlBinding(Stat, "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Status");



            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");
        }

        //////////////// end of standard / standard custumize

        private void BindCollection()
        {
            setRqmtCompProp();
            CreateGrid(false);
            js.ADD("nwLoading_End('actBindCollection');");
        }

        private string ValidateData()
        {
            string errorResult = String.Empty;

            DataTable _tempSPR = new DataTable();
            _tempSPR = LoadSchemaLIN();

            if (WebApp.nwobjectText("idvallugLocForm").Length <= 0)
                errorResult += "Cannot be saved. Location with Accountable Forms is required.\n";

            if (WebApp.nwobjectText("idvallugPayee").Length <= 0)
                errorResult += "Cannot be saved. Vendor/Payee is required.\n";

            if (WebApp.nwobjectText("idvallugCurrency").Length <= 0)
                errorResult += "Cannot be saved. Currency is required.\n";

            if (WebApp.nwobjectText("txtRemarks").Length <= 0)
                errorResult += "Cannot be saved. Remarks is required.\n";

            if (_tempSPR.Rows.Count <= 0)
            {
                errorResult += "Cannot be saved. At least one line detail is required.\n";
            }

            if (_tempSPR.Rows.Count > 0)
            {
                int x = 0;
                foreach (DataRow dr in _tempSPR.Rows)
                {
                    if (_tempSPR.Rows[x]["refDocno"].ToString() == string.Empty)
                    {
                        errorResult += "Cannot be saved. Document No. in row " + (_tempSPR.Rows[x]["rNo"]) + " is required. \n";
                    }

                    if (_tempSPR.Rows[x]["refNo"].ToString() == string.Empty)
                    {
                        errorResult += "Cannot be saved. Ref No. in row " + (_tempSPR.Rows[x]["rNo"]) + " is required. \n";
                    }

                    if (_tempSPR.Rows[x]["refDate"].ToString() == string.Empty)
                    {
                        errorResult += "Cannot be saved. Ref Date in row " + (_tempSPR.Rows[x]["rNo"]) + " is required. \n";
                    }

                    if (_tempSPR.Rows[x]["igtCode"].ToString() == string.Empty)
                    {
                        errorResult += "Cannot be saved. Item Group Type Code in row " + (_tempSPR.Rows[x]["rNo"]) + " is required. \n";
                    }

                    if (_tempSPR.Rows[x]["QTY"].ToString() == string.Empty)
                    {
                        errorResult += "Cannot be saved. QTY in row " + (_tempSPR.Rows[x]["rNo"]) + " is required. \n";
                    }

                    if (_tempSPR.Rows[x]["Amount"].ToString() == string.Empty)
                    {
                        errorResult += "Cannot be saved. Amount in row " + (_tempSPR.Rows[x]["rNo"]) + " is required. \n";
                    }

                    x++;
                }

            }

            return errorResult;
        }

        public void CreateGrid(bool isInitialize)
        {
            string gridID = "nwGridCon";
            nwGrid m_spread = new nwGrid(gridID);
            m_spread.Type = nwGridType.SpreadCanvas;

            m_spread.RowHeight(5);
            m_spread.CreateExcelGrid(5, SPR_BASEUOMCODE);
            m_spread.TableHeight(200);
            m_spread.minRow(5);

            DataTable dt = new DataTable();

            if (!isInitialize)
            {
                string TranNo = WebApp.nwobjectText("txtTransactionNo");
                dt = dal.GetLinData(TranNo);
                m_spread.dataSource(dt);
                m_spread.minRow(dt.Rows.Count + 1);
            }
            else
            {
                m_spread.CreateExcelGrid(5, SPR_BASEUOMCODE);
            }

            #region Column Name

            m_spread.nwobject(SPR_DOCUMENTNO - 1).ColumnName("Document No.");
            m_spread.nwobject(SPR_DOCUMENTNO - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_DOCUMENTPOSTINGDATE - 1).ColumnName("Document Posting Date");
            m_spread.nwobject(SPR_REFNO - 1).ColumnName("Ref No.");
            m_spread.nwobject(SPR_REFNO - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_REFDATE - 1).ColumnName("Ref Date");
            m_spread.nwobject(SPR_REFDATE - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_DUEDATE - 1).ColumnName("Due Date");
            m_spread.nwobject(SPR_DUEDATE - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_ITEMGROUPTYPECODE - 1).ColumnName("Item Group Type Code");
            m_spread.nwobject(SPR_ITEMGROUPTYPECODE - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_ITEMGROUPTYPEDESC - 1).ColumnName("Item Group Type Description");
            m_spread.nwobject(SPR_ITEMCODE - 1).ColumnName("Item Code");
            m_spread.nwobject(SPR_ITEMDESC - 1).ColumnName("Item Description");
            m_spread.nwobject(SPR_UOM - 1).ColumnName("UOM");
            m_spread.nwobject(SPR_QTY - 1).ColumnName("QTY");
            m_spread.nwobject(SPR_QTY - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_AMOUNT - 1).ColumnName("Amount");
            m_spread.nwobject(SPR_AMOUNT - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_TOTALAMOUNT - 1).ColumnName("Total Amount");
            m_spread.nwobject(SPR_REVIEWATTACHMENT - 1).ColumnName("Review Attachment(s)");

            #endregion

            #region Input

            #endregion
            #region Template
            m_spread.nwobject(SPR_REFNO - 1).Enabled(true);
            m_spread.nwobject(SPR_REFDATE - 1).Enabled(true);
            m_spread.nwobject(SPR_REFDATE - 1).DataType("date");
            m_spread.nwobject(SPR_DUEDATE - 1).Enabled(true);
            m_spread.nwobject(SPR_DUEDATE - 1).DataType("date");
            m_spread.nwobject(SPR_QTY - 1).Enabled(true);
            m_spread.nwobject(SPR_QTY - 1).InputCurrency("numQTYC", 5, 8);
            m_spread.nwobject(SPR_AMOUNT - 1).Enabled(true);
            m_spread.nwobject(SPR_AMOUNT - 1).InputCurrency("numAmountC", 2, 16);
            m_spread.nwobject(SPR_TOTALAMOUNT - 1).InputCurrency("numTotalC", 2, 16);
            //m_spread.nwobject(SPR_REMARKS - 1).Remarks("...");
            m_spread.nwobject(SPR_REVIEWATTACHMENT - 1).ObjectType("button");
            m_spread.nwobject(SPR_REVIEWATTACHMENT - 1).BackgroundColor("#006060");
            m_spread.nwobject(SPR_REVIEWATTACHMENT - 1).TextAlign("center");
            #endregion

            #region Special

            #endregion

            #region Header Grouping

            //m_spread.HeaderGroupADD("Test", SPR_LOOKUPCODE - 1, 2);

            #endregion

            #region Width

            m_spread.nwobject(SPR_DOCUMENTNO - 1).Width(300);
            m_spread.nwobject(SPR_DOCUMENTPOSTINGDATE - 1).Width(250);
            m_spread.nwobject(SPR_ITEMGROUPTYPEDESC - 1).Width(250);
            m_spread.nwobject(SPR_ITEMGROUPTYPECODE - 1).Width(120);
            m_spread.nwobject(SPR_ITEMDESC - 1).Width(250);
            m_spread.nwobject(SPR_ITEMCODE - 1).Width(120);
            m_spread.nwobject(SPR_UOM - 1).Width(120);
            m_spread.nwobject(SPR_QTY - 1).Width(120);
            m_spread.nwobject(SPR_AMOUNT - 1).Width(120);
            m_spread.nwobject(SPR_REVIEWATTACHMENT - 1).Width(150);
            m_spread.nwobject(SPR_LINEID - 1).Width(0);
            m_spread.nwobject(SPR_REVIEWATTACHMENTTAG - 1).Width(0);
            m_spread.nwobject(SPR_BASEUOMCODE - 1).Width(0);


            #endregion

            #region Color

            m_spread.nwobject(SPR_DOCUMENTNO - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_DOCUMENTPOSTINGDATE - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_ITEMGROUPTYPEDESC - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_ITEMGROUPTYPECODE - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_ITEMDESC - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_ITEMCODE - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_UOM - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_TOTALAMOUNT - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_REVIEWATTACHMENT - 1).BackgroundColor("gainsboro");


            #endregion


            #region Grid Buttons
            m_spread.buttonInsert = true;
            m_spread.buttonDelete = true;
            m_spread.buttonSearchFind = false;
            m_spread.buttonResetColumn = true;
            m_spread.buttonSaveColumn = true;
            m_spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

            #endregion

            m_spread.SetTheme(nwGridTheme.Default);
            m_spread.varSpreadBook = "nwGridCon_Book";
            m_spread.varSpreadSheet = "nwGridCon_Sheet";

            //js.makeHTML("#nwGridCon", m_spread.createTable());
            js.ADD(m_spread.createTable());

            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",1,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("HasDataRemarks()");
        }

        private void DefaultItemGroupType()
        {
            string itemCode = string.Empty;
            string itemGroupTypeCode = string.Empty;
            string itemGroupTypeDesc = string.Empty;
            int row = 0;

            itemCode = WebApp.nwobjectText("txtItemCode");
            row = Parser.ParseInt(WebApp.nwobjectText("row"));

            DataTable dt = new DataTable();
            dt = dal.DefaultItemGroupType(itemCode);
            itemGroupTypeCode = Parser.ParseString(dt.Rows[0]["Code"]);
            itemGroupTypeDesc = Parser.ParseString(dt.Rows[0]["Description"]);

            string xCode = string.Format($"nwGridCon_Book.ActiveSheet.SetText((SPR_ITEMGROUPTYPECODE - 1), {row}, '{itemGroupTypeCode}');");
            string xDesc = string.Format($"nwGridCon_Book.ActiveSheet.SetText((SPR_ITEMGROUPTYPEDESC - 1), {row}, '{itemGroupTypeDesc}');");

            js.ADD(xCode);
            js.ADD(xDesc);
        }


        private DataTable LoadSchema()
        {

            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema();
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["Docno"] = WebApp.nwobjectText("txtTransactionNo");
            dr["LocForm"] = WebApp.nwobjectText("idvallugLocForm");
            dr["vendor"] = WebApp.nwobjectText("idvallugPayee");
            dr["Currency"] = WebApp.nwobjectText("idvallugCurrency");
            dr["CheckPayeeName"] = WebApp.nwobjectText("txtPayeeName");
            dr["remarks"] = WebApp.nwobjectText("txtRemarks");
            dr["Recuser"] = based.SecurityAccess.RecUser;
            dr["Moduser"] = based.SecurityAccess.RecUser;
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion
            return dtHDR;
        }


        private DataTable LoadSchemaLIN()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadSchemaLIN();
            #endregion

            //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridCon"));
            DataTable dt = new DataTable();
            DataSet ds = WebApp.DataSet("nwGridCon");
            if (ds.Tables.Count > 0)
            {
                dt = ds.Tables[0];
            }
            dtLIN.Columns.Add("rNo", typeof(int));

            int ctr = 1;

            foreach (DataRow dr_details in dt.Rows)
            {
                DataRow dr = dtLIN.NewRow();
                if (dr_details[SPR_DOCUMENTNO - 1].ToString() != string.Empty
                    || dr_details[SPR_DOCUMENTPOSTINGDATE - 1].ToString() != string.Empty
                    || dr_details[SPR_REFNO - 1].ToString() != string.Empty
                    || dr_details[SPR_REFDATE - 1].ToString() != string.Empty
                    || dr_details[SPR_DUEDATE - 1].ToString() != string.Empty
                    || dr_details[SPR_ITEMGROUPTYPECODE - 1].ToString() != string.Empty
                    || dr_details[SPR_ITEMCODE - 1].ToString() != string.Empty
                    || dr_details[SPR_BASEUOMCODE - 1].ToString() != string.Empty
                    || dr_details[SPR_REVIEWATTACHMENT - 1].ToString() != string.Empty)
                {
                    dr["refDocno"] = dr_details[SPR_DOCUMENTNO - 1].ToString();
                    dr["refNo"] = dr_details[SPR_REFNO - 1].ToString();
                    dr["refDate"] = dr_details[SPR_REFDATE - 1].ToString();
                    dr["dueDate"] = dr_details[SPR_DUEDATE - 1].ToString();
                    dr["igtCode"] = dr_details[SPR_ITEMGROUPTYPECODE - 1].ToString();
                    dr["itemCode"] = dr_details[SPR_ITEMCODE - 1].ToString();
                    dr["UOM"] = dr_details[SPR_BASEUOMCODE - 1].ToString();
                    dr["QTY"] = dr_details[SPR_QTY - 1].ToString();
                    dr["Amount"] = dr_details[SPR_AMOUNT - 1].ToString();
                    dr["totalamt"] = dr_details[SPR_TOTALAMOUNT - 1].ToString();
                    dr["rNo"] = ctr;
                    dr["lineID"] = Parser.ParseInt(dr_details[SPR_LINEID - 1].ToString());
                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                }
                ctr++;
            }

            return dtLIN;
        }

        public void Data_Enable()
        {
            nwToolBox.bindingNavigatorAddNewItem.Visible = true;
            //nwToolBox.bindingNavigatorSaveItem.Visible = true;
            //nwToolBox.bindingNavigatorDeleteItem.Visible = true;
            //nwToolBox.bindingNavigatorInquireItem.Visible = true;
            nwToolBox.bindingNavigatorExportItem.Enable = false;
            //nwToolBox.bindingNavigatorImportItem.Visible = false;
            nwToolBox.bindingNavigatorProcessItem.Visible = true;

            nwToolBox.bindingNavigatorAddNewItem.Enable = true;
            //nwToolBox.bindingNavigatorSaveItem.Enable = false;
            //nwToolBox.bindingNavigatorDeleteItem.Enable = false;
            //nwToolBox.bindingNavigatorInquireItem.Enable = true;
            //nwToolBox.bindingNavigatorExportItem.Enable = true;
            //nwToolBox.bindingNavigatorImportItem.Enable = false;
            nwToolBox.bindingNavigatorProcessItem.Enable = false;
            //nwToolBox.bindingNavigatorPrintItem.Enable = false;

        }

        private void setRqmtCompProp()
        {
            if (dal.hasReqComplianceHdr(WebApp.nwobjectText("txtTransactionNo")) == "True")
            {
                js.ADD("$('#btnReqCompliance').removeClass('btn-default-orange');");
                js.ADD("$('#btnReqCompliance').removeClass('btn-default-gainsboro');");
                js.ADD("$('#btnReqCompliance').addClass('btn-default-green');");
            }
            else
            {
                js.ADD("$('#btnReqCompliance').removeClass('btn-default-green');");
                js.ADD("$('#btnReqCompliance').removeClass('btn-default-gainsboro');");
                js.ADD("$('#btnReqCompliance').addClass('btn-default-orange');");
            }
        }

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
            CreateGrid(true);
            js.ADD("$('#nwGridCon').enable(false);");
            Data_Enable();
            js.ADD("mainLoad();");
        }

        private void RefreshData()
        {
            js.ADD("ClearFields();");
            js.ADD("$('#nwGridCon').enable(false)");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
            nwDocno = WebApp.nwobjectText("nwDocno");
        }

        public void CreateProcessGrid(bool isinit)
        {
            var gridID3 = "nwGridCon3";

            nwGrid m_spread = new nwGrid("nwGridCon3");
            m_spread.Type = nwGridType.SpreadCanvas;
            m_spread.CreateExcelGrid(1, SPR3_REMARKS);

            if (isinit)
            {
                DataTable dt = new DataTable();
                string recuser = based.SecurityAccess.RecUser;
                dt = dal.getProcessData(recuser);

                if (!(dt.Rows.Count == 0))
                {
                    m_spread.minRow(dt.Rows.Count);
                    //dt.Rows.Add();
                    m_spread.dataSource(dt);
                }
                else
                {
                    m_spread.minRow(1);

                }
            }

            #region Column Name
            m_spread.nwobject(SPR3_Checkbox - 1).ColumnName("Select");
            m_spread.nwobject(SPR3_TRANSACTIONNO - 1).ColumnName("Transaction No.");
            m_spread.nwobject(SPR3_DATECREATED - 1).ColumnName("Date Created");
            m_spread.nwobject(SPR3_VENDORPAYEECODE - 1).ColumnName("Vendor/Payee Code");
            m_spread.nwobject(SPR3_VENDORPAYEENAME - 1).ColumnName("Vendor/Payee Name");
            m_spread.nwobject(SPR3_CURRENCY - 1).ColumnName("Currency");
            m_spread.nwobject(SPR3_CHECKPAYEENAME - 1).ColumnName("Check Payee Name");
            m_spread.nwobject(SPR3_REMARKS - 1).ColumnName("Remarks");
            #endregion

            #region Column Background Color
            m_spread.nwobject(SPR3_Checkbox - 1).BackgroundColor("White");
            m_spread.nwobject(SPR3_TRANSACTIONNO - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR3_DATECREATED - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR3_VENDORPAYEECODE - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR3_VENDORPAYEENAME - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR3_CURRENCY - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR3_CHECKPAYEENAME - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR3_REMARKS - 1).BackgroundColor("gainsboro");
            #endregion

            m_spread.nwobject(SPR3_Checkbox - 1).CheckBox(true, "chkapprove");

            #region Column Width 
            m_spread.nwobject(SPR3_Checkbox - 1).Width(60);
            //m_spread.nwobject(SPR3_isValid - 1).Width(60);
            m_spread.nwobject(SPR3_TRANSACTIONNO - 1).Width(220);
            m_spread.nwobject(SPR3_REMARKS - 1).Width(300);
            #endregion

            #region Column Text Align
            //m_spread.nwobject(SPR3_DMAMT - 1).TextAlign("Right");
            #endregion

            m_spread.RowHeight(20);
            m_spread.TableHeight(270);
            m_spread.backgroundColor("#FFFFFF");
            m_spread.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            m_spread.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            m_spread.HeaderBorderColor("#DEDEDE");
            m_spread.rowBackground("#FFFFFF", "#FFFFFF");
            m_spread.TableBorderColor("#BBB");
            m_spread.BodyBorderColor("#BBB");
            m_spread.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            m_spread.HeaderTextColor("#131313");
            m_spread.HoverColor("#DEDEDE", "inherit");
            m_spread.SelectedRowHover("#DEDEDE");
            m_spread.SelectedRowHoverColor("inherit");

            m_spread.varSpreadBook = "nwGridCon3_Book";
            m_spread.varSpreadSheet = "nwGridCon3_Sheet";

            //js.makeHTML("#" + gridID3, m_spread.createTable());
            js.ADD(m_spread.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID3 + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID3 + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID3 + "\")");
            js.makeCSS("#" + gridID3, "border", "1px solid #BBB1B1");
        }

        public String Processvalidation()
        {
            String errmess = String.Empty;
            DataTable dt = new DataTable();
            DataSet ds = WebApp.DataSet("nwGridCon3");
            if (ds.Tables.Count > 0)
            {
                dt = ds.Tables[0];
            }
            int row = 1;
            bool isNoTicked = true;
            foreach (DataRow dr in dt.Rows)
            {
                String checker = string.Empty;
                if (dr[SPR3_Checkbox - 1].ToString() == "true" || dr[SPR3_Checkbox - 1].ToString() == "1")
                {
                    isNoTicked = false;

                }
                row++;
            }

            if (isNoTicked)
            {
                errmess += $"Cannot be processed. Please select at least one transaction to process.\n";
            }

            return errmess;
        }
    }
}