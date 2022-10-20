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


//
//

using DataAccessLayers;
using DALComponent;
using System.Text.RegularExpressions;


namespace Noah_Web.forms_BusinessLayer
{
    public class SAAccountBL : nwAction
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

        DataTable emptyDT;

        public string Result="";
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
            
            

            dao = new SAAccountDAL(based.SecurityAccess.ConnectionString, this.UserDefinedConnectionString,""); 

            if (_strmet == "get_Initialize") strFinal = get_Initialize() ;
            else if (_strmet == "func_Toolbox") strFinal = func_Toolbox(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "get_LookUp") strFinal = get_LookUp(strtool_Met, strtool_Poz, strParameter, strValue);
        
            else if (_strmet == "getToolBoxData") strFinal = getToolBoxData(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "get_Method") strFinal = get_Method(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "act_Method") strFinal = act_Method(strtool_Met, strParameter, strValue);
            else strFinal = js.makeJSPostScript("alert('error:" + strmet + " not excute');");

            Result = strFinal;
        }

       
        public string strConn = "";
        string RecordOperationResult = string.Empty;
       
        SAAccountDAL dao;
        public SAAccountBL()
        {
             //dal = new DataAccessLayer(this.UserDefinedConnectionString,""); 
        }

        ///////////////////////////////// Required
        #region Dont Change

        public string func_Toolbox(string strMethod, string poz, string strParameter, string strValue)
        {  
            try
            {
                WebApp = new WebApplib(strParameter, strValue);
                int pozt = -1;
                try { pozt = System.Convert.ToInt32(poz); }
                catch { }
                try { 
                   
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


        ////////////////////// look ups
        public string get_Method(string strMethod, string strSearchVal, string strParameter, string strValue)
        {
            string strFinal = "";
            string strSQL = "";
            string mouseDownFunc = "";
            string mouseOverFunc = "";
            string strName = "";
            strConn = this.UserDefinedConnectionString;
            WebApp = new WebApplib(strParameter, strValue);

            DataTable dtLookupConfig = WebApp.get_LookupConfig();
            nwObject.LookupConfig(dtLookupConfig);

            switch (strMethod)
            {
                ////// combo box
                case "getcbo":
                    //emptyDT = dt;
                    //strFinal = nwObject.make_OptionLookup(strSQL, strConn, emptyDT);
                    //strSQL = js.makeHTML("#cboPaymentType", strFinal);
                    //strFinal = strSQL;

                      break;
              

               case "getUserLookup":

                    string user_code = WebApp.nwobjectText("user_code");

                    strSQL = SFObjects.returnText(string.Format(@"SELECT value FROM dbo.SystemConfig WHERE code = 'AccPowLookUp'"),based.SecurityAccess.ConnectionString);

                   if (WebApp.nwobjectText("nwaccess") == "1")
                   {

                       if (strSQL.Trim() == "")
                           strSQL = string.Format(@"Select [Code],[Description] from [FPTI].[User] where HasAccessToUtility <> '1' AND ([Code] like '%{0}%' or [Description] like '%{0}%') AND [Code] NOT IN (SELECT SplitValue FROM dbo.fn_Split('{1}','|')) ", strSearchVal, user_code);
                   
                   }
                   else {
                       if (strSQL.Trim() == "")
                           strSQL = string.Format(@"Select [Code],[Description] from [FPTI].[User] where ([Code] like '%{0}%' or [Description] like '%{0}%') AND [Code] NOT IN (SELECT SplitValue FROM dbo.fn_Split('{1}','|')) ", strSearchVal, user_code);
                   
                   }
                    strMethod = strMethod.Substring(3);
                   strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   break;


                ///// Inquire
               case "gettoolboxInquire":
                   if (WebApp.nwobjectText("nwaccess") == "1")
                       strSQL = string.Format(@"Select [Code],[Description], IIF(AccountDisabled = 1, 'Yes', 'No') [Account Disabled/Locked], IIF(InitialLogin = 1, 'Yes', 'No') [User Must Change Password at Next Logon] from FPTI.[User] where HasAccessToUtility <> '1'  order by isnull(Moddate,Recdate) DESC,Recdate DESC");
                   else strSQL = string.Format(@"Select [Code],[Description], IIF(AccountDisabled = 1, 'Yes', 'No') [Account Disabled/Locked], IIF(InitialLogin = 1, 'Yes', 'No') [User Must Change Password at Next Logon] from FPTI.[User] order by isnull(Moddate,Recdate) DESC,Recdate DESC");
                   
                    
                 
                   strMethod = strMethod.Substring(3);
                   strConn = based.SecurityAccess.ConnectionString;
                   strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   
                   break;
                  
            }

          return strFinal;
        }

        ///// Standard RecordOperation 

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string result = "";
            string tempstr = "";

            switch (i)
            {
                case eRecordOperation.AddNew:
                    isNewRow = true;
                    nwToolBox.bindingNavigatorSaveItem.Enable = true;
                    nwToolBox.bindingNavigatorAddNewItem.Enable =
                    nwToolBox.bindingNavigatorPrintItem.Enable =
                    //nwToolBox.bindingNavigatorInquireItem.Enable =
                    nwToolBox.bindingNavigatorImportItem.Visible =
                    nwToolBox.bindingNavigatorDeleteItem.Enable =
                    nwToolBox.bindingNavigatorDeleteItem.Visible =
                    nwToolBox.bindingNavigatorExportItem.Enable = false;
                    break;
                case eRecordOperation.Save:
                    RecordOperationResult = string.Empty;

                    if (AreValidEntries() == true)
                    {

                        if (checkDuplicate(WebApp.nwobjectText("inCode")) == "0" && !isNewRow)
                        {
                            RecordOperationResult = "This transaction number has been deleted in another instance. This Transaction can no longer be viewed from this screen.\n";
                            Prompt.Information(RecordOperationResult, based.Title);
                            RefreshData();
                            js.ADD("cust_GetPara(); $(\"#inCode\").attr(\"disabled\", true);");
                            //   js.ADD("ContinuetoToolboxNavigatorClient()");
                            //  CreatePowerUserGrid(WebApp.nwobjectText("inCode"));
                            //js.ADD("xvalueXX=\"" + GlobalObject.escape(WebApp.nwobjectText("inCode")) + "\"; $(\"#inDesc\").focus();");
                            js.ADD("xvalueXX=\"" + WebApp.nwobjectText("inCode") + "\"; $(\"#inDesc\").focus();");
                        }
                        else
                        {

                            DataTable dtData, dtDataLin1, dtDataLin2 = new DataTable();
                            dtData = LoadSchema();
                            dtDataLin1 = LoadSchemaLin();

                           string isAccountDisabled = SFObject.returnText("SELECT TOP 1 1 FROM FPTI.[User] WHERE Code = '" + WebApp.nwobjectText("inCode") + "' AND AccountDisabled = 1", based.SecurityAccess.ConnectionString);


                            RecordOperationResult = dao.SaveData(dtData, dtDataLin1, isNewRow);

                            if (RecordOperationResult.IndexOf("successfully") >= 0)
                                RecordOperationResult = "Saved successfully.";

                            Prompt.Information(RecordOperationResult, based.Title);
                            if (RecordOperationResult.ToLower().IndexOf("successfully") != -1)
                            {
                                if (WebApp.nwobjectBool("inCheck2"))
                                    SFObject.ExcuteQuery("UPDATE [FPTI].[User] SET [PowerUser]=1 WHERE [Code]='" + WebApp.nwobjectText("inCode") + "'", based.SecurityAccess.ConnectionString);
                                else SFObject.ExcuteQuery("UPDATE [FPTI].[User] SET [PowerUser]=0 WHERE [Code]='" + WebApp.nwobjectText("inCode") + "'", based.SecurityAccess.ConnectionString);
                                if (WebApp.nwobjectBool("inCheck1"))
                                    SFObject.ExcuteQuery("UPDATE [FPTI].[User] SET [HasAccessToUtility]=1 WHERE [Code]='" + WebApp.nwobjectText("inCode") + "'", based.SecurityAccess.ConnectionString);
                                else SFObject.ExcuteQuery("UPDATE [FPTI].[User] SET [HasAccessToUtility]=0 WHERE [Code]='" + WebApp.nwobjectText("inCode") + "'", based.SecurityAccess.ConnectionString);




                                if (WebApp.nwobjectBool("inCheck3"))
                                {
                                    SFObject.ExcuteQuery("UPDATE [FPTI].[User] SET [AccountDisabled]=1 WHERE [Code]='" + WebApp.nwobjectText("inCode") + "'", based.SecurityAccess.ConnectionString);
                                    SFObject.ExcuteQuery("UPDATE FPTI_NW.noahweb_zEmail SET Status = 0 WHERE UserID ='" + WebApp.nwobjectText("inCode") + "'", based.SecurityAccess.ConnectionString);
                                }
                                else
                                {
                                    //ksg update user attempt when from disabled.
                                    if (isAccountDisabled == "1")
                                    {
                                        SFObject.ExcuteQuery("DELETE a FROM FPTI_NW.UserAttempt a where a.userid='" + WebApp.nwobjectText("inCode") + "' and a.inType='ATTEMPTPASS'", based.SecurityAccess.ConnectionString);
                                    }
                                    SFObject.ExcuteQuery("UPDATE [FPTI].[User] SET [AccountDisabled]=0 WHERE [Code]='" + WebApp.nwobjectText("inCode") + "'", based.SecurityAccess.ConnectionString);
                                    SFObject.ExcuteQuery("INSERT INTO [FPTI].[ConnectivityH] VALUES ('" + WebApp.nwobjectText("inCode") + "', '', 'ENABLE ACCOUNT BY ADMIN', dbo.GetNoahDate(), NULL)", based.SecurityAccess.ConnectionString);
                                    SFObject.ExcuteQuery("UPDATE FPTI_NW.noahweb_zEmail SET Status = 1 WHERE UserID ='" + WebApp.nwobjectText("inCode") + "'", based.SecurityAccess.ConnectionString);
                                }
                                if (WebApp.nwobjectBool("inCheck4"))
                                    SFObject.ExcuteQuery("UPDATE [FPTI].[User] SET [InitialLogin]=1 WHERE [Code]='" + WebApp.nwobjectText("inCode") + "'", based.SecurityAccess.ConnectionString);
                                else SFObject.ExcuteQuery("UPDATE [FPTI].[User] SET [InitialLogin]=0 WHERE [Code]='" + WebApp.nwobjectText("inCode") + "'", based.SecurityAccess.ConnectionString);
                                if (WebApp.nwobjectBool("chksysadmin"))
                                    SFObject.ExcuteQuery("UPDATE [FPTI].[User] SET [SysAdmin]=1 WHERE [Code]='" + WebApp.nwobjectText("inCode") + "'", based.SecurityAccess.ConnectionString);
                                else SFObject.ExcuteQuery("UPDATE [FPTI].[User] SET [SysAdmin]=0 WHERE [Code]='" + WebApp.nwobjectText("inCode") + "'", based.SecurityAccess.ConnectionString);


                                SFObject.ExcuteQuery("INSERT INTO [FPTI].[ActivityUser] (userID,RecDate,MenuItem,PowerUserID) VALUES('"+ WebApp.nwobjectText("inCode") + "',dbo.GetNoahDate(),'Account - (Change Setting)','"+based.SecurityAccess.RecUser+"') ", based.SecurityAccess.ConnectionString);


                                RefreshData();
                                js.ADD("cust_GetPara(); $(\"#inCode\").attr(\"disabled\", true);");
                                //   js.ADD("ContinuetoToolboxNavigatorClient()");
                                //  CreatePowerUserGrid(WebApp.nwobjectText("inCode"));
                                js.ADD("xvalueXX=\"" + WebApp.nwobjectText("inCode") + "\"; $(\"#inDesc\").focus();");
                            }
                        }
                    }
                    else
                    {
                        RecordOperationResult = "error";
                    }


                    break;
                case eRecordOperation.Delete:
                    //                    if (!string.IsNullOrEmpty(
                    //                        SFObject.returnText(string.Format(@"
                    //                                select distinct 1 from 
                    //                                [FPTI_NW].[NW_CompanyUserItemMappingWeb] 
                    //                                where company = '{0}' and sysuser = '{1}'", WebApp.nwobjectText(""), WebApp.nwobjectText("")), based.SecurityAccess.ConnectionString)))
                    //{
                    if (checkDuplicate(WebApp.nwobjectText("inCode")) == "0" && !isNewRow)
                    {
                        RecordOperationResult = "This transaction number has been deleted in another instance. This Transaction can no longer be viewed from this screen.\n";
                        Prompt.Information(RecordOperationResult, based.Title);
                        RefreshData();
                        js.ADD("cust_GetPara(); $(\"#inCode\").attr(\"disabled\", true);");
                        //   js.ADD("ContinuetoToolboxNavigatorClient()");
                        //  CreatePowerUserGrid(WebApp.nwobjectText("inCode"));
                        js.ADD("xvalueXX=\"" + WebApp.nwobjectText("inCode") + "\"; $(\"#inDesc\").focus();");

                    }
                    else
                    {
                        if (dao.CheckUser(WebApp.nwobjectText("inCode")) != string.Empty) {
                            RecordOperationResult = "Cannot delete record. Record is in use by another menu item.\n";
                        Prompt.Information(RecordOperationResult, based.Title);
                        }
                        else {
                        

                            RecordOperationResult = dao.DeleteData(WebApp.nwobjectText("inCode"), based.SecurityAccess.RecUser );

                            if (RecordOperationResult.IndexOf("successfully") >= 0)
                                RecordOperationResult = "Deleted successfully.";

                            DeleteConnectedtoToDeletedUser(WebApp.nwobjectText("inCode"));
                        Prompt.Information(RecordOperationResult, based.Title);
                        //RecordOperationResult = dal.DeleteData(id, itemcode, connectionString);
                        RefreshData();

                        }

                        
                    }
                    //}
                    //else {
                    //    Prompt.Information("Cannot delete. Selected user has setup on ", based.Title); 
                    //}

                    break;

                case eRecordOperation.Process:
                    tempstr = "Process";
                    ////Prompt.Information(based.SecurityAccess.ConnectionString, based.Title);
                    break;

                case eRecordOperation.Refresh:
                    RefreshData();

                    CreatePowerUserGrid("");
                    //js.ADD(CreateGrid2());
                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    ////Prompt.Information(based.SecurityAccess.ConnectionString, based.Title);
                    Inquire();
                    // Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Import:
                    tempstr = "import";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Export:
                    tempstr = "export";
                    // ExportGrid();
                    //   js.ADD("tableToExcel(\"nwExportContainer\", \"\", \"Report\");");


                    string LISTINGFILENAME = "", sql = "";
                    if (WebApp.nwobjectText("nwaccess") == "1")
                        sql = string.Format(@"Select a.[Code],a.[Description]
,case when(a.[AccountDisabled])='1' then 'Yes' else 'No' end as [Account Disabled/Locked] 
,case when(a.[InitialLogin])='1' then 'Yes' else 'No' end as [User Must Change Password at Next Logon] 
, b.Description [Created By], a.[RecDate] [Date Created], c.Description [Modified By], a.[ModDate] [Date Modified] from FPTI.[User] a
left join FPTI.[User] b ON b.code = a.recuser
left join FPTI.[User] c ON c.code = a.moduser
where HasAccessToUtility <> '1' 
WHERE HasAccessToUtility != 1
order by isnull(a.Moddate,a.Recdate) DESC,a.Recdate DESC");
                    else sql = string.Format(@"Select a.[Code],a.[Description]
,case when(a.[AccountDisabled])='1' then 'Yes' else 'No' end as [Account Disabled/Locked] 
,case when(a.[InitialLogin])='1' then 'Yes' else 'No' end as [User Must Change Password at Next Logon] 
, b.Description [Created By], a.[RecDate] [Date Created], c.Description [Modified By], a.[ModDate] [Date Modified] from FPTI.[User] a
left join FPTI.[User] b ON b.code = a.recuser
left join FPTI.[User] c ON c.code = a.moduser
WHERE a.HasAccessToUtility != 1
order by isnull(a.Moddate,a.Recdate) DESC,a.Recdate DESC");

                    LISTINGFILENAME = "User Account Listing";
                    //,case when([PowerUser])='1' then 'Yes' else 'No' end as [Power User] 
                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, 5, sql,
                                                           LISTINGFILENAME, based.SecurityAccess.ConnectionString, SFObject.returnText(string.Format(@"SELECT Description FROM fpti.Company where code = '{0}'", based.SecurityAccess.Company), UserDefinedConnectionString),
                                                           based.SecurityAccess.RecUserName, LISTINGFILENAME);

               

                    //## FOR EXPORTING ###
                    Random rnd = new Random();
                    string SessionID = DateTime.Now.ToString("yyyyddMMhhmmss") + rnd.Next(0, 9999).ToString().PadRight(4, '0');
                    HttpContext.Current.Session["Config_" + SessionID] = frmlist.m_Spread.ExportConfig();
                    HttpContext.Current.Session["Data_" + SessionID] = frmlist.m_Spread.GetDataSource();
                    HttpContext.Current.Session["Filename_" + SessionID] = LISTINGFILENAME;
                    HttpContext.Current.Session["Header_" + SessionID] = "0";

                    //js.ADD("crExportLnk = '../forms_standards/ExportToExcel.aspx';crSTDLnk = '../forms_standards/RunStandard.aspx';");
                    js.ADD("ExportSessionID='" + SessionID + "'");
                    //## END ##

                    js.Show("#nwExportContainerMain", 0);
                    js.Show("#nwExportContainerMain", 0);



                    js.ADD(frmlist.CreateScript());

                   // js.ADD("nwLoading_End('xSample')");

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
            //js.ADD(CreatePowerUserGrid());
            //js.ADD(CreateGrid2());
            //Inquire();
            //CreatePowerUserGrid("",true); 
            execute(ref strFinal);

            //strFinal += get_Method("getcboPaymentType", "", "", "");
            //strFinal += js.makeValueText("#dtpDocDate", DateTime.Now.ToShortDateString());
            return js.makeJSPostScript(strFinal);
        }
        public string act_Method(string strMethod, string strParameter, string strValue)
        {
            string strFinal = "";
            string strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actpass":
                    //try
                    //{
                        NoahWebLib.Security.NOAHEncryptor nwSecurity = new NoahWebLib.Security.NOAHEncryptor();
                        if(SFObjects.returnText("SELECT Value FROM [FPTI_NW].[noahweb_SystemConfigWEB] WHERE Code='nwGen_NewPassword'", based.SecurityAccess.ConnectionString) == "1")
                            nwSecurity = new NoahWebLib.Security.NOAHEncryptor(false);
                        strFinal = WebApp.nwobjectText("inPassword");

                    if (strFinal != "")
                    {
                        strFinal = nwSecurity.DecryptString(strFinal);

                        js.makeValueText("#inPassword", strFinal);
                        js.ADD("$('#inPassword').select()");
                    }
                    //}
                    //catch { }
                    break;
                case "actBindCollection":
                    Data_Enable();
                    BindCollection();
                    CreatePowerUserGrid(WebApp.nwobjectText("inCode"));

                    string Company = string.Empty;

                    try { Company = based.SecurityAccess.Company; } catch { }
                    
                    js.ADD("$(\"#inDesc\").focus();");
                    js.ADD("setTimeout(function(){func_callPower()},10)");

                    if (Company == "")//if (WebApp.nwobjectText("inCheck2") == "true")
                    {
                        if (WebApp.nwobjectText("inCheck2") == "true")
                        {
                            js.ADD("$(\"#frmPowerUser\").show();");
                        }
                        js.ADD("$(\"#nwGrid1\").removeClass(\"nwHide\");");
                        js.ADD("$(\"#nwp-newuser\").removeClass(\"nwHide\")");
                    }
                    else
                    {
                        js.ADD("$(\"#nwGrid1\").addClass(\"nwHide\")");
                        js.ADD("$(\"#nwp-newuser\").addClass(\"nwHide\")");
                        js.ADD("$(\"#frmPowerUser\").hide();");
                    }

                    js.ADD("nwLoading_Start('xSampleX')");
                    js.ADD("nwLoading_End('actBindCollection')");

                    //DecryptPassword();
                    break;
                case "actLoadGrid":
                    //js.ADD(CreateGrid1());
                    //js.ADD(CreateGrid2());
                    break;

                case "actLoadEmptyGrid":
                   // CreatePowerUserGrid(WebApp.nwobjectText("inCode"));
                 
                    break;

                case "actTry":
                    //nwExport nwexport = new nwExport();
                    //DataTable dt = SFObject.LoadDataTable("Select [Code],[Description] from [FPTI].[User]", based.SecurityAccess.ConnectionString);
                    //nwexport.Export(dt,null,true);

                    break;

                case "actLoadMainHistorical":
                    DataTable dtMainHistory = new DataTable();
                    dtMainHistory = SFObjects.LoadDataTable(dao.Historical(WebApp.nwobjectText("code")), this.UserDefinedConnectionString);
                    Historical(dtMainHistory);
                    js.ADD("nwLoading_End('actLoadMainHistorical')");
                    break;

            }
            return js.makeJSPostScript("try{"+execute()+"}catch(err){alert(err);}");
        }

        private void Historical(DataTable dtrecords)
        {

            string LISTINGFILENAME = "";
            if (LISTINGFILENAME + " History Listing" == "") LISTINGFILENAME = "Sheet 1";
            else LISTINGFILENAME = LISTINGFILENAME + " History Listing";

            int maxrow = 5 + dtrecords.Rows.Count;

            

            int dataindex = 5;

            ListingAndPrint frmlist = new ListingAndPrint
                                                   (ListingAndPrint.FormType.Listing, 5, dtrecords,
                                                   LISTINGFILENAME, based.SecurityAccess.ConnectionString, based.SecurityAccess.Company,
                                                   based.SecurityAccess.RecUserName, LISTINGFILENAME);


            //loop valdiation
            string tempstring1 = "";
            string tempstring2 = "";
            string toChange = "";

            for (int i = 0; i < dtrecords.Rows.Count; i++)
            {
                frmlist.m_Spread.Rows(i + dataindex).TextColor("black");
            }


            for (int i = 0; i < dtrecords.Rows.Count; i++)
            {
                for (int ic = 0; ic < dtrecords.Columns.Count; ic++)
                {
                    if (toChange != dtrecords.Rows[i][0].ToString())
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
                            if (dtrecords.Rows[i][0].ToString() == dtrecords.Rows[i + 1][0].ToString())
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
                frmlist.m_Spread.Rows(0, 0).BackgroundColor("Transparent");
                toChange = dtrecords.Rows[i][0].ToString();
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
        public string getToolBoxData(string tableName, string getMethod, string strParameter, string strValue)
        {
            string strFinal = ""; string sql = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (getMethod)
            {
                case "toolbox":

                    string codevalue = WebApp.nwobjectText("codevalue"); // codevalue will be filter of primary key add these filter
                    if (WebApp.nwobjectText("nwaccess") == "1")
                    {
                        if (dao.CheckConfig())
                        {
                            sql = string.Format(@"Select top 100 percent a.* from FPTI.[User] a 
                                                    LEFT JOIN FPTI.CompanyUserMapping b ON a.Code = b.SysUser 
                                                    LEFT JOIN [FPTI_NW].[SuperAdmin] c ON c.Company = b.Company
                                                    WHERE c.UserID = '{0}' AND a.HasAccessToUtility <> '1' and a.code ='{1}'  order by isnull(a.Moddate,a.Recdate) DESC,a.Recdate DESC", based.SecurityAccess.RecUser, codevalue);

                        }
                        else
                        {
                            sql = string.Format(@"Select top 100 percent * from FPTI.[User] WHERE HasAccessToUtility <> '1' and a.code ='{0}' order by isnull(Moddate,Recdate) DESC,Recdate DESC", codevalue);
                        }
                    }
                    else
                    {

                        sql = string.Format(@"Select top 100 percent  * from FPTI.[User] where code ='{0}' order by isnull(Moddate,Recdate) DESC,Recdate DESC", codevalue);

                    }

                    //if (WebApp.nwobjectText("nwaccess") == "1")
                    //{
                    //    if (dao.CheckConfig())
                    //    {
                    //        sql = string.Format(@"Select top 100 percent a.* from FPTI.[User] a 
                    //                                LEFT JOIN FPTI.CompanyUserMapping b ON a.Code = b.SysUser 
                    //                                LEFT JOIN [FPTI_NW].[SuperAdmin] c ON c.Company = b.Company
                    //                                WHERE c.UserID = '{0}' AND a.HasAccessToUtility <> '1'  order by isnull(a.Moddate,a.Recdate) DESC,a.Recdate DESC", based.SecurityAccess.RecUser);

                    //    }
                    //    else
                    //    {
                    //        sql = string.Format(@"Select top 100 percent * from FPTI.[User] WHERE HasAccessToUtility <> '1' order by isnull(Moddate,Recdate) DESC,Recdate DESC");
                    //    }
                    //}
                    //else {

                    //    sql = string.Format(@"Select top 100 percent  * from FPTI.[User] order by isnull(Moddate,Recdate) DESC,Recdate DESC", based.SecurityAccess.RecUser);

                    //}



                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "Code";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", sql, based.SecurityAccess.ConnectionString);


                  //  strFinal = getToolBoxDataRet(tableName, sql, based.SecurityAccess.ConnectionString , "1", "50");

                      


                    break;
               
            }

            return strFinal;
        }
        private void Main_Load()
        {

    

          
            dao.UpdateVersion();
            CreatePowerUserGrid("");

            if (dao.CheckHasAccess(based.SecurityAccess.RecUser))
            {
                if (SFObject.returnText("SELECT  value FROM    [dbo].[SystemConfig]WHERE   code = 'ACC-POW';", based.SecurityAccess.ConnectionString)
                   == "1")
                {
                    js.Show("#rowPoweruser");
                }
            }
            return;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#inCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Code");
            SFObject.SetControlBinding("#inDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Description");
            SFObject.SetControlBinding("#inPassword", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Password");
            SFObject.SetControlBinding("#inCheck1", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "HasAccessToUtility");
            SFObject.SetControlBinding("#inCheck2", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "PowerUser");
            SFObject.SetControlBinding("#inCheck3", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "AccountDisabled");
            SFObject.SetControlBinding("#inCheck4", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "InitialLogin");
           
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RecUser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RecDate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "ModUser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "ModDate");

        }
        private void Inquire()
        {
            nwToolBox.bindingNavigatorInquireItem.PrimaryKey = dao.primaryKey;
            //SFObjects.caseSearch(ref dal.CurrentSelectedItem, dal.inquireQry, dal.ConnectionString);
            //Prompt.Information(dal.primaryKey + " " + dal.CurrentSelectedItem, "");
            //BindingNavigator.BindingSource.Position = BindingNavigator.BindingSource.Find(dao.primaryKey, dao.CurrentSelectedItem);
        }
        //private void Export(ListingAndPrint.FormType type)
        //{
        //    string s = SFObjects.returnText("select UPPER(CompanyName) from SG.BIRCASConfig",this.UserDefinedConnectionString);
        //    new NoahUI.ListingAndPrint(type,
        //        dal.listingStartRow, dal.listingQry, dal.listingName, dal.ConnectionString,
        //        s, SFObjects.returnText(String.Format("select description from fpti.[user] where code = '{0}'", based.SecurityAccess.RecUser), this.UserDefinedConnectionString), dao.listingName).ShowDialog();
        //}

        //////////////// end of standard / standard custumize
        private void BindCollection()
        {
            DisableDescription(isUsed());
           
        }

        private bool AreValidEntries()
        {
            string errorResult = String.Empty;

            if (checkDuplicate(WebApp.nwobjectText("inCode")) == "1" && isNewRow == true)
                errorResult += "Cannot be saved. Duplicate records are not allowed.\n";

            if (WebApp.nwobjectText("inCode").Equals(string.Empty))
                errorResult += "Cannot be saved. Code is required.\n";
            else
            {
                if (WebApp.nwobjectText("inCode").Contains(" "))
                    errorResult += "Cannot be saved. Code should not contain spaces.\n";
            }
            string len = string.Empty;
            if (!string.IsNullOrEmpty(CheckMinimumLength(1, WebApp.nwobjectText("inCode").Length, "Code", ref len)) && WebApp.nwobjectText("inCode") != "") {
                len = NumberToWords(Parser.ParseInt(len));
                errorResult += "Cannot be saved. Code should be at least " + len + " characters.\n";
            }

            if (WebApp.nwobjectText("inDesc").Trim().Equals(string.Empty))
                errorResult += "Cannot be saved. Description is required.\n";

            if (WebApp.nwobjectText("inPassword").Trim().Equals(string.Empty))
                errorResult += "Cannot be saved. Password is required.\n";


            errorResult += validatepasswordcharacters(WebApp.nwobjectText("inPassword"));


            if (!string.IsNullOrEmpty(CheckMinimumLength(2, WebApp.nwobjectText("inPassword").Length, "Password", ref len)) && WebApp.nwobjectText("inPassword") != "")
            {
                len = NumberToWords(Parser.ParseInt(len));
                errorResult += "Cannot be saved. Password length must be at least " + len + " characters.\n";
            }
 
            

            if (WebApp.nwobjectBool("inCheck2")==true)
            {
                DataTable dt = WebApp.nwGridDataWithID("nwGrid1");
                try
                {
                    dt = new DataView(dt, "Column1 <> '' ", "", DataViewRowState.CurrentRows).ToTable();
                }
                catch { }
                if (dt.Rows.Count <= 0)
                {
                    errorResult += "Cannot be saved. User  is required.\n";
                }

            }
         

                if (!errorResult.Equals(string.Empty))
                {
                    //errorResult = "Cannot Save.\n" + errorResult;
                    Prompt.Error(errorResult, based.Title);
                }

            return errorResult.Equals(String.Empty);
        }

        private void RefreshData()
        {
            dao.DisableAccount();
            Data_Enable();
            js.ADD("func_Toolbox_Clear();");
            //  js.ADD(" loc_LookupInquireWithValue('" + WebApp.nwobjectText("inCode") + "') ");
            js.ADD("  nwParameter_Add('nwaccess', nwaccess);  ");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")");
            js.ADD("isNewRow=false;");
          
          //  js.ADD("func_ActionDriven(\"actLoadGrid\", false);");
        }

        private bool isUsed()
        {
            String bSql = String.Empty, bVal = String.Empty,
                   bRcptSql = String.Empty, bRcptVal = String.Empty,
                   bBaseSql = String.Empty, bBaseVal = String.Empty,
                   bFromSql = String.Empty, bToSql = String.Empty,
                   bFromVal = String.Empty, bToVal = String.Empty;
           

            bSql = String.Format(@"select 1 from FG.SellingUOMAssign where UOM = '{0}'", WebApp.nwobjectText("inCode").Trim().Replace("'", "''"));
            bVal = SFObjects.returnText(bSql, this.UserDefinedConnectionString);

            bRcptSql = String.Format(@"select 1 from FG.RECEIPTUOMASSIGN where ReceiptUOMCode = '{0}'", WebApp.nwobjectText("inCode").Trim().Replace("'", "''"));
            bRcptVal = SFObjects.returnText(bRcptSql, this.UserDefinedConnectionString);

            bBaseSql = String.Format(@"select 1 from FG.BaseUOMAssign where UOM = '{0}'", WebApp.nwobjectText("inCode").Trim().Replace("'", "''"));
            bBaseVal = SFObjects.returnText(bBaseSql, this.UserDefinedConnectionString);

            bFromSql = String.Format(@"select 1 from FG.StandardUOMConversion where FromUOM = '{0}'", WebApp.nwobjectText("inCode").Trim().Replace("'", "''"));
            bFromVal = SFObjects.returnText(bFromSql, this.UserDefinedConnectionString);

            bToSql = String.Format(@"select 1 from FG.StandardUOMConversion where ToUOM = '{0}'", WebApp.nwobjectText("inCode").Trim().Replace("'", "''"));
            bToVal = SFObjects.returnText(bToSql, this.UserDefinedConnectionString);

            //Prompt.Information(bSql.Replace("'", "\\'") + "\n" +
            //    bRcptSql.Replace("'", "\\'") + "\n" +
            //    bBaseSql.Replace("'", "\\'") + "\n" +
            //    bFromSql.Replace("'", "\\'") + "\n" +
            //    bToSql.Replace("'", "\\'") + "\n" +
            //    WebApp.nwobjectText("inCode").Trim().Replace("'", "\\'"),"Prompt");

            return (bVal.Length > 0 || bRcptVal.Length > 0
                    || bBaseVal.Length > 0 || bFromVal.Length > 0
                    || bToVal.Length > 0) ? true : false;

        }

        private void DisableDescription(bool x)
        {
            
           // based.
            js.makeProp("#inDesc", "disabled", x);
            //js.makeProp("#inDesc", "disabled", !x);
            //nwToolBox.bindingNavigatorSaveItem.Enable = !x && based.SecurityAccess.Save;
            
            // bindingNavigatorSaveItem.Enabled = !x && this.SecurityAccess.Save;
        }

        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtData = new DataTable();
            dtData = dao.GetSchema();
            #endregion 
            string password = "";
            DataRow drDataToAdd = dtData.NewRow();
            drDataToAdd["Code"] = WebApp.nwobjectText("inCode");
            drDataToAdd["Description"] = WebApp.nwobjectText("inDesc");
            if (WebApp.nwobjectBool("isClick") == false)
            {
                password = WebApp.nwobjectText("inPassword");
            }
            else {
                NoahWebLib.Security.NOAHEncryptor nwSecurity = new NoahWebLib.Security.NOAHEncryptor();
                if (SFObjects.returnText("SELECT Value FROM [FPTI_NW].[noahweb_SystemConfigWEB] WHERE Code='nwGen_NewPassword'", based.SecurityAccess.ConnectionString) == "1")
                    nwSecurity = new NoahWebLib.Security.NOAHEncryptor(false);
                password = nwSecurity.EncryptToString(WebApp.nwobjectText("inPassword"));
            }
            drDataToAdd["Password"] = password;
            drDataToAdd["HasAccessToUtility"] = WebApp.nwobjectBool("inCheck1");
            drDataToAdd["PowerUser"] = WebApp.nwobjectBool("inCheck2");
            drDataToAdd["AccountDisabled"] = WebApp.nwobjectBool("inCheck3");
            drDataToAdd["InitialLogin"] = WebApp.nwobjectBool("inCheck4");


            #region don't change
            drDataToAdd["recuser"] = drDataToAdd["moduser"] = based.SecurityAccess.RecUser;
            drDataToAdd["recdate"] = DateTime.Now; //will be populated as getdate() in sproc

            drDataToAdd["ModUser"] = based.SecurityAccess.RecUser; ; 
            drDataToAdd["Moddate"] = DateTime.Now; //will be populated as getdate() in sproc
            
            dtData.Rows.Add(drDataToAdd);
            dtData.AcceptChanges();
            #endregion

            return dtData;
        }

        public DataTable LoadSchemaLin()
        {
            #region don't change
            DataTable dtData = new DataTable();
            dtData = dao.GetSchemaLin();
            #endregion
            string poweruser = WebApp.nwobjectText("inCheck2");
            DataTable dt_users = WebApp.nwGridData(WebApp.nwobjectText("nwGrid1"));
            if (poweruser != "false") {
                if (dt_users.Rows.Count >= 1) { 
                foreach (DataRow dr in dt_users.Rows)
                {
                    if (dr[1].ToString() != "")
                    {
                        DataRow drDataToAdd = dtData.NewRow();
                        drDataToAdd["PowerUserCode"] = WebApp.nwobjectText("inCode");
                        drDataToAdd["UserCode"] = dr[1].ToString();
                        dtData.Rows.Add(drDataToAdd);
                    }
                }
                }
            }
            else {
               // SFObject.ExcuteQuery("Delete from [FPTI].[PowerUserAssignment] where code = '" + WebApp.nwobjectText("inCode") + "'", based.SecurityAccess.ConnectionString);
            }

            #region don't change
            dtData.AcceptChanges();
            #endregion
    
           

            return dtData;
        }


        public void Data_Enable()
        {
            nwToolBox.bindingNavigatorAddNewItem.Enable =
            nwToolBox.bindingNavigatorDeleteItem.Enable =
            nwToolBox.bindingNavigatorDeleteItem.Visible =
            nwToolBox.bindingNavigatorSaveItem.Enable =
                     nwToolBox.bindingNavigatorPrintItem.Enable =
                     nwToolBox.bindingNavigatorInquireItem.Enable =
                     nwToolBox.bindingNavigatorDeleteItem.Enable =
                     nwToolBox.bindingNavigatorExportItem.Enable = true;
            nwToolBox.bindingNavigatorImportItem.Visible = false;
            nwToolBox.bindingNavigatorProcessItem.Visible = false;
        }
        public void CreateGrid1()
        {
            string strF = "";
            int row = 0;

            nwGrid soh = new nwGrid("grid1");
            DataTable dt_soh = new DataTable();
            string sql = "";
            sql = @"SELECT [Code]
                      ,[Description]
                      ,case when [HasAccessToUtility] = 1 
		                then 'Yes' else 'NO'
		                end as HasAccessToUtility
                      ,[RecUser]
                      ,[RecDate]
                      ,[ModUser]
                      ,[ModDate]
                      ,[LastPasswordChanged]
                      ,case when [PowerUser] = 1 
		                then 'Yes' else 'NO'
		                end as [PowerUser] 
                      ,case when [AccountDisabled] = 1 
		                then 'Yes' else 'NO'
		                end as AccountDisabled 
                      ,case when [InitialLogin] = 1 
		                then 'Yes' else 'NO'
		                end as [InitialLogin] 
                  FROM [ARKDB_RELEPMODEMO].[FPTI].[User]"; 

            dt_soh = nwDataAccess.general_Sql_Select(sql, this.UserDefinedConnectionString);
            
            //dt_soh.Columns["HasAccessToUtility"].DataType = typeof(string);
            //dt_soh.Columns["PowerUser"].DataType = typeof(string);
            //dt_soh.Columns["AccountDisabled"].DataType = typeof(string);
            //dt_soh.Columns["InitialLogin"].DataType = typeof(string);

            //for (int i = 0; i < dt_soh.Rows.Count; i++)
            //{
            //    if (dt_soh.Rows[i]["HasAccessToUtility"].ToString() == "1")
            //        dt_soh.Rows[i]["HasAccessToUtility"] = "Yes";
            //    else dt_soh.Rows[i]["HasAccessToUtility"] = "No";

            //    if (dt_soh.Rows[i]["PowerUser"].ToString() == "1")
            //        dt_soh.Rows[i]["PowerUser"] = "Yes";
            //    else dt_soh.Rows[i]["PowerUser"] = "No";

            //    if (dt_soh.Rows[i]["AccountDisabled"].ToString() == "1")
            //        dt_soh.Rows[i]["AccountDisabled"] = "Yes";
            //    else dt_soh.Rows[i]["AccountDisabled"] = "No";

            //    if (dt_soh.Rows[i]["InitialLogin"].ToString() == "1")
            //        dt_soh.Rows[i]["InitialLogin"] = "Yes";
            //    else dt_soh.Rows[i]["InitialLogin"] = "No";
            //}

                if (dt_soh.Columns.Count < 1)
                {
                    dt_soh.Columns.Add(" ", typeof(string));
                    dt_soh.Columns.Add("MRP - " + String.Format("{0:MMMM}", System.DateTime.Today).ToString(), typeof(string));
                    dt_soh.Columns.Add("MRP - " + String.Format("{0:MMMM}", System.DateTime.Today.AddMonths(1)).ToString(), typeof(string));
                    dt_soh.Columns.Add("MRP - " + String.Format("{0:MMMM}", System.DateTime.Today.AddMonths(2)).ToString(), typeof(string));
                    dt_soh.Columns.Add("SOH", typeof(string));
                    dt_soh.Columns.Add("Expiration Date (mm/dd/yyyy)", typeof(string));
                    dt_soh.Columns.Add("Batch No.", typeof(string));
                    dt_soh.Columns.Add("Days Level Standard", typeof(string));
                    dt_soh.Columns.Add("Days Level Actual", typeof(string));
                    dt_soh.Columns.Add("Days Level Variance", typeof(string));
                    dt_soh.Columns.Add("Remarks", typeof(string));

                }
                else
                {
                    dt_soh.Columns[0].ColumnName = " ";
                    //dt_soh.Columns[1].ColumnName = "MRP - " + String.Format("{0:MMMM}", System.DateTime.Today).ToString();
                    //dt_soh.Columns[2].ColumnName = "MRP - " + String.Format("{0:MMMM}", System.DateTime.Today.AddMonths(1)).ToString();
                    //dt_soh.Columns[3].ColumnName = "MRP - " + String.Format("{0:MMMM}", System.DateTime.Today.AddMonths(2)).ToString();
                    //dt_soh.Columns[4].ColumnName = "SOH";
                    //dt_soh.Columns[5].ColumnName = "Expiration Date (mm/dd/yyyy)";
                    //dt_soh.Columns[6].ColumnName = "Batch No.";
                    //dt_soh.Columns[7].ColumnName = "Days Level Standard";
                    //dt_soh.Columns[8].ColumnName = "Days Level Actual";
                    //dt_soh.Columns[9].ColumnName = "Days Level Variance";
                    //dt_soh.Columns[10].ColumnName = "Remarks";
                }



            soh.dataSource(dt_soh);
            soh.AddNew(false);
            soh.minRow(5);
            soh.RowHeight(25);
            soh.TableHeight(200);
            soh.HeaderTextColor("#FFFFFF");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("gray", "darkGray");

            soh.nwobject(0).Width(21);
            soh.nwobject(1).Width(70);
            //soh.nwobject(2).Width(70);
            //soh.nwobject(3).Width(70);



            //soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");
            //soh.nwobject(1).Template("<button class=\"lug_grid1\">{1}</button>");
           
            //soh.nwobject(2).Template("<input value=\"{2}\">");
            //soh.nwobject(3).Template("<input value=\"{3}\">");
            //soh.nwobject(4).Template("<input value=\"{4}\">");


           js.makeHTML("#nwExportContainer", soh.createTable());
           // return strF;
        }
        public string CreateGrid2()
        {
            string strF = "";
            int row = 0;

            nwGrid soh = new nwGrid("grid2");
            DataTable dt_soh = new DataTable();
            string sql = "";
            sql = "Select '',Value1,Value2,Value3,Value4,Value5 from FG.UOMMasterLin2 where code like '" + WebApp.nwobjectText("inCode") + "'";
            dt_soh = nwDataAccess.general_Sql_Select(sql, this.UserDefinedConnectionString);

            if (dt_soh.Columns.Count < 1)
            {
                dt_soh.Columns.Add(" ", typeof(string));
                dt_soh.Columns.Add("MRP - " + String.Format("{0:MMMM}", System.DateTime.Today).ToString(), typeof(string));
                dt_soh.Columns.Add("MRP - " + String.Format("{0:MMMM}", System.DateTime.Today.AddMonths(1)).ToString(), typeof(string));
                dt_soh.Columns.Add("MRP - " + String.Format("{0:MMMM}", System.DateTime.Today.AddMonths(2)).ToString(), typeof(string));
                dt_soh.Columns.Add("SOH", typeof(string));
                dt_soh.Columns.Add("Expiration Date (mm/dd/yyyy)", typeof(string));
                dt_soh.Columns.Add("Batch No.", typeof(string));
                dt_soh.Columns.Add("Days Level Standard", typeof(string));
                dt_soh.Columns.Add("Days Level Actual", typeof(string));
                dt_soh.Columns.Add("Days Level Variance", typeof(string));
                dt_soh.Columns.Add("Remarks", typeof(string));

            }
            else
            {
                dt_soh.Columns[0].ColumnName = " ";
                //dt_soh.Columns[1].ColumnName = "MRP - " + String.Format("{0:MMMM}", System.DateTime.Today).ToString();
                //dt_soh.Columns[2].ColumnName = "MRP - " + String.Format("{0:MMMM}", System.DateTime.Today.AddMonths(1)).ToString();
                //dt_soh.Columns[3].ColumnName = "MRP - " + String.Format("{0:MMMM}", System.DateTime.Today.AddMonths(2)).ToString();
                //dt_soh.Columns[4].ColumnName = "SOH";
                //dt_soh.Columns[5].ColumnName = "Expiration Date (mm/dd/yyyy)";
                //dt_soh.Columns[6].ColumnName = "Batch No.";
                //dt_soh.Columns[7].ColumnName = "Days Level Standard";
                //dt_soh.Columns[8].ColumnName = "Days Level Actual";
                //dt_soh.Columns[9].ColumnName = "Days Level Variance";
                //dt_soh.Columns[10].ColumnName = "Remarks";
            }



            soh.dataSource(dt_soh);
            soh.AddNew(true);
            soh.minRow(5);
            soh.RowHeight(25);
            soh.TableHeight(200);
            soh.HeaderTextColor("#FFFFFF");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("green", "darkgreen");

            soh.nwobject(0).Width(21);
            soh.nwobject(1).Width(70);
           soh.nwobject(2).Width(70);
            //soh.nwobject(3).Width(70);



            soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");
            //soh.nwobject(4).Template("<input value=\"{4:#,#0}\" class=\"isNumber\">");
            //soh.nwobject(1).Template("<input value=\"{1}\">");
            soh.nwobject(1).Template("<button class=\"lug_grid2\">{1}</button>");
            soh.nwobject(2).Template("<input value=\"{2}\">");
            soh.nwobject(3).Template("<input value=\"{3}\">");
            soh.nwobject(4).Template("<input value=\"{4}\">");
            soh.nwobject(5).Template("<input value=\"{5}\">");



            strF += js.makeHTML("#nwGrid2", soh.createTable().Replace("'", "\\'"));
            strF += js.makeHTML("#Div1", soh.createTable().Replace("'", "\\'"));
            return strF;
        }

        public void CreatePowerUserGrid(string xusercode)
        {
            CreatePowerUserGrid(xusercode,false);
        }
        public void CreatePowerUserGrid(string xusercode,bool isnew)
        {
            //if (xusercode.Trim() == "" && isnew == false)
            //    return;

            string gridID = "nwGrid1";
            nwGrid soh = new nwGrid(gridID);
            DataTable dt_soh = new DataTable();
            dt_soh = dao.GetPowerUSer(xusercode);
            //  dt_soh.Columns[0].AllowDBNull = true;
            dt_soh.Columns[1].AllowDBNull = true;
            dt_soh.Columns[2].AllowDBNull = true;
            //  dt_soh.Columns[1].ColumnName = "";

            soh.dataSource(dt_soh);
            soh.minRow(1);
            soh.RowHeight(20);
            soh.TableHeight(300);
            soh.HeaderTextColor("black");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            soh.nwobject(0).Width(21);
            soh.nwobject(1).Width(130);
            soh.nwobject(2).Width(500);

            soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");
            soh.nwobject(1).Template("{1}");
            soh.nwobject(2).Template("{2}");

            soh.nwobject(1).ColumnName("User Code");

            //soh.buttonSearchFind = true;
            //soh.GetSaveWith(this.UserDefinedConnectionString, dao.MenuItemCode + "-1", based.SecurityAccess.RecUser);
            //soh.buttonResetColumn = true;
            //soh.buttonSaveColumn = true;

            //soh.buttonInsert = true;
            //soh.buttonDelete = true;


            soh.varSpreadBook = "nwGrid1_Book";
            soh.varSpreadSheet = "nwGrid1_Sheet";

            js.makeHTML("#nwGrid1", soh.createTable());
            //js.ADD("setTimeout(function(){nwGrid_TableAdjust(\"" + gridID + "\")},300);");
            //js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            //js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

        }

        public void ExportGrid()
        {

            nwGrid soh = new nwGrid("nwExportContainer");
            DataTable dt_soh = new DataTable();
            string user = "SELECT [Code],[Description] FROM [FPTI].[User]";
            dt_soh = SFObject.LoadDataTable(user, based.SecurityAccess.ConnectionString);
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
            }

            soh.dataSource(dt_soh);
            // soh.minRow(1);
            soh.RowHeight(20);
            soh.minRow(0);
            soh.TableHeight(900);
            soh.HeaderTextColor("#FFFFFF");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("green", "darkgreen");
            soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            js.makeHTML("#nwExportContainer", soh.createTable());
            string strF = "";
            strF = string.Format(@"<div class='nwCuz-009'>Company:{0}</div><div>System User:{1}</div><div>System Date:{2}</div>"
                    , based.SecurityAccess.Company,
                    based.SecurityAccess.RecUser
                    , DateTime.Now.ToString());

            js.makePrepend("#nwExportContainer", strF);
        }

        public string checkDuplicate(string code) {
            if (SFObject.returnText(string.Format(@"Select 1 from [FPTI].[User] where code = '{0}'", code), based.SecurityAccess.ConnectionString) == "1")
            {
                return "1";
            }
            else 
            {
                return "0";
            }
        }


        public void DeleteConnectedtoToDeletedUser(string userid) {
            try
            {
                string delfromdashboard = "";
                string script = string.Format(@"
            Delete [FPTI_NW].[NW_CompanyUserItemMappingWeb] where SysUser = '{0}'
            Delete [FPTI_NW].[noahweb_zEmail] where Userid = '{0}'
            Delete [FPTI_NW].[noahweb_zSms] where Userid = '{0}'
            Delete [FPTI_NW].[CompanyUserAlertMapping] where SysUser = '{0}'
            Delete [FPTI_NW].[CompanyUserMapping] where SysUser = '{0}'
            ", userid);
                SFObject.ExcuteQuery(script, based.SecurityAccess.ConnectionString);
                //DataTable dtconnection = SFObject.LoadDataTable("SELECT [value] FROM [FPTI_NW].[noahweb_SystemConfigWEB] where code like '%p8Dash_ConectConfig-P8-DASHBOARD%'", based.SecurityAccess.ConnectionString);
                //if (dtconnection.Rows.Count >= 1)
                //{
                //    foreach (DataRow dtrow in dtconnection.Rows)
                //    {
                //        try
                //        {
                //            string connection = dtrow["value"].ToString();
                //            delfromdashboard = string.Format(@" Delete From dbo.screenPublishCollection where UserType = 'acc2' and Userid  = '{0}' ", userid);
                //            SFObject.ExcuteQuery(delfromdashboard, connection);
                //        }
                //        catch (Exception ex) { }
                //    }
                //}
            }
            catch { 
            
            }
        }


        private string CheckMinimumLength(int Type, int length, string Type2, ref string templength)
        {
            try {
                string query = string.Empty;
                if (Type == 1)
                {
                    query = string.Format(@"SELECT [value] FROM [dbo].[SystemConfig] where code ='MINUSERID'");
                } else {
                    query = string.Format(@"SELECT [value] FROM [dbo].[SystemConfig] where code ='MINUSERPWD'");
                }
                templength = SFObject.returnText(query, based.SecurityAccess.ConnectionString);
                if (string.IsNullOrEmpty(templength) || templength == "0")
                {  return ""; }
                else { 
                    if (length < Int32.Parse(templength))
                    {
                        return string.Format(@"Invalid {0} Length", Type2); 
                    }
                    else { return ""; } 
                }
            }
            catch {
                return "";
            }
        
        
        }

        private void DecryptPassword()
        {
            NoahWebLib.Security.NOAHEncryptor nwSecurity = new NoahWebLib.Security.NOAHEncryptor();
            string strFinal = WebApp.nwobjectText("inPassword");
            strFinal = nwSecurity.DecryptString(strFinal);
            js.makeValueText("#inPassword", strFinal);
           // js.ADD("$('#inPassword').select()");
        }


        private string validatepasswordcharacters(string xpassword)
        {
            string xret = "";
            try
            {
                NoahWebLib.Security.nwConfiguration nwSecurity = new NoahWebLib.Security.nwConfiguration();
                try{
                    xpassword = nwSecurity.nwDecrpytString(xpassword);
                }catch{}

                string query = string.Format(@"SELECT [value] FROM [dbo].[SystemConfig] where code ='PWDCONTAIN'");
                string passcontain = SFObject.returnText(query, based.SecurityAccess.ConnectionString);
                //string xpassword = WebApp.nwobjectText("inPassword");
                bool xA = false;
                bool xN = false;
                bool xC = false;
                bool xU = false;
                bool xL = false;
                if (passcontain.Contains('A'))
                {
                    xA = true;
                }
                if (passcontain.Contains('N'))
                {
                    xN = true;
                }
                if (passcontain.Contains('C') || passcontain.Contains('S'))
                {
                    xC = true;
                }
                if (passcontain.Contains('U'))
                {
                    xU = true;
                }
                if (passcontain.Contains('L'))
                {
                    xL = true;
                }

                if(!chkpassword(xpassword, 1) && xA)
                    xret += "Cannot be saved. Password must contain an alphabet character. \n";
                if(!chkpassword(xpassword, 2) && xN)
                    xret += "Cannot be saved. Password must contain a numeric character. \n";
                if (!chkpassword(xpassword, 3) && xC)
                    xret += "Cannot be saved. Password must contain a special character. \n";
                if (!chkpassword(xpassword, 4) && xU)
                    xret += "Cannot be saved. Password must contain an uppercase character. \n";
                if (!chkpassword(xpassword, 5) && xL)
                    xret += "Cannot be saved. Password must contain a lowercase character. \n";




               // if (xret.Trim() != "") xret = "Cannot Save.\n" + xret;

                //if (xA && !xN && !xC)
                //{
                //    if (chkpassword(xpassword, 2))
                //        xret += "Cannot Save. Password must not contain numeric characters \n";
 
                //    if (chkpassword(xpassword, 3))
                //        xret += "Cannot Save. Password must not contain special characters \n";
                //}
                //else if (xA && xN && !xC)
                //{
                //     if (chkpassword(xpassword, 3))
                //         xret += "Cannot Save. Password must not contain special characters \n";
                //}
                //else if (xA && !xN && xC)
                //{
                //     if (chkpassword(xpassword, 2))
                //         xret += "Cannot Save. Password must not contain numeric characters \n";
                //}
                //else if (!xA  && xN && !xC)
                //{
                //     if (chkpassword(xpassword, 1))
                //         xret += "Cannot Save. Password must not contain alphabet characters \n";

                //     if (chkpassword(xpassword, 3))
                //         xret += "Cannot Save. Password must not contain special characters \n";
                //}
                //else if (!xA && xN && xC)
                //{
                //     if (chkpassword(xpassword, 1))
                //         xret += "Cannot Save. Password must not contain alphabet characters \n";

                //     if (chkpassword(xpassword, 3))
                //         xret += "Cannot Save. Password must not contain special characters \n";
                //}
                //else if (!xA && !xN && xC)
                //{
                //     if (chkpassword(xpassword, 1))
                //        xret += "Cannot Save. Password must not contain alphabet characters \n";

                //     if (chkpassword(xpassword, 2))
                //         xret += "Cannot Save. Password must not contain numeric characters.\n";
                //}
            }
            catch
            {
                return "";
            }


            return xret;


        }
        private bool chkpassword(string xpasswrd, int type)
        {
            int maxletters = xpasswrd.Length;
            switch (type)
            { 
                case 1:
                    for (int i = 0; i < maxletters; i++)
                    {
                        if (char.IsLetter(xpasswrd[i]))
                        {
                            return true;
                        }
                    }
                    break;

                case 2:
                    for (int i = 0; i < maxletters; i++)
                    {
                        if (char.IsNumber(xpasswrd[i]))
                        {
                            return true;
                        }
                    }
                    break;

                case 3:
                    for (int i = 0; i < maxletters; i++)
                    { 
                        if (!char.IsLetter(xpasswrd[i]))
                        {
                            if (!char.IsNumber(xpasswrd[i]))
                            {
                                return true;
                            }
                        }
                    }
                    break;
                case 4:  // uppercase
                    for (int i = 0; i < maxletters; i++)
                    {
                        if (char.IsUpper(xpasswrd[i]))
                        {
                            return true;
                        }
                    }
                    break;
                case 5:  // lowwercase
                    for (int i = 0; i < maxletters; i++)
                    {
                        if (char.IsLower(xpasswrd[i]))
                        {
                            return true;
                        }
                    }
                    break;
            }

            return false;
        }

        public static string NumberToWords(int number)
        {
            if (number == 0)
                return "zero";

            if (number < 0)
                return "minus " + NumberToWords(Math.Abs(number));

            string words = "";

            if ((number / 1000000) > 0)
            {
                words += NumberToWords(number / 1000000) + " million ";
                number %= 1000000;
            }

            if ((number / 1000) > 0)
            {
                words += NumberToWords(number / 1000) + " thousand ";
                number %= 1000;
            }

            if ((number / 100) > 0)
            {
                words += NumberToWords(number / 100) + " hundred ";
                number %= 100;
            }

            if (number > 0)
            {
                if (words != "")
                    words += "and ";

                var unitsMap = new[] { "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen" };
                var tensMap = new[] { "zero", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety" };

                if (number < 20)
                    words += unitsMap[number];
                else
                {
                    words += tensMap[number / 10];
                    if ((number % 10) > 0)
                        words += "-" + unitsMap[number % 10];
                }
            }

            return words;
        }


    }
}





