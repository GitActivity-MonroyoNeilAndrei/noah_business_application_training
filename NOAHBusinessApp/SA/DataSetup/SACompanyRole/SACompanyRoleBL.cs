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
    public class SACompanyRoleBL : nwAction
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
           
            dal = new SACompanyRoleDAL(this.UserDefinedConnectionString, ""); 
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
        SACompanyRoleDAL dal;
        public SACompanyRoleBL()
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
            string strOrder = " Moddate DESC,Recdate DESC";
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
                      strSQL = string.Format(@"select code,description from fpti.Company where code like '%{0}%' or Description like '%{0}%'", strSearchVal);
                      strMethod = strMethod.Substring(3);

                    ////   mouseDownFunc = "func_ActionDriven(\\'actBranchChange\\', true);";
                    ////mouseDownFunc = "refresh();func_ToolboxADD();func_Check_Lookup(1);func_Clear_Dealer();clearMainTable();func_ActionDriven(\\'actDealerInfo\\', true);";
                    //mouseDownFunc = "refresh();func_ToolboxADD();func_Check_Lookup(1);clearMainTable();func_ActionDriven(\\'actDealerInfo\\', true);";
                   strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   //strFinal += strSQL + " " + strConn;
                   break;

                case "getlugCode2":
                   strSQL = string.Format(@"select Code,description from  FPTI.Roles where code like '%{0}%' or Description like '%{0}%'", strSearchVal);
                   strMethod = strMethod.Substring(3);
                  
                   ////   mouseDownFunc = "func_ActionDriven(\\'actBranchChange\\', true);";
                   ////mouseDownFunc = "refresh();func_ToolboxADD();func_Check_Lookup(1);func_Clear_Dealer();clearMainTable();func_ActionDriven(\\'actDealerInfo\\', true);";
                   //mouseDownFunc = "refresh();func_ToolboxADD();func_Check_Lookup(1);clearMainTable();func_ActionDriven(\\'actDealerInfo\\', true);";
                   strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   //strFinal += strSQL + " " + strConn;
                   break;



               case "getlug_grid1":
                   string aa;

                   aa = WebApp.nwobjectText("lugCode");
                   strSQL = string.Format(@"select DISTINCT a.SysUser,b.Description from fpti.CompanyUserMapping a
                                               left join fpti.[User] b
                                                on a.SysUser = b.Code where a.Company like '%{0}%'", aa);
                   strMethod = strMethod.Substring(3);
                   strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   break;

               case "getlug_grid2":
                   strSQL = string.Format(@"select  a.[Module],b.[Description] from [fpti].[CompanyModuleMapping] a
                                left join [fpti].[Module] b
                                on a.[Module] = b.[Code] where [code] like '%{0}%' or [Description] like '%{0}%' ", strSearchVal);
                   strMethod = strMethod.Substring(3);
                   strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   break;

//               case "getaddmodule":
//                   strSQL = string.Format(@"select Code,Description  from  [fpti].[Module]       ", strSearchVal);
//                   strMethod = strMethod.Substring(3);
//                   strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
//                   break;

//               case "getadduser":
//                   strSQL = string.Format(@"select DISTINCT a.SysUser,b.Description from fpti.CompanyUserMapping a
//                                                left join fpti.[User] b
//                                                on a.SysUser = b.Code where [code] like '%{0}%' or [Description] like '%{0}%'  ", strSearchVal);
//                   strMethod = strMethod.Substring(3);
//                   strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
//                   break;

               //case "getcopymodule":
               //    strSQL = string.Format(@"select code,description from fpti.Company  where [code] like '%{0}%' or [Description] like '%{0}%'", strSearchVal);
               //    strMethod = strMethod.Substring(3);
               //    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
               //    Inquire();
               //    break;


               //case "getcopyuser":
               //    strSQL = string.Format(@"select code,description from fpti.Company  where [code] like '%{0}%' or [Description] like '%{0}%'", strSearchVal);
               //    strMethod = strMethod.Substring(3);
               //    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
               //    Inquire();
               //    break;

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
                    nwToolBox.bindingNavigatorPrintItem.Enable =
                    nwToolBox.bindingNavigatorInquireItem.Enable =
                    nwToolBox.bindingNavigatorImportItem.Visible =
                    nwToolBox.bindingNavigatorDeleteItem.Enable =
                    nwToolBox.bindingNavigatorDeleteItem.Visible =
                    nwToolBox.bindingNavigatorExportItem.Enable = false;
                     js.ADD("func_Toolbox_Clear();");
                     
                        //CreateGrid1();
                       CreateGrid2();
                   //  CreateGrid3(WebApp.nwobjectText("lugCode2"));
                        isNewRow = true;
                   
                    break;
                case eRecordOperation.Save:
                    RecordOperationResult = string.Empty;

                    if (AreValidEntries() == true)
                    {
                          //  DataTable dtData = new DataTable();
                            DataTable dtData = new DataTable();
                            dtData = LoadSchema();
                         //   dtDataLin = LoadSchemaLin();
                          //  dtDataLin2 = LoadSchemaLin2();
                            RecordOperationResult = dal.SaveData(dtData, isNewRow);
                        //  RecordOperationResult = dal.SaveData(dtData, dtDataLin, dtDataLin2, isNewRow);
                        //   RecordOperationResult = dal.SaveData(dtData, dtData, dtDataLin2, isNewRow);

                        if (RecordOperationResult.IndexOf("successfully") >= 0)
                            RecordOperationResult = "Saved successfully";

                        Prompt.Information(RecordOperationResult, based.Title);
                            if (RecordOperationResult.ToLower().IndexOf("successfully") != -1)
                            {
                                RefreshData();
                                js.ADD("cust_GetPara(); $(\"#inCode\").attr(\"disabled\", true);");
                                isNewRow = true;
                                
                            }
                            //CreateGrid3(WebApp.nwobjectText("lugCode2"), WebApp.nwobjectText("lugCode"));
                            
                    }
                    else
                    {
                        RecordOperationResult = "error";
                    }
                    //Prompt.Information("<div style=\"color:red !important;font-weight:bold !important;\">" + RecordOperationResult + "</div>", "Prompt Message");
                    //result += "$('#btnSaved').prop('disabled', true);";
                    //result += "$('#btnSubmit').prop('disabled', false);";
                   
                    break;
                case eRecordOperation.Delete:

                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("inCode"), based.SecurityAccess.RecUser );
                 //   RecordOperation = dal.cannotdelete();
                   // string sa = string.Empty;
                  //  string ss = dal.cannotdelete(sa);
                  //  if (ss == "") {
                    string aa = deletedata(RecordOperationResult);

                    if (RecordOperationResult.IndexOf("successfully") >= 0)
                        RecordOperationResult = "Deleted successfully.";

                    Prompt.Information(RecordOperationResult, based.Title);
                 ///   } else {
                  //      Prompt.Information(ss, based.Title);
                //    }
                  
                    //RecordOperationResult = dal.DeleteData(id, itemcode, connectionString);
                    RefreshData();
                    js.ADD("Clear_Data()");
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
                     //ExportGrid();
                     //js.ADD("tableToExcel(\"nwExportContainer\", \"\", \"Report\");");
                     ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, 6, dal.GetDataExport(),
                                                           "Roles Listing", based.SecurityAccess.ConnectionString, SFObject.returnText(string.Format(@"SELECT Description FROM fpti.Company where code = '{0}'", based.SecurityAccess.Company), UserDefinedConnectionString),
                                                           based.SecurityAccess.RecUserName, "Roles Listing");

                     //## FOR EXPORTING ###
                     Random rnd = new Random();
                     string SessionID = DateTime.Now.ToString("yyyyddMMhhmmss") + rnd.Next(0, 9999).ToString().PadRight(4, '0');
                     HttpContext.Current.Session["Config_" + SessionID] = frmlist.m_Spread.ExportConfig();
                     HttpContext.Current.Session["Data_" + SessionID] = frmlist.m_Spread.GetDataSource();
                     HttpContext.Current.Session["Filename_" + SessionID] = "Roles Listing";
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
        public string deletedata(string aa) {

            string amp;
            
                amp = "Cannot Delete";
       
            
            
        return amp;
        }
        public string get_Initialize()
        {

            if (based.isInterface == true) dal.UpdateVersion();

            string strFinal = "";
            
            SetBindings();
         //   CreateGrid1();
            CreateGrid2();

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

                    if (dal.isUsedRole(WebApp.nwobjectText("inCode")))
                    {
                        nwToolBox.bindingNavigatorDeleteItem.Enable = false;
                        nwToolBox.bindingNavigatorSaveItem.Enable = false;
                        js.ADD("$('#inDesc').enable(false);");
                    }
                    else {
                        js.ADD("$('#inDesc').enable(true);");
                    }
                        

                    BindCollection();
                  //  CreateGrid1();
                    CreateGrid2();
                    break;
                case "actLoadGrid":
                 //   Prompt.Information(WebApp.nwobjectText("lugCode"),based.Title);

                    CreateGrid3(WebApp.nwobjectText("lugCode2"), WebApp.nwobjectText("lugCode"));
                   
                    //CreateGrid4(WebApp.nwobjectText("lugCode2"));
                    break;

                case "actLoadMainHistorical":
                    DataTable dtMainHistory = new DataTable();
                    dtMainHistory = SFObjects.LoadDataTable(dal.Historical(WebApp.nwobjectText("code")), this.UserDefinedConnectionString);
                    Historical(dtMainHistory);
                    js.ADD("nwLoading_End('actLoadMainHistorical')");
                    break;

            }
            return js.makeJSPostScript(execute());
        }

        private void Historical(DataTable dtrecords)
        {

            //string LISTINGFILENAME = "";
            //if (LISTINGFILENAME + " History Listing" == "") LISTINGFILENAME = "Sheet 1";
            //else LISTINGFILENAME = LISTINGFILENAME + " History Listing";

            //int maxrow = 6 + dtrecords.Rows.Count;



            //int dataindex = 5;

            //ListingAndPrint frmlist = new ListingAndPrint
            //                                       (ListingAndPrint.FormType.Listing, dataindex, dtrecords,
            //                                       LISTINGFILENAME, based.SecurityAccess.ConnectionString, based.SecurityAccess.Company,
            //                                       based.SecurityAccess.RecUserName, LISTINGFILENAME);


            string LISTINGFILENAME = "";
            if ("User Access" + " History Listing" == "") LISTINGFILENAME = "Sheet 1";
            else LISTINGFILENAME = "User Access" + " History Listing";

            int listingStartRow = 5;

            int maxrow = listingStartRow + dtrecords.Rows.Count;


            int dataindex = listingStartRow;

            ListingAndPrint frmlist = new ListingAndPrint
                                                   (ListingAndPrint.FormType.Listing, listingStartRow, dtrecords,
                                                   LISTINGFILENAME, UserDefinedConnectionString, based.SecurityAccess.Company,
                                                   based.SecurityAccess.RecUserName, LISTINGFILENAME);


            //loop valdiation
            string tempstring1 = "";
            string tempstring2 = "";
            string toChange = "";

            //for (int i = 0; i < dtrecords.Rows.Count; i++)
            //{
            //    frmlist.m_Spread.Rows(i + dataindex).TextColor("black");
            //}

           //for (int ic = 0; ic < dtrecords.Columns.Count; ic++)
              // frmlist.m_Spread.Rows(dataindex, ic).TextColor("black");

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
                                    frmlist.m_Spread.Rows(i + dataindex, ic).TextColor("blue");
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
                    sql = string.Format(@"select Code,
                                               Description,
                                               RecUser,
                                               RecDate,
                                               ModUser,
                                               ModDate from FPTI.Roles ORDER BY ISNULL(ModDate, RecDate) DESC");
                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "Code";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", sql, based.SecurityAccess.ConnectionString);
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


         //   SFObject.SetControlBinding("#lugCode .idval", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Company");
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
            //DisableDescription(isUsed());
           
        }

        private bool AreValidEntries()
        {
            string errorResult = String.Empty;

            if (SFObject.returnText(string.Format(@"SELECT 1 FROM [FPTI].[Roles] where code = '{0}'", WebApp.nwobjectText("inCode")), based.SecurityAccess.ConnectionString) == "1" && isNewRow == true)
                errorResult += "Cannot be saved. Duplicate records are not allowed.\n";

            if (WebApp.nwobjectText("inCode").Equals(string.Empty))
                errorResult += "Cannot be saved. Code is required.\n";
            else
            {
                if (WebApp.nwobjectText("inCode").Contains(" "))
                    errorResult += "Cannot be saved. Code should not contain spaces.\n";
            }
            if (WebApp.nwobjectText("inDesc").Trim().Equals(string.Empty))
                errorResult += "Cannot be saved. Description is required.\n";

            if (WebApp.nwobjectText("lugCode").Trim().Equals(string.Empty))
                errorResult += "Cannot be saved. Please provide a valid Database.\n";
            
            if (!errorResult.Equals(string.Empty))
                    Prompt.Error(errorResult, based.Title);

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
           // drDataToAdd["Company"] = WebApp.nwobjectText("idvallugCode");
          //  drDataToAdd["SqlQuery"] = WebApp.nwobjectText("inSql");
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
            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGrid2"));
            for (int row = 0; row < dt.Rows.Count; row++)
            {
                if (dt.Rows[row][1].ToString().Trim() != "")
                {
                    drDataToAdd = dtData.NewRow();
                  //  drDataToAdd["Company"] = WebApp.nwobjectText("lugCode")
                 //       drDataToAdd["Company"] = WebApp.nwobjectText("lugCode")
                    //drDataToAdd["Company"] = WebApp.nwobjectText("lugCode");
                 //   drDataToAdd["Roles"] = WebApp.nwobjectText("lugCode2");

                  //  drDataToAdd["UserCode"] = dt.Rows[row][1].ToString();

                //    drDataToAdd["recuser"] = drDataToAdd["moduser"] = based.SecurityAccess.RecUser;
                  //  drDataToAdd["recdate"] = drDataToAdd["moddate"] = DateTime.Now; 


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
                     nwToolBox.bindingNavigatorExportItem.Enable = true;
            nwToolBox.bindingNavigatorImportItem.Visible = false;
            nwToolBox.bindingNavigatorProcessItem.Visible = false;

        }

        //public void CreateGrid1()
        //{
        //    string strF = "";
        //    int row = 0;

        //    nwGrid soh = new nwGrid("grid1");
        //    DataTable dt_soh = new DataTable();

        //    dt_soh = dal.GetDataUser(WebApp.nwobjectText("inCode"),WebApp.nwobjectText("inCode"));

        //    if (dt_soh.Columns.Count < 1)
        //    {
        //        dt_soh.Columns.Add("Column1", typeof(string));
        //        dt_soh.Columns.Add("Column2", typeof(string));
        //        dt_soh.Columns.Add("Column3", typeof(string));
        //        dt_soh.Columns.Add("Column4", typeof(string));

        //    }
        //    else
        //    {
                
        //        dt_soh.Columns[0].ColumnName = " ";
        //        dt_soh.Columns[1].ColumnName = "User";
        //        dt_soh.Columns[1].AllowDBNull = true;
        //        //dt_soh.Columns[1].ColumnName = "MRP - " + String.Format("{0:MMMM}", System.DateTime.Today).ToString();
        //        //dt_soh.Columns[2].ColumnName = "MRP - " + String.Format("{0:MMMM}", System.DateTime.Today.AddMonths(1)).ToString();
 
        //    }

        //    soh.dataSource(dt_soh);
        //    //soh.AddNew(true);
        //    soh.minRow(5);
        //    soh.RowHeight(5);
        //    soh.TableHeight(500);
        //    soh.HeaderTextColor("#FFFFFF");
        //    soh.backgroundColor("#FFFFFF");
        //    soh.HeaderBackgroundGradientColor("green", "darkgreen");
        //    soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

        //    soh.nwobject(0).Width(30);
        //    soh.nwobject(1).Width(321);
        //    soh.nwobject(2).Width(900);

        //    soh.nwobject(0).Template("{0}");
        //    soh.nwobject(1).Template("{1}");
        //    soh.nwobject(2).Template("{2}");

        //    soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");
        //    //soh.nwobject(0).Template("<input type=\"checkbox\" />");

        //     js.makeHTML("#nwGrid1", soh.createTable().Replace("'","\\'"));

        //}

        public void CreateGrid2()
        {
      
            //return base.ExecGetData(cmd, _ConnectionString, true);
            nwGrid soh = new nwGrid("grid2");
            DataTable dt_soh = new DataTable();

            dt_soh = dal.GetDataModule(WebApp.nwobjectText("inCode"));

            if (dt_soh.Columns.Count < 1)
            {
                dt_soh.Columns.Add("Column1", typeof(string));
                dt_soh.Columns.Add("Column2", typeof(string));
                dt_soh.Columns.Add("Column3", typeof(string));


            }
            else
            {
                
               dt_soh.Columns[0].ColumnName = " ";
               dt_soh.Columns[1].ColumnName = "Code";
               dt_soh.Columns[2].ColumnName = "Name";
               dt_soh.Columns[1].AllowDBNull = true;
              // dt_soh.Columns[2].AllowDBNull = true;
               //dt_soh.Columns[1].AllowDBNull = true;
            }
            soh.dataSource(dt_soh);
            //soh.AddNew(true);
            soh.minRow(10);
            soh.RowHeight(15);
            soh.TableHeight(470);
            soh.HeaderTextColor("#FFFFFF");
            soh.backgroundColor("#FFFFFF");
            soh.rowBackground("#FFFFFF", "#DFDFDF");
            soh.HeaderBackgroundGradientColor("green", "darkgreen");
            soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            soh.nwobject(0).Width(30);
            soh.nwobject(1).Width(221);
            soh.nwobject(2).Width(400);

            soh.nwobject(0).Template("{0}");
            soh.nwobject(1).Template("{1}");
            soh.nwobject(2).Template("{2}");

            soh.PagerPerPage(100);
            soh.PagerDataEditable(true);

            soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");
            soh.nwobject(1).Template("<button class=\"lug_grid1\">{1}</button>");
            js.makeHTML("#nwGrid2", soh.createTable());

           //  js.makeHTML("#Div1", soh.createTable().Replace("'", "\\'"));
            //js.ADD("alert(\"aa\")");
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
                dt_soh.Columns[0].ColumnName = "Role Code";
                dt_soh.Columns[1].ColumnName = "Role Description";
            }

            soh.dataSource(dt_soh);
            soh.minRow(dt_soh.Rows.Count);
            soh.RowHeight(20);
            soh.TableHeight(900);
            soh.HeaderTextColor("black");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            js.makeHTML("#nwExportContainer", soh.createTable().Replace("'", "\\'"));
            string strF = "";
            strF = string.Format(@"<div class='nwCuz-005'></div><div>Company:{0}</div><div>System User:{1}</div><div>System Date:{2}</div>"
                    , based.SecurityAccess.Company,
                    dal.GetFullName(based.SecurityAccess.RecUser)
                    , DateTime.Now.ToString());

            js.makePrepend("#nwExportContainer", strF);


        }

  

        public void CreateGrid3(string xcode, string qq)
        {
            
            //return base.ExecGetData(cmd, _ConnectionString, true);

            nwGrid soh = new nwGrid("grid2");
            DataTable dt_soh = new DataTable();

            dt_soh = dal.GetDataUser(xcode,qq);

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
                dt_soh.Columns[2].ColumnName = "Name";
                dt_soh.Columns[1].ColumnName = "Code";
                dt_soh.Columns[0].AllowDBNull = true;
                dt_soh.Columns[1].AllowDBNull = true;
                dt_soh.Columns[2].AllowDBNull = true;
               // dt_soh.Columns[3].AllowDBNull = true;
            }
            soh.dataSource(dt_soh);
            //soh.AddNew(true);
            soh.minRow(10);
            soh.RowHeight(15);
            soh.TableHeight(500);
            soh.HeaderTextColor("#FFFFFF");
            soh.backgroundColor("#FFFFFF");
            soh.rowBackground("#FFFFFF", "#DFDFDF");
            soh.HeaderBackgroundGradientColor("green", "darkgreen");
            soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            soh.nwobject(0).Width(30);
            soh.nwobject(1).Width(221);
            soh.nwobject(2).Width(500);


            soh.nwobject(0).Template("{0}");
            soh.nwobject(1).Template("{1}");
            soh.nwobject(2).Template("{2}");

            soh.PagerPerPage(100);
            soh.PagerDataEditable(true);

            soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");
            soh.nwobject(1).Template("<button class=\"lug_grid1\">{1}</button>");
            js.makeHTML("#nwGrid2", soh.createTable());
            
        }

   
          public void CreateGrid4(string xxcode)
          {

              nwGrid soh = new nwGrid("grid1");
              DataTable dt_soh = new DataTable();

           //   dt_soh = dal.GetDataUser(xxcode,);

              if (dt_soh.Columns.Count < 1)
              {
                  dt_soh.Columns.Add("Column1", typeof(string));
                  dt_soh.Columns.Add("Column2", typeof(string));
                  dt_soh.Columns.Add("Column3", typeof(string));
                  dt_soh.Columns.Add("Column4", typeof(string));

              }
              else
              {

                 // dt_soh.Columns[0].ColumnName = " ";
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
              soh.HeaderTextColor("#FFFFFF");
              soh.backgroundColor("#FFFFFF");
              soh.rowBackground("#FFFFFF", "#DFDFDF");
              soh.HeaderBackgroundGradientColor("green", "darkgreen");
              soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

              soh.nwobject(0).Width(30);
              soh.nwobject(1).Width(321);
              soh.nwobject(2).Width(900);

              soh.nwobject(0).Template("{0}");
              soh.nwobject(1).Template("{1}");
              soh.nwobject(2).Template("{2}");

              soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");
              //soh.nwobject(0).Template("<input type=\"checkbox\" />");

              soh.PagerPerPage(100);
              soh.PagerDataEditable(true);

              js.makeHTML("#nwGrid1", soh.createTable().Replace("'", "\\'"));

          }


    }
}
