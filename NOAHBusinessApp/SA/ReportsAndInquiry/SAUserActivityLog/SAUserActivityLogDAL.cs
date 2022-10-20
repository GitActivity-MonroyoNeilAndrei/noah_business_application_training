using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;


namespace DALComponent
{
    public class SAUserActivityLogDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        private string _ConnectionString;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code",                                       //--column for searching
                                inquireQry = "Select Code, Description from FPTI.Company", //--query of inquire button
                                listingName = "FG UOM Listing",                              //--form name of listings
                                listingQry = "select Code, Description, Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] from FPTI.Company"; //--query of export and print
        public readonly int listingStartRow = 6;
        //--default start row
        //public string GETCOMPANY = "SELECT Description FROM fpti.Company where code = '{0}'";
        public string GETCOMPANY = "select CompanyName from SG.BIRCASConfig";
        

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator


        #region STANDARD

        public string MenuItemCode = "NWADMIN_USERACTIVITYLOG"; // This is default parameter  for version
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


        public SAUserActivityLogDAL(string ConnectionString, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            this.CurrentSelectedItem = selectedItem;
        }

        public string ConnectionString { get { return _ConnectionString; } }

        public DataTable GetSchema()
        {
            return SFObjects.LoadDataTable("select * from FPTI_NW.nw_Application_Setup_HDR where 1 != 1", _ConnectionString);
        }

        public DataTable GetSchemaLin()
        {
            return SFObjects.LoadDataTable("select * from FPTI_NW.nw_Application_Setup_User_LIN where 1 != 1", _ConnectionString);
        }
        public DataTable GetSchemaLin2()
        {
            return SFObjects.LoadDataTable("select * from [FPTI_NW].[nw_Application_Setup_Parameter_LIN] where 1 != 1", _ConnectionString);
        }

        public string SaveData(System.Data.DataTable dt, DataTable dtLin, DataTable dtLin2, bool isNew)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();

            SqlCommand cmd = new SqlCommand();
            string code="";
            if(dt.Rows.Count >=1)
                code =dt.Rows[0]["Code"].ToString();

            cmd.Parameters.Clear();
            cmd.CommandText = "[FPTI_NW].[nsp_OtherApplicationSetup_Lin_Param]";
            cmd.Parameters.AddWithValue("@Code", code);
            cmd.Parameters.AddWithValue("@Description", dt.Rows[0]["Description"]);
            cmd.Parameters.AddWithValue("@RecUser", dt.Rows[0]["RecUser"]);
            cmd.Parameters.AddWithValue("@RecDate", dt.Rows[0]["RecDate"]);
            cmd.Parameters.AddWithValue("@ModUser", dt.Rows[0]["ModUser"]);
            cmd.Parameters.AddWithValue("@ModDate", dt.Rows[0]["ModDate"]);
            cmd.Parameters.AddWithValue("@QueryType", isNew ? 1 : 6);
            cmdList.Add(cmd);

            if (!isNew)
            {
                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandText = "[FPTI_NW].[nsp_OtherApplicationSetup_Lin_Param]";
                cmd.Parameters.AddWithValue("@Code", code);
                cmd.Parameters.AddWithValue("@QueryType", 4);
                cmdList.Add(cmd);
            }

                foreach (DataRow drLin in dtLin.Rows)
                {
                    cmd = new SqlCommand();
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[FPTI_NW].[nsp_OtherApplicationSetup_Lin_Param]";
                    cmd.Parameters.AddWithValue("@Code", code);
                    cmd.Parameters.AddWithValue("@UserCode", drLin["UserCode"]);
                    cmd.Parameters.AddWithValue("@Description", drLin["Description"]);
                    cmd.Parameters.AddWithValue("@QueryType", 3);
                    cmdList.Add(cmd);
                }


