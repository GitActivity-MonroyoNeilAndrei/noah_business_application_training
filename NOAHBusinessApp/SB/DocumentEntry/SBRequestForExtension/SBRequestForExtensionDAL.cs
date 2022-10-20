using System.Data.SqlClient;
using System;
using System.Data;
using NoahWebLib;

namespace DALComponent
{
    public class SBRequestForExtensionDAL : NoahWebLib.DatabaseHandler
    {
        #region STANDARD

        public string MenuItemCode = "SBRequestForExtension"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.1"; // This is default parameter for version
        public string UpdateVersion(string _MenuItemCode, string _MenuItemVersion)
        {
            if (_MenuItemCode.Trim() != "") MenuItemCode = _MenuItemCode;
            if (_MenuItemVersion.Trim() != "") MenuItemVersion = _MenuItemVersion;
            return UpdateVersion();
        }

        private SqlConnection conn;
        private SqlTransaction tran;
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
        public string LISTINGFILENAME = "Inventory Class", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public string spName = "[PRT].[nsp_SBHoldingExtension]";

        public SBRequestForExtensionDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }

        public DataTable LoadSchemaHDR()
        {
            return SFObjects.LoadDataTable("SELECT * FROM [RE].[SBRequestForExtensionHDR] WHERE 1<>1", _ConnectionString);
        }

        public DataTable getDetails(string recUser, string project, int tag)
        {
            return SFObjects.LoadDataTable($"EXEC {spName} @Querytype = 0, @recuser = '{recUser}', @project='{project}' , @tag = '{tag}' ", _ConnectionString);
        }

        public DataTable getDetailsApproval(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC {spName} @Querytype = 0, @docno = '{docno}', @tag = 0", _ConnectionString);
        }

        public DataTable getDefault(string recUser)
        {
            return SFObjects.LoadDataTable($"SELECT * FROM re.fn_DefaultLocationforReports('{recUser}')", _ConnectionString);
        }

        public DataTable LoadProject()
        {
            return SFObjects.LoadDataTable($"EXEC {spName} @Querytype =20", _ConnectionString);
        }

        public DataTable LoadDataBind(string refDocno, string recuser, string docno)
        {
            return SFObjects.LoadDataTable($"EXEC {spName} @Querytype =10 , @refDocno = '{refDocno}' , @recuser = '{recuser}', @docno = '{docno}'", _ConnectionString);
        }

        public DataTable getNewExpiryDate(string refDocno, string recuser)
        {
            return SFObjects.LoadDataTable($"EXEC {spName} @Querytype =23, @refDocno = '{refDocno}', @recuser = '{recuser}'", _ConnectionString);
        }

        public string GetData()
        {
            string a = string.Format(@"EXEC [RE].[nsp_inventoryClass] @QueryType=0");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }

        public string getLocForm(string recUser)
        {
            return string.Format($@"exec {spName} @querytype =21, @recuser = '{recUser}'");
        }

        public string getReason()
        {
            return string.Format($@"exec {spName} @querytype =22");
        }

        public string SaveData(DataTable dtHDR, bool IsNewRow, int isProcess)
        {
            try
            {
                DataRow dr = dtHDR.Rows[0];
                int rownum = 0;
                string docno = dr["docno"].ToString();
                conn = new SqlConnection(_ConnectionString);
                conn.Open();
                tran = conn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = tran;
                cmd.Parameters.Clear();
                cmd.CommandText = spName;
                cmd.Parameters.AddWithValue("@docno", docno);
                cmd.Parameters.AddWithValue("@locform", dr["locform"]);
                cmd.Parameters.AddWithValue("@reasonForExtension", dr["reasonForExtension"]);
                cmd.Parameters.AddWithValue("@remarks", dr["remarks"]);
                cmd.Parameters.AddWithValue("@extendedExpiryDate", dr["extendedExpiryDate"]);
                cmd.Parameters.AddWithValue("@status", dr["status"]);
                cmd.Parameters.AddWithValue("@recuser", dr["recuser"]);
                cmd.Parameters.AddWithValue("@moduser", dr["moduser"]);
                cmd.Parameters.AddWithValue("@refDocno", dr["refDocno"]);
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);
                if (IsNewRow)
                    docno = cmd.ExecuteScalar().ToString();
                else
                    cmd.ExecuteNonQuery();

                cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = tran;
                cmd.Parameters.Clear();
                cmd.CommandText = spName;
                cmd.Parameters.AddWithValue("@docno", docno);
                cmd.Parameters.AddWithValue("@QueryType", 13);
                cmd.ExecuteNonQuery();

                if (isProcess == 1)
                {
                    cmd = new SqlCommand();
                    cmd.Connection = conn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = tran;
                    cmd.Parameters.Clear();
                    cmd.CommandText = spName;
                    cmd.Parameters.AddWithValue("@docno", docno);
                    cmd.Parameters.AddWithValue("@status", dr["status"]);
                    cmd.Parameters.AddWithValue("@QueryType", 4);
                    cmd.ExecuteNonQuery();
                }

            }
            catch (SqlException sqlEx)
            {
                tran.Rollback();
                conn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved. Duplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Cannot be saved. Data currently in use.", sqlEx.Number);
                else
                    result = String.Format(sqlEx.Message);
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

            return "Saved successfully";
        }

        public string DeleteData(String docno)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = spName;
            cmd.Parameters.AddWithValue("@docno", docno);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string getServerlink()
        {
            string sql = $"SELECT [value] + '\' FROM dbo.SystemConfig WHERE code = 'Server_Link'";
            //string sql = $"SELECT 'C:/FPTI_Realty' ";
            return SFObjects.returnText(sql, _ConnectionString);
        }

        public int isExist(string refDocno, string recuser, int tag)
        {
            string sql = $"EXEC {spName} @refDocno = '{refDocno}' , @recuser= '{recuser}' , @querytype = 24, @tag = '{tag}'";
            return Parser.ParseInt(SFObjects.returnText(sql, _ConnectionString));
        }

        public string inquireQuery()
        {
            return string.Format(@"EXEC [RE].[nsp_inventoryClass]@QueryType = 4");
        }

        public string LISTINGQUERY()
        {
            return string.Format(@"EXEC [RE].[nsp_inventoryClass]@QueryType = 5");
        }

        public string hasSavedRqrdCompli(string docno)
        {
            return SFObjects.returnText($@"SELECT [DC].[fn_ChkIfHasReqComplianceAll]('{docno}')", _ConnectionString);
        }
        
        public DataTable getQueue(string refdocno, string unitCode)
        {
            return SFObjects.LoadDataTable($"EXEC {spName} @Querytype =25, @refDocno = '{refdocno}', @unitCode = '{unitCode}'", _ConnectionString);
        }
    }
}
