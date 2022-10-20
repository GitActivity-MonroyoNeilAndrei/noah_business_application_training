using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;

namespace DALComponent
{
    public class SBReservationEntryDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        #region STANDARD

        public string MenuItemCode = "SBReservationEntry"; // This is default parameter  for version
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

        private string focusRecordPK;
        private string _ConnectionString;
        private string _ConnectionString2;
        public readonly string errorString = "Error",                                     //--do not change this line
                                primaryKey = "TransactionNo";                                      //--column for searching


        public string spNameHDR = "PRT.nsp_PortalHoldforReservationEntry";
        public string spNamePayTermDTL = "[PRT].[nsp_HoldforReservationPaymentTermDetails]";

        public string spNameDiscount = "[PRT].[nsp_HoldforReservationDiscount]";
        public string spNameAddons = "[PRT].[nsp_HoldforReservationAddOns]";
        public string spNameCoBuyer = "[PRT].[nsp_holdforReservationCoBuyer]";

        public string spNameHoldReserve = "[PRT].[nsp_HoldforReservationEntry]";

        public string spRefBaseAddOn = "[PRT].[RefBaseUnitAddOn]";
        public string spPortalreserventry = "[PRT].[nsp_PortalReservationEntry]";



        public string Docno;

        //#FOR EXPORT
        public string LISTINGFILENAME = "Reservation Entry", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig",
        GETCOMPANYADDRESS = "select CompanyAddress from sg.BIRCASConfig",
        GETCONTACTNO = "select PhoneNumber from sg.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator

