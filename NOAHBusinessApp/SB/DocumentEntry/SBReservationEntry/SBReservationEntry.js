/* Global Variables */
var nwUnitCode = '';


/*Note always match this to your query*/
var Cols = {
    UnitCode: 0,
    UnitDesc: 1,
    InventoryType: 2,
    InventoryClass: 3,
    UOM: 4,
    Project: 5,
    PropertyType: 6,
    UnitStatus: 7,
    LotArea: 8,
    FloorArea: 9,
    InventoryTypeCode: 10,
    InventoryClassCode: 11,
    ModelDesc: 12,
    ReferenceHoldingNo: 13,
    CrossReference: 14,
    LotPrice: 15,
    HousePrice: 16,
    SellingPrice: 17,
    VatAmount: 18,
    GrossSellingPrice: 19,
    Miscellaneous: 20,
    TotalContractPrice: 21,
    SalesDiscount: 22,
    DPDiscount: 23,
    NetContractPrice: 24,
    MiscChargeRate: 25,
    MiscChargeAmt: 26,
    VatRate: 27,
    MinReservationAmt: 28,
    InhouseDPRate: 29,
    inventoryGroupCode: 30,
    InventoryGroupDesc: 31,

    Code: 0,
    Description: 1,
    ContractRate: 2,
    TermAmount: 3,
    Misc: 4,
    ContractAmount: 5,
    SalesDiscountLin: 6,
    DPDisc: 7,
    DPDiscAmount: 8,
    NetContractPriceLin: 9,
    TotalNoPayments: 10,
    MonthlyDp: 11,
    FinancingType: 12,
    WithSchedule: 13,
    TermPeriod: 14,
    PenaltyRate: 15,
    AnnualRate: 16,
    Period: 17,

    FinancingTypeCode: 0,
    FinancingTypeDesc: 1,

    DiscountCode: 0,
    DiscountDesc: 1,

    AddonCategoryCode: 0,
    AddonCategory: 1,
    AddonItemCode: 2,
    AddonItemDesc: 3,
    AddonItemGroupType: 4,
    AddonQuantity: 5,
    AddonUOMCode: 6,
    AddonUOM: 7
};
var custClassCode = '';
var discountBasis;
/* Unit Details */
var
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



/* Addons */
SPR_Addon_CategoryCode = 1,
SPR_Addon_Category = 2,
SPR_Addon_AddonItemCode = 3,
SPR_Addon_AddonItemDesc = 4,
SPR_Addon_Qty = 5,
SPR_Addon_UOMCode = 6,
SPR_Addon_UOM = 7,


/*Discount*/
SPR_Discount_DiscountCode = 1,
SPR_Discount_DiscountType = 2,
SPR_Discount_DiscountRate = 3,
SPR_Discount_BasisOfDiscount = 4,
SPR_Discount_DiscountApp = 5,
SPR_Discount_DiscountAmt = 6,
SPR_Discount_DiscountSP = 7,
SPR_Discount_DiscountMSC = 8,


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
SPR_FreebiesPromoIncentives_NameCode = 11,
SPR_FreebiesPromoIncentives_NameDesc = 12,

 /*Term Details*/
 SPR_TermDetails_PaymentTerm_Code = 1,
 SPR_TermDetails_PaymentTerm_Desc = 2,
 SPR_TermDetails_ContractRate = 3,
 SPR_TermDetails_TermAmount = 4,
 SPR_TermDetails_Discount = 5,
 SPR_TermDetails_MonthlyPayment = 6,
 SPR_TermDetails_TermPeriodMonths = 7,
 SPR_TermDetails_InterestRate = 8,
 SPR_TermDetails_PenaltyRate = 9,
 SPR_TermDetails_FinancingType = 10,
 SPR_TermDetails_StartDate = 11,
 SPR_TermDetails_EndDate = 12,


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

    SPR_MISC_MISCTYPE = 1,
    SPR_ALLOCATIONTYPE = 2,
    SPR_PAYMENTCATEGORY = 3,
    SPR_MISCELLANEOUSDATE = 4,
    SPR_MISCELLANEOUSAMOUNT = 5,
    SPR_ORDERING = 6,

    SPR_APPROVAL_LEVEL = 1,
    SPR_CODE = 2,
    SPR_APPROVER_NAME = 3;

var startIndexPaymentDetails = 1,
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
spr_PaymentDetailsUniqueID = ++startIndexPaymentDetails;

var startIndexPaymentDetailsAttach = 1,
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
spr_PaymentDetailsAttachParticulars = ++startIndexPaymentDetailsAttach;
spr_PaymentDetailsAttachUniqueID = ++startIndexPaymentDetailsAttach;


var startIndexPT = 0,
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

var startIndexPT = 0,
    SPR_RefAddon_UnitCode = ++startIndexPT,
    SPR_RefAddon_Desc = ++startIndexPT;



var monthlDP = 0.00;
var decimalpoint = 0;
var pagetitle = "Reservation Entry";
var AmortStartDate;
var vatlimit_global = 0;
var vatrate_global = 0;
var minimumAmt_global = 0;
var itemgrouptype_global = '';
var itemgroup_global = '';
var category_global;
var copydropdown = '';
var nwDocno = '';
var isSpecial = '';
var dtStatementDetails = '';
var idNum_global = '';

var globaltag = '';
var globaldiscountrate = 0;
var globalbasis = '';
var globalapp = '';
var globalindex = 0;

var oldCategory = '';
var oldPaymentTerm = '';

// JSON
var jsonAllCombo = '';
var jsonMisc = '';
var jsonSpot = '';

var ColsCode = '',
    ColsDescription = '',
    ColsPenaltyRate = '',
    ColsAnnualRate = '',
    ColsPeriod = '',
    ColsTermPeriod = '',
    ColsContractRate = '',
    ColsTermAmount = '',
    ColsContractAmount = '',
    ColsSalesDiscountLin = '',
    ColsDPDisc = '',
    ColsDPDiscAmount = '',
    ColsNetContractPriceLin = '',
    ColsTotalNoPayments = '';


var nwGridMainCon_Book_PaymentTerm;
var nwGridMainCon_Sheet_PaymentTerm;


var nwGridMainCon_Book_RefBasedUnitAddOn;
var nwGridMainCon_Sheet_RefBasedUnitAddOn;

var nwGridMainCon_Book_Discount;
var nwGridMainCon_Sheet_Discount;

var nwGridMainCon_Book_AddOns;
var nwGridMainCon_Sheet_AddOns;

var nwGridMainCon_Book_CoBuyer;
var nwGridMainCon_Sheet_CoBuyer;


var nwGridMainCon_Book_MiscType;
var nwGridMainCon_Sheet_Misctype;

var nwGridMainCon_Book_PaymentTerm_Amortization;
var nwGridMainCon_Sheet_PaymentTerm_Amortization;


var nwGridMainCon_Book_Schedule_Amortization;
var nwGridMainCon_Sheet_Schedule_Amortization;


var nwGridMainCon_Book_UnitDetails;
var nwGridMainCon_Sheet_UnitDetails;

function func_Reload() {
    crLnk = `../SBReservationEntry/SBReservationEntry_Gateway`;
    crLnkGateKey = `SBReservationEntry`;

    $(`#txtLOIDate`).datepicker();
    $(`#txtLOIDate`).mask(`99/99/9999`);

    $(`#txtBirthdate`).datepicker();
    $(`#txtBirthdate`).mask(`99/99/9999`);

    $(`#txtDPStartDate`).datepicker();
    $(`#txtDPStartDate`).mask(`99/99/9999`);
    $(`#txtBalStartDate`).datepicker();
    $(`#txtBalStartDate`).mask(`99/99/9999`);
    $('#txtMaturityDate').datepicker();
    $(`#txtMaturityDate`).mask(`99/99/9999`);


    nwPopupForm_Create(`nwPopWindow`);
    nwPopupForm_Create(`nwPopUp_UnitCapacity`);
    nwPopupForm_Create("nwApprover", true);

    nwPopupForm_Create("nwStatementDetails", true);
    nwPopupForm_Create('nwPopUp_ReservationDocumentEntry');
    nwPopupForm_Create("nwMisc", true);

    nwPopupForm_Create("nwPaymentDetails", true);
    nwPopupForm_Create("nwAttachmentPaymentDetails", true);
    nwPopupForm_Create("nwUploadCon");
    nwPopupForm_Create("modal-View");

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;

    $(`#settingstabs`).tabs();
    DisableFields();

    getParameterByName(`nwu`);

    nwPopupForm_Create("nwAddRefBasedAddOn", false);



    $(`#txtReservationDate`).datetimepicker({
        timeFormat: `HH:mm:ss`,
        timeInput: true
    }).inputmask({
        mask: "99/99/9999 99:99:99",
        clearIncomplete: true
    });

    $(`#txtExpirationDate`).datetimepicker({
        timeFormat: `HH:mm:ss`,
        timeInput: true
        //addSliderAccess: true,
        //sliderAccessArgs: { touchonly: false }
    }).inputmask({
        mask: "99/99/9999 99:99:99",
        clearIncomplete: true
    });




    return isContinue;
}


// For input Percentage
function LoadPercentageFormat($id) {
    $id.inputmask("percentage", {
        suffix: "",
        integerDigits: 3,
        digitsOptional: false,
        oncleared: function () { $(this).val('') }
    });
}

// For Discount Rate
function LoadPercentageFormat2($id) {
    $id.inputmask("percentage", {
        suffix: "",
        integerDigits: 3,
        digitsOptional: false,
        digits: 10,
        oncleared: function () { $(this).val('') }
    });
}

// For input Amount
function LoadAmountFormat($id, $digit) {
    $id.inputmask("currency", {
        prefix: "",
        integerDigits: $digit,
        //enforceDigitsOnBlur: true,
        clearMaskOnLostFocus: true,
        oncleared: function () { $(this).val('') }
    });
}

// For input Integer
function LoadIntegerFormat($id) {
    $id.inputmask("integer", {
        integerDigits: 3,
        //enforceDigitsOnBlur: true,
        oncleared: function () { $(this).val('') }
    });
}



function Refresh() {
    setTimeout(function () {
        $('#noah-webui-default-Refresh').click();
    }, 500);
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields(0);
    func_Toolbox_Clear();

    cust_GetPara();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    newSpreadErrorSolutionCustom();
    cust_GetPara();

    //var tableHtml = $('#nwGridUnitDetails > tbody').html();
    //var timeout = window.setInterval(function () {

    //    if (tableHtml != $('#nwGridUnitDetails > tbody'))
    //        console.log('no change');
    //    else {
    //        console.log('table changed!');
    //        clearInterval(timeout);
    //    }
    //}, 10);


    parent_MessageBoxQuestionToolBox(`Do you want to save the current record?`, pagetitle, ``, indef, enume);
    isContinue = false;

    return isContinue;
}
function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox(`Do you want to delete the current record?`, pagetitle, ``, indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwLoading_Start(`xRefreshBtn`, crLoadingHTML);

    isRefreshed = true;
    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox(`Do you want to process the current record?`, pagetitle, ``, indef, enume);
    isContinue = false;
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
    //tableToPrint("nwGridCon");
    //parent_MessageBox("Export","Export Sucess","");
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
    nwParameter_Add(`inCode`, $(`#idvallugDa`).val());
    nwParameter_Add(`inTableName`, $(`#nwTableName`).val());
    nwParameter_Add(`nwScreenID`, $(`#nwScreenID`).val());
    nwParameter_Add(`new_txtUniCode`, $('#new_txtUniCode').val());
    /* Header */
    nwParameter_Add(`idvallugFinancingType`, $(`#idvallugFinancingType`).val());
    nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());
    nwParameter_Add(`txtGrossSellingPrice`, parseFloat($(`#txtGrossSellingPrice`).val().split(',').join('')) || 0.00);
    nwParameter_Add(`ReservationControlNo`, $(`#txtReservationControlNo`).val());
    nwParameter_Add(`ReservationDate`, $(`#txtReservationDate`).val());
    nwParameter_Add(`ddtxtSourceOfSale`, $(`#ddtxtSourceOfSale option:selected`).val());
    nwParameter_Add(`ddOrigin`, $(`#ddOrigin option:selected`).val());

    /* Unit Details Tab*/
    nwParameter_Add(`ddPhaseTower`, $('#ddPhaseTower option:selected').val());
    nwParameter_Add(`ddPhaseTower_temp`, $('#ddPhaseTower_temp').val());
    nwParameter_Add(`ddlNoOfUnits`, $(`#ddlNoOfUnits option:selected`).val());
    var UnitCode = $('#nwGridUnitDetails-nwData tr:eq(0) td:eq(' + SPR_UnitDetails_UnitCode + ')').text();/*Fixed Position*/
    nwParameter_Add(`UnitCode`, UnitCode);

    var UnitClass = $('#nwGridUnitDetails-nwData tr:eq(0) td:eq(' + SPR_UnitDetails_InventoryClassCode + ')').text();
    var UnitType = $('#nwGridUnitDetails-nwData tr:eq(0) td:eq(' + SPR_UnitDetails_InventoryTypeCode + ')').text();

    nwParameter_Add(`UnitClass`, UnitClass);
    nwParameter_Add(`UnitType`, UnitType);

    /*Payment Term Details Tab*/
    //var PaymentCategory=$('#nwGridPaymentTermDetails-nwData tr:eq(' + crnwTR.index() + ') td:eq(1) option:selected').val();
    //nwParameter_Add(`PaymentCategory`, PaymentCategory);

    nwParameter_Add(`inTableName`, $(`#nwTableName`).val());
    nwParameter_Add(`nwScreenID`, $(`#nwScreenID`).val());
    //nwParameter_Add(`IDUnitCapacity`, GetConcatID());
    nwParameter_Add(`Agency`, $('#Agency').val());


    /*Insurance Tab*/
    nwParameter_Add('ddtxtInsuranceCompany', $('#ddtxtInsuranceCompany option:selected').val());
    nwParameter_Add(`nwScreenID`, $(`#nwScreenID`).val());
    nwParameter_Add('txtCoBorrower', $('#txtCoBorrower').val());
    nwParameter_Add('txtLoanAmount', $('#txtLoanAmount').val());
    nwParameter_Add('txtLoanTerm', $('#txtLoanTerm').val());
    nwParameter_Add('txtMaturityDate', $('#txtMaturityDate').val());
    nwParameter_Add('radioNel', $('#radioNel').prop('checked'))
    nwParameter_Add('radioAboveNel', $('#radioAboveNel').prop('checked'));
    nwParameter_Add('radioYes', $('#radioYes').prop('checked'));
    nwParameter_Add('radioNo', $('#radioNo').prop('checked'));
    nwParameter_Add_Table(`nwGridInsuranceCon`);
    //nwParameter_Add(`ItemGroupType`, getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_ItemGroupTypeCode, 0));
    nwParameter_Add('dtStatementDetails', dtStatementDetails);
    nwParameter_Add('txtBirthdate', $('#txtBirthdate').val());


    nwParameter_Add('txtsalesdirector', $('#txtsalesdirector').val());
    nwParameter_Add('txtsalesmanager', $('#txtsalesmanager').val());
    nwParameter_Add('txtInterestRate', parseFloat($('#txtInterestRate').val()));
    nwParameter_Add(`vatrate`, vatrate_global);
    nwParameter_Add(`txtPAFormNotes`, $('#txtPAFormNotes').val());
    nwParameter_Add(`txtSalesDiscount`, $('#txtSalesDiscount').val());
    nwParameter_Add(`txtFixedInterest`, $('#txtFixedInterest').val());
    nwParameter_Add(`idvallugAccountLoc1`, $('#idvallugAccountLoc1').val());
    nwParameter_Add(`idvallugAccountLoc2`, $('#idvallugAccountLoc2').val());
    nwParameter_Add(`txtCashAmount`, parseFloat($('#txtCashAmount').val()));
    nwParameter_Add(`ddSpotCashDiscount`, parseFloat($('#ddSpotCashDiscount option:selected').val()));

    nwParameter_Add(`idvallugClient`, $('#idvallugClient').val());
    //var discountrate = parseFloat($('#txtSalesDiscountRate').val().replace(' %', '')) || 0.00;
    //nwParameter_Add(`SalesDiscountRate`, discountrate);

    //var chkatneedsale = $('#chkatneedsale').prop('checked');
    //nwParameter_Add(`AtNeedSale`, chkatneedsale);
    var chkIsAllAgent = $('#chkAgent').prop('checked');
    nwParameter_Add('IsAllAgent', chkIsAllAgent);

    //nwParameter_Add(`txtItemGroupType`, $('#txtItemGroupType').val());
    nwParameter_Add(`txtItemGroupType`, $('#txtItemGroupType').val());
    var UnitCode = getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitCode, 0);

    nwParameter_Add(`txtUnitCode`, $('#txtUnitCode').val());
    //nwParameter_Add(`txtItemGroupType`, $('#txtItemGroupType').val());
    nwParameter_Add(`txtUnitType`, $('#txtUnitType').val());
    nwParameter_Add(`txtUnitClass`, $('#txtUnitClass').val());
    nwParameter_Add(`txtVatrate`, $('#txtVatrate').val());
    nwParameter_Add(`idvallugLocWithAccntblForms`, $('#idvallugLocWithAccntblForms').val());


    var misc = parseFloat(getGridDataPerLine('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_MiscInstallment, 0).split(',').join('')) || 0;
    nwParameter_Add(`Misc`, misc);
    nwParameter_Add(`txtMisc`, $('#txtMisc').val());

    //get reservation amount
    var reservAmount = 0.00;
    $('#nwGridPaymentTermDetailsData tr:gt(1)').each(function (i, x) {
        if ($(this).find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val() == 'RESRV') {
            reservAmount = parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_NetContractPrice + ')').text().split(',').join('')) || 0.00;
        }
    });
    nwParameter_Add(`reservAmount`, reservAmount);
    nwParameter_Add(`nwUnitCode`, nwUnitCode);
    nwParameter_Add(`nwDocno`, nwDocno);
    nwParameter_Add(`ReferenceHoldingNo`, $('#new_txtRefHoldingNo').val());

    nwParameter_Add(`new_txtInventoryTypeCode`, $('#new_txtInventoryTypeCode').val());
    nwParameter_Add(`new_txtInventoryClassCode`, $('#new_txtInventoryClassCode').val());
    nwParameter_Add(`new_txtInventoryGroupCode`, $('#new_txtInventoryGroupCode').val());
    nwParameter_Add_Table(`nwGridAmortizationCon`, false);

    nwParameter_Add(`paymentDetails`, JSON.stringify($paymentDetails));
    nwParameter_Add(`attachmentDetails`, JSON.stringify($attachmentDetails));



    nwParameter_Add_DataSet("nwGridPaymentTermDetails");
    nwParameter_Add_DataSet("nwGridDiscount");
    nwParameter_Add_DataSet("nwGridAddOn");
    nwParameter_Add_DataSet("nwGridCoBuyer");

}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    $('#nwGridAmortization').remove();
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {

    cust_GetPara(); nwLoading_Start("xLoadingInt", crLoadingHTML);
    nwParameter_Add("txtCode", $("#txtCode").val());
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("xSample", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", true);
}


///////////////////////////////////////

function nwGrid_AddtoListBefore() {
    return false;
}

/************************** BEGIN HERE (Unit Details Tab) ************************************/
function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {

    var cnt = nwLib.nwTempTable_Row_Count("nwGridUnitDetails");
    if (index == 0) {
        category_global = $('tr:eq(' + (crnwTR.index() + 1) + ') .nwSelect option:selected').index();
    }

    /*Checking if the unitcode is already exists.*/
    var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + Cols.UnitCode + ')').text();
    var isValid = nwLib.nwTempTable_Column_ValueExist("nwGridUnitDetails", SPR_UnitDetails_UnitCode, code, false, "text");

    if (isValid == false) {

        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitCode, crnwTR.index(), addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + Cols.UnitCode + ')').text());
        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitDesc, crnwTR.index(), addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + Cols.UnitDesc + ')').text());


        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_UnitCode + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_UnitDesc + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_Category + ') option:eq(' + (category_global) + ')').prop('selected', true);
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_ItemGroupTypeCode + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_ItemGroupTypeDesc + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(6)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_VatRate + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(8)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_Qty + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(11)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_UOMCode + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(12)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_UOM + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(13)').text());
        //decimal = (addtoListTableRec.find('tr:eq(' + index + ') td:eq(14)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_LotArea + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(15)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_ItemGroupCode + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(17)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_ItemGroupDesc + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(18)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_CrossReferenceCode + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(20)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_RefHoldingNo + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(21)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_ID + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(22)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_Level1 + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(23)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_Level2 + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(24)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_Level3 + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(25)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_Level4 + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(26)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_Level5 + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(27)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_Level6 + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(28)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_Level7 + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(29)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_Level8 + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(30)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_Level9 + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(31)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_Level10 + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(32)').text());
        //crnwTRtemp.find('td:eq(' + SPR_UnitDetails_LotCapacity + ')').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(33)').text());


        if (cnt == (crnwTR.index() + 1))
            nwGrid_AddRow("nwGridUnitDetails", 1);

    }
    else {
        crnwTRtemp = null;
    }
    return crnwTRtemp;
}

function nwGrid_AddtoListLoaded(tbl) {
    var ID = tbl.attr('id');
    if (ID = 'nwGridUnitDetails-nwData')
        GetTotalUnitCapacity(tbl);

    //if (ID = 'nwGridUnitDetails-nwData') {
    //    var NoOfUnits = (parseFloat($('#ddlNoOfUnits option:selected').text()) || 0);
    //    var TotalQty = getTotalUnitDetailsQty();
    //    if (TotalQty != NoOfUnits) {
    //        MessageBox('Total Quantity should be equal to No. of Units.', pagetitle);
    //    }
    //}

}

//function getTotalUnitDetailsQty() {
//    var totalAmt = 0;

//    var cnt = nwLib.nwTempTable_Row_Count("nwGridUnitDetails");

//    for (var row = 0; row <= cnt; row++) {

//        var cc = $(`#nwGridUnitDetails-nwData tr:eq(${row}) td:eq(${SPR_UnitDetails_Category})`).text();

//        if (cc != '') {

//            var tq = $(`#nwGridUnitDetails-nwData tr:eq(${row}) td:eq(${SPR_UnitDetails_Qty})`).text().replace(/,/g, "");
//            totalAmt += parseFloat(tq) || 0;

//        }
//    }

//    return totalAmt;

//}


function GetTotalUnitCapacity(tbl) {
    var total = 0;
    var capacity = 0;
    var count = tbl.find('tr').length - 1;
    for (i = 0; i < count; i++) {
        capacity = parseFloat(tbl.find('tr:eq(' + i + ') td:last()').text().split(',').join('')) || 0.00;
        total += capacity;
    }
    $('#txtUnitCapacity').val(commaSeparateNumber(total.toFixed(2)));
}



//function AutoComputeSum(col,idGrid,type)
//{
//    var column = getGridElement(idGrid, type, col);
//    var result = 0.00;
//    $.each(column, function (idx, obj) {
//            if(type=='')
//                result += parseFloat($(this).text().split(`,`).join(``)) || 0.00;
//            else
//                result += parseFloat($(this).val().split(`,`).join(``)) || 0.00;
//    });
//    return result;
//}

var customvarinc = 0; // customize
function nwGrid_AddtoListDoneF() {
    var xcount = $('#dimTableLookUp tr').length;
    var addtoListTableTemplate = crnwTableCon.find('#nwGridRows tr:eq(0)').clone();
    var addtoListTableRec = $('#dimTableLookUp');
    var addtoListTableCount = $('#dimTableLookUp tr').length;
    var nwGridID = crnwTableCon.attr("id");
    var crnwTRtempLast = crnwTR;

    var crnwTDText = "";

    var elementType = $(crnwTD).children().prop('tagName'); /// check type var is_element_input = $(this).is("input"); //true or false
    var elementTyper = (elementType + "").toLowerCase();

    if (elementTyper == "input") {
        var xtempstr = $(crnwTD).children().attr("type")
        if (xtempstr == "checkbox")
            tempvalue = $(crnwTD).children().prop("checked");
        else if (xtempstr == "radio")
            tempvalue = $(crnwTD).children().prop("checked");
        else tempvalue = $(crnwTD).children().val();
    }

        // if (elementTyper == "input") crnwTDText = $(crnwTD).children().val();
    else if (elementTyper == "textarea") crnwTDText = $(crnwTD).children().val();
    else if (elementTyper == "select") crnwTDText = $(crnwTD).children().val();
    else if (elementTyper == "button") crnwTDText = $(crnwTD).children().text();
    else if (elementTyper == "undefined" || elementType == undefined) crnwTDText = crnwTD.text();
    else crnwTDText = crnwTD.text();
    //var isValid = true;
    //try {
    //    isValid = nwGrid_AddtoListBefore();
    //    if (isValid == undefined)
    //        isValid = true;
    //} catch (err) {
    //    isValid = true;
    //}

    //if (!isValid)
    //    return;
    var Level1, Level2, Level3, Level4, Level5, input;
    var Level1x, Level2x, Level3x, Level4x, Level5x;
    var hasData = CheckTableIfContainsData('', 'nwGridUnitDetails', SPR_UnitDetails_UnitCode);


    var elem = getGridElement('nwGridUnitDetails', '', SPR_UnitDetails_UnitCode);
    var data = '';
    var res = false;

    var index = 0;
    $.each(elem, function (idx, obj) {
        data += $(this).text();
        if (data.length > 0) {
            index = idx;
            return false;
        }
    });

    if (hasData) {
        Level1x = getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_Level1, index)
        Level2x = getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_Level2, index)
        Level3x = getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_Level3, index)
        Level4x = getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_Level4, index)
    }

    for (var z = 0; z < addtoListTableCount; z++) {
        try {
            input = addtoListTableRec.find('tr:eq(' + z + ') td:eq(23)').text() + '-' +
                    addtoListTableRec.find('tr:eq(' + z + ') td:eq(24)').text() + '-' +
                    addtoListTableRec.find('tr:eq(' + z + ') td:eq(25)').text() + '-' +
                    addtoListTableRec.find('tr:eq(' + z + ') td:eq(26)').text();

            //console.log(addtoListTableRec.find('tr:eq(' + z + ') td:eq(23)').text());
            //console.log(addtoListTableRec.find('tr:eq(' + z + ') td:eq(24)').text());
            //console.log(addtoListTableRec.find('tr:eq(' + z + ') td:eq(25)').text());
            //console.log(addtoListTableRec.find('tr:eq(' + z + ') td:eq(26)').text());
            //console.log(input);

        }
        catch (err) {

        }

        //console.log(input.split('-'));
        [Level1, Level2, Level3, Level4, Level5] = input.split('-');

        if ((Level1x == '' || Level1x == undefined) && z == 0) {
            Level1x = Level1;
            Level2x = Level2;
            Level3x = Level3;
            Level4x = Level4;
        }
        else {
            if (Level1 != Level1x || Level2 != Level2x || Level3 != Level3x || Level4 != Level4x) {
                MessageBox("Cannot be proceed. Selection of Multiple Section/Block is not allowed.", pagetitle);
                return;
            }
        }
    }

    var lastindex = -1;
    for (var i = 0; i < addtoListTableCount; i++) {
        var crnwTRtemp = addtoListTableTemplate.clone();

        var verID = '';
        customvarinc++;
        verID = "tempID" + customvarinc;
        crnwTRtemp.attr('id', verID);

        if ($("table#" + nwGridID + "-nwData").find("tbody tr").length <= 0)
            func_nwGrid_AddRow(nwGridID);
        try {
            // nwGrid_AddtoListDoneF()

            crnwLookupTable = $("#menuCreatorContainer .tablecontainter table");
            crnwTRtemp = nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, i);
            try {
                if (crnwTRtemp == null) continue;
                if (crnwTRtempLast == undefined || crnwTRtempLast == 'undefined')
                    crnwTable.append(crnwTRtemp);
                else if (crnwTDText.replace(' ', '') == "") {
                    //                try{crnwTRtemp = func_privGetData(crnwTRtemp,crnwTR);}
                    //                catch(err){}
                    crnwTR.replaceWith(crnwTRtemp);
                    crnwTDText = "aagok";
                }
                else
                    crnwTRtemp.insertAfter(crnwTRtempLast);

                crnwTRtempLast = crnwTRtemp;
                lastindex = crnwTRtemp.index();
            } catch (err) { }
        } catch (err) { }
    }

    func_ListNumberFormat(crnwTable);

    try {
        //alert((lastindex+1) +"=="+ $("table#" + nwGridID + "-nwData").find("tbody tr").length);
        if (lastindex + 1 == $("table#" + nwGridID + "-nwData").find("tbody tr").length)
            nwGrid_AddRow(nwGridID, 1);

        nwGrid_AddtoListLoaded(crnwTable);
    }
    catch (err) { }
    GetStandardPrice();
    //GetTotalUnitCapacity();
    //InsertionPaymentDetailsMinReservationAmount();
}



function GetStandardPrice() {
    if ($('#ddtxtUnitType option:selected').val() != null &&
        $('#ddtxtUnitClass option:selected').val() != null &&
        $('#ddlNoOfUnits option:selected').val() != null &&
        $('#txtReservationDate').val() != null &&
        $('#idvallugBranchProject').val() != null &&
        $('#ddtxtPhase option:selected').val() != null) {
        cust_GetPara();
        nwParameter_Add(`txtReservationDate`, $(`#txtReservationDate`).val());


        nwParameter_Add('Vatrate', vatrate_global);
        $('#txtStandardLotUnitPrice').val("0.00");
        $('#txtVAT').val("0.00");
        $('#txtTotalLotUP').val("0.00");
        nwParameter_Add(`idvallugFinancingType`, $(`#idvallugFinancingType`).val());
        //nwParameter_Add(`ItemGroupType`, getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_ItemGroupTypeCode, 0));

        var chkatneedsale = $('#chkatneedsale').prop('checked');
        nwParameter_Add(`AtNeedSale`, chkatneedsale);

        func_ActionDriven("actGetStandardPrice", false);

    }
    else {
        $('#txtTotalUnitPrice').val("");
        $('#txtReservationAmt').val("");
        $('#txtTotalLotUP').val("");
    }
}






/******************************** END HERE (Unit Details Tab) *******************************************/

function Clear() {
    obj = {
        Loc: function () {
            //$('#idvallugBranchProject').val('');
            //$('#descvallugBranchProject').val('');
            //$('#txtPropertyType').val('');
            ClearAllGrid();
        }
    }
    return obj;
}

$(document).on('change', '#idvallugLocWithAccntblForms', function (e) {
    Clear().Loc();
});


var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
    }

    if (idName == 'lugLocWithAccntblForms') {
        Clear().Loc();
        $('#txtpaymentGroupID').val('');
        setExpiration();
    }

    if (idName == 'lugAgent') {
        //$('#txtAgentType').val(getGridData(idNum, 2));
        $('#txtAgentType').val(getGridData(idNum, 5));
    }
    if (idName == `lugBranchProject`) {
        $('#txtpaymentGroupID').val('');
        $('#txtItemGroupType').val(getGridData(idNum, 2));
        $('#txtPropertyType').val(getGridData(idNum, 3));


        $(`#txtBranchID_Discount`).val(getGridData(idNum, 1));
        nwParameter_Add(`idvallugBranchProject`, getGridData(idNum, 0));


        $('#txtShortDesc').val(getGridData(idNum, 5));

        nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());

        $('#ddtxtPhase').html('');

        nwLoading_Start("actPopulateDropdown", crLoadingHTML);
        nwParameter_Add(`txtItemGroupType`, $('#txtItemGroupType').val());
        nwParameter_Add(`custClassCode`, custClassCode);
        func_ActionDriven(`actPopulateDropdown`, false);
    }
    if (idName == 'lugClient') {



        $('#txtCrossRefCode').val(getGridData(idNum, 6));
        $('#txtVIPType').val(getGridData(idNum, 5));
        $('#txtBirthdate').val(getGridData(idNum, 7));
        custClassCode = getGridData(idNum, 11);
        $("#txtAge").val(getAge(getGridData(idNum, 7) || new Date("01/01/1900")));
        if ($("#txtBirthdate").val() == '') {
            $("#txtAge").val('');
        }

        setExpiration();

    }
    if (idName == 'lugSourceOfSale') {
        var isAgent = getGridData(idNum, 2);
        if (isAgent == '1') {
            $('.req').removeClass('isinvisible');
            $('#lugAgent').removeClass('adisabled');
            $('#idvallugAgent').prop('disabled', false);
        }
        else {
            $('.req').addClass('isinvisible');
            $('#lugAgent').addClass('adisabled');
            $('#idvallugAgent').prop('disabled', true);
            $('#idvallugAgent').val('');
            $('#descvallugAgent').val('');
            $('#txtAgentType').val('');
        }
    }

    var isValid = true;
    if (idName == 'lugUnitClassCode') {
        ComputeUnitDetails();
        GetTotalStandardLotUnitPrice();
    }

    if (idName == 'lugUnitCode') {
        ClearFields(1);

        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitCode, crnwTR.index(), getGridData(idNum, Cols.UnitCode));
        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitDesc, crnwTR.index(), getGridData(idNum, Cols.UnitDesc));
        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UOM, crnwTR.index(), getGridData(idNum, Cols.UOM));
        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_LotArea, crnwTR.index(), getGridData(idNum, Cols.LotArea));
        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_FloorArea, crnwTR.index(), getGridData(idNum, Cols.FloorArea));
        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_InventoryTypeCode, crnwTR.index(), getGridData(idNum, Cols.InventoryTypeCode));
        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_InventoryType, crnwTR.index(), getGridData(idNum, Cols.InventoryType));
        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_InventoryClassCode, crnwTR.index(), getGridData(idNum, Cols.InventoryClassCode));
        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_InventoryClass, crnwTR.index(), getGridData(idNum, Cols.InventoryClass));
        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_Model, crnwTR.index(), getGridData(idNum, Cols.ModelDesc));
        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_RefHoldingNo, crnwTR.index(), getGridData(idNum, Cols.ReferenceHoldingNo));
        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_CrossReferenceCode, crnwTR.index(), getGridData(idNum, Cols.CrossReference));

        $('#txtUnitCode').val(getGridData(idNum, Cols.UnitCode));
        $('#txtLotPrice').val(nwCurrency(getGridData(idNum, Cols.LotPrice)));
        $('#txtHousePrice').val(nwCurrency(getGridData(idNum, Cols.HousePrice)));
        $('#txtSellingPrice').val(nwCurrency(getGridData(idNum, Cols.SellingPrice)));
        $('#txtVatAmount').val(nwCurrency(getGridData(idNum, Cols.VatAmount)));
        $('#txtGrossSellingPrice').val(nwCurrency(getGridData(idNum, Cols.GrossSellingPrice)));
        $('#txtMisc').val(nwCurrency(getGridData(idNum, Cols.Miscellaneous)));

        if ((parseFloat(getGridData(idNum, Cols.Miscellaneous).split(',').join('')) || 0) <= 0)
            $('#btnMiscellaneousDetails').enable(false);
        else
            $('#btnMiscellaneousDetails').enable(true);

        $('#txtTCP').val(nwCurrency(getGridData(idNum, Cols.TotalContractPrice)));
        $('#txtSalesDiscountAmount').val(nwCurrency(getGridData(idNum, Cols.SalesDiscount)));
        $('#txtDPDiscount').val(nwCurrency(getGridData(idNum, Cols.DPDiscount)));
        $('#txtNTCP').val(nwCurrency(getGridData(idNum, Cols.NetContractPrice)));
        $('#txtRate').val(nwCurrency(getGridData(idNum, Cols.MiscChargeRate)));
        $('#txtMiscAmt').val(nwCurrency(getGridData(idNum, Cols.MiscChargeAmt)));
        $('#txtVatrate').val(nwCurrency(getGridData(idNum, Cols.VatRate)));
        $('#txtReservationAmount').val(getGridData(idNum, Cols.MinReservationAmt));
        $('#txtDPRate').val(getGridData(idNum, Cols.InhouseDPRate));

        /*Filter for Combobox Category*/
        nwParameter_Add('ddDiscountType', $('#ddDiscountType option:selected').val());
        nwParameter_Add(`idvallugFinancingType`, $(`#idvallugFinancingType`).val());
        nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());
        nwParameter_Add(`UnitCode`, UnitCode);
        nwParameter_Add(`ddPhaseTower`, $('#ddPhaseTower option:selected').val());

        $('#txtUnitType').val(getGridData(idNum, Cols.InventoryTypeCode));
        $('#txtUnitClass').val(getGridData(idNum, Cols.InventoryClassCode));

        nwParameter_Add(`txtUnitType`, $('#txtUnitType').val());
        nwParameter_Add(`txtUnitClass`, $('#txtUnitClass').val());

        nwParameter_Add(`tag`, 1);

        cust_GetPara();
        nwLoading_Start("actPopulateCategory", crLoadingHTML);



        $('#chkLumpSum').enable(true);

        ToggleEnableDisable(0);
        nwParameter_Add(`txtReservationDate`, $('#txtReservationDate').val());

        func_ActionDriven(`actPopulateCategory`, false);
    }

    /**************************** END HERE (Unit Details) ****************************************************/

    if (idName == 'lugFinancingType') {
        /*Filter for Combobox Category*/


        nwLoading_Start("actPopulateCategory", crLoadingHTML);
        nwParameter_Add('ddDiscountType', $('#ddDiscountType option:selected').val());
        nwParameter_Add(`idvallugFinancingType`, $(`#idvallugFinancingType`).val());
        nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());
        nwParameter_Add(`UnitCode`, $('#new_txtUniCode').val());
        nwParameter_Add(`ddPhaseTower`, $('#ddPhaseTower option:selected').val());
        nwParameter_Add(`tag`, 1);
        cust_GetPara();
  
        if ($('#idvallugFinancingType').val() == 'SPOT') {
            //$('#chkLumpSum').addClass('adisabled').enable(true);
            $('#ddSpotCashDiscount').removeClass('adisabled').enable(true);
        }
        else {
            $('#chkLumpSum').removeClass('adisabled').enable(true);
            //  $('#ddSpotCashDiscount').addClass('adisabled').enable(false);
        }
        $('#chkLumpSum').removeClass('adisabled').enable(true);



        ToggleEnableDisable(0);
        nwParameter_Add(`txtReservationDate`, $('#txtReservationDate').val());
        func_ActionDriven(`actPopulateCategory`, false);
    }

    /******************************* BEGIN HERE (Payment Term Details) *************************************/

    if (idName == 'lugPaymentTerm') {

        ClearFields(4);
        ColsCode = getGridData(idNum, Cols.Code);
        ColsDescription = getGridData(idNum, Cols.Description);
        ColsPenaltyRate = getGridData(idNum, Cols.PenaltyRate);
        ColsAnnualRate = getGridData(idNum, Cols.AnnualRate);
        ColsPeriod = getGridData(idNum, Cols.Period);
        ColsTermPeriod = getGridData(idNum, Cols.TermPeriod);
        ColsContractRate = getGridData(idNum, Cols.ContractRate);
        ColsTermAmount = getGridData(idNum, Cols.TermAmount);
        ColsContractAmount = getGridData(idNum, Cols.ContractAmount);
        ColsSalesDiscountLin = getGridData(idNum, Cols.SalesDiscountLin);
        ColsDPDisc = getGridData(idNum, Cols.DPDisc);
        ColsDPDiscAmount = getGridData(idNum, Cols.DPDiscAmount);
        ColsNetContractPriceLin = getGridData(idNum, Cols.NetContractPriceLin);
        ColsTotalNoPayments = getGridData(idNum, Cols.TotalNoPayments);

        ResetQuestion(2);
    }
    /******************************* END HERE (Payment Term Details) ***************************************/

    /******************************* BEGIN HERE (Addon Tab) *************************************************/
    if (idName == 'lugAddonItem') {
        nwLib.nwTempTable_RowData_Set("nwGridAddOn", crnwTR.index(), SPR_Addon_AddonItemCode)(getGridData(idNum, Cols.AddonItemCode));
        nwLib.nwTempTable_RowData_Set("nwGridAddOn", crnwTR.index(), SPR_Addon_AddonItemDesc)(getGridData(idNum, Cols.AddonItemDesc));
        nwLib.nwTempTable_RowData_Set("nwGridAddOn", crnwTR.index(), SPR_Addon_CategoryCode)(getGridData(idNum, Cols.AddonCategoryCode));
        nwLib.nwTempTable_RowData_Set("nwGridAddOn", crnwTR.index(), SPR_Addon_Category)(getGridData(idNum, Cols.AddonCategory));
        nwLib.nwTempTable_RowData_Set("nwGridAddOn", crnwTR.index(), SPR_Addon_UOM)(getGridData(idNum, Cols.AddonUOM));
        nwLib.nwTempTable_RowData_Set("nwGridAddOn", crnwTR.index(), SPR_Addon_UOMCode)(getGridData(idNum, Cols.AddonUOMCode));
        nwLib.nwTempTable_RowData_Set("nwGridAddOn", crnwTR.index(), SPR_Addon_Qty)(getGridData(idNum, Cols.AddonQuantity));

    }
    /******************************* END HERE (Addon Tab) *************************************************/

    /******************************* BEGIN HERE (Discount Tab) ********************************************/
    if (idName == `lugDiscount`) {
        $('#nwGridAmortizationCon').html('');


        setGridData(`nwGridDiscount`, ``, SPR_Discount_DiscountCode, crnwTR.index(), getGridData(idNum, Cols.DiscountCode));
        setGridData(`nwGridDiscount`, ``, SPR_Discount_DiscountType, crnwTR.index(), getGridData(idNum, Cols.DiscountDesc));


    }
    /******************************* END HERE (Discount Tab) **********************************************/
    /******************************** BEGIN HERE (Freebies and Promos Tab) ********************************/

    if (idName == `lugFreebiesItemcode`) {
        nwLib.nwTempTable_RowData_Set("nwGridFreeBiesPromo", crnwTR.index(), SPR_FreebiesPromoIncentives_ItemCode)(getGridData(idNum, 0));
        nwLib.nwTempTable_RowData_Set("nwGridFreeBiesPromo", crnwTR.index(), SPR_FreebiesPromoIncentives_ItemDesc)(getGridData(idNum, 1));
        nwLib.nwTempTable_RowData_Set("nwGridFreeBiesPromo", crnwTR.index(), SPR_FreebiesPromoIncentives_ItemGroupType)(getGridData(idNum, 2));
        nwLib.nwTempTable_RowData_Set("nwGridFreeBiesPromo", crnwTR.index(), SPR_FreebiesPromoIncentives_Qty, `input`)(getGridData(idNum, 3));
        nwLib.nwTempTable_RowData_Set("nwGridFreeBiesPromo", crnwTR.index(), SPR_FreebiesPromoIncentives_PriceVatIn, `input`)(getGridData(idNum, 4));
        nwLib.nwTempTable_RowData_Set("nwGridFreeBiesPromo", crnwTR.index(), SPR_FreebiesPromoIncentives_Amount, `input`)(getGridData(idNum, 5));
    }

    if (idName == `lugReceiverType`) {
        nwLib.nwTempTable_RowData_Set("nwGridFreeBiesPromo", crnwTR.index(), SPR_FreebiesPromoIncentives_ReceiverTypeCode)(getGridData(idNum, 0));
        nwLib.nwTempTable_RowData_Set("nwGridFreeBiesPromo", crnwTR.index(), SPR_FreebiesPromoIncentives_ReceiverTypeDesc)(getGridData(idNum, 1));
    }
    if (idName == `lugReceiver`) {
        nwLib.nwTempTable_RowData_Set("nwGridFreeBiesPromo", crnwTR.index(), SPR_FreebiesPromoIncentives_ReceiverCode)(getGridData(idNum, 0));
        nwLib.nwTempTable_RowData_Set("nwGridFreeBiesPromo", crnwTR.index(), SPR_FreebiesPromoIncentives_ReceiverDesc)(getGridData(idNum, 1));
    }
    /******************************** END HERE (Freebies and Promos Tab) **********************************/

    /******************************* BEGIN HERE (Co Buyer Assignment Tab) ********************************/
    if (idName == 'lugCoBuyer') {
        isValid = nwLib.nwTempTable_Column_ValueExist("nwGridCoBuyer", SPR_COBUYER_CODE, getGridData(idNum, 0), false, "text", 0);
        if (isValid == false) {
            nwLib.nwTempTable_RowData_Set("nwGridCoBuyer", crnwTR.index(), SPR_COBUYER_CODE)(getGridData(idNum, 0));
            nwLib.nwTempTable_RowData_Set("nwGridCoBuyer", crnwTR.index(), SPR_COBUYERNAME)(getGridData(idNum, 1));
            nwLib.nwTempTable_RowData_Set("nwGridCoBuyer", crnwTR.index(), SPR_COBUYER_BIRTHDATE)(getGridData(idNum, 2));
            nwLib.nwTempTable_RowData_Set("nwGridCoBuyer", crnwTR.index(), SPR_COBUYER_RELATIONSHIPDESC)(getGridData(idNum, 4));

            if ($('#txtCoBorrower').val().length <= 0) {
                $('#txtLoanAmount').val($('#txtTCP').val());

                func_RadioNel();

                var noOfPayments = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments, 0)) || 0.00;

                $('#txtLoanTerm').val(noOfPayments);
                $('#txtCoBorrower').val(GetConcatCoBorrower());

                nwParameter_Add("TotalNoOfPayments", noOfPayments);
                nwParameter_Add("txtReservationDate", $("#txtReservationDate").val());
                func_ActionDriven(`actPopulateDefaultMaturityDate`, false);
            }
            EnableDisabledInsuranceTab(false);
            //$('#nwGridInsurance-nwData .txtSPR_INSURANCE_DATEOFBIRTH').datepicker({ dateFormat: 'yy/mm/dd' }).mask('9999/99/99'); --01.24.2018
        }
    }
    /******************************* END HERE (Co Buyer Assignment Tab) ***********************************/

    if (idName == 'lugClient') {
        //$(`#txtCoBorrower`).val(getGridData(idNum, 1));

    }


    if (idName == 'lugCitizenship') {
        nwLib.nwTempTable_RowData_Set("nwGridInsurance", crnwTR.index(), SPR_INSURANCE_CITIZENSHIP_CODE)(getGridData(idNum, 0));
        nwLib.nwTempTable_RowData_Set("nwGridInsurance", crnwTR.index(), SPR_INSURANCE_CITIZENSHIP_DESC)(getGridData(idNum, 1));
    }

    if (idName == 'lugRelationshipToTheApplicant') {
        nwLib.nwTempTable_RowData_Set("nwGridInsurance", crnwTR.index(), SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT)(getGridData(idNum, 0));
        nwLib.nwTempTable_RowData_Set("nwGridInsurance", crnwTR.index(), SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT_DESC)(getGridData(idNum, 1));
    }

    if (idName == 'lugStatement') {
        nwLib.nwTempTable_RowData_Set("nwGridStatementDetail", crnwTR.index(), SPR_STATEMENT_CODE)(getGridData(idNum, 0));
        nwLib.nwTempTable_RowData_Set("nwGridStatementDetail", crnwTR.index(), SPR_STATEMENT_STATEMENT)(getGridData(idNum, 1));
    }

    if (idName == 'lugApproverCode') {
        nwLib.nwTempTable_RowData_Set("nwGridApprover", crnwTR.index(), SPR_CODE)(getGridData(idNum, 0));
        nwLib.nwTempTable_RowData_Set("nwGridApprover", crnwTR.index(), SPR_APPROVER_NAME)(getGridData(idNum, 1));
    }

    if (idName == 'lugPaymentTermGrouping') {
        nwLoading_Start("actPaymentTermGrouping", crLoadingHTML);

        $('#nwGridAmortizationCon').html('');//reset

        nwParameter_Add(`stdLotUP`, parseFloat($('#txtSellingPrice').val().replace(/,/g, '')));
        nwParameter_Add(`vatAmount`, parseFloat($('#txtVatAmount').val().replace(/,/g, '')));
        nwParameter_Add(`gross`, parseFloat($('#txtGrossSellingPrice').val().replace(/,/g, '')));
        nwParameter_Add(`misc`, parseFloat($('#txtMisc').val().replace(/,/g, '')));
        nwParameter_Add(`tcp`, parseFloat($('#txtTCP').val().replace(/,/g, '')));
        nwParameter_Add(`Code`, getGridData(idNum, 0));

        let reservPrin = 0, reservMisc = 0;
        $('#nwGridPaymentTermDetailsData tr:gt(1)').each(function (i, x) {
            if ($(this).find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val() == 'RESRV') {
                reservPrin = parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ') input').val().replace(/,/g, ''));
                reservMisc = parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_MiscInstallment + ')').text().replace(/,/g, ''));
            }
        });

        $('#txtpaymentGroupID').val(getGridData(idNum, 0));

        nwParameter_Add(`reservPrin`, reservPrin);
        nwParameter_Add(`reservMisc`, reservMisc);
        nwParameter_Add(`reservDate`, $('#txtReservationDate').val());

        func_ActionDriven(`actPaymentTermGrouping`, false);
    }
    else if (idName == 'lugPaymentDetailsModeOfPayment') {
        const setData = (arr) => arr.forEach(function (cols, i) { setGridData(`nwGridPaymentDetails`, ``, cols, crnwTR.index(), ''); setGridData(`nwGridPaymentDetails`, ``, cols, crnwTR.index(), getGridData(idNum, i)); });
        setData([spr_PaymentDetailsModeOfPaymentCode, spr_PaymentDetailsModeOfPaymentDesc, spr_PaymentDetailsPaymentMethodCode, spr_PaymentDetailsPaymentMethodDesc]);
        $portal().paymentMethodCondition(getGridData(idNum, 0), crnwTR.index(), false);
        setID(crnwTR.index());
        $portal().paymentDetails.bindGreenColor(crnwTR.index(), false);
    }
    else if (idName == 'lugCurrency') {
        setGridData(`nwGridPaymentDetails`, ``, spr_PaymentDetailsCurrencyCode, crnwTR.index(), getGridData(idNum, 0));
        setGridData(`nwGridPaymentDetails`, ``, spr_PaymentDetailsCurrencyDesc, crnwTR.index(), getGridData(idNum, 1));
        setGridData(`nwGridPaymentDetails`, ``, spr_PaymentDetailsExchangeRateToLocal, crnwTR.index(), getGridData(idNum, 2));
        setGridData(`nwGridPaymentDetails`, ``, spr_PaymentDetailsExchangeRateToHome, crnwTR.index(), getGridData(idNum, 3));
        $portal().populateLocalHomeAmount();
    }
    else if (idName == 'lugPaymentCenter') {
        setGridData(`nwGridPaymentDetails`, ``, spr_PaymentDetailsPaymentCenterCode, crnwTR.index(), getGridData(idNum, 0));
        setGridData(`nwGridPaymentDetails`, ``, spr_PaymentDetailsPaymentCenterDesc, crnwTR.index(), getGridData(idNum, 1));
    }
    else if (idName == 'lugCardType') {
        setGridData(`nwGridPaymentDetails`, ``, spr_PaymentDetailsCardTypeCode, crnwTR.index(), getGridData(idNum, 0));
        setGridData(`nwGridPaymentDetails`, ``, spr_PaymentDetailsCardTypeDesc, crnwTR.index(), getGridData(idNum, 1));
    }
    else if (idName == 'lugbank') {
        setGridData(`nwGridPaymentDetails`, ``, spr_PaymentDetailsBankCode, crnwTR.index(), getGridData(idNum, 0));
        setGridData(`nwGridPaymentDetails`, ``, spr_PaymentDetailsBankName, crnwTR.index(), getGridData(idNum, 1));
    }
    else if (idName == 'lugAccountNo') {
        const setData = (arr) => arr.forEach(function (cols, i) { setGridData(`nwGridPaymentDetailsAttachment`, ``, cols, crnwTR.index(), ''); setGridData(`nwGridPaymentDetailsAttachment`, ``, cols, crnwTR.index(), getGridData(idNum, i)); });
        setData([spr_PaymentDetailsAttachAccountNo, spr_PaymentDetailsAttachDepositoryBankCode, spr_PaymentDetailsAttachDepositoryBank, spr_PaymentDetailsAttachBranch]);
    }
    else if (idName == 'lugCategory') {
        row = nwGridMainCon_Book_PaymentTerm.ActiveSheet.CellSelected.row - 1;
        nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(SPR_PaymentTermDetails_PaymentCategory - 1, row, getGridData(idNum, 0));
        nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(SPR_PaymentTermDetails_PaymentCategoryDesc - 1, row, getGridData(idNum, 0));
        console.log(getGridData(idNum, 0))

        console.log(getGridData(idNum, 1))
    }
    else if (idName == 'lugPaymentCategory') {

        row = nwGridMainCon_Book_PaymentTerm.ActiveSheet.CellSelected.row - 1;
        nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(SPR_PaymentTermDetails_PaymentTermCode - 1, row, getGridData(idNum, 0));
        nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(SPR_PaymentTermDetails_PaymentTermDesc - 1, row, getGridData(idNum, 1));


    }


    else if (idName == 'lugDiscountType') {

        row = nwGridMainCon_Book_Discount.ActiveSheet.CellSelected.row - 1;
        nwGridMainCon_Book_Discount.ActiveSheet.SetText(SPR_Discount_DiscountCode - 1, row, getGridData(idNum, 0));
        nwGridMainCon_Book_Discount.ActiveSheet.SetText(SPR_Discount_DiscountType - 1, row, getGridData(idNum, 1));
    }


    else if (idName == 'lugBasisDiscount') {

        row = nwGridMainCon_Book_Discount.ActiveSheet.CellSelected.row - 1;
        nwGridMainCon_Book_Discount.ActiveSheet.SetText(SPR_Discount_BasisOfDiscount - 1, row, getGridData(idNum, 0));

    }


    else if (idName == 'lugDiscountApp') {

        row = nwGridMainCon_Book_Discount.ActiveSheet.CellSelected.row - 1;
        nwGridMainCon_Book_Discount.ActiveSheet.SetText(SPR_Discount_DiscountApp - 1, row, getGridData(idNum, 0));

    }


    else if (idName == 'lugAddOnItems') {

        row = nwGridMainCon_Book_AddOns.ActiveSheet.CellSelected.row - 1;
        nwGridMainCon_Book_AddOns.ActiveSheet.SetText(SPR_Addon_AddonItemCode - 1, row, getGridData(idNum, 2));
        nwGridMainCon_Book_AddOns.ActiveSheet.SetText(SPR_Addon_AddonItemDesc - 1, row, getGridData(idNum, 3));
    }


    else if (idName == 'lugUnitCode_refBased') {
        console.log("sasa");
        row = nwGridMainCon_Book_RefBasedUnitAddOn.ActiveSheet.CellSelected.row - 1;
        nwGridMainCon_Book_RefBasedUnitAddOn.ActiveSheet.SetText(SPR_RefAddon_UnitCode - 1, row, getGridData(idNum, 0));
        nwGridMainCon_Book_RefBasedUnitAddOn.ActiveSheet.SetText(SPR_RefAddon_Desc - 1, row, getGridData(idNum, 1));
    }
    else if (idName == 'lugMiscType') {
        row = nwGridMainCon_Book_MiscType.ActiveSheet.CellSelected.row - 1;
        nwGridMainCon_Book_MiscType.ActiveSheet.SetText(SPR_MISC_MISCTYPE - 1, row, getGridData(idNum, 0));

    }

    else if (idName == 'lugAllocType') {
        row = nwGridMainCon_Book_MiscType.ActiveSheet.CellSelected.row - 1;
        nwGridMainCon_Book_MiscType.ActiveSheet.SetText(SPR_ALLOCATIONTYPE - 1, row, getGridData(idNum, 0));

    }





}

function fn_EnableDisabledSpotCash() {
    var finance_Code = $('#idvallugFinancingType').val();
    if (finance_Code.toUpperCase() == 'SPOT') {
        $('#chkatneedsale').prop('disabled', false);
        var isAtNeedSale = $('#chkatneedsale').prop('checked');

        if (isAtNeedSale) {
            $('#ddSpotCashDiscount').enable(false);
        }
        else {
            $('#ddSpotCashDiscount').enable(true);
        }
    }
    else {
        $('#chkatneedsale').prop('disabled', true);
        $('#chkatneedsale').prop('checked', false);
        $('#ddSpotCashDiscount').html('');
        $('#ddSpotCashDiscount').enable(false);
    }
}

//function fn_PaymentTermDetails(idNum)
//{
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_PaymentTermCode)(getGridData(idNum, 0));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_PaymentTermDesc)(getGridData(idNum, 1));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_ContractRate, 'input')(getGridData(idNum, 8));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_LotPrice)(getGridData(idNum, 9));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_VAT)(getGridData(idNum, 10));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_TotalLotPrice, 'input')(getGridData(idNum, 11));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_SalesDiscount)(getGridData(idNum, 12));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_NetLotUnitPrice)(getGridData(idNum, 13));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_MiscInstallment)(getGridData(idNum, 14));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_TCP)(getGridData(idNum, 15));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_NTCP)(getGridData(idNum, 19));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_TotalNoOfPayment)(getGridData(idNum, 20));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_NoOfPayments)(getGridData(idNum, 20));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_FinancingTypeCode)(getGridData(idNum, 21));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_FinancingType)(getGridData(idNum, 21));
//    nwLib.nwTempTable_RowData_Set("nwGridPaymentTermDetails", crnwTR.index(), SPR_PaymentTermDetails_MonthlyDP)(getGridData(idNum, 22));


//    $('#txtIsVatable').val(getGridData(idNum, 23));

//    if ($('#idvallugFinancingType').val() != "SPOT" && $('#idvallugFinancingType').val() != 'DEF') {
//        if ($('#nwGridPaymentTermDetails tr:eq(' + (crnwTR.index() + 1) + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategoryCode + ')').text() == 'BALANC') {
//            $('#txtInterestRate').val(getGridData(idNum, 6))
//        }
//    }
//    else {
//        $('#txtInterestRate').val("0.00");
//    }


//    SumAllHeaderinPaymentTermDetails();
//    ComputationHeader();
//    //SetBalanceDateReservation();

//    var count = $(`#nwGridPaymentTermDetails-nwData tr`).length;
//    var paymentCat = '';
//    var totalNoOfPayments = 0;
//    for (i = 0; i < count; i++) {
//        paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategoryCode, i);

//        if (paymentCat.toUpperCase() == 'DOWNP') {
//            totalNoOfPayments += (parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments, i).split(`,`).join(``))) || 0.00;
//        }
//    }
//    //var totalNoOfPayments = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TotalNoOfPayment, 0);
//    //nwParameter_Add(`DPStartDate`, $(`#txtDPStartDate`).val());

//    nwParameter_Add(`txtReservationDate`, $('#txtDPStartDate').val());
//    nwParameter_Add(`TotalNoOfPayments`, totalNoOfPayments);
//    func_ActionDriven(`actPopulateBalanceDateReservation`, false);

//    var paymentCat = $('#nwGridPaymentTermDetails tr:eq(' + (crnwTR.index() + 1) + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategoryCode + ')').text();
//    if (paymentCat.toUpperCase() == `RESRV`) {
//        nwParameter_Add(`txtReservationDate`, $('#txtReservationDate').val());
//        nwParameter_Add(`TotalNoOfPayments`, 1);
//        func_ActionDriven("actReservationPopulateDate", false);
//    }
//}





function DiscountComputation(rate, miscType) {
    var financingType = $('#idvallugFinancingType').val();
    var ddbasis = $('.clsBasisOfDiscount option:selected').val();
    var ddapp = $('.clsDiscountApp option:selected').val();
    var amt = 0;
    var discAmount = 0;
    var vatrate = parseFloat($('#txtVatrate').val().split(',').join(''));
    var discVatEx = 0;
    var discAmountSP = 0;
    var discAmountMSC = 0;

    if (rate > 0) {

        if (ddbasis == 'SP' && ddapp == 'SP') {
            amt = parseFloat($('#txtGrossSellingPrice').val().split(',').join(''));
            discAmount = amt * (rate / 100);

            discAmountSP = parseFloat($('#txtSellingPrice').val().split(',').join('')) * (rate / 100);
            discAmountMSC = 0;
        }
        else if (ddbasis == 'SP' && ddapp == 'TCP') {
            amt = parseFloat($('#txtSellingPrice').val().split(',').join(''));
            discVatEx = amt * (rate / 100);
            var totaltcp = parseFloat($('#txtSellingPrice').val().split(',').join('')) + parseFloat($('#txtMisc').val().split(',').join(''));
            var allocsp = (parseFloat($('#txtSellingPrice').val().split(',').join('')) / totaltcp);
            var sp = (discVatEx * allocsp)
            var misc = discVatEx - sp;
            discAmount = sp * (1 + (vatrate / 100)) + misc;

            discAmountSP = sp;
            discAmountMSC = misc;
        }
        else if (ddbasis == 'TCP' && ddapp == 'TCP') {
            amt = parseFloat($('#txtTCP').val().split(',').join(''));
            discAmount = amt * (rate / 100);

            var amt2 = parseFloat($('#txtSellingPrice').val().split(',').join('')) + parseFloat($('#txtMisc').val().split(',').join(''));
            discVatEx = amt2 * (rate / 100);
            var totaltcp = parseFloat($('#txtSellingPrice').val().split(',').join('')) + parseFloat($('#txtMisc').val().split(',').join(''));
            var allocsp = (parseFloat($('#txtSellingPrice').val().split(',').join('')) / totaltcp);
            var sp = (discVatEx * allocsp)
            var misc = discVatEx - sp;
            discAmountSP = sp;
            discAmountMSC = misc;
        }
        else if (ddbasis == 'TCP' && ddapp == 'SP') {
            amt = parseFloat($('#txtSellingPrice').val().split(',').join('')) + parseFloat($('#txtMisc').val().split(',').join(''));
            discAmount = (amt * (rate / 100)) * (1 + (vatrate / 100));

            discAmountSP = (amt * (rate / 100));
            discAmountMSC = 0;
        }
        else {
            amt = 0;
            discAmount = amt * (rate / 100);
        }

        //if (ddbasis == 'SP') 
        //    amt = parseFloat($('#txtGrossSellingPrice').val().split(',').join(''));
        //else if (ddbasis == 'TCP') 
        //    amt = parseFloat($('#txtTCP').val().split(',').join(''));
        //else 
        //    amt = 0;
    }

    setGridData(`nwGridDiscount`, ``, SPR_Discount_DiscountAmt, crnwTR.index(), nwCurrency(discAmount));
    setGridData(`nwGridDiscount`, ``, SPR_Discount_DiscountSP, crnwTR.index(), nwCurrency(discAmountSP));
    setGridData(`nwGridDiscount`, ``, SPR_Discount_DiscountMSC, crnwTR.index(), nwCurrency(discAmountMSC));

    var monthlyPayment = 0.0;
    var noOfPayments = 0;
    var termAmount = 0.00;
    var interest = 0.00;
    var future = 0;
    var beginning = 0;
    var dpCtr = 1;
    var balCtr = 1;

    $('#nwGridPaymentTermDetails-nwData tr').each(function (i, n) {
        var isFixInt = $('#chkFixedInterest').is(':checked');
        var $row = $(n);
        var z = '';
        var category = $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val();
        var misctype = '';
        if (category != 'RESRV' && category != undefined) {
            misctype = $row.find('td:eq(' + SPR_PaymentTermDetails_MiscellaneousType + ')').text();
            z = new ReCompute(
                $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val(),
                parseFloat($('#txtGrossSellingPrice').val().split(',').join('')) || 0.00,
                parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_ContractRate + ') input').val()) || 0.00,
                parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_MiscInstallment + ')').text().split(',').join('')) || 0.00,
                1,
                parseInt($row.find('td:eq(' + SPR_PaymentTermDetails_Ordering + ')').text()) || 0.00,
                parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ') input').val().split(',').join('')) || 0.00,
                discAmount,
                parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_DPDiscountAmount + ') input').val().split(',').join('')) || 0.00,
                $('#idvallugFinancingType').val(),
                parseInt($row.find('td:eq(' + SPR_PaymentTermDetails_NoOfPayments + ')').text()) || 0.00,
                parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_InterestRate + ')').text().split(',').join('')) / 100,
                discAmount,
                misctype,
                discAmountSP,
                discAmountMSC
            );


            var monthlyP = 0.00;
            if (isFixInt) {
                var x_noofPayments = parseInt($row.find('td:eq(' + SPR_PaymentTermDetails_NoOfPayments + ')').text()) || 0;
                var x_intRate = parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_InterestRate + ')').text().split(',').join(''));

                monthlyP = (parseFloat(z.netContractPrice) / parseFloat(x_noofPayments) + (parseFloat(z.netContractPrice) * (x_intRate) / 100) / 12);
            }
            else {
                monthlyP = z.monthly();
            }

            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, i, nwCurrency(parseFloat(z.salesDiscount) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, i, nwCurrency(parseFloat(z.dpDiscountAmount) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetContractPrice, i, nwCurrency(parseFloat(z.netContractPrice) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPayment, i, nwCurrency(parseFloat(monthlyP) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc, i, nwCurrency(parseFloat(z.monthlyWithoutMisc()) || 0.00));

            if (category == 'DOWNP') {
                if (dpCtr == 1) {
                    $('#txtMonthlyDP').val(nwCurrency(parseFloat(monthlyP) || 0.00));
                    dpCtr++;
                }
            }
            else if (category == 'BALANC') {
                if (balCtr == 1) {
                    $('#txtMonthlyAmortization').val(nwCurrency(parseFloat(monthlyP) || 0.00));
                    balCtr++;
                }
            }
            else {
                monthlyPayment = termAmount;
            }
        }
    });
    doCompute(0);
}

$(document).on('focusin', '.clsBasisOfDiscount', function (e) {
    globalbasis = $(this).val();
});
$(document).on('focusin', '.clsDiscountApp', function (e) {
    globalapp = $(this).val();
})

$(document).on('change', '.clsBasisOfDiscount', function (e) {
    globaltag = 'BasisOfDiscount';
    ResetQuestion(3);
});

$(document).on('change', '.clsDiscountApp', function (e) {
    globaltag = 'DiscountApplication';
    ResetQuestion(3);
});


function doDiscountCompute() {
    var rate = parseFloat(getGridDataPerLine(`nwGridDiscount`, `input`, SPR_Discount_DiscountRate, 0)) || 0.00;
    var ddbasis = $('.clsBasisOfDiscount option:selected').val();
    var ddapp = $('.clsDiscountApp option:selected').val();
    if (rate > 0 && ddbasis.length > 0 && ddapp.length > 0) {
        DiscountComputation(rate);
    }
    else if (rate <= 0) {
        DiscountComputation(0);
        DiscountProperties();
        //setGridData(`nwGridDiscount`, ``, SPR_Discount_DiscountAmt, 0, '');
        //setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitCode, crnwTR.index(), getGridData(idNum, Cols.UnitCode));
    }

    //After Discount In Vat 02.29.2020
    $fn().isVatThresholdExceed();
}

$(document).on('change', '#ddSpotCashDiscount', function (e) {
    if ($('#idvallugFinancingType').val().toUpperCase() == 'SPOT') {
        //$('#nwGridAmortizationCon').html('');
        //ResetGrid(`nwGridDiscount`);
        //var spotdisc = parseFloat($('#ddSpotCashDiscount option:selected').val()) || 0.00;
        //var spotamount = 0.00;
        //if (spotdisc > 0) {
        //    spotamount = parseFloat($.grep(JSON.parse(jsonSpot), function (n, i)
        //    { return n.Code == spotdisc })[0].Amount) || 0.00;

        //    $('#nwGridDiscountCon').enable(false);

        //    setGridData(`nwGridDiscount`, ``, SPR_Discount_DiscountCode, 0, 'SPOT');
        //    setGridData(`nwGridDiscount`, ``, SPR_Discount_DiscountType, 0, 'Spot Discount');
        //    setGridData(`nwGridDiscount`, `input`, SPR_Discount_DiscountRate, 0, nwCurrency(spotdisc.toFixed(10)));
        //    $('.clsDiscountApp:eq(0)').val('TCP')
        //    $('.clsBasisOfDiscount:eq(0)').val('TCP')
        //    setGridData(`nwGridDiscount`, ``, SPR_Discount_DiscountAmt, 0, nwCurrency(spotamount));
        //}
        //else {
        //    spotamount = 0.00;
        //    $('#nwGridDiscountCon').enable(true);
        //}

        nwParameter_Add('idvallugBranchProject', $("#idvallugBranchProject").val());
        nwParameter_Add('ddSpotCashDiscount', $("#ddSpotCashDiscount").val());

        func_ActionDriven('actCashAmount', false)

        $('#txtCashAmount').val(nwCurrency(spotamount));

        //$('#nwGridPaymentTermDetails-nwData tr').each(function (i, n) {
        //    var $row = $(n);
        //    var category = $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val();
        //    if (category == 'SPOT') {
        //        doReCompute(0, i, 1);
        //    }
        //});
    }
});


//function AddSpotCash()
//{
//    var spotdisc = $('#ddSpotCashDiscount option:selected').val();


//    if (spotdisc == '')
//        spotdisc = 0.00;


//    $('#txtSalesDiscountRate').val(spotdisc + ' %');

//    var tcp = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TCP, 0).split(',').join('')) || 0.00;

//    var count = $(`#nwGridPaymentTermDetails-nwData tr`).length;
//    var lotprice = 0.00;
//    var salesdiscount = 0.00;
//    var totalLotPrice = 0.00;
//    var netlotPrice = 0.00;
//    var misc = 0.00;
//    var tcp = 0.00;
//    var dpDiscAmt = 0.00;
//    var ntcp = 0.00;
//    var vat = 0.00;

//    //var chkatneedsale = $('#chkatneedsale').prop('checked');

//    //if (!chkatneedsale) {
//        for (i = 0; i < count; i++) {
//            paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategoryCode, i);
//            if (paymentCat.toUpperCase() != '') {

//                totalLotPrice = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TotalLotPrice, i).split(`,`).join(``)) || 0.00;
//                lotprice = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_LotPrice, i).split(`,`).join(``)) || 0.00;
//                rate = parseFloat($('#ddSpotCashDiscount option:selected').val()) || 0.00;

//                salesdiscount = totalLotPrice * (rate / 100);//lotprice * (rate / 100);
//                setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, i, commaSeparateNumber(salesdiscount.toFixed(2)));

//                // Net Lot Unit Price
//                netlotPrice = totalLotPrice - salesdiscount
//                setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetLotUnitPrice, i, commaSeparateNumber(netlotPrice.toFixed(2)));

//                //TCP
//                misc = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, i).split(`,`).join(``)) || 0.00;
//                tcp = netlotPrice + misc;
//                setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TCP, i, commaSeparateNumber(tcp.toFixed(2)));

//                //NTCP
//                dpDiscAmt = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscountAmount, i).split(`,`).join(``)) || 0.00;
//                ntcp = tcp - dpDiscAmt;
//                setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NTCP, i, commaSeparateNumber(ntcp.toFixed(2)));
//            }
//        }
//    //}
//    //else {
//    //    for (i = 0; i < count; i++) {
//    //        paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategoryCode, i);
//    //        if (paymentCat.toUpperCase() != '') {

//    //            totalLotPrice = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetLotUnitPrice, i).split(`,`).join(``)) || 0.00;
//    //            //lotprice = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_LotPrice, i).split(`,`).join(``)) || 0.00;
//    //            rate = parseFloat($('#ddSpotCashDiscount option:selected').val()) || 0.00;

//    //            salesdiscount = totalLotPrice * (rate / 100)
//    //            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, i, commaSeparateNumber(salesdiscount.toFixed(2)));

//    //            netlotPrice = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetLotUnitPrice, i).split(`,`).join(``)) || 0.00;
//    //            totalLotPrice = netlotPrice + salesdiscount;
//    //            lotprice = Math.round((totalLotPrice / (1 + (vatrate_global / 100))));
//    //            vat = totalLotPrice - lotprice;


//    //            // Total Lot Price
//    //            setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TotalLotPrice, i, commaSeparateNumber(totalLotPrice.toFixed(2)));

//    //            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_VAT, i, commaSeparateNumber(vat.toFixed(2)));

//    //            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_LotPrice, i, commaSeparateNumber(lotprice.toFixed(2)));

//    //            //TCP
//    //            //misc = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, i).split(`,`).join(``)) || 0.00;
//    //            //tcp = netlotPrice + misc;
//    //            //setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TCP, i, commaSeparateNumber(tcp.toFixed(2)));

//    //            //NTCP
//    //            //dpDiscAmt = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscountAmount, i).split(`,`).join(``)) || 0.00;
//    //            //ntcp = tcp - dpDiscAmt;
//    //            //setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NTCP, i, commaSeparateNumber(ntcp.toFixed(2)));
//    //        }
//    //    }
//    //}


//    SumAllHeaderinPaymentTermDetails();
//}


function LoadSpotCash() {
    var isAtNeedSales = $('#chkatneedsale').prop('checked');
    if ($('#idvallugFinancingType').val().toUpperCase() == 'SPOT' && isAtNeedSales == false) {
        nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());
        nwParameter_Add(`ddtxtPhase`, $(`#ddtxtPhase option:selected`).val());
        nwParameter_Add(`ddtxtUnitType`, $(`#ddtxtUnitType option:selected`).val());
        nwParameter_Add(`ddtxtUnitClass`, $(`#ddtxtUnitClass option:selected`).val());
        nwParameter_Add(`ddlNoOfUnits`, $(`#ddlNoOfUnits option:selected`).val());
        nwParameter_Add(`ddSpotCashDiscount`, $(`#ddSpotCashDiscount option:selected`).val());

        nwParameter_Add(`txtReservationDate`, $(`#txtReservationDate`).val());
        $('#ddSpotCashDiscount').html('');
        $('#ddSpotCashDiscount').enable(true);
        func_ActionDriven('actSpotCashDiscount', false);
    }
    else {
        $('#ddSpotCashDiscount').html('');
        $('#txtCashAmount').val('');
        $('#ddSpotCashDiscount').enable(false);
    }
}

function func_RadioNel() {
    if (parseFloat($(`#txtLoanAmount`).val().split(`,`).join(``)) > 1000000) {
        $('#radioAboveNel').prop('checked', true);
        $('#radioNel').prop('checked', false);
    }
    else {
        $('#radioAboveNel').prop('checked', false);
        $('#radioNel').prop('checked', true);
    }
}

$(document).on('change blur', '#txtLoanAmount', function () {
    func_RadioNel();
});

//$(document).on('change blur', '#idvallugFinancingType', function () {
//    GetStandardPrice();
//    ResetGrid('nwGridPaymentTermDetails');
//});

/**************** BEGIN HERE (Header) ************************************/

//Function
function PopulateVatLimit(vatlimit, vatrate) {
    vatlimit_global = vatlimit;
    if (vatrate == null || vatrate == undefined) {
        vatrate = 0.00;
    }

    vatrate_global = vatrate;
}

function disableTabs(obj, z) {
    var c = obj.find("ul li").size();
    for (var i = z; i < c; i++) {
        obj.tabs("disable", i);
    }
}


$(document).on(`change blur`, `#idvallugBranchProject`, function () {
    //$('#idvallugLocWithAccntblForms').val($('#idvallugBranchProject').val());
    //$('#descvallugLocWithAccntblForms').val($('#descvallugBranchProject').val());

    //$('#idvallugAgent').val('');
    //$('#descvallugAgent').val('');

    //$('#idvallugAccountLoc1').val('');
    //$('#descvallugAccountLoc1').val('');

    //$('#idvallugAccountOfficer1').val('');
    //$('#descvallugAccountOfficer1').val('');

    //$('#idvallugAccountLoc2').val('');
    //$('#descvallugAccountLoc2').val('');

    //$('#idvallugAccountOfficer2').val('');
    //$('#descvallugAccountOfficer2').val('');

    //$('#txtAgentType').val('');
    ClearAllGrid();

});

function ClearAllGrid() {
    //ResetGrid(`nwGridUnitDetails`);
    ResetGrid(`nwGridPaymentTermDetails`);
    ResetGrid(`nwGridAddOn`);
    ResetGrid(`nwGridDiscount`);
    ResetGrid(`nwGridMiscDetailsCon`);
    ResetGrid(`nwGridFreeBiesPromo`);
    ResetGrid(`nwGridCoBuyer`);
}


/*************** END HERE (Header) *********************************/

function SetPaymentTotalFormula() {

    /*Total Lot Price*/
    // var addon = parseFloat(getGridDataPerLine(`nwGridAddOn`, ``, SPR_Addon_NetAddonPriceVatEx, 0).split(',').join('')) || 0.00;
    var totalUnitPrice = parseFloat($(`#txtTotalUnitPrice`).val().split(`,`).join(``)) || 0.00;
    var totalLotPrice = totalUnitPrice //+ addon;
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TotalLotPrice, 0, commaSeparateNumber(totalLotPrice.toFixed(2)));

    var vat = 0.00;
    var vatrate = 0.00;
    var lotprice = 0.00;

    if (totalLotPrice > vatlimit_global) {
        vatrate = vatrate_global / 100;
        lotprice = totalLotPrice / (1 + parseFloat(vatrate));
        vat = lotprice * vatrate;
    }
    else {
        vatrate = 0;
        lotprice = totalLotPrice / (1 + parseFloat(vatrate));
        vat = lotprice * vatrate;
    }

    /* LotPrice */
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_LotPrice, 0, commaSeparateNumber(lotprice.toFixed(2)));

    /* Vat */
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_VAT, 0, commaSeparateNumber(vat.toFixed(2)));

    /* Sales Discount */
    var discount = parseFloat(getGridDataPerLine(`nwGridDiscount`, ``, SPR_Discount_DiscountRate, 0).split(`,`).join(``)) || 0.00;
    var salesDiscountTotal = totalLotPrice * (discount / 100);
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, 0, commaSeparateNumber(salesDiscountTotal.toFixed(2)));

    /* Net Lot Unit Price*/
    var netLotUnitPrice = (totalLotPrice - salesDiscountTotal);
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetLotUnitPrice, 0, commaSeparateNumber(netLotUnitPrice.toFixed(2)));

    /* Miscellaneous (Installment) */
    var installment = parseFloat($(`#txtInstallment`).val()) || 0.00;
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, 0, commaSeparateNumber(installment.toFixed(2)));

    /* TCP */
    var tcp = netLotUnitPrice + installment;
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TCP, 0, commaSeparateNumber(tcp.toFixed(2)));

    /* DP Discount Amount*/
    SumDPDiscountAmt();
    var dpdiscountamt = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscountAmount, 0).split(',').join('')) || 0.00;

    /* NTCP*/
    var ntcpheader = tcp - dpdiscountamt;
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NTCP, 0, commaSeparateNumber(ntcpheader.toFixed(2)));

    /* No. of Payments*/
    SumNoOfPayments();

    /* Header */
    //$('#txtVAT').val(commaSeparateNumber(vat.toFixed(2)));

    ComputationHeader();
}


function Minus() {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        if (i == 0)
            total = arguments[i];
        else
            total -= arguments[i];
    }
    return total;
}

function Sum() {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

function Computation_AtNeedSales(total_lot_unit_price, vat, sales_discount_rate, sales_discount, mcf, tcp, discount) {
    var obj = {};

    /* TCP */
    obj.tcp = tcp;

    /* Standard Lot/Unit Price */
    obj.standard_lot_unit_price = Minus(total_lot_unit_price, vat);

    /* VAT */
    obj.vat = vat;

    /* Total Lot/Unit Price */
    obj.total_lot_unit_price = total_lot_unit_price;

    /* Sales Discount Rate */
    obj.sales_discount_rate = sales_discount_rate;

    /* SalesDiscount */
    obj.sales_discount = sales_discount;

    /* Net Lot/Unit Price */
    obj.net_lot_unit_price = Minus(total_lot_unit_price, sales_discount);

    /* MCF */
    obj.mcf = mcf;

    /* DP Discount */
    obj.discount = discount;

    /* New TCP */
    obj.new_tcp = Minus(obj.tcp, obj.discount);
}

//function ComputationAtNeedSales(

//)




function ComputationHeader() {

    var chkatneedsale = $('#chkatneedsale').prop('checked');
    var totalunitprice = 0.00;
    var standgrossUnitprice = 0.00;
    var vat = 0.00;
    var standardLotUnitPrice = 0.00;
    var salesdiscount = 0.00;
    var netlotunitprice = 0.00;
    var misc = 0.00;
    var tcp = 0.00;
    var dpdiscount = 0.00;
    var ntcp = 0.00;

    //if (!chkatneedsale) {
    standgrossUnitprice = parseFloat($('#txtTotalLotUP').val().split(',').join('')) || 0.00;
    vat = parseFloat($('#txtVAT').val().split(',').join('')) || 0.00;
    standardLotUnitPrice = standgrossUnitprice - vat;

    // Standard Lot/Unit Price 
    $('#txtStandardLotUnitPrice').val(commaSeparateNumber(standardLotUnitPrice.toFixed(2)));

    // Addons (VATIN)
    //var addonsvatin = parseFloat(getGridDataPerLine(`nwGridAddOn`, ``, SPR_Addon_NetAddonPriceVatIn, 0).split(',').join('')) || 0.00;
    //$('#txtAddonsVATIN').val(commaSeparateNumber(addonsvatin.toFixed(2)));

    //Total Lot/Unit Price
    totalunitprice = standgrossUnitprice;//+ addonsvatin;
    $('#txtTotalLotUnitPrice').val(commaSeparateNumber(totalunitprice.toFixed(2)));

    //Sales Discount
    salesdiscount = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, 0).split(',').join('')) || 0.00;
    $('#txtSalesDiscount').val(commaSeparateNumber(salesdiscount.toFixed(2)));

    // Net Lot/Unit Price
    netlotunitprice = totalunitprice - salesdiscount
    $('#txtNetLotUnitPrice').val(commaSeparateNumber(netlotunitprice.toFixed(2)));

    // Miscellaneous
    misc = parseFloat($('#txtMisc').val().split(',').join('')) || 0.00;
    //$('#txtMisc').val(commaSeparateNumber(misc.toFixed(2)));

    //TCP

    tcp = netlotunitprice + misc
    $('#txtTCP').val(commaSeparateNumber(tcp.toFixed(2)));
    $('#txtLoanAmount').val($('#txtTCP').val());//auto populate
    func_RadioNel();

    //DP Discount
    dpdiscount = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscountAmount, 0).split(',').join('')) || 0.00;
    $('#txtDPDiscount').val(commaSeparateNumber(dpdiscount.toFixed(2)));

    // NTCP
    ntcp = tcp - dpdiscount
    $('#txtNTCP').val(commaSeparateNumber(ntcp.toFixed(2)));
    //}
    //else
    //{
    //    //standgrossUnitprice = parseFloat($('#txtTotalLotUP').val().split(',').join('')) || 0.00;
    //    //vat = parseFloat($('#txtVAT').val().split(',').join('')) || 0.00;
    //    //standardLotUnitPrice = standgrossUnitprice - vat;

    //    // Standard Lot/Unit Price 
    //    //$('#txtStandardLotUnitPrice').val(commaSeparateNumber(standardLotUnitPrice.toFixed(2)));

    //    // Addons (VATIN)
    //    //var addonsvatin = parseFloat(getGridDataPerLine(`nwGridAddOn`, ``, SPR_Addon_NetAddonPriceVatIn, 0).split(',').join('')) || 0.00;
    //    //$('#txtAddonsVATIN').val(commaSeparateNumber(addonsvatin.toFixed(2)));

    //    //Sales Discount
    //    salesdiscount = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, 0).split(',').join('')) || 0.00;
    //    $('#txtSalesDiscount').val(commaSeparateNumber(salesdiscount.toFixed(2)));

    //    //Total Lot/Unit Price
    //    standgrossUnitprice = parseFloat($('#txtNetLotUnitPrice').val().split(',').join('')) + salesdiscount; //+ addonsvatin;
    //    $('#txtTotalLotUP').val(commaSeparateNumber(standgrossUnitprice.toFixed(2)));


    //    totalunitprice = (standgrossUnitprice / (1 + (vatrate_global / 100)));
    //    $('#txtStandardLotUnitPrice').val(commaSeparateNumber(totalunitprice.toFixed(2)));

    //    vat = standgrossUnitprice - totalunitprice
    //    $('#txtVAT').val(commaSeparateNumber(vat.toFixed(2)));

    //    // Net Lot/Unit Price
    //    //netlotunitprice = totalunitprice - salesdiscount
    //    //$('#txtNetLotUnitPrice').val(commaSeparateNumber(netlotunitprice.toFixed(2)));

    //    // Miscellaneous
    //    //misc = parseFloat($('#txtMisc').val().split(',').join('')) || 0.00;
    //    //$('#txtMisc').val(commaSeparateNumber(misc.toFixed(2)));

    //    //TCP

    //    //tcp = netlotunitprice + misc
    //    //$('#txtTCP').val(commaSeparateNumber(tcp.toFixed(2)));
    //    $('#txtLoanAmount').val($('#txtTCP').val());//auto populate
    //    func_RadioNel();

    //    //DP Discount
    //    //dpdiscount = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscountAmount, 0).split(',').join('')) || 0.00;
    //    //$('#txtDPDiscount').val(commaSeparateNumber(dpdiscount.toFixed(2)));

    //    // NTCP
    //    //ntcp = tcp - dpdiscount
    //    //$('#txtNTCP').val(commaSeparateNumber(ntcp.toFixed(2)));


    //}
}

function IsVatable() {
    /*Total Lot Price*/
    //var addon = parseFloat(getGridDataPerLine(`nwGridAddOn`, ``, SPR_Addon_NetAddonPriceVatEx, 0).split(',').join('')) || 0.00;
    var totalUnitPrice = parseFloat($(`#txtTotalUnitPrice`).val().split(`,`).join(``)) || 0.00;
    var totalLotPrice = totalUnitPrice;// + addon;

    var z = false;
    if (totalLotPrice > vatlimit_global)
        z = true;
    else
        z = false;
    return z;
}

//function SetReservationFormula() {

//    //var addon = parseFloat(getGridDataPerLine(`nwGridAddOn`, ``, SPR_Addon_NetAddonPriceVatEx, 0).split(',').join('')) || 0.00;
//    var totalUnitPrice = parseFloat($(`#txtTotalUnitPrice`).val().split(`,`).join(``)) || 0.00;
//    var totalLotPrice = totalUnitPrice;//+ addon;

//    var minimumAmt = 0.00;
//    var vat_reserv = `0.00`;
//    var reserv_index = 0;

//    var count = $(`#nwGridPaymentTermDetails-nwData tr`).length;
//    for (i = 0; i < count; i++) {
//        paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategoryCode, i);
//        if (paymentCat.toUpperCase() == `RESRV`) {
//            minimumAmt = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TotalLotPrice, i).split(`,`).join(``)) || 0.00;
//            reserv_index = i;
//        }
//    }

//    var vatrate = 0.00;
//    var vat = 0.00;

//    if (IsVatable()) {
//        vatrate = vatrate_global / 100;
//        vat_reserv = minimumAmt / (1 + parseFloat(vatrate)) * (vatrate);
//    }
//    else {
//        vat_reserv = 0;
//    }

//    var lotprice_reserv = minimumAmt - vat_reserv;
//    var salesDiscount_reserv = 0.00;
//    var netLotUnitPrice_reserv = minimumAmt - salesDiscount_reserv;
//    var misc_reserv = 0.00;
//    var tcp_reserv = netLotUnitPrice_reserv + misc_reserv;
//    var dpdisc_reserv = 0.00;
//    var ntcp_reserv = tcp_reserv - dpdisc_reserv;

//    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_VAT, reserv_index, commaSeparateNumber(vat_reserv.toFixed(2)));
//    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_LotPrice, reserv_index, commaSeparateNumber(lotprice_reserv.toFixed(2)));
//    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, reserv_index, "0.00");
//    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetLotUnitPrice, reserv_index, commaSeparateNumber(netLotUnitPrice_reserv.toFixed(2)));
//    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, reserv_index, "0.00");
//    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TCP, reserv_index, commaSeparateNumber(tcp_reserv.toFixed(2)));
//    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NTCP, reserv_index, commaSeparateNumber(ntcp_reserv.toFixed(2)));

//    // var addOnTotal = parseFloat(getGridDataPerLine(`nwGridAddOn`, ``, SPR_Addon_NetAddonPriceVatEx, 0).split(',').join('')) || 0.00;
//    // var totalUnitPriceTotal = parseFloat($(`#txtTotalUnitPrice`).val().split(`,`).join(``)) || 0.00;
//    // var totalLotPriceTotal = totalUnitPriceTotal +addOnTotal;

//    //var totallotprice = 0.00;
//    //var vat_reserv = `0.00`;
//    //var reserv_index = 0;

//    //for (i = 0; i < count; i++) {
//    //    paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategoryCode, i) ;
//    //    if (paymentCat.toUpperCase() == `RESRV`) {
//    //        totallotprice = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TotalLotPrice, i).split(`,`).join(``)) || 0.00;
//    //        reserv_index = i;}
//    //}
//}

function GetTotalStandardLotUnitPrice() {
    //var addon = parseFloat(getGridDataPerLine(`nwGridAddOn`, ``, SPR_Addon_NetAddonPriceVatEx, 0).split(',').join('')) || 0.00;

    // total Payment TermDetails Lot Price
    var stdLotUnitPrice = parseFloat($(`#txtStandardLotUnitPrice`).val().split(`,`).join(``)) || 0.00;
    var totalLotPrice = stdLotUnitPrice; //+ addon;


    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_LotPrice, 0, commaSeparateNumber(totalLotPrice.toFixed(2)));

}

function ComputePaymentTermHeader(vatlimit, vatrate) {

    //var addon = parseFloat(getGridDataPerLine(`nwGridAddOn`, ``, SPR_Addon_NetAddonPriceVatEx, 0).split(`,`).join(``)) || 0.00;
    var stdLotUnitPrice = parseFloat($(`#txtStandardLotUnitPrice`).val().split(`,`).join(``)) || 0.00;
    var totalLotPriceHdr = stdLotUnitPrice;// + addon;

    var vat = 0.00;

    var count = $(`#nwGridPaymentTermDetails-nwData tr`).length;

    var minimumAmt = 0.00;
    var vat_reserv = `0.00`;
    var reserv_index = 0;

    for (i = 0; i < count; i++) {
        paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategoryCode, i);
        if (paymentCat.toUpperCase() == `RESRV`) {
            minimumAmt = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TotalLotPrice, i).split(`,`).join(``)) || 0.00;
            reserv_index = i;
        }
    }

    if (totalLotPriceHdr > vatlimit) {
        vatrate = vatrate / 100;
        vat = totalLotPriceHdr * vatrate;

        vat_reserv = minimumAmt / (1 + parseFloat(vatrate)) * (vatrate);
    }
    else {
        vat = 0;
        vat_reserv = 0;
    }

    //******************* Total VAT (Header) **************************************//
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_VAT, 0, commaSeparateNumber(vat.toFixed(2)));

    //******************* Total Lot Price (Header) ********************************//
    var totalLotPrice = totalLotPriceHdr + vat;
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TotalLotPrice, 0, commaSeparateNumber(totalLotPrice.toFixed(2)));


    //******************* Total Sales Discount (Header) **************************//
    var discount = parseFloat(getGridDataPerLine(`nwGridDiscount`, ``, SPR_Discount_DiscountRate, 0).split(`,`).join(``)) || 0.00;
    var salesDiscountTotal = totalLotPrice * (discount / 100);
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, 0, commaSeparateNumber(salesDiscountTotal.toFixed(2)));


    //******************* Total Net Lot/Unit Price (Header) ***********************//
    var netLotUnitPrice = (totalLotPrice - salesDiscountTotal);
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetLotUnitPrice, 0, commaSeparateNumber(netLotUnitPrice.toFixed(2)));


    //******************* Miscellaneous (Installment) (Header) ********************//
    var installment = parseFloat($(`#txtInstallment`).val()) || 0.00;
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, 0, commaSeparateNumber(installment.toFixed(2)));


    //****************** TCP (Header) **********************************************//
    var tcp = netLotUnitPrice + installment;
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TCP, 0, commaSeparateNumber(tcp.toFixed(2)));

    //*******************DP DIscount(Header) **************************************//
    SumDPDiscountAmt();
    var dpdiscountamt = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscountAmount, 0).split(',').join('')) || 0.00;

    //******************* NTCP (Header) *********************************************//
    var ntcpheader = tcp - dpdiscountamt;
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NTCP, 0, commaSeparateNumber(ntcpheader.toFixed(2)));

    //****************** Reservation Line *********************************************//
    var lotprice_reserv = minimumAmt - vat_reserv;
    var salesDiscount_reserv = 0.00;
    var netLotUnitPrice_reserv = minimumAmt - salesDiscount_reserv;
    var misc_reserv = 0.00;
    var tcp_reserv = netLotUnitPrice_reserv + misc_reserv;
    var dpdisc_reserv = 0.00;
    var ntcp_reserv = tcp_reserv - dpdisc_reserv;

    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_VAT, reserv_index, commaSeparateNumber(vat_reserv.toFixed(2)));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_LotPrice, reserv_index, commaSeparateNumber(lotprice_reserv.toFixed(2)));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetLotUnitPrice, reserv_index, commaSeparateNumber(netLotUnitPrice_reserv.toFixed(2)));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TCP, reserv_index, commaSeparateNumber(tcp_reserv.toFixed(2)));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NTCP, reserv_index, commaSeparateNumber(ntcp_reserv.toFixed(2)));

    //Set to Global variable
    minimumAmt_global = minimumAmt;
    ComputationContractRate();
}

function SumNoOfPayments() {
    var columnNoOfPayments = getGridElement(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments);
    var totalNoofPayments = 0.00;

    $.each(columnNoOfPayments, function (idx, obj) {
        if (idx != 0)
            totalNoofPayments += parseFloat($(this).text().split(`,`).join(``)) || 0.00;
    });
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments, 0, commaSeparateNumber(totalNoofPayments.toFixed(2)));
    $('#txtLoanTerm').val(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments, 0)); //Auto populate
}

function SumMonthlyPayments() {
    var columnNoOfPayments = getGridElement(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPayment);
    var totalMonthlyPayments = 0.00;

    $.each(columnNoOfPayments, function (idx, obj) {
        if (idx != 0)
            totalMonthlyPayments += parseFloat($(this).text().split(`,`).join(``)) || 0.00;
    });
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPayment, 0, commaSeparateNumber(totalMonthlyPayments.toFixed(2)));
    $('#txtLoanTerm').val(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPayment, 0)); //Auto populate
}

function SumDPDiscountAmt() {

    var columnDiscountAmount = getGridElement(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount);
    var totalDiscountAmount = 0.00;

    $.each(columnDiscountAmount, function (index, obj) {
        //if (idx != 0)
        totalDiscountAmount += parseFloat($(this).val().split(`,`).join(``)) || 0.00;

    });
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscountAmount, 0, commaSeparateNumber(totalDiscountAmount.toFixed(2)));

    //auto compute ntcp header
    var tcp = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TCP, 0).split(',').join('')) || 0.00;
    var ntcp = tcp - totalDiscountAmount;
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NTCP, 0, commaSeparateNumber(ntcp.toFixed(2)));
    ComputationHeader();
}

function EnableFields() {
    $("#lugAgent").enable(false);
    //$("#idvallugAgent").prop("disabled", false);
    //$("#lugBranchProject").removeClass('adisabled');
    //$("#idvallugBranchProject").prop("disabled", false);
    $("#lugFinancingType").removeClass('adisabled');
    $("#idvallugFinancingType").prop("disabled", false);

    $("#lugPaymentType").removeClass('adisabled');
    $("#idvallugPaymentType").prop("disabled", false);

    $("#lugClient").removeClass('adisabled');
    $("#idvallugClient").prop("disabled", false);
    //$("#lugSourceofSale").removeClass('adisabled');
    //$("#idvallugSourceofSale").prop("disabled", false);
    $("#chkLetterofIntent").prop("disabled", false);
    $("#txtReservationDate").prop("disabled", false);
    $("#txtExpirationDate").prop("disabled", false);
    $("#txtAccountLocCode1").prop("disabled", false);
    $("#txtAccountLocCode2").prop("disabled", false);
    $('#lugAccountLoc1').removeClass('adisabled');
    $('#idvallugAccountLoc1').prop('disabled', false);
    $('#lugAccountLoc2').removeClass('adisabled');
    $('#idvallugAccountLoc2').prop('disabled', false);
    $('#btnReservationDoc').enable(true);
    $('#btnGenerate').enable(true);
    $('#btnApprovalDetails').enable(false);
    $("#settingstabs").enable(true);
    $('#lugLocWithAccntblForms').removeClass('adisabled').enable(true);
    $('#lugSourceOfSale').removeClass('adisabled').enable(true);
    $("#settingstabs-1").enable(true);
    $('#idvallugBranchProject').enable(false);
    $('#descvallugBranchProject').enable(false);
    //$("#settingstabs-2").enable(true);
    //$("#settingstabs-3").enable(true);
    //$("#settingstabs-4").enable(true);
    //$("#settingstabs-5").enable(true);
    //$("#settingstabs-6").enable(true);
    //$("#settingstabs-7").enable(true);
    //$("#settingstabs-8").enable(true);
    $('#chkReservationAmount').prop('disabled', false);
    $('#chkFixedInterest').prop('disabled', true);
    $('#txtDPStartDate').prop('disabled', false);
    $('#txtBalStartDate').prop('disabled', false);
    //$('#txtMonthlyDP').prop('disabled', false);
    //$('#txtMonthlyAmortization').prop('disabled', false);
    $('#ddtxtUnitType').prop('disabled', false);
    $('#chkAtNeedSale').prop('disabled', false);
    $('#txtCoBorrower').prop('disabled', true);
    $('#chkatneedsale').prop('disabled', false);
    $('#btnReservationDoc').enable(false);
    $('#ddOrigin').prop('disabled', false);
    $('#ddtxtSourceOfSale').prop('disabled', false);
    $('#txtInstallment').prop('disabled', true);
    $('#txtFixed').prop('disabled', true);
    $('#txtPAFormNotes').prop('disabled', false);
    $('#txtPAFormNotes').css('background-color', '');

    $('#lugAccountOfficer1').removeClass('adisabled');
    $('#idvallugAccountOfficer1').prop('disabled', false);
    $('#idvallugBranchProject').enable(false);
    $('#descvallugBranchProject').enable(false);

    $('#lugAccountOfficer2').removeClass('adisabled');
    $('#idvallugAccountOfficer2').prop('disabled', false);
    $('#chkAgent').prop('disabled', false);
    $('#ddSpotCashDiscount').addClass('adisabled').enable(false);
    $('#chkLumpSum').enable(true);
    $('#btnEXP').enable(false);
    $('#btnEXP').css('background-color', 'gainsboro');
}

function fieldsAlwaysDisabled() {
    //$('#lugLocWithAccntblForms').addClass('adisabled');
    //$('#idvallugLocWithAccntblForms').prop('disabled', true);
    $('.alwaysdisabled').enable(false);
}

function DisableFields() {

    fieldsAlwaysDisabled();
    $("#settingstabs").enable(false);
    $('.nwSelect').enable(false);
    $('#txtFixedInterest').prop('disabled', true);
    //$("#lugAgent").addClass('adisabled');
    //$("#idvallugAgent").prop("disabled", true);

    $('#lugAgent').enable(false);
    //$("#lugBranchProject").addClass('adisabled');
    //$("#idvallugBranchProject").prop("disabled", true);
    $("#lugFinancingType").addClass('adisabled');
    $("#idvallugFinancingType").prop("disabled", true);

    $("#lugPaymentType").addClass('adisabled');
    $("#idvallugPaymentType").prop("disabled", true);

    $("#lugClient").addClass('adisabled');
    $("#idvallugClient").prop("disabled", true);
    //$("#lugSourceofSale").addClass('adisabled');
    //$("#idvallugSourceofSale").prop("disabled", true);
    $("#chkLetterofIntent").prop("disabled", true);
    $("#txtLOIDate").prop("disabled", true);
    $("#txtReservationDate").prop("disabled", true);
    $("#txtExpirationDate").prop("disabled", true);

    $("#txtSalesDiscount").prop("disabled", true);
    $("#txtAccountLocCode1").prop("disabled", true);
    $("#txtAccountLocDescription1").prop("disabled", true);
    $("#txtAccountOfficerCode1").prop("disabled", true);
    $("#txtAccountOfficerDesc1").prop("disabled", true);
    $("#txtAccountLocCode2").prop("disabled", true);
    $("#txtAccountLocDescription2").prop("disabled", true);
    $("#txtAccountOfficerCode2").prop("disabled", true);
    $("#txtAccountOfficerDesc2").prop("disabled", true);
    $("#chkReservationAmount").prop("disabled", true);
    $("#chkFixedInterest").prop("disabled", true);
    $("#txtDPStartDate").prop("disabled", true);
    $("#txtBalStartDate").prop("disabled", true);
    $("#txtMonthlyDP").prop("disabled", true);
    $("#txtMonthlyAmortization").prop("disabled", true);
    $('#btnReservationDoc').enable(false);
    $('#btnGenerate').enable(false);
    $('#btnApprovalDetails').enable(false);

    $('#lugAccountLoc1').addClass('adisabled');
    $('#idvallugAccountLoc1').prop('disabled', true);

    $('#lugAccountLoc2').addClass('adisabled');
    $('#idvallugAccountLoc2').prop('disabled', true);



    $('#txtrsnforDisapprovalDesc').css('background-color', '#E7E7E7');
    $('#txtDisapprovalRemarks').css('background-color', '#E7E7E7');

    $('#txtPAFormNotes').css('background-color', '#E7E7E7');


    $('#ddtxtUnitType').prop('disabled', true);
    $('#txtUnitCapacity').prop('disabled', true);
    $('#txtBranchID_Discount').prop('disabled', true);

    $('#txtInstallment').prop('disabled', true);
    $('#txtFixed').prop('disabled', true);
    $('#chkAtNeedSale').prop('disabled', true);
    $('#txtCoBorrower').prop('disabled', true);
    $('#btnReservationDoc').enable(false);
    $('#ddOrigin').prop('disabled', true);
    $('#ddtxtSourceOfSale').prop('disabled', true);
    $('#txtInstallment').prop('disabled', true);
    $('#txtFixed').prop('disabled', true);
    $('#txtPAFormNotes').prop('disabled', true);
    $('#txtMCF').prop('disabled', true);

    $('#lugAccountOfficer1').addClass('adisabled', true);
    $('#idvallugAccountOfficer1').prop('disabled', true);

    $('#lugAccountOfficer2').addClass('adisabled', true);
    $('#idvallugAccountOfficer2').prop('disabled', true);
    $('#chkAgent').prop('disabled', true);
    $('#lugLocWithAccntblForms').addClass('adisabled').enable(false);
    $('#lugSourceOfSale').addClass('adisabled').enable(false);
    $('#chkLumpSum').enable(false);
    $('#btnPaymentDetails').enable(false);
    $portal().disableFields();
    $('#btnEXP').enable(false);
    $('#btnEXP').css('background-color', 'gainsboro');
    $('#btnReqCompliance').enable(false);
    $('#btnMiscellaneousDetails').removeClass("btnBlue");

}


function EnableFieldsDone() {//Binding Done

    $('#txtSalesDiscountAmount').val($('#txtCashAmount').val())



    $('#btnGenerate').enable(true);
    $('#btnApprovalDetails').prop('disabled', false);
    $('#btnReservationDoc').prop('disabled', false);



    $('#chkReservationAmount').prop('disabled', false);
    $('#chkFixedInterest').prop('disabled', true);
    var IsChecked = $('#chkFixedInterest').prop('checked');
    if (IsChecked)
        $('#txtFixedInterest').prop('disabled', false);
    else
        $('#txtFixedInterest').prop('disabled', true);

    $('#txtDPStartDate').prop('disabled', false);
    $('#txtBalStartDate').prop('disabled', false);
    $('#btnReservationDoc').enable(true);
    $("#btnApprovalDetails").enable(true);
    $('#txtCoBorrower').prop('disabled', true);
    $('#btnPaymentDetails').enable(true);
    nwParameter_Add(`idvallugLocWithAccntblForms`, $(`#idvallugLocWithAccntblForms`).val());
    func_ActionDriven("actCheckApprover", false);

    if (nwDocno != null && nwDocno.length > 0) {
        fromOtherEntry();
    }
    else
        $("#settingstabs").enable(true);

    fn_EnableDisabledSpotCash();

    $('#chkLumpSum').enable(true);



    $('#RefAddOn').enable(true);
    $('#txtDPStartDate').enable(false);
    $('#btnMiscellaneousDetails').addClass("btnBlue");
    $('#btnReqCompliance').enable(true);

    $("#txtExpirationDate").enable(true)
    $("#settingstabs-1").enable(true)

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
}

function fn_isSpecial(x) {
    isSpecial = x;
    if (isSpecial != null && isSpecial.length > 0) {
        $('.creditedPaymentToggle').text('Credited Payment');
        $('#txtDPDiscount').val(isSpecial);
    }
}


function fromOtherEntry() {
    $("#lugAgent").addClass('adisabled');
    $("#idvallugAgent").prop("disabled", true);
    //$("#lugBranchProject").addClass('adisabled');
    //$("#idvallugBranchProject").prop("disabled", true);
    $("#lugFinancingType").addClass('adisabled');
    $("#idvallugFinancingType").prop("disabled", true);

    $("#lugPaymentType").addClass('adisabled');
    $("#idvallugPaymentType").prop("disabled", true);

    $("#lugClient").addClass('adisabled');
    $("#idvallugClient").prop("disabled", true);
    //$("#lugSourceofSale").addClass('adisabled');
    //$("#idvallugSourceofSale").prop("disabled", true);
    $("#chkLetterofIntent").prop("disabled", true);
    $("#txtLOIDate").prop("disabled", true);
    $("#txtReservationDate").prop("disabled", true);
    $("#txtExpirationDate").prop("disabled", true);

    $("#txtSalesDiscount").prop("disabled", true);
    $("#txtAccountLocCode1").prop("disabled", true);
    $("#txtAccountLocDescription1").prop("disabled", true);
    $("#txtAccountOfficerCode1").prop("disabled", true);
    $("#txtAccountOfficerDesc1").prop("disabled", true);
    $("#txtAccountLocCode2").prop("disabled", true);
    $("#txtAccountLocDescription2").prop("disabled", true);
    $("#txtAccountOfficerCode2").prop("disabled", true);
    $("#txtAccountOfficerDesc2").prop("disabled", true);
    $("#chkReservationAmount").prop("disabled", true);
    $("#chkFixedInterest").prop("disabled", true);
    $("#txtFixedInterest").prop("disabled", true);
    $("#txtDPStartDate").prop("disabled", true);
    $("#txtBalStartDate").prop("disabled", true);
    $("#txtMonthlyDP").prop("disabled", true);
    $("#txtMonthlyAmortization").prop("disabled", true);
    $('#btnReservationDoc').enable(true)


    $('#btnGenerate').enable(true);
    $('#btnApprovalDetails').enable(false);

    $('#lugAccountLoc1').addClass('adisabled');
    $('#idvallugAccountLoc1').prop('disabled', true);

    $('#lugAccountLoc2').addClass('adisabled');
    $('#idvallugAccountLoc2').prop('disabled', true);

    //$("#settingstabs").enable(false);

    $('#txtrsnforDisapprovalDesc').css('background-color', '#E7E7E7');
    $('#txtDisapprovalRemarks').css('background-color', '#E7E7E7');
    $('#txtPAFormNotes').css('background-color', '#E7E7E7');

    $('#ddtxtUnitType').prop('disabled', true);
    $('#txtUnitCapacity').prop('disabled', true);
    $('#txtBranchID_Discount').prop('disabled', true);

    $('#txtInstallment').prop('disabled', true);
    $('#txtFixed').prop('disabled', true);
    $('#chkAtNeedSale').prop('disabled', true);
    $('#txtCoBorrower').prop('disabled', true);
    //$('#btnReservationDoc').enable(false);
    $('#ddOrigin').prop('disabled', true);
    $('#ddtxtSourceOfSale').prop('disabled', true);
    $('#txtInstallment').prop('disabled', true);
    $('#txtFixed').prop('disabled', true);
    $('#txtPAFormNotes').prop('disabled', true);
    $('#txtPAFormNotes').css('background-color', '#E7E7E7');
    $('#chkAgent').prop('disabled', true);

    $('.nwgrid_Insert').enable(false);
    $('.nwgrid_Delete').enable(false);
    $('select').enable(false);
    $('input').enable(false);
    $('#btnOtherStatement').enable(false);
    $("#settingstabs").enable(true);
    //$('#TabGridCon').enable(false);
    $('#nwGridPaymentTermDetailsCon').enable(true)
    $('#nwGridPaymentTermDetails .tblGridBody').enable(false);
    $('#nwGridDiscount').enable(false);
    $('#nwGridAddOn').enable(false);
    //$('#btnMiscellaneousDetails').enable(false);
    $('#btnLoadCoBuyerDetails').enable(false);
    $('#btnMiscellaneousDetails').enable(true);
    $('#btnSaveMiscellaneous').enable(false);
    $('#btnSaveApprvDetails').enable(false);
    $('#nwGridApprover').enable(false);
}

function DisableCheckboxDiscount() {
    var cnt = $('#nwGridPaymentTermDetails tr').length - 1;
    var paymentCat = '';
    for (i = 0; i < cnt; i++) {
        paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, `dd`, SPR_PaymentTermDetails_PaymentCategory, i);

        if (paymentCat != undefined && paymentCat != '') {
            if (paymentCat.toUpperCase() == 'DOWNP') {
                $('#nwGridPaymentTermDetails tr:eq(' + (i + 1) + ' ) td:eq(' + SPR_PaymentTermDetails_DPDiscount + ') input').enable(true);
                $('#nwGridPaymentTermDetails tr:eq(' + (i + 1) + ' ) td:eq(' + SPR_PaymentTermDetails_DPDiscount + ')').css('background-color', '');
            }
            else if (paymentCat != '') {
                $('#nwGridPaymentTermDetails tr:eq(' + (i + 1) + ' ) td:eq(' + SPR_PaymentTermDetails_DPDiscount + ') input').prop('checked', false);
                $('#nwGridPaymentTermDetails tr:eq(' + (i + 1) + ' ) td:eq(' + SPR_PaymentTermDetails_DPDiscount + ') input').enable(false);
                $('#nwGridPaymentTermDetails tr:eq(' + (i + 1) + ' ) td:eq(' + SPR_PaymentTermDetails_DPDiscount + ')').css('background-color', 'gainsboro');
            }
        }
    }

    if (nwDocno != null && nwDocno.length > 0) {
        fromOtherEntry();
    }
}

function ResetQuestion(tag) {
    if (tag == 0) {
        msgBoxContainerQuestion = "ResetMiscellaneous";
        if (jsonMisc.length > 0) {
            if (jsonMisc[0].MiscellaneousAmount != '') {
                parent_MessageBoxQuestion("Miscellaneous details will be cleared. Would you like to continue?", pagetitle, "Question");
                $('.message_Cancel').css('display', 'none');
                $('#dimMessageBox .BoxClose').css('display', 'none');
            }
            else
                ClearFields(5);

        }
        else
            ClearFields(5);
    }
    else if (tag == 1) {
        msgBoxContainerQuestion = "ResetPaymentTermDetails";
        parent_MessageBoxQuestion("Payment term details will be cleared. Would you like to continue?", pagetitle, "Question");
        $('.message_Cancel').css('display', 'none');
        $('#dimMessageBox .BoxClose').css('display', 'none');
    }
    else if (tag == 2) {
        msgBoxContainerQuestion = "ResetLookupPaymentTermDetails";
        if (jsonMisc.length > 0 && !$('#chkFixedInterest').prop('checked')) {
            if (jsonMisc[jsonMisc.length - 1].MiscellaneousAmount != '') {
                parent_MessageBoxQuestion("Miscellaneous details will be cleared. Would you like to continue?", pagetitle, "Question");
                $('.message_Cancel').css('display', 'none');
                $('#dimMessageBox .BoxClose').css('display', 'none');
            } else {
                LookupDoneLogic();
                ResetGrid(`nwGridDiscount`);
                doCompute(0);
            }
        }
        else {
            LookupDoneLogic();
            ResetGrid(`nwGridDiscount`);
            doCompute(0);
        }
    }
    else if (tag == 3) {

        msgBoxContainerQuestion = "ResetDPDiscount";
        var dpdiscAmt = parseFloat(getGridDataPerLine('nwGridPaymentTermDetails', 'input', SPR_PaymentTermDetails_DPDiscountAmount, 0)) || 0.00;

        var rate = parseFloat(getGridDataPerLine(`nwGridDiscount`, `input`, SPR_Discount_DiscountRate, 0)) || 0.00;

        if (dpdiscAmt > 0 && rate > 0) {
            parent_MessageBoxQuestion("DP Discount details will be cleared. Would you like to continue?", pagetitle, "Question");
            $('.message_Cancel').css('display', 'none');
            $('#dimMessageBox .BoxClose').css('display', 'none');
        } else {
            doDiscountCompute();
        }
    }

}
//function LoadCombo() {

//    nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());
//    nwParameter_Add(`ddtxtPhase`, $(`#txtPhase_Combo`).val());
//    nwParameter_Add(`ddtxtUnitType`, $(`#txtUnitType_Combo`).val());
//    nwParameter_Add(`ddtxtUnitClass`, $(`#txtUnitClass_Combo`).val());
//    nwParameter_Add(`ddlNoOfUnits`, $(`#txtNoOfUnits_Combo`).val());
//    nwParameter_Add(`ddSpotCashDiscount`, $(`#txtSpotCashDiscount_Combo`).val());
//    nwParameter_Add(`txtReservationDate`, $(`#txtReservationDate`).val());

//    func_ActionDriven('actGlobal', false);
//}

function LoadSpotCombo(z) {
    jsonSpot = z;
    var id = 'ddSpotCashDiscount'
    $('#ddSpotCashDiscount').find('option').remove();
    LoadCombo(JSON.parse(z), id);
}

function LoadComboPopulate(j) {

    jsonAllCombo = j;

    //Inventory Group
    $('#ddInventoryGroup').empty();
    $('#ddProductType').empty();
    var id = $('#ddInventoryGroup').attr('id');
    LoadCombo(DistinctColumn(JSON.parse(j), id), id);
    $("#ddInventoryGroup").val($(`#ddInventoryGroup_temp`).val());

    var inventoryGroup = $('#ddInventoryGroup option:selected').val() || '';

    //ProductType
    $('#ddProductType').empty();
    $('#ddPhaseTower').empty();
    $('#ddModel').empty();
    $('#ddInventoryType').empty();
    $('#ddInventoryClass').empty();

    var id = $('#ddProductType').attr('id');
    var productType = $.grep(JSON.parse(jsonAllCombo), function (n, i) {
        return ((n.InventoryGroup == inventoryGroup || inventoryGroup == ''))
    });
    LoadCombo(DistinctColumn(productType, id), id);
    $("#ddProductType").val($(`#ddProductType_temp`).val())

    //Phase
    $('#ddPhaseTower').empty();
    $('#ddModel').empty();
    $('#ddInventoryType').empty();
    $('#ddInventoryClass').empty();

    var id = $('#ddPhaseTower').attr('id');

    var phase = $.grep(JSON.parse(jsonAllCombo), function (n, i) {
        return ((n.InventoryGroup == inventoryGroup || inventoryGroup == '')) &&
            (n.ProductType == $('#ddProductType option:selected').val() || '')
    });
    LoadCombo(DistinctColumn(phase, id), id);
    $("#ddPhaseTower").val($(`#ddPhaseTower_temp`).val());

    //Model
    $('#ddModel').empty();
    $('#ddInventoryType').empty();
    $('#ddInventoryClass').empty();
    var id = $('#ddModel').attr('id');
    var model = $.grep(JSON.parse(jsonAllCombo), function (n, i) {
        return ((n.InventoryGroup == inventoryGroup || inventoryGroup == '')) &&
            (n.ProductType == $('#ddProductType option:selected').val() || '') &&
            (n.PhaseCode == $('#ddPhaseTower option:selected').val() || '')
    });
    LoadCombo(DistinctColumn(model, id), id);
    $("#ddModel").val($(`#ddModel_temp`).val());

    //Inventory Type
    $('#ddInventoryType').empty();
    $('#ddInventoryClass').empty();

    var id = $('#ddInventoryType').attr('id');
    var inventoryType = $.grep(JSON.parse(jsonAllCombo), function (n, i) {
        return ((n.InventoryGroup == inventoryGroup || inventoryGroup == '')) &&
            (n.ProductType == $('#ddProductType option:selected').val() || '') &&
            (n.PhaseCode == $('#ddPhaseTower option:selected').val() || '') &&
            (n.ModelCode == $('#ddModel option:selected').val() || '')
    });

    LoadCombo(DistinctColumn(inventoryType, id), id);
    $("#ddInventoryType").val($(`#ddInventoryType_temp`).val());


    //Inventory Class
    $('#ddInventoryClass').empty();

    var id = $('#ddInventoryClass').attr('id');
    var inventoryClass = $.grep(JSON.parse(jsonAllCombo), function (n, i) {
        return ((n.InventoryGroup == inventoryGroup || inventoryGroup == '')) &&
            (n.ProductType == $('#ddProductType option:selected').val() || '') &&
            (n.PhaseCode == $('#ddPhaseTower option:selected').val() || '') &&
            (n.ModelCode == $('#ddModel option:selected').val() || '') &&
            (n.InventorytypeCode == $('#ddInventoryType option:selected').val() || '')
    });
    LoadCombo(DistinctColumn(inventoryClass, id), id);
    $("#ddInventoryClass").val($(`#ddInventoryClass_temp`).val());

    //$("#ddlNoOfUnits").val($(`#ddModel_temp`).val());
    //$("#ddSpotCashDiscount").val($(`#ddInventoryType_temp`).val());
    //$("#ddSpotCashDiscount").val($(`#ddInventoryClass_temp`).val());

}

function DisableFieldsEmpty() {
    DisableFields();
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0') {
        DisableFieldsEmpty();
        $("#noah-webui-Toolbox").bindingProcess().enable(false);
    }
    else
        EnableFieldsDone();
}

function ClearFields(tag) {
    if (tag == 0) {
        $("#idvallugLocWithAccntblForms").val("");
        $("#descvallugLocWithAccntblForms").val("");
        $("#idvallugAgent").val("");
        $("#descvallugAgent").val("");
        $("#idvallugBranchProject").val("");
        $("#descvallugBranchProject").val("");
        $("#txtReservationControlNo").val("");
        $("#idvallugFinancingType").val("");
        $("#descvallugFinancingType").val("");
        $("#idvallugPaymentType").val("");
        $("#descvallugPaymentType").val("");
        $("#idvallugClient").val("");
        $("#descvallugClient").val("");
        $("#txtCrossRefCode").val("");
        $("#txtVIPType").val("");
        $("#txtBirthdate").val("");
        $("#txtAge").val("");
        //$("#idvallugSourceofSale").val("");
        //$("#descvallugSourceofSale").val("");
        $('#ddtxtSourceOfSale').val('');
        //$('#ddtxtSourceOfSale').text('');
        $("#chkLetterofIntent").prop('checked', false);

        $("#txtLOIDate").val("");
        $("#txtReservationDate").val("");
        $("#txtExpirationDate").val("");
        $("#txtDocumentStatusCode").val("");
        $("#txtDocumentStatus").val("");
        $("#txtrsnforDisapprovalCode").val("");
        $("#txtrsnforDisapprovalDesc").val("");
        $("#txtDisapprovalRemarks").val("");
        $("#txtStandardLotUnitPrice").val("");
        $("#txtVAT").val("");
        $("#txtTotalLotUP").val("");
        //$("#txtAddonsVATIN").val("");
        $("#txtTotalLotUnitPrice").val("");
        $("#txtSalesDiscount").val("");
        $("#txtNetLotUnitPrice").val("");
        $("#txtMisc").val("");
        $("#txtTCP").val("");
        $("#txtDPDiscount").val("");
        $("#txtNTCP").val("");
        $("#txtAccountLocCode1").val("");
        $("#txtAccountLocDescription1").val("");
        $("#txtAccountOfficerCode1").val("");
        $("#txtAccountOfficerDesc1").val("");
        $("#txtAccountLocCode2").val("");
        $("#txtAccountLocDescription2").val("");
        $("#txtAccountOfficerCode2").val("");
        $("#txtAccountOfficerDesc2").val("");

        $("#chkReservationAmount").prop("checked", false);
        $("#chkFixedInterest").val("");
        $("#txtFixedInterest").val("");
        $("#txtDPStartDate").val("");
        $("#txtBalStartDate").val("");
        $("#txtMonthlyDP").val("");
        $("#txtMonthlyAmortization").val("");
        $('#ddtxtUnitType').val('');
        $('#ddtxtUnitClass').val('');
        $(`#txtBranchID_Discount`).val(``);
        $(`#txtBranchID_DiscountCode`).val(``);
        $("#chkAtNeedSale").prop('checked', false);
        $(`#txtReservationAmt`).val(``);
        $('#ItemGroupType').val('');
        dtStatementDetails = '';
        $('#txtsalesdirector').val('');
        $('#txtsalesmanager').val('');

        $('#txtAgentType').val('');
        $('#txtTotalUnitPrice').val('');
        $('#txtUnitCapacity').val('');
        $('#idvallugAccountLoc1').val('');
        $('#descvallugAccountLoc1').val('');
        $('#idvallugAccountLoc2').val('');
        $('#descvallugAccountLoc2').val('');
        $('#txtReservationControlNo').val('');

        $('#txtMCF').val('');
        $('#txtSpotCashDiscount').val('');
        $('#txtCashAmount').val('');
        $('#txtIsVatable').val(0);
        $('#txtInterestRate').val('');

        $('#txtPhase_Combo').val('');
        $('#txtUnitType_Combo').val('');
        $('#txtUnitClass_Combo').val('');
        $('#txtNoOfUnits_Combo').val('');
        $('#txtSpotCashDiscount_Combo').val('');
        $('#txtCoBorrower').val('');

        $('#ddtxtPhase').html('');
        $('#ddtxtUnitType').html('');
        $('#ddtxtUnitClass').html('');
        $('#ddlNoOfUnits').html('');

        $('#chkatneedsale').prop('checked', false);
        $('#chkFixedInterest').prop('checked', false);


        $('#idvallugAccountOfficer1').val('');
        $('#idvallugAccountOfficer2').val('');

        $('#descvallugAccountOfficer1').val('');
        $('#descvallugAccountOfficer2').val('');

        $('#txtLoanAmount').val('');
        $('#txtLoanTerm').val('');
        $('#txtMaturityDate').val('');
        $('#txtShortDesc').val('');

        $('#txtPAFormNotes').val('');
        $('#chkAgent').prop('checked', false);

        $(`#ddInventoryGroup_temp`).val('');
        $(`#ddProductType_temp`).val('');
        $(`#ddPhaseTower_temp`).val('');
        $(`#ddModel_temp`).val('');
        $(`#ddInventoryType_temp`).val('');
        $(`#ddInventoryClass_temp`).val('');
        $('#txtUnitCode').val('');
        $('#txtLotPrice').val('');
        $('#txtHousePrice').val('');
        $('#txtSellingPrice').val('');
        $('#txtVatAmount').val('');
        $('#txtGrossSellingPrice').val('');
        $('#txtSalesDiscountAmount').val('');

        $('#ddPhaseTower').html('');
        $('#ddModel').html('');
        $('#ddProductType').html('');
        $('#ddInventoryType').html('');
        $('#ddInventoryClass').html('');
        $('#txtPropertyType').val('');
        $('#idvallugSourceOfSale').val('');
        $('#descvallugSourceOfSale').val('');
        $('#txtItemGroupType').val('');

        $('#chkLumpSum').prop('checked', false);
        $('#chkFixedInterest').prop('checked', false);
        $('#txtUnitType').val('');
        $('#txtUnitClass').val('');
        $('#nwGridAmortizationCon').html('');

        $('#txtReservationAmount').val('');
        $('#txtMiscellaneousAmount').val('');
        $('#txtMiscellaneousRate').val('');
        $('#txtDPRate').val('');
        $('#txtTransactionDate').val('');
        $('#txtVatrate').val('');
        $('#txtpaymentGroupID').val('');
    }
    else if (tag == 1) { //UnitCode
        $('#txtMonthlyDP').val('');
        $('#txtMonthlyAmortization').val('');
        $('#txtpaymentGroupID').val('');

        ResetGrid(`nwGridPaymentTermDetails`);
        ResetGrid(`nwGridAddOn`);
        ResetGrid(`nwGridDiscount`);
        ResetGrid(`nwGridMiscDetailsCon`);
        ResetGrid(`nwGridFreeBiesPromo`);
        ResetGrid(`nwGridCoBuyer`);
        $('#nwGridAmortizationCon').html('');

    }
    else if (tag == 2) {
        ClearMiscellaneous();
        ResetGrid('nwGridPaymentTermDetails');
        ResetGrid('nwGridDiscount');
        jsonMisc = [];
        $('#txtMonthlyDP').val('');
        $('#txtMonthlyAmortization').val('');

        nwGrid_ClearRange('nwGridPaymentTermDetails', 1, 1, $(`#nwGridPaymentTermDetails th`).size() - 1, $(`#nwGridPaymentTermDetails .tblGridBody tr`).size());
        nwGrid_RemoveRow('nwGridPaymentTermDetails', 1, $(`#nwGridPaymentTermDetails .tblGridBody tr`).size());
        nwGrid_AddRow('nwGridPaymentTermDetails', 1);
    }
    else if (tag == 3) {//Delete specific row in Payment Term Details
        ClearPaymentTermDetailsPerLine(0);
        SumAllHeader();
        var reserv = getGridDataPerLine('nwGridPaymentTermDetails', 'dd', SPR_PaymentTermDetails_PaymentCategory, crnwTR.index());
        if ($('#idvallugFinancingType').val() == 'DEF') {
            ChangeDPDate($('#txtReservationDate').val());
        }
        else if (reserv == 'RESRV') {
            ChangeDPDate($('#txtReservationDate').val());
        }
        else
            ChangeDPDate($('#txtDPStartDate').val());
    }
    else if (tag == 4) {
        ColsCode = '';
        ColsDescription = '';
        ColsPenaltyRate = '';
        ColsAnnualRate = '';
        ColsPeriod = '';
        ColsTermPeriod = '';
        ColsContractRate = '';
        ColsTermAmount = '';
        ColsContractAmount = '';
        ColsSalesDiscountLin = '';
        ColsDPDisc = '';
        ColsDPDiscAmount = '';
        ColsNetContractPriceLin = '';
        ColsTotalNoPayments = '';
        var category = getGridDataPerLine('nwGridPaymentTermDetails', 'dd', SPR_PaymentTermDetails_PaymentCategory, crnwTR.index());
        if ($('#idvallugFinancingType').val() == 'DEF') {
            if (category == 'DOWNP')
                if ($('#txtReservationDate').val().length > 0) {
                    $('#txtDPStartDate').enable(true);
                    $('#txtDPStartDate').val(formatDate(addMonths(new Date($('#txtReservationDate').val()), 1)));
                    ChangeDPDate($('#txtDPStartDate').val());
                }
                else {
                    ChangeDPDate($('#txtReservationDate').val());
                    $('#txtDPStartDate').enable(false);
                }
        }
        else if (category == 'RESRV') {
            ChangeDPDate($('#txtReservationDate').val());
        }
        else
            ChangeDPDate($('#txtDPStartDate').val());
    }
    else if (tag == 5) {
        ClearPaymentTermDetailsPerLine(1);
        SumAllHeader();
        var category = getGridDataPerLine('nwGridPaymentTermDetails', 'dd', SPR_PaymentTermDetails_PaymentCategory, crnwTR.index());
        if ($('#idvallugFinancingType').val() == 'DEF') {
            if (category == 'DOWNP')
                if ($('#txtReservationDate').val().length > 0) {
                    $('#txtDPStartDate').enable(true);
                    $('#txtDPStartDate').val(formatDate(addMonths(new Date($('#txtReservationDate').val()), 1)));
                    ChangeDPDate($('#txtDPStartDate').val());
                }
                else {
                    ChangeDPDate($('#txtReservationDate').val());
                    $('#txtDPStartDate').enable(false);
                }
        }
        else if (category == 'RESRV') {
            ChangeDPDate($('#txtReservationDate').val());
        }
        else
            ChangeDPDate($('#txtDPStartDate').val());
    }
}



function ClearPaymentTermDetailsPerLine(tag) {
    if (tag == 1) {
        setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_PaymentTermCode, crnwTR.index(), '');
        setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_PaymentTermDesc, crnwTR.index(), '');
    }

    setGridData('nwGridPaymentTermDetails', 'input', SPR_PaymentTermDetails_ContractRate, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', 'input', SPR_PaymentTermDetails_TermAmount, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_MiscInstallment, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_ContractAmount, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_SalesDiscount, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', 'input', SPR_PaymentTermDetails_DPDiscountRate, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', 'input', SPR_PaymentTermDetails_DPDiscountAmount, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_NetContractPrice, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_NoOfPayments, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_MonthlyPayment, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_InterestRate, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_PenaltyRate, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_StartDate, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_EndDate, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_MiscellaneousDate, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_MiscellaneousType, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_AllocationType, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_MiscellaneousAmount, crnwTR.index(), '');
    setGridData('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc, crnwTR.index(), '');

}


$(document).on("keypress", "#txtCode", function (e) {
    var key = e.keyCode;
    if (key == 39 || key == 34 || key == 37) {
        return false;
    }
    else {
        return true;
    }
    nwParameter_Add("key", key);
});

$(document).on("keyup blur", "#txtCode", function (e) {
    var str = $("#txtCode").val();
    var res = str.replace(/'|\"|%/g, "");
    $("#txtCode").val(res);
});

$(document).on("keypress blur", "#txtCode", function (e) {
    if (e.which == 37 || e.which == 39 || e.which == 37)
        return false;
});

//function EnableDisableLoc(z, LocCode, LocDesc) {
//    if (z) {
//        $('#lugLocWithAccntblForms').addClass('adisabled');
//        //$('#idvallugAgent').focus();
//    }
//    else {
//        $('#lugLocWithAccntblForms').removeClass('adisabled');
//        //$('#idvallugLocWithAccntblForms').focus();
//    }

//    $('#idvallugLocWithAccntblForms').prop('disabled', z);

//    $('#idvallugLocWithAccntblForms').val(LocCode);
//    $('#descvallugLocWithAccntblForms').val(LocDesc);
//}


$(document).on("change", "#idvallugAgent", function (e) {
    if ($(this).val() == '' || $(this).val() == 'undefined') {
        $("#txtAgentType").val("");
    } else {
        var s = $('#idvallugAgent').val();
        nwParameter_Add('agent', s);
        func_ActionDriven(`actAgentType`, false);
    }
});

$(document).on('change', '#idvallugClient', function (e) {
    if ($(this).val() == '' || $(this).val() == 'undefined') {
        $("#txtCrossRefCode").val("");
        $("#txtVIPType").val("");
        $("#txtBirthdate").val("");
        $("#txtAge").val("");
        //$("#idvallugSourceofSale").val("");
        //$("#descvallugSourceofSale").val("");
        $('#idvallugAgent').val('');
        $('#descvallugAgent').val('');
        $('#txtAgentType').val('');
        $('#ddtxtSourceOfSale option:selected').text('');
        $('#lugAgent').val('');
        ResetGrid(`nwGridCoBuyer`);
    };
});

$(document).on('change', '#idvallugAccountLoc1', function (e) {
    if ($(this).val() == '' || $(this).val() == 'undefined') {
        $('#idvallugAccountOfficer1').val("");
        $('#descvallugAccountOfficer1').val("");
        //idvallugAccountLoc1
        //$('#idvallugAccountLoc1').val("");
        //$('#txtAccountOfficerDesc1').val("");
    };
});

$(document).on('change', '#idvallugAccountLoc2', function (e) {
    if ($(this).val() == '' || $(this).val() == 'undefined') {
        //$('#txtAccountOfficerCode2').val("");
        //$('#txtAccountOfficerDesc2').val("");
        $('#idvallugAccountOfficer2').val('');
        $('#descvallugAccountOfficer2').val('');
    };
});

function nwGrdi_Click(nwobj, nwobjrow, nwobjitem) {

}


function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {

    var nwobjID = nwobj.attr(`id`);
    var col = crnwTD.index();

    var Loc = $(`#idvallugLocWithAccntblForms`).val() || '';

    var InventoryGroup = $('#ddInventoryGroup option:selected').val() || '';
    var PaymentType = $('#idvallugPaymentType').val();
    var FinancingType = $('#idvallugFinancingType').val();
    //var NoOfUnits = $('#ddlNoOfUnits option:selected').text();
    var ReservationDate = $('#txtReservationDate').val();
    var Branch = $('#idvallugBranchProject').val() || '';
    var UnitClass = $('#ddInventoryClass option:selected').val() || '';
    var Category = $('.nwSelect:eq(' + crnwTR.index() + ') option:selected').val() || '';
    var Model = $('#ddModel option:selected').val() || '';
    var InventoryGroup = $('#ddInventoryGroup option:selected').val() || '';
    var Phase = $('#ddPhaseTower option:selected').val() || '';
    var Unittype = $('#ddInventoryType option:selected').val() || '';
    var ProductType = $('#ddProductType option:selected').val() || '';

    nwParameter_Add(`ItemGroupType`, itemgrouptype_global);
    nwParameter_Add(`ItemGroup`, itemgroup_global);

    if (nwobjID == `nwGridUnitDetails`) {

        //if (Loc == '' || Agent == '' || Branch == '' || PaymentType == '' || FinancingType == '' || Client == '' || CurAccountLoc == '' || TrfAccountLoc == '' || Unittype == '' || NoOfUnits == '' || ReservationDate == '' || Phase == '') {
        var errorResult = ''
        if (Loc == '')
            errorResult += 'Cannot be proceed. Location with Accountable Forms is required. \n';

        if (Branch == '')
            errorResult += 'Cannot be proceed. Project is required. \n';

        //if (InventoryGroup == '')
        //    errorResult += 'Cannot be proceed. Inventory Group is required. \n';

        if (ProductType == '')
            errorResult += 'Cannot be proceed. Product Type is required. \n';

        if (Phase == '')
            errorResult += 'Cannot be proceed. Phase/Tower is required. \n';

        if (Category == '')
            errorResult += 'Cannot be proceed. Category is required. \n';

        if (FinancingType == '')
            errorResult += 'Cannot be proceed. Financing Type is required. \n';

        if (errorResult != '') {
            MessageBox(errorResult, pagetitle);
            return true;
        }

        if (col == SPR_UnitDetails_UnitCode) {

            nwParameter_Add(`idvallugBranchProject`, Branch);
            nwParameter_Add('UnitClass', UnitClass);
            nwParameter_Add(`Category`, Category);
            nwParameter_Add(`ddModel`, Model);
            nwParameter_Add(`ddInventoryGroup`, InventoryGroup);
            nwParameter_Add(`ddPhaseTower`, Phase);
            nwParameter_Add(`ddtxtUnitType`, Unittype);
            nwParameter_Add(`ddProductType`, ProductType);

            lookUpCustomize(`lugUnitCode`, 1);
        }

        if (col == SPR_RefAddon_UnitCode) {
            lookUpCustomize(`lugUnitCode_refBased`, 2);
        }

    }
    else if (nwobjID == `nwGridPaymentTermDetails`) {

        //var errorResult = ''
        //if (Loc == '')
        //    errorResult += 'Cannot be proceed. Location with Accountable Forms is required. \n';
        //if (Branch == '')
        //    errorResult += 'Cannot be proceed. Branch is required. \n';
        //if (Phase == '')
        //    errorResult += 'Cannot be proceed. Phase/Tower is required. \n';
        //if (FinancingType == '')
        //    errorResult += 'Cannot be proceed. Financing Type is required. \n';
        //if (Unittype == '')
        //    errorResult += 'Cannot be proceed. Unit Type is required. \n';
        //if (UnitClass == '')
        //    errorResult += 'Cannot be proceed. Unit Class is required. \n';
        ////if (NoOfUnits == '')
        ////    errorResult += 'Cannot be proceed. No. of Units is required. \n';
        //if (Client == '')
        //    errorresult += 'Cannot be proceed. Client is required. \n';

        //if (errorResult != '') {
        //    MessageBox(errorResult, pagetitle);
        //    return true;
        //}

        if (col == SPR_PaymentTermDetails_PaymentTermCode) {
            temp_crnwTR = crnwTR.index();

            var IsLock = $(`#nwGridPaymentTermDetails-nwData tr:eq(${crnwTR.index()}) td:eq(${SPR_PaymentTermDetails_PaymentTermCode})`).enable();

            if (IsLock) {
                /*Payment Term Details Tab*/
                var PaymentCategory = $('#nwGridPaymentTermDetails-nwData tr:eq(' + crnwTR.index() + ') td:eq(1) option:selected').val();
                nwParameter_Add(`PaymentCategory`, PaymentCategory);

                cust_GetPara();

                lookUpCustomize(`lugPaymentTerm`, 1);
            }
        }
        //else if (col == SPR_PaymentTermDetails_PaymentTermCode) {

        //    var IsLock = $(`#nwGridPaymentTermDetails-nwData tr:eq(${crnwTR.index()}) td:eq(${SPR_PaymentTermDetails_PaymentTermCode})`).enable();
        //    var paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategoryCode, crnwTR.index());

        //    nwParameter_Add(`PaymentCategory`, paymentCat);
        //    nwParameter_Add(`ddtxtPhase`, paymentCat);
        //    nwParameter_Add(`unitTypeCode`, $('#ddtxtUnitType option:selected').val());
        //    nwParameter_Add(`unitclasscode`, $('#ddtxtUnitClass option:selected').val());
        //    nwParameter_Add(`nounits`, $('#ddlNoOfUnits option:selected').val());
        //    nwParameter_Add(`txtReservationDate`, $('#txtReservationDate').val());
        //    //nwParameter_Add(`itemGroupType`, getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_ItemGroupTypeCode, 0));

        //    nwParameter_Add(`SpotCashRate`, $('#ddSpotCashDiscount option:selected').val());
        //    var chkatneedsale = $('#chkatneedsale').prop('checked');
        //    nwParameter_Add(`AtNeedSale`, chkatneedsale);

        //    if (IsLock) {
        //        cust_GetPara();
        //        lookUpCustomize(`lugPaymentTerm`, 1);
        //    }

        //}
    }
    else if (nwobjID == `nwGridAddOn`) {
        if (col == SPR_Addon_AddonItemCode) {
            var IsLock = $(`#nwGridAddOn-nwData tr:eq(${crnwTR.index()}) td:eq(${SPR_Addon_AddonItemCode})`).enable();
            if (IsLock) {
                //nwParameter_Add(`ItemGroupType`, getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_ItemGroupTypeCode, 0));
                //nwParameter_Add(`ItemGroupType`, itemgrouptype_global);
                //nwParameter_Add(`ItemGroup`, itemgroup_global);
                lookUpCustomize(`lugAddonItem`, 1);
            }
        }
    }
    else if (nwobjID == `nwGridDiscount`) {
        if (col == SPR_Discount_DiscountCode) {
            var totalContractRate = 0.00;
            totalContractRate = (parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, 0).split(`,`).join(``))) || 0.00;

            //if (totalContractRate == 100)
            lookUpCustomize(`lugDiscount`, 1);
            //else
            //MessageBox("Please complete first the Payment Term Details.", pagetitle);
        }
    }
        //else if (nwobjID == `nwGridMiscDetailsCon`) {
        //    if (col == SPR_MiscellaneousDetails_MiscCode) {
        //        nwParameter_Add(`idvallugBranchProject`, idvallugBranchProject);
        //        lookUpCustomize(`lugMisc`, 1);
        //    }
        //    if (col == SPR_MiscellaneousDetails_MiscTypeDesc) {
        //        lookUpCustomize(`lugMiscType`, 1);
        //    }
        //}
    else if (nwobjID == `nwGridFreeBiesPromo`) {
        if (col == SPR_FreebiesPromoIncentives_ItemCode) {
            lookUpCustomize(`lugFreebiesItemcode`, 1);
        }
        if (col == SPR_FreebiesPromoIncentives_ReceiverTypeDesc) {
            lookUpCustomize(`lugReceiverType`, 1);
        }
        if (col == SPR_FreebiesPromoIncentives_ReceiverCode) {
            var receiverType = getGridDataPerLine(`nwGridFreeBiesPromo`, ``, SPR_FreebiesPromoIncentives_ReceiverTypeCode, crnwTR.index());
            nwParameter_Add(`ReceiverType`, receiverType);
            lookUpCustomize(`lugReceiver`, 1);
        }
    }
    else if (nwobjID == 'nwGridCoBuyer') {
        if (col == SPR_COBUYER_CODE) {
            lookUpCustomize('lugCoBuyer', 1);
        }
    }
    else if (nwobjID == 'nwGridStatementDetail') {
        if (col == SPR_STATEMENT_CODE) {
            lookUpCustomize('lugStatement', 1);
        }
    }
    else if (nwobjID == 'nwGridInsurance') {
        if (col == SPR_INSURANCE_CITIZENSHIP_DESC) {
            lookUpCustomize('lugCitizenship', 1);
        }
        else if (col == SPR_INSURANCE_RELATIONSHIP_TO_THE_APPLICANT_DESC) {
            lookUpCustomize('lugRelationshipToTheApplicant', 1);
        }
    }
    else if (nwobjID == 'nwGridApprover') {
        if (col == SPR_CODE) {
            nwParameter_Add("Level", nwTempTable_RowData_Get('nwGridApprover', crnwTR.index(), SPR_APPROVAL_LEVEL - 1));
            nwParameter_Add("idvallugLocWithAccntblForms", $('#idvallugLocWithAccntblForms').val());
            lookUpCustomize("lugApproverCode", 1);
        }
    }
    else if (nwobjID == 'nwGridPaymentDetails') {
        //if (col == spr_PaymentDetailsPaymentMethodDesc) {
        //    lookUpCustomize('lugPaymentDetailsPaymentMethod', 1);
        //}
        if (col == spr_PaymentDetailsModeOfPaymentCode) {
            //nwParameter_Add("paymentMethodCode", nwTempTable_RowData_Get('nwGridPaymentDetails', crnwTR.index(), spr_PaymentDetailsPaymentMethodCode));
            lookUpCustomize('lugPaymentDetailsModeOfPayment', 1);
        }
        else if (col == spr_PaymentDetailsCurrencyCode) {
            nwParameter_Add("locFormCode", $('#idvallugLocWithAccntblForms').val());
            lookUpCustomize('lugCurrency', 1);
        }
        else if (col == spr_PaymentDetailsPaymentCenterCode) {
            lookUpCustomize('lugPaymentCenter', 1);
        }
        else if (col == spr_PaymentDetailsCardTypeDesc) {
            lookUpCustomize('lugCardType', 1);
        }
        else if (col == spr_PaymentDetailsBankCode) {
            lookUpCustomize('lugbank', 1);
        }
    }
    else if (nwobjID == 'nwGridPaymentDetailsAttachment') {
        if (col == spr_PaymentDetailsAttachAccountNo) {
            if ($isBank == 1)
                lookUpCustomize('lugAccountNo', 1);
        }
    }
}


function func_LookUpInitialize(dimP) {
    var isContinue = true;

    if (dimP == "lugUnitCode") {

        nwParameter_Add(`ItemGroupType`, itemgrouptype_global);
        nwParameter_Add(`ItemGroup`, itemgroup_global);
        nwParameter_Add('Agent', $(`#idvallugAgent`).val());

        var Branch = $('#idvallugBranchProject').val() || '';
        var UnitClass = $('#ddInventoryClass option:selected').val() || '';
        var Category = $('.nwSelect:eq(' + crnwTR.index() + ') option:selected').val();
        var Model = $('#ddModel option:selected').val() || '';
        var InventoryGroup = $('#ddInventoryGroup option:selected').val() || '';
        var Phase = $('#ddPhaseTower option:selected').val() || '';
        var Unittype = $('#ddInventoryType option:selected').val() || '';
        var ProductType = $('#ddProductType option:selected').val() || '';

        nwParameter_Add(`idvallugBranchProject`, Branch);
        nwParameter_Add(`ddInventoryClass`, UnitClass);
        nwParameter_Add(`Category`, Category);
        nwParameter_Add(`ddModel`, Model);
        nwParameter_Add(`ddInventoryGroup`, InventoryGroup);
        nwParameter_Add(`ddPhaseTower`, Phase);
        nwParameter_Add(`ddtxtUnitType`, Unittype);
        nwParameter_Add(`ddProductType`, ProductType);

    }
    else if (dimP == "lugAgent") {
        var chkIsAllAgent = $('#chkAgent').prop('checked');
        nwParameter_Add('IsAllAgent', chkIsAllAgent);
    }
    else if (dimP == 'lugReceiver') {
        var receiverType = getGridDataPerLine(`nwGridFreeBiesPromo`, ``, SPR_FreebiesPromoIncentives_ReceiverTypeCode, crnwTR.index());
        nwParameter_Add(`ReceiverType`, receiverType);
    }
    else if (dimP == "lugPaymentTerm") {
        /*Payment Term Details Tab*/
        var PaymentCategory = $('#nwGridPaymentTermDetails-nwData tr:eq(' + crnwTR.index() + ') td:eq(1) option:selected').val();
        nwParameter_Add(`PaymentCategory`, PaymentCategory);

        cust_GetPara();
    }

    else if (dimP == 'lugPaymentTermGrouping') {
        nwParameter_Add(`idvallugFinancingType`, $('#idvallugFinancingType').val());
        nwParameter_Add(`idvallugBranchProject`, $('#idvallugBranchProject').val());
        nwParameter_Add(`txtReservationDate`, $('#txtReservationDate').val());
        var reservAmount = 0.00;
        $('#nwGridPaymentTermDetailsData tr:gt(1)').each(function (i, x) {
            if ($(this).find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val() == 'RESRV') {
                reservAmount = parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_NetContractPrice + ')').text().split(',').join('')) || 0.00;
            }
        });
        nwParameter_Add(`reservAmount`, reservAmount);
        nwParameter_Add(`txtMisc`, $('#txtMisc').val());
    }
    else if (dimP == 'lugPaymentDetailsModeOfPayment') {
        nwParameter_Add("paymentMethodCode", nwTempTable_RowData_Get('nwGridPaymentDetails', crnwTR.index(), spr_PaymentDetailsPaymentMethodCode));
    }
    else if (dimP == 'lugCurrency') {
        nwParameter_Add("locFormCode", $('#idvallugLocWithAccntblForms').val());
    }


    if (dimP != "lugClient") {
        $(".searchDiv #btnCreateCustomer").css("display", "none")
    }
    else {
        //$(".lugClient .searchDiv").append("<button id='btnCreateCustomer' style='width:123px; height:20px; position: absolute; top:35px; left:240px; border-radius: 0px;'>Create Customer</button>");
        $('#btnCreateCustomer').remove();
        $('.lugClient div:eq(1)').append("<button id='btnCreateCustomer' style='margin-top: 5px;margin-bottom: 5px;margin-left: 80px;width: 259px;'>Create Customer</button>");
    }

    return isContinue;
}

$(document).on("click", "#btnCreateCustomer", function (e) {
    PaneClose();
    PopWindow(1, getParameterByName("nwu"));
});

function PopWindow(id, recuser) {
    var title = "";
    var fullength = "";
    switch (id) {
        case 1:
            title = "Create Customer";
            fullength = "../../../SB/DataSetup/SBCustomerMasterFile/SBCustomerMasterFile.aspx";
            break;
    }

    nwPopupForm_Create("nwPopWindowCreateCustomer", true, fullength);
    $('#nwPopWindow .BoxTitle').text(title);
    $("#nwPopWindow").css({ "min-width": "98%" });
    nwPopupForm_ShowModal("nwPopWindowCreateCustomer");
    $('.dimbgNWnwPopWindow').removeClass('openn');
    nwLoading_End('xSample');
}

var serverDate = new Date();
function getAge(dateString) {
    var today = serverDate;
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    if (age + `` == `NaN` || age == NaN) {
        age = ``;
    }
    return age;
}

$(document).on(`change`, `#chkLetterofIntent`, function (e) {
    if ($(this).prop(`checked`)) {
        $(`#txtLOIDate`).prop(`disabled`, false);
        //$('.loidate').append('<span class="nwRequiredField">*</span>');
    }
    else {
        $(`#txtLOIDate`).prop(`disabled`, true);
        $(`#txtLOIDate`).val(``);
        //$('.loidate span').remove();
    }
});

//$(document).on(`change`, `#ddtxtUnitType`, function (e) {
//nwParameter_Add(`ddtxtUnitType`, $(`#ddtxtUnitType`).val());
//func_ActionDriven(`actPopulate`, false);
//});

//$(document).on(`change`, `#ddtxtUnitClass`, function (e) {
//    nwParameter_Add(`ddtxtUnitType`, $(`#ddtxtUnitClass`).val());
//    func_ActionDriven('actPopulateUnitClass', false);
//});
$(document).on(`change blur`, `#txtReservationDate`, function (e) {
    nwLoading_Start("actPopulateCategory", crLoadingHTML);
    nwParameter_Add('ddDiscountType', $('#ddDiscountType option:selected').val());
    nwParameter_Add(`idvallugFinancingType`, $(`#idvallugFinancingType`).val());
    nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());
    nwParameter_Add(`UnitCode`, $('#new_txtUniCode').val());
    nwParameter_Add(`ddPhaseTower`, $('#ddPhaseTower option:selected').val());
    nwParameter_Add(`txtReservationDate`, $('#txtReservationDate').val());
    nwParameter_Add(`tag`, 1);
    cust_GetPara();
    ToggleEnableDisable(0);
    func_ActionDriven(`actPopulateCategory`, false);
});

//$(document).on(`change blur`, `#ddtxtUnitType,#ddtxtUnitClass,#ddlNoOfUnits,#txtReservationDate,#idvallugBranchProject,#ddtxtPhase,#idvallugFinancingType,#chkatneedsale`, function (e) {

//ClearHeader();
//ClearAllGrid();
//LoadSpotCash();
//GetStandardPrice();


//var id = $(this).attr('id');
//if (id == 'ddtxtPhase') {
//    nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());
//    nwParameter_Add(`ddtxtPhase`, $(`#ddtxtPhase`).val());
//    //$('#ddtxtUnitType').html('');
//    //$('#ddtxtUnitClass').html('');
//    //$('#ddlNoOfUnits').html('');
//    //$('#ddSpotCashDiscount').html('');

//    func_ActionDriven('actUnitType', false);
//}
//else if (id == 'ddtxtUnitType') {
//    //WebApp.nwobjectText("idvallugBranchProject"),WebApp.nwobjectText("ddtxtPhase"), WebApp.nwobjectText("ddtxtUnitType"

//    nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());
//    nwParameter_Add(`ddtxtPhase`, $(`#ddtxtPhase option:selected`).val());
//    nwParameter_Add(`ddtxtUnitType`, $(`#ddtxtUnitType option:selected`).val());
//    //$('#ddtxtUnitClass').html('');
//    //$('#ddlNoOfUnits').html('');
//    //$('#ddSpotCashDiscount').html('');
//    func_ActionDriven('actUnitClass', false);
//}
//else if (id == 'ddtxtUnitClass') {
//    nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());
//    nwParameter_Add(`ddtxtPhase`, $(`#ddtxtPhase option:selected`).val());
//    nwParameter_Add(`ddtxtUnitType`, $(`#ddtxtUnitType option:selected`).val());
//    nwParameter_Add(`ddtxtUnitClass`, $(`#ddtxtUnitClass option:selected`).val());
//    //$('#ddlNoOfUnits').html('');
//    //$('#ddSpotCashDiscount').html('');
//    func_ActionDriven('actNoOfUnits', false);
//}
//else if (id == 'ddlNoOfUnits') {
//    LoadSpotCash();
//}
//else if (id == 'idvallugFinancingType') {
//    ToggleEnableDisable(0);
//}
//});

function ClearHeader() {
    $('#txtStandardLotUnitPrice').val('');
    $('#txtVAT').val('');
    $('#txtTotalLotUP').val('');
    $('#txtSalesDiscountRate').val('');
    $('#txtSalesDiscount').val('');
    $('#txtNetLotUnitPrice').val('');
    $('#txtMisc').val('');
    $('#txtTCP').val('');
    $('#txtDPDiscount').val('');
    $('#txtNTCP').val('');
    $('#txtTotalUnitPrice').val('');
    $('#txtMCF').val('');
    $('#txtReservationAmt').val('');
    $('#txtInterestRate').val('');
    $('#txtFixedInterest').val('');
    $('#txtSpotCashDiscount').val('');
    $('#txtCashAmount').val('');
    $('#txtMonthlyDP').val('');
    $('#txtMonthlyAmortization').val('');
    $('#ddSpotCashDiscount').html('');

}



//$(document).on('change blur', '#ddtxtPhase, #ddtxtUnitType,#ddtxtUnitClass,#ddlNoOfUnits', function (e) {
//    var id= $(this).attr('id');
//    if (id == 'ddtxtPhase')
//    {
//        nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());
//        nwParameter_Add(`ddtxtPhase`, $(`#ddtxtPhase`).val());
//        $('#ddtxtUnitType').html('');
//        $('#ddtxtUnitClass').html('');
//        $('#ddlNoOfUnits').html('');
//        $('#ddSpotCashDiscount').html('');

//        func_ActionDriven('actUnitType', false);
//    }
//    else if (id == 'ddtxtUnitType') {
//        //WebApp.nwobjectText("idvallugBranchProject"),WebApp.nwobjectText("ddtxtPhase"), WebApp.nwobjectText("ddtxtUnitType"

//        nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());
//        nwParameter_Add(`ddtxtPhase`, $(`#ddtxtPhase option:selected`).val());
//        nwParameter_Add(`ddtxtUnitType`, $(`#ddtxtUnitType option:selected`).val());
//        $('#ddtxtUnitClass').html('');
//        $('#ddlNoOfUnits').html('');
//        $('#ddSpotCashDiscount').html('');
//        func_ActionDriven('actUnitClass', false);
//    }
//    else if (id == 'ddtxtUnitClass')
//    {
//        nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());
//        nwParameter_Add(`ddtxtPhase`, $(`#ddtxtPhase option:selected`).val());
//        nwParameter_Add(`ddtxtUnitType`, $(`#ddtxtUnitType option:selected`).val());
//        nwParameter_Add(`ddtxtUnitClass`, $(`#ddtxtUnitClass option:selected`).val());
//        $('#ddlNoOfUnits').html('');
//        $('#ddSpotCashDiscount').html('');
//        func_ActionDriven('actNoOfUnits', false);
//    }
//    else if (id == 'ddlNoOfUnits') {
//        LoadSpotCash();
//    }
//});

$(document).on(`change`, `#ddDiscountType`, function (e) {
    //$('#nwGridDiscount tr:eq(1) td:eq(' + SPR_Discount_DiscountCode + ')').text('');
    ResetGrid('nwGridDiscount');
    //DiscountComputation();

    nwParameter_Add(`ddDiscountType`, $(`#ddDiscountType`).val());
    func_ActionDriven('actPopulateDiscountType', false);
});

function PopulateDiscountType() {
    var columDiscount = getGridElement(`nwGridDiscount`, ``, SPR_Discount_DiscountCode);

    var code = $('#ddDiscountType').val();
    var desc = $('#ddDiscountType option:selected').text();

    $.each(columDiscount, function (idx, obj) {
        setGridData(`nwGridDiscount`, ``, SPR_Discount_DiscountTypeCode, idx, code);
        setGridData(`nwGridDiscount`, ``, SPR_Discount_DiscountType, idx, desc);
    })
}

function PopulateDataUnitClass(z) {
    var myObj = JSON.stringify(z);
    var objtext = JSON.parse(myObj);
    //var columUnitClassCode = getGridElement(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitClassCode);
    var code = $('#ddtxtUnitClass').val();
    var desc = $('#ddtxtUnitClass option:selected').text();

    var amt = ``, rate = ``

    if (objtext.length > 0) {
        amt = objtext[0].PremiumAmount.toString();
        rate = objtext[0].PremiumRate.toString();
    }


    //$.each(columUnitClassCode, function (idx, obj) {
    //    setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitClassCode, idx, code);
    //    setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitClassPremium, idx, desc);
    //    setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitClassPremiumRate, idx, rate);
    //    setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitClassPremiumAmount, idx, amt);
    //});

    ComputeUnitDetails();
    GetTotalStandardLotUnitPrice();
}

function PopulateDataUnitDetails(z) {
    var myObj = JSON.stringify(z);
    var objtext = JSON.parse(myObj);

    //var columnUnitTypePremiumAmt = getGridElement(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitTypePremiumAmt);

    //if (objtext.length > 0) {
    //    $.each(columnUnitTypePremiumAmt, function (idx, obj) {
    //        //setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitTypePremiumRate, idx, objtext[0].PremiumRate.toString());
    //        setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitTypePremiumAmt, idx, objtext[0].PremiumAmt.toString());
    //    });
    //}
    //else {
    //    //setGridDataNChild(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitTypePremiumRate, ``);
    //    setGridDataNChild(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitTypePremiumAmt, ``);
    //}
    //ComputeUnitDetails();
    //GetTotalStandardLotUnitPrice();
}


$(document).on(`change blur`, `#txtReservationDate`, function () {

    if ($(`#txtReservationDate`).val().length > 0) {


        SetBalanceDateReservation();
        setExpiration();

    }
})


function setExpiration() {
    if ($('#txtReservationDate').val().length > 0) {
        nwParameter_Add(`ReservationDate`, $(`#txtReservationDate`).val());
        nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());
        nwParameter_Add(`idvallugLocWithAccntblForms`, $(`#idvallugLocWithAccntblForms`).val());
        nwParameter_Add(`custClassCode`, custClassCode);
        func_ActionDriven("actExpirationDate", false);
    }
    else
        $('#txtExpirationDate').val('');
}




function ComputeUnitDetails() {
    //******************* BEGIN HERE (Unit Details) **********************************
    var columnUnitCode = getGridElement(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitCode);
    var vatrate = 0.00;
    var spStdGrossUnitPriceVatIn = 0.00;
    var spStdGrossUnitPriceVatEx = 0.00;
    var unitTypePremiumAmount = 0.00;
    var unitClassPremium = 0.00;
    var stdGrossUnitPriceVatIn = 0.00;
    var stdGrossUnitPriceVatEx = 0.00;
    var vatAmt = 0.00;
    var vat = 0.00;

    //Total
    var totalStdGrossUnitPriceVatEx = 0.00;
    var totalStdGrossUnitPriceVatIn = 0.00;
    var totalVat = 0.00;

    //$.each(columnUnitCode, function (idx, obj) {

    //spStdGrossUnitPriceVatIn = parseFloat(getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_StandardGrossUnitPriceVatIn_SP, idx).split(',').join('')) || 0.00;
    //spStdGrossUnitPriceVatEx = parseFloat(getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_StandardUnitPriceVatEx, idx).split(',').join('')) || 0.00;
    //unitClassPremiumAmount = parseFloat(getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitClassPremiumAmount, idx).split(',').join('')) || 0.00;
    //unitTypePremiumAmount = parseFloat(getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitTypePremiumAmt, idx).split(',').join('')) || 0.00;
    //vatrate = parseFloat(getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_VatRate, idx).split(',').join('')) || 0.00;
    //vatAmt = parseFloat(getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_VatAmount, idx).split(',').join('')) || 0.00;
    //stdGrossUnitPriceVatIn = (((unitTypePremiumAmount + unitClassPremiumAmount) * (1 + vatrate)) + spStdGrossUnitPriceVatIn) || 0.00;
    //stdGrossUnitPriceVatEx = ((unitTypePremiumAmount + unitClassPremiumAmount) + spStdGrossUnitPriceVatEx) || 0.00;
    //vat = vatAmt + ((unitClassPremiumAmount + unitTypePremiumAmount) * vatrate);

    //setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_StandardGrossUnitPriceVatIn, idx, commaSeparateNumber(stdGrossUnitPriceVatIn.toFixed(2)));
    //setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_StandardGrossUnitPriceVatEx, idx, commaSeparateNumber(stdGrossUnitPriceVatEx.toFixed(2)));
    //setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_VAT, idx, commaSeparateNumber(vat.toFixed(2)));

    //totalStdGrossUnitPriceVatIn += stdGrossUnitPriceVatIn;
    //totalStdGrossUnitPriceVatEx += stdGrossUnitPriceVatEx;
    //totalVat += vat;
    //});

    //$(`#txtTotalUnitPrice`).val(commaSeparateNumber(totalStdGrossUnitPriceVatIn.toFixed(2)));

    //******************************** END HERE (Unit Details) ***********************************


    //************************** BEGIN HERE (Header Total) *******************************
    var totalStdGrossLotUnitPrice = 0.00;
    var totalAddonsVatIn = 0.00;
    var totalLotUnitPrice = 0.00;
    var totalSalesDiscount = 0.00;
    var totalNetLotUnitPrice = 0.00;
    var totalMiscellaneous = 0.00;
    var totalTCP = 0.00;
    var totalDPDisc = 0.00;
    var totalNTCP = 0.00;

    //$(`#txtStandardLotUnitPrice`).val(commaSeparateNumber(totalStdGrossUnitPriceVatEx.toFixed(2)));
    //$(`#txtVAT`).val(commaSeparateNumber(totalVat.toFixed(2)));

    totalStdGrossLotUnitPrice = (totalStdGrossUnitPriceVatIn + totalStdGrossUnitPriceVatEx);
    //$(`#txtTotalLotUP`).val(commaSeparateNumber(totalStdGrossLotUnitPrice.toFixed(2)));

    //missing Addons Put here later
    //$(`#txtAddonsVATIN`).val(commaSeparateNumber(totalAddonsVatIn.toFixed(2)));

    //missing Sales Discount here
    $(`#txtSalesDiscount`).val(commaSeparateNumber(totalSalesDiscount.toFixed(2)));

    //missing Miscellaneous 
    $(`#txtMisc`).val(commaSeparateNumber(totalMiscellaneous.toFixed(2)));

    //missing DP Discount
    $(`#txtDPDiscount`).val(commaSeparateNumber(totalDPDisc.toFixed(2)));

    totalLotUnitPrice = (totalStdGrossLotUnitPrice)// + totalAddonsVatIn);
    $(`#txtTotalLotUnitPrice`).val(commaSeparateNumber(totalLotUnitPrice.toFixed(2)));

    totalNetLotUnitPrice = (totalLotUnitPrice + totalSalesDiscount);
    $(`#txtNetLotUnitPrice`).val(commaSeparateNumber(totalNetLotUnitPrice.toFixed(2)));

    totalTCP = (totalMiscellaneous + totalNetLotUnitPrice);
    $(`#txtTCP`).val(commaSeparateNumber(totalTCP.toFixed(2)));
    $('#txtLoanAmount').val($('#txtTCP').val());//auto populate
    func_RadioNel();

    totalNTCP = (totalTCP - totalDPDisc);
    $(`#txtNTCP`).val(commaSeparateNumber(totalNTCP.toFixed(2)));
    //*************************** END HRE (Header Total) *******************************************

}

function ComputeTotalLotPrice() {
    var StandardUnitPrice = $('#txtTotalUnitPrice').val();

}


function DisablePaymentTerm_ContractRate(idx, z) {
    if (z) {
        $(`#nwGridPaymentTermDetails-nwData tr:eq(${idx})`).find(`td:eq(${SPR_PaymentTermDetails_ContractRate}) input`).enable(true);
        $(`#nwGridPaymentTermDetails-nwData tr:eq(${idx})`).find(`td:eq(${SPR_PaymentTermDetails_ContractRate})`).css('background-color', 'white');
    }
    else {
        $(`#nwGridPaymentTermDetails-nwData tr:eq(${idx})`).find(`td:eq(${SPR_PaymentTermDetails_ContractRate}) input`).enable(false);
        $(`#nwGridPaymentTermDetails-nwData tr:eq(${idx})`).find(`td:eq(${SPR_PaymentTermDetails_ContractRate})`).css('background-color', 'gainsboro');
    }
}

function DisablePaymentTerm_TotalLotPrice(idx, z) {
    if (z) {
        $(`#nwGridPaymentTermDetails-nwData tr:eq(${idx})`).find(`td:eq(${SPR_PaymentTermDetails_TotalLotPrice}) input`).enable(true);
        $(`#nwGridPaymentTermDetails-nwData tr:eq(${idx})`).find(`td:eq(${SPR_PaymentTermDetails_TotalLotPrice})`).css('background-color', 'white');
    }
    else {
        $(`#nwGridPaymentTermDetails-nwData tr:eq(${idx})`).find(`td:eq(${SPR_PaymentTermDetails_TotalLotPrice}) input`).enable(false);
        $(`#nwGridPaymentTermDetails-nwData tr:eq(${idx})`).find(`td:eq(${SPR_PaymentTermDetails_TotalLotPrice})`).css('background-color', 'gainsboro');
    }
}

function DisableReservation(z) {

    $(`#nwGridPaymentTermDetails-nwData tr:eq(${z})`).find(`td:eq(${SPR_PaymentTermDetails_PaymentCategoryCode})`).enable(false);
    $(`#nwGridPaymentTermDetails-nwData tr:eq(${z})`).find(`td:eq(${SPR_PaymentTermDetails_PaymentCategoryCode})`).css('background-color', 'gainsboro');

    $(`#nwGridPaymentTermDetails-nwData tr:eq(${z}) td:eq(${SPR_PaymentTermDetails_DPDiscount}) input`).remove();
    $(`#nwGridPaymentTermDetails-nwData tr:eq(${z})`).find(`td:eq(${SPR_PaymentTermDetails_DPDiscount}) input`).enable(false);
    $(`#nwGridPaymentTermDetails-nwData tr:eq(${z})`).find(`td:eq(${SPR_PaymentTermDetails_DPDiscount})`).css('background-color', 'gainsboro');

    $(`#nwGridPaymentTermDetails-nwData tr:eq(${z})`).find(`td:eq(${SPR_PaymentTermDetails_DPDiscountRate}) input`).enable(false);
    $(`#nwGridPaymentTermDetails-nwData tr:eq(${z})`).find(`td:eq(${SPR_PaymentTermDetails_DPDiscountRate})`).css('background-color', 'gainsboro');

    $(`#nwGridPaymentTermDetails-nwData tr:eq(${z})`).find(`td:eq(${SPR_PaymentTermDetails_DPDiscountAmount}) input`).enable(false);
    $(`#nwGridPaymentTermDetails-nwData tr:eq(${z})`).find(`td:eq(${SPR_PaymentTermDetails_DPDiscountAmount})`).css('background-color', 'gainsboro');
}

$(document).on(`click`, `button.nwgrid_Delete`, function () {
    var id = $(this).parents(".nwGrid").attr('id');

    if (id == `nwGridUnitDetails`) {

        var columnUnitCode = getGridElement(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitCode);
        var ctr = 0;
        $.each(columnUnitCode, function (idx, obj) {
            var unitcode = '';
            unitcode = getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitCode, idx);
            if (unitcode.length > 0)
                ctr++;
        });

        //if no data
        if (ctr <= 0) {
            var id = `nwGridPaymentTermDetails`;
            nwGrid_ClearRange(id, 1, 1, $(`#${id} th`).size() - 1, $(`#${id} .tblGridBody tr`).size());
            nwGrid_RemoveRow(id, 1, $(`#${id} .tblGridBody tr`).size());
            nwGrid_AddRow(id, 1);
        }

        //InsertionPaymentDetailsMinReservationAmount();
        ComputeUnitDetails();
        GetTotalStandardLotUnitPrice();

        var idnwData = $(this).parents(".nwGrid").find('.tblGridBody').attr('id');
        GetTotalUnitCapacity($(`#${idnwData}`));

    }
    else if (id == `nwGridPaymentTermDetails`) {
        //SumContractRate();
        //SumTotalNoOfPayments();
        //SumAllHeaderinPaymentTermDetails();
        //SetBalanceDateReservation();
        SumAllHeader();
        if ($('#idvallugFinancingType').val() == 'DEF') {
            ChangeDPDate($('#txtReservationDate').val());
        }
        else
            ChangeDPDate($('#txtDPStartDate').val());

        //SumNoOfPayments();
        //SumDPDiscountAmt();
    }
    else if (id == 'nwGridCoBuyer') {
        CoBorrowerExists();
    }
    else if (id == 'nwGridDiscount') {
        $fn().resetting();
        //DiscountComputation(0);
        DiscountProperties();

    }
    else if (id == `nwGridPaymentDetails`) {
        $portal().customFunc.paymentDetailsCon();
    }
    else if (id == `nwGridPaymentDetailsAttachment`) {
        getID(0);
        //defaultedBankDepository(0);
    }
    //else if (id == 'nwGridDiscount') {
    //    $('#txtSalesDiscountRate').val('0.00 %');
    //}
});


function CoBorrowerExists() {
    var hasData = CheckTableIfContainsData('', 'nwGridCoBuyer', SPR_COBUYER_CODE);

    $('#txtCoBorrower').val(GetConcatCoBorrower());
    //if (!hasData) {
    //    ClearInsuranceTab();
    //    EnableDisabledInsuranceTab(false);
    //}
    //else
    EnableDisabledInsuranceTab(false);
}


function SumAllHeaderinPaymentTermDetails() {
    SumContractRate();
    //SumLotPrice();
    //SumVat();
    SumTotalLotPrice();
    SumTotalSalesDiscount();
    //SumNetLotUnitPrice();
    SumMisc();
    //SumTCP();
    SumDPDiscAmt();
    SumNTCP();
    SumNoOfPayments();
    SumMonthlyPayments();

    ComputationHeader();
}

//function SumLotPrice() {
//    var LotPrice = getGridElement(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_LotPrice);
//    var totalLotPrice = 0.00;

//    $.each(LotPrice, function (idx, obj) {
//        if (idx != 0)
//            totalLotPrice += parseFloat($(this).text().split(`,`).join(``)) || 0.00;
//    });

//    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_LotPrice, 0, commaSeparateNumber(totalLotPrice.toFixed(2)));
//}

//function SumVat() {
//    var vat = getGridElement(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_VAT);
//    var totalVat = 0.00;

//    $.each(vat, function (idx, obj) {
//        if (idx != 0)
//            totalVat += parseFloat($(this).text().split(`,`).join(``)) || 0.00;
//    });

//    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_VAT, 0, commaSeparateNumber(totalVat.toFixed(2)));
//}

function SumTotalLotPrice() {
    //var totalLotPrice = getGridElement(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TotalLotPrice);
    //var totalLotPriceResult = 0.00;

    //$.each(totalLotPrice, function (idx, obj) {
    //    //if (idx != 0)
    //    totalLotPriceResult += parseFloat($(this).val().split(`,`).join(``)) || 0.00;
    //});

    //setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TotalLotPrice, 0, commaSeparateNumber(totalLotPriceResult.toFixed(2)));
}

function SumTotalSalesDiscount() {
    var salesDisc = getGridElement(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount);
    var totalSalesDisc = 0.00;

    $.each(salesDisc, function (idx, obj) {
        if (idx != 0)
            totalSalesDisc += parseFloat($(this).text().split(`,`).join(``)) || 0.00;
    });

    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, 0, commaSeparateNumber(totalSalesDisc.toFixed(2)));
}

function SumNetLotUnitPrice() {
    var netlotUnitPrice = getGridElement(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetLotUnitPrice);
    var totalnetlotUnitPrice = 0.00;

    $.each(netlotUnitPrice, function (idx, obj) {
        if (idx != 0)
            totalnetlotUnitPrice += parseFloat($(this).text().split(`,`).join(``)) || 0.00;
    });

    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetLotUnitPrice, 0, commaSeparateNumber(totalnetlotUnitPrice.toFixed(2)));
}

function SumMisc() {
    var misc = getGridElement(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment);
    var totalMisc = 0.00;

    $.each(misc, function (idx, obj) {
        if (idx != 0)
            totalMisc += parseFloat($(this).text().split(`,`).join(``)) || 0.00;
    });

    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, 0, commaSeparateNumber(totalMisc.toFixed(2)));
}

//function SumTCP() {
//    var tcp = getGridElement(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TCP);
//    var totalTcp = 0.00;

//    $.each(tcp, function (idx, obj) {
//        if (idx != 0)
//            totalTcp += parseFloat($(this).text().split(`,`).join(``)) || 0.00;
//    });

//    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TCP, 0, commaSeparateNumber(totalTcp.toFixed(2)));
//}

function SumDPDiscAmt() {
    var discAmt = getGridElement(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount);
    var totalDiscAmt = 0.00;

    $.each(discAmt, function (idx, obj) {
        totalDiscAmt += parseFloat($(this).val().split(`,`).join(``)) || 0.00;
    });

    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscountAmount, 0, commaSeparateNumber(totalDiscAmt.toFixed(2)));
}

function SumNTCP() {
    var ntcp = getGridElement(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NTCP);
    var totalNTCP = 0.00;

    $.each(ntcp, function (idx, obj) {
        if (idx != 0)
            totalNTCP += parseFloat($(this).text().split(`,`).join(``)) || 0.00;
    });

    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NTCP, 0, commaSeparateNumber(totalNTCP.toFixed(2)));
}



function func_nwGrid_InsertValidation() {
    //var id = $('#nwGridStatementDetailCon').attr('id');
    //console.log(crnwTable);
    // var tabActive = $('.ui-tabs-active').attr(`id`).replace('But', '');
    // var id = $(`#${tabActive} .nwGrid`).attr(`id`);

    var id = crnwTable.attr('id').replace('-nwData', '');
    if (id == `nwGridPaymentTermDetails`) {
        var IsLock = $(`#nwGridPaymentTermDetails-nwData tr:eq(${crnwTR.index()}) td:eq(${SPR_PaymentTermDetails_PaymentTermCode})`).enable();
        if (!IsLock)
            return false;
        else {
            nwGrid_AddRowCustom(id, 1, crnwTR.index());
            PaymentTermProperties();
            ToggleLumpSum(1);
        }
    }
        //else if (id == `nwGridAddOn`) {
        //    var IsLock = $(`#nwGridAddOn-nwData tr:eq(${crnwTR.index()}) td:eq(${SPR_Addon_AddonItemCode})`).enable();
        //    if (!IsLock)
        //        return false;
        //    else
        //        nwGrid_AddRowCustom(id, 1, crnwTR.index());
        //}
    else if (id == 'nwGridStatementDetail') {
        nwGrid_AddRowCustom(id, 1, crnwTR.index());
        func_AppendRadioButton();
    }
    else if (id == 'nwGridMiscellaneousFee') {
        nwGrid_AddRowCustom(id, 1, crnwTR.index());
        MiscProperties();
    }
    else if (id == 'nwGridPaymentDetails') {
        nwGrid_AddRowCustom(id, 1, crnwTR.index());
        $portal().customFunc.paymentDetailsCon();
    }
    else if (id == 'nwGridPaymentDetailsAttachment') {
        nwGrid_AddRowCustom(id, 1, crnwTR.index());
        //defaultedBankDepository(crnwTR.index() + 1);
        getID(crnwTR.index() + 1);
    }
    else {
        nwGrid_AddRowCustom(id, 1, crnwTR.index());
    }
    nwGrid_TableAdjust(id);
    return false;
}

function nwGrid_AddRowCustom(nwgridID, count, temptdindex) {

    try {
        nwgridID = nwgridID.replace(" ", "");
    }
    catch (err) {
    }
    crnwTable = $("#" + nwgridID + " .nwGrid").find('.tblGridBody');
    if (crnwTable == null || crnwTable.html() == undefined) {
        crnwTable = $("#" + nwgridID + ".nwGrid").find('.tblGridBody');

        if (crnwTable == null) return false;
    }

    var tempTable = $("#" + nwgridID + " .nwGrid").find('#nwGridRows');

    if (tempTable == null || tempTable.html() == undefined) {
        tempTable = $("#" + nwgridID + ".nwGrid").find('#nwGridRows');
        if (tempTable == null) return false;
    }

    var isContinue = true;
    try {
        isContinue = func_nwGrid_AddNewValidation();
    } catch (err) {
    }
    if (isContinue) {
        var xcounter = 1;
        if (count != undefined) {
            xcounter = count;
        }
        try {
            for (var i = 0; i < xcounter; i++) {
                var varTRa = tempTable.find('tr:eq(0)').clone();
                nwGrid_ID += 1;

                varTRa.attr("aagRow" + nwGrid_ID);

                //var temptdindex = crnwTR.find(crnwTD).index();
                var selectedTD = varTRa.find("td:eq(" + temptdindex + ")");
                crnwTR = crnwTable.find("tr:eq(" + temptdindex + ")");
                varTRa.insertAfter(crnwTR);
            }
        } catch (err) {
        }

        func_ListNumberFormat(crnwTable);
        try {
            func_nwGrid_AddNewDone();
        } catch (err) {
        }
    }
    return false;
}


function CheckTableIfContainsData(type, gridID, column) {

    var elem = getGridElement(gridID, type, column);
    var data = '';
    var res = false;

    $.each(elem, function (idx, obj) {
        if (type == 'input')
            data += $(this).val();
        else
            data += $(this).text();
    });

    if (data.length > 0)
        res = true;
    return res;
}
var isPaymentCategoryNotChange = false;
var isPaymentDetailsDelete = false;
var IsYesPaymentDetails = false;
var IsYesUponPaymentTerm = false;
var IsDelete = true;

function func_nwGrid_DeleteValidation() {

    var tabActive = $('.ui-tabs-active').attr(`id`).replace('But', '');
    var id = '';

    if ($('#dimbgNWnwMisc').length == 1)//micro
        id == 'nwGridMiscellaneousFee';
    else
        id = $(`#${tabActive} .nwGrid`).attr(`id`);

    var count = $(`#${id}-nwData tr`).length - 1;

    if (id == `nwGridPaymentTermDetails`) {

        var IsLock = $(`#nwGridPaymentTermDetails-nwData tr:eq(${crnwTR.index()}) td:eq(${SPR_PaymentTermDetails_PaymentCategory})`).enable();
        var paymentCat = '';
        paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategory, crnwTR.index());

        if (!IsLock && paymentCat != 'RESRV')
            return false;
        else {
            var countEnable = 0;
            var IsEnable = false;
            for (i = 0; i <= count; i++) {
                IsEnable = $(`#nwGridPaymentTermDetails-nwData tr:eq(${i}) td:eq(${SPR_PaymentTermDetails_PaymentCategory})`).enable();
                paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, `dd`, SPR_PaymentTermDetails_PaymentCategory, crnwTR.index());
                if (IsEnable //&& paymentCat != 'RESRV'
                    ) {
                    countEnable++;
                }
            }

            if (countEnable == 1) {
                //var paymentCat = '';
                paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, `dd`, SPR_PaymentTermDetails_PaymentCategory, count);

                //if (paymentCat.toUpperCase() != `RESRV`)
                nwGrid_ClearRange(id, 1, count, $(`#nwGridPaymentTermDetails th`).size() - 1, $(`#${id} .tblGridBody tr`).size());

                SumAllHeader();
                if ($('#idvallugFinancingType').val() == 'DEF') {
                    ChangeDPDate($('#txtReservationDate').val());
                }
                else
                    ChangeDPDate($('#txtDPStartDate').val());

                return false;
            }
            else if (countEnable > 1) {
                //var hasData = CheckTableIfContainsData('', 'nwGridDiscount', SPR_Discount_DiscountCode);
                //if (hasData) {
                //    //if (IsYesPaymentDetails)
                //    //    return IsYesPaymentDetails;
                //    //msgBoxContainerQuestion = "ResetDiscount";
                //    //parent_MessageBoxQuestion("Discount detail will be lost. Would you like to continue?", pagetitle, "Question");
                //    //$('.message_Cancel').css('display', 'none');
                //    //$('#dimMessageBox .BoxClose').css('display', 'none');
                //    //return false;
                //    return IsYesPaymentDetails
                //}
                //else {
                //    ResetGrid('nwGridDiscount');
                //    return true;
                //}
                paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, `dd`, SPR_PaymentTermDetails_PaymentCategory, crnwTR.index());
                if (paymentCat != undefined && paymentCat != '') {
                    ResetQuestion(1);

                    return isPaymentDetailsDelete;
                }



            }
            //else {
            //    ResetGrid(`nwGridPaymentTermDetails`);
            //    return false;
            //}
        }

        //var IsLock = $(`#nwGridPaymentTermDetails-nwData tr:eq(${crnwTR.index()}) td:eq(${SPR_PaymentTermDetails_PaymentCategoryCode})`).enable();
        //if (!IsLock)
        //    return false;
        //else {
        //    var countEnable = 0;
        //    var IsEnable = false;
        //    for (i = 0; i <= count; i++) {
        //        IsEnable = $(`#nwGridPaymentTermDetails-nwData tr:eq(${i}) td:eq(${SPR_PaymentTermDetails_PaymentCategoryCode})`).enable();
        //        if (IsEnable) {
        //            countEnable++;
        //        }
        //    }

        //    if (countEnable == 1) {
        //        var paymentCat = '';
        //        paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategoryCode, count);

        //        if (paymentCat.toUpperCase() != `RESRV`)
        //            nwGrid_ClearRange(id, 1, count, $(`#nwGridPaymentTermDetails th`).size() - 1, $(`#${id} .tblGridBody tr`).size());

        //        return false;
        //    }
        //    else if (countEnable > 1)
        //        return true;
        //    else {
        //        ResetGrid(`nwGridPaymentTermDetails`);
        //        return false;
        //    }
        //}

    }
    else if (id == `nwGridAddOn`) {
        var total = getGridDataPerLine(`nwGridAddOn`, ``, SPR_Addon_ItemGroupTypeDesc, crnwTR.index());
        /*Do not allow to delete Total in first column*/


        if (total == 'Total')
            return false;

        if (crnwTR.index() == 1) {
            nwGrid_ClearRange(id, 1, crnwTR.index(), $(`#nwGridAddOn th`).size() - 1, crnwTR.index());
            return false;
        }
        //for (i = 0; i < count; i++)
        //{
        //IsEnable = $(`#nwGridPaymentTermDetails-nwData tr:eq(${i}) td:eq(${SPR_PaymentTermDetails_PaymentCategoryCode})`).enable();
        //paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategoryCode, crnwTR.index());
        //if (IsEnable && paymentCat != 'RESRV') {
        //    countEnable++;
        //}
        //}
    }
    else if (id == 'nwGridDiscount') {
        $('#nwGridPaymentTermDetails-nwData tr:gt(0)').each(function (x, j) {
            $(this).find('td:eq(' + SPR_PaymentTermDetails_DPDiscountRate + ') input').val(0);
            $(this).find('td:eq(' + SPR_PaymentTermDetails_DPDiscountAmount + ') input').val(0);


            $(this).find('td:eq(' + SPR_PaymentTermDetails_DPDiscPrin + ')').text('');
            $(this).find('td:eq(' + SPR_PaymentTermDetails_DPDiscMisc + ')').text('');
        });
        //doDiscountCompute();
    }

    return true;
}

function func_nwgrid_DeleteRow(ver) {

    crnwTD = ver;
    crnwTR = $(ver).parents("tr");
    crnwTable = $(ver).parents("table");
    crnwTableCon = $(ver).parents(".nwGrid");

    var isContinue = true;
    try {
        isContinue = func_nwGrid_Delete();
    } catch (err) {
    }

    if (isContinue) {
        var x = crnwTable.find('tr').length;
        var tempTRidnex = crnwTR.index();
        var tempTDidnex = crnwTR.find(crnwTD).index();



        if (x <= 1) {
            crnwTR.remove();
        }
        else {
            crnwTR.remove();
            func_ListNumberFormat(crnwTable);
        }
        try {
            func_nwGrid_DeleteFinal();
        } catch (err) {
        }



        crnwTR = $(crnwTable).find("tr:eq(" + tempTRidnex + ")");

        crnwTD = $(crnwTR).find("td:eq(" + tempTDidnex + ")");
        $('.tblGridBody tr td').removeClass('nwgridSelected');
        $('.tblGridBody tr').removeClass('nwgridSelected');

        crnwTD.addClass('nwgridSelected');
        crnwTR.addClass('nwgridSelected');

    }
}


$(document).on(`change`, `#chkReservationAmount`, function () {

    var IsChecked = $(this).prop(`checked`);


    var count = $(`#nwGridPaymentTermDetails-nwData tr`).length - 1;
    var paymentCat = ``
    for (i = 0; i <= count; i++) {
        paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategoryCode, i);
        if (paymentCat == `RESRV`)
            DisablePaymentTerm_TotalLotPrice(i, IsChecked);




        if (!IsChecked) {
            if (paymentCat == `RESRV`) {
                var totalMinAmt = parseFloat($('#txtReservationAmt').val().split(',').join('')) || 0.00;
                setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TotalLotPrice, i, commaSeparateNumber(totalMinAmt.toFixed(2)));
                nwGrid_ClearRange('nwGridPaymentTermDetails', 1, 2, SPR_PaymentTermDetails_NoOfPayments, count);
            }
        }

    }


    if (!IsChecked) {
        nwGrid_ClearRange('nwGridPaymentTermDetails', 1, 2, SPR_PaymentTermDetails_NoOfPayments, count);
        //SetReservationFormula();
    }


})



var oldrate;
$(document).on('focus', '.txtPaymentTermDetails_ContractRate', function (e) {
    oldrate = parseFloat($(this).val().split(',').join('')) || 0.00;
    curr_index = crnwTR.index();
});


$(document).on(`change blur`, `.txtPaymentTermDetails_ContractRate`, function (e) {
    //var regexPattern = new RegExp(`^([0-9]{1,2}([\.][0-9]{1,})?$|100([\.][0]{1,})?)$`);
    //var str = $(this).val();

    //var res = regexPattern.test(str);
    //if (res == false) {
    //    setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, crnwTR.index(), $(this).val(`0.00`));
    //}

    ComputationContractRate(curr_index);
    //SumContractRate();
    //GetTotalStandardLotUnitPrice();

    //ComputationContractRate();
})



function ComputationContractRate(index) {

    var totalLotPrice = 0.00;

    var count = $(`#nwGridPaymentTermDetails-nwData tr`).length;
    var reservLotPrice = 0;
    var paymentCat = '';
    var contractRate = 0.00;
    var lotprice = 0.00;
    var salesdiscounttotal = 0.00;
    var totalLotPricetotal = 0.00;
    var miscInstallmentTotal = 0.00;

    var salesdiscount = 0.00;
    var netlotunitprice = 0.00;
    var totalLotPrice = 0.00;
    var miscInstallment = 0.00;
    var discountAmount = 0.00;
    var tcp = 0.00;
    var ntcp = 0.00;

    salesdiscounttotal = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, 0).split(`,`).join(``) || 0.00;
    totalLotPricetotal = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_LotPrice, 0).split(`,`).join(``) || 0.00;
    miscInstallmentTotal = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, 0).split(`,`).join(``) || 0.00;

    contractRate = (parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, index).split(`,`).join(``)) / 100) || 0.00;
    discountAmount = (parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, index).split(`,`).join(``)) / 100) || 0.00;
    var paymentCatDP = ''
    var firstdp = 0.00;

    var IsfirstDP = false;
    var vat_excludereserv = 0.00;
    if (contractRate > 0) {
        for (i = 0; i < count; i++) {
            paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategoryCode, i);
            lotprice = 0.0;
            if (paymentCat.toUpperCase() == 'RESRV') {
                reservLotPrice = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_LotPrice, i).split(`,`).join(``)) || 0.00;
            }
            else if (paymentCat.toUpperCase() == 'DOWNP' && IsfirstDP == false) {
                if (i == index) {
                    lotprice = (totalLotPricetotal * contractRate) - reservLotPrice;
                    break;
                }
                IsfirstDP = true;
                /* Lot Price */
                //setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_LotPrice, index, commaSeparateNumber(firstdp.toFixed(2)));
            }
            else {
                if (i == index) {
                    lotprice = totalLotPricetotal * contractRate;
                    break;
                }
            }
        }


        /* Lot Price */
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_LotPrice, index, commaSeparateNumber(lotprice.toFixed(2)));

        if (IsVatable())
            vat_excludereserv = lotprice * (vatrate_global / 100);
        else
            vat_excludereserv = 0.00;

        /* Vat */
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_VAT, index, commaSeparateNumber(vat_excludereserv.toFixed(2)));

        /* Total Lot Price*/
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TotalLotPrice, index, commaSeparateNumber((lotprice + vat_excludereserv).toFixed(2)));

        /*Sales Discount*/
        salesdiscount = (salesdiscounttotal * contractRate);
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, index, commaSeparateNumber(salesdiscount.toFixed(2)));

        /* Net Lot/Unit Price */
        totalLotPrice = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TotalLotPrice, index).split(`,`).join(``)) || 0.00;
        netlotunitprice = totalLotPrice - salesdiscount
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetLotUnitPrice, index, commaSeparateNumber(netlotunitprice.toFixed(2)));

        /* Misc (Installment) */
        miscInstallment = miscInstallmentTotal * contractRate;
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, index, commaSeparateNumber(miscInstallment.toFixed(2)));

        /* TCP */
        tcp = netlotunitprice + miscInstallment;
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TCP, index, commaSeparateNumber(tcp.toFixed(2)));


        /* NTCP */
        ntcp = tcp - discountAmount;
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NTCP, index, commaSeparateNumber(ntcp.toFixed(2)));

    }
    else {
        setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, index, "0.00");

        /* Lot Price */
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_LotPrice, index, "");

        /* Vat */
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_VAT, index, "");

        /* Total Lot Price*/
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TotalLotPrice, index, "");

        /*Sales Discount*/
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, index, "");

        /* Net Lot/Unit Price */
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetLotUnitPrice, index, "");

        /* Misc (Installment) */
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, index, "");

        /* TCP */
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TCP, index, "");

        /* NTCP */
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NTCP, index, "");
    }

    //autoComputePaymentTerm();

}



//function SumTotalNoOfPayments() {
//    var columnTotalNoOfPayments = getGridElement(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TotalNoOfPayment);
//    var totalNoOfPayments = 0.00;

//    $.each(columnTotalNoOfPayments, function (idx, obj) {
//        if (idx != 0) {
//            var paymentCat = '';
//            paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategoryCode, idx);

//            if (paymentCat.toUpperCase() == `DOWNP`)
//                totalNoOfPayments += parseFloat($(this).text().split(`,`).join(``)) || 0.00;
//        }
//    });
//    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TotalNoOfPayment, 0, commaSeparateNumber(totalNoOfPayments.toFixed(2)));
//}

function SumContractRate() {
    var columnContractRate = getGridElement(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate);
    var totalContractRate = 0.00;

    $.each(columnContractRate, function (idx, obj) {
        if (idx != 0)
            totalContractRate += parseFloat($(this).val().split(`,`).join(``)) || 0.00;
    });
    setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, 0, commaSeparateNumber(totalContractRate.toFixed(2)));
}

function GetConcatCoBorrower() {
    var cnt = $('#nwGridCoBuyer-nwData tr').length;
    var concat = '';
    var cobuyer = '';
    for (var row = 0; row < cnt; row++) {
        cobuyer = $('#nwGridCoBuyer tr:eq(' + (row + 1) + ') td:eq(' + SPR_COBUYER_CODE + ')').text();
        if (cobuyer != '')
            concat += cobuyer + ',';
    }
    return concat.substring(0, concat.length - 1);
}


//function GetConcatID() {
//    //var cnt = nwLib.nwTempTable_Row_Count("nwGridUnitDetails");
//    var cnt = $('#nwGridUnitDetails-nwData tr').length;
//    var filterID = '';
//    var columnID = '';
//    var lvl1 = '', lvl2 = '', lvl3 = '', lvl4 = '', lvl5 = '', lvl6 = '', lvl7 = '', lvl8 = '', lvl9 = '', lvl10 = '', concat = ''

//    lvl1 = $('#txtShortDesc').val();//$('#nwGridUnitDetails tr:eq(1) td:eq(' + SPR_UnitDetails_Level1 + ')').text();
//    //lvl2 = $('#nwGridUnitDetails tr:eq(1) td:eq(' + SPR_UnitDetails_Level2 + ')').text();
//    lvl3 = $('#nwGridUnitDetails tr:eq(1) td:eq(' + SPR_UnitDetails_Level3 + ')').text();
//    lvl4 = $('#nwGridUnitDetails tr:eq(1) td:eq(' + SPR_UnitDetails_Level4 + ')').text();
//    concat = lvl1 + '-' + lvl3 + '-' + lvl4 + '-';

//    for (var row = 0; row < cnt; row++) {
//        lvl5 = $('#nwGridUnitDetails tr:eq(' + (row + 1) + ') td:eq(' + SPR_UnitDetails_Level5 + ')').text();
//        if (lvl5!='')
//            concat = concat + lvl5;
//        //columnID = getGridDataPerLine('nwGridUnitDetails', '', SPR_UnitDetails_ID, row);
//        //filterID += '\'' + columnID + '\','
//    }
//    //console.log(concat.substring(0, concat.length - 1));
//    return concat;
//};

function GetConcatItemCode() {
    var cnt = $('#nwGridUnitDetails-nwData tr').length - 1;
    var filterID = '';
    var columnID = '';
    var itemcode = '';

    for (var row = 0; row < cnt; row++) {

    }
}


function commaSeparateNumber(val) {
    while (/(\d+)(\d{3})/.test(val.toString())) {
        val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
    }
    return val;
}



function propAddOns() {
    //$(`#nwGridAddOn-nwData tr:eq(0) td`).enable(false);
    //$(`#nwGridAddOn-nwData tr:eq(0) td`).css('background-color', 'gainsboro');
    //$(`#nwGridAddOn-nwData tr:eq(0) td:eq(${SPR_Addon_ItemGroupTypeDesc})`).text('Total').css('font-weight', 'bold');
}

function propMisc() {
    $(`.nwCheckBoxTot3`).visible(false);
    $(`.nwCheckBoxTot4`).visible(false);
    $(`.chkMiscVatable`).enable(false);
    $(`.chkInterestBearing`).enable(false);
}

//$(document).on(`change`, `#idvallugClient`, function () {
//    ResetGrid(`nwGridUnitDetails`)
//});

function ComputeFixedInterestRate() {
    var count = $(`#nwGridPaymentTermDetails-nwData tr`).length;
    var interestRate = 0.00;
    var noOfMonths = 0.00;

    for (i = 0; i < count; i++) {
        paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategoryCode, i);
        if (paymentCat.toUpperCase() == `BALANC`) {
            minimumAmt = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TotalLotPrice, i).split(`,`).join(``)) || 0.00;
            break;
        }
    }
    //parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_FreebiesPromoIncentives_Qty, i).split(`,`).join(``)) || 0.00;
    //txtTCP

}

$(document).on(`change`, `#chkFixedInterest`, function () {
    ToggleFixInt(0);
});









function PaymentTermProperties() {

    /*3 decimal place*/
    var element = $('#nwGridPaymentTermDetails-nwData tr td:nth-child(' + (SPR_PaymentTermDetails_ContractRate + 1) + ') input');
    $.each(element, function (idx, obj) {
        LoadPercentageFormat($(this));
    });

    /* Term Amount (18,2)*/
    element = $('#nwGridPaymentTermDetails-nwData tr td:nth-child(' + (SPR_PaymentTermDetails_TermAmount + 1) + ') input');
    $.each(element, function (idx, obj) {
        LoadAmountFormat($(this), 18);
    });

    $(`#nwGridPaymentTermDetails-nwData tr:eq(0) td:eq(${SPR_PaymentTermDetails_DPDiscount}) input`).remove();
    $(`#nwGridPaymentTermDetails-nwData tr:eq(0) td`).enable(false);
    $(`#nwGridPaymentTermDetails-nwData tr:eq(0) td`).css('background-color', 'gainsboro');
}






$(document).on(`change`, `.nwCheckBoxTot14`, function () {
    var $this = $(this);
    var xd = $this.prop(`checked`);

    var count = $(`#nwGridPaymentTermDetails-nwData tr`).length;
    for (i = 0; i < count; i++) {
        IsEnable = $(`#nwGridPaymentTermDetails-nwData tr:eq(${i
        }) td:eq(${SPR_PaymentTermDetails_PaymentCategoryCode
        })`).enable();

        if (IsEnable) {

            if (xd == true) {
                $(`#nwGridPaymentTermDetails-nwData tr:eq(${i}) td:eq(${SPR_PaymentTermDetails_DPDiscountRate}) input`).enable(true);
                $(`#nwGridPaymentTermDetails-nwData tr:eq(${i}) td:eq(${SPR_PaymentTermDetails_DPDiscountRate})`).css('background-color', 'white');

                $(`#nwGridPaymentTermDetails-nwData tr:eq(${i}) td:eq(${SPR_PaymentTermDetails_DPDiscountAmount}) input`).enable(true);
                $(`#nwGridPaymentTermDetails-nwData tr:eq(${i}) td:eq(${SPR_PaymentTermDetails_DPDiscountAmount})`).css('background-color', 'white');
            }
            else {
                $(`#nwGridPaymentTermDetails-nwData tr:eq(${i}) td:eq(${SPR_PaymentTermDetails_DPDiscountRate}) input`).val(``);
                $(`#nwGridPaymentTermDetails-nwData tr:eq(${i}) td:eq(${SPR_PaymentTermDetails_DPDiscountRate}) input`).enable(false);
                $(`#nwGridPaymentTermDetails-nwData tr:eq(${i}) td:eq(${SPR_PaymentTermDetails_DPDiscountRate})`).css('background-color', 'gainsboro');

                $(`#nwGridPaymentTermDetails-nwData tr:eq(${i}) td:eq(${SPR_PaymentTermDetails_DPDiscountAmount}) input`).val(``);
                $(`#nwGridPaymentTermDetails-nwData tr:eq(${i}) td:eq(${SPR_PaymentTermDetails_DPDiscountAmount}) input`).enable(false);
                $(`#nwGridPaymentTermDetails-nwData tr:eq(${i}) td:eq(${SPR_PaymentTermDetails_DPDiscountAmount})`).css('background-color', 'gainsboro');
            }
        }
    }
});

/* used in grid*/
function setGridData(nwGrid, type, col, row, val) {
    if (type == `input`)
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val(val);
    else
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text(val);
}

function setGridDataNChild(nwGrid, type, col, val) {
    if (type == `input`)
        $(`#${nwGrid}-nwData tr td:nth-child((col +1)}) input`).val(val);
    else
        $(`#${nwGrid}-nwData tr td:nth-child(${(col + 1)})`).text(val);
}

function getGridDataPerLine(nwGrid, type, col, row) {
    var data;
    if (type == `input`)
        data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val();
    else if (type == 'dd') {
        data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) option:selected`).val();
    }
    else
        data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text();
    return data;
}

function getGridElement(nwGrid, type, col) {
    //return $(`#${nwGrid}-nwData tr td:nth-child(${col + 1}) ${type}`);
    return $(`#${nwGrid}-nwData tr td:nth-child(${col + 1}) ${type}`);
}

function ResetGrid(id) {
    if (id == `nwGridPaymentTermDetails`) {
        //$(`#nwGridPaymentTermDetails tr:eq(1) td:eq(${SPR_PaymentTermDetails_ContractRate - 1}) input`).val('');
        //$(`#nwGridPaymentTermDetails tr:eq(1) td:gt(${SPR_PaymentTermDetails_LotPrice - 1})`).text('')
        //nwGrid_ClearRange(id, 1, 1, $(`#${id} th`).size() - 1, $(`#${id} .tblGridBody tr`).size());
        //PaymentTermProperties();
    }
    else if (id == `nwGridAddOn`) {
        nwGrid_ClearRange(id, 1, 1, $(`#${id} th`).size() - 1, $(`#${id} .tblGridBody tr`).size());
    }
    else if (id == 'nwGridDiscount') {
        $('#nwGridPaymentTermDetailsData td:nth-child(' + (SPR_PaymentTermDetails_SalesDiscount + 1) + ')').each(function (x, i) {
            $(this).text('0.00')
        });

        doCompute(0);

        nwGrid_ClearRange(id, 1, 0, $(`#${id} th`).size() - 1, $(`#${id} .tblGridBody tr`).size());
        nwGrid_RemoveRow(id, 0, $(`#${id} .tblGridBody tr`).size());
        nwGrid_AddRow(id, 1);
        DiscountProperties();
        $fn().copyOldSP();
    }
    else {
        //nwGrid_ClearRange(id, 1, 0, $(`#${id} th`).size() - 1, $(`#${id} .tblGridBody tr`).size());
        //nwGrid_RemoveRow(id, 0, $(`#${id} .tblGridBody tr`).size());
        //nwGrid_AddRow(id, 1);
    }
}

function getGridData(idnum, index) {
    var data = $(`#menuCreatorContainer .tablecontainter table tr:eq(${idnum})`).find(`td:eq(${index})`).text();
    return data;
}

function SetBalanceDateReservation() {
    //var ReservationDate = $(`#txtReservationDate`).val()
    //var reservationDay = new Date(ReservationDate);

    //var myObj = JSON.stringify(AmortStartDate);

    //var tmpDate;
    //var finalDate;
    //$.each(JSON.parse(myObj), function (idx, obj) {
    //    var amortDay = obj.StartDayofAmort;
    //    var amortReservDay = obj.ReservationDay

    //    if (reservationDay.getDate() == amortReservDay) {
    //        tmpDate = ReservationDate.addMonths(1);
    //        var dd = amortDay;
    //        var mm = tmpDate.getMonth() + 1;
    //        var yyyy = tmpDate.getFullYear();
    //        if (dd < 10) {
    //            dd = '0' + dd;
    //        }
    //        if (mm < 10) {
    //            mm = '0' + mm;
    //        }

    //        finalDate = mm + '/' + dd + '/' + yyyy;
    //    }
    //});

    //$('#txtDPStartDate').val(finalDate);

    //var count = $(`#nwGridPaymentTermDetails-nwData tr`).length;
    //var paymentCat = '';
    //var totalNoOfPayments = 0;
    //for (i = 0; i < count; i++) {
    //    paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentCategoryCode, i);

    //    if (paymentCat.toUpperCase() == 'DOWNP') {
    //        totalNoOfPayments += (parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments, i).split(`,`).join(``))) || 0.00;
    //    }
    //}
    ////var totalNoOfPayments = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_TotalNoOfPayment, 0);
    ////nwParameter_Add(`DPStartDate`, $(`#txtDPStartDate`).val());
    //nwParameter_Add(`txtReservationDate`, $('#txtReservationDate').val());
    //nwParameter_Add(`TotalNoOfPayments`, totalNoOfPayments);
    //func_ActionDriven(`actPopulateBalanceDateReservation`, false);

}

//DaTe
Date.isLeapYear = function (year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};

Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};

Date.prototype.isLeapYear = function () {
    return Date.isLeapYear(this.getFullYear());
};

Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};

Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};






//function PopulateDPDiscountRate(z) {
//    var discountamount = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, crnwTR.index()).split(`,`).join(``)) || 0.00;
//    var discountrate = (discountamount / z)
//    setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountRate, crnwTR.index(), commaSeparateNumber(discountrate.toFixed(2)));
//    SumDPDiscountAmt();
//}

function PopulateDPDiscountAmount(z) {
    var discountamount = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, crnwTR.index()).split(`,`).join(``)) || 0.00;
    var discountrate = (discountamount / z)
    setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountRate, crnwTR.index(), commaSeparateNumber(discountrate.toFixed(2)));
    SumDPDiscountAmt();
}

/********************** Add On Tab *****************************************/

//Event
$(document).on(`keydown`, `.txtSPR_Addon_PriceVatIn`, function (e) {
    var index = crnwTR.index();
    return IntNDecimalFormat(`nwGridAddOn`, index, e.which, SPR_Addon_PricePerUnitUOM, 18, 2);
});

$(document).on(`keydown`, `.txt_SPR_Addon_PricePerUnitUOM`, function (e) {
    var index = crnwTR.index();
    return IntNDecimalFormat(`nwGridAddOn`, index, e.which, SPR_Addon_PricePerUnitUOM, 18, 2);
});

$(document).on(`keydown`, `.txt_SPR_Addon_Qty`, function (e) {
    var index = crnwTR.index();
    return IntNDecimalFormat(`nwGridAddOn`, index, e.which, SPR_Addon_Qty, 6, 2);
});

//$(document).on(`keydown`, `.txtPaymentTermDetails_DPDiscountAmount`, function (e) {
//    var index = crnwTR.index();
//    return IntNDecimalFormat(`nwGridPaymentTermDetails`, index, e.which, SPR_PaymentTermDetails_DPDiscountAmount, 12, 2);
//});

//$(document).on(`keydown`, `.SPR_PaymentTermDetails_DPDiscountRate`, function (e) {
//    var index = crnwTR.index();
//    currAmnt = $(this).val();
//    return IntNDecimalFormat(`nwGridPaymentTermDetails`, index, e.which, SPR_PaymentTermDetails_DPDiscountRate, 2, 2);
//});




//Function
//function ComputeAddOnPriceVatInAndVatExPerLine(qty, pricePerUnitUom) {
//    var priceVatIn = qty * pricePerUnitUom;
//    nwLib.nwTempTable_RowData_Set("nwGridAddOn", crnwTR.index(), SPR_Addon_PriceVatIn, `input`)(commaSeparateNumber(priceVatIn.toFixed(2)));

//    var priceVatEx = priceVatIn / (1 + (vatrate_global / 100));
//    nwLib.nwTempTable_RowData_Set("nwGridAddOn", crnwTR.index(), SPR_Addon_PriceVatEx, `input`)(commaSeparateNumber(priceVatEx.toFixed(2)));
//}

/************** Add On Tab END HERE ******************************************/




/****************** BEGIN HERE (Freebies and Promos Tab) ***********************************/

//Events
$(document).on(`change`, `.txtSPR_FreebiesPromoIncentives_Qty, .txtSPR_FreebiesPromoIncentives_PriceVatIn`, function (e) {

    var index = crnwTR.index();
    var qty = parseFloat(getGridDataPerLine(`nwGridFreeBiesPromo`, `input`, SPR_FreebiesPromoIncentives_Qty, index).split(`,`).join(``)) || 0.00;
    var pricevatin = parseFloat(getGridDataPerLine(`nwGridFreeBiesPromo`, `input`, SPR_FreebiesPromoIncentives_PriceVatIn, index).split(`,`).join(``)) || 0.00;
    var amount = qty * pricevatin
    setGridData(`nwGridFreeBiesPromo`, `input`, SPR_FreebiesPromoIncentives_Amount, index, commaSeparateNumber(amount.toFixed(2)));
});


/****************** END HERE (Freebies and Promos Tab) ***********************************/





//function AutoPopulateMiscTab(amt,misccode,miscdesc,typecode,typedesc)
//{
//    ResetGrid('nwGridMiscDetailsCon');

//    //Hard Code Daw sa first row
//    setGridData(`nwGridMiscDetailsCon`, ``, SPR_MiscellaneousDetails_MiscCode, 0, misccode);
//    setGridData(`nwGridMiscDetailsCon`, ``, SPR_MiscellaneousDetails_MiscDesc, 0, miscdesc);
//    setGridData(`nwGridMiscDetailsCon`, ``, SPR_MiscellaneousDetails_MiscTypeCode, 0, typecode);
//    setGridData(`nwGridMiscDetailsCon`, ``, SPR_MiscellaneousDetails_MiscTypeDesc, 0, typedesc);
//    setGridData(`nwGridMiscDetailsCon`, `input`, SPR_MiscellaneousDetails_Amount, 0, commaSeparateNumber(amt.toFixed(2)));

//    SumInstallmentAndFixed();
//}

function SumInstallmentAndFixed() {
    var columnTotalNoOfPayments = getGridElement(`nwGridMiscDetailsCon`, `input`, SPR_MiscellaneousDetails_Amount);
    var totalNoOfPayments = 0.00;
    var installment = 0.00;
    var fixed = 0.00;
    var typecode = '';
    $.each(columnTotalNoOfPayments, function (idx, obj) {
        typecode = getGridDataPerLine(`nwGridMiscDetailsCon`, ``, SPR_MiscellaneousDetails_MiscTypeDesc, idx);

        if (typecode.toUpperCase() == `INSTALLMENT`)
            installment += parseFloat($(this).val().split(`,`).join(``)) || 0.00;
        else
            fixed += parseFloat($(this).val().split(`,`).join(``)) || 0.00;
    });

    $('#txtInstallment').val(commaSeparateNumber(installment.toFixed(2)));
    $('#txtFixed').val(commaSeparateNumber(fixed.toFixed(2)));

    ComputationHeader();
}


$(document).on('change blur', '#txtSPR_MiscellaneousDetails_Amount', function () {
    SumInstallmentAndFixed();
});





//Function
function Amortization(company) {
    //var myObjClientInfo = JSON.stringify(clientInfo);
    //var objtextClientInfo = JSON.parse(myObjClientInfo);
    //var company = objtextClientInfo[0].Company || '';
    //var companyAddr = objtextClientInfo[0].CompanyAddress|| '';
    //var clientname = objtextClientInfo[0].ClientCode || '';
    //var unittype = objtextClientInfo[0].UnitType|| '';
    //var unitclass = objtextClientInfo[0].UnitClass|| '';
    //var agency = objtextClientInfo[0].Agency||'';
    //var agent = objtextClientInfo[0].Agent|| '';

    //var lotunitprice = parseFloat(objtextClientInfo[0].LotUnitPrice) || 0.00;
    //var salesdisc = parseFloat(objtextClientInfo[0].SalesDisc) || 0.00;
    //var netlotunitprice = parseFloat(objtextClientInfo[0].NetLotUnitPrice) || 0.00;
    //var miscmcf = parseFloat(objtextClientInfo[0].MiscMCF) || 0.00;
    //var tcp = parseFloat(objtextClientInfo[0].TotalContractPrice) || 0.00;
    //var dpdisc = parseFloat(objtextClientInfo[0].DpDisc.toString()) || 0.00;
    //var unitcode = objtextClientInfo[0].UnitCode.toString() || '';

    //var ntcp = parseFloat(objtextClientInfo[0].Ntcp);
    //var dp = parseFloat(objtextClientInfo[0].Downpayment);
    //var bal = parseFloat(objtextClientInfo[0].Balance);
    //var reserv = parseFloat(objtextClientInfo[0].Reservation);
    //var reservDate = objtextClientInfo[0].ReservationDate;
    //var phone = objtextClientInfo[0].Phone;
    //var fax = objtextClientInfo[0].Fax;
    //var email = objtextClientInfo[0].Email;
    //var tcp_new = parseFloat(objtextClientInfo[0].Tcp) || 0.00;//StdGrossLotUP + Misc


    //$(`#AmortAddress`).text(companyAddr);
    //$(`#AmortClient`).text(clientname);
    //$(`#AmortUnitType`).text(unittype);
    //$(`#AmortUnitClass`).text(unitclass);
    //$(`#AmortAgency`).text(agency);
    //$(`#AmortAgent`).text(agent);
    //$('#AmortPhone').text(phone);
    //$('#AmortFax').text(fax);
    //$('#AmortEmail').text(email);

    //$(`#AmortLotUnitPrice`).text(commaSeparateNumber(lotunitprice.toFixed(2)));
    //$(`#AmortSalesDisc`).text(commaSeparateNumber(salesdisc.toFixed(2)));
    //$(`#AmortNetLotUnitPrice`).text(commaSeparateNumber(netlotunitprice.toFixed(2)));
    //$(`#AmortMiscMCF`).text(commaSeparateNumber(miscmcf.toFixed(2)));
    ////$(`#AmortTCP`).text(commaSeparateNumber(tcp.toFixed(2)));
    //$(`#AmortTCP`).text(commaSeparateNumber(tcp_new.toFixed(2)));
    //$(`#AmortDPDisc`).text(commaSeparateNumber(dpdisc.toFixed(2)));
    //$(`#AmortUnitCode`).text(unitcode);

    //$(`#AmortNTCP`).text(commaSeparateNumber(ntcp.toFixed(2)));
    //$(`#AmortDP`).text(commaSeparateNumber(dp.toFixed(2)));
    //$(`#AmortBal`).text(commaSeparateNumber(bal.toFixed(2)));
    //$(`#AmortReserv`).text(commaSeparateNumber(reserv.toFixed(2)));
    //$(`#AmortReservDate`).text(reservDate);
    //nwPopupForm_ShowModal("nwAmortization");
}

function propAmortization() {
    $(`#nwGridAmortization-nwData tr:eq(0) td`).enable(false);
    $(`#nwGridAmortization-nwData tr:eq(0) td`).css('background-color', 'gainsboro');
    $(`#nwGridAmortization-nwData tr:eq(0) td`).css('background-color', 'gainsboro');
    //$(`#nwGridAmortization-nwData tr:eq(0) td:eq(${SPR_Amortization_PrincipalOutstanding
    //})`).css(`background-color`, `rgb(215,228,188)`).enable(true);
    //$(`#nwGridAmortization-nwData tr:eq(0) td:eq(${SPR_Amortization_MiscOutstanding
    //})`).css(`background-color`, `rgb(215,228,188)`).enable(true);
    //$(`#nwGridAmortization-nwData tr:eq(0) td:eq(${SPR_Amortization_TotalOutstanding
    //})`).css(`background-color`, `rgb(250,192,144)`).enable(true);
}


/******************** END HERE (Generate Amortization Schedule) **************************/


var hasNeg = false;
function IntNDecimalFormat(GridName, RowIndex, KeyCode, GridColumnName, IntLength, DecimalLength) {
    var sliptvalue;
    var index = crnwTR.index();
    //if (currAmnt.indexOf('-') == -1)
    //    hasNeg = false;
    //else
    //    hasNeg = true;

    if (hasNeg)
        IntLength = IntLength + 1;
    var getvalue = nwTempTable_RowData_Get("" + GridName + "", RowIndex, (GridColumnName), 'input');

    if (KeyCode == 8 || KeyCode == 37 || KeyCode == 38 || KeyCode == 39 || KeyCode == 40 || KeyCode == 9)
        return true;
    else if (KeyCode == 189 || KeyCode == 109)
        return false;

    if ($("#" + GridName + " tbody tr:eq(" + RowIndex + ") td:eq(" + GridColumnName + ") input").val().indexOf('.') != -1 && (KeyCode == 190 || KeyCode == 110))
        event.preventDefault();

    var positionCursor = $("#" + GridName + " tbody tr:eq(" + RowIndex + ") td:eq(" + GridColumnName + ") input").prop("selectionStart");
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

//document.addEventListener('DOMNodeInserted', function (e) {
//    if ($(e.target).attr('class') === 'myClass') {
//        console.log('hit');
//    }

//});


//$(document).bind("DOMSubtreeModified", function () {
//    console.log($('body').width() + ' x ' + $('body').height());
//})

//$('body').on('DOMNodeInserted', '#common-parent', function (e) {
//    if ($(e.target).attr('class') === 'myClass') {
//        console.log('hit');
//    }
//});

//$('body').on('DOMNodeInserted', '.myClass', function (e) {
//    console.log(e.target);
//});

//(function (window) {
//    var last = +new Date();
//    var delay = 100; // default delay

//    // Manage event queue
//    var stack = [];

//    function callback() {
//        var now = +new Date();
//        if (now - last > delay) {
//            for (var i = 0; i < stack.length; i++) {
//                stack[i]();
//            }
//            last = now;
//        }
//    }

//    // Public interface
//    var onDomChange = function (fn, newdelay) {
//        if (newdelay) delay = newdelay;
//        stack.push(fn);
//    };

//    // Naive approach for compatibility
//    function naive() {

//        var last = document.getElementsByTagName('*');
//        var lastlen = last.length;
//        var timer = setTimeout(function check() {

//            // get current state of the document
//            var current = document.getElementsByTagName('*');
//            var len = current.length;

//            // if the length is different
//            // it's fairly obvious
//            if (len != lastlen) {
//                // just make sure the loop finishes early
//                last = [];
//            }

//            // go check every element in order
//            for (var i = 0; i < len; i++) {
//                if (current[i] !== last[i]) {
//                    callback();
//                    last = current;
//                    lastlen = len;
//                    break;
//                }
//            }
//            // over, and over, and over again
//            setTimeout(check, delay);

//        }, delay);
//    }
//    //
//    //  Check for mutation events support
//    //
//    var support = {};
//    var el = document.documentElement;
//    var remain = 3;

//    // callback for the tests
//    function decide() {
//        if (support.DOMNodeInserted) {
//            window.addEventListener("DOMContentLoaded", function () {
//                if (support.DOMSubtreeModified) { // for FF 3+, Chrome
//                    el.addEventListener('DOMSubtreeModified', callback, false);
//                } else { // for FF 2, Safari, Opera 9.6+
//                    el.addEventListener('DOMNodeInserted', callback, false);
//                    el.addEventListener('DOMNodeRemoved', callback, false);
//                }
//            }, false);
//        } else if (document.onpropertychange) { // for IE 5.5+
//            document.onpropertychange = callback;
//        } else { // fallback
//            naive();
//        }
//    }

//    // checks a particular event
//    function test(event) {
//        el.addEventListener(event, function fn() {
//            support[event] = true;
//            el.removeEventListener(event, fn, false);
//            if (--remain === 0) decide();
//        }, false);
//    }

//    // attach test events
//    if (window.addEventListener) {
//        test('DOMSubtreeModified');
//        test('DOMNodeInserted');
//        test('DOMNodeRemoved');
//    } else {
//        decide();
//    }

//    // do the dummy test
//    var dummy = document.createElement("div");
//    el.appendChild(dummy);
//    el.removeChild(dummy);

//    // expose
//    window.onDomChange = onDomChange;
//})(window);



$(document).on(`click`, `#btnExportPrint`, function (e) {
    var jsonPrintingHDR = [];

    var paymentterm = '';
    var contractRate = '';
    var noOfPayment = 0;
    $('#nwGridPaymentTermDetails-nwData tr').each(function (i, x) {
        if (i != 0) {
            if ($(x).find(`td:eq(${SPR_PaymentTermDetails_PaymentCategory}) select`).val() != 'RESRV')
                paymentterm += $(x).find(`td:eq(${SPR_PaymentTermDetails_PaymentTermDesc})`).text() + ';';

            if ($(x).find(`td:eq(${SPR_PaymentTermDetails_PaymentCategory}) select`).val() == 'DOWNP')
                contractRate += $(x).find(`td:eq(${SPR_PaymentTermDetails_ContractRate}) input`).val() + ' %;';

            noOfPayment += parseFloat($(x).find(`td:eq(${SPR_PaymentTermDetails_NoOfPayments})`).text().split(',').join(''));
        }
    });


    var z = {};
    z["Company"] = $('#AmortCompany').text().toUpperCase();
    z["CompanyAddress"] = $('#CompanyAddress').text().toUpperCase();
    z["CompanyContactNo"] = $('#CompanyContactNo').text().toUpperCase();
    z["ProjectName"] = $('#descvallugBranchProject').val().toUpperCase();
    z["AgentName"] = $('#descvallugAgent').val().toUpperCase();
    z["FloorArea"] = $(`#nwGridUnitDetails-nwData tr:eq(0) td:eq(${SPR_UnitDetails_FloorArea})`).text();
    z["LotArea"] = $(`#nwGridUnitDetails-nwData tr:eq(0) td:eq(${SPR_UnitDetails_LotArea})`).text();
    z["PaymentTerm"] = paymentterm.substring(0, paymentterm.length - 1).toUpperCase();
    z["PercentDP"] = contractRate.substring(0, contractRate.length - 1);
    z["Downpayment"] = $('#txtDPStartDate').val();
    z["NoOfMonths"] = noOfPayment;
    z["Recuser"] = $('#RecUser').text();
    z["ReservationDate"] = $('#lblReservationDate').text().substring(0, 10);
    z["RegisteredName"] = $('#lblRegisteredName').text().toUpperCase();
    z["ReservNo"] = $('#txtReservationControlNo').val();
    z["CheckedBy"] = $('#CheckedBy').text();
    z["UnitCode"] = $('#lblUnitCode').text().toUpperCase();
    z["UnitType"] = $('#lblUnitType').text().toUpperCase();
    z["UnitClass"] = $('#lblUnitClass').text().toUpperCase();
    //z["LotArea"] = $('#lblLotArea').text();
    z["SellingPrice"] = $('#lblSellingPrice').text() || 0;
    //z["Vat"] = $('#lblVat').text();
    z["GrossSellingPrice"] = $('#lblGrossSellingPrice').text() || 0;
    z["Misc"] = $('#lblMisc').text() || 0;
    z["TCP"] = $('#lblTCP').text() || 0;
    z["SalesDisc"] = $fn().grid.discount.find(`.tblGridBody tr:eq(0) td:eq(${SPR_Discount_DiscountSP})`).text() || 0; //$('#lblSalesDisc').text();
    //z["DPDisc"] = $('#lblDPDisc').text();
    z["DPDisc"] = $('#lblDPDisc').text() || 0;
    z["NetContractPrice"] = $('#lblNetContractPrice').text() || 0;
    z["FinancingType"] = $('#lblFinancingType').text().toUpperCase();
    let vat = (parseFloat($('#lblNetContractPrice').text().split(',').join('') || 0) -
       parseFloat($('#lblMisc').text().split(',').join('')))
       -
      (
        parseFloat($('#lblSellingPrice').text().split(',').join('') || 0) -
        parseFloat($fn().grid.discount.find(`.tblGridBody tr:eq(0) td:eq(${SPR_Discount_DiscountSP})`).text().split(',').join('') || 0)
      );

    z["Vat"] = commaSeparateNumber(vat.toFixed(2));
    jsonPrintingHDR.push(z);

    nwParameter_Add('jsonTermDetails', html2json('nwGridTermDetails'));
    nwParameter_Add('jsonAmort', html2json('nwGridAmortization2'));
    nwParameter_Add('jsonHDR', JSON.stringify(jsonPrintingHDR));
    nwParameter_Add('idvallugBranchProject', $('#idvallugBranchProject').val());
    nwParameter_Add('idvallugLocWithAccntblForms', $('#idvallugLocWithAccntblForms').val());
    nwParameter_Add('RecUser', $('#txtRecuser').val());
    nwParameter_Add('ReservationControlNo', $('#txtReservationControlNo').val());

    func_ActionDriven("actExportAmort", false);
    return false;
});
$(document).on('click', '#btnOtherStatement', function (e) {
    nwParameter_Add(`ReservationControlNo`, $(`#txtReservationControlNo`).val());
    if ($(`#ddtxtInsuranceCompany option:selected`).val().length > 0) {
        nwLoading_Start("xSample", crLoadingHTML);
        nwPopupForm_ShowModal("nwStatementDetails");
        nwParameter_Add('isNewRow', isNewRow);

        nwParameter_Add('dtStatementDetails', dtStatementDetails)
        nwParameter_Add('ddtxtInsuranceCompany', $(`#ddtxtInsuranceCompany option:selected`).val())
        func_ActionDriven("actStatementDetails", false);
    }
    else
        MessageBox("Cannot be proceed. Insurance Company is required.", pagetitle);
    return false;
})

$(document).on('click', '#btnPaymentDetails', function (e) {

    nwLoading_Start("actbtnPaymentDetails", crLoadingHTML);
    nwPopupForm_ShowModal("nwPaymentDetails");

    let reservNo = $('#txtReservationControlNo').val();
    let reservDate = $('#txtReservationDate').val();
    let customerName = $('#descvallugClient').val();
    //set docno and docdate
    $('#txtRefDocno').val(reservNo);
    $('#txtRefDocDate').val(reservDate);
    $('#txtCustomer').val(customerName);

    nwParameter_Add('txtReservationControlNo', reservNo);
    nwParameter_Add('paymentDetails', JSON.stringify($paymentDetails));

    func_ActionDriven("actbtnPaymentDetails", false);
    return false;
})

$(document).on('click', '#nwGridPaymentDetails-nwData .btnAttachmentDetails', function (e) {

    if (!isContainMOP(crnwTR.index())) {
        MessageBox("Cannot be proceed. Mode of Payment is required. \n.", pagetitle);
        return false;
    }

    nwLoading_Start("actbtnAttachmentPaymentDetails", crLoadingHTML);
    nwPopupForm_ShowModal("nwAttachmentPaymentDetails");
    $btnAttachmentDetailsIndex = crnwTR.index();
    $uniqueID = crnwTR.find(`td:eq(${spr_PaymentDetailsUniqueID})`).text();
    //$bankName = crnwTR.find(`td:eq(${spr_PaymentDetailsBankName})`).text() || '';

    $isBank = isBank(crnwTR.find(`td:eq(${spr_PaymentDetailsModeOfPaymentCode})`).text());
    nwParameter_Add(`isBank`, $isBank);
    nwParameter_Add('attachmentDetails', JSON.stringify($attachmentDetails.filter(x=>x['Unique ID'] == $uniqueID)));
    func_ActionDriven("actbtnAttachmentPaymentDetails", false);
    return false;
})


//onDomChange(function () {
//    alert("The Times They Are a-Changin'");
//});

function ShowPrintPreview(PDFUrl) {
    //  var docnoList = JSON.parse(DocnoJSON)

    //   var arrayDocno = nwCreate2DArray(docnoList.docnorownum.length);

    var ctr = 0;

    //$.each(docnoList.docnorownum, function (e, item) {
    //    arrayDocno[ctr][0] = item.Docno;
    //    arrayDocno[ctr][1] = item.RowNum;
    //    ctr++;
    //});

    // nwLoadPrint(PDFUrl, arrayDocno);
    nwLoadPrint(PDFUrl, '');
}

function func_nwPrintPreview_PrintClick() {
    var isContinue = true;
    nwParameter_Add("TransNoList", TransNoList);
    func_ActionDriven("ValidatePrinting", false);

    isContinue = false;
    return isContinue;
}

function func_nwPrintPreview_PrintDone() {

    //nwParameter_Add("TransNoList", TransNoList);
    cust_GetPara();
    //func_ActionDriven("InsertReprint", true);
}



function EnableDisableButton(z) {
    if ("2" == z) {
        $("#btnApprovalDetails").enable(true);
    }
    else {
        $("#btnApprovalDetails").enable(false);
    }
}

function PopulateExpirationDate(z) {
    $('#txtExpirationDate').val(z);
}


function func_WindowCloseTrigger(verID) {
    if (verID == 'nwStatementDetails') {

    }
    return true;
}

function func_AppendRadioButton() {
    var count = $('#nwGridStatementDetailCon tr').length - 1;
    for (i = 0; i < count; i++) {
        //Yes
        $('#nwGridStatementDetailCon tr:eq(' + i + ')').find('input[type=radio]:eq(0)').attr('name', 'radio' + i);

        //No
        $('#nwGridStatementDetailCon tr:eq(' + i + ')').find('input[type=radio]:eq(1)').attr('name', 'radio' + i);
    }
}

function func_ValueRadioButton() {
    var count = $('#nwGridStatementDetailCon tr').length - 1;
    for (i = 0; i < count; i++) {
        //Yes
        var v1 = $('#nwGridStatementDetailCon tr:eq(' + i + ')').find('input[type=radio]:eq(0)').attr('value')
        if (v1 == "True") {
            $('#nwGridStatementDetailCon tr:eq(' + i + ')').find('input[type=radio]:eq(0)').prop('checked', true);
            //$('#nwGridStatementDetailCon tr:eq(' + i + ')').find('td:eq(' + SPR_STATEMENT_REMARKS + ')').css('background-color', 'white');
            //$('#nwGridStatementDetailCon tr:eq(' + i + ')').find('td:eq(' + SPR_STATEMENT_REMARKS + ') input').enable(true);
        }
        //else {
        //    $('#nwGridStatementDetailCon tr:eq(' + i + ')').find('td:eq(' + SPR_STATEMENT_REMARKS + ')').css('background-color', 'gainsboro');
        //    $('#nwGridStatementDetailCon tr:eq(' + i + ')').find('td:eq(' + SPR_STATEMENT_REMARKS + ') input').enable(false);
        //}

        //No
        var v2 = $('#nwGridStatementDetailCon tr:eq(' + i + ')').find('input[type=radio]:eq(1)').attr('value')
        if (v2 == "True") {
            $('#nwGridStatementDetailCon tr:eq(' + i + ')').find('input[type=radio]:eq(1)').prop('checked', true);
            $('#nwGridStatementDetailCon tr:eq(' + i + ')').find('td:eq(' + SPR_STATEMENT_REMARKS + ')').css('background-color', 'gainsboro');
            $('#nwGridStatementDetailCon tr:eq(' + i + ')').find('td:eq(' + SPR_STATEMENT_REMARKS + ') input').enable(false);
        }
        else {
            $('#nwGridStatementDetailCon tr:eq(' + i + ')').find('td:eq(' + SPR_STATEMENT_REMARKS + ')').css('background-color', 'white');
            $('#nwGridStatementDetailCon tr:eq(' + i + ')').find('td:eq(' + SPR_STATEMENT_REMARKS + ') input').enable(true);
        }
    }
}

$(document).on('change', '.radioSPR_STATEMENT_YES,.radioSPR_STATEMENT_NO', function () {
    var $ischecked = crnwTR.find("td:eq(" + SPR_STATEMENT_YES + ") input").prop('checked');

    if ($ischecked) {
        crnwTR.find("td:eq(" + SPR_STATEMENT_NO + ") input").prop('checked', !$ischecked);
        crnwTR.find("td:eq(" + SPR_STATEMENT_REMARKS + ")").enable(true);
        crnwTR.find("td:eq(" + SPR_STATEMENT_REMARKS + ")").css('background-color', 'white');
    }
    else {
        crnwTR.find("td:eq(" + SPR_STATEMENT_NO + ") input").prop('checked', !$ischecked);
        crnwTR.find("td:eq(" + SPR_STATEMENT_REMARKS + ")").enable(false);
        crnwTR.find("td:eq(" + SPR_STATEMENT_REMARKS + ")").css('background-color', 'gainsboro');
        crnwTR.find("td:eq(" + SPR_STATEMENT_REMARKS + ") input").val('');
    }
})

$(document).on('click', '#btnSaveStatementDetails', function () {
    nwLoading_Start("xSample", crLoadingHTML);
    nwParameter_Add_Table(`nwGridStatementDetailCon`);
    func_ActionDriven("actSavingStatementDetails", false);
    return false;
})

var insurance = ''
$(document).on('focus', '#ddtxtInsuranceCompany', function () {
    insurance = $('#ddtxtInsuranceCompany option:selected').val();
})
$(document).on('change blur', '#ddtxtInsuranceCompany', function () {
    if (dtStatementDetails.length > 0) {
        msgBoxContainerQuestion = "Agree";
        parent_MessageBoxQuestion("Other Statement details will be cleared. Would you like to continue?", pagetitle, "Question");
        $('.message_Cancel').css('display', 'none')
        $('#dimMessageBox .BoxClose').css('display', 'none');
    }
    return false;
})

function msgBoxContainerQuestionF(genID, answer) {
    if (genID == "Agree") {
        if (answer == "Yes") {
            dtStatementDetails = ''
        }
        else
            $('#ddtxtInsuranceCompany').val(insurance);
    }
    else if (genID == 'ResetMiscellaneous') {
        if (answer == 'Yes') {
            jsonMisc = [];
            ClearMiscellaneous();
            DisableCheckboxDiscount();
            isPaymentCategoryNotChange = false;
            ClearFields(5);
            ResetGrid(`nwGridDiscount`);
            doCompute(0);


        }
        else {
            //$('#nwGridPaymentTermDetails tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_PAYMENTCATEGORY + ') option:selected').val('');
            //$('#nwGridPaymentTermDetails tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') .clsCategory option:selected')
            $('.clsCategory:eq(' + (crnwTR.index() - 1) + ')').val(oldCategory);
            isPaymentCategoryNotChange = true;
        }
    }
    else if (genID == 'ResetPaymentTermDetails') {
        if (answer == 'Yes') {
            isPaymentDetailsDelete = true;
            ClearFields(2);
            SumAllHeader();
            isPaymentDetailsDelete = false;
        }
        else {
            isPaymentDetailsDelete = false;
        }
    }
    else if (genID == "ResetDiscount") {
        if (answer == "Yes") {
            ResetGrid('nwGridDiscount');
            IsYesPaymentDetails = true;
            $('#nwGridPaymentTermDetails button.nwgrid_Delete').click()
            //DiscountComputation();
            IsYesPaymentDetails = false;
        }
        else
            IsYesPaymentDetails = false;
    }
    else if (genID == 'ResetDiscountUponPaymentTerm') {
        if (answer == "Yes") {
            ResetGrid('nwGridDiscount');
            //fn_PaymentTermDetails(idNum_global);
            //DiscountComputation();
        }

    }
    else if (genID == 'ResetLookupPaymentTermDetails') {
        if (answer == 'Yes') {
            LookupDoneLogic();
            ResetGrid(`nwGridDiscount`);

        }
    }
    else if (genID == 'isProcessApproval') {
        if (answer == 'Yes') {
            nwParameter_Add("txtReservationControlNo2", $("#txtReservationControlNo2").val());
            nwParameter_Add_Table('nwGridApprover');
            func_ActionDriven('actSaveApproverDetails', false);
        }
    }
    else if (genID == 'ResetDPDiscount') {
        if (answer == 'Yes') {

            $('#nwGridPaymentTermDetails-nwData tr:gt(0)').each(function (x, j) {
                $(this).find('td:eq(' + SPR_PaymentTermDetails_DPDiscountRate + ') input').val(0);
                $(this).find('td:eq(' + SPR_PaymentTermDetails_DPDiscountAmount + ') input').val(0);


                $(this).find('td:eq(' + SPR_PaymentTermDetails_DPDiscPrin + ')').text('');
                $(this).find('td:eq(' + SPR_PaymentTermDetails_DPDiscMisc + ')').text('');
            });
            doDiscountCompute();
        }
        else {

            //Revert old value
            if (globaltag == 'DiscountRate') {
                setGridData('nwGridDiscount', 'input', SPR_Discount_DiscountRate, globalindex, globaldiscountrate);
            }
            else if (globaltag == 'BasisOfDiscount') {
                $('.clsBasisOfDiscount').val(globalbasis);
            }
            else if (globaltag == 'DiscountApplication') {
                $('.clsDiscountApp').val(globalapp);
            }
        }
    }
    else if (genID == 'actPopulateCategory') {
        if (answer == 'Yes') {
            var UnitCode = nwLib.nwTempTable_RowData_Get("nwGridUnitDetails", 0, SPR_UnitDetails_UnitCode);
            var finType = $('#idvallugFinancingType').val();
            var branchProj = $('#idvallugBranchProject').val();
            var phaseTower = $('#ddPhaseTower option:selected').val();
            var grossSellingPrice = $('#txtGrossSellingPrice').val().split(',').join('');
            var reserveDate = $(`#txtReservationDate`).val();
            var UnitClass = $('#nwGridUnitDetails-nwData tr:eq(0) td:eq(' + SPR_UnitDetails_InventoryClassCode + ')').text();
            var UnitType = $('#nwGridUnitDetails-nwData tr:eq(0) td:eq(' + SPR_UnitDetails_InventoryTypeCode + ')').text();

            cust_GetPara();

            nwParameter_Add(`tag`, 1);
            nwParameter_Add(`idvallugFinancingType`, finType);
            nwParameter_Add(`idvallugBranchProject`, branchProj);
            nwParameter_Add(`UnitCode`, UnitCode);
            nwParameter_Add(`ddPhaseTower`, phaseTower);
            nwParameter_Add(`UnitClass`, UnitClass);
            nwParameter_Add(`UnitType`, UnitType);
            nwParameter_Add(`ReservationDate`, reserveDate);
            nwParameter_Add(`txtGrossSellingPrice`, grossSellingPrice);

            nwLoading_Start("actPopulateCategory", crLoadingHTML);
            func_ActionDriven('actPopulateCategory', false);
        }
        else {
            var isChecked = $('#chkFixedInterest').prop('checked');
            $('#chkFixedInterest').prop('checked', !isChecked);

            if (!isChecked) {
                $('#nwGridMiscellaneousFeeCon').enable(false);
            } else {
                $('#nwGridMiscellaneousFeeCon').enable(true);
            }
        }
    }
    if (genID === "removeAttachment") {
        if (answer === "Yes") {
            $rowGrid.find(`td:eq(${spr_PaymentDetailsAttachFilePath})`).text("");
            $portal().customFunc.ChangeBtnReqDtlsGridColor();
        }
    }
}

function LookupDoneLogic() {

    //jsonMisc = [];
    $('#nwGridAmortizationCon').html('');
    var miscAmt = 0;

    if ($('#chkFixedInterest').prop('checked')) {
        miscAmt = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, temp_crnwTR);
    } else {
        miscAmt = nwCurrency(parseFloat(Cols.Misc || 0.00))
    }

    ClearFields(3);

    if (!$('#chkFixedInterest').prop('checked')) {
        InitalizeJSON();
    }

    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentTermCode, crnwTR.index(), ColsCode);
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentTermDesc, crnwTR.index(), ColsDescription);

    var ordering = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_Ordering, crnwTR.index()));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PenaltyRate, crnwTR.index(), ColsPenaltyRate);
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments, crnwTR.index(), ColsTotalNoPayments);
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_InterestRate, crnwTR.index(), ColsAnnualRate);
    var financingType = $('#idvallugFinancingType').val();
    var spotDay = 0;
    if (financingType == 'SPOT') {
        if (ColsPeriod == '0') {
            spotDay = ColsTermPeriod;
        }
    }

    if (ordering == 1) {
        setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, crnwTR.index(), ColsContractRate);
        setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, crnwTR.index(), nwCurrency(parseFloat(ColsTermAmount || 0.00)));

        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, crnwTR.index(), miscAmt);

        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_ContractAmount, crnwTR.index(), nwCurrency(parseFloat(ColsContractAmount || 0.00)));
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, crnwTR.index(), nwCurrency(parseFloat(ColsSalesDiscountLin || 0.00)));
        setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountRate, crnwTR.index(), nwCurrency(parseFloat(ColsDPDisc || 0.00)));
        setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, crnwTR.index(), nwCurrency(parseFloat(ColsDPDiscAmount || 0.00)));
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetContractPrice, crnwTR.index(), nwCurrency(parseFloat(ColsNetContractPriceLin || 0.00)));
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments, crnwTR.index(), ColsTotalNoPayments);

        var category = getGridDataPerLine('nwGridPaymentTermDetails', 'dd', SPR_PaymentTermDetails_PaymentCategory, crnwTR.index());
        if (financingType == 'DEF') {
            if (category == 'DOWNP')
                ChangeDPDate($('#txtDPStartDate').val());
            else
                ChangeDPDate($('#txtReservationDate').val());
        }
        else if (financingType == 'SPOT') {
            ChangeDPDate($('#txtReservationDate').val(), ColsPeriod, parseInt(spotDay));
        }
        else if (category == 'RESRV') {
            ChangeDPDate($('#txtReservationDate').val());
        }
        else {
            ChangeDPDate($('#txtDPStartDate').val());
        }
    }
    else {
        var reserv = getGridDataPerLine('nwGridPaymentTermDetails', 'dd', SPR_PaymentTermDetails_PaymentCategory, crnwTR.index());
        if ($('#idvallugFinancingType').val() == 'DEF') {
            ChangeDPDate($('#txtReservationDate').val());
        }
        else if (reserv == 'RESRV') {
            ChangeDPDate($('#txtReservationDate').val());
        }
        else if (financingType == 'SPOT')
            ChangeDPDate($('#txtReservationDate').val(), ColsPeriod, parseInt(spotDay));
        else
            ChangeDPDate($('#txtDPStartDate').val());

    }

    //var disctag = 0;
    //if (parseFloat($('#txtCashAmount').val().split(',').join('')) > 0)
    //    disctag = 1
    //else
    //    disctag = 0;
    //doReCompute(0, crnwTR.index(), disctag);

    if (!$('#chkFixedInterest').prop('checked')) {
        ClearMiscellaneous();
    } else {
        var disctag = 0;
        if (parseFloat($('#txtCashAmount').val().split(',').join('')) > 0)
            disctag = 1
        else
            disctag = 0;

        doReCompute(0, temp_crnwTR, disctag);
    }

    SumAllHeader();
    PaymentTermProperties();
}





$(document).on("click", "#btnApprovalDetails", function (e) {

    nwPopupForm_ShowModal("nwApprover");
    $('#nwApprover #noah-webui-default-Save').enable(true);
    //nwPopUpDisable();
    //nwLoading_Start("xGridApprover", crLoadingHTML);
    //$("#nwGridHistoryCon").html("<div style='text-align:center;font-size:20px'>Loading...</div>");
    cust_GetPara();
    $('#nwApprover #txtReservationControlNo2').val($('#txtReservationControlNo').val());
    $('#nwApprover #txtTransactionDate').val(formatDate($('#txtReservationDate').val()));

    nwParameter_Add(`idvallugLocWithAccntblForms`, $(`#idvallugLocWithAccntblForms`).val());
    nwParameter_Add(`txtReservationControlNo2`, $(`#txtReservationControlNo2`).val());
    //nwLoading_Start("actGridApprover", crLoadingHTML);
    func_ActionDriven("actGridApprover", false);
    //$('#noah-webui-default-Save').enable(false);
    return false;
});


//$(document).on(`click`, `.btnUnitCapacity`, function (e) {
//    var id = crnwTR.find(`td:eq(${SPR_UnitDetails_ID})`).text() || ``;
//    var unitcode = crnwTR.find(`td:eq(${SPR_UnitDetails_UnitCode})`).text() || ``;
//    var unitdesc = crnwTR.find(`td:eq(${SPR_UnitDetails_UnitDesc})`).text() || ``;
//    var qty = crnwTR.find(`td:eq(${SPR_UnitDetails_Qty})`).text() || '``';
//    var itemgrouptype = crnwTR.find(`td:eq(${SPR_UnitDetails_ItemGroupTypeCode})`).text() || ``;
//    var itemgrouptypedesc = crnwTR.find(`td:eq(${SPR_UnitDetails_ItemGroupDesc})`).text() || ``;

//    var title = "";
//    var fullength = "";
//    var recuser = getParameterByName("nwu");
//    title = "Unit Capacity Assignment";
//    fullength = "../../../IV/DataSetup/UnitCapacityAssignment/IVUnitCapacityAssignment.aspx?nwdev=p8dev&nwUnitCode=" + unitcode + "&nwUnitDesc=" + unitdesc + "&nwQty=" + qty + "&nwItemGroupType=" + itemgrouptype + "&nwItemGroupTypeDesc=" + itemgrouptypedesc + "&nwu=" + recuser + "&nwID=" + id;

//    nwPopupForm_ShowModal("nwPopUp_UnitCapacity");
//    $('#nwPopWindow .BoxTitle').text(title);
//    $('#frame_viewVendorReport1').attr("src", fullength);
//    $('#dimbgNWnwPopUp_UnitCapacity').remove();
//    nwLoading_End('xSample');
//    return false;
//});


$(document).on('click', '#btnReservationDoc', function (e) {
    //var clientName = $('#idvallugClient').val();
    //var refTranNo = $('#txtReservationControlNo').val();

    var refTranNo = $('#txtReservationControlNo').val()
    var clientName = $('#idvallugClient').val();
    var errorResult = '';

    if (refTranNo == '')
        errorResult += 'Cannot be proceed. Reservation Control No. is required. \n';
    if (clientName == '')
        errorResult += 'Cannot be proceed. Customer is required. \n';

    if (errorResult.length > 0) {
        MessageBox(errorRes, pagetitle);
        return true;
    }

    var refTranType = 'HLDRES';
    var recUser = getParameterByName("nwu");
    var fullength = "";
    var title = "Document Control Entry";

    //fullength = '../../../DC/DocumentEntry/DocumentControlEntry/DocumentControlEntry.aspx?nwdev=p8dev&nwu=' + recUser + '&nwpEntryParam=1&nwpClientName=' + clientName + '&nwpRefTranNo=' + refTranNo + '&nwpTranType=' + refTranType;
    //fullength = '../../../DC/DocumentEntry/DocumentControlEntry/DocumentControlEntry.aspx?nwpEntryParam=1&nwpClientName=' + clientName + '&nwpRefTranNo=' + refTranNo + '&nwpTranType=' + refTranType;

    if (nwDocno != null && nwDocno.length > 0) {
        fullength = '../../../DC/DocumentEntry/DCdocumentControlEntry/DCdocumentControlEntry.aspx?nwpEntryParam=1&nwpClientName=' + clientName + '&nwpRefTranNo=' + refTranNo + '&nwpTranType=' + refTranType + '&nwLock=1';
    } else {
        fullength = '../../../DC/DocumentEntry/DCdocumentControlEntry/DCdocumentControlEntry.aspx?nwpEntryParam=1&nwpClientName=' + clientName + '&nwpRefTranNo=' + refTranNo + '&nwpTranType=' + refTranType;
    }

    //nwPopupForm_ShowModal("nwPopUp_ReservationDocumentEntry");
    nwPopupForm_Create("nwPopUp_ReservationDocumentEntry", true, fullength);
    nwPopupForm_ShowModal("nwPopUp_ReservationDocumentEntry");
    $('#nwPopWindow .BoxTitle').text(title);
    $('#frame_viewVendorReport2').attr("src", fullength);
    return false;
})

//$(document).on('change blur', '.nwSelect', function (e) {
//    nwGrid_ClearRange("nwGridUnitDetails", SPR_UnitDetails_UnitCode, crnwTR.index(), $(`#nwGridUnitDetails th`).size() - 1, $(`#nwGridUnitDetails .tblGridBody tr`).size());
//})


$(document).on('change blur', '#ddBranchID', function (e) {
    if ($(this).val().length > 0) {
        ResetGrid(`nwGridMiscDetailsCon`);
        nwLoading_Start("xSample", crLoadingHTML);

        nwParameter_Add(`idvallugBranchProject`, $(`#idvallugBranchProject`).val());
        func_ActionDriven("actPopulateDefaultMCF", false);
    }
});

$(document).on('change blur', '.txtSPR_INSURANCE_DATEOFBIRTH', function () {
    var date = getCurrentDate();
    var datebirth = new Date($(this).val());
    var today = new Date();
    if (datebirth > today) {
        crnwTR.find("td:eq(" + SPR_INSURANCE_DATEOFBIRTH + ") input").val('')
    }
});

function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = mm + '/' + dd + '/' + yyyy;
    return today;
}


function PopulateDefaultMCF(z) {
    //alert(z);
}

$(document).on('change blur', '.txtPaymentTermDetails_TotalLotPrice', function () {
    //nwGrid_ClearRange("nwGridPaymentTermDetails-nwData", curr_index, $(`#nwGridPaymentTermDetails-nwData th`).size() - 1, $(`#nwGridPaymentTermDetails .tblGridBody tr`).size());
    //PaymentTermProperties();
    var count = $(`#nwGridPaymentTermDetails-nwData tr`).length - 1;
    nwGrid_ClearRange('nwGridPaymentTermDetails', 1, 2, SPR_PaymentTermDetails_NoOfPayments, count);
    //SetReservationFormula();

});



//function getTotalUnitDetailsQty() {
//    var totalAmt = 0;
//    var cnt = nwLib.nwTempTable_Row_Count("nwGridUnitDetails");

//    for (var row = 0; row <= cnt; row++) {
//        if ($(`#nwGridUnitDetails-nwData tr:eq(${row})`).find(`td:eq(${SPR_UnitDetails_UnitCode})`).text() != '') {
//            totalAmt += parseFloat($(`#nwGridUnitDetails-nwData tr:eq(${row})`).find(`td:eq(${SPR_UnitDetails_Qty})`).text());
//        }
//    }

//    return totalAmt;
//}

function autoComputePaymentTerm() {

    var cnt = nwLib.nwTempTable_Row_Count("nwGridPaymentTermDetails");
    var ctr = 0;
    var percentage = 0;
    var isRow = 0; // Row with last zero value

    for (var row = 1; row < cnt; row++) {
        var pc = $(`#nwGridPaymentTermDetails-nwData tr:eq(${row}) td:eq(${SPR_PaymentTermDetails_PaymentCategoryCode})`).text(); // Payment Category
        var pt = $(`#nwGridPaymentTermDetails-nwData tr:eq(${row}) td:eq(${SPR_PaymentTermDetails_PaymentTermCode})`).text(); // Payment Component
        var cr = parseFloat($(`#nwGridPaymentTermDetails-nwData tr:eq(${row}) td:eq(${SPR_PaymentTermDetails_ContractRate}) input`).val()) || 0; // Contract Rate

        if (pc != 'RESRV' && pc != '') {
            if (pc != '' && pt != '' && cr == 0) {
                ctr++;
                isRow = row;
            }
        }
    }

    if (ctr == 1) {
        for (var row = 1; row < cnt; row++) {
            var pc = $(`#nwGridPaymentTermDetails-nwData tr:eq(${row}) td:eq(${SPR_PaymentTermDetails_PaymentCategoryCode})`).text(); // Payment Category
            var pt = $(`#nwGridPaymentTermDetails-nwData tr:eq(${row}) td:eq(${SPR_PaymentTermDetails_PaymentTermCode})`).text(); // Payment Component
            var cr = parseFloat($(`#nwGridPaymentTermDetails-nwData tr:eq(${row}) td:eq(${SPR_PaymentTermDetails_ContractRate}) input`).val()) || 0; // Contract Rate

            if (pc != 'RESRV' && pc != '') {
                if (pc != '' && pt != '' && cr != 0) {
                    percentage += cr;
                }
            }
        }

        var contractRate = (100 - percentage).toFixed(2);
        $(`#nwGridPaymentTermDetails-nwData tr:eq(${isRow}) td:eq(${SPR_PaymentTermDetails_ContractRate}) input`).val(contractRate);
        ComputationContractRate(isRow);

    }

}


//### next or prev page reload function ###
function nwgrid_PaginationNavDone(gridID) {
    if (gridID == "nwGridPaymentTermDetails") {
        PaymentTermProperties();
    }
}


function func_ContainerResize(obj, handler) {
    var height = $(obj).height();

    var objid = $(obj).attr("id");
    //console.log(objid);

    if (objid == "hdr_container") {
        var tot = $('#main-container').height();
        var bodyHeight = tot - height - 50;
        if (bodyHeight <= 170)
            bodyHeight = 200;
        $('#nwFooterContainer').height(bodyHeight);
        func_ContainerResize($('#nwFooterContainer'))

    }
    else if (objid == "nwFooterContainer") {
        //setUnitDetailsPropOverride() 
        var gridHeight = 140;
        var gridHeight_tmp = 30;
        var containerHeight = 200;

        $('#nwGridUnitDetails').css("height", (height - gridHeight) + "px")
        $('#nwGridUnitDetails #nwGridUnitDetailsData .nwGridDataSub .tblGrid_Panel1').css('min-height', (height - containerHeight) + "px");
        $('#nwGridUnitDetails #nwGridUnitDetailsData .nwGridDataSub .tblGrid_Panel1').css('height', (height - containerHeight) + "px");
        $('#nwGridUnitDetails #nwGridUnitDetailsData .nwGridDataSub .tblGrid_Panel1').css('max-height', (height - containerHeight) + "px");

        $('#nwGridPaymentTermDetails').css("height", (height - gridHeight) + "px")
        $('#nwGridPaymentTermDetails #nwGridPaymentTermDetailsData .nwGridDataSub .tblGrid_Panel1').css('min-height', (height - containerHeight) + "px");
        $('#nwGridPaymentTermDetails #nwGridPaymentTermDetailsData .nwGridDataSub .tblGrid_Panel1').css('height', (height - containerHeight) + "px");
        $('#nwGridPaymentTermDetails #nwGridPaymentTermDetailsData .nwGridDataSub .tblGrid_Panel1').css('max-height', (height - containerHeight) + "px");

        $('#nwGridAddOn').css("height", (height - gridHeight) + "px")
        $('#nwGridAddOn #nwGridAddOnData .nwGridDataSub .tblGrid_Panel1').css('min-height', (height - containerHeight) + "px");
        $('#nwGridAddOn #nwGridAddOnData .nwGridDataSub .tblGrid_Panel1').css('height', (height - containerHeight) + "px");
        $('#nwGridAddOn #nwGridAddOnData .nwGridDataSub .tblGrid_Panel1').css('max-height', (height - containerHeight) + "px");

        $('#nwGridDiscount').css("height", (height - gridHeight - gridHeight_tmp) + "px")
        $('#nwGridDiscount #nwGridDiscountData .nwGridDataSub .tblGrid_Panel1').css('min-height', (height - containerHeight) + "px");
        $('#nwGridDiscount #nwGridDiscountData .nwGridDataSub .tblGrid_Panel1').css('height', (height - containerHeight) + "px");
        $('#nwGridDiscount #nwGridDiscountData .nwGridDataSub .tblGrid_Panel1').css('max-height', (height - containerHeight) + "px");

        $('#nwGridFreeBiesPromo').css("height", (height - gridHeight - gridHeight_tmp) + "px")
        $('#nwGridFreeBiesPromo #nwGridFreeBiesPromoData .nwGridDataSub .tblGrid_Panel1').css('min-height', (height - containerHeight) + "px");
        $('#nwGridFreeBiesPromo #nwGridFreeBiesPromoData .nwGridDataSub .tblGrid_Panel1').css('height', (height - containerHeight) + "px");
        $('#nwGridFreeBiesPromo #nwGridFreeBiesPromoData .nwGridDataSub .tblGrid_Panel1').css('max-height', (height - containerHeight) + "px");


        $('#nwGridCoBuyer').css("height", (height - gridHeight - gridHeight_tmp) + "px")
        $('#nwGridCoBuyer #nwGridCoBuyerData .nwGridDataSub .tblGrid_Panel1').css('min-height', (height - containerHeight) + "px");
        $('#nwGridCoBuyer #nwGridCoBuyerData .nwGridDataSub .tblGrid_Panel1').css('height', (height - containerHeight) + "px");
        $('#nwGridCoBuyer #nwGridCoBuyerData .nwGridDataSub .tblGrid_Panel1').css('max-height', (height - containerHeight) + "px");

    }
    //setUnitDetailsPropOverride()
}

function setUnitDetailsPropOverride() {



    //$('#nwGridUnitDetails').css('height', '');
    //$('#nwGridUnitDetails').css('max-height', '');
    //$('#nwGridUnitDetails').css('min-height', '');
    //$('#nwGridUnitDetailsData').css('max-height', '');
    //$('#nwGridUnitDetails .nwGrid').css('height', '');
    //$('#nwGridUnitDetails .nwGrid').css('min-height', '');
    //$('#nwGridUnitDetailsData .nwGridDataSub .tblGrid_Panel1').css('min-height', '');
    //$('#nwGridUnitDetailsData .nwGridDataSub .tblGrid_Panel1').css('height', '');
    //$('#nwGridUnitDetailsData .nwGridDataSub .tblGrid_Panel1').css('max-height', '');
    //tblGrid_Panel1


    //nwGrid_TableAdjust('nwGridUnitDetails');
    //nwGrid_TableFreeze('nwGridUnitDetails',0,0)
    //nwGrid_makeResize('nwGridUnitDetails');
}


//// on insert row reload function
//function func_nwGrid_InsertDone() {
//    var isContinue = true;
//    var xid = crnwTable.attr("id");
//    if (xid == "nwGridPaymentTermDetails-nwData") {
//        PaymentTermProperties()
//    }
//    return isContinue;
//}


//$(document).on('change', '#chkFixedInterest', function (e) {
//    var checked = $(this).prop('checked');
//    if (!checked) {
//        $('#txtFixedInterest').val('0.00');
//    }
//});

function CustomerInfo(CustomerCode, CustomerDesc, Bday, crossRef, VIPType, Age) {
    //MessageBox(CustomerCode, CustomerDesc);
    $('#idvallugClient').val(CustomerCode);
    $('#descvallugClient').val(CustomerDesc);
    $('#txtBirthdate').val(Bday);
    $('#txtCrossRefCode').val(crossRef);
    $('#txtVIPType').val(VIPType);
    $('#txtAge').val(Age);

    //window_close('nwPopWindow');
}


function ClearInsuranceTab() {
    var insComp = document.getElementById('ddtxtInsuranceCompany');
    insComp.selectedIndex = 0;
    $('#txtCoBorrower').val('');
    $('#txtLoanAmount').val('');
    $('#txtLoanAmount').val('');
    $('#txtLoanTerm').val('');
    $('#txtMaturityDate').val('');
    $('#radioNel').prop('checked', true);
    $('#radioAboveNel').prop('checked', false);
    $('#radioYes').prop('checked', true);
    $('#radioNo').prop('checked', false);
    ResetGrid('nwGridInsurance');

    //$('#nwGridInsurance-nwData .txtSPR_INSURANCE_DATEOFBIRTH').datepicker("destroy").unmask();--01.27.2018
}

function EnableDisabledInsuranceTab(b) {
    $('#ddtxtInsuranceCompany').prop('disabled', b);
    $('#txtLoanAmount').prop('disabled', b)
    $('#txtLoanTerm').prop('disabled', b);
    $('#txtMaturityDate').prop('disabled', b);
    $('#txtMaturityDate').prop('disabled', b);
    $('#radioYes').prop('disabled', b);
    $('#radioNo').prop('disabled', b);
    $('#nwGridInsurance').enable(!b);
    $('#btnOtherStatement').enable(!b);
}


$(document).on('change', '#chkAgent', function () {
    $('#idvallugAgent').val('');
    $('#descvallugAgent').val('');
    $('#txtAgentType').val('');
});


//Adding Months
function isLeapYear(year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
}

function getDaysInMonth(year, month) {
    return [31, (isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
}

function addMonths(date, value) {
    var d = new Date(date),
        n = date.getDate();
    d.setDate(1);
    d.setMonth((d.getMonth()) + value);
    d.setDate(Math.min(n, getDaysInMonth(d.getFullYear(), d.getMonth())));
    return d;
}

function addDays(date, value) {
    var d = new Date(date),
        n = date.getDate();
    d.setDate(1);
    d.setMonth((d.getMonth()));
    d.setDate(Math.min(n, getDaysInMonth(d.getFullYear(), d.getMonth())) + value);
    return d;
}

function getEndDate(date, value) {
    var d = new Date(date),
        n = date.getDate();
    d.setDate(1);
    d.setMonth((d.getMonth() - 1) + value);
    d.setDate(Math.min(n, getDaysInMonth(d.getFullYear(), d.getMonth())));
    return d;
}

function formatDate($date) {
    var today = new Date($date);
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = mm + '/' + dd + '/' + yyyy;
    return today;
}

var xxx = [];
function PopulateJSON(j) {

    jsonAllCombo = j;
    $('#ddInventoryGroup,#ddProductType,#ddProductType,#ddPhaseTower,#ddModel,#ddInventoryType,#ddInventoryClass').empty();

    var id = $('#ddInventoryGroup').attr('id');

    var inventoryGroup = $.grep(JSON.parse(jsonAllCombo), function (n, i) {
        return (n.InventoryGroup != null && n.inventoryGroup != '')
    });

    LoadCombo(DistinctColumn(inventoryGroup, id), id);

    id = $('#ddProductType').attr('id');
    var productType = $.grep(JSON.parse(jsonAllCombo), function (n, i) {

        return (
            ((n.InventoryGroup == $('#ddInventoryGroup option:selected').val() || '')
            || $('#ddInventoryGroup option:selected').val() || '' == '')
            )
    });
    LoadCombo(DistinctColumn(productType, id), id);

}

$(document).on('change', '#ddInventoryGroup', function (e) {
    $('#nwGridAmortizationCon').html('');
    $('#ddProductType').empty();
    $('#ddPhaseTower').empty();
    $('#ddModel').empty();
    $('#ddInventoryType').empty();
    $('#ddInventoryClass').empty();

    var id = $('#ddProductType').attr('id');
    var productType = $.grep(JSON.parse(jsonAllCombo), function (n, i) {
        return (
            ((n.InventoryGroup == $('#ddInventoryGroup option:selected').val() || '')
            || $('#ddInventoryGroup option:selected').val() || '' == '')
            );
    });
    LoadCombo(DistinctColumn(productType, id), id);
    ClearAllGrid();
    $('#txtLotPrice,#txtHousePrice,#txtSellingPrice,#txtVatAmount,#txtGrossSellingPrice,#txtMisc,#txtTCP,#txtSalesDiscountAmount,#txtNTCP,#txtDPDiscount').val('');
})

$(document).on('change', '#ddProductType', function (e) {
    $('#nwGridAmortizationCon').html('');
    $('#ddPhaseTower').empty();
    $('#ddModel').empty();
    $('#ddInventoryType').empty();
    $('#ddInventoryClass').empty();

    var id = $('#ddPhaseTower').attr('id');
    var inventoryGroup = $('#ddInventoryGroup option:selected').val() || '';
    var productType = $('#ddProductType option:selected').val() || '';

    var phase = $.grep(JSON.parse(jsonAllCombo), function (n, i) {
        return (n.ProductType == productType && (n.InventoryGroup == inventoryGroup || inventoryGroup == ''));
    });

    LoadCombo(DistinctColumn(phase, id), id);
    ClearAllGrid();
    $('#txtLotPrice,#txtHousePrice,#txtSellingPrice,#txtVatAmount,#txtGrossSellingPrice,#txtMisc,#txtTCP,#txtSalesDiscountAmount,#txtNTCP,#txtDPDiscount').val('');
});

$(document).on('change', '#ddPhaseTower', function (e) {
    $('#nwGridAmortizationCon').html('');
    $('#ddModel').empty();
    $('#ddInventoryType').empty();
    $('#ddInventoryClass').empty();

    var id = $('#ddModel').attr('id');

    var inventoryGroup = $('#ddInventoryGroup option:selected').val() || '';
    var productType = $('#ddProductType option:selected').val() || '';
    var phaseCode = $('#ddPhaseTower option:selected').val() || '';

    var model = $.grep(JSON.parse(jsonAllCombo), function (n, i) {
        return (n.InventoryGroup == inventoryGroup || inventoryGroup == '') && (n.ProductType == productType) && (n.PhaseCode == phaseCode) && n.ModelCode != null;
    });

    LoadCombo(DistinctColumn(model, id), id);
    $('#ddPhaseTower_temp').val($('#ddPhaseTower option:selected').val());

    //Load Inventory Type
    id = $('#ddInventoryType').attr('id');
    var modelCode = $('#ddModel option:selected').val() || '';
    var inventoryType = $.grep(JSON.parse(jsonAllCombo), function (n, i) {
        return (n.InventoryGroup == inventoryGroup || inventoryGroup == '') && (n.ProductType == productType) && (n.PhaseCode == phaseCode) && (n.ModelCode == modelCode || modelCode == '') && n.InventorytypeCode != null;
    });
    LoadCombo(DistinctColumn(inventoryType, id), id);

    // Load Inventory Class
    id = $('#ddInventoryClass').attr('id');
    var inventoryTypeCode = $('#ddInventoryType option:selected').val() || '';

    var inventoryClass = $.grep(JSON.parse(jsonAllCombo), function (n, i) {
        return (n.InventoryGroup == inventoryGroup || inventoryGroup == '') && (n.ProductType == productType) && (n.PhaseCode == phaseCode) && (n.ModelCode == modelCode || modelCode == '') && (n.InventorytypeCode == inventoryTypeCode || inventoryTypeCode == '');
    });
    LoadCombo(DistinctColumn(inventoryClass, id), id);

    ClearAllGrid();
    $('#txtLotPrice,#txtHousePrice,#txtSellingPrice,#txtVatAmount,#txtGrossSellingPrice,#txtMisc,#txtTCP,#txtSalesDiscountAmount,#txtNTCP,#txtDPDiscount').val('');
})

$(document).on('change', '#ddModel', function (e) {
    $('#nwGridAmortizationCon').html('');
    $('#ddInventoryType').empty();
    $('#ddInventoryClass').empty();

    var id = $('#ddInventoryType').attr('id');
    var inventoryGroup = $('#ddInventoryGroup option:selected').val() || '';
    var productType = $('#ddProductType option:selected').val() || '';
    var phaseCode = $('#ddPhaseTower option:selected').val() || '';
    var modelCode = $('#ddModel option:selected').val() || '';

    //Inventory Type
    var inventoryType = $.grep(JSON.parse(jsonAllCombo), function (n, i) {
        return (n.InventoryGroup == inventoryGroup || inventoryGroup == '') && (n.ProductType == productType) && (n.PhaseCode == phaseCode) && (n.ModelCode == modelCode || modelCode == '') && n.InventorytypeCode != null;
    });
    LoadCombo(DistinctColumn(inventoryType, id), id);

    //Inventory Class
    id = $('#ddInventoryClass').attr('id');
    var inventoryTypeCode = $('#ddInventoryType option:selected').val() || '';

    var inventoryClass = $.grep(JSON.parse(jsonAllCombo), function (n, i) {
        return (n.InventoryGroup == inventoryGroup || inventoryGroup == '') && (n.ProductType == productType) && (n.PhaseCode == phaseCode) && (n.ModelCode == modelCode || modelCode == '') && (n.InventorytypeCode == inventoryTypeCode || inventoryTypeCode == '')
    });
    LoadCombo(DistinctColumn(inventoryClass, id), id);
    ClearAllGrid();
    $('#txtLotPrice,#txtHousePrice,#txtSellingPrice,#txtVatAmount,#txtGrossSellingPrice,#txtMisc,#txtTCP,#txtSalesDiscountAmount,#txtNTCP,#txtDPDiscount').val('');
});


$(document).on('change', '#ddInventoryType', function (e) {
    $('#nwGridAmortizationCon').html('');
    $('#ddInventoryClass').empty();

    var id = $('#ddInventoryClass').attr('id');
    var inventoryGroup = $('#ddInventoryGroup option:selected').val() || '';
    var productType = $('#ddProductType option:selected').val() || '';
    var phaseCode = $('#ddPhaseTower option:selected').val() || '';
    var modelCode = $('#ddModel option:selected').val() || '';
    var inventoryTypeCode = $('#ddInventoryType option:selected').val() || '';

    var inventoryClass = $.grep(JSON.parse(jsonAllCombo), function (n, i) {
        return (n.InventoryGroup == inventoryGroup || inventoryGroup == '') && (n.ProductType == productType) && (n.PhaseCode == phaseCode) && (n.ModelCode == modelCode || modelCode == '') && (n.InventorytypeCode == inventoryTypeCode || inventoryTypeCode == '')
    });
    LoadCombo(DistinctColumn(inventoryClass, id), id);
    ClearAllGrid();
    $('#txtLotPrice,#txtHousePrice,#txtSellingPrice,#txtVatAmount,#txtGrossSellingPrice,#txtMisc,#txtTCP,#txtSalesDiscountAmount,#txtNTCP,#txtDPDiscount').val('');
});


function DistinctColumn(j, id) {
    var obj = j;
    //InventoryGroup
    temp = {}
    // Store each of the elements in an object keyed of of the name field.  If there is a collision (the name already exists) then it is just replaced with the most recent one.
    for (var i = 0; i < obj.length; i++) {
        switch (id) {
            case "ddInventoryGroup": temp[obj[i].InventoryGroup] = obj[i]; break;
            case "ddProductType": temp[obj[i].ProductType] = obj[i]; break;
            case "ddPhaseTower": temp[obj[i].PhaseCode] = obj[i]; break;
            case "ddModel": temp[obj[i].ModelCode] = obj[i]; break;
            case "ddInventoryType": temp[obj[i].InventorytypeCode] = obj[i]; break;
            case "ddInventoryClass": temp[obj[i].inventoryclass] = obj[i]; break;
        }
    }
    // Reset the array in varjson
    obj = [];
    // Push each of the values back into the array.
    for (var o in temp) {
        obj.push(temp[o]);
    }
    return obj;
}

$(document).on('change', '.ddPaymentCategory', function () {
    doOrdering()
});

function doOrdering() {
    var options = $('.ddPaymentCategory:eq(' + crnwTR.index() + ') option');
    var values = $.map(options, function (option) {
        return option.value
    });

    var ctr = 0;
    var index = $('.ddPaymentCategory:eq(' + crnwTR.index() + ') option:selected').index();
    var category = $('.ddPaymentCategory:eq(' + crnwTR.index() + ') option:selected').val();
    for (var i = 0; i < values.length; i++) {
        var val = values[i];
        if (val == category) {
            ctr++;
            if (i == index)
                break;
        }
    }
    setGridData(`nwGridMiscellaneousFee`, ``, SPR_ORDERING, crnwTR.index(), ctr);
}

function LoadCombo(objtext, id) {
    $('#' + id).prepend("<option value='' selected='selected'></option>");

    for (var i = 0; i < objtext.length; i++) {
        var option = document.createElement("OPTION");
        switch (id) {
            case "ddInventoryGroup": option.innerHTML = objtext[i].InventoryGroupDesc; option.value = objtext[i].InventoryGroup; break;
            case "ddProductType": option.innerHTML = objtext[i].ProductTypeDesc; option.value = objtext[i].ProductType; break;
            case "ddPhaseTower": option.innerHTML = objtext[i].PhaseDesc; option.value = objtext[i].PhaseCode; break;
            case "ddModel": option.innerHTML = objtext[i].ModelDesc; option.value = objtext[i].ModelCode; break;
            case "ddInventoryType": option.innerHTML = objtext[i].InventorytypeDesc; option.value = objtext[i].InventorytypeCode; break;
            case "ddInventoryClass": option.innerHTML = objtext[i].InventoryClassDesc; option.value = objtext[i].inventoryclass; break;
            case "ddPaymentCategory": option.innerHTML = objtext[i].Description; option.value = objtext[i].Code; break;
            case "ddSpotCashDiscount": option.innerHTML = objtext[i].Description.toFixed(2); option.value = objtext[i].Code.toFixed(2); break;
        }
        //if (tag = 1) 
        //    $('.' + id).append(option);
        //else 
        $('#' + id).append(option);

    }
}



function MiscellaneousDetails() {
    $('#custom1').remove();
    $('#nwGridPaymentTermDetails .nwgridButtons').append("<div class='nwgrid_buttonsCon' id='custom'><button id='btnPaymentTermGroup' style=' border-radius: 5px; font-size: 11px; background:linear-gradient(to bottom, #1674c1 0%, #1674c1 100%);'>SELECT PAYMENT TERM GROUP</button></div>");
    $('#nwGridPaymentTermDetails .nwgridButtons').append("<div class='nwgrid_buttonsCon' id='custom'><button id='btnMiscellaneousDetails' style='font-family: Century Gothic; border-radius: 5px; font-size: 11px;'>MISCELLANEOUS DETAILS</button></div>");
    $('#btnPaymentTermGroup').enable(false);
    $('#btnMiscellaneousDetails').enable(false);
    $('#btnPaymentTermGroup').css({ 'background-color': '', 'color': '' });
    $('#btnMiscellaneousDetails').css({ 'background-color': '', 'color': '' });

}

function LoadCoBuyerDetails() {
    $('#custom2').remove();
    $('#nwGridCoBuyer .nwgridButtons').append("<div class='nwgrid_buttonsCon' id='custom2'><button id='btnLoadCoBuyerDetails' style='font-family: Verdana; border-radius: 5px; font-size: 11px'>LOAD CO-BUYER DETAILS</button></div>");
    $('#btnLoadCoBuyerDetails').enable(false);
    $('#btnLoadCoBuyerDetails').css({ 'background-color': '', 'color': '' });
}


/**************** EVENT *****************************///

$(document).on("click", "#btnGenerate", function (e) {
    var reservDate = $('#txtReservationDate').val();
    $('#lblReservationDate').text(reservDate);

    const isNull = val => val === 'null';

    /*Customer Details*/
    var custName = $('#descvallugClient').val();
    var unitCode = getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitDesc, 0);
    var unitType = getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_InventoryType, 0);
    var unitClass = getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_InventoryClass, 0);
    var lotaArea = (isNull(getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_LotArea, 0)) ? 0 : getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_LotArea, 0)) + '/' + getGridDataPerLine(`nwGridUnitDetails`, ``, SPR_UnitDetails_FloorArea, 0);

    $('#lblRegisteredName').text(custName);
    $('#lblUnitCode').text(unitCode);
    $('#lblUnitType').text(unitType);
    $('#lblUnitClass').text(unitClass);
    $('#lblLotArea').text(lotaArea);

    /* Contract Details */
    var sellingPrice = $('#txtSellingPrice').val();
    var vatAmount = $('#txtVatAmount').val();
    var grossSellingPrice = $('#txtGrossSellingPrice').val();
    var misc = $('#txtMisc').val();
    var tcp = $('#txtTCP').val();
    var salesdisc = $('#txtSalesDiscountAmount').val();
    var dpdisc = $('#txtDPDiscount').val();
    var ntcp = $('#txtNTCP').val();
    var ft = $('#descvallugFinancingType').val();
    var ftcode = $('#idvallugFinancingType').val();
    var IsChecked = $('#chkFixedInterest').prop('checked');

    $('#lblSellingPrice').text(sellingPrice);
    $('#lblVat').text(vatAmount);
    $('#lblGrossSellingPrice').text(grossSellingPrice);
    $('#lblMisc').text(misc);
    $('#lblTCP').text(tcp);
    $('#lblSalesDisc').text(salesdisc);
    $('#lblDPDisc').text(dpdisc);
    $('#lblNetContractPrice').text(ntcp);
    $('#lblFinancingType').text(ft);


    nwLoading_Start("actAmortization", crLoadingHTML);

    nwParameter_Add('sellingPrice', sellingPrice);
    nwParameter_Add('vatAmount', vatAmount);
    nwParameter_Add('grossSellingPrice', grossSellingPrice);
    nwParameter_Add('misc', misc);
    nwParameter_Add('tcp', tcp);
    nwParameter_Add('salesdisc', salesdisc);
    nwParameter_Add('dpdisc', dpdisc);
    nwParameter_Add('ntcp', ntcp);
    nwParameter_Add('ft', ft);
    nwParameter_Add('ftcode', ftcode);
    nwParameter_Add(`chkFixedInterest`, IsChecked);
    nwParameter_Add(`txtVatrate`, $('#txtVatrate').val());

    nwParameter_Add_Table(`nwGridPaymentTermDetailsCon`, false);
    nwParameter_Add('jsonTermDetails', html2json('nwGridTermDetails'));
    nwParameter_Add(`Branch`, $('#idvallugBranchProject').val());

    var misc = parseFloat(getGridDataPerLine('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_MiscInstallment, 0).split(',').join('')) || 0;
    nwParameter_Add(`Misc`, misc);
    nwParameter_Add(`txtMisc`, $('#txtMisc').val());


    var reservdate = $('#txtReservationDate').val();
    var IsChecked = $('#chkFixedInterest').prop('checked');
    var expirationdate = $('#txtExpirationDate').val();

    nwParameter_Add('idvallugClient', $('#idvallugClient').val());
    nwParameter_Add(`ReservationDate`, reservdate);
    nwParameter_Add(`ExpirationDate`, expirationdate);
    nwParameter_Add('txtDPStartDate', $('#txtDPStartDate').val());
    nwParameter_Add('txtBalStartDate', $('#txtBalStartDate').val());

    var totaldp = 0.00;
    var totalbal = 0.00;
    isfirstDP = true;
    var isDiscountChecked = false;
    var paymentCat = '';
    //var dpRate = 0.00;

    var dpdiscMisc = 0.00;
    var dpdiscPrin = 0.00;
    var count = $(`#nwGridPaymentTermDetails-nwData tr`).length;
    for (i = 0; i < count; i++) {
        paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, `dd`, SPR_PaymentTermDetails_PaymentCategory, i) || '';

        if (paymentCat.toUpperCase() == 'DOWNP') {
            totaldp += (parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetContractPrice, i).split(`,`).join(``))) || 0.00;
            //dpRate += parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, i)) || 0.00;
            isDiscountChecked = $('#nwGridPaymentTermDetailsCon tr:eq(' + (i + 1) + ') td:eq(' + SPR_PaymentTermDetails_DPDiscount + ') input').prop('checked');
            dpdiscMisc += (parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscMisc, i).split(`,`).join(``))) || 0.00;
            dpdiscPrin += (parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscPrin, i).split(`,`).join(``))) || 0.00;
        }
        if (paymentCat.toUpperCase() == 'BALANC') {
            totalbal += (parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetContractPrice, i).split(`,`).join(``))) || 0.00;
        }
    }
    nwParameter_Add('isDiscountChecked', isDiscountChecked);
    nwParameter_Add('idvallugLocWithAccntblForms', $('#idvallugLocWithAccntblForms').val());
    nwParameter_Add('dpDiscount', $('#txtDPDiscount').val());
    nwParameter_Add('dpdiscMisc', dpdiscMisc);
    nwParameter_Add('dpdiscPrin', dpdiscPrin);

    var misc = parseFloat(getGridDataPerLine('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_MiscInstallment, 0).split(',').join('')) || 0;

    var disctag = 0;
    var discountamount = parseFloat(getGridDataPerLine('nwGridDiscount', '', SPR_Discount_DiscountAmt, 0).split(',').join('')) || 0.00;
    if (getGridDataPerLine('nwGridDiscount', 'dd', SPR_Discount_BasisOfDiscount, 0) == 'SP' && discountamount > 0)
        disctag = 1;
    else if (getGridDataPerLine('nwGridDiscount', 'dd', SPR_Discount_BasisOfDiscount, 0) == 'TCP' && discountamount > 0)
        disctag = 2;
    else
        disctag = 0;

    nwParameter_Add('disctag', disctag);
    nwParameter_Add('discountamount', discountamount);


    var reservMisc = 0;
    var dpctr = 1;
    var tmp = 0.00;
    $('#nwGridPaymentTermDetails-nwData tr').each(function (i, n) {
        var $row = $(n);
        var category = $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val()
        if (category == 'RESRV') {
            tmp = parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_MiscInstallment + ')').text().split(',').join('')) || 0.00;
        }
        if (dpctr == 1 && category == 'DOWNP') {
            reservMisc = tmp;
            dpctr++;
        }
    });

    var z = new TCPDiscount(0, 0, 0, 0);
    nwParameter_Add('ddbasis', z.ddbasis);
    nwParameter_Add('ddapp', z.ddapp);
    if (z.ddbasis == 'SP' && z.ddapp == 'TCP') {
        nwParameter_Add('sp', parseFloat(z.spVATIN) || 0.00);
        //nwParameter_Add('dcmisc', parseFloat(z.miscVATIN) || 0.00);
    }
    else {
        nwParameter_Add('sp', parseFloat(z.sp) || 0.00);

    }
    nwParameter_Add('dcmisc', (parseFloat(z.misc) || 0));// + (parseFloat($fn().dpDiscMiscAllocation()) || 0));
    nwParameter_Add('reservMisc', reservMisc);
    nwParameter_Add('idvallugFinancingType', $('#idvallugFinancingType').val());

    if (isSpecial != null && isSpecial != '')
        nwParameter_Add('tag', 1);
    else
        nwParameter_Add('tag', 0);

    nwParameter_Add('txtNTCP', $('#txtNTCP').val());

    nwParameter_Add('txtSellingPrice', parseFloat($('#txtSellingPrice').val().split(',').join('')) - (sumTotalDiscountSP() + dpdiscPrin));
    nwParameter_Add_DataSet("nwGridPaymentTermDetails");

    nwParameter_Add(`ReservationControlNo`, $("#txtReservationControlNo").val());

    func_ActionDriven(`actAmortization`, false);

    return false;
});



$(document).on('change', '#chkLumpSum', function (e) {
    ToggleLumpSum(0);
});



$(document).on('focusin', '.txtDiscountRate', function (e) {
    globaldiscountrate = parseFloat($(this).val()) || 0;
});

$(document).on('change blur', '.txtDiscountRate', function (e) {
    globalindex = $(this).index(this);
    globaltag = 'DiscountRate';
    ResetQuestion(3);
    //DiscountComputation($(this).val());
    //var sp = parseFloat($('#txtSellingPrice').val().split(',').join(''));
    //var rate = $(this).val()
    //var discAmount = sp * (rate / 100);

    //setGridData(`nwGridDiscount`, ``, SPR_Discount_DiscountAmt, crnwTR.index(), nwCurrency(discAmount));

    //var monthlyPayment = 0.0;
    //var noOfPayments = 0;
    //var termAmount = 0.00;
    //var interest = 0.00;
    //var future = 0;
    //var beginning = 0;
    //var dpCtr = 1;
    //var balCtr = 1;

    //$('#nwGridPaymentTermDetails-nwData tr').each(function (i, n) {
    //    var $row = $(n);
    //    var z = '';
    //    var category = $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val();

    //    if (category != 'RESRV' && category!=undefined) {
    //        z = new ReCompute(
    //            $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val(),
    //            parseFloat($('#txtGrossSellingPrice').val().split(',').join('')) || 0.00,
    //            parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_ContractRate + ') input').val()) || 0.00,
    //            parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_MiscInstallment + ')').text().split(',').join('')) || 0.00,
    //            1,
    //            parseInt($row.find('td:eq(' + SPR_PaymentTermDetails_Ordering + ')').text()) || 0.00,
    //            parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ') input').val().split(',').join('')) || 0.00,
    //            discAmount,
    //            parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_DPDiscountAmount + ') input').val().split(',').join('')) || 0.00,
    //            $('#idvallugFinancingType').val(),
    //            parseInt($row.find('td:eq(' + SPR_PaymentTermDetails_NoOfPayments  + ')').text()) || 0.00,
    //            parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_InterestRate + ')').text().split(',').join(''))/100
    //        );

    //        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, i, nwCurrency(parseFloat(z.salesDiscount) || 0.00));
    //        setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, i, nwCurrency(parseFloat(z.dpDiscountAmount) || 0.00));
    //        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetContractPrice, i, nwCurrency(parseFloat(z.netContractPrice) || 0.00));

    //        //Computation Monthly
    //        noOfPayments=parseInt($row.find('td:eq(' + SPR_PaymentTermDetails_NoOfPayments + ')').text()) || 0.00;
    //        termAmount = parseFloat(z.netContractPrice) || 0.00;
    //        interest = parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_InterestRate + ')').text().split(',').join('')) / 100;

    //        if (category == 'DOWNP') {
    //            monthlyPayment = termAmount / noOfPayments;

    //            if (dpCtr == 1) 
    //                $('#txtMonthlyDP').val(nwCurrency(parseFloat(monthlyPayment) || 0.00));
    //            dpCtr++;
    //        }
    //        else if (category == 'BALANC') {
    //            monthlyPayment = (-pmt(interest / 12,   // Annual interest into months
    //                   noOfPayments,      // Total months for life of loan
    //                   termAmount,
    //                   future,
    //                   beginning)).toFixed(0).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

    //            if (balCtr == 1)
    //                $('#txtMonthlyAmortization').val(nwCurrency(parseFloat(monthlyPayment) || 0.00));

    //            balCtr++;

    //        }
    //        else {
    //            monthlyPayment = termAmount;
    //        }

    //        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPayment, i, nwCurrency(parseFloat(monthlyPayment) || 0.00));
    //    }
    //});

    //SumAllHeader();

    //var z = new Compute(
    //     parseFloat($('#txtGrossSellingPrice').val().split(',').join('')) || 0.00,
    //     //parseFloat(getGridDataPerLine('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_MiscInstallment, 0).split(',').join('')) || 0.00,
    //    parseFloat($('#txtMisc').val().split(',').join('')) || 0.00,
    //     discAmount,
    //     parseFloat(getGridDataPerLine('nwGridPaymentTermDetails', 'input', SPR_PaymentTermDetails_DPDiscountAmount, 0).split(',').join('')) || 0.00
    //     );

    ////$('#txtMisc').val(nwCurrency(z.miscInstallment));
    //$('#txtTCP').val(nwCurrency(z.totalContractPrice));
    //$('#txtSalesDiscountAmount').val(nwCurrency(z.salesDiscountAmount));
    //$('#txtDPDiscount').val(nwCurrency(z.dpDiscount));
    //$('#txtNTCP').val(nwCurrency(z.netContractPrice));
});

$(document).on('change blur', '.clsOcyAmount', function (e) {
    $portal().populateLocalHomeAmount($(this).closest('tr').index());
    return false;
});


$(document).on('change', '#txtDPStartDate', function (e) {
    var dpdate = $(this).val();
    ChangeDPDate(dpdate);
    return false;
});

$(document).on('change', '#txtBalStartDate', function (e) {
    var baldate = $(this).val();
    ChangeBalDate(baldate);
    return false;
});

$(document).on('click', '#btnLoadCoBuyerDetails', function (e) {
    nwLoading_Start("actbtnLoadCoBuyerDetails", crLoadingHTML);
    cust_GetPara();
    func_ActionDriven("actbtnLoadCoBuyerDetails", false);
    return false;
});


$(document).on('focusin', '.clsCategory', function (e) {
    oldCategory = $(this).val();
});

function CheckingIfPaymentCategoryAlreadyExists(val) {
    var errorResult = '';

    var cnt = $('#nwGridPaymentTermDetails-nwData tr').length;
    for (i = 0; i < cnt; i++) {
        var paymentCategory = $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') select').val();

        if (paymentCategory != '' && paymentCategory != undefined) {
            if (i != crnwTR.index()) {
                if (paymentCategory == val
                    && (paymentCategory == 'RESRV' || paymentCategory == 'BALANC' || paymentCategory == 'SPOT')
                    ) {
                    errorResult += 'Cannot be inserted. Duplicate Payment Category. \n';
                }

                if (i > crnwTR.index() && paymentCategory == val && paymentCategory == 'DOWNP') {
                    errorResult += 'Cannot be continued. Insert below downpayment. \n';
                }
            }
        }
    }
    return errorResult;
}

$(document).on('change', '.clsCategory', function (e) {
    var errorResult = CheckingIfPaymentCategoryAlreadyExists($(this).val());
    if (errorResult != '') {
        MessageBox(errorResult, pagetitle);
        $('.clsCategory:eq(' + (crnwTR.index() - 1) + ')').val(oldCategory);
    }
    else if (!$('#chkFixedInterest').is(':checked')) {
        ResetQuestion(0);
    }
    UpdateOrdering();
    ToggleLumpSum(1);
    return false;
    //    //var val = $(this).val();
    //    //try {
    //    //    if(val.length>0){
    //    //        nwLoading_Start("actAfterPaymentCategory", crLoadingHTML);
    //    //        cust_GetPara();

    //    //        if (val.toUpperCase() == 'DOWNP') {
    //    //            $('#nwGridPaymentTermDetails-nwData tr:eq(' + crnwTR.index() + ' ) td:eq(' + SPR_PaymentTermDetails_DPDiscount + ') input').enable(true);
    //    //            $('#nwGridPaymentTermDetails-nwData tr:eq(' + crnwTR.index() + ' ) td:eq(' + SPR_PaymentTermDetails_DPDiscount + ')').css('background-color', '');
    //    //        }
    //    //        else if (val != '') {
    //    //            $('#nwGridPaymentTermDetails-nwData tr:eq(' + crnwTR.index() + ' ) td:eq(' + SPR_PaymentTermDetails_DPDiscount + ') input').enable(false);
    //    //            $('#nwGridPaymentTermDetails-nwData tr:eq(' + crnwTR.index() + ' ) td:eq(' + SPR_PaymentTermDetails_DPDiscount + ')').css('background-color', 'gainsboro');
    //    //        }
    //    //        func_ActionDriven("actAfterPaymentCategory", false);
    //    //    }
    //    //}
    //    //catch(e) {
    //    //}
});





$(document).on('click', '#btnMiscellaneousDetails', function () {

    nwLoading_Start("actMiscellaneous", crLoadingHTML);

    nwParameter_Add("jsonMisc", JSON.stringify(jsonMisc));
    ResetGrid('nwGridMiscellaneousFee');
    var paymentCategory = html2json('nwGridTermDetails');
    //var z = $.grep(JSON.parse(paymentCategory), function (n, i) {
    //    //return (n.Code != 'RESRV')
    //});

    nwParameter_Add_Table(`nwGridPaymentTermDetailsCon`, false);
    nwParameter_Add("paymentCategory", paymentCategory);//JSON.stringify(z));
    nwParameter_Add("isFixInt", $('#chkFixedInterest').is(':checked'));
    nwParameter_Add("txtGrossSellingPrice", $('#txtGrossSellingPrice').val());
    nwParameter_Add_DataSet("nwGridPaymentTermDetails");
    nwPopupForm_ShowModal("nwMiscellaneousDtls");
    func_ActionDriven("actMiscellaneous", false);


    return false;

});


$(document).on('click', '#btnPaymentTermGroup', function () {
    nwParameter_Add(`idvallugFinancingType`, $('#idvallugFinancingType').val());
    nwParameter_Add(`idvallugBranchProject`, $('#idvallugBranchProject').val());
    nwParameter_Add(`txtReservationDate`, $('#txtReservationDate').val());
    var reservAmount = 0.00;
    $('#nwGridPaymentTermDetailsData tr:gt(1)').each(function (i, x) {
        if ($(this).find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val() == 'RESRV') {
            reservAmount = parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_NetContractPrice + ')').text().split(',').join('')) || 0.00;
        }
    });
    nwParameter_Add(`reservAmount`, reservAmount);
    nwParameter_Add(`txtMisc`, $('#txtMisc').val());
    lookUpCustomize(`lugPaymentTermGrouping`, 1);
    return false;
})

$(document).on('click', '#btnSaveMiscellaneous', function () {
    var errorResult = '';
    var MiscellaneousType = '', AllocationType = '', PaymentCategory = '', MiscellaneousDate = '', MiscellaneousAmount = '';
    var ctr = 1;
    var totalMiscellaneousAmount = 0.00;
    var rowNo = nwGridMainCon_Book_MiscType.ActiveSheet.GetMaxRow();

    for (var i = 0; i < rowNo ; i++) {

        MiscellaneousType = nwGridMainCon_Book_MiscType.ActiveSheet.GetText(0, i)
        AllocationType = nwGridMainCon_Book_MiscType.ActiveSheet.GetText(1, i)
        PaymentCategory = nwGridMainCon_Book_MiscType.ActiveSheet.GetText(2, i)
        MiscellaneousDate = nwGridMainCon_Book_MiscType.ActiveSheet.GetText(3, i)

        if (MiscellaneousType == '') {
            errorResult += 'Cannot be saved. Miscellaneous Type is required at row ' + ctr + '. \n';
        }

        if (AllocationType == '') {
            errorResult += 'Cannot be saved. Allocation Type is required at row ' + ctr + '. \n';
        }

        if (PaymentCategory == '') {
            errorResult += 'Cannot be saved. Payment Category is required at row ' + ctr + '. \n';
        }

        if (MiscellaneousDate == '') {
            errorResult += 'Cannot be saved. Miscellaneous Date is required at row ' + ctr + '. \n';
        }


    }




    if (errorResult != '') {
        MessageBox(errorResult, pagetitle);
        return;
    }
    else {
        //SaveJSON();
        $fn().saveJSON();
        MessageBox("Saved successfully", "Miscellaneous Fees Details");
        nwPopupForm_Hide("nwMiscellaneousDtls")

    }

    return false;
});

$(document).on('change', '.txtContractRate', function () {

    var disctag = 0;

    if (parseFloat($('#txtCashAmount').val().split(',').join('')) > 0)
        disctag = 1
    else
        disctag = 0;
    var ordering = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_Ordering, $('.txtContractRate').index(this)));
    //if (jsonMisc[0].MiscellaneousAmount != '') {
    //    SetDefaultMiscInstallment();
    //}
    ResetGrid(`nwGridDiscount`);
    doCompute(0);
    doReCompute(0, $('.txtContractRate').index(this), disctag);
})

$(document).on('change', '.txtTermAmount', function () {
    var disctag = 0;
    if (parseFloat($('#txtCashAmount').val().split(',').join('')) > 0)
        disctag = 1
    else
        disctag = 0;
    //if (jsonMisc[0].MiscellaneousAmount != '') {
    //    SetDefaultMiscInstallment();
    //}
    ResetGrid(`nwGridDiscount`);
    doCompute(0);
    doReCompute(1, $('.txtTermAmount').index(this), disctag);
})



/*************** FUNCTION **************************///
function doReCompute(tag, i, disctag) {

    var isFixInt = $('#chkFixedInterest').is(':checked');
    var totalMiscAmt = parseFloat($('#txtMiscAmt').val().split(',').join(''));
    var financingType = $('#idvallugFinancingType').val();
    var xy_misc = 0;
    var salesdiscount = 0.00;
    if (disctag == 1)
        salesdiscount = parseFloat($('#txtCashAmount').val().split(',').join('')) || 0.00;
    else
        salesdiscount = parseFloat(getGridDataPerLine(`nwGridDiscount`, ``, SPR_Discount_DiscountAmt, 0).split(',').join('')) || 0.00;


    var discAmountSP = parseFloat($(`#nwGridDiscount-nwData tr:eq(0) td:eq(${SPR_Discount_DiscountMSC})`).text().split(',').join('')) || 0;
    var discAmountMSC = parseFloat($(`#nwGridDiscount-nwData tr:eq(0) td:eq(${SPR_Discount_DiscountMSC})`).text().split(',').join('')) || 0;

    if (isFixInt) {
        //var Misc = $.grep(jsonMisc, function (n, i) {
        //    return (n.MiscellaneousType != '')
        //});


        var objtext = jsonMisc;
        var x_PaymentCat = $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val();
        var x_contractRate = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, i)) || 0.00;

        if (jsonMisc != null || jsonMisc.length > 0) {
            jsonMisc = [];

            for (x = 0; x < objtext.length; x++) {
                var Misc = {};
                var term = objtext[x];
                var x_misc = 0;

                if (x_PaymentCat == term.PaymentCategory) {
                    x_misc = totalMiscAmt * (x_contractRate / 100);
                    xy_misc = x_misc;
                } else {
                    x_misc = term.MiscellaneousAmount;
                }

                Misc["MiscellaneousType"] = term.MiscellaneousType;
                Misc["AllocationType"] = term.AllocationType;
                Misc["PaymentCategory"] = term.PaymentCategory;
                Misc["MiscellaneousDate"] = term.MiscellaneousDate;
                Misc["MiscellaneousAmount"] = x_misc;
                Misc["Ordering"] = term.Ordering;
                jsonMisc.push(Misc);
            }
        }
    } else {
        xy_misc = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, i).split(',').join('')) || 0.00;
    }

    var misctype = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousType, i);

    var z = new ReCompute(
        $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val(),
        parseFloat($('#txtGrossSellingPrice').val().split(',').join('')) || 0.00,
        parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, i)) || 0.00,
        xy_misc,
        tag,
        parseInt(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_Ordering, i)) || 0,
        parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, i).split(',').join('')) || 0.00,
        salesdiscount,
        parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, i).split(',').join('')) || 0.00,
        $('#idvallugFinancingType').val(),
        parseInt(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments, i)) || 0,
        parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_InterestRate, i)) / 100,
        parseFloat($('#txtCashAmount').val().split(',').join('')) || 0.00,
        misctype,
        0,
        0
        );

    var monthlyP = 0.00;
    if (isFixInt) {
        monthlyP = (parseFloat(z.netContractPrice) / parseFloat(parseInt(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments, i)) || 0)) + (parseFloat(z.netContractPrice) * (parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_InterestRate, i)) / 100) / 12);
    }
    else {
        monthlyP = z.monthly();
    }

    setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, i, nwCurrency(parseFloat(z.contractRate) || 0.00));
    setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, i, nwCurrency(parseFloat(z.termAmount) || 0.00));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, i, nwCurrency(parseFloat(z.misc) || 0.00));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_ContractAmount, i, nwCurrency(parseFloat(z.contractAmount) || 0.00));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, i, nwCurrency(parseFloat(z.salesDiscount) || 0.00));
    setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, i, nwCurrency(parseFloat(z.dpDiscountAmount) || 0.00));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetContractPrice, i, nwCurrency(parseFloat(z.netContractPrice) || 0.00));
    if (i != 0)
        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPayment, i, nwCurrency(parseFloat(monthlyP) || 0.00));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc, i, nwCurrency(parseFloat(z.monthlyWithoutMisc()) || 0.00));

    //SumAllHeader();
    doCompute(disctag);
    ChangeMonthlyDPandAmort();
}


function SetDefaultMiscInstallment() {
    var miscAmt = parseFloat($('#txtMiscAmt').val().split(',').join(''));
    var misc = 0.00;
    var reservMisc = 0.00;
    var balMisc = 0.00;

    $('#nwGridPaymentTermDetails-nwData tr').each(function (i, n) {
        var $row = $(n);
        var z = '';
        var category = $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val();
        var ctr = $row.find('td:eq(' + SPR_PaymentTermDetails_Ordering + ')').text();
        var contractRate = $row.find('td:eq(' + SPR_PaymentTermDetails_ContractRate + ') input').val();


        if (category == 'RESRV') {
            reservMisc = parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_MiscInstallment + ')').text().split(',').join('')) || 0.00;
            balMisc += reservMisc;
        }
        else if (category == 'DOWNP') {
            if (ctr == 1)//1st DP
                misc = (miscAmt * (contractRate / 100)) - reservMisc;
            else
                misc = (miscAmt * (contractRate / 100));
            balMisc += misc;
        }
        else if (category == 'BALANC')
            misc = miscAmt - balMisc;

        if (category != 'RESRV')
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, i, nwCurrency(parseFloat(misc) || 0.00));
    });
}

function CheckTableIfContainsData(type, gridID, column) {

    var elem = getGridElement(gridID, type, column);
    var data = '';
    var res = false;

    $.each(elem, function (idx, obj) {
        if (type == 'input')
            data += $(this).val();
        else
            data += $(this).text();
    });

    if (data.length > 0)
        res = true;
    return res;
}


function ChangeMonthlyDPandAmort() {
    var dpctr = 1;
    var balctr = 1;
    var dpMonthly = 0;
    var balMonthly = 0;

    $('#nwGridPaymentTermDetails-nwData tr').each(function (i, n) {
        var $row = $(n);
        var z = '';
        var category = $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val();

        if (category != 'RESRV' && category != undefined) {

            if (category == 'DOWNP' && dpctr == 1) {
                dpMonthly = parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_MonthlyPayment + ')').text().split(',').join('')) || 0.00;
                dpctr++;
            }
            else if (category == 'BALANC') {
                balMonthly = parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_MonthlyPayment + ')').text().split(',').join('')) || 0.00;
                balctr++;
            }
        }
    });

    $('#txtMonthlyDP').val(nwCurrency(parseFloat(dpMonthly) || 0.00));
    $('#txtMonthlyAmortization').val(nwCurrency(parseFloat(balMonthly) || 0.00));
}












function TCPDiscount(contractRate, totalmonthlypayment, term, miscReserv) {
    var obj = {};
    obj.ddbasis = $('.clsBasisOfDiscount option:selected').val();
    obj.ddapp = $('.clsDiscountApp option:selected').val();
    var rate = parseFloat($('.txtDiscountRate').val());
    var gross = parseFloat($('#txtGrossSellingPrice').val().split(',').join('')) || 0.00;
    var misc = parseFloat($('#txtMisc').val().split(',').join('')) || 0.00;
    var sp = parseFloat($('#txtSellingPrice').val().split(',').join('')) || 0.00;
    var vatrate = parseFloat($('#txtVatrate').val().split(',').join('')) || 0.00;
    var tcp = 0;
    var discount = 0.00;

    if (obj.ddbasis == 'SP' && obj.ddapp == 'TCP') {
        //amt = parseFloat($('#txtSellingPrice').val().split(',').join(''));
        //discVatEx = amt * (rate / 100);
        //var totaltcp = parseFloat($('#txtSellingPrice').val().split(',').join('')) + parseFloat($('#txtMisc').val().split(',').join(''));
        //var allocsp = (parseFloat($('#txtSellingPrice').val().split(',').join('')) / totaltcp);
        //var sp = (discVatEx * allocsp)
        //var misc = discVatEx - sp;
        //discAmount = sp * (1 + (vatrate / 100)) + misc;
        var tcp = sp;
        discount = tcp * (rate / 100);
        obj.sp = (discount * (sp / (sp + misc)));
        obj.misc = discount - obj.sp;
        obj.spVATIN = (discount * (sp / (sp + misc))) * (1 + (vatrate / 100));
        obj.miscVATIN = discount = obj.miscVATIN;
        obj.monthly = totalmonthlypayment - ((((misc - obj.misc) * (contractRate / 100)) - miscReserv) / term);
    }
    else if (obj.ddbasis == 'TCP' && obj.ddapp == 'TCP') {
        tcp = parseFloat($('#txtTCP').val().split(',').join('')) || 0.00;
        discount = tcp * (rate / 100);
        obj.sp = ((gross / tcp) * discount);
        obj.misc = discount - obj.sp;
        obj.monthly = totalmonthlypayment - ((((misc - obj.misc) * (contractRate / 100)) - miscReserv) / term);//(totalmonthlypayment - (((misc - obj.misc) * (contractRate / 100)) - miscReserv)) / term;   
    }
    else if (obj.ddbasis == 'TCP' && obj.ddapp == 'SP') {
        tcp = sp + misc;
        discount = ((tcp * (rate / 100)) * (1 + (vatrate / 100)));
        obj.sp = discount;
        obj.misc = discount - obj.sp;
        //obj.monthly = (totalmonthlypayment - ((misc - obj.misc) * (contractRate / 100))) / term;
        obj.monthly = totalmonthlypayment - ((((misc - obj.misc) * (contractRate / 100)) - miscReserv) / term)
    }
    else if (obj.ddbasis == 'SP' && obj.ddapp == 'SP') {
        tcp = gross;
        discount = tcp * (rate / 100);
        obj.sp = discount;
        obj.misc = discount - obj.sp;
        obj.monthly = totalmonthlypayment - ((((misc - obj.misc) * (contractRate / 100)) - miscReserv) / term);
    }
    return obj;
}


function InitalizeJSON() {
    jsonMisc = [];
    var Misc = {};
    Misc["MiscellaneousType"] = '';
    Misc["AllocationType"] = '';
    Misc["PaymentCategory"] = '';
    Misc["MiscellaneousDate"] = '';
    Misc["MiscellaneousAmount"] = '';
    Misc["Ordering"] = '';
    jsonMisc.push(Misc);
}




function LoadDefaultTerm(dt) {
    ClearFields(2);

    var objtext = JSON.parse(dt);
    var isFixInt = $('#chkFixedInterest').is(':checked');
    var totalMiscAmt = parseFloat($('#txtMiscAmt').val().split(',').join(''));
    var reserveAmount = 0;

    if (dt != null || dt.length > 0) {

        if (objtext.length > 2) {
            nwGrid_AddRow(`nwGridPaymentTermDetails`, objtext.length - 2);
        }
        jsonMisc = [];
        for (i = 0; i < objtext.length; i++) {
            var Misc = {};
            var term = objtext[i];

            var monthlyP = 0.00;
            if (isFixInt) {
                monthlyP = (parseFloat(term.ContractAmount) / parseFloat(term.TotalNoPayments)) + (parseFloat(term.ContractAmount) * (parseFloat(term.InterestRate) / 100) / 12);
            }
            else {
                monthlyP = term.MonthlyDp;
            }

            if (term.PaymentCategory == 'DOWNP' && term.Ordering == 1) {
                $('#txtDPStartDate').val(term.StartDate);
                $('#txtMonthlyDP').val(nwCurrency(parseFloat(term.MonthlyDp) || 0.00));
            }

            if (term.PaymentCategory == 'BALANC' && term.Ordering == 1) {
                $('#txtBalStartDate').val(term.StartDate);
                $('#txtMonthlyAmortization').val(nwCurrency(parseFloat(monthlyP) || 0.00));
            }



            $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') select').val(term.PaymentCategory);

            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentTermCode, i, term.Code == null ? '' : term.Code);
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PaymentTermDesc, i, term.Description == null ? '' : term.Description);
            setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, i, nwCurrency(parseFloat(term.ContractRate) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, i, nwCurrency(parseFloat(term.TermAmount) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, i, nwCurrency(parseFloat(term.Misc) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_ContractAmount, i, nwCurrency(parseFloat(term.ContractAmount) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, i, nwCurrency(parseFloat(term.SalesDiscount) || 0.00));

            if (term.PaymentCategory == 'DOWNP') {
                if (term.DPDisc == 1) {
                    $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_DPDiscount + ') input').prop('checked', true)
                    LoadAmountFormat($('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_DPDiscountRate + ') input').prop("disabled", false), 2);
                    //LoadAmountFormat(crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscountRate}) input`).prop("disabled", false), 2);
                    $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_DPDiscountRate + ')').css(`background-color`, `white`);
                    LoadAmountFormat($('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_DPDiscountAmount + ') input').prop("disabled", false), 12);
                    //LoadAmountFormat(crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscountAmount}) input`).prop("disabled", false), 12);
                    $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_DPDiscountAmount + ')').css(`background-color`, `white`);
                }
                else {
                    $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_DPDiscount + ') input').prop('checked', false);
                    $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_DPDiscountRate + ') input').prop('disabled', true);
                    $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_DPDiscountRate + ')').css(`background-color`, `gainsboro`);
                    $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_DPDiscountAmount + ') input').prop('disabled', true);
                    $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_DPDiscountAmount + ')').css(`background-color`, `gainsboro`);

                }
            }

            setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountRate, i, nwCurrency(parseFloat(term.DPDiscRate) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, i, nwCurrency(parseFloat(term.DPDiscAmount) || 0.00));
            curr_index = i;

            //$fn.computeNTCPAfterDPDisc();

            //$fn.computationDPMonthly();
            $fn().setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscPrin, i, nwCurrency($fn().dpDiscAllocationPerLine().prinAllocVatEx));
            $fn().setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscMisc, i, nwCurrency($fn().dpDiscAllocationPerLine().miscAllocVatEx));


            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetContractPrice, i, nwCurrency(parseFloat(term.NetContractPrice) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments, i, term.TotalNoPayments || 0);
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPayment, i, i == 0 ? '' : nwCurrency(parseFloat(monthlyP) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_InterestRate, i, nwCurrency(parseFloat(term.InterestRate) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_PenaltyRate, i, nwCurrency(parseFloat(term.PenaltyRate) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_StartDate, i, term.StartDate);
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_EndDate, i, term.EndDate);
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousDate, i, term.MiscellaneousDate);
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousType, i, term.MiscellaneousType);
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_AllocationType, i, term.AllocationType);
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousAmount, i, parseFloat(term.MiscellaneousAmount) || 0);
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_Ordering, i, term.Ordering);


            var monthlyWithoutMisc = 0.00;
            var financingType = $('#idvallugFinancingType').val();
            if (term.PaymentCategory == 'DOWNP') {
                monthlyWithoutMisc = (parseFloat(term.TermAmount)) / term.TotalNoPayments;
            }
            else if (term.PaymentCategory == 'BALANC') {
                if (financingType == 'SPOT' || financingType == 'BNK' || financingType == 'PIF') {
                    monthlyWithoutMisc = (parseFloat(term.TermAmount));
                }
                else if (isFixInt) {
                    var monthlymisc = (parseFloat(term.MiscellaneousAmount) / parseFloat(term.TotalNoPayments)) + (parseFloat(term.MiscellaneousAmount) * (parseFloat(term.InterestRate) / 100) / 12);
                    monthlyWithoutMisc = monthlyP - monthlymisc;
                }
                else {
                    monthlyWithoutMisc = (-pmt((term.InterestRate / 100) / 12,   // Annual interest into months
                           term.TotalNoPayments,      // Total months for life of loan
                          (parseFloat(term.TermAmount)),
                           0,
                           0)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                }
            }
            else {
                monthlyWithoutMisc = (parseFloat(term.TermAmount));
            }

            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc, i, nwCurrency(parseFloat(monthlyWithoutMisc.toString().split(',').join('')) || 0));


            if (term.PaymentCategory == 'DOWNP') {
                $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ' ) td:eq(' + SPR_PaymentTermDetails_DPDiscount + ') input').enable(true);
                $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ' ) td:eq(' + SPR_PaymentTermDetails_DPDiscount + ')').css('background-color', '');
            }
            else if (term.PaymentCategory != '') {
                $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ' ) td:eq(' + SPR_PaymentTermDetails_DPDiscount + ') input').enable(false);
                $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ' ) td:eq(' + SPR_PaymentTermDetails_DPDiscount + ')').css('background-color', 'gainsboro');
            }
            if (term.PaymentCategory != null) {
                if (isFixInt) {

                    if (term.PaymentCategory != 'RESRV') {
                        var miscAmount = totalMiscAmt * (term.ContractRate / 100);

                        Misc["MiscellaneousType"] = "AMORT";
                        Misc["AllocationType"] = "002";
                        Misc["PaymentCategory"] = term.PaymentCategory;
                        Misc["MiscellaneousDate"] = term.MiscellaneousDate;
                        Misc["MiscellaneousAmount"] = miscAmount;
                        Misc["Ordering"] = term.Ordering;
                        jsonMisc.push(Misc);
                    }
                }
                else {
                    if (term.PaymentCategory == 'RESRV') {
                        reserveAmount = term.MiscellaneousAmount;
                    }
                    if (parseFloat(term.MiscellaneousAmount) > 0) {
                        Misc["MiscellaneousType"] = term.MiscellaneousType;
                        Misc["AllocationType"] = term.AllocationType;
                        Misc["PaymentCategory"] = term.PaymentCategory;
                        Misc["MiscellaneousDate"] = term.MiscellaneousDate;
                        Misc["MiscellaneousAmount"] = term.MiscellaneousAmount;
                        Misc["Ordering"] = term.Ordering;
                        jsonMisc.push(Misc);
                    }
                }
            }
        }
    }
    $fn().doCompute();
    SumMonthlyPayments();

}

function UpdateOrdering() {
    var spotCnt = 0;
    var dpCnt = 0;
    var balCnt = 0;
    var reservCnt = 0;
    $('#nwGridPaymentTermDetails-nwData tr').each(function (i, n) {
        var $row = $(n);
        var category = $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val()
        if (category != undefined && category != '') {
            if (category == 'RESRV') {
                reservCnt++;
                $row.find('td:eq(' + SPR_PaymentTermDetails_Ordering + ')').text(reservCnt);
            }
            else if (category == 'DOWNP') {
                dpCnt++;
                $row.find('td:eq(' + SPR_PaymentTermDetails_Ordering + ')').text(dpCnt);
            }
            else if (category == 'BALANC') {
                balCnt++;
                $row.find('td:eq(' + SPR_PaymentTermDetails_Ordering + ')').text(balCnt);
            }
            else if (category == 'SPOT') {
                spotCnt++;
                $row.find('td:eq(' + SPR_PaymentTermDetails_Ordering + ')').text(spotCnt);
            }
        }
    })
}

function ToggleFixInt(tag) {
    var isChecked = $('#chkFixedInterest').prop('checked');

    if (isChecked) {
        $('#nwGridMiscellaneousFeeCon').enable(false);
    } else {
        $('#nwGridMiscellaneousFeeCon').enable(true);
    }

    var UnitCode = nwLib.nwTempTable_RowData_Get("nwGridUnitDetails", 0, SPR_UnitDetails_UnitCode);

    if (UnitCode != '') {
        msgBoxContainerQuestion = "actPopulateCategory";
        parent_MessageBoxQuestion("This will reset the Payment Term details. Do you wish to continue?", pagetitle, "Question");
        $('.message_Cancel').css('display', 'none')
        $('#dimMessageBox .BoxClose').css('display', 'none');
    }



}


function ToggleLumpSum(tag) {
    var isChecked = $('#chkLumpSum').prop('checked');

    $('#nwGridPaymentTermDetails-nwData tr').each(function (i, n) {
        var $row = $(n);
        var category = $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val()
        if ((category != undefined && category != 'RESRV' && category != '') || (tag == 1 && i != 0 && category != 'RESRV')) {
            if (isChecked) {
                $row.find('td:eq(' + SPR_PaymentTermDetails_ContractRate + ')').enable(true);
                $row.find('td:eq(' + SPR_PaymentTermDetails_ContractRate + ')').css('background-color', 'white');
                $row.find('td:eq(' + SPR_PaymentTermDetails_ContractRate + ') input').enable(true);

                $row.find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ')').enable(true);
                $row.find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ')').css('background-color', 'white');
                $row.find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ') input').enable(true);

            }
            else {
                $row.find('td:eq(' + SPR_PaymentTermDetails_ContractRate + ')').enable(false);
                $row.find('td:eq(' + SPR_PaymentTermDetails_ContractRate + ')').css('background-color', 'gainsboro');
                $row.find('td:eq(' + SPR_PaymentTermDetails_ContractRate + ') input').enable(false);

                $row.find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ')').enable(false);
                $row.find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ')').css('background-color', 'gainsboro');
                $row.find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ') input').enable(false);
            }
        }
    });

    if (isChecked)
        $('#btnPaymentTermGroup').enable(true);
    else
        $('#btnPaymentTermGroup').enable(false);
}

function ToggleEnableDisable(tag) {
    var financingType = $('#idvallugFinancingType').val();
    if (tag == 0) {
        if (financingType == 'SPOT') {
            $('#txtDPStartDate,#txtBalStartDate').val('');
            $('#txtDPStartDate,#txtBalStartDate').enable(false);
        }
        else if (financingType == 'DEF') {
            $('#txtDPStartDate').val('');
            $('#txtDPStartDate').enable(false);
            $('#txtBalStartDate').enable(true);
        }
        else
            $('#txtDPStartDate,#txtBalStartDate').enable(true);
    }
}

function SaveJSON() {
    jsonMisc = [];
    jsonMisc = JSON.parse(html2json('nwGridMiscellaneousFee'));
    PopulateMiscellaneousAmount();
    ResetGrid(`nwGridDiscount`);
    doCompute(0);
}

function html2json(id) {
    var rows = [];
    if (id == 'nwGridMiscellaneousFee') {
        $('#nwGridMiscellaneousFee-nwData tr').each(function (i, n) {
            var $row = $(n);
            rows.push({
                MiscellaneousType: $row.find('td:eq(' + SPR_MISC_MISCTYPE + ') option:selected').val(),
                AllocationType: $row.find('td:eq(' + SPR_ALLOCATIONTYPE + ') option:selected').val(),
                PaymentCategory: $row.find('td:eq(' + SPR_PAYMENTCATEGORY + ') option:selected').val(),
                MiscellaneousDate: $row.find('td:eq(' + SPR_MISCELLANEOUSDATE + ') input').val(),
                MiscellaneousAmount: parseFloat($row.find('td:eq(' + SPR_MISCELLANEOUSAMOUNT + ') input').val().replace(',', '')),
                Ordering: parseInt($row.find('td:eq(' + SPR_ORDERING + ')').text().replace(',', '')),
            });
        });
    }
    else if (id == 'nwGridTermDetails') {
        $('#nwGridPaymentTermDetails-nwData tr').each(function (i, n) {
            var $row = $(n);
            var z = $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val();
            if (z != undefined && z != '') {
                rows.push(
                    {
                        Code: $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val(),
                        Description: $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').text(),
                        MonthlyPayment: $row.find('td:eq(' + SPR_PaymentTermDetails_MonthlyPayment + ')').text(),
                        TermPeriod: $row.find('td:eq(' + SPR_PaymentTermDetails_NoOfPayments + ')').text(),
                        InterestRate: $row.find('td:eq(' + SPR_PaymentTermDetails_InterestRate + ')').text(),
                        PenaltyRate: $row.find('td:eq(' + SPR_PaymentTermDetails_PenaltyRate + ')').text(),
                        StartDate: $row.find('td:eq(' + SPR_PaymentTermDetails_StartDate + ')').text(),
                        EndDate: $row.find('td:eq(' + SPR_PaymentTermDetails_EndDate + ')').text()
                    });
            }
        });
    }
    else if (id == 'nwGridAmortization') {
        $('#nwGridAmortization-nwData tr').each(function (i, n) {
            var $row = $(n);
            //var z = $row.find('td:eq(' + SPR_Amortization_PaymentCatCode + ')').text();
            //if (z != undefined && z != '') {
            rows.push({
                PaymentCatCode: $row.find('td:eq(' + SPR_Amortization_PaymentCatCode + ')').text(),
                PaymentCatDesc: $row.find('td:eq(' + SPR_Amortization_PaymentCatDesc + ')').text(),
                PaymentNo: $row.find('td:eq(' + SPR_Amortization_PaymentNo + ')').text(),
                DueDate: $row.find('td:eq(' + SPR_Amortization_DueDate + ')').text(),
                TotalMonthlyPayment: $row.find('td:eq(' + SPR_Amortization_TotalMonthlyPayment + ')').text(),
                MonthlyAmortization: $row.find('td:eq(' + SPR_Amortization_MonthlyAmortization + ')').text(),
                Interest_F: $row.find('td:eq(' + SPR_Amortization_Interest_F + ')').text(),
                Interest: $row.find('td:eq(' + SPR_Amortization_Interest + ')').text(),
                InterestVat: $row.find('td:eq(' + SPR_Amortization_InterestVat + ')').text(),
                Principal_F: $row.find('td:eq(' + SPR_Amortization_Principal_F + ')').text(),
                Principal: $row.find('td:eq(' + SPR_Amortization_Principal + ')').text(),
                PrincipalVat: $row.find('td:eq(' + SPR_Amortization_PrincipalVat + ')').text(),
                PrincipalOutstanding: $row.find('td:eq(' + SPR_Amortization_PrincipalOutstanding + ')').text(),
                MonthlyMisc: $row.find('td:eq(' + SPR_Amortization_MonthlyMisc + ')').text(),
                InterestMisc_F: $row.find('td:eq(' + SPR_Amortization_InterestMisc_F + ')').text(),
                InterestMisc: $row.find('td:eq(' + SPR_Amortization_InterestMisc + ')').text(),
                InterestMiscVat: $row.find('td:eq(' + SPR_Amortization_InterestMiscVat + ')').text(),
                Miscellaneous_F: $row.find('td:eq(' + SPR_Amortization_Miscellaneous_F + ')').text(),
                Miscellaneous: $row.find('td:eq(' + SPR_Amortization_Miscellaneous + ')').text(),
                VatOnMisc: $row.find('td:eq(' + SPR_Amortization_VatOnMisc + ')').text(),
                MiscOutstanding: $row.find('td:eq(' + SPR_Amortization_MiscOutstanding + ')').text(),
                TotalOutstanding: $row.find('td:eq(' + SPR_Amortization_TotalOutstanding + ')').text(),
                PeriodNo: $row.find('td:eq(' + SPR_Amortization_PeriodNo + ')').text()
            });
            //}
        });
    }
    else if (id == 'nwGridAmortization2') {
        $('#nwGridAmortization-nwData tr').each(function (i, n) {
            var $row = $(n);
            //var z = $row.find('td:eq(' + SPR_Amortization_PaymentCatCode + ')').text();
            //if (z != undefined && z != '') {
            if (i != 0) {
                rows.push({
                    PaymentCatCode: $row.find('td:eq(' + SPR_Amortization_PaymentCatCode + ')').text(),
                    PaymentCatDesc: $row.find('td:eq(' + SPR_Amortization_PaymentCatDesc + ')').text(),
                    PaymentNo: $row.find('td:eq(' + SPR_Amortization_PaymentNo + ')').text(),
                    DueDate: $row.find('td:eq(' + SPR_Amortization_DueDate + ')').text(),
                    TotalMonthlyPayment: $row.find('td:eq(' + SPR_Amortization_TotalMonthlyPayment + ')').text(),
                    MonthlyAmortization: $row.find('td:eq(' + SPR_Amortization_MonthlyAmortization + ')').text(),
                    Interest_F: $row.find('td:eq(' + SPR_Amortization_Interest_F + ')').text(),
                    Interest: $row.find('td:eq(' + SPR_Amortization_Interest + ')').text(),
                    InterestVat: $row.find('td:eq(' + SPR_Amortization_InterestVat + ')').text(),
                    Principal_F: $row.find('td:eq(' + SPR_Amortization_Principal_F + ')').text(),
                    Principal: $row.find('td:eq(' + SPR_Amortization_Principal + ')').text(),
                    PrincipalVat: $row.find('td:eq(' + SPR_Amortization_PrincipalVat + ')').text(),
                    PrincipalOutstanding: $row.find('td:eq(' + SPR_Amortization_PrincipalOutstanding + ')').text(),
                    MonthlyMisc: $row.find('td:eq(' + SPR_Amortization_MonthlyMisc + ')').text(),
                    InterestMisc_F: $row.find('td:eq(' + SPR_Amortization_InterestMisc_F + ')').text(),
                    InterestMisc: $row.find('td:eq(' + SPR_Amortization_InterestMisc + ')').text(),
                    InterestMiscVat: $row.find('td:eq(' + SPR_Amortization_InterestMiscVat + ')').text(),
                    Miscellaneous_F: $row.find('td:eq(' + SPR_Amortization_Miscellaneous_F + ')').text(),
                    Miscellaneous: $row.find('td:eq(' + SPR_Amortization_Miscellaneous + ')').text(),
                    VatOnMisc: $row.find('td:eq(' + SPR_Amortization_VatOnMisc + ')').text(),
                    MiscOutstanding: $row.find('td:eq(' + SPR_Amortization_MiscOutstanding + ')').text(),
                    TotalOutstanding: $row.find('td:eq(' + SPR_Amortization_TotalOutstanding + ')').text(),
                    PeriodNo: $row.find('td:eq(' + SPR_Amortization_PeriodNo + ')').text()
                });
            }
            //}
        });
    }
    return JSON.stringify(rows);
}

function MiscProperties() {
    var element = $('#nwGridMiscellaneousFee-nwData tr td:nth-child(' + (SPR_MISCELLANEOUSAMOUNT + 1) + ') input');
    $.each(element, function (idx, obj) {
        LoadAmountFormat($(this), 18);
    });
}

function PopulateMiscellaneousAmount() {
    var ctr = 1;
    var category = '', amount = 0, miscType = '', miscDate = '', allocationType = '', ordering = 0;
    var dpctr = 0, balctr = 0;

    if (jsonMisc.length > 0) {
        var Misc = $.grep(jsonMisc, function (n, i) {
            return (n.MiscellaneousType != '')
        });

        ClearMiscellaneousInPaymentTermDetails();

        if (Misc.length > 0) {
            for (z = 0; z < Misc.length; z++) {
                category = Misc[z].PaymentCategory;
                amount = Misc[z].MiscellaneousAmount;
                miscType = Misc[z].MiscellaneousType;
                miscDate = Misc[z].MiscellaneousDate;
                allocationType = Misc[z].AllocationType;
                ordering = Misc[z].Ordering;
                //if (category == 'DOWNP') {
                //    dpctr++;
                //}

                //if (category == 'BALANC') {
                //    balctr++;
                //}

                ChangePaymentTermDetails(category, ordering, amount, miscType, miscDate, allocationType);
            }
        }
    }
}

function ClearMiscellaneous() {
    var cnt = $('#nwGridPaymentTermDetails-nwData tr').length;

    var disctag = 0;
    if (parseFloat($('#txtCashAmount').val().split(',').join('')) > 0)
        disctag = 1
    else
        disctag = 0;

    for (i = 0; i < cnt; i++) {
        var paymentCategory = $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') select').val();
        if (paymentCategory != '' && paymentCategory != undefined) {
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, i, '');
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousAmount, i, '');
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousDate, i, '');
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousType, i, '');
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_AllocationType, i, '');
            doReCompute(0, i, disctag);
        }
    }
}


function ClearMiscellaneousInPaymentTermDetails() {
    var z = '';
    var cnt = $('#nwGridPaymentTermDetails-nwData tr').length;
    var contractRate = 0;
    var gross = parseFloat($('#txtGrossSellingPrice').val().split(',').join('')) || 0;
    var reservAmount = 0.00;
    var category = '';
    for (i = 0; i < cnt; i++) {
        if (i != 0) {//not include first in payment term details

            category = (getGridDataPerLine('nwGridPaymentTermDetails', 'dd', SPR_PaymentTermDetails_PaymentCategory, i) || '');

            if (category != 'RESRV' && reservAmount > 0) {
                contractRate = parseFloat(getGridDataPerLine('nwGridPaymentTermDetails', 'input', SPR_PaymentTermDetails_ContractRate, i)) || 0.00,
                termAmount = (gross * (contractRate / 100)) - reservAmount
                setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, i, nwCurrency(termAmount));

            }

            z = new ComputeGrid(
                     getGridDataPerLine('nwGridPaymentTermDetails', 'dd', SPR_PaymentTermDetails_PaymentCategory, i) || '',
                     parseFloat(getGridDataPerLine('nwGridPaymentTermDetails', 'input', SPR_PaymentTermDetails_TermAmount, i).split(',').join('')) || 0.00,
                     parseFloat(getGridDataPerLine('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_ContractAmount, i).split(',').join('')) || 0.00,
                     //parseFloat(getGridDataPerLine('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_MiscInstallment, i).split(',').join('')) || 0.00,
                     (jsonMisc.filter(x=>x.PaymentCategory == 'RESRV').length > 0 ? parseFloat(jsonMisc.filter(x=>x.PaymentCategory == 'RESRV')[0].MiscellaneousAmount) : 0),

                     parseFloat(getGridDataPerLine('nwGridDiscount', 'input', SPR_Discount_DiscountRate, 0)) || 0.00,
                     parseFloat(getGridDataPerLine('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_DPDiscountAmount, i).split(',').join('')) || 0.00,
                     '',
                     parseFloat(getGridDataPerLine('nwGridPaymentTermDetails', 'input', SPR_PaymentTermDetails_ContractRate, i)) || 0.00
                );

            setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, i, nwCurrency(z.termAmount));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, i, nwCurrency(z.miscInstallment));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_ContractAmount, i, nwCurrency(z.contractAmount));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetContractPrice, i, nwCurrency(z.netContractPrice));

            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousAmount, i, 0);
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousDate, i, '');
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousType, i, '');
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_AllocationType, i, '');

            if (category == 'RESRV') {
                reservAmount = parseFloat(getGridDataPerLine('nwGridPaymentTermDetails', 'input', SPR_PaymentTermDetails_TermAmount, i).split(',').join('')) || 0.0;
            }
            else {
                reservAmount = 0.00;
            }

        }
    }
}

function ChangePaymentTermDetails(category, ctr, amount, miscType, miscDate, allocationType) {
    var cnt = $('#nwGridPaymentTermDetails-nwData tr').length;
    var dp = 0; var bal = 0;
    var termamount = 0, contractamount = 0;
    var contractRate = 0;
    var disctag = 0;
    if (parseFloat($('#txtCashAmount').val().split(',').join('')) > 0)
        disctag = 1
    else
        disctag = 0;

    //var reservAmount = 0.00;
    for (i = 0; i < cnt; i++) {
        var paymentCategory = $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') select').val();
        var ordering = $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_Ordering + ')').text();

        if ((paymentCategory == category && ordering == ctr)) {
            //if (category == 'RESRV') {
            //    var termamount = parseFloat($('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_ContractAmount + ')').text().split(',').join('')) || 0.00;
            //    reservAmount = termamount - amount;
            //    setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, i, nwCurrency(reservAmount));
            //}


            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, i, nwCurrency(amount));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousAmount, i, nwCurrency(amount));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousDate, i, miscDate);
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousType, i, miscType);
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_AllocationType, i, allocationType);
            //doReCompute(0, i, disctag);
        }
        //else if (paymentCategory== 'DOWNP' && ordering == 1) {
        //    var dpAmount = parseFloat($('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_TermAmount + ') input').val().split(',').join('')) || 0.00;
        //    setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, i, nwCurrency(dpAmount - reservAmount));
        //}

        doReCompute(0, i, disctag);
    }
}

function Compute(grossSellingPrice, misc, salesDiscountAmount, dpDiscount) {
    var obj = {};
    obj.miscInstallment = misc;
    obj.totalContractPrice = grossSellingPrice + obj.miscInstallment;
    obj.salesDiscountAmount = salesDiscountAmount;
    obj.dpDiscount = dpDiscount;
    obj.netContractPrice = obj.totalContractPrice - (obj.salesDiscountAmount + obj.dpDiscount);
    return obj;
}

function ComputeGrid(paymentCategory, termAmount, contractAmount, miscInstallment, salesDiscountRate, dpDiscountAmount, miscType, contractRate) {
    var obj = {};
    obj.miscInstallment = miscInstallment;// miscType == 'AMORT' ? miscInstallment * (contractRate / 100) : miscInstallment;
    if (paymentCategory == 'RESRV') {
        obj.contractAmount = contractAmount;
        obj.termAmount = obj.contractAmount - obj.miscInstallment;
    }
    else {
        obj.termAmount = termAmount;
        obj.contractAmount = obj.termAmount + obj.miscInstallment;
    }

    obj.salesDiscount = (obj.termAmount * (salesDiscountRate / 100));
    obj.dpDiscountAmount = dpDiscountAmount;
    obj.netContractPrice = obj.contractAmount - obj.salesDiscount - obj.dpDiscountAmount;
    return obj;
}

function doCompute(disctag) {

    var salesdiscount = 0.00;
    if (disctag == 1)
        salesdiscount = parseFloat($('#txtCashAmount').val().split(',').join('')) || 0.00;
    else
        salesdiscount = parseFloat(getGridDataPerLine(`nwGridDiscount`, ``, SPR_Discount_DiscountAmt, 0).split(',').join('')) || 0.00;


    SumAllHeader();


    var rowCanvas = nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetMaxRow()
    var tempval = 0;
    for (var i = 0; i < rowCanvas - 1; i++) {

        tempval += nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetValue(10, i)

    }

    var z = new Compute(
        parseFloat($('#txtGrossSellingPrice').val().split(',').join('')) || 0.00,
        //parseFloat(getGridDataPerLine('nwGridPaymentTermDetails', '', SPR_PaymentTermDetails_MiscInstallment, 0).split(',').join('')) || 0.00,
        parseFloat($('#txtMisc').val().split(',').join('')) || 0.00,
        salesdiscount,
        tempval
        );

    //$('#txtMisc').val(nwCurrency(z.miscInstallment));
    $('#txtTCP').val(nwCurrency(z.totalContractPrice));
    $('#txtSalesDiscountAmount').val(nwCurrency(z.salesDiscountAmount));
    $('#txtDPDiscount').val(nwCurrency(z.dpDiscount));
    $('#txtNTCP').val(nwCurrency(z.netContractPrice));
}

function SumAllHeader() {

    var elem = $('#nwGridPaymentTermDetails-nwData tr:gt(0)');//not include first row

    var contractRate = 0.00;
    var termAmount = 0.00;
    var misc = 0.00;
    var contractAmount = 0.00;
    var salesDiscount = 0.00;
    var discountRate = 0.00;
    var discountAmount = 0.00;
    var netContractPrice = 0.00;
    var noofPayment = 0.00;

    $.each(elem, function (idx, obj) {
        contractRate += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_ContractRate + ') input').val()) || 0.00;
        termAmount += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ') input').val().split(',').join('')) || 0.00;
        misc += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_MiscInstallment + ') ').text().split(',').join('')) || 0.00;
        contractAmount += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_ContractAmount + ') ').text().split(',').join('')) || 0.00;
        salesDiscount += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_SalesDiscount + ') ').text().split(',').join('')) || 0.00;
        discountRate += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_DPDiscountRate + ') input').val().split(',').join('')) || 0.00;
        discountAmount += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_DPDiscountAmount + ') input').val().split(',').join('')) || 0.00;
        netContractPrice += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_NetContractPrice + ') ').text().split(',').join('')) || 0.00;
        noofPayment += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_NoOfPayments + ') ').text().split(',').join('')) || 0;
    });

    setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, 0, nwCurrency(contractRate));
    setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, 0, nwCurrency(termAmount));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, 0, nwCurrency(misc));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_ContractAmount, 0, nwCurrency(contractAmount));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, 0, nwCurrency(salesDiscount));
    setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountRate, 0, nwCurrency(discountRate));
    setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, 0, nwCurrency(discountAmount));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetContractPrice, 0, nwCurrency(netContractPrice));
    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments, 0, noofPayment.toFixed(0));

}

function DiscountProperties() {

    var element = $('#nwGridDiscount-nwData tr td:nth-child(' + (SPR_Discount_DiscountRate + 1) + ') input');
    $.each(element, function (idx, obj) {
        LoadPercentageFormat2($(this));
    });
}

function pmt(rate_per_period, number_of_payments, present_value, future_value, type) {
    if (rate_per_period != 0.0) {
        // Interest rate exists
        //if ($('#chkFixedInterest').is(':checked')) {
        //    return -((present_value/number_of_payments) + (present_value*rate_per_period))
        //}
        //else {
        var q = Math.pow(1 + rate_per_period, number_of_payments);
        return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));
        //}



    } else if (number_of_payments != 0.0) {
        // No interest rate, but number of payments exists
        return -(future_value + present_value) / number_of_payments;
    }
    cust_GetPara();
    return 0;
}

function ChangeDPDate(dpdate, period, spotDay) {
    var ctr = 0;
    var balStartDate = '';
    var dpStartDate = '';
    if (dpdate.length > 0) {
        var timestamp = Date.parse(dpdate);
        if (isNaN(timestamp) == false) {
            var financingType = $('#idvallugFinancingType').val();
            if (financingType == 'DEF') {
                ctr = 1;
            }
            else {
                ctr = GetSumTotalNoOfPayment(`nwGridPaymentTermDetails`, 'DOWNP');
            }

            if (financingType != 'SPOT')
                $('#txtBalStartDate').val(formatDate(addMonths(new Date(dpdate), ctr == 0 ? 1 : ctr)));// if

            var cnt = $('#nwGridPaymentTermDetails-nwData tr').length;
            var cat = '';
            var balctr = 0;
            var paymenttermcode = ''
            var ordering = 0;
            var noofPayments = 0;
            var nextDate = '';
            for (i = 0; i < cnt; i++) {
                cat = $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val();
                paymenttermcode = $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_PaymentTermCode + ')').text();
                ordering = $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_Ordering + ')').text();
                noofPayments = parseInt($('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_NoOfPayments + ')').text());
                if (cat == 'SPOT' && paymenttermcode.length > 0 && ordering == 1) {
                    var reservDate = $('#txtReservationDate').val();
                    if (period == 0) {
                        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_StartDate, i, formatDate(addDays(new Date(reservDate), spotDay)));
                        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_EndDate, i, formatDate(addDays(new Date(reservDate), spotDay)));
                        nextDate = formatDate(addDays(new Date(reservDate), spotDay));
                    }
                    else {
                        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_StartDate, i, formatDate(addMonths(new Date(reservDate), noofPayments)));
                        setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_EndDate, i, formatDate(addMonths(new Date(reservDate), noofPayments)));
                        nextDate = formatDate(addMonths(new Date(reservDate), noofPayments));
                    }
                }
                else if (cat == 'SPOT' && paymenttermcode.length > 0 && ordering != 1) {
                    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_StartDate, i, formatDate(addMonths(new Date(nextDate), 1)));
                    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_EndDate, i, formatDate(getEndDate(new Date(formatDate(addMonths(new Date(nextDate), 1))), noofPayments)));
                    nextDate = formatDate(getEndDate(new Date(formatDate(addMonths(new Date(nextDate), 1))), noofPayments));
                }
                else if (cat == 'RESRV' && paymenttermcode.length > 0 && ordering == 1) {
                    var reservDate = $('#txtReservationDate').val();
                    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_StartDate, i, formatDate(reservDate));
                    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_EndDate, i, formatDate(getEndDate(new Date(reservDate), noofPayments)));
                }
                else if (cat == 'DOWNP' && paymenttermcode.length > 0 && ordering == 1) {
                    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_StartDate, i, $('#txtDPStartDate').val());
                    //setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_EndDate, i, formatDate(getEndDate(new Date(dpdate), noofPayments)));
                    //nextDate = formatDate(getEndDate(new Date(dpdate), noofPayments));
                    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_EndDate, i, formatDate(getEndDate(new Date($('#txtDPStartDate').val()), noofPayments)));
                    nextDate = formatDate(getEndDate(new Date($('#txtDPStartDate').val()), noofPayments));
                }
                else if (cat == 'DOWNP' && paymenttermcode.length > 0 && ordering != 1) {
                    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_StartDate, i, formatDate(addMonths(new Date(nextDate), 1)));
                    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_EndDate, i, formatDate(getEndDate(new Date(formatDate(addMonths(new Date(nextDate), 1))), noofPayments)));
                    nextDate = formatDate(getEndDate(new Date(formatDate(addMonths(new Date(nextDate), 1))), noofPayments));
                }
                else if (cat == 'BALANC' && paymenttermcode.length > 0) {
                    balctr = parseFloat($('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_NoOfPayments + ')').text()) || 0;
                    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_StartDate, i, $('#txtBalStartDate').val());
                    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_EndDate, i, formatDate(getEndDate(new Date(formatDate($('#txtBalStartDate').val())), balctr)));
                }
            }
        }
        else
            $('#txtDPStartDate').val('');
    }
    else {
    }
}

function ChangeBalDate(baldate) {
    //var ctr = 0;
    var balStartDate = '';
    //var dpStartDate = '';
    if (baldate.length > 0) {
        var timestamp = Date.parse(baldate);
        if (isNaN(timestamp) == false) {
            //ctr = GetSumTotalNoOfPayment(`nwGridPaymentTermDetails`, 'DOWNP');
            //$('#txtBalStartDate').val(formatDate(addMonths(new Date(dpdate), ctr)));

            var cnt = $('#nwGridPaymentTermDetails-nwData tr').length;
            var cat = '';
            var balctr = 0;
            var paymenttermcode = ''
            for (i = 0; i < cnt; i++) {
                cat = $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val();
                paymenttermcode = $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_PaymentTermCode + ')').text();

                //if (cat == 'DOWNP' && paymenttermcode.length > 0) {
                //    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_StartDate, i, $('#txtDPStartDate').val());
                //    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_EndDate, i, formatDate(getEndDate(new Date(dpdate), ctr)));
                //}
                //else
                if (cat == 'BALANC' && paymenttermcode.length > 0) {
                    balctr += parseFloat($('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_NoOfPayments + ')').text()) || 0;
                    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_StartDate, i, $('#txtBalStartDate').val());
                    setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_EndDate, i, formatDate(getEndDate(new Date(formatDate($('#txtBalStartDate').val())), balctr)));
                }
            }
        }
        //else
        //    $('#txtDPStartDate').val('');
    }
    else {
    }
}





function GetSumTotalNoOfPayment(id, cat) {
    var columnNoOfPayments = getGridElement(id, ``, SPR_PaymentTermDetails_NoOfPayments);
    var totalNoofPayments = 0.00;
    var noOfpayments = 0.00;
    var paymentCat = 0.00;

    $.each(columnNoOfPayments, function (idx, obj) {
        paymentCat = $('#nwGridPaymentTermDetails-nwData tr:eq(' + idx + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val();
        if (cat == paymentCat)
            totalNoofPayments += parseFloat($('#nwGridPaymentTermDetails-nwData tr:eq(' + idx + ') td:eq(' + SPR_PaymentTermDetails_NoOfPayments + ')').text()) || 0.00;
    });
    return totalNoofPayments;
}

function fn_Outside() {
    try {
        if (nwDocno != null && nwDocno.length > 0)
            fromOtherEntry();
    }
    catch (e) { }
}

$(document).on("click", "#btnSaveApprvDetails", function () {
    //  if (nwDocno != '') return;
    msgBoxContainerQuestion = "isProcessApproval";
    parent_MessageBoxQuestion("Do you want to save the record?", pagetitle, "Question");
    return false;
}
);

function DPDiscToggle() {
    $.each($('#nwGridPaymentTermDetails-nwData tr:gt(0)'), function (x, y) {
        if ($(y).find('td:eq(' + SPR_PaymentTermDetails_DPDiscount + ') input').prop('checked')) {
            $(y).find('td:eq(' + SPR_PaymentTermDetails_DPDiscountRate + ') input').prop('disabled', false);
            $(y).find('td:eq(' + SPR_PaymentTermDetails_DPDiscountRate + ')').css('background-color', 'white');

            $(y).find('td:eq(' + SPR_PaymentTermDetails_DPDiscountAmount + ') input').prop('disabled', false);
            $(y).find('td:eq(' + SPR_PaymentTermDetails_DPDiscountAmount + ')').css('background-color', 'white');
        }
    })
}


// DP Discount Amount
var curr_index;
$(document).on(`focus`, `.txtDPDiscountAmount, .SPR_PaymentTermDetails_DPDiscountRate, .nwCheckBox14, .txtPaymentTermDetails_TotalLotPrice`, function (e) {
    //curr_index = crnwTR.index();
    curr_index = $(this).closest('tr').index();
});


//$(document).on(`change`, `.txtDPDiscountAmount, .SPR_PaymentTermDetails_DPDiscountRate`, function (e) {

//    var val = $(this).val().split(`,`).join(``) || 0.00;
//    var cls = $(this).attr('class');

//    //if (val > 0) {
//    var paymentCat = getGridDataPerLine(`nwGridPaymentTermDetails`, `dd`, SPR_PaymentTermDetails_PaymentCategory, curr_index);
//    if (paymentCat == 'DOWNP') {
//        ComputeDPRate(val, cls);
//    }
//    //}
//    //SumDPDiscountAmt();
//    var disctag = 0;
//    if (parseFloat($('#txtCashAmount').val().split(',').join('')) > 0)
//        disctag = 1
//    else
//        disctag = 0;
//    doReCompute(0, curr_index, disctag);
//})


function ComputeDPRate(val, cls) {
    var dpTermAmt = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_ContractAmount, curr_index).split(',').join('')) -
                    parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, curr_index).split(',').join(''));

    var result = 0.00;
    if (cls == 'txtDPDiscountAmount') {
        result = ((val / dpTermAmt) * 100).toFixed(2);
        setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountRate, curr_index, commaSeparateNumber(result));
    }
    else if (cls == 'SPR_PaymentTermDetails_DPDiscountRate') {
        result = ((val / 100) * dpTermAmt).toFixed(2);
        setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, curr_index, commaSeparateNumber(result));
    }
}




function ReCompute(paymentCategory, grossSellingPrice, contractRate, misc, tag, ctr, termAmount, salesDiscount, dpDiscountAmount, financingType, noOfPayments, interest, amt, misctype, discAmountSP, discAmountMSC) {

    var reservationAmount = 0.00;
    var contractAmount = 0.00;
    var reservMisc = 0.00;
    var reservSP = 0.00;

    var dpCtr = 0;
    var balCtr = 0;
    $('#nwGridPaymentTermDetails-nwData tr').each(function (i, n) {
        var $row = $(n);
        var category = $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val()
        if (category == 'RESRV') {
            reservationAmount = parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ') input').val().split(',').join('')) || 0.00;
            contractAmount = parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_ContractAmount + ')').text().split(',').join('')) || 0.00;
            reservMisc = parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_MiscInstallment + ')').text().split(',').join('')) || 0.00;
            reservSP = parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ') input').val().split(',').join('')) || 0.00;
        }
        //if (category == 'DOWNP' && category == paymentCategory) {
        //    if (dpctr == 1)
        //        reservMisc = tmp;
        //else
        //    reservMisc = 0;
        //    dpctr++;
        //}

        if (category == 'DOWNP') {
            dpCtr++;
        }
        else if (category == 'BALANC') {
            balCtr++;
        }
    });

    //for second DP, third DP and so on....
    if (ctr > 1 && paymentCategory == 'DOWNP' || (paymentCategory == 'BALANC' && dpCtr > 0)) {
        reservMisc = 0;
        reservSP = 0;
    }

    var obj = {};
    if (tag == 0) {
        if (ctr == 1 && paymentCategory == 'DOWNP') {
            obj.termAmount = (grossSellingPrice * (contractRate / 100)) - reservationAmount;

        }
        else if (paymentCategory == 'RESRV')
            obj.termAmount = contractAmount - misc;
        else if (paymentCategory == 'BALANC' && ctr == 1) {//first balance
            if (financingType == 'DEF') {
                obj.termAmount = (grossSellingPrice * (contractRate / 100)) - reservationAmount;
            }
            else
                obj.termAmount = (grossSellingPrice * (contractRate / 100))
        }
        else {
            obj.termAmount = (grossSellingPrice * (contractRate / 100)) - reservationAmount;
        }

        obj.contractRate = contractRate;
    }
    else if (tag == 1) {
        if (ctr == 1 && paymentCategory == 'DOWNP') {
            obj.contractRate = ((termAmount + reservationAmount) / grossSellingPrice) * 100;
        }
        else if (paymentCategory == 'RESRV')
            obj.contractRate = 0;
        else {
            obj.contractRate = (termAmount / grossSellingPrice) * 100;
        }
        obj.termAmount = termAmount;
    }

    obj.misc = misc;
    obj.contractAmount = obj.termAmount + obj.misc;

    var sd = new TCPDiscount(0, 0, 0, 0);


    var ddbasis = $('.clsBasisOfDiscount option:selected').val();
    var ddapp = $('.clsDiscountApp option:selected').val();
    var rate = parseFloat($('.txtDiscountRate').val());
    var misc = parseFloat($('#txtMisc').val().split(',').join('')) || 0.00;
    var sp = parseFloat($('#txtSellingPrice').val().split(',').join('')) || 0.00;
    var vatrate = parseFloat($('#txtVatrate').val().split(',').join('')) || 0.00;
    var discount = 0.00;
    var tcp = sp;
    discount = sp * (rate / 100);
    var sd2 = 0.00;
    sd2 = (discount * (sp / (sp + misc))) * (1 + (vatrate / 100));


    //09.10.2018 MSS
    if (paymentCategory != 'SPOT') {
        if (paymentCategory == 'RESRV')
            obj.salesDiscount = 0;
        else if (paymentCategory == 'DOWNP')
            //obj.salesDiscount = parseFloat((((discAmountSP * (1 + (vatrate / 100))) * (contractRate / 100)) + (discAmountMSC * (parseFloat(((obj.misc + reservMisc) / misc)) || 0)))) || 0;
            obj.salesDiscount = parseFloat((((discAmountSP * (1 + (vatrate / 100))) * (parseFloat(((obj.termAmount + reservSP) / grossSellingPrice)) || 0)) + (discAmountMSC * (parseFloat(((obj.misc + reservMisc) / misc)) || 0)))) || 0;
        else {
            let downpaymentSalesDisc = 0.00;
            $('#nwGridPaymentTermDetailsData tr:gt(1)').each(function (i, x) {
                if ($(this).find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val() != 'BALANC') {
                    downpaymentSalesDisc += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_SalesDiscount + ')').text().split(',').join('')) || 0.00;
                }
            });
            obj.salesDiscount = salesDiscount - downpaymentSalesDisc;
        }
    }
    else
        obj.salesDiscount = salesDiscount;

    obj.dpDiscountAmount = dpDiscountAmount;
    obj.netContractPrice = obj.contractAmount - obj.salesDiscount - obj.dpDiscountAmount;

    var spdisc = parseFloat(sd.sp) || 0.00;
    if (ddbasis == 'SP' && ddapp == 'TCP') {
        spdisc = parseFloat(sd2) || 0.00;
    }
    obj.monthly = function () {
        var z = 0.00;
        if (misctype == 'FIXED') {
            if (paymentCategory == 'DOWNP') {
                z = (obj.termAmount - ((spdisc) * (contractRate / 100))) / noOfPayments
            }
            else if (paymentCategory == 'BALANC') {
                if (financingType == 'SPOT' || financingType == 'BNK' || financingType == 'PIF') {
                    z = obj.termAmount - ((spdisc) * (contractRate / 100));
                }
                else {
                    z = (-pmt(interest / 12,   // Annual interest into months
                           noOfPayments,      // Total months for life of loan
                           obj.termAmount - ((spdisc) * (contractRate / 100)),
                           0,
                           0)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                }
            }
            else if (paymentCategory == 'SPOT') {
                z = obj.netContractPrice;
            }
            else if (paymentCategory == 'RESRV') {
                z = obj.netContractPrice;
            }
            else {
                z = obj.termAmount - ((spdisc) * (contractRate / 100))
            }
        }
        else {
            if (paymentCategory == 'DOWNP') {
                z = obj.netContractPrice / noOfPayments
            }
            else if (paymentCategory == 'BALANC') {
                if (financingType == 'SPOT' || financingType == 'BNK' || financingType == 'PIF') {
                    z = obj.netContractPrice;
                }
                else {
                    z = (-pmt(interest / 12,   // Annual interest into months
                           noOfPayments,      // Total months for life of loan
                           obj.netContractPrice,
                           0,
                           0)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                }
            }
            else if (paymentCategory == 'SPOT') {
                z = obj.netContractPrice;
            }
            else {
                z = obj.netContractPrice
            }
        }
        return z.toString().replaceAll(',', '');
    }
    obj.monthlyWithoutMisc = function () {
        var z = 0;

        var ddbasis = $('.clsBasisOfDiscount option:selected').val();
        var ddapp = $('.clsDiscountApp option:selected').val();

        if (amt <= 0 || (amt > 0 && ddbasis == 'SP' && ddapp == 'SP')) {
            if (paymentCategory == 'DOWNP') {
                z = (obj.termAmount - obj.salesDiscount - obj.dpDiscountAmount) / noOfPayments
            }
            else if (paymentCategory == 'BALANC') {
                if (financingType == 'SPOT' || financingType == 'BNK' || financingType == 'PIF') {
                    z = (obj.termAmount - obj.salesDiscount - obj.dpDiscountAmount);
                }
                else {
                    z = (-pmt(interest / 12,   // Annual interest into months
                           noOfPayments,      // Total months for life of loan
                          (obj.termAmount - obj.salesDiscount - obj.dpDiscountAmount),
                           0,
                           0)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                }
            }
            else {
                z = (obj.termAmount - obj.salesDiscount - obj.dpDiscountAmount);
                //z = obj.netContractPrice;
            }
        }
        else if (amt > 0) {
            if (misctype == 'FIXED' || misctype == '') {
                if (paymentCategory == 'DOWNP')
                    z = (obj.termAmount - (((spdisc) * (contractRate / 100)))) / noOfPayments;
                else if (paymentCategory == 'BALANC') {
                    z = (-pmt(interest / 12,   // Annual interest into months
                         noOfPayments,      // Total months for life of loan
                         (obj.termAmount - (((spdisc) * (contractRate / 100)))),
                         0,
                         0)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                }
                else {
                    z = (obj.termAmount - (((spdisc) * (contractRate / 100))));
                }
            }
            else {
                var x = TCPDiscount(contractRate, obj.monthly(), noOfPayments, reservMisc);
                z = x.monthly;
            }
        }
        return z.toString().replaceAll(',', '');
    }
    return obj;
}

//MSS 09.03.2019
$(document).on(`change blur`, `.SPR_PaymentTermDetails_DPDiscountRate`, function (e) {
    $fn().computeDiscRate($(this).val().split(`,`).join(``) || 0.00);
})

$(document).on(`change blur`, `.txtDPDiscountAmount`, function (e) {
    $fn().computeDiscAmt($(this).val().split(`,`).join(``) || 0.00);
})


$(document).on(`change`, `.chkDPDiscount`, function () {
    curr_index = $(this).closest('tr').index();
    var $ischecked = crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscount}) input`).prop(`checked`);

    if ($ischecked) {
        LoadAmountFormat(crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscountRate}) input`).prop("disabled", false), 2);
        crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscountRate})`).css(`background-color`, `white`);

        LoadAmountFormat(crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscountAmount}) input`).prop("disabled", false), 12);
        crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscountAmount})`).css(`background-color`, `white`);
    }
    else {
        crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscountRate}) input`).val(``);
        crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscountAmount}) input`).val(``);
        crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscPrin})`).text(``);
        crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscMisc})`).text(``);

        crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscountAmount}) input`).val(``);

        crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscountRate}) input`).prop('disabled', true);
        crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscountRate})`).css(`background-color`, `gainsboro`);

        crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscountAmount}) input`).prop('disabled', true);
        crnwTR.find(`td:eq(${SPR_PaymentTermDetails_DPDiscountAmount})`).css(`background-color`, `gainsboro`);
    }

    $fn().computeNTCPAfterDPDisc();
    $fn().doCompute();
    $fn().computationDPMonthly();
})


let oldVatAmount = 0;
let oldPaymentTermDetails = [];
let oldGrossSellingPrice = 0;
let oldVatRate = 0;

function $fn() {
    let $fn = {
        header: {
            financingTypeCode: $('#idvallugFinancingType'),
            financingTypeDesc: $('#descvallugFinancingType'),
            vatrate: $('#txtVatrate'),
            chkFixedInterest: $('#chkFixedInterest'),

            cashAmount: $('#txtCashAmount'),
            miscAmt: $('#txtMiscAmt'),
            itemgroupType: $('#txtItemGroupType'),


            lotPrice: $('#txtLotPrice'),
            housePrice: $('#txtHousePrice'),
            sellingPrice: $('#txtSellingPrice'),
            vatAmount: $('#txtVatAmount'),
            grossSellingPrice: $('#txtGrossSellingPrice'),
            misc: $('#txtMisc'),
            tcp: $('#txtTCP'),
            salesDiscAmt: $('#txtSalesDiscountAmount'),
            dpDiscAmt: $('#txtDPDiscount'),
            ntcp: $('#txtNTCP'),

        },
        grid: {
            paymentTermdetails: $('#nwGridPaymentTermDetailsCon'),
            discount: $('#nwGridDiscountCon')
        },
        contractAmountReserv: function () {
            let result = 0.00;
            let contractamount = 0.00;
            $fn.grid.paymentTermdetails.find(`.tblGridBody tr`).each(function (x, y) {
                let category = $(y).find(`td:eq(${SPR_PaymentTermDetails_PaymentCategory}) option:selected`).val();
                if (category == `RESRV`) {
                    if (discountBasis == '1') {
                        contractamount = parseFloat($(y).find(`td:eq(${SPR_PaymentTermDetails_ContractAmount})`).text().split(',').join('')) || 0;
                    }
                    else {
                        contractamount = parseFloat($(y).find(`td:eq(${SPR_PaymentTermDetails_TermAmount}) input`).val().split(',').join('')) || 0;
                    }
                    return false;
                }
            });
            return contractamount;
        },
        termAmountReserv: function () {
            let result = 0.00;
            let termAmount = 0.00;
            $fn.grid.paymentTermdetails.find(`.tblGridBody tr`).each(function (x, y) {
                let category = $(y).find(`td:eq(${SPR_PaymentTermDetails_PaymentCategory}) option:selected`).val();
                if (category == `RESRV`) {
                    termAmount = parseFloat($(y).find(`td:eq(${SPR_PaymentTermDetails_TermAmount}) input`).val().split(',').join('')) || 0;
                    return false;
                }
            });
            return termAmount;
        },

        computeDiscAmt: function (val) {
            let ordering = $fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_Ordering})`).text();
            let dpContractAmount = 0.00
            if (discountBasis == '1') {
                if (ordering == 1)
                    dpContractAmount = (parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_ContractAmount})`).text().split(',').join('')) || 0) + $fn.contractAmountReserv();
                else
                    dpContractAmount = (parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_ContractAmount})`).text().split(',').join('')) || 0)
            }
            else {
                if (ordering == 1)
                    dpContractAmount = (parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_TermAmount}) input`).val().split(',').join('')) || 0) + $fn.contractAmountReserv();
                else
                    dpContractAmount = (parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_TermAmount}) input`).val().split(',').join('')) || 0)
            }

            let salesDisc = parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_SalesDiscount})`).text().split(',').join('')) || 0;
            let dpDiscAmount = 0.00;
            dpDiscAmount = ((val / (dpContractAmount - salesDisc)) * 100).toFixed(2);
            $fn.setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountRate, curr_index, nwCurrency(dpDiscAmount));

            $fn.computeNTCPAfterDPDisc();
            $fn.doCompute();
            $fn.computationDPMonthly();

            $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscPrin, curr_index, nwCurrency($fn.dpDiscAllocationPerLine().prinAllocVatEx));
            $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscMisc, curr_index, nwCurrency($fn.dpDiscAllocationPerLine().miscAllocVatEx));
        },
        computeDiscRate: function (val) {
            let ordering = $fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_Ordering})`).text();
            let dpContractAmount = 0.00

            if (discountBasis == '1') {
                if (ordering == 1)
                    dpContractAmount = (parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_ContractAmount})`).text().split(',').join('')) || 0) + $fn.contractAmountReserv();
                else
                    dpContractAmount = (parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_ContractAmount})`).text().split(',').join('')) || 0)
            }
            else {
                if (ordering == 1)
                    dpContractAmount = (parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_TermAmount}) input`).val().split(',').join('')) || 0) + $fn.contractAmountReserv();
                else
                    dpContractAmount = (parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_TermAmount}) input`).val().split(',').join('')) || 0)
            }

            let salesDisc = parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_SalesDiscount})`).text().split(',').join('')) || 0;
            let dpDiscAmount = 0.00;
            dpDiscAmount = ((val / 100) * (dpContractAmount - salesDisc)).toFixed(2);
            $fn.setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, curr_index, nwCurrency(dpDiscAmount));

            $fn.computeNTCPAfterDPDisc();
            $fn.doCompute();
            $fn.computationDPMonthly();

            $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscPrin, curr_index, nwCurrency($fn.dpDiscAllocationPerLine().prinAllocVatEx));
            $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_DPDiscMisc, curr_index, nwCurrency($fn.dpDiscAllocationPerLine().miscAllocVatEx));
        },

        computeNTCPAfterDPDisc: function () {
            let salesDisc = parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_SalesDiscount})`).text().split(',').join('')) || 0;
            let dpDiscAmount = parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_DPDiscountAmount}) input`).val().split(',').join('')) || 0;
            let contractAmount = parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_ContractAmount})`).text().split(',').join('')) || 0;
            let netContractPrice = contractAmount - salesDisc - dpDiscAmount;
            $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetContractPrice, curr_index, nwCurrency(netContractPrice));
        },

        doCompute: function () {

            //Total Header
            $fn.sumAllHeader();

            var salesdiscount = 0.00;
            if ($fn.header.financingTypeCode.val() == 'SPOT')
                salesdiscount = parseFloat($fn.header.cashAmount.val().split(',').join('')) || 0.00;
            else
                salesdiscount = (parseFloat($fn.header.vatAmount.val().split(',').join('')) || 0) > 0 ? $fn.getVatDiscount() : $fn.getnonVatDiscount();//parseFloat($fn.grid.discount.find(`.tblGridBody tr:eq(0) td:eq(${SPR_Discount_DiscountAmt})`).text().split(',').join('')) || 0;

            //compute Header
            let miscInstallment = parseFloat($fn.header.misc.val().split(',').join('')) || 0;
            let grossSellingPrice = parseFloat($fn.header.grossSellingPrice.val().split(',').join('')) || 0;
            let totalContractPrice = grossSellingPrice + miscInstallment;
            let salesDiscountAmount = salesdiscount;
            let dpDiscount = parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(0) td:eq(${SPR_PaymentTermDetails_DPDiscountAmount}) input`).val()) || 0;
            let netContractPrice = totalContractPrice - (salesDiscountAmount + dpDiscount);

            $fn.header.tcp.val(nwCurrency(totalContractPrice));
            $fn.header.salesDiscAmt.val(nwCurrency(salesDiscountAmount));
            $fn.header.dpDiscAmt.val(nwCurrency(dpDiscount));
            $fn.header.ntcp.val(nwCurrency(netContractPrice));
        },
        dpDiscMiscAllocation: function () {
            let result = [];
            let tcp = parseFloat($fn.header.tcp.val().split(',').join('')) || 0;
            let gross = parseFloat($fn.header.grossSellingPrice.val().split(',').join('')) || 0;
            let discAmt = parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${0}) td:eq(${SPR_PaymentTermDetails_DPDiscountAmount}) input`).val().split(',').join('')) || 0;
            let sp = parseFloat($fn.grid.discount.find(`.tblGridBody tr:eq(${0}) td:eq(${SPR_Discount_DiscountSP})`).text().split(',').join('')) || 0;
            let totalSalesDisc = parseFloat($fn.header.salesDiscAmt.val().split(',').join('')) || 0;
            let alloc = ((gross - (sp * (1 + ($fn.header.vatrate.val() / 100)))) / (tcp - totalSalesDisc));
            let dpDiscAlloc = discAmt * alloc;

            result = {
                prinAllocVatIn: dpDiscAlloc,
                miscAlloc: (discAmt - dpDiscAlloc),
                prinAllocVatEx: (dpDiscAlloc / 1 + ($fn.header.vatrate.val() / 100)),
            }

            return (discAmt - dpDiscAlloc) || 0;
        },

        dpDiscAllocationPerLine: function () {//vatex Allocation
            let result = [];
            let tcp = parseFloat($fn.header.tcp.val().split(',').join('')) || 0;
            let misc = parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_MiscInstallment}) `).text().split(',').join('')) || 0;
            let gross = parseFloat($fn.header.grossSellingPrice.val().split(',').join('')) || 0;
            let discAmt = parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_DPDiscountAmount}) input`).val().split(',').join('')) || 0;
            let sp = parseFloat($fn.grid.discount.find(`.tblGridBody tr:eq(${0}) td:eq(${SPR_Discount_DiscountSP})`).text().split(',').join('')) || 0;
            let totalSalesDisc = parseFloat($fn.header.salesDiscAmt.val().split(',').join('')) || 0;
            let alloc = ((gross - (sp * (1 + ($fn.header.vatrate.val() / 100)))) / (tcp - totalSalesDisc));
            let dpDiscAlloc = discAmt * alloc;

            let prinAllocVatEx = 0, miscAllocVatEx = 0

            if (discountBasis == 1)
                miscAllocVatEx = misc > 0 ? ((discAmt - dpDiscAlloc) || 0) : 0;

            prinAllocVatEx = misc > 0 ? ((dpDiscAlloc / (1 + ($fn.header.vatrate.val() / 100))) || 0) : discAmt;

            result = {
                miscAllocVatEx: miscAllocVatEx,
                prinAllocVatEx: prinAllocVatEx
            }
            return result;
        },

        computationDPMonthly: function () {
            let misctype = $fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_MiscellaneousType})`).text();
            let termAmount = parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_TermAmount}) input`).val().split(',').join('')) || 0;
            let netContractPrice = parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_NetContractPrice})`).text().split(',').join('')) || 0;
            let noOfPayments = parseInt($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_NoOfPayments})`).text().split(',').join('')) || 0;
            let contractRate = parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_ContractRate}) input`).val().split(',').join('')) || 0;
            let ordering = $fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_Ordering})`).text();

            let gross = parseFloat($fn.header.grossSellingPrice.val().split(',').join('')) || 0;
            let totalSalesDisc = parseFloat($fn.header.salesDiscAmt.val().split(',').join('')) || 0;
            let tcp = parseFloat($fn.header.tcp.val().split(',').join('')) || 0;
            let sp = parseFloat($fn.grid.discount.find(`.tblGridBody tr:eq(${0}) td:eq(${SPR_Discount_DiscountSP})`).text().split(',').join('')) || 0;
            let dpdisc = parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${0}) td:eq(${SPR_PaymentTermDetails_DPDiscountAmount}) input`).val().split(',').join('')) || 0;
            let rate = parseFloat($fn.grid.discount.find(`.tblGridBody tr:eq(${0}) td:eq(${SPR_Discount_DiscountRate}) input`).val().split(',').join('')) || 0;

            let salesDiscount = parseFloat($fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${0}) td:eq(${SPR_PaymentTermDetails_SalesDiscount})`).text().split(',').join('')) || 0;
            var alloc = ((gross - (sp * (1 + ($fn.header.vatrate.val() / 100)))) / (tcp - totalSalesDisc));
            var dpDiscAlloc = dpdisc * alloc;

            let discount = tcp * (rate / 100);
            let spdisc = ((gross / tcp) * discount);

            let monthlywithoutmisc = 0.00;
            //monthlywithoutmisc = ((termAmount - ((spdisc) * (contractRate / 100))) - dpDiscAlloc) / noOfPayments;

            let reservSP = 0;
            if (ordering == '1')
                reservSP = $fn.termAmountReserv() || 0;
            monthlywithoutmisc = ((termAmount - ((spdisc) * ((parseFloat(((termAmount + reservSP) / gross)) || 0)))) - dpDiscAlloc) / noOfPayments;

            let pmt = 0.00;
            if (misctype == 'FIXED') {
                pmt = monthlywithoutmisc;
            }
            else {
                pmt = netContractPrice / noOfPayments;
            }

            $fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_MonthlyPayment})`).text(nwCurrency(pmt));
            $fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${curr_index}) td:eq(${SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc})`).text(nwCurrency(monthlywithoutmisc));

        },

        sumAllHeader() {
            let elem = $fn.grid.paymentTermdetails.find('.tblGridBody tr:gt(0)');
            let contractRate = 0.00;
            let termAmount = 0.00;
            let misc = 0.00;
            let contractAmount = 0.00;
            let salesDiscount = 0.00;
            let discountRate = 0.00;
            let discountAmount = 0.00;
            let netContractPrice = 0.00;
            let noofPayment = 0.00;
            let dpdiscPrin = 0.00;
            let dpdiscMisc = 0.00;

            $.each(elem, function (idx, obj) {
                contractRate += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_ContractRate + ') input').val()) || 0.00;
                termAmount += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ') input').val().split(',').join('')) || 0.00;
                misc += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_MiscInstallment + ') ').text().split(',').join('')) || 0.00;
                contractAmount += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_ContractAmount + ') ').text().split(',').join('')) || 0.00;
                salesDiscount += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_SalesDiscount + ') ').text().split(',').join('')) || 0.00;
                discountRate += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_DPDiscountRate + ') input').val().split(',').join('')) || 0.00;
                discountAmount += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_DPDiscountAmount + ') input').val().split(',').join('')) || 0.00;
                netContractPrice += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_NetContractPrice + ') ').text().split(',').join('')) || 0.00;
                noofPayment += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_NoOfPayments + ') ').text().split(',').join('')) || 0;
            });

            $fn.setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, 0, nwCurrency(contractRate));
            $fn.setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, 0, nwCurrency(termAmount));
            $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, 0, nwCurrency(misc));
            $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_ContractAmount, 0, nwCurrency(contractAmount));
            $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, 0, nwCurrency(salesDiscount));
            $fn.setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountRate, 0, nwCurrency(discountRate));
            $fn.setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, 0, nwCurrency(discountAmount));
            $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetContractPrice, 0, nwCurrency(netContractPrice));
            $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments, 0, noofPayment.toFixed(0));
            $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPayment, 0, '');
        },

        setGridData: function (nwGrid, type, col, row, val) {
            if (type == `input`)
                $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val(val);
            else
                $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text(val);
        },
        saveJSON: function () {
            jsonMisc = [];
            jsonMisc = JSON.parse($fn.html2json('nwGridMiscellaneousFee'));

            $fn.populateMiscellaneousAmount();
            ResetGrid(`nwGridDiscount`);
            $fn.doCompute();
        },

        populateMiscellaneousAmount() {
            let ctr = 1;
            let category = '', amount = 0, miscType = '', miscDate = '', allocationType = '', ordering = 0;
            let dpctr = 0, balctr = 0;

            if (jsonMisc.length > 0) {

                ClearMiscellaneousInPaymentTermDetails();
                $fn.changePaymentTermDetails();

            }
        },

        changePaymentTermDetails: function () {
            let Misc = $.grep(jsonMisc, function (n, i) {
                return (n.MiscellaneousType != '')
            });

            let category, ctr, amount, miscType, miscDate, allocationType;

            for (z = 0; z < Misc.length; z++) {
                category = Misc[z].PaymentCategory;
                amount = Misc[z].MiscellaneousAmount;
                miscType = Misc[z].MiscellaneousType;
                miscDate = Misc[z].MiscellaneousDate;
                allocationType = Misc[z].AllocationType;
                ctr = Misc[z].Ordering;

                let cnt = $fn.grid.paymentTermdetails.find('.tblGridBody tr').length;
                let dp = 0; var bal = 0;
                let termamount = 0, contractamount = 0;
                let contractRate = 0;
                let disctag = 0;
                if (parseFloat($fn.header.cashAmount.val().split(',').join('')) > 0)
                    disctag = 1
                else
                    disctag = 0;

                for (i = 0; i < cnt; i++) {
                    let paymentCategory = $fn.grid.paymentTermdetails.find('.tblGridBody tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') select').val(); //$('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') select').val();
                    let ordering = $fn.grid.paymentTermdetails.find(`.tblGridBody tr:eq(${i}) td:eq(${SPR_PaymentTermDetails_Ordering})`).text();

                    if ((paymentCategory == category && ordering == ctr)) {
                        $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, i, nwCurrency(amount));
                        $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousAmount, i, nwCurrency(amount));
                        $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousDate, i, miscDate);
                        $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousType, i, miscType);
                        $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_AllocationType, i, allocationType);
                    }
                    $fn.doReCompute(0, i, disctag);
                }
            }
        },

        doReCompute(tag, i, disctag) {
            let isFixInt = $fn.header.chkFixedInterest.is(':checked');
            let totalMiscAmt = parseFloat($fn.header.miscAmt.val().split(',').join(''));
            let financingType = $fn.header.financingTypeCode.val();
            let xy_misc = 0;
            let salesdiscount = 0.00;
            if (disctag == 1)
                salesdiscount = parseFloat($fn.header.cashAmount.val().split(',').join('')) || 0.00;
            else
                salesdiscount = (parseFloat($fn.header.vatAmount.val().split(',').join('')) || 0) > 0 ? $fn.getVatDiscount() : $fn.getnonVatDiscount();

            var discAmountSP = parseFloat($(`#nwGridDiscount-nwData tr:eq(0) td:eq(${SPR_Discount_DiscountSP})`).text().split(',').join('')) || 0;
            var discAmountMSC = parseFloat($(`#nwGridDiscount-nwData tr:eq(0) td:eq(${SPR_Discount_DiscountMSC})`).text().split(',').join('')) || 0;

            if (isFixInt) {
                var objtext = jsonMisc;
                var x_PaymentCat = $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val();
                var x_contractRate = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, i)) || 0.00;

                if (jsonMisc != null || jsonMisc.length > 0) {
                    jsonMisc = [];

                    for (x = 0; x < objtext.length; x++) {
                        var Misc = {};
                        var term = objtext[x];
                        var x_misc = 0;

                        if (x_PaymentCat == term.PaymentCategory) {
                            x_misc = totalMiscAmt * (x_contractRate / 100);
                            xy_misc = x_misc;
                        } else {
                            x_misc = term.MiscellaneousAmount;
                        }

                        Misc["MiscellaneousType"] = term.MiscellaneousType;
                        Misc["AllocationType"] = term.AllocationType;
                        Misc["PaymentCategory"] = term.PaymentCategory;
                        Misc["MiscellaneousDate"] = term.MiscellaneousDate;
                        Misc["MiscellaneousAmount"] = x_misc;
                        Misc["Ordering"] = term.Ordering;
                        jsonMisc.push(Misc);
                    }
                }
            } else {
                xy_misc = parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, i).split(',').join('')) || 0.00;
            }

            var misctype = getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscellaneousType, i);

            let paymentCategory = $('#nwGridPaymentTermDetails-nwData tr:eq(' + i + ') td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val();

            parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, i).split(',').join('')) || 0.00;

            var z = $fn.reCompute(
                paymentCategory,
                parseFloat($('#txtGrossSellingPrice').val().split(',').join('')) || 0.00,
                parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_ContractRate, i)) || 0.00,
                xy_misc,
                tag,
                parseInt(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_Ordering, i)) || 0,
                parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, i).split(',').join('')) || 0.00,
                salesdiscount,
                parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, i).split(',').join('')) || 0.00,
                $('#idvallugFinancingType').val(),
                parseInt(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments, i)) || 0,
                parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_InterestRate, i)) / 100,
                parseFloat($('#txtCashAmount').val().split(',').join('')) || 0.00,
                misctype,
                discAmountSP,
                discAmountMSC
                );

            var monthlyP = 0.00;
            if (isFixInt) {
                monthlyP = (parseFloat(z.netContractPrice) / parseFloat(parseInt(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NoOfPayments, i)) || 0)) + (parseFloat(z.netContractPrice) * (parseFloat(getGridDataPerLine(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_InterestRate, i)) / 100) / 12);
            }
            else {
                monthlyP = z.monthly();
            }

            if (paymentCategory == 'RESRV')
                setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, i, nwCurrency(parseFloat(z.termAmount) || 0.00));

            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MiscInstallment, i, nwCurrency(parseFloat(z.misc) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_ContractAmount, i, nwCurrency(parseFloat(z.contractAmount) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, i, nwCurrency(parseFloat(z.salesDiscount) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_DPDiscountAmount, i, nwCurrency(parseFloat(z.dpDiscountAmount) || 0.00));
            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetContractPrice, i, nwCurrency(parseFloat(z.netContractPrice) || 0.00));

            if (i != 0)
                setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPayment, i, nwCurrency(parseFloat(monthlyP) || 0.00));

            setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc, i, nwCurrency(parseFloat(z.monthlyWithoutMisc()) || 0.00));

            //SumAllHeader();
            //doCompute(disctag);
            $fn.sumAllHeader();

            ChangeMonthlyDPandAmort();
        },



        reCompute: function (paymentCategory, grossSellingPrice, contractRate, misc, tag, ctr, termAmount, salesDiscount, dpDiscountAmount, financingType, noOfPayments, interest, amt, misctype, discAmountSP, discAmountMSC) {
            var reservationAmount = 0.00;
            var contractAmount = 0.00;
            var reservMisc = 0.00;
            var reservSP = 0.00;

            var dpCtr = 0;
            var balCtr = 0;
            $('#nwGridPaymentTermDetails-nwData tr').each(function (i, n) {
                var $row = $(n);
                var category = $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val()
                if (category == 'RESRV') {
                    reservationAmount = parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ') input').val().split(',').join('')) || 0.00;
                    contractAmount = parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_ContractAmount + ')').text().split(',').join('')) || 0.00;
                    reservMisc = parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_MiscInstallment + ')').text().split(',').join('')) || 0.00;
                    reservSP = parseFloat($row.find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ') input').val().split(',').join('')) || 0.00;
                }

                if (category == 'DOWNP') {
                    dpCtr++;
                }
                else if (category == 'BALANC') {
                    balCtr++;
                }
            });

            //for second DP, third DP and so on....
            if (ctr > 1 && paymentCategory == 'DOWNP' || (paymentCategory == 'BALANC' && dpCtr > 0)) {
                reservMisc = 0;
                reservSP = 0;
            }

            var obj = {};
            if (paymentCategory == 'RESRV')
                obj.termAmount = contractAmount - misc;
            else
                obj.termAmount = termAmount;

            obj.contractRate = contractRate;

            obj.misc = misc;
            obj.contractAmount = obj.termAmount + obj.misc;

            var sd = new TCPDiscount(0, 0, 0, 0);
            var ddbasis = $('.clsBasisOfDiscount option:selected').val();
            var ddapp = $('.clsDiscountApp option:selected').val();
            var rate = parseFloat($('.txtDiscountRate').val());
            var misc = parseFloat($('#txtMisc').val().split(',').join('')) || 0.00;
            var sp = parseFloat($('#txtSellingPrice').val().split(',').join('')) || 0.00;
            var vatrate = parseFloat($('#txtVatrate').val().split(',').join('')) || 0.00;
            var discount = 0.00;
            var tcp = sp;
            discount = sp * (rate / 100);
            var sd2 = 0.00;
            sd2 = (discount * (sp / (sp + misc))) * (1 + (vatrate / 100));

            //09.10.2018 MSS
            if (paymentCategory != 'SPOT') {
                if (paymentCategory == 'RESRV')
                    obj.salesDiscount = 0;
                else if (paymentCategory == 'DOWNP')
                    obj.salesDiscount = parseFloat((((discAmountSP * (1 + (vatrate / 100))) * (parseFloat(((obj.termAmount + reservSP) / grossSellingPrice)) || 0)) + (discAmountMSC * (parseFloat(((obj.misc + reservMisc) / misc)) || 0)))) || 0;
                else {
                    let downpaymentSalesDisc = 0.00;
                    $('#nwGridPaymentTermDetailsData tr:gt(1)').each(function (i, x) {
                        if ($(this).find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val() != 'BALANC') {
                            downpaymentSalesDisc += parseFloat($(this).find('td:eq(' + SPR_PaymentTermDetails_SalesDiscount + ')').text().split(',').join('')) || 0.00;
                        }
                    });
                    obj.salesDiscount = salesDiscount - downpaymentSalesDisc;
                }
            }
            else
                obj.salesDiscount = salesDiscount;

            obj.dpDiscountAmount = dpDiscountAmount;
            obj.netContractPrice = obj.contractAmount - obj.salesDiscount - obj.dpDiscountAmount;

            var spdisc = parseFloat(sd.sp) || 0.00;
            if (ddbasis == 'SP' && ddapp == 'TCP') {
                spdisc = parseFloat(sd2) || 0.00;
            }
            obj.monthly = function () {
                var z = 0.00;
                if (misctype == 'FIXED') {
                    if (paymentCategory == 'DOWNP') {
                        z = (obj.termAmount - ((spdisc) * (contractRate / 100))) / noOfPayments
                    }
                    else if (paymentCategory == 'BALANC') {
                        if (financingType == 'SPOT' || financingType == 'BNK' || financingType == 'PIF') {
                            z = obj.termAmount - ((spdisc) * (contractRate / 100));
                        }
                        else {
                            z = (-pmt(interest / 12,   // Annual interest into months
                                   noOfPayments,      // Total months for life of loan
                                   obj.termAmount - ((spdisc) * (contractRate / 100)),
                                   0,
                                   0)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }
                    else if (paymentCategory == 'RESRV') {
                        z = obj.netContractPrice;
                    }
                    else {
                        z = obj.termAmount - ((spdisc) * (contractRate / 100))
                    }
                }
                else {
                    if (paymentCategory == 'DOWNP') {
                        z = obj.netContractPrice / noOfPayments
                    }
                    else if (paymentCategory == 'BALANC') {
                        if (financingType == 'SPOT' || financingType == 'BNK' || financingType == 'PIF') {
                            z = obj.netContractPrice;
                        }
                        else {
                            z = (-pmt(interest / 12,   // Annual interest into months
                                   noOfPayments,      // Total months for life of loan
                                   obj.netContractPrice,
                                   0,
                                   0)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }
                    else {
                        z = obj.netContractPrice
                    }
                }
                return z.toString().replaceAll(',', '');
            }
            obj.monthlyWithoutMisc = function () {
                var z = 0;

                var ddbasis = $('.clsBasisOfDiscount option:selected').val();
                var ddapp = $('.clsDiscountApp option:selected').val();

                if (amt <= 0 || (amt > 0 && ddbasis == 'SP' && ddapp == 'SP')) {
                    if (paymentCategory == 'DOWNP') {
                        z = (obj.termAmount - obj.salesDiscount - obj.dpDiscountAmount) / noOfPayments
                    }
                    else if (paymentCategory == 'BALANC') {
                        if (financingType == 'SPOT' || financingType == 'BNK' || financingType == 'PIF') {
                            z = (obj.termAmount - obj.salesDiscount - obj.dpDiscountAmount);
                        }
                        else {
                            z = (-pmt(interest / 12,   // Annual interest into months
                                   noOfPayments,      // Total months for life of loan
                                  (obj.termAmount - obj.salesDiscount - obj.dpDiscountAmount),
                                   0,
                                   0)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                    }
                    else {
                        z = (obj.termAmount - obj.salesDiscount - obj.dpDiscountAmount);
                        //z = obj.netContractPrice;
                    }
                }
                else if (amt > 0) {
                    if (misctype == 'FIXED' || misctype == '') {
                        if (paymentCategory == 'DOWNP')
                            z = (obj.termAmount - (((spdisc) * (contractRate / 100)))) / noOfPayments;
                        else if (paymentCategory == 'BALANC') {
                            z = (-pmt(interest / 12,   // Annual interest into months
                                 noOfPayments,      // Total months for life of loan
                                 (obj.termAmount - (((spdisc) * (contractRate / 100)))),
                                 0,
                                 0)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        }
                        else {
                            z = (obj.termAmount - (((spdisc) * (contractRate / 100))));
                        }
                    }
                    else {
                        var x = TCPDiscount(contractRate, obj.monthly(), noOfPayments, reservMisc);
                        z = x.monthly;
                    }
                }
                return z.toString().replaceAll(',', '');
            }
            return obj;
        },


        html2json: function (id) {
            var rows = [];
            if (id == 'nwGridMiscellaneousFee') {
                $('#nwGridMiscellaneousFee-nwData tr').each(function (i, n) {
                    var $row = $(n);
                    rows.push({
                        MiscellaneousType: $row.find('td:eq(' + SPR_MISC_MISCTYPE + ') option:selected').val(),
                        AllocationType: $row.find('td:eq(' + SPR_ALLOCATIONTYPE + ') option:selected').val(),
                        PaymentCategory: $row.find('td:eq(' + SPR_PAYMENTCATEGORY + ') option:selected').val(),
                        MiscellaneousDate: $row.find('td:eq(' + SPR_MISCELLANEOUSDATE + ') input').val(),
                        MiscellaneousAmount: parseFloat($row.find('td:eq(' + SPR_MISCELLANEOUSAMOUNT + ') input').val().replace(',', '')),
                        Ordering: parseInt($row.find('td:eq(' + SPR_ORDERING + ')').text().replace(',', '')),
                    });
                });
            }

            else if (id == 'nwGridTermDetails') {
                $('#nwGridPaymentTermDetails-nwData tr').each(function (i, n) {
                    var $row = $(n);
                    var z = $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val();
                    if (z != undefined && z != '') {
                        rows.push(
                            {
                                Code: $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val(),
                                Description: $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').text(),
                                MonthlyPayment: $row.find('td:eq(' + SPR_PaymentTermDetails_MonthlyPayment + ')').text(),
                                TermPeriod: $row.find('td:eq(' + SPR_PaymentTermDetails_NoOfPayments + ')').text(),
                                InterestRate: $row.find('td:eq(' + SPR_PaymentTermDetails_InterestRate + ')').text(),
                                PenaltyRate: $row.find('td:eq(' + SPR_PaymentTermDetails_PenaltyRate + ')').text(),
                                StartDate: $row.find('td:eq(' + SPR_PaymentTermDetails_StartDate + ')').text(),
                                EndDate: $row.find('td:eq(' + SPR_PaymentTermDetails_EndDate + ')').text()
                            });
                    }
                });
            }
            else if (id == 'nwGridPaymentTermDetails') {
                $('#nwGridPaymentTermDetails-nwData tr').each(function (i, n) {
                    var $row = $(n);
                    var z = $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val();
                    if (z != undefined && z != '') {
                        rows.push(
                            {
                                Code: $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentCategory + ') option:selected').val(),
                                PaymentTermCode: $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentTermCode + ')').text(),
                                PaymentTermDesc: $row.find('td:eq(' + SPR_PaymentTermDetails_PaymentTermDesc + ')').text(),
                                ContractRate: $row.find('td:eq(' + SPR_PaymentTermDetails_ContractRate + ') input').val(),
                                TermAmount: $row.find('td:eq(' + SPR_PaymentTermDetails_TermAmount + ') input').val(),
                                miscInstallment: $row.find('td:eq(' + SPR_PaymentTermDetails_MiscInstallment + ')').text(),
                                contractAmount: $row.find('td:eq(' + SPR_PaymentTermDetails_ContractAmount + ')').text(),
                                salesDiscount: $row.find('td:eq(' + SPR_PaymentTermDetails_SalesDiscount + ')').text(),
                                dpDiscount: $row.find('td:eq(' + SPR_PaymentTermDetails_DPDiscount + ')').text(),
                                dpDiscountRate: $row.find('td:eq(' + SPR_PaymentTermDetails_DPDiscountRate + ') input').val(),
                                dpDiscountAmount: $row.find('td:eq(' + SPR_PaymentTermDetails_DPDiscountAmount + ') input').val(),
                                netContractPrice: $row.find('td:eq(' + SPR_PaymentTermDetails_NetContractPrice + ')').text(),
                                noOfPayment: $row.find('td:eq(' + SPR_PaymentTermDetails_NoOfPayments + ')').text(),
                                monthlyPayment: $row.find('td:eq(' + SPR_PaymentTermDetails_MonthlyPayment + ')').text(),
                                interestRate: $row.find('td:eq(' + SPR_PaymentTermDetails_InterestRate + ')').text(),
                                penaltyRate: $row.find('td:eq(' + SPR_PaymentTermDetails_PenaltyRate + ')').text(),
                                startDate: $row.find('td:eq(' + SPR_PaymentTermDetails_StartDate + ')').text(),
                                endDate: $row.find('td:eq(' + SPR_PaymentTermDetails_EndDate + ')').text(),
                                miscDate: $row.find('td:eq(' + SPR_PaymentTermDetails_MiscellaneousDate + ')').text(),
                                miscellaneousType: $row.find('td:eq(' + SPR_PaymentTermDetails_MiscellaneousType + ')').text(),
                                allocationType: $row.find('td:eq(' + SPR_PaymentTermDetails_AllocationType + ')').text(),
                                miscellaneousAmount: $row.find('td:eq(' + SPR_PaymentTermDetails_MiscellaneousAmount + ')').text(),
                                ordering: $row.find('td:eq(' + SPR_PaymentTermDetails_Ordering + ')').text(),
                                monthlyPaymentWithoutMisc: $row.find('td:eq(' + SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc + ')').text(),
                                dpDiscPrin: $row.find('td:eq(' + SPR_PaymentTermDetails_DPDiscPrin + ')').text(),
                                dpDiscMisc: $row.find('td:eq(' + SPR_PaymentTermDetails_DPDiscMisc + ')').text()
                            });
                    }
                });
            }
            else if (id == 'nwGridAmortization') {
                $('#nwGridAmortization-nwData tr').each(function (i, n) {
                    var $row = $(n);
                    //var z = $row.find('td:eq(' + SPR_Amortization_PaymentCatCode + ')').text();
                    //if (z != undefined && z != '') {
                    rows.push({
                        PaymentCatCode: $row.find('td:eq(' + SPR_Amortization_PaymentCatCode + ')').text(),
                        PaymentCatDesc: $row.find('td:eq(' + SPR_Amortization_PaymentCatDesc + ')').text(),
                        PaymentNo: $row.find('td:eq(' + SPR_Amortization_PaymentNo + ')').text(),
                        DueDate: $row.find('td:eq(' + SPR_Amortization_DueDate + ')').text(),
                        TotalMonthlyPayment: $row.find('td:eq(' + SPR_Amortization_TotalMonthlyPayment + ')').text(),
                        MonthlyAmortization: $row.find('td:eq(' + SPR_Amortization_MonthlyAmortization + ')').text(),
                        Interest_F: $row.find('td:eq(' + SPR_Amortization_Interest_F + ')').text(),
                        Interest: $row.find('td:eq(' + SPR_Amortization_Interest + ')').text(),
                        InterestVat: $row.find('td:eq(' + SPR_Amortization_InterestVat + ')').text(),
                        Principal_F: $row.find('td:eq(' + SPR_Amortization_Principal_F + ')').text(),
                        Principal: $row.find('td:eq(' + SPR_Amortization_Principal + ')').text(),
                        PrincipalVat: $row.find('td:eq(' + SPR_Amortization_PrincipalVat + ')').text(),
                        PrincipalOutstanding: $row.find('td:eq(' + SPR_Amortization_PrincipalOutstanding + ')').text(),
                        MonthlyMisc: $row.find('td:eq(' + SPR_Amortization_MonthlyMisc + ')').text(),
                        InterestMisc_F: $row.find('td:eq(' + SPR_Amortization_InterestMisc_F + ')').text(),
                        InterestMisc: $row.find('td:eq(' + SPR_Amortization_InterestMisc + ')').text(),
                        InterestMiscVat: $row.find('td:eq(' + SPR_Amortization_InterestMiscVat + ')').text(),
                        Miscellaneous_F: $row.find('td:eq(' + SPR_Amortization_Miscellaneous_F + ')').text(),
                        Miscellaneous: $row.find('td:eq(' + SPR_Amortization_Miscellaneous + ')').text(),
                        VatOnMisc: $row.find('td:eq(' + SPR_Amortization_VatOnMisc + ')').text(),
                        MiscOutstanding: $row.find('td:eq(' + SPR_Amortization_MiscOutstanding + ')').text(),
                        TotalOutstanding: $row.find('td:eq(' + SPR_Amortization_TotalOutstanding + ')').text(),
                        PeriodNo: $row.find('td:eq(' + SPR_Amortization_PeriodNo + ')').text()
                    });
                    //}
                });
            }
            return JSON.stringify(rows);
        },



        /*After Discount In Vatable Account 02.29.2020*/
        discountMinus: (sp, discount) => sp - discount,
        parseNumeric: (val) =>parseFloat(val.split(',').join('') || 0),
        getnonVatDiscount: () => $fn.parseNumeric($fn.grid.discount.find(`.tblGridBody tr:eq(0) td:eq(${SPR_Discount_DiscountSP})`).text()) +
        $fn.parseNumeric($fn.grid.discount.find(`.tblGridBody tr:eq(0) td:eq(${SPR_Discount_DiscountMSC})`).text())
            ,
        getVatDiscount: () => $fn.parseNumeric($fn.grid.discount.find(`.tblGridBody tr:eq(0) td:eq(${SPR_Discount_DiscountAmt})`).text()),
        comma: (val) => { while (/(\d+)(\d{3})/.test(val.toString())) { val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2'); } return val },

        isVatThresholdExceed: () => {

            let sp = $fn.parseNumeric($fn.header.sellingPrice.val());
            let discount = $fn.parseNumeric($fn.grid.discount.find(`.tblGridBody tr:eq(0) td:eq(${SPR_Discount_DiscountSP})`).text());

            nwParameter_Add(`itemgrouptype`, $fn.header.itemgroupType.val());
            nwParameter_Add(`amount`, $fn.discountMinus(sp, discount));
            func_ActionDriven('actIsVatThresholdExceed', false);
        },

        /*Vat Threshold exceed*/
        reComputeNonVat: () => {


            //remove VAT
            $fn.header.vatAmount.val('0.00');
            $fn.header.vatrate.val('0.00');


            $fn.reComputeHdr();
            $fn.changeTermDetailsNonVat();
            //$fn.changePaymentTermDetails();
        },

        computeHeader: () => {
            var obj = {};
            obj.lotPrice = $fn.parseNumeric($fn.header.lotPrice.val());
            obj.housePrice = $fn.parseNumeric($fn.header.housePrice.val());
            obj.sellingPrice = $fn.parseNumeric($fn.header.sellingPrice.val());
            obj.vatAmount = $fn.parseNumeric($fn.header.vatAmount.val());
            obj.grossSellingPrice = (obj.sellingPrice + obj.vatAmount);
            obj.miscInstallment = $fn.parseNumeric($fn.header.misc.val());
            obj.totalContractPrice = obj.grossSellingPrice + obj.miscInstallment;
            obj.salesDiscountAmount = obj.vatAmount > 0 ? $fn.getVatDiscount() : $fn.getnonVatDiscount();
            obj.dpDiscount = $fn.parseNumeric($fn.header.dpDiscAmt.val());
            obj.netContractPrice = obj.totalContractPrice - (obj.salesDiscountAmount + obj.dpDiscount);
            return obj;
        },

        reComputeHdr: () => {
            let z = $fn.computeHeader();
            $fn.header.lotPrice.val($fn.comma(z.lotPrice.toFixed(2)));
            $fn.header.housePrice.val($fn.comma(z.housePrice.toFixed(2)));
            $fn.header.sellingPrice.val($fn.comma(z.sellingPrice.toFixed(2)));
            $fn.header.grossSellingPrice.val($fn.comma(z.grossSellingPrice.toFixed(2)));
            $fn.header.misc.val($fn.comma(z.miscInstallment.toFixed(2)));
            $fn.header.tcp.val($fn.comma(z.totalContractPrice.toFixed(2)));
            $fn.header.salesDiscAmt.val($fn.comma(z.salesDiscountAmount.toFixed(2)));
            $fn.header.dpDiscAmt.val($fn.comma(z.dpDiscount.toFixed(2)));
            $fn.header.ntcp.val($fn.comma(z.netContractPrice.toFixed(2)));
        },

        changeTermDetailsNonVat: () => {

            let reserv = 0, category = '', ctr = 1, amount = 0, termamount = 0, oldtermamount = 0, vatamount = 0, totalVatAmount = 0;
            let max = JSON.parse(oldPaymentTermDetails).length - 1;

            $.each(Object.values(JSON.parse(oldPaymentTermDetails)), function (k, v) {
                if ((v).Code == 'RESRV')
                    reserv = parseFloat((v).TermAmount.split(',').join('')) || 0;
                else {
                    amount = oldtermamount = parseFloat((v).TermAmount.split(',').join('')) || 0.00;
                    //first portion
                    if (ctr == 1)
                        amount = (amount + reserv);

                    //last portion
                    if (ctr == max) {
                        vatamount = oldVatAmount - totalVatAmount;
                    } else {
                        vatamount = (amount / oldGrossSellingPrice) * oldVatAmount;
                        totalVatAmount = totalVatAmount + vatamount;
                    }

                    termamount = oldtermamount - vatamount;
                    contractAmount = termamount + parseFloat((v).miscInstallment.split(',').join('') || 0);

                    $fn.setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, (k + 1), nwCurrency(termamount));
                    $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_ContractAmount, (k + 1), nwCurrency(contractAmount));

                    let disctag = 0;
                    if (parseFloat($fn.header.cashAmount.val().split(',').join('')) > 0)
                        disctag = 1
                    else
                        disctag = 0;

                    $fn.doReCompute(0, (k + 1), disctag);

                    ctr++;
                }
            });
        },

        copyOldSP: () => {
            oldVatAmount = parseFloat($fn.header.vatAmount.val().split(',').join('')) || 0;
            oldGrossSellingPrice = parseFloat($fn.header.grossSellingPrice.val().split(',').join('')) || 0;
            oldPaymentTermDetails = $fn.html2json('nwGridPaymentTermDetails');
            oldVatRate = $fn.header.vatrate.val().split(',').join('') || 0;
        },
        resetting: () => {
            $fn.header.vatAmount.val($fn.comma(oldVatAmount.toFixed(2)));
            $fn.header.grossSellingPrice.val($fn.comma(oldGrossSellingPrice.toFixed(2)));
            $fn.header.vatrate.val($fn.comma(oldVatRate));
            $fn.header.salesDiscAmt.val('0.00');
            $fn.reComputeHdr();
            $fn.replacePaymentTermDetails();
            $fn.sumAllHeader();

        },

        replacePaymentTermDetails: () => {
            let old = JSON.parse(oldPaymentTermDetails);
            $('#nwGridPaymentTermDetailsData tr:gt(1)').each(function (i, x) {
                $fn.setGridData(`nwGridPaymentTermDetails`, `input`, SPR_PaymentTermDetails_TermAmount, i + 1, old[i].TermAmount);
                $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_ContractAmount, i + 1, old[i].contractAmount);
                $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_SalesDiscount, i + 1, old[i].salesDiscount);
                $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_NetContractPrice, i + 1, old[i].netContractPrice);
                $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPayment, i + 1, old[i].monthlyPayment);
                $fn.setGridData(`nwGridPaymentTermDetails`, ``, SPR_PaymentTermDetails_MonthlyPaymentWithoutMisc, i + 1, old[i].monthlyPaymentWithoutMisc);
            });
        }
    }
    return $fn;
}



////Action or Trigger When Closing of Pop-up
 $ServerLink = "";
var menuItemName = "";
var link = "";
function func_WindowCloseTrigger(verID) {
    var isContinue = true;

     serverlink = $ServerLink;

    if (verID === "nwUploadCon") {
        if (attachclick === "attachFile") {
            var filename = $("#nwUploadCon .aagfilename").text();
            var attachFile = "\\" + menuItemName + "\\" + filename;

            if (filename !== "") {
                link = serverlink + attachFile;

                crnwTR.find('td:eq(' + spr_PaymentDetailsAttachFilePath + ')').text(attachFile);

                let type = filename.split('.')[1].toLowerCase();

                if (type !== 'png' && type !== 'jpg' && type !== 'jpeg' && type !== "gif" && type !== 'pdf')
                    crnwTR.find("td:eq(" + spr_PaymentDetailsAttachViewAttachment + ") a").attr({ "href": link, "title": "\'Download\'", "download": "" });
                else {
                    crnwTR.find("td:eq(" + spr_PaymentDetailsAttachViewAttachment + ") .gridbtn a").remove();
                    crnwTR.find("td:eq(" + spr_PaymentDetailsAttachViewAttachment + ") .gridbtn").append("<a style='color: black !important; text-decoration: none;'>View</a>");
                }
            }
            $portal().customFunc.ChangeBtnReqDtlsGridColor();
        }
    }

    return isContinue;
}

let $rowGrid = "";
$(document).on("click", '.btnRemoveAttachment', function (e) {
    //var isDisabled = $('#conDocDtlsGrid').prop('disabled'),
    //    docCtrlCode = crnwTR.find("td:eq(" + SPR_DocumentControlCode + ")").text(),
    //    allowImage = crnwTR.find("td:eq(" + SPR_ImageTag + ")").text();

    //if (!$fn().isHDREmpty()) {
    //    if (!isDisabled && docCtrlCode !== "" && allowImage === "1") {
    $rowGrid = $(this).closest("tr");
    MessageBoxQuestion("Do you want to remove the attachment?", pagetitle);
    msgBoxContainerQuestion = "removeAttachment";

    //    }
    //}
    //else {
    //    MessageBox("Cannot proceed. Please complete the header details", title);
    //}
});



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
    if (size > 5242880 || !checkExtension(type)) {
        MessageBox("Attachment does not follow file type and size requirements."); $(ver).val("");
    }
    else {
        upload();
    }
}

function checkExtension(type) {
    var isValid = true;
    if (type !== "jpg" && type !== 'jpeg' && type !== 'png' && type !== 'gif' && type !== 'zip' && type !== 'rar' && type !== 'pdf'
        && type !== "xls" && type !== "xlsb" && type !== "xlsm" && type !== 'xlsx' && type !== 'doc'
        && type !== 'docx' && type !== 'docm' && type !== 'dotx' && type !== 'dotm' && type !== 'docb'
        && type !== 'pptx' && type !== 'pptm' && type !== 'ppt') {
        isValid = false;
    }

    return isValid;
}

function upload() {

    if ($("input[type = 'file']").val() === "") {
        $("#status").html("<span style=\"color:red;\">Please select file to upload!</span>");
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
    }
    else {
        (function () {
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');

            try {

                $('form').ajaxForm({
                    beforeSend: function () {
                        status.empty();
                        var percentVal = '0%';
                        bar.width(percentVal);
                        percent.html(percentVal);
                    },

                    uploadProgress: function (event, position, total, percentComplete) {
                        var percentVal = percentComplete + '%';
                        bar.width(percentVal);
                        percent.html(percentVal);
                    },

                    success: function () {
                        var percentVal = '100%';
                        bar.width(percentVal);
                        percent.html(percentVal);
                    },

                    complete: function (xhr) {
                        $('#status').html(xhr.responseText);
                    }
                });
            } catch (err) { alert(err); }
        })();
    }
}

$(document).on("click", ".btnViewAttachment", function (e) {
    var isDisabled = $portal().line.gridAttach.prop('disabled');
    var attachFile = crnwTR.find("td:eq(" + spr_PaymentDetailsAttachFilePath + ")").text()

    let src = $ServerLink + attachFile;

    //if (!$fn().isHDREmpty()) {
    if (!isDisabled && attachFile === "") {
        MessageBox("No attachment found.", "Attachment Details");
        return false;
    } else {

        //let type = attachFile.split('\\')[3].split('.')[1].toLowerCase();
        let type = attachFile.split('.')[1].toLowerCase();

        if (type === 'png' || type === 'jpg' || type === 'jpeg' || type === "gif" || type === 'pdf') {

            nwPopupForm_ShowModal("modal-View");

            $("#modal-View .galleryCon").remove();
            $("#modal-View .form-body").append(`<div class="galleryCon"></div`);

            if (type === 'png' || type === 'jpg' || type === 'jpeg' || type === "gif") {
                var html = `<div class="galleryItem"><img src="${src}" title="" href="${src}"/></div>`;
                $('.galleryCon').append(html);
            } else if (type === 'pdf') {
                var opt = { height: "450px", pdfOpenParams: { /*view: 'Fit',*/ scrollbars: '0', toolbar: '0', statusbar: '0', navpanes: '0' } };
                PDFObject.embed(src, ".galleryCon", opt);
            }

            $("#btnDownloadView .noah-webui-Toolbox-Item-Title a").attr({ "href": src, "title": "\'Download\'", "download": "" });

        }
    }
    //}
    //else {
    //    MessageBox("Cannot proceed. Please complete the header details", title);
    //}
});


//For Attachment of Item Specification
var attachclick = "";
$(document).on("click", '.btnAttachFile', function (e) {
    //var isDisabled = $('#conDocDtlsGrid').prop('disabled'),
    //    docCtrlCode = crnwTR.find("td:eq(" + SPR_DocumentControlCode + ")").text(),
    //    allowImage = crnwTR.find("td:eq(" + SPR_ImageTag + ")").text();

    //if (!$fn().isHDREmpty()) {
    //if (!isDisabled && docCtrlCode !== "" && allowImage === "1") {
    $("#fileCon").val("");
    $("#status").find("span").text("");
    $(".progress").find("div.percent").text("0%");
    $(".progress").find("div.bar").attr("style", "width:0%");

    nwPopupForm_ShowModal("nwUploadCon");
    attachclick = "attachFile";
    //}
    //}
    //else {
    //    MessageBox("Cannot proceed. Please complete the header details", title);
    //}
});

$(document).on("click", "#btnSaveAttachmentPaymentDetails", function (e) {
    nwLoading_Start("actbtnSaveAttachmentPaymentDetails", crLoadingHTML);
    nwParameter_Add_Table(`nwGridPaymentDetailsAttachmentCon`, false);
    nwParameter_Add(`isBank`, $isBank);
    func_ActionDriven("actbtnSaveAttachmentPaymentDetails", false);
    return false;
});

$(document).on('click', '#btnSavePaymentDetails', function (e) {
    nwLoading_Start("actbtnSavePaymentDetails", crLoadingHTML);
    nwParameter_Add_Table(`nwGridPaymentDetailsCon`, false);
    nwParameter_Add(`ReservationAmount`, $(`#txtReservationAmount`).val());
    nwParameter_Add(`attachmentDetails`, JSON.stringify($attachmentDetails));

    func_ActionDriven("actbtnSavePaymentDetails", false);
    return false;
})


let paymentMethod = [];
let $paymentDetails = []; var $attachmentDetails = [];
let $btnAttachmentDetailsIndex = 0;
let $uniqueID = '';
//let $bankName = '';
window.GLOBAL_CONSTANT = {
    paymentDetails: { paymentDetailsClear }, paymentDetails: { saveAttachmentDetails }, paymentDetails: { bindAttachmentDetails },
    paymentDetails: { defaultedBankDepository }, paymentDetails: { savePaymentDetails }, paymentDetails: { setID },
    paymentDetails: { getID }, paymentDetails: { isBank }, paymentDetails: { deleteAttachmentDetails },
    paymentDetails: { isContainMOP }
} = $portal();


let $isBank = 0;

function $portal() {
    let $portal = [];

    $portal = {

        fields: {
            projectCode: $('#idvallugBranchProject'),
            projectDesc: $('#descvallugBranchProject'),
            propertyType: $('#txtPropertyType'),
            unitCode: $('#new_txtUniCode'),
            unitDesc: $('#new_txtUniDesc'),
            inventoryTypeCode: $('#new_txtInventoryTypeCode'),
            inventoryTypeDesc: $('#new_txtInventoryTypeDesc'),
            inventoryClassCode: $('#new_txtInventoryClassCode'),
            inventoryClassDesc: $('#new_txtInventoryClassDesc'),
            inventoryGroupCode: $('#new_txtInventoryGroupCode'),
            inventoryGroupDesc: $('#new_txtInventoryGroupDesc'),
            lotArea: $('#new_txtLotArea'),
            floorArea: $('#new_txtFloorArea'),
            uomCode: $('#new_txtUnitofMeasureCode'),
            uom: $('#new_txtUnitofMeasure'),
            refHoldingNo: $('#new_txtRefHoldingNo'),
            itemGroupType: $('#txtItemGroupType'),


            lotPrice: $('#txtLotPrice'),
            housePrice: $('#txtHousePrice'),
            sellingPrice: $('#txtSellingPrice'),
            vatAmount: $('#txtVatAmount'),
            grossSellingPrice: $('#txtGrossSellingPrice'),
            miscellaneousAmount: $('#txtMisc'),
            tcp: $('#txtTCP'),
            salesDisc: $('#txtSalesDiscountAmount'),
            dpDisc: $("#txtDPDiscount"),
            netContractPrice: $('#txtNTCP'),

            vatRate: $('#txtVatrate'),
            reservAmount: $('#txtReservationAmount'),
            dpRate: $('#txtDPRate'),
            miscChargeRate: $('#txtRate'),
            miscAmount: $('#txtMiscAmt')
        },

        loadParameter_nwUnitCode: (isNew) => {
            $('#noah-webui-default-New').visible(false);
            $('#noah-webui-default-Save').enable(true);
            if ($portal.isPortal() == 1) {
                setTimeout(function () {
                    $('#noah-webui-default-New').click();
                }, 500);
                nwUnitCode = getParameterByName("nwUnitCode");
                nwParameter_Add(`nwUnitCode`, nwUnitCode);
            }
            else {
                setTimeout(function () {
                    $('#noah-webui-default-Refresh').click();
                }, 500);

                nwDocno = getParameterByName("nwDocno");
                nwParameter_Add(`nwDocno`, nwDocno);
                if (nwDocno != null && nwDocno.length > 0)
                    $('#noah-webui-Toolbox').visible(false);
            }
        },

        isPortal: () => {
            nwUnitCode = getParameterByName("nwUnitCode");
            nwParameter_Add(`nwUnitCode`, nwUnitCode);
            return nwUnitCode != null && nwUnitCode.length > 0 ? 1 : 0;
        },

        disableFields: () => {
            $.each(Object.values($portal.fields), function (i, x) {
                x.enable(false);
            });
        },

        populateLocalHomeAmount: (i) => {
            let row = i;
            let ocyAmount = parseFloat($portal.getGridData('nwGridPaymentDetails', 'input', spr_PaymentDetailsOcyAmount, row).replace(/,/g, '')) || 0;
            let localRate = parseFloat($portal.getGridData('nwGridPaymentDetails', '', spr_PaymentDetailsExchangeRateToLocal, row).toString().replace(/,/g, '')) || 0;
            let homeRate = parseFloat($portal.getGridData('nwGridPaymentDetails', '', spr_PaymentDetailsExchangeRateToHome, row).toString().replace(/,/g, '')) || 0;

            localRate = localRate == 0 ? 1 : localRate;
            homeRate = homeRate == 0 ? 1 : homeRate;

            let localAmount = $portal.convertOCYAmount(ocyAmount, localRate);
            let homeAmount = $portal.convertOCYAmount(ocyAmount, localRate);

            $portal.setGridData(`nwGridPaymentDetails`, '', spr_PaymentDetailsLocalAmount, row, nwCurrency(localAmount));
            $portal.setGridData(`nwGridPaymentDetails`, '', spr_PaymentDetailsHomeAmount, row, nwCurrency(homeAmount));
        },

        convertOCYAmount: (amt, rate) =>amt * rate,

        //Not Applicable
        //clearFields: () =>{
        //    $.each(Object.values($portal.fields), function (i, x) {
        //        x.val('');
        //    });
        //},

        populateFields: (u) => {
            $portal.fields.projectCode.val(u[0].projectCode);
            $portal.fields.projectDesc.val(u[0].projectDesc);
            $portal.fields.propertyType.val(u[0].PropertyType);
            $portal.fields.unitCode.val(u[0].UnitCode);
            $portal.fields.unitDesc.val(u[0].UnitDesc);
            $portal.fields.inventoryTypeCode.val(u[0].InventoryTypeCode);
            $portal.fields.inventoryTypeDesc.val(u[0].InventoryTypeDesc);
            $portal.fields.inventoryClassCode.val(u[0].InventoryClassCode);
            $portal.fields.inventoryClassDesc.val(u[0].InventoryClassDesc);
            $portal.fields.inventoryGroupCode.val(u[0].inventoryGroupCode);
            $portal.fields.inventoryGroupDesc.val(u[0].inventoryGroupDesc);
            $portal.fields.lotArea.val(u[0].LotArea);
            $portal.fields.floorArea.val(u[0].FloorArea);
            $portal.fields.uomCode.val(u[0].uomCode);
            $portal.fields.uom.val(u[0].UOM);
            $portal.fields.refHoldingNo.val(u[0].refHoldingNo);

            $portal.fields.lotPrice.val(u[0].lotPrice);
            $portal.fields.housePrice.val(u[0].housePrice);
            $portal.fields.sellingPrice.val(u[0].sellingPrice);
            $portal.fields.vatAmount.val(u[0].vatAmount);
            $portal.fields.grossSellingPrice.val(u[0].grossSellingPrice);
            $portal.fields.miscellaneousAmount.val(u[0].Misc);
            $portal.fields.tcp.val(u[0].tcp);
            $portal.fields.salesDisc.val(u[0].salesDisc);
            $portal.fields.dpDisc.val(u[0].dpDisc);
            $portal.fields.netContractPrice.val(u[0].netContractPrice);

            $portal.fields.vatRate.val(u[0].VatRate);
            $portal.fields.reservAmount.val(u[0].MinReservationAmt);
            $portal.fields.dpRate.val(u[0].InhouseDPRate);
            $portal.fields.miscChargeRate.val(u[0].MiscChargeRate);
            $portal.fields.miscAmount.val(u[0].MiscChargeAmt);
            $portal.fields.itemGroupType.val(u[0].ItemGroupType);

            //fit old design
            $portal.setGridData(`nwGridUnitDetails`, `combo`, SPR_UnitDetails_Category, 0, u[0].inventoryCategoryCode);
            $portal.setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitCode, 0, u[0].UnitCode);
            $portal.setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UnitDesc, 0, u[0].UnitDesc);
            $portal.setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_UOM, 0, u[0].uomCode);
            $portal.setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_LotArea, 0, u[0].LotArea);
            $portal.setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_FloorArea, 0, u[0].FloorArea);
            $portal.setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_InventoryTypeCode, 0, u[0].InventoryTypeCode);
            $portal.setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_InventoryType, 0, u[0].InventoryTypeDesc);
            $portal.setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_InventoryClassCode, 0, u[0].InventoryClassCode);
            $portal.setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_InventoryClass, 0, u[0].InventoryClassDesc);
            $portal.setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_Model, 0, '');
            $portal.setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_RefHoldingNo, 0, u[0].ReferenceHoldingNo);
            $portal.setGridData(`nwGridUnitDetails`, ``, SPR_UnitDetails_CrossReferenceCode, 0, u[0].CrossReference);




        },
        line: {
            grid: $("#nwGridPaymentDetailsCon"),
            gridAttach: $('#nwGridPaymentDetailsAttachmentCon')
        },
        setGridData: (nwGrid, type, col, row, val) => {
            if (type == `input`)
                $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val(val);
            else if (type == `combo`)
                $(`#${nwGrid}-nwData tr:eq(${row}) td:eq(${col}) select`).val(val);
            else
                $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text(val);
        },
        getGridData: (nwGrid, type, col, row) => {
            let result = '';
            if (type == `input`)
                result = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val();
            else if (type == `combo`)
                result = $(`#${nwGrid}-nwData tr:eq(${row}) td:eq(${col}) select`).val();
            else
                result = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text();
            return result;
        },
        isSeller: (isSeller) => {
            if (isSeller) {
                $('.req').removeClass('isinvisible');
                $('#lugAgent').enable(true);
            }
            else {
                $('.req').addClass('isinvisible');
                $('#lugAgent').enable(false);

                //$('#idvallugAgent').prop('disabled', true);
                $('#idvallugAgent').val('');
                $('#descvallugAgent').val('');
                $('#txtAgentType').val('');

            }
        },

        customFunc: {
            paymentDetailsCon: () => {
                $.each($portal.line.grid.find("table tbody tr"), function (k, v) {
                    $(v).find(`.clsOcyAmount`).loadCurrency();

                    $(v).find(`.clsDate`).enable(false);
                    $(v).find(`.clsBranch`).enable(false);
                    $(v).find(`.clsCheckNo`).enable(false);
                    $(v).find(`.clsCardName`).enable(false);
                    $(v).find(`.clsCardNo`).enable(false);
                    $(v).find(`.clsExpiryDate`).enable(false);
                    $(v).find(`.clsApprovalNo`).enable(false);

                    var uniqueID = $(v).find(`td:eq(${spr_PaymentDetailsUniqueID})`).text();
                    if ($attachmentDetails.filter(x=>x['Unique ID'] == uniqueID).length > 0)
                        $portal.paymentDetails.bindGreenColor(k, true);
                    else
                        $portal.paymentDetails.bindGreenColor(k, false);

                    var code = $(v).find(`td:eq(${spr_PaymentDetailsModeOfPaymentCode})`).text();
                    if (code != '')
                        $portal.paymentMethodCondition(code, k, false);
                });
            },

            paymentDetailsAttachmentCon: () => {
                $.each($portal.line.grid.find("table tbody tr"), function (k, v) {
                    if ($isBank == 0) {
                    }
                });
            },



            ChangeBtnReqDtlsGridColor: () => {
                let attachment = "";
                $('#nwGridPaymentDetailsAttachmentCon .tblGridBody tr').each(function (k, v) {
                    attachment = $(v).find("td:eq(" + spr_PaymentDetailsAttachFilePath + ")").text();
                    if (attachment !== '') {
                        $(v).find("td:eq(" + spr_PaymentDetailsAttachViewAttachment + ")").css("background-image", "linear-gradient(#04E20B, #08A206)");
                    } else {
                        $(v).find("td:eq(" + spr_PaymentDetailsAttachViewAttachment + ")").css("background-image", "linear-gradient(#fefefe, #bbb)");
                    }
                });
            }
        },


        paymentMethodCondition: (code, i, isClear) => {
            if (paymentMethod.length > 0) {
                let selectedPaymentMethod = [];

                selectedPaymentMethod = paymentMethod.filter(x=>x["code"] == code);

                let arr = $portal.isChecked(selectedPaymentMethod);
                let bind = $portal.enabledDisabledColumn;

                if (isClear)
                    $portal.clearPaymentDetails(bind, i);

                $portal.elemTD(bind.column(i, spr_PaymentDetailsPaymentCenterCode), arr.isPaymentCenter);
                $portal.elemTD(bind.column(i, spr_PaymentDetailsCardTypeDesc), arr.isPaymentCenter);

                $portal.elemTD(bind.column(i, spr_PaymentDetailsBankCode), arr.bank);
                $portal.elemTDwithInput(bind.column(i, spr_PaymentDetailsBranch), arr.bank);

                $portal.elemTDwithInput(bind.column(i, spr_PaymentDetailsCardName), arr.cardDetails);
                $portal.elemTDwithInput(bind.column(i, spr_PaymentDetailsCardNo), arr.cardDetails);

                $portal.elemTDwithInput(bind.column(i, spr_PaymentDetailsExpiryDate), arr.cardDetails);
                $portal.elemTDwithInput(bind.column(i, spr_PaymentDetailsApprovalNo), arr.cardDetails);

                $portal.elemTDwithInput(bind.column(i, spr_PaymentDetailsCheckNo), arr.checkDetails);
                $portal.elemTDwithInput(bind.column(i, spr_PaymentDetailsCheckDate), arr.checkDetails);


            }
        },

        isChecked: (selectedPaymentMethod) => {
            return selectedPaymentMethod.length > 0 ? {
                isPaymentCenter: selectedPaymentMethod[0].paymentCenter,
                bank: selectedPaymentMethod[0].bank,
                cardDetails: selectedPaymentMethod[0].cardDetails,
                checkDetails: selectedPaymentMethod[0].checkDetails,
                collectorDetails: selectedPaymentMethod[0].collectorDetails
            } : { isPaymentCenter: 0, bank: 0, cardDetails: 0, checkDetails: 0, collectorDetails: 0 };
        },

        clearPaymentDetails: (bind, i) => {
            bind.column(i, spr_PaymentDetailsModeOfPaymentCode).textContent = '';
            bind.column(i, spr_PaymentDetailsModeOfPaymentDesc).textContent = '';

            bind.column(i, spr_PaymentDetailsPaymentCenterCode).textContent = '';
            bind.column(i, spr_PaymentDetailsPaymentCenterDesc).textContent = '';
            bind.column(i, spr_PaymentDetailsCardTypeCode).textContent = '';
            bind.column(i, spr_PaymentDetailsCardTypeDesc).textContent = '';
            bind.column(i, spr_PaymentDetailsBankCode).textContent = '';
            bind.column(i, spr_PaymentDetailsBankName).textContent = '';

            bind.column(i, spr_PaymentDetailsBranch).getElementsByTagName('input')[0].value = '';
            bind.column(i, spr_PaymentDetailsCardName).getElementsByTagName('input')[0].value = '';
            bind.column(i, spr_PaymentDetailsCardNo).getElementsByTagName('input')[0].value = '';
            bind.column(i, spr_PaymentDetailsExpiryDate).getElementsByTagName('input')[0].value = '';
            bind.column(i, spr_PaymentDetailsApprovalNo).getElementsByTagName('input')[0].value = '';
            bind.column(i, spr_PaymentDetailsCheckNo).getElementsByTagName('input')[0].value = '';
            bind.column(i, spr_PaymentDetailsCheckDate).getElementsByTagName('input')[0].value = '';
        },

        enabledDisabledColumn: {
            grid: document.getElementById("nwGridPaymentDetails-nwData"),
            row: (index) => $portal.enabledDisabledColumn.grid.getElementsByTagName('tr')[index],
            column: (index, column) => $portal.enabledDisabledColumn.row(index).getElementsByTagName('td')[column],
        },

        elemTD: (bind, isChecked) => { isChecked == 1 ? bind.style.background = 'cyan' : bind.style.background = 'gainsboro' },

        elemTDwithInput: (bind, isChecked) => {
            bind.style.background = isChecked == 1 ? 'white' : 'gainsboro';
            bind.getElementsByTagName('input')[0].style.background = isChecked == 1 ? 'white' : 'gainsboro';
            bind.getElementsByTagName('input')[0].disabled = !isChecked;
        },




        paymentDetails: {
            grid: (index, cols) =>document.getElementById("nwGridPaymentDetails-nwData").getElementsByTagName('tr')[index].getElementsByTagName('td')[cols],

            isContainMOP: (i) => { return $portal.paymentDetails.grid(i, spr_PaymentDetailsModeOfPaymentCode).textContent.length > 0 ? true : false; },

            paymentDetailsClear: () => {
                $paymentDetails = [];
                $attachmentDetails = [];
                $isBank = 0;
            },



            bindAttachmentDetails: () => {
                let fileName = '';
                $('#nwGridPaymentDetailsAttachmentCon .tblGridBody tr').each(function (i, n) {
                    fileName = $(n).find(`td:eq(${spr_PaymentDetailsAttachFilePath})`).text() || '';
                    if (fileName != '') {
                        let type = fileName.split('.')[1].toLowerCase();


                        if (type !== 'png' && type !== 'jpg' && type !== 'jpeg' && type !== "gif" && type !== 'pdf')
                            $(n).find("td:eq(" + spr_PaymentDetailsAttachViewAttachment + ") a").attr({ "href": link, "title": "\'Download\'", "download": "" });
                        else {
                            $(n).find("td:eq(" + spr_PaymentDetailsAttachViewAttachment + ") .gridbtn a").remove();
                            $(n).find("td:eq(" + spr_PaymentDetailsAttachViewAttachment + ") .gridbtn").append("<a style='color: black !important; text-decoration: none;'>View</a>");
                        }
                    }

                    //$portal.paymentDetails.defaultedBankDepository(i);
                });

                $portal.customFunc.ChangeBtnReqDtlsGridColor();
            },

            defaultedBankDepository: (index) => { $(`#nwGridPaymentDetailsAttachmentCon .tblGridBody tr:eq(${index}) td:eq(${spr_PaymentDetailsAttachDepositoryBank})`).text($bankName); },


            isBank: (Code) => {
                let selectedPaymentMethod = [];
                selectedPaymentMethod = paymentMethod.filter(x=>x["code"] == Code);
                let arr = $portal.isChecked(selectedPaymentMethod);
                return arr.bank
            },

            removeAttachedUnmatchInPaymentDetails: () => {
                let remain = [];
                for (let i in $attachmentDetails) {
                    if ($paymentDetails.filter(x=>x['Unique ID'] == $attachmentDetails[i]['Unique ID']).length > 0)
                        remain.push($attachmentDetails[i]);
                }
                $attachmentDetails = remain;
            },

            savePaymentDetails: () => {
                $paymentDetails = [];
                $('#nwGridPaymentDetailsCon .tblGridBody tr').each(function (i, n) {
                    var $row = $(n);
                    $paymentDetails.push({
                        ['Mode of Payment Code']: $row.find('td:eq(' + spr_PaymentDetailsModeOfPaymentCode + ')').text(),
                        ['Mode of Payment Description']: $row.find('td:eq(' + spr_PaymentDetailsModeOfPaymentDesc + ')').text(),
                        ['Payment Method Code']: $row.find('td:eq(' + spr_PaymentDetailsPaymentMethodCode + ')').text(),
                        ['Payment Method']: $row.find('td:eq(' + spr_PaymentDetailsPaymentMethodDesc + ')').text(),
                        ['Currency Code']: $row.find('td:eq(' + spr_PaymentDetailsCurrencyCode + ')').text(),
                        ['Currency Description']: $row.find('td:eq(' + spr_PaymentDetailsCurrencyDesc + ')').text(),
                        ['Exchange Rate to Local']: $row.find('td:eq(' + spr_PaymentDetailsExchangeRateToLocal + ')').text(),
                        ['Exchange Rate to Home']: $row.find('td:eq(' + spr_PaymentDetailsExchangeRateToHome + ')').text(),
                        ['OCY Amount']: $row.find('td:eq(' + spr_PaymentDetailsOcyAmount + ') input').val(),
                        ['Local Amount']: $row.find('td:eq(' + spr_PaymentDetailsLocalAmount + ')').text(),
                        ['Home Amount']: $row.find('td:eq(' + spr_PaymentDetailsHomeAmount + ')').text(),
                        ['Payment Center Code']: $row.find('td:eq(' + spr_PaymentDetailsPaymentCenterCode + ')').text(),
                        ['Payment Center Description']: $row.find('td:eq(' + spr_PaymentDetailsPaymentCenterDesc + ')').text(),
                        ['Check No.']: $row.find('td:eq(' + spr_PaymentDetailsCheckNo + ') input').val(),
                        ['Check Date']: $row.find('td:eq(' + spr_PaymentDetailsCheckDate + ') input').val(),
                        ['Bank Code']: $row.find('td:eq(' + spr_PaymentDetailsBankCode + ')').text(),
                        ['Bank Name']: $row.find('td:eq(' + spr_PaymentDetailsBankName + ')').text(),
                        ['Branch']: $row.find('td:eq(' + spr_PaymentDetailsBranch + ') input').val(),
                        ['Card Type Code']: $row.find('td:eq(' + spr_PaymentDetailsCardTypeCode + ')').text(),
                        ['Card Type']: $row.find('td:eq(' + spr_PaymentDetailsCardTypeDesc + ')').text(),
                        ['Card Name']: $row.find('td:eq(' + spr_PaymentDetailsCardName + ') input').val(),
                        ['Card No.']: $row.find('td:eq(' + spr_PaymentDetailsCardNo + ') input').val(),
                        ['Expiry Date']: $row.find('td:eq(' + spr_PaymentDetailsExpiryDate + ') input').val(),
                        ['Approval No.']: $row.find('td:eq(' + spr_PaymentDetailsApprovalNo + ') input').val(),
                        ['Attachment Details']: $row.find('td:eq(' + spr_PaymentDetailsAttachmentDetails + ')').text(),
                        ['Unique ID']: $row.find('td:eq(' + spr_PaymentDetailsUniqueID + ')').text()
                    });
                });

                $portal.paymentDetails.removeAttachedUnmatchInPaymentDetails();
                MessageBox("Saved successfully", "Payment Details");
            },

            deleteAttachmentDetails: (uniqueID) => { $attachmentDetails = $attachmentDetails.filter(item=>item['Unique ID'] != uniqueID); },

            saveAttachmentDetails: () => {
                let uniqueID = $uniqueID;
                let ctr = $btnAttachmentDetailsIndex;
                $attachmentDetails = $attachmentDetails.filter(item=>item['Unique ID'] != uniqueID);
                $('#nwGridPaymentDetailsAttachmentCon .tblGridBody tr').each(function (i, n) {
                    var $row = $(n);
                    $attachmentDetails.push({
                        ['Account No.']: $row.find('td:eq(' + spr_PaymentDetailsAttachAccountNo + ')').text(),
                        ['Document Name']: $row.find('td:eq(' + spr_PaymentDetailsAttachDocumentName + ') input').val(),
                        ['Depository Bank Code']: $row.find('td:eq(' + spr_PaymentDetailsAttachDepositoryBankCode + ')').text(),
                        ['Depository Bank']: $row.find('td:eq(' + spr_PaymentDetailsAttachDepositoryBank + ')').text(),
                        ['Branch']: $row.find('td:eq(' + spr_PaymentDetailsAttachBranch + ')').text(),
                        ['Date Deposited']: $row.find('td:eq(' + spr_PaymentDetailsAttachDateDeposited + ') input').val(),
                        ['Attach']: $row.find('td:eq(' + spr_PaymentDetailsAttachAttachment + ')').text(),
                        ['File Path']: $row.find('td:eq(' + spr_PaymentDetailsAttachFilePath + ')').text(),
                        ['View Attachment']: $row.find('td:eq(' + spr_PaymentDetailsAttachViewAttachment + ')').text(),
                        ['Remove']: $row.find('td:eq(' + spr_PaymentDetailsAttachRemove + ')').text(),
                        ['Particulars']: $row.find('td:eq(' + spr_PaymentDetailsAttachParticulars + ') input').val(),
                        ['Unique ID']: uniqueID
                    });
                });


                $portal.paymentDetails.bindGreenColor((ctr), true);
                MessageBox("Saved successfully", "Attachment Details");
            },

            bindGreenColor: (index, hasData) => { hasData ? $(`#nwGridPaymentDetailsCon .tblGridBody tr:eq(${index}) td:eq(${spr_PaymentDetailsAttachmentDetails})`).css("background-image", "linear-gradient(#04E20B, #08A206)") : $(`#nwGridPaymentDetailsCon .tblGridBody tr:eq(${index}) td:eq(${spr_PaymentDetailsAttachmentDetails})`).css("background-image", "linear-gradient(#fefefe, #bbb)") },

            paymentDetailsContainAttachment: () => {
                let cnt = $paymentDetails.length;
                for (let i = 0; i < cnt; i++) {
                    if ($paymentDetails[i]['Attachment Details']['Document Name'].length > 0)
                        $portal.paymentDetails.bindGreenColor(i, true);
                }
            },

            setID: (index) => $(`#nwGridPaymentDetailsCon .tblGridBody tr:eq(${index}) td:eq(${spr_PaymentDetailsUniqueID})`).text($portal.paymentDetails.generateID()),

            getID: (index) =>$(`#nwGridPaymentDetailsAttachmentCon .tblGridBody tr:eq(${index}) td:eq(${spr_PaymentDetailsAttachUniqueID})`).text($uniqueID),

            generateID: () => (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),//'_' + Math.random().toString(36).substr(2, 9),

        }
    }
    return $portal;
}

$.fn.loadCurrency = function (opts) {
    var def = $.extend({
        integerDigits: 18
    }, opts);

    return this.inputmask("currency", {
        prefix: "",
        integerDigits: def.integerDigits,
        enforceDigitsOnBlur: true,
        clearMaskOnLostFocus: true,
        allowMinus: false,
        oncleared: function () { $(this).val(''); }
    });
};


function sumTotalDiscountSP() {
    var total = 0;
    $('#nwGridDiscount-nwData tr').each(function (i, x) {
        total += parseFloat($(this).find('td:eq(' + SPR_Discount_DiscountSP + ')').text().split(',').join('')) || 0;
    })
    return total;
}

    $(document).on("click", "#settingstabsBut-1", function (e) {

        $(".detailsTab").hide()
        $("#settingstabs-1").show()
        nwParameter_Add('ReservationControlNo', $("#txtReservationControlNo").val());
        func_ActionDriven('actShowGridPaymentTerm', false)

        nwLoading_Start('actShowGridPaymentTerm', crLoadingHTML);
    });


    $(document).on("click", "#settingstabsBut-2", function (e) {

        $(".detailsTab").hide()
        $("#settingstabs-2").show()
        nwParameter_Add('ReservationControlNo', $("#txtReservationControlNo").val());
        func_ActionDriven('actShowGridPaymentTerm', false)

        nwLoading_Start('actShowGridPaymentTerm', crLoadingHTML);
    });



    $(document).on("click", "#settingstabsBut-3", function (e) {


        $(".detailsTab").hide()
        $("#settingstabs-3").show()
        nwParameter_Add('ReservationControlNo', $("#txtReservationControlNo").val());
        func_ActionDriven('actShowGridDiscount', false)
        nwLoading_Start('actShowGridDiscount', crLoadingHTML);
    });



    $(document).on("click", "#settingstabsBut-4", function (e) {
        $(".detailsTab").hide()
        $("#settingstabs-4").show()
        nwParameter_Add('ReservationControlNo', $("#txtReservationControlNo").val());
        func_ActionDriven('actShowGridAddOns', false)
        nwLoading_Start('actShowGridAddOns', crLoadingHTML);
    });



    $(document).on("click", "#settingstabsBut-5", function (e) {
        $(".detailsTab").hide()
        $("#settingstabs-5").show()
        nwParameter_Add('ReservationControlNo', $("#txtReservationControlNo").val());
        func_ActionDriven('actShowGridCoBuyer', false)
        nwLoading_Start('actShowGridCoBuyer', crLoadingHTML);
    });



$(document).on("click", "#btnReloadCoBuyerData", function (e) {
    $('li#settingstabsBut-5').click();
});


$(document).on("click", "#btnReqCompliance", function (e) {

    var trantype = 'PAYTRM';
    var docno = $('#txtReservationControlNo').val();
    var status = $('#txtStatusHidden').val();
    nwDocno = getParameterByName('nwDocno');

    if (status == "3" || nwDocno != "") {
        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&isView=true";

    } else {
        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&isView=false";
    }


    nwLoading_Start('btnReqCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpReqComp", true, fullength);
    $('#nwPopUpReqComp .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpReqComp").css({ "min-width": "98%" });
    $("#nwPopUpReqComp").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpReqComp");
    nwLoading_End('btnReqCompliance');


});


$(document).on("click", "#RefAddOn", function (e) {
    nwLoading_Start('RefAddOn', crLoadingHTML);
    nwParameter_Add('ReservationControlNo', $("#txtReservationControlNo").val());
    nwParameter_Add('new_txtUniCode', $("#new_txtUniCode").val());
    nwPopupForm_ShowModal("nwReferenceBaseAddOn");
    func_ActionDriven("actRefBasedAddOn", false);


});



function disableFirstRow() {
    nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetEnable(SPR_PaymentTermDetails_PaymentCategoryDesc - 1, 0, false)
    nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetEnable(SPR_PaymentTermDetails_PaymentTermCode - 1, 0, false)
    nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetEnable(SPR_PaymentTermDetails_DPDiscount - 1, 0, false)
}




function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {

    if (nwGridID == "nwGridRefBased") {

        var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
        var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

        crnwTRtemp[SPR_RefAddon_UnitCode - 1] = code;
        crnwTRtemp[SPR_RefAddon_Desc - 1] = desc;

    }
    if (nwGridID == "nwGridPaymentTermDetails") {
        var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
        var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

        crnwTRtemp[SPR_PaymentTermDetails_PaymentCategory - 1] = code;
        crnwTRtemp[SPR_PaymentTermDetails_PaymentCategoryDesc - 1] = desc;

        //

    }


    return crnwTRtemp;
}


$(document).on("click", "#btnSaveRefBasedAddOn", function (e) {

    nwParameter_Add_DataSet("nwGridRefBased");
    func_ActionDriven("actRefBasedAddOnSave", false);

});


$(document).on("click", "#btnRefreshRefBasedAddon", function (e) {
    nwLoading_Start('RefAddOn', crLoadingHTML);
    nwParameter_Add('ReservationControlNo', $("#txtReservationControlNo").val());
    nwParameter_Add('new_txtUniCode', $("#new_txtUniCode").val());

    func_ActionDriven("actRefBasedAddOn", false);


});




function p8Spread_Click(canvasID, row, col) {

    if (canvasID == "nwGridPaymentTermDetails") {
        if (col = SPR_PaymentTermDetails_DPDiscount - 1) {
            if (nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetValueBolean(9, row) == true) {
                nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetEnable(SPR_PaymentTermDetails_DPDiscountRate - 1, row, true);
                nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetEnable(SPR_PaymentTermDetails_DPDiscountAmount - 1, row, true);
                nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetBackground(SPR_PaymentTermDetails_DPDiscountRate - 1, row, "white")
                nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetBackground(SPR_PaymentTermDetails_DPDiscountAmount - 1, row, "white")
            } else {
                nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetEnable(SPR_PaymentTermDetails_DPDiscountRate - 1, row, false);
                nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetEnable(SPR_PaymentTermDetails_DPDiscountAmount - 1, row, false);
                nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetBackground(SPR_PaymentTermDetails_DPDiscountRate - 1, row, "gainsboro")
                nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetBackground(SPR_PaymentTermDetails_DPDiscountAmount - 1, row, "gainsboro")
            }


        }


    }
    if (canvasID == "nwGridAddOn") {
        if (col = SPR_Addon_AddonItemCode - 1) {
            nwParameter_Add('ItemGroupType', $("#txtItemGroupType").val());

        }



    }


    return true;
    //console.log("p8Spread_Change " + canvasID + " " + row + " " + col);

}



$(document).on('change', '#txtBalStartDate', function (e) {


    if ($("#txtDPStartDate").val() > $("#txtDPStartDate").val()) {

        MessageBox('Balance Start Date should be before DP Start Date ', pagetitle);
        $("#txtBalStartDate").val('');
    }

});




function defaultDataMiscGrid() {

    nwGridMainCon_Book_MiscType.ActiveSheet.SetText(SPR_MISC_MISCTYPE - 1, -0, "AMORT");
    nwGridMainCon_Book_MiscType.ActiveSheet.SetText(SPR_ALLOCATIONTYPE - 1, 0, "001");
    nwGridMainCon_Book_MiscType.ActiveSheet.SetText(SPR_MISCELLANEOUSDATE - 1, 0, $("#txtDPStartDate").val());
}


$(document).on("click", "#nwGridMiscellaneousFee .nwgrid_Insert ", function (e) {

    nwGridMainCon_Book_MiscType.ActiveSheet.SetText(SPR_MISC_MISCTYPE - 1, -1, "AMORT");
    nwGridMainCon_Book_MiscType.ActiveSheet.SetText(SPR_ALLOCATIONTYPE - 1, -1, "001");
    nwGridMainCon_Book_MiscType.ActiveSheet.SetText(SPR_MISCELLANEOUSDATE - 1, -1, $("#txtDPStartDate").val());
});


function changeColorBtnMiscDtl() {
    $("#btnMiscellaneousDetails ").addClass("btnBlue")
}



$('#nwGridPaymentTermDetails_vw_tbl').on('change', 'input', function () {

    console.log();

});

function p8Spread_Change(canvasID, row, col) {


    if (canvasID == "nwGridPaymentTermDetails") {

        if (col = SPR_PaymentTermDetails_DPDiscountRate - 1) {


            var rowNo = nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetMaxRow();
            var rowSelected = nwGridMainCon_Book_PaymentTerm.ActiveSheet.CellSelected.row - 1

            var tempValDisctRate = 0;
            var tempValDisctAmount = 0;

            for (var i = 1; i <= rowNo - 1; i++) {

                tempValDisctRate += parseFloat(nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetText(SPR_PaymentTermDetails_DPDiscountRate - 1, i))

            }

            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(SPR_PaymentTermDetails_DPDiscountRate - 1, 0, tempValDisctRate.toString());

        }

        if (col = SPR_PaymentTermDetails_DPDiscountAmount - 1) {

            var rowNo = nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetMaxRow();
            var rowSelected = nwGridMainCon_Book_PaymentTerm.ActiveSheet.CellSelected.row - 1

            var tempValDisctRate = 0;
            var tempValDisctAmount = 0;
            var totalTempNetContractPrice = 0;
            var totalTempMonthly = 0;

            var contractAmount = nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetText(SPR_PaymentTermDetails_ContractAmount - 1, rowSelected) || 0;
            var salesDiscount = nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetText(SPR_PaymentTermDetails_SalesDiscount - 1, rowSelected) || 0;
            var dpDiscountAmount = nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetText(SPR_PaymentTermDetails_DPDiscountAmount - 1, rowSelected) || 0;

            if (parseFloat(contractAmount) > 0) {
                var tempNetContractPrice = parseFloat(contractAmount.split(",").join("")) - parseFloat(salesDiscount.split(",").join("")) - parseFloat(dpDiscountAmount.split(",").join(""));

            } else {
                var tempNetContractPrice = parseFloat(contractAmount) - parseFloat(salesDiscount) - parseFloat(dpDiscountAmount.split(",").join(""));

            }

            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(SPR_PaymentTermDetails_NetContractPrice - 1, rowSelected, tempNetContractPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') || 0);
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(SPR_PaymentTermDetails_MonthlyPayment - 1, rowSelected, tempNetContractPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') || 0);



            //Total(header grid)
            for (var i = 1; i <= rowNo - 1; i++) {

                tempValDisctAmount += parseFloat(nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetText(SPR_PaymentTermDetails_DPDiscountAmount - 1, i).split(",").join(""))
                totalTempNetContractPrice += parseFloat(nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetText(SPR_PaymentTermDetails_NetContractPrice - 1, i).split(",").join(""))
                totalTempMonthly += parseFloat(nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetText(SPR_PaymentTermDetails_MonthlyPayment - 1, i).split(",").join(""))
            }
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(SPR_PaymentTermDetails_NetContractPrice - 1, 0, totalTempNetContractPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(SPR_PaymentTermDetails_MonthlyPayment - 1, 0, totalTempMonthly.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(SPR_PaymentTermDetails_DPDiscountAmount - 1, 0, tempValDisctAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));



            $('#txtDPDiscount').val(nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetText(SPR_PaymentTermDetails_DPDiscountAmount - 1, 0));
            var temptxtNTCP = parseFloat($("#txtDPDiscount").val().split(",").join("")) + parseFloat($("#txtSalesDiscountAmount").val().split(",").join(""));
            var result = parseFloat($("#txtTCP").val().split(",").join("")) - temptxtNTCP;
            $('#txtNTCP').val(result);

        }

    }


    if (canvasID == "nwGridDiscount") {

        if (col = SPR_Discount_DiscountRate - 1) {

            var rowNo = nwGridMainCon_Book_Discount.ActiveSheet.GetMaxRow();
            var rowSelected = nwGridMainCon_Book_Discount.ActiveSheet.CellSelected.row - 1
            var discRate = nwGridMainCon_Book_Discount.ActiveSheet.GetText(SPR_Discount_DiscountRate - 1, rowSelected);

            var tempValDisctRate = 0;

            for (var i = 0; i <= rowNo - 1; i++) {

                tempValDisctRate += parseFloat(nwGridMainCon_Book_Discount.ActiveSheet.GetText(SPR_Discount_DiscountRate - 1, i))
            }



            discRate = '0.0' + tempValDisctRate.toString().split(".").join("")
            var x = parseFloat($("#txtTCP").val().split(",").join("")) * parseFloat(discRate)
            x = x.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
            $("#txtSalesDiscountAmount").val(x)
            $("#txtDPDiscount").val(nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetText(SPR_PaymentTermDetails_DPDiscountAmount - 1, 0));

            var result = parseFloat($("#txtTCP").val().split(",").join("")) - (parseFloat(x.split(",").join("")) + parseFloat($("#txtDPDiscount").val().split(",").join("")));
            $('#txtNTCP').val(result.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
        }

    }
}



function loadComputation_newspread() {




    if ($("#txtReservationControlNo").val() != "") {
        var rowNo = nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetMaxRow();
        var tempValDisctAmount = 0;


        var tempValDisctRate = 0;
        var totalTempNetContractPrice = 0;
        var totalTempMonthly = 0;



        for (var i = 1; i <= rowNo - 1; i++) {



            tempValDisctAmount += parseFloat(nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetText(SPR_PaymentTermDetails_DPDiscountAmount - 1, i).split(",").join(""))
            totalTempNetContractPrice += parseFloat(nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetText(SPR_PaymentTermDetails_NetContractPrice - 1, i).split(",").join(""))
            totalTempMonthly += parseFloat(nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetText(SPR_PaymentTermDetails_MonthlyPayment - 1, i).split(",").join(""))
        }
        $('#txtDPDiscount').val(tempValDisctAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));


        nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(SPR_PaymentTermDetails_NetContractPrice - 1, 0, totalTempNetContractPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
        nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(SPR_PaymentTermDetails_MonthlyPayment - 1, 0, totalTempMonthly.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
        nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(SPR_PaymentTermDetails_DPDiscountAmount - 1, 0, tempValDisctAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));


        var rowNo = nwGridMainCon_Book_Discount.ActiveSheet.GetMaxRow();
        var tempValDisctRate = 0;

        for (var i = 0; i <= rowNo - 1; i++) {

            tempValDisctRate += parseFloat(nwGridMainCon_Book_Discount.ActiveSheet.GetText(SPR_Discount_DiscountRate - 1, i))
        }
        tempValDisctRate = '0.0' + tempValDisctRate.toString().split(".").join("")
        var x = parseFloat($("#txtTCP").val().split(",").join("")) * parseFloat(tempValDisctRate)
        x = x.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        $("#txtSalesDiscountAmount").val(x)

        var tempvalSalesDisc = parseFloat($("#txtSalesDiscountAmount").val().split(",").join(""))
        var tempSalesDisc = parseFloat($("#txtDPDiscount").val().split(",").join(""))
        var temptcp = parseFloat($("#txtTCP").val().split(",").join(""))

        var results = temptcp - (tempvalSalesDisc + tempSalesDisc)


        $('#txtNTCP').val(results.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
    }
}

function dpDiscountConditions_newspread() {

    var rowNo = nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetMaxRow();



    for (var i = 1; i <= rowNo - 1; i++) {
        if (nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetValueBolean(9, i) == true) {
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetEnable(SPR_PaymentTermDetails_DPDiscountRate - 1, i, true);
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetEnable(SPR_PaymentTermDetails_DPDiscountAmount - 1, i, true);
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetBackground(SPR_PaymentTermDetails_DPDiscountRate - 1, i, "white")
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetBackground(SPR_PaymentTermDetails_DPDiscountAmount - 1, i, "white")
        } else {
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetEnable(SPR_PaymentTermDetails_DPDiscountRate - 1, i, false);
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetEnable(SPR_PaymentTermDetails_DPDiscountAmount - 1, i, false);
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetBackground(SPR_PaymentTermDetails_DPDiscountRate - 1, i, "gainsboro")
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetBackground(SPR_PaymentTermDetails_DPDiscountAmount - 1, i, "gainsboro")
        }

    }



}



$(document).on("click", "#btnReqCompliance", function (e) {

    var trantype = 'HLDRES';
    var docno = $('#txtReservationControlNo').val();
    var status = $('#txtDocumentStatusCode').val();
    nwDocno = getParameterByName('nwDocno');

    if (status == "3" || nwDocno != "") {
        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=true";

    } else {
        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=false";
    }


    nwLoading_Start('btnReqCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpReqComp", true, fullength);
    $('#nwPopUpReqComp .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpReqComp").css({ "min-width": "98%" });
    $("#nwPopUpReqComp").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpReqComp");
    nwLoading_End('btnReqCompliance');


});


function func_WindowCloseTrigger(verID) {
    var isContinue = true;
    var errorResult = "";
    var ICode = "";
    var currentRow = -1;
     serverlink = "ss" //$("#txtserverlink").val();
    cust_GetPara();

    if (verID == "nwPopUpReqComp") {
        nwParameter_Add("txtTransactionNo", $('#txtTransactionNo').val());
        nwLoading_Start("actHasRqrdCompli", crLoadingHTML);
        func_ActionDriven('actHasRqrdCompli', false);
    }



    return isContinue;
}



function newSpreadErrorSolutionCustom() {
    //If the value of grid in specific row is null the retrieval of data from newspread is error(Int data type does not not accpept null values) 


    var rowNo = nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetMaxRow();

    for (var i = 0; i < rowNo; i++) {
            

        if (nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(10, i, '0') == "") {
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(10, i, '0')
        }

        if (nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(13, i, '0') == "") {
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(13, i, '0')
        }

        if (nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(15, i, '0') == "") {
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(15, i, '0')
        }


        if (nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(16, i, '0') == "") {
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(16, i, '0')
        }


        if (nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(16, i, '0') == "") {
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(16, i, '0')
        }

        if (nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetValue(24, i) == "") {
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(24, i, '0')
        }
        if (nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetValue(25, i) == "") {
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(25, i, '0')
        }
        if (nwGridMainCon_Book_PaymentTerm.ActiveSheet.GetValue(26, i) == "") {
            nwGridMainCon_Book_PaymentTerm.ActiveSheet.SetText(26, i, '0')
        }

    }



}



