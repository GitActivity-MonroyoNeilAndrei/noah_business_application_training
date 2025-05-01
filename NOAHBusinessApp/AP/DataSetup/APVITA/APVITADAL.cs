using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class APVITADAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects(); /// should be added
        #region STANDARD

        public string MenuItemCode = "APVITA"; // This is default parameter  for version
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

        private string storedProcedureName = "[PO].[nsp_VitaHDR]";
        private string storedProcedureNameLIN = "[PO].[nsp_VitaLIN]";
        private string tableName = "[PO].[VitaHDR]";
        private string tableNameLin = "[PO].[VitaLIN]";

        public APVITADAL(string ConnectionString, string ConnectionString2, string selectedItem)
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
        public string inquireQuery()
        {
            return string.Format(@"EXEC " + storedProcedureName + " @QueryType = 8");
        }
        public string ItemGType(string Item, string itemGroupType)
        {
            return string.Format(@"EXEC " + storedProcedureNameLIN + " @ItemCode = '{0}', @ItemGroupTypeSplit = '{1}', @QueryType = 6", Item, itemGroupType);
        }
        public string ItemCode(string ItemGroupTypeCode, string Item)
        {
            return string.Format(@"EXEC " + storedProcedureNameLIN + " @ItemGroupType = '{0}',@ItemCode = '{1}', @QueryType = 7", ItemGroupTypeCode, Item);
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
            string a = string.Format(@"EXEC " + storedProcedureName + " @Vendor = '" + code + "', @QueryType = 0");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
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
            string sql = String.Format(@"EXEC {0}  @VendorCode = '" + Code + "', @QueryType = 0", storedProcedureNameLIN);

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

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = storedProcedureName;
                cmd.Parameters.AddWithValue("@Vendor", dtHDR.Rows[0]["Vendor"].ToString());
                cmd.Parameters.AddWithValue("@Remarks", dtHDR.Rows[0]["Remarks"].ToString());
                cmd.Parameters.AddWithValue("@Recuser", dtHDR.Rows[0]["Recuser"].ToString());
                cmd.Parameters.AddWithValue("@Moduser", dtHDR.Rows[0]["Moduser"].ToString());
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);
                cmd.ExecuteNonQuery();

                int row = 0;
                foreach (DataRow items in dtLIN.Rows)
                {
                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn; // Need to specify for every command
                    cmd.Parameters.Clear();
                    cmd.CommandText = storedProcedureNameLIN;
                    cmd.Parameters.AddWithValue("@VendorCode", dtLIN.Rows[row]["Vendor"].ToString());
                    cmd.Parameters.AddWithValue("@ItemGroupType", dtLIN.Rows[row]["ItemGroupType"].ToString());
                    cmd.Parameters.AddWithValue("@ItemCode", dtLIN.Rows[row]["Item"].ToString());
                    cmd.Parameters.AddWithValue("@BaseUOM", dtLIN.Rows[row]["BaseUOM"].ToString());
                    cmd.Parameters.AddWithValue("@VATTaxCode", dtLIN.Rows[row]["VatCode"].ToString());
                    cmd.Parameters.AddWithValue("@EWTCode", dtLIN.Rows[row]["EWTCode"].ToString());
                    cmd.Parameters.AddWithValue("@Remarks", dtLIN.Rows[row]["Remarks"].ToString());
                    cmd.Parameters.AddWithValue("@QueryType", 1);
                    cmd.ExecuteNonQuery();
                    row++;
                }

                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = storedProcedureName;
                cmd.Parameters.AddWithValue("@Vendor", dtHDR.Rows[0]["Vendor"].ToString());
                cmd.Parameters.AddWithValue("@QueryType", 10);
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

        public string DeleteData(String TransactionNo, string rec)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = storedProcedureName;
            cmd.Parameters.AddWithValue("@Vendor", TransactionNo);
            cmd.Parameters.AddWithValue("@Recuser", rec);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }


        public string ProcessTransaction(String TransactionNo)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = storedProcedureName;
            cmd.Parameters.AddWithValue("@TransactionNo", TransactionNo);
            cmd.Parameters.AddWithValue("@QueryType", 6);
            return base.ExecProcedure(cmd, _ConnectionString);
        }



        public string GenerateTranNo(string Loc, string Trantype)
        {

            return SFObjects.returnText(string.Format(@"EXEC " + storedProcedureName + " @Vendor = '" + Loc + "',@Trantype = '" + Trantype + "',  @QueryType = 5 "), _ConnectionString);

        }


    }
}