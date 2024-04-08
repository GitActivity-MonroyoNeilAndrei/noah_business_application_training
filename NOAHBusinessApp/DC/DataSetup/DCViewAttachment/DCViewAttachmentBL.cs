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
    public class DCViewAttachmentBL : nwAction
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
            //Addchars();
            dal = new DCViewAttachmentDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        DCViewAttachmentDAL dal;
        int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public const int
                        //nwGridSourceCon
                        SPR_TRANSACTIONNO = 1,
                        SPR_VALUEDATE = 2,
                        SPR_VIEWENTRYDTLS = 3,
                        SPR_VIEWFORMDETAILS = 4,
                        SPR_FORREQCOMPUPD = 5,
                        SPR_REMARKSCOMPUPD = 6,
                        SPR_RETURNTO = 7,
                        SPR_RETURNTONAME = 8,        
                        SPR_TRANTYPE = 9,   
                        SPR_ISVIEW = 10,  
                        SPR_ISALLOWRET = 11,  
                        SPR_PRINTNAME = 12,
                        SPR_PRINTID = 13,        
                        SPR_MENUITEM = 14,
                        SPR_MENULINK = 15,

                        //nwGridSuppCon
                        SPR_SUP_TRANNO = 1,
                        SPR_SUP_RETURN = 2,
                        SPR_SUP_COMPLIED = 3,
                        SPR_SUP_REQUIRED = 4,
                        SPR_SUP_VWATTACH = 5,
                        SPR_SUP_ROWNO = 6,
                        SPR_SUP_WORKINS = 7,
                        SPR_SUP_WORKINSCODE = 8,
                        SPR_SUP_WORKINSDESC = 9,
                        SPR_SUP_DOCNO = 10,
                        SPR_SUP_DOCDATE = 11,
                        SPR_SUP_EXPIRYDATE = 12,
                        SPR_SUP_URL = 13,
                       
                        SPR_SUP_REMARKSDOCRET = 14,
                        SPR_SUP_RETURNTOCODE = 15,
                        SPR_SUP_RETURNTODESC = 16,
                        SPR_SUP_FILEPATH = 17,
                        SPR_SUP_LINEID = 18,
                        SPR_SUP_TRANTYPE = 19,
                        SPR_SUP_ISALLOWRET = 20,
                        SPR_SUP_LINEIDSETUP = 21,
                        SPR_SUP_IGTCODE = 22,
                        SPR_SUP_RCROWNO = 23,
                        SPR_SUP_RCROW = 24,
                        SPR_SUP_VALUEDATE = 25;

        public DCViewAttachmentBL()
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

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.inquireQuery();
                    strMethod = strMethod.Substring(3);
                    
                    //nwObject.ColumnHide(1);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugReturnTo":
                    strSQL = dal.getRetCodeSource();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugReturnToSup":
                    strSQL = dal.getRetCodeSupp();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
            }

            return strFinal;
        }

        /*Standard RecordOperation*/ 

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string result = "", tempstr = "";

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
                    break;

                case eRecordOperation.Save:
                    RecordOperationResult = AreValidEntries("saved");

                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dtSource = LoadSchemaSourceDoc();
                        DataTable dtSupp = LoadSchemaSuppDoc();
                        RecordOperationResult = dal.SaveData(dtSource, dtSupp, based.SecurityAccess.RecUser, isNewRow, WebApp.nwobjectBool("isSave"), "Saved successfully");
                        js.ADD("closeIframeFromRvw();");
                    }                   
                    break;

                case eRecordOperation.Delete:                  
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("txtCode"));                    
                    break;

                case eRecordOperation.Process:
                    RecordOperationResult = AreValidEntries("processed");

                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dtSource = LoadSchemaSourceDoc();
                        DataTable dtSupp = LoadSchemaSuppDoc();
                        RecordOperationResult = dal.SaveData(dtSource, dtSupp, based.SecurityAccess.RecUser, isNewRow, WebApp.nwobjectBool("isSave"), "Process completed");
                        js.ADD("closeIframeFromRvw();");
                    }                    
                    //tempstr = "Process";
                    //Prompt.Information(tempstr, based.Title);
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

                    js.ADD("nwLoading_End('xSample')");

                    break;
                case eRecordOperation.Print:
                    tempstr = "print";
                    // Prompt.Information(tempstr, based.Title);
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
                if (RecordOperationResult.IndexOf("Error") == 0 || RecordOperationResult.Contains("Cannot"))
                {
                    Prompt.Error(RecordOperationResult, "Review Attachment(s) Window");
                }
                else
                {
                    RefreshData();
                    js.ADD("loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtCode") + "') ");                    
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    Prompt.Information(RecordOperationResult, "Review Attachment(s) Window");
                }
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
            string strFinal = "", strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();
                    break;

                case "actBindCollectionEmpty":
                    js.ADD("nwLoading_End('xSample')");
                    break;

                case "actViewForms":
                    PrintPreview(WebApp.nwobjectText("menuitemName"), WebApp.nwobjectText("printingID"), WebApp.nwobjectText("docno"));
                    js.ADD("nwLoading_End('xbtnVwForms')");
                    break;

                case "actValidateRvwAttach":
                    bool isValidate = dal.isValidate(WebApp.nwobjectText("tranNo"));
                    if (isValidate)
                    {
                        if (WebApp.nwobjectText("details").Equals("source"))
                        {
                            js.ADD(string.Format("$('#nwGridSource .tblGridBody tr:nth-child(' + ({0}) + ') td:nth-child(' + ({1}) + ') input').prop('checked', false);", WebApp.nwobjectInt("currRow") + 1, SPR_FORREQCOMPUPD + 1));
                        }
                        if (WebApp.nwobjectText("details").Equals("supp"))
                        {
                            js.ADD(string.Format("$('#nwGridSuppCon .tblGridBody tr:nth-child(' + ({0}) + ') td:nth-child(' + ({1}) + ') input').prop('checked', false);", WebApp.nwobjectInt("currRow") + 1, SPR_SUP_RETURN + 1));
                        }
                        Prompt.Error("Cannot proceed. Transaction No. " + WebApp.nwobjectText("tranNo") + " has pending documents requiring compliance updating.", "Review Attachment(s)");                        
                    }
                    else
                    {
                        if (WebApp.nwobjectText("details").Equals("source"))
                        {
                            js.ADD("SourceDocsRet();");
                        }
                        if (WebApp.nwobjectText("details").Equals("supp"))
                        {
                            js.ADD("SuppDocsRet();");
                        }                      
                    }
                    js.ADD("nwLoading_End('xDocReturn')");                    
                    break;


                case "actViewFiles":
                    string strurl = WebApp.nwobjectText("url");
                    string strtitle = WebApp.nwobjectText("title");
                    strurl = nwSystem.StringEncryptAES(strurl);
                    strurl =  strurl.Replace("+", "AAGxAAG");

                    strtitle = nwSystem.StringEncryptAES(strtitle);
                    strtitle = strtitle.Replace("+", "AAGxAAG");


                    js.ADD($"opennewTab('{strurl}', '{strtitle}')");

                    js.ADD("nwLoading_End('actViewFiles')");
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
                    standardBL.PrimaryKey = "ID";
                    string nwUnitCode = WebApp.nwobjectText("txtUnitInventoryCode");
                    System.Web.UI.Page page = new System.Web.UI.Page();
                    page.Session["nwUnitCode"] = nwUnitCode;

                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(), this.UserDefinedConnectionString);
                    break;
            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#txtYear", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Year");
            SFObject.SetControlBinding("#idvallugPeriod", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Code");
            SFObject.SetControlBinding("#descvallugPeriod", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Description");

            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");
        }

        //////////////// end of standard / standard custumize

        private void BindCollection()
        {
            GenerateSuppGrid(true);
            GenerateSourceGrid(true);
            js.ADD("nwLoading_End('xSample');");                 
        }

        private string AreValidEntries(string toolbox)
        {
            string errorResult = String.Empty;
            string moduleList = string.Empty;
            DataTable dtSource = new DataTable();
            DataTable dtSupp = new DataTable();
           
            dtSource = WebApp.nwGridData(WebApp.nwobjectText("nwGridSourceCon"));            
            dtSupp = WebApp.nwGridData(WebApp.nwobjectText("nwGridSuppCon"));

            bool isTick = false;
            if (dtSource.Rows.Count > 0)
            {
                int rowSrc = 1;
                foreach(DataRow dSrc in dtSource.Rows)
                {
                    if (Parser.ParseBool(dSrc[SPR_FORREQCOMPUPD - 1].ToString()))
                    {
                        isTick = true;
                        if (dSrc[SPR_REMARKSCOMPUPD - 1].ToString() == string.Empty)
                        {
                            errorResult += "Cannot be " + toolbox + ". Source Documents: Remarks for Compliance Updating in row " + rowSrc + " is required.\n";
                        }
                        if (dSrc[SPR_RETURNTO - 1].ToString() == string.Empty)
                        {
                            errorResult += "Cannot be " + toolbox + ". Source Documents: Return To Code in row " + rowSrc + " is required.\n";
                        }
                    }                   
                    rowSrc++;
                }
            }
            
            if (dtSupp.Rows.Count > 0)
            {
                int rowSup = 1;
                foreach (DataRow dSup in dtSupp.Rows)
                {                    
                    if (Parser.ParseBool(dSup[SPR_SUP_RETURN - 1].ToString()))
                    {
                        isTick = true;
                        if (dSup[SPR_SUP_REMARKSDOCRET - 1].ToString() == string.Empty)
                        {
                            errorResult += "Cannot be " + toolbox + ". Supporting Documents: Remarks for Document Return in row " + rowSup + " is required.\n";
                        }
                        if (dSup[SPR_SUP_RETURNTOCODE - 1].ToString() == string.Empty)
                        {
                            errorResult += "Cannot be " + toolbox + ". Supporting Documents: Return To Code in row " + rowSup + " is required.\n";
                        }
                    }                   
                    rowSup++;
                }
            }

            if (!isTick)
            {
                errorResult = "Cannot be " + toolbox + ". No Transaction No. has been selected.";
            }

            return errorResult;
        }


        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtLINTemp = new DataTable();
            dtLINTemp = dal.LoadSchema();
            #endregion

            DataTable dtLIN = WebApp.nwGridData(WebApp.nwobjectText("nwGridLocCon"), true);
            int rowno = 1;
            foreach (DataRow row in dtLIN.Rows)
            {
                if (Parser.ParseBool(row[SPR_SUP_TRANNO - 1].ToString()) && !Parser.ParseBool(row[SPR_SUP_DOCNO - 1].ToString()))
                {
                    DataRow dr = dtLINTemp.NewRow();
                    dr["year"] = WebApp.nwobjectText("year");
                    dr["periodNo"] = WebApp.nwobjectText("period");
                    dr["locForm"] = WebApp.nwobjectText("location");
                    dr["module"] = row[SPR_SUP_COMPLIED - 1].ToString();               
                    dr["recuser"] = based.SecurityAccess.RecUser;
                    rowno++;

                    dtLINTemp.Rows.Add(dr);
                }

                #region don't change
                dtLINTemp.AcceptChanges();
                #endregion
            }

            return dtLINTemp;
        }

        private DataTable LoadSchemaSourceDoc()
        {
            #region don't change
            DataTable dtSource = new DataTable();
            dtSource = dal.LoadSchemaSrc();
            #endregion

            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridSourceCon"));

            int rownum = 1;

            if (dt.Rows.Count > 0)
            {
                foreach (DataRow dRow in dt.Rows)
                {
                    if (dRow[SPR_TRANSACTIONNO - 1].ToString() != string.Empty && Parser.ParseBool(dRow[SPR_FORREQCOMPUPD - 1].ToString()))
                    {
                        DataRow dr = dtSource.NewRow();
                        dr["docno"] = dRow[SPR_TRANSACTIONNO - 1].ToString();
                        dr["valueDate"] = dRow[SPR_VALUEDATE - 1].ToString().Equals("") ? (object)DBNull.Value : Parser.ParseDateTime(dRow[SPR_VALUEDATE - 1].ToString(), Parser.DateTimeType.Default);
                        dr["tranType"] = dRow[SPR_TRANTYPE - 1].ToString();
                        dr["srcforReqCompUpd"] = Parser.ParseBool(dRow[SPR_FORREQCOMPUPD - 1].ToString());
                        dr["srcRemarksForUpdating"] = dRow[SPR_REMARKSCOMPUPD - 1].ToString();
                        dr["srcReturnToCode"] = dRow[SPR_RETURNTO - 1].ToString();
                        dr["recuser"] = based.SecurityAccess.RecUser;
                        dr["moduser"] = based.SecurityAccess.RecUser;
                        dr["postuser"] = based.SecurityAccess.RecUser;

                        rownum++;

                        dtSource.Rows.Add(dr);
                        dtSource.AcceptChanges();
                    }                 
                }
            }
            
            return dtSource;
        }

        private DataTable LoadSchemaSuppDoc()
        {
            #region don't change
            DataTable dtSup = new DataTable();
            dtSup = dal.LoadSchemaSup();
            #endregion

            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridSuppCon"));

            int rownum = 1;

            if (dt.Rows.Count > 0)
            {
                foreach (DataRow dRow in dt.Rows)
                {
                    if (dRow[SPR_TRANSACTIONNO - 1].ToString() != string.Empty && Parser.ParseBool(dRow[SPR_SUP_RETURN - 1].ToString()))
                    {
                        DataRow dr = dtSup.NewRow();
                        dr["docno"] = dRow[SPR_SUP_TRANNO - 1].ToString();
                        dr["lineID"] = Parser.ParseInt(dRow[SPR_SUP_LINEID - 1].ToString());
                        dr["rowno"] = rownum;                                               
                        dr["docDtl"] = dRow[SPR_SUP_WORKINSCODE - 1].ToString();
                        dr["documentNo"] = dRow[SPR_SUP_DOCNO - 1].ToString();
                        dr["documentDate"] = dRow[SPR_SUP_DOCDATE - 1].ToString().Equals("") ? (object)DBNull.Value : Parser.ParseDateTime(dRow[SPR_SUP_DOCDATE - 1].ToString(), Parser.DateTimeType.Default);
                        dr["expiryDate"] = dRow[SPR_SUP_EXPIRYDATE - 1].ToString().Equals("") ? (object)DBNull.Value : Parser.ParseDateTime(dRow[SPR_SUP_EXPIRYDATE - 1].ToString(), Parser.DateTimeType.Default);
                        dr["url"] = dRow[SPR_SUP_URL - 1].ToString();
                        dr["return"] = Parser.ParseBool(dRow[SPR_SUP_RETURN - 1].ToString());
                        dr["tranType"] = dRow[SPR_SUP_TRANTYPE - 1].ToString();
                        dr["workIns"] = dRow[SPR_SUP_WORKINS - 1].ToString();
                        dr["remarksForReturn"] = dRow[SPR_SUP_REMARKSDOCRET - 1].ToString();
                        dr["returnToCode"] = dRow[SPR_SUP_RETURNTOCODE - 1].ToString();
                        dr["recuser"] = based.SecurityAccess.RecUser;
                        dr["postuser"] = based.SecurityAccess.RecUser;
                        dr["lineidSetup"] = Parser.ParseInt(dRow[SPR_SUP_LINEIDSETUP - 1].ToString());
                        dr["rcRowno"] = Parser.ParseInt(dRow[SPR_SUP_RCROWNO - 1].ToString());
                        dr["rcRow"] = Parser.ParseInt(dRow[SPR_SUP_RCROW - 1].ToString());
                        dr["itemGroupType"] = dRow[SPR_SUP_IGTCODE - 1].ToString();
                        if (dRow[SPR_SUP_COMPLIED - 1].ToString() == "1" || dRow[SPR_SUP_COMPLIED - 1].ToString().ToLower() == "checked")
                        {
                            dr["complied"] = "1";
                        }
                        else
                        {
                            dr["complied"] = "";
                        }

                        if (dRow[SPR_SUP_REQUIRED - 1].ToString() == "1" || dRow[SPR_SUP_REQUIRED - 1].ToString().ToLower() == "checked")
                        {
                            dr["required"] = "1";
                        }
                        else
                        {
                            dr["required"] = "";
                        }
                        rownum++;

                        dtSup.Rows.Add(dr);
                        dtSup.AcceptChanges();
                    }
                }
            }

            return dtSup;
        }

        public void Data_Enable()
        {
            nwToolBox.bindingNavigatorAddNewItem.Enable =
            nwToolBox.bindingNavigatorSaveItem.Enable =
            nwToolBox.bindingNavigatorPrintItem.Enable =
            nwToolBox.bindingNavigatorInquireItem.Enable =
            nwToolBox.bindingNavigatorDeleteItem.Enable =
            nwToolBox.bindingNavigatorExportItem.Enable = true;

            nwToolBox.bindingNavigatorImportItem.Visible =
            nwToolBox.bindingNavigatorProcessItem.Visible = false;
        }

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
                  
            GenerateSourceGrid(false);
            GenerateSuppGrid(false);
            js.ADD("mainLoad();");
            string serverLink = dal.ServerLink();
           
            //DEVELOPMENT ONLY: COMMENT THIS WHEN DEPLOYING (USE FOR dbo.SystemConfig fileserver url for production)
            //#if DEBUG
            //            serverLink = WebApp.nwobjectText("urlPath") + string.Format("/forms_standards/Files/Sample");
            //#endif
            js.makeValueText("#txtserverlink", serverLink);
            based.SecurityAccess.RecUser = WebApp.nwobjectText("txtRecuser");
            js.ADD("DisableUponView()");

        }

        private void RefreshData()
        {
            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear(); nwParameter_Add('nwDocno', nwDocno);");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\");"); // goto: getToolBoxData
            js.ADD("RefreshData();");         
        }       

        private void LoadQuery(DataTable dt, nwGrid nwGridData)
        {
            int Row = 0;
            foreach (DataRow items in dt.Rows)
            {
                Row++;
                int bCtr = 1;
                foreach (DataColumn col in dt.Columns)
                {
                    nwGridData.Row = Row;
                    nwGridData.Col = bCtr;
                    nwGridData.Text = Parser.ParseString(items[col].ToString().Trim());
                    bCtr++;
                }
            }
        }

        //public void GenerateSourceGrid(bool isLoad)
        //{
        //    string gridID = "nwGridSource";
        //    nwGrid nwGridCon = new nwGrid(gridID);
        //    DataTable dt = new DataTable();

        //    int rowCnt = 1;
        //    int colCnt = SPR_MENULINK;       

        //    nwGridCon.CreateExcelGrid(rowCnt, colCnt);
        //    nwGridCon.minRow(5);
        //    nwGridCon.TableHeight(170);

        //    nwGridCon.buttonDelete = false;
        //    nwGridCon.buttonInsert = false;
        //    nwGridCon.buttonSaveColumn = false;
        //    nwGridCon.buttonResetColumn = false;
        //    nwGridCon.buttonCopyRow = false;

        //    #region Column Name           
        //    nwGridCon.nwobject(SPR_TRANSACTIONNO - 1).ColumnName("Transaction No.");
        //    nwGridCon.nwobject(SPR_VALUEDATE - 1).ColumnName("Date Posted");
        //    nwGridCon.nwobject(SPR_VIEWENTRYDTLS - 1).ColumnName("View Entry Screen");
        //    nwGridCon.nwobject(SPR_VIEWFORMDETAILS - 1).ColumnName("View Form Details");
        //    nwGridCon.nwobject(SPR_FORREQCOMPUPD - 1).ColumnName("For Reqts Compliance Updating");
        //    nwGridCon.nwobject(SPR_REMARKSCOMPUPD - 1).ColumnName("Remarks for Compliance Updating");
        //    nwGridCon.nwobject(SPR_RETURNTO - 1).ColumnName("Return To Code");
        //    nwGridCon.nwobject(SPR_RETURNTONAME - 1).ColumnName("Return To Name");
        //    #endregion

        //    #region Background Color           
        //    nwGridCon.nwobject(SPR_TRANSACTIONNO - 1).BackgroundColor("Gainsboro");
        //    nwGridCon.nwobject(SPR_VALUEDATE - 1).BackgroundColor("Gainsboro");
        //    nwGridCon.nwobject(SPR_VIEWENTRYDTLS - 1).BackgroundColor("White");
        //    nwGridCon.nwobject(SPR_VIEWFORMDETAILS - 1).BackgroundColor("White");
        //    nwGridCon.nwobject(SPR_FORREQCOMPUPD - 1).BackgroundColor("White");
        //    nwGridCon.nwobject(SPR_REMARKSCOMPUPD - 1).BackgroundColor("White");
        //    nwGridCon.nwobject(SPR_RETURNTO - 1).BackgroundColor("Cyan");
        //    nwGridCon.nwobject(SPR_RETURNTONAME - 1).BackgroundColor("Gainsboro");
        //    #endregion

        //    #region Column Width  
        //    nwGridCon.nwobject(SPR_TRANSACTIONNO - 1).Width(220);
        //    nwGridCon.nwobject(SPR_TRANTYPE - 1).Width(0);
        //    nwGridCon.nwobject(SPR_FORREQCOMPUPD - 1).Width(80);
        //    nwGridCon.nwobject(SPR_REMARKSCOMPUPD - 1).Width(180);
        //    nwGridCon.nwobject(SPR_VIEWENTRYDTLS - 1).Width(80);
        //    nwGridCon.nwobject(SPR_VIEWFORMDETAILS - 1).Width(80);
        //    nwGridCon.nwobject(SPR_ISVIEW - 1).Width(0);
        //    nwGridCon.nwobject(SPR_ISALLOWRET - 1).Width(0);
        //    nwGridCon.nwobject(SPR_PRINTNAME - 1).Width(0);
        //    nwGridCon.nwobject(SPR_PRINTID - 1).Width(0);
        //    nwGridCon.nwobject(SPR_MENUITEM - 1).Width(0);
        //    nwGridCon.nwobject(SPR_MENULINK - 1).Width(0);
        //    #endregion

        //    #region Column Template   
        //    nwGridCon.nwobject(SPR_VIEWENTRYDTLS - 1).Template("<div class='cuz-009'>...</div>");
        //    nwGridCon.nwobject(SPR_VIEWFORMDETAILS - 1).Template("<div class='cuz-009'>...</div>");
        //    nwGridCon.nwobject(SPR_FORREQCOMPUPD - 1).Template("<input type='checkbox' class ='chkReqCompUpd cuz-010' {4}/>");
        //    nwGridCon.nwobject(SPR_REMARKSCOMPUPD - 1).Template("<input type='text' class='txtRemarksUpd' maxlength='255' value='{" + (SPR_REMARKSCOMPUPD - 1) + "}' disabled></input>");
        //    #endregion

        //    #region Class
        //    nwGridCon.nwobject(SPR_VIEWENTRYDTLS - 1).Class("btnSmall btnGray btnVwEntry");
        //    nwGridCon.nwobject(SPR_VIEWFORMDETAILS - 1).Class("btnSmall btnGray btnVwForms");
        //    #endregion

        //    #region Required Field           
        //    #endregion

        //    if (isLoad)
        //    {                
        //        dt = dal.getSourceDocData(WebApp.nwobjectText("nwDocno"));
        //        nwGridCon.CreateExcelGrid(dt.Rows.Count + 1, colCnt);
        //        nwGridCon.dataSource(dt);
        //        nwGridCon.maxRow(dt.Rows.Count);
        //    }

        //    nwGridCon.GetSaveSort(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser); // this line will be default and suggested line code if there are many grid in one menu item  change -1 to -2 and so on...
        //    nwGridCon.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

        //    //## THEME FORMAT
        //    nwGridCon.HeaderBorderColor("#DEDEDE");
        //    nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
        //    nwGridCon.TableBorderColor("#BBB");
        //    nwGridCon.BodyBorderColor("#BBB");
        //    nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
        //    nwGridCon.HeaderTextColor("#131313");
        //    nwGridCon.HoverColor("#DEDEDE", "inherit");
        //    nwGridCon.SelectedRowHover("#DEDEDE");
        //    nwGridCon.SelectedRowHoverColor("inherit");

        //    js.makeHTML("#nwGridSourceCon", nwGridCon.createTable());
        //    js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
        //    js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
        //    js.ADD("nwGrid_makeResize(\"" + gridID + "\")");      
        //    js.ADD("$('#" + gridID + "Con tr td').css('white-space', 'nowrap');");
        //    js.ADD("SourceDtlsProp(); SourceProp();");
        //}
        public void GenerateSourceGrid(bool isLoad)
        {
            //string gridID = "nwGridSource";
            //nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();
            string gridID = "nwGridSource";
            nwGrid nwGridCon = new nwGrid(gridID);
            nwGridCon.Type = nwGridType.SpreadCanvas;

 

            nwGridCon.RowHeight(5);
            nwGridCon.CreateExcelGrid(5, SPR_MENULINK);
            //nwGridCon.TableHeight(200);
            nwGridCon.minRow(5);
            int rowCnt = 1;
            int colCnt = SPR_MENULINK;

            //nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            //nwGridCon.minRow(5);

            nwGridCon.buttonDelete = false;
            nwGridCon.buttonInsert = false;
            nwGridCon.buttonSaveColumn = false;
            nwGridCon.buttonResetColumn = false;
            nwGridCon.buttonCopyRow = false;

            #region Column Name           
            nwGridCon.nwobject(SPR_TRANSACTIONNO - 1).ColumnName("Transaction No.");
            nwGridCon.nwobject(SPR_VALUEDATE - 1).ColumnName("Date Posted");
            nwGridCon.nwobject(SPR_VIEWENTRYDTLS - 1).ColumnName("View Entry Screen");
            nwGridCon.nwobject(SPR_VIEWFORMDETAILS - 1).ColumnName("View Form Details");
            nwGridCon.nwobject(SPR_FORREQCOMPUPD - 1).ColumnName("For Reqts Compliance Updating");
            nwGridCon.nwobject(SPR_REMARKSCOMPUPD - 1).ColumnName("Remarks for Compliance Updating");
            nwGridCon.nwobject(SPR_RETURNTO - 1).ColumnName("Return To Code");
            nwGridCon.nwobject(SPR_RETURNTONAME - 1).ColumnName("Return To Name");
            #endregion

            #region Background Color           
            nwGridCon.nwobject(SPR_TRANSACTIONNO - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_VALUEDATE - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_VIEWENTRYDTLS - 1).BackgroundColor("White");
            nwGridCon.nwobject(SPR_VIEWFORMDETAILS - 1).BackgroundColor("White");
            nwGridCon.nwobject(SPR_FORREQCOMPUPD - 1).BackgroundColor("White");
            nwGridCon.nwobject(SPR_REMARKSCOMPUPD - 1).BackgroundColor("White");
            nwGridCon.nwobject(SPR_RETURNTO - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_RETURNTONAME - 1).BackgroundColor("Gainsboro");
            #endregion

            #region Column Width  
            nwGridCon.nwobject(SPR_TRANSACTIONNO - 1).Width(220);
            nwGridCon.nwobject(SPR_TRANTYPE - 1).Width(0);
            //nwGridCon.nwobject(SPR_FORREQCOMPUPD - 1).Width(80);
            //nwGridCon.nwobject(SPR_REMARKSCOMPUPD - 1).Width(180);
            nwGridCon.nwobject(SPR_FORREQCOMPUPD - 1).Width(0);
            nwGridCon.nwobject(SPR_REMARKSCOMPUPD - 1).Width(0);
            nwGridCon.nwobject(SPR_VIEWENTRYDTLS - 1).Width(80);
            //nwGridCon.nwobject(SPR_VIEWFORMDETAILS - 1).Width(80);
            nwGridCon.nwobject(SPR_VIEWFORMDETAILS - 1).Width(0);

            nwGridCon.nwobject(SPR_ISVIEW - 1).Width(0);
            nwGridCon.nwobject(SPR_ISALLOWRET - 1).Width(0);
            nwGridCon.nwobject(SPR_PRINTNAME - 1).Width(0);
            nwGridCon.nwobject(SPR_PRINTID - 1).Width(0);
            nwGridCon.nwobject(SPR_MENUITEM - 1).Width(0);
            nwGridCon.nwobject(SPR_MENULINK - 1).Width(0);
            #endregion


            //nwGridCon.nwobject(SPR_RETURNTO - 1).LookUp("lugReturnTo", false, true);
            nwGridCon.nwobject(SPR_RETURNTO - 1).Enabled(false);
            nwGridCon.nwobject(SPR_REMARKSCOMPUPD - 1).Input();
            nwGridCon.nwobject(SPR_REMARKSCOMPUPD - 1).Enabled(true);
            nwGridCon.nwobject(SPR_FORREQCOMPUPD - 1).CheckBox(false, "", true);
            

        
            nwGridCon.nwobject(SPR_VIEWENTRYDTLS - 1).BackgroundColor("#42f58a");

            #region Column Template   

            //nwGridCon.nwobject(SPR_VIEWENTRYDTLS - 1).Template("<div class='cuz-009'>...</div>");
            //nwGridCon.nwobject(SPR_VIEWFORMDETAILS - 1).Template("<div class='cuz-009'>...</div>");
            //nwGridCon.nwobject(SPR_FORREQCOMPUPD - 1).Template("<input type='checkbox' class ='chkReqCompUpd cuz-010' {4}/>");
            //nwGridCon.nwobject(SPR_REMARKSCOMPUPD - 1).Template("<input type='text' class='txtRemarksUpd' maxlength='255' value='{" + (SPR_REMARKSCOMPUPD - 1) + "}' disabled></input>");
            //#endregion

            //#region Class
            nwGridCon.nwobject(SPR_VIEWENTRYDTLS - 1).Class("btnSmall btnGray btnVwEntry");
            nwGridCon.nwobject(SPR_VIEWFORMDETAILS - 1).Class("btnSmall btnGray btnVwForms");
            #endregion

            #region Required Field           
            #endregion

            if (isLoad)
            {
                dt = dal.getSourceDocData(WebApp.nwobjectText("nwDocno"));
                nwGridCon.CreateExcelGrid(dt.Rows.Count + 1, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count);
            }
            nwGridCon.TableHeight(200);
            nwGridCon.varSpreadBook = "nwGridMainCon_Book";
            nwGridCon.varSpreadSheet = "nwGridMainCon_Sheet";
            js.ADD(nwGridCon.createTable());

            nwGridCon.SetTheme(nwGridTheme.Default);
            //nwGridCon.GetSaveSort(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser); // this line will be default and suggested line code if there are many grid in one menu item  change -1 to -2 and so on...
            //nwGridCon.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

            //## THEME FORMAT
            //nwGridCon.HeaderBorderColor("#DEDEDE");
            //nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            //nwGridCon.TableBorderColor("#BBB");
            //nwGridCon.BodyBorderColor("#BBB");
            //nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            //nwGridCon.HeaderTextColor("#131313");
            //nwGridCon.HoverColor("#DEDEDE", "inherit");
            //nwGridCon.SelectedRowHover("#DEDEDE");
            //nwGridCon.SelectedRowHoverColor("inherit");

            //js.makeHTML("#nwGridSourceCon", nwGridCon.createTable());
            //js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            //js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            //js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            //js.ADD("$('#" + gridID + "Con tr td').css('white-space', 'nowrap');");
            //js.ADD("SourceDtlsProp(); SourceProp();");
        }
        //public void GenerateSuppGrid(bool isLoad)
        //{
        //    string gridID = "nwGridSupp";
        //    nwGrid nwGridCon = new nwGrid(gridID);
        //    DataTable dt = new DataTable();

        //    int rowCnt = 1;
        //    int colCnt = SPR_SUP_VALUEDATE;

        //    nwGridCon.CreateExcelGrid(rowCnt, colCnt);
        //    nwGridCon.minRow(5);
        //    nwGridCon.TableHeight(300);

        //    nwGridCon.buttonDelete = false;
        //    nwGridCon.buttonInsert = false;
        //    nwGridCon.buttonSaveColumn = false;
        //    nwGridCon.buttonResetColumn = false;
        //    nwGridCon.buttonCopyRow = false;            

        //    #region Column Name           
        //    nwGridCon.nwobject(SPR_SUP_TRANNO - 1).ColumnName("Transaction No.");
        //    nwGridCon.nwobject(SPR_SUP_RETURN - 1).ColumnName("Return");
        //    nwGridCon.nwobject(SPR_SUP_COMPLIED - 1).ColumnName("Complied");
        //    nwGridCon.nwobject(SPR_SUP_REQUIRED - 1).ColumnName("Required");
        //    nwGridCon.nwobject(SPR_SUP_ROWNO - 1).ColumnName("Ref. Row No.");
        //    nwGridCon.nwobject(SPR_SUP_WORKINS - 1).ColumnName("Work Instructions");
        //    nwGridCon.nwobject(SPR_SUP_WORKINSCODE - 1).ColumnName("Document Code");
        //    nwGridCon.nwobject(SPR_SUP_WORKINSDESC - 1).ColumnName("Document Description");
        //    nwGridCon.nwobject(SPR_SUP_DOCNO - 1).ColumnName("Document No.");
        //    nwGridCon.nwobject(SPR_SUP_DOCDATE - 1).ColumnName("Document Date");
        //    nwGridCon.nwobject(SPR_SUP_EXPIRYDATE - 1).ColumnName("Expiry Date");
        //    nwGridCon.nwobject(SPR_SUP_URL - 1).ColumnName("URL");
        //    nwGridCon.nwobject(SPR_SUP_VWATTACH - 1).ColumnName("View Attachment");
        //    nwGridCon.nwobject(SPR_SUP_REMARKSDOCRET - 1).ColumnName("Remarks for Document Return");
        //    nwGridCon.nwobject(SPR_SUP_RETURNTOCODE - 1).ColumnName("Return To Code");
        //    nwGridCon.nwobject(SPR_SUP_RETURNTODESC - 1).ColumnName("Return To Name");            
        //    #endregion

        //    #region Background Color     
        //    nwGridCon.nwobject(SPR_SUP_TRANNO - 1).BackgroundColor("Gainsboro");
        //    nwGridCon.nwobject(SPR_SUP_RETURN - 1).BackgroundColor("White");
        //    nwGridCon.nwobject(SPR_SUP_COMPLIED - 1).BackgroundColor("Gainsboro");
        //    nwGridCon.nwobject(SPR_SUP_REQUIRED - 1).BackgroundColor("Gainsboro");
        //    nwGridCon.nwobject(SPR_SUP_ROWNO - 1).BackgroundColor("Gainsboro");
        //    nwGridCon.nwobject(SPR_SUP_WORKINS - 1).BackgroundColor("Gainsboro");
        //    nwGridCon.nwobject(SPR_SUP_WORKINSCODE - 1).BackgroundColor("Gainsboro");
        //    nwGridCon.nwobject(SPR_SUP_WORKINSDESC - 1).BackgroundColor("Gainsboro");
        //    nwGridCon.nwobject(SPR_SUP_DOCNO - 1).BackgroundColor("Gainsboro");
        //    nwGridCon.nwobject(SPR_SUP_DOCDATE - 1).BackgroundColor("Gainsboro");
        //    nwGridCon.nwobject(SPR_SUP_EXPIRYDATE - 1).BackgroundColor("Gainsboro");
        //    nwGridCon.nwobject(SPR_SUP_URL - 1).BackgroundColor("Gainsboro");
        //    nwGridCon.nwobject(SPR_SUP_VWATTACH - 1).BackgroundColor("White");
        //    nwGridCon.nwobject(SPR_SUP_REMARKSDOCRET - 1).BackgroundColor("White");
        //    nwGridCon.nwobject(SPR_SUP_RETURNTOCODE - 1).BackgroundColor("Cyan");
        //    nwGridCon.nwobject(SPR_SUP_RETURNTODESC - 1).BackgroundColor("Gainsboro");
        //    #endregion

        //    #region Column Width         
        //    nwGridCon.nwobject(SPR_SUP_TRANNO - 1).Width(220);
        //    nwGridCon.nwobject(SPR_SUP_FILEPATH - 1).Width(0);
        //    nwGridCon.nwobject(SPR_SUP_RETURN - 1).Width(80);
        //    nwGridCon.nwobject(SPR_SUP_COMPLIED - 1).Width(80);
        //    nwGridCon.nwobject(SPR_SUP_REQUIRED - 1).Width(80);
        //    nwGridCon.nwobject(SPR_SUP_WORKINS - 1).Width(180);
        //    nwGridCon.nwobject(SPR_SUP_LINEID - 1).Width(0);
        //    nwGridCon.nwobject(SPR_SUP_TRANTYPE - 1).Width(0);
        //    nwGridCon.nwobject(SPR_SUP_ISALLOWRET - 1).Width(0);
        //    nwGridCon.nwobject(SPR_SUP_IGTCODE - 1).Width(0);
        //    nwGridCon.nwobject(SPR_SUP_LINEIDSETUP - 1).Width(0);
        //    nwGridCon.nwobject(SPR_SUP_RCROWNO - 1).Width(0);
        //    nwGridCon.nwobject(SPR_SUP_RCROW - 1).Width(0);
        //    nwGridCon.nwobject(SPR_SUP_VALUEDATE - 1).Width(0);
        //    #endregion

        //    #region Column Template                  
        //    nwGridCon.nwobject(SPR_SUP_RETURN - 1).Template("<input type='checkbox' class ='chkReturn cuz-010' {1}/>");
        //    nwGridCon.nwobject(SPR_SUP_COMPLIED - 1).Template("<input type='checkbox' class ='chkComplied cuz-010' {2} disabled/>");
        //    nwGridCon.nwobject(SPR_SUP_REQUIRED - 1).Template("<input type='checkbox' class ='chkRequired cuz-010' {3} disabled/>");
        //    nwGridCon.nwobject(SPR_SUP_VWATTACH - 1).Template("<div class='cuz-009'>...</div>");
        //    nwGridCon.nwobject(SPR_SUP_REMARKSDOCRET - 1).Template("<input type='text' class='txtRemarksDocRet' maxlength='255' value='{" + (SPR_SUP_REMARKSDOCRET - 1) + "}' disabled></input>");
        //    #endregion

        //    #region Class
        //    nwGridCon.nwobject(SPR_SUP_VWATTACH - 1).Class("btnSmall btnVwAttach");
        //    #endregion

        //    #region Required Field           
        //    #endregion

        //    if (isLoad)
        //    {                
        //        dt = dal.getSuppDocData(WebApp.nwobjectText("nwDocno"));
        //        nwGridCon.CreateExcelGrid(dt.Rows.Count + 1, colCnt);
        //        nwGridCon.dataSource(dt);
        //        nwGridCon.maxRow(dt.Rows.Count);
        //    }

        //    nwGridCon.GetSaveSort(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser); // this line will be default and suggested line code if there are many grid in one menu item  change -1 to -2 and so on...
        //    nwGridCon.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

        //    //## THEME FORMAT
        //    nwGridCon.HeaderBorderColor("#DEDEDE");
        //    nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
        //    nwGridCon.TableBorderColor("#BBB");
        //    nwGridCon.BodyBorderColor("#BBB");
        //    nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
        //    nwGridCon.HeaderTextColor("#131313");
        //    nwGridCon.HoverColor("#DEDEDE", "inherit");
        //    nwGridCon.SelectedRowHover("#DEDEDE");
        //    nwGridCon.SelectedRowHoverColor("inherit");

        //    js.makeHTML("#nwGridSuppCon", nwGridCon.createTable());            
        //    js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
        //    js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",4,0)");
        //    js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
        //    js.ADD("$('#" + gridID + "Con tr td').css('white-space', 'nowrap');");
        //    js.ADD("SuppDtlsProp(); HasGridData();");
        //}
        public void GenerateSuppGrid(bool isLoad)
        {
            DataTable dt = new DataTable();
            string gridID = "nwGridSupp";
            nwGrid nwGridCon = new nwGrid(gridID);
            nwGridCon.Type = nwGridType.SpreadCanvas;
            //string gridID = "nwGridSupp";
            //nwGrid nwGridCon = new nwGrid(gridID);
            //DataTable dt = new DataTable();

            int rowCnt = 1;
            int colCnt = SPR_SUP_VALUEDATE;

            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(5);
            nwGridCon.TableHeight(300);

            nwGridCon.buttonDelete = false;
            nwGridCon.buttonInsert = false;
            nwGridCon.buttonSaveColumn = false;
            nwGridCon.buttonResetColumn = false;
            nwGridCon.buttonCopyRow = false;

            #region Column Name           
            nwGridCon.nwobject(SPR_SUP_TRANNO - 1).ColumnName("Transaction No.");
            nwGridCon.nwobject(SPR_SUP_RETURN - 1).ColumnName("Return");
            nwGridCon.nwobject(SPR_SUP_COMPLIED - 1).ColumnName("Complied");
            nwGridCon.nwobject(SPR_SUP_REQUIRED - 1).ColumnName("Required");
            nwGridCon.nwobject(SPR_SUP_ROWNO - 1).ColumnName("Ref. Row No.");
            nwGridCon.nwobject(SPR_SUP_WORKINS - 1).ColumnName("Work Instructions");
            nwGridCon.nwobject(SPR_SUP_WORKINSCODE - 1).ColumnName("Document Code");
            nwGridCon.nwobject(SPR_SUP_WORKINSDESC - 1).ColumnName("Document Description");
            nwGridCon.nwobject(SPR_SUP_DOCNO - 1).ColumnName("Document No.");
            nwGridCon.nwobject(SPR_SUP_DOCDATE - 1).ColumnName("Document Date");
            nwGridCon.nwobject(SPR_SUP_EXPIRYDATE - 1).ColumnName("Expiry Date");
            nwGridCon.nwobject(SPR_SUP_URL - 1).ColumnName("URL");
            nwGridCon.nwobject(SPR_SUP_VWATTACH - 1).ColumnName("View Attachment");
            nwGridCon.nwobject(SPR_SUP_REMARKSDOCRET - 1).ColumnName("Remarks for Document Return");
            nwGridCon.nwobject(SPR_SUP_RETURNTOCODE - 1).ColumnName("Return To Code");
            nwGridCon.nwobject(SPR_SUP_RETURNTODESC - 1).ColumnName("Return To Name");
            #endregion

            #region Background Color     
            nwGridCon.nwobject(SPR_SUP_TRANNO - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_SUP_RETURN - 1).BackgroundColor("White");
            nwGridCon.nwobject(SPR_SUP_COMPLIED - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_SUP_REQUIRED - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_SUP_ROWNO - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_SUP_WORKINS - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_SUP_WORKINSCODE - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_SUP_WORKINSDESC - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_SUP_DOCNO - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_SUP_DOCDATE - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_SUP_EXPIRYDATE - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_SUP_URL - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_SUP_VWATTACH - 1).BackgroundColor("White");
            nwGridCon.nwobject(SPR_SUP_REMARKSDOCRET - 1).BackgroundColor("White");
            //nwGridCon.nwobject(SPR_SUP_RETURNTOCODE - 1).BackgroundColor("Cyan");
            nwGridCon.nwobject(SPR_SUP_RETURNTOCODE - 1).BackgroundColor("Gainsboro");
            nwGridCon.nwobject(SPR_SUP_RETURNTODESC - 1).BackgroundColor("Gainsboro");


            nwGridCon.nwobject(SPR_SUP_VWATTACH - 1).ColumnName("View Attachment");
            nwGridCon.nwobject(SPR_SUP_RETURN - 1).BackgroundColor("Gainsboro");

            nwGridCon.nwobject(SPR_SUP_VWATTACH - 1).BackgroundColor("#42f58a");


            #endregion

            #region Column Width         
            nwGridCon.nwobject(SPR_SUP_TRANNO - 1).Width(220);
            nwGridCon.nwobject(SPR_SUP_FILEPATH - 1).Width(0);
            //nwGridCon.nwobject(SPR_SUP_RETURN - 1).Width(80);
            nwGridCon.nwobject(SPR_SUP_RETURN - 1).Width(0);

            nwGridCon.nwobject(SPR_SUP_COMPLIED - 1).Width(80);
            nwGridCon.nwobject(SPR_SUP_REQUIRED - 1).Width(80);
            nwGridCon.nwobject(SPR_SUP_WORKINS - 1).Width(180);
            nwGridCon.nwobject(SPR_SUP_LINEID - 1).Width(0);
            nwGridCon.nwobject(SPR_SUP_TRANTYPE - 1).Width(0);
            nwGridCon.nwobject(SPR_SUP_ISALLOWRET - 1).Width(0);
            nwGridCon.nwobject(SPR_SUP_IGTCODE - 1).Width(0);
            nwGridCon.nwobject(SPR_SUP_LINEIDSETUP - 1).Width(0);
            nwGridCon.nwobject(SPR_SUP_RCROWNO - 1).Width(0);
            nwGridCon.nwobject(SPR_SUP_RCROW - 1).Width(0);
            nwGridCon.nwobject(SPR_SUP_VALUEDATE - 1).Width(0);
            nwGridCon.nwobject(SPR_SUP_REMARKSDOCRET - 1).Width(0);



            #endregion

            #region Column Template     
            nwGridCon.nwobject(SPR_SUP_RETURN - 1).CheckBox(false, "", true);
  
            nwGridCon.nwobject(SPR_SUP_COMPLIED - 1).ObjectType("checkbox");
            nwGridCon.nwobject(SPR_SUP_REQUIRED - 1).ObjectType("checkbox");
            nwGridCon.nwobject(SPR_SUP_VWATTACH - 1).TextDecoration("...");

            //nwGridCon.nwobject(SPR_SUP_RETURNTOCODE - 1).LookUp("lugReturnToSup", false, true);
            nwGridCon.nwobject(SPR_SUP_REMARKSDOCRET - 1).Input();
            nwGridCon.nwobject(SPR_SUP_REMARKSDOCRET - 1).Enabled(true);
            nwGridCon.nwobject(SPR_SUP_COMPLIED - 1).Enabled(false);
            nwGridCon.nwobject(SPR_SUP_REQUIRED - 1).Enabled(false);


            //nwGridCon.nwobject(SPR_SUP_RETURN - 1).Template("<input type='checkbox' class ='chkReturn cuz-010' {1}/>");
            //nwGridCon.nwobject(SPR_SUP_COMPLIED - 1).Template("<input type='checkbox' class ='chkComplied cuz-010' {2} disabled/>");
            //nwGridCon.nwobject(SPR_SUP_REQUIRED - 1).Template("<input type='checkbox' class ='chkRequired cuz-010' {3} disabled/>");
            //nwGridCon.nwobject(SPR_SUP_VWATTACH - 1).Template("<div class='cuz-009'>...</div>");
            nwGridCon.nwobject(SPR_SUP_REMARKSDOCRET - 1).Template("<input type='text' class='txtRemarksDocRet' maxlength='255' value='{" + (SPR_SUP_REMARKSDOCRET - 1) + "}' disabled></input>");
            #endregion

            #region Class
            nwGridCon.nwobject(SPR_SUP_VWATTACH - 1).Class("btnSmall btnVwAttach");
            #endregion

            #region Required Field           
            #endregion

            if (isLoad)
            {
                dt = dal.getSuppDocData(WebApp.nwobjectText("nwDocno"));
                nwGridCon.CreateExcelGrid(dt.Rows.Count + 1, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count);
            }
            nwGridCon.TableHeight(200);

            nwGridCon.varSpreadBook = "nwGridMainCon_Book2";
            nwGridCon.varSpreadSheet = "nwGridMainCon_Sheet2";
            js.ADD(nwGridCon.createTable());

            nwGridCon.SetTheme(nwGridTheme.Default);
            //nwGridCon.GetSaveSort(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser); // this line will be default and suggested line code if there are many grid in one menu item  change -1 to -2 and so on...
            //nwGridCon.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);

            ////## THEME FORMAT
            //nwGridCon.HeaderBorderColor("#DEDEDE");
            //nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            //nwGridCon.TableBorderColor("#BBB");
            //nwGridCon.BodyBorderColor("#BBB");
            //nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            //nwGridCon.HeaderTextColor("#131313");
            //nwGridCon.HoverColor("#DEDEDE", "inherit");
            //nwGridCon.SelectedRowHover("#DEDEDE");
            //nwGridCon.SelectedRowHoverColor("inherit");

            //js.makeHTML("#nwGridSuppCon", nwGridCon.createTable());
            //js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            //js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",4,0)");
            //js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            //js.ADD("$('#" + gridID + "Con tr td').css('white-space', 'nowrap');");
            //js.ADD("SuppDtlsProp(); HasGridData();");
        }

        public void PrintPreview(string menuitem, string printingID, string docno)
        {
            NoahWebLib.NoahWebFunction.nwFunction nwfunction = new NoahWebLib.NoahWebFunction.nwFunction();

            DataTable dtPreview = new DataTable();
            dtPreview.Columns.Add("klin");
            dtPreview.Columns.Add("dctype");
            dtPreview.Columns.Add("dcfolder");
            dtPreview.Columns.Add("dcfn");
            dtPreview.Columns.Add("dcownerpw");
            dtPreview.Columns.Add("dcuserpw");
            dtPreview.Columns.Add("RecUser");
            dtPreview.Columns.Add("Docno");
            dtPreview.Columns.Add("dcpagename");
            DataRow dr = dtPreview.NewRow();

            DataRow drPreview = dtPreview.NewRow();
            drPreview["klin"] = printingID;
            drPreview["dctype"] = 0;
            drPreview["dcfolder"] = "BSGENENT_PREVIEW";
            drPreview["dcfn"] = nwfunction.RandomString(30) + based.SecurityAccess.RecUser;
            drPreview["dcownerpw"] = "";
            drPreview["dcuserpw"] = "";
            drPreview["RecUser"] = based.SecurityAccess.RecUser;
            drPreview["Docno"] = docno;
            drPreview["dcpagename"] = menuitem;
            dtPreview.Rows.Add(drPreview);

            string url = dal.getDocuWriterLink();

            //devmode
            if (based.isInterface == false)
                url = @"http://localhost:2997/";

            string dtPreviewJson = JsonConvert.SerializeObject(dtPreview);
            js.ADD(string.Format("ShowDocWriterPreview('{0}',{1})", url, dtPreviewJson));
        }

    }
}