using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class APApprovedPaymentRequestEntry2DAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects(); /// should be added
        #region STANDARD

        public string MenuItemCode = "APApprovedPaymentRequestEntry2"; // This is default parameter  for version
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
                                primaryKey = "Vendor"; //--query of export and print


        //#FOR EXPORT
        public string LISTINGFILENAME = "Vendor Item Tax Assignment",
             GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END
        //--default start row
        public string CurrentSelectedItem;

        private string storedProcedureName = "[AP].[nsp_ApprovedPaymentRequestEntryHDR_Monroyo]";
        private string storedProcedureNameLIN = "[AP].[nsp_ApprovedPaymentRequestEntryLIN_Monroyo]";
        private string tableName = "[AP].[ApprvPaymentRqstHDR_Monroyo]";
        private string tableNameLin = "[AP].[ApprvPaymentRqstLIN_Monroyo]";

        int SPR_Checkbox = 1,
            SPR_DOCUMENTNO = 2;

        public APApprovedPaymentRequestEntry2DAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;

            this.CurrentSelectedItem = selectedItem;
        }

        public string LISTINGQUERY()
        {
            return string.Format(@"EXEC " + storedProcedureName + " @QueryType = 9");
        }
        public DataTable LoadSchema()
        {
            return SFObjects.LoadDataTable("SELECT * FROM " + tableName + " WHERE 1<>1", _ConnectionString);
        }
        public string inquireQuery(String recuser)
        {
            return string.Format(@"EXEC " + storedProcedureName + "@recuser='{0}', @QueryType = 4", recuser);
        }

        public DataTable getDefaultLocform(String recuser)
        {
            return SFObjects.LoadDataTable($"SELECT * FROM SG.fn_DefaultLocation('{recuser}','APVNAM')", _ConnectionString);
        }

        public string lugLocForm(string trantype, string user)
        {
            return string.Format($@"EXEC {storedProcedureName} @Recuser='{user}', @trantype='{trantype}', @QueryType=20");
        }

        public string lugPayee(string locForm)
        {
            return string.Format($@"EXEC {storedProcedureName} @locForm = '{locForm}', @QueryType=22");
        }

        public string DocumentNo(string locForm, string payee)
        {
            return string.Format(@"EXEC " + storedProcedureNameLIN + " @locForm = '{0}', @vendor = '{1}', @QueryType = 20", locForm, payee);
        }

        public string ItemGType()
        {
            return string.Format(@"EXEC " + storedProcedureNameLIN + " @QueryType = 21");
        }
        public string ItemCode(string ItemGroupTypeCode)
        {
            return string.Format(@"EXEC " + storedProcedureNameLIN + " @igtCode = '{0}', @QueryType = 22", ItemGroupTypeCode);
        }

        public string UOM()
        {
            return string.Format(@"EXEC " + storedProcedureNameLIN + " @QueryType = 23");
        }

        public string PackSizeUOM(string ItemCode)
        {
            return string.Format(@"EXEC " + storedProcedureNameLIN + " @ItemCode = '{0}', @QueryType = 8", ItemCode);
        }

        public string MDRUOM(string ItemCode)
        {
            return string.Format(@"EXEC " + storedProcedureNameLIN + " @ItemCode = '{0}', @QueryType = 8", ItemCode);
        }

        public string Currency()
        {
            return string.Format(@"EXEC " + storedProcedureNameLIN + " @QueryType = 9");
        }

        public string Vendor()
        {
            return string.Format(@"EXEC " + storedProcedureName + " @QueryType = 7");
        }


        public string VATaxCode()
        {
            return string.Format(@"EXEC " + storedProcedureNameLIN + " @QueryType = 11");
        }

        public string EWTCode()
        {
            return string.Format(@"EXEC " + storedProcedureNameLIN + " @QueryType = 12");
        }

        public string DocDTLhdr()
        {
            return string.Format(@"EXEC " + storedProcedureNameLIN + " @QueryType = 15");
        }

        public string GetData(string code)
        {
            string a = string.Format(@"EXEC " + storedProcedureName + " @docno = '" + code + "', @QueryType = 0");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }

        public string hasReqComplianceHdr(string docno)
        {
            return SFObjects.returnText($@"SELECT dc.fn_ChkIfHasReqCompliance('{docno}',0,0)", _ConnectionString);
        }

        //public void hasCombination(string VAT, string EWT)
        //{
        //    SFObjects.returnText($"EXEC {storedProcedureNameLIN} @QueryType = 18, @VATTaxCode='{VAT}', @EWTCode='{EWT}'", _ConnectionString);
        //}

        public string AutoInsertTaxCode(string VAT, string EWT)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = storedProcedureNameLIN;
            cmd.Parameters.AddWithValue("@VATTaxCode", VAT);
            cmd.Parameters.AddWithValue("@EWTCode", EWT);
            cmd.Parameters.AddWithValue("@QueryType", 19);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public DataTable GetLinData(string Code)
        {
            string sql = String.Format(@"EXEC {0}  @docno = '" + Code + "', @QueryType = 0", storedProcedureNameLIN);

            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable _tempGetReqCommHDR(string trantype)
        {
            string sql = String.Format(@"EXEC {0}  @Trantype = '" + trantype + "', @QueryType = 9", storedProcedureName);
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable LoadSchemaLIN()
        {
            return SFObjects.LoadDataTable(string.Format("SELECT * FROM {0} WHERE 1<>1", tableNameLin), _ConnectionString);
        }

        public DataTable DefaultItemGroupType(string Code)
        {
            return SFObjects.LoadDataTable(string.Format("EXEC {0}  @ItemCode = '" + Code + "', @QueryType = 10", storedProcedureNameLIN), _ConnectionString);
        }

        public DataTable DefaultVatCode(string Code)
        {
            return SFObjects.LoadDataTable(string.Format("EXEC {0} @SupplierCode = '" + Code + "', @QueryType = 18", storedProcedureNameLIN), _ConnectionString);
        }

        public string GetCopyFrom()
        {
            return string.Format("EXEC {0} @QueryType = 17", storedProcedureNameLIN);
        }

        public string SaveData(DataTable dtHDR, DataTable dtLIN, bool IsNewRow, string Trantype)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                string docno = dtHDR.Rows[0]["Docno"].ToString();
                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = storedProcedureName;
                cmd.Parameters.AddWithValue("@docno", docno);
                cmd.Parameters.AddWithValue("@locForm", dtHDR.Rows[0]["LocForm"].ToString());
                cmd.Parameters.AddWithValue("@vendor", dtHDR.Rows[0]["vendor"].ToString());
                cmd.Parameters.AddWithValue("@currency", dtHDR.Rows[0]["Currency"].ToString());
                cmd.Parameters.AddWithValue("@checkPayeeName", dtHDR.Rows[0]["CheckPayeeName"].ToString());
                cmd.Parameters.AddWithValue("@remarks", dtHDR.Rows[0]["remarks"].ToString());
                cmd.Parameters.AddWithValue("@Recuser", dtHDR.Rows[0]["Recuser"].ToString());
                cmd.Parameters.AddWithValue("@Moduser", dtHDR.Rows[0]["Moduser"].ToString());
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);
                if (IsNewRow)
                    docno = cmd.ExecuteScalar().ToString();
                else
                    cmd.ExecuteNonQuery();

                int maxlineID = 0;
                if (!IsNewRow)
                {
                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn; // Need to specify for every command
                    cmd.Parameters.Clear();
                    cmd.CommandText = storedProcedureName;
                    cmd.Parameters.AddWithValue("@docno", docno);
                    cmd.Parameters.AddWithValue("@QueryType", 24);
                    maxlineID = Convert.ToInt32(cmd.ExecuteScalar()) + 1;
                }

                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = storedProcedureNameLIN;
                cmd.Parameters.AddWithValue("@docno", docno);
                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmd.ExecuteNonQuery();

                int row = 0;
                int lineID = 0;
                bool ctr = true;
                foreach (DataRow items in dtLIN.Rows)
                {
                    #region LINE ID CONTROLS
                    if (!string.IsNullOrEmpty(items["LineID"].ToString()))
                        lineID = int.Parse(items["LineID"].ToString());
                    else
                    {
                        if (ctr && maxlineID != 0)
                        {
                            lineID = maxlineID;
                            ctr = false;
                        }
                        else
                            lineID++;
                    }
                    #endregion

                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn; // Need to specify for every command
                    cmd.Parameters.Clear();
                    cmd.CommandText = storedProcedureNameLIN;
                    cmd.Parameters.AddWithValue("@docno", docno);
                    cmd.Parameters.AddWithValue("@rowno", row);
                    cmd.Parameters.AddWithValue("@lineID", lineID);
                    cmd.Parameters.AddWithValue("@refDocno", dtLIN.Rows[row]["refDocno"].ToString());
                    cmd.Parameters.AddWithValue("@refNo", dtLIN.Rows[row]["refNo"].ToString());
                    cmd.Parameters.AddWithValue("@refDate", dtLIN.Rows[row]["refDate"].ToString());
                    cmd.Parameters.AddWithValue("@dueDate", dtLIN.Rows[row]["dueDate"].ToString());
                    cmd.Parameters.AddWithValue("@igtCode", dtLIN.Rows[row]["igtCode"].ToString());
                    cmd.Parameters.AddWithValue("@ItemCode", dtLIN.Rows[row]["itemCode"].ToString());
                    cmd.Parameters.AddWithValue("@uom", dtLIN.Rows[row]["UOM"].ToString());
                    cmd.Parameters.AddWithValue("@qty", dtLIN.Rows[row]["QTY"].ToString());
                    cmd.Parameters.AddWithValue("@amount", dtLIN.Rows[row]["Amount"].ToString());
                    cmd.Parameters.AddWithValue("@totalamt", dtLIN.Rows[row]["totalamt"].ToString());
                    cmd.Parameters.AddWithValue("@QueryType", 1);
                    cmd.ExecuteNonQuery();
                    row++;
                }

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

        public string DeleteData(String TransactionNo, string rec)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = storedProcedureName;
            cmd.Parameters.AddWithValue("@docno", TransactionNo);
            cmd.Parameters.AddWithValue("@recuser", rec);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }


        public string MultiUpdateProcess(DataTable dtProcess, string SystemUser)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                List<SqlCommand> cmdList = new List<SqlCommand>();
                SqlCommand cmd = new SqlCommand();
                cmd = new SqlCommand();

                foreach (DataRow dr in dtProcess.Rows)
                {
                    if (Parser.ParseBool(dr[SPR_Checkbox - 1].ToString()))
                    {
                        cmd.Connection = sqlConn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Transaction = sqlTrn; // Need to specify for every command
                        cmd.CommandText = storedProcedureName;
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@Docno", dr[SPR_DOCUMENTNO - 1].ToString());
                        cmd.Parameters.AddWithValue("@recuser", SystemUser);
                        cmd.Parameters.AddWithValue("@QueryType", 5);
                        cmd.ExecuteNonQuery();
                    }
                }
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 547)
                    result = String.Format("System Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("{0}\n", sqlEx.Message);
                return result;
            }
            catch (Exception ex)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                return String.Format("{0}\n", ex.Message);
            }

            sqlTrn.Commit();
            sqlConn.Close();
            return "Process completed";
        }

        public DataTable getProcessData(String user)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = storedProcedureName;
            cmd.Parameters.AddWithValue("@recuser", user);
            cmd.Parameters.AddWithValue("@QueryType", 23);
            return ExecGetData(cmd, _ConnectionString);
        }



        public string GenerateTranNo(string Loc, string Trantype)
        {

            return SFObjects.returnText(string.Format(@"EXEC " + storedProcedureName + " @Vendor = '" + Loc + "',@Trantype = '" + Trantype + "',  @QueryType = 5 "), _ConnectionString);

        }


    }
}