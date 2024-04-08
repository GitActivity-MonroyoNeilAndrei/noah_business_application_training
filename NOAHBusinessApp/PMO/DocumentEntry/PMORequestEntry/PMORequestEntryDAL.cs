using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class PMORequestEntryDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        private SqlConnection sqlConn = new SqlConnection();
        private SqlTransaction sqlTrn;

        #region STANDARD

        public string MenuItemCode = "PMORequestEntry"; // This is default parameter  for version
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
        public readonly string errorString = "Error",                                                   //--do not change this line
                                primaryKey = "docno",                                                   //--column for searching
                                inquireQry = "",                                                        //--query of inquire button
                                listingQry = "EXEC [RE].[nsp_InventoryCapacityAssign] @QueryType = 6";  //--query of export and print

        private string focusRecordPK = "";

        #region FOR EXPORT
        public string LISTINGFILENAME = "Request Entry",
                      GETCOMPANY = "select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        #endregion

        public string CurrentSelectedItem;                                                               //-- selected item in binding navigator

        public string tableName = "[PMO].[RequestEntry]"; 
        public string spName = "[PMO].[nsp_RequestEntry]";

        public PMORequestEntryDAL(string ConnectionString, string ConnectionString2, string selectedItem)
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


        public DataTable GetSavedData(string docno)
        {
            string sql = string.Format(@"EXEC " + spName + "@docno='" + docno + "', @QueryType = 200");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public string GetData(string docno)
        {
            //string a = string.Format($@"EXEC {spName} @QueryType=0, @docno={docno}");
            //focusRecordPK = string.Empty;
            //a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/
            //return a;

            string a = string.Format(@"EXEC " + spName + "@docno='" + docno + "', @QueryType = 0");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }

        public DataTable GetLoadedData(string docno)
        {
            string sql = string.Format($@"EXEC {spName} @docno='{docno}', @QueryType=200");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public string inquireQuery(string recuser)
        {
            return string.Format($@"EXEC {spName} @recUser='{recuser}', @QueryType=4");
        }

        public string getDocno(string trantype)
        {
            return SFObjects.returnText($"EXEC {spName} @trantype='{trantype}', @QueryType=8", _ConnectionString);
        }

        public string ifDocnoExist(string docno)
        {
            return SFObjects.returnText($"EXEC {spName} @docno='{docno}', @QueryType=9", _ConnectionString);
        }

        public string getStatus(string docno)
        {
            return SFObjects.returnText($"EXEC {spName} @docno='{docno}', @QueryType=20", _ConnectionString);
        }
        public string getDocDate(string docno)
        {
            return SFObjects.returnText($"EXEC {spName} @docno='{docno}', @QueryType=21", _ConnectionString);
        }
        public string getDateSub(string docno)
        {
            return SFObjects.returnText($"EXEC {spName} @docno='{docno}', @QueryType=22", _ConnectionString);
        }
        public string getPostDate(string docno)
        {
            return SFObjects.returnText($"EXEC {spName} @docno='{docno}', @QueryType=23", _ConnectionString);
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
                cmd.Parameters.AddWithValue("@docno", dr["docno"]);
                cmd.Parameters.AddWithValue("@docdate", dr["docdate"]);
                cmd.Parameters.AddWithValue("@trantype", dr["trantype"]);
                cmd.Parameters.AddWithValue("@locForm", dr["locForm"]);
                cmd.Parameters.AddWithValue("@accntNo", dr["accntNo"]);
                cmd.Parameters.AddWithValue("@unitNo", dr["unitNo"]);
                cmd.Parameters.AddWithValue("@request", dr["request"]);
                cmd.Parameters.AddWithValue("@proposedDate", dr["proposedDate"]);
                cmd.Parameters.AddWithValue("@basisForBill", dr["basisForBill"]);
                cmd.Parameters.AddWithValue("@noOfConsump", dr["noOfConsump"]);
                cmd.Parameters.AddWithValue("@cost", dr["cost"]);
                cmd.Parameters.AddWithValue("@amt", dr["amt"]);
                cmd.Parameters.AddWithValue("@vatAmt", dr["vatAmt"]);
                cmd.Parameters.AddWithValue("@ewtAmt", dr["ewtAmt"]);
                cmd.Parameters.AddWithValue("@netAmt", dr["netAmt"]);
                cmd.Parameters.AddWithValue("@remarks", dr["remarks"]);
                cmd.Parameters.AddWithValue("@Status", dr["Status"]);
                
                cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);
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
            return "Entry has been saved as Draft";
        }

        public string UpdateOldTransaction(DataTable dtHDR)
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
                cmd.Parameters.AddWithValue("@docno", dr["docno"]);
                cmd.Parameters.AddWithValue("@trantype", dr["trantype"]);
                cmd.Parameters.AddWithValue("@locForm", dr["locForm"]);
                cmd.Parameters.AddWithValue("@request", dr["request"]);
                cmd.Parameters.AddWithValue("@proposedDate", dr["proposedDate"]);
                cmd.Parameters.AddWithValue("@basisForBill", dr["basisForBill"]);
                cmd.Parameters.AddWithValue("@noOfConsump", dr["noOfConsump"]);
                cmd.Parameters.AddWithValue("@cost", dr["cost"]);
                cmd.Parameters.AddWithValue("@amt", dr["amt"]);
                cmd.Parameters.AddWithValue("@vatAmt", dr["vatAmt"]);
                cmd.Parameters.AddWithValue("@ewtAmt", dr["ewtAmt"]);
                cmd.Parameters.AddWithValue("@netAmt", dr["netAmt"]);
                cmd.Parameters.AddWithValue("@remarks", dr["remarks"]);
                cmd.Parameters.AddWithValue("@Status", dr["Status"]);

                cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                cmd.Parameters.AddWithValue("@QueryType", 201);
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
            return "Record Saved Successfully";
        }

        public string ProcessData(DataTable dtHDR, bool IsNewRow)
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
                cmd.Parameters.AddWithValue("@docno", dr["docno"]);
                cmd.Parameters.AddWithValue("@docdate", dr["docdate"]);
                cmd.Parameters.AddWithValue("@trantype", dr["trantype"]);
                cmd.Parameters.AddWithValue("@locForm", dr["locForm"]);
                cmd.Parameters.AddWithValue("@accntNo", dr["accntNo"]);
                cmd.Parameters.AddWithValue("@unitNo", dr["unitNo"]);
                cmd.Parameters.AddWithValue("@request", dr["request"]);
                cmd.Parameters.AddWithValue("@proposedDate", dr["proposedDate"]);
                cmd.Parameters.AddWithValue("@basisForBill", dr["basisForBill"]);
                cmd.Parameters.AddWithValue("@noOfConsump", dr["noOfConsump"]);
                cmd.Parameters.AddWithValue("@cost", dr["cost"]);
                cmd.Parameters.AddWithValue("@amt", dr["amt"]);
                cmd.Parameters.AddWithValue("@vatAmt", dr["vatAmt"]);
                cmd.Parameters.AddWithValue("@ewtAmt", dr["ewtAmt"]);
                cmd.Parameters.AddWithValue("@netAmt", dr["netAmt"]);
                cmd.Parameters.AddWithValue("@remarks", dr["remarks"]);
                cmd.Parameters.AddWithValue("@Status", dr["Status"]);

                cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 7);
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
            return "Record Processed Successfully";
        }

        public string DeleteData(String ID, String User)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = spName;
            cmd.Parameters.AddWithValue("@docno", ID);
            cmd.Parameters.AddWithValue("@recuser", User);
            cmd.Parameters.AddWithValue("@QueryType", 301);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string Process(string docno)
        {
            //DataRow dr = dtPSave.Rows[0];

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = spName;
            cmd.Parameters.AddWithValue("@docno", docno);
            cmd.Parameters.AddWithValue("@QueryType", 7);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public DataTable getcmbTran()
        {
            string sql = string.Format($@"EXEC {spName} @QueryType=10");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable getcmbReq()
        {
            string sql = string.Format($@"EXEC {spName} @QueryType=11");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable getReqsFromType(string TranType)
        {
            string sql = string.Format($@"EXEC {spName} @trantype='{TranType}', @QueryType=19");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable getcmbAcc(string user)
        {
            string sql = string.Format($@"EXEC {spName} @QueryType=12, @recUser='{user}'");
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable GetDefLoaded(string accnO)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = spName;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@accntNo", accnO);
            cmd.Parameters.AddWithValue("@QueryType", 13);

            return base.ExecGetData(cmd, _ConnectionString);
        }

        public DataTable GetDefLoadedX(string req)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = spName;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@request", req);
            cmd.Parameters.AddWithValue("@QueryType", 14);

            return base.ExecGetData(cmd, _ConnectionString);
        }




        public DataTable GetFromAmt(string amt, string vat, string cwt)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = spName;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@amt", amt);
            cmd.Parameters.AddWithValue("@vatcode", vat);
            cmd.Parameters.AddWithValue("@ewtcode", cwt);
            cmd.Parameters.AddWithValue("@QueryType", 15);

            return base.ExecGetData(cmd, _ConnectionString);
        }

        public string getTrantypeForBind(string docno)
        {
            return SFObjects.returnText($"EXEC PMO.nsp_RequestEntry  @docno='{docno}', @QueryType = 16", _ConnectionString);
        }

        public string getRequestForBind(string docno)
        {
            return SFObjects.returnText($"EXEC PMO.nsp_RequestEntry  @docno='{docno}', @QueryType = 17", _ConnectionString);
        }

        public string hasSavedRqrdCompli(string docno)
        {
            return SFObjects.returnText($@"SELECT [DC].[fn_ChkIfHasReqComplianceAll]('{docno}')", _ConnectionString);
        }
        public string getuser(string token)
        {
            return SFObjects.returnText($"select recuser from fpti_nw.APIAuth where tokenkey = '{token}'", _ConnectionString2);
        }
    }
}