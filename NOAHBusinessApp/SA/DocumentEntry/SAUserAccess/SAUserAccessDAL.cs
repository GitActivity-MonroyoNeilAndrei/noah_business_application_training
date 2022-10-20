using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;


namespace DataAccessLayers
{
    public class SAUserAccessDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        private string _ConnectionString;
        private string _ConnectionString2;
        public string CurrentSelectedItem;
        public readonly int listingStartRow = 6;
        public string GETCOMPANY = "";



        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code",                                       //--column for searching
                                inquireQry = "Select Code, Description from [FG].[UOMMaster]", //--query of inquire button
                                listingName = "FG UOM Listing",                              //--form name of listings
                                listingQry = "select Code, Description, Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] from [FG].[UOMMaster]"; //--query of export and print
        //--default start row
        
        #region STANDARD

        //public string MenuItemCode = "NWADMIN_USERACESS"; // This is default parameter  for version
        public string MenuItemCode = "NWADMIN_ACCESS";
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

        public SAUserAccessDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = _ConnectionString;
            this.CurrentSelectedItem = selectedItem;
        }

        public string ConnectionString { get { return _ConnectionString; } }

        public DataTable GetSchema()
        {
            return SFObjects.LoadDataTable("select * from FPTI_NW.NW_CompanyUserItemMappingWeb where 1 != 1", _ConnectionString);
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
            cmd.Parameters.AddWithValue("@QueryType", 4);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }
        public DataTable GetTable_AL2(string xSysuser, string xCompany, string frompage, string topage, string filter, string filtertype)
        {

            return SFObjects.LoadDataTable(string.Format(@"Select  x.[Module], x.[Code]+'' as 'Item',x.[Description],
	                    x.CanAccess [Can Access], 
	                    x.CanAdd [Can Add],  
	                    x.CanEdit [Can Edit], 
	                    x.CanDelete [Can Delete],
	                    x.CanSave [Can Save],
	                    x.CanPrint [Can Print],
	                    x.CanProcess [Can Process],
	                    x.CanImport [Can Import],
	                    x.CanExport [Can Export] from
	                    (select ROW_NUMBER()  over (order by (select 0)) as [aagrowNum], b.* from 
	                    (select Distinct a.*,t.code,t.Description from FPTI.CompanyUserItemMapping a
		                    left join fpti.item t on  a.Item = t.Code  where a.CanAccess = 1 and a.SysUser = '{0}' and a.Company = '{1}'
                          
		                    )b)x where x.aagrowNum>='{2}' AND  x.aagrowNum <='{3}' order by x.aagrowNum", xSysuser, xCompany, frompage, topage), _ConnectionString);

            



        }

        public DataTable GetTable_AL2Web(string xSysuser, string xCompany, string frompage, string topage, string filter, string filtertype, string SortColumn, string SortOrder)
        {

            DataTable dt = new DataTable();

            string SortBy = "";

            if (!string.IsNullOrEmpty(SortColumn) && !string.IsNullOrEmpty(SortOrder))
                SortBy = string.Format(@"ORDER BY {0} {1}", SortColumn, SortOrder);

            if (filter.ToLower() == "yes" || filter.ToLower() == "true") {
                filter = "'checked=''checked'''";
            }
            else if (filter.ToLower() == "no" || filter.ToLower() == "false")
                filter = "''";
            else if (filtertype != "Module" && filtertype != "Item" && filtertype != "Description")
                filter = filter + " OR " + filter + " = ''";

            if (filtertype == "Module")
            {
                if (filter != string.Empty)
                {
                    filter = " REPLACE(module, ' ', '') LIKE '%" + filter.Replace(" ", "") + "%'";
                }
            }
            else if (filtertype == "Item")
            {
                if (filter != string.Empty)
                {
                    filter = " code LIKE '%" + filter + "%'";
                }
            }
            else if (filtertype == "Description")
            {
                if (filter != string.Empty)
                {
                    filter = " ItemName LIKE '%" + filter + "%'";
                }
            }
            else if (filtertype == "Can Access")
                filter = " CanAccess = " + filter;
            else if (filtertype == "Can Add")
                filter = " CanAdd = " + filter;
            else if (filtertype == "Can Edit")
                filter = " CanEdit = " + filter;
            else if (filtertype == "Can Delete")
                filter = " CanDelete = " + filter;
            else if (filtertype == "Can Save")
                filter = " CanSave = " + filter;
            else if (filtertype == "Can Print")
                filter = " CanPrint = " + filter;
            else if (filtertype == "Can Process")
                filter = " CanProcess = " + filter;
            else if (filtertype == "Can Import")
                filter = " CanImport = " + filter;
            else if (filtertype == "Can Export")
                filter = " CanExport = " + filter;



            dt = SFObjects.LoadDataTable(string.Format(@"Select x.[Module], x.[Code] [Item],x.[ItemName] [Description], x.[CanAccess]+''as [Can Access], x.[CanAdd]+''as [Can Add], x.[CanEdit]+''as [Can Edit] , x.[CanDelete]+'' as [Can Delete], x.[CanSave]+''as [Can Save], x.[CanPrint]+''as [Can Print], x.[CanProcess]+''as [Can Process], x.[CanImport]+''as [Can Import], x.[CanExport]+''as [Can Export]
                                                        ,cuim.CanAccessRec,cuim.CanAddRec		,cuim.CanEditRec		,cuim.CanDeleteRec	,cuim.CanSaveRec		,cuim.CanPrintRec	 	,cuim.CanProcessRec	,cuim.CanImportRec	,cuim.CanExportRec, x.ModuleCode from
		                                                    (select ROW_NUMBER()  over (order by (select 0)) as [aagrowNum], b.* from (
				                                                    select Distinct * from (
                                                                    Select Distinct isNull(a.AppName, '') as Module, isNull(a.ItemID,'') as Code, a.ItemName, 
	                                                                case when (cuim.CanAccess = 1)then 'checked=''checked''' else '' END as CanAccess, 
	                                                                case when ( cuim.CanAdd= 1)then 'checked=''checked''' else '' END as CanAdd,  
	                                                                case when ( cuim.CanEdit= 1)then 'checked=''checked''' else '' END as CanEdit, 
	                                                                case when ( cuim.CanDelete= 1)then 'checked=''checked''' else '' END as CanDelete,
	                                                                case when ( cuim.CanSave= 1)then 'checked=''checked''' else '' END as CanSave,
	                                                                case when ( cuim.CanPrint= 1)then 'checked=''checked''' else '' END as CanPrint,
	                                                                case when ( cuim.CanProcess= 1)then 'checked=''checked''' else '' END as CanProcess,
	                                                                case when ( cuim.CanImport= 1)then 'checked=''checked''' else '' END as CanImport,
	                                                                case when ( cuim.CanExport= 1)then 'checked=''checked''' else '' END as CanExport,
                                                                    a.ModuleCode
	                                                                from 
	                                                                (select cmm.CompanyID, cmm.AppID, i.ItemID ,i.ItemName,q.AppName, q.code [ModuleCode]  from FPTI_NW.noahweb_Application_Collection cmm
	                                                                inner join FPTI_NW.noahweb_menuDriven i
	                                                                ON cmm.AppID = i.ItemParentApplication inner join FPTI_NW.noahweb_Application_Info q on cmm.AppID = q.code  where i.ItemType = '1') a

	                                                                left join FPTI_NW.NW_CompanyUserItemMappingWeb  cuim
	                                                                ON a.ItemID = cuim.Item and cuim.SysUser='{0}' and a.CompanyID=cuim.Company AND a.AppID = cuim.Module
	                                                                where a.CompanyID = '{1}'
                                                                    ) a
                                                                    where 

                                                                        {2}

		                                                    )  b) x
	                                                        LEFT JOIN  FPTI_NW.noahweb_Application_Info a
															ON a.description LIKE x.Module
                                                            left join FPTI_NW.NW_CompanyUserItemMappingWeb  cuim
															ON x.Code = cuim.Item and cuim.SysUser='{0}' and cuim.Company = '{1}' AND a.code = cuim.Module
		                                                   
                                                            WHERE LTRIM(ISNULL(x.Code,'')) <> ''	
                                                            {4}", xSysuser, xCompany, filter, filtertype, SortBy), _ConnectionString);



            if (dt.Columns.Count <= 0)
            {
                dt = SFObjects.LoadDataTable(string.Format(@"Select x.[Module], x.[Code],x.[ItemName] , x.[CanAccess]+''as [Can Access], x.[CanAdd]+''as [Can Add], x.[CanEdit]+''as [Can Edit] , x.[CanDelete]+'' as [Can Delete], x.[CanSave]+''as [Can Save], x.[CanPrint]+''as [Can Print], x.[CanProcess]+''as [Can Process], x.[CanImport]+''as [Can Import], x.[CanExport]+''as [Can Export]
                                                            ,cuim.CanAccessRec,cuim.CanAddRec		,cuim.CanEditRec		,cuim.CanDeleteRec	,cuim.CanSaveRec		,cuim.CanPrintRec	 	,cuim.CanProcessRec	,cuim.CanImportRec	,cuim.CanExportRec from
		                                                    (select ROW_NUMBER()  over (order by (select 0)) as [aagrowNum], b.* from (
				                                                    select Distinct * from FPTI.fn_CompanyUserItemMappingWeb('{1}','{0}')where 

                                                                    {2}

		                                                    )  b) x
                                                            left join FPTI_NW.NW_CompanyUserItemMappingWeb  cuim
															ON x.Code = cuim.Item and cuim.SysUser='{0}' and cuim.Company = '{1}' AND x.Module = cuim.Module
                                                            WHERE LTRIM(ISNULL(x.Code,'')) <> ''	
		                                                    order by x.aagrowNum ", xSysuser, xCompany, filter, filtertype), _ConnectionString);

            }

            return dt;
        
        }

        public string GetTotRecords(string xSysuser, string xCompany)
        {
            return SFObjects.returnText(string.Format(@"SELECT Count(*) from
		                                (SELECT Distinct * from [FPTI].[fn_CompanyUserItemMapping]('{0}','{1}')) a", xCompany, xSysuser), _ConnectionString);
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
        public string SaveData2(System.Data.DataTable dt, bool isNew, string Recuser, String user, string SysUser)
        {

            SqlConnection sqlConnection = new SqlConnection(_ConnectionString);
            sqlConnection.Open();
            SqlTransaction sqlTransaction = sqlConnection.BeginTransaction();
            SqlCommand cmd = new SqlCommand(@"IF EXISTS(select 1 from FPTI_NW.NW_CompanyUserItemMappingWeb where Company=@Company and SysUser=@SysUser and Module=@Module and Item=@Item )
    BEGIN

        update FPTI_NW.NW_CompanyUserItemMappingWeb set CanAccess = @CanAccess, CanAdd = @CanAdd, CanEdit = @CanEdit, CanDelete = @CanDelete, CanSave = @CanSave, CanPrint = @CanPrint, CanProcess = @CanProcess, 
        CanImport = @CanImport, CanExport = @CanExport, CanAccessRec = @CanAccessRec, CanAddRec = @CanAddRec, CanEditRec = @CanEditRec, CanSaveRec = @CanSaveRec, CanPrintRec = @CanPrintRec,
        CanProcessRec = @CanProcessRec, CanImportRec = @CanImportRec, CanExportRec = @CanExportRec  where  Company = @Company and SysUser = @SysUser and Module = @Module and Item = @Item

    END

ELSE BEGIN insert into FPTI_NW.NW_CompanyUserItemMappingWeb(Company, SysUser, Module, Item, CanAccess, CanAdd, CanEdit, CanDelete, CanSave, CanPrint, CanProcess, CanImport, CanExport, 
        CanAccessRec, CanAddRec, CanEditRec, CanDeleteRec, CanSaveRec, CanPrintRec, CanProcessRec, CanImportRec, CanExportRec) values
        (@Company, @SysUser, @Module, @Item, @CanAccess, @CanAdd, @CanEdit, @CanDelete, @CanSave, @CanPrint, @CanProcess, @CanImport, @CanExport, 
        @CanAccessRec, @CanAddRec, @CanEditRec, @CanDeleteRec, @CanSaveRec, @CanPrintRec, @CanProcessRec, @CanImportRec, @CanExportRec)

    END

        ", sqlConnection, sqlTransaction);

            string company = string.Empty;
            cmd.CommandType = CommandType.Text;

            foreach (DataRow drLin in dt.Rows)
            {
                if (company.Length == 0) company = drLin["Company"].ToString().Replace("-p8-", string.Empty);
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Company", company);
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

                cmd.Parameters.AddWithValue("@CanAccessRec", drLin["CanAccessRec"]);
                cmd.Parameters.AddWithValue("@CanAddRec", drLin["CanAddRec"]);
                cmd.Parameters.AddWithValue("@CanEditRec", drLin["CanEditRec"]);
                cmd.Parameters.AddWithValue("@CanDeleteRec", drLin["CanDeleteRec"]);
                cmd.Parameters.AddWithValue("@CanSaveRec", drLin["CanSaveRec"]);
                cmd.Parameters.AddWithValue("@CanPrintRec", drLin["CanPrintRec"]);
                cmd.Parameters.AddWithValue("@CanProcessRec", drLin["CanProcessRec"]);
                cmd.Parameters.AddWithValue("@CanImportRec", drLin["CanImportRec"]);
                cmd.Parameters.AddWithValue("@CanExportRec", drLin["CanExportRec"]);
                cmd.Parameters.AddWithValue("@Recuser", Recuser);

                try
                { 
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ee)
                {
                    sqlTransaction.Rollback();
                    return ee.Message;
                }
            }
            

            cmd = new SqlCommand(@"
            IF NOT EXISTS(SELECT TOP 1 1 FROM FPTI_NW.NW_CompanyUserItemMappingWeb_HDR WHERE [User] = @SysUser AND Company = @Company)
            BEGIN

            INSERT INTO FPTI_NW.NW_CompanyUserItemMappingWeb_HDR (Company, [User], Recuser, Recdate)
            VALUES (@Company, @SysUser, @Recuser, dbo.GetNoahDate())

            END
            ELSE
            BEGIN

            UPDATE FPTI_NW.NW_CompanyUserItemMappingWeb_HDR SET Moduser = @Recuser, Moddate = dbo.GetNoahDate() WHERE [User] = @SysUser AND Company = @Company

            END", sqlConnection, sqlTransaction);
            
            cmd.CommandType = CommandType.Text;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Company", company);
            cmd.Parameters.AddWithValue("@Recuser", Recuser);
            cmd.Parameters.AddWithValue("@SysUser", SysUser); 

            try
            {
                cmd.ExecuteNonQuery();
            }
            catch (Exception ee)
            {
                sqlTransaction.Rollback();
                return ee.Message;
            }

            cmd = new SqlCommand();
            cmd.Parameters.Clear();
            cmd.Connection = sqlConnection;
            cmd.Transaction = sqlTransaction;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "[FPTI].[pCompanyUserItemMapping_hist]";
            cmd.Parameters.AddWithValue("@Company", dt.Rows[0]["Company"]);
            cmd.Parameters.AddWithValue("@SysUser", dt.Rows[0]["SysUser"]);
            cmd.Parameters.AddWithValue("@Moduser", user);
            cmd.Parameters.AddWithValue("@QueryType", 1);
            cmd.CommandTimeout = 0;
            cmd.ExecuteNonQuery();

            sqlTransaction.Commit();


            return "Process has successfully completed.";


        }

        public string NewSaveData(string Company, string FromUser, string ToUser, string Recuser)
        {

            SqlConnection sqlConnection = new SqlConnection(_ConnectionString);
            sqlConnection.Open();
            SqlTransaction sqlTransaction = sqlConnection.BeginTransaction();
            SqlCommand cmd = new SqlCommand(@"
            DELETE [FPTI_NW].[NW_CompanyUserItemMappingWeb] WHERE SysUser = @to AND Company =@company
            INSERT INTO [FPTI_NW].[NW_CompanyUserItemMappingWeb] 
            ([Company]
                  ,[SysUser]
                  ,[Module]
                  ,[Item]
                  ,[CanAccess]
                  ,[CanAdd]
                  ,[CanEdit]
                  ,[CanDelete]
                  ,[CanSave]
                  ,[CanPrint]
                  ,[CanProcess]
                  ,[CanImport]
                  ,[CanExport]
                  ,[CanAccessRec]
                  ,[CanAddRec]
                  ,[CanEditRec]
                  ,[CanDeleteRec]
                  ,[CanSaveRec]
                  ,[CanPrintRec]
                  ,[CanProcessRec]
                  ,[CanImportRec]
                  ,[CanExportRec])
            SELECT [Company]
                  ,@to [SysUser]
                  ,[Module]
                  ,[Item]
                  ,[CanAccess]
                  ,[CanAdd]
                  ,[CanEdit]
                  ,[CanDelete]
                  ,[CanSave]
                  ,[CanPrint]
                  ,[CanProcess]
                  ,[CanImport]
                  ,[CanExport]
                  ,@recuser [CanAccessRec]
                  ,@recuser [CanAddRec]
                  ,@recuser [CanEditRec]
                  ,@recuser [CanDeleteRec]
                  ,@recuser [CanSaveRec]
                  ,@recuser [CanPrintRec]
                  ,@recuser [CanProcessRec]
                  ,@recuser [CanImportRec]
                  ,@recuser [CanExportRec]
              FROM [FPTI_NW].[NW_CompanyUserItemMappingWeb]
              WHERE SysUser = @from AND Company =@company



            IF NOT EXISTS(SELECT TOP 1 1 FROM FPTI_NW.NW_CompanyUserItemMappingWeb_HDR WHERE [User] = @to AND Company = @company)
            BEGIN

            INSERT INTO FPTI_NW.NW_CompanyUserItemMappingWeb_HDR (Company, [User], Recuser, Recdate)
            VALUES (@company, @to, @recuser, dbo.GetNoahDate())

            END
            ELSE
            BEGIN

            UPDATE FPTI_NW.NW_CompanyUserItemMappingWeb_HDR SET Moduser = @recuser, Moddate = dbo.GetNoahDate() WHERE [User] = @to AND Company = @company

            END



        ", sqlConnection, sqlTransaction);
            
            cmd.CommandType = CommandType.Text;
            
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@company", Company);
            cmd.Parameters.AddWithValue("@from", FromUser);
            cmd.Parameters.AddWithValue("@to ", ToUser);
            cmd.Parameters.AddWithValue("@recuser", Recuser);

            try
            {
                cmd.ExecuteNonQuery();
            }
            catch (Exception ee)
            {
                sqlTransaction.Rollback();
                return ee.Message;
            }

            cmd = new SqlCommand();
            cmd.Parameters.Clear();
            cmd.Connection = sqlConnection;
            cmd.Transaction = sqlTransaction;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "[FPTI].[pCompanyUserItemMapping_hist]";
            cmd.Parameters.AddWithValue("@Company", Company);
            cmd.Parameters.AddWithValue("@SysUser", ToUser);
            cmd.Parameters.AddWithValue("@Moduser", Recuser);
            cmd.Parameters.AddWithValue("@QueryType", 1);
            cmd.CommandTimeout = 0;
            cmd.ExecuteNonQuery();

            sqlTransaction.Commit();


            return "Process has successfully completed.";


        }

        public string SaveData(System.Data.DataTable dt, bool isNew, String user)
        {
            SqlConnection sqlConnection = new SqlConnection(_ConnectionString);
            sqlConnection.Open();
            SqlTransaction sqlTransaction = sqlConnection.BeginTransaction();
            SqlCommand cmd = new SqlCommand(
            @"if exists(select 1 from FPTI_NW.NW_CompanyUserItemMappingWeb where Company=@Company and SysUser=@SysUser and Module=@Module and Item=@Item )
                update FPTI_NW.NW_CompanyUserItemMappingWeb set CanAccess = @CanAccess, CanAdd = @CanAdd, CanEdit = @CanEdit, CanSave = @CanSave, CanPrint = @CanPrint, CanProcess = @CanProcess, 
                    CanImport = @CanImport, CanExport = @CanExport, CanAccessRec = @CanAccessRec, CanAddRec = @CanAddRec, CanEditRec = @CanEditRec, CanSaveRec = @CanSaveRec, CanPrintRec = @CanPrintRec,
                    CanProcessRec = @CanProcessRec, CanImportRec = @CanImportRec, CanExportRec = @CanExportRec  where  Company = @Company and SysUser = @SysUser and Module = @Module and Item = @Item
            else 
                insert into FPTI_NW.NW_CompanyUserItemMappingWeb(Company, SysUser, Module, Item, CanAccess, CanAdd, CanEdit, CanDelete, CanSave, CanPrint, CanProcess, CanImport, CanExport, 
                    CanAccessRec, CanAddRec, CanEditRec, CanDeleteRec, CanSaveRec, CanPrintRec, CanProcessRec, CanImportRec, CanExportRec) values
                    (@Company, @SysUser, @Module, @Item, @CanAccess, @CanAdd, @CanEdit, @CanDelete, @CanSave, @CanPrint, @CanProcess, @CanImport, @CanExport, 
                    @CanAccessRec, @CanAddRec, @CanEditRec, @CanDeleteRec, @CanSaveRec, @CanPrintRec, @CanProcessRec, @CanImportRec, @CanExportRec)", sqlConnection, sqlTransaction);

            string company = string.Empty;
            cmd.CommandType = CommandType.Text;

            foreach (DataRow drLin in dt.Rows)
            {
                if (company.Length == 0) company = drLin["Company"].ToString().Replace("-p8-", string.Empty);
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Company", company);
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

                cmd.Parameters.AddWithValue("@CanAccessRec", drLin["CanAccessRec"]);
                cmd.Parameters.AddWithValue("@CanAddRec", drLin["CanAddRec"]);
                cmd.Parameters.AddWithValue("@CanEditRec", drLin["CanEditRec"]);
                cmd.Parameters.AddWithValue("@CanDeleteRec", drLin["CanDeleteRec"]);
                cmd.Parameters.AddWithValue("@CanSaveRec", drLin["CanSaveRec"]);
                cmd.Parameters.AddWithValue("@CanPrintRec", drLin["CanPrintRec"]);
                cmd.Parameters.AddWithValue("@CanProcessRec", drLin["CanProcessRec"]);
                cmd.Parameters.AddWithValue("@CanImportRec", drLin["CanImportRec"]);
                cmd.Parameters.AddWithValue("@CanExportRec", drLin["CanExportRec"]);

                try
                {
                    cmd.ExecuteNonQuery();
                }
                catch (Exception ee) 
                {
                    sqlTransaction.Rollback();
                    return ee.Message;
                }


            }

            cmd = new SqlCommand();
            cmd.Parameters.Clear();
            cmd.CommandText = "[FPTI].[pCompanyUserItemMapping_hist]";
            cmd.Parameters.AddWithValue("@Company", dt.Rows[0]["Company"]);
            cmd.Parameters.AddWithValue("@SysUser", dt.Rows[0]["SysUser"]);
            cmd.Parameters.AddWithValue("@Moduser", user);
            cmd.Parameters.AddWithValue("@QueryType", 1);
            cmd.ExecuteNonQuery();

            sqlTransaction.Commit();

            return "Process has successfully completed.";
        }
        public string SaveData1(System.Data.DataTable dt, bool isNew)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();
            bool newrec = false;
            string username = "";
            string company = "";
            string stringfinal ="";
            if (dt.Rows.Count >= 1)
            {
                company = dt.Rows[0]["Company"].ToString();
                username = dt.Rows[0]["SysUser"].ToString();
                stringfinal = ExecBatchInsert(dt, "FPTI_NW.NW_CompanyUserItemMappingWeb", "", "", _ConnectionString);


                SFObjects.returnText(string.Format(@"
                DELETE FROM FPTI_NW.NW_CompanyUserItemMappingWeb 
                WHERE  UPPER(REPLACE(Company,'-p8-','') + sysuser+ Module) IN 
                (SELECT UPPER(REPLACE(a.Company,'-p8-','') + a.sysuser+ a.Module) FROM FPTI_NW.NW_CompanyUserItemMappingWeb a
                WHERE a.Company='{0}-p8-'
                AND a.sysuser = '{1}' AND Module = a.Module)
                AND Company NOT LIKE '%-p8-';
                UPDATE FPTI_NW.NW_CompanyUserItemMappingWeb 
                SET Company = REPLACE(Company,'-p8-','') WHERE  UPPER(REPLACE(Company,'-p8-','') + sysuser+ Module) IN 
                (SELECT UPPER(REPLACE(a.Company,'-p8-','') + a.sysuser+ a.Module) FROM FPTI_NW.NW_CompanyUserItemMappingWeb a
                WHERE a.Company='{0}-p8-'
                AND a.sysuser = '{1}' AND Module = a.Module);
                ", company.Replace("-p8-",""), username), _ConnectionString);


                //company = dt.Rows[0]["Company"].ToString();
                //username = dt.Rows[1]["SysUser"].ToString();

                //if (!isNew)
                //{
                //    //cmd = new SqlCommand();
                //    //cmd.Parameters.Clear();
                //    //cmd.CommandText = "[FPTI].[pCompanyUserItemMapping]";
                //    //cmd.Parameters.AddWithValue("@Company", company);
                //    //cmd.Parameters.AddWithValue("@SysUser", username);
                //    //cmd.Parameters.AddWithValue("@QueryType", 3);
                //    //cmdList.Add(cmd);
                //}


                //foreach (DataRow drLin in dt.Rows)
                //{

                //    if (isNewRec(drLin["SysUser"].ToString(), drLin["Company"].ToString(), drLin["Module"].ToString(), drLin["Item"].ToString()))
                //    {
                //        SqlCommand cmd = new SqlCommand();
                //        cmd.Parameters.Clear();
                //        cmd.CommandText = "[FPTI].[pCompanyUserItemMapping]";
                //        cmd.Parameters.AddWithValue("@Company", drLin["Company"]);
                //        cmd.Parameters.AddWithValue("@SysUser", drLin["SysUser"]);
                //        cmd.Parameters.AddWithValue("@Module ", drLin["Module"]);
                //        cmd.Parameters.AddWithValue("@Item", drLin["Item"]);
                //        cmd.Parameters.AddWithValue("@CanAccess", drLin["CanAccess"]);
                //        cmd.Parameters.AddWithValue("@CanAdd", drLin["CanAdd"]);
                //        cmd.Parameters.AddWithValue("@CanEdit", drLin["CanEdit"]);
                //        cmd.Parameters.AddWithValue("@CanDelete", drLin["CanDelete"]);
                //        cmd.Parameters.AddWithValue("@CanSave", drLin["CanSave"]);
                //        cmd.Parameters.AddWithValue("@CanPrint", drLin["CanPrint"]);
                //        cmd.Parameters.AddWithValue("@CanProcess", drLin["CanProcess"]);
                //        cmd.Parameters.AddWithValue("@CanImport", drLin["CanImport"]);
                //        cmd.Parameters.AddWithValue("@CanExport", drLin["CanExport"]);
                //        cmd.Parameters.AddWithValue("@QueryType", 1);
                //        cmdList.Add(cmd);
                //    }
                //    else
                //    {

                //        SqlCommand cmd = new SqlCommand();
                //        cmd.Parameters.Clear();
                //        cmd.CommandText = "[FPTI_NW].[nw_CompanyUserItemMapping]";
                //        cmd.Parameters.AddWithValue("@Company", drLin["Company"]);
                //        cmd.Parameters.AddWithValue("@SysUser", drLin["SysUser"]);
                //        cmd.Parameters.AddWithValue("@Module ", drLin["Module"]);
                //        cmd.Parameters.AddWithValue("@Item", drLin["Item"]);
                //        cmd.Parameters.AddWithValue("@CanAccess", drLin["CanAccess"]);
                //        cmd.Parameters.AddWithValue("@CanAdd", drLin["CanAdd"]);
                //        cmd.Parameters.AddWithValue("@CanEdit", drLin["CanEdit"]);
                //        cmd.Parameters.AddWithValue("@CanDelete", drLin["CanDelete"]);
                //        cmd.Parameters.AddWithValue("@CanSave", drLin["CanSave"]);
                //        cmd.Parameters.AddWithValue("@CanPrint", drLin["CanPrint"]);
                //        cmd.Parameters.AddWithValue("@CanProcess", drLin["CanProcess"]);
                //        cmd.Parameters.AddWithValue("@CanImport", drLin["CanImport"]);
                //        cmd.Parameters.AddWithValue("@CanExport", drLin["CanExport"]);
                //        cmd.Parameters.AddWithValue("@QueryType", 5);
                //        cmdList.Add(cmd);
                //    }
                //}

            }

            return stringfinal;
           // return base.ExecProcedure(cmdList, _ConnectionString);
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
            return ImportCompany( companyto,  companyfrom);
        }
        public string ImportCompany(string companyto, string companyfrom, string user,string recuser)
        {
            //List<SqlCommand> cmdList = new List<SqlCommand>();
            //SqlCommand cmd = new SqlCommand();
            //cmd.Parameters.Clear();
            //cmd.CommandText = "[FPTI_NW].[nw_CompanyUserAlertMapping]";
            //cmd.Parameters.AddWithValue("@Companyto", companyto);
            //cmd.Parameters.AddWithValue("@Companyfrom", companyfrom);
            //cmd.Parameters.AddWithValue("@QueryType", 5);
            //cmdList.Add(cmd);
            //return base.ExecProcedure(cmdList, _ConnectionString);
            string strResult ="";
            if (user == "") user = "%";
            user = user.Replace("'","''");
            string strSQl = string.Format(@"
                        DECLARE @compFrom varchar(100) = '{0}'
                        DECLARE @compTo varchar(100) = '{1}'
                        DECLARE @recuser varchar(100) = '{2}'
						DECLARE @recuserLog varchar(100) = '{3}'

						IF(@recuser = '') BEGIN SET @recuser = '%' end
                        DELETE x
                        FROM [FPTI_NW].[NW_CompanyUserItemMappingWeb] x
                        WHERE  x.Company = @compTo 
                        AND x.SysUser LIKE @recuser
                        AND 
                        EXISTS(
	                        SELECT * FROM [FPTI].[CompanyUserMapping] b
	                        JOIN [FPTI].[CompanyUserMapping] c
	                        ON c.SysUser = b.SysUser AND c.Company = @compFrom
	                        WHERE x.Company = b.Company
	                        AND x.SysUser = b.SysUser
                        )


                        SELECT [Company]
                              ,[SysUser]
                              ,[Module]
                              ,[Item]
                              ,[CanAccess]
                              ,[CanAdd]
                              ,[CanEdit]
                              ,[CanDelete]
                              ,[CanSave]
                              ,[CanPrint]
                              ,[CanProcess]
                              ,[CanImport]
                              ,[CanExport]

                            ,[CanAccessRec]
                            ,[CanAddRec]
                            ,[CanEditRec]
                            ,[CanDeleteRec]
                            ,[CanSaveRec]
                            ,[CanPrintRec]
                            ,[CanProcessRec]
                            ,[CanImportRec]
                            ,[CanExportRec] 
                            
                                INTO #tempAccess FROM [FPTI_NW].[NW_CompanyUserItemMappingWeb]  WHERE 1=2

                        INSERT INTO #tempAccess 
                        ([Company]
                              ,[SysUser]
                              ,[Module]
                              ,[Item]
                              ,[CanAccess]
                              ,[CanAdd]
                              ,[CanEdit]
                              ,[CanDelete]
                              ,[CanSave]
                              ,[CanPrint]
                              ,[CanProcess]
                              ,[CanImport]
                              ,[CanExport]

                            ,[CanAccessRec]
                            ,[CanAddRec]
                            ,[CanEditRec]
                            ,[CanDeleteRec]
                            ,[CanSaveRec]
                            ,[CanPrintRec]
                            ,[CanProcessRec]
                            ,[CanImportRec]
                            ,[CanExportRec]
                            )
                        SELECT distinct @compTo [Company]
                              ,a.[SysUser]
                              ,a.[Module]
                              ,a.[Item]
                              ,a.[CanAccess]
                              ,a.[CanAdd]
                              ,a.[CanEdit]
                              ,a.[CanDelete]
                              ,a.[CanSave]
                              ,a.[CanPrint]
                              ,a.[CanProcess]
                              ,a.[CanImport]
                              ,a.[CanExport]

                                ,a.[CanAccessRec]
                            ,a.[CanAddRec]
                            ,a.[CanEditRec]
                            ,a.[CanDeleteRec]
                            ,a.[CanSaveRec]
                            ,a.[CanPrintRec]
                            ,a.[CanProcessRec]
                            ,a.[CanImportRec]
                            ,a.[CanExportRec]

                          FROM [FPTI_NW].[NW_CompanyUserItemMappingWeb] a 
                          JOIN [FPTI].[CompanyUserMapping] b 
                          ON b.Company = a.Company
                          JOIN [FPTI].[CompanyUserMapping] c
                          ON c.SysUser = b.SysUser AND c.Company = @compTo
                          WHERE a.Company = @compFrom
                          AND a.SysUser like @recuser
                          AND EXISTS(
	                       SELECT 1 FROM [FPTI].[CompanyUserMapping] b 
                          JOIN [FPTI].[CompanyUserMapping] c
                          ON c.SysUser = b.SysUser AND c.Company = @compTo
                          WHERE c.SysUser = a.SysUser 
                          AND c.SysUser LIKE @recuser
                          AND b.Company = a.Company 
                        )


                        INSERT INTO [FPTI_NW].[NW_CompanyUserItemMappingWeb] 
                        ([Company]
                              ,[SysUser]
                              ,[Module]
                              ,[Item]
                              ,[CanAccess]
                              ,[CanAdd]
                              ,[CanEdit]
                              ,[CanDelete]
                              ,[CanSave]
                              ,[CanPrint]
                              ,[CanProcess]
                              ,[CanImport]
                              ,[CanExport]

                                ,[CanAccessRec]
                            ,[CanAddRec]
                            ,[CanEditRec]
                            ,[CanDeleteRec]
                            ,[CanSaveRec]
                            ,[CanPrintRec]
                            ,[CanProcessRec]
                            ,[CanImportRec]
                            ,[CanExportRec]
                                )
                        SELECT * FROM #tempAccess

                        SELECT a.[SysUser] , b.Description  FROM #tempAccess a
                        LEFT JOIN fpti.[USER] b ON a.SysUser = b.Code 
                        GROUP BY [SysUser], b.Description
                       

					   
						BEGIN TRY  
							EXEC('UPDATE [FPTI_NW].[NW_CompanyUserItemMappingWeb] 
							SET [CanAccessRec] = '''+@recuserLog+'''
							  ,[CanAddRec] =    '''+@recuserLog+'''
							  ,[CanEditRec]     = '''+@recuserLog+'''
							  ,[CanDeleteRec]	= '''+@recuserLog+'''
							  ,[CanSaveRec]		= '''+@recuserLog+'''
							  ,[CanPrintRec]	= '''+@recuserLog+'''
							  ,[CanProcessRec]	= '''+@recuserLog+'''
							  ,[CanImportRec]	= '''+@recuserLog+'''
							  WHERE company = '''+@compTo+'''
							  AND SysUser IN ( SELECT a.[SysUser] FROM #tempAccess a GROUP BY a.[SysUser])')
						END TRY  
						BEGIN CATCH  
							
						END CATCH  
                        DROP TABLE #tempAccess





                        IF NOT EXISTS(SELECT TOP 1 1 FROM FPTI_NW.NW_CompanyUserItemMappingWeb_HDR WHERE [User] = @recuser AND Company = @compTo)
                        BEGIN

                        INSERT INTO FPTI_NW.NW_CompanyUserItemMappingWeb_HDR (Company, [User], Recuser, Recdate)
                        VALUES (@compTo, @recuser, @recuserLog, dbo.GetNoahDate())

                        END
                        ELSE
                        BEGIN

                        UPDATE FPTI_NW.NW_CompanyUserItemMappingWeb_HDR SET Moduser = @recuserLog, Moddate = dbo.GetNoahDate() WHERE [User] = @recuser AND Company = @compTo

                        END



                        ",  companyfrom,companyto,  user, recuser);

            DataTable dtRec = SFObjects.LoadDataTable(strSQl,_ConnectionString);

            for (int i = 0; i < dtRec.Rows.Count;i++ )
            {
                strResult += dtRec.Rows[i][0].ToString() + " | " + dtRec.Rows[i][1].ToString()+"\n"; 
            }

            if (strResult.Trim() != "")
            {
                strResult = "User successfully copied access:\n" + strResult;
            }
            else
            {
                strResult = "No user been transfer.";
            }
            return strResult;

        }
        public string GetAllData(string a, string b)
        {
            string xquery = string.Format(@"SELECT Count(*) from (select Distinct * from [FPTI].[fn_CompanyUserItemMappingWeb]('{0}','{1}')) a", a, b);
            return (SFObjects.returnText(xquery, _ConnectionString));
        }


        public System.Data.DataTable GetDataUser(string strCompany, string ss, string SortColumn, string SortOrder)
        {
        //    SqlCommand cmd = new SqlCommand();
        //    cmd.CommandText = "[FPTI_NW].[nsp_CompanyUserItemMappingWeb]";
        //    cmd.Parameters.Clear();
        //    cmd.Parameters.AddWithValue("@SysUser", ss);
        //    cmd.Parameters.AddWithValue("@Company", strCompany);
        //    cmd.Parameters.AddWithValue("@QueryType", 4);
        //    return base.ExecGetData(cmd, _ConnectionString, true);
            DataTable dtrecord = new DataTable();

            string SortBy = string.Empty;

            if (!string.IsNullOrEmpty(SortColumn) && !string.IsNullOrEmpty(SortOrder))
                SortBy = string.Format(@"ORDER BY {0} {1}", SortColumn, SortOrder);

            dtrecord = SFObjects.LoadDataTable(string.Format(@"
                    DECLARE @Company varchar(50) = '{1}'
                    DECLARE	@SysUser varchar(50) = '{0}'
                    DECLARE	@Module varchar(50) = NULL
                    DECLARE @QueryType int = 4
                    Select Distinct isNull(a.AppName, '') as Module, isNull(a.ItemID,'') as Item, a.ItemName [Description], 
	                cast(CanAccess as varchar(3)) [Can Access],
                    cast(CanAdd as varchar(3))   [Can Add],
                    cast(CanEdit as varchar(3))  [Can Edit],
                    cast(CanDelete as varchar(3)) [Can Delete],
                    cast(CanSave as varchar(3)) [Can Save],
                    cast(CanPrint as varchar(3)) [Can Print],
                    cast(CanProcess as varchar(3)) [Can Process],
                    cast(CanImport as varchar(3)) [Can Import],
                    cast(CanExport as varchar(3)) [Can Export]
                     ,CanAccessRec,CanAddRec		,CanEditRec		,CanDeleteRec	,CanSaveRec		,CanPrintRec	 	,CanProcessRec	,CanImportRec	,CanExportRec, a.ModuleCode 
	                from 
	                (select cmm.CompanyID, cmm.AppID, i.ItemID ,i.ItemName,q.AppName, q.Code [ModuleCode]  from FPTI_NW.noahweb_Application_Collection cmm
	                inner join FPTI_NW.noahweb_menuDriven i
	                ON cmm.AppID = i.ItemParentApplication left join FPTI_NW.noahweb_Application_Info q on cmm.AppID = q.code  where i.ItemType = '1') a

	                left join FPTI_NW.NW_CompanyUserItemMappingWeb  cuim
	                ON a.ItemID = cuim.Item and cuim.SysUser=@SysUser and a.CompanyID=cuim.Company AND a.AppID = cuim.Module
	                where a.CompanyID = @Company  and isNull(a.ItemID,'') <> ''
                    {2}", ss.Replace("'", "''"), strCompany.Replace("'", "''"), SortBy)
                                              , _ConnectionString);



            if (dtrecord.Columns.Count <= 0)
            {
                dtrecord = SFObjects.LoadDataTable(string.Format(@"
                    DECLARE @Company varchar(50) = '{1}'
                    DECLARE	@SysUser varchar(50) = '{0}'
                    DECLARE	@Module varchar(50) = NULL
                    DECLARE @QueryType int = 4
                    Select Distinct isNull(a.AppName, '') as Module, isNull(a.ItemID,'') as Code, a.ItemName, 
	                cast(CanAccess as varchar(3)) [Can Access],
                    cast(CanAdd as varchar(3))   [Can Add],
                    cast(CanEdit as varchar(3))  [Can Edit],
                    cast(CanDelete as varchar(3)) [Can Delete],
                    cast(CanSave as varchar(3)) [Can Save],
                    cast(CanPrint as varchar(3)) [Can Print],
                    cast(CanProcess as varchar(3)) [Can Process],
                    cast(CanImport as varchar(3)) [Can Import],
                    cast(CanExport as varchar(3)) [Can Export]
	                from 
	                (select cmm.CompanyID, cmm.AppID, i.ItemID ,i.ItemName,q.AppName  from FPTI_NW.noahweb_Application_Collection cmm
	                inner join FPTI_NW.noahweb_menuDriven i
	                ON cmm.AppID = i.ItemParentApplication left join FPTI_NW.noahweb_Application_Info q on cmm.AppID = q.code  where i.ItemType = '1') a

	                left join FPTI_NW.NW_CompanyUserItemMappingWeb  cuim
	                ON a.ItemID = cuim.Item and cuim.SysUser=@SysUser and a.CompanyID=cuim.Company AND a.AppID = cuim.Module
	                where a.CompanyID = @Company and isNull(a.ItemID,'') <> '' ", ss.Replace("'", "''"), strCompany.Replace("'", "''"))
                                                    , _ConnectionString);

            }




            return dtrecord;
        }

        public string Update(System.Data.DataTable dt, string xSysuser, string item, string xCompany, string module)
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


        public bool IsValidUser(string recuser,string company)
        {
            return SFObjects.returnText(string.Format(@"SELECT 
     count([SysUser])  [SysUser]
  FROM [FPTI].[CompanyUserMapping]
where [SysUser] = '{0}' and company='{1}' ", recuser, company), _ConnectionString) == "0" ? false : true ;
        }

        public bool CheckHasAccess(string User)
        {

            return Parser.ParseInt(SFObjects.returnText(string.Format("SELECT HasAccessToUtility FROM FPTI.[User] WHERE Code = '{0}'", User), _ConnectionString)).Equals(0);

        }

        public bool CheckConfig()
        {

            return Parser.ParseInt(SFObjects.returnText(@"SELECT [value] FROM [dbo].[SystemConfig] WHERE code ='COMPADMIN'", _ConnectionString)).Equals(1);

        }

        public DataTable LoadHDR(string Company, string User)
        {

            return SFObjects.LoadDataTable(string.Format(@"SELECT TOP 1 rec.Description [Recuser], FORMAT(hdr.Recdate, 'MM/dd/yyyy HH:mm:ss tt') [Recdate], 
                    [mod].Description [Moduser], FORMAT(hdr.Moddate, 'MM/dd/yyyy HH:mm:ss tt') [Moddate] FROM FPTI_NW.NW_CompanyUserItemMappingWeb_HDR hdr
                    LEFT JOIN FPTI.[User] [rec] ON hdr.Recuser = rec.Code
                    LEFT JOIN FPTI.[User] [mod] ON hdr.Moduser = [mod].Code
                    WHERE hdr.Company = '" + Company + "' AND hdr.[User] = '" + User + "'"), _ConnectionString);


        }

    }
}
