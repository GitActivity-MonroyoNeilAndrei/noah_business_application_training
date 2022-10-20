using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class SBHoldingOfUnitDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "SBHoldingOfUnit"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.1E"; // This is default parameter for version
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
        public string LISTINGFILENAME = "Holding of Unit", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public string spName = "[PRT].[nsp_HoldUnitEntry]";

        private string transtypecode = "HOLDPR";
        private SqlConnection conn;
        private SqlTransaction tran;

        public SBHoldingOfUnitDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }
        public DataTable GetDataHDR(string recuser, string unitCode)
        {
            return SFObjects.LoadDataTable(string.Format($@"EXEC {spName} @QueryType = 0, @RecUser = '{recuser}', @UnitCode='{unitCode}'"), _ConnectionString);
        }

        public string SaveData(DataTable dtHDR, DataTable dtUnitDtls, bool IsNewRow)
        {
            try
            {
                DataRow dr = dtHDR.Rows[0];
                int rownum = 0;
                string DocCtrlNo = string.Empty;
                conn = new SqlConnection(_ConnectionString);
                conn.Open();
                tran = conn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = tran;
                cmd.Parameters.Clear();
                cmd.CommandText = spName;
                cmd.Parameters.AddWithValue("@CustomerType", dr["CustomerType"]);
                cmd.Parameters.AddWithValue("@CustClassification", dr["CustClassification"]);
                cmd.Parameters.AddWithValue("@CustomerCode", dr["CustomerCode"]);
                cmd.Parameters.AddWithValue("@prosCustomerCode", dr["prosCustomerCode"]);
                cmd.Parameters.AddWithValue("@LocForm", dr["LocForm"]);
                cmd.Parameters.AddWithValue("@TransactionNo", dr["TransactionNo"]);
                cmd.Parameters.AddWithValue("@ReasonForHolding", dr["HoldingType"]);
                cmd.Parameters.AddWithValue("@HoldingType", dr["HoldingType"]);
                cmd.Parameters.AddWithValue("@HoldingDate", dr["HoldingDate"]);
                cmd.Parameters.AddWithValue("@HoldingExpiryDate", dr["HoldingExpiryDate"]);
                cmd.Parameters.AddWithValue("@saletype", dr["saletype"]);
                cmd.Parameters.AddWithValue("@remarks", dr["Remarks"]);
                cmd.Parameters.AddWithValue("@status", dr["Status"]);
                cmd.Parameters.AddWithValue("@recuser", dr["Recuser"]);
                cmd.Parameters.AddWithValue("@moduser", dr["Recuser"]);
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);
                cmd.ExecuteNonQuery();

                cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = tran;
                cmd.Parameters.Clear();
                cmd.CommandText = spName;
                cmd.Parameters.AddWithValue("@TransactionNo", dr["TransactionNo"]);
                cmd.Parameters.AddWithValue("@QueryType", 8);
                cmd.ExecuteNonQuery();

                foreach (DataRow row in dtUnitDtls.Rows)
                {
                    rownum++;

                    cmd = new SqlCommand();
                    cmd.Connection = conn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = tran;
                    cmd.Parameters.Clear();
                    cmd.CommandText = spName;
                    cmd.Parameters.AddWithValue("@TransactionNo", dr["TransactionNo"]);
                    cmd.Parameters.AddWithValue("@UnitCode", row["unitCode"]);
                    cmd.Parameters.AddWithValue("@ClientCode", dr["CustomerCode"]);
                    cmd.Parameters.AddWithValue("@QueueNo", row["queueNo"]);
                    cmd.Parameters.AddWithValue("@AccNo", row["accNo"]);
                    cmd.Parameters.AddWithValue("@HasRefBaseAddOn", row["HasRefBaseAddOn"]);
                    cmd.Parameters.AddWithValue("@rowNo", rownum);
                    cmd.Parameters.AddWithValue("@QueryType", 7);
                    cmd.ExecuteNonQuery();
                }

                cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = tran;
                cmd.Parameters.Clear();
                cmd.CommandText = spName;
                cmd.Parameters.AddWithValue("@TransactionNo", dr["TransactionNo"]);
                cmd.Parameters.AddWithValue("@QueryType", 11);
                cmd.ExecuteNonQuery();

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

        public string DeleteData(string transNo, string user)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = spName;
            cmd.Parameters.AddWithValue("@TransactionNo", transNo);
            cmd.Parameters.AddWithValue("@Recuser", user);
            cmd.Parameters.AddWithValue("@QueryType", 3);

            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string ProcessData(DataTable dtHDR, DataTable dtUnitDtls)
        {
            try
            {
                DataRow dr = dtHDR.Rows[0];
                int rownum = 0;
                string DocCtrlNo = string.Empty;
                conn = new SqlConnection(_ConnectionString);
                conn.Open();
                tran = conn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = tran;
                cmd.Parameters.Clear();
                cmd.CommandText = spName;
                cmd.Parameters.AddWithValue("@CustomerType", dr["CustomerType"]);
                cmd.Parameters.AddWithValue("@CustClassification", dr["CustClassification"]);
                cmd.Parameters.AddWithValue("@CustomerCode", dr["CustomerCode"]);
                cmd.Parameters.AddWithValue("@prosCustomerCode", dr["prosCustomerCode"]);
                cmd.Parameters.AddWithValue("@LocForm", dr["LocForm"]);
                cmd.Parameters.AddWithValue("@TransactionNo", dr["TransactionNo"]);
                cmd.Parameters.AddWithValue("@ReasonForHolding", dr["HoldingType"]);
                cmd.Parameters.AddWithValue("@HoldingType", dr["HoldingType"]);
                cmd.Parameters.AddWithValue("@HoldingDate", dr["HoldingDate"]);
                cmd.Parameters.AddWithValue("@HoldingExpiryDate", dr["HoldingExpiryDate"]);
                cmd.Parameters.AddWithValue("@saletype", dr["saletype"]);
                cmd.Parameters.AddWithValue("@remarks", dr["Remarks"]);
                cmd.Parameters.AddWithValue("@status", dr["Status"]);
                cmd.Parameters.AddWithValue("@recuser", dr["Recuser"]);
                cmd.Parameters.AddWithValue("@moduser", dr["Recuser"]);
                cmd.Parameters.AddWithValue("@QueryType", 25);
                cmd.ExecuteNonQuery();

                cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = tran;
                cmd.Parameters.Clear();
                cmd.CommandText = spName;
                cmd.Parameters.AddWithValue("@TransactionNo", dr["TransactionNo"]);
                cmd.Parameters.AddWithValue("@QueryType", 8);
                cmd.ExecuteNonQuery();

                foreach (DataRow row in dtUnitDtls.Rows)
                {
                    rownum++;

                    cmd = new SqlCommand();
                    cmd.Connection = conn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = tran;
                    cmd.Parameters.Clear();
                    cmd.CommandText = spName;
                    cmd.Parameters.AddWithValue("@TransactionNo", dr["TransactionNo"]);
                    cmd.Parameters.AddWithValue("@UnitCode", row["unitCode"]);
                    cmd.Parameters.AddWithValue("@ClientCode", dr["CustomerCode"]);
                    cmd.Parameters.AddWithValue("@QueueNo", row["queueNo"]);
                    cmd.Parameters.AddWithValue("@AccNo", row["accNo"]);
                    cmd.Parameters.AddWithValue("@HasRefBaseAddOn", row["HasRefBaseAddOn"]);
                    cmd.Parameters.AddWithValue("@rowNo", rownum);
                    cmd.Parameters.AddWithValue("@QueryType", 7);
                    cmd.ExecuteNonQuery();
                }

                cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = tran;
                cmd.Parameters.Clear();
                cmd.CommandText = spName;
                cmd.Parameters.AddWithValue("@TransactionNo", dr["TransactionNo"]);
                cmd.Parameters.AddWithValue("@QueryType", 11);
                cmd.ExecuteNonQuery();

                //process
                cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = tran;
                cmd.Parameters.Clear();
                cmd.CommandText = spName;
                cmd.Parameters.AddWithValue("@TransactionNo", dr["TransactionNo"]);
                cmd.Parameters.AddWithValue("@LocForm", dr["LocForm"]);
                cmd.Parameters.AddWithValue("@Recuser", dr["Recuser"]);
                cmd.Parameters.AddWithValue("@QueryType", 24);
                cmd.ExecuteNonQuery();
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

        public DataTable GetDefaultLocAcctForms(string user)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = spName;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Recuser", user);
            cmd.Parameters.AddWithValue("@QueryType", 6);

            return base.ExecGetData(cmd, _ConnectionString);
        }

        public DataTable GetSaleType(string uc)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = spName;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@UnitCode", uc);
            cmd.Parameters.AddWithValue("@QueryType", 15);

            return base.ExecGetData(cmd, _ConnectionString);
        }

        // ### FOR LOOK UPS ###
        public string Inquire(string recuser, string unitCode)
        {
            return string.Format($@"EXEC {spName} @QueryType = 4, @recuser='{recuser}', @UnitCode='{unitCode}'");
        }

        public string InquireLocAcctForms(string recuser)
        {
            return string.Format($@"EXEC {spName} @QueryType = 20, @recuser='{recuser}'");
        }

        public string InquireHoldingType()
        {
            return string.Format($@"EXEC {spName} @QueryType = 21");
        }

        public string InquireCustClassification()
        {
            return string.Format($@"EXEC {spName} @QueryType = 22");
        }

        public string InquireCustomer(string customerType, string custClassification, string recuser, string unitCode)
        {
            return string.Format($@"EXEC {spName} @QueryType = 23, @CustomerType='{customerType}', @CustClassification='{custClassification}',  @Recuser='{recuser}', @UnitCode='{unitCode}'");
        }

        public string InquireProsCustomer(string customerType, string custClassification, string recuser, string unitCode)
        {
            return string.Format($@"EXEC {spName} @QueryType = 27, @CustomerType='{customerType}', @CustClassification='{custClassification}',  @Recuser='{recuser}', @UnitCode='{unitCode}'");
        }

        public string getNoahDate()
        {
            return SFObjects.returnText("SELECT dbo.GetNoahDate()", _ConnectionString);
        }

        public string Serverlink()
        {
            string value = SFObjects.returnText(@"SELECT [Value] FROM [dbo].[SystemConfig] where [code]='Server_Link'", _ConnectionString);

#if DEBUG
            value = "UploadFiles/";
#endif
            return value;
        }

        public string getDocumentNo(string locAcctForms, string tranType)
        {
            string query = $@"SELECT SG.fn_GetDocno('{locAcctForms}', DATEPART(YEAR, GETDATE()),'{tranType}')";

            return SFObjects.returnText(query, _ConnectionString);
        }

        public string getDocumentStatus(string transacno, string type)
        {
            string query = string.Format(@"SELECT [RE].[fn_SBHoldUnitEntryDocStatus]('{0}','{1}')", transacno, type);

            return SFObjects.returnText(query, _ConnectionString);
        }

        public DataTable GetDefLineUnitDtls(string unitCode, string custClassification, string recuser, string utype, string uclass)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = spName;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@UnitCode", unitCode);
            cmd.Parameters.AddWithValue("@CustClassification", custClassification);
            cmd.Parameters.AddWithValue("@Recuser", recuser);
            cmd.Parameters.AddWithValue("@UnitType", utype);
            cmd.Parameters.AddWithValue("@UnitClass", uclass);
            cmd.Parameters.AddWithValue("@QueryType", 14);

            return base.ExecGetData(cmd, _ConnectionString);
        }

        public DataTable GetDataLineUnitDtls(string transNo, string unitCode)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = spName;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@TransactionNo", transNo);
            cmd.Parameters.AddWithValue("@UnitCode", unitCode);
            cmd.Parameters.AddWithValue("@QueryType", 5);

            return base.ExecGetData(cmd, _ConnectionString);
        }

        public string getMinDate()
        {
            return SFObjects.returnText("SELECT MIN(Begdate) [MinDate] FROM GL.PERDATES", _ConnectionString);
        }

        public string getMaxDate()
        {
            return SFObjects.returnText("SELECT MAX(Enddate) [MaxDate] FROM GL.PERDATES", _ConnectionString);
        }

        public string getHoldingExpiryDate(string unitCode, string custClassification, string recuser)
        {
            string query = $@"EXEC {spName} @QueryType=12, @UnitCode='{unitCode}', @CustClassification='{custClassification}', @Recuser='{recuser}'";

            return SFObjects.returnText(query, _ConnectionString);
        }

        public bool isUnitExist(string unitCode, string recuser)
        {
            string query = $@"EXEC {spName} @QueryType=26, @UnitCode='{unitCode}', @Recuser='{recuser}'";

            return SFObjects.returnText(query, _ConnectionString) == "1" ? true : false;
        }

        public DataTable getRefBaseAddOn(string unitcode)
        {
            string sql = String.Format(@"EXEC {0} @QueryType = 32, @UnitCode = '" + unitcode + "'", spName);

            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public string hasSavedRqrdCompli(string docno)
        {
            return SFObjects.returnText($@"SELECT [DC].[fn_ChkIfHasReqComplianceAll]('{docno}')", _ConnectionString);
        }

        public string SaveRBAO(DataTable dt, bool IsNewRow)
        {
            List<SqlCommand> cmdlist = new List<SqlCommand>();

            DataRow dr = dt.Rows[0];
            SqlCommand cmd = new SqlCommand();

            foreach (DataRow dRow in dt.Rows)
            {
                cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Clear();
                cmd.CommandText = spName;
                cmd.Parameters.AddWithValue("@UnitCodeRBAO", dRow["UnitCode"]);
                cmd.Parameters.AddWithValue("@CodeRBAO", dRow["Code"]);
                cmd.Parameters.AddWithValue("@DescRBAO", dRow["Desc"]);
                cmd.Parameters.AddWithValue("@rownoRBAO", dRow["rowno"]);
                cmd.Parameters.AddWithValue("@QueryType", 34);
                cmdlist.Add(cmd);
            }

            return base.ExecProcedure(cmdlist, _ConnectionString);
        }

        public string getlugRBAOUnitCode(string uc)
        {
            return string.Format($@"EXEC {spName} @unitCode='{uc}', @QueryType = 35");
        }

        public DataTable LoadSchemaRBAO()
        {
            string tableName = "[RE].[HoldingUnit_RefBaseAddOn]";
            return SFObjects.LoadDataTable("SELECT * FROM " + tableName + " WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadSchemaUnitDtl()
        {
            string tableName = "[RE].[HoldingUnitEntryLIN]";
            return SFObjects.LoadDataTable("SELECT * FROM " + tableName + " WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadSchemaHDR()
        {
            string tableName = "[RE].[HoldingUnitEntryHDR]";
            return SFObjects.LoadDataTable("SELECT * FROM " + tableName + " WHERE 1<>1", _ConnectionString);
        }

        public string withMandatoryAddOn(string uc)
        {
            return string.Format($@"EXEC {spName} @unitCode='{uc}', @QueryType = 36");
        }

        public string validateForeignOwnership(string uc, string projCode, string tranNo)
        {
            return string.Format($@"EXEC {spName} @UnitCode='{uc}',@ProjectCode='{projCode}',@TransactionNo'{tranNo}', @QueryType = 33");
        }


    }
}