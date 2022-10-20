using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;


namespace DALComponent
{
    public class SACompanyRoleAssignDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        private string _ConnectionString;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "ID",  
                                getCompany = "",
            //--column for searching
                              //  inquireQry = "Select Code, Description from FPTI.Company", //--query of inquire button
                                listingName = "FG UOM Listing",                              //--form name of listings
                                listingQry = "select Code, Description, Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] from FPTI.Company"; //--query of export and print
        public readonly int listingStartRow = 6;                                       //--default start row

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public string focusRecordPK;


        #region STANDARD

        public string MenuItemCode = "NWADMIN_ROLESCOMPANY"; // This is default parameter  for version
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


        public SACompanyRoleAssignDAL(string ConnectionString, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            this.CurrentSelectedItem = selectedItem;
        }

        public string ConnectionString { get { return _ConnectionString; } }

        public DataTable GetSchema()
        {
            return SFObjects.LoadDataTable("select * from FPTI.Company where 1 != 1", _ConnectionString);
        }

        public DataTable GetSchemaLin()
        {
            return SFObjects.LoadDataTable("select * from FPTI.RolesUser where 1 != 1", _ConnectionString);
        }
        public DataTable GetSchemaLin2()
        {
            return SFObjects.LoadDataTable("select * from [FPTI].[CompanyModuleMapping] where 1 != 1", _ConnectionString);
        }

        public string SaveData(System.Data.DataTable dtLin2, bool isNew, string company, string role, string Recuser)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();

            SqlCommand cmd = new SqlCommand();
            string code="";

                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandText = "[FPTI_NW].[nw_CompanyRolesItemMapping]";
                cmd.Parameters.AddWithValue("@Code", role);
                cmd.Parameters.AddWithValue("@Company", company);
                cmd.Parameters.AddWithValue("@Recuser", Recuser);
                cmd.Parameters.AddWithValue("@Moduser", Recuser);
                cmd.Parameters.AddWithValue("@QueryType", isNew ? 19 : 8);
                cmdList.Add(cmd);

            if (dtLin2.Rows.Count >= 1) { 
            foreach (DataRow drLin2 in dtLin2.Rows)
                {
                    cmd = new SqlCommand();
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[FPTI_NW].[nw_Role]";
                    cmd.Parameters.AddWithValue("@Code", drLin2["Roles"]);
                    cmd.Parameters.AddWithValue("@Company", drLin2["Company"]);
                    cmd.Parameters.AddWithValue("@UserCode", drLin2["UserCode"]);
                    cmd.Parameters.AddWithValue("@QueryType", 4);
                    cmdList.Add(cmd);
                }


            }
            cmd = new SqlCommand();
            cmd.Parameters.Clear();
            cmd.CommandText = "[FPTI_NW].[nw_Role_hist]";
            cmd.Parameters.AddWithValue("@Code", role);
            cmd.Parameters.AddWithValue("@Company", company);
            cmd.Parameters.AddWithValue("@QueryType", 1);
            cmdList.Add(cmd);

            return base.ExecProcedure(cmdList, _ConnectionString);
        }

        public string DeleteData(string Company, string Roles)
        
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyRolesItemMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Company", Company);
            cmd.Parameters.AddWithValue("@Roles", Roles);
            cmd.Parameters.AddWithValue("@QueryType", 18);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string DeleteDataHistory(string Company, string Roles, String user)

        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_Role_hist]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Company", Company);
            cmd.Parameters.AddWithValue("@code", Roles);
            cmd.Parameters.AddWithValue("@Moduser", user);
            cmd.Parameters.AddWithValue("@QueryType", 2);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public System.Data.DataTable GetData()
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyRolesItemMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@QueryType", 10);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        
        public System.Data.DataTable GetDataModule(string strCompany)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyRolesItemMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Company", strCompany);
            cmd.Parameters.AddWithValue("@QueryType", 10);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }


        public System.Data.DataTable GetDataUser(string strCompany, string strRoles)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyRolesItemMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Roles", strCompany);
            cmd.Parameters.AddWithValue("@Company", strRoles);
            cmd.Parameters.AddWithValue("@QueryType", 11);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        public System.Data.DataTable GetDataExport(string strCompany, string strRoles)
        {
            //SqlCommand cmd = new SqlCommand();
            //cmd.CommandText = "[FPTI_NW].[nw_CompanyRolesItemMapping]";
            //cmd.Parameters.Clear();
            //cmd.Parameters.AddWithValue("@Roles", strCompany);
            //cmd.Parameters.AddWithValue("@Company", strRoles);
            //cmd.Parameters.AddWithValue("@QueryType", 9);
            //return base.ExecGetData(cmd, _ConnectionString, true);

            return SFObjects.LoadDataTable(@"select DISTINCT d.Code [Company Code], d.Description [Company Description], e.Code [Role Code], 
                                            e.Description [Role Description], a.UserCode  [User Code],b.Description [User Name],
                                            ruser.Description [Created By], FORMAT(hdr.Recdate, 'MM/dd/yyyy hh:mm:ss tt') [Date Created], 
                                            muser.Description [Modified By], FORMAT(hdr.Moddate, 'MM/dd/yyyy hh:mm:ss tt') [Date Modified] from FPTI.RolesUser a
                                            left join fpti.[User] b  on a.UserCode = b.Code 
                                            left join  fpti.CompanyUserMapping c on a.UserCode  = c.SysUser
                                            LEFT JOIN FPTI.Company d ON a.Company = d.Code
                                            LEFT JOIN FPTI.Roles e ON e.Code = a.Roles
                                            LEFT JOIN  FPTI.RolesUserHDR hdr ON hdr.Company = a.Company AND hdr.Role = a.Roles
                                            LEFT JOIN FPTI.[User] ruser ON ruser.Code = hdr.Recuser
                                            LEFT JOIN FPTI.[User] muser ON muser.Code = hdr.Moduser", _ConnectionString);

        }

        public string GetToolData()
        {
            string a = string.Format(@"SELECT DISTINCT  a.Company +'-' + a.Roles [ID], a.Company, b.Description
                                            , a.Roles, c.Description [RoleDesc],
											hdr.Recuser, hdr.Recdate, hdr.Moduser, hdr.Moddate 
                                            FROM FPTI.RolesUser a
                                            LEFT JOIN FPTI.Company b ON a.Company = b.Code
                                            LEFT JOIN FPTI.Roles c ON a.Roles = c.Code
											LEFT JOIN FPTI.RolesUserHDR hdr ON hdr.Company = a.Company AND hdr.Role = a.Roles");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }

        public string DeleteValidation(string Company, string Role) {

            string result = string.Empty;
            string ReturnQuery = string.Empty;

            ReturnQuery = SFObjects.returnText(string.Format(@"EXEC [FPTI_NW].[nw_CompanyRolesItemMapping] @Company = '{0}', @Roles = '{1}', @QueryType = 17", Company, Role), _ConnectionString);

            if (ReturnQuery == "1")
                result = "Company Role is already used in other menu item.";



            return result;
        }

        public bool isUsed(string Company, string Roles) {

            return Parser.ParseInt(SFObjects.returnText(string.Format(@"SELECT TOP 1 1 FROM ARKDB_STANDARD.FPTI_NW.NW_CompanyRolesItemMappingWeb WHERE (Company = '{0}' AND Roles = '{1}')", Company, Roles), _ConnectionString)).Equals(1);

        }

    }
}
