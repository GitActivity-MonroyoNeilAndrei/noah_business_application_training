using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;

//using NoahWebLib;


namespace DataAccessLayers
{
    public class FPTISummaryReportDAL : NoahWebLib.DatabaseHandler
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
        private string table = "[NS].[IssueLog]";

        private string _ConnectionString2 = "";
        private SqlConnection sqlConn = new SqlConnection();
        private SqlTransaction sqlTrn;
        #region STANDARD

        public string MenuItemCode = "Issue Logs"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.3";// This is default parameter for version 
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

        

        public FPTISummaryReportDAL(string ConnectionString, string ConnectionString2, string selectedItem)
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

            if (strmessage.ToLower().IndexOf("successfully") >=0)
            {
                if(code != "" && newpassword != oldpassword)
                {
                    SFObjects.returnText($"update [fpti].[user] SET LastPasswordChanged = dbo.GetNoahDate()  where code = '{code}'", _ConnectionString);
                }
            }

            return strmessage;
        }

        public string DeleteData(string Code, String bModUser )
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
                                                            WHERE pua.[PowerUserCode]='{0}'", usercode.Replace("'","''")), _ConnectionString);
        }

        public bool CheckConfig() {

            return Parser.ParseInt(SFObjects.returnText(@"SELECT [value] FROM [dbo].[SystemConfig] WHERE code ='COMPADMIN'", _ConnectionString)).Equals(1);
        
        }

        public void DisableAccount() {

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

        public string CheckUser(string User) {


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

        public string SaveGridData(DataTable dt)
        {
            try
            {
                //Header
                sqlConn.ConnectionString = _ConnectionString2;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();
                foreach (DataRow drLin in dt.Rows)
                {

                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    //cmd.CommandTimeout = 0;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn;
                    cmd.Parameters.Clear();
                    cmd.CommandText = storedprocedure;
                    cmd.Parameters.AddWithValue("@Company", drLin["Company"]);
                    cmd.Parameters.AddWithValue("@Project", drLin["Project"]);
                    cmd.Parameters.AddWithValue("@ItemNo ", drLin["ItemNo"]);
                    cmd.Parameters.AddWithValue("@DateRaised", drLin["DateRaised"]);
                    cmd.Parameters.AddWithValue("@ImplemStage", drLin["ImplemStage"]);
                    cmd.Parameters.AddWithValue("@StatusDoc", drLin["StatusDoc"]);
                    cmd.Parameters.AddWithValue("@TestCase", drLin["TestCase"]);
                    cmd.Parameters.AddWithValue("@Module", drLin["Module"]);
                    cmd.Parameters.AddWithValue("@Menugroup", drLin["Menugroup"]);
                    cmd.Parameters.AddWithValue("@SubMenuGroup", drLin["SubMenuGroup"]);
                    cmd.Parameters.AddWithValue("@MenuItem", drLin["MenuItem"]);
                    cmd.Parameters.AddWithValue("@Concern", drLin["Concern"]);
                    cmd.Parameters.AddWithValue("@Client", drLin["Client"]);
                    cmd.Parameters.AddWithValue("@RaisedBy", drLin["RaisedBy"]);
                    cmd.Parameters.AddWithValue("@Type", drLin["Type"]);
                    cmd.Parameters.AddWithValue("@SubType", drLin["SubType"]);
                    cmd.Parameters.AddWithValue("@Status", drLin["Status"]);
                    cmd.Parameters.AddWithValue("@ActionItem", drLin["ActionItem"]);
                    cmd.Parameters.AddWithValue("@FPTIRemarks", drLin["FPTIRemarks"]);
                    cmd.Parameters.AddWithValue("@FeedbackDate", drLin["FeedbackDate"]);
                    cmd.Parameters.AddWithValue("@ProcessBy", drLin["ProcessBy"]);
                    cmd.Parameters.AddWithValue("@Assigned", drLin["Assigned"]);
                    cmd.Parameters.AddWithValue("@Resolution ", drLin["Resolution"]);
                    cmd.Parameters.AddWithValue("@Enhancement", drLin["Enhancement"]);
                    cmd.Parameters.AddWithValue("@NonNegotiableEnhancement", drLin["NonNegotiableEnhancement"]);
                    cmd.Parameters.AddWithValue("@RequiredForms", drLin["RequiredForms"]);
                    cmd.Parameters.AddWithValue("@StandardVersion", drLin["StandardVersion"]);
                    cmd.Parameters.AddWithValue("@EnhancementNotes", drLin["EnhancementNotes"]);
                    cmd.Parameters.AddWithValue("@Mandays", drLin["Mandays"]);
                    cmd.Parameters.AddWithValue("@MandaysSubmission", drLin["MandaysSubmission"]);
                    cmd.Parameters.AddWithValue("@ButtonTriggered", drLin["ButtonTriggered"]);
                    cmd.Parameters.AddWithValue("@Employeetask", drLin["Employeetask"]);
                    cmd.Parameters.AddWithValue("@TargetStartDate", drLin["TargetStartDate"]);
                    cmd.Parameters.AddWithValue("@TargetEndDate", drLin["TargetEndDate"]);
                    cmd.Parameters.AddWithValue("@Recuser", drLin["Recuser"]);
                    cmd.Parameters.AddWithValue("@recdate", drLin["recdate"]);
                    cmd.Parameters.AddWithValue("@modifiedby", drLin["modifiedby"]);
                    cmd.Parameters.AddWithValue("@ModifiedDate", drLin["ModifiedDate"]);
                    cmd.Parameters.AddWithValue("@rowno", drLin["rowno"]);
                    cmd.Parameters.AddWithValue("@Priority", drLin["PriorityLevel"]);
                    cmd.Parameters.AddWithValue("@StartTime", drLin["StartTime"]);
                    cmd.Parameters.AddWithValue("@EndTime", drLin["EndTime"]);
                    cmd.Parameters.AddWithValue("@Location", drLin["Location"]);
                    cmd.Parameters.AddWithValue("@PercentageofCompletion", drLin["PercentageofCompletion"]);
                    cmd.Parameters.AddWithValue("@RefCompany", drLin["RefCompany"]);
                    cmd.Parameters.AddWithValue("@DocStatus", drLin["DocStatus"]);
                    cmd.Parameters.AddWithValue("@QueryType", 1);
                    cmd.ExecuteNonQuery();
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
        public string getScreenShot(string itemno)
        {
            return SFObjects.returnText($@"EXEC {storedprocedure} @ItemNo ='{itemno}' , @QueryType = 32", _ConnectionString2);
        }
        
        public string SaveScreenShot(string itemno,string content,string recuser)
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
                    cmd.Parameters.AddWithValue("@QueryType", 31);
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
    }
}
