using System;
using System.Data;
using System.Configuration;
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
    public class SAUserAccessReportBL : nwAction
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

        #region Declaration
        public string strConn = "";
        string RecordOperationResult = string.Empty;
        string RecordOperationResult2 = string.Empty;
        string RecordOperationResult3 = string.Empty;
        string RecordOperationResult4 = string.Empty;

       
        SAUserAccessReportDAL dao;
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

            

            dao = new SAUserAccessReportDAL(based.SecurityAccess.ConnectionString, this.UserDefinedConnectionString, "");

            if (_strmet == "get_Initialize") strFinal = get_Initialize();
            else if (_strmet == "func_Toolbox") strFinal = func_Toolbox(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "get_LookUp") strFinal = get_LookUp(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "getToolBoxDataRet") strFinal = getToolBoxDataRet(strtemp1, strtemp2, strtemp3, strtemp4, strtemp5);
            else if (_strmet == "getToolBoxDataCreate") strFinal = getToolBoxDataCreate(strtemp1, strtemp2, strtemp3, Convert.ToInt32(strtemp4), Convert.ToInt32(strtemp5));
            else if (_strmet == "getToolBoxData") strFinal = getToolBoxData(strtemp1, strtemp2);
            else if (_strmet == "get_Method") strFinal = get_Method(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "act_Method") strFinal = act_Method(strtool_Met, strParameter, strValue);
            else strFinal = js.makeJSPostScript("alert('error:" + strmet + " not excute');");

            Result = strFinal;
        }

        public SAUserAccessReportBL()
        {
            
        }

        #region Dont Change

        //*********func_Toolbox*****************
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
                    strFinal += "<td class=\"aag" + dt.Columns[i2].ColumnName.ToString().ToLower() + "\">" + dt.Rows[i][i2].ToString().Replace("'", "\\'") + "</td>";
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


        //*************LOOK UPS******************
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
                    strSQL = string.Format(@"Select [Code],[Description] from FG.UOMMaster where [code] like '%{0}%' or [Description] like '%{0}%'  ", strSearchVal);
                    strMethod = strMethod.Substring(3);
                    ////   mouseDownFunc = "func_ActionDriven(\\'actBranchChange\\', true);";
                    ////mouseDownFunc = "refresh();func_ToolboxADD();func_Check_Lookup(1);func_Clear_Dealer();clearMainTable();func_ActionDriven(\\'actDealerInfo\\', true);";
                    //mouseDownFunc = "refresh();func_ToolboxADD();func_Check_Lookup(1);clearMainTable();func_ActionDriven(\\'actDealerInfo\\', true);";
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    //strFinal += strSQL + " " + strConn;
                    break;

                case "getlugCompany":

                    if (WebApp.nwobjectText("nwaccess") == "1" && dao.CheckConfig())
                    {
                        strSQL = string.Format(@"Select a.[Code],a.[Description] from FPTI.Company a LEFT JOIN [FPTI_NW].[SuperAdmin] c ON c.Company = a.Code
                        WHERE c.UserID = '{1}' AND (a.[code] like '%{0}%' or a.[Description] like '%{0}%')  ", strSearchVal, based.SecurityAccess.RecUser);
                    }
                    else {
                        strSQL = string.Format(@"Select [Code],[Description] from FPTI.Company where [code] like '%{0}%' or [Description] like '%{0}%'  ", strSearchVal);
                    }

                    

                    strMethod = strMethod.Substring(3);
                    strConn = based.SecurityAccess.ConnectionString;
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugFromCompany":
                    strSQL = string.Format(@"Select [Code],[Description] from FPTI.Company where [code] like '%{0}%' or [Description] like '%{0}%'  ", strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strConn = based.SecurityAccess.ConnectionString;
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugToCompany":
                    strSQL = string.Format(@"Select [Code],[Description] from FPTI.Company where [code] like '%{0}%' or [Description] like '%{0}%'  ", strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strConn = based.SecurityAccess.ConnectionString;
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugUsername":


                    if (WebApp.nwobjectText("idvallugCompany") == "")
                    {
                        strSQL = string.Format(@"
                        SELECT Code, Description From FPTI.[User] WHERE 1 <> 1");
                    }
                    else {

                        if (WebApp.nwobjectText("nwaccess") == "1" && dao.CheckConfig())
                        {
                            strSQL = string.Format(@"
                        
                        Select a.Code,a.Description From FPTI.[User] a
                        LEFT JOIN FPTI.CompanyUserMapping b ON a.Code = b.SysUser
                        LEFT JOIN [FPTI_NW].[SuperAdmin] c ON c.Company = b.Company
                        WHERE c.UserID = '{1}' AND a.HasAccessToUtility = 0  ", WebApp.nwobjectText("idvallugCompany"), based.SecurityAccess.RecUser);
                        }
                        else
                        {
                            strSQL = string.Format(@"
                        
                        Select Code,Description From FPTI.[User] where HasAccessToUtility = 0  ", WebApp.nwobjectText("idvallugCompany"));
                        }
                    }

                    

                    
                    if (Generateuser(WebApp.nwobjectText("lugCompany")) != "") { strSQL = Generateuser(WebApp.nwobjectText("lugCompany")); }
                    strMethod = strMethod.Substring(3);
                    strConn = based.SecurityAccess.ConnectionString;
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getnwCopyfrmUser":
                    strSQL = string.Format(@"Select Distinct U.[Code], U.[Description] from FPTI.[CompanyUserMapping] C
                                             INNER JOIN FPTI.[User] U
                                             ON C.[SysUser]=U.Code 
                                             WHERE C.[Company]='{0}' and U.[code] like '%{1}%' or U.[Description] like '%{1}%'  ", WebApp.nwobjectText("idvallugCompany"), strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strConn = based.SecurityAccess.ConnectionString;
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugModule":

                    if (WebApp.nwobjectText("nwaccess") == "1" && dao.CheckConfig())
                    {
                        strSQL = string.Format(@"Select DISTINCT a.code [Module Code], a.AppName [Module Name]
	                                    from 
	                                    (select cmm.CompanyID, cmm.AppID, i.ItemID ,i.ItemName,q.code, q.AppName  from FPTI_NW.noahweb_Application_Collection cmm
	                                    inner join FPTI_NW.noahweb_menuDriven i
	                                    ON cmm.AppID = i.ItemParentApplication left join FPTI_NW.noahweb_Application_Info q on cmm.AppID = q.code  where i.ItemType = '1') a

	                                    left join FPTI_NW.NW_CompanyUserItemMappingWeb  cuim
                                        ON a.ItemID = cuim.Item and (cuim.SysUser='{0}' OR '{0}' = '') and a.CompanyID=cuim.Company AND a.AppID = cuim.Module
                                        LEFT JOIN [FPTI_NW].[SuperAdmin] c ON c.Company = cuim.Company
	                                    where c.UserID = '{3}' AND (a.CompanyID = '{1}' OR '{1}' = '')", WebApp.nwobjectText("lugUsername"), WebApp.nwobjectText("lugCompany"), strSearchVal, based.SecurityAccess.RecUser);
                    }
                    else {
                        strSQL = string.Format(@"Select DISTINCT a.code [Module Code], a.AppName [Module Name]
	                                    from 
	                                    (select cmm.CompanyID, cmm.AppID, i.ItemID ,i.ItemName,q.code, q.AppName  from FPTI_NW.noahweb_Application_Collection cmm
	                                    inner join FPTI_NW.noahweb_menuDriven i
	                                    ON cmm.AppID = i.ItemParentApplication left join FPTI_NW.noahweb_Application_Info q on cmm.AppID = q.code  where i.ItemType = '1') a

	                                    left join FPTI_NW.NW_CompanyUserItemMappingWeb  cuim
                                        ON a.ItemID = cuim.Item and cuim.SysUser='{0}' and a.CompanyID=cuim.Company AND a.AppID = cuim.Module
	                                    where (a.CompanyID = '{1}' OR '{1}' = '')", WebApp.nwobjectText("lugUsername"), WebApp.nwobjectText("lugCompany"), strSearchVal);
                    }

                    
                    strMethod = strMethod.Substring(3);
                    strConn = based.SecurityAccess.ConnectionString;
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugItem":

                    //if (WebApp.nwobjectText("nwaccess") == "1" && dao.CheckConfig())
                    //{
                    //    strSQL = string.Format(@"Select DISTINCT a.ItemID [Item Code], a.ItemName [Item Description]
                    //                     from 
                    //                     (select cmm.CompanyID, cmm.AppID, i.ItemID ,i.ItemName,q.code, q.AppName  from FPTI_NW.noahweb_Application_Collection cmm
                    //                     inner join FPTI_NW.noahweb_menuDriven i
                    //                     ON cmm.AppID = i.ItemParentApplication left join FPTI_NW.noahweb_Application_Info q on cmm.AppID = q.code  where i.ItemType = '1') a

                    //                     left join FPTI_NW.NW_CompanyUserItemMappingWeb  cuim
                    //                     ON a.ItemID = cuim.Item and a.CompanyID=cuim.Company AND a.AppID = cuim.Module
                    //                        LEFT JOIN [FPTI_NW].[SuperAdmin] c ON c.Company = cuim.Company
                    //                     where c.UserID = '{4}' AND (a.CompanyID = '{1}' OR '{1}' = '') AND (cuim.SysUser = '{0}' OR '{0}' = '') AND (a.code = '{2}' OR '{2}' = '')", WebApp.nwobjectText("lugUsername"), WebApp.nwobjectText("lugCompany"), WebApp.nwobjectText("lugModule"), strSearchVal, based.SecurityAccess.RecUser);
                    //}
                    //else {

                    //    strSQL = string.Format(@"Select DISTINCT a.ItemID [Item Code], a.ItemName [Item Description]
                    //                     from 
                    //                     (select cmm.CompanyID, cmm.AppID, i.ItemID ,i.ItemName,q.code, q.AppName  from FPTI_NW.noahweb_Application_Collection cmm
                    //                     inner join FPTI_NW.noahweb_menuDriven i
                    //                     ON cmm.AppID = i.ItemParentApplication left join FPTI_NW.noahweb_Application_Info q on cmm.AppID = q.code  where i.ItemType = '1') a

                    //                     left join FPTI_NW.NW_CompanyUserItemMappingWeb  cuim
                    //                     ON a.ItemID = cuim.Item and a.CompanyID=cuim.Company AND a.AppID = cuim.Module
                    //                     where (a.CompanyID = '{1}' OR '{1}' = '') AND (cuim.SysUser = '{0}' OR '{0}' = '') AND (a.code = '{2}' OR '{2}' = '')", WebApp.nwobjectText("lugUsername"), WebApp.nwobjectText("lugCompany"), WebApp.nwobjectText("lugModule"), strSearchVal);

                    //}

                    strSQL = string.Format(@"SELECT DISTINCT menu.code [Code], menu.description [Description] FROM FPTI_NW.noahweb_menuDriven driven
                                            LEFT JOIN FPTI_NW.noahweb_menuItems_Info menu ON driven.ItemID = menu.code WHERE (ItemParentApplication = '{0}' OR '{0}' = '') AND menu.code <> ''", WebApp.nwobjectText("lugModule"), strSearchVal);

                    strMethod = strMethod.Substring(3);
                    strConn = based.SecurityAccess.ConnectionString;
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                    

            }

            return strFinal;
        }
        
        //***********RECORD OPERATION***************
        public void RecordOperation(eRecordOperation i, int Position)
        {
            string result = "";
            string tempstr = "";

            switch (i)
            {
                case eRecordOperation.AddNew:
                    nwToolBox.bindingNavigatorSaveItem.Enable = true;
                    nwToolBox.bindingNavigatorAddNewItem.Enable = true;
                    nwToolBox.bindingNavigatorPrintItem.Enable =
                    nwToolBox.bindingNavigatorInquireItem.Enable =
                    nwToolBox.bindingNavigatorImportItem.Visible =
                    nwToolBox.bindingNavigatorDeleteItem.Enable =
                    nwToolBox.bindingNavigatorDeleteItem.Visible =
                     nwToolBox.bindingNavigatorExportItem.Enable = false;
                    break;
                case eRecordOperation.Save:
                    RecordOperationResult = string.Empty;
                    RecordOperationResult2 = string.Empty;
                    RecordOperationResult3 = string.Empty;
                    RecordOperationResult4 = string.Empty;

                    if (AreValidEntries() == true)
                    {
                      //  DataTable dtData, dtDataLin1, dtDataLin2, dtDataLinWhouse = new DataTable();
                      ////  dtData = LoadSchema();
                      //  //dtDataLin1 = LoadSchemaLIN_AL();
                      //  //dtDataLin2 = LoadSchemaLIN2_AL();
                      //  //dtDataLinWhouse = LoadSchemaLINWarehouse_AL();

                      //  RecordOperationResult = dao.SaveData(dtData, isNewRow);
                      //  //RecordOperationResult2 = dao.SaveDataLin1_AL(dtData, dtDataLin1, isNewRow);
                      //  //RecordOperationResult3 = dao.SaveDataLin2_AL(dtData, dtDataLin2, isNewRow);
                      //  //RecordOperationResult4 = dao.SaveDataLinWarehouse_AL(dtDataLinWhouse);

                      //  //RecordOperationResult = RecordOperationResult + "\n" + RecordOperationResult2 + "\n";

                      //  Prompt.Information(RecordOperationResult, based.Title);
                      //  //Prompt.Information(RecordOperationResult2, based.Title);
                      //  //Prompt.Information(RecordOperationResult3, based.Title);
                    }
                    else
                    {

                    }


                    break;
                case eRecordOperation.Delete:
                    RecordOperationResult = dao.DeleteData(WebApp.nwobjectText("inUsername"), WebApp.nwobjectText("inCompany"));
                    Prompt.Information(RecordOperationResult, based.Title);
                    //RecordOperationResult = dal.DeleteData(id, itemcode, connectionString);
                    RefreshData();
                    break;

                case eRecordOperation.Process:
                    tempstr = "Process";
                    ////Prompt.Information(based.SecurityAccess.ConnectionString, based.Title);
                    break;

                case eRecordOperation.Refresh:
                    string errorlist = "";
                    if (WebApp.nwobjectText("lugUsername") == "" || WebApp.nwobjectText("lugCompany") == "")
                    {
                        //if (WebApp.nwobjectText("lugCompany") == "" && WebApp.nwobjectText("lugUsername") == "")
                        //    errorlist += "Cannot Proceed. Company is required. \n Cannot Proceed.  Username is required.";
                        if (WebApp.nwobjectText("lugCompany") == "")
                            errorlist += "Cannot proceed. Company is required. \n";

                        if (WebApp.nwobjectText("lugUsername") == "")
                            errorlist += "Cannot proceed. Username is required.";

                        Prompt.Error(errorlist, based.Title);
                    }
                    else
                    {
                    CreateGrid1_AL(WebApp.nwobjectText("lugUsername"), WebApp.nwobjectText("lugCompany"), "1", "30", WebApp.nwobjectText("version"), "");
                    }

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
                    //ExportGrid();
                    //js.ADD("tableToExcel(\"nwExportContainer\", \"\", \"Report\");");

                    tempstr = "export";

                    string sql = "";

                    string from = "";
                    from = WebApp.nwobjectTextSQL("from");
                    string thru = "";
                    thru = WebApp.nwobjectTextSQL("thru");

                    string company = WebApp.nwobjectTextSQL("lugCompany");
                    string user = WebApp.nwobjectTextSQL("lugUsername");
                    string Module = WebApp.nwobjectTextSQL("lugModule");
                    string Item = WebApp.nwobjectTextSQL("lugItem");
                    string CompanyDesc = WebApp.nwobjectText("lugCompanyDesc");

                    nwGrid m_Spread = new nwGrid("grid1");
                    DataTable dt_m_Spread = new DataTable();

                    if (company.Trim() == "") company = "%";
                    if (user.Trim() == "") user = "%";



                    dt_m_Spread = SFObjects.LoadDataTable(string.Format(@"Select Distinct isNull(a.AppName, '') as Module, isNull(a.ItemID,'') as Code, a.ItemName [Item Name], 
	                                                    case when (cuim.CanAccess = 1 OR crim.CanAccess = 1)then 'Yes' else 'No' END as [Can Access], 
	                                                    case when ( cuim.CanAdd= 1 OR crim.CanAdd = 1)then 'Yes' else 'No' END as [Can Add],  
	                                                    case when ( cuim.CanEdit= 1 OR crim.CanEdit = 1)then 'Yes' else 'No' END as [Can Edit], 
	                                                    case when ( cuim.CanDelete= 1 OR crim.CanDelete = 1)then 'Yes' else 'No' END as [Can Delete],
	                                                    case when ( cuim.CanSave= 1 OR crim.CanSave = 1)then 'Yes' else 'No' END as [Can Save],
	                                                    case when ( cuim.CanPrint= 1 OR crim.CanPrint = 1)then 'Yes' else 'No' END as [Can Print],
	                                                    case when ( cuim.CanProcess= 1 OR crim.CanProcess = 1)then 'Yes' else 'No' END as [Can Process],
	                                                    case when ( cuim.CanImport= 1 OR crim.CanImport = 1)then 'Yes' else 'No' END as [Can Import],
	                                                    case when ( cuim.CanExport= 1 OR crim.CanExport = 1)then 'Yes' else 'No' END as [Can Export]                                                      
	                                                    from 
	                                                    (select cmm.CompanyID, cmm.AppID, i.ItemID ,i.ItemName,q.code, q.AppName  from FPTI_NW.noahweb_Application_Collection cmm
	                                                    inner join FPTI_NW.noahweb_menuDriven i
	                                                    ON cmm.AppID = i.ItemParentApplication left join FPTI_NW.noahweb_Application_Info q on cmm.AppID = q.code  where i.ItemType = '1') a

	                                                    left join FPTI_NW.NW_CompanyUserItemMappingWeb  cuim
	                                                    ON a.ItemID = cuim.Item and cuim.SysUser='{0}' and a.CompanyID=cuim.Company AND a.AppID = cuim.Module

                                                        LEFT JOIN FPTI_NW.NW_CompanyROlesItemMappingWeb crim ON a.ItemID = crim.Item and a.CompanyID = crim.Company AND a.AppID = crim.Module AND
                                                        crim.Roles IN (SELECT Roles FROM FPTI.RolesUser WHERE UserCode = '{0}' AND Company = a.CompanyID)

                                                        LEFT JOIN FPTI.[User] [CanAccessRec] ON [CanAccessRec].Code = cuim.CanAccessRec
                                                        LEFT JOIN FPTI.[User] [CanAddRec] ON [CanAddRec].Code = cuim.CanAddRec
                                                        LEFT JOIN FPTI.[User] [CanEditRec] ON [CanEditRec].Code = cuim.CanEditRec
                                                        LEFT JOIN FPTI.[User] [CanDeleteRec] ON [CanDeleteRec].Code = cuim.CanDeleteRec
                                                        LEFT JOIN FPTI.[User] [CanSaveRec] ON [CanSaveRec].Code = cuim.CanSaveRec
                                                        LEFT JOIN FPTI.[User] [CanPrintRec] ON [CanPrintRec].Code = cuim.CanPrintRec
                                                        LEFT JOIN FPTI.[User] [CanProcessRec] ON [CanProcessRec].Code = cuim.CanProcessRec
                                                        LEFT JOIN FPTI.[User] [CanImportRec] ON [CanImportRec].Code = cuim.CanImportRec
                                                        LEFT JOIN FPTI.[User] [CanExportRec] ON [CanExportRec].Code = cuim.CanExportRec
	                                                    where a.CompanyID = '{1}'  --and cuim.CanAccess = 1
	                                                     AND (a.ItemID = '{3}' OR '{3}' = '') AND (a.code = '{2}' OR '{2}' = '') AND a.ItemID != '' 
AND (cuim.CanAccess = 1 OR crim.CanAccess = 1 OR cuim.CanAdd= 1 OR crim.CanAdd = 1 OR cuim.CanEdit= 1 OR crim.CanEdit = 1 OR cuim.CanDelete= 1 OR crim.CanDelete = 1 OR cuim.CanSave= 1 OR crim.CanSave = 1
 OR cuim.CanPrint= 1 OR crim.CanPrint = 1 OR cuim.CanProcess= 1 OR crim.CanProcess = 1 OR cuim.CanImport= 1 OR crim.CanImport = 1 OR cuim.CanExport= 1 OR crim.CanExport = 1)", user, company, Module, Item), UserDefinedConnectionString);

                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, -1, dt_m_Spread,
                                                            based.Title + " Listing", UserDefinedConnectionString, SFObjects.returnText(dao.GETCOMPANY, based.SecurityAccess.ConnectionStringCompany),
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


                    //Prompt.Information(tempstr, based.Title);
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

        public string get_Initialize()
        {
            string strFinal = "";

            if (dao.CheckHasAccess(based.SecurityAccess.RecUser))
            {

                js.ADD("nwaccess = '1'");

            }

            dao.UpdateVersion();
            SetBindings();
          CreateGrid1_AL("","", "1", "30","","");
            execute(ref strFinal);

            //strFinal += get_Method("getcboPaymentType", "", "", "");
            //strFinal += js.makeValueText("#dtpDocDate", DateTime.Now.ToShortDateString());
            return js.makeJSPostScript(strFinal);
        }
        public string act_Method(string strMethod, string strParameter, string strValue)
        {
            string page;
            string strFinal = "";
            string strSQL = "";
            int method;
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actBindCollection":
                    Data_Enable();
                    BindCollection();
                    if (!(WebApp.nwobjectText("inUsername").Equals(string.Empty)))
                    {
                        //js.ADD(CreateGrid1_AL());
                        //js.ADD(CreateGrid2_AL());
                    }
                    break;
                case "actLoadGrid":
                   CreateGrid1_AL(WebApp.nwobjectText("lugUsername"), WebApp.nwobjectText("lugCompany"), "1", "30", WebApp.nwobjectText("version"),"");
                    //js.ADD(CreateGrid2_AL());
                    break;

                case "actSaveData":
                    SaveData();
                    break;

                case "actLoadData":
                    CreateGrid1_AL(WebApp.nwobjectText("lugUsername"), WebApp.nwobjectText("lugCompany"), "1", "30", WebApp.nwobjectText("version"),"");
                    break;

                case "actClearGrid":
                    CreateGrid1_AL("", "", "1", "30","","");
                    break;
                    
                case "actLoadCopyFrom":
                    CreateGrid1_AL(WebApp.nwobjectText("nwcusercde"), WebApp.nwobjectText("lugCompany"), "1", "30", WebApp.nwobjectText("version"),"");
                    break;

                case "actImportCompany":
                    ImportCompany();
                    break;


                case "actPagerClick":
                    page = "1";
                    CreateGrid1_AL(WebApp.nwobjectText("lugUsername"), WebApp.nwobjectText("lugCompany"), WebApp.nwobjectText("based"), WebApp.nwobjectText("finalrange"), WebApp.nwobjectText("version"),page);
                    break;
                case "actSaveData2":
                    SaveData2();
                    break;
                case "actDetails":
                    customgrid();
                    break;
                case "actFilter":
                    CreateGrid1_AL(WebApp.nwobjectText("lugUsername"), WebApp.nwobjectText("lugCompany"), "1", "30", WebApp.nwobjectText("version"), "");
                    break;

                case "actExport":
                    ExportGrid();
                    js.ADD("tableToExcel(\"nwExportContainer\", \"\", \"Report\");");
                   // CreateGrid1_AL(WebApp.nwobjectText("lugUsername"), WebApp.nwobjectText("lugCompany"), "1", "30", WebApp.nwobjectText("version"), "");
                    break;


            }
            return js.makeJSPostScript(execute());
        }
        public string getToolBoxData(string tableName, string getMethod)
        {
            string strFinal = ""; string sql = "";
            switch (getMethod)
            {
                case "toolbox":
                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "Code";
                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dao.GetData(), this.UserDefinedConnectionString);
                    break;

            }

            return strFinal;
        }
        

        //*************COMMON******************
        private void SetBindings()
        {
            SFObject.SetControlBinding("#lugCompany", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Company");
            SFObject.SetControlBinding("#lugUsername", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Username");
        }
        private void Inquire()
        {
            nwToolBox.bindingNavigatorInquireItem.PrimaryKey = dao.primaryKey;
            //SFObjects.caseSearch(ref dal.CurrentSelectedItem, dal.inquireQry, dal.ConnectionString);
            //Prompt.Information(dal.primaryKey + " " + dal.CurrentSelectedItem, "");
            //BindingNavigator.BindingSource.Position = BindingNavigator.BindingSource.Find(dao.primaryKey, dao.CurrentSelectedItem);
        }

        private void BindCollection()
        {
            //DisableDescription(isUsed());

        }
        private bool AreValidEntries()
        {
            string errorResult = String.Empty;

            if (WebApp.nwobjectText("idvallugCompany").Equals(string.Empty))
                errorResult += "Cannot Save. Please provide a valid Company.\n";
            else
            {
                //if (WebApp.nwobjectText("lugCompany").Contains(" "))
                //    errorResult += "Cannot Save. Company should not contain spaces.\n";
            }
            if (WebApp.nwobjectText("idvallugUsername").Trim().Equals(string.Empty))
                errorResult += "Cannot Save. Please provide a valid User.\n";
            else
            {
                if (WebApp.nwobjectText("idvallugUsername").Contains(" "))
                    errorResult += "Cannot Save. Usercode should not contain spaces.\n";
            }

            if (!errorResult.Equals(string.Empty))
                Prompt.Information(errorResult, based.Title);

            return errorResult.Equals(String.Empty);
        }
        private void RefreshData()
        {

           // Data_Enable();
            js.ADD("func_Toolbox_Clear();");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")");
            js.ADD("func_ActionDriven(\"actLoadGrid\", false);");

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
        void SaveData()
        {

            RecordOperationResult = string.Empty;

            if (AreValidEntries() == true)
            {
                DataTable dtData = new DataTable();
                dtData = LoadSchema(WebApp.nwobjectText("version"));
                RecordOperationResult = dao.SaveData(dtData, isNewRow);
                Prompt.Information(RecordOperationResult, based.Title);
            }
        }
        void SaveData2()
        {

            RecordOperationResult = string.Empty;

            if (AreValidEntries() == true)
            {
                DataTable dtData = new DataTable();
                dtData = LoadSchema(WebApp.nwobjectText("version"));
                RecordOperationResult = dao.SaveData2(dtData, isNewRow);
                Prompt.Information(RecordOperationResult, based.Title);
            }
        }
        private DataTable LoadSchema(string version)
        {
            #region don't change
            DataTable dtData = new DataTable();
            dtData = dao.GetSchema();
            DataTable dtData2 = new DataTable();
            dtData2 = dao.GetSchema();
            #endregion
            DataRow drDataToAdd2;
            DataRow drDataToAdd;
            int rowNo = 1;
            string item = "";
            string module = "";
            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGrid1"));

            for (int row = 0; row < dt.Rows.Count; row++)
            {
                if (version == "0"){ 
                string user = WebApp.nwobjectText("idvallugUsername");
                item = dt.Rows[row][1].ToString();
                string exeversion = SFObject.returnText(string.Format("Select exeVersionModule  from FPTI_NW.noahweb_menuItems_Info where code = '{0}' ", item), this.UserDefinedConnectionString);
                string exeversionModule = SFObject.returnText(string.Format("Select exeVersion  from FPTI_NW.noahweb_menuItems_Info where code = '{0}' ", item), this.UserDefinedConnectionString);

                if(exeversion == ""){}else{
                    dtData2 = SFObject.LoadDataTable(string.Format("Select * from FPTI.CompanyUserItemMapping where SysUser = '{0}' and Item like '%{1}%' and Company = '{2}'and module = '{3}'", user, exeversion, WebApp.nwobjectText("idvallugCompany"), exeversionModule), this.UserDefinedConnectionString);
                  //  string code = SFObject.returnText(string.Format(" Select Code from FPTI_NW.noahweb_Application_Info where AppName =  '{0}' ", exeversionModule), this.UserDefinedConnectionString);
                           
                    if (dtData2.Rows.Count <= 0) { } else {
                        dtData2.Rows.Clear();
                        drDataToAdd2 = dtData2.NewRow();
                        drDataToAdd2["Company"] = WebApp.nwobjectText("idvallugCompany");
                        drDataToAdd2["SysUser"] = WebApp.nwobjectText("idvallugUsername");
                        drDataToAdd2["Module"] = exeversionModule;
                        drDataToAdd2["Item"] = exeversion;
                        drDataToAdd2["CanAccess"] = dt.Rows[row][3].ToString() == "true" ? 1 : 0;
                        drDataToAdd2["CanAdd"] = dt.Rows[row][4].ToString() == "true" ? 1 : 0;
                        drDataToAdd2["CanEdit"] = dt.Rows[row][5].ToString() == "true" ? 1 : 0;
                        drDataToAdd2["CanDelete"] = dt.Rows[row][6].ToString() == "true" ? 1 : 0;
                        drDataToAdd2["CanSave"] = dt.Rows[row][7].ToString() == "true" ? 1 : 0;
                        drDataToAdd2["CanPrint"] = dt.Rows[row][8].ToString() == "true" ? 1 : 0;
                        drDataToAdd2["CanProcess"] = dt.Rows[row][9].ToString() == "true" ? 1 : 0;
                        drDataToAdd2["CanImport"] = dt.Rows[row][10].ToString() == "true" ? 1 : 0;
                        drDataToAdd2["CanExport"] = dt.Rows[row][11].ToString() == "true" ? 1 : 0;
                        dtData2.Rows.Add(drDataToAdd2);
                        dtData2.AcceptChanges();
                        dao.Update(dtData2, user, item, WebApp.nwobjectText("idvallugCompany"), exeversionModule); 
                       
                    }
                }
                }
                else
                {
                    string user = WebApp.nwobjectText("idvallugUsername");
                    module = dt.Rows[row][0].ToString();
                    item = dt.Rows[row][1].ToString();
                    string Code = SFObject.returnText(string.Format("Select code from FPTI_NW.noahweb_menuItems_Info where exeVersionModule like '%{0}%' or exeVersion = '{1}'", item, module), this.UserDefinedConnectionString);
                    if (Code == "") { } else {
                        dtData2 = SFObject.LoadDataTable(string.Format("Select a.* from FPTI_NW.NW_CompanyUserItemMappingWeb a left join FPTI_NW.noahweb_menuItems_Info b on a.Item = b.code where a.SysUser = '{0}' and a.Company = '{1}' and b.exeVersionModule like '%{2}%' and b.exeVersion = '{3}'", user, WebApp.nwobjectText("idvallugCompany"), item, module), this.UserDefinedConnectionString);
                        if (dtData2.Rows.Count <= 0) { }
                        else
                        {
                            string mod = dtData2.Rows[0][2].ToString();
                            string tem = dtData2.Rows[0][3].ToString();
                            dtData2.Rows.Clear();
                            drDataToAdd2 = dtData2.NewRow();
                            drDataToAdd2["Company"] = WebApp.nwobjectText("idvallugCompany");
                            drDataToAdd2["SysUser"] = WebApp.nwobjectText("idvallugUsername");
                            drDataToAdd2["Module"] = mod;
                            drDataToAdd2["Item"] = tem;
                            drDataToAdd2["CanAccess"] = dt.Rows[row][3].ToString() == "true" ? 1 : 0;
                            drDataToAdd2["CanAdd"] = dt.Rows[row][4].ToString() == "true" ? 1 : 0;
                            drDataToAdd2["CanEdit"] = dt.Rows[row][5].ToString() == "true" ? 1 : 0;
                            drDataToAdd2["CanDelete"] = dt.Rows[row][6].ToString() == "true" ? 1 : 0;
                            drDataToAdd2["CanSave"] = dt.Rows[row][7].ToString() == "true" ? 1 : 0;
                            drDataToAdd2["CanPrint"] = dt.Rows[row][8].ToString() == "true" ? 1 : 0;
                            drDataToAdd2["CanProcess"] = dt.Rows[row][9].ToString() == "true" ? 1 : 0;
                            drDataToAdd2["CanImport"] = dt.Rows[row][10].ToString() == "true" ? 1 : 0;
                            drDataToAdd2["CanExport"] = dt.Rows[row][11].ToString() == "true" ? 1 : 0;
                            dtData2.Rows.Add(drDataToAdd2);
                            dtData2.AcceptChanges();
                            dao.Update2(dtData2, user, tem, WebApp.nwobjectText("idvallugCompany"), mod);

                        }
                    }
                    
                
                }
                if (dt.Rows[row][1].ToString().Trim() != "")
                {
                    drDataToAdd = dtData.NewRow();
                    drDataToAdd["Company"] = WebApp.nwobjectText("idvallugCompany");

                    drDataToAdd["SysUser"] = WebApp.nwobjectText("idvallugUsername");
                    if (version == "0")
                    {
                        string code = SFObject.returnText(string.Format(" Select Code from FPTI_NW.noahweb_Application_Info where AppName =  '{0}' ", dt.Rows[row][0].ToString()), this.UserDefinedConnectionString);
                        drDataToAdd["Module"] = code;
                    }
                    else { drDataToAdd["Module"] = dt.Rows[row][0].ToString(); }

                    drDataToAdd["Item"] = dt.Rows[row][1].ToString();
                    drDataToAdd["CanAccess"] = dt.Rows[row][3].ToString() == "true" ? 1 : 0;
                    drDataToAdd["CanAdd"] = dt.Rows[row][4].ToString() == "true" ? 1 : 0;
                    drDataToAdd["CanEdit"] = dt.Rows[row][5].ToString() == "true" ? 1 : 0;
                    drDataToAdd["CanDelete"] = dt.Rows[row][6].ToString() == "true" ? 1 : 0;
                    drDataToAdd["CanSave"] = dt.Rows[row][7].ToString() == "true" ? 1 : 0;
                    drDataToAdd["CanPrint"] = dt.Rows[row][8].ToString() == "true" ? 1 : 0;
                    drDataToAdd["CanProcess"] = dt.Rows[row][9].ToString() == "true" ? 1 : 0;
                    drDataToAdd["CanImport"] = dt.Rows[row][10].ToString() == "true" ? 1 : 0;
                    drDataToAdd["CanExport"] = dt.Rows[row][11].ToString() == "true" ? 1 : 0;
                    
                    #region don't change
                    dtData.Rows.Add(drDataToAdd);
                    dtData.AcceptChanges();
                    #endregion
                    rowNo++;
                }
            }

            return dtData;
        }
        public void CreateGrid1_AL(string xusername, string xcompany, string frompage, string topage,string version,string page)
        {
            string search = WebApp.nwobjectText("nwAPSearch");
            string nwListbox1 = WebApp.nwobjectText("nwListbox1");
            string gridID = "nwGridCon";
            if(version == "1"){
              
            string strF = "";
            int row = 0;
            
            nwGrid soh = new nwGrid(gridID);
            DataTable dt_soh = new DataTable();
            DataTable dt = new DataTable();
            string sql = "";
            int totrecords;

            totrecords = int.Parse(dao.GetTotRecords(xusername, xcompany));
            dt_soh = dao.GetTable_AL(xusername, xcompany, frompage, topage);

            if (dt_soh.Columns.Count < 1)
            {
                dt_soh.Columns.Add("Module", typeof(string));
                dt_soh.Columns.Add("Menu Item", typeof(string));
                dt_soh.Columns.Add("Description", typeof(string));
                dt_soh.Columns.Add("DATE", typeof(string));
            }
            else
            {
                dt_soh.Columns[0].AllowDBNull = true;
                dt_soh.Columns[1].AllowDBNull = true;
                dt_soh.Columns[3].AllowDBNull = true;
                dt_soh.Columns[2].AllowDBNull = true;
                dt_soh.Columns[4].AllowDBNull = true;
                dt_soh.Columns[5].AllowDBNull = true;
                dt_soh.Columns[6].AllowDBNull = true;
                dt_soh.Columns[7].AllowDBNull = true;
                dt_soh.Columns[8].AllowDBNull = true;
                dt_soh.Columns[9].AllowDBNull = true;
                dt_soh.Columns[10].AllowDBNull = true;
                dt_soh.Columns[11].AllowDBNull = true;
            }
            string ver = "";
            string code = "";
          
            //dt_soh.Columns.Add(new DataColumn("Version", typeof(string)));
            //foreach (DataRow row2 in dt_soh.Rows)
            //{
            //    string item = row2["Code"].ToString();
            //    string modul = row2["Module"].ToString();
            //    dt = SFObject.LoadDataTable(string.Format("Select a.code+'' as WebCode,a.description+''as WebDescription,b.Code,b.Description,a.exeVersion,b.Module from FPTI_NW.noahweb_menuItems_Info a left join fpti.Item  b on a.exeVersionModule = b.Code where b.code = '{0}' and b.Module ='{1}'", item,modul), this.UserDefinedConnectionString);
            //    foreach (DataRow dr2 in dt.Rows)
            //    {
            //        code = dr2["Code"].ToString();
            //    }
            //    if (code == "")
            //    {

            //    }
            //    else
            //    {
            //        ver = "Version";
            //        row2["Version"] = ver;
            //    }
            //    code = "";
            //}
            soh.dataSource(dt_soh);
            soh.minRow(dt_soh.Rows.Count);
            soh.RowHeight(15);
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

            soh.nwobject(0).Width(70);
            soh.nwobject(1).Width(250);
            soh.nwobject(2).Width(450);
            soh.nwobject(3).Width(70);
            soh.nwobject(4).Width(70);
            soh.nwobject(5).Width(70);
            soh.nwobject(6).Width(70);
            soh.nwobject(7).Width(70);
            soh.nwobject(8).Width(70);
            soh.nwobject(9).Width(70);
            soh.nwobject(10).Width(70);
            soh.nwobject(11).Width(70);
           // soh.nwobject(12).Width(0);

            soh.nwobject(0).Template("{0}");
          //  soh.nwobject(1).Template("<div class=\"{12}\">{1}</div>");
            soh.nwobject(2).Template("{1}");
            soh.nwobject(2).Template("{2}");
            soh.nwobject(3).Template("<input id=\"canaccess\" disabled type=\"checkbox\" {3}>");
            soh.nwobject(4).Template("<input id=\"canadd\" disabled type=\"checkbox\" {4}>");
            soh.nwobject(5).Template("<input id=\"canedit\" disabled type=\"checkbox\" {5}>");
            soh.nwobject(6).Template("<input id=\"candelete\" disabled type=\"checkbox\" {6}>");
            soh.nwobject(7).Template("<input id=\"cansave\" disabled type=\"checkbox\" {7}>");
            soh.nwobject(8).Template("<input id=\"canprint\" disabled type=\"checkbox\" {8}>");
            soh.nwobject(9).Template("<input id=\"canprocess\" disabled type=\"checkbox\" {9}>");
            soh.nwobject(10).Template("<input id=\"canimport\" disabled type=\"checkbox\" {10}>");
            soh.nwobject(11).Template("<input id=\"canexport\" disabled type=\"checkbox\" {11}>");

            js.makeHTML("#nwGrid1", soh.createTable());
            //if (page == "1") { } else {
            //int totpage = totrecords / 30;
            //if (totrecords % 30 > 0)
            //{
            //    totpage++;
            //}

           // string pagerdiv = "";
           // string strTemp = "nwSelected";
           // for (int i = 1; i <= totpage; i++)
           // {
           //     pagerdiv += "<button class=\"PagerNum " + strTemp + "\" onclick=\"func_LoadPager(" + i + ")\">" + i + "</button>";
           //     strTemp = "";
           // }

           //js.makeHTML("#nwPager", pagerdiv);
           // return strF;
             //}

         }else{
             string strF;

             nwGrid soh = new nwGrid(gridID);
             DataTable dt_soh = new DataTable();
             DataTable dt = new DataTable();
             search = "";
              if (search == "")
            {
                if(page == "1"){}else{
                 //strF = string.Empty;
                 //string tot = dao.GetAllData(xcompany, xusername);
                 //if (tot == "") { tot = "0"; }
                 //int totrecords = Int32.Parse(tot.ToString());
                 //if (totrecords <= 30) { }
                 //else
                 //{
                 //    int totpage = totrecords / 30;
                 //    if (totrecords % 30 > 0)
                 //    {
                 //        totpage++;
                 //    }
                 //    string pagerdiv = string.Empty;
                 //    string strTemp = "nwSelected";
                 //    for (int i = 1; i <= totpage; i++)
                 //    {
                 //        pagerdiv += "<button class=\"PagerNum " + strTemp + "\" onclick=\"func_LoadPager(" + i + ")\">" + i + "</button>";
                 //        strTemp = "";
                 //    }

                 //    strF += js.makeHTML("#nwPager", pagerdiv);
                 //}
                }
                dt_soh = dao.GetDataUser(xcompany, xusername, WebApp.nwobjectText("lugModule"), WebApp.nwobjectText("lugItem"));

                if (dt_soh.Rows.Count > 0)
                    js.ADD("$('#noah-webui-Toolbox').bindingExport().enable(true);");
            }
              else
              {
                  if (page == "1") { }
                  else
                  {
                      
                 
                      strF = string.Empty;
                      //string tot = dao.GetTotRecordsfilterWeb(xusername, xcompany, search, nwListbox1);
                      //int totrecords = Int32.Parse(tot.ToString());
                      //int totpage = totrecords / 30;
                      //if (totrecords % 30 > 0)
                      //{
                      //    totpage++;
                      //}
                      //string pagerdiv = string.Empty;
                      //string strTemp = "nwSelected";
                      //for (int i = 1; i <= totpage; i++)
                      //{
                      //    pagerdiv += "<button class=\"PagerNum " + strTemp + "\" onclick=\"func_LoadPager(" + i + ")\">" + i + "</button>";
                      //    strTemp = "";
                      //}

                      //strF += js.makeHTML("#nwPager", pagerdiv);

                      dt_soh = dao.GetTable_AL2Web(xusername, xcompany, frompage, topage, search, nwListbox1);
                  }
              }
              string ver = "";
              string code = "";
              dt_soh.Columns.Add(new DataColumn("Version", typeof(string)));
              foreach (DataRow row2 in dt_soh.Rows)
              {
                  string item = row2["Code"].ToString();
                  dt = SFObject.LoadDataTable(string.Format("Select a.code+'' as WebCode,a.description+''as WebDescription,b.Code,b.Description,a.exeVersion,b.Module   from FPTI_NW.noahweb_menuItems_Info a left join fpti.Item  b on a.exeVersionModule = b.Code where a.code = '{0}'", item), this.UserDefinedConnectionString);
                  
                foreach (DataRow dr2 in dt.Rows){
                  code =  dr2["Code"].ToString();
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
             //soh.minRow(0);
             
             soh.TableHeight(500);


             soh.nwobject(0).Width(150);
             soh.nwobject(1).Width(150);
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
             soh.nwobject(13).Width(0);
             soh.nwobject(14).Width(0);
             soh.nwobject(15).Width(0);
             soh.nwobject(16).Width(0);
             soh.nwobject(17).Width(0);
             soh.nwobject(18).Width(0);
             soh.nwobject(19).Width(0);
             soh.nwobject(20).Width(0);

             soh.nwobject(21).Width(0);

             soh.nwobject(0).Template("{0}");
             soh.nwobject(1).Template("<div class=\"{12}\">{1}</div>");
             soh.nwobject(2).Template("{2}");

             //soh.nwobject(3).Template("<input id=\"sample\" disabled type=\"checkbox\"{3}>");
             //soh.nwobject(4).Template("<input id=\"sample\" disabled type=\"checkbox\"{4}>");
             //soh.nwobject(5).Template("<input id=\"sample\" disabled type=\"checkbox\"{5}>");
             //soh.nwobject(6).Template("<input id=\"sample\" disabled type=\"checkbox\"{6}>");
             //soh.nwobject(7).Template("<input id=\"sample\" disabled type=\"checkbox\"{7}>");
             //soh.nwobject(8).Template("<input id=\"sample\" disabled type=\"checkbox\"{8}>");
             //soh.nwobject(9).Template("<input id=\"sample\" disabled type=\"checkbox\"{9}>");
             //soh.nwobject(10).Template("<input id=\"sample\" disabled type=\"checkbox\"{10}>");
             //soh.nwobject(11).Template("<input id=\"sample\" disabled type=\"checkbox\"{11}>");

             soh.nwobject(3).CheckBox(true);
             soh.nwobject(4).CheckBox(true);
             soh.nwobject(5).CheckBox(true);
             soh.nwobject(6).CheckBox(true);
             soh.nwobject(7).CheckBox(true);
             soh.nwobject(8).CheckBox(true);
             soh.nwobject(9).CheckBox(true);
             soh.nwobject(10).CheckBox(true);
             soh.nwobject(11).CheckBox(true);

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
             
             soh.PagerPerPage(50);
             soh.PagerDataEditable(true);
             //  soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");
             //soh.nwobject(1).Template("<button class=\"lug_grid1\">{1}</button>");
             js.makeHTML("#nwGrid1", soh.createTable());
             js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
             js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
             js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

             js.ADD("$('.nwCheckBox').enable(false); $('.nwCheckBoxTot').css('display', 'none');");
            }
        }

        private void ImportCompany()
        {
            RecordOperationResult = dao.ImportCompany(WebApp.nwobjectText("ToCompany"), WebApp.nwobjectText("FromCompany"));
            Prompt.Information(RecordOperationResult, based.Title);
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
            if (version == "0") { 
            dt2 = SFObject.LoadDataTable(string.Format("Select '' as sss,Code+'' as WebVersion, Description+'' as DesktopVersion from fpti.Item where 1 != 1"), this.UserDefinedConnectionString);
            string item = WebApp.nwobjectText("item2");
            dt = SFObject.LoadDataTable(string.Format("Select a.code+'' as WebCode,a.description+''as WebDescription,b.Code,b.Description,a.exeVersion,b.Module   from FPTI_NW.noahweb_menuItems_Info a left join fpti.Item  b on a.exeVersionModule = b.Code where a.code = '{0}'", item), this.UserDefinedConnectionString);
            }
            else {
                dt2 = SFObject.LoadDataTable(string.Format("Select '' as sss,Code+'' as WebVersion, Description+'' as DesktopVersion from fpti.Item where 1 != 1"), this.UserDefinedConnectionString);
                string item = WebApp.nwobjectText("item2");
                string module = WebApp.nwobjectText("modle"); 
                dt = SFObject.LoadDataTable(string.Format("Select a.code+'' as WebCode,a.description+''as WebDescription,b.Code,b.Description,a.exeVersion,b.Module from FPTI_NW.noahweb_menuItems_Info a left join fpti.Item  b on a.exeVersionModule = b.Code where b.code = '{0}' and b.Module ='{1}'", item,module), this.UserDefinedConnectionString);
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
                else {
                    webcode = row["Webcode"].ToString();
                    js.makeValueText("#code", webcode.ToString());
                    webcode = row["WebDescription"].ToString();
                    js.makeValueText("#desc", webcode.ToString());
                    webcode = row["module"].ToString();
                    js.makeValueText("#module", webcode.ToString());
                }
            }


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

            soh.nwobject(0).Width(150);
            soh.nwobject(1).Width(150);
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

            //soh.nwobject(3).Template("<input id=\"sample\" disabled type=\"checkbox\"{3}>");
            //soh.nwobject(4).Template("<input id=\"sample\" disabled type=\"checkbox\"{4}>");
            //soh.nwobject(5).Template("<input id=\"sample\" disabled type=\"checkbox\"{5}>");
            //soh.nwobject(6).Template("<input id=\"sample\" disabled type=\"checkbox\"{6}>");
            //soh.nwobject(7).Template("<input id=\"sample\" disabled type=\"checkbox\"{7}>");
            //soh.nwobject(8).Template("<input id=\"sample\" disabled type=\"checkbox\"{8}>");
            //soh.nwobject(9).Template("<input id=\"sample\" disabled type=\"checkbox\"{9}>");
            //soh.nwobject(10).Template("<input id=\"sample\" disabled type=\"checkbox\"{10}>");
            //soh.nwobject(11).Template("<input id=\"sample\" disabled type=\"checkbox\"{11}>");

            js.makeHTML("#nwExportContainer", soh.createTable());
            string strF = "";
            strF = string.Format(@"<div class='nwCuz-016'>{0}</div><div>Company</div><div>System User:{1}</div><div>System Date:{2}</div>"
                    , based.SecurityAccess.Company,
                    based.SecurityAccess.RecUser
                    , DateTime.Now.ToString());

            js.makePrepend("#nwExportContainer", strF);
        }


        public string Generateuser(string company)
        {
            string sql = string.Format(@"Select Distinct   b.Code, b.Description  from FPTI.CompanyUserMapping  a
            left join FPTI.[User] b on a.SysUser = b.Code
            where  Company = '{0}' and  Code != '' and Description != ''",company);
            DataTable dt = SFObject.LoadDataTable(sql, this.UserDefinedConnectionString);
            if (dt.Rows.Count <= 0) {
                sql = "";
            }

            return sql;
        }
    }
}
