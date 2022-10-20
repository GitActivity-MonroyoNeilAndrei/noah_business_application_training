using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;
using System.Linq;
namespace DALComponent
{
    public class SBQueueApprovalDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "SBQueueApproval"; // This is default parameter  for version
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



        //#FOR EXPORT
        public string LISTINGFILENAME = "Queue Approval", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator
        private SqlConnection conn;
        private SqlTransaction tran;

        public SBQueueApprovalDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }

        public string inquireQuery()
        {
            return string.Format(@"SELECT ''[Code]");
        }

        public DataTable GetDataLIN(string curuser)
        {
            string query = string.Format($@"EXEC [PRT].[nsp_SBQueueApproval] @QueryType = 0, @SellerName = '{curuser}'");

            return SFObjects.LoadDataTable(query, _ConnectionString);
        }

        //public string InquireSalesForceAct(string curuser, string ProspectCustList, string dateFrom, string dateTo)
        //{
        //    return string.Format($@"EXEC [PRT].[nsp_SBSalesCall] @QueryType = 27, @Seller = '{curuser}', @ProspectCustList='{ProspectCustList}', @DateFrom='{dateFrom}', @DateTo='{dateTo}'");
        //}

        //public string InquireProspectCust(string curuser, string SalesForceActList, string dateFrom, string dateTo)
        //{
        //    return string.Format($@"EXEC [PRT].[nsp_SBSalesCall] @QueryType = 28, @Seller = '{curuser}', @SalesForceActList='{SalesForceActList}', @DateFrom='{dateFrom}', @DateTo='{dateTo}'");
        //}


        public string GetData()
        {
            string a = string.Format(@"SELECT '' [Code]");

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
                    cmd.CommandText = "[PRT].[nsp_SBQueueApproval]";
                    cmd.Parameters.AddWithValue("@ID", row["TransactionNo"]);
                    cmd.Parameters.AddWithValue("@SellerName", row["Seller Name"]);
                    cmd.Parameters.AddWithValue("@CustomerName", row["Customer Name"]);
                    cmd.Parameters.AddWithValue("@Unit", row["Unit"]);
                    cmd.Parameters.AddWithValue("@QueueNumber", row["Queue Number"]);
                    cmd.Parameters.AddWithValue("@Status", row["Status"]);
                    cmd.Parameters.AddWithValue("@RecUser", user);
                    cmd.Parameters.AddWithValue("@ModUser", user);
                    cmd.Parameters.AddWithValue("@QueryType", 5);
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

        public DataTable LoadSchema(string curuser)
        {
            string query = string.Format($@"SELECT * FROM [RE].[SBQueueApproval] WHERE 1<>1");

            return SFObjects.LoadDataTable(query, _ConnectionString);

        }

        //public string getNoahDate()
        //{
        //    return SFObjects.returnText(string.Format(@"SELECT FORMAT(dbo.GetNoahDate(), 'MM/dd/yyyy hh:mm:ss tt')"), _ConnectionString);
        //}

        //public DataTable GetYearList()
        //{
        //    return SFObjects.LoadDataTable(@"SELECT YEAR(GETDATE()) YEAR, YEAR(GETDATE()) YEAR
        //                              UNION
        //                              SELECT DISTINCT YEAR, YEAR FROM GL.PERDATES", _ConnectionString);
        //}
    }

}