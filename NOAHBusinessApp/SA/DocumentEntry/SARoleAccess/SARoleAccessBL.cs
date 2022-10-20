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
    public class SARoleAccessBL : nwAction
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

            dal = new SARoleAccessDAL(this.UserDefinedConnectionString, ""); 
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
        SARoleAccessDAL dal;
        public SARoleAccessBL()
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
                    strFinal += "<td class=\"aag" + dt.Columns[i2].ColumnName.ToString().ToLower() + "\">" + dt.Rows[i][i2].ToString().Trim().Replace("'", "\\'").Replace(System.Environment.NewLine, "\\n") + "</td>";
                   // strFinal += "<td class=\"aag" + dt.Columns[i2].ColumnName.ToString().ToLower() + "\">" + dt.Rows[i][i2].ToString().Replace("'", "\\'") + "</td>";
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
                      strSQL = string.Format(@"select code,description from fpti.Company where [code] like '%{0}%' or [Description] like '%{0}%'  ", strSearchVal);
                       strMethod = strMethod.Substring(3);
                      strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   //strFinal += strSQL + " " + strConn;
                   break;

                case "getlugCode2":
                    string company = WebApp.nwobjectText("idvallugCode");
                    //strSQL = string.Format(@"select Code,description from  FPTI.Roles", strSearchVal, company);
                    strSQL = string.Format(@"SELECT DISTINCT b.Code, b.Description FROM FPTI.RolesUser a
                                            LEFT JOIN FPTI.Roles b ON a.Roles = b.Code
                                            WHERE a.Company = '{1}'", strSearchVal, company);
                    
                   strMethod = strMethod.Substring(3);
                   CreateGrid1("","",true);

                   ////   mouseDownFunc = "func_ActionDriven(\\'actBranchChange\\', true);";
                   ////mouseDownFunc = "refresh();func_ToolboxADD();func_Check_Lookup(1);func_Clear_Dealer();clearMainTable();func_ActionDriven(\\'actDealerInfo\\', true);";
                   //mouseDownFunc = "refresh();func_ToolboxADD();func_Check_Lookup(1);clearMainTable();func_ActionDriven(\\'actDealerInfo\\', true);";
                   strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   //strFinal += strSQL + " " + strConn;
                   break;


               case "getlug_grid2":
                   strSQL = string.Format(@"select  a.[Module],b.[Description] from [fpti].[CompanyModuleMapping] a
                                left join [fpti].[Module] b
                                on a.[Module] = b.[Code] where [code] like '%{0}%' or [Description] like '%{0}%' ", strSearchVal);
                   strMethod = strMethod.Substring(3);
                   strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   break;


               case "getCopyFrom":

                   strSQL = string.Format(@"select distinct  b.Code as Code , b.Description  from FPTI.Roles  b 
                                            left join  FPTI_NW.NW_CompanyROlesItemMappingWeb a 
                                            on a.Roles = b.Code 
                                            where Company like '{0}' and a.[Roles] not like '{1}' and (b.Description like '%{2}%' or b.Code like '%{2}%') ", WebApp.nwobjectTextSQL("lugCode"), WebApp.nwobjectTextSQL("lugCode2"), strSearchVal);
                   strMethod = strMethod.Substring(3);
                   strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   break;

               case "getLoadRole":
                    strSQL = string.Format(@"select Code,Description  from  [fpti].[Module] ", strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                  break;      

               case "gettoolboxInquire":
                   strSQL = string.Format(@" select Code,Description  from FPTI.Roles  where [code] like '%{0}%' or [Description] like '%{0}%'  ", strSearchVal);
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
                    nwToolBox.bindingNavigatorSaveItem.Enable = true;
                    nwToolBox.bindingNavigatorAddNewItem.Enable =
                     nwToolBox.bindingNavigatorPrintItem.Enable = true;
                     nwToolBox.bindingNavigatorInquireItem.Enable = true;
                     nwToolBox.bindingNavigatorImportItem.Visible = false;
                     nwToolBox.bindingNavigatorDeleteItem.Enable =
                     nwToolBox.bindingNavigatorDeleteItem.Visible = true;
                     nwToolBox.bindingNavigatorExportItem.Enable = false;
                     js.ADD("func_Toolbox_Clear();");
                     
                      CreateGrid1("","",true);
                 
                        isNewRow = true;
                   
                    break;
                case eRecordOperation.Save:
                    RecordOperationResult = string.Empty;

                    if (AreValidEntries() == true)
                    {
                          //  DataTable dtData = new DataTable();
                            DataTable dtData = new DataTable();
                         //   dtData = LoadSchema();
                            RecordOperationResult = dal.SaveData(dtData, isNewRow);
                            Prompt.Information(RecordOperationResult, based.Title);
            
                         //   dtDataLin = LoadSchemaLin();
                          //  dtDataLin2 = LoadSchemaLin2();
                           
                          //  RecordOperationResult = dal.SaveData(dtData, dtDataLin, dtDataLin2, isNewRow);
                        //   RecordOperationResult = dal.SaveData(dtData, dtData, dtDataLin2, isNewRow);
                            
                    }
                    else
                    {
                        
                    }
                    //Prompt.Information("<div style=\"color:red !important;font-weight:bold !important;\">" + RecordOperationResult + "</div>", "Prompt Message");
                    //result += "$('#btnSaved').prop('disabled', true);";
                    //result += "$('#btnSubmit').prop('disabled', false);";
                   
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
                     RefreshData();
                     //CreateGrid1();
                  // CreateGrid2();
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

                    string xcompanyDesc = WebApp.nwobjectText("companydesc");
                    string company = WebApp.nwobjectText("company");
                    string roles = WebApp.nwobjectText("roles");

                    DataTable dtdata = new DataTable();

                    if (company.Trim() == "") company = "%";
                    if (roles.Trim() == "") roles = "%";

                    //dtdata = dal.GetExportData(company, roles);
                    dtdata = dal.GetDataWithFilterExport(company, roles, WebApp.nwobjectText("combobox1"), WebApp.nwobjectText("inSearch"));

                    string LISTINGFILENAME = "Roles Access Listing";
                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, 6, dtdata,
                                                           LISTINGFILENAME, based.SecurityAccess.ConnectionString, xcompanyDesc,
                                                           based.SecurityAccess.RecUserName, LISTINGFILENAME);

                    frmlist.m_Spread.SetText(1, 5, "Access of : " + WebApp.nwobjectText("idvallugCode2") + " | " + WebApp.nwobjectText("descvallugCode2"));
                    frmlist.m_Spread.Rows(3, 1).FontWeight("bold"); 

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
                    js.ADD(frmlist.CreateScript());

                    js.ADD("nwLoading_End('xSample')");

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

            if (based.isInterface == true) dal.UpdateVersion();

            string strFinal = "";
            
            SetBindings();
          
            CreateGrid1("", "", true);

            execute(ref strFinal);

            //strFinal += get_Method("getcboPaymentType", "", "", "");
            //strFinal += js.makeValueText("#dtpDocDate", DateTime.Now.ToShortDateString());
            return js.makeJSPostScript(strFinal);
        }
        public string act_Method(string strMethod, string strParameter, string strValue)
        {
            int method;
            string Filter2;
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
                   // CreateGrid1();
                    CreateGrid1("", "", true);
                    break;
                case "actLoadMainHistorical":
                    DataTable dtMainHistory = new DataTable();
                    dtMainHistory = SFObjects.LoadDataTable(dal.Historical(WebApp.nwobjectText("Company"), WebApp.nwobjectText("Role")), this.UserDefinedConnectionString);
                    Historical(dtMainHistory);
                    js.ADD("nwLoading_End('actLoadMainHistorical')");
                    break;

                case "actLoadGrid":
                    method = 1;

                    CreateGrid1("", "", false);
                    LoadFooter();
                   break;
                case "actFilter":
                     method = 2;
                    CreateGrid1("", "", false);
                   // CreateGrid3(WebApp.nwobjectText("lugCode"), WebApp.nwobjectText("lugCode2"), method, WebApp.nwobjectText("inSearch"), WebApp.nwobjectText("combobox1"));
                    break;
                case "actSave":
                    RecordOperationResult = string.Empty;
                    if (AreValidEntries() == true)
                    {
                        string version = WebApp.nwobjectText("version");
                        DataTable dtData = new DataTable();
                        dtData = LoadSchema(WebApp.nwobjectText("lugCode"), WebApp.nwobjectText("lugCode2"), version);

                        if (dtData.Rows.Count > 0)
                        {

                            if (version == "1")
                            {
                                RecordOperationResult = dal.SaveData(dtData, isNewRow);

                                if (RecordOperationResult.IndexOf("successfully") >= 0)
                                    RecordOperationResult = "Saved successfully";

                                Prompt.Information(RecordOperationResult, based.Title);
                            }
                            else
                            {
                                RecordOperationResult = dal.SaveDataWeb(dtData, isNewRow, based.SecurityAccess.RecUser);

                                if (RecordOperationResult.IndexOf("successfully") >= 0)
                                    RecordOperationResult = "Saved successfully";

                                Prompt.Information(RecordOperationResult, based.Title);
                            }

                        }
                        else
                        {

                            Prompt.Error("Cannot Save. At least 1 line detail is required.", based.Title);

                        }
                    }

                    LoadFooter();

                    js.ADD(" nwLoading_End('actSave')");
                    break;
                case "actcopyfrom":
                    CreateGrid1(WebApp.nwobjectText("CopyFrom"),WebApp.nwobjectText("lugCode"));
                    break;
                case "actcopyfromweb":
                    CreateGrid1(WebApp.nwobjectText("CopyFrom"),WebApp.nwobjectText("lugCode"),false);

                    js.ADD("nwLoading_End('actcopyfromweb')");
                    js.EventClick("#SaveRole");
                    
                    break;
                case "actDetails":
                    customgrid();
                    break;

                case "actPagerClick":

                    //CreateGrid5(WebApp.nwobjectText("lugCode"), WebApp.nwobjectText("lugCode2"), WebApp.nwobjectInt("based"), WebApp.nwobjectInt("finalrange"), WebApp.nwobjectText("inSearch"), WebApp.nwobjectText("combobox1"));  

                    break; 
            }
            return js.makeJSPostScript(execute());
        }


        private void Historical(DataTable dtrecords)
        {

            string LISTINGFILENAME = "";
            if (dal.LISTINGFILENAME + " History Listing" == "") LISTINGFILENAME = "Sheet 1";
            else LISTINGFILENAME = dal.LISTINGFILENAME + " History Listing";

            int maxrow = dal.LISTINGSTARTROW + dtrecords.Rows.Count;


            int dataindex = dal.LISTINGSTARTROW;

            ListingAndPrint frmlist = new ListingAndPrint
                                                   (ListingAndPrint.FormType.Listing, dal.LISTINGSTARTROW, dtrecords,
                                                   LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                   based.SecurityAccess.RecUserName, LISTINGFILENAME);

            

            //loop valdiation
            string tempstring1 = "";
            string tempstring2 = "";
            string toChange = "";
            string toChange2 = "";
            string toChange3 = "";
            string toChange4 = "";


            for (int i = 0; i < dtrecords.Rows.Count; i++)
            {
                frmlist.m_Spread.Rows(i + dataindex).TextColor("black");
            }
            
            for (int i = 0; i < dtrecords.Rows.Count; i++)
            {
                for (int ic = 0; ic < dtrecords.Columns.Count; ic++)
                {
                    if (toChange + toChange2 + toChange3 + toChange4 !=
                       dtrecords.Rows[i][0].ToString() +
                       dtrecords.Rows[i][1].ToString() +
                       dtrecords.Rows[i][2].ToString() +
                       dtrecords.Rows[i][3].ToString())
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

                            if (dtrecords.Rows[i][0].ToString() == dtrecords.Rows[i + 1][0].ToString()
                                    && dtrecords.Rows[i][1].ToString() == dtrecords.Rows[i + 1][1].ToString()
                                    && dtrecords.Rows[i][2].ToString() == dtrecords.Rows[i + 1][2].ToString()
                                    && dtrecords.Rows[i][3].ToString() == dtrecords.Rows[i + 1][3].ToString()
                                    )
                            {
                                if (tempstring1 != tempstring2)
                                {
                                    frmlist.m_Spread.Rows(i + dataindex, ic).TextColor("red");
                                    frmlist.m_Spread.Rows(i + dataindex - 1, ic).TextColor("black");
                                }

                            }
                        }
                        catch { }

                    }
                }

                //frmlist.m_Spread.Rows(0, 0).BackgroundColor("Transparent");
                toChange = dtrecords.Rows[i][0].ToString();
                toChange2 = dtrecords.Rows[i][1].ToString();
                toChange3 = dtrecords.Rows[i][2].ToString();
                toChange4 = dtrecords.Rows[i][3].ToString();
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
                    sql = string.Format(@"select  * from FPTI.Roles");
                    //sql = string.Format(@"select SqlQuery from  FPTI.CompanyAlert");
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
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RecUser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RecDate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "ModUser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "ModDate");

         // SFObject.SetControlBinding("#lugCode .idval", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Company");
           // SFObject.SetControlBinding("#lugCode .descval", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CompanyDescription");
          //  SFObject.SetControlBinding("#inSql", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SqlQuery");
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

            if (WebApp.nwobjectText("lugCode").Trim().Equals(string.Empty))
                errorResult += "Cannot Save. Please provide a valid Database.\n";
            
            if (!errorResult.Equals(string.Empty))
                    Prompt.Information(errorResult, based.Title);

            return errorResult.Equals(String.Empty);
        }

        private void RefreshData()
        {

            Data_Enable();
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
            //nwToolBox.bindingNavigatorSaveItem.Enable = !x && based.SecurityAccess.Save;
            
            // bindingNavigatorSaveItem.Enabled = !x && this.SecurityAccess.Save;
        }

        private DataTable LoadSchema(string a,string b,string version)
        {
            #region don't change
            DataTable dtData = new DataTable();
            dtData = dal.GetSchema();
            DataTable dtData2 = new DataTable();
            dtData2 = dal.GetSchema();
           // DataRow drDataToAdd
            #endregion

            DataRow drDataToAdd2;
            string item = "";
            string module = "";

            DataTable dt = WebApp.nwGridDataWithID("nwGrid2",true);
            int rowNo = 1;


            for (int row = 0; row < dt.Rows.Count; row++)
            {
                #region Start Loading
                //if (version == "0")
                //{
                //    string role = b;
                //    item = dt.Rows[row][1].ToString();
                //    string exeversion = SFObject.returnText(string.Format("Select exeVersionModule  from FPTI_NW.noahweb_menuItems_Info where code = '{0}' ", item), this.UserDefinedConnectionString);
                //    string exeversionModule = SFObject.returnText(string.Format("Select exeVersion  from FPTI_NW.noahweb_menuItems_Info where code = '{0}' ", item), this.UserDefinedConnectionString);

                //    if (exeversion == "") { }
                //    else
                //    {
                //        dtData2 = SFObject.LoadDataTable(string.Format("Select * from FPTI.CompanyRolesItemMapping where Roles = '{0}' and Item like '%{1}%' and Company = '{2}'and module = '{3}'", role, exeversion, a, exeversionModule), this.UserDefinedConnectionString);
                //        if (dtData2.Rows.Count <= 0) { }
                //        else
                //        {
                //            string code = SFObject.returnText(string.Format(" Select Code from FPTI_NW.noahweb_Application_Info where AppName =  '{0}' ", exeversionModule), this.UserDefinedConnectionString);
                //            dtData2.Rows.Clear();
                //            drDataToAdd2 = dtData2.NewRow();
                //            drDataToAdd2["Company"] = a;
                //            drDataToAdd2["Roles"] = b;
                //            drDataToAdd2["Module"] = code;
                //            drDataToAdd2["Item"] = exeversion;
                //            drDataToAdd2["CanAccess"] = dt.Rows[row][3].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanAdd"] = dt.Rows[row][4].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanEdit"] = dt.Rows[row][5].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanDelete"] = dt.Rows[row][6].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanSave"] = dt.Rows[row][7].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanPrint"] = dt.Rows[row][8].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanProcess"] = dt.Rows[row][9].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanImport"] = dt.Rows[row][10].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanExport"] = dt.Rows[row][11].ToString() == "true" ? 1 : 0;
                //            dtData2.Rows.Add(drDataToAdd2);
                //            dtData2.AcceptChanges();
                //           dal.Update(dtData2, role, item, a, exeversionModule);

                //        }
                //    }
                //}
                //else { 
                //    string role = b;
                //    module = dt.Rows[row][0].ToString();
                //    item = dt.Rows[row][1].ToString();
                //    string Code = SFObject.returnText(string.Format("Select code from FPTI_NW.noahweb_menuItems_Info where exeVersionModule like '%{0}%' or exeVersion = '{1}'", item, module), this.UserDefinedConnectionString);

                //    if (Code == "") { }
                //    else
                //    {
                //        dtData2 = SFObject.LoadDataTable(string.Format("Select a.* from FPTI_NW.NW_CompanyRolesItemMappingWeb a left join FPTI_NW.noahweb_menuItems_Info b on a.Item = b.code where a.Roles  = '{0}' and a.Company = '{1}' and b.exeVersionModule like '%{2}%' and b.exeVersion = '{3}'", b, a, item, module), this.UserDefinedConnectionString);
                //        if (dtData2.Rows.Count <= 0) { }
                //        else
                //        {
                //            string mod = dtData2.Rows[0][2].ToString();
                //            string tem = dtData2.Rows[0][3].ToString();
                //            dtData2.Rows.Clear();
                //            drDataToAdd2 = dtData2.NewRow();
                //            drDataToAdd2["Company"] = a;
                //            drDataToAdd2["Roles"] = b;
                //            drDataToAdd2["Module"] = mod;
                //            drDataToAdd2["Item"] = tem;
                //            drDataToAdd2["CanAccess"] = dt.Rows[row][3].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanAdd"] = dt.Rows[row][4].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanEdit"] = dt.Rows[row][5].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanDelete"] = dt.Rows[row][6].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanSave"] = dt.Rows[row][7].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanPrint"] = dt.Rows[row][8].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanProcess"] = dt.Rows[row][9].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanImport"] = dt.Rows[row][10].ToString() == "true" ? 1 : 0;
                //            drDataToAdd2["CanExport"] = dt.Rows[row][11].ToString() == "true" ? 1 : 0;
                //            dtData2.Rows.Add(drDataToAdd2);
                //            dtData2.AcceptChanges();
                //            dal.Update2(dtData2, role, tem, a, mod);
                //        }
                //    }
                //}
                #endregion


                if (dt.Rows[row][1].ToString().Trim() != "")
                {
                    DataRow drDataToAdd = dtData.NewRow();
                    drDataToAdd = dtData.NewRow();
                    drDataToAdd["Company"] = a;
                    drDataToAdd["Roles"] = b;
                    //if (version == "0")
                    //{
                        string code = SFObject.returnText(string.Format(" Select Code from FPTI_NW.noahweb_Application_Info where AppName =  '{0}' ", dt.Rows[row][0].ToString()), this.UserDefinedConnectionString);
                        drDataToAdd["Module"] = code;      
                    //}
                    //else
                    //{
                    //}
                   // drDataToAdd["Module"] = dt.Rows[row][0].ToString();

                    drDataToAdd["Item"] = dt.Rows[row][1].ToString();
                    drDataToAdd["CanAccess"] = Parser.ParseBool(dt.Rows[row][3].ToString());// == "true" ? 1 : 0;

                    drDataToAdd["CanAdd"] = Parser.ParseBool(dt.Rows[row][4].ToString());// == "true" ? 1 : 0;
                    drDataToAdd["CanEdit"] = Parser.ParseBool(dt.Rows[row][5].ToString());// == "true" ? 1 : 0;
                    drDataToAdd["CanDelete"] = Parser.ParseBool(dt.Rows[row][6].ToString());// == "true" ? 1 : 0;
                    drDataToAdd["CanSave"] = Parser.ParseBool(dt.Rows[row][7].ToString());// == "true" ? 1 : 0;
                    drDataToAdd["CanPrint"] = Parser.ParseBool(dt.Rows[row][8].ToString());// == "true" ? 1 : 0;
                    drDataToAdd["CanProcess"] = Parser.ParseBool(dt.Rows[row][9].ToString());// == "true" ? 1 : 0;
                    drDataToAdd["CanImport"] = Parser.ParseBool(dt.Rows[row][10].ToString());// == "true" ? 1 : 0;
                    drDataToAdd["CanExport"] = Parser.ParseBool(dt.Rows[row][11].ToString());// == "true" ? 1 : 0;

                    dtData.Rows.Add(drDataToAdd);
                    dtData.AcceptChanges();
                    rowNo++;
                }
            }
           
            #region don't change
          //  drDataToAdd["recuser"] = drDataToAdd["moduser"] = based.SecurityAccess.RecUser;
          //  drDataToAdd["recdate"] = drDataToAdd["moddate"] = DateTime.Now; //will be populated as getdate() in sproc
            
           
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
            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGrid2"));
            for (int row = 0; row < dt.Rows.Count; row++)
            {
                if (dt.Rows[row][1].ToString().Trim() != "")
                {
                    drDataToAdd = dtData.NewRow();
             


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
                    drDataToAdd["Company"] = WebApp.nwobjectText("inCode");
                    drDataToAdd["Module"] = dt.Rows[row][1].ToString();
                   
                    drDataToAdd["recuser"] = drDataToAdd["moduser"] = based.SecurityAccess.RecUser;
                    drDataToAdd["recdate"] = drDataToAdd["moddate"] = DateTime.Now; 

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
                     //nwToolBox.bindingNavigatorExportItem.Enable = true;
            nwToolBox.bindingNavigatorImportItem.Visible = false;
            nwToolBox.bindingNavigatorProcessItem.Visible = false;

        }


        public void CreateGrid1(string b, string c)
        {
            CreateGrid1( b,  c,true);
        }
        public void CreateGrid1(string b, string c,bool isInitialize)
        {

            #region GRID
            string gridID = "nwgrid";
            nwGrid nwGridMain = new nwGrid(gridID);
            DataTable dt_soh = new DataTable();
            

            if (isInitialize == false)
                dt_soh = dal.GetDataWithFilter(
                            WebApp.nwobjectText("lugCode"),
                            WebApp.nwobjectText("lugCode2"),
                            WebApp.nwobjectText("combobox1"),
                            WebApp.nwobjectText("inSearch")
                        );

            
            nwGridMain.CreateExcelGrid(15, 12);
            nwGridMain.minRow(0);
            nwGridMain.TableHeight(380);


            if (dt_soh.Rows.Count > 0)
                nwGridMain.dataSource(dt_soh);

            #region Grid Title
            //Column Name
            nwGridMain.nwobject(0).ColumnName("Module");
            nwGridMain.nwobject(1).ColumnName("Item");
            nwGridMain.nwobject(2).ColumnName("Description");
            nwGridMain.nwobject(3).ColumnName("Can Access");
            nwGridMain.nwobject(4).ColumnName("Can Add");
            nwGridMain.nwobject(5).ColumnName("Can Edit");
            nwGridMain.nwobject(6).ColumnName("Can Delete");
            nwGridMain.nwobject(7).ColumnName("Can Save");
            nwGridMain.nwobject(8).ColumnName("Can Print");
            nwGridMain.nwobject(9).ColumnName("Can Process");
            nwGridMain.nwobject(10).ColumnName("Can Import");
            nwGridMain.nwobject(11).ColumnName("Can Export");

            //nwGridMain.nwobject(SPRVALIDITYFROM - 1).ColumnName("Validity Date From");
            //nwGridMain.nwobject(SPRVALIDITYTO - 1).ColumnName("Validity Date To");
            #endregion

            nwGridMain.buttonSearchFind = true;
            //nwGridMain.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + "-1", based.SecurityAccess.RecUser);
            //nwGridMain.buttonSaveColumn = true;
            //nwGridMain.buttonResetColumn = true;

            #region Column Width
            nwGridMain.nwobject(0).Width(150);
            nwGridMain.nwobject(1).Width(150);
            nwGridMain.nwobject(2).Width(350);
            nwGridMain.nwobject(3).Width(60);
            nwGridMain.nwobject(4).Width(60);
            nwGridMain.nwobject(5).Width(60);
            nwGridMain.nwobject(6).Width(60);
            nwGridMain.nwobject(7).Width(60);
            nwGridMain.nwobject(8).Width(60);
            nwGridMain.nwobject(9).Width(70);
            nwGridMain.nwobject(10).Width(70);
            nwGridMain.nwobject(11).Width(70);
            //nwGridMain.nwobject(12).Width(80);
            #endregion

            nwGridMain.nwobject(3).CheckBox(true, "chkBox");
            nwGridMain.nwobject(4).CheckBox(true, "chkBox");
            nwGridMain.nwobject(5).CheckBox(true, "chkBox");
            nwGridMain.nwobject(6).CheckBox(true, "chkBox");
            nwGridMain.nwobject(7).CheckBox(true, "chkBox");
            nwGridMain.nwobject(8).CheckBox(true, "chkBox");
            nwGridMain.nwobject(9).CheckBox(true, "chkBox");
            nwGridMain.nwobject(10).CheckBox(true, "chkBox");
            nwGridMain.nwobject(11).CheckBox(true, "chkBox");

            nwGridMain.PagerPerPage(50);
            nwGridMain.PagerDataEditable(true);

            //##ADDED
            nwGridMain.HeaderBorderColor("#DEDEDE");
            nwGridMain.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridMain.TableBorderColor("#BBB");
            nwGridMain.BodyBorderColor("#BBB");
            nwGridMain.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridMain.HeaderTextColor("#131313");
            nwGridMain.HoverColor("#DEDEDE", "inherit");
            nwGridMain.SelectedRowHover("#DEDEDE");
            nwGridMain.SelectedRowHoverColor("inherit");
            //js.makeCSS("#nwGrid2", "border", "1px solid #BBB1B1");

            js.makeHTML("#nwGrid2", nwGridMain.createTable());

            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("$('.nwCheckBoxTot.chkBox').after('<br>');");
            #endregion
        }




        public void ExportGrid()
        {

            nwGrid soh = new nwGrid("nwExportContainer");
            DataTable dt_soh = new DataTable();

            dt_soh = dal.GetDataExport();
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
               //dt_soh.Columns[2].AllowDBNull = true;
            }

            soh.dataSource(dt_soh);
           // soh.minRow(1);
          //  soh.RowHeight(20);
            soh.TableHeight(900);
            soh.HeaderTextColor("black");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");
 
            js.makeHTML("#nwExportContainer", soh.createTable());
            string strF = "";
            strF = string.Format(@"<div class='nwCuz-013'></div><div>Company:{0}</div><div>System User:{1}</div><div>System Date:{2}</div>"
                    , based.SecurityAccess.Company,
                    based.SecurityAccess.RecUser
                    , DateTime.Now.ToString()); 
            js.makePrepend("#nwExportContainer", strF);
        }


    




        public void customgrid()
        {
            string strF = "";
            DataTable dt = new DataTable();
            DataTable dt2 = new DataTable();
            nwGrid soh = new nwGrid("grid1");
            DataRow drDataToAdd;

            string version = WebApp.nwobjectText("version");
            string webcode = "";
            string Code = "";
            if (version == "0")
            {
                dt2 = SFObject.LoadDataTable(string.Format("Select '' as sss,Code+'' as WebVersion, Description+'' as DesktopVersion from fpti.Item where 1 != 1"), this.UserDefinedConnectionString);
                string item = WebApp.nwobjectText("item2");
                dt = SFObject.LoadDataTable(string.Format("Select a.code+'' as WebCode,a.description+''as WebDescription,b.Code,b.Description,a.exeVersion,b.Module   from FPTI_NW.noahweb_menuItems_Info a left join fpti.Item  b on a.exeVersionModule = b.Code where a.code = '{0}'", item), this.UserDefinedConnectionString);
            }
            else
            {
                dt2 = SFObject.LoadDataTable(string.Format("Select '' as sss,Code+'' as WebVersion, Description+'' as DesktopVersion from fpti.Item where 1 != 1"), this.UserDefinedConnectionString);
                string item = WebApp.nwobjectText("item2");
                string module = WebApp.nwobjectText("modle");
                dt = SFObject.LoadDataTable(string.Format("Select a.code+'' as WebCode,a.description+''as WebDescription,b.Code,b.Description,a.exeVersion,b.Module from FPTI_NW.noahweb_menuItems_Info a left join fpti.Item  b on a.exeVersionModule = b.Code where b.code = '{0}' and b.Module ='{1}'", item, module), this.UserDefinedConnectionString);
            }


            foreach (DataRow row in dt.Rows)
            {
                if (version == "0")
                {
                    webcode = row["Code"].ToString();
                    js.makeValueText("#code", webcode.ToString());
                    webcode = row["Description"].ToString();
                    js.makeValueText("#desc", webcode.ToString());
                    webcode = row["module"].ToString();
                    js.makeValueText("#module", webcode.ToString());
                }
                else
                {
                    webcode = row["Webcode"].ToString();
                    js.makeValueText("#code", webcode.ToString());
                    webcode = row["WebDescription"].ToString();
                    js.makeValueText("#desc", webcode.ToString());
                    webcode = row["module"].ToString();
                    js.makeValueText("#module", webcode.ToString());
                }
            }


        }


        public void LoadFooter() {

            DataTable dt = dal.LoadHDR(WebApp.nwobjectText("lugCode"), WebApp.nwobjectText("lugCode2"));

            if (dt.Rows.Count > 0)
            {
                js.ADD("$('#nwtxt_RecUser').text('" + dt.Rows[0]["Recuser"].ToString() + "')");
                js.ADD("$('#nwtxt_RecDate').text('" + dt.Rows[0]["Recdate"].ToString() + "')");
                js.ADD("$('#nwtxt_ModUser').text('" + dt.Rows[0]["Moduser"].ToString() + "')");
                js.ADD("$('#nwtxt_ModDate').text('" + dt.Rows[0]["Moddate"].ToString() + "')");

            }

        }



    }
}
