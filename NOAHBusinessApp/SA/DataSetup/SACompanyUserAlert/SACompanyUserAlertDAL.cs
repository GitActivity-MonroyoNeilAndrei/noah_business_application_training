using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;


namespace DALComponent
{
    public class SACompanyUserAlertDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        private string _ConnectionString;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code",                                       //--column for searching
                                inquireQry = "Select Code, Description from FPTI.Roles", //--query of inquire button
                                listingName = "FG UOM Listing",                              //--form name of listings
                                listingQry = "select Code, Description, Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] from FPTI.Company"; //--query of export and print
        public readonly int listingStartRow = 6;                                       //--default start row

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator


        #region STANDARD

        public string MenuItemCode = "NWADMIN_USERALERT"; // This is default parameter  for version
        public string MenuItemVersion = "9.0.0.2";// This is default parameter for version 
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

        public SACompanyUserAlertDAL(string ConnectionString, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            this.CurrentSelectedItem = selectedItem;
        }

        public string ConnectionString { get { return _ConnectionString; } }

        public DataTable GetSchema()
        {
            return SFObjects.LoadDataTable("select * from FPTI.CompanyUserAlertMapping  where 1 != 1", _ConnectionString);
        }

        public DataTable GetSchemaLin()
        {
            return SFObjects.LoadDataTable("select * from [fpti].[CompanyUserMapping] where 1 != 1", _ConnectionString);
        }
        public DataTable GetSchemaLin2()
        {
            return SFObjects.LoadDataTable("select * from [FPTI].[CompanyModuleMapping] where 1 != 1", _ConnectionString);
        }


