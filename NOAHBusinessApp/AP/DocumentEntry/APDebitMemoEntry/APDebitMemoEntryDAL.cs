using System.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using NoahWebLib;
using NoahWebLib.NoahWebFunction;
using Noah_Web.forms_BusinessLayer;

namespace DALComponent
{
    public class APDebitMemoEntryDAL : NoahWebLib.DatabaseHandler
    {
        nwSFObjects SFObjects = new nwSFObjects();
        APDebitMemoEntryBL BL = new APDebitMemoEntryBL();
        #region STANDARD

        public string MenuItemCode = "APDebitMemoEntry"; // This is default parameter  for version
        public string MenuItemVersion = "10.0.0.9"; // This is default parameter for version
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
                                primaryKey = "AP DM No";                                      //--column for searching

        private string EntryFileProc = "[AP].[nsp_EntryFile]";
        string storedProc = "[AP].[nsp_DebitMemoEntry]";
        string storedProcwRef = "AP.nsp_DebitMemowRef";
        string storedProcwoRef = "AP.nsp_DebitMemowoRef";

        //#FOR EXPORT
        public string LISTINGFILENAME = "AP Debit Memo Entry", GETCOMPANY = "Select CompanyName from SG.BIRCASConfig";
        public int LISTINGSTARTROW = 5;
        //# END


        public string CurrentSelectedItem;                                                 //-- selected item in binding navigator
        private const int
            SPR_LINETYPE = 1,
            SPR_APVNO = 2,
            SPR_REASON = 3,
            SPR_REASONDESC = 4,
            SPR_REASONTYPE = 5,
            SPR_PARTICULARS = 6,
            SPR_PAYEEREFCODE = 7,
            SPR_PAYEEREF = 8,
            SPR_ITEMGROUPTYPE = 9,
            SPR_ITEMGROUPTYPEDESC = 10,
            SPR_ITEMCODE = 11,
            SPR_ITEMDESC = 12,
            SPR_VATCODE = 13,
            SPR_VATDESC = 14,
            SPR_EWTCODE = 15,
            SPR_EWTDESC = 16,
            SPR_APVAMOUNT = 17,
            SPR_OPENAMOUNT = 18,
            SPR_DVAMOUNTVATEX = 19,
            SPR_DVAMOUNT = 20,
            SPR_VAT = 21,
            SPR_EWT = 22,
            SPR_NETAMT = 23,
            SPR_APVDATE = 24,
            SPR_INVOICENO = 25,
            SPR_INVOICEDATE = 26,
            SPR_SEG1 = 27,
            SPR_SEG2 = 28,
            SPR_SEG3 = 29,
            SPR_SEG4 = 30,
            SPR_SEG5 = 31,
            SPR_SEG6 = 32,
            SPR_ACCOUNTDESC = 33,
            SPR_SUBACCOUNT = 34,
            SPR_SUBLEDGERTYPE = 35,
            SPR_SUBSIDIARYLREF = 36,
            SPR_PERIODFROM = 37,
            SPR_PERIODTO = 38,
            SPR_DETAILS = 39,
            SPR_ISSUPPLIER = 40,
            SPR_REQSUBACCOUNT = 41,
            SPR_REQSLTYPE = 42,
            SPR_REQSLREF = 43,
            SPR_REF1 = 44,
            SPR_REF2 = 45,
            SPR_REF3 = 46,
            SPR_REF4 = 47,
            SPR_REF5 = 48,
            SPR_REF6 = 49,
            SPR_REQPERIODTOCOVER = 50,
            SPR_TAXRATE = 51,
            SPR_CLAIMEDPERCENT = 52,
            SPR_APVPCCC = 53,
            SPR_PCCC = 54,
            SPR_EmpSuppTagging = 55,
            SPR_TagTaxEnableDisable = 56,
            SPR_RCTAG = 57,
            SPR_TAXRATE2 = 58;

        private const int
        SPR_without_LINETYPE = 1,
        SPR_without_REASON = 2,
        SPR_without_REASONDESC = 3,
        SPR_without_PARTICULARS = 4,
        SPR_without_PAYEEREF = 5,
        SPR_without_ITEMGROUPTYPE = 6,
        SPR_without_TAXCODE = 7,
        SPR_without_DMAMOUNT = 8,
        SPR_without_DMAMOUNTVATEX = 9,
        SPR_without_SEG1 = 10,
        SPR_without_SEG2 = 11,
        SPR_without_SEG3 = 12,
        SPR_without_SEG4 = 13,
        SPR_without_SEG5 = 14,
        SPR_without_SEG6 = 15,
        SPR_without_ACCOUNTDESC = 16,
        SPR_without_SUBACCOUNT = 17,
        SPR_without_SUBSIDIARYTYPE = 18,
        SPR_without_SUBSIDIARYREF = 19,
        SPR_without_PERIODFROM = 20,
        SPR_without_PERIODTO = 21,
        SPR_without_REF1 = 22,
        SPR_without_REF2 = 23,
        SPR_without_REF3 = 24,
        SPR_without_REF4 = 25,
        SPR_without_REF5 = 26,
        SPR_without_REF6 = 27,
        SPR_without_REQSUBACCOUNT = 28,
        SPR_without_REQSLTYPE = 29,
        SPR_without_REQSLREF = 30,
        SPR_without_PAYEECODE = 31,
        SPR_without_TAXRATE = 32,
        SPR_without_CLAIMEDPERCENT = 33,
        SPR_without_EmpSuppTagging = 34,
        SPR_without_TagTaxEnableDisable = 35,
        SPR_without_APControlAcctCode = 36,
        SPR_without_APControlAcctDesc = 37,
        SPR_without_TAXRATE2 = 38;

        private const int
        SPR_LD_LINETYPE = 1,
        SPR_LD_APVNO = 2,
        SPR_LD_APVDATE = 3,
        SPR_LD_INVOICENO = 4,
        SPR_LD_INVOICEDATE = 5,
        SPR_LD_REASON = 6,
        SPR_LD_REASONDESC = 7,
        SPR_LD_PARTICULARS = 8,
        SPR_LD_PAYEEREF = 9,
        SPR_LD_ITEMGROUPTYPE = 10,
        SPR_LD_TAX = 11,
        SPR_LD_APVAMT = 12,
        SPR_LD_OCYAMMOUNT = 13,
        SPR_LD_OCYAMMOUNTVATEX = 14,
        SPR_LD_SEG1 = 15,
        SPR_LD_SEG2 = 16,
        SPR_LD_SEG3 = 17,
        SPR_LD_SEG4 = 18,
        SPR_LD_SEG5 = 19,
        SPR_LD_SEG6 = 20,
        SPR_LD_ACCOUNTDESCRIPTION = 21,
        SPR_LD_SUBACCOUNT = 22,
        SPR_LD_SUBSIDIARYLEDGERTYPE = 23,
        SPR_LD_SUBSIDIARYLEDGERREF = 24,
        SPR_LD_PERIODFROM = 25,
        SPR_LD_PERIODTO = 26,
        SPR_LD_DETAILS = 27,
        SPR_LD_REF1 = 28,
        SPR_LD_REF2 = 29,
        SPR_LD_REF3 = 30,
        SPR_LD_REF4 = 31,
        SPR_LD_REF5 = 32,
        SPR_LD_REF6 = 33,
        SPR_LD_REQSUBACCOUNT = 34,
        SPR_LD_REQSLTYPE = 35,
        SPR_LD_REQSLREF = 36,
        SPR_LD_REQPERIODTOCOVER = 37,
        SPR_LD_APVROWNO = 38,
        SPR_LD_PAYEEREFCODE = 39,
        SPR_LD_TAXRATE = 40,
        SPR_LD_CLAIMEDPERCENT = 41,
        SPR_LD_TAXRATE2 = 42;

        private const int
            SPR_LDW_REASON = 1,
            SPR_LDW_REASONDESC = 2,
            SPR_LDW_REMARKS = 3,
            SPR_LDW_PAYEEREF = 4,
            SPR_LDW_PAYEEREFNAME = 5,
            SPR_LDW_LINETYPE = 6,
            SPR_LDW_PARTICULARS = 7,
            SPR_LDW_CODE = 8,
            SPR_LDW_ITEMDESC = 9,
            SPR_LDW_UOM = 10,
            SPR_LDW_QUANTITY = 11,
            SPR_LDW_UNITCOST = 12,
            SPR_LDW_OCY = 13,
            SPR_LDW_TAX = 14,
            SPR_LDW_PROFIT = 15,
            SPR_LDW_PROFITDESC = 16,
            SPR_LDW_MAIN = 17,
            SPR_LDW_MAINDESC = 18,
            SPR_LDW_COSTCENTER = 19,
            SPR_LDW_COSTCENTERDESC = 20,
            SPR_LDW_ITEMGROUP = 21,
            SPR_LDW_ITEMGROUPDESC = 22,
            SPR_LDW_ACCOUNTDESC = 23,
            SPR_LDW_SUBACCCOUNT = 24,
            SPR_LDW_SUBSIDIARYLTYPE = 25,
            SPR_LDW_SUBSIDIARYREF = 26,
            SPR_LDW_PERIODFROM = 27,
            SPR_LDW_PERIODTO = 28,
            SPR_LDW_DECIMALPLACE = 29,
            SPR_LDW_REQSUBACCOUNT = 30,
            SPR_LDW_REQSLTYPE = 31,
            SPR_LDW_REQPERIODTOCOVER = 32;



        private const int
                SPR_TOTAL_APVNO = 1,
                SPR_TOTAL_REASON = 2,
                SPR_TOTAL_REASONDESC = 3,
                SPR_TOTAL_REMARKS = 4,
                SPR_TOTAL_APVDATE = 5,
                SPR_TOTAL_INVOICE = 6,
                SPR_TOTAL_INVOICEDATE = 7,
                SPR_TOTAL_AMTDUE = 8,
                SPR_TOTAL_DPADV = 9,
                SPR_TOTAL_DMAPP = 10,
                SPR_TOTAL_RETENTION = 11,
                SPR_TOTAL_NETAMT = 12,
                SPR_TOTAL_DETAILS = 13,
                SPR_TOTAL_REASONTYPE = 14,
                SPR_TOTAL_RCTAG = 15;

        int SPR3_Checkbox = 1,
            SPR3_APVNO = 2,
            SPR3_ValueDate = 3,
            SPR3_PayeeCode = 4,
            SPR3_PayeeName = 5;

