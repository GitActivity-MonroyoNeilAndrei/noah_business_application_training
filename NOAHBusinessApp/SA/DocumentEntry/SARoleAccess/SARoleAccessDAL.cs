using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;


namespace DALComponent
{
    public class SARoleAccessDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        private string _ConnectionString;
        public readonly string LISTINGFILENAME = "",
                                GETCOMPANY = "",
                                errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code",                                    //--column for searching
                                inquireQry = "Select Code, Description from FPTI.Roles", //--query of inquire button
                                listingName = "Roles Access Listing",                              //--form name of listings
                                listingQry = "select Code, Description, Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] from FPTI.Company"; //--query of export and print
        public readonly int LISTINGSTARTROW = 6;                                       //--default start row

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        #region STANDARD

        public string MenuItemCode = "NWADMIN_ROLEACCESS"; // This is default parameter  for version
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

        public SARoleAccessDAL(string ConnectionString, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            this.CurrentSelectedItem = selectedItem;
        }

        public string ConnectionString { get { return _ConnectionString; } }

        public DataTable GetSchema()
        {
            return SFObjects.LoadDataTable("select * from FPTI.CompanyRolesItemMapping  where 1 != 1", _ConnectionString);
        }

        public DataTable GetSchemaLin()
        {
            return SFObjects.LoadDataTable("select * from [fpti].[CompanyUserMapping] where 1 != 1", _ConnectionString);
        }
        public DataTable GetSchemaLin2()
        {
            return SFObjects.LoadDataTable("select * from [FPTI].[CompanyModuleMapping] where 1 != 1", _ConnectionString);
        }
        
