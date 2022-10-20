using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;


namespace DataAccessLayers
{
    public class SAUserAccessReportDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        private string _ConnectionString;
        private string _ConnectionString2;
        public string CurrentSelectedItem;
        public readonly int listingStartRow = 6;
        public string focusRecordPK = "";

        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code",                                       //--column for searching
                                inquireQry = "Select Code, Description from [FG].[UOMMaster]", //--query of inquire button
                                listingName = "FG UOM Listing",                              //--form name of listings
                                listingQry = "select Code, Description, Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] from [FG].[UOMMaster]"; //--query of export and print
                                                                                                                                                                                                         //--default start row
        //public string GETCOMPANY = "SELECT Description FROM fpti.Company where code = '{0}'";
        public string GETCOMPANY = "select CompanyName from SG.BIRCASConfig";
        #region STANDARD

        public string MenuItemCode = "NWADMIN_USERACCESSREPORT";
        public string MenuItemVersion = "9.0.0.1";// This is default parameter for version
        public string UpdateVersion(string _MenuItemCode, string _MenuItemVersion)
        {
            if (_MenuItemCode.Trim() != "") MenuItemCode = _MenuItemCode;
            if (_MenuItemVersion.Trim() != "") MenuItemVersion = _MenuItemVersion;
            return UpdateVersion();
        }
        public string UpdateVersion()
        {
            #region donot delete Version Updating
            string StrMessage = SFObjects.returnText(
                string.Format(@"
                              declare @MenuCode as nvarchar(max);
                              declare @Version as nvarchar(max);

                              set @MenuCode= '{0}';
                              set @Version = '{1}';

                              Update [FPTI_NW].[noahweb_menuItems_Info]
                              set version=@Version
                              where [Code]=@MenuCode;
                                ", MenuItemCode, MenuItemVersion)
                , _ConnectionString);
            return StrMessage;
            #endregion
        }

        #endregion
        
        
        public SAUserAccessReportDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }

        public string ConnectionString { get { return _ConnectionString; } }

        public DataTable GetSchema()
        {
            return SFObjects.LoadDataTable("select * from [FPTI].[CompanyUserItemMapping] where 1 != 1", _ConnectionString);
        }

