using System.Data.SqlClient;
using System;
using System.Data;
using NoahWebLib;

namespace DALComponent
{
    public class SBTransferOfUnitDAL : NoahWebLib.DatabaseHandler
    {
        #region STANDARD

        private string storedProcedureName = "[PRT].[nsp_SBTransferOfUnit]";
        public string MenuItemCode = "SBTransferOfUnit"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.1"; // This is default parameter for version
        public string UpdateVersion(string _MenuItemCode, string _MenuItemVersion)
        {
            if (_MenuItemCode.Trim() != "") MenuItemCode = _MenuItemCode;
            if (_MenuItemVersion.Trim() != "") MenuItemVersion = _MenuItemVersion;
            return UpdateVersion();
        }

        private SqlConnection conn = new SqlConnection();
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
        public string LISTINGFILENAME = "Transfer of Unit", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END

        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public string spName = "[PRT].[nsp_SBTransferOfUnit]";

        public SBTransferOfUnitDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }

        public DataTable LoadSchemaHDR()
        {
            return SFObjects.LoadDataTable("SELECT * FROM [RE].[SBTransferOfUnitHDR] WHERE 1<>1", _ConnectionString);
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
            return string.Format(@"EXEC [RE].[nsp_inventoryClass] @QueryType = 4");
        }

        public string LISTINGQUERY()
        {
            return string.Format(@"EXEC [RE].[nsp_inventoryClass] @QueryType = 5");
        }

        public string hasSavedRqrdCompli(string docno)
        {
            return SFObjects.returnText($@"SELECT [DC].[fn_ChkIfHasReqComplianceAll]('{docno}')", _ConnectionString);
        }

        public DataTable getQueue(string refdocno, string unitCode)
        {
            return SFObjects.LoadDataTable($"EXEC {spName} @Querytype =25, @refDocno = '{refdocno}', @unitCode = '{unitCode}'", _ConnectionString);
        }

        //added from submenu folder
        public string GetData_popup()
        {
            string a = string.Format(@"EXEC " + storedProcedureName + " @QueryType = 32");

            //focusRecordPK = string.Empty;
            //a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }

        public DataTable LoadSchema_popup()
        {
            return SFObjects.LoadDataTable("SELECT * FROM [RE].[SBTransferOfUnitHDR] WHERE 1<>1", _ConnectionString);
        }

        public string SaveData_popup(DataTable dtHDR, bool IsNewRow, string Trantype)
        {
            try
            {
                conn.ConnectionString = _ConnectionString;
                conn.Open();
                tran = conn.BeginTransaction();

                //var locform = dtHDR.Rows[0]["locform"].ToString();
                //var reasonfortransunit = dtHDR.Rows[0]["reasonfortransunit"].ToString();
                //var newunit = dtHDR.Rows[0]["newunit"].ToString();
                //var refholdtrans = dtHDR.Rows[0]["locform"].ToString();
                //var remarks = dtHDR.Rows[0]["locform"].ToString();
                //var docno = dtHDR.Rows[0]["locform"].ToString();
                //var docstatus = dtHDR.Rows[0]["locform"].ToString();
                //var docdate = dtHDR.Rows[0]["locform"].ToString();
                //var reasonfordisapproval = dtHDR.Rows[0]["locform"].ToString();
                //var remarksfordisapproval = dtHDR.Rows[0]["locform"].ToString();



                SqlCommand cmd = new SqlCommand();
                cmd.Connection = conn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = tran; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = storedProcedureName;
                cmd.Parameters.AddWithValue("@locform", dtHDR.Rows[0]["locform"].ToString());
                cmd.Parameters.AddWithValue("@locdesc", dtHDR.Rows[0]["locdesc"].ToString());
                cmd.Parameters.AddWithValue("@reasonfortransunit", dtHDR.Rows[0]["reasonfortransunit"].ToString());
                cmd.Parameters.AddWithValue("@resdesc", dtHDR.Rows[0]["resdesc"].ToString());
                cmd.Parameters.AddWithValue("@newunit", dtHDR.Rows[0]["newunit"].ToString());
                cmd.Parameters.AddWithValue("@unitdesc", dtHDR.Rows[0]["unitdesc"].ToString());
                cmd.Parameters.AddWithValue("@refholdtrans", dtHDR.Rows[0]["refholdtrans"].ToString());
                cmd.Parameters.AddWithValue("@remarks", dtHDR.Rows[0]["remarks"].ToString());
                cmd.Parameters.AddWithValue("@docno", dtHDR.Rows[0]["docno"].ToString());
                cmd.Parameters.AddWithValue("@docstatus", dtHDR.Rows[0]["docstatus"].ToString());
                cmd.Parameters.AddWithValue("@docdate", dtHDR.Rows[0]["docdate"].ToString());
                cmd.Parameters.AddWithValue("@reasonfordisapproval", dtHDR.Rows[0]["reasonfordisapproval"].ToString());
                cmd.Parameters.AddWithValue("@remarksfordisapproval", dtHDR.Rows[0]["remarksfordisapproval"].ToString());
                cmd.Parameters.AddWithValue("@Recuser", dtHDR.Rows[0]["Recuser"].ToString());
                cmd.Parameters.AddWithValue("@Moduser", dtHDR.Rows[0]["Moduser"].ToString());
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 30 : 31);
                cmd.ExecuteNonQuery();
                //Query 30 for INSERT Data
                //Query 31 for UPDATE Data
            }
            catch (SqlException sqlEx)
            {
                tran.Rollback();
                conn.Close();
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
                //tran.Rollback();
                conn.Close();
                return String.Format("Error: {0}\n", ex.Message);
            }

            tran.Commit();
            conn.Close();
            return "Process has successfully completed.";
        }

