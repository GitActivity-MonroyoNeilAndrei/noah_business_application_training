using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class PMONoticeHistoryDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "NoticeHistory"; // This is default parameter  for version
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
        public readonly string errorString = "Error",                                         //--do not change this line
                                primaryKey = "Code";                                      //--column for searching



        //#FOR EXPORT
        public string LISTINGFILENAME = "Notice History", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator
        private string transtypecode = "";
        private SqlConnection conn;
        private SqlTransaction tran;


        public PMONoticeHistoryDAL(string ConnectionString, string ConnectionString2, string selectedItem)
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

        public string ProcessData(DataTable dt, string user)
        {
            try
            {
                conn = new SqlConnection(_ConnectionString);
                conn.Open();
                tran = conn.BeginTransaction();
                SqlCommand cmd = new SqlCommand();

                foreach (DataRow row in dt.Rows)
                {
                    cmd = new SqlCommand();
                    cmd.Connection = conn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = tran;
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[PRT].[nsp_NoticeHistory]";
                    cmd.Parameters.AddWithValue("@CustomerCode", row["CustomerCode"]);
                    cmd.Parameters.AddWithValue("@Reason", row["Reason"]);
                    cmd.Parameters.AddWithValue("@DocStatus", row["Status"]);
                    cmd.Parameters.AddWithValue("@RecUser", user);
                    cmd.Parameters.AddWithValue("@ModUser", user);
                    cmd.Parameters.AddWithValue("@QueryType", 1);
                    cmd.ExecuteNonQuery();
                }
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
                return result;
            }
            catch (Exception ex)
            {
                tran.Rollback();
                conn.Close();
                return String.Format("Error: {0}\n", ex.Message);
            }

            tran.Commit();
            conn.Close();

            return "Process has successfully completed.";
        }

        public System.Data.DataTable getDetails(string dateFilterFrom, string dateFilterTo, string user)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[PMO].[nsp_NoticeHistorySOA]";
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@AccountNo", user);
            cmd.Parameters.AddWithValue("@DateFrom", dateFilterFrom);
            cmd.Parameters.AddWithValue("@DateTo", dateFilterTo);
            cmd.Parameters.AddWithValue("@QueryType", 1);

            return base.ExecGetData(cmd, _ConnectionString);

            //string query = string.Format($@"EXEC [PMO].[nsp_NoticeHistorySOA] @QueryType = 1, 
            //                                                                          @DateFrom  = '{dateFilterFrom}',
            //                                                                          @DateTo  = '{dateFilterTo}',
            //                                                                          @AccountNo  = '{user}'");

            //return SFObjects.LoadDataTable(query, _ConnectionString);
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
        //    return string.Format($@"Exec [PRT].[nsp_NoticeHistory] @QueryType = 20, @CustClassList='{custClassList}'");
        //}

        //public string InquireCustClassList(string customerList)
        //{
        //    return string.Format($@"Exec [PRT].[nsp_NoticeHistory] @QueryType = 21, @CustomerList='{customerList}'");
        //}

        public string getNoahDate()
        {
            return SFObjects.returnText("SELECT dbo.GetNoahDate()", _ConnectionString);
        }

        public string lugCustomer_aspx()
        {
            return string.Format($@"Exec [PRT].[nsp_NoticeHistory] @QueryType = 20");
        }

        public DataTable LoadSchema(string customerList, string custClassList)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = "[PRT].[nsp_NoticeHistory]";
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

    }
}