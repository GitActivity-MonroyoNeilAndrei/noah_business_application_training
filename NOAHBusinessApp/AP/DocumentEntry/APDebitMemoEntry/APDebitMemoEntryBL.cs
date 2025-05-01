using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;

using NoahWebLib;
using NoahWebLib.NoahWebFunction;
using NoahWebLib.NoahWebDataAccess;
using NoahWebLib.Security;
using NoahWebLib.NoahWebUI;

using System.Globalization;

using DALComponent;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Newtonsoft.Json;

namespace Noah_Web.forms_BusinessLayer
{
    public class APDebitMemoEntryBL : nwAction
    {

        #region Variables needed
        //string _strFinal = ""; // container of string result
        string _strmet = "";
        string _strParameter = "";
        string _strValue = "";
        string _strtool_Met = "";
        string _strtool_Poz = "";
        string _strtemp1 = "";
        string _strtemp2 = "";
        string _strtemp3 = "";
        string _strtemp4 = "";
        string _strtemp5 = "";
        string UserDefinedConnectionString = "";
        bool isNewRow;
        private string ToolboxOrderData = ""; // toolbox Orderby

        DataTable emptyDT = new DataTable();

        public string Result = "";
        nwEntry based = new nwEntry();
        #endregion

        #region Standard Functionality
        WebApplib WebApp = new WebApplib();
        Promptlib custom_Prompt = new Promptlib();
        nwObject nwObject = new nwObject();
        DataAccess nwDataAccess = new DataAccess();
        JSFunction custom_js = new JSFunction();
        nwAction nwAction = new nwAction();
        nwSFObjects SFObjects = new nwSFObjects();
        #endregion

        #region Debit Note with Reference
        public int
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
        SPR_CASHFLOWCODE = 34,
        SPR_CASHFLOWDESC = 35,
        SPR_SUBACCOUNT = 36,
        SPR_SUBLEDGERTYPE = 37,
        SPR_SUBSIDIARYLREF = 38,
        SPR_PERIODFROM = 39,
        SPR_PERIODTO = 40,
        SPR_DETAILS = 41,
        SPR_ISSUPPLIER = 42,
        SPR_REQSUBACCOUNT = 43,
        SPR_REQSLTYPE = 44,
        SPR_REQSLREF = 45,
        SPR_REF1 = 46,
        SPR_REF2 = 47,
        SPR_REF3 = 48,
        SPR_REF4 = 49,
        SPR_REF5 = 50,
        SPR_REF6 = 51,
        SPR_REQPERIODTOCOVER = 52,
        SPR_TAXRATE = 53,
        SPR_CLAIMEDPERCENT = 54,
        SPR_APVPCCC = 55,
        SPR_PCCC = 56,
        SPR_EmpSuppTagging = 57,
        SPR_TagTaxEnableDisable = 58,
        SPR_RCTAG = 59,
        SPR_TAXRATE2 = 60,
        SPR_SLTYPECODE = 61,
        SPR_SLREFCODE = 62;
        #endregion

        #region Debit note without Reference
        public int
        SPR_without_LINETYPE = 1,
        SPR_without_REASON = 2,
        SPR_without_REASONDESC = 3,
        SPR_without_PARTICULARS = 4,
        SPR_without_PAYEEREF = 5,
        SPR_without_ITEMGROUPTYPE = 6,
        SPR_without_ITEMGROUPTYPEDESC = 7,
        SPR_without_ITEMCODE = 8,
        SPR_without_ITEMDESC = 9,
        SPR_without_VATCODE = 10,
        SPR_without_VATDESC = 11,
        SPR_without_EWTCODE = 12,
        SPR_without_EWTDESC = 13,                
        SPR_without_DMAMOUNTVATEX = 14,
        SPR_without_DMAMOUNT = 15,
        SPR_without_SEG1 = 16,
        SPR_without_SEG2 = 17,
        SPR_without_SEG3 = 18,
        SPR_without_SEG4 = 19,
        SPR_without_SEG5 = 20,
        SPR_without_SEG6 = 21,
        SPR_without_ACCOUNTDESC = 22,
        SPR_without_CASHFLOWCODE = 23,
        SPR_without_CASHFLOWDESC = 24,
        SPR_without_SUBACCOUNT = 25,
        SPR_without_SUBSIDIARYTYPE = 26,
        SPR_without_SUBSIDIARYREF = 27,
        SPR_without_PERIODFROM = 28,
        SPR_without_PERIODTO = 29,
        SPR_without_REF1 = 30,
        SPR_without_REF2 = 31,
        SPR_without_REF3 = 32,
        SPR_without_REF4 = 33,
        SPR_without_REF5 = 34,
        SPR_without_REF6 = 35,
        SPR_without_REQSUBACCOUNT = 36,
        SPR_without_REQSLTYPE = 37,
        SPR_without_REQSLREF = 38,
        SPR_without_PAYEECODE = 39,
        SPR_without_TAXRATE = 40,
        SPR_without_CLAIMEDPERCENT = 41,
        SPR_without_EmpSuppTagging = 42,
        SPR_without_TagTaxEnableDisable = 43,
        SPR_without_APControlAcctCode = 44,
        SPR_without_APControlAcctDesc = 45,
        SPR_without_TAXRATE2 = 46,
        SPR_without_REASONTYPE = 47,
        SPR_without_SLTYPECODE = 48,
        SPR_without_SLREFCODE = 49;

        private const string
        SPRNAME_without_LINETYPE = "Line Type",
        SPRNAME_without_REASON = "Reason Code",
        SPRNAME_without_REASONDESC = "Reason Description",
        SPRNAME_without_PARTICULARS = "Particulars",
        SPRNAME_without_PAYEEREF = "Payee Reference",
        SPRNAME_without_ITEMGROUPTYPE = "Item Group Type",
        SPRNAME_without_DMAMOUNT = "DM OCY Amount (VATIN)",
        SPRNAME_without_DMAMOUNTVATEX = "DM OCY Amount (VATEX)",
        SPRNAME_without_TAXCODE = "Tax Code",
        SPRNAME_without_SEG2 = "Profit Center",
        SPRNAME_without_SEG1 = "Main",
        SPRNAME_without_SEG3 = "Cost Center",
        SPRNAME_without_SEG4 = "Item Group",
        SPRNAME_without_ACCOUNTDESC = "Account Description",
        SPRNAME_without_SUBACCOUNT = "Bank Account",
        SPRNAME_without_SUBSIDIARYTYPE = "SL Type",
        SPRNAME_without_SUBSIDIARYREF = "SL Reference",
        SPRNAME_without_PERIODFROM = "Period From",
        SPRNAME_without_PERIODTO = "Period To";

        #endregion

        #region Line Details with reference
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


        private const string
        SPRNAME_LD_LINETYPE = "Line Type",
        SPRNAME_LD_APVNO = "APV No.",
        SPRNAMENAME_LD_REASON = "Reason",
        SPRNAMENAME_LD_REASONDESC = "Reason Description",
        SPRNAME_LD_REMARKS = "Remarks",
        SPRNAME_LD_APVDATE = "APV Date",
        SPRNAME_LD_INVOICENO = "Invoice No.",
        SPRNAME_LD_INVOICEDATE = "Invoice Date",
        SPRNAME_LD_SUPPLIER = "Supplier",
        SPRNAME_LD_PARTICULARS = "Particulars",
        SPRNAME_LD_ITEMGROUPTYPE = "Item Group Type",
        SPRNAME_LD_ITEMCODE = "Item Code",
        SPRNAME_LD_DESCRIPTION = "Item Description",
        SPRNAME_LD_ITEMUOM = "Item UOM",
        SPRNAME_LD_QUANTITY = "Quantity",
        SPRNAME_LD_UNITCOSTTIN = "Unit Cost(VATIN)",
        SPRNAME_LD_UNITCOSTVATEX = "Unit Cost(VATEX)",
        SPRNAME_LD_OCY = "OCY Amount(VATEX)",
        SPRNAME_LD_PAYEEREF = "Payee Reference",
        SPRNAME_LD_PAYEEREFNAME = "Payee Reference Name",
        SPRNAME_LD_DMQTY = "DM Quantity",
        SPRNAME_LD_DMUNIT = "DM Unit Cost(VATEX)",
        SPRNAME_LD_APVAMT = "APV Amount",
        SPRNAME_LD_OCYAMMOUNT = "DM OCY Amount (VATIN)",
        SPRNAME_LD_OCYAMMOUNTVATEX = "DM OCY Amount (VATEX)",
        SPRNAME_LD_TAX = "Tax Code",
        SPRNAME_LD_PROFIT = "Profit Center",
        SPRNAME_LD_MAIN = "Main",
        SPRNAME_LD_COSTCENTER = "Cost Center",
        SPRNAME_LD_ITEMGROUP = "Item Group",
        SPRNAME_LD_ACCOUNTDESCRIPTION = "Account Description",
        SPRNAME_LD_SUBACCOUNT = "Sub Account",
        SPRNAME_LD_SUBSIDIARYLEDGERTYPE = "Subsidiary Ledger Type",
        SPRNAME_LD_SUBSIDIARYLEDGER = "Subsidiary Ledger Reference",
        SPRNAME_LD_PERIODFROM = "Period From",
        SPRNAME_LD_PERIODTO = "Period To",
        SPRNAME_LD_DETAILS = "Details";
        #endregion

        #region total APV
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

        private const string
        SPRNAME_TOTAL_APVNO = "APV No.",
        SPRNAME_TOTAL_REASON = "Reason Code",
        SPRNAME_TOTAL_REASONDESC = "Reason Description",
        SPRNAME_TOTAL_REMARKS = "Particulars",
        SPRNAME_TOTAL_APVDATE = "APV Date",
        SPRNAME_TOTAL_INVOICE = "Ref. No. (BS/SI/SOA)",
        SPRNAME_TOTAL_INVOICEDATE = "Ref. Date",
        SPRNAME_TOTAL_APVAMOUNT = "Total Amount Due",
        SPRNAME_TOTAL_DPADV = "Recoupment of DP/Advances",
        SPRNAME_TOTAL_DMAPP = "Debit Memo Applied",
        SPRNAME_TOTAL_RETENTION = "Retention",
        SPRNAME_TOTAL_NETAMT = "Net Amount Due",
        SPRNAME_TOTAL_DETAILS = "Review Attachment(s)";
        #endregion

        #region LD WITHOUT REF
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
        SPR_LDW_REQPERIODTOCOVER = 32,
        SPR_LDW_TAXRATE = 33,
        SPR_LDW_CLAIMEDPERCENT = 34;

        private const string
        SPRNAME_LDW_REASON = "Reason",
        SPRNAME_LDW_REASONDESC = "Reason Description",
        SPRNAME_LDW_REMARKS = "Remarks",
        SPRNAME_LDW_PAYEEREF = "Payee Reference",
        SPRNAME_LDW_PAYEEREFNAME = "Payee Reference Name",
        SPRNAME_LDW_LINETYPE = "Line Type",
        SPRNAME_LDW_PARTICULARS = "Particulars",
        SPRNAME_LDW_CODE = "Item Code",
        SPRNAME_LDW_ITEMDESC = "Item Description",
        SPRNAME_LDW_UOM = "Item UOM",
        SPRNAME_LDW_QUANTITY = "Quantity",
        SPRNAME_LDW_UNITCOST = "Unit Cost(VATEX)",
        SPRNAME_LDW_OCY = "OCY Amount(VATEX)",
        SPRNAME_LDW_TAX = "Tax Code",
        SPRNAME_LDW_PROFIT = "Profit Center",
        SPRNAME_LDW_MAIN = "Main",
        SPRNAME_LDW_COSTCENTER = "Cost Center",
        SPRNAME_LDW_ITEMGROUP = "Item Group",
        SPRNAME_LDW_ACCOUNTDESC = "Account Description",
        SPRNAME_LDW_SUBACCCOUNT = "Sub Account",
        SPRNAME_LDW_SUBSIDIARYLTYPE = "Subsidiary Ledger Type",
        SPRNAME_LDW_SUBSIDIARYREF = "Subsidiary Ledger Reference",
        SPRNAME_LDW_PERIODFROM = "Period From",
        SPRNAME_LDW_PERIODTO = "Period To";

        #endregion

        #region Journal Entries
        private const int
        SPR_JE_SEG1 = 1,
        SPR_JE_SEG2 = 2,
        SPR_JE_SEG3 = 3,
        SPR_JE_SEG4 = 4,
        SPR_JE_SEG5 = 5,
        SPR_JE_SEG6 = 6,        
        SPR_JE_AccontDesc = 7,
        SPR_JE_Currency = 8,
        SPR_JE_Ocy = 9,
        SPR_JE_LocalDebit = 10,
        SPR_JE_LocalCredit = 11,
        SPR_JE_HomeDebit = 12,
        SPR_JE_HomeCredit = 13,
        SPR_JE_SubAccount = 14,
        SPR_JE_PayeeRef = 15,
        SPR_JE_SubLedtype = 16,
        SPR_JE_SubLedger = 17,
        SPR_JE_CASHFLOW = 18;

        private const string
        SPRNAME_JE_AccountCode = "Account Code",
        SPRNAME_JE_AccontDesc = "Account Description",
        SPRNAME_JE_Currency = "Currency",
        SPRNAME_JE_Ocy = "OCY Amount",
        SPRNAME_JE_LocalDebit = "Local Amount Debit",
        SPRNAME_JE_LocalCredit = "Local Amount Credit",
        SPRNAME_JE_HomeDebit = "Home Amount Debit",
        SPRNAME_JE_HomeCredit = "Home Amount Credit",
        SPRNAME_JE_SubAccount = "Bank Account",
        SPRNAME_JE_PayeeRef = "Payee Reference",
        SPRNAME_JE_SubLedtype = "SL Type",
        SPRNAME_JE_SubLedger = "SL Reference",
        SPRNAME_JE_CASHFLOW = "Cash Flow Type";
        #endregion

        #region Grid6
        const int
        SPR_DOCNOCNTRLNO = 2,
        SPR_DL = 4;
        #endregion

        #region Grid6_Name
        const string
        SPRKEYNAME_DOCCODE = "Document Code",
        SPRKEYNAME_DOCDESC = "Document",
        SPRKEYNAME_DOCNO = "Document No.",
        SPRKEYNAME_ATTACH = "",
        SPRKEYNAME_DL = "",
        SPRKEYNAME_REMOVE = "";
        #endregion


        // (Document Attachment Related)
        const int
                        SPR_DOCCODE = 1,
                        SPR_DOCDESC = 2,
                        SPR_DOCNO = 3,
                        SPR_ATTACH = 4,
                        SPR_VIEW = 5,
                        SPR_REMOVE = 6,
                        SPR_FILEPATH = 7;

        const string
                       SPRNAME_DOCCODE = "Document Code",
                       SPRNAME_DOCDESC = "Document",
                       SPRNAME_DOCNO = "Document No.",
                       SPRNAME_ATTACH = "",
                       SPRNAME_VIEW = "",
                       SPRNAME_REMOVE = "";




        private const int
        SPR_APPLYDATE = 1,
        SPR_APPLYTO = 2,
        SPR_AMOUNT = 3,
        SPR_STATUS = 4,
        SPR_OPENAMOUNTDETAILS = 5;

        private const string
        SPRNAME_APPLYDATE = "Apply Date",
        SPRNAME_APPLYTO = "Apply To",
        SPRNAME_AMOUNT = "Apply Amount",
        SPRNAME_STATUS = "Status",
        SPRNAME_OPENAMOUNTDETAILS = "Open Amount";


        //for line details
        private const int
        SPR_APPLYDATE2 = 1,
        SPR_APPLYTO2 = 2,
        SPR_AMOUNT2 = 3,
        SPR_STATUS2 = 4,
        SPR_OPENAMOUNTDETAILS2 = 5;

        private const string
        SPRNAME_APPLYDATE2 = "Apply Date",
        SPRNAME_APPLYTO2 = "Apply To",
        SPRNAME_AMOUNT2 = "Apply Amount",
        SPRNAME_STATUS2 = "Status",
        SPRNAME_OPENAMOUNTDETAILS2 = "Open Amount";
        
        //Process
        int SPR3_Checkbox = 1,
            SPR3_APVNO = 2,
            SPR3_ValueDate = 3,
            SPR3_LOCATION = 4,
            SPR3_PayeeCode = 5,
            SPR3_PayeeName = 6,
            SPR3_CURRENCY = 7,
            SPR3_DMAMT = 8,
            SPR3_REMARKS = 9,
            SPR3_isValid = 10;

        // for approval
        private const int
        SPR_APPROVALLEVEL = 1,
        SPR_APPROVALCODE = 2,
        SPR_APPROVALNAME = 3,
        SPR_APPROVALTYPE = 4;

        private const string
        SPRNAME_APPROVALLEVEL = "Approval Level",
        SPRNAME_APPROVALCODE = "Code",
        SPRNAME_APPROVALNAME = "Approver Name";

        public static string nwDocno = string.Empty;

        GetSegmentData getSgmntData = new GetSegmentData();


        public void main(ref string strFinal, string strmet,
           string strParameter, string strValue, string strtool_Met,
           string strtool_Poz, string strtemp1, string strtemp2,
           string strtemp3, string strtemp4, string strtemp5, ref nwEntry baseds, string UserDefinedConnection)
        {

            _strmet = strmet;
            _strParameter = strParameter;
            _strValue = strValue;
            _strtool_Met = strtool_Met;
            _strtool_Poz = strtool_Poz;
            _strtemp1 = strtemp1;
            _strtemp2 = strtemp2;
            _strtemp3 = strtemp3;
            _strtemp4 = strtemp4;
            _strtemp5 = strtemp5;
            based = baseds;
            this.UserDefinedConnectionString = UserDefinedConnection;
            //Addchars();
            dal = new APDebitMemoEntryDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
            if (_strmet == "get_Initialize") strFinal = get_Initialize();
            else if (_strmet == "func_Toolbox") strFinal = func_Toolbox(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "get_LookUp") strFinal = get_LookUp(strtool_Met, strtool_Poz, strParameter, strValue);                        
            else if (_strmet == "getToolBoxData") strFinal = getToolBoxData(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "get_Method") strFinal = get_Method(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "act_Method") strFinal = act_Method(strtool_Met, strParameter, strValue);
            else strFinal = js.makeJSPostScript("alert('error:" + strmet + " not excute');");


            Result = strFinal;
        }

        public string strConn = "";
        string RecordOperationResult = String.Empty;
        APDebitMemoEntryDAL dal;
        //int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public APDebitMemoEntryBL()
        {
            //dal = new DataAccessLayer(this.UserDefinedConnectionString,""); 
        }

        #region Dont Change

        public string func_Toolbox(string strMethod, string poz, string strParameter, string strValue)
        {

            try
            {
                WebApp = new WebApplib(strParameter, strValue);
                int pozt = -1;
                try { pozt = Convert.ToInt32(poz); }
                catch { }
                try
                {

                    isNewRow = WebApp.nwobjectBool("isNewRow");
                }
                catch { }
                string strF = "";
                #region do not change (calling RecordOperation)
                switch (strMethod)
                {
                    case "0":
                        RecordOperation(eRecordOperation.AddNew, pozt);
                        break;
                    case "1":
                        RecordOperation(eRecordOperation.Save, pozt);
                        if (String.IsNullOrEmpty(RecordOperationResult) == true) strF = "isNewRow=false;" + strF;
                        break;
                    case "2":
                        RecordOperation(eRecordOperation.Delete, pozt);
                        break;
                    case "3":
                        RecordOperation(eRecordOperation.Refresh, pozt);
                        break;
                    case "4":
                        RecordOperation(eRecordOperation.Inquire, pozt);
                        break;
                    case "5":
                        RecordOperation(eRecordOperation.Process, pozt);
                        break;
                    case "6":
                        RecordOperation(eRecordOperation.Import, pozt);
                        break;
                    case "7":
                        RecordOperation(eRecordOperation.Export, pozt);
                        break;
                    case "8":
                        RecordOperation(eRecordOperation.Print, pozt);
                        break;
                    case "9":
                        RecordOperation(eRecordOperation.Closing, pozt);
                        break;
                    case "10":
                        RecordOperation(eRecordOperation.Search, pozt);
                        break;
                }
                #endregion
                //strF += ";" + Prompt.Excute();
                strF += execute();
                return js.makeJSPostScript(strF);

            }
            catch (Exception err)
            {
                return err.ToString();
            }
        }
        public string get_LookUp(string strSearch, string poz, string strParameter, string strValue)
        {
            string strFinal = "";
            WebApp = new WebApplib(strParameter, strValue);
            strFinal += get_Method(strSearch, poz, strParameter, strValue);
            if (strFinal.Trim() == "") strFinal = "<tr><td>Error Occur.<td></tr>";
            strFinal = js.makeHTML("#menuCreatorContainer .tablecontainter", strFinal);
            strFinal = js.makeJSPostScript(strFinal);
            return strFinal;
        }      
        #endregion