        public DataTable GetTable_AL(string xSysuser, string xCompany, string frompage, string topage)
        { 
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyUserItemMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@SysUser", xSysuser);
            cmd.Parameters.AddWithValue("@Company", xCompany);
            cmd.Parameters.AddWithValue("@frompage", frompage);
            cmd.Parameters.AddWithValue("@topage", topage);
            cmd.Parameters.AddWithValue("@QueryType", 9);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }
        public DataTable GetTable_AL2(string xSysuser, string xCompany, string frompage, string topage,string filter, string filtertype)
        {

            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyUserItemMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@SysUser", xSysuser);
            cmd.Parameters.AddWithValue("@Company", xCompany);
            cmd.Parameters.AddWithValue("@frompage", frompage);
            cmd.Parameters.AddWithValue("@topage", topage);
            cmd.Parameters.AddWithValue("@Filter", filter);
            cmd.Parameters.AddWithValue("@FilterType", filtertype);
            cmd.Parameters.AddWithValue("@QueryType", 8);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        public DataTable GetTable_AL2Web(string xSysuser, string xCompany, string frompage, string topage, string filter, string filtertype)
        {

            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nsp_CompanyUserItemMappingWeb]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@SysUser", xSysuser);
            cmd.Parameters.AddWithValue("@Company", xCompany);
            cmd.Parameters.AddWithValue("@frompage", frompage);
            cmd.Parameters.AddWithValue("@topage", topage);
            cmd.Parameters.AddWithValue("@Filter", filter);
            cmd.Parameters.AddWithValue("@FilterType", filtertype);
            cmd.Parameters.AddWithValue("@QueryType", 11);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        public string GetTotRecords(string xSysuser, string xCompany)
        {
            return SFObjects.returnText(string.Format(@" SELECT  count(*) from  FPTI.CompanyUserItemMapping where CanAccess = 1 and SysUser = '{0}' and company = '{1}'",xSysuser,xCompany), _ConnectionString);
        }
        public string GetTotRecordsfilter(string xSysuser, string xCompany, string filter, string nwListbox1)
        {
            string xquery = string.Format(@"SELECT Count(*) from (select Distinct * from [FPTI].[fn_CompanyUserItemMapping]('{0}','{1}')where (module like '%{2}%' and 'Module' = '{3}')or 
            (Code like '%{2}%' and 'Item' = '{3}') or (Description like '%{2}%' and 'Description' = '{3}') or (CanAccess like '%{2}%' and 'Can Access' = '{3}') 
            or (CanAdd like '%{2}%' and 'Can Add'='{3}') or (CanEdit  like  '%{2}%' and 'Can Edit' = '{3}') or (CanDelete like '%{2}%' and 'Can Delete' = '{3}')
            or (CanExport  like '%{2}%' and 'Can Export' = '{3}') or (CanImport like '%{2}%' and 'Can Import' = '{3}') or (CanPrint like '%{2}%' and 'Can Print' = '{3}')
            or  (CanProcess  like '%{2}%' and 'Can Process' = '{3}') or (CanSave  like '%{2}%' and 'Can Process' = '{3}') 
            ) a", xCompany, xSysuser, filter, nwListbox1);
            return (SFObjects.returnText(xquery, _ConnectionString));

        }
        public string GetTotRecordsfilterWeb(string xSysuser, string xCompany, string filter, string nwListbox1)
        {
            string xquery = string.Format(@"SELECT Count(*) from (select Distinct * from FPTI.fn_CompanyUserItemMappingWeb('{0}','{1}')where (module like '%{2}%' and 'Module' = '{3}')or 
            (Code like '%{2}%' and 'Item' = '{3}') or (ItemName like '%{2}%' and 'Description' = '{3}') or (CanAccess like '%{2}%' and 'Can Access' = '{3}') 
            or (CanAdd like '%{2}%' and 'Can Add'='{3}') or (CanEdit  like  '%{2}%' and 'Can Edit' = '{3}') or (CanDelete like '%{2}%' and 'Can Delete' = '{3}')
            or (CanExport  like '%{2}%' and 'Can Export' = '{3}') or (CanImport like '%{2}%' and 'Can Import' = '{3}') or (CanPrint like '%{2}%' and 'Can Print' = '{3}')
            or  (CanProcess  like '%{2}%' and 'Can Process' = '{3}') or (CanSave  like '%{2}%' and 'Can Process' = '{3}') 
            ) a", xCompany, xSysuser, filter, nwListbox1);
            return (SFObjects.returnText(xquery, _ConnectionString));

        }
        public string SaveData2(System.Data.DataTable dt, bool isNew)
        {

            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            foreach (DataRow dr in dt.Rows)
            {
                cmd = new SqlCommand();
              //  bool isnewrec = isNewRec2(dr["SysUser"].ToString(), dr["Company"].ToString(), dr["Module"].ToString(), dr["Item"].ToString());
                cmd.Parameters.Clear();
                cmd.CommandText = "[FPTI_NW].[nsp_CompanyUserItemMappingWeb]";
                cmd.Parameters.AddWithValue("@Company", dr["Company"].ToString());
                cmd.Parameters.AddWithValue("@SysUser", dr["SysUser"].ToString());
                cmd.Parameters.AddWithValue("@Module", dr["Module"].ToString());
                cmd.Parameters.AddWithValue("@Item", dr["Item"].ToString());
                cmd.Parameters.AddWithValue("@CanAccess", dr["CanAccess"]);
                cmd.Parameters.AddWithValue("@CanAdd", dr["CanAdd"]);
                cmd.Parameters.AddWithValue("@CanEdit", dr["CanEdit"]);
                cmd.Parameters.AddWithValue("@CanDelete", dr["CanDelete"]);
                cmd.Parameters.AddWithValue("@CanSave", dr["CanSave"]);
                cmd.Parameters.AddWithValue("@CanPrint", dr["CanPrint"]);
                cmd.Parameters.AddWithValue("@CanProcess", dr["CanProcess"]);
                cmd.Parameters.AddWithValue("@CanImport", dr["CanImport"]);
                cmd.Parameters.AddWithValue("@CanExport", dr["CanExport"]);
                cmd.Parameters.AddWithValue("@QueryType", 1);
                cmdList.Add(cmd);
            }

            return base.ExecProcedure(cmdList, _ConnectionString);
        }
        public string SaveData(System.Data.DataTable dt, bool isNew)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();
            bool newrec = false;
            string username = "";
            string company = "";
            if (dt.Rows.Count >= 1)
            {
                company = dt.Rows[0]["Company"].ToString();
                username = dt.Rows[1]["SysUser"].ToString();

                if (!isNew)
                {
                    //cmd = new SqlCommand();
                    //cmd.Parameters.Clear();
                    //cmd.CommandText = "[FPTI].[pCompanyUserItemMapping]";
                    //cmd.Parameters.AddWithValue("@Company", company);
                    //cmd.Parameters.AddWithValue("@SysUser", username);
                    //cmd.Parameters.AddWithValue("@QueryType", 3);
                    //cmdList.Add(cmd);
                }


                foreach (DataRow drLin in dt.Rows)
                {


                    if (isNewRec(drLin["SysUser"].ToString(),drLin["Company"].ToString(),drLin["Module"].ToString(), drLin["Item"].ToString()))
                    {
                        SqlCommand cmd = new SqlCommand();
                        cmd.Parameters.Clear();
                        cmd.CommandText = "[FPTI].[pCompanyUserItemMapping]";
                        cmd.Parameters.AddWithValue("@Company", drLin["Company"]);
                        cmd.Parameters.AddWithValue("@SysUser", drLin["SysUser"]);
                        cmd.Parameters.AddWithValue("@Module ", drLin["Module"]);
                        cmd.Parameters.AddWithValue("@Item", drLin["Item"]);
                        cmd.Parameters.AddWithValue("@CanAccess", drLin["CanAccess"]);
                        cmd.Parameters.AddWithValue("@CanAdd", drLin["CanAdd"]);
                        cmd.Parameters.AddWithValue("@CanEdit", drLin["CanEdit"]);
                        cmd.Parameters.AddWithValue("@CanDelete", drLin["CanDelete"]);
                        cmd.Parameters.AddWithValue("@CanSave", drLin["CanSave"]);
                        cmd.Parameters.AddWithValue("@CanPrint", drLin["CanPrint"]);
                        cmd.Parameters.AddWithValue("@CanProcess", drLin["CanProcess"]);
                        cmd.Parameters.AddWithValue("@CanImport", drLin["CanImport"]);
                        cmd.Parameters.AddWithValue("@CanExport", drLin["CanExport"]);
                        cmd.Parameters.AddWithValue("@QueryType", 1);
                        cmdList.Add(cmd);
                    }
                    else
                    {

                        SqlCommand cmd = new SqlCommand();
                        cmd.Parameters.Clear();
                        cmd.CommandText = "[FPTI_NW].[nw_CompanyUserItemMapping]";
                        cmd.Parameters.AddWithValue("@Company", drLin["Company"]);
                        cmd.Parameters.AddWithValue("@SysUser", drLin["SysUser"]);
                        cmd.Parameters.AddWithValue("@Module ", drLin["Module"]);
                        cmd.Parameters.AddWithValue("@Item", drLin["Item"]);
                        cmd.Parameters.AddWithValue("@CanAccess", drLin["CanAccess"]);
                        cmd.Parameters.AddWithValue("@CanAdd", drLin["CanAdd"]);
                        cmd.Parameters.AddWithValue("@CanEdit", drLin["CanEdit"]);
                        cmd.Parameters.AddWithValue("@CanDelete", drLin["CanDelete"]);
                        cmd.Parameters.AddWithValue("@CanSave", drLin["CanSave"]);
                        cmd.Parameters.AddWithValue("@CanPrint", drLin["CanPrint"]);
                        cmd.Parameters.AddWithValue("@CanProcess", drLin["CanProcess"]);
                        cmd.Parameters.AddWithValue("@CanImport", drLin["CanImport"]);
                        cmd.Parameters.AddWithValue("@CanExport", drLin["CanExport"]);
                        cmd.Parameters.AddWithValue("@QueryType", 5);
                        cmdList.Add(cmd);
                    }
                }

            }
            return base.ExecProcedure(cmdList, _ConnectionString);
        }

