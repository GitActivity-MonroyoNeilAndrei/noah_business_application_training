//new spread
var row_;
var col_;
//main grid CATALOGUE
var nwGridCon_Book;
var nwGridCon_Sheet;

//main grid NON CATALOGUE
var nwGridConNonCatalogue_Book;
var nwGridConNonCatalogue_Sheet;

//Delivery details Grid
var nwGridConDeliveryID_Book;			
var nwGridConDeliveryID_Sheet;

//Delivery details SOH Details Grid
var nwGridConSOH_Book;
var nwGridConSOH_Sheet;

//Quotation details Grid
var nwGridConQuotationDetails_Book;			
var nwGridConQuotationDetails_Sheet;

//Budget Checking HDR Grid
var nwGridConBgtChkHeader_Book;
var nwGridConBgtChkHeader_Sheet;

//Budget Checking Line Grid
var nwGridConBgtChkLIN_Book;
var nwGridConBgtChkLIN_Sheet;

//Budget Checking Line Grid
var nwGridConBgtChkDetails_Book;
var nwGridConBgtChkDetails_Sheet;

//Single Delivery Line grid
var nwGridConSingleDel_Book;
var nwGridConSingleDel_Sheet;

//Allocation process grid
var nwGridConAllocProcess_Book;
var nwGridConAllocProcess_Sheet;

//Select transaction grid
var nwGridConSelect_Book;
var nwGridConSelect_Sheet;

//Select transaction grid
var nwGridConPaymentComponents_Book;
var nwGridConPaymentComponents_Sheet;


//Budget Control
var nwGridBdgtCtrlCon_Book;
var nwGridBdgtCtrlCon_Sheet;

//Budget Control
var nwGridViewConsoChargingCon_Book;
var nwGridViewConsoChargingCon_Sheet;



/// <reference path="RMRequestEntry.js" />
var isProcess;
var nwDocno = '';
var MenuItemTitle = "Request Entry";
var serverDate = new Date();
var upload_type = '';
var isWithItemCode = false;


var delItemCode = [];

var startIndex = 0;
//Replishment Line Details
var Main = {
    GRD_ITEMGRPTYPE_CODE: ++startIndex,
    GRD_ITEMGRPTYPE_DESC: ++startIndex,
    GRD_ITEMCODE: ++startIndex,
    GRD_ITEMDESC: ++startIndex,
    GRD_SPECNOTES: ++startIndex,
    GRD_REQ_QTY: ++startIndex,
    GRD_QUOTATION: ++startIndex,
    GRD_NONVAT: ++startIndex,
    GRD_UNITCOSTVATEX: ++startIndex,
    GRD_UNITCOSTVATIN: ++startIndex,
    GRD_TOTAL_AMNT_VATEX: ++startIndex,
    GRD_TOTAL_AMNT_VATIN: ++startIndex,
    GRD_BDGT_QTY: ++startIndex,
    GRD_BDGT_AMNT: ++startIndex,
    GRD_REQ_UOM_CODE: ++startIndex,
    GRD_REQ_UOM_DESC: ++startIndex,
    GRD_BASED_UOM: ++startIndex,
    GRD_SUBLOCATION_CODE: ++startIndex,
    GRD_SUBLOCATION_DESC: ++startIndex,
    GRD_BDGT_CHK_DTLS: ++startIndex,
    GRD_DEL_DTLS: ++startIndex,
    GRD_REQ_COMPLIANCE: ++startIndex,
    GRD_PREFVENDOR_CODE: ++startIndex,
    GRD_PREFVENDOR_NAME: ++startIndex,
    GRD_SOH_DTLS: ++startIndex,
    GRD_LASTPOPRICEVATIN: ++startIndex,
    GRD_LASTPOPRICEVATEX: ++startIndex,
    GRD_DATEOFLASTPO: ++startIndex,
    GRD_WEIGHTAVECOSTVATIN: ++startIndex,
    GRD_WEIGHTAVECOSTVATEX: ++startIndex,
    GRD_CUR_REQQTY: ++startIndex,
    GRD_LINEID: ++startIndex,
    GRD_GLACCNTCHARGING: ++startIndex,
    GRD_GLACCNTCHARGINGDESC: ++startIndex,
    GRD_INVENTORIABLE: ++startIndex,
    GRD_NONINVENTORIABLE: ++startIndex,
    GRD_HASQUOLDTLS: ++startIndex,
    GRD_HASBDGTCHK: ++startIndex,
    GRD_PENDINGBDGTCHK: ++startIndex,
    GRD_SAVED_BGTDTLS: ++startIndex,
    GRD_HASSOH: ++startIndex,
    GRD_EOQ: ++startIndex,
    GRD_HASDELDTLS: ++startIndex,
    GRD_TEMP_REQ_QTY: ++startIndex,
    GRD_TEMP_VATEX: ++startIndex,
    GRD_TEMP_VATIN: ++startIndex,
    GRD_HAS_REQCOMP: ++startIndex,
    GRD_REQ_SPEC: ++startIndex,
    GRD_DELIVERYADDRESS: ++startIndex,
    GRD_DECIMALPLACE: ++startIndex,
    GRD_ISLOADNONVAT: ++startIndex,
    GRD_DISABLEDUNITCOST: ++startIndex,
    GRD_PENDINGDLVYDTLS: ++startIndex,
    GRD_CAMEFROMHIS: ++startIndex
}


var StartIndex = 0,
    SPR_ITEMGRPTYPE_CODE = ++StartIndex,
    SPR_ITEMGRPTYPE_DESC = ++StartIndex,
    SPR_PROCUREMENT_CODE = ++StartIndex,
    SPR_PROCUREMENT_DESC = ++StartIndex,
    SPR_ITEMCODE = ++StartIndex,
    SPR_ITEMDESC = ++StartIndex,
    SPR_SPECNOTES = ++StartIndex,
    SPR_REQ_UOM_CODE = ++StartIndex,
    SPR_REQ_UOM_DESC = ++StartIndex,
    SPR_SUBLOCATION_CODE = ++StartIndex,
    SPR_SUBLOCATION_DESC = ++StartIndex,
    SPR_REQ_QTY = ++StartIndex,
    SPR_UNITCOSTVATEX = ++StartIndex,
    SPR_UNITCOSTVATIN = ++StartIndex,
    SPR_TOTAL_AMNT_VATEX = ++StartIndex,
    SPR_TOTAL_AMNT_VATIN = ++StartIndex,
    SPR_BDGT_QTY = ++StartIndex,
    SPR_BDGT_AMNT = ++StartIndex,
    SPR_BDGT_CHK_DTLS = ++StartIndex,
    SPR_DEL_DTLS = ++StartIndex,
    SPR_REQ_COMPLIANCE = ++StartIndex,
    SPR_QUOTATION = ++StartIndex,
    SPR_HASBDGTCHK = ++StartIndex,
    SPR_HASDELDTLS = ++StartIndex,
    SPR_HAS_REQCOMP = ++StartIndex,
    SPR_HASQUOLDTLS = ++StartIndex,
    SPR_LINEID = ++StartIndex,
    SPR_ROWNO = ++StartIndex;

//Grid Main
var GRD_ITEMGROUPTYPE_CODE = 1,
    GRD_ITEMGROUPTYPE_DESC = 2,
    GRD_PARTICULARS = 3,
    GRD_ITEMCODE = 4,
    GRD_ITEMDESC = 5,
    GRD_PURCHASE_UOM = 6,
    GRD_NUMERIC_DECIMAL_PLACE = 8,
    GRD_CURRENCY = 9,
    GRD_UNITCOST = 11,
    GRD_OCY_AMOUNT = 12,
    GRD_DELIVERYDTL = 13,
    GRD_PREFVENDORCODE = 14,
    GRD_PREFVENDORNAME = 15,
    GRD_QUOTATIONDTL = 16,
    GRD_LINEID = 17,
    GRD_HasDelDtl = 18,
    GRD_HasQuotation = 19,
    GRD_UnitCostVatin = 20,
    GRD_UnitCostVatex = 21,
    GRD_isQTY = 22,

    //Approver details
    GRD_APPROVAL_LEVEL = 1,
    GRD_APPROVER_CODE = 2,
    GRD_APPROVER_NAME = 3,

    //Attachments
    GRD_ATTACH_DOC_DOCU_CODE = 1,
    GRD_ATTACH_DOCU_DTL_DESC = 2,
    GRD_ATTACH_DOCU_DOCNO = 3,
    GRD_ATTACH_DOCU_DOCDATE = 4,
    GRD_ATTACH_DOCU_EXPIRY_DATE = 5,
    GRD_ATTACH_DOCU_ATTACH = 6,
    GRD_ATTACH_DOCU_DOWNLOAD = 7,
    GRD_ATTACH_DOCU_REMOVE = 8,
    GRD_ATTACH_DOCU_FILEPATH = 9,
    GRD_ATTACH_REQDOCNO = 10,
    GRD_ATTACH_REQDOCDATE = 11,
    GRD_ATTACH_REQEXPIRYDATE = 12,
    GRD_ATTACH_REQATTACH = 13,
    GRD_ATTACH_REQUIRED = 14,

    //Delivery Details
    GRD_DD_SPLITCOST = 1,
    GRD_DD_SPLITQTY = 2,
    GRD_DD_DELDATE = 3,
    GRD_DD_DELLOCCODE = 4,
    GRD_DD_DELLOCDESC = 5,
    GRD_DD_SUBLOCCODE = 6,
    GRD_DD_SUBLOCDESC = 7,
    GRD_DD_DELADDRESS = 8,
    GRD_DD_DELRECIPIENT_CODE = 9,
    GRD_DD_DELRECIPIENT = 10,
    GRD_DD_LINEID = 11,
    GRD_DD_DTLSLINEID = 12,
    GRD_DD_SOHDTLS = 13,
    GRD_DD_HASSOH = 14,
    GRD_DD_ROWNUM = 15,

    //Single Delivery
    GRD_SD_DELDATE = 1,
    GRD_SD_DELLOCODE = 2,
    GRD_SD_DELLOCDESC = 3,
    GRD_SD_SUBLOCCODE = 4,
    GRD_SD_SUBLOCDESC = 5,
    GRD_SD_DELADDRESS = 6,
    GRD_SD_DELRECIPIENTCODE = 7,
    GRD_SD_DELRECIPIENT = 8,

    //Quotation Details
    GRD_QD_VATEX = 1,
    GRD_QD_VATIN = 2,
    GRD_QD_VENDORCODE = 3,
    GRD_QD_VENDORNAME = 4,
    GRD_QD_VENDORCONTACTPERSON = 5,
    GRD_QD_VENDORCONTRCTNO = 6,
    GRD_QD_PAYMENTTERM_CODE = 7,
    GRD_QD_PAYMENTTERM_DESC = 8,
    GRD_QD_ISPREFVENDOR = 9,
    GRD_QD_ISNONVAT = 10,
    GRD_QD_ISVAT = 11;

//Budget Checking Window
startIndex = 0;

var BdgtLIN =
{
    GRD_BCL_SEG2CODE: ++startIndex,
    GRD_BCL_SEG2DESC: ++startIndex,
    GRD_BCL_SEG3CODE: ++startIndex,
    GRD_BCL_SEG3DESC: ++startIndex,
    GRD_BCL_SEG4CODE: ++startIndex,
    GRD_BCL_SEG4DESC: ++startIndex,
    GRD_BCL_SEG5CODE: ++startIndex,
    GRD_BCL_SEG5DESC: ++startIndex,
    GRD_BCL_SEG6CODE: ++startIndex,
    GRD_BCL_SEG6DESC: ++startIndex,
    GRD_BCL_REM_BDGT_QTY: ++startIndex,
    GRD_BCL_REM_BDGT_AMNT: ++startIndex,
    GRD_BCL_QTY: ++startIndex,
    GRD_BCL_AMNT_VATEX: ++startIndex,
    GRD_BCL_PERCENTAGE: ++startIndex,
    GRD_BCL_ALLOC_PROC_DTLS: ++startIndex,
    GRD_BCL_HASALLOC: ++startIndex,
    GRD_BCL_DTLSID: ++startIndex,
    GRD_BCL_REQALLOC: ++startIndex,
    GRD_BCL_SEG1_BGT: ++startIndex,
    GRD_BCL_SEG1DESC_BGT: ++startIndex,
    GRD_BCL_SEG2_BGT: ++startIndex,
    GRD_BCL_SEG2DESC_BGT: ++startIndex,
    GRD_BCL_SEG3_BGT: ++startIndex,
    GRD_BCL_SEG3DESC_BGT: ++startIndex,
    GRD_BCL_SEG4_BGT: ++startIndex,
    GRD_BCL_SEG4DESC_BGT: ++startIndex,
    GRD_BCL_SEG5_BGT: ++startIndex,
    GRD_BCL_SEG5DESC_BGT: ++startIndex,
    GRD_BCL_SEG6_BGT: ++startIndex,
    GRD_BCL_SEG6DESC_BGT: ++startIndex,
    GRD_BCL_ITEMGRPTYPE_BGT: ++startIndex,
    GRD_BCL_ITEMGRPTYPEDESC_BGT: ++startIndex,
    GRD_BCL_ITEMCODE_BGT: ++startIndex,
    GRD_BCL_ITEMDESC_BGT: ++startIndex,
    GRD_BCL_ITEMLEVEL_BGT: ++startIndex,
    GRD_BCL_ITEMLEVELDESC_BGT: ++startIndex,
    GRD_BCL_CURRENCY_BGT: ++startIndex,
    GRD_BCL_TEMP_QTY: ++startIndex,
    GRD_BCL_TEMP_AMNT: ++startIndex,
    GRD_BCL_TEMP_PRCNT: ++startIndex,
    GRD_BCL_TAGPC: ++startIndex,
    GRD_BCL_TAGCC: ++startIndex,
    GRD_BCL_TAGPERQTY: ++startIndex,
    GRD_BCL_ITEMCODE: ++startIndex,
    GRD_BCL_UOM: ++startIndex,
    GRD_BCL_LINEID: ++startIndex
}

//Allocation Window
var GRD_AP_SEG2CODE = 1,
     GRD_AP_SEG2DESC = 2,
     GRD_AP_SEG3CODE = 3,
     GRD_AP_SEG3DESC = 4,
     GRD_AP_SEG4CODE = 5,
     GRD_AP_SEG4DESC = 6,
     GRD_AP_SEG5CODE = 7,
     GRD_AP_SEG5DESC = 8,
     GRD_AP_QTY = 9,
     GRD_AP_AMNT_VATEX = 10,
     GRD_AP_PERCENTAGE = 11,
     GRD_AP_DTLSID = 12,
     GRD_AP_CLOSE = 13,

    //SELECT TRANSACTION GRID
    GRD_ST_DOCNO = 1,
    GRD_ST_VALUEDATE = 2,
    GRD_ST_PARTICULARS = 3,
    GRD_ST_CREATORCUST = 4,
    GRD_ST_TOTALREQAMNT = 5,
    GRD_ST_DOCSTATUS = 6,
    GRD_ST_REQOBJ = 7,
    GRD_ST_CURCODE = 8,
    GRD_ST_CURDESC = 9,
    GRD_ST_RSNOFREQUEST_CODE = 10,
    GRD_ST_RSNOFREQUEST_DESC = 11,
    GRD_ST_REASONTYPE = 12,
    GRD_ST_VIEW = 13;

//BUDGET CTRL DETAILS
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
    GRD_BCD_ITEMLVLCODE: startIndex++,
    GRD_BCD_ITEMLVL: startIndex++,
    GRD_BCD_ITEMLVLCLASSCODEL: startIndex++,
    GRD_BCD_ITEMLVLCLASSL: startIndex++,
    GRD_BCD_ITEM: startIndex++,
    GRD_BCD_ITEMDESC: startIndex++,
    GRD_BCD_CURRENCY: startIndex++,
    GRD_BCD_BEFORE_QTY: startIndex++,
    GRD_BCD_BEFORE_AMNT: startIndex++,
    GRD_BCD_REQ_QTY: startIndex++,
    GRD_BCD_REQ_AMNT: startIndex++,
    GRD_BCD_AFTER_QTY: startIndex++,
    GRD_BCD_AFTER_AMNT: startIndex++,
    GRD_BCD_REMARKS: startIndex++,
    GRD_BCD_TAGISQTY: startIndex++
}

//BUDGET CHECKING 
startIndex = 1;
var BdgtChkDtls = {
    GRD_SEG1CODE: startIndex++,
    GRD_SEG1DESC: startIndex++,
    GRD_SEG2CODE: startIndex++,
    GRD_SEG2DESC: startIndex++,
    GRD_SEG3CODE: startIndex++,
    GRD_SEG3DESC: startIndex++,
    GRD_SEG4CODE: startIndex++,
    GRD_SEG4DESC: startIndex++,
    GRD_SEG5CODE: startIndex++,
    GRD_SEG5DESC: startIndex++,
    GRD_SEG6CODE: startIndex++,
    GRD_SEG6DESC: startIndex++,
    GRD_ITEMGRPTYPE: startIndex++,
    GRD_ITEMLEVEL: startIndex++,
    GRD_ITEM: startIndex++,
    GRD_CURRENCY: startIndex++,
    GRD_REMQTY: startIndex++,
    GRD_BDGTAMNT: startIndex++
}

var GRD_SELECT = 1,
    GRD_APPROVER_PROPERTIES = 2,
    GRD_STATUS = 3,
    GRD_PONO = 4,
    GRD_PODATE = 5,
    GRD_ORIGCC = 6,
    GRD_ORIGCCDESC = 7,
    GRD_CONTACTNO = 8,
    GRD_REQUESTOR = 9,
    GRD_REQUESTORDESC = 10,
    GRD_RECUSER = 11,
    GRD_RECDATE = 12,

    GRD_SOH_SUBLOC_CODE = 1,
    GRD_SOH_SUBLOC_DESC = 2,
    GRD_SOH_UOM = 3,
    GRD_SOH_UNALLOCATED_QTY = 4,
    GRD_SOH_REORDER_QTY = 5,
    GRD_SOH_SYS_DIS = 6,
    GRD_SOH_WEIGHT_AVE = 7,

    GRD_SOH_UNPOST_QTY = 5,
    GRD_SOH_QTY_REQ = 6, //FOR CONSUMPTION
    GRD_SOH_FORPR = 7, //FOR CONSUMPTION
    GRD_SOH_VWPENDINGPO = 8,

    GRD_BCH_SEG1 = 1,
    GRD_BCH_SEG1DESC = 2,
    GRD_BCH_SEG2 = 3,
    GRD_BCH_SEG2DESC = 4,
    GRD_BCH_SEG3 = 5,
    GRD_BCH_SEG3DESC = 6,
    GRD_BCH_SEG4 = 7,
    GRD_BCH_SEG4DESC = 8,
    GRD_BCH_SEG5 = 9,
    GRD_BCH_SEG5DESC = 10,
    GRD_BCH_SEG6 = 11,
    GRD_BCH_SEG6DESC = 12,
    GRD_BCH_ITEMGRPTYPE_CODE = 13,
    GRD_BCH_ITEMGRPTYPE = 14,
    GRD_BCH_ITEM_Code = 15,
    GRD_BCH_ITEM = 16,
    GRD_BCH_REMQTY = 17,
    GRD_BCH_REMBDGT = 18;


//JSON Strings
var jsonDelDtls = [];
var jsonDelDtlsFiltered = [];
var jsonPerDates = [];
var jsonPerDatesClosing = [];

var jsonQuoDtls = [];
var jsonQuoDtlsFiltered = [];

var jsonInitialBdgtChk = [];
var jsonBdgtChk = [];
var jsonBdgtChkFiltered = [];
var jsonBdgtChkTMP = [];

var jsonAllocChkFiltered = [];
var jsonAllocChk = [];
var jsonAllocChkFnl = [];

var jsonBdgtChkHdr = [];

var jsonBelowReorderPnt = [];

var jsonCurrency = [];
var jsonCurrencyFiltered = [];

var jsonViewConsoDetails = [];

var jsonItemCodeList = [];
var jsonItemCodeRemaining;

var globalRow;

var isArrowKeysUp = false;
var isArrowKeysDown = false;
var isVatex = false;




var changingRow;
var changinNum;
var isLowerThanLastPO;
var isGetDataFromQuoHist = false;
var isbuttonclick = false;

var tempAllocQty = "";
var tempAllocAmntVatex = "";
var tempAllocPercent = "";
var allocSegCode = "";

var tempAllocSegments = {
    GRD_SEG2CODE: "",
    GRD_SEG2DESC: "",
    GRD_SEG3CODE: "",
    GRD_SEG3DESC: "",
    GRD_SEG4CODE: "",
    GRD_SEG4DESC: "",
    GRD_SEG5CODE: "",
    GRD_SEG5DESC: "",
    GRD_SEG6CODE: "",
    GRD_SEG6DESC: ""
}

var isDontChange = "";

function func_Reload() {
    crLnk = GetCurrentURL() +  "RMRequestEntry_Gateway";
    crLnkGateKey = "RMRequestEntry";
    crnwTagSingleBind = true;

    nwPopupForm_Create("nwUploadCon", false);
    nwPopupForm_Create("nwValidationList", true);
    nwPopupForm_Create("docattview");

    nwPopupForm_Create('frmApplyToOneLoc', true);
    nwPopupForm_Create("nwDeliveryDetailsWindow", true);
    nwPopupForm_Create("nwQuotationDetailsWindow", true);
    nwPopupForm_Create("nwSOHDetailsWindow", true);
    nwPopupForm_Create("nwBdgtCheckingWindow", true);
    nwPopupForm_Create("nwAllocProcessWindow", true);
    nwPopupForm_Create("nwRequestObjective", true);
    nwPopupForm_Create("nwSingleDelDetailsWindow", true);
    nwPopupForm_Create("nwDateRange", false);
    nwPopupForm_Create("nwSelectTransaction", true);
    nwPopupForm_Create("nwBudgetCtrlDetails", true);
    nwPopupForm_Create("nwCreateSBR", true);
    nwPopupForm_Create("nwViewPendingPO", true);
    nwPopupForm_Create("ViewConsoChargeDetailsWindow", true);
    nwPopupForm_Create("nwPaymentComponentWindow", true);

    nwDocno = getParameterByName('nwDocno');

    var isContinue = true;

    ToolBoxGetData = false;
    DisableFields();
    cust_GetPara();
    ClearFields();
    init_request();

    $('#btnVwBdgtMonitoring').enable(false);
    //$('#btnVwBdgtMonitoring>.noah-webui-Toolbox-Item-Title').text('View Budget Availability Report');
    return isContinue;

}

function mainLoad() {
    $(`.btnCreateSBR`).enable(false);

    nwParameter_Add("nwDocno", nwDocno);
    if (nwDocno != '') {
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox").visible(false);
    }
}

function nwDocnoDisabled() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();

    if (nwDocno != '') {
        DisableFields();
        $('#txtValueDate2').enable(false);

        //Enable
        $('#btnReqCompliance').enable(true);
        $('#nwGridCon').enable(true);


        //Disable Grid Columns
        var Grid = nwGridCon_Book.ActiveSheet;
        Grid.SetEnable(Main.GRD_ITEMGRPTYPE_CODE - 1, Spread_ALLROW, false);
        Grid.SetEnable(Main.GRD_ITEMCODE - 1, Spread_ALLROW, false);
        Grid.SetEnable(Main.GRD_REQ_UOM_DESC - 1, Spread_ALLROW, false);
        Grid.SetEnable(Main.GRD_SUBLOCATION_CODE - 1, Spread_ALLROW, false);
        Grid.SetEnable(Main.GRD_BDGT_CHK_DTLS - 1, Spread_ALLROW, false);
        Grid.SetEnable(Main.GRD_REQ_QTY - 1, Spread_ALLROW, false);
        Grid.SetEnable(Main.GRD_NONVAT - 1, Spread_ALLROW, false);
        Grid.SetEnable(Main.GRD_UNITCOSTVATEX - 1, Spread_ALLROW, false);
        Grid.SetEnable(Main.GRD_UNITCOSTVATIN - 1, Spread_ALLROW, false);

        Grid.SetBackground(Main.GRD_ITEMGRPTYPE_CODE - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(Main.GRD_ITEMCODE - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(Main.GRD_REQ_UOM_DESC - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(Main.GRD_SUBLOCATION_CODE - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(Main.GRD_BDGT_CHK_DTLS - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(Main.GRD_REQ_QTY - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(Main.GRD_NONVAT - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(Main.GRD_UNITCOSTVATEX - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(Main.GRD_UNITCOSTVATIN - 1, Spread_ALLROW, "gainsboro");

        for (i = 0; i <= maxRow; i++) {
            Grid.SetEnable(Main.GRD_REQ_COMPLIANCE - 1, i, false);
            Grid.SetBackground(Main.GRD_REQ_COMPLIANCE - 1, i, "gainsboro");
        }

         $('#btnSingleDelDtls').enable(false);
         $('#btnPaymentComponents').enable(false);
    }
}

function nwDocnoDisabledNon() {
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    if (nwDocno != '') {
        DisableFields();

        //Enable
        $('#btnReqCompliance').enable(true);
        $('#nwGridConNonCatalogue').enable(true);

        //Disable Grid Columns
        var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
        Grid.SetEnable(SPR_ITEMGRPTYPE_CODE - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_ITEMCODE - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_REQ_UOM_DESC - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_SUBLOCATION_CODE - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_REQ_QTY - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_UNITCOSTVATEX - 1, Spread_ALLROW, false);
        Grid.SetEnable(SPR_UNITCOSTVATIN - 1, Spread_ALLROW, false);

        Grid.SetBackground(SPR_ITEMGRPTYPE_CODE - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_ITEMCODE - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_REQ_UOM_DESC - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_SUBLOCATION_CODE - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_REQ_QTY - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_UNITCOSTVATEX - 1, Spread_ALLROW, "gainsboro");
        Grid.SetBackground(SPR_UNITCOSTVATIN - 1, Spread_ALLROW, "gainsboro");

        for (i = 0; i <= maxRow; i++) {
            Grid.SetEnable(SPR_BDGT_CHK_DTLS - 1, Spread_ALLROW, false);
            Grid.SetEnable(SPR_REQ_COMPLIANCE - 1, i, false);

            Grid.SetBackground(SPR_BDGT_CHK_DTLS - 1, Spread_ALLROW, "gainsboro");
            Grid.SetBackground(SPR_REQ_COMPLIANCE - 1, i, "gainsboro");
        }

        $('#btnSingleDelDtlsNon').enable(false);
    }
}


/* Tool Box */
function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    ClearFields();
    $('#btnVwBdgtMonitoring').enable(true);

    enableValuedate();
    return isContinue;
}

function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", MenuItemTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", MenuItemTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
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
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", MenuItemTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    //var isContinue = true;
    var errMsg = ChkIfHasBgtChkDtls();

    if (errMsg == "") {
        nwLoading_Start('LoadingCreateSBR', crLoadingHTML);
        nwParameter_Add("txtDocno", $('#txtDocno').val());
        nwParameter_Add("txtTrantype", $('#txtTrantype').val());
        $('.BoxResize').css('display', 'none');
        func_ActionDriven("actGenCreateSBR", false);
    }
    else {
        MessageBox(errMsg, MenuItemTitle, "error");
    }

    return false;
    //return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    nwLoading_Start("xExport", crLoadingHTML);
    return isContinue;
}

function func_ToolboxPrint(indef, enume) {
    var isContinue = true;
    //nwLoading_Start("xPrintLoading", crLoadingHTML);
    nwParameter_Add("txtDocno", $(`#txtDocno`).val());

    parent_MessageBoxQuestionToolBox("Would you like to print the document/s?", MenuItemTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxClosing(indef, enume) {
    var isContinue = true;
    ShowVwMonitoringRpt();
    return isContinue;
}

function func_ToolboxSearch(indef, enume) {
    var isContinue = true;
    $('#txtDRDateFrom').val('');
    $('#txtDRDateTo').val('');

    var error = ""
    if ($('#idvallugLocForm').val() == "") {
        error += "Cannot proceed. Location with Accountable forms is required. \n"
    }

    if ($('#idvallugCostCenter').val() == "") {
        error += `Cannot proceed. ${getCostCenter()} is required. \n`
    }

    if (error != "") {
        MessageBox(error, MenuItemTitle, 'error');
        return false;
    }

    InitializeDateRange();
    nwPopupForm_ShowModal('nwDateRange');

    return false;

    //return isContinue;
}

///////////////////// Bind tool
function cust_GetPara() {

    nwParameter_Add("txtNOAccessReqrep", $('#txtNOAccessReqrep').val());
    nwParameter_Add("txtReqObjectiveCode", $('#txtReqObjectiveCode').val());
    nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
    nwParameter_Add("idvallugCreatorCustodian", $('#idvallugCreatorCustodian').val());
    nwParameter_Add("txtContactNo", $('#txtContactNo').val());
    nwParameter_Add("idvallugCostCenter", $("#idvallugCostCenter").val());
    nwParameter_Add("idvallugCurrency", $('#idvallugCurrency').val());
    nwParameter_Add("txtParticular", $('#txtParticular').val());
    nwParameter_Add("txtDocno", $('#txtDocno').val());
    nwParameter_Add("txtValueDate", $('#txtValueDate').val());
    nwParameter_Add("txtServerdate", $('#txtValueDate').val());
    nwParameter_Add("txtDocStatus", $('#txtDocStatus').val());
    nwParameter_Add("txtTotReqAmntVatex", $('#txtTotReqAmntVatex').val());
    nwParameter_Add("txtTotReqAmnt", $('#txtTotReqAmnt').val());
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("txtTrantype", $('#txtTrantype').val());
    nwParameter_Add("idvallugRsnForRequest", $('#idvallugRsnForRequest').val());
    nwParameter_Add("txtReasonType", $('#txtReasonType').val());
    nwParameter_Add("txtSublocCode", $('#txtSublocCode').val());
    nwParameter_Add("txtHasChanges", $('#txtHasChanges').val() != "" ? true : false);
    nwParameter_Add("txtIsUpperCaseParticulars", $('#txtIsUpperCaseParticulars').val());
    nwParameter_Add("getCostCenter", getCostCenter());
    nwParameter_Add("getProfitCenter", getProfitCenter());
    nwParameter_Add("isAllwBackdateTran", $('#isAllwBackdateTran').val());
    nwParameter_Add("isAllwBackdateTran", $('#isAllwBackdateTran').val());
    nwParameter_Add("txtEnableChargingSave", $('#txtEnableChargingSave').val());

    var vatRate = $('#txtVatRate').val() == "" ? 0.00 : $('#txtVatRate').val();
    nwParameter_Add("txtVatRate", vatRate);

    nwParameter_Add("isAllwBackdateTran", $('#isAllwBackdateTran').val());
    nwParameter_Add("txtValueDate2", $('#txtValueDate2').val());

    //Pop Up Details
    nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls));
    nwParameter_Add("jsonQuoDtls", JSON.stringify(jsonQuoDtls));
    nwParameter_Add("jsonBdgtChk", JSON.stringify(jsonBdgtChk));
    nwParameter_Add("jsonAllocChkFnl", JSON.stringify(jsonAllocChkFnl));

    try{ nwParameter_Add_Spread(nwGridCon_Book);} catch (ex) { }
    try{ nwParameter_Add_Spread(nwGridConDeliveryID_Book);} catch (ex) { }
    try{ nwParameter_Add_Spread(nwGridConQuotationDetails_Book);} catch (ex) { }
    try{ nwParameter_Add_Spread(nwGridConBgtChkHeader_Book);} catch (ex) { }
    try{ nwParameter_Add_Spread(wGridConBgtChkLIN_Book);} catch (ex) { }
    try{ nwParameter_Add_Spread(nwGridConBgtChkDetails_Book);} catch (ex) { }
    try{ nwParameter_Add_Spread(nwGridConSingleDel_Book);} catch (ex) { }
    try{ nwParameter_Add_Spread(nwGridConAllocProcess_Book);} catch (ex) { }
    try{ nwParameter_Add_Spread(nwGridConSelect_Book);} catch (ex) { }
    try { nwParameter_Add_Spread(nwGridConNonCatalogue_Book); } catch (ex) { }

    

    try{
        nwParameter_Add("filter", filterItemUOM());
    }catch(ex){}

}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("actBindCollection", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    RefreshData();
}

function EnableFields() {
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingExport().visible(false);

    $('#btnVwBdgtMonitoring').enable(true);
    $('.btnLoadFrmValidHist').enable(true);
    $('.btnCreateSBR').enable(false);

    $('#lugLocForm').enable(true);
    $('#lugCostCenter').enable(true);
    $('#txtContactNo').enable(true);
    $('#lugCurrency').enable(true);
    $('#txtParticular').enable(true);
    $('#lugRsnForRequest').enable(true);
    $('#txtValueDate2').enable(true);
    $('#nwGridCon').enable(true);
}

function DisableFields() {
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingPrint().visible(false);


    $('#txtReqObjective').enable(false);
    $('#lugLocForm').enable(false);
    $('#lugCreatorCustodian').enable(false);
    $('#txtContactNo').enable(false);
    $('#lugCostCenter').enable(false);
    $('#lugCurrency').enable(false);
    $('#txtParticular').enable(false);
    $('#txtDocno').enable(false);
    $('#txtDateSubmitted').enable(false);
    $('#txtDatePosted').enable(false);
    $('#txtDocStatus').enable(false);
    $('#txtReason').enable(false);
    $('#txtDisapprovalRemarks').enable(false);
    $('#txtTotReqAmntVatex').enable(false);
    $('#txtTotReqAmnt').enable(false);
    $('#txtVatRate').enable(false);
    $('#txtValueDate2').enable(false);
    $('#lugRsnForRequest').enable(false);
    $('#btnReqCompliance').enable(false);
    $('#nwGridCon').enable(false);

    $('#btnVwBdgtMonitoring').enable(false);
    $('.btnLoadFrmValidHist').enable(false);
    $('.btnCreateSBR').enable(false);

    //disable delivery details header
    $('#lugDDItem').enable(false);
    $('#lugDDReqUOM').enable(false);
    $('#lugDDBasedUOM').enable(false);
    $('#txtDDTotalReqQty').enable(false);
    $('#txtDDTotalSplitQty').enable(false);
    $('#txtDDRemainingBalance').enable(false);

    //disable delivery details SOH Details header
    $('#txtSOHItem').enable(false);
    $('#txtSOHReqUOM').enable(false);

    //disable quotation details header
    $('#lugQuotItem').enable(false);
    $('#lugQuotUom').enable(false);
    $('#txtQuoQty').enable(false);

    //disable budget checking windows header
    $('#lugBdgtChk_Item').enable(false);
    $('#lugBdgtChk_ItemGrpType').enable(false);
    $('#lugBdgtChk_GLAccntChrge').enable(false);

    //disable View pending PO header
    $('#lugVPOItem').enable(false);
    $('#lugVPOCostCnter').enable(false);
    $('#lugVPOSublocation').enable(false);
    
    //disable frmApplyToOneLoc header
    $('#lugApplyToOneLoc_DelLoc').enable(false);
    $('#lugApplyToOneLoc_Subloc').enable(false);

    //disable Charging Details Window
    $('#txtTotalAmntVatex').enable(false);
    $('#txtAppliedQty').enable(false);
    $('#txtAppliedVatex').enable(false);
    $('#txtUnappliedQty').enable(false);
    $('#txtTotalPrcnt').enable(false);
    $('#txtTotalQty').enable(false);
    $('#txtUnappliedVatex').enable(false);
}

function EnableFieldsDone() { //Binding Done
    EnableFields();

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingPrint().enable(true);
    $("#noah-webui-Toolbox").bindingPrint().visible(true);

    $('#btnReqCompliance').enable(true);
    $('#lugLocForm').enable(false);
    $("#nwGridCon").enable(true);


    $(`.btnCreateSBR`).enable(true);
    $(`.btnLoadFrmValidHist`).enable(false);
    $('#btnVwBdgtMonitoring').enable(false);
}

function DisableFieldsEmpty() {
    DisableFields();

    $('#btnVwBdgtMonitoring').enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingPrint().enable(false);
    $("#noah-webui-Toolbox").bindingPrint().visible(true);
}

function isNoCurrencyAssign() {
    ClearReqObjective();
    DisableFieldsEmpty();
    ClearFields();
    nwPopupForm_HideModal('nwRequestObjective');
}

function ClearReqObjective() {
    $("#txtReqObjectiveCode").val("");
    $("#txtReqObjective").val("");
    $(`#txtNOAccessReqrep`).val('');
}

function ClearFields() {
    $('#txtValueDate2').val("");
    $("#idvallugLocForm").val("");
    $("#descvallugLocForm").val("");
    $('#txtDefLocformCode').val('');
    $('#txtDefLocformDesc').val('');
    $('#txtSublocCode').val('');
    $('#txtSublocDesc').val('');
    $('#txtSublocDelAdd').val('');
    $("#idvallugCreatorCustodian").val("");
    $("#descvallugCreatorCustodian").val("");
    $("#txtContactNo").val("");
    $("#idvallugCostCenter").val("");
    $("#descvallugCostCenter").val("");
    $("#idvallugCurrency").val("");
    $("#descvallugCurrency").val("");
    $('#txtParticular').val("");
    $("#txtDocno").val("");
    $("#txtValueDate").val("");
    $("#txtDocStatus").val("");
    $("#txtReason").val("");
    $("#txtDisapprovalRemarks").val("");
    $("#txtTotReqAmnt").val("");
    $("#txtTotReqAmntVatex").val("");
    $("#idvallugRsnForRequest").val("");
    $("#descvallugRsnForRequest").val("");
    $('#txtTrantype').val('');
    $("#txtDateSubmitted").val("");
    $('#txtDatePosted').val('');
    $('#btnReqCompliance').removeClass('btnGreen')
    $('#btnReqCompliance').addClass('btnOrange');
    $('#idvallugCreatorCustodian').val("");
    $('#descvallugCreatorCustodian').val("");
    $('#txtContactNo').val("");

    ClearAllJSONStrings("1");
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}


function func_LookUpInitialize(lookupid) {
    
    cust_GetPara();

    //header lookup
    if (lookupid == 'lugCostCenter') {
        tempCostCenterCode = $(`#idvallugCostCenter`).val();
        tempCostCenterDesc = $(`#descvallugCostCenter`).val();
    }
    else if (lookupid == 'lugCurrency') {
        tempCurrencyCode = $(`#idvallugCurrency`).val();
        tempCurrencyDesc = $(`#descvallugCurrency`).val();
    }
    else if (lookupid == 'lugRsnForRequest') {
        tempRsnForRqstCode = $(`#idvallugRsnForRequest`).val();
        tempRsnForRqstDesc = $(`#descvallugRsnForRequest`).val();
    }
    else if (lookupid == "lugLocForm") {
        tempLocformCode = $(`#idvallugLocForm`).val();
        tempLocformDesc = $(`#descvallugLocForm`).val();
    }
    //////////////

    if ($('#txtTrantype').val() == "REQNON") {
        ///non catalogue
        var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
        var row = Grid.CellSelected.row - 1;

        if (lookupid == 'lugItemCode') {
            Grid.GetText(SPR_ITEMGRPTYPE_CODE - 1, row);

            var itemGroupType = Grid.GetText(SPR_ITEMGRPTYPE_CODE - 1, row);
            var itemCodeList = excludeSelected(Grid, SPR_ITEMCODE - 1);

            nwParameter_Add("itemCodeList", itemCodeList);
            nwParameter_Add("itemGroupType", itemGroupType);
        }
        else if (lookupid == 'lugRequestUOM') {
            nwParameter_Add("itemCode", Grid.GetText(SPR_ITEMCODE - 1, row));
        }
        else if (lookupid == "lugConsumptionSubLoc") {

            var itemCode = Grid.GetText(SPR_ITEMCODE - 1, row);
            var IsNonInventoriable = Grid.GetText(SPR_NONINVENTORIABLE - 1, row);
            nwParameter_Add("IsNonInventoriable", IsNonInventoriable);
        }

    }
    else {
        //line details main grid lookup
        var Grid = nwGridCon_Book.ActiveSheet;
        var row = Grid.CellSelected.row - 1;

        if (lookupid == 'lugItemCode') {
            Grid.GetText(Main.GRD_ITEMGRPTYPE_CODE - 1, row);

            var itemGroupType = Grid.GetText(Main.GRD_ITEMGRPTYPE_CODE - 1, row);
            var itemCodeList = excludeSelected(Grid, Main.GRD_ITEMCODE - 1);

            nwParameter_Add("itemCodeList", itemCodeList);
            nwParameter_Add("itemGroupType", itemGroupType);
        }
        else if (lookupid == 'lugRequestUOM') {
            nwParameter_Add("itemCode", Grid.GetText(Main.GRD_ITEMCODE - 1, row));
        }
        else if (lookupid == "lugConsumptionSubLoc") {

            var itemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row);
            var IsNonInventoriable = Grid.GetText(Main.GRD_NONINVENTORIABLE - 1, row);
            nwParameter_Add("IsNonInventoriable", IsNonInventoriable);
        }
    }
    /////

    

    //Delivery Details lookup grid
    if (lookupid == 'lugSubLocCode') {
        var GridDeliveryID = nwGridConDeliveryID_Book.ActiveSheet;
        var rowDeliveryID = GridDeliveryID.CellSelected.row - 1;

        var lugDelLocCode = GridDeliveryID.GetText(GRD_DD_DELLOCCODE - 1, rowDeliveryID);
        nwParameter_Add("lugDelLocCode", lugDelLocCode);
    }
    /////

    //Single Delivery lookup grid
    if (lookupid == 'lugSDSubLocCode') {
        var GridSingleDel = nwGridConSingleDel_Book.ActiveSheet;
        var rowSingleDel = GridSingleDel.CellSelected.row - 1;

        var lugSDDelLocCode = GridSingleDel.GetText(GRD_SD_DELLOCODE - 1, rowSingleDel);
        nwParameter_Add("lugSDDelLocCode", lugSDDelLocCode);
    }

    //form Apply To One Loc Header
    if (lookupid == 'lugApplyToOneLoc_Subloc') {
        nwParameter_Add("idvallugApplyToOneLoc_DelLoc", $('#lugApplyToOneLoc_DelLoc').val());
    }
    /////


    //Quotation button add
    if (lookupid == 'lugLoadQuotHist') {
        nwParameter_Add("idvallugItemCode", $('#idvallugQuotItem').val());
        nwParameter_Add("txtQuotUOM", $('#txtQuotUOM').val());
        isGetDataFromQuoHist = true;
    }

    //Quotation details grid
    if (lookupid == 'lugQDPayTerm') {
        var GridQuotation = nwGridConQuotationDetails_Book.ActiveSheet;
        var rowQuotation = GridQuotation.CellSelected.row - 1;
        nwParameter_Add("vendorCode", GridQuotation.GetText(GRD_QD_VENDORCODE - 1, rowQuotation));
    }
    else if (lookupid == "lugQDVendor") {
        nwParameter_Add("filterVendor", FilterSupplerQuo());
    }

    /////

    //Charging Details Window header
    if (lookupid == 'lugBdgtChk_GLAccntChrge') {
        nwParameter_Add("idvallugBdgtChk_ItemGrpType", $('#idvallugBdgtChk_ItemGrpType').val());
    }


    //Budget Checking Details Window Grid
    try {
        var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
        var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;
    } catch (ex) { }

    if (lookupid == 'lugBdgtChk_ProfitCenter') {

        tempAllocQty = RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, rowBgtChkLIN));
        tempAllocAmntVatex = RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_AMNT_VATEX- 1, rowBgtChkLIN));
        tempAllocPercent = RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_PERCENTAGE- 1, rowBgtChkLIN));

        nwParameter_Add("nwFilter", GetFilterProfitCenter());
        nwParamater_Add("txtDocno", $('#txtDocno').val());
        nwParameter_Add("txtBCLItemCode", $('#txtBCLItemCode').val());
        nwParameter_Add("idvallugBdgtChk_ItemGrpType", $('#idvallugBdgtChk_ItemGrpType').val());
        nwParameter_Add("idvallugBdgtChk_GLAccntChrge", $('#idvallugBdgtChk_GLAccntChrge').val());
        nwParamater_Add("txtTrantype", $('#txtTrantype').val());
        nwParamater_Add("idvallugLocForm", $('#idvallugLocForm').val());
        nwParamater_Add("idvallugCostCenter", $('#idvallugCostCenter').val());
        nwParamater_Add("txtDocno", $('#txtDocno').val());
        nwParamater_Add("idvallugCurrency", $('#idvallugCurrency').val());
    }

    else if (lookupid == "lugIsLookUps") {
        nwParameter_Add("segcode", (GetSegcodePerColumn(rowBgtChkLIN)).toString());
    }

    //Budget Allocation grid
    if (lookupid == 'lugAllocChk_ProfitCenter') {
        var GridAllocProcess = nwGridConAllocProcess_Book.ActiveSheet;
        var rowAllocProcess = GridAllocProcess.CellSelected.row - 1;

        tempAllocQty = RemoveComma(GridAllocProcess.GetText(GRD_AP_QTY - 1, rowAllocProcess));
        tempAllocAmntVatex = RemoveComma(GridAllocProcess.GetText(GRD_AP_AMNT_VATEX - 1, rowAllocProcess));
        tempAllocPercent = RemoveComma(GridAllocProcess.GetText(GRD_AP_PERCENTAGE - 1, rowAllocProcess));

        nwParameter_Add("nwFilter", GetAllocFilterProfitCenter());
        nwParameter_Add("idvallugLocForm", $(`#idvallugLocForm`).val());
        nwParameter_Add("allocSegCode", allocSegCode);
        nwParameter_Add("txtBdgtSegCode", $('#txtBdgtSegCode').val());

    }

}

function p8Spread_DblClick(canvasID, row, col) {

    if (nwDocno != '') return;

    var LocForm = $('#idvallugLocForm').val();
    var custodian = $('#idvallugCreatorCustodian').val();
    var costCenter = $('#idvallugCostCenter').val();
    var currency = $('#idvallugCurrency').val();
    var particulars = $('#txtParticular').val();
    var isConsumption = $(`#txtReqObjectiveCode`).val() == 'RO02' ? true : false;
    var reason = $('#idvallugRsnForRequest').val();

    var prompt = ''

    if (LocForm == '' ||
         custodian == '' ||
         costCenter == '' ||
         currency == '' ||
         particulars == '' ||
         (isConsumption && reason == '')
       ) {
        prompt = "Cannot proceed. Please complete the header details.";
    }

    //MAIN LINE DETAILS
    if (canvasID == "nwGridCon") {
        var Grid = nwGridCon_Book.ActiveSheet;
        var row = Grid.CellSelected.row - 1;

        if (prompt != '') {
            if (col == Main.GRD_ITEMGRPTYPE_CODE - 1 || col == Main.GRD_ITEMCODE - 1 || col == Main.GRD_REQ_UOM_CODE - 1 || col == Main.GRD_PREFVENDOR_CODE - 1) {
                MessageBox(prompt, MenuItemTitle, 'error');
                return true;
            }
        }
        else {
            if (col == Main.GRD_ITEMGRPTYPE_CODE - 1) {
                lookUpCustomize("lugItemGroupType", 1, undefined, true)
            }
            else if (col == Main.GRD_ITEMCODE - 1) {
                isWithItemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row) != "" ? true : false;
                lookUpCustomize("lugItemCode", 2, undefined, true)
            }
            else if (col == Main.GRD_REQ_UOM_DESC - 1) {
                cust_GetPara();
                nwParameter_Add("itemCode", Grid.GetText(Main.GRD_ITEMCODE - 1, row));
                lookUpCustomize("lugRequestUOM", 1, undefined, true)
            }
            else if (col == Main.GRD_PREFVENDOR_CODE - 1) {
                lookUpCustomize("lugPrefVendor", 1, undefined, true)
            }
            else if (col == Main.GRD_SUBLOCATION_CODE - 1) {
                var itemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row);
                var IsNonInventoriable = Grid.GetText(Main.GRD_NONINVENTORIABLE - 1, row);

                if (itemCode == "") {
                    MessageBox("Cannot proceed. Item Code is required. \n", MenuItemTitle, "error");
                    return false;
                }
                nwParameter_Add("IsNonInventoriable", IsNonInventoriable);
                lookUpCustomize("lugConsumptionSubLoc", 1, undefined, true)
            }
        }
    }

    //NON CATALOGUE MAIN GRID
    if (canvasID == "nwGridConNonCatalogue") {
        var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
        var row = Grid.CellSelected.row - 1;

        if (prompt != '') {
            if (col == SPR_ITEMGRPTYPE_CODE - 1 || col == SPR_ITEMCODE - 1 || col == SPR_REQ_UOM_CODE - 1 || col == SPR_PREFVENDOR_CODE - 1) {
                MessageBox(prompt, MenuItemTitle, 'error');
                return true;
            }
        }
        else {
            if (col == SPR_ITEMGRPTYPE_CODE - 1) {
                lookUpCustomize("lugItemGroupType", 1, undefined, true)
            }
            else if (col == SPR_ITEMCODE - 1) {
                isWithItemCode = Grid.GetText(SPR_ITEMCODE - 1, row) != "" ? true : false;
                lookUpCustomize("lugItemCode", 2, undefined, true)
            }
            else if (col == SPR_PROCUREMENT_DESC - 1) {
                lookUpCustomize("lugProcurement", 1, undefined, true)
            }
            else if (col == SPR_REQ_UOM_DESC - 1) {
                cust_GetPara();
                nwParameter_Add("itemCode", Grid.GetText(SPR_ITEMCODE - 1, row));
                lookUpCustomize("lugRequestUOM", 1, undefined, true)
            }
            else if (col == SPR_SUBLOCATION_CODE - 1) {
                var itemCode = Grid.GetText(SPR_ITEMCODE - 1, row);
                if (itemCode == "") {
                    MessageBox("Cannot proceed. Item Code is required. \n", MenuItemTitle, "error");
                    return false;
                }
                nwParameter_Add("IsNonInventoriable", IsNonInventoriable);
                lookUpCustomize("lugConsumptionSubLoc", 1, undefined, true)
            }
        }
    }

    //Delivery Details
    if (canvasID == "nwGridConDeliveryID") {
        var GridDeliveryID = nwGridConDeliveryID_Book.ActiveSheet;
        var rowDeliveryID = GridDeliveryID.CellSelected.row - 1;

        if ($(`#txtDDISAllowMultiple`).val() == "1") {
            if (col == GRD_DD_DELLOCCODE - 1) {
                lookUpCustomize("lugDelLocCode", 1, undefined, true);
            }
            else if (col == GRD_DD_SUBLOCCODE - 1) {
                var lugDelLocCode = GridDeliveryID.GetText(GRD_DD_DELLOCCODE - 1, rowDeliveryID);
                nwParameter_Add("lugDelLocCode", lugDelLocCode);
                lookUpCustomize("lugSubLocCode", 1, undefined, true);

            }
            else if (col == GRD_DD_DELRECIPIENT - 1) {
                lookUpCustomize("lugDeliveryRecipient", 1, undefined, true);
            }
        }

        
    }

    //Single Delivery
    if (canvasID == "nwGridConSingleDel") {
        var GridSingleDel = nwGridConSingleDel_Book.ActiveSheet;
        var rowSingleDel = GridSingleDel.CellSelected.row - 1;

        if ($(`#txtDDISAllowMultiple`).val() == "1") {

            if (col == GRD_SD_DELLOCODE - 1) {
                lookUpCustomize("lugSDDelLocCode", 1);
            }
            else if (col == GRD_SD_SUBLOCCODE - 1) {
                var lugSDDelLocCode = GridSingleDel.GetText(GRD_SD_DELLOCODE - 1, rowSingleDel);
                nwParameter_Add("lugSDDelLocCode", lugSDDelLocCode);
                lookUpCustomize("lugSDSubLocCode", 1, undefined, true);

            }
            else if (col == GRD_SD_DELRECIPIENT - 1) {
                lookUpCustomize("lugSDDelRecipient", 1, undefined, true);

            }
        }

    }

    //QUOTATION DETAILS
    if (canvasID == "nwGridConQuotationDetails") {
        if (col == GRD_QD_VENDORCODE - 1) {
            lookUpCustomize("lugQDVendor", 1, undefined, true);

        }
        else if (col == GRD_QD_PAYMENTTERM_CODE - 1) {
            lookUpCustomize("lugQDPayTerm", 1, undefined, true);
        }
    }

    //Budget Checking Details Window
    if (canvasID == 'nwGridConBgtChkLIN') {
        if (col == (BdgtLIN.GRD_BCL_SEG3CODE - 1) && $('#txtTrantype').val() != "REQREP") {
            lookUpCustomize("lugBdgtChk_ProfitCenter", 1, undefined, true);

        }
        else if ($(`#txtIsLookUps`).val() != "" &&
                    $(`#txtIsLookUps`).val().includes(GetSegcodePerColumn(col)) &&
                    $('#txtTrantype').val() != "REQREP" && col != BdgtLIN.GRD_BCL_PERCENTAGE) {
            lookUpCustomize("lugIsLookUps", 1, undefined, true);

        }
    }

    //Budget Allocation 
    if (canvasID == 'nwGridConAllocProcess') {
        if (col == $('#txtAllocTag1').val()) {
            allocSegCode = $('#txtAllocTag1SegCode').val();
            nwParameter_Add("allocSegCode", allocSegCode);
            lookUpCustomize("lugAllocChk_ProfitCenter", 1, undefined, true);

        }
        else if (col == $('#txtAllocTag2').val()) {
            allocSegCode = $('#txtAllocTag2SegCode').val();
            nwParameter_Add("allocSegCode", allocSegCode);
            lookUpCustomize("lugAllocChk_ProfitCenter", 1, undefined, true);

        }
    }

    //Grid Selection
    if (canvasID == 'nwGridConSelect') {
        var GridSelect = nwGridConSelect_Book.ActiveSheet;
        var rowSelect = GridSelect.CellSelected.row - 1;
        
        nwLoading_Start("loadingSelected", crLoadingHTML);
        $('#idvallugCurrency').val(GridSelect.GetText(GRD_ST_CURCODE - 1, rowSelect));
        $('#descvallugCurrency').val(GridSelect.GetText(GRD_ST_CURDESC - 1, rowSelect));
        $('#txtParticular').val(GridSelect.GetText(GRD_ST_PARTICULARS - 1, rowSelect));

        $('#idvallugRsnForRequest').val(GridSelect.GetText(GRD_ST_RSNOFREQUEST_CODE - 1, rowSelect));
        $('#descvallugRsnForRequest').val(GridSelect.GetText(GRD_ST_RSNOFREQUEST_DESC - 1, rowSelect));
        $(`#txtReasonType`).val(GridSelect.GetText(GRD_ST_REASONTYPE - 1, rowSelect))

        nwParameter_Add("txtReqObjectiveCode", $('#txtReqObjectiveCode').val());
        nwParameter_Add("txtTrantype", $('#txtTrantype').val());
        nwParameter_Add("txtDocno", GridSelect.GetText(GRD_ST_DOCNO - 1, rowSelect));
        nwParameter_Add("txtNOAccessReqrep", $('#txtNOAccessReqrep').val());

        ClearAllJSONStrings();
        func_ActionDriven("actGenSelectedDocno", false);
    }

}


function clickDD_SOHDtls() {
    nwLoading_Start('nwLoadingSOH', crLoadingHTML)
    var GridDeliveryID = nwGridConDeliveryID_Book.ActiveSheet;
    var rowDeliveryID = GridDeliveryID.CellSelected.row - 1;

    //Fill Data
    var itemCode = $(`#idvallugDDItem`).val();
    var itemDesc = $(`#descvallugDDItem`).val();
    var reqUOM = $(`#idvallugDDReqUOM`).val();

    $('#txtSOHItemCode').val(itemCode);
    $('#txtSOHItem').val(itemDesc);
    $('#txtSOHReqUOM').val(reqUOM);

    nwParameter_Add("qty", RemoveComma(GridDeliveryID.GetText(GRD_DD_SPLITQTY - 1, rowDeliveryID)));
    nwParameter_Add("idvallugLocForm", GridDeliveryID.GetText(GRD_DD_DELLOCCODE - 1, rowDeliveryID));
    nwParameter_Add("subloc", GridDeliveryID.GetText(GRD_DD_SUBLOCCODE - 1, rowDeliveryID));
    nwParameter_Add("idvallugCreatorCustodian", $('#idvallugCreatorCustodian').val());
    nwParameter_Add("idvallugCurrency", $('#idvallugCurrency').val());
    nwParameter_Add("txtDocno", $('#txtDocno').val());
    nwParameter_Add("txtTrantype", $('#txtTrantype').val());
    nwParameter_Add("UOM", reqUOM);
    nwParameter_Add("ItemCode", itemCode);

    nwPopupForm_ShowModal("nwSOHDetailsWindow");
    func_ActionDriven("actGenerateSOH", false);
}

function p8Spread_Change(canvasID, row, col) {
    if (canvasID == "nwGridConNonCatalogue") {
        if (col == SPR_REQ_QTY - 1) {
            var rQty = jsonItemCodeRemaining[0].remainingQty;
            var qty = nwGridConNonCatalogue_Book.ActiveSheet.GetText(SPR_REQ_QTY - 1, row);

            if (rQty > 0)
            {
                nwGridConNonCatalogue_Book.ActiveSheet.SetText(SPR_BDGT_QTY - 1, row, MoneyFormat(rQty - qty, 2));
            }
            else {
                nwGridConNonCatalogue_Book.ActiveSheet.SetText(SPR_BDGT_QTY - 1, row, '0.00');
            }

            cuz_VATEX();
            cuz_VATIN();
        }
        else if (col == SPR_UNITCOSTVATEX - 1) {
            cuz_VATEX();
            UnitCostVatex();
        }
        else if (col == SPR_UNITCOSTVATIN - 1) {
            cuz_VATIN();
        }
    }
    if (canvasID == "nwGridConDeliveryID") {
        if (col == GRD_DD_SPLITQTY - 1) {
            numDDSplitQty();
        }
        else if (col == GRD_DD_DELDATE - 1) {
            dtDelDate();
        }
    }
    if (canvasID == "nwGridConQuotationDetails") {

        if (col == GRD_QD_VATEX - 1) {
            numQDVatex();
        }
        else if (col == GRD_QD_VATIN - 1) {
            numQDVatin();
        }
    }
    if (canvasID == "nwGridConBgtChkLIN") {
        if (col == BdgtLIN.GRD_BCL_QTY - 1) {
            BclQty();
        }
        else if (col == BdgtLIN.GRD_BCL_AMNT_VATEX - 1) {
            BclAmntVatex();
        }
        else if (col == BdgtLIN.GRD_BCL_PERCENTAGE - 1) {
            BclPrcnt();
        }

    }
    if (canvasID == "nwGridConSingleDel") {
        if (col == GRD_SD_DELDATE - 1) {
            sddtDelDate();
        }
    }
    if (canvasID == "nwGridConAllocProcess") {
        if (col == GRD_AP_QTY - 1) {
            APQty();
        }
        else if (col == GRD_AP_AMNT_VATEX - 1) {
            APAmntVatex();
        }
        else if (col == GRD_AP_PERCENTAGE - 1) {
            APPrcnt();
        }
    }

    return true;
}

function cuz_VATEX() {
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var qty = parseFloat(Grid.GetText(SPR_REQ_QTY - 1, row).replace(",",""));
    var vatex = parseFloat(Grid.GetText(SPR_UNITCOSTVATEX - 1, row).replace(",", ""));
    var Rvatex = jsonItemCodeRemaining[0].remainingBudget;
    var total = 0;
    if (qty != "" && Grid.GetText(SPR_UNITCOSTVATEX - 1, row) != ""){
        total = qty * vatex;
        Grid.SetText(SPR_TOTAL_AMNT_VATEX - 1, row, parseFloat(total).toFixed(2));

        if (Rvatex > 0) {
            nwGridConNonCatalogue_Book.ActiveSheet.SetText(SPR_BDGT_AMNT - 1, row, MoneyFormat(Rvatex - vatex, 2));
        }
        else {
            nwGridConNonCatalogue_Book.ActiveSheet.SetText(SPR_BDGT_AMNT - 1, row, '0.00');
        }
    }

}

function cuz_VATIN() {
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var qty = parseFloat(Grid.GetText(SPR_REQ_QTY - 1, row).replace(",", ""));
    var vatTin = parseFloat(Grid.GetText(SPR_UNITCOSTVATIN - 1, row).replace(",", ""));
    var total = 0;
    if (qty != "" && Grid.GetText(SPR_UNITCOSTVATIN - 1, row) != ""){
        total = qty * vatTin;
        Grid.SetText(SPR_TOTAL_AMNT_VATIN - 1, row, parseFloat(total).toFixed(2));
    }

}


function numDDSplitQty() {
    var GridDeliveryID = nwGridConDeliveryID_Book.ActiveSheet;
    var rowDeliveryID = GridDeliveryID.CellSelected.row - 1;

    var cost = 0;
    var qty = parseFloat(GridDeliveryID.GetText(GRD_DD_SPLITQTY - 1 , rowDeliveryID).replace(/,/g, "")) || 0;
    var cnt = GridDeliveryID.GetMaxRow();

    if (qty > 0) {
        for (var row = 0; row < cnt; row++) {
            cost = parseFloat(GridDeliveryID.GetText(GRD_DD_SPLITCOST - 1, rowDeliveryID).replace(/,/g, "")) || 0;
            if (cost > 0)
                GridDeliveryID.SetText(GRD_DD_SPLITCOST - 1, rowDeliveryID, parseFloat(0).toFixed(5));
        }
    }
    getTotalAllocQty();
}

function dtDelDate() {
    var GridDeliveryID = nwGridConDeliveryID_Book.ActiveSheet;
    var rowDeliveryID = GridDeliveryID.CellSelected.row - 1;

    var date = new Date(serverDate.getTime());
    var curdate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    var DelDate = GridDeliveryID.GetText(GRD_DD_DELDATE - 1, rowDeliveryID);
    var locform = GridDeliveryID.GetText(GRD_DD_DELLOCCODE - 1, rowDeliveryID);
    var subloc = GridDeliveryID.GetText(GRD_DD_SUBLOCCODE - 1, rowDeliveryID);

    if (Date.parse(curdate) > Date.parse(DelDate)) {
        MessageBox("Delivery Date should not be earlier than the current server date.", "Delivery Details Window", 'error');
        GridDeliveryID.SetText(GRD_DD_DELDATE - 1, rowDeliveryID, "");
    }

    if (DelDate != "") {
        if (ChkDuplicateDates(DelDate, locform, subloc, rowDeliveryID)) {
            MessageBox(`Cannot proceed. Duplicate Delivery Date in row ${rowDeliveryID + 1}.`, "Delivery Details Window", 'error');
            $(this).val("");
            return false;
        }
    }

}

function numQDVatex() {
    var GridQuotation = nwGridConQuotationDetails_Book.ActiveSheet;
    var rowQuotation = GridQuotation.CellSelected.row - 1;

    var num = RemoveComma($(this).val());

    if (isNaN(num) || num == "")
        num = 0;

    var vatRate = $('#txtVatRate').val() == "" ? "0.00" : $('#txtVatRate').val();

    var isNonVat = GridQuotation.GetText(GRD_QD_ISNONVAT - 1, rowQuotation) == "1" ? true : false;
    if (isNonVat) {
        vatRate = "0.00"
    }

    var vatin = ComputationOfUnitCost(false, num, vatRate);

    GridQuotation.SetText(GRD_QD_VATIN - 1, rowQuotation, parseFloat(vatin).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
    GridQuotation.SetText(GRD_QD_VATEX - 1, rowQuotation, MoneyFormat(num, 5));
}

function numQDVatin() {
    var GridQuotation = nwGridConQuotationDetails_Book.ActiveSheet;
    var rowQuotation = GridQuotation.CellSelected.row - 1;
    var num = RemoveComma($(this).val());

    if (isNaN(num) || num == "")
        num = 0;

    var vatRate = $('#txtVatRate').val() == "" ? "0.00" : $('#txtVatRate').val();
    var isNonVat = GridQuotation.GetText(GRD_QD_ISNONVAT - 1, rowQuotation) == "1" ? true : false;
    if (isNonVat) {
        vatRate = "0.00"
    }
    var vatex = ComputationOfUnitCost(true, num, vatRate);

    GridQuotation.SetText(GRD_QD_VATEX - 1, rowQuotation, parseFloat(vatex).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
    GridQuotation.SetText(GRD_QD_VATIN - 1, rowQuotation, MoneyFormat(num, 5));

}

function isPrefVendor() {
    var GridQuotation = nwGridConQuotationDetails_Book.ActiveSheet;
    var rowQuotation = GridQuotation.CellSelected.row - 1;

    var isChecked = GridQuotation.GetText(GRD_QD_ISPREFVENDOR - 1, rowQuotation);
    GridQuotation.SetText(GRD_QD_ISPREFVENDOR - 1, rowQuotation, isChecked);
}

function BclQty() {
    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;

    var isRequireAlloc = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_REQALLOC - 1, rowBgtChkLIN);
    var totalQty = RemoveComma($(`#txtTotalQty`).val());
    var hasAlloc = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_HASALLOC - 1, rowBgtChkLIN);
    var number = RemoveComma($(this).val());

    vatex = $('#txtBdgtchk_UnitCostVatex').val() != "" ? RemoveComma($('#txtBdgtchk_UnitCostVatex').val()) : 0.00;
    GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX, rowBgtChkLIN, ComputeAllocAmnt(number, vatex)); //compute Total Amount(VATIN)

    if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_HASALLOC, rowBgtChkLIN) == "") {
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TEMP_AMNT, rowBgtChkLIN, ComputeAllocAmnt(number, vatex)); //compute Total Amount(VATIN)
    }

    if (!isNaN(number)) {
        $(this).val(MoneyFormat(number, 5));

        if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_HASALLOC, rowBgtChkLIN) == "") {
            GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TEMP_QTY, rowBgtChkLIN, MoneyFormat(number, 5)); //compute Total Amount(VATIN)
        }

    }
    else {
        $(this).val(MoneyFormat(0, 5));
    }

    if (isRequireAlloc != "" && hasAlloc != "") {

        setTimeout(function () {
            msgBoxContainerQuestion = "isChangAllocQty";
            changingRow = rowBgtChkLIN;
            parent_MessageBoxQuestion("Changing of Budget Distribution Quantity will reset saved Allocation Details. Do you want to proceed?", MenuItemTitle, "Question");
            $('#Message_Cancel').hide();
            $('#dimMessageBox .BoxClose').css('display', 'none');
        }, 2);

    }
    else {
        //Compute Header Quantities
        AutoComputeBdgtCheckDetails(GridBgtChkLIN, rowBgtChkLIN, number, ComputeAllocAmnt(number, vatex));
        ComputationForBdgtChckDetails();
        BdgtCheckDtilsInputValidation(number, totalQty, rowBgtChkLIN, "Quantity");
    }

    //Check if Last Row
    if (number != 0) {
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX, rowBgtChkLIN, MoneyFormat(ChargingRecomputeIfLastRowAmnt(rowBgtChkLIN), 2));
    }
}

function BclAmntVatex() {
    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;

    var isRequireAlloc = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_REQALLOC - 1, rowBgtChkLIN);
    var hasAlloc = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_HASALLOC - 1, rowBgtChkLIN);
    var totalAmnt = RemoveComma($(`#txtTotalAmntVatex`).val());
    var number = RemoveComma($(this).val());
    var hasSaved = false;

    vatex = $('#txtBdgtchk_UnitCostVatex').val() != "" ? RemoveComma($('#txtBdgtchk_UnitCostVatex').val()) : 0.00;
    GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY- 1, rowBgtChkLIN, ComputeAllocQty(number, vatex));

    if (!isNaN(number)) {
        $(this).val(MoneyFormat(number, 2));
    }
    else {
        $(this).val(MoneyFormat(0, 2));
    }

    if (isRequireAlloc != "" && hasAlloc != "") {

        setTimeout(function () {
            msgBoxContainerQuestion = "isChangAllocAmntVatex";
            changingRow = _crnwTRTemp;
            parent_MessageBoxQuestion("Changing Budget Distribution Amount(VATEX) will reset saved Allocation Details. Do you want to proceed?", MenuItemTitle, "Question");
            $('#Message_Cancel').hide();
            $('#dimMessageBox .BoxClose').css('display', 'none');
        }, 2);

    }
    else {

        //Compute Header Quantities
        AutoComputeBdgtCheckDetails(GridBgtChkLIN, rowBgtChkLIN, ComputeAllocQty(number, vatex), number);
        ComputationForBdgtChckDetails();
        BdgtCheckDtilsInputValidation(number, totalAmnt, rowBgtChkLIN, "Amount (VATEX)");
    }

    //Check if Last Row
    if (number != 0) {
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, rowBgtChkLIN, MoneyFormat(ChargingRecomputeIfLastRowQty(rowBgtChkLIN), 5));
    }

}

function BclPrcnt() {
    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;

    var isRequireAlloc = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_REQALLOC- 1, rowBgtChkLIN);
    var hasAlloc = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_HASALLOC- 1, rowBgtChkLIN);
    var number = RemoveComma($(this).val());

    if (!isNaN(number)) {

        if (Number(number) > 100.00000000000) { //if higher than 100 
            number = 100.00000000000;
        }

        $(this).val(MoneyFormat(number, 11));

    }
    else {
        $(this).val(MoneyFormat(0, 11));
    }

    //Compute Quantity and Amount Vatex
    var qty = RemoveComma($('#txtTotalQty').val());
    var amnt = RemoveComma($('#txtTotalAmntVatex').val());

    GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY- 1, rowBgtChkLIN, MoneyFormat((parseFloat(qty) * parseFloat(number / 100)), 5));
    GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX- 1, rowBgtChkLIN, MoneyFormat((parseFloat(amnt) * parseFloat(number / 100)), 2));

    if (isRequireAlloc != "" && hasAlloc != "") {

        setTimeout(function () {
            msgBoxContainerQuestion = "isChangAllocPrcnt";
            changingRow = rowBgtChkLIN;
            parent_MessageBoxQuestion("Changing of Budget Distribution Percentage will reset saved Allocation Details. Do you want to proceed?", MenuItemTitle, "Question");
            $('#Message_Cancel').hide();
            $('#dimMessageBox .BoxClose').css('display', 'none');
        }, 2);

    }
    else {

        //Compute Headers
        AutoComputeBdgtCheckDetails(GridBgtChkLIN, rowBgtChkLIN, (parseFloat(qty) * parseFloat(number / 100)), (parseFloat(amnt) * parseFloat(number / 100)));

        BdgtChkPercentValidation(rowBgtChkLIN);
        ComputationForBdgtChckDetails();
    }

    //Check if Last Row
    if (number != 0) {
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, rowBgtChkLIN, MoneyFormat(ChargingRecomputeIfLastRowAmnt(rowBgtChkLIN), 2));
    }

}

function sddtDelDate() {
    var GridSingleDel = nwGridConSingleDel_Book.ActiveSheet;
    var rowSingleDel = GridSingleDel.CellSelected.row - 1;

    var date = new Date(serverDate.getTime());
    var curdate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    var DelDate = GridSingleDel.GetText(GRD_SD_DELDATE - 1, rowSingleDel);

    nwGridConSingleDel_Book.ActiveSheet.SetText(GRD_SD_DELDATE - 1, DelDate);

    if (Date.parse(curdate) > Date.parse(DelDate)) {

        GridSingleDel.SetText(GRD_SD_DELLOCODE- 1, rowSingleDel, "");
        GridSingleDel.SetText(GRD_SD_DELLOCDESC- 1, rowSingleDel, "");
        GridSingleDel.SetText(GRD_SD_SUBLOCCODE- 1, rowSingleDel, "");
        GridSingleDel.SetText(GRD_SD_SUBLOCDESC- 1, rowSingleDel, "");
        GridSingleDel.SetText(GRD_SD_DELADDRESS- 1, rowSingleDel, "");
        GridSingleDel.SetText(GRD_SD_DELRECIPIENTCODE- 1, rowSingleDel, "");
        GridSingleDel.SetText(GRD_SD_DELRECIPIENT - 1, rowSingleDel, "");
        GridSingleDel.SetText(GRD_SD_DELDATE - 1, rowSingleDel, "");

        MessageBox("Delivery Date should not be earlier than the current server date.", "Single Delivery Window", 'error');
    }
    else {
        _crnwTRTemp = rowSingleDel;

        let locationCode = $(`#txtDefLocformCode`).val();
        let locationDesc = $(`#txtDefLocformDesc`).val();
        let sublocCode = $(`#txtSublocCode`).val();
        let sublocDesc = $(`#txtSublocDesc`).val();
        let delAdd = $(`#txtSublocDelAdd`).val();
        let delrecipientCode = $(`#idvallugCreatorCustodian`).val();
        let delrecipientDesc = $(`#descvallugCreatorCustodian`).val();

        DefaultedSingleDlvyLocation(GridSingleDel, GRD_SD_DELLOCODE - 1, GRD_SD_DELLOCDESC - 1, GRD_SD_SUBLOCCODE - 1, GRD_SD_SUBLOCDESC - 1, GRD_SD_DELADDRESS - 1, GRD_SD_DELRECIPIENTCODE - 1, GRD_SD_DELRECIPIENT - 1, locationCode, locationDesc, sublocCode, sublocDesc, delAdd, delrecipientCode, delrecipientDesc);
    }

    if (DelDate == "") {
        GridSingleDel.SetText(GRD_SD_DELLOCODE - 1, rowSingleDel, "");
        GridSingleDel.SetText(GRD_SD_DELLOCDESC - 1, rowSingleDel, "");
        GridSingleDel.SetText(GRD_SD_SUBLOCCODE - 1, rowSingleDel, "");
        GridSingleDel.SetText(GRD_SD_SUBLOCDESC - 1, rowSingleDel, "");
        GridSingleDel.SetText(GRD_SD_DELADDRESS - 1, rowSingleDel, "");
        GridSingleDel.SetText(GRD_SD_DELRECIPIENTCODE - 1, rowSingleDel, "");
        GridSingleDel.SetText(GRD_SD_DELRECIPIENT - 1, rowSingleDel, "");
    }
}

function APQty() {
    var GridAllocProcess = nwGridConAllocProcess_Book.ActiveSheet;
    var rowAllocProcess = GridAllocProcess.CellSelected.row - 1;

    var allocQty = $(this).val() == "" ? 0.00 : $(this).val().replace(/,/g, '');
    var recomputedAmnt = 0.00;

    vatex = $('#txtAllocTotalAmntVatex').val() != "" ? RemoveComma($('#txtAllocTotalAmntVatex').val()) : 0.00;
    totalQty = $('#txtAllocTotalQty').val() != "" ? RemoveComma($('#txtAllocTotalQty').val()) : 0.00;

    GridAllocProcess.SetText(GRD_AP_AMNT_VATEX - 1, rowAllocProcess, ComputeBdgtAllocAmnt(allocQty, totalQty, vatex)); //compute Total Amount(VATIN)

    if (!isNaN(allocQty)) {
        $(this).val(MoneyFormat(allocQty, 5));
    }
    else {
        $(this).val(MoneyFormat(0, 5));
    }

    if (!isNaN(allocQty)) {
        $(this).val(MoneyFormat(allocQty, 5));
    }

    //Compute Header Quantities
    AutoComputeAllocDetails(GridAllocProcess, rowAllocProcess, allocQty, ComputeBdgtAllocAmnt(allocQty, totalQty, vatex));

    //Check if Last Row
    if (allocQty != 0) {
        GridAllocProcess.SetText(GRD_AP_AMNT_VATEX - 1, rowAllocProcess, MoneyFormat(AllocRecomputeIfLastRowAmnt(rowAllocProcess), 2));
    }

    ComputationForBdgtChckAllocDetails();
    ComputeBdgtAllocPrcnt();

    //Validation
    AllocDtilsInputValidation(allocQty, totalQty, _crnwTRTemp, "Quantity")

}

function APAmntVatex() {
    var GridAllocProcess = nwGridConAllocProcess_Book.ActiveSheet;
    var rowAllocProcess = GridAllocProcess.CellSelected.row - 1;

    var amntVatex = $(this).val() == "" ? 0.00 : $(this).val().replace(/,/g, '');
    var qty = 0;
    var recomputedQty = 0.00000;

    totalVatex = RemoveComma($('#txtAllocTotalAmntVatex').val());
    totalQty = RemoveComma($('#txtAllocTotalQty').val());

    qty = (parseFloat(totalQty) / (parseFloat(totalVatex) / parseFloat(amntVatex)));
    GridAllocProcess.SetText(GRD_AP_QTY - 1, rowAllocProcess, MoneyFormat(qty, 5));

    if (!isNaN(amntVatex)) {
        $(this).val(MoneyFormat(amntVatex, 2));
    }
    else {
        $(this).val(MoneyFormat(0, 2));
    }

    //Compute Header Quantities
    AutoComputeAllocDetails(GridAllocProcess, rowAllocProcess, qty, amntVatex);

    //Check if Last Row
    if (amntVatex != 0) {
        recomputedQty = parseFloat(AllocRecomputeIfLastRowQty(rowAllocProcess));
        GridAllocProcess.SetText(GRD_AP_QTY - 1, rowAllocProcess, MoneyFormat(recomputedQty, 5));
    }

    ComputationForBdgtChckAllocDetails();
    ComputeBdgtAllocPrcnt();

    //Validations
    AllocDtilsInputValidation(amntVatex, totalVatex, rowAllocProcess, "Amount (VATEX)")

}

function APPrcnt() {
    var GridAllocProcess = nwGridConAllocProcess_Book.ActiveSheet;
    var rowAllocProcess = GridAllocProcess.CellSelected.row - 1;

    var percentage = $(this).val() == "" ? 0.00 : $(this).val().replace(/,/g, '');

    if (!isNaN(percentage)) {

        if (Number(percentage) > 100) { //if higher than 100 
            percentage = 100;
        }

        $(this).val(MoneyFormat(percentage, 11));

    }
    else {
        $(this).val(MoneyFormat(0, 11));
    }

    //Compute Quantity and Amount Vatex
    var qty = RemoveComma($('#txtAllocTotalQty').val());
    var amnt = RemoveComma($('#txtAllocTotalAmntVatex').val());

    var allocQty = (parseFloat(qty) * parseFloat(percentage / 100));
    var allocAmnt = (parseFloat(amnt) * parseFloat(percentage / 100));

    GridAllocProcess.SetText(GRD_AP_QTY - 1, rowAllocProcess, MoneyFormat(allocQty, 5));
    GridAllocProcess.SetText(GRD_AP_AMNT_VATEX - 1, rowAllocProcess, MoneyFormat(allocAmnt, 2));

    //Compute Headers
    AutoComputeAllocDetails(GridAllocProcess, rowAllocProcess, allocQty, allocAmnt);

    //Check if Last Row
    if (percentage != 0) {
        GridAllocProcess.SetText(GRD_AP_AMNT_VATEX - 1, rowAllocProcess, MoneyFormat(AllocRecomputeIfLastRowAmnt(rowAllocProcess), 2));
    }

    ComputationForBdgtChckAllocDetails();
    ComputeBdgtAllocPrcnt();

    //Validation
    AllocPercentValidation(rowAllocProcess);
}


function p8Spread_Click(canvasID, row, col) {

    if (canvasID == "nwGridCon") {
        if (col == Main.GRD_QUOTATION - 1) {//7
            //insert validation here 10/07/2024
            clickQuotationDetailsButton();
        }
        else if (col == Main.GRD_BDGT_CHK_DTLS - 1) { //20
            clickBdgtChkDtls();
        }
        else if (col == Main.GRD_DEL_DTLS - 1) { //21
              clickDeliveryDetails();
        }
        
        else if (col == Main.GRD_REQ_COMPLIANCE - 1) {
            clickReqCompliance();
        }
        else if (col == Main.GRD_SOH_DTLS - 1) {
            clickSOHDtls();
        }
        else if (col == Main.GRD_SPECNOTES - 1) {
            setTimeout(function () {
                $('#spreadRemarksCon .modal-hdr-title').text("Specifications/Notes");
            }, 1000);
        }
    }
    else if (canvasID == "nwGridConNonCatalogue") {
        if (col == SPR_QUOTATION - 1) {//7
            clickQuotationDetailsButtonNon();
        }
        else if (col == SPR_BDGT_CHK_DTLS - 1) { //20
            clickBdgtChkDtlsNon();
        }
        else if (col == SPR_DEL_DTLS - 1) { //21
            clickDeliveryDetailsNon();
        }

        else if (col == SPR_REQ_COMPLIANCE - 1) {
            clickReqComplianceNon();
        }

        else if (col == SPR_SPECNOTES - 1) {
            setTimeout(function () {
                $('#spreadRemarksCon .modal-hdr-title').text("Item Specification");
            }, 1000);
        }
    }
    else if (canvasID == "nwGridConSelect") {
        if (col == GRD_ST_VIEW - 1) {
            clickbtnSTViewDetails();
        }
    }
    else if (canvasID == "nwGridConBgtChkLIN") {
        //DisplayBdgtCombinationAndChecking(grid, crnwTR.index());
        if (col == BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1) {
            clickbdgtChk_AllocProc();
        }
    }
    else if (canvasID == "nwGridConDeliveryID") {
        if (col == GRD_DD_SOHDTLS - 1) {
            clickDD_SOHDtls();
        }
    }
    else if (canvasID == "nwGridConSOH") {
        if (col == GRD_SOH_VWPENDINGPO - 1) {
            clickVwPendingPO();
        }

    }

    return true;
}

function clickDeliveryDetails() {
    var errMsg = "";
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var sublocationCode = Grid.GetText(Main.GRD_SUBLOCATION_CODE - 1, row);
    var sublocationDesc = Grid.GetText(Main.GRD_SUBLOCATION_DESC - 1, row);
    var deliveryAddress = Grid.GetText(Main.GRD_DELIVERYADDRESS - 1, row);

    var ItemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row);
    var ItemDesc = Grid.GetText(Main.GRD_ITEMDESC - 1, row);
    var ReqUOMCode = Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row);
    var ReqUOMDesc = Grid.GetText(Main.GRD_REQ_UOM_DESC - 1, row);
    var basedUOM = Grid.GetText(Main.GRD_BASED_UOM - 1, row);
    var ReqQty = Grid.GetText(Main.GRD_REQ_QTY - 1, row);
    var LineID = Grid.GetText(Main.GRD_LINEID - 1, row);
    var Rownum = row;

    if (ReqQty == "")
        errMsg += "Cannot proceed. Requested Quantity is required. \n";

    if (ItemCode == "")
        errMsg += "Cannot proceed. Item Code is required. \n";

    if (ReqUOMCode == "")
        errMsg += "Cannot proceed. Requested UOM is required. \n";

    if (errMsg != "") {
        MessageBox(errMsg, MenuItemTitle, 'error');
        return false;
    }

    nwLoading_Start("nwLoadingDelDtls", crLoadingHTML);

    //Display in Header
    $('#idvallugDDItem').val(ItemCode);
    $('#descvallugDDItem').val(ItemDesc);
    $('#idvallugDDReqUOM').val(ReqUOMCode);
    $('#descvallugDDReqUOM').val(ReqUOMDesc);
    $('#idvallugDDBasedUOM').val(basedUOM);
    $('#txtDDTotalReqQty').val(ReqQty);
    $('#txtDDTotalSplitQty').val("0.00000");
    $('#txtDDRemainingBalance').val(ReqQty);
    $('#txtDDRownum').val(Rownum);
    $('#txtDDLineID').val(LineID);

    $('#txtDDSublocationCode').val(sublocationCode);
    $('#txtDDSublocationDesc').val(sublocationDesc);
    $('#txtDDDeliveryAddress').val(deliveryAddress);


    nwParameter_Add("txtDocno", $("#txtDocno").val());
    nwParameter_Add("txtDDRownum", $("#txtDDRownum").val());
    nwParameter_Add("txtDDLineID", $("#txtDDLineID").val());
    nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
    nwParameter_Add("idvallugCreatorCustodian", $('#idvallugCreatorCustodian').val());
    nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls));
    nwParameter_Add("hasJson", HasJsonTempDelDtls(ItemCode, ReqUOMCode) >= 0 ? true : false);
    nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls.filter(i => (i.itemCode + i.ReqUOM) == ItemCode + ReqUOMCode)));
    nwParameter_Add("hasData", Grid.GetText(Main.GRD_HASDELDTLS - 1, row));
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("txtNOAccessReqrep", $('#txtNOAccessReqrep').val());
    nwPopupForm_ShowModal("nwDeliveryDetailsWindow");
    func_ActionDriven("actDeliveryDetails", false);
    return false;
}

function clickDeliveryDetailsNon() {
    var errMsg = "";
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var sublocationCode = Grid.GetText(SPR_SUBLOCATION_CODE - 1, row);
    var sublocationDesc = Grid.GetText(SPR_SUBLOCATION_DESC - 1, row);

    var ItemCode = Grid.GetText(SPR_ITEMCODE - 1, row);
    var ItemDesc = Grid.GetText(SPR_ITEMDESC - 1, row);
    var ReqUOMCode = Grid.GetText(SPR_REQ_UOM_CODE - 1, row);
    var ReqUOMDesc = Grid.GetText(SPR_REQ_UOM_DESC - 1, row);
    var ReqQty = Grid.GetText(SPR_REQ_QTY - 1, row);
    var LineID = Grid.GetText(SPR_LINEID - 1, row);
    var Rownum = row;

    if (ReqQty == "")
        errMsg += "Cannot proceed. Requested Quantity is required. \n";

    if (ItemCode == "")
        errMsg += "Cannot proceed. Item Code is required. \n";

    if (ReqUOMCode == "")
        errMsg += "Cannot proceed. Requested UOM is required. \n";

    if (errMsg != "") {
        MessageBox(errMsg, MenuItemTitle, 'error');
        return false;
    }

    nwLoading_Start("nwLoadingDelDtls", crLoadingHTML);

    //Display in Header
    $('#idvallugDDItem').val(ItemCode);
    $('#descvallugDDItem').val(ItemDesc);
    $('#idvallugDDReqUOM').val(ReqUOMCode);
    $('#descvallugDDReqUOM').val(ReqUOMDesc);
    $('#txtDDTotalReqQty').val(ReqQty);
    $('#txtDDTotalSplitQty').val("0.00000");
    $('#txtDDRemainingBalance').val(ReqQty);
    $('#txtDDRownum').val(Rownum);
    $('#txtDDLineID').val(LineID);

    $('#txtDDSublocationCode').val(sublocationCode);
    $('#txtDDSublocationDesc').val(sublocationDesc);

    nwParameter_Add("txtDocno", $("#txtDocno").val());
    nwParameter_Add("txtDDRownum", $("#txtDDRownum").val());
    nwParameter_Add("txtDDLineID", $("#txtDDLineID").val());
    nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
    nwParameter_Add("idvallugCreatorCustodian", $('#idvallugCreatorCustodian').val());
    nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls));
    nwParameter_Add("hasJson", HasJsonTempDelDtls(ItemCode, ReqUOMCode) >= 0 ? true : false);
    nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls.filter(i => (i.itemCode + i.ReqUOM) == ItemCode + ReqUOMCode)));
    nwParameter_Add("hasData", Grid.GetText(SPR_HASDELDTLS - 1, row));
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("txtNOAccessReqrep", $('#txtNOAccessReqrep').val());
    nwPopupForm_ShowModal("nwDeliveryDetailsWindow");
    func_ActionDriven("actDeliveryDetails", false);
    return false;
}


function clickQuotationDetailsButton() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var ItemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row);
    var ItemDesc = Grid.GetText(Main.GRD_ITEMDESC - 1, row);
    var UOM = Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row);
    var UOMDesc = Grid.GetText(Main.GRD_REQ_UOM_DESC - 1, row);
    var lineID = Grid.GetText(Main.GRD_LINEID - 1, row);
    var reqQty = Grid.GetText(Main.GRD_REQ_QTY - 1, row);

    //fill headers
    $('#idvallugQuotItem').val(ItemCode);
    $('#descvallugQuotItem').val(ItemDesc);
    $('#idvallugQuotUom').val(UOM);
    $('#descvallugQuotUom').val(UOMDesc);
    $('#txtQuoQty').val(reqQty);

    $('#txtQuotRownum').val(row);
    $('#txtQuotUOM').val(UOM);
    $('#txtQuotLineID').val(lineID);

    if (ItemCode == '') {
        MessageBox("Cannot Continue. Item Code is required.", "Vendor Details", 'error');
        return true;
    }

    if (reqQty == '') {
        MessageBox("Cannot Continue. Quantity is required.", "Vendor Details", 'error');
        return true;
    }

    nwParameter_Add("txtTrantype", $('#txtTrantype').val());

    nwLoading_Start("QuotationDtlsLoading", crLoadingHTML);
    nwParameter_Add("txtDocno", $("#txtDocno").val());
    nwParameter_Add("txtQuotRownum", $("#txtQuotRownum").val());
    nwParameter_Add("txtQuotUOM", $("#txtQuotUOM").val());
    nwParameter_Add("txtQuotLineID", $("#txtQuotLineID").val());
    nwParameter_Add("idvallugQuotItem", ItemCode);
    nwParameter_Add("uom", UOM);
    nwParameter_Add("hasQuo", HasJsonTempQuoDtls(ItemCode, UOM) >= 0 ? true : false);
    nwParameter_Add("jsonQuoDtls", JSON.stringify(jsonQuoDtls.filter(i => (i.itemCode + i.UOM) == ItemCode + UOM)));
    nwParameter_Add("hasData", Grid.GetText(Main.GRD_HASQUOLDTLS - 1, row) != "" ? true : false);
    nwParameter_Add("nwDocno", nwDocno);

    nwPopupForm_ShowModal("nwQuotationDetailsWindow");
    $('#nwQuotationDetailsWindow .modal-hdr-title').text("Vendor Details");
    func_ActionDriven("actQuotationDetails", false);

    return false;
}

function clickQuotationDetailsButtonNon() {
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var ItemCode = Grid.GetText(SPR_ITEMCODE - 1, row);
    var ItemDesc = Grid.GetText(SPR_ITEMDESC - 1, row);
    var UOM = Grid.GetText(SPR_REQ_UOM_CODE - 1, row);
    var UOMDesc = Grid.GetText(SPR_REQ_UOM_DESC - 1, row);
    var lineID = Grid.GetText(SPR_LINEID - 1, row);
    var reqQty = Grid.GetText(SPR_REQ_QTY - 1, row);

    //fill headers
    $('#idvallugQuotItem').val(ItemCode);
    $('#descvallugQuotItem').val(ItemDesc);
    $('#idvallugQuotUom').val(UOM);
    $('#descvallugQuotUom').val(UOMDesc);
    $('#txtQuoQty').val(reqQty);

    $('#txtQuotRownum').val(row);
    $('#txtQuotUOM').val(UOM);
    $('#txtQuotLineID').val(lineID);

    if (ItemCode == '') {
        MessageBox("Cannot Continue. Item Code is required.", "Quotation Details", 'error');
        return true;
    }

    if (reqQty == '') {
        MessageBox("Cannot Continue. Quantity is required.", "Quotation Details", 'error');
        return true;
    }

    nwParameter_Add("txtTrantype", $('#txtTrantype').val());

    nwLoading_Start("QuotationDtlsLoading", crLoadingHTML);
    nwParameter_Add("txtDocno", $("#txtDocno").val());
    nwParameter_Add("txtQuotRownum", $("#txtQuotRownum").val());
    nwParameter_Add("txtQuotUOM", $("#txtQuotUOM").val());
    nwParameter_Add("txtQuotLineID", $("#txtQuotLineID").val());
    nwParameter_Add("idvallugQuotItem", ItemCode);
    nwParameter_Add("uom", UOM);
    nwParameter_Add("hasQuo", HasJsonTempQuoDtls(ItemCode, UOM) >= 0 ? true : false);
    nwParameter_Add("jsonQuoDtls", JSON.stringify(jsonQuoDtls.filter(i => (i.itemCode + i.UOM) == ItemCode + UOM)));
    nwParameter_Add("hasData", Grid.GetText(SPR_HASQUOLDTLS - 1, row) != "" ? true : false);
    nwParameter_Add("nwDocno", nwDocno);

    nwPopupForm_ShowModal("nwQuotationDetailsWindow");
    func_ActionDriven("actQuotationDetails", false);

    return false;
}

function clickBdgtChkDtls() {

    var LocForm = $('#idvallugLocForm').val();
    var custodian = $('#idvallugCreatorCustodian').val();
    var costCenter = $('#idvallugCostCenter').val();
    var currency = $('#idvallugCurrency').val();
    var particulars = $('#txtParticular').val();
    var isConsumption = $(`#txtReqObjectiveCode`).val() == 'RO02' ? true : false;
    var reason = $('#idvallugRsnForRequest').val();

    var prompt = ''

    if (LocForm == '' ||
         custodian == '' ||
         costCenter == '' ||
         currency == '' ||
         particulars == '' ||
         (isConsumption && reason == '')
       ) {
        prompt = "Cannot proceed. Please complete the header details.";
        MessageBox(prompt, MenuItemTitle, 'error');
        return false;
    }

    jsonAllocChk = [];
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var itemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row);
    var itemDesc = Grid.GetText(Main.GRD_ITEMDESC - 1, row);
    var uom = Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row);
    var lineID = Grid.GetText(Main.GRD_LINEID - 1, row);
    var itemGrpTypeCode = Grid.GetText(Main.GRD_ITEMGRPTYPE_CODE - 1, row);
    var itemGrpTypeDesc = Grid.GetText(Main.GRD_ITEMGRPTYPE_DESC - 1, row);
    var unitCostVatex = Grid.GetText(Main.GRD_UNITCOSTVATEX - 1, row) == "" ? "0.00" : Grid.GetText(Main.GRD_UNITCOSTVATEX - 1, row);
    var locform = $('#idvallugLocForm').val();
    var totalQty = Grid.GetText(Main.GRD_REQ_QTY - 1, row)  == "" ? "0.00" : Grid.GetText(Main.GRD_REQ_QTY - 1, row);
    var totalVatex = Grid.GetText(Main.GRD_TOTAL_AMNT_VATEX - 1, row) == "" ? "0.00" : Grid.GetText(Main.GRD_TOTAL_AMNT_VATEX - 1, row);
    var isNonVat = Grid.GetText(Main.GRD_NONVAT - 1, row);
    var hasBdgtChkDtls = Grid.GetText(Main.GRD_HASBDGTCHK - 1, row) != "" ? true : false;

    var errorMsg = "";

    if (itemCode == "") {
        errorMsg += "Cannot proceed. Item code is required. \n"
    }

    if (totalQty == 0) {
        errorMsg += "Cannot proceed. Requested Quantity is required. \n";
    }

    if (unitCostVatex == 0) {
        errorMsg += "Cannot proceed. Unit Cost (VATEX) is required. \n";
    }

    if (errorMsg != "") {
        MessageBox(errorMsg, MenuItemTitle, 'error');
        return false;
    }

    nwLoading_Start('nwLoadingBdgtChk', crLoadingHTML);
    totalVatex = RemoveComma(totalVatex);

    //Fill Headers
    $('#idvallugBdgtChk_Item').val(itemCode);
    $('#descvallugBdgtChk_Item').val(itemDesc);
    $('#idvallugBdgtChk_ItemGrpType').val(itemGrpTypeCode);
    $('#descvallugBdgtChk_ItemGrpType').val(itemGrpTypeDesc);
    $('#txtBdgtchk_RowNum').val(row);
    $('#txtBdgtchk_UnitCostVatex').val(RemoveComma(unitCostVatex));
    $('#txtBCLItemCode').val(itemCode);
    $('#txtBCLUom').val(uom);
    $('#txtBCLLineID').val(lineID);
    $('#txtBdgtchkQty').val(totalQty);
    $('#txtBdgtchkVatex').val(MoneyFormat(totalVatex, 2));

    $('#txtTotalQty').val(MoneyFormat(RemoveComma(totalQty), 5));
    $('#txtTotalAmntVatex').val(MoneyFormat(RemoveComma(totalVatex), 2));

    nwPopupForm_ShowModal('nwBdgtCheckingWindow');
    $('#tab-one,#tab-two,#tab-three').prop('checked', true);

    nwParameter_Add("hasBdgtChkDtls", hasBdgtChkDtls);
    nwParameter_Add("hasJson", HasJsonTempBdgtChk(itemCode, uom) >= 0 ? true : false);
    nwParameter_Add("jsonBdgtChk", JSON.stringify(jsonBdgtChk.filter(i => (i.itemCode + i.UOM) == itemCode + uom)));
    nwParameter_Add("txtDocno", $('#txtDocno').val());
    nwParameter_Add("txtBCLLineID", $('#txtBCLLineID').val());
    nwParameter_Add("itemGrpTypeCode", itemGrpTypeCode);
    nwParameter_Add("txtTrantype", $('#txtTrantype').val());
    nwParameter_Add("locform", locform);
    nwParameter_Add("costCenter", costCenter);
    nwParameter_Add("txtTrantype", $('#txtTrantype').val());
    nwParameter_Add("hasData", Grid.GetText(Main.GRD_HASBDGTCHK - 1, row));
    nwParameter_Add("itemCode", itemCode);
    nwParameter_Add("reason", $('#idvallugRsnForRequest').val());
    nwParameter_Add("txtReasonType", $('#txtReasonType').val());
    nwParameter_Add("idvallugBdgtChk_GLAccntChrge", $(`#idvallugBdgtChk_GLAccntChrge`).val());
    nwParameter_Add("txtValueDate", $('#txtValueDate').val());
    nwParameter_Add("idvallugCurrency", $('#idvallugCurrency').val());
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("isAllwBackdateTran", $('#isAllwBackdateTran').val());
    nwParameter_Add("txtValueDate2", $('#txtValueDate2').val());
    nwParameter_Add("txtBdgtchk_PC", $('#txtBdgtchk_PC').val());
    func_ActionDriven("actLoadBdgtCheck", false);
    return false;
}

function clickBdgtChkDtlsNon() {

    var LocForm = $('#idvallugLocForm').val();
    var custodian = $('#idvallugCreatorCustodian').val();
    var costCenter = $('#idvallugCostCenter').val();
    var currency = $('#idvallugCurrency').val();
    var particulars = $('#txtParticular').val();
    var isConsumption = $(`#txtReqObjectiveCode`).val() == 'RO02' ? true : false;
    var reason = $('#idvallugRsnForRequest').val();

    var prompt = ''

    if (LocForm == '' ||
         custodian == '' ||
         costCenter == '' ||
         currency == '' ||
         particulars == '' ||
         (isConsumption && reason == '')
       ) {
        prompt = "Cannot proceed. Please complete the header details.";
        MessageBox(prompt, MenuItemTitle, 'error');
        return false;
    }

    jsonAllocChk = [];
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var itemCode = Grid.GetText(SPR_ITEMCODE - 1, row);
    var itemDesc = Grid.GetText(SPR_ITEMDESC - 1, row);
    var uom = Grid.GetText(SPR_REQ_UOM_CODE - 1, row);
    var lineID = Grid.GetText(SPR_LINEID - 1, row);
    var itemGrpTypeCode = Grid.GetText(SPR_ITEMGRPTYPE_CODE - 1, row);
    var itemGrpTypeDesc = Grid.GetText(SPR_ITEMGRPTYPE_DESC - 1, row);
    var unitCostVatex = Grid.GetText(SPR_UNITCOSTVATEX - 1, row) == "" ? "0.00" : Grid.GetText(SPR_UNITCOSTVATEX - 1, row);
    var locform = $('#idvallugLocForm').val();
    var totalQty = Grid.GetText(SPR_REQ_QTY - 1, row) == "" ? "0.00" : Grid.GetText(SPR_REQ_QTY - 1, row);
    var totalVatex = Grid.GetText(SPR_TOTAL_AMNT_VATEX - 1, row) == "" ? "0.00" : Grid.GetText(SPR_TOTAL_AMNT_VATEX - 1, row);
    var hasBdgtChkDtls = Grid.GetText(SPR_HASBDGTCHK - 1, row) != "" ? true : false;

    var errorMsg = "";

    if (itemCode == "") {
        errorMsg += "Cannot proceed. Item code is required. \n"
    }

    if (totalQty == 0) {
        errorMsg += "Cannot proceed. Requested Quantity is required. \n";
    }

    if (unitCostVatex == 0) {
        errorMsg += "Cannot proceed. Unit Cost (VATEX) is required. \n";
    }

    if (errorMsg != "") {
        MessageBox(errorMsg, MenuItemTitle, 'error');
        return false;
    }

    nwLoading_Start('nwLoadingBdgtChk', crLoadingHTML);
    totalVatex = RemoveComma(totalVatex);

    //Fill Headers
    $('#idvallugBdgtChk_Item').val(itemCode);
    $('#descvallugBdgtChk_Item').val(itemDesc);
    $('#idvallugBdgtChk_ItemGrpType').val(itemGrpTypeCode);
    $('#descvallugBdgtChk_ItemGrpType').val(itemGrpTypeDesc);
    $('#txtBdgtchk_RowNum').val(row);
    $('#txtBdgtchk_UnitCostVatex').val(RemoveComma(unitCostVatex));
    $('#txtBCLItemCode').val(itemCode);
    $('#txtBCLUom').val(uom);
    $('#txtBCLLineID').val(lineID);
    $('#txtBdgtchkQty').val(totalQty);
    $('#txtBdgtchkVatex').val(MoneyFormat(totalVatex, 2));

    $('#txtTotalQty').val(MoneyFormat(RemoveComma(totalQty), 5));
    $('#txtTotalAmntVatex').val(MoneyFormat(RemoveComma(totalVatex), 2));

    nwPopupForm_ShowModal('nwBdgtCheckingWindow');
    $('#tab-one,#tab-two,#tab-three').prop('checked', true);

    nwParameter_Add("hasBdgtChkDtls", hasBdgtChkDtls);
    nwParameter_Add("hasJson", HasJsonTempBdgtChk(itemCode, uom) >= 0 ? true : false);
    nwParameter_Add("jsonBdgtChk", JSON.stringify(jsonBdgtChk.filter(i => (i.itemCode + i.UOM) == itemCode + uom)));
    nwParameter_Add("txtDocno", $('#txtDocno').val());
    nwParameter_Add("txtBCLLineID", $('#txtBCLLineID').val());
    nwParameter_Add("itemGrpTypeCode", itemGrpTypeCode);
    nwParameter_Add("txtTrantype", $('#txtTrantype').val());
    nwParameter_Add("locform", locform);
    nwParameter_Add("costCenter", costCenter);
    nwParameter_Add("txtTrantype", $('#txtTrantype').val());
    nwParameter_Add("hasData", Grid.GetText(SPR_HASBDGTCHK - 1, row));
    nwParameter_Add("itemCode", itemCode);
    nwParameter_Add("reason", $('#idvallugRsnForRequest').val());
    nwParameter_Add("txtReasonType", $('#txtReasonType').val());
    nwParameter_Add("idvallugBdgtChk_GLAccntChrge", $(`#idvallugBdgtChk_GLAccntChrge`).val());
    nwParameter_Add("txtValueDate", $('#txtValueDate').val());
    nwParameter_Add("idvallugCurrency", $('#idvallugCurrency').val());
    nwParameter_Add("nwDocno", nwDocno);

    nwParameter_Add("isAllwBackdateTran", $('#isAllwBackdateTran').val());
    nwParameter_Add("txtBdgtchk_PC", $('#txtBdgtchk_PC').val());
    func_ActionDriven("actLoadBdgtCheck", false);
    return false;
}

function clickbdgtChk_AllocProc() {
    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;

    if ($(`#txtTrantype`).val() == 'REQREP')
        return;

    //store all segments
    tempAllocSegments.GRD_SEG2CODE = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG2CODE - 1, rowBgtChkLIN);
    tempAllocSegments.GRD_SEG2DESC = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG2DESC - 1, rowBgtChkLIN);
    tempAllocSegments.GRD_SEG3CODE = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3CODE - 1, rowBgtChkLIN);
    tempAllocSegments.GRD_SEG3DESC = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3DESC - 1, rowBgtChkLIN);
    tempAllocSegments.GRD_SEG4CODE = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG4CODE - 1, rowBgtChkLIN);
    tempAllocSegments.GRD_SEG4DESC = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG4DESC - 1, rowBgtChkLIN);
    tempAllocSegments.GRD_SEG5CODE = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG5CODE - 1, rowBgtChkLIN);
    tempAllocSegments.GRD_SEG5DESC = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG5DESC - 1, rowBgtChkLIN);

    var qty = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, rowBgtChkLIN) == "" ? "0.00" : GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, rowBgtChkLIN);
    var amntVatex = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, rowBgtChkLIN) == "" ? "0.00" : GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, rowBgtChkLIN);
    var percentage = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, rowBgtChkLIN) == "" ? "0.00" : GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, rowBgtChkLIN);
    var dtsLineID = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_DTLSID - 1, rowBgtChkLIN);
    var hasAllocDtls = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_HASALLOC - 1, rowBgtChkLIN);
    var tagSeg3 = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_TAGPC - 1, rowBgtChkLIN);
    var tagSeg4 = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_TAGCC - 1, rowBgtChkLIN);

    var itemCode = $('#txtBCLItemCode').val();
    var uom = $('#txtBCLUom').val();
    var col = $('#txtBdgtchk_PC').val();
    var segCode = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3CODE - 1, rowBgtChkLIN);
    $('#txtBdgtSegCode').val(segCode);
    $('#txtAllocRowNum').val(rowBgtChkLIN);

    //Validation
    var errorMsg = "";
    if (segCode == "") {
        errorMsg += `Cannot proceed. ${getProfitCenter()} is required. \n`;
    }

    if (parseFloat(qty) <= 0.00) {
        errorMsg += "Cannot proceed. Budget Distribution Quantity is required. \n";
    }

    if (parseFloat(amntVatex) <= 0.00) {
        errorMsg += "Cannot proceed. Budget Distribution Amount(VATEX) is required. \n";
    }

    if (parseFloat(percentage) <= 0.00) {
        errorMsg += "Cannot proceed. Budget Distribution Percentage is required. \n";
    }

    if (errorMsg != "") {
        MessageBox(errorMsg, MenuItemTitle, "error");
        return false;
    }

    //fill headers
    $('#txtAllocTotalQty').val(qty);
    $('#txtAllocTotalAmntVatex').val(amntVatex);

    $('#txtAllocTagSeg3').val(tagSeg3);
    $('#txtAllocTagSeg4').val(tagSeg4);

    nwLoading_Start('nwLoadingBdgtChkAlloc', crLoadingHTML);
    nwParameter_Add("hasAllocDtls", hasAllocDtls != "" ? true : false);
    nwParameter_Add("hasJsonFnl", HasJsonTempBdgtAllocFnl(itemCode, uom, segCode) >= 0 ? true : false);
    nwParameter_Add("jsonAllocChkFnl", JSON.stringify(jsonAllocChkFnl.filter(i => (i.itemCode + i.UOM + i.bdgtSegCode) == itemCode + uom + segCode)));
    nwParameter_Add("hasJson", HasJsonTempBdgtAlloc(itemCode, uom, segCode) >= 0 ? true : false);
    nwParameter_Add("jsonAllocChk", JSON.stringify(jsonAllocChk.filter(i => (i.itemCode + i.UOM + i.bdgtSegCode) == itemCode + uom + segCode)));
    nwParameter_Add("txtDocno", $('#txtDocno').val());
    nwParameter_Add("txtBCLLineID", $('#txtBCLLineID').val());
    nwParameter_Add("dtsLineID", dtsLineID);
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("tagSeg3", tagSeg3);
    nwParameter_Add("tagSeg4", tagSeg4);

    nwPopupForm_ShowModal('nwAllocProcessWindow');
    func_ActionDriven("actLoadBdgtCheckAlloc", false);
    return false;
}

function clickReqCompliance() {
    var trantype = $('#txtTrantype').val();
    var docno = $('#txtDocno').val();

    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var lineID = Grid.GetText(Main.GRD_LINEID - 1, row);
    var itemGrpType = Grid.GetText(Main.GRD_ITEMGRPTYPE_CODE - 1, row);
    var isView = nwDocno != "" ? true : false;

    if (docno == "" || lineID == "") {
        MessageBox("Cannot proceed. Data should be saved first", MenuItemTitle, 'error');
        return false;
    }

    var fullength = GetCurrentURL() + `../DCRequirementCompliance?TransactionNo=${encodeURI(docno)}&TranType=${encodeURI(trantype)}&nwItemG=${encodeURI(itemGrpType)}&nwLineID=${encodeURI(lineID)}&nwRownum=${encodeURI(lineID)}&isView=${encodeURI(isView)}`;

    nwLoading_Start('xReqCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRequireComplianceLIN", true, fullength);
    $('#nwPopUpRequireComplianceLIN .modal-hdr-title').text("Requirements Compliance");
    nwPopupForm_ShowModal("nwPopUpRequireComplianceLIN");
    nwLoading_End('xReqCompliance');
}

function clickReqComplianceNon() {
    var trantype = $('#txtTrantype').val();
    var docno = $('#txtDocno').val();

    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var lineID = Grid.GetText(SPR_LINEID - 1, row);
    var itemGrpType = Grid.GetText(SPR_ITEMGRPTYPE_CODE - 1, row);
    var isView = nwDocno != "" ? true : false;

    if (docno == "" || lineID == "") {
        MessageBox("Cannot proceed. Data should be saved first", MenuItemTitle, 'error');
        return false;
    }

    var fullength = GetCurrentURL() + `../DCRequirementCompliance?TransactionNo=${encodeURI(docno)}&TranType=${encodeURI(trantype)}&nwItemG=${encodeURI(itemGrpType)}&nwLineID=${encodeURI(lineID)}&nwRownum=${encodeURI(lineID)}&isView=${encodeURI(isView)}`;

    nwLoading_Start('xReqCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRequireComplianceLIN", true, fullength);
    $('#nwPopUpRequireComplianceLIN .modal-hdr-title').text("Requirements Compliance");
    nwPopupForm_ShowModal("nwPopUpRequireComplianceLIN");
    nwLoading_End('xReqCompliance');
}


function clickSOHDtls() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    let val = Grid.GetText(Main.GRD_INVENTORIABLE - 1, row).toLowerCase()
    var isInventoriable = val == "true" || val == "1" ? true : false;
    if (!isInventoriable) {
        return false;
    }


    var ItemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row);
    var ItemDesc = Grid.GetText(Main.GRD_ITEMDESC - 1, row);
    var UOM = Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row);
    var UOMDesc = Grid.GetText(Main.GRD_REQ_UOM_DESC - 1, row);
    var vatex = Grid.GetText(Main.GRD_UNITCOSTVATEX - 1, row);
    var qty = Grid.GetText(Main.GRD_REQ_QTY - 1, row);
    var subloc = Grid.GetText(Main.GRD_SUBLOCATION_CODE - 1, row);
    var hasSOH = Grid.GetText(Main.GRD_HASSOH - 1, row);
    var lineId = Grid.GetText(Main.GRD_LINEID - 1, row);


    var errMsg = '';
    if (ItemCode.length == 0) {
        errMsg += "Cannot proceed. Item Code is required in row "+(+row + 1) +". \n";
    }

    if (UOM.length == 0) {
        errMsg += "Cannot proceed. Request UOM is required in row "+(+row + 1) +". \n";
    }

    if (subloc.length == 0 && $("#txtTrantype").val().toLowerCase() == "reqcon") {
        errMsg += "Cannot proceed. Sublocation is required in row "+(+row + 1) +". \n";
    }

    if (errMsg.length > 0) {
        MessageBox(errMsg, MenuItemTitle, 'error');
        return false;
    }

    nwLoading_Start('nwLoadingSOH', crLoadingHTML)
    //Fill Data
    $('#txtSOHItemCode').val(ItemCode);
    $('#txtSOHItem').val(ItemDesc);
    $('#txtSOHReqUOM').val(UOMDesc);


    nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
    nwParameter_Add("idvallugCreatorCustodian", $('#idvallugCreatorCustodian').val());
    nwParameter_Add("idvallugCurrency", $('#idvallugCurrency').val());
    nwParameter_Add("txtDocno", $('#txtDocno').val());
    nwParameter_Add("txtTrantype", $('#txtTrantype').val());
    nwParameter_Add("UOM", UOM);
    nwParameter_Add("ItemCode", ItemCode);
    nwParameter_Add("subloc", subloc);
    nwParameter_Add("vatex", RemoveComma(vatex));
    nwParameter_Add("qty", RemoveComma(qty));
    nwParameter_Add("hasSOH", hasSOH);
    nwParameter_Add("lineId", lineId);
    nwParameter_Add("hasDetails", Grid.GetText(Main.GRD_HASDELDTLS - 1, row));
    nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls.filter(i => (i.itemCode + i.ReqUOM) == ItemCode + UOM)));
    nwParameter_Add("hasJson", HasJsonTempDelDtls(ItemCode, UOM) >= 0 ? true : false);
    nwPopupForm_ShowModal("nwSOHDetailsWindow");
    func_ActionDriven("actGenerateSOH", false);
    return false;
}

function clickbtnSTViewDetails() {
    var GridSelect = nwGridConSelect_Book.ActiveSheet;
    var rowSelect = GridSelect.CellSelected.row - 1;

    var docno = GridSelect.GetText(GRD_ST_DOCNO - 1, rowSelect);
    var fullength = GetCurrentURL() + `../RMRequestEntry?nwDocno=${encodeURI(docno)}`;

    avar++;
    nwLoading_Start('xLoadingRequestEntry', crLoadingHTML);

    nwPopupForm_Create("nwPopUpRequestEntry", true, fullength);
    $('#nwPopUpRequestEntry .modal-hdr-title').text("View Entry Screen");

    nwPopupForm_ShowModal("nwPopUpRequestEntry");

    nwLoading_End('xLoadingRequestEntry');
}

var jsonStoreData = [];
var isMainGrid = false;

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var isValid = false;
    var code;
    var vatin = "";
    var vatex = "";
    var unitCost = "";

    if (isbuttonclick) {
        isbuttonclick = false;
        return false;
    }
   
    //MAIN GRID
    if (nwGridID == 'nwGridCon') {
        var Grid = nwGridCon_Book.ActiveSheet;
        var cnt = Grid.GetMaxRow();
        var row = Grid.CellSelected.row - 1;

        code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
        isExist = nwLib.nwTempTable_Column_ValueExist(nwGridID, Main.GRD_LINEID, code, false, "text", 0);

        isMainGrid = true;

        if (isExist == false) {

            let itemCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            let itemDesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            let itemGrpTypeCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(6)').text();
            let itemGrpTypeDesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(7)').text();
            let uom = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();

            crnwTRtemp[Main.GRD_ITEMCODE - 1] = itemCode;
            crnwTRtemp[Main.GRD_ITEMDESC - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            crnwTRtemp[Main.GRD_BASED_UOM - 1] = uom;
            crnwTRtemp[Main.GRD_ITEMGRPTYPE_CODE - 1] = itemGrpTypeCode;
            crnwTRtemp[Main.GRD_ITEMGRPTYPE_DESC - 1] = itemGrpTypeDesc;
            crnwTRtemp[Main.GRD_INVENTORIABLE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(10)').text();
            crnwTRtemp[Main.GRD_NONINVENTORIABLE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(11)').text();
            crnwTRtemp[Main.GRD_SPECNOTES - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(12)').text();

            $('#idvallugBdgtChk_Item').val(itemCode);
            $('#descvallugBdgtChk_Item').val(itemDesc);
            $('#idvallugBdgtChk_ItemGrpType').val(itemGrpTypeCode);
            $('#descvallugBdgtChk_ItemGrpType').val(itemGrpTypeDesc);
            $('#txtBdgtchk_RowNum').val(row);
            $('#txtBCLItemCode').val(itemCode);
            $('#txtBCLUom').val(uom);

            StoreInJsonItemList(itemCode, itemDesc, itemGrpTypeCode, itemGrpTypeDesc, uom);

            nwParameter_Add("itemCode", itemCode);
            nwParameter_Add("reason", $('#idvallugRsnForRequest').val());
            nwParameter_Add("txtReasonType", $('#txtReasonType').val());
            nwParameter_Add("txtTrantype", $('#txtTrantype').val());

            UponLookUpItemCode();

            
        }
    }

    //MAIN GRID NON CATALOGUE
    if (nwGridID == 'nwGridConNonCatalogue') {
        var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
        var cnt = Grid.GetMaxRow();
        var row = Grid.CellSelected.row - 1;

        code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
        isExist = nwLib.nwTempTable_Column_ValueExist(nwGridID, SPR_LINEID, code, false, "text", 0);

        isMainGrid = true;

        if (isExist == false) {

            let itemCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            let itemDesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            let itemGrpTypeCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(6)').text();
            let itemGrpTypeDesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(7)').text();
            let uom = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();

            crnwTRtemp[SPR_ITEMGRPTYPE_CODE - 1] = itemGrpTypeCode;
            crnwTRtemp[SPR_ITEMGRPTYPE_DESC - 1] = itemGrpTypeDesc;
            crnwTRtemp[SPR_PROCUREMENT_CODE - 1] = nwGridConNonCatalogue_Book.ActiveSheet.GetText(SPR_PROCUREMENT_CODE - 1, row);
            crnwTRtemp[SPR_PROCUREMENT_DESC - 1] = nwGridConNonCatalogue_Book.ActiveSheet.GetText(SPR_PROCUREMENT_DESC - 1, row);
            crnwTRtemp[SPR_ITEMCODE - 1] = itemCode;
            crnwTRtemp[SPR_ITEMDESC - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            crnwTRtemp[SPR_SPECNOTES - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(12)').text();

            $('#idvallugBdgtChk_Item').val(itemCode);
            $('#descvallugBdgtChk_Item').val(itemDesc);
            $('#idvallugBdgtChk_ItemGrpType').val(itemGrpTypeCode);
            $('#descvallugBdgtChk_ItemGrpType').val(itemGrpTypeDesc);
            $('#txtBdgtchk_RowNum').val(row);
            $('#txtBCLItemCode').val(itemCode);
            $('#txtBCLUom').val(uom);

            StoreInJsonItemList(itemCode, itemDesc, itemGrpTypeCode, itemGrpTypeDesc, uom);


            nwParameter_Add("itemCode", itemCode);
            nwParameter_Add("reason", $('#idvallugRsnForRequest').val());
            nwParameter_Add("txtReasonType", $('#txtReasonType').val());
            nwParameter_Add("txtTrantype", $('#txtTrantype').val());
            UponLookUpItemCodeNon();
            
            
        }
    }
    
    // Budget Charging Details GRID
    else if (nwGridID == 'nwGridConBgtChkLIN') {
        code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + addtoListTableRec.find('tr:eq(' + index + ') td:eq(0)').text();
        isExist = nwLib.nwTempTable_Column_ValueExist(nwGridID, GRD_LINEID, code, false, "text", 0);

        vatin = addtoListTableRec.find('tr:eq(' + index + ') td:eq(9)').text();
        vatex = addtoListTableRec.find('tr:eq(' + index + ') td:eq(10)').text()

        if (isExist == false) {

            var colCode = $('#txtBdgtchk_PC').val();
            var colDesc = Number($('#txtBdgtchk_PC').val()) + 1;

            crnwTRtemp[colCode] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            crnwTRtemp[colDesc] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            crnwTRtemp[BdgtLIN.GRD_BCL_REM_BDGT_AMNT] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
            crnwTRtemp[BdgtLIN.GRD_BCL_SEG2CODE] = $('#idvallugLocForm').val();
            crnwTRtemp[BdgtLIN.GRD_BCL_SEG2DESC] = $('#descvallugLocForm').val();
            crnwTRtemp[BdgtLIN.GRD_BCL_SEG4CODE] = $('#idvallugCostCenter').val();
            crnwTRtemp[BdgtLIN.GRD_BCL_SEG4DESC] = $('#descvallugCostCenter').val();
        }

    }

    //Allocation Process Grid
    else if (nwGridID == 'nwGridConAllocProcess') {
        code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + addtoListTableRec.find('tr:eq(' + index + ') td:eq(0)').text();
        isExist = nwLib.nwTempTable_Column_ValueExist(nwGridID, GRD_LINEID, code, false, "text", 0);

        vatin = addtoListTableRec.find('tr:eq(' + index + ') td:eq(9)').text();
        vatex = addtoListTableRec.find('tr:eq(' + index + ') td:eq(10)').text()
        unitCost = $(`#rbVATIN`).is(':checked') ? vatin : vatex;

        if (isExist == false) {

            var colCode = $('#txtBdgtchk_PC').val();
            var colDesc = Number($('#txtBdgtchk_PC').val()) + 1;

            crnwTRtemp[colCode] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
            crnwTRtemp[colDesc] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
            crnwTRtemp[BdgtLIN.GRD_BCL_SEG2CODE] = $('#idvallugLocForm').val();
            crnwTRtemp[BdgtLIN.GRD_BCL_SEG2DESC] = $('#descvallugLocForm').val();
            crnwTRtemp[BdgtLIN.GRD_BCL_SEG4CODE] = $('#idvallugCostCenter').val();
            crnwTRtemp[BdgtLIN.GRD_BCL_SEG4DESC] = $('#descvallugCostCenter').val();
        }
    }

    //Quotation Details
    if (nwGridID == 'nwGridConQuotationDetails') {
        crnwTRtemp[GRD_QD_VATEX - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
        crnwTRtemp[GRD_QD_VATIN - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
        crnwTRtemp[GRD_QD_VENDORCODE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
        crnwTRtemp[GRD_QD_VENDORNAME - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();
        crnwTRtemp[GRD_QD_VENDORCONTACTPERSON - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text();
        crnwTRtemp[GRD_QD_VENDORCONTRCTNO - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(6)').text();
        crnwTRtemp[GRD_QD_PAYMENTTERM_CODE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(7)').text();
        crnwTRtemp[GRD_QD_PAYMENTTERM_DESC - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(8)').text();
    }

    return crnwTRtemp;
}


var tempLocformCode = "";
var tempLocformDesc = "";

var tempCurrencyCode = "";
var tempCurrencyDesc = "";

var tempRsnForRqstCode = "";
var tempRsnForRqstDesc = "";

var tempCostCenterCode = "";
var tempCostCenterDesc = "";

function cust_LookupButton() {
    isbuttonclick = true;
}


function Lookup_DoneFunction(idName, idNum) {
    var DelID = '';
    
    //lookup done header
    if (idName == 'toolboxInquire') {
    }
    else if (idName == "lugCostCenter") {
        let ccCode = getLookupData(idNum, 0);
        let ccDesc = getLookupData(idNum, 1);
        let jsnLen = jsonBdgtChk.length;
        if (jsnLen > 0) {
            for (let x = 0; x <= jsnLen; x++){
                jsonBdgtChk[x]["seg4Bdgt"] = ccCode;
                jsonBdgtChk[x]["seg4Code"] = ccCode;
                jsonBdgtChk[x]["seg4Desc"] = ccDesc;
                jsonBdgtChk[x]["seg4DescBdgt"] = ccDesc;
            }
        }
    }
    else if (idName == 'lugLocForm') {
        ClearLookUp(idName);
        var crncyCode = getLookupData(idNum, 2);
        var crncyDesc = getLookupData(idNum, 3);
        isDontChange = getLookupData(idNum, 4);

        $('#idvallugCurrency').val(crncyCode);
        $('#descvallugCurrency').val(crncyDesc);
        $('#txtValueDate2').val('');

        if (isWithSavedDetails()) {
            msgBoxContainerQuestion = "UponChangeLocation";
            let strMsg = "Changing of currency will reset the Charging Details. Would you like to continue?\n";
            strMsg += "Changing of currency will reset the Quotation Details. Would you like to continue?\n";
            parent_MessageBoxQuestion(strMsg, MenuItemTitle, "Question");
        }
        else {
            ClearCostCenter();

        }
    }
    else if (idName == 'lugCreatorCustodian') {
        $('#txtContactNo').val(getLookupData(idNum, 2));
    }
    else if (idName == 'lugCurrency') {

        if (tempCurrencyCode != "" && isWithDataForCurrency()) {
            msgBoxContainerQuestion = "UponChangeCurrency";
            parent_MessageBoxQuestion("Changing of currency will reset the Charging Details and the Quotation Details. Do you want to continue ?", MenuItemTitle, "Question");
            $('#Message_Cancel').css('display', 'none');
        }
    }
    else if (idName == 'lugRsnForRequest') {
        $('#txtReasonType').val(getLookupData(idNum, 2));
    }

    //MAIN GRID
    try {
        var Grid = nwGridCon_Book.ActiveSheet;
        var row = Grid.CellSelected.row - 1;
        var col = Grid.CellSelected.col - 1;
    } catch (ex) { }

    if (idName == 'lugItemGroupType') {
        Grid.SetText(Main.GRD_ITEMGRPTYPE_CODE - 1, row, getLookupData(idNum, 0));
        Grid.SetText(Main.GRD_ITEMGRPTYPE_DESC - 1, row, getLookupData(idNum, 1));
        Grid.SetText(Main.GRD_ITEMCODE - 1, row, "");
        Grid.SetText(Main.GRD_ITEMDESC - 1, row, "");
        Grid.SetText(Main.GRD_REQ_UOM_CODE - 1, row, "");
        Grid.SetText(Main.GRD_REQ_UOM_DESC - 1, row, "");
        Grid.SetText(Main.GRD_LASTPOPRICEVATIN - 1, row, "");
        Grid.SetText(Main.GRD_LASTPOPRICEVATEX - 1, row, "");
    }
    else if (idName == 'lugItemCode') {
        //View Item Master Details
       if (!isbuttonclick) {
           Grid.SetText(Main.GRD_ITEMCODE - 1, row, getLookupData(idNum, 0));
           Grid.SetText(Main.GRD_ITEMDESC - 1, row, getLookupData(idNum, 1));
           Grid.SetText(Main.GRD_UNITCOST - 1, row, (0).toFixed(5));
           Grid.SetText(Main.GRD_NONINVENTORIABLE - 1, row, getLookupData(idNum, 12));
           GetdefLastPOPrice();
        }
    }
    else if (idName == 'lugConsumptionSubLoc') {
        Grid.SetText(Main.GRD_SUBLOCATION_CODE - 1, row, getLookupData(idNum, 0));
        Grid.SetText(Main.GRD_SUBLOCATION_DESC - 1, row, getLookupData(idNum, 1));
        Grid.SetText(Main.GRD_DELIVERYADDRESS - 1, row, getLookupData(idNum, 2));
    }
    else if (idName == 'lugRequestUOM') {
        Grid.SetText(Main.GRD_REQ_UOM_CODE - 1, row, getLookupData(idNum, 0));
        Grid.SetText(Main.GRD_REQ_UOM_DESC - 1, row, getLookupData(idNum, 1));

        var ItemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row);
        var ItemUOM = getLookupData(idNum, 0);
        let ItemDecimalPlace = getLookupData(idNum, 2);

        Grid.SetText(Main.GRD_DECIMALPLACE - 1, row, ItemDecimalPlace);

        GetdefLastPOPrice();

        var result = CheckDuplicateItemUOM(row, ItemCode, ItemUOM);

        if (result != "") {
            MessageBox(result, MenuItemTitle, 'error');
            Grid.SetText(Main.GRD_REQ_UOM_CODE - 1, row, "");
            Grid.SetText(Main.GRD_REQ_UOM_DESC - 1, row, "");
        }
    }
    else if (idName == 'lugCurrency') {
        Grid.SetText(GRD_CURRENCY - 1, row, getLookupData(idNum, 0));
        GetdefLastPOPrice();
    }
    else if (idName == 'lugPrefVendor') {
        Grid.SetText(Main.GRD_PREFVENDOR_CODE - 1, row, getLookupData(idNum, 0));
        Grid.SetText(Main.GRD_PREFVENDOR_NAME - 1, row, getLookupData(idNum, 1));
        GetdefLastPOPrice();
    }
    else if (idName == "lugIsLookUps") {
        var colCode = Grid.CellSelected.col - 1;
        var colDesc = Grid.CellSelected.col;

        Grid.SetText(colCode, row, getLookupData(idNum, 0));
        Grid.SetText(colDesc, row, getLookupData(idNum, 1));


        let pert = Grid.GetText(GRD_BCL_PERCENTAGE - 1, row);
        if (pert == "") {
            Grid.SetText(GRD_BCL_PERCENTAGE - 1, row, "100.00000000000");
            $('#txtTotalPrcnt').val(100);
        }

    }
    //////

    ////main grid non catalogue
    try {
        var GridNonCatalogue = nwGridConNonCatalogue_Book.ActiveSheet;
        var rowNonCatalogue = GridNonCatalogue.CellSelected.row - 1;
        var colNonCatalogue = GridNonCatalogue.CellSelected.col - 1;
    } catch (ex) { }

    //NON CATALOGUE MAIN GRID
    if (idName == 'lugItemGroupType') {
        GridNonCatalogue.SetText(SPR_ITEMGRPTYPE_CODE - 1, rowNonCatalogue, getLookupData(idNum, 0));
        GridNonCatalogue.SetText(SPR_ITEMGRPTYPE_DESC - 1, rowNonCatalogue, getLookupData(idNum, 1));
        GridNonCatalogue.SetText(SPR_ITEMCODE - 1, rowNonCatalogue, "");
        GridNonCatalogue.SetText(SPR_ITEMDESC - 1, rowNonCatalogue, "");
        GridNonCatalogue.SetText(SPR_REQ_UOM_CODE - 1, rowNonCatalogue, "");
        GridNonCatalogue.SetText(SPR_REQ_UOM_DESC - 1, rowNonCatalogue, "");
        GridNonCatalogue.SetText(SPR_LASTPOPRICEVATIN - 1, rowNonCatalogue, "");
        GridNonCatalogue.SetText(SPR_LASTPOPRICEVATEX - 1, rowNonCatalogue, "");
    }
    else if (idName == 'lugProcurement') {
        //View Item Master Details
        GridNonCatalogue.SetText(SPR_PROCUREMENT_CODE - 1, rowNonCatalogue, getLookupData(idNum, 0));
            GridNonCatalogue.SetText(SPR_PROCUREMENT_DESC - 1, rowNonCatalogue, getLookupData(idNum, 1));
    }
    else if (idName == 'lugItemCode') {
        //View Item Master Details
        if (!isbuttonclick) {
            GridNonCatalogue.SetText(GRD_ITEMCODE - 1, rowNonCatalogue, getLookupData(idNum, 0));
            GridNonCatalogue.SetText(GRD_ITEMDESC - 1, rowNonCatalogue, getLookupData(idNum, 1));
            GridNonCatalogue.SetText(GRD_UNITCOST - 1, rowNonCatalogue, (0).toFixed(5));
            GridNonCatalogue.SetText(GRD_OCY_AMOUNT - 1, rowNonCatalogue, (0).toFixed(2));
            GridNonCatalogue.SetText(GRD_NONINVENTORIABLE - 1, rowNonCatalogue, getLookupData(idNum, 12));

            GetdefLastPOPrice();
        }
    }
    else if (idName == 'lugConsumptionSubLoc') {
        GridNonCatalogue.SetText(SPR_SUBLOCATION_CODE - 1, rowNonCatalogue, getLookupData(idNum, 0));
        GridNonCatalogue.SetText(SPR_SUBLOCATION_DESC - 1, rowNonCatalogue, getLookupData(idNum, 1));
        GridNonCatalogue.SetText(SPR_DELIVERYADDRESS - 1, rowNonCatalogue, getLookupData(idNum, 2));
    }
    else if (idName == 'lugRequestUOM') {
        GridNonCatalogue.SetText(SPR_REQ_UOM_CODE - 1, rowNonCatalogue, getLookupData(idNum, 0));
        GridNonCatalogue.SetText(SPR_REQ_UOM_DESC - 1, rowNonCatalogue, getLookupData(idNum, 1));

        var ItemCode = GridNonCatalogue.GetText(SPR_ITEMCODE - 1, rowNonCatalogue);
        var ItemUOM = getLookupData(idNum, 0);
        let ItemDecimalPlace = getLookupData(idNum, 2);


        GetdefLastPOPrice();

        var result = CheckDuplicateItemUOM(rowNonCatalogue, ItemCode, ItemUOM);

        if (result != "") {
            MessageBox(result, MenuItemTitle, 'error');
            GridNonCatalogue.SetText(SPR_REQ_UOM_CODE - 1, rowNonCatalogue, "");
            GridNonCatalogue.SetText(SPR_REQ_UOM_DESC - 1, rowNonCatalogue, "");
        }
    }
    else if (idName == 'lugCurrency') {
        GridNonCatalogue.SetText(GRD_CURRENCY - 1, rowNonCatalogue, getLookupData(idNum, 0));
        GetdefLastPOPrice();
    }
    else if (idName == 'lugPrefVendor') {
        GridNonCatalogue.SetText(SPR_PREFVENDOR_CODE - 1, rowNonCatalogue, getLookupData(idNum, 0));
        GridNonCatalogue.SetText(SPR_PREFVENDOR_NAME - 1, rowNonCatalogue, getLookupData(idNum, 1));
        GetdefLastPOPrice();
    }
    else if (idName == "lugIsLookUps") {
        var colNonCatalogueCode = GridNonCatalogue.CellSelected.colNonCatalogue - 1;
        var colNonCatalogueDesc = GridNonCatalogue.CellSelected.colNonCatalogue;

        GridNonCatalogue.SetText(colNonCatalogueCode, rowNonCatalogue, getLookupData(idNum, 0));
        GridNonCatalogue.SetText(colNonCatalogueDesc, rowNonCatalogue, getLookupData(idNum, 1));


        let pert = GridNonCatalogue.GetText(GRD_BCL_PERCENTAGE - 1, rowNonCatalogue);
        if (pert == "") {
            GridNonCatalogue.SetText(GRD_BCL_PERCENTAGE - 1, rowNonCatalogue, "100.00000000000");
            $('#txtTotalPrcnt').val(100);
        }

    }
    ////

    //DELIVERY DETAILS GRID
    try{
        var GridDeliveryID = nwGridConDeliveryID_Book.ActiveSheet;
        var rowDeliveryID = GridDeliveryID.CellSelected.row - 1;
    } catch (ex) {    }

    if (idName == 'lugDelLocCode') {
        GridDeliveryID.SetText(GRD_DD_DELLOCCODE - 1, rowDeliveryID, getLookupData(idNum, 0));
        GridDeliveryID.SetText(GRD_DD_DELLOCDESC - 1, rowDeliveryID, getLookupData(idNum, 1));
        GridDeliveryID.SetText(GRD_DD_SUBLOCCODE - 1, rowDeliveryID, getLookupData(idNum, 2));
        GridDeliveryID.SetText(GRD_DD_SUBLOCDESC - 1, rowDeliveryID, getLookupData(idNum, 3));
        GridDeliveryID.SetText(GRD_DD_DELADDRESS - 1, rowDeliveryID, getLookupData(idNum, 4));
    }
    else if (idName == 'lugSubLocCode') {

        GridDeliveryID.SetText(GRD_DD_SUBLOCCODE - 1, rowDeliveryID, getLookupData(idNum, 0));
        GridDeliveryID.SetText(GRD_DD_SUBLOCDESC - 1, rowDeliveryID, getLookupData(idNum, 1));
        GridDeliveryID.SetText(GRD_DD_DELADDRESS - 1, rowDeliveryID, getLookupData(idNum, 2));

        DelID = GridDeliveryID.GetText(GRD_DD_DELDATE - 1, rowDeliveryID) +
                GridDeliveryID.GetText(GRD_DD_DELLOCCODE - 1, rowDeliveryID) +
                GridDeliveryID.GetText(GRD_DD_SUBLOCCODE - 1, rowDeliveryID);

        CheckDuplicate(rowDeliveryID, col - 1, DelID);
    }
    else if (idName == "lugDeliveryRecipient") {
        GridDeliveryID.SetText(GRD_DD_DELRECIPIENT_CODE - 1, rowDeliveryID, getLookupData(idNum, 0));
        GridDeliveryID.SetText(GRD_DD_DELRECIPIENT - 1, rowDeliveryID, getLookupData(idNum, 1));
    }
     //////

    //SINGLE DELIVERY GRID
    try {
        var GridSingleDel = nwGridConSingleDel_Book.ActiveSheet;
        var rowSingleDel = GridSingleDel.CellSelected.row - 1;
    } catch (ex) { }

    if (idName == 'lugSDDelLocCode') {
        GridSingleDel.SetText(GRD_SD_DELLOCODE - 1, rowSingleDel, getLookupData(idNum, 0));
        GridSingleDel.SetText(GRD_SD_DELLOCDESC - 1, rowSingleDel, getLookupData(idNum, 1));
        GridSingleDel.SetText(GRD_SD_SUBLOCCODE - 1, rowSingleDel, getLookupData(idNum, 2));
        GridSingleDel.SetText(GRD_SD_SUBLOCDESC - 1, rowSingleDel, getLookupData(idNum, 3));
        GridSingleDel.SetText(GRD_SD_DELADDRESS - 1, rowSingleDel, getLookupData(idNum, 4));
    }
    else if (idName == 'lugSDSubLocCode') {
        GridSingleDel.SetText(GRD_SD_SUBLOCCODE - 1, rowSingleDel, getLookupData(idNum, 0));
        GridSingleDel.SetText(GRD_SD_SUBLOCDESC - 1, rowSingleDel, getLookupData(idNum, 1));
        GridSingleDel.SetText(GRD_SD_DELADDRESS - 1, rowSingleDel, getLookupData(idNum, 2));
    }
    else if (idName == "lugSDDelRecipient") {
        GridSingleDel.SetText(GRD_SD_DELRECIPIENTCODE - 1, rowSingleDel, getLookupData(idNum, 0));
        GridSingleDel.SetText(GRD_SD_DELRECIPIENT - 1, rowSingleDel, getLookupData(idNum, 1));
    }

    //APPLY TO ONE LOCATION HEADER
    if (idName == 'lugApplyToOneLoc_Subloc') {
        $('#txtApplyToOneLoc_DelAddr').val(getLookupData(idNum, 2));
    }
    ///////

    /// QUOTATION DETAILLS
    try {
        var GridQuotation = nwGridConQuotationDetails_Book.ActiveSheet;
        var rowQuotation = GridQuotation.CellSelected.row - 1;
    } catch (ex) { }

    if (idName == 'lugQDVendor') { //quotation details
        GridQuotation.SetText(GRD_QD_VENDORCODE - 1, rowQuotation, getLookupData(idNum, 0));
        GridQuotation.SetText(GRD_QD_VENDORNAME - 1, rowQuotation, getLookupData(idNum, 1));
        GridQuotation.SetText(GRD_QD_VENDORCONTRCTNO - 1, rowQuotation, getLookupData(idNum, 2));
        GridQuotation.SetText(GRD_QD_PAYMENTTERM_CODE - 1, rowQuotation, getLookupData(idNum, 3));
        GridQuotation.SetText(GRD_QD_PAYMENTTERM_DESC - 1, rowQuotation, getLookupData(idNum, 4));
        GridQuotation.SetText(GRD_QD_ISNONVAT - 1, rowQuotation, getLookupData(idNum, 5));
        GridQuotation.SetText(GRD_QD_ISVAT - 1, rowQuotation, getLookupData(idNum, 6));

        if ($('#txtTrantype').val() == "REQCON") {
            GridQuotation.SetText(GRD_QD_VATEX - 1, rowQuotation, getLookupData(idNum, 7));
        }

        GridQuotation.SetBackground(GRD_QD_VENDORNAME - 1, rowQuotation, "gainsboro");
        GridQuotation.SetEnable(GRD_QD_VENDORNAME - 1, rowQuotation, false);

        var isNonvat = getLookupData(idNum, 5) == "1" ? true : false;
        if (isNonvat) {
            var vatex = GridQuotation.GetText(GRD_QD_VATEX - 1, rowQuotation);

            if (parseFloat(RemoveComma(vatex)) > 0.00) {
                GridQuotation.SetText(GRD_QD_VATIN - 1, rowQuotation, vatex);
            }

        }

        if ($('#txtTrantype').val() == "REQCON") {
            computeVatexQoute();
        }

    }
    else if (idName == 'lugQDPayTerm') {
        GridQuotation.SetText(GRD_QD_PAYMENTTERM_CODE - 1, rowQuotation, getLookupData(idNum, 0));
        GridQuotation.SetText(GRD_QD_PAYMENTTERM_DESC - 1, rowQuotation, getLookupData(idNum, 1));
    }
    /////

    ///BUDGET LINE DETAILS
    if (idName == 'lugBdgtChk_ProfitCenter') {
        var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet; 
        var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;  

        var colCode = $('#txtBdgtchk_PC').val();
        var colDesc = Number($('#txtBdgtchk_PC').val()) + 1;

        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG2CODE - 1, rowBgtChkLIN, getLookupData(idNum, 2));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG2DESC - 1, rowBgtChkLIN, getLookupData(idNum, 3));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG3CODE - 1, rowBgtChkLIN, getLookupData(idNum, 4));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG3DESC - 1, rowBgtChkLIN, getLookupData(idNum, 5));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG4CODE - 1, rowBgtChkLIN, getLookupData(idNum, 6));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG4DESC - 1, rowBgtChkLIN, getLookupData(idNum, 7));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG5CODE - 1, rowBgtChkLIN, getLookupData(idNum, 8));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG5DESC - 1, rowBgtChkLIN, getLookupData(idNum, 9));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG6CODE - 1, rowBgtChkLIN, getLookupData(idNum, 10));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG6DESC - 1, rowBgtChkLIN, getLookupData(idNum, 11));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_REM_BDGT_QTY - 1, rowBgtChkLIN, getLookupData(idNum, 12));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_REM_BDGT_AMNT - 1, rowBgtChkLIN, getLookupData(idNum, 13));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG1_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 15));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG1DESC_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 16));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG2_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 17));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG2DESC_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 18));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG3_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 19));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG3DESC_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 20));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG4_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 21));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG4DESC_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 22));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG5_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 23));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG5DESC_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 24));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG6_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 25));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG6DESC_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 26));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ITEMGRPTYPE_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 27));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ITEMGRPTYPEDESC_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 28));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ITEMLEVEL_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 29));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ITEMLEVELDESC_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 30));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ITEMCODE_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 31));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ITEMDESC_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 32));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TAGPC - 1, rowBgtChkLIN, getLookupData(idNum, 33));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TAGCC - 1, rowBgtChkLIN, getLookupData(idNum, 34));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TAGPERQTY - 1, rowBgtChkLIN, getLookupData(idNum, 35));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_CURRENCY_BGT - 1, rowBgtChkLIN, getLookupData(idNum, 36));

        //Check if Required Alloc
        if (getLookupData(idNum, 14) == "1") {
            GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_REQALLOC - 1, rowBgtChkLIN, getLookupData(idNum, 14));
            GridBgtChkLIN.SetEnable(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, rowBgtChkLIN, true);
            GridBgtChkLIN.SetBackground(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, rowBgtChkLIN, '#2689d8');
        }
        else {
            GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_REQALLOC - 1, rowBgtChkLIN, "");
            GridBgtChkLIN.SetEnable(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, rowBgtChkLIN, false);
            GridBgtChkLIN.SetBackground(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, rowBgtChkLIN, 'gainsboro');
        }

        //Numeric fields 
        var unappliedQty = $('#txtUnappliedQty').val();
        var unappliedAmnt = $('#txtUnappliedVatex').val();

        if (parseFloat(RemoveComma(unappliedQty)) <= 0) {
            unappliedQty = "0.00000";
        }

        if (parseFloat(RemoveComma(unappliedAmnt)) <= 0) {
            unappliedAmnt = "0.00";
        }

        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, rowBgtChkLIN, parseFloat(tempAllocQty) > 0.00 ? MoneyFormat(tempAllocQty, 5) : unappliedQty);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, rowBgtChkLIN, parseFloat(tempAllocAmntVatex) > 0.00 ? MoneyFormat(tempAllocAmntVatex, 2) : unappliedAmnt);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, rowBgtChkLIN, parseFloat(tempAllocPercent) > 0.00 ? MoneyFormat(tempAllocPercent, 11) : BudgetPercentage());

        DisplayBdgtCombinationAndChecking(GridBgtChkLIN, rowBgtChkLIN);
        ComputeBdgtPrcnt();
        ComputationForBdgtChckDetails();
    }

    ///ALLOCATION PROCESS
    if (idName == 'lugAllocChk_ProfitCenter' || idName == 'lugAllocChk_CostCenter') { //allocation process
        var GridAllocProcess = nwGridConAllocProcess_Book.ActiveSheet;
        var rowAllocProcess = GridAllocProcess.CellSelected.row - 1;
        var colCode = GridAllocProcess.CellSelected.col - 1;
        var colDesc = GridAllocProcess.CellSelected.col;

        GridAllocProcess.SetText(colCode - 1, rowAllocProcess, getLookupData(idNum, 0));
        GridAllocProcess.SetText(colDesc - 1, rowAllocProcess, getLookupData(idNum, 1));

        if (colCode != GRD_AP_SEG2CODE - 1) {
            

            if (GridAllocProcess.GetText(GRD_AP_SEG2CODE - 1, rowAllocProcess) == "") {
                GridAllocProcess.SetText(GRD_AP_SEG2CODE - 1, rowAllocProcess, GRD_SEG2CODE);
                GridAllocProcess.SetText(GRD_AP_SEG2DESC - 1, rowAllocProcess, GRD_SEG2DESC);
            }
        }

        if (colCode != GRD_AP_SEG3CODE) {
            
            if (GridAllocProcess.GetText(GRD_AP_SEG3CODE - 1, rowAllocProcess) == "") {
                GridAllocProcess.SetText(GRD_AP_SEG3CODE - 1, rowAllocProcess, GRD_SEG3CODE);
                GridAllocProcess.SetText(GRD_AP_SEG3DESC - 1, rowAllocProcess, GRD_SEG3DESC);
            }
        }

        if (colCode != GRD_AP_SEG4CODE) {
            if (GridAllocProcess.GetText(GRD_AP_SEG4CODE - 1, rowAllocProcess) == "") {
                GridAllocProcess.SetText(GRD_AP_SEG4CODE - 1, rowAllocProcess, GRD_SEG4CODE);
                GridAllocProcess.SetText(GRD_AP_SEG4DESC - 1, rowAllocProcess, GRD_SEG4DESC);
            }
        }

        if (colCode != GRD_AP_SEG5CODE) {
            if (GridAllocProcess.GetText(GRD_AP_SEG5CODE - 1, rowAllocProcess) == "") {
                GridAllocProcess.SetText(GRD_AP_SEG5CODE - 1, rowAllocProcess, GRD_SEG5CODE);
                GridAllocProcess.SetText(GRD_AP_SEG5DESC - 1, rowAllocProcess, GRD_SEG5DESC);
            }
        }

        //Numeric fields 
        GridAllocProcess.SetText(GRD_AP_QTY - 1, rowAllocProcess, '0.00000');
        GridAllocProcess.SetText(GRD_AP_AMNT_VATEX - 1, rowAllocProcess, '0.00');
        GridAllocProcess.SetText(GRD_AP_PERCENTAGE - 1, rowAllocProcess, AllocPercentage());

        //Numeric fields 
        var unappliedQty = $('#txtAllocUnappliedQty').val();
        var unappliedAmnt = $('#txtAllocUnappliedVatex').val();

        if (parseFloat(RemoveComma(unappliedQty)) <= 0) {
            unappliedQty = "0.00000";
        }

        if (parseFloat(RemoveComma(unappliedAmnt)) <= 0) {
            unappliedAmnt = "0.00";
        }

        GridAllocProcess.SetText(GRD_AP_QTY - 1, rowAllocProcess, parseFloat(tempAllocQty) > 0 ? MoneyFormat(tempAllocQty, 5) : unappliedQty);
        GridAllocProcess.SetText(GRD_AP_AMNT_VATEX - 1, rowAllocProcess, parseFloat(tempAllocAmntVatex) > 0 ? MoneyFormat(tempAllocAmntVatex, 2) : unappliedAmnt);
        GridAllocProcess.SetText(GRD_AP_PERCENTAGE - 1, rowAllocProcess, parseFloat(tempAllocPercent) > 0 ? MoneyFormat(tempAllocPercent, 11) : AllocPercentage());

        //Fill Budget Allocation
        ComputationForBdgtChckAllocDetails();
        ComputeBdgtAllocPrcnt();
    }
    
}


function DisplayBdgtCombinationAndChecking(grid, row) {
    //lookup done, LoadedIfReplenishment, FillInitialConsumptionBdgtChk
    //FOR BUDGET ACCOUNT COMBINATION
    var seg1 = $(`#idvallugBdgtChk_GLAccntChrge`).val();
    var seg1Desc = $(`#descvallugBdgtChk_GLAccntChrge`).val();
    var seg2 = grid.GetText(BdgtLIN.GRD_BCL_SEG2CODE, row);
    var seg2Desc = grid.GetText(BdgtLIN.GRD_BCL_SEG2DESC, row);
    var seg3 = grid.GetText(BdgtLIN.GRD_BCL_SEG3CODE, row);
    var seg3Desc = grid.GetText(BdgtLIN.GRD_BCL_SEG3DESC, row);
    var seg4 = grid.GetText(BdgtLIN.GRD_BCL_SEG4CODE, row);
    var seg4Desc = grid.GetText(BdgtLIN.GRD_BCL_SEG4DESC, row);
    var seg5 = grid.GetText(BdgtLIN.GRD_BCL_SEG5CODE, row);
    var seg5Desc = grid.GetText(BdgtLIN.GRD_BCL_SEG5DESC, row);
    var seg6 = grid.GetText(BdgtLIN.GRD_BCL_SEG6CODE, row);
    var seg6Desc = grid.GetText(BdgtLIN.GRD_BCL_SEG6DESC, row);
    var item = $(`#idvallugBdgtChk_Item`).val();
    var itemDesc = $(`#descvallugBdgtChk_Item`).val();
    var itemGrpType = $(`#idvallugBdgtChk_ItemGrpType`).val();
    var itemGrpTypeDesc = $(`#descvallugBdgtChk_ItemGrpType`).val();

    DisplayBdgtAccountCombination(seg1, seg1Desc, seg2, seg2Desc, seg3, seg3Desc, seg4, seg4Desc, seg5, seg5Desc, seg6, seg6Desc, itemGrpType, itemGrpTypeDesc, item, itemDesc);

    ////FOR BUDGET CHECKING DETAILS
    var seg1_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG1_BGT, row);
    var seg1Desc_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG1DESC_BGT, row);
    var seg2_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG2_BGT, row);
    var seg2Desc_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG2DESC_BGT, row);
    var seg3_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG3_BGT, row);
    var seg3Desc_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG3DESC_BGT, row);
    var seg4_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG4_BGT, row);
    var seg4Desc_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG4DESC_BGT, row);
    var seg5_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG5_BGT, row);
    var seg5Desc_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG5DESC_BGT, row);
    var seg6_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG6_BGT, row);
    var seg6Desc_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG6DESC_BGT, row);
    var itemGrpType_bgt = grid.GetText(BdgtLIN.GRD_BCL_ITEMGRPTYPE_BGT, row);
    var itemGrpTypeDesc_bgt = grid.GetText(BdgtLIN.GRD_BCL_ITEMGRPTYPEDESC_BGT, row);
    var itemLvl_bgt = grid.GetText(BdgtLIN.GRD_BCL_ITEMLEVEL_BGT, row);
    var itemLvlDesc_bgt = grid.GetText(BdgtLIN.GRD_BCL_ITEMLEVELDESC_BGT, row);
    var itemCode_bgt = grid.GetText(BdgtLIN.GRD_BCL_ITEMCODE_BGT, row);
    var itemDesc_bgt = grid.GetText(BdgtLIN.GRD_BCL_ITEMDESC_BGT, row);
    var remQty = grid.GetText(BdgtLIN.GRD_BCL_REM_BDGT_QTY, row);
    var remAmnt = grid.GetText(BdgtLIN.GRD_BCL_REM_BDGT_AMNT, row);
    var currency = grid.GetText(BdgtLIN.GRD_BCL_CURRENCY_BGT, row);

    DisplayBdgtCheckingDtls(seg1_bgt, seg1Desc_bgt, seg2_bgt, seg2Desc_bgt, seg3_bgt, seg3Desc_bgt, seg4_bgt, seg4Desc_bgt, seg5_bgt, seg5Desc_bgt, seg6_bgt, seg6Desc_bgt, itemGrpType_bgt, itemGrpTypeDesc_bgt, itemLvl_bgt, itemLvlDesc_bgt, itemCode_bgt, itemDesc_bgt, remQty, remAmnt, currency);
}

function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + (index) + ") span").text();
    return data;
}

function setGridData(nwGrid, type, col, row, val) {
        nwGrid.GetText(col , row, val);
}

function getGridData(nwGrid, type, col, row) {
    var data = '';
    var data = nwGrid.GetText(col , row, val);
    return data;
}


function func_WindowCloseTrigger(verID) {
    let isContinue = true;
    cust_GetPara();

    if (verID == 'nwUploadCon') {

        var txtloadPath = $("#aagHRec .aagFiledir").text();
        nwParameter_Add("txtloadPath", txtloadPath);

        if (upload_type == "uploadCharge") {
            nwLoading_Start("xactUploadChargeDetails", crLoadingHTML);

            nwParameter_Add("idvallugBdgtChk_GLAccntChrge", $(`#idvallugBdgtChk_GLAccntChrge`).val());
            nwParameter_Add("idvallugLocForm", $(`#idvallugLocForm`).val());
            nwParameter_Add("idvallugCostCenter", $(`#idvallugCostCenter`).val());
            nwParameter_Add("descvallugCostCenter", $(`#descvallugCostCenter`).val());
            nwParameter_Add("idvallugCurrency", $(`#idvallugCurrency`).val());
            nwParameter_Add("txtBCLLineID", $(`#txtBCLLineID`).val());
            nwParameter_Add("txtDocno", $('#txtDocno').val());
            nwParameter_Add("txtBCLItemCode", $(`#txtBCLItemCode`).val());
            nwParameter_Add("idvallugBdgtChk_ItemGrpType", $(`#idvallugBdgtChk_ItemGrpType`).val());
            nwParameter_Add("txtBdgtchk_RowNum", $('#txtBdgtchk_RowNum').val());
            nwParameter_Add("isChargingDetails", upload_type == "uploadCharge" ? true : false);
            nwParameter_Add("txtTotalQty", RemoveComma($(`#txtTotalQty`).val()));
            nwParameter_Add("txtTotalAmntVatex", RemoveComma($(`#txtTotalAmntVatex`).val()));

            func_ActionDriven("actUploadChargeDetails", false);
        }

        else if (upload_type == "uploadAllocation") {
            nwLoading_Start("xactUploadAllocDetails", crLoadingHTML);
            nwParameter_Add("txtAllocRowNum", $('#txtAllocRowNum').val());
            nwParameter_Add("txtAllocTotalQty", RemoveComma($(`#txtAllocTotalQty`).val()));
            nwParameter_Add("txtAllocTotalAmntVatex", RemoveComma($(`#txtAllocTotalAmntVatex`).val()));
            nwParameter_Add("txtBdgtSegCode", $(`#txtBdgtSegCode`).val());
            nwParameter_Add("tagSeg3", $(`#txtAllocTagSeg3`).val());
            nwParameter_Add("tagSeg4", $(`#txtAllocTagSeg4`).val());
            nwParameter_Add("txtDocno", $('#txtDocno').val());
            nwParameter_Add("txtBCLLineID", $('#txtBCLLineID').val());
            nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
            nwParameter_Add("idvallugCostCenter", $('#idvallugCostCenter').val());
            nwParameter_Add("isChargingDetails", upload_type == "uploadCharge" ? true : false);
            nwParameter_Add("txtAllocTotalQty", RemoveComma($(`#txtAllocTotalQty`).val()));
            nwParameter_Add("txtAllocAppliedVatex", RemoveComma($(`#txtAllocAppliedVatex`).val()));

            func_ActionDriven("actUploadAllocDetails", false);
        }
    }

    else if (verID == 'nwReqComplianceWindow') {
        $('.cbtnCreateDocDtl').hide();
    }

    //REQUIREMENT COMPLIANCE
    else if (verID == 'nwPopUpRequireCompliance') {

        nwParameter_Add("txtDocno", $('#txtDocno').val());
        nwParameter_Add("isHeader", true);
        func_ActionDriven("actchkIfhasReqComp", false);
    }

    //REQUIREMENT COMPLIANCE LIN
    else if (verID == 'nwPopUpRequireComplianceLIN') {
        if ($('#txtTrantype').val() == "REQCON") {
            var Grid = nwGridCon_Book.ActiveSheet;
            var row = Grid.CellSelected.row - 1;

            nwParameter_Add("lineID", Grid.GetText(Main.GRD_LINEID - 1, row));
            nwParameter_Add("rowNum", Grid.GetText(Main.GRD_LINEID - 1, row));
            nwParameter_Add("txtDocno", $('#txtDocno').val());
            nwParameter_Add("isHeader", false);
            nwParameter_Add("curIdx", row);
            func_ActionDriven("actchkIfhasReqComp", false);
        }
        else if ($('#txtTrantype').val() == "REQNON") {
            var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
            var row = Grid.CellSelected.row - 1;

            nwParameter_Add("lineID", Grid.GetText(SPR_LINEID - 1, row));
            nwParameter_Add("rowNum", Grid.GetText(SPR_LINEID - 1, row));
            nwParameter_Add("txtDocno", $('#txtDocno').val());
            nwParameter_Add("isHeader", false);
            nwParameter_Add("curIdx", row);
            func_ActionDriven("actchkIfhasReqComp", false);
        }
    }

    else if (verID == 'nwBudgetCtrlDetails') {
        nwParameter_Add("txtBdgtCtrlReqDocno", $('#txtBdgtCtrlReqDocno').val());
        nwParameter_Add("txtDocno", $('#txtDocno').val());

        func_ActionDriven("actDisplayGeneratedDocno", false);
    }

    else if (verID == "nwPopUpRealignment" || window == "nwPopUpSupplemental") {
        RefreshLineDetails();
    }


    return isContinue;
}

function getNum(xval) {
    if (xval == undefined) {
        return 0;
    }
    if (xval == "" || xval.length <= 0) {
        return 0
    }
    return xval;
}

function getNumReplace(val) {
    val = getNum(parseFloat(val.toString().replace(/,/g, "")))
    return val;
}

function getNetOfDiscount(vatex, discountVatex) {
    return (vatex - discountVatex).toFixed(5);
}

function getOCYAmount(qty, UnitCost) {
    return (qty * UnitCost).toFixed(2);
}


function isWithSavedDetails() {

    var isWithData = false;
    var isBdgtChk = false;
    var isDelivery = false;
    var isQuotation = false;

    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for(i = 0; i< maxRow; i++) {

        isBdgtChk = Grid.GetText(Main.GRD_HASBDGTCHK - 1, i) == "1" ? true : false;
        isDelivery = Grid.GetText(Main.GRD_HASDELDTLS - 1, i) == "1" ? true : false;
        isQuotation = Grid.GetText(Main.GRD_HASQUOLDTLS - 1, i) == "1" ? true : false;

        if (isBdgtChk || isDelivery || isQuotation) {
            isWithData = true;
        }

    }

    return isWithData;

}

function isWithDataForCurrency() {
    var isWithData = false;
    var isBdgtChk = false;
    var isQuotation = false;

    var Grid = nwGridCon_Book.ActiveSheet;
    var cnt = Grid.GetMaxRow();

    for (i = 0; i <= cnt; i++) {

        isBdgtChk = Grid.GetText(Main.GRD_HASBDGTCHK - 1, row) == "1" ? true : false;
        isQuotation = Grid.GetText(Main.GRD_HASQUOLDTLS - 1, row) == "1" ? true : false;

        if (isBdgtChk || isQuotation) {
            isWithData = true;
        }
    }

    return isWithData;
}



function getVAT() {
    var totalVAT = 0, ocy = 0, taxrate = 0;
    var cnt = nwLib.nwTempTable_Row_Count("nwGridCon");

    for (var row = 0; row <= cnt; row++) {
        if (getGridData('nwGridCon', '', GRD_ITEMGROUPTYPE_CODE, row) != '') {

            ocy = parseFloat($(`#nwGridCon-nwData tr:eq(${row})`).find(`td:eq(${GRD_OCY_AMOUNT})`).text().replace(/,/g, "")) || 0;
            //taxrate = parseFloat($(`#nwGridCon-nwData tr:eq(${row})`).find(`td:eq(${GRD_TAXRATE})`).text().replace(/,/g, "")) || 0;
            totalVAT += (ocy * taxrate / 100);

        }
    }
    return totalVAT.toFixed(5);
}


var attachclick = '';
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
        //upload();

        setTimeout(function () {
            $("#btnupload").click();
        }, 100);
    }
}


function upload() {
    //var searchParams = new URLSearchParams(window.location.search)
    //searchParams.set("txtMilestoneCode", $('#txtMilestoneCode').val());
    //var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
    //history.pushState(null, '', newRelativePathQuery);

    if ($("input[type = 'file']").val() == "") {
        $("#status").html("<span class=\"nwCuz002\">Please select file to upload!</span>");
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
    } else {
        (function () {
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');

            try {
                //

                var UploadFileName = '';
                var currentdate = new Date();
                var datetime = ''


                var d = new Date($.now());
                datetime = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + "_" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

                UploadFileName = $('#txtDocno').val() + '_' + datetime.replace(/-|:| /g, '');
                var mydata = { "UploadFileName": UploadFileName };
                $('form').ajaxForm(
                    {
                        data: mydata,
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
                            $("#status").text('Uploading...');
                        },

                        success: function () {
                            var percentVal = '100%';
                            bar.width(percentVal)
                            percent.html(percentVal);
                        },

                        complete: function (xhr) {
                            $('#status').html(xhr.responseText);
                            setTimeout(function () {
                                nwPopupForm_HideModal('nwUploadCon');
                            }, 500);

                        }
                    });
            } catch (err) {
                alert(err);
            }
        })();
    }
}

var globalUOM = '';


function setGridDocumentDetails() {
    var cnt = nwLib.nwTempTable_Row_Count("nwGridAttach");
    for (var iRow = 0; iRow <= cnt; iRow++) {
        if (getGridData('nwGridAttach', '', GRD_ATTACH_DOC_DOCU_CODE, iRow) == '') {
            setGridData('nwGridAttach', '', GRD_ATTACH_DOC_DOCU_CODE, iRow, $('#txtDocumentDetailCode').val());
            setGridData('nwGridAttach', '', GRD_ATTACH_DOCU_DTL_DESC, iRow, $('#txtDocumentDetailDesc').val());
            iRow = cnt;
        }
    }

}

function isPercentage(value, decimal) {
    if (value == '') return;
    var val = '';

    var getBasePrice = 0.00;
    getBasePrice = parseFloat(value).toFixed(decimal) || 0;

    if (getBasePrice > 100) {
        val = '';
    }
    else {
        val = getBasePrice.toString() + '%'
    }
    return val;

}


function setDelQuoProperties(row) {
    var Grid = nwGridCon_Book.ActiveSheet;

    Grid.SetBackground(Main.GRD_QUOTATION - 1, row, "green");
    Grid.SetText(Main.GRD_HASQUOLDTLS - 1, row, "1");
}

function setDelQuoPropertiesNon(row) {

    //NON CATALOGUE
    var GridNon = nwGridConNonCatalogue_Book.ActiveSheet;

    GridNon.SetBackground(SPR_QUOTATION - 1, row, "green");
    GridNon.SetText(SPR_HASQUOLDTLS - 1, row, "1");

    GridNon.SetEnable(SPR_UNITCOSTVATEX - 1, row, false);
    GridNon.SetEnable(SPR_UNITCOSTVATIN - 1, row, false);
    GridNon.SetBackground(SPR_UNITCOSTVATEX - 1, row, 'gainsboro');
    GridNon.SetBackground(SPR_UNITCOSTVATIN - 1, row, 'gainsboro');
}

function actTempSaveQuoDtls(row) {

    //NON CATALOGUE
    var GridNon = nwGridConNonCatalogue_Book.ActiveSheet;

    GridNon.SetBackground(SPR_QUOTATION - 1, row, "green");
    GridNon.SetText(SPR_HASQUOLDTLS - 1, row, "1");

    GridNon.SetEnable(SPR_UNITCOSTVATEX - 1, row, false);
    GridNon.SetEnable(SPR_UNITCOSTVATIN - 1, row, false);
    GridNon.SetBackground(SPR_UNITCOSTVATEX - 1, row, 'gainsboro');
    GridNon.SetBackground(SPR_UNITCOSTVATIN - 1, row, 'gainsboro');
}


function DefaultPrefVendor(itemCode, UOM, row) {

    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    Grid.GetText(Main.GRD_REQ_QTY - 1, row)
    var reqQty = Grid.GetText(Main.GRD_REQ_QTY - 1, row);
    reqQty = reqQty == "" ? "0.00" : reqQty.replace(/,/g, '');

    var filter = jsonQuoDtls.find(i => (i.itemCode + i.UOM) == itemCode + UOM && i.isPrefVendor == "true");

    Grid.SetEnable(Main.GRD_NONVAT - 1, row, true);
    Grid.SetText(Main.GRD_NONVAT - 1, row, "");

    if (filter != undefined) { //Default Unit Cost if has Preferred Vendor
        Grid.SetText(Main.GRD_UNITCOSTVATEX - 1, row, MoneyFormat(RemoveComma(filter.vatex), 5));
        Grid.SetText(Main.GRD_UNITCOSTVATIN - 1, row, MoneyFormat(RemoveComma(filter.vatin), 5));
        Grid.SetText(Main.GRD_TOTAL_AMNT_VATIN - 1, row, ComputeTotalAmntVATINPerRow(reqQty, RemoveComma(filter.vatin)));
        Grid.SetText(Main.GRD_TOTAL_AMNT_VATEX - 1, row, ComputeTotalAmntVATINPerRow(reqQty, RemoveComma(filter.vatex)));

        Grid.SetEnable(Main.GRD_UNITCOSTVATEX - 1, row, parseFloat(RemoveComma(filter.vatex)) == 0.00 ? true : false);
        Grid.SetEnable(Main.GRD_UNITCOSTVATIN - 1, row, parseFloat(RemoveComma(filter.vatex)) == 0.00 ? true : false);
        Grid.SetText(Main.GRD_DISABLEDUNITCOST - 1, row, RemoveComma(filter.vatex) != 0.00 ? "1" : "");
    }
    else { //Get The Lowest Unit Cost
        filter = jsonQuoDtls.filter(i => (i.itemCode + i.UOM) == itemCode + UOM);
        var lowestVatex = 0.00;
        var lowestVatin = 0.00;

        for (var i = 0; i < filter.length; i++) {

            if (lowestVatex == 0.00) {
                lowestVatex = RemoveComma(filter[i].vatex);
                lowestVatin = RemoveComma(filter[i].vatin);
            }

            if (parseFloat(lowestVatex) > parseFloat(RemoveComma(filter[i].vatex))) {
                lowestVatex = RemoveComma(filter[i].vatex);
                lowestVatin = RemoveComma(filter[i].vatin);
            }
        }

        Grid.SetText(Main.GRD_UNITCOSTVATEX - 1, row, MoneyFormat(lowestVatex, 5));
        Grid.SetText(Main.GRD_UNITCOSTVATIN - 1, row, MoneyFormat(lowestVatin, 5));
        Grid.SetText(Main.GRD_TOTAL_AMNT_VATIN - 1, row, ComputeTotalAmntVATINPerRow(reqQty, lowestVatin));
        Grid.SetText(Main.GRD_TOTAL_AMNT_VATEX - 1, row, ComputeTotalAmntVATINPerRow(reqQty, lowestVatex));
        Grid.SetText(Main.GRD_BDGT_QTY - 1, row, MoneyFormat(jsonItemCodeRemaining[0].remainingQty, 2));
        Grid.SetText(Main.GRD_BDGT_AMNT - 1, row, MoneyFormat(jsonItemCodeRemaining[0].remainingBudget, 2));

        Grid.SetEnable(Main.GRD_UNITCOSTVATEX - 1, row, lowestVatex == 0 ? true : false);
        Grid.SetEnable(Main.GRD_UNITCOSTVATIN - 1, row, lowestVatex == 0 ? true : false);
        Grid.SetText(Main.GRD_DISABLEDUNITCOST - 1, row, lowestVatex != 0.00 ? "1" : "");

    }

    var vatRate = $('#txtVatRate').val() == "" ? "0.00" : $('#txtVatRate').val();

    ComputeIfNonVat(row, vatRate);
    ComputeTotalReqVatin();
}

function DefaultPrefVendorNon(itemCode, UOM, row) {
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    Grid.GetText(SPR_REQ_QTY - 1, row)
    var reqQty = Grid.GetText(SPR_REQ_QTY - 1, row);
    reqQty = reqQty == "" ? "0.00" : reqQty.replace(/,/g, '');

    var filter = jsonQuoDtls.find(i => (i.itemCode + i.UOM) == itemCode + UOM && i.isPrefVendor == "true");

    if (filter != undefined) { //Default Unit Cost if has Preferred Vendor
        Grid.SetText(SPR_UNITCOSTVATEX - 1, row, MoneyFormat(RemoveComma(filter.vatex), 5));
        Grid.SetText(SPR_UNITCOSTVATIN - 1, row, MoneyFormat(RemoveComma(filter.vatin), 5));
        Grid.SetText(SPR_TOTAL_AMNT_VATIN - 1, row, ComputeTotalAmntVATINPerRow(reqQty, RemoveComma(filter.vatin)));
        Grid.SetText(SPR_TOTAL_AMNT_VATEX - 1, row, ComputeTotalAmntVATINPerRow(reqQty, RemoveComma(filter.vatex)));

        var isNonVat = filter.isNonVat == "1" ? true : false;
        var isVat = filter.isVat == "1" ? true : false;
    }
    else { //Get The Lowest Unit Cost
        filter = jsonQuoDtls.filter(i => (i.itemCode + i.UOM) == itemCode + UOM);
        var lowestVatex = 0.00;
        var lowestVatin = 0.00;
        var isNonVat = false;
        var isVat = false;

        for (var i = 0; i < filter.length; i++) {

            if (lowestVatex == 0.00) {
                lowestVatex = RemoveComma(filter[i].vatex);
                lowestVatin = RemoveComma(filter[i].vatin);
            }

            if (parseFloat(lowestVatex) > parseFloat(RemoveComma(filter[i].vatex))) {
                lowestVatex = RemoveComma(filter[i].vatex);
                lowestVatin = RemoveComma(filter[i].vatin);
            }
        }

        Grid.SetText(SPR_UNITCOSTVATEX - 1, row, MoneyFormat(lowestVatex, 5));
        Grid.SetText(SPR_UNITCOSTVATIN - 1, row, MoneyFormat(lowestVatin, 5));
        Grid.SetText(SPR_TOTAL_AMNT_VATIN - 1, row, ComputeTotalAmntVATINPerRow(reqQty, lowestVatin));
        Grid.SetText(SPR_TOTAL_AMNT_VATEX - 1, row, ComputeTotalAmntVATINPerRow(reqQty, lowestVatex));
    }

    var vatRate = $('#txtVatRate').val() == "" ? "0.00" :  $('#txtVatRate').val();

    ComputeIfNonVatNonC(row, vatRate);
    ComputeTotalReqVatinNon();
}


function ResetFieldsIfEmptyQuotation(row) {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var vatex = RemoveComma(Grid.GetText(Main.GRD_LASTPOPRICEVATEX - 1, row));
    var vatin = RemoveComma(Grid.GetText(Main.GRD_LASTPOPRICEVATIN - 1, row));
    var reqQty = RemoveComma(Grid.GetText(Main.GRD_REQ_QTY - 1, row));

    Grid.SetText(Main.GRD_UNITCOSTVATEX - 1, row, MoneyFormat(vatex, 5));
    Grid.SetText(Main.GRD_UNITCOSTVATIN - 1, row, MoneyFormat(vatin, 5));
    Grid.SetText(Main.GRD_TOTAL_AMNT_VATIN - 1, row, ComputeTotalAmntVATINPerRow(reqQty, vatin));
    Grid.SetText(Main.GRD_TOTAL_AMNT_VATEX - 1, row, ComputeTotalAmntVATINPerRow(reqQty, vatex));

    Grid.SetEnable(Main.GRD_NONVAT - 1, row, true);
    $(`#nwGrid-nwData tr:eq(${row}) td:eq(${Main.GRD_NONVAT}) input`).prop("checked", false);

    Grid.SetEnable(Main.GRD_UNITCOSTVATEX - 1, row, true);
    Grid.SetEnable(Main.GRD_UNITCOSTVATIN - 1, row, true);
    Grid.SetText(Main.GRD_DISABLEDUNITCOST - 1, row, "");

    var isChecked = $(`#nwGrid-nwData tr:eq(${row}) td:eq(${Main.GRD_NONVAT}) input`).is(':checked');
    var vatRate = $('#txtVatRate').val() == "" ? "0.00" : isChecked == true ? "0.00" : $('#txtVatRate').val();

    ComputeIfNonVat(row, vatRate);
    ComputeTotalReqVatin();
}

function setBdgtChkProperties(row, makeItRed) {
    var trantype = $('#txtTrantype').val();

    if (trantype == "REQCON") {
        var Grid = nwGridCon_Book.ActiveSheet;

        if (!makeItRed) {
            Grid.SetBackground(Main.GRD_BDGT_CHK_DTLS - 1, row, "green");
        }
        else {
            Grid.SetBackground(Main.GRD_BDGT_CHK_DTLS - 1, row, "red");

        }

        Grid.SetText(Main.GRD_HASBDGTCHK - 1, row, "1");


        if (makeItRed) {
            Grid.SetText(Main.GRD_PENDINGBDGTCHK - 1, row, "1");
        }
    }
    else {
        var Grid = nwGridConNonCatalogue_Book.ActiveSheet;

        if (!makeItRed) {
            Grid.SetBackground(SPR_BDGT_CHK_DTLS - 1, row, "green");
        }
        else {
            Grid.SetBackground(SPR_BDGT_CHK_DTLS - 1, row, "red");

        }

        Grid.SetText(SPR_HASBDGTCHK - 1, row, "1");
    }

}

function setDelDtlProperties(row, makeItRed) {

var Grid = nwGridCon_Book.ActiveSheet;

if(!makeItRed){
    Grid.SetBackground(Main.GRD_DEL_DTLS - 1, row, "green");
}
else{
    Grid.SetBackground(Main.GRD_DEL_DTLS - 1, row, "red");
    
}

Grid.SetText(Main.GRD_CUR_REQQTY - 1, row, Grid.GetText(Main.GRD_REQ_QTY - 1, row));
Grid.SetText(Main.GRD_HASDELDTLS - 1, row, "1");


    if (makeItRed) {
        Grid.SetText(Main.GRD_PENDINGDLVYDTLS - 1, row, "1");
    }

}

function AddDaysToDate(sDate, iAddDays, sSeperator) {
    //Purpose: Add the specified number of dates to a given date.
    var date = new Date(sDate);
    date.setDate(date.getDate() + parseInt(iAddDays));
    var sEndDate = LPad(date.getMonth() + 1, 2) + sSeperator + LPad(date.getDate(), 2) + sSeperator + date.getFullYear();
    return sEndDate;
}
function LPad(sValue, iPadBy) {
    sValue = sValue.toString();
    return sValue.length < iPadBy ? LPad("0" + sValue, iPadBy) : sValue;
}


function func_nwGrid_DeleteValidation() {
    var id = crnwTableCon.attr('id');
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    if (id == 'nwGridCon') {
        var ItemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row);
        var UOM = Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row);

        jsonDelDtls = FilterJsonDelDtls(ItemCode, UOM); //Delete all temporary data 
        jsonQuoDtls = FilterJsonQuoDtls(ItemCode, UOM); //Delete all temporary data 
        jsonBdgtChk = FilterJsonBdgtChkDtls(ItemCode, UOM); //Delete all temporary data 
        jsonViewConsoDetails = FilterjsonViewConsoDetails(ItemCode, UOM); //Delete all temporary data 
    }

    else if (id == 'nwGridAttach') {

        var isRequired = (getGridData('nwGridAttach', '', GRD_ATTACH_REQUIRED, crnwTR.index()) == "1")
        if (isRequired) {
            MessageBox("Cannot Continue. Cannot Delete required Document.", MenuItemTitle, 'error');
            return false;
        }
    }

    return true;
}

function func_nwGrid_DeleteDone() {
    var id = crnwTableCon.attr('id');

    if (id == "nwGrid") {
        ComputeTotalReqVatin(); //Compute Total Request Amount(Vatin) in Header
    }

    if (id == 'nwGridConDeliveryID') {
        getTotalAllocQty();
    }

    if (id == 'nwGridConBgtChkLIN') {
        ClearBudgetCombinatioAndChecking();
        ComputationForBdgtChckDetails();
        ComputeBdgtPrcnt();
    }


    if (id == 'nwGridConAllocProcess') {
        ComputationForBdgtChckAllocDetails();
        ComputeBdgtAllocPrcnt();
    }
}



$(document).on("click", "#btnfromQuotationHist", function () {
    jsonStoreData = [];
    p8Spread_CurBook = "nwGridConQuotationDetails";
    nwParameter_Add("idvallugItemCode", $('#idvallugQuotItem').val());
    lookUpCustomize("lugLoadQuotHist", 2, undefined, true);


    return false;
});



function DisabledViewPendingPO() {
    var forPR = 0.00;
    var Grid = nwGridConSOH_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for (var i = 0; i <= maxRow; i++)  {
        forPR = Grid.GetText(GRD_SOH_FORPR - 1, i) == "" ? 0.00 : Grid.GetText(GRD_SOH_FORPR - 1, i);


        if (parseFloat(forPR) > 0.00) {
            Grid.SetEnable(GRD_SOH_VWPENDINGPO - 1, i, true);
            Grid.SetBackground(GRD_SOH_VWPENDINGPO - 1, i, '#2689d8');
        }
        else {
            Grid.SetEnable(GRD_SOH_VWPENDINGPO - 1, i, false);
            Grid.SetBackground(GRD_SOH_VWPENDINGPO - 1, i, 'gainsboro');
        }
    }
}


$(document).on("click", "#btnDDSave", function () {

    msgBoxContainerQuestion = "isProcessDeliveryDetails";
    parent_MessageBoxQuestion("Do you want to save the record?", "Delivery Details Window", "Question");

    return false;
});

$(document).on("click", "#btnSaveQuotation", function () {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var msg;
    var hasSavedBdgtDtls = Grid.GetText(Main.GRD_HASBDGTCHK - 1, $('#txtQuotRownum').val()) == "1" ? true : false;

    if (hasSavedBdgtDtls)
        msg = "Saving of Quotation Details will reset saved Charging Details. Do you want to proceed?";
    else
        msg = "Do you want to save the record?", "Quotation Details Window";


    msgBoxContainerQuestion = "isProcessQuotationDetails";

    parent_MessageBoxQuestion(msg, "Quotation Details Window", "Question");

    return false;
});



/******** CHANGE EVENTS ********/
$(document).on("change blur", "#txtToDate, #txtFromDate", function () {

    var from = new Date($("#txtFromDate").val())
    var to = new Date($("#txtToDate").val())

    if (to < from) {
        MessageBox("Cannot continue. To Date should be later than or equal to From Date.", MenuItemTitle, 'error');

        var date = new Date(serverDate.getTime());
        var curdate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
        $("#txtToDate").val(curdate);
    }
});

$(document).on('change', '.ReqQty', function () {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var currentRow = row;
    var hasBdgtChk = Grid.GetText(Main.GRD_HASBDGTCHK - 1, row);
    var hasDelDtls = Grid.GetText(Main.GRD_HASDELDTLS - 1, row);
    let itemDecimalPlaces = Grid.GetText(Main.GRD_DECIMALPLACE - 1, row);
    if (itemDecimalPlaces == undefined || itemDecimalPlaces == "") {
        itemDecimalPlaces = 0;
    }

    Grid.GetText(Main.GRD_REQ_QTY - 1, row)


    var number = RemoveComma(Grid.GetText(Main.GRD_REQ_QTY - 1, row));
    Grid.SetText(Main.GRD_REQ_QTY - 1, MoneyFormat(number, itemDecimalPlaces));

    var vatin = Grid.GetText(Main.GRD_UNITCOSTVATIN - 1, row);
    vatin = vatin == "" ? "0.00" : vatin;

    var vatex = Grid.GetText(Main.GRD_UNITCOSTVATEX - 1, row);
    vatex = vatex == "" ? "0.00" : vatex;

    number = RemoveComma(number);
    vatin = RemoveComma(vatin);
    vatex = RemoveComma(vatex);

    if (!isNaN(number)) {
        Grid.SetText(Main.GRD_REQ_QTY - 1, row, MoneyFormat(number, itemDecimalPlaces))
        Grid.SetText(Main.GRD_TOTAL_AMNT_VATIN - 1, row, ComputeTotalAmntVATINPerRow(number, vatin)); //compute Total Amount(VATIN)
        Grid.SetText(Main.GRD_TOTAL_AMNT_VATEX - 1, row, ComputeTotalAmntVATINPerRow(number, vatex));  //compute Total Amount(VATEX)
    }

    ComputeTotalReqVatin();

    //for pending Charging Details
    if (hasBdgtChk != "" && $(`#txtTrantype`).val().toUpperCase() == "REQCON") {
        setBdgtChkProperties(currentRow, true);
    }

    //for pending Delivery
    if (hasDelDtls != "") {
        setDelDtlProperties(currentRow, true);
    }

    if(getProfitCenter() == ""){
        let itemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row);
        let UOM = Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row);
        let glCode = Grid.GetText(Main.GRD_GLACCNTCHARGING - 1, row);

        if (jsonBdgtChk.filter(e => (e["itemCode"] + e["UOM"] + e["seg1Bdgt"]) == (itemCode + UOM + glCode)).length > 0) {
            jsonBdgtChk.filter(e => (e["itemCode"] + e["UOM"] + e["seg1Bdgt"]) == (itemCode + UOM + glCode))[0]["qty"] = number;
        }
        if (jsonBdgtChk.filter(e => (e["itemCode"] + e["UOM"] + e["seg1Bdgt"]) == (itemCode + UOM + glCode)).length > 0) {
            jsonBdgtChk.filter(e => (e["itemCode"] + e["UOM"] + e["seg1Bdgt"]) == (itemCode + UOM + glCode))[0]["rownum"] = row;
        }
       
    }

});


function UnitCostVatex() {
        var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
        var row = Grid.CellSelected.row - 1;
        var currentRow = row;
        var hasWac = false;
        var wacVatex = 0;
        var hasBdgtChk = Grid.GetText(SPR_HASBDGTCHK - 1, row);

        var number = RemoveComma(Grid.GetText(SPR_UNITCOSTVATEX - 1, row));
        if (!isNaN(number)) {
            Grid.SetText(SPR_UNITCOSTVATEX - 1, row, MoneyFormat(number, 5));
        }

        var vatRate = $('#txtVatRate').val() == "" ? "0.00" : $('#txtVatRate').val();

        var reqQty = Grid.GetText(SPR_REQ_QTY - 1, row);
        reqQty = reqQty == "" ? "0.00" : reqQty.replace(/,/g, '');

        var isLower = false;

        //Computated Unit Cost Vatin
        var vatin = ComputationOfUnitCost(false, number, vatRate);
        Grid.SetText(SPR_UNITCOSTVATIN - 1, row, parseFloat(vatin).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))

        //Computated Total Amount (Vatin)/(Vatex)
        Grid.SetText(SPR_TOTAL_AMNT_VATIN - 1, row, ComputeTotalAmntVATINPerRow(reqQty, vatin));
        Grid.SetText(SPR_TOTAL_AMNT_VATEX - 1, row, ComputeTotalAmntVATINPerRow(reqQty, number));

        //Compute Total Request Amount(Vatin) in Header
        ComputeTotalReqVatin();

        if (getProfitCenter() == "") {
            let itemCode = Grid.GetText(SPR_ITEMCODE - 1, row);
            let UOM = Grid.GetText(SPR_REQ_UOM_CODE - 1, row);
            jsonBdgtChk.filter(e => (e["itemCode"] + e["UOM"] + e["seg1Bdgt"]) == (itemCode + UOM + glCode))[0]["amountVatex"] = parseFloat(number);
            jsonBdgtChk.filter(e => (e["itemCode"] + e["UOM"] + e["seg1Bdgt"]) == (itemCode + UOM + glCode))[0]["rownum"] = row;
        }
}

$(document).on('change', '.UnitCostVatin', function () {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var currentRow = row;
    var hasWac = false;
    var wacVatin = 0;

    var hasBdgtChk = Grid.GetText(Main.GRD_HASBDGTCHK - 1, row);
    isVatex = $(this).hasClass('UnitCostVatex');

    var number = RemoveComma(Grid.GetText(Main.GRD_UNITCOSTVATIN - 1, row));

    if (!isNaN(number)) {
        Grid.SetText(Main.GRD_UNITCOSTVATIN - 1, row, MoneyFormat(number, 5));
    }

    //CHECK IF HAS WAC
    if (Grid.GetText(Main.GRD_WEIGHTAVECOSTVATIN - 1, row) != "") {
        hasWac = true;
        wacVatin = RemoveComma(Grid.GetText(Main.GRD_WEIGHTAVECOSTVATIN - 1, row));
    }


    var lowestUnitCostVatin = RemoveComma(Grid.GetText(Main.GRD_LASTPOPRICEVATIN, row));

    var reqQty = Grid.GetText(Main.GRD_REQ_QTY - 1, row);
    reqQty = reqQty == "" ? "0.00" : reqQty.replace(/,/g, '');

    var isNonVat = $(`#nwGrid-nwData tr:eq(${row}) td:eq(${Main.GRD_NONVAT}) input`).is(':checked');

    var vatRate = $('#txtVatRate').val() == "" ? "0.00" : isNonVat == true ? "0.00" : $('#txtVatRate').val();

    var isLower = false;

    if (!(hasWac && (parseFloat(number) == parseFloat(wacVatin)))) { //IF INPUTTED UNIT COST IS WITH SAME VALUE OF WAC DON'T VALIDATE USING LAST PO PRICE

        if (parseFloat((number)) < parseFloat((lowestUnitCostVatin))) {
            number = lowestUnitCostVatin;
            isLower = true;
            ClearDetails(row, true, true, false);
        }
    }

    //Computated Unit Cost Vatex
    var vatex = ComputationOfUnitCost(true, number, vatRate);
    Grid.SetText(Main.GRD_UNITCOSTVATEX - 1, row, parseFloat(vatex).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

    //Computated Total Amount (Vatin)
    Grid.SetText(Main.GRD_TOTAL_AMNT_VATIN - 1, row, ComputeTotalAmntVATINPerRow(reqQty, number));

    //Computated Total Amount (Vatex)
    Grid.SetText(Main.GRD_TOTAL_AMNT_VATEX - 1, row, ComputeTotalAmntVATINPerRow(reqQty, vatex));

    //Compute Total Request Amount(Vatin) in Header
    ComputeTotalReqVatin();

    if (isLower) {
        Grid.SetText(Main.GRD_UNITCOSTVATIN - 1, row, MoneyFormat(number, 5));

        setTimeout(function () {
            MessageBox(`Unit Cost (VATIN) should not be lower than the Last PO Price (VATIN).`, MenuItemTitle, 'error');
        }, 2);

        return false;
    }


    if (hasBdgtChk != "" && $(`#txtTrantype`).val().toUpperCase() == "REQCON") {
        setBdgtChkProperties(currentRow, true);
    }
    if (getProfitCenter() == "") {
        let itemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row);
        let UOM = Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row);
        let glCode = Grid.GetText(Main.GRD_GLACCNTCHARGING - 1, row);
        jsonBdgtChk.filter(e => (e["itemCode"] + e["UOM"] + e["seg1Bdgt"]) == (itemCode + UOM + glCode))[0]["amountVatex"] = parseFloat(vatex);
        jsonBdgtChk.filter(e => (e["itemCode"] + e["UOM"] + e["seg1Bdgt"]) == (itemCode + UOM + glCode))[0]["rownum"] = row;
    }
});


function ComputationOfUnitCost(isVatin, unitCost, vat) {
    if (isVatin) { //Return Vatex value
        return (unitCost / (1 + parseFloat(vat)))
    }
    else { //return Vatin value
        return (unitCost * (1 + parseFloat(vat)))
    }
}




$(document).on("click", ".Specifications", function () {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var hasItemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row) != "" ? true : false;

    if (!hasItemCode) {
        return false;
    }

    func_xcallRemarks(this);
    $('#nwgRemarksCon .dimMessageBoxHeader .modal-hdr-title').text("Specifications/Notes");

    if (nwDocno != "") {
        $('#txtnwgRemarks, #chknwgRemarks,#btnnwgRemarks').prop("disabled", true);
    }
    else {
        $('#txtnwgRemarks, #chknwgRemarks,#btnnwgRemarks').prop("disabled", false);
    }
});

$(document).on("click", '#btnnwgRemarks', function (e) {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    if (Grid.GetText(Main.GRD_SPECNOTES - 1, row)  != '') {
        Grid.SetBackground(Main.GRD_SPECNOTES - 1, row, "green");
    }
    else {
        Grid.SetBackground(Main.GRD_SPECNOTES - 1, row, "#2689d8");
    }

    return true;
});


$(document).on("change keyup paste", ".numUnitVATIN", function () {

    var taxRate = 0;
    //taxRate = parseFloat($(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_TAXRATE})`).text().replace(/,/g, "")) || 0;
    var amt = 0;

    var vatin = 0;
    vatin = 0;
    // vatin = parseFloat($(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_UNITCOST_VATIN}) input`).val().replace(/,/g, "")) || 0;
    var discountVatex = 0;
    // discountVatex = parseFloat($(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_DISCOUNT_VATEX}) input`).val().replace(/,/g, "")) || 0;

    amt = vatin / (1 + (taxRate / 100));
    //setGridData('nwGridCon', 'input', GRD_UNITCOST_VATEX, crnwTR.index(), amt.toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    //setGridData('nwGridCon', '', GRD_UNITCOST_VATEX_NET_DISCOUNT, crnwTR.index(), getNetOfDiscount(vatin, discountVatex).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
});

$(document).on("change keyup paste", ".numUnitVATEX", function () {
    var taxRate = 0;
    // taxRate = parseFloat(getGridData('nwGridCon', '', GRD_TAXRATE, crnwTR.index())) || 0;
    var amt = 0;
    var vatex = 0;
    //vatex = parseFloat($(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_UNITCOST_VATEX}) input`).val().replace(/,/g, "")) || 0;
    var discountVatex = 0;
    //discountVatex = parseFloat($(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_DISCOUNT_VATEX}) input`).val().replace(/,/g, "")) || 0;

    amt = vatex * (1 + (taxRate / 100));
    //setGridData('nwGridCon', 'input', GRD_UNITCOST_VATIN, crnwTR.index(), amt.toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    //setGridData('nwGridCon', '', GRD_UNITCOST_VATEX_NET_DISCOUNT, crnwTR.index(), getNetOfDiscount(vatex, discountVatex).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
});


$(document).on("change keyup paste", ".numNetOfDiscount", function () {
    var vatex = 0;
    // vatex = parseFloat($(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_UNITCOST_VATEX}) input`).val().replace(/,/g, "")) || 0;
    var discountVatex = 0;
    // discountVatex = parseFloat($(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_DISCOUNT_VATEX}) input`).val().replace(/,/g, "")) || 0;
    //setGridData('nwGridCon', '', GRD_UNITCOST_VATEX_NET_DISCOUNT, crnwTR.index(), getNetOfDiscount(vatex, discountVatex).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
});



var tdTemp;
var trTemp;
var temval;



function msgBoxContainerQuestionF(genID, answer) {
    try{
        var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
        var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;
    } catch (e) { }

    try {
        var GridSingleDel = nwGridConSingleDel_Book.ActiveSheet;
        var rowSingleDel = GridSingleDel.CellSelected.row - 1;
    } catch (e) { }


    if (genID == "UponChangeLocation") {
        if (answer == 'Yes') {
            $('#Message_Cancel').css('display', '');
            nwLoading_Start("actChangeCurrency", crLoadingHTML); //same procedure in changing of currency
            cust_GetPara();
            UponChangingCurrency();
            UponChangeRsnForRqst();
            ResetQuotationDtls();
            ResetDeliveryDtls();
            ClearCostCenter();
            func_ActionDriven("actChangeCurrency", false);
        }
        else {
            $(`#idvallugLocForm`).val(tempLocformCode);
            $(`#descvallugLocForm`).val(tempLocformDesc);
            $('#Message_Cancel').css('display', 'none');
            $('#Message_Cancel').css('display', '');
        }
    }


    if (genID == "nwBtnRemove") {
        if (answer == "Yes") {
            $(`#nwGridAttach-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_ATTACH_DOCU_FILEPATH})`).text('');
            $(`#nwGridAttach-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_ATTACH_DOCU_DOWNLOAD})`).addClass("nwGButton");
            $(`#nwGridAttach-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_ATTACH_DOCU_DOWNLOAD})`).removeClass("hasData");
        }
    }


    if (genID == "isProcess") {
        if (answer == "Yes") {
            nwParameter_Add_Table('nwGridConForApproval', false);
            $('#dimMessageBox').css("min-width", "450px");
            func_ActionDriven('actProcessData', false);
        }
    }


    if (genID == "isProcessDocAttach") {
        if (answer == "Yes") {
            cust_GetPara();
            nwParameter_Add_Table('nwGridAttach', false);
            func_ActionDriven('actSaveAttachment', false);
        }
    }

    if (genID == "isProcessPaymentComponent") {
        if (answer == "Yes") {
            nwParameter_Add("Docno", $('#txtPRNo').val());
            nwParameter_Add("PaymentCategory", $("#idvallugRequestor").val());
            nwParameter_Add_Table('nwGridPaymentComponent', false);
            func_ActionDriven('actSavePaymentComponent', false);
        }
    }

    if (genID == "isProcessDeliveryDetails") {
        if (answer == "Yes") {

            nwLoading_Start("actSaveDeliveryDetails", crLoadingHTML);
            nwParameter_Add("Docno", $('#txtDocno').val());
            nwParameter_Add("idvallugDDItem", $('#idvallugDDItem').val());
            nwParameter_Add("idvallugDDReqUOM", $('#idvallugDDReqUOM').val());
            nwParameter_Add("txtDDRownum", $('#txtDDRownum').val());
            nwParameter_Add("idvallugDDItem", $('#idvallugDDItem').val());
            nwParameter_Add("idvallugDDReqUOM", $('#idvallugDDReqUOM').val());
            nwParameter_Add("txtDDRemainingBalance", $('#txtDDRemainingBalance').val());
            nwParameter_Add_Spread(nwGridConDeliveryID_Book);

            var GridDeliveryID = nwGridConDeliveryID_Book.ActiveSheet;
            enableSOHDetails();
            func_ActionDriven('actTempSaveDeliveryDetails', false);
        }
    }

    if (genID == "isProcessQuotationDetails") {
        if (answer == "Yes") {
            nwLoading_Start("actSaveQuotationDetails", crLoadingHTML);
            nwParameter_Add("txtQuotRownum", $('#txtQuotRownum').val());
            nwParameter_Add("idvallugQuotItem", $('#idvallugQuotItem').val());
            nwParameter_Add("txtQuotUOM", $('#txtQuotUOM').val());

            nwParameter_Add_Spread(nwGridConQuotationDetails_Book);
            nwParameter_Add_Table('nwGridConQuotationDetails', false);
            nwParameter_Add("txtTrantype", $('#txtTrantype').val());
            func_ActionDriven('actTempSaveQuoDtls', false);
        }

    }


    if (genID == 'isAllowToProcess') {
        if (answer == "Yes") {
            cust_GetPara();
            func_ActionDriven("actNotRestricted", false);
        }
        else {
            func_ActionDriven("actDeleteInsertionInBUTranlin", false);
        }
    }

    if (genID == 'isSingleDelivery') {
        if (answer == 'Yes') {
            let msg = ValidateSingleDelivery();
            if (msg != "") {
                MessageBox(msg, "Single Delivery Window", "error");
                return false;
            }

            InsertInDeliveryDtls();
            MessageBox("Saved successfully", "Single Delivery Window")
            return false;
        }
    }

    if (genID == 'isSaveBdgtCheck') {
        var Grid = nwGridCon_Book.ActiveSheet;
        var row = Grid.CellSelected.row - 1;

        var promptTitle = "Charging Details Window"
        var segment1 = $(`#lblMAIN`).text();

        if (answer == 'Yes') {
            if ($('#idvallugBdgtChk_GLAccntChrge').val() == "") {
                MessageBox(`Cannot be saved. ${segment1} is required. \n`, promptTitle, 'error');
                return false;
            }

            var MainQty = Grid.GetText(Main.GRD_REQ_QTY - 1, $('#txtBdgtchk_RowNum').val());
            var MainVatex = $('#txtBdgtchkVatex').val() != "" ? $('#txtBdgtchkVatex').val() : "0.00";

            var errorMsg = ValidationBdgtChkWindow(RemoveComma(MainQty), RemoveComma(MainVatex));
            if (errorMsg != "") {
                MessageBox(errorMsg, promptTitle, "error");
                return false;
            }

            nwParameter_Add("txtBdgtchk_RowNum", $('#txtBdgtchk_RowNum').val());
            nwParameter_Add("txtBCLLineID", $('#txtBCLLineID').val());
            nwParameter_Add("txtBCLItemCode", $('#txtBCLItemCode').val());
            nwParameter_Add("txtBCLUom", $('#txtBCLUom').val());
            nwParameter_Add("txtIsLookUps", $('#txtIsLookUps').val());
            nwParameter_Add("getProfitCenter", getProfitCenter());
            nwParameter_Add_Spread(nwGridConBgtChkLIN_Book);
            func_ActionDriven("actTempSaveBdgtCheck", false);
        }
    }

    if (genID == 'isSaveAllocCheck') {
        if (answer == 'Yes') {
            var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
            var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;

            var MainQty = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY, $('#txtBdgtchk_RowNum').val());
            var MainVatex = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_AMNT_VATEX, $('#txtBdgtchk_RowNum').val());

            var errorMsg = ValidationAllocWindow(RemoveComma(MainQty), RemoveComma(MainVatex));
            if (errorMsg != "") {
                MessageBox(errorMsg, "Allocation Details", "error");
                return false;
            }

            nwParameter_Add("txtAllocRowNum", $('#txtAllocRowNum').val());
            nwParameter_Add("txtBCLLineID", $('#txtBCLLineID').val());
            nwParameter_Add("txtBCLItemCode", $('#txtBCLItemCode').val());
            nwParameter_Add("txtBdgtSegCode", $('#txtBdgtSegCode').val());
            nwParameter_Add("txtBCLUom", $('#txtBCLUom').val());
            nwParameter_Add_Table("nwGridConAllocProcess", false);
            func_ActionDriven("actTempSaveAllocCheck", false);
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
            var trantype = $('#txtTrantype').val();

            //DisplayBdgtCtrl(docno, false, trantype);
        }
    }

    if (genID == 'isBelowEOQ') {
        if (answer == 'Yes') {
            var Grid = nwGridCon_Book.ActiveSheet;
            var row = Grid.CellSelected.row - 1;
            var eoq = RemoveComma(Grid.GetText(Main.GRD_EOQ - 1, row));
            Grid.SetText(Main.GRD_REQ_QTY - 1, row, MoneyFormat(eoq, 2));

            //Display hided buttons
            $('#dimMessageBox .BoxClose').css('display', '');
            $('#Message_Yes').text('Yes')
            $('#Message_No').css('display', '');
            $('#Message_Cancel').css('display', '');
            $('#dimMessageBox.question .message_icon').css('background-image', ' url(../../../materials/icons/nw_ico_Question.png)'); //Replace ICON

        }
    }

    if (genID == 'isChangeUnitCost') {
        var Grid = nwGridCon_Book.ActiveSheet;
        var row = Grid.CellSelected.row - 1;

        if (answer == 'Yes') {
            ClearDetails(row, true, true, true);

        }

        else {
            var vatex = RemoveComma(Grid.GetText(Main.GRD_TEMP_VATEX - 1, row));
            var vatin = RemoveComma(Grid.GetText(Main.GRD_TEMP_VATIN - 1, row));
            Grid.SetText(Main.GRD_UNITCOSTVATEX - 1, row, MoneyFormat(vatex, 5));
            Grid.SetText(Main.GRD_UNITCOSTVATIN - 1, row, MoneyFormat(vatin, 5));

            var isChecked = $(`#nwGrid-nwData tr:eq(${row}) td:eq(${Main.GRD_NONVAT}) input`).is(':checked');
            var vatRate = $('#txtVatRate').val() == "" ? "0.00" : isChecked == true ? "0.00" : $('#txtVatRate').val();
            ComputeIfNonVat(row, vatRate);


            //FOR MICROS


            //Display hided buttons
            $('#dimMessageBox .BoxClose').css('display', '');
        }
    }

    if (genID == 'isChangeQty') {
        var Grid = nwGridCon_Book.ActiveSheet;
        var row = Grid.CellSelected.row - 1;
        if (answer == 'Yes') {
            //Clear All Details with connection to Requested Qty.
            ClearDetails(row, false, false, false);

            var hasBdgtChk = getGridData('nwGrid', '', Main.GRD_HASBDGTCHK, row);

            if (hasBdgtChk != "" && $(`#txtTrantype`).val().toUpperCase() == "REQCON") {
                setBdgtChkProperties(row, true);
            }

        }
        else {
            var qty = getGridData('nwGrid', '', Main.GRD_TEMP_REQ_QTY, row);
            qty = RemoveComma(qty);
            setGridData('nwGrid', 'input', Main.GRD_REQ_QTY, row, MoneyFormat(qty, 5));
        }

        var isChecked = $(`#nwGrid-nwData tr:eq(${row}) td:eq(${Main.GRD_NONVAT}) input`).is(':checked');
        var vatRate = $('#txtVatRate').val() == "" ? "0.00" : isChecked == true ? "0.00" : $('#txtVatRate').val();
        ComputeIfNonVat(row, vatRate);

        //Display hided buttons
        $('#dimMessageBox .BoxClose').css('display', '');
    }

    if (genID == 'isChangAllocQty' || genID == "isChangAllocAmntVatex" || genID == "isChangAllocPrcnt") {
        var row = changingRow;
        row = ReturnRowIfArrowKeys(row);

        if (answer == 'Yes') {
            //Clear All Details with connection to Requested Qty.
            ClearAllocDetails(row, false);

            var qty = parseFloat(RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, GridBgtChkLIN)));
            var amnt = parseFloat(RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, GridBgtChkLIN)));
            var prnct = parseFloat(getGridData(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, GridBgtChkLIN)));
            var total = 0.00000;
            var num = 0.00;
            var type = "";

            if (genID == "isChangAllocQty") {
                type = "Quantity"
                total = RemoveComma($(`#txtTotalQty`).val());
                num = qty;
            }
            else if (genID == "isChangAllocAmntVatex") {
                type = "Amount (VATEX)"
                total = RemoveComma($(`#txtTotalAmntVatex`).val());
                num = amnt;
            }

            if (genID != "isChangAllocPrcnt") {
                GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TEMP_QTY - 1, rowBgtChkLIN, MoneyFormat(qty, 5));
                GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TEMP_AMNT - 1, rowBgtChkLIN, MoneyFormat(amnt, 2));
                GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TEMP_PRCNT - 1, rowBgtChkLIN, MoneyFormat(prnct, 11));

                GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, rowBgtChkLIN, MoneyFormat(qty, 5));
                GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, rowBgtChkLIN, MoneyFormat(amnt, 2));

                AutoComputeBdgtCheckDetails(GridBgtChkLIN, rowBgtChkLIN, qty, amnt);
                BdgtCheckDtilsInputValidation(RemoveComma(num), total - 1, rowBgtChkLIN, type);
            }
            else { //FOR PERCENTAGE
                AutoComputeBdgtCheckDetails(GridBgtChkLIN, rowBgtChkLIN, (parseFloat(qty) * parseFloat(prnct / 100)), (parseFloat(amnt) * parseFloat(prnct / 100)));
                BdgtChkPercentValidation(_crnwTRTemp);
                ComputationForBdgtChckDetails();
            }

        }
        else {
            var tempQty = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_TEMP_QTY, rowBgtChkLIN);
            var tempAmnt = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_TEMP_AMNT, rowBgtChkLIN);
            var tempPrcnt = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_TEMP_PRCNT, rowBgtChkLIN);

            GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, rowBgtChkLIN, tempQty);
            GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, rowBgtChkLIN, tempAmnt);
            GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, rowBgtChkLIN, tempPrcnt);

        }

        ComputationForBdgtChckDetails();
        ComputeBdgtPrcnt();

        //Display hided buttons
        $('#dimMessageBox .BoxClose').css('display', '');
    }

    if (genID == 'UponChangeRsnForRqst') {
        if (answer == 'Yes') {
            $('#Message_Cancel').css('display', '');
            UponChangeRsnForRqst();
        }
        else {
            $('#idvallugRsnForRequest').val(tempRsnForRqstCode);
            $('#descvallugRsnForRequest').val(tempRsnForRqstDesc);
            $('#Message_Cancel').css('display', '');
        }
    }

    if (genID == 'UponChangeCurrency') {
        if (answer == 'Yes') {
            $('#Message_Cancel').css('display', '');
            nwLoading_Start("actChangeCurrency", crLoadingHTML);
            cust_GetPara();
            UponChangingCurrency();
            UponChangeRsnForRqst();
            ResetQuotationDtls();
            func_ActionDriven("actChangeCurrency", false);

        }
        else {
            $('#idvallugCurrency').val(tempCurrencyCode);
            $('#descvallugCurrency').val(tempCurrencyDesc);
            $('#Message_Cancel').css('display', '');
        }
    }

    if (genID == 'UponChangeCostCenter') {
        if (answer == 'Yes') {
            $('#Message_Cancel').css('display', '');
            UponChangeRsnForRqst()
        }
        else {
            $('#idvallugCostCenter').val(tempCostCenterCode);
            $('#descvallugCostCenter').val(tempCostCenterDesc);
            $('#Message_Cancel').css('display', '');
        }
    }

}

function parent_MessageBoxQuestionGG(message, title, icon, focusObject) { //DON'T COPY THIS FUNCTION 
    message = message.replaceAll("\n", "<br>");
    $(window).resize();
    //$("#dimMessageBox").show();
    setTimeout(function () { $("#dimMessageBox").show(); }, 500);
    $("#dimMessageBox").attr("class", "question");
    $("#dimMessageBox div.modal-hdr-title").text(title);
    $("#dimMessageBox div.message_content").html(message);
    $("#dimbgNW").addClass("openn");
    $("#dimbgNW").fadeIn(200);
    var er = $('#dimMessageBox .message_buttons .message_buttonsitems:visible').length;
    $('#dimMessageBox .message_buttons .message_buttonsitems:eq(' + (er - 1) + ')').focus();

    var nwFocusObject = "";
    try {
        if (focusObject != undefined) nwFocusObject = focusObject;
    } catch (err) { }
    $("#dimMessageBox").attr("nwfocusobject", nwFocusObject);
    // $('#dimMessageBox  .message_buttons  .message_buttonsitems.message_Yes').focus();

    nwPopupForm_BringToFront2("", true);
}



$(document).on("change blur", "#idvallugProjectBudgetItem", function (e) {
    if ($(this).val() == '') {
        $("#txtProjectBudgetDocumentNo").val('');
        $(`#nwGridCon-nwData tr > *:nth-child(${GRD_ITEMGROUPTYPE_CODE + 1})`).text('');
        $(`#nwGridCon-nwData tr > *:nth-child(${GRD_ITEMGROUPTYPE_DESC + 1})`).text('');
        $(`#nwGridCon-nwData tr > *:nth-child(${GRD_ITEMCODE + 1})`).text('');
        $(`#nwGridCon-nwData tr > *:nth-child(${GRD_ITEMDESC + 1})`).text('');

    }
});

var _crnwTRTemp;
var _crnwTDTemp;


function getTotalAllocQty() {
    var GridDeliveryID = nwGridConDeliveryID_Book.ActiveSheet;
    var rowDeliveryID = GridDeliveryID.CellSelected.row - 1;

    var qty = 0;
    var cnt = GridDeliveryID.GetMaxRow();
    var decplace = 5;
    var ReqQty = parseFloat(RemoveComma($('#txtDDTotalReqQty').val())) || 0;

    for (var row = 0; row < cnt; row++) {
        qty += parseFloat(RemoveComma(GridDeliveryID.GetText(GRD_DD_SPLITQTY - 1, row))) || 0;
    }

    $('#txtDDTotalSplitQty').val(parseFloat(qty).toFixed(decplace).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
    $('#txtDDRemainingBalance').val(parseFloat(ReqQty - qty).toFixed(decplace).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
}

function getTotalAllocCost() {
    var GridDeliveryID = nwGridConDeliveryID_Book.ActiveSheet;
    var rowDeliveryID = GridDeliveryID.CellSelected.row - 1;
    
    var qtyCost = 0;
    var cnt = GridDeliveryID.GetMaxRow();
    var TotalPOCost = parseFloat($('#txtTotalPOCost').val().replaceAll(',', '')) || 0;

    for (var row = 0; row < cnt; row++) {
        qtyCost += parseFloat(GridDeliveryID.GetText(GRD_DD_SPLITCOST - 1, rowDeliveryID).replace(/,/g, "")) || 0;
    }

    $('#txtDDTotalSplitQty').val(parseFloat(qtyCost).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
    $('#txtRemainingBalance2').val(parseFloat(TotalPOCost - qtyCost).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))

}

function ChkDuplicateDates(delDate, locform, subloc, index) {
    var GridDeliveryID = nwGridConDeliveryID_Book.ActiveSheet;
    var rowDeliveryID = GridDeliveryID.CellSelected.row - 1;
    var maxRowDeliveryID = GridDeliveryID.GetMaxRow();
    var isDuplicate = false;

    for (i = 0; i <= maxRowDeliveryID; i++) {

        if (GridDeliveryID.GetText(GRD_DD_DELDATE - 1, i)  == delDate
            && GridDeliveryID.GetText(GRD_DD_DELLOCCODE - 1, i) == locform
            && GridDeliveryID.GetText(GRD_DD_SUBLOCCODE - 1, i) == subloc
            && index != i
           ) {

            isDuplicate = true;
        }
    }

    return isDuplicate;
}


function CheckDuplicate(row, col, ID) {

    var DelDate = "";
    var DelCode = "";
    var SubLoc = "";
    var dupRow = 0;
    var hasDuplicate = false;

    var GridDeliveryID = nwGridConDeliveryID_Book.ActiveSheet;
    var rowDeliveryID = GridDeliveryID.CellSelected.row - 1;

    var cnt = GridDeliveryID.GetMaxRow();
    for (var irow = 0; irow < cnt; irow++) {
        if (row != irow) {
            DelDate = GridDeliveryID.GetText(GRD_DD_DELDATE - 1, row);
            DelCode = GridDeliveryID.GetText(GRD_DD_DELLOCCODE - 1, row);
            SubLoc = GridDeliveryID.GetText(GRD_DD_SUBLOCCODE - 1, row);

            if (DelDate.length > 0 && DelCode.length > 0 && SubLoc.length > 0) {

                if (ID == (DelDate + DelCode + SubLoc)) {
                    dupRow = irow;
                    hasDuplicate = true;
                    break;
                }
            }
        }
    }
    if (hasDuplicate) {
        MessageBox(`Cannot Continue. Delivery Date, Delivery Location and Sublocation already Exists in row ${(dupRow + 1)}.`, MenuItemTitle, 'error');

        if (col == GRD_DD_DELLOCCODE - 1) {
            GridDeliveryID.SetText(GRD_DD_SUBLOCCODE - 1, "");
            GridDeliveryID.SetText(GRD_DD_SUBLOCDESC - 1, "");
        }

        GridDeliveryID.SetText(col, row, "");
        GridDeliveryID.SetText(col + 1, row, "");
        GridDeliveryID.SetText(GRD_DD_DELADDRESS - 1, row, "");

        if (col == GRD_DD_DELDATE - 1) {
            GridDeliveryID.SetText(col - 1, row, '');
        }
    }
}

$(document).on("keydown", "#nwgRemarksCon", function (e) {
    var code = e.which;
    if (code == "13") {
        if ($("#chknwgRemarks").is(':checked')) {
            var Grid = nwGridCon_Book.ActiveSheet;
            var row = Grid.CellSelected.row - 1;

            if ($('#txtnwgRemarks').val() != '') {
                Grid.SetBackground(Main.GRD_SPECNOTES - 1, "green");
            }
            else {
                Grid.SetBackground(Main.GRD_SPECNOTES - 1, "#2689d8");
            }

        }
    }
});

var numValues = 0;
$(document).on("focus", ".ReqQty", function () {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var col = Grid.CellSelected.col - 1;

    _crnwTRTemp = row;
    _crnwTDTemp = col;

    var LocForm = $('#idvallugLocForm').val();
    var custodian = $('#idvallugCreatorCustodian').val();
    var costCenter = $('#idvallugCostCenter').val();
    var currency = $('#idvallugCurrency').val();
    var particulars = $('#txtParticular').val();
    var isConsumption = $(`#txtReqObjectiveCode`).val() == 'RO02' ? true : false;
    var reason = $('#idvallugRsnForRequest').val();

    var prompt = ''

    if (LocForm == '' ||
         custodian == '' ||
         costCenter == '' ||
         currency == '' ||
         particulars == '' ||
         (isConsumption && reason == '')
       ) {
        prompt = "Cannot proceed. Please complete the header details.";
        MessageBox(prompt, MenuItemTitle, 'error');
        return false;
    }

    var number = $(this).val() == "" ? "0.00" : $(this).val();//RemoveComma($(this).val());
    Grid.SetText(Main.GRD_TEMP_REQ_QTY-1, row, MoneyFormat(number, 2));

});

$(document).on("focus", ".UnitCostVatin", function () {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var col = Grid.CellSelected.col - 1;

    _crnwTRTemp = row;
    _crnwTDTemp = col;

    var LocForm = $('#idvallugLocForm').val();
    var custodian = $('#idvallugCreatorCustodian').val();
    var costCenter = $('#idvallugCostCenter').val();
    var currency = $('#idvallugCurrency').val();
    var particulars = $('#txtParticular').val();
    var isConsumption = $(`#txtReqObjectiveCode`).val() == 'RO02' ? true : false;
    var reason = $('#idvallugRsnForRequest').val();

    var prompt = ''

    if (LocForm == '' ||
         custodian == '' ||
         costCenter == '' ||
         currency == '' ||
         particulars == '' ||
         (isConsumption && reason == '')
       ) {
        prompt = "Cannot proceed. Please complete the header details.";
        MessageBox(prompt, MenuItemTitle, 'error');
        return false;
    }

    var number = RemoveComma($(this).val());
    var vatex = RemoveComma(Grid.GetText(Main.GRD_UNITCOSTVATEX-1, _crnwTRTemp));

    Grid.SetText(Main.GRD_TEMP_VATIN - 1, _crnwTRTemp, MoneyFormat(number, 5));
    Grid.SetText(Main.GRD_TEMP_VATEX - 1, _crnwTRTemp, MoneyFormat(vatex, 5));
});

$(document).on("focus", ".UnitCostVatex", function () {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var col = Grid.CellSelected.col - 1;

    _crnwTRTemp = col;
    _crnwTDTemp = row;

    var LocForm = $('#idvallugLocForm').val();
    var custodian = $('#idvallugCreatorCustodian').val();
    var costCenter = $('#idvallugCostCenter').val();
    var currency = $('#idvallugCurrency').val();
    var particulars = $('#txtParticular').val();
    var isConsumption = $(`#txtReqObjectiveCode`).val() == 'RO02' ? true : false;
    var reason = $('#idvallugRsnForRequest').val();

    var prompt = ''

    if (LocForm == '' ||
         custodian == '' ||
         costCenter == '' ||
         currency == '' ||
         particulars == '' ||
         (isConsumption && reason == '')
       ) {
        prompt = "Cannot proceed. Please complete the header details.";
        MessageBox(prompt, MenuItemTitle, 'error');
        return false;
    }


    var number = RemoveComma($(this).val());
    var vatin = RemoveComma(Grid.GetText(Main.GRD_UNITCOSTVATIN - 1, _crnwTRTemp));

    Grid.SetText(Main.GRD_TEMP_VATEX - 1, _crnwTRTemp, MoneyFormat(number, 5));
    Grid.SetText(Main.GRD_TEMP_VATIN - 1, _crnwTRTemp, MoneyFormat(vatin, 5));

});



$(document).on("click", ".nwCheckBox.nwCheckBox1.nwSelectProcess", function () {

    if ($('.nwCheckBox.nwCheckBox1.nwSelectProcess:checked').length == $('.nwCheckBox.nwCheckBox1.nwSelectProcess').length) {
        $(".nwCheckBoxTot" + GRD_SELECT + "").prop("checked", true);
    }
});

var getvalue = "";



var currentRow = 0;



var currAmnt;
var wholeNum = 16;
var precision = 5;



$(document).on("blur change", ".numUnitCost, .numDDSplitCost", function (e) {
    if (!isNaN($(this).val())) {
        $(this).val(commafy($(this).val()));

    }
});


$(document).on("blur change", ".numQuantity", function (e) {
    if (!isNaN($(this).val())) {
        $(this).val(commafyQty($(this).val()));

    }
});




function computeVatexQoute() { //quotation
    var GridQuotation = nwGridConQuotationDetails_Book.ActiveSheet;
    var rowQuotation = GridQuotation.CellSelected.row - 1;

    var num = parseFloat(GridQuotation.GetText(GRD_QD_VATEX - 1, rowQuotation));

    if (isNaN(num) || num == "")
        num = 0;

    var vatRate = $('#txtVatRate').val() == "" ? "0.00" : $('#txtVatRate').val();

    var isNonVat = GridQuotation.GetText(GRD_QD_ISNONVAT - 1, rowQuotation) == "1" ? true : false;
    if (isNonVat) {
        vatRate = "0.00"
    }

    var vatin = ComputationOfUnitCost(false, num, vatRate);

    GridQuotation.SetText(GRD_QD_VATIN - 1, rowQuotation, parseFloat(vatin).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    GridQuotation.SetText(GRD_QD_VATEX - 1, rowQuotation, MoneyFormat(num, 5));

    GridQuotation.SetEnable(GRD_QD_VATIN - 1, rowQuotation, false);
    GridQuotation.SetEnable(GRD_QD_VATEX - 1, rowQuotation, false);

    GridQuotation.SetBackground(GRD_QD_VATIN - 1, rowQuotation, "gainsboro");
    GridQuotation.SetBackground(GRD_QD_VATEX - 1, rowQuotation, "gainsboro");
}




function commafy(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    } else if (str[0].length == 0)
        str[0] = "0";

    if (str[0].length >= 1 && (str[1] == "" || str[1] == undefined))
        str[1] = "00000";
    else if (str[1].length == 1) {
        str[1] += "0000";
    }
    else if (str[1].length == 2) {
        str[1] += "000";
    }
    else if (str[1].length == 3) {
        str[1] += "00";
    }
    else if (str[1].length == 4) {
        str[1] += "0";
    }

    //if (str[1] && str[1].length >= 5) {
    //    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    //}
    return str.join('.');
}

function commafyQty(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    } else if (str[0].length == 0)
        str[0] = "0";

    if (str[1] == undefined)
        str[1] = "00";



    //if (str[1] && str[1].length >= 5) {
    //    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    //}
    return str.join('.');
}

function CheckDuplicateItemUOM(row, lookUpItem, lookUpUOM) {

    var ItemCode = "";
    var UOM = "";
    var $row;
    var isDuplicate = false;
    var errorResult = "";

    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for (i = 0; i <= maxRow; i++) {

        ItemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row);
        UOM = Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row);

        if (row != i) {

            if (ItemCode == lookUpItem && UOM == lookUpUOM) {
                errorResult = "Cannot proceed. Item having the same UOM already exists. \n";
                return errorResult;
            }
        }
    }

    return errorResult;
}

function setWhenViewAttach() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    $('.nwgrid_buttons').enable(false);

    //do not delete
    //for(i = 0; i <= maxrow; i++) {
    //    if (!Grid.GetEnable(GRD_ATTACH_DOCU_DOWNLOAD - 1, row)) {
    //        Grid.SetEnable(GRD_ATTACH_DOCU_DOWNLOAD - 1, false);
    //    }
    //}

    Grid.SetEnable(GRD_ATTACH_DOC_DOCU_CODE - 1, Spread_ALLROW, false)
    Grid.SetEnable(GRD_ATTACH_DOCU_DOCNO - 1, Spread_ALLROW, false)
    Grid.SetEnable(GRD_ATTACH_DOCU_EXPIRY_DATE - 1, Spread_ALLROW, false)
    Grid.SetEnable(GRD_ATTACH_DOCU_DOCDATE - 1, Spread_ALLROW, false)
    Grid.SetEnable(GRD_ATTACH_DOCU_ATTACH - 1, Spread_ALLROW, false)
    Grid.SetEnable(GRD_ATTACH_DOCU_REMOVE - 1, Spread_ALLROW, false)
}


$(document).on("click", ".nwgbtnRemarks", function () {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var ItemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row);
    if ($.trim(ItemCode).length <= 0) {
        nwPopupForm_HideModal('nwgRemarksCon');
        MessageBox("Cannot proceed. Item Code is required.", MenuItemTitle, 'error');
        return false;
    }


    $('#nwgRemarksCon .dimMessageBoxHeader .modal-hdr-title').text("Specifications/Notes");
    if (nwDocno != '') {
        $('#txtnwgRemarks, #chknwgRemarks, #btnnwgRemarks').prop("disabled", true)
    }

    return false;
});


$(document).on('change', '.idval', function () {
    let id = $(this).attr('id').replace('idval', '');
    ClearLookUp(id);
});

function ClearLookUp(lookUpId) {
    switch (lookUpId) {
        case "lugLocForm":
            $('#idvallugCurrency').val('');
            $('#descvallugCurrency').val('');
            break;
    }
}

$(document).on('change', '#txtValueDate', function () {
    nwParameter_Add("valueDate", $(this).val());
    func_ActionDriven("actUponChangeValueDate", false);
});

function DisplayBdgtCtrl(docno, isProcess, trantype) {
    nwLoading_Start('LoadingGenBdgtCtrl', crLoadingHTML);

    //Change Pop-up window title
    if (trantype.toLowerCase() == 'reqcon' && $(`#txtNOAccessReqrep`).val() != "1") {
        $(`#nwBudgetCtrlDetails .modal-hdr-title`).text('Budget Control Details/SOH Details');
        $('#fldSetVwSOH').css('display', '');
    }
    else {
        $(`#nwBudgetCtrlDetails .modal-hdr-title`).text('Budget Control Details');
        $('#fldSetVwSOH').css('display', 'none');
    }

    nwPopupForm_ShowModal('nwBudgetCtrlDetails');
    $('#txtBdgtCtrlReqDocno').val(docno);
    nwParameter_Add("txtDocno", docno);
    nwParameter_Add("isProcess", isProcess);
    nwParameter_Add("txtTrantype", trantype);
    nwParameter_Add("txtNOAccessReqrep", $('#txtNOAccessReqrep').val());
    func_ActionDriven("actGenBdgtCtrlDetails", false);
}

function DefaultedDlvyLocation(nwGrid, loc, locdesc, subloc, sublocdesc, delAdd, DelRecipientCode, DelRecipientDesc) {
    //Defaulted Delivery location
    //var locformCode = $('#txtDefLocformCode').val();
    //var locformDesc = $('#txtDefLocformDesc').val();
    var locformCode = $('#idvallugLocForm').val();
    var locformDesc = $('#descvallugLocForm').val();
    var custodianCode = $(`#idvallugCreatorCustodian`).val()
    var custodianDesc = $(`#descvallugCreatorCustodian`).val()


    nwGrid.SetText(loc, _crnwTRTemp, locformCode); 
    nwGrid.SetText(locdesc, _crnwTRTemp, locformDesc); 
    nwGrid.SetText(subloc, _crnwTRTemp, $('#txtDDSublocationCode').val());
    nwGrid.SetText(sublocdesc, _crnwTRTemp, $('#txtDDSublocationDesc').val());
    nwGrid.SetText(delAdd, _crnwTRTemp, $('#txtDDDeliveryAddress').val());
    nwGrid.SetText(DelRecipientCode, _crnwTRTemp, custodianCode);
    nwGrid.SetText(DelRecipientDesc, _crnwTRTemp, custodianDesc);
}

function DefaultedSingleDlvyLocation(nwGrid, spr_loc, spr_locdesc, spr_subloc, spr_sublocdesc, spr_delAdd, spr_delrecipientCode, spr_delrecipientDesc, locationCode, locationDesc, sublocCode, sublocDesc, delAdd, delrecipientCode, delrecipientDesc) {
    nwGrid.SetText(spr_loc, _crnwTRTemp, locationCode);
    nwGrid.SetText(spr_locdesc, _crnwTRTemp, locationDesc);
    nwGrid.SetText(spr_subloc, _crnwTRTemp, sublocCode);
    nwGrid.SetText(spr_sublocdesc, _crnwTRTemp, sublocDesc);
    nwGrid.SetText(spr_delAdd, _crnwTRTemp, delAdd);
    nwGrid.SetText(spr_delrecipientCode, _crnwTRTemp, delrecipientCode);
    nwGrid.SetText(spr_delrecipientDesc, _crnwTRTemp, delrecipientDesc);

}

function callIfProfitCenterIsEmpty() {
    if(getProfitCenter() == ""){
        nwParameter_Add("txtBdgtchk_RowNum", $('#txtBdgtchk_RowNum').val());
        nwParameter_Add("txtBCLLineID", $('#txtBCLLineID').val());
        nwParameter_Add("txtBCLItemCode", $('#txtBCLItemCode').val());
        nwParameter_Add("txtBCLUom", $('#txtBCLUom').val());
        nwParameter_Add("txtIsLookUps", $('#txtIsLookUps').val());
        nwParameter_Add_Table("nwGridConBgtChkLIN", false);
        nwParameter_Add("getProfitCenter", getProfitCenter());
        func_ActionDriven("actTempSaveBdgtCheck", false);
    }
}

function SaveBdgtCheck() {
    FillGLAccntCharge();
    HasSavedInDetails();

    var trantype = $('#txtTrantype').val();

    if (trantype == "REQCON") {
        if (jsonBdgtChkFiltered.length > 0) {
            nwGridCon_Book.ActiveSheet.SetBackground(Main.GRD_BDGT_CHK_DTLS - 1, nwGridCon_Book.ActiveSheet.CellSelected.row - 1, 'green');
            nwGridCon_Book.ActiveSheet.SetText(Main.GRD_HASBDGTCHK - 1, nwGridCon_Book.ActiveSheet.CellSelected.row - 1, '1');
        }
        else {
            nwGridCon_Book.ActiveSheet.SetBackground(Main.GRD_BDGT_CHK_DTLS - 1, nwGridCon_Book.ActiveSheet.CellSelected.row - 1, '#2689d8');
            nwGridCon_Book.ActiveSheet.SetText(Main.GRD_HASBDGTCHK - 1, nwGridCon_Book.ActiveSheet.CellSelected.row - 1, '0');
        }
    }
    else {
        if (jsonBdgtChkFiltered.length > 0) {
            nwGridConNonCatalogue_Book.ActiveSheet.SetBackground(SPR_BDGT_CHK_DTLS - 1, nwGridConNonCatalogue_Book.ActiveSheet.CellSelected.row - 1, 'green');
            nwGridConNonCatalogue_Book.ActiveSheet.SetText(SPR_HASBDGTCHK - 1, nwGridConNonCatalogue_Book.ActiveSheet.CellSelected.row - 1, '1');
        }
        else {
            nwGridConNonCatalogue_Book.ActiveSheet.SetBackground(SPR_BDGT_CHK_DTLS - 1, nwGridConNonCatalogue_Book.ActiveSheet.CellSelected.row - 1, '#2689d8');
            nwGridConNonCatalogue_Book.ActiveSheet.SetText(SPR_HASBDGTCHK - 1, nwGridConNonCatalogue_Book.ActiveSheet.CellSelected.row - 1, '0');
        }
    }
}

function GetdefLastPOPrice() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    nwLoading_Start("PoLastPriceLoad", crLoadingHTML)

    nwParameter_Add("locform", $(`#idvallugLocForm`).val());

    nwParameter_Add("itemCode", Grid.GetText(Main.GRD_ITEMCODE - 1, row));
    nwParameter_Add("uom", Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row));
    nwParameter_Add("vendor", Grid.GetText(Main.GRD_PREFVENDOR_CODE - 1, row));
    nwParameter_Add("currency", $('#idvallugCurrency').val());
    nwParameter_Add("txtTrantype", $('#txtTrantype').val());
    nwParameter_Add("getProfitCenter", getProfitCenter());
    nwParameter_Add("rowNum", row);
    nwParameter_Add("LINEID", Grid.GetText(Main.GRD_LINEID - 1, row));
    func_ActionDriven("actPoLastPrice", false);
}



function fillGrid(defVatex, defVatin, poDate, lastPoPriceVatex, lastPoPriceVatin, wacVatex, wacVatin) {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var qty = RemoveComma(Grid.GetText(Main.GRD_REQ_QTY - 1, crnwTR.index()));

    //SET VALUE WITH REMOVED COMMAS
    var temp_defvatex = RemoveComma(defVatex);
    var temp_defVatin = RemoveComma(defVatin);
    var temp_lastPoPriceVatex = RemoveComma(lastPoPriceVatex);
    var temp_lastPoPriceVatin = RemoveComma(lastPoPriceVatin);
    var temp_wacVatex = RemoveComma(wacVatex);
    var temp_wacVatin = RemoveComma(wacVatin);

    //COMPUTE OCY AMOUNT
    var ocyAmntVatin = parseFloat(temp_defVatin) * parseFloat(qty);
    var ocyAmntVatex = parseFloat(temp_defvatex) * parseFloat(qty);

    //FILL GRID VALUES
    Grid.SetText(Main.GRD_UNITCOSTVATEX - 1, row, MoneyFormat(temp_defvatex, 5));
    Grid.SetText(Main.GRD_UNITCOSTVATIN - 1, row, MoneyFormat(temp_defVatin, 5));

    Grid.SetText(Main.GRD_TOTAL_AMNT_VATEX - 1, row, MoneyFormat(ocyAmntVatex, 2));
    Grid.SetText(Main.GRD_TOTAL_AMNT_VATIN - 1, row, MoneyFormat(ocyAmntVatin, 2));

    Grid.SetText(Main.GRD_LASTPOPRICEVATEX - 1, row, MoneyFormat(temp_lastPoPriceVatex, 5));
    Grid.SetText(Main.GRD_LASTPOPRICEVATIN - 1, row, MoneyFormat(temp_lastPoPriceVatin, 5));
    Grid.SetText(Main.GRD_DATEOFLASTPO - 1, row, poDate);
    Grid.SetText(Main.GRD_WEIGHTAVECOSTVATEX - 1, row, MoneyFormat(temp_wacVatex, 5));
    Grid.SetText(Main.GRD_WEIGHTAVECOSTVATIN - 1, row, MoneyFormat(temp_wacVatin, 5));

}

$(document).on("click", "#docattviewdownload", function (e) {
    e.preventDefault();  //stop the browser from following
    $('#aDownload')[0].click();
});

$(document).on('click', '#btnDlvyAppToAll', function () {
    ClearDeliveryDtlsApplyToAll();
    nwPopupForm_ShowModal('frmApplyToOneLoc');
    return false;
});



function setDefaultIfnoProfitCenter() {
    if(getProfitCenter() == ""){
        $('.BclQty').val($('#txtBdgtchkQty').val());
        $('.BclAmntVatex').val($('#txtTotalAmntVatex').val());
        $('.BclPrcnt').val("100.00000000000");
        
        $('.BclQty').enable(false);
        $('.BclAmntVatex').enable(false);
        $('.BclPrcnt').enable(false);
    }

    nwGridConBgtChkLIN_Book.ActiveSheet.SetText2(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, Spread_ALLROW, "...");
    nwGridConBgtChkLIN_Book.ActiveSheet.SetTextAlign(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, Spread_ALLROW, "center");
    nwGridConBgtChkLIN_Book.ActiveSheet.SetBold(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, Spread_ALLROW, "bold");
    nwGridConBgtChkLIN_Book.ActiveSheet.SetTextColor(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, Spread_ALLROW, "white");
    nwGridConBgtChkLIN_Book.ActiveSheet.SetBackground(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, Spread_ALLROW, "gainsboro");
}



function ClearDeliveryDtlsApplyToAll() {
    $('#idvallugApplyToOneLoc_DelLoc').val('');
    $('#descvallugApplyToOneLoc_DelLoc').val('');
    $('#idvallugApplyToOneLoc_Subloc').val('');
    $('#descvallugApplyToOneLoc_Subloc').val('');
    $('#txtApplyToOneLoc_DelAddr').val('');
}

function UponNew() {
    nwLoading_Start("UponNewLoading", crLoadingHTML);
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
}

$(document).on('click', '#btnProceed', function () {
    var isContinue = false;
    UponNew()

    var code = $('#cbReqObjective').find('option:selected').val();

    $('#txtReqObjectiveCode').val(code);
    $('#txtReqObjective').val($('#cbReqObjective').find('option:selected').text());
    nwParameter_Add("txtReqObjectiveCode", $('#txtReqObjectiveCode').val());
    func_ActionDriven("actNewData", false);
    return isContinue;
});



function IfHasDefaultReqObj() {
    UponNew()
    nwParameter_Add("txtReqObjectiveCode", $('#txtReqObjectiveCode').val());
    nwParameter_Add("txtReqObjective", $('#txtReqObjective').val());
    nwParameter_Add("txtNOAccessReqrep", $('#txtNOAccessReqrep').val());
    func_ActionDriven("actNewData", false);
}


function ComputeTotalAmntVATINPerRow(reqQty, vatin) {
    return parseFloat((reqQty * vatin)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function RemoveComma(num) {
    if (num == "" || num == undefined) {
        num = "0.00";
    }
    return num.toString().replace(/,/g, '');
}

function HasJsonTempDelDtls(itemCode, reqUOM) {
    return jsonDelDtls.findIndex(i => (i.itemCode + i.ReqUOM) == itemCode + reqUOM)
}

function HasJsonTempBdgtAlloc(itemCode, reqUOM, segCode) {
    return jsonAllocChk.findIndex(i => (i.itemCode + i.UOM + i.bdgtSegCode) == itemCode + reqUOM + segCode)
}

function HasJsonTempBdgtAllocFnl(itemCode, reqUOM, segCode) {
    return jsonAllocChkFnl.findIndex(i => (i.itemCode + i.UOM + i.bdgtSegCode) == itemCode + reqUOM + segCode)
}

function HasJsonTempBdgtChk(itemCode, reqUOM) {
    return jsonBdgtChk.findIndex(i => (i.itemCode + i.UOM) == itemCode + reqUOM)
}

function HasJsonTempQuoDtls(itemCode, reqUOM) {
    return jsonQuoDtls.findIndex(i => (i.itemCode + i.UOM) == itemCode + reqUOM)
}

function FilterJsonDelDtls(itemCode, UOM) {
    return jsonDelDtls.filter(i => (i.itemCode + i.ReqUOM) != itemCode + UOM)
}

function FilterJsonBdgtChkDtls(itemCode, UOM) {
    return jsonBdgtChk.filter(i => (i.itemCode + i.UOM) != itemCode + UOM)
}

function FilterjsonViewConsoDetails(itemCode, UOM) {
    return jsonViewConsoDetails.filter(i => (i.itemCode + i.uom) != itemCode + UOM)
}

function FilterJsonQuoDtls(itemCode, UOM) {
    return jsonQuoDtls.filter(i => (i.itemCode + i.UOM) != itemCode + UOM)
}

function FilterJsonAllocChkDtls(itemCode, UOM, bdgtSegCode) {
    return jsonAllocChk.filter(i => (i.itemCode + i.UOM + i.bdgtSegCode) != itemCode + UOM + bdgtSegCode)
}


function FilterJsonAllocChkFnl(itemCode, UOM) {
    return jsonAllocChkFnl.filter(i => (i.itemCode + i.UOM) != itemCode + UOM)
}

//Saving in Json Strings Delivery Details
function SaveJsonDelDtls(docno, itemCode, reqUOM) {
    //Filter Data
    jsonDelDtls = FilterJsonDelDtls(itemCode, reqUOM)

    for (var i = 0; i < jsonDelDtlsFiltered.length; i++) {
        var Store = {};

        Store["docno"] = jsonDelDtlsFiltered[i].docno;
        Store["itemCode"] = jsonDelDtlsFiltered[i].itemCode;
        Store["ReqUOM"] = jsonDelDtlsFiltered[i].ReqUOM;
        Store["lineID"] = jsonDelDtlsFiltered[i].lineID;
        Store["dtslineID"] = jsonDelDtlsFiltered[i].dtslineID;
        Store["rownum"] = jsonDelDtlsFiltered[i].rownum;
        Store["splitQty"] = jsonDelDtlsFiltered[i].splitQty;
        Store["deliveryDate"] = jsonDelDtlsFiltered[i].deliveryDate;
        Store["location"] = jsonDelDtlsFiltered[i].location;
        Store["locationDesc"] = jsonDelDtlsFiltered[i].locationDesc;
        Store["subLocation"] = jsonDelDtlsFiltered[i].subLocation;
        Store["subLocationDesc"] = jsonDelDtlsFiltered[i].subLocationDesc;
        Store["DeliveryAddress"] = jsonDelDtlsFiltered[i].DeliveryAddress;
        Store["DelRecipientCode"] = jsonDelDtlsFiltered[i].DelRecipientCode;
        Store["DelRecipientDesc"] = jsonDelDtlsFiltered[i].DelRecipientDesc;
        Store["btnSOH"] = jsonDelDtlsFiltered[i].btnSOH;
        Store["hasSOH"] = jsonDelDtlsFiltered[i].hasSOH;

        jsonDelDtls.push(Store);
    }
}

//Saving in Json Strings Budget Checking Details
function SaveJsonBdgtChkDtls(itemCode, reqUOM) {
    //Filter Data
    jsonBdgtChk = FilterJsonBdgtChkDtls(itemCode, reqUOM)


    var tempJson = jsonBdgtChkFiltered.filter(i => (i.itemCode + i.UOM) == itemCode + reqUOM)

    var Store = {};
    for (var i = 0; i < tempJson.length; i++) {

        Store = {};
        Store["itemCode"] = tempJson[i].itemCode;
        Store["UOM"] = tempJson[i].UOM;
        Store["lineID"] = tempJson[i].lineID;
        Store["dtslineID"] = tempJson[i].dtslineID;
        Store["rownum"] = tempJson[i].rownum;
        Store["qty"] = tempJson[i].qty;
        Store["amountVatex"] = parseFloat(tempJson[i].amountVatex.replace(/,/g, ''));
        Store["percentage"] = tempJson[i].percentage;
        Store["seg2Code"] = tempJson[i].seg2Code;
        Store["seg2Desc"] = tempJson[i].seg2Desc;
        Store["seg3Code"] = tempJson[i].seg3Code;
        Store["seg3Desc"] = tempJson[i].seg3Desc;
        Store["seg4Code"] = tempJson[i].seg4Code;
        Store["seg4Desc"] = tempJson[i].seg4Desc;
        Store["seg5Code"] = tempJson[i].seg5Code;
        Store["seg5Desc"] = tempJson[i].seg5Desc;
        Store["seg6Code"] = tempJson[i].seg6Code;
        Store["seg6Desc"] = tempJson[i].seg6Desc;
        Store["hasAlloc"] = tempJson[i].hasAlloc;
        Store["reqAlloc"] = tempJson[i].reqAlloc;
        Store["remQty"] = tempJson[i].remQty;
        Store["remBdgt"] = tempJson[i].remBdgt;

        Store["seg1Bdgt"] = tempJson[i].seg1Bdgt;
        Store["seg1DescBdgt"] = tempJson[i].seg1DescBdgt;

        Store["seg2Bdgt"] = tempJson[i].seg2Bdgt;
        Store["seg2DescBdgt"] = tempJson[i].seg2DescBdgt;

        Store["seg3Bdgt"] = tempJson[i].seg3Bdgt;
        Store["seg3DescBdgt"] = tempJson[i].seg3DescBdgt;

        Store["seg4Bdgt"] = tempJson[i].seg4Bdgt;
        Store["seg4DescBdgt"] = tempJson[i].seg4DescBdgt;

        Store["seg5Bdgt"] = tempJson[i].seg5Bdgt;
        Store["seg5DescBdgt"] = tempJson[i].seg5DescBdgt;

        Store["seg6Bdgt"] = tempJson[i].seg6Bdgt;
        Store["seg6DescBdgt"] = tempJson[i].seg6DescBdgt;

        Store["itemGrpTypeBdgt"] = tempJson[i].itemGrpTypeBdgt;
        Store["itemGrpTypeDescBdgt"] = tempJson[i].itemGrpTypeDescBdgt;

        Store["itemCodeBdgt"] = tempJson[i].itemCodeBdgt;
        Store["itemDescBdgt"] = tempJson[i].itemDescBdgt;

        Store["itemLevelBdgt"] = tempJson[i].itemLevelBdgt;
        Store["itemLevelDescBdgt"] = tempJson[i].itemLevelDescBdgt;

        Store["tempQty"] = tempJson[i].tempQty;
        Store["tempAmnt"] = tempJson[i].tempAmnt;
        Store["tempPrcnt"] = tempJson[i].tempPrcnt;
        Store["tagPC"] = tempJson[i].tagPC;
        Store["tagCC"] = tempJson[i].tagCC;
        Store["tagPerQty"] = tempJson[i].tagPerQty;
        Store["currency"] = tempJson[i].currency;

        jsonBdgtChk.push(Store);

        StoreUniqueViewConsoDetails(tempJson, itemCode, reqUOM);
    }

    //Save All Allocation Details in Allocation final Json
    var AllocFnl = {};

    if (jsonAllocChk.length > 0) {
        jsonAllocChkFnl = FilterJsonAllocChkFnl(itemCode, reqUOM)
        for (var i = 0; i < jsonAllocChk.length; i++) {
            AllocFnl = {};

            AllocFnl["itemCode"] = jsonAllocChk[i].itemCode;
            AllocFnl["bdgtSegCode"] = jsonAllocChk[i].bdgtSegCode;
            AllocFnl["UOM"] = jsonAllocChk[i].UOM;
            AllocFnl["lineID"] = jsonAllocChk[i].lineID;
            AllocFnl["dtslineID"] = jsonAllocChk[i].dtslineID;
            AllocFnl["rownum"] = jsonAllocChk[i].rownum;
            AllocFnl["qty"] = jsonAllocChk[i].qty;
            AllocFnl["amountVatex"] = parseFloat(String(jsonAllocChk[i].amountVatex).replace(/,/g, ''));
            AllocFnl["percentage"] = jsonAllocChk[i].percentage;
            AllocFnl["seg2Code"] = jsonAllocChk[i].seg2Code;
            AllocFnl["seg2Desc"] = jsonAllocChk[i].seg2Desc;
            AllocFnl["seg3Code"] = jsonAllocChk[i].seg3Code;
            AllocFnl["seg3Desc"] = jsonAllocChk[i].seg3Desc;
            AllocFnl["seg4Code"] = jsonAllocChk[i].seg4Code;
            AllocFnl["seg4Desc"] = jsonAllocChk[i].seg4Desc;
            AllocFnl["seg5Code"] = jsonAllocChk[i].seg5Code;
            AllocFnl["seg5Desc"] = jsonAllocChk[i].seg5Desc;

            jsonAllocChkFnl.push(AllocFnl);
        }

        jsonAllocChk = [];
    }

}

//Saving in Json Strings Quotation Details
function SaveJsonQuoDtls(itemCode, reqUOM) {
    //Filter Data
    jsonQuoDtls = FilterJsonQuoDtls(itemCode, reqUOM)

    var tempJson = jsonQuoDtlsFiltered.filter(i => (i.itemCode + i.UOM) == itemCode + reqUOM);

    for (var i = 0; i < tempJson.length; i++) {
        var Store = {};

        Store["itemCode"] = tempJson[i].itemCode;
        Store["UOM"] = tempJson[i].UOM;
        Store["vatex"] = tempJson[i].vatex;
        Store["vatin"] = tempJson[i].vatin;
        Store["code"] = tempJson[i].code;
        Store["name"] = tempJson[i].name;
        Store["contactPerson"] = tempJson[i].contactPerson;
        Store["contact"] = tempJson[i].contact;
        Store["termCode"] = tempJson[i].termCode;
        Store["termDesc"] = tempJson[i].termDesc;
        Store["isPrefVendor"] = tempJson[i].isPrefVendor;
        Store["isNonVat"] = tempJson[i].isNonVat;
        Store["isVat"] = tempJson[i].isVat;
        Store["lineID"] = tempJson[i].lineID;

        jsonQuoDtls.push(Store);
    }
}

$(document).on('click', '#btnApplyToOneLocSave', function () {
    var GridDeliveryID = nwGridConDeliveryID_Book.ActiveSheet;
    var rowDeliveryID = GridDeliveryID.CellSelected.row - 1;
    var gridRow = GridDeliveryID.GetMaxRow();

    for (var i = 0 ; i < gridRow; i++) {
        var code = GridDeliveryID.GetText(GRD_DD_SPLITQTY - 1, i);
        if (code != '') {
            GridDeliveryID.SetText(GRD_DD_DELLOCCODE - 1,rowDeliveryID, $('#idvallugApplyToOneLoc_DelLoc').val());
            GridDeliveryID.SetText(GRD_DD_DELLOCDESC - 1,rowDeliveryID, $('#descvallugApplyToOneLoc_DelLoc').val());
            GridDeliveryID.SetText(GRD_DD_SUBLOCCODE - 1,rowDeliveryID, $('#idvallugApplyToOneLoc_Subloc').val());
            GridDeliveryID.SetText(GRD_DD_SUBLOCDESC - 1,rowDeliveryID, $('#descvallugApplyToOneLoc_Subloc').val());
            GridDeliveryID.SetText(GRD_DD_DELADDRESS - 1,rowDeliveryID, $('#txtApplyToOneLoc_DelAddr').val());
        }
    }

    nwPopupForm_HideModal("frmApplyToOneLoc");
});


$(document).on('click', '#btnSingleDelDtls', function () {
    var LocForm = $('#idvallugLocForm').val();
    var Currency = $('#idvallugCurrency').val();

    var prompt = ''

    if (LocForm == '' && Supplier == '' && Currency == '') {
        prompt = "Cannot proceed. Please complete the header details.";
    }
    else if (LocForm == '') {
        prompt = "Cannot proceed. Location with Accountable Forms is required.";
    }

    else if (Currency == '') {
        prompt = "Cannot proceed. Currency is required.";
    }

    var isEmpty = true;
    //Check if has Line Details
    var cnt = 0;
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for (i = 0; i <= maxRow; i++) {
        cnt++;

        var itemGrpType = Grid.GetText(Main.GRD_ITEMGRPTYPE_CODE - 1, i);
        var itemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, i);
        var uom = Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, i);
        var qty = Grid.GetText(Main.GRD_REQ_QTY - 1, i).replace(/,/g, '') || 0;

        if (itemGrpType != '' || itemCode != '' || uom != '' || parseFloat(qty) > 0) {
            isEmpty = false;

            if (itemCode == '') {
                prompt += `Cannot proceed. Item Code is required in row ${cnt}. \n`;
            }

            if (uom == '') {
                prompt += `Cannot proceed. Request UOM is required in row ${cnt}. \n`;
            }

            if (parseFloat(qty) <= 0) {
                prompt += `Cannot proceed. Requested Quantity is required in row ${cnt}. \n`;
            }
        }

    }

    if (isEmpty) {
        prompt = "Cannot proceed. At least one Line detail is required.";
    }

    if (prompt == '') {
        nwLoading_Start("nwSingleLoading", crLoadingHTML);
        nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
        nwParameter_Add("idvallugCreatorCustodian", $('#idvallugCreatorCustodian').val());
        nwPopupForm_ShowModal("nwSingleDelDetailsWindow");
        func_ActionDriven("actSingleDelDetails", false);
    }
    else {
        MessageBox(prompt, MenuItemTitle, 'error');
    }
});

$(document).on('click', '#btnSingleDelDtlsCon', function () {
    var LocForm = $('#idvallugLocForm').val();
    var Currency = $('#idvallugCurrency').val();

    var prompt = ''

    if (LocForm == '' && Supplier == '' && Currency == '') {
        prompt = "Cannot proceed. Please complete the header details.";
    }
    else if (LocForm == '') {
        prompt = "Cannot proceed. Location with Accountable Forms is required.";
    }

    else if (Currency == '') {
        prompt = "Cannot proceed. Currency is required.";
    }

    var isEmpty = true;
    //Check if has Line Details
    var cnt = 0;
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for (i = 0; i <= maxRow; i++) {
        cnt++;

        var itemGrpType = Grid.GetText(SPR_ITEMGRPTYPE_CODE - 1, i);
        var itemCode = Grid.GetText(SPR_ITEMCODE - 1, i);
        var uom = Grid.GetText(SPR_REQ_UOM_CODE - 1, i);
        var qty = Grid.GetText(SPR_REQ_QTY - 1, i).replace(/,/g, '') || 0;

        if (itemGrpType != '' || itemCode != '' || uom != '' || parseFloat(qty) > 0) {
            isEmpty = false;

            if (itemCode == '') {
                prompt += `Cannot proceed. Item Code is required in row ${cnt}. \n`;
            }

            if (uom == '') {
                prompt += `Cannot proceed. Request UOM is required in row ${cnt}. \n`;
            }

            if (parseFloat(qty) <= 0) {
                prompt += `Cannot proceed. Requested Quantity is required in row ${cnt}. \n`;
            }
        }

    }

    if (isEmpty) {
        prompt = "Cannot proceed. At least one Line detail is required.";
    }

    if (prompt == '') {
        nwLoading_Start("nwSingleLoading", crLoadingHTML);
        nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
        nwParameter_Add("idvallugCreatorCustodian", $('#idvallugCreatorCustodian').val());
        nwPopupForm_ShowModal("nwSingleDelDetailsWindow");
        func_ActionDriven("actSingleDelDetails", false);
    }
    else {
        MessageBox(prompt, MenuItemTitle, 'error');
    }
});



$(document).on('click', '#btnPaymentComponents', function () {
    var LocForm = $('#idvallugLocForm').val();
    var Currency = $('#idvallugCurrency').val();

    var prompt = ''

    if (LocForm == '' && Supplier == '' && Currency == '') {
        prompt = "Cannot proceed. Please complete the header details.";
    }
    else if (LocForm == '') {
        prompt = "Cannot proceed. Location with Accountable Forms is required.";
    }

    else if (Currency == '') {
        prompt = "Cannot proceed. Currency is required.";
    }

    if (prompt == '') {
        nwLoading_Start("nwPaymentComponent", crLoadingHTML);
        nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
        nwParameter_Add("idvallugCreatorCustodian", $('#idvallugCreatorCustodian').val());
        nwParameter_Add("txtDocno", $('#txtDocno').val());
        nwPopupForm_ShowModal("nwPaymentComponentWindow");
        func_ActionDriven("actPaymentComponent", false);
    }
    else {
        MessageBox(prompt, MenuItemTitle, 'error');
    }
});

$(document).on('click', '#btnSingleDel', function () {
    if (nwDocno != '') return;

    msgBoxContainerQuestion = "isSingleDelivery";
    parent_MessageBoxQuestion("Would you like to save the current record?", "Single Delivery Window", "Question");

    return false;
});

function InsertInDeliveryDtls() //Function used to insert in temp delivery upon clicking Single Delivery
{
    var Store = {};
    var itemCode = "";
    var uom = "";
    var docno = "";
    var lineID = "";
    jsonDelDtls = [];
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    var GridSingleDel = nwGridConSingleDel_Book.ActiveSheet;
    var rowSingleDel = GridSingleDel.CellSelected.row - 1;


    for (i = 0; i <= maxRow; i++) {
        Store = {};

        if (Grid.GetText(Main.GRD_ITEMCODE, i) != "") {
            Store["docno"] = $('#txtDocno').val();
            Store["itemCode"] = Grid.GetText(Main.GRD_ITEMCODE - 1, i);
            Store["ReqUOM"] = Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, i);
            Store["lineID"] = Grid.GetText(Main.GRD_LINEID - 1, i);
            Store["dtslineID"] = "1";
            Store["rownum"] = "1";
            Store["splitQty"] = Grid.GetText(Main.GRD_REQ_QTY - 1, i);
            Store["deliveryDate"] = GridSingleDel.GetText(GRD_SD_DELDATE - 1, 0);
            Store["location"] = GridSingleDel.GetText(GRD_SD_DELLOCODE - 1, 0);
            Store["locationDesc"] = GridSingleDel.GetText(GRD_SD_DELLOCDESC - 1, 0);
            Store["subLocation"] = GridSingleDel.GetText(GRD_SD_SUBLOCCODE - 1, 0);
            Store["subLocationDesc"] = GridSingleDel.GetText(GRD_SD_SUBLOCDESC - 1, 0);
            Store["DeliveryAddress"] = GridSingleDel.GetText(GRD_SD_DELADDRESS - 1, 0);
            Store["DelRecipientCode"] = GridSingleDel.GetText(GRD_SD_DELRECIPIENTCODE - 1, 0);
            Store["DelRecipientDesc"] = GridSingleDel.GetText(GRD_SD_DELRECIPIENT - 1, 0);
            Store["btnSOH"] = "";
            Store["hasSOH"] = "";

            jsonDelDtls.push(Store);
            setDelDtlProperties(i, false);
        }

    }
    nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls));
    nwPopupForm_HideModal('nwSingleDelDetailsWindow');
}

function MoneyFormat(num, decimal) {
    if (isNaN(num)) {
        num = 0;
    }

    return parseFloat(num).toFixed(decimal).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function ComputeTotalReqVatin() {
    var totalAmnt = 0.00;
    var totalAmntVatex = 0.00;

    var vatin = 0.00;
    var vatex = 0.00;

    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for (i = 0; i <= maxRow; i++) {
        vatin = Grid.GetText(Main.GRD_TOTAL_AMNT_VATIN - 1, i);
        vatex = Grid.GetText(Main.GRD_TOTAL_AMNT_VATEX - 1, i);

        totalAmnt += vatin == "" ? 0.00 : parseFloat(RemoveComma(vatin));
        totalAmntVatex += vatex == "" ? 0.00 : parseFloat(RemoveComma(vatex));

    }

    $('#txtTotReqAmnt').val(MoneyFormat(totalAmnt, 2));
    $('#txtTotReqAmntVatex').val(MoneyFormat(totalAmntVatex, 2));

}

function ComputeTotalReqVatinNon() {
    var totalAmnt = 0.00;
    var totalAmntVatex = 0.00;

    var vatin = 0.00;
    var vatex = 0.00;

    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for (i = 0; i <= maxRow; i++) {
        vatin = Grid.GetText(SPR_TOTAL_AMNT_VATIN - 1, i);
        vatex = Grid.GetText(SPR_TOTAL_AMNT_VATEX - 1, i);

        totalAmnt += vatin == "" ? 0.00 : parseFloat(RemoveComma(vatin));
        totalAmntVatex += vatex == "" ? 0.00 : parseFloat(RemoveComma(vatex));

    }

    $('#txtTotReqAmnt').val(MoneyFormat(totalAmnt, 2));
    $('#txtTotReqAmntVatex').val(MoneyFormat(totalAmntVatex, 2));

}


function ClearAllJSONStrings(isClearViewConsoDetails) {
    jsonDelDtls = [];
    jsonDelDtlsFiltered = [];
    jsonQuoDtls = [];
    jsonQuoDtlsFiltered = [];
    jsonBdgtChk = [];
    jsonBdgtChkFiltered = [];

    jsonAllocChk = [];
    jsonAllocChkFiltered = [];
    jsonAllocChkFnl = [];

    if (isClearViewConsoDetails == "1") {
        jsonViewConsoDetails = [];
    }
}

function ChkIfHasData() //Upon Refreshing Checking of All Pop Up Details
{
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();


    for(i = 0; i <= maxRow; i++) {

        //has delivery details
        if (Grid.GetText(Main.GRD_PENDINGDLVYDTLS- 1, i) != "") {
            setDelDtlProperties(i, true);
        }


        //without delivery details
        if (Grid.GetText(Main.GRD_PENDINGBDGTCHK - 1, i) == "") {//without pending budget details
            if (Grid.GetText(Main.GRD_HASBDGTCHK - 1, i) != "") {//has budget details
                setBdgtChkProperties(i, false);
            }
            else {
                //enable upon refresh
                Grid.SetBackground(Main.GRD_BDGT_CHK_DTLS - 1, Spread_ALLROW, '#2689d8');
            }
        }
        else if (Grid.GetText(Main.GRD_PENDINGBDGTCHK - 1, i) != "") {  //has pending budget details
            setBdgtChkProperties(i, true);
        }

        else if (Grid.GetText(Main.GRD_HASBDGTCHK - 1, i) != "") { //has budget check
            setBdgtChkProperties(i, false);
        }
        else {
            //enable upon refresh
            Grid.SetBackground(Main.GRD_BDGT_CHK_DTLS - 1, Spread_ALLROW, '#2689d8');
        }


        //has quotation details
        if (Grid.GetText(Main.GRD_HASQUOLDTLS- 1, i) != "") {
            setDelQuoProperties(i);
        }

        //has 
        if (Grid.GetText(Main.GRD_HASSOH- 1, i) != "") {
            Grid.SetBackground(Main.GRD_SOH_DTLS - 1, i, "green");
        }
        else {
            Grid.SetBackground(Main.GRD_SOH_DTLS - 1, i, "gainsboro");
        }

        //has line remarks
        if (Grid.GetText(Main.GRD_SPECNOTES - 1, i) != "") {
            Grid.SetBackground(Main.GRD_SPECNOTES - 1, i, "green");
        }
        else {

            if (Grid.GetText(Main.GRD_ITEMCODE- 1, i) != "") {
                Grid.SetBackground(Main.GRD_SPECNOTES - 1, i, "#2689d8");
            }
            else {
                Grid.SetBackground(Main.GRD_SPECNOTES - 1, i, "gainsboro");
            }
        }

        //has requirement compliance line details
        if (Grid.GetText(Main.GRD_HAS_REQCOMP - 1, i) == true) {
            Grid.SetBackground(Main.GRD_REQ_COMPLIANCE - 1, i, "green");
        }
        else {
            Grid.SetBackground(Main.GRD_REQ_COMPLIANCE - 1, i, "orange");
        }

        //has delivery details
        if (Grid.GetText(Main.GRD_HASDELDTLS - 1, i) == true || Grid.GetText(Main.GRD_HASDELDTLS - 1, i) == "1") {
            Grid.SetBackground(Main.GRD_DEL_DTLS - 1, i, "green");
        }
        else {
            Grid.SetBackground(Main.GRD_DEL_DTLS - 1, i, "orange");
        }

        //Disable Non-Vat
        var isLoadNonVat = Grid.GetText(Main.GRD_ISLOADNONVAT- 1, i) == "1" ? true : false;
        if (isLoadNonVat) {
            Grid.SetEnable(Main.GRD_NONVAT - 1, i, false);
        }
        else {
            Grid.SetEnable(Main.GRD_NONVAT - 1, i, true);
        }

    }

    
    $('#nwGridConNonCatalogue').addClass('nwHide');
    $('#CatalogueGrid').removeClass('nwHide');
    DisplayIfConsumption();
    SublocFunction();

    setTimeout(function () {
            nwDocnoDisabled();
    }, 500);
}

function ChkIfHasDataNon() //Upon Refreshing Checking of All Pop Up Details
{
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();


    for (i = 0; i <= maxRow; i++) {

        if (Grid.GetText(SPR_HASBDGTCHK - 1, i) != "") { //has budget check
            setBdgtChkProperties(i, false);
        }
        else {
            //enable upon refresh
            Grid.SetBackground(SPR_BDGT_CHK_DTLS - 1, Spread_ALLROW, '#2689d8');
        }


        //has quotation details
        if (Grid.GetText(SPR_HASQUOLDTLS - 1, i) != "") {
            setDelQuoPropertiesNon(i);
        }

        //has line remarks
        if (Grid.GetText(SPR_SPECNOTES - 1, i) != "") {
            Grid.SetBackground(SPR_SPECNOTES - 1, i, "green");
        }
        else {

            if (Grid.GetText(SPR_ITEMCODE - 1, i) != "") {
                Grid.SetBackground(SPR_SPECNOTES - 1, i, "#2689d8");
            }
            else {
                Grid.SetBackground(SPR_SPECNOTES - 1, i, "gainsboro");
            }
        }

        //has requirement compliance line details
        if (Grid.GetText(SPR_HAS_REQCOMP - 1, i) == true) {
            Grid.SetBackground(SPR_REQ_COMPLIANCE - 1, i, "green");
        }
        else {
            Grid.SetBackground(SPR_REQ_COMPLIANCE - 1, i, "orange");
        }

        //has delivery details
        if (Grid.GetText(SPR_HASDELDTLS - 1, i) == true || Grid.GetText(SPR_HASDELDTLS - 1, i) == "1") {
            Grid.SetBackground(SPR_DEL_DTLS - 1, i, "green");
        }
        else {
            Grid.SetBackground(SPR_DEL_DTLS - 1, i, "orange");
        }
    }


    $('#CatalogueGrid').addClass('nwHide');
    $('#nwGridConNonCatalogue').removeClass('nwHide');
    DisplayIfConsumption();

    setTimeout(function () {
            nwDocnoDisabledNon();
    }, 500);
}


function GetFilterProfitCenter() {
    var filter = "";
    var col = $('#txtBdgtchk_PC').val();
    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();

    for (i = 0; i <= cntBgtChkLIN; i++) {

        if (filter != "")
            filter += "|";

        filter += GridBgtChkLIN.GetText(col, i);
    }

    return filter;
}

$(document).on('click', '.nwGButton', function () {
    $('.nwgrid_Delete').click();
});



$(document).on('change', '.BclQty', function () {
    

});



function ComputeAllocAmnt(allocQty, vatex) {
    return parseFloat((allocQty * vatex)).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function ComputeAllocQty(allocVatex, unitCostVatex) {
    return parseFloat((allocVatex / unitCostVatex)).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

function ComputeBdgtAllocAmnt(allocQty, totalQty, totalvatex) {
    allocQty = parseFloat(RemoveComma(allocQty));
    totalQty = parseFloat(RemoveComma(totalQty));
    totalvatex = parseFloat(RemoveComma(totalvatex));

    return MoneyFormat(totalvatex / (totalQty / allocQty), 2);

}




$(document).on('click', '#btnBdgtCheck', function () {
    msgBoxContainerQuestion = "isSaveBdgtCheck";
    $('#Message_Cancel').hide();
    parent_MessageBoxQuestion("Do you want to save the record?", "Charging Details Window", "Question");
});

$(document).on('click', '.btnLoadFrmValidHist', function () {
    $('#txtDRDateFrom').val('');
    $('#txtDRDateTo').val('');

    var error = ""
    if ($('#idvallugLocForm').val() == "") {
        error += "Cannot proceed. Location with Accountable forms is required. \n"
    }

    if ($('#idvallugCostCenter').val() == "") {
       error += `Cannot proceed. ${getCostCenter()} is required. \n`
    }

    if (error != "") {
        MessageBox(error, MenuItemTitle, 'error');
        return false;
    }

    InitializeDateRange();
    nwPopupForm_ShowModal('nwDateRange');

    return false;
});

function InitializeDateRange() {
    var today = new Date();
    var month = today.getMonth() + 1;

    $(`#txtDRDateFrom`).val(('0' + (today.getMonth() + 1)).slice(-2) + '/' + '01' + '/' + today.getFullYear());
    $(`#txtDRDateTo`).val(('0' + (today.getMonth() + 1)).slice(-2) + '/' + ('0' + today.getDate()).slice(-2) + '/' + today.getFullYear());

}

$(document).on('click', '#btnDROk', function () {
    var errmsg = "";

    if ($('#txtDRDateFrom').val() == "") {
        errmsg += "Cannot proceed. From Date is required. \n";
    }

    if ($('#txtDRDateTo').val() == "") {
        errmsg += "Cannot proceed. To Date is required. \n";
    }

    if (errmsg != "") {
        MessageBox(errmsg, "Date Range", 'error');
        return false;
    }

    nwLoading_Start('nwSelectTransLoading', crLoadingHTML)
    nwParameter_Add("txtDRDateFrom", $('#txtDRDateFrom').val());
    nwParameter_Add("txtDRDateTo", $('#txtDRDateTo').val());
    nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
    nwParameter_Add("idvallugCostCenter", $('#idvallugCostCenter').val());
    nwParameter_Add("txtReqObjectiveCode", $('#txtReqObjectiveCode').val());
    nwParameter_Add("idvallugRsnForRequest", $('#idvallugRsnForRequest').val());
    nwParameter_Add("txtNOAccessReqrep", $('#txtNOAccessReqrep').val());
    nwPopupForm_ShowModal('nwSelectTransaction');
    func_ActionDriven("actSelectTransaction", false);
    return false;
});

$(document).on('click', '#btnReqCompliance', function () {
    var trantype = $('#txtTrantype').val();
    var docno = $('#txtDocno').val();
    var isView = nwDocno != "" ? true : false;

    if (docno == "") {
        MessageBox("Cannot proceed. Data should be saved first", MenuItemTitle, 'error');
        return false;
    }

    var fullength = GetCurrentURL() + `../DCRequirementCompliance?TransactionNo=${encodeURI(docno)}&TranType=${encodeURI(trantype)}&isView=${encodeURI(isView)}`;

    nwLoading_Start('xReqCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
    $('#nwPopUpRequireCompliance .modal-hdr-title').text("Requirements Compliance");
    nwPopupForm_ShowModal("nwPopUpRequireCompliance");
    nwLoading_End('xReqCompliance');
});


//Saving in Json Strings Allocation Checking Details
function SaveJsonAllocChkDtls(itemCode, reqUOM, bdgtSegCode) {
    //Filter Data
    jsonAllocChk = FilterJsonAllocChkDtls(itemCode, reqUOM, bdgtSegCode)

    var tempJson = jsonAllocChkFiltered.filter(i => (i.itemCode + i.UOM + i.bdgtSegCode) == itemCode + reqUOM + bdgtSegCode)

    for (var i = 0; i < tempJson.length; i++) {
        var Store = {};

        Store["itemCode"] = tempJson[i].itemCode;
        Store["bdgtSegCode"] = tempJson[i].bdgtSegCode;
        Store["UOM"] = tempJson[i].UOM;
        Store["lineID"] = tempJson[i].lineID;
        Store["dtslineID"] = tempJson[i].dtslineID;
        Store["rownum"] = tempJson[i].rownum;
        Store["qty"] = tempJson[i].qty;
        Store["amountVatex"] = parseFloat(tempJson[i].amountVatex.replace(/,/g, ''));
        Store["percentage"] = tempJson[i].percentage;
        Store["seg2Code"] = tempJson[i].seg2Code;
        Store["seg2Desc"] = tempJson[i].seg2Desc;
        Store["seg3Code"] = tempJson[i].seg3Code;
        Store["seg3Desc"] = tempJson[i].seg3Desc;
        Store["seg4Code"] = tempJson[i].seg4Code;
        Store["seg4Desc"] = tempJson[i].seg4Desc;
        Store["seg5Code"] = tempJson[i].seg5Code;
        Store["seg5Desc"] = tempJson[i].seg5Desc;
        jsonAllocChk.push(Store);
    }
}

function setAllocChkProperties(row) {
    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    GridBgtChkLIN.SetBackground(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, row).enable("green");
    GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, row, "1");
}

function GetAllocFilterProfitCenter() {
    var filter = "";
    var col = $('#txtBdgtchk_PC').val();

    var GridAllocProcess = nwGridConAllocProcess_Book.ActiveSheet;
    var cntAllocProcess = GridAllocProcess.GetMaxRow();

    for(i = 0; i <= cntAllocProcess; i++) {
        var $row = $(n);

        if (filter != "")
            filter += "|";

        filter += GridAllocProcess.SetText(col, i);
    }

    return filter;
}

$(document).on('click', '#btnAllocProcess', function () {
    msgBoxContainerQuestion = "isSaveAllocCheck";
    parent_MessageBoxQuestion("Do you want to save the record?", "Allocation Details", "Question");
});




function HasDataUponBdgtChk() {
    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();

    var hasData = "";
    for(i = 0; i <= cntBgtChkLIN; i++)  {
        hasData = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_HASALLOC - 1, i)
        if (hasData != "") {
            GridBgtChkLIN.SetBackground(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, i, 'green');
        }
        else {
            GridBgtChkLIN.SetBackground(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, i, '#2689d8');
        }

    }

    var profitcenter = nwGridConBgtChkLIN_Book.ActiveSheet.GetText(4, 0);
    var profitcenterdesc = nwGridConBgtChkLIN_Book.ActiveSheet.GetText(5, 0);
    var itemgroup = nwGridConBgtChkHeader_Book.ActiveSheet.GetText(8, 0);
    var itemgroupdesc = nwGridConBgtChkHeader_Book.ActiveSheet.GetText(9, 0);
    var itemgrouptype = nwGridConBgtChkHeader_Book.ActiveSheet.GetText(13, 0);
    var itemLevel = nwGridConBgtChkHeader_Book.ActiveSheet.GetText(14, 0);
    var item = nwGridConBgtChkHeader_Book.ActiveSheet.GetText(15, 0);

    nwGridConBgtChkDetails_Book.ActiveSheet.SetText(2, 0, $('#idvallugLocForm').val());
    nwGridConBgtChkDetails_Book.ActiveSheet.SetText(3, 0, $('#descvallugLocForm').val());
    nwGridConBgtChkDetails_Book.ActiveSheet.SetText(4, 0, profitcenter);
    nwGridConBgtChkDetails_Book.ActiveSheet.SetText(5, 0, profitcenterdesc);
    nwGridConBgtChkDetails_Book.ActiveSheet.SetText(8, 0, itemgroup);
    nwGridConBgtChkDetails_Book.ActiveSheet.SetText(9, 0, itemgroupdesc);
    nwGridConBgtChkDetails_Book.ActiveSheet.SetText(12, 0, itemgrouptype);
    nwGridConBgtChkDetails_Book.ActiveSheet.SetText(13, 0, itemLevel);
    nwGridConBgtChkDetails_Book.ActiveSheet.SetText(14, 0, item);

    DisableIfReplishment();
    ChkIfRequieAlloc();
    if ($('#txtTrantype').val() == "REQNON") {
        LoadedIfReplenishmentNon();
    }
    else {
        LoadedIfReplenishment();
    }
    ComputationForBdgtChckDetails();
    ComputeBdgtPrcnt();
    AddClassForGridButtons();
}

function DisableIfReplishment() {
    $('#btnBdgtCheck').enable(true);

    if ($('#txtTrantype').val() == "REQREP") {
        $('#btnBdgtCheck').enable(false);
        $('#nwGridConBgtChkLIN').enable(false);
    }
}

function LoadedIfReplenishment() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;


    if ($('#txtTrantype').val() == "REQREP" || getProfitCenter() == "") {
        var row = $('#txtBdgtchk_RowNum').val();
        var allocQty = parseFloat(RemoveComma(Grid.GetText(Main.GRD_REQ_QTY - 1, row)));
        var vatex = $('#txtBdgtchk_UnitCostVatex').val() != "" ? parseFloat(RemoveComma($('#txtBdgtchk_UnitCostVatex').val())) : 0.00;
        $('#btnBdgtCheck').enable(false);

        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, 0, MoneyFormat(allocQty, 2));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, _crnwTRTemp, ComputeAllocAmnt(allocQty, vatex));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, 0, MoneyFormat(100, 11));
        DisplayBdgtCombinationAndChecking(GridBgtChkLIN, row);
    } else {
        $('#btnBdgtCheck').enable(true);
    }
}

function LoadedIfReplenishmentNon() {
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;


    if ($('#txtTrantype').val() == "REQREP" || getProfitCenter() == "") {
        var row = $('#txtBdgtchk_RowNum').val();
        var allocQty = parseFloat(RemoveComma(Grid.GetText(SPR_REQ_QTY - 1, row)));
        var vatex = $('#txtBdgtchk_UnitCostVatex').val() != "" ? parseFloat(RemoveComma($('#txtBdgtchk_UnitCostVatex').val())) : 0.00;
        $('#btnBdgtCheck').enable(false);

        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, 0, MoneyFormat(allocQty, 2));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, _crnwTRTemp, ComputeAllocAmnt(allocQty, vatex));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, 0, MoneyFormat(100, 11));
        DisplayBdgtCombinationAndChecking(GridBgtChkLIN, row);
    } else {
        $('#btnBdgtCheck').enable(true);
    }
}


function VwBdgtChk() {
    $('#btnBdgtCheck').enable(false);
    $('#nwGridConBgtChkLIN').enable(false);
}

function VwAllocProcess() {
    $('#btnAllocProcess').enable(false);

    Grid.SetBackground(GRD_AP_SEG3CODE - 1, Spread_ALLROW, "gainsboro");
    Grid.SetBackground(GRD_AP_QTY - 1, Spread_ALLROW, "gainsboro");
    Grid.SetBackground(GRD_AP_AMNT_VATEX - 1, Spread_ALLROW, "gainsboro");
    Grid.SetBackground(GRD_AP_PERCENTAGE - 1, Spread_ALLROW, "gainsboro");
    Grid.SetBackground(GRD_AP_CLOSE - 1, Spread_ALLROW, "gainsboro");

    Grid.SetEnable(GRD_AP_SEG3CODE - 1, Spread_ALLROW, false);
    Grid.SetEnable(GRD_AP_QTY - 1, Spread_ALLROW, false);
    Grid.SetEnable(GRD_AP_AMNT_VATEX - 1, Spread_ALLROW, false);
    Grid.SetEnable(GRD_AP_PERCENTAGE - 1, Spread_ALLROW, false);
    Grid.SetEnable(GRD_AP_CLOSE - 1, Spread_ALLROW, false);
}

function changecolorSOH() {
    var Grid = nwGridConSOH_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for (var x = 0; x <= maxRow; x++) {
        var _temp = Grid.GetText(GRD_SOH_SYS_DIS - 1, i);

        if (_temp.toLowerCase() == "need replenishment") {
            Grid.SetBackground(GRD_SOH_SYS_DIS - 1, i, 'red');
        }
        else if (_temp.toLowerCase() == "still on stock") {
            Grid.SetBackground(GRD_SOH_SYS_DIS - 1, i, '#2689d8');
        }
    }

    Grid.SetText2(GRD_SOH_VWPENDINGPO - 1, Spread_ALLROW, '...');
    Grid.SetTextAlign(GRD_SOH_VWPENDINGPO - 1, Spread_ALLROW, "center");
    Grid.SetBold(GRD_SOH_VWPENDINGPO - 1, Spread_ALLROW, "bold");
    Grid.SetTextColor(GRD_SOH_VWPENDINGPO - 1, Spread_ALLROW, "white");

    DisabledViewPendingPO();
}

function DisplayIfConsumption() { //upon new
    var code = $('#txtReqObjectiveCode').val();

    if (code == 'RO02' || code == 'RO03') {
        $('#consumption_show').removeClass('nwHide');
    }
    else {
        $('#consumption_show').addClass('nwHide');
    }
}

function DisplayIfOnlyConsumption(NoAccessReqrep) {

    if (NoAccessReqrep == "1") {
        $('#consumption_show').removeClass('nwHide');
    }
    else {
        $('#consumption_show').addClass('nwHide');
    }
}

function FillGLAccntCharge() {
    //Set GL Account Charging
    var trantype = $('#txtTrantype').val();

    if (trantype == "REQCON") {
        var glCode = $('#idvallugBdgtChk_GLAccntChrge').val();
        var glDesc = $('#descvallugBdgtChk_GLAccntChrge').val();
        var row = $('#txtBdgtchk_RowNum').val();

        var Grid = nwGridCon_Book.ActiveSheet;
        Grid.SetText(Main.GRD_GLACCNTCHARGING - 1, row, glCode);
        Grid.SetText(Main.GRD_GLACCNTCHARGINGDESC - 1, row, glDesc);
    }
}



$(document).on('click', '#nwRequestObjective .BoxClose', function () {
    DisableFieldsEmpty();
});

$(document).on('click', '#btnLoadItmBelowReorderPnt', function () {
    var LocForm = $('#idvallugLocForm').val();
    var costCenter = $('#idvallugCostCenter').val();
    var prompt = ""

    if (LocForm == '' && costCenter == '') {
        prompt = `Cannot proceed. Location with Accountable and ${getCostCenter()} are required. \n`;
    }
    else if (LocForm == '') {
        prompt = "Cannot proceed. Location with Accountable Forms is required. \n";
    }

    else if (costCenter == '') {
        prompt = `Cannot proceed. ${getCostCenter()} is Required is required. \n`;
    }

    if (prompt != "") {
        MessageBox(prompt, MenuItemTitle, 'error');
        return false;
    }


    nwLoading_Start("LoadReoderPoint", crLoadingHTML);
    nwParameter_Add("txtTrantype", $('#txtTrantype').val());
    nwParameter_Add("idvallugLocForm", LocForm);
    nwParameter_Add("idvallugCostCenter", costCenter);
    nwParameter_Add("idvallugCurrency", $('#idvallugCurrency').val());
    nwParameter_Add("idvallugCreatorCustodian", $('#idvallugCreatorCustodian').val());
    nwParameter_Add("txtReasonType", $('#txtReasonType').val());
    try{
        nwParameter_Add("filter", filterItemUOM());
    }catch(ex){}

    nwParameter_Add("idvallugRsnForRequest", $('#idvallugRsnForRequest').val());
    func_ActionDriven("actLoadBelowReorderPnt", false);
});

function FillBelowReorderPoint() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();
    var unitCostVatex = '';
    var unitCostVatin = '';

    for (var i = 0; i < jsonBelowReorderPnt.length; i++) {
        Grid.SetText(Main.GRD_ITEMGRPTYPE_CODE - 1 , maxRow, jsonBelowReorderPnt[i]["itemGrpTypeCode"]);
        Grid.SetText(Main.GRD_ITEMGRPTYPE_DESC - 1 , maxRow, jsonBelowReorderPnt[i]["itemGrpTypeDesc"]);
        Grid.SetText(Main.GRD_ITEMCODE - 1 , maxRow, jsonBelowReorderPnt[i]["itemCode"]);
        Grid.SetText(Main.GRD_ITEMDESC - 1 , maxRow, jsonBelowReorderPnt[i]["itemDesc"]);
        Grid.SetText(Main.GRD_SUBLOCATION_CODE - 1 , maxRow, jsonBelowReorderPnt[i]["sublocCode"]);
        Grid.SetText(Main.GRD_SUBLOCATION_DESC - 1 , maxRow, jsonBelowReorderPnt[i]["sublocDesc"]);
        Grid.SetText(Main.GRD_DELIVERYADDRESS - 1 , maxRow, jsonBelowReorderPnt[i]["deliveryAddress"]);
        Grid.SetText(Main.GRD_REQ_QTY - 1, maxRow, jsonBelowReorderPnt[i]["EOQ"]);
        Grid.SetText(Main.GRD_REQ_UOM_CODE - 1 , maxRow, jsonBelowReorderPnt[i]["uomCode"]);
        Grid.SetText(Main.GRD_REQ_UOM_DESC - 1 , maxRow, jsonBelowReorderPnt[i]["uomDesc"]);
        Grid.SetText(Main.GRD_BASED_UOM - 1 , maxRow, jsonBelowReorderPnt[i]["basedUomCode"]);
        Grid.SetText(Main.GRD_GLACCNTCHARGING - 1 , maxRow, jsonBelowReorderPnt[i]["glAccnt"]);
        Grid.SetText(Main.GRD_GLACCNTCHARGINGDESC - 1 , maxRow, jsonBelowReorderPnt[i]["glAccntDesc"]);
        Grid.SetText(Main.GRD_INVENTORIABLE - 1 , maxRow, jsonBelowReorderPnt[i]["inventoriable"]);
        Grid.SetText(Main.GRD_NONINVENTORIABLE - 1 , maxRow, jsonBelowReorderPnt[i]["noninventoriable"]);
        Grid.SetText(Main.GRD_EOQ - 1 , maxRow, jsonBelowReorderPnt[i]["EOQ"]);
        Grid.SetText(Main.GRD_BDGT_QTY - 1 , maxRow, jsonBelowReorderPnt[i]["bdgtQty"]);
        Grid.SetText(Main.GRD_BDGT_AMNT - 1 , maxRow, jsonBelowReorderPnt[i]["bdgt"]);
        Grid.SetText(Main.GRD_TEMP_REQ_QTY - 1 , maxRow, jsonBelowReorderPnt[i]["EOQ"]);
        Grid.SetText(Main.GRD_TEMP_VATEX - 1 , maxRow, "0.00");
        Grid.SetText(Main.GRD_HASSOH - 1 , maxRow, 1);
        Grid.SetText(Main.GRD_REQ_SPEC - 1 , maxRow, jsonBelowReorderPnt[i]["ReqSpec"]);
        Grid.SetText(Main.GRD_NONVAT - 1, maxRow, jsonBelowReorderPnt[i]["chkNonVat"]);
        Grid.SetText(Main.GRD_ISLOADNONVAT - 1 , maxRow, jsonBelowReorderPnt[i]["isLoadNonVat"]);

        var isLoadNonVat = jsonBelowReorderPnt[i]["isLoadNonVat"] == "1" ? true : false;
        Grid.SetEnable(Main.GRD_NONVAT -1, row, isLoadNonVat ? false : true);
        $(`#nwGrid-nwData tr:eq(${maxRow}) td:eq(${Main.GRD_NONVAT}) input`).prop("checked", isLoadNonVat);

        //Fill Unit Costs
        unitCostVatex = jsonBelowReorderPnt[i]["unitCostVatex"] != null ? jsonBelowReorderPnt[i]["unitCostVatex"] : '';
        unitCostVatin = jsonBelowReorderPnt[i]["unitCostVatin"] != null ? jsonBelowReorderPnt[i]["unitCostVatin"] : '';

        Grid.SetText(Main.GRD_UNITCOSTVATEX - 1, maxRow, unitCostVatex);
        Grid.SetText(Main.GRD_UNITCOSTVATIN - 1, maxRow, unitCostVatin);
        Grid.SetText(Main.GRD_WEIGHTAVECOSTVATEX - 1, maxRow, jsonBelowReorderPnt[i]["wacVatex"] != null ? jsonBelowReorderPnt[i]["wacVatex"] : '');
        Grid.SetText(Main.GRD_WEIGHTAVECOSTVATIN - 1, maxRow, jsonBelowReorderPnt[i]["wacVatin"] != null ? jsonBelowReorderPnt[i]["wacVatin"] : '');
        Grid.SetText(Main.GRD_LASTPOPRICEVATIN - 1, maxRow, jsonBelowReorderPnt[i]["lastPOPriceVatin"] != null ? jsonBelowReorderPnt[i]["lastPOPriceVatin"] : '');
        Grid.SetText(Main.GRD_LASTPOPRICEVATEX - 1, maxRow, jsonBelowReorderPnt[i]["lastPOPriceVatex"] != null ? jsonBelowReorderPnt[i]["lastPOPriceVatex"] : '');
        Grid.SetText(Main.GRD_DATEOFLASTPO - 1, maxRow, jsonBelowReorderPnt[i]["dateOfLastPO"] != null ? jsonBelowReorderPnt[i]["dateOfLastPO"] : '');

        Grid.SetBackground(Main.GRD_SOH_DTLS - 1, maxRow, "green");

        //Compute total Amount
        if (unitCostVatex != "")
            Grid.SetText(Main.GRD_TOTAL_AMNT_VATEX - 1, maxRow, ComputeTotalAmntVATINPerRow(parseFloat(RemoveComma(jsonBelowReorderPnt[i]["EOQ"])), parseFloat(unitCostVatex)));

        if (unitCostVatin != "")
            Grid.SetText(Main.GRD_TOTAL_AMNT_VATIN - 1, maxRow, ComputeTotalAmntVATINPerRow(parseFloat(RemoveComma(jsonBelowReorderPnt[i]["EOQ"])), parseFloat(unitCostVatin)));

        maxRow++;
    }
}

function GetMaxRowWithData() {
    var maxRow = 0;
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var max = Grid.GetMaxRow();

    for(i = 0; i <= max; i++) {

        if (Grid.GetText(Main.GRD_ITEMGRPTYPE_CODE - 1, i) != "") {
            maxRow = i + 1;
        }
    }

    return maxRow;
}

function filterItemUOM() {
    if ($('#txtTrantype').val() == "REQNON") {
        var filter = "";
        var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
        var row = Grid.CellSelected.row - 1;
        var maxRow = Grid.GetMaxRow();


        for (i = 0; i <= maxRow; i++) {


            let itemCOde = (Grid.GetText(SPR_ITEMCODE - 1, i) + Grid.GetText(SPR_REQ_UOM_CODE - 1, i));


            if (filter != "" && itemCOde != "")
                filter += "|";

            filter += itemCOde
        }
    }
    else {
        var filter = "";
        var Grid = nwGridCon_Book.ActiveSheet;
        var row = Grid.CellSelected.row - 1;
        var maxRow = Grid.GetMaxRow();


        for (i = 0; i <= maxRow; i++) {


            let itemCOde = (Grid.GetText(Main.GRD_ITEMCODE - 1, i) + Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, i));


            if (filter != "" && itemCOde != "")
                filter += "|";

            filter += itemCOde
        }
    }
    

    return filter;
}

function DisableIfAlreadySaved() //just in case there are more fields to be disabled
{
    $('#btnLoadFrmValidHist').enable(false);
}

$(document).on('change', '#txtDRDateFrom', function () {
    var dateFrom = $('#txtDRDateFrom').val();
    var dateTo = $('#txtDRDateTo').val();

    if (Date.parse(dateFrom) > Date.parse(dateTo)) {
        MessageBox("Cannot proceed. Date From should not be later than Date To.", MenuItemTitle, "error");
        $('#txtDRDateFrom').val(dateFrom);
        $('#txtDRDateTo').val(dateFrom);
    }

});

$(document).on('change', '#txtDRDateTo', function () {
    var dateFrom = $('#txtDRDateFrom').val();
    var dateTo = $('#txtDRDateTo').val();

    if (Date.parse(dateTo) < Date.parse(dateFrom)) {
        MessageBox("Cannot proceed. Date To should not be earlier than Date From.", MenuItemTitle, "error");
        $('#txtDRDateFrom').val(dateFrom);
        $('#txtDRDateTo').val(dateFrom);
    }

});

$(document).on('focus', '.NonVat > .nwCheckBox', function () {
    var LocForm = $('#idvallugLocForm').val();
    var custodian = $('#idvallugCreatorCustodian').val();
    var costCenter = $('#idvallugCostCenter').val();
    var currency = $('#idvallugCurrency').val();
    var particulars = $('#txtParticular').val();
    var isConsumption = $(`#txtReqObjectiveCode`).val() == 'RO02' ? true : false;
    var reason = $('#idvallugRsnForRequest').val();

    var prompt = ''

    if (LocForm == '' ||
         custodian == '' ||
         costCenter == '' ||
         currency == '' ||
         particulars == '' ||
         (isConsumption && reason == '')
       ) {
        prompt = "Cannot proceed. Please complete the header details.";
        MessageBox(prompt, MenuItemTitle, 'error');
        return false;
    }
});

$(document).on('change', '.NonVat > .nwCheckBox', function () {
    var isChecked = $(this).is(':checked');
    var vatRate = $('#txtVatRate').val() == "" ? 0.00 : isChecked == true ? 0.00 : $('#txtVatRate').val();
    ComputeIfNonVat(crnwTR.index(), vatRate);

    //Checkbox Header Controls
    $(`.nwCheckBoxTot${crnwTD.index()}`).prop('checked', ChkBoxHdrControls(crnwTableCon.attr('id'), crnwTD.index()));
});

$(document).on('change', '.nwCheckBoxTot', function () {
    var isClass = $(this).hasClass('NonVat');
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    if (isClass) {
        var isChecked = $(this).is(':checked');
        var vatRate = $('#txtVatRate').val() == "" ? 0.00 : isChecked == true ? 0.00 : $('#txtVatRate').val();

        for(i = 0; i <= maxrow; i++) {

            var isLoaded = Grid.GetText(Main.GRD_ISLOADNONVAT - 1, i) == "1" ? true : false;
            if (!isLoaded) {
                ComputeIfNonVat(i, vatRate);
            }

        }
    }

});

$(document).on('focus', '.nwCheckBoxTot', function () {
    var isClass = $(this).hasClass('NonVat');

    if (isClass) {
        var LocForm = $('#idvallugLocForm').val();
        var custodian = $('#idvallugCreatorCustodian').val();
        var costCenter = $('#idvallugCostCenter').val();
        var currency = $('#idvallugCurrency').val();
        var particulars = $('#txtParticular').val();
        var isConsumption = $(`#txtReqObjectiveCode`).val() == 'RO02' ? true : false;
        var reason = $('#idvallugRsnForRequest').val();

        var prompt = ''

        if (LocForm == '' ||
             custodian == '' ||
             costCenter == '' ||
             currency == '' ||
             particulars == '' ||
             (isConsumption && reason == '')
           ) {
            prompt = "Cannot proceed. Please complete the header details.";
            MessageBox(prompt, MenuItemTitle, 'error');
            return false;
        }
    }

});

function ComputeIfNonVat(row, vatRate) {
    var Grid = nwGridCon_Book.ActiveSheet;

    var vatex = Grid.GetText(Main.GRD_UNITCOSTVATEX - 1, row);
    vatex = vatex == "" ? 0.00 : vatex.replace(/,/g, '');

    var reqQty = Grid.GetText(Main.GRD_REQ_QTY - 1, row);
    reqQty = reqQty == "" ? 0.00 : reqQty.replace(/,/g, '');

    //Computated Unit Cost Vatin
    var vatin = ComputationOfUnitCost(false, vatex, vatRate);
    Grid.SetText(Main.GRD_UNITCOSTVATIN - 1, row, parseFloat(vatin).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
    Grid.SetText(Main.GRD_TEMP_VATIN - 1, row, parseFloat(vatin).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))

    //Computated Total Amount (Vatin)
    Grid.SetText(Main.GRD_TOTAL_AMNT_VATIN - 1, row, ComputeTotalAmntVATINPerRow(reqQty, vatin));
    Grid.SetText(Main.GRD_TOTAL_AMNT_VATEX - 1, row, ComputeTotalAmntVATINPerRow(reqQty, vatex));

    //Compute Total Request Amount(Vatin) in Header
    ComputeTotalReqVatin();
}

function ComputeIfNonVatNonC(row, vatRate) {
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;

    var vatex = Grid.GetText(SPR_UNITCOSTVATEX - 1, row);
    vatex = vatex == "" ? 0.00 : vatex.replace(/,/g, '');

    var reqQty = Grid.GetText(SPR_REQ_QTY - 1, row);
    reqQty = reqQty == "" ? 0.00 : reqQty.replace(/,/g, '');

    //Computated Unit Cost Vatin
    var vatin = ComputationOfUnitCost(false, vatex, vatRate);
    Grid.SetText(SPR_UNITCOSTVATIN - 1, row, parseFloat(vatin).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))

    //Computated Total Amount (Vatin)
    Grid.SetText(SPR_TOTAL_AMNT_VATIN - 1, row, ComputeTotalAmntVATINPerRow(reqQty, vatin));
    Grid.SetText(SPR_TOTAL_AMNT_VATEX - 1, row, ComputeTotalAmntVATINPerRow(reqQty, vatex));

    //Compute Total Request Amount(Vatin) in Header
    ComputeTotalReqVatinNon();
}

function DisplayPromptMsg(errorMsg) {
    msgBoxContainerQuestion = "BdgtCheck";
    parent_MessageBoxQuestion(errorMsg.replaceAll('nwLine', '\n'), MenuItemTitle, "Question", "");
    $('#dimMessageBox.question .message_icon').css('background-image', ' url(../../../materials/icons/nw_ico_Error.png)'); //Replace ICON
    $('#Message_Yes').text('OK');
    $('#Message_No').css('display', 'none');
    $('#Message_Cancel').css('display', 'none');
}

function ChangeBgColorForBdgtCtrlDetails(gridID) {
    var rmrks = false;
    var rmrksMsg = "";
    var istagPerQty = false;
    var qtyAfterRqst = 0.00000;
    var amntAfterRqst = 0.00;

    var Grid = nwGridBdgtCtrlCon_Book.ActiveSheet;
    var maxRow = Grid.GetMaxRow();

    for(i = 0; i <= maxRow; i++)  {
        rmrks = Grid.GetText(BdgtCtrl.GRD_BCD_REMARKS - 1, i) != "" ? true : false;
        rmrksMsg = Grid.GetText(BdgtCtrl.GRD_BCD_REMARKS, i);

        istagPerQty = Grid.GetText(BdgtCtrl.GRD_BCD_TAGISQTY -1 , i) != "" ? true : false;
        qtyAfterRqst = parseFloat(RemoveComma(Grid.GetText(BdgtCtrl.GRD_BCD_AFTER_QTY - 1 , i)));
        amntAfterRqst = parseFloat(RemoveComma(Grid.GetText(BdgtCtrl.GRD_BCD_AFTER_AMNT - 1 , i)));

        if (!istagPerQty) {
            Grid.SetText(BdgtCtrl.GRD_BCD_REQ_QTY - 1, i ,"0.00000");
            Grid.SetText(BdgtCtrl.GRD_BCD_BEFORE_QTY - 1, i ,"0.00000");
        }

        if (rmrks) {

            //check if per qty and less than zero, should be color red
            if (istagPerQty && qtyAfterRqst < 0.00000) {
                Grid.SetBackground(BdgtCtrl.GRD_BCD_AFTER_QTY - 1, i, "red");
                Grid.SetTextColor(BdgtCtrl.GRD_BCD_AFTER_QTY - 1, i, "white");
            }
            else {
                Grid.SetBackground(BdgtCtrl.GRD_BCD_AFTER_QTY - 1, i, "gainsboro");
                Grid.SetTextColor(BdgtCtrl.GRD_BCD_AFTER_QTY - 1, i, "black");
            }

            //check if less than zero, should be color red
            if (amntAfterRqst < 0.00) {
                Grid.SetBackground(BdgtCtrl.GRD_BCD_AFTER_QTY - 1, i, "red");
                Grid.SetTextColor(BdgtCtrl.GRD_BCD_AFTER_QTY - 1, i, "white");
            }

        }

    }
}

function ValidationBdgtChkWindow(MaintotalQty, MaintotalVatex) {
    var errorMsg = "";
    var $row;

    var tempQty = 0.00;
    var tempAmnt = 0.00;
    var tempPrcnt = 0.00;
    var hasAlloc = false;
    var isRequireAlloc = false;

    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();

    for(i = 0; i <= cntBgtChkLIN; i++) 
    {
        if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3CODE - 1, i) != "") {

            tempQty = parseFloat(RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY- 1, i)));
            tempAmnt = parseFloat(RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_AMNT_VATEX- 1, i)));
            tempPrcnt = parseFloat(RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_PERCENTAGE- 1, i)));

            if (tempQty <= 0) {
                errorMsg += `Cannot be saved. Quantity is required in row ${i + 1}. \n`;
            }

            if (tempAmnt <= 0) {
                errorMsg += `Cannot be saved. Amount(VATEX) is required in row ${i + 1}. \n`;
            }

            if (tempPrcnt <= 0) {
                errorMsg += `Cannot be saved. Percentage is required in row ${i + 1}. \n`;
            }

            //check if require alloc
            isRequireAlloc = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_REQALLOC- 1, i) != "" ? true : false;
            hasAlloc = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_HASALLOC- 1, i) != "" ? true : false;

            if (isRequireAlloc && !hasAlloc) {
                errorMsg += `Cannot be saved. Allocation Details is required in row ${i + 1}. \n`;
            }
        }
    }

    if (errorMsg == "") {
        var unappliedQty = parseFloat(RemoveComma($('#txtUnappliedQty').val()));
        var unappliedAmnt = parseFloat(RemoveComma($('#txtUnappliedVatex').val()));
        var prcnt = "";

        if (getProfitCenter() == "" || $('#txtTrantype').val() == "REQREP") {
            $('#txtTotalPrcnt').val(100);
            prcnt = "100";
        } else {
            prcnt = $('#txtTotalPrcnt').val();
        }

        isValid = true;

        if (unappliedQty != 0.00)
            isValid = false;

        if (unappliedAmnt != 0.00)
            isValid = false;

        if (!isValid) {
            errorMsg = "Cannot be saved. Unapplied Quantity and Total Amount (VATEX) should be equal to zero. \n"
        }

        if (parseFloat(prcnt) != 100) {
            errorMsg += "Cannot be saved. Total Percentage must be equal to 100%. \n"
        }
    }

    return errorMsg;
}

function ValidationAllocWindow(MaintotalQty, MaintotalVatex) {
    var errorMsg = "";

    var tempQty = 0.00;
    var tempAmnt = 0.00;
    var tempPrcnt = 0.00;

    var GridAllocProcess = nwGridConAllocProcess_Book.ActiveSheet;
    var rowAllocProcess = GridAllocProcess.CellSelected.row - 1;
    var cntAllocProcess = GridAllocProcess.GetMaxRow();

    for (i = 0; i <= cntAllocProcess; i++) {

        if (GridAllocProcess.GetText(GRD_AP_SEG3CODE - 1, i) != "") {
            tempQty = parseFloat(RemoveComma(GridAllocProcess.GetText(GRD_AP_QTY - 1, i)));
            tempAmnt = parseFloat(RemoveComma(GridAllocProcess.GetText(GRD_AP_AMNT_VATEX - 1, i)));
            tempPrcnt = parseFloat(RemoveComma(GridAllocProcess.GetText(GRD_AP_PERCENTAGE - 1, i)));

            if (tempQty <= 0) {
                errorMsg += `Cannot be saved. Quantity is required in row ${i + 1}. \n`;
            }

            if (tempAmnt <= 0) {
                errorMsg += `Cannot be saved. Amount (VATEX) is required in row ${i + 1}. \n`;
            }

            if (tempPrcnt <= 0) {
                errorMsg += `Cannot be saved. Percentage is required in row ${i + 1}. \n`;
            }
        }

    }


    if (errorMsg == "") {
        var unappliedQty = parseFloat(RemoveComma($('#txtAllocUnappliedQty').val()));
        var unappliedAmnt = parseFloat(RemoveComma($('#txtAllocUnappliedVatex').val()));
        var prcnt = $('#txtAllocPercentage').val();

        isValid = true;

        if (unappliedQty != 0.00)
            isValid = false;

        if (unappliedAmnt != 0.00)
            isValid = false;

        if (!isValid) {
            errorMsg = "Cannot be saved. Unapplied Quantity and Total Amount (VATEX) should be equal to zero. \n"
        }

        if (parseFloat(prcnt) != 100) {
            errorMsg += "Cannot be saved. Total Percentage must be equal to 100%. \n"
        }
    }

    return errorMsg;
}

function ClearBudgetChkdetails(row) {
    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;

    GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, rowBgtChkLIN, '0.00');
    GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, rowBgtChkLIN, '0.00');
    GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, rowBgtChkLIN, '0.00');
}


function BudgetPercentage() {
    var totalPrcnt = 100.00000000000;
    var prcnt = 0.00000000000;

    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();


    for (i = 0; i <= cntBgtChkLIN; i++) {

        prcnt += GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, i) == "" ? 0.00 : parseFloat(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, i));
    }

    totalPrcnt = (parseFloat(totalPrcnt) - parseFloat(prcnt));
    return MoneyFormat(totalPrcnt, 11);
}

function AllocPercentage() {
    var totalPrcnt = 100.00000000000;
    var prcnt = 0.00000000000;

    var GridAllocProcess = nwGridConAllocProcess_Book.ActiveSheet;
    var cntAllocProcess = GridAllocProcess.GetMaxRow();

    for (i = 0 ; i <= cntAllocProcess; i++) {
        prcnt += GridAllocProcess.GetText(GRD_AP_PERCENTAGE - 1, i) == "" ? 0.00 : GridAllocProcess.GetText(GRD_AP_PERCENTAGE - 1, i);
    }

    totalPrcnt = (parseFloat(totalPrcnt) - parseFloat(prcnt));
    return MoneyFormat(totalPrcnt, 11);
}


function ChkIfRequieAlloc() {
    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();

    
    for (i = 0; i < cntBgtChkLIN; i++) {

        if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_REQALLOC - 1, i) == "1") {
            GridBgtChkLIN.SetEnable(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, i, true);
            GridBgtChkLIN.SetBackground(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, i, '#2689d8');
        }
        else {
            GridBgtChkLIN.SetEnable(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, i, false);
            GridBgtChkLIN.SetBackground(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, i, 'gainsboro');
        }
    }

}

function ClearDetails(row, isBdgtChkOnly, isClearQuotation, isPending) {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    if (isPending) {
        Grid.SetText(Main.GRD_HASBDGTCHK- 1, row, '');
        Grid.SetText(Main.GRD_PENDINGBDGTCHK- 1, row, '');
        Grid.SetText(Main.GRD_SAVED_BGTDTLS- 1, row, '');
        //Grid.SetText(Main.GRD_BDGT_QTY- 1, row, '');
        //Grid.SetText(Main.GRD_BDGT_AMNT - 1, row, '');

        Grid.SetBackground(Main.GRD_BDGT_CHK_DTLS - 1, "#2689d8");

        jsonBdgtChk = FilterJsonBdgtChkDtls(Grid.GetText(Main.GRD_ITEMCODE - 1, row), Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row));
        jsonAllocChkFnl = FilterJsonAllocChkFnl(Grid.GetText(Main.GRD_ITEMCODE - 1, row), Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row));

        jsonViewConsoDetails = FilterjsonViewConsoDetails(Grid.GetText(Main.GRD_ITEMCODE - 1, row), Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row));
    }

    if (!isBdgtChkOnly) {
        Grid.SetText(Main.GRD_HASDELDTLS - 1, row, '');
        Grid.SetBackground(Main.GRD_DEL_DTLS- 1,"#2689d8");
        jsonDelDtls = FilterJsonDelDtls(Grid.GetText(Main.GRD_ITEMCODE - 1, row), Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row));
    }

    if (isClearQuotation) {
        Grid.SetText(Main.GRD_HASQUOLDTLS - 1, row, '');
        Grid.SetText(Main.GRD_DISABLEDUNITCOST - 1, row, '');
        Grid.SetText(Main.GRD_ISLOADNONVAT, row - 1, '');

        Grid.SetEnable(Main.GRD_QUOTATION-1 , "#2689d8");
        jsonQuoDtls = FilterJsonQuoDtls(Grid.GetText(Main.GRD_ITEMCODE - 1, row), Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row));

    }


}

function ClearDetailsNon(row, isBdgtChkOnly, isClearQuotation, isPending) {
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    if (isPending) {
        Grid.SetText(SPR_HASBDGTCHK - 1, row, '');
        //Grid.SetText(SPR_BDGT_QTY - 1, row, '');
        //Grid.SetText(SPR_BDGT_AMNT - 1, row, '');

        Grid.SetBackground(SPR_BDGT_CHK_DTLS - 1, "#2689d8");

        jsonBdgtChk = FilterJsonBdgtChkDtls(Grid.GetText(SPR_ITEMCODE - 1, row), Grid.GetText(SPR_REQ_UOM_CODE - 1, row));
        jsonAllocChkFnl = FilterJsonAllocChkFnl(Grid.GetText(SPR_ITEMCODE - 1, row), Grid.GetText(SPR_REQ_UOM_CODE - 1, row));

        jsonViewConsoDetails = FilterjsonViewConsoDetails(Grid.GetText(SPR_ITEMCODE - 1, row), Grid.GetText(SPR_REQ_UOM_CODE - 1, row));
    }

    if (!isBdgtChkOnly) {
        Grid.SetText(SPR_HASDELDTLS - 1, row, '');
        Grid.SetBackground(SPR_DEL_DTLS - 1, "#2689d8");
        jsonDelDtls = FilterJsonDelDtls(Grid.GetText(SPR_ITEMCODE - 1, row), Grid.GetText(SPR_REQ_UOM_CODE - 1, row));
    }

    if (isClearQuotation) {
        Grid.SetText(SPR_HASQUOLDTLS - 1, row, '');
        Grid.SetEnable(SPR_QUOTATION - 1, "#2689d8");
        jsonQuoDtls = FilterJsonQuoDtls(Grid.GetText(SPR_ITEMCODE - 1, row), Grid.GetText(SPR_REQ_UOM_CODE - 1, row));
    }
}


function ClearAllocDetails(row) {
    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;

    GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_HASALLOC, row, '');
    GridBgtChkLIN.SetBackground(BdgtLIN.GRD_BCL_HASALLOC, row, '#2689d8');
}

function ValIfArrowUpAndDown(keycode) {
    if (keycode == 38 || keycode == 40) {
        if (keycode == 38) {
            isArrowKeysUp = true;
            isArrowKeysDown = false;
        }
        else if (keycode == 40) {
            isArrowKeysDown = true;
            isArrowKeysUp = false;
        }
    }
    else {
        isArrowKeysUp = false;
        isArrowKeysDown = false;
    }
}

function ReturnRowIfArrowKeys(row) {
    if (isArrowKeysUp) {
        if (row >= 0)
            row += 1;
    }

    if (isArrowKeysDown) {
        row -= 1;
    }

    return row;
}


function DisableVndorName() {
    var GridQuotation = nwGridConQuotationDetails_Book.ActiveSheet;
    var cntQuotation = GridQuotation.GetMaxRow();

    for(i = 0; i <= cntQuotation; i++) {

        if (GridQuotation.GetText(GRD_QD_VENDORCODE - 1, i)  != "") {
            GridQuotation.SetBackground(GRD_QD_VENDORNAME - 1, i, 'gainsboro');
            GridQuotation.SetEnable(GRD_QD_VENDORNAME - 1, i, false);
        }
    }
}

function SublocFunction() // enable/disable of sublocation based on tagging
{
    var isNonInv = false;
    var isAllow = $(`#txtDDISAllowMultiple`).val();
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();


    for (i = 0; i <= maxRow; i++) {
        isNonInv = Grid.GetText(Main.GRD_NONINVENTORIABLE - 1, i) == "true" ? true : false;

        if (isNonInv && isAllow != "1") {
            Grid.SetEnable(Main.GRD_SUBLOCATION_CODE - 1, i, false);
        }
        else {
            Grid.SetEnable(Main.GRD_SUBLOCATION_CODE - 1, i, true);
        }
    }
}

function ShowVwMonitoringRpt() {

    var locformCode = $(`#idvallugLocForm`).val();
    var locformDesc = $(`#descvallugLocForm`).val();
    var costCenterCode = $(`#idvallugCostCenter`).val();
    var costCenterDesc = $(`#descvallugCostCenter`).val();
    var recuser = $(`#idvallugCreatorCustodian`).val();
    var required = "";

    if (locformCode == "") {
        required = "Cannot proceed. Location with Accountable Forms is required. \n"
    }

    if (costCenterCode == "") {
        required += "Cannot proceed. Cost Center is required. \n"
    }

    if (required != "") {
        MessageBox(required, MenuItemTitle, "error");
        return;
    }
    
    var fullength =   GetCurrentURL() + `../ADBBdgtAvailabilityRpt?nwLocForm=${encodeURI(locformCode)}&nwCostCenterDesc=${encodeURI(costCenterDesc)}&nwCostCenter=${encodeURI(costCenterCode)}&nwRecUser=${encodeURI(recuser)}`;


    nwLoading_Start('xReqCompliance', crLoadingHTML);
    nwPopupForm_Create("nwVwMonitoringRpt", true, fullength);
    $('#nwVwMonitoringRpt .modal-hdr-title').text("View Budget Availability Report");
    $("#nwVwMonitoringRpt").css({ "min-width": "98%" });
    $("#nwVwMonitoringRpt").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwVwMonitoringRpt");
    nwLoading_End('xReqCompliance');
}

function DisableBdgtChkIfNew() {
    var docno = $('#txtDocno').val();
    var trantype = $('#txtTrantype').val();

    if ((docno == "" && trantype.toLowerCase() == 'reqrep') || (docno == "" && getProfitCenter() == "")) {
        nwGridCon_Book.ActiveSheet.SetEnable(Main.GRD_BDGT_CHK_DTLS - 1, Spread_ALLROW, false);
        nwGridCon_Book.ActiveSheet.SetBackground(Main.GRD_BDGT_CHK_DTLS - 1, Spread_ALLROW, "gainsboro");
    } else {
        nwGridCon_Book.ActiveSheet.SetEnable(Main.GRD_BDGT_CHK_DTLS - 1, Spread_ALLROW, true);
    }

    if (getProfitCenter() == "") {
        $('#btnBdgtCheck').enable(false);
    } else {
        $('#btnBdgtCheck').enable(true);
    }
}

function ComputationForBdgtChckDetails() {
    var totalQty = RemoveComma($('#txtTotalQty').val());
    var totalAmntVatex = RemoveComma($('#txtTotalAmntVatex').val());
    
    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet; 
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();
    
    //get total applied
    var appliedQty = 0;
    var appliedVatex = 0;

    var $row;
    for(i= 0; i < cntBgtChkLIN; i++) {
        appliedQty = parseFloat(appliedQty) + parseFloat(RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, i)));
        appliedVatex = parseFloat(appliedVatex) + parseFloat(RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, i)));
    }

    $('#txtAppliedQty').val(MoneyFormat(appliedQty, 5));
    $('#txtAppliedVatex').val(MoneyFormat(appliedVatex, 2));

    $('#txtUnappliedQty').val(MoneyFormat(parseFloat(totalQty) - parseFloat(appliedQty), 5));
    $('#txtUnappliedVatex').val(MoneyFormat(parseFloat(totalAmntVatex) - parseFloat(appliedVatex), 2));

}

function ComputeBdgtPrcnt() {
    var qty = 0;
    var totalQty = RemoveComma($('#txtTotalQty').val());
    var percent = 100.00000000000;
    var totalPrcnt = 0.00000000000;
    
    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet; 
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();

    for(i = 0; i < cntBgtChkLIN; i++) {
        percent = '100.000000000';

        GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, i)
        if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3CODE - 1, i) != "") {

            qty = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, i);
            percent = (percent / (totalQty / qty));

            totalPrcnt = totalPrcnt + percent;

            GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, i, MoneyFormat(percent, 11));
            
            if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_HASALLOC - 1, i) == "") {
                GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TEMP_PRCNT - 1, i, MoneyFormat(percent, 11));
            }
        }
    }

    $('#txtTotalPrcnt').val(parseFloat(totalPrcnt).toFixed(11));
}

function ComputeBdgtPerInputPrcnt(index, row) {
    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;

    var percent = GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, index);
    var totalPrcnt = 100.00000000000;

    totalPrcnt = totalPrcnt - percent;
    GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, row, parseFloat(totalPrcnt).toFixed(11));

    $('#txtTotalPrcnt').val(parseFloat(totalPrcnt).toFixed(11));
}


function ComputationForBdgtChckAllocDetails() {
    var totalQty = RemoveComma($('#txtAllocTotalQty').val());
    var totalAmntVatex = RemoveComma($('#txtAllocTotalAmntVatex').val());

    //get total applied
    var appliedQty = 0;
    var appliedVatex = 0;

    var Grid = nwGridConAllocProcess_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1
    var maxRow = Grid.GetMaxRow();

    for (i = 0; i < maxRow; i++) {
        Grid.GetText(GRD_AP_AMNT_VATEX - 1, i);
        appliedQty = parseFloat(appliedQty) + parseFloat(RemoveComma(Grid.GetText(GRD_AP_QTY - 1, i)));
        appliedVatex = parseFloat(appliedVatex) + parseFloat(RemoveComma(Grid.GetText(GRD_AP_AMNT_VATEX - 1, i)));
    }

    $('#txtAllocAppliedQty').val(MoneyFormat(appliedQty, 5));
    $('#txtAllocAppliedVatex').val(MoneyFormat(appliedVatex, 2));

    $('#txtAllocUnappliedQty').val(MoneyFormat(parseFloat(totalQty) - parseFloat(appliedQty), 5));
    $('#txtAllocUnappliedVatex').val(MoneyFormat(parseFloat(totalAmntVatex) - parseFloat(appliedVatex), 2));

}

function ComputeBdgtAllocPrcnt() {
    var qty = 0;
    var totalQty = parseFloat(RemoveComma($('#txtAllocTotalQty').val()));
    var percent = 100;
    var totalPrcnt = 0;

    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1
    var maxRow = Grid.GetMaxRow();

    for (i = 0; i < maxRow; i++) {
        percent = 100;
       
        if (Grid.GetText(GRD_AP_SEG3CODE - 1, i) != "") {
            qty = parseFloat(RemoveComma(Grid.GetText(GRD_AP_QTY - 1, i)));
            percent = (percent / (totalQty / qty));
            totalPrcnt = totalPrcnt + percent;

            Grid.SetText(GRD_AP_PERCENTAGE - 1, i, MoneyFormat(percent, 11));
        }

    }

    $('#txtAllocPercentage').val(parseFloat(totalPrcnt).toFixed(11));
}

function UponChangeRsnForRqst() {
    var Grid = nwGridCon_Book.ActiveSheet;

    Grid.SetText(Main.GRD_BDGT_QTY - 1, Spread_ALLROW, "");
    Grid.SetText(Main.GRD_BDGT_AMNT - 1, Spread_ALLROW, "");
    Grid.SetText(Main.GRD_HASBDGTCHK - 1, Spread_ALLROW, "");
    Grid.SetText(Main.GRD_SAVED_BGTDTLS - 1, Spread_ALLROW, "");
    Grid.SetBackground(Main.GRD_BDGT_CHK_DTLS - 1, Spread_ALLROW, "#2689d8");
}


function ResetQuotationDtls() {
    var Grid = nwGridCon_Book.ActiveSheet;

    Grid.SetText(Main.GRD_HASQUOLDTLS - 1, Spread_ALLROW, "");
    Grid.SetText(Main.GRD_ISLOADNONVAT - 1, Spread_ALLROW, "");
    Grid.SetText(Main.GRD_DISABLEDUNITCOST - 1, Spread_ALLROW, "");
    Grid.SetBackground(Main.GRD_QUOTATION - 1, Spread_ALLROW, "#2689d8");
    Grid.SetEnable(Main.GRD_UNITCOSTVATEX - 1, Spread_ALLROW, true);
    Grid.SetEnable(Main.GRD_UNITCOSTVATIN - 1, Spread_ALLROW, true);
    Grid.SetEnable(Main.GRD_NONVAT - 1, Spread_ALLROW, true);
}

function ResetDeliveryDtls() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for(i = 0; i <= maxrow; i++) {
        Grid.SetText(Main.GRD_HASDELDTLS - 1, i, "");
        Grid.SetBackground(Main.GRD_DEL_DTLS - 1, i, "#2689d8");
    }
}


function ClearBdgtCtrlDtls() {
    $('#txtBdgtCtrlNo').val('');
    $('#txtTransDate').val('');
}

function ChangeToUpperParticulars() {
    var remarksConfig = $('#txtIsUpperCaseParticulars').val() != "" ? true : false;

    if (remarksConfig) {
        $("#txtParticular").css({ "text-transform": "uppercase" });
    }
    else {
        $("#txtParticular").css({ "text-transform": "none" });
    }
}

function ChangeToUpperSelectTrans() {
    var remarksConfig = $('#txtIsUpperCaseParticulars').val() != "" ? true : false;

    if (remarksConfig) {
        $(".SelectParticulars").css({ "text-transform": "uppercase" });
    }
    else {
        $(".SelectParticulars").css({ "text-transform": "none" });
    }
}


function FillTempBdgtChkQtyAndAmnt(row) {
    var qty = $('#txtAllocTotalQty').val();
    var amnt = $('#txtAllocTotalAmntVatex').val();
    var prcnt = $('#txtTotalPrcnt').val();

    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;

    GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TEMP_QTY - 1, row, qty);
    GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TEMP_AMNT - 1, row, amnt);
    GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TEMP_PRCNT - 1, row, prcnt);
}

function ComputeBdgtDtlsPerRow(qty, vatex, percentage) {
    var valQty = RemoveComma(qty);
    var valVatex = RemoveComma(vatex);
    var valPrcnt = RemoveComma(percentage);

}

function VwDelDtls() {
    $('#btnDDSave').enable(false);
    $(`#nwGridConDeliveryID`).enable(false);
}

function ChkIfHasBdgtChk() {
    var isEmpty = true;
    var hasBdgtDtls;

    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for(i = 0; i <= maxrow; i++){

        hasBdgtDtls = Grid.GetText(Main.GRD_HASBDGTCHK - 1, i) != "" ? true : false;
        if (hasBdgtDtls)
            isEmpty = false;

    }

    return isEmpty;
}

$(document).on('click', '#CreateSBR', function () {
    //Validation
    var errMsg = ChkIfHasBgtChkDtls();

    if (errMsg == "") {
        nwLoading_Start('LoadingCreateSBR', crLoadingHTML);
        nwParameter_Add("txtDocno", $('#txtDocno').val());
        nwParameter_Add("txtTrantype", $('#txtTrantype').val());
        $('.BoxResize').css('display', 'none');
        func_ActionDriven("actGenCreateSBR", false);
    }
    else {
        MessageBox(errMsg, MenuItemTitle, "error");
    }

    return false;
});

var avar = 1;
$(document).on('click', '#btnSupplemental', function () {

    if ($('#txtValidSup').val() != "") {
        MessageBox($('#txtValidSup').val(), MenuItemTitle, "error");
        return false;
    }

    var docno = $('#txtDocno').val();
    var fullength = GetCurrentURL() + `../ADBSupplementalBudgetEntry?nwpart=${avar}&nwRefDocno=${encodeURI(docno)}&nwIsRequest=1`;

    avar++;
    nwLoading_Start('xLoadingSupplemental', crLoadingHTML);

    nwPopupForm_Create("nwPopUpSupplemental", true, fullength);
    $('#nwPopUpSupplemental .modal-hdr-title').text("Supplemental Budget Entry");
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
        MessageBox($('#txtValidRea').val(), MenuItemTitle, "error");
        return false;
    }

    var docno = $('#txtDocno').val();
    var fullength = GetCurrentURL() + `../ADBBudgetRealignmentEntry?nwpart=${avar}&nwRefDocno=${encodeURI(docno)}`;
   
    avar++;
    nwLoading_Start('xLoadingRealignment', crLoadingHTML);

    nwPopupForm_Create("nwPopUpRealignment", true, fullength);
    $('#nwPopUpRealignment .modal-hdr-title').text("Budget Realignment Entry");
    $("#nwPopUpRealignment").css({ "min-width": "98%" });
    $("#nwPopUpRealignment").css({ "min-height": "98%" });

    nwPopupForm_ShowModal("nwPopUpRealignment");

    //HIDE 
    nwPopupForm_HideModal("nwCreateSBR");
    nwLoading_End('xLoadingRealignment');
    return false;
});

function RefreshLineDetails() {
    nwLoading_Start("nwLoadingLineDtls", crLoadingHTML)
    nwParameter_Add("txtDocno", $('#txtDocno').val());
    nwParameter_Add("txtNOAccessReqrep", $('#txtNOAccessReqrep').val());
    func_ActionDriven("actRefreshLine", false);
}

function AllowCreationOfSBR(isAllow) {
    $('.btnCreateSBR').enable(isAllow.toLowerCase() == "true" ? true : false);
}

function DisableSBRBtn(isEnable) {
    $(`#btnSupplemental`).enable(isEnable.toLowerCase() == "true" ? true : false);
    $(`#btnRealignment`).enable(isEnable.toLowerCase() == "true" ? true : false);
}

function ChkBoxHdrControls(grid, col) {
    var $row;
    var isAllTicked = true;
    var isTicked = false;

    $(`#${grid}-nwData tr`).each(function (i, n) {
        $row = $(n);

        //Check if has unticked
        isTicked = $row.find(`td:eq(${col}) input`).is(':checked');

        if (!isTicked)
            isAllTicked = false;
    });

    return isAllTicked;
}


function DisableReqCompIfNew() {
    let hasDocno = $('#txtDocno').val() != "" ? true : false;
    var Grid = nwGridCon_Book.ActiveSheet;
    var maxRow = Grid.GetMaxRow();

    let $row;
    let itemCode = '';

    for (x = 0; x < maxRow; x++) {

        itemCode = Grid.GetText(GRD_ITEMCODE - 1, x);


        if (itemCode != "" && hasDocno) {
            $('#btnSingleDelDtls').enable(true);
            $('#btnSingleDelDtls').addClass('btn-default btn-default-orange');
            $('#btnPaymentComponents').enable(true);
            Grid.SetEnable(Main.GRD_REQ_COMPLIANCE - 1, x, true);
        }
        else {
            $('#btnSingleDelDtls').enable(false);
            $('#btnPaymentComponents').enable(false);
            Grid.SetEnable(Main.GRD_REQ_COMPLIANCE - 1, x, false);
            Grid.SetBackground(Main.GRD_REQ_COMPLIANCE - 1, x, "gainsboro");
        }
    }

}

function DisableReqCompIfNewNon() {
    let hasDocno = $('#txtDocno').val() != "" ? true : false;
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var maxRow = Grid.GetMaxRow();

    let $row;
    let itemCode = '';

    for (x = 0; x < maxRow; x++) {

        itemCode = Grid.GetText(SPR_ITEMCODE - 1, x);


        if (itemCode != "" && hasDocno) {
            $('#btnSingleDelDtlsNon').enable(true);
            $('#btnSingleDelDtlsNon').addClass('btn btn-default btn-default-orange');
            Grid.SetEnable(SPR_REQ_COMPLIANCE - 1, x, true);
        }
        else {
            $('#btnSingleDelDtlsNon').enable(false);
            Grid.SetEnable(SPR_REQ_COMPLIANCE - 1, x, false);
            Grid.SetBackground(SPR_REQ_COMPLIANCE - 1, x, "gainsboro");
        }
    }
}

function clickVwPendingPO() {
    nwLoading_Start("actGenGridViewPendingPO", crLoadingHTML);

    nwPopupForm_ShowModal("nwViewPendingPO");

    var item = $(`#txtSOHItemCode`).val();
    var itemDesc = $(`#txtSOHItem`).val();
    var costCnter = $(`#idvallugCostCenter`).val();
    var costCnterDesc = $(`#descvallugCostCenter`).val();

    var Grid = nwGridConSOH_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    var subloc = Grid.GetText(GRD_SOH_SUBLOC_CODE - 1, row);
    var sublocDesc = Grid.GetText(GRD_SOH_SUBLOC_CODE - 1, row);

    //fill headers
    $('#idvallugVPOItem').val(item);
    $('#descvallugVPOItem').val(itemDesc);
    $('#idvallugVPOCostCnter').val(costCnter);
    $('#descvallugVPOCostCnter').val(costCnterDesc);
    $('#idvallugVPOSublocation').val(subloc);
    $('#descvallugVPOSublocation').val(sublocDesc);

    nwParameter_Add("item", item);
    nwParameter_Add("costCnter", costCnter);
    nwParameter_Add("subloc", subloc);
    func_ActionDriven("actGenGridViewPendingPO", false);
}

function ChkIfHasBgtChkDtls() {
    var $row = '';
    var rowCnt = 0;
    var hasSavedBgtChk = false;
    var hasLineId = false;
    var errorStr = '';

    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for (i = 0; i <= maxRow; i++) {
        rowCnt++;

        hasSavedBgtChk = Grid.GetText(Main.GRD_SAVED_BGTDTLS - 1 ,i) != "" ? true : false;
        hasLineId = Grid.GetText(Main.GRD_LINEID - 1 ,i) != "" ? true : false;

        if (!hasSavedBgtChk && hasLineId) {
            errorStr += "Cannot be processed. Charging Details is required in row " + rowCnt + ".\n";
        }

    }

    return errorStr;
}


function ValidateUnitCost(isVatex, number, row) //NOTE: THIS FUNCTION HAS NO CLEARING OF JSON DETAILS
{
    var msg = "";
    var hasWac = false;
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    if(isVatex){
        var wac = RemoveComma(Grid.GetText(Main.GRD_WEIGHTAVECOSTVATEX - 1, row));
    }
    else{
        var wac = RemoveComma(Grid.GetText(Main.GRD_WEIGHTAVECOSTVATIN - 1, row));
    }

    if (parseFloat(wac) > 0.00) {
        hasWac = true;
    }


    if(isVatex){
        var lowestUnitCost = RemoveComma(Grid.GetText(Main.GRD_LASTPOPRICEVATEX - 1, row));
    }
    else{
        var lowestUnitCost = RemoveComma(Grid.GetText(Main.GRD_LASTPOPRICEVATIN - 1, row));
    }

    var isNonVat = $(`#nwGrid-nwData tr:eq(${row}) td:eq(${Main.GRD_NONVAT}) input`).is(':checked');
    var vatRate = $('#txtVatRate').val() == "" ? "0.00" : isNonVat == true ? "0.00" : $('#txtVatRate').val();

    var reqQty = Grid.GetText(Main.GRD_REQ_QTY - 1, row);
    reqQty = reqQty == "" ? "0.00" : reqQty.replace(/,/g, '');

    var isLower = false;

    if (!(hasWac && (parseFloat(number) == parseFloat(wac)))) { //IF INPUTTED UNIT COST IS WITH SAME VALUE OF WAC DON'T VALIDATE USING LAST PO PRICE

        if (parseFloat((number)) < parseFloat((lowestUnitCost))) {
            number = lowestUnitCost;
            isLower = true;
        }
    }

    if (!isLower) {
        //Computated Unit Cost Vatin
        var vatin = !isVatex ? number : ComputationOfUnitCost(false, number, vatRate);
        var vatex = !isVatex ? ComputationOfUnitCost(true, number, vatRate) : number;

        Grid.SetText(Main.GRD_UNITCOSTVATIN - 1, row, parseFloat(vatin).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
        Grid.SetText(Main.GRD_UNITCOSTVATEX - 1, row, parseFloat(vatex).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))

        //Computated Total Amount (Vatin)/(Vatex)
        Grid.SetText(Main.GRD_TOTAL_AMNT_VATIN - 1, row, ComputeTotalAmntVATINPerRow(reqQty, vatin));
        Grid.SetText(Main.GRD_TOTAL_AMNT_VATEX - 1, row, ComputeTotalAmntVATINPerRow(reqQty, vatex));

        //Compute Total Request Amount(Vatin) in Header
        ComputeTotalReqVatin();
    }

    if (isLower) {
        msg = `Unit Cost (${!isVatex ? "VATIN" : "VATEX"}) should not be lower than the Last PO Price (${!isVatex ? "VATIN" : "VATEX"}).`;
    }

    return msg;
}

function FilterSupplerQuo() {
    var GridQuotation = nwGridConQuotationDetails_Book.ActiveSheet;
    var cntQuotation = GridQuotation.GetMaxRow();

    for(i = 0; i <= cntQuotation; i++) {
        $row = $(n);

        if (GridQuotation.GetText(GRD_QD_VENDORCODE - 1, rowQuotation) != "") {
            if (filter != "") {
                filter += "|"
            }

            filter += GridQuotation.GetText(GRD_QD_VENDORCODE - 1, rowQuotation);
        }

    }

    return filter;
}


function HasSavedInDetails() {
    $(`#txtHasChanges`).val("true");
}

function hasDeliveryDtls() {
    HasSavedInDetails();

    if (jsonDelDtlsFiltered.length > 0) {
        nwGridCon_Book.ActiveSheet.SetBackground(Main.GRD_DEL_DTLS - 1, nwGridCon_Book.ActiveSheet.CellSelected.row - 1, 'green');
    }
    else {
        nwGridCon_Book.ActiveSheet.SetBackground(Main.GRD_DEL_DTLS - 1, nwGridCon_Book.ActiveSheet.CellSelected.row - 1, '#2689d8');
    }
}

function RemoveAddedNwLine() {
    var GridSelect = nwGridConSelect_Book.ActiveSheet;
    var cntSelect = GridSelect.GetMaxRow();

    for (i = 0; i < cntSelect; i++) {

        particulars = GridSelect.GetText(GRD_ST_PARTICULARS - 1, cntSelect);

        GridSelect.SetText(GRD_ST_PARTICULARS - 1, GridSelect, particulars.replaceAll('anwNewXLineX', ''));

        
    }

    GridSelect.SetBackground(GRD_ST_VIEW - 1, Spread_ALLROW, 'green');
    GridSelect.SetText2(GRD_ST_VIEW - 1, Spread_ALLROW, '...');
    GridSelect.SetTextAlign(GRD_ST_VIEW - 1, Spread_ALLROW, "center");
    GridSelect.SetBold(GRD_ST_VIEW - 1, Spread_ALLROW, "bold");
    GridSelect.SetTextColor(GRD_ST_VIEW - 1, Spread_ALLROW, "white");
}

function UponChangingCurrency() {
    var $row = '';
    var itemList = '';
    var rowList = '';
    var uomList = '';

    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for(i = 0; i <= maxrow; i++) {

        if (itemList != "") {
            itemList += "|"
        }

        //concatinate items and rows
        if (Grid.GetText(Main.GRD_ITEMCODE - 1, i).length > 0) {
            itemList += Grid.GetText(Main.GRD_ITEMCODE - 1, i);
            rowList += i;
            uomList = Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, i);
        }

    }

    nwParameter_Add("itemList", itemList);
    nwParameter_Add("rowList", rowList);
    nwParameter_Add("uomList", uomList);
}

function FilterJsonCurrency(row) {
    return jsonCurrency.find(i => i.rownum == row);
}

function FillChangeCurrency() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var maxRow = Grid.GetMaxRow();

    for(i = 0; i <= maxrow; i++) {
        jsonCurrencyFiltered = [];
        jsonCurrencyFiltered = FilterJsonCurrency(i);

        if (jsonCurrencyFiltered != undefined) {
            Grid.SetText(Main.GRD_UNITCOSTVATIN - 1, i,jsonCurrencyFiltered.vatin != null ? jsonCurrencyFiltered.vatin : '');
            Grid.SetText(Main.GRD_UNITCOSTVATEX - 1, i,jsonCurrencyFiltered.vatex != null ? jsonCurrencyFiltered.vatex : '');
            Grid.SetText(Main.GRD_LASTPOPRICEVATIN - 1, i,jsonCurrencyFiltered.lastPoPriceVatin != null ? jsonCurrencyFiltered.lastPoPriceVatin : '');
            Grid.SetText(Main.GRD_LASTPOPRICEVATEX - 1, i,jsonCurrencyFiltered.lastPOPriceVatex != null ? jsonCurrencyFiltered.lastPOPriceVatex : '');
            Grid.SetText(Main.GRD_DATEOFLASTPO - 1, i,jsonCurrencyFiltered.dateOfLastPO != null ? jsonCurrencyFiltered.dateOfLastPO : '');
            Grid.SetText(Main.GRD_WEIGHTAVECOSTVATIN - 1, i,jsonCurrencyFiltered.wacVatin != null ? jsonCurrencyFiltered.wacVatin : '');
            Grid.SetText(Main.GRD_WEIGHTAVECOSTVATEX - 1, i,jsonCurrencyFiltered.wacVatex != null ? jsonCurrencyFiltered.wacVatex : '');

            //Computated Total Amount (Vatin)/(Vatex)
            var reqQty = RemoveComma(Grid.GetText(Main.GRD_REQ_QTY - 1, i));
            var vatin = RemoveComma(Grid.GetText(Main.GRD_UNITCOSTVATIN - 1, i));
            var vatex = RemoveComma(Grid.GetText(Main.GRD_UNITCOSTVATEX - 1, i));

            Grid.SetText(Main.GRD_TOTAL_AMNT_VATIN - 1, i, ComputeTotalAmntVATINPerRow(reqQty, vatin));
            Grid.SetText(Main.GRD_TOTAL_AMNT_VATEX - 1, i, ComputeTotalAmntVATINPerRow(reqQty, vatex));

            //Compute Total Request Amount(Vatin) in Header
            ComputeTotalReqVatin();
        }

    }
}

function ViewItemDetails(itemcode) {
    nwLoading_Start("xItemdetails", crLoadingHTML);
    var fullength = "";
    var title = "";

    title = "Item Master";
    fullength = GetCurrentURL() + "../SGItemMaster?nwItemDetails=" + encodeURI(itemcode);

    $('.nwmenuFrame').attr("src", fullength);

    nwPopupForm_Create("nwPopItemDetailsWindow", true, fullength);
    $('#nwPopItemDetailsWindow .modal-hdr-title').text(title);

    $("#nwPopItemDetailsWindow").css({ "min-width": "98%" });
    $("#nwPopItemDetailsWindow").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopItemDetailsWindow");
    $('.dimbgNWnwPopWindow').removeClass('openn');
    nwLoading_End('xItemdetails');
}


function ClearAllLineDetails() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var maxRow = Grid.GetMaxRow();

    for(i = 0; i <= maxrow; i++) {

        if (Grid.GetText(Main.GRD_ITEMCODE - 1, i) != "") {
            ClearDetails(i, false, true, true);
        }

    }
}

function AutoComputeBdgtCheckDetails(grid, index, allocQty, AmntVatex) {


    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();

    var cnt = 0;

    for(i = 0; i <= cntBgtChkLIN; i++)  { //count row with profit center

        if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3CODE - 1, i) != "") {
            cnt++;
        }
    }

    if (cnt >= 2) { //if 2 rows fill values

        var remainingQty = parseFloat(RemoveComma($(`#txtTotalQty`).val())) - parseFloat(RemoveComma(allocQty));
        var remainingAmnt = parseFloat(RemoveComma($(`#txtTotalAmntVatex`).val())) - parseFloat(RemoveComma(AmntVatex));

        for(i = 0; i <= cntBgtChkLIN; i++) { //count row with profit center

            if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3CODE- 1, i) != "" && index != i && cnt == 2) {
                GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, i, MoneyFormat(remainingQty <= 0 ? 0 : remainingQty, 5));
                GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, i,MoneyFormat(remainingAmnt <= 0 ? 0 : remainingAmnt, 2));
                ClearAllocDetails(i);
                //ComputeBdgtPerInputPrcnt(index, i);
            }

            else if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3CODE- 1, i) != "" && i > index && cnt >= 3) {
                GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, i , MoneyFormat(0, 5));
                GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, i, MoneyFormat(0, 2));
                ClearAllocDetails(i);
            }
        }
    }

    ComputeBdgtPrcnt();

}

function AutoComputeBdgtCheckDetailsPerInputPrcnt(grid, index, allocQty, AmntVatex) {

    var cnt = 0;

    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();
    var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;

    for(i = 0; i <= cntBgtChkLIN; i++)  { //count row with profit center

        if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3CODE - 1, i) != "") {
            cnt++;
        }
    }

    if (cnt >= 2) { //if 2 rows fill values

        var remainingQty = parseFloat(RemoveComma($(`#txtTotalQty`).val())) - parseFloat(RemoveComma(allocQty));
        var remainingAmnt = parseFloat(RemoveComma($(`#txtTotalAmntVatex`).val())) - parseFloat(RemoveComma(AmntVatex));

        for(i = 0; i <= cntBgtChkLIN; i++) { //count row with profit center

            if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3CODE - 1,i) != "" && index != i && cnt == 2) {
                GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, i, MoneyFormat(remainingQty <= 0 ? 0 : remainingQty, 5));
                GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, i, MoneyFormat(remainingAmnt <= 0 ? 0 : remainingAmnt, 2));
                ClearAllocDetails(i);
                ComputeBdgtPerInputPrcnt(index, i);
            }

            else if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3CODE - 1, i) != "" && i > index && cnt >= 3) {
                GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, i, MoneyFormat(0, 5));
                GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, i, MoneyFormat(0, 2));
                ClearAllocDetails(i);
            }
        }
    }
}

function AutoComputeAllocDetails(grid, index, allocQty, AmntVatex) {

    var Grid = nwGridConAllocProcess_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    var cnt = 0;
    
    for (i = 0; i <= maxRow; i++){ //count row with profit center

        if (Grid.GetText(GRD_AP_SEG3CODE - 1,i) != "") {
            cnt++;
        }
    }

    if (cnt >= 2) { //if 2 rows fill values

        var remainingQty = parseFloat(RemoveComma($(`#txtAllocTotalQty`).val())) - parseFloat(RemoveComma(allocQty));
        var remainingAmnt = parseFloat(RemoveComma($(`#txtAllocTotalAmntVatex`).val())) - parseFloat(RemoveComma(AmntVatex));

        if (Grid.GetText(GRD_AP_SEG3CODE - 1,i) != "") { //count row with profit center

            if (Grid.GetText(GRD_AP_SEG3CODE - 1,i) != "" && index != i && cnt == 2) {
                Grid.SetText(GRD_AP_QTY - 1, i , MoneyFormat(remainingQty <= 0 ? 0 : remainingQty, 5));
                Grid.SetText(GRD_AP_AMNT_VATEX - 1, i, MoneyFormat(remainingAmnt <= 0 ? 0 : remainingAmnt, 2));
            }

            else if (Grid.GetText(GRD_AP_SEG3CODE - 1, i) != "" && i > index && cnt >= 3) {
                Grid.SetText(GRD_AP_QTY - 1, i, MoneyFormat(0, 5));
                Grid.SetText(GRD_AP_AMNT_VATEX - 1, i, MoneyFormat(0, 2));
            }

        }
    }

    ComputeBdgtAllocPrcnt();
}



function FillInitialConsumptionBdgtChk() {
    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;

    if (jsonInitialBdgtChk == undefined) {
        return false;
    }

    for (var i = 0; i < jsonInitialBdgtChk.length; i++) {

        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG2CODE - 1, i, jsonInitialBdgtChk[i].vw_seg2Code);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG2DESC - 1, i, jsonInitialBdgtChk[i].vw_seg2Desc);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG3CODE - 1, i, jsonInitialBdgtChk[i].vw_seg3Code);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG3DESC - 1, i, jsonInitialBdgtChk[i].vw_seg3Desc);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG4CODE - 1, i, jsonInitialBdgtChk[i].vw_seg4Code);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG4DESC - 1, i, jsonInitialBdgtChk[i].vw_seg4Desc);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG5CODE - 1, i, jsonInitialBdgtChk[i].vw_seg5Code);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG5DESC - 1, i, jsonInitialBdgtChk[i].vw_seg5Desc);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG6CODE - 1, i, jsonInitialBdgtChk[i].vw_seg6Code);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG6DESC - 1, i, jsonInitialBdgtChk[i].vw_seg6Desc);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, i, $(`#txtTotalQty`).val());
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, i, $(`#txtTotalAmntVatex`).val());
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_REM_BDGT_QTY - 1, i, jsonInitialBdgtChk[i].remQty);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_REM_BDGT_AMNT - 1, i, jsonInitialBdgtChk[i].remBdgt);

        if (jsonInitialBdgtChk[i] == "") {
            GridBgtChkLIN.SetBackground(BdgtLIN.GRD_BCL_SEG4CODE - 1, i, "cyan");
            GridBgtChkLIN.SetEnable(BdgtLIN.GRD_BCL_SEG4CODE - 1, i, true);
        }
        else {
            GridBgtChkLIN.SetBackground(BdgtLIN.GRD_BCL_SEG4CODE - 1, i, "gainsboro");
            GridBgtChkLIN.SetEnable(BdgtLIN.GRD_BCL_SEG4CODE - 1, i, false);
        }

        //FOR BUDGET COMBINATION
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG1_BGT - 1, i, jsonInitialBdgtChk[i].seg1);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG1DESC_BGT - 1, i, jsonInitialBdgtChk[i].seg1Desc);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG2_BGT - 1, i, jsonInitialBdgtChk[i].seg2);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG2DESC_BGT - 1, i, jsonInitialBdgtChk[i].seg2Desc);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG3_BGT - 1, i, jsonInitialBdgtChk[i].seg3);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG3DESC_BGT - 1, i, jsonInitialBdgtChk[i].seg3Desc);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG4_BGT - 1, i, jsonInitialBdgtChk[i].seg4);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG4DESC_BGT - 1, i, jsonInitialBdgtChk[i].seg4Desc);

        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG5_BGT - 1, i, jsonInitialBdgtChk[i].seg5);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG5DESC_BGT - 1, i, jsonInitialBdgtChk[i].seg5Desc);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG6_BGT - 1, i, jsonInitialBdgtChk[i].seg6);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_SEG6DESC_BGT - 1, i, jsonInitialBdgtChk[i].seg6Desc);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ITEMGRPTYPE_BGT - 1, i, jsonInitialBdgtChk[i].itemGrpType);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ITEMGRPTYPEDESC_BGT - 1, i, jsonInitialBdgtChk[i].itemGrpTypeDesc);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ITEMGRPTYPE_BGT - 1, i, jsonInitialBdgtChk[i].itemGrpType);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ITEMGRPTYPEDESC_BGT - 1, i, jsonInitialBdgtChk[i].itemGrpTypeDesc);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ITEMCODE_BGT - 1, i, jsonInitialBdgtChk[i].itemCode);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ITEMDESC_BGT - 1, i, jsonInitialBdgtChk[i].ItemDesc);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ITEMLEVEL_BGT - 1, i, jsonInitialBdgtChk[i].itemLvl);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_ITEMLEVELDESC_BGT - 1, i, jsonInitialBdgtChk[i]["Item Level"]);

        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TAGPC - 1, i, jsonInitialBdgtChk[i].tagPC);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TAGCC - 1, i, jsonInitialBdgtChk[i].tagCC);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TAGPERQTY - 1, i, jsonInitialBdgtChk[i].tagPerQty);
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_CURRENCY_BGT - 1, i, jsonInitialBdgtChk[i].currency);


        //Check if Required Alloc
        if (jsonInitialBdgtChk[i].isAlloc == "1") {
            GridBgtChkLIN.SetText(BBdgtLIN.GRD_BCL_REQALLOC - 1, i, jsonInitialBdgtChk[i].isAlloc);
            GridBgtChkLIN.SetEnable(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, i, true);
            GridBgtChkLIN.SetBackground(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, i, '#2689d8');

        }
        else {
            GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_REQALLOC - 1, i, "");
            GridBgtChkLIN.SetEnable(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, i, false);
            GridBgtChkLIN.SetBackground(BdgtLIN.GRD_BCL_ALLOC_PROC_DTLS - 1, i, 'green');

        }

        DisplayBdgtCombinationAndChecking(GridBgtChkLIN, i);
    }

    ChkIfRequieAlloc();
    ComputeBdgtPrcnt();
    ComputationForBdgtChckDetails();
}


function DisplayBdgtCombinationAndChecking(grid, row) {


    //FOR BUDGET ACCOUNT COMBINATION
    var seg1 = $(`#idvallugBdgtChk_GLAccntChrge`).val();
    var seg1Desc = $(`#descvallugBdgtChk_GLAccntChrge`).val();
    var seg2 = grid.GetText(BdgtLIN.GRD_BCL_SEG2CODE - 1, row);
    var seg2Desc = grid.GetText(BdgtLIN.GRD_BCL_SEG2DESC - 1, row);
    var seg3 = grid.GetText(BdgtLIN.GRD_BCL_SEG3CODE - 1, row);
    var seg3Desc = grid.GetText(BdgtLIN.GRD_BCL_SEG3DESC - 1, row);
    var seg4 = grid.GetText(BdgtLIN.GRD_BCL_SEG4CODE - 1, row);
    var seg4Desc = grid.GetText(BdgtLIN.GRD_BCL_SEG4DESC - 1, row);
    var seg5 = grid.GetText(BdgtLIN.GRD_BCL_SEG5CODE - 1, row);
    var seg5Desc = grid.GetText(BdgtLIN.GRD_BCL_SEG5DESC - 1, row);
    var seg6 = grid.GetText(BdgtLIN.GRD_BCL_SEG6CODE - 1, row);
    var seg6Desc = grid.GetText(BdgtLIN.GRD_BCL_SEG6DESC - 1, row);
    var item = $(`#idvallugBdgtChk_Item`).val();
    var itemDesc = $(`#descvallugBdgtChk_Item`).val();
    var itemGrpType = $(`#idvallugBdgtChk_ItemGrpType`).val();
    var itemGrpTypeDesc = $(`#descvallugBdgtChk_ItemGrpType`).val();

    DisplayBdgtAccountCombination(seg1, seg1Desc, seg2, seg2Desc, seg3, seg3Desc, seg4, seg4Desc, seg5, seg5Desc, seg6, seg6Desc, itemGrpType, itemGrpTypeDesc, item, itemDesc);

    ////FOR BUDGET CHECKING DETAILS
    var seg1_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG1_BGT - 1, row);
    var seg1Desc_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG1DESC_BGT - 1, row);
    var seg2_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG2_BGT - 1, row);
    var seg2Desc_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG2DESC_BGT - 1, row);
    var seg3_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG3_BGT - 1, row);
    var seg3Desc_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG3DESC_BGT - 1, row);
    var seg4_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG4_BGT - 1, row);
    var seg4Desc_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG4DESC_BGT - 1, row);
    var seg5_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG5_BGT - 1, row);
    var seg5Desc_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG5DESC_BGT - 1, row);
    var seg6_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG6_BGT - 1, row);
    var seg6Desc_bgt = grid.GetText(BdgtLIN.GRD_BCL_SEG6DESC_BGT - 1, row);
    var itemGrpType_bgt = grid.GetText(BdgtLIN.GRD_BCL_ITEMGRPTYPE_BGT - 1, row);
    var itemGrpTypeDesc_bgt = grid.GetText(BdgtLIN.GRD_BCL_ITEMGRPTYPEDESC_BGT - 1, row);
    var itemLvl_bgt = grid.GetText(BdgtLIN.GRD_BCL_ITEMLEVEL_BGT - 1, row);
    var itemLvlDesc_bgt = grid.GetText(BdgtLIN.GRD_BCL_ITEMLEVELDESC_BGT - 1, row);
    var itemCode_bgt = grid.GetText(BdgtLIN.GRD_BCL_ITEMCODE_BGT - 1, row);
    var itemDesc_bgt = grid.GetText(BdgtLIN.GRD_BCL_ITEMDESC_BGT - 1, row);
    var remQty = grid.GetText(BdgtLIN.GRD_BCL_REM_BDGT_QTY - 1, row);
    var remAmnt = grid.GetText(BdgtLIN.GRD_BCL_REM_BDGT_AMNT - 1, row);
    var currency = grid.GetText(BdgtLIN.GRD_BCL_CURRENCY_BGT - 1, row);

    DisplayBdgtCheckingDtls(seg1_bgt, seg1Desc_bgt, seg2_bgt, seg2Desc_bgt, seg3_bgt, seg3Desc_bgt, seg4_bgt, seg4Desc_bgt, seg5_bgt, seg5Desc_bgt, seg6_bgt, seg6Desc_bgt, itemGrpType_bgt, itemGrpTypeDesc_bgt, itemLvl_bgt, itemLvlDesc_bgt, itemCode_bgt, itemDesc_bgt, remQty, remAmnt, currency);
}


function DisplayBdgtCheckingDtls(seg1_bgt, seg1Desc_bgt, seg2_bgt, seg2Desc_bgt, seg3_bgt, seg3Desc_bgt, seg4_bgt, seg4Desc_bgt, seg5_bgt, seg5Desc_bgt, seg6_bgt, seg6Desc_bgt, itemGrpType_bgt, itemGrpTypeDesc_bgt, itemLvl_bgt, itemLvlDesc_bgt, itemCode_bgt, itemDesc_bgt, remQty, remAmnt, currency) {
    var GridBgtChkDetails = nwGridConBgtChkDetails_Book.ActiveSheet;
    var rowBgtChkDetails = GridBgtChkDetails.CellSelected.row - 1;

    if (seg1_bgt.length > 0) {
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG1CODE - 1, 0, seg1_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG1DESC - 1, 0, seg1Desc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG2CODE - 1, 0, seg2_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG2DESC - 1, 0, seg2Desc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG3CODE - 1, 0, seg3_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG3DESC - 1, 0, seg3Desc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG4CODE - 1, 0, seg4_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG4DESC - 1, 0, seg4Desc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG5CODE - 1, 0, seg5_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG5DESC - 1, 0, seg5Desc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG6CODE - 1, 0, seg6_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG6DESC - 1, 0, seg6Desc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_ITEMGRPTYPE - 1, 0, itemGrpTypeDesc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_ITEMLEVEL - 1, 0, itemLvlDesc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_ITEM - 1, 0, itemDesc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_REMQTY - 1, 0, remQty);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_BDGTAMNT - 1, 0, remAmnt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_CURRENCY - 1, 0, currency);
    }
}


function ChkIfAllowMultipleDelLoc(isAllow) {
    $(`#txtDDISAllowMultiple`).val('');
    isAllow = isAllow.toLowerCase() == "true" ? "1" : "0";
    $(`#txtDDISAllowMultiple`).val(isAllow);
}

function ValidateSingleDelivery() {
    let isEmpty = true;
    let errorResult = "";

    var GridSingleDel = nwGridConSingleDel_Book.ActiveSheet;
    var cntSingleDel = GridSingleDel.GetMaxRow();

    for (i = 0; i <= cntSingleDel; i++) {

        if (GridSingleDel.GetText(GRD_SD_DELLOCODE - 1,i) != "") {
            isEmpty = false;

            if (GridSingleDel.GetText(GRD_SD_DELDATE - 1, i) == "") {
                errorResult += "Cannot be saved. Delivery Date is required. \n";
            }

            if (GridSingleDel.GetText(GRD_SD_SUBLOCCODE - 1, i) == "") {
                errorResult += "Cannot be saved. Sublocation is required. \n";
            }
        }
    }

    if (isEmpty) {
        errorResult += "Cannot be saved. line details is required. \n";
    }

    return errorResult;
}

function BdgtCheckDtilsInputValidation(inputtedValue, totalValue, row, type) {
    let returnResult = true;
    inputtedValue = type == "Amount (VATEX)" ? 0.00 : 0.00000;

    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var cntBgtChkLIN = GridSingleDel.GetMaxRow();

    //do not allow inputs greater than the total value
    for (i = 0; i < cntBgtChkLIN; i++) {
        if (type == "Amount (VATEX)") {
            inputtedValue = inputtedValue + parseFloat(RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, i)));
        }
        else {
            inputtedValue = inputtedValue + parseFloat(RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, i)));
        }
    }

    if (parseFloat(inputtedValue) > parseFloat(totalValue)) {

        setTimeout(function () {

            MessageBox("Cannot proceed. Budget Distribution " + type + " in row " + (row + 1) + " should not be greater than the Total " + type + ".\n", "Charging Details Window", "error");

            //make it zero
            GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, row, MoneyFormat(0, 5));
            GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, row, MoneyFormat(0, 2));

            //Compute Header Quantities
            ComputationForBdgtChckDetails();
            ComputeBdgtPrcnt();
        }, 2)
    }
}

function AllocDtilsInputValidation(inputtedValue, totalValue, row, type) {

    inputtedValue = type == "Amount (VATEX)" ? 0.00 : 0.00000;

    var GridAllocProcess = nwGridConAllocProcess_Book.ActiveSheet;
    var rowAllocProcess = GridAllocProcess.CellSelected.row - 1;
    var cntAllocProcess = GridAllocProcess.GetMaxRow();

    //do not allow inputs greater than the total value
    for (i = 0; i <= cntAllocProcess; i++) {
        if (type == "Amount (VATEX)") {
            inputtedValue = inputtedValue + parseFloat(RemoveComma(GridAllocProcess.GetText(GRD_AP_AMNT_VATEX -1 , i)));
        }
        else {
            inputtedValue = inputtedValue + parseFloat(RemoveComma(GridAllocProcess.GetText(GRD_AP_QTY - 1, i)));
        }
    }

    if (parseFloat(inputtedValue) > parseFloat(totalValue)) {

        setTimeout(function () {

            MessageBox(`Cannot proceed. Allocation ${type} in row ${rowAllocProcess + 1} should not be greater than the Total ${type}.\n`, `Allocation Details Window`, `error`);

            //make it zero
            GridAllocProcess.SetText(GRD_AP_QTY - 1, rowAllocProcess, MoneyFormat(0, 5));
            GridAllocProcess.SetText(GRD_AP_AMNT_VATEX - 1, rowAllocProcess, MoneyFormat(0, 2));

            //Compute Header Quantities
            ComputationForBdgtChckAllocDetails();
            ComputeBdgtAllocPrcnt();
        }, 2)

    }

}

function BdgtChkPercentValidation(row) {
    let $row;
    let sumPrnct = 0.00000000000;
    let totalPrcnt = 100.00000000000;

    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var cntSingleDel = GridSingleDel.GetMaxRow();

    //do not allow inputs greater than the total value
    for (i = 0; i < json.length; i++) {
        $row = $(n);

        sumPrnct = sumPrnct + parseFloat(RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, cntSingleDel)));
    }

    if (parseFloat(sumPrnct) > parseFloat(totalPrcnt)) {

        setTimeout(function () {

            MessageBox(`Cannot proceed. Budget Distribution Percentage in row ${row + 1} should not be greater than ${totalPrcnt} percent.\n`, `Charging Details Window`, `error`);

            //make it zero
            cntSingleDel.SetText(BdgtLIN.GRD_BCL_QTY - 1, row, MoneyFormat(0, 5));
            cntSingleDel.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, row, MoneyFormat(0, 2));
            cntSingleDel.SetText(BdgtLIN.GRD_BCL_PERCENTAGE - 1, row, MoneyFormat(totalPrcnt, 11));

            //Compute Header Quantities
            ComputationForBdgtChckDetails();
            ComputeBdgtPrcnt();

        }, 2)
    }
}

function AllocPercentValidation(row) {
    let $row;
    let sumPrnct = 0.00000000000;
    let totalPrcnt = 100.00000000000;

    var GridAllocProcess = nwGridConAllocProcess_Book.ActiveSheet;
    var cntAllocProcess = GridAllocProcess.GetMaxRow();


    //do not allow inputs greater than the total value
    for (i = 0; i <= cntAllocProcess; i++)	 {
        $row = $(n);

        sumPrnct = sumPrnct + parseFloat(RemoveComma($row.find(`td:eq(${GRD_AP_PERCENTAGE}) input`).val()));
    }

    if (parseFloat(sumPrnct) > parseFloat(totalPrcnt)) {

        setTimeout(function () {

            MessageBox(`Cannot proceed. Allocation Percentage in row ${row + 1} should not be greater than ${totalPrcnt} percent.\n`, `Allocation Details Window`, `error`);

            //make it zero
            setGridData('nwGridAllocProcess', 'input', GRD_AP_QTY, row, MoneyFormat(0, 5));
            setGridData('nwGridAllocProcess', 'input', GRD_AP_AMNT_VATEX, row, MoneyFormat(0, 2));
            setGridData('nwGridAllocProcess', 'input', GRD_AP_PERCENTAGE, row, MoneyFormat(totalPrcnt, 11));

            //Compute Header Quantities
            ComputationForBdgtChckAllocDetails();
            ComputeBdgtAllocPrcnt();
        }, 2)
    }
}

function DisplayBdgtAccountCombination(seg1, seg1Desc, seg2, seg2Desc, seg3, seg3Desc, seg4, seg4Desc, seg5, seg5Desc, seg6, seg6Desc, itemGrpType, itemGrpTypeDesc, item, itemDesc) {
    if (seg3.length > 0 || getProfitCenter() == "") {
        var GridBgtChkHeader = nwGridConBgtChkHeader_Book.ActiveSheet;
        var rowBgtChkHeader = GridBgtChkHeader.CellSelected.row - 1;

        GridBgtChkHeader.SetText(GRD_BCH_SEG1 - 1, 0, seg1);
        GridBgtChkHeader.SetText(GRD_BCH_SEG1DESC - 1, 0, seg1Desc);
        GridBgtChkHeader.SetText(GRD_BCH_SEG2 - 1, 0, seg2);
        GridBgtChkHeader.SetText(GRD_BCH_SEG2DESC - 1, 0, seg2Desc);
        GridBgtChkHeader.SetText(GRD_BCH_SEG3 - 1, 0, seg3);
        GridBgtChkHeader.SetText(GRD_BCH_SEG3DESC - 1, 0, seg3Desc);
        GridBgtChkHeader.SetText(GRD_BCH_SEG4 - 1, 0, seg4);
        GridBgtChkHeader.SetText(GRD_BCH_SEG4DESC - 1, 0, seg4Desc);
        GridBgtChkHeader.SetText(GRD_BCH_SEG5 - 1, 0, seg5);
        GridBgtChkHeader.SetText(GRD_BCH_SEG5DESC - 1, 0, seg5Desc);
        GridBgtChkHeader.SetText(GRD_BCH_SEG6 - 1, 0, seg6);
        GridBgtChkHeader.SetText(GRD_BCH_SEG6DESC - 1, 0, seg6Desc);
        GridBgtChkHeader.SetText(GRD_BCH_ITEMGRPTYPE_CODE - 1, 0, itemGrpType);
        GridBgtChkHeader.SetText(GRD_BCH_ITEMGRPTYPE - 1, 0, itemGrpTypeDesc);
        GridBgtChkHeader.SetText(GRD_BCH_ITEM_Code - 1, 0, item);
        GridBgtChkHeader.SetText(GRD_BCH_ITEM - 1, 0, itemDesc);
    }
}

function DisplayBdgtCheckingDtls(seg1_bgt, seg1Desc_bgt, seg2_bgt, seg2Desc_bgt, seg3_bgt, seg3Desc_bgt, seg4_bgt, seg4Desc_bgt, seg5_bgt, seg5Desc_bgt, seg6_bgt, seg6Desc_bgt, itemGrpType_bgt, itemGrpTypeDesc_bgt, itemLvl_bgt, itemLvlDesc_bgt, itemCode_bgt, itemDesc_bgt, remQty, remAmnt, currency) {
    if (seg1_bgt.length > 0) {
        var GridBgtChkDetails = nwGridConBgtChkDetails_Book.ActiveSheet;
        var rowBgtChkDetails = GridBgtChkDetails.CellSelected.row - 1;

        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG1CODE - 1, 0, seg1_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG1DESC - 1, 0, seg1Desc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG2CODE - 1, 0, seg2_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG2DESC - 1, 0, seg2Desc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG3CODE - 1, 0, seg3_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG3DESC - 1, 0, seg3Desc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG4CODE - 1, 0, seg4_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG4DESC - 1, 0, seg4Desc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG5CODE - 1, 0, seg5_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG5DESC - 1, 0, seg5Desc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG6CODE - 1, 0, seg6_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_SEG6DESC - 1, 0, seg6Desc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_ITEMGRPTYPE - 1, 0, itemGrpTypeDesc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_ITEMLEVEL - 1, 0, itemLvlDesc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_ITEM - 1, 0, itemDesc_bgt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_REMQTY - 1, 0, remQty);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_BDGTAMNT - 1, 0, remAmnt);
        GridBgtChkDetails.SetText(BdgtChkDtls.GRD_CURRENCY - 1, 0, currency);
    }
}


function DisplayBdgtCombinationAndChecking(grid, row) {
    var Grid = nwGridConBgtChkLIN_Book.ActiveSheet;

    //FOR BUDGET ACCOUNT COMBINATION
    var seg1 = $(`#idvallugBdgtChk_GLAccntChrge`).val();
    var seg1Desc = $(`#descvallugBdgtChk_GLAccntChrge`).val();
    var seg2 = Grid.GetText(BdgtLIN.GRD_BCL_SEG2CODE- 1, row);
    var seg2Desc = Grid.GetText(BdgtLIN.GRD_BCL_SEG2DESC- 1, row);
    var seg3 = Grid.GetText(BdgtLIN.GRD_BCL_SEG3CODE- 1, row);
    var seg3Desc = Grid.GetText(BdgtLIN.GRD_BCL_SEG3DESC- 1, row);
    var seg4 = Grid.GetText(BdgtLIN.GRD_BCL_SEG4CODE- 1, row);
    var seg4Desc = Grid.GetText(BdgtLIN.GRD_BCL_SEG4DESC- 1, row);
    var seg5 = Grid.GetText(BdgtLIN.GRD_BCL_SEG5CODE- 1, row);
    var seg5Desc = Grid.GetText(BdgtLIN.GRD_BCL_SEG5DESC- 1, row);
    var seg6 = Grid.GetText(BdgtLIN.GRD_BCL_SEG6CODE- 1, row);
    var seg6Desc = Grid.GetText(BdgtLIN.GRD_BCL_SEG6DESC- 1, row);
    var item = $(`#idvallugBdgtChk_Item`).val();
    var itemDesc = $(`#descvallugBdgtChk_Item`).val();
    var itemGrpType = $(`#idvallugBdgtChk_ItemGrpType`).val();
    var itemGrpTypeDesc = $(`#descvallugBdgtChk_ItemGrpType`).val();

    DisplayBdgtAccountCombination(seg1, seg1Desc, seg2, seg2Desc, seg3, seg3Desc, seg4, seg4Desc, seg5, seg5Desc, seg6, seg6Desc, itemGrpType, itemGrpTypeDesc, item, itemDesc);

    ////FOR BUDGET CHECKING DETAILS
    var seg1_bgt = Grid.GetText(BdgtLIN.GRD_BCL_SEG1_BGT - 1 , row);
    var seg1Desc_bgt = Grid.GetText(BdgtLIN.GRD_BCL_SEG1DESC_BGT - 1 , row);
    var seg2_bgt = Grid.GetText(BdgtLIN.GRD_BCL_SEG2_BGT - 1 , row);
    var seg2Desc_bgt = Grid.GetText(BdgtLIN.GRD_BCL_SEG2DESC_BGT - 1 , row);
    var seg3_bgt = Grid.GetText(BdgtLIN.GRD_BCL_SEG3_BGT - 1 , row);
    var seg3Desc_bgt = Grid.GetText(BdgtLIN.GRD_BCL_SEG3DESC_BGT - 1 , row);
    var seg4_bgt = Grid.GetText(BdgtLIN.GRD_BCL_SEG4_BGT - 1 , row);
    var seg4Desc_bgt = Grid.GetText(BdgtLIN.GRD_BCL_SEG4DESC_BGT - 1 , row);
    var seg5_bgt = Grid.GetText(BdgtLIN.GRD_BCL_SEG5_BGT - 1 , row);
    var seg5Desc_bgt = Grid.GetText(BdgtLIN.GRD_BCL_SEG5DESC_BGT - 1 , row);
    var seg6_bgt = Grid.GetText(BdgtLIN.GRD_BCL_SEG6_BGT - 1 , row);
    var seg6Desc_bgt = Grid.GetText(BdgtLIN.GRD_BCL_SEG6DESC_BGT - 1 , row);
    var itemGrpType_bgt = Grid.GetText(BdgtLIN.GRD_BCL_ITEMGRPTYPE_BGT - 1 , row);
    var itemGrpTypeDesc_bgt = Grid.GetText(BdgtLIN.GRD_BCL_ITEMGRPTYPEDESC_BGT - 1 , row);
    var itemLvl_bgt = Grid.GetText(BdgtLIN.GRD_BCL_ITEMLEVEL_BGT - 1 , row);
    var itemLvlDesc_bgt = Grid.GetText(BdgtLIN.GRD_BCL_ITEMLEVELDESC_BGT - 1 , row);
    var itemCode_bgt = Grid.GetText(BdgtLIN.GRD_BCL_ITEMCODE_BGT - 1 , row);
    var itemDesc_bgt = Grid.GetText(BdgtLIN.GRD_BCL_ITEMDESC_BGT - 1 , row);
    var remQty = Grid.GetText(BdgtLIN.GRD_BCL_REM_BDGT_QTY - 1 , row);
    var remAmnt = Grid.GetText(BdgtLIN.GRD_BCL_REM_BDGT_AMNT - 1 , row);
    var currency = Grid.GetText(BdgtLIN.GRD_BCL_CURRENCY_BGT - 1 , row);

    DisplayBdgtCheckingDtls(seg1_bgt, seg1Desc_bgt, seg2_bgt, seg2Desc_bgt, seg3_bgt, seg3Desc_bgt, seg4_bgt, seg4Desc_bgt, seg5_bgt, seg5Desc_bgt, seg6_bgt, seg6Desc_bgt, itemGrpType_bgt, itemGrpTypeDesc_bgt, itemLvl_bgt, itemLvlDesc_bgt, itemCode_bgt, itemDesc_bgt, remQty, remAmnt, currency);
}

function ClearBudgetCombinatioAndChecking() {
//do not delete
//    //BUDGET ACCOUNT COMBINATION
//    nwGrid_ClearRange(`nwGridBgtChkHeader`, GRD_BCH_SEG1, 0, GRD_BCH_REMBDGT, $(`#nwGridBgtChkHeader-nwData tr`).length);
//    nwGrid_MaxRow('nwGridBgtChkHeader', 1);

//    //BUDGET CHECKING 
//    nwGrid_ClearRange(`nwGridBgtChkDetails`, BdgtChkDtls.GRD_SEG1CODE, 0, BdgtChkDtls.GRD_BDGTAMNT, $(`#nwGridBgtChkDetails-nwData tr`).length);
//    nwGrid_MaxRow('nwGridBgtChkDetails', 1);
}

$(document).on('click', '#btnViewConsoChargeDetails', function () {

    if (jsonViewConsoDetails.length <= 0) {
        MessageBox("Cannot proceed. No saved Charging Details.", MenuItemTitle, "error");
        return false;
    }

    nwLoading_Start("actViewConsoChargeDetails", crLoadingHTML);
    nwPopupForm_ShowModal('ViewConsoChargeDetailsWindow');
    nwParameter_Add("jsonViewConsoDetails", JSON.stringify(jsonViewConsoDetails));
    func_ActionDriven("actViewConsoChargeDetails", false);
});

function CheckViewConsoDetails(itemCode, uom, seg1, seg2, seg3, seg4, seg5, seg6, itemGrpType, itemLvl, item) {
    return jsonViewConsoDetails.findIndex(i =>  i.seg1Bdgt == seg1
                                            && i.seg2Bdgt == seg2
                                            && i.seg3Bdgt == seg3
                                            && i.seg4Bdgt == seg4
                                            && i.seg5Bdgt == seg5
                                            && i.seg6Bdgt == seg6
                                            && i.itemGrpTypeBdgt == itemGrpType
                                            && i.itemLevelBdgt == itemLvl
                                            && i.itemCodeBdgt == item
                                            && i.itemCode == itemCode
                                            && i.uom == uom
                                            );
}

function StoreUniqueViewConsoDetails(json, itemCode, uom) {
    //filter data
    jsonViewConsoDetails = FilterjsonViewConsoDetails(itemCode, uom);

    var store = {};
    for (var i = 0; i < json.length; i++) {
        store = {};

        //if (CheckViewConsoDetails(jsonBdgtChk[i].itemCode, jsonBdgtChk[i].UOM, jsonBdgtChk[i].seg1Bdgt, jsonBdgtChk[i].seg2Bdgt, jsonBdgtChk[i].seg3Bdgt, jsonBdgtChk[i].seg4Bdgt,
        //                          jsonBdgtChk[i].seg5Bdgt,jsonBdgtChk[i].seg6Bdgt,jsonBdgtChk[i].itemGrpTypeBdgt,jsonBdgtChk[i].itemLevelBdgt,jsonBdgtChk[i].itemCodeBdgt) < 0) 
        //{

        store["itemCode"] = json[i].itemCode;
        store["uom"] = json[i].UOM;
        store["seg1Bdgt"] = json[i].seg1Bdgt;
        store["seg1DescBdgt"] = json[i].seg1DescBdgt;
        store["seg2Bdgt"] = json[i].seg2Bdgt;
        store["seg2DescBdgt"] = json[i].seg2DescBdgt;
        store["seg3Bdgt"] = json[i].seg3Bdgt;
        store["seg3DescBdgt"] = json[i].seg3DescBdgt;
        store["seg4Bdgt"] = json[i].seg4Bdgt;
        store["seg4DescBdgt"] = json[i].seg4DescBdgt;
        store["seg5Bdgt"] = json[i].seg5Bdgt;
        store["seg5DescBdgt"] = json[i].seg5DescBdgt;
        store["seg6Bdgt"] = json[i].seg6Bdgt;
        store["seg6DescBdgt"] = json[i].seg6DescBdgt;
        store["itemGrpTypeBdgt"] = json[i].itemGrpTypeBdgt;
        store["itemGrpTypeDescBdgt"] = json[i].itemGrpTypeDescBdgt;
        store["itemLevelBdgt"] = json[i].itemLevelBdgt;
        store["itemLevelDescBdgt"] = json[i].itemLevelDescBdgt;
        store["itemCodeBdgt"] = json[i].itemCodeBdgt;
        store["itemDescdgt"] = json[i].itemDescBdgt;
        store["currency"] = json[i].currency;
        store["tagPerQty"] = json[i].tagPerQty;
        store["bdgtQtyBeforeRqst"] = json[i].remQty;
        store["bdgtAmntBeforeRqst"] = json[i].remBdgt;
        store["reqQty"] = MoneyFormat(json[i].qty, 5);
        store["reqAmnt"] = MoneyFormat(json[i].amountVatex, 2);
        store["bdgtQtyAfterRqst"] = "";
        store["bdgtAmntAfterRqst"] = "";
        jsonViewConsoDetails.push(store);

        //}

        //else {
        //    UpdateViewConsoDetails(jsonBdgtChk[i].itemCode, jsonBdgtChk[i].UOM, jsonBdgtChk[i].seg1Bdgt, jsonBdgtChk[i].seg2Bdgt, jsonBdgtChk[i].seg3Bdgt, jsonBdgtChk[i].seg4Bdgt,
        //                           jsonBdgtChk[i].seg5Bdgt, jsonBdgtChk[i].seg6Bdgt, jsonBdgtChk[i].itemGrpTypeBdgt, jsonBdgtChk[i].itemLevelBdgt, jsonBdgtChk[i].itemCodeBdgt, jsonBdgtChk[i].qty, jsonBdgtChk[i].amountVatex)
        //}
    }
}

function UpdateViewConsoDetails(itemCode, uom, seg1, seg2, seg3, seg4, seg5, seg6, itemGrpType, itemLvl, item, reqQty, reqAmnt) {
    for (var i = 0; i < jsonViewConsoDetails.length; i++) {

        if (
            jsonViewConsoDetails[i].itemCode == itemCode &&
            jsonViewConsoDetails[i].uom == uom &&
            jsonViewConsoDetails[i].seg1Bdgt == seg1 &&
            jsonViewConsoDetails[i].seg2Bdgt == seg2 &&
            jsonViewConsoDetails[i].seg3Bdgt == seg3 &&
            jsonViewConsoDetails[i].seg4Bdgt == seg4 &&
            jsonViewConsoDetails[i].seg5Bdgt == seg5 &&
            jsonViewConsoDetails[i].seg6Bdgt == seg6 &&
            jsonViewConsoDetails[i].itemGrpTypeBdgt == itemGrpType &&
            jsonViewConsoDetails[i].itemLevelBdgt == itemLvl &&
            jsonViewConsoDetails[i].itemCodeBdgt == item
           ) {
            //Summation of Requested Qty and Requested Amount
            jsonViewConsoDetails[i].reqQty = MoneyFormat(parseFloat(RemoveComma(jsonViewConsoDetails[i].reqQty)) + parseFloat(RemoveComma(reqQty)), 5)
            jsonViewConsoDetails[i].reqAmnt = MoneyFormat(parseFloat(RemoveComma(jsonViewConsoDetails[i].reqAmnt)) + parseFloat(RemoveComma(reqAmnt)), 2)
        }

    }
}

function ComputeAfterAmountsAndQuantity() {
    var RemTotalAmnt = 0.00;
    var RemTotalQty = 0.00;

    var beforeAmnt = 0.00;
    var beforeQty = 0.00;

    var rqstAmnt = 0.00;
    var rqstQty = 0.00;

    var remarks = "";

    var Grid = nwGridViewConsoChargingCon_Book.ActiveSheet;
    var maxRow = Grid.GetMaxRow();

    for(i = 0; i <= maxRow; i++)  {

        remarks = "";

        beforeAmnt = RemoveComma(Grid.GetText(BdgtCtrl.GRD_BCD_BEFORE_AMNT - 1, i));
        beforeQty = RemoveComma(Grid.GetText(BdgtCtrl.GRD_BCD_BEFORE_QTY - 1, i));

        rqstAmnt = RemoveComma(Grid.GetText(BdgtCtrl.GRD_BCD_REQ_AMNT - 1, i));
        rqstQty = RemoveComma(Grid.GetText(BdgtCtrl.GRD_BCD_REQ_QTY - 1, i));

        RemTotalAmnt = parseFloat(beforeAmnt) - parseFloat(rqstAmnt);
        RemTotalQty = Grid.GetText(BdgtCtrl.GRD_BCD_TAGISQTY - 1, i) == "1" ? parseFloat(beforeQty) - parseFloat(rqstQty) : 0;

        if (RemTotalAmnt < 0) {
            remarks = "Exceed";
        }

        else if (RemTotalQty < 0 && Grid.GetText(BdgtCtrl.GRD_BCD_TAGISQTY - 1, i) == "1") {
            remarks = "Exceed";
        }

        Grid.SetText(BdgtCtrl.GRD_BCD_AFTER_AMNT - 1, i, MoneyFormat(RemTotalAmnt, 2));
        Grid.SetText(BdgtCtrl.GRD_BCD_AFTER_QTY - 1, i, MoneyFormat(RemTotalQty, 5));
        Grid.SetText(BdgtCtrl.GRD_BCD_REMARKS - 1, i, remarks);
    }
}

function func_nwGrid_CopyRowDone() {
    var id = crnwTableCon.attr('id');
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    if (id == "nwGrid") {
        Grid.SetText(Main.GRD_REQ_UOM_CODE - 1, row, "");
        Grid.SetText(Main.GRD_REQ_UOM_DESC - 1, row, "");

    }
}

function ChargingRecomputeIfLastRowQty(row) {

    var $row;
    var lastRow = "";
    var totalAmntHDR = parseFloat(RemoveComma($(`#txtTotalAmntVatex`).val()));
    var totalAmnt = 0.00;
    var totalQty = parseFloat(RemoveComma($(`#txtTotalQty`).val()));
    var sumTotal = 0.00;

    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();

    for(i = 0; i <= cntQuotation; i++)  {

        if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG2CODE - 1, i)  != "") {
            lastRow = i;

            if (i < rowBgtChkLIN) {
                sumTotal = parseFloat(sumTotal) + parseFloat(RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, i)));
            }

            totalAmnt = parseFloat(totalAmnt) + parseFloat(RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, i)));
        }

    }

    //todo: if total inputted amount is equals to total amount in the hdr
    if (totalAmntHDR == totalAmnt) {
        return row == lastRow ? (row != 0 ? (totalQty - sumTotal) : RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, i))) : RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, i));
    }
    else {
        return RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, i));
    }

}

function ChargingRecomputeIfLastRowAmnt(row) {

    var $row;
    var lastRow = "";
    var totalAmntHDR = parseFloat(RemoveComma($(`#txtTotalAmntVatex`).val()));
    var totalQtyHDR = parseFloat(RemoveComma($(`#txtTotalQty`).val()));
    var totalQty = 0.00;
    var sumTotal = 0.00;

    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();

    for(i = 0; i <= cntBgtChkLIN; i++) {

        if (GridBgtChkLIN(BdgtLIN.GRD_BCL_SEG2CODE - 1, i) != "") {
            lastRow = i;

            if (i < row) {
                sumTotal = parseFloat(sumTotal) + parseFloat(RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, i)));
            }

            totalQty = parseFloat(totalQty) + parseFloat(RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, i)));
        }

    }

    //todo: if total inputted qty is equals to total qty in the hdr
    if (totalQtyHDR == totalQty) {
        return row == lastRow ? (row != 0 ? (totalAmntHDR - sumTotal) : RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, i))) : RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, i));
    }
    else {
        return RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, row));
    }
}

function AllocRecomputeIfLastRowQty(row) {
    var Grid = nwGridConAllocProcess_Book.ActiveSheet;
    var maxRow = Grid.GetMaxRow();

    var lastRow = "";
    var totalAmntHDR = parseFloat(RemoveComma($(`#txtAllocTotalAmntVatex`).val()));
    var totalAmnt = 0.00;
    var totalQty = parseFloat(RemoveComma($(`#txtAllocTotalQty`).val()));
    var sumTotal = 0.00000;

    for (i = 0; i <= maxRow; i++){

        if (Grid.GetText(GRD_AP_SEG2CODE -1 , i) != "") {
            lastRow = i;

            if (i < row) {
                sumTotal = parseFloat(sumTotal) + parseFloat(RemoveComma(Grid.GetText(GRD_AP_QTY - 1,i)));
            }

            totalAmnt = parseFloat(totalAmnt) + parseFloat(RemoveComma(Grid.GetText(GRD_AP_AMNT_VATEX - 1, i)));
        }

    }

    if (totalAmnt == totalAmntHDR) {
        return row == lastRow ? (row != 0 ? (totalQty - sumTotal) : RemoveComma(Grid.GetText(GRD_AP_QTY - 1, row))) : RemoveComma(Grid.GetText(GRD_AP_QTY - 1, row));
    }
    else if (totalAmnt > totalAmntHDR) {
        return "0.00000";
    }

    else {
        return RemoveComma(Grid.GetText(GRD_AP_QTY - 1, row));
    }
}

function AllocRecomputeIfLastRowAmnt(row) {
    var Grid = nwGridConAllocProcess_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();
    var lastRow = "";
    var totalAmntHDR = RemoveComma($(`#txtAllocTotalAmntVatex`).val());
    var totalQtyHDR = RemoveComma($(`#txtAllocTotalQty`).val());
    var totalQty = 0.00000;
    var sumTotal = 0.00;

    for (i = 0; i <= maxRow; i++){

        if (Grid.GetText(GRD_AP_SEG2CODE -1,i) != "") {
            lastRow = i;

            if (i < row) {
                sumTotal = parseFloat(sumTotal) + parseFloat(RemoveComma(Grid.GetText(GRD_AP_AMNT_VATEX - 1, i)));
            }
            totalQty = parseFloat(totalQty) + parseFloat(RemoveComma(Grid.GetText(GRD_AP_QTY -1, i)));
        }
    }

    if (totalQtyHDR == totalQty) {
        return row == lastRow ? (row != 0 ? (totalAmntHDR - sumTotal) : RemoveComma(Grid.GetText(GRD_AP_AMNT_VATEX - 1, row))) : RemoveComma(Grid.GetText(GRD_AP_AMNT_VATEX - 1, row));
    }
    else {
        return RemoveComma(Grid.GetText(GRD_AP_AMNT_VATEX - 1, row));
    }
}

function ClearCostCenter() {
    if (isDontChange != "1") {
        $('#idvallugCostCenter').val("");
        $('#descvallugCostCenter').val("");
    }
}

function RequiredFieldsInAllocDetails() {
    var tag3 = $('#txtAllocTagSeg3').val();
    var tag4 = $('#txtAllocTagSeg4').val();
    var segment = "";

    if (tag3 == "1" && tag4 == "1")
        segment = `${getProfitCenter()} and ${getCostCenter()}`;

    else if (tag3 == "1")
        segment = getProfitCenter();

    else if (tag4 == "1") {
        segment = getCostCenter();
    }

    return segment;
}

function MultipleQuoControlsFromHistTemp() {
    var hasQuoDtls = false;
    var itemCode = "";
    var reqUOM = "";

    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for (i = 0; i <= maxRow; i++) {

        itemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, i);
        reqUOM = Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, i);
        hasQuoDtls = Grid.GetText(Main.GRD_HASQUOLDTLS - 1, i);

        if (hasQuoDtls != "") {

            setDelQuoProperties(i);
            DefaultPrefVendor(itemCode, reqUOM, i);
            HasSavedInDetails();

        }

    }
}


function MultipleChargingDtlsFromHistTemp() {
    var hasChargingDtls = false;
    var itemCode = "";
    var reqUOM = "";

    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for (i = 0; i <= maxRow; i++) {

        itemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, row);
        reqUOM = Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, row);
        hasChargingDtls = Grid.GetText(Main.GRD_HASBDGTCHK - 1, row);
        hasPending = Grid.GetText(Main.GRD_PENDINGBDGTCHK - 1, row);

        if (hasPending != "") {
            setBdgtChkProperties(i, true);
            HasSavedInDetails();
        }

        else if (hasChargingDtls != "") {

            setBdgtChkProperties(i, false);
            HasSavedInDetails();
        }

    }
}

function MultipleAllocDtlsFromHistTemp() {
    var hasAllocDtls = false;
    var itemCode = "";
    var reqUOM = "";
    var seg1 = "";

    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for (i = 0; i <= maxRow; i++) {

        itemCode = Grid.GetText(Main.GRD_ITEMCODE - 1, i);
        reqUOM = Grid.GetText(Main.GRD_REQ_UOM_CODE - 1, i);
        hasAllocDtls = HasJsonTempBdgtAlloc(itemCode, reqUOM, seg1) >= 0 ? true : false

        if (hasAllocDtls) {

            setAllocChkProperties(i);
            FillTempBdgtChkQtyAndAmnt(i);
            HasSavedInDetails();

        }

    }
}

function RemoveHasPendingTag(row, isRemove) {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    Grid.SetText(Main.GRD_PENDINGBDGTCHK - 1, row, isRemove ? "" : "1");
}

function RemoveHasPendingDlvyTag(row, isRemove) {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    Grid.SetText(Main.GRD_PENDINGDLVYDTLS - 1, row,isRemove ? "" : "1");
}

function GetSegcodePerColumn(currentColumn) {
    var segCode = "";
    switch (currentColumn) {

        case BdgtLIN.GRD_BCL_SEG2CODE:
            segCode = "02";
            break;

        case BdgtLIN.GRD_BCL_SEG3CODE:
            segCode = "03";
            break;

        case BdgtLIN.GRD_BCL_SEG4CODE:
            segCode = "04";
            break;

        case BdgtLIN.GRD_BCL_SEG5CODE:
            segCode = "05";
            break;

        case BdgtLIN.GRD_BCL_SEG6CODE:
            segCode = "06";
            break;
    }

    return segCode;
}


$(document).on('click', '#btnChargeDownload', function (e) {
    nwLoading_Start("xactDownloadTemplate", crLoadingHTML);
    nwParameter_Add("TemplateType", "Charging Details Template")
    nwParameter_Add("isChargingDetails", true)
    func_ActionDriven("actDownloadTemplate", false);

});

$(document).on('click', '#btnAllocationDownload', function (e) {
    nwLoading_Start("xactDownloadTemplate", crLoadingHTML);
    nwParameter_Add("TemplateType", "Allocation Process Template")
    nwParameter_Add("isChargingDetails", false)
    func_ActionDriven("actDownloadTemplate", false);
});

$(document).on('click', '#btnChargeUpload', function (e) {
    upload_type = 'uploadCharge';
    $('#btnupload').attr("Value", 'Upload');
    $("#fileCon").val("");
    $("#status").find("span").text("");
    $(".progress").find("div.percent").text("0%`");
    $(".progress").find("div.bar").css("width", "0%");
    nwPopupForm_ShowModal("nwUploadCon");
    return false;
});

$(document).on('click', '#btnAllocationUpload', function (e) {
    upload_type = 'uploadAllocation';
    $('#btnupload').attr("Value", 'Upload');
    $("#fileCon").val("");
    $("#status").find("span").text("");
    $(".progress").find("div.percent").text("0%`");
    $(".progress").find("div.bar").css("width", "0%");
    nwPopupForm_ShowModal("nwUploadCon");
    return false;
});

$(document).on('click', '#btnupload', function () {
    upload();
});
$(document).on('change', '#fileCon', function () {
    changeFile($(this)[0]);
});


function AddClassForGridButtons() {
    $(`#btnChargeDownload`).addClass("btn-btn-blue");
    $(`#btnChargeUpload`).addClass("btn-btn-orange");


    if (($('#txtEnableChargingSave').val() == "") || $('#txtTrantype').val() == "REQREP") {
        $('#btnBdgtCheck').enable(false);
    } else {
        $('#btnBdgtCheck').enable(true);
    }
}

function ClearUploadField() {
    $("#fileCon").val("");
    $(".bar").css("width", "0%");
    $(".percent").text("0%");
    $("#status").html("");
}

$(document).on('click', '#btnExportUploading', function () {
    nwLoading_Start("xbtnExportUploading", crLoadingHTML);
    nwParameter_Add("isChargingDetails", upload_type == "uploadCharge" ? true : false);
    nwParameter_Add("idvallugCostCenter", $("#idvallugCostCenter").val());
    nwParameter_Add("tagSeg3", $(`#txtAllocTagSeg3`).val());
    nwParameter_Add("tagSeg4", $(`#txtAllocTagSeg4`).val());
    nwParameter_Add("txtBdgtSegCode", $(`#txtBdgtSegCode`).val());

    if (upload_type == "uploadCharge") {
        nwParameter_Add("txtTotalQty", RemoveComma($(`#txtTotalQty`).val()));
        nwParameter_Add("txtTotalAmntVatex", RemoveComma($(`#txtTotalAmntVatex`).val()));
    }
    else {
        nwParameter_Add("txtAllocTotalQty", RemoveComma($(`#txtAllocTotalQty`).val()));
        nwParameter_Add("txtAllocTotalAmntVatex", RemoveComma($(`#txtAllocTotalAmntVatex`).val()));
    }

    func_ActionDriven("actExport_Uploading", false);
});


function GetQtyPerRow_ChargingDetails() {

    var $row;
    var number;
    var vatex = $('#txtBdgtchk_UnitCostVatex').val() != "" ? RemoveComma($('#txtBdgtchk_UnitCostVatex').val()) : 0.00;

    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet; 
    var rowBgtChkLIN = GridBgtChkLIN.CellSelected.row - 1;
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();

    var lastRow = 0;
    for(i = 0; i <= cntBgtChkLIN; i++)  {
        $row = $(n);

        if (cntBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3CODE - 1, i) != "") {
            lastRow = i;

            number = RemoveComma(GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_QTY - 1, i));
            GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, i, ComputeAllocAmnt(number, vatex));
            GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TEMP_AMNT - 1, i, ComputeAllocAmnt(number, vatex))
        }

    }

    if (number != 0) {
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, lastRow, MoneyFormat(ChargingRecomputeIfLastRowAmnt(lastRow), 2));
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TEMP_AMNT - 1, lastRow, MoneyFormat(ChargingRecomputeIfLastRowAmnt(lastRow), 2));
    }

    ComputationForBdgtChckDetails();
}

function GetAmntPerRow_ChargingDetails() {

    var $row;
    var number;
    var lastRow = 0;

    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();


    var vatex = $('#txtBdgtchk_UnitCostVatex').val() != "" ? RemoveComma($('#txtBdgtchk_UnitCostVatex').val()) : 0.00;
    
    for (i = 0; i <= cntBgtChkLIN; i++) {
        if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3CODE - 1,i) != "") {

            lastRow = i;

            number = RemoveComma($row.find(`td:eq(${BdgtLIN.GRD_BCL_AMNT_VATEX}) input`).val());

            GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, i, ComputeAllocQty(number, vatex));
            GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_TEMP_QTY - 1, i, ComputeAllocQty(number, vatex));
        }
    }


    if (number != 0) {
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, lastRow, MoneyFormat(ChargingRecomputeIfLastRowQty(lastRow), 5));
    }

    ComputationForBdgtChckDetails();
}

function GetPrcntPerRow_ChargingDetails() {

    var $row;
    var number;

    var vatex = $('#txtBdgtchk_UnitCostVatex').val() != "" ? RemoveComma($('#txtBdgtchk_UnitCostVatex').val()) : 0.00;
    var qty = RemoveComma($('#txtTotalQty').val());
    var amnt = RemoveComma($('#txtTotalAmntVatex').val());

    var lastRow = 0;

    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();

    for(i = 0; i <= cntBgtChkLIN; i++)  {

        if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3CODE - 1, i) != "") {
            lastRow = i;
            number = RemoveComma(GridBgtChkLIN.GetText(BBdgtLIN.GRD_BCL_PERCENTAGE - 1, i));

            GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_QTY - 1, i, MoneyFormat((parseFloat(qty) * parseFloat(number / 100)), 5));
            GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, i, MoneyFormat((parseFloat(amnt) * parseFloat(number / 100)), 2));
        }
    }

    if (number != 0) {
        GridBgtChkLIN.SetText(BdgtLIN.GRD_BCL_AMNT_VATEX - 1, lastRow, MoneyFormat(ChargingRecomputeIfLastRowAmnt(lastRow), 2));
    }

    ComputationForBdgtChckDetails();
}


function GetQtyPerRow_Allocation() {

    var Grid = nwGridConAllocProcess_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();
    var allocQty;
    var vatex = $('#txtAllocTotalAmntVatex').val() != "" ? RemoveComma($('#txtAllocTotalAmntVatex').val()) : 0.00;
    var totalQty = $('#txtAllocTotalQty').val() != "" ? RemoveComma($('#txtAllocTotalQty').val()) : 0.00;

    var lastRow = 0;
    for (i = 0; i <= maxRow; i++){

        if (Grid.GetText(GRD_AP_SEG3CODE - 1, i) != "") {
            lastRow = i;

            allocQty = RemoveComma(Grid.GetText(GRD_AP_QTY - 1, i));
            Grid.SetText(GRD_AP_AMNT_VATEX - 1, i, ComputeBdgtAllocAmnt(allocQty, totalQty, vatex)); //compute Total Amount(VATIN)
        }

    }

    if (allocQty != 0) {
        Grid.SetText(GRD_AP_AMNT_VATEX - 1, lastRow, MoneyFormat(AllocRecomputeIfLastRowAmnt(lastRow), 2));
    }

    ComputationForBdgtChckAllocDetails();
}

function GetAmntPerRow_Allocation() {
    var qty = RemoveComma($('#txtAllocTotalQty').val());
    var amnt = RemoveComma($('#txtAllocTotalAmntVatex').val());
    var allocQty;
    var allocAmnt;
    var percentage;
    var lastRow = 0;

    var totalVatex = RemoveComma($('#txtAllocTotalAmntVatex').val());
    var totalQty = RemoveComma($('#txtAllocTotalQty').val());

    var Grid = nwGridConAllocProcess_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for (i = 0; i <= maxRow; i++){

        if (Grid.GetText(GRD_AP_SEG3CODE - 1, i) != "") {

            lastRow = i;

            amntVatex = RemoveComma(Grid.GetText(GRD_AP_AMNT_VATEXE - 1, i));

            allocQty = (parseFloat(totalQty) / (parseFloat(totalVatex) / parseFloat(amntVatex)));
            Grid.SetText(GRD_AP_QTY, i, MoneyFormat(allocQty, 5));

        }

    }

    //Check if Last Row
    if (percentage != 0) {
        setGridData('nwGridAllocProcess', 'input', GRD_AP_AMNT_VATEX, lastRow, MoneyFormat(AllocRecomputeIfLastRowAmnt(lastRow), 2));
    }

    ComputationForBdgtChckAllocDetails();
}

function GetPrcntPerRow_Allocation() {
    //change grid to allocation later
    var $row;
    var number;

    var qty = RemoveComma($('#txtTotalQty').val());
    var amnt = RemoveComma($('#txtTotalAmntVatex').val());

    var lastRow = 0;

    var GridBgtChkLIN = nwGridConBgtChkLIN_Book.ActiveSheet;
    var cntBgtChkLIN = GridBgtChkLIN.GetMaxRow();

    for(i = 0; i <= cntBgtChkLIN; i++)  {
        $row = $(n);

        if (GridBgtChkLIN.GetText(BdgtLIN.GRD_BCL_SEG3CODE - 1, i) != "") {
            lastRow = i;
            number = RemoveComma(GridBgtChkLIN.GetText(GRD_AP_PERCENTAGE - 1, i));

            GridBgtChkLIN.SetText(GRD_AP_QTY - 1, i, MoneyFormat((parseFloat(qty) * parseFloat(number / 100)), 5));
            GridBgtChkLIN.SetText(GRD_AP_AMNT_VATEX - 1, i, MoneyFormat((parseFloat(amnt) * parseFloat(number / 100)), 2));
        }
    }

    if (number != 0) {
        GridBgtChkLIN.SetText(GRD_AP_AMNT_VATEX - 1, lastRow, MoneyFormat(AllocRecomputeIfLastRowAmnt(lastRow), 2));
    }

    ComputationForBdgtChckAllocDetails();
}

function StoreInJsonItemList(itemCode, itemDesc, itemGrpTypeCode, itemGrpTypeDesc, uom) {
    var store = {};
    store["itemCode"] = itemCode;
    store["itemDesc"] = itemDesc;
    store["itemGrpTypeCode"] = itemGrpTypeCode;
    store["itemGrpTypeDesc"] = itemGrpTypeDesc;

    store["REQUOM"] = uom;
    jsonItemCodeList.push(store);
}

function UponLookUpItemCode() {
    nwLoading_Start("actUponLookUpItemCode", crLoadingHTML);
    nwParameter_Add("jsonItemCodeList", JSON.stringify(jsonItemCodeList));
    nwParameter_Add("filter", filterItemUOM());
    cust_GetPara();
    func_ActionDriven("actUponLookUpItemCode", false);
}

function UponLookUpItemCodeNon() {
    nwLoading_Start("actUponLookUpItemCodeNon", crLoadingHTML);
    nwParameter_Add("jsonItemCodeList", JSON.stringify(jsonItemCodeList));
    nwParameter_Add("filter", filterItemUOM());
    cust_GetPara();
    func_ActionDriven("actUponLookUpItemCodeNon", false);
}


function JsonItemCodeListFillToGrid() {
    setTimeout(function () {

    var Grid = nwGridCon_Book.ActiveSheet;
    var _crnwTRTemp = Grid.CellSelected.row - 2;
    var row = isWithItemCode ? _crnwTRTemp += 1 : _crnwTRTemp;

    for (var i = 0; i < jsonItemCodeList.length; i++) {

        Grid.SetText(Main.GRD_ITEMGRPTYPE_CODE - 1, _crnwTRTemp, jsonItemCodeList[i].itemGrpType);
        Grid.SetText(Main.GRD_ITEMGRPTYPE_DESC - 1, _crnwTRTemp, jsonItemCodeList[i].itemGrpTypeDesc);
        Grid.SetText(Main.GRD_ITEMCODE - 1 , _crnwTRTemp, jsonItemCodeList[i].Code);
        Grid.SetText(Main.GRD_ITEMDESC - 1, _crnwTRTemp, jsonItemCodeList[i].Description);
        Grid.SetText(Main.GRD_REQ_UOM_CODE - 1, _crnwTRTemp, jsonItemCodeList[i].uom);
        Grid.SetText(Main.GRD_REQ_UOM_DESC - 1, _crnwTRTemp, jsonItemCodeList[i].uomDesc);
        Grid.SetText(Main.GRD_HASSOH - 1 , _crnwTRTemp, jsonItemCodeList[i].tag);
        Grid.SetText(Main.GRD_UNITCOSTVATIN - 1 , _crnwTRTemp, jsonItemCodeList[i].vatin);
        Grid.SetText(Main.GRD_UNITCOSTVATEX - 1, _crnwTRTemp, jsonItemCodeList[i].vatex);
        Grid.SetText(Main.GRD_HASSOH - 1 , _crnwTRTemp, jsonItemCodeList[i].tag);
        Grid.SetText(Main.GRD_GLACCNTCHARGING - 1 , _crnwTRTemp, jsonItemCodeList[i].glCode);
        Grid.SetText(Main.GRD_GLACCNTCHARGINGDESC - 1 , _crnwTRTemp, jsonItemCodeList[i].glDesc);
        Grid.SetText(Main.GRD_BDGT_AMNT - 1 , _crnwTRTemp, jsonItemCodeList[i].Bdgt);
        Grid.SetText(Main.GRD_REQ_SPEC - 1 , _crnwTRTemp, jsonItemCodeList[i].reqSpec);
        Grid.SetText(Main.GRD_SUBLOCATION_CODE - 1 , _crnwTRTemp, jsonItemCodeList[i].subloc);
        Grid.SetText(Main.GRD_SUBLOCATION_DESC - 1 , _crnwTRTemp, jsonItemCodeList[i].sublocDesc);
        Grid.SetText(Main.GRD_INVENTORIABLE - 1 , _crnwTRTemp, jsonItemCodeList[i].inventoriable);
        Grid.SetText(Main.GRD_NONINVENTORIABLE - 1 , _crnwTRTemp, jsonItemCodeList[i].noninventoriable);
        Grid.SetText(Main.GRD_DATEOFLASTPO - 1 , _crnwTRTemp, jsonItemCodeList[i].dateOfLastPO);
        Grid.SetText(Main.GRD_WEIGHTAVECOSTVATIN - 1 , _crnwTRTemp, jsonItemCodeList[i].wacVatin);
        Grid.SetText(Main.GRD_WEIGHTAVECOSTVATEX - 1 , _crnwTRTemp, jsonItemCodeList[i].wacVatex);
        Grid.SetText(Main.GRD_LASTPOPRICEVATIN - 1 , _crnwTRTemp, jsonItemCodeList[i].lastPoPriceVatin);
        Grid.SetText(Main.GRD_LASTPOPRICEVATEX - 1 , _crnwTRTemp, jsonItemCodeList[i].lastPoPriceVatex);
        Grid.SetText(Main.GRD_DELIVERYADDRESS - 1 , _crnwTRTemp, jsonItemCodeList[i].deliveryAddress);
        Grid.SetText(Main.GRD_DECIMALPLACE - 1 , _crnwTRTemp, jsonItemCodeList[i].ItemDecimalPlace);
        Grid.SetText(Main.GRD_ISLOADNONVAT - 1 , _crnwTRTemp, jsonItemCodeList[i].isLoadNonVat);


        if (($('#txtEnableChargingSave').val() == "" || $('#txtTrantype').val() == "REQREP")) {
            let xJSON = {
                UOM: null,
                amountVatex: null,
                currency: null,
                dtslineID: null,
                hasAlloc: null,
                itemCode: null,
                itemCodeBdgt: null,
                itemDescBdgt: null,
                itemGrpTypeBdgt: null,
                itemGrpTypeDescBdgt: null,
                itemLevelBdgt: null,
                itemLevelDescBdgt: null,
                lineID: null,
                percentage: null,
                qty: null,
                remBdgt: null,
                remQty: null,
                reqAlloc: null,
                rownum: null,
                seg1Bdgt: null,
                seg1DescBdgt: null,
                seg2Bdgt: null,
                seg2Code: null,
                seg2Desc: null,
                seg2DescBdgt: null,
                seg3Bdgt: null,
                seg3Code: null,
                seg3Desc: null,
                seg3DescBdgt: null,
                seg4Bdgt: null,
                seg4Code: null,
                seg4Desc: null,
                seg4DescBdgt: null,
                seg5Bdgt: null,
                seg5Code: null,
                seg5Desc: null,
                seg5DescBdgt: null,
                seg6Bdgt: null,
                seg6Code: null,
                seg6Desc: null,
                seg6DescBdgt: null,
                tagCC: null,
                tagPC: null,
                tagPerQty: null,
                tempAmnt: null,
                tempPrcnt: null,
                tempQty: null
            };


            

            xJSON["itemCode"] = jsonItemCodeList[i].Code;
            xJSON["UOM"] = jsonItemCodeList[i].uom;
            xJSON["amountVatex"] = getNumReplace(getNum(jsonItemCodeList[i].vatex.replace(/,/g, '')));
            xJSON["qty"] = 0;
            xJSON["remQty"] = "0.00000";
            xJSON["remBdgt"] = "0.00";
            
            
            xJSON["percentage"] = "100.00000000000";
            xJSON["tempPrcnt"] = "100.00000000000";
            xJSON["seg2Code"] = $('#idvallugLocForm').val();
            xJSON["seg2Desc"] = $('#descvallugLocForm').val();
            xJSON["seg4Code"] = $('#idvallugCostCenter').val();
            xJSON["seg4Desc"] = $('#descvallugCostCenter').val();


            xJSON["seg4Bdgt"] = $('#idvallugCostCenter').val();
            xJSON["seg4DescBdgt"] = $('#descvallugCostCenter').val();

            xJSON["seg5Code"] = jsonItemCodeList[i]["Item Group Code"];
            xJSON["seg5Desc"] = jsonItemCodeList[i]["Item Group"];

            xJSON["seg5Bdgt"] = jsonItemCodeList[i]["Item Group Code"];
            xJSON["seg5DescBdgt"] = jsonItemCodeList[i]["Item Group"];


            xJSON["seg1Bdgt"] = jsonItemCodeList[i].glCode;
            xJSON["seg1DescBdgt"] = jsonItemCodeList[i].glDesc;
            xJSON["currency"] = $('#idvallugCurrency').val();
            jsonBdgtChk.push(xJSON);
        }


        //sublocation controls
        if (jsonItemCodeList[i].noninventoriable == 1 && $('#txtDDISAllowMultiple').val() != "1") {
            Grid.SetEnable(Main.GRD_SUBLOCATION_CODE - 1, i, false);
        }
        else {
            Grid.SetEnable(Main.GRD_SUBLOCATION_CODE - 1, i, true);
        }

        //SOH Controls
        if (jsonItemCodeList[i].tag == 1) {
            Grid.SetBackground(Main.GRD_SOH_DTLS - 1, i, "green");
        }

        //for loaded non vat
        var isLoadNonVat = jsonItemCodeList[i].isLoadNonVat == 1 ? true : false;

        if (isLoadNonVat)
            Grid.SetEnable(Main.GRD_NONVAT - 1, i, false);
        else
            Grid.SetEnable(Main.GRD_NONVAT - 1, i, true);


        //Change Background for Specifications
        Grid.SetBackground(Main.GRD_SPECNOTES - 1, i, "#2689d8");

        row++;
    }

        jsonItemCodeList = [];
    }, 500);


}

function JsonItemCodeListFillToGridNon() {
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;
    var _crnwTRTemp = Grid.CellSelected.row - 2;

    var row = isWithItemCode ? _crnwTRTemp += 1 : _crnwTRTemp;


    for (var i = 0; i < jsonItemCodeList.length; i++) {

        Grid.SetText(SPR_ITEMGRPTYPE_CODE - 1, _crnwTRTemp, jsonItemCodeList[i].itemGrpType);
        Grid.SetText(SPR_ITEMGRPTYPE_DESC - 1, _crnwTRTemp, jsonItemCodeList[i].itemGrpTypeDesc);
        Grid.SetText(SPR_ITEMCODE - 1, _crnwTRTemp, jsonItemCodeList[i].Code);
        Grid.SetText(SPR_ITEMDESC - 1, _crnwTRTemp, jsonItemCodeList[i].Description);
        Grid.SetText(SPR_REQ_UOM_CODE - 1, _crnwTRTemp, jsonItemCodeList[i].uom);
        Grid.SetText(SPR_REQ_UOM_DESC - 1, _crnwTRTemp, jsonItemCodeList[i].uomDesc);
        Grid.SetText(SPR_UNITCOSTVATIN - 1, _crnwTRTemp, jsonItemCodeList[i].vatin);
        Grid.SetText(SPR_UNITCOSTVATEX - 1, _crnwTRTemp, jsonItemCodeList[i].vatex);
        Grid.SetText(SPR_BDGT_AMNT - 1, _crnwTRTemp, jsonItemCodeList[i].Bdgt);
        Grid.SetText(SPR_SUBLOCATION_CODE - 1, _crnwTRTemp, jsonItemCodeList[i].subloc);
        Grid.SetText(SPR_SUBLOCATION_DESC - 1, _crnwTRTemp, jsonItemCodeList[i].sublocDesc);

        if (($('#txtEnableChargingSave').val() == "" || $('#txtTrantype').val() == "REQREP")) {
            let xJSON = {
                UOM: null,
                amountVatex: null,
                currency: null,
                dtslineID: null,
                hasAlloc: null,
                itemCode: null,
                itemCodeBdgt: null,
                itemDescBdgt: null,
                itemGrpTypeBdgt: null,
                itemGrpTypeDescBdgt: null,
                itemLevelBdgt: null,
                itemLevelDescBdgt: null,
                lineID: null,
                percentage: null,
                qty: null,
                remBdgt: null,
                remQty: null,
                reqAlloc: null,
                rownum: null,
                seg1Bdgt: null,
                seg1DescBdgt: null,
                seg2Bdgt: null,
                seg2Code: null,
                seg2Desc: null,
                seg2DescBdgt: null,
                seg3Bdgt: null,
                seg3Code: null,
                seg3Desc: null,
                seg3DescBdgt: null,
                seg4Bdgt: null,
                seg4Code: null,
                seg4Desc: null,
                seg4DescBdgt: null,
                seg5Bdgt: null,
                seg5Code: null,
                seg5Desc: null,
                seg5DescBdgt: null,
                seg6Bdgt: null,
                seg6Code: null,
                seg6Desc: null,
                seg6DescBdgt: null,
                tagCC: null,
                tagPC: null,
                tagPerQty: null,
                tempAmnt: null,
                tempPrcnt: null,
                tempQty: null
            };




            xJSON["itemCode"] = jsonItemCodeList[i].Code;
            xJSON["UOM"] = jsonItemCodeList[i].uom;
            xJSON["amountVatex"] = getNumReplace(getNum(jsonItemCodeList[i].vatex.replace(/,/g, '')));
            xJSON["qty"] = 0;
            xJSON["remQty"] = "0.00000";
            xJSON["remBdgt"] = "0.00";


            xJSON["percentage"] = "100.00000000000";
            xJSON["tempPrcnt"] = "100.00000000000";
            xJSON["seg2Code"] = $('#idvallugLocForm').val();
            xJSON["seg2Desc"] = $('#descvallugLocForm').val();
            xJSON["seg4Code"] = $('#idvallugCostCenter').val();
            xJSON["seg4Desc"] = $('#descvallugCostCenter').val();


            xJSON["seg4Bdgt"] = $('#idvallugCostCenter').val();
            xJSON["seg4DescBdgt"] = $('#descvallugCostCenter').val();

            xJSON["seg5Code"] = jsonItemCodeList[i]["Item Group Code"];
            xJSON["seg5Desc"] = jsonItemCodeList[i]["Item Group"];

            xJSON["seg5Bdgt"] = jsonItemCodeList[i]["Item Group Code"];
            xJSON["seg5DescBdgt"] = jsonItemCodeList[i]["Item Group"];


            xJSON["seg1Bdgt"] = jsonItemCodeList[i].glCode;
            xJSON["seg1DescBdgt"] = jsonItemCodeList[i].glDesc;
            xJSON["currency"] = $('#idvallugCurrency').val();
            jsonBdgtChk.push(xJSON);
        }


        //sublocation controls
        if (jsonItemCodeList[i].noninventoriable == 1 && $('#txtDDISAllowMultiple').val() != "1") {
            Grid.SetEnable(SPR_SUBLOCATION_CODE - 1, i, false);
        }
        else {
            Grid.SetEnable(SPR_SUBLOCATION_CODE - 1, i, true);
        }

        //SOH Controls
        if (jsonItemCodeList[i].tag == 1) {
            Grid.SetBackground(SPR_SOH_DTLS - 1, i, "green");
        }

        //Change Background for Specifications
        Grid.SetBackground(SPR_SPECNOTES - 1, _crnwTRTemp, "#2689d8");
        row++;
    }

    jsonItemCodeList = [];

}


function getCostCenter() {
    return $(`#lblCostCenter`).text() != "" ? $(`#lblCostCenter`).text() : "Cost Center";
}

function getProfitCenter() {
    return $(`#lblProfitCenter`).val();
}
function gettxtDeptDesc() {
    return $(`#txtDeptDesc`).val();
}


function setAccess() {
    if (nwToolBoxConfig[1] == 0 || nwDocno != "") { //CanSave
        $('#btnSingleDel').enable(false);
        $('#btnBdgtCheck').enable(false);
        $('#btnDDSave').enable(false);
        $('#btnSaveQuotation').enable(false);
    }

}

function excludeSelected(nwGridID, col) {
    var row = nwGridID.CellSelected.row - 1;
    var maxRow = nwGridID.GetMaxRow();

    let strTmp = "";


    for (let x = 0; x <= maxRow; x++) {
        let code = nwGridID.GetText(col, x); //nwTempTable_RowData_Get(nwGridID, x, col - 1)
        if (code != "") {
            if (strTmp != "") {
                strTmp += "|" + code;
            } else {
                strTmp = code;
            }
        }
    }
    return strTmp;

}


function saveOnjsonBdgtChk(json) {
    let xJOSN = JSON.parse(json);
}



function isEffectiveWithPeriodDates(effectiveDate) {
    let dateArr = effectiveDate.split("/");
    //let isEffectiveWithPeriodDates = false;
    let dateTag = 0; //tag 1 do not validate, tag 0, not in period dates, tag 2 period no is closed
    if (jsonPerDates.length <= 0) {
        //isEffectiveWithPeriodDates = true;
        dateTag = 1
    } else {
        let loc = $('#idvallugLocForm').val();
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

}

function deleteRow() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for (var x = 0; x <= maxRow; x++) {
        var itmCode = Grid.GetText(Main.GRD_ITEMCODE - 1, x);
        if (delItemCode.includes(itmCode)) {
            nwGridCon_Book.ActiveSheet.RowDelete(x, 1);
        }
    }
}

function nwPopUpGridCon() {
    var Grid = nwGridCon_Book.ActiveSheet;

    Grid.SetText2(Main.GRD_SPECNOTES - 1, Spread_ALLROW, "...");
    Grid.SetTextAlign(Main.GRD_SPECNOTES - 1, Spread_ALLROW, "center");
    Grid.SetBold(Main.GRD_SPECNOTES - 1, Spread_ALLROW , "bold");
    Grid.SetTextColor(Main.GRD_SPECNOTES - 1, Spread_ALLROW, "white");

    Grid.SetText2(Main.GRD_BDGT_CHK_DTLS - 1, Spread_ALLROW, "...");
    Grid.SetTextAlign(Main.GRD_BDGT_CHK_DTLS - 1, Spread_ALLROW, "center");
    Grid.SetBold(Main.GRD_BDGT_CHK_DTLS - 1, Spread_ALLROW, "bold");
    Grid.SetTextColor(Main.GRD_BDGT_CHK_DTLS - 1, Spread_ALLROW, "white");

    Grid.SetText2(Main.GRD_DEL_DTLS - 1, Spread_ALLROW, "#2689d8");
    Grid.SetText2(Main.GRD_DEL_DTLS - 1, Spread_ALLROW, "...");
    Grid.SetTextAlign(Main.GRD_DEL_DTLS - 1, Spread_ALLROW, "center");
    Grid.SetBold(Main.GRD_DEL_DTLS - 1, Spread_ALLROW, "bold");
    Grid.SetTextColor(Main.GRD_DEL_DTLS - 1, Spread_ALLROW, "white");

    Grid.SetText2(Main.GRD_REQ_COMPLIANCE - 1, Spread_ALLROW, "...");
    Grid.SetTextAlign(Main.GRD_REQ_COMPLIANCE - 1, Spread_ALLROW, "center");
    Grid.SetBold(Main.GRD_REQ_COMPLIANCE - 1, Spread_ALLROW, "bold");
    Grid.SetTextColor(Main.GRD_REQ_COMPLIANCE - 1, Spread_ALLROW, "white");

    Grid.SetText2(Main.GRD_QUOTATION - 1, Spread_ALLROW, "...");
    Grid.SetTextAlign(Main.GRD_QUOTATION - 1, Spread_ALLROW, "center");
    Grid.SetBold(Main.GRD_QUOTATION - 1, Spread_ALLROW, "bold");
    Grid.SetTextColor(Main.GRD_QUOTATION - 1, Spread_ALLROW, "white");

    Grid.SetText2(Main.GRD_SOH_DTLS - 1, Spread_ALLROW, "...");
    Grid.SetTextAlign(Main.GRD_SOH_DTLS - 1, Spread_ALLROW, "center");
    Grid.SetBold(Main.GRD_SOH_DTLS - 1, Spread_ALLROW, "bold");
    Grid.SetTextColor(Main.GRD_SOH_DTLS - 1, Spread_ALLROW, "white");

    setTimeout(function () {
        DisableReqCompIfNew();
    }, 500);


}

function nwPopUpGridConDeliveryID() {
    var GridDeliveryID = nwGridConDeliveryID_Book.ActiveSheet;

    if (nwGridCon_Book.ActiveSheet.GetText(Main.GRD_HASDELDTLS - 1, 0) == true) {
        GridDeliveryID.SetBackground(GRD_DD_SOHDTLS - 1, Spread_ALLROW, "#2689d8");
        GridDeliveryID.SetEnable(GRD_DD_SOHDTLS - 1, Spread_ALLROW, true);
    }
    else {
        GridDeliveryID.SetBackground(GRD_DD_SOHDTLS - 1, Spread_ALLROW, "gainsboro");
        GridDeliveryID.SetEnable(GRD_DD_SOHDTLS - 1, Spread_ALLROW, false);
    }

    GridDeliveryID.SetText2(GRD_DD_SOHDTLS - 1, Spread_ALLROW, "...");
    GridDeliveryID.SetTextAlign(GRD_DD_SOHDTLS - 1, Spread_ALLROW, "center");
    GridDeliveryID.SetBold(GRD_DD_SOHDTLS - 1, Spread_ALLROW, "bold");
    GridDeliveryID.SetTextColor(GRD_DD_SOHDTLS - 1, Spread_ALLROW, "white");
}

$(document).on('click', '#btnVwBdgtMonitoring', function () {
    ShowVwMonitoringRpt();
});

function nwPopUpGridConNonCatalogue() {
    var Grid = nwGridConNonCatalogue_Book.ActiveSheet;

    Grid.SetText2(SPR_SPECNOTES - 1, Spread_ALLROW, "#2689d8");
    Grid.SetText2(SPR_SPECNOTES - 1, Spread_ALLROW, "...");
    Grid.SetTextAlign(SPR_SPECNOTES - 1, Spread_ALLROW, "center");
    Grid.SetBold(SPR_SPECNOTES - 1, Spread_ALLROW, "bold");
    Grid.SetTextColor(SPR_SPECNOTES - 1, Spread_ALLROW, "white");

    Grid.SetText2(SPR_BDGT_CHK_DTLS - 1, Spread_ALLROW, "#2689d8");
    Grid.SetText2(SPR_BDGT_CHK_DTLS - 1, Spread_ALLROW, "...");
    Grid.SetTextAlign(SPR_BDGT_CHK_DTLS - 1, Spread_ALLROW, "center");
    Grid.SetBold(SPR_BDGT_CHK_DTLS - 1, Spread_ALLROW, "bold");
    Grid.SetTextColor(SPR_BDGT_CHK_DTLS - 1, Spread_ALLROW, "white");

    Grid.SetText2(SPR_DEL_DTLS - 1, Spread_ALLROW, "#2689d8");
    Grid.SetText2(SPR_DEL_DTLS - 1, Spread_ALLROW, "...");
    Grid.SetTextAlign(SPR_DEL_DTLS - 1, Spread_ALLROW, "center");
    Grid.SetBold(SPR_DEL_DTLS - 1, Spread_ALLROW, "bold");
    Grid.SetTextColor(SPR_DEL_DTLS - 1, Spread_ALLROW, "white");

    Grid.SetText2(SPR_REQ_COMPLIANCE - 1, Spread_ALLROW, "...");
    Grid.SetTextAlign(SPR_REQ_COMPLIANCE - 1, Spread_ALLROW, "center");
    Grid.SetBold(SPR_REQ_COMPLIANCE - 1, Spread_ALLROW, "bold");
    Grid.SetTextColor(SPR_REQ_COMPLIANCE - 1, Spread_ALLROW, "white");

    Grid.SetText2(SPR_QUOTATION  - 1, Spread_ALLROW, "...");
    Grid.SetTextAlign(SPR_QUOTATION  - 1, Spread_ALLROW, "center");
    Grid.SetBold(SPR_QUOTATION  - 1, Spread_ALLROW, "bold");
    Grid.SetTextColor(SPR_QUOTATION - 1, Spread_ALLROW, "white");

    DisableReqCompIfNewNon();
}


function cuz_LoadBdgtCheckAlloc() {
    var Grid = nwGridConAllocProcess_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;

    Grid.SetText(GRD_AP_SEG3CODE - 1, 0, nwGridConBgtChkLIN_Book.ActiveSheet.GetText(BdgtLIN.GRD_BCL_SEG3CODE - 1, 0));
    Grid.SetText(GRD_AP_SEG3DESC - 1, 0, nwGridConBgtChkLIN_Book.ActiveSheet.GetText(BdgtLIN.GRD_BCL_SEG3DESC - 1, 0));
    Grid.SetText(GRD_AP_SEG4CODE - 1, 0, nwGridConBgtChkLIN_Book.ActiveSheet.GetText(BdgtLIN.GRD_BCL_SEG4CODE - 1, 0));
    Grid.SetText(GRD_AP_SEG4DESC - 1, 0, nwGridConBgtChkLIN_Book.ActiveSheet.GetText(BdgtLIN.GRD_BCL_SEG4DESC - 1, 0));

    ComputationForBdgtChckAllocDetails();
    ComputeBdgtAllocPrcnt();
}

            
function enableSOHDetails() {
    var Grid = nwGridConDeliveryID_Book.ActiveSheet;
    var row = Grid.CellSelected.row - 1;
    var maxRow = Grid.GetMaxRow();

    for (var x = 0; x <= maxRow; x++) {
        if (Grid.GetText(GRD_DD_SPLITQTY - 1, x) != "") {
            Grid.SetBackground(GRD_DD_SOHDTLS - 1, x, "#2689d8");
            Grid.SetEnable(GRD_DD_SOHDTLS - 1, x, true);
        }
        else {
            Grid.SetBackground(GRD_DD_SOHDTLS - 1, x, "gainsboro");
            Grid.SetEnable(GRD_DD_SOHDTLS - 1, x, false);
        }
    }
}

$(document).on('click', '.btnVwDtls', function () {
    //var data = $(this).parents("tr").find("td:eq(1)").text();

    //ToastMessage(data);
    //return false;
    var itemCode = $(this).attr('id');

    if (itemCode.length > 0) {
        ViewItemDetails(itemCode);
        $('#nwPopItemDetailsWindow').addClass("zindexHigh"); $('#dimbgNWLoadHstTemplate').addClass("zindexHigh2");
    }
    return false;
});

function enableValuedate() {
    if ($('#isAllwBackdateTran').val() == "1") {
        if (nwDocno == "") {
            $('#txtValueDate2').enable(true);
        } else {
            $('#txtValueDate2').enable(false);
        }

    } else {
        $('#isAllowBackDateWrapper').visible(false);
    }
}

function isAllwBackDatingTran() {

    if ($('#isAllwBackdateTran').val() == "1") {
        $('#isAllowBackDateWrapper').visible(true);
    } else {
        $('#isAllowBackDateWrapper').visible(false);
    }

    let valueDate = $('#txtValueDate2').val();
    let datePosted = $('#txtDatePosted2').val();

    if (valueDate != "" && datePosted != "") {
        $('#isAllowBackDateWrapper').visible(true);
    } else if (Date.parse(valueDate) == Date.parse(datePosted)) {
        $('#isAllowBackDateWrapper').visible(false);
    } else {
        $('#isAllowBackDateWrapper').visible(true);
    }
}

function cuz_BindCollection() {
    isAllwBackDatingTran();
    enableValuedate();
    setAccess();
}

function setDefaultValueDate() {
    $('#txtValueDate2').val($('#txtServerdate').val());
}

$(document).on('change', '#txtValueDate2', function () {
    let effectiveDate = $(this).val(); setDefaultValueDate
    let tag = isEffectiveWithPeriodDates(effectiveDate)
    if (effectiveDate == "") {
        return;
    }
    if (Date.parse(effectiveDate) > Date.parse($('#txtServerdate').val())) {
        MessageBox("Cannot proceed. Value Date should not be later than the current server date.", MenuItemTitle, "error");
        $(this).val('');
        $(this).focus();
    } else if (tag == 0) {
        MessageBox("Cannot proceed. Value Date should be within the set period dates.", MenuItemTitle, 'error');
        $(this).val('');
        //}else if(tag == 2){
        //    MessageBox("Cannot proceed. Period is already closed.", MenuItemTitle, 'error');
        //    $(this).val('');
    }
    else {
        nwParameter_Add("idvallugaccform", $('#idvallugLocForm').val());
        nwParameter_Add("txtvaldate", $('#txtValueDate2').val());
        func_ActionDriven("actValDate", false);
    }
});