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
    public class BMSellerInformationBL : nwAction
    {
        //private const int
        //    SPR_EFFDATEFROM = 1,
        //    SPR_EFFDATETO = 2,
        //    SPR_DOCUCTRLDTLS = 3,
        //    SPR_LASTNAME = 4,
        //    SPR_FIRSTNAME = 5,
        //    SPR_MIDDLENAME = 6,
        //    SPR_TIN = 7,
        //    SPR_DATEOFBIRTH = 8,
        //    SPR_AGE = 9,
        //    SPR_GENDERDESC = 10,
        //    SPR_GENDER = 11,
        //    SPR_NATIONALITYDESC = 12,
        //    SPR_NATIONALITY = 13,
        //    SPR_RELATIONTOCUSTDESC = 14,
        //    SPR_RELATIONTOCUST = 15,
        //    SPR_CONTACT = 16,
        //    SPR_HOMEADD = 17,
        //    SPR_HOMEADDZIP = 18,
        //    SPR_BUSINESSADD = 19,
        //    SPR_BUSINESSADDZIP = 20,
        //    SPR_ROWNO = 21;

        //private const string
        //      SPRNAME_EFFDATEFROM = "Effective Date From",
        //      SPRNAME_EFFDATETO = "Effective Date To",
        //      SPRNAME_DOCUCTRLDTLS = "Document Control Details",
        //      SPRNAME_LASTNAME = "Last Name",
        //      SPRNAME_FIRSTNAME = "First Name",
        //      SPRNAME_MIDDLENAME = "Middle Name",
        //      SPRNAME_TIN = "TIN",
        //      SPRNAME_DATEOFBIRTH = "Date of Birth",
        //      SPRNAME_AGE = "Age",
        //      SPRNAME_GENDER = "Gender",
        //      SPRNAME_NATIONALITY = "Nationality",
        //      SPRNAME_RELATIONTOCUST = "Relationship to the Customer",
        //      SPRNAME_CONTACT = "Contact Details",
        //      SPRNAME_HOMEADD = "Home Address",
        //      SPRNAME_HOMEADDZIP = "Home Address Zip Code",
        //      SPRNAME_BUSINESSADD = "Business Address",
        //      SPRNAME_BUSINESSADDZIP = "Business Address Zip Code",
        //     SPRNAME_ROWNO = "Rowno";
        private int UpdateButton = 0;

        private const int
            SPR_COMMRELCODE = 1,
            SPR_COMMRELDESC = 2;

        private const string
          SPRNAME_COMMRELCODE = "Mode of Commission Release Code",
          SPRNAME_COMMRELDESC = "Mode of Commission Release Description";

        private const int
            SPR_BANKCODE = 1,
            SPR_BANKNAME = 2,
            SPR_BRANCH = 3,
            SPR_ACCNO = 4,
            SPR_ACCNAME = 5,
            SPR_ACCTYPE =6,
            SPR_ACCTYPEDesc=7,
            SPR_PARTICULARS = 8;

        private const string
          SPRNAME_BANKCODE = "Bank Code",
          SPRNAME_BANKNAME = "Bank Name",
          SPRNAME_BRANCH = "Branch",
          SPRNAME_ACCNO = "Account No.",
          SPRNAME_ACCNAME = "Account Name",
          SPRNAME_ACCTYPE = "Account Type",
          SPRNAME_ACCTYPEDESC = "Account Tyep Desc",
          SPRNAME_PARTICULARS = "Particulars";



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

        public const int
            SPR_EMPLOYEE = 1,
            SPR_EMPLOYEE_CODE = 2,
            SPR_ID = 3,
            SPR_DATEISSUED = 4,
            SPR_PLACEISSUED = 5;

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
            dal = new BMSellerInformationDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
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
        BMSellerInformationDAL dal;
        //int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public BMSellerInformationBL()
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

            DataTable dtjsonlevelconfig = getJsonToDataTable(WebApp.nwobjectText("jsonlevelconfig"));

            string config = string.Empty;

            switch (strMethod)
            {

                case "gettoolboxInquire":
                    strSQL = dal.inquireQuery();
                    strMethod = strMethod.Substring(3);
                    //nwObject.ColumnHide(1);
                    //nwObject.ColumnDataType(3, nwObject.DataType.Date);
                    //nwObject.ColumnDataType(5, nwObject.DataType.Date);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugSellergroup":
                    strSQL = dal.getSellergroup;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugLvl1":
                case "getlugLvl2":
                case "getlugLvl3":
                case "getlugLvl4":
                case "getlugLvl5":
                case "getlugLvl6":
                case "getlugLvl7":
                case "getlugLvl8":
                case "getlugLvl9":
                case "getlugLvl10":

                    string lvl = strMethod.Replace("getlug", " ").Trim().Replace("Lvl", "level");

                    var results = from row in dtjsonlevelconfig.AsEnumerable()
                                  where row.Field<string>("configlvl") == lvl
                                  select row;

                    config = results.First().Field<string>("configval");
                    strSQL = dal.qryLevel(WebApp.nwobjectText("idvallugSellerType"), config, WebApp.nwobjectText("idvallugMktgGrpCode"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSellerType":
                    strSQL = dal.getSellerTyp;
                    strMethod = strMethod.Substring(3);

                    //int maxcol = 2;
                    //int x = Parser.ParseInt(dal.getLastlevel());
                    //for (int i = 10; i >= 1; i--)
                    //{
                    //    if (i > x)
                    //    {
                    //        nwObject.ColumnHide(maxcol);
                    //        nwObject.ColumnHide(maxcol + 1);
                    //    }
                    //    maxcol = maxcol + 2;
                    //}

                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugSellerRole":
                    strSQL = dal.getSellerRole();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugSellerStatus":
                    strSQL = dal.getSellerStatus;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugSalutation":
                    strSQL = dal.getSalutation;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugNameSuffix":
                    strSQL = dal.getNameSuffix;
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

                case "getlugNationality":
                    strSQL = dal.getNationality;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugDefaultVATCode":
                    strSQL = dal.getDefaultVATTaxCode;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugDefaultCWTTaxCode":
                    strSQL = dal.getDefaultVATTaxCode;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugRecruitedBy":
                    strSQL = dal.getRecruitedBy;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugCommRel":
                    strSQL = dal.getCommRel;
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                    //LAM
                case "getlugMktgGrpCode":
                    strSQL = dal.qryMarketingGroup();

                    for (int i = 5; i <= 25; i++)
                    {
                        nwObject.ColumnHide(i);
                    }


                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugLocSegment":
                    strSQL = dal.getLocSegment(WebApp.nwobjectText("origin"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugSellerContractType":
                    strSQL = dal.getSellerContractType();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugSellerCotractStatus":
                    strSQL = dal.getSellerContractStat();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
            }

            return strFinal;
        }

        public DataTable getJsonToDataTable(string json)
        {
            DataTable dtresult = new DataTable();

            dtresult = JsonConvert.DeserializeObject<DataTable>(json);

            return dtresult;
        }

        public string DataTableToJSON(DataTable dt)
        {
            string json = JsonConvert.SerializeObject(dt);
            return json;
        }

        ///// Standard RecordOperation 

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";

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
                    nwToolBox.bindingNavigatorExportItem.Enable = 
                   nwToolBox.bindingNavigatorProcessItem.Enable = false;

                    string level1 = dal.getLabel("Level1");
                    string level2 = dal.getLabel("Level2");

                    js.makeValueText("#Level1", level1);
                    js.makeValueText("#Level2", level2);

                    js.ADD("setLabelText()");

                    // js.ADD("$('.reqLvl').css('display' , 'inline');");
                    // CreateGrid(true);
                    var serverdate = SFObjects.GetServerDateTime(this.UserDefinedConnectionString);
                    js.makeValueText("#txtEffectiveDateHDR", serverdate.ToString("MM/dd/yyy"));
                    js.ADD("$(':input').val('');");
                    //js.makeValueText("#txtServerLink", dal.ServerLink());
                    js.ADD("$('#txtVATRegTIN').enable(false);");

                    break;

                case eRecordOperation.Save:
                    RecordOperationResult = ValidateData("Save");
                    if (RecordOperationResult.Length <= 0)
                    {
                        UpdateButton = WebApp.nwobjectInt("txtUpdateButton");
                        DataTable dthdr = LoadSchema();
                        string ID = string.Empty;
                        var UpdateStatus = WebApp.nwobjectText("UpdateStatus");
                        //if (UpdateStatus == "Saved")
                        //{
                        //    UpdateButton = 1;
                        //}
                        //else
                        //{
                        //    UpdateButton = 0;
                        //}
                        RecordOperationResult = dal.SaveData(dthdr, isNewRow, UpdateButton, 0);
                    }
                    
                    break;

                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("SellerCode"));
                    RefreshData();
                    //js.ADD("toolboxrefresh()");
                    break;

                case eRecordOperation.Process:
                    RecordOperationResult = ValidateData("Process");
                    if (RecordOperationResult.Length <= 0)
                    {
                        DataTable dthdr = LoadSchema();
                        string ID = string.Empty;
                        UpdateButton = WebApp.nwobjectInt("txtUpdateButton");
                        var UpdateStatus = WebApp.nwobjectText("UpdateStatus");
                        //if(UpdateStatus == "Saved")
                        //{
                        //    UpdateButton = 1;
                        //}
                        //else
                        //{
                        //    UpdateButton = 0;
                        //}
                        RecordOperationResult = dal.SaveData(dthdr, false, UpdateButton , 1 );
                        nwConfiguration nwconfig = new nwConfiguration();
                        //string password = nwconfig.nwEncrpytString("noah123");
                        NoahWebLib.Security.NOAHEncryptor nwSecurity = new NoahWebLib.Security.NOAHEncryptor();
                        string password = nwSecurity.EncryptToString("noah@123");
                        string SaveStatus = WebApp.nwobjectText("SaveStatus");
                        //string UpdateStatus = WebApp.nwobjectText("UpdateStatus");
                        //RecordOperationResult = dal.ProcessData(WebApp.nwobjectText("txtSellerCode") , based.SecurityAccess.RecUser , UpdateButton);
                        RecordOperationResult = dal.ProcessData(WebApp.nwobjectText("txtSellerCode"), WebApp.nwobjectText("txtSellername"),password,SaveStatus,UpdateStatus );
                    }
                    
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
                                                           (ListingAndPrint.FormType.Listing, dal.LISTINGSTARTROW, dal.LISTINGQUERY(based.SecurityAccess.RecUser),
                                                           LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                           based.SecurityAccess.RecUserName, LISTINGFILENAME);

                    //js.ADD("$().css()");
                    //## FOR EXPORTING ###
                    Random rnd = new Random();
                    string SessionID = DateTime.Now.ToString("yyyyddMMhhmmss") + rnd.Next(0, 9999).ToString().PadRight(4, '0');
                    HttpContext.Current.Session["Config_" + SessionID] = frmlist.m_Spread.ExportConfig();
                    HttpContext.Current.Session["Data_" + SessionID] = frmlist.m_Spread.GetDataSource();
                    HttpContext.Current.Session["Filename_" + SessionID] = LISTINGFILENAME;
                    HttpContext.Current.Session["Header_" + SessionID] = "0";
                    js.ADD("ExportSessionID='" + SessionID + "'");

                    //frmlist.m_Spread.SetText(5, 5, WebApp.nwobjectText("txtLevel1").Replace("*", ""));
                    //frmlist.m_Spread.SetText(6, 5, WebApp.nwobjectText("txtLevel1").Replace("*", "") + " Description");
                    //frmlist.m_Spread.SetText(7, 5, WebApp.nwobjectText("txtLevel2").Replace("*", ""));
                    //frmlist.m_Spread.SetText(8, 5, WebApp.nwobjectText("txtLevel2").Replace("*", "") + " Description");
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
                    UpdateButton = 1;
                    js.makeValueText("#txtUpdateButton", "1");
                    js.ADD("$('.noah-webui-default-Content_Container').enable(true);");  //to enable attach picture and signature during update
                    //Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Search:
                    tempstr = "search";
                    //Prompt.Information(tempstr, based.Title);
                    break;
            }

            //if (RecordOperationResult != String.Empty)
            //{
            //    if (RecordOperationResult.IndexOf("Cannot Save") != 0)
            //    {
            //        js.ADD("loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtID") + "') ");
            //        RefreshData();
            //        RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
            //        Prompt.Error(RecordOperationResult, based.Title);
            //    }
            //    else
            //    {
            //        Prompt.Information(RecordOperationResult, based.Title);
            //    }
            //}


            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.IndexOf("Error") != 0 && RecordOperationResult.IndexOf("Cannot") != 0)
                {
                    js.ADD("loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtID") + "') ");
                    RefreshData();
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    Prompt.Information(RecordOperationResult, based.Title);
                }
                else
                {
                    if (RecordOperationResult.IndexOf("Error") != 0)
                    {
                        Prompt.Information(RecordOperationResult, based.Title);
                       
                    }
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
               
                    string update = dal.getUpdateDisable(based.SecurityAccess.RecUser);
                    int docstatus = WebApp.nwobjectInt("txtStatusCode");
                    string UpdateStatus = WebApp.nwobjectText("UpdateStatus");
                    if ((UpdateStatus != "Saved") && (docstatus == 3 || docstatus == 4))
                    {
                        js.ADD("$('#noah-webui-default-Update').enable(true);");
                        js.ADD("$('#noah-webui-default-Save').enable(false);");
                        js.ADD("$('#noah-webui-default-Process').enable(false);");
                        js.ADD("$('#noah-webui-default-Inquire').enable(true);");
                        js.ADD("$('.noah-webui-default-Content_Container').removeClass('noah-webui-disabled');");

                    }
                    else if((UpdateStatus == "") && (docstatus == 0 || docstatus == 0)) //means no data
                    {
                        js.ADD("$('#noah-webui-default-Update').enable(false);");
                        js.ADD("$('#noah-webui-default-Save').enable(false);");
                        js.ADD("$('#noah-webui-default-Process').enable(false);");
                        js.ADD("$('#noah-webui-default-Inquire').enable(false);");
                        js.ADD("$('.noah-webui-default-Content_Container').enable(false);");
                    }
                    else
                    {
                        js.ADD("$('#noah-webui-default-Inquire').enable(true);");
                        js.ADD("$('#noah-webui-default-Update').enable(false);");
                        js.ADD("$('#noah-webui-default-Save').enable(true);");
                        js.ADD("$('#noah-webui-default-Process').enable(true);");
                        js.ADD("$('.noah-webui-default-Content_Container').enable(true);");
                    }

                       
                    DataTable dtjsonlevelconfig = dal.getConfiglvl(WebApp.nwobjectText("idvallugSellerType"));

                    foreach (DataRow r in dtjsonlevelconfig.Rows)
                    {
                        js.ADD($"configlvl('{r["lvl"].ToString()}' , '{r["val"].ToString()}')");
                    }

                    string getSellerLevel = dal.GetSellerRoleLevel(WebApp.nwobjectText("SellerCode"));
                    if (getSellerLevel == "1")
                    {
                        js.ADD("$('#btnSellerLevel').enable(false);");
                    }else
                    {
                        js.ADD("$('#btnSellerLevel').enable(true);");
                    }
                    js.ADD("$('#noah-webui-Toolbox').bindingExport().enable(true);");
                    setSellerImage();
                    setLabel();

                    js.ADD("nwLoading_End('xRefreshBtn');");
                    break;
                case "actBindCollectionEmpty":
                    js.ADD("$('.li-Shortcut').enable(false);");
                    js.ADD("nwLoading_End('xSample')");
                    break;
                case "actGenerateDocDetails":
                    CreateGridModeOfCommisionRelease(true);
                    break;
                case "actGenerateBankAcc":
                    GenerateGrid2(true);
                    break;
                case "actSaveDocDetails":
                    string moduser = based.SecurityAccess.RecUser;
                    DataTable dt_lin = LoadSchemaLINComRel();
                    RecordOperationResult = dal.SaveComRel(dt_lin, moduser);

                    if (RecordOperationResult.IndexOf("Error") == 0 || RecordOperationResult.Contains("Cannot"))
                    {
                        Prompt.Error(RecordOperationResult, based.Title);
                    }
                    else
                    {
                        Prompt.Information(RecordOperationResult, "Attorney-in-fact Information");

                        //dz = dal.CheckIfExists(WebApp.nwobjectText("SellerCode"));

                        //if (dz.Rows.Count <= 0)
                        //{
                        //    GenerateGridSeminar(true);
                        //}
                        //else
                        //{
                        //    GenerateGridSeminar(false);
                        //}

                    }
                    break;
                case "actSaveBankAcc":
                    string moduser2 = based.SecurityAccess.RecUser;
                    DataTable dt_lin2 = LoadSchemaLINComRel();
                    RecordOperationResult = dal.SaveComRel(dt_lin2, moduser2);

                    if (RecordOperationResult.IndexOf("Error") == 0 || RecordOperationResult.Contains("Cannot"))
                    {
                        Prompt.Error(RecordOperationResult, based.Title);
                    }
                    else
                    {
                        Prompt.Information(RecordOperationResult, "Attorney-in-fact Information");

                        //dz = dal.CheckIfExists(WebApp.nwobjectText("SellerCode"));

                        //if (dz.Rows.Count <= 0)
                        //{
                        //    GenerateGridSeminar(true);
                        //}
                        //else
                        //{
                        //    GenerateGridSeminar(false);
                        //}

                    }
                    break;
                case "actCopyFrom":
                    //CreateGrid(false);
                    js.ADD("checkDuplicate()");
                    break;
                case "actUpdate":
                    string SellerInfoUpdate = dal.SellerInfoUpdate(WebApp.nwobjectText("SellerCode"));
                    break;
                case "actCheckSellerDedup":
                    int isIndividual = WebApp.nwobjectBool("custType") ? 1 : 0;
                    string sellerName =WebApp.nwobjectText("txtSellername");
                    string sellerCode = WebApp.nwobjectText("SellerCode");
                    string birthDate = WebApp.nwobjectText("txtBirthdate");
                    string regTIN = WebApp.nwobjectText("regTIN");
                    string frstName = WebApp.nwobjectText("txtFirstName");
                    string lastName = WebApp.nwobjectText("txtLastName");
                    string middleName = WebApp.nwobjectText("txtMiddleName");
                    
                    int isExist = dal.checkSellerDuplicate(isIndividual, sellerName, sellerCode, birthDate, regTIN ,lastName , frstName , middleName );
                    if (isExist == 1 && isIndividual == 1)
                    {
                        Prompt.Information("Cannot Continue. A record already exist with the same Name and Birthdate.", based.Title);
                        js.ADD("$('#txtBirthdate').val('')");
                    }else if (isExist == 1 && isIndividual == 0)
                    {
                        Prompt.Information("Cannot Continue. A record already exist with the same Registered Name and Registered TIN.", based.Title);
                        js.ADD("$('#txtVATRegTIN').val('')");
                        js.ADD("$('#txtNonVATRegTIN').val('')");
                    }

                        js.ADD("nwLoading_End('actCheckSellerDedup')");
                    break;

                case "actSaveSellerImage":
                    string error = "";
                    error = dal.saveImage(WebApp.nwobjectText("SellerCode"), WebApp.nwobjectText("path"));
                    if (error.ToLower().Contains("success"))
                    {
                        setSellerImage();
                        Prompt.Information("Upload is successful.", based.Title);
                    }
                    js.ADD("nwLoading_End('actSaveSellerImage')");
                    break;

                case "actSaveSignature":
                    error = "";
                    error = dal.saveSignature(WebApp.nwobjectText("SellerCode"), WebApp.nwobjectText("path"));
                    if (error.ToLower().Contains("success"))
                    {
                        setSellerImage();
                        Prompt.Information("Upload is successful.", based.Title);
                    }
                    js.ADD("nwLoading_End('actSaveSellerImage')");
                    break;

                case "actSalutation":
                    DataTable dt = SFObject.LoadDataTable(dal.GetSalutationData(WebApp.nwobjectText("salutation"))
                   , this.UserDefinedConnectionString);

                    string gendercode = dt.Rows[0]["Gender"].ToString();
                    string genderdesc = dt.Rows[0]["genderDesc"].ToString();

                    js.makeValueText("#idvallugGender", gendercode);
                    js.makeValueText("#descvallugGender", genderdesc);

                    js.ADD("$('#idvallugCivilStatus').val('')");
                    js.ADD("$('#descvallugCivilStatus').val('')");

                    if (dt.Rows.Count == 1)
                    {
                        string civilcode = dt.Rows[0]["civilstatus"].ToString();
                        string civildesc = dt.Rows[0]["civilDesc"].ToString();

                        js.makeValueText("#idvallugCivilStatus", civilcode);
                        js.makeValueText("#descvallugCivilStatus", civildesc);
                    }

                    js.ADD("nwLoading_End('actSalutation')");
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
                    standardBL.PrimaryKey = "SellerCode";
                    
                        strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(based.SecurityAccess.RecUser), this.UserDefinedConnectionString);
                    
                    break;



            }

            return strFinal;
        }


        private void setLabel()
        {
            string level1 = dal.getLabel("Level1");
            string level2 = dal.getLabel("Level2");

            js.makeValueText("#lblSellerGroup", level1);
            js.ADD("$('#lblSellerGroup').text('" + level1 + "')");
            js.makeValueText("#lblSellerType", level2);
            js.ADD("$('#lblSellerType').text('" + level2 + "')");
            js.makeValueText("#Level1", level1);
            js.makeValueText("#Level2", level2);

            js.ADD("setLabelText()");
        }
        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#txtSellerCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerCode"); 
            SFObject.SetControlBinding("#rbRegular", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "rdbRegular");
            SFObject.SetControlBinding("#rbIrregular", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "rdbIrregular");
            SFObject.SetControlBinding("#rbIndividual", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "rdbIndividual");
            SFObject.SetControlBinding("#rbCompany", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "rdbCompany");
            //SFObject.SetControlBinding("#rbCompany", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "Corporate");
            SFObject.SetControlBinding("#txtCrossReference", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerCrossRefCode");
            SFObject.SetControlBinding("#txtSellername", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerName");
            //SFObject.SetControlBinding("#txtCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerGroup");
            //SFObject.SetControlBinding("#txtDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerGroupDesc");

            SFObject.SetControlBinding("#idvallugSellerType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerType");
            SFObject.SetControlBinding("#descvallugSellerType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerTypeDesc");

            SFObject.SetControlBinding("#idvallugSellergroup", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerGroup");
            SFObject.SetControlBinding("#descvallugSellergroup", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerGroupDesc");

            SFObject.SetControlBinding("#idvallugSellerRole", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerRole");
            SFObject.SetControlBinding("#descvallugSellerRole", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerRoleDesc");
            SFObject.SetControlBinding("#idvallugSellerStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerStatus");
            SFObject.SetControlBinding("#descvallugSellerStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerStatusDesc");
            SFObject.SetControlBinding("#txtPRCNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PRCLicenseNo");
            SFObject.SetControlBinding("#idvallugSalutation", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Salutation");
            SFObject.SetControlBinding("#descvallugSalutation", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SalutationDesc");
            SFObject.SetControlBinding("#txtLastName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LastName");
            SFObject.SetControlBinding("#txtFirstName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "FirstName");
            SFObject.SetControlBinding("#txtMiddleName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MiddleName");
            SFObject.SetControlBinding("#txtMI", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MiddleInitial");
            SFObject.SetControlBinding("#txtMaidenName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MaidenName");
            SFObject.SetControlBinding("#txtMotherMaidenName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MotherMaidenName");
            SFObject.SetControlBinding("#idvallugNameSuffix", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "NameSuffix");
            SFObject.SetControlBinding("#descvallugNameSuffix", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "NameSuffixDesc");
            SFObject.SetControlBinding("#txtBirthdate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "BirthDate");
            SFObject.SetControlBinding("#idvallugGender", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Gender");
            SFObject.SetControlBinding("#descvallugGender", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "GenderDesc");
            SFObject.SetControlBinding("#idvallugCivilStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CivilStatus");
            SFObject.SetControlBinding("#descvallugCivilStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CivilStatusDesc");
            SFObject.SetControlBinding("#idvallugNationality", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Nationality");
            SFObject.SetControlBinding("#descvallugNationality", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "NationalityDesc");
            SFObject.SetControlBinding("#txtPlaceofBirth", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PlaceofBirth");
            SFObject.SetControlBinding("#txtIndividualTIN", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TIN");
            SFObject.SetControlBinding("#txtRegisteredName", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RegisteredName");
            SFObject.SetControlBinding("#rbVAT", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "VAT");
            SFObject.SetControlBinding("#rbnonVAT", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "NonVAT");
            SFObject.SetControlBinding("#txtAge", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Age");

            SFObject.SetControlBinding("#txtVATRegTIN", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "VATRegTIN");
            SFObject.SetControlBinding("#txtNonVATRegTIN", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "NonVATRegTIN");
            SFObject.SetControlBinding("#idvallugDefaultVATCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "DefaultVATTaxCode");
            SFObject.SetControlBinding("#descvallugDefaultVATCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "DefVATTaxCodeDesc");
            SFObject.SetControlBinding("#idvallugDefaultCWTTaxCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "DefaultCWTTaxCode");
            SFObject.SetControlBinding("#descvallugDefaultCWTTaxCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "DefCWTTaxCodeDesc");
            SFObject.SetControlBinding("#txtSSSNumber", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SSSNumber");
            SFObject.SetControlBinding("#txtPagIBIGNumber", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PagIBIGNumber");
            SFObject.SetControlBinding("#txtPhilHealthNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PhilHealthNumber");
            SFObject.SetControlBinding("#txtMobile", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Mobile");
            SFObject.SetControlBinding("#txtTelephone", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Telephone");
            SFObject.SetControlBinding("#txtEmail", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Email");
            SFObject.SetControlBinding("#txtsellerAdd1", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerAddress");
            SFObject.SetControlBinding("#txtSellerAdd2", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerAddress2");
            SFObject.SetControlBinding("#txtRecruitDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RecruitmentDate");
            SFObject.SetControlBinding("#idvallugRecruitedBy", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RecruitedBy");
            SFObject.SetControlBinding("#descvallugRecruitedBy", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RecreuitedByDesc");
            SFObject.SetControlBinding("#txtFirstSaleDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "FirstSaleDate");
            SFObject.SetControlBinding("#txtRecordStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "StatusDesc");
            SFObject.SetControlBinding("#txtStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Status");
            SFObject.SetControlBinding("#txtUpdateStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "UpdateStatusDesc");
            SFObject.SetControlBinding("#txtStatusCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "status");
            SFObject.SetControlBinding("#txtUpdateButton", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "UpdateStatusButton");

            SFObject.SetControlBinding("#level2", "text", "", "#noah-webui-Toolbox-BindingNavigator", "LastLevelLabel");
            SFObject.SetControlBinding("#level1", "text", "", "#noah-webui-Toolbox-BindingNavigator", "2ndLastLevelLabel");
            

            SFObject.SetControlBinding("#idvallugLvl4", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Level4");
            SFObject.SetControlBinding("#descvallugLvl4", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Level4Desc");

            SFObject.SetControlBinding("#txtPassportIDNumber", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PassportID");
            SFObject.SetControlBinding("#txtPhilHealthNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PhilHealthNumber");
            SFObject.SetControlBinding("#idvallugMktgGrpCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MarketingGroup");
            SFObject.SetControlBinding("#descvallugMktgGrpCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MarketingGroupDesc");
            SFObject.SetControlBinding("#idvallugLvl1", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Level1");
            SFObject.SetControlBinding("#descvallugLvl1", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Level1Desc");
            SFObject.SetControlBinding("#idvallugLvl3", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Level3");
            SFObject.SetControlBinding("#descvallugLvl3", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Level3Desc");
            SFObject.SetControlBinding("#idvallugLvl2", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Level2");
            SFObject.SetControlBinding("#descvallugLvl2", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Level2Desc");
            SFObject.SetControlBinding("#idvallugLocSegment", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LocationSegment");
            SFObject.SetControlBinding("#descvallugLocSegment", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LocationSegmentDesc");
            SFObject.SetControlBinding("#idvallugSellerContractType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ContractType");
            SFObject.SetControlBinding("#descvallugSellerContractType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ContractTypeDesc");
            SFObject.SetControlBinding("#txtContractDurationFrom", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ContractDurationFrom");
            SFObject.SetControlBinding("#txtContractDurationTo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ContractDurationTo");
            SFObject.SetControlBinding("#idvallugSellerCotractStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ContractStatus");
            SFObject.SetControlBinding("#descvallugSellerCotractStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ContractStatusDesc");


            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");
        }

        private void BindCollection()
        {
            //string level1 = dal.getLabel("Level1");
            //string level2 = dal.getLabel("Level2");
            js.ADD("$('.li-Shortcut').enable(true);");
            DataTable dtlbl = dal.getlevelLabel(WebApp.nwobjectText("idvallugSellerType"));
            if (dtlbl.Rows.Count > 0)
            {
                DataRow rw = dtlbl.Rows[0];
                string level1 = rw["Level1"].ToString();
                string level2= rw["Level2"].ToString();
                string level3 = rw["Level3"].ToString();
                string level4 = rw["Level4"].ToString();
                string level5 = rw["Level5"].ToString();
                string level6 = rw["Level6"].ToString();
                string level7 = rw["Level7"].ToString();
                string level8 = rw["Level8"].ToString();
                string level9 = rw["Level9"].ToString();
                string level10 = rw["Level10"].ToString();
                js.ADD($"func_setlabelLevel('{level1.Replace("'" , "/")}' , '{ level2.Replace("'", "/") } ' , '{ level3.Replace("'", "/")}' , '{ level4.Replace("'", "/") }' , '{ level5.Replace("'", "/") }' , '{ level6.Replace("'", "/")}' , '{ level7.Replace("'", "/") }' , '{ level8.Replace("'", "/") } ','{ level9.Replace("'", "/") }' , '{ level10.Replace("'", "/") }')");
            }
       
            js.ADD("afterbinding()");
            js.ADD("cust_GetPara();");

            string status = SFObject.returnText($"Select code from sg.LegendStatus where description ='{WebApp.nwobjectText("txtRecordStatus")}'", UserDefinedConnectionString);
            js.ADD("status = '" + status + "'");

            string updateStatus = WebApp.nwobjectText("txtUpdateStatus");

            string SellerCode = WebApp.nwobjectText("SellerCode");
            string Used = dal.SellerCode(SellerCode);
            if (Used == "1")
            {
                js.ADD("DisabledAll();");

                bool checker = dal.checkifEnable(based.SecurityAccess.RecUser);
                string SellerInfoUpdateStatus = dal.SellerInfoUpdateStatus(SellerCode);

                if (SellerInfoUpdateStatus == "1" || SellerInfoUpdateStatus == "2") //checker && 
                {
                    js.ADD("$('.btnUpdate').enable(false);");
                    js.ADD("$('#noah-webui-Toolbox').bindingProcess().enable(true);");
                }
                else
                {
                    js.ADD("$('.btnUpdate').enable(true);");
                }

            }

            if(status == "2" || status == "3")
            {
                js.ADD("DisabledAll();");
            }

            else
            {
                js.ADD("$('.btnUpdate').enable(false);");
            }

            if (status == "2" || status == "3")
            {
                js.ADD("$('#noah-webui-Toolbox').bindingDelete().enable(false);");
            }

            if ((status == "2" || status == "3") && (updateStatus == "For Approval" || updateStatus == "Approved" || updateStatus == ""))
            {
                js.ADD("$('#noah-webui-Toolbox').bindingProcess().enable(true);");
            }

            else
            {
                js.ADD("$('#noah-webui-Toolbox').bindingProcess().enable(true);");
            }
        }

        private string ValidateData(string Status)
        {
            string errorResult = String.Empty;
            string tinExist = dal.getExistTIN(WebApp.nwobjectText("txtIndividualTIN"));
            string vatTinExist = dal.getExistVATTIN(WebApp.nwobjectText("txtVATRegTIN"));
            string nonVatExist = dal.getExistNonVATTIN(WebApp.nwobjectText("txtNonVATRegTIN"));

            //if (WebApp.nwobjectText("idvallugLocSegment").Length <= 0)
            //{
            //    errorResult += "Cannot " + Status + ". Location Segment is required. \n";
            //}

            if (WebApp.nwobjectText("idvallugMktgGrpCode")!= "")
            {
                if (WebApp.nwobjectText("idvallugSellerType").Length <= 0)
                {
                    errorResult += "Cannot " + Status + ". " + WebApp.nwobjectText("txtLevel2").Replace("*", "") + " is required. \n";
                }
            }
        

            if (WebApp.nwobjectText("idvallugSellerRole").Length <= 0)
            {
                errorResult += "Cannot " + Status + ". Seller Role is required. \n";
            }

            if (WebApp.nwobjectText("idvallugSellerStatus").Length <= 0)
            {
                errorResult += "Cannot " + Status + ". Seller Status is required. \n";
            }

            if (WebApp.nwobjectText("txtMobile").Length <= 0 && WebApp.nwobjectText("txtTelephone").Length <=0)
            {
                errorResult += "Cannot " + Status + ". Mobile or Telephone Number is required. \n";
            }

            if (WebApp.nwobjectText("txtEmail").Length <= 0)
            {
                errorResult += "Cannot " + Status + ". Email is required. \n";
            }

            if (WebApp.nwobjectText("txtsellerAdd1").Length <= 0)
            {
                errorResult += "Cannot " + Status + ". Seller Address 1 is required. \n";
            }

            if (WebApp.nwobjectText("txtSellerAdd2").Length <= 0)
            {
                errorResult += "Cannot " + Status + ". Seller Address 2 is required. \n";
            }

            //MAM Document Dtls
            DataTable dtDoc1 = dal.LoadDocumentDetails(WebApp.nwobjectText("txtSellerCode"), "DOCD");
            DataTable dtDoc2 = dal.LoadDocumentDetails(WebApp.nwobjectText("txtSellerCode"), "ARD");
            int ctr = 0;
            for(int i=0;i<=dtDoc1.Rows.Count - 1; i++)
            {
               if(dtDoc1.Rows[i][0].ToString() == "1" && dtDoc1.Rows[i][1].ToString() == "False")
                {
                    ctr++;
                }
            }
            if (ctr >= 1)
                errorResult += "Cannot Proceed. Please comply first all required document(s) for the Seller Enrolment in the Document Details tab. \n";

            ctr = 0;

            for (int j = 0; j <= dtDoc2.Rows.Count - 1; j++)
            {
                if (dtDoc2.Rows[j][0].ToString() == "1" && dtDoc2.Rows[j][1].ToString() == "False")
                {
                    ctr++;
                }
            }
            if (ctr >= 1)
                errorResult = "Cannot Proceed. Please comply first all required document(s) for the Authorized Representative Enrolment. \n";
            //end

            string GetSellerRoleDetails = dal.GetSellerRoleDetails(WebApp.nwobjectText("SellerCode"));
            string getSellerLevel = dal.GetSellerRoleLevel(WebApp.nwobjectText("SellerCode"));
            //SELECT* FROM RE.SellerRoleDetailsHDR WHERE SellerCode = ''

            if ((getSellerLevel != "1"  && Status == "Process"))
            {
                if (GetSellerRoleDetails != "1")
                {
                    errorResult += "Cannot " + Status + ". Seller Roles Hierarchy should be completed. \n";
                }
                
            }

            string GetDocumentDetails = SFObject.returnText($"SELECT TOP 1 1 FROM RE.SellerDocumentDetailsHDR WHERE SellerCode = '{WebApp.nwobjectText("SellerCode")}'", UserDefinedConnectionString);
            //if (Status == "Process")
            //{
                if (GetDocumentDetails != "1" && Status == "Process")
                {
                    errorResult += "Cannot " + Status + ". Document Details should be completed. \n";
                }
            //}

            if (WebApp.nwobjectText("idvallugDefaultCWTTaxCode").Length <= 0)
            {
                errorResult += "Cannot " + Status + ". Default CWT Tax Code is required. \n";
            }

            //if (WebApp.nwobjectText("idvallugDefaultVATCode").Length <= 0)
            //{
            //    errorResult += "Cannot " + Status + ". Default VAT Tax Code is required. \n";
            //}
            //if (WebApp.nwobjectText("idvallugSellerContractType").Length <= 0)
            //{
            //    errorResult += "Cannot " + Status + ". Seller Contract Type is required. \n";
            //}
            //if (WebApp.nwobjectText("txtContractDurationFrom").Length <= 0)
            //{
            //    errorResult += "Cannot " + Status + ". Contract Duration From is required. \n";
            //}
            //if (WebApp.nwobjectText("txtContractDurationTo").Length <= 0)
            //{
            //    errorResult += "Cannot " + Status + ". Contract Duration To is required. \n";
            //}
            //if (WebApp.nwobjectText("idvallugSellerCotractStatus").Length <= 0)
            //{
            //    errorResult += "Cannot " + Status + ". Seller Contract Status is required. \n";
            //}
            //if (WebApp.nwobjectText("idvallugMktgGrpCode").Length <= 0)
            //{
            //    errorResult += "Cannot " + Status + ". Marketing Group is required. \n";
            //}
          
            int checkifDataExists = dal.checkifDataExists((WebApp.nwobjectBool("rbIndividual") == true ? 1 : 0)  , WebApp.nwobjectText("txtSellerCode"), WebApp.nwobjectText("txtBirthdate"), WebApp.nwobjectText("txtSellername").Trim(), WebApp.nwobjectText("txtRegisteredName").Trim());

            if (checkifDataExists == 1 && isNewRow && Status == "Save")
            {
                errorResult += "Cannot " + Status + ". Record already exists. \n";
            }


            if (bool.Parse((WebApp.nwobjectText("rbIndividual"))))
            {
                if (WebApp.nwobjectText("idvallugSalutation").Length <= 0)
                {
                    errorResult += "Cannot " + Status + ". Salutation/Title is required. \n";
                }
                if (WebApp.nwobjectText("txtLastName").Length <= 0)
                {
                    errorResult += "Cannot " + Status + ". Last Name is required. \n";
                }
                if (WebApp.nwobjectText("txtFirstName").Length <= 0)
                {
                    errorResult += "Cannot " + Status + ". First Name is required. \n";
                }
                if (WebApp.nwobjectText("txtBirthdate").Length <= 0)
                {
                    errorResult += "Cannot " + Status + ". Birth Date is required. \n";
                }
                else
                {
                    if (WebApp.nwobjectInt("txtAge") < 18)
                    {
                        errorResult += "Cannot " + Status + ". Seller must not be below the age of 18. \n";
                    }
                }
                if (WebApp.nwobjectText("idvallugGender").Length <= 0)
                {
                    errorResult += "Cannot " + Status + ". Gender is required. \n";
                }
                if (WebApp.nwobjectText("idvallugCivilStatus").Length <= 0)
                {
                    errorResult += "Cannot " + Status + ". Civil Status is required. \n";
                }
                if (WebApp.nwobjectText("idvallugNationality").Length <= 0)
                {
                    errorResult += "Cannot " + Status + ". Nationality is required. \n";
                }
                if (WebApp.nwobjectText("txtIndividualTIN").Length <= 0)
                {
                    errorResult += "Cannot " + Status + ". Individual TIN is required. \n";
                }
                
                if(tinExist == "1" && Status == "Save" && isNewRow)
                {
                    errorResult += "Cannot " + Status + ". Duplicate TIN is not allowed. \n";
                }



            }

            else if (bool.Parse((WebApp.nwobjectText("rbCompany"))))
            {
                if (WebApp.nwobjectText("txtRegisteredName").Length <= 0)
                {
                    errorResult += "Cannot " + Status + ". Registered Name is required. \n";
                }
                if (WebApp.nwobjectBool("rbVAT") && WebApp.nwobjectText("txtVATRegTIN") == "")
                {
                    errorResult += "Cannot " + Status + ". VAT Reg. TIN is required. \n";
                }

                if (WebApp.nwobjectBool("rbVAT") && WebApp.nwobjectText("txtVATRegTIN") != "" && Status == "Save" && isNewRow)
                {
                    if(vatTinExist == "1")
                    {
                        errorResult += "Cannot " + Status + ". Duplicate VAT Reg. TIN is not allowed. \n";
                    }

                }
                if (WebApp.nwobjectBool("rbnonVAT") && WebApp.nwobjectText("txtNonVATRegTIN") == "" && Status == "Save")
                {
                    errorResult += "Cannot " + Status + ". Non-VAT Reg. TIN is required. \n";
                }

                if (WebApp.nwobjectBool("rbnonVAT") && WebApp.nwobjectText("txtNonVATRegTIN") != "" && Status == "Save" && isNewRow)
                {
                    if(nonVatExist == "1")
                    {
                        errorResult += "Cannot " + Status + ". Duplicate Non-VAT Reg is not allowed. \n";
                    }
                    
                }

            }


            //if (Status == "Process")
            //{
            //    int updateButton = WebApp.nwobjectInt("txtUpdateButton");
            //    if (updateButton == 1)
            //    {
            //        int checkseller = dal.checkSellerRole(WebApp.nwobjectText("SellerCode"), WebApp.nwobjectText("level1Code"));
            //        if (checkseller != 1)
            //        {
            //            errorResult += "Cannot " + Status + ". Kindly update Seller Roles Hierarchy. \n";
            //        }
            //    }
            //}


            //if ((getSellerLevel != "1" && Status == "Process"))
            //{
            //    if (GetSellerRoleDetails != "1")
            //    {
            //        errorResult += "Cannot " + Status + ". Seller Roles Hierarchy should be completed. \n";
            //    }

            //}

            return errorResult;

        }


        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema();
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["SellerCode"] = WebApp.nwobjectText("txtSellerCode");
            dr["SellerCategory"] = WebApp.nwobjectText("rbIndividual") == "true" ? 1 : 0;
            dr["SellerClassification"] = WebApp.nwobjectBool("rbRegular")  ? 1 : 0;
            dr["SellerCrossRefCode"] = WebApp.nwobjectText("txtCrossReference");
            dr["SellerName"] = WebApp.nwobjectText("txtSellername");
            dr["SellerGroup"] = WebApp.nwobjectText("idvallugSellergroup");
            dr["SellerType"] = WebApp.nwobjectText("idvallugSellerType");
            dr["SellerRole"] = WebApp.nwobjectText("idvallugSellerRole");
            //dr["SellerRole"] = WebApp.nwobjectText("idvallugLvl1");
            dr["SellerStatus"] = WebApp.nwobjectText("idvallugSellerStatus");
            dr["PRCLicenseNo"] = WebApp.nwobjectText("txtPRCNo");
            dr["Salutation"] = WebApp.nwobjectText("idvallugSalutation");
            dr["LastName"] = WebApp.nwobjectText("txtLastName");
            dr["FirstName"] = WebApp.nwobjectText("txtFirstName");
            dr["MiddleName"] = WebApp.nwobjectText("txtMiddleName");
            dr["MiddleInitial"] = WebApp.nwobjectText("txtMI");
            dr["MaidenName"] = WebApp.nwobjectText("txtMaidenName");
            dr["MotherMaidenName"] = WebApp.nwobjectText("txtMotherMaidenName");
            dr["NameSuffix"] = WebApp.nwobjectText("idvallugNameSuffix");
            dr["BirthDate"] = WebApp.nwobjectText("txtBirthdate") == string.Empty ? (object)DBNull.Value : WebApp.nwobjectText("txtBirthdate");
            dr["Gender"] = WebApp.nwobjectText("idvallugGender");
            dr["CivilStatus"] = WebApp.nwobjectText("idvallugCivilStatus");
            dr["Nationality"] = WebApp.nwobjectText("idvallugNationality");
            dr["BirthPlace"] = WebApp.nwobjectText("txtPlaceofBirth");
            dr["TIN"] = WebApp.nwobjectText("txtIndividualTIN");
            dr["RegisteredName"] = WebApp.nwobjectText("txtRegisteredName");
            dr["CorpVATRegType"] = WebApp.nwobjectText("rbVAT") == "true" ? 1 : 0;
            dr["VATRegTIN"] = WebApp.nwobjectText("txtVATRegTIN");
            dr["NonVATRegTIN"] = WebApp.nwobjectText("txtNonVATRegTIN");
            dr["DefaultVATTaxCode"] = WebApp.nwobjectText("idvallugDefaultVATCode");
            dr["DefaultCWTTaxCode"] = WebApp.nwobjectText("idvallugDefaultCWTTaxCode");
            dr["SSSNumber"] = WebApp.nwobjectText("txtSSSNumber");
            dr["PagIBIGNumber"] = WebApp.nwobjectText("txtPagIBIGNumber");
            dr["PhilHealthNumber"] = WebApp.nwobjectText("txtPhilHealthNo");
            dr["Mobile"] = WebApp.nwobjectText("txtMobile");
            dr["Telephone"] = WebApp.nwobjectText("txtTelephone");
            dr["Email"] = WebApp.nwobjectText("txtEmail");
            dr["SellerAddress"] = WebApp.nwobjectText("txtsellerAdd1");
            dr["SellerAddress2"] = WebApp.nwobjectText("txtSellerAdd2");

            dr["LocationSegment"] = WebApp.nwobjectText("idvallugLocSegment");
            dr["MarketingGroup"] = WebApp.nwobjectText("idvallugMktgGrpCode");
            dr["PassportID"] = WebApp.nwobjectText("txtPassportIDNumber");
            dr["ContractType"] = WebApp.nwobjectText("idvallugSellerContractType");
            dr["ContractDurationFrom"] = WebApp.nwobjectText("txtContractDurationFrom") == string.Empty ? (object)DBNull.Value : WebApp.nwobjectText("txtContractDurationFrom");
            dr["ContractDurationTo"] = WebApp.nwobjectText("txtContractDurationTo") == string.Empty ? (object)DBNull.Value : WebApp.nwobjectText("txtContractDurationTo");

            dr["RecruitmentDate"] = WebApp.nwobjectText("txtRecruitDate") == string.Empty ? (object)DBNull.Value : WebApp.nwobjectText("txtRecruitDate");
            dr["RecruitedBy"] = WebApp.nwobjectText("idvallugRecruitedBy");
            dr["FirstSaleDate"] = WebApp.nwobjectText("txtFirstSaleDate") == string.Empty ? (object)DBNull.Value : WebApp.nwobjectText("txtFirstSaleDate");
            dr["ContractStatus"] = WebApp.nwobjectText("idvallugSellerCotractStatus");

            //dr["Level1"] = WebApp.nwobjectText("level1Code") == "" ? null : WebApp.nwobjectText("level1Code");
            //dr["Level2"] = WebApp.nwobjectText("level2Code") == "" ? null : WebApp.nwobjectText("level2Code");
            //dr["Level3"] = WebApp.nwobjectText("level3Code") == "" ? null : WebApp.nwobjectText("level3Code");
            //dr["Level4"] = WebApp.nwobjectText("level4Code") == "" ? null : WebApp.nwobjectText("level4Code");
            //dr["Level5"] = WebApp.nwobjectText("level5Code") == "" ? null : WebApp.nwobjectText("level5Code");
            //dr["Level6"] = WebApp.nwobjectText("level6Code") == "" ? null : WebApp.nwobjectText("level6Code");
            //dr["Level7"] = WebApp.nwobjectText("level7Code") == "" ? null : WebApp.nwobjectText("level7Code");
            //dr["Level8"] = WebApp.nwobjectText("level8Code") == "" ? null : WebApp.nwobjectText("level8Code");
            //dr["Level9"] = WebApp.nwobjectText("level9Code") == "" ? null : WebApp.nwobjectText("level9Code");
            //dr["Level10"] = WebApp.nwobjectText("level10Code") == "" ? null : WebApp.nwobjectText("level10Code");

            dr["Level1"] = WebApp.nwobjectText("idvallugLvl1") == "" ? null : WebApp.nwobjectText("idvallugLvl1");
            dr["Level2"] = WebApp.nwobjectText("idvallugLvl2") == "" ? null : WebApp.nwobjectText("idvallugLvl2");
            dr["Level3"] = WebApp.nwobjectText("idvallugLvl3") == "" ? null : WebApp.nwobjectText("idvallugLvl3");
            dr["Level4"] = WebApp.nwobjectText("idvallugLvl4") == "" ? null : WebApp.nwobjectText("idvallugLvl4");
            dr["Level5"] = WebApp.nwobjectText("idvallugLvl5") == "" ? null : WebApp.nwobjectText("idvallugLvl5");
            dr["Level6"] = WebApp.nwobjectText("idvallugLvl6") == "" ? null : WebApp.nwobjectText("idvallugLvl6");
            dr["Level7"] = WebApp.nwobjectText("idvallugLvl7") == "" ? null : WebApp.nwobjectText("idvallugLvl7");
            dr["Level8"] = WebApp.nwobjectText("idvallugLvl8") == "" ? null : WebApp.nwobjectText("idvallugLvl8");
            dr["Level9"] = WebApp.nwobjectText("idvallugLvl9") == "" ? null : WebApp.nwobjectText("idvallugLvl9");
            dr["Level10"] = WebApp.nwobjectText("idvallugLvl10") == "" ? null : WebApp.nwobjectText("idvallugLvl10");

            //dr["LastLevelLabel"] = WebApp.nwobjectText("level2").Replace("*" , "");
            //dr["2ndLastLevelLabel"] = WebApp.nwobjectText("level1").Replace("*", "");

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
            // CreateGrid(true);
            var serverdate = SFObjects.GetServerDateTime(this.UserDefinedConnectionString);
            js.ADD("getCSD = '" + serverdate.ToString("MM/dd/yyy") + "'");

            if (based.isInterface == true) dal.UpdateVersion();
            string recuser = based.SecurityAccess.RecUser;
            js.ADD("recuser= '" + recuser + "'");

            string server = "";
            server = dal.ServerLink();

            //#if DEBUG
            //server = server.Replace("../../../..", "http://209.146.24.59:83/");
            //js.ADD("nwTrustedLinks.push('209.146.24.59:83');");
            //#endif

            js.makeValueText("#txtServerLink", server);


            nwToolBox.bindingNavigatorRefreshItem.Visible = true;

            //LAM   viewing
            DataTable sellerinfo = SFObject.LoadDataTable($"SELECT SellerCode, status FROM RE.SellerInformation WHERE SellerCode ='{based.SecurityAccess.RecUser}'", this.UserDefinedConnectionString);
            //if seller is NOT in seller information BUT is for viewing
            if (based.isInterface == false)
            {
                js.ADD("seller = '" + based.SecurityAccess.RecUser + "'");
                js.ADD("ViewingToolbox();");
                js.ADD("$('#btnUpdateSellerRole').css('display', 'none')");
                js.ADD("$('#btnViewUpdateHist').css('display', 'none')");
            }
            //if user is in seller info
            for (int i = 0; i < sellerinfo.Rows.Count; i++)
            {
                string seller = sellerinfo.Rows[0]["SellerCode"].ToString();
                //string status = sellerinfo.Rows[0]["status"].ToString();

                js.ADD("seller = '" + seller + "'");
                //js.ADD("status = '" + status + "'");

                if (seller == based.SecurityAccess.RecUser)
                {
                    js.ADD("ViewingToolbox();");
                    js.ADD("$('#btnUpdateSellerRole').css('display', 'none')");
                    js.ADD("$('#btnViewUpdateHist').css('display', 'none')");

                }
            }

            setLabel();

        }

        private void RefreshData()
        {

            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
            js.ADD("RefreshData()");

        }


        private DataTable LoadSchemaLINComRel()
        {

            #region don't change
            DataTable dtLINTemp = new DataTable();
            dtLINTemp = dal.LoadSchemaLINComRel();
            #endregion

            DataTable dt_details = WebApp.nwGridData(WebApp.nwobjectText("nwGridMainCon"));


            foreach (DataRow dr_details in dt_details.Rows)
            {
                if (dr_details[SPR_COMMRELCODE].ToString().Trim() == "")
                    continue;

                DataRow dr = dtLINTemp.NewRow();

                dr["DocControlCode"] = dr_details[SPR_COMMRELCODE].ToString();

                dtLINTemp.Rows.Add(dr);
            }

            #region don't change
            dtLINTemp.AcceptChanges();
            #endregion


            return dtLINTemp;
        }

        private DataTable LoadSchemaLINBankAcc()
        {

            #region don't change
            DataTable dtLINTemp = new DataTable();
            dtLINTemp = dal.LoadSchemaLINComRel();
            #endregion

            DataTable dt_details = WebApp.nwGridData(WebApp.nwobjectText("nwGridMainConBank"));

           //private const int
           // SPR_BANKCODE = 1,
           // SPR_BANKNAME = 2,
           // SPR_BRANCH = 3,
           // SPR_ACCNO = 4,
           // SPR_ACCNAME = 5,
           // SPR_ACCTYPE = 6,
           // SPR_ACCTYPEDesc = 7,
           // SPR_PARTICULARS = 8;

            foreach (DataRow dr_details in dt_details.Rows)
            {
                if (dr_details[SPR_BANKCODE].ToString().Trim() == "" &&
                    dr_details[SPR_BRANCH].ToString().Trim() == "" &&
                    dr_details[SPR_ACCNO].ToString().Trim() == "" &&
                    dr_details[SPR_ACCNAME].ToString().Trim() == "")
                    continue;

                DataRow dr = dtLINTemp.NewRow();

                dr["DocControlCode"] = dr_details[SPR_BANKCODE].ToString();
                dr["DocControlCode"] = dr_details[SPR_BRANCH].ToString();
                dr["DocControlCode"] = dr_details[SPR_ACCNO].ToString();
                dr["DocControlCode"] = dr_details[SPR_ACCNAME].ToString();
                dr["DocControlCode"] = dr_details[SPR_ACCTYPE].ToString();
                dr["DocControlCode"] = dr_details[SPR_ACCTYPE].ToString();


                dtLINTemp.Rows.Add(dr);
            }

            #region don't change
            dtLINTemp.AcceptChanges();
            #endregion


            return dtLINTemp;
        }

        private DataTable getFilteredGrid(DataTable dt, string colName, string colSort)
        {
            var dtDetails = new DataTable();
            dtDetails = new DataView(dt, colName, colSort, DataViewRowState.CurrentRows).ToTable();
            return dtDetails;
        }

        private string getGridColName(int col, bool hasRemoveNull)
        {
            return string.Format("column{0} {1}", (col - 1).ToString(), hasRemoveNull ? "<> ''" : "").Trim(); ;
        }

        private void setSellerImage()
        {
            string sellerCode = WebApp.nwobjectText("SellerCode");
            //string jquery = "recuser = encodeURIComponent(\"" + based.SecurityAccess.RecUser + "\");$('#profile-img').css(\"background-image\",\"url('SellerImage.ashx?sellerCode=" + sellerCode + "&recuser=\"+recuser+\"&uploadTrigger=0&r=" + Guid.NewGuid().ToString().Replace("-", string.Empty) + "')\");";
            //string signature = "recuser = encodeURIComponent(\"" + based.SecurityAccess.RecUser + "\");$('#profile-img-signature').css(\"background-image\",\"url('SellerImage.ashx?sellerCode=" + sellerCode + "&recuser=\"+recuser+\"&uploadTrigger=1&r=" + Guid.NewGuid().ToString().Replace("-", string.Empty) + "')\");";
            ////string jquery = "recuser = encodeURIComponent(\"" + based.SecurityAccess.RecUser + "\");$('#profile-img').css(\"background-image\",\"url('SellerImage.ashx?sellerCode=" + sellerCode + "&recuser=\"+recuser+\"&r=" + Guid.NewGuid().ToString().Replace("-", string.Empty) + "')\");";
            //js.ADD(jquery);
            //js.ADD(signature);
            //LAM
            string imagepath = dal.getSellerImagePath(sellerCode).Replace("\\", "//");
            string signaturePath = dal.getSellerSignaturePath(sellerCode).Replace("\\", "//");
            js.ADD("sellerImagepath= '" + imagepath + "'");
            js.ADD("sellerSignPath= '" + signaturePath + "'");
            js.ADD($"func_setSellerImage()");
            js.ADD($"func_setSellerSignImage()");
        }

        public void CreateGridModeOfCommisionRelease(bool isInitialize)
        {

            #region GRID
            var nwmyGrid = new nwGrid("nwmyGridModeOfCommisionRelease");
            var gridID = "nwmyGridModeOfCommisionRelease";
            nwmyGrid.CreateExcelGrid(5, SPR_COMMRELDESC);
            nwmyGrid.TableHeight(190);


            //SPR_
            //Column Name
            nwmyGrid.buttonDelete = true;
            //nwmyGrid.buttonInsert = true;
            nwmyGrid.nwobject(SPR_COMMRELCODE - 1).ColumnName(SPRNAME_COMMRELCODE);
            nwmyGrid.nwobject(SPR_COMMRELDESC - 1).ColumnName(SPRNAME_COMMRELDESC);


            nwmyGrid.nwobject(SPR_COMMRELCODE - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_COMMRELDESC - 1).BackgroundColor("gainsboro");
            //nwmyGrid.nwobject(SPR_SORT - 1).BackgroundColor("#E7E7E7");


            nwmyGrid.nwobject(SPR_COMMRELCODE - 1).Width(150);
            nwmyGrid.nwobject(SPR_COMMRELDESC - 1).Width(250);
            

            nwmyGrid.nwobject(SPR_COMMRELCODE - 1).HeaderFieldRequired(true);


            #region ShowDetails
            var dtdetails = new DataTable();
            var row = 1;
            string id = String.Empty;
            if (!isInitialize)
            {
                if (!string.IsNullOrEmpty(WebApp.nwobjectText("id")))
                {
                    id = WebApp.nwobjectText("id");
                }
                else
                {
                    id = WebApp.nwobjectText("txtID");

                }
                dtdetails = dal.GetDataLin(id);
                nwmyGrid.CreateExcelGrid(dtdetails.Rows.Count - 1, SPR_COMMRELDESC);
                nwmyGrid.dataSource(dtdetails);
                nwmyGrid.maxRow(dtdetails.Rows.Count + 1);
            }
            else
            {
                nwmyGrid.minRow(1);
            }
            #endregion
            //nwmyGrid.nwobject(SPR_DEVSHARE - 1).TextAlign("right");
            //nwmyGrid.nwobject(SPR_DEVSHARE - 1).Class("StatementCode");

            //## THEME FORMAT
            nwmyGrid.HeaderBorderColor("#DEDEDE");
            nwmyGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwmyGrid.TableBorderColor("#BBB");
            nwmyGrid.BodyBorderColor("#BBB");
            nwmyGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwmyGrid.HeaderTextColor("#131313");
            nwmyGrid.HoverColor("#DEDEDE", "inherit");
            nwmyGrid.SelectedRowHover("#DEDEDE");
            nwmyGrid.SelectedRowHoverColor("inherit");

            // Eto yung naglalagay ng html script sa container
            js.makeHTML("#nwGridModeOfCommisionReleaseCon", nwmyGrid.createTable());
            
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            DateTime effectivedate = WebApp.nwobjectDate("EffectiveDate");

            var serverdate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
            //js.ADD("getrowno()");
            //Other Functions to be done if ever na meron like pagfoformat ng column

            #endregion
        }

        public void GenerateGrid2(bool isInitialize)
        {

            #region GRID
            var nwmyGrid = new nwGrid("nwmyGrid");
            var gridID = "nwmyGrid";
            nwmyGrid.CreateExcelGrid(5, SPR_PARTICULARS);
            nwmyGrid.TableHeight(190);


        //SPR_
        //Column Name
        nwmyGrid.buttonDelete = true;
            nwmyGrid.buttonInsert = true;
            nwmyGrid.nwobject(SPR_BANKCODE - 1).ColumnName(SPRNAME_BANKCODE);
            nwmyGrid.nwobject(SPR_BANKNAME - 1).ColumnName(SPRNAME_BANKNAME);
            nwmyGrid.nwobject(SPR_BRANCH - 1).ColumnName(SPRNAME_BRANCH);
            nwmyGrid.nwobject(SPR_ACCNO - 1).ColumnName(SPRNAME_ACCNO);
            nwmyGrid.nwobject(SPR_ACCNAME - 1).ColumnName(SPRNAME_ACCNAME);
            nwmyGrid.nwobject(SPR_ACCTYPE - 1).ColumnName(SPRNAME_ACCTYPE);
            nwmyGrid.nwobject(SPR_ACCTYPEDesc - 1).ColumnName(SPRNAME_ACCTYPEDESC);
            nwmyGrid.nwobject(SPR_PARTICULARS - 1).ColumnName(SPRNAME_PARTICULARS);


            nwmyGrid.nwobject(SPR_BANKCODE - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_BANKNAME - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_ACCTYPEDesc - 1).BackgroundColor("cyan");
            //nwmyGrid.nwobject(SPR_SORT - 1).BackgroundColor("#E7E7E7");


            nwmyGrid.nwobject(SPR_COMMRELCODE - 1).Width(150);
            nwmyGrid.nwobject(SPR_COMMRELDESC - 1).Width(250);
            nwmyGrid.nwobject(SPR_ACCTYPE - 1).Width(0);

            nwmyGrid.nwobject(SPR_COMMRELCODE - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_BRANCH - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_ACCNO - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_ACCNAME - 1).HeaderFieldRequired(true);

            //      private const int
            //SPR_BANKCODE = 1,
            //SPR_BANKNAME = 2,
            //SPR_BRANCH = 3,
            //SPR_ACCNO = 4,
            //SPR_ACCNAME = 5,
            //SPR_ACCTYPE = 6,
            //SPR_ACCTYPEDesc = 7,
            //SPR_PARTICULARS = 8;

            #region ShowDetails
            var dtdetails = new DataTable();
            var row = 1;
            string id = String.Empty;
            if (!isInitialize)
            {
                if (!string.IsNullOrEmpty(WebApp.nwobjectText("id")))
                {
                    id = WebApp.nwobjectText("id");
                }
                else
                {
                    id = WebApp.nwobjectText("txtID");

                }
                dtdetails = dal.GetDataLin(id);
                nwmyGrid.CreateExcelGrid(dtdetails.Rows.Count - 1, SPR_COMMRELDESC);
                nwmyGrid.dataSource(dtdetails);
                nwmyGrid.maxRow(dtdetails.Rows.Count + 1);
            }
            else
            {
                nwmyGrid.minRow(1);
            }
            #endregion
            //nwmyGrid.nwobject(SPR_DEVSHARE - 1).TextAlign("right");
            //nwmyGrid.nwobject(SPR_DEVSHARE - 1).Class("StatementCode");

            //## THEME FORMAT
            nwmyGrid.HeaderBorderColor("#DEDEDE");
            nwmyGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwmyGrid.TableBorderColor("#BBB");
            nwmyGrid.BodyBorderColor("#BBB");
            nwmyGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwmyGrid.HeaderTextColor("#131313");
            nwmyGrid.HoverColor("#DEDEDE", "inherit");
            nwmyGrid.SelectedRowHover("#DEDEDE");
            nwmyGrid.SelectedRowHoverColor("inherit");

            // Eto yung naglalagay ng html script sa container
            js.makeHTML("#nwGridMainConBank", nwmyGrid.createTable());

            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            DateTime effectivedate = WebApp.nwobjectDate("EffectiveDate");

            var serverdate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
            //js.ADD("getrowno()");
            //Other Functions to be done if ever na meron like pagfoformat ng column

            #endregion
        }

        //public void GenerateGrid2(bool isInitialize)
        //{

        //    #region GRID
        //    var nwmyGrid = new nwGrid("nwmyGrid");
        //    var gridID = "nwmyGrid";
        //    nwmyGrid.CreateExcelGrid(5, SPR_ROWNO);
        //    nwmyGrid.TableHeight(190);


        //    //SPR_
        //    //Column Name
        //    nwmyGrid.buttonDelete = true;
        //    nwmyGrid.buttonInsert = true;
        //    nwmyGrid.nwobject(SPR_EFFDATEFROM - 1).ColumnName(SPRNAME_EFFDATEFROM);
        //    nwmyGrid.nwobject(SPR_EFFDATETO - 1).ColumnName(SPRNAME_EFFDATETO);
        //    nwmyGrid.nwobject(SPR_DOCUCTRLDTLS - 1).ColumnName(SPRNAME_DOCUCTRLDTLS);
        //    nwmyGrid.nwobject(SPR_LASTNAME - 1).ColumnName(SPRNAME_LASTNAME);
        //    nwmyGrid.nwobject(SPR_FIRSTNAME - 1).ColumnName(SPRNAME_FIRSTNAME);
        //    nwmyGrid.nwobject(SPR_MIDDLENAME - 1).ColumnName(SPRNAME_MIDDLENAME);
        //    nwmyGrid.nwobject(SPR_TIN - 1).ColumnName(SPRNAME_TIN);
        //    nwmyGrid.nwobject(SPR_DATEOFBIRTH - 1).ColumnName(SPRNAME_DATEOFBIRTH);
        //    nwmyGrid.nwobject(SPR_AGE - 1).ColumnName(SPRNAME_AGE);
        //    nwmyGrid.nwobject(SPR_GENDER - 1).ColumnName(SPRNAME_GENDER);
        //    nwmyGrid.nwobject(SPR_GENDERDESC - 1).ColumnName("GENDERDESC");
        //    nwmyGrid.nwobject(SPR_NATIONALITY - 1).ColumnName(SPRNAME_NATIONALITY);
        //    nwmyGrid.nwobject(SPR_NATIONALITYDESC - 1).ColumnName("NATDESC");
        //    nwmyGrid.nwobject(SPR_RELATIONTOCUST - 1).ColumnName(SPRNAME_RELATIONTOCUST);
        //    nwmyGrid.nwobject(SPR_RELATIONTOCUSTDESC - 1).ColumnName("RELDESC");
        //    nwmyGrid.nwobject(SPR_CONTACT - 1).ColumnName(SPRNAME_CONTACT);
        //    nwmyGrid.nwobject(SPR_HOMEADD - 1).ColumnName(SPRNAME_HOMEADD);
        //    nwmyGrid.nwobject(SPR_HOMEADDZIP - 1).ColumnName(SPRNAME_HOMEADDZIP);
        //    nwmyGrid.nwobject(SPR_BUSINESSADD - 1).ColumnName(SPRNAME_BUSINESSADD);
        //    nwmyGrid.nwobject(SPR_BUSINESSADDZIP - 1).ColumnName(SPRNAME_BUSINESSADDZIP);
        //    nwmyGrid.nwobject(SPR_ROWNO - 1).ColumnName(SPRNAME_ROWNO);

        //    //nwmyGrid.nwobject(SPR_SORT - 1).DataType();
        //    //nwmyGrid.Columns.Add("Document No. Series", typeof(int));

        //    //Column BG Color
        //    // nwmyGrid.nwobject(SPR_DOCUCTRLDTLS - 1).BackgroundColor("cyan");
        //    nwmyGrid.nwobject(SPR_GENDER - 1).BackgroundColor("cyan");
        //    nwmyGrid.nwobject(SPR_NATIONALITY - 1).BackgroundColor("cyan");
        //    nwmyGrid.nwobject(SPR_RELATIONTOCUST - 1).BackgroundColor("cyan");
        //    nwmyGrid.nwobject(SPR_AGE - 1).BackgroundColor("gainsboro");
        //    //nwmyGrid.nwobject(SPR_SORT - 1).BackgroundColor("#E7E7E7");


        //    // js.ADD("$('#nwGridCon tr td:nth-child(3)').css('border-color', '#DEDEDE')");
        //    // border - color: #BBB;

        //    //nwmyGrid.buttonDelete = true;
        //    // nwmyGrid.nwobject(SPR_EMPLOYEE - 1).Input("Code");

        //    //Width Setup  
        //    //nwmyGrid.nwobject(SPR_APPLYTOALL - 1).Width(100);
        //    //nwmyGrid.nwobject(SPR_UNITCODE - 1).Width(200);
        //    nwmyGrid.nwobject(SPR_GENDERDESC - 1).Width(0);
        //    nwmyGrid.nwobject(SPR_NATIONALITYDESC - 1).Width(0);
        //    nwmyGrid.nwobject(SPR_RELATIONTOCUSTDESC - 1).Width(0);


        //    #region ShowDetails
        //    var dtdetails = new DataTable();
        //    var row = 1;
        //    string id = String.Empty;
        //    if (!isInitialize)
        //    {
        //        if (!string.IsNullOrEmpty(WebApp.nwobjectText("id")))
        //        {
        //            id = WebApp.nwobjectText("id");
        //        }
        //        else
        //        {
        //            id = WebApp.nwobjectText("txtID");

        //        }
        //        dtdetails = dal.GetDataLin(id);
        //        nwmyGrid.CreateExcelGrid(dtdetails.Rows.Count - 1, SPR_BUSINESSADDZIP);
        //        nwmyGrid.dataSource(dtdetails);
        //        nwmyGrid.maxRow(dtdetails.Rows.Count + 1);
        //    }
        //    else
        //    {
        //        nwmyGrid.minRow(1);
        //    }
        //    #endregion

        //    nwmyGrid.nwobject(SPR_EFFDATEFROM - 1).Template("<input type='text' style='text-align: right;' class='txtdatefrom' style= maxlength='3' value='{" + (SPR_EFFDATEFROM - 1) + "}'></input>");
        //    nwmyGrid.nwobject(SPR_EFFDATETO - 1).Template("<input type='text' style='text-align: right;' class='txtdateto' style= maxlength='3' value='{" + (SPR_EFFDATETO - 1) + "}'></input>");

        //    nwmyGrid.nwobject(SPR_LASTNAME - 1).Template("<input type='text' style='text-align: right;' class='txtlastname' style= maxlength='3' value='{" + (SPR_LASTNAME - 1) + "}'></input>");
        //    nwmyGrid.nwobject(SPR_FIRSTNAME - 1).Template("<input type='text' style='text-align: right;' class='txtfirstname' style= maxlength='3' value='{" + (SPR_FIRSTNAME - 1) + "}'></input>");
        //    nwmyGrid.nwobject(SPR_MIDDLENAME - 1).Template("<input type='text' style='text-align: right;' class='txtmiddlename' style= maxlength='3' value='{" + (SPR_MIDDLENAME - 1) + "}'></input>");
        //    nwmyGrid.nwobject(SPR_TIN - 1).Template("<input type='text' style='text-align: right;' class='txtTIN' style= maxlength='3' value='{" + (SPR_TIN - 1) + "}'></input>");
        //    nwmyGrid.nwobject(SPR_DATEOFBIRTH - 1).Template("<input type='text' style='text-align: right;' class='txtDoB' style= maxlength='3' value='{" + (SPR_DATEOFBIRTH - 1) + "}'></input>");
        //    nwmyGrid.nwobject(SPR_HOMEADD - 1).Template("<input type='text' style='text-align: right;' class='txtHomeAdd' style= maxlength='3' value='{" + (SPR_HOMEADD - 1) + "}'></input>");
        //    nwmyGrid.nwobject(SPR_HOMEADDZIP - 1).Template("<input type='text' style='text-align: right;' class='txtHomeAddzip' style= maxlength='3' value='{" + (SPR_HOMEADDZIP - 1) + "}'></input>");
        //    nwmyGrid.nwobject(SPR_BUSINESSADD - 1).Template("<input type='text' style='text-align: right;' class='txtBusinessAdd' style= maxlength='3' value='{" + (SPR_BUSINESSADD - 1) + "}'></input>");
        //    nwmyGrid.nwobject(SPR_BUSINESSADDZIP - 1).Template("<input type='text' style='text-align: right;' class='txtBusinessAddzip' style= maxlength='3' value='{" + (SPR_BUSINESSADDZIP - 1) + "}'></input>");

        //    nwmyGrid.nwobject(SPR_DOCUCTRLDTLS - 1).Template("<button  title='Details' class='DetailsButton'></button>");
        //    nwmyGrid.nwobject(SPR_CONTACT - 1).Template("<button  title='Details' class='ContactsButton'></button>");
        //    //nwmyGrid.nwobject(SPR_DEVSHARE - 1).TextAlign("right");
        //    //nwmyGrid.nwobject(SPR_DEVSHARE - 1).Class("StatementCode");

        //    //## THEME FORMAT
        //    nwmyGrid.HeaderBorderColor("#DEDEDE");
        //    nwmyGrid.rowBackground("#FFFFFF", "#FFFFFF");
        //    nwmyGrid.TableBorderColor("#BBB");
        //    nwmyGrid.BodyBorderColor("#BBB");
        //    nwmyGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
        //    nwmyGrid.HeaderTextColor("#131313");
        //    nwmyGrid.HoverColor("#DEDEDE", "inherit");
        //    nwmyGrid.SelectedRowHover("#DEDEDE");
        //    nwmyGrid.SelectedRowHoverColor("inherit");

        //    // Eto yung naglalagay ng html script sa container
        //    js.makeHTML("#nwGridMainCon", nwmyGrid.createTable());

        //    js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
        //    js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
        //    js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

        //    DateTime effectivedate = WebApp.nwobjectDate("EffectiveDate");

        //    var serverdate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
        //    //js.ADD("getrowno()");
        //    //Other Functions to be done if ever na meron like pagfoformat ng column

        //    #endregion
        // }

        private void GetSellerInfo() //LAM
        {
            
           
        }

    }
}