                foreach (DataRow drLin2 in dtLin2.Rows)
                {
                    cmd = new SqlCommand();
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[FPTI_NW].[nsp_OtherApplicationSetup_Lin_Param]";
                    cmd.Parameters.AddWithValue("@Code", code);
                    cmd.Parameters.AddWithValue("@VarParameter", drLin2["VarParameter"]);
                    cmd.Parameters.AddWithValue("@Description", drLin2["Description"]);
                    cmd.Parameters.AddWithValue("@ParameterType", drLin2["ParameterType"]);
                    cmd.Parameters.AddWithValue("@ParameterFormat", drLin2["ParameterFormat"]);
                    cmd.Parameters.AddWithValue("@QueryType", 5);
                    cmdList.Add(cmd);
                }

            return base.ExecProcedure(cmdList, _ConnectionString);
        }

        public string DeleteData(string Code)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nsp_OtherApplicationSetup_Lin_Param]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Code", Code);
            cmd.Parameters.AddWithValue("@QueryType", 2);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public System.Data.DataTable GetData()
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "FPTI.pCompany";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@QueryType", 4);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        
        public System.Data.DataTable GetDataModule(string strCompany)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = " [FPTI_NW].[nsp_OtherApplicationSetup]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Code", strCompany);
            cmd.Parameters.AddWithValue("@QueryType", 0);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }


        public System.Data.DataTable GetDataUser(string strCompany)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI].[pCompanyUserMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Company", strCompany);
            cmd.Parameters.AddWithValue("@QueryType", 4);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }
        public string GetAllData(string a, string b)
        {
            string xquery = string.Format(@"SELECT COUNT(*) from FPTI.ConnectivityH a left join FPTI.[User] b on a.SysUser = b.code left join FPTI.Company c on a.Company = c.Description where c.code='{1}' and a.SysUser='{0}'",a,b);
            return (SFObjects.returnText(xquery, _ConnectionString));
        }

        public string GetAllData3(string a, string b)
        {
            string xquery = string.Format(@"SELECT COUNT(*) from FPTI.ConnectivityH a left join FPTI.[User] b on a.SysUser = b.code left join FPTI.Company c on a.Company = c.Description where a.LogDate >='{0}' and a.LogDate <='{1}'", a, b);
            return (SFObjects.returnText(xquery, _ConnectionString));
        }

        public string GetAllData4(string a, string b, string company,string user)
        {
            string xquery = string.Format(@"SELECT COUNT(*) from FPTI.ConnectivityH a left join FPTI.[User] b on a.SysUser = b.code left join FPTI.Company c on a.Company = c.Description where a.LogDate >='{0}' and a.LogDate <='{1}' and c.code='{2}' and a.SysUser='{3}' ", a, b,company,user);
            return (SFObjects.returnText(xquery, _ConnectionString));
        }

        public string GetAllData2(string a, string b)
        {

            if (a == "" && b == "")
            {
                string xquery = string.Format(@"SELECT COUNT(*) from FPTI.ConnectivityH a left join FPTI.[User] b on a.SysUser = b.code left join FPTI.Company c on a.Company = c.Description");
                return (SFObjects.returnText(xquery, _ConnectionString));
            }
            else
            {
                string xquery = string.Format(@"SELECT COUNT(*) from FPTI.ConnectivityH a left join FPTI.[User] b on a.SysUser = b.code left join FPTI.Company c on a.Company = c.Description where c.code='{1}' and a.SysUser='{0}'", a, b);
                return (SFObjects.returnText(xquery, _ConnectionString));

            }

        }

        public bool CheckHasAccess(string User)
        {

            return Parser.ParseInt(SFObjects.returnText(string.Format("SELECT HasAccessToUtility FROM FPTI.[User] WHERE Code = '{0}'", User), _ConnectionString)).Equals(0);

        }

        public bool CheckConfig()
        {

            return Parser.ParseInt(SFObjects.returnText(@"SELECT [value] FROM [dbo].[SystemConfig] WHERE code ='COMPADMIN'", _ConnectionString)).Equals(1);

        }

    }
}
