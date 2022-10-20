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
    public class SACompanyUserAlertBL : nwAction
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

            dal = new SACompanyUserAlertDAL(this.UserDefinedConnectionString, ""); 
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
        SACompanyUserAlertDAL dal;
        public SACompanyUserAlertBL()
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
                      strSQL = string.Format(@"Select '-' as Code, '-' as Description union select Code,Description from fpti.Company where Code like '%{0}%' or Description like '%{0}%'", strSearchVal);
                       strMethod = strMethod.Substring(3);

                    ////   mouseDownFunc = "func_ActionDriven(\\'actBranchChange\\', true);";
                    ////mouseDownFunc = "refresh();func_ToolboxADD();func_Check_Lookup(1);func_Clear_Dealer();clearMainTable();func_ActionDriven(\\'actDealerInfo\\', true);";
                    //mouseDownFunc = "refresh();func_ToolboxADD();func_Check_Lookup(1);clearMainTable();func_ActionDriven(\\'actDealerInfo\\', true);";
                   strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                   //strFinal += strSQL + " " + strConn;
                   break;

                case "getlugCode2":
                   strSQL = string.Format(@"select distinct a.SysUser,b.Description  from  FPTI.CompanyUserMapping a
					  left join fpti.[User] b on a.SysUser = b.Code 
                      where Company = '{1}' or ( a.SysUser like '%{0}%' or b.Description like '%{0}%')", strSearchVal, WebApp.nwobjectText("lugCode"));

                   if (Generateuser(WebApp.nwobjectText("lugCode")) != "") { strSQL = Generateuser(WebApp.nwobjectText("lugCode")); }

                   strMethod = strMethod.Substring(3);
                   CreateGrid2("","","","","");
                  
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
                   strSQL = string.Format(@"Select distinct a.SysUser Code,b.Description  from FPTI.CompanyUserAlertMapping a 
                                            left join fpti.[User] b on a.SysUser = b.code 
                                            where a.SysUser like '%{0}%' or b.[Description] like '%{0}%' ", strSearchVal);
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
                     nwToolBox.bindingNavigatorExportItem.Enable = true;
                     js.ADD("func_Toolbox_Clear();");
                     
                        //CreateGrid1();
                       CreateGrid2("","","","","");
                   //  CreateGrid3(WebApp.nwobjectText("lugCode2"));
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
                     ExportGrid();
                     js.ADD("tableToExcel(\"nwExportContainer\", \"\", \"Report\");");
                     
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

            dal.UpdateVersion();

            SetBindings();
            // CreateGrid1();
            //CreateGrid2("","","","","");
            GenerateGrid(true);
            //strFinal += CreateGrid1() + CreateGrid2();

            execute(ref strFinal);
            
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
                    CreateGrid2("","","","","");
                    break;
                case "actLoadGrid":
                    method = 1;
                    //CreateGrid2(WebApp.nwobjectText("lugCode"), WebApp.nwobjectText("lugCode2"), WebApp.nwobjectText("version"),"",""); 

                    GenerateGrid(false);

                    LoadFooter();

                    js.ADD("nwLoading_End('actLoadGrid');");

                    break;
                case "actFilter":
                    method = 2;
                    CreateGrid2(WebApp.nwobjectText("lugCode"), WebApp.nwobjectText("lugCode2"), WebApp.nwobjectText("version"), "","1"); 
                    break;
                case "actSave":
                    RecordOperationResult = string.Empty;
                    if (AreValidEntries() == true)
                    {
                        string version = WebApp.nwobjectText("version");
                        DataTable dtData = new DataTable();
                        dtData = LoadSchema(WebApp.nwobjectText("lugCode"), WebApp.nwobjectText("lugCode2"));
                       
                        RecordOperationResult = savedata(WebApp.nwobjectText("lugCode"), WebApp.nwobjectText("lugCode2"), dtData);
                      //  RecordOperationResult = dal.SaveDataWeb(dtData, isNewRow);
                        Prompt.Information("Saved successfully", based.Title);
                        //}
                    }

                    LoadFooter();

                    js.ADD("nwLoading_End('actSave');");

                    break;
                case "actcopyfrom":
                    CreateGrid1(WebApp.nwobjectText("CopyFrom"),WebApp.nwobjectText("lugCode"));
                    break;
                case "actcopyfromweb":
                    //CreateGrid2(WebApp.nwobjectText("lugCode"), WebApp.nwobjectText("lugCode2"), WebApp.nwobjectText("version"), WebApp.nwobjectText("CopyFrom"),""); 

                    GenerateGrid(false);
                    js.ADD("nwLoading_End('actcopyfromweb');");
                    break;
                case "actDetails":
                    customgrid();
                    break;

                case "actPagerClick":
                    CreateGrid5(WebApp.nwobjectText("lugCode"), WebApp.nwobjectText("lugCode2"), WebApp.nwobjectInt("based"), WebApp.nwobjectInt("finalrange"), WebApp.nwobjectText("inSearch"), WebApp.nwobjectText("combobox1"));  
                    break;
                case "actpromp":
                    Prompt.Information("Company and User Required", based.Title);
                    break;

                case "actCodeRequired":
                    Prompt.Information("Company and User Required", based.Title);
                    break;

                case "actInitializeGrid":

                    GenerateGrid(true);
                    js.ADD("nwLoading_End('actInitializeGrid');");
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
                    sql = string.Format(@"select * from FPTI.Roles");
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
            nwToolBox.bindingNavigatorSaveItem.Enable = !x && based.SecurityAccess.Save;
            
            // bindingNavigatorSaveItem.Enabled = !x && this.SecurityAccess.Save;
        }

        private DataTable LoadSchema(string a, string b)
        {
            #region don't change
            DataTable dtData = new DataTable();
            dtData = dal.GetSchema();

            #endregion

            DataRow drDataToAdd;

            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGrid2"));
            foreach (DataRow row in dt.Rows)
            {
                if (row[0].ToString() == "true")
                {
                    drDataToAdd = dtData.NewRow();
                    drDataToAdd["SysUser"] = b;
                    drDataToAdd["Company"] = a;
                    drDataToAdd["Alert"] = row[1].ToString();
                    #region don't change
                    dtData.Rows.Add(drDataToAdd);
                    dtData.AcceptChanges();

                    #endregion
                }
            }
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
                     nwToolBox.bindingNavigatorExportItem.Enable = true;
            nwToolBox.bindingNavigatorImportItem.Visible = false;
            nwToolBox.bindingNavigatorProcessItem.Visible = false;

        }

        public void CreateGrid1(string b, string c)
        {

            nwGrid soh = new nwGrid("grid2");
            DataTable dt_soh = new DataTable();
            string version = WebApp.nwobjectText("version");
            if (version == "1") { 
            dt_soh = dal.GetDataCopyFrom(b,c);
            }
            else {
             dt_soh = dal.GetDataCopyFromweb(b, c);
            }

            if (dt_soh.Columns.Count < 1)
            {
                dt_soh.Columns.Add("Column1", typeof(string));
                dt_soh.Columns.Add("Column2", typeof(string));
                dt_soh.Columns.Add("Column3", typeof(string));


            }
            else
            {

                //  dt_soh.Columns[0].ColumnName = " ";
                dt_soh.Columns[2].ColumnName = "Description";
                dt_soh.Columns[1].ColumnName = "Item";
                dt_soh.Columns[0].AllowDBNull = true;
                dt_soh.Columns[1].AllowDBNull = true;
                dt_soh.Columns[2].AllowDBNull = true;
                dt_soh.Columns[3].AllowDBNull = true;
            }
            soh.dataSource(dt_soh);
            //soh.AddNew(true);
           // soh.minRow(10);
            soh.PagerPerPage(50);
            soh.PagerDataEditable(true);
            soh.RowHeight(20);
            soh.TableHeight(500);
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

            if(version == "1"){
            soh.nwobject(0).Width(50);
            soh.nwobject(1).Width(261);
            soh.nwobject(2).Width(350);
            }
            else
            {
                soh.nwobject(1).Width(170);
                soh.nwobject(2).Width(300);
                soh.nwobject(0).Width(180);
            }
            soh.nwobject(3).Width(70);
            soh.nwobject(4).Width(60);
            soh.nwobject(5).Width(60);
            soh.nwobject(6).Width(70);
            soh.nwobject(7).Width(60);
            soh.nwobject(8).Width(60);
            soh.nwobject(9).Width(70);
            soh.nwobject(10).Width(70);
            soh.nwobject(11).Width(70);

            soh.nwobject(0).Template("{0}");
            soh.nwobject(1).Template("{1}");
            soh.nwobject(2).Template("{2}");

            soh.nwobject(3).Template("<input id=\"sample\" type=\"checkbox\"{3}>");
            soh.nwobject(4).Template("<input id=\"sample\" type=\"checkbox\"{4}>");
            soh.nwobject(5).Template("<input id=\"sample\" type=\"checkbox\"{5}>");
            soh.nwobject(6).Template("<input id=\"sample\" type=\"checkbox\"{6}>");
            soh.nwobject(7).Template("<input id=\"sample\" type=\"checkbox\"{7}>");
            soh.nwobject(8).Template("<input id=\"sample\" type=\"checkbox\"{8}>");
            soh.nwobject(9).Template("<input id=\"sample\" type=\"checkbox\"{9}>");
            soh.nwobject(10).Template("<input id=\"sample\" type=\"checkbox\"{10}>");
            soh.nwobject(11).Template("<input id=\"sample\" type=\"checkbox\"{11}>");
            //soh.nwobject(12).Template("<input id=\"sample\" type=\"CheckBox\"{5}>");
            //    soh.nwobject(0).Template("<CheckBox </Checkbox>");
            // soh.nwobject(1).Template("<button class=\"lug_grid1\">{1}</button>");
            js.makeHTML("#nwGrid2", soh.createTable().Replace("'", "\\'"));

            //  js.makeHTML("#Div1", soh.createTable().Replace("'", "\\'"));
            //js.ADD("alert(\"aa\")");

        }

        public void CreateGrid2(string company,string user,string version, string copyfrom,string filter )
        {

            nwGrid soh = new nwGrid("grid2");
            DataTable dt_soh = new DataTable();
            DataTable dt_soh1 = new DataTable();
            string alert = "";
            string alert2 = "";
            int xcount = 0;
            int xxcount = 0;
            if (filter == "") { 
            if (version == "") { dt_soh = dal.GetInitializeGrid();}
            else if (version == "0") {
                if(copyfrom == ""){
                    //dt_soh = dal.LoadAlert(company);
                dt_soh.Columns.RemoveAt(0);
                dt_soh.Columns.Add("Select", typeof(string)).SetOrdinal(0);
                dt_soh1 = dal.GetLoadGrid(company,user);
                foreach (DataRow row in dt_soh.Rows){
                    foreach (DataRow row2 in dt_soh1.Rows){
                         alert = row["item"].ToString();
                         alert2 = row2["alert"].ToString();
                        if(alert == alert2){
                            dt_soh.Rows[xxcount][0] = "checked";
                            continue;}else{continue;} }xxcount++; } }
                else{
                    dt_soh = dal.GetInitializeGrid();
                    dt_soh.Columns.RemoveAt(0);
                    dt_soh.Columns.Add("Select", typeof(string)).SetOrdinal(0);
                    dt_soh1 = dal.GetLoadGrid(company, copyfrom);
                    foreach (DataRow row in dt_soh.Rows)
                    {
                        foreach (DataRow row2 in dt_soh1.Rows)
                        {
                            alert = row["item"].ToString();
                            alert2 = row2["alert"].ToString();
                            if (alert == alert2)
                            {
                                dt_soh.Rows[xxcount][0] = "checked";
                                continue;} else{ continue;}} xxcount++; }}
                
            } else if (version == "1") { }

            }
            else {
                string combobox = WebApp.nwobjectText("combobox1");
                string insearch = WebApp.nwobjectText("inSearch");
                dal.GetFilteredLoadGrid(company, user, combobox, insearch);
                switch(combobox){
                    case "Select": {
                        if (insearch == "1")
                        {
                            string xquery = string.Format(@"Select '' as 'Select',Code+'' as Item,Description  From FPTI.CompanyAlert a
                            left join FPTI.CompanyUserAlertMapping b on a.Code = b.Alert where a.Company = '{0}' and b.SysUser = '{1}'", company, user);
                            dt_soh = LoadGrid(xquery);
                        }else{
                            string xquery = string.Format(@"Select '' as 'Select',Code+'' as Item,Description  From FPTI.CompanyAlert");
                            string xquery2 = string.Format(@"Select '' as 'Select',Code+'' as Item,Description  From FPTI.CompanyAlert where 1 != 1");
                            dt_soh = FilteredGrid0(xquery,xquery2, company, user);
                        }
                    break;
                    }
                    case "Item":
                        {
                         string xquery = string.Format(@"Select '' as 'Select',Code+'' as Item,Description  From FPTI.CompanyAlert a where code like '%{0}%' and company = '{1}'", insearch, company);
                         dt_soh = FilteredGrid(xquery, company, user);
                            
                    break;
                        }
                    case "Description":
                        {
                            string xquery = string.Format(@"Select '' as 'Select',Code+'' as Item,Description  From FPTI.CompanyAlert a where Description like '%{0}%' and company = '{1}'", insearch, company);
                            dt_soh = FilteredGrid(xquery, company, user);

                    break;
                        }
                }
            }
            if (dt_soh.Columns.Count < 1)
            {
                dt_soh.Columns.Add("Column1", typeof(string));
                dt_soh.Columns.Add("Column2", typeof(string));
                dt_soh.Columns.Add("Column3", typeof(string));

            }
            else
            {
               dt_soh.Columns[0].AllowDBNull = true;
               dt_soh.Columns[1].AllowDBNull = true;
               dt_soh.Columns[2].AllowDBNull = true;
               
            }
            soh.dataSource(dt_soh);
            //soh.AddNew(true);
            soh.minRow(0);

            soh.TableHeight(500);
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


            soh.nwobject(1).Width(300);
            soh.nwobject(2).Width(950);
            soh.nwobject(0).Width(100);
 

            soh.nwobject(1).Template("{1}");
            soh.nwobject(2).Template("{2}");

            //soh.nwobject(0).Template("<input id=\"sample\" type=\"checkbox\"{0}>");
            //js.makeHTML("#nwGrid2", soh.createTable().Replace("'", "\\'"));

            soh.nwobject(0).CheckBox(true, "sample");
            js.makeHTML("#nwGrid2", soh.createTable());
        }

        enum Main {

            SPR_SELECT = 1,
            SPR_CODE,
            SPR_DESCRIPTION

        }

        public void GenerateGrid(bool isInitialize)
        {
            string gridID = "nwGridCon";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();

            int rowCnt = 10;
            int colCnt = (int)Main.SPR_DESCRIPTION;

            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
            nwGridCon.TableHeight(200);

            nwGridCon.nwobject((int)Main.SPR_SELECT - 1).ColumnName("Select");
            nwGridCon.nwobject((int)Main.SPR_CODE - 1).ColumnName("Code");
            nwGridCon.nwobject((int)Main.SPR_DESCRIPTION - 1).ColumnName("Description");
           
            
            nwGridCon.nwobject((int)Main.SPR_CODE - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject((int)Main.SPR_DESCRIPTION - 1).BackgroundColor("gainsboro");

            nwGridCon.nwobject((int)Main.SPR_SELECT - 1).Width(80);
            nwGridCon.nwobject((int)Main.SPR_CODE - 1).Width(300);
            nwGridCon.nwobject((int)Main.SPR_DESCRIPTION - 1).Width(300);

            nwGridCon.nwobject((int)Main.SPR_SELECT - 1).CheckBox(true);

            if (!isInitialize)
            {
                string Company = WebApp.nwobjectText("Company");
                string Filter = WebApp.nwobjectText("Filter");
                string Type = WebApp.nwobjectText("Type");
                string User = WebApp.nwobjectText("User"); 

                dt = dal.LoadAlert(Company, Type, Filter, User);
                nwGridCon.CreateExcelGrid(dt.Rows.Count + 1, colCnt);
                nwGridCon.dataSource(dt);

            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");


            js.makeHTML("#nwGrid2", nwGridCon.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

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


            js.makeHTML("#nwExportContainer", soh.createTable().Replace("'", "\\'"));
            string strF = "";
            strF = string.Format(@"<div class='nwCuz-014'></div><div>Company:{0}</div><div>System User:{1}</div><div>System Date:{2}</div>"
                    , based.SecurityAccess.Company,
                    based.SecurityAccess.RecUser
                    , DateTime.Now.ToString()).Replace("'", "\\'");

            js.makePrepend("#nwExportContainer", strF);
        }

        public void CreateGrid3(string xcode, string qq, int filter, string text, string z)
        {

            string strF;
            string version = WebApp.nwobjectText("version");  
            if(version == "1"){
            nwGrid soh = new nwGrid("grid2");
            DataTable dt_soh = new DataTable();
            DataTable dt = new DataTable();
            if (filter == 1 ){
                strF = string.Empty;
                string tot = dal.GetAllData(xcode, qq);
                int totrecords = Int32.Parse(tot.ToString());
                if (totrecords <= 30) { }
                else
                {
                    int totpage = totrecords / 30;
                    if (totrecords % 30 > 0)
                    {
                        totpage++;
                    }
                    string pagerdiv = string.Empty;
                    string strTemp = "nwSelected";
                    for (int i = 1; i <= totpage; i++)
                    {
                        pagerdiv += "<button class=\"PagerNum " + strTemp + "\" onclick=\"func_LoadPager(" + i + ")\">" + i + "</button>";
                        strTemp = "";
                    }
                    strF += js.makeHTML("#nwPager", pagerdiv);
                }
                  dt_soh = dal.GetDataRoles(xcode, qq);}
              else{
                  strF = string.Empty;
                  string tot = dal.GetAllFilterData(xcode,qq,text,z);
                  int totrecords = Int32.Parse(tot.ToString());
                  if (totrecords <= 30) { }
                  else
                  {
                      int totpage = totrecords / 30;
                      if (totrecords % 30 > 0)
                      {
                          totpage++;
                      }
                      string pagerdiv = string.Empty;
                      string strTemp = "nwSelected";
                      for (int i = 1; i <= totpage; i++)
                      {
                          pagerdiv += "<button class=\"PagerNum " + strTemp + "\" onclick=\"func_LoadPager(" + i + ")\">" + i + "</button>";
                          strTemp = "";
                      }
                      strF += js.makeHTML("#nwPager", pagerdiv);
                  }

                  dt_soh = dal.GetDataFilter(xcode, qq, text,z);
                }
            string ver = "";
            string code = "";

            dt_soh.Columns.Add(new DataColumn("Version", typeof(string)));
            foreach (DataRow row2 in dt_soh.Rows)
            {
                string item = row2["Code"].ToString();
                string modul = row2["Module"].ToString();
                dt = SFObject.LoadDataTable(string.Format("Select a.code+'' as WebCode,a.description+''as WebDescription,b.Code,b.Description,a.exeVersion,b.Module from FPTI_NW.noahweb_menuItems_Info a left join fpti.Item  b on a.exeVersionModule = b.Code where b.code = '{0}' and b.Module ='{1}'", item, modul), this.UserDefinedConnectionString);
                foreach (DataRow dr2 in dt.Rows)
                {
                    code = dr2["Code"].ToString();
                }
                if (code == "")
                {

                }
                else
                {
                    ver = "Version";
                    row2["Version"] = ver;
                }
                code = "";
            }
                   
            if (dt_soh.Columns.Count < 1)
            {
                dt_soh.Columns.Add("Column1", typeof(string));
                dt_soh.Columns.Add("Column2", typeof(string));
                dt_soh.Columns.Add("Column3", typeof(string));
                dt_soh.Columns.Add("Column4", typeof(string));
            }
            else
            {
              
                dt_soh.Columns[2].ColumnName = "Description";
                dt_soh.Columns[1].ColumnName = "Item";
                dt_soh.Columns[0].AllowDBNull = true;
                dt_soh.Columns[1].AllowDBNull = true;
                dt_soh.Columns[2].AllowDBNull = true;
            }

            soh.dataSource(dt_soh);
            soh.minRow(0);

            soh.TableHeight(500);
            soh.HeaderTextColor("black");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            soh.nwobject(1).Width(221);
            soh.nwobject(2).Width(200);
            soh.nwobject(0).Width(50);
            soh.nwobject(1).Width(261);
            soh.nwobject(2).Width(350);
            soh.nwobject(3).Width(70);
            soh.nwobject(4).Width(60);
            soh.nwobject(5).Width(60);
            soh.nwobject(6).Width(70);
            soh.nwobject(7).Width(60);
            soh.nwobject(8).Width(60);
            soh.nwobject(9).Width(70);
            soh.nwobject(10).Width(70);
            soh.nwobject(11).Width(70);
            soh.nwobject(12).Width(0);

            soh.nwobject(0).Template("{0}");
            soh.nwobject(1).Template("<div class=\"{12}\">{1}</div>");
            soh.nwobject(2).Template("{2}");

            soh.nwobject(3).Template("<input id=\"sample\" type=\"checkbox\"{3}>");
            soh.nwobject(4).Template("<input id=\"sample\" type=\"checkbox\"{4}>");
            soh.nwobject(5).Template("<input id=\"sample\" type=\"checkbox\"{5}>");
            soh.nwobject(6).Template("<input id=\"sample\" type=\"checkbox\"{6}>");
            soh.nwobject(7).Template("<input id=\"sample\" type=\"checkbox\"{7}>");
            soh.nwobject(8).Template("<input id=\"sample\" type=\"checkbox\"{8}>");
            soh.nwobject(9).Template("<input id=\"sample\" type=\"checkbox\"{9}>");
            soh.nwobject(10).Template("<input id=\"sample\" type=\"checkbox\"{10}>");
            soh.nwobject(11).Template("<input id=\"sample\" type=\"checkbox\"{11}>"); 
           js.makeHTML("#nwGrid2", soh.createTable().Replace("'", "\\'"));

            }
            else {
                nwGrid soh = new nwGrid("grid2");
                DataTable dt_soh = new DataTable();
                DataTable dt = new DataTable();
                if (filter == 1)
                {
                    strF = string.Empty;
                    string tot = dal.GetAllDataweb(xcode, qq);
                    int totrecords = Int32.Parse(tot.ToString());
                    if (totrecords<=30) { } else { 
                    int totpage = totrecords / 30;
                    if (totrecords % 30 > 0)
                    {
                        totpage++;
                    }
                    string pagerdiv = string.Empty;
                    string strTemp = "nwSelected";
                    for (int i = 1; i <= totpage; i++)
                    {
                        pagerdiv += "<button class=\"PagerNum " + strTemp + "\" onclick=\"func_LoadPager(" + i + ")\">" + i + "</button>";
                        strTemp = "";
                    }
                    strF += js.makeHTML("#nwPager", pagerdiv);
                    }
                    dt_soh = dal.GetDataRolesWeb(xcode, qq);
                }
                else
                {
                    strF = string.Empty;
                    string tot = dal.GetAllFilterDataWeb(xcode, qq, text, z);
                    int totrecords = Int32.Parse(tot.ToString());
                    if (totrecords <= 30) { }
                    else
                    {
                        int totpage = totrecords / 30;
                        if (totrecords % 30 > 0)
                        {
                            totpage++;
                        }
                        string pagerdiv = string.Empty;
                        string strTemp = "nwSelected";
                        for (int i = 1; i <= totpage; i++)
                        {
                            pagerdiv += "<button class=\"PagerNum " + strTemp + "\" onclick=\"func_LoadPager(" + i + ")\">" + i + "</button>";
                            strTemp = "";
                        }
                        strF += js.makeHTML("#nwPager", pagerdiv);
                    }

                    dt_soh = dal.GetDataFilterWeb(xcode, qq, text, z);
                }

                string ver = "";
                string code = "";
                dt_soh.Columns.Add(new DataColumn("Version", typeof(string)));
                foreach (DataRow row2 in dt_soh.Rows)
                {
                    string item = row2["Code"].ToString();
                    dt = SFObject.LoadDataTable(string.Format("Select a.code+'' as WebCode,a.description+''as WebDescription,b.Code,b.Description,a.exeVersion,b.Module   from FPTI_NW.noahweb_menuItems_Info a left join fpti.Item  b on a.exeVersionModule = b.Code where a.code = '{0}'", item), this.UserDefinedConnectionString);

                    foreach (DataRow dr2 in dt.Rows)
                    {
                        code = dr2["Code"].ToString();
                    }
                    if (code == "")
                    {

                    }
                    else
                    {
                        ver = "Version";
                        row2["Version"] = ver;
                    }
                    code = "";

                }
                if (dt_soh.Columns.Count < 1)
                {
                    dt_soh.Columns.Add("Column1", typeof(string));
                    dt_soh.Columns.Add("Column2", typeof(string));
                    dt_soh.Columns.Add("Column3", typeof(string));
                    dt_soh.Columns.Add("Column4", typeof(string));
                }
                else
                {

                    dt_soh.Columns[2].ColumnName = "Description";
                    dt_soh.Columns[1].ColumnName = "Item";
                    dt_soh.Columns[0].AllowDBNull = true;
                    dt_soh.Columns[1].AllowDBNull = true;
                    dt_soh.Columns[2].AllowDBNull = true;
                }
                soh.dataSource(dt_soh);
                soh.minRow(0);

                soh.TableHeight(500);
                soh.HeaderTextColor("black");
                soh.backgroundColor("#FFFFFF");
                soh.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
                soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

                soh.nwobject(1).Width(170);
                soh.nwobject(2).Width(300);
                soh.nwobject(0).Width(180);
           
                soh.nwobject(3).Width(70);
                soh.nwobject(4).Width(60);
                soh.nwobject(5).Width(60);
                soh.nwobject(6).Width(70);
                soh.nwobject(7).Width(60);
                soh.nwobject(8).Width(60);
                soh.nwobject(9).Width(70);
                soh.nwobject(10).Width(70);
                soh.nwobject(11).Width(70);
                soh.nwobject(12).Width(0);


                soh.nwobject(0).Template("{0}");
                soh.nwobject(1).Template("<div class=\"{12}\">{1}</div>");
                soh.nwobject(2).Template("{2}");

                soh.nwobject(3).Template("<input id=\"sample\" type=\"checkbox\"{3}>");
                soh.nwobject(4).Template("<input id=\"sample\" type=\"checkbox\"{4}>");
                soh.nwobject(5).Template("<input id=\"sample\" type=\"checkbox\"{5}>");
                soh.nwobject(6).Template("<input id=\"sample\" type=\"checkbox\"{6}>");
                soh.nwobject(7).Template("<input id=\"sample\" type=\"checkbox\"{7}>");
                soh.nwobject(8).Template("<input id=\"sample\" type=\"checkbox\"{8}>");
                soh.nwobject(9).Template("<input id=\"sample\" type=\"checkbox\"{9}>");
                soh.nwobject(10).Template("<input id=\"sample\" type=\"checkbox\"{10}>");
                soh.nwobject(11).Template("<input id=\"sample\" type=\"checkbox\"{11}>");
                js.makeHTML("#nwGrid2", soh.createTable().Replace("'", "\\'"));
            }
        }

        public void CreateGrid5(string xcode, string qq, int based, int finalrange, string text, string filtertype)
        {
            string version = WebApp.nwobjectText("version");
            nwGrid soh = new nwGrid("grid2");
            DataTable dt_soh = new DataTable();
            DataTable dt = new DataTable();
            int db;
            if(version == "1"){
            if (text == "") {
                db = 12;
                dt_soh = dal.GetPage(xcode, qq, based, finalrange, text,db,filtertype); } 
            else {
                db = 13;
                dt_soh = dal.GetPage(xcode, qq, based, finalrange, text,db,filtertype); }
            string ver = "";
            string code = "";

            dt_soh.Columns.Add(new DataColumn("Version", typeof(string)));
            foreach (DataRow row2 in dt_soh.Rows)
            {
                string item = row2["Code"].ToString();
                string modul = row2["Module"].ToString();
                dt = SFObject.LoadDataTable(string.Format("Select a.code+'' as WebCode,a.description+''as WebDescription,b.Code,b.Description,a.exeVersion,b.Module from FPTI_NW.noahweb_menuItems_Info a left join fpti.Item  b on a.exeVersionModule = b.Code where b.code = '{0}' and b.Module ='{1}'", item, modul), this.UserDefinedConnectionString);
                foreach (DataRow dr2 in dt.Rows)
                {
                    code = dr2["Code"].ToString();
                }
                if (code == "")
                {

                }
                else
                {
                    ver = "Version";
                    row2["Version"] = ver;
                }
                code = "";
            }
                   
            }

            else
            {
            if (text == "") {
                db = 14;
                dt_soh = dal.GetPageWeb(xcode, qq, based, finalrange, text, db, filtertype);
            } 
            else {
                db = 15;
                dt_soh = dal.GetPageWeb(xcode, qq, based, finalrange, text, db, filtertype);
            }
            string ver = "";
            string code = "";
            dt_soh.Columns.Add(new DataColumn("Version", typeof(string)));
            foreach (DataRow row2 in dt_soh.Rows)
            {
                string item = row2["Code"].ToString();
                dt = SFObject.LoadDataTable(string.Format("Select a.code+'' as WebCode,a.description+''as WebDescription,b.Code,b.Description,a.exeVersion,b.Module   from FPTI_NW.noahweb_menuItems_Info a left join fpti.Item  b on a.exeVersionModule = b.Code where a.code = '{0}'", item), this.UserDefinedConnectionString);

                foreach (DataRow dr2 in dt.Rows)
                {
                    code = dr2["Code"].ToString();
                }
                if (code == "")
                {

                }
                else
                {
                    ver = "Version";
                    row2["Version"] = ver;
                }
                code = "";

            }
            }

            if (dt_soh.Columns.Count < 1)
            {
                dt_soh.Columns.Add("Column1", typeof(string));
                dt_soh.Columns.Add("Column2", typeof(string));
                dt_soh.Columns.Add("Column3", typeof(string));
                dt_soh.Columns.Add("Column4", typeof(string));
            }
            else
            {

                dt_soh.Columns[2].ColumnName = "Description";
                dt_soh.Columns[1].ColumnName = "Item";
                dt_soh.Columns[0].AllowDBNull = true;
                dt_soh.Columns[1].AllowDBNull = true;
                dt_soh.Columns[2].AllowDBNull = true;
                dt_soh.Columns[3].AllowDBNull = true;
                dt_soh.Columns[4].AllowDBNull = true;
                dt_soh.Columns[5].AllowDBNull = true;
                dt_soh.Columns[6].AllowDBNull = true;
                dt_soh.Columns[7].AllowDBNull = true;
                dt_soh.Columns[8].AllowDBNull = true;
                dt_soh.Columns[9].AllowDBNull = true;
                dt_soh.Columns[10].AllowDBNull = true;
                dt_soh.Columns[11].AllowDBNull = true;
            

            }
            soh.dataSource(dt_soh);
            soh.minRow(0);
            soh.TableHeight(500);
            soh.HeaderTextColor("black");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");
            if (version == "1")
            {
                soh.nwobject(0).Width(50);
                soh.nwobject(1).Width(261);
                soh.nwobject(2).Width(350);
            }
            else { 

            soh.nwobject(1).Width(170);
            soh.nwobject(2).Width(300);
            soh.nwobject(0).Width(180);
            }
            soh.nwobject(3).Width(70);
            soh.nwobject(4).Width(60);
            soh.nwobject(5).Width(60);
            soh.nwobject(6).Width(70);
            soh.nwobject(7).Width(60);
            soh.nwobject(8).Width(60);
            soh.nwobject(9).Width(70);
            soh.nwobject(10).Width(70);
            soh.nwobject(11).Width(70);
            soh.nwobject(12).Width(0);
            soh.nwobject(0).Template("{0}");
            soh.nwobject(1).Template("<div class=\"{12}\">{1}</div>");
            soh.nwobject(2).Template("{2}");
            soh.nwobject(3).Template("<input id=\"sample\" type=\"checkbox\"{3}>");
            soh.nwobject(4).Template("<input id=\"sample\" type=\"checkbox\"{4}>");
            soh.nwobject(5).Template("<input id=\"sample\" type=\"checkbox\"{5}>");
            soh.nwobject(6).Template("<input id=\"sample\" type=\"checkbox\"{6}>");
            soh.nwobject(7).Template("<input id=\"sample\" type=\"checkbox\"{7}>");
            soh.nwobject(8).Template("<input id=\"sample\" type=\"checkbox\"{8}>");
            soh.nwobject(9).Template("<input id=\"sample\" type=\"checkbox\"{9}>");
            soh.nwobject(10).Template("<input id=\"sample\" type=\"checkbox\"{10}>");
            soh.nwobject(11).Template("<input id=\"sample\" type=\"checkbox\"{11}>");
            js.makeHTML("#nwGrid2", soh.createTable().Replace("'", "\\'"));


        }






        public void CreateGrid4(string xxcode, string tcode, string combobox1, string text)
        {

            nwGrid soh = new nwGrid("grid2");
            DataTable dt_soh = new DataTable();
//
        //    dt_soh = dal.GetDataFilter(xxcode, tcode, combobox1, text);

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
                dt_soh.Columns[2].ColumnName = "Description";
                dt_soh.Columns[1].ColumnName = "Item";
                dt_soh.Columns[0].AllowDBNull = true;
                dt_soh.Columns[1].AllowDBNull = true;
                dt_soh.Columns[2].AllowDBNull = true;

                // dt_soh.Columns[3].AllowDBNull = true;
            }
            soh.dataSource(dt_soh);
            //soh.AddNew(true);
            soh.minRow(0);
         //   soh.RowHeight(15);
            soh.TableHeight(500);
            soh.HeaderTextColor("black");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");


            //soh.nwobject(0).Width(30);
            soh.nwobject(1).Width(221);
            soh.nwobject(2).Width(200);
            soh.nwobject(0).Width(50);
            soh.nwobject(1).Width(261);
            soh.nwobject(2).Width(350);
            soh.nwobject(3).Width(70);
            soh.nwobject(4).Width(60);
            soh.nwobject(5).Width(60);
            soh.nwobject(6).Width(70);
            soh.nwobject(7).Width(60);
            soh.nwobject(8).Width(60);
            soh.nwobject(9).Width(70);
            soh.nwobject(10).Width(70);
            soh.nwobject(11).Width(70);



            soh.nwobject(0).Template("{0}");
            soh.nwobject(1).Template("{1}");
            soh.nwobject(2).Template("{2}");

            soh.nwobject(3).Template("<input id=\"sample\" type=\"checkbox\"{3}>");
            soh.nwobject(4).Template("<input id=\"sample\" type=\"checkbox\"{4}>");
            soh.nwobject(5).Template("<input id=\"sample\" type=\"checkbox\"{5}>");
            soh.nwobject(6).Template("<input id=\"sample\" type=\"checkbox\"{6}>");
            soh.nwobject(7).Template("<input id=\"sample\" type=\"checkbox\"{7}>");
            soh.nwobject(8).Template("<input id=\"sample\" type=\"checkbox\"{8}>");
            soh.nwobject(9).Template("<input id=\"sample\" type=\"checkbox\"{9}>");
            soh.nwobject(10).Template("<input id=\"sample\" type=\"checkbox\"{10}>");
            soh.nwobject(11).Template("<input id=\"sample\" type=\"checkbox\"{11}>");
            //    soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");
            //  soh.nwobject(1).Template("<button class=\"lug_grid1\">{1}</button>");
            js.makeHTML("#nwGrid2", soh.createTable().Replace("'", "\\'"));
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

        private SqlConnection sqlConn = new SqlConnection();
        private SqlTransaction sqlTrn;

        public string savedata(string company,string user,DataTable dtemp) {
            //string message = "";
            //try
            //{
            //    SFObject.returnText(string.Format(@"DELETE FROM FPTI.CompanyUserAlertMapping WHERE Company='{0}' and SysUser='{1}'", company, user), this.UserDefinedConnectionString);
            //    foreach (DataRow row in dtemp.Rows)
            //    {
            //        SFObject.returnText(string.Format(@"INSERT INTO FPTI.CompanyUserAlertMapping 
            //                      ([Company], [SysUser], [Alert]) 
            //                      VALUES 
            //                      ('{0}', '{1}', '{2}')", company, user, row[2].ToString()), this.UserDefinedConnectionString);
            //    }
            //    message = "Successfully Saved.";
            //}
            //catch (Exception ex) {
            //    message = ex.ToString();
            //}
            //return message;


            try
            {

                string docno = string.Empty;

                sqlConn.ConnectionString = this.UserDefinedConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = "FPTI_NW.nsp_CompanyUserAlertMapping";
                cmd.Parameters.AddWithValue("@Company", company);
                cmd.Parameters.AddWithValue("@User", user);
                cmd.Parameters.AddWithValue("@Recuser", based.SecurityAccess.RecUser);
                cmd.Parameters.AddWithValue("@QueryType", 1);
                cmd.ExecuteNonQuery();


                int rowPay = 0;
                foreach (DataRow items in dtemp.Rows)
                {
                    rowPay++;
                    cmd.Parameters.Clear();
                    cmd.CommandText = "FPTI_NW.nsp_CompanyUserAlertMapping";
                    cmd.Parameters.AddWithValue("@Company", company);
                    cmd.Parameters.AddWithValue("@User", user);
                    cmd.Parameters.AddWithValue("@AlertCode", items[2].ToString());
                    cmd.Parameters.AddWithValue("@QueryType", 2);
                    cmd.ExecuteNonQuery();
                }

            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;

                result = String.Format("Error [{0}]: \n{1}", sqlEx.Number, sqlEx.Message);
                return result;
            }
            catch (Exception ex)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                return String.Format("Error: {0}\n", ex.Message);
            }

            sqlTrn.Commit();
            sqlConn.Close();
            return "Saved successfully";

        }


        public DataTable LoadGrid(string query){
            DataTable dt_soh = new DataTable();
            int xxcount = 0;
               dt_soh = SFObjects.LoadDataTable(query, this.UserDefinedConnectionString);
               dt_soh.Columns.RemoveAt(0);
               dt_soh.Columns.Add("Select", typeof(string)).SetOrdinal(0);
               foreach (DataRow row2 in dt_soh.Rows)
                 {
                   dt_soh.Rows[xxcount][0] = "checked";
                   xxcount++;
                 } 
        return dt_soh;
        }

        public DataTable FilteredGrid(string query, string company, string user)
        {
            DataTable dt_soh = new DataTable();
            DataTable dt_soh1 = new DataTable();
            int xxcount = 0;
            string alert = "", alert2 = "";
            dt_soh = SFObjects.LoadDataTable(query, this.UserDefinedConnectionString);
            dt_soh.Columns.RemoveAt(0);
            dt_soh.Columns.Add("Select", typeof(string)).SetOrdinal(0);
            dt_soh1 = dal.GetLoadGrid(company, user);
            foreach (DataRow row in dt_soh.Rows)
            {
                foreach (DataRow row2 in dt_soh1.Rows)
                {
                    alert = row["item"].ToString();
                    alert2 = row2["alert"].ToString();
                    if (alert == alert2)
                    {
                        dt_soh.Rows[xxcount][0] = "checked";
                        continue;
                    }
                    else { continue; }
                } xxcount++;
            }

            return dt_soh;
        }


        public DataTable FilteredGrid0(string query,string query2, string company, string user)
        {
            DataTable dt_soh = new DataTable();
            DataTable dt_soh1 = new DataTable();
            DataTable dt_soh2 = new DataTable();
            int xxcount = 0;
            string alert = "", alert2 = "";
            string item = "", description = "";
            dt_soh = SFObjects.LoadDataTable(query, this.UserDefinedConnectionString);
            dt_soh2 = SFObjects.LoadDataTable(query2, this.UserDefinedConnectionString);
            dt_soh.Columns.RemoveAt(0);
            dt_soh.Columns.Add("Select", typeof(string)).SetOrdinal(0);
            dt_soh1 = dal.GetLoadGrid(company, user);
            foreach (DataRow row in dt_soh.Rows)
            {
                foreach (DataRow row2 in dt_soh1.Rows)
                {
                    alert = row["item"].ToString();
                    alert2 = row2["alert"].ToString();
                    if (alert == alert2)
                    {
                        dt_soh.Rows[xxcount][0] = "checked";
                        continue;
                    }
                    else { continue; }
                } xxcount++;
            }
            xxcount = 0;
             foreach (DataRow row in dt_soh.Rows)
            {
                alert = row["Select"].ToString();
                if (alert == "") {
                    alert = "";
                    item = row["Item"].ToString();
                    description = row["Description"].ToString();
                    dt_soh2.Rows.Add(alert, item, description);
                }
                xxcount++;
            }


             return dt_soh2;
        }

        public string Generateuser(string company)
        {
            string sql = string.Format(@"Select Distinct   b.Code, b.Description  from FPTI.CompanyUserMapping  a
            left join FPTI.[User] b on a.SysUser = b.Code
            where  Company = '{0}' and  Code != '' and Description != ''", company);
            DataTable dt = SFObject.LoadDataTable(sql, this.UserDefinedConnectionString);
            if (dt.Rows.Count <= 0)
            {
                sql = "";
            }
            else
            {
                sql = "Select '-' as Code, '-' as Description union " + sql;
            }
            return sql;
        }



        public void LoadFooter()
        {

            DataTable dt = dal.LoadHDR(WebApp.nwobjectText("lugCode"), WebApp.nwobjectText("lugCode2"));

            if (dt.Rows.Count > 0)
            {
                js.ADD("$('#nwtxt_RecUser').text('" + dt.Rows[0]["Recuser"].ToString() + "')");
                js.ADD("$('#nwtxt_RecDate').text('" + dt.Rows[0]["Recdate"].ToString() + "')");
                js.ADD("$('#nwtxt_ModUser').text('" + dt.Rows[0]["Moduser"].ToString() + "')");
                js.ADD("$('#nwtxt_ModDate').text('" + dt.Rows[0]["Moddate"].ToString() + "')");

            }
            else
            {

                js.ADD("$('#nwtxt_RecUser').text('')");
                js.ADD("$('#nwtxt_RecDate').text('')");
                js.ADD("$('#nwtxt_ModUser').text('')");
                js.ADD("$('#nwtxt_ModDate').text('')");

            }

        }


    }
}
