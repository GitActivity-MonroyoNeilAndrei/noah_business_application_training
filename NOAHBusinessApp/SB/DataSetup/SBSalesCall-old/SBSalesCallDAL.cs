using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class SBSalesCallDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects(); /// should be added
        #region STANDARD

        public string MenuItemCode = "SBSalesCall"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.0"; // This is default parameter for version
        public string UpdateVersion(string _MenuItemCode, string _MenuItemVersion)
        {
            if (_MenuItemCode.Trim() != "") MenuItemCode = _MenuItemCode;
            if (_MenuItemVersion.Trim() != "") MenuItemVersion = _MenuItemVersion;
            return UpdateVersion();
        }

        public string UpdateVersion()
        {
            #region do not delete Version Updating
            string StrMessage = SFObjects.returnText(

                string.Format(@"
                              declare @MenuCode as nvarchar(max);
                              declare @Version as nvarchar(max);

                              set @MenuCode= '{0}';
                              set @Version = '{1}';

                              Update [FPTI_NW].[noahweb_menudtLIN.Rows[row]_Info]
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
        public string focusRecordPK;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "Code"; //--query of export and print


        //#FOR EXPORT
        public string LISTINGFILENAME = "Sales Call",
             GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END
        //--default start row
        public string CurrentSelectedItem;

        private string storedProcedureName = "[PRT].[nsp_SBSalesCall]";
        private string tableName = "[RE].[SBSalesCall]";

        public SBSalesCallDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;

            this.CurrentSelectedItem = selectedItem;
        }

        public string LISTINGQUERY()
        {
            return string.Format(@"EXEC " + storedProcedureName + " @QueryType = 0");
        }
        public DataTable LoadSchema()
        {
            return SFObjects.LoadDataTable("SELECT * FROM " + tableName + " WHERE 1<>1", _ConnectionString);
        }
        public string inquireQuery(string filt0)
        {
            return string.Format(@"EXEC " + storedProcedureName + " @Seller = '" + filt0 + "', @QueryType = 4");
        }

        public string lugProspectCust(string filt)
        {
            return string.Format(@"EXEC " + storedProcedureName + " @ProsCust = '" + filt + "', @QueryType = 20");
        }

        public string lugSalesForceAct(string filt2)
        {
            return string.Format(@"EXEC " + storedProcedureName + " @SalForAct = '" + filt2 + "', @QueryType = 21");
        }

        public string lugLoc(string filt3)
        {
            return string.Format(@"EXEC " + storedProcedureName + " @Loc = '" + filt3 + "', @QueryType = 22");
        }

        public string lugProj(string filt4, string loc1)
        {
            return string.Format(@"EXEC " + storedProcedureName + " @Proj = '" + filt4 + "', @Loc = '" + loc1 + "', @QueryType = 23");
        }

        public string lugTowerPhase(string filt5, string proj1)
        {
            return string.Format(@"EXEC " + storedProcedureName + " @Tower = '" + filt5 + "', @Proj = '" + proj1 + "', @QueryType = 24");
        }

        public string GetData(string curusers)
        {
            string a = string.Format(@"EXEC " + storedProcedureName + " @Seller = '" + curusers + "', @QueryType = 0");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }

        public string SaveData(DataTable dtHDR, bool IsNewRow, string Trantype)
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
                cmd.CommandText = storedProcedureName;
                cmd.Parameters.AddWithValue("@ID", dtHDR.Rows[0]["TransactionNo"].ToString());
                cmd.Parameters.AddWithValue("@Seller", dtHDR.Rows[0]["Seller"].ToString());
                cmd.Parameters.AddWithValue("@ProsCust", dtHDR.Rows[0]["ProspectCust"].ToString());
                cmd.Parameters.AddWithValue("@SalForAct", dtHDR.Rows[0]["SalesForceAct"].ToString());
                cmd.Parameters.AddWithValue("@Loc", dtHDR.Rows[0]["Location"].ToString());
                cmd.Parameters.AddWithValue("@Proj", dtHDR.Rows[0]["Project"].ToString());
                cmd.Parameters.AddWithValue("@Tower", dtHDR.Rows[0]["Tower"].ToString());
                cmd.Parameters.AddWithValue("@MobNo", dtHDR.Rows[0]["MobileNo"].ToString());
                cmd.Parameters.AddWithValue("@EmailAdd", dtHDR.Rows[0]["EmailAdd"].ToString());
                cmd.Parameters.AddWithValue("@DTFrom", dtHDR.Rows[0]["DateTimeFrom"].ToString());
                cmd.Parameters.AddWithValue("@DTTo", dtHDR.Rows[0]["DateTimeTo"].ToString());
                cmd.Parameters.AddWithValue("@NotifSched", dtHDR.Rows[0]["NotifSchedule"].ToString());
                cmd.Parameters.AddWithValue("@NotifMan", dtHDR.Rows[0]["NotifManner"].ToString());
                cmd.Parameters.AddWithValue("@Receiver", dtHDR.Rows[0]["Receiver"].ToString());
                cmd.Parameters.AddWithValue("@Remarks", dtHDR.Rows[0]["Remarks"].ToString());
                cmd.Parameters.AddWithValue("@RecStats", dtHDR.Rows[0]["RecordStats"].ToString());
                cmd.Parameters.AddWithValue("@Recuser", dtHDR.Rows[0]["Recuser"].ToString());
                cmd.Parameters.AddWithValue("@Moduser", dtHDR.Rows[0]["Moduser"].ToString());
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);
                cmd.ExecuteNonQuery();

                //cmd = new SqlCommand();
                //cmd.Connection = sqlConn;
                //cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Transaction = sqlTrn; // Need to specify for every command
                //cmd.Parameters.Clear();
                //cmd.CommandText = storedProcedureName;
                //cmd.Parameters.AddWithValue("@ID", dtHDR.Rows[0]["ID"].ToString());
                //cmd.Parameters.AddWithValue("@QueryType", 15);
                //cmd.ExecuteNonQuery();

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

        public string DeleteData(String ID, String Rec)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = storedProcedureName;
            cmd.Parameters.AddWithValue("@ID", ID);
            cmd.Parameters.AddWithValue("@Recuser", Rec);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string ProcessTransaction(String curuserx, String ID, String RecStatus, String StartDate, String EndDate)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = storedProcedureName;
            cmd.Parameters.AddWithValue("@ID", ID);
            cmd.Parameters.AddWithValue("@DTFrom", StartDate);
            cmd.Parameters.AddWithValue("@DTTo", EndDate);
            cmd.Parameters.AddWithValue("@RecStats", RecStatus);
            cmd.Parameters.AddWithValue("@RecUser", curuserx);
            cmd.Parameters.AddWithValue("@QueryType", 5);
            return base.ExecProcedure(cmd, _ConnectionString);
            //return RecStatus + " " + base.ExecProcedure(cmd, _ConnectionString);
        }

        //public string ProcessTransaction(String curuserx, String ID, String RecStatus)
        //{
        //    SqlCommand cmd = new SqlCommand();
        //    cmd.CommandType = CommandType.StoredProcedure;
        //    cmd.Parameters.Clear();
        //    cmd.CommandText = storedProcedureName;
        //    cmd.Parameters.AddWithValue("@ID", ID);
        //    cmd.Parameters.AddWithValue("@RecStats", RecStatus);
        //    cmd.Parameters.AddWithValue("@RecUser", curuserx);
        //    cmd.Parameters.AddWithValue("@QueryType", 5);
        //    return RecStatus + " " + base.ExecProcedure(cmd, _ConnectionString);
        //}

        public DataTable GetUserName(string ID)
        {
            string cmd2 = string.Format(@"EXEC " + storedProcedureName + " @ID = '" + ID + "', @QueryType = 25");
            return SFObjects.LoadDataTable(cmd2, _ConnectionString);
        }

    }
}
