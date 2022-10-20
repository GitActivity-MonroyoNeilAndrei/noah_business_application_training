using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;
using System.Configuration;

namespace DALComponent
{
    public class PMOCustomerLedgerDAL : NoahWebLib.DatabaseHandler
    {

        nwSFObjects nwSFObjects = new nwSFObjects();
        private SqlTransaction sqlTrn;
        private SqlConnection sqlConn = new SqlConnection();

        #region STANDARD

        public string MenuItemCode = "PMOCustomerLedger"; // This is default parameter  for version
        public string MenuItemVersion = "9.0.0.19"; // This is default parameter for version
        public string UpdateVersion(string _MenuItemCode, string _MenuItemVersion)
        {
            if (_MenuItemCode.Trim() != "") MenuItemCode = _MenuItemCode;
            if (_MenuItemVersion.Trim() != "") MenuItemVersion = _MenuItemVersion;
            return UpdateVersion();
        }
        public string UpdateVersion()
        {
            #region donot delete Version Updating
            string StrMessage = nwSFObjects.returnText(
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
        public readonly string errorString = "Error",                                     /* do not change this line */
                                primaryKey = "Code";                                      /* column for searching */

        //Stored Procedures
        private string storedProcedureName = "[PMO].[nsp_CustomerLedger]";
        //SQLConn nwSFObjects = new SQLConn();

        //#FOR EXPORT
        public string LISTINGFILENAME = "Customer Ledger", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END
        public string CurrentSelectedItem;                                                /* selected item in binding navigator */

        public PMOCustomerLedgerDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }


        public DataTable LoadSchema()
        {
            return nwSFObjects.LoadDataTable("SELECT * FROM [WF].[SubStages] WHERE 1<>1", _ConnectionString);
        }

        public string GetData()
        {
            string a = string.Format(@"EXEC [WF].[nsp_SubStages] @QueryType = 0");
            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }
        public string getAccountStatus(string accntNo) {
            string q = $@"SELECT pmo.fn_getAccountStatus('{accntNo}')";
            return SFObjects.returnText(q, _ConnectionString);
        }
        

        public string getNewCode()
        {
            return nwSFObjects.returnText($@"EXEC [WF].[nsp_SubStages] @QueryType = 7", _ConnectionString);
        }

        
        public string SaveData(DataTable dt, bool IsNewRow)
        {

            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                DataRow dr = dt.Rows[0];
                object Code = "";
                if (IsNewRow)
                    Code = getNewCode();
                else
                    Code = dr["Code"];

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = "[WF].[nsp_SubStages]";
                cmd.Parameters.AddWithValue("@Code", Code);
                cmd.Parameters.AddWithValue("@Description", dr["Description"]);
                cmd.Parameters.AddWithValue("@MainStages", dr["MainStages"]);
                cmd.Parameters.AddWithValue("@SubStagesType", dr["SubStagesType"]);
                cmd.Parameters.AddWithValue("@Recuser", dr["RecUser"]);
                cmd.Parameters.AddWithValue("@Moduser", dr["ModUser"]);
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);
                cmd.ExecuteNonQuery();
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format(
                        "Error [{0}]: \nSystem Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.",
                        sqlEx.Number);
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

        public string DeleteData(String Code, string mainStagesCode)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();


                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = "[WF].[nsp_SubStages]";
                cmd.Parameters.AddWithValue("@Code", Code);
                cmd.Parameters.AddWithValue("@MainStages", mainStagesCode);
                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmd.ExecuteNonQuery();
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format(
                        "Error [{0}]: \nSystem Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.",
                        sqlEx.Number);
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
        public string getAccountDetails() {
            return string.Format($@"EXEC {storedProcedureName} @QueryType = 1");
        }
        public string inquireQuery()
        {
            return string.Format($@"EXEC {storedProcedureName} @QueryType = 1");
        }

        public string LISTINGQUERY(string activeTab, string xCode)
        {
            if (activeTab == "Billing_Statement") {
                return string.Format($@"EXEC {storedProcedureName} @QueryType = 7, @AccountNo = '{xCode}'");
            }
            else {
                return string.Format($@"EXEC {storedProcedureName} @QueryType = 8, @AccountNo = '{xCode}'");
            }
        }
       
        public DataTable getDefaultFilter(string id)
        {
            return nwSFObjects.LoadDataTable($@"SELECT * FROM AP.fn_getdefaultlocforuserreports('{id}')", _ConnectionString);
        }

        

        //NDB FUnctions
        public DataTable getLevelCodeDesc(string accountNo, string level)
        {
            return nwSFObjects.LoadDataTable(string.Format($@"EXEC {storedProcedureName} @AccountNo = '{accountNo}', @Level = {level}, @QueryType = 3"), _ConnectionString);
        }
        #region Get LookUp Data

        public string getlocationlookup(string user)
        {
            return string.Format($@"EXEC AP.nsp_CustomerVendorLedger @QueryType = 1, @RecUser = '{user}'");
        }
        public string getlugName(string LedgerType,string location)
        {
            return string.Format($@"EXEC AP.nsp_CustomerVendorLedger @QueryType = 22, @LedgerType = '{LedgerType}', @location= '{location}'");
        }
        public string getPCCC(string location,string recuser)
        {
            return string.Format($@"EXEC AP.nsp_CustomerVendorLedger @QueryType = 3, @location ='{location}', @recUser = '{recuser}'");
        }

        public string getDynamicPCCCName()
        {
            return nwSFObjects.returnText(string.Format($@"EXEC AP.nsp_CustomerVendorLedger @QueryType = 2"), _ConnectionString);
        }

        internal DataTable LoadLedgerType()
        {
            return nwSFObjects.LoadDataTable($@"EXEC AP.nsp_CustomerVendorLedger @QueryType = 21", _ConnectionString);
        }
        #endregion

        internal DataTable getCustVndrAcctSummDT(string RecUser, string Vendor, string Customer,string asOfDate,string location,string PCCC)
        {
            return nwSFObjects.LoadDataTable($@"EXEC AP.nsp_CustomerVendorLedger @RecUser = '{RecUser}', @VendorCode = '{Vendor}', @CustomerCode = '{Customer}',@AsOfDate = '{asOfDate}', @location = '{location}', @PCCC = '{PCCC}',  @QueryType = 23", _ConnectionString);
        }

        internal DataTable getBillingStatementTab(string accountNo)
        {
            return nwSFObjects.LoadDataTable($@"EXEC {storedProcedureName} @AccountNo ='{accountNo}', @QueryType = 4", _ConnectionString);
        }
        //NDB function
        public DataTable getBillingStmntDetails(string accountNo, string docno) {
            return nwSFObjects.LoadDataTable($@"EXEC {storedProcedureName}  @AccountNo ='{accountNo}', @docno= '{docno}', @QueryType = 5", _ConnectionString);
        }
        internal DataTable getCustomerLedgerTab(string accountNo)
        {
            return nwSFObjects.LoadDataTable($@"EXEC {storedProcedureName} @AccountNo ='{accountNo}', @QueryType = 6", _ConnectionString);
        }
        

        internal DataTable DynamicLabel(string AccountNo)
        {
            return nwSFObjects.LoadDataTable($@"EXEC {storedProcedureName} @AccountNo ='{AccountNo}', @QueryType = 2", _ConnectionString);
        }


        internal DataTable getGridVndrTranDT(string RecUser, string Vendor,string asofDate,string location,string PCCC)
        {
            return nwSFObjects.LoadDataTable($@"EXEC AP.nsp_CustomerVendorLedger @RecUser = '{RecUser}', @VendorCode = '{Vendor}', @AsOfDate = '{asofDate}', @location = '{location}', @PCCC = '{PCCC}', @QueryType = 24", _ConnectionString);
        }

        internal DataTable getGridCustTranDT(string RecUser, string Customer ,string asOfDate,string location, string PCCC)
        {
            return nwSFObjects.LoadDataTable($@"EXEC AP.nsp_CustomerVendorLedger @RecUser = '{RecUser}', @CustomerCode = '{Customer}' , @AsOfDate = '{asOfDate}', @location = '{location}' ,@PCCC = '{PCCC}', @QueryType = 25", _ConnectionString);
        }
    }
}