using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class MenuitemDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "PaymentHistory"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.0"; // This is default parameter for version
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

        private string focusRecordPK;
        private string _ConnectionString;
        private string _ConnectionString2;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code";                                      //--column for searching

        private string storedProcHDR = "[PMO].[nsp_PaymentHistorySOA]";

        //#FOR EXPORT
        public string LISTINGFILENAME = "PAYMENT HISTORY", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator
        private string transtypecode = "";
        private SqlConnection conn;
        private SqlTransaction tran;


        public MenuitemDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }

        public string GetData()
        {
            string a = string.Format(@"Select '' [Code]");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/
            return a;
        }

        public DataTable GetUserCode(string scode)
        {
            DataTable dataTable = new DataTable();
            try
            {
                conn = new SqlConnection(_ConnectionString2);
                conn.Open();
                tran = conn.BeginTransaction();
                SqlCommand cmd = new SqlCommand();

                    cmd = new SqlCommand();
                    cmd.Connection = conn;
                    cmd.CommandType = CommandType.Text;
                    cmd.Transaction = tran;
                    cmd.Parameters.Clear();
                    cmd.CommandText = @"Select UserID,'sms' [tag] from [FPTI_NW].[noahweb_zSms] where [MobileNum] = @code and [status] = 1
                                    union
                                    Select UserID,'email' [tag] from [FPTI_NW].[noahweb_zEmail] where [email] = @code and [status] = 1
                                     ";
                    cmd.Parameters.AddWithValue("@code", scode);

                   
                    new SqlDataAdapter(cmd).Fill(dataTable);
                    return dataTable;

            }
            catch (SqlException sqlEx)
            {
                tran.Rollback();
                conn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Error [{0}]: \nSystem Cannot Process Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("Error [{0}]: \n{1}", sqlEx.Number, sqlEx.Message);
                return dataTable;
            }
            catch (Exception ex)
            {
                tran.Rollback();
                conn.Close();
                return dataTable;
            }

            tran.Commit();
            conn.Close();

            return dataTable;
        }
        public string CheckUser(string _accountInfo)
        {
            string ds = SFObjects.returnText($"exec [zAPI].[nsp_Mob_Accounts] @AccountNo='{_accountInfo}', @QueryType = 9", _ConnectionString2);
            return ds;
        }

        public string GetParentAccount(string _email)
        {
            return SFObjects.returnText($"exec [zAPI].[nsp_Mob_Accounts] @Email='{_email}', @QueryType = 80", _ConnectionString2);
        }

        public bool InsertOTP(string _email, int _OTPType, string _OTPCode)
        {
            int result = 2;
            bool userExists = true;
            string query = SFObjects.returnText($"exec [zAPI].[nsp_Mob_Accounts] @Email='{_email}', @OTPType='{_OTPType}', @OTPCode='{_OTPCode}', @QueryType = 5", _ConnectionString2);
            try
            {
                result = Int32.Parse(query);
            }
            catch { }
            userExists = result > 0 ? true : false;
            return userExists;
        }
       

        public string LISTINGQUERY()
        {
            return string.Format(@"Select '' [Code]");
        }

        public string inquireQuery()
        {
            return string.Format(@"Select '' [Code]");
        }

        //public string InquireCustomerList(string custClassList)
        //{
        //    return string.Format($@"Exec [PRT].[nsp_PaymentHistory] @QueryType = 20, @CustClassList='{custClassList}'");
        //}

        //public string InquireCustClassList(string customerList)
        //{
        //    return string.Format($@"Exec [PRT].[nsp_PaymentHistory] @QueryType = 21, @CustomerList='{customerList}'");
        //}

        public string getNoahDate()
        {
            return SFObjects.returnText("SELECT dbo.GetNoahDate()", _ConnectionString);
        }

        public string lugCustomer_aspx()
        {
            return string.Format($@"Exec [PRT].[nsp_PaymentHistory] @QueryType = 20");
        }

        public string lugProject()
        {
            return string.Format($@"EXEC [PMO].[nsp_PaymentHistorySOA] @QueryType = 8");
        }

        public string lugMOP()
        {
            return string.Format($@"EXEC [PMO].[nsp_PaymentHistorySOA] @QueryType = 9");
        }

        public DataTable LoadSchema(string customerList, string custClassList)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[PRT].[nsp_PaymentHistory]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@CustomerList", customerList);
            cmd.Parameters.AddWithValue("@CustClassList", custClassList);
            cmd.Parameters.AddWithValue("@QueryType", 0);

            return base.ExecGetData(cmd, _ConnectionString);

            string query = string.Format($@"EXEC [PRT].[nsp_SBDeactivatedClientRegSummRpt] @QueryType = 0, 
                                                                                      @CustomerList = '{customerList}',
                                                                                      @CustClassList = '{custClassList}'");


            return SFObjects.LoadDataTable(query, _ConnectionString);

        }
        public string getuser(string token)
        {
            return SFObjects.returnText($"select recuser from fpti_nw.APIAuth where tokenkey = '{token}'", _ConnectionString2);
        }

        public string ValidateOTP(string _account, string OTPCode, string _token, string _user)
        {
            return SFObjects.returnText($"exec [zAPI].[nsp_Mob_Accounts] @AccountNo='{_account}', @OTPCode='{OTPCode}', @QueryType = 11", _ConnectionString2);
        }




    }
}