        public string DeleteData(string xSysuser, string xCompany)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI].[pCompanyUserItemMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@SysUser", xSysuser);
            cmd.Parameters.AddWithValue("@Company", xCompany);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public bool isNewRec(string sysuser, string company, string module, string item)
        {
            string xquery = string.Format(@"select 1 from FPTI.CompanyUserItemMapping
                                                   where SysUser='{0}' and Company='{1}' and Module='{2}' and Item='{3}'", sysuser, company, module, item);

            if (SFObjects.returnText(xquery, _ConnectionString) == "1")
                return false;
            else
                return true;
        }

        public string ImportCompany(string companyto, string companyfrom)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            cmd.Parameters.Clear();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyUserItemMapping]";
            cmd.Parameters.AddWithValue("@Companyto", companyto);
            cmd.Parameters.AddWithValue("@Companyfrom", companyfrom);
            cmd.Parameters.AddWithValue("@QueryType", 5);
            cmdList.Add(cmd);
            return base.ExecProcedure(cmdList, _ConnectionString);

        }
        public string GetAllData(string a, string b)
        {
            string xquery = string.Format(@"SELECT Count(*) from (select Distinct * from [FPTI].[fn_CompanyUserItemMappingWeb]('{0}','{1}') where CanAccess like '%checked=""checked""%') a", a, b);
            return (SFObjects.returnText(xquery, _ConnectionString));
        }
        public System.Data.DataTable GetDataUser(string strCompany, string ss, string Module, string Item)
        {
            //SqlCommand cmd = new SqlCommand();
            //cmd.CommandText = "[FPTI_NW].[nsp_CompanyUserItemMappingWeb]";
            //cmd.Parameters.Clear();
            //cmd.Parameters.AddWithValue("@SysUser", ss);
            //cmd.Parameters.AddWithValue("@Company", strCompany);
            //cmd.Parameters.AddWithValue("@QueryType", 4);
            //return base.ExecGetData(cmd, _ConnectionString, true);

            return SFObjects.LoadDataTable(string.Format(@"Select Distinct isNull(a.AppName, '') as Module, isNull(a.ItemID,'') as Code, a.ItemName [Item Name], 
	                                                    case when (cuim.CanAccess = 1 OR crim.CanAccess = 1)then 'checked=""checked""' else '' END as [Can Access], 
	                                                    case when ( cuim.CanAdd= 1 OR crim.CanAdd = 1)then 'checked=""checked""' else '' END as [Can Add],  
	                                                    case when ( cuim.CanEdit= 1 OR crim.CanEdit = 1)then 'checked=""checked""' else '' END as [Can Edit], 
	                                                    case when ( cuim.CanDelete= 1 OR crim.CanDelete = 1)then 'checked=""checked""' else '' END as [Can Delete],
	                                                    case when ( cuim.CanSave= 1 OR crim.CanSave = 1)then 'checked=""checked""' else '' END as [Can Save],
	                                                    case when ( cuim.CanPrint= 1 OR crim.CanPrint = 1)then 'checked=""checked""' else '' END as [Can Print],
	                                                    case when ( cuim.CanProcess= 1 OR crim.CanProcess = 1)then 'checked=""checked""' else '' END as [Can Process],
	                                                    case when ( cuim.CanImport= 1 OR crim.CanImport = 1)then 'checked=""checked""' else '' END as [Can Import],
	                                                    case when ( cuim.CanExport= 1 OR crim.CanExport = 1)then 'checked=""checked""' else '' END as [Can Export],
                                                         [CanAccessRec].Description [Can Access Recuser], 
                                                         [CanAddRec].Description[Can Add Recuser],
                                                         [CanEditRec].Description[Can Edit Recuser],
                                                         [CanDeleteRec].Description [Can Delete Recuser],
                                                         [CanSaveRec].Description [Can Save Recuser],
                                                         [CanPrintRec].Description [Can Print Recuser],
                                                         [CanProcessRec].Description [Can Proces Recuser],
                                                         [CanImportRec].Description [Can Import Recuser],
                                                         [CanExportRec].Description [Can Export Recuser]                                                       
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
 OR cuim.CanPrint= 1 OR crim.CanPrint = 1 OR cuim.CanProcess= 1 OR crim.CanProcess = 1 OR cuim.CanImport= 1 OR crim.CanImport = 1 OR cuim.CanExport= 1 OR crim.CanExport = 1)
", ss, strCompany, Module, Item), _ConnectionString);


        }
        public string Update(System.Data.DataTable dt,string xSysuser, string item,string xCompany,string module)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            foreach (DataRow dr in dt.Rows)
            {
                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandText = "[FPTI_NW].[nsp_CompanyUserItemMappingWeb]";
                cmd.Parameters.AddWithValue("@Company", xCompany.ToString());
                cmd.Parameters.AddWithValue("@SysUser", xSysuser.ToString());
                cmd.Parameters.AddWithValue("@Module", module.ToString());
                cmd.Parameters.AddWithValue("@Item", dr["Item"]);
                cmd.Parameters.AddWithValue("@CanAccess", dr["CanAccess"]);
                cmd.Parameters.AddWithValue("@CanAdd", dr["CanAdd"]);
                cmd.Parameters.AddWithValue("@CanEdit", dr["CanEdit"]);
                cmd.Parameters.AddWithValue("@CanDelete", dr["CanDelete"]);
                cmd.Parameters.AddWithValue("@CanSave", dr["CanSave"]);
                cmd.Parameters.AddWithValue("@CanPrint", dr["CanPrint"]);
                cmd.Parameters.AddWithValue("@CanProcess", dr["CanProcess"]);
                cmd.Parameters.AddWithValue("@CanImport", dr["CanImport"]);
                cmd.Parameters.AddWithValue("@CanExport", dr["CanExport"]);
                cmd.Parameters.AddWithValue("@QueryType", 10);
                cmdList.Add(cmd);
            }

            return base.ExecProcedure(cmdList, _ConnectionString);
        }

        public string Update2(System.Data.DataTable dt, string xSysuser, string item, string xCompany, string module)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            foreach (DataRow dr in dt.Rows)
            {
                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandText = "[FPTI_NW].[nsp_CompanyUserItemMappingWeb]";
                cmd.Parameters.AddWithValue("@Company", xCompany.ToString());
                cmd.Parameters.AddWithValue("@SysUser", xSysuser.ToString());
                cmd.Parameters.AddWithValue("@Module", module.ToString());
                cmd.Parameters.AddWithValue("@Item", dr["Item"]);
                cmd.Parameters.AddWithValue("@CanAccess", dr["CanAccess"]);
                cmd.Parameters.AddWithValue("@CanAdd", dr["CanAdd"]);
                cmd.Parameters.AddWithValue("@CanEdit", dr["CanEdit"]);
                cmd.Parameters.AddWithValue("@CanDelete", dr["CanDelete"]);
                cmd.Parameters.AddWithValue("@CanSave", dr["CanSave"]);
                cmd.Parameters.AddWithValue("@CanPrint", dr["CanPrint"]);
                cmd.Parameters.AddWithValue("@CanProcess", dr["CanProcess"]);
                cmd.Parameters.AddWithValue("@CanImport", dr["CanImport"]);
                cmd.Parameters.AddWithValue("@CanExport", dr["CanExport"]);
                cmd.Parameters.AddWithValue("@QueryType", 5);
                cmdList.Add(cmd);
            }

            return base.ExecProcedure(cmdList, _ConnectionString);
        }

        public bool CheckHasAccess(string User)
        {

            return Parser.ParseInt(SFObjects.returnText(string.Format("SELECT HasAccessToUtility FROM FPTI.[User] WHERE Code = '{0}'", User), _ConnectionString)).Equals(0);

        }

        public bool CheckConfig()
        {

            return Parser.ParseInt(SFObjects.returnText(@"SELECT [value] FROM [dbo].[SystemConfig] WHERE code ='COMPADMIN'", _ConnectionString)).Equals(1);

        }

        public string GetData()
        {
            string a = string.Format(@"Select * from FPTI.[User]");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }

           
    }
}
