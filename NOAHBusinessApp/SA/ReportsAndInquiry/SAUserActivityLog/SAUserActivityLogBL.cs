using System;
using System.Collections;
using System.Collections.Generic;
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
using System.Data.SqlClient;

using NoahWebLib;
using NoahWebLib.NoahWebFunction;
using NoahWebLib.NoahWebDataAccess;
using NoahWebLib.Security;
using NoahWebLib.NoahWebUI;





using DALComponent;

namespace Noah_Web.forms_BusinessLayer
{
    public class SAUserActivityLogBL : nwAction
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

            dal = new SAUserActivityLogDAL(this.UserDefinedConnectionString, ""); 
            if (_strmet == "get_Initialize") strFinal = get_Initialize() ;
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
        string RecordOperationResult = string.Empty;
        SAUserActivityLogDAL dal;
        public SAUserActivityLogBL()
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
                try { pozt = Convert.ToInt32(poz); }
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
            string strFinal = string.Empty; string strRet = string.Empty; string sqlOrig = sql;
            DataTable dt = new DataTable();
            int startColumn = 0; int rownumber = startIndex;
            if (batchRowcounts >= 1)
            {
                startColumn = 1;
                sql = string.Format(@"Select x.* from(select ROW_NUMBER()  over (order by (select 0)) as [aagrowNum], b.* from ({0})  b) x where x.aagrowNum>={1} AND  x.aagrowNum <={2} order by x.aagrowNum", sql, startIndex, startIndex + batchRowcounts);
            }

            dt = SFObjects.LoadDataTable(sql, strconn);
            int rowCount = dt.Rows.Count;

