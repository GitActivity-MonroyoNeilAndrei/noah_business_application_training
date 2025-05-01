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


namespace Noah_Web.forms_BusinessLayer
{
    public class APVITABL : nwAction
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
        const int SPR_ITEMGROUPTYPECODE = 1,
                  SPR_ITEMGROUPTYPEDESC = 2,
                  SPR_ITEMCODE = 3,
                  SPR_ITEMDESC = 4,
                  SPR_BASEUOM = 5,
                  SPR_VATTAXDESC = 6,
                  SPR_EWTDESC = 7,
                  SPR_REMARKS = 8,
                  SPR_TAGREMARKS = 9,
                  SPR_VATTAXCODE = 10,
                  SPR_EWTCODE = 11,
                  SPR_BASEUOMCODE = 12;



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
            dal = new APVITADAL(this.UserDefinedConnectionString, this.based.SecurityAccess.ConnectionString, "");
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
        APVITADAL dal;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public APVITABL()
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
                    strSQL = dal.inquireQuery(); ;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugItemGroupTypeCode":
                    strSQL = dal.ItemGType(WebApp.nwobjectText("txtItemCode"), WebApp.nwobjectText("itemGroupType"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugItemCode":
                    strSQL = dal.ItemCode(WebApp.nwobjectText("txtItemGroupTypeCode"), WebApp.nwobjectText("txtItemCode"));
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(5);
                    nwObject.ColumnHide(6);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugPackSizeUOM":
                    strSQL = dal.PackSizeUOM(WebApp.nwobjectText("txtItemCode"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugMDRUOM":
                    strSQL = dal.MDRUOM(WebApp.nwobjectText("txtItemCode"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

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

                case "getlugVattaxCode":
                    strSQL = dal.VATaxCode();
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugEWTCode":
                    strSQL = dal.EWTCode();
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugDocDtlHdr":
                    strSQL = dal.DocDTLhdr();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugCopyFrom":
                    strSQL = dal.GetCopyFrom();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


            }

            return strFinal;
        }

        private void InitializeValues()
        {
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
                        Vendor = WebApp.nwobjectText("idvallugVendor");
                        RecordOperationResult = dal.DeleteData(Vendor, based.SecurityAccess.RecUser);
                    //}

                    break;

                case eRecordOperation.Process:

                    nwToolBox.bindingNavigatorImportItem.Visible = true;
                    nwToolBox.bindingNavigatorImportItem.Enable = false;
                    RecordOperationResult = ValidateData();
                    if (RecordOperationResult.Length <= 0)
                    {
                        string TransactionNo = string.Empty;
                        TransactionNo = WebApp.nwobjectText("txtTransactionNo");
                        RecordOperationResult = dal.ProcessTransaction(TransactionNo);
                    }

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
                    js.ADD(" $('#nwExportContainer').attr(\"p8title\",\"" + (dal.LISTINGFILENAME + " Listing") +"\");");

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

                case "actCopyFrom":
                    CreateGrid(false);
                    break;

                case "actdefaultVAT":
                    DefaultVatCode();
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
                    standardBL.PrimaryKey = "Vendor";
                    string codevalue = WebApp.nwobjectText("codevalue");
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(codevalue), this.UserDefinedConnectionString);
                    break;
            }

            return strFinal;
        }



        //////////////////////// Common
        private void SetBindings()
        {

            SFObject.SetControlBinding("#idvallugVendor", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Vendor");
            SFObject.SetControlBinding("#descvallugVendor", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RegisteredName");
            SFObject.SetControlBinding("#txtRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Remarks");
            SFObject.SetControlBinding(Stat, "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Status");



            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");
        }

        //////////////// end of standard / standard custumize

        private void BindCollection()
        {
            CreateGrid(false);
            js.ADD("nwLoading_End('actBindCollection');");
        }

        private string ValidateData()
        {
            string errorResult = String.Empty;

            DataTable _tempSPR = new DataTable();
            _tempSPR = LoadSchemaLIN();

            if (WebApp.nwobjectText("idvallugVendor").Length <= 0)
                errorResult += "Cannot be saved. Vendor is required.\n";

            if (_tempSPR.Rows.Count <= 0)
                errorResult += "Cannot be saved. At least one line detail is required.\n";

            if (_tempSPR.Rows.Count > 0)
            {
                int x = 0;
                foreach (DataRow dr in _tempSPR.Rows)
                {
                    if (_tempSPR.Rows[x]["ItemGroupType"].ToString() == string.Empty)
                    {
                        errorResult += "Cannot be saved. Item Group Type Code in row " + (_tempSPR.Rows[x]["rNo"]) + " is required. \n";
                    }

                    if (_tempSPR.Rows[x]["VatCode"].ToString() == string.Empty && _tempSPR.Rows[x]["EWTCode"].ToString() == string.Empty)
                    {
                        errorResult += "Cannot be saved. Either VAT and EWT Short Description in row " + (_tempSPR.Rows[x]["rNo"]) + " must be provided. \n";
                    }


                    if (_tempSPR.Rows[x]["VatCode"].ToString() != string.Empty && _tempSPR.Rows[x]["EWTCode"].ToString() != string.Empty)
                    {
                        errorResult += "Cannot be saved. Only VAT or EWT Short Description in row " + (_tempSPR.Rows[x]["rNo"]) + " should have Value. \n";
                    }

                    //if (_tempSPR.Rows[x]["VatCode"].ToString() == string.Empty)
                    //{
                    //    errorResult += "Cannot Save. VAT Short Description is required at row " + (x + 1) + ".\n";
                    //}

                    //if (_tempSPR.Rows[x]["EWTCode"].ToString() == string.Empty)
                    //{
                    //    errorResult += "Cannot Save. EWT Short Description is required at row " + (x + 1) + ".\n";
                    //}

                    dal.AutoInsertTaxCode(_tempSPR.Rows[x]["VatCode"].ToString(), _tempSPR.Rows[x]["EWTCode"].ToString());
                    //dal.hasCombination(_tempSPR.Rows[x]["VatCode"].ToString(), _tempSPR.Rows[x]["VatCode"].ToString()) == 1

                    //if (_tempSPR.Rows[x]["VatCode"].ToString() == string.Empty && _tempSPR.Rows[x]["EWTCode"].ToString() == string.Empty)
                    //{
                    //    errorResult += "Cannot be saved. Either VAT and EWT Short Description in row " + (x + 1) + " must be provided. \n";
                    //}

                    x++;
                }

                foreach (DataRow items in _tempSPR.Rows)
                {
                    if (_tempSPR.Rows.Count > 0)
                    {
                        string ItemGroup = items[SPR_ITEMGROUPTYPECODE].ToString().Trim();
                        string Item = items[SPR_ITEMCODE].ToString().Trim();
                        int index = _tempSPR.Rows.IndexOf(items) + 1;

                        var p = _tempSPR.AsEnumerable()
                                .Select(s => s)
                                    .Where(w => w["ItemGroupType"].ToString() == ItemGroup).Where(z => z["Item"].ToString() == Item).Where(i => Parser.ParseInt(i["rNo"]) != index);
                        if (p.Count() != 0)
                        {
                            errorResult += string.Format($"Cannot be saved. Item Group Type. [{ItemGroup}] already exists at row {items["rNo"]}.\n");
                        }
                    }
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
                string TranNo = WebApp.nwobjectText("txtID");
                dt = dal.GetLinData(TranNo);
                m_spread.dataSource(dt);
                m_spread.minRow(dt.Rows.Count + 1);
            }
            else
            {
                m_spread.CreateExcelGrid(5, SPR_BASEUOMCODE);
            }

            #region Column Name

            m_spread.nwobject(SPR_ITEMGROUPTYPEDESC - 1).ColumnName("Item Group Type Description");
            m_spread.nwobject(SPR_ITEMGROUPTYPECODE - 1).ColumnName("Item Group Type Code");
            m_spread.nwobject(SPR_ITEMDESC - 1).ColumnName("Item Description");
            m_spread.nwobject(SPR_ITEMCODE - 1).ColumnName("Item Code");
            m_spread.nwobject(SPR_BASEUOM - 1).ColumnName("Base UOM");
            m_spread.nwobject(SPR_VATTAXDESC - 1).ColumnName("VAT Short Description");
            m_spread.nwobject(SPR_EWTDESC - 1).ColumnName("EWT Short Description");
            m_spread.nwobject(SPR_REMARKS - 1).ColumnName("Remarks");

            #endregion


            #region Require and Optional

            m_spread.nwobject(SPR_ITEMGROUPTYPECODE - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_VATTAXDESC - 1).HeaderFieldOptional(true);
            m_spread.nwobject(SPR_EWTDESC - 1).HeaderFieldOptional(true);

            #endregion


            #region Input

            #endregion
            
            #region Template

            m_spread.nwobject(SPR_REMARKS - 1).Remarks("...");
            m_spread.nwobject(SPR_REMARKS - 1).ObjectType("button");
            m_spread.nwobject(SPR_REMARKS - 1).BackgroundColor("#006060");
            m_spread.nwobject(SPR_REMARKS - 1).TextAlign("center");
            #endregion

            #region Special

            #endregion

            #region Header Grouping

            //m_spread.HeaderGroupADD("Test", SPR_LOOKUPCODE - 1, 2);h

            #endregion

            #region Width

            m_spread.nwobject(SPR_ITEMGROUPTYPEDESC - 1).Width(250);
            m_spread.nwobject(SPR_ITEMGROUPTYPECODE - 1).Width(120);
            m_spread.nwobject(SPR_ITEMDESC - 1).Width(250);
            m_spread.nwobject(SPR_ITEMCODE - 1).Width(120);
            m_spread.nwobject(SPR_BASEUOM - 1).Width(120);
            m_spread.nwobject(SPR_VATTAXDESC - 1).Width(150);
            m_spread.nwobject(SPR_EWTDESC - 1).Width(150);
            m_spread.nwobject(SPR_REMARKS - 1).Width(150);
            m_spread.nwobject(SPR_TAGREMARKS - 1).Width(0);
            m_spread.nwobject(SPR_VATTAXCODE - 1).Width(0);
            m_spread.nwobject(SPR_EWTCODE - 1).Width(0);
            m_spread.nwobject(SPR_BASEUOMCODE - 1).Width(0);


            #endregion

            #region Color


            m_spread.nwobject(SPR_ITEMGROUPTYPEDESC - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_ITEMGROUPTYPECODE - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_ITEMDESC - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_ITEMCODE - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_BASEUOM - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_VATTAXDESC - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_EWTDESC - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_REMARKS - 1).BackgroundColor("gainsboro");


            #endregion


            #region Grid Buttons

            m_spread.buttonInsert = true;
            m_spread.buttonDelete = true;
            m_spread.buttonSearchFind = false;
            m_spread.buttonResetColumn = true;
            m_spread.buttonSaveColumn = true;
            m_spread.ButtonMenuAdd("btnCopyFrom", "Copy From");
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

        private void DefaultVatCode()
        {
            string SupplierCode = string.Empty;
            string VatDesc = string.Empty;
            string EWTDesc = string.Empty;
            string VatCode = string.Empty;
            string EWTCode = string.Empty;
            int row = 0;
            DataTable dt = new DataTable();

            SupplierCode = WebApp.nwobjectText("idvallugVendor");
            row = Parser.ParseInt(WebApp.nwobjectText("row"));

            dt = dal.DefaultVatCode(SupplierCode);
            if (dt.Rows.Count > 0)
            {

                VatDesc = Parser.ParseString(dt.Rows[0]["VatDesc"]);
                EWTDesc = Parser.ParseString(dt.Rows[0]["EWTDesc"]);
                VatCode = Parser.ParseString(dt.Rows[0]["VatCode"]);
                EWTCode = Parser.ParseString(dt.Rows[0]["EWTCode"]);

                string xVATDesc = string.Format($"nwGridCon_Book.ActiveSheet.SetText((SPR_VATTAXDESC - 1), {row}, '{VatDesc}');");
                string yEWTDesc = string.Format($"nwGridCon_Book.ActiveSheet.SetText((SPR_EWTDESC - 1), {row}, '{EWTDesc}');");
                string yVATCode = string.Format($"nwGridCon_Book.ActiveSheet.SetText((SPR_VATTAXCODE - 1), {row}, '{VatCode}');");
                string yEWTCode = string.Format($"nwGridCon_Book.ActiveSheet.SetText((SPR_EWTCODE - 1), {row}, '{EWTCode}');");

                js.ADD(xVATDesc);
                js.ADD(yEWTDesc);
                js.ADD(yVATCode);
                js.ADD(yEWTCode);
            }

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
            dr["Vendor"] = WebApp.nwobjectText("idvallugVendor");
            dr["Remarks"] = WebApp.nwobjectText("txtRemarks");
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
            if(ds.Tables.Count > 0)
            {
                dt = ds.Tables[0];
            }
            dtLIN.Columns.Add("rNo", typeof(int));

            int ctr = 1;

            foreach (DataRow dr_details in dt.Rows)
            {
                DataRow dr = dtLIN.NewRow();
                if (dr_details[SPR_ITEMGROUPTYPECODE - 1].ToString() != string.Empty 
                    || dr_details[SPR_ITEMCODE - 1].ToString() != string.Empty
                    || dr_details[SPR_BASEUOMCODE - 1].ToString() != string.Empty
                    || dr_details[SPR_VATTAXCODE - 1].ToString() != string.Empty
                    || dr_details[SPR_EWTCODE - 1].ToString() != string.Empty
                    || dr_details[SPR_REMARKS - 1].ToString() != string.Empty)
                {
                    dr["Vendor"] = WebApp.nwobjectText("idvallugVendor");
                    dr["ItemGroupType"] = dr_details[SPR_ITEMGROUPTYPECODE - 1].ToString();
                    dr["Item"] = dr_details[SPR_ITEMCODE - 1].ToString();
                    dr["BaseUOM"] = dr_details[SPR_BASEUOMCODE - 1].ToString();
                    dr["VatCode"] = dr_details[SPR_VATTAXCODE - 1].ToString();
                    dr["EWTCode"] = dr_details[SPR_EWTCODE - 1].ToString();
                    dr["Remarks"] = dr_details[SPR_REMARKS - 1].ToString();
                    dr["rNo"] = ctr;
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
            nwToolBox.bindingNavigatorSaveItem.Visible = true;
            nwToolBox.bindingNavigatorDeleteItem.Visible = true;
            nwToolBox.bindingNavigatorInquireItem.Visible = true;
            nwToolBox.bindingNavigatorExportItem.Visible = true;
            nwToolBox.bindingNavigatorImportItem.Visible = false;
            nwToolBox.bindingNavigatorProcessItem.Visible = false;

            nwToolBox.bindingNavigatorAddNewItem.Enable = true;
            nwToolBox.bindingNavigatorSaveItem.Enable = false;
            nwToolBox.bindingNavigatorDeleteItem.Enable = false;
            nwToolBox.bindingNavigatorInquireItem.Enable = true;
            nwToolBox.bindingNavigatorExportItem.Enable = true;
            nwToolBox.bindingNavigatorImportItem.Enable = false;
            nwToolBox.bindingNavigatorProcessItem.Enable = false;
            nwToolBox.bindingNavigatorPrintItem.Enable = false;

        }

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
            Data_Enable();
            CreateGrid(true);
            js.ADD("$('#nwGridCon').enable(false);");
        }

        private void RefreshData()
        {
            js.ADD("ClearFields();");
            js.ADD("$('#nwGridCon').enable(false)");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
        }
    }
}