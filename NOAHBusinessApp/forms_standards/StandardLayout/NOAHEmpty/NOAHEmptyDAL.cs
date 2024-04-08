using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;

//using NoahWebLib;


namespace DataAccessLayers
{
    public class NOAHEmptyDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        private string _ConnectionString;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code",                                       //--column for searching
                                inquireQry = "Select Code, Description from [FG].[UOMMaster]", //--query of inquire button
                                listingName = "FG UOM Listing",                              //--form name of listings
                                listingQry = "select Code, Description, Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] from [FG].[UOMMaster]"; //--query of export and print
        public readonly int listingStartRow = 6;                                       //--default start row

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        private string _ConnectionString2 = "";
        #region STANDARD

        public string MenuItemCode = "NWADMIN_ACCOUNT"; // This is default parameter  for version
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

        
        public NOAHEmptyDAL(string ConnectionString, string ConnectionString2, string selectedItem)
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

        public System.Data.DataTable GetData(string usercode)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[FG].[nsp_UOMMaster]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@QueryType", 0);
            return base.ExecGetData(cmd, _ConnectionString, true);
        }

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



    }
}