        public string get_Method(string strMethod, string strSearchVal, string strParameter, string strValue)
        {
            WebApp = new WebApplib(strParameter, strValue);
            DataTable dtLookupConfig = WebApp.get_LookupConfig();
            nwObject.LookupConfig(dtLookupConfig);

            string strFinal = "";
            string strSQL = "";
            string mouseDownFunc = "";
            string mouseOverFunc = "";
            //string strName = "";
            strConn = this.UserDefinedConnectionString;
            string Payee = WebApp.nwobjectText("idvallugPayee");
            string Location = WebApp.nwobjectText("idvallugLocForm");
            string TradeType = WebApp.nwobjectText("TradeType");
            string TranNo = WebApp.nwobjectText("TranNo");

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.inquireQuery(based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnAlignRight(6);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;              
                case "getlugLocForm":
                    string trantype = WebApp.nwobjectText("TranType");
                    strSQL = dal.lugLocForm(trantype, based.SecurityAccess.RecUser);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnSort("Code", "Asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugPayeeType":
                    strSQL = dal.lugPayeeType();
                    nwObject.ColumnSort("Code", "Asc");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSubPayee":
                    string payeetype = WebApp.nwobjectText("idvallugPayeeType");
                    strSQL = dal.lugSubPayee(payeetype);
                    nwObject.ColumnSort("Code", "Asc");
                    strMethod = strMethod.Substring(3);                   
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugPayee":
                    string payeetype1 = WebApp.nwobjectText("idvallugPayeeType");
                    string payeeSub = WebApp.nwobjectText("idvallugSubPayee");
                    //strSQL = dal.lugPayee(WebApp.nwobjectText("idvallugLocForm"));

                    if (dal.getlugPayeeConfig())
                    {
                        //With Advanced Lookup										
                        if (strSearchVal.Trim() == "")
                        {
                            nwObject.nodataString = "<i class='text-red'>Please enter Payee Code or Payee Name or Currency or TIN to search data!</i>";
                            nwObject.nodataStringCount = dal.getlugPayeeCount(WebApp.nwobjectText("idvallugLocForm"));
                        }

                        strSQL = dal.getlugPayee(WebApp.nwobjectText("idvallugLocForm"), strSearchVal, 1);
                    }
                    else
                    {
                        //Without Advanced Lookup										
                        strSQL = dal.getlugPayee(WebApp.nwobjectText("idvallugLocForm"), strSearchVal, 0);
                    }

                    nwObject.ColumnSort("Code", "Asc");
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    //nwObject.ColumnHide(5);
                    //nwObject.ColumnHide(6);
                    nwObject.ColumnHide(7);
                    nwObject.ColumnHide(8);
                    nwObject.ColumnHide(9);
                    nwObject.ColumnHide(10);
                    nwObject.ColumnHide(11);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getdoccontrol":
                    strSQL = dal.getdocctrl(WebApp.nwobjectText("txtDMno"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                #region Debit Note with Reference
                //Start of Debit Note with Reference
                case "getlugAPVNo_DebitwRef":
                    string filter = WebApp.nwobjectText("filter");
                    strSQL = dal.getAPVNowRef(filter, Payee, Location);
                    nwObject.ColumnHide(8);
                    nwObject.ColumnHide(9);
                    nwObject.ColumnHide(10);
                    //nwObject.ColumnHide(10);
                    nwObject.ColumnAlignRight(5);
                    nwObject.ColumnAlignRight(6);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugRsn_DebitwRef":
                    strSQL = dal.getReason();
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugPayee_DebitwRef":                    
                    strSQL = dal.lugPayeeRef(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("igtCode"), WebApp.nwobjectText("itemCode"));
                    nwObject.ColumnSort("Payee Code", "Asc");
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    nwObject.ColumnHide(5);
                    nwObject.ColumnHide(6);
                    nwObject.ColumnHide(7);
                    nwObject.ColumnHide(8);
                    nwObject.ColumnHide(9);
                    nwObject.ColumnHide(10);
                    nwObject.ColumnHide(11);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugIGT_DebitwRef":                    
                    strSQL = dal.getIGTwRef(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("vendor"), WebApp.nwobjectText("rsnCode"), WebApp.nwobjectText("rsntype"));
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    nwObject.ColumnHide(5);
                    nwObject.ColumnHide(6);
                    nwObject.ColumnHide(7);
                    nwObject.ColumnHide(8);
                    //nwObject.ColumnHide(9);
                    nwObject.ColumnHide(10);
                    nwObject.ColumnHide(11);
                    nwObject.ColumnHide(12);
                    nwObject.ColumnHide(13);
                    nwObject.ColumnHide(14);
                    nwObject.ColumnHide(15);
                    nwObject.ColumnHide(16);
                    nwObject.ColumnSort("Description", "ASC");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugItemCode_DebitwRef":
                    strSQL = dal.getItemCodewRef(WebApp.nwobjectText("igtCode"), WebApp.nwobjectText("vendor"), WebApp.nwobjectText("rsnCode"), WebApp.nwobjectText("rsntype"), WebApp.nwobjectText("idvallugLocForm"));
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    //nwObject.ColumnHide(5);
                    nwObject.ColumnHide(6);
                    //nwObject.ColumnHide(7);
                    nwObject.ColumnHide(8);
                    nwObject.ColumnHide(9);
                    nwObject.ColumnHide(10);
                    nwObject.ColumnHide(11);
                    nwObject.ColumnHide(12);
                    nwObject.ColumnHide(13);
                    nwObject.ColumnHide(14);
                    nwObject.ColumnHide(15);
                    nwObject.ColumnHide(16);
                    nwObject.ColumnHide(17);
                    nwObject.ColumnHide(19);
                    nwObject.ColumnHide(20);
                    nwObject.ColumnHide(21);
                    nwObject.ColumnSort("Description", "ASC");
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugVAT_DebitwRef":
                    strSQL = dal.getVatCodewRef();
                    nwObject.ColumnSort("Code", "ASC");
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugEWT_DebitwRef":
                    strSQL = dal.getEwtCodewRef();
                    nwObject.ColumnSort("Code", "ASC");
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSeg1_DebitwRef":
                    strSQL = dal.getSeg1();
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    nwObject.ColumnHide(5);
                    nwObject.ColumnHide(6);
                    nwObject.ColumnSort("Description", "ASC");
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSeg2_DebitwRef":
                    strSQL = dal.getSegment("02", WebApp.nwobjectText("idvallugLocForm"), based.SecurityAccess.RecUser);
                    nwObject.ColumnSort("Description", "ASC");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSeg3_DebitwRef":
                    strSQL = dal.getSegment("03", WebApp.nwobjectText("idvallugLocForm"), based.SecurityAccess.RecUser);
                    nwObject.ColumnSort("Description", "ASC");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSeg4":
                    strSQL = dal.getSegment("04", WebApp.nwobjectText("idvallugLocForm"), based.SecurityAccess.RecUser);
                    nwObject.ColumnSort("Description", "ASC");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSeg5":
                    strSQL = dal.getSegment("05", WebApp.nwobjectText("idvallugLocForm"), based.SecurityAccess.RecUser);
                    nwObject.ColumnSort("Description", "ASC");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSeg6":
                    strSQL = dal.getSegment("06", WebApp.nwobjectText("idvallugLocForm"), based.SecurityAccess.RecUser);
                    nwObject.ColumnSort("Description", "ASC");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSLType_DebitwRef":
                    strSQL = dal.getSLType(WebApp.nwobjectText("seg1"));
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSLRef_DebitwRef":
                    strSQL = dal.getSLRef(WebApp.nwobjectText("sltype"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugBankAccnt_DebitwRef":
                    strSQL = dal.getsubaccount(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("seg1"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                #endregion

                #region Debit Note without Reference               
                //Start of Debit Note without Reference
                case "getlugReason_DebitwoRef":
                    strSQL = dal.getReasonwoRef(WebApp.nwobjectText("txtDMno"));
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    nwObject.ColumnHide(5);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugPayeeRef_DebitwoRef":
                    strSQL = dal.lugPayeeRef(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("igtCode"), WebApp.nwobjectText("itemCode"));
                    nwObject.ColumnSort("Payee Code", "Asc");
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    nwObject.ColumnHide(5);
                    nwObject.ColumnHide(6);
                    nwObject.ColumnHide(7);
                    nwObject.ColumnHide(8);
                    nwObject.ColumnHide(9);
                    nwObject.ColumnHide(10);
                    nwObject.ColumnHide(11);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugIGT_DebitwoRef":
                    strSQL = dal.getIGTwRef(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("vendor"), WebApp.nwobjectText("rsnCode"), WebApp.nwobjectText("rsntype"));
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    nwObject.ColumnHide(5);
                    nwObject.ColumnHide(6);
                    nwObject.ColumnHide(7);
                    nwObject.ColumnHide(8);
                    //nwObject.ColumnHide(9);
                    nwObject.ColumnHide(10);
                    nwObject.ColumnHide(11);
                    nwObject.ColumnHide(12);
                    nwObject.ColumnHide(13);
                    nwObject.ColumnHide(14);
                    nwObject.ColumnHide(15);
                    nwObject.ColumnHide(16);
                    nwObject.ColumnSort("Description", "ASC");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugItemCode_DebitwoRef":
                    strSQL = dal.getItemCodewRef(WebApp.nwobjectText("igtCode"), WebApp.nwobjectText("vendor"), WebApp.nwobjectText("rsnCode"), WebApp.nwobjectText("rsntype"), WebApp.nwobjectText("idvallugLocForm"));
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    //nwObject.ColumnHide(5);
                    nwObject.ColumnHide(6);
                    //nwObject.ColumnHide(7);
                    nwObject.ColumnHide(8);
                    nwObject.ColumnHide(9);
                    nwObject.ColumnHide(10);
                    nwObject.ColumnHide(11);
                    nwObject.ColumnHide(12);
                    nwObject.ColumnHide(13);
                    nwObject.ColumnHide(14);
                    nwObject.ColumnHide(15);
                    nwObject.ColumnHide(16);
                    nwObject.ColumnHide(17);
                    nwObject.ColumnHide(19);
                    nwObject.ColumnHide(20);
                    nwObject.ColumnHide(21);
                    nwObject.ColumnSort("Description", "ASC");
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugVAT_DebitwoRef":
                    strSQL = dal.getVatCodewRef();
                    nwObject.ColumnSort("Code", "ASC");
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugEWT_DebitwoRef":
                    strSQL = dal.getEwtCodewRef();
                    nwObject.ColumnSort("Code", "ASC");
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, this.UserDefinedConnectionString, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSeg1_DebitwoRef":
                    strSQL = dal.getSeg1();
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    nwObject.ColumnHide(5);
                    nwObject.ColumnHide(6);
                    nwObject.ColumnSort("Description", "ASC");
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSeg2_DebitwoRef":
                    strSQL = dal.getSegment("02", WebApp.nwobjectText("idvallugLocForm"), based.SecurityAccess.RecUser);
                    nwObject.ColumnSort("Description", "ASC");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSeg3_DebitwoRef":
                    strSQL = dal.getSegment("03", WebApp.nwobjectText("idvallugLocForm"), based.SecurityAccess.RecUser);
                    nwObject.ColumnSort("Description", "ASC");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSeg4_DebitwoRef":
                    strSQL = dal.getSegment("04", WebApp.nwobjectText("idvallugLocForm"), based.SecurityAccess.RecUser);
                    nwObject.ColumnSort("Description", "ASC");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSeg5_DebitwoRef":
                    strSQL = dal.getSegment("05", WebApp.nwobjectText("idvallugLocForm"), based.SecurityAccess.RecUser);
                    nwObject.ColumnSort("Description", "ASC");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSeg6_DebitwoRef":
                    strSQL = dal.getSegment("06", WebApp.nwobjectText("idvallugLocForm"), based.SecurityAccess.RecUser);
                    nwObject.ColumnSort("Description", "ASC");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSLType_DebitwoRef":
                    strSQL = dal.getSLType(WebApp.nwobjectText("seg1"));
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSLRef_DebitwoRef":
                    strSQL = dal.getSLRef(WebApp.nwobjectText("sltype"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugBankAccnt_DebitwoRef":
                    strSQL = dal.getsubaccount(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("seg1"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugAPControlAccnt":
                    strSQL = dal.getlugControlAccount(WebApp.nwobjectText("txtDMno"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                #endregion

                case "getdebitlinedetailsapvno":
                    strSQL = dal.getlinedetailsapvno(Payee, Location, WebApp.nwobjectText("apvLineDetailsFilter"), TradeType == "TR" ? "1" : "0", TranNo);
                    nwObject.ColumnHide(2);
                    //nwObject.ColumnHide(11);
                    nwObject.ColumnHide(12);
                    nwObject.ColumnHide(13);
                    nwObject.ColumnHide(14);
                    nwObject.ColumnHide(15);
                    nwObject.ColumnHide(16);
                    nwObject.ColumnHide(17);
                    nwObject.ColumnHide(18);
                    nwObject.ColumnHide(19);
                    nwObject.ColumnHide(20);
                    nwObject.ColumnHide(21);
                    nwObject.ColumnHide(22);
                    nwObject.ColumnHide(23);
                    nwObject.ColumnHide(24);               
                    nwObject.ColumnHide(25);
                    nwObject.ColumnHide(26);
                    nwObject.ColumnHide(27);
                    nwObject.ColumnHide(28);
                    nwObject.ColumnHide(29);
                    nwObject.ColumnHide(30);
                    nwObject.ColumnHide(31);
                    nwObject.ColumnHide(32);
                    nwObject.ColumnHide(33);
                    nwObject.ColumnHide(35);
                    //nwObject.ColumnHide(36);
                    //nwObject.ColumnHide(37);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getdebitldwrefreason":
                    strSQL = dal.getReason();
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlindetailswithreftax":
                    strSQL = dal.gettax();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


                case "getlinedetailswwrefprofitcenter":
                    //strSQL = dal.getprofitcenter();
                    strSQL = dal.getprofitcenter(WebApp.nwobjectText("APVNoPerRow"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


                case "getlinedetailswrefmain":
                    strSQL = dal.getSeg1();
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    nwObject.ColumnHide(5);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlinedetailswrefcost":
                    //strSQL = dal.getcostcenter();
                    strSQL = dal.getcostcenter(WebApp.nwobjectText("APVNoPerRow"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlinedetailswrefSeg4":
                    strSQL = dal.getSegment("04");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlinedetailswrefSeg5":
                    strSQL = dal.getSegment("05");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlinedetailswrefSeg6":
                    strSQL = dal.getSegment("06");
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlinedetailswrefsubaccount":
                    strSQL = dal.getsubaccount(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("MainCodeforsubaccount"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


                case "getlinedetailswrefsubledtype":
                    strSQL = dal.getSLType(WebApp.nwobjectText("MainCodeforsubledgertype"));
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlinedetailswrefsubledref":
                    strSQL = dal.getSLRef(WebApp.nwobjectText("SLTYPEforsubledgerref"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


                case "getlinedetailswoutreason":
                    strSQL = dal.getReason();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


                case "getlinedetailswoutpayee":
                    strSQL = dal.lugdebitwithoutref(based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


                case "getlinedetailswoutitemcode":
                    strSQL = dal.getitemmaster();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlinedetailswoutitemuom":
                    strSQL = dal.getuom(WebApp.nwobjectText("itemmaster"));
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlinedetailswouttax":
                    strSQL = dal.gettax();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlinedetailswoutprofit":
                    strSQL = dal.getSegment(WebApp.nwobjectText("MainCodeforsubledgertype"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlinedetailswoutmain":
                    strSQL = dal.getSeg1();
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


                case "getlinedetailswoutcostcenter":
                    strSQL = dal.getcostcenter();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlinedetailswoutitemgroup":
                    strSQL = dal.getitemgroup(WebApp.nwobjectText("TradeType"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlinedetailswoutsubacc":
                    strSQL = dal.getsubaccount(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("MainCodeforsubaccount"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


                case "getlinedetailswoutsltype":
                    strSQL = dal.getSLType(WebApp.nwobjectText("MainCodeforsubledgertype"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlinedetailswoutslref":
                    strSQL = dal.getSLRef(WebApp.nwobjectText("SLTYPEforsubledgerref"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugTotalAPV":
                    filter = WebApp.nwobjectText("filterx");
                    strSQL = dal.gettotalapvno(filter, Payee, Location, TradeType == "TR" ? "1" : "0", TranNo, WebApp.nwobjectText("idvallugCurrency"));
                    nwObject.ColumnHide(10);
                    nwObject.ColumnHide(11);
                    nwObject.ColumnAlignRight(4);
                    nwObject.ColumnAlignRight(5);
                    nwObject.ColumnAlignRight(6);
                    nwObject.ColumnAlignRight(7);
                    nwObject.ColumnAlignRight(8);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "gettotalreason":
                    strSQL = dal.getReason();
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugselectapproverallowselection":
                    strSQL = dal.getapprover(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("TranType"), WebApp.nwobjectText("ApprovalLevel"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

   
                case "getlugDocAtt":
                    strSQL = dal.getlugDocAtt(getCodeAtt_List(), WebApp.nwobjectText("txtTranTypeAtt"));
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnSort("Code", "ASC");
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugCurrency":
                    strSQL = dal.getCurrency();
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnSort("Code", "ASC");
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

            }
            return strFinal;
        }

        private void InitializeValues() {
            DataTable dt = new DataTable();
            nwToolBox.bindingNavigatorSaveItem.Enable = true;
            nwToolBox.bindingNavigatorAddNewItem.Enable = true;
            nwToolBox.bindingNavigatorPrintItem.Enable =
            nwToolBox.bindingNavigatorPrintItem.Visible =
            nwToolBox.bindingNavigatorProcessItem.Enable =
            nwToolBox.bindingNavigatorImportItem.Visible =
            nwToolBox.bindingNavigatorDeleteItem.Visible =
            nwToolBox.bindingNavigatorExportItem.Enable = false;
            js.makeValueText("#txtValueDate", SFObject.GetServerDateTime(this.UserDefinedConnectionString).ToString("MM/dd/yyyy"));

            dt = dal.getDefaultLocform(based.SecurityAccess.RecUser);

            if (dt.Rows.Count > 0)
            {
                js.makeValueText("#idvallugLocForm", dt.Rows[0]["LocForm Code"].ToString());
                js.makeValueText("#descvallugLocForm", dt.Rows[0]["LocForm Description"].ToString());

                if (dal.valValueDate(dt.Rows[0]["LocForm Code"].ToString()))
                {
                    Prompt.Error("Cannot proceed. Period is already closed.", "AP Debit Memo Entry");
                    js.makeValueText("#txtValueDate", "");
                }
            }
        }

        ///// Standard RecordOperation 

        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";
            DataTable dt = new DataTable();

            switch (i)
            {
                case eRecordOperation.AddNew:
                    InitializeValues();
                    break;

                case eRecordOperation.Save:
                    RecordOperationResult = ValidateData();
                    String locform = WebApp.nwobjectText("idvallugLocForm");
                    String year = dal.getdocnoyear(locform);
                    String docno = String.Empty;
                    //if (RecordOperationResult.Length <= 0)
                    //{
                    //    docno = isNewRow ? dal.getdocno(locform, year, "PDMEMO") : WebApp.nwobjectText("txtDMno");
                    //    if (docno.Length == 0)
                    //        RecordOperationResult += "Cannot be saved. Cannot Generated Transaction No. No Setup found.\n";
                    //}
                    if (RecordOperationResult.Length <= 0)
                    {
                        RecordOperationResult = dal.SaveData(LoadSchema(docno), WebApp.nwobjectText("TranType"), based.SecurityAccess.RecUser, isNewRow);
                        //js.ADD("toolboxrefresh()");
                    }
                    else
                    {
                        Prompt.Information(RecordOperationResult, based.Title);
                    }
                    break;

                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("txtDMno"));
                    if (RecordOperationResult.Length == 0)
                    {
                        Prompt.Information("Delete successfully", based.Title);
                        RefreshData();
                        js.ADD("toolboxrefresh()");
                    }
                    break;

                case eRecordOperation.Process:
                    CreateProcessGrid(true);
                    break;

                case eRecordOperation.Refresh:
                    RefreshData();                                      
                    break;
                case eRecordOperation.Inquire:
                    tempstr = "inqure";
                    break;

                case eRecordOperation.Import:
                    tempstr = "import";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Export:

                    string LISTINGFILENAME = "";
                    if (dal.LISTINGFILENAME + " Listing" == "") LISTINGFILENAME = "Sheet 1";
                    else LISTINGFILENAME = dal.LISTINGFILENAME + " Listing";

                    ListingAndPrint frmlist = new ListingAndPrint
                                                           (ListingAndPrint.FormType.Listing, dal.LISTINGSTARTROW, dal.LISTINGQUERY(),
                                                           LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                           SFObject.returnText("select [SG].[getEmpName]('" + based.SecurityAccess.RecUser + "')", this.UserDefinedConnectionString), LISTINGFILENAME);

                    //## FOR EXPORTING ###
                    Random rnd = new Random();
                    string SessionID = DateTime.Now.ToString("yyyyddMMhhmmss") + rnd.Next(0, 9999).ToString().PadRight(4, '0');
                    HttpContext.Current.Session["Config_" + SessionID] = frmlist.m_Spread.ExportConfig();
                    HttpContext.Current.Session["Data_" + SessionID] = frmlist.m_Spread.GetDataSource();
                    HttpContext.Current.Session["Filename_" + SessionID] = LISTINGFILENAME;
                    HttpContext.Current.Session["Header_" + SessionID] = "0";
                    js.ADD("ExportSessionID='" + SessionID + "'");
                    //## END ##

                    js.Show("#nwExportContainerMain", 0);
                    js.ADD(frmlist.CreateScript());


                    break;
                case eRecordOperation.Print:
                    tempstr = "print";
                    if (Parser.ParseDecimal(WebApp.nwobjectText("total")) > 0)
                    {
                        PrintPreview(WebApp.nwobjectText("txtDMno"));
                    }
                    else
                    {
                        Prompt.Error("Cannot be printed. No Debit Memo details provided.", based.Title);
                    }                    
                    // Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Closing:
                    tempstr = "closing";
                    Prompt.Information(tempstr, based.Title);
                    break;
                case eRecordOperation.Search:
                    tempstr = "search";
                    //Prompt.Information(tempstr, based.Title);
                    break;
            }

            if (RecordOperationResult != String.Empty)
            {
                if (RecordOperationResult.ToLower().IndexOf("success") >= 0 || RecordOperationResult.ToLower().IndexOf("completed") >= 0)
                {
                    //js.ADD("loc_LookupInquireWithValue('" + WebApp.nwobjectText("txtCode") + "') ");
                    RefreshData();
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    Prompt.Information(RecordOperationResult, based.Title);

                }
                else
                {
                    if (RecordOperationResult.IndexOf("Error") != 0)
                        Prompt.Error(RecordOperationResult, based.Title);
                    else
                        Prompt.Error(RecordOperationResult, based.Title);

                }
            }
        }

        ////////////////////// For Customize 
        public string get_Initialize()
        {
            string strFinal = "";

            SetBindings();
            Main_Load();

            execute(ref strFinal);

            return js.makeJSPostScript(strFinal);
        }
        public string act_Method(string strMethod, string strParameter, string strValue)
        {
            //string strFinal = "", strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();                   
                    js.ADD("nwLoading_End('xactBindCollection');");
                    break;

                case "actBindCollectionEmpty":
                    js.ADD("nwLoading_End('actBindCollectionEmpty')");
                    break;
                case "actHasRqrdCompli":
                    setRqmtComliProp();
                    js.ADD("nwLoading_End('actHasRqrdCompli')");
                    break;
                case "actGridDebitWithReference":
                    GetDefaultCC();
                    DefaultValues();
                    String isValidEntries = string.Empty;
                    if (WebApp.nwobjectText("IsTaxConvert") != "0" && WebApp.nwobjectText("IsTaxConvert") != "2")
                    {
                        if (WebApp.nwobjectText("IsTaxConvert") == "1")
                            isValidEntries = DebitwRefValidation(WebApp.nwobjectText("IsTaxConvert") == "1" ? "tax convert" : "save");
                        else
                            isValidEntries = DebitwRefValidation(WebApp.nwobjectText("IsTaxConvert") == "2" ? "reset tax" : "save");

                        if (isValidEntries.Length > 0)
                        {
                            Prompt.Information(isValidEntries, based.Title);
                            js.ADD("nwLoading_End('xLodingDMBtn');");
                            break;
                        }
                        else
                        {
                            goto GenerateGridWithRef;
                        }
                    }
                    else {
                        goto GenerateGridWithRef;
                    }

                    GenerateGridWithRef:
                    {
                        CreateDebitwRefGrid(true);
                        //js.ADD("makeparticulargreendbnotewref()");
                    }
                    js.ADD("DisableColBranch(); nwLoading_End('xLodingDMBtn');");
                    break;

                case "actDMwithRefDetails":
                    GenerateGridDetails(true);
                    break;

                case "actCreateDebitwRefGrid_CloseTrig":
                    CreateDebitwRefGrid(true);
                    js.ADD("DisableColBranch(); nwLoading_End('actCreateDebitwRefGrid_CloseTrig');");
                    break;

                case "actGridDebitWithoutReference":
                    GetDefaultCC();
                    DefaultValues();
                    String isValidEntries2 = string.Empty;
                    if (WebApp.nwobjectText("IsTaxConvert") != "0" && WebApp.nwobjectText("IsTaxConvert") != "2")
                    {
                        //isValidEntries2 = debitmemoentrywithoutrefvalidation(WebApp.nwobjectText("IsTaxConvert") == "2" ? "reset tax" : "save");

                        if (WebApp.nwobjectText("IsTaxConvert") == "1")
                            isValidEntries2 = ValidateDebitNotewoRef(WebApp.nwobjectText("IsTaxConvert") == "1" ? "tax convert" : "saved");
                        else
                            isValidEntries2 = ValidateDebitNotewoRef(WebApp.nwobjectText("IsTaxConvert") == "2" ? "reset tax" : "saved");

                        if (isValidEntries2.Length > 0)
                        {
                            Prompt.Information(isValidEntries2, based.Title);
                            js.ADD("nwLoading_End('xdebitnotewoutreftaxConvert')");
                            break;
                        }
                        else
                        {
                            goto GenerateGridWithoutRef;
                        }
                    }
                    else {
                        goto GenerateGridWithoutRef;
                    }

                    GenerateGridWithoutRef: {
                        CreateDebitwoRefGrid(true);
                        //js.ADD("makeparticulargreendbnotewoutref()");
                    }

                    js.ADD("DisableColBranch();nwLoading_End('xLodingDMBtn');");

                    js.ADD("nwLoading_End('xdebitnotewoutreftaxConvert')");
                    break;

                case "actGridLineDetails":
                    String isValidEntries3 = string.Empty;
                    if (WebApp.nwobjectText("IsTaxConvert") != "0")
                    {
                        if (WebApp.nwobjectText("IsTaxConvert") == "1")
                            isValidEntries3 = linedetailswrefvalidation(WebApp.nwobjectText("IsTaxConvert") == "1" ? "Tax Convert" : "Save");
                        else
                            isValidEntries3 = linedetailswrefvalidation(WebApp.nwobjectText("IsTaxConvert") == "2" ? "Reset Tax" : "Save");

                        if (isValidEntries3.Length > 0)
                        {
                            Prompt.Information(isValidEntries3, based.Title);
                            js.ADD("nwLoading_End('xactGridLineDetails')");
                            break;
                        }
                        else
                        {
                            goto GenerateGridLineDetailswithRef;
                        }
                    }
                    else {
                        goto GenerateGridLineDetailswithRef;
                    }

                    GenerateGridLineDetailswithRef:
                    {
                        GenerateLineDetails(true);
                        js.ADD("makeparticulargreenldwref()");
                    }
                    js.ADD("DisableColBranch();nwLoading_End('xactGridLineDetails');");

                    js.ADD("nwLoading_End('xactGridLineDetails')");
                    break;
                case "actGridLineDetails2":
                    GenerateGridDetailsLD(true);
                    break;
                case "actGridLineDetailsWithout":
                    GenerateGridLDWithout(true);
                    js.ADD("makeparticulargreenldwoutref()");
                    break;

                case "actGridTotalAPV":
                    CreateTotalAPVGrid(true);
                    js.ADD("nwLoading_End('xLodingDMBtn');");
                    break;

                case "actGridJE":
                    DataTable dtFooter = new DataTable();
                    dtFooter = dal.getJrnlFooterValues(WebApp.nwobjectText("txtDMno"));
                    if (dtFooter.Rows.Count > 0)
                    {
                        js.makeValueText("#txtJESub", dtFooter.Rows[0]["netOfVAT"].ToString());
                        js.makeValueText("#txtVat", dtFooter.Rows[0]["addVAT"].ToString());
                        js.makeValueText("#txtVatafter", dtFooter.Rows[0]["grossAmount"].ToString());
                        js.makeValueText("#txtEWT", dtFooter.Rows[0]["lessEWT"].ToString());
                        js.makeValueText("#txtNetAmount", dtFooter.Rows[0]["netAmount"].ToString());
                        js.makeValueText("#txtDPAdv", dtFooter.Rows[0]["dpadvAmount"].ToString());
                        js.makeValueText("#txtDMApp", dtFooter.Rows[0]["dmAmount"].ToString());
                        js.makeValueText("#txtRetention", dtFooter.Rows[0]["retAmount"].ToString());
                        js.makeValueText("#txtTotalAmt", dtFooter.Rows[0]["totalAmount"].ToString());
                    }
                    CreateJrnlGrid(true);
                    js.ADD("nwLoading_End('xLodingDMBtn');");
                    break;

                case "actApproval":
                    GenerateGridApproval(true);
                    js.ADD("nwLoading_End('xactApproval')");
                    break;

                case "actloadattachment":
                    GenerateGrid6(true);
                    js.ADD("nwLoading_End('xactloadattachment')");
                    break;

                case "actsetforex":
                    String loc = WebApp.nwobjectText("idvallugLocForm");
                    String valuedate = WebApp.nwobjectText("txtValueDate");
                    String currency = WebApp.nwobjectText("idvallugCurrency");
                    DateTime serverdate = SFObjects.GetServerDateTime(this.UserDefinedConnectionString).Date;
                    DataTable dt = new DataTable();
                    bool isempty = true;
                    dt = dal.setforex(serverdate.ToString("MM/dd/yyyy"), loc, currency);
                    foreach (DataRow dr in dt.Rows)
                    {
                        isempty = false;
                        js.makeValueText("#txtlocalforex", dr[1].ToString());
                        js.makeValueText("#txtHomeforex", dr[0].ToString());
                        try
                        {
                            if (dt.Rows[0][2].ToString().Trim() != "")
                                Prompt.Information(dt.Rows[0][2].ToString(), based.Title);
                        }
                        catch { }
                    }
                    if (isempty)
                    {
                        js.makeValueText("#txtlocalforex", "1.00000");
                        js.makeValueText("#txtHomeforex", "1.00000");

                    }
                    js.ADD("nwLoading_End('actsetforex')");
                    break;

                case "actSaveAttachment":
                    saveAttachment();
                    js.ADD("nwLoading_End('xactSaveAttachment')");
                    break;

                //Debit Note With Reference Saving
                case "actDebitwRefSave":
                    isValidEntries = DebitwRefValidation("be saved");
                    if (isValidEntries.Length > 0)
                    {
                        Prompt.Error(isValidEntries, based.Title);
                    }
                    else
                    {
                        DataTable dt1 = new DataTable();
                        DataSet ds1 = WebApp.DataSet("nwGridDebitNoteWithRefereceCon");
                        if (ds1.Tables.Count > 0)
                        {
                            dt1 = ds1.Tables[0];
                        }

                        RecordOperationResult = dal.SaveAndExitDebitwRef(WebApp.nwobjectText("TranNo"), dt1, (WebApp.nwobjectBool("chckAutoAllocate") ? 1 : 0), WebApp.nwobjectText("ifTaxConvertIsClick"));
                        Prompt.Information(RecordOperationResult, based.Title);
                        js.ADD("nwPopupForm_HideModal('nwGenerateGriddebitwith')");
                    }
                    GenHdrAmountFields();
                    js.ADD("nwLoading_End('xactDebitwRefSave')");
                    break;

                case "actdebitnotewoutrefsaveandexit":
                    isValidEntries2 = ValidateDebitNotewoRef("saved");
                    if (isValidEntries2.Length > 0)
                    {
                        Prompt.Information(isValidEntries2, based.Title);
                    }
                    else
                    {
                        DataTable dt2 = new DataTable();
                        DataSet ds2 = WebApp.DataSet("nwGridDebitNoteWithoutRefereceCon");
                        if (ds2.Tables.Count > 0)
                        {
                            dt2 = ds2.Tables[0];
                        }

                        RecordOperationResult = dal.SaveAndExitDebitwoRef(WebApp.nwobjectText("TranNo"), dt2, WebApp.nwobjectText("flag"), WebApp.nwobjectText("idvallugAPControlAccnt"));
                        //     dal.debitnotewithoutref(WebApp.nwGridData(WebApp.nwobjectText("nwGridDebitNoteWithoutRefereceCon")), WebApp.nwobjectText("TranNo"));
                        Prompt.Information(RecordOperationResult, based.Title);
                        js.ADD("nwPopupForm_HideModal('nwGenerateGriddebitwithout')");
                    }
                    GenHdrAmountFields();
                    js.ADD("nwLoading_End('xdebitnotewoutrefsaveExit')");
                    break;

                case "actlinedetailwrefsaveandexit":
                    isValidEntries3 = linedetailswrefvalidation("Save");
                    if (isValidEntries3.Length > 0)
                    {
                        Prompt.Information(isValidEntries3, based.Title);
                    }
                    else
                    {
                        DataTable dt3 = new DataTable();
                        DataSet ds3 = WebApp.DataSet("nwGridDebitNoteWithoutRefereceCon");
                        if (ds3.Tables.Count > 0)
                        {
                            dt3 = ds3.Tables[0];
                        }

                        RecordOperationResult = dal.deletelinedetailwrefdetails(WebApp.nwobjectText("TranNo"), dt3);
                        //   dal.savelinedetailwrefdetails( WebApp.nwobjectText("TranNo"));
                        Prompt.Information(RecordOperationResult, based.Title);
                        js.ADD("nwPopupForm_HideModal('nwGenerateGridLineDetails')");
                    }
                    GenHdrAmountFields();
                    js.ADD("nwLoading_End('xactlinedetailwrefsaveandexit')");
                    break;

                case "actlinedetailwoutrefsaveandexit":
                    String isValidEntries4 = linedetailswoutrefvalidation();
                    if (isValidEntries4.Length > 0)
                    {
                        Prompt.Information(isValidEntries4, based.Title);
                    }
                    DataTable dt4 = new DataTable();
                    DataSet ds4 = WebApp.DataSet("nwGridLDWithout");
                    if (ds4.Tables.Count > 0)
                    {
                        dt4 = ds4.Tables[0];
                    }
                    else
                    {
                        RecordOperationResult = dal.deletelinedetailwoutrefdetails(WebApp.nwobjectText("TranNo"), dt4);
                        //           dal.savelinedetailwoutrefdetails(, WebApp.nwobjectText("TranNo"));
                        Prompt.Information(RecordOperationResult, based.Title);
                        js.ADD("nwPopupForm_HideModal('nwGenerateGridLDWithout')");
                    }
                    GenHdrAmountFields();

                    break;


                case "acttotalsaveandexit":
                    String isValidEntries5 = totalrefvalidation();
                    if (isValidEntries5.Length > 0)
                    {
                        Prompt.Error(isValidEntries5, based.Title);
                    }
                    else
                    {
                        DataTable dt5 = new DataTable();
                        DataSet ds5 = WebApp.DataSet("nwGridLDTotalAPV");
                        if (ds5.Tables.Count > 0)
                        {
                            dt5 = ds5.Tables[0];
                        }
                        dal.deletelinedetailtotal(WebApp.nwobjectText("TranNo"));
                        dal.SaveTotalAPV(dt5, WebApp.nwobjectText("TranNo"));
                        Prompt.Information("Saved successfully.", based.Title);
                        js.ADD("nwPopupForm_HideModal('nwGenerateGridTotalAPV')");
                    }
                    GenHdrAmountFields();
                    js.ADD("nwLoading_End('xtotalsaveExit')");
                    break;
                case "actsetgenerate":
                    GenHdrAmountFields();
                    break;


                case "actprocess":
                    RecordOperationResult = Processvalidation();
                    if (RecordOperationResult.Length <= 0)
                    {
                        string recuser = based.SecurityAccess.RecUser;
                        DataTable dt6 = new DataTable();
                        DataSet ds6 = WebApp.DataSet("nwGridCon3");
                        if (ds6.Tables.Count > 0)
                        {
                            dt6 = ds6.Tables[0];
                        }
                        //DataTable dtProcess = WebApp.nwGridData(WebApp.nwobjectText("nwGridCon3"));
                        RecordOperationResult = dal.MultiUpdateProcess(dt6, recuser);

                        if (RecordOperationResult.Contains("Cannot"))
                        {
                            Prompt.Error(RecordOperationResult, based.Title);
                        }
                        else
                        {
                            Prompt.Information(RecordOperationResult, based.Title);
                            js.ADD("processclose();");
                            RefreshData();
                        }                                             
                    }
                    else
                    {                       
                        Prompt.Error(RecordOperationResult, based.Title);
                    }
                    js.ADD("nwLoading_End('xactprocess')");
                    break;              

                case "actValueDateValidation":


                    if (dal.getPeriodDateValidation(WebApp.nwobjectText("txtValueDate")).Length > 0) {
                        Prompt.Information(dal.getPeriodDateValidation(WebApp.nwobjectText("txtValueDate")), based.Title);
                        js.makeValueText("#txtValueDate", "");
                    }
                    else if (dal.ValidateValueDate(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("txtValueDate")) > 0)
                    {
                        Prompt.Information("Cannot save. The period is already closed.\n", based.Title);
                        js.makeValueText("#txtValueDate", "");
                    }
                    else
                        js.ADD("setforex();");

                    break;

                case "actClearDebitNoteWithRefUponAutoallocate":
                    CreateDebitwRefGrid(false);
                    js.ADD("nwLoading_End('xAutoAllocateTag');");
                    break;

                case "actTagColor":
                    js.ADD("tagColor();");
                    break;

                case "actloadatt":
                    CreateDocAtt(true);
                    js.ADD("nwLoading_End('xactloadatt')");
                    break;
                case "actsaveAtt":
                    saveAtt();
                    js.ADD("nwLoading_End('xactsaveAtt')");
                    break;

                case "actLoadCommonSegments":
                    LoadCommonSegments();
                    break;

                case "actLoadCommonSegmentsDMwoRef":                 
                    LoadCommonSegmentsDmwoRef();
                    break;

                case "actLoadTotalAmounts":
                    LoadTotalAmounts();
                    break;

                case "actRefNoValidation":
                    bool validRefNo = dal.valRefNo(WebApp.nwobjectText("txtref"), WebApp.nwobjectText("idvallugPayee"), WebApp.nwobjectText("txtDMno"));
                    if (validRefNo)
                    {
                        Prompt.Error("Cannot proceed. Reference No. already exists for the selected Vendor/Payee.", based.Title);
                        js.makeValueText("#txtref", "");
                    }
                    break;

                case "actSetForex":
                    GetForexRates();
                    break;

                case "actExportJrnl":
                    ExportExcel("Journal Entries", dal.getExportJrnl(WebApp.nwobjectText("txtDMno")));
                    js.ADD("$('#btnnwExport').click();");
                    js.ADD("nwLoading_End('xbtnExportJrnl')");
                    break;

                case "actLoadCashFlow":
                    LoadCashFlow();
                    break;

                case "actVal_ValueDate":
                    if (dal.valValueDate(WebApp.nwobjectText("idvallugLocForm")))
                    {
                        Prompt.Error("Cannot proceed. Period is already closed.", "AP Debit Memo Entry");
                        js.makeValueText("#txtValueDate", "");
                    }
                    break;

                case "actValDate":
                    string errorMsg = string.Empty;
                    errorMsg = dal.isMonthClosed(WebApp.nwobjectText("txtValueDate"), "AP", WebApp.nwobjectText("idvallugLocForm"));
                    if (errorMsg != string.Empty)
                    {
                        Prompt.Error(errorMsg, based.Title);
                        js.makeValueText("#txtValueDate", "");
                    }      
                    else
                    {
                        js.ADD("setforex();");
                    }      
                    break;

                default:
                    Prompt.Information("act_Method not found: " + strMethod, "Error");
                    break;
            }
            return js.makeJSPostScript(execute());
        }
        public string getToolBoxData(string tableName, string getMethod, string strParameter, string strValue)
        {
            string strFinal = ""; string sql = "";
            WebApp = new WebApplib(strParameter, strValue);
                        
            switch (getMethod)
            {
                case "toolbox":                    
                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "AP DM No";
                    string codevalue = WebApp.nwobjectText("codevalue");
                    if (string.IsNullOrEmpty((nwDocno == "" ? codevalue : nwDocno)))
                        strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(based.SecurityAccess.RecUser), this.UserDefinedConnectionString);
                    else
                        strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetDataView((nwDocno == "" ? codevalue : nwDocno)), this.UserDefinedConnectionString);
                    break;
            }

            return strFinal;
        }


        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#txtDMno", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AP Dm No");
            SFObject.SetControlBinding("#cbtrade", "Prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "Trade");
            SFObject.SetControlBinding("#cbpnontrade", "Prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "NonTrade");
            SFObject.SetControlBinding("#idvallugLocForm", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LocCode");
            SFObject.SetControlBinding("#descvallugLocForm", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LocDesc");
            SFObject.SetControlBinding("#idvallugPayeeType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PayeeTypeCode");
            SFObject.SetControlBinding("#descvallugPayeeType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PayeeTypeDesc");
            SFObject.SetControlBinding("#idvallugSubPayee", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PayeeSubTypeCode");
            SFObject.SetControlBinding("#descvallugSubPayee", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PayeeSubTypeDesc");
            SFObject.SetControlBinding("#idvallugPayee", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PayeeCode");
            SFObject.SetControlBinding("#descvallugPayee", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PayeeDesc");
            SFObject.SetControlBinding("#txtTin", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TIN");
            SFObject.SetControlBinding("#txtPayeeAdress", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PayeeAddress");
            SFObject.SetControlBinding("#txtDateSubmitted", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SubmittedDate");
            SFObject.SetControlBinding("#txtDatePosted", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PostedDate");
            SFObject.SetControlBinding("#txtlocalforex", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LocalForex");
            SFObject.SetControlBinding("#txtHomeforex", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "HomeForex");
            SFObject.SetControlBinding("#txtref", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RefNo");
            SFObject.SetControlBinding("#txtRefDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "refDate");
            SFObject.SetControlBinding("#txtRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Remarks");
            SFObject.SetControlBinding("#txtApDmStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Status");
            SFObject.SetControlBinding("#txtReasonDisApproval", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "reasondesc");
            SFObject.SetControlBinding("#txtDissRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "disapprovalremarks");
            SFObject.SetControlBinding("#idvallugRsnDisapproval", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "reason");
            SFObject.SetControlBinding("#descvallugRsnDisapproval", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "reasondesc");
            SFObject.SetControlBinding("#idvallugCurrency", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CurrencyCode");
            SFObject.SetControlBinding("#descvallugCurrency", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CurrencyDesc");
            SFObject.SetControlBinding("#txtValueDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "VALUEDATE");

            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RecUser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "RecDate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "ModUser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "ModDate");
        }

        private void BindCollection()
        {
            //DocumentAttachmentProp();
            //ApprovalDetailsProp();

            //String CheckIfAutoposted = dal.checkisautoposted(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("TranType"));
            //String CheckIfRequireAmnt = dal.checkisrequiredamount(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("TranType"));
            //String CheckAllowSelectionofapprover = dal.checkisallowselection(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("TranType"));
            //if (CheckAllowSelectionofapprover.Length > 0)
            //    js.ADD("$('#btnSelectAppDetails').enable(true);");
            //else
            //    js.ADD("$('#btnSelectAppDetails').enable(false);");


            GenHdrAmountFields();

            //js.ADD("PostautoRefreshMainGrid();");
            js.ADD($@"setBtnRqmtCompli({(dal.hasSavedRqrdCompli(WebApp.nwobjectText("txtDMno")) ? "1" : "''")})");
        }
        private void DocumentAttachmentProp()
        {
            //int hasData = 0;
            //hasData = Parser.ParseInt(dal.hasAttachment(WebApp.nwobjectText("txtDMno")));
            //if (hasData == 1)
            //{ js.ADD("$('#btnDocumentAttached').addClass('btn-default-green')"); }
            //else
            //{ js.ADD("$('#btnDocumentAttached').removeClass('btn-default-green')"); }
            if (dal.hasDocAtt(WebApp.nwobjectText("txtDocnoAtt")))
            {
                js.ADD("$('#btnDocumentAttached').addClass('btn-default-green'); $('#btnDocumentAttached').removeClass('btn-default-orange');");
            }
            else
            {
                js.ADD("$('#btnDocumentAttached').removeClass('btn-default-green'); $('#btnDocumentAttached').addClass('btn-default-orange');");
            }

        }
        private void ApprovalDetailsProp()
        {
            int hasData = 0;
            hasData = Parser.ParseInt(dal.hasDataApprvDtls(WebApp.nwobjectText("txtDMno")));
            if (hasData == 1)
            { js.ADD("$('#btnSelectAppDetails').addClass('btn-default-green'); $('#btnSelectAppDetails').removeClass('btn-default-orange');"); }
            else
            { js.ADD("$('#btnSelectAppDetails').removeClass('btn-default-green'); $('#btnSelectAppDetails').addClass('btn-default-orange');"); }
        }
        private string ValidateData()
        {
            string errorResult = String.Empty;

            if (WebApp.nwobjectText("idvallugLocForm").Length <= 0)
                errorResult += "Cannot be saved. Location is required.\n";

            if (WebApp.nwobjectText("idvallugPayee").Length <= 0)
                errorResult += "Cannot be saved. Vendor/Payee is required.\n";

            if (WebApp.nwobjectText("idvallugCurrency").Length <= 0)
                errorResult += "Cannot be saved. Currency is required.\n";

            if (WebApp.nwobjectText("txtref").Length > 0) {
                if (WebApp.nwobjectText("txtRefDate").Length <= 0) {
                    errorResult += "Cannot be saved. Ref. Date is required.\n";
                }
            }

            if (WebApp.nwobjectText("txtRefDate").Length > 0)
            {
                if (WebApp.nwobjectText("txtref").Length <= 0)
                {
                    errorResult += "Cannot be saved. Reference No. is required.\n";
                }
            }
            if (dal.valRefNo(WebApp.nwobjectText("txtref"), WebApp.nwobjectText("idvallugPayee"), WebApp.nwobjectText("txtDMno")))
            {
                errorResult += "Cannot be saved. Reference No. already exists for the selected Vendor/Payee.\n";
            }

            if (!ValidateDate(WebApp.nwobjectText("txtValueDate")))
            {
                errorResult += "Cannot be saved. Value Date is required.\n";
            }

            if (WebApp.nwobjectText("txtRemarks").Length <= 0)
                errorResult += "Cannot be saved. Remarks is required.\n";


            String loc = WebApp.nwobjectText("idvallugLocForm");
            String valuedate = WebApp.nwobjectText("txtValueDate");
            String currency = WebApp.nwobjectText("idvallugCurrency");
            DataTable dt = dal.setforex(valuedate, loc, currency);
            foreach (DataRow dr in dt.Rows)
            {
                js.makeValueText("#txtlocalforex", dr[1].ToString());
                js.makeValueText("#txtHomeforex", dr[0].ToString());
                try
                {
                    if (dt.Rows[0][2].ToString().Trim() != "" && loc != string.Empty && currency != string.Empty)
                        errorResult += dt.Rows[0][2].ToString().Replace("Cannot proceed", "Cannot be saved") + "\n";
                }
                catch { }
            }

            return errorResult;
        }

        private DataTable LoadSchema(String docno)
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema();
            #endregion
            String Istrade = WebApp.nwobjectText("cbtrade");
            String Trade = string.Empty;
            if (Istrade == "true" || Istrade == "1")
            {
                Trade = "0";
            }
            else
            {
                Trade = "1";
            }

            DataRow dr = dtHDR.NewRow();
            dr["DOCNO"] = docno;
            dr["TRADE"] = Trade;
            dr["LOCACCTFORMS"] = WebApp.nwobjectText("idvallugLocForm");
            dr["PAYEETYPE"] = WebApp.nwobjectText("idvallugPayeeType");
            dr["PAYEESUBTYPE"] = WebApp.nwobjectText("idvallugSubPayee");
            dr["PAYEE"] = WebApp.nwobjectText("idvallugPayee");
            dr["TIN"] = WebApp.nwobjectText("txtTin");
            dr["PAYEEADDRESS"] = WebApp.nwobjectText("txtPayeeAdress");
            dr["CURRENCY"] = WebApp.nwobjectText("idvallugCurrency");
            dr["REFDATE"] = WebApp.nwobjectText("txtRefDate").Equals("") ? (object)DBNull.Value : WebApp.nwobjectText("txtRefDate");
            dr["LOCALFOREX"] = string.IsNullOrEmpty(WebApp.nwobjectText("txtlocalforex")) ? "1.00000" : WebApp.nwobjectText("txtlocalforex");
            dr["HOMEFOREX"] = string.IsNullOrEmpty(WebApp.nwobjectText("txtHomeforex")) ? "1.00000" : WebApp.nwobjectText("txtHomeforex");
            dr["REFNO"] = WebApp.nwobjectText("txtref");
            dr["REMARKS"] = Parser.ParseBool(dal.getRemarksConfig()) ? WebApp.nwobjectText("txtRemarks").ToUpper() : WebApp.nwobjectText("txtRemarks");
            dr["VALUEDATE"] = WebApp.nwobjectText("txtValueDate").Equals("") ? (object)DBNull.Value : WebApp.nwobjectText("txtValueDate");
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion

            return dtHDR;
        }


        private void Main_Load()
        {

            if (based.isInterface == true) dal.UpdateVersion();
            js.ADD("toolboxsetter()");
            js.makeValueText("#txtserverlink", dal.ServerLink());
            js.makeValueText("#txtserverlink2", dal.ServerLink2());
            js.makeValueText("#txtServerdate", SFObject.GetServerDateTime(this.UserDefinedConnectionString).ToString("MM/dd/yyyy"));           
            js.ADD("currentRecUser = '" + based.SecurityAccess.RecUser + "';");

            DateTime currentDate = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
            js.ADD("CurrentServerDate = '" + currentDate.ToString("MM/dd/yyyy") + "';");
            js.ADD("mainLoad();");
            js.makeValueText("#txtBranchSeg", dal.getBranchSeg());
            js.makeValueText("#txtPCCCSeg", dal.getPCCCSeg());
            DefaultValues();
            DataSet ds = dal.getGLPeriods();
            if (ds.Tables.Count > 0)
            {
                if (ds.Tables.Count >= 1)
                {
                    js.ADD($"jsonPerDates = {DatatableToJson(ds.Tables[0])}");

                }
                if (ds.Tables.Count >= 1)
                {
                    js.ADD($"jsonPerDatesClosing = {DatatableToJson(ds.Tables[1])}");
                }
            }
            if (dal.isAllowBackdating())
            {
                js.ADD("$('#valdatehdr').show();");
            }
            else
            {
                js.ADD("$('#valdatehdr').hide();");
            }
        }

        private void RefreshData()
        {
            js.ADD("ClearFields();");
            js.ADD("func_Toolbox_Clear(); nwParameter_Add('nwDocno', nwDocno);");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData          
            js.ADD("RefreshData()");
            nwDocno = WebApp.nwobjectText("nwDocno");
        }


        public void CreateDebitwRefGrid(bool isInitialize)
        { 
            #region GRID
            var m_spread = new nwGrid("nwGridDebitNoteWithRefereceCon");
            var gridID = "nwGridDebitNoteWithRefereceCon";
            m_spread.Type = nwGridType.SpreadCanvas;

            m_spread.CreateExcelGrid(5, SPR_TAXRATE2);
            m_spread.TableHeight(325);
            String isTaxConvert = string.Empty;


            var dtdetails = new DataTable();
            var row = 1;
            DataTable dt = new DataTable();
            if (isInitialize)
            {
                isTaxConvert = WebApp.nwobjectText("IsTaxConvert");
                if (isTaxConvert == "1")
                {
                    DataTable dt1 = new DataTable();
                    DataSet ds = WebApp.DataSet("nwGridDebitNoteWithRefereceCon");
                    if (ds.Tables.Count > 0)
                    {
                        dt1 = ds.Tables[0];
                    }
                    string temp = dal.DebitNotewithrefGetTaxConvert(dt1, WebApp.nwobjectText("txtDMno"), (WebApp.nwobjectBool("chckAutoAllocate") ? 1 : 0));
                    if (temp != string.Empty)
                    {
                        dt = dal.getTaxConvertDMwRef(WebApp.nwobjectText("txtDMno"));
                        //dt.Rows.Add();
                        m_spread.dataSource(dt);
                        m_spread.minRow(dt.Rows.Count);
                    }
                }
                else if (isTaxConvert == "2")
                {
                    if ((WebApp.nwobjectBool("chckAutoAllocate") ? 1 : 0) == 0)
                    {
                        DataTable dt1 = new DataTable();
                        DataSet ds = WebApp.DataSet("nwGridDebitNoteWithRefereceCon");
                        if (ds.Tables.Count > 0)
                        {
                            dt1 = ds.Tables[0];
                        }
                        dt = RemoveTaxConvertDebitMemowNote(dt1);
                        //dt.Rows.Add();
                        m_spread.dataSource(dt);
                        m_spread.minRow(dt.Rows.Count + 1);
                    }
                    else
                    {
                        // 0 - fresh from clicking the Debit Note with reference button before clicking the reset tax
                        // 1 - already clicked the tax button and he/ she re-reset tax again.
                        dt = dal.dtNewTaxConvert(WebApp.nwobjectText("txtDMno"), 0);
                        //dt.Rows.Add();
                        m_spread.dataSource(dt);
                        m_spread.minRow(dt.Rows.Count + 1);
                    }
                }
                else
                {
                    if (Parser.ParseBool(WebApp.nwobjectText("isCloseRevAt")))
                    {
                        DataTable dt1 = new DataTable();
                        DataSet ds = WebApp.DataSet("nwGridDebitNoteWithRefereceCon");
                        if (ds.Tables.Count > 0)
                        {
                            dt1 = ds.Tables[0];
                        }
                        int rowno = Parser.ParseInt(WebApp.nwobjectText("Rowno"));
                        dt = dt1;
                        dt.Rows[rowno][SPR_RCTAG - 1] = dal.revAttColor(dt.Rows[rowno][SPR_APVNO - 1].ToString(), based.SecurityAccess.RecUser);
                    }
                    else
                    {
                        dt = dal.getDebitwRefRefresh(WebApp.nwobjectText("txtDMno"));
                    }
                    ////dt.Rows.Add();
                    m_spread.dataSource(dt);
                    m_spread.minRow(dt.Rows.Count);

                    if (dt.Rows.Count <= 0 && !Parser.ParseBool(WebApp.nwobjectText("isCloseRevAt")))
                    {
                        m_spread.maxRow(5);
                        m_spread.minRow(5);
                    }
                }
                if (WebApp.nwobjectBool("chckAutoAllocate"))
                {
                    m_spread.nwobject(SPR_APVAMOUNT - 1).Width(0);
                    m_spread.nwobject(SPR_OPENAMOUNT - 1).Width(0);
                }
                else
                {
                    m_spread.nwobject(SPR_APVAMOUNT - 1).Width(150);
                    m_spread.nwobject(SPR_OPENAMOUNT - 1).Width(150);
                }
            }
            else
            {
                m_spread.minRow(1);
            }

            if (!isInitialize)
            {
                if (WebApp.nwobjectBool("chckAutoAllocate"))
                {
                    m_spread.nwobject(SPR_APVAMOUNT - 1).Width(0);
                    m_spread.nwobject(SPR_OPENAMOUNT - 1).Width(0);
                }
                else
                {
                    m_spread.nwobject(SPR_APVAMOUNT - 1).Width(150);
                    m_spread.nwobject(SPR_OPENAMOUNT - 1).Width(150);
                }
            }

            #region Colunm Name
            m_spread.nwobject(SPR_LINETYPE - 1).ColumnName("Line Type");
            m_spread.nwobject(SPR_APVNO - 1).ColumnName("APV No.");
            m_spread.nwobject(SPR_APVDATE - 1).ColumnName("APV Date");
            m_spread.nwobject(SPR_INVOICENO - 1).ColumnName("Ref No. (BI/SI/SOA)");
            m_spread.nwobject(SPR_INVOICEDATE - 1).ColumnName("Ref. Date");
            m_spread.nwobject(SPR_REASON - 1).ColumnName("Reason Code");
            m_spread.nwobject(SPR_REASONDESC - 1).ColumnName("Reason Description");
            m_spread.nwobject(SPR_PARTICULARS - 1).ColumnName("Particulars");
            m_spread.nwobject(SPR_PAYEEREF - 1).ColumnName("Payee Reference");
            m_spread.nwobject(SPR_ITEMGROUPTYPEDESC - 1).ColumnName("Item Group Type");
            m_spread.nwobject(SPR_ITEMDESC - 1).ColumnName("Item");
            m_spread.nwobject(SPR_VATDESC - 1).ColumnName("VAT Short Description");
            m_spread.nwobject(SPR_EWTDESC - 1).ColumnName("EWT Short Description");
            m_spread.nwobject(SPR_APVAMOUNT - 1).ColumnName("Net Amount Due");
            m_spread.nwobject(SPR_OPENAMOUNT - 1).ColumnName("Outstanding Balance");
            m_spread.nwobject(SPR_DVAMOUNT - 1).ColumnName("DM OCY Amount (VATIN)");
            m_spread.nwobject(SPR_DVAMOUNTVATEX - 1).ColumnName("DM OCY Amount (VATEX)");
            m_spread.nwobject(SPR_VAT - 1).ColumnName("VAT");
            m_spread.nwobject(SPR_EWT - 1).ColumnName("EWT");
            m_spread.nwobject(SPR_NETAMT - 1).ColumnName("Net Amount");
            m_spread.nwobject(SPR_ACCOUNTDESC - 1).ColumnName("Account Description");
            m_spread.nwobject(SPR_SUBACCOUNT - 1).ColumnName("Bank Account");
            m_spread.nwobject(SPR_SUBLEDGERTYPE - 1).ColumnName("SL Type");
            m_spread.nwobject(SPR_SUBSIDIARYLREF - 1).ColumnName("SL Reference");
            m_spread.nwobject(SPR_PERIODFROM - 1).ColumnName("Period From");
            m_spread.nwobject(SPR_PERIODTO - 1).ColumnName("Period To");
            m_spread.nwobject(SPR_DETAILS - 1).ColumnName("Review Attachment(s)");
            m_spread.nwobject(SPR_APVPCCC - 1).ColumnName("APV and PCCC");
            m_spread.nwobject(SPR_PCCC - 1).ColumnName("PCCC");
            m_spread.nwobject(SPR_PAYEEREFCODE - 1).ColumnName("Payee Reference Code");
            m_spread.nwobject(SPR_EmpSuppTagging - 1).ColumnName("Employee / Supplier Tagging");
            m_spread.nwobject(SPR_TagTaxEnableDisable - 1).ColumnName("Tagging Enable Disable without TIN");
            m_spread.nwobject(SPR_TAXRATE2 - 1).ColumnName("Tax Rate 2");
            m_spread.nwobject(SPR_CASHFLOWCODE - 1).ColumnName("Cash Flow Type Code");
            m_spread.nwobject(SPR_CASHFLOWDESC - 1).ColumnName("Cash Flow Type Description");
            #endregion

            #region Column Required
            m_spread.nwobject(SPR_APVNO - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_REASON - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_PAYEEREF - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_ITEMGROUPTYPEDESC - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_VATDESC - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_EWTDESC - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_SEG1 - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_SEG2 - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_SEG3 - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_SEG4 - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_SEG5 - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_SEG6 - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_DVAMOUNT - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_DVAMOUNTVATEX - 1).HeaderFieldRequired(true);                    
            #endregion

            #region Column Background Color
            m_spread.nwobject(SPR_LINETYPE - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_REASON - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_REASONDESC - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_APVDATE - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_INVOICENO - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_ACCOUNTDESC - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_APVAMOUNT - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_OPENAMOUNT - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_DVAMOUNTVATEX - 1).BackgroundColor("White");
            m_spread.nwobject(SPR_DVAMOUNT - 1).BackgroundColor("White");
            m_spread.nwobject(SPR_DETAILS - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_INVOICEDATE - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_VATDESC - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_EWTDESC - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_APVNO - 1).BackgroundColor("cyan");            
            m_spread.nwobject(SPR_PAYEEREF - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_ITEMDESC - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_ITEMGROUPTYPEDESC - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_SEG1 - 1).BackgroundColor("cyan");          
            m_spread.nwobject(SPR_SEG2 - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_SEG3 - 1).BackgroundColor("cyan");           
            m_spread.nwobject(SPR_SEG4 - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_SEG5 - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_SEG6 - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_SUBACCOUNT - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_SUBLEDGERTYPE - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_SUBSIDIARYLREF - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_PERIODFROM - 1).BackgroundColor("White");
            m_spread.nwobject(SPR_PERIODTO - 1).BackgroundColor("White");
            m_spread.nwobject(SPR_VAT - 1).BackgroundColor("Gainsboro");
            m_spread.nwobject(SPR_EWT - 1).BackgroundColor("Gainsboro");
            m_spread.nwobject(SPR_NETAMT - 1).BackgroundColor("Gainsboro");
            m_spread.nwobject(SPR_CASHFLOWCODE - 1).BackgroundColor("Gainsboro");
            m_spread.nwobject(SPR_CASHFLOWDESC - 1).BackgroundColor("Gainsboro");
            #endregion

            #region Column Template            
            //m_spread.nwobject(SPR_DETAILS - 1).Template("<div class='nwCuz071'>...</div>");
            m_spread.nwobject(SPR_DETAILS - 1).ObjectType("button");
            m_spread.nwobject(SPR_DETAILS - 1).BackgroundColor("#006060");
            m_spread.nwobject(SPR_DETAILS - 1).TextAlign("center");
            m_spread.nwobject(SPR_DETAILS - 1).Class("btnSmall btnGreen btnDetails");

            m_spread.nwobject(SPR_DVAMOUNT - 1).InputCurrency("numVATIN", 2, 18, true);
            m_spread.nwobject(SPR_DVAMOUNTVATEX - 1).InputCurrency("numVATEX", 2, 18, true);
            m_spread.nwobject(SPR_PERIODFROM - 1).InputDate("dtpperiodfrom");
            m_spread.nwobject(SPR_PERIODTO - 1).InputDate("dtpperiodto");            
            //m_spread.nwobject(SPR_PARTICULARS - 1).Remarks("...", 500, true, "Particulars");
            m_spread.nwobject(SPR_PARTICULARS - 1).ObjectType("button");
            m_spread.nwobject(SPR_PARTICULARS - 1).BackgroundColor("#006060");
            m_spread.nwobject(SPR_PARTICULARS - 1).TextAlign("center");
            m_spread.nwobject(SPR_PARTICULARS - 1).Class("btnSmall");
            //m_spread.nwobject(SPR_DVAMOUNT - 1).Class("SPR_DVAMOUNT");
            m_spread.nwobject(SPR_PERIODFROM - 1).Class("SPR_PERIODFROM");
            m_spread.nwobject(SPR_PERIODTO - 1).Class("SPR_PERIODTO");
            m_spread.nwobject(SPR_PARTICULARS - 1).Class("SPR_PARTICULARS");
            #endregion

            #region Column Alingment 
            m_spread.nwobject(SPR_APVAMOUNT - 1).TextAlign("right");
            m_spread.nwobject(SPR_DVAMOUNTVATEX - 1).TextAlign("right");
            m_spread.nwobject(SPR_OPENAMOUNT - 1).TextAlign("right");
            m_spread.nwobject(SPR_VAT - 1).TextAlign("right");
            m_spread.nwobject(SPR_EWT - 1).TextAlign("right");
            m_spread.nwobject(SPR_NETAMT - 1).TextAlign("right");
            #endregion

            #region Column Width
            m_spread.nwobject(SPR_LINETYPE - 1).Width(100);
            m_spread.nwobject(SPR_APVNO - 1).Width(210);
            m_spread.nwobject(SPR_REASON - 1).Width(120);
            m_spread.nwobject(SPR_REASONDESC - 1).Width(150);
            m_spread.nwobject(SPR_PARTICULARS - 1).Width(80);
            m_spread.nwobject(SPR_APVDATE - 1).Width(120);
            m_spread.nwobject(SPR_INVOICENO - 1).Width(150);
            m_spread.nwobject(SPR_APVAMOUNT - 1).Width(150);
            m_spread.nwobject(SPR_OPENAMOUNT - 1).Width(150);
            m_spread.nwobject(SPR_DVAMOUNT - 1).Width(150);
            m_spread.nwobject(SPR_DVAMOUNTVATEX - 1).Width(150);
            m_spread.nwobject(SPR_PAYEEREF - 1).Width(150);            
            m_spread.nwobject(SPR_ACCOUNTDESC - 1).Width(150);
            m_spread.nwobject(SPR_ISSUPPLIER - 1).Width(0);
            m_spread.nwobject(SPR_REQSUBACCOUNT - 1).Width(0);
            m_spread.nwobject(SPR_REQSLTYPE - 1).Width(0);
            m_spread.nwobject(SPR_REQPERIODTOCOVER - 1).Width(0);
            m_spread.nwobject(SPR_REQSLREF - 1).Width(0);
            m_spread.nwobject(SPR_PAYEEREFCODE - 1).Width(0);
            m_spread.nwobject(SPR_REF1 - 1).Width(0);
            m_spread.nwobject(SPR_REF2 - 1).Width(0);
            m_spread.nwobject(SPR_REF3 - 1).Width(0);
            m_spread.nwobject(SPR_REF4 - 1).Width(0);
            m_spread.nwobject(SPR_REF5 - 1).Width(0);
            m_spread.nwobject(SPR_REF6 - 1).Width(0);
            m_spread.nwobject(SPR_TAXRATE - 1).Width(0);
            m_spread.nwobject(SPR_CLAIMEDPERCENT - 1).Width(0);
            m_spread.nwobject(SPR_APVPCCC - 1).Width(0);
            m_spread.nwobject(SPR_PCCC - 1).Width(0);
            m_spread.nwobject(SPR_EmpSuppTagging - 1).Width(0);
            m_spread.nwobject(SPR_TagTaxEnableDisable - 1).Width(0);
            m_spread.nwobject(SPR_TAXRATE2 - 1).Width(0);
            m_spread.nwobject(SPR_REASONTYPE - 1).Width(0);
            m_spread.nwobject(SPR_PAYEEREFCODE - 1).Width(0);
            m_spread.nwobject(SPR_VATCODE - 1).Width(0);
            m_spread.nwobject(SPR_EWTCODE - 1).Width(0);
            m_spread.nwobject(SPR_ITEMGROUPTYPE - 1).Width(0);
            m_spread.nwobject(SPR_ITEMCODE - 1).Width(0);
            m_spread.nwobject(SPR_RCTAG - 1).Width(0);
            m_spread.nwobject(SPR_SLTYPECODE - 1).Width(0);
            m_spread.nwobject(SPR_SLREFCODE - 1).Width(0);

            if (dt.Rows.Count > 0 && (isTaxConvert == "0" || isTaxConvert == "1"))
            {
                m_spread.nwobject(SPR_VAT - 1).Width(0);
                m_spread.nwobject(SPR_EWT - 1).Width(0);
                m_spread.nwobject(SPR_NETAMT - 1).Width(0);
            }
            #endregion

            #region Dynamic Naming
            m_spread.nwobject(SPR_SEG1 - 1).Width(0);
            m_spread.nwobject(SPR_SEG2 - 1).Width(0);
            m_spread.nwobject(SPR_SEG3 - 1).Width(0);
            m_spread.nwobject(SPR_SEG4 - 1).Width(0);
            m_spread.nwobject(SPR_SEG5 - 1).Width(0);
            m_spread.nwobject(SPR_SEG6 - 1).Width(0);

            DataTable dtNaming = new DataTable();
            dtNaming = dal.DynamicAccntSegNaming();

            foreach (DataRow drNaming in dtNaming.Rows)
            {
                switch (drNaming["SegLvl"].ToString())
                {
                    case "1":
                        m_spread.nwobject(SPR_SEG1 - 1).Width(150);
                        m_spread.nwobject(SPR_SEG1 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "2":
                        m_spread.nwobject(SPR_SEG2 - 1).Width(150);
                        m_spread.nwobject(SPR_SEG2 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "3":
                        m_spread.nwobject(SPR_SEG3 - 1).Width(150);
                        m_spread.nwobject(SPR_SEG3 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "4":
                        m_spread.nwobject(SPR_SEG4 - 1).Width(150);
                        m_spread.nwobject(SPR_SEG4 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "5":
                        m_spread.nwobject(SPR_SEG5 - 1).Width(150);
                        m_spread.nwobject(SPR_SEG5 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "6":
                        m_spread.nwobject(SPR_SEG6 - 1).Width(150);
                        m_spread.nwobject(SPR_SEG6 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                }
            }

            #endregion

            m_spread = GetGridButtonCustom(m_spread, gridID, "debitnotewreftaxConvert", "debitnotewrefresetTax", "debitnotewrefsaveExit");                    

            //## THEME FORMAT
            m_spread.HeaderBorderColor("#DEDEDE");
            m_spread.rowBackground("#FFFFFF", "#FFFFFF");
            m_spread.TableBorderColor("#BBB");
            m_spread.BodyBorderColor("#BBB");
            m_spread.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            m_spread.HeaderTextColor("#131313");
            //nwmyGrid.HoverColor("#DEDEDE", "inherit");
            //nwmyGrid.SelectedRowHover("#DEDEDE");
            //nwmyGrid.SelectedRowHoverColor("inherit");

            m_spread.varSpreadBook = "nwGridDebitNoteWithRefereceCon_Book";
            m_spread.varSpreadSheet = "nwGridDebitNoteWithRefereceCon_Sheet";

            // Eto yung naglalagay ng html script sa container
            //js.makeHTML("#nwGridDebitNoteWithRefereceCon", m_spread.createTable());
            js.ADD(m_spread.createTable());

            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("setTimeout(function() { nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetTemplate((SPR_PARTICULARS - 1), Spread_ALLROW, \"remarks\", \"\"); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText2((SPR_PARTICULARS - 1), Spread_ALLROW, \"...\"); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetTextColor((SPR_PARTICULARS - 1), Spread_ALLROW, \"#FFFFFF\"); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText2((SPR_DETAILS - 1), Spread_ALLROW, \"...\"); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetTextColor((SPR_DETAILS - 1), Spread_ALLROW, \"#FFFFFF\"); }, 150);"); 

            #endregion

            if (dt.Rows.Count > 0)
            {
                if (isTaxConvert != "2") {
                    js.ADD(string.Format("ifTaxConvertIsClick='{0}'", "1"));
                }
                if (!Parser.ParseBool(WebApp.nwobjectText("isCloseRevAt")))
                {
                    if (isTaxConvert == "0" || isTaxConvert == "1")
                    {
                        //  debitnotewoutrefsaveExit
                        js.ADD("setTimeout(function() { DisableDebitNotewRef(); $('#nwGridDebitNoteWithRefereceCon .nwgridButtons button.nwgrid_Delete ').enable(false); $('#nwGridDebitNoteWithRefereceCon .nwgridButtons button.nwgrid_Insert ').enable(false); $('#nwGridDebitNoteWithRefereceCon #debitnotewreftaxConvert').enable(false); $('#nwGridDebitNoteWithRefereceCon #debitnotewrefresetTax').enable(true); $('#chckAutoAllocate').enable(false); }, 150);");
                        //js.ADD("$('#nwGridDebitNoteWithRefereceCon').enable(false);");
                    }
                    else
                    {
                        js.ADD("setTimeout(function() { $('#nwGridDebitNoteWithRefereceCon').enable(true); $('#nwGridDebitNoteWithRefereceCon .nwgridButtons button.nwgrid_Delete ').enable(true); $('#nwGridDebitNoteWithRefereceCon .nwgridButtons button.nwgrid_Insert ').enable(true); $('#nwGridDebitNoteWithRefereceCon #debitnotewreftaxConvert').enable(true); $('#nwGridDebitNoteWithRefereceCon #debitnotewrefresetTax').enable(false); $('#chckAutoAllocate').enable(true); }, 150);");
                    }
                }

                if (isTaxConvert == "0")
                {
                    if (dal.ToggleOnOffAutoallocateChck(WebApp.nwobjectText("txtDMno")) > 0)
                        js.ADD("setTimeout(function() { $('#chckAutoAllocate').prop('checked', true); }, 150);");
                    else
                        js.ADD("setTimeout(function() { $('#chckAutoAllocate').prop('checked', false); }, 150);");
                }
            }
            else
            {
                if (isTaxConvert != "2") {
                    js.ADD(string.Format("ifTaxConvertIsClick='{0}'", "0"));
                }
                
                    js.ADD("setTimeout(function() { nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.RowAdd(0,5);  $('#nwGridDebitNoteWithRefereceCon').enable(true); $('#nwGridDebitNoteWithRefereceCon .nwgridButtons button.nwgrid_Delete ').enable(true); $('#nwGridDebitNoteWithRefereceCon .nwgridButtons button.nwgrid_Insert ').enable(true); $('#nwGridDebitNoteWithRefereceCon #debitnotewrefresetTax').enable(false); }, 150);");
            }

            js.ADD("$('#nwGridDebitNoteWithRefereceCon').css({'max-height' : '95%', 'min-height' : '95%'})");
            js.ADD("$('#nwGridDebitNoteWithRefereceConData').css({'max-height' : '100%', 'min-height' : '100%'})");

            if (dal.DisabledTagAutoallocateChck() == 0)
            {
                js.ADD("$('#chckAutoAllocate').enable(false);");
                js.ADD("$('#chckAutoAllocate').prop('checked', false);");
            }

                js.makeValueText("#txtTagPC", dal.AutoallocateDisablePCCC().ToString());

            js.ADD("setTimeout(function() { LoadTotalAmounts(); DebitwRefProp(); }, 150);");
        }

        public void GenerateGridDetails(bool isInitialize)
        {

            #region GRID
            var nwmyGrid = new nwGrid("nwGridDebitNoteWithRefereceDetailsCon");
            var gridID = "nwGridDebitNoteWithRefereceDetailsCon";
            nwmyGrid.Type = nwGridType.SpreadCanvas;
            nwmyGrid.CreateExcelGrid(3, SPR_OPENAMOUNTDETAILS);
            nwmyGrid.TableHeight(100);
           
            #region NAME
            nwmyGrid.nwobject(SPR_APPLYDATE - 1).ColumnName(SPRNAME_APPLYDATE);
            nwmyGrid.nwobject(SPR_APPLYTO - 1).ColumnName(SPRNAME_APPLYTO);
            nwmyGrid.nwobject(SPR_AMOUNT - 1).ColumnName(SPRNAME_AMOUNT);
            nwmyGrid.nwobject(SPR_STATUS - 1).ColumnName(SPRNAME_STATUS);
            nwmyGrid.nwobject(SPR_OPENAMOUNTDETAILS - 1).ColumnName(SPRNAME_OPENAMOUNTDETAILS);


            #endregion          
               
            #region
            nwmyGrid.nwobject(SPR_APPLYDATE - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_APPLYTO - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_AMOUNT - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_STATUS - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_OPENAMOUNTDETAILS - 1).BackgroundColor("gainsboro");
            #endregion

            nwmyGrid.nwobject(SPR_AMOUNT - 1).TextAlign("right");
            nwmyGrid.nwobject(SPR_OPENAMOUNTDETAILS - 1).TextAlign("right");


            #region WIDTH



            nwmyGrid.nwobject(SPR_APPLYDATE - 1).Width(150);
            nwmyGrid.nwobject(SPR_APPLYTO - 1).Width(150);
            nwmyGrid.nwobject(SPR_AMOUNT - 1).Width(150);
            nwmyGrid.nwobject(SPR_STATUS - 1).Width(150);
            nwmyGrid.nwobject(SPR_OPENAMOUNTDETAILS - 1).Width(150); ;




            #endregion

            #region ShowDetails
            var dtdetails = new DataTable();
            var row = 1;

            if (isInitialize)
            {
                String id = WebApp.nwobjectText("APVNO");
                String pccc = WebApp.nwobjectText("PCCC");
                bool isResetTax = WebApp.nwobjectBool("isResetTax");
                String debitmemo = WebApp.nwobjectText("txtDMno");
                decimal apvAmount = Parser.ParseDecimal(WebApp.nwobjectText("apvAmount"));
                bool isAutoAlloc = WebApp.nwobjectBool("isAutoAlloc");
                dtdetails = dal.getdebitnotedetails(id, pccc, debitmemo, apvAmount, isResetTax, isAutoAlloc);
                //nwmyGrid.CreateExcelGrid(dtdetails.Rows.Count - 1, SPR_SUPPLIER);
                dtdetails.Rows.Add();
                nwmyGrid.dataSource(dtdetails);
                nwmyGrid.maxRow(1);
            }
            else
            {
                nwmyGrid.minRow(1);
            }
            #endregion

            //## THEME FORMAT
            nwmyGrid.HeaderBorderColor("#DEDEDE");
            nwmyGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwmyGrid.TableBorderColor("#BBB");
            nwmyGrid.BodyBorderColor("#BBB");
            nwmyGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwmyGrid.HeaderTextColor("#131313");
            //nwmyGrid.HoverColor("#DEDEDE", "inherit");
            //nwmyGrid.SelectedRowHover("#DEDEDE");
            //nwmyGrid.SelectedRowHoverColor("inherit");

            nwmyGrid.varSpreadBook = "nwGridDebitNoteWithRefereceDetailsCon_Book";
            nwmyGrid.varSpreadSheet = "nwGridDebitNoteWithRefereceDetailsCon_Sheet";

            // Eto yung naglalagay ng html script sa container
            //js.makeHTML("#nwGridDebitNoteWithRefereceDetailsCon", nwmyGrid.createTable());
            js.ADD(nwmyGrid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            #endregion
        }

        public void CreateDebitwoRefGrid(bool isInitialize)
        {
            String isTaxConvert = string.Empty;
            #region GRID
            var m_spread = new nwGrid("nwGridDebitNoteWithoutRefereceCon");
            var gridID = "nwGridDebitNoteWithoutRefereceCon";
            m_spread.Type = nwGridType.SpreadCanvas;
            m_spread.CreateExcelGrid(15, SPR_without_SLREFCODE);
            m_spread.TableHeight(300);

            #region ShowDetails
            var dtdetails = new DataTable();
            var row = 1;
            DataTable dt = new DataTable();
            if (isInitialize)
            {
                String empty = string.Empty;

                if (WebApp.nwobjectText("flag") == "0")
                    empty = dal.isemptydebitnotewoutref(WebApp.nwobjectText("txtDMno"), WebApp.nwobjectText("flag"));
                else
                    empty = dal.isemptylinedetailswithoutref(WebApp.nwobjectText("txtDMno"));

                isTaxConvert = WebApp.nwobjectText("IsTaxConvert");
                if (isTaxConvert == "1")
                {
                    //  dx = dal.getdebitnotewoutreftaxconvert(WebApp.nwobjectText("txtDMno"));
                    DataTable dt1 = new DataTable();
                    DataSet ds = WebApp.DataSet("nwGridDebitNoteWithoutRefereceCon");
                    if (ds.Tables.Count > 0)
                    {
                        dt1 = ds.Tables[0];
                    }
                    string temp = dal.DebitNotewoRef_TaxConvert(dt1, WebApp.nwobjectText("txtDMno"), WebApp.nwobjectText("flag"), WebApp.nwobjectText("idvallugAPControlAccnt"));
                    if (temp != string.Empty)
                    {
                        dt = dal.getTaxConvertDMwoRef(WebApp.nwobjectText("txtDMno"), WebApp.nwobjectText("flag"));
                        //dt.Rows.Add();
                        m_spread.dataSource(dt);
                        m_spread.minRow(dt.Rows.Count);
                    }                  
                }
                else if (isTaxConvert == "2")
                {
                    DataTable dt1 = new DataTable();
                    DataSet ds = WebApp.DataSet("nwGridDebitNoteWithoutRefereceCon");
                    if (ds.Tables.Count > 0)
                    {
                        dt1 = ds.Tables[0];
                    }
                    dt = RemoveTaxConvertDebitMemowoutNote(dt1);
                    //dt.Rows.Add();
                    m_spread.dataSource(dt);
                    m_spread.minRow(dt.Rows.Count + 1);
                }
                else
                {
                    dt = dal.getDebitNotewoRef(WebApp.nwobjectText("txtDMno"), WebApp.nwobjectText("flag"));
                    ////dt.Rows.Add();
                    m_spread.dataSource(dt);
                    m_spread.minRow(dt.Rows.Count);

                    if (dt.Rows.Count <= 0)
                    {
                        m_spread.maxRow(5);
                        m_spread.minRow(5);
                    }
                }  
            }
            else
            {
                m_spread.minRow(1);
            }
            #endregion

            #region Column Name
            m_spread.nwobject(SPR_without_LINETYPE - 1).ColumnName(SPRNAME_without_LINETYPE);
            m_spread.nwobject(SPR_without_REASON - 1).ColumnName(SPRNAME_without_REASON);
            m_spread.nwobject(SPR_without_REASONDESC - 1).ColumnName(SPRNAME_without_REASONDESC);
            m_spread.nwobject(SPR_without_PARTICULARS - 1).ColumnName(SPRNAME_without_PARTICULARS);
            m_spread.nwobject(SPR_without_PAYEEREF - 1).ColumnName(SPRNAME_without_PAYEEREF);
            m_spread.nwobject(SPR_without_ITEMGROUPTYPEDESC - 1).ColumnName(SPRNAME_without_ITEMGROUPTYPE);
            m_spread.nwobject(SPR_without_ITEMDESC - 1).ColumnName("Item");
            m_spread.nwobject(SPR_without_VATDESC - 1).ColumnName("VAT Short Description");
            m_spread.nwobject(SPR_without_EWTDESC - 1).ColumnName("EWT Short Description");
            m_spread.nwobject(SPR_without_DMAMOUNT - 1).ColumnName(SPRNAME_without_DMAMOUNT);
            m_spread.nwobject(SPR_without_DMAMOUNTVATEX - 1).ColumnName(SPRNAME_without_DMAMOUNTVATEX);
            //nwmyGrid.nwobject(SPR_without_TAXCODE - 1).ColumnName(SPRNAME_without_TAXCODE);
            m_spread.nwobject(SPR_without_SEG1 - 1).ColumnName(SPRNAME_without_SEG1);
            m_spread.nwobject(SPR_without_SEG2 - 1).ColumnName(SPRNAME_without_SEG2);
            m_spread.nwobject(SPR_without_SEG3 - 1).ColumnName(SPRNAME_without_SEG3);
            m_spread.nwobject(SPR_without_SEG4 - 1).ColumnName(SPRNAME_without_SEG4);
            m_spread.nwobject(SPR_without_ACCOUNTDESC - 1).ColumnName(SPRNAME_without_ACCOUNTDESC);
            m_spread.nwobject(SPR_without_SUBACCOUNT - 1).ColumnName(SPRNAME_without_SUBACCOUNT);
            m_spread.nwobject(SPR_without_SUBSIDIARYTYPE - 1).ColumnName(SPRNAME_without_SUBSIDIARYTYPE);
            m_spread.nwobject(SPR_without_SUBSIDIARYREF - 1).ColumnName(SPRNAME_without_SUBSIDIARYREF);
            m_spread.nwobject(SPR_without_PERIODFROM - 1).ColumnName(SPRNAME_without_PERIODFROM);
            m_spread.nwobject(SPR_without_PERIODTO - 1).ColumnName(SPRNAME_without_PERIODTO);
            m_spread.nwobject(SPR_without_EmpSuppTagging - 1).ColumnName("Employee / Supplier Tagging");
            m_spread.nwobject(SPR_without_TagTaxEnableDisable - 1).ColumnName("Tagging Enable Disable without TIN");
            m_spread.nwobject(SPR_without_APControlAcctCode - 1).ColumnName("AP Control Account Code");
            m_spread.nwobject(SPR_without_APControlAcctDesc - 1).ColumnName("AP Control Account Description");
            m_spread.nwobject(SPR_without_REQSUBACCOUNT - 1).ColumnName("SPR_without_REQSUBACCOUNT");
            m_spread.nwobject(SPR_without_REQSLTYPE - 1).ColumnName("SPR_without_REQSLTYPE");
            m_spread.nwobject(SPR_without_REQSLREF - 1).ColumnName("SPR_without_REQSLREF");
            m_spread.nwobject(SPR_without_TAXRATE2 - 1).ColumnName("Tax Rate 2");
            m_spread.nwobject(SPR_without_CASHFLOWCODE - 1).ColumnName("Cash Flow Type Code");
            m_spread.nwobject(SPR_without_CASHFLOWDESC - 1).ColumnName("Cash Flow Type Description");
            #endregion

            #region Column Required
            m_spread.nwobject(SPR_without_REASON - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_without_PAYEEREF - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_without_ITEMGROUPTYPEDESC - 1).HeaderFieldRequired(true);
            //nwmyGrid.nwobject(SPR_without_TAXCODE - 1).HeaderFieldRequired(true);
            //m_spread.nwobject(SPR_without_PARTICULARS - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_without_DMAMOUNT - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_without_DMAMOUNTVATEX - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_without_VATDESC - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_without_EWTDESC - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_without_SEG1 - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_without_SEG2 - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_without_SEG3 - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_without_SEG4 - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_without_SEG5 - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_without_SEG6 - 1).HeaderFieldRequired(true);           
            m_spread.nwobject(SPR_without_APControlAcctCode - 1).HeaderFieldRequired(true);
            #endregion

            #region Column Template            
            m_spread.nwobject(SPR_without_DMAMOUNT - 1).InputCurrency("numVATIN_woRef", 2, 18);
            m_spread.nwobject(SPR_without_DMAMOUNTVATEX - 1).InputCurrency("numVATEX_woRef", 2, 18);
            m_spread.nwobject(SPR_without_PERIODFROM - 1).InputDate("SPR_without_PERIODFROM");
            m_spread.nwobject(SPR_without_PERIODTO - 1).InputDate("SPR_without_PERIODTO");
            m_spread.nwobject(SPR_without_DMAMOUNTVATEX - 1).TextAlign("right");
            m_spread.nwobject(SPR_without_DMAMOUNT - 1).TextAlign("right");
            //m_spread.nwobject(SPR_without_PARTICULARS - 1).Remarks("...", 500, true, "Particulars");
            m_spread.nwobject(SPR_without_PARTICULARS - 1).ObjectType("button");
            m_spread.nwobject(SPR_without_PARTICULARS - 1).BackgroundColor("#006060");
            m_spread.nwobject(SPR_without_PARTICULARS - 1).TextAlign("center");
            m_spread.nwobject(SPR_without_PARTICULARS - 1).Class("btnSmall");           
            m_spread.nwobject(SPR_without_PARTICULARS - 1).Class("SPR_PARTICULARS");
            #endregion

            #region Column Color
            m_spread.nwobject(SPR_without_REASON - 1).BackgroundColor("cyan");
            //nwmyGrid.nwobject(SPR_without_TAXCODE - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_PAYEEREF - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_ITEMGROUPTYPEDESC - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_ITEMDESC - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_VATDESC - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_EWTDESC - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_SEG1 - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_SEG2 - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_SEG3 - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_SEG4 - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_SEG5 - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_SEG6 - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_SUBACCOUNT - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_SUBSIDIARYTYPE - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_SUBSIDIARYREF - 1).BackgroundColor("cyan");            
            m_spread.nwobject(SPR_without_LINETYPE - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_without_ACCOUNTDESC - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_without_REASONDESC - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_without_APControlAcctDesc - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_without_APControlAcctCode - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_without_CASHFLOWCODE - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_without_CASHFLOWDESC - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Width 
            m_spread.nwobject(SPR_without_LINETYPE - 1).Width(150);
            m_spread.nwobject(SPR_without_REASON - 1).Width(150);
            m_spread.nwobject(SPR_without_PARTICULARS - 1).Width(80);
            m_spread.nwobject(SPR_without_PAYEEREF - 1).Width(150);
            m_spread.nwobject(SPR_without_ITEMGROUPTYPE - 1).Width(150);
            m_spread.nwobject(SPR_without_DMAMOUNT - 1).Width(150);
            m_spread.nwobject(SPR_without_DMAMOUNTVATEX - 1).Width(150);
            //nwmyGrid.nwobject(SPR_without_TAXCODE - 1).Width(150);
            m_spread.nwobject(SPR_without_PAYEECODE - 1).Width(0);
            m_spread.nwobject(SPR_without_ACCOUNTDESC - 1).Width(150);
            m_spread.nwobject(SPR_without_SUBACCOUNT - 1).Width(150);
            m_spread.nwobject(SPR_without_SUBSIDIARYTYPE - 1).Width(150);
            m_spread.nwobject(SPR_without_SUBSIDIARYREF - 1).Width(150);
            m_spread.nwobject(SPR_without_REQSUBACCOUNT - 1).Width(0);
            m_spread.nwobject(SPR_without_REQSLTYPE - 1).Width(0);
            m_spread.nwobject(SPR_without_REQSLREF - 1).Width(0);
            m_spread.nwobject(SPR_without_TAXRATE - 1).Width(0);
            m_spread.nwobject(SPR_without_CLAIMEDPERCENT - 1).Width(0);
            m_spread.nwobject(SPR_without_EmpSuppTagging - 1).Width(0);
            m_spread.nwobject(SPR_without_TagTaxEnableDisable - 1).Width(0);
            m_spread.nwobject(SPR_without_TAXRATE2 - 1).Width(0);
            m_spread.nwobject(SPR_without_ITEMGROUPTYPE - 1).Width(0);
            m_spread.nwobject(SPR_without_ITEMCODE- 1).Width(0);
            m_spread.nwobject(SPR_without_VATCODE - 1).Width(0);
            m_spread.nwobject(SPR_without_EWTCODE - 1).Width(0);
            m_spread.nwobject(SPR_without_REASONTYPE - 1).Width(0);
            m_spread.nwobject(SPR_without_APControlAcctCode - 1).Width(0);
            m_spread.nwobject(SPR_without_APControlAcctDesc - 1).Width(0);
            m_spread.nwobject(SPR_without_SLREFCODE - 1).Width(0);
            m_spread.nwobject(SPR_without_SLTYPECODE - 1).Width(0);
            #endregion

            #region Dynamic Naming
            m_spread.nwobject(SPR_without_SEG1 - 1).Width(0);
            m_spread.nwobject(SPR_without_SEG2 - 1).Width(0);
            m_spread.nwobject(SPR_without_SEG3 - 1).Width(0);
            m_spread.nwobject(SPR_without_SEG4 - 1).Width(0);
            m_spread.nwobject(SPR_without_SEG5 - 1).Width(0);
            m_spread.nwobject(SPR_without_SEG6 - 1).Width(0);

            m_spread.nwobject(SPR_without_REF1 - 1).Width(0);
            m_spread.nwobject(SPR_without_REF2 - 1).Width(0);
            m_spread.nwobject(SPR_without_REF3 - 1).Width(0);
            m_spread.nwobject(SPR_without_REF4 - 1).Width(0);
            m_spread.nwobject(SPR_without_REF5 - 1).Width(0);
            m_spread.nwobject(SPR_without_REF6 - 1).Width(0);
            
            DataTable dtNaming = new DataTable();
            dtNaming = dal.DynamicAccntSegNaming();

            foreach (DataRow drNaming in dtNaming.Rows)
            {
                switch (drNaming["SegLvl"].ToString())
                {

                    case "1":
                        m_spread.nwobject(SPR_without_SEG1 - 1).Width(150);
                        m_spread.nwobject(SPR_without_SEG1 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "2":
                        m_spread.nwobject(SPR_without_SEG2 - 1).Width(150);
                        m_spread.nwobject(SPR_without_SEG2 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "3":
                        m_spread.nwobject(SPR_without_SEG3 - 1).Width(150);
                        m_spread.nwobject(SPR_without_SEG3 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "4":
                        m_spread.nwobject(SPR_without_SEG4 - 1).Width(150);
                        m_spread.nwobject(SPR_without_SEG4 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "5":
                        m_spread.nwobject(SPR_without_SEG5 - 1).Width(150);
                        m_spread.nwobject(SPR_without_SEG5 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "6":
                        m_spread.nwobject(SPR_without_SEG6 - 1).Width(150);
                        m_spread.nwobject(SPR_without_SEG6 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;

                }
            }

            #endregion

            m_spread = GetGridButtonCustom(m_spread, gridID, "debitnotewoutreftaxConvert", "debitnotewoutrefresetTax", "debitnotewoutrefsaveExit");

            //## THEME FORMAT
            m_spread.HeaderBorderColor("#DEDEDE");
            m_spread.rowBackground("#FFFFFF", "#FFFFFF");
            m_spread.TableBorderColor("#BBB");
            m_spread.BodyBorderColor("#BBB");
            m_spread.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            m_spread.HeaderTextColor("#131313");

            m_spread.varSpreadBook = "nwGridDebitNoteWithoutRefereceCon_Book";
            m_spread.varSpreadSheet = "nwGridDebitNoteWithoutRefereceCon_Sheet";

            //js.makeHTML("#nwGridDebitNoteWithoutRefereceCon", m_spread.createTable());
            js.ADD(m_spread.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("setTimeout(function() { nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetTemplate((SPR_without_PARTICULARS - 1), Spread_ALLROW, \"remarks\", \"\"); nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText2((SPR_without_PARTICULARS - 1), Spread_ALLROW, \"...\"); nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetTextColor((SPR_without_PARTICULARS - 1), Spread_ALLROW, \"#FFFFFF\"); }, 150);");

            #endregion
            if (dt.Rows.Count > 0)
            {
                if (isTaxConvert != "2") {
                    js.ADD(string.Format("ifTaxConvertIsClick='{0}'", "1"));
                }
                if (isTaxConvert == "1" || isTaxConvert == "0") {
                    //  debitnotewoutrefsaveExit
                    js.ADD("setTimeout(function() { DisableDebitNotewoRef(); $('#nwGridDebitNoteWithoutRefereceCon .nwgridButtons button.nwgrid_Delete ').enable(false); $('#nwGridDebitNoteWithoutRefereceCon .nwgridButtons button.nwgrid_Insert ').enable(false); $('#nwGridDebitNoteWithoutRefereceCon #debitnotewoutreftaxConvert').enable(false); $('#nwGridDebitNoteWithoutRefereceCon #debitnotewoutrefresetTax').enable(true); $('#lugAPControlAccnt').enable(false); } , 150);");
                    //js.ADD("$('#nwGridDebitNoteWithoutRefereceCon').enable(false);");
                    //js.ADD("$('#nwGridDebitNoteWithoutRefereceCon .tblGridBody tr td:nth-child(' + " + (SPR_without_DMAMOUNT + 1) + " + ')').css('background-color', 'gainsboro');");
                    //js.ADD("$('#nwGridDebitNoteWithoutRefereceCon .tblGridBody tr td:nth-child(' + " + (SPR_without_DMAMOUNTVATEX + 1) + " + ')').css('background-color', 'gainsboro');");
                    //js.ADD("$('#nwGridDebitNoteWithoutRefereceCon .tblGridBody tr td:nth-child(' + " + (SPR_without_PERIODFROM + 1) + " + ')').css('background-color', 'gainsboro');");
                    //js.ADD("$('#nwGridDebitNoteWithoutRefereceCon .tblGridBody tr td:nth-child(' + " + (SPR_without_PERIODTO + 1) + " + ')').css('background-color', 'gainsboro');");
                    js.makeValueText("#idvallugAPControlAccnt", dt.Rows[0][SPR_without_APControlAcctCode - 1].ToString());
                    js.makeValueText("#descvallugAPControlAccnt", dt.Rows[0][SPR_without_APControlAcctDesc - 1].ToString());
                }
                else
                {
                    js.ADD("setTimeout(function() { $('#nwGridDebitNoteWithoutRefereceCon').enable(true); $('#nwGridDebitNoteWithoutRefereceCon .nwgridButtons button.nwgrid_Delete ').enable(true); $('#nwGridDebitNoteWithoutRefereceCon .nwgridButtons button.nwgrid_Insert ').enable(true); $('#nwGridDebitNoteWithoutRefereceCon #debitnotewoutreftaxConvert').enable(true); $('#nwGridDebitNoteWithoutRefereceCon #debitnotewoutrefresetTax').enable(false); $('#lugAPControlAccnt').enable(true); } , 150);");
                }
                //js.ADD("nwGrid_AddRow('nwGridDebitNoteWithoutRefereceCon', 1);");
            }
            else
            {
                if (isTaxConvert != "2") {
                    js.ADD(string.Format("ifTaxConvertIsClick='{0}'", "0"));
                }
                js.ADD("setTimeout(function() { nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.RowAdd(0,5); $('#nwGridDebitNoteWithoutRefereceCon').enable(true); $('#nwGridDebitNoteWithoutRefereceCon .nwgridButtons button.nwgrid_Delete ').enable(true); $('#nwGridDebitNoteWithoutRefereceCon .nwgridButtons button.nwgrid_Insert ').enable(true); $('#nwGridDebitNoteWithoutRefereceCon #debitnotewoutrefresetTax').enable(false); } , 150);");
            }

            js.ADD("setTimeout(function() { $('#nwGridDebitNoteWithoutRefereceCon').css({'max-height' : '95%', 'min-height' : '95%'}); $('#nwGridDebitNoteWithoutRefereceData').css({'max-height' : '100%', 'min-height' : '100%'}); DebitwoRefProp(); } , 150);");
        }

        public void GenerateLineDetails(bool isInitialize)
        {
            String isTaxConvert = string.Empty;
            #region GRID
            var nwmyGrid = new nwGrid("nwGridLineDetails");
            var gridID = "nwGridLineDetails";
            nwmyGrid.Type = nwGridType.SpreadCanvas;
            nwmyGrid.CreateExcelGrid(15, SPR_LD_TAXRATE2);
            nwmyGrid.TableHeight(325);

            #region Colunm Name
            nwmyGrid.nwobject(SPR_LD_LINETYPE - 1).ColumnName(SPRNAME_LD_LINETYPE);
            nwmyGrid.nwobject(SPR_LD_APVNO - 1).ColumnName(SPRNAME_LD_APVNO);
            nwmyGrid.nwobject(SPR_LD_REASON - 1).ColumnName(SPRNAMENAME_LD_REASON);
            nwmyGrid.nwobject(SPR_LD_REASONDESC - 1).ColumnName(SPRNAMENAME_LD_REASONDESC);
            nwmyGrid.nwobject(SPR_LD_APVDATE - 1).ColumnName(SPRNAME_LD_APVDATE);
            nwmyGrid.nwobject(SPR_LD_INVOICENO - 1).ColumnName(SPRNAME_LD_INVOICENO);
            nwmyGrid.nwobject(SPR_LD_INVOICEDATE - 1).ColumnName(SPRNAME_LD_INVOICEDATE);
            nwmyGrid.nwobject(SPR_LD_APVAMT - 1).ColumnName(SPRNAME_LD_APVAMT);
            nwmyGrid.nwobject(SPR_LD_ITEMGROUPTYPE - 1).ColumnName(SPRNAME_LD_ITEMGROUPTYPE);
            nwmyGrid.nwobject(SPR_LD_PARTICULARS - 1).ColumnName(SPRNAME_LD_PARTICULARS);
            nwmyGrid.nwobject(SPR_LD_PAYEEREF - 1).ColumnName(SPRNAME_LD_PAYEEREF);
            nwmyGrid.nwobject(SPR_LD_OCYAMMOUNT - 1).ColumnName(SPRNAME_LD_OCYAMMOUNT);
            nwmyGrid.nwobject(SPR_LD_OCYAMMOUNTVATEX - 1).ColumnName(SPRNAME_LD_OCYAMMOUNTVATEX);
            nwmyGrid.nwobject(SPR_LD_TAX - 1).ColumnName(SPRNAME_LD_TAX);
            nwmyGrid.nwobject(SPR_LD_SEG1 - 1).ColumnName(SPRNAME_LD_MAIN);
            nwmyGrid.nwobject(SPR_LD_SEG2 - 1).ColumnName(SPRNAME_LD_PROFIT);
            nwmyGrid.nwobject(SPR_LD_SEG3 - 1).ColumnName(SPRNAME_LD_COSTCENTER);
            nwmyGrid.nwobject(SPR_LD_SEG4 - 1).ColumnName(SPRNAME_LD_ITEMGROUP);
            nwmyGrid.nwobject(SPR_LD_ACCOUNTDESCRIPTION - 1).ColumnName(SPRNAME_LD_ACCOUNTDESCRIPTION);
            nwmyGrid.nwobject(SPR_LD_SUBACCOUNT - 1).ColumnName(SPRNAME_LD_SUBACCOUNT);
            nwmyGrid.nwobject(SPR_LD_SUBSIDIARYLEDGERTYPE - 1).ColumnName(SPRNAME_LD_SUBSIDIARYLEDGERTYPE);
            nwmyGrid.nwobject(SPR_LD_SUBSIDIARYLEDGERREF - 1).ColumnName(SPRNAME_LD_SUBSIDIARYLEDGER);
            nwmyGrid.nwobject(SPR_LD_PERIODFROM - 1).ColumnName(SPRNAME_LD_PERIODFROM);
            nwmyGrid.nwobject(SPR_LD_PERIODTO - 1).ColumnName(SPRNAME_LD_PERIODTO);
            nwmyGrid.nwobject(SPR_LD_DETAILS - 1).ColumnName(SPRNAME_LD_DETAILS);

            nwmyGrid.nwobject(SPR_LD_REQPERIODTOCOVER - 1).ColumnName("Required period to cover");
            nwmyGrid.nwobject(SPR_LD_APVROWNO - 1).ColumnName("APV RowNo");
            nwmyGrid.nwobject(SPR_LD_REQSLREF - 1).ColumnName("Required SL Ref");
            nwmyGrid.nwobject(SPR_LD_REQSLTYPE - 1).ColumnName("Required SL Type");
            nwmyGrid.nwobject(SPR_LD_REQSUBACCOUNT - 1).ColumnName("Required Sub Account");
            nwmyGrid.nwobject(SPR_LD_PAYEEREFCODE - 1).ColumnName("Payee Code");
            nwmyGrid.nwobject(SPR_LD_CLAIMEDPERCENT - 1).ColumnName("Claimed");
            nwmyGrid.nwobject(SPR_LD_TAXRATE - 1).ColumnName("Tax Rate");
            nwmyGrid.nwobject(SPR_LD_TAXRATE2 - 1).ColumnName("Tax Rate 2");

            #endregion

            #region Column Required

            nwmyGrid.nwobject(SPR_LD_APVNO - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LD_REASON - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LD_SEG1 - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LD_SEG2 - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LD_SEG3 - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LD_SEG4 - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LD_SUBACCOUNT - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LD_SUBSIDIARYLEDGERTYPE - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LD_SUBSIDIARYLEDGERREF - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LD_APVAMT - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LD_PARTICULARS - 1).HeaderFieldRequired(true);
            #endregion

            #region Column Template
            nwmyGrid.nwobject(SPR_LD_OCYAMMOUNT - 1).InputCurrency("SPR_LD_OCYAMMOUNT", 2, 15);
            nwmyGrid.nwobject(SPR_LD_PARTICULARS - 1).Input("");
            //nwmyGrid.nwobject(SPR_LD_DETAILS - 1).Template("<button class='btnLineDetailsLD nwCuz071'>...</button>");
            nwmyGrid.nwobject(SPR_LD_DETAILS - 1).ObjectType("button");
            nwmyGrid.nwobject(SPR_LD_DETAILS - 1).BackgroundColor("#006060");
            nwmyGrid.nwobject(SPR_LD_DETAILS - 1).TextAlign("center");
            nwmyGrid.nwobject(SPR_LD_DETAILS - 1).Class("btnLineDetailsLD");
            nwmyGrid.nwobject(SPR_LD_PERIODFROM - 1).InputDate("dtplinedetailsperiodfrom");
            nwmyGrid.nwobject(SPR_LD_PERIODTO - 1).InputDate("dtplinedetailsperiodto");
            #endregion

            #region Column Color

            nwmyGrid.nwobject(SPR_LD_LINETYPE - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LD_APVNO - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LD_REASON - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LD_ITEMGROUPTYPE - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LD_REASONDESC - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LD_APVDATE - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LD_INVOICENO - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LD_INVOICEDATE - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LD_PAYEEREF - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LD_APVAMT - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LD_OCYAMMOUNTVATEX - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LD_TAX - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LD_SEG1 - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LD_SEG2 - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LD_SEG3 - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LD_SEG4 - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LD_SEG5 - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LD_SEG6 - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LD_ACCOUNTDESCRIPTION - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LD_SUBACCOUNT - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LD_SUBSIDIARYLEDGERTYPE - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LD_SUBSIDIARYLEDGERREF - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LD_PERIODFROM - 1).BackgroundColor("white");
            nwmyGrid.nwobject(SPR_LD_PERIODTO - 1).BackgroundColor("white");
            nwmyGrid.nwobject(SPR_LD_DETAILS - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LD_APVAMT - 1).TextAlign("right");
            #endregion

            #region Column Width
            nwmyGrid.nwobject(SPR_LD_LINETYPE - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_APVNO - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_REASON - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_REASONDESC - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_APVDATE - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_INVOICENO - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_PARTICULARS - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_PAYEEREF - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_OCYAMMOUNT - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_OCYAMMOUNTVATEX - 1).Width(150);

            nwmyGrid.nwobject(SPR_LD_TAX - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_ACCOUNTDESCRIPTION - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_SUBACCOUNT - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_SUBSIDIARYLEDGERTYPE - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_SUBSIDIARYLEDGERREF - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_PERIODFROM - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_PERIODTO - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_DETAILS - 1).Width(150);
            nwmyGrid.nwobject(SPR_LD_REQSUBACCOUNT - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_REQSLTYPE - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_REQSLREF - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_REQPERIODTOCOVER - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_APVROWNO - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_PAYEEREFCODE - 1).Width(0);

            nwmyGrid.nwobject(SPR_LD_TAXRATE - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_CLAIMEDPERCENT - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_TAXRATE2 - 1).Width(0);


            #endregion


            #region Dynamic Naming

            nwmyGrid.nwobject(SPR_LD_SEG1 - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_SEG2 - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_SEG3 - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_SEG4 - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_SEG5 - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_SEG6 - 1).Width(0);

            nwmyGrid.nwobject(SPR_LD_REF1 - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_REF2 - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_REF3 - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_REF4 - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_REF5 - 1).Width(0);
            nwmyGrid.nwobject(SPR_LD_REF6 - 1).Width(0);

            DataTable dtNaming = new DataTable();
            dtNaming = dal.DynamicAccntSegNaming();

            foreach (DataRow drNaming in dtNaming.Rows)
            {
                switch (drNaming["SegLvl"].ToString())
                {

                    case "1":
                        nwmyGrid.nwobject(SPR_LD_SEG1 - 1).Width(150);
                        nwmyGrid.nwobject(SPR_LD_SEG1 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "2":
                        nwmyGrid.nwobject(SPR_LD_SEG2 - 1).Width(150);
                        nwmyGrid.nwobject(SPR_LD_SEG2 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "3":
                        nwmyGrid.nwobject(SPR_LD_SEG3 - 1).Width(150);
                        nwmyGrid.nwobject(SPR_LD_SEG3 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "4":
                        nwmyGrid.nwobject(SPR_LD_SEG4 - 1).Width(150);
                        nwmyGrid.nwobject(SPR_LD_SEG4 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "5":
                        nwmyGrid.nwobject(SPR_LD_SEG5 - 1).Width(150);
                        nwmyGrid.nwobject(SPR_LD_SEG5 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;
                    case "6":
                        nwmyGrid.nwobject(SPR_LD_SEG6 - 1).Width(150);
                        nwmyGrid.nwobject(SPR_LD_SEG6 - 1).ColumnName(drNaming["SegDesc"].ToString());
                        break;

                }
            }

            #endregion

            #region Column Align
            nwmyGrid.nwobject(SPR_LD_OCYAMMOUNTVATEX - 1).TextAlign("right");
            #endregion

            nwmyGrid = GetGridButtonCustom(nwmyGrid, gridID, "linedetailwreftaxConvert", "linedetailwrefresetTax", "linedetailwrefsaveExit");


            DataTable dx = new DataTable();
            #region ShowDetails
            if (isInitialize)
            {
                String empty = dal.isemptylinedetailswithref(WebApp.nwobjectText("txtDMno"));
                // if (empty.Length > 0)
                // {

                isTaxConvert = WebApp.nwobjectText("IsTaxConvert");
                if (isTaxConvert == "1")
                {
                    //    dx = dal.getlinedetailswreftaxconvert(WebApp.nwobjectText("txtDMno"));
                    DataTable dt1 = new DataTable();
                    DataSet ds = WebApp.DataSet("nwGridLineDetails");
                    if (ds.Tables.Count > 0)
                    {
                        dt1 = ds.Tables[0];
                    }
                    dx = dal.GetLineDetailsTaxConvert(dt1, WebApp.nwobjectText("txtDMno"));
                }
                else if (isTaxConvert == "2")
                {
                    //    dx = dal.getlinedetailswreftaxconvert(WebApp.nwobjectText("txtDMno"));
                    DataTable dt1 = new DataTable();
                    DataSet ds = WebApp.DataSet("nwGridLineDetails");
                    if (ds.Tables.Count > 0)
                    {
                        dt1 = ds.Tables[0];
                    }
                    dx = RemoveTaxConvertDebitMemoLineDetailwref(dt1);
                }
                else
                    dx = dal.getlinedetailswref(WebApp.nwobjectText("txtDMno"));

                dx.Rows.Add();
                nwmyGrid.dataSource(dx);

                // }
                nwmyGrid.minRow(1);
            }
            else
            {
                nwmyGrid.minRow(1);
            }
            #endregion

            //## THEME FORMAT
            nwmyGrid.HeaderBorderColor("#DEDEDE");
            nwmyGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwmyGrid.TableBorderColor("#BBB");
            nwmyGrid.BodyBorderColor("#BBB");
            nwmyGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwmyGrid.HeaderTextColor("#131313");
            //nwmyGrid.HoverColor("#DEDEDE", "inherit");
            //nwmyGrid.SelectedRowHover("#DEDEDE");
            //nwmyGrid.SelectedRowHoverColor("inherit");

            nwmyGrid.varSpreadBook = "nwGridLineDetails_Book";
            nwmyGrid.varSpreadSheet = "nwGridLineDetails_Sheet";

            // Eto yung naglalagay ng html script sa container
            //js.makeHTML("#nwGridLineDetails", nwmyGrid.createTable());
            js.ADD(nwmyGrid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            #endregion

            if (dx.Rows.Count > 0)
            {
                if (isTaxConvert == "1" || isTaxConvert == "0") {
                    js.ADD("setTimeout(function() { $('#nwGridLineDetails').enable(false); $('#nwGridLineDetails .nwgridButtons button.nwgrid_Delete ').enable(false); $('#nwGridLineDetails .nwgridButtons button.nwgrid_Insert ').enable(false); $('#nwGridLineDetails #linedetailwreftaxConvert').enable(false); $('#nwGridLineDetails #linedetailwrefresetTax').enable(true); } , 150);");
                }
                else
                {
                    js.ADD("setTimeout(function() { $('#nwGridLineDetails').enable(true); $('#nwGridLineDetails .nwgridButtons button.nwgrid_Delete ').enable(true); $('#nwGridLineDetails .nwgridButtons button.nwgrid_Insert ').enable(true); $('#nwGridLineDetails #linedetailwreftaxConvert').enable(true); $('#nwGridLineDetails #linedetailwrefresetTax').enable(false); } , 150);");
                }
                js.ADD("nwGrid_AddRow('nwGridLineDetails', 1);");
            }
            else {
                js.ADD("setTimeout(function() { $('#nwGridLineDetails').enable(true); $('#nwGridLineDetails .nwgridButtons button.nwgrid_Delete ').enable(true); $('#nwGridLineDetails .nwgridButtons button.nwgrid_Insert ').enable(true); $('#nwGridLineDetails #linedetailwrefresetTax').enable(false); } , 150);");
            }

            js.ADD("setTimeout(function() { $('#nwGridLineDetails').css({'max-height' : '95%', 'min-height' : '95%'}); $('#nwGridLineDetailsData').css({'max-height' : '100%', 'min-height' : '100%'}); } , 150);");
        }

        public void GenerateGridDetailsLD(bool isInitialize)
        {

            #region GRID
            var nwmyGrid = new nwGrid("nwGridDetailsLD");
            var gridID = "nwGridDetailsLD";
            nwmyGrid.Type = nwGridType.SpreadCanvas;
            nwmyGrid.CreateExcelGrid(3, SPR_OPENAMOUNTDETAILS2);
            nwmyGrid.TableHeight(100);
          
            #region Column Name
            nwmyGrid.nwobject(SPR_APPLYDATE2 - 1).ColumnName(SPRNAME_APPLYDATE2);
            nwmyGrid.nwobject(SPR_APPLYTO2 - 1).ColumnName(SPRNAME_APPLYTO2);
            nwmyGrid.nwobject(SPR_AMOUNT2 - 1).ColumnName(SPRNAME_AMOUNT2);
            nwmyGrid.nwobject(SPR_STATUS2 - 1).ColumnName(SPRNAME_STATUS2);
            nwmyGrid.nwobject(SPR_OPENAMOUNTDETAILS2 - 1).ColumnName(SPRNAME_OPENAMOUNTDETAILS2);
            #endregion
                          
            #region Column Background
            nwmyGrid.nwobject(SPR_APPLYDATE2 - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_APPLYTO2 - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_AMOUNT2 - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_STATUS2 - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_OPENAMOUNTDETAILS2 - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Width
            nwmyGrid.nwobject(SPR_APPLYDATE2 - 1).Width(150);
            nwmyGrid.nwobject(SPR_APPLYTO2 - 1).Width(180);
            nwmyGrid.nwobject(SPR_AMOUNT2 - 1).Width(150);
            nwmyGrid.nwobject(SPR_STATUS2 - 1).Width(120);
            nwmyGrid.nwobject(SPR_OPENAMOUNTDETAILS2 - 1).Width(150);
            #endregion

            #region Column Align
            nwmyGrid.nwobject(SPR_AMOUNT2 - 1).TextAlign("Right");
            nwmyGrid.nwobject(SPR_OPENAMOUNTDETAILS2 - 1).TextAlign("Right");
            #endregion

            #region ShowDetails
            var dtdetails = new DataTable();
            var row = 1;

            if (isInitialize)
            {
                String id = WebApp.nwobjectText("APVNO");
                decimal apvAmount = Parser.ParseDecimal(WebApp.nwobjectText("apvAmount"));
                int rowno = WebApp.nwobjectInt("apvRowno");
                string debitMemo = WebApp.nwobjectText("debitMemoNo");
                bool isResetTax = WebApp.nwobjectBool("isResetTax");
                dtdetails = dal.getLineDtlswRef(id, apvAmount, rowno, debitMemo, isResetTax);
                //nwmyGrid.CreateExcelGrid(dtdetails.Rows.Count - 1, SPR_SUPPLIER);
                dtdetails.Rows.Add();
                nwmyGrid.dataSource(dtdetails);
                nwmyGrid.maxRow(1);
            }
            else
            {
                nwmyGrid.minRow(1);
            }
            #endregion

            //## THEME FORMAT
            nwmyGrid.HeaderBorderColor("#DEDEDE");
            nwmyGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwmyGrid.TableBorderColor("#BBB");
            nwmyGrid.BodyBorderColor("#BBB");
            nwmyGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwmyGrid.HeaderTextColor("#131313");
            //nwmyGrid.HoverColor("#DEDEDE", "inherit");
            //nwmyGrid.SelectedRowHover("#DEDEDE");
            //nwmyGrid.SelectedRowHoverColor("inherit");

            nwmyGrid.varSpreadBook = "nwGridDetailsLD_Book";
            nwmyGrid.varSpreadSheet = "nwGridDetailsLD_Sheet";

            // Eto yung naglalagay ng html script sa container
            //js.makeHTML("#nwGridDetailsLD", nwmyGrid.createTable());
            js.ADD(nwmyGrid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            #endregion
        }

        public void GenerateGridLDWithout(bool isInitialize)
        {
            String isTaxConvert = string.Empty;
            #region GRID
            var nwmyGrid = new nwGrid("nwGridLDWithout");
            var gridID = "nwGridLDWithout";
            nwmyGrid.Type = nwGridType.SpreadCanvas;
            nwmyGrid.CreateExcelGrid(15, SPR_LDW_REQPERIODTOCOVER);
            nwmyGrid.TableHeight(325);
            //SPR_
            //Column Name

            #region NAME


            nwmyGrid.nwobject(SPR_LDW_REASON - 1).ColumnName(SPRNAME_LDW_REASON);
            nwmyGrid.nwobject(SPR_LDW_REASONDESC - 1).ColumnName(SPRNAME_LDW_REASONDESC);
            nwmyGrid.nwobject(SPR_LDW_REMARKS - 1).ColumnName(SPRNAME_LDW_REMARKS);
            nwmyGrid.nwobject(SPR_LDW_PAYEEREF - 1).ColumnName(SPRNAME_LDW_PAYEEREF);
            nwmyGrid.nwobject(SPR_LDW_PAYEEREFNAME - 1).ColumnName(SPRNAME_LDW_PAYEEREFNAME);
            nwmyGrid.nwobject(SPR_LDW_LINETYPE - 1).ColumnName(SPRNAME_LDW_LINETYPE);
            nwmyGrid.nwobject(SPR_LDW_PARTICULARS - 1).ColumnName(SPRNAME_LDW_PARTICULARS);
            nwmyGrid.nwobject(SPR_LDW_CODE - 1).ColumnName(SPRNAME_LDW_CODE);
            nwmyGrid.nwobject(SPR_LDW_ITEMDESC - 1).ColumnName(SPRNAME_LDW_ITEMDESC);
            nwmyGrid.nwobject(SPR_LDW_UOM - 1).ColumnName(SPRNAME_LDW_UOM);
            nwmyGrid.nwobject(SPR_LDW_QUANTITY - 1).ColumnName(SPRNAME_LDW_QUANTITY);
            nwmyGrid.nwobject(SPR_LDW_UNITCOST - 1).ColumnName(SPRNAME_LDW_UNITCOST);
            nwmyGrid.nwobject(SPR_LDW_OCY - 1).ColumnName(SPRNAME_LDW_OCY);
            nwmyGrid.nwobject(SPR_LDW_TAX - 1).ColumnName(SPRNAME_LDW_TAX);
            nwmyGrid.nwobject(SPR_LDW_PROFIT - 1).ColumnName(SPRNAME_LDW_PROFIT);
            nwmyGrid.nwobject(SPR_LDW_MAIN - 1).ColumnName(SPRNAME_LDW_MAIN);
            nwmyGrid.nwobject(SPR_LDW_COSTCENTER - 1).ColumnName(SPRNAME_LDW_COSTCENTER);
            nwmyGrid.nwobject(SPR_LDW_ITEMGROUP - 1).ColumnName(SPRNAME_LDW_ITEMGROUP);
            nwmyGrid.nwobject(SPR_LDW_ACCOUNTDESC - 1).ColumnName(SPRNAME_LDW_ACCOUNTDESC);
            nwmyGrid.nwobject(SPR_LDW_SUBACCCOUNT - 1).ColumnName(SPRNAME_LDW_SUBACCCOUNT);
            nwmyGrid.nwobject(SPR_LDW_SUBSIDIARYLTYPE - 1).ColumnName(SPRNAME_LDW_SUBSIDIARYLTYPE);
            nwmyGrid.nwobject(SPR_LDW_SUBSIDIARYREF - 1).ColumnName(SPRNAME_LDW_SUBSIDIARYREF);
            nwmyGrid.nwobject(SPR_LDW_PERIODFROM - 1).ColumnName(SPRNAME_LDW_PERIODFROM);
            nwmyGrid.nwobject(SPR_LDW_PERIODTO - 1).ColumnName(SPRNAME_LDW_PERIODTO);


            #endregion


            // nwmyGrid.nwobject(SPR_LDW_LINETYPE - 1).Combo(dal.getlinetype());

            //Column Formating
            #region REQUIRED





            nwmyGrid.nwobject(SPR_LDW_REASON - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LDW_PAYEEREF - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LDW_CODE - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LDW_UOM - 1).HeaderFieldRequired(true); ;
            nwmyGrid.nwobject(SPR_LDW_TAX - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LDW_PROFIT - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LDW_MAIN - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LDW_COSTCENTER - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LDW_ITEMGROUP - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LDW_SUBSIDIARYLTYPE - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LDW_SUBACCCOUNT - 1).HeaderFieldRequired(true);
            nwmyGrid.nwobject(SPR_LDW_SUBSIDIARYREF - 1).HeaderFieldRequired(true);

            #endregion

            //   nwmyGrid.nwobject(SPR_LDW_REMARKS - 1).Remarks("<center>Remarks</center>", 500);
            nwmyGrid.nwobject(SPR_LDW_PARTICULARS - 1).Input("");
            //Column BG Color
            #region


            nwmyGrid.nwobject(SPR_LDW_REASON - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LDW_REASONDESC - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LDW_REMARKS - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LDW_PAYEEREF - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LDW_PAYEEREFNAME - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LDW_LINETYPE - 1).BackgroundColor("white");
            nwmyGrid.nwobject(SPR_LDW_PARTICULARS - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LDW_CODE - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LDW_ITEMDESC - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LDW_UOM - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LDW_QUANTITY - 1).BackgroundColor("white");
            nwmyGrid.nwobject(SPR_LDW_UNITCOST - 1).BackgroundColor("white");
            nwmyGrid.nwobject(SPR_LDW_OCY - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LDW_TAX - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LDW_PROFIT - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LDW_MAIN - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LDW_COSTCENTER - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LDW_ITEMGROUP - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LDW_ACCOUNTDESC - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_LDW_SUBACCCOUNT - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LDW_SUBSIDIARYLTYPE - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LDW_SUBSIDIARYREF - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_LDW_PERIODFROM - 1).BackgroundColor("white");
            nwmyGrid.nwobject(SPR_LDW_PERIODTO - 1).BackgroundColor("white");




            #endregion

            nwmyGrid.ButtonMenuAdd("linedetailwoutreftaxConvert", "Tax Convert");
            nwmyGrid.ButtonMenuAdd("linedetailwoutrefresetTax", "Reset Tax");
            nwmyGrid.buttonDelete = true;
            nwmyGrid.buttonSaveColumn = true;
            nwmyGrid.ButtonMenuAdd("linedetailwoutrefsaveExit", "Save and Exit");

            #region WIDTH

            nwmyGrid.nwobject(SPR_LDW_REASON - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_REASONDESC - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_REMARKS - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_PAYEEREF - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_PAYEEREFNAME - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_LINETYPE - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_PARTICULARS - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_CODE - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_ITEMDESC - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_UOM - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_QUANTITY - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_UNITCOST - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_OCY - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_TAX - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_PROFIT - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_PROFITDESC - 1).Width(0);
            nwmyGrid.nwobject(SPR_LDW_MAIN - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_MAINDESC - 1).Width(0);
            nwmyGrid.nwobject(SPR_LDW_COSTCENTER - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_COSTCENTERDESC - 1).Width(0);
            nwmyGrid.nwobject(SPR_LDW_ITEMGROUP - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_ITEMGROUPDESC - 1).Width(0);
            nwmyGrid.nwobject(SPR_LDW_ACCOUNTDESC - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_SUBACCCOUNT - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_SUBSIDIARYLTYPE - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_SUBSIDIARYREF - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_PERIODFROM - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_PERIODTO - 1).Width(150);
            nwmyGrid.nwobject(SPR_LDW_DECIMALPLACE - 1).Width(0);
            nwmyGrid.nwobject(SPR_LDW_REQSUBACCOUNT - 1).Width(0);
            nwmyGrid.nwobject(SPR_LDW_REQSLTYPE - 1).Width(0);
            nwmyGrid.nwobject(SPR_LDW_REQPERIODTOCOVER - 1).Width(0);
            #endregion

            nwmyGrid.nwobject(SPR_LDW_QUANTITY - 1).InputCurrency("linedetailswithoutrefquantity", 5);
            nwmyGrid.nwobject(SPR_LDW_UNITCOST - 1).InputCurrency("lindetailswithoutrefunitcost", 5);
            nwmyGrid.nwobject(SPR_LDW_PERIODFROM - 1).InputDate("dtplinedetailwoutrefperiodfrom");
            nwmyGrid.nwobject(SPR_LDW_PERIODTO - 1).InputDate("dtplinedetailwoutrefperiodto");

            #region ShowDetails
            var dtdetails = new DataTable();
            var row = 1;
            DataTable dx = new DataTable();
            if (isInitialize)
            {

                String empty = dal.isemptylinedetailswithoutref(WebApp.nwobjectText("txtDMno"));
                if (empty.Length > 0)
                {

                    isTaxConvert = WebApp.nwobjectText("IsTaxConvert");
                    if (isTaxConvert == "1")
                    {
                        //     dx = dal.getlinedetailswoutreftaxconvert(WebApp.nwobjectText("txtDMno"));
                        DataTable dt1 = new DataTable();
                        DataSet ds = WebApp.DataSet("nwGridLDWithout");
                        if (ds.Tables.Count > 0)
                        {
                            dt1 = ds.Tables[0];
                        }
                        dx = dal.GetLineDetailsWithoutRefTaxConvertx(dt1, WebApp.nwobjectText("txtDMno"));
                    }
                    else if (isTaxConvert == "2")
                    {
                        //     dx = dal.getlinedetailswoutreftaxconvert(WebApp.nwobjectText("txtDMno"));
                        DataTable dt1 = new DataTable();
                        DataSet ds = WebApp.DataSet("nwGridLDWithout");
                        if (ds.Tables.Count > 0)
                        {
                            dt1 = ds.Tables[0];
                        }
                        dx = RemoveTaxConvertDebitMemoLineDetailwoutref(dt1);
                    }
                    else
                        dx = dal.getlinedetailswoutref(WebApp.nwobjectText("txtDMno"));

                    dx.Rows.Add();
                    nwmyGrid.dataSource(dx);
                }
            }
            else
            {
                nwmyGrid.minRow(1);
            }
            #endregion

            //## THEME FORMAT
            nwmyGrid.HeaderBorderColor("#DEDEDE");
            nwmyGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwmyGrid.TableBorderColor("#BBB");
            nwmyGrid.BodyBorderColor("#BBB");
            nwmyGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwmyGrid.HeaderTextColor("#131313");
            //nwmyGrid.HoverColor("#DEDEDE", "inherit");
            //nwmyGrid.SelectedRowHover("#DEDEDE");
            //nwmyGrid.SelectedRowHoverColor("inherit");

            nwmyGrid.varSpreadBook = "nwGridLDWithout_Book";
            nwmyGrid.varSpreadSheet = "nwGridLDWithout_Sheet";

            // Eto yung naglalagay ng html script sa container
            //js.makeHTML("#nwGridLDWithout", nwmyGrid.createTable());
            js.ADD(nwmyGrid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            #endregion


            if (dx.Rows.Count > 0)
            {
                if (isTaxConvert == "1" || isTaxConvert == "0")
                    js.ADD("$('#nwGridLDWithout').enable(false);");
                else
                {
                    js.ADD("$('#nwGridLDWithout').enable(true);");
                }
            }
            else
            {
                js.ADD("$('#nwGridLDWithout').enable(true);");
            }
        }

        public void CreateTotalAPVGrid(bool isInitialize)
        {

            #region GRID
            var m_spread = new nwGrid("nwGridLDTotalAPV");
            var gridID = "nwGridLDTotalAPV";
            m_spread.Type = nwGridType.SpreadCanvas;
            m_spread.CreateExcelGrid(10, SPR_TOTAL_RCTAG);
            m_spread.TableHeight(325);

            #region Column Name
            m_spread.nwobject(SPR_TOTAL_APVNO - 1).ColumnName(SPRNAME_TOTAL_APVNO);
            m_spread.nwobject(SPR_TOTAL_REASON - 1).ColumnName(SPRNAME_TOTAL_REASON);
            m_spread.nwobject(SPR_TOTAL_REASONDESC - 1).ColumnName(SPRNAME_TOTAL_REASONDESC);
            m_spread.nwobject(SPR_TOTAL_REMARKS - 1).ColumnName(SPRNAME_TOTAL_REMARKS);
            m_spread.nwobject(SPR_TOTAL_APVDATE - 1).ColumnName(SPRNAME_TOTAL_APVDATE);
            m_spread.nwobject(SPR_TOTAL_INVOICE - 1).ColumnName(SPRNAME_TOTAL_INVOICE);
            m_spread.nwobject(SPR_TOTAL_INVOICEDATE - 1).ColumnName(SPRNAME_TOTAL_INVOICEDATE);
            m_spread.nwobject(SPR_TOTAL_AMTDUE - 1).ColumnName(SPRNAME_TOTAL_APVAMOUNT);
            m_spread.nwobject(SPR_TOTAL_DPADV - 1).ColumnName(SPRNAME_TOTAL_DPADV);
            m_spread.nwobject(SPR_TOTAL_DMAPP - 1).ColumnName(SPRNAME_TOTAL_DMAPP);
            m_spread.nwobject(SPR_TOTAL_RETENTION - 1).ColumnName(SPRNAME_TOTAL_RETENTION);
            m_spread.nwobject(SPR_TOTAL_NETAMT - 1).ColumnName(SPRNAME_TOTAL_NETAMT);
            m_spread.nwobject(SPR_TOTAL_DETAILS - 1).ColumnName(SPRNAME_TOTAL_DETAILS);
            m_spread.nwobject(SPR_TOTAL_REMARKS - 1).ColumnName(SPRNAME_TOTAL_REMARKS);
            #endregion
          
            #region Column Required
            m_spread.nwobject(SPR_TOTAL_APVNO - 1).HeaderFieldRequired(true);
            m_spread.nwobject(SPR_TOTAL_REASON - 1).HeaderFieldRequired(true);
            #endregion

            #region Column Template
            //m_spread.nwobject(SPR_TOTAL_DETAILS - 1).Template("<div class='SPR_TOTAL_DETAILS nwCuz071' >...</div>");
            m_spread.nwobject(SPR_TOTAL_DETAILS - 1).ObjectType("button");
            m_spread.nwobject(SPR_TOTAL_DETAILS - 1).BackgroundColor("#006060");
            m_spread.nwobject(SPR_TOTAL_DETAILS - 1).TextAlign("center");
            m_spread.nwobject(SPR_TOTAL_DETAILS - 1).Class("SPR_TOTAL_DETAILS btnSmall btnGreen");
            //nwmyGrid.nwobject(SPR_TOTAL_REMARKS - 1).Input("totalapv_Remarks");
            //m_spread.nwobject(SPR_TOTAL_REMARKS - 1).Remarks("...", 500, true, "Particulars");
            m_spread.nwobject(SPR_TOTAL_REMARKS - 1).ObjectType("button");
            m_spread.nwobject(SPR_TOTAL_REMARKS - 1).BackgroundColor("#006060");
            m_spread.nwobject(SPR_TOTAL_REMARKS - 1).TextAlign("center");
            m_spread.nwobject(SPR_TOTAL_REMARKS - 1).Class("btnSmall");
            #endregion

            #region Column Background Color
            m_spread.nwobject(SPR_TOTAL_APVNO - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_TOTAL_REASON - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_TOTAL_REASONDESC - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_TOTAL_APVDATE - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_TOTAL_INVOICE - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_TOTAL_INVOICEDATE - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_TOTAL_AMTDUE - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_TOTAL_DPADV - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_TOTAL_DMAPP - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_TOTAL_RETENTION - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_TOTAL_NETAMT - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Width
            m_spread.nwobject(SPR_TOTAL_APVNO - 1).Width(210);
            m_spread.nwobject(SPR_TOTAL_REASON - 1).Width(120);
            m_spread.nwobject(SPR_TOTAL_REASONDESC - 1).Width(150);
            m_spread.nwobject(SPR_TOTAL_REMARKS - 1).Width(80);
            m_spread.nwobject(SPR_TOTAL_APVDATE - 1).Width(100);
            m_spread.nwobject(SPR_TOTAL_INVOICE - 1).Width(150);
            m_spread.nwobject(SPR_TOTAL_INVOICEDATE - 1).Width(100);
            m_spread.nwobject(SPR_TOTAL_AMTDUE - 1).Width(150);
            m_spread.nwobject(SPR_TOTAL_REASONTYPE - 1).Width(0);
            m_spread.nwobject(SPR_TOTAL_RCTAG - 1).Width(0);
            #endregion

            #region Column Text Align
            m_spread.nwobject(SPR_TOTAL_AMTDUE - 1).TextAlign("right");
            m_spread.nwobject(SPR_TOTAL_DPADV - 1).TextAlign("right");
            m_spread.nwobject(SPR_TOTAL_DMAPP - 1).TextAlign("right");
            m_spread.nwobject(SPR_TOTAL_RETENTION - 1).TextAlign("right");
            m_spread.nwobject(SPR_TOTAL_NETAMT - 1).TextAlign("right");
            #endregion

            m_spread.buttonInsert = true;
            m_spread.buttonDelete = true;
            m_spread.buttonSaveColumn = true;
            m_spread.buttonResetColumn = true;
            m_spread.GetSaveWith(this.UserDefinedConnectionString, gridID + dal.MenuItemCode + "-2", based.SecurityAccess.RecUser);

            if (string.IsNullOrEmpty(WebApp.nwobjectText("nwDocno")))
                m_spread.ButtonMenuAdd("totalsaveExit", "Save and Exit");

            #region ShowDetails
            var dtdetails = new DataTable();
            var row = 1;

            if (isInitialize)
            {
                String empty = dal.isemptytotal(WebApp.nwobjectText("txtDMno"));
                if (empty.Length > 0)
                {
                    DataTable dx = dal.getTotalAPVData(WebApp.nwobjectText("txtDMno"));
                    dx.Rows.Add();
                    m_spread.dataSource(dx);
                    m_spread.minRow(dx.Rows.Count + 1);
                }
            }
            else
            {
                m_spread.minRow(1);
            }
            #endregion

            //## THEME FORMAT
            m_spread.HeaderBorderColor("#DEDEDE");
            m_spread.rowBackground("#FFFFFF", "#FFFFFF");
            m_spread.TableBorderColor("#BBB");
            m_spread.BodyBorderColor("#BBB");
            m_spread.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            m_spread.HeaderTextColor("#131313");
            //nwmyGrid.HoverColor("#DEDEDE", "inherit");
            //nwmyGrid.SelectedRowHover("#DEDEDE");
            //nwmyGrid.SelectedRowHoverColor("inherit");
            // Eto yung naglalagay ng html script sa container
            m_spread.varSpreadBook = "nwGridLDTotalAPV_Book";
            m_spread.varSpreadSheet = "nwGridLDTotalAPV_Sheet";

            //js.makeHTML("#nwGridLDTotalAPV", m_spread.createTable());
            js.ADD(m_spread.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            #endregion

            js.ADD("setTimeout(function() { $('#nwGridLDTotalAPV').css({'max-height' : '95%', 'min-height' : '95%'}); $('#nwGridLDTotalAPVData').css({'max-height' : '100%', 'min-height' : '100%'}); TotalAPVProp();  } , 150);");
        }

        public void CreateJrnlGrid(bool isInitialize)
        {
            string gridID = "nwGridJECon";
            nwGrid nwmyGrid = new nwGrid(gridID);
            nwmyGrid.Type = nwGridType.SpreadCanvas;
            nwmyGrid.CreateExcelGrid(4, SPR_JE_CASHFLOW);
            nwmyGrid.TableHeight(250);

            #region Column Name             
            string SPRNAME_Seg1Desc = SFObject.returnText("SELECT [Description] FROM SG.SEGMENT WHERE code = '01'", this.UserDefinedConnectionString);
            string SPRNAME_Seg2Desc = SFObject.returnText("SELECT [Description] FROM SG.SEGMENT WHERE code = '02'", this.UserDefinedConnectionString);
            string SPRNAME_Seg3Desc = SFObject.returnText("SELECT [Description] FROM SG.SEGMENT WHERE code = '03'", this.UserDefinedConnectionString);
            string SPRNAME_Seg4Desc = SFObject.returnText("SELECT [Description] FROM SG.SEGMENT WHERE code = '04'", this.UserDefinedConnectionString);
            string SPRNAME_Seg5Desc = SFObject.returnText("SELECT [Description] FROM SG.SEGMENT WHERE code = '05'", this.UserDefinedConnectionString);
            string SPRNAME_Seg6Desc = SFObject.returnText("SELECT [Description] FROM SG.SEGMENT WHERE code = '06'", this.UserDefinedConnectionString);
            nwmyGrid.nwobject(SPR_JE_SEG1 - 1).ColumnName(SPRNAME_Seg1Desc);
            nwmyGrid.nwobject(SPR_JE_SEG2 - 1).ColumnName(SPRNAME_Seg2Desc);
            nwmyGrid.nwobject(SPR_JE_SEG3 - 1).ColumnName(SPRNAME_Seg3Desc);
            nwmyGrid.nwobject(SPR_JE_SEG4 - 1).ColumnName(SPRNAME_Seg4Desc);
            nwmyGrid.nwobject(SPR_JE_SEG5 - 1).ColumnName(SPRNAME_Seg5Desc);
            nwmyGrid.nwobject(SPR_JE_SEG6 - 1).ColumnName(SPRNAME_Seg6Desc);
            nwmyGrid.nwobject(SPR_JE_AccontDesc - 1).ColumnName(SPRNAME_JE_AccontDesc);
            nwmyGrid.nwobject(SPR_JE_Currency - 1).ColumnName(SPRNAME_JE_Currency);
            nwmyGrid.nwobject(SPR_JE_Ocy - 1).ColumnName(SPRNAME_JE_Ocy);
            nwmyGrid.nwobject(SPR_JE_LocalDebit - 1).ColumnName(SPRNAME_JE_LocalDebit);
            nwmyGrid.nwobject(SPR_JE_LocalCredit - 1).ColumnName(SPRNAME_JE_LocalCredit);
            nwmyGrid.nwobject(SPR_JE_HomeDebit - 1).ColumnName(SPRNAME_JE_HomeDebit);
            nwmyGrid.nwobject(SPR_JE_HomeCredit - 1).ColumnName(SPRNAME_JE_HomeCredit);
            nwmyGrid.nwobject(SPR_JE_SubAccount - 1).ColumnName(SPRNAME_JE_SubAccount);
            nwmyGrid.nwobject(SPR_JE_PayeeRef - 1).ColumnName(SPRNAME_JE_PayeeRef);
            nwmyGrid.nwobject(SPR_JE_SubLedtype - 1).ColumnName(SPRNAME_JE_SubLedtype);
            nwmyGrid.nwobject(SPR_JE_SubLedger - 1).ColumnName(SPRNAME_JE_SubLedger);
            nwmyGrid.nwobject(SPR_JE_CASHFLOW - 1).ColumnName(SPRNAME_JE_CASHFLOW);
            #endregion

            #region Column Background
            nwmyGrid.nwobject(SPR_JE_SEG1 - 1).BackgroundColor("Gainsboro");
            nwmyGrid.nwobject(SPR_JE_SEG2 - 1).BackgroundColor("Gainsboro");
            nwmyGrid.nwobject(SPR_JE_SEG3 - 1).BackgroundColor("Gainsboro");
            nwmyGrid.nwobject(SPR_JE_SEG4 - 1).BackgroundColor("Gainsboro");
            nwmyGrid.nwobject(SPR_JE_SEG5 - 1).BackgroundColor("Gainsboro");
            nwmyGrid.nwobject(SPR_JE_SEG6 - 1).BackgroundColor("Gainsboro");
            nwmyGrid.nwobject(SPR_APPLYDATE - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_JE_AccontDesc - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_JE_Currency - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_JE_Ocy - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_JE_LocalDebit - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_JE_LocalCredit - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_JE_HomeDebit - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_JE_HomeCredit - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_JE_SubAccount - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_JE_PayeeRef - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_JE_SubLedger - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_JE_SubLedtype - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_JE_CASHFLOW - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Width
            if (SPRNAME_Seg1Desc.Trim() == "") nwmyGrid.nwobject(SPR_JE_SEG1 - 1).Width(0);
            if (SPRNAME_Seg2Desc.Trim() == "") nwmyGrid.nwobject(SPR_JE_SEG2 - 1).Width(0);
            if (SPRNAME_Seg3Desc.Trim() == "") nwmyGrid.nwobject(SPR_JE_SEG3 - 1).Width(0);
            if (SPRNAME_Seg4Desc.Trim() == "") nwmyGrid.nwobject(SPR_JE_SEG4 - 1).Width(0);
            if (SPRNAME_Seg5Desc.Trim() == "") nwmyGrid.nwobject(SPR_JE_SEG5 - 1).Width(0);
            if (SPRNAME_Seg6Desc.Trim() == "") nwmyGrid.nwobject(SPR_JE_SEG6 - 1).Width(0);
            nwmyGrid.nwobject(SPR_JE_AccontDesc - 1).Width(150);
            nwmyGrid.nwobject(SPR_JE_Currency - 1).Width(150);
            nwmyGrid.nwobject(SPR_JE_Ocy - 1).Width(150);
            nwmyGrid.nwobject(SPR_JE_LocalDebit - 1).Width(150);
            nwmyGrid.nwobject(SPR_JE_LocalCredit - 1).Width(150);
            nwmyGrid.nwobject(SPR_JE_HomeDebit - 1).Width(150);
            nwmyGrid.nwobject(SPR_JE_HomeCredit - 1).Width(150);
            nwmyGrid.nwobject(SPR_JE_SubAccount - 1).Width(150);
            nwmyGrid.nwobject(SPR_JE_PayeeRef - 1).Width(0);
            nwmyGrid.nwobject(SPR_JE_SubLedger - 1).Width(150);
            nwmyGrid.nwobject(SPR_JE_SubLedtype - 1).Width(150);
            #endregion

            #region Column Text Align
            nwmyGrid.nwobject(SPR_JE_Ocy - 1).TextAlign("right");
            nwmyGrid.nwobject(SPR_JE_LocalDebit - 1).TextAlign("right");
            nwmyGrid.nwobject(SPR_JE_LocalCredit - 1).TextAlign("right");
            nwmyGrid.nwobject(SPR_JE_HomeDebit - 1).TextAlign("right");
            nwmyGrid.nwobject(SPR_JE_HomeCredit - 1).TextAlign("right");
            #endregion

            var dtdetails = new DataTable();
            var row = 1;

            if (isInitialize)
            {
                DataTable dt = new DataTable();
                dt = dal.getJrnlEntry(WebApp.nwobjectText("txtDMno"));
                nwmyGrid.minRow(dt.Rows.Count + 1);
                //dt.Rows.Add();
                nwmyGrid.dataSource(dt);              
            }
            else
            {
                nwmyGrid.minRow(1);
            }            

            nwmyGrid.buttonSaveColumn = true;
            nwmyGrid.buttonResetColumn = true;

            //## THEME FORMAT
            nwmyGrid.HeaderBorderColor("#DEDEDE");
            nwmyGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwmyGrid.TableBorderColor("#BBB");
            nwmyGrid.BodyBorderColor("#BBB");
            nwmyGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwmyGrid.HeaderTextColor("#131313");

            nwmyGrid.varSpreadBook = "nwGridJECon_Book";
            nwmyGrid.varSpreadSheet = "nwGridJECon_Sheet";

            //js.makeHTML("#nwGridJECon", nwmyGrid.createTable());
            js.ADD(nwmyGrid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\");");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0);");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\"); $('#nwGridJECon').attr(\"p8title\",\"Journal Entries\");");
        }

        public void GenerateGridApproval(bool isInitialize)
        {
            String isdefaultapprover = string.Empty;

            #region GRID
            var nwmyGrid = new nwGrid("nwGridApproval");
            var gridID = "nwGridApproval";
            nwmyGrid.Type = nwGridType.SpreadCanvas;
            nwmyGrid.CreateExcelGrid(3, SPR_APPROVALTYPE);
            nwmyGrid.TableHeight(100);
            //SPR_
            //Column Name



            #region NAME

            nwmyGrid.nwobject(SPR_APPROVALLEVEL - 1).ColumnName(SPRNAME_APPROVALLEVEL);
            nwmyGrid.nwobject(SPR_APPROVALCODE - 1).ColumnName(SPRNAME_APPROVALCODE);
            nwmyGrid.nwobject(SPR_APPROVALNAME - 1).ColumnName(SPRNAME_APPROVALNAME);

            #endregion




            //Column Formating
            #region REQUIRED

            #endregion
            #region




            nwmyGrid.nwobject(SPR_APPROVALLEVEL - 1).BackgroundColor("gainsboro");
            nwmyGrid.nwobject(SPR_APPROVALCODE - 1).BackgroundColor("cyan");
            nwmyGrid.nwobject(SPR_APPROVALNAME - 1).BackgroundColor("gainsboro");


            #endregion



            #region WIDTH



            nwmyGrid.nwobject(SPR_APPROVALLEVEL - 1).Width(150);
            nwmyGrid.nwobject(SPR_APPROVALCODE - 1).Width(150);
            nwmyGrid.nwobject(SPR_APPROVALNAME - 1).Width(150);
            nwmyGrid.nwobject(SPR_APPROVALTYPE - 1).Width(0);

            #endregion

            #region ShowDetails
            var dtdetails = new DataTable();
            var row = 1;

            if (isInitialize)
            {
                String IsAllowSelectionofapprover = dal.checkisallowselection(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("TranType"));
                String IsRequiredAmount = dal.checkisrequiredamount(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("TranType"));
                String IsAutoPosted = dal.checkisautoposted(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("TranType"));

                if (IsAllowSelectionofapprover.Length > 0)
                {
                    dtdetails = dal.allowselectiongrid(WebApp.nwobjectText("idvallugLocForm"), WebApp.nwobjectText("TranType"), WebApp.nwobjectText("txtDMtrans"));

                }
                else if (IsRequiredAmount.Length > 0)
                {

                }
                else if (IsAutoPosted.Length > 0)
                {

                }
                else
                {
                    dtdetails = dal.defaultselectiongrid(WebApp.nwobjectText("txtDMtrans"));
                    isdefaultapprover = "1";
                }
                nwmyGrid.minRow(dtdetails.Rows.Count);
                dtdetails.Rows.Add();
                nwmyGrid.dataSource(dtdetails);

            }
            else
            {
                nwmyGrid.minRow(1);
            }
            #endregion

            //## THEME FORMAT
            nwmyGrid.HeaderBorderColor("#DEDEDE");
            nwmyGrid.rowBackground("#FFFFFF", "#FFFFFF");
            nwmyGrid.TableBorderColor("#BBB");
            nwmyGrid.BodyBorderColor("#BBB");
            nwmyGrid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwmyGrid.HeaderTextColor("#131313");
            //nwmyGrid.HoverColor("#DEDEDE", "inherit");
            //nwmyGrid.SelectedRowHover("#DEDEDE");
            //nwmyGrid.SelectedRowHoverColor("inherit");
            nwmyGrid.varSpreadBook = "nwGridApproval_Book";
            nwmyGrid.varSpreadSheet = "nwGridApproval_Sheet";
            // Eto yung naglalagay ng html script sa container
            //js.makeHTML("#nwGridApproval", nwmyGrid.createTable());
            js.ADD(nwmyGrid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            if (isdefaultapprover == "1")
                js.ADD("$('#nwGridApproval').enable(false);$('#NwApproval').enable(false)");
            #endregion
        }

        private DataTable LoadSchemaAttach(String trans)
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadSchemaAttachment();
            #endregion

            //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridCon6"));
            DataTable dt = new DataTable();
            DataSet ds = WebApp.DataSet("nwGridCon6");
            if (ds.Tables.Count > 0)
            {
                dt = ds.Tables[0];
            }
            int row = 1;
            foreach (DataRow items in dt.Rows)
            {
                //if (items[SPR_DOCCODE + 1].ToString().Length > 0)
                //{
                //    DataRow dr = dtLIN.NewRow();
                //    dr["DOCNO"] = trans;
                //    dr["DOCCTRL"] = items[SPR_DOCCODE + 1].ToString();
                //    dr["FILEBIN"] = items[SPR_FILEPATH + 1].ToString();
                //    dr["DOCCTRLNO"] = items[SPR_DOCNOCNTRLNO + 1].ToString();
                //    //   dr["RowNo"] = row.ToString();
                //    dtLIN.Rows.Add(dr);
                //    dtLIN.AcceptChanges();
                //}
                if (items[SPR_DOCCODE + 1].ToString().Length > 0 || items[SPR_DOCNOCNTRLNO + 1].ToString().Length > 0 || items[SPR_FILEPATH + 1].ToString().Length > 0)
                {
                    DataRow dr = dtLIN.NewRow();
                    dr["DOCNO"] = trans;
                    dr["DOCCTRL"] = items[SPR_DOCCODE + 1].ToString();
                    dr["FILEBIN"] = items[SPR_FILEPATH + 1].ToString();
                    dr["DOCCTRLNO"] = items[SPR_DOCNOCNTRLNO + 1].ToString();
                    //dr["ROWNO"] = row.ToString();
                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                }
                row++;
            }
        //    SPR_DOCCODE = 0,
        //SPR_DOCDESC = 1,
        //SPR_DOCNOCNTRLNO = 2,
        //SPR_ATTACH = 3,
        //SPR_DL = 4,
        //SPR_REMOVE = 5,
        //SPR_FILEPATH = 6;
            return dtLIN;
        }

        public void CreateProcessGrid(bool isinit)
        {
            var gridID3 = "nwGridCon3";

            nwGrid m_spread = new nwGrid("nwGridCon3");
            m_spread.Type = nwGridType.SpreadCanvas;
            m_spread.CreateExcelGrid(1, SPR3_isValid);

            if (isinit)
            {
                DataTable dt = new DataTable();
                string recuser = based.SecurityAccess.RecUser;
                dt = dal.getProcessData(recuser);

                if (!(dt.Rows.Count == 0))
                {
                    m_spread.minRow(dt.Rows.Count);
                    //dt.Rows.Add();
                    m_spread.dataSource(dt);
                }
                else
                {
                    m_spread.minRow(1);

                }
            }

            #region Column Name
            m_spread.nwobject(SPR3_Checkbox - 1).ColumnName("Select");
            m_spread.nwobject(SPR3_APVNO - 1).ColumnName("Transaction No.");
            m_spread.nwobject(SPR3_ValueDate - 1).ColumnName("Date Created");
            m_spread.nwobject(SPR3_LOCATION - 1).ColumnName("Location with Accountable Forms");
            m_spread.nwobject(SPR3_PayeeCode - 1).ColumnName("Payee Code");
            m_spread.nwobject(SPR3_PayeeName - 1).ColumnName("Payee Name");
            m_spread.nwobject(SPR3_CURRENCY - 1).ColumnName("Currency");
            m_spread.nwobject(SPR3_DMAMT - 1).ColumnName("Debit Memo Amount");
            m_spread.nwobject(SPR3_REMARKS - 1).ColumnName("Remarks");
            #endregion

            #region Column Background Color
            m_spread.nwobject(SPR3_Checkbox - 1).BackgroundColor("White");
            m_spread.nwobject(SPR3_APVNO - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR3_ValueDate - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR3_PayeeCode - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR3_PayeeName - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR3_LOCATION - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR3_CURRENCY - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR3_DMAMT - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR3_REMARKS - 1).BackgroundColor("gainsboro");
            #endregion

            m_spread.nwobject(SPR3_Checkbox - 1).CheckBox(true, "chkapprove");

            #region Column Width 
            m_spread.nwobject(SPR3_Checkbox - 1).Width(60);
            // m_spread.nwobject(SPR3_isValid - 1).Width(0);
            m_spread.nwobject(SPR3_APVNO - 1).Width(220);
            m_spread.nwobject(SPR3_REMARKS - 1).Width(300);
            #endregion

            #region Column Text Align
            m_spread.nwobject(SPR3_DMAMT - 1).TextAlign("Right");
            #endregion

            m_spread.RowHeight(20);
            m_spread.TableHeight(270);
            m_spread.backgroundColor("#FFFFFF");
            m_spread.HeaderBackgroundGradientColor("rgb(255, 255, 255)", "rgb(191, 191, 191)");
            m_spread.HoverColor("rgba(179, 222, 255, 0.57)", "rgba(219, 117, 36,1)");

            m_spread.HeaderBorderColor("#DEDEDE");
            m_spread.rowBackground("#FFFFFF", "#FFFFFF");
            m_spread.TableBorderColor("#BBB");
            m_spread.BodyBorderColor("#BBB");
            m_spread.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            m_spread.HeaderTextColor("#131313");
            m_spread.HoverColor("#DEDEDE", "inherit");
            m_spread.SelectedRowHover("#DEDEDE");
            m_spread.SelectedRowHoverColor("inherit");

            m_spread.varSpreadBook = "nwGridCon3_Book";
            m_spread.varSpreadSheet = "nwGridCon3_Sheet";

            //js.makeHTML("#" + gridID3, m_spread.createTable());
            js.ADD(m_spread.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID3 + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID3 + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID3 + "\")");
            js.makeCSS("#" + gridID3, "border", "1px solid #BBB1B1");
        }

        public void GenerateGrid6(bool IsInitiliaze)
        {
            string gridID = "nwGridConMain6";
            nwGrid nwGridCon = new nwGrid(gridID);
            nwGridCon.Type = nwGridType.SpreadCanvas;
            DataTable dt = new DataTable();


            nwGridCon.CreateExcelGrid(6, SPR_FILEPATH + 1);
            nwGridCon.minRow(1);
            nwGridCon.TableHeight(300);
            nwGridCon.buttonInsert = true;
            nwGridCon.buttonDelete = true;

            #region Column Title
            nwGridCon.nwobject(SPR_DOCCODE).ColumnName(SPRKEYNAME_DOCCODE);
            nwGridCon.nwobject(SPR_DOCDESC).ColumnName(SPRKEYNAME_DOCDESC);
            nwGridCon.nwobject(SPR_DOCNOCNTRLNO).ColumnName(SPRKEYNAME_DOCNO);
            nwGridCon.nwobject(SPR_ATTACH).ColumnName(SPRKEYNAME_ATTACH);
            nwGridCon.nwobject(SPR_DL).ColumnName(SPRKEYNAME_DL);
            nwGridCon.nwobject(SPR_REMOVE).ColumnName(SPRKEYNAME_REMOVE);
            #endregion

            #region Column Width
            nwGridCon.nwobject(SPR_DOCCODE).Width(0);
            nwGridCon.nwobject(SPR_DOCDESC).Width(100);
            nwGridCon.nwobject(SPR_DOCNOCNTRLNO).Width(100);
            nwGridCon.nwobject(SPR_ATTACH).Width(100);
            nwGridCon.nwobject(SPR_DL).Width(100);
            nwGridCon.nwobject(SPR_REMOVE).Width(100);
            nwGridCon.nwobject(SPR_FILEPATH).Width(0);
            #endregion

            #region Column Color
            nwGridCon.nwobject(SPR_DOCDESC).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_ATTACH).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_DL).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_REMOVE).BackgroundColor("gainsboro");

            #endregion

            #region Column Templates     
            //     nwGridCon.nwobject(SPR_ATTACH).Template("<button id='btnattachment'><center>ATTACH</center></button>");
            //     nwGridCon.nwobject(SPR_DL).Template("<a href='"+SPR_FILEPATH+ "' download><button id='btndownload'><center>DOWNLOAD</center></button></a>");
            //      nwGridCon.nwobject(SPR_REMOVE).Template("<button id='btnremoveattachment'><center>REMOVE</center></button>");

           
            nwGridCon.nwobject(SPR_DL).Template("<div class='btnview'><center>View</center></button>");
            nwGridCon.nwobject(SPR_DL).Class("nwGButton");
           
            #endregion

            #region Column Input

            #endregion

            if (string.IsNullOrEmpty(WebApp.nwobjectText("nwDocno")))
            {
                nwGridCon.nwobject(SPR_ATTACH).Template("<div class='btnattachment'><center>Attach</center></button>");
                nwGridCon.nwobject(SPR_REMOVE).Template("<div class='btnremoveattachment'><center>Remove</center></button>");
                nwGridCon.nwobject(SPR_ATTACH).Class("nwGButton");
                nwGridCon.nwobject(SPR_REMOVE).Class("nwGButton");
                nwGridCon.nwobject(SPR_DOCNOCNTRLNO).Input("txtdocno");
            }else
            {
                nwGridCon.nwobject(SPR_ATTACH).Template("<div><center>Attach</center></button>");
                nwGridCon.nwobject(SPR_REMOVE).Template("<div><center>Remove</center></button>");
                nwGridCon.nwobject(SPR_DOCDESC).BackgroundColor("gainsboro");
                nwGridCon.nwobject(SPR_DOCNOCNTRLNO).BackgroundColor("gainsboro");
            }

            if (IsInitiliaze)
            {
                dt = dal.LoadAttachmentRecords(WebApp.nwobjectText("txtDMno"));
                //dt.Rows.Add();
                nwGridCon.dataSource(dt);
                nwGridCon.minRow(1);
            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");
            nwGridCon.HoverColor("#DEDEDE", "inherit");
            nwGridCon.SelectedRowHover("#DEDEDE");
            nwGridCon.SelectedRowHoverColor("inherit");

            nwGridCon.varSpreadBook = "nwGridCon6_Book";
            nwGridCon.varSpreadBook = "nwGridCon6_Sheet";

            //js.makeHTML("#nwGridCon6", nwGridCon.createTable());
            js.ADD(nwGridCon.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            js.ADD("setTimeout(function() { makegreenpropertiesnotempty(); disabledbuttons(); }, 150);");
        }

        public String DebitwRefValidation(String type)
        {
            String errorMessage = string.Empty;

            if (WebApp.nwobjectText("IsTaxConvert") == "2")
                return errorMessage;

            //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridDebitNoteWithRefereceCon"));
            DataTable dt = new DataTable();
            DataSet ds = WebApp.DataSet("nwGridDebitNoteWithRefereceCon");
            if (ds.Tables.Count > 0)
            {
                dt = ds.Tables[0];
            }

            int row = 1;
            bool isempty = true;

            //DataTable dtemp = dal.DebitNotewithrefGetTaxConvert(WebApp.nwGridData(WebApp.nwobjectText("nwGridDebitNoteWithRefereceCon")), WebApp.nwobjectText("txtDMno"), (WebApp.nwobjectBool("chckAutoAllocate") ? 1 : 0));
            //DataTable dtemp2 = dal.getjournlperline(WebApp.nwobjectText("txtDMno"), 1);
            DataTable dtSegmntTemp = new DataTable();
            dtSegmntTemp = getSgmntData.getSegmentData(dal.getSegmentData());

            double openamountotal = 0, dvamountvatextotal = 0;

            //openamountotal = dtemp.AsEnumerable()
            //       .Sum(xtmp => double.Parse(String.IsNullOrEmpty(xtmp.Field<string>(SPR_OPENAMOUNT - 1)) ? "0" : xtmp.Field<string>(SPR_OPENAMOUNT - 1)));

            //dvamountvatextotal = dtemp.AsEnumerable()
            //                 .Sum(xtmp => double.Parse(String.IsNullOrEmpty(xtmp.Field<string>(SPR_DVAMOUNTVATEX - 1)) ? "0" : xtmp.Field<string>(SPR_DVAMOUNTVATEX - 1)));

            foreach (DataRow dr in dt.Rows)
            {
                if (dr[SPR_LINETYPE - 1].ToString() != "Tax")
                {
                    String reqSA = dr[SPR_REQSUBACCOUNT - 1].ToString();
                    String reqSL = dr[SPR_REQSLTYPE - 1].ToString();
                    String reqPeriodDate = dr[SPR_REQPERIODTOCOVER - 1].ToString();

                    int reqCol = dr[SPR_APVNO - 1].ToString().Length;
                        reqCol += dr[SPR_REASON - 1].ToString().Length;
                        reqCol += dr[SPR_PAYEEREF - 1].ToString().Length;                    
                        reqCol += dr[SPR_SEG1 - 1].ToString().Length;
                        reqCol += dr[SPR_SEG2 - 1].ToString().Length;
                        reqCol += dr[SPR_SEG3 - 1].ToString().Length;
                        reqCol += dr[SPR_PARTICULARS - 1].ToString().Length;
                        reqCol += dr[SPR_ITEMGROUPTYPE - 1].ToString().Length;
                        reqCol += dr[SPR_SEG4 - 1].ToString().Length;
                        reqCol += dr[SPR_ITEMGROUPTYPE - 1].ToString().Length;

                    if (reqSA == "1")
                    {
                        reqCol += dr[SPR_SUBACCOUNT - 1].ToString().Length;
                    }
                    if (reqSL == "1")
                    {
                        reqCol += dr[SPR_SUBLEDGERTYPE - 1].ToString().Length;
                        reqCol += dr[SPR_SUBSIDIARYLREF - 1].ToString().Length;
                    }
                    if (reqPeriodDate == "1")
                    {
                        reqCol += dr[SPR_PERIODFROM - 1].ToString().Length;
                        reqCol += dr[SPR_PERIODTO - 1].ToString().Length;
                    }

                    if (reqCol > 0)
                    {
                        isempty = false;
                        if (dr[SPR_APVNO - 1].ToString().Length == 0)
                            errorMessage += "Cannot " + type + ". APV No. row " + row + " is required in.\n";

                        if (dr[SPR_REASON - 1].ToString().Length == 0)
                            errorMessage += "Cannot " + type + ". Reason Code in row " + row + " is required.\n";

                        //if (dr[SPR_PARTICULARS - 1].ToString().Length == 0)
                        //    errorMessage += "Cannot " + type + ". Particulars in row " + row + " is required.\n";

                        if (dr[SPR_PAYEEREF - 1].ToString().Length == 0)
                            errorMessage += "Cannot " + type + ". Payee Reference in row " + row + " is required.\n";

                        if (dr[SPR_ITEMGROUPTYPE - 1].ToString().Length == 0)
                            errorMessage += "Cannot " + type + ". Item Group Type in row " + row + " is required.\n";

                        if (dr[SPR_VATCODE - 1].ToString().Length == 0)
                            errorMessage += "Cannot " + type + ". VAT Short Description in row " + row + " is required.\n";

                        if (dr[SPR_EWTCODE - 1].ToString().Length == 0)
                            errorMessage += "Cannot " + type + ". EWT Short Description in row " + row + " is required.\n";

                        if (Parser.ParseDecimal(dr[SPR_DVAMOUNT - 1].ToString()) == 0)
                            errorMessage += "Cannot " + type + ". DM Amount Amount(VATIN) in row " + row + " is required.\n";

                        if (Parser.ParseDecimal(dr[SPR_DVAMOUNT - 1].ToString()) == 0)
                            errorMessage += "Cannot " + type + ". DM Amount Amount(VATEX) in row " + row + " is required.\n";
                        //else
                        //{
                        //    if (dtemp.Rows.Count >= 1 && dtemp2.Rows.Count >= 1 && dr[SPR_APVNO - 1].ToString().Length != 0)
                        //    {
                        //        DataView dv = new DataView(dtemp2);
                        //        dv.RowFilter = $"[APVNO] = '{dr[SPR_APVNO - 1].ToString()}'";
                        //        if (dv.ToTable().Rows.Count >= 1)
                        //        {
                        //            if(!errorMessage.Contains("Cannot " + type + ". DM OCY Amount(VATEX) must not exceed the APV Amount."))
                        //                errorMessage += "Cannot " + type + ". DM OCY Amount(VATEX) must not exceed the APV Amount.\n";
                        //        }
                        //    }
                        //}
                        //if (Parser.ParseDecimal(dr[SPR_OPENAMOUNT - 1].ToString()) > Parser.ParseDecimal(dr[SPR_APVAMOUNT - 1].ToString()))
                        //{
                        //    errorMessage += "Cannot " + type + ". Open amount should not be greater than the APV Amount in row: " + row + ".\n";
                        //}

                        //if (dr[SPR_APVNO - 1].ToString().Length > 0)
                        //{
                        //    decimal openAMount = Parser.ParseDecimal(dr[SPR_OPENAMOUNT - 1].ToString());
                        //    decimal vatin = Parser.ParseDecimal(dr[SPR_DVAMOUNT - 1].ToString());
                        //    decimal tax1 = Parser.ParseDecimal(dr[SPR_TAXRATE - 1].ToString());
                        //    decimal tax2 = Parser.ParseDecimal(dr[SPR_TAXRATE2 - 1].ToString());
                        //    decimal amount = Math.Round(((vatin / (1 + tax1)) * tax2), 2);
                        //    decimal vatex = vatin - amount;

                        //    if (vatex > openAMount)
                        //    {
                        //        errorMessage += "Cannot " + type + ". DM OCY Amount(VATEX) should not be greater than Open Amount in row " + row + ".\n";
                        //    }                            
                        //}

                        if (dr[SPR_SEG1 - 1].ToString().Length == 0)
                            errorMessage += "Cannot " + type + ". " + dtSegmntTemp.Rows[0]["Description"].ToString() + " in row " + row + " is required.\n";

                        if ((WebApp.nwobjectBool("chckAutoAllocate") ? 1 : 0) == 1)
                        {
                            if (WebApp.nwobjectText("txtTagPC") == "0")
                            {
                                if (dr[SPR_SEG2 - 1].ToString().Length == 0)
                                    errorMessage += "Cannot " + type + ". " + dtSegmntTemp.Rows[1]["Description"].ToString() + " in row " + row + " is required.\n";
                            }
                            else
                            {
                                if (dr[SPR_SEG3 - 1].ToString().Length == 0)
                                    errorMessage += "Cannot " + type + ". " + dtSegmntTemp.Rows[2]["Description"].ToString() + " in row " + row + "  is required.\n";
                            }
                        }
                        else
                        {
                            if (dr[SPR_SEG2 - 1].ToString().Length == 0)
                                errorMessage += "Cannot " + type + ". " + dtSegmntTemp.Rows[1]["Description"].ToString() + " in row " + row + "  is required.\n";

                            if (dr[SPR_SEG3 - 1].ToString().Length == 0)
                                errorMessage += "Cannot " + type + ". " + dtSegmntTemp.Rows[2]["Description"].ToString() + " in row " + row + "   is required.\n";
                        }

                        if (dr[SPR_SEG4 - 1].ToString().Length == 0)
                            errorMessage += "Cannot " + type + ". " + dtSegmntTemp.Rows[3]["Description"].ToString() + " in row " + row + " is required.\n";

                        if (dr[SPR_SEG5 - 1].ToString().Length == 0 && 5 <= dtSegmntTemp.Rows.Count)
                            errorMessage += "Cannot " + type + ". " + dtSegmntTemp.Rows[4]["Description"].ToString() + " in row " + row + " is required.\n";

                        if (dr[SPR_SEG6 - 1].ToString().Length == 0 && 6 <= dtSegmntTemp.Rows.Count)
                            errorMessage += "Cannot " + type + ". " + dtSegmntTemp.Rows[5]["Description"].ToString() + " in row " + row + " is required.\n";

                        if (reqSA == "1")
                        {
                            if (dr[SPR_SUBACCOUNT - 1].ToString().Length == 0)
                                errorMessage += "Cannot " + type + ". Bank Account in row " + row + " is required.\n";
                        }

                        if (reqSL == "1")
                        {
                            if (dr[SPR_SUBLEDGERTYPE - 1].ToString().Length == 0)
                                errorMessage += "Cannot " + type + ". SL Type in row " + row + " is required.\n";

                            if (dr[SPR_SUBSIDIARYLREF - 1].ToString().Length == 0)
                                errorMessage += "Cannot " + type + ". SL Reference in row " + row + " is required.\n";
                        }
                        if (reqPeriodDate == "1")
                        {
                            if (dr[SPR_PERIODFROM - 1].ToString().Length == 0 && dr[SPR_PERIODTO - 1].ToString().Length == 0)
                                errorMessage += "Cannot " + type + ". Period Cover in row " + row + " is required.\n";
                        }
                        if (!ValidateDate(dr[SPR_PERIODFROM - 1].ToString()) && ValidateDate(dr[SPR_PERIODTO - 1].ToString()))
                            errorMessage += "Cannot " + type + ". Period From in row " + row + " is required.\n";

                        if (ValidateDate(dr[SPR_PERIODFROM - 1].ToString()) && !ValidateDate(dr[SPR_PERIODTO - 1].ToString()))
                            errorMessage += "Cannot " + type + ". Period To in row " + row + " is required.\n";

                        //start
                        string apvno = dr[SPR_APVNO - 1].ToString();
                        decimal openamt = 0, sumamt = 0;
                        for (var i = 0; i <= dt.Rows.Count - 1; i++)
                        {
                            if (dt.Rows[i][SPR_LINETYPE - 1].ToString() != "Tax")
                            {
                                string apvnoList = dt.Rows[i][SPR_APVNO - 1].ToString();
                                if (apvno == apvnoList && apvnoList != string.Empty && apvno != string.Empty)
                                {
                                    openamt = Parser.ParseDecimal(dt.Rows[i][SPR_OPENAMOUNT - 1].ToString());
                                    sumamt += Parser.ParseDecimal(dt.Rows[i][SPR_NETAMT - 1].ToString());
                                }
                            }                           
                        }

                        if (!errorMessage.Contains(apvno))
                        {
                            if (openamt < sumamt)
                            {
                                errorMessage += "Cannot " + type + ". Total Net Amount for APV No. " + apvno + " exceeds Outstanding Balance.\n";
                            }
                        }                      
                        //end

                    }
                }
                row++;
            }

            return errorMessage;
        }

        public String ValidateDebitNotewoRef(String Type)
        {
            String errorMsg = string.Empty;

            if (WebApp.nwobjectText("IsTaxConvert") == "2")
                return errorMsg;           

            //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridDebitNoteWithoutRefereceCon"));
            DataTable dt = new DataTable();
            DataSet ds = WebApp.DataSet("nwGridDebitNoteWithoutRefereceCon");
            if (ds.Tables.Count > 0)
            {
                dt = ds.Tables[0];
            }
            int row = 1;
            bool isempty = true;

            DataTable dtSegmntTemp = new DataTable();
            dtSegmntTemp = getSgmntData.getSegmentData(dal.getSegmentData());

            foreach (DataRow dr in dt.Rows)
            {
                if (dr[SPR_without_LINETYPE - 1].ToString() != "Tax")
                {
                    String requiredsubaccount = dr[SPR_without_REQSUBACCOUNT - 1].ToString();
                    String requiredSubsidiaryLedger = dr[SPR_without_REQSLTYPE - 1].ToString();
                    int d = dr[SPR_without_REASON - 1].ToString().Length;
                    d += dr[SPR_without_PAYEEREF - 1].ToString().Length;
                    //d += dr[SPR_without_TAXCODE - 1].ToString().Length;
                    d += dr[SPR_without_SEG1 - 1].ToString().Length;
                    d += dr[SPR_without_SEG2 - 1].ToString().Length;
                    d += dr[SPR_without_SEG3 - 1].ToString().Length;
                    d += dr[SPR_without_SEG4 - 1].ToString().Length;
                    d += dr[SPR_without_ITEMGROUPTYPE - 1].ToString().Length;
                    d += dr[SPR_without_PARTICULARS - 1].ToString().Length;
                    if (requiredsubaccount == "1")
                    {
                        d += dr[SPR_without_SUBACCOUNT - 1].ToString().Length;
                    }
                    if (requiredSubsidiaryLedger == "1")
                    {
                        d += dr[SPR_without_SUBSIDIARYTYPE - 1].ToString().Length;
                        d += dr[SPR_without_SUBSIDIARYREF - 1].ToString().Length;
                    }


                    if (d > 0)
                    {
                        isempty = false;

                        if (dr[SPR_without_REASON - 1].ToString().Length == 0)
                            errorMsg += "Cannot be " + Type + ". Reason Code in row " + row + " is required.\n";

                        //if (dr[SPR_without_PARTICULARS - 1].ToString().Length == 0)
                        //    errorMsg += "Cannot be" + Type + ". Particulars in row " + row + " is required.\n";

                        if (dr[SPR_without_PAYEEREF - 1].ToString().Length == 0)
                            errorMsg += "Cannot be " + Type + ". Payee Reference in row " + row + " is required.\n";

                        if (dr[SPR_without_ITEMGROUPTYPE - 1].ToString().Length == 0)
                            errorMsg += "Cannot be " + Type + ". Item Group Type in row " + row + " is required.\n";

                        if (Parser.ParseDecimal(dr[SPR_without_DMAMOUNT - 1].ToString()) == 0)
                            errorMsg += "Cannot be " + Type + ". DM OCY Amount(VATIN) in row " + row + " is required.\n";

                        if (Parser.ParseDecimal(dr[SPR_without_DMAMOUNTVATEX - 1].ToString()) == 0)
                            errorMsg += "Cannot be " + Type + ". DM OCY Amount(VATEX) in row " + row + " is required.\n";

                        if (dr[SPR_without_VATCODE - 1].ToString().Length == 0)
                            errorMsg += "Cannot be " + Type + ". VAT Short Description in row " + row + " is required.\n";

                        if (dr[SPR_without_EWTCODE - 1].ToString().Length == 0)
                            errorMsg += "Cannot be " + Type + ". EWT Short Description in row " + row + " is required.\n";

                        //if (dr[SPR_without_TAXCODE - 1].ToString().Length == 0)
                        //    errmess += "Cannot " + Type + ". Tax Code is required in row: " + row + " .\n";

                        if (dr[SPR_without_SEG1 - 1].ToString().Length == 0)
                            errorMsg += "Cannot be " + Type + ". " + dtSegmntTemp.Rows[0]["Description"].ToString() + " in row " + row + " is required.\n";

                        if (dr[SPR_without_SEG2 - 1].ToString().Length == 0)
                            errorMsg += "Cannot be " + Type + ". " + dtSegmntTemp.Rows[1]["Description"].ToString() + " in row " + row + " is required.\n";

                        if (dr[SPR_without_SEG3 - 1].ToString().Length == 0)
                            errorMsg += "Cannot be " + Type + ". " + dtSegmntTemp.Rows[2]["Description"].ToString() + " in row " + row + " is required.\n";

                        if (dr[SPR_without_SEG4 - 1].ToString().Length == 0)
                            errorMsg += "Cannot be " + Type + ". " + dtSegmntTemp.Rows[3]["Description"].ToString() + " in row " + row + " is required.\n";

                        if (dr[SPR_without_SEG5 - 1].ToString().Length == 0 && 5 <= dtSegmntTemp.Rows.Count)
                            errorMsg += "Cannot be " + Type + ". " + dtSegmntTemp.Rows[4]["Description"].ToString() + " in row " + row + " is required.\n";

                        if (dr[SPR_without_SEG6 - 1].ToString().Length == 0 && 6 <= dtSegmntTemp.Rows.Count)
                            errorMsg += "Cannot be " + Type + ". " + dtSegmntTemp.Rows[5]["Description"].ToString() + " in row " + row + " is required.\n";

                        if (requiredsubaccount == "1")
                        {
                            if (dr[SPR_without_SUBACCOUNT - 1].ToString().Length == 0)
                                errorMsg += "Cannot be " + Type + ". Bank Account in row " + row + " is required.\n";
                        }

                        if (requiredSubsidiaryLedger == "1")
                        {
                            if (dr[SPR_without_SUBSIDIARYTYPE - 1].ToString().Length == 0)
                                errorMsg += "Cannot be " + Type + ". SL Type is required in row " + row + " is required.\n";

                            if (dr[SPR_without_SUBSIDIARYREF - 1].ToString().Length == 0)
                                errorMsg += "Cannot be " + Type + ". SL Reference in row " + row + " is required.\n";
                        }

                        if (!ValidateDate(dr[SPR_without_PERIODFROM - 1].ToString()) && ValidateDate(dr[SPR_without_PERIODTO - 1].ToString()))
                            errorMsg += "Cannot " + Type + ". Period From in row " + row + " is required.\n";

                        if (ValidateDate(dr[SPR_without_PERIODFROM - 1].ToString()) && !ValidateDate(dr[SPR_without_PERIODTO - 1].ToString()))
                            errorMsg += "Cannot " + Type + ". Period To in row " + row + " is required.\n";

                        //if (dr[SPR_without_APControlAcctCode - 1].ToString().Length == 0)
                        //    errorMsg += "Cannot be " + Type + ". AP Control Account Code in row " + row + " is required.\n";
                    }
                }
                row++;
            }
            //if (isempty)
            //{
            //    errorMsg += "Cannot be " + Type + ". At least one line detail is required.\n";
            //}

            if (WebApp.nwobjectText("descvallugAPControlAccnt").Length <= 0 && !isempty)
            {
                errorMsg += "Cannot be " + Type + ". AP Control Account is required.\n";
            }

            return errorMsg;
        }

        public String linedetailswrefvalidation(String Type)
        {
            String errmess = string.Empty;

            if (WebApp.nwobjectText("IsTaxConvert") == "2")
                return errmess;

            //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridLineDetails"));
            DataTable dt = new DataTable();
            DataSet ds = WebApp.DataSet("nwGridLineDetails");
            if (ds.Tables.Count > 0)
            {
                dt = ds.Tables[0];
            }
            //DataTable dtemp = dal.GetLineDetailsTaxConvert(WebApp.nwGridData(WebApp.nwobjectText("nwGridLineDetails")), WebApp.nwobjectText("txtDMno"));
            //DataTable dtemp2 = dal.getjournlperline(WebApp.nwobjectText("txtDMno"), 2);

            DataTable dtSegmntTemp = new DataTable();
            dtSegmntTemp = getSgmntData.getSegmentData(dal.getSegmentData());

            int row = 1;
            Boolean isempty = true;
            foreach (DataRow dr in dt.Rows)
            {
                if (dr[SPR_LD_LINETYPE - 1].ToString() != "Tax")
                {
                    String requiredsubaccount = dr[SPR_LD_REQSUBACCOUNT - 1].ToString();
                    String requiredSubsidiaryLedger = dr[SPR_LD_REQSLTYPE - 1].ToString();
                    String requiredSubsidiaryLedgerRef = dr[SPR_LD_REQSLREF - 1].ToString();
                    String requiredcover = dr[SPR_LD_REQPERIODTOCOVER - 1].ToString();
                    int d = dr[SPR_LD_APVNO - 1].ToString().Length;
                    d += dr[SPR_LD_REASON - 1].ToString().Length;
                    d += dr[SPR_LD_PARTICULARS - 1].ToString().Length;
                    //     d += dr[SPR_PAYEEREF - 1].ToString().Length; 1
                    d += dr[SPR_LD_SEG1 - 1].ToString().Length;
                    d += dr[SPR_LD_SEG2 - 1].ToString().Length;
                    d += dr[SPR_LD_SEG3 - 1].ToString().Length;
                    d += dr[SPR_LD_SEG4 - 1].ToString().Length;
                    d += dr[SPR_LD_OCYAMMOUNT - 1].ToString().Length;

                    if (requiredsubaccount == "1")
                    {
                        d += dr[SPR_LD_SUBACCOUNT - 1].ToString().Length;
                    }
                    if (requiredSubsidiaryLedger == "1")
                    {
                        d += dr[SPR_LD_SUBSIDIARYLEDGERTYPE - 1].ToString().Length;
                    }

                    if (requiredSubsidiaryLedgerRef == "1")
                    {
                        d += dr[SPR_LD_SUBSIDIARYLEDGERREF - 1].ToString().Length;

                    }
                    if (requiredcover == "1")
                    {
                        d += dr[SPR_LD_PERIODFROM - 1].ToString().Length;
                        d += dr[SPR_LD_PERIODTO - 1].ToString().Length;
                    }

                    if (d > 0)
                    {
                        isempty = false;
                        if (dr[SPR_LD_APVNO - 1].ToString().Length == 0)
                            errmess += "Cannot " + Type + ". APV No. is required in row[" + row + "].\n";

                        if (dr[SPR_LD_REASON - 1].ToString().Length == 0)
                            errmess += "Cannot " + Type + ". Reason is required in row[" + row + "].\n";

                        if (dr[SPR_LD_OCYAMMOUNT - 1].ToString().Length == 0)
                            errmess += "Cannot " + Type + ". DM OCY Amount(VATEX) is required in row[" + row + "].\n";
                        else if (dr[SPR_LD_OCYAMMOUNT - 1].ToString() == "0.00")
                            errmess += "Cannot " + Type + ". DM OCY Amount(VATEX) should not be zero in row[" + row + "].\n";
                        //else
                        //{
                        //    if (dtemp.Rows.Count >= 1 && dtemp2.Rows.Count >= 1 && dr[SPR_LD_APVNO - 1].ToString().Length != 0)
                        //    {
                        //        DataView dv = new DataView(dtemp2);
                        //        dv.RowFilter = $"[APVNO] = '{dr[SPR_APVNO - 1].ToString()}'";
                        //        if (dv.ToTable().Rows.Count >= 1)
                        //        {
                        //            errmess += $"Cannot Save. DM OCY Amount(VATEX) must not exceed the Open Amount {dv.ToTable().Rows[0]["OpenAMT"]}.\n";
                        //        }
                        //    }
                        //}
                        else
                        {
                            if (dr[SPR_LD_APVNO - 1].ToString().Length != 0)
                            {
                                decimal openAMount = dal.getOpenAmountLRF(dr[SPR_LD_APVNO - 1].ToString(), Parser.ParseInt(dr[SPR_LD_APVROWNO - 1].ToString()), WebApp.nwobjectText("txtDMno"), WebApp.nwobjectBool("isResetTax"));
                                decimal vatin = Parser.ParseDecimal(dr[getGridColName(12, false)]);
                                decimal tax1 = Parser.ParseDecimal(dr[getGridColName(39, false)]);
                                decimal tax2 = Parser.ParseDecimal(dr[getGridColName(41, false)]);
                                decimal amount = Math.Round(((vatin/(1+tax1)) * tax2),2);
                                decimal vatex = vatin - amount;

                                if (vatex > openAMount)
                                       errmess += $"Cannot {Type}. DM OCY Amount(VATEX) must not exceed the Outstanding Balance {openAMount} in row[{row}].\n";                                
                            }
                        }

                        if (dr[SPR_LD_PARTICULARS - 1].ToString().Length == 0)
                            errmess += "Cannot " + Type + ". Particulars is required in row: " + row + " .\n";


                        //           if (dr[SPR_PAYEEREF - 1].ToString().Length == 0)
                        //             errmess += "Cannot Save. Payee Reference is required in row: " + row + " .\n";

                        //if (dr[SPR_LD_TAX - 1].ToString().Length == 0)
                        //    errmess += "Cannot Save. Tax is required in row: " + row + " .\n";

                        if (dr[SPR_LD_SEG1 - 1].ToString().Length == 0)
                            errmess += "Cannot " + Type + ". " + dtSegmntTemp.Rows[0]["Description"].ToString() + " is required in row[" + row + "].\n";

                        if (dr[SPR_LD_SEG2 - 1].ToString().Length == 0)
                            errmess += "Cannot " + Type + ". " + dtSegmntTemp.Rows[1]["Description"].ToString() + " is required in row[" + row + "].\n";

                        if (dr[SPR_LD_SEG3 - 1].ToString().Length == 0)
                            errmess += "Cannot " + Type + ". " + dtSegmntTemp.Rows[2]["Description"].ToString() + " is required in row[" + row + "].\n";

                        if (dr[SPR_LD_SEG4 - 1].ToString().Length == 0)
                            errmess += "Cannot " + Type + ". " + dtSegmntTemp.Rows[3]["Description"].ToString() + " is required in row[" + row + "].\n";

                        if (dr[SPR_LD_SEG5 - 1].ToString().Length == 0 && 5 <= dtSegmntTemp.Rows.Count)
                            errmess += "Cannot " + Type + ". " + dtSegmntTemp.Rows[4]["Description"].ToString() + " is required in row[" + row + "].\n";

                        if (dr[SPR_LD_SEG6 - 1].ToString().Length == 0 && 6 <= dtSegmntTemp.Rows.Count)
                            errmess += "Cannot " + Type + ". " + dtSegmntTemp.Rows[5]["Description"].ToString() + " is required in row[" + row + "].\n";

                        if (requiredsubaccount == "1")
                        {
                            if (dr[SPR_LD_SUBACCOUNT - 1].ToString().Length == 0)
                                errmess += "Cannot " + Type + ". Sub Account is required in row[" + row + "].\n";
                        }

                        if (requiredSubsidiaryLedger == "1")
                        {
                            if (dr[SPR_LD_SUBSIDIARYLEDGERTYPE - 1].ToString().Length == 0)
                                errmess += "Cannot " + Type + ". Subsidiary Ledger Type is required in row[" + row + "].\n";
                        }

                        if (requiredSubsidiaryLedger == "1")
                        {
                            if (dr[SPR_LD_SUBSIDIARYLEDGERTYPE - 1].ToString().Length == 0)
                                errmess += "Cannot " + Type + ". Subsidiary Ledger Reference is required in row[" + row + "].\n";
                        }


                        if (requiredcover == "1")
                        {
                            if (dr[SPR_LD_PERIODFROM - 1].ToString().Length == 0 && dr[SPR_LD_PERIODTO - 1].ToString().Length == 0)
                                errmess += "Cannot " + Type + ". Period Cover is required in row[" + row + "].\n";
                        }

                        if (dr[SPR_LD_PERIODFROM - 1].ToString().Length == 0 && dr[SPR_LD_PERIODTO - 1].ToString().Length > 0)
                            errmess += "Cannot " + Type + ". Period From is required in row[" + row + "].\n";

                        if (dr[SPR_LD_PERIODFROM - 1].ToString().Length > 0 && dr[SPR_LD_PERIODTO - 1].ToString().Length == 0)
                            errmess += "Cannot " + Type + ". Period To is required in row[" + row + "].\n";

                    }
                    row++;
                }
            }

            //if (isempty)
            //{
            //    errmess += "Cannot Save. Line Details is required.\n";
            //}


            return errmess;

        }

        public String linedetailswoutrefvalidation()
        {
            String errmess = string.Empty;
            //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridLDWithout"));
            DataTable dt = new DataTable();
            DataSet ds = WebApp.DataSet("nwGridLDWithout");
            if (ds.Tables.Count > 0)
            {
                dt = ds.Tables[0];
            }
            int row = 1;
            Boolean isempty = true;
            foreach (DataRow dr in dt.Rows)
            {
                if (dr[SPR_LDW_LINETYPE - 1].ToString() != "Tax")
                {
                    String requiredsubaccount = dr[SPR_LDW_REQSUBACCOUNT - 1].ToString();
                    String requiredSubsidiaryLedger = dr[SPR_LDW_REQSLTYPE - 1].ToString();
                    String requiredcover = dr[SPR_LDW_REQPERIODTOCOVER - 1].ToString();
                    int d = dr[SPR_LDW_REASON - 1].ToString().Length;
                    d += dr[SPR_LDW_PAYEEREF - 1].ToString().Length;
                    d += dr[SPR_LDW_TAX - 1].ToString().Length;
                    d += dr[SPR_LDW_PROFIT - 1].ToString().Length;
                    d += dr[SPR_LDW_MAIN - 1].ToString().Length;
                    d += dr[SPR_LDW_COSTCENTER - 1].ToString().Length;
                    d += dr[SPR_LDW_ITEMGROUP - 1].ToString().Length;
                    if (requiredsubaccount == "1")
                    {
                        d += dr[SPR_LDW_SUBACCCOUNT - 1].ToString().Length;
                    }
                    if (requiredSubsidiaryLedger == "1")
                    {
                        d += dr[SPR_LDW_SUBSIDIARYLTYPE - 1].ToString().Length;
                        d += dr[SPR_LDW_SUBSIDIARYREF - 1].ToString().Length;
                    }
                    if (requiredcover == "1")
                    {
                        d += dr[SPR_LDW_PERIODFROM - 1].ToString().Length;
                        d += dr[SPR_LDW_PERIODTO - 1].ToString().Length;
                    }


                    if (d > 0)
                    {
                        isempty = true;

                        if (dr[SPR_LDW_REASON - 1].ToString().Length == 0)
                            errmess += "Cannot Save. Reason is required in row: " + row + " .\n";

                        if (dr[SPR_LDW_PAYEEREF - 1].ToString().Length == 0)
                            errmess += "Cannot Save. Payee Reference is required in row: " + row + " .\n";

                        if (dr[SPR_LDW_TAX - 1].ToString().Length == 0)
                            errmess += "Cannot Save. Tax is required in row: " + row + " .\n";


                        if (dr[SPR_LDW_PROFIT - 1].ToString().Length == 0)
                            errmess += "Cannot Save. Profit Center is required in row: " + row + " .\n";

                        if (dr[SPR_LDW_MAIN - 1].ToString().Length == 0)
                            errmess += "Cannot Save. Main is required in row: " + row + " .\n";

                        if (dr[SPR_LDW_COSTCENTER - 1].ToString().Length == 0)
                            errmess += "Cannot Save. Cost Center is required in row: " + row + " .\n";

                        if (dr[SPR_LDW_ITEMGROUP - 1].ToString().Length == 0)
                            errmess += "Cannot Save. Item Group Type is required in row: " + row + " .\n";

                        if (requiredsubaccount == "1")
                        {
                            if (dr[SPR_LDW_SUBACCCOUNT - 1].ToString().Length == 0)
                                errmess += "Cannot Save. Sub Account is required in row: " + row + " .\n";
                        }

                        if (requiredSubsidiaryLedger == "1")
                        {
                            if (dr[SPR_LDW_SUBSIDIARYLTYPE - 1].ToString().Length == 0)
                                errmess += "Cannot Save. Subsidiary Ledger Type is required in row: " + row + " .\n";

                            if (dr[SPR_LDW_SUBSIDIARYREF - 1].ToString().Length == 0)
                                errmess += "Cannot Save. Subsidiary Ledger Reference is required in row: " + row + " .\n";
                        }


                        if (requiredcover == "1")
                        {
                            if (dr[SPR_LDW_PERIODFROM - 1].ToString().Length == 0 && dr[SPR_LDW_PERIODTO - 1].ToString().Length == 0)
                                errmess += "Cannot Save. Period Cover is required in row: " + row + " .\n";
                        }

                        if (dr[SPR_LDW_PERIODFROM - 1].ToString().Length == 0 && dr[SPR_LDW_PERIODTO - 1].ToString().Length > 0)
                            errmess += "Cannot Save. Period From is required in row: " + row + " .\n";

                        if (dr[SPR_LDW_PERIODFROM - 1].ToString().Length > 0 && dr[SPR_LDW_PERIODTO - 1].ToString().Length == 0)
                            errmess += "Cannot Save. Period To is required in row: " + row + " .\n";

                    }
                    row++;
                }
            }
            //if (isempty)
            //{
            //    errmess += "Cannot Save. Line Details is required.\n";
            //}
            return errmess;

        }

        public String totalrefvalidation()
        {
            String errmess = string.Empty;
            //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridLDTotalAPV"));
            DataTable dt = new DataTable();
            DataSet ds = WebApp.DataSet("nwGridLDTotalAPV");
            if (ds.Tables.Count > 0)
            {
                dt = ds.Tables[0];
            }
            int row = 1;
            Boolean isempty = true;
            foreach (DataRow dr in dt.Rows)
            {
                int d = dr[SPR_TOTAL_APVNO - 1].ToString().Length;
                d += dr[SPR_TOTAL_REASON - 1].ToString().Length;

                if (d > 0)
                {
                    isempty = false;
                    if (dr[SPR_TOTAL_APVNO - 1].ToString().Length == 0)
                        errmess += "Cannot be saved. APV No. in row " + row + " is required.\n";

                    if (dr[SPR_TOTAL_REASON - 1].ToString().Length == 0)
                        errmess += "Cannot be saved. Reason Code in row " + row + " is required.\n";
                }
                row++;
            }

            return errmess;

        }

        private void GenHdrAmountFields()
        {
            DataTable dt = dal.getHdrAmount(WebApp.nwobjectText("txtDMno"));

            foreach (DataRow dr in dt.Rows)
            {
                String debitnotewref = dr[0].ToString().Length == 0 ? "0.00" : Parser.ParseDecimal(dr[0].ToString()).ToString("N2"),
                debitnotewoutref = dr[1].ToString().Length == 0 ? "0.00" : Parser.ParseDecimal(dr[1].ToString()).ToString("N2"),
                linedetailswref = dr[2].ToString().Length == 0 ? "0.00" : Parser.ParseDecimal(dr[2].ToString()).ToString("N2"),
                linedetailswoutref = dr[3].ToString().Length == 0 ? "0.00" : Parser.ParseDecimal(dr[3].ToString()).ToString("N2"),
                totalapv = dr[4].ToString().Length == 0 ? "0.00" : Parser.ParseDecimal(dr[4].ToString()).ToString("N2"),
                totaloftotals = dr[5].ToString().Length == 0 ? "0.00" : dr[5].ToString();

                js.makeValueText("#txtDebitNote", debitnotewref);
                js.makeValueText("#txtwDebitNote", debitnotewoutref);
                js.makeValueText("#txtLineDetails", linedetailswref);
                js.makeValueText("#txtLineDetailwithout", linedetailswoutref);
                js.makeValueText("#txtTotalAPV", totalapv);
                js.makeValueText("#total", totaloftotals);
            }

            js.ADD("HdrColorFunc();");
        }

        public String Processvalidation()
        {
            String errmess = String.Empty;
            //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridCon3"));
            DataTable dt = new DataTable();
            DataSet ds = WebApp.DataSet("nwGridCon3");
            if (ds.Tables.Count > 0)
            {
                dt = ds.Tables[0];
            }
            int row = 1;
            bool isNoTicked = true;
            foreach (DataRow dr in dt.Rows)
            {
                String checker = string.Empty;
                if (dr[SPR3_Checkbox - 1].ToString() == "true" || dr[SPR3_Checkbox - 1].ToString() == "1")
                {
                    isNoTicked = false;
                    //String checkisnotallowselection = string.Empty;
                    //string isValid = dr[SPR3_isValid - 1].ToString();
                    //if (isValid == "1")
                    //{
                    //    errmess = ("Cannot Process. Selection of approver is required in row[" + row.ToString() + "].");
                    //}

                    //if (dal.DocAttReqProcess(dr[SPR3_APVNO - 1].ToString(), WebApp.nwobjectText("TranType")))
                    //{
                    //    errmess = ("Cannot Process. All required documents must be complied in row[" + row.ToString() + "].");
                    //}

                    //if (dal.DocAttReqProcess(dr[SPR3_APVNO - 1].ToString(), WebApp.nwobjectText("txtTranTypeAtt")))
                    //{
                    //    errmess = ("Cannot process. All required documents must be complied in row[" + row.ToString() + "].");
                    //}

                    if (!dal.hasLineDtls(dr[SPR3_APVNO - 1].ToString()))
                    {
                        errmess = ("Cannot be processed. Transaction No. "+ dr[SPR3_APVNO - 1].ToString() + " in row " + row.ToString() + " should have at least one line detail.");
                    }

                    string ret = dal.validateReqCompliance(dr[SPR3_APVNO - 1].ToString(), "");

                    if (ret == "0")
                    {
                        errmess += $"Cannot be processed. Requirements Compliance is required in row {row.ToString()}. \n";
                    }
                    else if (ret == "2")
                    {
                        errmess += $"Cannot be processed. Transaction Requirements in row {row.ToString()} has been updated. Please reload details. \n";
                    }
                }
                row++;
            }

            if (isNoTicked)
            {
                errmess += $"Cannot be processed. Please select at least one transaction to process.\n";
            }

            return errmess;
        }

        public String savevalidationallowselection()
        {
            String errmess = string.Empty;
            //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridApproval"));
            DataTable dt = new DataTable();
            DataSet ds = WebApp.DataSet("nwGridApproval");
            if (ds.Tables.Count > 0)
            {
                dt = ds.Tables[0];
            }
            int row = 1;
            foreach (DataRow dr in dt.Rows)
            {
                if (dr[SPR_APPROVALLEVEL - 1].ToString().Length != 0)
                    if (dr[SPR_APPROVALCODE - 1].ToString().Length == 0)
                        errmess += "Cannot Save. Approver is required in row " + row + ".</br>";

                row++;
            }


            return errmess;
        }

        public DataTable RemoveTaxConvertDebitMemowNote(DataTable dt)
        {
            //dt.Rows.Add();
            //foreach(DataRow dr in dt.Rows)
            //{
            //    dr[SPR_DVAMOUNTVATEX - 1] = "0.00";
            //    dr.AcceptChanges();
            //}

            DataView dv = new DataView(dt);
            dv.RowFilter = "A = 'Transaction'";

            return dv.ToTable();
        }

        public DataTable RemoveTaxConvertDebitMemowoutNote(DataTable dt)
        {
            //dt.Rows.Add();
            //foreach (DataRow dr in dt.Rows)
            //{
            //    dr[SPR_without_DMAMOUNTVATEX - 1] = "0.00";
            //    dr.AcceptChanges();
            //}

            DataView dv = new DataView(dt);
            dv.RowFilter = "A = 'Transaction'";
            return dv.ToTable();
        }

        public DataTable RemoveTaxConvertDebitMemoLineDetailwref(DataTable dt)
        {
            //dt.Rows.Add();
            //foreach (DataRow dr in dt.Rows)
            //{
            //    dr[SPR_LD_OCYAMMOUNTVATEX - 1] = "0.00";
            //    dr.AcceptChanges();
            //}

            DataView dv = new DataView(dt);
            dv.RowFilter = "A = 'Transaction'";

            return dv.ToTable();
        }

        public DataTable RemoveTaxConvertDebitMemoLineDetailwoutref(DataTable dt)
        {
            //dt.Rows.Add();

            DataView dv = new DataView(dt);
            dv.RowFilter = "A = 'Transaction'";
            return dv.ToTable();
        }

        private nwGrid GetGridButtonCustom(nwGrid nwmyGrid, string GridID, string TaxConvertID, string ResetTaxID, string SaveID) {
            nwmyGrid.ButtonMenuAdd(TaxConvertID, "Tax Convert");
            nwmyGrid.ButtonMenuAdd(ResetTaxID, "Reset");
            if (GridID != "nwGridDebitNoteWithoutRefereceCon" && WebApp.nwobjectText("IsTaxConvert") != "1")
                nwmyGrid.buttonInsert = true;


            nwmyGrid.buttonDelete = true;
            nwmyGrid.buttonSaveColumn = true;
            nwmyGrid.buttonResetColumn = true;
            nwmyGrid.GetSaveWith(this.UserDefinedConnectionString, GridID + dal.MenuItemCode + "-2", based.SecurityAccess.RecUser);

            if (string.IsNullOrEmpty(WebApp.nwobjectText("nwDocno")))
                nwmyGrid.ButtonMenuAdd(SaveID, "Save and Exit");

            return nwmyGrid;
        }

        private string SelectApprovalValidations()
        {
            StringBuilder err = new StringBuilder();
            int counter = 0;
            #region Select Approver Validation
            if (!isNewRow)
            {
                //DataTable dtSelectApprover = WebApp.nwGridData(WebApp.nwobjectText("nwGridApproval"));
                DataTable dtSelectApprover = new DataTable();
                DataSet ds = WebApp.DataSet("nwGridApproval");
                if (ds.Tables.Count > 0)
                {
                    dtSelectApprover = ds.Tables[0];
                }
                if (dtSelectApprover.Rows.Count >= 1)
                {
                    foreach (DataRow dr in dtSelectApprover.Rows)
                    {
                        counter++;
                        if (string.IsNullOrEmpty(dr[SPR_APPROVALCODE - 1].ToString()))
                            err.Append("Cannot Save. Approver is required is row[" + counter.ToString() + "].").AppendLine();
                    }
                }
            }
            //else
            //{
            //    err.Append("Cannot Save. Selection of Approver is required.").AppendLine();
            //}
            //}

            if (counter <= 0)
                err.Append("Cannot Save. Selection of Approver is required.").AppendLine();
            #endregion

            return err.ToString();
        }

        private void saveAttachment()
        {
            string results = "";
            String trandoc = WebApp.nwobjectText("TranNo");
            DataTable dtAttach = LoadSchemaAttach(trandoc);
            results = validateAttachment(dtAttach);
            if (results == "")
            {
                results = dal.SaveDocuAttachment(dtAttach, trandoc);
                if (dtAttach.Rows.Count > 0) js.ADD("$('#btnDocumentAttached').addClass('btn-default-green'); $('#btnDocumentAttached').removeClass('btn-default-orange');");
                else js.ADD("$('#btnDocumentAttached').removeClass('btn-default-green'); $('#btnDocumentAttached').addClass('btn-default-orange');");

                if (results == "") results = "Saved successfully.";
                else if (results.Contains("Process")) results = "Saved successfully.";
                js.ADD("nwPopupForm_HideModal('attachment')");
            }
            Prompt.Information(results, based.Title);


            //String Resultprompt = "";
            //String trandoc = WebApp.nwobjectText("TranNo");
            //Resultprompt = dal.SaveDocuAttachment(LoadSchemaAttach(trandoc), trandoc);
            //js.ADD("ValidationAttach('" + Resultprompt + "');");
            //DocumentAttachmentProp();

        }

        private string validateAttachment(DataTable DTLin)
        {
            string errorResult = string.Empty;

            if (DTLin.Rows.Count > 0)
            {
                int row = 0;
                foreach (DataRow dr_details in DTLin.Rows)
                {
                    row++;
                    string DocName = dr_details[2 - 1].ToString();
                    if (dr_details[3 - 1].ToString() == "")
                    {
                        if (dal.DocNoReq(DocName, WebApp.nwobjectText("TranType")))
                        {
                            errorResult += String.Format("Cannot Save. Document No. is required in row[{0}].\n", row);
                        }
                    }
                    if (dr_details[4 - 1].ToString() == "")
                    {
                        if (dal.DocAttReq(DocName, WebApp.nwobjectText("TranType")))
                        {
                            errorResult += String.Format("Cannot Save. Attachment is required in row[{0}].\n", row);
                        }
                    }
                }
            }

            return errorResult;


        }

        public void CreateDocAtt(bool IsInitiliaze)
        {
            string gridID = "nwGridAttCon";
            nwGrid nwGridCon = new nwGrid(gridID);
            nwGridCon.Type = nwGridType.SpreadCanvas;
            DataTable dt = new DataTable();

            nwGridCon.CreateExcelGrid(5, SPR_FILEPATH);
            nwGridCon.minRow(1);
            nwGridCon.TableHeight(300);
            nwGridCon.buttonInsert = true;
            nwGridCon.buttonDelete = true;

            nwGridCon.nwobject(SPR_DOCCODE - 1).ColumnName(SPRNAME_DOCCODE);
            nwGridCon.nwobject(SPR_DOCDESC - 1).ColumnName(SPRNAME_DOCDESC);
            nwGridCon.nwobject(SPR_DOCNO - 1).ColumnName(SPRNAME_DOCNO);
            nwGridCon.nwobject(SPR_ATTACH - 1).ColumnName(SPRNAME_ATTACH);
            nwGridCon.nwobject(SPR_VIEW - 1).ColumnName(SPRNAME_VIEW);
            nwGridCon.nwobject(SPR_REMOVE - 1).ColumnName(SPRNAME_REMOVE);

            nwGridCon.nwobject(SPR_DOCCODE - 1).Width(0);
            nwGridCon.nwobject(SPR_DOCDESC - 1).Width(100);
            nwGridCon.nwobject(SPR_DOCNO - 1).Width(100);
            nwGridCon.nwobject(SPR_ATTACH - 1).Width(100);
            nwGridCon.nwobject(SPR_VIEW - 1).Width(100);
            nwGridCon.nwobject(SPR_REMOVE - 1).Width(100);
            nwGridCon.nwobject(SPR_FILEPATH - 1).Width(0);

            nwGridCon.nwobject(SPR_DOCDESC - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_ATTACH - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_VIEW - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_REMOVE - 1).BackgroundColor("gainsboro");

            nwGridCon.nwobject(SPR_VIEW - 1).Template("<div class='btnview'><center>View</center></button>");
            nwGridCon.nwobject(SPR_VIEW - 1).Class("nwGButton");

            if (string.IsNullOrWhiteSpace(WebApp.nwobjectText("nwDocno")))
            {
                nwGridCon.nwobject(SPR_ATTACH - 1).Template("<div id='btnatt'><center>Attach</center></button>");
                nwGridCon.nwobject(SPR_REMOVE - 1).Template("<div id='btnattremove'><center>Remove</center></button>");
                nwGridCon.nwobject(SPR_ATTACH - 1).Class("nwGButton");
                nwGridCon.nwobject(SPR_REMOVE - 1).Class("nwGButton");
                nwGridCon.nwobject(SPR_DOCNO - 1).Input("txtdocno");
            }
            else
            {
                nwGridCon.nwobject(SPR_DOCDESC - 1).BackgroundColor("gainsboro");
                nwGridCon.nwobject(SPR_DOCNO - 1).BackgroundColor("gainsboro");
                nwGridCon.nwobject(SPR_ATTACH - 1).Template("<div><center>Attach</center></button>");
                nwGridCon.nwobject(SPR_REMOVE - 1).Template("<div><center>Remove</center></button>");
            }

            if (IsInitiliaze)
            {
                dt = dal.LoadAttRecords(WebApp.nwobjectText("txtDocnoAtt"), WebApp.nwobjectText("txtTranTypeAtt"));
                //dt.Rows.Add();
                nwGridCon.dataSource(dt);
                nwGridCon.minRow(dt.Rows.Count + 5);
            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");
            nwGridCon.HoverColor("#DEDEDE", "inherit");
            nwGridCon.SelectedRowHover("#DEDEDE");
            nwGridCon.SelectedRowHoverColor("inherit");

            nwGridCon.varSpreadBook = "nwGridAttCon_Book";
            nwGridCon.varSpreadSheet = "nwGridAttCon_Sheet";

            //js.makeHTML("#nwGridAttCon", nwGridCon.createTable());
            js.ADD(nwGridCon.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            js.ADD("setTimeout(function() { makegreenpropertiesnotempty() }, 150);");
        }

        #region Standard Functionality

        private string getGridColName(int col, bool hasRemoveNull)
        {
            string columnName = "";
            col = col + 1;

            while (col > 0)
            {
                int modulo = (col - 1) % 26;
                columnName = Convert.ToChar('A' + modulo) + columnName;
                col = (col - modulo) / 26;
            }

            return string.Format("{0} {1}", columnName, hasRemoveNull ? "<> ''" : "").Trim(); ;
            //return string.Format("column{0} {1}", (col - 1).ToString(), hasRemoveNull ? "<> ''" : "").Trim(); ;
        }

        private DataTable getFilteredGrid(DataTable dt, string colName, string colSort)
        {
            DataTable dtDetails = new DataTable();
            dtDetails = new DataView(dt, colName, colSort, DataViewRowState.CurrentRows).ToTable();
            return dtDetails;
        }

        #endregion


        public string getCodeAtt_List()
        {
            string ListofCode = "";
            DataTable dtLin = LoadCodeAtt_List();

            foreach (DataRow dr in dtLin.Rows)
            {

                ListofCode += dr[SPRNAME_DOCCODE].ToString() + '|';

            }
            return ListofCode;
        }

        private DataTable LoadCodeAtt_List()
        {
            DataTable dtLin = new DataTable();
            //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridAttCon"));
            DataTable dt = new DataTable();
            DataSet ds = WebApp.DataSet("nwGridAttCon");
            if(ds.Tables.Count > 0)
            {
                dt = ds.Tables[0];
            }

            dtLin = getFilteredGrid(dt, getGridColName(SPR_DOCCODE - 1, true), "");
            dtLin.Columns[getGridColName(SPR_DOCCODE - 1, false)].ColumnName = SPRNAME_DOCCODE;
            return dtLin;
        }


        private void saveAtt()
        {
            DataTable dtAtt = new DataTable();
            eRecordOperation i = eRecordOperation.Save;
            RecordOperationResult = validateAtt();
            if (string.IsNullOrWhiteSpace(RecordOperationResult))
            {
                dtAtt = LoadSchemaAtt();
                RecordOperationResult = dal.SaveDocAtt(dtAtt, WebApp.nwobjectText("txtDocnoAtt"));
            }
            if (string.IsNullOrWhiteSpace(RecordOperationResult)) RecordOperationResult = "success";

            if (RecordOperationResult.ToLower().IndexOf("success") >= 0)
            {
                if (dtAtt.Rows.Count > 0) js.ADD("$('#btnDocumentAttached').addClass('btn-default-green'); $('#btnDocumentAttached').removeClass('btn-default-orange');");
                else js.ADD("$('#btnDocumentAttached').removeClass('btn-default-green'); $('#btnDocumentAttached').addClass('btn-default-orange');");
                js.ADD("nwPopupForm_HideModal('popAtt')");
                RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                Prompt.Information(RecordOperationResult, based.Title);
            }
            else
            {
                Prompt.Error(RecordOperationResult, based.Title);
            }
        }

        private string validateAtt()
        {
            string errorResult = string.Empty;
            //DataTable DTLin = WebApp.nwGridData(WebApp.nwobjectText("nwGridAttCon"), true);
            DataTable DTLin = new DataTable();
            DataSet ds = WebApp.DataSet("nwGridAttCon");
            if (ds.Tables.Count > 0)
            {
                DTLin = ds.Tables[0];
            }

            if (DTLin.Rows.Count > 0)
            {
                int row = 0;
                foreach (DataRow dr_details in DTLin.Rows)
                {
                    row++;
                    string DocName = dr_details[1 - 1].ToString();
                    if (!string.IsNullOrWhiteSpace(DocName))
                    {
                        if (dr_details[3 - 1].ToString() == "")
                        {
                            if (dal.DocNoReq(DocName, WebApp.nwobjectText("txtTranTypeAtt")))
                            {
                                errorResult += String.Format("Cannot save. Document No. is required in row[{0}].\n", row);
                            }
                        }
                        if (dr_details[7 - 1].ToString() == "")
                        {
                            if (dal.DocAttReq(DocName, WebApp.nwobjectText("txtTranTypeAtt")))
                            {
                                errorResult += String.Format("Cannot save. Attachment is required in row[{0}].\n", row);
                            }
                        }
                    }
                }
            }

            return errorResult;


        }

        private DataTable LoadSchemaAtt()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadSchemaAtt();
            #endregion

            //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridAttCon"), true);
            DataTable dt = new DataTable();
            DataSet ds = WebApp.DataSet("nwGridAttCon");
            if (ds.Tables.Count > 0)
            {
                dt = ds.Tables[0];
            }

            int row = 1;
            foreach (DataRow items in dt.Rows)
            {
                if (!string.IsNullOrWhiteSpace(items[SPR_DOCCODE - 1].ToString()))
                {
                    DataRow dr = dtLIN.NewRow();
                    dr["DOCCTRL"] = items[SPR_DOCCODE - 1].ToString();
                    dr["FILEPATH"] = items[SPR_FILEPATH - 1].ToString();
                    dr["DOCNO"] = items[SPR_DOCNO - 1].ToString();
                    dr["ROWNO"] = row.ToString();
                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                    row++;
                }

            }
            return dtLIN;
        }

        private void LoadCommonSegments()
        {
            try
            {
                DataTable dtSegments = dal.getDefaultSegments();
                //DataTable dtGrid = WebApp.nwGridData(WebApp.nwobjectText("nwGridDebitNoteWithRefereceCon"), true);
                DataTable dtGrid = new DataTable();
                DataSet ds = WebApp.DataSet("nwGridDebitNoteWithRefereceCon");
                if (ds.Tables.Count > 0)
                {
                    dtGrid = ds.Tables[0];
                }
                int currRow = WebApp.nwobjectInt("currRow");

                if (dtGrid.Rows.Count > 0)
                {
                    for (int d=0; d<= dtGrid.Rows.Count - 1; d++)
                    {
                        if (dtGrid.Rows[d]["A"].ToString() != string.Empty)
                        {
                            if (dtSegments.Rows.Count > 0)
                            {
                                for (int r = 0; r <= dtSegments.Rows.Count - 1; r++)
                                {
                                    string segcode = dtSegments.Rows[r]["Code"].ToString();
                                    string segdesc = dtSegments.Rows[r]["SegmentDesc"].ToString();
                                    string segdef = dtSegments.Rows[r]["SegmentDef"].ToString();
                                    if (segcode == "02")
                                    {
                                        js.ADD($"nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_SEG1} - 1), {d}, '{segdesc}'); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_REF2} - 1), {d}, '{segdef}');");
                                    }
                                    else if (segcode == "03")
                                    {
                                        js.ADD($"nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_SEG3} - 1), {d}, '{segdesc}'); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_REF3} - 1), {d}, '{segdef}');");
                                    }
                                    else if (segcode == "04")
                                    {
                                        js.ADD($"nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_SEG4} - 1), {d}, '{segdesc}'); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_REF4} - 1), {d}, '{segdef}');");
                                    }
                                    else if (segcode == "05")
                                    {
                                        js.ADD($"nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_SEG5} - 1), {d}, '{segdesc}'); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_REF5} - 1), {d}, '{segdef}');");
                                    }
                                }
                            }
                        }
                    }
                }                
            }
            catch (Exception ex)
            { }
        }

        void setRqmtComliProp()
        {
            js.ADD($@"setBtnRqmtCompli({(dal.hasSavedRqrdCompli(WebApp.nwobjectText("txtDocNo")) ? "1" : "''")})");
        }

        private void LoadCommonSegmentsDmwoRef()
        {
            try
            {
                DataTable dtSegments = dal.getDefaultSegments();
                //DataTable dtGrid = WebApp.nwGridData(WebApp.nwobjectText("nwGridDebitNoteWithoutRefereceCon"), true);
                DataTable dtGrid = new DataTable();
                DataSet ds = WebApp.DataSet("nwGridDebitNoteWithoutRefereceCon");
                if (ds.Tables.Count > 0)
                {
                    dtGrid = ds.Tables[0];
                }
                int currRow = WebApp.nwobjectInt("currRow");

                if (dtGrid.Rows.Count > 0)
                {
                    for (int d = 0; d <= dtGrid.Rows.Count - 1; d++)
                    {
                        if (dtGrid.Rows[d]["A"].ToString() != string.Empty)
                        {
                            if (dtSegments.Rows.Count > 0)
                            {
                                for (int r = 0; r <= dtSegments.Rows.Count - 1; r++)
                                {
                                    string segcode = dtSegments.Rows[r]["Code"].ToString();
                                    string segdesc = dtSegments.Rows[r]["SegmentDesc"].ToString();
                                    string segdef = dtSegments.Rows[r]["SegmentDef"].ToString();
                                    if (segcode == "02")
                                    {
                                        js.ADD($"nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_SEG2} - 1), {d}, '{segdesc}'); nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_REF2} - 1), {d}, '{segdef}');");
                                    }
                                    else if (segcode == "03")
                                    {
                                        js.ADD($"nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_SEG3} - 1), {d}, '{segdesc}'); nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_REF3} - 1), {d}, '{segdef}');");
                                    }
                                    else if (segcode == "04")
                                    {
                                        js.ADD($"nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_SEG4} - 1), {d}, '{segdesc}'); nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_REF4} - 1), {d}, '{segdef}');");
                                    }
                                    else if (segcode == "05")
                                    {
                                        js.ADD($"nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_SEG5} - 1), {d}, '{segdesc}'); nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_REF5} - 1), {d}, '{segdef}');");
                                    }
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            { }
        }

        private void LoadTotalAmounts()
        {
            try
            {
                decimal apvamount = 0, openamount = 0;
                string docno = string.Empty;

                //DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridDebitNoteWithRefereceCon"), true);
                DataTable dt = new DataTable();
                DataSet ds = WebApp.DataSet("nwGridDebitNoteWithRefereceCon");
                if (ds.Tables.Count > 0)
                {
                    dt = ds.Tables[0];
                }

                var rows = dt.Select(string.Format("{0} = ''", getGridColName(SPR_LINETYPE - 1, false)));
                foreach (var row in rows)
                    row.Delete();
                dt.AcceptChanges();

                var rows1 = dt.Select(string.Format("{0} = 'Tax'", getGridColName(SPR_LINETYPE - 1, false)));
                foreach (var row in rows1)
                    row.Delete();
                dt.AcceptChanges();

                if (WebApp.nwobjectBool("chckAutoAllocate"))
                {                                                                             
                    foreach (DataRow dRow in dt.Rows)
                    {
                        if (docno != Parser.ParseString(dRow[SPR_APVNO - 1].ToString()))
                        {
                            apvamount += Parser.ParseDecimal(dRow[SPR_APVAMOUNT - 1]);
                            openamount += Parser.ParseDecimal(dRow[SPR_OPENAMOUNT - 1]);
                        }

                        docno = Parser.ParseString(dRow[SPR_APVNO - 1].ToString());
                    }
                }
                else
                {
                    var newDt = dt.AsEnumerable().GroupBy(x => x.Field<string>(getGridColName(SPR_APVNO - 1, false)+"")).Select(y => y.First()).CopyToDataTable();
                    foreach (DataRow dRow in newDt.Rows)
                    {
                        apvamount += Parser.ParseDecimal(dRow[SPR_APVAMOUNT - 1]);
                        openamount += Parser.ParseDecimal(dRow[SPR_OPENAMOUNT - 1]);
                    }
                }               
              
                js.makeValueText("#txtTotalAPVAmount", apvamount.ToString("N2"));
                js.makeValueText("#txtTotalOpenAmount", openamount.ToString("N2"));
            }
            catch { }               
        }

        private DataTable LoadCommonSegment()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN.Columns.Add("com2Code", typeof(string));
            dtLIN.Columns.Add("com2Desc", typeof(string));
            dtLIN.Columns.Add("com3Code", typeof(string));
            dtLIN.Columns.Add("com3Desc", typeof(string));
            dtLIN.Columns.Add("com4Code", typeof(string));
            dtLIN.Columns.Add("com4Desc", typeof(string));
            dtLIN.Columns.Add("com5Code", typeof(string));
            dtLIN.Columns.Add("com5Desc", typeof(string));
            dtLIN.Columns.Add("com6Code", typeof(string));
            dtLIN.Columns.Add("com6Desc", typeof(string));
            #endregion

            DataTable dtCom = dal.dtCommonSegments();

            if (dtCom.Rows.Count > 0)
            {
                DataRow dr = dtLIN.NewRow();
                dr["com2Code"] = dtCom.Rows[0]["Segment2"].ToString();
                dr["com2Desc"] = dtCom.Rows[0]["Segment2Desc"].ToString();
                dr["com3Code"] = dtCom.Rows[0]["Segment3"].ToString();
                dr["com3Desc"] = dtCom.Rows[0]["Segment3Desc"].ToString();
                dr["com4Code"] = dtCom.Rows[0]["Segment4"].ToString();
                dr["com4Desc"] = dtCom.Rows[0]["Segment4Desc"].ToString();
                dr["com5Code"] = dtCom.Rows[0]["Segment5"].ToString();
                dr["com5Desc"] = dtCom.Rows[0]["Segment5Desc"].ToString();
                dr["com6Code"] = dtCom.Rows[0]["Segment6"].ToString();
                dr["com6Desc"] = dtCom.Rows[0]["Segment6Desc"].ToString();

                dtLIN.Rows.Add(dr);
                dtLIN.AcceptChanges();
            }

            return dtLIN;
        }
        private string DatatableToJson(DataTable dt)
        {
            return JsonConvert.SerializeObject(dt);
        }
        private DataTable LoadConfig()
        {
            #region don't change
            DataTable dt = new DataTable();
            dt.Columns.Add("remarksConfig", typeof(string));
            dt.Columns.Add("payeeConfig", typeof(string));
            dt.Columns.Add("defaultLocSegCode", typeof(string));
            dt.Columns.Add("defaultCCSegCode", typeof(string));
            dt.Columns.Add("lastSegment", typeof(string));
            dt.Columns.Add("seg1Desc", typeof(string));
            dt.Columns.Add("ccflag", typeof(string));
            dt.Columns.Add("pcflag", typeof(string));
            dt.Columns.Add("isAllowCurrency", typeof(string));
            dt.Columns.Add("isAllowTax", typeof(string));
            dt.Columns.Add("allowTaxPerTrantype", typeof(string));
            dt.Columns.Add("inputConfig", typeof(string));
            dt.Columns.Add("lblCC", typeof(string));
            #endregion

            DataTable dtCom = dal.dtConfig();

            if (dtCom.Rows.Count > 0)
            {
                DataRow dr = dt.NewRow();
                dr["remarksConfig"] = dtCom.Rows[0]["remarksConfig"].ToString();
                dr["payeeConfig"] = dtCom.Rows[0]["payeeConfig"].ToString();
                dr["defaultLocSegCode"] = dtCom.Rows[0]["locSeg"].ToString();
                dr["defaultCCSegCode"] = dtCom.Rows[0]["ccSeg"].ToString();
                dr["lastSegment"] = dtCom.Rows[0]["lastSeg"].ToString();
                dr["seg1Desc"] = dtCom.Rows[0]["seg1Desc"].ToString();
                dr["ccflag"] = dtCom.Rows[0]["ccSeg"].ToString();
                dr["pcflag"] = dtCom.Rows[0]["pcSeg"].ToString();
                dr["isAllowCurrency"] = dtCom.Rows[0]["allowCur"].ToString();
                dr["isAllowTax"] = dtCom.Rows[0]["allowTax"].ToString();
                dr["allowTaxPerTrantype"] = dtCom.Rows[0]["allowPerTrantype"].ToString();
                dr["inputConfig"] = dtCom.Rows[0]["isEnableInput"].ToString();
                dr["lblCC"] = dtCom.Rows[0]["lblCC"].ToString();

                dt.Rows.Add(dr);
                dt.AcceptChanges();
            }

            return dt;
        }
        private void GetDefaultCC()
        {
            DataTable dO = new DataTable();
            dO = dal.getDTOrigCC(based.SecurityAccess.RecUser, WebApp.nwobjectText("idvallugLocForm"));
            if (dO.Rows.Count == 1)
            {
                js.ADD(string.Format("defaultCCCode='{0}'", dO.Rows.Count > 1 ? string.Empty : dO.Rows[0]["Code"].ToString()));
                js.ADD(string.Format("defaultCCDesc='{0}'", dO.Rows.Count > 1 ? string.Empty : dO.Rows[0]["Description"].ToString()));
            }
        }
        private void GetForexRates()
        {
            string loc = WebApp.nwobjectText("idvallugLocForm");
            string valuedate = WebApp.nwobjectText("valueDate");
            string currency = WebApp.nwobjectText("idvallugCurrency");

            bool isempty = true;

            DataTable dt = new DataTable();
            dt = dal.setforex(valuedate, loc, currency);

            if (dt.Rows.Count > 0)
            {
                isempty = false;
                if (dt.Rows[0][2].ToString().Trim() != "")
                {
                    Prompt.Information(dt.Rows[0][2].ToString(), based.Title);
                    js.makeValueText("#idvallugCurrency", "");
                    js.makeValueText("#descvallugCurrency", "");
                    //js.makeValueText("#txtForexDate", "");
                    js.makeValueText("#txtlocalforex", "");
                    js.makeValueText("#txtHomeforex", "");
                    //js.ADD("$('#wrapForexDate').hide()");
                    //js.ADD("$('#wrapForexFields').hide()");
                }
                else
                {
                    //js.makeValueText("#txtForexDate", dt.Rows[0][3].ToString());
                    js.makeValueText("#txtlocalforex", dt.Rows[0][0].ToString());
                    js.makeValueText("#txtHomeforex", dt.Rows[0][1].ToString());

                    //if (Parser.ParseDecimal(dt.Rows[0][0].ToString()) == 1 && Parser.ParseDecimal(dt.Rows[0][1].ToString()) == 1)
                    //{
                    //    js.ADD("$('#wrapForexDate').hide()");
                    //    js.ADD("$('#wrapForexFields').hide()");
                    //}
                    //else
                    //{
                    //    js.ADD("$('#wrapForexDate').show()");
                    //    js.ADD("$('#wrapForexFields').show()");
                    //}
                }
            }
            if (isempty)
            {
                //js.makeValueText("#txtForexDate", "");
                js.makeValueText("#txtlocalforex", "1.000000");
                js.makeValueText("#txtHomeforex", "1.000000");
                //js.ADD("$('#wrapForexDate').hide()");
                //js.ADD("$('#wrapForexFields').hide()");
            }
        }

        private void DefaultValues()
        {
            DataTable dtConfig = LoadConfig();
            js.ADD(string.Format("remarksConfig='{0}'", dtConfig.Rows[0]["remarksConfig"].ToString()));
            js.ADD(string.Format("payeeConfig='{0}'", dtConfig.Rows[0]["payeeConfig"].ToString()));
            js.ADD(string.Format("defaultLocSegCode='{0}'", dtConfig.Rows[0]["defaultLocSegCode"].ToString()));
            js.ADD(string.Format("defaultCCSegCode='{0}'", dtConfig.Rows[0]["defaultCCSegCode"].ToString()));
            js.ADD(string.Format("lastsegment='{0}'", dtConfig.Rows[0]["lastsegment"].ToString()));
            js.ADD(string.Format("seg1Desc='{0}'", dtConfig.Rows[0]["seg1Desc"].ToString()));
            js.ADD(string.Format("ccflag='{0}'", dtConfig.Rows[0]["ccflag"].ToString()));
            js.ADD(string.Format("pcflag='{0}'", dtConfig.Rows[0]["pcflag"].ToString()));
            js.ADD(string.Format("isAllowCurrency='{0}'", dtConfig.Rows[0]["isAllowCurrency"].ToString()));
            js.ADD(string.Format("isAllowTax='{0}'", dtConfig.Rows[0]["isAllowTax"].ToString()));
            js.ADD(string.Format("allowTaxPerTrantype='{0}'", dtConfig.Rows[0]["allowTaxPerTrantype"].ToString()));
            js.ADD(string.Format("inputConfig='{0}'", dtConfig.Rows[0]["inputConfig"].ToString()));
            js.ADD(string.Format("recuser_glb='{0}'", based.SecurityAccess.RecUser));
            js.ADD(string.Format("$('#lblCC').html('{0}');", dtConfig.Rows[0]["lblCC"].ToString()));
            js.ADD($"jsonCommonSegments ={DatatableToJson(LoadCommonSegment())}");
            js.ADD("RemarksConfiguration();");
        }
        private void ExportExcel(string filename, DataTable dt)
        {
            string LISTINGFILENAME = filename;
            if (dal.LISTINGFILENAME == "") LISTINGFILENAME = "Sheet 1";
            else LISTINGFILENAME = dal.LISTINGFILENAME;

            ListingAndPrint frmlist = new ListingAndPrint
                                                   (ListingAndPrint.FormType.Listing, 1, dt,
                                                   LISTINGFILENAME, UserDefinedConnectionString, SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString),
                                                   based.SecurityAccess.RecUserName, filename);

            //## FOR EXPORTING ###
            Random rnd = new Random();
            string SessionID = DateTime.Now.ToString("yyyyddMMhhmmss") + rnd.Next(0, 9999).ToString().PadRight(4, '0');
            HttpContext.Current.Session["Config_" + SessionID] = frmlist.m_Spread.ExportConfig();
            HttpContext.Current.Session["Data_" + SessionID] = frmlist.m_Spread.GetDataSource();
            HttpContext.Current.Session["Filename_" + SessionID] = filename;
            HttpContext.Current.Session["Header_" + SessionID] = "0";
            js.ADD("ExportSessionID='" + SessionID + "'");
        }
        public void PrintPreview(string docno)
        {
            NoahWebLib.NoahWebFunction.nwFunction nwfunction = new NoahWebLib.NoahWebFunction.nwFunction();

            DataTable dtPreview = new DataTable();
            dtPreview.Columns.Add("klin");
            dtPreview.Columns.Add("dctype");
            dtPreview.Columns.Add("dcfolder");
            dtPreview.Columns.Add("dcfn");
            dtPreview.Columns.Add("dcownerpw");
            dtPreview.Columns.Add("dcuserpw");
            dtPreview.Columns.Add("RecUser");
            dtPreview.Columns.Add("Docno");
            dtPreview.Columns.Add("dcpagename");
            DataRow dr = dtPreview.NewRow();

            string date = SFObject.GetServerDateTime(UserDefinedConnectionString).ToString("MM/dd/yyyy hh:mm:ss");
            date = date.Replace("/", "").Replace(":", "").Replace(" ", "");
            string name = "NOAH " + based.Title + " " + date + " " + docno;

            DataRow drPreview = dtPreview.NewRow();
            drPreview["klin"] = "RD0000000210";
            drPreview["dctype"] = 0;
            drPreview["dcfolder"] = "BSGENENT_PREVIEW";
            drPreview["dcfn"] = nwfunction.RandomString(30) + based.SecurityAccess.RecUser;
            drPreview["dcownerpw"] = "";
            drPreview["dcuserpw"] = "";
            drPreview["RecUser"] = based.SecurityAccess.RecUser;
            drPreview["docno"] = docno;
            drPreview["dcpagename"] = name;
            dtPreview.Rows.Add(drPreview);

            string url = dal.getDocuWriterLink();

            //devmode
            //if (based.isInterface == false)
            //    url = @"http://localhost:2997/";

           
            string dtPreviewJson = JsonConvert.SerializeObject(dtPreview);
            js.ADD(string.Format("ShowDocWriterPreview('{0}',{1},'{2}')", url, dtPreviewJson, name));
        }
        private void LoadCashFlow()
        {
            DataTable dtCF = new DataTable();
            dtCF = dal.getCashFlow(WebApp.nwobjectText("idvallugRsnReq"), WebApp.nwobjectText("igtCode"));
            int currRow = WebApp.nwobjectInt("currRow");

            string cashFlowCode = string.Empty, cashFlowDesc = string.Empty;
            string type = WebApp.nwobjectText("type");
              
            if (dtCF.Rows.Count <= 0)
            {
                if (type == "WREF")
                {
                    Prompt.Information("Cannot proceed. Please setup Cash Flow Type in SG Item Group Type.\n", "Debit Note with Reference");
                    js.ADD($"nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_ITEMGROUPTYPE} - 1), {currRow}, ''); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_ITEMGROUPTYPEDESC} - 1), {currRow}, ''); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_ITEMCODE} - 1), {currRow}, ''); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_ITEMDESC} - 1), {currRow}, ''); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_SEG1} - 1), {currRow}, ''); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_REF1} - 1), {currRow}, '');");

                    if (WebApp.nwobjectText("lastSegment") == "04")
                    {
                        js.ADD($"nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_SEG4} - 1), {currRow}, ''); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_REF4} - 1), {currRow}, '');");
                    }
                    else if (WebApp.nwobjectText("lastSegment") == "05")
                    {
                        js.ADD($"nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_SEG5} - 1), {currRow}, ''); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_REF5} - 1), {currRow}, '');");
                    }
                    else if (WebApp.nwobjectText("lastSegment") == "06")
                    {
                        js.ADD($"nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_SEG6} - 1), {currRow}, ''); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_REF6} - 1), {currRow}, '');");
                    }
                    js.ADD($"nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_ACCOUNTDESC} - 1), {currRow}, '');");
                }
                else if (type == "WOREF")
                {
                    Prompt.Information("Cannot proceed. Please setup Cash Flow Type in SG Item Group Type.\n", "Debit Note without Reference");
                    js.ADD($"nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_ITEMGROUPTYPE} - 1), {currRow}, ''); nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_ITEMGROUPTYPEDESC} - 1), {currRow}, ''); nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_ITEMCODE} - 1), {currRow}, ''); nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_ITEMDESC} - 1), {currRow}, ''); nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_SEG1} - 1), {currRow}, ''); nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_REF1} - 1), {currRow}, '');");

                    if (WebApp.nwobjectText("lastSegment") == "04")
                    {
                        js.ADD($"nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_without_SEG4} - 1), {currRow}, ''); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_without_REF4} - 1), {currRow}, '');");
                    }
                    else if (WebApp.nwobjectText("lastSegment") == "05")
                    {
                        js.ADD($"nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_without_SEG5} - 1), {currRow}, ''); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_without_REF5} - 1), {currRow}, '');");
                    }
                    else if (WebApp.nwobjectText("lastSegment") == "06")
                    {
                        js.ADD($"nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_without_SEG6} - 1), {currRow}, ''); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_without_REF6} - 1), {currRow}, '');");
                    }
                    js.ADD($"nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_ACCOUNTDESC} - 1), {currRow}, '');");
                }               
                return;
            }
            else
            {
                foreach (DataRow dCF in dtCF.Rows)
                {
                    if (type == "WREF")
                    {
                        string tag = dCF["tag"].ToString();
                        if (tag == "2")
                        {
                            cashFlowCode = dCF["cashFlowCode"].ToString();
                            cashFlowDesc = dCF["cashFlowDesc"].ToString();
                            js.ADD($"nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_CASHFLOWCODE} - 1), {currRow}, '{cashFlowCode}'); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_CASHFLOWDESC} - 1), {currRow}, '{cashFlowDesc}');");
                            return;
                        }
                        else if (tag == "1")
                        {
                            cashFlowCode = dCF["cashFlowCode"].ToString();
                            cashFlowDesc = dCF["cashFlowDesc"].ToString();
                            js.ADD($"nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_CASHFLOWCODE} - 1), {currRow}, '{cashFlowCode}'); nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText(({SPR_CASHFLOWDESC} - 1), {currRow}, '{cashFlowDesc}');");
                        }
                    }
                    else if (type == "WOREF")
                    {
                        string tag = dCF["tag"].ToString();
                        if (tag == "2")
                        {
                            cashFlowCode = dCF["cashFlowCode"].ToString();
                            cashFlowDesc = dCF["cashFlowDesc"].ToString();
                            js.ADD($"nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_CASHFLOWCODE} - 1), {currRow}, '{cashFlowCode}'); nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_CASHFLOWDESC} - 1), {currRow}, '{cashFlowDesc}');");
                            return;
                        }
                        else if (tag == "1")
                        {
                            cashFlowCode = dCF["cashFlowCode"].ToString();
                            cashFlowDesc = dCF["cashFlowDesc"].ToString();
                            js.ADD($"nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_CASHFLOWCODE} - 1), {currRow}, '{cashFlowCode}'); nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText(({SPR_without_CASHFLOWDESC} - 1), {currRow}, '{cashFlowDesc}');");
                        }
                    }                   
                }
            }
        }

        private bool ValidateDate(string bGetDate)
        {
            try { Convert.ToDateTime(bGetDate); return true; }
            catch { return false; }
        }

    }

    class GetSegmentData
    {
        
        DataTable dtSgmnt = new DataTable();

        public DataTable getSegmentData(DataTable dt)
        {
            dtSgmnt = dt;
            return dtSgmnt;
        }
        
    }

   


}
