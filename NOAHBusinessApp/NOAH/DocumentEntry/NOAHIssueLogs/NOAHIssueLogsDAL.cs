using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using DALComponent;

//using NoahWebLib;


namespace DataAccessLayers
{
    public class NOAHIssueLogsDAL : NoahWebLib.DatabaseHandler
    {
        new nwSFObjects SFObjects = new nwSFObjects();
        private string _ConnectionString;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "ItemNo",                                       //--column for searching
                                inquireQry = "Select Code, Description from [FG].[UOMMaster]", //--query of inquire button
                                listingName = "FG UOM Listing",                              //--form name of listings
                                listingQry = "select Code, Description, Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] from [FG].[UOMMaster]"; //--query of export and print
        public readonly int listingStartRow = 6;                                       //--default start row


        public string LISTINGFILENAME = "Support Ticket Monitoring", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        private string storedprocedure = "[NS].[nsp_IssueLog]";
        private string table = "[ilog].[vw_Issuelog]";
        private string tableTemp = "[ILOG].[IssuelogTempUpload]";

        private string _ConnectionString2 = "";

        //internal string serverPath()
        //{
        //    throw new NotImplementedException();
        //}

        private SqlConnection sqlConn = new SqlConnection();
        private SqlTransaction sqlTrn;
        #region STANDARD

        public string MenuItemCode = "Issue Logs"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.1";// This is default parameter for version 
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



        public NOAHIssueLogsDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }

        public string ConnectionString { get { return _ConnectionString; } }

        public DataTable GetSchema()
        {
            return SFObjects.LoadDataTable("select * from [FPTI].[User] where 1 != 1", _ConnectionString);
        }

        public DataTable GetSchemaLin()
        {
            return SFObjects.LoadDataTable("select * from [FPTI].[PowerUserAssignment] where 1 != 1", _ConnectionString);
        }

        public string serverPaths()
        {
            string serverPath = SFObjects.returnText("Select [value] from dbo.SystemConfig where code = 'Server_Path'", _ConnectionString2);
            return serverPath;
        }

        public string SaveData(System.Data.DataTable dt, DataTable dt_lin, bool isNew)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();

            string oldpassword = "";
            string newpassword = "";
            string code = "";

            if (dt.Rows.Count >= 1)
            {
                code = dt.Rows[0]["Code"].ToString(); code = nwSystem.FilterSQL(code);
                newpassword = dt.Rows[0]["Password"].ToString();
                oldpassword = SFObjects.returnText($"Select [password] from [fpti].[user] where code = '{code}'", _ConnectionString);

                cmd.Parameters.Clear();
                cmd.CommandText = "[FPTI_NW].[nw_User]";
                cmd.Parameters.AddWithValue("@Code", code);
                cmd.Parameters.AddWithValue("@Description", dt.Rows[0]["Description"]);
                cmd.Parameters.AddWithValue("@Password", dt.Rows[0]["Password"]);

                cmd.Parameters.AddWithValue("@HasAccessToUtility", dt.Rows[0]["HasAccessToUtility"]);
                cmd.Parameters.AddWithValue("@PowerUser", dt.Rows[0]["PowerUser"]);
                cmd.Parameters.AddWithValue("@AccountDisabled", dt.Rows[0]["AccountDisabled"]);
                cmd.Parameters.AddWithValue("@InitialLogin", dt.Rows[0]["InitialLogin"]);
                // cmd.Parameters.AddWithValue("@SysAdmin", dt.Rows[0]["SysAdmin"]);

                cmd.Parameters.AddWithValue("@RecUser", dt.Rows[0]["RecUser"]);
                cmd.Parameters.AddWithValue("@RecDate", dt.Rows[0]["RecDate"]);
                cmd.Parameters.AddWithValue("@ModUser", dt.Rows[0]["ModUser"]);
                cmd.Parameters.AddWithValue("@ModDate", dt.Rows[0]["ModDate"]);
                cmd.Parameters.AddWithValue("@QueryType", isNew ? 1 : 2);
                cmdList.Add(cmd);


                cmd = new SqlCommand();
                cmd.Parameters.Clear();
                cmd.CommandText = "[FPTI_NW].[nw_User_Hist]";
                cmd.Parameters.AddWithValue("@Code", code);
                cmd.Parameters.AddWithValue("@Description", dt.Rows[0]["Description"]);
                cmd.Parameters.AddWithValue("@Password", dt.Rows[0]["Password"]);

                cmd.Parameters.AddWithValue("@HasAccessToUtility", dt.Rows[0]["HasAccessToUtility"]);
                cmd.Parameters.AddWithValue("@PowerUser", dt.Rows[0]["PowerUser"]);
                cmd.Parameters.AddWithValue("@AccountDisabled", dt.Rows[0]["AccountDisabled"]);
                cmd.Parameters.AddWithValue("@InitialLogin", dt.Rows[0]["InitialLogin"]);


                // cmd.Parameters.AddWithValue("@SysAdmin", dt.Rows[0]["SysAdmin"]);

                cmd.Parameters.AddWithValue("@RecUser", dt.Rows[0]["RecUser"]);
                cmd.Parameters.AddWithValue("@RecDate", dt.Rows[0]["RecDate"]);
                cmd.Parameters.AddWithValue("@ModUser", dt.Rows[0]["ModUser"]);
                cmd.Parameters.AddWithValue("@ModDate", dt.Rows[0]["ModDate"]);
                cmd.Parameters.AddWithValue("@QueryType", isNew ? 1 : 2);
                cmdList.Add(cmd);
            }

