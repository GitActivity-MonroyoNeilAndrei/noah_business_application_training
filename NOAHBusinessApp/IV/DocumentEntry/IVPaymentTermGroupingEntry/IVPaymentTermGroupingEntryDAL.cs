using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class IVPaymentTermGroupingEntryDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        private SqlConnection sqlConn = new SqlConnection();
        private SqlTransaction sqlTrn;
        #region STANDARD

        public string MenuItemCode = "IVPaymentTermGroupingEntry"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.1"; // This is default parameter for version
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
                                primaryKey = "Docno";                                      //--column for searching



        //#FOR EXPORT
        public string LISTINGFILENAME = "Payment Term Grouping Entry", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        private string storedProcHDR = "RE.[nsp_IVPaymentTermGroupingEntryHDR]";
        public string TblHDR = "RE.[IVPaymentTermGroupingEntryHDR]";


       private string storedProcLIN = "[RE].[nsp_IVPaymentTermGroupingEntryLIN]";
        public string TblLIN = "[RE].[IVPaymentTermGroupingEntryLIN]";


        private string storedProcSellerRoleLIN = "[RE].[nsp_IVPaymentTermGroupingEntryLIN_dtl]";
        public string TblSellerRoleLIN = "[RE].[IVPaymentTermGroupingEntryDtl]";





        public IVPaymentTermGroupingEntryDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }


        public DataTable LoadSchema()
        {

            return SFObjects.LoadDataTable(string.Format("SELECT * FROM {0} WHERE 1<>1", TblHDR), _ConnectionString);

    
        }

        public DataTable LoadSchemaLIN()
        {

            return SFObjects.LoadDataTable(string.Format("SELECT * FROM {0} WHERE 1<>1", TblLIN), _ConnectionString);



        }

        public string GetData(string docno,string recuser)
        {
            string a = string.Format($@"EXEC {storedProcHDR}  @Docno ='{docno}',@Recuser ='{recuser}', @QueryType = 0");

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/

            return a;
        }


        public string sellerClassCode = String.Empty;
        public string SaveData(DataTable dtHDR, DataTable dtLIN, DataTable dtJson, string recuser, bool IsNewRow)
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
                cmd.CommandText = storedProcHDR;


                string docno = dtHDR.Rows[0]["Docno"].ToString();


                cmd.Parameters.AddWithValue("@Docno", docno);
                cmd.Parameters.AddWithValue("@Loc", dtHDR.Rows[0]["LocationCode"]);
                cmd.Parameters.AddWithValue("@Project", dtHDR.Rows[0]["ProjectCode"]);
                cmd.Parameters.AddWithValue("@Remarks", dtHDR.Rows[0]["Remarks"]);

                cmd.Parameters.AddWithValue("@Recuser", dtHDR.Rows[0]["recuser"]);
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);

                if (IsNewRow)
                    docno = cmd.ExecuteScalar().ToString();

                else
                    cmd.ExecuteNonQuery();



                int mainGridRow = 0;

                foreach (DataRow items in dtLIN.Rows)
                {

                    string paymentCode = items[0].ToString();

                    string lto = items[3].ToString();


                    if (paymentCode != "")
                    {

                        Double disctRate = 0;
                        if (items[9].ToString() != "")
                        {
                            disctRate = Double.Parse(items[9].ToString());
                        }




                        mainGridRow++;
                        cmd = new SqlCommand();
                        cmd.Connection = sqlConn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Transaction = sqlTrn; // Need to specify for every command
                        cmd.Parameters.Clear();
                        cmd.CommandText = storedProcLIN;
                        cmd.Parameters.AddWithValue("@Docno", docno);
                        cmd.Parameters.AddWithValue("@Code", items[0]);
                        cmd.Parameters.AddWithValue("@Description", items[1]);
                        cmd.Parameters.AddWithValue("@FinancingType", items[2]);
                        cmd.Parameters.AddWithValue("@LTO", lto.ToUpper());
                        cmd.Parameters.AddWithValue("@UnitCode", items[4]);
                        cmd.Parameters.AddWithValue("@EffectiveDateFrom", items[5]);
                        cmd.Parameters.AddWithValue("@EffectiveDateTo", items[6]);
                        cmd.Parameters.AddWithValue("@DiscountCode", items[7]);
                        cmd.Parameters.AddWithValue("@DiscountRate", disctRate);
                        cmd.Parameters.AddWithValue("@BasisDiscount", items[10]);
                        cmd.Parameters.AddWithValue("@ApplicationDiscount", items[11]);
                        cmd.Parameters.AddWithValue("@Rownum", mainGridRow);

                        cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);

                        cmd.ExecuteNonQuery();


                    }

                }




                int dtlRow = 0;

                foreach (DataRow itemsDtl in dtJson.Rows)
                {

                    string categoryCode = itemsDtl["payment_DTL_categoryCode"].ToString();


                    Double contractRate = 0;
                    Double ContractAmount = 0;
                    int DepositinMonths = 0;
                    Double depositsRate = 0;
                    if (itemsDtl["payment_DTL_contractRate"].ToString() != "")
                        contractRate = Double.Parse(itemsDtl["payment_DTL_contractRate"].ToString());

                    if (itemsDtl["payment_DTL_contractAmount"].ToString() != "")
                        ContractAmount = Double.Parse(itemsDtl["payment_DTL_contractAmount"].ToString());

                    if (itemsDtl["payment_DTL_depositsMonth"].ToString() != "")
                        DepositinMonths = Int32.Parse(itemsDtl["payment_DTL_depositsMonth"].ToString());

                    if (itemsDtl["payment_DTL_dpDiscountRate"].ToString() != "")
                        depositsRate = Double.Parse(itemsDtl["payment_DTL_dpDiscountRate"].ToString());


                    if (categoryCode != "")
                    {
                        dtlRow++;
                        cmd = new SqlCommand();
                        cmd.Connection = sqlConn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Transaction = sqlTrn; // Need to specify for every command
                        cmd.Parameters.Clear();
                        cmd.CommandText = storedProcSellerRoleLIN;

                        cmd.Parameters.AddWithValue("@docno", docno);
                        cmd.Parameters.AddWithValue("@PaymentCode", itemsDtl["payment_DTL_Code"]);
                        cmd.Parameters.AddWithValue("@CategoryCode", itemsDtl["payment_DTL_categoryCode"]);
                        cmd.Parameters.AddWithValue("@ContractRate", contractRate);
                        cmd.Parameters.AddWithValue("@ContractAmount", ContractAmount);
                        cmd.Parameters.AddWithValue("@DepositinMonths", DepositinMonths);
                        cmd.Parameters.AddWithValue("@TermCode", itemsDtl["payment_DTL_termCode"]);
                        cmd.Parameters.AddWithValue("@DPDiscount", itemsDtl["payment_DTL_dpDiscount"]);
                        cmd.Parameters.AddWithValue("@DiscountRate", depositsRate);
                        cmd.Parameters.AddWithValue("@ChargesAllocation", itemsDtl["payment_DTL_otherAlloc"]);
                        cmd.Parameters.AddWithValue("@Rownum", dtlRow);



                        foreach (DataRow dtItems in dtLIN.Rows)
                        {

                            //DataTable dtLinValidate = hasSavePaymentTermDetails(docno, dtItems[0].ToString(), dtlRow);
                            //string value = dtLinValidate.Rows[0][0].ToString();
                            string value = hasSavePaymentTermDetails(docno, dtItems[0].ToString());
                            if (value == "0")
                            {
                                cmd.Parameters.AddWithValue("@QueryType", 1);
                                cmd.ExecuteNonQuery();
                                break;
                            }
                            else
                            {

                                cmd.Parameters.AddWithValue("@QueryType", 2);
                                cmd.ExecuteNonQuery();
                                break;
                            }
                        }




                    }


                }






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
            return "Process has successfully completed.";

        }


        public string ProcessData(string docno, string recuser)
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
                cmd.CommandText = storedProcHDR;
                cmd.Parameters.AddWithValue("@Docno", docno);
                cmd.Parameters.AddWithValue("@Recuser", recuser);
                cmd.Parameters.AddWithValue("@QueryType", 5);
                cmd.ExecuteNonQuery();

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




        public string DeleteData(string docno)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = storedProcHDR;
            cmd.Parameters.AddWithValue("@Docno", docno);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            return base.ExecProcedure(cmd, _ConnectionString);
        }


        public string LISTINGQUERY()
        {
            return string.Format($@"EXEC {storedProcHDR} @QueryType = 6");
        }

        public string inquireQuery(string recuser)
        {
            return string.Format($@"EXEC {storedProcHDR} @QueryType = 4,@Recuser='{recuser}'");
        }



        //HDR lookup
        public string lugProject(string locform)
        {
            return string.Format($@"EXEC {storedProcHDR} @QueryType = 20,@Loc = '{locform}'");
        }

        public DataTable loadDefaultLocation(string code)
        {
            string sql = String.Format(@"EXEC {0} @QueryType = 21,@Recuser='" + code + "'", storedProcHDR);
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }



        public string luglocForm(string recuser)
        {
            return string.Format($@"EXEC {storedProcHDR} @QueryType = 22,@Recuser = '{recuser}'");
        }



        //Grid lookup
        public string lugFinanceType()
        {
            return string.Format($@"EXEC {storedProcLIN} @QueryType = 20");
        }

                    
        public string lugUnitCode()
        {
            return string.Format($@"EXEC {storedProcLIN} @QueryType = 21");
        }

        public string lugDiscount()
        {
            return string.Format($@"EXEC {storedProcLIN} @QueryType = 22");
        }


        //Lin details lookup
        public string lugCategory()
        {
            return string.Format($@"EXEC {storedProcSellerRoleLIN} @QueryType = 20");
        }

        public string lugTerm(string financingType)
        {
            return string.Format($@"EXEC {storedProcSellerRoleLIN} @QueryType = 21, @financingType ='{financingType}'");
        }

        public string getBasisDiscount()
        {
            return string.Format($@"EXEC {storedProcLIN} @QueryType = 37");
        }

        public string getAppDiscount()
        {
            return string.Format($@"EXEC {storedProcLIN} @QueryType = 38");
        }


        public DataTable getpaymentTermDT(string docno)
        {
            string sql = $@"EXEC {storedProcSellerRoleLIN} @QueryType=30, @docno = '{docno}' ";
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }



        //public string getType()
        //{
        //    return string.Format($@"EXEC {storedProcHDR} @QueryType = 4");
        //}

        public System.Data.DataTable getDetails(string docno)
        {
            return SFObjects.LoadDataTable($@"EXEC {storedProcLIN} @Docno = '{docno}', @QueryType = 0", _ConnectionString);
        }

        public System.Data.DataTable getDetailsSellerRole(string docno,string paymentCode)
        {
            return SFObjects.LoadDataTable($@"EXEC {storedProcSellerRoleLIN} @Docno = '{docno}', @PaymentCode = '{paymentCode}', @QueryType = 0", _ConnectionString);
        }



        public System.Data.DataTable validatePaymentCodeLIN()
        {
            return SFObjects.LoadDataTable($@"EXEC {storedProcLIN}  @QueryType = 23", _ConnectionString);
        }


        public string hasSavedRqrdCompli(string docno)
        {

            return SFObjects.returnText($@"SELECT [DC].[fn_ChkIfHasReqComplianceAll]('{docno}')", _ConnectionString);
        }



        public DataTable changeViewDetailsColor(string docno)
        {

            string sql = String.Format(@"EXEC {0} @QueryType = 22,@docno='" + docno + "' ", storedProcSellerRoleLIN);
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public string hasSavePaymentTermDetails(string docno, string paymentCode)
        {

            string sql = String.Format($"EXEC {storedProcSellerRoleLIN} @QueryType = 23,@docno='{docno}',@paymentCode='{paymentCode}'");
            return SFObjects.returnText(sql, _ConnectionString);
        }


    }
}