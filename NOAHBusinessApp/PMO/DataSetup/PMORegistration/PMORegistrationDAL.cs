using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class PMORegistrationDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects(); /// should be added
        #region STANDARD

        public string MenuItemCode = "PMORegistration"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.0";// This is default parameter for version
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
                , _ConnectionString2);
            return StrMessage;
            #endregion
        }

        #endregion

        private SqlConnection sqlConn = new SqlConnection();
        private SqlTransaction sqlTrn;

        private string _ConnectionString;
        private string _ConnectionString2;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "ID",                                       //--column for searching
                                inquireQry = @"SELECT Code,[Description], CASE WHEN Status = 1 THEN 'Yes' ELSE 'No' END Active 
                                               FROM SG.EmployeeStatus", //--query of inquire button
                                listingName = "Division Listing",                              //--form name of listings
                                listingQry = "SELECT Code, [Description], Recuser as [Created by], recdate as [Date Created], moduser as [Modified by], moddate as [Date Modified] FROM SG.Division"; //--query of export and print


        //#FOR EXPORT
        public string LISTINGFILENAME = "Registration",

            GETCOMPANY = "select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END

        public string tblName = "pmo.PortalRegistration";
        public string spName = "PMO.nsp_PortalRegistration";
        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public PMORegistrationDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;

            this.CurrentSelectedItem = selectedItem;
        }

        //---------------------------------------Registration---------------------------------------//
        public DataTable getPropertiesByAccNo(string _accountNo)
        {
            DataSet dsCompany = SFObjects.LoadDataSet($@"exec [zAPI].[nsp_Mob_Assets] @UserID='{_accountNo}', @QueryType = 42", _ConnectionString2);

            DataSet dsAssets = new DataSet();
            dsAssets.Tables.Add(dsCompany.Tables[0].Copy());
            dsAssets.Tables[0].TableName = "Property";
            
            return dsAssets.Tables[0];
        }

        public string getPropertyInfo(string _accountNo, string _property)
        {
            string nonTenant = SFObjects.returnText($@"exec [zAPI].[nsp_Mob_Assets] @PropertyCode='{_property}', @UserID='{_accountNo}', @QueryType = 40", _ConnectionString2);
            string tenant = SFObjects.returnText($@"exec [zAPI].[nsp_Mob_Assets] @PropertyCode='{_property}', @UserID='{_accountNo}', @QueryType = 41", _ConnectionString2);

            if (nonTenant == "" && tenant == "")
            {
                return "404";
            }
            else
            {
                return (nonTenant == "" ? tenant : nonTenant);
            }
        }

        public string[] CheckBackOfficeData(string _accountNo, string _property, string _token)
        {
            bool userExists = true;
            string[] resultList = new string[3];

            string dbName = SFObjects.returnText($"exec [FPTI_NW].[nsp_MobileUserData] @code='{_property}', @QueryType = 21", _ConnectionString2);
            DataSet ds = SFObjects.LoadDataSet($@"
            DECLARE @Result AS INT = 0
            DECLARE @Email AS VARCHAR(500)
            DECLARE @MobileNo AS VARCHAR(20)
		    DECLARE @CustomerCode AS VARCHAR(100) = (SELECT Customer FROM [{dbName}].[PMO].[CustomerEnrollmentLin] WHERE AccountNo = '{_accountNo}')
		
		    IF @CustomerCode <> ''
		    BEGIN
                SET @Result = 1
                SET @Email = (SELECT TOP 1 eMail FROM [{dbName}].PMO.CustomerContact WHERE email <> '' AND Customercode = @CustomerCode)
                SET @MobileNo = (SELECT TOP 1 MobileNo FROM [{dbName}].PMO.CustomerContact WHERE MobileNo <> '' AND Customercode = @CustomerCode)
		    END
		    SELECT @Result, @Email, @MobileNo", _ConnectionString2);

            int ctr = 0;
            if (ds.Tables.Count >= 1)
            {
                foreach (DataTable table in ds.Tables)
                {
                    foreach (DataRow row in table.Rows)
                    {
                        foreach (DataColumn column in table.Columns)
                        {
                            resultList[ctr] = row[column].ToString();
                            ctr++;
                            // read column and item
                        }
                    }
                }
            }
            return resultList;
        }

        public string UserLoginCheck(string _accountInfo)
        {
            return SFObjects.returnText($"exec [zAPI].[nsp_Mob_Accounts] @Email='{_accountInfo}', @QueryType = 20", _ConnectionString2);
        }


        public DataTable GetUserLoadedData(string _email)
        {
            return SFObjects.LoadDataTable($@"exec [zAPI].[nsp_Mob_Accounts] @Email='{_email}', @QueryType = 210", _ConnectionString2);
        }
        //public string[] GetUserLoadedData(string _email)
        //{
        //    string[] resultList = new string[2];
        //    DataSet ds = SFObjects.LoadDataSet($"exec [zAPI].[nsp_Mob_Accounts] @Email='{_email}', @QueryType = 21", _ConnectionString2);

        //    int ctr = 0;
        //    if (ds.Tables.Count >= 1)
        //    {
        //        foreach (DataTable table in ds.Tables)
        //        {
        //            foreach (DataRow row in table.Rows)
        //            {
        //                foreach (DataColumn column in table.Columns)
        //                {
        //                    resultList[ctr] = row[column].ToString();
        //                    ctr++;
        //                    // read column and item
        //                }
        //            }
        //        }
        //    }
        //    return resultList;
        //}

        public string GetPassword(string email)
        {
            return SFObjects.returnText($"exec [zAPI].[nsp_Mob_Accounts] @Email='{email}', @QueryType = 22", _ConnectionString2);
        }

        public string ValidateOTP(string _account, string OTPCode)
        {
            return SFObjects.returnText($"exec [zAPI].[nsp_Mob_Accounts] @AccountNo='{_account}', @OTPCode='{OTPCode}', @QueryType = 11", _ConnectionString2);
        }

        public string ConnectionString { get { return _ConnectionString; } }

        #region Built-in Functionalities
        public string GetTableName(string xda)
        {
            return SFObjects.returnText(String.Format(@"SELECT TOP 1  name AS 'Table' FROM sys.tables WHERE NAME = '{0}' ", xda), _ConnectionString2);
        }

        public string GetTableName2(string xda, string con)
        {
            return SFObjects.returnText(String.Format(@"SELECT TOP 1  name AS 'Table'
                                                        FROM sys.tables WHERE NAME = '{0}' ", xda), con);
        }

        public string GetDADescription(string xda)
        {
            return SFObjects.returnText(String.Format(@"SELECT TOP 1  name AS 'Table'
                                                        FROM sys.tables WHERE NAME = '{0}' ", xda), _ConnectionString2);
        }

        public DataTable GetColumns(string da, string conn)
        {
            string connstring = conn;
            return SFObjects.LoadDataTable(String.Format(@"SELECT COLUMN_NAME as [Column Name] ,DATA_TYPE as [Data Type]  FROM   INFORMATION_SCHEMA.COLUMNS  where TABLE_NAME = '{0}'", GetTableName2(da, connstring)), connstring);
        }

        public DataTable GetColumnValues(string xda, string xfilter, string xcol, string conn)
        {
            //string connstring = GetConString(xda);

            string xtblename = GetTableName2(xda, conn);
            string xquery = String.Format(@"SELECT [{0}] from {1} {2}", xcol, xtblename, xfilter);
            return SFObjects.LoadDataTable(xquery, conn);
        }
        #endregion

        public DataTable getPropertyList()
        {
            return SFObjects.LoadDataTable($@"EXEC [zAPI].[nsp_Mob_Assets] @QueryType = 20", _ConnectionString2);
        }

        public DataTable getCustomerTypes()
        {
            return SFObjects.LoadDataTable($@"EXEC [zAPI].[nsp_Mob_Assets] @QueryType = 21", _ConnectionString2);
        }
        public String getDataPrivacy()
        {
            return SFObjects.returnText($@"EXEC [zAPI].[nsp_Mob_Assets] @QueryType = 10", _ConnectionString2);
        }

        public string[] CheckBackOfficeData(string _accountNo, string _property)
        {
            bool userExists = true;
            string[] resultList = new string[3];

            string dbName = SFObjects.returnText($"exec [FPTI_NW].[nsp_MobileUserData] @code='{_property}', @QueryType = 21", _ConnectionString2);
            DataSet ds = SFObjects.LoadDataSet($@"
            DECLARE @Result AS INT = 0
            DECLARE @Email AS VARCHAR(500)
            DECLARE @MobileNo AS VARCHAR(20)
		    DECLARE @CustomerCode AS VARCHAR(100) = (SELECT Customer FROM [{dbName}].[PMO].[CustomerEnrollmentLin] WHERE AccountNo = '{_accountNo}')
		
		    IF @CustomerCode <> ''
		    BEGIN
                SET @Result = 1
                SET @Email = (SELECT TOP 1 eMail FROM [{dbName}].PMO.CustomerContact WHERE email <> '' AND Customercode = @CustomerCode)
                SET @MobileNo = (SELECT TOP 1 MobileNo FROM [{dbName}].PMO.CustomerContact WHERE MobileNo <> '' AND Customercode = @CustomerCode)
		    END
		    SELECT @Result, @Email, @MobileNo", _ConnectionString2);

            int ctr = 0;
            if (ds.Tables.Count >= 1)
            {
                foreach (DataTable table in ds.Tables)
                {
                    foreach (DataRow row in table.Rows)
                    {
                        foreach (DataColumn column in table.Columns)
                        {
                            resultList[ctr] = row[column].ToString();
                            ctr++;
                            // read column and item
                        }
                    }
                }
            }
            return resultList;
        }

        public string getAccName(string _property, string _accountNo)
        {
            return SFObjects.returnText($@"exec [zAPI].[nsp_Mob_Assets] @PropertyCode='{_property}', @UserID='{_accountNo}', @QueryType = 31", _ConnectionString2);
        }

        public string UserRegCheck(string _accountInfo)
        {
            return SFObjects.returnText($"exec [zAPI].[nsp_Mob_Accounts] @Email='{_accountInfo}', @QueryType = 50", _ConnectionString2);
        }

        public string MobRegCheck(string _accountInfo)
        {
            string regCount = SFObjects.returnText($"SELECT COUNT(*) FROM zAPI.Mob_RegistrationDetails WHERE MobileNo='{_accountInfo}' AND [Status] = 3 AND [parent] = 1", _ConnectionString2);
            string regCountNA = SFObjects.returnText($"SELECT COUNT(*) FROM zAPI.Mob_RegistrationDetails WHERE MobileNo='{_accountInfo}' AND [Status] = 2 AND [parent] = 1", _ConnectionString2);
            string result = "1";

            int RegCtr = 0, RegNACtr = 0;

            try
            {
                RegCtr = Int32.Parse(regCount);
            }
            catch (FormatException) { }

            try
            {
                RegNACtr = Int32.Parse(regCountNA);
            }
            catch (FormatException) { }

            if (RegNACtr > 0)
            {
                result = "2";
            }

            if (RegCtr > 0)
            {
                result = "3";
            }

            return result;

        }

        public string CheckPendingRegistration(string _accountNo)
        {
            return SFObjects.returnText($@"exec [zAPI].[nsp_Mob_Accounts] @AccountNo='{_accountNo}', @QueryType = 4", _ConnectionString2);
        }

        public string ResendRegOTP(string _email, string _mobile, string _property, string _OTPCode)
        {
            return SFObjects.returnText($"exec [zAPI].[nsp_Mob_Accounts] @Email='{_email}', @MobileNo='{_mobile}', @Property='{_property}', @OTPCode='{_OTPCode}', @QueryType = 12", _ConnectionString2);
        }

        public string getPath(string _compcode)
        {
            string AddtionalPath = @"Registration\";
            string serverPath = SFObjects.returnText("Select [value] from dbo.SystemConfig where code = 'Server_Path'", _ConnectionString2);
            string companyPath = SFObjects.returnText($"Select fileserversub from [zAPI].[Mob_CompanyMapping] where companycode = '{_compcode}'", _ConnectionString2);
            
            return serverPath + @"\" + companyPath + @"\" + AddtionalPath;
        }

        public string serverPath()
        {
            string serverPath = SFObjects.returnText("Select [value] from dbo.SystemConfig where code = 'Server_Path'", _ConnectionString2);
            return serverPath;
        }

        public string[] RegisterNew(string _accountNo, string _name, string _email, string _mobileNo, string _property, string _customerType, string _token, string _parent, string idPath, string selfiePath)
        {
            DateTime dtime = SFObjects.GetServerDateTime(_ConnectionString2);
            string[] resultList = new string[2];
            string user = _accountNo;
            int parsemin = 43200;
            string dexp = dtime.AddMinutes(parsemin).ToString("yyyy-MM-dd HH:mm:ss.fff");
            string IPaddress = nwSystem.GetClientIPAddress();
            string tokenkey = GetAuthToken(user, true, "43200");
            
            DataSet ds = SFObjects.LoadDataSet($"exec [zAPI].[nsp_Mob_Accounts] @AccountNo='{_accountNo}', @RegistrationToken='{_token}', @PasswordToken='{tokenkey}', @Name='{_name}', @Email='{_email}', @MobileNo='{_mobileNo}', @Property='{_property}', @CustomerType='{_customerType}', @ProofIDPath='{idPath}', @ProofSelfiePath='{selfiePath}', @ParentCode='{_parent}', @QueryType = 101", _ConnectionString2);

            int ctr = 0;
            if (ds.Tables.Count >= 1)
            {
                foreach (DataTable table in ds.Tables)
                {
                    foreach (DataRow row in table.Rows)
                    {
                        foreach (DataColumn column in table.Columns)
                        {
                            resultList[ctr] = row[column].ToString();
                            ctr++;
                            // read column and item
                        }
                    }
                }
            }
            return resultList;
        }

        public bool SendRegConfirmation(string _email, string _property)
        {
            int result = 3;
            string query = SFObjects.returnText($"exec [zAPI].[nsp_Mob_Accounts] @Email='{_email}', @Property='{_property}', @QueryType = 13", _ConnectionString2);
            try
            {
                result = Int32.Parse(query);
            }
            catch { }
            return result == 1 ? true : false;
        }

        public string getRegToken(string _user, bool isUrl, string mins)
        {
            return GetAuthToken(_user, isUrl, mins);
        }

        private string GetAuthToken(string _user, bool isUrl, string mins)
        {
            string exp_min = mins;
            DateTime dtime = SFObjects.GetServerDateTime(_ConnectionString2);
            string dater = dtime.ToString("yyyy-MM-dd hh:mm:ss.fff");
            string expmin = nwSystem.GetAppSettings("API-Expired");
            int parsemin = 43200;
            //expmin
            try
            {
                parsemin = int.Parse(expmin);
            }
            catch { expmin = ""; }
            try
            {
                if (expmin.Trim() == "")
                    parsemin = int.Parse(exp_min);
            }
            catch { }

            string dexp = dtime.AddMinutes(parsemin).ToString("yyyy-MM-dd HH:mm:ss.fff");
            string IPaddress = nwSystem.GetClientIPAddress();
            string tokenkey = dater + "|" + _user.ToLower() + "|" + IPaddress + "|" + dexp;
            tokenkey = nwSystem.StringEncryptAES(tokenkey, isUrl);

            string newUserToken = SFObjects.returnText($@"declare @recuser varchar(50) = '{_user}', @recdate datetime = (select dbo.getnoahdate())
                        , @tokenkey varchar(2500) = '{tokenkey}', @expire varchar(2500) = '{nwSystem.StringEncryptAES(dexp)}', @expiredate datetime = '{dexp}', @IP varchar(50) = '{IPaddress}'
                          insert into[FPTI_NW].[APIAuth]([recuser],[recdate],[tokenkey],[expire],[expiredate] ,[IP]) values(@recuser, @recdate, @tokenkey , @expire, @expiredate , @IP)
                          select @tokenkey[access_token]
                       ", _ConnectionString2);

            return newUserToken;
        }

        public DataTable LoadSchema()
        {
            return SFObjects.LoadDataTable($"SELECT * FROM {tblName} WHERE 1<>1", _ConnectionString);
        }

        public string GetData(string recuser, string Code)
        {
            string a = string.Format($@"EXEC {spName} @recuser='{recuser}', @TraineeID='{Code}',@QueryType = 0");

            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/
            return a;
        }

        public string SaveData(DataTable dt)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = spName;
            //cmd.Parameters.AddWithValue("@TraineeID", dt.Rows[0]["TraineeID"]);
            cmd.Parameters.AddWithValue("@PropertyName", dt.Rows[0]["PropertyName"]);
            cmd.Parameters.AddWithValue("@CustomerType", dt.Rows[0]["CustomerType"]);
            cmd.Parameters.AddWithValue("@AccountNo", dt.Rows[0]["AccountNo"]);
            cmd.Parameters.AddWithValue("@Name", dt.Rows[0]["Name"]);
            cmd.Parameters.AddWithValue("@EmailAddress", dt.Rows[0]["EmailAddress"]);
            cmd.Parameters.AddWithValue("@MobileNo", dt.Rows[0]["MobileNo"]);
            
            cmd.Parameters.AddWithValue("@QueryType", 1);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string DeleteData(string TraineeID, string ModUser)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = spName;
            cmd.Parameters.AddWithValue("@TraineeID", TraineeID);
            cmd.Parameters.AddWithValue("@Moduser", ModUser);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string LISTINGQUERY(string recuser)
        {
            return string.Format($@"EXEC {spName} @recuser='{recuser}',@QueryType=5");
        }
       
    }
}