        public string ProcessData_popup(string DocNo)
        {

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = storedProcedureName;

            cmd.Parameters.AddWithValue("@docNo", DocNo);

            cmd.Parameters.AddWithValue("@QueryType", 4);

            return base.ExecProcedure(cmd, _ConnectionString);

            //return "Process has successfully completed.";
        }

        public string inquireQuery_popup()
        {
            //return string.Format($@"SELECT * FROM [RE].[SBTransferOfUnitHDR]");
            return string.Format(@"EXEC " + storedProcedureName + " @QueryType = 5");
        }

        public string lugLocAccForms_popup()
        {
            return string.Format($@"Exec " + storedProcedureName + " @QueryType = 21");
        }

        public string deletedata_popup(string docno)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandText = storedProcedureName;
            cmd.Parameters.Clear();
            cmd.Parameters.AddWithValue("@docno", docno);
            cmd.Parameters.AddWithValue("@QueryType", 3);

            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string lugReTranUnit_popup()
        {
            return string.Format($@"Exec " + storedProcedureName + " @QueryType = 28");
        }
        public string lugNewUnit_popup()
        {
            return string.Format($@"Exec " + storedProcedureName + " @QueryType = 25");
        }

        public string lugRefHoldTrans_popup()
        {
            return string.Format($@"SELECT LocForm, TransactionNo FROM re.HoldingUnitEntryHDR");
        }

        public string txtDocDate_popup()
        {
            return SFObjects.returnText(@"SELECT FORMAT(dbo.GetNoahDate() , 'MM/dd/yyyy')", _ConnectionString);
        }

        public string txtDocNo_popup()
        {
            return SFObjects.returnText($@"Exec " + storedProcedureName + " @QueryType = 27", _ConnectionString);
        }

        public string rowcounter()
        {
            return SFObjects.returnText($@"Exec " + storedProcedureName + " @QueryType = 36", _ConnectionString);
        }

        public string docstatdesc(string docstatus)
        {
            return SFObjects.returnText($@"Exec " + storedProcedureName + " @QueryType = 37, @docstatus = '"+ docstatus + "'", _ConnectionString);
        }

        public string txtidvalLugLocAccForms_popup(String transno)
        {
            return SFObjects.returnText($@"Exec " + storedProcedureName + " @QueryType = 33, @transno = '" + transno + "'", _ConnectionString);
        }

        public string txtdescvalLugLocAccForms_popup(String transno)
        {
            return SFObjects.returnText($@"Exec " + storedProcedureName + " @QueryType = 34, @transno = '" + transno + "'", _ConnectionString);
        }

        public DataTable displaydoc_popup(String locaccforms)
        {
            return SFObjects.LoadDataTable(@"EXEC " + storedProcedureName + " @QueryType = 35, @docno ='" + locaccforms + "'", _ConnectionString);
        }


    }
}
