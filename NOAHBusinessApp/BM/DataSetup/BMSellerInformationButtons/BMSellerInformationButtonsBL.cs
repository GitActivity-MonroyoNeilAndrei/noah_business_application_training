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
    public class BMSellerInformationButtonsBL : nwAction
    {
        #region Variables needed
        //string _strFinal = ""; // container of string result
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
        private string ToolboxOrderData = ""; // toolbox Orderby

        DataTable emptyDT = new DataTable();

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

        //Mode of comission Release
        private const int SPR_ModeofCommissionReleaseCode = 1,
                            SPR_ModeofCommissionReleaseDesc = 2,
                            SPR_ModeofCommissionReleaseRowno = 3;

        public const string SPRName_ModeofCommissionReleaseCode = "Mode of Commission Release Code",
                             SPRName_ModeofCommissionReleaseDesc = "Mode of Commission Release Description",
                             SPRName_ModeofCommissionReleaseRowno = "RowNo";
        //Document Details
        private const int SPR_DDDocumentControlCode = 1,
                            SPR_DDDocumentControlDesc = 2,
                            SPR_DDDocumentTypeCode = 3,
                            SPR_DDDocumentTypeDesc = 4,
                            SPR_DDDocumentSourceCode = 5,
                            SPR_DDDocumentSourceDesc = 6,
                            SPR_DDDocumentNo = 7,
                            SPR_DDDocumentDate = 8,
                            SPR_DDExpiryDate = 9,
                            SPR_DDAttach = 10,
                            SPR_DDView = 11,
                            SPR_DDAttachment = 12,
                            SPR_DDAttachmentPath = 13,
                            SPR_DDRequired = 14,
                            SPR_DDRowno = 15;

        public const string SPRName_DDDocumentControlCode = "Document Control Code",
                            SPRName_DDDocumentControlDesc = "Document Control Description",
                            SPRName_DDDocumentTypeCode = "Document Type Code",
                            SPRName_DDDocumentTypeDesc = "Document Type Description",
                            SPRName_DDDocumentSourceCode = "Document Source Code",
                            SPRName_DDDocumentSourceDesc = "Document Source Description",
                            SPRName_DDDocumentNo = "Document No.",
                            SPRName_DDDocumentDate = "Document Date",
                            SPRName_DDExpiryDate = "Expiry Date",
                            SPRName_DDAttach = "Attach",
                            SPRName_DDView = "View",
                            SPRName_DDAttachment = "Attachment",
                            SPRName_DDAttachmentPath = "AttachmentPath",
                            SPRName_DDRequired = "Required",
                            SPRName_DDRowno = "RowNo";

        //Bank Account
        private const int SPR_BABankCode = 1,
                            SPR_BABankName = 2,
                            SPR_BABranch = 3,
                            SPR_BAAccountNo = 4,
                            SPR_BAAccountName = 5,
                            SPR_BAAccountTypeCode = 6,
                            SPR_BAAccountTypeDesc = 7,
                            SPR_BAParticulars = 8,
                            SPR_BARowno = 9,
                            SPR_BACombine = 10;

        public const string SPRName_BABankCode = "Bank Code",
                            SPRName_BABankName = "Bank Name",
                            SPRName_BABranch = "Branch",
                            SPRName_BAAccountNo = "Account No.",
                            SPRName_BAAccountName = "Account Name",
                            SPRName_BAAccountTypeCode = "Account Type Code",
                            SPRName_BAAccountTypeDesc = "Account Type",
                            SPRName_BAParticulars = "Particulars",
                            SPRName_BARowno = "RowNo";

        //Account Details As A Customer
        private const int SPR_ADProjectCode = 1,
                            SPR_ADProjectName = 2,
                            SPR_ADDeveloperCode = 3,
                            SPR_ADDeveloperName = 4,
                            SPR_ADAccountNo = 5,
                            SPR_ADReservationDate = 6,
                            SPR_ADRowno = 7;

        public const string SPRName_ADProjectCode = "Project Code",
                            SPRName_ADProjectName = "Project Name",
                            SPRName_ADDeveloperCode = "Developer Code",
                            SPRName_ADDeveloperName = "Developer Name",
                            SPRName_ADAccountNo = "Account No.",
                            SPRName_ADReservationDate = "Reservation Date",
                            SPRName_ADRowno = "RowNo";
        //Seminar/Trainings Details
        private const int SPR_SDSeminarTrainingCode = 1,
                            SPR_SDSeminarTrainingDesc = 2,
                            SPR_SDDays = 3,
                            SPR_SDDay = 4,
                            SPR_SDSeminarDate = 5,
                            SPR_SDRemarks = 6,
                            SPR_SDRowno = 7;

        public const string SPRName_SDSeminarTrainingCode = "Seminar/Training Code",
                            SPRName_SDSeminarTrainingDesc = "Seminar/Training",
                            SPRName_SDDays = "Days",
                            SPRName_SDDay = "Day",
                            SPRName_SDSeminarDate = "Seminar Date",
                            SPRName_SDRemarks = "Remarks",
                            SPRName_SDRowno = "RowNo";

        //Seller Role Level Details
        private const int SPR_SRSellerRoleCode = 1,
                            SPR_SRSellerRoleDesc = 2,
                            SPR_SRLevel = 3,
                            SPR_SRSellerCode = 4,
                            SPR_SRSellerName = 5,
                            SPR_SRRowno = 6;

        public const string SPRName_SRSellerRoleCode = "Seller Role Code",
                            SPRName_SRSellerRoleDesc = "Seller Role",
                            SPRName_SRLevel = "Level",
                            SPRName_SRSellerCode = "Seller Code",
                            SPRName_SRSellerName = "Seller Name",
                            SPRName_SRRowno = "RowNo";

        //View Update History
        private const int SPR_VUField = 1,
                            SPR_VUFrom = 2,
                            SPR_VUTo = 3,
                            SPR_VUUpdatedBy = 4,
                            SPR_VUDateUpdated = 5,
                            SPR_VURowno = 6;

        public const string SPRName_VUField = "Field",
                            SPRName_VUFrom = "From",
                            SPRName_VUTo = "To",
                            SPRName_VUUpdatedBy = "Updated By",
                            SPRName_VUDateUpdated = "Date Updated",
                            SPRName_VURowno = "RowNo";

        //View History Details
        private const int SPR_VWEffectiveDate = 1,
                            SPR_VWSellerRole = 2,
                            SPR_VWLevel = 3,
                            SPR_VWSellerCode = 4,
                            SPR_VWSellerName = 5,
                            SPR_VWUpdatedBy = 6,
                            SPR_VWDateUpdated = 7,
                            SPR_VWRowno = 8;

        public const string SPRName_VWEffectiveDate = "Effective Date",
                            SPRName_VWSellerRole = "Seller Role",
                            SPRName_VWLevel = "Level",
                            SPRName_VWSellerCode = "Seller Code",
                            SPRName_VWSellerName = "Seller Name",
                            SPRName_VWUpdatedBy = "Updated By",
                            SPRName_VWDateUpdated = "Date Updated",
                            SPRName_VWRowno = "RowNo";

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
            dal = new BMSellerInformationButtonsDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        string InfoOperationResult = String.Empty;

        BMSellerInformationButtonsDAL dal;
        //int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public BMSellerInformationButtonsBL()
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
            string strFinal = String.Empty; string strRet = String.Empty; string sqlOrig = sql;
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

            //string nwBSNo = WebApp.nwobjectText("txtnwBSNo");
            string nwTranType = WebApp.nwobjectText("nwTranType");
            string nwSellerCode = WebApp.nwobjectText("nwSellerCode");
            string txtID = WebApp.nwobjectText("txtID");

            string strFinal = "";
            string strSQL = "";
            string mouseDownFunc = "";
            string mouseOverFunc = "";
            //string strName = "";
            strConn = this.UserDefinedConnectionString;

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.inquireQuery(nwTranType, nwSellerCode);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(1);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugModeofCommissionReleaseCode":
                    strSQL = dal.getlugCode(strMethod, getCodeListMOCR(), nwTranType, "");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugDDDocumentControlCode":
                    strSQL = dal.getlugCode(strMethod, "", nwTranType, "");
                    nwObject.ColumnHide(5);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugDDDocumentSourceCode":
                    strSQL = dal.getlugCode(strMethod, "", nwTranType, "");
                    nwObject.ColumnHide(5);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugBankCode":
                    strSQL = dal.getlugCode(strMethod, "", nwTranType, "");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugAccountType":
                    strSQL = dal.getlugCode(strMethod, "", nwTranType, "");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugProjectCode":
                    strSQL = dal.getlugCode(strMethod, getCodeListADAC(), nwTranType, "");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSeminarTraining":
                    strSQL = dal.getlugCode(strMethod, "", nwTranType, "");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSellerRole":
                    strSQL = dal.getlugCode(strMethod, getCodeListSELD(), nwTranType, "");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSellerCode":
                    strSQL = dal.getlugCode(strMethod, "", nwTranType, WebApp.nwobjectText("SellerRoleCode"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSellerRoleTo":
                    strSQL = dal.getlugCode(strMethod, "", nwTranType, WebApp.nwobjectText("nwSellerCode"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

            }


            return strFinal;
        }

        ///// Standard RecordOperation 

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";
            string txtID = WebApp.nwobjectText("txtID");
            string nwTranType = WebApp.nwobjectText("nwTranType");
            string nwSellerCode = WebApp.nwobjectText("nwSellerCode");
            string nwtitle = WebApp.nwobjectText("nwtitle");
            //string 

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
                    GenerateGrid(false, nwTranType);
                    break;

                case eRecordOperation.Save:
                    DataTable dtHdr = LoadSchema(nwTranType);
                    DataTable dtLin = LoadSchemaLIN(nwTranType);

                    RecordOperationResult = ValidateData(ref dtLin, "Save", nwTranType);

                    if (string.IsNullOrEmpty(RecordOperationResult))
                    {
                        if (dtHdr.Rows.Count >= 1)
                        {
                            RecordOperationResult = dal.SaveData(dtHdr, dtLin, nwTranType, isNewRow);
                        }
                        else
                        {
                            RecordOperationResult = "No record to be saved.";
                            RecordOperationResult = RecordOperationResult.Insert(0, "Error(s) Found:\n");
                        }
                    }
                    else
                    {
                        RecordOperationResult = RecordOperationResult.Insert(0, "Error(s) Found:\n");
                    }
                    break;

                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(txtID, nwTranType);
                    break;

                case eRecordOperation.Process:

                    break;

                case eRecordOperation.Refresh:
                    RefreshData();
                    js.ADD("nwLoading_End('xRefreshBtn');");
                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    break;

                case eRecordOperation.Import:
                    tempstr = "import";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Export:

                    string LISTINGFILENAME = nwtitle;
                    if (nwtitle + " Listing" == "") LISTINGFILENAME = "Sheet 1";
                    else LISTINGFILENAME = nwtitle + " Listing";

                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, dal.LISTINGSTARTROW, dal.LISTINGQUERY(nwSellerCode, nwTranType),
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
                string windowTitle = "";

                if (RecordOperationResult.Contains("successfully"))
                {
                    RefreshData();
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);

                    if (WebApp.nwobjectText("nwTranType") == "MOCR")
                    {
                        windowTitle = WebApp.nwobjectText("nwtitle");
                    }

                    else if (WebApp.nwobjectText("nwTranType") == "DOCD")
                    {
                        windowTitle = WebApp.nwobjectText("nwtitle");
                    }

                    else if (WebApp.nwobjectText("nwTranType") == "BAAC")
                    {
                        windowTitle = WebApp.nwobjectText("nwtitle");
                    }

                    else if (WebApp.nwobjectText("nwTranType") == "ADAC")
                    {
                        windowTitle = WebApp.nwobjectText("nwtitle");
                    }

                    else if (WebApp.nwobjectText("nwTranType") == "SETD")
                    {
                        windowTitle = WebApp.nwobjectText("nwtitle");
                    }

                    else if (WebApp.nwobjectText("nwTranType") == "SELD")
                    {
                        windowTitle = WebApp.nwobjectText("nwtitle");
                    }

                    else if (WebApp.nwobjectText("nwTranType") == "UPSR")
                    {
                        windowTitle = WebApp.nwobjectText("nwtitle");
                    }

                    else if (WebApp.nwobjectText("nwTranType") == "VUPH")
                    {
                        windowTitle = WebApp.nwobjectText("nwtitle");
                    }


                    Prompt.Information(RecordOperationResult, windowTitle);
                }
                else
                {
                    if (RecordOperationResult.Contains("Error"))
                    {
                        if (WebApp.nwobjectText("nwTranType") == "MOCR")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        else if (WebApp.nwobjectText("nwTranType") == "DOCD")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        else if (WebApp.nwobjectText("nwTranType") == "BAAC")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        else if (WebApp.nwobjectText("nwTranType") == "ADAC")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        else if (WebApp.nwobjectText("nwTranType") == "SETD")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        else if (WebApp.nwobjectText("nwTranType") == "SELD")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        else if (WebApp.nwobjectText("nwTranType") == "UPSR")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        else if (WebApp.nwobjectText("nwTranType") == "VUPH")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        Prompt.Information(RecordOperationResult, windowTitle);

                    }

                    else
                    {
                        if (WebApp.nwobjectText("nwTranType") == "MOCR")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        else if (WebApp.nwobjectText("nwTranType") == "DOCD")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        else if (WebApp.nwobjectText("nwTranType") == "BAAC")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        else if (WebApp.nwobjectText("nwTranType") == "ADAC")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        else if (WebApp.nwobjectText("nwTranType") == "SETD")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        else if (WebApp.nwobjectText("nwTranType") == "SELD")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        else if (WebApp.nwobjectText("nwTranType") == "UPSR")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }

                        else if (WebApp.nwobjectText("nwTranType") == "VUPH")
                        {
                            windowTitle = WebApp.nwobjectText("nwtitle");
                        }
                        Prompt.Information(RecordOperationResult, windowTitle);
                    }


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
            //string strFinal = "", strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);

            string nwTranType = WebApp.nwobjectText("nwTranType");
            string nwSellerCode = WebApp.nwobjectText("nwSellerCode");

            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();
                    GenerateGrid(false, nwTranType);
                    js.ADD("Afterbinding();");
                    if (nwTranType == "SETD")
                    {
                        js.ADD("AfterAddtolist();");
                    }
                    else if (nwTranType == "DOCD")
                    {
                        nwToolBox.bindingNavigatorExportItem.Enable = true;
                    }
                    if (based.isInterface == false)
                    {
                        js.ADD("$('#nwGridCon').enable(false);");
                    }

                    break;
                case "actBindCollectionEmpty":
                    js.ADD("nwLoading_End('xSample')");
                    break;

                case "actValidate":

                    break;
                case "actAfterAddtolist":
                    js.ADD("AfterAddtolist();");
                    break;

                case "actDay":
                    int Days = WebApp.nwobjectInt("Days");
                    int Row = WebApp.nwobjectInt("Row");
                    int Rowno = WebApp.nwobjectInt("Rowno");
                    string txtID = WebApp.nwobjectText("txtID");

                    for (var x = 1; x <= Days; x++)
                    {
                        js.ADD("$('#nwGridData tbody tr:eq( " + Row + " ) select.nwSelect').append('<option value=" + x + ">  " + x + "  </option>');");
                    }
                    if (Parser.ParseString(Rowno) != "")
                    {
                        string getday = dal.getday(txtID, Rowno);

                        js.ADD("$('#nwGridData tbody tr:eq(" + Row + ") select.nwSelect').val(" + getday + "); ");
                    }

                    break;

                case "actViewHistoryDtls":
                    GenerateGrid(false, "VWHD");
                    break;
                case "actGenerateGrid":
                    GenerateGrid(true, nwTranType);

                    DataTable dt = dal.disableNewExist(nwTranType, nwSellerCode);
                    if (dt.Rows.Count != 0)
                    {
                        js.ADD("disableFieldsonLoad();");
                    }

                    //js.ADD("Afterbinding();");
                    //js.ADD("$('#nwGridCon').enable(false);");
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
            //string nwRecuser = WebApp.nwobjectText("nwRecuser");
            string nwSellerCode = WebApp.nwobjectText("nwSellerCode");
            //string nwBSNo = WebApp.nwobjectText("nwBSNo");
            string nwTranType = WebApp.nwobjectText("nwTranType");
            string nwSellerName = WebApp.nwobjectText("nwSellerName");
            switch (getMethod)
            {
                case "toolbox":
                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = dal.primaryKey;
                    standardBL.ToolBoxSortColumns = "1";
                    Prompt.Information(nwTranType, this.Text);
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(nwSellerCode, nwSellerName, nwTranType), this.UserDefinedConnectionString);
                    break;
                    // return strFinal;
            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#txtSellerCode", "val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerCode");
            SFObject.SetControlBinding("#txtSellerName", "val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerName");
            SFObject.SetControlBinding("#txtEffectiveDate", "val", "", "#noah-webui-Toolbox-BindingNavigator", "EffectiveDate");
            SFObject.SetControlBinding("#txtID", "val", "", "#noah-webui-Toolbox-BindingNavigator", "ID");
            SFObject.SetControlBinding("#txtSellerRoleFromCode", "val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerRoleFromCode");
            SFObject.SetControlBinding("#txtSellerRoleFromDesc", "val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerRoleFromDesc");
            SFObject.SetControlBinding("#idvallugSellerRoleTo", "val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerRoleToCode");
            SFObject.SetControlBinding("#descvallugSellerRoleTo", "val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerRoleToDesc");


            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");
        }

        private void BindCollection()
        {
            //string nwTranType = WebApp.nwobjectText("nwTranType");
            //GenerateGrid(false, nwTranType);
            //js.ADD("Afterbinding();");
            //if (nwTranType == "SETD")
            //{
            //    js.ADD("AfterAddtolist();");
            //}


            js.ADD("nwLoading_End('xSample');");
        }

        private string ValidateData(ref DataTable dt_lin, string Status, string nwTranType)
        {
            string errorResult = String.Empty;

            if ((nwTranType == "MOCR") || (nwTranType == "UPSR") || (nwTranType == "SELD"))
            {
                if (WebApp.nwobjectText("txtEffectiveDate").Length <= 0)
                {
                    errorResult += "Cannot " + Status + ". Effective Date is required. \n";

                }
            }

            if (nwTranType == "UPSR")
            {
                if (WebApp.nwobjectText("idvallugSellerRoleTo").Length <= 0)
                {
                    errorResult += "Cannot " + Status + ". Seller Role To is required. \n";

                }
            }

            if (nwTranType != "UPSR")
            {
                DataTable dtLinRec = new DataTable();
                DataTable dtLinRecRow = new DataTable();
                dtLinRec = WebApp.nwGridData(WebApp.nwobjectText("nwGridCon"));
                dtLinRecRow = LoadSchemaLIN(nwTranType);
                int dtLinRow = 0;
                int Rows = 0;
                string Duplicate = "";

                if (dtLinRecRow.Rows.Count <= 0)
                {
                    errorResult += "Cannot " + Status + ". Line Details is required.\n";
                }
                else
                {
                    for (int row = 1; row <= dtLinRecRow.Rows.Count; row++)
                    {
                        if (nwTranType == "DOCD")
                        {
                            string docCode = dtLinRec.Rows[row - 1][SPR_DDDocumentControlCode - 1].ToString();
                            string sourceCode = dtLinRec.Rows[row - 1][SPR_DDDocumentSourceCode - 1].ToString();
                            string id = WebApp.nwobjectText("nwSellerCode") + "|" + WebApp.nwobjectText("nwSellerName");
                            string count = dal.getUniqe(nwTranType, docCode, sourceCode, id);
                            Duplicate = docCode + sourceCode + "|";

                            if (dtLinRec.Rows[row - 1][SPR_DDDocumentSourceCode - 1].ToString() == String.Empty)
                            {
                                errorResult += "Cannot " + Status + ". Document Source Code is required at row " + row + " .\n";
                            }

                            //if(count != "0")
                            //{
                            //    errorResult += "Cannot " + Status + ". Duplicate records are not allowed at row " + row + " .\n";
                            //}

                            if (dtLinRec.Rows[row - 1][SPR_DDRequired - 1].ToString() == "1")
                            {
                                if (dtLinRec.Rows[row - 1][SPR_DDDocumentNo - 1].ToString() == String.Empty)
                                {
                                    errorResult += "Cannot " + Status + ". Document No. is required at row " + row + " .\n";
                                }
                                if (dtLinRec.Rows[row - 1][SPR_DDDocumentDate - 1].ToString() == String.Empty)
                                {
                                    errorResult += "Cannot " + Status + ". Document Date is required at row " + row + " .\n";
                                }
                                if (dtLinRec.Rows[row - 1][SPR_DDExpiryDate - 1].ToString() == String.Empty)
                                {
                                    errorResult += "Cannot " + Status + ". Expiry Date is required at row " + row + " .\n";
                                }
                            }
                        }

                        else if (nwTranType == "BAAC")
                        {
                            if (dtLinRec.Rows[row - 1][SPR_BABranch - 1].ToString() == String.Empty)
                            {
                                errorResult += "Cannot " + Status + ". Branch is required at row " + row + " .\n";
                            }
                            if (dtLinRec.Rows[row - 1][SPR_BAAccountNo - 1].ToString() == String.Empty)
                            {
                                errorResult += "Cannot " + Status + ". Account No. required at row " + row + " .\n";
                            }
                            if (dtLinRec.Rows[row - 1][SPR_BAAccountName - 1].ToString() == String.Empty)
                            {
                                errorResult += "Cannot " + Status + ". Account Name is required at row " + row + " .\n";
                            }
                        }
                        else if (nwTranType == "ADAC")
                        {
                            if (dtLinRec.Rows[row - 1][SPR_ADAccountNo - 1].ToString() == String.Empty)
                            {
                                errorResult += "Cannot " + Status + ". Account No. is required at row " + row + " .\n";
                            }
                            if (dtLinRec.Rows[row - 1][SPR_ADReservationDate - 1].ToString() == String.Empty)
                            {
                                errorResult += "Cannot " + Status + ". Reservation Date is required at row " + row + " .\n";
                            }
                        }
                        else if (nwTranType == "SETD")
                        {
                            if (dtLinRec.Rows[row - 1][SPR_SDSeminarDate - 1].ToString() == String.Empty)
                            {
                                errorResult += "Cannot " + Status + ". Seminar Date is required at row " + row + " .\n";
                            }

                            if (dtLinRec.Rows[row - 1][SPR_SDSeminarTrainingCode - 1].ToString() == String.Empty)
                            {
                                errorResult += "Cannot " + Status + ". Seminar/Training is required at row " + row + " .\n";
                            }

                            if (dtLinRecRow.Rows[row - 1][SPR_SDDays - 1].ToString() == String.Empty)
                            {
                                errorResult += "Cannot " + Status + ". Day is required at row " + row + " .\n";
                            }

                            //else
                            //{
                            //    // there are duplicates
                            //}

                        }
                        else if (nwTranType == "SELD")
                        {
                            if (dtLinRec.Rows[row - 1][SPR_SRSellerCode - 1].ToString() == String.Empty)
                            {
                                errorResult += "Cannot " + Status + ". Seller Code is required at row " + row + " .\n";
                            }
                        }
                    }
                    if (nwTranType == "DOCD")
                    {
                        //string[] split = Duplicate.Split(new Char[] { '|' }, StringSplitOptions.RemoveEmptyEntries);

                        //DataView view = new DataView(dtLinRecRow);
                        //DataTable distinctValues = view.ToTable(true, "DocumentControlCode", "DocumentSourceCode");
                        //if (distinctValues.Rows.Count != dtLinRec.Rows.Count)
                        //{
                        //    errorResult += "Cannot " + Status + ". Duplicate records are not allowed. \n";
                        //}

                        var duplicates = dtLinRecRow.AsEnumerable().GroupBy(i => new
                        {
                            docCode = i.Field<string>("DocumentControlCode"),
                            srcCode = i.Field<string>("DocumentSourceCode")
                        }).Where(g => g.Count() > 1).Select(g => new { g.Key.docCode, g.Key.srcCode }).ToList();

                        if (duplicates.Count != 0)
                        {
                            errorResult += "Cannot " + Status + ". Duplicate records are not allowed. \n";
                        }


                    }

                    if (nwTranType == "SETD")
                    {
                        DataTable distinct = dtLinRecRow.DefaultView.ToTable(true, "SeminarTraining", "Day", "SeminarDate");
                        if (distinct.Rows.Count != dtLinRecRow.Rows.Count)
                        {
                            errorResult += "Cannot " + Status + ". Duplicate records are not allowed on line details. \n";
                        }
                    }



                }
            }
            return errorResult;
        }

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
            var serverdate = SFObjects.GetServerDateTime(this.UserDefinedConnectionString);
            js.makeValueText("#txtCurrentDate", serverdate.ToString("MM/dd/yyyy"));
            js.makeValueText("#txtserverlink", dal.serverLink());
            js.makeValueText("#txtserverpath", dal.serverpath());
            js.ADD("RefreshData();");
            //RefreshData();
            string nwTranType = WebApp.nwobjectText("nwTranType");
            GenerateGrid(true, nwTranType);

            if (nwTranType == "DOCD")
            {
                nwToolBox.bindingNavigatorExportItem.Enable = true;
                js.ADD("$('#noah-webui-Toolbox').bindingExport().enable(true);");
            }

            if (based.isInterface == false)
            {
                js.ADD("$('.nwRequiredField').text('');");
                js.ADD("$('#noah-webui-Toolbox').bindingRefresh().click();");
            }

        }

        private void RefreshData()
        {
            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: incorrect        
            //js.ADD("RefreshData();");
            //BindCollection();

        }


        public void GenerateGrid(bool isInitialize, string nwTranType)
        {

            //js.makeValueText(nwTranType,"getParameterByName('nwTranType');");
            if (nwTranType == "MOCR")
                CreateGridBMSellerInformationButtons(isInitialize);
            else if (nwTranType == "DOCD")
                CreateGridBMDocumentDetails(isInitialize);
            else if (nwTranType == "BAAC")
                CreateGridBMBankAccount(isInitialize);
            else if (nwTranType == "ADAC")
                CreateGridAccountDetailsAsACustomer(isInitialize);
            else if (nwTranType == "SETD")
                CreateGridSeminarTrainingsDetails(isInitialize);
            else if (nwTranType == "SELD")
                CreateGridSellerRoleLevelDetails(isInitialize);
            else if (nwTranType == "VUPH")
                CreateGridViewUpdateHistory(isInitialize);
            else if (nwTranType == "VWHD")
                CreateGridViewHistoryDetails(isInitialize);



        }


        public void CreateGridBMSellerInformationButtons(bool isInitialize)
        {

            string gridID = "nwGrid";
            nwGrid nwGrid = new nwGrid(gridID);
            DataTable dtDataSource = new DataTable();
            string txtID = WebApp.nwobjectText("txtID");
            string nwTranType = WebApp.nwobjectText("nwTranType");

            dtDataSource = dal.getLineDetails(txtID, nwTranType);

            int rowCnt = 0;
            int OrigRowCnt = 0;
            try
            {
                rowCnt = dtDataSource.Rows.Count;
                OrigRowCnt = dtDataSource.Rows.Count;
            }
            catch (Exception ex)
            {
                //ex.ToString();
                //rowCnt = dtDataSource.Rows.Count;
            }

            int colCnt = SPR_ModeofCommissionReleaseRowno;
            nwGrid.CreateExcelGrid(rowCnt, colCnt);
            nwGrid.minRow(10);
            nwGrid.TableHeight(300);
            if (based.isInterface == true)
                nwGrid.buttonDelete = true;

            #region Column Title

            nwGrid.nwobject(SPR_ModeofCommissionReleaseCode - 1).ColumnName(SPRName_ModeofCommissionReleaseCode);
            nwGrid.nwobject(SPR_ModeofCommissionReleaseDesc - 1).ColumnName(SPRName_ModeofCommissionReleaseDesc);
            nwGrid.nwobject(SPR_ModeofCommissionReleaseRowno - 1).ColumnName(SPRName_ModeofCommissionReleaseRowno);


            #endregion

            #region Column Width

            nwGrid.nwobject(SPR_ModeofCommissionReleaseCode - 1).Width(100);
            nwGrid.nwobject(SPR_ModeofCommissionReleaseDesc - 1).Width(150);
            nwGrid.nwobject(SPR_ModeofCommissionReleaseRowno - 1).Width(0);

            #endregion

            #region Column Color
            nwGrid.nwobject(SPR_ModeofCommissionReleaseCode - 1).BackgroundColor("cyan");
            nwGrid.nwobject(SPR_ModeofCommissionReleaseDesc - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Templates

            //nwGrid.nwobject(SPR_ModeofCommissionReleaseDesc - 1).InputCurrency("", 5, 8);

            //nwGrid.nwobject(GRD_DEBIT - 1).TextAlign("right");
            //nwGrid.nwobject(GRD_CREDIT - 1).TextAlign("right");

            #endregion

            #region Column Button
            #endregion

            if (!isInitialize && OrigRowCnt > 0)
                nwGrid.dataSource(dtDataSource);
            else
                nwGrid.CreateExcelGrid(rowCnt, colCnt);

            //## THEME FORMAT
            nwGrid.HeaderBorderColor("#DEDEDE");
            nwGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwGrid.TableBorderColor("#BBB");
            nwGrid.BodyBorderColor("#BBB");
            nwGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGrid.HeaderTextColor("#131313");
            nwGrid.HoverColor("#DEDEDE", "inherit");
            nwGrid.SelectedRowHover("#DEDEDE");
            nwGrid.SelectedRowHoverColor("inherit");

            js.makeHTML("#nwGridCon", nwGrid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("$('.nwGrid div.nwGridData').css('background-color', 'white');");


        }

        public void CreateGridBMDocumentDetails(bool isInitialize)
        {

            string gridID = "nwGrid";
            nwGrid nwGrid = new nwGrid(gridID);
            DataTable dtDataSource = new DataTable();
            string txtID = WebApp.nwobjectText("txtID");
            string nwTranType = WebApp.nwobjectText("nwTranType");

            dtDataSource = dal.getLineDetails(txtID, nwTranType);

            int rowCnt = 0;
            int OrigRowCnt = 0;
            try
            {
                rowCnt = dtDataSource.Rows.Count;
                OrigRowCnt = dtDataSource.Rows.Count;
            }
            catch (Exception ex)
            {
                //ex.ToString();
                //rowCnt = dtDataSource.Rows.Count;
            }

            int colCnt = SPR_DDRowno;
            nwGrid.CreateExcelGrid(rowCnt, colCnt);
            nwGrid.minRow(10);
            nwGrid.TableHeight(300);
            if (based.isInterface == true)
                nwGrid.buttonDelete = true;

            #region Column Title

            nwGrid.nwobject(SPR_DDDocumentControlCode - 1).ColumnName(SPRName_DDDocumentControlCode);
            nwGrid.nwobject(SPR_DDDocumentControlDesc - 1).ColumnName(SPRName_DDDocumentControlDesc);
            nwGrid.nwobject(SPR_DDDocumentTypeCode - 1).ColumnName(SPRName_DDDocumentTypeCode);
            nwGrid.nwobject(SPR_DDDocumentTypeDesc - 1).ColumnName(SPRName_DDDocumentTypeDesc);
            nwGrid.nwobject(SPR_DDDocumentSourceCode - 1).ColumnName(SPRName_DDDocumentSourceCode);
            nwGrid.nwobject(SPR_DDDocumentSourceDesc - 1).ColumnName(SPRName_DDDocumentSourceDesc);
            nwGrid.nwobject(SPR_DDDocumentNo - 1).ColumnName(SPRName_DDDocumentNo);
            nwGrid.nwobject(SPR_DDDocumentDate - 1).ColumnName(SPRName_DDDocumentDate);
            nwGrid.nwobject(SPR_DDExpiryDate - 1).ColumnName(SPRName_DDExpiryDate);
            nwGrid.nwobject(SPR_DDAttach - 1).ColumnName(SPRName_DDAttach);
            nwGrid.nwobject(SPR_DDView - 1).ColumnName(SPRName_DDView);
            nwGrid.nwobject(SPR_DDAttachment - 1).ColumnName(SPRName_DDAttachment);
            nwGrid.nwobject(SPR_DDAttachmentPath - 1).ColumnName(SPRName_DDAttachmentPath);
            nwGrid.nwobject(SPR_DDRequired - 1).ColumnName(SPRName_DDRequired);
            nwGrid.nwobject(SPR_DDRowno - 1).ColumnName(SPRName_DDRowno);

            #endregion

            #region Column Width

            nwGrid.nwobject(SPR_DDDocumentControlCode - 1).Width(150);
            nwGrid.nwobject(SPR_DDDocumentControlDesc - 1).Width(80);
            nwGrid.nwobject(SPR_DDDocumentTypeCode - 1).Width(80);
            nwGrid.nwobject(SPR_DDDocumentTypeDesc - 1).Width(80);
            nwGrid.nwobject(SPR_DDDocumentSourceCode - 1).Width(100);
            nwGrid.nwobject(SPR_DDDocumentSourceDesc - 1).Width(80);
            nwGrid.nwobject(SPR_DDDocumentNo - 1).Width(65);
            nwGrid.nwobject(SPR_DDDocumentDate - 1).Width(65);
            nwGrid.nwobject(SPR_DDExpiryDate - 1).Width(65);
            nwGrid.nwobject(SPR_DDAttach - 1).Width(65);
            nwGrid.nwobject(SPR_DDView - 1).Width(65);
            nwGrid.nwobject(SPR_DDAttachment - 1).Width(0);
            nwGrid.nwobject(SPR_DDAttachmentPath - 1).Width(0);
            nwGrid.nwobject(SPR_DDRequired - 1).Width(0);
            nwGrid.nwobject(SPR_DDRowno - 1).Width(0);
            #endregion

            #region Column Color
            nwGrid.nwobject(SPR_DDDocumentControlCode - 1).BackgroundColor("cyan");
            nwGrid.nwobject(SPR_DDDocumentControlDesc - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_DDDocumentTypeCode - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_DDDocumentTypeDesc - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_DDDocumentSourceCode - 1).BackgroundColor("cyan");
            nwGrid.nwobject(SPR_DDDocumentSourceDesc - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_DDDocumentNo - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_DDDocumentDate - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_DDExpiryDate - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_DDAttach - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_DDView - 1).BackgroundColor("cyan");
            nwGrid.nwobject(SPR_DDAttachment - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_DDAttachmentPath - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_DDRequired - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_DDRowno - 1).BackgroundColor("white");
            #endregion

            #region Column Templates

            //nwGrid.nwobject(GRD_DEBIT - 1).TextAlign("right");
            //nwGrid.nwobject(GRD_CREDIT - 1).TextAlign("right");
            if (based.isInterface == true)
            {
                nwGrid.nwobject(SPR_DDDocumentControlCode - 1).HeaderFieldRequired(true);
                nwGrid.nwobject(SPR_DDDocumentSourceCode - 1).HeaderFieldRequired(true);
            }
            //nwGrid.nwobject(SPR_DDDocumentNo - 1).Input(true);
            nwGrid.nwobject(SPR_DDDocumentNo - 1).Template("<input id = 'DocumentNo' type = 'text' maxlength='30' value ='{" + (SPR_DDDocumentNo - 1) + "}'/>");
            nwGrid.nwobject(SPR_DDDocumentDate - 1).InputDate("MM/dd/yyyy");
            nwGrid.nwobject(SPR_DDExpiryDate - 1).InputDate("MM/dd/yyyy");

            nwGrid.nwobject(SPR_DDAttach - 1).Template("<div class='nwBtnAttach' style='text-align:center;'>...</div>");
            nwGrid.nwobject(SPR_DDAttach - 1).Class("nwGButton");
            nwGrid.nwobject(SPR_DDView - 1).Template("<div class='nwBtnDownload' style='text-align:center;background:none;border:0;'>...</div>"); //<a style='color: black !important;' {" + (SPR_DDView - 1) + "}>View</a>
            nwGrid.nwobject(SPR_DDView - 1).Class("nwGButton");

            #endregion

            #region Column Button
            #endregion

            if (!isInitialize && OrigRowCnt > 0)
                nwGrid.dataSource(dtDataSource);
            else
                nwGrid.CreateExcelGrid(rowCnt, colCnt);

            //## THEME FORMAT
            nwGrid.HeaderBorderColor("#DEDEDE");
            nwGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwGrid.TableBorderColor("#BBB");
            nwGrid.BodyBorderColor("#BBB");
            nwGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGrid.HeaderTextColor("#131313");
            nwGrid.HoverColor("#DEDEDE", "inherit");
            nwGrid.SelectedRowHover("#DEDEDE");
            nwGrid.SelectedRowHoverColor("inherit");

            js.makeHTML("#nwGridCon", nwGrid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("$('.nwGrid div.nwGridData').css('background-color', 'white');");
        }

        public void CreateGridBMBankAccount(bool isInitialize)
        {

            string gridID = "nwGrid";
            nwGrid nwGrid = new nwGrid(gridID);
            DataTable dtDataSource = new DataTable();
            string txtID = WebApp.nwobjectText("txtID");
            string nwTranType = WebApp.nwobjectText("nwTranType");

            dtDataSource = dal.getLineDetails(txtID, nwTranType);

            int rowCnt = 0;
            int OrigRowCnt = 0;
            try
            {
                rowCnt = dtDataSource.Rows.Count;
                OrigRowCnt = dtDataSource.Rows.Count;
            }
            catch (Exception ex)
            {
                //ex.ToString();
                //rowCnt = dtDataSource.Rows.Count;
            }

            int colCnt = SPR_BACombine;
            nwGrid.CreateExcelGrid(rowCnt, colCnt);
            nwGrid.minRow(10);
            nwGrid.TableHeight(300);
            if (based.isInterface == true)
                nwGrid.buttonDelete = true;

            #region Column Title

            nwGrid.nwobject(SPR_BABankCode - 1).ColumnName(SPRName_BABankCode);
            nwGrid.nwobject(SPR_BABankName - 1).ColumnName(SPRName_BABankName);
            nwGrid.nwobject(SPR_BABranch - 1).ColumnName(SPRName_BABranch);
            nwGrid.nwobject(SPR_BAAccountNo - 1).ColumnName(SPRName_BAAccountNo);
            nwGrid.nwobject(SPR_BAAccountName - 1).ColumnName(SPRName_BAAccountName);
            nwGrid.nwobject(SPR_BAAccountTypeCode - 1).ColumnName(SPRName_BAAccountTypeCode);
            nwGrid.nwobject(SPR_BAAccountTypeDesc - 1).ColumnName(SPRName_BAAccountTypeDesc);
            nwGrid.nwobject(SPR_BAParticulars - 1).ColumnName(SPRName_BAParticulars);
            nwGrid.nwobject(SPR_BARowno - 1).ColumnName(SPRName_BARowno);
            nwGrid.nwobject(SPR_BACombine - 1).ColumnName("Combine");

            #endregion

            #region Column Width

            nwGrid.nwobject(SPR_BABankCode - 1).Width(150);
            nwGrid.nwobject(SPR_BABankName - 1).Width(100);
            nwGrid.nwobject(SPR_BABranch - 1).Width(100);
            nwGrid.nwobject(SPR_BAAccountNo - 1).Width(100);
            nwGrid.nwobject(SPR_BAAccountName - 1).Width(120);
            nwGrid.nwobject(SPR_BAAccountTypeCode - 1).Width(0);
            nwGrid.nwobject(SPR_BAAccountTypeDesc - 1).Width(100);
            nwGrid.nwobject(SPR_BAParticulars - 1).Width(130);
            nwGrid.nwobject(SPR_BARowno - 1).Width(0);
            nwGrid.nwobject(SPR_BACombine - 1).Width(0);


            #endregion

            #region Column Color

            nwGrid.nwobject(SPR_BABankCode - 1).BackgroundColor("cyan");
            nwGrid.nwobject(SPR_BABankName - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_BABranch - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_BAAccountNo - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_BAAccountName - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_BAAccountTypeCode - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_BAAccountTypeDesc - 1).BackgroundColor("cyan");
            nwGrid.nwobject(SPR_BAParticulars - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_BARowno - 1).BackgroundColor("white");

            #endregion

            #region Column Templates
            if (based.isInterface == true)
            {
                nwGrid.nwobject(SPR_BABankCode - 1).HeaderFieldRequired(true);
                nwGrid.nwobject(SPR_BABranch - 1).HeaderFieldRequired(true);
                nwGrid.nwobject(SPR_BAAccountNo - 1).HeaderFieldRequired(true);
                nwGrid.nwobject(SPR_BAAccountName - 1).HeaderFieldRequired(true);
            }

            nwGrid.nwobject(SPR_BABranch - 1).Template("<input id = 'Branch' type = 'text' maxlength='120' value ='{" + (SPR_BABranch - 1) + "}'/>");
            nwGrid.nwobject(SPR_BAAccountNo - 1).Template("<input id = 'AccountNo' type = 'text' maxlength='30' value ='{" + (SPR_BAAccountNo - 1) + "}'/>");
            nwGrid.nwobject(SPR_BAAccountName - 1).Template("<input id = 'AccountName' type = 'text' maxlength='120' value ='{" + (SPR_BAAccountName - 1) + "}'/>");
            nwGrid.nwobject(SPR_BAParticulars - 1).Template("<input id = 'Particulars' type = 'text' maxlength='255' value ='{" + (SPR_BAParticulars - 1) + "}'/>");

            #endregion

            #region Column Button
            #endregion

            if (!isInitialize && OrigRowCnt > 0)
                nwGrid.dataSource(dtDataSource);
            else
                nwGrid.CreateExcelGrid(rowCnt, colCnt);

            //## THEME FORMAT
            nwGrid.HeaderBorderColor("#DEDEDE");
            nwGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwGrid.TableBorderColor("#BBB");
            nwGrid.BodyBorderColor("#BBB");
            nwGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGrid.HeaderTextColor("#131313");
            nwGrid.HoverColor("#DEDEDE", "inherit");
            nwGrid.SelectedRowHover("#DEDEDE");
            nwGrid.SelectedRowHoverColor("inherit");

            js.makeHTML("#nwGridCon", nwGrid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("$('.nwGrid div.nwGridData').css('background-color', 'white');");
        }

        public void CreateGridAccountDetailsAsACustomer(bool isInitialize)
        {

            string gridID = "nwGrid";
            nwGrid nwGrid = new nwGrid(gridID);
            DataTable dtDataSource = new DataTable();
            string txtID = WebApp.nwobjectText("txtID");
            string nwTranType = WebApp.nwobjectText("nwTranType");

            dtDataSource = dal.getLineDetails(txtID, nwTranType);

            int rowCnt = 0;
            int OrigRowCnt = 0;
            try
            {
                rowCnt = dtDataSource.Rows.Count;
                OrigRowCnt = dtDataSource.Rows.Count;
            }
            catch (Exception ex)
            {
                //ex.ToString();
                //rowCnt = dtDataSource.Rows.Count;
            }

            int colCnt = SPR_ADRowno;
            nwGrid.CreateExcelGrid(rowCnt, colCnt);
            nwGrid.minRow(10);
            nwGrid.TableHeight(300);
            if (based.isInterface == true)
                nwGrid.buttonDelete = true;
            #region Column Title

            nwGrid.nwobject(SPR_ADProjectCode - 1).ColumnName(SPRName_ADProjectCode);
            nwGrid.nwobject(SPR_ADProjectName - 1).ColumnName(SPRName_ADProjectName);
            nwGrid.nwobject(SPR_ADDeveloperCode - 1).ColumnName(SPRName_ADDeveloperCode);
            nwGrid.nwobject(SPR_ADDeveloperName - 1).ColumnName(SPRName_ADDeveloperName);
            nwGrid.nwobject(SPR_ADAccountNo - 1).ColumnName(SPRName_ADAccountNo);
            nwGrid.nwobject(SPR_ADReservationDate - 1).ColumnName(SPRName_ADReservationDate);
            nwGrid.nwobject(SPR_ADRowno - 1).ColumnName(SPRName_ADRowno);

            #endregion

            #region Column Width

            nwGrid.nwobject(SPR_ADProjectCode - 1).Width(150);
            nwGrid.nwobject(SPR_ADProjectName - 1).Width(100);
            nwGrid.nwobject(SPR_ADDeveloperCode - 1).Width(100);
            nwGrid.nwobject(SPR_ADDeveloperName - 1).Width(100);
            nwGrid.nwobject(SPR_ADAccountNo - 1).Width(120);
            nwGrid.nwobject(SPR_ADReservationDate - 1).Width(100);
            nwGrid.nwobject(SPR_ADRowno - 1).Width(0);
            #endregion

            #region Column Color
            nwGrid.nwobject(SPR_ADProjectCode - 1).BackgroundColor("cyan");
            nwGrid.nwobject(SPR_ADProjectName - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_ADDeveloperCode - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_ADDeveloperName - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_ADAccountNo - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_ADReservationDate - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_ADRowno - 1).BackgroundColor("white");

            #endregion

            #region Column Templates
            if (based.isInterface == true)
            {
                nwGrid.nwobject(SPR_ADProjectCode - 1).HeaderFieldRequired(true);
                nwGrid.nwobject(SPR_ADAccountNo - 1).HeaderFieldRequired(true);
                nwGrid.nwobject(SPR_ADReservationDate - 1).HeaderFieldRequired(true);
            }

            nwGrid.nwobject(SPR_ADAccountNo - 1).Template("<input id = 'AccountNo' type = 'text' maxlength='30' value ='{" + (SPR_ADAccountNo - 1) + "}'/>");
            nwGrid.nwobject(SPR_ADReservationDate - 1).InputDate("MM/dd/yyyy");
            #endregion

            #region Column Button
            #endregion

            if (!isInitialize && OrigRowCnt > 0)
                nwGrid.dataSource(dtDataSource);
            else
                nwGrid.CreateExcelGrid(rowCnt, colCnt);

            //## THEME FORMAT
            nwGrid.HeaderBorderColor("#DEDEDE");
            nwGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwGrid.TableBorderColor("#BBB");
            nwGrid.BodyBorderColor("#BBB");
            nwGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGrid.HeaderTextColor("#131313");
            nwGrid.HoverColor("#DEDEDE", "inherit");
            nwGrid.SelectedRowHover("#DEDEDE");
            nwGrid.SelectedRowHoverColor("inherit");

            js.makeHTML("#nwGridCon", nwGrid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("$('.nwGrid div.nwGridData').css('background-color', 'white');");
        }

        public void CreateGridSeminarTrainingsDetails(bool isInitialize)
        {

            string gridID = "nwGrid";
            nwGrid nwGrid = new nwGrid(gridID);
            DataTable dtDataSource = new DataTable();
            string txtID = WebApp.nwobjectText("txtID");
            string nwTranType = WebApp.nwobjectText("nwTranType");

            dtDataSource = dal.getLineDetails(txtID, nwTranType);

            int rowCnt = 0;
            int OrigRowCnt = 0;
            try
            {
                rowCnt = dtDataSource.Rows.Count;
                OrigRowCnt = dtDataSource.Rows.Count;
            }
            catch (Exception ex)
            {
                //ex.ToString();
                //rowCnt = dtDataSource.Rows.Count;
            }

            int colCnt = SPR_SDRowno;
            nwGrid.CreateExcelGrid(rowCnt, colCnt);
            nwGrid.minRow(10);
            nwGrid.TableHeight(300);
            if (based.isInterface == true)
                nwGrid.buttonDelete = true;
            #region Column Title

            nwGrid.nwobject(SPR_SDSeminarTrainingCode - 1).ColumnName(SPRName_SDSeminarTrainingCode);
            nwGrid.nwobject(SPR_SDSeminarTrainingDesc - 1).ColumnName(SPRName_SDSeminarTrainingDesc);
            nwGrid.nwobject(SPR_SDDays - 1).ColumnName(SPRName_SDDays);
            nwGrid.nwobject(SPR_SDDay - 1).ColumnName(SPRName_SDDay);
            nwGrid.nwobject(SPR_SDSeminarDate - 1).ColumnName(SPRName_SDSeminarDate);
            nwGrid.nwobject(SPR_SDRemarks - 1).ColumnName(SPRName_SDRemarks);
            nwGrid.nwobject(SPR_SDRowno - 1).ColumnName(SPRName_SDRowno);

            #endregion

            #region Column Width

            nwGrid.nwobject(SPR_SDSeminarTrainingCode - 1).Width(0);
            nwGrid.nwobject(SPR_SDSeminarTrainingDesc - 1).Width(150);
            nwGrid.nwobject(SPR_SDDays - 1).Width(0);
            nwGrid.nwobject(SPR_SDDay - 1).Width(80);
            nwGrid.nwobject(SPR_SDSeminarDate - 1).Width(100);
            nwGrid.nwobject(SPR_SDRemarks - 1).Width(200);
            nwGrid.nwobject(SPR_SDRowno - 1).Width(0);

            #endregion

            #region Column Color

            nwGrid.nwobject(SPR_SDSeminarTrainingCode - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_SDSeminarTrainingDesc - 1).BackgroundColor("cyan");
            nwGrid.nwobject(SPR_SDDays - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_SDDay - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_SDSeminarDate - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_SDRemarks - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_SDRowno - 1).BackgroundColor("white");
            #endregion

            #region Column Templates
            if (based.isInterface == true)
            {
                nwGrid.nwobject(SPR_SDSeminarTrainingDesc - 1).HeaderFieldRequired(true);
                nwGrid.nwobject(SPR_SDDay - 1).HeaderFieldRequired(true);
                nwGrid.nwobject(SPR_SDSeminarDate - 1).HeaderFieldRequired(true);
            }
            nwGrid.nwobject(SPR_SDDay - 1).Template("<select nwvalue='' class='nwSelect'></select>");  //id = 'Day'

            nwGrid.nwobject(SPR_SDSeminarDate - 1).InputDate("MM/dd/yyyy");
            nwGrid.nwobject(SPR_SDRemarks - 1).Template("<input id = 'Remarks' type = 'text' maxlength='500' value ='{" + (SPR_SDRemarks - 1) + "}'/>");

            #endregion

            #region Column Button
            #endregion

            if (!isInitialize && OrigRowCnt > 0)
                nwGrid.dataSource(dtDataSource);
            else
                nwGrid.CreateExcelGrid(rowCnt, colCnt);

            //## THEME FORMAT
            nwGrid.HeaderBorderColor("#DEDEDE");
            nwGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwGrid.TableBorderColor("#BBB");
            nwGrid.BodyBorderColor("#BBB");
            nwGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGrid.HeaderTextColor("#131313");
            nwGrid.HoverColor("#DEDEDE", "inherit");
            nwGrid.SelectedRowHover("#DEDEDE");
            nwGrid.SelectedRowHoverColor("inherit");

            js.makeHTML("#nwGridCon", nwGrid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("$('.nwGrid div.nwGridData').css('background-color', 'white');");

        }

        public void CreateGridSellerRoleLevelDetails(bool isInitialize)
        {

            string gridID = "nwGrid";
            nwGrid nwGrid = new nwGrid(gridID);
            DataTable dtDataSource = new DataTable();
            DataTable dtDataLoad = new DataTable();
            string txtID = WebApp.nwobjectText("txtID");
            string nwTranType = WebApp.nwobjectText("nwTranType");
            string nwSellerCode = WebApp.nwobjectText("nwSellerCode");

            dtDataSource = dal.getLineDetails(txtID, nwTranType);
            dtDataLoad = dal.getLineLoadedSELD(nwSellerCode);

            int rowCnt = 0;
            int OrigRowCnt = 0;
            try
            {
                if (!isInitialize)
                {
                    rowCnt = dtDataSource.Rows.Count;
                    OrigRowCnt = dtDataSource.Rows.Count;
                }
                else
                {
                    rowCnt = dtDataLoad.Rows.Count;
                    OrigRowCnt = dtDataLoad.Rows.Count;
                }

            }
            catch (Exception ex)
            {
                //ex.ToString();
                //rowCnt = dtDataSource.Rows.Count;
            }

            int colCnt = SPR_SRRowno;
            nwGrid.CreateExcelGrid(rowCnt, colCnt);
            nwGrid.minRow(10);
            nwGrid.TableHeight(300);
            if (based.isInterface == true)
                nwGrid.buttonDelete = true;

            #region Column Title

            nwGrid.nwobject(SPR_SRSellerRoleCode - 1).ColumnName(SPRName_SRSellerRoleCode);
            nwGrid.nwobject(SPR_SRSellerRoleDesc - 1).ColumnName(SPRName_SRSellerRoleDesc);
            nwGrid.nwobject(SPR_SRLevel - 1).ColumnName(SPRName_SRLevel);
            nwGrid.nwobject(SPR_SRSellerCode - 1).ColumnName(SPRName_SRSellerCode);
            nwGrid.nwobject(SPR_SRSellerName - 1).ColumnName(SPRName_SRSellerName);
            nwGrid.nwobject(SPR_SRRowno - 1).ColumnName(SPRName_SRRowno);

            #endregion

            #region Column Width

            nwGrid.nwobject(SPR_SRSellerRoleCode - 1).Width(0);
            nwGrid.nwobject(SPR_SRSellerRoleDesc - 1).Width(150);
            nwGrid.nwobject(SPR_SRLevel - 1).Width(100);
            nwGrid.nwobject(SPR_SRSellerCode - 1).Width(110);
            nwGrid.nwobject(SPR_SRSellerName - 1).Width(200);
            nwGrid.nwobject(SPR_SRRowno - 1).Width(0);

            #endregion

            #region Column Color

            nwGrid.nwobject(SPR_SRSellerRoleCode - 1).BackgroundColor("white");
            nwGrid.nwobject(SPR_SRSellerRoleDesc - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_SRLevel - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_SRSellerCode - 1).BackgroundColor("cyan");
            nwGrid.nwobject(SPR_SRSellerName - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_SRRowno - 1).BackgroundColor("white");

            #endregion

            #region Column Templates
            if (based.isInterface == true)
            {
                nwGrid.nwobject(SPR_SRSellerRoleDesc - 1).HeaderFieldRequired(true);
                nwGrid.nwobject(SPR_SRSellerCode - 1).HeaderFieldRequired(true);
            }

            #endregion

            #region Column Button
            #endregion

            if (!isInitialize && OrigRowCnt > 0)
            {
                nwGrid.dataSource(dtDataSource);
            }

            //else if (isInitialize && OrigRowCnt > 0)
            //{
            //    nwGrid.dataSource(dtDataLoad);
            //}

            else
            {
                nwGrid.dataSource(dtDataLoad);
            }


            //## THEME FORMAT
            nwGrid.HeaderBorderColor("#DEDEDE");
            nwGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwGrid.TableBorderColor("#BBB");
            nwGrid.BodyBorderColor("#BBB");
            nwGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGrid.HeaderTextColor("#131313");
            nwGrid.HoverColor("#DEDEDE", "inherit");
            nwGrid.SelectedRowHover("#DEDEDE");
            nwGrid.SelectedRowHoverColor("inherit");

            js.makeHTML("#nwGridCon", nwGrid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("$('.nwGrid div.nwGridData').css('background-color', 'white');");

        }

        public void CreateGridViewUpdateHistory(bool isInitialize)
        {

            string gridID = "nwGrid";
            nwGrid nwGrid = new nwGrid(gridID);
            DataTable dtDataSource = new DataTable();
            string txtID = WebApp.nwobjectText("txtID");
            string nwTranType = WebApp.nwobjectText("nwTranType");

            dtDataSource = dal.getLineDetails(txtID, nwTranType);

            int rowCnt = 0;
            int OrigRowCnt = 0;
            try
            {
                rowCnt = dtDataSource.Rows.Count;
                OrigRowCnt = dtDataSource.Rows.Count;
            }
            catch (Exception ex)
            {
                //ex.ToString();
                //rowCnt = dtDataSource.Rows.Count;
            }

            int colCnt = SPR_VURowno;
            nwGrid.CreateExcelGrid(rowCnt, colCnt);
            nwGrid.minRow(10);
            nwGrid.TableHeight(300);
            #region Column Title

            nwGrid.nwobject(SPR_VUField - 1).ColumnName(SPRName_VUField);
            nwGrid.nwobject(SPR_VUFrom - 1).ColumnName(SPRName_VUFrom);
            nwGrid.nwobject(SPR_VUTo - 1).ColumnName(SPRName_VUTo);
            nwGrid.nwobject(SPR_VUUpdatedBy - 1).ColumnName(SPRName_VUUpdatedBy);
            nwGrid.nwobject(SPR_VUDateUpdated - 1).ColumnName(SPRName_VUDateUpdated);
            nwGrid.nwobject(SPR_VURowno - 1).ColumnName(SPRName_VURowno);

            #endregion

            #region Column Width

            nwGrid.nwobject(SPR_VUField - 1).Width(150);
            nwGrid.nwobject(SPR_VUFrom - 1).Width(150);
            nwGrid.nwobject(SPR_VUTo - 1).Width(150);
            nwGrid.nwobject(SPR_VUUpdatedBy - 1).Width(150);
            nwGrid.nwobject(SPR_VUDateUpdated - 1).Width(150);
            nwGrid.nwobject(SPR_VURowno - 1).Width(0);

            #endregion

            #region Column Color

            nwGrid.nwobject(SPR_VUField - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_VUFrom - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_VUTo - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_VUUpdatedBy - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_VUDateUpdated - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_VURowno - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Templates
            //nwGrid.nwobject(SPR_SDSeminarTrainingDesc - 1).HeaderFieldRequired(true);
            //nwGrid.nwobject(SPR_SDDay - 1).HeaderFieldRequired(true);
            //nwGrid.nwobject(SPR_SDSeminarDate - 1).HeaderFieldRequired(true);
            //nwGrid.nwobject(SPR_SDDay - 1).Template("<select nwvalue='' class='nwSelect'></select>");  //id = 'Day'

            //nwGrid.nwobject(SPR_SDSeminarDate - 1).InputDate("MM/dd/yyyy");
            //nwGrid.nwobject(SPR_SDRemarks - 1).Template("<input id = 'Remarks' type = 'text' maxlength='500' value ='{" + (SPR_SDRemarks - 1) + "}'/>");

            #endregion

            #region Column Button
            #endregion

            if (!isInitialize && OrigRowCnt > 0)
                nwGrid.dataSource(dtDataSource);
            else
                nwGrid.CreateExcelGrid(rowCnt, colCnt);

            //## THEME FORMAT
            nwGrid.HeaderBorderColor("#DEDEDE");
            nwGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwGrid.TableBorderColor("#BBB");
            nwGrid.BodyBorderColor("#BBB");
            nwGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGrid.HeaderTextColor("#131313");
            nwGrid.HoverColor("#DEDEDE", "inherit");
            nwGrid.SelectedRowHover("#DEDEDE");
            nwGrid.SelectedRowHoverColor("inherit");

            js.makeHTML("#nwGridCon", nwGrid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("$('.nwGrid div.nwGridData').css('background-color', 'white');");

        }

        public void CreateGridViewHistoryDetails(bool isInitialize)
        {

            string gridID = "nwGridViewHistory";
            nwGrid nwGrid = new nwGrid(gridID);
            DataTable dtDataSource = new DataTable();
            string txtID = WebApp.nwobjectText("nwSellerCode");
            string nwTranType = "VWHD";

            dtDataSource = dal.getLineDetails(txtID, nwTranType);

            int rowCnt = 0;
            int OrigRowCnt = 0;
            try
            {
                rowCnt = dtDataSource.Rows.Count;
                OrigRowCnt = dtDataSource.Rows.Count;
            }
            catch (Exception ex)
            {
                //ex.ToString();
                //rowCnt = dtDataSource.Rows.Count;
            }

            int colCnt = SPR_VWRowno;
            nwGrid.CreateExcelGrid(rowCnt, colCnt);
            nwGrid.minRow(10);
            nwGrid.TableHeight(280);
            #region Column Title

            nwGrid.nwobject(SPR_VWEffectiveDate - 1).ColumnName(SPRName_VWEffectiveDate);
            nwGrid.nwobject(SPR_VWSellerRole - 1).ColumnName(SPRName_VWSellerRole);
            nwGrid.nwobject(SPR_VWLevel - 1).ColumnName(SPRName_VWLevel);
            nwGrid.nwobject(SPR_VWSellerCode - 1).ColumnName(SPRName_VWSellerCode);
            nwGrid.nwobject(SPR_VWSellerName - 1).ColumnName(SPRName_VWSellerName);
            nwGrid.nwobject(SPR_VWUpdatedBy - 1).ColumnName(SPRName_VWUpdatedBy);
            nwGrid.nwobject(SPR_VWDateUpdated - 1).ColumnName(SPRName_VWDateUpdated);
            nwGrid.nwobject(SPR_VWRowno - 1).ColumnName(SPRName_VWRowno);

            #endregion

            #region Column Width

            nwGrid.nwobject(SPR_VWEffectiveDate - 1).Width(150);
            nwGrid.nwobject(SPR_VWSellerRole - 1).Width(150);
            nwGrid.nwobject(SPR_VWLevel - 1).Width(150);
            nwGrid.nwobject(SPR_VWSellerCode - 1).Width(150);
            nwGrid.nwobject(SPR_VWSellerName - 1).Width(150);
            nwGrid.nwobject(SPR_VWUpdatedBy - 1).Width(150);
            nwGrid.nwobject(SPR_VWDateUpdated - 1).Width(150);
            nwGrid.nwobject(SPR_VWRowno - 1).Width(0);

            #endregion

            #region Column Color

            nwGrid.nwobject(SPR_VWEffectiveDate - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_VWSellerRole - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_VWLevel - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_VWSellerCode - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_VWSellerName - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_VWUpdatedBy - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_VWDateUpdated - 1).BackgroundColor("gainsboro");
            nwGrid.nwobject(SPR_VWRowno - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Templates

            #endregion

            #region Column Button
            #endregion

            if (!isInitialize && OrigRowCnt > 0)
                nwGrid.dataSource(dtDataSource);
            else
                nwGrid.CreateExcelGrid(rowCnt, colCnt);

            //## THEME FORMAT
            nwGrid.HeaderBorderColor("#DEDEDE");
            nwGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwGrid.TableBorderColor("#BBB");
            nwGrid.BodyBorderColor("#BBB");
            nwGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGrid.HeaderTextColor("#131313");
            nwGrid.HoverColor("#DEDEDE", "inherit");
            nwGrid.SelectedRowHover("#DEDEDE");
            nwGrid.SelectedRowHoverColor("inherit");

            js.makeHTML("#nwGridViewHistoryCon", nwGrid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("$('#nwGridViewHistory div.nwGridData').css('background-color', 'white');");

        }
        #region Standard Functionality

        private string getGridColName(int col, bool hasRemoveNull)
        {
            return string.Format("column{0} {1}", (col - 1).ToString(), hasRemoveNull ? "<> ''" : "").Trim(); ;
        }

        private DataTable getFilteredGrid(DataTable dt, string colName, string colSort)
        {
            DataTable dtDetails = new DataTable();
            dtDetails = new DataView(dt, colName, colSort, DataViewRowState.CurrentRows).ToTable();
            return dtDetails;
        }

        #endregion

        private DataTable LoadSchema(string nwTranType)
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema(dtHDR, nwTranType);
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["ID"] = WebApp.nwobjectText("txtID");
            dr["SellerCode"] = WebApp.nwobjectText("txtSellerCode");
            dr["SellerName"] = WebApp.nwobjectText("txtSellerName");
            if ((nwTranType == "MOCR") || (nwTranType == "UPSR") || (nwTranType == "SELD"))
            {
                dr["EffectiveDate"] = WebApp.nwobjectDate("txtEffectiveDate");
            }
            if (nwTranType == "UPSR")
            {
                dr["SellerRoleTo"] = WebApp.nwobjectText("idvallugSellerRoleTo");
                dr["SellerRoleFrom"] = WebApp.nwobjectText("txtSellerRoleFromCode");
            }
            dr["RecUser"] = based.SecurityAccess.RecUser;
            dr["ModUser"] = based.SecurityAccess.RecUser;
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion

            return dtHDR;
        }

        private DataTable LoadSchemaLIN(string nwTranType)
        {

            var dttls = new DataTable();
            dttls = WebApp.nwGridData(WebApp.nwobjectText("nwGridCon"));

            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadSchemaLIN(dtLIN, nwTranType);
            #endregion

            DataTable dt_details = WebApp.nwGridData(WebApp.nwobjectText("nwGridCon"));

            foreach (DataRow dr_details in dt_details.Rows)
            {
                if (nwTranType == "MOCR")
                {
                    if (dr_details[SPR_ModeofCommissionReleaseCode - 1].ToString().Trim() != string.Empty)
                    {
                        DataRow dr = dtLIN.NewRow();
                        dr["ModeofCommissionReleaseCode"] = dr_details[SPR_ModeofCommissionReleaseCode - 1].ToString();
                        dtLIN.Rows.Add(dr);
                        dtLIN.AcceptChanges();
                    }
                }
                else if (nwTranType == "DOCD")
                {
                    if (dr_details[SPR_DDDocumentControlCode - 1].ToString().Trim() != string.Empty)
                    {
                        DataRow dr = dtLIN.NewRow();
                        dr["DocumentControlCode"] = dr_details[SPR_DDDocumentControlCode - 1].ToString();
                        dr["DocumentSourceCode"] = dr_details[SPR_DDDocumentSourceCode - 1].ToString();
                        dr["DocumentNo"] = dr_details[SPR_DDDocumentNo - 1].ToString();
                        dr["DocumentDate"] = CreateDBDateTime(dr_details[SPR_DDDocumentDate - 1].ToString());
                        dr["ExpiryDate"] = CreateDBDateTime(dr_details[SPR_DDExpiryDate - 1].ToString());
                        dr["Attachment"] = Parser.ParseInt(dr_details[SPR_DDAttachment - 1]);
                        dr["AttachmentPath"] = dr_details[SPR_DDAttachmentPath - 1].ToString();
                        dtLIN.Rows.Add(dr);
                        dtLIN.AcceptChanges();
                    }
                }
                else if (nwTranType == "BAAC")
                {
                    if (dr_details[SPR_BABankCode - 1].ToString().Trim() != string.Empty)
                    {
                        DataRow dr = dtLIN.NewRow();
                        dr["BankCode"] = dr_details[SPR_BABankCode - 1].ToString();
                        dr["Branch"] = dr_details[SPR_BABranch - 1].ToString();
                        dr["AccountNo"] = dr_details[SPR_BAAccountNo - 1].ToString();
                        dr["AccountName"] = dr_details[SPR_BAAccountName - 1].ToString();
                        dr["AccountType"] = dr_details[SPR_BAAccountTypeCode - 1].ToString();
                        dr["Particulars"] = dr_details[SPR_BAParticulars - 1].ToString();
                        dtLIN.Rows.Add(dr);
                        dtLIN.AcceptChanges();
                    }
                }
                else if (nwTranType == "ADAC")
                {
                    if (dr_details[SPR_ADProjectCode - 1].ToString().Trim() != string.Empty)
                    {
                        DataRow dr = dtLIN.NewRow();
                        dr["ProjectCode"] = dr_details[SPR_ADProjectCode - 1].ToString();
                        dr["AccountNo"] = dr_details[SPR_ADAccountNo - 1].ToString();
                        dr["ReservationDate"] = CreateDBDateTime(dr_details[SPR_ADReservationDate - 1].ToString());
                        dtLIN.Rows.Add(dr);
                        dtLIN.AcceptChanges();
                    }
                }
                else if (nwTranType == "SETD")
                {
                    if (dr_details[SPR_SDSeminarTrainingCode - 1].ToString().Trim() != string.Empty)
                    {
                        DataRow dr = dtLIN.NewRow();
                        dr["SeminarTraining"] = dr_details[SPR_SDSeminarTrainingCode - 1].ToString();
                        dr["Day"] = dr_details[SPR_SDDay - 1].ToString();
                        dr["SeminarDate"] = CreateDBDateTime(dr_details[SPR_SDSeminarDate - 1].ToString());
                        dr["Remarks"] = dr_details[SPR_SDRemarks - 1].ToString();
                        dtLIN.Rows.Add(dr);
                        dtLIN.AcceptChanges();
                    }
                }
                else if (nwTranType == "SELD")
                {
                    if (dr_details[SPR_SRSellerCode - 1].ToString().Trim() != string.Empty)
                    {
                        DataRow dr = dtLIN.NewRow();
                        dr["SellerRole"] = dr_details[SPR_SRSellerRoleCode - 1].ToString();
                        dr["SellerCode"] = dr_details[SPR_SRSellerCode - 1].ToString();
                        dtLIN.Rows.Add(dr);
                        dtLIN.AcceptChanges();
                    }
                }
            }
            return dtLIN;

        }

        public static object CreateDBDateTime(string date)
        {
            DateTime result;
            if (DateTime.TryParse(date, out result))
            {
                return result;
            }
            return DBNull.Value;
        }
        public string getCodeListMOCR()
        {
            string ListofCode = "";
            DataTable dtLin = LoadSchemaLINMOCR();

            foreach (DataRow dr in dtLin.Rows)
            {

                ListofCode += dr[SPRName_ModeofCommissionReleaseCode].ToString() + '|';

            }
            // dr["BSNDATANO"].ToString()  
            return ListofCode;
        }

        private DataTable LoadSchemaLINMOCR()
        {
            DataTable dtLin = new DataTable();

            dtLin = getFilteredGrid(WebApp.nwGridData(WebApp.nwobjectText("nwGridCon")), getGridColName(SPR_ModeofCommissionReleaseCode, true), "");
            dtLin.Columns[getGridColName(SPR_ModeofCommissionReleaseCode, false)].ColumnName = SPRName_ModeofCommissionReleaseCode;
            return dtLin;
        }


        public string getCodeListDOCD()
        {
            string ListofCode = "";
            DataTable dtLin = LoadSchemaLINDOCD();

            foreach (DataRow dr in dtLin.Rows)
            {

                ListofCode += dr[SPRName_DDDocumentControlCode].ToString() + '|';

            }
            // dr["BSNDATANO"].ToString()  
            return ListofCode;
        }

        private DataTable LoadSchemaLINDOCD()
        {
            DataTable dtLin = new DataTable();

            dtLin = getFilteredGrid(WebApp.nwGridData(WebApp.nwobjectText("nwGridCon")), getGridColName(SPR_DDDocumentControlCode, true), "");
            dtLin.Columns[getGridColName(SPR_DDDocumentControlCode, false)].ColumnName = SPRName_DDDocumentControlCode;
            return dtLin;
        }

        public string getCodeListBAAC()
        {
            string ListofCode = "";
            DataTable dtLin = LoadSchemaLINBAAC();

            foreach (DataRow dr in dtLin.Rows)
            {

                ListofCode += dr[SPRName_BABankCode].ToString() + '|';

            }
            // dr["BSNDATANO"].ToString()  
            return ListofCode;
        }

        private DataTable LoadSchemaLINBAAC()
        {
            DataTable dtLin = new DataTable();

            dtLin = getFilteredGrid(WebApp.nwGridData(WebApp.nwobjectText("nwGridCon")), getGridColName(SPR_BABankCode, true), "");
            dtLin.Columns[getGridColName(SPR_BABankCode, false)].ColumnName = SPRName_BABankCode;
            return dtLin;
        }

        public string getCodeListADAC()
        {
            string ListofCode = "";
            DataTable dtLin = LoadSchemaLINADAC();

            foreach (DataRow dr in dtLin.Rows)
            {

                ListofCode += dr[SPRName_ADProjectCode].ToString() + '|';

            }
            // dr["BSNDATANO"].ToString()  
            return ListofCode;
        }

        private DataTable LoadSchemaLINADAC()
        {
            DataTable dtLin = new DataTable();

            dtLin = getFilteredGrid(WebApp.nwGridData(WebApp.nwobjectText("nwGridCon")), getGridColName(SPR_ADProjectCode, true), "");
            dtLin.Columns[getGridColName(SPR_ADProjectCode, false)].ColumnName = SPRName_ADProjectCode;
            return dtLin;
        }


        public string getCodeListSELD()
        {
            string ListofCode = "";
            DataTable dtLin = LoadSchemaLINSELD();

            foreach (DataRow dr in dtLin.Rows)
            {

                ListofCode += dr[SPRName_SRSellerRoleCode].ToString() + '|';

            }
            // dr["BSNDATANO"].ToString()  
            return ListofCode;
        }

        private DataTable LoadSchemaLINSELD()
        {
            DataTable dtLin = new DataTable();

            dtLin = getFilteredGrid(WebApp.nwGridData(WebApp.nwobjectText("nwGridCon")), getGridColName(SPR_SRSellerRoleCode, true), "");
            dtLin.Columns[getGridColName(SPR_SRSellerRoleCode, false)].ColumnName = SPRName_SRSellerRoleCode;
            return dtLin;
        }
    }
}