        private const int
            SPR_APPROVALLEVEL = 1,
            SPR_APPROVALCODE = 2,
            SPR_APPROVALNAME = 3,
            SPR_APPROVALTYPE = 4;

        public APDebitMemoEntryDAL(string ConnectionString, string ConnectionString2, string selectedItem)
        {
            _ConnectionString = ConnectionString;
            _ConnectionString2 = ConnectionString2;
            this.CurrentSelectedItem = selectedItem;
        }


        public DataTable LoadSchema()
        {
            return SFObjects.LoadDataTable("SELECT * FROM [AP].[vw_LoadSchemaDebitMemoEntry] WHERE 1<>1", _ConnectionString);
        }

        public String getdocno(String location,String year,String trantype)
        {
            //return SFObjects.returnText($@"SELECT SG.fn_GetDocno('{location}','{year}','{trantype}')", _ConnectionString);
            return SFObjects.returnText($"SELECT SG.fn_GetDocno('{location}', DATEPART(YEAR, dbo.GetNoahDate()),'{trantype}') Docno", _ConnectionString);
        }

        public String getdocnoyear(String location)
        {
            return SFObjects.returnText($@"SELECT [AP].[fn_GetCurrentYearforDocno]('{location}')", _ConnectionString);
        }

        public string GetData(String user)
        {
            return  string.Format($@"SELECT * FROM [AP].[fn_GetToolBoxDataDebitMemoEntry]('{user}')"); 
        }

        public bool hasSavedRqrdCompli(string docNo, int rowNo = 0, int lineID = 0)
        {
            //return SFObjects.returnText($@"EXEC {sp_hdr}  @docno='{docNo}',@rownum={rowNo},@lineID={lineID}, @QueryType = 30", _ConnectionString);


            string strSQL = $"SELECT dc.fn_ChkIfHasReqCompliance('{docNo}','{lineID}','{rowNo}')";
            return Parser.ParseBool(SFObjects.returnText(strSQL, _ConnectionString));
        }

        public string GetDataView(String docno)
        {
            return string.Format($@"SELECT * FROM [AP].[fn_GetToolBoxDataDebitMemoEntry_viewing]('{docno}')");
        }
        private SqlTransaction sqlTrn;
        private SqlConnection sqlConn = new SqlConnection();
        public string SaveData(DataTable dt, String trantype, String recuser, bool IsNewRow)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                DataRow dr = dt.Rows[0];
                SqlCommand cmd = new SqlCommand();

                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = "AP.nsp_DebitMemoEntry";
                cmd.Parameters.AddWithValue("@Docno", dr["DOCNO"]);
                cmd.Parameters.AddWithValue("@Trade", dr["TRADE"]);
                //cmd.Parameters.AddWithValue("@trantype", trantype);
                cmd.Parameters.AddWithValue("@location", dr["LOCACCTFORMS"]);
                cmd.Parameters.AddWithValue("@payeetype", dr["PAYEETYPE"]);
                cmd.Parameters.AddWithValue("@payeesubtype", dr["PAYEESUBTYPE"]);
                cmd.Parameters.AddWithValue("@payee", dr["PAYEE"]);
                cmd.Parameters.AddWithValue("@tin", dr["TIN"]);
                cmd.Parameters.AddWithValue("@payeeaddress", dr["PAYEEADDRESS"]);
                cmd.Parameters.AddWithValue("@currency", dr["CURRENCY"]);
                cmd.Parameters.AddWithValue("@localforex", dr["LOCALFOREX"]);
                cmd.Parameters.AddWithValue("@homeforex", dr["HOMEFOREX"]);
                cmd.Parameters.AddWithValue("@refno", dr["REFNO"]);
                cmd.Parameters.AddWithValue("@refDate", dr["REFDATE"]);
                cmd.Parameters.AddWithValue("@remarks", dr["REMARKS"]);
                cmd.Parameters.AddWithValue("@Recuser", recuser);
                cmd.Parameters.AddWithValue("@valuedate", dr["VALUEDATE"]);
                //cmd.Parameters.AddWithValue("@status", 1);
                cmd.Parameters.AddWithValue("@QueryType", IsNewRow ? 1 : 2);
                cmd.ExecuteNonQuery();
            }

            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("System Cannot Save Data.\nDuplicate records are not allowed.", sqlEx.Number);
                else if (sqlEx.Number == 547)
                    result = String.Format("System Cannot perform action.\nData currently in use.", sqlEx.Number);
                else
                    result = String.Format("{1}", sqlEx.Number, sqlEx.Message);
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