            for (int i = 0; i < rowCount; i++)
            {
                strFinal += "<tr id=\"" + tableName + "-tr" + rownumber + "\">";
                for (int i2 = startColumn; i2 < dt.Columns.Count; i2++)
                {
                    strFinal += "<td class=\"aag" +dt.Columns[i2].ColumnName.ToString().ToLower() + "\">" + dt.Rows[i][i2].ToString().Replace("'", "\\'") + "</td>";
                }
                strFinal += "</tr>";
                rownumber += 1;
            }
            if (batchRowcounts >= 1 && rowCount >= batchRowcounts)
            {
               strRet = "func_ToolboxDataBat(\'" + tableName + "\', \'" + sqlOrig.Replace("\\", "\\\\").Replace("\'", "\\'") + "\', \'" + strconn.Replace("\\", "\\\\") + "\', \'" + (startIndex + batchRowcounts + 1).ToString() + "\', \'" + (batchRowcounts).ToString() + "\');";
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
                ////// look up 


                case "getlugCode":

                      if (WebApp.nwobjectText("nwaccess") == "1" && dal.CheckConfig())
                      {

                          strSQL = string.Format(@"SELECT DISTINCT [User].Code,[User].Description  from [FPTI].[User] [User]
                                                LEFT JOIN  fpti.CompanyUserMapping Map ON Map.SysUser = [User].Code
                                                LEFT JOIN [FPTI_NW].[SuperAdmin] c ON c.Company = Map.Company
                                                where [User].HasAccessToUtility != 1 AND c.UserID = '{2}' AND (Map.Company = '{1}' OR '{1}' = '') AND ([User].[code] like '%{0}%' or [User].[Description] like '%{0}%') ", strSearchVal, WebApp.nwobjectText("lugCode2"), based.SecurityAccess.RecUser);

                      }
                      else {

                          strSQL = string.Format(@"SELECT DISTINCT [User].Code,[User].Description  from [FPTI].[User] [User]
                                                LEFT JOIN  fpti.CompanyUserMapping Map ON Map.SysUser = [User].Code
                                                where [User].HasAccessToUtility != 1 AND (Map.Company = '{1}' OR '{1}' = '') AND ([User].[code] like '%{0}%' or [User].[Description] like '%{0}%') ", strSearchVal, WebApp.nwobjectText("lugCode2"));

                      }



                      if (sqlpoweruser(WebApp.nwobjectText("lugCode3"), WebApp.nwobjectText("nwaccess"), dal.CheckConfig()) != "") { strSQL = sqlpoweruser(WebApp.nwobjectText("lugCode3"), WebApp.nwobjectText("nwaccess"), dal.CheckConfig()); } 
                  strMethod = strMethod.Substring(3);
                  strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   //strFinal += strSQL + " " + strConn;
                   break;


                case "getlugCode2":
                   //strSQL = string.Format(@"select '-' as Code,'-' as Description From [FPTI].[Company] union SELECT Code,Description  from FPTI.Company where [code] like '%{0}%' or [Description] like '%{0}%' ", strSearchVal);

                   if (WebApp.nwobjectText("nwaccess") == "1" && dal.CheckConfig())
                   {

                       strSQL = string.Format(@"
                                            Select DISTINCT comp.Code,comp.Description  from fpti.CompanyUserMapping map
                                            LEFT JOIN FPTI.Company comp ON map.Company = comp.Code 
                                            LEFT JOIN [FPTI_NW].[SuperAdmin] c ON c.Company = map.Company
                                            where c.UserID = '{2}' AND (map.SysUser = '{1}' OR '{1}' = '') AND (comp.[code] like '%{0}%' or comp.[Description] like '%{0}%') ", strSearchVal, WebApp.nwobjectText("lugCode3"), based.SecurityAccess.RecUser);

                   }
                   else {

                       strSQL = string.Format(@"
                                            Select DISTINCT comp.Code,comp.Description  from fpti.CompanyUserMapping map
                                            LEFT JOIN FPTI.Company comp ON map.Company = comp.Code 
                                            where (map.SysUser = '{1}' OR '{1}' = '') AND (comp.[code] like '%{0}%' or comp.[Description] like '%{0}%') ", strSearchVal, WebApp.nwobjectText("lugCode3"));


                   }

                   
                   strMethod = strMethod.Substring(3);
                   strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   break;

                case "getlugCode3":

                   if (WebApp.nwobjectText("nwaccess") == "1" && dal.CheckConfig())
                   {
                       strSQL = string.Format(@"
                       SELECT DISTINCT [User].Code,[User].Description  from [FPTI].[User] [User]
                       LEFT JOIN  fpti.CompanyUserMapping Map ON Map.SysUser = [User].Code
                       LEFT JOIN [FPTI_NW].[SuperAdmin] c ON c.Company = Map.Company
                       where c.UserID = '{2}' AND (Map.Company = '{1}' OR '{1}' = '') AND PowerUser  = 1 and ([code] like '%{0}%' or [Description] like '%{0}%') ", strSearchVal, WebApp.nwobjectText("lugCode2"), based.SecurityAccess.RecUser);
                   }
                   else {
                       strSQL = string.Format(@"
                       SELECT DISTINCT [User].Code,[User].Description  from [FPTI].[User] [User]
                       LEFT JOIN  fpti.CompanyUserMapping Map ON Map.SysUser = [User].Code
                       where (Map.Company = '{1}' OR '{1}' = '') AND PowerUser  = 1 and ([code] like '%{0}%' or [Description] like '%{0}%') ", strSearchVal, WebApp.nwobjectText("lugCode2"));
                   }

                   
                   strMethod = strMethod.Substring(3);
                   strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   break;

               case "getaddmodule":
                   strSQL = string.Format(@"select Code,Description  from  [fpti].[Module]", strSearchVal);
                   strMethod = strMethod.Substring(3);
                   strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   break;

               case "getadduser":
                   strSQL = string.Format(@"select DISTINCT a.SysUser,b.Description from fpti.CompanyUserMapping a
                                                left join fpti.[User] b
                                                on a.SysUser = b.Code where [code] like '%{0}%' or [Description] like '%{0}%'  ", strSearchVal);
                   strMethod = strMethod.Substring(3);
                   strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   break;

               case "getcopymodule":
                   strSQL = string.Format(@"select code,description from fpti.Company  where [code] like '%{0}%' or [Description] like '%{0}%'", strSearchVal);
                   strMethod = strMethod.Substring(3);
                   strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   Inquire();
                   break;


               case "getcopyuser":
                   strSQL = string.Format(@"select code,description from fpti.Company  where [code] like '%{0}%' or [Description] like '%{0}%'", strSearchVal);
                   strMethod = strMethod.Substring(3);
                   strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   Inquire();
                   break;

               case "gettoolboxInquire":
                   strSQL = string.Format(@"Select Code,Description From FPTI_NW.nw_Application_Setup_HDR where [code] like '%{0}%' or [Description] like '%{0}%'  ", strSearchVal);
                   strMethod = strMethod.Substring(3);
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
                    string ServerDate = SFObjects.GetServerDateTime(UserDefinedConnectionString).ToString("MM/dd/yyyy");
                    js.makeValueText("#from", ServerDate);
                    js.makeValueText("#thru", ServerDate);

                    nwToolBox.bindingNavigatorSaveItem.Enable = true;
                    nwToolBox.bindingNavigatorAddNewItem.Enable = true;
                         nwToolBox.bindingNavigatorPrintItem.Enable =
                         nwToolBox.bindingNavigatorInquireItem.Enable =
                         nwToolBox.bindingNavigatorImportItem.Visible=
                         nwToolBox.bindingNavigatorDeleteItem.Enable =
                         nwToolBox.bindingNavigatorDeleteItem.Visible =
                         nwToolBox.bindingNavigatorExportItem.Enable = false;
                        CreateGrid1("",false);
                        CreateGrid2();
                        isNewRow = true;
                   
                    break;
                case eRecordOperation.Save:
                    RecordOperationResult = string.Empty;

                    if (AreValidEntries() == true)
                    {
                            DataTable dtData,dtDataLin,dtDataLin2 = new DataTable();
                            dtData = LoadSchema();
                           dtDataLin = LoadSchemaLin();
                           dtDataLin2 = LoadSchemaLin2();
                            RecordOperationResult = dal.SaveData(dtData, dtDataLin, dtDataLin2, isNewRow);
                       // RecordOperationResult = dal.SaveData(dtData, isNewRow);
                        //   RecordOperationResult = dal.SaveData(dtData, dtData, dtDataLin2, isNewRow);
                            Prompt.Information(RecordOperationResult, based.Title);
                    }
                    else
                    {
                        
                    }
                    
                    break;
                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("inCode"));
                    Prompt.Information(RecordOperationResult, based.Title);
                    //RecordOperationResult = dal.DeleteData(id, itemcode, connectionString);
                    RefreshData();
                    break;

                case eRecordOperation.Process:
                    tempstr = "Process";
                    Prompt.Information(tempstr, based.Title);
                     break;

                case eRecordOperation.Refresh:
                    //string DateFrom = WebApp.nwobjectText("InvalidDate");

                    //if (!string.IsNullOrEmpty(DateFrom))
                    //{
                    //    Prompt.Information("From Date should not be later than To Date.");
                    //}
                    //else
                    //{
                        InitializeData();
                    //}
                  //   RefreshData();
                  
                     break;
                   
                case eRecordOperation.Inquire:
                     tempstr = "inqure";
                     Inquire();
                    // Prompt.Information(tempstr, based.Title);
                     break;

                case eRecordOperation.Import:
                     tempstr = "import";
                     Prompt.Information(tempstr, based.Title);
                     break;
                case eRecordOperation.Export:


                     string initialization = "";
                     string from2 = WebApp.nwobjectTextSQL("from");
                     string thru2 = WebApp.nwobjectTextSQL("thru");
                     string company = WebApp.nwobjectTextSQL("idvallugCode2");
                     string user = WebApp.nwobjectTextSQL("idvallugCode");
                     string puser = WebApp.nwobjectTextSQL("idvallugCode3");

                     string CompanyDesc = WebApp.nwobjectText("CompanyDesc");

                     if (company.Trim() == "") company = "%";
                     if (user.Trim() == "") user = "%";
                     if (puser.Trim() == "") puser = "%";
                     string txtSearch = WebApp.nwobjectTextSQL("txtSearch");
                     if (txtSearch.Trim() == "") txtSearch = "%";
                     else txtSearch = "%" + txtSearch + "%";
                     txtSearch = txtSearch.Replace(" ", "%");
                     

                     initialization =
                         string.Format(@"ISNULL(a.CompanyCode,'') like '{0}' and ISNULL(a.UserID ,'')like '{1}' and 
                            ISNULL(a.PowerUserID ,'')like '{4}' and 
                            (CAST(a.RecDate  AS DATE) >= CAST(ISNULL('{2}',GETDATE()) AS DATE) OR '{2}' = '')
                            AND 
                            (CAST(a.RecDate  AS DATE) <= CAST(ISNULL('{3}',GETDATE()) AS DATE) OR '{3}' = '')
                            and a.MenuItem like '{5}'
                        ", company, user, from2, thru2, puser, txtSearch);
                     initialization = string.Format("SELECT UPPER(a.UserID) as 'User ID', b.Description [User Name],a.MenuItem as 'Menu Item',a.RecDate as 'From Time',a.Closedate as 'To Time',a.CompanyCode as 'Company Code',a.WindowsUser as 'Windows User' from FPTI.ActivityUser a left join fpti.[User] b on a.UserID = b.Code where {0}", initialization);
                     

                     ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, -1,initialization,
                                                            based.Title + " Listing", UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, based.SecurityAccess.ConnectionStringCompany),
                                                           based.SecurityAccess.RecUserName, based.Title + " Listing");

                     //## FOR EXPORTING ###
                     Random rnd = new Random();
                     string SessionID = DateTime.Now.ToString("yyyyddMMhhmmss") + rnd.Next(0, 9999).ToString().PadRight(4, '0');
                     HttpContext.Current.Session["Config_" + SessionID] = frmlist.m_Spread.ExportConfig();
                     HttpContext.Current.Session["Data_" + SessionID] = frmlist.m_Spread.GetDataSource();
                     HttpContext.Current.Session["Filename_" + SessionID] = based.Title + " Listing";
                     HttpContext.Current.Session["Header_" + SessionID] = "0";
                     js.ADD("ExportSessionID='" + SessionID + "'");

                     //## END ##

                     js.Show("#nwExportContainerMain", 0);
                     js.ADD(frmlist.CreateScript());
                     
                    // Prompt.Information(tempstr, based.Title);
                     break;
                case eRecordOperation.Print:
                     tempstr = "print";
                     ExportGrid();
                     js.ADD("tableToPrint(\"nwExportContainer\");");
                     //Prompt.Information(tempstr, based.Title);
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
            if (based.isInterface == true) dal.UpdateVersion();

            if (dal.CheckHasAccess(based.SecurityAccess.RecUser))
            {

                js.ADD("nwaccess = '1'");

            }


            CreateGrid1("", false);

            CreateGrid2();
            js.makeValueText("#thru", SFObject.GetServerDateTime(based.SecurityAccess.ConnectionString).ToString("MM/dd/yyyy"));
            js.makeValueText("#from", SFObject.GetServerDateTime(based.SecurityAccess.ConnectionString).ToString("MM/dd/yyyy"));
     

            //strFinal += CreateGrid1() + CreateGrid2();

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
                case "actItemChange":
                    // strFinal = Item_Change();
                    break;
                case "actBindCollection":
                    Data_Enable();
                    BindCollection();
                    //CreateGrid1("0");
                    CreateGrid2();
                    break;
                case "actLoadGrid":
                    Prompt.Information(WebApp.nwobjectText("lugCode"),based.Title);
                    CreateGrid3(WebApp.nwobjectText("copyCode"));
                    CreateGrid4(WebApp.nwobjectText("userCode"));
                    CreateGrid2();
                    break;
                case "actLoadPager":
                    InitializeData();
                  //  string pager = "1";
                   // CreateGrid1("",pager);

                    break;

                case "actClearGrid":
                    CreateGrid1("", false);
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
                    sql = string.Format(@"Select Code,Description From FPTI_NW.nw_Application_Setup_HDR ");
                    strFinal = getToolBoxDataRet(tableName, sql,based.SecurityAccess.ConnectionString =  this.UserDefinedConnectionString , "1", "50");
                    break;
               
            }

            return strFinal;
        }


        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#inCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Code");
            SFObject.SetControlBinding("#inDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Description");
        }
        private void Inquire()
        {
            nwToolBox.bindingNavigatorInquireItem.PrimaryKey = dal.primaryKey;
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


        private void Main_Load()
        {
            

            //js.makeValueText("#thru", SFObject.GetServerDateTime(based.SecurityAccess.ConnectionString).ToString("MM/dd/yyyy"));
            //js.makeValueText("#from", SFObject.GetServerDateTime(based.SecurityAccess.ConnectionString).ToString("MM/dd/yyyy"));


        }

        private bool AreValidEntries()
        {
            string errorResult = String.Empty;

            if (WebApp.nwobjectText("inCode").Equals(string.Empty))
                errorResult += "Cannot Save. Please provide a valid Code.\n";
            else
            {
                if (WebApp.nwobjectText("inCode").Contains(" "))
                    errorResult += "Cannot Save. Code should not contain spaces.\n";
            }
            if (WebApp.nwobjectText("inDesc").Trim().Equals(string.Empty))
                errorResult += "Cannot Save. Please provide a valid Description.\n";

            
            if (!errorResult.Equals(string.Empty))
                    Prompt.Information(errorResult, based.Title);

            return errorResult.Equals(String.Empty);
        }

        private void RefreshData()
        {

           // Data_Enable();
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")");
           // js.ADD("func_ActionDriven(\"actLoadGrid\", false);");

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
            nwToolBox.bindingNavigatorSaveItem.Enable = !x && based.SecurityAccess.Save;
            
            // bindingNavigatorSaveItem.Enabled = !x && this.SecurityAccess.Save;
        }

        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtData = new DataTable();
            dtData = dal.GetSchema();
            #endregion

            DataRow drDataToAdd = dtData.NewRow();
            drDataToAdd["Code"] = WebApp.nwobjectText("inCode");
            drDataToAdd["Description"] = WebApp.nwobjectText("inDesc");
            #region don't change
            drDataToAdd["recuser"] = drDataToAdd["moduser"] = based.SecurityAccess.RecUser;
            drDataToAdd["recdate"] = drDataToAdd["moddate"] = DateTime.Now; //will be populated as getdate() in sproc
            
            dtData.Rows.Add(drDataToAdd);
            dtData.AcceptChanges();
            #endregion

            return dtData;
        }


        public DataTable LoadSchemaLin()
        {
            #region don't change
            DataTable dtData = new DataTable();
            dtData = dal.GetSchemaLin();
            #endregion

            DataRow drDataToAdd;

            int rowNo = 1;
            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGrid1"));
            for (int row = 0; row < dt.Rows.Count; row++)
            {
                if (dt.Rows[row][1].ToString().Trim() != "")
                {
                    drDataToAdd = dtData.NewRow();
                    drDataToAdd["HDRCode"] = WebApp.nwobjectText("inCode");
                    drDataToAdd["UserCode"] = dt.Rows[row][1].ToString();
                    drDataToAdd["Description"] = dt.Rows[row][2].ToString();

                    #region don't change
                    dtData.Rows.Add(drDataToAdd);
                    dtData.AcceptChanges();
                    #endregion
                    rowNo++;
                }
            }

            return dtData;
        }

        public DataTable LoadSchemaLin2()
        {
            #region don't change
            DataTable dtData = new DataTable();
            dtData = dal.GetSchemaLin2();
            #endregion

            DataRow drDataToAdd;

            int rowNo = 1;
            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGrid2"));
            for (int row = 0; row < dt.Rows.Count; row++)
            {
                if (dt.Rows[row][1].ToString().Trim() != "")
                {
                    drDataToAdd = dtData.NewRow();
                    drDataToAdd["HDRCode"] = WebApp.nwobjectText("inCode");
                    drDataToAdd["Varparameter"] = dt.Rows[row][1].ToString();
                    drDataToAdd["Description"] = dt.Rows[row][2].ToString();
                    drDataToAdd["ParameterType"] = dt.Rows[row][3].ToString();
                    drDataToAdd["ParameterFormat"] = dt.Rows[row][4].ToString();

                    #region don't change
                    dtData.Rows.Add(drDataToAdd);
                    dtData.AcceptChanges();
                    #endregion
                    rowNo++;
                }
            }

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

        public void CreateGrid1(string initialization, bool isNew)
        {
            string strF = "";
            nwGrid soh = new nwGrid("grid1");
            DataTable dt_soh = new DataTable();
            string script = string.Empty;
            if (initialization == "")
            {

                script = string.Format("SELECT UPPER(a.UserID) UserID,b.Description,UPPER(a.PowerUserID) as 'Power User ID',a.MenuItem as 'Menu Item',a.RecDate as 'From Time',a.Closedate as 'To Time',comp.Description as 'Company',a.WindowsUser as 'Windows User' from FPTI.ActivityUser a left join fpti.[User] b on a.UserID = b.Code LEFT JOIN FPTI.Company comp ON comp.code = a.CompanyCode where 1 !=1");

            }
            else if (initialization == "1")
            {

                script = string.Format("SELECT UPPER(a.UserID) UserID,b.Description,UPPER(a.PowerUserID) as 'Power User ID',a.MenuItem as 'Menu Item',a.RecDate as 'From Time',a.Closedate as 'To Time',comp.Description as 'Company',a.WindowsUser as 'Windows User' from FPTI.ActivityUser a left join fpti.[User] b on a.UserID = b.Code LEFT JOIN FPTI.Company comp ON comp.code = a.CompanyCode ORDER BY a.RecDate desc");

            }
            else {

                if (WebApp.nwobjectText("nwaccess") == "1" && dal.CheckConfig())
                {
                    script = string.Format("SELECT UPPER(a.UserID) UserID,b.Description,UPPER(a.PowerUserID) as 'Power User ID',a.MenuItem as 'Menu Item',a.RecDate as 'From Time',a.Closedate as 'To Time',comp.Description as 'Company',a.WindowsUser as 'Windows User' from FPTI.ActivityUser a left join fpti.[User] b on a.UserID = b.Code LEFT JOIN [FPTI_NW].[SuperAdmin] c ON c.Company = a.CompanyCode LEFT JOIN FPTI.Company comp ON comp.code = a.CompanyCode where c.UserID = '{1}' AND  {0} ORDER BY a.RecDate desc", initialization, based.SecurityAccess.RecUser);
                }
                else {
                    script = string.Format("SELECT UPPER(a.UserID) UserID,b.Description,UPPER(a.PowerUserID) as 'Power User ID',a.MenuItem as 'Menu Item',a.RecDate as 'From Time',a.Closedate as 'To Time',comp.Description as 'Company',a.WindowsUser as 'Windows User' from FPTI.ActivityUser a left join fpti.[User] b on a.UserID = b.Code LEFT JOIN FPTI.Company comp ON comp.code = a.CompanyCode where {0} ORDER BY a.RecDate desc", initialization);
                }

                

            }


            dt_soh = SFObject.LoadDataTable(script,based.SecurityAccess.ConnectionString);
            //dt_soh = LoadPager(script, this.UserDefinedConnectionString, "#nwPager", true, "");

            if (dt_soh.Rows.Count > 0)
                js.ADD("$('#noah-webui-Toolbox').bindingExport().enable(true);");

            if (dt_soh.Columns.Count < 1)
            {
                dt_soh.Columns.Add("Column1", typeof(string));
                dt_soh.Columns.Add("Column2", typeof(string));
                dt_soh.Columns.Add("Column3", typeof(string));
                dt_soh.Columns.Add("Column4", typeof(string));

            }
            else
            {
                
                //dt_soh.Columns[0].ColumnName = " ";
               dt_soh.Columns[0].ColumnName = "User ID";
               dt_soh.Columns[1].ColumnName = "User Name";
                dt_soh.Columns[1].AllowDBNull = true;
            }

            soh.buttonSearchFind = true;
            soh.dataSource(dt_soh);
            //soh.AddNew(true);
            soh.minRow(5);
            soh.RowHeight(25);
            soh.PagerPerPage(50);
           // soh.PagerDataEditable(true);
            soh.TableHeight(400);
            //soh.HeaderTextColor("black");
            //soh.backgroundColor("#FFFFFF");
            //soh.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            //soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");
            soh.HeaderBorderColor("#DEDEDE");
            soh.rowBackground("#FFFFFF", "#FFFFFF");
            soh.TableBorderColor("#BBB");
            soh.BodyBorderColor("#BBB");
            soh.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            soh.HeaderTextColor("#131313");
            soh.HoverColor("#DEDEDE", "inherit");
            soh.SelectedRowHover("#DEDEDE");
            soh.SelectedRowHoverColor("inherit");

            soh.nwobject(0).Width(150);
            soh.nwobject(1).Width(250);
            soh.nwobject(2).Width(0);
            soh.nwobject(3).Width(250);
            soh.nwobject(4).Width(150);
            soh.nwobject(5).Width(150);
            soh.nwobject(7).Width(0);
            soh.nwobject(0).Template("{0}");
            soh.nwobject(1).Template("{1}");
            soh.nwobject(2).Template("{2}");

          //  soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");
            //soh.nwobject(0).Template("<input type=\"checkbox\" />");

             //js.makeHTML("#nwGrid1", soh.createTable().Replace("'","\\'"));
            js.makeHTML("#nwGrid1", soh.createTable());
            js.ADD("nwGrid_TableAdjust(\"nwGrid1\")");
            js.ADD("nwGrid_TableFreeze(\"nwGrid1\",0,0)");
            js.ADD("nwGrid_makeResize(\"nwGrid1\")");



        }

        public void CreateGrid2()
        {
      
            nwGrid soh = new nwGrid("grid2");
            DataTable dt_soh = new DataTable();

            dt_soh = SFObject.LoadDataTable(string.Format("Select '',VarParameter+'' as VarParameter,Description,ParameterType,ParameterFormat from [FPTI_NW].[nw_Application_Setup_Parameter_LIN] where HDRcode = '{0}'	", WebApp.nwobjectText("inCode")), this.UserDefinedConnectionString);
                    

            if (dt_soh.Columns.Count < 1)
            {
                dt_soh.Columns.Add("Column1", typeof(string));
                dt_soh.Columns.Add("Column2", typeof(string));
                dt_soh.Columns.Add("Column3", typeof(string));
                dt_soh.Columns.Add("Column4", typeof(string));

            }
            else
            {
                
               dt_soh.Columns[0].ColumnName = " ";
            
               dt_soh.Columns[1].AllowDBNull = true;
            }
            soh.dataSource(dt_soh);
            //soh.AddNew(true);
            soh.minRow(1);
            soh.RowHeight(25);
            soh.TableHeight(500);
            soh.HeaderTextColor("black");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            soh.nwobject(0).Width(30);
            soh.nwobject(1).Width(221);
            soh.nwobject(2).Width(450);
            soh.nwobject(3).Width(200);
            soh.nwobject(4).Width(300);

            soh.nwobject(0).Template("{0}");
            soh.nwobject(1).Template("<input value=\"{1}\"></>");
            soh.nwobject(2).Template("<input value=\"{2}\"></>");
            soh.nwobject(3).Template("<select class=\"nwSelect\" nwValue=\"{3}\"><option value=\"0\">Regular</option><option value=\"1\">Password</option><option value=\"3\">Check</option><option value=\"4\">Date</option></select>");
            soh.nwobject(4).Template("<input value=\"{4}\"></>");
            soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");


            js.makeHTML("#nwGrid2", soh.createTable().Replace("'", "\\'"));
            js.ADD("nwGrid_TableAdjust(\"nwGrid2\")");
           //  js.makeHTML("#Div1", soh.createTable().Replace("'", "\\'"));
            //js.ADD("alert(\"aa\")");
        }


        public void ExportGrid()
        {

            nwGrid soh = new nwGrid("nwExportContainer");
            DataTable dt_soh = new DataTable();

            dt_soh = WebApp.nwGridData(WebApp.nwobjectText("nwGrid1"));
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
                dt_soh.Columns[2].AllowDBNull = true;
                dt_soh.Columns[3].AllowDBNull = true;

            }

            soh.dataSource(dt_soh);
           // soh.minRow(1);
            soh.RowHeight(20);
            soh.TableHeight(900);
            soh.HeaderTextColor("#FFFFFF");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("green", "darkgreen");
            soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            js.makeHTML("#nwExportContainer", soh.createTable());
            string strF = "";
            strF = string.Format(@"<div class='nwCuz-008'>Company:{0}</div><div></div><div>System User:{1}</div><div>System Date:{2}</div>"
                    , based.SecurityAccess.Company,
                    based.SecurityAccess.RecUser
                    , DateTime.Now.ToString("MM-dd-yyyy hh:mm:ss"));

            js.makePrepend("#nwExportContainer", strF);

        }

        public void CreateGrid3(string xcode)
        {
            
            //return base.ExecGetData(cmd, _ConnectionString, true);

            nwGrid soh = new nwGrid("grid2");
            DataTable dt_soh = new DataTable();

            dt_soh = dal.GetDataModule(xcode);

            if (dt_soh.Columns.Count < 1)
            {
                dt_soh.Columns.Add("Column1", typeof(string));
                dt_soh.Columns.Add("Column2", typeof(string));
                dt_soh.Columns.Add("Column3", typeof(string));
                dt_soh.Columns.Add("Column4", typeof(string));
            }
            else
            {
                dt_soh.Columns[0].ColumnName = " ";

                dt_soh.Columns[1].AllowDBNull = true;
            }
            soh.dataSource(dt_soh);
            //soh.AddNew(true);
            soh.minRow(1);
            soh.RowHeight(20);
            soh.TableHeight(500);
            soh.HeaderTextColor("black");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            soh.nwobject(0).Width(30);
            soh.nwobject(1).Width(321);
            soh.nwobject(2).Width(900);

            soh.nwobject(0).Template("{0}");
            soh.nwobject(1).Template("{1}");
            soh.nwobject(2).Template("{2}");

            soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");

            js.makeHTML("#nwGrid2", soh.createTable().Replace("'", "\\'"));
            js.ADD("nwGrid_TableAdjust(\"nwGrid2\")");
        }

   
          public void CreateGrid4(string xxcode)
          {

              nwGrid soh = new nwGrid("grid1");
              DataTable dt_soh = new DataTable();

              dt_soh = dal.GetDataUser(xxcode);

              if (dt_soh.Columns.Count < 1)
              {
                  dt_soh.Columns.Add("Column1", typeof(string));
                  dt_soh.Columns.Add("Column2", typeof(string));
                  dt_soh.Columns.Add("Column3", typeof(string));
                  dt_soh.Columns.Add("Column4", typeof(string));

              }
              else
              {

                  dt_soh.Columns[0].ColumnName = " ";
                  dt_soh.Columns[1].ColumnName = "User";
                  dt_soh.Columns[1].AllowDBNull = true;
                  //dt_soh.Columns[1].ColumnName = "MRP - " + String.Format("{0:MMMM}", System.DateTime.Today).ToString();
                  //dt_soh.Columns[2].ColumnName = "MRP - " + String.Format("{0:MMMM}", System.DateTime.Today.AddMonths(1)).ToString();

              }

              soh.dataSource(dt_soh);
              //soh.AddNew(true);
              soh.minRow(25);
              soh.RowHeight(20);
              soh.TableHeight(500);
              soh.HeaderTextColor("black");
              soh.backgroundColor("#FFFFFF");
              soh.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
              soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

              soh.nwobject(0).Width(30);
              soh.nwobject(1).Width(321);
              soh.nwobject(2).Width(900);

              soh.nwobject(0).Template("{0}");
              soh.nwobject(1).Template("{1}");
              soh.nwobject(2).Template("{2}");

              soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");
              //soh.nwobject(0).Template("<input type=\"checkbox\" />");

              js.makeHTML("#nwGrid1", soh.createTable().Replace("'", "\\'"));
              js.ADD("nwGrid_TableAdjust(\"nwGrid1\")");
          }

          public string sqlpoweruser(string usercode, string nwaccess, bool CheckConfig)
          {

              string sql = string.Empty;

              if (nwaccess == "1" && CheckConfig)
              {
                  sql = string.Format(@"SELECT pua.[UserCode], u.[Description] FROM [FPTI].[PowerUserAssignment] pua
                                                            INNER JOIN [FPTI].[User] u
                                                            ON pua.UserCode = u.Code
                                                            LEFT JOIN FPTI.CompanyUserMapping map ON map.SysUser = u.Code
                                                            LEFT JOIN [FPTI_NW].[SuperAdmin] b ON b.Company = map.Company
                                                            WHERE b.UserID = '{1}' pua.[PowerUserCode]='{0}'", usercode, based.SecurityAccess.RecUser);
              }
              else {
                  sql = string.Format(@"SELECT pua.[UserCode], u.[Description] FROM [FPTI].[PowerUserAssignment] pua
                                                            INNER JOIN [FPTI].[User] u
                                                            ON pua.UserCode = u.Code
                                                            WHERE pua.[PowerUserCode]='{0}'", usercode);
              }
              
              DataTable dt = SFObjects.LoadDataTable(sql, this.UserDefinedConnectionString);

              if (dt.Rows.Count <= 0) { sql = ""; } else { sql = "select '-' as Code,'-'  as Description from [FPTI].[User] union " + sql; }
              return sql;
          }

        


          public void InitializeData() {

              DateTime from = WebApp.nwobjectDate("from");
              DateTime thru = WebApp.nwobjectDate("thru");
              string from2 = WebApp.nwobjectTextSQL("from");
              string thru2 = WebApp.nwobjectTextSQL("thru");
              string company = WebApp.nwobjectTextSQL("idvallugCode2");
              string user = WebApp.nwobjectTextSQL("idvallugCode");
              string puser = WebApp.nwobjectTextSQL("idvallugCode3");
              

              string script = string.Empty;
              string condition = string.Empty;
              string addition = string.Empty;
              if (from > thru) { Prompt.Information("Invalid Date", based.Title); }
              else
              {
                 
                  //if (company.Trim() == "") company = "%";
                  //if (user.Trim() == "") user = "%";
                  //if (puser.Trim() == "") puser = "%";
                  string txtSearch = WebApp.nwobjectTextSQL("txtSearch");
                if (txtSearch.Trim() == "") txtSearch = "";
                else {
                    txtSearch = "and a.MenuItem like '%" + txtSearch + "%'";
                } 
                  

                  condition =
                      string.Format(@"((a.CompanyCode = '{0}' OR '{0}' = '') and (a.UserID = '{1}' OR '{1}' = '') and 
                            (a.PowerUserID = '{4}' OR '{4}' = '') and 
                            (CAST(a.RecDate AS DATE) BETWEEN '{2}' AND '{3}' OR '{2}' = '')) 
                            {5}
                        ", company, user, from2, thru2, puser, txtSearch);


                  if (condition == "") { condition = "1"; }
                  isNewRow = false;
                  CreateGrid1(condition, false);
              }
          
          }
    }
}
