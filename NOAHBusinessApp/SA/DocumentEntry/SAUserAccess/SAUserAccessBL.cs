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

//using NoahIOHandler;
//

using DataAccessLayers;
using DALComponent;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;

namespace Noah_Web.forms_BusinessLayer
{
    public class SAUserAccessBL : nwAction
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

       
        SAUserAccessDAL dao;
        #endregion


        #region SPR

        int SPR_Module = 1,
            SPR_Code = 2,
            SPR_ItemName = 3,
            SPR_CanAccess = 4,
            SPR_CanAdd = 5,
            SPR_CanEdit = 6,
            SPR_CanDelete = 7,
            SPR_CanSave = 8,
            SPR_CanPrint = 9,
            SPR_CanProcess = 10,
            SPR_CanImport = 11,
            SPR_CanExport = 12,
            SPR_CanAccessRec = 13,
            SPR_CanAddRec = 14,
            SPR_CanEditRec = 15,
            SPR_CanDeleteRec = 16,
            SPR_CanSaveRec = 17,
            SPR_CanPrintRec = 18,
            SPR_CanProcessRec = 19,
            SPR_CanImportRec = 20,
            SPR_CanExportRec = 21,
            SPR_ModuleCode = 22;

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

            

            dao = new SAUserAccessDAL(based.SecurityAccess.ConnectionString, this.UserDefinedConnectionString, "");

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

