using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;


namespace DALComponent
{
    public class SACompanyDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        private string _ConnectionString;
        public readonly string errorString = "Error",                                     //--do not change this line
                                LISTINGFILENAME = "",
                                GETCOMPANY = "",
                                primaryKey = "Code",                                       //--column for searching
                                inquireQry = "Select Code, Description from FPTI.Company", //--query of inquire button
                                listingName = "FG UOM Listing",                              //--form name of listings
                                listingQry = "select Code, Description, Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] from FPTI.Company"; //--query of export and print
        public readonly int listingStartRow = 6;                                       //--default start row

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        private string _ConnectionString2 = "";
        #region STANDARD

        public string MenuItemCode = "NWADMIN_COMPANY"; // This is default parameter  for version
        public string MenuItemVersion = "9.0.0.3";// This is default parameter for version
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


        public SACompanyDAL(string ConnectionString, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = _ConnectionString;
            this.CurrentSelectedItem = selectedItem;
        }

        public string ConnectionString { get { return _ConnectionString; } }

        public DataTable GetSchema()
        {
            return SFObjects.LoadDataTable("select * from FPTI.Company where 1 != 1", _ConnectionString);
        }

        public DataTable GetSchemaLin()
        {
            return SFObjects.LoadDataTable("select * from [fpti].[CompanyUserMapping] where 1 != 1", _ConnectionString);
        }
        public DataTable GetSchemaLin2()
        {
            return SFObjects.LoadDataTable("select * from [FPTI].[CompanyModuleMapping] where 1 != 1", _ConnectionString);
        }
        public DataTable GetSchemaLin3()
        {
            return SFObjects.LoadDataTable("Select * From FPTI_NW.noahweb_Application_Collection where 1 != 1", _ConnectionString);
        }

        public string SaveData(System.Data.DataTable dt, DataTable dtLin, DataTable dtLin2, DataTable dtLin3, bool isNew)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();

            SqlCommand cmd = new SqlCommand();
            string code = "";
            if (dt.Rows.Count >= 1)
                code = dt.Rows[0]["Code"].ToString();



            cmd.Parameters.Clear();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "FPTI.pCompany";
            cmd.Parameters.AddWithValue("@Code", code);
            cmd.Parameters.AddWithValue("@Description", dt.Rows[0]["Description"]);
            cmd.Parameters.AddWithValue("@RefDatabase", dt.Rows[0]["RefDatabase"]);
            cmd.Parameters.AddWithValue("@RecUser", dt.Rows[0]["RecUser"]);
            cmd.Parameters.AddWithValue("@RecDate", dt.Rows[0]["RecDate"]);
            cmd.Parameters.AddWithValue("@ModUser", dt.Rows[0]["ModUser"]);
            cmd.Parameters.AddWithValue("@ModDate", dt.Rows[0]["ModDate"]);
            cmd.Parameters.AddWithValue("@QueryType", isNew ? 1 : 2);
            cmdList.Add(cmd);

            if (!isNew)
            {
                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[FPTI].[pCompanyModuleMapping]";
                cmd.Parameters.AddWithValue("@Company", code);
                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmdList.Add(cmd);
            }

            foreach (DataRow drLin2 in dtLin2.Rows)
            {
                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[FPTI].[pCompanyModuleMapping]";
                cmd.Parameters.AddWithValue("@Company", code);
                cmd.Parameters.AddWithValue("@Module", drLin2["Module"]);
                cmd.Parameters.AddWithValue("@RecUser", dt.Rows[0]["RecUser"]);
                // cmd.Parameters.AddWithValue("@RecDate", dt.Rows[0]["RecDate"]);
                cmd.Parameters.AddWithValue("@ModUser", dt.Rows[0]["ModUser"]);
                // cmd.Parameters.AddWithValue("@ModDate", dt.Rows[0]["ModDate"]);
                cmd.Parameters.AddWithValue("@QueryType", 1);
                cmdList.Add(cmd);
            }




            if (!isNew)
            {
                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[FPTI].[pCompanyUserMapping]";
                cmd.Parameters.AddWithValue("@Company", code);
                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmdList.Add(cmd);
            }

            foreach (DataRow drLin in dtLin.Rows)
            {
                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[FPTI].[pCompanyUserMapping]";
                cmd.Parameters.AddWithValue("@Company", code);
                cmd.Parameters.AddWithValue("@SysUser", drLin["SysUser"]);
                cmd.Parameters.AddWithValue("@RecUser", dt.Rows[0]["RecUser"]);
                // cmd.Parameters.AddWithValue("@RecDate", dt.Rows[0]["RecDate"]);
                cmd.Parameters.AddWithValue("@ModUser", dt.Rows[0]["ModUser"]);
                //cmd.Parameters.AddWithValue("@ModDate", dt.Rows[0]["ModDate"]);
                cmd.Parameters.AddWithValue("@QueryType", 1);
                cmdList.Add(cmd);
            }