        public string DeleteData(String Docno)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
            cmd.Parameters.AddWithValue("@Docno", Docno);
            cmd.Parameters.AddWithValue("@QueryType", 14);
            return base.ExecProcedure(cmd, _ConnectionString);
        }

        public string LISTINGQUERY()
        {
            return string.Format(@"SELECT code[Code],Description[Description],Numdays [No. of days],SG.getEmpName(Recuser)[Created By]
                                  ,Recdate[Date Created],SG.getEmpName(Moduser)[Modified By],Moddate[Date Modified]
                                   FROM [AP].[TERM]");
        }

        public string inquireQuery(String user)
        {
            //return string.Format($@"SELECT [AP DM NO] [AP Debit Memo No.], [PayeeCode] [Payee Code], PayeeDesc [Payee Name], Remarks 
            //                        FROM [AP].[fn_GetToolBoxDataDebitMemoEntry]('{user}')");

            return string.Format($@"EXEC {storedProc} @Recuser='{user}', @QueryType=69");
        }     

        /*--------------------------------------------------------------LOOKUPS--------------------------------------------------------*/


        public string lugLocForm(string trantype,string user)
        {

            return string.Format($@"EXEC [AP].[nsp_DebitMemoEntry] @Recuser='{user}', @trantype='{trantype}', @QueryType=53");
        }

        public string lugPayeeType()
        {

            return string.Format(@"SELECT Code,Description[Description] FROM AP.PAYEETYPE");
        }
        public string lugSubPayee(string payeetype)
        {
            string sql = string.Format($@"SELECT Code,Description[Description] FROM ap.PAYEESUBTYPE where PayeeType='{payeetype}'");
            return sql;
        }

        public string lugPayee(string loc)
        {            
            return string.Format($@"EXEC AP.nsp_DebitMemoEntry @location='{loc}', @QueryType=47");
        }

        // Advance Lookup
        public bool getlugPayeeConfig()
        {
            return Parser.ParseBool(SFObjects.returnText($@"SELECT value FROM dbo.lookupAdvanceTag WHERE Code='APDebitMemoEntry_getlugPayee'", _ConnectionString));
        }
        public string getlugPayeeCount(string loc)
        {
            return SFObjects.returnText($@"EXEC AP.nsp_DebitMemoEntry @location='{loc}', @tag=2, @QueryType=47", _ConnectionString);
        }
        public string getlugPayee(string loc, string searchVal, int tag)
        {
            return string.Format($@"EXEC AP.nsp_DebitMemoEntry @location='{loc}', @searchVal='%{searchVal}%', @tag='{tag}', @QueryType=47");
        }
        // END 

        public string lugdebitwithoutref(string user)
        {

            return string.Format($@"SELECT * FROM [AP].[fn_getwitoutdebitlookupPayeeReference] ('{user}')");
        }
        
        public string getuom(String itemmaster)
        {

            return string.Format($@"SELECT * FROM [AP].[fn_APVDirect_ItemUOM]('{itemmaster}')");
        }
        public string getitemmaster()
        {

            return string.Format($@"SELECT code[Item Code],Description[Item Description] FROM SG.ItemMaster WHERE Status IN (3,4)");
        }

        public string getSegment(string segcode, string loc, string recuser)
        { 
            return string.Format($@"EXEC {storedProcwRef} @seg2='{segcode}', @locForm='{loc}', @recuser='{recuser}', @QueryType=31");
        }

        public string getprofitcenter(String APVNo)
        {
            return string.Format($@"SELECT DISTINCT ACCTSEG2 [Code], segmain.Description [Description]
                                    FROM AP.APVDIRECTDTL
                                    LEFT JOIN SG.SEGMAIN segmain ON segmain.Code = ACCTSEG2
                                    WHERE DOCNO = '{APVNo}'");
        }
        public string getSeg1()
        {
            return string.Format($@"EXEC {storedProcwRef} @QueryType=30");
        }


        public string getcostcenter()
        {

            return string.Format($@"EXEC {storedProc} @QueryType = 64");
        }

        public string getcostcenter(String APVNo)
        {
            string getPCCC = SFObjects.returnText("SELECT SortBy FROM [SG].[fn_getPCCCSegCode]()", _ConnectionString);

            return string.Format($@"SELECT DISTINCT ACCTSEG3 [Code], segmain.Description [Description]
                                    FROM AP.APVDIRECTDTL
                                    LEFT JOIN SG.SEGMAIN segmain ON segmain.Code = ACCTSEG{getPCCC}
                                    WHERE DOCNO = '{APVNo}'");
        }

        public DataTable getlinetype()
        {
            return SFObjects.LoadDataTable("SELECT Description FROM AP.LineType", _ConnectionString);
        }
 

       


        public string getsubaccount(String Location,String MainCode)
        {
            return string.Format($@"EXEC {storedProcwRef} @locForm='{Location}', @QueryType=34", Location, MainCode);
        }

        public string getSLType(String seg1)
        {
            return string.Format($@"EXEC {storedProcwRef} @seg1='{seg1}', @QueryType=32");
        }
        public string getSLRef(String sltype)
        {
            return string.Format($@"EXEC {storedProcwRef} @sltype='{sltype}', @QueryType=33");
        }


        public string gettotalapvno(String filter, string payee, string location, String TradeType, String TranNo, string currency)
        {
            return string.Format($@"EXEC [AP].[nsp_DebitMemoEntry] @filter='{filter}', @location='{location}', @docno='{TranNo}', @payee='{payee}', @currency='{currency}', @QueryType=68");
        }


        public string getlinedetailsapvno(string Payee, string Location, string filter, String TradeType, String TranNo)
        {
            if (string.IsNullOrEmpty(filter))
                return string.Format($@"EXEC [AP].[nsp_DebitMemoEntry]  @location='{Location}', @payee='{Payee}', @Trade='{TradeType}', @Docno='{TranNo}', @QueryType=49");
            else
                return string.Format($@"EXEC [AP].[nsp_DebitMemoEntry]  @location='{Location}', @payee='{Payee}', @Trade='{TradeType}', @Docno='{TranNo}', @Filter='{filter}', @QueryType=50");
        }

        public string gettax()
        {

            return string.Format($@"EXEC {storedProc} @QueryType = 62");
        }
        public DataTable setforex(String valuedate, String loc, String currency)
        {
            return SFObjects.LoadDataTable($@"SELECT HomeForex, LocalForex, ErrorMessage, CONVERT(VARCHAR(10), forexdate, 101) [forexdate] FROM [AP].[fn_getforex]('{valuedate}','{loc}','{currency}')", _ConnectionString);

            //return SFObjects.LoadDataTable($@"SELECT * FROM [AP].[fn_getforex]('{valuedate}','{loc}','{currency}')", _ConnectionString);
        }

        /*--------------------------------------------------------------LOOKUPS--------------------------------------------------------*/
        public string ServerLink()
        {
            return SFObjects.returnText($"SELECT Value FROM dbo.SystemConfig WHERE Code = 'Server_Link'", _ConnectionString);
        }

        public string ServerLink2()
        {
            return SFObjects.returnText($"SELECT Value FROM dbo.SystemConfig WHERE Code = 'Server_Link'", _ConnectionString);
        }

        public DataTable LoadSchemaAttachment()
        {
            return SFObjects.LoadDataTable("SELECT * FROM ap.APDEBITMEMOFLE WHERE 1<>1", _ConnectionString);
        }

        public string getdocctrl(String TranDoc)
        {
            //return string.Format($@"SELECT * FROM [AP].[fn_getdocctrllookupDebitMemo]('{TranDoc}')");
            return string.Format($@"EXEC [AP].[nsp_DebitMemoEntry] @trantype='PDMTRD',  @QueryType=44");
        }

        public string getAPVNowRef(string apvnoList, string vendor, string loc)
        {            
            return string.Format($@"EXEC {storedProcwRef} @locForm='{loc}', @vendor='{vendor}', @apvnoList='{apvnoList}', @QueryType=20");         
        }
        public string lugPayeeRef(string loc, string igt, string item)
        {
            return string.Format($@"EXEC {storedProcwRef} @locForm='{loc}', @igtCode='{igt}', @itemCode='{item}', @QueryType=21");
        }
        public string getIGTwRef(string loc, string vendor, string reason, string rsntype)
        {
            return string.Format($@"EXEC {storedProcwRef} @locForm='{loc}', @vendor='{vendor}', @reason='{reason}', @reasonType='{rsntype}', @QueryType=22");
        }
        public string getItemCodewRef(string igt, string vendor, string reason, string reasontype, string loc)
        {
            string sql = string.Format($@"EXEC {storedProcwRef} @igtCode='{igt}', @vendor='{vendor}', @reason='{reason}', @reasonType='{reasontype}', @locForm='{loc}', @QueryType=26");

            return sql;
        }
        public string getVatCodewRef()
        {
            string sql = string.Format($@"EXEC {storedProcwRef} @queryType=27");

            return sql;
        }
        public string getEwtCodewRef()
        {
            string sql = string.Format($@"EXEC {storedProcwRef} @queryType=28");

            return sql;
        }     
        public string isemptydebitnotewoutref(String trandoc, string flag)
        {
            return SFObjects.returnText($@"SELECT TOP 1 1 FROM ap.APDEBITMEMOWOR WHERE DOCNO='{trandoc}'", _ConnectionString);
        }

        public string isemptylinedetailswithref(String trandoc)
        {
            return SFObjects.returnText($@"SELECT TOP 1 1 FROM ap.APDEBITMEMOLRF WHERE DOCNO='{trandoc}'", _ConnectionString);
        }
        public string getSegment(string segment)
        {
            return string.Format($@"SELECT * From [AP].[fn_APVDirect_Segmain]('{segment}')");
        }
        public string getitemgroup(string TradeType)
        {
            return string.Format(@"SELECT * From  [AP].[fn_APVDirect_ItemGroup]('{0}')", TradeType);
        }
        public string isemptylinedetailswithoutref(String trandoc)
        {
            return SFObjects.returnText($@"SELECT TOP 1 1 FROM ap.APDEBITMEMOLOR WHERE DOCNO='{trandoc}'", _ConnectionString);
        }
        public string isemptytotal(String trandoc)
        {
            return SFObjects.returnText($@"SELECT TOP 1 1 FROM ap.APDEBITMEMOAPV WHERE DOCNO='{trandoc}'", _ConnectionString);
        }
        public DataTable getDebitwRefRefresh(String docno)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = storedProcwRef;
            cmd.Parameters.AddWithValue("@docno", docno);
            cmd.Parameters.AddWithValue("@QueryType", 0);
            return ExecGetData(cmd, _ConnectionString);
        }
        public DataTable getdebitnotedetails(String trandoc, string pccc, string docno, decimal vatin, bool isResetTax, bool isAutoAlloc)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
            cmd.Parameters.AddWithValue("@debnwrapvno", trandoc);
            cmd.Parameters.AddWithValue("@ldwracctseg3", pccc);
            cmd.Parameters.AddWithValue("@debnwramount", vatin);
            cmd.Parameters.AddWithValue("@Docno", docno);
            cmd.Parameters.AddWithValue("@isResetTax", isResetTax);
            cmd.Parameters.AddWithValue("@isAutoAlloc", isAutoAlloc);
            cmd.Parameters.AddWithValue("@QueryType", 35);
            return ExecGetData(cmd, _ConnectionString);
        }
        public DataTable getLineDtlswRef(string docno, decimal apvAmount, int rowno, string debitMemo, bool isResetTax)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
            cmd.Parameters.AddWithValue("@ldwrapvno", docno);
            cmd.Parameters.AddWithValue("@ldwrucost", apvAmount);
            cmd.Parameters.AddWithValue("@APVROWNO", rowno);
            cmd.Parameters.AddWithValue("@Docno", debitMemo);
            cmd.Parameters.AddWithValue("@isResetTax", isResetTax);
            cmd.Parameters.AddWithValue("@QueryType", 51);
            return ExecGetData(cmd, _ConnectionString);
        }       
        public DataTable getDebitNotewoRef(String trandoc, string flag)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = storedProcwoRef;
            cmd.Parameters.AddWithValue("@docno", trandoc);
            //cmd.Parameters.AddWithValue("@debnwoutrFLAG", flag);
            cmd.Parameters.AddWithValue("@QueryType", 0);
            return ExecGetData(cmd, _ConnectionString);
        }

        public DataTable getlinedetailswref(String trandoc)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
            cmd.Parameters.AddWithValue("@Docno", trandoc);
            cmd.Parameters.AddWithValue("@QueryType", 25);
            return ExecGetData(cmd, _ConnectionString);
        }

        public DataTable getlinedetailswreftaxconvert(String trandoc)
        {
            return SFObjects.LoadDataTable($@"EXEC [AP].[nsp_getTaxConvertDebitMemoLineDetailswRef] @DOCNO='{trandoc}'", _ConnectionString);
        }
        

         public DataTable getlinedetailswoutreftaxconvert(String trandoc)
        {
            return SFObjects.LoadDataTable($@"EXEC [AP].[nsp_getTaxConvertDebitMemoLineDetailswoutRef] @DOCNO='{trandoc}'", _ConnectionString);
        }

        public DataTable getlinedetailswoutref(String trandoc)
        {
            return SFObjects.LoadDataTable($@"
                                                SELECT a.REASON[Reason Code],b.description[Reason Description],a.REMARKS[Remarks],a.PAYEEREF[Payee Reference]
                                                ,CASE WHEN c.TradeName IS NULL THEN sg.fn_getEmployeeName(a.[PAYEEREF]) ELSE 
                                                c.TradeName END[Payee Reference Name],d.Description[Line Type],
                                                a.PARTICULARS[Particulars],a.ITEMCODE[Item Code],e.Description[Item Description],
                                                a.ITEMUOM[Item UOM],a.QTY[Quantity],a.UCOSTVATEX[Unit Cost],
                                                CONVERT(FLOAT,a.QTY) * CONVERT(FLOAT,a.UCOSTVATEX)[OCY Amount],
                                                a.TAXCODE,a.ACCTSEG2[Profit Code],gl.fn_getsegdesc(a.ACCTSEG2)[Profit Description],
                                                a.ACCTSEG1[Main Code],gl.fn_getsegdesc(a.ACCTSEG1)[Main Description],
                                                a.ACCTSEG3[Cost Center Code],gl.fn_getsegdesc(a.ACCTSEG3)[Cost Center Description],
                                                a.ACCTSEG4[Item Group Code],gl.fn_getsegdesc(a.ACCTSEG4)[Item Group Description],
                                                gl.fn_getsegdescconcat(a.ACCTSEG1,a.ACCTSEG2,a.ACCTSEG3,a.ACCTSEG4,a.ACCTSEG5,a.ACCTSEG6)[Account Description],
                                                a.SUBACCT[Sub account],a.SUBLDGR[SL Type],a.SUBLDGRREF[SL ref],CONVERT(VARCHAR(50),a.PERIODFROM,101)[Period from],CONVERT(VARCHAR(50),a.PERIODTO,101)[Period to],''
                                                ,f.Reqsubacct,f.ReqSltype,g.Required_Period_to_Cover FROM ap.APDEBITMEMOLOR a
                                                LEFT JOIN sg.reasonctrlin b
                                                ON a.REASON = b.code AND b.reasontype='AP005'
                                                LEFT JOIN AP.SUPPLIERINFO c
                                                ON a.PAYEEREF = c.SupplierCode
                                                LEFT JOIN ap.LineType d
                                                ON a.LINETYPE = d.Code
                                                LEFT JOIN SG.ItemMaster e
                                                ON a.ITEMCODE = e.Code
                                                LEFT JOIN SG.SEGMAIN f
                                                ON a.ACCTSEG1 = f.Code
                                                LEFT JOIN GL.AccountMainSLTypeAssignHDR g
                                                ON a.ACCTSEG1 = g.Account
                                                WHERE a.DOCNO='{trandoc}'", _ConnectionString);
        }


        public DataTable getTotalAPVData(String trandoc)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
            cmd.Parameters.AddWithValue("@Docno", trandoc);
            cmd.Parameters.AddWithValue("@QueryType", 26);
            return ExecGetData(cmd, _ConnectionString);
        }
        public string getReason()
        {
            return string.Format($@"EXEC {storedProc} @QueryType=60");           
        }
        public string getReasonwoRef(string docno)
        {
            return string.Format($@"EXEC {storedProcwoRef} @docno='{docno}', @QueryType=21");
        }

        public String checkisallowselection(String location, String trantype)
        {
            return SFObjects.returnText($@"EXEC [AP].[nsp_DebitMemoApprovaldetails] 
                    @loc='{location}',@trantype='{trantype}', @QueryType=0", _ConnectionString);
        }
        public String checkisrequiredamount(String location, String trantype)
        {
            return SFObjects.returnText($@"EXEC [AP].[nsp_DebitMemoApprovaldetails] 
                   @loc='{location}',@trantype='{trantype}',  @QueryType=1", _ConnectionString);
        }      
        public String checkisautoposted(String location, String trantype)
        {
            return SFObjects.returnText($@"EXEC [AP].[nsp_DebitMemoApprovaldetails] 
                    @loc='{location}',@trantype='{trantype}', @QueryType=2", _ConnectionString);
        }


        public DataTable allowselectiongrid(String location,String trantype,String docno)
        {
            return SFObjects.LoadDataTable($@"EXEC [AP].[nsp_DebitMemoApprovaldetails] 
                    @loc='{location}',@trantype='{trantype}',@trandoc='{docno}', @QueryType=3", _ConnectionString);
        }
        public DataTable defaultselectiongrid(String docno)
        {
            return SFObjects.LoadDataTable($@"EXEC [AP].[nsp_DebitMemoApprovaldetails] @trandoc='{docno}', @QueryType=4", _ConnectionString);
        }
        
        public string getapprover(String location, String trantype,String approverlevel)
        {
            return string.Format($@"EXEC [AP].[nsp_DebitMemoApprovaldetails] @loc='{location}',@trantype='{trantype}',@approvallevel='{approverlevel}', @QueryType=7");
        }
        public string getlugControlAccount(String Docno)
        {
            return string.Format($@"EXEC {storedProcwoRef} @docno=N'{Docno}', @QueryType=20");
        }
   
        public DataTable LoadAttachmentRecords(string Trandoc)
        {
            return SFObjects.LoadDataTable($@"SELECT * FROM [AP].[fn_getattachdata]('{Trandoc}')", _ConnectionString);
        }

        public string SaveDocuAttachment(DataTable dt, String TranDoc)
        {

            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();
                SqlCommand cmd = new SqlCommand();

                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.Transaction = sqlTrn;
                cmd.Parameters.Clear();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.CommandText = "[AP].[nsp_DocumentEntry_DocumentAttachment]";
                cmd.Parameters.AddWithValue("@TranDoc", TranDoc);
                cmd.Parameters.AddWithValue("@QueryType", 0);
                cmd.ExecuteScalar();

                int row = 0;
                foreach (DataRow items in dt.Rows)
                {
                    row++;
                    cmd = new SqlCommand();
                    cmd.Connection = sqlConn;
                    cmd.Transaction = sqlTrn;
                    cmd.Parameters.Clear();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.CommandText = "[AP].[nsp_DocumentEntry_DocumentAttachment]";
                    cmd.Parameters.AddWithValue("@TranDoc", TranDoc);
                    cmd.Parameters.AddWithValue("@Docctrl", items["DOCCTRL"].ToString());
                    cmd.Parameters.AddWithValue("@path", items["FILEBIN"].ToString());
                    cmd.Parameters.AddWithValue("@docnoCntrlNo", items["DOCCTRLNO"].ToString());
                    cmd.Parameters.AddWithValue("@QueryType", 1);
                    cmd.ExecuteScalar();
                }
            }
            catch (SqlException sqlEx)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                string result;
                if (sqlEx.Number == 2627)
                    result = String.Format("Cannot be saved. Duplicate records are not allowed.");
                else if (sqlEx.Number == 547)
                    result = String.Format("Cannot be saved. Data currently in use.");
                else
                    result = String.Format(sqlEx.Message);
                return result;
            }
            catch (Exception ex)
            {
                sqlTrn.Rollback();
                sqlConn.Close();
                return String.Format(ex.Message);
            }

            sqlTrn.Commit();
            sqlConn.Close();
            return "Saved successfully";
        }
               
        public string SaveTotalAPV(DataTable dt, String TranDoc)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            foreach (DataRow items in dt.Rows)
            {
                if (items[SPR_LDW_REASON].ToString().Length > 0)
                { 
                    cmd = new SqlCommand();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
                    cmd.Parameters.AddWithValue("@Docno", TranDoc);
                    cmd.Parameters.AddWithValue("@totalapvno", items[SPR_TOTAL_APVNO - 1]);
                    cmd.Parameters.AddWithValue("@totalreason", items[SPR_TOTAL_REASON - 1].ToString());
                    cmd.Parameters.AddWithValue("@totalremarks", items[SPR_TOTAL_REMARKS - 1].ToString());
                    cmd.Parameters.AddWithValue("@reasonType", items[SPR_TOTAL_REASONTYPE - 1].ToString());
                    cmd.Parameters.AddWithValue("@QueryType", 13);
                    cmdList.Add(cmd);
                }
            }
    
            cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
            cmd.Parameters.AddWithValue("@Docno", TranDoc); 
            cmd.Parameters.AddWithValue("@QueryType", 10);
            cmdList.Add(cmd);
            return base.ExecProcedure(cmdList, _ConnectionString, true);
        }

        public string SaveAndExitDebitwRef(string docno, DataTable dt, int TagAutoallocate, String ifTaxConvertIsClick)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();

                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = storedProcwRef;
                cmd.Parameters.AddWithValue("@docno", docno);
                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmd.ExecuteNonQuery();

                int rowno = 1;
                foreach (DataRow items in dt.Rows)
                {
                    if (items[BL.SPR_LINETYPE - 1].ToString() == "Tax")
                        continue;

                    if (items[BL.SPR_APVNO - 1].ToString().Length > 0)
                    {
                        cmd.Connection = sqlConn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Transaction = sqlTrn; // Need to specify for every commands
                        cmd.Parameters.Clear();
                        cmd.CommandText = storedProcwRef;
                        cmd.Parameters.AddWithValue("@docno", docno);
                        cmd.Parameters.AddWithValue("@linetype", 1);
                        cmd.Parameters.AddWithValue("@apvno", items[BL.SPR_APVNO - 1].ToString());
                        cmd.Parameters.AddWithValue("@reason", items[BL.SPR_REASON - 1].ToString());
                        cmd.Parameters.AddWithValue("@reasonType", items[BL.SPR_REASONTYPE - 1].ToString());
                        cmd.Parameters.AddWithValue("@particulars", items[BL.SPR_PARTICULARS - 1].ToString());
                        cmd.Parameters.AddWithValue("@amountVATEX", Parser.ParseDecimal(items[BL.SPR_DVAMOUNTVATEX - 1].ToString()));
                        cmd.Parameters.AddWithValue("@amountVATIN", Parser.ParseDecimal(items[BL.SPR_DVAMOUNT - 1].ToString()));
                        cmd.Parameters.AddWithValue("@vendor", items[BL.SPR_PAYEEREFCODE - 1].ToString());
                        //cmd.Parameters.AddWithValue("@debnwrtaxcode", items[SPR_TAX - 1].ToString());
                        cmd.Parameters.AddWithValue("@seg1", items[BL.SPR_SEG1 - 1].ToString());
                        cmd.Parameters.AddWithValue("@seg2", items[BL.SPR_SEG2 - 1].ToString());
                        cmd.Parameters.AddWithValue("@seg3", items[BL.SPR_SEG3 - 1].ToString());
                        cmd.Parameters.AddWithValue("@seg4", items[BL.SPR_SEG4 - 1].ToString());
                        cmd.Parameters.AddWithValue("@seg5", items[BL.SPR_SEG5 - 1].ToString());
                        cmd.Parameters.AddWithValue("@seg6", items[BL.SPR_SEG6 - 1].ToString());
                        cmd.Parameters.AddWithValue("@bankaccnt", items[BL.SPR_SUBACCOUNT - 1].ToString());
                        cmd.Parameters.AddWithValue("@sltype", items[BL.SPR_SLTYPECODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@slref", items[BL.SPR_SLREFCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@TagAutoAllocate", TagAutoallocate);
                        if (!string.IsNullOrEmpty(items[BL.SPR_PERIODFROM - 1].ToString()))
                            cmd.Parameters.AddWithValue("@periodFrom", items[BL.SPR_PERIODFROM - 1].ToString());
                        if (!string.IsNullOrEmpty(items[BL.SPR_PERIODTO - 1].ToString()))
                            cmd.Parameters.AddWithValue("@periodTo", items[BL.SPR_PERIODTO - 1].ToString());
                        cmd.Parameters.AddWithValue("@igtCode", items[BL.SPR_ITEMGROUPTYPE - 1].ToString());
                        cmd.Parameters.AddWithValue("@itemCode", items[BL.SPR_ITEMCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@vatCode", items[BL.SPR_VATCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@ewtCode", items[BL.SPR_EWTCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@vatWithRef", Parser.ParseDecimal(items[BL.SPR_VAT - 1].ToString()));
                        cmd.Parameters.AddWithValue("@ewtWithRef", Parser.ParseDecimal(items[BL.SPR_EWT - 1].ToString()));
                        cmd.Parameters.AddWithValue("@netEwt", Parser.ParseDecimal(items[BL.SPR_NETAMT - 1].ToString()));
                        cmd.Parameters.AddWithValue("@rowno", rowno);
                        cmd.Parameters.AddWithValue("@cashFlow", items[BL.SPR_CASHFLOWCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@QueryType", 1);
                        cmd.ExecuteNonQuery();

                        rowno++;
                    }
                }

                //if (ifTaxConvertIsClick == "0" && TagAutoallocate == 1)
                //{
                //    cmd.Connection = sqlConn;
                //    cmd.CommandType = CommandType.StoredProcedure;
                //    cmd.Transaction = sqlTrn; // Need to specify for every command
                //    cmd.Parameters.Clear();
                //    cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
                //    cmd.Parameters.AddWithValue("@Docno", TranDoc);
                //    cmd.Parameters.AddWithValue("@QueryType", 40);
                //    cmd.ExecuteNonQuery();
                //}

                //getTaxConvertDMwRef(docno);

                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = storedProcwRef;
                cmd.Parameters.AddWithValue("@docno", docno);
                cmd.Parameters.AddWithValue("@QueryType", 11);
                cmd.ExecuteNonQuery();

                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = storedProc;
                cmd.Parameters.AddWithValue("@docno", docno);
                cmd.Parameters.AddWithValue("@QueryType", 10);
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
            return "Saved successfully";          
        }

        public string DebitNotewithrefGetTaxConvert(DataTable dt, String TranDoc, int TagAutoallocate)
        {           
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();
                
                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = "[AP].[nsp_DebitMemoEntryTaxConvert]";
                cmd.Parameters.AddWithValue("@Docno", TranDoc);
                cmd.Parameters.AddWithValue("@QueryType", 5);
                cmd.ExecuteNonQuery();

                //Insert into APDEBITMEMOWRF_TEMP
                int rowno = 1;
                foreach (DataRow dr in dt.Rows)
                {
                    if (dr[SPR_LINETYPE - 1].ToString() == "Tax")
                        continue;

                    if (dr[SPR_LINETYPE - 1].ToString().Length > 0)
                    {
                        cmd.Connection = sqlConn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Transaction = sqlTrn; // Need to specify for every commands
                        cmd.Parameters.Clear();
                        cmd.CommandText = "[AP].[nsp_DebitMemoEntryTaxConvert]";
                        cmd.Parameters.AddWithValue("@Docno", TranDoc);
                        cmd.Parameters.AddWithValue("@debnwrlinetype", 1);
                        cmd.Parameters.AddWithValue("@debnwrapvno", dr[BL.SPR_APVNO - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwrreason", dr[BL.SPR_REASON - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwrReasonType", dr[BL.SPR_REASONTYPE - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwrparticulars", dr[BL.SPR_PARTICULARS - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwramount", dr[BL.SPR_DVAMOUNT - 1].ToString() == "" ? 0 : float.Parse(dr[BL.SPR_DVAMOUNT - 1].ToString().Replace(",", "")));
                        cmd.Parameters.AddWithValue("@debnwramountvatex", dr[BL.SPR_DVAMOUNTVATEX - 1].ToString() == "" ? 0 : float.Parse(dr[BL.SPR_DVAMOUNTVATEX - 1].ToString().Replace(",", "")));
                        cmd.Parameters.AddWithValue("@debnwrpayeeref", dr[BL.SPR_PAYEEREFCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@vatCode", dr[BL.SPR_VATCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@ewtCode", dr[BL.SPR_EWTCODE - 1].ToString());
                        //cmd.Parameters.AddWithValue("@debnwrtaxcode", dr[SPR_TAX - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwracctseg1", dr[BL.SPR_SEG1 - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwracctseg2", dr[BL.SPR_SEG2 - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwracctseg3", dr[BL.SPR_SEG3 - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwracctseg4", dr[BL.SPR_SEG4 - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwracctseg5", dr[BL.SPR_SEG5 - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwracctseg6", dr[BL.SPR_SEG6 - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwrsubacct", dr[BL.SPR_SUBACCOUNT - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwrsltype", dr[BL.SPR_SLTYPECODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwrslref", dr[BL.SPR_SLREFCODE - 1].ToString());
                        if (!string.IsNullOrEmpty(dr[BL.SPR_PERIODFROM - 1].ToString()))
                            cmd.Parameters.AddWithValue("@debnwrperiodfrom", dr[BL.SPR_PERIODFROM - 1].ToString());
                        if (!string.IsNullOrEmpty(dr[BL.SPR_PERIODTO - 1].ToString()))
                            cmd.Parameters.AddWithValue("@debnwrperiodto", dr[BL.SPR_PERIODTO - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwrgrouptype", dr[BL.SPR_ITEMGROUPTYPE - 1].ToString());
                        cmd.Parameters.AddWithValue("@itemCode", dr[BL.SPR_ITEMCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@TagAutoAllocate", TagAutoallocate);
                        cmd.Parameters.AddWithValue("@PCCC", dr[BL.SPR_PCCC - 1].ToString());
                        cmd.Parameters.AddWithValue("@vat", dr[BL.SPR_VAT - 1].ToString() == "" ? 0 : float.Parse(dr[BL.SPR_VAT - 1].ToString().Replace(",", "")));
                        cmd.Parameters.AddWithValue("@ewt", dr[BL.SPR_EWT - 1].ToString() == "" ? 0 : float.Parse(dr[BL.SPR_EWT - 1].ToString().Replace(",", "")));
                        cmd.Parameters.AddWithValue("@netEwt", dr[BL.SPR_NETAMT - 1].ToString() == "" ? 0 : float.Parse(dr[BL.SPR_NETAMT - 1].ToString().Replace(",", "")));
                        cmd.Parameters.AddWithValue("@rowno", rowno);
                        cmd.Parameters.AddWithValue("@cashFlow", dr[BL.SPR_CASHFLOWCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@QueryType", 4);
                        cmd.ExecuteNonQuery();

                        rowno++;
                    }
                }

                if (TagAutoallocate == 1)
                {
                    cmd.Connection = sqlConn;
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Transaction = sqlTrn; // Need to specify for every command
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[AP].[nsp_DebitMemoEntryTaxConvert]";
                    cmd.Parameters.AddWithValue("@Docno", TranDoc);
                    cmd.Parameters.AddWithValue("@QueryType", 12);
                    cmd.ExecuteNonQuery();
                }
               
                //cmd.Connection = sqlConn;
                //cmd.CommandType = CommandType.StoredProcedure;
                //cmd.Transaction = sqlTrn; // Need to specify for every command
                //cmd.Parameters.Clear();
                //cmd.CommandText = " [AP].[nsp_getTaxConvertDebitMemoDebitNotewRef2]";
                //cmd.Parameters.AddWithValue("@Docno", TranDoc);
                //cmd.ExecuteNonQuery();               
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
        public DataTable getTaxConvertDMwRef(string docno)
        {
            return SFObjects.LoadDataTable($@"EXEC [AP].[nsp_getTaxConvertDebitMemoDebitNotewRef2] @DOCNO='{docno}'", _ConnectionString);
        }


        public string DebitNotewoRef_TaxConvert(DataTable dt, String TranDoc, string flag, string apctrl)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();

                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = "[AP].[nsp_DebitMemoEntryTaxConvert]";
                cmd.Parameters.AddWithValue("@Docno", TranDoc);
                cmd.Parameters.AddWithValue("@debnwoutrFLAG", flag);
                cmd.Parameters.AddWithValue("@QueryType", 6);
                cmd.ExecuteNonQuery();

                int rowno = 1;
                foreach (DataRow items in dt.Rows)
                {
                    if (items[SPR_without_LINETYPE - 1].ToString().Length > 0)
                    {
                        cmd.Connection = sqlConn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Transaction = sqlTrn; // Need to specify for every command
                        cmd.Parameters.Clear();
                        cmd.CommandText = "[AP].[nsp_DebitMemoEntryTaxConvert]";
                        cmd.Parameters.AddWithValue("@Docno", TranDoc);
                        cmd.Parameters.AddWithValue("@debnwoutrlinetype", 1);
                        cmd.Parameters.AddWithValue("@debnwoutrreason", items[BL.SPR_without_REASON - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwrReasonType", items[BL.SPR_without_REASONTYPE - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwoutrparticulars", items[BL.SPR_without_PARTICULARS - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwoutramount", string.IsNullOrEmpty(items[BL.SPR_without_DMAMOUNT - 1].ToString()) ? "0" : items[BL.SPR_without_DMAMOUNT - 1].ToString().Replace(",", ""));
                        cmd.Parameters.AddWithValue("@debnwoutramountvatex", string.IsNullOrEmpty(items[BL.SPR_without_DMAMOUNTVATEX - 1].ToString()) ? "0" : items[BL.SPR_without_DMAMOUNTVATEX - 1].ToString().Replace(",", ""));
                        cmd.Parameters.AddWithValue("@debnwoutrpayeeref", items[BL.SPR_without_PAYEECODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@vatCode", items[BL.SPR_without_VATCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@ewtCode", items[BL.SPR_without_EWTCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwoutracctseg1", items[BL.SPR_without_SEG1 - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwoutracctseg2", items[BL.SPR_without_SEG2 - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwoutracctseg3", items[BL.SPR_without_SEG3 - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwoutracctseg4", items[BL.SPR_without_SEG4 - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwoutracctseg5", items[BL.SPR_without_SEG5 - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwoutracctseg6", items[BL.SPR_without_SEG6 - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwoutrsubacct", items[BL.SPR_without_SUBACCOUNT - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwoutrsltype", items[BL.SPR_without_SLTYPECODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwoutrslref", items[BL.SPR_without_SLREFCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwoutritemgrouptype", items[BL.SPR_without_ITEMGROUPTYPE - 1].ToString());
                        cmd.Parameters.AddWithValue("@itemCode", items[BL.SPR_without_ITEMCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwoutrCntrlAcct", apctrl);
                        if (!string.IsNullOrEmpty(items[BL.SPR_without_PERIODFROM - 1].ToString()))
                            cmd.Parameters.AddWithValue("@debnwoutrperiodfrom", items[BL.SPR_without_PERIODFROM - 1].ToString());
                        if (!string.IsNullOrEmpty(items[BL.SPR_without_PERIODTO - 1].ToString()))
                            cmd.Parameters.AddWithValue("@debnwoutrperiodto", items[BL.SPR_without_PERIODTO - 1].ToString());
                        cmd.Parameters.AddWithValue("@debnwoutrFLAG", flag);
                        cmd.Parameters.AddWithValue("@rowno", rowno);
                        cmd.Parameters.AddWithValue("@cashFlow", items[BL.SPR_without_CASHFLOWCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@QueryType", 7);
                        cmd.ExecuteNonQuery();

                        rowno++;
                    }
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
            //return SFObjects.LoadDataTable($@"EXEC [AP].[nsp_getTaxConvertDebitMemoDebitNotewoutRef2] @DOCNO='{TranDoc}',@FLAG='{flag}'", _ConnectionString);
        }
        public DataTable getTaxConvertDMwoRef(string docno, string flag)
        {
            return SFObjects.LoadDataTable($@"EXEC [AP].[nsp_getTaxConvertDebitMemoDebitNotewoutRef2] @DOCNO='{docno}', @FLAG='{flag}'", _ConnectionString);
        }

        public String SaveAndExitDebitwoRef(String TranDoc,DataTable dt, string flag, string apctrl)
        {
            try
            {
                sqlConn.ConnectionString = _ConnectionString;
                sqlConn.Open();
                sqlTrn = sqlConn.BeginTransaction();

                SqlCommand cmd = new SqlCommand();

                cmd = new SqlCommand();
                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = storedProcwoRef;
                cmd.Parameters.AddWithValue("@docno", TranDoc);
                cmd.Parameters.AddWithValue("@QueryType", 3);
                cmd.ExecuteNonQuery();

                int rowno = 1;
                foreach (DataRow items in dt.Rows)
                {
                    if (items[SPR_LINETYPE - 1].ToString() == "Tax")
                        continue;

                    if (items[SPR_without_REASON].ToString().Length > 0)
                    {
                        cmd.Transaction = sqlTrn; // Need to specify for every command
                        cmd.Parameters.Clear();
                        cmd.CommandText = storedProcwoRef;
                        cmd.Parameters.AddWithValue("@docno", TranDoc);
                        cmd.Parameters.AddWithValue("@linetype", 1);
                        cmd.Parameters.AddWithValue("@reason", items[BL.SPR_without_REASON - 1].ToString());
                        cmd.Parameters.AddWithValue("@particulars", items[BL.SPR_without_PARTICULARS - 1].ToString());
                        cmd.Parameters.AddWithValue("@amountVATIN", string.IsNullOrEmpty(items[BL.SPR_without_DMAMOUNT - 1].ToString()) ? float.Parse("0") : float.Parse(items[BL.SPR_without_DMAMOUNT - 1].ToString()));
                        cmd.Parameters.AddWithValue("@amountVATEX", string.IsNullOrEmpty(items[BL.SPR_without_DMAMOUNTVATEX - 1].ToString()) ? float.Parse("0") : float.Parse(items[BL.SPR_without_DMAMOUNTVATEX - 1].ToString()));
                        cmd.Parameters.AddWithValue("@vendor", items[BL.SPR_without_PAYEECODE - 1].ToString());                        
                        cmd.Parameters.AddWithValue("@igtCode", items[BL.SPR_without_ITEMGROUPTYPE - 1].ToString());
                        cmd.Parameters.AddWithValue("@seg1", items[BL.SPR_without_SEG1 - 1].ToString());
                        cmd.Parameters.AddWithValue("@seg2", items[BL.SPR_without_SEG2 - 1].ToString());
                        cmd.Parameters.AddWithValue("@seg3", items[BL.SPR_without_SEG3 - 1].ToString());
                        cmd.Parameters.AddWithValue("@seg4", items[BL.SPR_without_SEG4 - 1].ToString());
                        cmd.Parameters.AddWithValue("@seg5", items[BL.SPR_without_SEG5 - 1].ToString());
                        cmd.Parameters.AddWithValue("@seg6", items[BL.SPR_without_SEG6 - 1].ToString());
                        cmd.Parameters.AddWithValue("@bankaccnt", items[BL.SPR_without_SUBACCOUNT - 1].ToString());
                        cmd.Parameters.AddWithValue("@sltype", items[BL.SPR_without_SLTYPECODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@slref", items[BL.SPR_without_SLREFCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@flag", flag);
                        cmd.Parameters.AddWithValue("@apCtrlAcct", apctrl);
                        cmd.Parameters.AddWithValue("@vatCode", items[BL.SPR_without_VATCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@ewtCode", items[BL.SPR_without_EWTCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@reasonType", items[BL.SPR_without_REASONTYPE - 1].ToString());
                        cmd.Parameters.AddWithValue("@itemCode", items[BL.SPR_without_ITEMCODE - 1].ToString());
                        if (!string.IsNullOrEmpty(items[BL.SPR_without_PERIODFROM - 1].ToString()))
                            cmd.Parameters.AddWithValue("@periodFrom", items[BL.SPR_without_PERIODFROM - 1].ToString());
                        if (!string.IsNullOrEmpty(items[BL.SPR_without_PERIODTO - 1].ToString()))
                            cmd.Parameters.AddWithValue("@periodTo", items[BL.SPR_without_PERIODTO - 1].ToString());
                        cmd.Parameters.AddWithValue("@rowno", rowno);
                        cmd.Parameters.AddWithValue("@cashFlow", items[BL.SPR_without_CASHFLOWCODE - 1].ToString());
                        cmd.Parameters.AddWithValue("@QueryType", 1);
                        cmd.ExecuteNonQuery();

                        rowno++;
                    }
                }

                //getTaxConvertDMwoRef(TranDoc, "0");

                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = storedProcwoRef;
                cmd.Parameters.AddWithValue("@docno", TranDoc);
                cmd.Parameters.AddWithValue("@QueryType", 11);
                cmd.ExecuteNonQuery();

                cmd.Connection = sqlConn;
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Transaction = sqlTrn; // Need to specify for every command
                cmd.Parameters.Clear();
                cmd.CommandText = storedProc;
                cmd.Parameters.AddWithValue("@docno", TranDoc);
                cmd.Parameters.AddWithValue("@QueryType", 10);
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
            return "Saved successfully";                               
        }

        public String deletelinedetailwrefdetails(String TranDoc,DataTable dt)
        {
            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
            cmd.Parameters.AddWithValue("@Docno", TranDoc);
            cmd.Parameters.AddWithValue("@QueryType", 8);
            cmdList.Add(cmd);

            foreach (DataRow items in dt.Rows)
            {
                if (items[SPR_LD_LINETYPE - 1].ToString() != "Transaction")
                    continue;

                  if (items[SPR_APVNO - 1].ToString().Length > 0)
                    {
                    cmd = new SqlCommand();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
                    String LineType = items[SPR_LD_LINETYPE - 1].ToString();
                  //  if (LineType == "Transaction")
                  //  {
                    LineType = "1";
                  //  }
                    //else if (LineType == "Tax")
                    //{
                    //    LineType = "2";
                    //}
                    //else if (LineType == "Discount")
                    //{
                    //    LineType = "3";

                    //}
                    //else if (LineType == "Retention")
                    //{
                    //    LineType = "4";
                    //}
                    //else if (LineType == "Offsetting")
                    //{
                    //    LineType = "5";
                    //}
                    //else
                    //{
                    //    LineType = "0";
                    //}

                    cmd.Parameters.AddWithValue("@Docno", TranDoc);
                    cmd.Parameters.AddWithValue("@ldwrlinetype", LineType);
                    cmd.Parameters.AddWithValue("@ldwrapvno", items[SPR_LD_APVNO - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwrreason", items[SPR_LD_REASON - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwrucost", items[SPR_LD_OCYAMMOUNT - 1].ToString().Replace(",",""));  
                    cmd.Parameters.AddWithValue("@ldwrremarks", items[SPR_LD_PARTICULARS - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwrPAYEE", items[SPR_LD_PAYEEREFCODE - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwrucostvatex", Parser.ParseDecimal(items[SPR_LD_OCYAMMOUNTVATEX - 1].ToString()));
                    
                    //cmd.Parameters.AddWithValue("@ldwrucost", float.Parse(items[SPR_LD_DMUNIT - 1].ToString()));
                    cmd.Parameters.AddWithValue("@ldwrtaxcode", items[SPR_LD_TAX - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwracctseg1", items[SPR_LD_SEG1 - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwracctseg2", items[SPR_LD_SEG2 - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwracctseg3", items[SPR_LD_SEG3 - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwracctseg4", items[SPR_LD_SEG4 - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwracctseg5", items[SPR_LD_SEG5 - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwracctseg6", items[SPR_LD_SEG6 - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwrsubacct", items[SPR_LD_SUBACCOUNT - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwrsltype", items[SPR_LD_SUBSIDIARYLEDGERTYPE - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwrslref", items[SPR_LD_SUBSIDIARYLEDGERREF - 1].ToString());
                    cmd.Parameters.AddWithValue("@APVROWNO", items[SPR_LD_APVROWNO - 1].ToString());
                      
                    if (!string.IsNullOrEmpty(items[SPR_LD_PERIODFROM - 1].ToString()))
                        cmd.Parameters.AddWithValue("@ldwrdatefrom", items[SPR_LD_PERIODFROM - 1].ToString());

                    if (!string.IsNullOrEmpty(items[SPR_LD_PERIODTO - 1].ToString()))
                        cmd.Parameters.AddWithValue("@ldwrdateto", items[SPR_LD_PERIODTO - 1].ToString());

                    cmd.Parameters.AddWithValue("@ldwritemgrouptype", items[SPR_LD_ITEMGROUPTYPE - 1].ToString());
                  //  cmd.Parameters.AddWithValue("@ldwritemcode", items[SPR_LD_ITEMCODE - 1].ToString());
                 //   cmd.Parameters.AddWithValue("@ldwritemuom", items[SPR_LD_ITEMUOM - 1].ToString());
                    cmd.Parameters.AddWithValue("@QueryType", 9);
                    cmdList.Add(cmd);
                }
            }

            cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_getTaxConvertDebitMemoLineDetailswRef]";
            cmd.Parameters.AddWithValue("@DOCNO", TranDoc);
            cmdList.Add(cmd);

            return base.ExecProcedure(cmdList, _ConnectionString, true);
        }


        public String deletelinedetailwoutrefdetails(String TranDoc,DataTable dt)
        {

            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
            cmd.Parameters.AddWithValue("@Docno", TranDoc);
            cmd.Parameters.AddWithValue("@QueryType", 10);
            cmdList.Add(cmd);

            foreach (DataRow items in dt.Rows)
            {
                if (items[SPR_LDW_REASON].ToString().Length > 0)
                {
                    cmd = new SqlCommand();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
                    String LineType = items[SPR_LDW_LINETYPE - 1].ToString();
                    if (LineType == "Transaction")
                    {
                        LineType = "1";
                    }
                    else if (LineType == "Tax")
                    {
                        LineType = "2";
                    }
                    else if (LineType == "Discount")
                    {
                        LineType = "3";

                    }
                    else if (LineType == "Retention")
                    {
                        LineType = "4";
                    }
                    else if (LineType == "Offsetting")
                    {
                        LineType = "5";
                    }
                    else
                    {
                        LineType = "0";
                    }
                    cmd.Parameters.AddWithValue("@Docno", TranDoc);
                    cmd.Parameters.AddWithValue("@ldwoutrlinetype", LineType);
                    cmd.Parameters.AddWithValue("@ldwoutrreason", items[SPR_LDW_REASON - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrremarks", items[SPR_LDW_REMARKS - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrpayeeref", items[SPR_LDW_PAYEEREF - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrparticulars", items[SPR_LDW_PARTICULARS - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutritemcode", items[SPR_LDW_CODE - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutritemuom", items[SPR_LDW_UOM - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrqty", float.Parse(items[SPR_LDW_QUANTITY - 1].ToString()));
                    cmd.Parameters.AddWithValue("@ldwoutrucostvatex", float.Parse(items[SPR_LDW_UNITCOST - 1].ToString()));
                    cmd.Parameters.AddWithValue("@ldwoutrtaxcode", items[SPR_LDW_TAX - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutracctseg1", items[SPR_LDW_MAIN - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutracctseg2", items[SPR_LDW_PROFIT - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutracctseg3", items[SPR_LDW_COSTCENTER - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutracctseg4", items[SPR_LDW_ITEMGROUP - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrsubaccnt", items[SPR_LDW_SUBACCCOUNT - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrsltype", items[SPR_LDW_SUBSIDIARYLTYPE - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrslref", items[SPR_LDW_SUBSIDIARYREF - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrperiodfrom", items[SPR_LDW_PERIODFROM - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrperiodto", items[SPR_LDW_PERIODTO - 1].ToString());
                    cmd.Parameters.AddWithValue("@QueryType", 11);
                    cmdList.Add(cmd);
                }
            }


            cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_getTaxConvertDebitMemoLineDetailswoutRef]";
            cmd.Parameters.AddWithValue("@DOCNO", TranDoc);
            cmdList.Add(cmd);

            return base.ExecProcedure(cmdList, _ConnectionString, true);
        }

        public void deletelinedetailtotal(String TranDoc)
        {
            SqlCommand cmd = new SqlCommand();
            cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
            cmd.Parameters.AddWithValue("@Docno", TranDoc);
            cmd.Parameters.AddWithValue("@QueryType", 12);
            base.ExecProcedure(cmd, _ConnectionString, true);
        }


        public DataTable getHdrAmount(String docno)
        {
            return SFObjects.LoadDataTable($@"SELECT * FROM [AP].[fn_getdebitentryautogeneratehdr]('{docno}')", _ConnectionString);
        }
       
        public DataTable getJrnlEntry(String docno)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
            cmd.Parameters.AddWithValue("@Docno", docno);
            cmd.Parameters.AddWithValue("@QueryType", 27);
            return ExecGetData(cmd, _ConnectionString);
        }

        public DataTable getProcessData(String user)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_DebitMemoEntry]";
            cmd.Parameters.AddWithValue("@Recuser", user);
            cmd.Parameters.AddWithValue("@QueryType", 34);
            return ExecGetData(cmd, _ConnectionString);
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
                    if (Parser.ParseBool(dr[SPR3_Checkbox - 1].ToString()))
                    {
                        cmd.Connection = sqlConn;
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Transaction = sqlTrn; // Need to specify for every command
                        cmd.CommandText = storedProc;
                        cmd.Parameters.Clear();
                        cmd.Parameters.AddWithValue("@Docno", dr[SPR3_APVNO - 1].ToString());
                        cmd.Parameters.AddWithValue("@QueryType", 22);
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

        public DataTable GetLineDetailsTaxConvert(DataTable dt, String TranDoc)
        {

            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_DebitMemoEntryTaxConvert]";
            cmd.Parameters.AddWithValue("@Docno", TranDoc);
            cmd.Parameters.AddWithValue("@QueryType", 8);
            cmdList.Add(cmd);


            foreach (DataRow items in dt.Rows)
            {
                if (items[SPR_APVNO].ToString().Length > 0)
                {
                    cmd = new SqlCommand();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[AP].[nsp_DebitMemoEntryTaxConvert]";
                    String LineType = items[SPR_LD_LINETYPE - 1].ToString();

                    LineType = "1";

                    cmd.Parameters.AddWithValue("@Docno", TranDoc);
                    cmd.Parameters.AddWithValue("@ldwrlinetype", LineType);
                    cmd.Parameters.AddWithValue("@ldwrapvno", items[SPR_LD_APVNO - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwrreason", items[SPR_LD_REASON - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwrucost", items[SPR_LD_OCYAMMOUNT - 1].ToString().Replace(",", ""));
                    cmd.Parameters.AddWithValue("@ldwrucostvatex", items[SPR_LD_OCYAMMOUNTVATEX - 1].ToString().Replace(",", ""));
                    cmd.Parameters.AddWithValue("@ldwrremarks", items[SPR_LD_PARTICULARS - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwrPAYEE", items[SPR_LD_PAYEEREFCODE - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwrtaxcode", items[SPR_LD_TAX - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwracctseg1", items[SPR_LD_SEG1 - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwracctseg2", items[SPR_LD_SEG2 - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwracctseg3", items[SPR_LD_SEG3 - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwracctseg4", items[SPR_LD_SEG4 - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwracctseg5", items[SPR_LD_SEG5 - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwracctseg6", items[SPR_LD_SEG6 - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwrsubacct", items[SPR_LD_SUBACCOUNT - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwrsltype", items[SPR_LD_SUBSIDIARYLEDGERTYPE - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwrslref", items[SPR_LD_SUBSIDIARYLEDGERREF - 1].ToString());
                    cmd.Parameters.AddWithValue("@APVROWNO", items[SPR_LD_APVROWNO - 1].ToString());
                    
                    if (!string.IsNullOrEmpty(items[SPR_LD_PERIODFROM - 1].ToString()))
                        cmd.Parameters.AddWithValue("@ldwrdatefrom", items[SPR_LD_PERIODFROM - 1].ToString());

                    if (!string.IsNullOrEmpty(items[SPR_LD_PERIODTO - 1].ToString()))
                        cmd.Parameters.AddWithValue("@ldwrdateto", items[SPR_LD_PERIODTO - 1].ToString());

                    cmd.Parameters.AddWithValue("@ldwritemgrouptype", items[SPR_LD_ITEMGROUPTYPE - 1].ToString());
                    cmd.Parameters.AddWithValue("@QueryType", 9);
                    cmdList.Add(cmd);
                }
            }

           string err =  base.ExecProcedure(cmdList, _ConnectionString, true);

            return SFObjects.LoadDataTable($@"EXEC [AP].[nsp_getTaxConvertDebitMemoLineDetailswRef2] @DOCNO='{TranDoc}'", _ConnectionString);
             
        }


        public DataTable GetLineDetailsWithoutRefTaxConvertx( DataTable dt, String TranDoc)
        {

            List<SqlCommand> cmdList = new List<SqlCommand>();
            SqlCommand cmd = new SqlCommand();
            cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = "[AP].[nsp_DebitMemoEntryTaxConvert]";
            cmd.Parameters.AddWithValue("@Docno", TranDoc);
            cmd.Parameters.AddWithValue("@QueryType", 10);
            cmdList.Add(cmd);

            foreach (DataRow items in dt.Rows)
            {
                if (items[SPR_LDW_REASON].ToString().Length > 0)
                {
                    cmd = new SqlCommand();
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.Clear();
                    cmd.CommandText = "[AP].[nsp_DebitMemoEntryTaxConvert]";
                    String LineType = items[SPR_LDW_LINETYPE - 1].ToString();
                    if (LineType == "Transaction")
                    {
                        LineType = "1";
                    }
                    else if (LineType == "Tax")
                    {
                        LineType = "2";
                    }
                    else if (LineType == "Discount")
                    {
                        LineType = "3";

                    }
                    else if (LineType == "Retention")
                    {
                        LineType = "4";
                    }
                    else if (LineType == "Offsetting")
                    {
                        LineType = "5";
                    }
                    else
                    {
                        LineType = "0";
                    }
                    cmd.Parameters.AddWithValue("@Docno", TranDoc);
                    cmd.Parameters.AddWithValue("@ldwoutrlinetype", LineType);
                    cmd.Parameters.AddWithValue("@ldwoutrreason", items[SPR_LDW_REASON - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrremarks", items[SPR_LDW_REMARKS - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrpayeeref", items[SPR_LDW_PAYEEREF - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrparticulars", items[SPR_LDW_PARTICULARS - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutritemcode", items[SPR_LDW_CODE - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutritemuom", items[SPR_LDW_UOM - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrqty", items[SPR_LDW_QUANTITY - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrucostvatex", items[SPR_LDW_UNITCOST - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrtaxcode", items[SPR_LDW_TAX - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutracctseg1", items[SPR_LDW_MAIN - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutracctseg2", items[SPR_LDW_PROFIT - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutracctseg3", items[SPR_LDW_COSTCENTER - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutracctseg4", items[SPR_LDW_ITEMGROUP - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrsubaccnt", items[SPR_LDW_SUBACCCOUNT - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrsltype", items[SPR_LDW_SUBSIDIARYLTYPE - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrslref", items[SPR_LDW_SUBSIDIARYREF - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrperiodfrom", items[SPR_LDW_PERIODFROM - 1].ToString());
                    cmd.Parameters.AddWithValue("@ldwoutrperiodto", items[SPR_LDW_PERIODTO - 1].ToString());
                    cmd.Parameters.AddWithValue("@QueryType", 11);
                    cmdList.Add(cmd);
                }
            }

             base.ExecProcedure(cmdList, _ConnectionString, true);



            return SFObjects.LoadDataTable($@"EXEC [AP].[nsp_getTaxConvertDebitMemoLineDetailswoutRef2] @DOCNO='{TranDoc}'", _ConnectionString);
        }

        public DataTable DynamicAccntSegNaming()
        {

            return SFObjects.LoadDataTable($@" SELECT SegLvl, SegDesc 
                                               FROM dbo.fn_DynamicAccSegNaming
                                               ORDER BY SegLvl ASC", _ConnectionString);

        }

        public int ValidateValueDate(String LocNForm, String ValueDate)
        {
            return Convert.ToInt16(SFObjects.returnText($@"EXEC AP.nsp_DebitMemoEntry  @valuedate = '{ValueDate}', @location = '{LocNForm}', @QueryType = 36", _ConnectionString));
        }

        public int DisabledTagAutoallocateChck()
        {
            return Convert.ToInt16(SFObjects.returnText($@"SELECT PostingCombinedSeg FROM GL.JournalEntryPostingConfig", _ConnectionString));
        }

        public int ToggleOnOffAutoallocateChck(String Docno)
        {
            return Convert.ToInt16(SFObjects.returnText($@"EXEC AP.nsp_DebitMemoEntry @Docno = '{Docno}', @QueryType = 38", _ConnectionString));
        }

        public DataTable dtNewTaxConvert(String Docno, int TriggerBtn)
        {
            if (TriggerBtn == 0)
                return SFObjects.LoadDataTable($@"EXEC AP.nsp_DebitMemoEntry  @Docno = '{Docno}', @QueryType = 39", _ConnectionString);
            else 
                return SFObjects.LoadDataTable($@"EXEC AP.nsp_DebitMemoEntry  @Docno = '{Docno}', @QueryType = 40", _ConnectionString);

        }

        public string AutoallocateDisablePCCC()
        {
            return SFObjects.returnText($@"SELECT ProfitCenter FROM gl.JournalEntryPostingConfig WHERE PostingCombinedSeg = 1", _ConnectionString);
        
        }

        public string getPeriodDateValidation(String ValueDate)
        {
            return SFObjects.returnText($@"EXEC AP.nsp_DebitMemoEntry @valuedate = '{ValueDate}', @QueryType = 42", _ConnectionString); 
        }

        public DataTable getDefaultLocform(String recuser)
        {
            return SFObjects.LoadDataTable($"SELECT * FROM SG.fn_DefaultLocation('{recuser}','APVNAM')", _ConnectionString);
        }
        public string hasDataApprvDtls(string docno)
        {
            return SFObjects.returnText(string.Format($@"EXEC [AP].[nsp_DebitMemoEntry] @Docno='{docno}', @QueryType=43"), _ConnectionString);
        }
     
        public DataTable getSegmentData()
        {
            DataTable conDt = new DataTable();

            string strQuery = "EXEC AP.nsp_DebitMemoEntry @QueryType = 48";
            SqlConnection conn = new SqlConnection(_ConnectionString);
            SqlCommand cmd = new SqlCommand(strQuery, conn);
            SqlDataAdapter da = new SqlDataAdapter();

            conn.Open();
            da.SelectCommand = cmd;
            da.Fill(conDt);
            conn.Close();
            return conDt;
        }

        public string getPCCCSeg()
        {
            return SFObjects.returnText("SELECT Code FROM [SG].[fn_getPCCCSegCode]()", _ConnectionString);
        }

        public string getBranchSeg()
        {
            return SFObjects.returnText("SELECT Code FROM SG.SEGMENT WHERE LocAccountForms = 1", _ConnectionString);
        }


        public DataTable LoadAttRecords(string docno, string Trantype)
        {
            return SFObjects.LoadDataTable(string.Format(@"EXEC {0} @EntryDocNo='{1}', @TranType='{2}', @QueryType=0", EntryFileProc, docno, Trantype), _ConnectionString);
        }

        public string getlugDocAtt(string id, string trantype)
        {
            string sql = string.Format(@"EXEC {0} @DocCtrl = '{1}', @TranType = '{2}',  @QueryType = 20", EntryFileProc, id, trantype);
            return sql;
        }

        public bool DocNoReq(string id, string trantype)
        {
            string sql = string.Format(@"EXEC {0}  @Docno = '{1}', @TranType = '{2}', @QueryType = 21", EntryFileProc, id, trantype);

            return Parser.ParseBool(SFObjects.returnText(sql, _ConnectionString));
        }

        public bool DocAttReq(string id, string trantype)
        {
            string sql = string.Format(@"EXEC {0}  @Docno = '{1}', @TranType = '{2}', @QueryType = 22", EntryFileProc, id, trantype);

            return Parser.ParseBool(SFObjects.returnText(sql, _ConnectionString));
        }

        public DataTable LoadSchemaAtt()
        {
            return SFObjects.LoadDataTable(string.Format(@"EXEC {0} @QueryType = 23", EntryFileProc), _ConnectionString);
        }


        public string SaveDocAtt(DataTable dtHdr, string docno)
        {

            List<SqlCommand> cmdlist = new List<SqlCommand>();

            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.Clear();
            cmd.CommandText = EntryFileProc;
            cmd.Parameters.AddWithValue("@EntryDocNo", docno);
            cmd.Parameters.AddWithValue("@QueryType", 3);
            cmdlist.Add(cmd);

            foreach (DataRow items in dtHdr.Rows)
            {
                cmd = new SqlCommand();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Clear();
                cmd.CommandText = EntryFileProc;
                cmd.Parameters.AddWithValue("@EntryDocNo", docno);
                cmd.Parameters.AddWithValue("@DocCtrl", items["DocCtrl"].ToString());
                cmd.Parameters.AddWithValue("@FilePath", items["FilePath"].ToString());
                cmd.Parameters.AddWithValue("@RowNo", items["RowNo"].ToString());
                cmd.Parameters.AddWithValue("@Docno", items["Docno"].ToString());
                cmd.Parameters.AddWithValue("@QueryType", 1);
                cmdlist.Add(cmd);
            }

            return base.ExecProcedure(cmdlist, _ConnectionString);
        }

        public string validateReqCompliance(string docno, string dept)
        {
            //return bool.Parse(SFObjects.returnText(string.Format(@"SELECT DC.fn_valReqCompHDR('{0}', '0', 'JBOCLO')", docno), _ConnectionString));

            string strSQL = $"SELECT DC.fn_reqCompVal('{docno}', 0, 'PDMEMO', '', '')";
            return SFObjects.returnText(strSQL, _ConnectionString);
        }

        public bool DocAttReqProcess(string id, string trantype)
        {
            string sql = string.Format(@"EXEC {0} @EntryDocNo = '{1}', @TranType = '{2}', @QueryType = 24", EntryFileProc, id, trantype);

            return Parser.ParseBool(SFObjects.returnText(sql, _ConnectionString));
        }
        public bool hasLineDtls(string id)
        {
            string sql = string.Format($@"EXEC [AP].[nsp_DebitMemoEntry]  @Docno = '{id}', @QueryType = 52");

            return Parser.ParseBool(SFObjects.returnText(sql, _ConnectionString));
        }

        public bool hasDocAtt(string id)
        {
            string sql = string.Format(@"EXEC {0}  @EntryDocNo = '{1}', @QueryType = 25", EntryFileProc, id);

            return Parser.ParseBool(SFObjects.returnText(sql, _ConnectionString));
        }

        public decimal getOpenAmountLRF(string docno, int rowno, string debitmemo, bool isResetTax)
        {
            string sql = string.Format($@"SELECT [AP].[fn_dmLineDtlswRefOpenAmount]('{docno}','{rowno}', '{debitmemo}', '{isResetTax}')");

            return Parser.ParseDecimal(SFObjects.returnText(sql, _ConnectionString));
        }
        public DataTable getDefaultSegments()
        {
            return SFObjects.LoadDataTable(@"SELECT * FROM [AP].[fn_getDefaultSegments]()", _ConnectionString);
        }
        public string validateTaxType1(string taxcode)
        {
            string sql = string.Format($@"SELECT * FROM [AP].[ValidationForTaxCode]('{taxcode}', 0)");

            return SFObjects.returnText(sql, _ConnectionString);
        }
        public string getRemarksConfig()
        {
            return SFObjects.returnText(@"SELECT isAllCapital FROM dbo.RemarksConfig ", _ConnectionString);
        }
        public string getCurrency()
        {
            string sql = string.Format($@"EXEC {storedProc} @QueryType=70");

            return sql;
        }
        public DataTable getJrnlFooterValues(string docno)
        {
            return SFObjects.LoadDataTable($@"EXEC {storedProc} @Docno='{docno}', @QueryType=71", _ConnectionString);
        }
        public DataTable dtCommonSegments()
        {
            string strSQL = string.Format($@"EXEC {storedProcwRef} @QueryType=23");
            return SFObjects.LoadDataTable(strSQL, _ConnectionString);
        }
        public DataTable dtConfig()
        {
            string strSQL = string.Format($@"EXEC {storedProcwRef} @QueryType=24");
            return SFObjects.LoadDataTable(strSQL, _ConnectionString);
        }
        public DataTable getDTOrigCC(string recuser, string loc)
        {
            string strSQL = string.Format($@"EXEC {storedProcwRef} @recuser='{recuser}', @locForm='{loc}', @queryType=29");
            return SFObjects.LoadDataTable(strSQL, _ConnectionString);
        }
        public bool valRefNo(string refno, string vendor, string docno)
        {
            string strSQL = string.Format($@"EXEC {storedProc} @refno='{refno}', @payee='{vendor}', @DOCNO='{docno}', @QueryType=72");
            return Parser.ParseBool(SFObjects.returnText(strSQL, _ConnectionString));
        }
        public DataTable getExportJrnl(string docno)
        {
            string strSQL = string.Format($@"EXEC {storedProc} @Docno='{docno}', @QueryType=73");
            return SFObjects.LoadDataTable(strSQL, _ConnectionString);
        }
        public string getDocuWriterLink()
        {
            return SFObjects.returnText(string.Format(@"SELECT TOP 1 value FROM dbo.SystemConfig WHERE code ='DocuWriter_Link'"), _ConnectionString);
        }
        public DataTable getCashFlow(string reason, string igtCode)
        {
            return SFObjects.LoadDataTable($@"EXEC {storedProcwRef} @igtCode='{igtCode}', @reason='{reason}', @QueryType=35", _ConnectionString);
        }
        public DataTable getGLPerDates()
        {
            string strSQL = string.Format($@"EXEC {storedProc} @QueryType=74");
            return SFObjects.LoadDataTable(strSQL, _ConnectionString);
        }
        public DataTable getGLPeriod()
        {
            string strSQL = string.Format($@"EXEC {storedProc} @QueryType=75");
            return SFObjects.LoadDataTable(strSQL, _ConnectionString);
        }
        public bool isAllowBackdating()
        {
            string strSQL = string.Format($@"EXEC {storedProc} @QueryType=77");
            return Parser.ParseBool(SFObjects.returnText(strSQL, _ConnectionString));
        }
        public bool valValueDate(string loc)
        {
            string strSQL = string.Format($@"EXEC {storedProc} @location='{loc}', @QueryType=76");
            return Parser.ParseBool(SFObjects.returnText(strSQL, _ConnectionString));
        }

        public DataSet getGLPeriods()
        {
            string sql = $"EXEC [GL].[nsp_getGLPeriodDates] @module = 'AP', @QUERYTYPE = 1";
            return SFObjects.LoadDataSet(sql, _ConnectionString);
        }
        public string isMonthClosed(string valuedate, string module, string loc)
        {
            return SFObjects.returnText($"SELECT SG.fn_IsMonthClosed('{valuedate}', '{module}', '{loc}')", _ConnectionString);
        }

        public string revAttColor(string docno, string recuser)
        {
            return SFObjects.returnText($"SELECT DC.fn_ReviewAttachmentColor('{docno}', 0, '{recuser}')", _ConnectionString);
        }
    }
}