using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;


namespace DALComponent
{
    public class SACompanyRoleDAL : NoahWebLib.DatabaseHandler
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

        public string MenuItemCode = "NWADMIN_ROLES"; // This is default parameter  for version
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

        public SACompanyRoleDAL(string ConnectionString, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            this.CurrentSelectedItem = selectedItem;
        }

        public string ConnectionString { get { return _ConnectionString; } }

        public DataTable GetSchema()
        {
            return SFObjects.LoadDataTable("select * from FPTI.Roles where 1 != 1", _ConnectionString);
        }

        public DataTable GetSchemaLin()
        {
            return SFObjects.LoadDataTable("select * from [fpti].[CompanyUserMapping] where 1 != 1", _ConnectionString);
        }
        public DataTable GetSchemaLin2()
        {
            return SFObjects.LoadDataTable("select * from [FPTI].[CompanyModuleMapping] where 1 != 1", _ConnectionString);
        }

        public string SaveData(System.Data.DataTable dt, bool isNew)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();

            SqlCommand cmd = new SqlCommand();
            string code="";
            if(dt.Rows.Count >=1)
                code =dt.Rows[0]["Code"].ToString();

            cmd.Parameters.Clear();
            cmd.CommandText = "[FPTI].[pRole]";
            cmd.Parameters.AddWithValue("@Code", code);
            cmd.Parameters.AddWithValue("@Description", dt.Rows[0]["Description"]);
            cmd.Parameters.AddWithValue("@RecUser", dt.Rows[0]["RecUser"]);
            cmd.Parameters.AddWithValue("@RecDate", dt.Rows[0]["RecDate"]);
            cmd.Parameters.AddWithValue("@ModUser", dt.Rows[0]["ModUser"]);
            cmd.Parameters.AddWithValue("@ModDate", dt.Rows[0]["ModDate"]);
            cmd.Parameters.AddWithValue("@QueryType", isNew ? 1 : 2);
            cmdList.Add(cmd);

            cmd = new SqlCommand();
            cmd.Parameters.Clear();
            cmd.CommandText = "[FPTI].[pRole_Hist]";
            cmd.Parameters.AddWithValue("@Code", code);
            cmd.Parameters.AddWithValue("@QueryType", isNew ? 1 : 2);
            cmdList.Add(cmd);

            //    if (!isNew)
            //    {
            //        cmd = new SqlCommand();
            //        cmd.Parameters.Clear();
            //        cmd.CommandText = "[FPTI].[pCompanyModuleMapping]";
            //        cmd.Parameters.AddWithValue("@Company", code);
            //        cmd.Parameters.AddWithValue("@QueryType", 3);
            //        cmdList.Add(cmd);
            //    }

            //    foreach (DataRow drLin2 in dtLin2.Rows)
            //    {
            //        cmd = new SqlCommand();
            //        cmd.Parameters.Clear();
            //        cmd.CommandText = "[FPTI].[pCompanyModuleMapping]";
            //        cmd.Parameters.AddWithValue("@Company", code);
            //        cmd.Parameters.AddWithValue("@Module", drLin2["Module"]);
            //        cmd.Parameters.AddWithValue("@RecUser", dt.Rows[0]["RecUser"]);
            //        cmd.Parameters.AddWithValue("@RecDate", dt.Rows[0]["RecDate"]);
            //        cmd.Parameters.AddWithValue("@ModUser", dt.Rows[0]["ModUser"]);
            //        cmd.Parameters.AddWithValue("@ModDate", dt.Rows[0]["ModDate"]);
            //        cmd.Parameters.AddWithValue("@QueryType", 1);
            //        cmdList.Add(cmd);
            //    }


            //    if (!isNew)
            //    {
            //        cmd = new SqlCommand();
            //        cmd.Parameters.Clear();
            //        cmd.CommandText = "[FPTI].[pCompanyUserMapping]";
            //        cmd.Parameters.AddWithValue("@Company", code);
            //        cmd.Parameters.AddWithValue("@QueryType", 3);
            //        cmdList.Add(cmd);
            //    }