            if (!isNew)
            {
                // SFObjects.returnText(string.Format("DELETE FROM  FPTI_NW.noahweb_Application_Collection WHERE CompanyID='{0}'", dt.Rows[0]["Code"].ToString()), _ConnectionString);
                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandType = CommandType.Text;
                cmd.CommandText = string.Format("DELETE FROM  FPTI_NW.noahweb_Application_Collection WHERE CompanyID='{0}'", dt.Rows[0]["Code"].ToString());
                //cmd.Parameters.AddWithValue("@Company", code);
                //cmd.Parameters.AddWithValue("@QueryType", 3);
                cmdList.Add(cmd);
            }


            foreach (DataRow drLin3 in dtLin3.Rows)
            {
                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[FPTI_NW].[nw_CompanyModuleMapping]";
                cmd.Parameters.AddWithValue("@Company", code);
                cmd.Parameters.AddWithValue("@Module", drLin3["AppID"]);
                cmd.Parameters.AddWithValue("@RecUser", drLin3["ApplicationTagName"]);
                //     cmd.Parameters.AddWithValue("@RecDate", drLin3["DateModified"]);
                cmd.Parameters.AddWithValue("@ModUser", drLin3["dataSort"]);
                cmd.Parameters.AddWithValue("@QueryType", 7);
                cmdList.Add(cmd);
            }

            cmd = new SqlCommand();
            cmd.Parameters.Clear();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "[FPTI].[pCompany_hist]";
            cmd.Parameters.AddWithValue("@Code", code);
            cmd.Parameters.AddWithValue("@RecUser", dt.Rows[0]["RecUser"]);
            cmd.Parameters.AddWithValue("@QueryType", 1);
            cmdList.Add(cmd);