        public string Historical(string Company, string Role)
        {
            return string.Format($@"EXEC [FPTI_NW].[nsp_CompanyRolesItemMappingWeb_Hist] @QueryType = 0, @Company = '{Company}',@Roles = '{Role}'  ");
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

        public string SaveDataWeb(System.Data.DataTable dt, bool isNew,string user)
        {

            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();


            cmd = new SqlCommand();
            cmd.Parameters.Clear();
            cmd.CommandText = "[FPTI_NW].[nsp_CompanyRolesItemMappingWeb]";
            cmd.Parameters.AddWithValue("@Company", dt.Rows[0]["Company"].ToString());
            cmd.Parameters.AddWithValue("@Roles", dt.Rows[0]["Roles"].ToString());
            cmd.Parameters.AddWithValue("@Recuser", user);
            cmd.Parameters.AddWithValue("@QueryType", 16);
            cmdList.Add(cmd);

            foreach (DataRow dr in dt.Rows)
            {
                cmd = new SqlCommand();
                bool isnewrec = isNewRec(dr["Roles"].ToString(), dr["Company"].ToString(), dr["Module"].ToString(), dr["Item"].ToString());
                cmd.Parameters.Clear();
                cmd.CommandText = "[FPTI_NW].[nsp_CompanyRolesItemMappingWeb]";
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

            cmd = new SqlCommand();
            cmd.Parameters.Clear();
            cmd.CommandText = "[FPTI_NW].[nsp_CompanyRolesItemMappingWeb_Hist]";
            cmd.Parameters.AddWithValue("@Company", dt.Rows[0]["Company"]);
            cmd.Parameters.AddWithValue("@Roles", dt.Rows[0]["Roles"]); 
            cmd.Parameters.AddWithValue("@Moduser", user);
            cmd.Parameters.AddWithValue("@QueryType", 1);
            cmdList.Add(cmd);
            
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


        public System.Data.DataTable GetExportData(string Company, string Roles)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyRolesItemMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Company", Company);
            cmd.Parameters.AddWithValue("@Roles", Roles);
            cmd.Parameters.AddWithValue("@QueryType", 16);
            return base.ExecGetData(cmd, _ConnectionString);
        }

        public System.Data.DataTable GetDataModule()
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI].[pCompanyRolesItemMapping]";
            cmd.Parameters.Clear();
           // cmd.Parameters.AddWithValue("@Company", strCompany);
            cmd.Parameters.AddWithValue("@QueryType", 0);
            return base.ExecGetData(cmd, _ConnectionString, true);
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
            cmd.CommandText = "[FPTI_NW].[nw_Role]";
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



        public DataTable GetDataWithFilter(string company, string role, string option, string search)
        {
            string xquery = "";
            string xWhere = "1=2";
            search = search.Replace("'","''");
            //if(option.ToUpper().Contains("MODULE"))
            //{
            //    xWhere = string.Format(@" module like '%{0}%'", search);
            //}
            //else if(option.ToUpper().Contains("ITEM"))
            //{
            //    xWhere = string.Format(@" code like '%{0}%'", search);
            //}
            //else if(option.ToUpper().Contains("DESCRIPTION"))
            //{
            //    xWhere = string.Format(@" ItemName like '%{0}%'", search);
            //}
            //else if (option.ToUpper().Contains("CAN"))
            //{
            //    xquery = string.Format(@"(CASE WHEN ISNULL(Can{1},'0') = '0' THEN '0' WHEN LEN(Can{1}) >= 1 THEN '1' ELSE '0'  END)  LIKE 
            //                (CASE WHEN lower('{0}') = 'true' OR lower('{0}') = '1' OR lower('{0}') = 'checked' OR lower('{0}') = 'check' OR lower('{0}') = 'yes' THEN '1' ELSE '0' END) ", search);
            //    if (option.ToUpper().Contains("ACCESS"))
            //    {
            //        xWhere = string.Format(xquery, search, "Access");
            //    }
            //    else if (option.ToUpper().Contains("ADD"))
            //    {
            //        xWhere = string.Format(xquery, search, "Add");
            //    }
            //    else if (option.ToUpper().Contains("EDIT"))
            //    {
            //        xWhere = string.Format(xquery, search, "Edit");
            //    }
            //    else if (option.ToUpper().Contains("DELETE"))
            //    {
            //        xWhere = string.Format(xquery, search, "Delete");
            //    }
            //    else if (option.ToUpper().Contains("SAVE"))
            //    {
            //        xWhere = string.Format(xquery, search, "Save");
            //    }
            //    else if (option.ToUpper().Contains("PRINT"))
            //    {
            //        xWhere = string.Format(xquery, search, "Print");
            //    }
            //    else if (option.ToUpper().Contains("PROCESS"))
            //    {
            //        xWhere = string.Format(xquery, search, "Process");
            //    }
            //    else if (option.ToUpper().Contains("IMPORT"))
            //    {
            //        xWhere = string.Format(xquery, search, "Import");
            //    }
            //    else if (option.ToUpper().Contains("EXPORT"))
            //    {
            //        xWhere = string.Format(xquery, search, "Export");
            //    }
            //}
            //else
            //{
            //    xWhere = "1=2";
            //}


            if (search.ToLower() == "yes" || search.ToLower() == "true")
            {
                search = "'checked=\"checked\"'";
            }
            else if (search.ToLower() == "no" || search.ToLower() == "false")
                search = "''";
            else if (option != "Module" && option != "Item" && option != "Description")
                search = "'' OR '' = ''";

            if (option == "Module")
            {
                if (search != string.Empty)
                {
                    search = " module LIKE '%" + search + "%'";
                }
            }
            else if (option == "Item")
            {
                if (search != string.Empty)
                {
                    search = " code LIKE '%" + search + "%'";
                }
            }
            else if (option == "Description")
            {
                if (search != string.Empty)
                {
                    search = " ItemName LIKE '%" + search + "%'";
                }
            }
            else if (option == "Can Access")
                search = " CanAccess = " + search;
            else if (option == "Can Add")
                search = " CanAdd = " + search;
            else if (option == "Can Edit")
                search = " CanEdit = " + search;
            else if (option == "Can Delete")
                search = " CanDelete = " + search;
            else if (option == "Can Save")
                search = " CanSave = " + search;
            else if (option == "Can Print")
                search = " CanPrint = " + search;
            else if (option == "Can Process")
                search = " CanProcess = " + search;
            else if (option == "Can Import")
                search = " CanImport = " + search;
            else if (option == "Can Export")
                search = " CanExport = " + search;


            if (search != string.Empty)
                search += " and ";


            xquery = string.Format(@"select Distinct Module,Code,ItemName [Item Name]
                    ,CASE WHEN ISNULL(CanAccess,'0') = '0' THEN '0' WHEN LEN(CanAccess) >= 1 THEN '1' ELSE '0' END  [Can Access]
                    ,CASE WHEN ISNULL(CanAdd,'0') = '0' THEN '0' WHEN LEN(CanAdd) >= 1 THEN '1' ELSE '0'  END [Can Add]
                    ,CASE WHEN ISNULL(CanEdit,'0') = '0' THEN '0' WHEN LEN(CanEdit) >= 1 THEN '1' ELSE '0'  END [Can Edit] 
                    ,CASE WHEN ISNULL(CanDelete,'0') = '0' THEN '0' WHEN LEN(CanDelete) >= 1 THEN '1' ELSE '0'  END [Can Delete] 
                    ,CASE WHEN ISNULL(CanSave,'0') = '0' THEN '0' WHEN LEN(CanSave) >= 1 THEN '1' ELSE '0'  END [Can Save] 
                    ,CASE WHEN ISNULL(CanPrint,'0') = '0' THEN '0' WHEN LEN(CanPrint) >= 1 THEN '1' ELSE '0'  END [Can Print] 
                    ,CASE WHEN ISNULL(CanProcess,'0') = '0' THEN '0' WHEN LEN(CanProcess) >= 1 THEN '1' ELSE '0'  END [Can Process] 
                    ,CASE WHEN ISNULL(CanImport,'0') = '0' THEN '0' WHEN LEN(CanImport) >= 1 THEN '1' ELSE '0'  END [Can Import] 
                    ,CASE WHEN ISNULL(CanExport,'0') = '0' THEN '0' WHEN LEN(CanExport) >= 1 THEN '1' ELSE '0'  END [Can Export] 
                    from FPTI.fn_CompanyRolesItemMappingWeb('{0}','{1}') where {2} Code <> '' ", company.Replace("'","''"),role.Replace("'","''"), search); 

            return SFObjects.LoadDataTable(xquery, _ConnectionString);
        }

        public DataTable GetDataWithFilterExport(string company, string role, string option, string search)
        {
            string xquery = "";
            string xWhere = "1=2";
            search = search.Replace("'", "''");
            //if(option.ToUpper().Contains("MODULE"))
            //{
            //    xWhere = string.Format(@" module like '%{0}%'", search);
            //}
            //else if(option.ToUpper().Contains("ITEM"))
            //{
            //    xWhere = string.Format(@" code like '%{0}%'", search);
            //}
            //else if(option.ToUpper().Contains("DESCRIPTION"))
            //{
            //    xWhere = string.Format(@" ItemName like '%{0}%'", search);
            //}
            //else if (option.ToUpper().Contains("CAN"))
            //{
            //    xquery = string.Format(@"(CASE WHEN ISNULL(Can{1},'0') = '0' THEN '0' WHEN LEN(Can{1}) >= 1 THEN '1' ELSE '0'  END)  LIKE 
            //                (CASE WHEN lower('{0}') = 'true' OR lower('{0}') = '1' OR lower('{0}') = 'checked' OR lower('{0}') = 'check' OR lower('{0}') = 'yes' THEN '1' ELSE '0' END) ", search);
            //    if (option.ToUpper().Contains("ACCESS"))
            //    {
            //        xWhere = string.Format(xquery, search, "Access");
            //    }
            //    else if (option.ToUpper().Contains("ADD"))
            //    {
            //        xWhere = string.Format(xquery, search, "Add");
            //    }
            //    else if (option.ToUpper().Contains("EDIT"))
            //    {
            //        xWhere = string.Format(xquery, search, "Edit");
            //    }
            //    else if (option.ToUpper().Contains("DELETE"))
            //    {
            //        xWhere = string.Format(xquery, search, "Delete");
            //    }
            //    else if (option.ToUpper().Contains("SAVE"))
            //    {
            //        xWhere = string.Format(xquery, search, "Save");
            //    }
            //    else if (option.ToUpper().Contains("PRINT"))
            //    {
            //        xWhere = string.Format(xquery, search, "Print");
            //    }
            //    else if (option.ToUpper().Contains("PROCESS"))
            //    {
            //        xWhere = string.Format(xquery, search, "Process");
            //    }
            //    else if (option.ToUpper().Contains("IMPORT"))
            //    {
            //        xWhere = string.Format(xquery, search, "Import");
            //    }
            //    else if (option.ToUpper().Contains("EXPORT"))
            //    {
            //        xWhere = string.Format(xquery, search, "Export");
            //    }
            //}
            //else
            //{
            //    xWhere = "1=2";
            //}


            if (search.ToLower() == "yes" || search.ToLower() == "true")
            {
                search = "'checked=\"checked\"'";
            }
            else if (search.ToLower() == "no" || search.ToLower() == "false")
                search = "''";
            else if (option != "Module" && option != "Item" && option != "Description")
                search = "'' OR '' = ''";

            if (option == "Module")
            {
                if (search != string.Empty)
                {
                    search = " [main].module LIKE '%" + search + "%'";
                }
            }
            else if (option == "Item")
            {
                if (search != string.Empty)
                {
                    search = " [main].code LIKE '%" + search + "%'";
                }
            }
            else if (option == "Description")
            {
                if (search != string.Empty)
                {
                    search = " [main].ItemName LIKE '%" + search + "%'";
                }
            }
            else if (option == "Can Access")
                search = " [main].CanAccess = " + search;
            else if (option == "Can Add")
                search = " [main].CanAdd = " + search;
            else if (option == "Can Edit")
                search = " [main].CanEdit = " + search;
            else if (option == "Can Delete")
                search = " [main].CanDelete = " + search;
            else if (option == "Can Save")
                search = " [main].CanSave = " + search;
            else if (option == "Can Print")
                search = " [main].CanPrint = " + search;
            else if (option == "Can Process")
                search = " [main].CanProcess = " + search;
            else if (option == "Can Import")
                search = " [main].CanImport = " + search;
            else if (option == "Can Export")
                search = " [main].CanExport = " + search;


            if (search != string.Empty)
                search += " and ";


            xquery = string.Format(@"select Distinct [main].Module,[main].Code,[main].ItemName [Item Name]
                    ,CASE WHEN ISNULL([main].CanAccess,'0') = '0' THEN 'No' WHEN LEN([main].CanAccess) >= 1 THEN 'Yes' ELSE 'No' END  [Can Access]
                    ,CASE WHEN ISNULL([main].CanAdd,'0') = '0' THEN 'No' WHEN LEN([main].CanAdd) >= 1 THEN 'Yes' ELSE 'No'  END [Can Add]
                    ,CASE WHEN ISNULL([main].CanEdit,'0') = '0' THEN 'No' WHEN LEN([main].CanEdit) >= 1 THEN 'Yes' ELSE 'No'  END [Can Edit] 
                    ,CASE WHEN ISNULL([main].CanDelete,'0') = '0' THEN 'No' WHEN LEN([main].CanDelete) >= 1 THEN 'Yes' ELSE 'No'  END [Can Delete] 
                    ,CASE WHEN ISNULL([main].CanSave,'0') = '0' THEN 'No' WHEN LEN([main].CanSave) >= 1 THEN 'Yes' ELSE 'No'  END [Can Save] 
                    ,CASE WHEN ISNULL([main].CanPrint,'0') = '0' THEN 'No' WHEN LEN([main].CanPrint) >= 1 THEN 'Yes' ELSE 'No'  END [Can Print] 
                    ,CASE WHEN ISNULL([main].CanProcess,'0') = '0' THEN 'No' WHEN LEN([main].CanProcess) >= 1 THEN 'Yes' ELSE 'No'  END [Can Process] 
                    ,CASE WHEN ISNULL([main].CanImport,'0') = '0' THEN 'No' WHEN LEN([main].CanImport) >= 1 THEN 'Yes' ELSE 'No'  END [Can Import] 
                    ,CASE WHEN ISNULL([main].CanExport,'0') = '0' THEN 'No' WHEN LEN([main].CanExport) >= 1 THEN 'Yes' ELSE 'No'  END [Can Export]
                    ,isnull([rec].Description,rolehdr.Recuser) [Created By], FORMAT(rolehdr.Recdate, 'MM/dd/yyyy HH:mm:ss tt') [Date Created]
                    ,isnull([mod].Description,rolehdr.Moduser) [Modified By], FORMAT(rolehdr.Moddate, 'MM/dd/yyyy HH:mm:ss tt') [Date Modified]
                    from FPTI.fn_CompanyRolesItemMappingWeb('{0}','{1}') [main]
                    LEFT JOIN FPTI_NW.NW_CompanyRolesItemMappingWeb_HDR rolehdr ON rolehdr.Company = '{0}' AND rolehdr.Role = '{1}'
                    LEFT JOIN FPTI.[User] [rec] ON rolehdr.Recuser = rec.Code
                    LEFT JOIN FPTI.[User] [mod] ON rolehdr.Moduser = [mod].Code
                    where {2} [main].Code <> '' ", company.Replace("'", "''"), role.Replace("'", "''"), search);

            return SFObjects.LoadDataTable(xquery, _ConnectionString);
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

        public DataTable LoadHDR(string Company, string Role) {

            return SFObjects.LoadDataTable(string.Format(@"SELECT TOP 1 rec.Description [Recuser], FORMAT(hdr.Recdate, 'MM/dd/yyyy HH:mm:ss tt') [Recdate], 
                    [mod].Description [Moduser], FORMAT(hdr.Moddate, 'MM/dd/yyyy HH:mm:ss tt') [Moddate] FROM FPTI_NW.NW_CompanyRolesItemMappingWeb_HDR hdr
                    LEFT JOIN FPTI.[User] [rec] ON hdr.Recuser = rec.Code
                    LEFT JOIN FPTI.[User] [mod] ON hdr.Moduser = [mod].Code
                    WHERE hdr.Company = '" + Company + "' AND hdr.Role = '" + Role + "'"), _ConnectionString);


        }


    }
}