        public SAUserAccessBL()
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
                        strSQL = string.Format(@"
                                                select a.code [Code],a.description [Description] from fpti.Company a
                                                LEFT JOIN [FPTI_NW].[SuperAdmin] c ON c.Company = a.Code
                                                WHERE c.UserID = '{1}' AND (a.[code] like '%{0}%' or a.[Description] like '%{0}%')  ", strSearchVal, based.SecurityAccess.RecUser);
                    }
                    else {
                        strSQL = string.Format(@"
                                                select code [Code],description [Description] from fpti.Company where [code] like '%{0}%' or [Description] like '%{0}%'  ", strSearchVal);
                    
                    }

                    
                    strMethod = strMethod.Substring(3);
                    strConn = based.SecurityAccess.ConnectionString;
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugFromCompany":
                    strSQL = string.Format(@"Select [Code],[Description] from FPTI.Company where ([code] like '%{0}%' or [Description] like '%{0}%')  AND code != '" + WebApp.nwobjectText("idvallugToCompany") + "'  ", strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strConn = based.SecurityAccess.ConnectionString;
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugToCompany":
                    strSQL = string.Format(@"Select [Code],[Description] from FPTI.Company where ([code] like '%{0}%' or [Description] like '%{0}%') AND code != '" + WebApp.nwobjectText("idvallugFromCompany") + "' ", strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strConn = based.SecurityAccess.ConnectionString;
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugUserComp":
                    string company = WebApp.nwobjectText("lugToCompany");
                    strSQL = string.Format(@"
                    
                    Select  U.[Code], U.[Description] from FPTI.[CompanyUserMapping] C
                                             INNER JOIN FPTI.[User] U
                                             ON C.[SysUser]=U.Code 
                                             WHERE C.[Company]='{0}'  and (U.[code] like '%{1}%' or U.[Description] like '%{1}%')  ", company, strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strConn = based.SecurityAccess.ConnectionString;
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                    

                case "getlugUsername":
                    company = WebApp.nwobjectText("lugCompany");
                    strSQL = string.Format(@"
                    
                    Select  U.[Code], U.[Description] from FPTI.[CompanyUserMapping] C
                                             INNER JOIN FPTI.[User] U
                                             ON C.[SysUser]=U.Code 
                                             WHERE C.[Company]='{0}'  and (U.[code] like '%{1}%' or U.[Description] like '%{1}%')  ", company, strSearchVal);
                    strMethod = strMethod.Substring(3);
                    strConn = based.SecurityAccess.ConnectionString;
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getnwCopyfrmUser":
                    strSQL = string.Format(@"Select Distinct U.[Code], U.[Description] from FPTI.[CompanyUserMapping] C
                                             INNER JOIN FPTI.[User] U
                                             ON C.[SysUser]=U.Code 
                                             WHERE C.[Company]='{0}' and U.[code] not like '{1}'  ", WebApp.nwobjectText("idvallugCompany"), WebApp.nwobjectText("idvallugUsername"));
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
                    break;
                case eRecordOperation.Save: 
                    break;
                case eRecordOperation.Delete: 
                    break; 
                case eRecordOperation.Process: 
                    break; 
                case eRecordOperation.Refresh: 
                    break;
                case eRecordOperation.Inquire: 
                    break; 
                case eRecordOperation.Import: 
                    break;
                case eRecordOperation.Export:
                    string search = WebApp.nwobjectText("nwAPSearch");
                    string nwListbox1 = WebApp.nwobjectText("nwListbox1");
                    DataTable dt_soh = new DataTable();
                    string xusername = WebApp.nwobjectText("lugUsername");
                    string xcompany =  WebApp.nwobjectText("lugCompany");
                    string xcompanyDesc = WebApp.nwobjectText("lugCompanyDesc");
                    
                    string frompage = "1";
                    string topage = "30";
                    bool NoSearch = false;
                    if (string.IsNullOrEmpty(search))
                    {
                        dt_soh = SFObjects.LoadDataTable(string.Format(@"
                    DECLARE @Company varchar(50) = '{1}'
                    DECLARE	@SysUser varchar(50) = '{0}'
                    DECLARE	@Module varchar(50) = NULL
                    DECLARE @QueryType int = 4
                    Select Distinct isNull(a.AppName, '') as Module, isNull(a.ItemID,'') as Code, a.ItemName, 
	                CASE WHEN CAST(cuim.CanAccess as varchar(3)) = 1 THEN 'Yes' ELSE 'No' END CanAccess,
                    CASE WHEN CAST(cuim.CanAdd as varchar(3)) = 1 THEN 'Yes' ELSE 'No' END   CanAdd,
                    CASE WHEN CAST(cuim.CanEdit as varchar(3)) = 1 THEN 'Yes' ELSE 'No' END  CanEdit,
                    CASE WHEN CAST(cuim.CanDelete as varchar(3)) = 1 THEN 'Yes' ELSE 'No' END CanDelete,
                    CASE WHEN CAST(cuim.CanSave as varchar(3)) = 1 THEN 'Yes' ELSE 'No' END CanSave,
                    CASE WHEN CAST(cuim.CanPrint as varchar(3)) = 1 THEN 'Yes' ELSE 'No' END CanPrint,
                    CASE WHEN CAST(cuim.CanProcess as varchar(3)) = 1 THEN 'Yes' ELSE 'No' END CanProcess,
                    CASE WHEN CAST(cuim.CanImport as varchar(3)) = 1 THEN 'Yes' ELSE 'No' END CanImport,
                    CASE WHEN CAST(cuim.CanExport as varchar(3)) = 1 THEN 'Yes' ELSE 'No' END CanExport,
                    rec.Description [Created By], FORMAT(hdr.Recdate, 'MM/dd/yyyy HH:mm:ss tt') [Date Created], 
                    [mod].Description [Modified By], FORMAT(hdr.Moddate, 'MM/dd/yyyy HH:mm:ss tt') [Date Modified]
                    from 
	                                    (select cmm.CompanyID, cmm.AppID, i.ItemID ,i.ItemName,q.AppName  from FPTI_NW.noahweb_Application_Collection cmm
	                                    inner join FPTI_NW.noahweb_menuDriven i
	                                    ON cmm.AppID = i.ItemParentApplication left join FPTI_NW.noahweb_Application_Info q on cmm.AppID = q.code  where i.ItemType = '1') a

	                                    left join FPTI_NW.NW_CompanyUserItemMappingWeb  cuim
	                                    ON a.ItemID = cuim.Item and cuim.SysUser=@SysUser and a.CompanyID=cuim.Company AND a.AppID = cuim.Module


                                        LEFT JOIN FPTI_NW.NW_CompanyUserItemMappingWeb_HDR hdr ON hdr.Company = @Company AND hdr.[User] = @SysUser
                                        LEFT JOIN FPTI.[User] [rec] ON hdr.Recuser = rec.Code
                                        LEFT JOIN FPTI.[User] [mod] ON hdr.Moduser = [mod].Code


	                                    where a.CompanyID = @Company  ", xusername.Replace("'", "''"), xcompany.Replace("'", "''"))
                                                                  , this.UserDefinedConnectionString);
                    }
                    else {
                        NoSearch = true;
                        //dt_soh = dao.GetTable_AL2Web(xusername, xcompany, frompage, topage, search, nwListbox1);



                        if (search.ToLower() == "yes" || search.ToLower() == "true")
                        {
                            search = "'checked=\"checked\"'";
                        }
                        else if (search.ToLower() == "no" || search.ToLower() == "false")
                            search = "''";
                        else if (nwListbox1 != "Module" && nwListbox1 != "Item" && nwListbox1 != "Description")
                            search = search + " OR " + search + " = ''";

                        if (nwListbox1 == "Module")
                            search = " module LIKE '%" + search + "%' OR '" + search + "' = ''";
                        else if (nwListbox1 == "Item")
                            search = " x.code LIKE '%" + search + "%' OR '" + search + "' = ''";
                        else if (nwListbox1 == "Description")
                            search = " ItemName LIKE '%" + search + "%' OR '" + search + "' = ''";
                        else if (nwListbox1 == "Can Access")
                            search = " CanAccess = " + search;
                        else if (nwListbox1 == "Can Add")
                            search = " CanAdd = " + search;
                        else if (nwListbox1 == "Can Edit")
                            search = " CanEdit = " + search;
                        else if (nwListbox1 == "Can Delete")
                            search = " CanDelete = " + search;
                        else if (nwListbox1 == "Can Save")
                            search = " CanSave = " + search;
                        else if (nwListbox1 == "Can Print")
                            search = " CanPrint = " + search;
                        else if (nwListbox1 == "Can Process")
                            search = " CanProcess = " + search;
                        else if (nwListbox1 == "Can Import")
                            search = " CanImport = " + search;
                        else if (nwListbox1 == "Can Export")
                            search = " CanExport = " + search;

                        dt_soh = SFObjects.LoadDataTable(string.Format(@"Select x.[Module], x.[Code],x.[ItemName] , CASE WHEN x.[CanAccess] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END +''as CanAccess, CASE WHEN x.[CanAdd] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+''as CanAdd, CASE WHEN x.[CanEdit] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+''as CanEdit , CASE WHEN x.[CanDelete] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+'' as CanDelete, CASE WHEN x.[CanSave] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+''as CanSave, CASE WHEN x.[CanPrint] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+''as CanPrint, CASE WHEN x.[CanProcess] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+''as CanProcess, CASE WHEN x.[CanImport] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+''as CanImport, CASE WHEN x.[CanExport] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+''as CanExport
                                                        ,rec.Description [Created By], FORMAT(hdr.Recdate, 'MM/dd/yyyy HH:mm:ss tt') [Date Created], 
                                                        [mod].Description [Modified By], FORMAT(hdr.Moddate, 'MM/dd/yyyy HH:mm:ss tt') [Date Modified]
                                                         from
		                                                    (select ROW_NUMBER()  over (order by (select 0)) as [aagrowNum], b.* from (
				                                                    select Distinct * from FPTI.fn_CompanyUserItemMappingWeb('{1}','{0}')where 

                                                            {2}

		                                                    )  b) x
	                                                        INNER JOIN  FPTI_NW.noahweb_Application_Info a
															ON a.description LIKE x.Module
                                                            left join FPTI_NW.NW_CompanyUserItemMappingWeb  cuim
															ON x.Code = cuim.Item and cuim.SysUser='{0}' and cuim.Company = '{1}' AND a.code = cuim.Module

                                                            LEFT JOIN FPTI_NW.NW_CompanyUserItemMappingWeb_HDR hdr ON hdr.Company = '{1}' AND hdr.[User] = '{0}'
                                                            LEFT JOIN FPTI.[User] [rec] ON hdr.Recuser = rec.Code
                                                            LEFT JOIN FPTI.[User] [mod] ON hdr.Moduser = [mod].Code

		                                                    order by x.aagrowNum ", xusername, xcompany, search, nwListbox1), this.UserDefinedConnectionString);



                        if (dt_soh.Columns.Count <= 0)
                        {
                            dt_soh = SFObjects.LoadDataTable(string.Format(@"Select x.[Module], x.[Code],x.[ItemName] , CASE WHEN x.[CanAccess] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END +''as CanAccess, CASE WHEN x.[CanAdd] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+''as CanAdd, CASE WHEN x.[CanEdit] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+''as CanEdit , CASE WHEN x.[CanDelete] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+'' as CanDelete, CASE WHEN x.[CanSave] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+''as CanSave, CASE WHEN x.[CanPrint] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+''as CanPrint, CASE WHEN x.[CanProcess] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+''as CanProcess, CASE WHEN x.[CanImport] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+''as CanImport, CASE WHEN x.[CanExport] = 'checked=""checked""' THEN 'YES' ELSE 'NO' END+''as CanExport
                                                            ,rec.Description [Created By], FORMAT(hdr.Recdate, 'MM/dd/yyyy HH:mm:ss tt') [Date Created], 
                                                            [mod].Description [Modified By], FORMAT(hdr.Moddate, 'MM/dd/yyyy HH:mm:ss tt') [Date Modified]
                                                            from
		                                                    (select ROW_NUMBER()  over (order by (select 0)) as [aagrowNum], b.* from (
				                                                    select Distinct * from FPTI.fn_CompanyUserItemMappingWeb('{1}','{0}')where 

                                                            {2}

		                                                    )  b) x
                                                            left join FPTI_NW.NW_CompanyUserItemMappingWeb  cuim
															ON x.Code = cuim.Item and cuim.SysUser='{0}' and cuim.Company = '{1}' AND x.Module = cuim.Module

                                                            LEFT JOIN FPTI_NW.NW_CompanyUserItemMappingWeb_HDR hdr ON hdr.Company = '{1}' AND hdr.[User] = '{0}'
                                                            LEFT JOIN FPTI.[User] [rec] ON hdr.Recuser = rec.Code
                                                            LEFT JOIN FPTI.[User] [mod] ON hdr.Moduser = [mod].Code

		                                                    order by x.aagrowNum ", xusername, xcompany, search, nwListbox1), this.UserDefinedConnectionString);

                        }


                    }

                    //foreach (DataRow dr in dt_soh.Rows)
                    //{
                    //    string value = string.Empty;
                    //    if (!NoSearch) {
                    //        value = "checked=\"checked\"";
                    //    } else {
                    //        if (!string.IsNullOrEmpty(dr["CanAccess"].ToString()))
                    //            value = dr["CanAccess"].ToString();
                    //        else
                    //            value = "BLANK";
                    //    }
                    //    dt_soh.Columns[3].ReadOnly = false;
                    //    dt_soh.Columns[4].ReadOnly = false;
                    //    dt_soh.Columns[5].ReadOnly = false;
                    //    dt_soh.Columns[6].ReadOnly = false;
                    //    dt_soh.Columns[7].ReadOnly = false; 
                    //    dt_soh.Columns[8].ReadOnly = false;
                    //    dt_soh.Columns[9].ReadOnly = false;
                    //    dt_soh.Columns[10].ReadOnly = false;
                    //    dt_soh.Columns[11].ReadOnly = false;
                    //    dr["CanAccess"] = dr["CanAccess"].ToString() == value ? "YES" : "NO";
                    //    dr["CanAdd"] = dr["CanAdd"].ToString() == value ? "YES" : "NO";
                    //    dr["CanEdit"] = dr["CanEdit"].ToString() == value ? "YES" : "NO";
                    //    dr["CanDelete"] = dr["CanDelete"].ToString() == value ? "YES" : "NO";
                    //    dr["CanSave"] = dr["CanSave"].ToString() == value ? "YES" : "NO";
                    //    dr["CanPrint"] = dr["CanPrint"].ToString() == value ? "YES" : "NO";
                    //    dr["CanProcess"] = dr["CanProcess"].ToString() == value ? "YES" : "NO";
                    //    dr["CanImport"] = dr["CanImport"].ToString() == value ? "YES" : "NO";
                    //    dr["CanExport"] = dr["CanExport"].ToString() == value ? "YES" : "NO";
                    //    dr.AcceptChanges();
                    //}
                    //## ###
                    dt_soh.Columns[0].ColumnName = "Module";
                    dt_soh.Columns[1].ColumnName = "Code";
                    dt_soh.Columns[2].ColumnName = "Item Name";
                    dt_soh.Columns[3].ColumnName = "Can Access";
                    dt_soh.Columns[4].ColumnName = "Can Add";
                    dt_soh.Columns[5].ColumnName = "Can Edit";
                    dt_soh.Columns[6].ColumnName = "Can Delete";
                    dt_soh.Columns[7].ColumnName = "Can Save";
                    dt_soh.Columns[8].ColumnName = "Can Print";
                    dt_soh.Columns[9].ColumnName = "Can Process";
                    dt_soh.Columns[10].ColumnName = "Can Import";
                    dt_soh.Columns[11].ColumnName = "Can Export";
                    //## END ##
                    string LISTINGFILENAME = "User Access Listing";
                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, 6, dt_soh,
                                                           LISTINGFILENAME, based.SecurityAccess.ConnectionString, xcompanyDesc,
                                                           based.SecurityAccess.RecUserName, LISTINGFILENAME);

                    frmlist.m_Spread.SetText(1, 5,"Access of : " +  WebApp.nwobjectText("idvallugUsername") + " | " + WebApp.nwobjectText("descvallugUsername"));
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

                    break;
                case eRecordOperation.Print: 
                    break;
                case eRecordOperation.Closing: 
                    break;
                case eRecordOperation.Search: 
                    break;
            }
            //return result;
        }

        public string get_Initialize()
        {
            string strFinal = "";

            SetBindings(); Main_Load();
            CreateGrid1_AL("", "", "", "", "", "", "", "");
            execute(ref strFinal);

            //strFinal += get_Method("getcboPaymentType", "", "", "");
            //strFinal += js.makeValueText("#dtpDocDate", DateTime.Now.ToShortDateString());
            return js.makeJSPostScript(strFinal);
        }
        private void Main_Load()
        {
            dao.UpdateVersion();
            if (dao.CheckHasAccess(based.SecurityAccess.RecUser))
            {

                js.ADD("nwaccess = '1'");

            }
            js.ADD("nwuser='" + based.SecurityAccess.RecUser + "'");
            js.ADD("");

        }
        public string act_Method(string strMethod, string strParameter, string strValue)
        {
            string page;
            string strFinal = "";
            string strSQL = "";
            int method;
            WebApp = new WebApplib(strParameter, strValue);

            string SortColumn = WebApp.nwobjectText("SortColumn");
            string SortOrder = WebApp.nwobjectText("SortOrder");

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
                    CreateGrid1_AL(WebApp.nwobjectText("lugUsername"), WebApp.nwobjectText("lugCompany"), "1", "30", WebApp.nwobjectText("version"), "", SortColumn, SortOrder);
                    //js.ADD(CreateGrid2_AL());
                    break;

                case "actSaveData":
                    SaveData();
                    break;

                case "actLoadData":
                    CreateGrid1_AL(WebApp.nwobjectText("lugUsername"), WebApp.nwobjectText("lugCompany"), "1", "30", WebApp.nwobjectText("version"), "", SortColumn, SortOrder);

                    LoadFooter();

                    js.ADD("nwLoading_End('actLoadData')");
                    break;

                case "actClearGrid":
                    CreateGrid1_AL("", "", "1", "30","","", "", "");

                    js.ADD("$('#nwtxt_RecUser').text('')");
                    js.ADD("$('#nwtxt_RecDate').text('')");
                    js.ADD("$('#nwtxt_ModUser').text('')");
                    js.ADD("$('#nwtxt_ModDate').text('')");

                    js.ADD("nwLoading_End('actClearGrid')");

                    break;
                    
                case "actLoadCopyFrom":
                    CreateGrid1_AL(WebApp.nwobjectText("nwcusercde"), WebApp.nwobjectText("lugCompany"), "1", "30", WebApp.nwobjectText("version"), "", SortColumn, SortOrder);

                    SaveDataCopyFrom();

                    LoadFooter();
                    js.LoadingEnd("actLoadCopyFrom"); ;
                    //js.EventClick("#nwSaveUseAcs");
                    
                    break;

                case "actImportCompany":
                    ImportCompany();
                    js.LoadingEnd("actImportCompany");
                    break;

                case "actCodeRequired":
                    //Prompt.Information("Company Required and Username Required", based.Title);
                    break;

                case "actPagerClick":
                    page = "1";
                    CreateGrid1_AL(WebApp.nwobjectText("lugUsername"), WebApp.nwobjectText("lugCompany"), WebApp.nwobjectText("based"), WebApp.nwobjectText("finalrange"), WebApp.nwobjectText("version"), page, SortColumn, SortOrder);
                    break;
                case "actSaveData2":
                    SaveData2();

                    LoadFooter();

                    break;
                case "actDetails":
                    customgrid();
                    break;
                case "actFilter":
                    CreateGrid1_AL(WebApp.nwobjectText("lugUsername"), WebApp.nwobjectText("lugCompany"), "1", "3000", WebApp.nwobjectText("version"), "", SortColumn, SortOrder);

                    LoadFooter();

                    js.ADD("nwLoading_End('actLoadData')");
                    break;

                case "actGridInit":

                    CreateGrid1_AL("", "", "", "", "", "", "", "");

                    js.ADD("$('#nwtxt_RecUser').text('')");
                    js.ADD("$('#nwtxt_RecDate').text('')");
                    js.ADD("$('#nwtxt_ModUser').text('')");
                    js.ADD("$('#nwtxt_ModDate').text('')");

                    js.ADD("nwLoading_End('actGridInit')");

                    break;

                case "actCheckAll":

                    try {
                        nwGrid m_spread = (nwGrid)HttpContext.Current.Session["nwaagGridSSXsample" + WebApp.nwobjectText("varInstancegr")];
                        DataTable dt = m_spread.GetDataSource();

                        for (int x = 0; x < dt.Rows.Count; x++ )
                        {
                            dt.Rows[x][WebApp.nwobjectInt("TableData")] = based.SecurityAccess.RecUser;

                        }

                       // m_spread.dataSource(dt.Copy());


                        try
                        {
                            if (dt.Columns.Count >= 1)
                            {
                                m_spread.dataSource(dt.Copy());
                                HttpContext.Current.Session["nwaagGridSS-Data" + WebApp.nwobjectText("varInstancegr")] = dt.Copy();
                            }
                        }
                        catch { }

                        try
                        {
                            HttpContext.Current.Session["nwaagGridSSXsample" + WebApp.nwobjectText("varInstancegr")] = null;
                            HttpContext.Current.Session["nwaagGridSSXsample" + WebApp.nwobjectText("varInstancegr")] = m_spread;
                        }
                        catch { }
                        try
                        {
                            HttpContext.Current.Session["nwaagGridSSX" + WebApp.nwobjectText("varInstancegr")] = null;
                            HttpContext.Current.Session["nwaagGridSSX" + WebApp.nwobjectText("varInstancegr")] = m_spread;
                        }
                        catch { }

                    }
                    catch(Exception e){
                        
                    }
                    break;

                case "actHistory":

                    DataTable dtHistory = new DataTable();

                    dtHistory = SFObjects.LoadDataTable(string.Format(@"
                                SELECT x.Company,
                                       '<font color=""red"">' + x.SysUser + '</font>' Username,
                                       x.Module,
                                       x.Item [Menu Item],
                                       IIF(x.CanAccess = 1, 'Yes', 'No') [Can Access],
                                       IIF(x.CanAdd = 1, 'Yes', 'No') [Can Add],
                                       IIF(x.CanEdit = 1, 'Yes', 'No') [Can Edit],
                                       IIF(x.CanDelete = 1, 'Yes', 'No') [Can Delete],
                                       IIF(x.CanSave = 1, 'Yes', 'No') [Can Save],
                                       IIF(x.CanPrint = 1, 'Yes', 'No') [Can Print],
                                       IIF(x.CanProcess = 1, 'Yes', 'No') [Can Process],
                                       IIF(x.CanImport = 1, 'Yes', 'No') [Can Import],
                                       IIF(x.CanExport = 1, 'Yes', 'No') [Can Export],
                                       x.Recuser [Created By],
                                       x.Recdate [Date Created],
                                       x.Moduser [Modified By],
                                       x.Moddate [Date Modified],
                                       x.Status,
                                       CASE WHEN x.Rank > 2 THEN NULL ELSE x.Rank END [Tag]
                                FROM
                                (
                                    SELECT *,
                                           ROW_NUMBER() OVER (PARTITION BY Item
                                                              ORDER BY Item DESC,
                                                                       ISNULL(Moddate, Recdate) DESC
                                                             ) [Rank]
                                    FROM FPTI_NW.NW_CompanyUserItemMappingWeb_Hist
                                ) x
                                WHERE x.Company = '{0}' AND x.SysUser = '{1}'
                                ORDER BY Item ASC,
                                         ISNULL(Moddate, Recdate) DESC ", WebApp.nwobjectText("lugCompany"), WebApp.nwobjectText("lugUsername")), this.UserDefinedConnectionString);

                    string LISTINGFILENAME = "User Access";
                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, 6, dtHistory,
                                                           LISTINGFILENAME, based.SecurityAccess.ConnectionString, WebApp.nwobjectText("lugCompanyDesc"),
                                                           based.SecurityAccess.RecUserName, LISTINGFILENAME);

                    frmlist.m_Spread.SetText(1, 5, "Access of : " + WebApp.nwobjectText("idvallugUsername") + " | " + WebApp.nwobjectText("descvallugUsername"));
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

                    break;

            }

            js.ADD("nwLoading_End('actMethoLoading');");

            return js.makeJSPostScript(execute());
        }
        public string getToolBoxData(string tableName, string getMethod)
        {
            string strFinal = ""; string sql = "";
            switch (getMethod)
            {
                case "toolbox":
                    sql = string.Format(@"Select * from FPTI.[User]");
                    strFinal = getToolBoxDataRet(tableName, sql, based.SecurityAccess.ConnectionString, "1", "50");
                    break;

            }

            return strFinal;
        }
        

        //*************COMMON******************
        private void SetBindings()
        {
            SFObject.SetControlBinding("#lugCompany", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Company");
            SFObject.SetControlBinding("#lugUsername", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Username");
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

        private void BindCollection()
        {
            //DisableDescription(isUsed());

        }
        private bool AreValidEntries()
        {
            string errorResult = String.Empty;

            if (WebApp.nwobjectText("idvallugCompany").Equals(string.Empty))
                errorResult += "Cannot be saved. Please provide a valid Company.\n";
            else
            {
                //if (WebApp.nwobjectText("lugCompany").Contains(" "))
                //    errorResult += "Cannot Save. Company should not contain spaces.\n";
            }
            if (WebApp.nwobjectText("idvallugUsername").Trim().Equals(string.Empty))
                errorResult += "Cannot be saved. Please provide a valid User.\n";
            else
            {
                if (WebApp.nwobjectText("idvallugUsername").Contains(" "))
                    errorResult += "Cannot be saved. Usercode should not contain spaces.\n";
            }

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

                RecordOperationResult = dao.SaveData(dtData, isNewRow, based.SecurityAccess.RecUser);

                if (RecordOperationResult.IndexOf("successfully") >= 0)
                    RecordOperationResult = "Saved successfully";

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

                if (dtData.Rows.Count > 0)
                {

                    RecordOperationResult = dao.SaveData2(dtData, isNewRow, based.SecurityAccess.RecUser, based.SecurityAccess.RecUser, WebApp.nwobjectText("lugUsername"));
                    
                    if (RecordOperationResult.IndexOf("successfully") >= 0)
                        RecordOperationResult = "Saved successfully";

                    Prompt.Information(RecordOperationResult, based.Title);
                }
                else {

                    Prompt.Error("Cannot Save. At least 1 line detail is required.", based.Title);

                }

            }
            js.LoadingEnd("actSaveData2");
        }


        void SaveDataCopyFrom()
        {

            RecordOperationResult = string.Empty;

            if (AreValidEntries() == true)
            {
                    
                RecordOperationResult = dao.NewSaveData(WebApp.nwobjectText("Company"), WebApp.nwobjectText("FromUser"), WebApp.nwobjectText("ToUser"), based.SecurityAccess.RecUser);
                if (RecordOperationResult.IndexOf("successfully") >= 0)
                    RecordOperationResult = "Saved successfully";

                Prompt.Information(RecordOperationResult, based.Title);

            }
            js.LoadingEnd("actSaveData2");
        }

        public void LoadFooter()
        {

            DataTable dt = dao.LoadHDR(WebApp.nwobjectText("lugCompany"), WebApp.nwobjectText("lugUsername"));

            if (dt.Rows.Count > 0)
            {
                js.ADD("$('#nwtxt_RecUser').text('" + dt.Rows[0]["Recuser"].ToString() + "')");
                js.ADD("$('#nwtxt_RecDate').text('" + dt.Rows[0]["Recdate"].ToString() + "')");
                js.ADD("$('#nwtxt_ModUser').text('" + dt.Rows[0]["Moduser"].ToString() + "')");
                js.ADD("$('#nwtxt_ModDate').text('" + dt.Rows[0]["Moddate"].ToString() + "')");

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
            DataTable dt = WebApp.nwGridDataWithID("grid_arm");  //WebApp.nwGridData(WebApp.nwobjectText("grid_arm"));

            for (int row = 0; row < dt.Rows.Count; row++)
            {
                
                if (dt.Rows[row][1].ToString().Trim() != "")
                {
                    drDataToAdd = dtData.NewRow();
                    drDataToAdd["Company"] = WebApp.nwobjectText("idvallugCompany");

                    drDataToAdd["SysUser"] = WebApp.nwobjectText("idvallugUsername");
                   // if (version == "0")
                   // {
                        //string code = SFObject.returnText(string.Format(" Select Code from FPTI_NW.noahweb_Application_Info where AppName =  '{0}' ", dt.Rows[row][0].ToString()), this.UserDefinedConnectionString);
                        //drDataToAdd["Module"] = code;
                   // }
                   // else { 
                       // drDataToAdd["Module"] = dt.Rows[row][0].ToString(); 
                    //}

                    drDataToAdd["Item"] = dt.Rows[row][1].ToString();
                    drDataToAdd["CanAccess"] = dt.Rows[row][3].ToString() == "true" || dt.Rows[row][3].ToString() == "1" ? 1 : 0;
                    drDataToAdd["CanAdd"] = dt.Rows[row][4].ToString() == "true" || dt.Rows[row][4].ToString() == "1" ? 1 : 0;
                    drDataToAdd["CanEdit"] = dt.Rows[row][5].ToString() == "true" || dt.Rows[row][5].ToString() == "1" ? 1 : 0;
                    drDataToAdd["CanDelete"] = dt.Rows[row][6].ToString() == "true" || dt.Rows[row][6].ToString() == "1" ? 1 : 0;
                    drDataToAdd["CanSave"] = dt.Rows[row][7].ToString() == "true" || dt.Rows[row][7].ToString() == "1" ? 1 : 0;
                    drDataToAdd["CanPrint"] = dt.Rows[row][8].ToString() == "true" || dt.Rows[row][8].ToString() == "1" ? 1 : 0;
                    drDataToAdd["CanProcess"] = dt.Rows[row][9].ToString() == "true" || dt.Rows[row][9].ToString() == "1" ? 1 : 0;
                    drDataToAdd["CanImport"] = dt.Rows[row][10].ToString() == "true" || dt.Rows[row][10].ToString() == "1" ? 1 : 0;
                    drDataToAdd["CanExport"] = dt.Rows[row][11].ToString() == "true" || dt.Rows[row][11].ToString() == "1" ? 1 : 0;

                    drDataToAdd["CanAccessRec"] = dt.Rows[row][12].ToString();
                    drDataToAdd["CanAddRec"] = dt.Rows[row][13].ToString();
                    drDataToAdd["CanEditRec"] = dt.Rows[row][14].ToString();
                    drDataToAdd["CanDeleteRec"] = dt.Rows[row][15].ToString();
                    drDataToAdd["CanSaveRec"] = dt.Rows[row][16].ToString();
                    drDataToAdd["CanPrintRec"] = dt.Rows[row][17].ToString();
                    drDataToAdd["CanProcessRec"] = dt.Rows[row][18].ToString();
                    drDataToAdd["CanImportRec"] = dt.Rows[row][19].ToString();
                    drDataToAdd["CanExportRec"] = dt.Rows[row][20].ToString();
                    drDataToAdd["Module"] = dt.Rows[row][21].ToString();
                    
                    #region don't change
                    dtData.Rows.Add(drDataToAdd);
                    dtData.AcceptChanges();
                    #endregion
                    rowNo++;
                }
            }

            return dtData;
        }
        public void CreateGrid1_AL(string xusername, string xcompany, string frompage, string topage, string version, string page, string SortColumn, string SortOrder)
        {
            string search = WebApp.nwobjectText("nwAPSearch");
            string nwListbox1 = WebApp.nwobjectText("nwListbox1");
            int tag = 0;
            //if (xusername != "" && xcompany  != "" && !dao.IsValidUser(xusername, xcompany))
            //{
            //    Prompt.Information("Invaild User. Please Select Other.");
            //    xusername = ""; xcompany = "";
            //    js.lookupCodeText("lugUsername","");
            //    js.lookupDescText("lugUsername", "");
            //    js.ADD("$('#lugUsername .LookUp').click();");
            //}

         //   if(version == "1"){
              
         //   string strF = "";
         //   int row = 0;

         //   nwGrid soh = new nwGrid("grid1");
         //   DataTable dt_soh = new DataTable();
         //   DataTable dt = new DataTable();
         //   string sql = "";
         //   int totrecords;
            
         //   //if (search == "")
         //   //{
         //   //totrecords = int.Parse(dao.GetTotRecords(xusername, xcompany));
         //   //dt_soh = dao.GetTable_AL(xusername, xcompany, frompage, topage);
         //   //}
         //   //else
         //   //{
         //   //totrecords = int.Parse(dao.GetTotRecordsfilter(xusername, xcompany, search, nwListbox1));
         //   //dt_soh = dao.GetTable_AL2(xusername, xcompany, frompage, topage, search, nwListbox1);
         //   //}

         //   dt_soh = dao.GetTable_AL2(xusername, xcompany, frompage, topage, search, nwListbox1);
         //   totrecords=dt_soh.Rows.Count;
          

         //   if (dt_soh.Columns.Count < 1)
         //   {
         //       dt_soh.Columns.Add("Module", typeof(string));
         //       dt_soh.Columns.Add("Item", typeof(string));
         //       dt_soh.Columns.Add("Description", typeof(string));
         //       dt_soh.Columns.Add("DATE", typeof(string));
         //   }
         //   else
         //   {
         //       dt_soh.Columns[0].AllowDBNull = true;
         //       dt_soh.Columns[1].AllowDBNull = true;
         //       dt_soh.Columns[3].AllowDBNull = true;
         //       dt_soh.Columns[2].AllowDBNull = true;
         //       dt_soh.Columns[4].AllowDBNull = true;
         //       dt_soh.Columns[5].AllowDBNull = true;
         //       dt_soh.Columns[6].AllowDBNull = true;
         //       dt_soh.Columns[7].AllowDBNull = true;
         //       dt_soh.Columns[8].AllowDBNull = true;
         //       dt_soh.Columns[9].AllowDBNull = true;
         //       dt_soh.Columns[10].AllowDBNull = true;
         //       dt_soh.Columns[11].AllowDBNull = true;
         //   }
         //   string ver = "";
         //   string code = "";
          
         //   dt_soh.Columns.Add(new DataColumn("Version", typeof(string)));
         //   //foreach (DataRow row2 in dt_soh.Rows)
         //   //{
         //   //    string item = row2["Code"].ToString();
         //   //    string modul = row2["Module"].ToString();
         //   //    dt = SFObject.LoadDataTable(string.Format("Select a.code+'' as WebCode,a.description+''as WebDescription,b.Code,b.Description,a.exeVersion,b.Module from FPTI_NW.noahweb_menuItems_Info a left join fpti.Item  b on a.exeVersionModule = b.Code where b.code = '{0}' and b.Module ='{1}'", item,modul), this.UserDefinedConnectionString);
         //   //    foreach (DataRow dr2 in dt.Rows)
         //   //    {
         //   //        code = dr2["Code"].ToString();
         //   //    }
         //   //    if (code == "")
         //   //    {

         //   //    }
         //   //    else
         //   //    {
         //   //        ver = "Version";
         //   //        row2["Version"] = ver;
         //   //    }
         //   //    code = "";
         //   //}
         //   //CreteAddCheckALLRow(dt_soh);
         //   soh.dataSource(dt_soh);

         //   soh.minRow(10);
         //   soh.RowHeight(22);
         //   soh.TableHeight(300);
         //   soh.HeaderTextColor("black");
         //   soh.backgroundColor("#FFFFFF");
            
         //   soh.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
         //   soh.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");



         //   soh.nwobject(0).Width(70);
         //   soh.nwobject(1).Width(200);
         //   soh.nwobject(2).Width(300);
         //   soh.nwobject(3).Width(70);
         //   soh.nwobject(4).Width(70);
         //   soh.nwobject(5).Width(70);
         //   soh.nwobject(6).Width(70);
         //   soh.nwobject(7).Width(70);
         //   soh.nwobject(8).Width(70);
         //   soh.nwobject(9).Width(70);
         //   soh.nwobject(10).Width(70);
         //   soh.nwobject(11).Width(70);
         //   soh.nwobject(12).Width(0);
         //   soh.nwobject(13).Width(0);
         //   soh.nwobject(14).Width(0);
         //   soh.nwobject(15).Width(0);
         //   soh.nwobject(16).Width(0);
         //   soh.nwobject(17).Width(0);
         //   soh.nwobject(18).Width(0);
         //   soh.nwobject(19).Width(0);
         //   soh.nwobject(20).Width(0);
         //   soh.nwobject(21).Width(0);

         //   soh.nwobject(0).Template("{0}");
         //   soh.nwobject(1).Template("<div class=\"{12}\">{1}</div>");
         //   soh.nwobject(2).Template("{2}");




         //   soh.nwobject(3).CheckBox(true);
         //   soh.nwobject(4).CheckBox(true);
         //   soh.nwobject(5).CheckBox(true);
         //   soh.nwobject(6).CheckBox(true);
         //   soh.nwobject(7).CheckBox(true);
         //   soh.nwobject(8).CheckBox(true);
         //   soh.nwobject(9).CheckBox(true);
         //   soh.nwobject(10).CheckBox(true);
         //   soh.nwobject(11).CheckBox(true);

         //   soh.PagerPerPage(50);
         //   soh.PagerDataEditable(true);

         //       // soh.PagerRowHeader(

         //       using (MemoryStream buffer = new MemoryStream())

         //       {

         //           SurrogateSelector ss = new SurrogateSelector();
         //           ss.AddSurrogate(typeof(nwGrid), new StreamingContext(StreamingContextStates.All), new nwGridSerializer());
         //           BinaryFormatter formatter = new BinaryFormatter();

         //           formatter.SurrogateSelector = ss;
         //           formatter.Serialize(buffer, soh);

         //           buffer.Position = 0;

         //           Byte[] data = buffer.GetBuffer();

         //           // Session["Context"] = data;
         //           HttpContext.Current.Session["nwaagGridSSXCarlo" + soh.InstanceID] = data;
         //           //

         //       }


         //       js.makeHTML("#grid_arm", soh.createTable());

         //     //  HttpContext.Current.Session["abc"] = soh;

                
                    

         //   //js.ADD("CreateCheckBox()");
         //       if (page == "1") { } else {
         //   int totpage = totrecords / 30;
         //   if (totrecords % 30 > 0)
         //   {
         //       totpage++;
         //   }

         //   string pagerdiv = "";
         //   string strTemp = "nwSelected";
   

         //  //js.makeHTML("#nwPager", pagerdiv);
         //  // return strF;
         //    }

         //}else{
             string strF;

             nwGrid soh = new nwGrid("grid1");
             DataTable dt_soh = new DataTable();
             DataTable dt = new DataTable();
             if (search == "")
             {
                //if(page == "1"){}else{
                // strF = string.Empty;
                // string tot = dao.GetAllData(xcompany, xusername);
                // int totrecords = Int32.Parse(tot.ToString());
                // if (totrecords <= 30) { }
                // else
                // {
                //     int totpage = totrecords / 30;
                //     if (totrecords % 30 > 0)
                //     {
                //         totpage++;
                //     }
                //     string pagerdiv = string.Empty;
                //     string strTemp = "nwSelected";
                //     for (int i = 1; i <= totpage; i++)
                //     {
                //         pagerdiv += "<button class=\"PagerNum " + strTemp + "\" onclick=\"func_LoadPager(" + i + ")\">" + i + "</button>";
                //         strTemp = "";
                //     }

                //     strF += js.makeHTML("#nwPager", pagerdiv);
                // }}
                 dt_soh = dao.GetDataUser(xcompany, xusername, SortColumn, SortOrder);

                 tag = 1;

              }
              else
              {
                  if (page == "1") { }
                  else
                  { 
                      //strF = string.Empty;
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

                      dt_soh = dao.GetTable_AL2Web(xusername, xcompany, frompage, topage, search, nwListbox1, SortColumn, SortOrder);
                  }
              }

                soh.CreateExcelGrid(5, dt_soh.Columns.Count);
                string ver = "";
              string code = "";
              dt_soh.Columns.Add(new DataColumn("Version", typeof(string)));
              //foreach (DataRow row2 in dt_soh.Rows)
              //{
              //    string item = row2["Code"].ToString();
              //    dt = SFObject.LoadDataTable(string.Format("Select a.code+'' as WebCode,a.description+''as WebDescription,b.Code,b.Description,a.exeVersion,b.Module   from FPTI_NW.noahweb_menuItems_Info a left join fpti.Item  b on a.exeVersionModule = b.Code where a.code = '{0}'", item), this.UserDefinedConnectionString);
                  
              //  foreach (DataRow dr2 in dt.Rows){
              //    code =  dr2["Code"].ToString();
              //  }
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

             if (dt_soh.Columns.Count < 1)
             {
                 dt_soh.Columns.Add("Column1", typeof(string));
                 dt_soh.Columns.Add("Column2", typeof(string));
                 dt_soh.Columns.Add("Column3", typeof(string));
                 dt_soh.Columns.Add("Column4", typeof(string));
             }
             else
             {

                 dt_soh.Columns[SPR_ItemName - 1].ColumnName = "Description";
                 dt_soh.Columns[SPR_Code - 1].ColumnName = "Item";
                 dt_soh.Columns[SPR_Module - 1].AllowDBNull = true;
                 dt_soh.Columns[SPR_Code - 1].AllowDBNull = true;
                 dt_soh.Columns[SPR_ItemName - 1].AllowDBNull = true;
             }
             //CreteAddCheckALLRow(dt_soh);
             soh.dataSource(dt_soh);
             soh.nwobject(SPR_Module - 1).Width(150);
             soh.nwobject(SPR_Code - 1).Width(150);
             soh.nwobject(SPR_ItemName - 1).Width(350);
             soh.nwobject(SPR_CanAccess - 1).Width(70);
             soh.nwobject(SPR_CanAdd - 1).Width(60);
             soh.nwobject(SPR_CanEdit - 1).Width(60);
             soh.nwobject(SPR_CanDelete - 1).Width(70);
             soh.nwobject(SPR_CanSave - 1).Width(60);
             soh.nwobject(SPR_CanPrint - 1).Width(60);
             soh.nwobject(SPR_CanProcess - 1).Width(70);
             soh.nwobject(SPR_CanImport - 1).Width(70);
             soh.nwobject(SPR_CanExport - 1).Width(70);
             soh.nwobject(SPR_CanAccessRec - 1).Width(0);
             soh.nwobject(SPR_CanAddRec - 1).Width(0);
             soh.nwobject(SPR_CanEditRec - 1).Width(0);
             soh.nwobject(SPR_CanDeleteRec - 1).Width(0);
             soh.nwobject(SPR_CanSaveRec - 1).Width(0);
             soh.nwobject(SPR_CanPrintRec - 1).Width(0);
             soh.nwobject(SPR_CanProcessRec - 1).Width(0);
             soh.nwobject(SPR_CanImportRec - 1).Width(0);
             soh.nwobject(SPR_CanExportRec - 1).Width(0);
             soh.nwobject(SPR_ModuleCode - 1).Width(0);
             soh.nwobject(23 - 1).Width(0); //version column


             soh.nwobject(SPR_Module - 1).Template("{0}");
             soh.nwobject(SPR_Code - 1).Template("<div class=\"{12}\">{1}</div>");
             soh.nwobject(SPR_ItemName - 1).Template("{2}");
             soh.nwobject(SPR_CanAccess - 1).CheckBox(true, "chkBox");
             soh.nwobject(SPR_CanAdd - 1).CheckBox(true, "chkBox");
             soh.nwobject(SPR_CanEdit - 1).CheckBox(true, "chkBox");
             soh.nwobject(SPR_CanDelete - 1).CheckBox(true, "chkBox");
             soh.nwobject(SPR_CanSave - 1).CheckBox(true, "chkBox");
             soh.nwobject(SPR_CanPrint - 1).CheckBox(true, "chkBox");
             soh.nwobject(SPR_CanProcess - 1).CheckBox(true, "chkBox");
             soh.nwobject(SPR_CanImport - 1).CheckBox(true, "chkBox");
             soh.nwobject(SPR_CanExport - 1).CheckBox(true, "chkBox");

             soh.minRow(10);

             soh.RowHeight(22);
             soh.TableHeight(350);
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

             //soh.Rows(0, 0).DataTypeRange(5, 2, nwGridDataType.DateTime);
             //soh.Rows(6, 0).DataTypeRange(10, 2, nwGridDataType.Money);



                //using (MemoryStream buffer = new MemoryStream())

                //{

                //    SurrogateSelector ss = new SurrogateSelector();
                //    ss.AddSurrogate(typeof(nwGrid), new StreamingContext(StreamingContextStates.All), new nwGridSerializer());
                //    BinaryFormatter formatter = new BinaryFormatter();

                //    formatter.SurrogateSelector = ss;
                //    formatter.Serialize(buffer, soh);

                //    buffer.Position = 0;

                //    Byte[] data = buffer.GetBuffer();

                //    // Session["Context"] = data;
                //    HttpContext.Current.Session["nwaagGridSSXCarlo" + soh.InstanceID] = data;
                //    //

                //}

                //  soh.nwobject(0).Template("<button class=\"nwGrid_Delete\"></button>");
                //soh.nwobject(1).Template("<button class=\"lug_grid1\">{1}</button>");
                js.makeHTML("#grid_arm", soh.createTable());

             js.ADD("nwGrid_TableAdjust(\"" + "grid1" + "\")");
             js.ADD("nwGrid_TableFreeze(\"" + "grid1" + "\",0,0)");
             js.ADD("nwGrid_makeResize(\"" + "grid1" + "\")");
                js.ADD("$('.nwCheckBoxTot.chkBox').after('<br>');");
             if (dt_soh.Rows.Count >= 1)
             {
                 nwToolBox.bindingNavigatorExportItem.Enable = true;
             }
             else {
                 nwToolBox.bindingNavigatorExportItem.Enable = false;
             }
             //js.ADD("CreateCheckBox()");
            //}
        }

        private void ImportCompany()
        {
            RecordOperationResult = dao.ImportCompany(WebApp.nwobjectText("ToCompany"), WebApp.nwobjectText("FromCompany"), WebApp.nwobjectText("UserComp"),based.SecurityAccess.RecUser);
            Prompt.Information(RecordOperationResult, based.Title);

            if (RecordOperationResult.Contains("successfully")) {
                js.ADD("ClearFields();");

                CreateGrid1_AL(WebApp.nwobjectText("UserComp"), WebApp.nwobjectText("ToCompany"), "1", "30", WebApp.nwobjectText("version"), "", "", "");

            }

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

        public void CreteAddCheckALLRow(DataTable dt) {
            //if (dt.Rows.Count >= 1) { 
            //DataRow dr; 
            //dr = dt.NewRow();
            //dr["Module"] = "All";
            //dr["Item"] = "All";
            //dr["Description"] = "All";
            //dt.Rows.InsertAt(dr, 0);
            //dt.AcceptChanges();
            //}  
        }

        public void ReMoveCheckAllRow(DataTable dt) {
            DataRow dr;
            //dt.Rows.InsertAt(dr, 0); 
        }

    }
}
