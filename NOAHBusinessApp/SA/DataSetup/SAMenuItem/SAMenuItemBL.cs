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

namespace Noah_Web.forms_BusinessLayer
{
    public class SAMenuItemBL : nwAction
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

            dal = new SAMenuItemDAL(this.UserDefinedConnectionString, "");
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
        string RecordOperationResult = string.Empty;
        SAMenuItemDAL dal;
        public SAMenuItemBL()
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
                        RecordOperation(eRecordOperation.Export, pozt);
                        break;
                    case "6":
                        RecordOperation(eRecordOperation.Print, pozt);
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
          //  sqlOrig = sqlOrig.Replace("'", "\'");
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
               strRet = "func_ToolboxDataBat(\'" + tableName + "\', \'" + sqlOrig.Replace("\\", "\\\\").Replace("\'", "\\'") + "\', \'" + strconn.Replace("\\", "\\\\") + "\', \'" + (startIndex + batchRowcounts + 1).ToString() + "\', \'" + (batchRowcounts).ToString() + "\');";
                strRet = "try{" + strRet + "}catch(err){alert(err);}";
            }
            else
            {
                strRet = "func_ToolboxDataRetst();";
            }

            if (batchRowcounts >= 1 && startIndex > 1) strFinal = js.makeAppend(tableName, strFinal);
            else strFinal = js.makeHTML(tableName, strFinal);

      

            return strFinal + strRet + "func_toolboxCountTotal();" ;
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
                    emptyDT = dal.combobox();
                    strFinal = nwObject.make_OptionLookup(strSQL, strConn, emptyDT);
                    strSQL = js.makeHTML("#combobox1", strFinal);
                    strFinal = strSQL;
                    break;
                ////// look up 
                case "getlugCode2":

                    strSQL = string.Format(@"select Code,Description from FPTI.Item where Module = '{0}' and ( [code] like '%{1}%' or [Description] like '%{1}%') ", WebApp.nwobjectText("combobox1"), strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                 case "getlugOtherApp":

                    strSQL = string.Format(@"select '','&nbsp;' union all select Code,Description from FPTI_NW.nw_Application_Setup_HDR where [code] like '%{0}%' or [Description] like '%{0}%' ", strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlug_grid1":

                    strSQL = string.Format(@"	Select distinct
	                                    case when(Module = 'TP') then '0'
	                                    when(Module = 'ESS') then '1'
	                                    when(Module = 'HRIS') then '2'
	                                    when(Module = 'PM') then '3'
	                                    end as 'Code',
	                                    case when(Module = 'TP') then 'Input'
	                                    when(Module = 'ESS') then 'Password'
	                                    when(Module = 'HRIS') then 'Check'
	                                    when(Module = 'PM') then 'Date'
	                                    end as 'Description'
	                                     from FPTI.CompanyModuleMapping where Module !=''", strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlug_grid2":
                    strSQL = string.Format(@"	Select top 2 
	                                    case when(Module = 'TP') then '0'
	                                    when(Module = 'ESS') then '1'

	                                    end as 'Code',
	                                    case when(Module = 'TP') then 'Hide Password'
	                                    when(Module = 'ESS') then 'Show Password'
	                                    end as 'Description'
	                                     from FPTI.CompanyModuleMapping where Module !='' ", strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlug_grid3":

                    strSQL = string.Format(@"SELECT  *
                                        FROM [FPTI_NW].[noahweb_SystemConfigWEB_SystemVariables] where [code] like '%{0}%' or [value] like '%{0}%'", strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


                case "getlug_grid4":

                    strSQL = string.Format(@"	Select top 3
	                                    case when(Module = 'TP') then '0'
	                                    when(Module = 'ESS') then '1'
	                                    when(Module = 'HRIS') then '2'
	                                    end as 'Code',
	                                    case when(Module = 'TP') then 'mm/dd/yyyy'
	                                    when(Module = 'ESS') then 'dd/mm/yyyy'
	                                    when(Module = 'HRIS') then 'yyyy/dd/mm'
	                                    end as 'Description'
	                                     from FPTI.CompanyModuleMapping where Module !=''", strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getCopyFrom":
                    strSQL = string.Format(@"select distinct a.code,b.description  from FPTI_NW.noahweb_menuItems_InfoParameters a
                                                left join FPTI_NW.noahweb_menuItems_Info b
                                                on b.code = a.code where a.code != '{0}' and (a.[code] like '%{1}%' or b.[Description] like '%{1}%')", WebApp.nwobjectText("idvallugCode2"), strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                   
                case "gettoolboxInquire":
                    strSQL = string.Format(@"select Code,Description from FPTI_NW.noahweb_menuItems_Info where [code] like '%{0}%' or [Description] like '%{0}%'  ", strSearchVal);
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
                    nwToolBox.bindingNavigatorInquireItem.Enable = true;
                    nwToolBox.bindingNavigatorImportItem.Visible =
                    nwToolBox.bindingNavigatorDeleteItem.Enable =
                    nwToolBox.bindingNavigatorDeleteItem.Visible =
                    nwToolBox.bindingNavigatorExportItem.Enable = false;
                    nwToolBox.bindingNavigatorPrintItem.Enable = false;
                    CreateGrid1("", 0);
                    isNewRow = true;
                    break;
                case eRecordOperation.Save:
                    RecordOperationResult = string.Empty;

                    if (AreValidEntries() == true)
                    {
                        DataTable dtData, dtDataLin = new DataTable();
                        string code;
                        code = WebApp.nwobjectText("inCode");
                        bool filter = dal.isNewRec(code);
                        if (filter == true || (!isNewRow && !filter))
                        {
                            dtData = LoadSchema();
                            dtDataLin = LoadSchemaLin();
                            RecordOperationResult = dal.SaveData(dtData, dtDataLin, isNewRow);
                            
                            if (RecordOperationResult.ToLower().IndexOf(" successfully ") != -1)
                            {
                            js.ADD("$(\"#inCode\").attr(\"disabled\", true);");
                            RefreshData();

                                Prompt.Information("Saved successfully", based.Title);
                            }

                            


                        }
                        else
                        {
                            //js.ADD("alert(\"Cannot Save\")");
                            Prompt.Error("Cannot Save", "");
                            RecordOperationResult = "error";
                        }

                    }
                    else
                    {
                        RecordOperationResult ="error";
                    }

                    break;
                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("inCode"));

                    if (RecordOperationResult.ToLower().IndexOf(" successfully ") != -1)
                        RecordOperationResult = "Deleted successfully";


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
                    //ExportGrid();
                    // js.ADD("tableToExcel(\"nwExportContainer\", \"\", \"Report\");");

                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, -1, dal.GetDataExport(),
                                                            based.Title + " Listing", UserDefinedConnectionString, SFObject.returnText(string.Format(dal.GETCOMPANY, based.SecurityAccess.Company), UserDefinedConnectionString),
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


                    break;
                case eRecordOperation.Print:
                    //ExportGrid();
                    js.ADD("tableToPrint(\"nwExportContainer\");");
                    // Prompt.Information(tempstr, based.Title);
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
            CreateGrid1("", 0);
            //    js.ADD(CreateGrid2());

            //strFinal += CreateGrid1() + CreateGrid2();
            strFinal += get_Method("getcbo", "", "", "");
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
                    CreateGrid1(WebApp.nwobjectText("inCode"), 0);
                    js.ADD("nwGrid_TableAdjust(\"grid1\")");
                    js.ADD("nwGrid_SelectValueRetrive(\"grid1\")");
                    break;
                case "actLoadGrid":

                    break;
                case "actcopyfrom":
                    CreateGrid1(WebApp.nwobjectText("CopyFrom"), 1);
                    js.ADD("nwGrid_TableAdjust(\"grid1\")");
                    js.ADD("nwGrid_SelectValueRetrive(\"grid1\")");
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
                    sql = string.Format(@"Select a.Code+'' as Code,a.Description+'' as CodeDescription,a.link+'' as Link,a.exeVersion+'' as ExeVersion, a.exeVersionModule+'' as ExeVersionModule ,a.icon+'' as Icon,a.OtherApplication+'' as OtherApplication,b.Description+'' as OtherApplicationVersion  ,a.datecreated,a.datemodified,a.userCreated,a.userModified From [FPTI_NW].[noahweb_menuItems_Info] a  left join FPTI_NW.nw_Application_Setup_HDR b on a.OtherApplication = b.Code");



                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "Code";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", sql, based.SecurityAccess.ConnectionString);


                    //sql = sql.Replace("'", "\'");
                    // sql = sql.Replace(Environment.NewLine, " "); /*Do not Remove this*/
                    // strFinal = getToolBoxDataRet(tableName, sql, this.UserDefinedConnectionString, "1", "100");
                    break;

            }

            return strFinal;
        }


        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#inCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Code");
            SFObject.SetControlBinding("#desCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CodeDescription");
            SFObject.SetControlBinding("#link", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Link");
            SFObject.SetControlBinding("#combobox1", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "exeVersion");
            SFObject.SetControlBinding("#idvallugCode2", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "exeVersionModule");
            SFObject.SetControlBinding("#icon", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "icon");
            SFObject.SetControlBinding("#idvallugOtherApp", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "OtherApplication");
            SFObject.SetControlBinding("#descvallugOtherApp", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "OtherApplicationVersion");
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "userCreated");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "datecreated");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "userModified");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "datemodified");

        }
        private void Inquire()
        {
            nwToolBox.bindingNavigatorInquireItem.PrimaryKey = dal.primaryKey;
        }


        //////////////// end of standard / standard custumize
        private void BindCollection()
        {
            DisableDescription(isUsed());

        }

        private bool AreValidEntries()
        {
            string errorResult = String.Empty;

            if (SFObject.returnText(string.Format(@"SELECT 1 FROM [FPTI_NW].[noahweb_menuItems_Info] where code = '{0}'", WebApp.nwobjectText("inCode")), based.SecurityAccess.ConnectionString) == "1" && isNewRow == true)
                errorResult += "Cannot Save. Already exist.\n";

            if (WebApp.nwobjectText("inCode").Equals(string.Empty))
                errorResult += "Cannot Save. Please provide a valid Code.\n";
            else
            {
                if (WebApp.nwobjectText("inCode").Contains(" "))
                    errorResult += "Cannot Save. Code should not contain spaces.\n";
            }
            if (WebApp.nwobjectText("desCode").Trim().Equals(string.Empty))
                errorResult += "Cannot Save. Please provide a valid Description.\n";

            if (!errorResult.Equals(string.Empty))
                Prompt.Information(errorResult, based.Title);

            return errorResult.Equals(String.Empty);
        }

        private void RefreshData()
        {

            Data_Enable();
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")");
            js.ADD("func_ActionDriven(\"actLoadGrid\", false);");

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
            dtData = dal.GetSchema();
            #endregion

            DataRow drDataToAdd = dtData.NewRow();
            drDataToAdd["Code"] = WebApp.nwobjectText("inCode");
            drDataToAdd["Description"] = WebApp.nwobjectText("desCode");
            drDataToAdd["link"] = WebApp.nwobjectText("link");
            drDataToAdd["icon"] = WebApp.nwobjectText("icon");
            drDataToAdd["exeversion"] = WebApp.nwobjectText("combobox1");
            drDataToAdd["exeversionmodule"] = WebApp.nwobjectText("idvallugCode2");
            drDataToAdd["OtherApplication"] = WebApp.nwobjectText("OtherApp");
            
            #region don't change
            drDataToAdd["usercreated"] = drDataToAdd["usermodified"] = based.SecurityAccess.RecUser;
            drDataToAdd["datecreated"] = drDataToAdd["datemodified"] = DateTime.Now; //will be populated as getdate() in sproc

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
                    drDataToAdd["Code"] = WebApp.nwobjectText("inCode");
                    drDataToAdd["Parameter"] = dt.Rows[row][1].ToString();
                    drDataToAdd["ValueType"] = dt.Rows[row][2].ToString();
                    drDataToAdd["Value"] = dt.Rows[row][3].ToString();
                    drDataToAdd["ParameterType"] = dt.Rows[row][4].ToString();
                    drDataToAdd["ParameterFormat"] = dt.Rows[row][5].ToString();
                    drDataToAdd["DefaultValue"] = dt.Rows[row][6].ToString();

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
                     nwToolBox.bindingNavigatorInquireItem.Enable =
                     nwToolBox.bindingNavigatorDeleteItem.Enable = true;
            nwToolBox.bindingNavigatorExportItem.Enable = true;
            nwToolBox.bindingNavigatorSaveItem.Enable = true;
            nwToolBox.bindingNavigatorPrintItem.Enable = true;
        }
        public string CreateGrid1(string b, int q)
        {
            string strF = "";
            int row = 0;

            nwGrid soh = new nwGrid("grid1");
            DataTable dt_soh = new DataTable();
            string sql = "";
            if (q == 0)
            {
                sql = @"select code,Parameter,ValueType [Value Type],Value,
                    [ParameterType] [Parameter Type],ParameterFormat [Parameter Format],DefaultValue [Default Value] from FPTI_NW.noahweb_menuItems_InfoParameters where code like '" + b + "'";
                dt_soh = nwDataAccess.general_Sql_Select(sql, this.UserDefinedConnectionString);
            }
            else
            {
                dt_soh = dal.GetDataCopyFrom(b);
            }
            if (dt_soh.Columns.Count < 1)
            {
                dt_soh.Columns.Add(" ", typeof(string));
                dt_soh.Columns.Add("ParameterID", typeof(string));
                dt_soh.Columns.Add("ValueType", typeof(string));
                dt_soh.Columns.Add("Value", typeof(string));
                dt_soh.Columns.Add("Default", typeof(string));
            }
            else
            {
                dt_soh.Columns[0].ColumnName = " ";

            }

            soh.dataSource(dt_soh);
            soh.AddNew(false);
            soh.minRow(1);
            soh.RowHeight(20);
            soh.TableHeight(500);
            
            soh.HeaderTextColor("black");
            soh.backgroundColor("#FFFFFF");

            soh.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            soh.nwobject(0).Width(21);
            soh.nwobject(1).Width(251);
            soh.nwobject(2).Width(200);
            soh.nwobject(3).Width(200);
            soh.nwobject(4).Width(301);
            soh.nwobject(5).Width(301);

            soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");
            soh.nwobject(1).Template("<input value=\"{1}\">");

            soh.nwobject(2).Template("<select  class=\"nwSelect\" nwValue=\"{2}\"><option>Fixed</option><option>System Generated</option><option>User Defined</option></select>");
            soh.nwobject(3).Template("<input value=\"{3}\">");
            soh.nwobject(5).Template("<input value=\"{5}\">");
            soh.nwobject(4).Template("<input value=\"{4}\">");

            soh.nwobject(6).Template("<input value=\"{6}\">");
            //js.ADD("");
             js.makeHTML("#nwGrid1", soh.createTable());
             js.ADD("checknull()");

            return strF;
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
                dt_soh.Columns[0].AllowDBNull = true;
                dt_soh.Columns[1].AllowDBNull = true;
                dt_soh.Columns[2].AllowDBNull = true;
                dt_soh.Columns[3].AllowDBNull = true;
            }

            soh.dataSource(dt_soh);
            soh.RowHeight(25);
            soh.TableHeight(500);

            soh.HeaderTextColor("#FFFFFF");
            soh.backgroundColor("#FFFFFF");
            soh.HeaderBackgroundGradientColor("green", "darkgreen");


            js.makeHTML("#nwExportContainer", soh.createTable());
            string strF = "";
            strF = string.Format(@"<div class='nwCuz-022'></div><div>Company:{0}</div><div>System User:{1}</div><div>System Date:{2}</div>"
                    , based.SecurityAccess.Company,
                    based.SecurityAccess.RecUser
                    , DateTime.Now.ToString());

            js.makePrepend("#nwExportContainer", strF);
        }


    }
}