        public bool isNewRec(string Roles, string company, string module, string item)
        {

            string xquery = string.Format(@"select 1 from FPTI.CompanyRolesItemMapping
                                                   where Roles='{0}' and Company='{1}' and Module='{2}' and Item='{3}'", Roles, company, module, item);

            if (SFObjects.returnText(xquery, _ConnectionString) == "1")
                return false;
            else
                return true;
        }


        public string SaveData(System.Data.DataTable dt, bool isNew)
        {
 
            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            foreach (DataRow dr in dt.Rows)
            {
                cmd = new SqlCommand();
                bool isnewrec = isNewRec(dr["Roles"].ToString(), dr["Company"].ToString(), dr["Module"].ToString(), dr["Item"].ToString());
                cmd.Parameters.Clear();
                cmd.CommandText = "[FPTI_NW].[nw_CompanyRolesItemMapping]";
                cmd.Parameters.AddWithValue("@Company", dr["Company"].ToString());
                cmd.Parameters.AddWithValue("@Roles", dr["Roles"].ToString());
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
                cmd.Parameters.AddWithValue("@QueryType", 6);
                cmdList.Add(cmd);
            }
           return base.ExecProcedure(cmdList, _ConnectionString);
        }

        public string SaveDataWeb(System.Data.DataTable dt, bool isNew)
        {

            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            foreach (DataRow dr in dt.Rows)
            {
                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandText = "[FPTI_NW].[nsp_CompanyRolesItemMappingWeb]";
                cmd.Parameters.AddWithValue("@Company", dr["Company"].ToString());
                cmd.Parameters.AddWithValue("@Roles", dr["SysUser"].ToString());
                cmd.Parameters.AddWithValue("@Module", dr["Alert"].ToString());
                cmd.Parameters.AddWithValue("@QueryType", 6);
                cmdList.Add(cmd);
            }
            return base.ExecProcedure(cmdList, _ConnectionString);
        }

        public string DeleteData(string Code)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI].[pRole]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Code", Code);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public System.Data.DataTable GetData()
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI].[pRole]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@QueryType", 0);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        
        public System.Data.DataTable GetInitializeGrid()
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyUserAlertMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@QueryType", 0);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        public System.Data.DataTable LoadAlert(string Company, string Type, string Filter, string User)
        {
            //SqlCommand cmd = new SqlCommand();
            //cmd.CommandText = "[FPTI_NW].[nw_CompanyUserAlertMapping]";
            //cmd.Parameters.Clear();
            //cmd.Parameters.AddWithValue("@Company", company);
            //cmd.Parameters.AddWithValue("@QueryType",5);
            //return base.ExecGetData(cmd, _ConnectionString, true);

            string Qry = "";
            string where = "";
            string Col = "";

            if (Filter != "")
            {

                if (Type == "1")
                    Col = "Code";
                else
                    Col = "Description";

                where += " AND WHERE " + Col + " LIKE '%" + Filter + "%' ";

            }

            Qry = string.Format(@"Select IIF(b.Alert IS NOT NULL, 1, 0) [Select],a.Code, a.Description  From FPTI.CompanyAlert a 
                                LEFT JOIN FPTI.CompanyUserAlertMapping b ON a.Code = b.Alert AND a.Company = b.Company AND b.SysUser = '{2}'
                                WHERE a.Company = '{0}' {1} ", Company, where, User);

            return SFObjects.LoadDataTable(Qry, _ConnectionString);

        }

        public System.Data.DataTable GetFilteredLoadGrid(string company, string user, string combobox,string insearch) {

            string xquery = string.Format(@"SELECT alert FROM FPTI.CompanyUserAlertMapping a
		                                    where a.SysUser = '{1}' and a.Company = '{0}'", company, user);
            return (SFObjects.LoadDataTable(xquery, _ConnectionString));
        
        }


        public System.Data.DataTable GetLoadGrid(string company,string user)
        {

            string xquery = string.Format(@"SELECT alert FROM FPTI.CompanyUserAlertMapping a
		                                    where a.SysUser = '{1}' and a.Company = '{0}'", company, user);
            return (SFObjects.LoadDataTable(xquery, _ConnectionString));
        }



        public System.Data.DataTable GetDataCopyFrom(string b, string c)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyRolesItemMapping]";
            cmd.Parameters.Clear();
             cmd.Parameters.AddWithValue("@Roles", b);
             cmd.Parameters.AddWithValue("@Company", c);
            cmd.Parameters.AddWithValue("@QueryType", 4);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        public System.Data.DataTable GetDataCopyFromweb(string b, string c)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nsp_CompanyRolesItemMappingWeb]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Roles", b);
            cmd.Parameters.AddWithValue("@Company", c);
            cmd.Parameters.AddWithValue("@QueryType", 4);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        public System.Data.DataTable GetUser(string strCompany)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyModuleMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Company", strCompany);
            cmd.Parameters.AddWithValue("@QueryType", 5);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        public System.Data.DataTable GetDataRoles(string strCompany,string ss)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyRolesItemMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Roles", ss);
            cmd.Parameters.AddWithValue("@Company", strCompany);
            cmd.Parameters.AddWithValue("@QueryType", 4);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        public System.Data.DataTable GetDataRolesWeb(string strCompany, string ss)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nsp_CompanyRolesItemMappingWeb]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Roles", ss);
            cmd.Parameters.AddWithValue("@Company", strCompany);
            cmd.Parameters.AddWithValue("@QueryType", 4);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        public System.Data.DataTable GetPage(string strCompany, string ss, int based, int totalpage, string module,int db, string filtertype)
        {

            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyRolesItemMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Roles", ss);
            cmd.Parameters.AddWithValue("@Module", module);
            cmd.Parameters.AddWithValue("@Company", strCompany);
            cmd.Parameters.AddWithValue("@FilterType", filtertype);
            cmd.Parameters.AddWithValue("@frompage", based);
            cmd.Parameters.AddWithValue("@topage", totalpage);
            cmd.Parameters.AddWithValue("@QueryType", db);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }
        public System.Data.DataTable GetPageWeb(string strCompany, string ss, int based, int totalpage, string module, int db, string filtertype)
        {

            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyRolesItemMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Roles", ss);
            cmd.Parameters.AddWithValue("@Module", module);
            cmd.Parameters.AddWithValue("@Company", strCompany);
            cmd.Parameters.AddWithValue("@FilterType", filtertype);
            cmd.Parameters.AddWithValue("@frompage", based);
            cmd.Parameters.AddWithValue("@topage", totalpage);
            cmd.Parameters.AddWithValue("@QueryType", db);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

    

        public System.Data.DataTable GetDataExport()
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI].[pRole]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@QueryType", 5);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        public System.Data.DataTable GetDataFilter(string strCompany, string ss, string text,string filtertype)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyRolesItemMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Filter", text);
            cmd.Parameters.AddWithValue("@Roles", ss);
            cmd.Parameters.AddWithValue("@Filtertype", filtertype);
            cmd.Parameters.AddWithValue("@Company", strCompany);
            cmd.Parameters.AddWithValue("@QueryType",5);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }
        public System.Data.DataTable GetDataFilterWeb(string strCompany, string ss, string text, string filtertype)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nsp_CompanyRolesItemMappingWeb]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Filter", text);
            cmd.Parameters.AddWithValue("@Roles", ss);
            cmd.Parameters.AddWithValue("@Filtertype", filtertype);
            cmd.Parameters.AddWithValue("@Company", strCompany); 
            cmd.Parameters.AddWithValue("@QueryType", 5);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        public string GetAllData(string a,string b) { 
           string xquery = string.Format(@"SELECT Count(*) from (select Distinct * from [FPTI].[fn_CompanyRoleItemMapping]('{0}','{1}')) a",a,b);
           return (SFObjects.returnText(xquery, _ConnectionString));
        }
        public string GetAllDataweb(string a, string b)
        {
            string xquery = string.Format(@"SELECT Count(*) from (select Distinct * from [FPTI].[fn_CompanyRolesItemMappingWeb]('{0}','{1}')) a", a, b);
            return (SFObjects.returnText(xquery, _ConnectionString));
        }
        public string GetAllFilterData(string a, string b, string x, string z)
        {
            string xquery = string.Format(@"SELECT Count(*) from (select Distinct * from [FPTI].[fn_CompanyRoleItemMapping]('{0}','{1}')where (module like '%{2}%' and 'Module' = '{3}')or 
            (Code like '%{2}%' and 'Item' = '{3}') or (Description like '%{2}%' and 'Description' = '{3}') or (CanAccess like '%{2}%' and 'Can Access' = '{3}') 
            or (CanAdd like '%{2}%' and 'Can Add'='{3}') or (CanEdit  like  '%{2}%' and 'Can Edit' = '{3}') or (CanDelete like '%{2}%' and 'Can Delete' = '{3}')
            or (CanExport  like '%{2}%' and 'Can Export' = '{3}') or (CanImport like '%{2}%' and 'Can Import' = '{3}') or (CanPrint like '%{2}%' and 'Can Print' = '{3}')
            or  (CanProcess  like '%{2}%' and 'Can Process' = '{3}') or (CanSave  like '%{2}%' and 'Can Process' = '{3}') 
            ) a", a, b, x, z);
            return (SFObjects.returnText(xquery, _ConnectionString));
        }
        public string GetAllFilterDataWeb(string a, string b, string x, string z)
        {
            string xquery = string.Format(@"SELECT Count(*) from (select Distinct * from FPTI.fn_CompanyRolesItemMappingWeb('{0}','{1}')where (module like '%{2}%' and 'Module' = '{3}')or 
            (Code like '%{2}%' and 'Item' = '{3}') or (ItemName like '%{2}%' and 'Description' = '{3}') or (CanAccess like '%{2}%' and 'Can Access' = '{3}') 
            or (CanAdd like '%{2}%' and 'Can Add'='{3}') or (CanEdit  like  '%{2}%' and 'Can Edit' = '{3}') or (CanDelete like '%{2}%' and 'Can Delete' = '{3}')
            or (CanExport  like '%{2}%' and 'Can Export' = '{3}') or (CanImport like '%{2}%' and 'Can Import' = '{3}') or (CanPrint like '%{2}%' and 'Can Print' = '{3}')
            or  (CanProcess  like '%{2}%' and 'Can Process' = '{3}') or (CanSave  like '%{2}%' and 'Can Process' = '{3}') 
            ) a", a, b, x, z);
            return (SFObjects.returnText(xquery, _ConnectionString));
        }
        public string Update(System.Data.DataTable dt, string xSysuser, string item, string xCompany, string module)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            foreach (DataRow dr in dt.Rows)
            {
                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandText = "[FPTI_NW].[nsp_CompanyRolesItemMappingWeb]";
                cmd.Parameters.AddWithValue("@Company", xCompany.ToString());
                cmd.Parameters.AddWithValue("@Roles", xSysuser.ToString());
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
                cmd.Parameters.AddWithValue("@QueryType", 14);
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
                cmd.CommandText = "[FPTI_NW].[nsp_CompanyRolesItemMappingWeb]";
                cmd.Parameters.AddWithValue("@Company", xCompany.ToString());
                cmd.Parameters.AddWithValue("@Roles", xSysuser.ToString());
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
                cmd.Parameters.AddWithValue("@QueryType", 15);
                cmdList.Add(cmd);
            }

            return base.ExecProcedure(cmdList, _ConnectionString);
        }


        public DataTable LoadHDR(string Company, string User)
        {
            string xquery = string.Format(@"EXEC FPTI_NW.nsp_CompanyUserAlertMapping @Company = '{0}', @User = '{1}', @QueryType = 0", Company, User);
            return SFObjects.LoadDataTable(xquery, _ConnectionString);
        }





    }
}