            //    foreach (DataRow drLin in dtLin.Rows)
            //    {
            //        cmd = new SqlCommand();
            //        cmd.Parameters.Clear();
            //        cmd.CommandText = "[FPTI].[pCompanyUserMapping]";
            //        cmd.Parameters.AddWithValue("@Company", code);
            //        cmd.Parameters.AddWithValue("@SysUser", drLin["SysUser"]);
            //        cmd.Parameters.AddWithValue("@RecUser", dt.Rows[0]["RecUser"]);
            //        cmd.Parameters.AddWithValue("@RecDate", dt.Rows[0]["RecDate"]);
            //        cmd.Parameters.AddWithValue("@ModUser", dt.Rows[0]["ModUser"]);
            //        cmd.Parameters.AddWithValue("@ModDate", dt.Rows[0]["ModDate"]);
            //        cmd.Parameters.AddWithValue("@QueryType", 1);
            //        cmdList.Add(cmd);
            //    }

            return base.ExecProcedure(cmdList, _ConnectionString);
        }
        public bool isNewRec(string Roles)
        {

            string xquery = string.Format(@"select TOP 1 1 from FPTI.RolesUser
                                                   where Roles='{0}'", Roles);

            if (SFObjects.returnText(xquery, _ConnectionString) == "1")
                return false;
            else
                return true;
        }
     
        public string DeleteData(string ss, String bModuser )
        {
          string sample = "Cannot Delete. Company Role is already used in other menu item.";
            bool isnewrec = isNewRec(ss);
            if (isnewrec == false ){
                return sample;
            }
            else
            {
                //CAR: 02.11.2020 (Comment)         
                //cmd.CommandText = "[FPTI].[pRole]";
                //cmd.Parameters.Clear();
                //cmd.Parameters.AddWithValue("@Code", ss);
                //cmd.Parameters.AddWithValue("@QueryType",3);
                //return base.ExecProcedure(cmd, _ConnectionString);
                List<SqlCommand> cmdList = new List<SqlCommand>();
                SqlCommand cmd = new SqlCommand();

                cmd.CommandText = "[FPTI].[pRole_Hist]";

                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Code", ss);
                cmd.Parameters.AddWithValue("@ModUser", bModuser);
                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmdList.Add(cmd);

                cmd = new SqlCommand();
                cmd.CommandText = "[FPTI].[pRole]";
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Code", ss);
                cmd.Parameters.AddWithValue("@ModUser", bModuser);
                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmdList.Add(cmd);

                return base.ExecProcedure(cmdList, _ConnectionString);
            }
           
        }

        public string Historical(string code)
        {
            return string.Format($@"EXEC [FPTI].[pRole_Hist] @QueryType = 4, @code = '{code}'");
        }

        public System.Data.DataTable GetData()
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI].[pRole]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@QueryType", 0);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        
        public System.Data.DataTable GetDataModule(string strCompany)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyModuleMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Company", strCompany);
            cmd.Parameters.AddWithValue("@QueryType", 5);
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

        public System.Data.DataTable GetDataUser(string strCompany,string ss)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_User]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Roles", strCompany);
            cmd.Parameters.AddWithValue("@QueryType", 5);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        public System.Data.DataTable GetDataExport()
        {
            //SqlCommand cmd = new SqlCommand();
            //cmd.CommandText = "[FPTI_NW].[nw_Role]";
            //cmd.Parameters.Clear();
            //cmd.Parameters.AddWithValue("@QueryType", 5);
            //return base.ExecGetData(cmd, _ConnectionString, true);

            return SFObjects.LoadDataTable(@"SELECT  a.Code ,
                                                    a.Description ,
                                                    b.Description [Created by] ,
                                                    a.RecDate [Date Created] ,
                                                    c.Description [Modified by] ,
                                                    a.ModDate [Date Modified]
                                            FROM    FPTI.[Roles] a
                                                    LEFT JOIN FPTI.[User] b ON a.RecUser = b.Code
                                                    LEFT JOIN FPTI.[User] c ON a.ModUser = c.Code", ConnectionString);

        }

        public string GetFullName(string xcode)
        {
            return SFObjects.returnText(string.Format("SELECT [Description] FROM [FPTI].[User] WHERE [Code]='{0}'", xcode), _ConnectionString);
        }

        public bool isUsedRole(string Role) {

            return Parser.ParseInt(SFObjects.returnText(string.Format(@"SELECT TOP 1 1 FROM FPTI.RolesUser WHERE Roles = '{0}'", Role), ConnectionString)).Equals(1);
        
        }


      
    }
}
