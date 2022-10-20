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
    public class SBCustomerMasterFileBL : nwAction
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

       private const int
        SPR_EMPBnkInstitutioName = 1,
        SPR_EMPBnkBranchNo = 2,
        SPR_EMPBnkAccountType = 3,
        SPR_EMPBnkAccountNumber = 4,
        SPR_EMPBnkAvgAmt = 5;

        private const int
        SPR_SPSBnkInstitutioName = 1,
        SPR_SPSBnkBranchNo = 2,
        SPR_SPSBnkAccountType = 3,
        SPR_SPSBnkAccountNumber = 4,
        SPR_SPSBnkAvgAmt = 5;

        #region Standard Functionality
        WebApplib WebApp = new WebApplib();
        Promptlib custom_Prompt = new Promptlib();
        nwObject nwObject = new nwObject();
        DataAccess nwDataAccess = new DataAccess();
        JSFunction custom_js = new JSFunction();
        nwAction nwAction = new nwAction();
        nwSFObjects SFObjects = new nwSFObjects();
        #endregion
        private const int
           SPR_RowNum = 1,
           SPR_TransactionType = 2,
           SPR_TransactionNo = 3;
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
            dal = new SBCustomerMasterFileDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        public string nwCustnoBackEnd = string.Empty;
        public string strConn = "";
        string RecordOperationResult = String.Empty;
        SBCustomerMasterFileDAL dal;
        //int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public SBCustomerMasterFileBL()
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

            string strFinal = "";
            string strSQL = "";
            string mouseDownFunc = "";
            string mouseOverFunc = "";
            //string strName = "";
            strConn = this.UserDefinedConnectionString;

            switch (strMethod)
            {
                case "getlugBranchID":
                    strSQL = dal.getBranchID;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugCustClass":
                    strSQL = dal.getCustClass();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugVIPType":
                    strSQL = dal.getVIPType(WebApp.nwobjectText("idvallugCustTag"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugSourceOfIncome":
                    strSQL = dal.getSourceOfIncome;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugPaymentOption":
                    strSQL = dal.getPaymentOption;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugSalutation":
                    strSQL = dal.GetSalutation;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugSuffix":
                    strSQL = dal.getNameSuffix;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugNationality":
                    strSQL = dal.getNationality;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugGender":
                    strSQL = dal.getGender;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


                case "getlugCivilStatus":
                    strSQL = dal.getCivilStatus(WebApp.nwobjectText("idvallugSalutation"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugOccupation":
                    strSQL = dal.getDesc5();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugEmpSubType":
                    strSQL = dal.getEsubType();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugCustTag":
                    strSQL = dal.getCustTagging();
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugInstitution":
                    strSQL = dal.Institution();
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugLoadTypeOfAccount":
                    strSQL = dal.LoadTypeOfAccount();
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSpsInstitution":
                    strSQL = dal.Institution();
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSpsLoadTypeOfAccount":
                    strSQL = dal.LoadTypeOfAccount();
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "gettoolboxInquire":
                    strSQL = dal.inquireQuery(based.SecurityAccess.RecUser);

                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(1);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getCustomDesiredProperty": case "getlugDesiredPropertyPI":
                    string code = "";
                    if (WebApp.nwobjectText("txtCode") != "")
                        code = WebApp.nwobjectText("txtCode");
                    else
                        code = based.SecurityAccess.RecUser;
                    strSQL = dal.lugDesiredProperty(code);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
            }

            return strFinal;
        }

        ///// Standard RecordOperation 

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";

            switch (i)
            {
                case eRecordOperation.AddNew:

                    nwToolBox.bindingNavigatorSaveItem.Enable = true;
                    nwToolBox.bindingNavigatorAddNewItem.Visible = true;
                    nwToolBox.bindingNavigatorRefreshItem.Enable = true;
                    nwToolBox.bindingNavigatorAddNewItem.Enable = true;
                    nwToolBox.bindingNavigatorPrintItem.Enable =
                    nwToolBox.bindingNavigatorInquireItem.Enable =
                    nwToolBox.bindingNavigatorImportItem.Visible =
                    nwToolBox.bindingNavigatorDeleteItem.Enable =
                    nwToolBox.bindingNavigatorDeleteItem.Visible =
                    nwToolBox.bindingNavigatorProcessItem.Visible =
                    nwToolBox.bindingNavigatorProcessItem.Enable =
                    nwToolBox.bindingNavigatorExportItem.Enable = false;
                    js.Enable("#btnupdate", false);
                    js.ADD("$('#cbIndividual').prop('checked', true);");
                    js.ADD("$('#cbCompany').prop('checked', false); ");
                    js.ADD("$('#cbVIP').prop('checked', false); ");
                    js.ADD("func_CustType();");
                    js.ADD("$('#btnAddCoowner,#btnViewCoowner').enable(false);");
                    js.makeAttr("#profile-img", "style", "");
                    js.makeAttr("#profile-img-signature", "style", "");
                    js.makeHTML(".cmbMunicipality", "");
                    js.makeHTML(".cmbBarangay", "");
                    js.makeHTML(".cmbMunicipalityCO", "");
                    js.makeHTML(".cmbBarangayCO", "");
                    js.ADD("func_ChangeRecommendation('N',true)");
                    dal.DeleteDesiredProperty(based.SecurityAccess.RecUser);

                    js.makeValueText("#txtCode", dal.GetNewCode());
                    break;

                case eRecordOperation.Save:
                    RecordOperationResult = ValidateData(1, isNewRow);

                    if (RecordOperationResult.Length <= 0)
                    {
                        DataSet ds = LoadSchema();
                        RecordOperationResult = dal.SaveData(ds, isNewRow);
                        //js.ADD("PopulateReservationEntry()");
                    }
                    else
                    {
                        Prompt.Error(RecordOperationResult , based.Title);
                        return;
                    }

                    if (RecordOperationResult.ToLower().Contains("success"))
                        RecordOperationResult = "Saved successfully";

                    break;

                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("txtCode"));
                    break;

                case eRecordOperation.Process:
                    RecordOperationResult = ValidateData(3, isNewRow);
                    if (RecordOperationResult.Length <= 0)
                    {
                        //nwConfiguration nwconfig = new nwConfiguration();
                        //NoahWebLib.Security.NOAHEncryptor nwSecurity = new NoahWebLib.Security.NOAHEncryptor();
                        //string password = nwSecurity.EncryptToString("noah@123");
                        RecordOperationResult = dal.ProcessData(WebApp.nwobjectText("txtCode"));
                       // RecordOperationResult = dal.ProcessData(WebApp.nwobjectText("txtCode"), password ,WebApp.nwobjectText("txtRegName"));
                    }
                    else
                    {
                        Prompt.Information(RecordOperationResult, based.Title);
                        return;
                    }
                    if (RecordOperationResult.ToLower().Contains("process"))
                        RecordOperationResult = RecordOperationResult.Replace("Process has successfully completed.", "Process completed");

                    break;

                case eRecordOperation.Refresh:
                    RefreshData();
                    js.ADD("nwLoading_End('xRefreshBtn');");

                    //DataTable CurrBnk = dtGridLin();
                    //CreateGrid(false, CurrBnk);

                    //DataTable dt2 = dtGridLin2();
                    //CreateGrid2(false, dt2);
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



                    string source = string.Empty;
                    string refDocNo = string.Empty;
                    string nwCustno = string.Empty; //this parameter will be use in the entry for buyers info
                    string nwCom = string.Empty; //this parameter will be use in the updating for backend
                    string code = WebApp.nwobjectText("code");
                    int tagging = 0;
                    if (HttpContext.Current != null)
                    {
                        var request = HttpContext.Current.Request;
                        source = request.QueryString["nwpEntryParam"];
                        refDocNo = request.QueryString["nwpRefTranNo"];
                        nwCustno = request.QueryString["nwCustno"];
                        nwCustnoBackEnd = request.QueryString["nwCustnoBackEnd"];
                        nwCom = request.QueryString["nwcom"];
                    }

                  
                   

                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, dal.LISTINGSTARTROW, dal.LISTINGQUERY(based.SecurityAccess.RecUser),
                                                           LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                           based.SecurityAccess.RecUserName, LISTINGFILENAME);
                    frmlist.m_Spread.ExportFileName = LISTINGFILENAME;

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
                    //Prompt.Information(tempstr, based.Title);
                    js.ADD("EnableFields();");
                    js.ADD("func_CheckIfVIP()");
                    js.Enable(".mainButtons", false);
                    js.ADD("$('#attachIDPicture').enable(true)");
                    js.ADD("$('#attachSignature').enable(true)");
                    nwToolBox.bindingNavigatorSaveItem.Enable = true;
                    break;
                case eRecordOperation.Search:
                    tempstr = "search";
                    //Prompt.Information(tempstr, based.Title);
                    break;
            }

            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.IndexOf("Error") != 0 && RecordOperationResult.IndexOf("Cannot") != 0)
                {
                    RefreshData();
                    js.ADD("loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtCode") + "') ");
                    
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    Prompt.Information(RecordOperationResult, based.Title);

                }
                else
                {
                    if(RecordOperationResult.IndexOf("Error") != 0)
                        Prompt.Information(RecordOperationResult, based.Title);
                    else
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
            //string strFinal = "", strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();

                    if (WebApp.nwobjectText("txtCode") != "")
                    {
                        DataTable CurrBnk = dtGridLin();
                        CreateGrid(false, CurrBnk);

                        DataTable dt2 = dtGridLin2();
                        CreateGrid2(false, dt2);
                    }
                    else
                    {
                        CreateGrid(true, InitializeGrid());
                        CreateGrid2(true, InitializeGrid2());

                    }
                    break;
                case "actBindCollectionEmpty":
                    js.ADD("DisableFieldsEmpty();");
                    nwToolBox.bindingNavigatorSaveItem.Enable = false;
                    nwToolBox.bindingNavigatorDeleteItem.Enable = false;
                    nwToolBox.bindingNavigatorInquireItem.Enable = false;
                    nwToolBox.bindingNavigatorProcessItem.Visible = false;
                    nwToolBox.bindingNavigatorExportItem.Enable = false;
                    js.ADD("nwLoading_End('actBindCollectionEmpty')");
                    break;
                case "actSpecialCombo":
                    string cid = WebApp.nwobjectText("cid");
                    string value = WebApp.nwobjectText("code");
                    int qt = WebApp.nwobjectInt("qt");
                    LoadCombosSpecial(qt, cid, value, "", WebApp.nwobjectText("txtCode"));
                    break;
                case "actSpecialComboCO":
                    string cidCO = WebApp.nwobjectText("cidCO");
                    string valueCO = WebApp.nwobjectText("codeCO");
                    int qtCO = WebApp.nwobjectInt("qtCO");
                    LoadCombosSpecialCO(qtCO, cidCO, valueCO, "", WebApp.nwobjectText("txtCode"));
                    break;
                case "actSalutation":
                    DataTable dt = SFObject.LoadDataTable(dal.GetSalutationData(WebApp.nwobjectText("salutation"))
                   , this.UserDefinedConnectionString);
                    
                    if (dt.Rows.Count >= 1)
                    {

                        string gendercode = dt.Rows[0]["Gender"].ToString();
                        string genderdesc = dt.Rows[0]["genderDesc"].ToString();

                        string civilcode = dt.Rows[0]["civilstatus"].ToString();
                        string civildesc = dt.Rows[0]["civilDesc"].ToString();

                        js.makeValueText("#idvallugGender", gendercode);
                        js.makeValueText("#descvallugGender", genderdesc);

                        js.ADD("$('#idvallugCivilStatus').val('')");
                        js.ADD("$('#descvallugCivilStatus').val('')");

                        js.makeValueText("#idvallugCivilStatus", civilcode);
                        js.makeValueText("#descvallugCivilStatus", civildesc);

                        if (civilcode == "02")
                        {
                            js.ADD(" $('#spouses').enable(true);");
                            js.ADD(" $('#nameConsent').enable(true);");
                        }
                    }
                    js.ADD("nwLoading_End('actSalutation')");
                    break;
                case "actSaveCustomerImage":
                    string error = "";
                    error = dal.saveImage(WebApp.nwobjectText("txtCode"), WebApp.nwobjectText("path"));
                    if (error.ToLower().Contains("success"))
                    {
                        setCustomerImage();
                        Prompt.Information("Upload is successful.", based.Title);
                    }
                    js.ADD("nwLoading_End('actSaveCustomerImage')");
                    break;

                case "actSaveSignature":
                    error = "";
                    error = dal.saveSignature(WebApp.nwobjectText("txtCode"), WebApp.nwobjectText("path"));
                    if (error.ToLower().Contains("success"))
                    {
                        setCustomerImage();
                        Prompt.Information("Upload is successful.", based.Title);
                    }
                    js.ADD("nwLoading_End('actSaveSignature')");
                    break;
                case "actViewCoownerDetails":
                    GenerateCoownerDetails();
                    break;
                case "actDesiredProperty":
                
                    break;
                case "actInsertDesiredProperty": //delete
                    string cust = WebApp.nwobjectText("xxcustcode");
                    string propcode = WebApp.nwobjectText("xxcode");
                    int isdelete= WebApp.nwobjectInt("isdelete");
                    if (cust == "")
                        cust = based.SecurityAccess.RecUser;
                    dal.InsertDesiredProperty(propcode, cust, isdelete);
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
                    standardBL.PrimaryKey = "CustomerCode";

                    string source = string.Empty;
                    string refDocNo = string.Empty;
                    string nwCustno = string.Empty; //this parameter will be use in the entry for buyers info
                    string nwCom = string.Empty; //this parameter will be use in the updating for backend
                    string code = WebApp.nwobjectText("code");
                    string codevalue = WebApp.nwobjectText("codevalue"); // codevalue will be filter of primary key add these filter

                    if (HttpContext.Current != null)
                    {
                        var request = HttpContext.Current.Request;
                        source = request.QueryString["nwpEntryParam"];
                        refDocNo = request.QueryString["nwpRefTranNo"];
                        nwCustno = request.QueryString["nwCustno"];
                        nwCustnoBackEnd = request.QueryString["nwCustnoBackEnd"];
                        nwCom = request.QueryString["nwcom"];
                    }

                    if (nwCustno != null) // portal entry
                    {
                        //strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(based.SecurityAccess.RecUser, codevalue), this.UserDefinedConnectionString);

                        strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(based.SecurityAccess.RecUser, nwCustno, codevalue), this.UserDefinedConnectionString);
                    }
                    else //portal viewing
                         //strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(based.SecurityAccess.RecUser, codevalue), this.UserDefinedConnectionString);

                        strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(based.SecurityAccess.RecUser, nwCustno, codevalue), this.UserDefinedConnectionString);

                    break;
            }

            return strFinal;
        }


        //////////////////////// Common
        private void SetBindings()
        {
            //Main
            SFObject.SetControlBinding("#cbIndividual", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "CustomerTypeInd");
            SFObject.SetControlBinding("#cbCompany", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "CustomerTypeComp");
            SFObject.SetControlBinding("#cbVIP", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "VIP");
            SFObject.SetControlBinding("#cbNewInquiry", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "isNewInquiry");
            SFObject.SetControlBinding("#cbNewReservation", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "isNewReservation");
            SFObject.SetControlBinding("#cbTransfer", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "isTransfer");
            SFObject.SetControlBinding("#txtCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CustomerCode");
            SFObject.SetControlBinding("#txtCodeCrossReference", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CustomerCodeCrossReference");
            SFObject.SetControlBinding("#cmbCustClass", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CustomerClassification");
            SFObject.SetControlBinding("#cmbVIPType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "VIPType");
            SFObject.SetControlBinding("#txtRecStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RecStatus");
            SFObject.SetControlBinding("#txtStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RecordStatus");

            //Individual
            SFObject.SetControlBinding("#txtFullName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RegisteredName");
            SFObject.SetControlBinding("#chkCoowner", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "withCoowner");
            SFObject.SetControlBinding("#txtLastName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LastName");
            SFObject.SetControlBinding("#txtFirstName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "FirstName");
            SFObject.SetControlBinding("#txtMiddleName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MiddleName");
            SFObject.SetControlBinding("#txtmri", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MI");
            SFObject.SetControlBinding("#cmbSuffix", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "nameSuffix");
            SFObject.SetControlBinding("#cmbSalutation", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SalutationCode");
            SFObject.SetControlBinding("#cmbGender", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Gender");
            SFObject.SetControlBinding("#txtMothersMaiden", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MothersMaidenName");
            SFObject.SetControlBinding("#txtBday", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Birthday");
            SFObject.SetControlBinding("#txtAge", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Age");
            SFObject.SetControlBinding("#txtPlaceBirth", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PlaceofBirth");
            SFObject.SetControlBinding("#cmbCivilStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CivilStatus");
            SFObject.SetControlBinding("#cmbNationality", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Nationality");
            SFObject.SetControlBinding("#txtTIN", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TIN"); 
            SFObject.SetControlBinding("#cmbOccupation", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Occupation"); 
            SFObject.SetControlBinding("#cmbSourceOfIncome", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SourceofIncome");
            SFObject.SetControlBinding("#cmbPaymentOption", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PaymentOption");
            SFObject.SetControlBinding("#txtLandlineNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LandlineNo");
            SFObject.SetControlBinding("#txtLocalNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LocalNo");
            SFObject.SetControlBinding("#txtMobileNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MobileNo");
            SFObject.SetControlBinding("#txtEmail", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmailAdd");
            SFObject.SetControlBinding("#chkFullAddress", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "isFullLocation");
            SFObject.SetControlBinding("#txtFullAddress", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "FullLocationAddress");
            SFObject.SetControlBinding("#cmbProvince", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Province");
            SFObject.SetControlBinding("#txtMunicipality", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Municipality");
            SFObject.SetControlBinding("#txtBarangay", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Barangay");
            SFObject.SetControlBinding("#txtZipCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ZipCode");
            SFObject.SetControlBinding("#txtRegionCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RegionCode");
            SFObject.SetControlBinding("#txtCountryCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CountryCode");
            SFObject.SetControlBinding("#txtRegion", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RegionDesc");
            SFObject.SetControlBinding("#txtCountry", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CountryDesc");
            SFObject.SetControlBinding("#cmbHomeOwn", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "HomeOwnership");
            SFObject.SetControlBinding("#cmbLocType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LocationType");
            SFObject.SetControlBinding("#txtMailAddress", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MailingAddress");
            SFObject.SetControlBinding("#txtValidID", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "validID");
            SFObject.SetControlBinding("#txtDateIssued", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "dateIssued");
            SFObject.SetControlBinding("#txtPlaceIssued", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PlaceIssued");
            SFObject.SetControlBinding("#txtEmpContactPerson", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpContactPerson");
            SFObject.SetControlBinding("#txtEmpContactPersonNum", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpContactPersonNum");


            //Spouse Info
            SFObject.SetControlBinding("#txtLastNameSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseLastName");
            SFObject.SetControlBinding("#txtFirstNameSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseFirstName");
            SFObject.SetControlBinding("#txtMiddleNameSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseMiddleName");
            SFObject.SetControlBinding("#txtmriSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseMI");
            SFObject.SetControlBinding("#cmbSuffixSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseSuffix");
            SFObject.SetControlBinding("#cmbSalutationSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseSalutation");
            SFObject.SetControlBinding("#cmbGenderSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseGender"); 
            SFObject.SetControlBinding("#txtBdaySP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseBirthday");
            SFObject.SetControlBinding("#txtAgeSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseAge");
            SFObject.SetControlBinding("#txtTINSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseTIN");
            SFObject.SetControlBinding("#txtDateMarriageSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseDateOfMarriage");
            SFObject.SetControlBinding("#cmbNationalitySP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseNationality");
            SFObject.SetControlBinding("#cmbOccupationSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseOccupation");
            SFObject.SetControlBinding("#txtCompanySP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseCompany");

            
            //addded
            SFObject.SetControlBinding("#txtMobileNoSp", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseMobileNo");
            SFObject.SetControlBinding("#txtValidIDSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseValidID");
            SFObject.SetControlBinding("#txtDateIssuedSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseDateIssued");
            SFObject.SetControlBinding("#txtPlaceIssuedSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpousePlaceIssued");
            SFObject.SetControlBinding("#txtContactPersonSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseContactPerson");
            SFObject.SetControlBinding("#txtContactPersonNumSP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseContactPersonNumber");

            
            //Employment Info
            SFObject.SetControlBinding("#cmbEmpSubTypeEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmploymentSubType");
            //SFObject.SetControlBinding("#cmbEmpAreaEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmploymentArea");
            SFObject.SetControlBinding("#cmbEmpStatusEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmploymentStatus");
            SFObject.SetControlBinding("#txtProfessionEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Profession");
            SFObject.SetControlBinding("#txtDepartmentEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpDepartment");
            SFObject.SetControlBinding("#txtDesignationEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpDesignation");
            SFObject.SetControlBinding("#cmbNatureOfBusinessEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpNatureOfBusiness");
            SFObject.SetControlBinding("#txtEmployerNameEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpName");
            SFObject.SetControlBinding("#txtEmployerAddressEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpAddress");
            SFObject.SetControlBinding("#txtEmployerContactEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpBusinessContact");
            SFObject.SetControlBinding("#cmbPersonalIncomeEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PersonalIncome");
            SFObject.SetControlBinding("#cmbHouseholdIncomeEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "HouseholdIncome");
            SFObject.SetControlBinding("#txtPositionEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpPosition");

            //added
            SFObject.SetControlBinding("#txtPositionEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpPosition");
            SFObject.SetControlBinding("#txtNoYrsAbroad", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpNoOfYearsAbroad");
            SFObject.SetControlBinding("#txtCurrContractEndEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpCurrentContractEnds");
            SFObject.SetControlBinding("#cmbEmpInfoOccupation", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpOccupationInfo");
            SFObject.SetControlBinding("#txtEmpInfoZip", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpInfoZip");
            SFObject.SetControlBinding("#cmbSrcOfIncomeEMP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmpSourceOfIncome");


            //Spouse Employment Info
            SFObject.SetControlBinding("#cmbEmpSubTypeSPS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseEmploymentSubType");
            //SFObject.SetControlBinding("#cmbEmpAreaSPS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseEmploymentArea");
            SFObject.SetControlBinding("#cmbEmpStatusSPS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseEmploymentStatus");
            SFObject.SetControlBinding("#txtProfessionSPS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseProfession");
            SFObject.SetControlBinding("#txtDepartmentSPS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseDepartment");
            SFObject.SetControlBinding("#txtDesignationSPS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseDesignation");
            SFObject.SetControlBinding("#cmbNatureOfBusinessSPS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseNatureOfBusiness");
            SFObject.SetControlBinding("#txtEmployerNameSPS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseName");
            SFObject.SetControlBinding("#txtEmployerAddressSPS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseAddress");
            SFObject.SetControlBinding("#txtEmployerContactSPS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseBusinessContact");
            SFObject.SetControlBinding("#cmbPersonalIncomeSPS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpousePersonalIncome");
            SFObject.SetControlBinding("#cmbHouseholdIncomeSPS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseHouseholdIncome");

            //added
            SFObject.SetControlBinding("#txtPositionSps", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpousePosition");
            SFObject.SetControlBinding("#txtNoYrsAbroadSps", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseNoOfYearsAbroad");
            SFObject.SetControlBinding("#txtContractEndSpS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseCurrentContractEnds");
            SFObject.SetControlBinding("#cmbInfoOccupationSps", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseOccupationInfo");
            SFObject.SetControlBinding("#txtInfoZipSps", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseInfoZip");
            SFObject.SetControlBinding("#cmbSrcOfIncomeSps", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpouseSourceOfIncome");

            //Co Owner Employment Info
            SFObject.SetControlBinding("#cmbEmpSubTypeCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "COEmploymentSubType");
            //SFObject.SetControlBinding("#cmbEmpAreaCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "COEmploymentArea");
            SFObject.SetControlBinding("#cmbEmpStatusCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "COEmploymentStatus");
            SFObject.SetControlBinding("#txtProfessionCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "COProfession");
            SFObject.SetControlBinding("#txtDepartmentCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CODepartment");
            SFObject.SetControlBinding("#txtDesignationCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CODesignation");
            SFObject.SetControlBinding("#cmbNatureOfBusinessCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CONatureOfBusiness");
            SFObject.SetControlBinding("#txtEmployerNameCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "COEmpName");
            SFObject.SetControlBinding("#txtEmployerAddressCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "COEmpAddress");
            SFObject.SetControlBinding("#txtEmployerContactCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "COBusinessContact");
            SFObject.SetControlBinding("#cmbPersonalIncomeCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "COPersonalIncome");
            SFObject.SetControlBinding("#cmbHouseholdIncomeCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "COHouseholdIncome");

            //added
            SFObject.SetControlBinding("#txtPositionCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "COPosition");
            SFObject.SetControlBinding("#txtNoYrsAbroadCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CONoOfYearsAbroad");
            SFObject.SetControlBinding("#txtContractEndCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "COCurrentContractEnds");
            SFObject.SetControlBinding("#cmbInfoOccupationCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "COOccupationInfo");
            SFObject.SetControlBinding("#txtInfoZipCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "COInfoZip");
            SFObject.SetControlBinding("#cmbSrcOfIncomeCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "COSourceOfIncome");


            //Coowner Info
            SFObject.SetControlBinding("#txtLastNameCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerLastName");
            SFObject.SetControlBinding("#txtFirstNameCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerFirstName");
            SFObject.SetControlBinding("#txtMiddleNameCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerMiddleName");
            SFObject.SetControlBinding("#txtmriCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerMI");
            SFObject.SetControlBinding("#cmbSuffixCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerSuffix");
            SFObject.SetControlBinding("#cmbRelationshipCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerRelationship");
            SFObject.SetControlBinding("#cmbGenderCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerGender");
            SFObject.SetControlBinding("#txtBdayCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerBirthday");
            SFObject.SetControlBinding("#txtAgeCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerAge");
            SFObject.SetControlBinding("#txtPlaceBirthCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerPlaceOfBirth");
            SFObject.SetControlBinding("#cmbCivilStatusCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerCivilStatus");
            SFObject.SetControlBinding("#cmbNationalityCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerNationality");
            SFObject.SetControlBinding("#txtTINCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerTIN");
            SFObject.SetControlBinding("#txtResidentialAddressCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerPresentAddress");
            SFObject.SetControlBinding("#txtLandlineNoCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerLandline");
            //SFObject.SetControlBinding("#txtLocalNoCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerLocal");
            SFObject.SetControlBinding("#txtMobileNoCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerMobile");
            SFObject.SetControlBinding("#txtEmailCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerEmail");
            SFObject.SetControlBinding("#txtEmployerNameCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerEmployerName");
            SFObject.SetControlBinding("#txtEmployerAddressCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerEmployerAddress");
            SFObject.SetControlBinding("#txtEmployerContactCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerEmployerContact");
            SFObject.SetControlBinding("#txtRowID", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerRowID");
            //SFObject.SetControlBinding("#txtPositionCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerPosition");
            SFObject.SetControlBinding("#cmbHomeOwnCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerHomeOwnership");
            SFObject.SetControlBinding("#txtFullAddressCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerFullLocationAddress");
            SFObject.SetControlBinding("#txtMailAddressCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerMailAddress");
            SFObject.SetControlBinding("#cmbMunicipalityCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerMunicipality");
            SFObject.SetControlBinding("#cmbProvinceCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerProvince");
            SFObject.SetControlBinding("#txtRegionCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerRegionDesc");
            SFObject.SetControlBinding("#cmbBarangayCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerBarangay");

            
            SFObject.SetControlBinding("#txtZipCodeCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerZipCode");
            SFObject.SetControlBinding("#txtCountryCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerCountryDesc");

            
            


            //added
            SFObject.SetControlBinding("#cmbLocTypeCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerLocationType");
            SFObject.SetControlBinding("#txtContactPersonCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerContactPersonCO");
            SFObject.SetControlBinding("#txtContactPersonNumCO", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoownerContactPersonNumCO");

            
            

            //Coowner Spouse
            SFObject.SetControlBinding("#txtspouseID", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseID");
            SFObject.SetControlBinding("#txtLastNameCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseLastName");
            SFObject.SetControlBinding("#txtFirstNameCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseFirstName");
            SFObject.SetControlBinding("#txtMiddleNameCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseMiddleName");
            SFObject.SetControlBinding("#txtmriCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseMI");
            SFObject.SetControlBinding("#cmbSuffixCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseSuffix");
            SFObject.SetControlBinding("#cmbSalutationCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseSalutation");
            SFObject.SetControlBinding("#txtGenderCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseGender");
            SFObject.SetControlBinding("#txtMothersMaidenCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseMothersMaidenName");
            SFObject.SetControlBinding("#txtBdayCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseBirthday");
            SFObject.SetControlBinding("#txtAgeCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseAge");
            SFObject.SetControlBinding("#txtTINCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseTIN");
            SFObject.SetControlBinding("#txtDateMarriageCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseDateOfMarriage");
            SFObject.SetControlBinding("#cmbNationalityCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseNationality");
            SFObject.SetControlBinding("#cmbOccupationCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseOccupation");
            SFObject.SetControlBinding("#txtCompanyCOS", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CSpouseCompany");

            //Corporate
            SFObject.SetControlBinding("#chkRepresentativeCB", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "withAtty");
            SFObject.SetControlBinding("#cbVATCB", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "CorpVatRegTypeVAT");
            SFObject.SetControlBinding("#cbNVatCB", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "CorpVatRegTypeNONVAT");
            SFObject.SetControlBinding("#chkFullAddressCB", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "isFullLocation");
            SFObject.SetControlBinding("#txtRegNameCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RegisteredName");
            SFObject.SetControlBinding("#txtTradeNameCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TradeName");
            SFObject.SetControlBinding("#txtVatRegTinCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "VatREGTin");
            SFObject.SetControlBinding("#txtNonVatRegTinCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "NonVatRegTin");
            SFObject.SetControlBinding("#txtLandlineNoCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LandlineNo");
            SFObject.SetControlBinding("#txtLocalNoCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LocalNo");
            SFObject.SetControlBinding("#txtMobileNoCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MobileNo");
            SFObject.SetControlBinding("#txtEmailCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "EmailAdd");
            SFObject.SetControlBinding("#txtFullAddressCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "FullLocationAddress");
            SFObject.SetControlBinding("#cmbProvinceCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Province");
            SFObject.SetControlBinding("#txtMunicipalityCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Municipality");
            SFObject.SetControlBinding("#txtBarangayCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Barangay");
            SFObject.SetControlBinding("#txtZipCodeCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ZipCode");
            SFObject.SetControlBinding("#txtRegionCodeCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RegionCode");
            SFObject.SetControlBinding("#txtCountryCodeCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CountryCode");
            SFObject.SetControlBinding("#txtRegionCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RegionDesc");
            SFObject.SetControlBinding("#txtCountryCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CountryDesc");
            SFObject.SetControlBinding("#cmbNatureOfBusinessCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "NatureOfBusiness");
            SFObject.SetControlBinding("#cmbBusinessTypeCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "BusinessType");
            //addedd
            SFObject.SetControlBinding("#txtComTaxCertCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ComTaxCertCB");
            SFObject.SetControlBinding("#txtPlaceIssuedCB", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PlaceIssued");



            //Attorney in-fact
            SFObject.SetControlBinding("#txtLastNameAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyLastName");
            SFObject.SetControlBinding("#txtFirstNameAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyFirstName");
            SFObject.SetControlBinding("#txtMiddleNameAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyMiddleName");
            SFObject.SetControlBinding("#txtmriAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyMI");
            SFObject.SetControlBinding("#cmbSuffixAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttySuffix");
            SFObject.SetControlBinding("#txtEffectiveDateFromAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyEffectiveDateFrom");
            SFObject.SetControlBinding("#txtEffectiveDateToAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyEffectiveDateTo");
            SFObject.SetControlBinding("#cmbRelationshipAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyRelationship");
            SFObject.SetControlBinding("#cmbGenderAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyGender");
            SFObject.SetControlBinding("#txtBdayAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyBirthday");
            SFObject.SetControlBinding("#txtAgeAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyAge");
            SFObject.SetControlBinding("#txtTINAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyTIN");
            SFObject.SetControlBinding("#cmbNationalityAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyNationality");
            SFObject.SetControlBinding("#txtHomeAddressAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyHomeAddress");
            SFObject.SetControlBinding("#txtBusinessAddressAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyBusinessAddress");
            SFObject.SetControlBinding("#txtLandlineNoAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyLandline");
            //SFObject.SetControlBinding("#txtLocalNoAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyLocal");
            SFObject.SetControlBinding("#txtMobileNoAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyMobile");
            SFObject.SetControlBinding("#txtEmailAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyEmail");
            SFObject.SetControlBinding("#cmbCivilStatusAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyCivilStatus");

            //added
            SFObject.SetControlBinding("#txtValidIDAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyValidID");
            SFObject.SetControlBinding("#txtDateIssuedAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyDateIssued");
            SFObject.SetControlBinding("#txtPlaceIssuedAF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AttyPlaceIssued");


           

            //Preference Info
            SFObject.SetControlBinding("#cmbReasonForBuyingPI", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PrefReasonForBuying");
            SFObject.SetControlBinding("#txtOthersReasonPI", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PrefReasonForBuyingOthers");
            SFObject.SetControlBinding("#txtDesiredPropertyPI", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PrefDesiredProperty");
            SFObject.SetControlBinding("#txtOthersDesiredPI", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PrefDesiredPropertyOthers");
            SFObject.SetControlBinding("#cmbSourceOfAwarenessPI", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PrefSourceOfAwareness");
            SFObject.SetControlBinding("#txtOthersSourceOfAwarenessPI", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PrefSourceOfAwarenessOthers");
            SFObject.SetControlBinding("#cmbPriceRangePI", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PrefPriceRange");
            SFObject.SetControlBinding("#cbYes", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "PrefYes");
            SFObject.SetControlBinding("#cbNo", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "PrefNo");
            SFObject.SetControlBinding("#txtNamePI", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PrefName");
            SFObject.SetControlBinding("#txtMobileNoPI", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PrefMobileNo");
            SFObject.SetControlBinding("#txtEmailPI", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PrefEmail");

            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");



            //SFObject.SetControlBinding("#employee-code-hidden", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "code"); //JEA 1-17-2017 //TEMPORARY
        }
        private void BindCollection()
        {
           SetDefaultMunicipalityBarangay();
           SetDefaultMunicipalityBarangayCO();
           setCustomerImage();
        
            string nwCustno = "";
            if (HttpContext.Current != null)
            {
                var request = HttpContext.Current.Request;
                nwCustno = request.QueryString["nwCustno"];
            }
            if (nwCustno != "")
            {
                nwToolBox.bindingNavigatorAddNewItem.Enable = false;
                nwToolBox.bindingNavigatorProcessItem.Enable = false;
                nwToolBox.bindingNavigatorInquireItem.Enable = false;
                nwToolBox.bindingNavigatorRefreshItem.Enable = false;
            }
            else
            {
                nwToolBox.bindingNavigatorAddNewItem.Enable = true;
                nwToolBox.bindingNavigatorProcessItem.Enable = true;
                nwToolBox.bindingNavigatorInquireItem.Enable = true;
                nwToolBox.bindingNavigatorRefreshItem.Enable = true;
            }

            js.ADD("$('#noah-webui-Toolbox').bindingProcess().visible(true);");

            int status = dal.getStatus(WebApp.nwobjectText("txtCode"));
            js.ADD("func_CustType()");
            js.ADD("$('.li-Shortcut').enable(true);");
            if (status == 3 || status == 4)
            {
                js.ADD("DisableFields()");
                nwToolBox.bindingNavigatorSaveItem.Enable = false;
                nwToolBox.bindingNavigatorProcessItem.Enable = false;
                nwToolBox.bindingNavigatorInquireItem.Enable = true;
                nwToolBox.bindingNavigatorExportItem.Enable = true;
                nwToolBox.bindingNavigatorDeleteItem.Enable = false;
                nwToolBox.bindingNavigatorPrintItem.Enable = true;
                if (nwCustno != "")
                    nwToolBox.bindingNavigatorInquireItem.Enable = false;
                string isAllowed = dal.getUpdateAccess(based.SecurityAccess.RecUser);
                if (isAllowed != "")
                    js.Enable("#btnupdate", true);
                else
                    js.Enable("#btnupdate", false);
            }
            else
            {
                nwToolBox.bindingNavigatorSaveItem.Enable = true;
                nwToolBox.bindingNavigatorProcessItem.Enable = true;
                nwToolBox.bindingNavigatorPrintItem.Enable = false;
                js.Enable("#btnupdate", false);
                js.ADD("EnableFields()");
                js.ADD("$('.fsMain').enable(false);");
            }
            //
            js.ADD("func_disableVatRegType()");

            js.ADD("cust_GetPara();");



            //if (WebApp.nwobjectText("txtCode") != "")
            //{
            //    DataTable CurrBnk = dtGridLin();
            //    CreateGrid(false, CurrBnk);

            //    DataTable dt2 = dtGridLin2();
            //    CreateGrid2(false, dt2);
            //}
            //else
            //{
            //    CreateGrid(true, InitializeGrid());
            //    CreateGrid2(true, InitializeGrid());

            //}

            string isindv = WebApp.nwobjectText("Individual");
            string iscomp = WebApp.nwobjectText("Company");

            if(isindv == "true")
            {
                js.ADD("ChangeCivilStatus('cmbCivilStatus');");
                js.ADD("ChangeCivilStatus('cmbCivilStatusCO');");
                js.ADD("CheckIfFullAddress('chkFullAddress',false);");
            }
            if(iscomp == "true")
            {
                js.ADD("CheckIfFullAddress('chkFullAddressCO',false);");
                js.ADD("func_VatRegType();");
            }
            js.ADD("CheckIfWithCoowner();");
            js.ADD("CheckIfWithRepresentative();");
            js.ADD("$('#btnAddCoowner,#btnViewCoowner').enable(true);");
            js.ADD("RefreshData();");
            js.ADD("nwLoading_End('actBindCollection');");

            js.ADD("CheckIfOthers('cmbReasonForBuyingPI');");
            js.ADD("CheckIfOthers('txtDesiredPropertyPI');");
            js.ADD("CheckIfOthers('cmbSourceOfAwarenessPI');");

            //Check coowner count
            DataTable dt = dal.GetCoownerDetails(WebApp.nwobjectText("txtCode"));
            if(dt.Rows.Count > 1)
            {
                js.ADD("$('#btnViewCoowner').enable(true);");
            }
            else
            {
                js.ADD("$('#btnViewCoowner').enable(false);");
            }

            if(WebApp.nwobjectBool("cbYes") == true)
                js.ADD("func_ChangeRecommendation('Y',false)");
            else
                js.ADD("func_ChangeRecommendation('N',false)");


            setRqmtCompProp();

            //string CustomerCode = WebApp.nwobjectText("txtCode");




        }

        public void SetDefaultMunicipalityBarangay()
        {
            string bid = "", mid = "", bval = "", mval = "";
            if (WebApp.nwobjectText("Individual") == "true")
            {
                bid = "#cmbBarangay";
                mid = "#cmbMunicipality";
                bval = WebApp.nwobjectText("cmbBarangay");
                mval = WebApp.nwobjectText("cmbMunicipality");
            }
            if (WebApp.nwobjectText("Company") == "true")
            {
                bid = "#cmbBarangayCB";
                mid = "#cmbMunicipalityCB";
                bval = WebApp.nwobjectText("cmbBarangay");
                mval = WebApp.nwobjectText("cmbMunicipality");
            }
            LoadCombosSpecial(12, mid, mval, "all", WebApp.nwobjectText("txtCode"));
            LoadCombosSpecial(13, bid, bval, "all", WebApp.nwobjectText("txtCode"));
        }

        public void SetDefaultMunicipalityBarangayCO()
        {
            string bid = "", mid = "", bval = "", mval = "";
            if (WebApp.nwobjectText("Individual") == "true")
            {
                bid = "#cmbBarangayCO";
                mid = "#cmbMunicipalityCO";
                bval = WebApp.nwobjectText("cmbBarangayCO");
                mval = WebApp.nwobjectText("cmbMunicipalityCO");
            }

            LoadCombosSpecialCO(12, mid, mval, "coOwn", WebApp.nwobjectText("txtCode"));
            LoadCombosSpecialCO(13, bid, bval, "coOwn", WebApp.nwobjectText("txtCode"));
        }
        private void setCustomerImage()
        {
            string custCode = WebApp.nwobjectText("txtCode");
            //string jquery = "recuser = encodeURIComponent(\"" + based.SecurityAccess.RecUser + "\");$('#profile-img').css(\"background-image\",\"url('SellerImage.ashx?sellerCode=" + sellerCode + "&recuser=\"+recuser+\"&uploadTrigger=0&r=" + Guid.NewGuid().ToString().Replace("-", string.Empty) + "')\");";
            //string signature = "recuser = encodeURIComponent(\"" + based.SecurityAccess.RecUser + "\");$('#profile-img-signature').css(\"background-image\",\"url('SellerImage.ashx?sellerCode=" + sellerCode + "&recuser=\"+recuser+\"&uploadTrigger=1&r=" + Guid.NewGuid().ToString().Replace("-", string.Empty) + "')\");";
            ////string jquery = "recuser = encodeURIComponent(\"" + based.SecurityAccess.RecUser + "\");$('#profile-img').css(\"background-image\",\"url('SellerImage.ashx?sellerCode=" + sellerCode + "&recuser=\"+recuser+\"&r=" + Guid.NewGuid().ToString().Replace("-", string.Empty) + "')\");";
            //js.ADD(jquery);
            //js.ADD(signature);
            //LAM
            string imagepath = dal.getCustomerImagePath(custCode).Replace("\\", "//");
            string signaturePath = dal.getCustomerSignaturePath(custCode).Replace("\\", "//");
            js.ADD($"func_setCustomerImage('"+ imagepath + "')");
            js.ADD($"func_setCustomerSignImage('" + signaturePath + "')");
        }


        private string ValidateData(int tag,bool isNew)
        {
            js.ADD("cust_GetPara();");
            bool validateindividual = WebApp.nwobjectBool("cbIndividual");
            bool validatecompany = WebApp.nwobjectBool("cbCompany");
            bool validatevip = WebApp.nwobjectBool("cbVIP");
            bool validatecoowner = WebApp.nwobjectBool("chkCoowner");
            bool validateatty = WebApp.nwobjectBool("chkRepresentativeCB");

            string errorResult = string.Empty;

            string refCode = WebApp.nwobjectText("txtCodeCrossReference");
            string tin = WebApp.nwobjectText("txtTIN");
            string bday = WebApp.nwobjectText("txtBday");
            int isExisting = dal.ifExisting(refCode, tin, bday);

            if (validateindividual == false && validatecompany == false)
                validateindividual = true;

            if (!string.IsNullOrWhiteSpace(refCode))
            {
                if (isNewRow && isExisting == 1)
                {
                    errorResult += "Cannot be saved. Duplicate records are not allowed. \n Cross Reference Code is already existing.\n";
                }
            }

            string nationality = WebApp.nwobjectText("cmbNationality");

            if ((validatevip == true) && (WebApp.nwobjectText("cmbVIPType") == ""))
            {
                errorResult += "Cannot be saved. VIP Type is required.\n";
            }

            if (WebApp.nwobjectText("cmbCustClass").Length <= 0)
            {
                errorResult += "Cannot be saved. Customer Classification is required.\n";
            }
            if (validateindividual == true)
            {
                //if(WebApp.nwobjectText("txtTIN") != "" && isNew == true)
                //{
                //    string isExistInd = dal.validateAcctInd(WebApp.nwobjectText("txtTIN"));
                //    if (isExistInd != "")
                //        errorResult += "Cannot be saved. Record is already existing.\n";
                //}
                if (WebApp.nwobjectText("txtLastName").Length <= 0)
                    errorResult += "Cannot be saved. Last Name is required in Individual Buyer.\n";
                if (WebApp.nwobjectText("txtFirstName").Length <= 0)
                    errorResult += "Cannot be saved. First Name is required in Individual Buyer.\n";
                if (WebApp.nwobjectText("cmbSalutation").Length <= 0)
                    errorResult += "Cannot be saved. Salutation is required in Individual Buyer.\n";
                if (WebApp.nwobjectText("cmbGender").Length <= 0)
                    errorResult += "Cannot be saved. Gender is required in Individual Buyer.\n";
                if (WebApp.nwobjectText("txtBday").Length <= 0)
                    errorResult += "Cannot be saved. Date of Birth is required in Individual Buyer.\n";
                if (WebApp.nwobjectText("cmbCivilStatus").Length <= 0)
                    errorResult += "Cannot be saved. Civil status is required in Individual Buyer.\n";
                if (WebApp.nwobjectText("cmbNationality").Length <= 0)
                    errorResult += "Cannot be saved. Nationality is required in Individual Buyer.\n";
                if (WebApp.nwobjectText("txtMobileNo").Length <= 0)
                    errorResult += "Cannot be saved. Mobile No. is required in Individual Buyer.\n";
                if (WebApp.nwobjectText("txtEmail").Length <= 0)
                    errorResult += "Cannot be saved. Email Address is required in Individual Buyer.\n";
                //if (WebApp.nwobjectText("txtTIN").Length <= 0)
                //    errorResult += "Cannot be saved. Individual TIN is required in Individual Buyer.\n";
                //else
                //{
                string validateTIN = dal.validateTIN(WebApp.nwobjectText("txtCode"), WebApp.nwobjectText("txtTIN"));
                if (validateTIN == "1" && WebApp.nwobjectText("txtTIN") != "")
                    errorResult += "Cannot be saved. Individual TIN in Individual Buyer already exists.\n";
                //}
                if (WebApp.nwobjectText("cmbHomeOwn").Length <= 0)
                    errorResult += "Cannot be saved. Home Ownership is required in Individual Buyer.\n";

                string csmain = WebApp.nwobjectText("cmbCivilStatus");
                if(csmain == "02")//Maried
                {
                    if (WebApp.nwobjectText("txtLastNameSP").Length <= 0)
                        errorResult += "Cannot be saved. Last Name is required in Spouse Information.\n";
                    if (WebApp.nwobjectText("txtFirstNameSP").Length <= 0)
                        errorResult += "Cannot be saved. First Name is required in Spouse Information.\n";
                    if (WebApp.nwobjectText("cmbSalutationSP").Length <= 0)
                        errorResult += "Cannot be saved. Salutation is required in Spouse Information.\n";
                    //if (WebApp.nwobjectText("txtBdaySP").Length <= 0)
                    //    errorResult += "Cannot be saved. Date of Birth is required in Spouse Information.\n";
                    //if (WebApp.nwobjectText("txtTINSP").Length <= 0)
                    //    errorResult += "Cannot be saved. TIN is required in Spouse Information.\n";
                    validateTIN = dal.validateTIN(WebApp.nwobjectText("txtCode"), WebApp.nwobjectText("txtTINSP"));
                    if (validateTIN == "1" && WebApp.nwobjectText("txtTINSP") != "")
                        errorResult += "Cannot be saved. Individual TIN in Spouse Information already exists.\n";
                    if (WebApp.nwobjectText("cmbNationalitySP").Length <= 0)
                        errorResult += "Cannot be saved. Nationality is required in Spouse Information.\n";
                }
                //Employment Information
                if (WebApp.nwobjectText("cmbEmpSubTypeEMP").Length <= 0)
                        errorResult += "Cannot be saved. Employment Sub Type is required in Employment Information.\n";
                if (WebApp.nwobjectText("txtEmployerNameEMP").Length <= 0)
                    errorResult += "Cannot be saved. Employer/Business Name is required in Employment Information.\n";
                if (WebApp.nwobjectText("txtPositionEMP").Length <= 0)
                    errorResult += "Cannot be saved. Position is required in Employment Information.\n";

                if (validatecoowner == true)//Coowner
                {
                    if (WebApp.nwobjectText("txtLastNameCO").Length <= 0)
                        errorResult += "Cannot be saved. Last Name is required in Co-Owner Information.\n";
                    if (WebApp.nwobjectText("txtFirstNameCO").Length <= 0)
                        errorResult += "Cannot be saved. First Name is required in Co-Owner Information.\n";
                    if (WebApp.nwobjectText("cmbRelationshipCO").Length <= 0)
                        errorResult += "Cannot be saved. Relationship to the Customer is required in Co-Owner Information.\n";
                    if (WebApp.nwobjectText("cmbGenderCO").Length <= 0)
                        errorResult += "Cannot be saved. Gender is required in Co-Owner Information.\n";


              
                    if (WebApp.nwobjectText("coOwnerBday").Length <= 0)
                        errorResult += "Cannot be saved. Date of Birth is required in Co-Owner Information.\n";
              
                    if (WebApp.nwobjectText("cmbCivilStatusCO").Length <= 0)
                        errorResult += "Cannot be saved. Civil status is required in Co-Owner Information.\n";
                    if (WebApp.nwobjectText("cmbNationalityCO").Length <= 0)
                        errorResult += "Cannot be saved. Nationality is required in Co-Owner Information.\n";
                    //if (WebApp.nwobjectText("txtTINCO").Length <= 0)
                    //    errorResult += "Cannot be saved. TIN is required in Co-Owner Information.\n";
                    validateTIN = dal.validateTIN(WebApp.nwobjectText("txtCode"), WebApp.nwobjectText("txtTINCO"));
                    if (validateTIN == "1" && WebApp.nwobjectText("txtTINCO") != "")
                        errorResult += "Cannot be saved. Individual TIN in Co-Owner Information already exists.\n";
                }
                string csco = WebApp.nwobjectText("cmbCivilStatusCO");
                if (csco == "02")//Maried (co-owner spouse)
                {
                    if (WebApp.nwobjectText("txtLastNameCOS").Length <= 0)
                        errorResult += "Cannot be saved. Last Name is required in Co-Owner Spouse Information.\n";
                    if (WebApp.nwobjectText("txtFirstNameCOS").Length <= 0)
                        errorResult += "Cannot be saved. First Name is required in Co-Owner Spouse Information.\n";
                    if (WebApp.nwobjectText("cmbSalutationCOS").Length <= 0)
                        errorResult += "Cannot be saved. Salutation is required in Co-Owner Spouse Information.\n";
                    //if (WebApp.nwobjectText("txtBdayCOS").Length <= 0)
                    //    errorResult += "Cannot be saved. Date of Birth is required in Co-Owner Spouse Information.\n";
                    //if (WebApp.nwobjectText("txtTINCOS").Length <= 0)
                    //    errorResult += "Cannot be saved. TIN is required in Co-Owner Spouse Information.\n";
                    validateTIN = dal.validateTIN(WebApp.nwobjectText("txtCode"), WebApp.nwobjectText("txtTINCOS"));
                    if (validateTIN == "1" && WebApp.nwobjectText("txtTINCOS") != "")
                        errorResult += "Cannot be saved. Individual TIN in Co-Owner Spouse Information already exists.\n";
                    //if (WebApp.nwobjectText("cmbNationalityCOS").Length <= 0)
                    //    errorResult += "Cannot be saved. Nationality is required in Co-Owner Spouse Information.\n";
                }
            }
            else if (validatecompany == true)
            {
                if (WebApp.nwobjectText("txtRegNameCB").Length <= 0)
                    errorResult += "Cannot be saved. Registered Name is required in Corporate Buyer.\n";
                if (WebApp.nwobjectText("txtTradeNameCB").Length <= 0)
                    errorResult += "Cannot be saved. Trade Name is required in Corporate Buyer.\n";
                if (WebApp.nwobjectBool("cbVATCB") == false && WebApp.nwobjectBool("cbNVatCB") == false)
                    errorResult += "Cannot be saved. Corporate VAT Registration Type is required in Corporate Buyer.\n";
                else
                {
                    string vatval = "";

                    bool vattype = WebApp.nwobjectBool("cbVATCB");
                    if (vattype == true)
                    {
                        vatval = WebApp.nwobjectText("txtVatRegTinCB");
                        if (WebApp.nwobjectText("txtVatRegTinCB") == "")
                            errorResult += "Cannot be saved. Please provide VAT Reg. TIN.\n";
                    }

                    else
                    {
                        vatval = WebApp.nwobjectText("txtNonVatRegTinCB");
                        if (WebApp.nwobjectText("txtNonVatRegTinCB") == "")
                            errorResult += "Cannot be saved. Please provide Non-VAT Reg. TIN.\n";
                    }
                    if (isNew == true && vatval != "")
                    {
                        string isExistCorp = dal.validateAcctCorp(vatval);
                        if (isExistCorp != "")
                            errorResult += "Cannot be saved. Record is already existing.\n";
                    }
                }
                //if (WebApp.nwobjectText("cmbHomeOwnCB").Length <= 0)
                //    errorResult += "Cannot be saved. Home Ownership is required in Corporate Buyer.\n";
                //if (WebApp.nwobjectText("cmbLocTypeCB").Length <= 0)
                //    errorResult += "Cannot be saved. Location Type is required in Corporate Buyer.\n";

                if(validateatty == true) // atty in fact
                {
                    if (WebApp.nwobjectText("txtLastNameAF").Length <= 0)
                        errorResult += "Cannot be saved. Last Name is required in Attorney-In-Fact Information.\n";
                    if (WebApp.nwobjectText("txtFirstNameAF").Length <= 0)
                        errorResult += "Cannot be saved. First Name is required in Attorney-In-Fact Information.\n";
                    if (WebApp.nwobjectText("txtEffectiveDateToAF").Length <= 0)
                        errorResult += "Cannot be saved. Effective Date To is required in Attorney-In-Fact Information.\n";
                    if (WebApp.nwobjectText("cmbRelationshipAF").Length <= 0)
                        errorResult += "Cannot be saved. Relationship to the Customer is required in Attorney-In-Fact Information.\n";
                    if (WebApp.nwobjectText("cmbGenderAF").Length <= 0)
                        errorResult += "Cannot be saved. Gender is required in Attorney-In-Fact Information.\n";
                    if (WebApp.nwobjectText("cmbCivilStatusAF").Length <= 0)
                        errorResult += "Cannot be saved. Civil Status is required in Attorney-In-Fact Information.\n";
                    if (WebApp.nwobjectText("cmbNationalityAF").Length <= 0)
                        errorResult += "Cannot be saved. Nationality is required in Attorney-In-Fact Information.\n";
                    string validateTIN = dal.validateTIN(WebApp.nwobjectText("txtCode"), WebApp.nwobjectText("txtTINAF"));
                    if (validateTIN == "1" && WebApp.nwobjectText("txtTINAF") != "")
                        errorResult += "Cannot be saved. Individual TIN in Attorney-In-Fact Information already exists.\n";
                }
            }

            //Pereference Info
            //if (WebApp.nwobjectText("cmbReasonForBuyingPI").Length <= 0)
            //    errorResult += "Cannot be saved. Reason for Buying is required in Preference Information.\n";
            //if (WebApp.nwobjectText("cmbSourceOfAwarenessPI").Length <= 0)
            //    errorResult += "Cannot be saved. Source of Awareness is required in Preference Information.\n";
            //if (WebApp.nwobjectBool("cbYes") == true)
            //{
            //    if (WebApp.nwobjectText("txtNamePI").Length <= 0)
            //        errorResult += "Cannot be saved. Name is required in Preference Information.\n";
            //    if (WebApp.nwobjectText("txtMobileNoPI").Length <= 0)
            //        errorResult += "Cannot be saved. Mobile No. is required in Preference Information.\n";
            //    if (WebApp.nwobjectText("txtEmailPI").Length <= 0)
            //        errorResult += "Cannot be saved. Email Address is required in Preference Information.\n";
            //}

            //else
            //{
            //    errorResult += "Cannot be saved. Customer Type is Required. \n";
            //}

            return errorResult;
        }


        public DataSet LoadSchema()
        {
            js.ADD("cust_GetPara();");
            DataSet ds= dal.LoadSchema();
            DataTable dt = new DataTable();
            //DataTable dtBankAccount = new DataTable();
            DataSet ds1 = WebApp.DataSet("nwGridMainCon");
            //DataTable dtSpouseBankAccount = new DataTable();
            DataSet ds2 = WebApp.DataSet("nwGridMainCon2");
            DataTable dtBankAccount = new DataTable();
            DataTable dtSpouseBankAccount = new DataTable();
            dtBankAccount = ds1.Tables[0];
            dtSpouseBankAccount = ds2.Tables[0];


            for (int i = 0; i < ds.Tables.Count; i++)
            {
                dt = ds.Tables[i];
                DataRow dr = dt.NewRow();
                switch (i)
                {
                    case 0://Main
                        dr["CustomerTypeInd"] = WebApp.nwobjectBool("Individual") == true ? 1 : 0;
                        dr["CustomerTypeComp"] = WebApp.nwobjectBool("Company") == true ? 1 : 0;
                        dr["VIP"] = WebApp.nwobjectBool("cbVIP") == true ? 1 : 0;
                        dr["isNewInquiry"] = WebApp.nwobjectBool("cbNewInquiry") == true ? 1 : 0;
                        dr["isNewReservation"] = WebApp.nwobjectBool("cbNewReservation") == true ? 1 : 0;
                        dr["isTransfer"] = WebApp.nwobjectBool("cbTransfer") == true ? 1 : 0;
                        dr["CustomerCode"] = WebApp.nwobjectText("txtCode");
                        dr["CustomerCodeCrossReference"] = WebApp.nwobjectText("txtCodeCrossReference");
                        dr["Salutation"] = WebApp.nwobjectText("cmbSalutation");
                        dr["LastName"] = WebApp.nwobjectText("txtLastName");
                        dr["FirstName"] = WebApp.nwobjectText("txtFirstName");
                        dr["MiddleName"] = WebApp.nwobjectText("txtMiddleName");
                        dr["MI"] = WebApp.nwobjectText("txtmri");
                        dr["MothersMaidenName"] = WebApp.nwobjectText("txtMothersMaiden");
                        dr["nameSuffix"] = WebApp.nwobjectText("cmbSuffix");
                        dr["Birthday"] = WebApp.nwobjectDate("txtBday");
                        dr["PlaceofBirth"] = WebApp.nwobjectText("txtPlaceBirth");
                        dr["Gender"] = WebApp.nwobjectText("cmbGender");
                        dr["CivilStatus"] = WebApp.nwobjectText("cmbCivilStatus");
                        dr["Nationality"] = WebApp.nwobjectText("cmbNationality") == "undefined" ? "": WebApp.nwobjectText("cmbNationality");
                        dr["Occupation"] = WebApp.nwobjectText("cmbOccupation") == "undefined" ? "" : WebApp.nwobjectText("cmbOccupation");
                        dr["TIN"] = WebApp.nwobjectText("txtTIN") == "undefined" ? "" : WebApp.nwobjectText("txtTIN");
                        dr["PreferredPaymentOption"] = WebApp.nwobjectText("cmbPaymentOption") == "undefined" ? "" : WebApp.nwobjectText("cmbPaymentOption");
                        dr["RegisteredName"] = WebApp.nwobjectText("txtRegName") == "" ? WebApp.nwobjectText("txtRegNameCB"):WebApp.nwobjectText("txtRegName");
                        dr["TradeName"] = WebApp.nwobjectText("txtTradeNameCB") == "" ? WebApp.nwobjectText("txtTradeNameCB") : WebApp.nwobjectText("txtTradeName");
                        dr["CorpVatRegTypeVAT"] = WebApp.nwobjectBool("cbVATCB") == true ? 1 : 0;
                        dr["CorpVatRegTypeNONVAT"] = WebApp.nwobjectBool("cbNVatCB") == true ? 1 : 0;
                        dr["VatREGTin"] = WebApp.nwobjectText("txtVatRegTinCB");
                        dr["NonVatRegTin"] = WebApp.nwobjectText("txtNonVatRegTinCB");
                        dr["RecordStatus"] = 1;
                        dr["recuser"] = based.SecurityAccess.RecUser;
                        dr["moduser"] = based.SecurityAccess.RecUser;
                        dr["id"] = WebApp.nwobjectText("txtRegName")+ DateTime.Now.ToShortDateString();//WebApp.nwobjectDate("getCSD");
                        dr["VIPType"] = WebApp.nwobjectText("cmbVIPType");
                        dr["SourceofIncome"] = WebApp.nwobjectText("cmbSourceOfIncome");
                        dr["PaymentOption"] = WebApp.nwobjectText("cmbPaymentOption");
                        dr["empSubType"] = WebApp.nwobjectText("cmbEmpSubTypeEMP");
                        dr["custclassification"] = WebApp.nwobjectText("cmbCustClass");
                        dr["validID"] = WebApp.nwobjectText("txtValidID");
                        dr["CommTaxCertNo"] = WebApp.nwobjectText("txtComTaxCertCB");
                        dr["dateIssued"] = WebApp.nwobjectDate("txtDateIssued");
                        dr["placeIssued"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("txtPlaceIssuedCB") : WebApp.nwobjectText("txtPlaceIssued");


                        break;
                    case 1: //contacts hdr
                        dr["customerCode"] = WebApp.nwobjectText("txtCode");
                        dr["status"] = 1;
                        dr["recuser"] = based.SecurityAccess.RecUser;
                        dr["moduser"] = based.SecurityAccess.RecUser;
                        break;
                    case 2: // contacts lin
                        dr["customerCode"] = WebApp.nwobjectText("txtCode");
                        dr["LandlineNo"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("txtLandlineNoCB") : WebApp.nwobjectText("txtLandlineNo");
                        //dr["LocalNo"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("txtLocalNoCB") : WebApp.nwobjectText("txtLocalNo");
                        dr["LocalNo"] = WebApp.nwobjectText("txtLocalNoCB");

                        dr["MobileNo"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("txtMobileNoCB") : WebApp.nwobjectText("txtMobileNo");
                        dr["EmailAdd"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("txtEmailCB") : WebApp.nwobjectText("txtEmail");
                        dr["EffectiveDate"] = DateTime.Now.ToShortDateString();//WebApp.nwobjectDate("getCSD");
                        dr["OtherContactPerson"] = WebApp.nwobjectText("txtEmpContactPerson"); //need to modify
                        dr["OtherContactPersonNo"] = WebApp.nwobjectText("txtEmpContactPersonNum"); //need to modify

                        break;
                    case 3://address hdr
                        dr["customerCode"] = WebApp.nwobjectText("txtCode");
                        dr["status"] = 1;
                        dr["recuser"] = based.SecurityAccess.RecUser;
                        dr["moduser"] = based.SecurityAccess.RecUser;
                        break;
                    case 4: //address lin
                        dr["customerCode"] = WebApp.nwobjectText("txtCode");
                        dr["TagMail"] = 0;
                        dr["TagAddress"] = 1;
                        dr["EffectiveDate"] = DateTime.Now.ToShortDateString();//WebApp.nwobjectDate("getCSD");
                        dr["LocationTypeCode"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("cmbLocTypeCB") : WebApp.nwobjectText("cmbLocType");
                        dr["HomeOwnershipCode"] = WebApp.nwobjectText("cmbHomeOwn");
                        dr["FullLocation"] = WebApp.nwobjectBool("isFullAddress");
                        dr["FullLocationAddress"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("txtFullAddressCB") : WebApp.nwobjectText("txtFullAddress");
                        dr["ReqBrgy"] = WebApp.nwobjectBool("reqbrgy");
                        dr["Barangay"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("cmbBarangayCB") : WebApp.nwobjectText("cmbBarangay");
                        dr["Municipality"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("cmbMunicipalityCB") : WebApp.nwobjectText("cmbMunicipality");
                        dr["Province"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("cmbProvinceCB") : WebApp.nwobjectText("cmbProvince");
                        dr["Region"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("txtRegionCodeCB") : WebApp.nwobjectText("txtRegionCode");
                        dr["Country"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("txtCountryCodeCB") : WebApp.nwobjectText("txtCountryCode");
                        dr["ZIPCode"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("txtZipCodeCB") : WebApp.nwobjectText("txtZipCode");
                        dr["rownum"] = 1;
                        dr["NatureOfBusiness"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("cmbNatureOfBusinessCB") : WebApp.nwobjectText("cmbNatureOfBusinessEMP");
                        dr["BusinessType"] = WebApp.nwobjectText("cmbBusinessTypeCB"); 
                        dr["City"] = "";
                        dr["mailAddress"] = WebApp.nwobjectBool("Company") == true ? WebApp.nwobjectText("txtMailAddressCB") : WebApp.nwobjectText("txtMailAddress");
                        break;
                    case 5: //spouse
                        dr["CustomerCode"] = WebApp.nwobjectText("txtCode");
                        dr["status"] = 1;
                        dr["LastName"] = WebApp.nwobjectText("txtLastNameSP");//
                        dr["FirstName"] = WebApp.nwobjectText("txtFirstNameSP");//
                        dr["MiddleName"] = WebApp.nwobjectText("txtMiddleNameSP");//
                        dr["MaidenName"] = WebApp.nwobjectText("txtMothersMaidenSP");//
                        dr["Occupation"] = WebApp.nwobjectText("cmbOccupationSP");//
                        dr["Company"] = WebApp.nwobjectText("txtCompanySP");
                        dr["BirthDate"] = WebApp.nwobjectDate("txtBdaySP");//
                        dr["Nationality"] = WebApp.nwobjectText("cmbNationalitySP");//
                        dr["Gender"] = WebApp.nwobjectText("cmbGenderSP");//
                        dr["DateOfMarriage"] = WebApp.nwobjectDate("txtDateMarriageSP");//
                        dr["recuser"] = based.SecurityAccess.RecUser;
                        dr["moduser"] = based.SecurityAccess.RecUser;
                        dr["Salutation"] = WebApp.nwobjectText("cmbSalutationSP");//
                        dr["NameSuffix"] = WebApp.nwobjectText("cmbSuffixSP");//
                        dr["TIN"] = WebApp.nwobjectText("txtTINSP");//
                        dr["validID"] = WebApp.nwobjectText("txtValidIDSP");//
                        dr["MobileNo"] = WebApp.nwobjectText("txtMobileNoSp");//

                        ////DateTime dateIssued = DateTime.Parse(WebApp.nwobjectText("txtDateIssuedSP"));//
                        //string dateIssued = WebApp.nwobjectText("txtDateIssuedSP");
                        ////dateIssued.ToString();
                        //dr["dateIssued"] = dateIssued.ToString();
                        //dr["dateIssued"] = DateTime.Parse(WebApp.nwobjectText("txtDateIssuedSP"));

                        dr["dateIssued"] = WebApp.nwobjectDate("txtDateIssuedSP");

                        dr["placeIssued"] = WebApp.nwobjectText("txtPlaceIssuedSP");//
                        dr["OtherContactPerson"] = WebApp.nwobjectText("txtContactPersonSP");//
                        dr["OtherContactPersonNo"] = WebApp.nwobjectText("txtContactPersonNumSP");//

                              

                        break;
                    case 6: //employment hdr
                        dr["customerCode"] = WebApp.nwobjectText("txtCode");
                        dr["status"] = 1;
                        dr["recuser"] = based.SecurityAccess.RecUser;
                        dr["moduser"] = based.SecurityAccess.RecUser;
                        break;
                    case 7: //employment lin
                        dr["customercode"] = WebApp.nwobjectText("txtCode");
                        dr["employer"] = WebApp.nwobjectText("txtEmployerNameEMP");//
                        dr["businessadd"] = WebApp.nwobjectText("txtEmployerAddressEMP");//
                        dr["businesscont"] = WebApp.nwobjectText("txtEmployerContactEMP");//
                        dr["empstatuscode"] = WebApp.nwobjectText("cmbEmpStatusEMP");//
                        dr["effectiveDate"] = DateTime.Now.ToShortDateString();//
                        dr["rownum"] = 1;//
                        dr["EmploymentSubType"] = WebApp.nwobjectText("cmbEmpSubTypeEMP");//
                        dr["MonthlyPersonalIncRange"] = WebApp.nwobjectText("cmbPersonalIncomeEMP");//
                        dr["MonthlyHouseholdIncRange"] = WebApp.nwobjectText("cmbHouseholdIncomeEMP");//
                        dr["Profession"] = WebApp.nwobjectText("txtProfessionEMP");//
                        dr["NatureOfBusiness"] = WebApp.nwobjectText("cmbNatureOfBusinessEMP");//
                        dr["Position_ENH"] = WebApp.nwobjectText("txtPositionEMP");//
                        dr["EngageInBusinessYes"] = WebApp.nwobjectBool("rdbEngagedYes") == true ? 1 : 0;
                        dr["EngageInBusinessNo"] = WebApp.nwobjectBool("rdbEngagedYesNo") == true ? 1 : 0;
                        dr["TotalYearsAbroad"] = WebApp.nwobjectInt("txtNoYrsAbroad"); // need to modify


                        dr["CurrentContractEndDate"] = WebApp.nwobjectDate("txtCurrContractEndEMP"); // need to modify

                        dr["occupationCode"] = WebApp.nwobjectText("cmbEmpInfoOccupation"); // need to modify
                        dr["ZIPCode"] = WebApp.nwobjectText("txtEmpInfoZip"); // need to modify
                        dr["IncomeSrcCode"] = WebApp.nwobjectText("cmbSrcOfIncomeEMP"); // need to modify

                        break;
                    case 8: //Coowner hdr
                        dr["Customer"] = WebApp.nwobjectText("txtCode");
                        dr["recuser"] = based.SecurityAccess.RecUser;
                        dr["moduser"] = based.SecurityAccess.RecUser;
                        break;
                    case 9://Coowner lin
                        dr["Customer"] = WebApp.nwobjectText("txtCode");
                        //dr["RelationshiptotheCustomer"] = WebApp.nwobjectText("cmbRelationshipCO");//
                        dr["LName"] = WebApp.nwobjectText("txtLastNameCO");//
                        dr["FName"] = WebApp.nwobjectText("txtFirstNameCO");//
                        dr["MName"] = WebApp.nwobjectText("txtMiddleNameCO");//
                        dr["TIN"] = WebApp.nwobjectText("txtTINCO");//
                        dr["Gender"] = WebApp.nwobjectText("cmbGenderCO");//
                        dr["Nationality"] = WebApp.nwobjectText("cmbNationalityCO");//
                        dr["DateofBirth"] = WebApp.nwobjectDate("txtBdayCO");//
                        dr["Age"] = WebApp.nwobjectInt("txtAgeCO");//
                        dr["PlaceofBirth"] = WebApp.nwobjectText("txtPlaceBirthCO");//
                        dr["PresentAddress"] = WebApp.nwobjectText("txtResidentialAddressCO");//
                        dr["ProvincialAddress"] = WebApp.nwobjectText("txtProvincialAddressCO");
                        dr["OfficeName"] = WebApp.nwobjectText("txtEmployerNameCO");//
                        dr["OfficeAddress"] = WebApp.nwobjectText("txtEmployerAddressCO");//
                        dr["OfficeTelNo"] = WebApp.nwobjectText("txtEmployerContactCO");//
                        dr["Rowno"] = 1;
                        dr["civilStatus"] = WebApp.nwobjectText("cmbCivilStatusCO");//
                        //dr["Position_ENH"] = WebApp.nwobjectText("txtPositionCO");//
                        dr["myname"] = 0;
                        dr["spouses"] = WebApp.nwobjectText("txtLastNameCOS") != "" ? 1 : 0;
                        dr["namesuffix"] = WebApp.nwobjectText("cmbSuffixCO");//
                        dr["Salutation"] = WebApp.nwobjectText("cmbSalutationCO");//
                        dr["Gender"] = WebApp.nwobjectText("cmbGenderCO");//
                        dr["MothersMaidenName"] = WebApp.nwobjectText("txtMothersMaidenCO");//
                        dr["validID"] = WebApp.nwobjectText("txtValidIDCO");//
                        dr["dateIssued"] = WebApp.nwobjectDate("modifytxtDateIssuedCO"); // need to modifytxtDateIssuedCO");//
                        dr["placeIssued"] = WebApp.nwobjectText("txtPlaceIssuedCO");//
                        dr["FullLocationAddress"] = WebApp.nwobjectText("txtFullAddressCO");//
                        dr["mailingAddress_ENH"] = WebApp.nwobjectText("txtMailAddressCO");//
                        dr["ProvincialAddress"] = WebApp.nwobjectText("cmbProvinceCO");//
                        dr["Municipality"] = WebApp.nwobjectText("cmbMunicipalityCO");//
                        dr["Barangay"] = WebApp.nwobjectText("cmbBarangayCO");//
                        dr["ZIPCode"] = WebApp.nwobjectText("txtZipCodeCO");//
                        dr["Region"] = WebApp.nwobjectText("txtRegionCO");//
                        dr["Country"] = WebApp.nwobjectText("txtCountryCO");//

                        break;
                    case 10://coowner contacts
                        dr["Customer"] = WebApp.nwobjectText("txtCode");
                        dr["Landline"] = WebApp.nwobjectText("txtLandlineNoCO");//
                        //dr["LocalNo"] = WebApp.nwobjectText("txtLocalNoCO");//
                        dr["MobileNo"] = WebApp.nwobjectText("txtMobileNoCO");//
                        dr["Email"] = WebApp.nwobjectText("txtEmailCO");//
                        dr["HomeOwnership_ENH"] = WebApp.nwobjectText("cmbHomeOwnCO");//
                        dr["LocationTypeCode"] = WebApp.nwobjectText("cmbLocTypeCO");//
                        dr["OtherContactPerson"] = WebApp.nwobjectText("txtContactPersonCO");//
                        dr["OtherContactPersonNo"] = WebApp.nwobjectText("txtContactPersonNumCO");//
                        dr["Rowno"] = 1;
                        dr["RefRownoLIN"] = 0;
                        dr["RowID"] = WebApp.nwobjectText("txtRowID");
                        break;
                    case 11://coowner spouse
                        dr["customerCode"]= WebApp.nwobjectText("txtCode");
                        dr["lastName"] = WebApp.nwobjectText("txtLastNameCOS");//
                        dr["firstName"] = WebApp.nwobjectText("txtFirstNameCOS");//
                        dr["middleName"] = WebApp.nwobjectText("txtMiddleNameCOS");//
                        dr["mi"] = WebApp.nwobjectText("txtmriCOS");//
                        dr["salutationCode"] = WebApp.nwobjectText("cmbSalutationCOS");//
                        dr["genderCode"] = WebApp.nwobjectText("cmbGenderCOS");//
                        dr["dateofBirth"] = WebApp.nwobjectDate("txtBdayCOS");//
                        dr["tin"] = WebApp.nwobjectText("txtTINCOS");//
                        dr["dateOfMarriage"] = WebApp.nwobjectDate("txtDateMarriageCOS");//
                        dr["nationalityCode"] = WebApp.nwobjectText("cmbNationalityCOS");//
                        dr["occupationCode"] = WebApp.nwobjectText("cmbOccupationCOS");//
                        dr["spouseID"] = WebApp.nwobjectText("txtspouseID");
                        break;
                    case 12://attorney hdr
                        dr["ID"] = WebApp.nwobjectText("txtCode");
                        dr["Customer"] = WebApp.nwobjectText("txtCode");
                        dr["recuser"] = based.SecurityAccess.RecUser;
                        dr["moduser"] = based.SecurityAccess.RecUser;
                        break;
                    case 13://attorney lin
                        dr["ID"] = WebApp.nwobjectText("txtCode");
                        dr["EffectiveDateFrm"] = WebApp.nwobjectDate("txtEffectiveDateFromAF");//
                        dr["EffectiveDateTo"] = WebApp.nwobjectDate("txtEffectiveDateToAF");//
                        dr["LastName"] = WebApp.nwobjectText("txtLastNameAF");//
                        dr["FirstName"] = WebApp.nwobjectText("txtFirstNameAF");//
                        dr["MiddleName"] = WebApp.nwobjectText("txtMiddleNameAF");//
                        dr["TIN"] = WebApp.nwobjectText("txtTINAF");//
                        dr["DateofBirth"] = WebApp.nwobjectDate("txtBdayAF");//
                        dr["Age"] = WebApp.nwobjectInt("txtAgeAF");//
                        dr["Gender"] = WebApp.nwobjectText("cmbGenderAF");//
                        dr["Nationality"] = WebApp.nwobjectText("cmbNationalityAF");//
                        dr["RelationtotheCust"] = WebApp.nwobjectText("cmbRelationshipAF");//
                        dr["ContactDetails"] = WebApp.nwobjectText("txtLandlineNoAF") != "" || WebApp.nwobjectText("txtLocalNoAF") != "" || WebApp.nwobjectText("txtMobileNoAF") != ""  || WebApp.nwobjectText("txtEmailAF") != "" ? 1 : 0;
                        dr["HomeAddress"] = WebApp.nwobjectText("txtHomeAddressAF");//
                        dr["BusinessAddress"] = WebApp.nwobjectText("txtBusinessAddressAF");//
                        dr["validID"] = WebApp.nwobjectText("txtValidIDAF");//
                        dr["dateIssued"] = WebApp.nwobjectDate("txtDateIssuedAF");//
                        dr["placeIssued"] = WebApp.nwobjectText("txtPlaceIssuedAF");//


                        dr["ROWNO"] = 1;
                        break;
                    case 14://atty in fact 
                        dr["ID"] = WebApp.nwobjectText("txtCode");
                        dr["LandlineNo"] = WebApp.nwobjectDouble("txtLandlineNoAF");//
                        //dr["LocalNo"] = WebApp.nwobjectDouble("txtLocalNoAF");
                        dr["MobileNo"] = WebApp.nwobjectText("txtMobileNoAF");//
                        dr["EmailAddress"] = WebApp.nwobjectText("txtEmailAF");//
                        dr["ROWNO"] = 1;
                        break;
                    case 15://preference hdr
                        dr["customerCode"] = WebApp.nwobjectText("txtCode");
                        dr["status"] = 1;
                        dr["recuser"] = based.SecurityAccess.RecUser;
                        dr["moduser"] = based.SecurityAccess.RecUser;
                        break;
                    case 16://preference lin
                        dr["customerCode"] = WebApp.nwobjectText("txtCode");
                        dr["ReasonForBuying"] = WebApp.nwobjectText("cmbReasonForBuyingPI");//
                        dr["ReasonForBuyingOthers"] = WebApp.nwobjectText("txtOthersReasonPI");
                        dr["DesiredProperty"] = WebApp.nwobjectText("txtDesiredPropertyPI");//
                        dr["DesiredPropertyOthers"] = WebApp.nwobjectText("txtOthersDesiredPI");
                        dr["SourceOfAwareness"] = WebApp.nwobjectText("cmbSourceOfAwarenessPI");//
                        dr["SourceOfAwarenessOthers"] = WebApp.nwobjectText("txtOthersSourceOfAwarenessPI");//
                        dr["PriceRange"] = WebApp.nwobjectText("cmbPriceRangePI");//
                        dr["isRecommended"] = WebApp.nwobjectBool("cbYes") == true ? 1 : 0;
                        dr["Name"] = WebApp.nwobjectText("txtNamePI");//
                        dr["MobileNo"] = WebApp.nwobjectText("txtMobileNoPI");//
                        dr["Email"] = WebApp.nwobjectText("txtEmailPI");//
                        break;
                    case 17://Invididual Acount lin
                        if (dtBankAccount.Rows.Count > 0)
                        {
                            foreach (DataRow dRow in dtBankAccount.Rows)
                            {
                                if(dRow[SPR_EMPBnkInstitutioName - 1].ToString() != "")
                                {
                                    dr["CustomerCode"] = WebApp.nwobjectText("txtCode");
                                    //dr["NameOfInstitution"] = dRow[SPR_EMPBnkInstitutioName-1].ToString();
                                    //dr["BranchContactNo"] = dRow[SPR_EMPBnkBranchNo-1].ToString();
                                    //dr["TypeofAccount"] = dRow[SPR_EMPBnkAccountType - 1].ToString();
                                    //dr["AccountNumber"] = dRow[SPR_EMPBnkAccountNumber - 1].ToString();

                                    dr["NameOfInstitution"] = dRow[SPR_EMPBnkInstitutioName - 1];
                                    dr["BranchContactNo"] = dRow[SPR_EMPBnkBranchNo - 1];
                                    dr["TypeofAccount"] = dRow[SPR_EMPBnkAccountType - 1];
                                    dr["AccountNumber"] = dRow[SPR_EMPBnkAccountNumber - 1];
                                    if (Parser.ParseDecimal(dRow[SPR_EMPBnkAvgAmt - 1]) > 0)
                                    {
                                        dr["AverageAmount"] = dRow[SPR_EMPBnkAvgAmt - 1];
                                    }
                                }
                            }
                        }
                        break;

                    case 18://Invididual Acount lin
                        if (dtSpouseBankAccount.Rows.Count > 0)
                        {
                            foreach (DataRow dRow in dtSpouseBankAccount.Rows)
                            {
                                if(dRow[SPR_SPSBnkInstitutioName - 1].ToString() != "")
                                {
                                    dr["CustomerCode"] = WebApp.nwobjectText("txtCode");
                                    //dr["NameOfInstitution"] = dRow[SPR_SPSBnkInstitutioName - 1].ToString();
                                    //dr["BranchContactNo"] = dRow[SPR_SPSBnkBranchNo - 1].ToString();
                                    //dr["TypeofAccount"] = dRow[SPR_SPSBnkAccountType - 1].ToString();
                                    //dr["AccountNumber"] = dRow[SPR_SPSBnkAccountNumber - 1].ToString();
                                    dr["NameOfInstitution"] = dRow[SPR_SPSBnkInstitutioName - 1];
                                    dr["BranchContactNo"] = dRow[SPR_SPSBnkBranchNo - 1];
                                    dr["TypeofAccount"] = dRow[SPR_SPSBnkAccountType - 1];
                                    dr["AccountNumber"] = dRow[SPR_SPSBnkAccountNumber - 1];

                                    if (Parser.ParseDecimal(dRow[SPR_SPSBnkAvgAmt - 1]) > 0)
                                    {
                                        dr["AverageAmount"] = dRow[SPR_SPSBnkAvgAmt - 1];
                                    }
                                }
                            }
                        }
                        break;

                    case 19: //Spouse employment lin
                        dr["customercode"] = WebApp.nwobjectText("txtCode");
                        dr["employer"] = WebApp.nwobjectText("txtEmployerNameSPS");//
                        dr["businessadd"] = WebApp.nwobjectText("txtEmployerAddressSPS");//
                        dr["businesscont"] = WebApp.nwobjectText("txtEmployerContactSps");//
                        dr["empstatuscode"] = WebApp.nwobjectText("cmbEmpStatusSps");//
                        dr["effectiveDate"] = DateTime.Now.ToShortDateString();//
                        dr["rownum"] = 1;//
                        dr["EmploymentSubType"] = WebApp.nwobjectText("cmbEmpSubTypeSps");//
                        dr["MonthlyPersonalIncRange"] = WebApp.nwobjectText("cmbPersonalIncomeSps");//
                        dr["MonthlyHouseholdIncRange"] = WebApp.nwobjectText("cmbHouseholdIncomeSps");//
                        dr["Profession"] = WebApp.nwobjectText("txtProfessionSps");//
                        dr["NatureOfBusiness"] = WebApp.nwobjectText("cmbNatureOfBusinessSps");//
                        dr["Position_ENH"] = WebApp.nwobjectText("txtPositionSps");//
                        dr["EngageInBusinessYes"] = WebApp.nwobjectBool("rdbEngagedYesSps") == true ? 1 : 0;
                        dr["EngageInBusinessNo"] = WebApp.nwobjectBool("rdbEngagedYesNoSps") == true ? 1 : 0;
                        dr["TotalYearsAbroad"] = WebApp.nwobjectInt("txtNoYrsAbroadSps"); // need to modify

                        dr["CurrentContractEndDate"] = WebApp.nwobjectDate("txtContractEndSpS"); // need to modify
                        dr["occupationCode"] = WebApp.nwobjectText("cmbInfoOccupationSPS"); // need to modify
                        dr["ZIPCode"] = WebApp.nwobjectText("txtInfoZipSps"); // need to modify
                        dr["IncomeSrcCode"] = WebApp.nwobjectText("cmbSrcOfIncomeSps"); // need to modify
                        break;


                    case 20: //CoOwner employment lin
                        dr["customercode"] = WebApp.nwobjectText("txtCode");
                        dr["employer"] = WebApp.nwobjectText("txtEmployerNameCO");//
                        dr["businessadd"] = WebApp.nwobjectText("txtEmployerAddressCO");//
                        dr["businesscont"] = WebApp.nwobjectText("txtEmployerContactCO");//
                        dr["empstatuscode"] = WebApp.nwobjectText("cmbEmpStatusCO");//
                        dr["effectiveDate"] = DateTime.Now.ToShortDateString();//
                        dr["rownum"] = 1;//
                        dr["EmploymentSubType"] = WebApp.nwobjectText("cmbEmpSubTypeCO");//
                        dr["MonthlyPersonalIncRange"] = WebApp.nwobjectText("cmbPersonalIncomeCO");//
                        dr["MonthlyHouseholdIncRange"] = WebApp.nwobjectText("cmbHouseholdIncomeCO");//
                        dr["Profession"] = WebApp.nwobjectText("txtProfessionCO");//
                        dr["NatureOfBusiness"] = WebApp.nwobjectText("cmbNatureOfBusinessCO");//
                        dr["Position_ENH"] = WebApp.nwobjectText("txtPositionCO");//
                        dr["EngageInBusinessYes"] = WebApp.nwobjectBool("rdbEngagedYesCO") == true ? 1 : 0;
                        dr["EngageInBusinessNo"] = WebApp.nwobjectBool("rdbEngagedYesNoCO") == true ? 1 : 0;
                        dr["TotalYearsAbroad"] = WebApp.nwobjectInt("txtNoYrsAbroadCO"); // need to modify
                        dr["CurrentContractEndDate"] = WebApp.nwobjectDate("txtContractEndCO"); // need to modify
                        dr["occupationCode"] = WebApp.nwobjectText("cmbInfoOccupationCO"); // need to modify
                        dr["ZIPCode"] = WebApp.nwobjectText("txtInfoZipCO"); // need to modify
                        dr["IncomeSrcCode"] = WebApp.nwobjectText("cmbSrcOfIncomeCO"); // need to modify
                        break;

                        
                }
                dt.Rows.Add(dr);
                ds.Tables[i].AcceptChanges();
                //ds.AcceptChanges();
            }
            

            return ds;
        }

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
            string server = dal.Serverlink();
            //string server = @"C://Users//FPTI//Documents//noah_files//v10//Enhancement//PORTAL MAIN CONSO//NOAHBusinessApp//forms_standards//Files";
            js.makeValueText("#txtServerLink",server);
            //js.makeValueText("#txtCode", based.SecurityAccess.RecUser);

            CreateGrid(true, InitializeGrid());
            CreateGrid2(true, InitializeGrid2());

            //#if DEBUG 209.146.24.59:83
            //server = server.Replace("../../../..", "http://209.146.24.62:212/");
            //js.ADD("nwTrustedLinks.push('209.146.24.62:212');");
            //#endif

            //js.ADD("$('#txtServerLink').val('" + server + "')");
            js.ADD($"$DateToday='{dal.getNoahDate()}'");
            js.makeValueText("getCSD", DateTime.Now.ToShortDateString());

            js.ADD("SetDefaultIndividual()");
            js.Enable("#btnupdate", false);

            LoadCombos();
            nwToolBox.bindingNavigatorPrintItem.Visible = true;

            dal.DeleteDesiredProperty(based.SecurityAccess.RecUser);



        }

        private void RefreshData()
        {

       

            dal.DeleteDesiredProperty(based.SecurityAccess.RecUser);
            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
            js.ADD("RefreshData()");

            //DataTable CurrBnk = dtGridLin();
            //CreateGrid(false, CurrBnk);

            //DataTable dt2 = dtGridLin2();
            //CreateGrid2(false, dt2);


        }

        public void LoadCombos()
        {
            DataSet dsData = dal.LoadComboValues();
            string value = "";

            for (int i = 0; i < dsData.Tables.Count; i++)
            {
                switch(i)//class/id affected
                {
                    case 0: value = ".cmbCustClass"; break; //Cust Class
                    case 1: value = ".cmbVIPType"; break; //VIP Type
                    case 2: value = ".cmbSalutation"; break; //Salutation
                    case 3: value = ".cmbSuffix"; break; //Suffix
                    case 4: value = ".cmbGender"; break; //Gender
                    case 5: value = ".cmbNationality"; break; //Nationality
                    case 6: value = ".cmbOccupation"; break; //Occupation
                    case 7: value = ".cmbSourceOfIncome"; break; //Source of Income
                    case 8: value = ".cmbPaymentOption"; break; //Payment Option
                    case 9: value = ".cmbCivilStatus"; break; //Civil Status
                    case 10: value = ".cmbProvince"; break; //Province
                    case 11: value = ".cmbHomeOwn"; break; //Home Ownership
                    case 12: value = ".cmbLocType"; break; //Location Type
                    case 13: value = ".cmbEmpSubType"; break; //Sub Type
                    case 14: value = ".cmbEmpAreaEMP"; break; //Employment Area
                    case 15: value = ".cmbEmpStatus"; break; //Employment Status
                    case 16: value = ".cmbNatureOfBusiness"; break; //Nature of Business
                    case 17: value = ".cmbPersonalIncome"; break; //Personal Income
                    case 18: value = ".cmbHouseholdIncome"; break; //Household Income
                    case 19: value = ".cmbRelationship"; break; //Relationship
                    case 20: value = ".cmbReasonForBuying"; break; //Reason for Buying
                    case 21: value = ".cmbSourceOfAwareness"; break; //Source of Awareness
                    case 22: value = ".cmbPriceRange"; break; //Price Range
                    case 23: value = ".cmbBusinessType"; break; //Business/Company Type
                    case 24: value = ".cmbProvinceCO"; break; //Business/Company Type

                }
                DataTable dt = dsData.Tables[i];
                for(int j= 0; j < dt.Rows.Count; j++)
                {
                    string code = dt.Rows[j][0].ToString();
                    string desc = dt.Rows[j][1].ToString();
                    js.makeAppend(value, "<option value='" + code + "'>" + desc + "</option>");
                }
                
            }
        }
        
       public void LoadCombosSpecial(int qt,string idclass,string code,string ft,string cust)
        {
            //js.ADD("document.getElementById('"+ idclass + "').innerHTML = ''");
            js.makeHTML(idclass, "");
            DataTable dt = dal.GetComboValueSpecial(qt, code, ft, cust);
            for (int j = 0; j < dt.Rows.Count; j++)
            {
                string vcode = dt.Rows[j][0].ToString();
                string vdesc = dt.Rows[j][1].ToString();
                string sval = "";
                string rcode = "", rdesc = "", ccode = "", cdesc = "";

                if(dt.Columns.Count == 3) // zip code ; barangay
                {
                    sval = dt.Rows[j][2].ToString();
                    js.makeAppend(idclass, "<option value='" + vcode + "' sval='" + sval + "'>" + vdesc + "</option>");
                }
                if (dt.Columns.Count > 3) //region & country from municipality
                {
                    rcode = dt.Rows[j][2].ToString();
                    rdesc = dt.Rows[j][3].ToString();
                    ccode = dt.Rows[j][4].ToString();
                    cdesc = dt.Rows[j][5].ToString();
                    js.makeAppend(idclass, "<option value='" + vcode + "' rcode='" + rcode + "' rdesc='" + rdesc + "' ccode='" + ccode + "' cdesc='" + cdesc + "'>" + vdesc + "</option>");
                }
                 
            }
        }
        public void LoadCombosSpecialCO(int qtCO, string idclassCO, string codeCO, string ftCO, string cust)
        {
            //js.ADD("document.getElementById('"+ idclass + "').innerHTML = ''");
            js.makeHTML(idclassCO, "");
            DataTable dt = dal.GetComboValueSpecialCO(qtCO, codeCO, ftCO, cust);
            for (int j = 0; j < dt.Rows.Count; j++)
            {
                string vcode = dt.Rows[j][0].ToString();
                string vdesc = dt.Rows[j][1].ToString();
                string sval = "";
                string rcode = "", rdesc = "", ccode = "", cdesc = "";

                if (dt.Columns.Count == 3) // zip code ; barangay
                {
                    sval = dt.Rows[j][2].ToString();
                    js.makeAppend(idclassCO, "<option value='" + vcode + "' sval='" + sval + "'>" + vdesc + "</option>");
                }
                if (dt.Columns.Count > 3) //region & country from municipality
                {
                    rcode = dt.Rows[j][2].ToString();
                    rdesc = dt.Rows[j][3].ToString();
                    ccode = dt.Rows[j][4].ToString();
                    cdesc = dt.Rows[j][5].ToString();
                    js.makeAppend(idclassCO, "<option value='" + vcode + "' rcode='" + rcode + "' rdesc='" + rdesc + "' ccode='" + ccode + "' cdesc='" + cdesc + "'>" + vdesc + "</option>");
                }

            }
        }
        public void GenerateCoownerDetails()
        {
            DataTable dt = dal.GetCoownerDetails(WebApp.nwobjectText("code"));
            string dtls = nwSystem.GetDataTableToJSON(dt);

            int cnt = dt.Rows.Count;
            js.ADD("$('.SpCnt').html('<input id=curCnt value=1 maxlength=2 maxcnt=" + cnt + " /> of " + cnt + "')");
            js.ADD("dtls = " + dtls + "");
            js.ADD("LoadCoowner('1')");
            js.ADD("$('.SpFirst').enable(false)");
            js.ADD("$('.SpPrev').enable(false)");
            js.ADD("$('.SpNext').enable(true)");
            js.ADD("$('.SpLast').enable(true)");
        }

       


        private void setRqmtCompProp()
        {
            if (dal.hasSavedRqrdCompli(WebApp.nwobjectText("txtCode")) == "True")
            {
                js.ADD("$('#btnReqCompliance').removeClass('btnGray');");
                js.ADD("$('#btnReqCompliance').removeClass('btnOrange');");
                js.ADD("$('#btnReqCompliance').addClass('btnGreen');");
            }
            else
            {
                js.ADD("$('#btnReqCompliance').removeClass('btnGray');");
                js.ADD("$('#btnReqCompliance').removeClass('btnGreen');");
                js.ADD("$('#btnReqCompliance').removeClass('btnGreen');");
                js.ADD("$('#btnReqCompliance').addClass('btnOrange');");
            }



        }

        /* Current Bank Accounts*/
        public void CreateGrid(bool isInitialize, DataTable dtGridLin)
        {
            string gridID = "nwGridMainCon";

            nwGrid grid = new nwGrid(gridID);

            DataTable dt = new DataTable();

            grid.Type = nwGridType.SpreadCanvas;

            dt = dtGridLin;

            if (!isInitialize) //grid should load data, when the function is called the parameter for initialize is false
            {
                if (dt.Rows.Count <= 0)
                {  //as per the old code there should be but if its not passing right then there will be no rows
                    Console.Write("no record to show"); // open console if this message appears


                }
                dt.Rows.Add();      //add an empty row after the loaded rows

            }
            else //new grid load, no data. Parameter is true (ex CreateGrid (true,dt);)
            {



                while (dt.Rows.Count < 5)
                {

                    dt.Rows.Add();      //create 5 empty rows
                }
            }

            grid.buttonInsert = true;
            grid.buttonDelete = true;
            
            grid.dataSource(dt);

            grid.RowHeight(5);

            grid.TableHeight(200);


            for (int i = 0; i < dtGridLin.Columns.Count; i++)
            {
                grid.nwobject(i).BackgroundColor("Gainsboro");
            }


            grid.nwobject(1).Input();
            grid.nwobject(3).Input();
            grid.nwobject(4).InputCurrency("0.00");
            grid.nwobject(0).BackgroundColor("cyan");
            grid.nwobject(2).BackgroundColor("cyan");




            grid.varSpreadBook = "nwGridMainCon_Book";
            grid.varSpreadSheet = "nwGridMainCon_Sheet";
            js.ADD(grid.createTable());


        }

        public void CreateGrid2(bool isInitialize, DataTable dtGridLin)
        {
            string gridID = "nwGridMainCon2";

            nwGrid grid = new nwGrid(gridID);
            DataTable dt = new DataTable();

            grid.Type = nwGridType.SpreadCanvas;

            dt = dtGridLin;

            if (!isInitialize) //grid should load data, when the function is called the parameter for initialize is false
            {
              
                if (dt.Rows.Count <= 0)
                {  //as per the old code there should be but if its not passing right then there will be no rows
                    Console.Write("no record to show"); // open console if this message appears
                }
                dt.Rows.Add();      //add an empty row after the loaded rows

            }
            else //new grid load, no data. Parameter is true (ex CreateGrid (true,dt);)
            {



                while (dt.Rows.Count < 5)
                {

                    dt.Rows.Add();      //create 5 empty rows
                }
            }

            grid.buttonInsert = true;
            grid.buttonDelete = true;

            grid.dataSource(dt);

            grid.RowHeight(5);

            grid.TableHeight(200);


            for (int i = 0; i < dtGridLin.Columns.Count; i++)
            {
                grid.nwobject(i).BackgroundColor("Gainsboro");
            }

            grid.nwobject(1).Input();
            grid.nwobject(3).Input();
            grid.nwobject(4).InputCurrency("0.00");
            grid.nwobject(0).BackgroundColor("cyan");
            grid.nwobject(2).BackgroundColor("cyan");

            grid.varSpreadBook = "nwGridMainCon_Book2";
            grid.varSpreadSheet = "nwGridMainCon_Sheet2";

            js.ADD(grid.createTable());


        }
        public DataTable InitializeGrid()
        {
            DataTable dt = new DataTable();


            dt.Columns.Add("Name of Institution"); //2
            dt.Columns.Add("Branch/Contact No."); //3
            dt.Columns.Add("Type of Account"); //4
            dt.Columns.Add("Account Number"); //5
            dt.Columns.Add("Average Amount"); //6


            return dt;
        }

        public DataTable InitializeGrid2()
        {
            DataTable dt = new DataTable();


            dt.Columns.Add("Name of Institution"); //2
            dt.Columns.Add("Branch/Contact No."); //3
            dt.Columns.Add("Type of Account"); //4
            dt.Columns.Add("Account Number"); //5
            dt.Columns.Add("Average Amount"); //6


            return dt;
        }
        public DataTable dtGridLin()
        {
            DataTable dt = new DataTable();
            string CustomerCode = WebApp.nwobjectText("txtCode");
            dt = dal.getCurBnkLin(CustomerCode);
            return dt;
        }
        public DataTable dtGridLin2()
        {
            DataTable dt = new DataTable();

            dt = dal.SpsCurBnkLin();
            return dt;
        }


        //private DataTable LoadIndividualAcc()
        //{
        //    #region don't change
        //    DataTable dtLIN = new DataTable();
        //    dtLIN = dal.LoadIndividualAcc();
        //    #endregion

        //    //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridCon"));
        //    //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridCon2"));

        //    DataSet ds = WebApp.DataSet("nwGridCon");
        //    DataTable dt = ds.Tables[0];


        //    if (dt.Rows.Count > 0)
        //    {
        //        foreach (DataRow dRow in dt.Rows)
        //        {
        //            if (dRow[SPR_EmpCode].ToString() != string.Empty)
        //            {
        //                DataRow dr = dtLIN.NewRow();
        //                dr["EmpCode"] = dRow[SPR_EmpCode].ToString();
        //                dr["EmpName"] = dRow[SPR_EmpDesc].ToString();
        //                dr["EmpDesigCode"] = dRow[SPR_EmpDesigCode].ToString();
        //                dr["EmpDesigDesc"] = dRow[SPR_EmpDesigDesc].ToString();
        //                dr["Recuser"] = based.SecurityAccess.RecUser;
        //                dr["Moduser"] = based.SecurityAccess.RecUser;

        //                dtLIN.Rows.Add(dr);
        //                dtLIN.AcceptChanges();
        //            }
        //        }
        //    }

        //    return dtLIN;
        //}
    }
}