            //Delete All PowerAssignment by Code
            cmd = new SqlCommand();
            cmd.Parameters.Clear();
            cmd.CommandText = "[FPTI_NW].[nw_PowerUserAssignment]";
            cmd.Parameters.AddWithValue("@PowerUserCode", dt.Rows[0]["Code"].ToString());
            cmd.Parameters.AddWithValue("@QueryType", 3);
            cmdList.Add(cmd);

            if (dt_lin.Rows.Count >= 1)
            {
                foreach (DataRow dr in dt_lin.Rows)
                {
                    if (dr[1].ToString() == "")
                    {
                        continue;
                    }

                    cmd = new SqlCommand();
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[FPTI_NW].[nw_PowerUserAssignment]";
                    cmd.Parameters.AddWithValue("@PowerUserCode", dt.Rows[0]["Code"].ToString());
                    cmd.Parameters.AddWithValue("@UserCode", dr[1].ToString());
                    cmd.Parameters.AddWithValue("@QueryType", 1);
                    cmdList.Add(cmd);
                }
            }
            string strmessage = base.ExecProcedure(cmdList, _ConnectionString);

            if (strmessage.ToLower().IndexOf("successfully") >= 0)
            {
                if (code != "" && newpassword != oldpassword)
                {
                    SFObjects.returnText($"update [fpti].[user] SET LastPasswordChanged = dbo.GetNoahDate()  where code = '{code}'", _ConnectionString);
                }
            }

