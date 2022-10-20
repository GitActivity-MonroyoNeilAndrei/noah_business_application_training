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
using Newtonsoft.Json;
//using NOAHMenu.SB.DocumentEntry.ReservationEntry;

namespace Noah_Web.forms_BusinessLayer
{
    public class SBReservationEntryBL : nwAction
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

        public enum Cols
        {
            UnitCode = 1,
            UnitDesc = 2,
            InventoryType = 3,
            InventoryClass = 4,
            UOM = 5,
            Project = 6,
            PropertyType = 7,
            UnitStatus = 8,
            LotArea = 9,
            FloorArea = 10,
            InventoryTypeCode = 11,
            InventoryClassCode = 12,
            ModelDesc = 13,
            ReferenceHoldingNo = 14,
            CrossReference = 15,
            LotPrice = 16,
            HousePrice = 17,
            SellingPrice = 18,
            VatAmount = 19,
            GrossSellingPrice = 20,
            Miscellaneous = 21,
            TotalContractPrice = 22,
            SalesDiscount = 23,
            DPDiscount = 24,
            NetContractPrice = 25,
            MiscChargeRate = 26,
            MiscChargeAmt = 27,
            VatRate = 28,
            MinReservationAmt = 29,
            InhouseDPRate = 30,


            Code = 1,
            Description = 2,
            ContractRate = 3,
            TermAmount = 4,
            Misc = 5,
            ContractAmount = 6,
            SalesDiscountLin = 7,
            DPDisc = 8,
            DPDiscAmount = 9,
            NetContractPriceLin = 10,
            TotalNoPayments = 11,
            MonthlyDp = 12,
            FinancingType = 13,
            WithSchedule = 14,
            TermPeriod = 15,
            PenaltyRate = 16,
            AnnualRate = 17,
            Period = 18,

            AddonCategoryCode = 1,
            AddonCategory = 2,
            AddonItemCode = 3,
            AddonItemDesc = 4,
            AddonItemGroupType = 5,
            AddonQuantity = 6,
            AddonUOMCode = 7,
            AddonUOM = 8

        }

        public string trantype = "HLDRES";
        private static DataTable dtRefBase = new DataTable();
        private static DataTable dtMiscDtls = new DataTable();
        private static bool isupdateRefBaseLIN = false;

        //Change this according to Printing Type
        public static string PRINTTYPE = "Reservation Entry";

        public const int
            /* Unit Details */
            SPR_UnitDetails_Category = 1,
            SPR_UnitDetails_UnitCode = 2,
            SPR_UnitDetails_UnitDesc = 3,
            SPR_UnitDetails_UOM = 4,
            SPR_UnitDetails_LotArea = 5,
            SPR_UnitDetails_FloorArea = 6,
            SPR_UnitDetails_InventoryTypeCode = 7,
            SPR_UnitDetails_InventoryType = 8,
            SPR_UnitDetails_InventoryClassCode = 9,
            SPR_UnitDetails_InventoryClass = 10,
            SPR_UnitDetails_Model = 11,
            SPR_UnitDetails_RefHoldingNo = 12,
            SPR_UnitDetails_CrossReferenceCode = 13,
           //SPR_UnitDetails_Level1 = 12,
           //SPR_UnitDetails_Level2 = 13,
           //SPR_UnitDetails_Level3 = 14,
           //SPR_UnitDetails_Level4 = 15,
           //SPR_UnitDetails_Level5 = 16,
           //SPR_UnitDetails_Level6 = 17,
           //SPR_UnitDetails_Level7 = 18,
           //SPR_UnitDetails_Level8 = 19,
           //SPR_UnitDetails_Level9 = 20,
           //SPR_UnitDetails_Level10 = 21,



           /*Discount*/
           SPR_Discount_DiscountCode = 1,
           //SPR_Discount_DiscountTypeCode = 2,
           SPR_Discount_DiscountType = 2,
           SPR_Discount_DiscountRate = 3,
           SPR_Discount_BasisOfDiscount = 4,
           SPR_Discount_DiscountApp = 5,
           SPR_Discount_DiscountAmt = 6,
           SPR_Discount_DiscountSP = 7,
           SPR_Discount_DiscountMSC = 8,

            /* Addons */
            SPR_Addon_CategoryCode = 1,
            SPR_Addon_Category = 2,
            SPR_Addon_AddonItemCode = 3,
            SPR_Addon_AddonItemDesc = 4,
            SPR_Addon_Qty = 5,
            SPR_Addon_UOMCode = 6,
            SPR_Addon_UOM = 7,

            /*Freebies, Promos and Incentives*/
            SPR_FreebiesPromoIncentives_ItemCode = 1,
            SPR_FreebiesPromoIncentives_ItemDesc = 2,
            SPR_FreebiesPromoIncentives_ItemGroupType = 3,
            SPR_FreebiesPromoIncentives_Qty = 4,
            SPR_FreebiesPromoIncentives_PriceVatIn = 5,
            SPR_FreebiesPromoIncentives_Amount = 6,
            SPR_FreebiesPromoIncentives_ReceiverTypeCode = 7,
            SPR_FreebiesPromoIncentives_ReceiverTypeDesc = 8,
            SPR_FreebiesPromoIncentives_ReceiverCode = 9,
            SPR_FreebiesPromoIncentives_ReceiverDesc = 10,

            /*Term Details*/
            SPR_TermDetails_Code = 1,
            SPR_TermDetails_Description = 2,
            SPR_TermDetails_MonthlyPayment = 3,
            SPR_TermDetails_TermPeriodMonths = 4,
            SPR_TermDetails_InterestRate = 5,
            SPR_TermDetails_PenaltyRate = 6,
            SPR_TermDetails_StartDate = 7,
            SPR_TermDetails_EndDate = 8,

            /*Amortization */
            SPR_Amortization_PaymentCatCode = 1,
            SPR_Amortization_PaymentCatDesc = 2,
            SPR_Amortization_PaymentNo = 3,
            SPR_Amortization_DueDate = 4,
            SPR_Amortization_TotalMonthlyPayment = 5,
            SPR_Amortization_MonthlyAmortization = 6,

            SPR_Amortization_Interest_F = 7,
            SPR_Amortization_Interest = 8,
            SPR_Amortization_InterestVat = 9,

            SPR_Amortization_Principal_F = 10,
            SPR_Amortization_Principal = 11,
            SPR_Amortization_PrincipalVat = 12,

            SPR_Amortization_PrincipalOutstanding = 13,
            SPR_Amortization_MonthlyMisc = 14,

            SPR_Amortization_InterestMisc_F = 15,
            SPR_Amortization_InterestMisc = 16,
            SPR_Amortization_InterestMiscVat = 17,

            SPR_Amortization_Miscellaneous_F = 18,
            SPR_Amortization_Miscellaneous = 19,
            SPR_Amortization_VatOnMisc = 20,

            SPR_Amortization_MiscOutstanding = 21,
            SPR_Amortization_TotalOutstanding = 22,
            SPR_Amortization_PeriodNo = 23,

            SPR_APPROVAL_LEVEL = 1,
            SPR_CODE = 2,
            SPR_APPROVER_NAME = 3,

            /*Co Buyer*/
            SPR_COBUYERNAME = 1,
            SPR_COBUYER_BIRTHDATE = 2,
            SPR_COBUYER_GENDERCODE = 3,
            SPR_COBUYER_GENDER = 4,
            SPR_COBUYER_RELATIONSHIPCODE = 5,
            SPR_COBUYER_RELATIONSHIPDESC = 6,
            SPR_COBUYER_TINNO = 7,

            /*Insurance*/
            SPR_INSURANCE_SECONDARY_BENEFICIARIES = 1,
            SPR_INSURANCE_DATEOFBIRTH = 2,
            SPR_INSURANCE_PLACEOFBIRTH = 3,
            SPR_INSURANCE_CITIZENSHIP_CODE = 4,
            SPR_INSURANCE_CITIZENSHIP_DESC = 5,
            SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT = 6,
            SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT_DESC = 7,

            /*Statement Details*/
            SPR_STATEMENT_CODE = 1,
            SPR_STATEMENT_STATEMENT = 2,
            SPR_STATEMENT_YES = 3,
            SPR_STATEMENT_NO = 4,
            SPR_STATEMENT_REMARKS = 5,

            /*Miscellaneous*/
            SPR_MISC_MISCTYPE = 1,
            SPR_ALLOCATIONTYPE = 2,
            SPR_PAYMENTCATEGORY = 3,
            SPR_MISCELLANEOUSDATE = 4,
            SPR_MISCELLANEOUSAMOUNT = 5,
            SPR_ORDERING = 6,


        /* Reference base Unit/Addons */
        SPR_RefAddon_UnitCode = 1,
            SPR_RefAddon_Desc = 2;

        private static int startIndexPaymentDetails = 0,
            spr_PaymentDetailsModeOfPaymentCode = startIndexPaymentDetails,
            spr_PaymentDetailsModeOfPaymentDesc = ++startIndexPaymentDetails,
            spr_PaymentDetailsPaymentMethodCode = ++startIndexPaymentDetails,
            spr_PaymentDetailsPaymentMethodDesc = ++startIndexPaymentDetails,
            spr_PaymentDetailsCurrencyCode = ++startIndexPaymentDetails,
            spr_PaymentDetailsCurrencyDesc = ++startIndexPaymentDetails,
            spr_PaymentDetailsExchangeRateToLocal = ++startIndexPaymentDetails,
            spr_PaymentDetailsExchangeRateToHome = ++startIndexPaymentDetails,
            spr_PaymentDetailsOcyAmount = ++startIndexPaymentDetails,
            spr_PaymentDetailsLocalAmount = ++startIndexPaymentDetails,
            spr_PaymentDetailsHomeAmount = ++startIndexPaymentDetails,
            spr_PaymentDetailsPaymentCenterCode = ++startIndexPaymentDetails,
            spr_PaymentDetailsPaymentCenterDesc = ++startIndexPaymentDetails,
            spr_PaymentDetailsCheckNo = ++startIndexPaymentDetails,
            spr_PaymentDetailsCheckDate = ++startIndexPaymentDetails,
            spr_PaymentDetailsBankCode = ++startIndexPaymentDetails,
            spr_PaymentDetailsBankName = ++startIndexPaymentDetails,
            spr_PaymentDetailsBranch = ++startIndexPaymentDetails,
            spr_PaymentDetailsCardTypeCode = ++startIndexPaymentDetails,
            spr_PaymentDetailsCardTypeDesc = ++startIndexPaymentDetails,
            spr_PaymentDetailsCardName = ++startIndexPaymentDetails,
            spr_PaymentDetailsCardNo = ++startIndexPaymentDetails,
            spr_PaymentDetailsExpiryDate = ++startIndexPaymentDetails,
            spr_PaymentDetailsApprovalNo = ++startIndexPaymentDetails,
            spr_PaymentDetailsAttachmentDetails = ++startIndexPaymentDetails,
            spr_PaymentDetailsUniqueID = ++startIndexPaymentDetails,

            startIndexPaymentDetailsAttach = 0,
            spr_PaymentDetailsAttachAccountNo = startIndexPaymentDetailsAttach,
            spr_PaymentDetailsAttachDocumentName = ++startIndexPaymentDetailsAttach,
            spr_PaymentDetailsAttachDepositoryBankCode = ++startIndexPaymentDetailsAttach,
            spr_PaymentDetailsAttachDepositoryBank = ++startIndexPaymentDetailsAttach,
            spr_PaymentDetailsAttachBranch = ++startIndexPaymentDetailsAttach,
            spr_PaymentDetailsAttachDateDeposited = ++startIndexPaymentDetailsAttach,
            spr_PaymentDetailsAttachAttachment = ++startIndexPaymentDetailsAttach,
            spr_PaymentDetailsAttachFilePath = ++startIndexPaymentDetailsAttach,
            spr_PaymentDetailsAttachViewAttachment = ++startIndexPaymentDetailsAttach,
            spr_PaymentDetailsAttachRemove = ++startIndexPaymentDetailsAttach,
            spr_PaymentDetailsAttachParticulars = ++startIndexPaymentDetailsAttach,
            spr_PaymentDetailsAttachUniqueID = ++startIndexPaymentDetailsAttach,



             /* Payment Term Details */
             startIndexPT = 0,
            SPR_PaymentTermDetails_PaymentCategory = ++startIndexPT,
            SPR_PaymentTermDetails_PaymentCategoryDesc = ++startIndexPT,
            SPR_PaymentTermDetails_PaymentTermCode = ++startIndexPT,
            SPR_PaymentTermDetails_PaymentTermDesc = ++startIndexPT,
            SPR_PaymentTermDetails_ContractRate = ++startIndexPT,
            SPR_PaymentTermDetails_TermAmount = ++startIndexPT,
            SPR_PaymentTermDetails_MiscInstallment = ++startIndexPT,
            SPR_PaymentTermDetails_ContractAmount = ++startIndexPT,
            SPR_PaymentTermDetails_SalesDiscount = ++startIndexPT,
            SPR_PaymentTermDetails_DPDiscount = ++startIndexPT,
            SPR_PaymentTermDetails_DPDiscountRate = ++startIndexPT,
            SPR_PaymentTermDetails_DPDiscountAmount = ++startIndexPT,
            SPR_PaymentTermDetails_NetContractPrice = ++startIndexPT,
            SPR_PaymentTermDetails_NoOfPayments = ++startIndexPT,
            SPR_PaymentTermDetails_MonthlyPayment = ++startIndexPT,
            SPR_PaymentTermDetails_InterestRate = ++startIndexPT,
            SPR_PaymentTermDetails_PenaltyRate = ++startIndexPT,
            SPR_PaymentTermDetails_StartDate = ++startIndexPT,
            SPR_PaymentTermDetails_EndDate = ++startIndexPT,
            SPR_PaymentTermDetails_MiscellaneousDate = ++startIndexPT,
            SPR_PaymentTermDetails_MiscellaneousType = ++startIndexPT,
            SPR_PaymentTermDetails_AllocationType = ++startIndexPT,
            SPR_PaymentTermDetails_MiscellaneousAmount = ++startIndexPT,
            SPR_PaymentTermDetails_Ordering = ++startIndexPT,
            SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc = ++startIndexPT,
            SPR_PaymentTermDetails_DPDiscPrin = ++startIndexPT,
            SPR_PaymentTermDetails_DPDiscMisc = ++startIndexPT;
        public string UnitCodeList;

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
            dal = new SBReservationEntryDAL(this.UserDefinedConnectionString, based.SecurityAccess.ConnectionString, "");
            if (_strmet == "get_Initialize") strFinal = get_Initialize();
            else if (_strmet == "func_Toolbox") strFinal = func_Toolbox(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "get_LookUp") strFinal = get_LookUp(strtool_Met, strtool_Poz, strParameter, strValue);
            else if (_strmet == "getToolBoxDataRet") strFinal = getToolBoxDataRet(strtemp1, strtemp2, strtemp3, strtemp4, strtemp5);
            else if (_strmet == "getToolBoxDataCreate") strFinal = getToolBoxDataCreate(strtemp1, strtemp2, strtemp3, Convert.ToInt32(strtemp4), Convert.ToInt32(strtemp5));
            else if (_strmet == "getToolBoxData") strFinal = getToolBoxData(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "get_Method") strFinal = get_Method(strtemp1, strtemp2, strParameter, strValue);
            else if (_strmet == "act_Method") strFinal = act_Method(strtool_Met, strParameter, strValue);
            else strFinal = js.makeJSPostScript("alert('error:" + strmet + " not excute');");

