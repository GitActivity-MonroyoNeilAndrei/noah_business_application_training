using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class SBRequestBulkHoldingDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        private SqlConnection sqlConn = new SqlConnection();
        private SqlTransaction sqlTrn;
        #region STANDARD

        public string MenuItemCode = "SBRequestBulkHolding"; // This is default parameter  for version
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

        private string _ConnectionString;
        private string _ConnectionString2;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Docno",                                       //--column for searching
                                inquireQry = "", //--query of inquire button
                                listingQry = "EXEC [RE].[nsp_InventoryCapacityAssign] @QueryType = 6"; //--query of export and print

        private string focusRecordPK = "";
        //#FOR EXPORT
        public string LISTINGFILENAME = "Request Bulk for Holding",
                      GETCOMPANY = "select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


      

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public string tableName = "[RE].[RequestBulkHolding]"; 
        public string spName = "[PRT].[nsp_RequestBulkHolding]";

        public SBRequestBulkHoldingDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }
        
        
        public DataTable LoadSchema()
        {
            return SFObjects.LoadDataTable("SELECT * FROM "+ tableName + " WHERE 1<>1", _ConnectionString);
        }     

        public string LISTINGQUERY()
        {
            return string.Format($@"EXEC {spName} @QueryType=5");
        }

        public string GetData()
        {
            string a = string.Format($@"EXEC {spName} @QueryType=0");
            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/
            return a;
        }

        public string inquireQuery()
        {
            return string.Format($@"EXEC {spName} @QueryType=4");
        }       

        public string SaveData(DataTable dtHDR, bool IsNewRow)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                DataRow dr = dtHDR.Rows[0];

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = spName;
                cmd.Parameters.AddWithValue("@Docno", dr["Docno"]);
                cmd.Parameters.AddWithValue("@LocForm", dr["LocForm"]);
                cmd.Parameters.AddWithValue("@ReasonBulkHold", dr["ReasonBulkHold"]);
                cmd.Parameters.AddWithValue("@Customer", dr["Customer"]);
                cmd.Parameters.AddWithValue("@Project", dr["Project"]);
                cmd.Parameters.AddWithValue("@noUnitHeld", dr["noUnitHeld"]);
                cmd.Parameters.AddWithValue("@Remarks", dr["Remarks"]);
                cmd.Parameters.AddWithValue("@DocDate", dr["DocDate"]);

                cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);
                cmd.ExecuteNonQuery();

                
                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.Transaction = sqlTrn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = spName;
                cmd.Parameters.Clear();
                cmd.Parameters.AddWithValue("@Docno", dr["Docno"]);
                cmd.Parameters.AddWithValue("@QueryType", 6);
                cmd.ExecuteNonQuery();
                
            }

            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("System Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("{0}", sqlEx.Message);
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
            return "Saved successfully";

           
        }

        public string DeleteData(String ID, String User)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = spName;
            cmd.Parameters.AddWithValue("@Docno", ID);
            //cmd.Parameters.AddWithValue("@moduser", User);
            cmd.Parameters.AddWithValue("@recuser", User);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public int hasData(string code)
        {
            int isExists = 0;

            isExists = SFObjects.returnText(string.Format($@"EXEC {spName} @code='{code}',@QueryType=7"), _ConnectionString).Equals("1") ? 1 : 0;

           
            return isExists;
        }

        public int isExisted(string code)
        {
            int isExists = 0;

            isExists = SFObjects.returnText(string.Format($@"EXEC {spName} @code='{code}',@QueryType=8"), _ConnectionString).Equals("1") ? 1 : 0;

          
            return isExists;
        }

        public string getlugLocAcctForms()
        {
            return string.Format($@"EXEC {spName} @QueryType=8");
        }

        public string getlugReasonBulkHold()
        {
            return string.Format($@"EXEC {spName} @QueryType=9");
        }

        public string getlugCustomer()
        {
            return string.Format($@"EXEC {spName} @QueryType=10");
        }

        public string getlugProject()
        {
            return string.Format($@"EXEC {spName} @QueryType=11");
        }

        public DataTable GetDefaultLocAcctForms(string user)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = spName;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@Recuser", user);
            cmd.Parameters.AddWithValue("@QueryType", 5);

            return base.ExecGetData(cmd, _ConnectionString);
        }

        public string hasSavedRqrdCompli(string docno)
        {
            return SFObjects.returnText($@"SELECT [DC].[fn_ChkIfHasReqComplianceAll]('{docno}')", _ConnectionString);
        }

        public string Process(string Docno, string subdate)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = spName;
            cmd.Parameters.AddWithValue("@Docno", Docno);
            cmd.Parameters.AddWithValue("@QueryType", 7);
            return base.ExecProcedure(cmd, _ConnectionString);
        }
    }
}