            return strmessage;
        }

        public string DeleteData(string Code, String bModUser)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();

            cmd.CommandText = "[FPTI_NW].[nw_User_Hist]";

            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Code", Code);
            cmd.Parameters.AddWithValue("@ModUser", bModUser);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            cmdList.Add(cmd);

            cmd = new SqlCommand();
            cmd.CommandText = "[FPTI].[pUser]";

            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Code", Code);
            cmd.Parameters.AddWithValue("@ModUser", bModUser);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            cmdList.Add(cmd);

            return base.ExecProcedure(cmdList, _ConnectionString);
        }

        public string Historical(string code)
        {
            return string.Format($@"EXEC [FPTI_NW].[nw_User_Hist] @QueryType = 4, @code = '{code}'");
        }

        //public System.Data.DataTable GetData(string usercode)
        //{
        //    SqlCommand cmd = new SqlCommand();
        //    cmd.CommandText = "[FG].[nsp_UOMMaster]";
        //    cmd.Parameters.Clear();
        //    cmd.Parameters.AddWithValue("@QueryType", 0);
        //    return base.ExecGetData(cmd, _ConnectionString, true);
        //}

        public System.Data.DataTable GetPowerUSer(string usercode)
        {
            return SFObjects.LoadDataTable(string.Format(@"SELECT '' as '-',pua.[UserCode], u.[Description], u.[Description], u.[Description], u.[Description], u.[Description], u.[Description], u.[Description], u.[Description], u.[Description] FROM [FPTI].[PowerUserAssignment] pua
                                                            INNER JOIN [FPTI].[User] u
                                                            ON pua.UserCode = u.Code
                                                            WHERE pua.[PowerUserCode]='{0}'", usercode.Replace("'", "''")), _ConnectionString);
        }

        public bool CheckConfig()
        {

            return Parser.ParseInt(SFObjects.returnText(@"SELECT [value] FROM [dbo].[SystemConfig] WHERE code ='COMPADMIN'", _ConnectionString)).Equals(1);

        }

        public void DisableAccount()
        {

            SFObjects.ExcuteQuery(@"UPDATE FPTI.[User] SET AccountDisabled = 1 WHERE Code IN (

                                    SELECT userID FROM (
	                                    SELECT userID, MAX(x.LogDate) [Logdate]  FROM(
	                                    SELECT  [SysUser] userID
		                                      ,LogDate LogDate
	                                      FROM [FPTI].[ConnectivityH]
	                                     union
	                                     SELECT userID,Recdate LogDate  FROM  [FPTI].[ActivityUser]
	                                     )x
	                                     GROUP BY x.userID
                                    ) y
                                     LEFT JOIN
                                    (SELECT [value] FROM [dbo].[SystemConfig] WHERE code ='NOLOGINDSBLE') c ON 1=1
                                    LEFT JOIN FPTI.[User] b ON y.userID = b.Code
                                      WHERE DATEDIFF(d,y.LogDate,dbo.GetNoahDate()) >= (c.value) AND c.value > 0 AND b.HasAccessToUtility = 0
                                      
                                    )", _ConnectionString);

        }

        public string CheckUser(string User)
        {


            return SFObjects.returnText(string.Format(@"SELECT TOP 1 1 FROM FPTI.CompanyUserMapping WHERE SysUser = '{0}'", User), _ConnectionString);


        }


        public bool CheckHasAccess(string User)
        {

            return Parser.ParseInt(SFObjects.returnText(string.Format("SELECT HasAccessToUtility FROM FPTI.[User] WHERE Code = '{0}'", User), _ConnectionString)).Equals(1);

        }

        public string getCompany()
        {
            return string.Format($"EXEC {storedprocedure} @QueryType=20");
        }

        public string getProject(string Company)
        {
            return string.Format($"EXEC {storedprocedure} @Company = '{Company}', @QueryType=21");
        }

        public string getModule()
        {
            return string.Format($"EXEC {storedprocedure} @QueryType=22");
        }
        public string getMenuGroup(string Module)
        {
            return string.Format($"EXEC {storedprocedure} @Module = '{Module}', @QueryType=29");
        }
        public string getSubMenuGroup(string Module1)
        {
            return string.Format($"EXEC {storedprocedure} @Module = '{Module1}', @QueryType=30");
        }

        public string getStatus()
        {
            return string.Format($"EXEC {storedprocedure} @QueryType=24");
        }

        public string getImplemStage()
        {
            return string.Format($"EXEC {storedprocedure} @QueryType=26");
        }
        public string getError()
        {
            return string.Format($"EXEC {storedprocedure} @QueryType=27");
        }

        public string getActionType()
        {
            return string.Format($"EXEC {storedprocedure} @QueryType=28");
        }

        public string getEmployee()
        {
            return string.Format($"EXEC {storedprocedure} @QueryType=25");
        }


        public string getPrioLvl()
        {
            return string.Format($"EXEC {storedprocedure} @QueryType=45");
        }

        public string getLocation(string recuser)
        {
            return string.Format($"EXEC {storedprocedure} @Recuser='{recuser}', @QueryType=50");
        }

        public DataTable getDefaultLoc(string recuser)
        {
            return SFObjects.LoadDataTable(string.Format(@"EXEC {0} @Recuser='{1}',@QueryType = 49", storedprocedure, recuser), _ConnectionString2);
        }

        public string getMenuItem(string MenuGroup, string Module2)
        {
            return string.Format($"EXEC {storedprocedure} @Module='{Module2}', @Menugroup='{MenuGroup}', @QueryType=23");
        }

        public string getCompanyAdd(int Query)
        {
            return string.Format($"EXEC {storedprocedure} @Querytype = {Query}");
        }


        //public DataTable Status()
        //{
        //    string sql = String.Format($"EXEC {storedprocedure} @QueryType=24");
        //    return SFObjects.LoadDataTable(sql, _ConnectionString);
        //}
        public DataTable LoadSchemaLIN()
        {
            return SFObjects.LoadDataTable(@"SELECT * FROM [NS].[IssueLog] WHERE 1 <> 1", _ConnectionString2);
        }




        public string SaveGridData(DataTable dt, string SpreadType, string Recuser)
        {


            DataSet ds = new DataSet();
            ds = SFObjects.LoadDataSet($@"EXEC {storedprocedure} @SpreadType = '{SpreadType}', @QueryType = 55", _ConnectionString2);
            DataTable dtTable1 = ds.Tables[0].Copy();
            DataTable dtTable2 = ds.Tables[1].Copy();


            string SP = "";

            if (dtTable1.Rows.Count > 0)
            {
                SP = dtTable1.Rows[0]["SP"].ToString();
            }

            try
            {


                sqlConn.ConnectionString = _ConnectionString2;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();
                //for (int l = 0; l < dt.Rows.Count; l++)
                //{
                //    cmd = new SqlCommand();
                //    cmd.Connection = sqlConn;
                //    //cmd.CommandTimeout = 0;
                //    cmd.CommandType = CommandType.StoredProcedure;
                //    cmd.Transaction = sqlTrn;
                //    cmd.Parameters.Clear();
                //    cmd.CommandText = SP;
                //    for ()
                //    cmd.Parameters.AddWithValue("@" + dtTable2.Rows[i][2], dt.Rows[l][k].ToString());
                //    cmd.ExecuteNonQuery();

                //}

                int i = 0;
                for (i = 0; i <= dtTable2.Rows.Count - 1; i++)
                {

                    for (int l = 0; l < dt.Rows.Count; l++)
                    {
                        for (int k = 0; k <= i; k++)
                        {



                            cmd = new SqlCommand();
                            cmd.Connection = sqlConn;
                            //cmd.CommandTimeout = 0;
                            cmd.CommandType = CommandType.StoredProcedure;
                            cmd.Transaction = sqlTrn;
                            cmd.Parameters.Clear();
                            cmd.CommandText = SP;
                            cmd.Parameters.AddWithValue("@" + dtTable2.Rows[i][2], dt.Rows[l][k].ToString());

                        }
                        cmd.ExecuteNonQuery();
                    }



                }
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Error [{0}]: \nSystem Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("Error [{0}]: \n{1}", sqlEx.Number, sqlEx.Message);
                return result;
            }
            catch (Exception ex)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                return String.Format("Error: {0}\n", ex.Message);
            }
            sqlTrn.Commit();
            sqlConn.Close();
            return "Process has successfully completed.";
        }
        public string GetData()
        {
            string a = string.Format($@"EXEC {storedprocedure} @QueryType = 0");

            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/
            return a;
        }
        public DataSet GetDataDescription(string Project, string Company)
        {
            return SFObjects.LoadDataSet($@"EXEC {storedprocedure} @Project = '{Project}', @Company = '{Company}', @QueryType = -1", _ConnectionString2);
        }

        public DataTable GetRecuserDesc(string Recuser)
        {
            return SFObjects.LoadDataTable($@"EXEC {storedprocedure} @Recuser ='{Recuser}', @QueryType = -2", _ConnectionString2);
        }

        public string GetItemNo(string Company)
        {
            return SFObjects.returnText($@"EXEC {storedprocedure} @Company ='{Company}', @QueryType = 51", _ConnectionString2);

        }

        public string GenerateTaskPerAssigned(string Company2, string ItemNo, string Assigned, string EmployeeTask)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString2;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = storedprocedure;
                cmd.Parameters.AddWithValue("@Location", Company2);
                cmd.Parameters.AddWithValue("@ItemNo", ItemNo);
                cmd.Parameters.AddWithValue("@Assigned", Assigned);
                cmd.Parameters.AddWithValue("@Employeetask", EmployeeTask);
                cmd.Parameters.AddWithValue("@QueryType", 46);
                cmd.ExecuteNonQuery();
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved. Duplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("System Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("{1}", sqlEx.Number, sqlEx.Message);
                return result;
            }
            catch (Exception ex)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                return String.Format("Error: {0}\n", ex.Message);
            }
            sqlTrn.Commit();
            sqlConn.Close();
            return "Process has successfully completed.";
        }

        public string GetGenerateTaskPerEmployeeTask(string Company2, string ItemNo, string Assigned, string EmployeeTask)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString2;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = storedprocedure;
                cmd.Parameters.AddWithValue("@Location", Company2);
                cmd.Parameters.AddWithValue("@ItemNo", ItemNo);
                cmd.Parameters.AddWithValue("@Assigned", Assigned);
                cmd.Parameters.AddWithValue("@Employeetask", EmployeeTask);
                cmd.Parameters.AddWithValue("@QueryType", 47);
                cmd.ExecuteNonQuery();
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved. Duplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("System Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("{1}", sqlEx.Number, sqlEx.Message);
                return result;
            }
            catch (Exception ex)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                return String.Format("Error: {0}\n", ex.Message);
            }
            sqlTrn.Commit();
            sqlConn.Close();
            return "Process has successfully completed.";
        }

        public string UpdateTaskEntry(string ItemNo, string Company, string Assigned, string EmployeeTask)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString2;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = storedprocedure;
                //cmd.Parameters.AddWithValue("@Location", Location);
                cmd.Parameters.AddWithValue("@ItemNo", ItemNo);
                cmd.Parameters.AddWithValue("@Company", Company);
                cmd.Parameters.AddWithValue("@Assigned", Assigned);
                cmd.Parameters.AddWithValue("@Employeetask", EmployeeTask);
                cmd.Parameters.AddWithValue("@QueryType", 48);
                cmd.ExecuteNonQuery();

            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved. Duplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("System Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("{1}", sqlEx.Number, sqlEx.Message);
                return result;
            }
            catch (Exception ex)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                return String.Format("Error: {0}\n", ex.Message);
            }
            sqlTrn.Commit();
            sqlConn.Close();
            return "Process has successfully completed.";
        }


        public DataSet GetTable(string Recuser)
        {
            return SFObjects.LoadDataSet($@"EXEC {storedprocedure} @Recuser ='{Recuser}', @QueryType = 53", _ConnectionString2);

        }


        public DataTable GetTempTableTemplate()
        {
            return SFObjects.LoadDataTable($@"EXEC {storedprocedure}  @QueryType = 57", _ConnectionString2);

        }


        public string ServerLink()
        {
            return SFObjects.returnText($"SELECT Value FROM dbo.SystemConfig WHERE Code = 'Server_Link'", _ConnectionString);
        }

        public DataTable GetDataLIN(string Project, string Company, string Module, string MenuGroup, string MenuItem, string ImplementationStage, string Type, string Status, string ActionItem, string RaisedBy, string ProccessedBy, string TaskforEmployee, string txtdateto, string txtdatefrom)
        {
            return SFObjects.LoadDataTable($@"EXEC {storedprocedure} @Project = '{Project}', 
                                                                     @Company = '{Company}', 
                                                                     @Module = '{Module}', 
                                                                     @MenuGroup = '{MenuGroup}',
                                                                     @MenuItem = '{MenuItem}', 
                                                                     @ImplemStage = '{ImplementationStage}', 
                                                                     @Type = '{Type}', 
                                                                     @Status = '{Status}',
                                                                     @ActionItem = '{ActionItem}',  
                                                                     @RaisedBy = '{RaisedBy}',
                                                                     @ProcessBy = '{ProccessedBy}',
                                                                     @Employeetask = '{TaskforEmployee}',
                                                                     @DateFrom = '{txtdatefrom}',
                                                                     @DateTo = '{txtdateto}',
                                                                     @QueryType = 0", _ConnectionString2);
        }

        public DataSet cuzGetdataLIN(string SpreadType,string Recuser, string addtolistparameter)
        {
            DataTable dt = new DataTable();
            DataSet table = new DataSet();

            dt = SFObjects.LoadDataTable($@"EXEC {storedprocedure} @SpreadType = '{SpreadType}', @QueryType = 54", _ConnectionString2);


            if (dt.Rows.Count > 0)
            {
                
                string SP = dt.Rows[0]["saveSP"].ToString().Replace("= @Recuser", $@"= '{Recuser}' {addtolistparameter}");


                 table = SFObjects.LoadDataSet(SP, _ConnectionString2);
            }
            return table;
        }


        public string GetLookupScript(string scripts, string filter)
        {

            return string.Format(scripts + filter);
        }

        public string GetaddtolistScript(string scripts)
        {

            return string.Format(scripts);
        }

        public DataTable GetExport(string Project, string Company, string Module, string MenuGroup, string MenuItem, string ImplementationStage, string Type, string Status, string ActionItem, string RaisedBy, string ProccessedBy, string TaskforEmployee, string txtdateto, string txtdatefrom)
        {
            return SFObjects.LoadDataTable($@"EXEC {storedprocedure} @Project = '{Project}', 
                                                                     @Company = '{Company}', 
                                                                     @Module = '{Module}', 
                                                                     @MenuGroup = '{MenuGroup}',
                                                                     @MenuItem = '{MenuItem}', 
                                                                     @ImplemStage = '{ImplementationStage}', 
                                                                     @Type = '{Type}', 
                                                                     @Status = '{Status}',
                                                                     @ActionItem = '{ActionItem}',  
                                                                     @RaisedBy = '{RaisedBy}',
                                                                     @ProcessBy = '{ProccessedBy}',
                                                                     @Employeetask = '{TaskforEmployee}',
                                                                     @DateFrom = '{txtdatefrom}',
                                                                     @DateTo = '{txtdateto}',
                                                                     @QueryType = 60", _ConnectionString2);
        }

        public string getScreenShot(string itemno)
        {
            return SFObjects.returnText($@"EXEC {storedprocedure} @ItemNo ='{itemno}' , @QueryType = 62", _ConnectionString2);
        }

        public DataTable getLookUpFilterList(string SpreadType, string lookup)
        {
            return SFObjects.LoadDataTable($@"EXEC {storedprocedure} @SpreadType ='{SpreadType}', @lookup = '{lookup}', @QueryType = 58", _ConnectionString2);
        }

        public DataTable getaddtolistFilter(string SpreadType)
        {
            return SFObjects.LoadDataTable($@"EXEC {storedprocedure} @SpreadType ='{SpreadType}', @QueryType = 59", _ConnectionString2);
        }
        public string SaveScreenShot(string itemno, string content, string recuser)
        {
            try
            {
                //Header
                sqlConn.ConnectionString = _ConnectionString2;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();


                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = storedprocedure;
                cmd.Parameters.AddWithValue("@ItemNo", itemno);
                cmd.Parameters.AddWithValue("@content", content);
                cmd.Parameters.AddWithValue("@recuser", recuser);
                cmd.Parameters.AddWithValue("@QueryType", 61);
                cmd.ExecuteNonQuery();
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Error [{0}]: \nSystem Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("Error [{0}]: \n{1}", sqlEx.Number, sqlEx.Message);
                return result;
            }
            catch (Exception ex)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                return String.Format("Error: {0}\n", ex.Message);
            }
            sqlTrn.Commit();
            sqlConn.Close();
            return "Process has successfully completed.";
        }


        public string SaveGridData1(DataTable dt, string SpreadType, string Recuser, string ItemNo)
        {
            string sqlMessage = string.Empty;
            SqlCommand cmd = new SqlCommand();
            SqlConnection sqlConnection = new SqlConnection(_ConnectionString2);
            sqlConnection.Open();

            SqlTransaction sqlTransaction = sqlConnection.BeginTransaction();

            try
            {
                cmd = new SqlCommand { CommandType = CommandType.StoredProcedure };
                cmd.Connection = sqlConnection;
                cmd.Transaction = sqlTransaction;
                cmd.Parameters.Clear();
                cmd.CommandText = "[ILOG].[nsp_IssuelogInsert]";
                //cmd.Parameters.AddWithValue("@ItemNo", ItemNo);
                //cmd.Parameters.AddWithValue("@Recuser", Recuser);
                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmd.ExecuteNonQuery();
                sqlMessage = "Process has successfully completed.";
                sqlTransaction.Commit();


            }
            catch (SqlException ex)
            {
                sqlTransaction.Rollback();
                sqlMessage = ex.ToString();
                //                sqlMessage = ex.Number != 2627 ? (ex.Number != 547 ? string.Format("Error [{0}]: \n{1}", (object)ex.Number, (object)ex.Message) : string.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.", (object)ex.Number)) : string.Format("Error [{0}]: \nSystem Cannot Save Data.\nDuplicate records are not allowed.", (object)ex.Number);
                // sqlMessage = ex.Number != 2627 ? (ex.Number != 547 ? string.Format("Error: \n{0}", (object)ex.Message) : string.Format("Error: \nSystem Cannot perform action.\nData currently in use.")) : string.Format("Error: \nSystem Cannot Save Data.\nDuplicate records are not allowed.");

            }
            catch (Exception ex)
            {
                sqlTransaction.Rollback();
                sqlMessage = "Error : \n" + ex.Message;
            }
            sqlConnection.Close();
            if (sqlMessage.Contains("success"))
            {
                try
                {
                    sqlMessage = BulkInsertData(dt, table);
                }
                catch (Exception ex)
                {
                    sqlMessage = "Error : \n" + ex.Message;
                }
            }
            //return base.ExecProcedure(cmdlist, _ConnectionString);
            return sqlMessage;
        }

        public string InsertDataToTemp(DataTable dt, string SpreadType, string Recuser)
        {
            string sqlMessage = string.Empty;
            SqlCommand cmd = new SqlCommand();
            SqlConnection sqlConnection = new SqlConnection(_ConnectionString2);
            sqlConnection.Open();

            SqlTransaction sqlTransaction = sqlConnection.BeginTransaction();

            try
            {
                cmd = new SqlCommand { CommandType = CommandType.StoredProcedure };
                cmd.Connection = sqlConnection;
                cmd.Transaction = sqlTransaction;
                cmd.Parameters.Clear();
                cmd.CommandText = "[ILOG].[nsp_IssuelogInsertTemp]";
                cmd.Parameters.AddWithValue("@Recuser", Recuser);
                cmd.Parameters.AddWithValue("@QueryType",3);
                cmd.ExecuteNonQuery();
                sqlMessage = "Process has successfully completed.";
                sqlTransaction.Commit();


            }
            catch (SqlException ex)
            {
                sqlTransaction.Rollback();
                sqlMessage = ex.ToString();
                //                sqlMessage = ex.Number != 2627 ? (ex.Number != 547 ? string.Format("Error [{0}]: \n{1}", (object)ex.Number, (object)ex.Message) : string.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.", (object)ex.Number)) : string.Format("Error [{0}]: \nSystem Cannot Save Data.\nDuplicate records are not allowed.", (object)ex.Number);
                // sqlMessage = ex.Number != 2627 ? (ex.Number != 547 ? string.Format("Error: \n{0}", (object)ex.Message) : string.Format("Error: \nSystem Cannot perform action.\nData currently in use.")) : string.Format("Error: \nSystem Cannot Save Data.\nDuplicate records are not allowed.");

            }
            catch (Exception ex)
            {
                sqlTransaction.Rollback();
                sqlMessage = "Error : \n" + ex.Message;
            }
            sqlConnection.Close();
            if (sqlMessage.Contains("success"))
            {
                try
                {
                    sqlMessage = BulkInsertData(dt, tableTemp);
                }
                catch (Exception ex)
                {
                    sqlMessage = "Error : \n" + ex.Message;
                }
            }
            //return base.ExecProcedure(cmdlist, _ConnectionString);
            return sqlMessage;
        }
        private string BulkInsertData(DataTable dt, string SchemaNtableName)
        {
            SqlConnection conn = new SqlConnection();
            conn.ConnectionString = _ConnectionString2;
            conn.Open();
            SqlConnection SqlConnectionObj = conn;

            string ErrorResult = "";


            try
            {
                using (SqlTransaction sqlTransaction = conn.BeginTransaction())
                {
                    using (SqlBulkCopy bulkCopy = new SqlBulkCopy(conn, SqlBulkCopyOptions.FireTriggers, sqlTransaction))
                    {
                        // Sql55555555555555555555BulkCopy bulkCopy = new SqlBulkCopy(SqlConnectionObj, SqlBulkCopyOptions.TableLock | SqlBulkCopyOptions.FireTriggers | SqlBulkCopyOptions.UseInternalTransaction, null);

                        bulkCopy.BulkCopyTimeout = 0;
                        bulkCopy.BatchSize = 4000;
                        bulkCopy.DestinationTableName = SchemaNtableName;

                        try
                        {
                            //#########################
                            //## LOAD COLUMN MAPPING ##
                            //#########################
                            //string col = string.Empty;
                            //foreach (DataColumn dc in dt.Columns)
                            //{
                            //    bulkCopy.ColumnMappings.Add(dc.ColumnName, dc.ColumnName);
                            //}

                            //Get Column from Source table 
                            //string sourceTableQuery = "Select * from "+ SchemaNtableName+ " where 1 <> 1";

                            //// i use sql helper for executing query you can use corde sw
                            //DataTable dtSource = SFObjects.LoadDataTable(sourceTableQuery,_ConnectionString2);

                            //for (int i = 0; i < dt.Columns.Count; i++)
                            //{
                            //    string destinationColumnName = dt.Columns[i].ToString();

                            //    // check if destination column exists in source table 
                            //    // Contains method is not case sensitive    
                            //    if (dtSource.Columns.Contains(destinationColumnName))
                            //    {
                            //        //Once column matched get its index
                            //        int sourceColumnIndex = dtSource.Columns.IndexOf(destinationColumnName);

                            //        string sourceColumnName = dtSource.Columns[sourceColumnIndex].ToString();

                            //        // give column name of source table rather then destination table 
                            //        // so that it would avoid case sensitivity
                            //        bulkCopy.ColumnMappings.Add(sourceColumnName, sourceColumnName);
                            //    }
                            //}
        //bulkCopy.ColumnMappings.Add(new SqlBulkCopyColumnMapping("ID", "ID"));
        //bulkCopy.ColumnMappings.Add(new SqlBulkCopyColumnMapping("Recuser", "Recuser"));
        //bulkCopy.ColumnMappings.Add(new SqlBulkCopyColumnMapping("rowno", "rowno"));

        bulkCopy.WriteToServer(dt);
                            //bulkCopy.Close();
                            sqlTransaction.Commit();
                            ErrorResult = "Process successfully completed.";

                        }
                        catch (Exception ex)
                        {
                            sqlTransaction.Rollback();
                            ErrorResult = ex.ToString();
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                ErrorResult = "Error.\n" + ex.ToString();
            }
            conn.Close();
            return ErrorResult;
        }
        public DataTable IssueLogTable()
        {
            return SFObjects.LoadDataTable("Select * from " + table + " where 1 <> 1",_ConnectionString2);
        }

        public DataTable getValidationList(string recuser)
        {
            return SFObjects.LoadDataTable($"exec [ILOG].[nsp_IssuelogInsertTemp] @Recuser = '{recuser}', @querytype=4", _ConnectionString2);
        }

        public string SaveDataUploading(string recuser)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString2;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandTimeout = 0;
                cmd.CommandText = "[ILOG].[nsp_IssuelogInsertTemp]";
                cmd.Parameters.AddWithValue("@recuser", recuser);
                cmd.Parameters.AddWithValue("@QueryType", 1);
                cmd.ExecuteNonQuery();

                
            }

            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("System Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("System Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("{1}", sqlEx.Number, sqlEx.Message);
                return result;
            }
            catch (Exception ex)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                return String.Format("Error: {0}\n", ex.Message);
            }

            sqlTrn.Commit();
            sqlConn.Close();
            return "Process has successfully completed.";
        }


        public string SaveDataInsert()
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString2;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();



                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandTimeout = 0;
                cmd.CommandText = "[ILOG].[nsp_IssuelogInsert]";
                //cmd.Parameters.AddWithValue("@recuser", recuser);
                cmd.Parameters.AddWithValue("@QueryType", 1);
                cmd.ExecuteNonQuery();


            }

            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("System Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("System Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("{1}", sqlEx.Number, sqlEx.Message);
                return result;
            }
            catch (Exception ex)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                return String.Format("Error: {0}\n", ex.Message);
            }

            sqlTrn.Commit();
            sqlConn.Close();
            return "Process has successfully completed.";
        }
        //public static implicit operator NOAHIssueLogsDAL(PMORegistrationDAL v)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
