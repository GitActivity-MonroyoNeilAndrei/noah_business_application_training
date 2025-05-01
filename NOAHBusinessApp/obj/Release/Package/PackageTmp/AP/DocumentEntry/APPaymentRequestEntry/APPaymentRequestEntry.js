var startIndex = 0;

var //nwGridCon
    SPR_REFTRANNO = 1,
    SPR_REFTRANDATE = 2,
    SPR_DRNO = 3,
    SPR_DRDATE = 4,
    SPR_WITHSI = 5,
    SPR_REFNO = 6,
    SPR_REFDATE = 7,
    SPR_PAYMENTTERMCODE = 8,
    SPR_PAYMENTTERMDESC = 9,
    SPR_NOOFDAYS = 10,
    SPR_COUNTERDATE = 11,
    SPR_DUEDATE = 12,
    SPR_GROSSAMT = 13,
    SPR_NETAMT = 14,
    SPR_PARTICULARS = 15,
    SPR_CHARGINGDTLS = 16,
    SPR_RECURRING = 17,
    SPR_PREPAYMENTDTLS = 18,
    SPR_REQMTCOMPLIANCE = 19,
    SPR_RVWATTACHMENTS = 20,
    SPR_WITHADA = 21,
    SPR_HOLDPAYMENT = 22,
    SPR_REMARKSHOLD = 23,
    SPR_FOREXRATEDATE = 24,
    SPR_RATETOLOCAL = 25,
    SPR_RATETOHOME = 26,
    SPR_NETAMTLOCAL = 27,
    SPR_NETAMTHOME = 28,
    SPR_TMPID = 29,
    SPR_LINEID = 30,
    SPR_CDTAG = 31,
    SPR_RDTAG = 32,
    SPR_PDTAG = 33,
    SPR_OCYVATEX = 34,
    SPR_VAT = 35,
    SPR_EWT = 36,
    SPR_ADVANCES = 37,
    SPR_DMAPP = 38,
    SPR_RETENTION = 39,
    SPR_RCTAG = 40,
    SPR_BDGTTAG = 41,
    SPR_WITHSITAG = 42,
    SPR_DRNOTAG = 43,
    SPR_DRDATETAG = 44,
    SPR_REFNOTAG = 45,
    SPR_REFDATETAG = 46,
    SPR_CDATETAG = 47,
    SPR_RATAG = 48;

var //nwGridChargeDtlsCon
    SPR_CD_LINETYPE = 1,
    SPR_CD_REFNO = 2,
    SPR_CD_REFDATE = 3,
    SPR_CD_ITEMGRPTYPECODE = 4,
    SPR_CD_ITEMGRPTYPEDESC = 5,
    SPR_CD_ITEMCODE = 6,
    SPR_CD_ITEMDESC = 7,
    SPR_CD_UOM = 8,
    SPR_CD_QTY = 9,
    SPR_CD_UNITCOST_VATIN = 10,
    SPR_CD_UNITCOST_VATEX = 11,
    SPR_CD_OCYAMT_VATIN = 12,
    SPR_CD_OCYAMT_VATEX = 13,
    SPR_CD_PERIODFROM = 14,
    SPR_CD_PERIODTO = 15,
    SPR_CD_ACCTDESC = 16,
    SPR_CD_IO = 17,
    SPR_CD_PAYEEREFCODE = 18,
    SPR_CD_PAYEEREFDESC = 19,
    SPR_CD_VATCODE = 20,
    SPR_CD_VATSHORTDESC = 21,
    SPR_CD_EWTCODE = 22,
    SPR_CD_EWTSHORTDESC = 23,
    SPR_CD_REMBDGTQTY = 24,
    SPR_CD_REMBDGTAMT = 25,
    SPR_CD_BDGTDTLS = 26,
    SPR_CD_REQCOMP = 27,
    SPR_CD_SEG1 = 28,
    SPR_CD_SEG1DESC = 29,
    SPR_CD_SEG2 = 30,
    SPR_CD_SEG2DESC = 31,
    SPR_CD_SEG3 = 32,
    SPR_CD_SEG3DESC = 33,
    SPR_CD_SEG4 = 34,
    SPR_CD_SEG4DESC = 35,
    SPR_CD_SEG5 = 36,
    SPR_CD_SEG5DESC = 37,
    SPR_CD_SEG6 = 38,
    SPR_CD_SEG6DESC = 39,
    SPR_CD_SLTYPECODE = 40,
    SPR_CD_SLTYPEDESC = 41,
    SPR_CD_REFTYPECODE = 42,
    SPR_CD_REFTYPEDESC = 43,
    SPR_CD_BANKACCT = 44,
    SPR_CD_CASHFLOWCODE = 45,
    SPR_CD_CASHFLOWDESC = 46,
    SPR_CD_TAG = 47,
    SPR_CD_REQSLTYPE = 48,
    SPR_CD_REQSUBACCNT = 49,
    SPR_CD_REQALLOC = 50,
    SPR_CD_RATETOLOCAL = 51,
    SPR_CD_RATETOHOME = 52,
    SPR_CD_ALLOCTAG = 53,
    SPR_CD_LINEID = 54,
    SPR_CD_ROWNO = 55,
    SPR_CD_CONSUMPTION = 56,
    SPR_CD_REMARKS = 57,
    SPR_CD_RCTAG = 58;

var //nwGridCon3   
    SPR_P_SELECT = 1,
    SPR_P_TRANNO = 2,
    SPR_P_DATEPOSTED = 3,
    SPR_P_VENDOR = 4,
    SPR_P_CURRENCY = 5,
    SPR_P_TYPE = 6,
    SPR_P_SUBTYPE = 7,
    SPR_P_OCYAMOUNT = 8,
    SPR_P_REMARKS = 9,
    SPR_P_OTHRINS = 10,
    SPR_P_RSNREQ = 11,
    SPR_P_LOCATION = 12;

var ////nwGridAllocProcessCon
    SPR_AP_SEG2 = 1,
    SPR_AP_SEG2DESC = 2,
    SPR_AP_SEG3 = 3,
    SPR_AP_SEG3DESC = 4,
    SPR_AP_SEG4 = 5,
    SPR_AP_SEG4DESC = 6,
    SPR_AP_SEG5 = 7,
    SPR_AP_SEG5DESC = 8,
    SPR_AP_SEG6 = 9,
    SPR_AP_SEG6DESC = 10,
    SPR_AP_QTY = 11,
    SPR_AP_AMOUNT = 12,
    SPR_AP_PERCENTAGE = 13,
    SPR_AP_TAG = 14,
    SPR_AP_DELETE = 15;

var //nwGridPrepaymentCon
    SPR_PREPAIDACCNTCODE = 1,
    SPR_PREPAIDACCNTDESC = 2,
    SPR_PREPAIDAMOUNT = 3,
    SPR_STARTAMORT = 4,
    SPR_NOPERIODS = 5,
    SPR_ENDAMORT = 6,
    SPR_PCCCALLOC = 7,
    SPR_PREPAY_LINEID = 8,
    SPR_PREPAY_ROWNO = 9,
    SPR_PREPAY_TAG = 10;

var //nwGridPCCCAllocCon
    SPR_PCCC_PCSEGMENTCODE = 1,
    SPR_PCCC_PCSEGMENTDESC = 2,
    SPR_PCCC_CCSEGMENTCODE = 3,
    SPR_PCCC_CCSEGMENTDESC = 4,
    SPR_PCCC_PERCENTAGE = 5,
    SPR_PCCC_AMOUNT = 6,
    SPR_PCCC_EXPENSEALLOC = 7,
    SPR_PCCC_EXPTAG = 8;

var //nwGridExpenseCon
    SPR_EA_EXPENSECODE = 1,
    SPR_EA_EXPENSEDESC = 2,
    SPR_EA_PERCENT = 3,
    SPR_EA_AMOUNT = 4;

var //nwGridValListCon
    SPR_VAL_REMARKS = 1,
    SPR_VAL_ROWNO = 2,
    SPR_VAL_REFNO = 3,
    SPR_VAL_REFDATE = 4,
    SPR_VAL_DRNO = 5,
    SPR_VAL_DRDATE = 6,
    SPR_VAL_COUNTERDATE = 7,
    SPR_VAL_DUEDATE = 8,
    SPR_VAL_AMOUNT = 9,
    SPR_VAL_PARTICULARS = 10,
    SPR_VAL_IGTCODE = 11,
    SPR_VAL_IGTDESC = 12,
    SPR_VAL_ITEMCODE = 13,
    SPR_VAL_ITEMDESC = 14,
    SPR_VAL_IOASSET = 15,
    SPR_VAL_UOM = 16,
    SPR_VAL_QTY = 17,
    SPR_VAL_UNITCOST = 18,
    SPR_VAL_PROFITCENTER = 19,
    SPR_VAL_COSTCENTER = 20,
    SPR_VAL_SLTYPECODE = 21,
    SPR_VAL_SLTYPEDESC = 22,
    SPR_VAL_SLREFCODE = 23,
    SPR_VAL_SLREFDESC = 24,
    SPR_VAL_PERIODFROM = 25,
    SPR_VAL_PERIODTO = 26;

//nwGridApplyAdvDMCon
var SPR_ADM_FORMS = 1,
    SPR_ADM_DOCNO = 2,
    SPR_ADM_PONO = 3,
    SPR_ADM_ADVDEP = 4,
    SPR_ADM_DMAMT = 5,
    SPR_ADM_PREVAMT = 6,
    SPR_ADM_BALANCE = 7,
    SPR_ADM_APPLIEDAMT = 8,
    SPR_ADM_CLOSEADV = 9,
    SPR_ADM_DEFAPPAMTDTLS = 10,
    SPR_ADM_APPLIEDHST = 11,
    SPR_ADM_COSTCENTER = 12,
    SPR_ADM_CCDESC = 13,
    SPR_ADM_REMARKS = 14,
    SPR_ADM_GLACCNTCODE = 15,
    SPR_ADM_GLACCNTDESC = 16,
    SPR_ADM_DEFFERED = 17,
    SPR_ADM_INPUTVAT = 18,
    SPR_ADM_EWT = 19,
    SPR_ADM_SEG2 = 20,
    SPR_ADM_SEG3 = 21,
    SPR_ADM_SEG4 = 22,
    SPR_ADM_SEG5 = 23,
    SPR_ADM_SEG6 = 24,
    SPR_ADM_TAXCODE = 25,
    SPR_ADM_VATRATE = 26,
    SPR_ADM_EWTRATE = 27,
    SPR_ADM_REFPONO = 28,
    SPR_ADM_DAATAG = 29,
    SPR_ADM_AATAG = 30,
    SPR_ADM_APVLINEID = 31;

var SPR_AA_APPLYTO = 1,
    SPR_AA_AMOUNT = 2,
    SPR_AA_VAT = 3,
    SPR_AA_EWT = 4,
    SPR_AA_TOTALAMT = 5,
    SPR_AA_CREATEDBY = 6,
    SPR_AA_DATECREATED = 7,
    SPR_AA_STATUS = 8,
    SPR_AA_REMARKS = 9;

var //nwGridAllocValListCon
    SPR_APV_REMARKSBTN = 1,
    SPR_APV_REMARKS = 2,
    SPR_APV_SEG2CODE = 3,
    SPR_APV_SEG2DESC = 4,
    SPR_APV_SEG3CODE = 5,
    SPR_APV_SEG3DESC = 6,
    SPR_APV_SEG4CODE = 7,
    SPR_APV_SEG4DESC = 8,
    SPR_APV_SEG5CODE = 9,
    SPR_APV_SEG5DESC = 10,
    SPR_APV_SEG6CODE = 11,
    SPR_APV_SEG6DESC = 12,
    SPR_APV_ALLOCQTY = 13,
    SPR_APV_ALLOCAMT = 14,
    SPR_APV_ALLOCPRCNT = 15;

var //nwGridBdgtChargingCon
    SPR_BCD_SEG1CODE = 1,
    SPR_BCD_SEG1DESC = 2,
    SPR_BCD_SEG2CODE = 3,
    SPR_BCD_SEG2DESC = 4,
    SPR_BCD_SEG3CODE = 5,
    SPR_BCD_SEG3DESC = 6,
    SPR_BCD_SEG4CODE = 7,
    SPR_BCD_SEG4DESC = 8,
    SPR_BCD_SEG5CODE = 9,
    SPR_BCD_SEG5DESC = 10,
    SPR_BCD_SEG6CODE = 11,
    SPR_BCD_SEG6DESC = 12,
    SPR_BCD_REMQTY = 13,
    SPR_BCD_REMAMT = 14,
    SPR_BCD_QTY = 15,
    SPR_BCD_AMTVATEX = 16,
    SPR_BCD_REQALLOC = 17,
    SPR_BCD_ROWNO = 18,
    SPR_BCD_LINEID = 19,
    SPR_BCD_ALLOCDTLS = 20,
    SPR_BCD_REQLOC = 21,
    SPR_BCD_REQPC = 22,
    SPR_BCD_REQCC = 23,
    SPR_BCD_ALLOCEQUAL = 24,
    SPR_BCD_ALLOCPERCENT = 25,
    SPR_BCD_ALLOCDTLSTAG = 26,
    SPR_BCD_SEG1CODE_BGT = 27,
    SPR_BCD_SEG1DESC_BGT = 28,
    SPR_BCD_SEG2CODE_BGT = 29,
    SPR_BCD_SEG2DESC_BGT = 30,
    SPR_BCD_SEG3CODE_BGT = 31,
    SPR_BCD_SEG3DESC_BGT = 32,
    SPR_BCD_SEG4CODE_BGT = 33,
    SPR_BCD_SEG4DESC_BGT = 34,
    SPR_BCD_SEG5CODE_BGT = 35,
    SPR_BCD_SEG5DESC_BGT = 36,
    SPR_BCD_SEG6CODE_BGT = 37,
    SPR_BCD_SEG6DESC_BGT = 38,
    SPR_BCD_IGTCODE_BGT = 39,
    SPR_BCD_IGTDESC_BGT = 40,
    SPR_BCD_ITEMCODE_BGT = 41,
    SPR_BCD_ITEMDESC_BGT = 42,
    SPR_BCD_ITEMLVL_BGT = 43,
    SPR_BCD_ITEMLVLDESC_BGT = 44;

var //nwGridConsoChargingCon
    SPR_CCD_SEG1CODE = 1,
    SPR_CCD_SEG1DESC = 2,
    SPR_CCD_SEG2CODE = 3,
    SPR_CCD_SEG2DESC = 4,
    SPR_CCD_SEG3CODE = 5,
    SPR_CCD_SEG3DESC = 6,
    SPR_CCD_SEG4CODE = 7,
    SPR_CCD_SEG4DESC = 8,
    SPR_CCD_SEG5CODE = 9,
    SPR_CCD_SEG5DESC = 10,
    SPR_CCD_SEG6CODE = 11,
    SPR_CCD_SEG6DESC = 12,
    SPR_CCD_IGT = 13,
    SPR_CCD_ITEMLVL = 14,
    SPR_CCD_ITEM = 15,
    SPR_CCD_BDGTQTY = 16,
    SPR_CCD_BDGTAMT = 17,
    SPR_CCD_REQQTY = 18,
    SPR_CCD_REQAMT = 19,
    SPR_CCD_BDGTQTYAFTREQ = 20,
    SPR_CCD_BDGTAMTAFTREQ = 21;

var GRD_SEG1CODE = 1,
    GRD_SEG1DESC = 2,
    GRD_SEG2CODE = 3,
    GRD_SEG2DESC = 4,
    GRD_SEG3CODE = 5,
    GRD_SEG3DESC = 6,
    GRD_SEG4CODE = 7,
    GRD_SEG4DESC = 8,
    GRD_SEG5CODE = 9,
    GRD_SEG5DESC = 10,
    GRD_SEG6CODE = 11,
    GRD_SEG6DESC = 12,
    GRD_ITEMGRPTYPE = 13,
    GRD_ITEMLEVEL = 14,
    GRD_ITEM = 15,
    GRD_REMQTY = 16,
    GRD_BDGTAMNT = 17;

var SPR_BAC_SEG1CODE = 1,
    SPR_BAC_SEG1DESC = 2,
    SPR_BAC_SEG2 = 3,
    SPR_BAC_SEG2DESC = 4,
    SPR_BAC_SEG3 = 5,
    SPR_BAC_SEG3DESC = 6,
    SPR_BAC_SEG4 = 7,
    SPR_BAC_SEG4DESC = 8,
    SPR_BAC_SEG5 = 9,
    SPR_BAC_SEG5DESC = 10,
    SPR_BAC_SEG6 = 11,
    SPR_BAC_SEG6DESC = 12,
    SPR_BAC_ITEMGRPTYPE = 13,
    SPR_BAC_IGTDESC = 14,
    SPR_BAC_ITEMCODE = 15,
    SPR_BAC_ITEMDESC = 16,
    SPR_BAC_REMQTY = 17,
    SPR_BAC_REMBDGT = 18;

//nwGridPrepayDefCon
var SPR_DEF_AMORTDATE = 1,
    SPR_DEF_AMOUNT = 2,
    SPR_DEF_PCCC = 3,
    SPR_DEF_LINEID = 4,
    SPR_DEF_ROWNO = 5;

var SPR_DAA_IGTCODE = 1,
    SPR_DAA_IGTDESC = 2,
    SPR_DAA_ITEMCODE = 3,
    SPR_DAA_ITEMDESC = 4,
    SPR_DAA_TOTALPOAMT = 5,
    SPR_DAA_DPAMT = 6,
    SPR_DAA_POC = 7,
    SPR_DAA_APPLIEDAMT = 8;

//nwGridBdgtCtrlCon
startIndex = 1;
var BdgtCtrl = {
    GRD_BCD_SEG1: startIndex++,
    GRD_BCD_SEG1DESC: startIndex++,
    GRD_BCD_SEG2: startIndex++,
    GRD_BCD_SEG2DESC: startIndex++,
    GRD_BCD_SEG3: startIndex++,
    GRD_BCD_SEG3DESC: startIndex++,
    GRD_BCD_SEG4: startIndex++,
    GRD_BCD_SEG4DESC: startIndex++,
    GRD_BCD_SEG5: startIndex++,
    GRD_BCD_SEG5DESC: startIndex++,
    GRD_BCD_SEG6: startIndex++,
    GRD_BCD_SEG6DESC: startIndex++,
    GRD_BCD_ITEMGRPTYPE: startIndex++,
    GRD_BCD_ITEMGRPTYPEDESC: startIndex++,
    GRD_BCD_ITEM: startIndex++,
    GRD_BCD_ITEMDESC: startIndex++,
    GRD_BCD_BEFORE_QTY: startIndex++,
    GRD_BCD_BEFORE_AMNT: startIndex++,
    GRD_BCD_REQ_QTY: startIndex++,
    GRD_BCD_REQ_AMNT: startIndex++,
    GRD_BCD_AFTER_QTY: startIndex++,
    GRD_BCD_AFTER_AMNT: startIndex++,
    GRD_BCD_REMARKS: startIndex++,
    GRD_BCD_TAGISQTY: startIndex++
}

var Title = 'Payment Request Entry'

var filter = "";
var currentServerDate = "";
var tmpDocno;
var currRow;
var lineID;
var nwDocno = '';
var defaultLocCode = '';
var defaultLocDesc = '';
var defaultLocSegCode = '';
var defaultCCSegCode = '';
var prepaidAccount = '';
var basisForAging = '';
var remarksConfig = 0;
var payeeConfig = '';
var paytermCode = '';
var paytermDesc = '';
var noDays = '';
var lastsegment = '';
var controlAccountCode = '';
var controlAccountDesc = '';
var seg1Desc = '';
var basisOfAmort = '';
var upload_type = '';
var export_type = '';
var igtcode_glb = '';
var ccflag = '';
var pcflag = '';
var isAllowCurrency = '';
var isAllowTax = '';
var cd_controls = '0';
var isLevel1 = '';
var recuser_glb = '';
var allowTaxPerTrantype = '';
var withADV = '';
var currADV = '';
var inputConfig = '';
var docno_glb = '';
var rvwattachtag = '';
var withAdvs = '';
var isHeader = '';
var isCDRC = false;
var rowCD = '';
var rownoCD = '';
var _rowBCD = '';
var allowBackdate = '';
var allowFuture = '';

//JSON Strings
var jsonDelDtls =[];
var jsonDelDtlsFiltered = [];
var jsonAllocProc = [];
var jsonAllocProcFiltered = [];
var jsonRecurDtls = [];
var jsonRecurDtlsFiltered = [];
var jsonPrepayDtls = [];
var jsonPrepayDtlsFiltered = [];
var jsonExpenseAlloc = [];
var jsonExpenseAllocFiltered = [];
var jsonCommonSegments = [];
var jsonPerDates = [];
var jsonPerDatesClosing = [];

var isGridClick = false;
var isNewData = true;
var taxConvert = '';
var isResetTax = false;
var rtw = false;
var isLoadHstTemp = false;
var isBtnDone = false;
var isSaveTmpCD = false;
var hasAdv = false;
var withPrepay = false;
var isCopyRow = false;

var nwGridCon_Book;
var nwGridCon_Sheet;
var nwGridChargeDtlsCon_Book;
var nwGridChargeDtlsCon_Sheet;
var nwGridConPD_Book;
var nwGridConPD_Sheet;
var nwGridJournalCon_Book;
var nwGridJournalCon_Sheet;
var nwGridHoldHstCon_Book;
var nwGridHoldHstCon_Sheet;
var nwGridProcessCon_Book;
var nwGridProcessCon_Sheet;
var nwGridPrepaymentCon_Book;
var nwGridPrepaymentCon_Sheet;
var nwGridPrepayDefCon_Book;
var nwGridPrepayDefCon_Sheet;
var nwGridApplyAdvDMCon_Book;
var nwGridApplyAdvDMCon_Sheet;
var nwGridAllocProcessCon_Book;
var nwGridAllocProcessCon_Sheet;
var nwGridBdgtChargingCon_Book;
var nwGridBdgtChargingCon_Sheet;
var nwGridBgtAcctCombCon_Book;
var nwGridBgtAcctCombCon_Sheet;
var nwGridBgtChkDtlsCon_Book;
var nwGridBgtChkDtlsCon_Sheet;
var nwGridConsoChargingCon_Book;
var nwGridConsoChargingCon_Sheet;
var nwGridJrnlCon_Book;
var nwGridJrnlCon_Sheet;
var nwGridExpenseCon_Book;
var nwGridExpenseCon_Sheet;
var nwBudgetCtrlDetailsCon_Book;
var nwBudgetCtrlDetailsCon_Sheet;
var nwGridAppAmtCon_Book;
var nwGridAppAmtCon_Sheet;
var nwGridPCCCAllocCon_Book;
var nwGridPCCCAllocCon_Sheet;
var nwGridPRFUPCon_Book;
var nwGridPRFUPCon_Sheet;
var nwGridValListCon_Book;
var nwGridValListCon_Sheet;
var nwGridAllocValListCon_Book;
var nwGridAllocValListCon_Sheet;

function func_Reload() {
    crLnk = GetCurrentURL() + "APPaymentRequestEntry_Gateway";
    crLnkGateKey = "APPaymentRequestEntry";
    crnwTagSingleBind = true;

    nwDocno = getParameterByName('nwDocno');

    nwPopupForm_Create("process", true);
    nwPopupForm_Create("nwRequestType", true);
    nwPopupForm_Create("AlterPayee", true);
    nwPopupForm_Create("AllocProcess", true); 
    nwPopupForm_Create("nwPCCCAlloc", true);
    nwPopupForm_Create("ViewJournal", true);
    nwPopupForm_Create("ExpenseAlloc", true); 
    nwPopupForm_Create("nwUploadCon", false); 
    nwPopupForm_Create("nwValidationList", true); 
    nwPopupForm_Create("nwRemarks1", false); 
    nwPopupForm_Create("nwBudgetCtrlDetails", true); 
    nwPopupForm_Create("LoadHstTemplate", false); 
    nwPopupForm_Create("ApplyAdvDM", true); 
    nwPopupForm_Create("AppliedAmt", true);
    nwPopupForm_Create("nwValidationList_Alloc", false);
    nwPopupForm_Create("nwCreateSBR", true);
    nwPopupForm_Create("nwBdgtCheckingWindow", true);
    nwPopupForm_Create("ViewConsoCharging", true);
    nwPopupForm_Create("DefAppliedAmt", true); 
    
    $('#tab-main-one, #tab-main-two, #tab-main-three, #tab-main-four, #tab-main-five, #tab-main-six, #tab-main-seven').prop('checked', true);
    $("#rdbAmortEqually_PD").prop("checked", true);
    //if (nwDocno == '') {
    //    nwPopupForm_ShowModal("nwRequestType");
    //}    
    //$(".BoxClose").hide();    
    
    var isContinue = true;
    init_request();
    DisableFields();
    ReqReason();   
    ToolBoxGetData = false;
    $("#rdbAmortEqually_PD").prop("checked", true);
    return isContinue;
}

////////////////////////// TOol Box
function mainLoad() {
    nwParameter_Add("nwDocno", nwDocno);
    if (nwDocno != '') {
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox").visible(false);
        $(`.btnCreateSBR`).enable(false);
        //$(".noah-webui-default-Content_Container").enable(false);
    }
}

function nwDocnoDisabled() {
    if (nwDocno != '') {        
        //$("#content_HDR").enable(false);
    }
}

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    //if (rtw) {
        //nwPopupForm_ShowModal("nwRequestType");
    //}    
    ReqReason();
    isGridClick = true;
    isNewData = true;    
    cd_controls = '0';
    //$("#noah-webui-Toolbox-BindingNavigator").enable(false);

    return isContinue;
}

function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    if (isNewData == true && jsonDelDtls.length <= 0) {
        parent_MessageBoxQuestionToolBox("Charging Details is not yet saved. Are you sure you want to proceed?", Title, "", indef, enume);
    }
    else {
        parent_MessageBoxQuestionToolBox("Do you want to save the current record?", Title, "", indef, enume);
    }
    
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", Title, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    isGridClick = true;
    var isContinue = true;
    cust_GetPara();
    isRefreshed = true;
    rtw = true;
    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    var x = $("#noah-webui-Toolbox").bindingProcess().enable();

    if (x == true) {
        if ($("#txtTranType").val() == "PRFDRT") {
            cust_GetPara();
            parent_MessageBoxQuestionToolBox("Do you want to process the current record?", Title, "", indef, enume);
            isContinue = false;
        }
        else {
            //$(".BoxClose").show();
            nwPopupForm_ShowModal("process");
            //$("#dimbgNWprocess").hide();
        }
    }

    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxPrint(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxClosing(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxSearch(indef, enume) {
    var isContinue = true;
    isContinue = false;
    return isContinue;
}

///////////////////// Bind tool
function cust_GetPara() {
    nwParameter_Add("filter", filter);
    nwParameter_Add("txtDocno", $('#txtDocno').val());    
    nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls));
    nwParameter_Add("jsonAllocProc", JSON.stringify(jsonAllocProc));
    nwParameter_Add("jsonRecurDtls", JSON.stringify(jsonRecurDtls));
    nwParameter_Add("jsonPrepayDtls", JSON.stringify(jsonPrepayDtls));
    nwParameter_Add("idvallugLocAcctForms", $("#idvallugLocAcctForms").val());
    nwParameter_Add("idvallugVendorPayee", $("#idvallugVendorPayee").val());
    nwParameter_Add("idvallugCurrency", $("#idvallugCurrency").val());
    nwParameter_Add("idvallugRsnReq", $("#idvallugRsnReq").val());
    nwParameter_Add("idvallugAPCtrlAccnt", $("#idvallugAPCtrlAccnt").val());
    nwParameter_Add("cmbPaymentRqstSubType", $("#cmbPaymentRqstSubType").val());
    nwParameter_Add("txtCheckPayeeName", $("#txtCheckPayeeName").val());
    nwParameter_Add("txtAlterPayeeName", $("#txtAlterPayeeName").val());
    nwParameter_Add("cmbPaymentRqstType", $("#cmbPaymentRqstType").val());
    nwParameter_Add("idvallugPayeeSubType", $("#idvallugPayeeSubType").val());
    nwParameter_Add("idvallugOrigCCC", $("#idvallugOrigCCC").val());
    nwParameter_Add("txtRemarks", $("#txtRemarks").val());
    nwParameter_Add("txtOthrPayIns", $("#txtOthrPayIns").val());
    nwParameter_Add("chkAltPayee", $("#chkAltPayee").is(":checked"));
    nwParameter_Add("chkHoldPay", $("#chkHoldPay").is(":checked"));
    nwParameter_Add("txtRemarksHold", $("#txtRemarksHold").val());
    nwParameter_Add("chkWithSI", $("#chkWithSI").is(":checked"));
    nwParameter_Add("chkADA", $("#chkADA").is(":checked"));
    nwParameter_Add("txtNetAmt_TranHist", $("#txtNetAmt_TranHist").val());
    nwParameter_Add("txtNetAmt_LocalCurr", $("#txtNetAmt_LocalCurr").val());
    nwParameter_Add("txtDocDate", $("#txtDocDate").val());
    nwParameter_Add("txtTranType", $("#txtTranType").val());
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("isLoadHstTemp", isLoadHstTemp);
    nwParameter_Add("isSaveTmpCD", isSaveTmpCD);
    nwParameter_Add("txtDocnoHstTemp", $("#txtDocnoHstTemp").val());
    nwParameter_Add("txtPayeeType", $('#txtPayeeType').val());
    nwParameter_Add("txtReasonType", $('#txtReasonType').val());
    nwParameter_Add("txtBasisAging", $('#txtBasisAging').val());
    nwParameter_Add("withPrepay", withPrepay);
    nwParameter_Add("withAdvs", withAdvs);
    nwParameter_Add("txtValueDate", $("#txtValueDate").val());    
    //nwParameter_Add_Table("nwGridCon");
    nwParameter_Add_Spread(nwGridCon_Book);
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    isNewData = false;
    taxConvert = "1";
    cust_GetPara();
    RefreshData();
    nwLoading_Start("actbindcollection", crLoadingHTML);
    nwParameter_Add("isNewData", isNewData);
    nwParameter_Add("taxConvert", taxConvert);
    func_ActionDriven("actBindCollection", true);    
    $("#noah-webui-Toolbox-BindingNavigator").enable(true);
}


function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("actbindcollection", crLoadingHTML);
	DisableFieldsEmpty();
	func_ActionDriven("actBindCollectionEmpty", false);
}

function DisableFieldsEmpty() {
    DisableFields();
    $("#chkHoldPay").enable(true);
    $("#chkWithSI").enable(false);
    $("#chkADA").enable(true);
    $("#nwGridCon").enable(false);
    $("#noah-webui-Toolbox").bindingNew().enable(true); 
	$("#noah-webui-Toolbox").bindingDelete().visible(true);     
    $("#noah-webui-Toolbox").bindingExport().enable(false);   
    $("#noah-webui-Toolbox").bindingInquire().enable(false);   
    $("#noah-webui-Toolbox").bindingDelete().enable(false);   
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingPrint().visible(true);
    $("#noah-webui-Toolbox").bindingPrint().enable(false);
    $("#btnLoadHstTemp").enable(false);
    $("#btnUploadTemplate").enable(false);
    $("#btnDownloadTemplate").enable(false);
    $("#btnLoadHstTemp").enable(false);
    $("#btnLoadRecurTran").enable(false);
    $("#btnReqCompHDR").enable(false);
    $("#btnReqCompHDR").addClass("btn-default-gray");

}


///////////////////////////////////////

var temp_crnwTR = "";
var _idNum = "";
var isbuttonclick = false;

function cust_LookupButton() {
    isbuttonclick = true;
}
function Lookup_DoneFunction(idName, idNum) {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var col = Grid.CellSelected.col - 1;

    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;
    var rowCD = GridCD.CellSelected.row - 1;
    var colCD = GridCD.CellSelected.col - 1;
    if (idName == 'toolboxInquire') {
        cust_GetPara();
    }
    if (idName == 'lugLoadHstTemp') {

        if (isbuttonclick) {
            isbuttonclick = false;
            ViewPRFEntry(getGridData(idNum, 0));

            //$('#nwPopWindow').addClass("zindexHigh"); $('#dimbgNWLoadHstTemplate').addClass("zindexHigh2");
            return false;
        }
        else {
            nwLoading_Start("xactLoadHistTemp", crLoadingHTML);
            nwPopupForm_HideModal("LoadHstTemplate");
            nwParameter_Add("txtDocno", getGridData(idNum, 0));
            isLoadHstTemp = true;
            ClearChargingDtlsCol();
            func_ActionDriven("actLoadHistTemp", false);
        }
    }
    if (idName == 'lugLoadRecurTran') {

        if (isbuttonclick) {
            isbuttonclick = false;
            ViewPRFEntry(getGridData(idNum, 0));
            //$('#nwPopWindow').addClass("zindexHigh");
            return false;
        }
        else {
            nwLoading_Start("xactLoadRecurTran", crLoadingHTML);            
            nwParameter_Add("txtDocno", getGridData(idNum, 0));
            isLoadHstTemp = true;
            $("#txtRecurDocno").val(getGridData(idNum, 0));
            $("#txtRecurNo").val(getGridData(idNum, 10));
            $("#txtRecurLineID").val(getGridData(idNum, 9));
            func_ActionDriven("actLoadRecurTran", false);
        }
    }
    if (idName == 'lugVendorPayee') {
        if (isbuttonclick) {
            isbuttonclick = false;
            ViewVendorInfo(getGridData(idNum, 0), getGridData(idNum, 4));
            //$('#nwPopVendorInfoWindow').addClass("zindexHigh");
            return false;
        }
        else {
            basisForAging = getGridData(idNum, 13);

            if (basisForAging == "") {
                MessageBox("Cannot proceed. Basis for Aging is required for the selected Vendor.", Title, "error");
                ClearVendorRelatedFields();
                return;
            }
            else {
                var bfa = $("#txtBasisAging").val();
                //nwtbl = $("#nwGridCon .tblGridBody");
                //var itemcount = nwtbl.find("tr").length;
                var refnoList = '';
                //for (var i = 0; i < itemcount ; i++) {
                //    if (nwtbl.find("tr:eq(" + i + ")").find("td:eq(" + (SPR_REFNO) + ") input").val() != "") {
                //        refnoList += nwtbl.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ") input").val() + "|";
                //    }
                //}
                var Grid = nwGridCon_Book.ActiveSheet;              
                var itemcount = Grid.GetMaxRow();
                for (var i = 0; i < itemcount ; i++) {                  
                    if (Grid.GetValue(SPR_REFNO - 1, i) != "") {
                        refnoList += Grid.GetValue(SPR_REFNO - 1, i) + "|";
                    }
                }

                //nwcdtbl = $("#nwGridChargeDtlsCon .tblGridBody");
                //var cntCD = nwcdtbl.find("tr").length;
                var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;
                var cntCD = GridCD.GetMaxRow();
                var igtList = '';
                for (var i = 0; i < cntCD ; i++) {
                    if (GridCD.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, i) != "") {
                        igtList += GridCD.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, i) + "|";
                    }
                }
                //for (var i = 0; i < cntCD ; i++) {
                //    if (nwcdtbl.find("tr:eq(" + i + ")").find("td:eq(" + (SPR_CD_ITEMGRPTYPECODE) + ")").text() != "") {
                //        igtList += nwcdtbl.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text() + "|";
                //    }
                //}
                let origvendorcode = $("#txtVendorCode").val();
                let currvendor = getGridData(idNum, 0);

                if (basisForAging != bfa && bfa != "" && refnoList != "") {
                    msgBoxContainerQuestion = "VendorValidation";
                    parent_MessageBoxQuestion("This will clear all line details selected.\n Are you sure you want to continue?", "Payment Request Entry", "Question");
                    _idNum = idNum;
                }
                else if (origvendorcode != currvendor && igtList != "") {
                    msgBoxContainerQuestion = "VendorCDValidation";
                    parent_MessageBoxQuestion("This will reset Charging Details.\n Are you sure you want to continue?", "Payment Request Entry", "Question");
                    _idNum = idNum;
                }
                else {
                    LoadVendorDetails(idNum);
                }
            }
        }
    }
    //if (idName == 'lugRefNo') {
    //    crnwTR.find("td:eq(" + SPR_REFTRANNO + ")").text(getGridData(idNum, 0));
    //    crnwTR.find("td:eq(" + SPR_REFTRANDATE + ")").text(getGridData(idNum, 1));
    //    crnwTR.find("td:eq(" + SPR_REFNO + ") input").val(getGridData(idNum, 2));
    //    crnwTR.find("td:eq(" + SPR_REFDATE + ") input").val(getGridData(idNum, 3));
    //    crnwTR.find("td:eq(" + SPR_DRNO + ") input").val(getGridData(idNum, 4));
    //    crnwTR.find("td:eq(" + SPR_DRDATE + ") input").val(getGridData(idNum, 5));
    //    crnwTR.find("td:eq(" + SPR_PAYMENTTERMCODE + ")").text(getGridData(idNum, 6));
    //    crnwTR.find("td:eq(" + SPR_PAYMENTTERMDESC + ")").text(getGridData(idNum, 7));
    //    crnwTR.find("td:eq(" + SPR_GROSSAMT + ") input").val(getGridData(idNum, 8));
    //    crnwTR.find("td:eq(" + SPR_FOREXRATEDATE + ")").text(getGridData(idNum, 9));

    //    nwGridCon_Book.ActiveSheet.SetText(SPR_REFTRANNO - 1, row, "Hello");

    //    var row = crnwTR.index();
    //    setforex(getGridData(idNum, 3), row, getGridData(idNum, 8));
    //}
    if (idName == 'lugPayTerm') {
        //crnwTR.find("td:eq(" + SPR_PAYMENTTERMCODE + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_PAYMENTTERMDESC + ")").text(getGridData(idNum, 1));
        //crnwTR.find("td:eq(" + SPR_NOOFDAYS + ")").text(getGridData(idNum, 2));
        Grid.SetText(SPR_PAYMENTTERMCODE - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_PAYMENTTERMDESC - 1, row, getGridData(idNum, 1));
        Grid.SetText(SPR_NOOFDAYS - 1, row, getGridData(idNum, 2));

        basisForAging = $("#txtBasisAging").val();
        if (basisForAging == "INVDATE") {
            GetDueDate(Grid.GetValue(SPR_REFDATE - 1, row));
            //GetDueDate(crnwTR.find("td:eq(" + SPR_REFDATE + ") input").val());
        }
        else if (basisForAging == "CNTDATE") {
            GetDueDate(Grid.GetValue(SPR_COUNTERDATE - 1, row));
            //GetDueDate(crnwTR.find("td:eq(" + SPR_COUNTERDATE + ") input").val());
        }
        else if (basisForAging == "VALDATE") {
            GetDueDate($("#txtServerdate").val());
        }
        else if (basisForAging == "CREDATE") {
            GetDueDate($("#txtServerdate").val());
        }
    }
    if (idName == 'lugIGTCode') {
        let validation_adv = getGridData(idNum, 13);
        if (validation_adv == '0') {
            MessageBox("Cannot proceed. Payee has existing unliquidated advances.", "Charging Details", "error");
            return;
        }
        else {
            if (igtcode_glb != getGridData(idNum, 0)) {
                //crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text("");
                //crnwTR.find("td:eq(" + SPR_CD_ITEMDESC + ")").text("");
                //crnwTR.find("td:eq(" + SPR_CD_UOM + ")").text("");
                GridCD.SetText(SPR_CD_ITEMCODE - 1, rowCD, "");
                GridCD.SetText(SPR_CD_ITEMDESC - 1, rowCD, "");
                GridCD.SetText(SPR_CD_UOM - 1, rowCD, "");
            }
            //crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text(getGridData(idNum, 0));
            //crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPEDESC + ")").text(getGridData(idNum, 1));
            //crnwTR.find("td:eq(" + SPR_CD_VATCODE + ")").text(getGridData(idNum, 3));
            //crnwTR.find("td:eq(" + SPR_CD_VATSHORTDESC + ")").text(getGridData(idNum, 4));
            //crnwTR.find("td:eq(" + SPR_CD_EWTCODE + ")").text(getGridData(idNum, 5));
            //crnwTR.find("td:eq(" + SPR_CD_EWTSHORTDESC + ")").text(getGridData(idNum, 6));
            GridCD.SetText(SPR_CD_ITEMGRPTYPECODE - 1, rowCD, getGridData(idNum, 0));
            GridCD.SetText(SPR_CD_ITEMGRPTYPEDESC - 1, rowCD, getGridData(idNum, 1));
            GridCD.SetText(SPR_CD_VATCODE - 1, rowCD, getGridData(idNum, 3));
            GridCD.SetText(SPR_CD_VATSHORTDESC - 1, rowCD, getGridData(idNum, 4));
            GridCD.SetText(SPR_CD_EWTCODE - 1, rowCD, getGridData(idNum, 5));
            GridCD.SetText(SPR_CD_EWTSHORTDESC - 1, rowCD, getGridData(idNum, 6));

            //let ucostvatin = getNumReplace(crnwTR.find("td:eq(" + SPR_CD_UNITCOST_VATIN + ") input").val());
            let ucostvatin = getNumReplace(GridCD.GetValue(SPR_CD_UNITCOST_VATIN - 1, rowCD));
           
            if (ucostvatin == 0 && rowCD == 0) {
                //crnwTR.find("td:eq(" + SPR_CD_QTY + ") input").val("1.00");
                //crnwTR.find("td:eq(" + SPR_CD_UNITCOST_VATIN + ") input").val(setNumReplace($("#txtGrossAmt_CD").val(), 5));
                GridCD.SetText(SPR_CD_QTY - 1, rowCD, "1.00");
                GridCD.SetText(SPR_CD_UNITCOST_VATIN - 1, rowCD, $("#txtGrossAmt_CD").val());
            }
            GridCD.SetText(SPR_CD_SEG2 - 1, rowCD, jsonCommonSegments[0]["com2Code"]);
            GridCD.SetText(SPR_CD_SEG2DESC - 1, rowCD, jsonCommonSegments[0]["com2Desc"]);
            GridCD.SetText(SPR_CD_SEG3 - 1, rowCD, jsonCommonSegments[0]["com3Code"]);
            GridCD.SetText(SPR_CD_SEG3DESC - 1, rowCD, jsonCommonSegments[0]["com3Desc"]);
            GridCD.SetText(SPR_CD_SEG4 - 1, rowCD, jsonCommonSegments[0]["com4Code"]);
            GridCD.SetText(SPR_CD_SEG4DESC - 1, rowCD, jsonCommonSegments[0]["com4Desc"]);
            GridCD.SetText(SPR_CD_SEG5 - 1, rowCD, jsonCommonSegments[0]["com5Code"]);
            GridCD.SetText(SPR_CD_SEG5DESC - 1, rowCD, jsonCommonSegments[0]["com5Desc"]);
            GridCD.SetText(SPR_CD_SEG6 - 1, rowCD, jsonCommonSegments[0]["com6Code"]);
            GridCD.SetText(SPR_CD_SEG6DESC - 1, rowCD, jsonCommonSegments[0]["com6Desc"]);
            //crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text(jsonCommonSegments[0]["com2Code"]);
            //crnwTR.find("td:eq(" + SPR_CD_SEG2DESC + ")").text(jsonCommonSegments[0]["com2Desc"]);
            //crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text(jsonCommonSegments[0]["com3Code"]);
            //crnwTR.find("td:eq(" + SPR_CD_SEG3DESC + ")").text(jsonCommonSegments[0]["com3Desc"]);
            //crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text(jsonCommonSegments[0]["com4Code"]);
            //crnwTR.find("td:eq(" + SPR_CD_SEG4DESC + ")").text(jsonCommonSegments[0]["com4Desc"]);
            //crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text(jsonCommonSegments[0]["com5Code"]);
            //crnwTR.find("td:eq(" + SPR_CD_SEG5DESC + ")").text(jsonCommonSegments[0]["com5Desc"]);
            //crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text(jsonCommonSegments[0]["com6Code"]);
            //crnwTR.find("td:eq(" + SPR_CD_SEG6DESC + ")").text(jsonCommonSegments[0]["com6Desc"]);

            GridCD.SetText(SPR_CD_SEG1 - 1, rowCD, getGridData(idNum, 9));
            GridCD.SetText(SPR_CD_SEG1DESC - 1, rowCD, getGridData(idNum, 10));
            //crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text(getGridData(idNum, 9));
            //crnwTR.find("td:eq(" + SPR_CD_SEG1DESC + ")").text(getGridData(idNum, 10));
            lastsegment = getGridData(idNum, 2);
            if (lastsegment == "04") {
                //crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text(getGridData(idNum, 7));
                //crnwTR.find("td:eq(" + SPR_CD_SEG4DESC + ")").text(getGridData(idNum, 8));
                GridCD.SetText(SPR_CD_SEG4 - 1, rowCD, getGridData(idNum, 7));
                GridCD.SetText(SPR_CD_SEG4DESC - 1, rowCD, getGridData(idNum, 8));
            }
            else if (lastsegment == "05") {
                //crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text(getGridData(idNum, 7));
                //crnwTR.find("td:eq(" + SPR_CD_SEG5DESC + ")").text(getGridData(idNum, 8));
                GridCD.SetText(SPR_CD_SEG5 - 1, rowCD, getGridData(idNum, 7));
                GridCD.SetText(SPR_CD_SEG5DESC - 1, rowCD, getGridData(idNum, 8));
            }
            else if (lastsegment == "06") {
                //crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text(getGridData(idNum, 7));
                //crnwTR.find("td:eq(" + SPR_CD_SEG6DESC + ")").text(getGridData(idNum, 8));
                GridCD.SetText(SPR_CD_SEG6 - 1, rowCD, getGridData(idNum, 7));
                GridCD.SetText(SPR_CD_SEG6DESC - 1, rowCD, getGridData(idNum, 8));
            }

            switch (defaultLocSegCode) {
                case "02":
                    GridCD.SetText(SPR_CD_SEG2 - 1, rowCD, defaultLocCode);
                    GridCD.SetText(SPR_CD_SEG2DESC - 1, rowCD, defaultLocDesc);
                    GridCD.SetEnable(SPR_CD_SEG2 - 1, rowCD, false);
                    GridCD.SetEnable(SPR_CD_SEG2DESC - 1, rowCD, false);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG2 + ')').text(defaultLocCode);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG2DESC + ')').text(defaultLocDesc);                   
                    //crnwTR.find('td:eq(' + SPR_CD_SEG2 + ')').enable(false);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG2DESC + ')').enable(false);
                    break;
                case "03":
                    GridCD.SetText(SPR_CD_SEG3 - 1, rowCD, defaultLocCode);
                    GridCD.SetText(SPR_CD_SEG3DESC - 1, rowCD, defaultLocDesc);
                    GridCD.SetEnable(SPR_CD_SEG3 - 1, rowCD, false);
                    GridCD.SetEnable(SPR_CD_SEG3DESC - 1, rowCD, false);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG3 + ')').text(defaultLocCode);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG3DESC + ')').text(defaultLocDesc);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG3 + ')').enable(false);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG3DESC + ')').enable(false);
                    break;
                case "04":
                    GridCD.SetText(SPR_CD_SEG4 - 1, rowCD, defaultLocCode);
                    GridCD.SetText(SPR_CD_SEG4DESC - 1, rowCD, defaultLocDesc);
                    GridCD.SetEnable(SPR_CD_SEG4 - 1, rowCD, false);
                    GridCD.SetEnable(SPR_CD_SEG4DESC - 1, rowCD, false);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG4 + ')').text(defaultLocCode);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG4DESC + ')').text(defaultLocDesc);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG4 + ')').enable(false);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG4DESC + ')').enable(false);
                    break;
                case "05":
                    GridCD.SetText(SPR_CD_SEG5 - 1, rowCD, defaultLocCode);
                    GridCD.SetText(SPR_CD_SEG5DESC - 1, rowCD, defaultLocDesc);
                    GridCD.SetEnable(SPR_CD_SEG5 - 1, rowCD, false);
                    GridCD.SetEnable(SPR_CD_SEG5DESC - 1, rowCD, false);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG5 + ')').text(defaultLocCode);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG5DESC + ')').text(defaultLocDesc);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG5 + ')').enable(false);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG5DESC + ')').enable(false);
                    break;
                case "06":
                    GridCD.SetText(SPR_CD_SEG6 - 1, rowCD, defaultLocCode);
                    GridCD.SetText(SPR_CD_SEG6DESC - 1, rowCD, defaultLocDesc);
                    GridCD.SetEnable(SPR_CD_SEG6 - 1, rowCD, false);
                    GridCD.SetEnable(SPR_CD_SEG6DESC - 1, rowCD, false);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG6 + ')').text(defaultLocCode);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG6DESC + ')').text(defaultLocDesc);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG6 + ')').enable(false);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG6DESC + ')').enable(false);
                    break;
            }
            let costcenterCode = $("#idvallugOrigCCC").val();
            let costcenterDesc = $("#descvallugOrigCCC").val();
            switch (defaultCCSegCode) {
                case "02":
                    //crnwTR.find('td:eq(' + SPR_CD_SEG2 + ')').text(costcenterCode);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG2DESC + ')').text(costcenterDesc);
                    GridCD.SetText(SPR_CD_SEG2 - 1, rowCD, costcenterCode);
                    GridCD.SetText(SPR_CD_SEG2DESC - 1, rowCD, costcenterDesc);
                    break;
                case "03":
                    //crnwTR.find('td:eq(' + SPR_CD_SEG3 + ')').text(costcenterCode);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG3DESC + ')').text(costcenterDesc);
                    GridCD.SetText(SPR_CD_SEG3 - 1, rowCD, costcenterCode);
                    GridCD.SetText(SPR_CD_SEG3DESC - 1, rowCD, costcenterDesc);
                    break;
                case "04":
                    //crnwTR.find('td:eq(' + SPR_CD_SEG4 + ')').text(costcenterCode);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG4DESC + ')').text(costcenterDesc);
                    GridCD.SetText(SPR_CD_SEG4 - 1, rowCD, costcenterCode);
                    GridCD.SetText(SPR_CD_SEG4DESC - 1, rowCD, costcenterDesc);
                    break;
                case "05":
                    //crnwTR.find('td:eq(' + SPR_CD_SEG5 + ')').text(costcenterCode);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG5DESC + ')').text(costcenterDesc);
                    GridCD.SetText(SPR_CD_SEG5 - 1, rowCD, costcenterCode);
                    GridCD.SetText(SPR_CD_SEG5DESC - 1, rowCD, costcenterDesc);
                    break;
                case "06":
                    //crnwTR.find('td:eq(' + SPR_CD_SEG6 + ')').text(costcenterCode);
                    //crnwTR.find('td:eq(' + SPR_CD_SEG6DESC + ')').text(costcenterDesc);
                    GridCD.SetText(SPR_CD_SEG6 - 1, rowCD, costcenterCode);
                    GridCD.SetText(SPR_CD_SEG6DESC - 1, rowCD, costcenterDesc);
                    break;
            }
            nwParameter_Add("idvallugRsnReq", $("#idvallugRsnReq").val());
            nwParameter_Add("igtCode", getGridData(idNum, 0));
            //nwParameter_Add("currRow", crnwTR.index());
            nwParameter_Add("currRow", row);
            nwParameter_Add("lastSegment", lastsegment);
            nwParameter_Add("vatCode", getGridData(idNum, 3));
            nwParameter_Add("ewtCode", getGridData(idNum, 5));
            //nwParameter_Add("vatIN", crnwTR.find('td:eq(' + SPR_CD_UNITCOST_VATIN + ') input').val());
            nwParameter_Add("vatIN", getNumReplace(GridCD.GetValue(SPR_CD_UNITCOST_VATIN - 1, rowCD)));
            //nwParameter_Add("qty", crnwTR.find('td:eq(' + SPR_CD_QTY + ') input').val());
            nwParameter_Add("qty", getNumReplace(GridCD.GetValue(SPR_CD_QTY - 1, rowCD)));
            //nwParameter_Add_Table("nwGridChargeDtlsCon");
            nwParameter_Add_Spread(nwGridChargeDtlsCon_Book);
            func_ActionDriven("actLoadCashFlow", false);
            GridCD.SetText(SPR_CD_REQSLTYPE - 1, rowCD, getGridData(idNum, 11));
            GridCD.SetText(SPR_CD_REQSUBACCNT - 1, rowCD, getGridData(idNum, 12));
            //crnwTR.find('td:eq(' + SPR_CD_REQSLTYPE + ')').text(getGridData(idNum, 11));
            //crnwTR.find('td:eq(' + SPR_CD_REQSUBACCNT + ')').text(getGridData(idNum, 12));
            ReqSLSA(getGridData(idNum, 11), getGridData(idNum, 12));
            GetAccountDescription();
        }        
    }
    if (idName == 'lugItemCode') {
        if (isbuttonclick) {
            isbuttonclick = false;
            ViewItemMaster(getGridData(idNum, 0));
            //$('#nwPopItemMasterWindow').addClass("zindexHigh");
            return false;
        }
        else {
            let validation_adv = getGridData(idNum, 18);
            if (validation_adv == '0') {
                MessageBox("Cannot proceed. Payee has existing unliquidated advances.", "Charging Details", "error");
                return;
            }
            else {
                //crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text(getGridData(idNum, 0));
                //crnwTR.find("td:eq(" + SPR_CD_ITEMDESC + ")").text(getGridData(idNum, 1));
                //crnwTR.find("td:eq(" + SPR_CD_UOM + ")").text(getGridData(idNum, 2));
                //crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text(getGridData(idNum, 3));
                //crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPEDESC + ")").text(getGridData(idNum, 4));
                //crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text(getGridData(idNum, 8));
                //crnwTR.find("td:eq(" + SPR_CD_SEG1DESC + ")").text(getGridData(idNum, 9));
                //crnwTR.find("td:eq(" + SPR_CD_VATCODE + ")").text(getGridData(idNum, 13));
                //crnwTR.find("td:eq(" + SPR_CD_VATSHORTDESC + ")").text(getGridData(idNum, 14));
                //crnwTR.find("td:eq(" + SPR_CD_EWTCODE + ")").text(getGridData(idNum, 15));
                //crnwTR.find("td:eq(" + SPR_CD_EWTSHORTDESC + ")").text(getGridData(idNum, 16));
                Grid.SetText(SPR_CD_ITEMCODE - 1, row, getGridData(idNum, 0));
                Grid.SetText(SPR_CD_ITEMDESC - 1, row, getGridData(idNum, 1));
                Grid.SetText(SPR_CD_UOM - 1, row, getGridData(idNum, 2));
                Grid.SetText(SPR_CD_ITEMGRPTYPECODE - 1, row, getGridData(idNum, 3));
                Grid.SetText(SPR_CD_ITEMGRPTYPEDESC - 1, row, getGridData(idNum, 4));
                Grid.SetText(SPR_CD_SEG1 - 1, row, getGridData(idNum, 8));
                Grid.SetText(SPR_CD_SEG1DESC - 1, row, getGridData(idNum, 9));
                Grid.SetText(SPR_CD_VATCODE - 1, row, getGridData(idNum, 13));
                Grid.SetText(SPR_CD_VATSHORTDESC - 1, row, getGridData(idNum, 14));
                Grid.SetText(SPR_CD_EWTCODE - 1, row, getGridData(idNum, 15));
                Grid.SetText(SPR_CD_EWTSHORTDESC - 1, row, getGridData(idNum, 16));

                //let ucostvatin = getNumReplace(crnwTR.find("td:eq(" + SPR_CD_UNITCOST_VATIN + ") input").val());
                let ucostvatin = getNumReplace(Grid.GetValue(SPR_CD_UNITCOST_VATIN - 1, row));
                if (ucostvatin == 0 && row == 0) {
                    Grid.SetText(SPR_CD_QTY - 1, row, getGridData(idNum, 16));
                    Grid.SetText(SPR_CD_UNITCOST_VATIN - 1, row, getGridData(idNum, 16));
                    //crnwTR.find("td:eq(" + SPR_CD_QTY + ") input").val("1.00");
                    //crnwTR.find("td:eq(" + SPR_CD_UNITCOST_VATIN + ") input").val(setNumReplace($("#txtGrossAmt_CD").val(), 5));
                }
                Grid.SetText(SPR_CD_SEG2 - 1, row, jsonCommonSegments[0]["com2Code"]);
                Grid.SetText(SPR_CD_SEG2DESC - 1, row, jsonCommonSegments[0]["com2Code"]);
                Grid.SetText(SPR_CD_SEG3 - 1, row, jsonCommonSegments[0]["com2Code"]);
                Grid.SetText(SPR_CD_SEG3DESC - 1, row, jsonCommonSegments[0]["com2Code"]);
                Grid.SetText(SPR_CD_SEG4 - 1, row, jsonCommonSegments[0]["com2Code"]);
                Grid.SetText(SPR_CD_SEG4DESC - 1, row, jsonCommonSegments[0]["com2Code"]);
                Grid.SetText(SPR_CD_SEG5 - 1, row, jsonCommonSegments[0]["com2Code"]);
                Grid.SetText(SPR_CD_SEG5DESC - 1, row, jsonCommonSegments[0]["com2Code"]);
                Grid.SetText(SPR_CD_SEG6 - 1, row, jsonCommonSegments[0]["com2Code"]);
                Grid.SetText(SPR_CD_SEG6DESC - 1, row, jsonCommonSegments[0]["com2Code"]);
                //crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text(jsonCommonSegments[0]["com2Code"]);
                //crnwTR.find("td:eq(" + SPR_CD_SEG2DESC + ")").text(jsonCommonSegments[0]["com2Desc"]);
                //crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text(jsonCommonSegments[0]["com3Code"]);
                //crnwTR.find("td:eq(" + SPR_CD_SEG3DESC + ")").text(jsonCommonSegments[0]["com3Desc"]);
                //crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text(jsonCommonSegments[0]["com4Code"]);
                //crnwTR.find("td:eq(" + SPR_CD_SEG4DESC + ")").text(jsonCommonSegments[0]["com4Desc"]);
                //crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text(jsonCommonSegments[0]["com5Code"]);
                //crnwTR.find("td:eq(" + SPR_CD_SEG5DESC + ")").text(jsonCommonSegments[0]["com5Desc"]);
                //crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text(jsonCommonSegments[0]["com6Code"]);
                //crnwTR.find("td:eq(" + SPR_CD_SEG6DESC + ")").text(jsonCommonSegments[0]["com6Desc"]);

                lastsegment = getGridData(idNum, 7);
                var reqSL = getGridData(idNum, 10);
                var reqSA = getGridData(idNum, 11);
                var isPPE = getGridData(idNum, 12);

                //if (isPPE == "1") { --comment muna sa v10
                //    crnwTR.find("td:eq(" + SPR_CD_IO + ") input").enable(true);
                //    crnwTR.find("td:eq(" + SPR_CD_IO + ")").css("background-color", "white");
                //    crnwTR.find("td:eq(" + SPR_CD_IO + ") input").css("background-color", "white");
                //    crnwTR.find("td:eq(" + SPR_CD_IO + ") input").css("border", "");
                //}
                //else {
                //    crnwTR.find("td:eq(" + SPR_CD_IO + ") input").enable(false);
                //    crnwTR.find("td:eq(" + SPR_CD_IO + ")").css("background-color", "gainsboro");
                //    crnwTR.find("td:eq(" + SPR_CD_IO + ") input").css("background-color", "gainsboro");
                //    crnwTR.find("td:eq(" + SPR_CD_IO + ") input").css("border", "none");
                //}
                if (lastsegment == "04") {
                    //crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text(getGridData(idNum, 5));
                    //crnwTR.find("td:eq(" + SPR_CD_SEG4DESC + ")").text(getGridData(idNum, 6));
                    Grid.SetText(SPR_CD_SEG4 - 1, row, getGridData(idNum, 5));
                    Grid.SetText(SPR_CD_SEG4DESC - 1, row, getGridData(idNum, 6));
                }
                else if (lastsegment == "05") {
                    //crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text(getGridData(idNum, 5));
                    //crnwTR.find("td:eq(" + SPR_CD_SEG5DESC + ")").text(getGridData(idNum, 6));
                    Grid.SetText(SPR_CD_SEG5 - 1, row, getGridData(idNum, 5));
                    Grid.SetText(SPR_CD_SEG5DESC - 1, row, getGridData(idNum, 6));
                }
                else if (lastsegment == "06") {
                    //crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text(getGridData(idNum, 5));
                    //crnwTR.find("td:eq(" + SPR_CD_SEG6DESC + ")").text(getGridData(idNum, 6));
                    Grid.SetText(SPR_CD_SEG6 - 1, row, getGridData(idNum, 5));
                    Grid.SetText(SPR_CD_SEG6DESC - 1, row, getGridData(idNum, 6));
                }

                switch (defaultLocSegCode) {
                    case "02":
                        //crnwTR.find('td:eq(' + SPR_CD_SEG2 + ')').text(defaultLocCode);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG2DESC + ')').text(defaultLocDesc);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG2 + ')').enable(false);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG2DESC + ')').enable(false);
                        Grid.SetText(SPR_CD_SEG2 - 1, row, defaultLocCode);
                        Grid.SetText(SPR_CD_SEG2DESC - 1, row, defaultLocDesc);
                        Grid.SetEnable(SPR_CD_SEG2 - 1, row, false);
                        Grid.SetEnable(SPR_CD_SEG2DESC - 1, row, false);
                        break;
                    case "03":
                        //crnwTR.find('td:eq(' + SPR_CD_SEG3 + ')').text(defaultLocCode);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG3DESC + ')').text(defaultLocDesc);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG3 + ')').enable(false);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG3DESC + ')').enable(false);
                        Grid.SetText(SPR_CD_SEG3 - 1, row, defaultLocCode);
                        Grid.SetText(SPR_CD_SEG3DESC - 1, row, defaultLocDesc);
                        Grid.SetEnable(SPR_CD_SEG3 - 1, row, false);
                        Grid.SetEnable(SPR_CD_SEG3DESC - 1, row, false);
                        break;
                    case "04":
                        //crnwTR.find('td:eq(' + SPR_CD_SEG4 + ')').text(defaultLocCode);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG4DESC + ')').text(defaultLocDesc);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG4 + ')').enable(false);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG4DESC + ')').enable(false);
                        Grid.SetText(SPR_CD_SEG4 - 1, row, defaultLocCode);
                        Grid.SetText(SPR_CD_SEG4DESC - 1, row, defaultLocDesc);
                        Grid.SetEnable(SPR_CD_SEG4 - 1, row, false);
                        Grid.SetEnable(SPR_CD_SEG4DESC - 1, row, false);
                        break;
                    case "05":
                        //crnwTR.find('td:eq(' + SPR_CD_SEG5 + ')').text(defaultLocCode);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG5DESC + ')').text(defaultLocDesc);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG5 + ')').enable(false);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG5DESC + ')').enable(false);
                        Grid.SetText(SPR_CD_SEG5 - 1, row, defaultLocCode);
                        Grid.SetText(SPR_CD_SEG5DESC - 1, row, defaultLocDesc);
                        Grid.SetEnable(SPR_CD_SEG5 - 1, row, false);
                        Grid.SetEnable(SPR_CD_SEG5DESC - 1, row, false);
                        break;
                    case "06":
                        //crnwTR.find('td:eq(' + SPR_CD_SEG6 + ')').text(defaultLocCode);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG6DESC + ')').text(defaultLocDesc);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG6 + ')').enable(false);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG6DESC + ')').enable(false);
                        Grid.SetText(SPR_CD_SEG6 - 1, row, defaultLocCode);
                        Grid.SetText(SPR_CD_SEG6DESC - 1, row, defaultLocDesc);
                        Grid.SetEnable(SPR_CD_SEG6 - 1, row, false);
                        Grid.SetEnable(SPR_CD_SEG6DESC - 1, row, false);
                        break;
                }

                let costcenterCode = $("#idvallugOrigCCC").val();
                let costcenterDesc = $("#descvallugOrigCCC").val();
                switch (defaultCCSegCode) {
                    case "02":
                        //crnwTR.find('td:eq(' + SPR_CD_SEG2 + ')').text(costcenterCode);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG2DESC + ')').text(costcenterDesc);
                        Grid.SetText(SPR_CD_SEG2 - 1, row, costcenterCode);
                        Grid.SetText(SPR_CD_SEG2DESC - 1, row, costcenterDesc);
                        break;
                    case "03":
                        //crnwTR.find('td:eq(' + SPR_CD_SEG3 + ')').text(costcenterCode);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG3DESC + ')').text(costcenterDesc);
                        Grid.SetText(SPR_CD_SEG3 - 1, row, costcenterCode);
                        Grid.SetText(SPR_CD_SEG3DESC - 1, row, costcenterDesc);
                        break;
                    case "04":
                        //crnwTR.find('td:eq(' + SPR_CD_SEG4 + ')').text(costcenterCode);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG4DESC + ')').text(costcenterDesc);
                        Grid.SetText(SPR_CD_SEG4 - 1, row, costcenterCode);
                        Grid.SetText(SPR_CD_SEG4DESC - 1, row, costcenterDesc);
                        break;
                    case "05":
                        //crnwTR.find('td:eq(' + SPR_CD_SEG5 + ')').text(costcenterCode);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG5DESC + ')').text(costcenterDesc);
                        Grid.SetText(SPR_CD_SEG5 - 1, row, costcenterCode);
                        Grid.SetText(SPR_CD_SEG5DESC - 1, row, costcenterDesc);
                        break;
                    case "06":
                        //crnwTR.find('td:eq(' + SPR_CD_SEG6 + ')').text(costcenterCode);
                        //crnwTR.find('td:eq(' + SPR_CD_SEG6DESC + ')').text(costcenterDesc);
                        Grid.SetText(SPR_CD_SEG6 - 1, row, costcenterCode);
                        Grid.SetText(SPR_CD_SEG6DESC - 1, row, costcenterDesc);
                        break;
                }

                //crnwTR.find('td:eq(' + SPR_CD_REQSLTYPE + ')').text(reqSL);
                //crnwTR.find('td:eq(' + SPR_CD_REQSUBACCNT + ')').text(reqSA);
                Grid.SetText(SPR_CD_REQSLTYPE - 1, row, reqSL);
                Grid.SetText(SPR_CD_REQSUBACCNT - 1, row, reqSA);
                ReqSLSA(reqSL, reqSA);
                GetAccountDescription();
                nwParameter_Add("idvallugRsnReq", $("#idvallugRsnReq").val());
                nwParameter_Add("igtCode", getGridData(idNum, 3));
                //nwParameter_Add("currRow", crnwTR.index());
                nwParameter_Add("currRow", row);
                nwParameter_Add("lastSegment", lastsegment);
                //nwParameter_Add("vatCode", crnwTR.find('td:eq(' + SPR_CD_VATCODE + ')').text());
                //nwParameter_Add("ewtCode", crnwTR.find('td:eq(' + SPR_CD_EWTCODE + ')').text());
                nwParameter_Add("vatCode", Grid.GetValue(SPR_CD_VATCODE - 1, row));
                nwParameter_Add("ewtCode", Grid.GetValue(SPR_CD_EWTCODE - 1, row));
                //nwParameter_Add("vatIN", crnwTR.find('td:eq(' + SPR_CD_UNITCOST_VATIN + ') input').val());
                nwParameter_Add("vatIN", getNumReplace(Grid.GetValue(SPR_CD_UNITCOST_VATIN - 1, row)));
                //nwParameter_Add("qty", crnwTR.find('td:eq(' + SPR_CD_QTY + ') input').val());
                nwParameter_Add("vatIN", getNumReplace(Grid.GetValue(SPR_CD_QTY - 1, row)));
                //nwParameter_Add_Table("nwGridChargeDtlsCon");
                nwParameter_Add_Spread(nwGridChargeDtlsCon_Book);
                func_ActionDriven("actLoadCashFlow", false);
            }           
        }        
    }
    if (idName == 'lugVATCode') {
        //crnwTR.find("td:eq(" + SPR_CD_VATCODE + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_CD_VATSHORTDESC + ")").text(getGridData(idNum, 1));
        Grid.SetText(SPR_CD_VATCODE - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_CD_VATSHORTDESC - 1, row, getGridData(idNum, 1));

        //nwParameter_Add("currRow", crnwTR.index());
        nwParameter_Add("currRow", row);
        nwParameter_Add("vatCode", getGridData(idNum, 0));
        //nwParameter_Add("ewtCode", crnwTR.find('td:eq(' + SPR_CD_EWTCODE + ')').text());
        //nwParameter_Add("vatIN", crnwTR.find('td:eq(' + SPR_CD_UNITCOST_VATIN + ') input').val());
        //nwParameter_Add("qty", crnwTR.find('td:eq(' + SPR_CD_QTY + ') input').val());
        nwParameter_Add("ewtCode", Grid.GetValue(SPR_CD_EWTCODE - 1, row));
        nwParameter_Add("vatIN", getNumReplace(Grid.GetValue(SPR_CD_UNITCOST_VATIN - 1, row)));
        nwParameter_Add("qty", getNumReplace(Grid.GetValue(SPR_CD_QTY - 1, row)));
        //nwParameter_Add_Table("nwGridChargeDtlsCon");
        nwParameter_Add_Spread(nwGridChargeDtlsCon_Book);
        func_ActionDriven("actComputeVatex", false);
    }
    if (idName == 'lugEWTCode') {
        //crnwTR.find("td:eq(" + SPR_CD_EWTCODE + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_CD_EWTSHORTDESC + ")").text(getGridData(idNum, 1));
        Grid.SetText(SPR_CD_EWTCODE - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_CD_EWTSHORTDESC - 1, row, getGridData(idNum, 1));

        //nwParameter_Add("currRow", crnwTR.index());
        //nwParameter_Add("vatCode", crnwTR.find('td:eq(' + SPR_CD_VATCODE + ')').text());
        nwParameter_Add("currRow", row);
        nwParameter_Add("vatCode", Grid.GetValue(SPR_CD_VATCODE - 1, row));
        nwParameter_Add("ewtCode", getGridData(idNum, 0));
        //nwParameter_Add("vatIN", crnwTR.find('td:eq(' + SPR_CD_UNITCOST_VATIN + ') input').val());
        //nwParameter_Add("qty", crnwTR.find('td:eq(' + SPR_CD_QTY + ') input').val());
        nwParameter_Add("vatIN", getNumReplace(Grid.GetValue(SPR_CD_UNITCOST_VATIN - 1, row)));
        nwParameter_Add("qty", getNumReplace(Grid.GetValue(SPR_CD_QTY - 1, row)));
        //nwParameter_Add_Table("nwGridChargeDtlsCon");
        nwParameter_Add_Spread(nwGridChargeDtlsCon_Book);
        func_ActionDriven("actComputeVatex", false);
    }
    if (idName == 'lugUOM') {
        //crnwTR.find("td:eq(" + SPR_CD_UOM + ")").text(getGridData(idNum, 0));
        Grid.SetText(SPR_CD_UOM - 1, row, getGridData(idNum, 0));
    }
    if (idName == 'lugPayeeRef') {
        //crnwTR.find("td:eq(" + SPR_CD_PAYEEREFCODE + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_CD_PAYEEREFDESC + ")").text(getGridData(idNum, 1));
        //crnwTR.find("td:eq(" + SPR_CD_VATCODE + ")").text(getGridData(idNum, 3));
        //crnwTR.find("td:eq(" + SPR_CD_VATSHORTDESC + ")").text(getGridData(idNum, 4));
        //crnwTR.find("td:eq(" + SPR_CD_EWTCODE + ")").text(getGridData(idNum, 5));
        //crnwTR.find("td:eq(" + SPR_CD_EWTSHORTDESC + ")").text(getGridData(idNum, 6));
        Grid.SetText(SPR_CD_PAYEEREFCODE - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_CD_PAYEEREFDESC - 1, row, getGridData(idNum, 1));
        Grid.SetText(SPR_CD_VATCODE - 1, row, getGridData(idNum, 3));
        Grid.SetText(SPR_CD_VATSHORTDESC - 1, row, getGridData(idNum, 4));
        Grid.SetText(SPR_CD_EWTCODE - 1, row, getGridData(idNum, 5));
        Grid.SetText(SPR_CD_EWTSHORTDESC - 1, row, getGridData(idNum, 6));
        //crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text(getGridData(idNum, 7));
        //crnwTR.find("td:eq(" + SPR_CD_SEG1DESC + ")").text(getGridData(idNum, 8));
        //crnwTR.find("td:eq(" + SPR_CD_REQSLTYPE + ")").text(getGridData(idNum, 9));
        //crnwTR.find("td:eq(" + SPR_CD_REQSUBACCNT + ")").text(getGridData(idNum, 10));

        //var reqSL = getGridData(idNum, 9);
        //var reqSA = getGridData(idNum, 10);

        //ReqSLSA(reqSL, reqSA);
        GetAccountDescription();

        //nwParameter_Add("currRow", crnwTR.index());
        nwParameter_Add("currRow", row);
        nwParameter_Add("vatCode", getGridData(idNum, 3));
        nwParameter_Add("ewtCode", getGridData(idNum, 5));
        //nwParameter_Add("vatIN", crnwTR.find('td:eq(' + SPR_CD_UNITCOST_VATIN + ') input').val());
        //nwParameter_Add("qty", crnwTR.find('td:eq(' + SPR_CD_QTY + ') input').val());
        nwParameter_Add("vatIN", getNumReplace(Grid.GetValue(SPR_CD_UNITCOST_VATIN - 1, row)));
        nwParameter_Add("qty", getNumReplace(Grid.GetValue(SPR_CD_QTY - 1, row)));
        //nwParameter_Add_Table("nwGridChargeDtlsCon");
        nwParameter_Add_Spread(nwGridChargeDtlsCon_Book);
        func_ActionDriven("actComputeVatex", false);
    }
    if (idName == 'lugSeg1') {
        //crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_CD_SEG1DESC + ")").text(getGridData(idNum, 1));
        //crnwTR.find("td:eq(" + SPR_CD_REQSLTYPE + ")").text(getGridData(idNum, 2));
        //crnwTR.find("td:eq(" + SPR_CD_REQSUBACCNT + ")").text(getGridData(idNum, 3));
        //crnwTR.find("td:eq(" + SPR_CD_REQALLOC + ")").text(getGridData(idNum, 4));
        Grid.SetText(SPR_CD_SEG1 - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_CD_SEG1DESC - 1, row, getGridData(idNum, 1));
        Grid.SetText(SPR_CD_REQSLTYPE - 1, row, getGridData(idNum, 2));
        Grid.SetText(SPR_CD_REQSUBACCNT - 1, row, getGridData(idNum, 3));
        Grid.SetText(SPR_CD_REQALLOC - 1, row, getGridData(idNum, 4));

        var reqSL = getGridData(idNum, 2);
        var reqSA = getGridData(idNum, 3);
       
        ReqSLSA(reqSL, reqSA);
        GetAccountDescription();      
        //AllocationProcessProp(crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text(), crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text(), getGridData(idNum, 0),
        //                      crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text(),
        //                      crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text(),
        //                      crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text());
        AllocationProcessProp(Grid.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, row), Grid.GetValue(SPR_CD_ITEMCODE - 1, row), getGridData(idNum, 0),
                              Grid.GetValue(SPR_CD_SEG2 - 1, row), Grid.GetValue(SPR_CD_SEG3 - 1, row),
                              Grid.GetValue(SPR_CD_SEG4 - 1, row), Grid.GetValue(SPR_CD_SEG5 - 1, row),
                              Grid.GetValue(SPR_CD_SEG6 - 1, row), row);
    }
    if (idName == 'lugSeg2') {
        //crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_CD_SEG2DESC + ")").text(getGridData(idNum, 1));
        Grid.SetText(SPR_CD_SEG2 - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_CD_SEG2DESC - 1, row, getGridData(idNum, 1));
        
        GetAccountDescription();        
        //AllocationProcessProp(crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text(), crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text(),
        //                      crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text(), getGridData(idNum, 0),
        //                      crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text(),
        //                      crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text());
        AllocationProcessProp(Grid.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, row), Grid.GetValue(SPR_CD_ITEMCODE - 1, row),
                              Grid.GetValue(SPR_CD_SEG1 - 1, row),
                              getGridData(idNum, 0),
                              Grid.GetValue(SPR_CD_SEG3 - 1, row),
                              Grid.GetValue(SPR_CD_SEG4 - 1, row),
                              Grid.GetValue(SPR_CD_SEG5 - 1, row),
                              Grid.GetValue(SPR_CD_SEG6 - 1, row), row);
    }
    if (idName == 'lugSeg3') {
        //crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_CD_SEG3DESC + ")").text(getGridData(idNum, 1));        
        Grid.SetText(SPR_CD_SEG3 - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_CD_SEG3DESC - 1, row, getGridData(idNum, 1));

        GetAccountDescription();        
        //AllocationProcessProp(crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text(), crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text(), 
        //                      crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text(), getGridData(idNum, 0),
        //                      crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text());
        AllocationProcessProp(Grid.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, row), Grid.GetValue(SPR_CD_ITEMCODE - 1, row),
                              Grid.GetValue(SPR_CD_SEG1 - 1, row),
                              Grid.GetValue(SPR_CD_SEG2 - 1, row),
                              getGridData(idNum, 0),
                              Grid.GetValue(SPR_CD_SEG4 - 1, row),
                              Grid.GetValue(SPR_CD_SEG5 - 1, row),
                              Grid.GetValue(SPR_CD_SEG6 - 1, row), row);
    }
    if (idName == 'lugSeg4') {
        //crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_CD_SEG4DESC + ")").text(getGridData(idNum, 1));
        Grid.SetText(SPR_CD_SEG4 - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_CD_SEG4DESC - 1, row, getGridData(idNum, 1));
        
        GetAccountDescription();        
        //AllocationProcessProp(crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text(), crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text(), 
        //                      crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text(),
        //                      getGridData(idNum, 0), crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text());
        AllocationProcessProp(Grid.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, row), Grid.GetValue(SPR_CD_ITEMCODE - 1, row),
                             Grid.GetValue(SPR_CD_SEG1 - 1, row),
                             Grid.GetValue(SPR_CD_SEG2 - 1, row),
                             Grid.GetValue(SPR_CD_SEG3 - 1, row),
                             getGridData(idNum, 0),
                             Grid.GetValue(SPR_CD_SEG5 - 1, row),
                             Grid.GetValue(SPR_CD_SEG6 - 1, row), row);
    }
    if (idName == 'lugSeg5') {
        //crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_CD_SEG5DESC + ")").text(getGridData(idNum, 1));
        Grid.SetText(SPR_CD_SEG5 - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_CD_SEG5DESC - 1, row, getGridData(idNum, 1));
      
        GetAccountDescription();      
        //AllocationProcessProp(crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text(), crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text(), 
        //                      crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text(),
        //                      crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text(), getGridData(idNum, 0), crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text());
        AllocationProcessProp(Grid.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, row), Grid.GetValue(SPR_CD_ITEMCODE - 1, row),
                             Grid.GetValue(SPR_CD_SEG1 - 1, row),
                             Grid.GetValue(SPR_CD_SEG2 - 1, row),
                             Grid.GetValue(SPR_CD_SEG3 - 1, row),
                             Grid.GetValue(SPR_CD_SEG4 - 1, row),
                             getGridData(idNum, 0),
                             Grid.GetValue(SPR_CD_SEG6 - 1, row), row);
    }
    if (idName == 'lugSeg6') {
        //crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_CD_SEG6DESC + ")").text(getGridData(idNum, 1));
        Grid.SetText(SPR_CD_SEG6 - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_CD_SEG6DESC - 1, row, getGridData(idNum, 1));
      
        GetAccountDescription();     
        //AllocationProcessProp(crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text(), crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text(),
        //                      crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text(),
        //                      crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text(), getGridData(idNum, 0));
        AllocationProcessProp(Grid.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, row), Grid.GetValue(SPR_CD_ITEMCODE - 1, row),
                             Grid.GetValue(SPR_CD_SEG1 - 1, row),
                             Grid.GetValue(SPR_CD_SEG2 - 1, row),
                             Grid.GetValue(SPR_CD_SEG3 - 1, row),
                             Grid.GetValue(SPR_CD_SEG4 - 1, row),
                             Grid.GetValue(SPR_CD_SEG5 - 1, row),
                             getGridData(idNum, 0), row);
    }
    if (idName == 'lugSLType') {
        //crnwTR.find("td:eq(" + SPR_CD_SLTYPECODE + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_CD_SLTYPEDESC + ")").text(getGridData(idNum, 1));
        //crnwTR.find("td:eq(" + SPR_CD_REFTYPECODE + ")").text("");
        //crnwTR.find("td:eq(" + SPR_CD_REFTYPEDESC + ")").text("");
        Grid.SetText(SPR_CD_SLTYPECODE - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_CD_SLTYPEDESC - 1, row, getGridData(idNum, 1));
        Grid.SetText(SPR_CD_REFTYPECODE - 1, row, "");
        Grid.SetText(SPR_CD_REFTYPEDESC - 1, row, "");
    }
    if (idName == 'lugSLRef') {
        //crnwTR.find("td:eq(" + SPR_CD_REFTYPECODE + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_CD_REFTYPEDESC + ")").text(getGridData(idNum, 1));
        Grid.SetText(SPR_CD_REFTYPECODE - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_CD_REFTYPEDESC - 1, row, getGridData(idNum, 1));
    }
    if (idName == 'lugBankAcct') {
        //crnwTR.find("td:eq(" + SPR_CD_BANKACCT + ")").text(getGridData(idNum, 0));
        Grid.SetText(SPR_CD_BANKACCT - 1, row, getGridData(idNum, 0));
    }
    if (idName == 'lugCashFlow') {
        //crnwTR.find("td:eq(" + SPR_CD_CASHFLOWCODE + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_CD_CASHFLOWDESC + ")").text(getGridData(idNum, 1));
        Grid.SetText(SPR_CD_CASHFLOWCODE - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_CD_CASHFLOWDESC - 1, row, getGridData(idNum, 1));
    }
    if (idName == 'lugSeg2_AP') {
        //crnwTR.find("td:eq(" + SPR_AP_SEG2 + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_AP_SEG2DESC + ")").text(getGridData(idNum, 1));
        Grid.SetText(SPR_AP_SEG2 - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_AP_SEG2DESC - 1, row, getGridData(idNum, 1));
    }
    if (idName == 'lugSeg3_AP') {
        //crnwTR.find("td:eq(" + SPR_AP_SEG3 + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_AP_SEG3DESC + ")").text(getGridData(idNum, 1));
        Grid.SetText(SPR_AP_SEG3 - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_AP_SEG3DESC - 1, row, getGridData(idNum, 1));
    }
    if (idName == 'lugSeg4_AP') {
        //crnwTR.find("td:eq(" + SPR_AP_SEG4 + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_AP_SEG4DESC + ")").text(getGridData(idNum, 1));
        Grid.SetText(SPR_AP_SEG4 - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_AP_SEG4DESC - 1, row, getGridData(idNum, 1));
    }
    if (idName == 'lugSeg5_AP') {
        //crnwTR.find("td:eq(" + SPR_AP_SEG5 + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_AP_SEG5DESC + ")").text(getGridData(idNum, 1));
        Grid.SetText(SPR_AP_SEG5 - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_AP_SEG5DESC - 1, row, getGridData(idNum, 1));
    }
    if (idName == 'lugSeg6_AP') {
        //crnwTR.find("td:eq(" + SPR_AP_SEG6 + ")").text(getGridData(idNum, 0));
        //crnwTR.find("td:eq(" + SPR_AP_SEG6DESC + ")").text(getGridData(idNum, 1));
        Grid.SetText(SPR_AP_SEG6 - 1, row, getGridData(idNum, 0));
        Grid.SetText(SPR_AP_SEG6DESC - 1, row, getGridData(idNum, 1));
    }
    if (idName == 'lugRsnReq') {
        //nwCDtbl = $("#nwGridChargeDtlsCon .tblGridBody");
        //var cdcnt = nwCDtbl.find("tr").length;
        //var igtList = '';
        //for (var i = 0; i < cdcnt ; i++) {
        //    if (nwCDtbl.find("tr:eq(" + i + ")").find("td:eq(" + (SPR_CD_ITEMGRPTYPECODE) + ")").text() != "") {
        //        igtList += crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text() + "|";
        //    }
        //}

        //if (igtList != "") {
        //    msgBoxContainerQuestion = "ReasonValidation";
        //    parent_MessageBoxQuestion("This will reset the Charging Details. Are you sure you want to continue?", "Payment Request Entry", "Question");
        //    _idNum = idNum;
        //}
        //else {
        nwLoading_Start("xactReloadReason", crLoadingHTML);
        let origRsn = $("#txtReasonCode").val();
        let rsnRqst = getGridData(idNum, 0);
        if (origRsn != '' && origRsn != rsnRqst) {
            ReloadGLAccount();
        }

        $("#txtReasonCode").val(getGridData(idNum, 0));
        $("#txtReasonDesc").val(getGridData(idNum, 1));
        $("#txtReasonType").val(getGridData(idNum, 2));
        nwLoading_End('xactReloadReason');
        //}       
    }
    if (idName == 'lugLocAcctForms') {
        nwParameter_Add("idvallugLocAcctForms", $("#idvallugLocAcctForms").val());
        nwParameter_Add("idvallugOrigCCC", $("#idvallugOrigCCC").val());
        nwParameter_Add("txtValueDate", $("#txtValueDate").val());
        func_ActionDriven("actValLoc", false);
    }
    if (idName == 'lugCurrency') {
        SetForexHdr();
    }
}

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var cnt = nwLib.nwTempTable_Row_Count("nwGridExpenseCon");
    
    if (nwGridID == "nwGridExpenseCon") {
        var col = nwGridExpenseCon_Book.ActiveSheet.CellSelected.col - 1;
        var row = nwGridExpenseCon_Book.ActiveSheet.CellSelected.row - 1;
        if (col == SPR_EA_EXPENSECODE - 1) {
            var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            //var isValid = nwLib.nwTempTable_Column_ValueExist("nwGridExpenseCon", 1, code, false, "text", 0);

            //if (isValid == false) {
                //crnwTRtemp.find('td:eq(' + SPR_EA_EXPENSECODE + ')').text(code);
                //crnwTRtemp.find('td:eq(' + SPR_EA_EXPENSEDESC + ')').text(desc);            
                crnwTRtemp[SPR_EA_EXPENSECODE - 1] = code;
                crnwTRtemp[SPR_EA_EXPENSEDESC - 1] = desc;
                //if (cnt == (crnwTR.index() + 1))
                //    nwGrid_AddRow("nwGridExpenseCon", 1);
            //}
            //else {
            //    crnwTRtemp = null;
            //}
        }
    }
   
    return crnwTRtemp;
}

function disabledlookup(id) {
    $('#idval' + id).addClass("disabledlookupcss");
    $('#descval' + id).addClass("disabledlookupcss");
    $('#idval' + id).prop("disabled", true);
    $('#LookUp' + id).enable(false);
}

function enabledlookup(id) {
    $('#idval' + id).removeClass("disabledlookupcss");
    $('#descval' + id).removeClass("disabledlookupcss");
    $('#idval' + id).prop("disabled", false);
    $('#LookUp' + id).enable(true);
}

function EnableFields() {
    $("#lugLocAcctForms").enable(true);
    $("#lugOrigCCC").enable(true);
    $("#lugVendorPayee").enable(true);
    //if (isAllowCurrency == '1') {
    //    enabledlookup("lugCurrency");
    //}
    //else {
    //    disabledlookup("lugCurrency");
    //}
    $("#lugRsnReq").enable(true);
    $("#lugAPCtrlAccnt").enable(true);
    $('#cmbPaymentRqstSubType').prop('disabled', false);
    $('#txtRemarks').prop('disabled', false);
    $('#txtOthrPayIns').prop('disabled', false);    
    $('#btnViewAttach').enable(false);
    $('#btnViewJrnlEntries').enable(false);
    $("#chkAltPayee").prop("checked", false);
    $("#chkHoldPay").prop("checked", false);
    $("#chkWithSI").prop("checked", false);
    $("#chkADA").prop("checked", false);
    $("#chkHoldPay").enable(true);    
    $("#chkWithSI").enable(true);
    $("#chkADA").enable(true);
    $("#btnLoadHstTemp").enable(true);
    $("#btnLoadRecurTran").enable(true);
    $("#txtValueDate").enable(true);

    $(".btnCreateSBR").enable(false);
    $("#btnReqCompHDR").enable(false);
    $("#btnReqCompHDR").addClass("btn-default-gray");
    $('#nwGridCon').enable(true);
    $("#btnVwConsoCharging").enable(true);
    $("#btnVwJournal").enable(false);
    $(`#noah-webui-default-VwBdgtMonitoring`).enable(true);
    //convert pba to
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REQMTCOMPLIANCE + 1) + ')').enable(false);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REQMTCOMPLIANCE + 1) + ')').removeClass("btnGray");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REQMTCOMPLIANCE + 1) + ')').addClass("btnGray");

    EnablePOType();
    DisableRecurring();
    DisablePrepayment();
}

function DisableFields() {
    $("#lugLocAcctForms").enable(false);
    $("#lugOrigCCC").enable(false);
    $("#lugVendorPayee").enable(false);
    $("#lugCurrency").enable(false);
    $("#lugRsnReq").enable(false);
    $("#lugAPCtrlAccnt").enable(false);

    $('#cmbPaymentRqstSubType').prop('disabled', true);
    $('#txtRemarks').prop('disabled', true);
    $('#txtOthrPayIns').prop('disabled', true);    
    $('#btnViewAttach').enable(false);
    $('#btnViewJrnlEntries').enable(false);
    $("#chkHoldPay").enable(false);    
    $("#chkWithSI").enable(false);
    $("#chkADA").enable(false);
    $("#txtValueDate").enable(false);

    $('#nwGridCon').enable(false);
    $("#nwGridChargeDtlsCon").enable(false);
    $("#btnVwConsoCharging").enable(false);
    $("#btnVwJournal").enable(false);
    $('.btnCreateSBR').enable(false);
    $("#btnReqCompHDR").enable(false);
    $("#btnReqCompHDR").addClass("btn-default-gray");

    DisableGridColMain();
    DisableChargingDtls();
    DisablePrepayment();
    DisableRecurring();
    $("#chkAllowRecur").enable(false);
    $("#chkApplyToAll_Recur").enable(false);
    $("#btnSaveCD").enable(false);
    $("#btnSavePrepayment").enable(false);
    $("#btnSaveRecurring").enable(false);
    $("#btnExportJournal").enable(false);

    $('#wrapForexDate').hide();
    $('#wrapForexFields').hide();
       
    $("#cmbPaymentRqstType").enable(false);
    $("#cmbPaymentRqstSubType").enable(false);
    $("#lugPayeeSubType").enable(false);
    $("#txtCheckPayeeName").enable(false);
    $("#txtDocno").enable(false);
    $("#txtDocDate").enable(false);
    $("#txtDatePosted").enable(false);
    $("#txtStatus").enable(false);
    $("#lugRsnDisapprv").enable(false);
    $("#txtDisapprvRemarks").enable(false);
    //$("#btnAlterPayee").removeClass("btnGreen").removeClass("btnBlue");
    $("#btnAlterPayee").addClass("btn-default-gray");
    $("#btnAlterPayee").enable(false);

    $(`#noah-webui-default-VwBdgtMonitoring`).enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingPrint().enable(false);
    $("#btnLoadHstTemp").enable(false);
    $("#btnLoadRecurTran").enable(false);
    $("#noah-webui-default-CreateSBR").enable(false);
}

function ClearFields() {
    $('#idvallugLocAcctForms').val('');
    $('#descvallugLocAcctForms').val('');
    $('#idvallugVendorPayee').val('');
    $('#descvallugVendorPayee').val('');
    $('#idvallugPayeeSubType').val('');
    $('#descvallugPayeeSubType').val('');
    $('#txtPayeeType').val('');    
    $('#idvallugCurrency').val('');
    $('#descvallugCurrency').val('');
    $('#txtCheckPayeeName').val('');
    $('#cmbPaymentRqstType').val('');
    $('#cmbPaymentRqstSubType').val('');
    $('#txtDocno').val('');
    $('#txtDocDate').val('');
    $('#txtRecuser').val('');
    $('#txtRemarks').val('');
    $('#txtOthrPayIns').val('');
    $('#txtStatus').val('');
    $('#idvallugRsnDisapprv').val('');
    $('#descvallugRsnDisapprv').val('');
    $('#idvallugOrigCCC').val('');
    $('#descvallugOrigCCC').val('');
    $('#idvallugRsnReq').val('');
    $('#descvallugRsnReq').val('');
    $("#txtDisapprvRemarks").val('');
    $("#txtRemarksHold").val('');
    //$("#btnViewAttach").removeClass("btngreencolorcss");
    //$("#btnViewJrnlEntries").removeClass("btngreencolorcss");
    $('#idvallugAPCtrlAccnt').val('');
    $('#descvallugAPCtrlAccnt').val('');
    $('#txtBasisAging').val('');
    $('#txtVendorName').val('');
    $('#txtVendorCode').val('');
    $('#txtIsUploading').val('');
    $('#txtForexDate').val('');
    $('#txtForexLocal').val('');
    $('#txtForexHome').val('');
    $("#lblType").html("");
    $("#chkAltPayee").prop("checked", false);
    $("#txtDocnoHstTemp").val("");
    $("#txtRecurDocno").val("");
    $("#txtRecurNo").val("");
    $("#txtRecurLineID").val("");
    //$("#btnAlterPayee").removeClass("btnGreen");
    $("#btnAlterPayee").addClass("btn-default-gray");
    $("#btnAlterPayee").enable(false);
    $("#txtValueDate").val('');

    isLoadHstTemp = false;
    isSaveTmpCD = false;
    paytermCode = '';
    paytermDesc = '';
    noDays = '';
    
    ClearAllJSONStrings();

    ClearCDHdrFooter();
    ClearRecurrenceDtls();

    $("#txtSubtotal_TranHist, #txtSubtotal_LocalCurr, #txtSubtotal_HomeCurr").val('');
    $("#txtAddVat_TranHist, #txtAddVat_LocalCurr, #txtAddVat_HomeCurr").val('');
    $("#txtGrossAmt_TranHist, #txtGrossAmt_LocalCurr, #txtGrossAmt_HomeCurr").val('');
    $("#txtLessEWT_TranHist, #txtLessEWT_LocalCurr, #txtLessEWT_HomeCurr").val('');
    $("#txtTotalAmt_TranHist, #txtTotalAmt_LocalCurr, #txtTotalAmt_HomeCurr").val('');
    $("#txtLessRecoupment_TranHist, #txtLessRecoupment_LocalCurr, #txtLessRecoupment_HomeCurr").val('');
    $("#txtLessDM_TranHist, #txtLessDM_LocalCurr, #txtLessDM_HomeCurr").val('');
    $("#txtRetention_TranHist, #txtRetention_LocalCurr, #txtRetention_HomeCurr").val('');
    $("#txtNetAmt_TranHist, #txtNetAmt_LocalCurr, #txtNetAmt_HomeCurr").val('');    
}

function Message_Cancel() {
    msgBoxContainerAnsweR = "Cancel";
    var isValid = true;
    if (isMessageQuestionToolBox) {
        try { isValid = msgBoxContainerQuestionT(msgBoxContainerQuestion, msgBoxContainerAnsweR); }
        catch (err) { }
        nwLoading_Start("nwaagToolBox", crLoadingHTML);

        try {
            func_ToolboxMessageYes(msgBoxContainerQuestion);
        } catch (err) { }

    }
    else if (isMessageQuestionNavigation) {
        try {
            Navigation_Next = true;
            isValid = msgBoxContainerQuestionNav("BNButton", true);
            return false;
        }
        catch (err) { }
    }
    else {
        try { isValid = msgBoxContainerQuestionF(msgBoxContainerQuestion, msgBoxContainerAnsweR); }
        catch (err) { }


    }
    if (isValid == true || isValid == undefined) Message_close();
}

function msgBoxContainerQuestionF(genID, answer) {
    if (genID == "btnSaveCD") {
        if (answer == "Yes") {
            nwLoading_Start("xbtnSave", crLoadingHTML);
            isSaveTmpCD = true;
            taxConvert = "2";
            isBtnDone = false;
            nwParameter_Add("refno", $('#idvallugRefTranNo').val());
            nwParameter_Add("docno", $("#txtTMPID").val());
            //nwParameter_Add_Table("nwGridChargeDtlsCon");
            nwParameter_Add_Spread(nwGridChargeDtlsCon_Book);
            nwParameter_Add("row", currRow);
            nwParameter_Add("tmpDocno", $("#txtTMPID").val());
            nwParameter_Add("txtRateLoc", $("#txtForexLocal").val());
            nwParameter_Add("txtRateHome", $("#txtForexHome").val());
            nwParameter_Add("txtGrossAmt_CD", $("#txtGrossAmt_CD").val());
            nwParameter_Add("txtDocno", $("#txtDocno").val());
            nwParameter_Add("txtLineID_CD", $("#txtLineID_CD").val());
            nwParameter_Add("txtVendorTag", $("#txtVendorTag").val());
            //nwParameter_Add("withSI", $(`#nwGrid-nwData tr:eq(${mainGridCurr.index()})`).find(`td:eq(${SPR_WITHSI}) input`).is(":checked"));
            nwParameter_Add("withSI", "0");
            nwParameter_Add("txtTrantype", "PRFDRT");
            func_ActionDriven('actbtnSave', false);
        }        
    }
    if (genID == "Processdata") {
        if (answer == "Yes") {
            nwLoading_Start("xProcessdata", crLoadingHTML);
            cust_GetPara();
            nwParameter_Add("txtRemarks", $("#txtRemarks").val());
            nwParameter_Add("txtOthrPayIns", $("#txtOthrPayIns").val());
            nwParameter_Add_Spread(nwGridProcessCon_Book);
            func_ActionDriven("actProcess", true);
        }
    }
    if (genID == "btnSave_AP") {
        if (answer == "Yes") {
            nwLoading_Start("xbtnSave_AP", crLoadingHTML);
            cust_GetPara();
            //nwParameter_Add_Table("nwGridAllocProcessCon");
            nwParameter_Add_Spread(nwGridAllocProcessCon_Book);
            nwParameter_Add("tmpDocno", tmpDocno);
            nwParameter_Add("txtLineID_AP", $("#txtLineID_AP").val());
            nwParameter_Add("txtRefRowno_AP", $("#txtRefRowno_AP").val());
            nwParameter_Add("idvallugSegment1", $("#idvallugSegment1").val());
            func_ActionDriven("actSave_AP", true);
        }
    }

    if (genID == "btnSaveRecurring") {
        if (answer == "Yes") {
            nwLoading_Start("xbtnSaveRecurring", crLoadingHTML);
            cust_GetPara();            
            nwParameter_Add("row", currRow);
            nwParameter_Add("tmpDocno", tmpDocno);
            nwParameter_Add("lineID", lineID);
            nwParameter_Add("refDocno", $('#idvallugDocNo').val());
            nwParameter_Add("refDocdate", $('#descvallugDocNo').val());
            nwParameter_Add("refNo", $('#idvallugRefNo').val());
            nwParameter_Add("refDate", $('#descvallugRefNo').val());
            nwParameter_Add("drNo", $('#idvallugDRNo').val());
            nwParameter_Add("drDate", $('#descvallugDRNo').val());
            nwParameter_Add("payTerm", $('#idvallugPayTerm').val());
            nwParameter_Add("descvallugPayTerm", $('#descvallugPayTerm').val());
            nwParameter_Add("counterDate", $('#txtCounterDate_RD').val());
            nwParameter_Add("dueDate", $('#txtDueDate_RD').val());
            nwParameter_Add("chkAllowRecur", $("#chkAllowRecur").is(":checked"));
            nwParameter_Add("chkApplyToAll_Recur", $("#chkApplyToAll_Recur").is(":checked"));
            nwParameter_Add("txtNextRecur", $('#txtNextRecur').val());
            nwParameter_Add("txtNoRecur_RD", $('#txtNoRecur_RD').val());
            nwParameter_Add("txtEndRecur_RD", $('#txtEndRecur_RD').val());
            func_ActionDriven("actSaveRecurring", true);
        }
    }

    if (genID == "btnSavePrepayment") {
        if (answer == "Yes") {
            nwLoading_Start("xbtnSavePrepayment", crLoadingHTML);
            cust_GetPara();
            nwParameter_Add("row", currRow);
            nwParameter_Add("tmpDocno", tmpDocno);
            nwParameter_Add("lineID", lineID);
            nwParameter_Add("refDocno", $('#idvallugDocno_PD').val());
            nwParameter_Add("refDocdate", $('#descvallugDocno_PD').val());
            nwParameter_Add("refNo", $('#idvallugRefNoSI_PD').val());
            nwParameter_Add("refDate", $('#descvallugRefNoSI_PD').val());
            nwParameter_Add("drNo", $('#idvallugDRCOCNo_PD').val());
            nwParameter_Add("drDate", $('#descvallugDRCOCNo_PD').val());
            nwParameter_Add("payTerm", $('#idvallugPaymentTerm_PD').val());
            nwParameter_Add("descvallugPaymentTerm_PD", $('#descvallugPaymentTerm_PD').val());
            nwParameter_Add("counterDate", $('#txtCounterDate_PD').val());
            nwParameter_Add("dueDate", $('#txtDueDate_PD').val());
            nwParameter_Add("rdbAmortEqually_PD", $('#rdbAmortEqually_PD').is(":checked"));
            //nwParameter_Add_Table("nwGridPrepaymentCon");
            //nwParameter_Add_Table("nwGridPrepayDefCon");
            nwParameter_Add_Spread(nwGridPrepaymentCon_Book);
            nwParameter_Add_Spread(nwGridPrepayDefCon_Book);
            nwParameter_Add("jsonExpenseAlloc", JSON.stringify(jsonExpenseAlloc));
            func_ActionDriven("actSavePrepayment", true);
        }
    }

    if (genID == "RecurringQ") { //not use
        if (answer == "Yes") {
            var Grid = nwGridCon_Book.ActiveSheet;
            Grid.SetBackground(SPR_PREPAYMENTDTLS - 1, Spread_ALLROW, "blue");
            //$("#nwGridCon tbody tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_PREPAYMENTDTLS + ")").removeClass("btnGreen");
            //$("#nwGridCon tbody tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_PREPAYMENTDTLS + ")").addClass("btnBlue");
            RecurringFn();
        }
    }
    if (genID == "PrepayQ") { //not use
        if (answer == "Yes") {
            var Grid = nwGridCon_Book.ActiveSheet;
            Grid.SetBackground(SPR_PREPAYMENTDTLS - 1, Spread_ALLROW, "blue");
            $("#nwGridCon tbody tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_RECURRING + ")").removeClass("btnGreen");
            $("#nwGridCon tbody tr:eq(" + crnwTR.index() + ") td:eq(" + SPR_RECURRING + ")").addClass("btnBlue");
            PrepaymentFn();
        }
    }

    if (genID == "btnSaveExpense") {
        if (answer == "Yes") {
            nwLoading_Start("xbtnSaveExpense", crLoadingHTML);
            cust_GetPara();
            nwParameter_Add("chkApplyToAll", $('#chkApplyToAll').is(":checked"));
            nwParameter_Add("txtLineID", $("#txtLineID").val());
            nwParameter_Add("txtRefRowno", $("#txtRefRowno").val());            
            nwParameter_Add("txtPrepaid", $("#txtPrepaid").val());
            nwParameter_Add("txtAmount_PCCC", $("#txtAmount_PCCC").val());
            nwParameter_Add("chkApplyToAll", $("#chkApplyToAll").is(":checked"));
            nwParameter_Add("txtRowno_Ex", $("#txtRowno_Ex").val());
            nwParameter_Add("idvallugCostCenter_EA", $("#idvallugCostCenter_EA").val());
            nwParameter_Add("idvallugProfitCenter_EA", $("#idvallugProfitCenter_EA").val());
            //nwParameter_Add_Table("nwGridExpenseCon");
            nwParameter_Add_Spread(nwGridExpenseCon_Book);
            func_ActionDriven("actSaveExpenseAlloc", true);
        }
    }

    if (genID == "VendorValidation") {
        if (answer == "Yes") {
            ClearGridCol();
            LoadVendorDetails(_idNum);
        }
        else {
            $("#idvallugVendorPayee").val($("#txtVendorCode").val());
            $("#descvallugVendorPayee").val($("#txtVendorName").val());
        }
    }
    if (genID == "VendorCDValidation") {
        if (answer == "Yes") {
            ClearChargingDtlsCol();            
            LoadVendorDetails(_idNum);
            MainGridConfig();
        }
        else {
            $("#idvallugVendorPayee").val($("#txtVendorCode").val());
            $("#descvallugVendorPayee").val($("#txtVendorName").val());
        }
    }

    if (genID == "btnSaveUploading") {
        if (answer == "Yes") {
            nwLoading_Start("xbtnSaveUploading", crLoadingHTML);
            cust_GetPara();
            //nwParameter_Add_Table("nwGridValListCon");
            nwParameter_Add_Spread(nwGridValListCon_Book);
            func_ActionDriven("actSaveUploading", false);
        }
    }

    if (genID == "btnSaveUploading_Alloc") {
        if (answer == "Yes") {
            nwLoading_Start("xbtnSaveUploading_Alloc", crLoadingHTML);
            cust_GetPara();
            //nwParameter_Add_Table("nwGridAllocValListCon");
            nwParameter_Add_Spread(nwGridAllocValListCon_Book);
            nwParameter_Add("txtLineID_AP", $("#txtLineID_AP").val());
            nwParameter_Add("txtRefRowno_AP", $("#txtRefRowno_AP").val());
            nwParameter_Add("idvallugSegment1", $("#idvallugSegment1").val());
            nwParameter_Add("descvallugSegment1", $("#descvallugSegment1").val());
            nwParameter_Add("txtTotalAmount", $("#txtTotalAmount").val());
            func_ActionDriven("actSaveUploading_Alloc", false);
        }
    }

    

    if (genID == "btnSaveApplyAdvDM") {
        if (answer == "Yes") {
            nwLoading_Start("xactSaveAdvances", crLoadingHTML);
            cust_GetPara();
            nwParameter_Add("txtLineID_CD", $("#txtLineID_CD").val());
            //nwParameter_Add_Table("nwGridApplyAdvDMCon");
            nwParameter_Add_Spread(nwGridApplyAdvDMCon_Book);
            nwParameter_Add("txtTotalAppAdv", $("#txtTotalAppAdv").val());
            nwParameter_Add("txtNetAmtDue", $("#txtNetAmtDue").val());
            nwParameter_Add("idvallugRefTranNo", $("#idvallugRefTranNo").val());
            func_ActionDriven("actSaveAdvances", false);
        }
    }
    

    if (genID == 'BdgtCheck') {
        if (answer == 'Yes') {
            $('#Message_Yes').text('Yes')
            $('#Message_No').css('display', '');
            $('#Message_Cancel').css('display', '');
            $('#dimMessageBox.question .message_icon').css('background-image', ' url(../../../materials/icons/nw_ico_Question.png)'); //Replace ICON
            ClearBdgtCtrlDtls();

            var docno = $('#txtDocno').val();
            var trantype = $('#txtTranType').val();

            DisplayBdgtCtrl(docno, trantype, false);
        }
    }

    if (genID == 'CDNotif') {
        if (answer == 'Yes') {
            var Grid = nwGridCon_Book.ActiveSheet;
            var docno = $("#txtDocno");
            if (docno != "") {
                //docno = _crnwTR.find("td:eq(" + SPR_TMPID + ")").text();
                docno = Grid.GetValue(SPR_TMPID, _crnwTR);
            }
            //var refno = _crnwTR.find("td:eq(" + SPR_REFTRANNO + ")").text();
            var refno = Grid.GetValue(SPR_REFTRANNO, _crnwTR);
            jsonDelDtls = FilterJsonDelDtls(docno, refno);
            Grid.SetBackground(SPR_CHARGINGDTLS - 1, _crnwTR, 'orange');
            Grid.SetText(SPR_CDTAG - 1, _crnwTR, '');
            Grid.SetText(SPR_NETAMT - 1, _crnwTR, '');
            Grid.SetText(SPR_NETAMTLOCAL - 1, _crnwTR, '');
            Grid.SetText(SPR_NETAMTHOME - 1, _crnwTR, '');
            //$("#nwGridCon tbody tr:eq(" + (_crnwTR.index()) + ") td:eq(" + SPR_CHARGINGDTLS + ")").removeClass("btnGreen");
            //$("#nwGridCon tbody tr:eq(" + (_crnwTR.index()) + ") td:eq(" + SPR_CHARGINGDTLS + ")").addClass("btnOrange");
            //$("#nwGridCon tbody tr:eq(" + (_crnwTR.index()) + ") td:eq(" + SPR_CDTAG + ")").text("");
            //$("#nwGridCon tbody tr:eq(" + (_crnwTR.index()) + ") td:eq(" + SPR_NETAMT + ")").text("");
            //$("#nwGridCon tbody tr:eq(" + (_crnwTR.index()) + ") td:eq(" + SPR_NETAMTLOCAL + ")").text("");
            //$("#nwGridCon tbody tr:eq(" + (_crnwTR.index()) + ") td:eq(" + SPR_NETAMTHOME + ")").text("");
            CustomizeLoadByClick();
        }
        else {
            //$("#nwGridCon tbody tr:eq(" + (_crnwTR.index()) + ") td:eq(" + SPR_GROSSAMT + ") input").val(setNumReplace(grossamt_, 2));
            Grid.SetText(SPR_GROSSAMT - 1, _crnwTR, setNumReplace(grossamt_, 2));
        }
    }

    if (genID == 'WithPrepayments') {
        if (answer == 'Yes') {
            withPrepay = true;
            cust_GetPara();
            //nwParameter_Add_Table("nwGridCon");
            nwParameter_Add_Spread(nwGridCon_Book);
            func_ActionDriven("actProcessDirect", false);
        }
        else {
            withPrepay = false;
        }
    }

    if (genID == "ReasonValidation") {
        if (answer == "Yes") {            
            ClearCDHdrFooter();            
            //nwGrid_RemoveRow("nwGridChargeDtlsCon", 0, $("#nwGridChargeDtlsCon .tblGridBody tr").length); //to convert
            //nwGrid_AddRow("nwGridChargeDtlsCon", 5); //to convert
            $("#nwGridChargeDtls").enable(false);
            $("#btnResetTax").enable(false);
            $("#btnReloadTaxes").enable(false);
            $('.nwgrid_CopyRow').enable(false);
            setTimeout(function () {
                isBtnDone = true;
                MainGridConfig();
                LiquidationCol();
            }, 100);
            jsonDelDtls = [];
            jsonDelDtlsFiltered = [];
            $("#idvallugRsnReq").val(getGridData(_idNum, 0));
            $("#descvallugRsnReq").val(getGridData(_idNum, 1));
            $("#txtReasonType").val(getGridData(_idNum, 2));
        }
        else {
            $("#idvallugRsnReq").val($("#txtReasonCode").val());
            $("#descvallugRsnReq").val($("#txtReasonDesc").val());
            $("#txtReasonType").val($("#txtReasonTypeOld").val());
        }
    }

    if (genID == 'AdvancesQ') {
        if (answer == 'Yes') {
            withAdvs = true;
            cust_GetPara();
            //nwParameter_Add_Table("nwGridCon");
            nwParameter_Add_Spread(nwGridCon_Book);
            func_ActionDriven("actProcessDirect", false);
        }
        else {
            withAdvs = false;
        }
    }
}



function ClearBdgtCtrlDtls() {
    $('#txtBdgtCtrlNo').val('');
    $('#txtTransDate').val('');
}

function DisplayBdgtCtrl(docno, isProcess, trantype) {
    nwLoading_Start('LoadingGenBdgtCtrl', crLoadingHTML);
  
    $(`#nwBudgetCtrlDetails .BoxTitle`).text('Budget Control Details');
    $('#fldSetVwSOH').css('display', 'none');
    
    nwPopupForm_ShowModal('nwBudgetCtrlDetails');
    $('#txtBdgtCtrlReqDocno').val(docno);
    nwParameter_Add("txtDocno", docno);
    nwParameter_Add("isProcess", isProcess);
    nwParameter_Add("txtTrantype", trantype);
    func_ActionDriven("actGenBdgtCtrlDetails", false);
}

$(document).on("click", "#NwProcess", function (e) {
    msgBoxContainerQuestion = "Processdata";
    parent_MessageBoxQuestion("Do you want to process the record/s?", "Payment Request Entry", "Question");

    return true;
});

$(document).on("keydown", ".spr_qty", function (e) {

    if (e.which == 110 || e.which == 190)
        return false;
    var index = crnwTR.index();
    return IntNDecimalFormat("nwGridCon", index, e.which, SPR_QTY, 18, 0);
});

function IntNDecimalFormat(GridName, RowIndex, KeyCode, GridColumnName, IntLength, DecimalLength) {
    var sliptvalue;
    var index = crnwTR.index();

    var getvalue = nwTempTable_RowData_Get("" + GridName + "", RowIndex, (GridColumnName - 1), 'input');

    //39 - right, 40 - down, 37 - left, 38 - up
    if (KeyCode == 8 || KeyCode == 37 || KeyCode == 38 || KeyCode == 39 || KeyCode == 40)
        return true;
    else if (KeyCode == 189 || KeyCode == 109)
        return false;

    if ($("#" + GridName + " tbody tr:eq(" + RowIndex + ") td:eq(" + GridColumnName + ") input").val().indexOf('.') != -1 && (KeyCode == 190 || KeyCode == 110))
        event.preventDefault();

    var positionCursor = $("#" + GridName + " tbody tr:eq(" + RowIndex + ") td:eq(" + GridColumnName + ") input").prop("selectionStart");
    //var positionCursor = $(".txtCntrMinVolReq").prop("selectionStart");
    var ifIntOrDec;
    var IntLen = IntLength;
    var DecLen = DecimalLength;

    if (getvalue.indexOf(".") != -1) {
        sliptvalue = getvalue.split(".");
        var WholeNumber = sliptvalue[0].length;
        var DecimalPlace = sliptvalue[1].length;

        if (positionCursor >= 1 && positionCursor <= WholeNumber)
            ifIntOrDec = "Int";
        else if (positionCursor >= (WholeNumber + 1) && positionCursor <= (WholeNumber + 1) + DecimalPlace)
            ifIntOrDec = "Dec";

        if (sliptvalue[0].length >= IntLen && ifIntOrDec == "Int")
            return false;
        else if (sliptvalue[1].length >= DecLen && ifIntOrDec == "Dec")
            return false;
        else
            return true;

    } else {

        if (KeyCode == 190 || KeyCode == 110) {
            if ($("#" + GridName + " tbody tr:eq(" + RowIndex + ") td:eq(" + GridColumnName + ") input").val().indexOf('.') != -1 && (KeyCode == 190 || KeyCode == 110))
                event.preventDefault();
        } else {
            if (getvalue.length >= IntLen)
                return false;
            else
                return true;
        }
    }
}

$(document).on("click", ".btnDetails", function (e) {
    cust_GetPara();
    nwPopupForm_ShowModal("nwViewDetails");
});




/* ###STNDRD FUNC */
function func_LookUpInitialize(id) {
    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;
    var rowCD = GridCD.CellSelected.row - 1;
    var Grid = nwGridCon_Book.ActiveSheet;
    if (id == "lugIGTCode") {        
        nwParameter_Add("payeeRef", GridCD.GetValue(SPR_CD_PAYEEREFCODE - 1, rowCD));
        //nwParameter_Add("withSI", $(`#nwGrid-nwData tr:eq(${mainGridCurr.index()})`).find(`td:eq(${SPR_WITHSI}) input`).is(":checked"));
        nwParameter_Add("withSI", Grid.GetValue(SPR_WITHSI - 1, mainGridCurr));
        nwParameter_Add("idvallugRsnReq", $("#idvallugRsnReq").val());
        nwParameter_Add("reasonType", $("#txtReasonType").val());
        nwParameter_Add("idvallugLocAcctForms", $("#idvallugLocAcctForms").val());
    }
    if (id == "lugItemCode") {
        //nwParameter_Add("igtCode", crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text());
        //nwParameter_Add("payeeRef", crnwTR.find("td:eq(" + SPR_CD_PAYEEREFCODE + ")").text());
        nwParameter_Add("igtCode", GridCD.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, rowCD));
        nwParameter_Add("payeeRef", GridCD.GetValue(SPR_CD_PAYEEREFCODE - 1, rowCD));
        nwParameter_Add("idvallugRsnReq", $("#idvallugRsnReq").val());
        nwParameter_Add("reasonType", $("#txtReasonType").val());
        nwParameter_Add("withSI", Grid.GetValue(SPR_WITHSI - 1, mainGridCurr));
        nwParameter_Add("idvallugLocAcctForms", $("#idvallugLocAcctForms").val());
    }
    if (id == "lugPayeeRef") {
        //nwParameter_Add("itemCode", crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text());
        //nwParameter_Add("igtCode", crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text());
        nwParameter_Add("itemCode", GridCD.GetValue(SPR_CD_ITEMCODE - 1, rowCD));
        nwParameter_Add("igtCode", GridCD.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, rowCD));
        nwParameter_Add("idvallugLocAcctForms", $("#idvallugLocAcctForms").val());
    }
    if (id == "lugUOM") {
        //nwParameter_Add("itemcode", crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text());
        nwParameter_Add("itemcode", GridCD.GetValue(SPR_CD_ITEMCODE - 1, rowCD));
    }
    if (id == "lugSeg2" || id == "lugSeg3" || id == "lugSeg4" || id == "lugSeg5" || id == "lugSeg6") {
        nwParameter_Add("locForm", $("#idvallugLocAcctForms").val());       
    }
    if (id == "lugSLType") {
        nwParameter_Add("seg1", crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text());
        nwParameter_Add("seg1", GridCD.GetValue(SPR_CD_SEG1 - 1, rowCD));
    }
    if (id == "lugSLRef") {
        //nwParameter_Add("sltype", crnwTR.find("td:eq(" + SPR_CD_SLTYPECODE + ")").text());
        nwParameter_Add("sltype", GridCD.GetValue(SPR_CD_SLTYPECODE - 1, rowCD));
    }
    if (id == "lugBankAcct") {
        nwParameter_Add("locForm", $("#idvallugLocAcctForms").val());
    }
    if (id == "lugSeg2_AP" || id == "lugSeg3_AP" || id == "lugSeg4_AP" || id == "lugSeg5_AP" || id == "lugSeg6_AP") {
        nwParameter_Add("locForm", $("#idvallugLocAcctForms").val());
    }
    if (id == "lugExpense") {
        nwParameter_Add("txtDocno", $("#txtDocno").val());       
        nwParameter_Add("lineID", lineID);
    }
    return true;
}


/* ###GRID FUNC */

function fn_nwgridNext(nwgridID) {
    var isContinue = true;
    return isContinue;
}

function fn_nwgridPrev(nwgridID) {
    var isContinue = true;
    return isContinue;
}

function fn_nwgridFirst(nwgridID) {
    var isContinue = true;
    return isContinue;
}

function fn_nwgridLast(nwgridID) {
    var isContinue = true;
    return isContinue;
}

function nwgrid_PaginationNavDone(gridID) {
    //nwGrid_MergeCell('nwGrid1',6,7, "") /* merge cell */
    MainGridConfig();
}

function p8Spread_DblClick(canvasID, row, col) {
    p8Spread_CurBook = canvasID;

    if (isLevel1 == "1" && nwDocno != "") {
        if (canvasID == "nwGridExpenseCon") {
            if (col == (SPR_EA_EXPENSECODE - 1)) {
                lookUpCustomize("lugExpense", 2, "", true);
            }
        }
        if (canvasID == "nwGridChargeDtlsCon") {
            if (col == (SPR_CD_EWTSHORTDESC - 1)) {
                lookUpCustomize("lugEWTCode", 1, "", true);
            }
        }
    }

    if (nwDocno != "") {
        return;
    }

    if (canvasID == "nwGridCon") {
        if (col == (SPR_PAYMENTTERMDESC - 1)) {
            lookUpCustomize("lugPayTerm", 1, "", true);
        }
    }

    if (canvasID == "nwGridChargeDtlsCon") {
        isCopyRow == false;

        if (col == (SPR_CD_ITEMGRPTYPECODE - 1)) {
            //igtcode_glb = crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text();
            igtcode_glb = getGridData((SPR_CD_ITEMGRPTYPECODE - 1), 0);           
            lookUpCustomize("lugIGTCode", 1, "", true);
        }
        if (col == (SPR_CD_ITEMCODE - 1)) {
            lookUpCustomize("lugItemCode", 1, "", true);
        }
        if (col == (SPR_CD_VATSHORTDESC - 1)) {
            lookUpCustomize("lugVATCode", 1, "", true);
        }
        if (col == (SPR_CD_EWTSHORTDESC - 1)) {
            lookUpCustomize("lugEWTCode", 1, "", true);
        }
        if (col == (SPR_CD_UOM - 1)) {
            lookUpCustomize("lugUOM", 1, "", true);
        }
        if (col == (SPR_CD_PAYEEREFCODE - 1)) {
            lookUpCustomize("lugPayeeRef", 1, "", true);
        }

        if (col == (SPR_CD_SEG1 - 1)) {
            if (defaultLocSegCode == "01") {
                return;
            }
            else {
                lookUpCustomize("lugSeg1", 1, "", true);
            }
        }
        if (col == (SPR_CD_SEG2 - 1)) {
            if (defaultLocSegCode == "02") {
                return;
            }
            else {
                lookUpCustomize("lugSeg2", 1, "", true);
            }
        }
        if (col == (SPR_CD_SEG3 - 1)) {
            if (defaultLocSegCode == "03") {
                return;
            }
            else {
                lookUpCustomize("lugSeg3", 1, "", true);
            }
        }
        if (col == (SPR_CD_SEG4 - 1)) {
            if (defaultLocSegCode == "04") {
                return;
            }
            else {
                lookUpCustomize("lugSeg4", 1, "", true);
            }
        }
        if (col == (SPR_CD_SEG5 - 1)) {
            if (defaultLocSegCode == "05") {
                return;
            }
            else {
                lookUpCustomize("lugSeg5", 1, "", true);
            }
        }
        if (col == (SPR_CD_SEG6 - 1)) {
            if (defaultLocSegCode == "06") {
                return;
            }
            else {
                lookUpCustomize("lugSeg6", 1, "", true);
            }
        }

        if (col == (SPR_CD_SLTYPECODE - 1)) {
            lookUpCustomize("lugSLType", 1, "", true);
        }
        if (col == (SPR_CD_REFTYPECODE - 1)) {
            lookUpCustomize("lugSLRef", 1, "", true);
        }
        if (col == (SPR_CD_BANKACCT - 1)) {
            lookUpCustomize("lugBankAcct", 1, "", true);
        }
        //if (col == SPR_CD_CASHFLOWCODE) {
        //    lookUpCustomize("lugCashFlow", 1);
        //}
    }

    if (canvasID == "nwGridAllocProcessCon") {
        if (col == (SPR_AP_SEG2 - 1)) {
            lookUpCustomize("lugSeg2_AP", 1, "", true);
        }
        if (col == (SPR_AP_SEG3 - 1)) {
            lookUpCustomize("lugSeg3_AP", 1, "", true);
        }
        if (col == (SPR_AP_SEG4 - 1)) {
            lookUpCustomize("lugSeg4_AP", 1, "", true);
        }
        if (col == (SPR_AP_SEG5 - 1)) {
            lookUpCustomize("lugSeg5_AP", 1, "", true);
        }
        if (col == (SPR_AP_SEG6 - 1)) {
            lookUpCustomize("lugSeg6_AP", 1, "", true);
        }

        if (col == (SPR_AP_SEG2 - 1)|| col == (SPR_AP_SEG3 - 1)|| col == (SPR_AP_SEG4 - 1) || col == (SPR_AP_SEG5 - 1)|| col == (SPR_AP_SEG6 - 1)) {
            //$("#nwBdgtCheckingWindow").removeClass("zindexHigh2");
            //$('#AllocProcess').removeClass("zindexHigh");
            //$('#nwValidationList_Alloc').removeClass('zindexHigh3');
            //$("#nwUploadCon").removeClass("zindexHigh1");
        }
    }

    if (canvasID == "nwGridExpenseCon") {
        if (col == (SPR_EA_EXPENSECODE - 1)) {
            lookUpCustomize("lugExpense", 2, "", true);
        }
    }
    return true;
}

//function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
//    var nwobjID = nwobj.attr('id');
//    var col = crnwTD.index();
//    var currRow = crnwTR.index();    

//    if (isLevel1 == "1" && nwDocno != "") {
//        if (nwobjID == "nwGridExpense") {
//            if (col == SPR_EA_EXPENSECODE) {
//                lookUpCustomize("lugExpense", 2);
//            }
//        }
//        if (nwobjID == "nwGridChargeDtls") {
//            if (col == SPR_CD_EWTSHORTDESC) {
//                lookUpCustomize("lugEWTCode", 1);
//            }
//        }
//    }
  
//    if (nwDocno != "") {
//        return;
//    }

//    if (nwobjID == "nwGridChargeDtls") {
//        isCopyRow == false;

//        if (col == SPR_CD_ITEMGRPTYPECODE) {
//            igtcode_glb = crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text();
//            lookUpCustomize("lugIGTCode", 1);           
//        }
//        if (col == SPR_CD_ITEMCODE) {
//            lookUpCustomize("lugItemCode", 1);
//        }
//        if (col == SPR_CD_VATSHORTDESC) {
//            lookUpCustomize("lugVATCode", 1);
//        }
//        if (col == SPR_CD_EWTSHORTDESC) {
//            lookUpCustomize("lugEWTCode", 1);
//        }
//        if (col == SPR_CD_UOM) {
//            lookUpCustomize("lugUOM", 1);
//        }
//        if (col == SPR_CD_PAYEEREFCODE) {
//            lookUpCustomize("lugPayeeRef", 1);
//        }

//        if (col == SPR_CD_SEG1) {
//            if (defaultLocSegCode == "01") {
//                return;
//            }
//            else {
//                lookUpCustomize("lugSeg1", 1);
//            }
//        }
//        if (col == SPR_CD_SEG2) {
//            if (defaultLocSegCode == "02") {
//                return;
//            }
//            else {
//                lookUpCustomize("lugSeg2", 1);
//            }
//        }
//        if (col == SPR_CD_SEG3) {
//            if (defaultLocSegCode == "03") {
//                return;
//            }
//            else {
//                lookUpCustomize("lugSeg3", 1);
//            }
//        }
//        if (col == SPR_CD_SEG4) {
//            if (defaultLocSegCode == "04") {
//                return;
//            }
//            else {
//                lookUpCustomize("lugSeg4", 1);
//            }
//        }
//        if (col == SPR_CD_SEG5) {
//            if (defaultLocSegCode == "05") {
//                return;
//            }
//            else {
//                lookUpCustomize("lugSeg5", 1);
//            }
//        }
//        if (col == SPR_CD_SEG6) {
//            if (defaultLocSegCode == "06") {
//                return;
//            }
//            else {
//                lookUpCustomize("lugSeg6", 1);
//            }
//        }

//        if (col == SPR_CD_SLTYPECODE) {
//            lookUpCustomize("lugSLType", 1);
//        }
//        if (col == SPR_CD_REFTYPECODE) {
//            lookUpCustomize("lugSLRef", 1);
//        }
//        if (col == SPR_CD_BANKACCT) {
//            lookUpCustomize("lugBankAcct", 1);
//        }
//        //if (col == SPR_CD_CASHFLOWCODE) {
//        //    lookUpCustomize("lugCashFlow", 1);
//        //}
//    }

//    if (nwobjID == "nwGridAllocProcess") {
//        if (col == SPR_AP_SEG2) {
//            lookUpCustomize("lugSeg2_AP", 1);
//        }
//        if (col == SPR_AP_SEG3) {
//            lookUpCustomize("lugSeg3_AP", 1);
//        }
//        if (col == SPR_AP_SEG4) {
//            lookUpCustomize("lugSeg4_AP", 1);
//        }
//        if (col == SPR_AP_SEG5) {
//            lookUpCustomize("lugSeg5_AP", 1);
//        }
//        if (col == SPR_AP_SEG6) {
//            lookUpCustomize("lugSeg6_AP", 1);
//        }

//        if (col == SPR_AP_SEG2 || col == SPR_AP_SEG3 || col == SPR_AP_SEG4 || col == SPR_AP_SEG5 || col == SPR_AP_SEG6) {
//            $("#nwBdgtCheckingWindow").removeClass("zindexHigh2");
//            $('#AllocProcess').removeClass("zindexHigh");
//            $('#nwValidationList_Alloc').removeClass('zindexHigh3');           
//            $("#nwUploadCon").removeClass("zindexHigh1");
//        }       
//    }

//    if (nwobjID == "nwGrid") {
//        if (col == SPR_PAYMENTTERMDESC) {
//            lookUpCustomize("lugPayTerm", 1);
//        }        
//    }

//    if (nwobjID == "nwGridExpense") {
//        if (col == SPR_EA_EXPENSECODE) {
//            lookUpCustomize("lugExpense", 2);
//        }
//    }
//}

var mainGridCurr = '';
function nwGrid_Click(grid, crTR, crTD) {
    if (grid == "nwGridBdgtCharging") {
        DisplayBdgtCombinationAndChecking(grid, crnwTR.index());
    }
    if (grid == "nwGrid") {
        mainGridCurr = crTR;
        lineID = getDataOfGrid('nwGrid', '', SPR_LINEID, crnwTR.index());
        currRow = crnwTR.index();
    }
    if (grid == "nwGridChargeDtls") {
        rowCD = crnwTR.index();
        rownoCD = getDataOfGrid('nwGridChargeDtls', '', SPR_CD_TAG, crnwTR.index());
    }
}

function DisplayBdgtCombinationAndChecking() {
    var GridBC = nwGridBdgtChargingCon_Book.ActiveSheet;
    var row = GridBC.CellSelected.row - 1;
    //FOR BUDGET ACCOUNT COMBINATION
    var seg1 = $(`#idvallugBdgtChk_GLAccntChrge`).val();
    var seg1Desc = $(`#descvallugBdgtChk_GLAccntChrge`).val();
    //var seg2 = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG2CODE, row);
    //var seg2Desc = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG2DESC, row);
    //var seg3 = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG3CODE, row);
    //var seg3Desc = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG3DESC, row);
    //var seg4 = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG4CODE, row);
    //var seg4Desc = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG4DESC, row);
    //var seg5 = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG5CODE, row);
    //var seg5Desc = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG5DESC, row);
    //var seg6 = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG6CODE, row);
    //var seg6Desc = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG6DESC, row);

    var seg2 = GridBC.GetValue(SPR_BCD_SEG2CODE - 1, row);
    var seg2Desc = GridBC.GetValue(SPR_BCD_SEG2DESC - 1, row);
    var seg3 = GridBC.GetValue(SPR_BCD_SEG3CODE - 1, row);
    var seg3Desc = GridBC.GetValue(SPR_BCD_SEG3DESC - 1, row);
    var seg4 = GridBC.GetValue(SPR_BCD_SEG4CODE - 1, row);
    var seg4Desc = GridBC.GetValue(SPR_BCD_SEG4DESC - 1, row);
    var seg5 = GridBC.GetValue(SPR_BCD_SEG5CODE - 1, row);
    var seg5Desc = GridBC.GetValue(SPR_BCD_SEG5DESC - 1, row);
    var seg6 = GridBC.GetValue(SPR_BCD_SEG6CODE - 1, row);
    var seg6Desc = GridBC.GetValue(SPR_BCD_SEG6DESC - 1, row);

    var item = $(`#idvallugBdgtChk_Item`).val();
    var itemDesc = $(`#descvallugBdgtChk_Item`).val();
    var itemGrpType = $(`#idvallugBdgtChk_ItemGrpType`).val();
    var itemGrpTypeDesc = $(`#descvallugBdgtChk_ItemGrpType`).val();

    DisplayBdgtAccountCombination(seg1, seg1Desc, seg2, seg2Desc, seg3, seg3Desc, seg4, seg4Desc, seg5, seg5Desc, seg6, seg6Desc, itemGrpType, itemGrpTypeDesc, item, itemDesc);

    //FOR BUDGET CHECKING DETAILS
    //var seg1_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG1CODE_BGT, row);
    //var seg1Desc_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG1DESC_BGT, row);
    //var seg2_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG2CODE_BGT, row);
    //var seg2Desc_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG2DESC_BGT, row);
    //var seg3_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG3CODE_BGT, row);
    //var seg3Desc_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG3DESC_BGT, row);
    //var seg4_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG4CODE, row);
    //var seg4Desc_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG4DESC, row);
    //var seg5_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG5CODE_BGT, row);
    //var seg5Desc_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG5DESC_BGT, row);
    //var seg6_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG6CODE_BGT, row);
    //var seg6Desc_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG6DESC_BGT, row);
    //var itemGrpType_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_IGTCODE_BGT, row);
    //var itemGrpTypeDesc_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_IGTDESC_BGT, row);
    //var itemLvl_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_ITEMLVL_BGT, row);
    //var itemLvlDesc_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_ITEMLVLDESC_BGT, row);
    //var itemCode_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_ITEMCODE_BGT, row);
    //var itemDesc_bgt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_ITEMDESC_BGT, row);
    //var remQty = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_REMQTY, row);
    //var remAmnt = getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_REMAMT, row);

    var seg1_bgt = GridBC.GetValue(SPR_BCD_SEG1CODE_BGT - 1, row);
    var seg1Desc_bgt = GridBC.GetValue(SPR_BCD_SEG1DESC_BGT - 1, row);
    var seg2_bgt = GridBC.GetValue(SPR_BCD_SEG2CODE_BGT - 1, row);
    var seg2Desc_bgt = GridBC.GetValue(SPR_BCD_SEG2DESC_BGT - 1, row);
    var seg3_bgt = GridBC.GetValue(SPR_BCD_SEG3CODE_BGT - 1, row);
    var seg3Desc_bgt = GridBC.GetValue(SPR_BCD_SEG3DESC_BGT - 1, row);
    var seg4_bgt = GridBC.GetValue(SPR_BCD_SEG4CODE - 1, row);
    var seg4Desc_bgt = GridBC.GetValue(SPR_BCD_SEG4DESC - 1, row);
    var seg5_bgt = GridBC.GetValue(SPR_BCD_SEG5CODE_BGT - 1, row);
    var seg5Desc_bgt = GridBC.GetValue(SPR_BCD_SEG5DESC_BGT - 1, row);
    var seg6_bgt = GridBC.GetValue(SPR_BCD_SEG6CODE_BGT - 1, row);
    var seg6Desc_bgt = GridBC.GetValue(SPR_BCD_SEG6DESC_BGT - 1, row);
    var itemGrpType_bgt = GridBC.GetValue(SPR_BCD_IGTCODE_BGT - 1, row);
    var itemGrpTypeDesc_bgt = GridBC.GetValue(SPR_BCD_IGTDESC_BGT - 1, row);
    var itemLvl_bgt = GridBC.GetValue(SPR_BCD_ITEMLVL_BGT - 1, row);
    var itemLvlDesc_bgt = GridBC.GetValue(SPR_BCD_ITEMLVLDESC_BGT - 1, row);
    var itemCode_bgt = GridBC.GetValue(SPR_BCD_ITEMCODE_BGT - 1, row);
    var itemDesc_bgt = GridBC.GetValue(SPR_BCD_ITEMDESC_BGT - 1, row);
    var remQty = GridBC.GetValue(SPR_BCD_REMQTY - 1, row);
    var remAmnt = GridBC.GetValue(SPR_BCD_REMAMT - 1, row);

    DisplayBdgtCheckingDtls(seg1_bgt, seg1Desc_bgt, seg2_bgt, seg2Desc_bgt, seg3_bgt, seg3Desc_bgt, seg4_bgt, seg4Desc_bgt, seg5_bgt, seg5Desc_bgt, seg6_bgt, seg6Desc_bgt, itemGrpType_bgt, itemGrpTypeDesc_bgt, itemLvl_bgt, itemLvlDesc_bgt, itemCode_bgt, itemDesc_bgt, remQty, remAmnt);
}

function DisplayBdgtAccountCombination(seg1, seg1Desc, seg2, seg2Desc, seg3, seg3Desc, seg4, seg4Desc, seg5, seg5Desc, seg6, seg6Desc, itemGrpType, itemGrpTypeDesc, item, itemDesc) {
    if (seg3.length > 0) {
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_SEG1CODE, 0, seg1);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_SEG1DESC, 0, seg1Desc);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_SEG2, 0, seg2);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_SEG2DESC, 0, seg2Desc);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_SEG3, 0, seg3);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_SEG3DESC, 0, seg3Desc);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_SEG4, 0, seg4);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_SEG4DESC, 0, seg4Desc);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_SEG5, 0, seg5);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_SEG5DESC, 0, seg5Desc);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_SEG6, 0, seg6);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_SEG6DESC, 0, seg6Desc);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_ITEMGRPTYPE, 0, itemGrpType);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_IGTDESC, 0, itemGrpTypeDesc);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_ITEMCODE, 0, item);
        setGridData('nwGridBgtAcctCombCon', '', SPR_BAC_ITEMDESC, 0, itemDesc);
    }
}

function DisplayBdgtCheckingDtls(seg1_bgt, seg1Desc_bgt, seg2_bgt, seg2Desc_bgt, seg3_bgt, seg3Desc_bgt, seg4_bgt, seg4Desc_bgt, seg5_bgt, seg5Desc_bgt, seg6_bgt, seg6Desc_bgt, itemGrpType_bgt, itemGrpTypeDesc_bgt, itemLvl_bgt, itemLvlDesc_bgt, itemCode_bgt, itemDesc_bgt, remQty, remAmnt) {
    if (seg1_bgt.length > 0) {
        setGridData('nwGridBgtChkDtlsCon', '', GRD_SEG1CODE, 0, seg1_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_SEG1DESC, 0, seg1Desc_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_SEG2CODE, 0, seg2_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_SEG2DESC, 0, seg2Desc_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_SEG3CODE, 0, seg3_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_SEG3DESC, 0, seg3Desc_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_SEG4CODE, 0, seg4_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_SEG4DESC, 0, seg4Desc_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_SEG5CODE, 0, seg5_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_SEG5DESC, 0, seg5Desc_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_SEG6CODE, 0, seg6_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_SEG6DESC, 0, seg6Desc_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_ITEMGRPTYPE, 0, itemGrpTypeDesc_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_ITEMLEVEL, 0, itemLvlDesc_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_ITEM, 0, itemDesc_bgt);
        setGridData('nwGridBgtChkDtlsCon', '', GRD_REMQTY, 0, setNumReplace(remQty, 2));
        setGridData('nwGridBgtChkDtlsCon', '', GRD_BDGTAMNT, 0, setNumReplace(remAmnt, 2));
    }
}

function nwGrdi_Change(nwGridObj, crTR, crTD) {
    if (nwGridObj.attr("id") == "nwGrid") {
        if (crnwTD.index() == SPR_REFDATE) {
            
        }
    }
}

function func_nwGrid_CellChange(pvnwTR, pvnwTD) {
    /*pvnwTR = previous TR after change*/
    /*pvnwTD = previous TD after change*/
}

function func_nwGrid_RowChange(pvnwTR, pvnwTD) {
    /*pvnwTR = previous TR after change*/
    /*pvnwTD = previous TD after change*/
}

function func_nwGrid_Created(nwgridID) {
    execColor(); //Sample Only
}

function func_nwGrid_InsertValidation() {
    var isContinue = true;
    return isContinue;
}

function func_nwGrid_InsertDone(){
    var id = crnwTableCon.attr('id');

    if (id == "nwGrid") {
        DefaultColor();
    }
    if (id == "nwGridChargeDtls") {
        setTimeout(function () {
            isBtnDone = true;
            MainGridConfig();
            LiquidationCol();
        }, 100);
    }
    if (id == "nwGridAllocProcess") {
        setTimeout(function () {
            AllocProcDtlsConfig();
        }, 100);
    }
}

function func_nwGridAddRowBut(id) {
    var tbl = crnwTableCon.attr('id');
    if (tbl == "nwGridPrepayDef") {
        setTimeout(function () {
            nwGrid_AddRow("nwGridPrepayDefCon", 1);
            PropPrepayDefGrid();
        }, 100);
    }
}

function func_nwGrid_DeleteValidation() {
    var id = crnwTableCon.attr('id');

    if (id == 'nwGrid') {
        //var ItemCode = getGridData('nwGrid', '', Main.GRD_ITEMCODE, crnwTR.index());
        //var UOM = getGridData('nwGrid', '', Main.GRD_REQ_UOM_CODE, crnwTR.index());

        jsonDelDtls = FilterJsonDelDtls(docno, refno); //Delete all temporary data        
    }

    return true;
}

function func_nwGrid_DeleteDone() {
    var id = crnwTableCon.attr('id');

    if (id == "nwGrid") {
        DefaultColor();
        ComputeFooter();
    }
    if (id == "nwGridChargeDtls") {
        setTimeout(function () {
            isBtnDone = true;
            MainGridConfig();
            //LiquidationCol();
        }, 100);       
    }
    if (id == "nwGridAllocProcess") {
        setTimeout(function () {          
            AllocProcDtlsConfig();            
        }, 100);
    }

}

function func_nwGrid_CopyRowValidation() {
    var isContinue = true;
    return isContinue;
}

function func_nwGrid_CopyRowDone() {
    var id = crnwTableCon.attr('id');

    if (id == "nwGridChargeDtls") {
        setTimeout(function () {
            isCopyRow = true;
            isBtnDone = true;
            $('#nwGridChargeDtlsCon .tblGridBody tr:nth-child(' + (rowCD + 2) + ') td:nth-child(' + (SPR_CD_TAG + 1) + ')').text("");
            MainGridConfig();
            LiquidationCol();
        }, 100);
    }
}


// Custom Function
function setgridfilter() {
    filter = ""; 

    crnwTable = $("#nwGridCon .tblGridBody");
    var itemcount = crnwTable.find("tr").length;
    for (var i = 0; i < itemcount ; i++) {
        var code = crnwTable.find("tr:eq(" + i + ")").find("td:eq(1)").text();
        if (code.length > 0) {
            if (filter == "") {
                filter = "" + code + "";
            }
            else {
                filter += "|" + code + "";
            }
        }
    }

}
function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

function EnableFieldsDone() { //Binding Done
    ClearCDHdrFooter();

    $("#lugLocAcctForms").enable(false);
    $("#lugOrigCCC").enable(false);
    $("#lugVendorPayee").enable(false);
    $("#lugCurrency").enable(false);
    $("#lugRsnReq").enable(true);
    $("#lugAPCtrlAccnt").enable(true);

    $('#cmbPaymentRqstType').prop('disabled', true);
    $('#cmbPaymentRqstSubType').prop('disabled', true);
    $('#txtRemarks').prop('disabled', false);
    $('#txtOthrPayIns').prop('disabled', false);
    $('#btnViewAttach').enable(true);
    $('#btnViewJrnlEntries').enable(true);
    $("#noah-webui-default-CreateSBR").enable(true);
    $("#btnReqCompHDR").enable(true);    
    $('#nwGridCon').enable(true);

    $("#chkHoldPay").enable(true);    
    $("#chkWithSI").enable(false);
    $("#chkADA").enable(true);
    $("#chkAltPayee").enable(false);

    $("#txtValueDate").enable(true);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingPrint().visible(true);
    $("#noah-webui-Toolbox").bindingPrint().enable(true);
    $("#btnLoadHstTemp").enable(false);
    $("#btnLoadRecurTran").enable(false);

    if ($("#txtTranType").val() == "PRFDRT") {
        $(`#noah-webui-default-VwBdgtMonitoring`).enable(true);
    }
    else {
        $(`#noah-webui-default-VwBdgtMonitoring`).enable(false);
    }
    
    var isAltPayee = $("#chkAltPayee").is(":checked");
    if (isAltPayee) {       
        $("#btnAlterPayee").enable(true);
        //$("#btnAlterPayee").removeClass("btnGray");
        $("#btnAlterPayee").addClass("btn-default-green");
    }
    else {
        $("#btnAlterPayee").enable(false);
        //$("#btnAlterPayee").removeClass("btnGreen");
        $("#btnAlterPayee").addClass("btn-default-gray");
    }
    ClearAllJSONStrings();

    if (nwDocno != "") {
        $("#txtRemarks").enable(false);
        $("#txtOthrPayIns").enable(false);
        $("#txtValueDate").enable(false);
        $("#lugAPCtrlAccnt").enable(false);
        $("#lugRsnReq").enable(false);
    }

}

function ParticularsProp() {
    //crnwTable = $("#nwGridCon .tblGridBody tbody ");
    //var length = crnwTable.find("tr").length;
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var col = Grid.CellSelected.col - 1;
    Grid.RenderStatus = false;
    var length = Grid.GetMaxRow();
    var maxCol = Grid.GetMaxCol();
    for (var i = 0; i < length; i++) {
        //var text = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") textarea").val();
        var text = Grid.GetText(SPR_PARTICULARS - 1, i);
        Grid.SetText(SPR_PARTICULARS - 1, x, "...");
        Grid.SetTextAlign(SPR_PARTICULARS - 1, x, "center");
        Grid.SetTextColor(SPR_PARTICULARS - 1, i, "white");
        Grid.SetBold(SPR_PARTICULARS - 1, i, "bold");
        if (text != "") {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").removeClass("nwGButton")
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").removeClass("btnBlue")
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").addClass("btnGreen")
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").removeClass("nwGButton")
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").removeClass("btnBlue")
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").addClass("btnGreen")
            Grid.SetBackground(SPR_PARTICULARS - 1, i, "green");
        }
        else {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").addClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").addClass("btnBlue");
            Grid.SetBackground(SPR_PARTICULARS - 1, i, "blue");
        }
    }
    Grid.RenderStatus = true;
}

function RemarksProp() {
    //crnwTable = $("#nwGridApplyAdvDMCon .tblGridBody tbody ");
    //var length = crnwTable.find("tr").length;
    var Grid = nwGridConAADM_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var col = Grid.CellSelected.col - 1;

    Grid.RenderStatus = false;
    var length = Grid.GetMaxRow();
    var maxCol = Grid.GetMaxCol();

    for (var i = 0; i < length; i++) {
        //var text = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") textarea").val();
        var text = Grid.GetValue(SPR_ADM_REMARKS - 1, i);
        Grid.SetTextColor(SPR_ADM_REMARKS - 1, i, "white");
        Grid.SetBold(SPR_ADM_REMARKS - 1, i, "bold");
        if (text != "") {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("nwGButton");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").addClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("nwGButton");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ")").addClass("btnGreen");
            Grid.SetBackground(SPR_ADM_REMARKS - 1, i, "green");
        }
        else {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").addClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ")").addClass("btnBlue");
            Grid.SetBackground(SPR_ADM_REMARKS - 1, i, "blue");
        }
    }

    Grid.RenderStatus = true;
}

function PropnwGridCon() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var col = Grid.CellSelected.col - 1;

    Grid.RenderStatus = false;
    var maxRow = Grid.GetMaxRow();
    var maxCol = Grid.GetMaxCol();
    var isCheckAll = true;
    var hasData = false;
    for (var i = 0; i <= maxRow - 1; i++) {
        //var refno = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ") input").val();
        //var text = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") textarea").val();  
        var refno = Grid.GetValue(SPR_REFNO - 1, i);
        var text = Grid.GetValue(SPR_PARTICULARS - 1, i);
        if (refno != "") {
            hasData = true;
        }

        Grid.SetText2(SPR_PARTICULARS - 1, i, "...");
        Grid.SetTextAlign(SPR_PARTICULARS - 1, i, "center");
        Grid.SetTextColor(SPR_PARTICULARS - 1, i, "white");
        Grid.SetBold(SPR_PARTICULARS - 1, i, "bold");

        Grid.SetText(SPR_REQMTCOMPLIANCE - 1, i, "...");
        Grid.SetTextAlign(SPR_REQMTCOMPLIANCE - 1, i, "center");
        Grid.SetTextColor(SPR_REQMTCOMPLIANCE - 1, i, "white");
        Grid.SetBold(SPR_REQMTCOMPLIANCE - 1, i, "bold");

        Grid.SetText(SPR_RVWATTACHMENTS - 1, i, "...");
        Grid.SetTextAlign(SPR_RVWATTACHMENTS - 1, i, "center");
        Grid.SetTextColor(SPR_RVWATTACHMENTS - 1, i, "white");
        Grid.SetBold(SPR_RVWATTACHMENTS - 1, i, "bold");

        if (text != "") {
            Grid.SetBackground(SPR_PARTICULARS - 1, i, "green");         
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").removeClass("nwGButton")
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").removeClass("btnBlue")
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").addClass("btnGreen")
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").removeClass("nwGButton")
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").removeClass("btnBlue")
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").addClass("btnGreen")
        }
        else {
            Grid.SetBackground(SPR_PARTICULARS - 1, i, "blue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").addClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").addClass("btnBlue");
        }
        
        //if (crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CDTAG + ")").text() == "1") {
        Grid.SetTextColor(SPR_CHARGINGDTLS - 1, i, "white");
        Grid.SetBold(SPR_CHARGINGDTLS - 1, i, "bold");
        if (Grid.GetValue(SPR_CDTAG - 1, i) == "1") {
            Grid.SetBackground(SPR_CHARGINGDTLS - 1, i, "green");          
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CHARGINGDTLS + ")").removeClass("btnOrange");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CHARGINGDTLS + ")").addClass("btnGreen");
        }
        else {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CHARGINGDTLS + ")").addClass("btnOrange");
            Grid.SetBackground(SPR_CHARGINGDTLS - 1, i, "orange");
        }
        Grid.SetTextColor(SPR_RECURRING - 1, i, "white");
        Grid.SetBold(SPR_RECURRING - 1, i, "bold");
        //if (crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RDTAG + ")").text() == "1") {
        if (Grid.GetValue(SPR_RDTAG - 1, i) == "1") {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RECURRING + ")").removeClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RECURRING + ")").addClass("btnGreen");
            Grid.SetBackground(SPR_RECURRING - 1, i, "green");      
        }
        else {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RECURRING + ")").addClass("btnBlue");
            Grid.SetBackground(SPR_RECURRING - 1, i, "blue");
        }
        Grid.SetTextColor(SPR_PREPAYMENTDTLS - 1, i, "white");
        Grid.SetBold(SPR_PREPAYMENTDTLS - 1, i, "bold");
        //if (crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PDTAG + ")").text() == "1") {
        if (Grid.GetValue(SPR_PDTAG - 1, i) == "1") {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PREPAYMENTDTLS + ")").removeClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PREPAYMENTDTLS + ")").addClass("btnGreen");
            Grid.SetBackground(SPR_PREPAYMENTDTLS - 1, i, "green");          
        }
        else {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PREPAYMENTDTLS + ")").addClass("btnBlue");
            Grid.SetBackground(SPR_PREPAYMENTDTLS - 1, i, "blue");
        }

        //var rctag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RCTAG + ")").text();
        var rctag = Grid.GetValue(SPR_RCTAG - 1, i);
        Grid.SetTextColor(SPR_REQMTCOMPLIANCE - 1, i, "white");
        Grid.SetBold(SPR_REQMTCOMPLIANCE - 1, i, "bold");
        if (isLoadHstTemp == true) {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGray");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").addClass("btnOrange");
            Grid.SetBackground(SPR_REQMTCOMPLIANCE - 1, i, "orange");
        }
        else {
            if (isNewData == true) {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").enable(false);
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnOrange");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").addClass("btnGray");
                Grid.SetBackground(SPR_REQMTCOMPLIANCE - 1, i, "gray");
                Grid.SetEnable(SPR_REQMTCOMPLIANCE - 1, i, false);
            }
            else if (rctag == "1") {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").enable(true);
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGray");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnOrange");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").addClass("btnGreen");
                Grid.SetBackground(SPR_REQMTCOMPLIANCE - 1, i, "green");
                Grid.SetEnable(SPR_REQMTCOMPLIANCE - 1, i, true);
            }
            else {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").enable(true);
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGray");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGreen");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").addClass("btnOrange");
                Grid.SetBackground(SPR_REQMTCOMPLIANCE - 1, i, "orange");
                Grid.SetEnable(SPR_REQMTCOMPLIANCE - 1, i, true);
            }
        }
        //var ratag = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RATAG + ')').text();
        var ratag = Grid.GetValue(SPR_RATAG - 1, i);
        if (ratag == "Gray") {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGreen");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRed");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnYellow");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRvwAttach");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnGray");
            Grid.SetBackground(SPR_RVWATTACHMENTS - 1, i, "gray");
        }
        else if (ratag == "Red") {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGreen");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGray");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnYellow");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnRed");
            Grid.SetBackground(SPR_RVWATTACHMENTS - 1, i, "red");
        }
        else if (ratag == "Yellow") {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGreen");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGray");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRed");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnYellow");
            Grid.SetBackground(SPR_RVWATTACHMENTS - 1, i, "yellow");
        }
        else if (ratag == "Green") {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGray");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRed");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnYellow");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnGreen");
            Grid.SetBackground(SPR_RVWATTACHMENTS - 1, i, "green");
        }
        else {
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGreen");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRed");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnYellow");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRvwAttach");
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnGray");
            Grid.SetBackground(SPR_RVWATTACHMENTS - 1, i, "gray");
        }
        //var refTranNo = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFTRANNO + ")").text();
        var refTranNo = Grid.GetValue(SPR_REFTRANNO - 1, i);
        //if (refTranNo == "") {
        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RVWATTACHMENTS + ")").removeClass("btnGreen");
        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RVWATTACHMENTS + ")").addClass("btnGray");
        //}
        //else {
        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RVWATTACHMENTS + ")").removeClass("btnGray");
        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RVWATTACHMENTS + ")").addClass("btnGreen");
        //}

        //var holdpay = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_HOLDPAYMENT + ") input").is(":checked");
        var holdpay = Grid.GetValue(SPR_HOLDPAYMENT - 1, i);
        Grid.SetTextColor(SPR_REMARKSHOLD - 1, i, "white");
        Grid.SetBold(SPR_REMARKSHOLD - 1, i, "bold");
        if (holdpay) {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").enable(true);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").css("background-color", "white");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ")").css("background-color", "white");
            Grid.SetEnable(SPR_REMARKSHOLD - 1, i, true);
        }
        else {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").enable(false);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").css("background-color", "gainsboro");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ")").css("background-color", "gainsboro");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").css("border", "none");
            Grid.SetEnable(SPR_REMARKSHOLD - 1, i, false);
        }

        //var docno = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFTRANNO + ")").text();
        //var withsitag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WITHSITAG + ")").text();
        var docno = Grid.GetValue(SPR_REFTRANNO - 1, i);
        var withsitag = Grid.GetValue(SPR_WITHSITAG - 1, i);
        if (docno.includes("PURCHS") && withsitag != "1") {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WITHSI + ") input").enable(true);
            Grid.SetEnable(SPR_WITHSI - 1, i, true);
            isCheckAll = false;
        }
        else {
            if (docno == '') {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WITHSI + ") input").enable(true);
                Grid.SetEnable(SPR_WITHSI - 1, i, true);
                $(".nwCheckBoxTot.nwCheckBoxTot5").enable(true);
                isCheckAll = false;
            }
            else {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WITHSI + ") input").enable(false);
                Grid.SetEnable(SPR_WITHSI - 1, i, false);
            }
        }

        if (inputConfig == '0' && refTranNo != "") {
            //let drnotag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRNOTAG + ")").text();
            //let drdatetag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRDATETAG + ")").text();
            //let refnotag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNOTAG + ")").text();
            //let refdatetag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFDATETAG + ")").text();
            //let cdatetag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CDATETAG + ")").text();
            let drnotag = Grid.GetValue(SPR_DRNOTAG - 1, i);
            let drdatetag = Grid.GetValue(SPR_DRDATETAG - 1, i);
            let refnotag = Grid.GetValue(SPR_REFNOTAG - 1, i);
            let refdatetag = Grid.GetValue(SPR_REFDATETAG - 1, i);
            let cdatetag = Grid.GetValue(SPR_CDATETAG - 1, i);
            if (drnotag != "") {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRNO + ") input").enable(false);
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRNO + ") input").css("background-color", "gainsboro");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRNO + ") input").css("border", "none");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRNO + ")").css("background-color", "gainsboro");
                Grid.SetEnable(SPR_DRNO - 1, i, false);
            }
            else {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRNO + ") input").enable(true);
                Grid.SetEnable(SPR_DRNO - 1, i, true);
            }
            if (drdatetag != "") {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRDATE + ") input").enable(false);
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRDATE + ")").css("background-color", "gainsboro");
                Grid.SetEnable(SPR_DRDATE - 1, i, false);
            }
            else {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRDATE + ") input").enable(true);
                Grid.SetEnable(SPR_DRDATE - 1, i, true);
            }
            if (refnotag != "") {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ") input").css("background-color", "gainsboro");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ") input").css("border", "none");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ")").css("background-color", "gainsboro");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ")").enable(false);
                Grid.SetEnable(SPR_REFNO - 1, i, false);
            }
            else {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ") input").enable(true);
                Grid.SetEnable(SPR_REFNO - 1, i, true);
            }
            if (refdatetag != "") {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFDATE + ") input").enable(false);
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFDATE + ")").css("background-color", "gainsboro");
                Grid.SetEnable(SPR_REFDATE - 1, i, false);
            }
            else {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFDATE + ") input").enable(true);
                Grid.SetEnable(SPR_REFDATE - 1, i, true);
            }
            if (cdatetag != "") {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_COUNTERDATE + ") input").enable(false);
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_COUNTERDATE + ")").css("background-color", "gainsboro");
                Grid.SetEnable(SPR_COUNTERDATE - 1, i, false);
            }
            else {
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_COUNTERDATE + ") input").enable(true);
                Grid.SetEnable(SPR_COUNTERDATE - 1, i, true);
            }
        }
        else {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRNO + ") input").enable(true);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRDATE + ") input").enable(true);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ") input").enable(true);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFDATE + ") input").enable(true);
            Grid.SetEnable(SPR_DRNO - 1, i, true);
            Grid.SetEnable(SPR_DRDATE - 1, i, true);
            Grid.SetEnable(SPR_REFNO - 1, i, true);
            Grid.SetEnable(SPR_REFDATE - 1, i, true);
        }

        //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").addClass("btnFont");             
    }

    if (isCheckAll == true) {
        $(".nwCheckBoxTot.nwCheckBoxTot5").enable(false);
    }

    if (nwDocno != '') {
        $(".nwgrid_Insert").enable(false);
        $(".nwgrid_Delete").enable(false);
        $(".nwgrid_SaveWidth").enable(false);
        $(".nwgrid_ResetWidth").enable(false);
    }

    Grid.RenderStatus = true;
}

//function PropnwGridCon() {
//    crnwTable = $("#nwGridCon .tblGridBody tbody ");
//    var isCheckAll = true;
//    var length = crnwTable.find("tr").length;
//    var hasData = false;
//    for (var i = 0; i < length; i++) {
//        var refno = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ") input").val();
//        if (refno != "") {
//            hasData = true;
//        }
//        var text = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") textarea").val();
//        if (text != "") {
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").removeClass("nwGButton")
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").removeClass("btnBlue")
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").addClass("btnGreen")
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").removeClass("nwGButton")
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").removeClass("btnBlue")
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").addClass("btnGreen")
//        }
//        else {
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").removeClass("btnGreen");
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").addClass("btnBlue");
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").removeClass("btnGreen");
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").addClass("btnBlue");
//        }

//        if (crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CDTAG + ")").text() == "1") {
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CHARGINGDTLS + ")").removeClass("btnOrange");
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CHARGINGDTLS + ")").addClass("btnGreen");
//        }
//        else {
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CHARGINGDTLS + ")").addClass("btnOrange");
//        }

//        if (crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RDTAG + ")").text() == "1") {
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RECURRING + ")").removeClass("btnBlue");
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RECURRING + ")").addClass("btnGreen");
//        }
//        else {
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RECURRING + ")").addClass("btnBlue");
//        }

//        if (crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PDTAG + ")").text() == "1") {
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PREPAYMENTDTLS + ")").removeClass("btnBlue");
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PREPAYMENTDTLS + ")").addClass("btnGreen");
//        }
//        else {
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PREPAYMENTDTLS + ")").addClass("btnBlue");
//        }

//        //if (crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFTRANNO + ")").text() == "") {
//        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFTRANNO + ")").enable(false);
//        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFTRANDATE + ")").enable(false);            
//        //}
//        //else {
//        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFTRANNO + ")").enable(true);
//        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFTRANDATE + ")").enable(true);
//        //}
//        var rctag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RCTAG + ")").text();
//        if (isLoadHstTemp == true) {
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGray");
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGreen");
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").addClass("btnOrange");
//        }
//        else {
//            if (isNewData == true) {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").enable(false);
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnOrange");
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").addClass("btnGray");
//            }
//            else if (rctag == "1") {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").enable(true);
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGray");
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnOrange");
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").addClass("btnGreen");
//            }
//            else {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").enable(true);
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGray");
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGreen");
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").addClass("btnOrange");
//            }
//        }
//        var ratag = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RATAG + ')').text();
//        if (ratag == "Gray") {
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGreen");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRed");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnYellow");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRvwAttach");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnGray");
//        }
//        else if (ratag == "Red") {
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGreen");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGray");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnYellow");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnRed");
//        }
//        else if (ratag == "Yellow") {
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGreen");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGray");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRed");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnYellow");
//        }
//        else if (ratag == "Green") {
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGray");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRed");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnYellow");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnGreen");
//        }
//        else {
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGreen");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRed");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnYellow");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRvwAttach");
//            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnGray");
//        }


//        var refTranNo = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFTRANNO + ")").text();
//        //if (refTranNo == "") {
//        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RVWATTACHMENTS + ")").removeClass("btnGreen");
//        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RVWATTACHMENTS + ")").addClass("btnGray");
//        //}
//        //else {
//        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RVWATTACHMENTS + ")").removeClass("btnGray");
//        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RVWATTACHMENTS + ")").addClass("btnGreen");
//        //}

//        var holdpay = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_HOLDPAYMENT + ") input").is(":checked");
//        if (holdpay) {
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").enable(true);
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").css("background-color", "white");
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ")").css("background-color", "white");
//        }
//        else {
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").enable(false);
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").css("background-color", "gainsboro");
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ")").css("background-color", "gainsboro");
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").css("border", "none");
//        }

//        var docno = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFTRANNO + ")").text();
//        var withsitag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WITHSITAG + ")").text();
//        if (docno.includes("PURCHS") && withsitag != "1") {
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WITHSI + ") input").enable(true);
//            isCheckAll = false;
//        }
//        else {
//            if (docno == '') {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WITHSI + ") input").enable(true);
//                $(".nwCheckBoxTot.nwCheckBoxTot5").enable(true);
//                isCheckAll = false;
//            }
//            else {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WITHSI + ") input").enable(false);
//            }
//        }

//        if (inputConfig == '0' && refTranNo != "") {
//            let drnotag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRNOTAG + ")").text();
//            let drdatetag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRDATETAG + ")").text();
//            let refnotag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNOTAG + ")").text();
//            let refdatetag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFDATETAG + ")").text();
//            let cdatetag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CDATETAG + ")").text();
//            if (drnotag != "") {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRNO + ") input").enable(false);
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRNO + ") input").css("background-color", "gainsboro");
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRNO + ") input").css("border", "none");
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRNO + ")").css("background-color", "gainsboro");
//            }
//            else {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRNO + ") input").enable(true);
//            }
//            if (drdatetag != "") {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRDATE + ") input").enable(false);
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRDATE + ")").css("background-color", "gainsboro");
//            }
//            else {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRDATE + ") input").enable(true);
//            }
//            if (refnotag != "") {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ") input").css("background-color", "gainsboro");
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ") input").css("border", "none");
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ")").css("background-color", "gainsboro");
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ")").enable(false);
//            }
//            else {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ") input").enable(true);
//            }
//            if (refdatetag != "") {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFDATE + ") input").enable(false);
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFDATE + ")").css("background-color", "gainsboro");
//            }
//            else {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFDATE + ") input").enable(true);
//            }
//            if (cdatetag != "") {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_COUNTERDATE + ") input").enable(false);
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_COUNTERDATE + ")").css("background-color", "gainsboro");
//            }
//            else {
//                crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_COUNTERDATE + ") input").enable(true);
//            }           
//        }
//        else {
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRNO + ") input").enable(true);
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DRDATE + ") input").enable(true);
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFNO + ") input").enable(true);
//            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFDATE + ") input").enable(true);
//        }
                       
//        crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").addClass("btnFont");
//    }

//    if (isCheckAll == true) {
//        $(".nwCheckBoxTot.nwCheckBoxTot5").enable(false);
//    }

//    //if (!hasData)
//    //{
//    //    //$("#nwGridCon").enable(false);
//    //    $('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').enable(false);
//    //    $('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFDATE + 1) + ') input').enable(false);
//    //    $('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').enable(false);
//    //    $('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRDATE + 1) + ') input').enable(false);
//    //    $('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_COUNTERDATE + 1) + ') input').enable(false);
//    //    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DUEDATE + 1) + ') input').enable(false);
//    //    $('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_GROSSAMT + 1) + ') input').enable(false);
//    //}
//    //else { $("#nwGridCon").enable(true); }

//    if (nwDocno != '') {
//        $(".nwgrid_Insert").enable(false);
//        $(".nwgrid_Delete").enable(false);
//        $(".nwgrid_SaveWidth").enable(false);
//        $(".nwgrid_ResetWidth").enable(false);
//    }
//}


function DefaultColor() {
    setTimeout(function () {
        var Grid = nwGridCon_Book.ActiveSheet;
        Grid.RenderStatus = false;
        var length = Grid.GetMaxRow();
        //crnwTable = $("#nwGridCon .tblGridBody tbody ");
        var isCheckAll = true;
        //var length = crnwTable.find("tr").length;
        var hasData = false;
        for (var i = 0; i < length; i++) {
            //var text = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") textarea").val();
            var text = Grid.GetValue(SPR_PARTICULARS - 1, i);
            if (text != "") {
                Grid.SetBackground(SPR_PARTICULARS - 1, i, 'green');
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").removeClass("nwGButton")
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").removeClass("btnBlue")
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").addClass("btnGreen")
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").removeClass("nwGButton")
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").removeClass("btnBlue")
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").addClass("btnGreen")
            }
            else {
                Grid.SetBackground(SPR_PARTICULARS - 1, i, 'blue');
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").removeClass("btnGreen");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ")").addClass("btnBlue");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").removeClass("btnGreen");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").addClass("btnBlue");
            }

            //var rctag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_RCTAG + ")").text();
            var rctag = Grid.GetValue(SPR_RCTAG - 1, i);
            if (isLoadHstTemp == true) {
                Grid.SetBackground(SPR_REQMTCOMPLIANCE - 1, i, 'orange');
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGray");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGreen");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").addClass("btnOrange");
            }
            else {
                if (isNewData == true) {
                    Grid.SetBackground(SPR_REQMTCOMPLIANCE - 1, i, 'gray');
                    Grid.SetEnable(SPR_REQMTCOMPLIANCE - 1, i, false);
                    //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").enable(false);
                    //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnOrange");
                    //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").addClass("btnGray");
                }
                else if (rctag == "1") {
                    Grid.SetBackground(SPR_REQMTCOMPLIANCE - 1, i, 'green');
                    Grid.SetEnable(SPR_REQMTCOMPLIANCE - 1, i, true);
                    //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").enable(true);
                    //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGray");
                    //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnOrange");
                    //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").addClass("btnGreen");
                }
                else {
                    Grid.SetBackground(SPR_REQMTCOMPLIANCE - 1, i, 'orange');
                    Grid.SetEnable(SPR_REQMTCOMPLIANCE - 1, i, true);
                    //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").enable(true);
                    //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGray");
                    //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").removeClass("btnGreen");
                    //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REQMTCOMPLIANCE + ")").addClass("btnOrange");
                }
            }
            //var ratag = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RATAG + ')').text();
            var ratag = Grid.GetValue(SPR_RATAG - 1, i);
            if (ratag == "Gray") {
                Grid.SetBackground(SPR_RVWATTACHMENTS - 1, i, 'gray');
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGreen");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRed");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnYellow");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRvwAttach");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnGray");
            }
            else if (ratag == "Red") {
                Grid.SetBackground(SPR_RVWATTACHMENTS - 1, i, 'red');
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGreen");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGray");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnYellow");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnRed");
            }
            else if (ratag == "Yellow") {
                Grid.SetBackground(SPR_RVWATTACHMENTS - 1, i, 'yellow');
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGreen");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGray");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRed");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnYellow");
            }
            else if (ratag == "Green") {
                Grid.SetBackground(SPR_RVWATTACHMENTS - 1, i, 'green');
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGray");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRed");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnYellow");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnGreen");
            }
            else {
                Grid.SetBackground(SPR_RVWATTACHMENTS - 1, i, 'gray');
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnGreen");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRed");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnYellow");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').removeClass("btnRvwAttach");
                //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_RVWATTACHMENTS + ')').addClass("btnGray");
            }

            //var holdpay = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_HOLDPAYMENT + ") input").is(":checked");
            var holdpay = Grid.GetValue(SPR_HOLDPAYMENT - 1, i);
            if (holdpay) {
                Grid.SetEnable(SPR_REMARKSHOLD - 1, i, true);
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").enable(true);
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").css("background-color", "white");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ")").css("background-color", "white");
            }
            else {
                Grid.SetEnable(SPR_REMARKSHOLD - 1, i, false);
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").enable(false);
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").css("background-color", "gainsboro");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ")").css("background-color", "gainsboro");
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSHOLD + ") input").css("border", "none");
            }

            //var docno = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REFTRANNO + ")").text();
            //var withsitag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WITHSITAG + ")").text();
            var docno = Grid.GetValue(SPR_REFTRANNO - 1, i);
            var withsitag = Grid.GetValue(SPR_WITHSITAG - 1, i);
            if (docno.includes("PURCHS") && withsitag != "1") {
                Grid.SetEnable(SPR_WITHSI - 1, i, true);
                //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WITHSI + ") input").enable(true);
                isCheckAll = false;
            }
            else {
                if (docno == '') {
                    Grid.SetEnable(SPR_WITHSI - 1, i, true);
                    //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WITHSI + ") input").enable(true);
                    $(".nwCheckBoxTot.nwCheckBoxTot5").enable(true);
                    isCheckAll = false;
                }
                else {
                    Grid.SetEnable(SPR_WITHSI - 1, i, false);
                    //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_WITHSI + ") input").enable(false);
                }
            }

            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PARTICULARS + ") button").addClass("btnFont");
        }
             
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REQMTCOMPLIANCE + 1) + ')').addClass("btnOrange");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_RVWATTACHMENTS + 1) + ')').addClass("btnBlue");        

        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMCODE + 1) + ')').text(paytermCode);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMDESC + 1) + ')').text(paytermDesc);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_NOOFDAYS + 1) + ')').text(noDays);

        //if ($("#cmbPaymentRqstType").val() == "02") {
        //    $('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFTRANNO + 1) + ')').enable(false);
        //    $('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFTRANDATE + 1) + ')').enable(false);
        //}
        Grid.RenderStatus = true;
    }, 100);    
}


$(document).on('change', '#txtEffectiveDate', function () {

    if ($(this).val() < currentServerDate) {
        MessageBox("Effective Date should not be earlier than current server date.");
        $(this).val('');
    }
});

$(document).on('change', '#cmbPaymentRqstType', function () {
    var val = $("#cmbPaymentRqstType").val();

    //Non-PO
    if (val == "02") {

        $("#nwGridCon").enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFTRANNO + 1) + ')').enable(false);
        $("#cmbPaymentRqstSubType").enable(true);
        $("#cmbPaymentRqstSubType").val("");
        EnableGridCol();
        ClearGridCol();        
    }
    //PO
    else if (val == "01") {
        $("#nwGridCon").enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFTRANNO + 1) + ')').enable(true);
        $("#cmbPaymentRqstSubType").enable(false);
        $("#cmbPaymentRqstSubType").val("");
        DisableGridCol();
        ClearGridCol();   
    }
    else {
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFTRANNO + 1) + ')').enable(false);
        DisableGridCol();
        ClearGridCol();
        $("#nwGridCon").enable(false);
    }  
});

function NonPOProp() {
    $("#nwGridCon").enable(true);       
    $("#cmbPaymentRqstSubType").enable(true);
    $("#cmbPaymentRqstSubType").val("");
    EnableGridCol();
    ClearGridCol();
    var Grid = nwGridCon_Book.ActiveSheet;
    Grid.SetEnable(SPR_RVWATTACHMENTS - 1, Spread_ALLROW, false);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PREPAYMENTDTLS + 1) + ')').enable(false);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PREPAYMENTDTLS + 1) + ')').removeClass("btnPrepaymentDtls");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_RECURRING + 1) + ')').enable(false);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_RECURRING + 1) + ')').removeClass("btnRecurring");
    ////$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFTRANNO + 1) + ')').enable(false);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_RVWATTACHMENTS + 1) + ')').enable(false);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_RVWATTACHMENTS + 1) + ')').removeClass("btnRvwAttach");   
    $("#lugVendorPayee").enable(true);
    if (remarksConfig == "True") {
        $("#txtRemarks").css({ "text-transform": "uppercase" });
        $("#txtOthrPayIns").css({ "text-transform": "uppercase" });
        $("#txtDisapprvRemarks").css({ "text-transform": "uppercase" });
        $("#txtRemarksHold").css({ "text-transform": "uppercase" });
        $("#txtnwgRemarks").css({ "text-transform": "uppercase" });
    }
    else {
        $("#txtRemarks").css({ "text-transform": "none" });
        $("#txtOthrPayIns").css({ "text-transform": "none" });
        $("#txtDisapprvRemarks").css({ "text-transform": "none" });
        $("#txtRemarksHold").css({ "text-transform": "none" });
        $("#txtnwgRemarks").css({ "text-transform": "none" });
    }
    $("#cmbPaymentRqstSubType").val("01");
    $("#cmbPaymentRqstSubType").enable(false);
    $("#btnVwJournal").enable(false);
    $("#btnRvwAttachments").enable(false);
    $("#btnVwConsoCharging").enable(true);
}

function DisableGridCol() {  
    $("#btnDownloadTemplate").addClass("btn-default");
    $("#btnUploadTemplate").addClass("btn-default");
    $("#btnRvwAttachments").addClass("btn-default");
    $("#btnVwJournal").addClass("btn-default");
    $("#btnVwConsoCharging").addClass("btn-default");

    $("#btnDownloadTemplate").addClass("btn-default-blue");
    $("#btnUploadTemplate").addClass("btn-default-orange");
    $("#btnRvwAttachments").addClass("btn-default-blue");
    $("#btnVwJournal").addClass("btn-default-gray");
    $("#btnVwConsoCharging").addClass("btn-default-gray");

    let isUploading = $("#txtIsUploading").val();
    if (isUploading == 'True') {
        $("#btnDLUploading").enable(true);
        //$("#btnDLUploading").removeClass("btnGray");
        $("#btnDLUploading").addClass("btn-default-green");
    }
    else {
        $("#btnDLUploading").enable(false);
        //$("#btnDLUploading").removeClass("btnGreen");
        $("#btnDLUploading").addClass("btn-default-gray");
    }

    if (!isNewData) {
        $("#btnDownloadTemplate").enable(false);
        $("#btnUploadTemplate").enable(false);
        $("#btnVwJournal").enable(true);
    }
    else {
        $("#btnDownloadTemplate").enable(true);
        $("#btnUploadTemplate").enable(true);
        $("#btnVwJournal").enable(false);
    }

    if (nwDocno != "") {
        var Grid = nwGridCon_Book.ActiveSheet;       
        Grid.SetEnable(SPR_REFNO - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_REFDATE - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_DRNO - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_DRDATE - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_COUNTERDATE - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_DUEDATE - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_GROSSAMT - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_WITHADA - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_HOLDPAYMENT - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_WITHSI - 1, Spread_ALLROW, false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFDATE + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRDATE + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_COUNTERDATE + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DUEDATE + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_GROSSAMT + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_WITHADA + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_HOLDPAYMENT + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_WITHSI + 1) + ') input').enable(false);
        //$(".nwCheckBoxTot.nwCheckBoxTot21").enable(false);
        //$(".nwCheckBoxTot.nwCheckBoxTot22").enable(false);
        //$(".nwCheckBoxTot.nwCheckBoxTot5").enable(false);
        
        Grid.SetBackground(SPR_REFNO - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_REFDATE - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_DRNO - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_DRDATE - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_PAYMENTTERMCODE - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_PAYMENTTERMDESC - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_COUNTERDATE - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_DUEDATE - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_GROSSAMT - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_WITHSI - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_WITHADA - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_HOLDPAYMENT - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_REMARKSHOLD - 1, Spread_ALLROW, "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').css("border", "none");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFDATE + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').css("border", "none");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRDATE + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMCODE + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMDESC + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_COUNTERDATE + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DUEDATE + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_GROSSAMT + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_WITHSI + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_WITHADA + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_HOLDPAYMENT + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REMARKSHOLD + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REMARKSHOLD + 1) + ') input').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REMARKSHOLD + 1) + ') input').css("border", "none");
    }
}

function DisableGridColMain() {
    $("#btnDownloadTemplate").addClass("btn-default");
    $("#btnUploadTemplate").addClass("btn-default");
    $("#btnRvwAttachments").addClass("btn-default");
    $("#btnVwJournal").addClass("btn-default");
    $("#btnVwConsoCharging").addClass("btn-default");

    $("#btnDownloadTemplate").addClass("btn-default-blue");
    $("#btnUploadTemplate").addClass("btn-default-orange");
    $("#btnRvwAttachments").addClass("btn-default-blue");
    $("#btnVwJournal").addClass("btn-default-gray");
    $("#btnVwConsoCharging").addClass("btn-default-gray");

    if (!isNewData) {
        $("#btnDownloadTemplate").enable(false);
        $("#btnUploadTemplate").enable(false);
        $("#btnVwJournal").enable(true);
    }
    else {
        $("#btnDownloadTemplate").enable(true);
        $("#btnUploadTemplate").enable(true);
        $("#btnVwJournal").enable(false);
    }

    //if (nwDocno != "") {
    var Grid = nwGridCon_Book.ActiveSheet;
    Grid.SetEnable(SPR_REFNO - 1, Spread_ALLROW, false);
    Grid.SetEnable(SPR_REFDATE - 1, Spread_ALLROW, false);
    Grid.SetEnable(SPR_DRNO - 1, Spread_ALLROW, false);
    Grid.SetEnable(SPR_DRDATE - 1, Spread_ALLROW, false);
    Grid.SetEnable(SPR_COUNTERDATE - 1, Spread_ALLROW, false);
    Grid.SetEnable(SPR_DUEDATE - 1, Spread_ALLROW, false);
    Grid.SetEnable(SPR_GROSSAMT - 1, Spread_ALLROW, false);
    Grid.SetBackground(SPR_REFNO - 1, Spread_ALLROW, 'gainsboro');
    Grid.SetBackground(SPR_REFDATE - 1, Spread_ALLROW, 'gainsboro');
    Grid.SetBackground(SPR_DRNO - 1, Spread_ALLROW, 'gainsboro');
    Grid.SetBackground(SPR_DRDATE - 1, Spread_ALLROW, 'gainsboro');
    Grid.SetBackground(SPR_COUNTERDATE - 1, Spread_ALLROW, 'gainsboro');
    Grid.SetBackground(SPR_DUEDATE - 1, Spread_ALLROW, 'gainsboro');
    Grid.SetBackground(SPR_GROSSAMT - 1, Spread_ALLROW, 'gainsboro');
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').enable(false);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFDATE + 1) + ') input').enable(false);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').enable(false);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRDATE + 1) + ') input').enable(false);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_COUNTERDATE + 1) + ') input').enable(false);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DUEDATE + 1) + ') input').enable(false);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_GROSSAMT + 1) + ') input').enable(false);

    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').css("border", "none");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFDATE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').css("border", "none");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRDATE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMCODE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMDESC + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_COUNTERDATE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DUEDATE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_GROSSAMT + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_WITHSI + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_WITHADA + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_HOLDPAYMENT + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REMARKSHOLD + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REMARKSHOLD + 1) + ') input').css("background-color", "gainsboro");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REMARKSHOLD + 1) + ') input').css("border", "none");
    //}
}


function EnablePOType() {
    var Grid = nwGridCon_Book.ActiveSheet;
    if (nwDocno == "") {
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFTRANNO + 1) + ')').enable(false);
        Grid.SetEnable(SPR_REFNO - 1, Spread_ALLROW, true);
        Grid.SetEnable(SPR_REFDATE - 1, Spread_ALLROW, true);
        Grid.SetEnable(SPR_DRNO - 1, Spread_ALLROW, true);
        Grid.SetEnable(SPR_DRDATE - 1, Spread_ALLROW, true);
        Grid.SetEnable(SPR_PAYMENTTERMCODE - 1, Spread_ALLROW, true);
        Grid.SetEnable(SPR_PAYMENTTERMDESC - 1, Spread_ALLROW, true);
        Grid.SetEnable(SPR_COUNTERDATE - 1, Spread_ALLROW, true);
        Grid.SetEnable(SPR_DUEDATE - 1, Spread_ALLROW, true);
        Grid.SetEnable(SPR_GROSSAMT - 1, Spread_ALLROW, true);
        Grid.SetEnable(SPR_PARTICULARS - 1, Spread_ALLROW, true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFDATE + 1) + ') input').enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRDATE + 1) + ') input').enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMCODE + 1) + ')').enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMDESC + 1) + ')').enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_COUNTERDATE + 1) + ') input').enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DUEDATE + 1) + ') input').enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_GROSSAMT + 1) + ') input').enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PARTICULARS + 1) + ')').enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PARTICULARS + 1) + ') button').enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_CHARGINGDTLS + 1) + ')').enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_RECURRING + 1) + ')').enable(true);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PREPAYMENTDTLS + 1) + ')').enable(true);        
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PREPAYMENTDTLS + 1) + ')').addClass("btnPrepaymentDtls");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_RECURRING + 1) + ')').addClass("btnRecurring");

        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ')').css("background-color", "white");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').css("background-color", "white");        
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFDATE + 1) + ')').css("background-color", "white");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ')').css("background-color", "white");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').css("background-color", "white");        
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRDATE + 1) + ')').css("background-color", "white");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMCODE + 1) + ')').css("background-color", "cyan");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMDESC + 1) + ')').css("background-color", "cyan");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_COUNTERDATE + 1) + ')').css("background-color", "white");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DUEDATE + 1) + ')').css("background-color", "white");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_GROSSAMT + 1) + ')').css("background-color", "white");
        ////$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_WITHADA + 1) + ')').css("background-color", "white");
        ////$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_WITHSI + 1) + ')').css("background-color", "white");
        ////$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_HOLDPAYMENT + 1) + ')').css("background-color", "white");
        ////$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REMARKSHOLD + 1) + ')').css("background-color", "gainsboro");
        ////$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REMARKSHOLD + 1) + ') input').css("background-color", "gainsboro");
        ////$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REMARKSHOLD + 1) + ') input').css("border", "none");
    }
    ReqReason();
    UnhideFieldsWRef();
    $("#btnDownloadTemplate").addClass("btn-default");
    $("#btnUploadTemplate").addClass("btn-default");
    $("#btnVwJournal").addClass("btn-default");
    $("#btnVwConsoCharging").addClass("btn-default");

    $("#btnDownloadTemplate").addClass("btn-default-blue");
    $("#btnUploadTemplate").addClass("btn-default-orange");
    //$("#btnRvwAttachments").removeClass("btnBlue");
    //$("#btnRvwAttachments").addClass("btnGreen");
    $("#btnVwJournal").addClass("btn-default-gray");
    $("#btnVwConsoCharging").addClass("btn-default-gray");
    $("#chkWithSI").enable(true);
    $("#btnVwConsoCharging").enable(true);
    $("#btnReqCompHDR").enable(true);
}

function DisablePOType() {
    var Grid = nwGridCon_Book.ActiveSheet;
    Grid.SetEnable(SPR_PAYMENTTERMCODE - 1, Spread_ALLROW, false);
    Grid.SetEnable(SPR_PAYMENTTERMDESC - 1, Spread_ALLROW, false);
    Grid.SetEnable(SPR_DUEDATE - 1, Spread_ALLROW, false);
    Grid.SetEnable(SPR_GROSSAMT - 1, Spread_ALLROW, false);
    Grid.SetBackground(SPR_PAYMENTTERMCODE - 1, Spread_ALLROW, "gainsboro");
    Grid.SetBackground(SPR_PAYMENTTERMDESC - 1, Spread_ALLROW, "gainsboro");
    Grid.SetBackground(SPR_DUEDATE - 1, Spread_ALLROW, "gainsboro");
    Grid.SetBackground(SPR_GROSSAMT - 1, Spread_ALLROW, "gainsboro");
    //if (nwDocno == "") {
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFTRANNO + 1) + ')').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFDATE + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRDATE + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMCODE + 1) + ')').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMDESC + 1) + ')').enable(false);
        ////$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_COUNTERDATE + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DUEDATE + 1) + ') input').enable(false);
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_GROSSAMT + 1) + ') input').enable(false);

        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFTRANNO + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').css("border", "none");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFDATE + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').css("border", "none");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRDATE + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMCODE + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMDESC + 1) + ')').css("background-color", "gainsboro");
        ////$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_COUNTERDATE + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DUEDATE + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_GROSSAMT + 1) + ')').css("background-color", "gainsboro");
    //}
    
    NotReqReason();
    HideFieldsWRef();
    $("#btnDownloadTemplate").addClass("btn-default");
    $("#btnUploadTemplate").addClass("btn-default");
    $("#btnVwJournal").addClass("btn-default");
    $("#btnVwConsoCharging").addClass("btn-default");

    $("#btnDownloadTemplate").addClass("btn-default-blue");
    $("#btnUploadTemplate").addClass("btn-default-orange");
    //$("#btnRvwAttachments").removeClass("btnGreen");    
    //$("#btnRvwAttachments").addClass("btnBlue");
    $("#btnVwJournal").addClass("btn-default-gray");
    $("#chkWithSI").enable(false);
    $("#btnVwConsoCharging").enable(false);
    $("#btnReqCompHDR").enable(false);
}

function DisableColumn() {
    $('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PREPAYMENTDTLS + 1) + ')').enable(false);
    $('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_RECURRING + 1) + ')').enable(false);
    $('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PREPAYMENTDTLS + 1) + ')').removeClass("btnPrepaymentDtls");
    $('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_RECURRING + 1) + ')').removeClass("btnRecurring");
}

function EnableGridCol() {
    var Grid = nwGridCon_Book.ActiveSheet;
    Grid.SetEnable(SPR_REFNO - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_REFDATE - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_DRNO - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_DRDATE - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_COUNTERDATE - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_GROSSAMT - 1, Spread_ALLROW, true);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').enable(true);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFDATE + 1) + ') input').enable(true);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').enable(true);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRDATE + 1) + ') input').enable(true);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_COUNTERDATE + 1) + ') input').enable(true);
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_GROSSAMT + 1) + ') input').enable(true);    
}

function ClearGridCol() {
    var Grid = nwGridCon_Book.ActiveSheet;
    Grid.SetText(SPR_REFNO - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_REFDATE - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_DRNO - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_DRDATE - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_COUNTERDATE - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_DUEDATE - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_GROSSAMT - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_PAYMENTTERMCODE - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_PAYMENTTERMDESC - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_NOOFDAYS - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_FOREXRATEDATE - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_NETAMTHOME - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_NETAMTLOCAL - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_RATETOHOME - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_RATETOLOCAL - 1, Spread_ALLROW, "");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').val("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_REFDATE + 1) + ') input').val("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').val("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DRDATE + 1) + ') input').val("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_COUNTERDATE + 1) + ') input').val("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_DUEDATE + 1) + ') input').val("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_GROSSAMT + 1) + ') input').val("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMCODE + 1) + ')').text("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMDESC + 1) + ')').text("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_NOOFDAYS + 1) + ')').text("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_FOREXRATEDATE + 1) + ')').text("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_NETAMTHOME + 1) + ')').text("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_NETAMTLOCAL + 1) + ')').text("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_RATETOHOME + 1) + ')').text("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_RATETOLOCAL + 1) + ')').text("");
}

function EnableChargingDtls() {
    var Grid = nwGridChargeDtlsCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var col = Grid.CellSelected.col - 1;
    Grid.SetEnable(SPR_CD_LINETYPE - 1, Spread_ALLROW, false);
    Grid.SetEnable(SPR_CD_ITEMGRPTYPECODE - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_ITEMCODE - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_VATSHORTDESC - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_EWTSHORTDESC - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_UOM - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_QTY - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_UNITCOST_VATIN - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_UNITCOST_VATEX - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_SEG1 - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_SEG2 - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_SEG3 - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_SEG4 - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_SEG5 - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_SEG6 - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_SLTYPECODE - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_REFTYPECODE - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_PERIODFROM - 1, Spread_ALLROW, true);
    Grid.SetEnable(SPR_CD_PERIODTO - 1, Spread_ALLROW, true);

    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ') select').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMGRPTYPECODE + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMCODE + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_VATSHORTDESC + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_EWTSHORTDESC + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UOM + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_QTY + 1) + ') input').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATIN + 1) + ') input').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATEX + 1) + ') input').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG1 + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG2 + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG3 + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG4 + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG5 + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG6 + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SLTYPECODE + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFTYPECODE + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODFROM + 1) + ') input').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODTO + 1) + ') input').enable(true);

    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_QTY + 1) + ')').css("background-color", "white");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATIN + 1) + ')').css("background-color", "white");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODFROM + 1) + ')').css("background-color", "white");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODTO + 1) + ')').css("background-color", "white");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMGRPTYPECODE + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMCODE + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UOM + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PAYEEREFCODE + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_VATSHORTDESC + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_EWTSHORTDESC + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG1 + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG2 + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG3 + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG4 + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG5 + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG6 + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SLTYPECODE + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFTYPECODE + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_BANKACCT + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ') select').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ') select').css("border", "none");
}

function DisableChargingDtls() {
    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;
    //var row = Grid.CellSelected.row - 1;
    //var col = Grid.CellSelected.col - 1;
    GridCD.SetEnable(SPR_CD_ITEMGRPTYPECODE - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_ITEMGRPTYPECODE - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_ITEMCODE - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_ITEMCODE - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_VATSHORTDESC - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_VATSHORTDESC - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_EWTSHORTDESC - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_EWTSHORTDESC - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_UOM - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_UOM - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_QTY - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_QTY - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_UNITCOST_VATIN - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_UNITCOST_VATIN - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_UNITCOST_VATEX - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_UNITCOST_VATEX - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_SEG1 - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_SEG1 - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_SEG2 - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_SEG2 - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_SEG3 - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_SEG3 - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_SEG4 - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_SEG4 - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_SEG5 - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_SEG5 - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_SEG6 - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_SEG6 - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_SLTYPECODE - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_SLTYPECODE - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_REFTYPECODE - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_REFTYPECODE - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_PERIODFROM - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_PERIODFROM - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_PERIODTO - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_PERIODTO - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_REFNO - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_REFNO - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_REFDATE - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_REFDATE - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_REMARKS - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_REMARKS - 1, Spread_ALLROW, "gainsboro");
    GridCD.SetEnable(SPR_CD_CONSUMPTION - 1, Spread_ALLROW, false);
    GridCD.SetBackground(SPR_CD_CONSUMPTION - 1, Spread_ALLROW, "gainsboro");

    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ') select').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMGRPTYPECODE + 1) + ')').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMCODE + 1) + ')').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_VATSHORTDESC + 1) + ')').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_EWTSHORTDESC + 1) + ')').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UOM + 1) + ')').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_QTY + 1) + ') input').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATIN + 1) + ') input').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATEX + 1) + ') input').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG1 + 1) + ')').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG2 + 1) + ')').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG3 + 1) + ')').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG4 + 1) + ')').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG5 + 1) + ')').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG6 + 1) + ')').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SLTYPECODE + 1) + ')').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFTYPECODE + 1) + ')').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODFROM + 1) + ') input').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODTO + 1) + ') input').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFNO + 1) + ') input').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFDATE + 1) + ') input').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REMARKS + 1) + ') input').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_CONSUMPTION + 1) + ') input').enable(false);

    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_CONSUMPTION + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_CONSUMPTION + 1) + ') input').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_CONSUMPTION + 1) + ') input').css("border", "none");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REMARKS + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REMARKS + 1) + ') input').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REMARKS + 1) + ') input').css("border", "none");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFNO + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFNO + 1) + ') input').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFNO + 1) + ') input').css("border", "none");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFDATE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFDATE + 1) + ') input').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFDATE + 1) + ') input').css("border", "none");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_QTY + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATIN + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATEX + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODFROM + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODTO + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMGRPTYPECODE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMCODE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UOM + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PAYEEREFCODE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_VATSHORTDESC + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_EWTSHORTDESC + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG1 + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG2 + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG3 + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG4 + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG5 + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG6 + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SLTYPECODE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFTYPECODE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_BANKACCT + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_IO + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_IO + 1) + ') input').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_IO + 1) + ') input').css("border", "none");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ') select').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ') select').css("border", "none");
}

function ResetTax_EnableChargingDtls() {
    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;

    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ') select').enable(false);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMGRPTYPECODE + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMCODE + 1) + ')').enable(true);
    GridCD.SetBackground(SPR_CD_ITEMGRPTYPECODE - 1, Spread_ALLROW, "cyan");
    GridCD.SetEnable(SPR_CD_ITEMGRPTYPECODE - 1, Spread_ALLROW, true);
    GridCD.SetBackground(SPR_CD_ITEMCODE - 1, Spread_ALLROW, "cyan");
    GridCD.SetEnable(SPR_CD_ITEMCODE - 1, Spread_ALLROW, true);

    if (allowTaxPerTrantype == "1") {
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_VATSHORTDESC + 1) + ')').enable(true);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_EWTSHORTDESC + 1) + ')').enable(true);
        GridCD.SetBackground(SPR_CD_VATSHORTDESC - 1, Spread_ALLROW, "cyan");
        GridCD.SetEnable(SPR_CD_VATSHORTDESC - 1, Spread_ALLROW, true);
        GridCD.SetBackground(SPR_CD_EWTSHORTDESC - 1, Spread_ALLROW, "cyan");
        GridCD.SetEnable(SPR_CD_EWTSHORTDESC - 1, Spread_ALLROW, true);
    }
    else {
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_VATSHORTDESC + 1) + ')').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_EWTSHORTDESC + 1) + ')').enable(false);
        GridCD.SetBackground(SPR_CD_VATSHORTDESC - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetEnable(SPR_CD_VATSHORTDESC - 1, Spread_ALLROW, false);
        GridCD.SetBackground(SPR_CD_EWTSHORTDESC - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetEnable(SPR_CD_EWTSHORTDESC - 1, Spread_ALLROW, false);
    }

    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UOM + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_QTY + 1) + ') input').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATIN + 1) + ') input').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATEX + 1) + ') input').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODFROM + 1) + ') input').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODTO + 1) + ') input').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFNO + 1) + ') input').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODTO + 1) + ') input').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REMARKS + 1) + ') input').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_CONSUMPTION + 1) + ') input').enable(true);

    GridCD.SetEnable(SPR_CD_UOM - 1, Spread_ALLROW, true);
    GridCD.SetEnable(SPR_CD_QTY - 1, Spread_ALLROW, true);
    GridCD.SetEnable(SPR_CD_UNITCOST_VATIN - 1, Spread_ALLROW, true);
    GridCD.SetEnable(SPR_CD_UNITCOST_VATEX - 1, Spread_ALLROW, true);
    GridCD.SetEnable(SPR_CD_PERIODFROM - 1, Spread_ALLROW, true);
    GridCD.SetEnable(SPR_CD_PERIODTO - 1, Spread_ALLROW, true);
    GridCD.SetEnable(SPR_CD_REFNO - 1, Spread_ALLROW, true);
    GridCD.SetEnable(SPR_CD_REMARKS - 1, Spread_ALLROW, true);
    GridCD.SetEnable(SPR_CD_CONSUMPTION - 1, Spread_ALLROW, true);
    GridCD.SetBackground(SPR_CD_UOM - 1, Spread_ALLROW, "cyan");
    GridCD.SetBackground(SPR_CD_QTY - 1, Spread_ALLROW, "white");
    GridCD.SetBackground(SPR_CD_UNITCOST_VATIN - 1, Spread_ALLROW, "white");
    GridCD.SetBackground(SPR_CD_UNITCOST_VATEX - 1, Spread_ALLROW, "white");
    GridCD.SetBackground(SPR_CD_PERIODFROM - 1, Spread_ALLROW, "white");
    GridCD.SetBackground(SPR_CD_PERIODTO - 1, Spread_ALLROW, "white");
    GridCD.SetBackground(SPR_CD_REFNO - 1, Spread_ALLROW, "white");
    GridCD.SetBackground(SPR_CD_REMARKS - 1, Spread_ALLROW, "white");
    GridCD.SetBackground(SPR_CD_CONSUMPTION - 1, Spread_ALLROW, "white");
    GridCD.SetEnable(SPR_CD_SEG2 - 1, Spread_ALLROW, true);
    GridCD.SetEnable(SPR_CD_SEG3 - 1, Spread_ALLROW, true);
    GridCD.SetEnable(SPR_CD_SEG4 - 1, Spread_ALLROW, true);
    GridCD.SetEnable(SPR_CD_SEG5 - 1, Spread_ALLROW, true);
    GridCD.SetEnable(SPR_CD_SEG6 - 1, Spread_ALLROW, true);
    GridCD.SetBackground(SPR_CD_SEG2 - 1, Spread_ALLROW, "cyan");
    GridCD.SetBackground(SPR_CD_SEG3 - 1, Spread_ALLROW, "cyan");
    GridCD.SetBackground(SPR_CD_SEG4 - 1, Spread_ALLROW, "cyan");
    GridCD.SetBackground(SPR_CD_SEG5 - 1, Spread_ALLROW, "cyan");
    GridCD.SetBackground(SPR_CD_SEG6 - 1, Spread_ALLROW, "cyan");

    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG2 + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG3 + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG4 + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG5 + 1) + ')').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG6 + 1) + ')').enable(true);

    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REMARKS + 1) + ') input').css("background-color", "white");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_CONSUMPTION + 1) + ') input').css("background-color", "white");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_QTY + 1) + ')').css("background-color", "white");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATIN + 1) + ')').css("background-color", "white");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATEX + 1) + ')').css("background-color", "white");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODFROM + 1) + ')').css("background-color", "white");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODTO + 1) + ')').css("background-color", "white");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMGRPTYPECODE + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMCODE + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UOM + 1) + ')').css("background-color", "cyan");    
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_VATSHORTDESC + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_EWTSHORTDESC + 1) + ')').css("background-color", "cyan");       
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG3 + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG4 + 1) + ')').css("background-color", "cyan");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ') select').css("background-color", "gainsboro");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ') select').css("border", "");


    defaultLocCode = $("#idvallugLocAcctForms").val();
    defaultLocDesc = $("#txtLocDesc").val();

    switch (defaultLocSegCode) {
        case "02":           
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG2 + 1) + ')').enable(false);
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG2DESC + 1) + ')').enable(false);
            GridCD.SetEnable(SPR_CD_SEG2 - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG2 - 1, Spread_ALLROW, "gainsboro");
            GridCD.SetEnable(SPR_CD_SEG2DESC - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG2DESC - 1, Spread_ALLROW, "gainsboro");
            break;
        case "03":         
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG3 + 1) + ')').enable(false);
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG3DESC + 1) + ')').enable(false);
            GridCD.SetEnable(SPR_CD_SEG3 - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG3 - 1, Spread_ALLROW, "gainsboro");
            GridCD.SetEnable(SPR_CD_SEG3DESC - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG3DESC - 1, Spread_ALLROW, "gainsboro");
            break;
        case "04":          
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG4 + 1) + ')').enable(false);
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG4DESC + 1) + ')').enable(false);
            GridCD.SetEnable(SPR_CD_SEG4 - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG4 - 1, Spread_ALLROW, "gainsboro");
            GridCD.SetEnable(SPR_CD_SEG4DESC - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG4DESC - 1, Spread_ALLROW, "gainsboro");
            break;
        case "05":           
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG5 + 1) + ')').enable(false);
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG5DESC + 1) + ')').enable(false);
            GridCD.SetEnable(SPR_CD_SEG5 - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG5 - 1, Spread_ALLROW, "gainsboro");
            GridCD.SetEnable(SPR_CD_SEG5DESC - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG5DESC - 1, Spread_ALLROW, "gainsboro");
            break;
        case "06":           
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG6 + 1) + ')').enable(false);
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG6DESC + 1) + ')').enable(false);
            GridCD.SetEnable(SPR_CD_SEG6 - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG6 - 1, Spread_ALLROW, "gainsboro");
            GridCD.SetEnable(SPR_CD_SEG6DESC - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG6DESC - 1, Spread_ALLROW, "gainsboro");
            break;
    }
        
    switch (lastsegment) {
        case "02":
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG2 + 1) + ')').enable(false);
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG2DESC + 1) + ')').enable(false);
            GridCD.SetEnable(SPR_CD_SEG2 - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG2 - 1, Spread_ALLROW, "gainsboro");
            GridCD.SetEnable(SPR_CD_SEG2DESC - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG2DESC - 1, Spread_ALLROW, "gainsboro");
            break;

        case "03":
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG3 + 1) + ')').enable(false);
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG3DESC + 1) + ')').enable(false);
            GridCD.SetEnable(SPR_CD_SEG3 - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG3 - 1, Spread_ALLROW, "gainsboro");
            GridCD.SetEnable(SPR_CD_SEG3DESC - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG3DESC - 1, Spread_ALLROW, "gainsboro");
            break;

        case "04":
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG4 + 1) + ')').enable(false);
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG4DESC + 1) + ')').enable(false);
            GridCD.SetEnable(SPR_CD_SEG6 - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG6 - 1, Spread_ALLROW, "gainsboro");
            GridCD.SetEnable(SPR_CD_SEG6DESC - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG6DESC - 1, Spread_ALLROW, "gainsboro");
            break;

        case "05":
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG5 + 1) + ')').enable(false);
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG5DESC + 1) + ')').enable(false);
            GridCD.SetEnable(SPR_CD_SEG4 - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG4 - 1, Spread_ALLROW, "gainsboro");
            GridCD.SetEnable(SPR_CD_SEG5DESC - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG5DESC - 1, Spread_ALLROW, "gainsboro");
            break;

        case "06":
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG6 + 1) + ')').enable(false);
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG6DESC + 1) + ')').enable(false);
            GridCD.SetEnable(SPR_CD_SEG6 - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG6 - 1, Spread_ALLROW, "gainsboro");
            GridCD.SetEnable(SPR_CD_SEG6DESC - 1, Spread_ALLROW, false);
            GridCD.SetBackground(SPR_CD_SEG6DESC - 1, Spread_ALLROW, "gainsboro");
            break;
    }

    var payreqtype = $("#cmbPaymentRqstType").val();
    if (payreqtype == "01") {
        if (isLevel1 == "1" && nwDocno != "") {
            $("#btnSaveCD").enable(true);
        }

        GridCD.SetEnable(SPR_CD_ITEMGRPTYPECODE - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_ITEMCODE - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_UOM - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_QTY - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_UNITCOST_VATEX - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_UNITCOST_VATIN - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_PERIODFROM - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_PERIODTO - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_PAYEEREFCODE - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_SEG2 - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_SEG3 - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_SEG4 - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_SEG5 - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_SEG6 - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_SLTYPECODE - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_REFTYPECODE - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_BANKACCT - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_CONSUMPTION - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_REMARKS - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_VATSHORTDESC - 1, Spread_ALLROW, false);

        GridCD.SetBackground(SPR_CD_ITEMGRPTYPECODE - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_ITEMCODE - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_UOM - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_QTY - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_UNITCOST_VATEX - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_UNITCOST_VATIN - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_PERIODFROM - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_PERIODTO - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_PAYEEREFCODE - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_SEG2 - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_SEG3 - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_SEG4 - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_SEG5 - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_SEG6 - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_SLTYPECODE - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_REFTYPECODE - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_BANKACCT - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_CONSUMPTION - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_REMARKS - 1, Spread_ALLROW, "gainsboro");
        GridCD.SetBackground(SPR_CD_VATSHORTDESC - 1, Spread_ALLROW, "gainsboro");

        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMGRPTYPECODE + 1) + ')').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMCODE + 1) + ')').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UOM + 1) + ')').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_QTY + 1) + ') input').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATEX + 1) + ') input').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATIN + 1) + ') input').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODFROM + 1) + ') input').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODTO + 1) + ') input').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PAYEEREFCODE + 1) + ')').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG2 + 1) + ')').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG3 + 1) + ')').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG4 + 1) + ')').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG5 + 1) + ')').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG6 + 1) + ')').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SLTYPECODE + 1) + ')').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFTYPECODE + 1) + ')').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_BANKACCT + 1) + ')').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_CONSUMPTION + 1) + ') input').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REMARKS + 1) + ') input').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_VATSHORTDESC + 1) + ')').enable(false);

        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_QTY + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATIN + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATEX + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODFROM + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODTO + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_CONSUMPTION + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_CONSUMPTION + 1) + ') input').css("background-color", "gainsboro");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REMARKS + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REMARKS + 1) + ') input').css("background-color", "gainsboro");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REMARKS + 1) + ') input').css("border", "none");

        CheckIfReqSL();
    }
}

function ClearChargingDtlsCol() {
    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;

    GridCD.SetText(SPR_CD_ITEMGRPTYPECODE - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_ITEMGRPTYPEDESC - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_ITEMCODE - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_ITEMDESC - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_VATSHORTDESC - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_EWTSHORTDESC - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_IO - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_UOM - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_QTY - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_UNITCOST_VATIN - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_UNITCOST_VATEX - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_OCYAMT_VATIN - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_OCYAMT_VATEX - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_ACCTDESC - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_PAYEEREFCODE - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_PAYEEREFDESC - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_SEG2 - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_SEG3 - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_SEG4 - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_SEG5 - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_SEG6 - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_SLTYPECODE - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_REFTYPECODE - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_BANKACCT - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_CASHFLOWCODE - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_CASHFLOWDESC - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_PERIODFROM - 1, Spread_ALLROW, "");
    GridCD.SetText(SPR_CD_PERIODTO - 1, Spread_ALLROW, "");
    
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_CD_LINETYPE + 1) + ') input').enable(true);
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMGRPTYPECODE + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMGRPTYPEDESC + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMCODE + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ITEMDESC + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_VATSHORTDESC + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_EWTSHORTDESC + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_IO + 1) + ') input').val("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UOM + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_QTY + 1) + ') input').val("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATIN + 1) + ') input').val("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_UNITCOST_VATEX + 1) + ') input').val("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_OCYAMT_VATIN + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_OCYAMT_VATEX + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_ACCTDESC + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PAYEEREFCODE + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PAYEEREFDESC + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG2 + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG2 + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG3 + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG4 + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG5 + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SEG6 + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_SLTYPECODE + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFTYPECODE + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_BANKACCT + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_CASHFLOWCODE + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_CASHFLOWDESC + 1) + ')').text("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODFROM + 1) + ') input').val("");
    //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_PERIODTO + 1) + ') input').val("");
}

var hasRefDocno = false;
//$(document).on('click', '.btnChargingDtls', function () {
//    $('#nwViewChargingDtls').removeAttr('title');
//    var locForm = '', vendor = '', rsnForReq = '', costcenter = '';
//    var refDocno = '', refSI = '', payTerm = '', paymentReqType = '', counterdate = '', basis = '', trantype = '';
//    var grossamt = 0;
//    var error = '';

//    locForm = $("#idvallugLocAcctForms").val();
//    vendor = $("#idvallugVendorPayee").val();    
//    rsnForReq = $("#idvallugRsnReq").val();
//    costcenter = $("#idvallugOrigCCC").val();
//    controlAccountCode = $("#idvallugAPCtrlAccnt").val();
//    controlAccountDesc = $("#descvallugAPCtrlAccnt").val();

//    refDocno = crnwTR.find("td:eq(" + SPR_REFTRANNO + ")").text();
//    refSI = crnwTR.find("td:eq(" + SPR_REFNO + ") input").val();
//    payTerm = crnwTR.find("td:eq(" + SPR_PAYMENTTERMCODE + ")").text();
//    grossamt = crnwTR.find("td:eq(" + SPR_GROSSAMT + ") input").val();
//    counterdate = crnwTR.find("td:eq(" + SPR_COUNTERDATE + ") input").val();
//    paymentReqType = $("#cmbPaymentRqstType").val();
//    basis = $("#txtBasisAging").val();
//    trantype = $("#txtTranType").val();

//    if (refDocno != "") {
//        hasRefDocno = true;
//    }
//    else {
//        hasRefDocno = false;
//    }

//    if (locForm == '' && vendor == '' && rsnForReq == '') {
//        error += "Cannot proceed. Please complete the header details.\n";
//    }
//    else {
//        if (locForm == '') {
//            error += "Cannot proceed. Location with Accountable Forms is required.\n";
//        }
//        if (vendor == '') {
//            error += "Cannot proceed. Vendor/Payee is required.\n";
//        }
//        if (paymentReqType == '') {
//            error += "Cannot proceed. Payment Request Sub Type is required.\n";
//        }
//        if (rsnForReq == '' && trantype == 'PRFDRT') {
//            error += "Cannot proceed. Reason for Request is required.\n";
//        }
//    }

//    if (paymentReqType == "01" && refDocno == "") {
//        error += "Cannot proceed. Ref. Transaction No. is required.\n";
//    }
//    if (refSI == "") {
//        error += "Cannot proceed. Ref No. (BI/SI/SOA) is required.\n";
//    }
//    //if (payTerm == "") {
//    //    error += "Cannot Continue. Payment Term is required.\n";
//    //}
//    if (counterdate == "" && basis == "CNTDATE") {
//        error += "Cannot proceed. Counter Date is required.\n";
//    }
//    if (grossamt == 0) {
//        error += "Cannot proceed. Invoice Amount cannot be zero.\n";
//    }    
    
//    if (error != "") {
//        MessageBox(error, Title, "error");
//        return;
//    }

//    nwLoading_Start("xbtnChargingDtls", crLoadingHTML);

//    $("#idvallugRefTranNo").val(crnwTR.find("td:eq(" + SPR_REFTRANNO + ")").text());
//    $("#descvallugRefTranNo").val(crnwTR.find("td:eq(" + SPR_REFTRANDATE + ")").text());
//    $("#idvallugPaymentTerm").val(crnwTR.find("td:eq(" + SPR_PAYMENTTERMCODE + ")").text());
//    $("#descvallugPaymentTerm").val(crnwTR.find("td:eq(" + SPR_PAYMENTTERMDESC + ")").text());
//    $("#idvallugRefNoSI").val(crnwTR.find("td:eq(" + SPR_REFNO + ") input").val());
//    $("#descvallugRefNoSI").val(crnwTR.find("td:eq(" + SPR_REFDATE + ") input").val());
//    $("#txtCounterDate_CD").val(crnwTR.find("td:eq(" + SPR_COUNTERDATE + ") input").val());
//    $("#idvallugDRCOCNo").val(crnwTR.find("td:eq(" + SPR_DRNO + ") input").val());
//    $("#descvallugDRCOCNo").val(crnwTR.find("td:eq(" + SPR_DRDATE + ") input").val());
//    $("#txtDueDate_CD").val(crnwTR.find("td:eq(" + SPR_DUEDATE + ") input").val());    
//    $("#txtGrossAmt_CD").val(setNumReplace(grossamt, 2));

//    currRow = crnwTR.index();
//    taxConvert = "2";

//    tmpDocno = $("#txtRecuser").val() + $.now().toString();

//    if (crnwTR.find("td:eq(" + SPR_TMPID + ")").text() == "") {
//        crnwTR.find("td:eq(" + SPR_TMPID + ")").text(tmpDocno);
//    }

//    $("#txtTMPID").val(crnwTR.find("td:eq(" + SPR_TMPID + ")").text());
//    $("#txtRateLoc").val(crnwTR.find("td:eq(" + SPR_RATETOLOCAL + ")").text());
//    $("#txtRateHome").val(crnwTR.find("td:eq(" + SPR_RATETOHOME + ")").text());

//    var lineID_ = crnwTR.find("td:eq(" + SPR_LINEID + ")").text();
//    if (lineID_ == "" || lineID_ == "0") {
//        lineID_ = crnwTR.index() + 1;
//    }
//    $("#txtLineID_CD").val(lineID_);

//    //$(".BoxClose").show();
//    nwPopupForm_ShowModal("nwViewChargingDtls");
//    nwGrid_RemoveRow("nwGridChargeDtlsCon", 0, $("#nwGridCon .tblGridBody tr").length);    
//    lineID = crnwTR.find("td:eq(" + SPR_LINEID + ")").text();
//    var docno = crnwTR.find("td:eq(" + SPR_TMPID + ")").text();
//    var refno = $("#idvallugRefTranNo").val();
//    nwParameter_Add("txtDocno", $("#txtDocno").val());
//    nwParameter_Add("idvallugRefTranNo", $("#idvallugRefTranNo").val());
//    nwParameter_Add("idvallugLocAcctForms", $("#idvallugLocAcctForms").val());
//    nwParameter_Add("lineID", crnwTR.find("td:eq(" + SPR_LINEID + ")").text());
//    nwParameter_Add("isNewData", isNewData);
//    nwParameter_Add("tmpDocno", crnwTR.find("td:eq(" + SPR_TMPID + ")").text());
//    nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls));
//    nwParameter_Add("hasJson", HasJsonTempDelDtls(docno, refno ) >= 0 ? true: false);
//    nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls.filter(i =>(i.docno + i.refTranNo) == docno + refno)));
//    nwParameter_Add("isLoadHstTemp", isLoadHstTemp);
//    nwParameter_Add("txtDocnoHstTemp", $("#txtDocnoHstTemp").val());
//    nwParameter_Add("refNoSI", crnwTR.find("td:eq(" + SPR_REFNO + ") input").val());
//    nwParameter_Add_Table("nwGridCon");
//    nwParameter_Add_Table("nwGridChargeDtlsCon");
//    func_ActionDriven("actbtnChargingDtls", false);
//});

$(document).on('click', '.btnRecurring', function () {
    var pdtag = crnwTR.find("td:eq(" + SPR_PDTAG + ")").text();    
    var error = '';

    if (pdtag == "1") {
        msgBoxContainerQuestion = "RecurringQ";
        parent_MessageBoxQuestion("This will reset the Prepayment Details. Do you want to continue?", Title, "Question");
    }
    else {
        RecurringFn();
    }

    if (nwDocno != '') {
        $("#btnSaveRecurring").enable(false);
    }
});

function ClearRecurrenceDtls() {
    $('#txtNextRecur').val("");
    $('#txtNoRecur_RD').val("");
    $('#txtEndRecur_RD').val("");
    $('#idvallugDocNo, #descvallugDocNo').val("");    
    $('#idvallugRefNo, #descvallugRefNo').val("");
    $('#idvallugDRNo, #descvallugDRNo').val("");    
    $('#idvallugPayTerm, #descvallugPayTerm').val("");
    $('#txtCounterDate_RD').val("");
    $('#txtDueDate_RD').val("");
    $('#chkAllowRecur').prop('checked', false);
    $('#chkApplyToAll_Recur').prop('checked', false);
}

function RecurringFn() {
    nwLoading_Start("xbtnRecurring", crLoadingHTML);
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var col = Grid.CellSelected.col - 1;

    $("#idvallugDocNo").val(Grid.GetValue(SPR_REFTRANNO - 1, row));
    $("#descvallugDocNo").val(Grid.GetValue(SPR_REFTRANDATE - 1, row));
    $("#idvallugRefNo").val(Grid.GetValue(SPR_REFNO - 1, row));
    $("#descvallugRefNo").val(Grid.GetValue(SPR_REFDATE - 1, row));
    $("#idvallugDRNo").val(Grid.GetValue(SPR_DRNO - 1, row));
    $("#descvallugDRNo").val(Grid.GetValue(SPR_DRDATE - 1, row));
    $("#idvallugPayTerm").val(Grid.GetValue(SPR_PAYMENTTERMCODE - 1, row));
    $("#descvallugPayTerm").val(Grid.GetValue(SPR_PAYMENTTERMDESC - 1, row));
    $("#txtCounterDate_RD").val(Grid.GetValue(SPR_COUNTERDATE - 1, row));
    $("#txtDueDate_RD").val(Grid.GetValue(SPR_DUEDATE - 1, row));

    //$("#idvallugDocNo").val(crnwTR.find("td:eq(" + SPR_REFTRANNO + ")").text());
    //$("#descvallugDocNo").val(crnwTR.find("td:eq(" + SPR_REFTRANDATE + ")").text());
    //$("#idvallugRefNo").val(crnwTR.find("td:eq(" + SPR_REFNO + ") input").val());
    //$("#descvallugRefNo").val(crnwTR.find("td:eq(" + SPR_REFDATE + ") input").val());
    //$("#idvallugDRNo").val(crnwTR.find("td:eq(" + SPR_DRNO + ") input").val());
    //$("#descvallugDRNo").val(crnwTR.find("td:eq(" + SPR_DRDATE + ") input").val());
    //$("#idvallugPayTerm").val(crnwTR.find("td:eq(" + SPR_PAYMENTTERMCODE + ")").text());
    //$("#descvallugPayTerm").val(crnwTR.find("td:eq(" + SPR_PAYMENTTERMDESC + ")").text());
    //$("#txtCounterDate_RD").val(crnwTR.find("td:eq(" + SPR_COUNTERDATE + ") input").val());
    //$("#txtDueDate_RD").val(crnwTR.find("td:eq(" + SPR_DUEDATE + ") input").val());
    //$("#txtRowno_RD").val(crnwTR.index());
    $("#txtRowno_RD").val(row);
    $("#chkAllowRecur").prop("checked", true);
    ClearRecurrenceDtls();
    tmpDocno = $("#txtRecuser").val() + $.now().toString();
    //currRow = crnwTR.index();
    currRow = row;
    //lineID = crnwTR.find("td:eq(" + SPR_LINEID + ")").text();
    //if (crnwTR.find("td:eq(" + SPR_TMPID + ")").text() == "") {
    //    crnwTR.find("td:eq(" + SPR_TMPID + ")").text(tmpDocno);
    //}
    lineID = Grid.GetValue(SPR_LINEID - 1, row);
    if (Grid.GetValue(SPR_TMPID - 1, row) == "") {
        Grid.SetText(SPR_TMPID - 1, row, tmpDocno);
    }
    //$(".BoxClose").show();
    nwPopupForm_ShowModal("nwViewRecurringDtls");
    cust_GetPara();
    nwParameter_Add("lineID", lineID);
    func_ActionDriven("actbtnRecurring", false);
}

$(document).on('click', '#btnSaveRecurring', function () {
    msgBoxContainerQuestion = "btnSaveRecurring";
    parent_MessageBoxQuestion("Do you want to save the record?", "Recurring Details", "Question");

    return false;
});

function setforex(date, row, amount) {
    var loc = $('#idvallugLocAcctForms').val();
    var valuedate = date;
    var currency = $('#idvallugCurrency').val();

    nwParameter_Add("idvallugLocAcctForms", loc);
    nwParameter_Add("valueDate", valuedate);
    nwParameter_Add("idvallugCurrency", currency);
    nwParameter_Add("row", row);
    nwParameter_Add("grossAmount", amount);

    if (loc.length > 0 && valuedate.length > 0 && currency.length > 0) {        
        func_ActionDriven("actSetForex", true);
    }
}

function SetForexHdr() {
    var loc = $('#idvallugLocAcctForms').val();
    var valuedate = $("#txtValueDate").val();
    var currency = $('#idvallugCurrency').val();

    nwParameter_Add("idvallugLocAcctForms", loc);
    nwParameter_Add("valueDate", valuedate);
    nwParameter_Add("idvallugCurrency", currency);

    if (loc.length > 0 && valuedate.length > 0 && currency.length > 0) {
        func_ActionDriven("actSetForex", true);
    }
}

$(document).on("click", '#btnResetTax', function (e) {
    nwLoading_Start("xactbtnResetTax", crLoadingHTML);
    //isNewData = true;
    taxConvert = "3";
    isResetTax = true;
    nwParameter_Add("isNewData", isNewData);
    nwParameter_Add("tmpDocno", $("#txtTMPID").val());
    nwParameter_Add("taxConvert", taxConvert);
    nwParameter_Add("isResetTax", isResetTax);
    nwParameter_Add("txtDocno", $("#txtDocno").val());
    nwParameter_Add("lineID", lineID);
    func_ActionDriven("actbtnResetTax", true);    
});

$(document).on("click", '#btnTaxConvert', function (e) {
    nwLoading_Start("xactbtnTaxConvert", crLoadingHTML);
    //isNewData = true;
    isSaveTmpCD = true;
    isResetTax = true;
    isBtnDone = false;
    taxConvert = "2";
    var Grid = nwGridCon_Book.ActiveSheet;
    //nwParameter_Add_Table('nwGridChargeDtlsCon');
    nwParameter_Add("tmpDocno", $("#txtTMPID").val());    
    nwParameter_Add("docno", $("#txtTMPID").val());
    nwParameter_Add("isNewData", isNewData);
    nwParameter_Add("taxConvert", taxConvert);
    nwParameter_Add("isResetTax", isResetTax);
    nwParameter_Add("txtDocno", $("#txtDocno").val());
    nwParameter_Add("lineID", lineID);
    nwParameter_Add("txtGrossAmt_CD", $("#txtGrossAmt_CD").val());
    nwParameter_Add("txtVendorTag", $("#txtVendorTag").val());
    nwParameter_Add("idvallugRefTranNo", $("#idvallugRefTranNo").val());
    nwParameter_Add("txtDocno", $("#txtDocno").val());
    //nwParameter_Add("withSI", $(`#nwGrid-nwData tr:eq(${mainGridCurr.index()})`).find(`td:eq(${SPR_WITHSI}) input`).is(":checked"));
    nwParameter_Add("withSI", Grid.GetValue(SPR_WITHSI - 1, mainGridCurr));
    nwParameter_Add("txtTrantype", "PRFDRT");
    nwParameter_Add("row", currRow);
    nwParameter_Add_Spread(nwGridChargeDtlsCon_Book);
    func_ActionDriven("actbtnTaxConvert", true);
});



function setNumReplace(val, decimal) {
    val = getNum(parseFloat(val.toString().replace(/,/g, "")))
    //val = val.toFixed(decimal);
    val = (Math.round(val * 100) / 100).toFixed(decimal);
    var dtnum = val.split('.', 100);

    var wholenum = dtnum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var decinum = dtnum[1];

    return wholenum + '.' + decinum;
}
//function setNumReplace(val, decimal) {
//    val = getNum(parseFloat(val.toString().replace(/,/g, "")))
//    val = val.toFixed(decimal).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//    return val;
//}

function ChangeGrossAmount() {
    var grossamt = 0;
    var lenchrg = jsonDelDtls.length;
    
    for (var x = 0; x <= lenchrg - 1; x++) {
        let linetypechrg = jsonDelDtls[x].linetype;
        if (linetypechrg != "3" && linetypechrg != "6" && (jsonDelDtls[x].lineID == $("#txtLineID_CD").val() || (jsonDelDtls[x].lineID == 0) && $("#txtLineID_CD").val() == "")) {
            grossamt += getNumReplace(jsonDelDtls[x].ocyamtVATIN);
        }
    }
    var Grid = nwGridCon_Book.ActiveSheet;
    Grid.SetText(SPR_GROSSAMT - 1, currRow, setNumReplace(grossamt, 2));
    //$('#nwGridCon .tblGridBody tr:nth-child(' + (currRow + 1) + ') td:nth-child(' + (SPR_GROSSAMT + 1) + ') input').val(setNumReplace(grossamt, 2));
    //$('#nwGridCon .tblGridBody tr:nth-child(' + (currRow + 1) + ') td:nth-child(' + (SPR_NETAMTHOME + 1) + ') input').val(setNumReplace(grossamt, 2));
    //$('#nwGridCon .tblGridBody tr:nth-child(' + (currRow + 1) + ') td:nth-child(' + (SPR_NETAMTLOCAL + 1) + ') input').val(setNumReplace(grossamt, 2));
}

function ComputeTotalChrg() {
    var appliedamt = 0, unappliedamt = 0, invoiceamt = 0, grossamt = 0;
    var lenchrg = jsonDelDtls.length;

    for (var x = 0; x <= lenchrg - 1; x++) {
        let linetypechrg = jsonDelDtls[x].linetype;
        if (linetypechrg == "1" && (jsonDelDtls[x].lineID == $("#txtLineID_CD").val() || (jsonDelDtls[x].lineID == 0) && $("#txtLineID_CD").val() == "")) {
            appliedamt += getNumReplace(jsonDelDtls[x].ocyamtVATIN);
        }
    }
    invoiceamt = getNumReplace($("#txtGrossAmt_CD").val());
    unappliedamt = invoiceamt - appliedamt;
    $("#txtAppliedAmt_CD").val(setNumReplace(appliedamt, 2));
    $("#txtUnappliedAmt_CD").val(setNumReplace(unappliedamt, 2));
}

function ComputeSubtotal() {

    var subtotal = 0, homeSubtotal = 0, localSubtotal = 0;
    var rateLoc = 0, rateHom = 0;
    rateLoc = getNumReplace($("#txtForexLocal").val());
    rateHom = getNumReplace($("#txtForexHome").val());
    
    //for (var x = 0; x <= len - 1; x++) {
    //    if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').val() == "1") {
    //        subtotal += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text());
    //        homeSubtotal += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text());
    //        localSubtotal += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text());
    //    }       
    //}
    var lenchrg = jsonDelDtls.length;

    for (var x = 0; x <= lenchrg - 1; x++) {
        let linetypechrg = jsonDelDtls[x].linetype;
        if (linetypechrg == "1" && (jsonDelDtls[x].lineID == $("#txtLineID_CD").val() || (jsonDelDtls[x].lineID == 0) && $("#txtLineID_CD").val() == "")) {
            subtotal += getNumReplace(jsonDelDtls[x].ocyamtVATEX);
            homeSubtotal += getNumReplace(jsonDelDtls[x].ocyamtVATEX);
            localSubtotal += getNumReplace(jsonDelDtls[x].ocyamtVATEX);
        }
    }

    homeSubtotal = getNumReplace(homeSubtotal) * getNumReplace(rateHom);
    localSubtotal = getNumReplace(localSubtotal) * getNumReplace(rateLoc);
    
    $("#txtSubtotal_TranHist_CD").val(setNumReplace(subtotal, 2));
    $("#txtSubtotal_LocalCurr_CD").val(setNumReplace(localSubtotal, 2));
    $("#txtSubtotal_HomeCurr_CD").val(setNumReplace(homeSubtotal, 2));
}

function ComputeVATEWT() {
    var vat = 0, homeVat = 0, localVat = 0;
    var ewt = 0, homeEwt = 0, localEwt = 0;
    var rateLoc = 0, rateHom = 0;
    rateLoc = getNumReplace($("#txtForexLocal").val());
    rateHom = getNumReplace($("#txtForexHome").val());

    //for (var x = 0; x <= len - 1; x++) {
    //    if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_VATCODE + ')').text() != "" && crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').val() == "2") {
    //        vat += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text());
    //        homeVat +=  getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text());
    //        localVat += getNumReplace(crnwTable.find('tr:eq(' +x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text());
    //    }
    //    if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_EWTCODE + ')').text() != "" && crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').val() == "2") {
    //        ewt += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text());
    //        homeEwt += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text());
    //        localEwt += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text());
    //    }
    //}
    var lenchrg = jsonDelDtls.length;

    for (var x = 0; x <= lenchrg - 1; x++) {
        let linetypechrg = jsonDelDtls[x].linetype;
        if (jsonDelDtls[x].vatCode != "" && linetypechrg == "2" && (jsonDelDtls[x].lineID == $("#txtLineID_CD").val() || (jsonDelDtls[x].lineID == 0) && $("#txtLineID_CD").val() == "")) {
            vat += getNumReplace(jsonDelDtls[x].ocyamtVATEX);
            homeVat +=  getNumReplace(jsonDelDtls[x].ocyamtVATEX);
            localVat += getNumReplace(jsonDelDtls[x].ocyamtVATEX);
        }
        if (jsonDelDtls[x].ewtCode != "" && linetypechrg == "2" && (jsonDelDtls[x].lineID == $("#txtLineID_CD").val() || (jsonDelDtls[x].lineID == 0) && $("#txtLineID_CD").val() == "")) {
            ewt += getNumReplace(jsonDelDtls[x].ocyamtVATEX);
            homeEwt +=  getNumReplace(jsonDelDtls[x].ocyamtVATEX);
            localEwt += getNumReplace(jsonDelDtls[x].ocyamtVATEX);
        }
    }
    homeVat = getNumReplace(homeVat) * getNumReplace(rateHom);
    localVat = getNumReplace(localVat) * getNumReplace(rateLoc);
    homeEwt = getNumReplace(homeEwt) * getNumReplace(rateHom);
    localEwt = getNumReplace(localEwt) * getNumReplace(rateLoc);
    
    $("#txtAddVat_TranHist_CD").val(setNumReplace(vat, 2));
    $("#txtAddVat_LocalCurr_CD").val(setNumReplace(localVat, 2));
    $("#txtAddVat_HomeCurr_CD").val(setNumReplace(homeVat, 2));

    $("#txtLessEWT_TranHist_CD").val(setNumReplace(ewt*-1, 2));
    $("#txtLessEWT_LocalCurr_CD").val(setNumReplace(localEwt*-1, 2));
    $("#txtLessEWT_HomeCurr_CD").val(setNumReplace(homeEwt*-1, 2));
}

function ComputeGrossAmount() {
    var grossamount = 0, homeGrossamount = 0, localGrossamount = 0;
    var subtotal = 0, homeSubtotal = 0, localSubtotal = 0;
    var vat = 0, homeVat = 0, localVat = 0;

    subtotal = $("#txtSubtotal_TranHist_CD").val();
    homeSubtotal = $("#txtSubtotal_LocalCurr_CD").val();
    localSubtotal = $("#txtSubtotal_HomeCurr_CD").val();

    vat = $("#txtAddVat_TranHist_CD").val();
    homeVat = $("#txtAddVat_LocalCurr_CD").val();
    localVat = $("#txtAddVat_HomeCurr_CD").val();

    grossamount = getNumReplace(subtotal) + getNumReplace(vat);
    homeGrossamount = getNumReplace(homeSubtotal) + getNumReplace(homeVat);
    localGrossamount = getNumReplace(localSubtotal) + getNumReplace(localVat);
    
    $("#txtGrossAmt_TranHist_CD").val(setNumReplace(grossamount, 2));
    $("#txtGrossAmt_LocalCurr_CD").val(setNumReplace(homeGrossamount, 2));
    $("#txtGrossAmt_HomeCurr_CD").val(setNumReplace(localGrossamount, 2));
}

function ComputeTotalAmountDue() {
    var total = 0, homeTotal = 0, localTotal = 0;
    var grossamount = 0, homeGrossamount = 0, localGrossamount = 0;
    var ewt = 0, homeEwt = 0, localEwt = 0;

    grossamount = $("#txtGrossAmt_TranHist_CD").val();
    homeGrossamount = $("#txtGrossAmt_LocalCurr_CD").val();
    localGrossamount = $("#txtGrossAmt_HomeCurr_CD").val();

    ewt = $("#txtLessEWT_TranHist_CD").val();
    homeEwt = $("#txtLessEWT_LocalCurr_CD").val();
    localEwt = $("#txtLessEWT_HomeCurr_CD").val();

    total = getNumReplace(grossamount) - getNumReplace(ewt);
    homeTotal = getNumReplace(homeGrossamount) - getNumReplace(homeEwt);
    localTotal = getNumReplace(localGrossamount) - getNumReplace(localEwt);
    
    $("#txtTotalAmt_TranHist_CD").val(setNumReplace(total, 2));
    $("#txtTotalAmt_LocalCurr_CD").val(setNumReplace(homeTotal, 2));
    $("#txtTotalAmt_HomeCurr_CD").val(setNumReplace(localTotal, 2));
}

function ComputeDPDMRet() {
    var adv = 0, homeadv= 0, localadv= 0;
    var dm = 0, homedm = 0, localdm = 0;
    var ret = 0, homeret = 0, localret = 0;
    var rateLoc = 0, rateHom = 0;
    rateLoc = getNumReplace($("#txtForexLocal").val());
    rateHom = getNumReplace($("#txtForexHome").val());

    var lenchrg = jsonDelDtls.length;

    for (var x = 0; x <= lenchrg - 1; x++) {
        let linetypechrg = jsonDelDtls[x].linetype;       
        if (linetypechrg == "6" || linetypechrg == "3" && (jsonDelDtls[x].lineID == $("#txtLineID_CD").val() || (jsonDelDtls[x].lineID == 0) && $("#txtLineID_CD").val() == "")) {
            adv += getNumReplace(jsonDelDtls[x].ocyamtVATEX)*-1;
            homeadv += getNumReplace(jsonDelDtls[x].ocyamtVATEX)*-1;
            localadv += getNumReplace(jsonDelDtls[x].ocyamtVATEX)*-1;
        }
        if (linetypechrg == "4" && (jsonDelDtls[x].lineID == $("#txtLineID_CD").val() || (jsonDelDtls[x].lineID == 0) && $("#txtLineID_CD").val() == "")) {
            dm += getNumReplace(jsonDelDtls[x].ocyamtVATEX)*-1;
            homedm += getNumReplace(jsonDelDtls[x].ocyamtVATEX)*-1;
            localdm += getNumReplace(jsonDelDtls[x].ocyamtVATEX)*-1;
        }
        if (linetypechrg == "5" && (jsonDelDtls[x].lineID == $("#txtLineID_CD").val() || (jsonDelDtls[x].lineID == 0) && $("#txtLineID_CD").val() == "")) {
            ret += getNumReplace(jsonDelDtls[x].ocyamtVATEX)*-1;
            homeret += getNumReplace(jsonDelDtls[x].ocyamtVATEX)*-1;
            localret += getNumReplace(jsonDelDtls[x].ocyamtVATEX)*-1;
        }
        if (linetypechrg == "7" && (jsonDelDtls[x].lineID == $("#txtLineID_CD").val() || (jsonDelDtls[x].lineID == 0) && $("#txtLineID_CD").val() == "")) {
            ret += getNumReplace(jsonDelDtls[x].ocyamtVATEX)*-1;
            homeret += getNumReplace(jsonDelDtls[x].ocyamtVATEX)*-1;
            localret += getNumReplace(jsonDelDtls[x].ocyamtVATEX)*-1;
        }
    }

    //for (var x = 0; x <= len - 1; x++) {
    //    if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').val() == "3" || crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').val() == "6") {
    //        adv += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text())*-1;
    //        homeadv += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text())*-1;
    //        localadv += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text())*-1;
    //    }
    //    if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').val() == "4") {
    //        dm += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text()) * -1;
    //        homedm += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text()) * -1;
    //        localdm += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text()) * -1;
    //    }
    //    if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').val() == "5") {
    //        ret += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text())*-1;
    //        homeret += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text())*-1;
    //        localret += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text())*-1;
    //    }
    //    if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').val() == "7") {
    //        ret += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text()) * -1;
    //        homeret += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text()) * -1;
    //        localret += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text()) * -1;
    //    }

    //}

    homeadv = getNumReplace(homeadv) * getNumReplace(rateHom);
    localadv = getNumReplace(localadv) * getNumReplace(rateLoc);

    homedm = getNumReplace(homedm) * getNumReplace(rateHom);
    localdm = getNumReplace(localdm) * getNumReplace(rateLoc);

    homeret = getNumReplace(homeret) * getNumReplace(rateHom);
    localret = getNumReplace(localret) * getNumReplace(rateLoc);

    $("#txtLessRecoupment_TranHist_CD").val(setNumReplace(adv, 2));
    $("#txtLessRecoupment_LocalCurr_CD").val(setNumReplace(localadv, 2));
    $("#txtLessRecoupment_HomeCurr_CD").val(setNumReplace(homeadv, 2));

    $("#txtLessDM_TranHist_CD").val(setNumReplace(dm, 2));
    $("#txtLessDM_LocalCurr_CD").val(setNumReplace(localdm, 2));
    $("#txtLessDM_HomeCurr_CD").val(setNumReplace(homedm, 2));

    $("#txtRetention_TranHist_CD").val(setNumReplace(ret, 2));
    $("#txtRetention_LocalCurr_CD").val(setNumReplace(localret, 2));
    $("#txtRetention_HomeCurr_CD").val(setNumReplace(homeret, 2));
}


function ComputeNetAmount() {
    var netamount = 0, homeNetamount = 0, localNetamount= 0;
    var total = 0, homeTotal= 0, localTotal= 0;
    var advances = 0, homeAdvances = 0, localAdvances = 0;
    var dm = 0, homeDm = 0, localDm = 0;
    var ret = 0, homeRet = 0, localRet = 0;

    var rateLoc = 0, rateHom = 0;
    rateLoc = getNumReplace($("#txtForexLocal").val());
    rateHom = getNumReplace($("#txtForexHome").val());

    total = $("#txtTotalAmt_TranHist_CD").val();
    localTotal = $("#txtTotalAmt_LocalCurr_CD").val();
    homeTotal = $("#txtTotalAmt_HomeCurr_CD").val();

    advances = $("#txtLessRecoupment_TranHist_CD").val();
    localAdvances = getNumReplace($("#txtLessRecoupment_TranHist_CD").val()) * getNumReplace(rateLoc);
    homeAdvances = getNumReplace($("#txtLessRecoupment_TranHist_CD").val()) * getNumReplace(rateHom);

    dm = $("#txtLessDM_TranHist_CD").val();
    localDm = getNumReplace($("#txtLessDM_TranHist_CD").val()) * getNumReplace(rateLoc);
    homeDm = getNumReplace($("#txtLessDM_TranHist_CD").val()) * getNumReplace(rateHom);

    ret = $("#txtRetention_TranHist_CD").val();
    localRet = getNumReplace($("#txtRetention_TranHist_CD").val()) * getNumReplace(rateLoc);
    homeRet = getNumReplace($("#txtRetention_TranHist_CD").val()) * getNumReplace(rateHom);

    $("#txtLessDM_LocalCurr_CD").val(setNumReplace(localDm, 2));
    $("#txtLessDM_HomeCurr_CD").val(setNumReplace(homeDm, 2));
    $("#txtLessRecoupment_LocalCurr_CD").val(setNumReplace(localAdvances, 2));
    $("#txtLessRecoupment_HomeCurr_CD").val(setNumReplace(homeAdvances, 2));
    $("#txtRetention_LocalCurr_CD").val(setNumReplace(localRet, 2));
    $("#txtRetention_HomeCurr_CD").val(setNumReplace(homeRet, 2));

    netamount = getNumReplace(total) - getNumReplace(advances) - getNumReplace(dm) - getNumReplace(ret);
    homeNetamount = getNumReplace(homeTotal) - getNumReplace(homeAdvances) - getNumReplace(homeDm) - getNumReplace(homeRet);
    localNetamount = getNumReplace(localTotal) - getNumReplace(localAdvances) - getNumReplace(localDm) - getNumReplace(localRet);
    
    $("#txtNetAmt_TranHist_CD").val(setNumReplace(netamount, 2));
    $("#txtNetAmt_LocalCurr_CD").val(setNumReplace(localNetamount, 2));
    $("#txtNetAmt_HomeCurr_CD").val(setNumReplace(homeNetamount, 2));
}

function HasJsonTempDelDtls(docno, refno)
{
    return jsonDelDtls.findIndex(i => (i.docno + i.refTranNo) == docno + refno)
}

function FilterJsonDelDtls(docno, refno) {
    
    return jsonDelDtls.filter(i => (i.docno + i.refTranNo) != docno+refno)
}

function dedupe(arr) {
    return arr.reduce(function (p, c) {

        // create an identifying id from the object values
        var id = [c.docno, c.refTranNo, c.lineID, c.rowno].join('|');

        // if the id is not found in the temp array
        // add the object to the output array
        // and add the key to the temp array
        if (p.temp.indexOf(id) === -1) {
            p.out.push(c);
            p.temp.push(id);
        }
        return p;

        // return the deduped array
    }, {
        temp: [],
        out: []
    }).out;
}


//Saving in Json Strings Charging Details
function SaveJsonDelDtls(docno, refno)
{
    //Filter Data
    jsonDelDtls = FilterJsonDelDtls(docno, refno)

    for (var i = 0; i < jsonDelDtlsFiltered.length; i++) {
        var Store = {};

        Store["docno"] = jsonDelDtlsFiltered[i].docno;
        Store["linetype"] = jsonDelDtlsFiltered[i].linetype;
        Store["refTranNo"] = jsonDelDtlsFiltered[i].refTranNo;
        Store["igtCode"] = jsonDelDtlsFiltered[i].igtCode;
        Store["igtDesc"] = jsonDelDtlsFiltered[i].igtDesc;
        Store["itemCode"] = jsonDelDtlsFiltered[i].itemCode;
        Store["itemDesc"] = jsonDelDtlsFiltered[i].itemDesc;
        Store["payeeRef"] = jsonDelDtlsFiltered[i].payeeRef;
        Store["payeeName"] = jsonDelDtlsFiltered[i].payeeName;
        Store["vatCode"] = jsonDelDtlsFiltered[i].vatCode;
        Store["vatDesc"] = jsonDelDtlsFiltered[i].vatDesc;
        Store["ewtCode"] = jsonDelDtlsFiltered[i].ewtCode;
        Store["ewtDesc"] = jsonDelDtlsFiltered[i].ewtDesc;
        Store["assetID"] = jsonDelDtlsFiltered[i].assetID;
        Store["uom"] = jsonDelDtlsFiltered[i].uom;
        Store["qty"] = jsonDelDtlsFiltered[i].qty;
        Store["unitcostVATIN"] = jsonDelDtlsFiltered[i].unitcostVATIN;
        Store["unitcostVATEX"] = jsonDelDtlsFiltered[i].unitcostVATEX;
        Store["ocyamtVATIN"] = jsonDelDtlsFiltered[i].ocyamtVATIN;
        Store["ocyamtVATEX"] = jsonDelDtlsFiltered[i].ocyamtVATEX;
        Store["remBdgtQty"] = jsonDelDtlsFiltered[i].remBdgtQty;
        Store["remBdgtAmt"] = jsonDelDtlsFiltered[i].remBdgtAmt;
        Store["seg1"] = jsonDelDtlsFiltered[i].seg1;
        Store["seg1Desc"] = jsonDelDtlsFiltered[i].seg1Desc;
        Store["seg2"] = jsonDelDtlsFiltered[i].seg2;
        Store["seg2Desc"] = jsonDelDtlsFiltered[i].seg2Desc;
        Store["seg3"] = jsonDelDtlsFiltered[i].seg3;
        Store["seg3Desc"] = jsonDelDtlsFiltered[i].seg3Desc;
        Store["seg4"] = jsonDelDtlsFiltered[i].seg4;
        Store["seg4Desc"] = jsonDelDtlsFiltered[i].seg4Desc;
        Store["seg5"] = jsonDelDtlsFiltered[i].seg5;
        Store["seg5Desc"] = jsonDelDtlsFiltered[i].seg5Desc;
        Store["seg6"] = jsonDelDtlsFiltered[i].seg6;
        Store["seg6Desc"] = jsonDelDtlsFiltered[i].seg6Desc;
        Store["accntDesc"] = jsonDelDtlsFiltered[i].accntDesc;
        Store["sltypeCode"] = jsonDelDtlsFiltered[i].sltypeCode;
        Store["sltypeDesc"] = jsonDelDtlsFiltered[i].sltypeDesc;
        Store["slrefCode"] = jsonDelDtlsFiltered[i].slrefCode;
        Store["slrefDesc"] = jsonDelDtlsFiltered[i].slrefDesc;
        Store["bankAccnt"] = jsonDelDtlsFiltered[i].bankAccnt;
        Store["periodFrom"] = jsonDelDtlsFiltered[i].periodFrom;
        Store["periodTo"] = jsonDelDtlsFiltered[i].periodTo;
        Store["cashFlowCode"] = jsonDelDtlsFiltered[i].cashFlowCode;
        Store["cashFlowDesc"] = jsonDelDtlsFiltered[i].cashFlowDesc;
        Store["tag"] = jsonDelDtlsFiltered[i].tag;
        Store["reqSL"] = jsonDelDtlsFiltered[i].reqSL;
        Store["reqSA"] = jsonDelDtlsFiltered[i].reqSA;
        Store["allocProc"] = jsonDelDtlsFiltered[i].allocProc;
        Store["reqAP"] = jsonDelDtlsFiltered[i].reqAP;
        Store["rateLocal"] = jsonDelDtlsFiltered[i].rateLocal;
        Store["rateHome"] = jsonDelDtlsFiltered[i].rateHome;
        Store["allocTag"] = jsonDelDtlsFiltered[i].allocTag;
        Store["lineID"] = jsonDelDtlsFiltered[i].lineID;
        Store["rowno"] = jsonDelDtlsFiltered[i].rowno;
        Store["refNo"] = jsonDelDtlsFiltered[i].refNo;
        Store["refDate"] = jsonDelDtlsFiltered[i].refDate;
        Store["consumption"] = jsonDelDtlsFiltered[i].consumption;
        Store["remarks"] = jsonDelDtlsFiltered[i].remarks;
        Store["rctag"] = jsonDelDtlsFiltered[i].rctag;

        jsonDelDtls.push(Store);
    }
    //jsonDelDtlsFiltered
    //jsonDelDtls = dedupe(jsonDelDtls);
}

function SaveJsonChrgDtls(docno, refno) {
    //Filter Data
    jsonDelDtls = FilterJsonDelDtls(docno, refno)

    for (var i = 0; i < jsonDelDtlsFiltered.length; i++) {
        var Store = {};

        Store["docno"] = jsonDelDtlsFiltered[i].docno;
        Store["linetype"] = jsonDelDtlsFiltered[i].linetype;
        Store["refTranNo"] = jsonDelDtlsFiltered[i].refTranNo;
        Store["igtCode"] = jsonDelDtlsFiltered[i].igtCode;
        Store["igtDesc"] = jsonDelDtlsFiltered[i].igtDesc;
        Store["itemCode"] = jsonDelDtlsFiltered[i].itemCode;
        Store["itemDesc"] = jsonDelDtlsFiltered[i].itemDesc;
        Store["payeeRef"] = jsonDelDtlsFiltered[i].payeeRef;
        Store["payeeName"] = jsonDelDtlsFiltered[i].payeeName;
        Store["vatCode"] = jsonDelDtlsFiltered[i].vatCode;
        Store["vatDesc"] = jsonDelDtlsFiltered[i].vatDesc;
        Store["ewtCode"] = jsonDelDtlsFiltered[i].ewtCode;
        Store["ewtDesc"] = jsonDelDtlsFiltered[i].ewtDesc;
        Store["assetID"] = jsonDelDtlsFiltered[i].assetID;
        Store["uom"] = jsonDelDtlsFiltered[i].uom;
        Store["qty"] = jsonDelDtlsFiltered[i].qty;
        Store["unitcostVATIN"] = jsonDelDtlsFiltered[i].unitcostVATIN;
        Store["unitcostVATEX"] = jsonDelDtlsFiltered[i].unitcostVATEX;
        Store["ocyamtVATIN"] = jsonDelDtlsFiltered[i].ocyamtVATIN;
        Store["ocyamtVATEX"] = jsonDelDtlsFiltered[i].ocyamtVATEX;
        Store["remBdgtQty"] = jsonDelDtlsFiltered[i].remBdgtQty;
        Store["remBdgtAmt"] = jsonDelDtlsFiltered[i].remBdgtAmt;
        Store["seg1"] = jsonDelDtlsFiltered[i].seg1;
        Store["seg1Desc"] = jsonDelDtlsFiltered[i].seg1Desc;
        Store["seg2"] = jsonDelDtlsFiltered[i].seg2;
        Store["seg2Desc"] = jsonDelDtlsFiltered[i].seg2Desc;
        Store["seg3"] = jsonDelDtlsFiltered[i].seg3;
        Store["seg3Desc"] = jsonDelDtlsFiltered[i].seg3Desc;
        Store["seg4"] = jsonDelDtlsFiltered[i].seg4;
        Store["seg4Desc"] = jsonDelDtlsFiltered[i].seg4Desc;
        Store["seg5"] = jsonDelDtlsFiltered[i].seg5;
        Store["seg5Desc"] = jsonDelDtlsFiltered[i].seg5Desc;
        Store["seg6"] = jsonDelDtlsFiltered[i].seg6;
        Store["seg6Desc"] = jsonDelDtlsFiltered[i].seg6Desc;
        Store["accntDesc"] = jsonDelDtlsFiltered[i].accntDesc;
        Store["sltypeCode"] = jsonDelDtlsFiltered[i].sltypeCode;
        Store["sltypeDesc"] = jsonDelDtlsFiltered[i].sltypeDesc;
        Store["slrefCode"] = jsonDelDtlsFiltered[i].slrefCode;
        Store["slrefDesc"] = jsonDelDtlsFiltered[i].slrefDesc;
        Store["bankAccnt"] = jsonDelDtlsFiltered[i].bankAccnt;
        Store["periodFrom"] = jsonDelDtlsFiltered[i].periodFrom;
        Store["periodTo"] = jsonDelDtlsFiltered[i].periodTo;
        Store["cashFlowCode"] = jsonDelDtlsFiltered[i].cashFlowCode;
        Store["cashFlowDesc"] = jsonDelDtlsFiltered[i].cashFlowDesc;
        Store["tag"] = jsonDelDtlsFiltered[i].tag;
        Store["reqSL"] = jsonDelDtlsFiltered[i].reqSL;
        Store["reqSA"] = jsonDelDtlsFiltered[i].reqSA;
        Store["allocProc"] = jsonDelDtlsFiltered[i].allocProc;
        Store["reqAP"] = jsonDelDtlsFiltered[i].reqAP;
        Store["rateLocal"] = jsonDelDtlsFiltered[i].rateLocal;
        Store["rateHome"] = jsonDelDtlsFiltered[i].rateHome;
        Store["allocTag"] = jsonDelDtlsFiltered[i].allocTag;
        Store["lineID"] = jsonDelDtlsFiltered[i].lineID;
        Store["rowno"] = jsonDelDtlsFiltered[i].rowno;
        Store["refNo"] = jsonDelDtlsFiltered[i].refNo;
        Store["refDate"] = jsonDelDtlsFiltered[i].refDate;
        Store["consumption"] = jsonDelDtlsFiltered[i].consumption;
        Store["remarks"] = jsonDelDtlsFiltered[i].remarks;
        Store["rctag"] = jsonDelDtlsFiltered[i].rctag;

        jsonDelDtls.push(Store);
    }
    jsonDelDtls = dedupe(jsonDelDtls);
}
function ClearAllJSONStrings()
{
    jsonDelDtls = [];
    jsonDelDtlsFiltered = [];
    jsonAllocProc = [];
    jsonAllocProcFiltered = [];
    jsonPrepayDtls = [];
    jsonPrepayDtlsFiltered = [];
    jsonRecurDtls = [];
    jsonRecurDtlsFiltered = [];
    jsonExpenseAlloc = [];
    jsonExpenseAllocFiltered = [];
}

$(document).on("click", '#btnSaveCD', function (e) {
    msgBoxContainerQuestion = "btnSaveCD";    
    parent_MessageBoxQuestion("Do you want to save the record?", "Charging Details", "Question");

    return false;
});

function setDelDtlProperties(row) {
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_CHARGINGDTLS + ")").removeClass("btnOrange");
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_CHARGINGDTLS + ")").addClass("btnGreen");
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_CDTAG + ")").text("1");
    var Grid = nwGridCon_Book.ActiveSheet;  
    Grid.SetText(SPR_CDTAG - 1, row, "1");

    var netamt = 0, netamt_local = 0, netamt_home = 0;
    var ocyamt = 0, ocyamt_local = 0, ocyamt_home = 0;
    var vat = 0, vat_local = 0, vat_home = 0;
    var ewt = 0, ewt_local = 0, ewt_home = 0;
    var adv = 0, adv_local = 0, adv_home = 0;
    var dm = 0, dm_local = 0, dm_home = 0;
    var ret = 0, ret_local = 0, ret_home = 0;

    for (var i = 0; i < jsonDelDtlsFiltered.length; i++) {
        netamt += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX);
        netamt_local += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX);
        netamt_home += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX);
       
        if (jsonDelDtlsFiltered[i].linetype == "1") {
            ocyamt += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX);
            ocyamt_local += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX) * getNumReplace(jsonDelDtlsFiltered[i].rateLocal);
            ocyamt_home += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX) * getNumReplace(jsonDelDtlsFiltered[i].rateHome);
        }
        if (jsonDelDtlsFiltered[i].vatCode != "" && jsonDelDtlsFiltered[i].linetype == "2") {
            vat += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX);
            vat_local += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX) * getNumReplace(jsonDelDtlsFiltered[i].rateLocal);
            vat_home += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX) * getNumReplace(jsonDelDtlsFiltered[i].rateHome);
        }
        if (jsonDelDtlsFiltered[i].ewtCode != "" && jsonDelDtlsFiltered[i].linetype == "2") {
            ewt += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX);
            ewt_local += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX) * getNumReplace(jsonDelDtlsFiltered[i].rateLocal);
            ewt_home += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX) * getNumReplace(jsonDelDtlsFiltered[i].rateHome);
        }
        if (jsonDelDtlsFiltered[i].linetype == "3" || jsonDelDtlsFiltered[i].linetype == "6") {
            adv += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX);
            adv_local += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX) * getNumReplace(jsonDelDtlsFiltered[i].rateLocal);
            adv_home += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX) * getNumReplace(jsonDelDtlsFiltered[i].rateHome);
        }
        if (jsonDelDtlsFiltered[i].linetype == "4") {
            dm += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX);
            dm_local += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX) * getNumReplace(jsonDelDtlsFiltered[i].rateLocal);
            dm_home += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX) * getNumReplace(jsonDelDtlsFiltered[i].rateHome);
        }
        if (jsonDelDtlsFiltered[i].linetype == "5") {
            ret += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX);
            ret_local += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX) * getNumReplace(jsonDelDtlsFiltered[i].rateLocal);
            ret_home += getNumReplace(jsonDelDtlsFiltered[i].ocyamtVATEX) * getNumReplace(jsonDelDtlsFiltered[i].rateHome);
        }
    }
    
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_OCYVATEX + ")").text(setNumReplace(ocyamt, 2));
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_VAT + ")").text(setNumReplace(vat, 2));
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_EWT + ")").text(setNumReplace(ewt, 2));
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_ADVANCES + ")").text(setNumReplace(adv*-1, 2));
    ////$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_DMAPP + ")").text(setNumReplace(dm, 2));
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_RETENTION + ")").text(setNumReplace(ret, 2));

    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_NETAMT + ")").text(setNumReplace(netamt, 2));
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_NETAMTHOME + ")").text(setNumReplace(netamt, 2));
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_NETAMTLOCAL + ")").text(setNumReplace(netamt, 2));

    Grid.SetText(SPR_OCYVATEX - 1, row, setNumReplace(ocyamt, 2));
    Grid.SetText(SPR_VAT - 1, row, setNumReplace(vat, 2));
    Grid.SetText(SPR_EWT - 1, row, setNumReplace(ewt, 2));
    Grid.SetText(SPR_ADVANCES - 1, row, setNumReplace(adv * -1, 2));
    Grid.SetText(SPR_RETENTION - 1, row, setNumReplace(ret, 2));
    Grid.SetText(SPR_NETAMT - 1, row, setNumReplace(netamt, 2));
    Grid.SetText(SPR_NETAMTHOME - 1, row, setNumReplace(netamt, 2));
    Grid.SetText(SPR_NETAMTLOCAL - 1, row, setNumReplace(netamt, 2));
}


function GetDueDate(startDate) {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var col = Grid.CellSelected.col - 1;
    //nwParameter_Add("currRow", crnwTR.index());
    nwParameter_Add("currRow", row);
    nwParameter_Add("startDate", startDate);
    //nwParameter_Add("paymentTerm", crnwTR.find("td:eq(" + SPR_NOOFDAYS + ")").text());
    nwParameter_Add("paymentTerm", Grid.GetValue(SPR_NOOFDAYS - 1, row));
    func_ActionDriven("actComputeDueDate", false);
}

function ComputeFooter() {
    //crnwTable = $("#nwGridCon .tblGridBody");
    //var len = crnwTable.find('tr').length;
    var Grid = nwGridCon_Book.ActiveSheet;
    Grid.RenderStatus = false;
    var len = Grid.GetMaxRow();

    var net = 0, net_loc = 0, net_hom = 0;
    var vat = 0, vat_loc = 0, vat_hom = 0;
    var ewt = 0, ewt_loc = 0, ewt_hom = 0;
    var adv = 0, adv_loc = 0, adv_hom = 0;
    var dm = 0, dm_loc = 0, dm_hom = 0;
    var ret = 0, ret_loc = 0, ret_hom = 0;
    var grossamt = 0, grossamt_loc = 0, grossamt_hom = 0;
    var tamtdue = 0, tamtdue_loc = 0, tamtdue_hom = 0;
    var netamtdue = 0, netamtdue_loc = 0, netamtdue_hom = 0;
    var rateLoc = 0, rateHom = 0;
    rateLoc = getNumReplace($("#txtForexLocal").val());
    rateHom = getNumReplace($("#txtForexHome").val());
    var amt = 0;
    for (var x = 0; x <= len - 1; x++) {

        
        net += getNumReplace(Grid.GetValue(SPR_OCYVATEX - 1, x));
        net_loc += getNumReplace(Grid.GetValue(SPR_OCYVATEX - 1, x)) * getNumReplace(rateLoc);
        net_hom += getNumReplace(Grid.GetValue(SPR_OCYVATEX - 1, x)) * getNumReplace(rateHom);
        //net += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_OCYVATEX + ')').text());
        //net_loc += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_OCYVATEX + ')').text()) * getNumReplace(rateLoc);
        //net_hom += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_OCYVATEX + ')').text()) * getNumReplace(rateHom);

        vat += getNumReplace(Grid.GetValue(SPR_VAT - 1, x));
        vat_loc += getNumReplace(Grid.GetValue(SPR_VAT - 1, x)) * getNumReplace(rateLoc);
        vat_hom += getNumReplace(Grid.GetValue(SPR_VAT - 1, x)) * getNumReplace(rateHom);
        //vat += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VAT + ')').text());
        //vat_loc += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VAT + ')').text()) * getNumReplace(rateLoc);
        //vat_hom += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VAT + ')').text()) * getNumReplace(rateHom);

        ewt += getNumReplace(Grid.GetValue(SPR_EWT - 1, x));
        ewt_loc += getNumReplace(Grid.GetValue(SPR_EWT - 1, x)) * getNumReplace(rateLoc);
        ewt_hom += getNumReplace(Grid.GetValue(SPR_EWT - 1, x)) * getNumReplace(rateHom);
        //ewt += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_EWT + ')').text());
        //ewt_loc += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_EWT + ')').text()) * getNumReplace(rateLoc);
        //ewt_hom += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_EWT + ')').text()) * getNumReplace(rateHom);

        adv += getNumReplace(Grid.GetValue(SPR_ADVANCES - 1, x));
        adv_loc += getNumReplace(Grid.GetValue(SPR_ADVANCES - 1, x)) * getNumReplace(rateLoc);
        adv_hom += getNumReplace(Grid.GetValue(SPR_ADVANCES - 1, x)) * getNumReplace(rateHom);
        //adv += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ADVANCES + ')').text());
        //adv_loc += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ADVANCES + ')').text()) * getNumReplace(rateLoc);
        //adv_hom += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ADVANCES + ')').text()) * getNumReplace(rateHom);

        dm += getNumReplace(Grid.GetValue(SPR_DMAPP - 1, x));
        dm_loc += getNumReplace(Grid.GetValue(SPR_DMAPP - 1, x)) * getNumReplace(rateLoc);
        dm_hom += getNumReplace(Grid.GetValue(SPR_DMAPP - 1, x)) * getNumReplace(rateHom);
        //dm += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_DMAPP + ')').text());
        //dm_loc += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_DMAPP + ')').text()) * getNumReplace(rateLoc);
        //dm_hom += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_DMAPP + ')').text()) * getNumReplace(rateHom);

        ret += getNumReplace(Grid.GetValue(SPR_RETENTION - 1, x));
        ret_loc += getNumReplace(Grid.GetValue(SPR_RETENTION - 1, x)) * getNumReplace(rateLoc);
        ret_hom += getNumReplace(Grid.GetValue(SPR_RETENTION - 1, x)) * getNumReplace(rateHom);
        //ret += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_RETENTION + ')').text());
        //ret_loc += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_RETENTION + ')').text()) * getNumReplace(rateLoc);
        //ret_hom += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_RETENTION + ')').text()) * getNumReplace(rateHom);
    }

    Grid.RenderStatus = true;
  
    $("#txtSubtotal_TranHist").val(setNumReplace(net, 2));
    $("#txtSubtotal_LocalCurr").val(setNumReplace(net_loc, 2));
    $("#txtSubtotal_HomeCurr").val(setNumReplace(net_hom, 2));

    $("#txtAddVat_TranHist").val(setNumReplace(vat, 2));
    $("#txtAddVat_LocalCurr").val(setNumReplace(vat_loc, 2));
    $("#txtAddVat_HomeCurr").val(setNumReplace(vat_hom, 2));
    
    ewt = getNumReplace(ewt) * -1;
    ewt_loc = getNumReplace(ewt_loc) * -1;
    ewt_hom = getNumReplace(ewt_hom) * -1;

    $("#txtLessEWT_TranHist").val(setNumReplace(ewt, 2));
    $("#txtLessEWT_LocalCurr").val(setNumReplace(ewt_loc, 2));
    $("#txtLessEWT_HomeCurr").val(setNumReplace(ewt_hom, 2));

    grossamt = getNumReplace(net) + getNumReplace(vat);
    grossamt_loc = getNumReplace(net_loc) + getNumReplace(vat_loc);
    grossamt_hom = getNumReplace(net_hom) + getNumReplace(vat_hom);

    $("#txtGrossAmt_TranHist").val(setNumReplace(grossamt, 2));
    $("#txtGrossAmt_LocalCurr").val(setNumReplace(grossamt_loc, 2));
    $("#txtGrossAmt_HomeCurr").val(setNumReplace(grossamt_hom, 2));

    tamtdue = getNumReplace(grossamt) - getNumReplace(ewt);
    tamtdue_loc = getNumReplace(grossamt_loc) - getNumReplace(ewt_loc);
    tamtdue_hom = getNumReplace(grossamt_hom) - getNumReplace(ewt_hom);

    $("#txtTotalAmt_TranHist").val(setNumReplace(tamtdue, 2));
    $("#txtTotalAmt_LocalCurr").val(setNumReplace(tamtdue_loc, 2));
    $("#txtTotalAmt_HomeCurr").val(setNumReplace(tamtdue_hom, 2));

    $("#txtLessRecoupment_TranHist").val(setNumReplace(adv, 2));
    $("#txtLessRecoupment_LocalCurr").val(setNumReplace(adv_loc, 2));
    $("#txtLessRecoupment_HomeCurr").val(setNumReplace(adv_hom, 2));

    dm = dm * -1;
    dm_loc = dm_loc * -1;
    dm_hom = dm_hom * -1;

    $("#txtLessDM_TranHist").val(setNumReplace(dm, 2));
    $("#txtLessDM_LocalCurr").val(setNumReplace(dm_loc, 2));
    $("#txtLessDM_HomeCurr").val(setNumReplace(dm_hom, 2));

    $("#txtRetention_TranHist").val(setNumReplace(ret, 2));
    $("#txtRetention_LocalCurr").val(setNumReplace(ret_loc, 2));
    $("#txtRetention_HomeCurr").val(setNumReplace(ret_hom, 2));

    netamtdue = getNumReplace(tamtdue) - getNumReplace(adv) - getNumReplace(dm) - getNumReplace(ret);
    netamtdue_loc = getNumReplace(tamtdue_loc) - getNumReplace(adv_loc) - getNumReplace(dm_loc) - getNumReplace(ret_loc);
    netamtdue_hom = getNumReplace(tamtdue_hom) - getNumReplace(adv_hom) - getNumReplace(dm_hom) - getNumReplace(ret_hom);

    $("#txtNetAmt_TranHist").val(setNumReplace(netamtdue, 2));
    $("#txtNetAmt_LocalCurr").val(setNumReplace(netamtdue_loc, 2));
    $("#txtNetAmt_HomeCurr").val(setNumReplace(netamtdue_hom, 2));

    //cust_GetPara();
    //func_ActionDriven("actComputeFooter", false);
}

//$(document).on('click', '.btnReqmtCompliance', function () {
//    var trantype = $("#txtTranType").val();
//    var docno = $('#txtDocno').val();
//    var lineID = crnwTR.find("td:eq(" + SPR_LINEID + ")").text();
//    var rowno = crnwTR.index() + 1;
//    var refTranNo = crnwTR.find("td:eq(" + SPR_REFTRANNO + ")").text();
//    isHeader = false;
//    if (docno == "" || lineID == "") {
//        MessageBox("Cannot proceed. Data should be saved first", Title, "error");
//        return false;
//    }

//    if (nwDocno == "") {
//        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&nwLineID=" + lineID + "&nwApplyTo=" + refTranNo + "";
//    }
//    else {
//        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&nwLineID=" + lineID + "&nwApplyTo=" + refTranNo + "&isView=true";
//    }

//    nwLoading_Start('xbtnReqmtCompliance', crLoadingHTML);
//    nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
//    $('#nwPopUpRequireCompliance .BoxTitle').text("Requirements Compliance");
//    $("#nwPopUpRequireCompliance").css({ "min-width": "98%" });
//    $("#nwPopUpRequireCompliance").css({ "min-height": "98%" });
//    nwPopupForm_ShowModal("nwPopUpRequireCompliance");
//    nwLoading_End('xbtnReqmtCompliance');
//});

function btnReqmtCompliance() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
  
    var trantype = $("#txtTranType").val();
    var docno = $('#txtDocno').val();
    //var lineID = crnwTR.find("td:eq(" + SPR_LINEID + ")").text();
    //var rowno = crnwTR.index() + 1;
    //var refTranNo = crnwTR.find("td:eq(" + SPR_REFTRANNO + ")").text();
    var lineID = Grid.GetValue(SPR_LINEID - 1, row);
    var rowno = row + 1;
    var refTranNo = Grid.GetValue(SPR_REFTRANNO - 1, row);
    isHeader = false;
    if (docno == "" || lineID == "") {
        MessageBox("Cannot proceed. Data should be saved first", Title, "error");
        return false;
    }

    if (nwDocno == "") {
        //var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&nwLineID=" + lineID + "&nwApplyTo=" + refTranNo + "";
        var fullength = GetCurrentURL() + `../DCRequirementCompliance?TransactionNo=${encodeURI(docno)}&TranType=${encodeURI(trantype)}&nwLineID=${encodeURI(lineID)}&nwApplyTo=${encodeURI(refTranNo)}`;
    }
    else {
        //var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&nwLineID=" + lineID + "&nwApplyTo=" + refTranNo + "&isView=true";
        var fullength = GetCurrentURL() + `../DCRequirementCompliance?TransactionNo=${encodeURI(docno)}&TranType=${encodeURI(trantype)}&nwLineID=${encodeURI(lineID)}&nwApplyTo=${encodeURI(refTranNo)}&isView=true`;
    }

    nwLoading_Start('xbtnReqmtCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
    $('#nwPopUpRequireCompliance .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpRequireCompliance").css({ "min-width": "98%" });
    $("#nwPopUpRequireCompliance").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpRequireCompliance");
    nwLoading_End('xbtnReqmtCompliance');
}

//$(document).on('click', '.btnRvwAttach', function () {
//    var docno = $('#txtDocno').val();
//    var reftranno = crnwTR.find("td:eq(" + SPR_REFTRANNO + ")").text();
//    lineID = crnwTR.find("td:eq(" + SPR_LINEID + ")").text();
//    docno_glb = crnwTR.find("td:eq(" + SPR_REFTRANNO + ")").text();
//    rvwattachtag = 'lin';
//    currRow = crnwTR.index();
//    if (reftranno.length > 0) {
//        if (docno == "") {
//            MessageBox("Cannot proceed. Data should be saved first", Title, "error");
//            return false;
//        }

//        var fullength = "../../../DC/DataSetup/DCViewAttachment/DCViewAttachment.aspx?nwDocno=" + reftranno + "";

//        nwLoading_Start('xbtnRvwAttach', crLoadingHTML);
//        nwPopupForm_Create("nwPopUpRvwAttach", true, fullength);
//        $('#nwPopUpRvwAttach .BoxTitle').text("Review Attachment(s)");
//        $("#nwPopUpRvwAttach").css({ "min-width": "98%" });
//        $("#nwPopUpRvwAttach").css({ "min-height": "98%" });
//        nwPopupForm_ShowModal("nwPopUpRvwAttach");
//        nwLoading_End('xbtnRvwAttach');
//    }    
//});

function btnRvwAttach() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var docno = $('#txtDocno').val();
    //var reftranno = crnwTR.find("td:eq(" + SPR_REFTRANNO + ")").text();
    //lineID = crnwTR.find("td:eq(" + SPR_LINEID + ")").text();
    //docno_glb = crnwTR.find("td:eq(" + SPR_REFTRANNO + ")").text();
    var reftranno = Grid.GetValue(SPR_REFTRANNO - 1, row);
    lineID =  Grid.GetValue(SPR_LINEID - 1, row);
    docno_glb =  Grid.GetValue(SPR_REFTRANNO - 1, row);
    rvwattachtag = 'lin';
    currRow = row;
    if (reftranno.length > 0) {
        if (docno == "") {
            MessageBox("Cannot proceed. Data should be saved first", Title, "error");
            return false;
        }

        //var fullength = "../../../DC/DataSetup/DCViewAttachment/DCViewAttachment.aspx?nwDocno=" + reftranno + "";
        var fullength = GetCurrentURL() + `../DCViewAttachment?nwDocno=${encodeURI(reftranno)}`;


        nwLoading_Start('xbtnRvwAttach', crLoadingHTML);
        nwPopupForm_Create("nwPopUpRvwAttach", true, fullength);
        $('#nwPopUpRvwAttach .BoxTitle').text("Review Attachment(s)");
        $("#nwPopUpRvwAttach").css({ "min-width": "98%" });
        $("#nwPopUpRvwAttach").css({ "min-height": "98%" });
        nwPopupForm_ShowModal("nwPopUpRvwAttach");
        nwLoading_End('xbtnRvwAttach');
    }  
}

$(document).on('click', '#btnRvwAttachments', function () {
    var docno = $('#txtDocno').val();
    rvwattachtag = 'hdr';
    if (docno == "") {
        MessageBox("Cannot proceed. Data should be saved first", Title, "error");
        return false;
    }

    //var fullength = "../../../DC/DataSetup/DCViewAttachment/DCViewAttachment.aspx?nwDocno=" + docno + "&nwCurrDocno=" + docno + "";
    var fullength = GetCurrentURL() + `../DCViewAttachment?nwDocno=${encodeURI(docno)}&nwCurrDocno=${encodeURI(docno)}`;


    nwLoading_Start('xbtnViewAttach', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRvwAttach", true, fullength);
    $('#nwPopUpRvwAttach .BoxTitle').text("Review Attachment(s)");
    $("#nwPopUpRvwAttach").css({ "min-width": "98%" });
    $("#nwPopUpRvwAttach").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpRvwAttach");
    nwLoading_End('xbtnViewAttach');
});


var _crnwTR = "";
$(document).on("focus", ".computeVATEX", function (e) {
    _crnwTR = crnwTR;
});
$(document).on("focus", ".numVATEX", function (e) {
    _crnwTR = crnwTR;
});

//$(document).on("change", ".computeVATEX", function (e) {
//    isCopyRow == false;
//    nwParameter_Add("currRow", _crnwTR.index());
//    nwParameter_Add("vatCode", _crnwTR.find('td:eq(' + SPR_CD_VATCODE + ')').text());
//    nwParameter_Add("ewtCode", _crnwTR.find('td:eq(' + SPR_CD_EWTCODE + ')').text());
//    nwParameter_Add("vatIN", _crnwTR.find('td:eq(' + SPR_CD_UNITCOST_VATIN + ') input').val());
//    nwParameter_Add("vatEX", _crnwTR.find('td:eq(' + SPR_CD_UNITCOST_VATEX + ') input').val());
//    nwParameter_Add("qty", _crnwTR.find('td:eq(' + SPR_CD_QTY + ') input').val());
//    nwParameter_Add_Table("nwGridChargeDtlsCon");
//    func_ActionDriven("actComputeVatex", false); 
//});

function computeVATEX() {
    isCopyRow == false;
    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;
    var row = GridCD.CellSelected.row - 1;
    //nwParameter_Add("currRow", _crnwTR.index());
    //nwParameter_Add("vatCode", _crnwTR.find('td:eq(' + SPR_CD_VATCODE + ')').text());
    //nwParameter_Add("ewtCode", _crnwTR.find('td:eq(' + SPR_CD_EWTCODE + ')').text());
    //nwParameter_Add("vatIN", _crnwTR.find('td:eq(' + SPR_CD_UNITCOST_VATIN + ') input').val());
    //nwParameter_Add("vatEX", _crnwTR.find('td:eq(' + SPR_CD_UNITCOST_VATEX + ') input').val());
    //nwParameter_Add("qty", _crnwTR.find('td:eq(' + SPR_CD_QTY + ') input').val());
    //nwParameter_Add_Table("nwGridChargeDtlsCon");
    nwParameter_Add("currRow", row);
    nwParameter_Add("vatCode", GridCD.GetValue(SPR_CD_VATCODE - 1, row));
    nwParameter_Add("ewtCode", GridCD.GetValue(SPR_CD_EWTCODE - 1, row));
    nwParameter_Add("vatIN", GridCD.GetValue(SPR_CD_UNITCOST_VATIN - 1, row));
    nwParameter_Add("vatEX", GridCD.GetValue(SPR_CD_UNITCOST_VATEX - 1, row));
    nwParameter_Add("qty", GridCD.GetValue(SPR_CD_QTY - 1, row));
    nwParameter_Add_Spread(nwGridChargeDtlsCon_Book);
    func_ActionDriven("actComputeVatex", false); 
}

function ComputeCDHdrAmounts() {
    //tblCD = $("#nwGridChargeDtlsCon .tblGridBody");
    //var len = tblCD.find('tr').length;
    //var invoiceamt = 0, appliedamt = 0, unappliedamt = 0;
    //for (var x = 0; x <= len - 1; x++) {
    //    appliedamt += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATIN + ')').text());
    //}
    //invoiceamt = getNumReplace($("#txtGrossAmt_CD").val());
    //unappliedamt = invoiceamt - appliedamt;
    //$("#txtAppliedAmt_CD").val(setNumReplace(appliedamt, 2));
    //$("#txtUnappliedAmt_CD").val(setNumReplace(unappliedamt, 2));

    var Grid = nwGridChargeDtlsCon_Book.ActiveSheet;
   
    Grid.RenderStatus = false;
    var len = Grid.GetMaxRow();
    var invoiceamt = 0, appliedamt = 0, unappliedamt = 0;
    for (var x = 0; x <= len - 1; x++) {
        appliedamt += getNumReplace(Grid.GetValue(SPR_CD_OCYAMT_VATIN - 1, x));
    }

    invoiceamt = getNumReplace($("#txtGrossAmt_CD").val());
    unappliedamt = invoiceamt - appliedamt;
    $("#txtAppliedAmt_CD").val(setNumReplace(appliedamt, 2));
    $("#txtUnappliedAmt_CD").val(setNumReplace(unappliedamt, 2));
    Grid.RenderStatus = true;
}

$(document).on("change", ".numVATEX", function (e) {
    nwParameter_Add("currRow", _crnwTR.index());
    nwParameter_Add("vatCode", _crnwTR.find('td:eq(' + SPR_CD_VATCODE + ')').text());
    nwParameter_Add("ewtCode", _crnwTR.find('td:eq(' + SPR_CD_EWTCODE + ')').text());    
    nwParameter_Add("vatEX", _crnwTR.find('td:eq(' + SPR_CD_UNITCOST_VATEX + ') input').val());
    nwParameter_Add("qty", _crnwTR.find('td:eq(' + SPR_CD_QTY + ') input').val());
    nwParameter_Add_Table("nwGridChargeDtlsCon");
    func_ActionDriven("actComputeVatin", false);
});

function numVATEX() {  
    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;
    var row = GridCD.CellSelected.row - 1;
    //nwParameter_Add("currRow", _crnwTR.index());
    //nwParameter_Add("vatCode", _crnwTR.find('td:eq(' + SPR_CD_VATCODE + ')').text());
    //nwParameter_Add("ewtCode", _crnwTR.find('td:eq(' + SPR_CD_EWTCODE + ')').text());    
    //nwParameter_Add("vatEX", _crnwTR.find('td:eq(' + SPR_CD_UNITCOST_VATEX + ') input').val());
    //nwParameter_Add("qty", _crnwTR.find('td:eq(' + SPR_CD_QTY + ') input').val());
    //nwParameter_Add_Table("nwGridChargeDtlsCon");
    nwParameter_Add("currRow", row);
    nwParameter_Add("vatCode", GridCD.GetValue(SPR_CD_VATCODE - 1, row));
    nwParameter_Add("ewtCode", GridCD.GetValue(SPR_CD_EWTCODE - 1, row));    
    nwParameter_Add("vatEX", GridCD.GetValue(SPR_CD_UNITCOST_VATEX - 1, row));
    nwParameter_Add("qty", GridCD.GetValue(SPR_CD_QTY - 1, row));
    nwParameter_Add_Spread(nwGridChargeDtlsCon_Book);
    func_ActionDriven("actComputeVatin", false);
}

function MainGridConfig() {
    //crnwTable = $("#nwGridChargeDtlsCon .tblGridBody");;
    //nwGrid_TableFreeze("nwGridChargeDtls", SPR_CD_ITEMGRPTYPEDESC, 0)
    //var len = crnwTable.find('tr').length;

    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;
    var row = GridCD.CellSelected.row - 1;
    var col = GridCD.CellSelected.col - 1;

    GridCD.RenderStatus = false;
    var len = GridCD.GetMaxRow();
    var maxCol = GridCD.GetMaxCol();

    var costcenterCode = '', costcenterDesc = '', vendorCode = '', vendorDesc = '';
    costcenterCode = $("#idvallugOrigCCC").val();
    costcenterDesc = $("#descvallugOrigCCC").val();
    vendorCode = $("#idvallugVendorPayee").val();
    vendorDesc = $("#descvallugVendorPayee").val();    
    $("#btnApplyAdvDM").addClass("btn-default");
    if (hasAdv == "True") {
        //$("#btnApplyAdvDM").removeClass("btnGray");
        //$("#btnApplyAdvDM").removeClass("btnBlue");
        $("#btnApplyAdvDM").addClass("btn-default-green");
        $("#btnApplyAdvDM").enable(true);
    }
    else if (withADV == "1") {
        //$("#btnApplyAdvDM").removeClass("btnGray");
        //$("#btnApplyAdvDM").removeClass("btnGreen");
        $("#btnApplyAdvDM").addClass("btn-default-blue");
        $("#btnApplyAdvDM").enable(true);
    }
    else {
        //$("#btnApplyAdvDM").removeClass("btnGreen");
        //$("#btnApplyAdvDM").removeClass("btnBlue");
        $("#btnApplyAdvDM").addClass("btn-default-gray");
        $("#btnApplyAdvDM").enable(false);
    }
    //EnableChargingDtls();
    for (var x = 0; x <= len - 1; x++) {
        if (GridCD.GetValue(SPR_CD_LINETYPE - 1, x) == "") {
            GridCD.SetText(SPR_CD_LINETYPE - 1, x, "1");
        }
       
        //if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').val() == "0")
            //continue;

        if (GridCD.GetValue(SPR_CD_LINETYPE - 1, x) == "0")
            continue;

        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').enable(false);
        GridCD.SetEnable(SPR_CD_LINETYPE - 1, x, false);
        //if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_TAG + ')').text().length > 0 && isBtnDone == false && taxConvert == "2") {
        if (GridCD.GetValue(SPR_CD_TAG - 1, x) != "" && isBtnDone == false && taxConvert == "2") {
            DisableChargingDtls();
            $('#btnResetTax').enable(true);
            $('#btnTaxConvert').enable(false);
            $("#btnReloadTaxes").enable(false);
            $("#nwGridChargeDtlsCon .nwgrid_Delete").enable(false);
            $("#nwGridChargeDtlsCon .nwgrid_Insert").enable(false);
            $("#nwGridChargeDtlsCon .nwgrid_CopyRow").enable(false);
            $("#nwGridChargeDtlsCon .nwgrid_SaveWidth").enable(false);
            $("#nwGridChargeDtlsCon .nwgrid_ResetWidth").enable(false);
        }

        //let payeeref = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_PAYEEREFCODE + ')').text();
        let payeeref = GridCD.GetValue(SPR_CD_PAYEEREFCODE - 1, x);
        if (payeeref == "") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_PAYEEREFCODE + ')').text(vendorCode);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_PAYEEREFDESC + ')').text(vendorDesc);
            GridCD.SetText(SPR_CD_PAYEEREFCODE - 1, x, vendorCode);
            GridCD.SetText(SPR_CD_PAYEEREFDESC - 1, x, vendorDesc);
        }
      
        //For Dynamic Default Location in SEGMENT
        defaultLocCode = $("#idvallugLocAcctForms").val();
        defaultLocDesc = $("#txtLocDesc").val();

        //if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').val() == "1")
        //{       
        //    crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG1 + ')').text(controlAccountCode);
        //    crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG1DESC + ')').text(controlAccountDesc);
        //}
        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG1 + ')').enable(false);
        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG1DESC + ')').enable(false);
        GridCD.SetEnable(SPR_CD_SEG1 - 1, x, false);
        GridCD.SetEnable(SPR_CD_SEG1DESC - 1, x, false);
        GridCD.SetBackground(SPR_CD_SEG1 - 1, x, "gainsboro");
        GridCD.SetBackground(SPR_CD_SEG1DESC - 1, x, "gainsboro");
        switch (defaultLocSegCode) {
            case "02":
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG2 + ')').text(defaultLocCode);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG2DESC + ')').text(defaultLocDesc);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG2 + ')').enable(false);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG2DESC + ')').enable(false);
                GridCD.SetText(SPR_CD_SEG2 - 1, x, defaultLocCode);
                GridCD.SetText(SPR_CD_SEG2DESC - 1, x, defaultLocDesc);
                GridCD.SetEnable(SPR_CD_SEG2 - 1, x, false);
                GridCD.SetEnable(SPR_CD_SEG2DESC - 1, x, false);
                GridCD.SetBackground(SPR_CD_SEG2 - 1, x, "gainsboro");
                GridCD.SetBackground(SPR_CD_SEG2DESC - 1, x, "gainsboro");
                break;
            case "03":
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG3 + ')').text(defaultLocCode);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG3DESC + ')').text(defaultLocDesc);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG3 + ')').enable(false);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG3DESC + ')').enable(false);
                GridCD.SetText(SPR_CD_SEG3 - 1, x, defaultLocCode);
                GridCD.SetText(SPR_CD_SEG3DESC - 1, x, defaultLocDesc);
                GridCD.SetEnable(SPR_CD_SEG3 - 1, x, false);
                GridCD.SetEnable(SPR_CD_SEG3DESC - 1, x, false);
                GridCD.SetBackground(SPR_CD_SEG3 - 1, x, "gainsboro");
                GridCD.SetBackground(SPR_CD_SEG3DESC - 1, x, "gainsboro");
                break;
            case "04":
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG4 + ')').text(defaultLocCode);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG4DESC + ')').text(defaultLocDesc);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG4 + ')').enable(false);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG4DESC + ')').enable(false);
                GridCD.SetText(SPR_CD_SEG4 - 1, x, defaultLocCode);
                GridCD.SetText(SPR_CD_SEG4DESC - 1, x, defaultLocDesc);
                GridCD.SetEnable(SPR_CD_SEG4 - 1, x, false);
                GridCD.SetEnable(SPR_CD_SEG4DESC - 1, x, false);
                GridCD.SetBackground(SPR_CD_SEG4 - 1, x, "gainsboro");
                GridCD.SetBackground(SPR_CD_SEG4DESC - 1, x, "gainsboro");
                break;
            case "05":
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG5 + ')').text(defaultLocCode);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG5DESC + ')').text(defaultLocDesc);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG5 + ')').enable(false);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG5DESC + ')').enable(false);
                GridCD.SetText(SPR_CD_SEG5 - 1, x, defaultLocCode);
                GridCD.SetText(SPR_CD_SEG5DESC - 1, x, defaultLocDesc);
                GridCD.SetEnable(SPR_CD_SEG5 - 1, x, false);
                GridCD.SetEnable(SPR_CD_SEG5DESC - 1, x, false);
                GridCD.SetBackground(SPR_CD_SEG5 - 1, x, "gainsboro");
                GridCD.SetBackground(SPR_CD_SEG5DESC - 1, x, "gainsboro");
                break;
            case "06":
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG6 + ')').text(defaultLocCode);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG6DESC + ')').text(defaultLocDesc);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG6 + ')').enable(false);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG6DESC + ')').enable(false);
                GridCD.SetText(SPR_CD_SEG6 - 1, x, defaultLocCode);
                GridCD.SetText(SPR_CD_SEG6DESC - 1, x, defaultLocDesc);
                GridCD.SetEnable(SPR_CD_SEG6 - 1, x, false);
                GridCD.SetEnable(SPR_CD_SEG6DESC - 1, x, false);
                GridCD.SetBackground(SPR_CD_SEG6 - 1, x, "gainsboro");
                GridCD.SetBackground(SPR_CD_SEG6DESC - 1, x, "gainsboro");
                break;
        }

        if (isCopyRow == false) {
            let cdtag = GridCD.GetValue(SPR_CD_TAG - 1, x);   
            //if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_TAG + ')').text() == "" || crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_TAG + ')').text() == "0") {
            if (cdtag == "" || cdtag == "0") { 
                switch (defaultCCSegCode) {
                    case "02":
                        //if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG2 + ')').text() == "") {
                        if (GridCD.GetValue(SPR_CD_SEG2 - 1, x) == "") {                         
                            //crnwTable.find('tr:eq(' +x + ') td:eq(' + SPR_CD_SEG2 + ')').text(costcenterCode);
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG2DESC + ')').text(costcenterDesc);
                            GridCD.SetText(SPR_CD_SEG2 - 1, costcenterCode);
                            GridCD.SetText(SPR_CD_SEG2DESC - 1, costcenterDesc);
                        }                       
                        break;

                    case "03":
                        //if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG3 + ')').text() == "") {
                        if (GridCD.GetValue(SPR_CD_SEG3 - 1, x) == "") {       
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG3 + ')').text(costcenterCode);
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG3DESC + ')').text(costcenterDesc);
                            GridCD.SetText(SPR_CD_SEG3 - 1, costcenterCode);
                            GridCD.SetText(SPR_CD_SEG3DESC - 1, costcenterDesc);
                        }
                        break;

                    case "04":
                        //if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG4 + ')').text() == "") {
                        if (GridCD.GetValue(SPR_CD_SEG4 - 1, x) == "") {       
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG4 + ')').text(costcenterCode);
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG4DESC + ')').text(costcenterDesc);
                            GridCD.SetText(SPR_CD_SEG4 - 1, costcenterCode);
                            GridCD.SetText(SPR_CD_SEG4DESC - 1, costcenterDesc);
                        }
                        break;

                    case "05":
                        //if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG5 + ')').text() == "") {
                        if (GridCD.GetValue(SPR_CD_SEG5 - 1, x) == "") {       
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG5 + ')').text(costcenterCode);
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG5DESC + ')').text(costcenterDesc);
                            GridCD.SetText(SPR_CD_SEG5 - 1, costcenterCode);
                            GridCD.SetText(SPR_CD_SEG5DESC - 1, costcenterDesc);
                        }
                        break;

                    case "06":
                        //if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG6 + ')').text() == "") {
                        if (GridCD.GetValue(SPR_CD_SEG6 - 1, x) == "") {       
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG6 + ')').text(costcenterCode);
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG6DESC + ')').text(costcenterDesc);
                            GridCD.SetText(SPR_CD_SEG6 - 1, costcenterCode);
                            GridCD.SetText(SPR_CD_SEG6DESC - 1, costcenterDesc);
                        }
                        break;
                }
            }
        }
             
        switch (lastsegment) {
            case "02":
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG2 + ')').enable(false);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG2DESC + ')').enable(false);
                GridCD.SetEnable(SPR_CD_SEG2 - 1, false);
                GridCD.SetEnable(SPR_CD_SEG2DESC - 1, false);
                GridCD.SetBackground(SPR_CD_SEG2 - 1, x, "gainsboro");
                GridCD.SetBackground(SPR_CD_SEG2DESC - 1, x, "gainsboro");
                break;

            case "03":
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG3 + ')').enable(false);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG4DESC + ')').enable(false);
                GridCD.SetEnable(SPR_CD_SEG3 - 1, false);
                GridCD.SetEnable(SPR_CD_SEG3DESC - 1, false);
                GridCD.SetBackground(SPR_CD_SEG3 - 1, x, "gainsboro");
                GridCD.SetBackground(SPR_CD_SEG3DESC - 1, x, "gainsboro");
                break;

            case "04":
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG4 + ')').enable(false);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG4DESC + ')').enable(false);
                GridCD.SetEnable(SPR_CD_SEG4 - 1, false);
                GridCD.SetEnable(SPR_CD_SEG4DESC - 1, false);
                GridCD.SetBackground(SPR_CD_SEG4 - 1, x, "gainsboro");
                GridCD.SetBackground(SPR_CD_SEG4DESC - 1, x, "gainsboro");
                break;

            case "05":
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG5 + ')').enable(false);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG5DESC + ')').enable(false);
                GridCD.SetEnable(SPR_CD_SEG5 - 1, false);
                GridCD.SetEnable(SPR_CD_SEG5DESC - 1, false);
                GridCD.SetBackground(SPR_CD_SEG5 - 1, x, "gainsboro");
                GridCD.SetBackground(SPR_CD_SEG5DESC - 1, x, "gainsboro");
                break;

            case "06":
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG6 + ')').enable(false);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SEG6DESC + ')').enable(false);
                GridCD.SetEnable(SPR_CD_SEG6 - 1, false);
                GridCD.SetEnable(SPR_CD_SEG6DESC - 1, false);
                GridCD.SetBackground(SPR_CD_SEG6 - 1, x, "gainsboro");
                GridCD.SetBackground(SPR_CD_SEG6DESC - 1, x, "gainsboro");
                break;
        }

        //var reqSL = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_REQSLTYPE + ')').text();
        //var reqSA = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_REQSUBACCNT + ')').text();
        let reqSL = GridCD.GetValue(SPR_CD_REQSLTYPE - 1, x);
        let reqSA = GridCD.GetValue(SPR_CD_REQSUBACCNT - 1, x);
        if (reqSL == "0" || reqSL == "") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SLTYPECODE + ')').enable(false);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_REFTYPECODE + ')').enable(false);
            GridCD.SetEnable(SPR_CD_SLTYPECODE - 1, x, false);
            GridCD.SetEnable(SPR_CD_REFTYPECODE - 1, x, false);
            GridCD.SetBackground(SPR_CD_SLTYPECODE - 1, x, "gainsboro");
            GridCD.SetBackground(SPR_CD_REFTYPECODE - 1, x, "gainsboro");
        }
        else {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SLTYPECODE + ')').enable(true);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_REFTYPECODE + ')').enable(true);
            GridCD.SetEnable(SPR_CD_SLTYPECODE - 1, x, true);
            GridCD.SetEnable(SPR_CD_REFTYPECODE - 1, x, true);
            GridCD.SetBackground(SPR_CD_SLTYPECODE - 1, x, "cyan");
            GridCD.SetBackground(SPR_CD_REFTYPECODE - 1, x, "cyan");
        }
        if (reqSA == "0" || reqSA == "") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_BANKACCT + ')').enable(false);
            GridCD.SetEnable(SPR_CD_BANKACCT - 1, x, false);
            GridCD.SetBackground(SPR_CD_BANKACCT - 1, x, "gainsboro");
        }
        else {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_BANKACCT + ')').enable(true);
            GridCD.SetEnable(SPR_CD_BANKACCT - 1, x, true);
            GridCD.SetBackground(SPR_CD_BANKACCT - 1, x, "cyan");
        }

        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_IO + ') input').enable(false);
        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_IO + ')').css("background-color", "gainsboro");
        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_IO + ') input').css("background-color", "gainsboro");
        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_IO + ') input').css("border", "none");
        GridCD.SetEnable(SPR_CD_IO - 1, x, false);
        GridCD.SetBackground(SPR_CD_IO - 1, x, "gainsboro");
        if (payeeConfig == "True") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_PAYEEREFCODE + ')').enable(false);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_PAYEEREFCODE + ')').css("background-color", "gainsboro");
            GridCD.SetEnable(SPR_CD_PAYEEREFCODE - 1, x, false);
            GridCD.SetBackground(SPR_CD_PAYEEREFCODE - 1, x, "gainsboro");
        }
        else {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_PAYEEREFCODE + ')').enable(true);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_PAYEEREFCODE + ')').css("background-color", "cyan");
            GridCD.SetEnable(SPR_CD_PAYEEREFCODE - 1, x, true);
            GridCD.SetBackground(SPR_CD_PAYEEREFCODE - 1, x, "cyan");
        }        

        //let linetype = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').val();
        let linetype = GridCD.GetValue(SPR_CD_LINETYPE - 1, x);
        let cdtag = GridCD.GetValue(SPR_CD_TAG - 1, x);
        //if (linetype == "2" || linetype == "5" || linetype == "3" || linetype == "4" || (taxConvert == "2" && crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_TAG + ')').text() != "")) {
        if (linetype == "2" || linetype == "5" || linetype == "3" || linetype == "4" || (taxConvert == "2" && cdtag != "")) {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_PAYEEREFCODE + ')').enable(false);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_PAYEEREFCODE + ')').css("background-color", "gainsboro");
            GridCD.SetEnable(SPR_CD_PAYEEREFCODE - 1, x, false);
            GridCD.SetBackground(SPR_CD_PAYEEREFCODE - 1, x, "gainsboro");
        }
        if (linetype == "1") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').prop('title', 'Transaction');
            GridCD.SetText(SPR_CD_LINETYPE - 1, x, "1");
        }
        else if (linetype == "2") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').prop('title', 'Tax');
            GridCD.SetText(SPR_CD_LINETYPE - 1, x, "2");
        }
        else if (linetype == "3") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').prop('title', 'Recoupment of DP/Advances');
            GridCD.SetText(SPR_CD_LINETYPE - 1, x, "3");
        }
        else if (linetype == "4") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').prop('title', 'Debit Memo Applied');
            GridCD.SetText(SPR_CD_LINETYPE - 1, x, "4");
        }
        else if (linetype == "5") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').prop('title', 'Retention');
            GridCD.SetText(SPR_CD_LINETYPE - 1, x, "5");
        }
        else if (linetype == "6") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').prop('title', 'Recoupment of DP/Advances-Tax');
            GridCD.SetText(SPR_CD_LINETYPE - 1, x, "6");
        }
        else if (linetype == "7") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').prop('title', 'Retention-Tax');
            GridCD.SetText(SPR_CD_LINETYPE - 1, x, "7");
        }       
     
        if (allowTaxPerTrantype == "1") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_VATSHORTDESC + ')').enable(true);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_EWTSHORTDESC + ')').enable(true);
            GridCD.SetEnable(SPR_CD_VATSHORTDESC - 1, x, true);
            GridCD.SetEnable(SPR_CD_EWTSHORTDESC - 1, x, true);
            GridCD.SetBackground(SPR_CD_VATSHORTDESC - 1, x, "cyan");
            GridCD.SetBackground(SPR_CD_EWTSHORTDESC - 1, x, "cyan");
        }
        else {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_VATSHORTDESC + ')').enable(false);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_EWTSHORTDESC + ')').enable(false);
            GridCD.SetEnable(SPR_CD_VATSHORTDESC - 1, x, false);
            GridCD.SetEnable(SPR_CD_EWTSHORTDESC - 1, x, false);
            GridCD.SetBackground(SPR_CD_VATSHORTDESC - 1, x, "gainsboro");
            GridCD.SetBackground(SPR_CD_EWTSHORTDESC - 1, x, "gainsboro");
        }


        GridCD.SetText(SPR_CD_BDGTDTLS - 1, x, "...");
        GridCD.SetTextAlign(SPR_CD_BDGTDTLS - 1, x, "center");
        GridCD.SetTextColor(SPR_CD_BDGTDTLS - 1, x, "white");
        GridCD.SetBold(SPR_CD_BDGTDTLS - 1, x, "bold");
        //let aptag = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_ALLOCTAG + ')').text();
        let aptag = GridCD.GetValue(SPR_CD_ALLOCTAG - 1, x);
        if (aptag == "1" && linetype == "1") {            
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_BDGTDTLS + ")").removeClass("btnGray");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_BDGTDTLS + ")").removeClass("btnBlue");            
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_BDGTDTLS + ")").addClass("btnGreen");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_BDGTDTLS + ") button").removeClass("btnGray");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_BDGTDTLS + ") button").removeClass("btnBlue");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_BDGTDTLS + ") button").addClass("btnGreen");
            GridCD.SetBackground(SPR_CD_BDGTDTLS - 1, x, "green");
            GridCD.SetEnable(SPR_CD_BDGTDTLS - 1, x, true);
        }
        else {
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_BDGTDTLS + ")").removeClass("btnBlue");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_BDGTDTLS + ")").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_BDGTDTLS + ")").addClass("btnGray");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_BDGTDTLS + ") button").removeClass("btnBlue");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_BDGTDTLS + ") button").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_BDGTDTLS + ") button").addClass("btnGray");
            GridCD.SetBackground(SPR_CD_BDGTDTLS - 1, x, "gray");
            GridCD.SetEnable(SPR_CD_BDGTDTLS - 1, x, false);
        }

        //let rctag = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_RCTAG + ')').text();
        //let igt = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_ITEMGRPTYPECODE + ')').text();
        let rctag = GridCD.GetValue(SPR_CD_RCTAG - 1, x);
        let igt = GridCD.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, x);

        GridCD.SetText(SPR_CD_REQCOMP - 1, x, "...");
        GridCD.SetTextAlign(SPR_CD_REQCOMP - 1, x, "center");
        GridCD.SetTextColor(SPR_CD_REQCOMP - 1, x, "white");
        GridCD.SetBold(SPR_CD_REQCOMP - 1, x, "bold");
        if (isNewData == true) {
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").removeClass("btnOrange");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").addClass("btnGray");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").removeClass("btnReqComp_CD");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").removeClass("btnOrange");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").addClass("btnGray");
            GridCD.SetBackground(SPR_CD_REQCOMP - 1, x, "gray");
            GridCD.SetEnable(SPR_CD_REQCOMP - 1, x, false);
        }
        else if (rctag == "1") {
            if (igt != "") {
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").removeClass("btnGray");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").removeClass("btnOrange");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").addClass("btnGreen");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").addClass("btnReqComp_CD");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").removeClass("btnGray");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").removeClass("btnOrange");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").addClass("btnGreen");
                GridCD.SetBackground(SPR_CD_REQCOMP - 1, rowCD, "green");
                GridCD.SetEnable(SPR_CD_REQCOMP - 1, rowCD, true);
            }
            else {
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").removeClass("btnOrange");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").removeClass("btnGreen");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").addClass("btnGray");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").removeClass("btnReqComp_CD");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").removeClass("btnOrange");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").removeClass("btnGreen");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").addClass("btnGray");
                GridCD.SetBackground(SPR_CD_REQCOMP - 1, x, "gray");
                GridCD.SetEnable(SPR_CD_REQCOMP - 1, x, false);
            }           
        }
        else {
            if (igt != "") {
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").removeClass("btnGray");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").removeClass("btnGreen");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").addClass("btnOrange");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").addClass("btnReqComp_CD");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").removeClass("btnGray");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").removeClass("btnGreen");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").addClass("btnOrange");
                GridCD.SetBackground(SPR_CD_REQCOMP - 1, x, "orange");
                GridCD.SetEnable(SPR_CD_REQCOMP - 1, x, true);
            }
            else {             
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").removeClass("btnOrange");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").removeClass("btnGreen");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").addClass("btnGray");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ")").removeClass("btnReqComp_CD");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").removeClass("btnOrange");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").removeClass("btnGreen");
                //crnwTable.find("tr:eq(" + x + ")").find("td:eq(" + SPR_CD_REQCOMP + ") button").addClass("btnGray");
                GridCD.SetBackground(SPR_CD_REQCOMP - 1, x, "gray");
                GridCD.SetEnable(SPR_CD_REQCOMP - 1, x, false);
            }          
        }      
    }
    

    if (nwDocno != '') {
        $("#btnSaveCD").enable(false);
        $("#btnTaxConvert").enable(false);
        $("#btnResetTax").enable(false);
        $("#nwGridChargeDtlsCon").enable(false);
        $("#btnApplyAdvDM").enable(true);
    }
    if (hasRefDocno && isAllowTax == 0) {
        $("#btnTaxConvert").enable(false);
        $("#btnResetTax").enable(false);        
        $("#btnReloadTaxes").enable(false);
        $("#nwGridChargeDtlsCon .nwgrid_Delete").enable(false);
        $("#nwGridChargeDtlsCon .nwgrid_Insert").enable(false);
        $("#nwGridChargeDtlsCon .nwgrid_CopyRow").enable(false);
        $("#nwGridChargeDtlsCon .nwgrid_SaveWidth").enable(false);
        $("#nwGridChargeDtlsCon .nwgrid_ResetWidth").enable(false);
    }        
    else {
        $("#btnResetTax").enable(true);
    }
   
    GridCD.RenderStatus = true;
    //GetAccountDescription();
}

function AllocProcDtlsConfig() {
    //crnwTable = $("#nwGridAllocProcessCon .tblGridBody");;
    //var len = crnwTable.find('tr').length;
    var refRowno = $("#txtRefRowno_AP").val();
    var hasJson = HasJsonTempAllocProc(tmpDocno, (refRowno)) >= 0 ? true : false

    let loctag = $("#txtLocTag_AP").val();
    let pctag = $("#txtPCTag_AP").val();
    let cctag = $("#txtCCTag_AP").val();
    let allocEqual = $("#txtAllocEqual_AP").val();
    let allocPercent = $("#txtAllocPercent_AP").val();
    $("#btnDownloadTemplate_AP").addClass("btnBlue");
    $("#btnUploadTemplate_AP").addClass("btnOrange");

    var GridAP = nwGridAllocProcessCon_Book.ActiveSheet;
    var GridBC = nwGridBdgtChargingCon_Book.ActiveSheet;
    GridAP.RenderStatus = false;
    var len = GridAP.GetMaxRow();

    for (var x = 0; x <= len - 1; x++) {
        if (allocEqual == "1") {
            GridAP.SetEnable(SPR_AP_PERCENTAGE - 1, x, false);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_PERCENTAGE + ') input').enable(false);
        }
        else {
            GridAP.SetEnable(SPR_AP_PERCENTAGE - 1, x, true);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_PERCENTAGE + ') input').enable(true);
        }

        let aptag = GridAP.GetValue(SPR_AP_TAG - 1, x);
        //if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_TAG + ')').text() == "0" || crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_TAG + ')').text() == "")
        if (aptag == "0" || aptag == "")
        {
            if (hasJson == false) {
                //For Dynamic Default Location in SEGMENT
                defaultLocCode = $("#idvallugLocAcctForms").val();
                defaultLocDesc = $("#txtLocDesc").val();
                
                GridAP.SetText(SPR_AP_SEG2 - 1, x, GridBC.GetValue(SPR_BCD_SEG2CODE - 1, _rowBCD));
                GridAP.SetText(SPR_AP_SEG2DESC - 1, x, GridBC.GetValue(SPR_BCD_SEG2DESC - 1, _rowBCD));
                GridAP.SetEnable(SPR_AP_SEG2 - 1, x, false);

                GridAP.SetText(SPR_AP_SEG3 - 1, x, GridBC.GetValue(SPR_BCD_SEG3CODE - 1, _rowBCD));
                GridAP.SetText(SPR_AP_SEG3DESC - 1, x, GridBC.GetValue(SPR_BCD_SEG3DESC - 1, _rowBCD));
                GridAP.SetEnable(SPR_AP_SEG3 - 1, x, false);

                GridAP.SetText(SPR_AP_SEG4 - 1, x, GridBC.GetValue(SPR_BCD_SEG4CODE - 1, _rowBCD));
                GridAP.SetText(SPR_AP_SEG4DESC - 1, x, GridBC.GetValue(SPR_BCD_SEG4DESC - 1, _rowBCD));
                GridAP.SetEnable(SPR_AP_SEG4 - 1, x, false);

                GridAP.SetText(SPR_AP_SEG5 - 1, x, GridBC.GetValue(SPR_BCD_SEG5CODE - 1, _rowBCD));
                GridAP.SetText(SPR_AP_SEG5DESC - 1, x, GridBC.GetValue(SPR_BCD_SEG5DESC - 1, _rowBCD));
                GridAP.SetEnable(SPR_AP_SEG5 - 1, x, false);

                GridAP.SetText(SPR_AP_SEG6 - 1, x, GridBC.GetValue(SPR_BCD_SEG6CODE - 1, _rowBCD));
                GridAP.SetText(SPR_AP_SEG6DESC - 1, x, GridBC.GetValue(SPR_BCD_SEG6DESC - 1, _rowBCD));
                GridAP.SetEnable(SPR_AP_SEG6 - 1, x, false);

                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG2 + ')').text(getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG2CODE, _rowBCD.index()));
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG2DESC + ')').text(getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG2DESC, _rowBCD.index()));
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG2 + ')').enable(false);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG3 + ')').text(getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG3CODE, _rowBCD.index()));
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG3DESC + ')').text(getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG3DESC, _rowBCD.index()));
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG3 + ')').enable(false);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG4 + ')').text(getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG4CODE, _rowBCD.index()));
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG4DESC + ')').text(getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG4DESC, _rowBCD.index()));
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG4 + ')').enable(false);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG5 + ')').text(getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG5CODE, _rowBCD.index()));
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG5DESC + ')').text(getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG5DESC, _rowBCD.index()));
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG5 + ')').enable(false);
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG6 + ')').text(getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG6CODE, _rowBCD.index()));
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG6DESC + ')').text(getDataOfGrid('nwGridBdgtCharging', '', SPR_BCD_SEG6DESC, _rowBCD.index()));
                //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG6 + ')').enable(false);
            
                switch (defaultCCSegCode) {
                    case "02":
                        if (pctag == "1" || cctag == "1") {
                            GridAP.SetText(SPR_AP_SEG2 - 1, x, "");
                            GridAP.SetText(SPR_AP_SEG2DESC - 1, x, "");
                            GridAP.SetEnable(SPR_AP_SEG2 - 1, x, true);
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG2 + ')').text("");
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG2DESC + ')').text("");
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG2 + ')').enable(true);
                        }                    
                        break;

                    case "03":
                        if (pctag == "1" || cctag == "1") {
                            GridAP.SetText(SPR_AP_SEG3 - 1, x, "");
                            GridAP.SetText(SPR_AP_SEG3DESC - 1, x, "");
                            GridAP.SetEnable(SPR_AP_SEG3 - 1, x, true);
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG3 + ')').text("");
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG3DESC + ')').text("");
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG3 + ')').enable(true);
                        }                       
                        break;

                    case "04":
                        if (pctag == "1" || cctag == "1") {
                            GridAP.SetText(SPR_AP_SEG4 - 1, x, "");
                            GridAP.SetText(SPR_AP_SEG4DESC - 1, x, "");
                            GridAP.SetEnable(SPR_AP_SEG4 - 1, x, true);
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG4 + ')').text("");
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG4DESC + ')').text("");
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG4 + ')').enable(true);
                        }
                        break;

                    case "05":
                        if (pctag == "1" || cctag == "1") {
                            GridAP.SetText(SPR_AP_SEG5 - 1, x, "");
                            GridAP.SetText(SPR_AP_SEG5DESC - 1, x, "");
                            GridAP.SetEnable(SPR_AP_SEG5 - 1, x, true);
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG5 + ')').text("");
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG5DESC + ')').text("");
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG5 + ')').enable(true);
                        } 
                        break;

                    case "06":
                        if (pctag == "1" || cctag == "1") {
                            GridAP.SetText(SPR_AP_SEG6 - 1, x, "");
                            GridAP.SetText(SPR_AP_SEG6DESC - 1, x, "");
                            GridAP.SetEnable(SPR_AP_SEG6 - 1, x, true);
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG6 + ')').text("");
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG6DESC + ')').text("");
                            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG6 + ')').enable(true);
                        }                        
                        break;
                }
            }            
        }
        //else if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_TAG + ')').text() == "1") {
        else if (aptag == "1") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG2 + ')').enable(false);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG3 + ')').enable(false);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG4 + ')').enable(false);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG5 + ')').enable(false);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG6 + ')').enable(false);
            GridAP.SetEnable(SPR_AP_SEG2 - 1, x, false);
            GridAP.SetEnable(SPR_AP_SEG3 - 1, x, false);
            GridAP.SetEnable(SPR_AP_SEG4 - 1, x, false);
            GridAP.SetEnable(SPR_AP_SEG5 - 1, x, false);
            GridAP.SetEnable(SPR_AP_SEG6 - 1, x, false);
            switch (ccflag) {
                case "02":
                    if (cctag == "1") {
                        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG2 + ')').enable(true);
                        GridAP.SetEnable(SPR_AP_SEG2 - 1, x, true);
                    }
                    break;
                case "03":
                    if (cctag == "1") {
                        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG3 + ')').enable(true);
                        GridAP.SetEnable(SPR_AP_SEG3 - 1, x, true);
                    }
                    break;
                case "04":
                    if (cctag == "1") {
                        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG4 + ')').enable(true);
                        GridAP.SetEnable(SPR_AP_SEG4 - 1, x, true);
                    }
                    break;
                case "05":
                    if (cctag == "1") {
                        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG5 + ')').enable(true);
                        GridAP.SetEnable(SPR_AP_SEG5 - 1, x, true);
                    }
                    break;
                case "06":
                    if (cctag == "1") {
                        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG6 + ')').enable(true);
                        GridAP.SetEnable(SPR_AP_SEG6 - 1, x, true);
                    }
                    break;
            }
            switch (pcflag) {
                case "02":
                    if (pctag == "1") {
                        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG2 + ')').enable(true);
                        GridAP.SetEnable(SPR_AP_SEG2 - 1, x, true);
                    }
                    break;
                case "03":
                    if (pctag == "1") {
                        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG3 + ')').enable(true);
                        GridAP.SetEnable(SPR_AP_SEG3 - 1, x, true);
                    }
                    break;
                case "04":
                    if (pctag == "1") {
                        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG4 + ')').enable(true);
                        GridAP.SetEnable(SPR_AP_SEG4 - 1, x, true);
                    }
                    break;
                case "05":
                    if (pctag == "1") {
                        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG5 + ')').enable(true);
                        GridAP.SetEnable(SPR_AP_SEG5 - 1, x, true);
                    }
                    break;
                case "06":
                    if (pctag == "1") {
                        //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_AP_SEG6 + ')').enable(true);
                        GridAP.SetEnable(SPR_AP_SEG6 - 1, x, true);
                    }
                    break;
            }      
        }       
    }

}

$(document).on("click", "#btnProceed", function (e) {
    var type = $("#cmbPaymentRqstTyp").val();
    var error = "";

    if (type == "") {
        error = "Cannot proceed. Please select Payment Request Type.\n";
    }

    if (error != "") {
        MessageBox(error, Title);
        return;
    }
    else if (type == "1") {
        OpenGenPRF();
    }
    else if (type == "2") {
        nwPopupForm_HideModal("nwRequestType");
        OpenDiretPRF();       
    }
});

$(document).on("click", "#btnAlterPayee", function (e) {
    //$(".BoxClose").show();
    nwPopupForm_ShowModal("AlterPayee");
    $("#txtOrigCheckPayeeName").val($("#txtCheckPayeeName").val());
    $("#txtAlterCheckPayeeName").val($("#txtAlterPayeeName").val());
    $("#txtRemarks_AP").val($("#txtRemarks_Alt").val());
    $('#btnRvwAttach_AP').addClass("btn-default");
    var ratag_ap = $("#txtRATag_Alt").val();
    if (ratag_ap == "True") {
        //$('#btnRvwAttach_AP').removeClass("btnBlue");
        $('#btnRvwAttach_AP').addClass("btn-default-green");

    }
    else {
        //$('#btnRvwAttach_AP').removeClass("btnGreen");
        //$('#btnRvwAttach_AP').addClass("btnBlue");    
        $('#btnRvwAttach_AP').addClass("btn-default-blue");
    }
});

function ReqSLSA(sl, sa) {
    var Grid = nwGridChargeDtlsCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var col = Grid.CellSelected.col - 1;
    if (sl == "1") {
        Grid.SetEnable(SPR_CD_SLTYPECODE - 1, row, true);
        Grid.SetEnable(SPR_CD_SLTYPEDESC - 1, row, true);
        Grid.SetEnable(SPR_CD_REFTYPECODE - 1, row, true);
        Grid.SetEnable(SPR_CD_REFTYPEDESC - 1, row, true);
        Grid.SetText(SPR_CD_SLTYPECODE - 1, row, "");
        Grid.SetText(SPR_CD_SLTYPEDESC - 1, row, "");
        Grid.SetText(SPR_CD_REFTYPECODE - 1, row, "");
        Grid.SetText(SPR_CD_REFTYPEDESC - 1, row, "");
        //crnwTR.find("td:eq(" + SPR_CD_SLTYPECODE + ")").enable(true);
        //crnwTR.find("td:eq(" + SPR_CD_SLTYPEDESC + ")").enable(true);
        //crnwTR.find("td:eq(" + SPR_CD_REFTYPECODE + ")").enable(true);
        //crnwTR.find("td:eq(" + SPR_CD_REFTYPEDESC + ")").enable(true);
        //crnwTR.find("td:eq(" + SPR_CD_SLTYPECODE + ")").text("");
        //crnwTR.find("td:eq(" + SPR_CD_SLTYPEDESC + ")").text("");
        //crnwTR.find("td:eq(" + SPR_CD_REFTYPECODE + ")").text("");
        //crnwTR.find("td:eq(" + SPR_CD_REFTYPEDESC + ")").text("");
    }
    else {
        Grid.SetEnable(SPR_CD_SLTYPECODE - 1, row, false);
        Grid.SetEnable(SPR_CD_SLTYPEDESC - 1, row, false);
        Grid.SetEnable(SPR_CD_REFTYPECODE - 1, row, false);
        Grid.SetEnable(SPR_CD_REFTYPEDESC - 1, row, false);
        Grid.SetText(SPR_CD_SLTYPECODE - 1, row, "");
        Grid.SetText(SPR_CD_SLTYPEDESC - 1, row, "");
        Grid.SetText(SPR_CD_REFTYPECODE - 1, row, "");
        Grid.SetText(SPR_CD_REFTYPEDESC - 1, row, "");
        //crnwTR.find("td:eq(" + SPR_CD_SLTYPECODE + ")").enable(false);
        //crnwTR.find("td:eq(" + SPR_CD_SLTYPEDESC + ")").enable(false);
        //crnwTR.find("td:eq(" + SPR_CD_REFTYPECODE + ")").enable(false);
        //crnwTR.find("td:eq(" + SPR_CD_REFTYPEDESC + ")").enable(false);
        //crnwTR.find("td:eq(" + SPR_CD_SLTYPECODE + ")").text("");
        //crnwTR.find("td:eq(" + SPR_CD_SLTYPEDESC + ")").text("");
        //crnwTR.find("td:eq(" + SPR_CD_REFTYPECODE + ")").text("");
        //crnwTR.find("td:eq(" + SPR_CD_REFTYPEDESC + ")").text("");
    }
    if (sa == "1") {
        //crnwTR.find("td:eq(" + SPR_CD_BANKACCT + ")").enable(true);
        //crnwTR.find("td:eq(" + SPR_CD_BANKACCT + ")").text("");
        Grid.SetEnable(SPR_CD_BANKACCT - 1, row, true);
        Grid.SetText(SPR_CD_BANKACCT - 1, row, "");
    }
    else {
        Grid.SetEnable(SPR_CD_BANKACCT - 1, row, false);
        Grid.SetText(SPR_CD_BANKACCT - 1, row, "");
        //crnwTR.find("td:eq(" + SPR_CD_BANKACCT + ")").enable(false);
        //crnwTR.find("td:eq(" + SPR_CD_BANKACCT + ")").text("");
    }
}

//function ReqAllocationProc(ap) {
//    if (ap == "1") {
//        crnwTR.find("td:eq(" + SPR_CD_ALLOCPROCESS + ")").enable(true);
//        crnwTR.find("td:eq(" + SPR_CD_ALLOCPROCESS + ")").addClass("btnAllocProc");

//    }
//    else {
//        crnwTR.find("td:eq(" + SPR_CD_ALLOCPROCESS + ")").enable(false);
//        crnwTR.find("td:eq(" + SPR_CD_ALLOCPROCESS + ")").removeClass("btnAllocProc");
//    }
//}


function GetAccountDescription() {
    var Grid = nwGridChargeDtlsCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var col = Grid.CellSelected.col - 1;

    //var seg1 = crnwTR.find('td:eq(' + SPR_CD_SEG1DESC + ')').text();
    //var seg2 = crnwTR.find('td:eq(' + SPR_CD_SEG2DESC + ')').text();
    //var seg3 = crnwTR.find('td:eq(' + SPR_CD_SEG3DESC + ')').text();
    //var seg4 = crnwTR.find('td:eq(' + SPR_CD_SEG4DESC + ')').text();
    //var seg5 = crnwTR.find('td:eq(' + SPR_CD_SEG5DESC + ')').text();
    //var seg6 = crnwTR.find('td:eq(' + SPR_CD_SEG6DESC + ')').text();
    var seg1 = Grid.GetValue(SPR_CD_SEG1DESC - 1, row);
    var seg2 = Grid.GetValue(SPR_CD_SEG2DESC - 1, row);
    var seg3 = Grid.GetValue(SPR_CD_SEG3DESC - 1, row);
    var seg4 = Grid.GetValue(SPR_CD_SEG4DESC - 1, row);
    var seg5 = Grid.GetValue(SPR_CD_SEG5DESC - 1, row);
    var seg6 = Grid.GetValue(SPR_CD_SEG6DESC - 1, row);
    var descText = "";

    if (seg1 != "") {
        descText += seg1;
    }
    if (seg2 != "") {
        descText += "-" + seg2;
    }
    if (seg3 != "") {
        descText += "-" + seg3;
    }
    if (seg4 != "") {
        descText += "-" + seg4;
    }
    if (seg5 != "") {
        descText += "-" + seg5;
    }
    if (seg6 != "") {
        descText += "-" + seg6;
    }

    //crnwTR.find('td:eq(' + SPR_CD_ACCTDESC + ')').text(descText);
    Grid.SetText(SPR_CD_ACCTDESC - 1, row, descText);
}

function GetAccountDescriptionTbl() {
    crnwTable = $("#nwGridMain .tblGridBody");;
    var len = crnwTable.find('tr').length;

    for (var x = 0; x <= len - 1; x++) {
        if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_LINETYPE + ')  select').val() == "0")
            continue;

        var Seg1 = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REF1 + ')').text();
        var Seg2 = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REF2 + ')').text();
        var Seg3 = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REF3 + ')').text();
        var Seg4 = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REF4 + ')').text();
        var Seg5 = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REF5 + ')').text();
        var Seg6 = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REF6 + ')').text();
        var descText = "";

        if (Seg1 != "") {
            descText += Seg1;
        }
        if (Seg2 != "") {
            descText += "-" + Seg2;
        }
        if (Seg3 != "") {
            descText += "-" + Seg3;
        }
        if (Seg4 != "") {
            descText += "-" + Seg4;
        }
        if (Seg5 != "") {
            descText += "-" + Seg5;
        }
        if (Seg6 != "") {
            descText += "-" + Seg6;
        }
        crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ACCNTDESC + ')').text(descText);
    }

}

$(document).on("click", "#chkAltPayee", function (e) {
    //if ($(this).is(":checked")) {
    //    $("#btnAlterPayee").enable(true);
    //    $("#btnAlterPayee").removeClass("btnGray");
    //    $("#btnAlterPayee").addClass("btnBlue");
    //}
    //else {
    //    $("#btnAlterPayee").enable(false);
    //    $("#btnAlterPayee").removeClass("btnBlue");
    //    $("#btnAlterPayee").addClass("btnGray");
    //}
});

$(document).on('click', '.btnDeleteRow_AP', function () {
    $('.nwgrid_Delete').click();
})

//$(document).on('click', '.btnAllocProc', function () {
//    $(".BoxClose").show();
//    //$('#dimbgNWnwBdgtCheckingWindow').addClass("zindexHigh"); $("#dimbgNWnwBdgtCheckingWindow").hide();
//    nwPopupForm_ShowModal("AllocProcess");   
//    $('#AllocProcess').addClass("zindexHigh");

//    $("#lblSegment1").text(seg1Desc);
//    $("#idvallugSegment1").val(crnwTR.find("td:eq(" + SPR_BCD_SEG1CODE + ")").text());
//    $("#descvallugSegment1").val(crnwTR.find("td:eq(" + SPR_BCD_SEG1DESC + ")").text());
//    $("#txtTotalQty").val(crnwTR.find("td:eq(" + SPR_BCD_QTY + ")").text());
//    $("#txtTotalAmount").val(crnwTR.find("td:eq(" + SPR_BCD_AMTVATEX + ")").text());
//    $("#txtLineID_AP").val($("#txtLineID_CD").val());
//    $("#txtRefRowno_AP").val(crnwTR.index() + 1);
//    $("#txtLocTag_AP").val(crnwTR.find("td:eq(" + SPR_BCD_REQLOC + ")").text());
//    $("#txtPCTag_AP").val(crnwTR.find("td:eq(" + SPR_BCD_REQPC + ")").text());
//    $("#txtCCTag_AP").val(crnwTR.find("td:eq(" + SPR_BCD_REQCC + ")").text());
//    $("#txtAllocEqual_AP").val(crnwTR.find("td:eq(" + SPR_BCD_ALLOCEQUAL + ")").text());
//    $("#txtAllocPercent_AP").val(crnwTR.find("td:eq(" + SPR_BCD_ALLOCPERCENT + ")").text());

//    _rowBCD = crnwTR;

//    nwLoading_Start("xbtnAllocProc", crLoadingHTML);
//    nwParameter_Add("jsonAllocProc", JSON.stringify(jsonAllocProc));
//    nwParameter_Add("hasJson", HasJsonTempAllocProc(tmpDocno, (crnwTR.index() + 1)) >= 0 ? true : false);
//    nwParameter_Add("jsonAllocProc", JSON.stringify(jsonAllocProc.filter(i =>(i.docno + i.refRowno) == tmpDocno + (crnwTR.index() + 1))));
//    nwParameter_Add("isNewData", isNewData);
//    nwParameter_Add("txtDocno", $("#txtDocno").val());
//    nwParameter_Add("lineID", crnwTR.find("td:eq(" + SPR_BCD_LINEID + ")").text());
//    nwParameter_Add("refRowno", crnwTR.find("td:eq(" + SPR_BCD_ROWNO + ")").text());

//    func_ActionDriven("actAllocProc", false);
//})

function btnAllocProc() {
    //$(".BoxClose").show();
    //$('#dimbgNWnwBdgtCheckingWindow').addClass("zindexHigh"); $("#dimbgNWnwBdgtCheckingWindow").hide();
    nwPopupForm_ShowModal("AllocProcess");   
    var GridBC = nwGridBdgtChargingCon_Book.ActiveSheet;
    var row = GridBC.CellSelected.row - 1;
    //$('#AllocProcess').addClass("zindexHigh");

    $("#lblSegment1").text(seg1Desc);
    //$("#idvallugSegment1").val(crnwTR.find("td:eq(" + SPR_BCD_SEG1CODE + ")").text());
    //$("#descvallugSegment1").val(crnwTR.find("td:eq(" + SPR_BCD_SEG1DESC + ")").text());
    //$("#txtTotalQty").val(crnwTR.find("td:eq(" + SPR_BCD_QTY + ")").text());
    //$("#txtTotalAmount").val(crnwTR.find("td:eq(" + SPR_BCD_AMTVATEX + ")").text());
    $("#idvallugSegment1").val(GridBC.GetValue(SPR_BCD_SEG1CODE - 1, row));
    $("#descvallugSegment1").val(GridBC.GetValue(SPR_BCD_SEG1DESC - 1, row));
    $("#txtTotalQty").val(GridBC.GetValue(SPR_BCD_QTY - 1, row));
    $("#txtTotalAmount").val(GridBC.GetValue(SPR_BCD_AMTVATEX - 1, row));
    $("#txtRefRowno_AP").val(row + 1);
    $("#txtLocTag_AP").val(GridBC.GetValue(SPR_BCD_REQLOC - 1, row));
    $("#txtPCTag_AP").val(GridBC.GetValue(SPR_BCD_REQPC - 1, row));
    $("#txtCCTag_AP").val(GridBC.GetValue(SPR_BCD_REQCC - 1, row));
    $("#txtAllocEqual_AP").val(GridBC.GetValue(SPR_BCD_ALLOCEQUAL - 1, row));
    $("#txtAllocPercent_AP").val(GridBC.GetValue(SPR_BCD_ALLOCPERCENT - 1, row));
    $("#txtLineID_AP").val($("#txtLineID_CD").val());
    //$("#txtRefRowno_AP").val(crnwTR.index() + 1);
    //$("#txtLocTag_AP").val(crnwTR.find("td:eq(" + SPR_BCD_REQLOC + ")").text());
    //$("#txtPCTag_AP").val(crnwTR.find("td:eq(" + SPR_BCD_REQPC + ")").text());
    //$("#txtCCTag_AP").val(crnwTR.find("td:eq(" + SPR_BCD_REQCC + ")").text());
    //$("#txtAllocEqual_AP").val(crnwTR.find("td:eq(" + SPR_BCD_ALLOCEQUAL + ")").text());
    //$("#txtAllocPercent_AP").val(crnwTR.find("td:eq(" + SPR_BCD_ALLOCPERCENT + ")").text());

    //_rowBCD = crnwTR;
    _rowBCD = row;

    nwLoading_Start("xbtnAllocProc", crLoadingHTML);
    nwParameter_Add("jsonAllocProc", JSON.stringify(jsonAllocProc));
    nwParameter_Add("hasJson", HasJsonTempAllocProc(tmpDocno, (crnwTR.index() + 1)) >= 0 ? true : false);
    nwParameter_Add("jsonAllocProc", JSON.stringify(jsonAllocProc.filter(i =>(i.docno + i.refRowno) == tmpDocno + (crnwTR.index() + 1))));
    nwParameter_Add("isNewData", isNewData);
    nwParameter_Add("txtDocno", $("#txtDocno").val());
    //nwParameter_Add("lineID", crnwTR.find("td:eq(" + SPR_BCD_LINEID + ")").text());
    //nwParameter_Add("refRowno", crnwTR.find("td:eq(" + SPR_BCD_ROWNO + ")").text());
    nwParameter_Add("lineID", GridBC.GetValue(SPR_BCD_LINEID - 1, row));
    nwParameter_Add("refRowno", GridBC.GetValue(SPR_BCD_ROWNO - 1, row));

    func_ActionDriven("actAllocProc", false);
}

function AllocationProcessProp(igtCode, itemCode, seg1, seg2, seg3, seg4, seg5, seg6, row) {
    nwParameter_Add("igtCode", igtCode);
    nwParameter_Add("itemCode", itemCode);
    nwParameter_Add("seg1", seg1);
    nwParameter_Add("seg2", seg2);
    nwParameter_Add("seg3", seg3);
    nwParameter_Add("seg4", seg4);
    nwParameter_Add("seg5", seg5);
    nwParameter_Add("seg6", seg6);
    nwParameter_Add("currRow", row);
    func_ActionDriven("actAllocDtls", false);
}

$(document).on("click", "#btnSave_AP", function (e) {
    msgBoxContainerQuestion = "btnSave_AP";
    parent_MessageBoxQuestion("Do you want to save the transaction/s?", "Allocation Process Window", "Question");

    return true;
});

function HasJsonTempAllocProc(docno, refRowno) {
    return jsonAllocProc.findIndex(i => (i.docno + i.refRowno) == docno + refRowno)
}

function FilterJsonAllocProc(docno, refRowno) {
    return jsonAllocProc.filter(i => (i.docno + i.refRowno) != docno + refRowno)
}

function SaveJsonAllocProc(docno, refRowno) {
    //Filter Data
    jsonAllocProc = FilterJsonAllocProc(docno, refRowno);

    for (var i = 0; i < jsonAllocProcFiltered.length; i++) {
        var Store = {};

        Store["docno"] = jsonAllocProcFiltered[i].docno;
        Store["refRowno"] = jsonAllocProcFiltered[i].refRowno;
        Store["lineID"] = jsonAllocProcFiltered[i].lineID;
        Store["rowno"] = jsonAllocProcFiltered[i].rowno;
        Store["main"] = jsonAllocProcFiltered[i].main;
        Store["seg2"] = jsonAllocProcFiltered[i].seg2;
        Store["seg2Desc"] = jsonAllocProcFiltered[i].seg2Desc;
        Store["seg3"] = jsonAllocProcFiltered[i].seg3;
        Store["seg3Desc"] = jsonAllocProcFiltered[i].seg3Desc;
        Store["seg4"] = jsonAllocProcFiltered[i].seg4;
        Store["seg4Desc"] = jsonAllocProcFiltered[i].seg4Desc;
        Store["seg5"] = jsonAllocProcFiltered[i].seg5;
        Store["seg5Desc"] = jsonAllocProcFiltered[i].seg5Desc;
        Store["seg6"] = jsonAllocProcFiltered[i].seg6;
        Store["seg6Desc"] = jsonAllocProcFiltered[i].seg6Desc;
        Store["qty"] = jsonAllocProcFiltered[i].qty;
        Store["amountVATEX"] = jsonAllocProcFiltered[i].amountVATEX;
        Store["percentage"] = jsonAllocProcFiltered[i].percentage;
        Store["allocTag"] = jsonAllocProcFiltered[i].allocTag;
        Store["delete"] = jsonAllocProcFiltered[i].delete;
       
        jsonAllocProc.push(Store);
    }
}

function setAllocProcProperties(row) {
    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;
    var GridBC = nwGridChargeDtlsCon_Book.ActiveSheet;
    GridCD.SetText(SPR_CD_ALLOCTAG - 1, row, "1");
    GridBC.SetBackground(SPR_BCD_ALLOCDTLS - 1, row, "green");
    //$("#nwGridChargeDtlsCon tbody tr:eq(" + row + ") td:eq(" + SPR_CD_ALLOCTAG + ")").text("1");
    //$("#nwGridBdgtChargingCon tbody tr:eq(" + row + ") td:eq(" + SPR_BCD_ALLOCDTLS + ")").removeClass("btnBlue");
    //$("#nwGridBdgtChargingCon tbody tr:eq(" + row + ") td:eq(" + SPR_BCD_ALLOCDTLS + ")").removeClass("btnGray");
    //$("#nwGridBdgtChargingCon tbody tr:eq(" + row + ") td:eq(" + SPR_BCD_ALLOCDTLS + ")").addClass("btnGreen");
}

function HasJsonTempRecurDtls(docno, refRowno) {
    return jsonRecurDtls.findIndex(i => (i.docno + i.lineID) == docno + refRowno)
}

function FilterJsonRecurDtls(docno, refRowno) {
    return jsonRecurDtls.filter(i => (i.docno + i.lineID) != docno + refRowno)
}

function SaveJsonRecurDtls(docno, refRowno) {
    //Filter Data
    jsonRecurDtls = FilterJsonRecurDtls(docno, refRowno);

    for (var i = 0; i < jsonRecurDtlsFiltered.length; i++) {
        var Store = {};

        Store["docno"] = jsonRecurDtlsFiltered[i].docno;
        Store["lineID"] = jsonRecurDtlsFiltered[i].lineID;
        Store["refDocno"] = jsonRecurDtlsFiltered[i].refDocno;
        Store["refDocdate"] = jsonRecurDtlsFiltered[i].refDocdate;
        Store["refno"] = jsonRecurDtlsFiltered[i].refno;
        Store["refdate"] = jsonRecurDtlsFiltered[i].refdate;
        Store["drno"] = jsonRecurDtlsFiltered[i].drno;
        Store["drdate"] = jsonRecurDtlsFiltered[i].drdate;
        Store["payTermCode"] = jsonRecurDtlsFiltered[i].payTermCode;
        Store["payTermDesc"] = jsonRecurDtlsFiltered[i].payTermDesc;
        Store["counterDate"] = jsonRecurDtlsFiltered[i].counterDate;
        Store["dueDate"] = jsonRecurDtlsFiltered[i].dueDate;
        Store["allowRecur"] = jsonRecurDtlsFiltered[i].allowRecur;
        Store["nextRecurDate"] = jsonRecurDtlsFiltered[i].nextRecurDate;
        Store["remNoOfMonths"] = jsonRecurDtlsFiltered[i].remNoOfMonths;
        Store["EndOfRecurDate"] = jsonRecurDtlsFiltered[i].EndOfRecurDate;

        jsonRecurDtls.push(Store);
    }
}

function setRecurDtlsProperties(row) {
    var Grid = nwGridCon_Book.ActiveSheet;
    Grid.SetBackground(SPR_RECURRING - 1, row, "green");
    Grid.SetText(SPR_RDTAG - 1, row, "1");
    Grid.SetText(SPR_PDTAG - 1, row, "0");
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_RECURRING + ")").removeClass("btnBlue");
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_RECURRING + ")").addClass("btnGreen");
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_RDTAG + ")").text("1");
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_PDTAG + ")").text("0");
}

$(document).on('click', '#chkAllowRecur', function () {
    if ($("#chkAllowRecur").is(":checked")) {
        $("#txtNextRecur").prop("disabled", false);
        $("#txtNoRecur_RD").prop("disabled", false);
        $("#txtEndRecur_RD").prop("disabled", false);
        $("#txtNextRecur").val("");
        $("#txtNoRecur_RD").val("");
        $("#txtEndRecur_RD").val("");
    }
    else {
        $("#txtNextRecur").prop("disabled", true);
        $("#txtNoRecur_RD").prop("disabled", true);
        $("#txtEndRecur_RD").prop("disabled", true);
        $("#txtNextRecur").val("");
        $("#txtNoRecur_RD").val("");
        $("#txtEndRecur_RD").val("");
    }
});

var valueDateOld = '';
$(document).on("focus", "#txtNextRecur", function () {
    valueDateOld = $("#txtNextRecur").val();
});

$(document).on('click', '#txtNextRecur', function () {
    var nextRecurDate = $("#txtNextRecur").val();
    var counterDate = $("#txtCounterDate_RD").val();

    var xbool2 = nwDateMaskCheck($("#txtNextRecur").val());

    if (Date.parse(nextRecurDate) < Date.parse(counterDate)) {
        MessageBox("Cannot proceed. Next Recurrence Date should not be earlier than the Counter Date.\n", "Recurring Details", "error");
        $("#txtNextRecur").val(valueDateOld);
        return false;
    }

    if (xbool2 == false) {
        $("#txtNextRecur").val('');
        $("#txtNextRecur").focus();
    }
});

$(document).on('change', '#txtNoRecur_RD', function () {
    nwParameter_Add("txtNoRecur_RD", $("#txtNoRecur_RD").val());
    nwParameter_Add("txtNextRecur", $("#txtNextRecur").val());
    func_ActionDriven("actComputeEndRecur", false);
});

var EndRecurOld = '';
$(document).on("focus", "#txtEndRecur_RD", function () {
    EndRecurOld = $("#txtEndRecur_RD").val();
});
$(document).on('change', '#txtEndRecur_RD', function () {
    var nextRecurDate = $("#txtNextRecur").val();
    var endRecurDate = $("#txtEndRecur_RD").val();
   
    var xbool2 = nwDateMaskCheck($("#txtEndRecur_RD").val());

    if (Date.parse(endRecurDate) < Date.parse(nextRecurDate)) {
        MessageBox("Cannot proceed. End of Recurrence Date should not be earlier than the Next Recurrence Date.\n", "Recurring Details", "error");
        $("#txtEndRecur_RD").val(EndRecurOld);
        return false;
    }
    else {
        nwParameter_Add("txtEndRecur_RD", $("#txtEndRecur_RD").val());
        nwParameter_Add("txtNextRecur", $("#txtNextRecur").val());
        func_ActionDriven("actComputeNoRecur", false);
    }

    if (xbool2 == false) {
        $("#txtEndRecur_RD").val('');
        $("#txtEndRecur_RD").focus();
    } 
});

//$(document).on("click", ".btnPcCcAlloc", function (e) {
//    $("#txtRefRowno_Def").val(crnwTR.index() + 1);
//    if (basisOfAmort == 'amort_schedule') {
//        let amortDate = getDataOfGrid('nwGridPrepayDef', 'input', SPR_DEF_AMORTDATE, crnwTR.index());
//        let amortAmt = getNumReplace(getDataOfGrid('nwGridPrepayDef', 'input', SPR_DEF_AMOUNT, crnwTR.index()));
//        $("#txtAmortAmt_Def").val(amortAmt);
      
//        let error = '';
      
//        if (amortDate == '') {
//            error += "Cannot proceed. Amortization Date is required.\n";
//        }
//        if (amortAmt == 0) {
//            error += "Cannot proceed. Amount is required.\n";
//        }
//        if (error != "") {
//            MessageBox(error, "Prepayment Details", "error");
//            return;
//        }
//    }
    
//    nwLoading_Start("xbtnPcCcAlloc", crLoadingHTML);
//    //$(".BoxClose").show();
//    nwPopupForm_ShowModal("nwPCCCAlloc");
//    cust_GetPara();
//    nwParameter_Add("basisOfAmort", basisOfAmort);
//    nwParameter_Add("lineID", $("#txtLineID_CD").val());
//    if (basisOfAmort == 'amort_schedule') {
//        //nwParameter_Add("lineID", getDataOfGrid('nwGridPrepayDef', '', SPR_DEF_LINEID, crnwTR.index()));
//        nwParameter_Add("refRowno", getDataOfGrid('nwGridPrepayDef', '', SPR_DEF_ROWNO, crnwTR.index()));
//    }
//    else {
//        //nwParameter_Add("lineID", getDataOfGrid('nwGridPrepayment', '', SPR_PREPAY_LINEID, crnwTR.index()));
//        nwParameter_Add("refRowno", getDataOfGrid('nwGridPrepayment', '', SPR_PREPAY_ROWNO, crnwTR.index()));
//    }
//    func_ActionDriven("actbtnPcCcAlloc", false);
//});

function btnPcCcAlloc() {    
    var GridPD = nwGridPrepayDefCon_Book.ActiveSheet;
    var GridPC = nwGridPrepaymentCon_Book.ActiveSheet;
    //var row = GridPD.CellSelected.row - 1;
    //$("#txtRefRowno_Def").val(crnwTR.index() + 1);
    $("#txtRefRowno_Def").val(prepay_row + 1);
  
    if (basisOfAmort == 'amort_schedule') {
        //let amortDate = getDataOfGrid('nwGridPrepayDef', 'input', SPR_DEF_AMORTDATE, crnwTR.index());
        //let amortAmt = getNumReplace(getDataOfGrid('nwGridPrepayDef', 'input', SPR_DEF_AMOUNT, crnwTR.index()));
        let amortDate = GridPD.GetValue(SPR_DEF_AMORTDATE - 1, prepay_row);
        let amortAmt = getNumReplace(GridPD.GetValue(SPR_DEF_AMOUNT - 1, prepay_row));
        $("#txtAmortAmt_Def").val(amortAmt);
      
        let error = '';
      
        if (amortDate == '') {
            error += "Cannot proceed. Amortization Date is required.\n";
        }
        if (amortAmt == 0) {
            error += "Cannot proceed. Amount is required.\n";
        }
        if (error != "") {
            MessageBox(error, "Prepayment Details", "error");
            return;
        }
    }
    
    nwLoading_Start("xbtnPcCcAlloc", crLoadingHTML);
    //$(".BoxClose").show();
    nwPopupForm_ShowModal("nwPCCCAlloc");
    cust_GetPara();
    nwParameter_Add("basisOfAmort", basisOfAmort);
    nwParameter_Add("lineID", $("#txtLineID_CD").val());
    if (basisOfAmort == 'amort_schedule') {
        //nwParameter_Add("lineID", getDataOfGrid('nwGridPrepayDef', '', SPR_DEF_LINEID, crnwTR.index()));
        //nwParameter_Add("refRowno", getDataOfGrid('nwGridPrepayDef', '', SPR_DEF_ROWNO, crnwTR.index()));
        nwParameter_Add("refRowno", GridPD.GetValue(SPR_DEF_ROWNO - 1, prepay_row));
    }
    else {
        //nwParameter_Add("lineID", getDataOfGrid('nwGridPrepayment', '', SPR_PREPAY_LINEID, crnwTR.index()));
        //nwParameter_Add("refRowno", getDataOfGrid('nwGridPrepayment', '', SPR_PREPAY_ROWNO, crnwTR.index()));
        nwParameter_Add("refRowno", GridPC.GetValue(SPR_PREPAY_ROWNO - 1, prepay_row));
    }
    func_ActionDriven("actbtnPcCcAlloc", false);
}

$(document).on("click", "#rdbAmortEqually_PD", function (e) {
    nwLoading_Start("xrdbAmortEqually_PD", crLoadingHTML);
    basisOfAmort = 'amort_equally';
    nwParameter_Add("txtDocno", $("#txtDocno").val());
    nwParameter_Add("lineID", lineID);
    func_ActionDriven("actAmortEqually", false);
});

$(document).on("click", "#rdbAmortSchd_PD", function (e) {
    nwLoading_Start("xrdbAmortSchd_PD", crLoadingHTML);
    basisOfAmort = 'amort_schedule';
    nwParameter_Add("txtDocno", $("#txtDocno").val());
    nwParameter_Add("lineID", lineID);
    func_ActionDriven("actAmortSched", false);
    $("#nwGridPrepaymentCon").hide();
});

$(document).on('click', '.btnPrepaymentDtls', function () {    
    var rdtag = crnwTR.find("td:eq(" + SPR_RDTAG + ")").text();
    var error = '';

    if (rdtag == "1") {
        msgBoxContainerQuestion = "PrepayQ";
        parent_MessageBoxQuestion("This will reset the Recurring Details. Do you want to continue?", Title, "Question");
    }
    else {
        nwLoading_Start("xbtnPrepaymentDtls", crLoadingHTML);
        PrepaymentFn();
    }

    if (nwDocno != "") {
        $("#btnSavePrepayment").enable(false);
    }
});

function PrepaymentFn() {
    $("#idvallugDocno_PD").val(crnwTR.find("td:eq(" + SPR_REFTRANNO + ")").text());
    $("#descvallugDocno_PD").val(crnwTR.find("td:eq(" + SPR_REFTRANDATE + ")").text());
    $("#idvallugRefNoSI_PD").val(crnwTR.find("td:eq(" + SPR_REFNO + ") input").val());
    $("#descvallugRefNoSI_PD").val(crnwTR.find("td:eq(" + SPR_REFDATE + ") input").val());
    $("#idvallugDRCOCNo_PD").val(crnwTR.find("td:eq(" + SPR_DRNO + ") input").val());
    $("#descvallugDRCOCNo_PD").val(crnwTR.find("td:eq(" + SPR_DRDATE + ") input").val());
    $("#idvallugPaymentTerm_PD").val(crnwTR.find("td:eq(" + SPR_PAYMENTTERMCODE + ")").text());
    $("#descvallugPaymentTerm_PD").val(crnwTR.find("td:eq(" + SPR_PAYMENTTERMDESC + ")").text());
    $("#txtCounterDate_PD").val(crnwTR.find("td:eq(" + SPR_COUNTERDATE + ") input").val());
    $("#txtDueDate_PD").val(crnwTR.find("td:eq(" + SPR_DUEDATE + ") input").val());
    $("#rdbAmortEqually_PD").prop("checked", true);
    $("#txtRowno_PD").val(crnwTR.index());
    tmpDocno = $("#txtRecuser").val() + $.now().toString();
    currRow = crnwTR.index();
    lineID = crnwTR.find("td:eq(" + SPR_LINEID + ")").text();
    basisOfAmort = 'amort_equally';

    if (crnwTR.find("td:eq(" + SPR_TMPID + ")").text() == "") {
        crnwTR.find("td:eq(" + SPR_TMPID + ")").text(tmpDocno);
    }
    //$(".BoxClose").show();
    nwPopupForm_ShowModal("PrepaymentDtls");
    cust_GetPara();
    nwParameter_Add("lineID", lineID);
    func_ActionDriven("actbtnPrepaymentDtls", false);
}

$(document).on('click', '.btnHoldingHst', function () {   
    //$(".BoxClose").show();
    nwPopupForm_ShowModal("HoldingHst");
    func_ActionDriven("actbtnHoldingHst", false);
});



var startAmortDateOld = '';
function dtpStartAmort_focus() {
    var GridPD = nwGridPrepaymentCon_Book.ActiveSheet;
    var row = GridPD.CellSelected.row - 1;
    startAmortDateOld = GridPD.GetValue(SPR_STARTAMORT - 1, row);
}

function dtpStartAmort() {
    var GridPD = nwGridPrepaymentCon_Book.ActiveSheet;
    var row = GridPD.CellSelected.row - 1;
    //var startAmortDate = crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").val();
    var startAmortDate = GridPD.GetValue(SPR_STARTAMORT - 1, row);
    var counterDate = $("#txtCounterDate_PD").val();

    var xbool2 = nwDateMaskCheck(GridPD.GetValue(SPR_STARTAMORT - 1, row));

    if (Date.parse(startAmortDate) < Date.parse(counterDate)) {
        MessageBox("Cannot proceed. Start of Amortization Date should not be earlier than the Counter Date.\n", "Prepayment Details", "error");
        //crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").val(startAmortDateOld);
        GridPD.SetText(SPR_STARTAMORT - 1, row, startAmortDateOld);
        return false;
    }

    if (xbool2 == false) {
        //crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").val("");
        //crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").focus();
        GridPD.SetText(SPR_STARTAMORT - 1, row, "");
    }
}

//$(document).on("focus", ".dtpStartAmort", function () {
//    startAmortDateOld = crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").val();
//});

//$(document).on('change', '.dtpStartAmort', function () {
//    var startAmortDate = crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").val();
//    var counterDate = $("#txtCounterDate_PD").val();

//    var xbool2 = nwDateMaskCheck(crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").val());

//    if (Date.parse(startAmortDate) < Date.parse(counterDate)) {
//        MessageBox("Cannot proceed. Start of Amortization Date should not be earlier than the Counter Date.\n", "Prepayment Details", "error");
//        crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").val(startAmortDateOld);
//        return false;
//    }

//    if (xbool2 == false) {
//        crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").val("");
//        crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").focus();
//    }
//});

//$(document).on('change', '.numNoPeriods', function () {
//    nwParameter_Add("noOfPeriods", crnwTR.find("td:eq(" + SPR_NOPERIODS + ") input").val());
//    nwParameter_Add("startAmortDate", crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").val());
//    nwParameter_Add("currRow", crnwTR.index());
//    func_ActionDriven("actComputeEndAmort", false);
//});

function numNoPeriods() {
    var GridPD = nwGridPrepaymentCon_Book.ActiveSheet;
    var row = GridPD.CellSelected.row - 1;
    nwParameter_Add("noOfPeriods", GridPD.GetValue(SPR_NOPERIODS - 1, row));
    nwParameter_Add("startAmortDate", GridPD.GetValue(SPR_STARTAMORT - 1, row));
    nwParameter_Add("currRow", row);
    func_ActionDriven("actComputeEndAmort", false);
}

var EndAmortDateOld = '';

function dtpEndAmort_focus() {
    var GridPD = nwGridPrepaymentCon_Book.ActiveSheet;
    var row = GridPD.CellSelected.row - 1;
    EndAmortDateOld = GridPD.GetValue(SPR_ENDAMORT - 1, row);
    //EndAmortDateOld = crnwTR.find("td:eq(" + SPR_ENDAMORT + ") input").val();
}

function dtpEndAmort() {
    var GridPD = nwGridPrepaymentCon_Book.ActiveSheet;
    var row = GridPD.CellSelected.row - 1;
    //var startAmortDate = crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").val();
    //var endAmortDate = crnwTR.find("td:eq(" + SPR_ENDAMORT + ") input").val();
    var startAmortDate = GridPD.GetValue(SPR_STARTAMORT - 1, row);
    var endAmortDate = GridPD.GetValue(SPR_ENDAMORT - 1, row);

    var xbool2 = nwDateMaskCheck(GridPD.GetValue(SPR_ENDAMORT - 1, row));

    if (Date.parse(endAmortDate) < Date.parse(startAmortDate)) {
        MessageBox("Cannot proceed. End of Amortization Date should not be earlier than the Start of Amortization Date.\n", "Prepayment Details", "error");
        //crnwTR.find("td:eq(" + SPR_ENDAMORT + ") input").val(EndAmortDateOld);
        GridPD.SetText(SPR_ENDAMORT - 1, row, EndAmortDateOld);
        return false;
    }
    else {
        //nwParameter_Add("endAmortDate", crnwTR.find("td:eq(" + SPR_ENDAMORT + ") input").val());
        //nwParameter_Add("startAmortDate", crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").val());
        //nwParameter_Add("currRow", crnwTR.index());
        nwParameter_Add("endAmortDate", GridPD.GetValue(SPR_ENDAMORT - 1, row));
        nwParameter_Add("startAmortDate", GridPD.GetValue(SPR_STARTAMORT - 1, row));
        nwParameter_Add("currRow", row);
        func_ActionDriven("actComputeNoOfPeriods", false);
    }

    if (xbool2 == false) {
        GridPD.SetText(SPR_ENDAMORT - 1, row, "");
        //crnwTR.find("td:eq(" + SPR_ENDAMORT + ") input").val("");
        //crnwTR.find("td:eq(" + SPR_ENDAMORT + ") input").focus();
    }
}

//$(document).on("focus", ".dtpEndAmort", function () {
//    EndAmortDateOld = crnwTR.find("td:eq(" + SPR_ENDAMORT + ") input").val();
//});
//$(document).on('change', '.dtpEndAmort', function () {
//    var startAmortDate = crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").val();
//    var endAmortDate = crnwTR.find("td:eq(" + SPR_ENDAMORT + ") input").val();

//    var xbool2 = nwDateMaskCheck(crnwTR.find("td:eq(" + SPR_ENDAMORT + ") input").val());

//    if (Date.parse(endAmortDate) < Date.parse(startAmortDate)) {
//        MessageBox("Cannot proceed. End of Amortization Date should not be earlier than the Start of Amortization Date.\n", "Prepayment Details", "error");
//        crnwTR.find("td:eq(" + SPR_ENDAMORT + ") input").val(EndAmortDateOld);
//        return false;
//    }
//    else {
//        nwParameter_Add("endAmortDate", crnwTR.find("td:eq(" + SPR_ENDAMORT + ") input").val());
//        nwParameter_Add("startAmortDate", crnwTR.find("td:eq(" + SPR_STARTAMORT + ") input").val());
//        nwParameter_Add("currRow", crnwTR.index());
//        func_ActionDriven("actComputeNoOfPeriods", false);
//    }

//    if (xbool2 == false) {
//        crnwTR.find("td:eq(" + SPR_ENDAMORT + ") input").val("");
//        crnwTR.find("td:eq(" + SPR_ENDAMORT + ") input").focus();
//    }
//});

$(document).on('click', '#btnSavePrepayment', function () {
    msgBoxContainerQuestion = "btnSavePrepayment";
    parent_MessageBoxQuestion("Do you want to save the record?", "Prepayment Details", "Question");

    return false;
});

function HasJsonTempPrepayDtls(docno, refRowno) {
    return jsonPrepayDtls.findIndex(i => (i.docno + i.rowno) == docno + refRowno)
}

function FilterJsonPrepayDtls(docno, refRowno) {
    return jsonPrepayDtls.filter(i => (i.docno + i.rowno) != docno + refRowno)
}

function SaveJsonPrepayDtls(docno, refRowno) {
    //Filter Data
    jsonPrepayDtls = FilterJsonPrepayDtls(docno, refRowno);

    for (var i = 0; i < jsonPrepayDtlsFiltered.length; i++) {
        var Store = {};

        Store["docno"] = jsonPrepayDtlsFiltered[i].docno;
        Store["lineID"] = jsonPrepayDtlsFiltered[i].lineID;
        Store["rowno"] = jsonPrepayDtlsFiltered[i].rowno;
        Store["prepaidAccount"] = jsonPrepayDtlsFiltered[i].prepaidAccount;
        Store["prepaidAccountDesc"] = jsonPrepayDtlsFiltered[i].prepaidAccountDesc;
        Store["prepaidAmount"] = jsonPrepayDtlsFiltered[i].prepaidAmount;
        Store["startAmortDate"] = jsonPrepayDtlsFiltered[i].startAmortDate;
        Store["noOfPeriods"] = jsonPrepayDtlsFiltered[i].noOfPeriods;
        Store["endAmortDate"] = jsonPrepayDtlsFiltered[i].endAmortDate;

        jsonPrepayDtls.push(Store);
    }
}

function setPrepayDtlsProperties(row) {
    var Grid = nwGridCon_Book.ActiveSheet;
    Grid.SetBackground(SPR_PREPAYMENTDTLS - 1, row, "green");
    Grid.SetText(SPR_PDTAG - 1, row, "1");
    Grid.SetText(SPR_RDTAG - 1, row, "0");
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_PREPAYMENTDTLS + ")").removeClass("btnBlue");
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_PREPAYMENTDTLS + ")").addClass("btnGreen");
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_PDTAG + ")").text("1");
    //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_RDTAG + ")").text("0");
}

$(document).on("click", "#btnVwJournal", function () {
    nwLoading_Start("xchkJrnlEntry", crLoadingHTML);
    export_type = '1';
    //$(".BoxClose").show();
    //$("#consoJrnlEntry").show();
    //$("#chkJrnlEntry").show();
    nwPopupForm_ShowModal("ViewJournal");
    cust_GetPara();
    nwParameter_Add("chkJrnlEntry", $("#chkJrnlEntry").is(":checked"));
    func_ActionDriven("actViewJournal", false);
});

$(document).on("click", "#chkJrnlEntry", function () {
    if ($("#chkJrnlEntry").is(":checked")) {
        export_type = '2';
    }
    else {
        export_type = '1';
    }
    nwLoading_Start("xchkJrnlEntry", crLoadingHTML);
    cust_GetPara();
    nwParameter_Add("chkJrnlEntry", $("#chkJrnlEntry").is(":checked"));
    func_ActionDriven("actViewJournal", false);
});

function func_WindowCloseTrigger(verID) {
    var isContinue = true;

    if (verID == "PrepaymentDtls") {
        var Grid = nwGridCon_Book.ActiveSheet;      
        var row = $("#txtRowno_PD").val();
        //var rdtag = $("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_RDTAG + ")").text();
        var rdtag = Grid.GetValue(SPR_RDTAG - 1, row);
        if (rdtag == "1") {
            //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_RECURRING + ")").removeClass("btnBlue");
            //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_RECURRING + ")").addClass("btnGreen");
            Grid.SetBackground(SPR_RECURRING, row, "green");
        }
        else {
            //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_RECURRING + ")").removeClass("btnGreen");
            //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_RECURRING + ")").addClass("btnBlue");   
            Grid.SetBackground(SPR_RECURRING, row, "blue");
        }
             
    }
    else if (verID == "nwViewRecurringDtls") {
        var Grid = nwGridCon_Book.ActiveSheet;   
        var row = $("#txtRowno_RD").val();
        //var pdtag = $("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_PDTAG + ")").text();
        var pdtag = Grid.GetValue(SPR_PDTAG - 1, row);
        if (pdtag == "1") {
            //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_PREPAYMENTDTLS + ")").removeClass("btnBlue");
            //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_PREPAYMENTDTLS + ")").addClass("btnGreen");
            Grid.SetBackground(SPR_RECURRING, row, "green");
        }
        else {
            //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_PREPAYMENTDTLS + ")").removeClass("btnGreen");
            //$("#nwGridCon tbody tr:eq(" + row + ") td:eq(" + SPR_PREPAYMENTDTLS + ")").addClass("btnBlue");
            Grid.SetBackground(SPR_RECURRING, row, "blue");
        }
    }
    else if (verID == "nwPopWindowFormAPPaymentRqstwRefEntry") {
        nwPopupForm_HideModal("nwRequestType");
        $('#noah-webui-default-Refresh').click();        
    }
    else if (verID == "nwRequestType") {
        $('#noah-webui-default-Refresh').click();
    }

    if (verID == "nwPopUpRequireCompliance") {
        nwParameter_Add("txtDocno", $('#txtDocno').val());
        nwParameter_Add("isHeader", isHeader);
        nwParameter_Add("currRow", currRow + 1);
        nwParameter_Add("lineID", lineID);
        nwParameter_Add("isCDRC", isCDRC);
        nwParameter_Add("rowCD", rowCD);
        nwParameter_Add("rownoCD", rownoCD);
        nwParameter_Add_Table("nwGridCon");
        func_ActionDriven("actchkIfhasReqComp", false);
    }

    if (verID == "nwPopWindow") {        
        //$("#dimbgNWLoadHstTemplate").hide();
        //$('#nwPopWindow').removelass("zindexHigh"); $('#dimbgNWLoadHstTemplate').removelass("zindexHigh2");        
    }
   
    if (verID == "nwPopUpRealignment" || verID == "nwPopUpSupplemental") {
        $('#noah-webui-default-Refresh').click();
    }

    if (verID == "nwUploadCon") {
        nwLoading_Start("xPRFUploading", crLoadingHTML);
        cust_GetPara();

        var txtloadPath = $("#aagHRec .aagFiledir").text();//$(".aagFiledir").text(); //
        nwParameter_Add("txtloadPath", txtloadPath);                        
        $('#txtFilePath').val(txtloadPath);
        $('#txtPathTemp').val(txtloadPath);

        if (upload_type == 'uploadprf') {
            setTimeout(function () {
                nwParameter_Add("idvallugVendorPayee", $("#idvallugVendorPayee").val());
                func_ActionDriven("actPRFUploading", false);
            }, 1000);
        }
        else if (upload_type == 'uploadalloc') {
            setTimeout(function () {
                nwParameter_Add("txtLineID_AP", $("#txtLineID_AP").val());
                nwParameter_Add("txtRefRowno_AP", $("#txtRefRowno_AP").val());
                nwParameter_Add("idvallugSegment1", $("#idvallugSegment1").val());
                nwParameter_Add("descvallugSegment1", $("#descvallugSegment1").val());
                nwParameter_Add("txtTotalAmount", $("#txtTotalAmount").val());
                nwParameter_Add("txtTotalQty", $("#txtTotalQty").val());
                nwParameter_Add("idvallugLocAcctForms", $("#idvallugLocAcctForms").val());
                nwParameter_Add("idvallugOrigCCC", $("#idvallugOrigCCC").val());                
                func_ActionDriven("actAllocUploading", false);
            }, 1000);
        }
    }

    if (verID == "nwPopUpRvwAttach") {
        nwLoading_Start("actHasRvwAttach", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("docno_glb", docno_glb);
        nwParameter_Add("currRow", currRow);
        nwParameter_Add("rvwattachtag", rvwattachtag);
        func_ActionDriven("actHasRvwAttach", false);
    }

    if (verID == "ApplyAdvDM") {
        cust_GetPara();
        nwParameter_Add("idvallugRefTranNo", $("#idvallugRefTranNo").val());
        nwParameter_Add("lineID", lineID);
        func_ActionDriven("actCloseAdvWindow", false);
    }

    //if (verID == "ApplyAdvDM") {
      
    //}
    
    return isContinue;
}

$(document).on("click", "#chkHoldPay", function () {
    HoldingRemarksProp();
});

function HoldingRemarksProp() {
    if ($("#chkHoldPay").is(":checked")) {
        $("#txtRemarksHold").enable(true);
        $("#txtRemarksHold").removeClass("bgColorTextDisable");
        $("#txtRemarksHold").addClass("bgColorTextEnable");
        $("#lblHoldRemarks").html("Remarks for Holding<span class='nwRequiredField'>*</span>");
    }
    else {
        $("#txtRemarksHold").enable(false);
        $("#txtRemarksHold").removeClass("bgColorTextEnable");
        $("#txtRemarksHold").addClass("bgColorTextDisable");
        $("#lblHoldRemarks").html("Remarks for Holding");
    }
}

//$(document).keyup(function (e) {
//    if (e.keyCode === 27) nwPopupForm_ShowModal("nwRequestType");
//});

//$(document).on("click", ".btnExpAlloc", function (e) {
//    nwLoading_Start("xbtnExpAlloc", crLoadingHTML);
//    $(".BoxClose").show();
//    nwPopupForm_ShowModal("ExpenseAlloc");
//    cust_GetPara();
//    $("#txtLineID").val(lineID);
//    $("#txtRefRowno").val($("#txtRefRowno_Def").val());
//    $("#txtPrepaid").val(prepaidAccount);
//    $("#txtRowno_Ex").val(crnwTR.index() + 1);
//    if (basisOfAmort == 'amort_equally') {
//        $('#chkApplyToAll').enable(false);
//        $("#txtAmount_PCCC").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_AMOUNT, crnwTR.index()));
//    }
//    else {
//        $('#chkApplyToAll').enable(true);
//        $("#txtAmount_PCCC").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_AMOUNT, crnwTR.index()));
//    }
//    $("#chkApplyToAll").prop("checked", false);
//    $("#chkApplyToPCCC").prop("checked", false);

//    var totalamount = getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_AMOUNT, crnwTR.index());
//    var row = $("#txtRefRowno_Def").val();

//    $("#idvallugCostCenter_EA").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_PCSEGMENTCODE, crnwTR.index()));
//    $("#descvallugCostCenter_EA").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_PCSEGMENTDESC, crnwTR.index()));
//    $("#idvallugProfitCenter_EA").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_CCSEGMENTCODE, crnwTR.index()));
//    $("#descvallugProfitCenter_EA").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_CCSEGMENTDESC, crnwTR.index()));
//    $("#txtAllocPercent_EA").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_PERCENTAGE, crnwTR.index()));
//    $("#txtAllocAmt_EA").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_AMOUNT, crnwTR.index()));
//    let cc = $("#idvallugCostCenter_EA").val();
//    let pc = $("#idvallugProfitCenter_EA").val();

//    nwParameter_Add("jsonExpenseAlloc", JSON.stringify(jsonExpenseAlloc));
//    nwParameter_Add("hasJson", HasJsonTempExpense(prepaidAccount, lineID, row, totalamount, cc, pc) >= 0 ? true : false);
//    nwParameter_Add("jsonExpenseAlloc", JSON.stringify(jsonExpenseAlloc.filter(i =>(i.prepaid + i.refRowno + i.totalamt + i.ccCode + i.pcCode) == prepaidAccount + row + totalamount + cc + pc)));
//    nwParameter_Add("lineID", lineID);
//    nwParameter_Add("txtPrepaid", prepaidAccount);
//    nwParameter_Add("txtRefRowno", $("#txtRefRowno").val());    
//    nwParameter_Add("totalamount", totalamount);
//    nwParameter_Add("pc", getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_CCSEGMENTCODE, crnwTR.index()));
//    nwParameter_Add("cc", getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_PCSEGMENTCODE, crnwTR.index()SPR_PREPAIDACCNTCODE));
//    func_ActionDriven("actbtnExpAlloc", false);
//});

function btnExpAlloc() {
    nwLoading_Start("xbtnExpAlloc", crLoadingHTML);
    //$(".BoxClose").show();
    nwPopupForm_ShowModal("ExpenseAlloc");
    var GridPCCC = nwGridPCCCAllocCon_Book.ActiveSheet;
    //var row = GridPCCC.CellSelected.row - 1;
    cust_GetPara();
    $("#txtLineID").val(lineID);
    $("#txtRefRowno").val($("#txtRefRowno_Def").val()); //wala
    $("#txtPrepaid").val(prepaidAccount); //wala
    //$("#txtRowno_Ex").val(crnwTR.index() + 1);
    $("#txtRowno_Ex").val(pccc_row + 1);
    if (basisOfAmort == 'amort_equally') {
        $('#chkApplyToAll').enable(false);
        //$("#txtAmount_PCCC").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_AMOUNT, crnwTR.index()));
        $("#txtAmount_PCCC").val(GridPCCC.GetValue(SPR_PCCC_AMOUNT - 1, pccc_row));
    }
    else {
        $('#chkApplyToAll').enable(true);
        //$("#txtAmount_PCCC").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_AMOUNT, crnwTR.index()));
        $("#txtAmount_PCCC").val(GridPCCC.GetValue(SPR_PCCC_AMOUNT - 1, pccc_row));
    }
    $("#chkApplyToAll").prop("checked", false);
    $("#chkApplyToPCCC").prop("checked", false);

    //var totalamount = getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_AMOUNT, crnwTR.index());
    var totalamount = GridPCCC.GetValue(SPR_PCCC_AMOUNT - 1, pccc_row);
    var row = $("#txtRefRowno_Def").val();

    //$("#idvallugCostCenter_EA").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_PCSEGMENTCODE, crnwTR.index()));
    //$("#descvallugCostCenter_EA").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_PCSEGMENTDESC, crnwTR.index()));
    //$("#idvallugProfitCenter_EA").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_CCSEGMENTCODE, crnwTR.index()));
    //$("#descvallugProfitCenter_EA").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_CCSEGMENTDESC, crnwTR.index()));
    //$("#txtAllocPercent_EA").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_PERCENTAGE, crnwTR.index()));
    //$("#txtAllocAmt_EA").val(getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_AMOUNT, crnwTR.index()));
    $("#idvallugCostCenter_EA").val(GridPCCC.GetValue(SPR_PCCC_PCSEGMENTCODE - 1, pccc_row));
    $("#descvallugCostCenter_EA").val(GridPCCC.GetValue(SPR_PCCC_PCSEGMENTDESC - 1, pccc_row));
    $("#idvallugProfitCenter_EA").val(GridPCCC.GetValue(SPR_PCCC_CCSEGMENTCODE - 1, pccc_row));
    $("#descvallugProfitCenter_EA").val(GridPCCC.GetValue(SPR_PCCC_CCSEGMENTDESC - 1, pccc_row));
    $("#txtAllocPercent_EA").val(GridPCCC.GetValue(SPR_PCCC_PERCENTAGE - 1, pccc_row));
    $("#txtAllocAmt_EA").val(GridPCCC.GetValue(SPR_PCCC_AMOUNT - 1, pccc_row));
    let cc = $("#idvallugCostCenter_EA").val();
    let pc = $("#idvallugProfitCenter_EA").val();

    nwParameter_Add("jsonExpenseAlloc", JSON.stringify(jsonExpenseAlloc));
    nwParameter_Add("hasJson", HasJsonTempExpense(prepaidAccount, lineID, pccc_row, totalamount, cc, pc) >= 0 ? true : false);
    nwParameter_Add("jsonExpenseAlloc", JSON.stringify(jsonExpenseAlloc.filter(i =>(i.prepaid + i.refRowno + i.totalamt + i.ccCode + i.pcCode) == prepaidAccount + pccc_row + totalamount + cc + pc)));
    nwParameter_Add("lineID", lineID);
    nwParameter_Add("txtPrepaid", prepaidAccount);
    nwParameter_Add("txtRefRowno", $("#txtRefRowno").val());    
    nwParameter_Add("totalamount", totalamount);
    //nwParameter_Add("pc", getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_CCSEGMENTCODE, crnwTR.index()));
    //nwParameter_Add("cc", getDataOfGrid('nwGridPCCCAlloc', '', SPR_PCCC_PCSEGMENTCODE, crnwTR.index()));
    nwParameter_Add("pc", GridPCCC.GetValue(SPR_PCCC_CCSEGMENTCODE - 1, pccc_row));
    nwParameter_Add("cc", GridPCCC.GetValue(SPR_PCCC_PCSEGMENTCODE - 1, pccc_row));
    func_ActionDriven("actbtnExpAlloc", false);   
}

function HasJsonTempExpense(prepaid, lineid, refrowno, totalamt, cc, pc) {
    return jsonExpenseAlloc.findIndex(i => (i.prepaid + i.lineID + i.refRowno + i.totalamt + i.ccCode + i.pcCode) == prepaid + lineid + refrowno + totalamt + cc + pc)
}

function FilterJsonExpense(prepaid, lineid, refrowno, cc, pc) {
    return jsonExpenseAlloc.filter(i => (i.prepaid + i.lineID + i.refRowno + i.ccCode + i.pcCode) != prepaid + lineid + refrowno + cc + pc)
}

function SaveJsonExpense(prepaid, lineid, refrowno, cc, pc) {
    //Filter Data
    jsonExpenseAlloc = FilterJsonExpense(prepaid, lineid, refrowno, cc, pc);

    for (var i = 0; i < jsonExpenseAllocFiltered.length; i++) {
        var Store = {};

        Store["expenseCode"] = jsonExpenseAllocFiltered[i].expenseCode;
        Store["expenseDesc"] = jsonExpenseAllocFiltered[i].expenseDesc;
        Store["percentage"] = jsonExpenseAllocFiltered[i].percentage;
        Store["amount"] = jsonExpenseAllocFiltered[i].amount;
        Store["lineID"] = jsonExpenseAllocFiltered[i].lineID;        
        Store["prepaid"] = jsonExpenseAllocFiltered[i].prepaid;
        Store["applyToAll"] = jsonExpenseAllocFiltered[i].applyToAll;
        Store["refRowno"] = jsonExpenseAllocFiltered[i].refRowno;
        Store["rownoPCCC"] = jsonExpenseAllocFiltered[i].rownoPCCC;
        Store["totalamt"] = jsonExpenseAllocFiltered[i].totalamt;
        Store["ccCode"] = jsonExpenseAllocFiltered[i].ccCode;
        Store["pcCode"] = jsonExpenseAllocFiltered[i].pcCode;

        jsonExpenseAlloc.push(Store);
    }
}

function setExpenseProperties(row) {
    var GridPCCC = nwGridPCCCAllocCon_Book.ActiveSheet;
    var GridPC = nwGridPrepaymentCon_Book.ActiveSheet;
    var GridDA = nwGridPrepayDefCon_Book.ActiveSheet;
    GridPCCC.SetBackground(SPR_PCCC_EXPENSEALLOC - 1, row, "green");
    GridPCCC.SetText(SPR_PCCC_EXPTAG - 1, row, "1");
    //$("#nwGridPCCCAllocCon tbody tr:eq(" + row + ") td:eq(" + SPR_PCCC_EXPENSEALLOC + ")").removeClass("btnBlue");
    //$("#nwGridPCCCAllocCon tbody tr:eq(" + row + ") td:eq(" + SPR_PCCC_EXPENSEALLOC + ")").addClass("btnGreen");
    //$("#nwGridPCCCAllocCon tbody tr:eq(" + row + ") td:eq(" + SPR_PCCC_EXPTAG + ")").text("1");

    let prepayOption = $("#rdbAmortEqually_PD").is(":checked");
    let refRowno = $("#txtRefRowno").val();    

    if (prepayOption) {
        //crnwPrepTbl = $("#nwGridPrepaymentCon .tblGridBody");
        //$('#nwGridPrepaymentCon .tblGridBody tr:nth-child(' + (refRowno) + ') td:nth-child(' + (SPR_PCCCALLOC + 1) + ')').removeClass("btnBlue");
        //$('#nwGridPrepaymentCon .tblGridBody tr:nth-child(' + (refRowno) + ') td:nth-child(' + (SPR_PCCCALLOC + 1) + ')').removeClass("btnGray");
        //$('#nwGridPrepaymentCon .tblGridBody tr:nth-child(' + (refRowno) + ') td:nth-child(' + (SPR_PCCCALLOC + 1) + ')').addClass("btnGreen");
        //$('#nwGridPrepaymentCon .tblGridBody tr:nth-child(' + (refRowno) + ') td:nth-child(' + (SPR_PREPAY_TAG + 1) + ')').text("1");
        GridPC.SetBackground(SPR_PCCCALLOC - 1, refRowno, "green");
        GridPC.SetText(SPR_PREPAY_TAG - 1, refRowno, "1");
    }
    else {
        //crnwPrepTbl = $("#nwGridPrepayDefCon .tblGridBody");
        //$("#nwGridPrepayDefCon tbody tr:eq(" + refRowno + ") td:eq(" + SPR_DEF_PCCC + ")").removeClass("btnBlue");
        //$("#nwGridPrepayDefCon tbody tr:eq(" + refRowno + ") td:eq(" + SPR_DEF_PCCC + ")").removeClass("btnGray");
        //$("#nwGridPrepayDefCon tbody tr:eq(" + refRowno + ") td:eq(" + SPR_DEF_PCCC + ")").addClass("btnGreen");
        //$("#nwGridPrepayDefCon tbody tr:eq(" + refRowno + ") td:eq(" + SPR_PREPAY_TAG + ")").text("1");
        GridDA.SetBackground(SPR_DEF_PCCC - 1, refRowno, "green");
    }
    ExpenseAlloc_ApplyToAllPCCC();
}

$(document).on('click', '#btnSaveExpense', function () {
    msgBoxContainerQuestion = "btnSaveExpense";
    parent_MessageBoxQuestion("Do you want to save the record?", "Expense Allocation Window", "Question");

    return false;
});

function PropPrepayGrid() {
    //crnwTable = $("#nwGridPrepaymentCon .tblGridBody tbody ");
    //var length = crnwTable.find("tr").length;
    var GridPD = nwGridPrepaymentCon_Book.ActiveSheet;
    GridPD.RenderStatus = false;
    var length = GridPD.GetMaxRow();
    for (var i = 0; i < length; i++) {
        //let tag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PREPAY_TAG + ")").text();
        let tag = GridPD.GetValue(SPR_PREPAY_TAG - 1, i);
        GridPD.SetText(SPR_PCCCALLOC - 1, i, "...");
        GridPD.SetTextAlign(SPR_PCCCALLOC - 1, i, "center");
        GridPD.SetTextColor(SPR_PCCCALLOC - 1, i, "white");
        GridPD.SetBold(SPR_PCCCALLOC - 1, i, "bold");
        if (tag == "1") {
            GridPD.SetBackground(SPR_PCCCALLOC - 1, i, "green");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCCALLOC + ")").removeClass("btnGray");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCCALLOC + ")").removeClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCCALLOC + ")").addClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCCALLOC + ")").addClass("btnPcCcAlloc");
        }
        else {
            GridPD.SetBackground(SPR_PCCCALLOC - 1, i, "blue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCCALLOC + ")").removeClass("btnGray");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCCALLOC + ")").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCCALLOC + ")").addClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCCALLOC + ")").addClass("btnPcCcAlloc");
        }        
    }
    GridPD.RenderStatus = true;

    if (isLevel1 == "0" && nwDocno != "") {
        DisablePrepayment();
    }
}

function PropPCCCAllocGrid() {
    //crnwTable = $("#nwGridPCCCAllocCon .tblGridBody tbody ");
    //var length = crnwTable.find("tr").length;
    let prepayRowno = $("#txtRefRowno_Def").val();
    let amortamt = getNumReplace($("#txtAmortAmt_Def").val());
    let lineid = $("#txtLineID_CD").val();

    var GridPCCC = nwGridPCCCAllocCon_Book.ActiveSheet;
    GridPCCC.RenderStatus = false;
    var length = GridPCCC.GetMaxRow();
    for (var i = 0; i < length; i++) {
        let exptag = GridPCCC.GetValue(SPR_PCCC_EXPTAG - 1, i);
        GridPCCC.SetText(SPR_PCCC_EXPENSEALLOC - 1, i, "...");
        GridPCCC.SetTextAlign(SPR_PCCC_EXPENSEALLOC - 1, i, "center");
        GridPCCC.SetTextColor(SPR_PCCC_EXPENSEALLOC - 1, i, "white");
        GridPCCC.SetBold(SPR_PCCC_EXPENSEALLOC - 1, i, "bold");
        //if (crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCC_EXPTAG + ")").text() == "1") {
        if (exptag == "1") {
            GridPCCC.SetBackground(SPR_PCCC_EXPENSEALLOC - 1, i, "green");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCC_EXPENSEALLOC + ")").removeClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCC_EXPENSEALLOC + ")").addClass("btnGreen");
        }
        else {
            GridPCCC.SetBackground(SPR_PCCC_EXPENSEALLOC - 1, i, "blue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCC_EXPENSEALLOC + ")").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCC_EXPENSEALLOC + ")").addClass("btnBlue");
        }

        for (var x = 0; x < jsonExpenseAlloc.length; x++) {
            let rownopccc = jsonExpenseAlloc[x].rownoPCCC;
            let refrowno = jsonExpenseAlloc[x].refRowno;
            let exlineid = jsonExpenseAlloc[x].lineID;
            let examt = getNumReplace(jsonExpenseAlloc[x].totalamt);
            var currow = parseInt(rownopccc) - 1;

            if (rownopccc = (i + 1) && prepayRowno == refrowno && lineid == exlineid && amortamt == examt) {
                //crnwTable.find("tr:eq(" + currow + ")").find("td:eq(" + SPR_PCCC_EXPENSEALLOC + ")").removeClass("btnBlue");
                //crnwTable.find("tr:eq(" + currow + ")").find("td:eq(" + SPR_PCCC_EXPENSEALLOC + ")").addClass("btnGreen");
                GridPCCC.SetBackground(SPR_PCCC_EXPENSEALLOC - 1, currow, "green");
            }
            //else {
            //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCC_EXPENSEALLOC + ")").removeClass("btnGreen");
            //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCC_EXPENSEALLOC + ")").addClass("btnBlue");
            //}
        }

        if (basisOfAmort == "amort_schedule") {
            //let percentage = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCC_PERCENTAGE + ")").text().replace('%', '');
            let percentage = GridPCCC.GetValue(SPR_PCCC_PERCENTAGE - 1, i).replace('%', '');
            let amt = (amortamt * (percentage / 100));

            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PCCC_AMOUNT + ")").text(setNumReplace(amt, 2));
            GridPCCC.SetText(SPR_PCCC_AMOUNT - 1, currow, setNumReplace(amt, 2));
        }       
    }
    GridPCCC.RenderStatus = true;
}

//$(document).on('click', '.lineVal', function () {
//    var loc = $("#descvallugLocAcctForms").val();
//    var vendor = $("#descvallugVendorPayee").val();
//    var reqType = $("#cmbPaymentRqstType").val();
//    var reqSubType = $("#cmbPaymentRqstSubType").val();
//    var remarks = $("#txtRemarks").val();
//    var othrIns = $("#txtOthrPayIns").val();
//    var rsnReq = $("#descvallugRsnReq").val();
//    var controlAccnt = $("#descvallugAPCtrlAccnt").val();

//    if (reqType == "02") {
//        if (loc == "" || vendor == "" || reqType == "" || remarks == "" || rsnReq == "" || controlAccnt == "") {
//            MessageBox("Cannot proceed. Please complete the header details.", Title, "error");
//            crnwTR.find("td:eq(" + SPR_REFNO + ") input").val("");
//            crnwTR.find("td:eq(" + SPR_REFDATE + ") input").val("");
//            crnwTR.find("td:eq(" + SPR_DRNO + ") input").val("");
//            crnwTR.find("td:eq(" + SPR_DRDATE + ") input").val("");
//            crnwTR.find("td:eq(" + SPR_PAYMENTTERMCODE + ")").text("");
//            crnwTR.find("td:eq(" + SPR_PAYMENTTERMDESC + ")").text("");
//            crnwTR.find("td:eq(" + SPR_NOOFDAYS + ")").text("");
//            crnwTR.find("td:eq(" + SPR_COUNTERDATE + ") input").val("");
//            crnwTR.find("td:eq(" + SPR_DUEDATE + ") input").val("");
//            crnwTR.find("td:eq(" + SPR_GROSSAMT + ") input").val("");
//            crnwTR.find("td:eq(" + SPR_FOREXRATEDATE + ")").text("");
//            crnwTR.find("td:eq(" + SPR_RATETOHOME + ")").text("");
//            crnwTR.find("td:eq(" + SPR_RATETOLOCAL + ")").text("");
//            crnwTR.find("td:eq(" + SPR_NETAMTHOME + ")").text("");
//            crnwTR.find("td:eq(" + SPR_NETAMTLOCAL + ")").text("");
//            return;
//        }
//    }
//});

function LoadVendorDetails(idNum) {
    $("#idvallugPayeeSubType").val(getGridData(idNum, 2));
    $("#descvallugPayeeSubType").val(getGridData(idNum, 3));
    $("#txtPayeeType").val(getGridData(idNum, 4));
    //$("#descvallugPayeeType").val(getGridData(idNum, 5));
    $("#idvallugCurrency").val(getGridData(idNum, 6));
    $("#descvallugCurrency").val(getGridData(idNum, 7));
    $("#txtCheckPayeeName").val(getGridData(idNum, 8));
    $("#txtAlterPayeeName").val(getGridData(idNum, 9));
    $("#txtBasisAging").val(getGridData(idNum, 13));
    $("#txtVendorCode").val(getGridData(idNum, 0));
    $("#txtVendorName").val(getGridData(idNum, 1));
    $("#idvallugAPCtrlAccnt").val(getGridData(idNum, 15));
    $("#descvallugAPCtrlAccnt").val(getGridData(idNum, 16));
    $("#txtAlterPayeeID").val(getGridData(idNum, 18));
    $("#txtRemarks_Alt").val(getGridData(idNum, 19));
    $("#txtRATag_Alt").val(getGridData(idNum, 20));
    $("#txtVendorTag").val(getGridData(idNum, 21));
    $("#txtForexDate").val(getGridData(idNum, 22));
    $("#txtForexLocal").val(getGridData(idNum, 23));
    $("#txtForexHome").val(getGridData(idNum, 24));

    SetForexHdr();

    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMCODE + 1) + ')').text(getGridData(idNum, 10));
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMDESC + 1) + ')').text(getGridData(idNum, 11));
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_NOOFDAYS + 1) + ')').text(getGridData(idNum, 14));
    paytermCode = getGridData(idNum, 10);
    paytermDesc = getGridData(idNum, 11);
    noDays = getGridData(idNum, 14);

    if (getGridData(idNum, 9) == "") {
        $("#chkAltPayee").enable(false);
        $("#btnAlterPayee").enable(false);
        //$("#btnAlterPayee").removeClass("btnGreen");
        $("#btnAlterPayee").addClass("btn-default-gray");
        $("#chkAltPayee").prop("checked", false);
    }
    else {
        $("#chkAltPayee").enable(true);
        $("#btnAlterPayee").enable(true);
        //$("#btnAlterPayee").removeClass("btnGray");
        $("#btnAlterPayee").addClass("btn-default-green");
    }

    if (getGridData(idNum, 12) == "1") {
        $("#lugCurrency").enable(true);
    }
    else {
        $("#lugCurrency").enable(false);
    }
}


//Uploading
$(document).on("click", "#btnDownloadTemplate", function (e) {
    //window.location.href = 'PRF Direct Uploading.xlsx';
    //return false;

    e.preventDefault();    
    window.open("AP/DocumentEntry/APPaymentRequestEntry/PRF Direct Uploading Template.xlsx");
    
    return false;
});

$(document).on("click", '#btnUploadTemplate', function (e) {
    var locForm = '', vendor = '', rsnForReq = '', costcenter = '';
    var remarks = '', othrIns = '', apctrlaccnt = '', paymentReqType = '', paymentReqSubType = '', counterdate = '';
    var grossamt = 0;
    var error = '';

    locForm = $("#idvallugLocAcctForms").val();
    vendor = $("#idvallugVendorPayee").val();   
    costcenter = $("#idvallugOrigCCC").val();
    paymentReqType = $("#cmbPaymentRqstType").val();
    paymentReqSubType = $("#cmbPaymentRqstSubType").val();
    remarks = $("#txtRemarks").val();
    othrIns = $("#txtOthrPayIns").val();
    rsnForReq = $("#idvallugRsnReq").val();
    apctrlaccnt = $("#idvallugAPCtrlAccnt").val();

    if (locForm == '' && vendor == '' && paymentReqSubType == '' && rsnForReq == '' && remarks == '' && apctrlaccnt == '' && costcenter == '') {
        error += "Cannot proceed. Please complete the header details.\n";
    }
    else {
        if (locForm == '') {
            error += "Cannot proceed. Location with Accountable Forms is required.\n";
        }
        if (costcenter == '') {
            error += "Cannot proceed. Originating Cost Center is required.\n";
        }
        if (vendor == '') {
            error += "Cannot proceed. Vendor/Payee is required.\n";
        }
        if (paymentReqType == '') {
            error += "Cannot proceed. Payment Request Sub Type is required.\n";
        }
        if (rsnForReq == '') {
            error += "Cannot proceed. Reason for Request is required.\n";
        }
        if (remarks == '') {
            error += "Cannot proceed. Remarks is required.\n";
        }        
        if (apctrlaccnt == '') {
            error += "Cannot proceed. AP Control Account is required.\n";
        }
    }
    if (error != "") {
        MessageBox(error, Title, "error");
        return;
    }
    else {
        upload_type = 'uploadprf';
        //$('#btnupload').attr("Value", 'Upload');
        //$("#fileCon").val("");
        //$("#status").find("span").text("");
        //$(".progress").find("div.percent").text("0%`");
        //$(".progress").find("div.bar").addClass("nwCuz157");
        //nwPopupForm_ShowModal("nwUploadCon");

        $("#fileCon").val("");
        $("#status").find("span").text("");
        $(".progress").find("div.percent").text("0%");
        $(".progress").find("div.bar").css("width", "0%");

        nwPopupForm_ShowModal("nwUploadCon");
        return false;
    }  
});

function ClearUploadField() {
    $("#fileCon").val("");
    $(".bar").css("width", "0%");
    $(".percent").text("0%");
    $("#status").html("");
}

//For Uploading of Attachment
function changeFile(ver) {
    var file = ver.files[0];
    var name = file.name;
    var size = file.size;
    var type = file.type;
    type = name.slice((Math.max(0, name.lastIndexOf(".")) || Infinity) + 1);
    type = type.toLowerCase();
    $(".bar").css("width", "0%");
    $(".percent").text("0%");
    $("#status").html("");

    //Your validation
    currentName = name;
    if (size > 3194880) {
        MessageBox("Attachment does not follow file size requirements."); $(ver).val("");
    }
    else {
        setTimeout(function () {
            $("#btnupload").click();
        }, 100);
        //upload();
    }
}

function upload() {

    if ($("input[type = 'file']").val() == "") {
        $("#status").html("<span class='nwCuz155'>Please select file to upload!</span>");
        (function () {
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');
            $('form').ajaxForm({
                beforeSend: function () {

                },
                uploadProgress: function (event, position, total, percentComplete) {
                },
                success: function () {
                },
                complete: function (xhr) {
                }
            });
        })();
        //01/25/2019
        $("#noah-webui-Toolbox").bindingProcess().enable(false);
        //End 01/25/2019

    } else {
        (function () {
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');

            try {

                $('form').ajaxForm({
                    beforeSend: function () {
                        status.empty();
                        var percentVal = '0%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },

                    uploadProgress: function (event, position, total, percentComplete) {
                        var percentVal = percentComplete + '%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },

                    success: function () {
                        var percentVal = '100%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },

                    complete: function (xhr) {
                        $('#status').html(xhr.responseText);
                        window_close('nwUploadCon');
                        //nwLoading_Start("xPRFUploading", crLoadingHTML);
                        //cust_GetPara();
                        //$('#status').html(xhr.responseText);

                        //var txtloadPath = $("#aagHRec .aagFiledir").text();//$(".aagFiledir").text(); //
                        //nwParameter_Add("txtloadPath", txtloadPath);                        
                        //$('#txtFilePath').val(txtloadPath);
                        //$('#txtPathTemp').val(txtloadPath);

                        //if (upload_type == 'uploadprf') {
                        //    setTimeout(function () {
                        //        func_ActionDriven("actPRFUploading", false);
                        //    }, 1000);
                        //}
                        //else if (upload_type == 'uploadalloc') {
                        //    setTimeout(function () {
                        //        nwParameter_Add("txtLineID_AP", $("#txtLineID_AP").val());
                        //        nwParameter_Add("txtRefRowno_AP", $("#txtRefRowno_AP").val());
                        //        nwParameter_Add("idvallugSegment1", $("#idvallugSegment1").val());
                        //        nwParameter_Add("descvallugSegment1", $("#descvallugSegment1").val());
                        //        func_ActionDriven("actAllocUploading", false);
                        //    }, 1000);
                        //}
                       
                    }
                });
            } catch (err) {
                alert(err);
            }
        })();
    }
}

$(document).on('click', '.btnRemarksVal', function () {
    var remarks = crnwTR.find("td:eq(" + SPR_VAL_REMARKS + ") input").val().replaceAll("nwNewLine", "\n").replaceAll("anwNewXLineX", "\n");
    nwPopupForm_ShowModal('nwRemarks1');
    $('#txtnwgRemarkshdr').val(remarks);
    $('#txtnwgRemarkshdr').prop('disabled', true);
});

function SetRemarksButton() {
    crnwTable = $("#nwGridValListCon .tblGridBody");
    var len = crnwTable.find('tr').length;

    for (var x = 0; x <= len - 1; x++) {
        var remarks = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKS + ') input').val();
        if (remarks != "") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').enable(true);
            $('#nwGridValListCon .tblGridBody tr:nth-child(' + (x + 1) + ') td').enable(true);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').removeClass("btnGray");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').addClass("btnGreen");
        }
        else {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').enable(false);
            $('#nwGridValListCon .tblGridBody tr:nth-child(' + (x + 1) + ') td').enable(false);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').removeClass("btnGreen");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').addClass("btnGray");
        }
    }    
}

$(document).on('click', '#btnExportUploading', function () {
    //nwLoading_Start("xbtnExportUploading", crLoadingHTML);
    //func_ActionDriven("actExport_Uploading", false);
    nwGridValListCon_Book.ActiveSheet.exportColumn = true;
    p8Spread_Export(nwGridValListCon_Book, "Payment Request Entry Uploading");
});

$(document).on('click', '.nwgbtnRemarks', function () {
    if (nwDocno != '') {
        $("#txtnwgRemarks").enable(false);
        $("#btnnwgRemarks").enable(false);
        $("#chknwgRemarks").enable(false);
    }
});

$(document).on("click", "#btnnwgRemarks", function (e) {
    ParticularsProp();
    RemarksProp();
});

$(document).on("keypress", "#txtnwgRemarks", function (e) {
    if (e.which == 13) {
        ParticularsProp();
        RemarksProp();
    }
});

function DisplayPromptMsg(errorMsg) {
    msgBoxContainerQuestion = "BdgtCheck";
    parent_MessageBoxQuestion(errorMsg.replaceAll('nwLine', '\n'), Title, "Question", "");
    $('#dimMessageBox.question .message_icon').css('background-image', ' url(../../../materials/icons/nw_ico_Error.png)'); //Replace ICON
    $('#Message_Yes').text('OK');
    $('#Message_No').css('display', 'none');
    $('#Message_Cancel').css('display', 'none');
}

function ChangeBgColorForBdgtCtrlDetails() {
    var rmrks = false;
    var rmrksMsg = "";
    var istagPerQty = false;
    var GridBC = nwGridBdgtCtrlCon_Book.ActiveSheet;
    var len = GridBC.GetMaxRow();
    for (var n = 0; x <= len - 1; n++) {
        //rmrks = $row.find(`td:eq(${BdgtCtrl.GRD_BCD_REMARKS})`).text() != "" ? true : false;
        //rmrksMsg = $row.find(`td:eq(${BdgtCtrl.GRD_BCD_REMARKS})`).text();
        rmrks = GridBC.GetValue(BdgtCtrl.GRD_BCD_REMARKS - 1, n) != "" ? true : false;
        rmrksMsg = GridBC.GetValue(BdgtCtrl.GRD_BCD_REMARKS - 1, n);
        istagPerQty = GridBC.GetValue(BdgtCtrl.GRD_BCD_TAGISQTY - 1, n) != "" ? true : false;
        //istagPerQty = $row.find(`td:eq(${BdgtCtrl.GRD_BCD_TAGISQTY})`).text() != "" ? true : false;

        if (rmrks) {

            if (istagPerQty) { //tagged as Quantity
                GridBC.SetTextColor(BdgtCtrl.GRD_BCD_AFTER_QTY - 1, n, "white");
                GridBC.SetBackground(BdgtCtrl.GRD_BCD_AFTER_QTY - 1, n, "red");
                //$row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_QTY})`).css('background-color', 'red');
                //$row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_QTY})`).css('color', 'white');
            }
            else {
                GridBC.SetTextColor(BdgtCtrl.GRD_BCD_AFTER_AMNT - 1, n, "white");
                GridBC.SetBackground(BdgtCtrl.GRD_BCD_AFTER_AMNT - 1, n, "red");
                //$row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_AMNT})`).css('background-color', 'red');
                //$row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_AMNT})`).css('color', 'white');
            }

            if (rmrksMsg.toLowerCase() == "nobudget") {
                GridBC.SetTextColor(BdgtCtrl.GRD_BCD_AFTER_AMNT - 1, n, "white");
                GridBC.SetBackground(BdgtCtrl.GRD_BCD_AFTER_AMNT - 1, n, "red");
                GridBC.SetTextColor(BdgtCtrl.GRD_BCD_BEFORE_QTY - 1, n, "white");
                GridBC.SetBackground(BdgtCtrl.GRD_BCD_BEFORE_QTY - 1, n, "red");
                GridBC.SetTextColor(BdgtCtrl.GRD_BCD_AFTER_QTY - 1, n, "white");
                GridBC.SetBackground(BdgtCtrl.GRD_BCD_AFTER_QTY - 1, n, "red");

                //$row.find(`td:eq(${BdgtCtrl.GRD_BCD_BEFORE_AMNT})`).css('background-color', 'red');
                //$row.find(`td:eq(${BdgtCtrl.GRD_BCD_BEFORE_AMNT})`).css('color', 'white');

                //$row.find(`td:eq(${BdgtCtrl.GRD_BCD_BEFORE_QTY})`).css('background-color', 'red');
                //$row.find(`td:eq(${BdgtCtrl.GRD_BCD_BEFORE_QTY})`).css('color', 'white');

                //$row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_QTY})`).css('background-color', 'red');
                //$row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_QTY})`).css('color', 'white');
            }
        }
    }

    //$(`#nwGridBdgtCtrl-nwData tr`).each(function (i, n) {
    //    var $row = $(n);

    //    rmrks = $row.find(`td:eq(${BdgtCtrl.GRD_BCD_REMARKS})`).text() != "" ? true : false;
    //    rmrksMsg = $row.find(`td:eq(${BdgtCtrl.GRD_BCD_REMARKS})`).text();

    //    istagPerQty = $row.find(`td:eq(${BdgtCtrl.GRD_BCD_TAGISQTY})`).text() != "" ? true : false;

    //    if (rmrks) {

    //        if (istagPerQty) { //tagged as Quantity
    //            $row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_QTY})`).css('background-color', 'red');
    //            $row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_QTY})`).css('color', 'white');
    //        }
    //        else {
    //            $row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_AMNT})`).css('background-color', 'red');
    //            $row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_AMNT})`).css('color', 'white');
    //        }

    //        if (rmrksMsg.toLowerCase() == "nobudget") {
    //            $row.find(`td:eq(${BdgtCtrl.GRD_BCD_BEFORE_AMNT})`).css('background-color', 'red');
    //            $row.find(`td:eq(${BdgtCtrl.GRD_BCD_BEFORE_AMNT})`).css('color', 'white');

    //            $row.find(`td:eq(${BdgtCtrl.GRD_BCD_BEFORE_QTY})`).css('background-color', 'red');
    //            $row.find(`td:eq(${BdgtCtrl.GRD_BCD_BEFORE_QTY})`).css('color', 'white');

    //            $row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_QTY})`).css('background-color', 'red');
    //            $row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_QTY})`).css('color', 'white');
    //        }
    //    }
    //});
}

$(document).on("click", "#cmbPaymentRqstTyp", function (e) {
    var type = $("#cmbPaymentRqstTyp").val();
    if (type == "1") {
        $("#lblType").html("*PO");
    }
    else if (type == "2") {
        $("#lblType").html("*Non-PO");
    }
    else {
        $("#lblType").html("");
    }    
});

var grossamt_ = 0;
function numGrossAmt_focus() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    grossamt_ = getNumReplace(Grid.GetValue(SPR_GROSSAMT - 1, row));
    _crnwTR = row;
}

function numGrossAmt() {   
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var netamt = getNumReplace(Grid.GetValue(SPR_GROSSAMT - 1, row));
    var docno = Grid.GetValue(SPR_TMPID - 1, row);
    var error = '';
   
    var refno = $("#idvallugRefTranNo").val();
    if (netamt != grossamt_ && grossamt_ != 0 && HasJsonTempDelDtls(docno, refno) >= 0) {
        msgBoxContainerQuestion = "CDNotif";
        parent_MessageBoxQuestion("Charging Details will be reset. Would you like to continue?", Title, "Question");
    }
}

//$(document).on('focus', '.numGrossAmt', function () {
//    //grossamt_ = getNumReplace(crnwTR.find("td:eq(" + SPR_GROSSAMT + ") input").val());
//    var Grid = nwGridCon_Book.ActiveSheet;
//    var row = Grid.CellSelected.row - 1;
//    grossamt_ = getNumReplace(Grid.GetValue(SPR_GROSSAMT - 1, row));
//    //_crnwTR = crnwTR;
//    _crnwTR = row;
//});

//$(document).on('change', '.numGrossAmt', function () {
//    //var netamt = getNumReplace(_crnwTR.find("td:eq(" + SPR_GROSSAMT + ") input").val());
//    //var docno = getDataOfGrid('nwGrid', '', SPR_TMPID, _crnwTR.index());
//    var Grid = nwGridCon_Book.ActiveSheet;
//    var row = Grid.CellSelected.row - 1;
//    var netamt = getNumReplace(Grid.GetValue(SPR_GROSSAMT - 1, row));
//    var docno = Grid.GetValue(SPR_TMPID - 1, row);
//    var error = '';
   
//    var refno = $("#idvallugRefTranNo").val();
//    if (netamt != grossamt_ && grossamt_ != 0 && HasJsonTempDelDtls(docno, refno) >= 0) {
//        msgBoxContainerQuestion = "CDNotif";
//        parent_MessageBoxQuestion("Charging Details will be reset. Would you like to continue?", Title, "Question");
//    }
//    //else {
//    //    CustomizeLoadByClick();
//    //}
//});

$(document).on("mousedown", "#btnLoadHstTemp", function (e) {
    nwPopupForm_ShowModal("LoadHstTemplate");
});
//$(document).on("click", "#btnLoadHstTemp", function (e) {
//    nwPopupForm_ShowModal("LoadHstTemplate");
//});


var fromDateOld = '';
$(document).on("focus", "#dtpFrom", function () {
    fromDateOld = $("#dtpFrom").val();
});
$(document).on('change', '#dtpFrom', function () {
    var toDate = $("#dtpTo").val();
    var fromDate = $("#dtpFrom").val();

    var xbool2 = nwDateMaskCheck($("#dtpFrom").val());

    if (Date.parse(fromDate) > Date.parse(toDate)) {
        MessageBox("Cannot proceed. From date should not be later than the selected To date.", "Load from Historical Template", "error");
        $("#dtpFrom").val(fromDateOld);
        return false;
    }

    if (xbool2 == false) {
        $("#dtpFrom").val('');
        $("#dtpFrom").focus();
    }
});

var toDateOld = '';
$(document).on("focus", "#dtpTo", function () {
    toDateOld = $("#dtpTo").val();
});
$(document).on('change', '#dtpTo', function () {
    var toDate = $("#dtpTo").val();
    var fromDate = $("#dtpFrom").val();

    var xbool2 = nwDateMaskCheck($("#dtpTo").val());

    if (Date.parse(toDate) < Date.parse(fromDate)) {
        MessageBox("Cannot proceed. To date should not be earlier than the selected From date.", "Load from Historical Template", "error");
        $("#dtpTo").val(toDateOld);
        return false;
    }

    if (xbool2 == false) {
        $("#dtpTo").val('');
        $("#dtpTo").focus();
    }
});

$(document).on("click", "#btnLoad", function (e) {
    var fromDate = $("#dtpFrom").val();
    var toDate = $("#dtpTo").val();
    var error = "";

    if (fromDate == "") {
        error += "Cannot proceed. From date is required.\n";
    }
    if (toDate == "") {
        error += "Cannot proceed. To date is required.\n";
    }

    if (error != "") {
        MessageBox(error, "Load from Historical Template", "error");
        return;
    }
    else {
        nwParameter_Add("dtpFrom", $("#dtpFrom").val());
        nwParameter_Add("dtpTo", $("#dtpTo").val());
        nwParameter_Add("idvallugLocAcctForms", $("#idvallugLocAcctForms").val());
        lookUpCustomize("lugLoadHstTemp", 1);
    }
});

function ViewPRFEntry(docno) {
    nwLoading_Start("xbtnDtls", crLoadingHTML);
    var fullength = "";
    var title = "";        

    if (docno.length > 0) {
        nwParameter_Add("urlPath", window.location.origin);        
       
        title = "Payment Request Entry";
        fullength = "../../../AP/DocumentEntry/APPaymentRequestEntry/APPaymentRequestEntry.aspx?nwDocno=" + encodeURI(docno);
        $('.nwmenuFrame').attr("src", fullength);        

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "98%" });
        $("#nwPopWindow").css({ "min-height": "98%" });
        nwPopupForm_ShowModal("nwPopWindow");
        $('.dimbgNWnwPopWindow').removeClass('openn');
    }
    nwLoading_End('xbtnDtls');
}

//$(document).on("click", "#btnLoadRecurTran", function (e) {
//   lookUpCustomize("lugLoadRecurTran", 1); 
//});

$(document).on("mousedown", "#btnLoadRecurTran", function (e) {
    lookUpCustomize("lugLoadRecurTran", 1);
});

function numQty_AP_focus() {
    var GridAP = nwGridAllocProcessCon_Book.ActiveSheet;
    var row = GridAP.CellSelected.row - 1;
    _crnwTR = row;
}
function numQty_AP() {
    var GridAP = nwGridAllocProcessCon_Book.ActiveSheet;
    var row = GridAP.CellSelected.row - 1;
    var cnt = GridAP.GetMaxRow();
    var totalQty = $("#txtTotalQty").val();
    //var qty = _crnwTR.find("td:eq(" + SPR_AP_QTY + ") input").val();    
    var qty = GridAP.GetValue(SPR_AP_QTY - 1, row);   

    if (getNumReplace(totalQty, 5) < getNumReplace(qty, 5)) {
        MessageBox("Cannot proceed. Total of Allocated Qty must not exceed Total Quantity in the header.", Title, "error");
        //_crnwTR.find("td:eq(" + SPR_AP_QTY + ") input").val("");
        GridAP.SetText(SPR_AP_QTY - 1, row, "");   
        return;
    }
    else {
        //crnwTable = $("#nwGridAllocProcessCon  .tblGridBody");
        //var cnt = crnwTable.find("tr").length;
        var totalQty = 0;
        var totalUnallocQty = 0;
        for (var i = 0; i < cnt ; i++) {            
            //totalQty += getNumReplace(crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_AP_QTY + ') input').val());
            totalQty += getNumReplace(GridAP.GetValue(SPR_AP_QTY - 1, i));
        }
        totalUnallocQty = getNumReplace($("#txtTotalQty").val()) - getNumReplace(totalQty);
        $("#txtAllocatedQty").val(setNumReplace(totalQty, 2));
        $("#txtUnallocatedQty").val(setNumReplace(totalUnallocQty, 2));
    }
}

//$(document).on('focus', '.numQty_AP', function () {    
//    _crnwTR = crnwTR;
//});

//$(document).on('change', '.numQty_AP', function () {
//    var totalQty = $("#txtTotalQty").val();
//    var qty = _crnwTR.find("td:eq(" + SPR_AP_QTY + ") input").val();    

//    if (getNumReplace(totalQty, 5) < getNumReplace(qty, 5)) {
//        MessageBox("Cannot proceed. Total of Allocated Qty must not exceed Total Quantity in the header.", Title, "error");
//        _crnwTR.find("td:eq(" + SPR_AP_QTY + ") input").val("");
//        return;
//    }
//    else {
//        crnwTable = $("#nwGridAllocProcessCon  .tblGridBody");
//        var cnt = crnwTable.find("tr").length;
//        var totalQty = 0;
//        var totalUnallocQty = 0;
//        for (var i = 0; i < cnt ; i++) {            
//            totalQty += getNumReplace(crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_AP_QTY + ') input').val());
//        }
//        totalUnallocQty = getNumReplace($("#txtTotalQty").val()) - getNumReplace(totalQty);
//        $("#txtAllocatedQty").val(setNumReplace(totalQty, 2));
//        $("#txtUnallocatedQty").val(setNumReplace(totalUnallocQty, 2));
//    }
//});

function numAmount_AP_focus() {
    var GridAP = nwGridAllocProcessCon_Book.ActiveSheet;
    var row = GridAP.CellSelected.row - 1;
    _crnwTR = row;
}

function numAmount_AP() {
    var GridAP = nwGridAllocProcessCon_Book.ActiveSheet;
    var row = GridAP.CellSelected.row - 1;
    var totalAmt = $("#txtTotalAmount").val();
    //var amt = _crnwTR.find("td:eq(" + SPR_AP_AMOUNT + ") input").val();    
    var amt = GridAP.GetValue(SPR_AP_AMOUNT - 1, row);    
    if (getNumReplace(totalAmt, 2) < getNumReplace(amt, 2)) {
        MessageBox("Cannot proceed. Total of Allocated Amount (VATEX) must not exceed Total Amount (VATEX) in the header.", Title, "error");
        //_crnwTR.find("td:eq(" + SPR_AP_AMOUNT + ") input").val("");
        GridAP.SetText(SPR_AP_AMOUNT - 1, row, "");    
        return;
    }
    else {       
        var percent = 0;
        percent = (getNumReplace(amt, 5) / getNumReplace(totalAmt)) * 100;
        //_crnwTR.find("td:eq(" + SPR_AP_PERCENTAGE + ") input").val(setNumReplace(percent, 11));
        GridAP.SetText(SPR_AP_PERCENTAGE - 1, row, setNumReplace(percent, 11));   
        ComputeAllocationAmount();
    }
}

//$(document).on('focus', '.numAmount_AP', function () {
//    _crnwTR = crnwTR;
//});

//$(document).on('change', '.numAmount_AP', function () {
//    var totalAmt = $("#txtTotalAmount").val();
//    var amt = _crnwTR.find("td:eq(" + SPR_AP_AMOUNT + ") input").val();    

//    if (getNumReplace(totalAmt, 2) < getNumReplace(amt, 2)) {
//        MessageBox("Cannot proceed. Total of Allocated Amount (VATEX) must not exceed Total Amount (VATEX) in the header.", Title, "error");
//        _crnwTR.find("td:eq(" + SPR_AP_AMOUNT + ") input").val("");
//        return;
//    }
//    else {       
//        var percent = 0;
//        percent = (getNumReplace(amt, 5) / getNumReplace(totalAmt)) * 100;
//        _crnwTR.find("td:eq(" + SPR_AP_PERCENTAGE + ") input").val(setNumReplace(percent, 11));
//        ComputeAllocationAmount();
//    }
//});

function numPercentage_AP_focus() {
    var GridAP = nwGridAllocProcessCon_Book.ActiveSheet;
    var row = GridAP.CellSelected.row - 1;
    _crnwTR = row;
}

function numPercentage_AP() {
    var GridAP = nwGridAllocProcessCon_Book.ActiveSheet;
    var row = GridAP.CellSelected.row - 1;
    //var percentage = _crnwTR.find("td:eq(" + SPR_AP_PERCENTAGE + ") input").val();  
    var percentage = GridAP.GetValue(SPR_AP_PERCENTAGE - 1, row); 
    var totalamt = $("#txtTotalAmount").val();
    var amt = 0;
    if (getNumReplace(percentage, 0) > getNumReplace(100, 0)) {
        MessageBox("Cannot proceed. Total Percentage must not exceed 100%.", Title, "error");
        //_crnwTR.find("td:eq(" + SPR_AP_PERCENTAGE + ") input").val("");
        GridAP.SetText(SPR_AP_PERCENTAGE - 1, row, ""); 
        return;
    }
    else {
        amt = (getNumReplace(percentage, 11) / 100) * getNumReplace(totalamt);
        //_crnwTR.find("td:eq(" + SPR_AP_AMOUNT + ") input").val(setNumReplace(amt, 5));
        GridAP.SetText(SPR_AP_AMOUNT - 1, row, setNumReplace(amt, 5)); 
        ComputeAllocationAmount();
    }
}
//$(document).on('focus', '.numPercentage_AP', function () {
//    _crnwTR = crnwTR;
//});

//$(document).on('change', '.numPercentage_AP', function () {    
//    var percentage = _crnwTR.find("td:eq(" + SPR_AP_PERCENTAGE + ") input").val();   
//    var totalamt = $("#txtTotalAmount").val();
//    var amt = 0;
//    if (getNumReplace(percentage, 0) > getNumReplace(100, 0)) {
//        MessageBox("Cannot proceed. Total Percentage must not exceed 100%.", Title, "error");
//        _crnwTR.find("td:eq(" + SPR_AP_PERCENTAGE + ") input").val("");
//        return;
//    }
//    else {
//        amt = (getNumReplace(percentage, 11) / 100) * getNumReplace(totalamt);
//        _crnwTR.find("td:eq(" + SPR_AP_AMOUNT + ") input").val(setNumReplace(amt, 5));
//        ComputeAllocationAmount();
//    }
//});

function ComputeAllocationAmount() {
    //crnwTable = $("#nwGridAllocProcessCon  .tblGridBody");
    //var cnt = crnwTable.find("tr").length;
    var GridAP = nwGridAllocProcessCon_Book.ActiveSheet;
    GridAP.RenderStatus = false;
    var cnt = GridAP.GetMaxRow();
    var totalAmt = 0;
    var totalUnallocAmt = 0;
    for (var i = 0; i < cnt ; i++) {
        //totalAmt += getNumReplace(crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_AP_AMOUNT + ') input').val());
        totalAmt += getNumReplace(GridAP.GetValue(SPR_AP_AMOUNT - 1, i));
    }
    GridAP.RenderStatus = true;
    totalUnallocAmt = getNumReplace($("#txtTotalAmount").val()) - getNumReplace(totalAmt);
    $("#txtAllocatedAmount").val(setNumReplace(totalAmt, 2));
    $("#txtUnallocatedAmount").val(setNumReplace(totalUnallocAmt, 2));
}

function ComputeAllocationQty() {
    //crnwTable = $("#nwGridAllocProcessCon  .tblGridBody");
    //var cnt = crnwTable.find("tr").length;
    var GridAP = nwGridAllocProcessCon_Book.ActiveSheet;
    GridAP.RenderStatus = false;
    var cnt = GridAP.GetMaxRow();
    var totalQty = 0;
    var totalUnallocQty = 0;
    for (var i = 0; i < cnt ; i++) {
        //totalQty += getNumReplace(crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_AP_QTY + ') input').val());
        totalQty += getNumReplace(GridAP.GetValue(SPR_AP_QTY - 1, i));
    }
    GridAP.RenderStatus = true;
    totalUnallocQty = getNumReplace($("#txtTotalQty").val()) - getNumReplace(totalQty);
    $("#txtAllocatedQty").val(setNumReplace(totalQty, 2));
    $("#txtUnallocatedQty").val(setNumReplace(totalUnallocQty, 2));
}

function ReqReason() {
    $("#lblRsnReq").html("Reason for Request<span class='nwRequiredField'>*</span>");
}
function NotReqReason() {
    $("#lblRsnReq").html("Reason for Request");
}

//$(document).on('focus', '.txtRefno', function () {
//    _crnwTR = crnwTR;    
//    //paytermCode = getDataOfGrid('nwGrid', '', SPR_PAYMENTTERMCODE, _crnwTR.index());
//    //paytermDesc = getDataOfGrid('nwGrid', '', SPR_PAYMENTTERMDESC, _crnwTR.index());
//    //noDays = getDataOfGrid('nwGrid', '', SPR_NOOFDAYS, _crnwTR.index());
//});

//$(document).on('change', '.txtRefno', function () {
//    if (isLoadHstTemp == false) {
//        _crnwTR.find("td:eq(" + SPR_PAYMENTTERMCODE + ")").text(paytermCode);
//        _crnwTR.find("td:eq(" + SPR_PAYMENTTERMDESC + ")").text(paytermDesc);
//        _crnwTR.find("td:eq(" + SPR_NOOFDAYS + ")").text(noDays);
        
//        nwParameter_Add("txtDocno", $('#txtDocno').val());  
//        nwParameter_Add("idvallugVendorPayee", $("#idvallugVendorPayee").val());
//        nwParameter_Add("refno", _crnwTR.find("td:eq(" + SPR_REFNO + ") input").val());
//        nwParameter_Add("currRowIndex", _crnwTR.index())
//        func_ActionDriven("actValidateRefNo", false);

//        CheckDuplicateRefNo("refno");
//    }
//});

$(document).on('click', '.chkapprove', function () {
    var isCheckAll = true;
    crnwTable = $("#nwGridProcessCon .tblGridBody");
    var count = crnwTable.find("tr").length;

    for (var i = 0; i < count; i++) {
        if (crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + (SPR_P_SELECT) + ") input").is(":checked") == false) {
            isCheckAll = false;
        }
    }
    if (isCheckAll == true) {
        $(".nwCheckBoxTot.nwCheckBoxTot1.chkapprove").prop("checked", true);
    }

});

function numPercentage_EA_focus() {
    var GridEC = nwGridExpenseCon_Book.ActiveSheet;
    var row = GridEC.CellSelected.row - 1;    
    _crnwTR = row;
}

function numPercentage_EA() {
    var GridEC = nwGridExpenseCon_Book.ActiveSheet;
    var row = GridEC.CellSelected.row - 1; 
    //var percentage = _crnwTR.find("td:eq(" + SPR_EA_PERCENT + ") input").val();
    var percentage = GridEC.GetValue(SPR_EA_PERCENT - 1, row);
    var totalamt = $("#txtAmount_PCCC").val();
    var amt = 0;
    if (getNumReplace(percentage) > getNumReplace(100)) {
        MessageBox("Cannot proceed. Percentage must not exceed 100%.", "Expense Allocation Window", "error");
        //_crnwTR.find("td:eq(" + SPR_EA_PERCENT + ") input").val("");
        GridEC.SetText(SPR_EA_PERCENT - 1, row, "");
        return;
    }
    else {
        amt = (getNumReplace(percentage) / 100) * getNumReplace(totalamt);
        //_crnwTR.find("td:eq(" + SPR_EA_AMOUNT + ") input").val(setNumReplace(amt, 5));
        GridEC.SetText(SPR_EA_AMOUNT - 1, row, setNumReplace(amt, 5));
    }
}

//$(document).on('focus', '.numPercentage_EA', function () {
//    _crnwTR = crnwTR;
//});

//$(document).on('change', '.numPercentage_EA', function () {
//    var percentage = _crnwTR.find("td:eq(" + SPR_EA_PERCENT + ") input").val();
//    var totalamt = $("#txtAmount_PCCC").val();
//    var amt = 0;
//    if (getNumReplace(percentage, 0) > getNumReplace(100, 0)) {
//        MessageBox("Cannot proceed. Percentage must not exceed 100%.", "Expense Allocation Window", "error");
//        _crnwTR.find("td:eq(" + SPR_EA_PERCENT + ") input").val("");
//        return;
//    }
//    else {
//        amt = (getNumReplace(percentage, 11) / 100) * getNumReplace(totalamt);
//        _crnwTR.find("td:eq(" + SPR_EA_AMOUNT + ") input").val(setNumReplace(amt, 5));        
//    }
//});

function numAmount_EA_focus() {
    var GridEC = nwGridExpenseCon_Book.ActiveSheet;
    var row = GridEC.CellSelected.row - 1; 
    _crnwTR = row;
    //_crnwTR = crnwTR;
}

function numAmount_EA() {
    var GridEC = nwGridExpenseCon_Book.ActiveSheet;
    var row = GridEC.CellSelected.row - 1; 
    var totalAmt = getNumReplace($("#txtAmount_PCCC").val(), 2);
    //var amt = _crnwTR.find("td:eq(" + SPR_EA_AMOUNT + ") input").val();  
    var amt = GridEC.GetValue(SPR_EA_AMOUNT - 1, row);
    var percent = 0;

    percent = (getNumReplace(amt, 5) / getNumReplace(totalAmt)) * 100;
    //_crnwTR.find("td:eq(" + SPR_EA_PERCENT + ") input").val(setNumReplace(percent, 11));
    GridEC.SetText(SPR_EA_PERCENT - 1, row, setNumReplace(percent, 11));
}

//$(document).on('focus', '.numAmount_EA', function () {
//    _crnwTR = crnwTR;
//});

//$(document).on('change', '.numAmount_EA', function () {
//    var totalAmt = getNumReplace($("#txtAmount_PCCC").val(), 2);
//    var amt = _crnwTR.find("td:eq(" + SPR_EA_AMOUNT + ") input").val();
//    var percent = 0;

//    percent = (getNumReplace(amt, 5) / getNumReplace(totalAmt)) * 100;
//    _crnwTR.find("td:eq(" + SPR_EA_PERCENT + ") input").val(setNumReplace(percent, 11));
//});

$(document).on('click', '#btnApplyAdvDM', function () {
    nwLoading_Start("xbtnApplyAdvDM", crLoadingHTML);
    $("#txtRefDocno_Adv").val($("#idvallugRefTranNo").val());
    $("#txtNetVATAmt").val($("#txtSubtotal_TranHist_CD").val());
    cust_GetPara();
    nwParameter_Add("idvallugRefTranNo", $('#idvallugRefTranNo').val());
    nwParameter_Add("lineID", lineID);
    nwPopupForm_ShowModal("ApplyAdvDM");
    func_ActionDriven("actLoadApplyAdvDM", false);

    if (nwDocno != '') {
        $('#btnSaveApplyAdvDM').enable(false);
    }
});

//$(document).on('click', '.btnADMForms', function () {
//    nwLoading_Start("xbtnADMForms", crLoadingHTML);

//    var docno = crnwTR.find("td:eq(" + SPR_ADM_DOCNO + ")").text();
//    nwParameter_Add("docno", docno);
//    func_ActionDriven("actViewFormsAPV", false);
//});

function btnADMForms() {
    nwLoading_Start("xbtnADMForms", crLoadingHTML);    
    var GridADV = nwGridApplyAdvDMCon_Book.ActiveSheet;
    var row = GridADV.CellSelected.row - 1;
    //var docno = crnwTR.find("td:eq(" + SPR_ADM_DOCNO + ")").text();
    var docno = GridADV.GetValue(SPR_ADM_DOCNO - 1, row);
    nwParameter_Add("docno", docno);
    func_ActionDriven("actViewFormsAPV", false);
}

function ApplyAdvDMProp() {
    //crnwTable = $("#nwGridApplyAdvDMCon .tblGridBody tbody ");
    //var length = crnwTable.find("tr").length;
    var GridADV = nwGridApplyAdvDMCon_Book.ActiveSheet;
    var length = GridADV.GetMaxRow();
    GridADV.RenderStatus = false;
    var totaladv = 0, totaldm = 0;
    var netamtdue = 0, totalappadv = 0, totalappdm = 0, remnetamtdue = 0;
    var totalamtdue = getNumReplace($("#txtTotalAmt_TranHist_CD").val());
    var netvatamt = getNumReplace($("#txtNetVATAmt").val());
    let refdocno_adv = $("#txtRefDocno_Adv").val();    

    for (var i = 0; i < length; i++) {
        //var text = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") textarea").val();
        //let appliedamt = getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDAMT + ") input").val());4
        GridADV.SetText(SPR_ADM_FORMS - 1, i, "...");
        GridADV.SetTextAlign(SPR_ADM_FORMS - 1, i, "center");
        GridADV.SetTextColor(SPR_ADM_FORMS - 1, i, "white");
        GridADV.SetBold(SPR_ADM_FORMS - 1, i, "bold");

        GridADV.SetText(SPR_ADM_APPLIEDHST - 1, i, "...");
        GridADV.SetTextAlign(SPR_ADM_APPLIEDHST - 1, i, "center");
        GridADV.SetTextColor(SPR_ADM_APPLIEDHST - 1, i, "white");
        GridADV.SetBold(SPR_ADM_APPLIEDHST - 1, i, "bold");

        GridADV.SetText(SPR_ADM_DEFAPPAMTDTLS - 1, i, "...");
        GridADV.SetTextAlign(SPR_ADM_DEFAPPAMTDTLS - 1, i, "center");
        GridADV.SetTextColor(SPR_ADM_DEFAPPAMTDTLS - 1, i, "white");
        GridADV.SetBold(SPR_ADM_DEFAPPAMTDTLS - 1, i, "bold");

        var text = GridADV.GetValue(SPR_ADM_REMARKS - 1, i);
        let appliedamt = getNumReplace(GridADV.GetValue(SPR_ADM_APPLIEDAMT - 1, i));
        if (text != "") {
            GridADV.SetBackground(SPR_ADM_REMARKS - 1, i, "green");
            GridADV.SetEnable(SPR_ADM_REMARKS - 1, i, true);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnGray");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").addClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnGray");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ")").addClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").enable(true);
        }
        else if (appliedamt > 0) {
            GridADV.SetBackground(SPR_ADM_REMARKS - 1, i, "blue");
            GridADV.SetEnable(SPR_ADM_REMARKS - 1, i, true);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnGray");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").addClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnGray");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ")").addClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").enable(true);
        }
        else {
            GridADV.SetBackground(SPR_ADM_REMARKS - 1, i, "gray");
            GridADV.SetEnable(SPR_ADM_REMARKS - 1, i, false);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").addClass("btnGray");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnBlue");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ")").addClass("btnGray");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").enable(false);
        }
        GridADV.SetEnable(SPR_ADM_DEFFERED - 1, i, false);
        //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_DEFFERED + ") input").enable(false);
        //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REMARKS + ") button").addClass("btnFont");

        //totaladv += getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_BALANCE + ")").text());
        //totaldm += getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_DMAMT + ")").text());
        totaladv += getNumReplace(GridADV.GetValue(SPR_ADM_BALANCE - 1, i));
        totaldm += getNumReplace(GridADV.GetValue(SPR_ADM_DMAMT - 1, i));

        //netamtdue += getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_ADVDEP + ")").text())
        //             + getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_INPUTVAT + ")").text())
        //             - getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_EWT + ")").text());
        
        //if (getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDAMT + ") input").val()) > 0)
        if (getNumReplace(GridADV.GetValue(SPR_ADM_APPLIEDAMT - 1, i)) > 0)
        {
            if (totaladv > 0) {
                //totalappadv += getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDAMT + ") input").val())
                //                       + getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_INPUTVAT + ")").text())
                //                       - getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_EWT + ")").text());
                totalappadv += getNumReplace(GridADV.GetValue(SPR_ADM_APPLIEDAMT - 1, i))
                                       + getNumReplace(GridADV.GetValue(SPR_ADM_INPUTVAT - 1, i))
                                       - getNumReplace(GridADV.GetValue(SPR_ADM_EWT - 1, i));
            }
            if (totaldm > 0) {
                //totalappdm += getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDAMT + ") input").val())
                //        + getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_INPUTVAT + ")").text())
                //        - getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_EWT + ")").text());
                totalappdm += getNumReplace(GridADV.GetValue(SPR_ADM_APPLIEDAMT - 1, i))
                            + getNumReplace(GridADV.GetValue(SPR_ADM_INPUTVAT - 1, i))
                            - getNumReplace(GridADV.GetValue(SPR_ADM_EWT - 1, i));
            }                     
        }

        //let refpo = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_PONO + ")").text();
        //let refpono = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_REFPONO + ")").text();
        //let balance = getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_BALANCE + ")").text());
        //let closeadv = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_CLOSEADV + ") input").is(":checked");
        //let apvno = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_DOCNO + ")").text();
        let refpo = GridADV.GetValue(SPR_ADM_PONO - 1, i);
        let refpono = GridADV.GetValue(SPR_ADM_REFPONO - 1, i);
        let balance = getNumReplace(GridADV.GetValue(SPR_ADM_BALANCE - 1, i));
        let closeadv = GridADV.GetValue(SPR_ADM_CLOSEADV - 1, i);
        let apvno = GridADV.GetValue(SPR_ADM_DOCNO - 1, i);
        if (refpo != '' && refdocno_adv == '') {
            GridADV.SetEnable(SPR_ADM_APPLIEDAMT - 1, i, false);
            GridADV.SetBackground(SPR_ADM_APPLIEDAMT - 1, i, "gainsboro");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDAMT + ")").enable(false);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDAMT + ")").css("background-color", "gainsboro");
        }
        else if (refpo != refpono && refdocno_adv != '') {
            GridADV.SetEnable(SPR_ADM_APPLIEDAMT - 1, i, false);
            GridADV.SetBackground(SPR_ADM_APPLIEDAMT - 1, i, "gainsboro");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDAMT + ")").enable(false);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDAMT + ")").css("background-color", "gainsboro");
        }
        else if (balance > 0 && closeadv && currADV == apvno) {
            GridADV.SetEnable(SPR_ADM_APPLIEDAMT - 1, i, true);
            GridADV.SetBackground(SPR_ADM_APPLIEDAMT - 1, i, "white");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDAMT + ")").enable(true);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDAMT + ")").css("background-color", "white");
        }
        else if (balance > 0 && closeadv) {
            GridADV.SetEnable(SPR_ADM_APPLIEDAMT - 1, i, false);
            GridADV.SetBackground(SPR_ADM_APPLIEDAMT - 1, i, "gainsboro");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDAMT + ")").enable(false);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDAMT + ")").css("background-color", "gainsboro");
        }       
        else {
            GridADV.SetEnable(SPR_ADM_APPLIEDAMT - 1, i, true);
            GridADV.SetBackground(SPR_ADM_APPLIEDAMT - 1, i, "white");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDAMT + ")").enable(true);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDAMT + ")").css("background-color", "white");
        }            

        if (balance > netvatamt) {
            GridADV.SetEnable(SPR_ADM_CLOSEADV - 1, i, true);
            GridADV.SetBackground(SPR_ADM_CLOSEADV - 1, i, "white");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_CLOSEADV + ") input").enable(true);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_CLOSEADV + ")").css("background-color", "white");
        }
        else {
            GridADV.SetEnable(SPR_ADM_CLOSEADV - 1, i, false);
            GridADV.SetBackground(SPR_ADM_CLOSEADV - 1, i, "gainsboro");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_CLOSEADV + ") input").enable(false);
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_CLOSEADV + ")").css("background-color", "gainsboro");
        }

        //if (refpo != "") { //to convert
        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_DEFAPPAMTDTLS + ")").addClass("btnDefAmtDtls");
        //}
        //else {
        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_DEFAPPAMTDTLS + ")").removeClass("btnDefAmtDtls");
        //}
        //let daatag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_PONO + ")").text();
        let daatag = GridADV.GetValue(SPR_ADM_PONO - 1, i);
        //if (daatag == "1") { //to convert
        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_DEFAPPAMTDTLS + ")").addClass("btnDefAmtDtls");
        //}
        //else {
        //    crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_DEFAPPAMTDTLS + ")").removeClass("btnDefAmtDtls");
        //}
        //let aatag = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_AATAG + ")").text();
        let aatag = GridADV.GetValue(SPR_ADM_AATAG - 1, i);
        if (aatag == "1") {
            GridADV.SetBackground(SPR_ADM_APPLIEDHST - 1, i, "green");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDHST + ")").removeClass("btnGray");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDHST + ")").addClass("btnGreen").addClass("btnADMHst");            
        }
        else {
            GridADV.SetBackground(SPR_ADM_APPLIEDHST - 1, i, "gray");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDHST + ")").removeClass("btnGreen").removeClass("btnADMHst");;
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ADM_APPLIEDHST + ")").addClass("btnGreen");
        }
        
    }
    GridADV.RenderStatus = true;
    netamtdue = totalamtdue;
    remnetamtdue = netamtdue - totalappadv - totalappdm;
  
    $("#txtTotalAdv").val(setNumReplace(totaladv, 2));
    $("#txtTotalDM").val(setNumReplace(totaldm, 2));
    $("#txtNetAmtDue").val(setNumReplace(netamtdue, 2));
    $("#txtTotalAppAdv").val(setNumReplace(totalappadv, 2));
    $("#txtTotalDMApp").val(setNumReplace(totalappdm, 2));
    $("#txtRemNetAmtDue").val(setNumReplace(remnetamtdue, 2));
    
    if (nwDocno != '') {
        //$('#nwGridApplyAdvDMCon .tblGridBody tr td:nth-child(' + (SPR_ADM_APPLIEDAMT + 1) + ') input').enable(false);
        GridADV.SetEnable(SPR_ADM_APPLIEDAMT - 1, Spread_ALLROW, false);
        GridADV.SetBackground(SPR_ADM_APPLIEDAMT - 1, Spread_ALLROW, "gainsboro");
    }
}

function numAppliedAmt_focus() {
    var GridADV = nwGridApplyAdvDMCon_Book.ActiveSheet;
    var row = GridADV.CellSelected.row - 1;
    _crnwTR = row;
}

function numAppliedAmt() {
    var netamtdue = 0, totalappamt = 0, totaldmamt = 0, remnetamt = 0, ewtadv = 0;
    var appliedamt = 0, inputvat = 0, ewt = 0, balance = 0, vatrate = 0, ewtrate = 0;
    var advamt = 0, dmamt = 0;

    var GridADV = nwGridApplyAdvDMCon_Book.ActiveSheet;
    var row = GridADV.CellSelected.row - 1;

    netamtdue = getNumReplace($('#txtNetAmtDue').val());
    //appliedamt = getNumReplace(_crnwTR.find("td:eq(" + SPR_ADM_APPLIEDAMT + ") input").val());
    //vatrate = getNumReplace(_crnwTR.find("td:eq(" + SPR_ADM_VATRATE + ")").text());
    //ewtrate = getNumReplace(_crnwTR.find("td:eq(" + SPR_ADM_EWTRATE + ")").text());
    //balance = getNumReplace(_crnwTR.find("td:eq(" + SPR_ADM_BALANCE + ")").text());
    //advamt = getNumReplace(_crnwTR.find("td:eq(" + SPR_ADM_ADVDEP + ")").text());
    //dmamt = getNumReplace(_crnwTR.find("td:eq(" + SPR_ADM_DMAMT + ")").text());
    appliedamt = getNumReplace(GridADV.GetValue(SPR_ADM_APPLIEDAMT - 1, row));
    vatrate = getNumReplace(GridADV.GetValue(SPR_ADM_VATRATE - 1, row));
    ewtrate = getNumReplace(GridADV.GetValue(SPR_ADM_EWTRATE - 1, row));
    balance = getNumReplace(GridADV.GetValue(SPR_ADM_BALANCE - 1, row));
    advamt = getNumReplace(GridADV.GetValue(SPR_ADM_ADVDEP - 1, row));
    dmamt = getNumReplace(GridADV.GetValue(SPR_ADM_DMAMT - 1, row));
    inputvat = appliedamt * vatrate;
    ewt = appliedamt * ewtrate;
    ewtadv = getNumReplace($("#txtLessEWT_TranHist_CD").val());
    if (appliedamt > balance) {
        setTimeout(function () {
            MessageBox("Cannot proceed. Applied Amount should not exceed Balance.", "Apply Advances/Debit Memo Window", "error");
        }, 100);
        //_crnwTR.find("td:eq(" + SPR_ADM_APPLIEDAMT + ") input").val("0.00");
        GridADV.SetText(SPR_ADM_APPLIEDAMT - 1, row, "0.00");
        return;
    }
    else if (appliedamt > (netamtdue + ewtadv)) {
        setTimeout(function () {
            MessageBox("Cannot proceed. Total Applied Advances exceeds Total Amount Due.", "Apply Advances/Debit Memo Window", "error");
        }, 100);
        //_crnwTR.find("td:eq(" + SPR_ADM_APPLIEDAMT + ") input").val("0.00");
        GridADV.SetText(SPR_ADM_APPLIEDAMT - 1, row, "0.00");
        return;
    }
    else {
        inputvat = getNumReplace(inputvat.toFixed(2));
        ewt = getNumReplace(ewt.toFixed(2));
        if (advamt > 0) {           
            totalappamt = appliedamt + inputvat - ewt;
        }
        if (dmamt > 0) {
            totaldmamt = appliedamt + inputvat - ewt;
        }
        remnetamt = netamtdue - totalappamt - totaldmamt;
        //if (remnetamt < 0) {
        //    remnetamt = 0;
        //}
        //_crnwTR.find("td:eq(" + SPR_ADM_INPUTVAT + ")").text(setNumReplace(inputvat, 2));
        //_crnwTR.find("td:eq(" + SPR_ADM_EWT + ")").text(setNumReplace(ewt, 2));
        GridADV.SetText(SPR_ADM_INPUTVAT - 1, row, setNumReplace(inputvat, 2));
        GridADV.SetText(SPR_ADM_EWT - 1, row, setNumReplace(ewt, 2));

        //$("#txtTotalAppAdv").val(setNumReplace(totalappamt, 2));
        //$("#txtTotalDMApp").val(setNumReplace(totaldmamt, 2));
        //$("#txtRemNetAmtDue").val(setNumReplace(remnetamt, 2));
        ComputeTotalAmt();
        var Grid = nwGridCon_Book.ActiveSheet;       
        //let remarks = _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") textarea").val();
        let remarks = GridADV.GetValue(SPR_ADM_REMARKS - 1, row);
        if (remarks == "") {
            GridADV.SetBackground(SPR_ADM_REMARKS - 1, row, "blue");
            GridADV.SetEnable(SPR_ADM_REMARKS - 1, row, true);
            GridADV.SetText(SPR_ADM_REMARKS - 1, row, Grid.GetValue(SPR_PARTICULARS - 1, currRow));
            //_crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnGray");
            //_crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnGreen");
            //_crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") button").addClass("btnBlue");
            //_crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnGray");
            //_crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnGreen");
            //_crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ")").addClass("btnBlue");
            //_crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") button").enable(true);
            //_crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") textarea").val(getDataOfGrid('nwGrid', 'textarea', SPR_PARTICULARS, currRow));
            //let remarks = getDataOfGrid('nwGrid', 'textarea', SPR_PARTICULARS, currRow);
            let remarks = Grid.GetValue(SPR_PARTICULARS - 1, currRow);
            if (remarks != "") {
                GridADV.SetBackground(SPR_ADM_REMARKS - 1, row, "green");                
                //_crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnGray");
                //_crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnBlue");
                //_crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") button").addClass("btnGreen");
                //_crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnGray");
                //_crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnBlue");
                //_crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ")").addClass("btnGreen");
            }
        }
    }
}

//$(document).on('focus', '.numAppliedAmt', function () {
//    _crnwTR = crnwTR;
//});

//$(document).on('change', '.numAppliedAmt', function () {
//    var netamtdue = 0, totalappamt = 0, totaldmamt = 0, remnetamt = 0, ewtadv = 0;
//    var appliedamt = 0, inputvat = 0, ewt = 0, balance = 0, vatrate = 0, ewtrate = 0;
//    var advamt = 0, dmamt = 0;

//    netamtdue = getNumReplace($('#txtNetAmtDue').val());
//    appliedamt = getNumReplace(_crnwTR.find("td:eq(" + SPR_ADM_APPLIEDAMT + ") input").val());
//    vatrate = getNumReplace(_crnwTR.find("td:eq(" + SPR_ADM_VATRATE + ")").text());
//    ewtrate = getNumReplace(_crnwTR.find("td:eq(" + SPR_ADM_EWTRATE + ")").text());
//    balance = getNumReplace(_crnwTR.find("td:eq(" + SPR_ADM_BALANCE + ")").text());
//    advamt = getNumReplace(_crnwTR.find("td:eq(" + SPR_ADM_ADVDEP + ")").text());
//    dmamt = getNumReplace(_crnwTR.find("td:eq(" + SPR_ADM_DMAMT + ")").text());
//    inputvat = appliedamt * vatrate;
//    ewt = appliedamt * ewtrate;
//    ewtadv = getNumReplace($("#txtLessEWT_TranHist_CD").val());
//    if (appliedamt > balance) {
//        setTimeout(function () {
//            MessageBox("Cannot proceed. Applied Amount should not exceed Balance.", "Apply Advances/Debit Memo Window", "error");
//        }, 100);
//        _crnwTR.find("td:eq(" + SPR_ADM_APPLIEDAMT + ") input").val("0.00");
//        return;
//    }
//    else if (appliedamt > (netamtdue + ewtadv)) {
//        setTimeout(function () {
//            MessageBox("Cannot proceed. Total Applied Advances exceeds Total Amount Due.", "Apply Advances/Debit Memo Window", "error");
//        }, 100);
//        _crnwTR.find("td:eq(" + SPR_ADM_APPLIEDAMT + ") input").val("0.00");
//        return;
//    }
//    else {
//        inputvat = getNumReplace(inputvat.toFixed(2));
//        ewt = getNumReplace(ewt.toFixed(2));
//        if (advamt > 0) {           
//            totalappamt = appliedamt + inputvat - ewt;
//        }
//        if (dmamt > 0) {
//            totaldmamt = appliedamt + inputvat - ewt;
//        }
//        remnetamt = netamtdue - totalappamt - totaldmamt;
//        //if (remnetamt < 0) {
//        //    remnetamt = 0;
//        //}
//        _crnwTR.find("td:eq(" + SPR_ADM_INPUTVAT + ")").text(setNumReplace(inputvat, 2));
//        _crnwTR.find("td:eq(" + SPR_ADM_EWT + ")").text(setNumReplace(ewt, 2));

//        //$("#txtTotalAppAdv").val(setNumReplace(totalappamt, 2));
//        //$("#txtTotalDMApp").val(setNumReplace(totaldmamt, 2));
//        //$("#txtRemNetAmtDue").val(setNumReplace(remnetamt, 2));
//        ComputeTotalAmt();
//        let remarks = _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") textarea").val();
//        if (remarks == "") {
//            _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnGray");
//            _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnGreen");
//            _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") button").addClass("btnBlue");
//            _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnGray");
//            _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnGreen");
//            _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ")").addClass("btnBlue");
//            _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") button").enable(true);
//            _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") textarea").val(getDataOfGrid('nwGrid', 'textarea', SPR_PARTICULARS, currRow));
//            let remarks = getDataOfGrid('nwGrid', 'textarea', SPR_PARTICULARS, currRow);
//            if (remarks != "") {
//                _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnGray");
//                _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") button").removeClass("btnBlue");
//                _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ") button").addClass("btnGreen");
//                _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnGray");
//                _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ")").removeClass("btnBlue");
//                _crnwTR.find("td:eq(" + SPR_ADM_REMARKS + ")").addClass("btnGreen");
//            }
//        }
//    }
//});

function ComputeTotalAmt() {
    //crnwTable = $("#nwGridApplyAdvDMCon .tblGridBody");
    //var len = crnwTable.find('tr').length;
    var GridADV = nwGridApplyAdvDMCon_Book.ActiveSheet;
    var len = GridADV.GetMaxRow();
    GridADV.RenderStatus = false;

    let advamt = 0, dmamt = 0;
    let adv_appliedamt = 0, adv_vat = 0, adv_ewt = 0, adv_currappliedamt = 0;
    let dm_appliedamt = 0, dm_vat = 0, dm_ewt = 0, dm_currappliedamt = 0;
    let totalappamt = 0, totaldmamt = 0, remnetamt = 0;
    let netamtdue = getNumReplace($('#txtNetAmtDue').val());
    for (var x = 0; x <= len - 1; x++) {
        //advamt = getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ADM_ADVDEP + ')').text());
        //dmamt = getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ADM_DMAMT + ')').text());
        advamt = getNumReplace(GridADV.GetValue(SPR_ADM_ADVDEP - 1, x));
        dmamt = getNumReplace(GridADV.GetValue(SPR_ADM_DMAMT - 1, x));
        if (advamt > 0) {
            //adv_appliedamt += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ADM_APPLIEDAMT + ') input').val());
            //adv_currappliedamt = getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ADM_APPLIEDAMT + ') input').val());
            adv_appliedamt += getNumReplace(GridADV.GetValue(SPR_ADM_APPLIEDAMT - 1, x));
            adv_currappliedamt = getNumReplace(GridADV.GetValue(SPR_ADM_APPLIEDAMT - 1, x));
            if (adv_currappliedamt > 0) {
                //adv_vat += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ADM_INPUTVAT + ')').text());
                //adv_ewt += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ADM_EWT + ')').text());
                adv_vat += getNumReplace(GridADV.GetValue(SPR_ADM_INPUTVAT - 1, x));
                adv_ewt += getNumReplace(GridADV.GetValue(SPR_ADM_EWT - 1, x));
            }
        }
        if (dmamt > 0) {
            //dm_appliedamt += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ADM_APPLIEDAMT + ') input').val());
            //dm_currappliedamt = getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ADM_APPLIEDAMT + ') input').val());
            dm_appliedamt += getNumReplace(GridADV.GetValue(SPR_ADM_APPLIEDAMT - 1, x));
            dm_currappliedamt = getNumReplace(GridADV.GetValue(SPR_ADM_APPLIEDAMT - 1, x));
            if (dm_currappliedamt > 0) {
                //dm_vat += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ADM_INPUTVAT + ')').text());
                //dm_ewt += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_ADM_EWT + ')').text());
                dm_vat += getNumReplace(GridADV.GetValue(SPR_ADM_INPUTVAT - 1, x));
                dm_ewt += getNumReplace(GridADV.GetValue(SPR_ADM_EWT - 1, x));
            }
        }
    }
    GridADV.RenderStatus = true;

    totalappamt = adv_appliedamt + adv_vat - adv_ewt;
    totaldmamt = dm_appliedamt + dm_vat - dm_ewt;
    remnetamt = netamtdue - totalappamt - totaldmamt;
    $("#txtTotalAppAdv").val(setNumReplace(totalappamt, 2));
    $("#txtTotalDMApp").val(setNumReplace(totaldmamt, 2));
    $("#txtRemNetAmtDue").val(setNumReplace(remnetamt, 2));
}

$(document).on('click', '#btnSaveApplyAdvDM', function () {
    msgBoxContainerQuestion = "btnSaveApplyAdvDM";
    parent_MessageBoxQuestion("Do you want to save the record?", "Apply Advances/Debit Memo Window", "Question");

    return false;
});

//$(document).on('click', '.btnADMHst', function () {
//    cust_GetPara();
//    nwPopupForm_ShowModal("AppliedAmt");
//    $("#txtDocumentNo_AA").val(crnwTR.find("td:eq(" + SPR_ADM_DOCNO + ")").text());
//    $("#txtAmount_AA").val(crnwTR.find("td:eq(" + SPR_ADM_ADVDEP + ")").text());
//    cust_GetPara();
//    nwParameter_Add("refdocno", crnwTR.find("td:eq(" + SPR_ADM_DOCNO + ")").text());
//    func_ActionDriven("actLoadAppliedAmt", false);
//});

function btnADMHst() {
    cust_GetPara();
    nwPopupForm_ShowModal("AppliedAmt");
    var GridADV = nwGridApplyAdvDMCon_Book.ActiveSheet;
    var row = GridADV.CellSelected.row - 1;
    //$("#txtDocumentNo_AA").val(crnwTR.find("td:eq(" + SPR_ADM_DOCNO + ")").text());
    //$("#txtAmount_AA").val(crnwTR.find("td:eq(" + SPR_ADM_ADVDEP + ")").text());
    $("#txtDocumentNo_AA").val(GridADV.GetValue(SPR_ADM_DOCNO - 1, row));
    $("#txtAmount_AA").val(GridADV.GetValue(SPR_ADM_ADVDEP - 1, row));
    cust_GetPara();
    //nwParameter_Add("refdocno", crnwTR.find("td:eq(" + SPR_ADM_DOCNO + ")").text());
    nwParameter_Add("refdocno", GridADV.GetValue(SPR_ADM_DOCNO - 1, row));
    func_ActionDriven("actLoadAppliedAmt", false);
}

function AppliedAmtProp() {
    //crnwTable = $("#nwGridAppAmtCon .tblGridBody tbody ");
    //var length = crnwTable.find("tr").length;
    var GridAAC = nwGridAppAmtCon_Book.ActiveSheet;
    var length = GridAAC.GetMaxRow();
    GridAAC.RenderStatus = false;
    var totalappamt = 0, balance = 0, totalamt = 0;

    totalamt = getNumReplace($("#txtAmount_AA").val());
    for (var i = 0; i < length; i++) {        
        //totalappamt += getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_AA_AMOUNT  + ")").text());  
        totalappamt += getNumReplace(GridAAC.GetValue(SPR_AA_AMOUNT - 1, i));  
    }
    balance = totalamt - totalappamt;
    $("#txtTotalAppAmt_AA").val(setNumReplace(totalappamt, 2));
    $("#txtBalance_AA").val(setNumReplace(balance, 2));
}

function ComputeNetAmount_Adv() {
    var totalamtdue = 0, totaladv = 0, totaldm = 0;
    var loc_totalamtdue = 0, loc_totaladv = 0, hom_totaldm = 0;
    var hom_totalamtdue = 0, loc_totaladv = 0, hom_totaldm = 0;
    var netamtdue = 0, loc_netamtdue = 0, hom_netamtdue = 0;   

    totalamtdue = getNumReplace($("#txtTotalAmt_TranHist").val());
    totaladv = getNumReplace($("#txtLessRecoupment_TranHist_CD").val());
    totaldm = getNumReplace($("#txtLessDM_TranHist_CD").val());

    //loc_totalamtdue = getNumReplace($("#txtTotalAmt_LocalCurr").val());
    //loc_totaladv = getNumReplace($("#txtLessRecoupment_LocalCurr").val());
    //loc_totaldm = getNumReplace($("#txtLessDM_LocalCurr").val());

    //hom_totalamtdue = getNumReplace($("#txtTotalAmt_HomeCurr").val());
    //hom_totaladv = getNumReplace($("#txtLessRecoupment_HomeCurr").val());
    //hom_totaldm = getNumReplace($("#txtLessDM_HomeCurr").val());

    //netamtdue = totalamtdue - totaladv - totaldm;
    //loc_netamtdue = loc_totalamtdue - loc_totaladv - hom_totaldm;
    //hom_netamtdue = hom_totalamtdue - hom_totaladv - hom_totaldm;

    //$("#txtNetAmt_TranHist").val(setNumReplace(netamtdue, 2));
    //$("#txtNetAmt_LocalCurr").val(setNumReplace(loc_netamtdue, 2));
    //$("#txtNetAmt_HomeCurr").val(setNumReplace(hom_netamtdue, 2));

    var lineid_CD = $("#txtLineID_CD").val();
    var Grid = nwGridCon_Book.ActiveSheet;
    Grid.SetText(SPR_ADVANCES - 1, lineid_CD, totaladv);
    Grid.SetText(SPR_DMAPP - 1, lineid_CD, totaldm);
    //$('#nwGridCon .tblGridBody tr:nth-child(' + (lineid_CD) + ') td:nth-child(' + (SPR_ADVANCES + 1) + ')').text(totaladv);
    //$('#nwGridCon .tblGridBody tr:nth-child(' + (lineid_CD) + ') td:nth-child(' + (SPR_DMAPP + 1) + ')').text(totaldm);
}

$(document).on('click', '#btnRvwAttach_AP', function () {
    var docno = $('#txtAlterPayeeID').val();

    if (docno.length > 0) {       
        var fullength = "../../../DC/DataSetup/DCViewAttachment/DCViewAttachment.aspx?nwDocno=" + docno + "";

        nwLoading_Start('xbtnRvwAttach', crLoadingHTML);
        nwPopupForm_Create("nwPopUpRvwAttach", true, fullength);
        $('#nwPopUpRvwAttach .BoxTitle').text("Review Attachment(s)");
        $("#nwPopUpRvwAttach").css({ "min-width": "98%" });
        $("#nwPopUpRvwAttach").css({ "min-height": "98%" });
        nwPopupForm_ShowModal("nwPopUpRvwAttach");
        nwLoading_End('xbtnRvwAttach');
    }
});

//Uploading
$(document).on("click", "#btnDownloadTemplate_AP", function (e) {
    e.preventDefault();
    window.open("Allocation Process Template.xlsx");

    return false;
});

$(document).on("click", '#btnUploadTemplate_AP', function (e) {
    upload_type = 'uploadalloc';
    $('#btnupload').attr("Value", 'Upload');
    $("#fileCon").val("");
    $("#status").find("span").text("");
    $(".progress").find("div.percent").text("0%`");
    $(".progress").find("div.bar").addClass("nwCuz157");
    nwPopupForm_ShowModal("nwUploadCon");
    //$("#nwUploadCon").addClass("zindexHigh1");
    return false;    
});

function SetRemarksAllocButton() {
    crnwTable = $("#nwGridAllocValListCon .tblGridBody");
    var len = crnwTable.find('tr').length;

    for (var x = 0; x <= len - 1; x++) {
        var remarks = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_APV_REMARKS + ') input').val();
        if (remarks != "") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').enable(true);
            $('#nwGridAllocValListCon .tblGridBody tr:nth-child(' + (x + 1) + ') td').enable(true);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_APV_REMARKSBTN + ') button').removeClass("btnGray");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_APV_REMARKSBTN + ') button').addClass("btnGreen");
        }
        else {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').enable(false);
            $('#nwGridAllocValListCon .tblGridBody tr:nth-child(' + (x + 1) + ') td').enable(false);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_APV_REMARKSBTN + ') button').removeClass("btnGreen");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_APV_REMARKSBTN + ') button').addClass("btnGray");
        }
    }
}

function SetRemarksButtonAlloc() {
    crnwTable = $("#nwGridAllocValListCon .tblGridBody");
    var len = crnwTable.find('tr').length;

    for (var x = 0; x <= len - 1; x++) {
        var remarks = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_APV_REMARKS + ') input').val();
        if (remarks != "") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').enable(true);
            $('#nwGridAllocValListCon .tblGridBody tr:nth-child(' + (x + 1) + ') td').enable(true);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_APV_REMARKSBTN + ') button').removeClass("btnGray");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_APV_REMARKSBTN + ') button').addClass("btnGreen");
        }
        else {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').enable(false);
            $('#nwGridAllocValListCon .tblGridBody tr:nth-child(' + (x + 1) + ') td').enable(false);
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_APV_REMARKSBTN + ') button').removeClass("btnGreen");
            crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_APV_REMARKSBTN + ') button').addClass("btnGray");
        }
    }
}

$(document).on('click', '#btnExportUploading_Alloc', function () {
    //nwLoading_Start("xbtnExportUploading_Alloc", crLoadingHTML);
    //nwParameter_Add("idvallugLocAcctForms", $("#idvallugLocAcctForms").val());
    //nwParameter_Add("idvallugOrigCCC", $("#idvallugOrigCCC").val());
    //func_ActionDriven("actAllocExport_Uploading", false);
    nwGridAllocValListCon_Book.ActiveSheet.exportColumn = true;
    p8Spread_Export(nwGridAllocValListCon_Book, "Allocation Process Uploading");
});

//Start of Create SBR 
$(document).on('mousedown', '#noah-webui-default-CreateSBR', function () {
    //Validation
    var errMsg = ChkIfHasBgtChkDtls();

    if (errMsg == "") {
        nwLoading_Start('LoadingCreateSBR', crLoadingHTML);
        nwParameter_Add("txtDocno", $('#txtDocno').val());
        nwParameter_Add("txtTrantype", $('#txtTrantype').val());
        //$('.BoxResize').css('display', 'none');
        func_ActionDriven("actGenCreateSBR", false);
    }
    else {
        MessageBox(errMsg, Title, "error");
    }

    return false;
});

function ChkIfHasBgtChkDtls() {
    var $row = '';
    var rowCnt = 0;
    var hasSavedBgtChk = false;
    var hasLineId = false;
    var errorStr = '';

    //crnwTable = $("#nwGridCon .tblGridBody");
    //var len = crnwTable.find('tr').length;
    var Grid = nwGridCon_Book.ActiveSheet;
    var len = Grid.GetMaxRow();
    Grid.RenderStatus = false;
    for (var x = 0; x <= len - 1; x++) {
        //hasSavedBgtChk = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_BDGTTAG + ')').text() != "" ? true : false;
        //hasLineId = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_LINEID + ')').text() != "" ? true : false;
        hasSavedBgtChk = Grid.GetValue(SPR_BDGTTAG - 1, x) != "" ? true : false;
        hasLineId = Grid.GetValue(SPR_LINEID - 1, x) != "" ? true : false;

        if (!hasSavedBgtChk && hasLineId) {
            errorStr += "Cannot be processed. Budget Checking Details is required at row " + rowCnt + ".\n";
        }
    }
    Grid.RenderStatus = true;
    return errorStr;
}

function AllowCreationOfSBR(isAllow) {
    $('.btnCreateSBR').enable(isAllow.toLowerCase() == "true" ? true : false);
}

function DisableSBRBtn(isEnable) {
    $(`#btnSupplemental`).enable(isEnable.toLowerCase() == "true" ? true : false);
    $(`#btnRealignment`).enable(isEnable.toLowerCase() == "true" ? true : false);
}

var avar = 1;
$(document).on('click', '#btnSupplemental', function () {

    if ($('#txtValidSup').val() != "") {
        MessageBox($('#txtValidSup').val(), Title, "error");
        return false;
    }

    var docno = $('#txtDocno').val();
    var fullength = `../../../ADB/DocumentEntry/ADBSupplementalBudgetEntry/ADBSupplementalBudgetEntry.aspx?nwpart=${avar}&nwRefDocno=${encodeURI(docno)}&nwIsRequest=1`;
    avar++;
    nwLoading_Start('xLoadingSupplemental', crLoadingHTML);

    nwPopupForm_Create("nwPopUpSupplemental", true, fullength);
    $('#nwPopUpSupplemental .BoxTitle').text("Supplemental Budget Entry");
    $("#nwPopUpSupplemental").css({ "min-width": "98%" });
    $("#nwPopUpSupplemental").css({ "min-height": "98%" });

    nwPopupForm_ShowModal("nwPopUpSupplemental");

    //HIDE 
    nwPopupForm_HideModal("nwCreateSBR");
    nwLoading_End('xLoadingSupplemental');
    return false;
});


$(document).on('click', '#btnRealignment', function () {

    if ($('#txtValidRea').val() != "") {
        MessageBox($('#txtValidRea').val(), Title, "error");
        return false;
    }

    var docno = $('#txtDocno').val();
    var fullength = `../../../ADB/DocumentEntry/ADBBudgetRealignmentEntry/ADBBudgetRealignmentEntry.aspx?nwpart=${avar}&nwRefDocno=${encodeURI(docno)}`;
    avar++;
    nwLoading_Start('xLoadingRealignment', crLoadingHTML);

    nwPopupForm_Create("nwPopUpRealignment", true, fullength);
    $('#nwPopUpRealignment .BoxTitle').text("Budget Realignment Entry");
    $("#nwPopUpRealignment").css({ "min-width": "98%" });
    $("#nwPopUpRealignment").css({ "min-height": "98%" });

    nwPopupForm_ShowModal("nwPopUpRealignment");

    //HIDE 
    nwPopupForm_HideModal("nwCreateSBR");
    nwLoading_End('xLoadingRealignment');
    return false;
});

//$(document).on('click', '.btnVwJrnl', function () {
//    nwLoading_Start("xchkJrnlEntry", crLoadingHTML);
//    export_type = '3';
//    $("#consoJrnlEntry").hide();
//    $("#chkJrnlEntry").hide();
//    $("#txtLineIDJrnl").val(crnwTR.find("td:eq(" + SPR_LINEID + ")").text());
//    $(".BoxClose").show();
//    nwPopupForm_ShowModal("ViewJournal");
//    cust_GetPara();
//    nwParameter_Add("lineID", crnwTR.find("td:eq(" + SPR_LINEID + ")").text());
//    func_ActionDriven("actViewJournalPerLin", false);
//});

$(document).on('click', '#btnExportJrnl', function () {
    nwLoading_Start("xbtnExportJrnl", crLoadingHTML);
    cust_GetPara();
    nwParameter_Add("lineID", $("#txtLineIDJrnl").val());
    nwParameter_Add("export_type", export_type);
    func_ActionDriven("actExport_UploadingJrnl", false);
});

function ViewItemMaster(itemcode) {
    nwLoading_Start("xItemMaster", crLoadingHTML);
    var fullength = "";
    var title = "";

    if (itemcode.length > 0) {
        title = "Item Master";
        fullength = "../../../SG/DataSetup/SGItemMaster/SGItemMaster.aspx?nwItemDetails=" + encodeURI(itemcode);
        $('.nwmenuFrame').attr("src", fullength);

        nwPopupForm_Create("nwPopItemMasterWindow", true, fullength);
        $('#nwPopItemMasterWindow .BoxTitle').text(title);

        $("#nwPopItemMasterWindow").css({ "min-width": "90%" });
        $("#nwPopItemMasterWindow").css({ "min-height": "90%" });
        nwPopupForm_ShowModal("nwPopItemMasterWindow");
        $('.dimbgNWnwPopWindow').removeClass('openn');
    }
    nwLoading_End('xItemMaster');
}

//$(document).on('click', '.btnBdgtDtls', function () {
//    let igt = crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text();
//    let qty = getNumReplace(crnwTR.find("td:eq(" + SPR_CD_QTY + ") input").val());
//    let ocyamt = getNumReplace(crnwTR.find("td:eq(" + SPR_CD_OCYAMT_VATEX + ")").text());   
//    let cc = '', pc = '';
//    switch (ccflag) {
//        case "02":
//            cc = crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text();
//            break;
//        case "03":
//            cc = crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text();
//            break;
//        case "04":
//            cc = crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text();
//            break;
//        case "05":
//            cc = crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text();
//            break;
//        case "06":
//            cc = crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text();
//            break;
//    }
//    switch (pcflag) {
//        case "02":
//            pc = crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text();
//            break;
//        case "03":
//            pc = crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text();
//            break;
//        case "04":
//            pc = crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text();
//            break;
//        case "05":
//            pc = crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text();
//            break;
//        case "06":
//            pc = crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text();
//            break;
//    }

//    if (crnwTR.find("td:eq(" + SPR_CD_LINETYPE + ") select").val() == "1" && igt != '' && qty != 0 && ocyamt != 0 && cc != '' && pc != '') {
//        nwLoading_Start("xbtnBdgtDtls", crLoadingHTML);

//        //Fill Headers
//        $('#idvallugBdgtChk_Item').val(crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text());
//        $('#descvallugBdgtChk_Item').val(crnwTR.find("td:eq(" + SPR_CD_ITEMDESC + ")").text());
//        $('#idvallugBdgtChk_ItemGrpType').val(crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text());
//        $('#descvallugBdgtChk_ItemGrpType').val(crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPEDESC + ")").text());
//        //$('#txtBdgtchk_RowNum').val(rownum);
//        $('#txtBdgtchk_UnitCostVatex').val(crnwTR.find("td:eq(" + SPR_CD_UNITCOST_VATEX + ")").text());
//        $('#txtBCLItemCode').val(crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text());
//        $('#txtBCLUom').val(crnwTR.find("td:eq(" + SPR_CD_UOM + ")").text());
//        $('#txtBCLLineID').val($("#txtLineID_CD").val());
//        $('#txtBdgtchkQty').val(crnwTR.find("td:eq(" + SPR_CD_QTY + ") input").val());
//        $('#txtBdgtchkVatex').val(crnwTR.find("td:eq(" + SPR_CD_OCYAMT_VATEX + ")").text());
//        $("#idvallugBdgtChk_GLAccntChrge").val(crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text());
//        $("#descvallugBdgtChk_GLAccntChrge").val(crnwTR.find("td:eq(" + SPR_CD_SEG1DESC + ")").text());

//        crnwTable = $("#nwGridChargeDtlsCon .tblGridBody");
//        var len = crnwTable.find('tr').length;

//        let totalQty = 0, totalVATEX = 0;

//        for (var x = 0; x <= len - 1; x++) {
//            if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').val() == "1") {
//                totalQty += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_QTY + ') input').val());
//                totalVATEX += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text());
//            }
//        }

//        $('#txtTotalQty_BCD').val(setNumReplace(totalQty, 2));
//        $('#txtTotalAmntVatex').val(setNumReplace(totalVATEX, 2));
//        nwPopupForm_ShowModal('nwBdgtCheckingWindow');
//        $("#nwBdgtCheckingWindow").addClass("zindexHigh2");
//        $('#tab-one,#tab-two,#tab-three').prop('checked', true);
//        //nwParameter_Add("hasBdgtChkDtls", hasBdgtChkDtls);
//        //nwParameter_Add("hasJson", HasJsonTempBdgtChk(itemCode, uom) >= 0 ? true : false);
//        //nwParameter_Add("jsonBdgtChk", JSON.stringify(jsonBdgtChk.filter(i => (i.itemCode + i.UOM) == itemCode + uom)));
//        nwParameter_Add("txtDocno", $('#txtDocno').val());
//        nwParameter_Add("txtBCLLineID", $('#txtBCLLineID').val());
//        nwParameter_Add("itemGrpTypeCode", crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text());
//        //nwParameter_Add("txtTrantype", $('#txtTrantype').val());
//        nwParameter_Add("locform", $("#idvallugLocAcctForms").val());
//        nwParameter_Add("costCenter", $("#idvallugOrigCCC").val());
//        //nwParameter_Add("hasData", getGridData('nwGrid', '', Main.GRD_HASBDGTCHK, crnwTR.index()));
//        nwParameter_Add("itemCode", crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text());
//        nwParameter_Add("reason", $('#idvallugRsnReq').val());
//        nwParameter_Add("txtReasonType", $('#txtReasonType').val());
//        nwParameter_Add("idvallugBdgtChk_GLAccntChrge", crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text());
//        nwParameter_Add("txtValueDate", $('#txtDocDate').val());
//        nwParameter_Add("idvallugCurrency", $('#idvallugCurrency').val());
//        nwParameter_Add("nwDocno", nwDocno);
//        //nwParameter_Add("txtBdgtchk_PC", $('#txtBdgtchk_PC').val());

//        nwParameter_Add_Table("nwGridChargeDtlsCon");
//        nwParameter_Add("seg1", crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text());
//        nwParameter_Add("seg2", crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text());
//        nwParameter_Add("seg3", crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text());
//        nwParameter_Add("seg4", crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text());
//        nwParameter_Add("seg5", crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text());
//        nwParameter_Add("seg6", crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text());
//        nwParameter_Add("igtCode", crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text());
//        nwParameter_Add("itemCode", crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text());
//        nwParameter_Add("txtDocno", $("#txtDocno").val());
//        nwParameter_Add("idvallugCurrency", $("#idvallugCurrency").val());
//        func_ActionDriven("actLoadBdgtCheck", false);
//    }
//});

function btnBdgtDtls() {
    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;
    var row = GridCD.CellSelected.row - 1;
    var len = GridCD.GetMaxRow();
    //let igt = crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text();
    //let qty = getNumReplace(crnwTR.find("td:eq(" + SPR_CD_QTY + ") input").val());
    //let ocyamt = getNumReplace(crnwTR.find("td:eq(" + SPR_CD_OCYAMT_VATEX + ")").text());   
    let igt = GridCD.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, row);
    let qty = getNumReplace(GridCD.GetValue(SPR_CD_QTY - 1, row));
    let ocyamt = getNumReplace(GridCD.GetValue(SPR_CD_OCYAMT_VATEX - 1, row));   
    let cc = '', pc = '';
    switch (ccflag) {
        case "02":
            //cc = crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text();
            cc = GridCD.GetValue(SPR_CD_SEG2 - 1, row);
            break;
        case "03":
            //cc = crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text();
            cc = GridCD.GetValue(SPR_CD_SEG3 - 1, row);
            break;
        case "04":
            //cc = crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text();
            cc = GridCD.GetValue(SPR_CD_SEG4 - 1, row);
            break;
        case "05":
            //cc = crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text();
            cc = GridCD.GetValue(SPR_CD_SEG5 - 1, row);
            break;
        case "06":
            //cc = crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text();
            cc = GridCD.GetValue(SPR_CD_SEG6 - 1, row);
            break;
    }
    switch (pcflag) {
        case "02":
            //pc = crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text();
            pc = GridCD.GetValue(SPR_CD_SEG2 - 1, row);
            break;
        case "03":
            //pc = crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text();
            pc = GridCD.GetValue(SPR_CD_SEG3 - 1, row);
            break;
        case "04":
            //pc = crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text();
            pc = GridCD.GetValue(SPR_CD_SEG4 - 1, row);
            break;
        case "05":
            //pc = crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text();
            pc = GridCD.GetValue(SPR_CD_SEG5 - 1, row);
            break;
        case "06":
            //pc = crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text();
            pc = GridCD.GetValue(SPR_CD_SEG6 - 1, row);
            break;
    }
    
    let linetype = GridCD.GetValue(SPR_CD_LINETYPE - 1, row);
    if (linetype == "1" && igt != '' && qty != 0 && ocyamt != 0 && cc != '' && pc != '') {
        nwLoading_Start("xbtnBdgtDtls", crLoadingHTML);

        //Fill Headers
        //$('#idvallugBdgtChk_Item').val(crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text());
        //$('#descvallugBdgtChk_Item').val(crnwTR.find("td:eq(" + SPR_CD_ITEMDESC + ")").text());
        //$('#idvallugBdgtChk_ItemGrpType').val(crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text());
        //$('#descvallugBdgtChk_ItemGrpType').val(crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPEDESC + ")").text());
        ////$('#txtBdgtchk_RowNum').val(rownum);
        //$('#txtBdgtchk_UnitCostVatex').val(crnwTR.find("td:eq(" + SPR_CD_UNITCOST_VATEX + ")").text());
        //$('#txtBCLItemCode').val(crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text());
        //$('#txtBCLUom').val(crnwTR.find("td:eq(" + SPR_CD_UOM + ")").text());

        $('#idvallugBdgtChk_Item').val(GridCD.GetValue(SPR_CD_ITEMCODE - 1, row));
        $('#descvallugBdgtChk_Item').val(GridCD.GetValue(SPR_CD_ITEMDESC - 1, row));
        $('#idvallugBdgtChk_ItemGrpType').val(GridCD.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, row));
        $('#descvallugBdgtChk_ItemGrpType').val(GridCD.GetValue(SPR_CD_ITEMGRPTYPEDESC - 1, row));
        //$('#txtBdgtchk_RowNum').val(rownum);
        $('#txtBdgtchk_UnitCostVatex').val(GridCD.GetValue(SPR_CD_UNITCOST_VATEX - 1, row));
        $('#txtBCLItemCode').val(GridCD.GetValue(SPR_CD_ITEMCODE - 1, row));
        $('#txtBCLUom').val(GridCD.GetValue(SPR_CD_UOM - 1, row));
        $('#txtBCLLineID').val($("#txtLineID_CD").val());
        $('#txtBdgtchkQty').val(GridCD.GetValue(SPR_CD_QTY - 1, row));
        $('#txtBdgtchkVatex').val(GridCD.GetValue(SPR_CD_OCYAMT_VATEX - 1, row));
        $("#idvallugBdgtChk_GLAccntChrge").val(GridCD.GetValue(SPR_CD_SEG1 - 1, row));
        $("#descvallugBdgtChk_GLAccntChrge").val(GridCD.GetValue(SPR_CD_SEG1DESC - 1, row));

        //$('#txtBdgtchkQty').val(crnwTR.find("td:eq(" + SPR_CD_QTY + ") input").val());
        //$('#txtBdgtchkVatex').val(crnwTR.find("td:eq(" + SPR_CD_OCYAMT_VATEX + ")").text());
        //$("#idvallugBdgtChk_GLAccntChrge").val(crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text());
        //$("#descvallugBdgtChk_GLAccntChrge").val(crnwTR.find("td:eq(" + SPR_CD_SEG1DESC + ")").text());

        //crnwTable = $("#nwGridChargeDtlsCon .tblGridBody");
        //var len = crnwTable.find('tr').length;

        let totalQty = 0, totalVATEX = 0;

        for (var x = 0; x <= len - 1; x++) {
            let linetype = Grid.GetValue(SPR_CD_LINETYPE - 1, x);
            if (linetype == "1") {
                //totalQty += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_QTY + ') input').val());
                //totalVATEX += getNumReplace(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_OCYAMT_VATEX + ')').text());
                totalQty += getNumReplace(GridCD.GetValue(SPR_CD_QTY - 1, x));
                totalVATEX += getNumReplace(GridCD.GetValue(SPR_CD_OCYAMT_VATEX - 1, x));
            }
        }

        $('#txtTotalQty_BCD').val(setNumReplace(totalQty, 2));
        $('#txtTotalAmntVatex').val(setNumReplace(totalVATEX, 2));
        nwPopupForm_ShowModal('nwBdgtCheckingWindow');
        //$("#nwBdgtCheckingWindow").addClass("zindexHigh2");
        //$('#tab-one,#tab-two,#tab-three').prop('checked', true);
        //nwParameter_Add("hasBdgtChkDtls", hasBdgtChkDtls);
        //nwParameter_Add("hasJson", HasJsonTempBdgtChk(itemCode, uom) >= 0 ? true : false);
        //nwParameter_Add("jsonBdgtChk", JSON.stringify(jsonBdgtChk.filter(i => (i.itemCode + i.UOM) == itemCode + uom)));
        nwParameter_Add("txtDocno", $('#txtDocno').val());
        nwParameter_Add("txtBCLLineID", $('#txtBCLLineID').val());
        //nwParameter_Add("itemGrpTypeCode", crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text());
        nwParameter_Add("itemGrpTypeCode", GridCD.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, row));
        //nwParameter_Add("txtTrantype", $('#txtTrantype').val());
        nwParameter_Add("locform", $("#idvallugLocAcctForms").val());
        nwParameter_Add("costCenter", $("#idvallugOrigCCC").val());
        //nwParameter_Add("hasData", getGridData('nwGrid', '', Main.GRD_HASBDGTCHK, crnwTR.index()));
        //nwParameter_Add("itemCode", crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text());
        nwParameter_Add("itemCode", GridCD.GetValue(SPR_CD_ITEMCODE - 1, row));
        nwParameter_Add("reason", $('#idvallugRsnReq').val());
        nwParameter_Add("txtReasonType", $('#txtReasonType').val());
        //nwParameter_Add("idvallugBdgtChk_GLAccntChrge", crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text());
        nwParameter_Add("idvallugBdgtChk_GLAccntChrge", GridCD.GetValue(SPR_CD_SEG1 - 1, row));
        nwParameter_Add("txtValueDate", $('#txtDocDate').val());
        nwParameter_Add("idvallugCurrency", $('#idvallugCurrency').val());
        nwParameter_Add("nwDocno", nwDocno);
        //nwParameter_Add("txtBdgtchk_PC", $('#txtBdgtchk_PC').val());

        //nwParameter_Add_Table("nwGridChargeDtlsCon");
        nwParameter_Add_Spread(nwGridChargeDtlsCon_Book);
        //nwParameter_Add("seg1", crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text());
        //nwParameter_Add("seg2", crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text());
        //nwParameter_Add("seg3", crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text());
        //nwParameter_Add("seg4", crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text());
        //nwParameter_Add("seg5", crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text());
        //nwParameter_Add("seg6", crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text());
        //nwParameter_Add("igtCode", crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text());
        //nwParameter_Add("itemCode", crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text());
        nwParameter_Add("seg1", GridCD.GetValue(SPR_CD_SEG1 - 1, row));
        nwParameter_Add("seg2", GridCD.GetValue(SPR_CD_SEG2 - 1, row));
        nwParameter_Add("seg3", GridCD.GetValue(SPR_CD_SEG3 - 1, row));
        nwParameter_Add("seg4", GridCD.GetValue(SPR_CD_SEG4 - 1, row));
        nwParameter_Add("seg5", GridCD.GetValue(SPR_CD_SEG5 - 1, row));
        nwParameter_Add("seg6", GridCD.GetValue(SPR_CD_SEG6 - 1, row));
        nwParameter_Add("igtCode", GridCD.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, row));
        nwParameter_Add("itemCode", GridCD.GetValue(SPR_CD_ITEMCODE - 1, row));
        nwParameter_Add("txtDocno", $("#txtDocno").val());
        nwParameter_Add("idvallugCurrency", $("#idvallugCurrency").val());
        func_ActionDriven("actLoadBdgtCheck", false);
    }
}

function BudgetChargingProp() {
    //crnwTable = $("#nwGridBdgtChargingCon .tblGridBody");;
    //var len = crnwTable.find('tr').length;
    var GridBC = nwGridBdgtChargingCon_Book.ActiveSheet;
    var len = GridBC.GetMaxRow();
    GridBC.RenderStatus = false;
    for (var x = 0; x <= len - 1; x++) {       
        let reqalloc = GridBC.GetValue(SPR_BCD_REQALLOC - 1, x);
        if (reqalloc == "1") {
            GridBC.SetEnable(SPR_BCD_ALLOCDTLS - 1, x, true);
            GridBC.SetBackground(SPR_BCD_ALLOCDTLS - 1, x, "blue");
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_BCD_ALLOCDTLS + ')').enable(true);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_BCD_ALLOCDTLS + ')').addClass("btnAllocProc");
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_BCD_ALLOCDTLS + ')').removeClass("btnGreen");
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_BCD_ALLOCDTLS + ')').removeClass("btnGray");
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_BCD_ALLOCDTLS + ')').addClass("btnBlue");
        }
        else {
            GridBC.SetEnable(SPR_BCD_ALLOCDTLS - 1, x, false);
            GridBC.SetBackground(SPR_BCD_ALLOCDTLS - 1, x, "gray");
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_BCD_ALLOCDTLS + ')').enable(false);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_BCD_ALLOCDTLS + ')').removeClass("btnAllocProc");
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_BCD_ALLOCDTLS + ')').removeClass("btnGreen");
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_BCD_ALLOCDTLS + ')').removeClass("btnBlue");
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_BCD_ALLOCDTLS + ')').addClass("btnGray");
        }
        let alloctag = GridBC.GetValue(SPR_BCD_ALLOCDTLSTAG - 1, x);
        if (alloctag == "1") {
            GridBC.SetEnable(SPR_BCD_ALLOCDTLS - 1, x, true);
            GridBC.SetBackground(SPR_BCD_ALLOCDTLS - 1, x, "green");
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_BCD_ALLOCDTLS + ')').removeClass("btnGray");
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_BCD_ALLOCDTLS + ')').removeClass("btnBlue");
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_BCD_ALLOCDTLS + ')').addClass("btnGreen");
        }
    }
    GridBC.RenderStatus = true;

}

$(document).on('click', '#btnVwConsoCharging', function () {
    nwLoading_Start("xbtnVwConsoCharging", crLoadingHTML);
    nwPopupForm_ShowModal("ViewConsoCharging");
    cust_GetPara();       
    //crnwTable = $("#nwGridCon .tblGridBody tbody");
    //var length = crnwTable.find("tr").length;
    var Grid = nwGridCon_Book.ActiveSheet;
    var length = Grid.GetMaxRow();
    Grid.RenderStatus = false;
    var tmpDocnoList = "";

    for (var i = 0; i < length; i++) {
        let tmpid = Grid.GetValue(SPR_TMPID - 1, i);
        if (tmpid != "") {
            //tmpDocnoList += crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_TMPID + ")").text() + "|";
            tmpDocnoList += Grid.GetValue(SPR_TMPID - 1, i) + "|";
        }
    }
    Grid.RenderStatus = true;
    nwParameter_Add("tmpDocnoList", tmpDocnoList)
    func_ActionDriven("actbtnVwConsoCharging", false);
});


function LiquidationCol() {
    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;
    var row = GridCD.CellSelected.row - 1;
    var col = GridCD.CellSelected.col - 1;
    var Grid = nwGridCon.ActiveSheet;
    //var row = Grid.CellSelected.row - 1;
    //var col = Grid.CellSelected.col - 1;
    let vendorTag = $("#txtVendorTag").val();
    let docno = $("#txtDocno").val();
    if ((vendorTag == 'employee' && cd_controls == "0") || taxConvert == "3" && vendorTag == 'employee') {
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFNO + 1) + ') input').enable(true);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFDATE + 1) + ') input').enable(true);
        GridCD.SetEnable(SPR_CD_REFNO - 1, Spread_ALLROW, true);
        GridCD.SetEnable(SPR_CD_REFDATE - 1, Spread_ALLROW, true);

        if ($('#nwGridChargeDtlsCon .tblGridBody tr:nth-child(' + (rowCD + 2) + ') td:nth-child(' + (SPR_CD_REFNO + 1) + ') input').val() == "") {
            GridCD.SetText(SPR_CD_REFNO - 1, Spread_ALLROW, Grid.GetValue(SPR_REFNO - 1, mainGridCurr));
            GridCD.SetText(SPR_CD_REFDATE - 1, Spread_ALLROW, Grid.GetValue(SPR_REFDATE - 1, mainGridCurr));
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFNO + 1) + ') input').val(getDataOfGrid('nwGrid', 'input', SPR_REFNO, mainGridCurr.index()));
            //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFDATE + 1) + ') input').val(getDataOfGrid('nwGrid', 'input', SPR_REFDATE, mainGridCurr.index()));
        }
        ////if (docno == "" || lineID == "") {
        //if ($('#nwGridChargeDtlsCon .tblGridBody tr:nth-child(' + (rowCD + 2) + ') td:nth-child(' + (SPR_CD_REFNO + 1) + ') input').val() == "") {
        //    $('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFNO + 1) + ') input').val(getDataOfGrid('nwGrid', 'input', SPR_REFNO, mainGridCurr.index()));
        //    $('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFDATE + 1) + ') input').val(getDataOfGrid('nwGrid', 'input', SPR_REFDATE, mainGridCurr.index()));
        //}       
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFNO + 1) + ')').css("background-color", "");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFNO + 1) + ') input').css("background-color", "");        
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFDATE + 1) + ')').css("background-color", "");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFDATE + 1) + ') input').css("background-color", "");        
    }
    else {
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFNO + 1) + ') input').enable(false);
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFDATE + 1) + ') input').enable(false);
        GridCD.SetEnable(SPR_CD_REFNO - 1, Spread_ALLROW, false);
        GridCD.SetEnable(SPR_CD_REFDATE - 1, Spread_ALLROW, false);

        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFNO + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFNO + 1) + ') input').css("background-color", "gainsboro");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFNO + 1) + ') input').css("border", "none");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFDATE + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFDATE + 1) + ') input').css("background-color", "gainsboro");
        //$('#nwGridChargeDtlsCon .tblGridBody tr td:nth-child(' + (SPR_CD_REFDATE + 1) + ') input').css("border", "none");
    }
}

//Start of Enhancements
//$(document).on('click', '.nwCusGridClick', function () {    
//    CustomizeLoadByClick();
//});

function ClearCDHdrFooter() {
    $("#idvallugRefTranNo").val("");
    $("#descvallugRefTranNo").val("");
    $("#idvallugRefNoSI").val("");
    $("#descvallugRefNoSI").val("");
    $("#idvallugDRCOCNo").val("");
    $("#descvallugDRCOCNo").val("");
    $("#idvallugPaymentTerm").val("");
    $("#descvallugPaymentTerm").val("");
    $("#txtCounterDate_CD").val("");
    $("#txtDueDate_CD").val("");
    $("#txtGrossAmt_CD").val("");

    $("#txtSubtotal_TranHist_CD").val("");
    $("#txtAddVat_TranHist_CD").val("");
    $("#txtGrossAmt_TranHist_CD").val("");
    $("#txtLessEWT_TranHist_CD").val("");
    $("#txtTotalAmt_TranHist_CD").val("");
    $("#txtLessRecoupment_TranHist_CD").val("");
    $("#txtLessDM_TranHist_CD").val("");
    $("#txtRetention_TranHist_CD").val("");
    $("#txtNetAmt_TranHist_CD").val("");

    $("#txtSubtotal_LocalCurr_CD").val("");
    $("#txtAddVat_LocalCurr_CD").val("");
    $("#txtGrossAmt_LocalCurr_CD").val("");
    $("#txtLessEWT_LocalCurr_CD").val("");
    $("#txtTotalAmt_LocalCurr_CD").val("");
    $("#txtLessRecoupment_LocalCurr_CD").val("");
    $("#txtLessDM_LocalCurr_CD").val("");
    $("#txtRetention_LocalCurr_CD").val("");
    $("#txtNetAmt_LocalCurr_CD").val("");

    $("#txtSubtotal_HomeCurr_CD").val("");
    $("#txtAddVat_HomeCurr_CD").val("");
    $("#txtGrossAmt_HomeCurr_CD").val("");
    $("#txtLessEWT_HomeCurr_CD").val("");
    $("#txtTotalAmt_HomeCurr_CD").val("");
    $("#txtLessRecoupment_HomeCurr_CD").val("");
    $("#txtLessDM_HomeCurr_CD").val("");
    $("#txtRetention_HomeCurr_CD").val("");
    $("#txtNetAmt_HomeCurr_CD").val("");
}

function DisablePrepayment() {
    $("#rdbAmortEqually_PD").enable(false);
    $("#rdbAmortSchd_PD").enable(false);    
    var GridPD = nwGridPrepaymentCon_Book.ActiveSheet;

    GridPD.SetEnable(SPR_STARTAMORT - 1, Spread_ALLROW, false);
    GridPD.SetEnable(SPR_NOPERIODS - 1, Spread_ALLROW, false);
    GridPD.SetEnable(SPR_ENDAMORT - 1, Spread_ALLROW, false);
    GridPD.SetEnable(SPR_DEF_AMORTDATE - 1, Spread_ALLROW, false);
    GridPD.SetEnable(SPR_DEF_AMOUNT - 1, Spread_ALLROW, false);
    //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_STARTAMORT + 1) + ') input').enable(false);
    //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_NOPERIODS + 1) + ') input').enable(false);
    //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_ENDAMORT + 1) + ') input').enable(false);
    //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_PCCCALLOC + 1) + ')').enable(false);

    //$('#nwGridPrepayDefCon .tblGridBody tr td:nth-child(' + (SPR_DEF_AMORTDATE + 1) + ') input').enable(false);
    //$('#nwGridPrepayDefCon .tblGridBody tr td:nth-child(' + (SPR_DEF_AMOUNT + 1) + ') input').enable(false);
    //$('#nwGridPrepayDefCon .tblGridBody tr td:nth-child(' + (SPR_DEF_AMORTDATE + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridPrepayDefCon .tblGridBody tr td:nth-child(' + (SPR_DEF_AMOUNT + 1) + ')').css("background-color", "gainsboro");
    
    //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_STARTAMORT + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_ENDAMORT + 1) + ')').css("background-color", "gainsboro");
    //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_NOPERIODS + 1) + ')').css("background-color", "gainsboro");

    if (isLevel1 == "0" && nwDocno != "") {
        GridPD.SetBackground(SPR_PCCCALLOC - 1, SPR_PCCCALLOC, "green");
        GridPD.SetEnable(SPR_PCCCALLOC - 1, SPR_PCCCALLOC, true);
        //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_PCCCALLOC + 1) + ')').addClass("btnPcCcAlloc");
        //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_PCCCALLOC + 1) + ')').addClass("btnGreen");
        //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_PCCCALLOC + 1) + ')').removeClass("btnBlue");
        //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_PCCCALLOC + 1) + ')').removeClass("btnGray");

        //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_PCCCALLOC + 1) + ')').enable(true);
    } else {
        GridPD.SetBackground(SPR_PCCCALLOC - 1, SPR_PCCCALLOC, "gray");
        GridPD.SetEnable(SPR_PCCCALLOC - 1, SPR_PCCCALLOC, false);
        //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_PCCCALLOC + 1) + ')').removeClass("btnPcCcAlloc");
        //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_PCCCALLOC + 1) + ')').removeClass("btnGreen");
        //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_PCCCALLOC + 1) + ')').removeClass("btnBlue");
        //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_PCCCALLOC + 1) + ')').addClass("btnGray");

        //$('#nwGridPrepaymentCon .tblGridBody tr td:nth-child(' + (SPR_PCCCALLOC + 1) + ')').enable(false);
    }
}

function RemarksConfig() {
    if (remarksConfig == "True") {
        $("#txtRemarks").css({ "text-transform": "uppercase" });
        $("#txtOthrPayIns").css({ "text-transform": "uppercase" });
        $("#txtDisapprvRemarks").css({ "text-transform": "uppercase" });
        $("#txtRemarksHold").css({ "text-transform": "uppercase" });
        $("#txtnwgRemarks").css({ "text-transform": "uppercase" });
        $(".txtRemarks_CD").css({ "text-transform": "uppercase" });
    }
    else {
        $("#txtRemarks").css({ "text-transform": "none" });
        $("#txtOthrPayIns").css({ "text-transform": "none" });
        $("#txtDisapprvRemarks").css({ "text-transform": "none" });
        $("#txtRemarksHold").css({ "text-transform": "none" });
        $("#txtnwgRemarks").css({ "text-transform": "none" });
        $(".txtRemarks_CD").css({ "text-transform": "none" });        
    }
}

function DisableCDHdr() {
    $("#btnTaxConvert").enable(false);
    $("#btnResetTax").enable(false);
    $("#btnApplyAdvDM").enable(false);
}

function EnableCDHdr() {    
    $("#btnTaxConvert").enable(true);
    $("#btnResetTax").enable(true);
    $("#btnApplyAdvDM").enable(true);
}

function EnableRecurring() {
    $("#btnSaveRecurring").enable(true);
    $("#btnSavePrepayment").enable(true);
    $("#chkAllowRecur").enable(true);
    $("#chkApplyToAll_Recur").enable(true);
    $("#txtNextRecur").prop("disabled", false);
    $("#txtNoRecur_RD").prop("disabled", false);
    $("#txtEndRecur_RD").prop("disabled", false);
}

function EnablePrepayment() {
    $("#btnSavePrepayment").enable(true);
    $("#rdbAmortEqually_PD").enable(true);
    $("#rdbAmortSchd_PD").enable(true);
}

$(document).on('click', '#btnCollapseAll', function () {
    if ($("#btnCollapseAll").text() == 'Expand All') {
        $("#btnCollapseAll").text("Collapse All");
        $('#tab-main-two, #tab-main-three, #tab-main-four, #tab-main-five, #tab-main-six, #tab-main-seven').prop('checked', true);
        //window.location.href = window.location.href.replace(window.location.hash, "") + "#contentCollapse";
    }
    else {
        $("#btnCollapseAll").text("Expand All");
        $('#tab-main-two, #tab-main-three, #tab-main-four, #tab-main-five, #tab-main-six, #tab-main-seven').prop('checked', false);
    }
});

function PropPrepayDefGrid() {
    //crnwTable = $("#nwGridPrepayDefCon .tblGridBody tbody ");
    //var length = crnwTable.find("tr").length;
    var GridPD = nwGridPrepayDefCon_Book.ActiveSheet;
    var length = GridPD.GetMaxRow();
    GridPD.RenderStatus = false;
    for (var i = 0; i < length; i++) {
        let amortdate = GridPD.GetValue(SPR_DEF_AMORTDATE - 1, i);
        let defamt = GridPD.GetValue(SPR_DEF_AMOUNT - 1, i);
        GridPD.SetText2(SPR_DEF_PCCC - 1, i, "...");
        GridPD.SetTextAlign(SPR_DEF_PCCC - 1, i, "center");
        GridPD.SetTextColor(SPR_DEF_PCCC - 1, i, "white");
        GridPD.SetBold(SPR_DEF_PCCC - 1, i, "bold");
        if (amortdate != "" && defamt != "") {
            GridPD.SetBackground(SPR_DEF_PCCC - 1, i, "green");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DEF_PCCC + ")").removeClass("btnGray");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DEF_PCCC + ")").addClass("btnPcCcAlloc");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DEF_PCCC + ")").addClass("btnGreen");
        }
        else {
            GridPD.SetBackground(SPR_DEF_PCCC - 1, i, "gray");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DEF_PCCC + ")").removeClass("btnGreen");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DEF_PCCC + ")").removeClass("btnPcCcAlloc");
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DEF_PCCC + ")").addClass("btnGray");
        }
    }
    GridPD.RenderStatus = true;
    if (isLevel1 == "0" && nwDocno != "") {
        DisablePrepayment();
    }
}

function CustomizeLoadByClick() {
    var locForm = '', vendor = '', rsnForReq = '', costcenter = '';
    var refDocno = '', refDocdate = '', refSI = '', refDate = '', payTerm = '', payTermDesc = '', drno = '', drdate = '', duedate = '', paymentReqType = '', counterdate = '', basis = '', trantype = '';
    var grossamt = 0;
    var error = '';

    locForm = $("#idvallugLocAcctForms").val();
    vendor = $("#idvallugVendorPayee").val();
    rsnForReq = $("#idvallugRsnReq").val();
    costcenter = $("#idvallugOrigCCC").val();
    controlAccountCode = $("#idvallugAPCtrlAccnt").val();
    controlAccountDesc = $("#descvallugAPCtrlAccnt").val();
    //refDocno = getDataOfGrid('nwGrid', '', SPR_REFTRANNO, crnwTR.index());
    //refDocdate = getDataOfGrid('nwGrid', '', SPR_REFTRANDATE, crnwTR.index());
    //refSI = getDataOfGrid('nwGrid', 'input', SPR_REFNO, crnwTR.index());
    //refDate = getDataOfGrid('nwGrid', 'input', SPR_REFDATE, crnwTR.index());
    //payTerm = getDataOfGrid('nwGrid', '', SPR_PAYMENTTERMCODE, crnwTR.index());
    //payTermDesc = getDataOfGrid('nwGrid', '', SPR_PAYMENTTERMDESC, crnwTR.index());
    //drno = getDataOfGrid('nwGrid', 'input', SPR_DRNO, crnwTR.index());
    //drdate = getDataOfGrid('nwGrid', 'input', SPR_DRDATE, crnwTR.index());
    //grossamt = getDataOfGrid('nwGrid', 'input', SPR_GROSSAMT, crnwTR.index());
    //counterdate = getDataOfGrid('nwGrid', 'input', SPR_COUNTERDATE, crnwTR.index());
    //duedate = getDataOfGrid('nwGrid', 'input', SPR_DUEDATE, crnwTR.index());
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var col = Grid.CellSelected.col - 1;
    refDocno = Grid.GetValue(SPR_REFTRANNO - 1, row);
    refDocdate = Grid.GetValue(SPR_REFTRANDATE - 1, row);
    refSI = Grid.GetValue(SPR_REFNO - 1, row);
    refDate = Grid.GetValue(SPR_REFDATE - 1, row);
    payTerm = Grid.GetValue(SPR_PAYMENTTERMCODE - 1, row);
    payTermDesc = Grid.GetValue(SPR_PAYMENTTERMDESC - 1, row);
    drno = Grid.GetValue(SPR_DRNO - 1, row);
    drdate = Grid.GetValue(SPR_DRDATE - 1, row);
    grossamt = Grid.GetValue(SPR_GROSSAMT - 1, row);
    counterdate = Grid.GetValue(SPR_COUNTERDATE - 1, row);
    duedate = Grid.GetValue(SPR_DUEDATE - 1, row);
    paymentReqType = $("#cmbPaymentRqstType").val();
    basis = $("#txtBasisAging").val();
    trantype = $("#txtTranType").val();   

    if (locForm == '' && vendor == '' && rsnForReq == '') {
        error += "Cannot proceed. Please complete the header details.\n";
    }
    else {
        if (locForm == '') {
            error += "Cannot proceed. Location with Accountable Forms is required.\n";
        }
        if (vendor == '') {
            error += "Cannot proceed. Vendor/Payee is required.\n";
        }
        if (paymentReqType == '') {
            error += "Cannot proceed. Payment Request Sub Type is required.\n";
        }
        if (rsnForReq == '' && trantype == 'PRFDRT') {
            error += "Cannot proceed. Reason for Request is required.\n";
        }
    }

    if (paymentReqType == "01" && refDocno == "") {
        error += "Cannot proceed. Ref. Transaction No. is required.\n";
    }
    if (refSI == "") {
        error += "Cannot proceed. Ref No. (BI/SI/SOA) is required.\n";
    }
    //if (payTerm == "") {
    //    error += "Cannot Continue. Payment Term is required.\n";
    //}
    if (counterdate == "" && basis == "CNTDATE") {
        error += "Cannot proceed. Counter Date is required.\n";
    }
    if (grossamt == 0) {
        error += "Cannot proceed. Invoice Amount cannot be zero.\n";
    }

    if (error != "") {
        MessageBox(error, Title, "error");
        return;
    }

    if (refDocno != "") {
        hasRefDocno = true;
        $("#btnExportJournal").enable(true);
        $("#nwGridChargeDtlsCon").enable(true);
        //EnableChargingDtls();
        //$("#btnTaxConvert").enable(true);
        $("#btnApplyAdvDM").enable(true);
        $("#btnReloadTaxes").enable(false);
        $("#btnSaveCD").enable(true);
        $("#nwGridChargeDtlsCon .nwgrid_Delete").enable(false);
        $("#nwGridChargeDtlsCon .nwgrid_Insert").enable(false);
        $("#nwGridChargeDtlsCon .nwgrid_CopyRow").enable(false);
        $("#nwGridChargeDtlsCon .nwgrid_SaveWidth").enable(false);
        $("#nwGridChargeDtlsCon .nwgrid_ResetWidth").enable(false);
        if (!isNewData) {
            if (nwDocno == "" || isLevel1 == "1") {
                //EnableRecurring();
                EnablePrepayment();
                $("#btnExportJournal").enable(true);
            }
            if (nwDocno != "") { //&& isLevel1 != "1") {
                $("#btnSaveCD").enable(false);
                //DisableRecurring();
            }
        }
    }
    else {
        hasRefDocno = false;
        $("#nwGridChargeDtlsCon").enable(true);
        EnableChargingDtls();
        $("#btnTaxConvert").enable(true);
        $("#btnApplyAdvDM").enable(true);
        $("#btnSaveCD").enable(true);
        if (!isNewData) {
            if (nwDocno == "" || isLevel1 == "1") {
                EnableRecurring();
                EnablePrepayment();
                $("#btnExportJournal").enable(true);
            }
            if (nwDocno != "") { //&& isLevel1 != "1") {
                $("#btnSaveCD").enable(false);
                //DisableRecurring();
            }
        }
    }

    nwLoading_Start("xbtnChargingDtls", crLoadingHTML);

    //Charging Details Header
    $("#idvallugRefTranNo").val(refDocno);
    $("#descvallugRefTranNo").val(refDocdate);
    $("#idvallugPaymentTerm").val(payTerm);
    $("#descvallugPaymentTerm").val(payTermDesc);
    $("#idvallugRefNoSI").val(refSI);
    $("#descvallugRefNoSI").val(refDate);
    $("#txtCounterDate_CD").val(counterdate);
    $("#idvallugDRCOCNo").val(drno);
    $("#descvallugDRCOCNo").val(drdate);
    $("#txtDueDate_CD").val(duedate);
    $("#txtGrossAmt_CD").val(setNumReplace(grossamt, 2));

    //Prepayments Details Header
    $("#idvallugDocno_PD").val(refDocno);
    $("#descvallugDocno_PD").val(refDocdate);
    $("#idvallugRefNoSI_PD").val(refSI);
    $("#descvallugRefNoSI_PD").val(refDate);
    $("#idvallugDRCOCNo_PD").val(drno);
    $("#descvallugDRCOCNo_PD").val(drdate);
    $("#idvallugPaymentTerm_PD").val(payTerm);
    $("#descvallugPaymentTerm_PD").val(payTermDesc);
    $("#txtCounterDate_PD").val(counterdate);
    $("#txtDueDate_PD").val(duedate);
    $("#rdbAmortEqually_PD").prop("checked", true);
    //$("#txtRowno_PD").val(crnwTR.index());
    $("#txtRowno_PD").val(row);
    basisOfAmort = 'amort_equally';

    //Recurring Details Header
    ClearRecurrenceDtls();
    $("#idvallugDocNo").val(refDocno);
    $("#descvallugDocNo").val(refDocdate);
    $("#idvallugRefNo").val(refSI);
    $("#descvallugRefNo").val(refDate);
    $("#idvallugDRNo").val(drno);
    $("#descvallugDRNo").val(drdate);
    $("#idvallugPayTerm").val(payTerm);
    $("#descvallugPayTerm").val(payTermDesc);
    $("#txtCounterDate_RD").val(counterdate);
    $("#txtDueDate_RD").val(duedate);
    //$("#txtRowno_RD").val(crnwTR.index());
    $("#txtRowno_RD").val(row);
    $("#chkAllowRecur").prop("checked", true);

    //currRow = crnwTR.index();
    currRow = row;
    taxConvert = "2";

    tmpDocno = $("#txtRecuser").val() + $.now().toString();

    //if (getDataOfGrid('nwGrid', '', SPR_TMPID, crnwTR.index()) == "") {
    //    //crnwTR.find("td:eq(" + SPR_TMPID + ")").text(tmpDocno);
    //    setGridData('nwGrid', '', SPR_TMPID, crnwTR.index(), tmpDocno);
    //}
    //if (getDataOfGrid('nwGridCon', '', SPR_TMPID, row) == "") {
    if (Grid.GetValue(SPR_TMPID - 1, row) == "") {
        //crnwTR.find("td:eq(" + SPR_TMPID + ")").text(tmpDocno);
        //setGridData('nwGridCon', '', SPR_TMPID, row, tmpDocno);
        Grid.SetText(SPR_TMPID - 1, row, tmpDocno);
    }

    //$("#txtTMPID").val(getDataOfGrid('nwGrid', '', SPR_TMPID, crnwTR.index()));
    //$("#txtRateLoc").val(getDataOfGrid('nwGrid', '', SPR_RATETOLOCAL, crnwTR.index()));
    //$("#txtRateHome").val(getDataOfGrid('nwGrid', '', SPR_RATETOHOME, crnwTR.index()));
    ////$("#txtRateLoc").val(crnwTR.find("td:eq(" + SPR_RATETOLOCAL + ")").text());
    ////$("#txtRateHome").val(crnwTR.find("td:eq(" + SPR_RATETOHOME + ")").text());

    $("#txtTMPID").val(Grid.GetValue(SPR_TMPID - 1, row));
    $("#txtRateLoc").val(Grid.GetValue(SPR_RATETOLOCAL - 1, row));
    $("#txtRateHome").val(Grid.GetValue(SPR_RATETOHOME - 1, row));

    ////var lineID_ = crnwTR.find("td:eq(" + SPR_LINEID + ")").text();
    //var lineID_ = getDataOfGrid('nwGrid', '', SPR_LINEID, crnwTR.index());
    //lineID = getDataOfGrid('nwGrid', '', SPR_LINEID, crnwTR.index());
    var lineID_ = Grid.GetValue(SPR_LINEID - 1, row);
    lineID = Grid.GetValue(SPR_LINEID - 1, row)
    if ((lineID_ == "" || lineID_ == "0") && $("#txtDocno").val() == "") {
        //lineID_ = crnwTR.index() + 1;
        lineID_ = row + 1;
    }
    $("#txtLineID_CD").val(lineID_);
    //$(".BoxClose").show();

    //nwGrid_RemoveRow("nwGridChargeDtlsCon", 0, $("#nwGridCon .tblGridBody tr").length);

    ////var docno = crnwTR.find("td:eq(" + SPR_TMPID + ")").text();
    //var docno = getDataOfGrid('nwGrid', '', SPR_TMPID, crnwTR.index());
    var docno = Grid.GetValue(SPR_TMPID - 1, row);
    var refno = $("#idvallugRefTranNo").val();
    nwParameter_Add("txtDocno", $("#txtDocno").val());
    nwParameter_Add("idvallugRefTranNo", $("#idvallugRefTranNo").val());
    nwParameter_Add("idvallugLocAcctForms", $("#idvallugLocAcctForms").val());
    nwParameter_Add("idvallugVendorPayee", $("#idvallugVendorPayee").val());
    nwParameter_Add("lineID", lineID_);
    nwParameter_Add("isNewData", isNewData);
    nwParameter_Add("tmpDocno", docno);    
    nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls));
    nwParameter_Add("hasJson", HasJsonTempDelDtls(docno, refno) >= 0 ? true : false);
    nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls.filter(i =>(i.docno + i.refTranNo) == docno + refno)));
    nwParameter_Add("isLoadHstTemp", isLoadHstTemp);
    nwParameter_Add("txtDocnoHstTemp", $("#txtDocnoHstTemp").val());
    nwParameter_Add("idvallugRefTranNo", refno);
    nwParameter_Add("idvallugRsnReq", $("#idvallugRsnReq").val());
    nwParameter_Add("txtReasonType", $("#txtReasonType").val());
    //nwParameter_Add("refNoSI", getDataOfGrid('nwGrid', 'input', SPR_REFNO, crnwTR.index()));
    nwParameter_Add("refNoSI", getDataOfGrid('nwGridCon', '', SPR_REFNO, row));
    nwParameter_Add_Table("nwGridCon");
    nwParameter_Add_Table("nwGridChargeDtlsCon");
    func_ActionDriven("actbtnChargingDtls", false);
}

$(document).on('click', '#btnExportJournal', function () {
    //nwLoading_Start("xbtnExportJournal", crLoadingHTML);
    //cust_GetPara();
    //export_type = '3';
    //nwParameter_Add("lineID", lineID);
    //nwParameter_Add("export_type", export_type);
    //func_ActionDriven("actExport_UploadingJournal", false);
    nwGridJournalCon_Book.ActiveSheet.exportColumn = true;
    p8Spread_Export(nwGridJournalCon_Book, "Journal Entries");
    return false;
});

//$(document).on("click", ".hold", function (e) {
//    var isCheckAll = true;
//    crnwTable = $("#nwGridCon .tblGridBody");
//    var count = crnwTable.find("tr").length;

//    for (var i = 0; i < count; i++) {
//        if (crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + (SPR_HOLDPAYMENT) + ") input").is(":checked") == false) {
//            isCheckAll = false;
//        }
//    }
//    if (isCheckAll == true) {
//        $(".nwCheckBoxTot.nwCheckBoxTot22").prop("checked", true);
//    }

//    if (crnwTR.find("td:eq(" + SPR_HOLDPAYMENT + ") input").is(":checked")) {
//        crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ") input").enable(true);
//        crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ")").css("background-color", "white");
//        crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ") input").css("background-color", "white");
//    }
//    else {
//        crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ") input").enable(false);
//        crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ") input").val("");
//        crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ")").css("background-color", "gainsboro");
//        crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ") input").css("background-color", "gainsboro");
//        crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ") input").css("border", "none");
//    }
//});

function chkboxHold() {
    var isCheckAll = true;
    //crnwTable = $("#nwGridCon .tblGridBody");
    //var count = crnwTable.find("tr").length;
    var Grid = nwGridCon_Book.ActiveSheet;
    var count = Grid.GetMaxRow();
    var row = Grid.CellSelected.row - 1;
    for (var i = 0; i < count; i++) {
        let hold = Grid.GetValue(SPR_HOLDPAYMENT - 1, i);
        if (hold == "0") {
            isCheckAll = false;
        }
    }
    if (isCheckAll == true) {
        $(".nwCheckBoxTot.nwCheckBoxTot22").prop("checked", true);
    }
    let hold = Grid.GetValue(SPR_HOLDPAYMENT - 1, row);
    if (hold == "1") {
        Grid.SetEnable(SPR_REMARKSHOLD - 1, row, true);
        Grid.SetBackground(SPR_REMARKSHOLD - 1, row, 'white');
        //crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ") input").enable(true);
        //crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ")").css("background-color", "white");
        //crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ") input").css("background-color", "white");
    }
    else {
        Grid.SetEnable(SPR_REMARKSHOLD - 1, row, false);
        Grid.SetBackground(SPR_REMARKSHOLD - 1, row, 'gainsboro');
        Grid.SetText(SPR_REMARKSHOLD - 1, row, "");
        //crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ") input").enable(false);
        //crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ") input").val("");
        //crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ")").css("background-color", "gainsboro");
        //crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ") input").css("background-color", "gainsboro");
        //crnwTR.find("td:eq(" + SPR_REMARKSHOLD + ") input").css("border", "none");
    }
}

function HideFieldsWRef() {
    $("#lblRsnReq").addClass("hideFields");
    $("#lugRsnReq").addClass("hideFields");
    $("#btnVwConsoCharging").addClass("hideFields");
    $("#btnDownloadTemplate").addClass("hideFields");
    $("#btnUploadTemplate").addClass("hideFields");
    $(".body.recurDtls").addClass("hideFields");
    $("#btnDLUploading").addClass("hideFields");
}

function UnhideFieldsWRef() {
    $("#lblRsnReq").removeClass("hideFields");
    $("#lugRsnReq").removeClass("hideFields");
    $("#btnVwConsoCharging").removeClass("hideFields");
    $("#btnDownloadTemplate").removeClass("hideFields");
    $("#btnUploadTemplate").removeClass("hideFields");
    $(".body.recurDtls").removeClass("hideFields");
    $("#btnDLUploading").removeClass("hideFields");
}

var _crnwTR_pccc = "";

function Prepay_focus() {
    var GridPD = nwGridPrepayDefCon_Book.ActiveSheet;
    var row = GridPD.CellSelected.row - 1;
    _crnwTR_pccc = row;
}

function Prepay_change() {
    var GridPD = nwGridPrepayDefCon_Book.ActiveSheet;
    var row = GridPD.CellSelected.row - 1;
    //let amortDate = getDataOfGrid('nwGridPrepayDef', 'input', SPR_DEF_AMORTDATE, _crnwTR_pccc.index());
    //let amortAmt = getDataOfGrid('nwGridPrepayDef', 'input', SPR_DEF_AMOUNT, _crnwTR_pccc.index());
    let amortDate = GridPD.GetValue(SPR_DEF_AMORTDATE - 1, row);
    let amortAmt = GridPD.GetValue(SPR_DEF_AMOUNT - 1, row);
    if (amortDate != "" && getNumReplace(amortAmt) != 0) {
        //_crnwTR_pccc.find("td:eq(" + SPR_DEF_PCCC + ")").removeClass("btnGray");
        //_crnwTR_pccc.find("td:eq(" + SPR_DEF_PCCC + ")").addClass("btnGreen");
        //_crnwTR_pccc.find("td:eq(" + SPR_DEF_PCCC + ")").addClass("btnPcCcAlloc");
        GridPD.SetBackground(SPR_DEF_PCCC - 1, row, "green")
        GridPD.SetEnable(SPR_DEF_PCCC - 1, row, true);
    }    
}
//$(document).on('focus', '.dtpAmortDate, .numAmortAmt', function () {
//    _crnwTR_pccc = crnwTR;
//});

//$(document).on('change', '.dtpAmortDate, .numAmortAmt', function () {
//    let amortDate = getDataOfGrid('nwGridPrepayDef', 'input', SPR_DEF_AMORTDATE, _crnwTR_pccc.index());
//    let amortAmt = getDataOfGrid('nwGridPrepayDef', 'input', SPR_DEF_AMOUNT, _crnwTR_pccc.index());

//    if (amortDate != "" && getNumReplace(amortAmt) != 0) {
//        _crnwTR_pccc.find("td:eq(" + SPR_DEF_PCCC + ")").removeClass("btnGray");
//        _crnwTR_pccc.find("td:eq(" + SPR_DEF_PCCC + ")").addClass("btnGreen");
//        _crnwTR_pccc.find("td:eq(" + SPR_DEF_PCCC + ")").addClass("btnPcCcAlloc");
//    }    
//});

function ShowVwMonitoringRpt() {
    var locformCode = $(`#idvallugLocAcctForms`).val();
    var locformDesc = $(`#descvallugLocAcctForms`).val();
    var costCenterCode = $(`#idvallugOrigCCC`).val();
    var costCenterDesc = $(`#descvallugOrigCCC`).val();
    var recuser = recuser_glb;

    var fullength = `../../../ADB/ReportsAndInquiry/ADBBdgtAvailabilityRpt/ADBBdgtAvailabilityRpt.aspx?nwLocForm=${encodeURI(locformCode)}&nwCostCenterDesc=${encodeURI(costCenterDesc)}&nwCostCenter=${encodeURI(costCenterCode)}&nwRecUser=${encodeURI(recuser)}`;
    nwLoading_Start('xShowVwMonitoringRpt', crLoadingHTML);
    nwPopupForm_Create("nwVwMonitoringRpt", true, fullength);
    $('#nwVwMonitoringRpt .BoxTitle').text("View Budget Availability Report");
    $("#nwVwMonitoringRpt").css({ "min-width": "98%" });
    $("#nwVwMonitoringRpt").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwVwMonitoringRpt");
    nwLoading_End('xShowVwMonitoringRpt');
}

function ReqAllocTagging() {
    var Grid = nwGridChargeDtlsCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var col = Grid.CellSelected.col - 1;
    //AllocationProcessProp(crnwTR.find("td:eq(" + SPR_CD_ITEMGRPTYPECODE + ")").text(), crnwTR.find("td:eq(" + SPR_CD_ITEMCODE + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG1 + ")").text(),
    //                      crnwTR.find("td:eq(" + SPR_CD_SEG2 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG3 + ")").text(),
    //                      crnwTR.find("td:eq(" + SPR_CD_SEG4 + ")").text(), crnwTR.find("td:eq(" + SPR_CD_SEG5 + ")").text(),
    //                      crnwTR.find("td:eq(" + SPR_CD_SEG6 + ")").text());
    AllocationProcessProp(Grid.GetValue(SPR_CD_ITEMGRPTYPECODE - 1, row), Grid.GetValue(SPR_CD_ITEMCODE - 1, row), Grid.GetValue(SPR_CD_SEG1 - 1, row),
                          Grid.GetValue(SPR_CD_SEG2 - 1, row), Grid.GetValue(SPR_CD_SEG3 - 1, row),
                          Grid.GetValue(SPR_CD_SEG4 - 1, row), Grid.GetValue(SPR_CD_SEG5 - 1, row),
                          Grid.GetValue(SPR_CD_SEG6 - 1, row), row);
}

function ExpenseAlloc_ApplyToAllPCCC() {
    let prepayOption = $("#rdbAmortEqually_PD").is(":checked");
    let applyPCCC = $("#chkApplyToPCCC").is(":checked");
    let applyAll = $("#chkApplyToAll").is(":checked");
    let prepaid = $("#txtPrepaid").val();    
    let costcenter = $("#idvallugCostCenter_EA").val();
    let profitcenter = $("#idvallugProfitCenter_EA").val();
    let rownoPCCC = $("#txtRowno_Ex").val();
    let refRowno = $("#txtRefRowno").val();
    let lineID = $("#txtLineID").val();

    var GridPD;
    if (prepayOption) {
        //crnwPrepTbl = $("#nwGridPrepaymentCon .tblGridBody");
        var GridPD = nwGridPrepaymentCon_Book.ActiveSheet;
    }
    else {
        //crnwPrepTbl = $("#nwGridPrepayDefCon .tblGridBody"); 
        GridPD = nwGridPrepayDefCon_Book.ActiveSheet;
    }
    //var cntprepay = crnwPrepTbl.find("tr").length;
    var cntprepay = GridPD.GetMaxRow();
    //crnwPCCCTbl = $("#nwGridPCCCAllocCon .tblGridBody");
    var GridPCCC = nwGridPCCCAllocCon_Book.ActiveSheet;
    //var count = crnwPCCCTbl.find("tr").length;
    var count = GridPCCC.GetMaxRow();

    for (var r = 0; r < cntprepay; r++) {        
        if (applyPCCC == true && applyAll == false) {
            if (refRowno == (r + 1)) {
                for (var i = 0; i < count; i++) {
                    //let cc = crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCC_PCSEGMENTCODE + ')').text();
                    //let pc = crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCC_CCSEGMENTCODE + ')').text();
                    //let totalamt = crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCC_AMOUNT + ')').text();
                    let cc = GridPCCC.GetValue(SPR_PCCC_PCSEGMENTCODE - 1, i);
                    let pc = GridPCCC.GetValue(SPR_PCCC_CCSEGMENTCODE - 1, i);
                    let totalamt = GridPCCC.GetValue(SPR_PCCC_AMOUNT - 1, i);
                 
                    StoreUpdatedJson_Expense(refRowno + (i + 1).toString() + cc + pc, cc, pc, totalamt, (i + 1).toString(), applyPCCC, applyAll, (i + 1).toString());

                    //crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCCALLOC + ')').removeClass("btnBlue");
                    //crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCCALLOC + ')').addClass("btnGreen");
                    //crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCC_EXPTAG + ')').text("1");
                    GridPCCC.SetBackground(SPR_PCCCALLOC - 1, i, "green");
                    GridPCCC.SetText(SPR_PCCC_EXPTAG - 1, i, "1");
                }
            }
        }
        if (applyAll == true && applyPCCC == false) {
            //let amortdate = crnwPrepTbl.find('tr:eq(' + r + ') td:eq(' + SPR_DEF_AMORTDATE + ') input').val();
            //let amount = crnwPrepTbl.find('tr:eq(' + r + ') td:eq(' + SPR_DEF_AMOUNT + ') input').val();
            let amortdate = GridPD.GetValue(SPR_DEF_AMORTDATE - 1, r);
            let amount = GridPD.GetValue(SPR_DEF_AMOUNT - 1, r);
            if (refRowno != (r + 1) && amortdate != "" && amount != "") {
                for (var i = 0; i < count; i++) {
                    //let cc = crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCC_PCSEGMENTCODE + ')').text();
                    //let pc = crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCC_CCSEGMENTCODE + ')').text();
                    //let percent = crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCC_PERCENTAGE + ')').text();
                    //let totalamt = getNumReplace(amount) * (getNumReplace(percent) / 100);
                    let cc = GridPCCC.GetValue(SPR_PCCC_PCSEGMENTCODE - 1, i);
                    let pc = GridPCCC.GetValue(SPR_PCCC_CCSEGMENTCODE - 1, i);
                    let percent = GridPCCC.GetValue(SPR_PCCC_PERCENTAGE - 1, i);
                    let totalamt = getNumReplace(amount) * (getNumReplace(percent) / 100);

                    if (rownoPCCC == (i + 1)) {
                        StoreUpdatedJson_Expense((r + 1).toString() + (i + 1).toString() + cc + pc, cc, pc, totalamt, (i + 1).toString(), applyPCCC, applyAll, (r + 1).toString());

                        //crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCCALLOC + ')').removeClass("btnBlue");
                        //crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCCALLOC + ')').addClass("btnGreen");
                        //crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCC_EXPTAG + ')').text("1");
                        GridPCCC.SetBackground(SPR_PCCCALLOC - 1, i, "green");
                        GridPCCC.SetText(SPR_PCCC_EXPTAG - 1, i, "1");
                    }                   
                }
            }            
        }
        if (applyAll == true && applyPCCC == true) {
            //let amortdate = crnwPrepTbl.find('tr:eq(' + r + ') td:eq(' + SPR_DEF_AMORTDATE + ') input').val();
            //let amount = crnwPrepTbl.find('tr:eq(' + r + ') td:eq(' + SPR_DEF_AMOUNT + ') input').val();
            let amortdate = GridPD.GetValue(SPR_DEF_AMORTDATE - 1, r);
            let amount = GridPD.GetValue(SPR_DEF_AMOUNT - 1, r);
            if (amortdate != "" && amount != "") {
                for (var i = 0; i < count; i++) {
                    //let cc = crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCC_PCSEGMENTCODE + ')').text();
                    //let pc = crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCC_CCSEGMENTCODE + ')').text();
                    //let percent = crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCC_PERCENTAGE + ')').text();
                    //let totalamt = getNumReplace(amount) * (getNumReplace(percent) / 100);
                    let cc = GridPCCC.GetValue(SPR_PCCC_PCSEGMENTCODE - 1, i);
                    let pc = GridPCCC.GetValue(SPR_PCCC_CCSEGMENTCODE - 1, i);
                    let percent = GridPCCC.GetValue(SPR_PCCC_PERCENTAGE - 1, i);
                    let totalamt = getNumReplace(amount) * (getNumReplace(percent) / 100);

                    StoreUpdatedJson_Expense((r + 1).toString() + (i + 1).toString() + cc + pc, cc, pc, totalamt, (i + 1).toString(), applyPCCC, applyAll, (r + 1).toString());

                    //crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCCALLOC + ')').removeClass("btnBlue");
                    //crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCCALLOC + ')').addClass("btnGreen");
                    //crnwPCCCTbl.find('tr:eq(' + i + ') td:eq(' + SPR_PCCC_EXPTAG + ')').text("1");
                    GridPCCC.SetBackground(SPR_PCCCALLOC - 1, i, "green");
                    GridPCCC.SetText(SPR_PCCC_EXPTAG - 1, i, "1");
                }
            }        
        }
    }  
}

function jsonfilter_Expense_Exclude(json, jsonID) {
    return json.filter(i => (i.refRowno + i.rownoPCCC + i.ccCode + i.pcCode) != jsonID);
}

function StoreUpdatedJson_Expense(jsonID, cc, pc, totalamt, rownopccc, applypc, applyall, prepayrowno) {
    jsonExpenseAlloc = jsonfilter_Expense_Exclude(jsonExpenseAlloc, jsonID);
    var store = {};

    //crnwTable = $("#nwGridExpenseCon .tblGridBody tbody ");
    //var length = crnwTable.find("tr").length;
    var GridEC = nwGridExpenseCon_Book.ActiveSheet;
    var length = GridEC.GetMaxRow();
    GridEC.RenderStatus = false;

    for (var i = 0; i < length; i++) {
        store = {};

        //let expensecode = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_EA_EXPENSECODE + ')').text();  
        let expensecode = GridEC.GetValue(SPR_EA_EXPENSECODE - 1, i);
        if (expensecode != "") {
            let prepaid = $("#txtPrepaid").val();
            //let amount = getNumReplace($("#txtAmount_PCCC").val());
            //let costcenter = $("#idvallugCostCenter_EA").val();
            let profitcenter = $("#idvallugProfitCenter_EA").val();
            //let rownoPCCC = $("#txtRowno_Ex").val();
            let refRowno = $("#txtRefRowno").val();
            let lineID = $("#txtLineID").val();

            if (applypc == true && applyall == false) {              
                if (refRowno + rownopccc + cc + pc == jsonID) {
                    //store["expenseCode"] = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_EA_EXPENSECODE + ')').text();
                    //store["expenseDesc"] = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_EA_EXPENSEDESC + ')').text();
                    //store["percentage"] = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_EA_PERCENT + ') input').val();
                    //store["amount"] = getNumReplace(totalamt) * (getNumReplace(crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_EA_PERCENT + ') input').val()) / 100);
                    store["expenseCode"] = GridEC.GetValue(SPR_EA_EXPENSECODE - 1, i);
                    store["expenseDesc"] = GridEC.GetValue(SPR_EA_EXPENSEDESC - 1, i);
                    store["percentage"] = GridEC.GetValue(SPR_EA_PERCENT - 1, i);
                    store["amount"] = getNumReplace(totalamt) * (getNumReplace(GridEC.GetValue(SPR_EA_PERCENT - 1, i)) / 100);
                    store["lineID"] = lineID;
                    store["prepaid"] = prepaid;
                    store["applyToAll"] = '';
                    store["refRowno"] = refRowno;
                    store["rownoPCCC"] = rownopccc;
                    store["totalamt"] = setNumReplace(totalamt, 2);
                    store["ccCode"] = cc;
                    store["pcCode"] = pc;

                    jsonExpenseAlloc.push(store);
                }
            }
            if (applyall == true && applypc == false) {
                if (pc == profitcenter) {                    
                    if (prepayrowno + rownopccc + cc + pc == jsonID) {
                        //store["expenseCode"] = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_EA_EXPENSECODE + ')').text();
                        //store["expenseDesc"] = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_EA_EXPENSEDESC + ')').text();
                        //store["percentage"] = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_EA_PERCENT + ') input').val();
                        //store["amount"] = getNumReplace(totalamt) * (getNumReplace(crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_EA_PERCENT + ') input').val()) / 100);
                        store["expenseCode"] = GridEC.GetValue(SPR_EA_EXPENSECODE - 1, i);
                        store["expenseDesc"] = GridEC.GetValue(SPR_EA_EXPENSEDESC - 1, i);
                        store["percentage"] = GridEC.GetValue(SPR_EA_PERCENT - 1, i);
                        store["amount"] = getNumReplace(totalamt) * (getNumReplace(GridEC.GetValue(SPR_EA_PERCENT - 1, i)) / 100);
                        store["lineID"] = lineID;
                        store["prepaid"] = prepaid;
                        store["applyToAll"] = '';
                        store["refRowno"] = prepayrowno;
                        store["rownoPCCC"] = rownopccc;
                        store["totalamt"] = setNumReplace(totalamt, 2);
                        store["ccCode"] = cc;
                        store["pcCode"] = pc;

                        jsonExpenseAlloc.push(store);
                    }
                }
            }
            if (applypc == true && applyall == true) {
                if (prepayrowno + rownopccc + cc + pc == jsonID) {
                    //store["expenseCode"] = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_EA_EXPENSECODE + ')').text();
                    //store["expenseDesc"] = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_EA_EXPENSEDESC + ')').text();
                    //store["percentage"] = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_EA_PERCENT + ') input').val();
                    //store["amount"] = getNumReplace(totalamt) * (getNumReplace(crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_EA_PERCENT + ') input').val()) / 100);
                    store["expenseCode"] = GridEC.GetValue(SPR_EA_EXPENSECODE - 1, i);
                    store["expenseDesc"] = GridEC.GetValue(SPR_EA_EXPENSEDESC - 1, i);
                    store["percentage"] = GridEC.GetValue(SPR_EA_PERCENT - 1, i);
                    store["amount"] = getNumReplace(totalamt) * (getNumReplace(GridEC.GetValue(SPR_EA_PERCENT - 1, i)) / 100);
                    store["lineID"] = lineID;
                    store["prepaid"] = prepaid;
                    store["applyToAll"] = '';
                    store["refRowno"] = prepayrowno;
                    store["rownoPCCC"] = rownopccc;
                    store["totalamt"] = setNumReplace(totalamt, 2);
                    store["ccCode"] = cc;
                    store["pcCode"] = pc;

                    jsonExpenseAlloc.push(store);
                }
            }
          
        }
    }
    GridEC.RenderStatus = true;
}

function JsonUpdateValue_Expense(json, xRow) {
    var results = [];
    let prepaid = $("#txtPrepaid").val();
    let amount = getNumReplace($("#txtAmount_PCCC").val());
    let costcenter = $("#idvallugCostCenter_EA").val();
    let profitcenter = $("#idvallugProfitCenter_EA").val();
    let rownoPCCC = $("#txtRowno_Ex").val();
    let refRowno = $("#txtRefRowno").val();
    let lineID = $("#txtLineID").val();

    try {
        for (var j = 0; j <= json.length; j++) {
            if (json[j]['prepaid'] == prepaid && json[j]['refRowno'] == refRowno && json[j]['rownoPCCC'] == rownoPCCC && json[j]['ccCode'] == costcenter && json[j]['pcCode'] == profitcenter) {
                json[j]['expenseCode'] = crnwTable.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_DELIVERYDATE + ') input').val();
                json[j]['expenseDesc'] = crnwTable.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_REQDELDATE + ')').text();
                json[j]['percentage'] = crnwTable.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_QTYPO + ') input').val();
                json[j]['amount'] = crnwTable.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_UOM + ')').text();
                json[j]['lineID'] = crnwTable.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_REQUOM + ')').text();
                json[j]['prepaid'] = crnwTable.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_PRQTY + ')').text();
                json[j]['applyToAll'] = crnwTable.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_REMQTY + ')').text();
                json[j]['refRowno'] = crnwTable.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_EXQTY + ')').text();
                json[j]['rownoPCCC'] = crnwTable.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_LOCATION + ')').text();
                json[j]['totalamt'] = crnwTable.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_LOCDESC + ')').text();
                json[j]['ccCode'] = crnwTable.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_SUBLOC + ')').text();
                json[j]['pcCode'] = crnwTable.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_SUBLOCDESC + ')').text();
               
                results = json[j];
            }
        }
    } catch (err) { }
    return results;
}

function DisableRecurring() {
    $("#btnSaveRecurring").enable(false);
    $("#btnSavePrepayment").enable(false);
    $("#chkAllowRecur").enable(false);
    $("#chkApplyToAll_Recur").enable(false);
    $("#txtNextRecur").prop("disabled", true);
    $("#txtNoRecur_RD").prop("disabled", true);
    $("#txtEndRecur_RD").prop("disabled", true);
}

$(document).on('click', '#btnDLUploading', function () {
    nwLoading_Start('xbtnDLUploading', crLoadingHTML);
    cust_GetPara();
    func_ActionDriven("actbtnExportPRF", false);
});

function ExportPRFUploading() {
    nwGridPRFUPCon_Book.ActiveSheet.exportColumn = true;
    p8Spread_Export(nwGridPRFUPCon_Book, "PRF_Direct_Uploading_" + $("#txtDocno").val() + "");
}

function WithPrepayments(refnoList) {
    msgBoxContainerQuestion = "WithPrepayments";
    parent_MessageBoxQuestion("No prepayment amortization details provided for Ref. No. "+refnoList+". Are you sure you want to continue?", "Payment Request Entry", "Question");
}

function WithPrepaymentsRef(msg) {
    msgBoxContainerQuestion = "WithPrepaymentsRef";
    parent_MessageBoxQuestion("No prepayment amortization details provided for the following:\n "+ msg +" \nAre you sure you want to continue?", "Payment Request Entry", "Question");    
}

$(document).on('click', '.nwCheckBox.nwCheckBox5', function () {   
    crnwTable = $("#nwGridChargeDtlsCon .tblGridBody");
    var count = crnwTable.find("tr").length;
    var seg1List = '';
    for (var i = 0; i < count; i++) {
        if (crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + (SPR_CD_ITEMGRPTYPECODE) + ")").text() != "") {
            seg1List += crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CD_SEG1 + ")").text() + "|";
        }
    }

    if (seg1List != "") {
        nwLoading_Start("xactbtnTaxConvert", crLoadingHTML);
        //isNewData = true;
        isResetTax = true;
        isBtnDone = false;
        taxConvert = "2";
        //nwParameter_Add_Table('nwGridChargeDtlsCon');
        nwParameter_Add("tmpDocno", $("#txtTMPID").val());
        nwParameter_Add("docno", $("#txtTMPID").val());
        nwParameter_Add("isNewData", isNewData);
        nwParameter_Add("taxConvert", taxConvert);
        nwParameter_Add("isResetTax", isResetTax);
        nwParameter_Add("txtDocno", $("#txtDocno").val());
        nwParameter_Add("lineID", $(`#nwGrid-nwData tr:eq(${mainGridCurr.index()})`).find(`td:eq(${SPR_LINEID})`).text());
        nwParameter_Add("txtGrossAmt_CD", $("#txtGrossAmt_CD").val());
        nwParameter_Add("txtVendorTag", $("#txtVendorTag").val());
        nwParameter_Add("txtDocno", $("#txtDocno").val());
        nwParameter_Add("idvallugRefTranNo", $("#idvallugRefTranNo").val());
        nwParameter_Add("withSI", $(`#nwGrid-nwData tr:eq(${mainGridCurr.index()})`).find(`td:eq(${SPR_WITHSI}) input`).is(":checked"));
        nwParameter_Add("txtTrantype", "PRFDRT");
        nwParameter_Add("row", currRow);
        func_ActionDriven("actbtnTaxConvert", true);
    }
});

$(document).on('click', '#btnReloadTaxes', function () {
    nwLoading_Start('xbtnReloadTaxes', crLoadingHTML);
    //nwParameter_Add_Table("nwGridChargeDtlsCon");
    nwParameter_Add_Spread(nwGridChargeDtlsCon_Book);
    func_ActionDriven("actReloadTaxes", false);
});

function AlternativePayee() {
    let altpayee = $("#txtAlterPayeeName").val();
    if (altpayee.length > 0) {
        if (nwDocno != "") {
            $("#chkAltPayee").enable(false);
        }
        else {
            $("#chkAltPayee").enable(true);
        }        
        $("#btnAlterPayee").enable(true);
        //$("#btnAlterPayee").removeClass("btnGray");
        $("#btnAlterPayee").addClass("btn-default-green");

    }   
}

//$(document).on('click', '.btnDefAmtDtls', function () {
//    nwLoading_Start("xbtnDefAmtDtls", crLoadingHTML);
//    cust_GetPara();
//    nwPopupForm_ShowModal("DefAppliedAmt");
//    nwParameter_Add("refPONo", crnwTR.find("td:eq(" + SPR_ADM_PONO + ")").text());
//    nwParameter_Add("docno", $("#idvallugRefTranNo").val());
//    func_ActionDriven("actDefAppAmtDtls", false);
//});

function btnDefAmtDtls() {
    nwLoading_Start("xbtnDefAmtDtls", crLoadingHTML);
    cust_GetPara();
    var GridADV = nwGridApplyAdvDMCon_Book.ActiveSheet;
    var row = GridADV.CellSelected.row - 1;
    nwPopupForm_ShowModal("DefAppliedAmt");
    //nwParameter_Add("refPONo", crnwTR.find("td:eq(" + SPR_ADM_PONO + ")").text());
    nwParameter_Add("refPONo", GridADV.GetValue(SPR_ADM_PONO - 1, row));
    nwParameter_Add("docno", $("#idvallugRefTranNo").val());
    func_ActionDriven("actDefAppAmtDtls", false);
}

function AdvWindowProp() {
    if (hasAdv == "True") {
        //$("#btnApplyAdvDM").removeClass("btnGray");
        //$("#btnApplyAdvDM").removeClass("btnBlue");
        $("#btnApplyAdvDM").addClass("btn-default-green");
        $("#btnApplyAdvDM").enable(true);
    }
    else if (withADV == "1") {
        //$("#btnApplyAdvDM").removeClass("btnGray");
        //$("#btnApplyAdvDM").removeClass("btnGreen");
        $("#btnApplyAdvDM").addClass("btn-default-blue");
        $("#btnApplyAdvDM").enable(true);
    }
    else {
        //$("#btnApplyAdvDM").removeClass("btnGreen");
        //$("#btnApplyAdvDM").removeClass("btnBlue");
        $("#btnApplyAdvDM").addClass("btn-default-gray");
        $("#btnApplyAdvDM").enable(false);
    }
}

function ConsoChargeProp() {
    //crnwTable = $("#nwGridConsoChargingCon .tblGridBody tbody ");
    //var length = crnwTable.find("tr").length;
   
    var GridCC = nwGridConsoChargingCon_Book.ActiveSheet;
    var length = GridCC.GetMaxRow();
    GridCC.RenderStatus = false;
    for (var i = 0; i < length; i++) {        
        //let bdgtamt = getNumReplace(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CCD_BDGTAMTAFTREQ + ")").text());
        let bdgtamt = getNumReplace(GridCC.GetValue(SPR_CCD_BDGTAMTAFTREQ - 1, i));
        if (bdgtamt <= 0) {
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CCD_BDGTQTYAFTREQ + ")").css('color', 'white');
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CCD_BDGTQTYAFTREQ + ")").css('background-color', 'red');         
            GridCC.SetBackground(SPR_CCD_BDGTAMTAFTREQ - 1, "red")
            GridCC.SetTextColor(SPR_CCD_BDGTAMTAFTREQ - 1, "white")
        }
    }
    GridCC.RenderStatus = true;
}

function ViewVendorInfo(vendor, type) {
    nwLoading_Start("xVendorInfo", crLoadingHTML);
    var fullength = "";
    var title = "";

    if (vendor.length > 0) {
        if (type == "01") {
            title = "Vendor Information";
            fullength = "../../../AP/DataSetup/APSupplierInformation/APSupplierInformation.aspx?nwSupplierCode=" + encodeURI(vendor) + "&nwDocno=" + encodeURI(vendor) + "&nwIsReport=1";
            $('.nwmenuFrame').attr("src", fullength);

            nwPopupForm_Create("nwPopVendorInfoWindow", true, fullength);
            $('#nwPopVendorInfoWindow .BoxTitle').text(title);

            $("#nwPopVendorInfoWindow").css({ "min-width": "90%" });
            $("#nwPopVendorInfoWindow").css({ "min-height": "90%" });
            nwPopupForm_ShowModal("nwPopVendorInfoWindow");
            $('.dimbgNWnwPopWindow').removeClass('openn');
        }
    }
    nwLoading_End('xVendorInfo');
}

function ReloadGLAccount() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    //var docno = getDataOfGrid('nwGrid', '', SPR_TMPID, crnwTR.index());
    var docno = Grid.GetValue(SPR_TMPID - 1, row);
    var refno = $("#idvallugRefTranNo").val();   
    nwParameter_Add("isNewData", isNewData);
    nwParameter_Add("tmpDocno", docno);   
    nwParameter_Add("idvallugRefTranNo", refno);
    nwParameter_Add("idvallugRsnReq", $("#idvallugRsnReq").val());
    nwParameter_Add("txtReasonType", $("#txtReasonType").val());    
    //nwParameter_Add_Table("nwGridCon");
    //nwParameter_Add_Table("nwGridChargeDtlsCon");
    nwParameter_Add_Spread(nwGridCon_Book);
    nwParameter_Add_Spread(nwGridChargeDtlsCon_Book);
    func_ActionDriven("actReloadGLAccnt", false);
}

$(document).on("change", "#fileCon", function () {
    changeFile(this);
});
$(document).on("click", "#btnupload", function () {
    upload();
});

//$(document).on("click", ".btnVendorInfo", function () {
//    isbuttonclick = true;
//    alert("123");
//    return false;
//});

//$(document).on("click", ".btnVendorInfo", function () {
//    var a = $(this).parents("tr").find("td:eq(0)").text();
//    alert(a);
//    isbuttonclick = true;
//    return false;
//});

$(document).on("mousedown", ".btnItemMaster_CD", function () {
    cust_LookupButton();
});

function CloseRvwAttach() {
    window_close('nwPopUpRvwAttach');
}

function OpenGenPRF() {
    if (!String.format) {
        String.format = function (format) {
            var args = Array.prototype.slice.call(arguments, 1);
            return format.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                ;
            });
        };
    }

    var fullLength = "";
    var title = "Generate PRF";

    fullLength = GetCurrentURL() + "../APPaymentRqstwRefEntryV2";

    nwPopupForm_Create("nwPopWindowFormAPPaymentRqstwRefEntry", true, fullLength);
    $('#nwPopWindowFormAPPaymentRqstwRefEntry .BoxTitle').text(title);
    $("#nwPopWindowFormAPPaymentRqstwRefEntry").css({ "min-width": "98%", "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopWindowFormAPPaymentRqstwRefEntry");
    $('.dimbgNWnwPopWindow').removeClass('openn');
}

function OpenDiretPRF() {
    $('#noah-webui-default-New').click();
    EnableFields();
    RemarksConfig();
    DisableChargingDtls();
    DisablePrepayment();
    DisableCDHdr();
    $("#chkAllowRecur").enable(false);
    $("#chkApplyToAll_Recur").enable(false);
    $("#cmbPaymentRqstSubType").val("01");
    $("#cmbPaymentRqstSubType").enable(false);
    $("#btnSaveCD").enable(false);
    $("#btnSavePrepayment").enable(false);
    $("#btnSaveRecurring").enable(false);
}

function WithAdvances() {    
    msgBoxContainerQuestion = "AdvancesQ";
    parent_MessageBoxQuestion("There is available advances for transaction. Are you sure you want to continue?", "Payment Request Entry", "Question");
}

$(document).on('click', '#btnReqCompHDR', function () {
    var trantype = $("#txtTranType").val();
    var docno = $('#txtDocno').val();       
    isHeader = true;
    if (docno == "") {
        MessageBox("Cannot proceed. Data should be saved first", Title, "error");
        return false;
    }

    if (nwDocno == "") {
        //var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "";
        var fullength = GetCurrentURL() + `../DCRequirementCompliance?TransactionNo=${encodeURI(docno)}&TranType=${encodeURI(trantype)}`;

    }
    else {
        //var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=true";
        var fullength = GetCurrentURL() + `../DCRequirementCompliance?TransactionNo=${encodeURI(docno)}&TranType=${encodeURI(trantype)}&isView=true`;

    }


    nwLoading_Start('xbtnReqmtCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
    $('#nwPopUpRequireCompliance .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpRequireCompliance").css({ "min-width": "98%" });
    $("#nwPopUpRequireCompliance").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpRequireCompliance");
    nwLoading_End('xbtnReqmtCompliance');
});

function ClearVendorRelatedFields() {
    $("#idvallugVendorPayee").val("");
    $("#descvallugVendorPayee").val("");
    $("#idvallugPayeeSubType").val("");
    $("#descvallugPayeeSubType").val("");
    $("#txtPayeeType").val("");
    $("#idvallugCurrency").val("");
    $("#descvallugCurrency").val("");
    $("#txtCheckPayeeName").val("");
    $("#txtAlterPayeeName").val("");
    $("#txtBasisAging").val("");
    $("#txtVendorCode").val("");
    $("#txtVendorName").val("");
    $("#idvallugAPCtrlAccnt, #descvallugAPCtrlAccnt").val("");
    $("#txtAlterPayeeID").val("");
    $("#txtRemarks_Alt").val("");
    $("#txtRATag_Alt").val("");
    $("#txtVendorTag").val("");
    $("#chkAltPayee").enable(false);
    $("#btnAlterPayee").enable(false);
    //$("#btnAlterPayee").removeClass("btnGreen");
    $("#btnAlterPayee").addClass("btn-default-gray");
    $("#lugCurrency").enable(true);
    var Grid = nwGridCon_Book.ActiveSheet;
    Grid.SetText(SPR_PAYMENTTERMCODE - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_PAYMENTTERMDESC - 1, Spread_ALLROW, "");
    Grid.SetText(SPR_NOOFDAYS - 1, Spread_ALLROW, "");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMCODE + 1) + ')').text("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_PAYMENTTERMDESC + 1) + ')').text("");
    //$('#nwGridCon .tblGridBody tr td:nth-child(' + (SPR_NOOFDAYS + 1) + ')').text("");
}

function CheckDuplicateRefNo(col) {
    var error = '';
    var concatval = '';
    var isDuplicate = false;
    var Grid = nwGridCon_Book.ActiveSheet;
    Grid.RenderStatus = false;
    var len = Grid.GetMaxRow();
    var maxCol = Grid.GetMaxCol();
    for (var x = 0; x <= len - 1; x++) {
        var concatval = Grid.GetValue(SPR_REFNO - 1, x);
        var refno_i = Grid.GetValue(SPR_REFNO - 1, x);

        for (var i = 0; i <= len - 1; i++) {
            var ccdata = Grid.GetValue(SPR_REFNO - 1, i);
            if (concatval == ccdata && refno_i != '') {
                if (x == i)
                    continue;

                if (col == "refno") {
                    Grid.SetText(SPR_REFNO - 1, i, "");
                }
                setTimeout(function () {
                    MessageBox("Cannot proceed. Ref No. (BS/SI/SOA) already exists.\n", "Payment Request Entry", "error");
                }, 100);
                return;
            }
        }
    }
    Grid.RenderStatus = true;

    //crnwTable = $("#nwGridCon .tblGridBody");
    //var len = crnwTable.find('tr').length;
    //var concatval = '';
    //var isDuplicate = false;
    //for (var x = 0; x <= len - 1; x++) {
    //    var concatval = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REFNO + ') input').val();        
    //    var refno_i = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REFNO + ') input').val();

    //    for (var i = 0; i <= len - 1; i++) {
    //        var ccdata = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_REFNO + ') input').val();

    //        if (concatval == ccdata && refno_i != '') {
    //            if (x == i)
    //                continue;

    //            if (col == "refno") {
    //                crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_REFNO + ') input').val("");
    //            }
    //            setTimeout(function () {
    //                MessageBox("Cannot proceed. Ref No. (BS/SI/SOA) already exists.\n", "Payment Request Entry", "error");
    //            }, 100);               
    //            return;
    //        }
    //    }
    //}
}

function dtpPeriodFrom() {
    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;
    var row = GridCD.CellSelected.row - 1;
    //var periodFrom = crnwTR.find('td:eq(' + SPR_CD_PERIODFROM + ') input').val();
    //var periodTo = crnwTR.find('td:eq(' + SPR_CD_PERIODTO + ') input').val();
    var periodFrom = GridCD.GetValue(SPR_CD_PERIODFROM - 1, row);
    var periodTo = GridCD.GetValue(SPR_CD_PERIODTO - 1, row);

    if (Date.parse(periodFrom) > Date.parse(periodTo) && periodTo != '') {
        //crnwTR.find('td:eq(' + SPR_CD_PERIODFROM + ') input').val('');
        GridCD.SetText(SPR_CD_PERIODFROM - 1, row, '');
        MessageBox("Cannot proceed. Period From should not be later than the Period To.", "Charging Details", "error");
    }
}

function dtpPeriodTo() {
    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;
    var row = GridCD.CellSelected.row - 1;
    //var periodFrom = crnwTR.find('td:eq(' + SPR_CD_PERIODFROM + ') input').val();
    //var periodTo = crnwTR.find('td:eq(' + SPR_CD_PERIODTO + ') input').val();
    var periodFrom = GridCD.GetValue(SPR_CD_PERIODFROM - 1, row);
    var periodTo = GridCD.GetValue(SPR_CD_PERIODTO - 1, row);
    if (Date.parse(periodFrom) > Date.parse(periodTo)) {
        //crnwTR.find('td:eq(' + SPR_CD_PERIODTO + ') input').val('');
        GridCD.SetText(SPR_CD_PERIODTO - 1, row, '');
        MessageBox("Cannot proceed. Period To should not be earlier than the Period From.", "Charging Details", "error");
    }
}
//$(document).on("change", ".dtpPeriodFrom", function (e) {
//    var periodFrom = crnwTR.find('td:eq(' + SPR_CD_PERIODFROM + ') input').val();
//    var periodTo = crnwTR.find('td:eq(' + SPR_CD_PERIODTO + ') input').val();

//    if (Date.parse(periodFrom) > Date.parse(periodTo) && periodTo != '') {
//        crnwTR.find('td:eq(' + SPR_CD_PERIODFROM + ') input').val('');
//        MessageBox("Cannot proceed. Period From should not be later than the Period To.", "Charging Details", "error");
//    }
//});

//$(document).on("change", ".dtpPeriodTo", function (e) {
//    var periodFrom = crnwTR.find('td:eq(' + SPR_CD_PERIODFROM + ') input').val();
//    var periodTo = crnwTR.find('td:eq(' + SPR_CD_PERIODTO + ') input').val();

//    if (Date.parse(periodFrom) > Date.parse(periodTo)) {
//        crnwTR.find('td:eq(' + SPR_CD_PERIODTO + ') input').val('');
//        MessageBox("Cannot proceed. Period To should not be earlier than the Period From.", "Charging Details", "error");
//    }
//});

function ClearPrepayDtls() {
    $('#idvallugDocno_PD, #descvallugDocno_PD').val("");
    $('#idvallugRefNoSI_PD, #descvallugRefNoSI_PD').val("");
    $('#idvallugDRCOCNo_PD, #descvallugDRCOCNo_PD').val("");
    $('#idvallugPaymentTerm_PD, #descvallugPaymentTerm_PD').val("");
    $('#txtCounterDate_PD, #txtRowno_PD').val("");
    $('#txtDueDate_PD').val("");
    $('#txtTotalPrepaidAmt').val("");
    $('#rdbAmortSchd_PD').prop('checked', false);
    $('#rdbAmortEqually_PD').prop('checked', false);
    DisableAll();
}


function DisableAll() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
}

//$(document).on('click', '.btnReqComp_CD', function () {
//    isCDRC = true;
//    var trantype = $("#txtTranType").val();
//    var docno = $('#txtDocno').val();
//    var lineID = getDataOfGrid('nwGridChargeDtls', '', SPR_CD_LINEID, crnwTR.index());
//    var rowno = getDataOfGrid('nwGridChargeDtls', '', SPR_CD_TAG, crnwTR.index());
//    var refTranNo = $("#idvallugRefTranNo").val();
//    var igtcode = getDataOfGrid('nwGridChargeDtls', '', SPR_CD_ITEMGRPTYPECODE, crnwTR.index());
    
//    isHeader = false;
//    if (docno == "" || lineID == "" || rowno == "") {
//        MessageBox("Cannot proceed. Data should be saved first", Title, "error");
//        return false;
//    }

//    if (nwDocno == "") {
//        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&nwLineID=" + lineID + "&nwRownum=" + rowno + "&nwApplyTo=" + refTranNo + "&nwItemG=" + igtcode + "";
//    }
//    else {
//        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&nwLineID=" + lineID + "&nwRownum=" + rowno + "&nwApplyTo=" + refTranNo + "&nwItemG=" + igtcode + "&isView=true";
//    }

//    nwLoading_Start('xbtnReqmtCompliance', crLoadingHTML);
//    nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
//    $('#nwPopUpRequireCompliance .BoxTitle').text("Requirements Compliance");
//    $("#nwPopUpRequireCompliance").css({ "min-width": "98%" });
//    $("#nwPopUpRequireCompliance").css({ "min-height": "98%" });
//    nwPopupForm_ShowModal("nwPopUpRequireCompliance");
//    nwLoading_End('xbtnReqmtCompliance');
//});

function btnReqComp_CD() {
    isCDRC = true;
    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;
    var row = GridCD.CellSelected.row - 1;
    var trantype = $("#txtTranType").val();
    var docno = $('#txtDocno').val();
    //var lineID = getDataOfGrid('nwGridChargeDtls', '', SPR_CD_LINEID, crnwTR.index());
    //var rowno = getDataOfGrid('nwGridChargeDtls', '', SPR_CD_TAG, crnwTR.index());
    var refTranNo = $("#idvallugRefTranNo").val();
    //var igtcode = getDataOfGrid('nwGridChargeDtls', '', SPR_CD_ITEMGRPTYPECODE, crnwTR.index());
    var igtcode = GridCD.GetValue(SPR_CD_ITEMGRPTYPECODE - 1 , row);
    var lineID = GridCD.GetValue(SPR_CD_LINEID - 1 , row);
    var rowno = GridCD.GetValue(SPR_CD_TAG - 1 , row);
    
    isHeader = false;
    if (docno == "" || lineID == "" || rowno == "") {
        MessageBox("Cannot proceed. Data should be saved first", Title, "error");
        return false;
    }

    if (nwDocno == "") {
        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&nwLineID=" + lineID + "&nwRownum=" + rowno + "&nwApplyTo=" + refTranNo + "&nwItemG=" + igtcode + "";
    }
    else {
        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&nwLineID=" + lineID + "&nwRownum=" + rowno + "&nwApplyTo=" + refTranNo + "&nwItemG=" + igtcode + "&isView=true";
    }

    nwLoading_Start('xbtnReqmtCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
    $('#nwPopUpRequireCompliance .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpRequireCompliance").css({ "min-width": "98%" });
    $("#nwPopUpRequireCompliance").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpRequireCompliance");
    nwLoading_End('xbtnReqmtCompliance');
}

var valdateOld = '';
$(document).on("focus", "#txtValueDate", function () {
    valdateOld = $("#txtValueDate").val();
});

$(document).on('change', '#txtValueDate', function () {
    let effectiveDate = $("#txtValueDate").val();
    let tag = isEffectiveWithPeriodDates(effectiveDate)

    if (Date.parse(effectiveDate) > Date.parse($('#txtServerdate').val()) && allowFuture == "0") {
        MessageBox("Cannot proceed. Value Date should not be later than the current server date.", Title, "error");
        $("#txtValueDate").val('');
        $("#txtValueDate").focus();
    } else if (tag == 0) {
        MessageBox("Cannot proceed. Value Date should be within the set period dates.", Title, 'error');
        $("#txtValueDate").val('');
    }
    //else if (tag == 2) {
    //    MessageBox("Cannot proceed. Period is already closed.", Title, 'error');
    //    $(this).val('');
    //}
    else {
        cust_GetPara();
        func_ActionDriven("actValDate", false);
        //CheckValRefCntDate(effectiveDate);
    }
});

function isEffectiveWithPeriodDates(effectiveDate) {
    let dateArr = effectiveDate.split("/");
    //let isEffectiveWithPeriodDates = false;
    let dateTag = 0; //tag 1 do not validate, tag 0, not in period dates, tag 2 period no is closed
    if (jsonPerDates.length <= 0) {
        //isEffectiveWithPeriodDates = true;
        dateTag = 1
    } else {
        let loc = $('#idvallugLocAcctForms').val();
        let mn = parseInt(dateArr[0]);
        let year = parseInt(dateArr[2]);
        //let perNo = jsonPerDates.filter(e => e["Month"] == mn && e["Year"] == year)[0].periodNo;
        let xtmpJson = jsonPerDatesClosing.filter(e => e["locForm"] == loc && e["periodNo"] == mn && e["closed"] == 1 && e["year"] == year)
        if (xtmpJson.length > 0) {
            dateTag = 2;
        } else {
            let tmpJson = jsonPerDates.filter(e => e["Month"] == mn && e["Year"] == year);
            if (tmpJson.length > 0) {
                for (let i = 0; i < tmpJson.length; i++) {
                    let effDate = Date.parse(effectiveDate);
                    let minDate = Date.parse(tmpJson[i]["Begdate"]);
                    let maxDate = Date.parse(tmpJson[i]["Enddate"]);
                    if (effDate >= minDate && effDate <= maxDate) {
                        //isEffectiveWithPeriodDates = true;
                        dateTag = 1;
                        break;
                    }
                }
            }
        }
    }

    return dateTag;

    //return isEffectiveWithPeriodDates;
}

function DisableExpAlloc() {    
    if (isLevel1 == "0" && nwDocno != "") {
        $("#btnSaveExpense").enable(false);
        $("#chkApplyToAll").enable(false);
        $("#chkApplyToPCCC").enable(false);
        var GridEC = nwGridExpenseCon_Book.ActiveSheet;
        GridEC.SetEnable(SPR_EA_EXPENSECODE - 1, Spread_ALLROW, false);
        GridEC.SetEnable(SPR_EA_AMOUNT - 1, Spread_ALLROW, false);
        GridEC.SetEnable(SPR_EA_PERCENT - 1, Spread_ALLROW, false);
        GridEC.SetBackground(SPR_EA_EXPENSECODE - 1, Spread_ALLROW, "gainsboro");
        GridEC.SetBackground(SPR_EA_AMOUNT - 1, Spread_ALLROW, "gainsboro");
        GridEC.SetBackground(SPR_EA_PERCENT - 1, Spread_ALLROW, "gainsboro");
        //$('#nwGridExpenseCon .tblGridBody tr td:nth-child(' + (SPR_EA_EXPENSECODE + 1) + ')').enable(false);
        //$('#nwGridExpenseCon .tblGridBody tr td:nth-child(' + (SPR_EA_AMOUNT + 1) + ') input').enable(false);
        //$('#nwGridExpenseCon .tblGridBody tr td:nth-child(' + (SPR_EA_PERCENT + 1) + ') input').enable(false);

        //$('#nwGridExpenseCon .tblGridBody tr td:nth-child(' + (SPR_EA_AMOUNT + 1) + ')').css("background-color", "gainsboro");
        //$('#nwGridExpenseCon .tblGridBody tr td:nth-child(' + (SPR_EA_PERCENT + 1) + ')').css("background-color", "gainsboro");
    }   
}

function CheckValRefCntDate(valdate) {
    var error = '';
    //crnwTable = $("#nwGridCon .tblGridBody");
    //var len = crnwTable.find('tr').length;  
    var Grid = nwGridCon_Book.ActiveSheet;
    var len = Grid.GetMaxRow();
    Grid.RenderStatus = false;
    for (var x = 0; x <= len; x++) {
        //var refdate = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_REFDATE + ') input').val();
        //var cntdate = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_COUNTERDATE + ') input').val();
        var refdate = Grid.GetValue(SPR_REFDATE - 1, x);
        var cntdate = Grid.GetValue(SPR_COUNTERDATE - 1, x);
        if (Date.parse(valdate) < Date.parse(refdate)) {
            error += "Cannot proceed. Ref. Date in row "+ (x + 1) +" should not be later than the Value Date.\n";
        }
        if (Date.parse(valdate) < Date.parse(cntdate)) {
            error += "Cannot proceed. Counter Date in row " + (x + 1) + " should not be later than the Value Date.\n";
        }
    }
    Grid.RenderStatus = true;

    if (error != "") {
        MessageBox(error, "Payment Request Entry", "error");
        $("#txtValueDate").val(valdateOld);
        return;
    }
    else {
        SetForexHdr();
    }
}

function CheckIfReqSL() {
    //crnwTable = $("#nwGridChargeDtlsCon .tblGridBody");
    //var len = crnwTable.find('tr').length;
    var GridCD = nwGridChargeDtlsCon_Book.ActiveSheet;
    GridCD.RenderStatus = false;
    var len = Grid.GetMaxRow();
    for (var x = 0; x <= len - 1; x++) {
        //var reqsl = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_REQSLTYPE + ')').text();
        //var reqsa = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_REQSUBACCNT + ')').text();
        //var linetype = crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_LINETYPE + ') select').val();
        var reqsl = GridCD.GetValue(SPR_CD_REQSLTYPE - 1, x);
        var reqsa = GridCD.GetValue(SPR_CD_REQSUBACCNT - 1, x);
        var linetype = GridCD.GetValue(SPR_CD_LINETYPE - 1, x);

        if (linetype == "1" && reqsl == "1") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SLTYPECODE + ')').enable(true);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_REFTYPECODE + ')').enable(true);
            GridCD.SetEnable(SPR_CD_SLTYPECODE - 1, row, true);
            GridCD.SetEnable(SPR_CD_REFTYPECODE - 1, row, true);
            GridCD.SetBackground(SPR_CD_SLTYPECODE - 1, row, "cyan");
            GridCD.SetBackground(SPR_CD_REFTYPECODE - 1, row, "cyan");
        }
        else {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_SLTYPECODE + ')').enable(false);
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_REFTYPECODE + ')').enable(false);
            GridCD.SetEnable(SPR_CD_SLTYPECODE - 1, row, false);
            GridCD.SetEnable(SPR_CD_REFTYPECODE - 1, row, false);
            GridCD.SetBackground(SPR_CD_SLTYPECODE - 1, row, "gainsboro");
            GridCD.SetBackground(SPR_CD_REFTYPECODE - 1, row, "gainsboro");
        }

        if (linetype == "1" && reqsa == "1") {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_BANKACCT + ')').enable(true);
            ridCD.SetEnable(SPR_CD_BANKACCT - 1, row, true);
            GridCD.SetBackground(SPR_CD_BANKACCT - 1, row, "cyan");
        }
        else {
            //crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_CD_BANKACCT + ')').enable(false);
            GridCD.SetEnable(SPR_CD_BANKACCT - 1, row, false);
            GridCD.SetBackground(SPR_CD_BANKACCT - 1, row, "gainsboro");
        }
    }
    GridCD.RenderStatus = true;
}


function autoSaveCD() {
    nwLoading_Start("xbtnSave", crLoadingHTML);
    isSaveTmpCD = true;
    taxConvert = "2";
    isBtnDone = false;
    cust_GetPara();
    nwParameter_Add("refno", $('#idvallugRefTranNo').val());
    nwParameter_Add("docno", $("#txtTMPID").val());
    //nwParameter_Add_Table("nwGridChargeDtlsCon");
    nwParameter_Add_Spread(nwGridChargeDtlsCon_Book);
    nwParameter_Add("row", currRow);
    nwParameter_Add("tmpDocno", $("#txtTMPID").val());
    nwParameter_Add("txtRateLoc", $("#txtForexLocal").val());
    nwParameter_Add("txtRateHome", $("#txtForexHome").val());
    nwParameter_Add("txtGrossAmt_CD", $("#txtGrossAmt_CD").val());
    nwParameter_Add("txtDocno", $("#txtDocno").val());
    nwParameter_Add("txtLineID_CD", $("#txtLineID_CD").val());
    nwParameter_Add("txtVendorTag", $("#txtVendorTag").val());
    //nwParameter_Add("withSI", $(`#nwGrid-nwData tr:eq(${mainGridCurr.index()})`).find(`td:eq(${SPR_WITHSI}) input`).is(":checked"));
    nwParameter_Add("withSI", 0);
    nwParameter_Add("txtTrantype", "PRFDRT");
    func_ActionDriven('actbtnSave', false);
}
var refdateOld = '';
var drdateOld = '';
var cntdateOld = '';
function p8Spread_Focus(canvasID, row, col) {
    if (canvasID == "nwGridCon") {
        var Grid = nwGridCon_Book.ActiveSheet;
        var row = Grid.CellSelected.row - 1;
        var col = Grid.CellSelected.col - 1;
        Grid.RenderStatus = false;
        if (col == (SPR_REFDATE - 1) || col == (SPR_DRDATE - 1) || col == (SPR_COUNTERDATE - 1) || col == (SPR_DUEDATE - 1)) {
            refdateOld = Grid.GetValue(SPR_REFDATE - 1, row);
            drdateOld = Grid.GetValue(SPR_DRDATE - 1, row);
            cntdateOld = Grid.GetValue(SPR_COUNTERDATE - 1, row);
        }
        if (col == (SPR_REFNO - 1)) {
            _crnwTR = row;
        }
        if (col == SPR_GROSSAMT - 1) {
            numGrossAmt_focus();
        }
        Grid.RenderStatus = true;
    }
    if (canvasID == "nwGridPrepaymentCon") {
        if (col == (SPR_STARTAMORT - 1)) {         
            dtpStartAmort_focus();
        }
        if (col == (SPR_ENDAMORT - 1)) {
            dtpEndAmort_focus();
        }
    }
    if (canvasID == "nwGridAllocProcessCon") {
        if (col == (SPR_AP_QTY - 1)) {
            numQty_AP_focus();
        }
        if (col == (SPR_AP_AMOUNT - 1)) {
            numAmount_AP_focus();
        }
        if (col == (SPR_AP_PERCENTAGE - 1)) {
            numPercentage_AP_focus();
        }
    }
    if (canvasID == "nwGridExpenseCon") {
        if (col == (SPR_EA_AMOUNT - 1)) {
            numPercentage_EA_focus();
        }
        if (col == (SPR_EA_PERCENT - 1)) {         
            numAmount_EA_focus();
        }
    }
    if (canvasID == "nwGridApplyAdvDMCon") {
        if (col == (SPR_ADM_APPLIEDAMT - 1)) {
            numAppliedAmt_focus();
        }
    }
    if (canvasID == "nwGridPrepayDefCon") {
        if (col == (SPR_DEF_AMORTDATE - 1) || col == (SPR_DEF_AMOUNT - 1)) {
            Prepay_focus();
        }
    }
    //return true;
}

function p8Spread_Change(canvasID, row, col) {
    if (canvasID == "nwGridCon") {
        var Grid = nwGridCon_Book.ActiveSheet;
        var row = Grid.CellSelected.row - 1;
        var col = Grid.CellSelected.col - 1;
        var currdate = $("#txtServerdate").val();
        var valdate = $("#txtValueDate").val();
        var refdate = Grid.GetValue(SPR_REFDATE - 1, row);
        var drdate = Grid.GetValue(SPR_DRDATE - 1, row);
        var counterDate = Grid.GetValue(SPR_COUNTERDATE - 1, row);
        var dueDate = Grid.GetValue(SPR_DUEDATE - 1, row);
        Grid.RenderStatus = false;
        if (col == (SPR_REFNO - 1)) {
            if (isLoadHstTemp == false) {
                //_crnwTR.find("td:eq(" + SPR_PAYMENTTERMCODE + ")").text(paytermCode);
                //_crnwTR.find("td:eq(" + SPR_PAYMENTTERMDESC + ")").text(paytermDesc);
                //_crnwTR.find("td:eq(" + SPR_NOOFDAYS + ")").text(noDays);
                Grid.SetText(SPR_PAYMENTTERMCODE - 1, row, paytermCode);
                Grid.SetText(SPR_PAYMENTTERMDESC - 1, row, paytermDesc);
                Grid.SetText(SPR_NOOFDAYS - 1, row, noDays);
                nwParameter_Add("txtDocno", $('#txtDocno').val());
                nwParameter_Add("idvallugVendorPayee", $("#idvallugVendorPayee").val());
                //nwParameter_Add("refno", _crnwTR.find("td:eq(" + SPR_REFNO + ") input").val());
                //nwParameter_Add("currRowIndex", _crnwTR.index());
                nwParameter_Add("currRowIndex", row);
                nwParameter_Add("refno", Grid.GetValue(SPR_REFNO - 1, row));
                nwParameter_Add("currRowIndex", row);
                func_ActionDriven("actValidateRefNo", false);

                CheckDuplicateRefNo("refno");
            }
        }

        if (col == (SPR_REFDATE - 1)) {                             
            var xbool2 = nwDateMaskCheck(Grid.GetValue(SPR_REFDATE - 1, row));

            if (Date.parse(currdate) < Date.parse(refdate)) {
                MessageBox("Cannot proceed. Ref. Date should not be later than the current server date.\n", "Payment Request Entry", "error");
                Grid.SetText(SPR_REFDATE - 1, row, refdateOld);
                return false;
            }
            else if (Date.parse(refdate) < Date.parse(drdate)) {
                MessageBox("Cannot proceed. DR/COC Date should not be later than the Ref. Date.\n", "Payment Request Entry", "error");
                Grid.SetText(SPR_REFDATE - 1, row, refdateOld);
                return false;
            }
            else if (Date.parse(valdate) < Date.parse(refdate)) {
                MessageBox("Cannot proceed. Ref. Date should not be later than the Value Date.\n", "Payment Request Entry", "error");
                Grid.SetText(SPR_REFDATE - 1, row, refdateOld);
                return false;
            }
            else {
                basisForAging = $("#txtBasisAging").val();
                if (basisForAging == "INVDATE") {
                    GetDueDate(Grid.GetValue(SPR_REFDATE - 1, row));
                }
                else if (basisForAging == "CNTDATE") {
                    GetDueDate(Grid.GetValue(SPR_COUNTERDATE - 1, row));
                }
                else if (basisForAging == "VALDATE") {
                    GetDueDate($("#txtServerdate").val());
                }
                else if (basisForAging == "CREDATE") {
                    GetDueDate($("#txtServerdate").val());
                }
            }

            if (xbool2 == false) {
                Grid.SetText(SPR_REFDATE - 1, row, "");
            }
        }

        if (col == (SPR_DRDATE - 1)) {           
            var xbool2 = nwDateMaskCheck(Grid.GetValue(SPR_DRDATE - 1, row));

            if (Date.parse(currdate) < Date.parse(drdate)) {
                MessageBox("Cannot proceed. DR/COC Date should not be later than the current server date.\n", "Payment Request Entry", "error");
                Grid.SetText(SPR_DRDATE - 1, row, drdateOld);
                return false;
            }
            else if (Date.parse(refdate) < Date.parse(drdate) && refdate != "") {
                MessageBox("Cannot proceed. Ref. Date should not be earlier than the DR/COC Date.\n", "Payment Request Entry", "error");
                Grid.SetText(SPR_DRDATE - 1, row, drdateOld);
                return false;
            }

            if (xbool2 == false) {
                Grid.SetText(SPR_DRDATE - 1, row, "");
            }
        }

        if (col == (SPR_COUNTERDATE - 1)) {           
            var xbool2 = nwDateMaskCheck(Grid.GetValue(SPR_COUNTERDATE - 1, row));

            if (Date.parse(currdate) < Date.parse(counterDate)) {
                MessageBox("Cannot proceed. Counter Date should not be later than the current server date.\n", "Payment Request Entry", "error");
                Grid.SetText(SPR_COUNTERDATE - 1, row, cntdateOld);
                return false;
            }
            else if (counterDate < refdate) {
                MessageBox("Cannot proceed. Counter Date should not be earlier than Ref. Date.\n", "Payment Request Entry", "error");
                Grid.SetText(SPR_COUNTERDATE - 1, row, cntdateOld);
            }
            else if (Date.parse(valdate) < Date.parse(counterDate)) {
                MessageBox("Cannot proceed. Counter Date should not be later than the Value Date.\n", "Payment Request Entry", "error");
                Grid.SetText(SPR_COUNTERDATE - 1, row, cntdateOld);
                return false;
            }
            else {
                basisForAging = $("#txtBasisAging").val();
                if (basisForAging == "INVDATE") {
                    GetDueDate(Grid.GetValue(SPR_REFDATE - 1, row));
                }
                else if (basisForAging == "CNTDATE") {
                    GetDueDate(Grid.GetValue(SPR_COUNTERDATE - 1, row));
                }
                else if (basisForAging == "VALDATE") {
                    GetDueDate($("#txtServerdate").val());
                }
                else if (basisForAging == "CREDATE") {
                    GetDueDate($("#txtServerdate").val());
                }
            }

            if (xbool2 == false) {
                Grid.SetText(SPR_COUNTERDATE - 1, row, "");
            }
        }

        if (col == (SPR_DUEDATE - 1)) {
            if (dueDate < refdate) {
                MessageBox("Due Date should not be earlier than Ref. Date", Title);
                Grid.SetText(SPR_DUEDATE - 1, row, "");
            }
            else {
                Grid.SetText(SPR_PAYMENTTERMCODE - 1, row, "");
                Grid.SetText(SPR_PAYMENTTERMDESC - 1, row, "");
                Grid.SetText(SPR_NOOFDAYS - 1, row, "");
            }
        }

        if (col == SPR_GROSSAMT - 1) {
            numGrossAmt();
        }
        Grid.RenderStatus = true;
    }

    if (canvasID == "nwGridChargeDtlsCon") {
        if (col == (SPR_CD_QTY - 1) || col == (SPR_CD_UNITCOST_VATIN - 1)) {
            computeVATEX();
        }
        if (col == (SPR_CD_UNITCOST_VATEX - 1)) {
            numVATEX();
        }
        if (col == (SPR_CD_PERIODFROM - 1)) {
            dtpPeriodFrom();
        }
        if (col == (SPR_CD_PERIODFROM - 1)) {
            dtpPeriodTo();
        }
    }

    if (canvasID == "nwGridPrepaymentCon") {
        if (col == (SPR_STARTAMORT - 1)) {
            dtpStartAmort();
        }
        if (col == (SPR_NOPERIODS - 1)) {
            numNoPeriods();
        }
        if (col == (SPR_ENDAMORT - 1)) {
            dtpEndAmort();
        }
    }

    if (canvasID == "nwGridAllocProcessCon") {
        if (col == (SPR_AP_QTY - 1)) {
            numQty_AP();
        }
        if (col == (SPR_AP_AMOUNT - 1)) {
            numAmount_AP();
        }
        if (col == (SPR_AP_PERCENTAGE - 1)) {
            numPercentage_AP();
        }
    }

    if (canvasID == "nwGridExpenseCon") {
        if (col == (SPR_EA_AMOUNT - 1)) {
            numAmount_EA();
        }
        if (col == (SPR_EA_PERCENT - 1)) {         
            numPercentage_EA();
        }
    }
    if (canvasID == "nwGridApplyAdvDMCon") {
        if (col == (SPR_ADM_APPLIEDAMT - 1)) {
            numAppliedAmt();
        }
    }
    if (canvasID == "nwGridPrepayDefCon") {
        if (col == (SPR_DEF_AMORTDATE - 1) || col == (SPR_DEF_AMOUNT - 1)) {
            Prepay_change();
        }
    }
}

var pccc_row;
var prepay_row;
function p8Spread_Click(canvasID, row, col) {
    
    if (canvasID == "nwGridCon") {
        nwGridCon_Book.ActiveSheet.RenderStatus = false;
        mainGridCurr = row;
        lineID = nwGridCon_Book.ActiveSheet.GetValue(SPR_LINEID - 1, row);
        currRow = row;
        if (col == SPR_REQMTCOMPLIANCE - 1) {
            btnReqmtCompliance();
        }
        if (col == SPR_RVWATTACHMENTS - 1) {
            btnRvwAttach();
        }
        if (col == SPR_HOLDPAYMENT - 1) {
            chkboxHold();
        }

        if (col == (SPR_DRNO - 1) || col == (SPR_DRDATE - 1) || col == (SPR_WITHSI - 1) || (SPR_REFNO - 1) || col == (SPR_REFDATE - 1) || col == (SPR_COUNTERDATE - 1)
            || col == (SPR_DUEDATE - 1) || col == (SPR_GROSSAMT - 1) || col == (SPR_WITHADA - 1) || col == (SPR_HOLDPAYMENT - 1)) {

            var loc = $("#descvallugLocAcctForms").val();
            var vendor = $("#descvallugVendorPayee").val();
            var reqType = $("#cmbPaymentRqstType").val();
            var reqSubType = $("#cmbPaymentRqstSubType").val();
            var remarks = $("#txtRemarks").val();
            var othrIns = $("#txtOthrPayIns").val();
            var rsnReq = $("#descvallugRsnReq").val();
            var controlAccnt = $("#descvallugAPCtrlAccnt").val();

            if (reqType == "02") {
                if (loc == "" || vendor == "" || reqType == "" || remarks == "" || rsnReq == "" || controlAccnt == "") {
                    MessageBox("Cannot proceed. Please complete the header details.", Title, "error");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_REFNO - 1, row, "");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_REFDATE - 1, row, "");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_DRNO - 1, row, "");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_DRDATE - 1, row, "");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_PAYMENTTERMCODE - 1, row, "");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_PAYMENTTERMDESC - 1, row, "");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_NOOFDAYS - 1, row, "");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_COUNTERDATE - 1, row, "");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_DUEDATE - 1, row, "");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_GROSSAMT - 1, row, "");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_FOREXRATEDATE - 1, row, "");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_RATETOHOME - 1, row, "");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_RATETOLOCAL - 1, row, "");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_NETAMTHOME - 1, row, "");
                    nwGridCon_Book.ActiveSheet.SetText(SPR_NETAMTLOCAL - 1, row, "");
                    return;
                }
            }

            if (col == (SPR_DRNO - 1) || col == (SPR_REFNO - 1)) {
                $('.txtRefno').attr("maxlength", 30);
                $('.txtDRNo').attr("maxlength", 30);
            }

            if (col == (SPR_REFTRANNO - 1) || col == (SPR_REFTRANDATE - 1) || col == (SPR_NETAMT - 1)) {
                CustomizeLoadByClick();                
            }
        }
        nwGridCon_Book.ActiveSheet.RenderStatus = true;
    }

    if (canvasID == "nwGridChargeDtlsCon") {
        if (col == SPR_CD_REQCOMP - 1) {
            btnReqComp_CD();            
        }
        if (col == SPR_CD_BDGTDTLS - 1) {
            btnBdgtDtls();
        }
    }
    if (canvasID == "nwGridBdgtChargingCon") {
        if (col == SPR_BCD_ALLOCDTLS - 1) {
           btnAllocProc();
        }

    }
    if (canvasID == "nwGridPCCCAllocCon") {
        var GridPCCC = nwGridPCCCAllocCon_Book.ActiveSheet;
        pccc_row = GridPCCC.CellSelected.row - 1;
        if (col == SPR_PCCC_EXPENSEALLOC - 1) {
            btnExpAlloc();
        }
    }
    if (canvasID == "nwGridPrepayDefCon") {
        var GridPD = nwGridPrepayDefCon_Book.ActiveSheet;
        prepay_row = GridPD.CellSelected.row - 1;
        if (col == SPR_DEF_PCCC - 1) {
            btnPcCcAlloc();
        }
    }
    if (canvasID == "nwGridPrepaymentCon") {
        var GridPC = nwGridPrepaymentCon_Book.ActiveSheet;
        prepay_row = GridPC.CellSelected.row - 1;
        if (col == SPR_PCCCALLOC - 1) {
            btnPcCcAlloc();
        }
    }

    if (canvasID == "nwGridApplyAdvDMCon") {
        if (col == SPR_ADM_FORMS - 1) {
            btnADMForms();
        }
        if (col == SPR_ADM_APPLIEDHST - 1) {
            btnADMHst();
        }
        if (col == SPR_ADM_DEFAPPAMTDTLS - 1) {
            btnDefAmtDtls();
        }
    }
    if (grid == "nwGridBdgtChargingCon") {
        DisplayBdgtCombinationAndChecking();
    }
    //return true;
}

function ChargingDtls() {
    setTimeout(function () {
       MainGridConfig();
       ComputeTotalChrg();
       LiquidationCol();
       ComputeSubtotal();
       ComputeVATEWT();
       ComputeGrossAmount();
       ComputeTotalAmountDue();
       ComputeDPDMRet();
       ComputeNetAmount();
    }, 500);
}

function ChargingDtlsJS() {
    setTimeout(function () {
        MainGridConfig();
        ComputeTotalChrg();
    }, 500);
}

function GridPropJS() {
    setTimeout(function () {
        PropnwGridCon();
        DisableGridCol();
    }, 500);
}

function getGridData(idnum, index) {
    var data = $(`#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(${idnum - 1})`).find(`td:eq(${index}) span`).text();
    //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
    return data;
}

function getDataOfGrid(nwGrid, type, col, row) {
    var data = '';

    data = `${nwGrid}_Book.ActiveSheet.GetValue(${col - 1}, ${row})`;
    //if (type == 'input' || type == 'textarea')
    //    data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) ${type}`).val();
    //else
    //    data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text();

    return data.replace('`', '');
}

function setGridData(nwGrid, type, col, row, val) {
    //if (type == 'input' || type == 'textarea')
    //    $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) ${type}`).val(val);
    //else
    //    $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text(val);

    `${nwGrid}_Book.ActiveSheet.SetText(${col -1}, ${row}, "${val}")`;
}

//function getNum(val) {
//    if (isNaN(val) || val == '') {
//        val = 0
//    }
//    return val;
//}
//var num = 0;
//function getNumReplace(val) {
//    //val = getNum(parseFloat(val.toString().replace(/,/g, "")))
//    //return val;

//    if (val == "" || val == undefined) {
//        val = "0.00";
//    }
//    return val.toString().replace(/,/g, '');
//}

function getNum(val) {
    if (isNaN(val) || val == '') {
        val = 0
    }
    return val;
}

function getNumReplace(val) {
    val = getNum(parseFloat(val.toString().replace(/,/g, '')))
    return val;
}