        public SBReservationEntryDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }


        public DataTable LoadSchema()
        {
            return SFObjects.LoadDataTable("SELECT * FROM [RE].[HoldforReservationEntryHDR] WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadHoldforReservationInsuranceHdr()
        {
            return SFObjects.LoadDataTable("SELECT * FROM RE.HoldforReservationInsuranceHDR WHERE 1<>1", _ConnectionString);
        }
        public string GetCheckingApprover(string project, string Trantype)
        {
            return SFObjects.returnText(string.Format(@"EXEC [SG].[nsp_GetUserApproverAssignment] @trantype='{0}',@loc='{1}',@amount=0,@QueryType=1", Trantype, project), _ConnectionString);
        }
        public DataTable LoadClientInformation()
        {
            return SFObjects.LoadDataTable("SELECT * FROM re.HoldforReservationEntry_ClientInformation_temp WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadHoldforReservationEntry_ClientInformation()
        {
            return SFObjects.LoadDataTable("SELECT * FROM [RE].[HoldforReservationEntry_ClientInformation] WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadHoldforReservationEntryLIN()
        {
            return SFObjects.LoadDataTable("SELECT * FROM RE.HoldforReservationEntryLIN WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadTermDetails()
        {
            return SFObjects.LoadDataTable("SELECT * FROM RE.HoldforReservationEntry_TermDetails_Temp WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadHoldforReservationPaymentTermDetails()
        {
            return SFObjects.LoadDataTable("SELECT * FROM RE.HoldforReservationPaymentTermDetails WHERE 1<>1", _ConnectionString);
        }
        public DataTable LoadHoldforReservationAddOns()
        {
            return SFObjects.LoadDataTable("SELECT * FROM RE.HoldforReservationAddOns WHERE 1<>1", _ConnectionString);
        }
        public DataTable LoadHoldforRefBaseAddons()
        {
            return SFObjects.LoadDataTable("SELECT * FROM RE.RefBaseUnitAddOn WHERE 1<>1", _ConnectionString);
        }
        public DataTable LoadHoldforReservationInsuranceLin()
        {
            return SFObjects.LoadDataTable("SELECT * FROM [RE].[HoldforReservationInsuranceLin] WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadHoldforReservationStatemment()
        {
            return SFObjects.LoadDataTable("SELECT * FROM [RE].[HoldforReservationStatement] WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadHoldforReservationDiscount()
        {
            return SFObjects.LoadDataTable("SELECT * FROM re.HoldforReservationDiscount WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadHoldforReservationMiscellaneous()
        {
            return SFObjects.LoadDataTable("SELECT * FROM re.HoldforReservationMiscellaneous WHERE 1<>1", _ConnectionString);
        }


        public DataTable LoadHoldforReservationCoBuyer()
        {
            return SFObjects.LoadDataTable("SELECT * FROM [RE].[holdforReservationCoBuyer]  WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadHoldforReservationFreebies()
        {
            return SFObjects.LoadDataTable("SELECT * FROM re.HoldforReservationFreebies WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadHoldforReservationEntry_Amortization()
        {
            return SFObjects.LoadDataTable("SELECT * FROM re.HoldforReservationEntry_Amortization WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadHoldforReservationEntry_TermDetails()
        {
            return SFObjects.LoadDataTable("SELECT * FROM re.HoldforReservationEntry_TermDetails WHERE 1<>1", _ConnectionString);
        }

        public DataTable LoadCombo()
        {
            return SFObjects.LoadDataTable(@"EXEC re.nsp_LoadAllComboBox @QueryType=6", _ConnectionString);
        }

        public DataTable LoadCategory()
        {
            return SFObjects.LoadDataTable(@"EXEC re.nsp_LoadAllComboBox @QueryType=9", _ConnectionString);
        }
        public DataTable LoadComboInventoryType(string phase, string branch)
        {
            return SFObjects.LoadDataTable($@"EXEC re.nsp_LoadAllComboBox @QueryType=5,@Phase='{phase}',@Branch='{branch}'", _ConnectionString);
        }
        public DataTable LoadComboPhase(string branch)
        {
            return SFObjects.LoadDataTable($@"EXEC re.nsp_LoadAllComboBox @QueryType=4,@Branch='{branch}'", _ConnectionString);
        }

        public DataTable LoadCategory(string FinancingType, string Unitcode)
        {
            return SFObjects.LoadDataTable($@"EXEC {spPortalreserventry} @QueryType=21,@unitCode='{Unitcode}', @FinancingType='{FinancingType}'", _ConnectionString);
        }


        public string getlugCategory(string FinancingType, string Unitcode)
        {
            return $@"EXEC {spPortalreserventry} @QueryType=21,@unitCode='{Unitcode}', @FinancingType='{FinancingType}'";
        }



        public string getlugBasisDiscount()
        {
            return $@"EXEC {spNameDiscount} @QueryType=20";
        }


        public string getlugDiscountType()
        {
            return $@"EXEC {spNameDiscount} @QueryType=21";
        }






        public DataTable getAllCombo(string itemGroupType)
        {

            return SFObjects.LoadDataTable($@"EXEC {spNameHoldReserve} @QueryType=57,@ItemGroupType='{itemGroupType}'", _ConnectionString);

            //return SFObjects.LoadDataTable($@"EXEC re.nsp_HoldforReservationEntry @QueryType=57,@ItemGroupType='{itemGroupType}'", _ConnectionString);
        }

        public DataTable getMiscellaneous(string docno)
        {
            return SFObjects.LoadDataTable($@"EXEC {spNameHoldReserve}  @QueryType=62,@TransactionNo='{docno}'", _ConnectionString);

            //return SFObjects.LoadDataTable($@"EXEC re.nsp_HoldforReservationEntry @QueryType=62,@TransactionNo='{docno}'", _ConnectionString);
        }

        public DataTable LoadComboUnitClass(string branch, string phase, string unitType)
        {
            return SFObjects.LoadDataTable($@"EXEC re.nsp_LoadAllComboBox @QueryType=3,@Branch='{branch}',@Phase='{phase}',@UnitType='{unitType}'", _ConnectionString);
        }

        public DataTable LoadDiscountType()
        {
            return SFObjects.LoadDataTable(@"EXEC re.nsp_LoadAllComboBox @QueryType=2", _ConnectionString);
        }

        public DataTable LoadInventoryGroup()
        {
            return SFObjects.LoadDataTable($@"EXEC {spNameHoldReserve}  @QueryType=55", _ConnectionString);
            // return SFObjects.LoadDataTable(@"EXEC re.nsp_HoldforReservationEntry @QueryType=55", _ConnectionString);

        }

        public DataTable LoadProductType()
        {
            return SFObjects.LoadDataTable($@"EXEC {spNameHoldReserve}  @QueryType=56", _ConnectionString);
            //return SFObjects.LoadDataTable(@"EXEC re.nsp_HoldforReservationEntry @QueryType=56", _ConnectionString);
        }

        public DataTable LoadNoOfUnits(string branch, string phase, string unitType, string unitclass)
        {
            return SFObjects.LoadDataTable($@"EXEC re.nsp_LoadAllComboBox @QueryType=1,@Branch='{branch}',@Phase='{phase}',@UnitType='{unitType}',@UnitClass='{unitclass}'", _ConnectionString);
        }

        public DataTable LoadSpotCashDiscount(string branch, string phase, string unitType, string unitclass, string nounits, string reservationdate)
        {
            return SFObjects.LoadDataTable($@"EXEC re.nsp_LoadAllComboBox @QueryType=9,@Branch='{branch}',@Phase='{phase}',@UnitType='{unitType}',@UnitClass='{unitclass}',@NoOfUnits='{nounits}',@ReservationDate='{reservationdate}'", _ConnectionString);
        }

        public string LoadSpotCashAmount(string branch, string phase, string unitType, string unitclass, string nounits, string reservationdate, double spotrate)
        {
            return SFObjects.returnText($@"EXEC {spNameHoldReserve} @QueryType=52,@Branch='{branch}',@Phase='{phase}',@UnitType='{unitType}',@UnitClass='{unitclass}',@NoOfUnits='{nounits}',@Reservation='{reservationdate}',@SpotCashDisc='{spotrate}'", _ConnectionString);
            //return SFObjects.returnText($@"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=52,@Branch='{branch}',@Phase='{phase}',@UnitType='{unitType}',@UnitClass='{unitclass}',@NoOfUnits='{nounits}',@Reservation='{reservationdate}',@SpotCashDisc='{spotrate}'", _ConnectionString);
        }

        public DataTable LoadInsuranceCompany()
        {
            return SFObjects.LoadDataTable(@"EXEC re.nsp_LoadAllComboBox @QueryType=0", _ConnectionString);
        }

        public DataTable LoadSourceOfSale()
        {
            return SFObjects.LoadDataTable(@"EXEC re.nsp_LoadAllComboBox @QueryType=7", _ConnectionString);
        }

        public DataTable LoadOrigin()
        {
            return SFObjects.LoadDataTable(@"EXEC re.nsp_LoadAllComboBox @QueryType=8", _ConnectionString);
        }

        public DataTable LoadDataAmort(string recuser)
        {
            return SFObjects.LoadDataTable($"EXEC  {spNameHoldReserve}  @QueryType=30 ,@Recuser='{recuser}'", _ConnectionString);
            //return SFObjects.LoadDataTable($"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=30 ,@Recuser='{recuser}'", _ConnectionString);
        }

        public DataTable GetStandardUnitPrice(string branchcode, string unittypecode, string unitclasscode, string noofunits, string reservationdate, string phase, string financingType, int atneed)
        {
            string sql = $@"EXEC  {spNameHoldReserve}  @QueryType=33 ,@Branch='{branchcode}',
            @Reservation='{reservationdate}',@UnitType='{unittypecode}',@UnitClass='{unitclasscode}',@NoOfUnits='{noofunits}',@Phase='{phase}',
            @FinancingType='{financingType}',@Atneedsales='{atneed}'
            ";

            //string sql = $@"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=33 ,@Branch='{branchcode}',
            //@Reservation='{reservationdate}',@UnitType='{unittypecode}',@UnitClass='{unitclasscode}',@NoOfUnits='{noofunits}',@Phase='{phase}',
            //@FinancingType='{financingType}',@Atneedsales='{atneed}'
            //";


            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }
        public DataTable LoadBranchID(string branch)
        {
            return SFObjects.LoadDataTable($@"select '' as Code ,'' as [Description] union ALL SELECT Code,(Code+'-'+Description) AS [Description] FROM sg.LOCATIONACCOUNTABLEFORMS WHERE code='{branch}'", _ConnectionString);
        }


        //public DataTable GetAmortization(string recuser,int fixedInterest)
        //{
        //    return SFObjects.LoadDataTable($"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=31 ,@Recuser='{recuser}',@IsFixedInterest='{fixedInterest}'", _ConnectionString);
        //}

        public DataTable GetTermDetails(string recuser)
        {
            return SFObjects.LoadDataTable($"EXEC {spNameHoldReserve}  @QueryType=32,@Recuser='{recuser}'", _ConnectionString);


            //return SFObjects.LoadDataTable($"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=32,@Recuser='{recuser}'", _ConnectionString);
        }

        public DataTable LoadUnitType(string InventoryType)
        {
            return SFObjects.LoadDataTable($"EXEC  {spNameHoldReserve}  @QueryType=15 ,@InventoryType='{InventoryType}'", _ConnectionString);


            //return SFObjects.LoadDataTable($"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=15 ,@InventoryType='{InventoryType}'", _ConnectionString);
        }

        public DataTable LoadSourceSale(string code)
        {
            return SFObjects.LoadDataTable($"EXEC  {spNameHoldReserve}  @QueryType=46 ,@Code='{code}'", _ConnectionString);

            //  return SFObjects.LoadDataTable($"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=46 ,@Code='{code}'", _ConnectionString);
        }

        public DataTable LoadUnitClass(string UnitClass)
        {
            return SFObjects.LoadDataTable($"EXEC {spNameHoldReserve} @QueryType=17 ,@UnitClassCode='{UnitClass}'", _ConnectionString);

            //return SFObjects.LoadDataTable($"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=17 ,@UnitClassCode='{UnitClass}'", _ConnectionString);
        }
        public string getTotalUnitCapacity(string id)
        {
            string sql = SFObjects.returnText($@"SELECT ISNULL(FORMAT(sum(a.TotalUnitCapacity),'#,0.00'),0) AS TotalUnitCapacity FROM RE.InventoryCapacityAssignHDR a
                                WHERE a.EffectiveDate=(SELECT MAX(b.EffectiveDate) FROM re.InventoryCapacityAssignHDR b WHERE 
                                b.EffectiveDate<=GETDATE() AND a.Code=b.code)
                                 and a.ReferenceUnit IN ({id})", _ConnectionString);

            if (string.IsNullOrEmpty(sql))
                sql = "0.00";

            return sql;
        }
        public string GetData(string Recuser, string unitCode, string transactionNo)
        {
            string a = string.Empty;

            //if (string.IsNullOrEmpty(transactionNo))
            a = string.Format(@"EXEC  {3} @QueryType = 0, @Recuser = '{0}',@unitCode='{1}',@TransactionNo='{2}'", Recuser, unitCode, transactionNo, spNameHDR);
            //else
            //    a= string.Format(@"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType = -1,@TransactionNo='{0}'" , transactionNo);

            focusRecordPK = string.Empty;
            a = a.Replace(Environment.NewLine, " "); /*Do not Remove this*/
            return a;
        }

        private SqlConnection sqlConn = new SqlConnection();
        private SqlTransaction sqlTrn;

        public string SavePaymentCategory(DataTable dt, string Recuser)
        {
            try
            {
                //Header
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();


                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = spNameHoldReserve;
                cmd.Parameters.AddWithValue("@QueryType", 58);
                cmd.Parameters.AddWithValue("@Recuser", Recuser);
                cmd.ExecuteNonQuery();

                int row = 0;
                foreach (DataRow drLin in dt.Rows)
                {
                    row++;
                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn;
                    cmd.Parameters.Clear();
                    cmd.CommandText = spNameHoldReserve;
                    cmd.Parameters.AddWithValue("@Code", drLin["Code"]);
                    cmd.Parameters.AddWithValue("@Description", drLin["Description"]);
                    cmd.Parameters.AddWithValue("@Recuser", Recuser);
                    cmd.Parameters.AddWithValue("@Rowid", row);
                    cmd.Parameters.AddWithValue("@QueryType", 59);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Error [{0}]: \nSystem Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.", sqlEx.Number);
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

            return "Saved successfully";
        }
        public string SaveData(
            DataTable dtHdr,
            DataTable dtHoldforreservationEntryLin,
            DataTable dtPaymentTermDetails,
            DataTable dtAddOn,
            DataTable dtDiscount,
            DataTable dtAmort,
            DataTable dtRefBase,
            DataTable dtCoBuyer,
            DataTable dtMiscDtls,
            bool isupdateRefBaseLIN,
            string trantype,
            string branch,
            bool IsNewRow,
            DataTable paymentDetails,
            DataTable attachmentDetails
            )
        {
            try
            {
     

                //Header
                DataRow dr = dtHdr.Rows[0];
                string a = dr["SpotCashAmt"].ToString();
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                if (IsNewRow)
                {
                    Docno = SFObjects.returnText(string.Format(@"SELECT SG.fn_GetDocno('{1}', DATEPART(YEAR, GETDATE()),'{0}')", trantype, branch.ToString().Trim()), _ConnectionString);
                    if (Docno == string.Empty)
                    {
                        sqlConn.Close();
                        return "Please setup in transaction type approval assignment.";
                    }
                }
                else
                    Docno = dr["TransactionNo"].ToString();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;




                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = spNameHDR;


                string docno = dtHdr.Rows[0]["TransactionNo"].ToString();


                cmd.Parameters.AddWithValue("@TransactionNo", docno);
                cmd.Parameters.AddWithValue("@BalStartDate", dtHdr.Rows[0]["BalStartDate"]);
                cmd.Parameters.AddWithValue("@SpotCashRate", dtHdr.Rows[0]["SpotCashRate"]);
                cmd.Parameters.AddWithValue("@SpotCashAmt", dtHdr.Rows[0]["SpotCashAmt"]);
                cmd.Parameters.AddWithValue("@Expiration", dtHdr.Rows[0]["Expiration"]);
                cmd.Parameters.AddWithValue("@IsLumpSum", dtHdr.Rows[0]["IsLumpSum"]);
                cmd.Parameters.AddWithValue("@Recuser", dtHdr.Rows[0]["recuser"]);
                cmd.Parameters.AddWithValue("@QueryType", 2);
                cmd.ExecuteNonQuery();




                // Payment Term LIN

                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = spNamePayTermDTL;

                cmd.Parameters.AddWithValue("@TransactionNo", docno);

                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmd.ExecuteNonQuery();


                foreach (DataRow drLin in dtPaymentTermDetails.Rows)
                {

                    double netlotUP = Parser.ParseDouble(drLin["TotalLotPrice"].ToString()) - Parser.ParseDouble(drLin["TCP"].ToString());
                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn;
                    cmd.Parameters.Clear();
                    cmd.CommandText = spNamePayTermDTL;
                    cmd.Parameters.AddWithValue("@TransactionNo", Docno);
                    cmd.Parameters.AddWithValue("@Category", drLin["Category"]);
                    cmd.Parameters.AddWithValue("@PaymentTerm", drLin["PaymentTerm"]);
                    cmd.Parameters.AddWithValue("@ContractRate", Parser.ParseDouble(drLin["ContractRate"]));
                    cmd.Parameters.AddWithValue("@TotalLotPrice", Parser.ParseDouble(drLin["TotalLotPrice"]));
                    cmd.Parameters.AddWithValue("@MiscInstallment", Parser.ParseDouble(drLin["MiscInstallment"]));
                    cmd.Parameters.AddWithValue("@SalesDisc", Parser.ParseDouble(drLin["SalesDisc"]));
                    cmd.Parameters.AddWithValue("@NetLotUP", netlotUP);
                    cmd.Parameters.AddWithValue("@TCP", Parser.ParseDouble(drLin["TCP"]));
                    cmd.Parameters.AddWithValue("@DPDisc", drLin["DPDisc"]);
                    cmd.Parameters.AddWithValue("@DPDiscRate", Parser.ParseDouble(drLin["DPDiscRate"]));
                    cmd.Parameters.AddWithValue("@DPDiscAmount", Parser.ParseDouble(drLin["DPDiscAmount"]));
                    cmd.Parameters.AddWithValue("@Ntcp", Parser.ParseDouble(drLin["Ntcp"]));
                    cmd.Parameters.AddWithValue("@NoOfPayments", drLin["NoOfPayments"]);
                    cmd.Parameters.AddWithValue("@Monthly", Parser.ParseDouble(drLin["Monthly"]));

                    cmd.Parameters.AddWithValue("@QueryType", 1);
                    cmd.ExecuteNonQuery();
                }


                //  Add Ons
                foreach (DataRow drLin in dtAddOn.Rows)
                {
                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn;
                    cmd.Parameters.Clear();
                    cmd.CommandText = spNameAddons;
                    cmd.Parameters.AddWithValue("@TransactionNo", Docno);
                    cmd.Parameters.AddWithValue("@AddOnItem", drLin["AddOnItem"]);
                    cmd.Parameters.AddWithValue("@Qty", drLin["Qty"]);
                    cmd.Parameters.AddWithValue("@Category", drLin["Category"]);
                    cmd.Parameters.AddWithValue("@Rowid", drLin["Rowid"]);
                    cmd.Parameters.AddWithValue("@UOM", drLin["UOM"]);
                    cmd.Parameters.AddWithValue("@QueryType", 2);
                    cmd.ExecuteNonQuery();

                }



                // Discount


                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = spNameDiscount;

                cmd.Parameters.AddWithValue("@TransactionNo", docno);

                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmd.ExecuteNonQuery();



                foreach (DataRow drLin in dtDiscount.Rows)
                {

                    cmd = new SqlCommand();
                    double discrate = Parser.ParseDouble(drLin["DiscountRate"].ToString());
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn;
                    cmd.Parameters.Clear();
                    cmd.CommandText = spNameDiscount;
                    cmd.Parameters.AddWithValue("@TransactionNo", Docno);
                    cmd.Parameters.AddWithValue("@DiscountCode", drLin["DiscountCode"]);
                    cmd.Parameters.AddWithValue("@DiscountRate", drLin["DiscountRate"]);
                    cmd.Parameters.AddWithValue("@BasisOfDiscount", drLin["BasisOfDiscount"]);
                    cmd.Parameters.AddWithValue("@DiscountApplication", drLin["DiscountApplication"]);
                    cmd.Parameters.AddWithValue("@DiscountAmount", drLin["DiscountAmount"]);
                    cmd.Parameters.AddWithValue("@DiscountAmt_SP", drLin["DiscountAmt_SP"]);
                    cmd.Parameters.AddWithValue("@DiscountAmount_MSC", drLin["DiscountAmount_MSC"]);

                    cmd.Parameters.AddWithValue("@QueryType", 1);
                    cmd.ExecuteNonQuery();
                }



                if (isupdateRefBaseLIN == true)
                {
                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn;
                    cmd.Parameters.Clear();
                    cmd.CommandText = spRefBaseAddOn;
                    cmd.Parameters.AddWithValue("@QueryType", 2);
                    cmd.Parameters.AddWithValue("@ReservationControlNo", Docno);
                    cmd.ExecuteNonQuery();

                }


                // Ref Base Add ons
                foreach (DataRow drLin in dtRefBase.Rows)
                {

                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn;
                    cmd.Parameters.Clear();
                    cmd.CommandText = spRefBaseAddOn;
                    cmd.Parameters.AddWithValue("@ReservationControlNo", Docno);
                    cmd.Parameters.AddWithValue("@refHoldingNo", Docno);
                    cmd.Parameters.AddWithValue("@UnitCodeHdr", drLin["UnitCodeHdr"]);
                    cmd.Parameters.AddWithValue("@UnitCodeLin", drLin["UnitCodeLin"]);
                    cmd.Parameters.AddWithValue("@RowNo", drLin["RowNo"]);

                    cmd.Parameters.AddWithValue("@QueryType", 1);
                    cmd.ExecuteNonQuery();
                }



                // Co Buyer

                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = spNameCoBuyer;

                cmd.Parameters.AddWithValue("@TransactionNo", docno);

                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmd.ExecuteNonQuery();


                foreach (DataRow drLin in dtCoBuyer.Rows)
                {

                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn;
                    cmd.Parameters.Clear();
                    cmd.CommandText = spNameCoBuyer;
                    cmd.Parameters.AddWithValue("@TransactionNo", Docno);
                    cmd.Parameters.AddWithValue("@CoBuyerName", drLin["CoBuyerName"]);
                    cmd.Parameters.AddWithValue("@DateofBirth", drLin["DateofBirth"]);
                    cmd.Parameters.AddWithValue("@Gender", drLin["Gender"]);
                    cmd.Parameters.AddWithValue("@RelationshipCode", drLin["RelationshipCode"]);
                    cmd.Parameters.AddWithValue("@TinNo", drLin["tinNo"]);
                    cmd.Parameters.AddWithValue("@Rownum", drLin["Rownum"]);

                    cmd.Parameters.AddWithValue("@QueryType", 1);
                    cmd.ExecuteNonQuery();
                }








            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Error [{0}]: \nSystem Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.", sqlEx.Number);
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
            return "Saved successfully";
        }

        public string SaveData2(DataTable dt, DataTable dt1)
        {
            try
            {
                //Header
                DataRow dr = dt.Rows[0];
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = "[RE].[nsp_HoldforReservationEntry_ClientInformation]";
                cmd.Parameters.AddWithValue("@QueryType", 5);
                cmd.Parameters.AddWithValue("@Recuser", dr["Recuser"].ToString());
                cmd.ExecuteNonQuery();

                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = "[RE].[nsp_HoldforReservationEntry_ClientInformation]";
                cmd.Parameters.AddWithValue("@LotUnitPrice", dr["LotUnitPrice"]);
                cmd.Parameters.AddWithValue("@SalesDisc", dr["SalesDisc"]);
                cmd.Parameters.AddWithValue("@NetLotUnitPrice", dr["NetLotUnitPrice"]);
                cmd.Parameters.AddWithValue("@MiscMCF", dr["MiscMCF"]);
                cmd.Parameters.AddWithValue("@TotalContractPrice", dr["TotalContractPrice"]);
                cmd.Parameters.AddWithValue("@DpDisc", dr["DpDisc"]);
                cmd.Parameters.AddWithValue("@Ntcp", dr["Ntcp"]);
                cmd.Parameters.AddWithValue("@Downpayment", dr["Downpayment"]);
                cmd.Parameters.AddWithValue("@Balance", dr["Balance"]);
                cmd.Parameters.AddWithValue("@Reservation", dr["Reservation"]);
                cmd.Parameters.AddWithValue("@ReservationDate", dr["ReservationDate"]);
                cmd.Parameters.AddWithValue("@ClientCode", dr["ClientCode"]);
                cmd.Parameters.AddWithValue("@Agency", dr["Agency"]);
                cmd.Parameters.AddWithValue("@Agent", dr["Agent"]);
                cmd.Parameters.AddWithValue("@Recuser", dr["Recuser"]);
                cmd.Parameters.AddWithValue("@UnitType", dr["UnitType"]);
                cmd.Parameters.AddWithValue("@UnitClass", dr["UnitClass"]);
                cmd.Parameters.AddWithValue("@Vatrate", dr["Vatrate"]);
                cmd.Parameters.AddWithValue("@AllocationOfMiscOnNTCP", dr["AllocationOfMiscOnNTCP"]);
                cmd.Parameters.AddWithValue("@Company", dr["Company"]);
                cmd.Parameters.AddWithValue("@UnitCode", dr["UnitCode"]);
                cmd.Parameters.AddWithValue("@Interest", dr["Interest"]);
                cmd.Parameters.AddWithValue("@Branch", dr["Branch"]);
                cmd.Parameters.AddWithValue("@Tcp", dr["Tcp"]);
                cmd.Parameters.AddWithValue("@QueryType", 4);
                cmd.ExecuteNonQuery();

                int row = 0;
                foreach (DataRow drLin in dt1.Rows)
                {
                    row++;
                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn;
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[RE].[nsp_HoldforReservationEntry_TermDetails]";
                    cmd.Parameters.AddWithValue("@PaymentTerm", drLin["PaymentTerm"]);
                    cmd.Parameters.AddWithValue("@ContractRate", drLin["ContractRate"]);
                    cmd.Parameters.AddWithValue("@TermAmount", drLin["TermAmount"]);
                    cmd.Parameters.AddWithValue("@TermDisc", drLin["TermDisc"]);
                    cmd.Parameters.AddWithValue("@MonthlyPayment", drLin["MonthlyPayment"]);
                    cmd.Parameters.AddWithValue("@TermPeriodMonths", drLin["TermPeriodMonths"]);
                    cmd.Parameters.AddWithValue("@InterestRate", drLin["InterestRate"]);
                    cmd.Parameters.AddWithValue("@PenaltyRate", drLin["PenaltyRate"]);
                    cmd.Parameters.AddWithValue("@FinancingTypeCode", drLin["FinancingTypeCode"]);
                    cmd.Parameters.AddWithValue("@StartDate", drLin["StartDate"]);
                    cmd.Parameters.AddWithValue("@EndDate", drLin["EndDate"]);
                    cmd.Parameters.AddWithValue("@Recuser", drLin["Recuser"]);
                    cmd.Parameters.AddWithValue("@Rownum", drLin["Rownum"]);
                    cmd.Parameters.AddWithValue("@PaymentCategory", drLin["PaymentCategory"]);
                    cmd.Parameters.AddWithValue("@PaymentCount", drLin["PaymentCount"]);
                    cmd.Parameters.AddWithValue("@QueryType", 4);
                    cmd.ExecuteNonQuery();
                }
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Error [{0}]: \nSystem Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.", sqlEx.Number);
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
            return "Process has successfully completed";
        }

        public string DeleteData(string TransactionNo)
        {

            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = spNameHoldReserve;
                cmd.Parameters.AddWithValue("@TransactionNo", TransactionNo);
                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmd.ExecuteNonQuery();


                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = spNameHoldReserve;
                cmd.Parameters.AddWithValue("@QueryType", 67);
                cmd.Parameters.AddWithValue("@TransactionNo", TransactionNo);
                //cmd.Parameters.AddWithValue("@ItemStatus", "003");//Available
                cmd.ExecuteNonQuery();
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Error [{0}]: \nSystem Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.", sqlEx.Number);
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

            //return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string ProcessData(String TransactionNo, int status, string recuser)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = spNameHoldReserve;
                cmd.Parameters.AddWithValue("@TransactionNo", TransactionNo);
                cmd.Parameters.AddWithValue("@Status", status);
                cmd.Parameters.AddWithValue("@Recuser", recuser);
                cmd.Parameters.AddWithValue("@QueryType", 36);
                cmd.ExecuteNonQuery();

                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = spNameHoldReserve;
                cmd.Parameters.AddWithValue("@QueryType", 43);
                cmd.Parameters.AddWithValue("@TransactionNo", TransactionNo);
                if (status == 3)//autopost
                    cmd.Parameters.AddWithValue("@ItemStatus", "005");
                else
                    cmd.Parameters.AddWithValue("@ItemStatus", "004");
                cmd.ExecuteNonQuery();
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Error [{0}]: \nSystem Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.", sqlEx.Number);
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
            return "Process completed";
        }

        public string inquireQuery(string recuser, string docno)
        {
            return string.Format($@"EXEC {spNameHDR} @QueryType = 35,@Recuser='{recuser}',@transactionNo='{docno}'");
        }

        public string getLocForm(string Recuser, string Trantype)
        {
            //return string.Format($"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=6, @Recuser='{Recuser}',@Trantype='{Trantype}'");

            return string.Format($"EXEC {spNameHoldReserve} @QueryType=5 ,@Recuser='{Recuser}',@Trantype='{Trantype}'", _ConnectionString);
            //return string.Format($"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=5 ,@Recuser='{Recuser}',@Trantype='{Trantype}'", _ConnectionString);
        }

        public string GetDefaultMaturitydate(string reservDate, int noOfPayments)
        {
            return string.Format(SFObjects.returnText($"select convert(varchar(30),dateadd(mm,{(noOfPayments - 1)},convert(date,'{reservDate}')),101)", _ConnectionString));
        }
        public string getLoc(string Recuser, string Trantype)
        {
            return string.Format($"select * from [RE].[fn_DefaultLocation_PORTAL]('{Trantype}')");
        }

        public string getBranch(string loc)
        {
            return string.Format($"EXEC {spNameHoldReserve} @QueryType=54, @LocwithAccountableForms='{loc}'");
            //return string.Format($"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=54, @LocwithAccountableForms='{loc}'");

        }

        public DataTable PopulateDefaultTerm(string financingType, string unitCode, double grossSellingPrice, string reservDate)
        {
            string sql = $@"EXEC {spPortalreserventry} @queryType=22,@FinancingType='{financingType}', @UnitCode='{unitCode}',@GrossSellingPrice='{grossSellingPrice}',@ReservDate='{reservDate}'";
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable getPaymentDetail(string docno)
        {
            return SFObjects.LoadDataTable($"exec re.nsp_holdforreservationPaymentDetails @queryType=0,@transactionNo='{docno}'", _ConnectionString);
        }

        public DataTable getPaymentDetailAttachment(string docno)
        {
            string sql = $"exec re.nsp_holdforreservationPaymentDetailsAttachment @queryType=0,@transactionNo='{docno}'";
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }
        public DataTable PopulatePaymentTermGrouping(double stdLotUP, double vatAmount, double gross, double misc, double tcp, string Code, double reservPrin, double reservMisc, string reservDate)
        {
            string sql = $@"EXEC [RE].[nsp_HoldforreservationPaymentTermGrouping] @stdlotup='{stdLotUP}', 
            @vatAmount='{vatAmount}',@gross='{gross}',@miscellaneous='{misc}',@tcp='{tcp}',@code='{Code}',
            @reservAmount='{reservPrin}',@reservMisc='{reservMisc}',@reservdate='{reservDate}',@queryType=1";
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public DataTable SpotDropDown(string financingType, string unitCode, string project, string phase, double grossSellingPrice, string reservDate, string UnitType, string UnitClass)
        {
            string sql = $@"select * from [RE].[fn_SpotComboPortal] ('{unitCode}')";
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }
        public DataTable dtgetPaymentTerm(string Branch, string FT, string cat, string phase, string unitTypeCode, string unitClassCode, string nounits, string reservdate, string itemgrouptype)
        {
            return SFObjects.LoadDataTable(string.Format($@"EXEC [RE].[nsp_GetPaymentTermForReservationEntry]  @Branch='{Branch}',@financingType='{FT}', @paymentCategory='{cat}', @Phase = '{phase}',
            @UnitTypeCode='{unitTypeCode}',
            @UnitClassCode='{unitClassCode}',
            @NoOfUnits='{nounits}',
            @ReservationDate='{reservdate}',
            @itemGroupType='{itemgrouptype}'
            "), _ConnectionString);
        }

        public string getAddOnItem(string itemgrouptype, string itemgroup)
        {

            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=22, @ItemGroupType='{itemgrouptype}',@ItemGroup='{itemgroup}'");
        }

        public string getlugAddOnItems()
        {
            return string.Format($"EXEC {spNameAddons} @QueryType=20");
        }

        public string getFinancingType()
        {
            return string.Format($"EXEC {spNameHoldReserve} @QueryType=9");
            // return string.Format($"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=9");
        }

        public string getPaymentType()
        {
            return string.Format($"EXEC {spNameHoldReserve} @QueryType=10");

            //return string.Format($"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=10");
        }

        public double getMonthly(double amt)
        {
            return Parser.ParseDouble(SFObjects.returnText($@"SELECT re.fn_ConvertAmtBasedGH('{amt}')", _ConnectionString));
        }
        public string getClient(string recUser)
        {
            return string.Format($"EXEC [RE].[nsp_PortalReservationEntry_ENH] @QueryType=28,@sellerCode='{recUser}'");
        }
        public string getSourceOfSale()
        {
            return string.Format($"EXEC {spNameHoldReserve} @QueryType=12");

            //return string.Format($"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=12");
        }

        public string getAccountLoc1(string loc)
        {

            return string.Format($"EXEC {spNameHoldReserve} @QueryType=50,@LocwithAccountableForms='{loc}'");

            //return string.Format($"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=50,@LocwithAccountableForms='{loc}'");
        }

        public string getAccountOfficer1(string loc, string AccountLoc, string accountOfficer)
        {
            return string.Format($"EXEC {spNameHoldReserve} @QueryType=51,@LocwithAccountableForms='{loc}',@AcctLoc='{AccountLoc}', @AcctOfficer='{accountOfficer}'");
        }
        public string getAccountOfficer2(string loc, string AccountLoc, string accountOfficer)
        {
            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=51,@LocwithAccountableForms='{loc}',@AcctLoc='{AccountLoc}', @AcctOfficer='{accountOfficer}'");
        }

        public string getPaymentTermGroup(string financingType, string project, string reservDate, double reservAmount, double misc)
        {
            return string.Format($"EXEC [RE].[nsp_HoldforreservationPaymentTermGrouping] @QueryType=0,@financingTypeCode='{financingType}',@projectCode='{project}', @reservDate='{reservDate}',@reservAmount='{reservAmount}',@miscellaneous='{misc}'");
        }
        public string getAccountLoc2(string loc)
        {
            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=50,@LocwithAccountableForms='{loc}'");
        }

        public string getUnitCode_UnitDetails(string Branch, string UnitClass, string Category, string ModelCode, string InventoryGroup, string UnitType, string Phase, string ProductType, string ItemGroupType, string CustomerCode)
        {
            //string sql = string.Format($"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=14,@Branch='{Branch}',@Trantype='{trantype}',@ClientCode='{client}',@ItemGroupType='{itemGroupType}',@Category='{category}',@Phase='{phase}',@UnitType='{unitType}',@UnitClass='{unitClass}'");

            string sql = string.Format($@"select * from re.fn_GetUnitCodeReservation('{Branch}','{UnitClass}','{Category}','{ModelCode}','{InventoryGroup}','{UnitType}','{Phase}','{ProductType}','{ItemGroupType}','{CustomerCode}')");
            return sql;
        }

        public DataTable getUnitCodePortal(string unitCode)
        {
            string sql = $@"EXEC {spPortalreserventry} @queryType=20,@unitCode='{unitCode}'";
            return SFObjects.LoadDataTable(sql, _ConnectionString);
        }

        public string getUnitCode_UnitClass(string UnitClass)
        {
            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=16,@UnitClassCode='{UnitClass}'");
        }

        public string getPaymentCategory()
        {
            //string sql = $"EXEC [RE].[nsp_HoldforReservationEntry] @QueryType=18,@Branch='{branch}',@Phase='{phase}',@FinancingType='{ft}',@IsReserved={isRserved}";
            //return sql;
            string sql = $"EXEC {spNameHoldReserve} @QueryType=18";
            return sql;
        }


        public string getDiscount(
            //string branch,string discountType
            )
        {
            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=24");
        }
        public string getMiscellaneous(string branch, string trantype)
        {
            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=25,@Branch='{branch}',@Trantype='{trantype}'");
        }

        public string getMiscellaneousType()
        {
            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=26");
        }

        public string getFreebiesItemCode(string branch)
        {
            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=27,@Branch='{branch}'");
        }

        public string getFreebiesReceiverType()
        {
            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=28");
        }

        public string getFreebiesReceiver(string type)
        {
            return string.Format($"EXEC {spNameHoldReserve} @QueryType=29,@ReceiverType='{type}'");
        }

        public string getCoBuyer(string branch, string client)
        {
            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=37,@Branch='{branch}',@ClientCode='{client}'");
        }

        public string getStatementCode(string insuranceCompany)
        {
            return string.Format($"EXEC {spNameHoldReserve} @QueryType=40,@InsuranceCompanyCode='{insuranceCompany}'");
        }
        public string getCitizenship()
        {
            return string.Format($"EXEC {spNameHoldReserve} @QueryType=38");
        }

        public string getRelationshipToTheApplicant()
        {
            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=39");
        }


        public string getAgent()
        {
            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=7");
        }

        public DataTable getAgent2(string code)
        {
            return SFObjects.LoadDataTable($"EXEC {spNameHoldReserve}  @QueryType=45, @sellerCode='{code}'", _ConnectionString);
        }

        public string checkLocForm(string Recuser, string Trantype)
        {
            return SFObjects.returnText($"EXEC {spNameHoldReserve}  @QueryType=4 ,@Recuser='{Recuser}',@Trantype='{Trantype}'", _ConnectionString);
        }

        public string getCompany()
        {
            return SFObjects.returnText($"SELECT top 1 CompanyCode FROM SG.BIRCASConfig", _ConnectionString);
        }

        public string checkReservationDoc(string TransactionNo, string Trantype)
        {
            return SFObjects.returnText($"EXEC {spNameHoldReserve}  @QueryType=42 ,@TransactionNo='{TransactionNo}',@Trantype='{Trantype}'", _ConnectionString);
        }

        public string getPMT(double tcp, double balRate, double interestRate)
        {
            return SFObjects.returnText($"select RE.PMT('{tcp}','{balRate}','{interestRate}')", _ConnectionString);
        }

        public DataTable getTermPeriod(string code)
        {
            return SFObjects.LoadDataTable($"SELECT TermPeriod,AnnualRate,PenaltyRate,TotalNoPayments FROM re.paymentterm WHERE Code='{code}'", _ConnectionString);

        }

        public DataTable GetLvl(string combineId)
        {
            return SFObjects.LoadDataTable($@"DECLARE @unitcode VARCHAR(MAX)
DECLARE @lvl TABLE
(
	Lvl1 VARCHAR(max),
	Lvl2 VARCHAR(max),
	Lvl3 VARCHAR(max),
	Lvl4 VARCHAR(max),
	Lvl5 VARCHAR(max),
	Lvl6 VARCHAR(max),
	Lvl7 VARCHAR(max),
	Lvl8 VARCHAR(max),
	Lvl9 VARCHAR(max),
	Lvl10 VARCHAR(max)
)

INSERT INTO @lvl DEFAULT VALUES 


DECLARE @tbl TABLE
(
	lvl INT,
	value VARCHAR(max)
)

DECLARE @final TABLE
(
	lvl INT,
	value VARCHAR(max)
)

INSERT INTO @tbl
SELECT  DISTINCT * FROM (
SELECT
	row_number() OVER (PARTITION BY code,ItemGroupType ORDER BY lvl) AS lvl,
	value
	from re.UnitInventory
	unpivot
	(
		value
		for [lvl] in (Level1Code,Level2Code,Level3Code,Level4Code,Level5Code,Level6Code,Level7Code,Level8Code,Level9Code,Level10Code)
	) unpiv
	WHERE ISNULL(value,'')<>'' AND 
	status IN (SELECT code FROM sg.LegendStatus WHERE posted=1)
		AND id in ({combineId})
)z
GROUP BY z.lvl,z.value

INSERT INTO @final
SELECT lvl,   value = 
    STUFF((SELECT DISTINCT '' + value
           FROM @tbl b 
           WHERE b.lvl = a.lvl 
          FOR XML PATH('')), 1, 0, '')
FROM @tbl a
GROUP BY lvl

UPDATE a 
SET 
lvl1=(SELECT value FROM @final WHERE lvl=1),
lvl2=(SELECT VALUE FROM @final WHERE lvl=2),
lvl3=(SELECT VALUE FROM @final WHERE lvl=3),
lvl4=(SELECT VALUE FROM @final WHERE lvl=4),
lvl5=(SELECT VALUE FROM @final WHERE lvl=5),
lvl6=(SELECT VALUE FROM @final WHERE lvl=6),
lvl7=(SELECT VALUE FROM @final WHERE lvl=7),
lvl8=(SELECT VALUE FROM @final WHERE lvl=8),
lvl9=(SELECT VALUE FROM @final WHERE lvl=9),
lvl10=(SELECT VALUE FROM @final WHERE lvl=10)
FROM @lvl a


SELECT * FROM @lvl
        ", _ConnectionString);
        }
        public string getCombinationOfUnitCode(string combineId)
        {
            return SFObjects.returnText($@"DECLARE @unitcode VARCHAR(MAX)=''
		DECLARE @tbl TABLE
		(
			lvl INT,
			value VARCHAR(30)
		)

		INSERT INTO @tbl
		SELECT  * FROM (
		SELECT
			row_number() OVER (PARTITION BY code,ItemGroupType ORDER BY lvl) AS lvl,
			value
			from re.UnitInventory
			unpivot
			(
			  value
			  for [lvl] in (Level1Code,Level2Code,Level3Code,Level4Code,Level5Code,Level6Code,Level7Code,Level8Code,Level9Code,Level10Code)
			) unpiv
			WHERE ISNULL(value,'')<>'' AND 
			status IN (SELECT code FROM sg.LegendStatus WHERE posted=1)
			 AND id in ({combineId})
		)z
		GROUP BY z.lvl,z.value


		
		DECLARE @ctr int
		SET @ctr=(SELECT lvl FROM @tbl
		GROUP BY lvl
		HAVING COUNT(lvl)>1)


		IF(ISNULL(@ctr,0)!=0)
		BEGIN
		SET @unitcode+=(SELECT distinct REPLACE((STUFF((SELECT '-' + value
								 FROM @tbl AS a2
								 --WHERE a2.ID = a.ID
								 WHERE a2.lvl!=@ctr
								 ORDER BY a.lvl
								 FOR XML PATH('')),1,1,'')), ' ', '')
							  FROM @tbl AS a
		WHERE lvl!=@ctr)

		SET @unitcode+='-'+(SELECT distinct REPLACE((STUFF((SELECT  ''+ value
								 FROM @tbl AS a2
								 --WHERE a2.ID = a.ID
								 WHERE a2.lvl=@ctr
								 ORDER BY a.lvl
								 FOR XML PATH('')),1,1,'')), ' ', '')
							  FROM @tbl AS a
		WHERE lvl=@ctr)
		END
		ELSE
		BEGIN
			SET @unitcode=(SELECT distinct REPLACE((STUFF((SELECT '-' + value
			FROM @tbl AS a2
			ORDER BY a.lvl
			FOR XML PATH('')),1,1,'')), ' ', '')
			FROM @tbl AS a)
		END

		SELECT @unitcode
        ", _ConnectionString);
        }

        public string GetBalanceDate(string dpStartDate, string totalNoOfPayment)
        {
            return SFObjects.returnText($"select [RE].[fn_GetBalanceDateReservationEntry]('{dpStartDate}',{totalNoOfPayment})", _ConnectionString);
        }

        public string GetDPStartDate(string reservdate)
        {
            return SFObjects.returnText($"EXEC {spNameHoldReserve}  @Reservation='{reservdate}',@QueryType=44", _ConnectionString);
        }

        public string getAmortStartDateDP(string reservDate)
        {
            return SFObjects.returnText($"select [RE].[fn_DPAmortStartDay]('{reservDate}')", _ConnectionString);
        }

        public string checkUnitCapacity(string code)
        {
            return SFObjects.returnText($"EXEC {spNameHoldReserve}  @Code='{code}',@QueryType=48", _ConnectionString);
        }

        public string GetEndDate(string StartDate, string totalNoOfPayment)
        {
            return SFObjects.returnText($"select [RE].[fn_GetEndDate]('{StartDate}',{totalNoOfPayment})", _ConnectionString);
        }

        public DataTable GetDiscountCeilingRate(string branch, string category)
        {
            return SFObjects.LoadDataTable($"EXEC {spNameHoldReserve}  @QueryType=23 ,@Branch='{branch}',@Category='{category}'", _ConnectionString);
        }

        public DataTable GetVatLimit(string itemgrouptype)
        {
            return SFObjects.LoadDataTable($"EXEC {spNameHoldReserve} ] @QueryType=21 ,@ItemGroupType='{itemgrouptype}'", _ConnectionString);
        }
        public DataTable getLocFormDefault(string Recuser, string Trantype)
        {
            return SFObjects.LoadDataTable($"SELECT [LocForm Code] as Code,[LocForm Description] as Description FROM re.fn_DefaultLocation('{Recuser}','{Trantype}',0)", _ConnectionString);
        }

        public DataTable GetStartAmortDate()
        {
            return SFObjects.LoadDataTable($"EXEC {spNameHoldReserve}  @QueryType=20", _ConnectionString);
        }


        public string LISTINGQUERY()
        {
            return string.Format(@"SELECT * FROM [RE].[fn_InventoryClass_Listing]()");
        }

        public DataTable GetUnitDetailsTab(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC [PRt].[nsp_HoldforReservationEntryLIN] @QueryType=0,@TransactionNo='{docno}'", _ConnectionString);
        }

        public DataTable GetPaymentTermDetailsTab(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC {spNamePayTermDTL} @QueryType=0,@TransactionNo='{docno}'", _ConnectionString);
        }

        public DataTable GetAddonTab(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC {spNameAddons} @QueryType=0,@TransactionNo='{docno}'", _ConnectionString);
        }
        public DataTable GetDiscountTab(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC {spNameDiscount} @QueryType=0,@TransactionNo='{docno}'", _ConnectionString);
        }

        public DataTable GetMiscellaneousTab(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC [RE].[nsp_HoldforReservationMiscellaneous] @QueryType=0,@TransactionNo='{docno}'", _ConnectionString);
        }
        public DataTable GetCoBuyerDetail(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC {spNameCoBuyer} @QueryType=4,@TransactionNo='{docno}'", _ConnectionString);
        }

        public DataTable getCoBuyerAll(string customerCode)
        {
            return SFObjects.LoadDataTable(string.Format($"EXEC {spNameHoldReserve}  @QueryType=63,@ClientCode='{customerCode}'"), _ConnectionString);
        }

        public DataTable GetFreebies(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC [RE].[nsp_HoldforReservationFreebies] @QueryType=0,@TransactionNo='{docno}'", _ConnectionString);
        }

        public DataTable GetInsuranceLin(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC [RE].[nsp_HoldforReservationInsuranceLin] @QueryType=0,@TransactionNo='{docno}'", _ConnectionString);
        }

        public DataTable GetStatementDetails(string docno)
        {
            return SFObjects.LoadDataTable($"EXEC [RE].[nsp_HoldforReservationInsuranceLin] @QueryType=5,@TransactionNo='{docno}'", _ConnectionString);
        }

        public DataTable GetStatementDefault(string InsuranceCompanyCode)
        {
            return SFObjects.LoadDataTable($"EXEC {spNameHoldReserve}  @QueryType=40,@InsuranceCompanyCode='{InsuranceCompanyCode}'", _ConnectionString);
        }

        public string GetFileServerPath()
        {

            string sql = @"SELECT Value + '\' FROM dbo.SystemConfig WHERE Code = 'FILE_SERVER'";

            return SFObjects.returnText(sql, _ConnectionString);

        }

        public DateTime GetServerDateTime()
        {
            return SFObjects.GetServerDateTime(_ConnectionString);
        }

        public string getFullName(string empCode, string distributor)
        {

            string sql = string.Format(@"select LastName + ', ' + FirstName + ' ' + MiddleName from drm.DistributorContacts
                                        where EmployeeCode = '{0}' and Code = {1}", empCode, distributor);

            return SFObjects.returnText(sql, _ConnectionString);
        }

        public string getName(string recUser)
        {
            return SFObjects.returnText($"EXEC {spPortalreserventry} @recuser='{recUser}',@queryType=29", _ConnectionString);
        }


        public string GetFileServerURL()
        {
            string sql = "SELECT Value + '/Printing/' FROM dbo.SystemConfig WHERE Code = 'Server_Link'";

            return SFObjects.returnText(sql, _ConnectionString);
        }

        public string CheckUserApprovalMatrix(string branch, string trantype)
        {
            return SFObjects.returnText(string.Format(@"EXEC [SG].[nsp_GetUserApproverAssignment] @trantype='{0}',@loc='{1}',@amount=0,@QueryType=1", trantype, branch), _ConnectionString);
        }

        public string CheckIfRequiredAgent(string salessource)
        {
            return SFObjects.returnText(string.Format(@"EXEC {1} @QueryType=47,@SourceOfSale='{0}'", salessource, spNameHoldReserve), _ConnectionString);
        }

        public DataTable GetTermPeriod(string recuser)
        {
            return SFObjects.LoadDataTable(string.Format(@"EXEC {1} @QueryType=49,@Recuser='{0}'", recuser, spNameHoldReserve), _ConnectionString);
        }

        public DateTime GetExpirationDate(string ReservationDate, double ExpirationPeriod)
        {
            return DateTime.Parse(SFObjects.returnText(string.Format(@"SELECT RE.GetDefaultExpirationDate('{0}','{1}')", ReservationDate, ExpirationPeriod), _ConnectionString));
        }

        public double GetExpirationPeriod(string trantype, string projectCode, string locForm, string custClassCode)
        {
            string sql = $@"EXEc re.nsp_PortalReservationEntry_ENH @queryType=26,@tranType='{trantype}',@project='{projectCode}',@locForm='{locForm}',@custClassCode='{custClassCode}'";
            return Parser.ParseDouble(SFObjects.returnText(sql, _ConnectionString));
        }

        public DataTable getDefaultSourceOfSale(string recuser)
        {
            return SFObjects.LoadDataTable($@"EXEc {spPortalreserventry} @queryType=27,@sellerCode='{recuser}'", _ConnectionString);
        }


        public DataTable GetUserApproverUnitInventory(string Trantype, string Loc, string ID)
        {
            if ("1" == SFObjects.returnText(string.Format(@"SELECT 1 FROM RE.ReservationApprover WHERE id='{0}'", ID), _ConnectionString))
            {
                return SFObjects.LoadDataTable(string.Format(@"SELECT [Level],ApproverCode,b.Description FROM  [RE].[ReservationApprover] a
                JOIN sg.employee b ON a.ApproverCode=b.Code
                WHERE a.id='{0}'", ID), _ConnectionString);
            }
            else
            {
                return SFObjects.LoadDataTable(string.Format(@"EXEC [SG].[nsp_GetUserApproverAssignment] @trantype='{0}',@loc='{1}',@amount=0,@QueryType=2", Trantype, Loc), _ConnectionString);
            }
        }

        public DataTable GetDefaultMCF(string branch, string trantype)
        {
            return SFObjects.LoadDataTable($"select * from [RE].[fn_GetDefaultMCF]('{branch}','{trantype}')", _ConnectionString);
        }

        public DataTable GetLogo(string Code)
        {
            return SFObjects.LoadDataTable("SELECT Logo FROM [SG].[LOCACCOUNTLOGOASSIGN] WHERE Code = '" + Code + "'",
                _ConnectionString);

        }
        public int CheckingofDateOfBirth(string DOB)
        {
            int result = 0;
            result = Parser.ParseInt(SFObjects.returnText($@"SELECT DATEDIFF(YEAR,'{DOB}',GETDATE())", _ConnectionString));
            return result;
        }

        public string getPaymentTerm(string financingType, string unitCode, string paymentCategory, double GrossSellingPrice)
        {
            string sql = $@"EXEC re.nsp_PortalGetPaymentTerm @FinancingType='{financingType}',
                @UnitCode='{unitCode}',
                @PaymentCategory='{paymentCategory}',
                @GrossSellingPrice='{GrossSellingPrice}'
                ";
            return sql;
        }

        public DataTable GetPaymentType()
        {
            return SFObjects.LoadDataTable("SELECT * FROM re.fn_GetPaymentType()", _ConnectionString);
        }


        public DataTable GetBearing()
        {
            return SFObjects.LoadDataTable("SELECT * FROM re.fn_GetBearing()", _ConnectionString);
        }

        public DataTable GetPaymentTermDetailsCategory(string recuser)
        {
            return SFObjects.LoadDataTable($"SELECT * FROM re.fn_GetPaymentTermDetailsCategory('{recuser}')", _ConnectionString);
        }

        public string getApproverCode(string locForm, string level)
        {
            return $"EXEC {spNameHoldReserve}  @QueryType=64, @LocwithAccountableForms = '{locForm}',@ApprovalLevel  = '{level}'";
        }

        public string getPaymentDetailsPaymentMethod()
        {
            return $"EXEC re.nsp_holdforreservationPaymentDetails @QueryType = 21";
        }

        public string getPaymentDetailsModeOfPayment()
        {
            return $"EXEC re.nsp_holdforreservationPaymentDetails @QueryType = 22";
        }

        public string getPaymentDetailsCurrency(string locFormCode)
        {
            return $"EXEC re.nsp_holdforreservationPaymentDetails @QueryType = 23,@locFormCode='{locFormCode}'";
        }

        public string getPaymentDetailsCardType()
        {
            return $"EXEC re.nsp_holdforreservationPaymentDetails @QueryType = 26";
        }

        public string getPaymentDetailsPaymentCenter()
        {
            return $"EXEC re.nsp_holdforreservationPaymentDetails @QueryType = 24";
        }

        public string getBank()
        {
            return $"EXEC re.nsp_holdforreservationPaymentDetails @QueryType = 25";
        }

        public string getAccountNo()
        {
            return $"EXEC re.nsp_holdforreservationPaymentDetailsAttachment @QueryType = 20";
        }
        public string SaveApproverData(DataTable dt)
        {

            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandText = spNameHoldReserve;
                cmd.Parameters.AddWithValue("@TransactionNo", dt.Rows[0]["ID"]);
                cmd.Parameters.AddWithValue("@QueryType", 65);
                cmd.ExecuteNonQuery();
                //cmdList.Add(cmd);

                foreach (DataRow drApproverList in dt.Rows)
                {
                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn;
                    cmd.Parameters.Clear();
                    cmd.CommandText = spNameHoldReserve;
                    cmd.Parameters.AddWithValue("@TransactionNo", drApproverList["ID"]);
                    cmd.Parameters.AddWithValue("@ApprovalLevel", drApproverList["Level"]);
                    cmd.Parameters.AddWithValue("@Approver", drApproverList["ApproverCode"]);
                    cmd.Parameters.AddWithValue("@QueryType", 66);
                    cmd.ExecuteNonQuery();
                    //cmdList.Add(cmd);
                }
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Error [{0}]: \nSystem Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("Error [{0}]: \nSystem Cannot perform action.\nData currently in use.", sqlEx.Number);
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
            return "Saved successfully";

            //return base.ExecProcedure(cmdList, _ConnectionString);
        }

        public DataTable LoadSchemaApprover()
        {
            return SFObjects.LoadDataTable(@"SELECT ID, Level, ApproverCode  
                                            FROM [RE].[ReservationApprover] WHERE 1 <> 1", _ConnectionString);
        }

        public DataTable getAmortById(string docno)
        {
            return SFObjects.LoadDataTable($@"EXEC [RE].[nsp_HoldforReservationEntry_Amortization] @QueryType=0,@TransactionNo='{docno}'", _ConnectionString);
        }

        public DataTable GetAmortization(
            string reservStartDate,
            string reservEndDate,
            double reservation,
            double reservMonthlyMisc,
            string reservMiscDate,
            int reservMiscType,
            int reservAllocationType,
            double reservPMT,
            double reservMonthly,
            string dpStartDate1, string dpEndDate1, double dpMonthly1, int dpTermInMonths1, double dpInterest1, double dpMonthlyMisc1, string dpMiscDate1, int dpMiscType1, int dpAllocationType1, double dpPMT1, double dpAmortized1,
            string dpStartDate2, string dpEndDate2, double dpMonthly2, int dpTermInMonths2, double dpInterest2, double dpMonthlyMisc2, string dpMiscDate2, int dpMiscType2, int dpAllocationType2, double dpPMT2, double dpAmortized2,
            string dpStartDate3, string dpEndDate3, double dpMonthly3, int dpTermInMonths3, double dpInterest3, double dpMonthlyMisc3, string dpMiscDate3, int dpMiscType3, int dpAllocationType3, double dpPMT3, double dpAmortized3,
            string dpStartDate4, string dpEndDate4, double dpMonthly4, int dpTermInMonths4, double dpInterest4, double dpMonthlyMisc4, string dpMiscDate4, int dpMiscType4, int dpAllocationType4, double dpPMT4, double dpAmortized4,

            string dpStartDate5, string dpEndDate5, double dpMonthly5, int dpTermInMonths5, double dpInterest5, double dpMonthlyMisc5, string dpMiscDate5, int dpMiscType5, int dpAllocationType5, double dpPMT5, double dpAmortized5,
            string dpStartDate6, string dpEndDate6, double dpMonthly6, int dpTermInMonths6, double dpInterest6, double dpMonthlyMisc6, string dpMiscDate6, int dpMiscType6, int dpAllocationType6, double dpPMT6, double dpAmortized6,
            string dpStartDate7, string dpEndDate7, double dpMonthly7, int dpTermInMonths7, double dpInterest7, double dpMonthlyMisc7, string dpMiscDate7, int dpMiscType7, int dpAllocationType7, double dpPMT7, double dpAmortized7,
            string dpStartDate8, string dpEndDate8, double dpMonthly8, int dpTermInMonths8, double dpInterest8, double dpMonthlyMisc8, string dpMiscDate8, int dpMiscType8, int dpAllocationType8, double dpPMT8, double dpAmortized8,
            string dpStartDate9, string dpEndDate9, double dpMonthly9, int dpTermInMonths9, double dpInterest9, double dpMonthlyMisc9, string dpMiscDate9, int dpMiscType9, int dpAllocationType9, double dpPMT9, double dpAmortized9,
            string dpStartDate10, string dpEndDate10, double dpMonthly10, int dpTermInMonths10, double dpInterest10, double dpMonthlyMisc10, string dpMiscDate10, int dpMiscType10, int dpAllocationType10, double dpPMT10, double dpAmortized10,
            string dpStartDate11, string dpEndDate11, double dpMonthly11, int dpTermInMonths11, double dpInterest11, double dpMonthlyMisc11, string dpMiscDate11, int dpMiscType11, int dpAllocationType11, double dpPMT11, double dpAmortized11,
            string dpStartDate12, string dpEndDate12, double dpMonthly12, int dpTermInMonths12, double dpInterest12, double dpMonthlyMisc12, string dpMiscDate12, int dpMiscType12, int dpAllocationType12, double dpPMT12, double dpAmortized12,
            string dpStartDate13, string dpEndDate13, double dpMonthly13, int dpTermInMonths13, double dpInterest13, double dpMonthlyMisc13, string dpMiscDate13, int dpMiscType13, int dpAllocationType13, double dpPMT13, double dpAmortized13,
            string dpStartDate14, string dpEndDate14, double dpMonthly14, int dpTermInMonths14, double dpInterest14, double dpMonthlyMisc14, string dpMiscDate14, int dpMiscType14, int dpAllocationType14, double dpPMT14, double dpAmortized14,
            string dpStartDate15, string dpEndDate15, double dpMonthly15, int dpTermInMonths15, double dpInterest15, double dpMonthlyMisc15, string dpMiscDate15, int dpMiscType15, int dpAllocationType15, double dpPMT15, double dpAmortized15,
            string dpStartDate16, string dpEndDate16, double dpMonthly16, int dpTermInMonths16, double dpInterest16, double dpMonthlyMisc16, string dpMiscDate16, int dpMiscType16, int dpAllocationType16, double dpPMT16, double dpAmortized16,
            string dpStartDate17, string dpEndDate17, double dpMonthly17, int dpTermInMonths17, double dpInterest17, double dpMonthlyMisc17, string dpMiscDate17, int dpMiscType17, int dpAllocationType17, double dpPMT17, double dpAmortized17,
            string dpStartDate18, string dpEndDate18, double dpMonthly18, int dpTermInMonths18, double dpInterest18, double dpMonthlyMisc18, string dpMiscDate18, int dpMiscType18, int dpAllocationType18, double dpPMT18, double dpAmortized18,
            string dpStartDate19, string dpEndDate19, double dpMonthly19, int dpTermInMonths19, double dpInterest19, double dpMonthlyMisc19, string dpMiscDate19, int dpMiscType19, int dpAllocationType19, double dpPMT19, double dpAmortized19,
            string dpStartDate20, string dpEndDate20, double dpMonthly20, int dpTermInMonths20, double dpInterest20, double dpMonthlyMisc20, string dpMiscDate20, int dpMiscType20, int dpAllocationType20, double dpPMT20, double dpAmortized20,


            string balStartDate1, string balEndDate1, double balMonthly1, int balTermInMonths1, double balInterest1, double balMonthlyMisc1, string balMiscDate1, int balMiscType1, int balAllocationType1, double balPMT1, double balAmortized1,
            string balStartDate2, string balEndDate2, double balMonthly2, int balTermInMonths2, double balInterest2, double balMonthlyMisc2, string balMiscDate2, int balMiscType2, int balAllocationType2, double balPMT2, double balAmortized2,
            string balStartDate3, string balEndDate3, double balMonthly3, int balTermInMonths3, double balInterest3, double balMonthlyMisc3, string balMiscDate3, int balMiscType3, int balAllocationType3, double balPMT3, double balAmortized3,
            string balStartDate4, string balEndDate4, double balMonthly4, int balTermInMonths4, double balInterest4, double balMonthlyMisc4, string balMiscDate4, int balMiscType4, int balAllocationType4, double balPMT4, double balAmortized4,

            string spotStartDate, string spotEndDate, double spotMonthly, int spotTermInMonths, double spotInterest, double spotMonthlyMisc, string spotMiscDate, int spotMiscType, int spotAllocationType, double spotPMT,
            string spotStartDate2, string spotEndDate2, double spotMonthly2, int spotTermInMonths2, double spotInterest2, double spotMonthlyMisc2, string spotMiscDate2, int spotMiscType2, int spotAllocationType2, double spotPMT2,
            string spotStartDate3, string spotEndDate3, double spotMonthly3, int spotTermInMonths3, double spotInterest3, double spotMonthlyMisc3, string spotMiscDate3, int spotMiscType3, int spotAllocationType3, double spotPMT3,
            string spotStartDate4, string spotEndDate4, double spotMonthly4, int spotTermInMonths4, double spotInterest4, double spotMonthlyMisc4, string spotMiscDate4, int spotMiscType4, int spotAllocationType4, double spotPMT4,

            double vatrate, int fixedInterest, string financingTypeCode, double misc, double netLotUnitPrice, double ntcp,
            string recuser,
            double stdLotUP
            //,int discounttag,double discount
            )
        {
            string sql = $@"EXEC [RE].[nsp_GenerateAmortization]
            @RESRVStartDate = '{reservStartDate}',
            @RESRVEndDate = '{reservEndDate}',
            @Reservation = '{reservation}',
            @ReservMonthly='{reservMonthly}',
            @ReservMonthlyMisc='{reservMonthlyMisc}',
            @ReservMiscDate='{reservMiscDate}',
            @ReservMiscType='{reservMiscType}',
            @ReservAllocationType='{reservAllocationType}',
            @ReservTotalMonthly='{reservPMT}',
            

            @DPStartDate1 = '{dpStartDate1}',
            @DPEndDate1 = '{dpEndDate1}',
            @DPmonthly1 = '{dpMonthly1}',
            @DPTermInMonths1 = '{dpTermInMonths1}',
            @DpInterest1 = '{dpInterest1}',
            @DPMonthlyMisc1 = '{dpMonthlyMisc1}',
            @DpMiscDate1 = '{dpMiscDate1}',
            @DpMiscType1 = '{dpMiscType1}',
            @DpAllocationType1='{dpAllocationType1}',
            @DpTotalMonthly1='{dpPMT1}',
            @DPAmortized1='{dpAmortized1}',

            @DPStartDate2 = '{dpStartDate2}',
            @DPEndDate2 = '{dpEndDate2}',
            @DPmonthly2 = '{dpMonthly2}',
            @DPTermInMonths2 = '{dpTermInMonths2}',
            @DpInterest2 = '{dpInterest2}',
            @DPMonthlyMisc2 = '{dpMonthlyMisc2}',
            @DpMiscDate2 = '{dpMiscDate2}',
            @DpMiscType2 = '{dpMiscType2}',
            @DpAllocationType2='{dpAllocationType2}',
            @DpTotalMonthly2='{dpPMT2}',
            @DPAmortized2='{dpAmortized2}',

            @DPStartDate3 = '{dpStartDate3}',
            @DPEndDate3 = '{dpEndDate3}',
            @DPmonthly3 = '{dpMonthly3}',
            @DPTermInMonths3 = '{dpTermInMonths3}',
            @DpInterest3 = '{dpInterest3}',
            @DPMonthlyMisc3 = '{dpMonthlyMisc3}',
            @DpMiscDate3 = '{dpMiscDate3}',
            @DpMiscType3 = '{dpMiscType3}',
            @DpAllocationType3='{dpAllocationType3}',
            @DpTotalMonthly3='{dpPMT3}',
            @DPAmortized3='{dpAmortized3}',

            @DPStartDate4 = '{dpStartDate4}',
            @DPEndDate4 = '{dpEndDate4}',
            @DPmonthly4 = '{dpMonthly4}',
            @DPTermInMonths4 = '{dpTermInMonths4}',
            @DpInterest4 = '{dpInterest4}',
            @DPMonthlyMisc4 = '{dpMonthlyMisc4}',
            @DpMiscDate4 = '{dpMiscDate4}',
            @DpMiscType4 = '{dpMiscType4}',
            @DpAllocationType4='{dpAllocationType4}',
            @DpTotalMonthly4='{dpPMT4}',
            @DpAmortized4='{dpAmortized4}',

            @DPStartDate5 = '{dpStartDate5}',
            @DPEndDate5 = '{dpEndDate5}',
            @DPmonthly5 = '{dpMonthly5}',
            @DPTermInMonths5 = '{dpTermInMonths5}',
            @DpInterest5 = '{dpInterest5}',
            @DPMonthlyMisc5 = '{dpMonthlyMisc5}',
            @DpMiscDate5 = '{dpMiscDate5}',
            @DpMiscType5 = '{dpMiscType5}',
            @DpAllocationType5='{dpAllocationType5}',
            @DpTotalMonthly5='{dpPMT5}',
            @DpAmortized5='{dpAmortized5}',

            @DPStartDate6 = '{dpStartDate6}',
            @DPEndDate6 = '{dpEndDate6}',
            @DPmonthly6 = '{dpMonthly6}',
            @DPTermInMonths6 = '{dpTermInMonths6}',
            @DpInterest6 = '{dpInterest6}',
            @DPMonthlyMisc6 = '{dpMonthlyMisc6}',
            @DpMiscDate6 = '{dpMiscDate6}',
            @DpMiscType6 = '{dpMiscType6}',
            @DpAllocationType6='{dpAllocationType6}',
            @DpTotalMonthly6='{dpPMT6}',
            @DpAmortized6='{dpAmortized6}',

            @DPStartDate7 = '{dpStartDate7}',
            @DPEndDate7 = '{dpEndDate7}',
            @DPmonthly7 = '{dpMonthly7}',
            @DPTermInMonths7 = '{dpTermInMonths7}',
            @DpInterest7 = '{dpInterest7}',
            @DPMonthlyMisc7 = '{dpMonthlyMisc7}',
            @DpMiscDate7 = '{dpMiscDate7}',
            @DpMiscType7 = '{dpMiscType7}',
            @DpAllocationType7='{dpAllocationType7}',
            @DpTotalMonthly7='{dpPMT7}',
            @DpAmortized7='{dpAmortized7}',

            @DPStartDate8 = '{dpStartDate8}',
            @DPEndDate8 = '{dpEndDate8}',
            @DPmonthly8 = '{dpMonthly8}',
            @DPTermInMonths8 = '{dpTermInMonths8}',
            @DpInterest8 = '{dpInterest8}',
            @DPMonthlyMisc8 = '{dpMonthlyMisc8}',
            @DpMiscDate8 = '{dpMiscDate8}',
            @DpMiscType8 = '{dpMiscType8}',
            @DpAllocationType8='{dpAllocationType8}',
            @DpTotalMonthly8='{dpPMT8}',
            @DpAmortized8='{dpAmortized8}',
            
            @DPStartDate9 = '{dpStartDate9}',
            @DPEndDate9 = '{dpEndDate9}',
            @DPmonthly9 = '{dpMonthly9}',
            @DPTermInMonths9 = '{dpTermInMonths9}',
            @DpInterest9 = '{dpInterest9}',
            @DPMonthlyMisc9 = '{dpMonthlyMisc9}',
            @DpMiscDate9 = '{dpMiscDate9}',
            @DpMiscType9 = '{dpMiscType9}',
            @DpAllocationType9='{dpAllocationType9}',
            @DpTotalMonthly9='{dpPMT9}',
            @DpAmortized9='{dpAmortized9}',

            @DPStartDate10 = '{dpStartDate10}',
            @DPEndDate10 = '{dpEndDate10}',
            @DPmonthly10 = '{dpMonthly10}',
            @DPTermInMonths10 = '{dpTermInMonths10}',
            @DpInterest10 = '{dpInterest10}',
            @DPMonthlyMisc10 = '{dpMonthlyMisc10}',
            @DpMiscDate10 = '{dpMiscDate10}',
            @DpMiscType10 = '{dpMiscType10}',
            @DpAllocationType10='{dpAllocationType10}',
            @DpTotalMonthly10='{dpPMT10}',
            @DpAmortized10='{dpAmortized10}',

            @DPStartDate11 = '{dpStartDate11}',
            @DPEndDate11 = '{dpEndDate11}',
            @DPmonthly11 = '{dpMonthly11}',
            @DPTermInMonths11 = '{dpTermInMonths11}',
            @DpInterest11 = '{dpInterest11}',
            @DPMonthlyMisc11 = '{dpMonthlyMisc11}',
            @DpMiscDate11 = '{dpMiscDate11}',
            @DpMiscType11 = '{dpMiscType11}',
            @DpAllocationType11='{dpAllocationType11}',
            @DpTotalMonthly11='{dpPMT11}',
            @DpAmortized11='{dpAmortized11}',

            @DPStartDate12 = '{dpStartDate12}',
            @DPEndDate12 = '{dpEndDate12}',
            @DPmonthly12 = '{dpMonthly12}',
            @DPTermInMonths12 = '{dpTermInMonths12}',
            @DpInterest12 = '{dpInterest12}',
            @DPMonthlyMisc12 = '{dpMonthlyMisc12}',
            @DpMiscDate12 = '{dpMiscDate12}',
            @DpMiscType12 = '{dpMiscType12}',
            @DpAllocationType12='{dpAllocationType12}',
            @DpTotalMonthly12='{dpPMT12}',
            @DpAmortized12='{dpAmortized12}',

            @DPStartDate13 = '{dpStartDate13}',
            @DPEndDate13 = '{dpEndDate13}',
            @DPmonthly13 = '{dpMonthly13}',
            @DPTermInMonths13 = '{dpTermInMonths13}',
            @DpInterest13 = '{dpInterest13}',
            @DPMonthlyMisc13 = '{dpMonthlyMisc13}',
            @DpMiscDate13 = '{dpMiscDate13}',
            @DpMiscType13 = '{dpMiscType13}',
            @DpAllocationType13='{dpAllocationType13}',
            @DpTotalMonthly13='{dpPMT13}',
            @DpAmortized13='{dpAmortized13}',

            @DPStartDate14 = '{dpStartDate14}',
            @DPEndDate14 = '{dpEndDate14}',
            @DPmonthly14 = '{dpMonthly14}',
            @DPTermInMonths14 = '{dpTermInMonths14}',
            @DpInterest14 = '{dpInterest14}',
            @DPMonthlyMisc14 = '{dpMonthlyMisc14}',
            @DpMiscDate14 = '{dpMiscDate14}',
            @DpMiscType14 = '{dpMiscType14}',
            @DpAllocationType14='{dpAllocationType14}',
            @DpTotalMonthly14='{dpPMT14}',
            @DpAmortized14='{dpAmortized14}',

            @DPStartDate15 = '{dpStartDate15}',
            @DPEndDate15 = '{dpEndDate15}',
            @DPmonthly15 = '{dpMonthly15}',
            @DPTermInMonths15 = '{dpTermInMonths15}',
            @DpInterest15 = '{dpInterest15}',
            @DPMonthlyMisc15 = '{dpMonthlyMisc15}',
            @DpMiscDate15 = '{dpMiscDate15}',
            @DpMiscType15 = '{dpMiscType15}',
            @DpAllocationType15='{dpAllocationType15}',
            @DpTotalMonthly15='{dpPMT15}',
            @DpAmortized15='{dpAmortized15}',

            @DPStartDate16 = '{dpStartDate16}',
            @DPEndDate16 = '{dpEndDate16}',
            @DPmonthly16 = '{dpMonthly16}',
            @DPTermInMonths16 = '{dpTermInMonths16}',
            @DpInterest16 = '{dpInterest16}',
            @DPMonthlyMisc16 = '{dpMonthlyMisc16}',
            @DpMiscDate16 = '{dpMiscDate16}',
            @DpMiscType16 = '{dpMiscType16}',
            @DpAllocationType16='{dpAllocationType16}',
            @DpTotalMonthly16='{dpPMT16}',
            @DpAmortized16='{dpAmortized16}',

            @DPStartDate17 = '{dpStartDate17}',
            @DPEndDate17 = '{dpEndDate17}',
            @DPmonthly17 = '{dpMonthly17}',
            @DPTermInMonths17 = '{dpTermInMonths17}',
            @DpInterest17 = '{dpInterest17}',
            @DPMonthlyMisc17 = '{dpMonthlyMisc17}',
            @DpMiscDate17 = '{dpMiscDate17}',
            @DpMiscType17 = '{dpMiscType17}',
            @DpAllocationType17='{dpAllocationType17}',
            @DpTotalMonthly17='{dpPMT17}',
            @DpAmortized17='{dpAmortized17}',

            @DPStartDate18 = '{dpStartDate18}',
            @DPEndDate18 = '{dpEndDate18}',
            @DPmonthly18 = '{dpMonthly18}',
            @DPTermInMonths18 = '{dpTermInMonths18}',
            @DpInterest18 = '{dpInterest18}',
            @DPMonthlyMisc18 = '{dpMonthlyMisc18}',
            @DpMiscDate18 = '{dpMiscDate18}',
            @DpMiscType18 = '{dpMiscType18}',
            @DpAllocationType18='{dpAllocationType18}',
            @DpTotalMonthly18='{dpPMT18}',
            @DpAmortized18='{dpAmortized18}',

            @DPStartDate19 = '{dpStartDate19}',
            @DPEndDate19 = '{dpEndDate19}',
            @DPmonthly19 = '{dpMonthly19}',
            @DPTermInMonths19 = '{dpTermInMonths19}',
            @DpInterest19 = '{dpInterest19}',
            @DPMonthlyMisc19 = '{dpMonthlyMisc19}',
            @DpMiscDate19 = '{dpMiscDate19}',
            @DpMiscType19 = '{dpMiscType19}',
            @DpAllocationType19='{dpAllocationType19}',
            @DpTotalMonthly19='{dpPMT19}',
            @DpAmortized19='{dpAmortized19}',

            @DPStartDate20 = '{dpStartDate20}',
            @DPEndDate20 = '{dpEndDate20}',
            @DPmonthly20 = '{dpMonthly20}',
            @DPTermInMonths20 = '{dpTermInMonths20}',
            @DpInterest20 = '{dpInterest20}',
            @DPMonthlyMisc20 = '{dpMonthlyMisc20}',
            @DpMiscDate20 = '{dpMiscDate20}',
            @DpMiscType20 = '{dpMiscType20}',
            @DpAllocationType20='{dpAllocationType20}',
            @DpTotalMonthly20='{dpPMT20}',
            @DpAmortized20='{dpAmortized20}',

            @BalStartDate1 = '{balStartDate1}',
            @BalEndDate1 = '{balEndDate1}',
            @BalMonthly1 = '{balMonthly1}',
            @BalTermInMonths1 = '{balTermInMonths1}',
            @BalInterest1 = '{balInterest1}',
            @BalMonthlyMisc1 = '{balMonthlyMisc1}',
            @BalMiscDate1 = '{balMiscDate1}',
            @BalMiscType1 = '{balMiscType1}',
            @BalAllocationType1='{balAllocationType1}',
            @BalTotalMonthly1='{balPMT1}',
            @BalAmortized1='{balAmortized1}',
            
            @BalStartDate2 = '{balStartDate2}',
            @BalEndDate2 = '{balEndDate2}',
            @BalMonthly2 = '{balMonthly2}',
            @BalTermInMonths2 = '{balTermInMonths2}',
            @BalInterest2 = '{balInterest2}',
            @BalMonthlyMisc2 = '{balMonthlyMisc2}',
            @BalMiscDate2 = '{balMiscDate2}',
            @BalMiscType2 = '{balMiscType2}',
            @BalAllocationType2='{balAllocationType2}',
            @BalTotalMonthly2='{balPMT2}',
            @BalAmortized2='{balAmortized2}',

            @BalStartDate3 = '{balStartDate3}',
            @BalEndDate3 = '{balEndDate3}',
            @BalMonthly3 = '{balMonthly3}',
            @BalTermInMonths3 = '{balTermInMonths3}',
            @BalInterest3 = '{balInterest3}',
            @BalMonthlyMisc3 = '{balMonthlyMisc3}',
            @BalMiscDate3 = '{balMiscDate3}',
            @BalMiscType3 = '{balMiscType3}',
            @BalAllocationType3='{balAllocationType3}',
            @BalTotalMonthly3='{balPMT3}',
            @BalAmortized3='{balAmortized3}',

            @BalStartDate4 = '{balStartDate4}',
            @BalEndDate4 = '{balEndDate4}',
            @BalMonthly4 = '{balMonthly4}',
            @BalTermInMonths4 = '{balTermInMonths4}',
            @BalInterest4 = '{balInterest4}',
            @BalMonthlyMisc4 = '{balMonthlyMisc4}',
            @BalMiscDate4 = '{balMiscDate4}',
            @BalMiscType4 = '{balMiscType4}',
            @BalAllocationType4='{balAllocationType4}',
            @BalTotalMonthly4='{balPMT4}',
            @BalAmortized4='{balAmortized4}',

            @SpotStartDate = '{spotStartDate}',
            @SpotEndDate = '{spotEndDate}',
            @SpotMonthly = '{spotMonthly}',
            @SpotTermInMonths = '{spotTermInMonths}',
            @SpotInterest = '{spotInterest}',
            @SpotMonthlyMisc = '{spotMonthlyMisc}',
            @SpotMiscDate = '{spotMiscDate}',
            @SpotMiscType = '{spotMiscType}',
            @SpotAllocationType='{spotAllocationType}',
            @SpotTotalMonthly='{spotPMT}',

            @SpotStartDate2 = '{spotStartDate2}',
            @SpotEndDate2 = '{spotEndDate2}',
            @SpotMonthly2 = '{spotMonthly2}',
            @SpotTermInMonths2 = '{spotTermInMonths2}',
            @SpotInterest2 = '{spotInterest2}',
            @SpotMonthlyMisc2 = '{spotMonthlyMisc2}',
            @SpotMiscDate2 = '{spotMiscDate2}',
            @SpotMiscType2 = '{spotMiscType2}',
            @SpotAllocationType2='{spotAllocationType2}',
            @SpotTotalMonthly2='{spotPMT2}',

            @SpotStartDate3 = '{spotStartDate3}',
            @SpotEndDate3 = '{spotEndDate3}',
            @SpotMonthly3 = '{spotMonthly3}',
            @SpotTermInMonths3 = '{spotTermInMonths3}',
            @SpotInterest3 = '{spotInterest3}',
            @SpotMonthlyMisc3 = '{spotMonthlyMisc3}',
            @SpotMiscDate3 = '{spotMiscDate3}',
            @SpotMiscType3 = '{spotMiscType3}',
            @SpotAllocationType3='{spotAllocationType3}',
            @SpotTotalMonthly3='{spotPMT3}',

            @SpotStartDate4 = '{spotStartDate4}',
            @SpotEndDate4 = '{spotEndDate4}',
            @SpotMonthly4 = '{spotMonthly4}',
            @SpotTermInMonths4 = '{spotTermInMonths4}',
            @SpotInterest4 = '{spotInterest4}',
            @SpotMonthlyMisc4 = '{spotMonthlyMisc4}',
            @SpotMiscDate4 = '{spotMiscDate4}',
            @SpotMiscType4 = '{spotMiscType4}',
            @SpotAllocationType4='{spotAllocationType4}',
            @SpotTotalMonthly4='{spotPMT4}',

            @vatrate = '{vatrate}',
            @FixedInterest = '{fixedInterest}',
            @FinancingTypeCode = '{financingTypeCode}',
            @MiscMCF = '{misc}',
            @netlotunitprice = '{netLotUnitPrice}',
            @ntcp = '{ntcp}',
            @stdLotUP='{stdLotUP}'
            ";
            //@discount = '{discount}',
            //@discounttag = '{discounttag}'

            /*Ready for Support*/
            sqlConn.ConnectionString = _ConnectionString;
            sqlConn.Open();
            SqlCommand cmd = new SqlCommand();
            cmd.Connection = sqlConn;
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[PRT].[nsp_HoldforReservationEntry_ENH]";
            cmd.Parameters.AddWithValue("@recuser", recuser);
            cmd.Parameters.AddWithValue("@sql", sql);
            cmd.Parameters.AddWithValue("@QueryType", 61);
            cmd.ExecuteNonQuery();
            sqlConn.Close();


            string sql2 = $@"EXEC [PRT].[nsp_HoldforReservationEntry_ENH]
            @QueryType=60,
            @RESRVStartDate='{reservStartDate}',
            @RESRVEndDate='{reservEndDate}',
            @ReservationAmount='{reservation}',
            @ReservMonthly='{reservMonthly}',
            @ReservMonthlyMisc='{reservMonthlyMisc}',
            @ReservMiscDate='{reservMiscDate}',
            @ReservMiscType='{reservMiscType}',
            @ReservAllocationType='{reservAllocationType}',
            @ReservTotalMonthly='{reservPMT}',

            @DPStartDate1='{dpStartDate1}',
            @DPEndDate1='{dpEndDate1}',
            @DPmonthly1='{dpMonthly1}',
            @DPTermInMonths1='{dpTermInMonths1}',
            @DpInterest1='{dpInterest1}',
            @DPMonthlyMisc1='{dpMonthlyMisc1}',
            @DpMiscDate1='{dpMiscDate1}',
            @DpMiscType1='{dpMiscType1}',
            @DpAllocationType1='{dpAllocationType1}',
            @DpTotalMonthly1='{dpPMT1}',
            @DpAmortized1='{dpAmortized1}',

            @DPStartDate2='{dpStartDate2}',
            @DPEndDate2='{dpEndDate2}',
            @DPmonthly2='{dpMonthly2}',
            @DPTermInMonths2='{dpTermInMonths2}',
            @DpInterest2='{dpInterest2}',
            @DPMonthlyMisc2='{dpMonthlyMisc2}',
            @DpMiscDate2='{dpMiscDate2}',
            @DpMiscType2='{dpMiscType2}',
            @DpAllocationType2='{dpAllocationType2}',
            @DpTotalMonthly2='{dpPMT2}',
            @DpAmortized2='{dpAmortized2}',

            @DPStartDate3='{dpStartDate3}',
            @DPEndDate3='{dpEndDate3}',
            @DPmonthly3='{dpMonthly3}',
            @DPTermInMonths3='{dpTermInMonths3}',
            @DpInterest3='{dpInterest3}',
            @DPMonthlyMisc3='{dpMonthlyMisc3}',
            @DpMiscDate3='{dpMiscDate3}',
            @DpMiscType3='{dpMiscType3}',
            @DpAllocationType3='{dpAllocationType3}',
            @DpTotalMonthly3='{dpPMT3}',
            @DpAmortized3='{dpAmortized3}',

            @DPStartDate4='{dpStartDate4}',
            @DPEndDate4='{dpEndDate4}',
            @DPmonthly4='{dpMonthly4}',
            @DPTermInMonths4='{dpTermInMonths4}',
            @DpInterest4='{dpInterest4}',
            @DPMonthlyMisc4='{dpMonthlyMisc4}',
            @DpMiscDate4='{dpMiscDate4}',
            @DpMiscType4='{dpMiscType4}',
            @DpAllocationType4='{dpAllocationType4}',
            @DpTotalMonthly4='{dpPMT4}',
            @DpAmortized4='{dpAmortized4}',

            @DPStartDate5='{dpStartDate5}',
            @DPEndDate5='{dpEndDate5}',
            @DPmonthly5='{dpMonthly5}',
            @DPTermInMonths5='{dpTermInMonths5}',
            @DpInterest5='{dpInterest5}',
            @DPMonthlyMisc5='{dpMonthlyMisc5}',
            @DpMiscDate5='{dpMiscDate5}',
            @DpMiscType5='{dpMiscType5}',
            @DpAllocationType5='{dpAllocationType5}',
            @DpTotalMonthly5='{dpPMT5}',
            @DpAmortized5='{dpAmortized5}',

            @DPStartDate6='{dpStartDate6}',
            @DPEndDate6='{dpEndDate6}',
            @DPmonthly6='{dpMonthly6}',
            @DPTermInMonths6='{dpTermInMonths6}',
            @DpInterest6='{dpInterest6}',
            @DPMonthlyMisc6='{dpMonthlyMisc6}',
            @DpMiscDate6='{dpMiscDate6}',
            @DpMiscType6='{dpMiscType6}',
            @DpAllocationType6='{dpAllocationType6}',
            @DpTotalMonthly6='{dpPMT6}',
            @DpAmortized6='{dpAmortized6}',

            @DPStartDate7='{dpStartDate7}',
            @DPEndDate7='{dpEndDate7}',
            @DPmonthly7='{dpMonthly7}',
            @DPTermInMonths7='{dpTermInMonths7}',
            @DpInterest7='{dpInterest7}',
            @DPMonthlyMisc7='{dpMonthlyMisc7}',
            @DpMiscDate7='{dpMiscDate7}',
            @DpMiscType7='{dpMiscType7}',
            @DpAllocationType7='{dpAllocationType7}',
            @DpTotalMonthly7='{dpPMT7}',
            @DpAmortized7='{dpAmortized7}',

            @DPStartDate8='{dpStartDate8}',
            @DPEndDate8='{dpEndDate8}',
            @DPmonthly8='{dpMonthly8}',
            @DPTermInMonths8='{dpTermInMonths8}',
            @DpInterest8='{dpInterest8}',
            @DPMonthlyMisc8='{dpMonthlyMisc8}',
            @DpMiscDate8='{dpMiscDate8}',
            @DpMiscType8='{dpMiscType8}',
            @DpAllocationType8='{dpAllocationType8}',
            @DpTotalMonthly8='{dpPMT8}',
            @DpAmortized8='{dpAmortized8}',

            @DPStartDate9='{dpStartDate9}',
            @DPEndDate9='{dpEndDate9}',
            @DPmonthly9='{dpMonthly9}',
            @DPTermInMonths9='{dpTermInMonths9}',
            @DpInterest9='{dpInterest9}',
            @DPMonthlyMisc9='{dpMonthlyMisc9}',
            @DpMiscDate9='{dpMiscDate9}',
            @DpMiscType9='{dpMiscType9}',
            @DpAllocationType9='{dpAllocationType9}',
            @DpTotalMonthly9='{dpPMT9}',
            @DpAmortized9='{dpAmortized9}',

            @DPStartDate10='{dpStartDate10}',
            @DPEndDate10='{dpEndDate10}',
            @DPmonthly10='{dpMonthly10}',
            @DPTermInMonths10='{dpTermInMonths10}',
            @DpInterest10='{dpInterest10}',
            @DPMonthlyMisc10='{dpMonthlyMisc10}',
            @DpMiscDate10='{dpMiscDate10}',
            @DpMiscType10='{dpMiscType10}',
            @DpAllocationType10='{dpAllocationType10}',
            @DpTotalMonthly10='{dpPMT10}',
            @DpAmortized10='{dpAmortized10}',

            @DPStartDate11='{dpStartDate11}',
            @DPEndDate11='{dpEndDate11}',
            @DPmonthly11='{dpMonthly11}',
            @DPTermInMonths11='{dpTermInMonths11}',
            @DpInterest11='{dpInterest11}',
            @DPMonthlyMisc11='{dpMonthlyMisc11}',
            @DpMiscDate11='{dpMiscDate11}',
            @DpMiscType11='{dpMiscType11}',
            @DpAllocationType11='{dpAllocationType11}',
            @DpTotalMonthly11='{dpPMT11}',
            @DpAmortized11='{dpAmortized11}',

            @DPStartDate12='{dpStartDate12}',
            @DPEndDate12='{dpEndDate12}',
            @DPmonthly12='{dpMonthly12}',
            @DPTermInMonths12='{dpTermInMonths12}',
            @DpInterest12='{dpInterest12}',
            @DPMonthlyMisc12='{dpMonthlyMisc12}',
            @DpMiscDate12='{dpMiscDate12}',
            @DpMiscType12='{dpMiscType12}',
            @DpAllocationType12='{dpAllocationType12}',
            @DpTotalMonthly12='{dpPMT12}',
            @DpAmortized12='{dpAmortized12}',

            @DPStartDate13='{dpStartDate13}',
            @DPEndDate13='{dpEndDate13}',
            @DPmonthly13='{dpMonthly13}',
            @DPTermInMonths13='{dpTermInMonths13}',
            @DpInterest13='{dpInterest13}',
            @DPMonthlyMisc13='{dpMonthlyMisc13}',
            @DpMiscDate13='{dpMiscDate13}',
            @DpMiscType13='{dpMiscType13}',
            @DpAllocationType13='{dpAllocationType13}',
            @DpTotalMonthly13='{dpPMT13}',
            @DpAmortized13='{dpAmortized13}',

            @DPStartDate14='{dpStartDate14}',
            @DPEndDate14='{dpEndDate14}',
            @DPmonthly14='{dpMonthly14}',
            @DPTermInMonths14='{dpTermInMonths14}',
            @DpInterest14='{dpInterest14}',
            @DPMonthlyMisc14='{dpMonthlyMisc14}',
            @DpMiscDate14='{dpMiscDate14}',
            @DpMiscType14='{dpMiscType14}',
            @DpAllocationType14='{dpAllocationType14}',
            @DpTotalMonthly14='{dpPMT14}',
            @DpAmortized14='{dpAmortized14}',

            @DPStartDate15='{dpStartDate15}',
            @DPEndDate15='{dpEndDate15}',
            @DPmonthly15='{dpMonthly15}',
            @DPTermInMonths15='{dpTermInMonths15}',
            @DpInterest15='{dpInterest15}',
            @DPMonthlyMisc15='{dpMonthlyMisc15}',
            @DpMiscDate15='{dpMiscDate15}',
            @DpMiscType15='{dpMiscType15}',
            @DpAllocationType15='{dpAllocationType15}',
            @DpTotalMonthly15='{dpPMT15}',
            @DpAmortized15='{dpAmortized15}',

            @DPStartDate16='{dpStartDate16}',
            @DPEndDate16='{dpEndDate16}',
            @DPmonthly16='{dpMonthly16}',
            @DPTermInMonths16='{dpTermInMonths16}',
            @DpInterest16='{dpInterest16}',
            @DPMonthlyMisc16='{dpMonthlyMisc16}',
            @DpMiscDate16='{dpMiscDate16}',
            @DpMiscType16='{dpMiscType16}',
            @DpAllocationType16='{dpAllocationType16}',
            @DpTotalMonthly16='{dpPMT16}',
            @DpAmortized16='{dpAmortized16}',

            @DPStartDate17='{dpStartDate17}',
            @DPEndDate17='{dpEndDate17}',
            @DPmonthly17='{dpMonthly17}',
            @DPTermInMonths17='{dpTermInMonths17}',
            @DpInterest17='{dpInterest17}',
            @DPMonthlyMisc17='{dpMonthlyMisc17}',
            @DpMiscDate17='{dpMiscDate17}',
            @DpMiscType17='{dpMiscType17}',
            @DpAllocationType17='{dpAllocationType17}',
            @DpTotalMonthly17='{dpPMT17}',
            @DpAmortized17='{dpAmortized17}',

            @DPStartDate18='{dpStartDate18}',
            @DPEndDate18='{dpEndDate18}',
            @DPmonthly18='{dpMonthly18}',
            @DPTermInMonths18='{dpTermInMonths18}',
            @DpInterest18='{dpInterest18}',
            @DPMonthlyMisc18='{dpMonthlyMisc18}',
            @DpMiscDate18='{dpMiscDate18}',
            @DpMiscType18='{dpMiscType18}',
            @DpAllocationType18='{dpAllocationType18}',
            @DpTotalMonthly18='{dpPMT18}',
            @DpAmortized18='{dpAmortized18}',

            @DPStartDate19='{dpStartDate19}',
            @DPEndDate19='{dpEndDate19}',
            @DPmonthly19='{dpMonthly19}',
            @DPTermInMonths19='{dpTermInMonths19}',
            @DpInterest19='{dpInterest19}',
            @DPMonthlyMisc19='{dpMonthlyMisc19}',
            @DpMiscDate19='{dpMiscDate19}',
            @DpMiscType19='{dpMiscType19}',
            @DpAllocationType19='{dpAllocationType19}',
            @DpTotalMonthly19='{dpPMT19}',
            @DpAmortized19='{dpAmortized19}',

            @DPStartDate20='{dpStartDate20}',
            @DPEndDate20='{dpEndDate20}',
            @DPmonthly20='{dpMonthly20}',
            @DPTermInMonths20='{dpTermInMonths20}',
            @DpInterest20='{dpInterest20}',
            @DPMonthlyMisc20='{dpMonthlyMisc20}',
            @DpMiscDate20='{dpMiscDate20}',
            @DpMiscType20='{dpMiscType20}',
            @DpAllocationType20='{dpAllocationType20}',
            @DpTotalMonthly20='{dpPMT20}',
            @DpAmortized20='{dpAmortized20}',

            @BalStartDate1='{balStartDate1}',
            @BalEndDate1='{balEndDate1}',
            @BalMonthly1='{balMonthly1}',
            @BalTermInMonths1='{balTermInMonths1}',
            @BalInterest1='{balInterest1}',
            @BalMonthlyMisc1='{balMonthlyMisc1}',
            @BalMiscDate1='{balMiscDate1}',
            @BalMiscType1='{balMiscType1}',
            @BalAllocationType1='{balAllocationType1}',
            @BalTotalMonthly1='{balPMT1}',
            @BalAmortized1='{balAmortized1}',
            
            @BalStartDate2='{balStartDate2}',
            @BalEndDate2='{balEndDate2}',
            @BalMonthly2='{balMonthly2}',
            @BalTermInMonths2='{balTermInMonths2}',
            @BalInterest2='{balInterest2}',
            @BalMonthlyMisc2='{balMonthlyMisc2}',
            @BalMiscDate2='{balMiscDate2}',
            @BalMiscType2='{balMiscType2}',
            @BalAllocationType2='{balAllocationType2}',
            @BalTotalMonthly2='{balPMT2}',
            @BalAmortized2='{balAmortized2}',

            @BalStartDate3='{balStartDate3}',
            @BalEndDate3='{balEndDate3}',
            @BalMonthly3='{balMonthly3}',
            @BalTermInMonths3='{balTermInMonths3}',
            @BalInterest3='{balInterest3}',
            @BalMonthlyMisc3='{balMonthlyMisc3}',
            @BalMiscDate3='{balMiscDate3}',
            @BalMiscType3='{balMiscType3}',
            @BalAllocationType3='{balAllocationType3}',
            @BalTotalMonthly3='{balPMT3}',
            @BalAmortized3='{balAmortized3}',

            @BalStartDate4='{balStartDate4}',
            @BalEndDate4='{balEndDate4}',
            @BalMonthly4='{balMonthly4}',
            @BalTermInMonths4='{balTermInMonths4}',
            @BalInterest4='{balInterest4}',
            @BalMonthlyMisc4='{balMonthlyMisc4}',
            @BalMiscDate4='{balMiscDate4}',
            @BalMiscType4='{balMiscType4}',
            @BalAllocationType4='{balAllocationType4}',
            @BalTotalMonthly4='{balPMT4}',
            @BalAmortized4='{balAmortized4}',

            @SpotStartDate='{spotStartDate}',
            @SpotEndDate='{spotEndDate}',
            @SpotMonthly='{spotMonthly}',
            @SpotTermInMonths='{spotTermInMonths}',
            @SpotInterest='{spotInterest}',
            @SpotMonthlyMisc='{spotMonthlyMisc}',
            @SpotMiscDate='{spotMiscDate}',
            @SpotMiscType='{spotMiscType}',
            @SpotAllocationType='{spotAllocationType}',
            @SpotTotalMonthly='{spotPMT}',

            @SpotStartDate2 = '{spotStartDate2}',
            @SpotEndDate2 = '{spotEndDate2}',
            @SpotMonthly2 = '{spotMonthly2}',
            @SpotTermInMonths2 = '{spotTermInMonths2}',
            @SpotInterest2 = '{spotInterest2}',
            @SpotMonthlyMisc2 = '{spotMonthlyMisc2}',
            @SpotMiscDate2 = '{spotMiscDate2}',
            @SpotMiscType2 = '{spotMiscType2}',
            @SpotAllocationType2='{spotAllocationType2}',
            @SpotTotalMonthly2='{spotPMT2}',

            @SpotStartDate3 = '{spotStartDate3}',
            @SpotEndDate3 = '{spotEndDate3}',
            @SpotMonthly3 = '{spotMonthly3}',
            @SpotTermInMonths3 = '{spotTermInMonths3}',
            @SpotInterest3 = '{spotInterest3}',
            @SpotMonthlyMisc3 = '{spotMonthlyMisc3}',
            @SpotMiscDate3 = '{spotMiscDate3}',
            @SpotMiscType3 = '{spotMiscType3}',
            @SpotAllocationType3='{spotAllocationType3}',
            @SpotTotalMonthly3='{spotPMT3}',

            @SpotStartDate4 = '{spotStartDate4}',
            @SpotEndDate4 = '{spotEndDate4}',
            @SpotMonthly4 = '{spotMonthly4}',
            @SpotTermInMonths4 = '{spotTermInMonths4}',
            @SpotInterest4 = '{spotInterest4}',
            @SpotMonthlyMisc4 = '{spotMonthlyMisc4}',
            @SpotMiscDate4 = '{spotMiscDate4}',
            @SpotMiscType4 = '{spotMiscType4}',
            @SpotAllocationType4='{spotAllocationType4}',
            @SpotTotalMonthly4='{spotPMT4}',


            @vatrate='{vatrate}',
            @FixedInterest='{fixedInterest}',
            @FinancingTypeCode='{financingTypeCode}',
            @MiscMCF='{misc}',
            @netlotunitprice='{netLotUnitPrice}',
            @ntcp='{ntcp}',
            @stdLotUP='{stdLotUP}'
            ";
            //@discount='{discount}',
            //@discounttag ='{discounttag}'

            return SFObjects.LoadDataTable(sql2, _ConnectionString);
        }

        #region ifIsUsed

        public int ifIsUsed(string Code)
        {
            return Parser.ParseInt(SFObjects.returnText(string.Format(@"EXEC dbo.nsp_IfIsUsed @Schema = 'SG',
                                                        @Table = 'LocationType', 
                                                        @Code = '{0}', 
                                                        @QueryType = 1", Code), _ConnectionString));
        }

        public string isSpecial(string docno)
        {
            return SFObjects.returnText(string.Format(@"select FORMAT(pmt,'N2') from re.HoldforReservationEntry_Amortization where TransactionNo='{0}' and PaymentCategory='CRPAY'", docno), _ConnectionString);
        }

        #endregion

        public bool isVatTreshHoldExceeds(string itemgrouptype, double amount)
        {
            return Parser.ParseInt(SFObjects.returnText($@"select [RE].[fn_IsVatThresholdExceed]('{itemgrouptype}',{amount})", _ConnectionString)).Equals(1);
        }

        public bool checkIfExists(string unitCode)
        {
            return Parser.ParseInt(SFObjects.returnText($@"exec {spPortalreserventry} @queryType=23,@unitCode='{unitCode}'", _ConnectionString)).Equals(1);
        }

        public int getDiscountBasis()
        {
            return Parser.ParseInt(SFObjects.returnText("exec  [RE].[nsp_HoldforreservationPaymentTermGrouping] @QueryType=2", _ConnectionString));
        }

        public DataTable loadPaymentMethod()
        {
            return SFObjects.LoadDataTable("exec re.nsp_holdforreservationPaymentDetails @queryType=27", _ConnectionString);
        }

        public string Serverlink()
        {
            string value = SFObjects.returnText(@"SELECT [Value] FROM [dbo].[SystemConfig] where [code]='Server_Link'", _ConnectionString);

#if DEBUG
            value = "UploadFiles/";
#endif
            return value;
        }
        public string getUserName(string recuser)
        {
            return SFObjects.returnText($@"select sg.fn_getEmployeeName('{recuser}')", _ConnectionString);
        }
        public string getChecker(string docno)
        {
            return SFObjects.returnText($@"select [RE].[fn_ReservationChecker_ENH]('{docno}')", _ConnectionString);
        }

        public string getRecUserById(string docno)
        {
            return SFObjects.returnText($"EXEC [RE].[nsp_PortalReservationEntry_ENH] @QueryType=30,@transactionNo='{docno}'", _ConnectionString);
        }


        public DataTable validationVal(string unitCode)
        {

            return SFObjects.LoadDataTable($"EXEC {spRefBaseAddOn} @QueryType=20,@UnitCodeHDR='{unitCode}'", _ConnectionString);
        }

        public DataTable getRefBaseAddOnsLoaded(string UnitCode)
        {
            return SFObjects.LoadDataTable($"EXEC {spRefBaseAddOn} @QueryType=21,@UnitCodeHDR='{UnitCode}'", _ConnectionString);
        }

        public DataTable getRefBaseAddOns(string ReservationControlNo, string UnitCode)
        {
            return SFObjects.LoadDataTable($"EXEC {spRefBaseAddOn} @QueryType=0,@ReservationControlNo='{ReservationControlNo}',@UnitCodeHDR='{UnitCode}'", _ConnectionString);
        }



        public string getlugUnitCode_refBased(string UnitCode)
        {
            return string.Format($"EXEC {spRefBaseAddOn} @QueryType=22,@UnitCodeHDR='{UnitCode}'");
        }



        public DataTable getComboSpotDisc(string project)
        {
            return SFObjects.LoadDataTable($"EXEC {spNameHDR} @QueryType=68,@Project='{project}'", _ConnectionString);
        }




        public DataTable getDiscAmount(string project)
        {
            return SFObjects.LoadDataTable($"EXEC {spNameHDR} @QueryType=69,@Project='{project}'", _ConnectionString);
        }


        public string getlugMiscType()
        {
            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=110");
        }


        public string getlugAllocType()
        {
            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=111");
        }



        public string getlugPaymentCategoryMisc(string recuser)
        {
            return string.Format($"EXEC {spNameHoldReserve}  @QueryType=112, @Recuser = '{recuser}'");
        }




        public DataTable LoadHoldforReservationPaymentTermDetailsforAmortization()
        {
            return SFObjects.LoadDataTable("select Category, PaymentTerm, Monthly, StartDate, Interest, PenaltyRate, StartDate, EndDate from re.HoldforReservationPaymentTermDetails where 1<>1", _ConnectionString);
        }




        public string hasSavedRqrdCompli(string docno)
        {

            return SFObjects.returnText($@"SELECT [DC].[fn_ChkIfHasReqComplianceAll]('{docno}')", _ConnectionString);
        }




        public DataTable validateUnitDetails(string unitcode, string docno, double lotarea, double floorarea)
        {
            return SFObjects.LoadDataTable($"EXEC {spNameHDR} @QueryType=70,@unitcode='{unitcode}',@TransactionNo='{docno}',@lotarea='{lotarea}',@floorarea='{floorarea}' ", _ConnectionString);
        }







    }
}