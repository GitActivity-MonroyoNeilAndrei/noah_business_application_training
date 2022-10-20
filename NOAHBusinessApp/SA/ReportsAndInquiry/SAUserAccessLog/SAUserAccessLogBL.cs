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
    public class SAUserAccessLogBL : nwAction
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

            dal = new SAUserAccessLogDAL(this.UserDefinedConnectionString, ""); 
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
        SAUserAccessLogDAL dal;
        public SAUserAccessLogBL()
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
                      string HasAccessToUtility = string.Empty;

                      if (WebApp.nwobjectText("nwaccess") == "1")
                          HasAccessToUtility = "HasAccessToUtility <> '1' AND ";

                      if (dal.CheckConfig())
                      {
                          strSQL = string.Format(@" 
                                SELECT DISTINCT [User].Code,[User].Description  from [FPTI].[User] [User]
                                LEFT JOIN FPTI.CompanyUserMapping Map ON [User].Code = Map.SysUser
                                LEFT JOIN [FPTI_NW].[SuperAdmin] c ON c.Company = Map.Company
                                WHERE {3} c.UserID = '{2}' AND (Map.Company = '{1}' OR '{1}' = '') AND ([User].[code] like '%{0}%' or [User].[Description] like '%{0}%')
                                AND EXISTS (SELECT 1 FROM FPTI.ConnectivityH a
                                            WHERE (CAST(a.LogDate AS DATE) >= CAST(ISNULL('{4}',GETDATE()) AS DATE) OR '{4}' = '')
		                                            AND 
	                                              (CAST(a.LogDate AS DATE) <= CAST(ISNULL('{5}',GETDATE()) AS DATE) OR '{5}' = '')
	                                              AND a.SysUser = [User].Code)", strSearchVal, WebApp.nwobjectText("Company"), based.SecurityAccess.RecUser, HasAccessToUtility, WebApp.nwobjectText("From"), WebApp.nwobjectText("To"));

                      }
                      else {

                          strSQL = string.Format(@" 
                                SELECT DISTINCT conn.SysUser Code,[User].Description  from FPTI.ConnectivityH conn
                                LEFT JOIN [FPTI].[User] [User] ON [User].Code = conn.SysUser
                                LEFT JOIN FPTI.CompanyUserMapping Map ON [User].Code = Map.SysUser
                                where {2} (Map.Company = '{1}' OR '{1}' = '') AND ([User].[code] like '%{0}%' or [User].[Description] like '%{0}%')
                                AND EXISTS (SELECT 1 FROM FPTI.ConnectivityH a
                                            WHERE (CAST(a.LogDate AS DATE) >= CAST(ISNULL('{3}',GETDATE()) AS DATE) OR '{3}' = '')
		                                            AND 
	                                              (CAST(a.LogDate AS DATE) <= CAST(ISNULL('{4}',GETDATE()) AS DATE) OR '{4}' = '')
	                                              AND a.SysUser = [User].Code)", strSearchVal, WebApp.nwobjectText("Company"), HasAccessToUtility, WebApp.nwobjectText("From"), WebApp.nwobjectText("To"));

                      }

                  
                  strMethod = strMethod.Substring(3);
                  strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   //strFinal += strSQL + " " + strConn;
                   break;


                case "getlugCode2":
                  //SELECT '-' as Code,'-' as Description 
                  //  union 
                   //strSQL = string.Format(@"Select Code,Description  from FPTI.Company where [code] like '%{0}%' or [Description] like '%{0}%' ", strSearchVal);
                   if (WebApp.nwobjectText("nwaccess") == "1" && dal.CheckConfig())
                   {
                       strSQL = string.Format(@"Select DISTINCT comp.Code,comp.Description  from fpti.CompanyUserMapping map
                                            LEFT JOIN FPTI.Company comp ON map.Company = comp.Code 
                                            LEFT JOIN [FPTI_NW].[SuperAdmin] c ON c.Company = map.Company
                                            WHERE c.UserID = '{2}' AND (map.SysUser = '{1}' OR '{1}' = '') AND (comp.[code] like '%{0}%' or comp.[Description] like '%{0}%') ", strSearchVal, WebApp.nwobjectText("UserCode"), based.SecurityAccess.RecUser);
                   }
                   else {
                       strSQL = string.Format(@"Select DISTINCT comp.Code,comp.Description  from fpti.CompanyUserMapping map
                                            LEFT JOIN FPTI.Company comp ON map.Company = comp.Code 
                                            where (map.SysUser = '{1}' OR '{1}' = '') AND (comp.[code] like '%{0}%' or comp.[Description] like '%{0}%') ", strSearchVal, WebApp.nwobjectText("UserCode"));
                   }

                   
                   strMethod = strMethod.Substring(3);
                   strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   break;

               case "getaddmodule":
                   strSQL = string.Format(@"select Code,Description  from  [fpti].[Module]       ", strSearchVal);
                   strMethod = strMethod.Substring(3);
                   strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   break;

               case "getadduser":
                   strSQL = string.Format(@"select DISTINCT a.SysUser Code,b.Description from fpti.CompanyUserMapping a
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
                    break;
                case eRecordOperation.Save:
                   
                   
                    break;
                case eRecordOperation.Delete:

                    break;

                case eRecordOperation.Process:
                    tempstr = "Process";
                    Prompt.Information(tempstr, based.Title);
                     break;

                case eRecordOperation.Refresh:
                    string DateFrom = WebApp.nwobjectText("InvalidDate");

                    if (!string.IsNullOrEmpty(DateFrom))
                    {
                        Prompt.Information("From Date should not be later than To Date.");
                    }
                    else
                    {

                        CreateGrid1(true, "");
                    }
                   
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
                     tempstr = "export";

                     string sql="";

                     string from = "";
                     from = WebApp.nwobjectTextSQL("from");
                     string thru = "";
                     thru = WebApp.nwobjectTextSQL("thru");

                     string company = WebApp.nwobjectTextSQL("idvallugCode2");
                     string user = WebApp.nwobjectTextSQL("idvallugCode");
                     nwGrid m_Spread = new nwGrid("grid1");
                     DataTable dt_m_Spread = new DataTable();

                     if (company.Trim() == "") company = "%";
                     if (user.Trim() == "") user = "%";


                     if (WebApp.nwobjectText("nwaccess") == "1" && dal.CheckConfig())
                     {

                         dt_m_Spread = SFObject.LoadDataTable(
                         string.Format(@"SELECT a.SysUser [User ID], b.Description [User Name],isnull(c.Description ,a.Company)[Company],a.ComputerName [Computer Name / IP]
                                    ,a.LogDate [Login Date Time], a.LogOutDate [Logout Date Time] from FPTI.ConnectivityH a left join FPTI.[User] 
                                    b on a.SysUser = b.code LEFT JOIN FPTI.Company c ON a.Company = c.code
                                    LEFT JOIN [FPTI_NW].[SuperAdmin] d ON d.Company = a.Company
                                    where d.UserID = '{4}' AND ISNULL(c.code,a.Company) like '{0}' and ISNULL(a.SysUser,'')like '{1}' and CAST(a.LogDate AS DATE) >= CAST(ISNULL('{2}',GETDATE()) AS DATE)
                                    AND 
                                CAST(a.LogDate AS DATE) <= CAST(ISNULL('{3}',GETDATE()) AS DATE)
                                ", company, user, from, thru, based.SecurityAccess.RecUser), this.UserDefinedConnectionString);
                     }
                     else
                     {


                         dt_m_Spread = SFObject.LoadDataTable(
                          string.Format(@"SELECT a.SysUser [User ID], b.Description [User Name],isnull(c.Description ,a.Company) [Company],a.ComputerName [Computer Name / IP]
                                        ,a.LogDate [Login Date Time], a.LogOutDate [Logout Date Time] from FPTI.ConnectivityH a left join FPTI.[User] 
                                        b on a.SysUser = b.code left join FPTI.Company c on a.Company = c.code  
                                        where ISNULL(c.code,a.Company) like '{0}' and ISNULL(a.SysUser,'')like '{1}' and CAST(a.LogDate AS DATE) >= CAST(ISNULL('{2}',GETDATE()) AS DATE)
                                        AND 
                                    (CAST(a.LogDate AS DATE) <= CAST(ISNULL('{3}',GETDATE()) AS DATE) OR '{3}' = '')
                                    ", company, user, from, thru), this.UserDefinedConnectionString);
                     }


                     if (dt_m_Spread.Columns.Count <= 0)
                     {
                         dt_m_Spread = SFObject.LoadDataTable(
                         string.Format(@"SELECT a.SysUser [User ID], b.Description [User Name],isnull(c.Description ,a.Company)[Company],a.ComputerName 
                            ,a.LogDate [Login Date Time] from FPTI.ConnectivityH a left join FPTI.[User] 
                            b on a.SysUser = b.code left join FPTI.Company c on a.Company = c.code 
                            where ISNULL(c.code,a.Company) like '{0}' and ISNULL(a.SysUser,'')like '{1}' and CAST(a.LogDate AS DATE) >= CAST(ISNULL('{2}',GETDATE()) AS DATE)
                            AND 
                        (CAST(a.LogDate AS DATE) <= CAST(ISNULL('{3}',GETDATE()) AS DATE) OR '{3}' = '')
                        ", company, user, from, thru), this.UserDefinedConnectionString);
                     }


                     ListingAndPrint frmlist = new ListingAndPrint
                                                            (ListingAndPrint.FormType.Listing, -1, dt_m_Spread,
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
           
            Main_Load();
            //strFinal += CreateGrid1() + CreateGrid2();

            execute(ref strFinal);

            //strFinal += get_Method("getcboPaymentType", "", "", "");
            //strFinal += js.makeValueText("#dtpDocDate", DateTime.Now.ToShortDateString());
            return js.makeJSPostScript(strFinal);
        }

        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();

            if (dal.CheckHasAccess(based.SecurityAccess.RecUser))
            {

                js.ADD("nwaccess = '1'");

            }

            CreateGrid1(false, "");

            js.makeValueText("#thru", SFObject.GetServerDateTime(based.SecurityAccess.ConnectionString).ToString("MM/dd/yyyy"));
            js.makeValueText("#from", SFObject.GetServerDateTime(based.SecurityAccess.ConnectionString).ToString("MM/dd/yyyy"));
     

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
                    //CreateGrid1("","");
                    break;
                case "actLoadGrid":
                    Prompt.Information(WebApp.nwobjectText("lugCode"),based.Title);
            
                    break;

                case "actPagerClick":
                   break;

                case "actClearGrid":
                   CreateGrid1(false, "");
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
            CreateGrid1(false,"");
        }
        public void CreateGrid1(bool refresh,string pager)
        {
            string gridID = "nwGrid1";
            string strF = "";
            int row = 0;
            string from = "";
             from =   WebApp.nwobjectTextSQL("from");
            string thru = "";
            thru = WebApp.nwobjectTextSQL("thru");

             string company = WebApp.nwobjectTextSQL("idvallugCode2");
             string user = WebApp.nwobjectTextSQL("idvallugCode");




            nwGrid m_Spread = new nwGrid("grid1");
            DataTable dt_m_Spread = new DataTable();

            if (company.Trim() == "") company = "%";
            if (user.Trim() == "") user = "%";

            if (refresh)
            {

                if (WebApp.nwobjectText("nwaccess") == "1" && dal.CheckConfig())
                {

                    dt_m_Spread = SFObject.LoadDataTable(
                    string.Format(@"SELECT b.Code, b.Description Name,isnull(c.Description ,a.Company)[Company],a.ComputerName [Computer Name / IP]
                            ,a.LogDate [Login Date Time], a.LogOutDate [Logout Date Time] from FPTI.ConnectivityH a left join FPTI.[User] 
                            b on a.SysUser = b.code LEFT JOIN FPTI.Company c ON a.Company = c.code
                            LEFT JOIN [FPTI_NW].[SuperAdmin] d ON d.Company = a.Company
                            where d.UserID = '{4}' AND ISNULL(c.code,a.Company) like '{0}' and ISNULL(a.SysUser,'')like '{1}' and CAST(a.LogDate AS DATE) >= CAST(ISNULL('{2}',GETDATE()) AS DATE)
                            AND 
                        CAST(a.LogDate AS DATE) <= CAST(ISNULL('{3}',GETDATE()) AS DATE)
                        ", company, user, from, thru, based.SecurityAccess.RecUser), this.UserDefinedConnectionString);
                }
                else
                {
                    dt_m_Spread = SFObject.LoadDataTable(
                    string.Format(@"SELECT b.Code, b.Description [User Name],isnull(c.Description ,a.Company)[Company],a.ComputerName [Computer Name / IP]
                            ,a.LogDate [Login Date Time], a.LogOutDate [Logout Date Time] from FPTI.ConnectivityH a left join FPTI.[User] 
                            b on a.SysUser = b.code LEFT JOIN FPTI.Company c ON a.Company = c.code
                            where ISNULL(c.code,a.Company) like '{0}' and ISNULL(a.SysUser,'')like '{1}' and (CAST(a.LogDate AS DATE) >= CAST(ISNULL('{2}',GETDATE()) AS DATE) OR '{2}' = '')
                            AND 
                        (CAST(a.LogDate AS DATE) <= CAST(ISNULL('{3}',GETDATE()) AS DATE) OR '{3}' = '')
                        ", company, user, from, thru), this.UserDefinedConnectionString);
                }




                //if (dt_m_Spread.Columns.Count <= 0)
                //{
                //    dt_m_Spread = SFObject.LoadDataTable(
                //    string.Format(@"SELECT a.SysUser, b.Description [User Name],isnull(c.Description ,a.Company)[Company],a.ComputerName [Computer Name / IP]
                //            ,a.LogDate [Login Datetime] from FPTI.ConnectivityH a left join FPTI.[User] 
                //            b on a.SysUser = b.code left join FPTI.Company c on a.Company = c.code
                //            where ISNULL(c.code,a.Company) like '{0}' and ISNULL(a.SysUser,'')like '{1}' and CAST(a.LogDate AS DATE) >= CAST(ISNULL('{2}',GETDATE()) AS DATE)
                //            AND 
                //        CAST(a.LogDate AS DATE) <= CAST(ISNULL('{3}',GETDATE()) AS DATE)
                //        ", company, user, from, thru), this.UserDefinedConnectionString);
                //}
            }
            


            if (dt_m_Spread.Columns.Count < 1)
            {
                dt_m_Spread.Columns.Add("User ID", typeof(string));
                dt_m_Spread.Columns.Add("User Name", typeof(string));
                dt_m_Spread.Columns.Add("Company", typeof(string));
                dt_m_Spread.Columns.Add("Computer Name / IP", typeof(string));
                dt_m_Spread.Columns.Add("Login Date Time", typeof(string));
                dt_m_Spread.Columns.Add("Logout Date Time", typeof(string));

            }
            else
            {
                
                //dt_m_Spread.Columns[0].ColumnName = " ";
                dt_m_Spread.Columns[0].ColumnName = "User ID";
                dt_m_Spread.Columns[1].AllowDBNull = true;
            }

            m_Spread.dataSource(dt_m_Spread);
            m_Spread.minRow(5);
            m_Spread.RowHeight(25);
            m_Spread.TableHeight(450);
            //m_Spread.HeaderTextColor("black");
            //m_Spread.backgroundColor("#FFFFFF");
            m_Spread.PagerPerPage(50);
            m_Spread.PagerDataEditable(true);
            m_Spread.buttonSearchFind = true;
            //m_Spread.buttonExport = true;
           // m_Spread.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-a1", based.SecurityAccess.RecUser); // this line will be default and suggested line code if there are many grid in one menu item  change -1 to -2 and so on...
           // m_Spread.buttonSaveColumn = true;  // show Save Column button
           // m_Spread.buttonResetColumn = true; // show Reset Column button


            //m_Spread.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            //m_Spread.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");
            m_Spread.HeaderBorderColor("#DEDEDE");
            m_Spread.rowBackground("#FFFFFF", "#FFFFFF");
            m_Spread.TableBorderColor("#BBB");
            m_Spread.BodyBorderColor("#BBB");
            m_Spread.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            m_Spread.HeaderTextColor("#131313");
            m_Spread.HoverColor("#DEDEDE", "inherit");
            m_Spread.SelectedRowHover("#DEDEDE");
            m_Spread.SelectedRowHoverColor("inherit");
            m_Spread.nwobject(0).Width(160);
            m_Spread.nwobject(1).Width(350);
            m_Spread.nwobject(2).Width(360);
            m_Spread.nwobject(3).Width(160);
            m_Spread.nwobject(4).Width(160);
            //m_Spread.nwobject(0).Template("{0}");
            //m_Spread.nwobject(1).Template("{1}");
            //m_Spread.nwobject(2).Template("{2}");


             js.makeHTML("#nwGrid1", m_Spread.createTable());
             js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
             js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
             js.ADD("nwGrid_makeResize(\"" + gridID + "\")");




        }



     

    }
}