            Result = strFinal;
        }

        public string strConn = "";
        string RecordOperationResult = String.Empty;
        SBReservationEntryDAL dal;
        //int xtotalrecords = 0;
        Dictionary<string, string> xdic_chars = new Dictionary<string, string>();

        public object NoahWebFunction { get; private set; }

        public SBReservationEntryBL()
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
        public string getToolBoxDataRet(string tableName, string sa, string sc, string si, string sb)
        {
            string strFinal = "";
            int startIndex = 1; int batchRowcounts = -1;
            try { startIndex = Convert.ToInt32(si); }
            catch { }
            try { batchRowcounts = Convert.ToInt32(sb); }
            catch { }
            strFinal = getToolBoxDataCreate(tableName, sa, sc, startIndex, batchRowcounts);

            return js.makeJSPostScript(strFinal);
        }
        public string getToolBoxDataCreate(string tableName, string sql, string strconn, int startIndex, int batchRowcounts)
        {
            string strFinal = String.Empty; string strRet = String.Empty; string sqlOrig = sql;
            DataTable dt = new DataTable();
            int startColumn = 0; int rownumber = startIndex;

            string strOrder = " ISNULL(Moddate,Recdate) DESC,Recdate DESC";
            if (ToolboxOrderData.Trim() != "") strOrder = ToolboxOrderData;
            if (batchRowcounts >= 1)
            {
                startColumn = 1;
                sql = String.Format(@"Select x.* from(select ROW_NUMBER()  over (order by {3}) as [aagrowNum], b.* from ({0})  b) x where x.aagrowNum>={1} AND  x.aagrowNum <={2} order by x.aagrowNum", sql, startIndex, startIndex + batchRowcounts, strOrder);
            }


            dt = SFObjects.LoadDataTable(sql, strconn);
            int rowCount = dt.Rows.Count;

            for (int i = 0; i < rowCount; i++)
            {
                strFinal += "<tr id=\"" + tableName + "-tr" + rownumber + "\">";
                for (int i2 = startColumn; i2 < dt.Columns.Count; i2++)
                {
                    strFinal += "<td class=\"aag" + dt.Columns[i2].ColumnName.ToString().ToLower() + "\">" + dt.Rows[i][i2].ToString().Replace("'", "\\'") + "</td>";
                }
                strFinal += "</tr>";
                rownumber += 1;
            }
            if (batchRowcounts >= 1 && rowCount >= batchRowcounts)
            {
                strRet = "func_ToolboxDataBat(\'" + tableName + "\', \'" + sqlOrig.Replace("\\", "\\\\") + "\', \'" + strconn.Replace("\\", "\\\\") + "\', \'" + (startIndex + batchRowcounts + 1).ToString() + "\', \'" + (batchRowcounts).ToString() + "\');";
            }
            else
            {
                strRet = "func_ToolboxDataRetst();";
            }

            if (batchRowcounts >= 1 && startIndex > 1) strFinal = js.makeAppend(tableName, strFinal);
            else strFinal = js.makeHTML(tableName, strFinal);

            return strFinal + strRet + "func_toolboxCountTotal();";
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

            switch (strMethod)
            {
                case "gettoolboxInquire":
                    strSQL = dal.inquireQuery(based.SecurityAccess.RecUser, WebApp.nwobjectText("txtReservationControlNo"));
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(1);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                //case "getlugLocWithAccntblForms":
                //    strSQL = dal.getLocForm(based.SecurityAccess.RecUser, trantype);
                //    strMethod = strMethod.Substring(3);
                //    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                //    break;
                case "getlugAgent":
                    strSQL = dal.getAgent();
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugBranchProject":
                    strSQL = dal.getBranch(WebApp.nwobjectText("idvallugLocWithAccntblForms"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugLocWithAccntblForms":
                    strSQL = dal.getLoc(based.SecurityAccess.RecUser, trantype);

                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    nwObject.ColumnHide(5);
                    nwObject.ColumnHide(6);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugFinancingType":
                    strSQL = dal.getFinancingType();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugPaymentType":
                    strSQL = dal.getPaymentType();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugClient":
                    strSQL = dal.getClient(based.SecurityAccess.RecUser);
                    nwObject.ColumnHide(5);
                    nwObject.ColumnHide(6);
                    //nwObject.ColumnHide(7);
                    nwObject.ColumnHide(8);
                    nwObject.ColumnHide(9);
                    nwObject.ColumnHide(10);
                    nwObject.ColumnHide(11);
                    nwObject.ColumnHide(12);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugSourceOfSale":
                    strSQL = dal.getSourceOfSale();
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugAccountLoc1":
                    strSQL = dal.getAccountLoc1(WebApp.nwobjectText("idvallugLocWithAccntblForms"));
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugAccountLoc2":
                    strSQL = dal.getAccountLoc2(WebApp.nwobjectText("idvallugLocWithAccntblForms"));
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugAccountOfficer1":
                    strSQL = dal.getAccountOfficer1(WebApp.nwobjectText("idvallugLocWithAccntblForms"), WebApp.nwobjectText("idvallugAccountLoc1"), WebApp.nwobjectText("idvallugAccountOfficer2"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugAccountOfficer2":
                    strSQL = dal.getAccountOfficer2(WebApp.nwobjectText("idvallugLocWithAccntblForms"), WebApp.nwobjectText("idvallugAccountLoc2"), WebApp.nwobjectText("idvallugAccountOfficer1"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugPaymentTermGrouping":
                    strSQL = dal.getPaymentTermGroup(WebApp.nwobjectText("idvallugFinancingType"), WebApp.nwobjectText("idvallugBranchProject"), WebApp.nwobjectText("txtReservationDate"), WebApp.nwobjectDouble("reservAmount"), WebApp.nwobjectDouble("txtMisc"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugUnitCode": /* Unit Details Tab*/
                    strSQL = dal.getUnitCode_UnitDetails(
                                  WebApp.nwobjectText("idvallugBranchProject"),
                                  WebApp.nwobjectText("UnitClass"),
                                  WebApp.nwobjectText("Category"),
                                  WebApp.nwobjectText("ddModel"),
                                  WebApp.nwobjectText("ddInventoryGroup"),
                                  WebApp.nwobjectText("ddtxtUnitType"),
                                  WebApp.nwobjectText("ddPhaseTower"),
                                  WebApp.nwobjectText("ddProductType"),
                                  WebApp.nwobjectText("txtItemGroupType"),
                                  WebApp.nwobjectText("idvallugClient")
                              );
                    nwObject.ColumnHide((int)Cols.UOM);
                    nwObject.ColumnHide((int)Cols.LotArea);
                    nwObject.ColumnHide((int)Cols.FloorArea);

                    nwObject.ColumnHide((int)Cols.InventoryTypeCode);
                    //nwObject.ColumnHide((int)Cols.InventoryType);
                    nwObject.ColumnHide((int)Cols.InventoryClassCode);
                    //nwObject.ColumnHide((int)Cols.InventoryClass);
                    nwObject.ColumnHide((int)Cols.ModelDesc);
                    nwObject.ColumnHide((int)Cols.ReferenceHoldingNo);
                    nwObject.ColumnHide((int)Cols.CrossReference);
                    nwObject.ColumnHide((int)Cols.LotPrice);
                    nwObject.ColumnHide((int)Cols.HousePrice);
                    nwObject.ColumnHide((int)Cols.SellingPrice);
                    nwObject.ColumnHide((int)Cols.VatAmount);
                    nwObject.ColumnHide((int)Cols.GrossSellingPrice);
                    nwObject.ColumnHide((int)Cols.Miscellaneous);
                    nwObject.ColumnHide((int)Cols.TotalContractPrice);
                    nwObject.ColumnHide((int)Cols.SalesDiscount);
                    nwObject.ColumnHide((int)Cols.DPDiscount);
                    nwObject.ColumnHide((int)Cols.NetContractPrice);
                    nwObject.ColumnHide((int)Cols.MiscChargeRate);
                    nwObject.ColumnHide((int)Cols.MiscChargeAmt);
                    nwObject.ColumnHide((int)Cols.VatRate);
                    nwObject.ColumnHide((int)Cols.MinReservationAmt);
                    nwObject.ColumnHide((int)Cols.InhouseDPRate);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                    break;
                case "getlugUnitClassCode":
                    strSQL = dal.getUnitCode_UnitClass(WebApp.nwobjectText("ddtxtUnitClass"));
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                /*Payment Term Details Tab*/
                case "getlugPaymentCategory":
        

                    strSQL = dal.getPaymentCategory();

                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugPaymentTerm":
                    strSQL = dal.getPaymentTerm(WebApp.nwobjectText("idvallugFinancingType"),
                                        WebApp.nwobjectText("UnitCode"),
                                        WebApp.nwobjectText("PaymentCategory"),
                                        WebApp.nwobjectDouble("txtGrossSellingPrice")
                                        );


                    nwObject.ColumnHide((int)Cols.ContractRate);
                    nwObject.ColumnHide((int)Cols.TermAmount);
                    nwObject.ColumnHide((int)Cols.Misc);
                    nwObject.ColumnHide((int)Cols.ContractAmount);
                    nwObject.ColumnHide((int)Cols.SalesDiscountLin);
                    nwObject.ColumnHide((int)Cols.DPDisc);
                    nwObject.ColumnHide((int)Cols.DPDiscAmount);
                    nwObject.ColumnHide((int)Cols.NetContractPriceLin);
                    nwObject.ColumnHide((int)Cols.MonthlyDp);
                    nwObject.ColumnHide((int)Cols.PenaltyRate);
                    nwObject.ColumnHide((int)Cols.AnnualRate);
                    nwObject.ColumnHide((int)Cols.Period);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                    break;

                /*ADD ON Tab*/
                case "getlugAddonItem":
                    strSQL = dal.getAddOnItem(WebApp.nwobjectText("ItemGroupType"), WebApp.nwobjectText("ItemGroup"));
                    nwObject.ColumnHide((int)Cols.AddonCategoryCode);
                    nwObject.ColumnHide((int)Cols.AddonCategory);
                    nwObject.ColumnHide((int)Cols.AddonQuantity);
                    nwObject.ColumnHide((int)Cols.AddonUOMCode);
                    nwObject.ColumnHide((int)Cols.AddonUOM);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugDiscount":
                    strSQL = dal.getDiscount();/*WebApp.nwobjectText("idvallugBranchProject"),WebApp.nwobjectText("ddDiscountType")*/
                    nwObject.ColumnHide(3);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                /*Miscellaneous Tab*/
                case "getlugMisc":
                    strSQL = dal.getMiscellaneous(WebApp.nwobjectText("idvallugBranchProject"), trantype);
                    //nwObject.ColumnHide(2);
                    //nwObject.ColumnHide(3);
                    //nwObject.ColumnHide(4);
                    //nwObject.ColumnHide(5);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


                case "getlugMiscType":
                    //strSQL = dal.getMiscellaneousType(); 
                    //strSQL = dal.GetPaymentType()
                    strSQL = dal.getlugMiscType();

                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                /*Freebies and Promos*/
                case "getlugFreebiesItemcode":
                    strSQL = dal.getFreebiesItemCode(WebApp.nwobjectText("idvallugBranchProject"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugAllocType":
                    strSQL = dal.getlugAllocType();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugPaymentCategoryMisc":
                    strSQL = dal.getlugPaymentCategoryMisc(based.SecurityAccess.RecUser);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;


                case "getlugReceiverType":
                    strSQL = dal.getFreebiesReceiverType();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugReceiver":
                    strSQL = dal.getFreebiesReceiver(WebApp.nwobjectText("ReceiverType"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                /*Co Buyer*/
                case "getlugCoBuyer":
                    strSQL = dal.getCoBuyer(WebApp.nwobjectText("idvallugBranchProject"), WebApp.nwobjectText("idvallugClient"));
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    nwObject.ColumnHide(5);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                /*Other Statement*/
                case "getlugStatement":
                    strSQL = dal.getStatementCode(WebApp.nwobjectText("ddtxtInsuranceCompany"));
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    nwObject.ColumnHide(5);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugCitizenship":
                    strSQL = dal.getCitizenship();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;

                case "getlugRelationshipToTheApplicant":
                    strSQL = dal.getRelationshipToTheApplicant();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                //case "getlugSourceOfSale":
                //    strSQL = dal.getSourceOfSale();
                //    strMethod = strMethod.Substring(3);
                //    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                //    break;
                case "getlugApproverCode":
                    strSQL = dal.getApproverCode(WebApp.nwobjectText("idvallugLocWithAccntblForms"), WebApp.nwobjectText("Level"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugPaymentDetailsPaymentMethod":
                    strSQL = dal.getPaymentDetailsPaymentMethod();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugPaymentDetailsModeOfPayment":
                    strSQL = dal.getPaymentDetailsModeOfPayment();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugCurrency":
                    strSQL = dal.getPaymentDetailsCurrency(WebApp.nwobjectText("locFormCode"));
                    strMethod = strMethod.Substring(3);
                    nwObject.ColumnHide(3);
                    nwObject.ColumnHide(4);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugPaymentCenter":
                    strSQL = dal.getPaymentDetailsPaymentCenter();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugCardType":
                    strSQL = dal.getPaymentDetailsCardType();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugbank":
                    strSQL = dal.getBank();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugAccountNo":
                    strSQL = dal.getAccountNo();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugCategory":
                    strSQL = dal.getlugCategory(WebApp.nwobjectText("idvallugFinancingType"), WebApp.nwobjectText("txtUnitCode"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugDiscountType":
                    strSQL = dal.getlugDiscountType();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugBasisDiscount":
                    strSQL = dal.getlugBasisDiscount();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugDiscountApp":
                    strSQL = dal.getlugBasisDiscount();
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugAddOnItems":



                    strSQL = dal.getAddOnItem(WebApp.nwobjectText("ItemGroupType"), WebApp.nwobjectText("ItemGroup"));

                    nwObject.ColumnHide((int)Cols.AddonCategoryCode);
                    nwObject.ColumnHide((int)Cols.AddonCategory);
                    nwObject.ColumnHide((int)Cols.AddonQuantity);
                    nwObject.ColumnHide((int)Cols.AddonUOMCode);
                    nwObject.ColumnHide((int)Cols.AddonUOM);
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookup(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);
                    break;
                case "getlugUnitCode_refBased":

                    strSQL = dal.getlugUnitCode_refBased(WebApp.nwobjectText("new_txtUniCode"));
                    strMethod = strMethod.Substring(3);
                    strFinal = nwObject.make_TableLookupList(strMethod, strSQL, strConn, emptyDT, mouseDownFunc, mouseOverFunc);

                    break;




            }

            return strFinal;
        }
        public void UponRefreshLoadCombo()
        {
            //js.makeComboBox("#ddtxtPhase", dal.LoadComboPhase());
            //js.makeComboBox("#ddtxtUnitType", dal.LoadComboInventoryType(WebApp.nwobjectText("ddtxtPhase")));
            //js.makeComboBox("#ddtxtUnitClass", dal.LoadComboUnitClass());
            //js.makeComboBox("#ddlNoOfUnits", dal.LoadNoOfUnits());
        }

        public void LoadCombo()
        {
            //js.makeComboBox("#ddtxtPhase", dal.LoadComboPhase());
            //js.makeComboBox("#ddtxtUnitType", dal.LoadComboInventoryType(WebApp.nwobjectText("ddtxtPhase")));
            //js.makeComboBox("#ddtxtUnitClass", dal.LoadComboUnitClass());
            //js.makeComboBox("#ddlNoOfUnits", dal.LoadNoOfUnits());
            //js.makeComboBox("#ddInventoryGroup", dal.LoadInventoryGroup());
            //js.makeComboBox("#ddProductType", dal.LoadProductType());
            //js.makeComboBox("#ddDiscountType", dal.LoadDiscountType());

            //js.makeComboBox("#ddtxtInsuranceCompany", dal.LoadInsuranceCompany());
            //js.makeComboBox("#ddtxtSourceOfSale", dal.LoadSourceOfSale());
            //js.makeComboBox("#ddOrigin", dal.LoadOrigin());
        }

        private DataTable RemoveEmptyRows(DataTable source)
        {
            for (int i = source.Rows.Count - 1; i >= 0; i--)
            {
                if (source.Rows[i]["StatementCode"].ToString() == string.Empty)
                    source.Rows[i].Delete();
                source.AcceptChanges();
            }

            return source;
        }

        ///// Standard RecordOperation 



        public void RecordOperation(eRecordOperation i, int Position)
        {
            string tempstr = "";

            switch (i)
            {
                case eRecordOperation.AddNew:
                    nwToolBox.bindingNavigatorSaveItem.Enable = true;
                    nwToolBox.bindingNavigatorAddNewItem.Enable =
                    nwToolBox.bindingNavigatorPrintItem.Enable =
                    nwToolBox.bindingNavigatorInquireItem.Enable =
                    nwToolBox.bindingNavigatorImportItem.Visible =
                    nwToolBox.bindingNavigatorDeleteItem.Enable =
                    nwToolBox.bindingNavigatorDeleteItem.Visible =
                    nwToolBox.bindingNavigatorExportItem.Enable = false;
                    GenerateGrid(false);

                    string LocCode = string.Empty;
                    string LocDesc = string.Empty;

                    //DataTable dtLoc = dal.getLocFormDefault(based.SecurityAccess.RecUser, trantype);
                    //if (dtLoc.Rows.Count > 0)
                    //{
                    //    LocCode = dtLoc.Rows[0]["Code"].ToString();
                    //    LocDesc = dtLoc.Rows[0]["Description"].ToString();
                    //    js.makeValueText("#idvallugLocWithAccntblForms", LocCode);
                    //    js.makeValueText("#descvallugLocWithAccntblForms", LocDesc);
                    //}

                    js.ADD("$('#btnMiscellaneousDetails,#btnLoadCoBuyerDetails').enable(true)");
                    js.ADD("$('#btnMiscellaneousDetails,#btnLoadCoBuyerDetails').css({ 'background': 'rgb(255,153,0)', 'color': 'white' });");


                    //if (dtLoc.Rows.Count > 0)
                    //{
                    //    LocCode = dtLoc.Rows[0]["Code"].ToString();
                    //    LocDesc = dtLoc.Rows[0]["Description"].ToString();
                    //}

                    //bool IsLock = false;
                    //if (CheckingLoc == String.Empty || CheckingLoc == "0")
                    //    IsLock = false;
                    //else /** return 1 **/
                    //    IsLock = true;

                    //string sql = string.Format("EnableDisableLoc({0},'{1}','{2}');", IsLock.ToString().ToLower(), LocCode, LocDesc);
                    //js.ADD(sql);

                    LoadCombo();

                    js.ADD("$('#txtTotalUnitPrice').prop('disabled', true);");
                    js.ADD("$('#txtUnitCapacity').prop('disabled', true);");
                    js.ADD("$('#txtBranchID_Discount').prop('disabled', true);");
                    js.ADD("$('#chkAtNeedSale').prop('disabled',false);");
                    js.ADD("$('#txtReservationAmt').prop('disabled',true);");
                    js.ADD("$('#radioNel').prop('checked',true);");
                    js.ADD("$('#radioYes').prop('checked',true);");
                    js.ADD("EnableDisabledInsuranceTab(false);");


                    //DataTable dt = dal.GetLabel(WebApp.nwobjectText("UnitCode"));
                    //string JSONresult;
                    //JSONresult = JsonConvert.SerializeObject(dt);
                    //js.ADD(string.Format("GetResult({0});", JSONresult));
                    //js.ADD("PopulateDataUnitDetails();");
                    //string x = WebApp.nwobjectText("ddtxtUnitType");
                    //NoahWebLib.NoahWebFunction.nwGeneralFunctions z = z.ToString

                    //js.ADD("alert($('#ddtxtUnitType').val());");
                    DateTime dtnow = SFObject.GetServerDateTime(this.UserDefinedConnectionString);
                    js.makeValueText("#txtReservationDate", dtnow.ToString("MM/dd/yyyy HH:mm:ss"));
                    js.makeValueText("#txtDPStartDate", dtnow.ToString("MM/dd/yyyy"));
                    js.makeValueText("#txtBalStartDate", dtnow.ToString("MM/dd/yyyy"));

                    DataTable dtPortal = new DataTable();
                    dtPortal = dal.getUnitCodePortal(WebApp.nwobjectText("nwUnitCode"));
                    if (dtPortal.Rows.Count > 0)
                    {
                        js.ADD($"$portal().populateFields({DataTableToJSON(dtPortal)})");

                        //double expirationPeriod = 0.00;
                        //expirationPeriod = dal.GetExpirationPeriod(trantype, dtPortal.Rows[0]["projectCode"].ToString());
                        //string expirationDate = dal.GetExpirationDate(dtnow.ToString("MM/dd/yyyy HH:mm:ss"), expirationPeriod).ToString("MM/dd/yyyy HH:mm:ss");
                        //js.ADD($"PopulateExpirationDate('{expirationDate }');");
                        js.ADD("setExpiration()");
                        js.ADD($"SetBalanceDateReservation();");
                    }


                    DataTable dtSourceOfSale = dal.getDefaultSourceOfSale(based.SecurityAccess.RecUser);
                    if (dtSourceOfSale.Rows.Count > 0)
                    {
                        js.makeValueText("#idvallugSourceOfSale", dtSourceOfSale.Rows[0]["Code"].ToString());
                        js.makeValueText("#descvallugSourceOfSale", dtSourceOfSale.Rows[0]["Description"].ToString());
                        js.makeValueText("#idvallugAgent", dtSourceOfSale.Rows[0]["sellerCode"].ToString());
                        js.makeValueText("#descvallugAgent", dtSourceOfSale.Rows[0]["sellerName"].ToString());
                        js.makeValueText("#txtAgentType", dtSourceOfSale.Rows[0]["SellerType"].ToString());

                        if (dtSourceOfSale.Rows[0]["Code"].ToString().Length > 0)
                            js.ADD("$portal().isSeller(true)");
                        else
                            js.ADD("$portal().isSeller(false)");
                    }

                    bool isExist = dal.checkIfExists(WebApp.nwobjectText("nwUnitCode"));
                    if (isExist)
                        js.ADD("$('#noah-webui-default-Refresh').click();");

                    js.ADD("paymentDetailsClear()");

                    break;

                case eRecordOperation.Save:
                    RecordOperationResult = String.Empty;





                    DataSet tempDTPaymentterm = WebApp.DataSet("nwGridPaymentTermDetails");
                    DataTable dtPaymentTermDtls = new DataTable();
                    try
                    {
                        dtPaymentTermDtls = tempDTPaymentterm.Tables[0];
                    }
                    catch { }


                    DataSet tempDTDiscount = WebApp.DataSet("nwGridDiscount");
                    DataTable dtDiscount = new DataTable();
                    try
                    {
                        dtDiscount = tempDTDiscount.Tables[0];
                    }
                    catch { }



                    DataSet tempDTAddOns = WebApp.DataSet("nwGridAddOn");
                    DataTable dtAddOns = new DataTable();
                    try
                    {
                        dtAddOns = tempDTAddOns.Tables[0];
                    }
                    catch { }



                    DataSet tempDTCoBuyer = WebApp.DataSet("nwGridCoBuyer");
                    DataTable dtCoBuyer = new DataTable();
                    try
                    {
                        dtCoBuyer = tempDTCoBuyer.Tables[0];
                    }
                    catch { }


                    RecordOperationResult = AreValidEntries(true);




                    if (RecordOperationResult == "")
                    {
                        RecordOperationResult = dal.SaveData(
                        LoadSchema(),
                        LoadHoldforReservationEntryLIN(),
                        LoadHoldforReservationPaymentTermDetails(dtPaymentTermDtls),
                        LoadHoldforReservationAddOns(dtAddOns),
                        LoadHoldforReservationDiscount(dtDiscount),
                        LoadHoldforReservationEntry_Amortization(),
                        LoadHoldforRefBaseAddons(dtRefBase),
                        LoadHoldforReservationCoBuyer(dtCoBuyer),
                        dtMiscDtls,
                        isupdateRefBaseLIN,
                        trantype,
                        WebApp.nwobjectText("idvallugLocWithAccntblForms"),
                        isNewRow,
                        JSONToDataTable(WebApp.nwobjectText("paymentDetails")),
                        JSONToDataTable(WebApp.nwobjectText("attachmentDetails"))
                        );
                    }
                    else
                    {
                        Prompt.Information(RecordOperationResult, based.Title);
                        return;
                    }
                    break;

                case eRecordOperation.Delete:
                    RecordOperationResult = dal.DeleteData(WebApp.nwobjectText("ReservationControlNo"));

                    break;

                case eRecordOperation.Process:
                    RecordOperationResult = AreValidEntries(false);
                    if (RecordOperationResult == "")
                    {
                        int status = 1;
                        if (dal.CheckUserApprovalMatrix(WebApp.nwobjectText("idvallugLocWithAccntblForms"), trantype) == "1")
                            status = 3;
                        else
                            status = 2;
                        RecordOperationResult = dal.ProcessData(WebApp.nwobjectText("ReservationControlNo"), status, based.SecurityAccess.RecUser);
                    }
                    else
                    {
                        Prompt.Information(RecordOperationResult, based.Title);
                        return;
                    }
                    //tempstr = "Process";
                    //Prompt.Information(tempstr, based.Title);}
                    //tempstr = "Process";
                    //Prompt.Information(tempstr, based.Title);
                    break;

                case eRecordOperation.Refresh:
                    RefreshData();
                    js.ADD("nwLoading_End('xRefreshBtn');");
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
                                                           based.SecurityAccess.RecUserName, LISTINGFILENAME);

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
                if (RecordOperationResult.IndexOf("Error") != 0)
                {
                    //js.ADD("loc_LookupInquireWithValue('" + dal.Docno + "') ");
                    RefreshData();
                    RecordOperationResult = Prompt.PromptToolBoxMessage(RecordOperationResult, i);
                    Prompt.Information(RecordOperationResult, based.Title);
                }
                else
                {
                    Prompt.Error(RecordOperationResult, based.Title);
                }
            }
        }

        ////////////////////// For Customize 
        public string get_Initialize()
        {
            string strFinal = "";
            js.ADD($"$ServerLink='{dal.Serverlink()}'");
            SetBindings();
            Main_Load();

            execute(ref strFinal);

            return js.makeJSPostScript(strFinal);
        }
        public string act_Method(string strMethod, string strParameter, string strValue)
        {
            //string strFinal = "", strSQL = "";
            WebApp = new WebApplib(strParameter, strValue);
            string JSONresult = string.Empty;
            string itemgrouptype = string.Empty;
            string itemgroup = string.Empty;
            DataTable dt = new DataTable();
            string totalNoofPayment = "";
            string balStartDate = "";
            string ReservationCode = WebApp.nwobjectText("ReservationControlNo");
            Boolean isLoaded = true;
            if (ReservationCode != "")
            {
                isLoaded = true;
            }
            else
            {
                isLoaded = false;
            }
            switch (strMethod)
            {
                case "actBindCollection":
                    BindCollection();


                    js.ADD("$('#settingstabsBut-2').click()");
                    js.ADD("$('#settingstabsBut-3').click()");
                    js.ADD("$('#settingstabsBut-4').click()");
                    js.ADD("$('#settingstabsBut-5').click()");
                    js.ADD("$('#settingstabsBut-1').click()");
                    string rsv = WebApp.nwobjectText("ReservationControlNo");


                    //CreateGridPaymentTermDetails(rsv, truea
                    //CreateGridDiscount(rsv, true);
                    //CreateGridRefBasedUnitAddOn(rsv, true);
                    //CreateGridAddons(rsv, true);
                    //CreateGridCoBuyer(rsv, true, false);
                    js.ADD("EnableFieldsDone();");
                    js.ADD("loadComputation_newspread();");
                    setRqmtCompProp();


                    break;
                case "actBindCollectionEmpty":
                    js.ADD("nwLoading_End('xSample')");
                    break;
                case "actPopulate":
                    dt = dal.LoadUnitType(WebApp.nwobjectText("ddtxtUnitType"));
                    js.ADD(string.Format("PopulateDataUnitDetails({0});", DataTableToJSON(dt)));
                    break;
                case "actPopulateDropdown":
                    js.ADD($"PopulateJSON('{DataTableToJSON(dal.getAllCombo(WebApp.nwobjectText("txtItemGroupType")))}')");
                    js.ADD("nwLoading_End('actPopulateDropdown')");
                    break;
                case "actGetReq":
                    string salesource = WebApp.nwobjectText("SourceOfSale");
                    dt = dal.LoadSourceSale(salesource);
                    if (dt.Rows.Count <= 0)
                    {
                    }
                    else
                    {
                        string salecnt = dt.Rows[0][0].ToString();
                        if (salecnt == "1")
                        {
                            js.ADD("$('.req').removeClass('isinvisible')");
                            js.ADD("$('#lugAgent').removeClass('adisabled');");
                            js.ADD("$('#idvallugAgent').prop('disabled', false);");

                        }
                        else
                        {
                            js.ADD("$('.req').addClass('isinvisible')");
                            js.ADD("$('#lugAgent').addClass('adisabled');");
                            js.ADD("$('#idvallugAgent').prop('disabled', true);");
                            js.ADD("$('#idvallugAgent').val('');");
                            js.ADD("$('#descvallugAgent').val('');");
                            js.ADD("$('#txtAgentType').val('');");
                        }
                    }

                    break;
                case "actAgentType":
                    //js.ADD("nwParameter_Add('agent', $('#idvallugAgent').val())");
                    string a = WebApp.nwobjectText("agent");
                    dt = dal.getAgent2(WebApp.nwobjectText("agent"));
                    if (dt.Rows.Count <= 0)
                    {
                    }
                    else
                    {
                        string type = dt.Rows[0][4].ToString();
                        //js.makeValueText("txtAgentType", type);
                        js.ADD($"$('#txtAgentType').val('{type}')");
                    }
                    js.ADD(string.Format("PopulateDataUnitDetails({0});", DataTableToJSON(dt)));
                    break;
                case "actPopulateUnitClass":
                    dt = dal.LoadUnitClass(WebApp.nwobjectText("ddtxtUnitType"));
                    js.ADD(string.Format("PopulateDataUnitClass({0});", DataTableToJSON(dt)));
                    break;
                case "actGetTotalUnitCapacity":
                    string filterID = WebApp.nwobjectText("IDUnitCapacity");
                    string totalUnitCapacity = dal.getTotalUnitCapacity(filterID);
                    js.ADD($"$('#txtUnitCapacity').val('{totalUnitCapacity}')");
                    break;

                case "actPopulateBalanceDateReservation":
                    //string dpStartDate = WebApp.nwobjectText("DPStartDate");
                    var reservDate = Convert.ToDateTime(WebApp.nwobjectText("txtReservationDate"));
                    //string dpStartDate = dal.GetDPStartDate(reservDate);
                    //string dpStartDate = dal.GetDPStartDate(reservDate);
                    totalNoofPayment = WebApp.nwobjectText("TotalNoOfPayments");
                    balStartDate = dal.GetBalanceDate(reservDate.ToString("MM/dd/yyyy"), totalNoofPayment);
                    js.ADD($"$('#txtDPStartDate').val('{reservDate.ToString("MM/dd/yyyy")}')");
                    js.ADD($"$('#txtBalStartDate').val('{balStartDate}')");
                    break;
                case "actReservationPopulateDate":// upon click reserv payment category......
                    string reservDate3 = string.Empty;
                    reservDate3 = WebApp.nwobjectText("txtReservationDate");
                    string dpStartDate = dal.GetDPStartDate(reservDate3);
                    totalNoofPayment = WebApp.nwobjectText("TotalNoOfPayments");
                    balStartDate = dal.GetBalanceDate(dpStartDate, totalNoofPayment);
                    js.ADD($"$('#txtDPStartDate').val('{dpStartDate}')");
                    js.ADD($"$('#txtBalStartDate').val('{balStartDate}')");

                    break;
                case "actPopulateDownpayment":
                    //string dpStartDate = WebApp.nwobjectText("DPStartDate");
                    string reservDate2 = WebApp.nwobjectText("txtReservationDate");
                    string dpStartDatex = dal.GetDPStartDate(reservDate2);
                    string totalNoofPayment2 = WebApp.nwobjectText("TotalNoOfPayments");
                    string balStartDatex = dal.GetBalanceDate(dpStartDatex, totalNoofPayment2);

                    if (totalNoofPayment2 == "0")
                        balStartDatex = string.Empty;
                    //js.ADD($"$('#txtDPStartDate').val('{dpStartDate2}')");
                    js.ADD($"$('#txtBalStartDate').val('{balStartDatex}')");
                    break;
                case "actbtnSaveAttachmentPaymentDetails":
                    RecordOperationResult = ValidateSaveAttachmentPaymentDetails();
                    if (RecordOperationResult == string.Empty)
                        js.ADD($"saveAttachmentDetails()");
                    else
                        Prompt.Information(RecordOperationResult, based.Title);

                    js.ADD("nwLoading_End('actbtnSaveAttachmentPaymentDetails')");
                    break;
                case "actbtnSavePaymentDetails":
                    RecordOperationResult = ValidateSavePaymentDetails();
                    if (RecordOperationResult == string.Empty)
                        js.ADD($"savePaymentDetails()");
                    else
                        Prompt.Information(RecordOperationResult, based.Title);

                    js.ADD("nwLoading_End('actbtnSavePaymentDetails')");
                    break;

                case "actGetVatLimit":
                    //itemgroup = WebApp.nwobjectText("ItemGroup");
                    itemgrouptype = WebApp.nwobjectText("ItemGroupType");
                    DataTable dtVatLimit = dal.GetVatLimit(itemgrouptype);
                    double vatlimit = 0.00;
                    double vatrate = 0.00;

                    if (dtVatLimit.Rows.Count > 0)
                    {
                        vatlimit = Parser.ParseDouble(dtVatLimit.Rows[0]["VatLimit"]);
                        vatrate = Parser.ParseDouble(dtVatLimit.Rows[0]["Vatrate"]);
                    }
                    js.ADD($"PopulateVatLimit({vatlimit},{vatrate});");
                    break;

                //case "actPopulateDiscountRate":
                //    string branch = WebApp.nwobjectText("Branch");
                //    itemgrouptype = WebApp.nwobjectText("PaymentCategory");
                //    DataTable discountCeiling = dal.GetDiscountCeilingRate(branch, itemgrouptype);

                //    double dpDiscAmt = WebApp.nwobjectDouble("dpDiscAmt");
                //    js.ADD($"ComputeDPRate({dpDiscAmt},'{DataTableToJSON(discountCeiling)}');");
                //    break;

                //Discount Tab
                case "actPopulateDiscountType":
                    dt = dal.LoadDiscountType();
                    js.ADD(string.Format("PopulateDiscountType();"));
                    break;
                case "actPopulateBranchDropDown":
                    js.ADD("$('#ddtxtPhase').html('');");
                    js.ADD("$('#ddtxtUnitType').html('');");
                    js.ADD("$('#ddtxtUnitClass').html('');");
                    js.ADD("$('#ddlNoOfUnits').html('');");

                    js.makeComboBox("#ddtxtPhase", dal.LoadComboPhase(WebApp.nwobjectText("idvallugBranchProject")));
                    js.makeComboBox("#ddBranchID", dal.LoadBranchID(WebApp.nwobjectText("idvallugBranchProject")));
                    break;
                case "actExpirationDate":
                    double expirationPeriod = 0.00;
                    expirationPeriod = dal.GetExpirationPeriod(trantype, WebApp.nwobjectText("idvallugBranchProject"), WebApp.nwobjectText("idvallugLocWithAccntblForms"), WebApp.nwobjectText("custClassCode"));
                    string expirationDate = dal.GetExpirationDate(WebApp.nwobjectText("ReservationDate"), expirationPeriod).ToString("MM/dd/yyyy hh:mm:ss");
                    js.ADD($"PopulateExpirationDate('{expirationDate }');");
                    break;

                case "actAfterPaymentCategory":
                    //DataTable dtGetPaymentTerm= dal.getAfterPaymentCategory(
                    //    WebApp.nwobjectText("idvallugFinancingType"), WebApp.nwobjectText("UnitCode"),
                    //    WebApp.nwobjectText("idvallugBranchProject"),
                    //    WebApp.nwobjectText("ddPhaseTower"),
                    //    WebApp.nwobjectText("PaymentCategory"),
                    //    WebApp.nwobjectDouble("txtGrossSellingPrice")
                    //    );
                    //js.ADD($"AfterPaymentCategory('{DataTableToJSON(dtGetPaymentTerm)}');");

                    js.ADD("nwLoading_End('actAfterPaymentCategory')");
                    break;
                case "actbtnPaymentDetails":
                    CreateGridPaymentDetails(true, JSONToDataTable(WebApp.nwobjectText("paymentDetails")).Rows.Count > 0 ? JSONToDataTable(WebApp.nwobjectText("paymentDetails")) : InitializeColumnPaymentDetails());
                    js.ADD("nwLoading_End('actbtnPaymentDetails')");
                    break;
                case "actbtnAttachmentPaymentDetails":
                    CreateGridPaymentDetailsAttachment(true, JSONToDataTable(WebApp.nwobjectText("attachmentDetails")).Rows.Count > 0 ? JSONToDataTable(WebApp.nwobjectText("attachmentDetails")) : InitalizeColumnAttachmentPaymentDetails());
                    js.ADD("bindAttachmentDetails()");

                    if (JSONToDataTable(WebApp.nwobjectText("attachmentDetails")).Rows.Count <= 0)
                        js.ADD("getID(0)");

                    js.ADD("nwLoading_End('actbtnAttachmentPaymentDetails')");
                    break;
                //Amortization Details
                case "actAmortization":
                    RecordOperationResult = string.Empty;

                    DataSet ds = WebApp.DataSet("nwGridPaymentTermDetails");
                    DataTable dtn = new DataTable();
                    try
                    {
                        dtn = ds.Tables[0];
                    }
                    catch { }


                    if (WebApp.nwobjectInt("tag") != 1)
                    {
                        RecordOperationResult = ValidateData(dtn);
                    }

                    if (RecordOperationResult == string.Empty)
                    {
                        js.ADD($"$('#AmortCompany').text('{SFObjects.returnText(dal.GETCOMPANY, UserDefinedConnectionString)}')");
                        js.ADD($"$('#CompanyAddress').text('{SFObjects.returnText(dal.GETCOMPANYADDRESS, UserDefinedConnectionString)}')");
                        js.ADD($"$('#CompanyContactNo').text('{SFObjects.returnText(dal.GETCONTACTNO, UserDefinedConnectionString)}')");
                        js.ADD($"$('#RecUser').text('{dal.getUserName(based.SecurityAccess.RecUser)}')");


                        if (dal.CheckUserApprovalMatrix(WebApp.nwobjectText("idvallugLocWithAccntblForms"), trantype) == "1")
                            js.ADD($"$('#CheckedBy').text('{dal.getUserName(based.SecurityAccess.RecUser)}')");
                        else
                            js.ADD($"$('#CheckedBy').text('{dal.getChecker(WebApp.nwobjectText("txtReservationControlNo"))}')");

                        //DataTable dtClient = LoadClientInformation();
                        //DataTable dtLoadTermDetails = LoadTermDetails();

                        //RecordOperationResult = dal.SaveData2(
                        //       dtClient,
                        //       dtLoadTermDetails
                        //       );
                        //dt = dal.LoadDataAmort(based.SecurityAccess.RecUser);


                        #region Amortization Parameter
                        string reservStartDate = "05/17/2022", reservEndDate = "05/18/2022";
                        double reservation = 0.00;
                        double reservMonthlyMisc = 0.00;
                        string reservMiscDate = "";
                        double reservMonthly = 0.00;
                        int reservMiscType = 0;
                        int reservAllocationType = 0;
                        double reservPMT = 0.00;

                        string dpStartDate1 = "", dpEndDate1 = "", dpMiscDate1 = "";
                        double dpMonthly1 = 0.00, dpInterest1 = 0.00, dpMonthlyMisc1 = 0.00;
                        int dpTermInMonths1 = 0, dpMiscType1 = 0, dpAllocationType1 = 0;
                        double dpPMT1 = 0.00; double dpAmortized1 = 0;

                        string dpStartDate2 = "", dpEndDate2 = "", dpMiscDate2 = "";
                        double dpMonthly2 = 0.00, dpInterest2 = 0.00, dpMonthlyMisc2 = 0.00;
                        int dpTermInMonths2 = 0, dpMiscType2 = 0, dpAllocationType2 = 0;
                        double dpPMT2 = 0.00; double dpAmortized2 = 0;

                        string dpStartDate3 = "", dpEndDate3 = "", dpMiscDate3 = "";
                        double dpMonthly3 = 0.00, dpInterest3 = 0.00, dpMonthlyMisc3 = 0.00;
                        int dpTermInMonths3 = 0, dpMiscType3 = 0, dpAllocationType3 = 0;
                        double dpPMT3 = 0.00; double dpAmortized3 = 0;

                        string dpStartDate4 = "", dpEndDate4 = "", dpMiscDate4 = "";
                        double dpMonthly4 = 0.00, dpInterest4 = 0.00, dpMonthlyMisc4 = 0.00;
                        int dpTermInMonths4 = 0, dpMiscType4 = 0, dpAllocationType4 = 0;
                        double dpPMT4 = 0.00; double dpAmortized4 = 0;

                        string dpStartDate5 = "", dpEndDate5 = "", dpMiscDate5 = "";
                        double dpMonthly5 = 0.00, dpInterest5 = 0.00, dpMonthlyMisc5 = 0.00;
                        int dpTermInMonths5 = 0, dpMiscType5 = 0, dpAllocationType5 = 0;
                        double dpPMT5 = 0.00; double dpAmortized5 = 0;

                        string dpStartDate6 = "", dpEndDate6 = "", dpMiscDate6 = "";
                        double dpMonthly6 = 0.00, dpInterest6 = 0.00, dpMonthlyMisc6 = 0.00;
                        int dpTermInMonths6 = 0, dpMiscType6 = 0, dpAllocationType6 = 0;
                        double dpPMT6 = 0.00; double dpAmortized6 = 0;

                        string dpStartDate7 = "", dpEndDate7 = "", dpMiscDate7 = "";
                        double dpMonthly7 = 0.00, dpInterest7 = 0.00, dpMonthlyMisc7 = 0.00;
                        int dpTermInMonths7 = 0, dpMiscType7 = 0, dpAllocationType7 = 0;
                        double dpPMT7 = 0.00; double dpAmortized7 = 0;

                        string dpStartDate8 = "", dpEndDate8 = "", dpMiscDate8 = "";
                        double dpMonthly8 = 0.00, dpInterest8 = 0.00, dpMonthlyMisc8 = 0.00;
                        int dpTermInMonths8 = 0, dpMiscType8 = 0, dpAllocationType8 = 0;
                        double dpPMT8 = 0.00; double dpAmortized8 = 0;

                        string dpStartDate9 = "", dpEndDate9 = "", dpMiscDate9 = "";
                        double dpMonthly9 = 0.00, dpInterest9 = 0.00, dpMonthlyMisc9 = 0.00;
                        int dpTermInMonths9 = 0, dpMiscType9 = 0, dpAllocationType9 = 0;
                        double dpPMT9 = 0.00; double dpAmortized9 = 0;

                        string dpStartDate10 = "", dpEndDate10 = "", dpMiscDate10 = "";
                        double dpMonthly10 = 0.00, dpInterest10 = 0.00, dpMonthlyMisc10 = 0.00;
                        int dpTermInMonths10 = 0, dpMiscType10 = 0, dpAllocationType10 = 0;
                        double dpPMT10 = 0.00; double dpAmortized10 = 0;

                        string dpStartDate11 = "", dpEndDate11 = "", dpMiscDate11 = "";
                        double dpMonthly11 = 0.00, dpInterest11 = 0.00, dpMonthlyMisc11 = 0.00;
                        int dpTermInMonths11 = 0, dpMiscType11 = 0, dpAllocationType11 = 0;
                        double dpPMT11 = 0.00; double dpAmortized11 = 0;

                        string dpStartDate12 = "", dpEndDate12 = "", dpMiscDate12 = "";
                        double dpMonthly12 = 0.00, dpInterest12 = 0.00, dpMonthlyMisc12 = 0.00;
                        int dpTermInMonths12 = 0, dpMiscType12 = 0, dpAllocationType12 = 0;
                        double dpPMT12 = 0.00; double dpAmortized12 = 0;

                        string dpStartDate13 = "", dpEndDate13 = "", dpMiscDate13 = "";
                        double dpMonthly13 = 0.00, dpInterest13 = 0.00, dpMonthlyMisc13 = 0.00;
                        int dpTermInMonths13 = 0, dpMiscType13 = 0, dpAllocationType13 = 0;
                        double dpPMT13 = 0.00; double dpAmortized13 = 0;

                        string dpStartDate14 = "", dpEndDate14 = "", dpMiscDate14 = "";
                        double dpMonthly14 = 0.00, dpInterest14 = 0.00, dpMonthlyMisc14 = 0.00;
                        int dpTermInMonths14 = 0, dpMiscType14 = 0, dpAllocationType14 = 0;
                        double dpPMT14 = 0.00; double dpAmortized14 = 0;

                        string dpStartDate15 = "", dpEndDate15 = "", dpMiscDate15 = "";
                        double dpMonthly15 = 0.00, dpInterest15 = 0.00, dpMonthlyMisc15 = 0.00;
                        int dpTermInMonths15 = 0, dpMiscType15 = 0, dpAllocationType15 = 0;
                        double dpPMT15 = 0.00; double dpAmortized15 = 0;

                        string dpStartDate16 = "", dpEndDate16 = "", dpMiscDate16 = "";
                        double dpMonthly16 = 0.00, dpInterest16 = 0.00, dpMonthlyMisc16 = 0.00;
                        int dpTermInMonths16 = 0, dpMiscType16 = 0, dpAllocationType16 = 0;
                        double dpPMT16 = 0.00; double dpAmortized16 = 0;

                        string dpStartDate17 = "", dpEndDate17 = "", dpMiscDate17 = "";
                        double dpMonthly17 = 0.00, dpInterest17 = 0.00, dpMonthlyMisc17 = 0.00;
                        int dpTermInMonths17 = 0, dpMiscType17 = 0, dpAllocationType17 = 0;
                        double dpPMT17 = 0.00; double dpAmortized17 = 0;

                        string dpStartDate18 = "", dpEndDate18 = "", dpMiscDate18 = "";
                        double dpMonthly18 = 0.00, dpInterest18 = 0.00, dpMonthlyMisc18 = 0.00;
                        int dpTermInMonths18 = 0, dpMiscType18 = 0, dpAllocationType18 = 0;
                        double dpPMT18 = 0.00; double dpAmortized18 = 0;

                        string dpStartDate19 = "", dpEndDate19 = "", dpMiscDate19 = "";
                        double dpMonthly19 = 0.00, dpInterest19 = 0.00, dpMonthlyMisc19 = 0.00;
                        int dpTermInMonths19 = 0, dpMiscType19 = 0, dpAllocationType19 = 0;
                        double dpPMT19 = 0.00; double dpAmortized19 = 0;

                        string dpStartDate20 = "", dpEndDate20 = "", dpMiscDate20 = "";
                        double dpMonthly20 = 0.00, dpInterest20 = 0.00, dpMonthlyMisc20 = 0.00;
                        int dpTermInMonths20 = 0, dpMiscType20 = 0, dpAllocationType20 = 0;
                        double dpPMT20 = 0.00; double dpAmortized20 = 0;



                        string balStartDate1 = "", balEndDate1 = "", balMiscDate1 = "";
                        double balMonthly1 = 0.00, balInterest1 = 0.00, balMonthlyMisc1 = 0.00;
                        int balTermInMonths1 = 0, balMiscType1 = 0, balAllocationType1 = 0;
                        double balPMT1 = 0.00; double balAmortized1 = 0;

                        string balStartDate2 = "", balEndDate2 = "", balMiscDate2 = "";
                        double balMonthly2 = 0.00, balInterest2 = 0.00, balMonthlyMisc2 = 0.00;
                        int balTermInMonths2 = 0, balMiscType2 = 0, balAllocationType2 = 0;
                        double balPMT2 = 0.00; double balAmortized2 = 0;

                        string balStartDate3 = "", balEndDate3 = "", balMiscDate3 = "";
                        double balMonthly3 = 0.00, balInterest3 = 0.00, balMonthlyMisc3 = 0.00;
                        int balTermInMonths3 = 0, balMiscType3 = 0, balAllocationType3 = 0;
                        double balPMT3 = 0.00; double balAmortized3 = 0;

                        string balStartDate4 = "", balEndDate4 = "", balMiscDate4 = "";
                        double balMonthly4 = 0.00, balInterest4 = 0.00, balMonthlyMisc4 = 0.00;
                        int balTermInMonths4 = 0, balMiscType4 = 0, balAllocationType4 = 0;
                        double balPMT4 = 0.00; double balAmortized4 = 0;

                        string spotStartDate = "", spotEndDate = "", spotMiscDate = "";
                        double spotMonthly = 0.00, spotInterest = 0.00, spotMonthlyMisc = 0.00;
                        int spotTermInMonths = 0, spotMiscType = 0, spotAllocationType = 0;
                        double spotPMT = 0.00;

                        string spotStartDate2 = "", spotEndDate2 = "", spotMiscDate2 = "";
                        double spotMonthly2 = 0.00, spotInterest2 = 0.00, spotMonthlyMisc2 = 0.00;
                        int spotTermInMonths2 = 0, spotMiscType2 = 0, spotAllocationType2 = 0;
                        double spotPMT2 = 0.00;

                        string spotStartDate3 = "", spotEndDate3 = "", spotMiscDate3 = "";
                        double spotMonthly3 = 0.00, spotInterest3 = 0.00, spotMonthlyMisc3 = 0.00;
                        int spotTermInMonths3 = 0, spotMiscType3 = 0, spotAllocationType3 = 0;
                        double spotPMT3 = 0.00;

                        string spotStartDate4 = "", spotEndDate4 = "", spotMiscDate4 = "";
                        double spotMonthly4 = 0.00, spotInterest4 = 0.00, spotMonthlyMisc4 = 0.00;
                        int spotTermInMonths4 = 0, spotMiscType4 = 0, spotAllocationType4 = 0;
                        double spotPMT4 = 0.00;


                        int FixedInterest = WebApp.nwobjectBool("chkFixedInterest") ? 1 : 0;
                        string financingTypeCode = WebApp.nwobjectText("ftcode");

                        double ntcp = WebApp.nwobjectDouble("ntcp");


                        double netLotUnitPrice = 0;
                        double discountamount = 0;
                        double misc = 0;
                        string ddbasis = WebApp.nwobjectText("ddbasis");
                        discountamount = WebApp.nwobjectDouble("discountamount");
                        string ddapp = WebApp.nwobjectText("ddapp");
                        if (discountamount <= 0)
                        {
                            netLotUnitPrice = WebApp.nwobjectDouble("grossSellingPrice") - WebApp.nwobjectDouble("salesdisc");
                            misc = WebApp.nwobjectDouble("misc");
                        }
                        else
                        {
                            if (ddbasis == "SP" && ddapp == "SP")
                            {
                                netLotUnitPrice = WebApp.nwobjectDouble("grossSellingPrice") - WebApp.nwobjectDouble("salesdisc");
                                misc = WebApp.nwobjectDouble("misc");
                            }
                            else if (ddbasis == "SP" && ddapp == "TCP")
                            {
                                netLotUnitPrice = WebApp.nwobjectDouble("grossSellingPrice") - WebApp.nwobjectDouble("sp");
                                misc = WebApp.nwobjectDouble("misc") - WebApp.nwobjectDouble("dcmisc");
                            }
                            else
                            {
                                netLotUnitPrice = WebApp.nwobjectDouble("grossSellingPrice") - WebApp.nwobjectDouble("sp");
                                misc = WebApp.nwobjectDouble("misc") - WebApp.nwobjectDouble("dcmisc");
                            }
                        }

                        double vat = WebApp.nwobjectDouble("txtVatrate");

                        int disctag = 0;
                        // double discountamount = 0;

                        disctag = WebApp.nwobjectInt("disctag");
                        discountamount = WebApp.nwobjectDouble("discountamount");
                        #endregion
                        DataTable dtParam = dtn;
                        //  DataTable dtParam = WebApp.nwGridData(WebApp.nwobjectText("nwGridPaymentTermDetailsCon"));
                        int dp = 1, bal = 1;
                        int dptag = 0, spot = 1;
                        foreach (DataRow dr in dtParam.Rows)
                        {

                            string x = dr[SPR_PaymentTermDetails_PaymentCategory].ToString();
                            string y = dr["B"].ToString();
                            if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() != string.Empty)
                            {
                                if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "RESRV")
                                {


                                    reservStartDate = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    reservEndDate = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    reservation = Parser.ParseDouble(dr[SPR_PaymentTermDetails_TermAmount - 1]);
                                    reservMonthlyMisc = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    reservMonthly = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    reservMiscDate = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        reservMiscType = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        reservAllocationType = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    reservPMT = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                }
                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 1)
                                {
                                    dpStartDate1 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate1 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate1 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly1 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest1 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc1 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc1 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc1 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * ((Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) + reservMonthlyMisc) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc1 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc1 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)) - WebApp.nwobjectDouble("reservMisc"); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc1 = 0;
                                            }
                                        }
                                    }


                                    dpTermInMonths1 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType1 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType1 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT1 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized1 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc1;
                                    dp++;
                                    dptag++;
                                }
                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 2)
                                {
                                    dpStartDate2 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate2 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate2 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);
                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc2 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc2 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc2 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc2 = 0;
                                            }
                                        }

                                    }

                                    dpTermInMonths2 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType2 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType2 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc2;
                                    dp++;
                                }
                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 3)
                                {
                                    dpStartDate3 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate3 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate3 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc3 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc3 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc3 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc3 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths3 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType].ToString() != string.Empty)
                                        dpMiscType3 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType3 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc3;
                                    dp++;
                                }
                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 4)
                                {
                                    dpStartDate4 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate4 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate4 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc4 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc4 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc4 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc4 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths4 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType4 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType4 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc4;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 5)
                                {
                                    dpStartDate5 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate5 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate5 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly5 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest5 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc5 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc5 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc5 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc5 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc5 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc5 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths5 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType5 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType5 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT5 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized5 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc5;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 6)
                                {
                                    dpStartDate6 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate6 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate6 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly6 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest6 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc6 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc6 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc6 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc6 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc6 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc6 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths6 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType6 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType6 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT6 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized6 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc6;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 7)
                                {
                                    dpStartDate7 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate7 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate7 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly7 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest7 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc7 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc7 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc7 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc7 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc7 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc7 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths7 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType7 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType7 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT7 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized7 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc7;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 8)
                                {
                                    dpStartDate8 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate8 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate8 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly8 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest8 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc8 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc8 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc8 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc8 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc8 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc8 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths8 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType8 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType8 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT8 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized8 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc8;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 9)
                                {
                                    dpStartDate9 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate9 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate9 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly9 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest9 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc9 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc9 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc9 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc9 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc9 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc9 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths9 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType9 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType9 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT9 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized9 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc9;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 10)
                                {
                                    dpStartDate10 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate10 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate10 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly10 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest10 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc10 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc10 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc10 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc10 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc10 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc10 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths10 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType10 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType10 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT10 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized10 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc10;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 11)
                                {
                                    dpStartDate11 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate11 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate11 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly11 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest11 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc11 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc11 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc11 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc11 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc11 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc11 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths11 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType11 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType11 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT11 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized11 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc11;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 12)
                                {
                                    dpStartDate12 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate12 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate12 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly12 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest12 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc12 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc12 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc12 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc12 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc12 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc12 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths12 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType12 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType12 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT12 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized12 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc12;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 13)
                                {
                                    dpStartDate13 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate13 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate13 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly13 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest13 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc13 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc13 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc13 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc13 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc13 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc13 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths13 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType13 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType13 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT13 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized13 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc13;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 14)
                                {
                                    dpStartDate14 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate14 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate14 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly14 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest14 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc14 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc14 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc14 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc14 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc14 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc14 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths14 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType14 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType14 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT14 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized14 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc14;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 15)
                                {
                                    dpStartDate15 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate15 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate15 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly15 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest15 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc15 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc15 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc15 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc15 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc15 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc15 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths15 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType15 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType15 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT15 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized15 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc15;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 16)
                                {
                                    dpStartDate16 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate16 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate16 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly16 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest16 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc16 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc16 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc16 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc16 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc16 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc16 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths16 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType16 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType16 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT16 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized16 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc16;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 17)
                                {
                                    dpStartDate17 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate17 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate17 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly17 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest17 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc17 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc17 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc17 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc17 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc17 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc17 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths17 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType17 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType17 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT17 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized17 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc17;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 18)
                                {
                                    dpStartDate18 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate18 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate18 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly18 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest18 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc18 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc18 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc18 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc18 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc18 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc18 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths18 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType18 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType18 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT18 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized18 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc18;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 19)
                                {
                                    dpStartDate19 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate19 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate19 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly19 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest19 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc19 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc19 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc19 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc19 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc19 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc19 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths19 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType19 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType19 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT19 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized19 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc19;
                                    dp++;
                                }


                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "DOWNP" && dp == 20)
                                {
                                    dpStartDate20 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    dpEndDate20 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    dpMiscDate20 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    dpMonthly20 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    dpInterest20 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        dpMonthlyMisc20 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            dpMonthlyMisc20 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                dpMonthlyMisc20 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    dpMonthlyMisc20 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    dpMonthlyMisc20 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    dpMonthlyMisc20 = 0;
                                            }
                                        }
                                    }

                                    dpTermInMonths20 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        dpMiscType20 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        dpAllocationType20 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    dpPMT20 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    dpAmortized20 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - dpMonthlyMisc20;
                                    dp++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "BALANC" && bal == 1)
                                {
                                    balStartDate1 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    balEndDate1 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    balMiscDate1 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    balMonthly1 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    balInterest1 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);

                                    if (discountamount <= 0)
                                    {
                                        balMonthlyMisc1 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            balMonthlyMisc1 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                balMonthlyMisc1 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * ((Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) + (dptag == 1 ? 0 : reservMonthlyMisc)) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    balMonthlyMisc1 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    balMonthlyMisc1 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    balMonthlyMisc1 = 0;
                                            }
                                        }
                                    }

                                    balTermInMonths1 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        balMiscType1 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    else
                                    {
                                        if (dpMiscType1 == 2)
                                        {
                                            balMiscType1 = dpMiscType1;
                                        }
                                    }
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        balAllocationType1 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    balPMT1 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    balAmortized1 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - balMonthlyMisc1;
                                    bal++;
                                }
                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "BALANC" && bal == 2)
                                {
                                    balStartDate2 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    balEndDate2 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    balMiscDate2 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    balMonthly2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    balInterest2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);
                                    //balMonthlyMisc2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);

                                    if (discountamount <= 0)
                                    {
                                        balMonthlyMisc2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            balMonthlyMisc2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                balMonthlyMisc1 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * ((Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) + (dptag == 1 ? 0 : reservMonthlyMisc)) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    balMonthlyMisc2 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    balMonthlyMisc2 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    balMonthlyMisc2 = 0;
                                            }
                                        }
                                    }

                                    balTermInMonths2 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        balMiscType2 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    else
                                    {
                                        if (dpMiscType1 == 2)
                                        {
                                            balMiscType2 = dpMiscType1;
                                        }
                                    }
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        balAllocationType2 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    balPMT2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    balAmortized2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - balMonthlyMisc2;
                                    bal++;
                                }
                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "BALANC" && bal == 3)
                                {
                                    balStartDate3 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    balEndDate3 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    balMiscDate3 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    balMonthly3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    balInterest3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);
                                    //balMonthlyMisc3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    if (discountamount <= 0)
                                    {
                                        balMonthlyMisc3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            balMonthlyMisc3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                balMonthlyMisc1 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * ((Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) + (dptag == 1 ? 0 : reservMonthlyMisc)) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    balMonthlyMisc3 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    balMonthlyMisc3 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    balMonthlyMisc3 = 0;
                                            }
                                        }
                                    }

                                    balTermInMonths3 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        balMiscType3 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    else
                                    {
                                        if (dpMiscType1 == 2)
                                        {
                                            balMiscType3 = dpMiscType1;
                                        }
                                    }
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        balAllocationType3 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    balPMT3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    balAmortized3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - balMonthlyMisc3;
                                    bal++;
                                }
                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "BALANC" && bal == 4)
                                {
                                    balStartDate4 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    balEndDate4 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    balMiscDate4 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    balMonthly4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    balInterest4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);
                                    //balMonthlyMisc4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);

                                    if (discountamount <= 0)
                                    {
                                        balMonthlyMisc4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    }
                                    else
                                    {
                                        if (ddbasis == "SP" && ddapp == "SP")
                                            balMonthlyMisc4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                        else
                                        {
                                            if (ddapp == "TCP")
                                            {
                                                balMonthlyMisc1 = WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : WebApp.nwobjectDouble("txtMisc") == 0 ? 0 : Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) - (WebApp.nwobjectDouble("dcmisc") * ((Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]) + (dptag == 1 ? 0 : reservMonthlyMisc)) / WebApp.nwobjectDouble("txtMisc")));
                                            }
                                            else
                                            {
                                                if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED")
                                                    balMonthlyMisc4 = (WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc"));
                                                else if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "AMORT")
                                                    balMonthlyMisc4 = ((WebApp.nwobjectDouble("txtMisc") - WebApp.nwobjectDouble("dcmisc")) * (Parser.ParseDouble(dr[SPR_PaymentTermDetails_ContractRate - 1]) / 100)); //Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                                else
                                                    balMonthlyMisc4 = 0;
                                            }
                                        }
                                    }

                                    balTermInMonths4 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        balMiscType4 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    else
                                    {
                                        if (dpMiscType1 == 2)
                                        {
                                            balMiscType4 = dpMiscType1;
                                        }
                                    }
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        balAllocationType4 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    balPMT4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    balAmortized4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_NetContractPrice - 1]) - balMonthlyMisc4;
                                    bal++;
                                }
                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "SPOT" && spot == 1)
                                {
                                    spotStartDate = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    spotEndDate = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    spotMiscDate = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    spotMonthly = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    spotInterest = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);
                                    spotMonthlyMisc = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    spotTermInMonths = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        spotMiscType = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        spotAllocationType = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    spotPMT = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    spot++;
                                }
                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "SPOT" && spot == 2)
                                {
                                    spotStartDate2 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    spotEndDate2 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    spotMiscDate2 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    spotMonthly2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    spotInterest2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);
                                    spotMonthlyMisc2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    spotTermInMonths2 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        spotMiscType2 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        spotAllocationType2 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    spotPMT2 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    spot++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "SPOT" && spot == 3)
                                {
                                    spotStartDate3 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    spotEndDate3 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    spotMiscDate3 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    spotMonthly3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    spotInterest3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);
                                    spotMonthlyMisc3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    spotTermInMonths3 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        spotMiscType3 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        spotAllocationType3 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    spotPMT3 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    spot++;
                                }

                                else if (dr[SPR_PaymentTermDetails_PaymentCategoryDesc - 1].ToString() == "SPOT" && spot == 4)
                                {
                                    spotStartDate4 = dr[SPR_PaymentTermDetails_StartDate - 1].ToString();
                                    spotEndDate4 = dr[SPR_PaymentTermDetails_EndDate - 1].ToString();
                                    spotMiscDate4 = ValidateDate(dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString()) ? dr[SPR_PaymentTermDetails_MiscellaneousDate - 1].ToString() : string.Empty;
                                    spotMonthly4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1]);
                                    spotInterest4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_InterestRate - 1]);
                                    spotMonthlyMisc4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MiscInstallment - 1]);
                                    spotTermInMonths4 = Parser.ParseInt(dr[SPR_PaymentTermDetails_NoOfPayments - 1]);
                                    if (dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() != string.Empty)
                                        spotMiscType4 = dr[SPR_PaymentTermDetails_MiscellaneousType - 1].ToString() == "FIXED" ? 1 : 2;
                                    if (dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() != string.Empty)
                                        spotAllocationType4 = dr[SPR_PaymentTermDetails_AllocationType - 1].ToString() == "002" ? 1 : 0;
                                    spotPMT4 = Parser.ParseDouble(dr[SPR_PaymentTermDetails_MonthlyPayment - 1]);
                                    spot++;
                                }
                            }
                        }


                        DataTable dtAmort = dal.GetAmortization(
                        reservStartDate, reservEndDate, reservation, reservMonthlyMisc, reservMiscDate, reservMiscType, reservAllocationType, reservPMT, reservMonthly,

                        dpStartDate1, dpEndDate1, dpMonthly1, dpTermInMonths1, dpInterest1, dpMonthlyMisc1, dpMiscDate1, dpMiscType1, dpAllocationType1, dpPMT1, dpAmortized1,
                        dpStartDate2, dpEndDate2, dpMonthly2, dpTermInMonths2, dpInterest2, dpMonthlyMisc2, dpMiscDate2, dpMiscType2, dpAllocationType2, dpPMT2, dpAmortized2,
                        dpStartDate3, dpEndDate3, dpMonthly3, dpTermInMonths3, dpInterest3, dpMonthlyMisc3, dpMiscDate3, dpMiscType3, dpAllocationType3, dpPMT3, dpAmortized3,
                        dpStartDate4, dpEndDate4, dpMonthly4, dpTermInMonths4, dpInterest4, dpMonthlyMisc4, dpMiscDate4, dpMiscType4, dpAllocationType4, dpPMT4, dpAmortized4,
                        dpStartDate5, dpEndDate5, dpMonthly5, dpTermInMonths5, dpInterest5, dpMonthlyMisc5, dpMiscDate5, dpMiscType5, dpAllocationType5, dpPMT5, dpAmortized5,
                        dpStartDate6, dpEndDate6, dpMonthly6, dpTermInMonths6, dpInterest6, dpMonthlyMisc6, dpMiscDate6, dpMiscType6, dpAllocationType6, dpPMT6, dpAmortized6,
                        dpStartDate7, dpEndDate7, dpMonthly7, dpTermInMonths7, dpInterest7, dpMonthlyMisc7, dpMiscDate7, dpMiscType7, dpAllocationType7, dpPMT7, dpAmortized7,
                        dpStartDate8, dpEndDate8, dpMonthly8, dpTermInMonths8, dpInterest8, dpMonthlyMisc8, dpMiscDate8, dpMiscType8, dpAllocationType8, dpPMT8, dpAmortized8,
                        dpStartDate9, dpEndDate9, dpMonthly9, dpTermInMonths9, dpInterest9, dpMonthlyMisc9, dpMiscDate9, dpMiscType9, dpAllocationType9, dpPMT9, dpAmortized9,
                        dpStartDate10, dpEndDate10, dpMonthly10, dpTermInMonths10, dpInterest10, dpMonthlyMisc10, dpMiscDate10, dpMiscType10, dpAllocationType10, dpPMT10, dpAmortized10,
                        dpStartDate11, dpEndDate11, dpMonthly11, dpTermInMonths11, dpInterest11, dpMonthlyMisc11, dpMiscDate11, dpMiscType11, dpAllocationType11, dpPMT11, dpAmortized11,
                        dpStartDate12, dpEndDate12, dpMonthly12, dpTermInMonths12, dpInterest12, dpMonthlyMisc12, dpMiscDate12, dpMiscType12, dpAllocationType12, dpPMT12, dpAmortized12,
                        dpStartDate13, dpEndDate13, dpMonthly13, dpTermInMonths13, dpInterest13, dpMonthlyMisc13, dpMiscDate13, dpMiscType13, dpAllocationType13, dpPMT13, dpAmortized13,
                        dpStartDate14, dpEndDate14, dpMonthly14, dpTermInMonths14, dpInterest14, dpMonthlyMisc14, dpMiscDate14, dpMiscType14, dpAllocationType14, dpPMT14, dpAmortized14,
                        dpStartDate15, dpEndDate15, dpMonthly15, dpTermInMonths15, dpInterest15, dpMonthlyMisc15, dpMiscDate15, dpMiscType15, dpAllocationType15, dpPMT15, dpAmortized15,
                        dpStartDate16, dpEndDate16, dpMonthly16, dpTermInMonths16, dpInterest16, dpMonthlyMisc16, dpMiscDate16, dpMiscType16, dpAllocationType16, dpPMT16, dpAmortized16,
                        dpStartDate17, dpEndDate17, dpMonthly17, dpTermInMonths17, dpInterest17, dpMonthlyMisc17, dpMiscDate17, dpMiscType17, dpAllocationType17, dpPMT17, dpAmortized17,
                        dpStartDate18, dpEndDate18, dpMonthly18, dpTermInMonths18, dpInterest18, dpMonthlyMisc18, dpMiscDate18, dpMiscType18, dpAllocationType18, dpPMT18, dpAmortized18,
                        dpStartDate19, dpEndDate19, dpMonthly19, dpTermInMonths19, dpInterest19, dpMonthlyMisc19, dpMiscDate19, dpMiscType19, dpAllocationType19, dpPMT19, dpAmortized19,
                        dpStartDate20, dpEndDate20, dpMonthly20, dpTermInMonths20, dpInterest20, dpMonthlyMisc20, dpMiscDate20, dpMiscType20, dpAllocationType20, dpPMT20, dpAmortized20,

                        balStartDate1, balEndDate1, balMonthly1, balTermInMonths1, balInterest1, balMonthlyMisc1, balMiscDate1, balMiscType1, balAllocationType1, balPMT1, balAmortized1,
                        balStartDate2, balEndDate2, balMonthly2, balTermInMonths2, balInterest2, balMonthlyMisc2, balMiscDate2, balMiscType2, balAllocationType2, balPMT2, balAmortized2,
                        balStartDate3, balEndDate3, balMonthly3, balTermInMonths3, balInterest3, balMonthlyMisc3, balMiscDate3, balMiscType3, balAllocationType3, balPMT3, balAmortized3,
                        balStartDate4, balEndDate4, balMonthly4, balTermInMonths4, balInterest4, balMonthlyMisc4, balMiscDate4, balMiscType4, balAllocationType4, balPMT4, balAmortized4,
                        spotStartDate, spotEndDate, spotMonthly, spotTermInMonths, spotInterest, spotMonthlyMisc, spotMiscDate, spotMiscType, spotAllocationType, spotPMT,
                        spotStartDate2, spotEndDate2, spotMonthly2, spotTermInMonths2, spotInterest2, spotMonthlyMisc2, spotMiscDate2, spotMiscType2, spotAllocationType2, spotPMT2,
                        spotStartDate3, spotEndDate3, spotMonthly3, spotTermInMonths3, spotInterest3, spotMonthlyMisc3, spotMiscDate3, spotMiscType3, spotAllocationType3, spotPMT3,
                        spotStartDate4, spotEndDate4, spotMonthly4, spotTermInMonths4, spotInterest4, spotMonthlyMisc4, spotMiscDate4, spotMiscType4, spotAllocationType4, spotPMT4,
                        vat, FixedInterest, financingTypeCode, misc, netLotUnitPrice, ntcp, based.SecurityAccess.RecUser,
                        WebApp.nwobjectDouble("txtSellingPrice")
                        //,disctag,discountamount
                        );

             
             

                      

                        CreateTermDetails(dtn, true);
                        CreateGridAmortization(true, dtAmort);
                        SetImage(WebApp.nwobjectText("idvallugLocWithAccntblForms"));
                        js.ADD("nwGridMainCon_Book_PaymentTerm_Amortization.ActiveSheet.Refresh();");

                        DataTable tempDt = dal.GetUnitDetailsTab(WebApp.nwobjectText("ReservationControlNo"));


                        js.makeValueText("#lblUnitCode", tempDt.Rows[0]["UnitDesc"].ToString());
                        js.makeValueText("#lblUnitType", tempDt.Rows[0]["UnitType"].ToString());
                        js.makeValueText("#lblUnitClass", tempDt.Rows[0]["Inventory Class Desc"].ToString());

                        string tempval = "";

                        if (tempDt.Rows[0]["LotArea"].ToString() == "")
                        {
                            tempval = tempDt.Rows[0]["FloorArea"].ToString();
                            js.makeValueText("#lblLotArea", tempval);
                        }
                        else if (tempDt.Rows[0]["LotArea"].ToString() == "")
                        {
                            tempval = tempDt.Rows[0]["FloorArea"].ToString();
                            js.makeValueText("#lblLotArea", tempval);
                        }

                         if (tempDt.Rows[0]["LotArea"].ToString() != "" && tempDt.Rows[0]["FloorArea"].ToString() != "") {
                            tempval= (tempDt.Rows[0]["LotArea"].ToString() + "/" + tempDt.Rows[0]["FloorArea"].ToString());
                            js.makeValueText("#lblLotArea", tempval);
                         }

               




                        //js.ADD(string.Format("Amortization({0});", DataTableToJSON(dt)));
                    }
                    else
                    {
                        Prompt.Information(RecordOperationResult, based.Title);
                    }
                    js.ADD("nwLoading_End('actAmortization')");

                    break;
                case "actExportAmort":

                    //                    List<PrintHandler> printList = new List<PrintHandler>();
                    //                    Page page = new Page();
                    //                    string serverPath = page.Server.MapPath("~") + string.Format(@"forms_standards\Files\", based.SecurityAccess.RecUser);



                    //                    PrintHandler printConsolidated = new PrintHandler(WebApp.nwobjectText("ReservationControlNo"),
                    //                                                                         this.UserDefinedConnectionString,
                    //                                                                         dal.getRecUserById(WebApp.nwobjectText("ReservationControlNo")),
                    //                                                                         dal,
                    //                                                                         PRINTTYPE,
                    //                                                                         JSONToDataTable(WebApp.nwobjectText("jsonHDR")),
                    //                                                                         JSONToDataTable(WebApp.nwobjectText("jsonTermDetails")),
                    //                                                                         JSONToDataTable(WebApp.nwobjectText("jsonAmort")),
                    //                                                                         WebApp.nwobjectText("idvallugLocWithAccntblForms")
                    //                                                                         );

                    //                    //printConsolidated.rangeName = generateRangeName(dtDocno);
                    //                    printConsolidated.devPath = serverPath;
                    //                    printConsolidated.LoadReport();
                    //                    printConsolidated.ExportReport();

                    //                    if (printConsolidated.hasError)
                    //                    {
                    //                        RecordOperationResult = printConsolidated._result;
                    //                        break;
                    //                    }

                    //                    string url = printConsolidated._url;
                    //                    //  string docnoJson = SerializePrintString(printList);

                    //                    //DEVELOPMENT ONLY: COMMENT THIS WHEN DEPLOYING (USE FOR dbo.SystemConfig fileserver url for production)
                    //#if DEBUG
                    //                    url = WebApp.nwobjectText("urlPath") + string.Format("/forms_standards/Files/{0}/{1}", printConsolidated._printType, printConsolidated._fileName);
                    //#endif

                    //                    //  js.ADD(string.Format("TransNoList='{0}'", docnoList));
                    //                    js.ADD(string.Format("ShowPrintPreview('{0}')", url));
                    break;

                case "actGetStandardPrice":
                    int AtneedSale = WebApp.nwobjectBool("AtNeedSale") ? 1 : 0;

                    dt = dal.GetStandardUnitPrice(WebApp.nwobjectText("idvallugBranchProject"),
                    WebApp.nwobjectText("ddtxtUnitType"), WebApp.nwobjectText("ddtxtUnitClass"), WebApp.nwobjectText("ddlNoOfUnits"), WebApp.nwobjectText("txtReservationDate"),
                    WebApp.nwobjectText("ddtxtPhase"),
                    WebApp.nwobjectText("idvallugFinancingType"),
                    AtneedSale
                    );

                    itemgrouptype = WebApp.nwobjectText("ItemGroupType");
                    dtVatLimit = dal.GetVatLimit(itemgrouptype);
                    vatlimit = 0.00;
                    double VatRate = 0.00;

                    if (dtVatLimit.Rows.Count > 0)
                    {
                        vatlimit = Parser.ParseDouble(dtVatLimit.Rows[0]["VatLimit"]);
                        VatRate = Parser.ParseDouble(dtVatLimit.Rows[0]["Vatrate"]);
                    }

                    if (dt.Rows.Count > 0)
                    {
                        double totalLotUnitPrice = 0.00;
                        int IsVatable = Parser.ParseInt(dt.Rows[0]["Vatable"].ToString());
                        //double VatRate = WebApp.nwobjectDouble("Vatrate");
                        double Vat = 0.00;
                        double standardPriceLotPrice = 0.00;

                        js.makeValueText("#txtReservationAmt", dt.Rows[0]["MinReservationAmt"].ToString());

                        if (AtneedSale == 0)
                        {
                            totalLotUnitPrice = Parser.ParseDouble(dt.Rows[0]["StandardUnitPrice"].ToString());
                            js.makeValueText("#txtTotalUnitPrice", dt.Rows[0]["StandardUnitPrice"].ToString());
                            js.makeValueText("#txtTotalLotUP", dt.Rows[0]["StandardUnitPrice"].ToString());
                            js.makeValueText("#txtMCF", dt.Rows[0]["MCF"].ToString());
                            js.makeValueText("#txtMisc", dt.Rows[0]["MCF"].ToString());
                        }
                        else
                        {
                            totalLotUnitPrice = Parser.ParseDouble(dt.Rows[0]["Net_LotUnitPrice"].ToString());
                            js.makeValueText("#txtTotalUnitPrice", dt.Rows[0]["StandardUnitPrice"].ToString());
                            js.makeValueText("#txtMisc", dt.Rows[0]["Misc"].ToString());
                            js.makeValueText("#txtTCP", dt.Rows[0]["TCP"].ToString());
                            js.makeValueText("#txtMCF", dt.Rows[0]["MCF"].ToString());
                            js.makeValueText("#txtNetLotUnitPrice", dt.Rows[0]["Net_LotUnitPrice"].ToString());
                            js.makeValueText("#txtTotalLotUP", dt.Rows[0]["Net_LotUnitPrice"].ToString());
                            js.makeValueText("#txtNTCP", dt.Rows[0]["TCP"].ToString());
                        }

                        //12.18.2017
                        //if (WebApp.nwobjectText("idvallugFinancingType").ToString().ToUpper() == "SPOT")
                        //{
                        //    js.makeValueText("#txtSpotCashDiscount", dt.Rows[0]["SpotCashDisc"].ToString());
                        //    js.makeValueText("#txtSalesDiscountRate", dt.Rows[0]["SpotCashDisc"].ToString() +" %");
                        //    js.makeValueText("#txtCashAmount", dt.Rows[0]["SpotCashTCP"].ToString());
                        //}
                        //if (WebApp.nwobjectText("idvallugFinancingType").ToString().ToUpper() != "SPOT" && WebApp.nwobjectText("idvallugFinancingType").ToString().ToUpper() != "DEF"
                        //    && WebApp.nwobjectText("idvallugFinancingType").ToString()!=""
                        //   )
                        //{
                        //    js.makeValueText("#txtInterestRate", dt.Rows[0]["InterestRate"].ToString());
                        //}
                        //else
                        //{
                        //    js.makeValueText("#txtInterestRate", "0.00");
                        //}

                        if (IsVatable == 1)
                            if (VatRate == 0)
                                Vat = 0.00;
                            else
                                Vat = Math.Round((totalLotUnitPrice / (1 + (VatRate / 100))) * (VatRate / 100), 2);
                        else
                            Vat = 0.00;

                        standardPriceLotPrice = totalLotUnitPrice - Vat;

                        js.makeValueText("#txtVAT", Vat.ToString("#,##0.00"));
                        js.makeValueText("#txtStandardLotUnitPrice", standardPriceLotPrice.ToString("#,##0.00"));
                        js.ADD($"vatrate_global='{VatRate}';");

                        js.ADD("SumAllHeaderinPaymentTermDetails();");
                        js.ADD("ComputationHeader();");
                    }

                    //Auto Populate Miscellaneous TAB
                    //js.ADD($@"AutoPopulateMiscTab(
                    // {Parser.ParseDouble(dt.Rows[0]["MCF"].ToString())},
                    //'{dt.Rows[0]["MiscCode"].ToString()}',
                    //'{dt.Rows[0]["MiscDesc"].ToString()}',
                    //'{dt.Rows[0]["MiscTypeCode"].ToString()}',
                    //'{dt.Rows[0]["MiscTypeDesc"].ToString()}')
                    //");
                    break;
                case "actGridApprover":
                    CreateGridApprover();
                    string Check2 = dal.GetCheckingApprover(WebApp.nwobjectText("idvallugLocWithAccntblForms"), trantype);
                    if (Check2 == "3")
                        js.ADD($"$('#nwGridApprover tr td:nth-child({(SPR_CODE + 1)})').enable(false);");
                    else
                        js.ADD($"$('#nwGridApprover tr td:nth-child({(SPR_CODE + 1)})').enable(true);");
                    js.ADD("fn_Outside()");
                    //js.ADD("nwLoading_End('actGridApprover')");
                    break;
                case "actbtnLoadCoBuyerDetails":
                    CreateGridCoBuyer("", true, true);
                    js.ADD("$('#btnMiscellaneousDetails,#btnLoadCoBuyerDetails').enable(true)");
                    js.ADD("$('#btnMiscellaneousDetails,#btnLoadCoBuyerDetails').css({ 'background': 'rgb(255,153,0)', 'color': 'white' });");
                    js.ADD("nwLoading_End('actbtnLoadCoBuyerDetails')");
                    break;
                case "actPopulateDefaultMaturityDate":
                    string defaultMaturity = dal.GetDefaultMaturitydate(WebApp.nwobjectText("txtReservationDate"), WebApp.nwobjectInt("TotalNoOfPayments"));
                    js.makeValueText("#txtMaturityDate", defaultMaturity);
                    break;
                case "actCheckApprover":
                    string Check = dal.GetCheckingApprover(WebApp.nwobjectText("idvallugLocWithAccntblForms"), trantype);

                    js.ADD(string.Format("EnableDisableButton({0});", Check));
                    break;
                case "actStatementDetails":
                    string Code = WebApp.nwobjectText("ReservationControlNo");
                    isNewRow = WebApp.nwobjectBool("isNewRow");
                    string StatementDetails = WebApp.nwobjectText("dtStatementDetails");
                    CreateStatementDetails(Code, false, JSONToDataTable(StatementDetails));
                    js.ADD("nwLoading_End('xSample')");
                    break;
                case "actSavingStatementDetails":
                    RecordOperationResult = string.Empty;
                    RecordOperationResult = ValidationForStatementDetails();
                    if (RecordOperationResult == string.Empty)
                    {
                        js.ADD($"dtStatementDetails='{DataTableToJSON(LoadHoldforReservationStatement2())}';");
                        RecordOperationResult = "Saved successfully.";
                    }

                    if (RecordOperationResult.IndexOf("Error") != 0)
                        Prompt.Information(RecordOperationResult, based.Title);
                    else
                        Prompt.Error(RecordOperationResult, based.Title);
                    js.ADD("nwLoading_End('xSample')");
                    break;
                case "actPopulateDefaultMCF":
                    DataTable dtMCF = dal.GetDefaultMCF(WebApp.nwobjectText("idvallugBranchProject"), trantype);
                    if (dtMCF.Rows.Count > 0)
                        js.ADD($"PopulateDefaultMCF('{DataTableToJSON(dtMCF)}')");

                    js.ADD("nwLoading_End('xSample');");
                    break;
                //case "actPhase":
                //    js.makeComboBox("#ddtxtPhase", dal.LoadComboPhase(WebApp.nwobjectText("idvallugBranchProject")));
                //    break;

                case "actUnitType":
                    js.makeComboBox("#ddtxtUnitType", dal.LoadComboInventoryType(WebApp.nwobjectText("ddtxtPhase"), WebApp.nwobjectText("idvallugBranchProject")));
                    break;
                case "actUnitClass":
                    js.makeComboBox("#ddtxtUnitClass", dal.LoadComboUnitClass(WebApp.nwobjectText("idvallugBranchProject"), WebApp.nwobjectText("ddtxtPhase"), WebApp.nwobjectText("ddtxtUnitType")));
                    break;
                case "actNoOfUnits":
                    js.makeComboBox("#ddlNoOfUnits", dal.LoadNoOfUnits(WebApp.nwobjectText("idvallugBranchProject"), WebApp.nwobjectText("ddtxtPhase"), WebApp.nwobjectText("ddtxtUnitType"), WebApp.nwobjectText("ddtxtUnitClass")));
                    break;
                case "actSpotCashDiscount":
                    js.makeComboBox("#ddSpotCashDiscount", dal.LoadSpotCashDiscount(WebApp.nwobjectText("idvallugBranchProject"), WebApp.nwobjectText("ddtxtPhase"), WebApp.nwobjectText("ddtxtUnitType"), WebApp.nwobjectText("ddtxtUnitClass"), WebApp.nwobjectText("ddlNoOfUnits"), WebApp.nwobjectText("txtReservationDate")));
                    js.makeValueText("#txtCashAmount", dal.LoadSpotCashAmount(WebApp.nwobjectText("idvallugBranchProject"), WebApp.nwobjectText("ddtxtPhase"), WebApp.nwobjectText("ddtxtUnitType"), WebApp.nwobjectText("ddtxtUnitClass"), WebApp.nwobjectText("ddlNoOfUnits"), WebApp.nwobjectText("txtReservationDate"), WebApp.nwobjectDouble("ddSpotCashDiscount")));
                    break;

                case "actPopulateSpotCashDiscount":
                    js.makeValueText("#txtCashAmount", dal.LoadSpotCashAmount(WebApp.nwobjectText("idvallugBranchProject"), WebApp.nwobjectText("ddtxtPhase"), WebApp.nwobjectText("ddtxtUnitType"), WebApp.nwobjectText("ddtxtUnitClass"), WebApp.nwobjectText("ddlNoOfUnits"), WebApp.nwobjectText("txtReservationDate"), WebApp.nwobjectDouble("ddSpotCashDiscount")));
                    break;

                case "actGlobal":
                    js.makeComboBox("#ddtxtPhase", dal.LoadComboPhase(WebApp.nwobjectText("idvallugBranchProject")));
                    js.makeComboBox("#ddtxtUnitType", dal.LoadComboInventoryType(WebApp.nwobjectText("ddtxtPhase"), WebApp.nwobjectText("idvallugBranchProject")));
                    js.makeComboBox("#ddtxtUnitClass", dal.LoadComboUnitClass(WebApp.nwobjectText("idvallugBranchProject"), WebApp.nwobjectText("ddtxtPhase"), WebApp.nwobjectText("ddtxtUnitType")));
                    js.makeComboBox("#ddlNoOfUnits", dal.LoadNoOfUnits(WebApp.nwobjectText("idvallugBranchProject"), WebApp.nwobjectText("ddtxtPhase"), WebApp.nwobjectText("ddtxtUnitType"), WebApp.nwobjectText("ddtxtUnitClass")));
                    js.makeComboBox("#ddlNoOfUnits", dal.LoadNoOfUnits(WebApp.nwobjectText("idvallugBranchProject"), WebApp.nwobjectText("ddtxtPhase"), WebApp.nwobjectText("ddtxtUnitType"), WebApp.nwobjectText("ddtxtUnitClass")));
                    js.makeComboBox("#ddSpotCashDiscount", dal.LoadSpotCashDiscount(WebApp.nwobjectText("idvallugBranchProject"), WebApp.nwobjectText("ddtxtPhase"), WebApp.nwobjectText("ddtxtUnitType"), WebApp.nwobjectText("ddtxtUnitClass"), WebApp.nwobjectText("ddlNoOfUnits"), WebApp.nwobjectText("txtReservationDate")));
                    break;
                case "actPaymentTermGrouping":
                    js.ADD("InitalizeJSON()");
                    js.ADD($@"LoadDefaultPaymentTermGrouping('{DataTableToJSON(dal.PopulatePaymentTermGrouping(
                        WebApp.nwobjectDouble("stdLotUP"),
                        WebApp.nwobjectDouble("vatAmount"),
                        WebApp.nwobjectDouble("gross"),
                        WebApp.nwobjectDouble("misc"),
                        WebApp.nwobjectDouble("tcp"),
                        WebApp.nwobjectText("Code"),
                        WebApp.nwobjectDouble("reservPrin"),
                        WebApp.nwobjectDouble("reservMisc"),
                        WebApp.nwobjectText("reservDate")))}');");
                    js.ADD(" ToggleLumpSum(0);");
                    js.ADD("nwLoading_End('actPaymentTermGrouping')");
                    break;
                case "actPopulateCategory":
                    js.makeComboBox(".clsCategory", dal.LoadCategory(WebApp.nwobjectText("idvallugFinancingType"), WebApp.nwobjectText("UnitCode")));
                    js.makeValueText("#txtDPStartDate", dal.getAmortStartDateDP(WebApp.nwobjectText("txtReservationDate")));

                    if (WebApp.nwobjectText("tag") == "1")
                    {
                        DataTable dtGetPaymentTerm = dal.PopulateDefaultTerm(
                          WebApp.nwobjectText("idvallugFinancingType"), WebApp.nwobjectText("UnitCode"),
                          WebApp.nwobjectDouble("txtGrossSellingPrice"),
                          WebApp.nwobjectText("ReservationDate")
                          );
                        js.ADD("InitalizeJSON()");
                        js.ADD($"LoadDefaultTerm('{DataTableToJSON(dtGetPaymentTerm)}');");

                        if (WebApp.nwobjectText("idvallugFinancingType") == "SPOT")
                        {
                            DataTable dtSpotCombo = dal.SpotDropDown(
                            WebApp.nwobjectText("idvallugFinancingType"), WebApp.nwobjectText("UnitCode"),
                            WebApp.nwobjectText("idvallugBranchProject"),
                            WebApp.nwobjectText("ddPhaseTower"),
                            WebApp.nwobjectDouble("txtGrossSellingPrice"),
                            WebApp.nwobjectText("ReservationDate"),
                            WebApp.nwobjectText("UnitType"),
                            WebApp.nwobjectText("UnitClass"));

                            js.ADD($"LoadSpotCombo('{DataTableToJSON(dtSpotCombo)}');");
                        }

                    }
                    js.ADD("$fn().copyOldSP();");
                    js.ADD("nwLoading_End('actPopulateCategory');");

                    break;


                case "actMiscellaneous":



                    ds = WebApp.DataSet("nwGridPaymentTermDetails");
                    DataTable dtPaymentTermDtls = new DataTable();
                    try
                    {
                        dtPaymentTermDtls = ds.Tables[0];
                    }
                    catch { }


                    RecordOperationResult = AreValidEntries(true);


                    RecordOperationResult = string.Empty;
                    RecordOperationResult = ValidateMiscellaneous(dtPaymentTermDtls);
                    if (RecordOperationResult == string.Empty)
                    {
                     
                        RecordOperationResult = dal.SavePaymentCategory(JSONToDataTable(WebApp.nwobjectText("paymentCategory")), based.SecurityAccess.RecUser);
                        bool x = false;
                        if (JSONToDataTable(WebApp.nwobjectText("jsonMisc")).Columns.Count > 0) { x = true; } else x = false;
                        GenerateMisc(x);
                    }
                    else
                    {   
                        Prompt.Error(RecordOperationResult, based.Title);
                    }
                    js.ADD("fn_Outside()");
                    js.ADD("nwLoading_End('actMiscellaneous');");
                    break;
                case "actSetImage":
                    SetImageUploaded(convertAttachment(WebApp.nwobjectText("LogoPath")));
                    break;
                case "actSaveApproverDetails":
                    RecordOperationResult = ValidateProcessDetails();
                    if (RecordOperationResult.Length <= 0)
                        RecordOperationResult = dal.SaveApproverData(LoadSchemaApprover());
                    else
                    {
                        Prompt.Information(RecordOperationResult, based.Title);
                        break;
                    }


                    if (RecordOperationResult.IndexOf("Error") == 0 || RecordOperationResult.Contains("Cannot"))
                    {
                        Prompt.Error(RecordOperationResult, based.Title);
                    }
                    else
                    {
                        Prompt.Information(RecordOperationResult, based.Title);
                        js.ADD("$('#nwPopWindow .BoxClose').click();");
                    }
                    break;
                case "actToggleFixInt":
                    break;
                case "actIsVatThresholdExceed":
                    if (!dal.isVatTreshHoldExceeds(WebApp.nwobjectText("itemgrouptype"), WebApp.nwobjectDouble("amount")))
                        js.ADD("$fn().reComputeNonVat();");
                    break;

                case "actShowGridPaymentTerm":

                    CreateGridPaymentTermDetails(ReservationCode, isLoaded);
                    js.ADD("loadComputation_newspread();");
                    js.ADD("nwLoading_End('actShowGridPaymentTerm');");

                    break;

                case "actShowGridDiscount":
                    CreateGridDiscount(ReservationCode, isLoaded);
                    js.ADD("nwLoading_End('actShowGridDiscount');");
                    break;


                case "actRefBasedAddOn":
                    string unitCode = WebApp.nwobjectText("new_txtUniCode");
                    CreateGridRefBasedUnitAddOn(ReservationCode, unitCode);
                    js.ADD("nwLoading_End('RefAddOn');");
                    break;

                case "actShowGridAddOns":
                    CreateGridAddons(ReservationCode, isLoaded);
                    js.ADD("nwLoading_End('actShowGridAddOns');");
                    break;
                case "actShowGridCoBuyer":
                    CreateGridCoBuyer(ReservationCode, isLoaded, false);
                    js.ADD("nwLoading_End('actShowGridCoBuyer');");
                    break;

                case "actRefBasedAddOnSave":
                    isupdateRefBaseLIN = true;
                    DataSet tempDTRefBase = WebApp.DataSet("nwGridRefBased");

                    try
                    {
                        dtRefBase = tempDTRefBase.Tables[0];
                    }
                    catch { }

                    js.ADD("nwPopupForm_HideModal('nwAddRefBasedAddOn');");


                    break;

                case "actCashAmount":

                    string aaa = WebApp.nwobjectText("idvallugBranchProject");
                    string tempNullCheck = WebApp.nwobjectText("ddSpotCashDiscount");
                    DataTable cashamount = dal.getDiscAmount(aaa);
                    DataRow dtlug = cashamount.Rows[0];
                    string val = dtlug["amount"].ToString();

                    //string[] values = val.Split('-');
                    //for (int i = 0; i < values.Length; i++)
                    //{
                    //    values[i] = values[i].Trim();
                    //}

                    js.makeValueText("#txtCashAmount", val);



                    if (tempNullCheck == "")
                    {

                        js.makeValueText("#txtCashAmount", "0");
                    }
                    break;
                case "actSaveMiscDtls":

                    isupdateRefBaseLIN = true;
                    DataSet tempDtMiscdtl = WebApp.DataSet("nwGridMiscellaneousFee");

                    try
                    {
                        dtMiscDtls = tempDtMiscdtl.Tables[0];
                    }
                    catch { }

                    js.ADD("nwPopupForm_HideModal('nwMisc');");
                    js.ADD("MessageBox('Saved successfully', 'Miscellaneous Fees Details');");


                    break;
                case "actHasRqrdCompli":
                    setRqmtCompProp();
                    js.ADD("nwLoading_End('actHasRqrdCompli')");
                    break;





                default:
                    Prompt.Information("act_Method not found: " + strMethod, "Error");
                    break;
            }
            return js.makeJSPostScript(execute());
        }

        private DataTable LoadSchemaApprover()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadSchemaApprover();
            #endregion

            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridApprover"));

            foreach (DataRow items in dt.Rows)
            {
                DataRow dr = dtLIN.NewRow();

                dr["ID"] = WebApp.nwobjectText("txtReservationControlNo2");
                dr["ApproverCode"] = items[SPR_CODE].ToString();
                dr["Level"] = items[SPR_APPROVAL_LEVEL].ToString();
                dtLIN.Rows.Add(dr);
                dtLIN.AcceptChanges();
            }

            return dtLIN;
        }

        private string ValidateProcessDetails()
        {
            string error = "";
            DataTable dt = LoadSchemaApprover();

            if (dt.Rows.Count <= 0)
            {
                error += "Cannot be continued. Approver Details is required.\n";
            }

            foreach (DataRow r in dt.Rows)
            {
                if (r["ApproverCode"].ToString() == "")
                {
                    error += "Cannot be continued. Approver is required at Approval Level [" + r["Level"].ToString() + "].\n";
                }
            }

            return error;
        }

        //public void GenerateMisc(bool isIntialize)
        //{
        //    string gridID = "nwGridMiscellaneousFee";
        //    nwGrid nwGridCon = new nwGrid(gridID);
        //    DataTable dt = new DataTable();

        //    int rowCnt = 0;

        //    int colCnt = SPR_ORDERING;//maxcol
        //    nwGridCon.CreateExcelGrid(rowCnt, colCnt);
        //    nwGridCon.minRow(1);
        //    //nwGridCon.TableHeight(250);
        //    nwGridCon.RowHeight(20);

        //    nwGridCon.PagerPerPage(50);
        //    nwGridCon.TableHeight(150);

        //    //nwGridCon.ButtonMenuAdd("btnCopyFrom", "Copy From");
        //    nwGridCon.buttonInsert = true;
        //    nwGridCon.buttonDelete = true;


        //    #region Column Title
        //    nwGridCon.nwobject(SPR_MISC_MISCTYPE - 1).ColumnName("Miscellaneous Type");
        //    nwGridCon.nwobject(SPR_MISC_MISCTYPE - 1).Combo(dal.GetPaymentType());
        //    nwGridCon.nwobject(SPR_MISC_MISCTYPE - 1).HeaderFieldRequired(true);

        //    nwGridCon.nwobject(SPR_ALLOCATIONTYPE - 1).ColumnName("Allocation Type");
        //    nwGridCon.nwobject(SPR_ALLOCATIONTYPE - 1).HeaderFieldRequired(true);
        //    nwGridCon.nwobject(SPR_ALLOCATIONTYPE - 1).Combo(dal.GetBearing());

        //    nwGridCon.nwobject(SPR_PAYMENTCATEGORY - 1).ColumnName("Payment Category");
        //    nwGridCon.nwobject(SPR_PAYMENTCATEGORY - 1).HeaderFieldRequired(true);
        //    nwGridCon.nwobject(SPR_PAYMENTCATEGORY - 1).Class("ddPaymentCategory");
        //    nwGridCon.nwobject(SPR_PAYMENTCATEGORY - 1).Combo(dal.GetPaymentTermDetailsCategory(based.SecurityAccess.RecUser));


        //    nwGridCon.nwobject(SPR_MISCELLANEOUSDATE - 1).ColumnName("Miscellaneous Date");
        //    nwGridCon.nwobject(SPR_MISCELLANEOUSDATE - 1).HeaderFieldRequired(true);
        //    nwGridCon.nwobject(SPR_MISCELLANEOUSDATE - 1).InputDate(".clsMiscDate");

        //    nwGridCon.nwobject(SPR_MISCELLANEOUSAMOUNT - 1).ColumnName("Miscellaneous Amount");
        //    nwGridCon.nwobject(SPR_MISCELLANEOUSAMOUNT - 1).HeaderFieldRequired(true);
        //    nwGridCon.nwobject(SPR_MISCELLANEOUSAMOUNT - 1).Input(".clsMiscAmount");

        //    nwGridCon.nwobject(SPR_ORDERING - 1).ColumnName("Ordering");
        //    nwGridCon.nwobject(SPR_ORDERING - 1).BackgroundColor("gainsboro");
        //    #endregion

        //    #region Column Width
        //    nwGridCon.nwobject(SPR_ORDERING - 1).Width(0);
        //    nwGridCon.nwobject(SPR_MISCELLANEOUSAMOUNT - 1).Width(0);
        //    //nwGridCon.nwobject(SPR1_OTHERFEE - 1).Width(200);
        //    //nwGridCon.nwobject(SPR1_AMOUNT - 1).Width(100);
        //    //nwGridCon.nwobject(SPR1_REMARKS - 1).Width(200);

        //    #endregion

        //    #region Column Color
        //    //nwGridCon.nwobject(SPR1_OTHERFEE - 1).BackgroundColor("gainsboro");
        //    //nwGridCon.nwobject(SPR1_AMOUNT - 1).BackgroundColor("white");
        //    //nwGridCon.nwobject(SPR1_REMARKS - 1).BackgroundColor("white");
        //    #endregion

        //    #region Column Templates                       
        //    //nwGridCon.nwobject(SPR1_AMOUNT - 1).Template("<input value='{" + (SPR1_AMOUNT - 1) + "}' class='SPR1_AMOUNT' style='text-align:right;' />");
        //    //nwGridCon.nwobject(SPR1_REMARKS - 1).Template("<input value='{" + (SPR1_REMARKS - 1) + "}' class='SPR1_REMARKS' maxlength='255'/>");

        //    #endregion

        //    #region Column Button
        //    #endregion

        //    if (isIntialize)
        //    {
        //        //dt = dal.GetUnitDetailsTab(ID);
        //        dt = JSONToDataTable(WebApp.nwobjectText("jsonMisc"));
        //        nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
        //        nwGridCon.dataSource(dt);
        //        nwGridCon.maxRow(dt.Rows.Count);
        //    }
        //    else
        //    {
        //        nwGridCon.CreateExcelGrid(rowCnt, colCnt);
        //    }

        //    //## THEME FORMAT
        //    nwGridCon.HeaderBorderColor("#DEDEDE");
        //    nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
        //    nwGridCon.TableBorderColor("#BBB");
        //    nwGridCon.BodyBorderColor("#BBB");
        //    nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
        //    nwGridCon.HeaderTextColor("#131313");
        //    //nwGridCon.HoverColor("#DEDEDE", "inherit");
        //    //nwGridCon.SelectedRowHover("#DEDEDE");
        //    //nwGridCon.SelectedRowHoverColor("inherit");
        //    js.makeHTML("#nwGridMiscellaneousFeeCon", nwGridCon.createTable());
        //    js.ADD("MiscProperties();");
        //    //js.ADD("PopulateOtherFees();");
        //    js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
        //    js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
        //    js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

        //    if (WebApp.nwobjectBool("isFixInt"))
        //    {
        //        js.ADD("$('#nwGridMiscellaneousFeeCon').enable(false);");
        //    }


        //}


        public void GenerateMisc(bool isIntialize)
        {
            string gridID = "nwGridMiscellaneousFee";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();

            int rowCnt = 0;

            int colCnt = SPR_ORDERING;//maxcol
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.Type = nwGridType.SpreadCanvas;

            nwGridCon.minRow(1);
            //nwGridCon.TableHeight(250);
            nwGridCon.RowHeight(20);

            nwGridCon.PagerPerPage(50);
            nwGridCon.TableHeight(150);

            //nwGridCon.ButtonMenuAdd("btnCopyFrom", "Copy From");
            nwGridCon.buttonInsert = true;
            nwGridCon.buttonDelete = true;


            #region Column Title
            nwGridCon.nwobject(SPR_MISC_MISCTYPE - 1).ColumnName("Miscellaneous Type");
            //nwGridCon.nwobject(SPR_MISC_MISCTYPE - 1).Combo(dal.GetPaymentType());
            nwGridCon.nwobject(SPR_MISC_MISCTYPE - 1).LookUp("lugMiscType", true);
            nwGridCon.nwobject(SPR_MISC_MISCTYPE - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_MISC_MISCTYPE - 1).Enabled(true);

            nwGridCon.nwobject(SPR_ALLOCATIONTYPE - 1).ColumnName("Allocation Type");
            nwGridCon.nwobject(SPR_ALLOCATIONTYPE - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_ALLOCATIONTYPE - 1).LookUp("lugAllocType", true);
            nwGridCon.nwobject(SPR_ALLOCATIONTYPE - 1).Enabled(true);
            //  nwGridCon.nwobject(SPR_ALLOCATIONTYPE - 1).Combo(dal.GetBearing());

            nwGridCon.nwobject(SPR_PAYMENTCATEGORY - 1).ColumnName("Payment Category");
            nwGridCon.nwobject(SPR_PAYMENTCATEGORY - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_PAYMENTCATEGORY - 1).LookUp("lugPaymentCategoryMisc", true);
            nwGridCon.nwobject(SPR_PAYMENTCATEGORY - 1).Enabled(true);


            //  nwGridCon.nwobject(SPR_PAYMENTCATEGORY - 1).Class("ddPaymentCategory");
            // nwGridCon.nwobject(SPR_PAYMENTCATEGORY - 1).Combo(dal.GetPaymentTermDetailsCategory(based.SecurityAccess.RecUser));


            nwGridCon.nwobject(SPR_MISCELLANEOUSDATE - 1).ColumnName("Miscellaneous Date");
            nwGridCon.nwobject(SPR_MISCELLANEOUSDATE - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_MISCELLANEOUSDATE - 1).LookUp("lugclsMiscDate", true);
            nwGridCon.nwobject(SPR_MISCELLANEOUSDATE - 1).Enabled(true);

            nwGridCon.nwobject(SPR_MISCELLANEOUSAMOUNT - 1).ColumnName("Miscellaneous Amount");
            nwGridCon.nwobject(SPR_MISCELLANEOUSAMOUNT - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_MISCELLANEOUSAMOUNT - 1).Input(".clsMiscAmount");
            nwGridCon.nwobject(SPR_MISCELLANEOUSDATE - 1).Enabled(true);

            nwGridCon.nwobject(SPR_ORDERING - 1).ColumnName("Ordering");
            nwGridCon.nwobject(SPR_ORDERING - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Width
            nwGridCon.nwobject(SPR_ORDERING - 1).Width(0);
            nwGridCon.nwobject(SPR_MISCELLANEOUSAMOUNT - 1).Width(0);
            //nwGridCon.nwobject(SPR1_OTHERFEE - 1).Width(200);
            //nwGridCon.nwobject(SPR1_AMOUNT - 1).Width(100);
            //nwGridCon.nwobject(SPR1_REMARKS - 1).Width(200);

            #endregion

            #region Column Color
            //nwGridCon.nwobject(SPR1_OTHERFEE - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR1_AMOUNT - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR1_REMARKS - 1).BackgroundColor("white");
            #endregion

            #region Column Templates                       
            nwGridCon.nwobject(SPR_MISC_MISCTYPE - 1).Template("<input value='{" + (SPR_MISC_MISCTYPE - 1) + "}' class='SPR1_AMOUNT' style='text-align:right;' />");
            //nwGridCon.nwobject(SPR1_REMARKS - 1).Template("<input value='{" + (SPR1_REMARKS - 1) + "}' class='SPR1_REMARKS' maxlength='255'/>");

            #endregion

            #region Column Button
            #endregion

            if (isIntialize)
            {
                //dt = dal.GetUnitDetailsTab(ID);
                dt = JSONToDataTable(WebApp.nwobjectText("jsonMisc"));
                nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count);
            }
            else
            {
                nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");
            //nwGridCon.HoverColor("#DEDEDE", "inherit");
            //nwGridCon.SelectedRowHover("#DEDEDE");
            //nwGridCon.SelectedRowHoverColor("inherit");


            nwGridCon.varSpreadBook = "nwGridMainCon_Book_MiscType";
            nwGridCon.varSpreadSheet = "nwGridMainCon_Sheet_Misctype";
            js.ADD(nwGridCon.createTable());


            //js.makeHTML("#nwGridMiscellaneousFeeCon", nwGridCon.createTable());
            js.ADD("MiscProperties();");
            //js.ADD("PopulateOtherFees();");
            //js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            //js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            //js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            if (WebApp.nwobjectBool("isFixInt"))
            {
                js.ADD("$('#nwGridMiscellaneousFeeCon').enable(false);");
            }

            js.ADD("defaultDataMiscGrid();");



        }



        private void SetImage(string Code)
        {
            string imagestring = "";
            DataTable dt = dal.GetLogo(Code);
            try
            {
                imagestring = picChange(dt.Rows[0][0]);
            }
            catch (Exception ex) { }
            js.makeCSS("#ImgLogo", "background-image", "url(" + imagestring + ")");
        }


        private string ValidationForStatementDetails()
        {
            string errorResult = string.Empty;

            int ctr = 1;
            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridStatementDetailCon"));

            if (dt.Rows.Count <= 0)
                errorResult += $"Cannot be saved. At least one line detail is required.\n";
            else
            {
                foreach (DataRow dr_details in dt.Rows)
                {
                    string ID = dr_details[SPR_STATEMENT_CODE].ToString() + dr_details[SPR_STATEMENT_REMARKS].ToString();
                    if (ID != string.Empty)
                    {
                        if (dr_details[SPR_STATEMENT_CODE].ToString() == string.Empty)
                            errorResult += $"Cannot be saved. Statement Code is required at row {ctr}.\n";
                        else if (Parser.ParseBool(dr_details[SPR_STATEMENT_YES]) == false && Parser.ParseBool(dr_details[SPR_STATEMENT_NO]) == false)
                            errorResult += $"Cannot be saved. Please select yes or no at row {ctr}. \n";

                        if (Parser.ParseBool(dr_details[SPR_STATEMENT_YES]) == true)
                        {
                            if (dr_details[SPR_STATEMENT_REMARKS].ToString() == string.Empty)
                                errorResult += $"Cannot be saved. Remarks is required at row {ctr}.\n";
                        }
                        ctr++;
                    }
                }
            }
            return errorResult;
        }

        public void CreateGridApprover()
        {
            string gridID = "nwGridApprover";
            nwGrid m_spread = new nwGrid(gridID);


            m_spread.RowHeight(20);
            m_spread.CreateExcelGrid(1, SPR_APPROVER_NAME);
            m_spread.TableHeight(350);

            m_spread.nwobject(SPR_APPROVAL_LEVEL - 1).ColumnName("Approval Level");
            m_spread.nwobject(SPR_CODE - 1).ColumnName("Approver Code");
            m_spread.nwobject(SPR_APPROVER_NAME - 1).ColumnName("Approver Name");

            m_spread.nwobject(SPR_APPROVAL_LEVEL - 1).BackgroundColor("gainsboro");
            m_spread.nwobject(SPR_CODE - 1).BackgroundColor("cyan");
            m_spread.nwobject(SPR_APPROVER_NAME - 1).BackgroundColor("gainsboro");

            m_spread.nwobject(SPR_APPROVER_NAME - 1).Width(200);

            DataTable dt = new DataTable();

            //string hCode = WebApp.nwobjectText("CodeHistory");
            dt = dal.GetUserApproverUnitInventory(trantype, WebApp.nwobjectText("idvallugLocWithAccntblForms"), WebApp.nwobjectText("txtReservationControlNo2"));
            if (dt.Rows.Count > 0)
            {
                m_spread.CreateExcelGrid(dt.Rows.Count, SPR_APPROVER_NAME);
                m_spread.dataSource(dt);
                m_spread.maxRow(dt.Rows.Count);
            }
            else
            {
                Prompt.Information("Error. Please setup user approval matrix.", based.Title);
                js.ADD("nwPopupForm_HideModal('nwApprover');");
            }

            m_spread.maxRow(dt.Rows.Count);
            m_spread.dataSource(dt);

            m_spread.HeaderBorderColor("#DEDEDE");
            m_spread.rowBackground("#FFFFFF", "#FFFFFF");
            m_spread.TableBorderColor("#BBB");
            m_spread.BodyBorderColor("#BBB");
            m_spread.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            m_spread.HeaderTextColor("#131313");
            m_spread.HoverColor("#DEDEDE", "inherit");
            m_spread.SelectedRowHover("#DEDEDE");
            m_spread.SelectedRowHoverColor("inherit");

            m_spread.minRow(1);

            js.makeHTML("#nwGridApprover", m_spread.createTable());

            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",1,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

        }
        public void CreateGridPaymentDetails(bool enable, DataTable dtSource)
        {
            string gridID = "nwGridPaymentDetails";
            string gridContainer = "nwGridPaymentDetailsCon";
            nwGrid grid = new nwGrid(gridID);

            grid.dataSource(dtSource);
            grid.maxRow(dtSource.Rows.Count + 1);
            // grid buttons

            grid.minRow(1);
            grid.RowHeight(25);
            grid.TableHeight(300);

            //pager 
            //grid.PagerDataEditable(true);
            //grid.PagerPerPage(50);
            grid.buttonInsert = true;
            grid.buttonDelete = true;

            //CSS for GRID
            grid.HeaderBorderColor("#DEDEDE");
            grid.rowBackground("#FFFFFF", "#FFFFFF");
            grid.TableBorderColor("#BBB");
            grid.BodyBorderColor("#BBB");
            grid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            grid.HeaderTextColor("#131313");
            grid.HoverColor("#CAE1FF", "inherit");
            grid.BodyFontFamily = "Century Gothic";
            grid.HeaderFontFamily = "Century Gothic";

            //column width
            grid.nwobject(spr_PaymentDetailsPaymentMethodCode).Width(0);
            grid.nwobject(spr_PaymentDetailsCardTypeCode).Width(0);
            grid.nwobject(spr_PaymentDetailsUniqueID).Width(0);

            //color for rows
            grid.nwobject(spr_PaymentDetailsModeOfPaymentCode).BackgroundColor("cyan");
            grid.nwobject(spr_PaymentDetailsModeOfPaymentDesc).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsPaymentMethodCode).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsPaymentMethodDesc).BackgroundColor("gainsboro");

            grid.nwobject(spr_PaymentDetailsCurrencyCode).BackgroundColor("cyan");
            grid.nwobject(spr_PaymentDetailsCurrencyDesc).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsExchangeRateToLocal).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsExchangeRateToHome).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsOcyAmount).BackgroundColor("white");
            grid.nwobject(spr_PaymentDetailsLocalAmount).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsHomeAmount).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsPaymentCenterCode).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsPaymentCenterDesc).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsCheckNo).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsCheckDate).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsBankCode).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsBankName).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsBranch).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsCardTypeCode).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsCardTypeDesc).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsCardName).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsCardNo).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsExpiryDate).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsApprovalNo).BackgroundColor("gainsboro");

            // for saving column width
            //grid.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + gridID, based.SecurityAccess.RecUser);

            //template 
            grid.nwobject(spr_PaymentDetailsOcyAmount).Template("<input value='{" + (spr_PaymentDetailsOcyAmount) + "}'  class='clsOcyAmount' style='text-align:right;' />");
            grid.nwobject(spr_PaymentDetailsCheckNo).Template("<input value='{" + (spr_PaymentDetailsCheckNo) + "}'  class='clsCheckNo' />");
            grid.nwobject(spr_PaymentDetailsCheckDate).Template("<input value='{" + (spr_PaymentDetailsCheckDate) + "}'  class='clsDate nwDatePick' />");
            grid.nwobject(spr_PaymentDetailsBranch).Template("<input value='{" + (spr_PaymentDetailsBranch) + "}'  class='clsBranch' maxlength='80' />");
            //grid.nwobject(spr_PaymentDetailsAttachmentDetails).Template("<button type='button' class='btnAttachmentDetails'><center><b>...</b></center></button>");
            grid.nwobject(spr_PaymentDetailsAttachmentDetails).Template("<div class='gridbtn btnAttachmentDetails'>...</div>");

            grid.nwobject(spr_PaymentDetailsCardName).Template("<input value='{" + (spr_PaymentDetailsCardName) + "}'  class='clsCardName' maxlength='80' />");
            grid.nwobject(spr_PaymentDetailsCardNo).Template("<input value='{" + (spr_PaymentDetailsCardNo) + "}'  class='clsCardNo' maxlength='80' />");
            grid.nwobject(spr_PaymentDetailsExpiryDate).Template("<input value='{" + (spr_PaymentDetailsExpiryDate) + "}'  class='clsExpiryDate nwDatePick'/>");
            grid.nwobject(spr_PaymentDetailsApprovalNo).Template("<input value='{" + (spr_PaymentDetailsApprovalNo) + "}'  class='clsApprovalNo' maxlength='80' />");
            //align
            grid.nwobject(spr_PaymentDetailsOcyAmount).TextAlign("right");
            grid.nwobject(spr_PaymentDetailsLocalAmount).TextAlign("right");
            grid.nwobject(spr_PaymentDetailsHomeAmount).TextAlign("right");
            grid.nwobject(spr_PaymentDetailsExchangeRateToLocal).TextAlign("right");
            grid.nwobject(spr_PaymentDetailsExchangeRateToHome).TextAlign("right");

            //required field
            //grid.nwobject(spr_PaymentDetailsPaymentMethodDesc).HeaderFieldRequired(true);
            grid.nwobject(spr_PaymentDetailsModeOfPaymentCode).HeaderFieldRequired(true);
            grid.nwobject(spr_PaymentDetailsCurrencyCode).HeaderFieldRequired(true);
            //Display Grid


            js.makeHTML("#" + gridContainer, grid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            js.ADD("$portal().customFunc.paymentDetailsCon()");
        }

        public void CreateGridPaymentDetailsAttachment(bool enable, DataTable dtSource)
        {
            string gridID = "nwGridPaymentDetailsAttachment";
            string gridContainer = "nwGridPaymentDetailsAttachmentCon";
            nwGrid grid = new nwGrid(gridID);

            grid.dataSource(dtSource);
            grid.maxRow(dtSource.Rows.Count + 1);

            // grid buttons

            grid.minRow(1);
            grid.RowHeight(25);
            grid.TableHeight(300);

            //pager 
            //grid.PagerDataEditable(true);
            //grid.PagerPerPage(50);
            grid.buttonInsert = true;
            grid.buttonDelete = true;

            //CSS for GRID
            grid.HeaderBorderColor("#DEDEDE");
            grid.rowBackground("#FFFFFF", "#FFFFFF");
            grid.TableBorderColor("#BBB");
            grid.BodyBorderColor("#BBB");
            grid.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            grid.HeaderTextColor("#131313");
            grid.HoverColor("#CAE1FF", "inherit");
            grid.BodyFontFamily = "Century Gothic";
            grid.HeaderFontFamily = "Century Gothic";

            //column width
            grid.nwobject(spr_PaymentDetailsAttachFilePath).Width(0);
            grid.nwobject(spr_PaymentDetailsAttachUniqueID).Width(0);
            grid.nwobject(spr_PaymentDetailsAttachDepositoryBankCode).Width(0);

            //color for rows
            if (WebApp.nwobjectText("isBank") == "1")
                grid.nwobject(spr_PaymentDetailsAttachAccountNo).BackgroundColor("cyan");
            else
                grid.nwobject(spr_PaymentDetailsAttachAccountNo).BackgroundColor("gainsboro");

            grid.nwobject(spr_PaymentDetailsAttachDocumentName).BackgroundColor("white");
            grid.nwobject(spr_PaymentDetailsAttachDepositoryBankCode).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsAttachDepositoryBank).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsAttachBranch).BackgroundColor("gainsboro");
            grid.nwobject(spr_PaymentDetailsAttachDateDeposited).BackgroundColor("white");


            // for saving column width
            //grid.GetSaveWith(this.UserDefinedConnectionString, dal.MenuItemCode + gridID, based.SecurityAccess.RecUser);

            //template 
            grid.nwobject(spr_PaymentDetailsAttachDocumentName).Template("<input value='{" + (spr_PaymentDetailsAttachDocumentName) + "}'  class='clsAttachDocumentName' maxlength='80'/>");
            //grid.nwobject(spr_PaymentDetailsAttachAccountNo).Template("<input value='{" + (spr_PaymentDetailsAttachAccountNo) + "}'  class='clsAttachAccountNo' maxlength='80' />");
            //grid.nwobject(spr_PaymentDetailsAttachBranch).Template("<input value='{" + (spr_PaymentDetailsAttachBranch) + "}'  class='clsAttachBranch' maxlength='80' />");
            grid.nwobject(spr_PaymentDetailsAttachDateDeposited).Template("<input value='{" + (spr_PaymentDetailsAttachDateDeposited) + "}'  class='clsAttachDateDeposited nwDatePick' />");
            grid.nwobject(spr_PaymentDetailsAttachParticulars).Template("<input value='{" + (spr_PaymentDetailsAttachParticulars) + "}'  class='clsAttachParticulars' maxlength='255' />");

            grid.nwobject(spr_PaymentDetailsAttachAttachment).Template("<div class='gridbtn btnAttachFile' Value='...'>...</div>");
            grid.nwobject(spr_PaymentDetailsAttachViewAttachment).Template("<div class='gridbtn btnViewAttachment'><a style='color: black !important; text-decoration: none;'>...</a></div>");
            grid.nwobject(spr_PaymentDetailsAttachRemove).Template("<div class='gridbtn btnRemoveAttachment' Value='Remove'>...</div>");

            //align
            //required field
            grid.nwobject(spr_PaymentDetailsAttachDocumentName).HeaderFieldRequired(true);
            grid.nwobject(spr_PaymentDetailsAttachAttachment).HeaderFieldRequired(true);

            if (WebApp.nwobjectText("isBank") == "1")
                grid.nwobject(spr_PaymentDetailsAttachAccountNo).HeaderFieldRequired(true);


            //Display Grid

            js.makeHTML("#" + gridContainer, grid.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");

            js.ADD("$portal().customFunc.paymentDetailsAttachmentCon()");

        }
        public DataTable JSONToDataTable(string json)
        {
            var dt = JsonConvert.DeserializeObject<DataTable>(json);
            return dt;
        }
        public string DataTableToJSON(DataTable dt)
        {
            string json = JsonConvert.SerializeObject(dt);
            return json;
        }

        public string getToolBoxData(string tableName, string getMethod, string strParameter, string strValue)
        {
            string strFinal = ""; string sql = "";
            WebApp = new WebApplib(strParameter, strValue);
            switch (getMethod)
            {
                case "toolbox":
                    nwStandardBL standardBL = new nwStandardBL(WebApp);
                    standardBL.PrimaryKey = "TransactionNo";

                    string nwUnitCode = string.Empty;
                    string nwDocno = string.Empty;

                    nwUnitCode = WebApp.nwobjectText("nwUnitCode");
                    nwDocno = WebApp.nwobjectText("nwDocno");

                    //if (HttpContext.Current != null)
                    //{
                    //    var request = HttpContext.Current.Request;
                    //    nwDocno = request.QueryString["nwDocno"];
                    //}

                    strFinal = standardBL.LoadToolBoxData("#noah-webui-Toolbox-BindingNavigator", dal.GetData(based.SecurityAccess.RecUser, nwUnitCode, nwDocno), this.UserDefinedConnectionString);
                    //strFinal = getToolBoxDataRet(tableName, dal.GetData(), this.UserDefinedConnectionString, "1", "50");
                    break;
            }

            return strFinal;
        }

        //////////////////////// Common
        private void SetBindings()
        {
            SFObject.SetControlBinding("#idvallugLocWithAccntblForms", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LocwithAccountableForms");
            SFObject.SetControlBinding("#descvallugLocWithAccntblForms", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LocwithAccountableFormsDesc");
            SFObject.SetControlBinding("#idvallugAgent", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Agent");
            SFObject.SetControlBinding("#descvallugAgent", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SellerName");
            SFObject.SetControlBinding("#txtAgentType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AgencyType");
            SFObject.SetControlBinding("#idvallugBranchProject", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Branch");
            SFObject.SetControlBinding("#descvallugBranchProject", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "BranchDesc");
            SFObject.SetControlBinding("#txtReservationControlNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TransactionNo");
            SFObject.SetControlBinding("#idvallugFinancingType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "FinancingType");
            SFObject.SetControlBinding("#descvallugFinancingType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "FinancingTypeDesc");
            SFObject.SetControlBinding("#idvallugPaymentType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PaymentType");
            SFObject.SetControlBinding("#descvallugPaymentType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PaymentTypeDesc");
            SFObject.SetControlBinding("#idvallugClient", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Client");
            SFObject.SetControlBinding("#descvallugClient", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RegisteredName");
            SFObject.SetControlBinding("#txtCrossRefCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CustomerCodeCrossReference");
            SFObject.SetControlBinding("#txtVIPType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "VIPType");
            SFObject.SetControlBinding("#txtBirthdate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Birthday");
            SFObject.SetControlBinding("#txtAge", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Age");
            SFObject.SetControlBinding("#ddtxtSourceOfSale", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SourceOfSale");
            SFObject.SetControlBinding("#ddOrigin", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Origin");
            SFObject.SetControlBinding("#Agency", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Agency");
            //SFObject.SetControlBinding("#descvallugSourceofSale", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SourceOfSaleDesc");


            SFObject.SetControlBinding("#chkLumpSum", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "IsLumpSum");
            SFObject.SetControlBinding("#chkLetterofIntent", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "IsIntent");
            SFObject.SetControlBinding("#txtLOIDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LOIDate");
            SFObject.SetControlBinding("#txtReservationDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Reservation");
            SFObject.SetControlBinding("#txtExpirationDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Expiration");
            SFObject.SetControlBinding("#txtDocumentStatusCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Status");
            SFObject.SetControlBinding("#txtDocumentStatus", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "StatusDesc");

            SFObject.SetControlBinding("#txtrsnforDisapprovalCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "RsnForDisapprv");
            SFObject.SetControlBinding("#txtrsnforDisapprovalDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "reasonDesc");
            SFObject.SetControlBinding("#txtDisapprovalRemarks", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "DisapprvRemarks");

            SFObject.SetControlBinding("#txtStandardLotUnitPrice", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "StdLotUP");
            SFObject.SetControlBinding("#txtVatAmount", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Vat");
            SFObject.SetControlBinding("#txtTotalLotUP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "StdGrossLotUP");
            SFObject.SetControlBinding("#txtGrossSellingPrice", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "StdGrossLotUP");

            SFObject.SetControlBinding("#txtAddonsVATIN", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AddonsVatIn");
            SFObject.SetControlBinding("#txtTotalLotUnitPrice", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TotalLotUP");
            SFObject.SetControlBinding("#txtSalesDiscountAmount", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SalesDisc");
            SFObject.SetControlBinding("#txtNetLotUnitPrice", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "NetLotUP");
            SFObject.SetControlBinding("#txtMisc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Misc");
            SFObject.SetControlBinding("#txtMCF", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Misc");
            SFObject.SetControlBinding("#txtTCP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Tcp");
            SFObject.SetControlBinding("#txtDPDiscount", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "DpDisc");
            SFObject.SetControlBinding("#txtNTCP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Ntcp");
            SFObject.SetControlBinding("#idvallugAccountLoc1", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AcctLoc");
            SFObject.SetControlBinding("#descvallugAccountLoc1", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AcctLocDesc");
            SFObject.SetControlBinding("#idvallugAccountOfficer1", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AcctOfficer");
            SFObject.SetControlBinding("#descvallugAccountOfficer1", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "AcctOfficerDesc");
            SFObject.SetControlBinding("#idvallugAccountLoc2", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TrfAcctLoc");
            SFObject.SetControlBinding("#descvallugAccountLoc2", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TrfAcctLocDesc");
            SFObject.SetControlBinding("#idvallugAccountOfficer2", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TrfAcctOfficer");
            SFObject.SetControlBinding("#descvallugAccountOfficer2", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TrfAcctOfficerDesc");
            SFObject.SetControlBinding("#txtTotalUnitPrice", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TotalUP");
            SFObject.SetControlBinding("#txtUnitCapacity", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "UnitCapacity");

            SFObject.SetControlBinding("#chkReservationAmount", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "IsChangeReservationAmount");
            SFObject.SetControlBinding("#chkFixedInterest", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "IsFixedInterest");
            SFObject.SetControlBinding("#txtTotalUnitPrice", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "TotalUP");
            SFObject.SetControlBinding("#txtDPStartDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "DPStartDate");
            SFObject.SetControlBinding("#txtBalStartDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "BalStartDate");

            SFObject.SetControlBinding("#txtMonthlyDP", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MonthlyDP");
            SFObject.SetControlBinding("#txtMonthlyAmortization", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MonthlyAmortization");
            SFObject.SetControlBinding("#txtBranchID_DiscountCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Branch");
            SFObject.SetControlBinding("#txtBranchID_Discount", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "BranchDesc");
            SFObject.SetControlBinding("#txtInstallment", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Installment");
            SFObject.SetControlBinding("#txtFixed", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Fixed");
            SFObject.SetControlBinding("#chkatneedsale", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "AtneedSales");

            SFObject.SetControlBinding("#ddtxtPhase", "Text", "", "#noah-webui-Toolbox-BindingNavigator", "Phase");
            SFObject.SetControlBinding("#ddtxtUnitType", "Text", "", "#noah-webui-Toolbox-BindingNavigator", "UnitType");
            SFObject.SetControlBinding("#ddtxtUnitClass", "Text", "", "#noah-webui-Toolbox-BindingNavigator", "UnitClass");
            SFObject.SetControlBinding("#ddlNoOfUnits", "Text", "", "#noah-webui-Toolbox-BindingNavigator", "NoofUnits");
            SFObject.SetControlBinding("#txtReservationAmt", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ReservationAmount");
            SFObject.SetControlBinding("#txtItemGroupType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ItemGroupType");
            SFObject.SetControlBinding("#txtPropertyType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ItemGroupDesc");

            SFObject.SetControlBinding("#txtsalesdirector", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "salesdirector");
            SFObject.SetControlBinding("#txtsalesmanager", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "salesmanager");

            //Insurance Tab
            SFObject.SetControlBinding("#ddtxtInsuranceCompany", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "InsuranceCode");
            SFObject.SetControlBinding("#txtCoBorrower", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "CoBorrower");
            SFObject.SetControlBinding("#txtLoanAmount", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LoanAmount");
            SFObject.SetControlBinding("#txtLoanTerm", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LoanTerm");
            SFObject.SetControlBinding("#txtMaturityDate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MaturityDate");
            SFObject.SetControlBinding("#radioAboveNel", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "IsAbove");
            SFObject.SetControlBinding("#radioNel", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "IsNel");
            SFObject.SetControlBinding("#radioYes", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "IsYes");
            SFObject.SetControlBinding("#radioNo", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "IsNo");
            SFObject.SetControlBinding("#txtIsVatable", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "tagVatrate");


            SFObject.SetControlBinding("#txtPAFormNotes", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "PAFormNotes");
            SFObject.SetControlBinding("#txtSalesDiscountRate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SalesDiscRate");

            SFObject.SetControlBinding("#txtPhase_Combo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "phase");
            SFObject.SetControlBinding("#txtUnitType_Combo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "UnitType");
            SFObject.SetControlBinding("#txtUnitClass_Combo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "UnitClass");
            SFObject.SetControlBinding("#txtNoOfUnits_Combo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "NoofUnits");

            SFObject.SetControlBinding("#txtSpotCashDiscount_Combo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpotCashRate");
            SFObject.SetControlBinding("#txtCashAmount", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SpotCashAmt");

            SFObject.SetControlBinding("#txtInterestRate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "InterestRate");
            SFObject.SetControlBinding("#txtFixedInterest", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "FixedInterestAmount");

            SFObject.SetControlBinding("#txtShortDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Shortdesc");
            SFObject.SetControlBinding("#chkAgent", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "IsAllAgent");


            SFObject.SetControlBinding("#idvallugSourceOfSale", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SourceOfSale");
            SFObject.SetControlBinding("#descvallugSourceOfSale", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "SourceOfSaleDesc");

            SFObject.SetControlBinding("#txtLotPrice", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LotPrice");
            SFObject.SetControlBinding("#txtHousePrice", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "HousePrice");
            SFObject.SetControlBinding("#txtSellingPrice", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "StdLotUP");


            SFObject.SetControlBinding("#ddInventoryGroup_temp", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "InventoryGroup");
            SFObject.SetControlBinding("#ddProductType_temp", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "productType");
            SFObject.SetControlBinding("#ddInventoryType_temp", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "UnitType");
            SFObject.SetControlBinding("#ddInventoryClass_temp", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "UnitClass");
            SFObject.SetControlBinding("#ddPhaseTower_temp", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "phase");
            SFObject.SetControlBinding("#ddModel_temp", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Model");
            SFObject.SetControlBinding("#txtUnitCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "unitcode");
            SFObject.SetControlBinding("#txtMiscAmt", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MiscChargeAmt");
            SFObject.SetControlBinding("#txtRate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MiscChargeRate");
            SFObject.SetControlBinding("#txtUnitType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "UnitTypeCode");
            SFObject.SetControlBinding("#txtUnitClass", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "UnitClassCode");
            SFObject.SetControlBinding("#txtVatrate", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "vatrate");


            SFObject.SetControlBinding("#new_txtUniCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "unitcode");
            SFObject.SetControlBinding("#new_txtUniDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "unitdesc");
            SFObject.SetControlBinding("#new_txtInventoryTypeCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "UnitTypeCode");
            SFObject.SetControlBinding("#new_txtInventoryTypeDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "UnitTypeDesc");
            SFObject.SetControlBinding("#new_txtInventoryClassCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "UnitClassCode");
            SFObject.SetControlBinding("#new_txtInventoryClassDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "UnitClassDesc");


            SFObject.SetControlBinding("#new_txtInventoryGroupCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "InventoryGroup");
            SFObject.SetControlBinding("#new_txtInventoryGroupDesc", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "InventoryGroupDesc");
            SFObject.SetControlBinding("#new_txtLotArea", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "LotArea");
            SFObject.SetControlBinding("#new_txtFloorArea", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "FloorArea");
            SFObject.SetControlBinding("#new_txtUnitofMeasureCode", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "Uom");
            SFObject.SetControlBinding("#new_txtUnitofMeasure", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "UomDesc");
            SFObject.SetControlBinding("#new_txtRefHoldingNo", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "ReferenceHoldingNo_ENH");


            //SFObject.SetControlBinding("#txtPropertyType", "Val", "", "#noah-webui-Toolbox-BindingNavigator", "MiscChargeRate,");

            //FOOTER
            SFObject.SetControlBinding("#nwtxt_RecUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recuser");
            SFObject.SetControlBinding("#nwtxt_RecDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Recdate");
            SFObject.SetControlBinding("#nwtxt_ModUser", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moduser");
            SFObject.SetControlBinding("#nwtxt_ModDate", "text", "", "#noah-webui-Toolbox-BindingNavigator", "Moddate");

        }

        private void BindCollection()
        {
            //string Code = WebApp.nwobjectText("txtCode");
            //if (dal.ifIsUsed(Code) == 1)
            //{
            //    js.ADD("$('#noah-webui-Toolbox').bindingDelete().enable(false);");
            //    js.ADD("$('#txtDescription').prop('disabled', true);");
            //}
            js.ADD($"LoadComboPopulate('{DataTableToJSON(dal.getAllCombo(WebApp.nwobjectText("txtItemGroupType")))}')");
            if (WebApp.nwobjectText("idvallugFinancingType") == "SPOT")
            {
                DataTable dtSpotCombo = dal.SpotDropDown(
                WebApp.nwobjectText("idvallugFinancingType"), WebApp.nwobjectText("txtUnitCode"),
                WebApp.nwobjectText("idvallugBranchProject"),
                WebApp.nwobjectText("ddPhaseTower_temp"),
                WebApp.nwobjectDouble("txtGrossSellingPrice"),
                WebApp.nwobjectText("ReservationDate"),
                WebApp.nwobjectText("txtUnitType"),
                WebApp.nwobjectText("txtUnitClass"));

                js.ADD($"LoadSpotCombo('{DataTableToJSON(dtSpotCombo)}');");
                //   js.makeAppend("#ddSpotCashDiscount", "<option value='0.00'>sample</option>");

                DataTable dtcombo = dal.getComboSpotDisc(WebApp.nwobjectText("idvallugBranchProject"));
                for (int j = 0; j < dtcombo.Rows.Count; j++)
                {
                    string code = dtcombo.Rows[j][0].ToString();
                    js.makeAppend("#ddSpotCashDiscount", "<option value='" + code + "'>" + code + "</option>");
                }




                //js.ADD("$('#ddSpotCashDiscount').val($('#txtSpotCashDiscount_Combo').val())");
            }

            GenerateGrid(true);
            CreateGridAmortization(true, dal.getAmortById(WebApp.nwobjectText("ReservationControlNo")));
            js.ADD("DisableCheckboxDiscount();");

            js.ADD($"jsonMisc=JSON.parse('{DataTableToJSON(dal.getMiscellaneous(WebApp.nwobjectText("ReservationControlNo")))}');");
            js.ADD("$('#btnMiscellaneousDetails,#btnLoadCoBuyerDetails').enable(false);");
            js.ADD("$('#btnMiscellaneousDetails,#btnLoadCoBuyerDetails').css({ 'background': 'rgb(255,153,0)', 'color': 'white' });");

            js.ADD("$('#txtTotalUnitPrice').prop('disabled', true);");
            //js.ADD("$('#txtUnitCapacity').prop('disabled', true);");
            //js.ADD("LoadCombo();");



            js.ADD("$('#btnMiscellaneousDetails,#btnLoadCoBuyerDetails').enable(true)");
            js.ADD("$('#btnMiscellaneousDetails,#btnLoadCoBuyerDetails').css({ 'background': 'rgb(255,153,0)', 'color': 'white' });");

            js.ADD("fn_Outside();");
            js.ADD("$fn().copyOldSP();");
            js.ADD($"fn_isSpecial('{dal.isSpecial(WebApp.nwobjectText("ReservationControlNo"))}')");
            js.ADD("$('#btnEXP').css('background-color', '#101010');");
            js.ADD("$('#btnEXP').removeAttr('disabled');");
            BindPaymentDetails();



            js.ADD("nwLoading_End('xLoadingInt');");
        }


        private void BindPaymentDetails()
        {
            js.ADD($"$paymentDetails={DataTableToJSON(dal.getPaymentDetail(WebApp.nwobjectText("ReservationControlNo")))}");
            js.ADD($"$attachmentDetails={DataTableToJSON(dal.getPaymentDetailAttachment(WebApp.nwobjectText("ReservationControlNo")))}");
        }

        private string ValidateSavePaymentDetails()
        {
            string errorResult = string.Empty;
            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridPaymentDetailsCon"));


            if (dt.AsEnumerable().Where(
                r => r.Field<string>("Column1") != "" ||
                r.Field<string>("Column2") != "" ||
                r.Field<string>("Column4") != "" ||
                r.Field<string>("Column8") != "").ToList().Count <= 0)
                errorResult += "Cannot be saved. At least one line detail is required.\n";
            else
            {
                int i = 1;
                decimal totalLocalAmt = 0M;

                DataTable dtAttachmentDetails = JSONToDataTable(WebApp.nwobjectText("attachmentDetails"));
                DataTable dtPaymentMethod = dal.loadPaymentMethod();
                foreach (DataRow dr in dt.Rows)
                {
                    if (dr[spr_PaymentDetailsPaymentMethodDesc].ToString().Length <= 0)
                        errorResult += $"Cannot be saved. Payment Method is required at row[{i}]. \n";

                    if (dr[spr_PaymentDetailsModeOfPaymentCode].ToString().Length <= 0)
                        errorResult += $"Cannot be saved. Mode of Payment Code is required at row[{i}]. \n";

                    if (dr[spr_PaymentDetailsCurrencyCode].ToString().Length <= 0)
                        errorResult += $"Cannot be saved. Currency Code is required at row[{i}]. \n";

                    if (Parser.ParseDouble(dr[spr_PaymentDetailsOcyAmount]) <= 0)
                        errorResult += $"Cannot be saved. OCY Amount is required at row[{i}]. \n";



                    foreach (DataRow dRow in dtPaymentMethod.Rows)
                    {
                        if (dRow["code"].ToString() == dr[spr_PaymentDetailsModeOfPaymentCode].ToString())
                        {
                            if (dRow["paymentCenter"].ToString() == "1")
                            {
                                if (dr[spr_PaymentDetailsPaymentCenterCode].ToString().Length <= 0)
                                    errorResult += $"Cannot be saved. Payment Center Code is required at row[{i}]. \n";

                                if (dr[spr_PaymentDetailsCardTypeDesc].ToString().Length <= 0)
                                    errorResult += $"Cannot be saved. Card Type is required at row[{i}]. \n";


                            }
                            else if (dRow["bank"].ToString() == "1")
                            {
                                if (dr[spr_PaymentDetailsBankCode].ToString().Length <= 0)
                                    errorResult += $"Cannot be saved. Bank Code is required at row[{i}]. \n";
                                if (dr[spr_PaymentDetailsBranch].ToString().Length <= 0)
                                    errorResult += $"Cannot be saved. Branch is required at row[{i}]. \n";
                            }
                            else if (dRow["cardDetails"].ToString() == "1")
                            {
                                if (dr[spr_PaymentDetailsCardName].ToString().Length <= 0)
                                    errorResult += $"Cannot be saved. Card Name is required at row[{i}]. \n";
                                if (dr[spr_PaymentDetailsCardNo].ToString().Length <= 0)
                                    errorResult += $"Cannot be saved. Card No. is required at row[{i}]. \n";
                                if (dr[spr_PaymentDetailsExpiryDate].ToString().Length <= 0)
                                    errorResult += $"Cannot be saved. Expiry Date is required at row[{i}]. \n";
                                if (dr[spr_PaymentDetailsApprovalNo].ToString().Length <= 0)
                                    errorResult += $"Cannot be saved. Approval No. is required at row[{i}]. \n";
                            }
                            else if (dRow["checkDetails"].ToString() == "1")
                            {
                                if (dr[spr_PaymentDetailsCheckNo].ToString().Length <= 0)
                                    errorResult += $"Cannot be saved. Check No. is required at row[{i}]. \n";
                                if (dr[spr_PaymentDetailsCheckDate].ToString().Length <= 0)
                                    errorResult += $"Cannot be saved. Check Date is required at row[{i}]. \n";

                            }
                        }
                    }

                    if (dtAttachmentDetails != null && dtAttachmentDetails.Rows.Count > 0)
                    {
                        if (dtAttachmentDetails.Select($"[Unique ID]='{dr[spr_PaymentDetailsUniqueID].ToString()}'").Count() <= 0)
                            errorResult += $"Cannot be saved. Attachment Details is required at row[{i}]. \n";
                    }
                    else
                        errorResult += $"Cannot be saved. Attachment Details is required at row[{i}]. \n";

                    totalLocalAmt += Parser.ParseDecimal(dr[spr_PaymentDetailsLocalAmount].ToString());
                    i++;
                }

                decimal reservationAmount = Parser.ParseDecimal(WebApp.nwobjectText("ReservationAmount"));
                if (totalLocalAmt < reservationAmount)
                    errorResult += $"Cannot be saved. Total Local Amount should be greater than or equal to Reservation Amount. \n";
            }
            return errorResult;
        }
        private string ValidateSaveAttachmentPaymentDetails()
        {
            string errorResult = string.Empty;
            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridPaymentDetailsAttachmentCon"));


            if (dt.AsEnumerable().Where(
                r => r.Field<string>("Column0") != "" ||
                r.Field<string>("Column1") != "" ||
                r.Field<string>("Column3") != "" ||
                r.Field<string>("Column4") != "" ||
                r.Field<string>("Column6") != "" ||
                r.Field<string>("Column9") != "").ToList().Count <= 0)
                errorResult += "Cannot be saved. At least one line detail is required.\n";
            else
            {
                int i = 1;
                foreach (DataRow dr in dt.Rows)
                {
                    //if (dr[spr_PaymentDetailsAttachDocumentName].ToString().Length > 0 ||
                    //    dr[spr_PaymentDetailsAttachAccountNo].ToString().Length > 0 ||
                    //    dr[spr_PaymentDetailsAttachFilePath].ToString().Length > 0 ||
                    //    dr[spr_PaymentDetailsAttachBranch].ToString().Length > 0 ||
                    //    dr[spr_PaymentDetailsAttachDateDeposited].ToString().Length > 0 ||
                    //    dr[spr_PaymentDetailsAttachParticulars].ToString().Length > 0)
                    //{

                    if (WebApp.nwobjectText("isBank") == "1")
                    { //Is Bank
                        if (dr[spr_PaymentDetailsAttachAccountNo].ToString().Length <= 0)
                        {
                            errorResult += $"Cannot be saved. Account No. is required at row[{i}]. \n";
                        }
                    }

                    if (dr[spr_PaymentDetailsAttachDocumentName].ToString().Length <= 0)
                        errorResult += $"Cannot be saved. Document Name is required at row[{i}]. \n";
                    if (dr[spr_PaymentDetailsAttachFilePath].ToString().Length <= 0)
                        errorResult += $"Cannot be saved. Attachment is required at row[{i}]. \n";
                    //}


                    i++;
                }



            }
            return errorResult;
        }

        private string ValidateData(DataTable dtDetails)
        {
            string errorResult = string.Empty;
            //DataTable dtDetails = LoadHoldforReservationPaymentTermDetails(); //LoadHoldforReservationPaymentTermDetails2();

            //if (WebApp.nwobjectText("idvallugClient").Length <= 0)
            //    errorResult += "Cannot be generated. Customer is required. \n";

            //if (WebApp.nwobjectText("ReservationDate").Length <= 0)
            //    errorResult += "Cannot be generated. Reservation Date is required. \n";
            //if (WebApp.nwobjectText("ExpirationDate").Length <= 0)
            //    errorResult += "Cannot be generated. Expiration Date is required. \n";



            //if (WebApp.nwobjectText("idvallugFinancingType").Length <= 0)
            //{
            //    errorResult += "Cannot be generated. Financing Type is required. \n";
            //}
            //else
            //{
            //    //if (WebApp.nwobjectText("idvallugFinancingType") != "SPOT")
            //    //{
            //    //    if (WebApp.nwobjectText("idvallugFinancingType") != "DEF")
            //    //    {
            //    //        if (WebApp.nwobjectText("txtDPStartDate") == string.Empty)
            //    //            errorResult += "Cannt Generate. DP Start Date is required. \n";
            //    //    }

            //    //    if (WebApp.nwobjectText("txtBalStartDate") == string.Empty)
            //    //        errorResult += "Cannt Generate. Balance Start Date is required. \n";
            //    //}
            //}


            ////if (WebApp.nwobjectText("txtDPStartDate") != string.Empty && WebApp.nwobjectText("txtBalStartDate") != string.Empty)
            ////{
            ////    if (Parser.ParseDateTime(WebApp.nwobjectText("txtBalStartDate"), Parser.DateTimeType.Min) <=
            ////        Parser.ParseDateTime(dal.GetEndDate(WebApp.nwobjectText("txtDPStartDate"), WebApp.nwobjectText("TotalNoofPayments")), Parser.DateTimeType.Min)
            ////        )
            ////    {
            ////        errorResult += "Cannot be generated. Invalid Date. Balance Start Date should not overlapped the DP Start Date. \n";
            ////    }
            ////}

            ////if (Parser.ParseDouble(WebApp.nwobjectText("NoOfUnits")) != Parser.ParseDouble(WebApp.nwobjectText("TotalQty")))
            ////    errorResult += "Cannot be generated. Total Quantity should be equal to No. of Units. \n";

            //if (dtDetails.Rows.Count <= 0)
            //{
            //    errorResult += "Cannot be generated. Payment Term Details is required. \n";
            //}
            //else
            //{

            //    /*Miscellaneous is Required*/
            //    double MiscLine = WebApp.nwobjectDouble("Misc");
            //    double Misc = WebApp.nwobjectDouble("txtMisc");

            //    if (MiscLine == 0 && Misc > 0)
            //        errorResult += "Cannot be generated. Miscellaneous is required. \n";
            //    else if (MiscLine < Misc && Misc > 0)
            //        errorResult += "Cannot be generated. Default Miscellaneous is insufficient. \n";

            //    double totalContractRate = 0.00;
            //    DataTable discountCeiling = dal.GetDiscountCeilingRate(WebApp.nwobjectText("Branch"), "DOWNP");

            //    if (WebApp.nwobjectBool("isDiscountChecked"))
            //    {
            //        if (discountCeiling.Rows.Count <= 0)
            //        {
            //            if (WebApp.nwobjectText("discountCeilingTag") == "1")
            //            {
            //                errorResult += "Cannot be generated. Please setup Discount Ceiling. \n";
            //            }
            //        }
            //    }

            //    double discountRate = 0.00;
            //    double discAmt = 0.00;
            //    double netLotUnitPrice = 0.00;

            //    double setupDiscountRate = 0.00;
            //    double setupDiscAmt = 0.00;

            //    bool IsContainReserv = false;
            //    bool IsContainDownp = false;
            //    double reservRate = 0.00;

            //    int i = 1;
            //    decimal ntcp = 0;
            //    foreach (DataRow dr in dtDetails.Rows)
            //    {

            //        if (dr["Category"].ToString().ToUpper() == string.Empty)
            //        {
            //            errorResult += $"Cannot be generated. Payment Category is required at row {i}. \n";
            //        }

            //        if (dr["PaymentTerm"].ToString().ToUpper() == string.Empty)
            //        {
            //            errorResult += $"Cannot be generated. Payment Term is required at row {i}. \n";
            //        }

            //        if (dr["Category"].ToString().ToUpper() == "RESRV" && dr["Category"].ToString() != string.Empty)
            //        {
            //            IsContainReserv = true;
            //            reservRate = Parser.ParseDouble(WebApp.nwobjectText("LotPrice"));
            //        }
            //        if (dr["Category"].ToString().ToUpper() == "DOWNP" && dr["Category"].ToString() != string.Empty)
            //        {
            //            IsContainDownp = true;
            //        }

            //        totalContractRate += Parser.ParseDouble(dr["ContractRate"].ToString());
            //        ntcp += Parser.ParseDecimal(dr["Ntcp"].ToString());

            //        if (Parser.ParseInt(dr["DPDisc"].ToString()) == 1)
            //        {
            //            if (Parser.ParseDouble(dr["DPDiscRate"].ToString()) <= 0)
            //                errorResult += "Cannot be generated. DP rate is required. \n";
            //            else if (Parser.ParseDouble(dr["DPDiscAmount"].ToString()) <= 0)
            //                errorResult += "Cannot be generated. DP Discount Amount is required. \n";

            //            if (dr["Category"].ToString().ToUpper() == "DOWNP" && dr["Category"].ToString() != string.Empty)
            //            {
            //                discountRate += Parser.ParseDouble(dr["DPDiscRate"]);
            //                discAmt += Parser.ParseDouble(dr["DPDiscAmount"]);
            //                netLotUnitPrice += Parser.ParseDouble(dr["NetLotUP"]);
            //            }
            //        }
            //        i++;
            //    }

            //    //if (Math.Round(totalContractRate,2) != 100.00)
            //    //{
            //    //    errorResult += "Cannot be generated. Total Contract Rate should be equal to 100%. \n";
            //    //}

            //    if (ntcp != Parser.ParseDecimal(WebApp.nwobjectText("txtNTCP")))
            //        errorResult += "Cannot be generated. Net Contract Price should be equal to Total Net Contract Price. \n";


            //    //If Reserv contain

            //    //if (IsContainReserv && IsContainDownp)
            //    //{
            //    //    if(WebApp.nwobjectDouble("dpRate")< WebApp.nwobjectDouble("reservRate"))
            //    //    {
            //    //        errorResult += "Cannot be generated.  Invalid Contract rate in row["+(WebApp.nwobjectInt("dpIndex")+1)+ "]. It should be greater than the rate of Reservation from the Net Lot / Unit Price. \n";
            //    //    }
            //    //}

            //    //if (discountCeiling.Rows.Count > 0)
            //    //{
            //    //    setupDiscountRate = Parser.ParseDouble(discountCeiling.Rows[0]["Rate"]);
            //    //    setupDiscAmt = Parser.ParseDouble(discountCeiling.Rows[0]["Amount"]);

            //    //    if (setupDiscountRate > 0)
            //    //    {
            //    //        if (discountRate > setupDiscountRate)
            //    //            errorResult += "Cannot be generated. Total Discount Rate exceed to the limit assigned in Discount Ceiling Setup. \n";
            //    //    }
            //    //    else
            //    //    {
            //    //        if (discAmt > setupDiscAmt)
            //    //            errorResult += "Cannot be generated. Total Discount Amount exceed to the limit assigned in Discount Ceiling Setup. \n";
            //    //    }

            //    //}
            //}


            return errorResult;
        }

        public string ValidateMiscellaneous(DataTable paymenttermLIN)
        {
            string errorResult = string.Empty;
            DataTable dtDetails = LoadHoldforReservationPaymentTermDetails(paymenttermLIN);
            if (dtDetails.Rows.Count <= 0)
            {
                errorResult += "Cannot proceed. Payment Term Details is required. \n";
            }
            else
            {
                double contractRate = 0.00;
                double totalLotPrice = 0.00;
                for (int i = 0; i < dtDetails.Rows.Count; i++)
                {
                    if (Parser.ParseDouble(dtDetails.Rows[i]["ContractRate"]) <= 0 && dtDetails.Rows[i]["Category"].ToString() != "RESRV")
                        errorResult += "Contract Rate is required at row [" + (i + 2) + "]. \n";

                    contractRate += Parser.ParseDouble(dtDetails.Rows[i]["ContractRate"]);
                    totalLotPrice += Parser.ParseDouble(dtDetails.Rows[i]["TotalLotPrice"]);
                }


                //if(totalLotPrice!=WebApp.nwobjectDouble("txtGrossSellingPrice"))
                //    errorResult += "Cannot proceed. Gross Selling Price should be equal to Total Term Amount. \n";

                //if (Math.Round(contractRate,2) != 100.00)
                //{
                //    errorResult += "Cannot proceed. Total Contract Rate should be equal to 100%. \n";
                //}
            }

            return errorResult;
        }

        private string AreValidEntries(bool IsSave)
        {
            string errorResult = String.Empty;
            string SaveProcess = String.Empty;

            if (IsSave)
                SaveProcess = "be saved";
            else
                SaveProcess = "be processed";

            if (WebApp.nwobjectText("descvallugLocWithAccntblForms").Length <= 0)
            {
                errorResult += "Cannot " + SaveProcess + ". Location with Accountable Forms is required.\n";
            }


            //if (WebApp.nwobjectText("descvallugBranchProject").Length <= 0)
            //{
            //    errorResult += "Cannot " + SaveProcess + ". Branch (Project) is required.\n";
            //}

            if (WebApp.nwobjectText("descvallugFinancingType").Length <= 0)
            {
                errorResult += "Cannot " + SaveProcess + ". Financing Type is required.\n";
            }

            if (WebApp.nwobjectText("descvallugBranchProject").Length <= 0)
            {
                errorResult += "Cannot " + SaveProcess + ". Project is required.\n";
            }

            if (WebApp.nwobjectText("descvallugClient").Length <= 0)
            {
                errorResult += "Cannot " + SaveProcess + ". Customer is required.\n";
            }

            if (WebApp.nwobjectText("descvallugSourceOfSale").Length <= 0)
            {
                errorResult += "Cannot " + SaveProcess + ". Source of Sale is required.\n";
            }

            /*Miscellaneous is Required*/
            double MiscLine = WebApp.nwobjectDouble("Misc");
            double Misc = WebApp.nwobjectDouble("txtMisc");

            //if (MiscLine < Misc)
            //    errorResult += "Cannot " + SaveProcess + ". Miscellaneous is required. \n";

            if (WebApp.nwobjectText("txtReservationDate").Length <= 0)
            {
                errorResult += "Cannot " + SaveProcess + ". Reservation Date is required.\n";
            }
            else
            {
                if (Parser.ParseDateTime(Parser.ParseDateTime(WebApp.nwobjectText("txtReservationDate"), Parser.DateTimeType.Min).ToShortDateString(), Parser.DateTimeType.Min) > Parser.ParseDateTime(SFObject.GetServerDateTime(this.UserDefinedConnectionString).ToShortDateString(), Parser.DateTimeType.Min))
                {
                    errorResult += "Cannot " + SaveProcess + ". Reservation Date should not be later than the current server date.\n";
                }
            }

            if (WebApp.nwobjectText("txtExpirationDate").Length <= 0)
            {
                errorResult += "Cannot " + SaveProcess + ". Reservation Expiration Date is required.\n";
            }

            if (WebApp.nwobjectText("txtReservationDate").Length > 0 && WebApp.nwobjectText("txtExpirationDate").Length > 0)
            {
                if (Parser.ParseDateTime(WebApp.nwobjectText("txtReservationDate"), Parser.DateTimeType.Min) >
                    Parser.ParseDateTime(WebApp.nwobjectText("txtExpirationDate"), Parser.DateTimeType.Min)
                    )
                {
                    errorResult += "Cannot " + SaveProcess + ". Reservation Expiration Date should be greater than or equal to Reservation Date. \n";
                }

                //02.20.2018
                if (Parser.ParseDateTime(WebApp.nwobjectText("txtExpirationDate"), Parser.DateTimeType.Min) < Parser.ParseDateTime(SFObject.GetServerDateTime(this.UserDefinedConnectionString), Parser.DateTimeType.Min))
                {
                    errorResult += "Cannot " + SaveProcess + ". Reservation is already expired. \n";
                }
            }

            if (dal.CheckUserApprovalMatrix(WebApp.nwobjectText("idvallugLocWithAccntblForms"), trantype) == "4")
            {
                errorResult += "Cannot " + SaveProcess + ". Please setup User Approval Matrix.\n"; //Edited by SMR 02/06/2019
            }

            if (dal.CheckIfRequiredAgent(WebApp.nwobjectText("idvallugSourceOfSale")) == "1")
            {
                if (WebApp.nwobjectText("descvallugAgent").Length <= 0)
                {
                    errorResult += "Cannot " + SaveProcess + ". Seller is required.\n";
                }
            }



            DataSet tempDTPaymentterm = WebApp.DataSet("nwGridPaymentTermDetails");
            DataTable dtPaymentTermDtls = new DataTable();
            try
            {
                dtPaymentTermDtls = tempDTPaymentterm.Tables[0];
            }
            catch { }


            DataTable dtDetails = LoadHoldforReservationPaymentTermDetails(dtPaymentTermDtls);
            if (dtDetails.Rows.Count <= 0)
            {
                errorResult += "Cannot " + SaveProcess + ". Payment Term Details is required. \n";
            }
            //else
            //{
            //    if (IsSave)
            //    {
            //        DataTable dtAmort = LoadHoldforReservationEntry_Amortization();
            //        if (LoadHoldforReservationEntry_Amortization().Rows.Count <= 0)
            //            errorResult += "Cannot " + SaveProcess + ". Generate Amortization Schedule. \n";
            //    }
            //}

            if (IsSave == false)
            {
                if ("1" != dal.checkReservationDoc(WebApp.nwobjectText("txtReservationControlNo"), trantype))
                    errorResult += "Cannot " + SaveProcess + ". Reservation Document Control is required. \n";
            }



            DataTable validationUnitDls = dal.validateUnitDetails(WebApp.nwobjectText("new_txtUniCode"), WebApp.nwobjectText("txtReservationControlNo"), WebApp.nwobjectDouble("new_txtLotArea"), WebApp.nwobjectDouble("new_txtFloorArea"));
            DataRow dr = validationUnitDls.Rows[0];
            string val = dr["value"].ToString();


            if (val == "1")
            {
                errorResult += "Cannot be saved. Exceeded the allowable foreign ownsership for this tower. Please select from other tower. \n";
            }


            return errorResult;
        }

        private string InsuranceTabValidation(string SaveProcess)
        {
            string errorResult = string.Empty;
            DataTable dtInsuranceLin = LoadHoldforReservationInsuranceLin();


            if (WebApp.nwobjectText("ddtxtInsuranceCompany").ToString() != string.Empty)
            {
                if (WebApp.nwobjectText("txtLoanAmount").ToString() == string.Empty)
                    errorResult += "Cannot " + SaveProcess + ". Loan Amount is required.\n";

                if (WebApp.nwobjectText("txtLoanTerm").ToString() == string.Empty)
                    errorResult += "Cannot " + SaveProcess + ". Loan Term is required.\n";

                //if (WebApp.nwobjectText("txtMaturityDate").ToString() == string.Empty)
                //    errorResult += "Cannot " + SaveProcess + ". Maturity Date is required.\n";

                if (dtInsuranceLin.Rows.Count <= 0)
                    errorResult += "Cannot " + SaveProcess + ". At least one Insurance line detail is required.\n";
            }

            if (dtInsuranceLin.Rows.Count > 0)
            {
                if (WebApp.nwobjectText("txtBirthdate") != string.Empty)
                {
                    if (dal.CheckingofDateOfBirth(WebApp.nwobjectText("txtBirthdate")) > 65)
                    {
                        errorResult += "Cannot " + SaveProcess + ". Insurance is not allowed. Customer is overage. \n";
                    }
                }


                if (WebApp.nwobjectText("ddtxtInsuranceCompany").ToString() == string.Empty)
                    errorResult += "Cannot " + SaveProcess + ". Insurance Company is required.\n";

                if (WebApp.nwobjectText("txtLoanAmount").ToString() == string.Empty)
                    errorResult += "Cannot " + SaveProcess + ". Loan Amount is required.\n";

                if (WebApp.nwobjectText("txtLoanTerm").ToString() == string.Empty)
                    errorResult += "Cannot " + SaveProcess + ". Loan Term is required.\n";

                //if (WebApp.nwobjectText("txtMaturityDate").ToString() == string.Empty)
                //    errorResult += "Cannot " + SaveProcess + ". Maturity Date is required.\n";

                int ctr = 1;
                foreach (DataRow dr in dtInsuranceLin.Rows)
                {
                    if (dr["SecondaryBeneficiaries"].ToString() == string.Empty)
                        errorResult += "Cannot " + SaveProcess + ". Secondary Beneficiaries is required at row " + ctr + ".\n";
                    //if (dr["DateOfBirth"].ToString() == string.Empty)
                    //    errorResult += "Cannot " + SaveProcess + ". Date of Birth is required at row " + ctr + ".\n";
                    //if (dr["PlaceofBirth"].ToString() == string.Empty)
                    //    errorResult += "Cannot " + SaveProcess + ". Place of Birth is required at row " + ctr + ".\n";
                    if (dr["Citizenship"].ToString() == string.Empty)
                        errorResult += "Cannot " + SaveProcess + ". Citizenship is required at row " + ctr + ".\n";
                    if (dr["RelationshipToTheApplicant"].ToString() == string.Empty)
                        errorResult += "Cannot " + SaveProcess + ". Relationship to the Applicant is required at row " + ctr + ".\n";
                    ctr++;
                }
            }
            return errorResult;
        }

        private DataTable LoadSchema()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadSchema();
            #endregion
            DataRow dr = dtHDR.NewRow();
            dr["TransactionNo"] = WebApp.nwobjectText("txtReservationControlNo");
            dr["LocwithAccountableForms"] = WebApp.nwobjectText("idvallugLocWithAccntblForms");
            dr["Agent"] = WebApp.nwobjectText("idvallugAgent");
            dr["Branch"] = WebApp.nwobjectText("idvallugBranchProject");
            dr["FinancingType"] = WebApp.nwobjectText("idvallugFinancingType");
            dr["Client"] = WebApp.nwobjectText("idvallugClient");
            dr["SourceOfSale"] = WebApp.nwobjectText("idvallugSourceOfSale");
            dr["Reservation"] = WebApp.nwobjectText("txtReservationDate");

            dr["Expiration"] = WebApp.nwobjectText("txtExpirationDate");  
            dr["Status"] = WebApp.nwobjectInt("txtDocumentStatusCode");
            dr["RsnForDisapprv"] = WebApp.nwobjectText("txtrsnforDisapprovalCode");
            dr["DisapprvRemarks"] = WebApp.nwobjectText("txtDisapprovalRemarks");
            dr["StdLotUP"] = WebApp.nwobjectDouble("txtSellingPrice");
            dr["LotPrice"] = WebApp.nwobjectDouble("txtLotPrice");
            dr["HousePrice"] = WebApp.nwobjectDouble("txtHousePrice");
            dr["Vat"] = WebApp.nwobjectDouble("txtVatAmount");
            dr["StdGrossLotUP"] = WebApp.nwobjectDouble("txtGrossSellingPrice");
            dr["SalesDisc"] = WebApp.nwobjectDouble("txtSalesDiscountAmount");
            dr["NetLotUP"] = WebApp.nwobjectDouble("txtGrossSellingPrice") - WebApp.nwobjectDouble("txtSalesDiscountAmount");
            dr["Misc"] = WebApp.nwobjectDouble("txtMisc");
            dr["Tcp"] = WebApp.nwobjectDouble("txtTCP");
            dr["DpDisc"] = WebApp.nwobjectDouble("txtDPDiscount");
            dr["Ntcp"] = WebApp.nwobjectDouble("txtNTCP");
            dr["IsFixedInterest"] = WebApp.nwobjectBool("chkFixedInterest") ? 1 : 0;
            dr["IsLumpSum"] = WebApp.nwobjectBool("chkLumpSum") ? 1 : 0;
            dr["DPStartDate"] = ValidateDate(WebApp.nwobjectText("txtDPStartDate")) ? WebApp.nwobjectText("txtDPStartDate") : (object)DBNull.Value;
            dr["BalStartDate"] = ValidateDate(WebApp.nwobjectText("txtBalStartDate")) ? WebApp.nwobjectText("txtBalStartDate") : (object)DBNull.Value;


            dr["MonthlyDP"] = WebApp.nwobjectDouble("txtMonthlyDP");
            dr["MonthlyAmortization"] = WebApp.nwobjectDouble("txtMonthlyAmortization");
            dr["UnitType"] = WebApp.nwobjectText("new_txtInventoryTypeCode");
            dr["UnitClass"] = WebApp.nwobjectText("new_txtInventoryClassCode");
            // dr["Phase"] = WebApp.nwobjectText("ddPhaseTower");
            dr["InventoryGroup"] = WebApp.nwobjectText("new_txtInventoryGroupCode");
            //dr["ProductType"] = WebApp.nwobjectText("ddProductType");
            //dr["Model"] = WebApp.nwobjectText("ddModel");
            dr["RecUser"] = based.SecurityAccess.RecUser;
            dr["ModUser"] = based.SecurityAccess.RecUser;
            dr["Agency"] = WebApp.nwobjectText("idvallugAgent");
            //dr["ItemGroupType"] = WebApp.nwobjectText("ItemGroupType");
            dr["SpotCashRate"] = WebApp.nwobjectDouble("ddSpotCashDiscount");
            dr["SpotCashAmt"] = WebApp.nwobjectDouble("txtCashAmount");
            dr["vatrate"] = WebApp.nwobjectDouble("txtVatrate");
            dr["MiscChargeRate"] = WebApp.nwobjectDouble("txtRate");
            dr["MiscChargeAmt"] = WebApp.nwobjectDouble("txtMiscAmt");
            dr["ItemGroupType"] = WebApp.nwobjectText("txtItemGroupType");
            dr["Unitcode"] = WebApp.nwobjectText("UnitCode");
            dr["ReservationAmount"] = WebApp.nwobjectDouble("reservAmount");

            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion

            return dtHDR;
        }

        private DataTable LoadClientInformation()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadClientInformation();
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["LotUnitPrice"] = WebApp.nwobjectDouble("LotPrice");
            dr["SalesDisc"] = WebApp.nwobjectDouble("SalesDisc");
            dr["NetLotUnitPrice"] = WebApp.nwobjectDouble("NetLotUnitPrice");
            dr["MiscMCF"] = WebApp.nwobjectDouble("MCF");
            dr["TotalContractPrice"] = WebApp.nwobjectDouble("TCP");
            dr["DpDisc"] = WebApp.nwobjectDouble("DPDiscount");
            dr["Ntcp"] = WebApp.nwobjectDouble("NTCP");
            dr["Downpayment"] = WebApp.nwobjectDouble("Downpayment");
            dr["Balance"] = WebApp.nwobjectDouble("Balance");
            dr["Reservation"] = WebApp.nwobjectDouble("Reservation");
            dr["ReservationDate"] = WebApp.nwobjectText("ReservationDate");
            dr["ClientCode"] = WebApp.nwobjectText("Client");
            dr["Agency"] = WebApp.nwobjectText("Agency");
            dr["Agent"] = WebApp.nwobjectText("Agent");
            dr["Recuser"] = based.SecurityAccess.RecUser;
            dr["UnitType"] = WebApp.nwobjectText("UnitType");
            dr["UnitClass"] = WebApp.nwobjectText("UnitClass");
            dr["Interest"] = WebApp.nwobjectDouble("txtInterestRate");
            dr["Branch"] = WebApp.nwobjectText("Branch");
            if (WebApp.nwobjectBool("chkatneedsale"))
                dr["Tcp"] = WebApp.nwobjectDouble("TCP");
            else
                dr["Tcp"] = WebApp.nwobjectDouble("totalLotUP") + WebApp.nwobjectDouble("MCF");

            string itemgrouptype = WebApp.nwobjectText("ItemGroupType");
            DataTable dtVatLimit = dal.GetVatLimit(itemgrouptype);
            double vatlimit = 0.00;
            double vatrate = 0.00;

            if (dtVatLimit.Rows.Count > 0)
            {
                vatlimit = Parser.ParseDouble(dtVatLimit.Rows[0]["VatLimit"]);
                vatrate = Parser.ParseDouble(dtVatLimit.Rows[0]["Vatrate"]);
            }
            if (WebApp.nwobjectText("txtIsVatable") == "1")
                dr["Vatrate"] = vatrate;
            else
                dr["Vatrate"] = 0;

            dr["AllocationOfMiscOnNTCP"] = Parser.ParseDouble(Math.Round((Parser.ParseDouble(WebApp.nwobjectDouble("MCF")) / Parser.ParseDouble(WebApp.nwobjectDouble("NTCP"))), 4));
            dr["Company"] = dal.getCompany();
            dr["UnitCode"] = WebApp.nwobjectText("IDUnitCapacity");//dal.getCombinationOfUnitCode(WebApp.nwobjectText("IDUnitCapacity"));
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion
            return dtHDR;
        }

        private DataTable LoadTermDetails()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadTermDetails();
            #endregion

            DataTable dt2 = WebApp.nwGridData(WebApp.nwobjectText("nwGridPaymentTermDetailsCon"));

            DataView dv = dt2.DefaultView;
            dv.Sort = "Column23 asc";
            DataTable dt = dv.ToTable();

            DataTable dtPaymentTerm;
            double termamount = 0.00;
            double termperiod = 0.00;
            double annualrate = 0.00;
            double penaltyrate = 0.00;
            double totalnoofpayments = 0.00;
            string enddate = "";

            int rownum = 1;
            int reservCount = 0;
            int dpCount = 0;
            int balCount = 0;
            int spotCount = 0;
            string startdatedp = "";
            bool firstdp = false;
            double monthlydp = 0.00;
            double monthlybal = 0.00;

            DataTable dtTerm = dal.GetTermPeriod(based.SecurityAccess.RecUser);

            //foreach (DataRow dr_details in dt.Rows)
            //{
            //    if (dr_details[SPR_PaymentTermDetails_PaymentCategoryCode].ToString() != string.Empty)
            //    {
            //        termamount = 0.00;
            //        termperiod = 0.00;
            //        annualrate = 0.00;
            //        penaltyrate = 0.00;
            //        totalnoofpayments = 0.00;
            //        enddate = "";
            //        monthlydp = 0.00;
            //        monthlybal = 0.00;
            //        DataRow dr = dtLIN.NewRow();

            //        dr["PaymentTerm"] = dr_details[SPR_PaymentTermDetails_PaymentTermCode].ToString();
            //        dr["ContractRate"] = Parser.ParseDouble(dr_details[SPR_PaymentTermDetails_ContractRate].ToString());

            //        termamount = Parser.ParseDouble(dr_details[SPR_PaymentTermDetails_NTCP].ToString());/* WebApp.nwobjectDouble("TCP") * (Parser.ParseDouble(dr_details[SPR_PaymentTermDetails_ContractRate].ToString()) / 100);*/
            //        dtPaymentTerm = dal.getTermPeriod(dr_details[SPR_PaymentTermDetails_PaymentTermCode].ToString());
            //        if (dr_details[SPR_PaymentTermDetails_PaymentCategoryCode].ToString().ToUpper() == "SPOT")
            //        {
            //            termperiod = 1;
            //        }
            //        else
            //            termperiod = Parser.ParseDouble(dtPaymentTerm.Rows[0]["TermPeriod"].ToString());

            //        totalnoofpayments = Parser.ParseDouble(dtPaymentTerm.Rows[0]["TotalNoPayments"].ToString());
            //        annualrate = Parser.ParseDouble(dtPaymentTerm.Rows[0]["AnnualRate"].ToString());
            //        penaltyrate = Parser.ParseDouble(dtPaymentTerm.Rows[0]["PenaltyRate"].ToString());

            //        dr["TermAmount"] = termamount;
            //        dr["TermDisc"] = Parser.ParseDouble(dr_details[SPR_PaymentTermDetails_DPDiscountAmount]);

            //        if (WebApp.nwobjectText("idvallugFinancingType").ToUpper() == "SPOT")
            //        {
            //            dr["MonthlyPayment"] = termamount;
            //        }
            //        else if (WebApp.nwobjectText("idvallugFinancingType").ToUpper() == "DEF")
            //        {
            //            //12.14.2017 add get Monthly
            //            if (WebApp.nwobjectDouble("txtSalesDiscountRate") == 0.00)
            //                dr["MonthlyPayment"] = Parser.ParseDouble(dr_details[SPR_PaymentTermDetails_MonthlyDP].ToString());
            //            else
            //                dr["MonthlyPayment"] = dal.getMonthly(termamount / totalnoofpayments);

            //            js.makeValueText("#txtMonthlyAmortization", Parser.ParseDouble(dr_details[SPR_PaymentTermDetails_MonthlyDP]).ToString("#,##0.00"));
            //        }
            //        else
            //        {

            //            //Fixed Interest
            //            if (WebApp.nwobjectBool("chkFixedInterest"))
            //            {
            //                if (dr_details[SPR_PaymentTermDetails_PaymentCategoryCode].ToString().ToUpper() == "RESRV")
            //                {
            //                    dr["MonthlyPayment"] = WebApp.nwobjectDouble("ReservationAmount");
            //                    dr["TermAmount"] = WebApp.nwobjectDouble("ReservationAmount");
            //                }
            //                else
            //                {
            //                    dr["MonthlyPayment"] = dal.getMonthly((WebApp.nwobjectDouble("NTCP") + (WebApp.nwobjectDouble("NTCP") * ((WebApp.nwobjectDouble("txtInterestRate") / 100) / 12 * Parser.ParseDouble(dtTerm.Rows[0]["balterm"]))) -
            //                    WebApp.nwobjectDouble("ReservationAmount")) / (Parser.ParseDouble(dtTerm.Rows[0]["dpterm"]) + Parser.ParseDouble(dtTerm.Rows[0]["balterm"])));

            //                    monthlydp = dal.getMonthly((WebApp.nwobjectDouble("NTCP") + (WebApp.nwobjectDouble("NTCP") * ((WebApp.nwobjectDouble("txtInterestRate") / 100) / 12 * Parser.ParseDouble(dtTerm.Rows[0]["balterm"]))) -
            //                    WebApp.nwobjectDouble("ReservationAmount")) / (Parser.ParseDouble(dtTerm.Rows[0]["dpterm"]) + Parser.ParseDouble(dtTerm.Rows[0]["balterm"])));

            //                    //js.ADD($"monthlDP='{dal.getMonthly(termamount/ totalnoofpayments)}'");
            //                    js.makeValueText("#txtMonthlyDP", monthlydp.ToString("#,##0.00"));
            //                    js.makeValueText("#txtMonthlyAmortization", monthlydp.ToString("#,##0.00"));
            //                }
            //            }
            //            else
            //            {
            //                //if (dr_details[SPR_PaymentTermDetails_PaymentCategoryCode].ToString().ToUpper() == "BALANC")
            //                //  {
            //                //      if (totalnoofpayments == 1)
            //                //          dr["MonthlyPayment"] = termamount;
            //                //      else
            //                //          dr["MonthlyPayment"] = Parser.ParseDouble(dal.getPMT(termamount, totalnoofpayments, annualrate));
            //                //  }



            //                if (dr_details[SPR_PaymentTermDetails_PaymentCategoryCode].ToString().ToUpper() == "RESRV")
            //                {
            //                    dr["MonthlyPayment"] = WebApp.nwobjectDouble("ReservationAmount");
            //                    dr["TermAmount"] = WebApp.nwobjectDouble("ReservationAmount");
            //                }
            //                else if (dr_details[SPR_PaymentTermDetails_PaymentCategoryCode].ToString().ToUpper() == "DOWNP")
            //                {
            //                    //if (dr_details[SPR_PaymentTermDetails_PaymentCategoryCode].ToString().ToUpper() == "DOWNP" && annualrate > 0.00)
            //                    //{
            //                    //    dr["MonthlyPayment"] = Parser.ParseDouble(dal.getPMT(termamount, totalnoofpayments, annualrate));
            //                    //}
            //                    //else

            //                    if (WebApp.nwobjectDouble("txtSalesDiscountRate") == 0.00)
            //                    {
            //                        dr["MonthlyPayment"] = Parser.ParseDouble(dr_details[SPR_PaymentTermDetails_MonthlyDP].ToString());
            //                        monthlydp = Parser.ParseDouble(dr_details[SPR_PaymentTermDetails_MonthlyDP].ToString());
            //                    }
            //                    else
            //                    {
            //                        dr["MonthlyPayment"] = dal.getMonthly(termamount / totalnoofpayments);
            //                        monthlydp = dal.getMonthly(termamount / totalnoofpayments);
            //                    }
            //                    //js.ADD($"monthlDP='{dal.getMonthly(termamount/ totalnoofpayments)}'");
            //                    js.makeValueText("#txtMonthlyDP", monthlydp.ToString("#,##0.00"));
            //                }
            //                else if (dr_details[SPR_PaymentTermDetails_PaymentCategoryCode].ToString().ToUpper() == "BALANC")
            //                {
            //                    //12.14.2017 -convert to 5 and 10
            //                    if (WebApp.nwobjectDouble("txtSalesDiscountRate") == 0.00)
            //                    {
            //                        dr["MonthlyPayment"] = Parser.ParseDouble(dr_details[SPR_PaymentTermDetails_MonthlyDP].ToString());
            //                        monthlybal = Parser.ParseDouble(dr_details[SPR_PaymentTermDetails_MonthlyDP].ToString());
            //                    }
            //                    else
            //                    {
            //                        dr["MonthlyPayment"] = dal.getMonthly(Parser.ParseDouble(dal.getPMT(termamount, totalnoofpayments, annualrate)));
            //                        monthlybal = dal.getMonthly(Parser.ParseDouble(dal.getPMT(termamount, totalnoofpayments, annualrate)));
            //                    }

            //                    js.makeValueText("#txtMonthlyAmortization", monthlybal.ToString("#,##0.00"));
            //                }
            //            }
            //        }

            //        dr["TermPeriodMonths"] = totalnoofpayments; //termperiod;
            //        dr["InterestRate"] = annualrate;
            //        dr["PenaltyRate"] = penaltyrate;
            //        dr["FinancingTypeCode"] = dr_details[SPR_PaymentTermDetails_FinancingTypeCode].ToString();

            //        dr["Recuser"] = based.SecurityAccess.RecUser;
            //        dr["Rownum"] = rownum;

            //        dr["PaymentCategory"] = dr_details[SPR_PaymentTermDetails_PaymentCategoryCode].ToString();



            //        if (dr_details[SPR_PaymentTermDetails_PaymentCategoryCode].ToString().ToUpper() == "RESRV")
            //        {
            //            reservCount++;
            //            dr["PaymentCount"] = reservCount;
            //            dr["StartDate"] = WebApp.nwobjectText("ReservationDate");
            //            dr["EndDate"] = WebApp.nwobjectText("ReservationDate");
            //        }
            //        else if (dr_details[SPR_PaymentTermDetails_PaymentCategoryCode].ToString().ToUpper() == "DOWNP")
            //        {
            //            if (firstdp == false)
            //            {
            //                startdatedp = WebApp.nwobjectText("DPStartDate").ToString();
            //                dr["StartDate"] = startdatedp;
            //                //dr["EndDate"] = dal.GetEndDate(startdatedp, termperiod.ToString());
            //                dr["EndDate"] = dal.GetEndDate(startdatedp, totalnoofpayments.ToString());
            //                startdatedp = dal.GetBalanceDate(startdatedp, totalnoofpayments.ToString());//+1 to the last enddate
            //                firstdp = true;
            //            }
            //            else
            //            {
            //                dr["StartDate"] = startdatedp;
            //                dr["EndDate"] = dal.GetEndDate(startdatedp, totalnoofpayments.ToString());
            //                startdatedp = dal.GetBalanceDate(startdatedp, totalnoofpayments.ToString());//+1 to the last enddate
            //            }

            //            dpCount++;
            //            dr["PaymentCount"] = dpCount;
            //        }
            //        else if (dr_details[SPR_PaymentTermDetails_PaymentCategoryCode].ToString().ToUpper() == "BALANC")
            //        {
            //            //if (startdatedp == string.Empty)
            //            //{
            //            //    startdatedp = WebApp.nwobjectText("ReservationDate");
            //            //    dr["StartDate"] = WebApp.nwobjectText("ReservationDate");
            //            //}
            //            startdatedp= WebApp.nwobjectText("txtBalStartDate");
            //            dr["StartDate"] = startdatedp;
            //            //dr["StartDate"] = WebApp.nwobjectText("txtBalStartDate");
            //            dr["EndDate"] = dal.GetEndDate(startdatedp, totalnoofpayments.ToString());
            //            startdatedp = dal.GetBalanceDate(startdatedp, totalnoofpayments.ToString());//+1 to the last enddate
            //            balCount++;
            //            dr["PaymentCount"] = balCount;
            //        }
            //        else
            //        {
            //            if (dr_details[SPR_PaymentTermDetails_PaymentCategoryCode].ToString().ToUpper() == "SPOT")
            //                startdatedp = WebApp.nwobjectText("DPStartDate").ToString(); //WebApp.nwobjectText("ReservationDate").ToString();

            //            dr["StartDate"] = startdatedp;
            //            dr["EndDate"] = dal.GetEndDate(startdatedp, totalnoofpayments.ToString());

            //            startdatedp = dal.GetBalanceDate(startdatedp, totalnoofpayments.ToString());//+1 to the last enddate
            //            spotCount++;
            //            dr["PaymentCount"] = spotCount;
            //        }

            //        if (WebApp.nwobjectBool("chkFixedInterest"))
            //        {
            //            js.makeValueText("#txtFixedInterest",((Parser.ParseDouble(WebApp.nwobjectDouble("txtTCP")) * ((Parser.ParseDouble(dtPaymentTerm.Rows[0]["AnnualRate"]) / 100) / 12))* Parser.ParseDouble(dtPaymentTerm.Rows[0]["TotalNoPayments"])/ Parser.ParseDouble(dtPaymentTerm.Rows[0]["TotalNoPayments"])).ToString("#,##0.00"));
            //        }

            //        dtLIN.Rows.Add(dr);
            //        dtLIN.AcceptChanges();
            //        rownum++;
            //    }
            //}
            return dtLIN;
        }


        private DataTable LoadHoldforReservationEntryLIN()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadHoldforReservationEntryLIN();
            #endregion

            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridUnitDetailsCon"));
            UnitCodeList = string.Empty;
            foreach (DataRow dr_details in dt.Rows)
            {
                if (dr_details[SPR_UnitDetails_UnitCode - 1].ToString() != string.Empty)
                {
                    DataRow dr = dtLIN.NewRow();
                    dr["TransactionNo"] = WebApp.nwobjectText("txtReservationControlNo");
                    dr["CategoryCode"] = dr_details[SPR_UnitDetails_Category - 1].ToString();
                    dr["UnitCode"] = dr_details[SPR_UnitDetails_UnitCode - 1].ToString();
                    dr["UnitType"] = dr_details[SPR_UnitDetails_InventoryTypeCode - 1].ToString();
                    dr["UnitClass"] = dr_details[SPR_UnitDetails_InventoryClassCode - 1].ToString();
                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                }
            }
            return dtLIN;
        }

        private DataTable LoadHoldforReservationPaymentTermDetails(DataTable PaymentTermLIN)
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadHoldforReservationPaymentTermDetails();
            #endregion




            foreach (DataRow dr_details in PaymentTermLIN.Rows)
            {


                string x = dr_details["B"].ToString();

                if (dr_details["B"].ToString() != string.Empty)
                {

                    DataRow dr = dtLIN.NewRow();
                    dr["TransactionNo"] = WebApp.nwobjectText("txtReservationControlNo");
                    dr["Category"] = dr_details["B"].ToString();
                    dr["PaymentTerm"] = dr_details["C"].ToString();
                    dr["ContractRate"] = Parser.ParseDouble(dr_details["E"].ToString());

                    dr["TotalLotPrice"] = Parser.ParseDouble(dr_details["F"].ToString());

                    dr["MiscInstallment"] = Parser.ParseDouble(dr_details["G"].ToString());
                    dr["SalesDisc"] = Parser.ParseDouble(dr_details["I"].ToString());
                    dr["TCP"] = Parser.ParseDouble(dr_details["H"].ToString());
                    dr["DPDisc"] = Parser.ParseInt(dr_details["J"].ToString());
                    dr["DPDiscRate"] = Parser.ParseDouble(dr_details["K"].ToString());
                    dr["DPDiscAmount"] = Parser.ParseDouble(dr_details["L"].ToString());
                    dr["Ntcp"] = Parser.ParseDouble(dr_details["M"].ToString());
                    dr["NoOfPayments"] = Parser.ParseDouble(dr_details["N"].ToString());
                    dr["Monthly"] = Parser.ParseDouble(dr_details["O"].ToString());


                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                }
            }
            return dtLIN;
        }



        private DataTable LoadHoldforReservationPaymentTermDetailsForAmortization(DataTable PaymentTermLIN)
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadHoldforReservationPaymentTermDetailsforAmortization();
            #endregion




            foreach (DataRow dr_details in PaymentTermLIN.Rows)
            {


                string x = dr_details["B"].ToString();

                if (dr_details["B"].ToString() != string.Empty)
                {

                    DataRow dr = dtLIN.NewRow();

                    dr["Category"] = dr_details["B"].ToString();
                    dr["PaymentTerm"] = dr_details["C"].ToString();
                    dr["Monthly"] = Parser.ParseDouble(dr_details["O"].ToString());
                    dr["StartDate"] = dr_details["R"].ToString() == "" ? (object)DBNull.Value : dr_details["R"].ToString();
                    dr["Interest"] = Parser.ParseDouble(dr_details["O"].ToString());
                    dr["PenaltyRate"] = Parser.ParseDouble(dr_details["O"].ToString());
                    dr["StartDate"] = dr_details["R"].ToString() == "" ? (object)DBNull.Value : dr_details["R"].ToString();
                    dr["EndDate"] = dr_details["S"].ToString() == "" ? (object)DBNull.Value : dr_details["S"].ToString();




                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                }
            }
            return dtLIN;
        }


   
        private DataTable LoadHoldforReservationAddOns(DataTable dtAddOns)
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadHoldforReservationAddOns();
            #endregion



            int i = 1;
            foreach (DataRow dr_details in dtAddOns.Rows)
            {
                if (dr_details["A"].ToString() != string.Empty)
                {
                    DataRow dr = dtLIN.NewRow();
                    dr["TransactionNo"] = WebApp.nwobjectText("txtReservationControlNo");
                    dr["Category"] = dr_details["A"].ToString();
                    dr["AddOnItem"] = dr_details["C"].ToString();
                    dr["Rowid"] = i;
                    dr["Qty"] = Parser.ParseDouble(dr_details["E"].ToString());
                    dr["UOM"] = dr_details["F"].ToString();

                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                    i++;
                }
            }
            return dtLIN;
        }


        private DataTable LoadHoldforRefBaseAddons(DataTable dtRefBase)
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadHoldforRefBaseAddons();
            #endregion



            int i = 1;
            foreach (DataRow dr_details in dtRefBase.Rows)
            {
                if (dr_details["A"].ToString() != string.Empty)
                {

                    DataRow dr = dtLIN.NewRow();
                    dr["ReservationControlNo"] = WebApp.nwobjectText("txtReservationControlNo");
                    dr["refHoldingNo"] = WebApp.nwobjectText("new_txtRefHoldingNo");
                    dr["UnitCodeHdr"] = WebApp.nwobjectText("new_txtUniCode");
                    dr["UnitCodeLin"] = dr_details["A"].ToString();
                    dr["RowNo"] = i;


                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                    i++;
                }
            }
            return dtLIN;
        }

        private DataTable LoadHoldforReservationInsuranceHdr()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadHoldforReservationInsuranceHdr();
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["TransactionNo"] = WebApp.nwobjectText("txtReservationControlNo");
            dr["InsuranceCode"] = WebApp.nwobjectText("ddtxtInsuranceCompany");
            dr["CoBorrowerCode"] = WebApp.nwobjectText("txtCoBorrower");
            dr["LoanAmount"] = WebApp.nwobjectDouble("txtLoanAmount");
            dr["LoanAmount"] = WebApp.nwobjectDouble("txtLoanAmount");
            dr["LoanTerm"] = WebApp.nwobjectDouble("txtLoanTerm");
            dr["MaturityDate"] = ValidateDate(WebApp.nwobjectText("txtMaturityDate").ToString()) ? WebApp.nwobjectText("txtMaturityDate").ToString() : (object)DBNull.Value;
            dr["IsAboveNel"] = WebApp.nwobjectBool("radioAboveNel") ? 1 : 0;
            dr["IsYesNo"] = WebApp.nwobjectBool("radioYes") ? 1 : 0;
            dr["RecUser"] = based.SecurityAccess.RecUser;
            dr["ModUser"] = based.SecurityAccess.RecUser;
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion

            return dtHDR;
        }

        private DataTable LoadHoldforReservationInsuranceLin()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadHoldforReservationInsuranceLin();
            #endregion

            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridInsuranceCon"));

            foreach (DataRow dr_details in dt.Rows)
            {
                string ID =
                    dr_details[SPR_INSURANCE_SECONDARY_BENEFICIARIES - 1].ToString() +
                    dr_details[SPR_INSURANCE_DATEOFBIRTH - 1].ToString() +
                    dr_details[SPR_INSURANCE_PLACEOFBIRTH - 1].ToString() +
                    dr_details[SPR_INSURANCE_CITIZENSHIP_CODE - 1].ToString() +
                    dr_details[SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT - 1].ToString();

                if (ID != string.Empty)
                {
                    DataRow dr = dtLIN.NewRow();
                    dr["TransactionNo"] = WebApp.nwobjectText("txtReservationControlNo");
                    dr["SecondaryBeneficiaries"] = dr_details[SPR_INSURANCE_SECONDARY_BENEFICIARIES - 1].ToString();
                    dr["DateOfBirth"] = ValidateDate(dr_details[SPR_INSURANCE_DATEOFBIRTH - 1].ToString()) ? dr_details[SPR_INSURANCE_DATEOFBIRTH - 1].ToString() : (object)DBNull.Value;
                    dr["PlaceofBirth"] = dr_details[SPR_INSURANCE_PLACEOFBIRTH - 1].ToString();
                    dr["Citizenship"] = dr_details[SPR_INSURANCE_CITIZENSHIP_CODE - 1].ToString();
                    dr["RelationshipToTheApplicant"] = dr_details[SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT - 1].ToString();
                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                }
            }
            return dtLIN;
        }

        private DataTable LoadHoldforReservationStatement()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadHoldforReservationStatemment();

            #endregion

            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridStatementDetailCon"));
            foreach (DataRow dr_details in dt.Rows)
            {
                string ID = dr_details[SPR_STATEMENT_CODE - 1].ToString();

                if (ID != string.Empty)
                {
                    DataRow dr = dtLIN.NewRow();
                    dr["TransactionNo"] = WebApp.nwobjectText("txtReservationControlNo");
                    dr["StatementCode"] = dr_details[SPR_STATEMENT_CODE - 1].ToString();
                    dr["IsYes"] = Parser.ParseBool(dr_details[SPR_STATEMENT_YES - 1].ToString()) ? 1 : 0;
                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                }
            }
            return dtLIN;
        }

        private DataTable LoadHoldforReservationStatement2()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN.Columns.Add("StatementCode");
            dtLIN.Columns.Add("StatementDesc");
            dtLIN.Columns.Add("Yes");
            dtLIN.Columns.Add("No");
            dtLIN.Columns.Add("Remarks");

            #endregion

            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridStatementDetailCon"));
            foreach (DataRow dr_details in dt.Rows)
            {
                DataRow dr = dtLIN.NewRow();
                if (dr_details[SPR_STATEMENT_CODE].ToString() != "")
                {
                    dr["StatementCode"] = dr_details[SPR_STATEMENT_CODE].ToString();
                    dr["StatementDesc"] = dr_details[SPR_STATEMENT_STATEMENT].ToString();
                    dr["Yes"] = Parser.ParseBool(dr_details[SPR_STATEMENT_YES].ToString());
                    dr["No"] = Parser.ParseBool(dr_details[SPR_STATEMENT_NO].ToString());// ;/*Parser.ParseBool(dr_details[SPR_STATEMENT_NO].ToString())?"true":"false";*/
                    dr["Remarks"] = dr_details[SPR_STATEMENT_REMARKS].ToString();
                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                }
            }
            return dtLIN;
        }

        private DataTable LoadHoldforReservationDiscount(DataTable dtDiscount)
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadHoldforReservationDiscount();
            #endregion

            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridDiscountCon"));

            int rownum = 0;


            foreach (DataRow dr_details in dtDiscount.Rows)
            {
                rownum++;
                if (dr_details["A"].ToString() != string.Empty)
                {
                    DataRow dr = dtLIN.NewRow();
                    dr["TransactionNo"] = WebApp.nwobjectText("txtReservationControlNo");
                    dr["DiscountCode"] = dr_details["A"].ToString();
                    dr["DiscountRate"] = dr_details["C"].ToString();
                    dr["BasisOfDiscount"] = dr_details["D"].ToString();
                    dr["DiscountApplication"] = dr_details["E"].ToString();
                    dr["DiscountAmount"] = Parser.ParseDouble(dr_details["F"].ToString());
                    dr["DiscountAmt_SP"] = Parser.ParseDouble(dr_details["G"].ToString());
                    dr["DiscountAmount_MSC"] = Parser.ParseDouble(dr_details["H"].ToString());
                    dr["rowNum"] = rownum;
                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                }
            }
            return dtLIN;
        }

        //private DataTable LoadHoldforReservationMiscellaneous()
        //{
        //    #region don't change
        //    DataTable dtLIN = new DataTable();
        //    dtLIN = dal.LoadHoldforReservationMiscellaneous();
        //    #endregion

        //    DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridMiscDetailsCon"));

        //    foreach (DataRow dr_details in dt.Rows)
        //    {
        //        if (dr_details[SPR_PaymentTermDetails_PaymentCategoryCode - 1].ToString() != string.Empty)
        //        {
        //            DataRow dr = dtLIN.NewRow();
        //            dr["TransactionNo"] = WebApp.nwobjectText("txtReservationControlNo");
        //            dr["MiscCode"] = dr_details[SPR_MiscellaneousDetails_MiscCode - 1].ToString();
        //            dr["MiscType"] = dr_details[SPR_MiscellaneousDetails_MiscTypeCode - 1].ToString();
        //            dr["Amount"] = Parser.ParseDouble(dr_details[SPR_MiscellaneousDetails_Amount - 1].ToString());
        //            dr["IsVatable"] = dr_details[SPR_MiscellaneousDetails_Vatable - 1].ToString();
        //            dr["IsInterestBearing"] = dr_details[SPR_MiscellaneousDetails_InterestBearing - 1].ToString();
        //            dr["BasePrice"] = dr_details[SPR_MiscellaneousDetails_PercentofBasePrice - 1].ToString();
        //            dr["DueDate"] = ValidateDate(dr_details[SPR_MiscellaneousDetails_DueDate - 1].ToString()) ?
        //                dr_details[SPR_MiscellaneousDetails_DueDate - 1].ToString() : (object)DBNull.Value;
        //            dtLIN.Rows.Add(dr);
        //            dtLIN.AcceptChanges();
        //        }
        //    }
        //    return dtLIN;
        //}
        private bool ValidateDate(string bGetDate)
        {
            try { Convert.ToDateTime(bGetDate); return true; }
            catch { return false; }
        }


        private DataTable LoadHoldforReservationFreebies()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadHoldforReservationFreebies();
            #endregion

            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridFreeBiesPromoCon"));

            foreach (DataRow dr_details in dt.Rows)
            {
                //if (dr_details[SPR_PaymentTermDetails_PaymentCategoryCode - 1].ToString() != string.Empty)
                //{
                DataRow dr = dtLIN.NewRow();
                dr["TransactionNo"] = WebApp.nwobjectText("txtReservationControlNo");
                dr["ItemCode"] = dr_details[SPR_FreebiesPromoIncentives_ItemCode - 1].ToString();
                dr["Qty"] = Parser.ParseDouble(dr_details[SPR_FreebiesPromoIncentives_Qty - 1].ToString());
                dr["PriceVatIn"] = Parser.ParseDouble(dr_details[SPR_FreebiesPromoIncentives_PriceVatIn - 1].ToString());
                dr["Amount"] = Parser.ParseDouble(dr_details[SPR_FreebiesPromoIncentives_Amount - 1].ToString());
                dr["ReceiverType"] = dr_details[SPR_FreebiesPromoIncentives_ReceiverTypeCode - 1].ToString();
                dr["Receiver"] = dr_details[SPR_FreebiesPromoIncentives_ReceiverCode - 1].ToString();
                dtLIN.Rows.Add(dr);
                dtLIN.AcceptChanges();
                //}
            }
            return dtLIN;
        }

        private DataTable LoadHoldforReservationCoBuyer(DataTable DTcoBuyer)
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadHoldforReservationCoBuyer();
            #endregion


            int rownum = 0;

            foreach (DataRow dr_details in DTcoBuyer.Rows)
            {
                rownum++;
                if (dr_details["A"].ToString() != string.Empty)
                {
                    DataRow dr = dtLIN.NewRow();
                    dr["TransactionNo"] = WebApp.nwobjectText("txtReservationControlNo");

                    dr["CoBuyerName"] = dr_details["A"].ToString();
                    dr["DateofBirth"] = ValidateDate(dr_details["B"].ToString()) ? dr_details["B"].ToString() : (object)DBNull.Value;
                    dr["Gender"] = dr_details["D"].ToString();
                    dr["RelationshipCode"] = dr_details["E"].ToString();
                    dr["tinNo"] = dr_details["F"].ToString();
                    dr["Rownum"] = rownum;
                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();

                }
            }
            return dtLIN;
        }

        private DataTable LoadHoldforReservationEntry_Amortization()
        {
            #region don't change
            DataTable dtLIN = new DataTable();
            dtLIN = dal.LoadHoldforReservationEntry_Amortization();

            DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridAmortizationCon"));

            foreach (DataRow dr_details in dt.Rows)
            {
                if (dr_details[SPR_Amortization_PaymentCatCode - 1].ToString() != string.Empty)
                {
                    DataRow dr = dtLIN.NewRow();
                    dr["TransactionNo"] = WebApp.nwobjectText("txtReservationControlNo");
                    //dr["period"] = dr_details[SPR_Amortization_PaymentNo - 1].ToString();
                    //dr["PaymentCategory"] = dr_details[SPR_Amortization_PaymentCatCode - 1].ToString();
                    //dr["baseline"] = dr_details[SPR_Amortization_DueDate - 1].ToString();
                    //dr["pmt"] = Parser.ParseDouble(dr_details[SPR_Amortization_TotalMonthlyPayment - 1].ToString());
                    //dr["monthlyamort"] = Parser.ParseDouble(dr_details[SPR_Amortization_MonthlyAmortization - 1].ToString());
                    //dr["interest"] = Parser.ParseDouble(dr_details[SPR_Amortization_Interest - 1].ToString());
                    //dr["Vatinterest"] = Parser.ParseDouble(dr_details[SPR_Amortization_InterestVat - 1].ToString());
                    //dr["principal"] = Parser.ParseDouble(dr_details[SPR_Amortization_Principal - 1].ToString());
                    //dr["Vatprincipal"] = Parser.ParseDouble(dr_details[SPR_Amortization_PrincipalVat - 1].ToString());
                    //dr["principal_ob"] = Parser.ParseDouble(dr_details[SPR_Amortization_PrincipalOutstanding - 1].ToString());
                    //dr["monthlymisc"] = Parser.ParseDouble(dr_details[SPR_Amortization_MonthlyMisc - 1].ToString());
                    //dr["intmisc"] = Parser.ParseDouble(dr_details[SPR_Amortization_InterestMisc - 1].ToString());
                    //dr["intVatmisc"] = Parser.ParseDouble(dr_details[SPR_Amortization_InterestMiscVat - 1].ToString());
                    //dr["misc"] = Parser.ParseDouble(dr_details[SPR_Amortization_Miscellaneous - 1].ToString());
                    //dr["vatMisc"] = Parser.ParseDouble(dr_details[SPR_Amortization_VatOnMisc - 1].ToString());
                    //dr["miscob"] = Parser.ParseDouble(dr_details[SPR_Amortization_MiscOutstanding - 1].ToString());
                    //dr["totalob"] = Parser.ParseDouble(dr_details[SPR_Amortization_TotalOutstanding - 1].ToString());
                    //dr["periodNo"] = Parser.ParseDouble(dr_details[SPR_Amortization_PeriodNo - 1].ToString());

                    dtLIN.Rows.Add(dr);
                    dtLIN.AcceptChanges();
                }
            }
            return dtLIN;
            #endregion
        }

        //private DataTable LoadHoldforReservationEntry_TermDetails()
        //{
        //    #region don't change
        //    DataTable dtLIN = new DataTable();
        //    dtLIN = dal.LoadHoldforReservationEntry_TermDetails();

        //    DataTable dt = WebApp.nwGridData(WebApp.nwobjectText("nwGridTermDetailsCon"));




        //    foreach (DataRow dr_details in dt.Rows)
        //    {
        //        if (dr_details[SPR_Amortization_PaymentCatCode - 1].ToString() != string.Empty)
        //        {
        //            DataRow dr = dtLIN.NewRow();
        //            dr["TransactionNo"] = WebApp.nwobjectText("txtReservationControlNo");
        //            dr["PaymentTerm"] = dr_details[SPR_TermDetails_PaymentTerm_Code - 1].ToString();
        //            dr["ContractRate"] = dr_details[SPR_TermDetails_ContractRate - 1].ToString();
        //            dr["TermAmount"] = dr_details[SPR_TermDetails_TermAmount - 1].ToString();
        //            dr["TermDisc"] = dr_details[SPR_TermDetails_Discount - 1].ToString();
        //            dr["MonthlyPayment"] = dr_details[SPR_TermDetails_MonthlyPayment - 1].ToString();
        //            dr["TermPeriodMonths"] = Parser.ParseInt(dr_details[SPR_TermDetails_TermPeriodMonths - 1].ToString());
        //            dr["InterestRate"] = dr_details[SPR_TermDetails_InterestRate - 1].ToString();
        //            dr["PenaltyRate"] = dr_details[SPR_TermDetails_PenaltyRate - 1].ToString();
        //            dr["FinancingTypeCode"] = dr_details[SPR_TermDetails_FinancingTypeCode - 1].ToString();
        //            dr["StartDate"] = ValidateDate(dr_details[SPR_TermDetails_StartDate - 1].ToString()) ? dr_details[SPR_TermDetails_StartDate - 1].ToString() : (object)DBNull.Value;//dr_details[SPR_TermDetails_StartDate - 1].ToString();
        //            dr["EndDate"] = ValidateDate(dr_details[SPR_TermDetails_EndDate - 1].ToString()) ? dr_details[SPR_TermDetails_EndDate - 1].ToString() : (object)DBNull.Value;//dr_details[SPR_TermDetails_EndDate - 1].ToString();
        //            dr["PaymentCategory"] = dr_details[SPR_TermDetails_PaymentCategory - 1].ToString();

        //            dtLIN.Rows.Add(dr);
        //            dtLIN.AcceptChanges();
        //        }
        //    }
        //    return dtLIN;
        //    #endregion
        //}

        private DataTable LoadHoldforReservationEntry_ClientInformation()
        {
            #region don't change
            DataTable dtHDR = new DataTable();
            dtHDR = dal.LoadHoldforReservationEntry_ClientInformation();
            #endregion

            DataRow dr = dtHDR.NewRow();
            dr["transactionNo"] = WebApp.nwobjectText("txtReservationControlNo");
            dr["LotUnitPrice"] = WebApp.nwobjectDouble("AmortLotUnitPrice");
            dr["SalesDisc"] = WebApp.nwobjectDouble("AmortSalesDisc");
            dr["NetLotUnitPrice"] = WebApp.nwobjectDouble("AmortNetLotUnitPrice");
            dr["MiscMCF"] = WebApp.nwobjectDouble("AmortMiscMCF");
            dr["TotalContractPrice"] = WebApp.nwobjectDouble("AmortTCP");
            dr["DpDisc"] = WebApp.nwobjectDouble("AmortDPDisc");
            dr["Ntcp"] = WebApp.nwobjectDouble("AmortNTCP");
            dr["Downpayment"] = WebApp.nwobjectDouble("AmortDP");
            dr["Balance"] = WebApp.nwobjectDouble("AmortBal");
            dr["Reservation"] = WebApp.nwobjectDouble("AmortReserv");
            dr["ReservationDate"] = ValidateDate(WebApp.nwobjectText("AmortReservDate")) ? WebApp.nwobjectText("AmortReservDate") : (object)DBNull.Value;
            dtHDR.Rows.Add(dr);

            #region don't change
            dtHDR.AcceptChanges();
            #endregion
            return dtHDR;
        }


        private void Main_Load()
        {
            if (based.isInterface == true) dal.UpdateVersion();
            GenerateGrid(false);
            DataTable dt = dal.GetStartAmortDate();
            js.ADD($"AmortStartDate={DataTableToJSON(dt)};");
            js.ADD($"discountBasis='{dal.getDiscountBasis()}'");

            js.ADD($"$portal().loadParameter_nwUnitCode();");
            LoadCombo();
            loadPaymentMethod();
        }
        private void loadPaymentMethod()
        {
            DataTable dt = dal.loadPaymentMethod();
            if (dt.Rows.Count > 0)
                js.ADD($"paymentMethod={DataTableToJSON(dt)}");
        }
        private void RefreshData()
        {
            js.ADD("ClearFields(0);");
            js.ADD("func_Toolbox_Clear();");
            js.ADD("nwParameter_Add('nwUnitCode',nwUnitCode);");
            js.ADD("nwParameter_Add('nwDocno',nwDocno);");
            js.ADD("func_ToolboxData(\"#noah-webui-Toolbox-Grid\", \"toolbox\")"); // goto: getToolBoxData
            js.ADD("RefreshData()");
        }

        public void GenerateGrid(bool isIntialize)
        {

       
            string Code = WebApp.nwobjectText("ReservationControlNo");
            CreateGridUnitDetails(Code, isIntialize);
            //js.ADD("$('#settingstabs').tabs({ active: 1 });");
            CreateGridPaymentTermDetails(Code, isIntialize);
            CreateGridAddons(Code, isIntialize);
            CreateGridDiscount(Code, isIntialize);
            //CreateGridMiscellaneousDetails(Code, isIntialize);
            //CreateGridFreebiesPromosIncentives(Code, isIntialize);           
            CreateGridCoBuyer(Code, isIntialize, false);
            //js.ADD("$('#settingstabs').tabs({ active: 0 });");
            //CreateGridInsurance(Code, isIntialize);
            js.ADD("$('.nwGridData').css({'min-height':'100%'})");

        }



        public void CreateGridUnitDetails(string ID, bool isInitialize)
        {
            string gridID = "nwGridUnitDetails";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();
            nwGridCon.Type = nwGridType.SpreadCanvas;

            int rowCnt = 0;
            int colCnt = SPR_UnitDetails_CrossReferenceCode;//maxcol
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
   
            nwGridCon.RowHeight(20);

            nwGridCon.PagerPerPage(50);
            nwGridCon.TableHeight(100);


            #region Column Title
            nwGridCon.nwobject(SPR_UnitDetails_Category - 1).ColumnName("CATEGORY");
            nwGridCon.nwobject(SPR_UnitDetails_Category - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_UnitDetails_UnitCode - 1).ColumnName("UNIT CODE");
            nwGridCon.nwobject(SPR_UnitDetails_UnitCode - 1).HeaderFieldRequired(true);

            nwGridCon.nwobject(SPR_UnitDetails_UnitDesc - 1).ColumnName("DESCRIPTION");
            nwGridCon.nwobject(SPR_UnitDetails_UOM - 1).ColumnName("UNIT OF MEASURE");
            nwGridCon.nwobject(SPR_UnitDetails_LotArea - 1).ColumnName("LOT AREA");
            nwGridCon.nwobject(SPR_UnitDetails_FloorArea - 1).ColumnName("FLOOR AREA");
            nwGridCon.nwobject(SPR_UnitDetails_InventoryTypeCode - 1).ColumnName("INVENTORY TYPE CODE");
            nwGridCon.nwobject(SPR_UnitDetails_InventoryType - 1).ColumnName("INVENTORY TYPE");
            nwGridCon.nwobject(SPR_UnitDetails_InventoryClassCode - 1).ColumnName("INVENTORY CLASS CODE");
            nwGridCon.nwobject(SPR_UnitDetails_InventoryClass - 1).ColumnName("INVENTORY CLASS");
            nwGridCon.nwobject(SPR_UnitDetails_Model - 1).ColumnName("MODEL");
            nwGridCon.nwobject(SPR_UnitDetails_RefHoldingNo - 1).ColumnName("REFERENCE HOLDING NO.");
            nwGridCon.nwobject(SPR_UnitDetails_CrossReferenceCode - 1).ColumnName("CROSS REFERENCE CODE");
            #endregion

            #region Column Width

            nwGridCon.nwobject(SPR_UnitDetails_InventoryClassCode - 1).Width(0);
            nwGridCon.nwobject(SPR_UnitDetails_InventoryTypeCode - 1).Width(0);
            #endregion

            #region Column Color
            nwGridCon.nwobject(SPR_UnitDetails_UnitCode - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_UnitDetails_UnitDesc - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_UnitDetails_UOM - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_UnitDetails_LotArea - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_UnitDetails_FloorArea - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_UnitDetails_InventoryClassCode - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_UnitDetails_InventoryType - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_UnitDetails_InventoryTypeCode - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_UnitDetails_InventoryClass - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_UnitDetails_Model - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_UnitDetails_RefHoldingNo - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_UnitDetails_CrossReferenceCode - 1).BackgroundColor("gainsboro");
            #endregion

            nwGridCon.nwobject(SPR_UnitDetails_LotArea - 1).TextAlign("Right");
            nwGridCon.nwobject(SPR_UnitDetails_FloorArea - 1).TextAlign("Right");

            #region Column Templates                       
            nwGridCon.nwobject(SPR_UnitDetails_Category - 1).Combo(dal.LoadCombo());
     
            #endregion

            #region Column Button
            #endregion

            if (isInitialize)
            {
                dt = dal.GetUnitDetailsTab(ID);
                nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);
            }
            else
            {
                nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");



            nwGridCon.varSpreadBook = "nwGridMainCon_Book_UnitDetails";
            nwGridCon.varSpreadSheet = "nwGridMainCon_Sheet_UnitDetails";
            js.ADD(nwGridCon.createTable());



        }




    

        #region Payment Term Details
        public void CreateGridPaymentTermDetails(string Code, bool isInitialize)
        {
            string gridID = "nwGridPaymentTermDetails";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();
            nwGridCon.Type = nwGridType.SpreadCanvas;
            int rowCnt = 5;

            int colCnt = SPR_PaymentTermDetails_DPDiscMisc;
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(5);
            nwGridCon.TableHeight(300);
            nwGridCon.RowHeight(25);


            nwGridCon.buttonDelete = true;
            nwGridCon.buttonInsert = true;

      

            #region Column Title

            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentCategory - 1).ColumnName("PAYMENT CATEGORY code");
            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentCategory - 1).Width(0);


            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentCategoryDesc - 1).LookUp("lugCategory", true);
            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentCategoryDesc - 1).Enabled(true);
            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentCategoryDesc - 1).HeaderFieldRequired(true);

            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentCategoryDesc - 1).ColumnName("PAYMENT CATEGORY");


            //nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentCategory - 1).ColumnName("PAYMENT CATEGORY");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentCategory - 1).HeaderFieldRequired(true);
            //nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentCategory - 1).Combo(combodt, "clsCategory");
            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentTermCode - 1).LookUp("lugPaymentCategory", true);
            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentTermCode - 1).ColumnName("PAYMENT TERM");
            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentTermCode - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentTermCode - 1).Enabled(true);

            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentTermDesc - 1).ColumnName("PAYMENT TERM DETAILS");
            nwGridCon.nwobject(SPR_PaymentTermDetails_ContractRate - 1).ColumnName("CONTRACT RATE");
            nwGridCon.nwobject(SPR_PaymentTermDetails_TermAmount - 1).ColumnName("TERM AMOUNT");
            nwGridCon.nwobject(SPR_PaymentTermDetails_TermAmount - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_PaymentTermDetails_MiscInstallment - 1).ColumnName("MISCELLANEOUS (INSTALLMENT)");
            nwGridCon.nwobject(SPR_PaymentTermDetails_ContractAmount - 1).ColumnName("CONTRACT AMOUNT");
            nwGridCon.nwobject(SPR_PaymentTermDetails_SalesDiscount - 1).ColumnName("SALES DISCOUNT");
            nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscount - 1).ColumnName("DP DISCOUNT");
            nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountRate - 1).ColumnName("DP DISCOUNT RATE");
            nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountAmount - 1).ColumnName("DP DISCOUNT AMOUNT");
            nwGridCon.nwobject(SPR_PaymentTermDetails_NetContractPrice - 1).ColumnName("NET CONTRACT PRICE");
            nwGridCon.nwobject(SPR_PaymentTermDetails_NoOfPayments - 1).ColumnName("TOTAL NO. OF PAYMENTS");
            nwGridCon.nwobject(SPR_PaymentTermDetails_MonthlyPayment - 1).ColumnName("MONTHLY PAYMENT");

            nwGridCon.nwobject(SPR_PaymentTermDetails_InterestRate - 1).ColumnName("Interest Rate");
            nwGridCon.nwobject(SPR_PaymentTermDetails_PenaltyRate - 1).ColumnName("Penalty Rate");
            nwGridCon.nwobject(SPR_PaymentTermDetails_StartDate - 1).ColumnName("Start Date");
            nwGridCon.nwobject(SPR_PaymentTermDetails_EndDate - 1).ColumnName("End Date");
            nwGridCon.nwobject(SPR_PaymentTermDetails_MiscellaneousDate - 1).ColumnName("Miscellaneous Date");
            nwGridCon.nwobject(SPR_PaymentTermDetails_MiscellaneousType - 1).ColumnName("Miscellaneous Type");
            nwGridCon.nwobject(SPR_PaymentTermDetails_AllocationType - 1).ColumnName("Allocation Type");
            nwGridCon.nwobject(SPR_PaymentTermDetails_MiscellaneousAmount - 1).ColumnName("Miscellaneous Amount");
            nwGridCon.nwobject(SPR_PaymentTermDetails_Ordering - 1).ColumnName("Ordering");
            nwGridCon.nwobject(SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1).ColumnName("MonthlyWithoutMisc");
            nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscPrin - 1).ColumnName("dpDiscPrin");
            nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscMisc - 1).ColumnName("dpDiscMisc");
            #endregion
            nwGridCon.BodyFontFamily = "Century Gothic";
            nwGridCon.HeaderFontFamily = "Century Gothic";
            #region TextAlign
            nwGridCon.nwobject(SPR_PaymentTermDetails_InterestRate - 1).TextAlign("Right");
            nwGridCon.nwobject(SPR_PaymentTermDetails_PenaltyRate - 1).TextAlign("Right");
            nwGridCon.nwobject(SPR_PaymentTermDetails_Ordering - 1).TextAlign("Right");
            nwGridCon.nwobject(SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1).TextAlign("Right");

            #endregion

            #region Column Width
            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentTermCode - 1).Width(0);
            //nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentTermDesc - 1).Width(0);
            nwGridCon.nwobject(SPR_PaymentTermDetails_ContractRate - 1).Width(0);
            nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountRate - 1).Width(0);
            nwGridCon.nwobject(SPR_PaymentTermDetails_InterestRate - 1).Width(0);
            nwGridCon.nwobject(SPR_PaymentTermDetails_PenaltyRate - 1).Width(0);
            nwGridCon.nwobject(SPR_PaymentTermDetails_StartDate - 1).Width(0);
            nwGridCon.nwobject(SPR_PaymentTermDetails_EndDate - 1).Width(0);
            nwGridCon.nwobject(SPR_PaymentTermDetails_MiscellaneousDate - 1).Width(0);
            nwGridCon.nwobject(SPR_PaymentTermDetails_MiscellaneousType - 1).Width(0);
            nwGridCon.nwobject(SPR_PaymentTermDetails_AllocationType - 1).Width(0);
            nwGridCon.nwobject(SPR_PaymentTermDetails_MiscellaneousAmount - 1).Width(0);
            nwGridCon.nwobject(SPR_PaymentTermDetails_Ordering - 1).Width(0);
            nwGridCon.nwobject(SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1).Width(0);
            nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscPrin - 1).Width(0);
            nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscMisc - 1).Width(0);

            #endregion

            #region Column Color

            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentCategory - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentTermCode - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_PaymentTermDetails_PaymentTermDesc - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_ContractRate - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_TermAmount - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_MiscInstallment - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_ContractAmount - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_SalesDiscount - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscount - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountRate - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountAmount - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_NetContractPrice - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_NoOfPayments - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_MonthlyPayment - 1).BackgroundColor("gainsboro");

            nwGridCon.nwobject(SPR_PaymentTermDetails_InterestRate - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_PenaltyRate - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_StartDate - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_EndDate - 1).BackgroundColor("gainsboro");

            nwGridCon.nwobject(SPR_PaymentTermDetails_MiscellaneousDate - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_MiscellaneousType - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_AllocationType - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_MiscellaneousAmount - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_Ordering - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc - 1).BackgroundColor("gainsboro");

            #endregion

            #region Column Templates
            nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscount - 1).ObjectType("checkbox");
            // nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscount - 1).CheckBox(true, "chkDPDiscount");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_ContractRate - 1).Input();  
            //nwGridCon.nwobject(SPR_PaymentTermDetails_TermAmount - 1).Input();
            nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountRate - 1).Input("DiscountRate");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountRate - 1).Enabled(true);
            nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountAmount - 1).Input("DiscountAmount");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountAmount - 1).Enabled(true);



            //nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountRate - 1).InputCurrency("", 2, 100, true);
            //nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountAmount - 1).Input();
            //nwGridCon.nwobject(SPR_PaymentTermDetails_ContractRate - 1).Template("<input value='{" + (SPR_PaymentTermDetails_ContractRate - 1) + "}' class='txtContractRate' style='text-align:right;' disabled/>");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_TermAmount - 1).Template("<input value='{" + (SPR_PaymentTermDetails_TermAmount - 1) + "}' class='txtTermAmount' style='text-align:right;' disabled/>");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountRate - 1).Template("<input value='{" + (SPR_PaymentTermDetails_DPDiscountRate - 1) + "}'  class='SPR_PaymentTermDetails_DPDiscountRate' style='text-align:right;' disabled/>");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountAmount - 1).Template("<input value='{" + (SPR_PaymentTermDetails_DPDiscountAmount - 1) + "}'  class='txtDPDiscountAmount' style='text-align:right;' disabled/>");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_ContractRate - 1).TextAlign("right");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_TermAmount - 1).TextAlign("right");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_SalesDiscount - 1).TextAlign("right");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountAmount - 1).TextAlign("right");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_MiscInstallment - 1).TextAlign("right");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_NetContractPrice - 1).TextAlign("right");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_NoOfPayments - 1).TextAlign("right");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountAmount - 1).TextAlign("right");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_MonthlyPayment - 1).TextAlign("right");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_DPDiscountRate - 1).TextAlign("right");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_ContractAmount - 1).TextAlign("right");
            //nwGridCon.nwobject(SPR_PaymentTermDetails_MiscellaneousAmount - 1).TextAlign("right");
            #endregion

            #region Column Button
            nwGridCon.ButtonMenuAdd("btnPaymentTermGroup", "SELECT PAYMENT TERM GROUP");
            nwGridCon.ButtonMenuAdd("btnMiscellaneousDetails", "MISCELLANEOUS DETAILS");

            #endregion

            if (isInitialize)
            {
                dt = dal.GetPaymentTermDetailsTab(Code);
                nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);
            }
            else
            {
                nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            }


            nwGridCon.varSpreadBook = "nwGridMainCon_Book_PaymentTerm";
            nwGridCon.varSpreadSheet = "nwGridMainCon_Sheet_PaymentTerm";
            js.ADD(nwGridCon.createTable());


            js.ADD("disableFirstRow();");

            js.ADD("dpDiscountConditions_newspread();");


        }
        #endregion

        #region Addons
        public void CreateGridAddons(string Code, bool isInitialize)
        {
            string gridID = "nwGridAddOn";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();
            nwGridCon.Type = nwGridType.SpreadCanvas;
            //dt = dal.getDetails(WebApp.nwobjectText("txtID"));

            int rowCnt = 5;

            int colCnt = SPR_Addon_UOM;
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
            nwGridCon.TableHeight(300);
            nwGridCon.RowHeight(20);

            nwGridCon.buttonDelete = true;
            nwGridCon.buttonInsert = true;

            #region Column Title
            nwGridCon.nwobject(SPR_Addon_CategoryCode - 1).ColumnName("CATEGORY CODE");
            nwGridCon.nwobject(SPR_Addon_Category - 1).ColumnName("CATEGORY");
            nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).ColumnName("ADD-ON ITEMS");
            nwGridCon.nwobject(SPR_Addon_AddonItemDesc - 1).ColumnName("ADD-ON ITEM DESCRIPTION");
            nwGridCon.nwobject(SPR_Addon_Qty - 1).ColumnName("QUANTITY");
            nwGridCon.nwobject(SPR_Addon_UOMCode - 1).ColumnName("UOM CODE");
            nwGridCon.nwobject(SPR_Addon_UOM - 1).ColumnName("UNIT OF MEASURE");
            #endregion
            nwGridCon.BodyFontFamily = "Century Gothic";
            nwGridCon.HeaderFontFamily = "Century Gothic";

            #region Column Width
            nwGridCon.nwobject(SPR_Addon_CategoryCode - 1).Width(0);
            nwGridCon.nwobject(SPR_Addon_UOMCode - 1).Width(0);

            //nwGridCon.nwobject(SPR_Addon_Category - 1).Width(200);
            //nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).Width(150);
            //nwGridCon.nwobject(SPR_Addon_AddonItemDesc - 1).Width(200);
            #endregion

            #region Column Color
            nwGridCon.nwobject(SPR_Addon_Category - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_Addon_AddonItemDesc - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Addon_Qty - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Addon_UOM - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Addon_UOMCode - 1).BackgroundColor("gainsboro");

            //nwGridCon.nwobject(SPR_Addon_ItemGroupTypeDesc - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_UOM - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_Qty - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_PricePerUnitUOM - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_PriceVatIn - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_PriceVatEx - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_DiscountRate - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_DiscountAmount - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatIn - 1).BackgroundColor("white");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatEx - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Addon_CrossRefCode - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Addon_Qty - 1).TextAlign("Right");
            #endregion

            #region Column Templates



            nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).LookUp("lugAddOnItems", true);
            nwGridCon.nwobject(SPR_Addon_AddonItemCode - 1).Enabled(true);

            //nwGridCon.nwobject(SPR_Addon_Qty - 1).Template("<input value='{" + (SPR_Addon_Qty - 1) + "}' class='txt_SPR_Addon_Qty isNumber numC' style='text-align:right;'/>");
            //nwGridCon.nwobject(SPR_Addon_PricePerUnitUOM - 1).Template("<input value='{" + (SPR_Addon_PricePerUnitUOM - 1) + "}' class='txt_SPR_Addon_PricePerUnitUOM isNumber numC' style='text-align:right;'/>");
            //nwGridCon.nwobject(SPR_Addon_PriceVatIn - 1).Template("<input value='{" + (SPR_Addon_PriceVatIn - 1) + "}' class='txtSPR_Addon_PriceVatIn isNumber numC' style='text-align:right;'/>");
            //nwGridCon.nwobject(SPR_Addon_PriceVatEx - 1).Template("<input value='{" + (SPR_Addon_PriceVatEx - 1) + "}' class='txtSPR_Addon_PriceVatEx isNumber numC' style='text-align:right;'/>");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatIn - 1).Template("<input value='{" + (SPR_Addon_NetAddonPriceVatIn - 1) + "}' class='txt_SPR_Addon_NetAddonPriceVatIn isNumber numC' style='text-align:right;' maxlength=18  nwdp='2'/>");
            //nwGridCon.nwobject(SPR_Addon_NetAddonPriceVatEx - 1).Template("<input value='{" + (SPR_Addon_NetAddonPriceVatEx - 1) + "}' class='txt_SPR_Addon_NetAddonPriceVatEx isNumber numC' style='text-align:right;' maxlength=18  nwdp='2'/>");
            //nwGridCon.nwobject(SPR_Addon_DiscountRate - 1).Template("<input value='{" + (SPR_Addon_DiscountRate - 1) + "}' class='txt_SPR_Addon_DiscountRate isNumber numC' style='text-align:right;' maxlength=2  nwdp='2'/>");
            //nwGridCon.nwobject(SPR_Addon_DiscountAmount - 1).Template("<input value='{" + (SPR_Addon_DiscountAmount - 1) + "}' class='txt_SPR_Addon_DiscountAmount isNumber numC' style='text-align:right;' nwdp='2' disabled/>");
            //nwGridCon.nwobject(SPR_Addon_PriceVatIn - 1).TextAlign("right");

            #endregion

            #region Column Button
            #endregion

            if (isInitialize)
            {
                dt = dal.GetAddonTab(Code);
                nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);
                //LoadQuery(dt, nwGridCon);
            }
            else
            {
                nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");
        


            nwGridCon.varSpreadBook = "nwGridMainCon_Book_AddOns";
            nwGridCon.varSpreadSheet = "nwGridMainCon_Sheet_AddOns";
            js.ADD(nwGridCon.createTable());

     
            js.ADD("propAddOns();");
        }

        #endregion

        #region Discount
        public void CreateGridDiscount(string Code, bool isInitialize)
        {
            string gridID = "nwGridDiscount";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();
            nwGridCon.Type = nwGridType.SpreadCanvas;
            //dt = dal.getDetails(WebApp.nwobjectText("txtID"));

            int rowCnt = 5;

            int colCnt = SPR_Discount_DiscountMSC;
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
            nwGridCon.TableHeight(300);
            nwGridCon.RowHeight(20);

            nwGridCon.buttonDelete = true;
            //nwGridCon.buttonInsert = true;


            #region Column Title



            nwGridCon.nwobject(SPR_Discount_DiscountCode - 1).ColumnName("DISCOUNT CODE");
            nwGridCon.nwobject(SPR_Discount_DiscountType - 1).ColumnName("DISCOUNT TYPE");
            nwGridCon.nwobject(SPR_Discount_DiscountRate - 1).ColumnName("DISCOUNT RATE (%)");
            nwGridCon.nwobject(SPR_Discount_DiscountRate - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_Discount_BasisOfDiscount - 1).ColumnName("BASIS OF DISCOUNT");

            nwGridCon.nwobject(SPR_Discount_DiscountApp - 1).ColumnName("DISCOUNT APPLICATION");
            nwGridCon.nwobject(SPR_Discount_DiscountApp - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_Discount_DiscountAmt - 1).ColumnName("DISCOUNT AMOUNT");

            nwGridCon.nwobject(SPR_Discount_DiscountSP - 1).ColumnName("SELLING PRICE DISCOUNT VATEX");
            nwGridCon.nwobject(SPR_Discount_DiscountMSC - 1).ColumnName("MISCELLANEOUS DISCOUNT VATEX");
            nwGridCon.BodyFontFamily = "Century Gothic";
            nwGridCon.HeaderFontFamily = "Century Gothic";

            //nwGridCon.nwobject(SPR_Discount_Period - 1).ColumnName("Period");
            //nwGridCon.nwobject(SPR_Discount_From - 1).ColumnName("From");
            //nwGridCon.nwobject(SPR_Discount_To - 1).ColumnName("To");
            //nwGridCon.nwobject(SPR_Discount_DiscountCriteria - 1).ColumnName("Discount Criteria");
            #endregion  

            #region Column Width
            //nwGridCon.nwobject(SPR_Discount_DiscountSP - 1).Width(0);
            //nwGridCon.nwobject(SPR_Discount_DiscountMSC - 1).Width(0);

            //nwGridCon.nwobject(SPR_Discount_DiscountType - 1).Width(200);
            #endregion

            nwGridCon.nwobject(SPR_Discount_DiscountCode - 1).HeaderFieldRequired(true);

            #region Column Color
            nwGridCon.nwobject(SPR_Discount_DiscountCode - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_Discount_DiscountType - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Discount_DiscountType - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Discount_DiscountRate - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Discount_BasisOfDiscount - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_Discount_DiscountApp - 1).BackgroundColor("cyan");

            nwGridCon.nwobject(SPR_Discount_DiscountAmt - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Discount_DiscountSP - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_Discount_DiscountMSC - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Discount_Period - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Discount_From - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Discount_To - 1).BackgroundColor("gainsboro");
            //nwGridCon.nwobject(SPR_Discount_DiscountCriteria - 1).BackgroundColor("gainsboro");

            #endregion

            #region Column Templates                       

            nwGridCon.nwobject(SPR_Discount_DiscountCode - 1).LookUp("lugDiscountType", true);
            nwGridCon.nwobject(SPR_Discount_DiscountCode - 1).Enabled(true);
            nwGridCon.nwobject(SPR_Discount_DiscountCode - 1).HeaderFieldRequired(true);

            nwGridCon.nwobject(SPR_Discount_DiscountRate - 1).Input("numDiscRate_GridDiscount");
            nwGridCon.nwobject(SPR_Discount_DiscountRate - 1).Enabled(true);

            nwGridCon.nwobject(SPR_Discount_BasisOfDiscount - 1).LookUp("lugBasisDiscount", true);
            nwGridCon.nwobject(SPR_Discount_BasisOfDiscount - 1).Enabled(true);

            nwGridCon.nwobject(SPR_Discount_DiscountApp - 1).LookUp("lugDiscountApp", true);
            nwGridCon.nwobject(SPR_Discount_DiscountApp - 1).Enabled(true);


            nwGridCon.nwobject(SPR_Discount_DiscountRate - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Discount_DiscountAmt - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Discount_DiscountSP - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Discount_DiscountMSC - 1).TextAlign("right");

            //nwGridCon.nwobject(SPR_Discount_DiscountRate - 1).Template("<input value='{" + (SPR_Discount_DiscountRate - 1) + "}'  class='txtDiscountRate' style='text-align:right;' />");

            //nwGridCon.nwobject(SPR_Discount_BasisOfDiscount - 1).Combo(dal.LoadBasis(), "clsBasisOfDiscount");
            //nwGridCon.nwobject(SPR_Discount_DiscountApp - 1).Combo(dal.LoadBasis(), "clsDiscountApp");
            #endregion


            #region Column Button
            #endregion

            if (isInitialize)
            {
                dt = dal.GetDiscountTab(Code);
                nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);
                //LoadQuery(dt, nwGridCon);
            }
            else
            {
                nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");
            //nwGridCon.HoverColor("#DEDEDE", "inherit");
            //nwGridCon.SelectedRowHover("#DEDEDE");
            //nwGridCon.SelectedRowHoverColor("inherit");



            nwGridCon.varSpreadBook = "nwGridMainCon_Book_Discount";
            nwGridCon.varSpreadSheet = "nwGridMainCon_Sheet_Discount";
            js.ADD(nwGridCon.createTable());

            //js.makeHTML("#nwGridDiscountCon", nwGridCon.createTable());
            //js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            //js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            //js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("DiscountProperties();");
        }
        #endregion

        #region Miscellaneous Details
        //public void CreateGridMiscellaneousDetails(string Code, bool isInitialize)
        //{
        //    string gridID = "nwGridMiscDetailsCon";
        //    nwGrid nwGridCon = new nwGrid(gridID);
        //    DataTable dt = new DataTable();

        //    //dt = dal.getDetails(WebApp.nwobjectText("txtID"));

        //    int rowCnt = 0;

        //    int colCnt = SPR_MiscellaneousDetails_DueDate;
        //    nwGridCon.CreateExcelGrid(rowCnt, colCnt);
        //    nwGridCon.minRow(1);
        //    nwGridCon.TableHeight(300);
        //    nwGridCon.RowHeight(20);

        //    nwGridCon.buttonDelete = true;
        //    nwGridCon.buttonInsert = true;

        //    #region Column Title
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_MiscCode - 1).ColumnName("Miscellaneous Code");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_MiscDesc - 1).ColumnName("Miscellaneous Description");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_Vatable - 1).ColumnName("VATable");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_InterestBearing - 1).ColumnName("Interest Bearing");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_MiscTypeCode - 1).ColumnName("Miscellaneous Type Code");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_MiscTypeDesc - 1).ColumnName("Miscellaneous Type");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_Amount - 1).ColumnName("Amount");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_PercentofBasePrice - 1).ColumnName("% of Base Price");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_DueDate - 1).ColumnName("Due date");
        //    #endregion

        //    #region Column Width
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_MiscCode - 1).Width(150);
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_MiscDesc - 1).Width(200);
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_MiscTypeCode - 1).Width(0);
        //    #endregion

        //    #region Column Color
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_MiscCode - 1).BackgroundColor("cyan");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_MiscDesc - 1).BackgroundColor("gainsboro");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_Vatable - 1).BackgroundColor("gainsboro");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_InterestBearing - 1).BackgroundColor("gainsboro");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_MiscTypeCode - 1).BackgroundColor("gainsboro");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_MiscTypeDesc - 1).BackgroundColor("cyan");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_Amount - 1).BackgroundColor("white");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_PercentofBasePrice - 1).BackgroundColor("gainsboro");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_DueDate - 1).BackgroundColor("gainsboro");
        //    #endregion

        //    #region Column Templates          
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_Vatable - 1).CheckBox(true, "chkMiscVatable");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_InterestBearing - 1).CheckBox(true, "chkInterestBearing");

        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_Amount - 1).Template("<input value='{" + (SPR_MiscellaneousDetails_Amount - 1) + "}' class='txtSPR_MiscellaneousDetails_Amount isNumber numC' style='text-align:right;' />");
        //    nwGridCon.nwobject(SPR_MiscellaneousDetails_PercentofBasePrice - 1).Template("<input value='{" + (SPR_MiscellaneousDetails_PercentofBasePrice - 1) + "}' class='txtSPR_MiscellaneousDetails_PercentofBasePrice isNumber numC' style='text-align:right;' disabled />");
        //    #endregion

        //    #region Column Button
        //    #endregion

        //    if (isInitialize)
        //    {
        //        dt = dal.GetMiscellaneousTab(Code);
        //        nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
        //        nwGridCon.dataSource(dt);
        //        nwGridCon.maxRow(dt.Rows.Count + 1);
        //        //LoadQuery(dt, nwGridCon);
        //    }
        //    else
        //    {
        //        nwGridCon.CreateExcelGrid(rowCnt, colCnt);
        //    }

        //    //## THEME FORMAT
        //    nwGridCon.HeaderBorderColor("#DEDEDE");
        //    nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
        //    nwGridCon.TableBorderColor("#BBB");
        //    nwGridCon.BodyBorderColor("#BBB");
        //    nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
        //    nwGridCon.HeaderTextColor("#131313");
        //    //nwGridCon.HoverColor("#DEDEDE", "inherit");
        //    //nwGridCon.SelectedRowHover("#DEDEDE");
        //    //nwGridCon.SelectedRowHoverColor("inherit");
        //    js.ADD("propMisc();");
        //    js.makeHTML("#nwGridMiscDetailsCon", nwGridCon.createTable());
        //    //js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
        //    //js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
        //    //js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
        //}
        #endregion

        #region Freebies, Promos and Incentives
        public void CreateGridFreebiesPromosIncentives(string Code, bool isInitialize)
        {
            string gridID = "nwGridFreeBiesPromo";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();

            //dt = dal.getDetails(Code);
            int rowCnt = 0;

            int colCnt = SPR_FreebiesPromoIncentives_ReceiverDesc;
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
            nwGridCon.TableHeight(150);
            nwGridCon.RowHeight(20);

            nwGridCon.buttonDelete = true;
            nwGridCon.buttonInsert = true;

            #region Column Title
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ItemCode - 1).ColumnName("Item Code");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ItemDesc - 1).ColumnName("Item Description");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ItemGroupType - 1).ColumnName("Item Group Type");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_Qty - 1).ColumnName("Quantity");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_PriceVatIn - 1).ColumnName("Price(VATIN)");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_Amount - 1).ColumnName("Amount");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ReceiverTypeCode - 1).ColumnName("Receiver Type Code");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ReceiverTypeDesc - 1).ColumnName("Receiver Type");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ReceiverCode - 1).ColumnName("Receiver");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ReceiverDesc - 1).ColumnName("Name");
            #endregion

            #region Column Width
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ItemCode - 1).Width(150);
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ItemDesc - 1).Width(200);
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ReceiverTypeCode - 1).Width(0);
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ReceiverTypeDesc - 1).Width(200);
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ReceiverCode - 1).Width(150);
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ReceiverDesc - 1).Width(200);
            #endregion

            #region Column Color
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ItemCode - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ItemDesc - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ItemGroupType - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_Qty - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_PriceVatIn - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_Amount - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ReceiverTypeCode - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ReceiverTypeDesc - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ReceiverCode - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_ReceiverDesc - 1).BackgroundColor("gainsboro");
            #endregion

            #region Column Templates                       
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_Qty - 1).Template("<input value = '{" + (SPR_FreebiesPromoIncentives_Qty - 1) + "}' class='txtSPR_FreebiesPromoIncentives_Qty isNumber numC' style='text-align:right;' />");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_PriceVatIn - 1).Template("<input value = '{" + (SPR_FreebiesPromoIncentives_PriceVatIn - 1) + "}' class='txtSPR_FreebiesPromoIncentives_PriceVatIn isNumber numC' style='text-align:right;' />");
            nwGridCon.nwobject(SPR_FreebiesPromoIncentives_Amount - 1).Template("<input value = '{" + (SPR_FreebiesPromoIncentives_Amount - 1) + "}' class='txtSPR_FreebiesPromoIncentives_Amount isNumber numC' style='text-align:right;' nwdp='2' disabled/>");
            #endregion

            #region Column Button
            #endregion

            if (isInitialize)
            {
                dt = dal.GetFreebies(Code);
                nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);
                //LoadQuery(dt, nwGridCon);
            }
            else
            {
                nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");
            //nwGridCon.HoverColor("#DEDEDE", "inherit");
            //nwGridCon.SelectedRowHover("#DEDEDE");
            //nwGridCon.SelectedRowHoverColor("inherit");

            js.makeHTML("#nwGridFreeBiesPromoCon", nwGridCon.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
        }
        #endregion

        #region Amortization
        public void CreateGridAmortization(bool isInitialize, DataTable dt)
        {
            string gridID = "nwGridAmortization";
            nwGrid nwGridCon = new nwGrid(gridID);
            //DataTable dt = new DataTable();
            nwGridCon.Type = nwGridType.SpreadCanvas;
            //dt = dal.GetAmortization(based.SecurityAccess.RecUser, WebApp.nwobjectBool("chkFixedInterest") ? 1 : 0);
            int rowCnt = 0;

            int colCnt = SPR_Amortization_PeriodNo;
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
            nwGridCon.TableHeight(300);
            nwGridCon.RowHeight(20);

            #region Column Title
            nwGridCon.nwobject(SPR_Amortization_PaymentCatCode - 1).ColumnName("PaymentCategoryCode");
            nwGridCon.nwobject(SPR_Amortization_PaymentCatDesc - 1).ColumnName("Payment Category");
            nwGridCon.nwobject(SPR_Amortization_PaymentNo - 1).ColumnName("Payment No.");
            nwGridCon.nwobject(SPR_Amortization_DueDate - 1).ColumnName("Due Date");
            nwGridCon.nwobject(SPR_Amortization_TotalMonthlyPayment - 1).ColumnName("Total Monthly Payment");
            nwGridCon.nwobject(SPR_Amortization_MonthlyAmortization - 1).ColumnName("Monthly Amortization");

            nwGridCon.nwobject(SPR_Amortization_Interest_F - 1).ColumnName("Interest");
            nwGridCon.nwobject(SPR_Amortization_Interest - 1).ColumnName("Interest");
            nwGridCon.nwobject(SPR_Amortization_InterestVat - 1).ColumnName("Interest (VAT)");

            nwGridCon.nwobject(SPR_Amortization_Principal_F - 1).ColumnName("Principal");
            nwGridCon.nwobject(SPR_Amortization_Principal - 1).ColumnName("Principal");
            nwGridCon.nwobject(SPR_Amortization_PrincipalVat - 1).ColumnName("Principal (VAT)");

            nwGridCon.nwobject(SPR_Amortization_PrincipalOutstanding - 1).ColumnName("Principal Outstanding Balance");
            nwGridCon.nwobject(SPR_Amortization_MonthlyMisc - 1).ColumnName("Monthly Misc.");


            nwGridCon.nwobject(SPR_Amortization_InterestMisc_F - 1).ColumnName("Interest-Misc");
            nwGridCon.nwobject(SPR_Amortization_InterestMisc - 1).ColumnName("Interest-Misc");
            nwGridCon.nwobject(SPR_Amortization_InterestMiscVat - 1).ColumnName("Interest-Misc (VAT)");

            nwGridCon.nwobject(SPR_Amortization_Miscellaneous_F - 1).ColumnName("Miscellaneous");
            nwGridCon.nwobject(SPR_Amortization_Miscellaneous - 1).ColumnName("Miscellaneous");
            nwGridCon.nwobject(SPR_Amortization_VatOnMisc - 1).ColumnName("VAT on Misc");

            nwGridCon.nwobject(SPR_Amortization_MiscOutstanding - 1).ColumnName("Miscellaneous Outstanding Balance");
            nwGridCon.nwobject(SPR_Amortization_TotalOutstanding - 1).ColumnName("Total Outstanding Balance");
            nwGridCon.nwobject(SPR_Amortization_PeriodNo - 1).ColumnName("PeriodNo");
            nwGridCon.BodyFontFamily = "Century Gothic";
            nwGridCon.HeaderFontFamily = "Century Gothic";
            #endregion

            #region Column Width
            nwGridCon.nwobject(SPR_Amortization_PaymentCatCode - 1).Width(0);
            nwGridCon.nwobject(SPR_Amortization_PaymentCatDesc - 1).Width(100);
            nwGridCon.nwobject(SPR_Amortization_PaymentNo - 1).Width(70);
            nwGridCon.nwobject(SPR_Amortization_DueDate - 1).Width(100);
            nwGridCon.nwobject(SPR_Amortization_TotalMonthlyPayment - 1).Width(100);
            nwGridCon.nwobject(SPR_Amortization_MonthlyAmortization - 1).Width(100);

            nwGridCon.nwobject(SPR_Amortization_Interest_F - 1).Width(100);
            nwGridCon.nwobject(SPR_Amortization_Interest - 1).Width(0);
            nwGridCon.nwobject(SPR_Amortization_InterestVat - 1).Width(0);

            nwGridCon.nwobject(SPR_Amortization_Principal_F - 1).Width(100);
            nwGridCon.nwobject(SPR_Amortization_Principal - 1).Width(0);
            nwGridCon.nwobject(SPR_Amortization_PrincipalVat - 1).Width(0);

            nwGridCon.nwobject(SPR_Amortization_PrincipalOutstanding - 1).Width(100);
            nwGridCon.nwobject(SPR_Amortization_MonthlyMisc - 1).Width(100);

            nwGridCon.nwobject(SPR_Amortization_InterestMisc - 1).Width(0);
            nwGridCon.nwobject(SPR_Amortization_InterestMiscVat - 1).Width(0);

            nwGridCon.nwobject(SPR_Amortization_Miscellaneous_F - 1).Width(100);
            nwGridCon.nwobject(SPR_Amortization_Miscellaneous - 1).Width(0);
            nwGridCon.nwobject(SPR_Amortization_VatOnMisc - 1).Width(0);

            nwGridCon.nwobject(SPR_Amortization_MiscOutstanding - 1).Width(100);
            nwGridCon.nwobject(SPR_Amortization_TotalOutstanding - 1).Width(100);
            nwGridCon.nwobject(SPR_Amortization_PeriodNo - 1).Width(0);
            #endregion

            #region Column Color
            nwGridCon.nwobject(SPR_Amortization_PaymentCatCode - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Amortization_PaymentCatDesc - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Amortization_DueDate - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Amortization_TotalMonthlyPayment - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Amortization_MonthlyAmortization - 1).BackgroundColor("white");

            nwGridCon.nwobject(SPR_Amortization_Interest_F - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Amortization_Interest - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Amortization_InterestVat - 1).BackgroundColor("white");

            nwGridCon.nwobject(SPR_Amortization_Principal_F - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Amortization_Principal - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Amortization_PrincipalVat - 1).BackgroundColor("white");

            nwGridCon.nwobject(SPR_Amortization_PrincipalOutstanding - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Amortization_MonthlyMisc - 1).BackgroundColor("white");

            nwGridCon.nwobject(SPR_Amortization_InterestMisc - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Amortization_InterestMiscVat - 1).BackgroundColor("white");

            nwGridCon.nwobject(SPR_Amortization_Miscellaneous_F - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Amortization_Miscellaneous - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Amortization_VatOnMisc - 1).BackgroundColor("white");

            nwGridCon.nwobject(SPR_Amortization_MiscOutstanding - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Amortization_TotalOutstanding - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_Amortization_PeriodNo - 1).BackgroundColor("white");

            #endregion

            #region Column Templates          
            nwGridCon.nwobject(SPR_Amortization_PaymentNo - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Amortization_TotalMonthlyPayment - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Amortization_MonthlyAmortization - 1).TextAlign("right");

            nwGridCon.nwobject(SPR_Amortization_Interest_F - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Amortization_Interest - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Amortization_InterestVat - 1).TextAlign("right");

            nwGridCon.nwobject(SPR_Amortization_Principal_F - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Amortization_Principal - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Amortization_PrincipalVat - 1).TextAlign("right");

            nwGridCon.nwobject(SPR_Amortization_PrincipalOutstanding - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Amortization_MonthlyMisc - 1).TextAlign("right");

            nwGridCon.nwobject(SPR_Amortization_InterestMisc_F - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Amortization_InterestMisc - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Amortization_InterestMiscVat - 1).TextAlign("right");

            nwGridCon.nwobject(SPR_Amortization_Miscellaneous_F - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Amortization_Miscellaneous - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Amortization_VatOnMisc - 1).TextAlign("right");

            nwGridCon.nwobject(SPR_Amortization_MiscOutstanding - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Amortization_TotalOutstanding - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_Amortization_PeriodNo - 1).TextAlign("right");

            #endregion

            #region Column Button
            #endregion

            if (isInitialize)
            {
                nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);
                //LoadQuery(dt, nwGridCon);
            }
            else
            {
                nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");
            //nwGridCon.HoverColor("#DEDEDE", "inherit");
            //nwGridCon.SelectedRowHover("#DEDEDE");
            //nwGridCon.SelectedRowHoverColor("inherit");


            nwGridCon.varSpreadBook = "nwGridMainCon_Book_Schedule_Amortization";
            nwGridCon.varSpreadSheet = "nwGridMainCon_Sheet_Schedule_Amortization";
            js.ADD(nwGridCon.createTable());



            //js.makeHTML("#nwGridAmortizationCon", nwGridCon.createTable());


            //js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            //js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            //js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("propAmortization();");
        }
        #endregion

        #region Term Details
        public void CreateTermDetails(DataTable DTpaymentTerm, bool isInitialize)
        {
            string gridID = "nwGridTermDetails";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();
            nwGridCon.Type = nwGridType.SpreadCanvas;
            int rowCnt = 0;

            int colCnt = SPR_TermDetails_EndDate;
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
            //nwGridCon.TableHeight(300);
            nwGridCon.RowHeight(20);

            #region Column Title

            nwGridCon.nwobject(SPR_TermDetails_Code - 1).ColumnName("Payment Term Code");
            nwGridCon.nwobject(SPR_TermDetails_Description - 1).ColumnName("Payment Category");
            nwGridCon.nwobject(SPR_TermDetails_MonthlyPayment - 1).ColumnName("Monthly Payment");
            nwGridCon.nwobject(SPR_TermDetails_TermPeriodMonths - 1).ColumnName("Terms (in Mos.)");
            nwGridCon.nwobject(SPR_TermDetails_InterestRate - 1).ColumnName("Interest Rate");
            nwGridCon.nwobject(SPR_TermDetails_PenaltyRate - 1).ColumnName("Penalty Rate");
            nwGridCon.nwobject(SPR_TermDetails_StartDate - 1).ColumnName("Start Date");
            nwGridCon.nwobject(SPR_TermDetails_EndDate - 1).ColumnName("End Date");



            #endregion

            #region Column Width
            nwGridCon.nwobject(SPR_TermDetails_Code - 1).Width(0);
            nwGridCon.nwobject(SPR_TermDetails_PenaltyRate - 1).Width(0);
            #endregion

            #region Column Color
            nwGridCon.nwobject(SPR_TermDetails_Code - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_TermDetails_Description - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_TermDetails_MonthlyPayment - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_TermDetails_TermPeriodMonths - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_TermDetails_InterestRate - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_TermDetails_PenaltyRate - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_TermDetails_StartDate - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_TermDetails_EndDate - 1).BackgroundColor("white");
            #endregion

            #region Column Templates          
            nwGridCon.nwobject(SPR_TermDetails_MonthlyPayment - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_TermDetails_TermPeriodMonths - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_TermDetails_InterestRate - 1).TextAlign("right");
            nwGridCon.nwobject(SPR_TermDetails_PenaltyRate - 1).TextAlign("right");
            #endregion

            #region Column Button
            #endregion

            if (isInitialize)
            {

                dt = LoadHoldforReservationPaymentTermDetailsForAmortization(DTpaymentTerm);
                nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);
                //LoadQuery(dt, nwGridCon);
            }
            else
            {
                nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");
        


            nwGridCon.varSpreadBook = "nwGridMainCon_Book_PaymentTerm_Amortization";
            nwGridCon.varSpreadSheet = "nwGridMainCon_Sheet_PaymentTerm_Amortization";
            js.ADD(nwGridCon.createTable());

            //js.makeHTML("#nwGridTermDetailsCon", nwGridCon.createTable());
            js.ADD("nwGridMainCon_Book_PaymentTerm_Amortization.ActiveSheet.Refresh();");
            js.ADD("nwPopupForm_ShowModal('nwAmortization');");
  
        }
        #endregion

        #region CoBuyer
        public void CreateGridCoBuyer(string Code, bool isInitialize, bool isLoad)
        {
            string gridID = "nwGridCoBuyer";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();
            //nwGridCon.Type = nwGridType.SpreadCanvas;
            //dt = dal.getDetails(Code);
            nwGridCon.Type = nwGridType.SpreadCanvas;
            int rowCnt = 5;

            int colCnt = SPR_COBUYER_TINNO;
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
            //nwGridCon.TableHeight(300);
            nwGridCon.TableHeight(300);
            nwGridCon.RowHeight(20);

            nwGridCon.buttonDelete = true;
            //nwGridCon.buttonInsert = true;

            #region Column Title
            //nwGridCon.nwobject(SPR_COBUYER_CODE - 1).ColumnName("Co-Buyer Code");
            nwGridCon.nwobject(SPR_COBUYERNAME - 1).ColumnName("CO-BUYER NAME");
            nwGridCon.nwobject(SPR_COBUYER_BIRTHDATE - 1).ColumnName("BIRTH DATE");

            nwGridCon.nwobject(SPR_COBUYER_GENDERCODE - 1).ColumnName("GENDER CODE");
            nwGridCon.nwobject(SPR_COBUYER_GENDER - 1).ColumnName("GENDER");
            nwGridCon.nwobject(SPR_COBUYER_RELATIONSHIPCODE - 1).ColumnName("RELATIONSHIP WITH PRINCIPAL CLIENT CODE");
            nwGridCon.nwobject(SPR_COBUYER_RELATIONSHIPDESC - 1).ColumnName("RELATIONSHIP WITH PRINCIPAL CLIENT");
            nwGridCon.nwobject(SPR_COBUYER_TINNO - 1).ColumnName("TIN");
            nwGridCon.BodyFontFamily = "Century Gothic";
            nwGridCon.HeaderFontFamily = "Century Gothic";
            #endregion

            #region Column Width
            //nwGridCon.nwobject(SPR_COBUYER_CODE - 1).Width(150);
            nwGridCon.nwobject(SPR_COBUYERNAME - 1).Width(200);
            nwGridCon.nwobject(SPR_COBUYER_BIRTHDATE - 1).Width(150);
            nwGridCon.nwobject(SPR_COBUYER_GENDER - 1).Width(150);
            nwGridCon.nwobject(SPR_COBUYER_GENDERCODE - 1).Width(0);
            nwGridCon.nwobject(SPR_COBUYER_RELATIONSHIPCODE - 1).Width(0);
            nwGridCon.nwobject(SPR_COBUYER_RELATIONSHIPDESC - 1).Width(200);
            nwGridCon.nwobject(SPR_COBUYER_TINNO - 1).Width(0);

            #endregion

            #region Column Color
            nwGridCon.nwobject(SPR_COBUYERNAME - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_COBUYER_BIRTHDATE - 1).BackgroundColor("gainsboro");

            nwGridCon.nwobject(SPR_COBUYER_GENDERCODE - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_COBUYER_GENDER - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_COBUYER_RELATIONSHIPCODE - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_COBUYER_RELATIONSHIPDESC - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_COBUYER_TINNO - 1).BackgroundColor("gainsboro");

            #endregion

            #region Column Templates                       
            #endregion

            #region Column Button
            nwGridCon.ButtonMenuAdd("btnReloadCoBuyerData", "Load Co-Buyer Details");
            #endregion

            if (isInitialize && isLoad == false)
            {
                dt = dal.GetCoBuyerDetail(WebApp.nwobjectText("ReservationControlNo"));
                nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);
                //LoadQuery(dt, nwGridCon);
            }
            else if (isInitialize && isLoad == true)
            {
                dt = dal.getCoBuyerAll(WebApp.nwobjectText("idvallugClient"));
                nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);
            }
            else
            {
                nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            }

            //## THEME FORMAT

            nwGridCon.varSpreadBook = "nwGridMainCon_Book_CoBuyer";
            nwGridCon.varSpreadSheet = "nwGridMainCon_Sheet_CoBuyer";
            js.ADD(nwGridCon.createTable());

            //nwGridCon.HeaderBorderColor("#DEDEDE");
            //nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            //nwGridCon.TableBorderColor("#BBB");
            //nwGridCon.BodyBorderColor("#BBB");
            //nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            //nwGridCon.HeaderTextColor("#131313");
            //nwGridCon.HoverColor("#DEDEDE", "inherit");
            //nwGridCon.SelectedRowHover("#DEDEDE");
            //nwGridCon.SelectedRowHoverColor("inherit");

            // js.makeHTML("#nwGridCoBuyerCon", nwGridCon.createTable());
            //s.ADD("LoadCoBuyerDetails();");
            //js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            //js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            //js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
        }
        #endregion

        #region Insurance
        public void CreateGridInsurance(string Code, bool isInitialize)
        {
            string gridID = "nwGridInsurance";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();

            //dt = dal.getDetails(Code);
            int rowCnt = 0;

            int colCnt = SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT_DESC;
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(1);
            nwGridCon.TableHeight(120);
            nwGridCon.RowHeight(20);

            nwGridCon.buttonDelete = true;
            nwGridCon.buttonInsert = true;

            #region Column Title
            nwGridCon.nwobject(SPR_INSURANCE_SECONDARY_BENEFICIARIES - 1).ColumnName("Secondary Beneficiaries");
            nwGridCon.nwobject(SPR_INSURANCE_DATEOFBIRTH - 1).ColumnName("Date of Birth");
            nwGridCon.nwobject(SPR_INSURANCE_PLACEOFBIRTH - 1).ColumnName("Place of Birth");
            nwGridCon.nwobject(SPR_INSURANCE_CITIZENSHIP_CODE - 1).ColumnName("Citizenship Code");
            nwGridCon.nwobject(SPR_INSURANCE_CITIZENSHIP_DESC - 1).ColumnName("Citizenship");
            nwGridCon.nwobject(SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT - 1).ColumnName("Relationship to the Applican Code");
            nwGridCon.nwobject(SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT_DESC - 1).ColumnName("Relationship to the Applicant");

            #endregion

            #region Required
            nwGridCon.nwobject(SPR_INSURANCE_SECONDARY_BENEFICIARIES - 1).HeaderFieldRequired(true);
            //nwGridCon.nwobject(SPR_INSURANCE_DATEOFBIRTH - 1).HeaderFieldRequired(true);
            //nwGridCon.nwobject(SPR_INSURANCE_PLACEOFBIRTH - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_INSURANCE_CITIZENSHIP_DESC - 1).HeaderFieldRequired(true);
            //nwGridCon.nwobject(SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT - 1).HeaderFieldRequired(true);
            nwGridCon.nwobject(SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT_DESC - 1).HeaderFieldRequired(true);

            #endregion

            #region Column Width
            nwGridCon.nwobject(SPR_INSURANCE_CITIZENSHIP_CODE - 1).Width(0);
            nwGridCon.nwobject(SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT - 1).Width(0);
            #endregion

            #region Column Color
            nwGridCon.nwobject(SPR_INSURANCE_SECONDARY_BENEFICIARIES - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_INSURANCE_DATEOFBIRTH - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_INSURANCE_PLACEOFBIRTH - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_INSURANCE_CITIZENSHIP_CODE - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_INSURANCE_CITIZENSHIP_DESC - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT_DESC - 1).BackgroundColor("cyan");
            #endregion

            #region Column Templates
            nwGridCon.nwobject(SPR_INSURANCE_SECONDARY_BENEFICIARIES - 1).Template("<input value='{" + (SPR_INSURANCE_SECONDARY_BENEFICIARIES - 1) + "}' class='txtSPR_INSURANCE_SECONDARY_BENEFICIARIES' maxlength='80'/>");
            //nwGridCon.nwobject(SPR_INSURANCE_DATEOFBIRTH - 1).Template("<input value='{" + (SPR_INSURANCE_DATEOFBIRTH - 1) + "}' class='txtSPR_INSURANCE_DATEOFBIRTH'/>");

            nwGridCon.nwobject(SPR_INSURANCE_DATEOFBIRTH - 1).InputDate("nwDatePick txtSPR_INSURANCE_DATEOFBIRTH");
            nwGridCon.nwobject(SPR_INSURANCE_PLACEOFBIRTH - 1).Template("<input value='{" + (SPR_INSURANCE_PLACEOFBIRTH - 1) + "}' class='txtSPR_INSURANCE_PLACEOFBIRTH' maxlength='255'/>");
            //nwGridCon.nwobject(SPR_INSURANCE_DATEOFBIRTH - 1).InputDate("nwDatePick");
            //nwGridCon.nwobject(SPR_INSURANCE_DATEOFBIRTH - 1).Class("txtSPR_INSURANCE_DATEOFBIRTH");
            #endregion

            #region Column Button
            #endregion

            if (isInitialize)
            {
                dt = dal.GetInsuranceLin(Code);
                nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);
                //LoadQuery(dt, nwGridCon);
            }
            else
            {
                nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");
            //nwGridCon.HoverColor("#DEDEDE", "inherit");
            //nwGridCon.SelectedRowHover("#DEDEDE");
            //nwGridCon.SelectedRowHoverColor("inherit");

            js.makeHTML("#nwGridInsuranceCon", nwGridCon.createTable());
            js.ADD("CoBorrowerExists();");
            //js.ADD("$('#nwGridInsurance-nwData .txtSPR_INSURANCE_DATEOFBIRTH').datepicker({ dateFormat: 'yy/mm/dd' }).mask('9999/99/99');");
            //js.ADD("$('.txtSPR_INSURANCE_DATEOFBIRTH').datepicker({ dateFormat: 'yy/mm/dd' }).mask('9999/99/99');");
            //js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            //js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            //js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
        }
        #endregion



        #region Reference Based Unit/Add On
        public void CreateGridRefBasedUnitAddOn(string Code, string unitCode)
        {
            string gridID = "nwGridRefBaseOn";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();
            nwGridCon.Type = nwGridType.SpreadCanvas;
            //dt = dal.getDetails(WebApp.nwobjectText("txtID"));

            int rowCnt = 5;

            int colCnt = SPR_RefAddon_Desc;
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(5);
            nwGridCon.TableHeight(300);
            nwGridCon.RowHeight(20);



            #region Column Title
            nwGridCon.nwobject(SPR_RefAddon_UnitCode - 1).ColumnName("Unit Code");
            nwGridCon.nwobject(SPR_RefAddon_Desc - 1).ColumnName("Unit Description");

            #endregion
            nwGridCon.BodyFontFamily = "Century Gothic";
            nwGridCon.HeaderFontFamily = "Century Gothic";

            #region Column Width
            nwGridCon.nwobject(SPR_RefAddon_UnitCode - 1).Width(150);
            nwGridCon.nwobject(SPR_RefAddon_Desc - 1).Width(200);

            #endregion

            #region Column Color
            nwGridCon.nwobject(SPR_RefAddon_UnitCode - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_RefAddon_Desc - 1).BackgroundColor("gainsboro");



            #endregion

            #region Column Templates


            nwGridCon.nwobject(SPR_RefAddon_UnitCode - 1).LookUp("lugUnitCode_refBased", false, true);
            nwGridCon.nwobject(SPR_RefAddon_UnitCode - 1).Enabled(true);


            #endregion

            #region Column Button
            #endregion

            DataTable dtValidationValue = dal.validationVal(unitCode);
            string tempvalue = dtValidationValue.Rows[0]["value"].ToString();

            if (tempvalue == null || tempvalue == "")
            {


                dt = dal.getRefBaseAddOns(Code, unitCode);
                int x = dt.Rows.Count;

                if (x < 1)
                {
                    nwGridCon.CreateExcelGrid(5, colCnt);
                }
                else
                {
                    nwGridCon.CreateExcelGrid(dt.Rows.Count + 1, colCnt);
                    nwGridCon.dataSource(dt);
                    nwGridCon.minRow(dt.Rows.Count + 1);
                }

                js.ADD("$('#btnSaveRefBasedAddOn').enable(true)");

            }
            else
            {

                dt = dal.getRefBaseAddOnsLoaded(unitCode);
                nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.minRow(dt.Rows.Count + 1);
                nwGridCon.nwobject(SPR_RefAddon_UnitCode - 1).Enabled(false);
                js.ADD("$('#btnSaveRefBasedAddOn').enable(false)");

            }



   

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");



            nwGridCon.varSpreadBook = "nwGridMainCon_Book_RefBasedUnitAddOn";
            nwGridCon.varSpreadSheet = "nwGridMainCon_Sheet_RefBasedUnitAddOn";
            js.ADD(nwGridCon.createTable());

 
        }

        #endregion


        private void SetImageUploaded(object objx)
        {
            string imagestring = "";
            imagestring = picChange(objx);

            js.makeCSS("#ImgLogo", "background-image", "url(" + imagestring + ")");
        }

        string picChange(object img)
        {
            string strFinal = "";
            try
            {
                if (img != null)
                {
                    var b64String = Convert.ToBase64String((byte[])img);
                    var dataUrl = "data:image/png;base64," + b64String;
                    strFinal = dataUrl;
                }
            }
            catch (Exception e)
            {
                //strFinal = e.ToString();
            }
            return strFinal;
        }

        public byte[] convertAttachment(string filePath)
        {
            byte[] _OtherIDFileAtt = new byte[0];
            try
            {
                FileStream fsOtherID = new FileStream(filePath, FileMode.Open);
                _OtherIDFileAtt = new byte[fsOtherID.Length];
                fsOtherID.Read(_OtherIDFileAtt, 0, Convert.ToInt32(fsOtherID.Length));
                fsOtherID.Close();
                fsOtherID.Dispose();


            }
            catch (Exception er) { }
            return _OtherIDFileAtt;
        }

        private DataTable InitializeColumnPaymentDetails()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("Mode of Payment Code");
            dt.Columns.Add("Mode of Payment Description");
            dt.Columns.Add("Payment Method Code");
            dt.Columns.Add("Payment Method");
            dt.Columns.Add("Currency Code");
            dt.Columns.Add("Currency Description");
            dt.Columns.Add("Exchange Rate to Local");
            dt.Columns.Add("Exchange Rate to Home");
            dt.Columns.Add("OCY Amount");
            dt.Columns.Add("Local Amount");
            dt.Columns.Add("Home Amount");
            dt.Columns.Add("Payment Center Code");
            dt.Columns.Add("Payment Center Description");
            dt.Columns.Add("Check No.");
            dt.Columns.Add("Check Date");
            dt.Columns.Add("Bank Code");
            dt.Columns.Add("Bank Name");
            dt.Columns.Add("Branch");
            dt.Columns.Add("Card Type Code");
            dt.Columns.Add("Card Type");
            dt.Columns.Add("Card Name");
            dt.Columns.Add("Card No.");
            dt.Columns.Add("Expiry Date");
            dt.Columns.Add("Approval No.");
            dt.Columns.Add("Attachment Details");
            dt.Columns.Add("Unique ID");
            return dt;
        }

        private DataTable InitalizeColumnAttachmentPaymentDetails()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("Account No.");
            dt.Columns.Add("Document Name");
            dt.Columns.Add("Depository Bank Code");
            dt.Columns.Add("Depository Bank");
            dt.Columns.Add("Branch");
            dt.Columns.Add("Date Deposited");
            dt.Columns.Add("Attach");
            dt.Columns.Add("File Path");
            dt.Columns.Add("View Attachment");
            dt.Columns.Add("Remove");
            dt.Columns.Add("Particulars");
            dt.Columns.Add("Unique ID");
            return dt;
        }


        #region Statement Details
        public void CreateStatementDetails(string Code, bool isInitialize, DataTable jsonStatementDetails)
        {
            string gridID = "nwGridStatementDetail";
            nwGrid nwGridCon = new nwGrid(gridID);
            DataTable dt = new DataTable();

            //dt = dal.getDetails(Code);
            int rowCnt = 0;

            int colCnt = SPR_STATEMENT_REMARKS;
            nwGridCon.CreateExcelGrid(rowCnt, colCnt);
            nwGridCon.minRow(10);
            nwGridCon.TableHeight(200);
            nwGridCon.RowHeight(20);

            nwGridCon.buttonDelete = true;
            nwGridCon.buttonInsert = true;

            #region Column Title
            nwGridCon.nwobject(SPR_STATEMENT_CODE - 1).ColumnName("Statement Code");
            nwGridCon.nwobject(SPR_STATEMENT_STATEMENT - 1).ColumnName("Statement");
            nwGridCon.nwobject(SPR_STATEMENT_YES - 1).ColumnName("Yes");
            nwGridCon.nwobject(SPR_STATEMENT_NO - 1).ColumnName("No");
            nwGridCon.nwobject(SPR_STATEMENT_REMARKS - 1).ColumnName("Remarks");

            #endregion

            #region Column Width
            #endregion

            #region Column Color
            nwGridCon.nwobject(SPR_STATEMENT_CODE - 1).BackgroundColor("cyan");
            nwGridCon.nwobject(SPR_STATEMENT_STATEMENT - 1).BackgroundColor("gainsboro");
            nwGridCon.nwobject(SPR_STATEMENT_YES - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_STATEMENT_NO - 1).BackgroundColor("white");
            nwGridCon.nwobject(SPR_STATEMENT_REMARKS - 1).BackgroundColor("white");
            #endregion

            #region Column Templates
            nwGridCon.nwobject(SPR_STATEMENT_YES - 1).Template("<input type='radio' value='{" + (SPR_STATEMENT_YES - 1) + "}' class='radioSPR_STATEMENT_YES' style='height:15px;'/>");
            nwGridCon.nwobject(SPR_STATEMENT_NO - 1).Template("<input type='radio' value='{" + (SPR_STATEMENT_NO - 1) + "}' class='radioSPR_STATEMENT_NO' style='height:15px;'/>");
            nwGridCon.nwobject(SPR_STATEMENT_REMARKS - 1).Template("<input value='{" + (SPR_STATEMENT_REMARKS - 1) + "}' class='txtSPR_STATEMENT_REMARKS' maxlength='255'/>");
            #endregion

            #region Column Button
            #endregion

            if (isInitialize)
            {
                dt = dal.GetStatementDetails(Code);
                nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                nwGridCon.dataSource(dt);
                nwGridCon.maxRow(dt.Rows.Count + 1);
                //LoadQuery(dt, nwGridCon);
            }
            else
            {
                if (isNewRow)
                {
                    if (jsonStatementDetails != null)
                        dt = jsonStatementDetails;
                    else
                        dt = dal.GetStatementDefault(WebApp.nwobjectText("ddtxtInsuranceCompany"));
                    nwGridCon.CreateExcelGrid(dt.Rows.Count, colCnt);
                    nwGridCon.dataSource(dt);
                    nwGridCon.maxRow(dt.Rows.Count + 1);
                }
                else
                {
                    nwGridCon.CreateExcelGrid(rowCnt, colCnt);
                }
            }

            //## THEME FORMAT
            nwGridCon.HeaderBorderColor("#DEDEDE");
            nwGridCon.rowBackground("#FFFFFF", "#FFFFFF");
            nwGridCon.TableBorderColor("#BBB");
            nwGridCon.BodyBorderColor("#BBB");
            nwGridCon.HeaderBackgroundGradientColor("#FEFEFE", "#DEDEDE");
            nwGridCon.HeaderTextColor("#131313");
            //nwGridCon.HoverColor("#DEDEDE", "inherit");
            //nwGridCon.SelectedRowHover("#DEDEDE");
            //nwGridCon.SelectedRowHoverColor("inherit");
            js.makeHTML("#nwGridStatementDetailCon", nwGridCon.createTable());
            js.ADD("nwGrid_TableAdjust(\"" + gridID + "\")");
            js.ADD("nwGrid_TableFreeze(\"" + gridID + "\",0,0)");
            js.ADD("nwGrid_makeResize(\"" + gridID + "\")");
            js.ADD("$('#nwGridStatementDetailCon').addClass('ui - tabs - active')");
            js.ADD("func_AppendRadioButton();");
            if (jsonStatementDetails != null)
                js.ADD("func_ValueRadioButton();");
        }


 

        private void setRqmtCompProp()
        {
            if (dal.hasSavedRqrdCompli(WebApp.nwobjectText("txtReservationControlNo")) == "True")
            {

                js.ADD("$('#btnReqCompliance').removeClass('btn-default btn-default-orange');");
                js.ADD("$('#btnReqCompliance').addClass('btn-default btn-default-green');");
            }
            else
            {

                js.ADD("$('#btnReqCompliance').removeClass('btn-default btn-default-green');");
                js.ADD("$('#btnReqCompliance').addClass('btn-default btn-default-orange');");
            }
        }



        #endregion
    }


}