            base.forceCommandType = true;
            return base.ExecProcedure(cmdList, _ConnectionString);
        }

        public string DeleteDataModuleWeb(string Code)
        {
            SqlCommand cmd = new SqlCommand();
            cmd = new SqlCommand();
            cmd.Parameters.Clear();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyModuleMapping]";
            cmd.Parameters.AddWithValue("@Company", Code);
            cmd.Parameters.AddWithValue("@QueryType", 6);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string DeleteData(string Code, string recuser)
        {

            List<SqlCommand> cmdList = new List<SqlCommand>();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "FPTI.pCompany";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Code", Code);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            cmdList.Add(cmd);

            cmd = new SqlCommand();
            cmd.Parameters.Clear();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.CommandText = "[FPTI].[pCompany_hist]";
            cmd.Parameters.AddWithValue("@Code", Code);
            cmd.Parameters.AddWithValue("@RecUser", recuser);
            cmd.Parameters.AddWithValue("@QueryType", 2);
            cmdList.Add(cmd);

            return base.ExecProcedure(cmdList, _ConnectionString);
        }

        public string Historical(string code)
        {
            return string.Format($@"EXEC [FPTI].[pCompany_hist] @QueryType = 0, @Code = '{code}'");
        }

        public System.Data.DataTable GetData()
        {
            //SqlCommand cmd = new SqlCommand();
            //cmd.CommandText = "[FPTI_NW].[nw_Company]";
            //cmd.Parameters.Clear();
            //cmd.Parameters.AddWithValue("@QueryType", 4);
            //return base.ExecGetData(cmd, _ConnectionString, true);

            return SFObjects.LoadDataTable(string.Format(@"SELECT DISTINCT comp.[Code]+''as [Company Code], comp.[Description] [Company Description], comp.[RefDatabase] [Database], deskmod.Code [Desktop Module Code], 
                                                        deskmod.Description [Desktop Module Description], webmod.code [Web Module Code], webmod.description [Web Module Description], 
                                                        [user].Code [User Code], [user].Description [User Description], comp.[RecUser] [Created By], comp.[RecDate] [Date Created], comp.[ModUser] [Modified By], comp.[ModDate] [Date Modified]
                                                        FROM FPTI.Company comp
                                                        LEFT JOIN fpti.CompanyModuleMapping desk ON comp.Code = desk.Company
                                                        LEFT JOIN fpti.Module deskmod ON desk.Module = deskmod.Code
                                                        LEFT JOIN FPTI_NW.noahweb_Application_Collection web ON web.CompanyID = comp.Code
                                                        LEFT JOIN FPTI_NW.noahweb_Application_Info webmod on  web.AppID  = webmod.code 
                                                        LEFT JOIN fpti.CompanyUserMapping usermap ON usermap.Company = comp.Code
                                                        LEFT JOIN fpti.[User] [user] ON usermap.SysUser = [user].Code"), _ConnectionString);

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


        public DataTable GetWebModule(string Company) {

            return SFObjects.LoadDataTable(string.Format(@"Select '',a.AppID+'' as 'Web Module',b.description+'' as 'Description'  from FPTI_NW.noahweb_Application_Collection  a
                                left join 
                                FPTI_NW.noahweb_Application_Info b on  a.AppID  = b.code 
                                where a.companyID = '{0}' ORDER BY a.dataSort ASC ", Company), _ConnectionString);

        }


        public System.Data.DataTable GetDataUser(string strCompany)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FPTI_NW].[nw_CompanyUserMapping]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Company", strCompany);
            cmd.Parameters.AddWithValue("@QueryType", 4);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

        public System.Data.DataTable combobox()
        {
            return SFObjects.LoadDataTable(string.Format(@"select top 1 '','' From FPTI_NW.noahweb_Application_Info where AppLink=''
                        union all
                        Select code,description From FPTI_NW.noahweb_Application_Info where AppLink=''"), _ConnectionString);
        }

        public bool CheckHasAccess(string User)
        {

            return Parser.ParseInt(SFObjects.returnText(string.Format("SELECT HasAccessToUtility FROM FPTI.[User] WHERE Code = '{0}'", User), _ConnectionString)).Equals(0);

        }

        public bool CheckConfig()
        {

            return Parser.ParseInt(SFObjects.returnText(@"SELECT [value] FROM [dbo].[SystemConfig] WHERE code ='COMPADMIN'", _ConnectionString)).Equals(1);

        }

        public string GetInquire() {

            return string.Format(@"select Code,Description from fpti.Company");

        }

        public string GetlugCode()
        {

            return string.Format(@"Select '-' as [Database] ,'-' as [Database Name] 	union all   
                     SELECT [name] as [Database],[name] as [Database Name] 
                     FROM sys.databases d
                     WHERE d.database_id > 4 order by [Database]");

        }

        public string GetlugGrid1()
        {

            return string.Format(@"select  a.[Module]+'' as 'Code',b.[Description]+'' as 'Description' from [fpti].[CompanyModuleMapping] a
                                left join [fpti].[Module] b
                                on a.[Module] = b.[Code]");

        }

        public string GetlugGrid2()
        {

            return string.Format(@"select  a.[Module]+'' as 'Code' ,b.[Description]+'' as 'Description' from [fpti].[CompanyModuleMapping] a
                                left join [fpti].[Module] b
                                on a.[Module] = b.[Code]");

        }


        public string GetAddModule(string Company)
        {

            return string.Format(@"select distinct  a.Module+'' as 'Code',b.Description+'' as 'Description',c.code,c.description
		                        from fpti.CompanyModuleMapping a
		                        left join [FPTI_NW].[noahweb_Application_Info] c 
		                        on a.Module = c.AppLink 
		                        inner join fpti.Module b
		                        on a.Module = b.Code
		                        where a.Company='{0}'", Company);

        }

        public string GetAddModuleWeb(string Module)
        {

            return string.Format(@"select Code,Description from FPTI_NW.noahweb_Application_Info where code NOT IN (SELECT SplitValue FROM dbo.fn_Split('{0}', ','))", Module);

        }

        public string GetAddUser(string filter)
        {

            return string.Format(@"select DISTINCT Code,Description from [fpti].[user] WHERE HasAccessToUtility != 1 AND code NOT IN (SELECT SplitValue FROM dbo.fn_Split('{0}', ','))", filter);

        }

        public string GetCopyModule(string Company)
        {

            return string.Format(@"select Code,Description from fpti.Company WHERE Code != '{0}'", Company);

        }

        public string GetCopyUserWeb(string Company)
        {

            return string.Format(@"select Code,Description from fpti.Company WHERE Code != '{0}'", Company);

        }

        public string GetCopyUser(string Company)
        {

            return string.Format(@"select Code,Description from fpti.Company WHERE Code != '{0}'", Company);

        }

        public string GetData(string nwaccess, bool CheckConfig, string Recuser)
        {
            string a = string.Empty;

            if (nwaccess == "1" && CheckConfig)
            {
                a = string.Format(@"select a.* from fpti.Company a
                                                                LEFT JOIN [FPTI_NW].[SuperAdmin] c ON c.Company = a.Code
                                                                WHERE c.UserID = '{0}' order by isnull(a.Moddate,a.Recdate) DESC,a.Recdate DESC", Recuser);
            }
            else
            {
                a = string.Format(@"select * from fpti.Company order by isnull(Moddate,Recdate) DESC,Recdate DESC");
            }

            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }


    }
}
