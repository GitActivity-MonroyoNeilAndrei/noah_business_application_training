var _crnwTR = "";
var _isOpen = true;

var nwGridCon_Book;
var nwGridCon_Sheet;

var nwGridDD_Book;
var nwGridDD_Sheet;

var nwGridBCD_Book;
var nwGridBCD_Sheet;

var nwGridRRD_Book;
var nwGridRRD_Sheet;


var nwGridPPH_Book;
var nwGridPPH_Sheet;


var nwGridValList_Book;
var nwGridValList_Sheet;

var nwGridApprvlHst_Book;
var nwGridApprvlHst_Sheet;

var nwGridUpdateunaccreditedVendorCon_Book;
var nwGridUpdateunaccreditedVendorCon_Sheet;

var nwGridApplyPODetailsCon_Book;
var nwGridApplyPODetailsCon_Sheet;




//nwGridRRDCon
var SPR_RRD_INDEX = 1,
    SPR_RRD_PRDOCNO = SPR_RRD_INDEX,
    SPR_RRD_PRDATE = ++SPR_RRD_INDEX,
    SPR_RRD_PRUOM = ++SPR_RRD_INDEX,
    SPR_RRD_PRQTY = ++SPR_RRD_INDEX,
    SPR_RRD_CURRENCY = ++SPR_RRD_INDEX,
    SPR_RRD_PRUNITCOSTVATEX = ++SPR_RRD_INDEX,
    SPR_RRD_PRUNITCOSTVATIN = ++SPR_RRD_INDEX,
    SPR_RRD_TOTALPRAMTVATEX = ++SPR_RRD_INDEX,
    SPR_RRD_TOTALPRAMTVATIN = ++SPR_RRD_INDEX,
    SPR_RRD_REQNAME = ++SPR_RRD_INDEX,
    SPR_RRD_PODUEDATE = ++SPR_RRD_INDEX,
    SPR_RRD_REQDOCNO = ++SPR_RRD_INDEX,
    SPR_RRD_REQSUBDATE = ++SPR_RRD_INDEX,
    SPR_RRD_REQAPPRVDATE = ++SPR_RRD_INDEX,
    SPR_RRD_REQOBJECTIVE = ++SPR_RRD_INDEX,
    SPR_RRD_RSNREQ = ++SPR_RRD_INDEX,
    SPR_RRD_LOCATIONCODE = ++SPR_RRD_INDEX,
    SPR_RRD_LOCATIONDESC = ++SPR_RRD_INDEX,
    SPR_RRD_CCCODE = ++SPR_RRD_INDEX,
    SPR_RRD_CCDESC = ++SPR_RRD_INDEX,
    SPR_RRD_PARTICULARS = ++SPR_RRD_INDEX,
    SPR_RRD_PRTAGGING = ++SPR_RRD_INDEX,
    SPR_RRD_VIEW_REQ_ENTRY = ++SPR_RRD_INDEX,
    SPR_RRD_LAST_COL = SPR_RRD_INDEX;

var SPR_PPH_INDEX = 1,
    SPR_PPH_PODATE = SPR_PPH_INDEX,
    SPR_PPH_PODOCNO = ++SPR_PPH_INDEX,
    SPR_PPH_VENDORCODE = ++SPR_PPH_INDEX,
    SPR_PPH_VENDORNAME = ++SPR_PPH_INDEX,
    SPR_PPH_POUOM = ++SPR_PPH_INDEX,
    SPR_PPH_QTY = ++SPR_PPH_INDEX,
    SPR_PPH_CURRENCY = ++SPR_PPH_INDEX,
    SPR_PPH_ORDERTYPE = ++SPR_PPH_INDEX,
    SPR_PPH_UNITPRICEVATEX = ++SPR_PPH_INDEX,
    SPR_PPH_UNITPRICEVATIN = ++SPR_PPH_INDEX,
    SPR_PPH_TOTALPOAMTVATEX = ++SPR_PPH_INDEX,
    SPR_PPH_TOTALPOAMTVATIN = ++SPR_PPH_INDEX,
    SPR_PPH_PRUOM = ++SPR_PPH_INDEX,
    SPR_PPH_CONUCOSTVATEX = ++SPR_PPH_INDEX,
    SPR_PPH_LASTCOL = SPR_PPH_INDEX;

var SPR_BCD_INDEX = 1
SPR_BCD_SEG1CODE = SPR_BCD_INDEX,
SPR_BCD_SEG1DESC = ++SPR_BCD_INDEX,
SPR_BCD_SEG2CODE = ++SPR_BCD_INDEX,
SPR_BCD_SEG2DESC = ++SPR_BCD_INDEX,
SPR_BCD_SEG3CODE = ++SPR_BCD_INDEX,
SPR_BCD_SEG3DESC = ++SPR_BCD_INDEX,
SPR_BCD_SEG4CODE = ++SPR_BCD_INDEX,
SPR_BCD_SEG4DESC = ++SPR_BCD_INDEX,
SPR_BCD_SEG5CODE = ++SPR_BCD_INDEX,
SPR_BCD_SEG5DESC = ++SPR_BCD_INDEX,
SPR_BCD_SEG6CODE = ++SPR_BCD_INDEX,
SPR_BCD_SEG6DESC = ++SPR_BCD_INDEX,
SPR_BCD_IGTCODE = ++SPR_BCD_INDEX,
SPR_BCD_IGTDESC = ++SPR_BCD_INDEX,
SPR_BCD_LEVEL = ++SPR_BCD_INDEX,
SPR_BCD_LEVELCLASS = ++SPR_BCD_INDEX,
SPR_BCD_ITEMCODE = ++SPR_BCD_INDEX,
SPR_BCD_ITEMDESC = ++SPR_BCD_INDEX,
SPR_BCD_PRDOCNO = ++SPR_BCD_INDEX,
SPR_BCD_REQNO = ++SPR_BCD_INDEX,
SPR_BCD_LASTCOL = SPR_BCD_INDEX;



//nwGridApplyPODetailsCon
var SPR_PO_DTLS_INDEX = 1,
    SPR_PO_DTLS_DOCNO = SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_PRCONSO_CODE = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_TAX_RATE = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_HAS_PAY_COMP = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_IS_PAY_COMP = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_VENDOR_CODE = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_VENDOR = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_ITEMTYPE_CODE = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_ITEMTYPE_DESC = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_IS_GEN_AS_1_PO = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_VAT_CODE = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_VAT_DESC = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_PAY_CAT_CODE = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_PAY_CAT = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_PAY_TERM_CODE = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_PAY_TERM = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_PAY_CAT_CODE_DEFAULT = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_PAY_CAT_DEFAULT = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_PAY_TERM_CODE_DEFAULT = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_PAY_TERM_DEFAULT = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_AMNT_VATEX_BEFORE_DISC_FRHT_DEFAULT = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_AMNT_VATIN_BEFORE_DISC_FRHT_DEFAULT = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_PAY_COMP = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_AMNT_VATEX_BEFORE_DISC_FRHT = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_AMNT_VATIN_BEFORE_DISC_FRHT = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_DISC_AMNT_VATEX = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_DISC_AMNT_VATIN = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_FRGHT_AMNT_VATEX = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_FRGHT_AMNT_VATIN = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_AMNT_VATEX_AFTER_DISC_FRHT = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_AMNT_VATIN_AFTER_DISC_FRHT = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_PARTICULARS = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_OTHER_PAY_REMARKS = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_DEL_INS = ++SPR_PO_DTLS_INDEX,
     SPR_PO_DTLS_IS_SERVICE = ++SPR_PO_DTLS_INDEX,
    SPR_PO_DTLS_MAX_COL = SPR_PO_DTLS_INDEX;




var SPR_PC_PAYCOMPENENTCODE = 1,
    SPR_PC_PAYCOMPONENTDESC = 2,
    SPR_PC_ISDISABLE = 3,
    SPR_PC_ISENABLEPAYTERM = 4,
    SPR_PC_PERCBASEDONTOTALPO = 5,
    SPR_PC_AMTBASEDONTOTALPO = 6,
    SPR_PC_ITEMGRPTYPECODE = 7,
    SPR_PC_ITEMGRPTYPEDESC = 8,
    SPR_PC_PAYTERMCODE = 9,
    SPR_PC_PAYTERMDESC = 10,
    SPR_PC_PAYDATE = 11,
    SPR_PC_REMARKS = 12;

//var //nwGrid
//    SPR_INDEX_M = 1,
//    SPR_SELECT = SPR_INDEX_M,
//    SPR_ITEM_TYPE = ++SPR_INDEX_M,
//    SPR_ITEMCODE = ++SPR_INDEX_M,
//    SPR_PRITEM = ++SPR_INDEX_M,
//    SPR_ITEMDESC = ++SPR_INDEX_M,
//    SPR_SPECNOTES = ++SPR_INDEX_M,
//    SPR_UOM = ++SPR_INDEX_M,
//    SPR_UOMDESC = ++SPR_INDEX_M,
//    SPR_PRQTY = ++SPR_INDEX_M,
//    SPR_EXQTY = ++SPR_INDEX_M,
//    SPR_POQTY = ++SPR_INDEX_M,
//    SPR_LWST_QUOTE_UC_VATEX = ++SPR_INDEX_M,
//    SPR_LWST_QUOTE_UC_VATIN = ++SPR_INDEX_M,
//    SPR_USELASTPOPRICE = ++SPR_INDEX_M,
//    SPR_POUNITCOST_VATEX = ++SPR_INDEX_M,
//    SPR_POUNITCOSTVATIN = ++SPR_INDEX_M,
//    SPR_DISC_AMNT = ++SPR_INDEX_M,
//    SPR_FRGHT_AMNT = ++SPR_INDEX_M,
//    SPR_POTOTALAMT_VATEX = ++SPR_INDEX_M,
//    SPR_POTOTALAMT_VATIN = ++SPR_INDEX_M,
//    SPR_PO_SAVEAMNT_VATEX = ++SPR_INDEX_M,
//    SPR_PO_SAVEAMNT_VATIN = ++SPR_INDEX_M,
//    SPR_ORDERTYPECODE = ++SPR_INDEX_M,
//    SPR_ORDERTYPEDESC = ++SPR_INDEX_M,
//    SPR_VENDORCODE = ++SPR_INDEX_M,
//    SPR_VENDORNAME = ++SPR_INDEX_M,
//    SPR_CURRENCY = ++SPR_INDEX_M,
//    SPR_VATCODE = ++SPR_INDEX_M,
//    SPR_VATDESC = ++SPR_INDEX_M,
//    SPR_EWTCODE = ++SPR_INDEX_M,
//    SPR_EWTDESC = ++SPR_INDEX_M,
//    SPR_CANVASSDTLS = ++SPR_INDEX_M,
//    SPR_VIEWCANVASS = ++SPR_INDEX_M,
//    SPR_CONSOPRNO = ++SPR_INDEX_M,
//    SPR_REVIEWATTACH = ++SPR_INDEX_M,
//    SPR_HAS_REVIEWATTACH = ++SPR_INDEX_M,
//    SPR_CURRDESC = ++SPR_INDEX_M,
//    SPR_VATRATE = ++SPR_INDEX_M,
//    SPR_LINEID = ++SPR_INDEX_M,
//    SPR_ROWNUM = ++SPR_INDEX_M,
//    SPR_CONSOPRLINEID = ++SPR_INDEX_M,

//    SPR_LASTPOPRICE = ++SPR_INDEX_M,
//    SPR_LASTPOAPPRVDATE = ++SPR_INDEX_M,
  
//    SPR_CANVASSTAG = ++SPR_INDEX_M,
//    SPR_ORIGUOM = ++SPR_INDEX_M,
//    SPR_FACTOR = ++SPR_INDEX_M,
//    SPR_ORIGUOMDESC = ++SPR_INDEX_M,
//    SPR_DOCDETAILS = ++SPR_INDEX_M,
//    SPR_VWCANVASSTAG = ++SPR_INDEX_M,
//    SPR_ORIGPOQTY = ++SPR_INDEX_M,
//    SPR_VATEWTTAG = ++SPR_INDEX_M,
//    SPR_QTY4PO = ++SPR_INDEX_M,
//    SPR_BASEQTY = ++SPR_INDEX_M,
//    SPR_DONOTALLOW = ++SPR_INDEX_M,
//    SPR_IGTCODE = ++SPR_INDEX_M,
//    SPR_HAS_SAME_UOM = ++SPR_INDEX_M,
//    SPR_IS_ALLOW_CURR = ++SPR_INDEX_M;



var SPR_INDEX_M = 1,
    SPR_SELECT = SPR_INDEX_M,
    SPR_ITEM_TYPE = ++SPR_INDEX_M,
    SPR_ITEMCODE = ++SPR_INDEX_M,
    SPR_PRITEM = ++SPR_INDEX_M,
    SPR_ITEMDESC = ++SPR_INDEX_M,
    SPR_SPECNOTES = ++SPR_INDEX_M,
    SPR_UOM = ++SPR_INDEX_M,
    SPR_UOMDESC = ++SPR_INDEX_M,
    SPR_PRQTY = ++SPR_INDEX_M,
    SPR_EXQTY = ++SPR_INDEX_M,
    SPR_POQTY = ++SPR_INDEX_M,
    SPR_LWST_QUOTE_UC_VATEX = ++SPR_INDEX_M,
    SPR_LWST_QUOTE_UC_VATIN = ++SPR_INDEX_M,

    SPR_USELASTPOPRICE = ++SPR_INDEX_M,
    SPR_POUNITCOST_VATEX = ++SPR_INDEX_M,
    SPR_POUNITCOSTVATIN = ++SPR_INDEX_M,
    SPR_DISC_AMNT = ++SPR_INDEX_M,
    SPR_FRGHT_AMNT = ++SPR_INDEX_M,
    SPR_POTOTALAMT_VATEX = ++SPR_INDEX_M,
    SPR_POTOTALAMT_VATIN = ++SPR_INDEX_M,
    SPR_PO_SAVEAMNT_VATEX = ++SPR_INDEX_M,
    SPR_PO_SAVEAMNT_VATIN = ++SPR_INDEX_M,
    SPR_ORDERTYPECODE = ++SPR_INDEX_M,
    SPR_ORDERTYPEDESC = ++SPR_INDEX_M,
    SPR_VENDORCODE = ++SPR_INDEX_M,
    SPR_VENDORNAME = ++SPR_INDEX_M,
    SPR_CURRENCY = ++SPR_INDEX_M,
    SPR_VATCODE = ++SPR_INDEX_M,
    SPR_VATDESC = ++SPR_INDEX_M,
    SPR_EWTCODE = ++SPR_INDEX_M,
    SPR_EWTDESC = ++SPR_INDEX_M,
    SPR_CANVASSDTLS = ++SPR_INDEX_M,
    SPR_VIEWCANVASS = ++SPR_INDEX_M,
    SPR_CONSOPRNO = ++SPR_INDEX_M,
    SPR_PRDOCNO = ++SPR_INDEX_M,
    SPR_REVIEWATTACH = ++SPR_INDEX_M,
    SPR_HAS_REVIEWATTACH = ++SPR_INDEX_M,
    SPR_CURRDESC = ++SPR_INDEX_M,
    SPR_VATRATE = ++SPR_INDEX_M,
    SPR_LINEID = ++SPR_INDEX_M,
    SPR_ROWNUM = ++SPR_INDEX_M,
    SPR_CONSOPRLINEID = ++SPR_INDEX_M,

    SPR_LASTPOPRICE = ++SPR_INDEX_M,
    SPR_LASTPOAPPRVDATE = ++SPR_INDEX_M,

    SPR_CANVASSTAG = ++SPR_INDEX_M,
    SPR_ORIGUOM = ++SPR_INDEX_M,
    SPR_FACTOR = ++SPR_INDEX_M,
    SPR_ORIGUOMDESC = ++SPR_INDEX_M,
    SPR_DOCDETAILS = ++SPR_INDEX_M,
    SPR_VWCANVASSTAG = ++SPR_INDEX_M,
    SPR_ORIGPOQTY = ++SPR_INDEX_M,
    SPR_VATEWTTAG = ++SPR_INDEX_M,
    SPR_BASEQTY = ++SPR_INDEX_M,
    SPR_DONOTALLOW = ++SPR_INDEX_M,
    SPR_IGTCODE = ++SPR_INDEX_M,
    SPR_HAS_SAME_UOM = ++SPR_INDEX_M,
    SPR_ALT_LINEID = ++SPR_INDEX_M,
    SPR_IS_ALLOW_CURR = ++SPR_INDEX_M;

var //nwGridDDCon
    SPR_DD_DELIVERYDATE = 1,
    SPR_DD_REQDELDATE = 2,
    SPR_DD_QTYPO = 3,
    SPR_DD_UOM = 4,
    SPR_DD_REQUOM = 5,
    SPR_DD_PRQTY = 6,
    SPR_DD_REMQTY = 7,
    SPR_DD_EXQTY = 8,
    SPR_DD_LOCATION = 9,
    SPR_DD_LOCDESC = 10,
    SPR_DD_SUBLOC = 11,
    SPR_DD_SUBLOCDESC = 12,
    SPR_DD_DELADD = 13,
    SPR_DD_DELRECEIPT = 14,
    SPR_DD_PRDOCNO = 15,
    SPR_DD_PRCONSO = 16,
    SPR_DD_ITEMCODE = 17,
    SPR_DD_PRLINEID = 18,
    SPR_DD_LINEID = 19,
    SPR_DD_ROWNO = 20,
    SPR_DD_POUOMCODE = 21,
    SPR_DD_REQUOMCODE = 22,
    SPR_DD_VENDOR = 23,
    SPR_DD_QTYPO_ORIG = 24,
    SPR_DD_QTYPR_ORIG = 25,
    SPR_DD_PRTAG = 26,
    SPR_DD_MAINROWNO = 27;

var //nwGridCanvassCon
    SPR_CD_ITEMCODE = 1,
    SPR_CD_ITEMDESC = 2,
    SPR_CD_UOM = 3,
    SPR_CD_QTY = 4,
    SPR_CD_VENDORUOM = 5,
    SPR_CD_VENDORUOMDESC = 6,
    SPR_CD_VENDORQTY = 7,
    SPR_CD_UCOSTVATEX = 8,
    SPR_CD_UCOSTVATIN = 9,
    SPR_CD_VENDORCODE = 10,
    SPR_CD_VENDORNAME = 11,
    SPR_CD_VENDORCONTACT = 12,
    SPR_CD_REMARKS = 13,
    SPR_CD_UOMCODE = 14;

var //nwGridProcessCon
    SPR_P_SELECT = 1,
    SPR_P_DOCNO = 2,
    SPR_P_DATECREATED = 3,
    SPR_P_LOCATION = 4,
    SPR_P_LOCCODE = 5;

var //nwGridValListCon
    SPR_VAL_VALREMARKS = 1,
    SPR_VAL_ROWNO = 2,
    SPR_VAL_PRCONSO = 3,
    SPR_VAL_ITEMCODE = 4,
    SPR_VAL_ITEMDESC = 5,
    SPR_VAL_UOM = 6,
    SPR_VAL_QTY = 7,
    SPR_VAL_VENDORUOM = 8,
    SPR_VAL_VENDORQTY = 9,
    SPR_VAL_UCOSTVATIN = 10,
    SPR_VAL_UCOSTVATEX = 11,
    SPR_VAL_REMARKS = 12,
    SPR_VAL_VENDORCODE = 13,
    SPR_VAL_VENDORNAME = 14,
    SPR_VAL_VENDORCONTACT = 15;

var SPR_UNACCREDITED_INDEX = 1,
    SPR_UNACCREDITED_VEND_NAME = SPR_UNACCREDITED_INDEX,
    SPR_UNACCREDITED_VEND_CODE = ++SPR_UNACCREDITED_INDEX,
    SPR_UNACCREDITED_VEND_DESC = ++SPR_UNACCREDITED_INDEX,
    SPR_UNACCREDITED_MAX_COL = SPR_UNACCREDITED_INDEX;



var recUser = "";
var nwGrid_TR;

var BtngblVendorLookup = false;

var jsonPerDates = [];
var jsonPerDatesClosing = [];

var isFROMApplPO = false;
var isTrigger = false;
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

var SPR_M_LOOKPUP = 1,
    SPR_M_LOOKUP_VENDORCODE = SPR_M_LOOKPUP,
    SPR_M_LOOKUP_VENDORNAME = ++SPR_M_LOOKPUP,
    SPR_M_LOOKUP_VATCODE = ++SPR_M_LOOKPUP,
    SPR_M_LOOKUP_VATDESC = ++SPR_M_LOOKPUP,
    SPR_M_LOOKUP_EWTCODE = ++SPR_M_LOOKPUP,
    SPR_M_LOOKUP_EWTDESC = ++SPR_M_LOOKPUP,
    SPR_M_LOOKUP_VATRATE = ++SPR_M_LOOKPUP,
    SPR_M_LOOKUP_ALLOWCURR = ++SPR_M_LOOKPUP,
    SPR_M_LOOKUP_VIEW_DETAILS = ++SPR_M_LOOKPUP,
    SPR_M_LOOKUP_MAX_COL = SPR_M_LOOKPUP;

var SPR_AOV_LOOKPUP = 1,
    SPR_AOV_LOOKUP_VENDORCODE = SPR_AOV_LOOKPUP,
    SPR_AOV_LOOKUP_VENDORNAME = ++SPR_AOV_LOOKPUP,
    SPR_AOV_LOOKUP_CURRENCY = ++SPR_AOV_LOOKPUP,
    SPR_AOV_LOOKUP_VENDORTIN = ++SPR_AOV_LOOKPUP,
    SPR_AOV_LOOKUP_VENDORADDR = ++SPR_AOV_LOOKPUP,
    SPR_AOV_LOOKUP_VIEW_DETAILS = ++SPR_AOV_LOOKPUP,
    SPR_AOV_LOOKUP_MAX_COL = SPR_AOV_LOOKPUP;


var applyPOTRIndex = 0;

var jsonCanvassDtls = [];
var jsonCanvassDtlsFiltered = [];
var jsonDelDtls = [];
var jsonDelDtlsFiltered = [];
var jsonSingleDelDtls = [];
var jsonSingleDelDtlsFiltered = [];

var jsonRefReqDetails = [];
var jsonPOPriceHist = [];
var jsonChrngDetails = [];

var jsonApplyPODetails = [];
var jsonDiscFrghtConfig = [];
var jsonUpdateunaccridtedVendor = [];

var Title = 'PO Awarding Entry'

var menuItemTitle_PC = "PO Details";

var filter = "";
var currentServerDate = "";
var tmpDocno;
var currRow;
var nwDocno = '';
var prConso_glb = '';
var itemCode_glb = '';
var uom_glb = '';
var prconso_hdr = '';

var isGridClick = false;
var isNewData = true;
var remarksConfig = 0;
var isQtyClick = false;
var isLink = '';

function func_Reload() {
    crLnk = GetCurrentURL() + "POAwardingEntry_Gateway";
    crLnkGateKey = "POAwardingEntry";
    crnwTagSingleBind = true;

    nwPopupForm_Create("nwProcess", true);
    nwPopupForm_Create("ApprovalHst", true);
    nwPopupForm_Create("CanvassDtls", true);
    nwPopupForm_Create("nwUploadCon", false);
    nwPopupForm_Create("nwValidationList", true);
    nwPopupForm_Create("nwRemarks1", false);
    nwPopupForm_Create("nwRemarks", false);
    nwPopupForm_Create("ApplySingleDelDate", false);
    nwPopupForm_Create("ApplySingleDelDate_Item", false);
    nwPopupForm_Create("ApplyOneVendor", false);
    nwPopupForm_Create("nwBudgetCtrlDetails", true);
    nwPopupForm_Create("applyPODtls", true);
    nwPopupForm_Create("nwPaymentComponent", false);


    nwPopupForm_Create("UpdateunaccreditedVendor", true);

    nwPopupForm_Create("mainVendorLookup", false);
    nwPopupForm_Create("AOVVendorLookup", false);

    $('#cboxRowNumber').hide();
    var isContinue = true;

    DisableFields();
    ToolBoxGetData = false;
    nwDocno = getParameterByName('nwDocno');
    isLink = getParameterByName('isLink');

    $("#settingstabs").loadAddtoList({ list: ["PR Consolidation No."], icon: true });
    $("#settingstabs").tabs();

    $("#settingstabs_Item").loadAddtoList({ list: ["Item"], icon: true });
    $("#settingstabs_Item").tabs();
    //$('#tab-one, #tab-two, #tab-three, #tab-four, #tab-five').prop('checked', true);


    //add filter by custom button
    $('#atlContainer.btnClearList').after('<button id="btnLoadDtls" type="button" class="btnClearList btnBlue nwCuz064" disabled="" nwdisabled="false">Load Details</button>');
    init_request();

    $(".tabs-lbl").hide();
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    return isContinue;
}

////////////////////////// TOol Box
function mainLoad() {
    nwParameter_Add("nwDocno", nwDocno);
    if (nwDocno != '') {
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox").visible(false);
        //$(".noah-webui-default-Content_Container").enable(false);
    }
    if (isLink == "1") {
        $('#noah-webui-default-New').click();
    }
}

function showPopupBtn() {
    $('#Message_No').css('display', '');
    $('#Message_Cancel').css('display', 'none');
}

function nwDocnoDisabled() {
    $('#txtValueDate').enable(false);
    if (nwDocno != '') {
        $('#btnReqComp').enable(true);
        $('#btnUploadCanvass').enable(false);
        $('.nwgrid_CopyRow').enable(false);
        $('.nwgrid_Delete').enable(false);
        $('#btnApplyOneVendor').enable(false);
        $('#btnApplySingleDelDate').enable(false);
        $('#btnAplyPODtls').enable(false);
        $('#btnUpdateunaccreditedVendor').enable(false);
        $('#cboxRowNumber').enable(false);
        $('#btnApplySingleDelDate_DD').enable(false);
        $('#btnRefresh_BCD').enable(false);
        $('#btnRefresh_RRD').enable(false);
        $('#btnRefresh_PPH  ').enable(false);
        $('#cmbSortByName_BCD').enable(false);
        $('#cmbSortByAscDesc_BCD').enable(false);
        $('#cmbSortByName_RRD').enable(false);
        $('#cmbSortByAscDesc_RRD').enable(false);
        $('#cmbSortByName_PPH').enable(false);
        $('#cmbSortByAscDesc_PPH').enable(false);
        $('#nwGridDDCon').enable(false);
        $('.isNumber').enable(false);
        $('.chkSelect').enable(false);
        $('#chkUseLastPO').enable(false);
        $('#txtValueDate').enable(false);


        let valueDate = $('#txtValueDate').val();
        let datePosted = $('#dtpDatePosted').val();
        if (valueDate != "" && datePosted != "") {
            $('#txtValueDateWrapper').visible(true);
        } else if (Date.parse(valueDate) == Date.parse(datePosted)) {
            $('#txtValueDateWrapper').visible(false);
        } else {
            $('#txtValueDateWrapper').visible(true);
        }




        nwGrid = $("#nwGrid .tblGridBody tbody ");
        var length = nwGrid.find("tr").length;
        var payamount_loc = 0, payamount_hom = 0;
        var isCheckAll = true;

        $('#chknwgRemarks').enable(false);
        $('#btnnwgRemarks').enable(false);
        $('#txtnwgRemarks').enable(false);


        for (var i = 0; i < length; i++) {
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").addClass("btnBlue");
            nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CANVASSDTLS + ")").addClass("btnGray");

            nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWCANVASS + ")").addClass("btnGray");

            var cdtag = nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CANVASSTAG + ")").text();

            nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_EXQTY + ")").enable(false);
            if (cdtag == '1') {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CANVASSDTLS + ")").addClass("btnCanvassDtls");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CANVASSDTLS + ")").removeClass("btnGray");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CANVASSDTLS + ")").addClass("btnGreen");
            }
            else {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CANVASSDTLS + ")").removeClass("btnGreen");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CANVASSDTLS + ")").addClass("btnGray");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CANVASSDTLS + ")").removeClass("btnCanvassDtls");
            }

            var text = nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") textarea").val();
            if (text != "") {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").removeClass("nwGButton");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").removeClass("btnBlue");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").addClass("btnGreen");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ")").removeClass("nwGButton");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ")").removeClass("btnBlue");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ")").addClass("btnGreen");


                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").enable(true);
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") ").enable(true);
            }
            else {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").removeClass("btnGreen");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").addClass("btnBlue");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ")").removeClass("btnGreen");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ")").addClass("btnBlue");

                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").enable(false);
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") ").enable(false);
            }

            let hasReviewAttach = nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_HAS_REVIEWATTACH + ")").text();
            nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").removeClass("btnRed").removeClass("btnGreen").removeClass("btnYellow").removeClass("btnGray");
            hasReviewAttach = hasReviewAttach.length > 0 ? hasReviewAttach : "Gray";
            nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").addClass("btn" + hasReviewAttach);
            if (hasReviewAttach == "Gray") {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").enable(false);
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ") div").enable(false);
            } else {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").enable(true);
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ") div").enable(true);
            }


            nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_UOMDESC + ") ").enable(false);

            nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ORDERTYPECODE + ") ").enable(false);

            nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VENDORCODE + ") ").enable(false);
            //if (hasReviewAttach == "Gray") {
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").removeClass("btnRed").removeClass("btnGreen").removeClass("btnYellow");
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").addClass("btnGray");
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").enable(true);
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ") div").enable(true);
            //} else if (hasReviewAttach == "Red") {
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").removeClass("btnGray").removeClass("btnGreen").removeClass("btnYellow");
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").addClass("btnRed");
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").enable(true);
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ") div").enable(true);
            //} else if (hasReviewAttach == "Yellow") {
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").removeClass("btnGray").removeClass("btnGreen").removeClass("btnRed");
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").addClass("btnYellow");
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").enable(true);
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ") div").enable(true);
            //} else {
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").removeClass("btnGray").removeClass("btnYellow").removeClass("btnRed");
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").addClass("btnGreen");
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").enable(true);
            //    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ") div").enable(true);
            //}


            var vcbtag = nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VWCANVASSTAG + ")").text();
            if (vcbtag == '1') {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWCANVASS + ")").enable(true);
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWCANVASS + ")").removeClass("btnGray");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWCANVASS + ")").addClass("btnGreen");
            }
            else {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWCANVASS + ")").enable(false);
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWCANVASS + ")").removeClass("btnGreen");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWCANVASS + ")").addClass("btnGray");
            }

            let vatewttag = nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VATEWTTAG + ")").text();
            if (vatewttag == '1') {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_EWTDESC + ")").enable(true);
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VATDESC + ")").enable(true);
            }
            else {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_EWTDESC + ")").enable(false);
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VATDESC + ")").enable(false);
            }

            if (nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + (SPR_SELECT) + ") input").is(":checked") == false) {
                isCheckAll = false;
            }

            nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").addClass("btnFont");

            nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ITEMCODE + ")").enable(false);
            nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_EXQTY + ") input").enable(false);

        }


    }
}

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    ClearPOItemAndCostDtls();
    func_Toolbox_Clear();
    showPopupBtn();
    isGridClick = true;
    isNewData = true;
    $("#noah-webui-Toolbox-BindingNavigator").enable(false);

    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    showPopupBtn();
    parent_MessageBoxQuestionToolBox("Would you like to save the current record(s)?", Title, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    showPopupBtn();
    parent_MessageBoxQuestionToolBox("Would you like to delete the current record(s)?", Title, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    isGridClick = true;
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
    showPopupBtn();
    parent_MessageBoxQuestionToolBox("Would you like to process the current record?", Title, "", indef, enume);
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
    //$t().getAddtoListFilters();
    GetAddtoListFilters();
    //nwParameter_Add("PRConsolidationNo", $('.atlContainer .innertext').length);
    nwParameter_Add("hasPRConso", $('.atlContainer .atlContainer .innertext').length);
    nwParameter_Add("filter", filter);
    nwParameter_Add("txtDocno", $('#txtDocno').val());
    nwParameter_Add("txtServerdate", $('#txtServerdate').val());
    nwParameter_Add("jsonCanvassDtls", JSON.stringify(jsonCanvassDtls));
    //console.log("Del Details -> " + JSON.stringify(jsonDelDtls));
    nwParameter_Add("jsonDelDtls", jsonDelDtls.length > 0 ? JSON.stringify(jsonDelDtls) : "");
    nwParameter_Add("cmbSortByName_PPH", $('#cmbSortByName_PPH').val());
    nwParameter_Add("cmbSortByAscDesc_PPH", $('#cmbSortByAscDesc_PPH').val());
    nwParameter_Add("cmbSortByName_RRD", $('#cmbSortByName_RRD').val());
    nwParameter_Add("cmbSortByAscDesc_RRD", $('#cmbSortByAscDesc_RRD').val());
    nwParameter_Add("cmbSortByName_BCD", $('#cmbSortByName_BCD').val());
    nwParameter_Add("cmbSortByAscDesc_BCD", $('#cmbSortByAscDesc_BCD').val());
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("txtValueDate", $('#txtValueDate').val());
    nwParameter_Add("isAllwBackdateTran", $('#isAllwBackdateTran').val());
    nwParameter_Add("jsonCanvassNoVendorCode", JSON.stringify(jsonCanvassNoVendorCode));
    nwParameter_Add("jsonUpdateunaccridtedVendor", JSON.stringify(jsonUpdateunaccridtedVendor));
        try { nwParameter_Add_Spread(nwGridCon_Book); } catch (ex) { };
        try { nwParameter_Add_Spread(nwGridBCD_Book); } catch (ex) { };
        try { nwParameter_Add_Spread(nwGridDD_Book); } catch (ex) { };
        try { nwParameter_Add_Spread(nwGridRRD_Book); } catch (ex) { };
        try { nwParameter_Add_Spread(nwGridPPH_Book); } catch (ex) { };



}

function ClearAllJSONStrings() {
    jsonCanvassDtls = [];
    jsonCanvassDtlsFiltered = [];
    jsonDelDtls = [];
    jsonDelDtlsFiltered = [];
    jsonSingleDelDtls = [];
    jsonSingleDelDtlsFiltered = [];

}


function displayValueDate() {
    if ($('#isAllwBackdateTran').val() == "1") {
        $('#txtValueDateWrapper').visible(true);
    } else {
        $('#txtValueDateWrapper').visible(false);
    }
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    isNewData = false;
    cust_GetPara();
    nwLoading_Start("actbindcollection", crLoadingHTML);
    RefreshData();
    nwParameter_Add("isNewData", isNewData);
    func_ActionDriven("actBindCollection", true);
    $("#noah-webui-Toolbox-BindingNavigator").enable(true);
}


function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("actBindCollectionEmpty", crLoadingHTML);
    DisableFieldsEmpty();
    func_ActionDriven("actBindCollectionEmpty", false);
}

function DisableFieldsEmpty() {
    DisableFields();

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingPrint().visible(true);
    $("#noah-webui-Toolbox").bindingPrint().enable(true);
}


///////////////////////////////////////

var temp_crnwTR = "";
var isbuttonclick = false;

function cust_LookupButton() {
    isbuttonclick = true;

}

function Lookup_DoneFunction(idName, idNum) {

    var uom = '', prConso = '',prDocno='', itemCode = '', vendor = '', orderType = '', orderTypeDesc = '', vatdesc = '', ewtdesc = '', vatrate = '', vendorname = '';
    if (idName == 'lugUOM' || idName == 'lugOrderType' || idName == 'lugVendor' || idName == 'lugVAT' || idName == 'lugEWT')
    {
        var row = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row;

        uom = nwGridCon_Book.ActiveSheet.GetText(SPR_UOM - 1, row);
        prConso = nwGridCon_Book.ActiveSheet.GetText(SPR_CONSOPRNO - 1, row);
        prDocno = nwGridCon_Book.ActiveSheet.GetText(SPR_PRDOCNO - 1, row);
        itemCode = nwGridCon_Book.ActiveSheet.GetText(SPR_ITEMCODE - 1, row);
        vendor = nwGridCon_Book.ActiveSheet.GetText(SPR_VENDORCODE - 1, row);
        orderType = nwGridCon_Book.ActiveSheet.GetText(SPR_ORDERTYPECODE - 1, row);
        orderTypeDesc = nwGridCon_Book.ActiveSheet.GetText(SPR_ORDERTYPEDESC - 1, row);
        vatdesc = nwGridCon_Book.ActiveSheet.GetText(SPR_VATCODE - 1, row);
        ewtdesc = nwGridCon_Book.ActiveSheet.GetText(SPR_EWTCODE - 1, row);
        vatrate = nwGridCon_Book.ActiveSheet.GetText(SPR_VATRATE - 1, row);
        vendorname = nwGridCon_Book.ActiveSheet.GetText(SPR_VENDORNAME - 1, row);
    }

    if (idName == 'lugOrderType') {
        
        var currInd = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row;

        itemCode_glb = itemCode;
        prConso_glb = prConso;
        uom_glb = uom;
        nwGridCon_Book.ActiveSheet.SetText(SPR_ORDERTYPECODE -1,currInd, getGridData(idNum, 0));
        nwGridCon_Book.ActiveSheet.SetText(SPR_ORDERTYPEDESC -1,currInd, getGridData(idNum, 1));

        let vatdesc =  nwGridCon_Book.ActiveSheet.GetText(SPR_VATDESC -1, currInd );
        let vatrate =  nwGridCon_Book.ActiveSheet.GetText(SPR_VATRATE -1, currInd);
        let vendorname =  nwGridCon_Book.ActiveSheet.GetText(SPR_VENDORNAME -1, currInd);
        if (vendor != '' && vatdesc != '' && ewtdesc != '') {


            //DifferentUOM();
            _crnwTR = crnwTR;
            //UOMConversion();
            //LoadSubGrid(prConso,prDocno, itemCode, uom, getGridData(idNum, 0), getGridData(idNum, 1), vendorname, vatdesc, vatrate, 0);
        }


        CanvassDtls();
        ComputeByCanvassAmount();
        //var currInd = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row;

        ////nwGridCon_Book.ActiveSheet.SetText((SPR_ORDERTYPECODE - 1), currInd, code);
        //nwGridCon_Book.ActiveSheet.SetText((SPR_ORDERTYPEDESC - 1), currInd, desc);

        //nwGrid_AddRow(nwGridCon, 1);
    }
    if (idName == 'lugVendor') {


        
        var currInd = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row;


        nwGridCon_Book.ActiveSheet.SetText((SPR_VENDORCODE - 1), currInd, getGridData(idNum, 0));
        nwGridCon_Book.ActiveSheet.SetText((SPR_VENDORNAME - 1), currInd, getGridData(idNum, 1));

        nwGrid_AddRow(nwGridCon, 1);
    }

    if (idName == 'lugCurrency') {
        //crnwTR.find("td:eq(" + SPR_CURRENCY + ")").text(getGridData(idNum, 0));


        var currInd = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row;
       

        nwGridCon_Book.ActiveSheet.SetText((SPR_CURRENCY- 1), currInd, getGridData(idNum, 0));
        nwGridCon_Book.ActiveSheet.SetText((SPR_CURRENCY - 1), currInd, getGridData(idNum, 1));

        nwGrid_AddRow(nwGridCon, 1);
    }

    if (idName == 'lugVAT') {

        var currInd = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row;


        nwGridCon_Book.ActiveSheet.SetText((SPR_VATCODE - 1), currInd, getGridData(idNum, 0));
        nwGridCon_Book.ActiveSheet.SetText((SPR_VATDESC - 1), currInd, getGridData(idNum, 1));
        nwGridCon_Book.ActiveSheet.SetText((SPR_VATRATE - 1), currInd, getGridData(idNum, 2));

        nwGrid_AddRow(nwGridCon, 1);
    }
    if (idName == 'lugEWT') {
     
        var currInd = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row;


        nwGridCon_Book.ActiveSheet.SetText((SPR_EWTCODE - 1), currInd, getGridData(idNum, 0));
        nwGridCon_Book.ActiveSheet.SetText((SPR_EWTDESC - 1), currInd, getGridData(idNum, 1));

        nwGrid_AddRow(nwGridCon, 1);
    }

    if (idName == 'lugVendor_AOV') {
        $('#idvallugVendor_AOV').val(getGridData(idNum, 0));
        $('#descvallugVendor_AOV').val(getGridData(idNum, 1));
        $('#tagCurrSelection').val(getGridData(idNum, 2));
        $("#txtVendorTIN_AOV").val(getGridData(idNum, 3));
        $("#txtVendorAddress").val(getGridData(idNum, 4));
    }

    if (idName == "lugUpdateUnaccreditedVendor") {

        nwGridUpdateunaccreditedVendorCon_Book.ActiveSheet.SetText(SPR_UNACCREDITED_VEND_CODE - 1, currInd, getGridData(idNum, 0));
        nwGridUpdateunaccreditedVendorCon_Book.ActiveSheet.SetText(SPR_UNACCREDITED_VEND_DESC - 1, currInd, getGridData(idNum, 1));

    }


    
}


function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var cnt = nwLib.nwTempTable_Row_Count("nwGridExpenseCon");

    if (crnwTD.index() == SPR_EA_EXPENSECODE) {

        var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
        var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
        var isValid = nwLib.nwTempTable_Column_ValueExist("nwGridExpenseCon", 1, code, false, "text", 0);

        if (isValid == false) {
            crnwTRtemp.find('td:eq(' + SPR_EA_EXPENSECODE + ')').text(code);
            crnwTRtemp.find('td:eq(' + SPR_EA_EXPENSEDESC + ')').text(desc);

            if (cnt == (crnwTR.index() + 1))
                nwGrid_AddRow("nwGridExpenseCon", 1);
        }
        else {
            crnwTRtemp = null;
        }
    }


    return crnwTRtemp;
}
function EnableFields() {
    $("#cmbSortByName").enable(true);
    $("#cmbSortByAscDesc").enable(true);
    $('#lugLocation').removeClass('adisabled');
    $("#settingstabs").enable(true);

    $("#btnLoadDtls").enable(true);
    $('#btnUploadCanvass').enable(false);
    $('#btnValList').enable(false);
    $('#btnReqComp').enable(false);

    $("#txtVendor").enable(false);

    $('#nwGridCon').enable(true);
    $('#nwGridDDCon').enable(true);
    $('#btnApplyOneVendor').enable(false);
    $('#btnApplySingleDelDate').enable(false);
    $('#btnConso_PR').enable(true);

    $('#txtValueDate').enable(true);
   

}

function DisableFields() {
    $('#lugLocation').addClass('adisabled');

    $("#settingstabs").enable(false);

    $('#btnUploadCanvass').enable(false);
    $('#btnValList').enable(false);

    $('#txtValueDate').enable(false);

    $('#btnReqComp').enable(false);


    $('#cmbSortByName').enable(false);
    $('#cmbSortByAscDesc').enable(false);

    $('#txtPOUCostVATEX').enable(false);
    $('#txtPOUCostVATIN').enable(false);
    $('#chkUseLastPO').enable(false);

    $('#nwGridCon').enable(false);
    $('#nwGridDDCon').enable(false);

    
    $("#txtVendor").enable(false);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().visible(true);

    $('#btnConso_PR').enable(false);
    $('#btnLoadDtls').enable(false);

    $('#txtDocno').enable(false);
    $('#dtpDateSubmit').enable(false);
    $('#dtpDatePosted').enable(false);
    $('#txtStatus').enable(false);
    $('#lugRsnDisapprv').enable(false);
    $('#txtDisapprvRemarks').enable(false);

    DisableGrid();
}

function ClearFields() {
    $('#idvallugLocation').val('');
    $('#descvallugLocation').val('');
    $('#txtDocno').val('');
    $('#dtpDateSubmit').val('');
    $('#dtpDatePosted').val('');
    $('#txtStatus').val('');
    $('#idvallugRsnDisapprv').val('');
    $('#descvallugRsnDisapprv').val('');
    $('#txtDisapprvRemarks').val('');
    $('.spantext').remove();
    $(".nwCheckBoxTot.nwCheckBoxTot1.chkSelect").prop("checked", false);
    ClearAllJSONStrings();
}

//function msgBoxContainerQuestionF(genID, answer) {

//}

$(document).on("click", "#NwProcess", function (e) {
    msgBoxContainerQuestion = "Processdata";
    parent_MessageBoxQuestion("Would you like to process the transaction(s)?", Title, "Question");

    return true;
});


$(document).on("keydown", ".spr_qty", function (e) {

    if (e.which == 110 || e.which == 190 )
        return false;
    var index = crnwTR.index();
    return IntNDecimalFormat("nwGrid", index, e.which, SPR_QTY, 18, 0);
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

        if (KeyCode == 190 || KeyCode == 110 ) {
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


function getGridData(idnum, index) {
    var data = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + (index) + ") span").text();
    return data;
}


var globalItemCodeList = "";

/* ###STNDRD FUNC */
function func_LookUpInitialize(id) {
    cust_GetPara();

    if (id == "lugUOM") {
        nwParameter_Add("itemCode", crnwTR.find("td:eq(" + SPR_ITEMCODE + ")").text());
        nwParameter_Add("UOM", crnwTR.find("td:eq(" + SPR_ORIGUOM + ")").text());
    }
    if (id == "lugLoc_DD") {
        nwGrid = $("#nwGridDDCon .tblGridBody tbody");
        var length = nwGrid.find("tr").length;
        var prDocnoList = "";

        for (var i = 0; i < length; i++) {
            if (nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DD_PRDOCNO + ")").text() != "") {
                prDocnoList += nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DD_PRDOCNO + ")").text() + "|";
            }
        }
        nwParameter_Add("prDocnoList", prDocnoList);
    }
    if (id == "lugSubloc_DD") {
        nwParameter_Add("loc_DD", crnwTR.find("td:eq(" + SPR_DD_LOCATION + ")").text());
    }
    if (id == "Item") {
        nwGrid = $("#nwGrid .tblGridBody tbody");
        var length = nwGrid.find("tr").length;
        var consoPRList = "";
        var itemCodeList = "";

        for (var i = 0; i < length; i++) {
            if (nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SELECT + ") input").is(":checked")) {
                consoPRList += nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CONSOPRNO + ")").text() + "|";
                itemCodeList += nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ITEMCODE + ")").text() + "|";

            }
        }

        nwParameter_Add("consoPRList", consoPRList);
        nwParameter_Add("itemCodeList", itemCodeList);
    }
    if (id == "lugVendor") {
        setMainVendorLookup();
    }
    if (id == "lugVendor_AOV") {
        var vendorList = "";

        if (jsonCanvassDtls.length > 0) {
            for (var i = 0; i < jsonCanvassDtls.length; i++) {
                let vendor_c = jsonCanvassDtls[i].vendorCode;
                if (vendor_c != "") {
                    vendorList += vendor_c + "|";
                }

            }
        } else {
            for (var i = 0; i < jsonCanvassDtlsFiltered.length; i++) {
                let vendor_c = jsonCanvassDtlsFiltered[i].vendorCode;
                if (vendor_c != "") {
                    vendorList += vendor_c + "|";
                }
            }
        }

        $('#vendorLookupOpt').val(0);
        nwParameter_Add("canvassNoVendor", (bruteForceSearchJSON(jsonCanvassDtls, "vendorCode", "").length == jsonCanvassDtls.length) && jsonCanvassDtls.length != 0)
        nwParameter_Add("vendorList", vendorList);
        nwParameter_Add("txtDocno", $("#txtDocno").val());
    }
    if (id == "lugItemCode") {        
        nwParameter_Add("igtCode", nwGridCon_Book.ActiveSheet.GetValue(SPR_IGTCODE - 1, 0));

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
}

function setMainVendorLookup() {
    var vendorList = "";
    let itemcode = crnwTR.find("td:eq(" + SPR_ITEMCODE + ")").text();
    let consopr = crnwTR.find("td:eq(" + SPR_CONSOPRNO + ")").text();

    if (jsonCanvassDtls.length > 0) {
        for (var i = 0; i < jsonCanvassDtls.length; i++) {
            let item_c = jsonCanvassDtls[i].itemCode;
            let prconso_c = jsonCanvassDtls[i].prconso;
            let vendor_c = jsonCanvassDtls[i].vendorCode;

            if (itemcode == item_c && prconso_c == consopr) {
                if (vendor_c != "") {
                    vendorList += vendor_c + "|";
                }

            }
        }
    } else {
        for (let i = 0; i < jsonCanvassDtlsFiltered.length; i++) {
            let item_c = jsonCanvassDtlsFiltered[i].itemCode;
            let prconso_c = jsonCanvassDtlsFiltered[i].prconso;
            let vendor_c = jsonCanvassDtlsFiltered[i].vendorCode;

            if (itemcode == item_c && prconso_c == consopr) {
                if (vendor_c != "") {
                    vendorList += vendor_c + "|";
                }
            }
        }
    }
    nwParameter_Add("canvassNoVendor", (bruteForceSearchJSON(jsonCanvassDtls, "vendorCode", "").length == jsonCanvassDtls.length) && jsonCanvassDtls.length != 0)
    nwParameter_Add("vendorList", vendorList);
    nwParameter_Add("txtDocno", $("#txtDocno").val());
    nwParameter_Add("itemcode", itemcode);
}
function p8Spread_Click(canvasID, row, col) {

    if (col == SPR_POQTY - 1) {

    }
}
function p8Spread_DblClick(canvasID, row, col) {

    if (nwDocno != '') return;

    if (canvasID == "nwGridCon") {

        if (col == (SPR_UOMDESC - 1)) {
            lookUpCustomize("lugUOM", -2, undefined, true);
        }
        else if (col == (SPR_ORDERTYPECODE - 1)) {
            lookUpCustomize("lugOrderType", 1, undefined, true);
        }
        else if (col == SPR_VENDORCODE - 1) {
            lookUpCustomize("lugVendor", 1, undefined, true);
        }
        else if (col == SPR_CURRENCY - 1) {
            lookUpCustomize("lugCurrency", 1, undefined, true);
        }
        else if (col == SPR_VATDESC - 1) {
            lookUpCustomize("lugVAT", 1, undefined, true);
        }
        else if (col == SPR_EWTDESC - 1) {
            lookUpCustomize("lugEWT", 1, undefined, true);
        }
        else if (col == SPR_ITEMCODE - 1) {
            lookUpCustomize("lugItemCode", -1, undefined, true);
        }
    
    }
    if (canvasID == "nwGridDDCon") {

        if (col == SPR_DD_LOCATION - 1) {
            lookUpCustomize("lugLoc_DD", -1, undefined, true);
        }
        else if (col == SPR_DD_SUBLOC - 1) {
            lookUpCustomize("lugSubloc_DD", -1, undefined, true);
        }

    }

    if (canvasID == "nwGridUpdateunaccreditedVendorCon") {

        if (col == SPR_UNACCREDITED_VEND_CODE - 1) {
            var vendorList = "";

            if (jsonCanvassDtls.length > 0) {
                for (var i = 0; i < jsonCanvassDtls.length; i++) {
                    let vendor_c = jsonCanvassDtls[i].vendorCode;
                    if (!vendorList.includes(vendor_c)) {
                        if (vendor_c != "") {
                            vendorList += vendor_c + "|";
                        }

                    }

                }
            } else {
                for (var i = 0; i < jsonCanvassDtlsFiltered.length; i++) {
                    let vendor_c = jsonCanvassDtlsFiltered[i].vendorCode;
                    if (!vendorList.includes(vendor_c)) {
                        if (vendor_c != "") {
                            vendorList += vendor_c + "|";
                        }
                    }
                }
            }
            nwParameter_Add("vendorList", vendorList);
            lookUpCustomize("lugUpdateUnaccreditedVendor", 1);
        }


    }


}




//function nwGrid_Click(nwGridObj, crTR, crTD) {
//    var nwobjID = nwGridObj.attr("id")
//    //var col = crnwTD.index();
//    //var currRow = crnwTR.index();

//    //if (nwDocno != "") {
//    //    return;
//    //}
//    if (nwobjID == "nwGridApplyPODetailsCon") {
//let isPayComp = $(`#nwGridApplyPODetailsCon table tbody tr:eq(${crnwTR.index()}) td:eq(${SPR_PO_DTLS_IS_PAY_COMP})`).html();
//let payCompCode = $(`#nwGridApplyPODetailsCon table tbody tr:eq(${crnwTR.index()}) td:eq(${SPR_PO_DTLS_PAY_CAT_CODE})`).html();
//if (isPayComp == "1") {
//    $('th div[title="Payment Component"]').html("Payment Component<span class='nwRequiredField'>*</span>");
//    $('div[title="Payment Term"]').html("Payment Term");
//} else if (payCompCode == "") {
//    $('div[title="Payment Term"]').html("Payment Term");
//    $('th div[title="Payment Component"]').html("Payment Component");
//} else {
//    $('div[title="Payment Term"]').html("Payment Term<span class='nwRequiredField'>*</span>");
//    $('th div[title="Payment Component"]').html("Payment Component");
//}
//    }

//}

// for some reason  nwGrid_Click is not working so i created this block for the alternative
$(document).on('click', '#nwGridApplyPODetailsCon table tbody td', function () {
    let isPayComp = $(`#nwGridApplyPODetailsCon table tbody tr:eq(${crnwTR.index()}) td:eq(${SPR_PO_DTLS_IS_PAY_COMP})`).html();

    let payCompCode = $(`#nwGridApplyPODetailsCon table tbody tr:eq(${crnwTR.index()}) td:eq(${SPR_PO_DTLS_PAY_CAT_CODE})`).html();
    if (isPayComp == "1") {
        $('th div[title="Payment Component"]').html("Payment Component<span class='nwRequiredField'>*</span>");
        $('div[title="Payment Term"]').html("Payment Term");
    } else if (payCompCode == "") {
        $('div[title="Payment Term"]').html("Payment Term");
        $('th div[title="Payment Component"]').html("Payment Component");
    } else if (payCompCode != "" && isPayComp == "0") {
        $('div[title="Payment Term"]').html("Payment Term<span class='nwRequiredField'>*</span>");
        $('th div[title="Payment Component"]').html("Payment Component");
    } else {


        $('div[title="Payment Term"]').html("Payment Term");
        $('th div[title="Payment Component"]').html("Payment Component");
    }
});


//function nwGrid_Click(nwobj, nwobjrow, nwobjitem) {
//    var nwobjID = nwobj.attr('id');
//    var col = crnwTD.index();
//    var currRow = crnwTR.index();


//    //if (nwGridObj.attr("id") == "nwGridApplyPODetailsCon") {
//    //    alert('x');
//    //    if (crnwTD.index() == "") {
//    //        nwParameter_Add("", "");
//    //        lookUpCustomize("", 1);
//    //    }
//    //}
//}

function p8Spread_Change(nwGridObj, crTR, crTD) {
    if (nwGridObj.attr("id") == "nwGrid") {
        if (crnwTD.index() == SPR_REFDATE) {

        }
    }
}

function func_p8Spread_CellChange(pvnwTR, pvnwTD) {
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

function func_nwGrid_InsertDone() {
    //exec code

    var id = nwGrid.attr('id');
    if (id == 'nwGrid') {
        
    }
}
var delCurrRow;
function func_nwGrid_DeleteValidation() {
    var id = nwGrid.attr('id');
    var row = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row;

    if (id == 'nwGridDD') {
        //if (!AllowDeletion(dd_currRow.index())) {
        //    MessageBox("Cannot delete row. Deletion of original Delivery Details is not allowed.", "Delivery Details", 'error')
        //    return false;
        //}
        delCurrRow = nwGridDD_Book.ActiveSheet.GetText(SPR_ALT_LINEID, row); //$(`#nwGrid-nwData tr:eq(${_crnwTR.index()})`).find(`td:eq(${SPR_ALT_LINEID})`).text();

    } else if (id == 'nwGrid') {
        delCurrRow = nwGridCon_Book.ActiveSheet.GetText(SPR_ALT_LINEID, row);  //$(`#nwGrid-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${SPR_ALT_LINEID})`).text(); //crnwTR.index();
        console.log(delCurrRow);
    }

    return true;
}

function AllowDeletion(row) {
    var isdelete = true;
    var $row;
    var cnt = 0;
    var row = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row;

    //isdelete = $('#nwGridDDCon .tblGridBody tr:nth-child(' + (row + 1) + ') td:nth-child(' + (SPR_DD_PRLINEID + 1) + ')').text() == "0" ? true : false;
    isdelete = nwGridDD_Book.ActiveSheet.GetText(Main.SPR_DD_PRLINEID - 1, row) == "0" ? true : false;


    return isdelete;
}

function func_nwGrid_DeleteDone() {
    var id = nwGrid.attr('id');

    if (id == 'nwGridDDCon') {
        jsonDelDtls = jsonDelDtls.filter(e => e["mainRowNum"] != delCurrRow); // Remove the current row

        let rowCount = nwGridDD_Book.ActiveSheet.getRowCount(); // Get the current row count

        for (let k = 0; k < rowCount; k++) {
            let xstore = {};

            xstore['delDate'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_DELIVERYDATE - 1, k);
            xstore['reqDelDate'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_REQDELDATE - 1, k);
            xstore['qtyPo'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_QTYPO - 1, k);
            xstore['poUOMDesc'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_UOM - 1, k);
            xstore['reqUOMDesc'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_REQUOM - 1, k);
            xstore['prQtyB4PO'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_PRQTY - 1, k);
            xstore['remQty4PO'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_REMQTY - 1, k);
            xstore['excessQty'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_EXQTY - 1, k);
            xstore['location'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_LOCATION - 1, k);
            xstore['locDesc'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_LOCDESC - 1, k);
            xstore['subLocation'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_SUBLOC - 1, k);
            xstore['subLocDesc'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_SUBLOCDESC - 1, k);
            xstore['prDocno'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_PRDOCNO - 1, k);
            xstore['prConso'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_PRCONSO - 1, k);
            xstore['itemCode'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_ITEMCODE - 1, k);
            xstore['prLineID'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_PRLINEID - 1, k);
            xstore['lineID'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_LINEID - 1, k);
            xstore['rowno'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_ROWNO - 1, k);
            xstore['poUOMCode'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_POUOMCODE - 1, k);
            xstore['reqUOMCode'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_REQUOMCODE - 1, k);
            xstore['vendor'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_VENDOR - 1, k);
            xstore['OrigqtyPo'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_QTYPO_ORIG - 1, k);
            xstore['OrigprQtyB4PO'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_QTYPR_ORIG - 1, k);
            xstore['prTag'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_PRTAG - 1, k);
            xstore['DelRecipient'] = nwGridDD_Book.ActiveSheet.getValue(SPR_DD_DELRECEIPT - 1, k);
            xstore['mainRowNum'] = delCurrRow;

            console.log(xstore);
            jsonDelDtls.push(xstore);
        }
    }

    else if (id == 'nwGridCon') {

        let xtmpjsonxx = jsonDelDtls.filter(i =>(i.mainRowNum) < delCurrRow);

        jsonDelDtls = jsonDelDtls.filter(i =>(i.mainRowNum) > delCurrRow);

        if (xtmpjsonxx.length >= jsonDelDtls.length) {
            for (var i = 0; i < jsonDelDtls.length; i++) {
                xtmpjsonxx.push(jsonDelDtls[i]);
            }
            jsonDelDtls = xtmpjsonxx;
        } else {
            for (var i = 0; i < xtmpjsonxx.length; i++) {
                jsonDelDtls.push(xtmpjsonxx[i]);
            }

        }
        generateComboBox();
    }
}

function func_nwGrid_CopyRowValidation() {
    var isContinue = true;
    let poQty = getDataOfGrid('nwGrid', 'input', SPR_POQTY, crnwTR.index());
    let PRQtyB4PO = getDataOfGrid('nwGrid', '', SPR_PRQTY, crnwTR.index());
    if (poQty == PRQtyB4PO) {
        MessageBox("Cannot proceed. Quantity before PO should be less than the PR Quantity before PO.", Title, "error");
        return false;
    } else if (poQty == 0) {
        MessageBox("Cannot proceed. Quantity before PO should not be equal to zero.", Title, "error");
        return false;
    }
    return isContinue;
}

function func_nwGrid_CopyRowDone() {
    var nwGrid = nwGrid.attr('id');



    if (nwGrid == 'nwGridDD') {
        var rowno = 0;
        var nwGrid = nwGridDD_Book.ActiveSheet;
        var len = nwGridDD_Book.ActiveSheet.GetMaxRow();
        for (var i = 0; i < len ; i++) {
            rowno += 1;
        }



        nwGrid.SetText(SPR_DD_ROWNO, i, rowno);       //find("tr:eq(" + (dd_currRow.index() + 1) + ")").find("td:eq(" + SPR_DD_ROWNO + ")").text(rowno);
        nwGrid.SetText(SPR_DD_DELIVERYDATE, i, "");   //find("tr:eq(" + (dd_currRow.index() + 1) + ")").find("td:eq(" + SPR_DD_DELIVERYDATE + ") input").val("");
        nwGrid.SetText(SPR_DD_QTYPO, i, "");          //find("tr:eq(" + (dd_currRow.index() + 1) + ")").find("td:eq(" + SPR_DD_QTYPO + ") input").val("");
        nwGrid.SetText(SPR_DD_PRLINEID, i, "0");      //find("tr:eq(" + (dd_currRow.index() + 1) + ")").find("td:eq(" + SPR_DD_PRLINEID + ")").text("0");


    }

    if (nwGrid == 'nwGridCon') {
        var nwGrid = nwGridCon_Book.ActiveSheet;
        var row = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGrid.SetText(SPR_DD_ROWNO, (row + 1), "");      //find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_ORDERTYPECODE + ")").text("");
        nwGrid.SetText(SPR_DD_ROWNO, (row + 1), "");      //find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_ORDERTYPEDESC + ")").text("");
        nwGrid.SetText(SPR_DD_ROWNO, (row + 1), "");      //find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_VENDORCODE + ")").text("");
        nwGrid.SetText(SPR_DD_ROWNO, (row + 1), "");      //find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_VENDORNAME + ")").text("");
        nwGrid.SetText(SPR_DD_ROWNO, (row + 1), "");      //find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_VATCODE + ")").text("");
        nwGrid.SetText(SPR_DD_ROWNO, (row + 1), "");      //find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_VATDESC + ")").text("");
        nwGrid.SetText(SPR_DD_ROWNO, (row + 1), "");      //find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_VATRATE + ")").text("");
        nwGrid.SetText(SPR_DD_ROWNO, (row + 1), "");      //find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_EWTCODE + ")").text("");
        nwGrid.SetText(SPR_DD_ROWNO, (row + 1), "");      //find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_EWTDESC + ")").text("");


        nwGrid.SetText(SPR_POTOTALAMT_VATEX, (row + 1), "");  //nwGrid.find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_POTOTALAMT_VATEX + ")").text("");
        nwGrid.SetText(SPR_POTOTALAMT_VATIN, (row + 1), "");  //nwGrid.find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_POTOTALAMT_VATIN + ")").text("");

        nwGrid.SetText(SPR_FRGHT_AMNT, (row + 1), "");   //nwGrid.find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_FRGHT_AMNT + ") input").val("");
        nwGrid.SetText(SPR_DISC_AMNT, (row + 1), "");    //nwGrid.find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_DISC_AMNT + ") input").val("");

        nwGrid.SetText(SPR_POQTY, (row + 1), "");   //nwGrid.find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_POQTY + ") input").val("");


        //nwGrid.find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_UOM + ")").text("");
        //nwGrid.find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_UOMDESC + ")").text("");

        nwGrid.SetText(SPR_FACTOR, (row + 1), "");       //nwGrid.find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_FACTOR + ")").text("0");
        nwGrid.SetText(SPR_EXQTY, (row + 1), "");        //nwGrid.find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_EXQTY + ") input").prop("checked", false);
        nwGrid.SetText(SPR_POQTY, (row + 1), "");        //nwGrid.find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_POQTY + ") input").val("");


        nwGrid.SetText(SPR_LWST_QUOTE_UC_VATEX, (row + 1), "");      //find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_LWST_QUOTE_UC_VATEX + ")").text("");
        nwGrid.SetText(SPR_LWST_QUOTE_UC_VATIN, (row + 1), "");      //find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_LWST_QUOTE_UC_VATIN + ")").text("");
        nwGrid.SetText(SPR_POUNITCOST_VATEX, (row + 1), "");         //find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_POUNITCOST_VATEX + ") input").val("");

        let maxAltID = getMaxAltID() + 1;


        nwGrid.SetText(SPR_ALT_LINEID, (row + 1), maxAltID); //find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_ALT_LINEID + ")").text(maxAltID);



        let itemcode = nwGrid.GetText(SPR_ITEMCODE, row); //find("tr:eq(" + (_crnwTR.index()) + ")").find("td:eq(" + SPR_ITEMCODE + ")").text();
        let prconso = nwGrid.GetText(SPR_CONSOPRNO, row); //find("tr:eq(" + (_crnwTR.index()) + ")").find("td:eq(" + SPR_CONSOPRNO + ")").text();
        let vendor = nwGrid.GetText(SPR_VENDORCODE, row); //find("tr:eq(" + (_crnwTR.index()) + ")").find("td:eq(" + SPR_VENDORCODE + ")").text();
        let altID = nwGrid.GetText(SPR_ALT_LINEID, row); //find("tr:eq(" + (_crnwTR.index()) + ")").find("td:eq(" + SPR_ALT_LINEID + ")").text();


        let xID = (prconso + itemcode + vendor + (altID))







        let xtmpjsonx = jsonDelDtls.filter(i =>(i.prConso + i.itemCode + i.vendor + i.mainRowNum) == xID);

        let xtmpjsonxx = jsonDelDtls.filter(i =>(i.mainRowNum) < (altID));


        jsonDelDtls = jsonDelDtls.filter(i =>(i.mainRowNum) >= (altID));


        if (xtmpjsonxx.length >= jsonDelDtls.length) {
            for (var i = 0; i < jsonDelDtls.length; i++) {
                xtmpjsonxx.push(jsonDelDtls[i]);
            }
            jsonDelDtls = xtmpjsonxx;
        } else {
            for (var i = 0; i < xtmpjsonxx.length; i++) {
                jsonDelDtls.push(xtmpjsonxx[i]);
            }

        }






        for (var i = 0; i < xtmpjsonx.length; i++) {
            var store = {};
            store["delDate"] = xtmpjsonx[i].delDate;
            store["reqDelDate"] = xtmpjsonx[i].reqDelDate;
            store["qtyPo"] = setNumReplace(0, 5);
            store["poUOMDesc"] = xtmpjsonx[i].poUOMDesc;
            store["reqUOMDesc"] = xtmpjsonx[i].reqUOMDesc;
            store["prQtyB4PO"] = setNumReplace(parseFloat(xtmpjsonx[i].prQtyB4PO.replace(/,/g, "")) - parseFloat(xtmpjsonx[i].qtyPo.replace(/,/g, "")), 5);
            store["remQty4PO"] = setNumReplace(parseFloat(xtmpjsonx[i].prQtyB4PO.replace(/,/g, "")) - parseFloat(xtmpjsonx[i].qtyPo.replace(/,/g, "")), 5);
            store["excessQty"] = xtmpjsonx[i].excessQty;
            store["location"] = xtmpjsonx[i].location;
            store["locDesc"] = xtmpjsonx[i].locDesc;
            store["subLocation"] = xtmpjsonx[i].subLocation;
            store["subLocDesc"] = xtmpjsonx[i].subLocDesc;
            store["DeliveryAddress"] = xtmpjsonx[i].DeliveryAddress;
            store["DelRecipient"] = xtmpjsonx[i].DelRecipient;
            store["prDocno"] = xtmpjsonx[i].prDocno;
            store["prConso"] = xtmpjsonx[i].prConso;
            store["itemCode"] = xtmpjsonx[i].itemCode;
            store["prLineID"] = xtmpjsonx[i].prLineID;
            store["lineID"] = 0;
            store["rowno"] = 0;
            store["poUOMCode"] = xtmpjsonx[i].poUOMCode;
            store["reqUOMCode"] = xtmpjsonx[i].reqUOMCode;
            store["vendor"] = "";
            store["OrigqtyPo"] = xtmpjsonx[i].OrigqtyPo;
            store["OrigprQtyB4PO"] = xtmpjsonx[i].OrigprQtyB4PO;
            store["prTag"] = xtmpjsonx[i].prTag;
            store["mainRowNum"] = maxAltID;
            jsonDelDtls.push(store);
        }


        nwGrid.find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_ITEMDESC + ")").trigger('click');
        nwGrid.find("tr:eq(" + (_crnwTR.index() + 1) + ")").find("td:eq(" + SPR_ITEMDESC + ")").trigger('focusout');
        generateComboBox();
    }


}

// Custom Function
function setgridfilter() {
    filter = "";

    nwGrid = nwGridCon_Book.ActiveSheet;
    var itemcount = nwGrid.GetMaxRow();
    for (var i = 0; i < itemcount ; i++) {
        var code = nwGrid.GetText(1, i); //find("tr:eq(" + i + ")").find("td:eq(1)").text();
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
    cust_GetPara();
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0') {
        DisableFieldsEmpty();
    }
    else {
        EnableFieldsDone();
    }
}

function EnableFieldsDone() { //Binding Done
    $('#lugLocation').addClass('adisabled');


    $('#btnReqComp').enable(true);

    $('#nwGrid').enable(true);

    $('#txtValueDate').enable(true);

    $('#cmbSortByName').enable(true);
    $('#cmbSortByAscDesc').enable(true);
    EnableLoadDetails();

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().visible(true);
}

function setGrid(nwGrid)
{
    var grid = "";

    if (nwGrid == "nwGridCon")
        grid = nwGridCon_Book.ActiveSheet;
    else if (nwGrid == "nwGridDDCon")
        grid = nwGridDD_Book.ActiveSheet;

    return grid;
}

function getDataOfGrid(nwGrid, type, col, row) {
    var data = '';
    var grid = setGrid(nwGrid);

    if (type == 'input' || type == 'textarea')
        data = grid.GetValue(col, row)

    else
        data = grid.GetText(col, row)

    return data;
}

function setGridData(nwGrid, type, col, row, val) {
    var grid = setGrid(nwGrid);
    if (type == 'input' || type == 'textarea')
        grid.SetValue(col,row, val)
    else
        grid.SetText(col,row, val)
}

function GridProp() {

    $('#btnAplyPODtls').addClass('btnBlue'); //add color on PO Details button
    $('#btnUpdateunaccreditedVendor').addClass('btnBlue');
    nwGrid = nwGridCon_Book.ActiveSheet;
    var length = nwGridCon_Sheet.GetMaxRow();
    var payamount_loc = 0, payamount_hom = 0;
    var isCheckAll = true;

    for (var i = 0; i < length; i++) {


        nwGrid.SetBackground(SPR_CANVASSDTLS, i, "gainsboro");
        nwGrid.SetBackground(SPR_VIEWCANVASS, i, "gainsboro");

        var cdtag = nwGrid.GetText(SPR_CANVASSTAG, i);  //find("tr:eq(" + i + ")").find("td:eq(" + SPR_CANVASSTAG + ")").text();
        if (cdtag == '1') {

            nwGrid.SetBackground(SPR_VIEWCANVASS, i, "#41cc72");
        }
        else {


            nwGrid.SetBackground(SPR_CANVASSDTLS, i, "gainsboro");
        }

        var text = nwGrid.GetText(SPR_SPECNOTES - 1, i);
        if (text != "") {

            nwGrid.SetBackground(SPR_SPECNOTES, i, "#41cc72");
        }
        else {

            nwGrid.SetBackground(SPR_SPECNOTES, i, "#2f7dcb");
        }

        let hasReviewAttach = nwGrid.GetText(SPR_HAS_REVIEWATTACH, i); //find("tr:eq(" + i + ")").find("td:eq(" + SPR_HAS_REVIEWATTACH + ")").text();
        //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").removeClass("btnRed").removeClass("btnGreen").removeClass("btnYellow").removeClass("btnGray");
        nwGrid.SetBackground(SPR_SPECNOTES, i, "white");

        hasReviewAttach = hasReviewAttach.length > 0 ? hasReviewAttach : "Gray";
        nwGrid.SetBackground(SPR_SPECNOTES, i, hasReviewAttach);  //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").addClass("btn" + hasReviewAttach);

        if (hasReviewAttach == "Gray") {
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").enable(false);
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ") div").enable(false);

            nwGrid.SetEnable(SPR_REVIEWATTACH, i, false);
        } else {
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ")").enable(true);
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REVIEWATTACH + ") div").enable(true);

            nwGrid.SetEnable(SPR_REVIEWATTACH, i, true);
        }

        let isAllowCurr = nwGrid.GetText(SPR_IS_ALLOW_CURR, i);  //find("tr:eq(" + i + ")").find("td:eq(" + SPR_IS_ALLOW_CURR + ")").text();

        
        if (isAllowCurr == "1") {
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CURRENCY + ")").enable(true);
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CURRENCY + ")").css("background-color", "cyan");

            nwGrid.SetEnable(SPR_CURRENCY, i, true);
            nwGrid.SetBackground(SPR_CURRENCY, i, "cyan");
        }
        else {
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CURRENCY + ")").enable(false);
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CURRENCY + ")").css("background-color", "gainsboro");

            nwGrid.SetEnable(SPR_CURRENCY, i, false);
            nwGrid.SetBackground(SPR_CURRENCY, i, "gainsboro");
        }

        var vcbtag = nwGrid.GetText(SPR_VWCANVASSTAG, i); //find("tr:eq(" + i + ")").find("td:eq(" + SPR_VWCANVASSTAG + ")").text();
        if (vcbtag == '1') {
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWCANVASS + ")").enable(true);
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWCANVASS + ")").removeClass("btnGray");
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWCANVASS + ")").addClass("btnGreen");

            nwGrid.SetEnable(SPR_VIEWCANVASS, i, true);
            nwGrid.SetBackground(SPR_VIEWCANVASS, i, "#41cc72");
        }
        else {
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWCANVASS + ")").enable(false);
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWCANVASS + ")").removeClass("btnGreen");
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VIEWCANVASS + ")").addClass("btnGray");

            nwGrid.SetEnable(SPR_VIEWCANVASS, i, false);
            nwGrid.SetBackground(SPR_VIEWCANVASS, i, "gainsboro");
        }

        let vatewttag = nwGrid.GetText(SPR_VATEWTTAG, i); //find("tr:eq(" + i + ")").find("td:eq(" + SPR_VATEWTTAG + ")").text();
        if (vatewttag == '1') {
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_EWTDESC + ")").enable(true);
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VATDESC + ")").enable(true);

            nwGrid.SetEnable(SPR_EWTDESC, i, true);
            nwGrid.SetEnable(SPR_VATDESC, i, true);
        }
        else {
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_EWTDESC + ")").enable(false);
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VATDESC + ")").enable(false);

            nwGrid.SetEnable(SPR_EWTDESC, i, false);
            nwGrid.SetEnable(SPR_VATDESC, i, false);
        }

        //if (nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + (SPR_SELECT) + ") input").is(":checked") == false) {
        //    isCheckAll = false;
        //}

        if (nwGrid.GetText(SPR_SELECT, i) == "0") {
            isCheckAll = false;
        }

        //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").addClass("btnFont");

        let itemcode = nwGrid.GetText(SPR_ITEMCODE, i); //find("tr:eq(" + i + ")").find("td:eq(" + SPR_ITEMCODE + ")").text();
        let igtcode = nwGrid.GetText(SPR_IGTCODE, i); //find("tr:eq(" + i + ")").find("td:eq(" + SPR_IGTCODE + ")").text();
        let doNowAllow = nwGrid.GetText(SPR_DONOTALLOW, i); //find("tr:eq(" + i + ")").find("td:eq(" + SPR_DONOTALLOW + ")").text();



        if (itemcode == igtcode) {
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ITEMCODE + ")").enable(true);
            nwGrid.SetEnable(SPR_ITEMCODE, i, true);
        }
        else {
            if (doNowAllow == 1) {
                //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ITEMCODE + ")").enable(true);
                nwGrid.SetEnable(SPR_ITEMCODE, i, true);
            } else {
                //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ITEMCODE + ")").enable(false);
                nwGrid.SetEnable(SPR_ITEMCODE, i, false);
            }
        }

        let hasSameUOM = nwGrid.GetText(SPR_HAS_SAME_UOM, i); //find("tr:eq(" + i + ")").find("td:eq(" + SPR_HAS_SAME_UOM + ")").text();

        if (hasSameUOM == '1') {
            nwGrid.SetEnable(SPR_EXQTY, i, false); //find("tr:eq(" + i + ")").find("td:eq(" + SPR_EXQTY + ") input").enable(false);
        } else {
            nwGrid.SetEnable(SPR_EXQTY, i, true); //find("tr:eq(" + i + ")").find("td:eq(" + SPR_EXQTY + ") input").enable(true);
        }

    }

    if (isCheckAll == true && length > 0) {
        //$(".nwCheckBoxTot.nwCheckBoxTot1.chkSelect").prop("checked", true);
        nwGrid.SetText(SPR_SELECT, Spread_ALLROW, "1");
        nwGrid.SetValue(SPR_SELECT, Spread_ALLROW, "1");
    }
    else {
        //$(".nwCheckBoxTot.nwCheckBoxTot1.chkSelect").prop("checked", false);
        nwGrid.SetText(SPR_SELECT, Spread_ALLROW, "0");
        nwGrid.SetValue(SPR_SELECT, Spread_ALLROW, "1");
    }

    nwGridCon_Book.ActiveSheet.SetText2(SPR_SPECNOTES - 1, Spread_ALLROW, "...");
    nwGridCon_Book.ActiveSheet.SetTextAlign(SPR_SPECNOTES - 1, Spread_ALLROW, "center");
    nwGridCon_Book.ActiveSheet.SetBold(SPR_SPECNOTES - 1, Spread_ALLROW, "bold");
    nwGridCon_Book.ActiveSheet.SetTextColor(SPR_SPECNOTES - 1, Spread_ALLROW, "white");

    nwGridCon_Book.ActiveSheet.SetText2(SPR_CANVASSDTLS - 1, Spread_ALLROW, "...");
    nwGridCon_Book.ActiveSheet.SetTextAlign(SPR_CANVASSDTLS - 1, Spread_ALLROW, "center");
    nwGridCon_Book.ActiveSheet.SetBold(SPR_CANVASSDTLS - 1, Spread_ALLROW, "bold");
    nwGridCon_Book.ActiveSheet.SetTextColor(SPR_CANVASSDTLS - 1, Spread_ALLROW, "white");


    nwGridCon_Book.ActiveSheet.SetText2(SPR_REVIEWATTACH - 1, Spread_ALLROW, "...");
    nwGridCon_Book.ActiveSheet.SetTextAlign(SPR_REVIEWATTACH - 1, Spread_ALLROW, "center");
    nwGridCon_Book.ActiveSheet.SetBold(SPR_REVIEWATTACH - 1, Spread_ALLROW, "bold");
    nwGridCon_Book.ActiveSheet.SetTextColor(SPR_REVIEWATTACH - 1, Spread_ALLROW, "white");

}

function colorSpecBtn() {
    $('.btnReviewAttach').enable(false) //disable the requirement compliance on lin
    //nwGrid = $("#nwGrid .tblGridBody tbody ");
    nwGrid = nwGridCon_Book.ActiveSheet;

    //var length = nwGrid.find("tr").length;
    var length = nwGrid.GetMaxRow();
    for (var i = 0; i < length; i++) {
        var text = nwGrid.GetText(SPR_SELECT, SPR_SPECNOTES);   //find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") textarea").val();
        if (text != "") {

            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ")").removeClass("btnBlue").addClass("btnGray")
            nwGrid.SetBackground(SPR_CURRENCY, i, "gainsboro");
        }
        else {

            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ")").removeClass("btnBlue").addClass("btnGray")
            nwGrid.SetBackground(SPR_CURRENCY, i, "#2f7dcb");
        }
    }
}


function DisableGridCol() {
    //nwGrid = $("#nwGrid .tblGridBody tbody ");
    nwGrid = nwGridCon_Book.ActiveSheet;

    //var length = nwGrid.find("tr").length;
    var length = nwGrid.GetMaxRow();

    for (var i = 0; i < length; i++) {

        var holdForPayment = nwGrid.GetText(SPR_HOLDFORPAYMENT, x) == "1" ? true : false;  //find("tr:eq(" + i + ")").find("td:eq(" + SPR_HOLDFORPAYMENT + ") input").is(":checked");
        if (holdForPayment) {
            nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSFORHOLDING + ") input").enable(true);
            nwGrid.SetEnable(SPR_REMARKSFORHOLDING, i, true);
        }
        else {
            nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKSFORHOLDING + ") input").enable(false);
            nwGrid.SetEnable(SPR_REMARKSFORHOLDING, i, false);
        }
    }
}

function EnableGridCol() {
    //$('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').enable(true);
    //$('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_REFDATE + 1) + ') input').enable(true);
    //$('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').enable(true);
    //$('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_DRDATE + 1) + ') input').enable(true);
    //$('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_COUNTERDATE + 1) + ') input').enable(true);
    //$('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_GROSSAMOUNT + 1) + ') input').enable(true);

    nwGridCon_Book.ActiveSheet.SetEnable(SPR_REFNO, Spread_ALLROW, true);
    nwGridCon_Book.ActiveSheet.SetEnable(SPR_REFDATE, Spread_ALLROW, true);
    nwGridCon_Book.ActiveSheet.SetEnable(SPR_DRNO, Spread_ALLROW, true);
    nwGridCon_Book.ActiveSheet.SetEnable(SPR_DRDATE, Spread_ALLROW, true);
    nwGridCon_Book.ActiveSheet.SetEnable(SPR_COUNTERDATE, Spread_ALLROW, true);
    nwGridCon_Book.ActiveSheet.SetEnable(SPR_GROSSAMOUNT, Spread_ALLROW, true);
}

function ClearGridCol() {
    //$('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_REFNO + 1) + ') input').val("");
    //$('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_REFDATE + 1) + ') input').val("");
    //$('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_DRNO + 1) + ') input').val("");
    //$('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_DRDATE + 1) + ') input').val("");
    //$('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_COUNTERDATE + 1) + ') input').val("");
    //$('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_GROSSAMOUNT + 1) + ') input').val("");

    nwGridCon_Book.ActiveSheet.SetText(SPR_REFNO, Spread_ALLROW, "");
    nwGridCon_Book.ActiveSheet.SetText(SPR_REFDATE, Spread_ALLROW, "");
    nwGridCon_Book.ActiveSheet.SetText(SPR_DRNO, Spread_ALLROW, "");
    nwGridCon_Book.ActiveSheet.SetText(SPR_DRDATE, Spread_ALLROW, "");
    nwGridCon_Book.ActiveSheet.SetText(SPR_COUNTERDATE, Spread_ALLROW, "");
    nwGridCon_Book.ActiveSheet.SetText(SPR_GROSSAMOUNT, Spread_ALLROW, "");
}

//function getNum(val) {
//    if (isNaN(val) || val == '') {
//        val = 0
//    }
//    return val;
//}


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

function setNumReplace(val, decimal) {
    val = getNum(parseFloat(val.toString().replace(/,/g, "")));
    //val = val.toFixed(decimal).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    val = val.toFixed(decimal).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    if(val <= 0){
        return '';
    }
    return val;
}

//$(function () {
//    $("#settingstabs").tabs();
//});

function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext nwCuz133" nwcode="' + xvalue + '">' + xdisplay + '</div>';
};



$(document).on('click', 'span.classx', function () {
    $(this).closest('div.spantext').remove();
});


$(document).on('click', '.btnRvwAttach', function () {
    var docno = crnwTR.find("td:eq(" + SPR_PAYMENTVOUCHERNO + ")").text();

    var fullength = "../../../DC/DataSetup/DCViewAttachment/DCViewAttachment.aspx?nwDocno=" + docno + "";

    nwLoading_Start('xbtnRvwAttach', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRvwAttach", true, fullength);
    $('#nwPopUpRvwAttach .BoxTitle').text("Review Attachment(s)");
    $("#nwPopUpRvwAttach").css({ "min-width": "98%" });
    $("#nwPopUpRvwAttach").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpRvwAttach");
    nwLoading_End('xbtnRvwAttach');
});
function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {
    var xvalue = "";
    var xdisplay = "";
    xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();

    xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
    if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {

        $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));

    }
}
$(document).on('click', '#btnReqComp', function () {
    var trantype = 'POAWRD';
    var docno = $("#txtDocno").val();
    let isView = nwDocno != "" ? true : false;
    let applyTo = "";
    let maxRow = nwTempTable_Row_Count("nwGrid");
    //for (let i = 0; i < maxRow; i++) {
    //    let prDocno = nwTempTable_RowData_Get("nwGrid", i, SPR_CONSOPRNO - 1);
    //    if (prDocno != "") {
    //        if (applyTo == "") {
    //            applyTo = prDocno;
    //        } else {
    //            if (!applyTo.includes(prDocno)) {
    //                applyTo += "|" + prDocno;
    //            }

    //        }
    //    }
    //}
    var fullength = `../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=${encodeURI(docno)}&nwApplyTo=${encodeURI(applyTo)}&TranType=${encodeURI(trantype)}&isView=${encodeURI(isView)}`;
    nwLoading_Start('xbtnReqComp', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
    $('#nwPopUpRequireCompliance .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpRequireCompliance").css({ "min-width": "98%" });
    $("#nwPopUpRequireCompliance").css({ "min-height": "90%" });
    nwPopupForm_ShowModal("nwPopUpRequireCompliance");
    nwLoading_End('xbtnReqComp');
});

$(document).on('click', '.btnViewCanvass', function () {
    var trantype = 'POAWRD';
    var docno = $("#txtDocno").val();
    var docDetail = crnwTR.find("td:eq(" + SPR_DOCDETAILS + ")").text();

    var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + encodeURI(docno) + "&TranType=" + encodeURI(trantype) + "&nwDocDtls=" + encodeURI(docDetail) + "&isView=" + encodeURI(true) + "";

    nwLoading_Start('xbtnReqComp', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
    $('#nwPopUpRequireCompliance .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpRequireCompliance").css({ "min-width": "98%" });
    $("#nwPopUpRequireCompliance").css({ "min-height": "90%" });
    nwPopupForm_ShowModal("nwPopUpRequireCompliance");
    nwLoading_End('xbtnReqComp');
});

function downloadgentext(filepath) {

    $('#aDownloadgentext').attr({ "href": "", "title": "\'DOWNLOAD\'", "download": "", "target": "_blank" });
    $('#aDownloadgentext').attr({ "href": filepath, "title": "\'DOWNLOAD\'", "download": "", "target": "_blank" });
    $('#aDownloadgentext')[0].click();
}

$(document).on('click', '#btnDownload', function () {
    func_ActionDriven("actDownload", false);
});

function func_WindowCloseTrigger(verID) {
    var isContinue = true;

    if (verID == "nwPopUpRequireCompliance") {
        cust_GetPara();
        nwParameter_Add("isHeader", true);
        func_ActionDriven("actchkIfhasReqComp", false);
    }
    if (verID == "nwUploadCon") {
        nwLoading_Start("xactUploading", crLoadingHTML);
        cust_GetPara();

        var txtloadPath = $("#aagHRec .aagFiledir").text();
        //var txtloadPath = $(".noahdriveID").text();
        nwParameter_Add("txtloadPath", txtloadPath);
        $('#txtFilePath').val(txtloadPath);
        $('#txtPathTemp').val(txtloadPath);
        nwParameter_Add("chkOverride", $("#chkOverride").is(":checked"));
        //$t().getAddtoListFilters();
        GetAddtoListFilters();
        nwParameter_Add("jsonCanvassDtls", JSON.stringify(jsonCanvassDtls));
        setTimeout(function () {
            func_ActionDriven("actUploading", false);
        }, 1000);
    }
    //if (verID == "nwgRemarksCon") {
    //    let index = crnwTR.index();
    //    let rmrks = $('#nwGridPayComponentCon table tbody tr:eq(' + index + ') td:eq(' + SPR_PC_REMARKS + ') textarea').val();
    //    if (rmrks != "") {
    //        $('#nwGridPayComponentCon table tbody tr:eq(' + index + ') td:eq(' + SPR_PC_REMARKS + ') button').removeClass("btnBlue");
    //        $('#nwGridPayComponentCon table tbody tr:eq(' + index + ') td:eq(' + SPR_PC_REMARKS + ') button').addClass("btnGreen");
    //    } else {
    //        $('#nwGridPayComponentCon table tbody tr:eq(' + index + ') td:eq(' + SPR_PC_REMARKS + ') button').removeClass("btnGreen");
    //        $('#nwGridPayComponentCon table tbody tr:eq(' + index + ') td:eq(' + SPR_PC_REMARKS + ') button').addClass("btnBlue");
    //    }
    //}
    if (verID == "nwPaymentComponent") {
        nwLoading_Start("actCheckPaymentComp", crLoadingHTML)
        let prConsoCode = $('#txtPRConsoCode').val();
        let payCatCode = $('#idvallugPayCategory_PC').val();
        let itemTypeCode = $('#txtItemTypeCode').val();
        let vendCode = $('#txtVendorCode').val();
        let txtPRPayCompDocno = prConsoCode + vendCode + itemTypeCode + payCatCode;
        nwParameter_Add("applyPOTRIndex", applyPOTRIndex);
        nwParameter_Add("txtPRPayCompDocno", txtPRPayCompDocno);
        func_ActionDriven("actCheckPaymentComp", false);

    }
    if (verID == "applyPODtls") {
        distributeDiscAndFreightAmnt();
    }

    return isContinue;
}

//Uploading
$(document).on("click", "#btnDownloadTemplate", function (e) {
    e.preventDefault();
    window.open("Purchase Order Awarding Entry Uploading.xlsx");

    return false;
});

$(document).on("click", '#btnUploadCanvass', function (e) {
    $('#btnupload').attr("Value", 'Upload');
    $("#fileCon").val("");
    $("#status").find("span").text("");
    $(".progress").find("div.percent").text("0%`");
    $(".progress").find("div.bar").css("width", "0%");
    nwPopupForm_ShowModal("nwUploadCon");
    $("#chkOverride").prop("checked", false);
    return false;
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
        $("#status").html("<span class=\"nwCuz132\">Please select file to upload!</span>");
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

                        //nwLoading_Start("xactUploading", crLoadingHTML);
                        //cust_GetPara();
                        //$('#status').html(xhr.responseText);

                        //var txtloadPath = $("#aagHRec .armFiledir").text();//$(".aagFiledir").text(); //
                        //nwParameter_Add("txtloadPath", txtloadPath);
                        //$('#txtFilePath').val(txtloadPath);
                        //$('#txtPathTemp').val(txtloadPath);

                        //setTimeout(function () {
                        //    func_ActionDriven("actUploading", false);
                        //}, 1000);
                    }
                });
            } catch (err) {
                alert(err);
            }
        })();
    }
}

//$(document).on('click', '.btnRemarksVal', function () {
//    var remarks = crnwTR.find("td:eq(" + SPR_VAL_REMARKS + ") input").val().replaceAll("nwNewLine", "\n").replaceAll("anwNewXLineX", "\n");
//    nwPopupForm_ShowModal('nwRemarks1');
//    $('#txtnwgRemarkshdr').val(remarks);
//    $('#txtnwgRemarkshdr').prop('disabled', true);
//});

function SetRemarksButton() {
    nwGrid = nwGridValList_Book.ActiveSheet;
    var len = nwGrid.GetMaxRow();

    for (var x = 0; x <= len - 1; x++) {
        var remarks = nwGrid.GetValue(SPR_VAL_REMARKS, x); //find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKS + ') input').val();
        if (remarks != "") {
            ////nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').enable(true);
            //$('#nwGridValListCon .tblGridBody tr:nth-child(' + (x + 1) + ') td').enable(true);
            //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').removeClass("btnGray");
            //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').addClass("btnGreen");

            nwGrid.SetEnable(SPR_VAL_REMARKSBTN, (x+1), true)
            nwGrid.SetBackground(SPR_VAL_REMARKSBTN, x, "#41cc72");
        }
        else {
            ////nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').enable(false);
            //$('#nwGridValListCon .tblGridBody tr:nth-child(' + (x + 1) + ') td').enable(false);
            //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').removeClass("btnGreen");
            //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_VAL_REMARKSBTN + ') button').addClass("btnGray");

            nwGrid.SetEnable(SPR_VAL_REMARKSBTN, (x + 1), false)
            nwGrid.SetBackground(SPR_VAL_REMARKSBTN, x, "gainsboro");
        }
    }
}

$(document).on('click', '#btnExportUploading', function () {
    nwLoading_Start("xbtnExportUploading", crLoadingHTML);
    func_ActionDriven("actExport_Uploading", false);
});

function SetRemarksBtnApprvHst() {
    //nwGrid = $("#nwGridApprvlHstCon .tblGridBody");
    //var len = nwGrid.find('tr').length;

    nwGrid = nwGridApprvlHst_Book.ActiveSheet;
    var len = nwGrid.GetMaxRow();

    for (var x = 0; x <= len - 1; x++) {
        var remarks = nwGrid.GetValue(SPR_AH_DISAPPRVTEXT, x); //find('tr:eq(' + x + ') td:eq(' + SPR_AH_DISAPPRVTEXT + ') input').val();
        if (remarks != "") {
            //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_AH_DISAPPRVREMARKS + ') button').removeClass("btnBlue");
            //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_AH_DISAPPRVREMARKS + ') button').addClass("btnGreen");
            nwGrid.SetBackground(SPR_VAL_REMARKSBTN, x, "#41cc72");
        }
        else {
            //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_AH_DISAPPRVREMARKS + ') button').removeClass("btnGreen");
            //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_AH_DISAPPRVREMARKS + ') button').addClass("btnBlue");
            nwGrid.SetBackground(SPR_VAL_REMARKSBTN, x, "#2f7dcb");
        }
    }
}

//$(document).on('click', '.btnViewForm', function () {
//    nwLoading_Start("xbtnVwForms", crLoadingHTML);

//    var docno = crnwTR.find("td:eq(" + SPR_PAYMENTVOUCHERNO + ")").text();
//    nwParameter_Add("docno", docno);
//    func_ActionDriven("actViewForms", false);
//});

//var refDateOld = '';
//$(document).on("focus", ".dtpRefDate", function () {
//    refDateOld = crnwTR.find("td:eq(" + SPR_REFERENCEDATE + ") input").val();
//});

//$(document).on('change', '.dtpRefDate', function () {
//    var refDate = crnwTR.find("td:eq(" + SPR_REFERENCEDATE + ") input").val();
//    var payrelDate = $("#dtpPVDate").val();

//    var xbool2 = nwDateMaskCheck(crnwTR.find("td:eq(" + SPR_REFERENCEDATE + ") input").val());

//    if (Date.parse(payrelDate) < Date.parse(refDate)) {
//        MessageBox("Cannot proceed. Reference Date should not be later than the set Purchase Order Awarding Entry Date.\n", "Purchase Order Awarding Entry", "error");
//        crnwTR.find("td:eq(" + SPR_REFERENCEDATE + ") input").val(refDateOld);
//        return false;
//    }

//    if (xbool2 == false) {
//        crnwTR.find("td:eq(" + SPR_REFERENCEDATE + ") input").val("");
//        crnwTR.find("td:eq(" + SPR_REFERENCEDATE + ") input").focus();
//    }
//});

//var datercvOld = '';
//$(document).on("focus", ".dtpDateRcv", function () {
//    datercvOld = crnwTR.find("td:eq(" + SPR_DATERECEIVED + ") input").val();
//});

//$(document).on('change', '.dtpDateRcv', function () {
//    var datercv = crnwTR.find("td:eq(" + SPR_DATERECEIVED + ") input").val();
//    var refdate = crnwTR.find("td:eq(" + SPR_REFERENCEDATE + ") input").val();

//    var xbool2 = nwDateMaskCheck(crnwTR.find("td:eq(" + SPR_REFERENCEDATE + ") input").val());

//    if (Date.parse(refdate) < Date.parse(datercv)) {
//        MessageBox("Cannot proceed. Date Received should not be later than the set Reference Date.\n", "Purchase Order Awarding Entry", "error");
//        crnwTR.find("td:eq(" + SPR_DATERECEIVED + ") input").val(datercvOld);
//        return false;
//    }

//    if (xbool2 == false) {
//        crnwTR.find("td:eq(" + SPR_DATERECEIVED + ") input").val("");
//        crnwTR.find("td:eq(" + SPR_DATERECEIVED + ") input").focus();
//    }
//});

$(document).on('change', '.txtRefno', function () {
    CheckDuplicateRefNo("refno");
});

$(document).on('change', '.txtRefType', function () {
    CheckDuplicateRefNo("reftype");
});

function CheckDuplicateRefNo(col) {
    var error = '';

    //nwGrid = $("#nwGrid .tblGridBody");
    //var len = nwGrid.find('tr').length;

    nwGrid = nwGridCon_Book.ActiveSheet;
    var len = nwGrid.GetMaxRow();
    var concatval = '';
    var isDuplicate = false;
    for (var x = 0; x <= len - 1; x++) {

        var vc = nwGrid.GetText(SPR_VENDORCODE, x);
        var rt = nwGrid.GetValue(SPR_REFERENCETYPE, x);
        var rn = nwGrid.GetValue(SPR_REFERENCENO, x);

        //var concatval = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_VENDORCODE + ')').text()
        //                + nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_REFERENCETYPE + ') input').val()
        //                + nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_REFERENCENO + ') input').val();
        var concatval = vc + rt + rn;

        var reftype_i = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_REFERENCETYPE + ') input').val();
        var refno_i = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_REFERENCENO + ') input').val();

        var reftype_i = rt;
        var refno_i = rn;

        for (var i = 0; i <= len - 1; i++) {
            var ccdata = vc + rt + rn;

            if (concatval == ccdata && reftype_i != '' && refno_i != '') {
                if (x == i)
                    continue;

                if (col == "refno") {
                    //nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_REFERENCENO + ') input').val("");
                    nwGrid.SetValue(SPR_REFERENCENO, i, "");
                }
                if (col == "reftype") {
                    //nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_REFERENCETYPE + ') input').val("");
                    nwGrid.SetValue(SPR_REFERENCETYPE, i, "");
                }
                MessageBox("Cannot proceed. Reference No. already exists.\n", "Purchase Order Awarding Entry", "error");
                return;
            }
        }
    }
}

$(document).on('click', '#btnLoadDtls', function () {
    GetPrConsoHDR();



    if ($('.atlContainer .innertext div').length <= 0) {
        MessageBox("Cannot proceed. PR Consolidation No. is required.", Title, "error");
        return;
    }

    ClearAllJSONStrings();
    nwLoading_Start("xbtnLoadDtls", crLoadingHTML);
    GetAddtoListFilters();
    //$t().getAddtoListFilters();
    nwParameter_Add("SortByName", $('#cmbSortByName').val());
    nwParameter_Add("SortByAscDesc", $('#cmbSortByAscDesc').val());
    func_ActionDriven("actLoadDetails", false);
});

$(document).on('click', '.btnCanvassDtls', function () {
    nwLoading_Start("xbtnCanvassDtls", crLoadingHTML);

    var recuser = $("#txtRecuser").val();

    var nwGrid = nwGridCon_Book.ActiveSheet;
    var row = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row;

    var prconso = nwGrid.GetText(SPR_CONSOPRNO, row); //crnwTR.find("td:eq(" + SPR_CONSOPRNO + ")").text();
    var item = nwGrid.GetText(SPR_ITEMCODE, row); //crnwTR.find("td:eq(" + SPR_ITEMCODE + ")").text();

    //$("#idvallugPOUOM_CD").val(crnwTR.find("td:eq(" + SPR_UOM + ")").text());
    //$("#descvallugPOUOM_CD").val(crnwTR.find("td:eq(" + SPR_UOMDESC + ")").text());
    //$("#txtQtyForPO_CD").val(crnwTR.find("td:eq(" + SPR_POQTY + ") input").val());

    $("#idvallugPOUOM_CD").val(nwGrid.GetText(SPR_UOM, row)); //crnwTR.find("td:eq(" + SPR_UOM + ")").text()
    $("#descvallugPOUOM_CD").val(nwGrid.GetText(SPR_UOMDESC, row)); //crnwTR.find("td:eq(" + SPR_UOMDESC + ")").text()
    $("#txtQtyForPO_CD").val(nwGrid.GetText(SPR_POQTY, row)); //crnwTR.find("td:eq(" + SPR_POQTY + ") input").val()

    nwPopupForm_ShowModal("CanvassDtls");
    cust_GetPara();
    nwParameter_Add("jsonCanvassDtls", JSON.stringify(jsonCanvassDtls));
    nwParameter_Add("hasJson", HasJsonTempCanvass(recuser, prconso, item) >= 0 ? true : false);
    nwParameter_Add("jsonCanvassDtls", JSON.stringify(jsonCanvassDtls.filter(i =>(i.recuser + i.prconso + i.itemCode) == recuser + prconso + item)));
    nwParameter_Add("lineID", nwGrid.GetText(SPR_LINEID, row)); //crnwTR.find("td:eq(" + SPR_LINEID + ")").text()
    func_ActionDriven("actLoadCanvassDtls", false);
});

//$(document).on('click', '#btnCollapseAll', function () {
//    if ($("#btnCollapseAll").text() == 'Expand All') {
//        $("#btnCollapseAll").text("Collapse All");
//        $('#tab-one, #tab-two, #tab-three, #tab-four, #tab-five').prop('checked', true);
//        window.location.href = window.location.href.replace(window.location.hash, "") + "#contentCollapse";
//    }
//    else {
//        $("#btnCollapseAll").text("Expand All");
//        $('#tab-one, #tab-two, #tab-three, #tab-four, #tab-five').prop('checked', false);
//    }
//});

$(document).on('click', '#tab-one, #tab-two, #tab-three, #tab-four, #tab-five', function () {
    var idx = $(this).parents(".body").attr("id");
    if (idx != undefined) {
        setTimeout(function () {
            // window.location.href = window.location.href.replace(window.location.hash, "") + "#" ;
            // window.location.href = window.location.href.replace(window.location.hash, "") + "#" + idx;

            var height = 0;
            var tabID = idx;
            for (var i = 0; i < $(".cons").length; i++) {
                height += $(".cons:eq(" + i + ")").outerHeight();
            }
            $('.noah-webui-default-Content_Container').scrollTop(0);
            height = height + ($("#" + tabID + " .half").outerHeight() / 2);
            height = $("#FourTab").offset().top + height;
            $('.noah-webui-default-Content_Container').scrollTop(height);
        }, 300);
    }
});

var _crnwTR = "";
$(document).on("click", ".nwGridClick", function (e) {

    if (!isGridClick) {
        return;
    }
    //_crnwTR = crnwTR;
     //nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row;


    //_crnwTR = nwGridCon_Book.ActiveSheet.CellSelected.row - 1
    _crnwTR = $('#cboxRowNumber').val();

    var error = '';

    var orderType = getDataOfGrid('nwGridCon', '', SPR_ORDERTYPECODE - 1, _crnwTR);
    var vendor = getDataOfGrid('nwGridCon', '', SPR_VENDORCODE - 1, _crnwTR);
    var prConso = getDataOfGrid('nwGridCon', '', SPR_CONSOPRNO - 1, _crnwTR);
    var prDocno = getDataOfGrid('nwGridCon', '', SPR_PRDOCNO - 1, _crnwTR);
    var itemCode = getDataOfGrid('nwGridCon', '', SPR_ITEMCODE - 1, _crnwTR);
    var uom = getDataOfGrid('nwGridCon', '', SPR_ORIGUOM - 1, _crnwTR);
    var ordertypeCode = getDataOfGrid('nwGridCon', '', SPR_ORDERTYPECODE - 1, _crnwTR);
    var ordertypeDesc = getDataOfGrid('nwGridCon', '', SPR_ORDERTYPEDESC - 1, _crnwTR);
    var vendorName = getDataOfGrid('nwGridCon', '', SPR_VENDORNAME - 1, _crnwTR);
    var vatDesc = getDataOfGrid('nwGridCon', '', SPR_VATDESC - 1, _crnwTR);
    var vatrate = getDataOfGrid('nwGridCon', '', SPR_VATRATE - 1, _crnwTR);
    var currency = getDataOfGrid('nwGridCon', '', SPR_CURRENCY - 1, _crnwTR);

    var loc = $("#idvallugLocation").val();
    GetPrConsoHDR();

    if (isQtyClick == true) {
        if (loc == '' && prconso_hdr == '') {
            error += "Cannot proceed. Please complete the header details.\n";
        }
        if (loc == '') {
            error += "Cannot proceed. Location with Accountable Forms is required.\n";
        }
        //if (prconso_hdr == '') {
        //    error += "Cannot proceed. PR Consolidation No. is required.\n";
        //}

        if ($('.atlContainer .innertext div').length <= 0) {
            error += "Cannot proceed. PR Consolidation No. is required.\n";
        }
    }
    else {
        if (loc == '' && prconso_hdr == '') {
            error += "Cannot proceed. Please complete the header details.\n";
        }
        else if (loc == '') {
            error += "Cannot proceed. Location with Accountable Forms is required.\n";
        }
            //else if (prconso_hdr == '') {
            //    error += "Cannot proceed. PR Consolidation No. is required.\n";
            //}
        else if ($('.atlContainer .innertext div').length <= 0) {
            error += "Cannot proceed. PR Consolidation No. is required.\n";
        }
        else {
            if (vendor == '' && ordertypeCode == '' && vatDesc == '' && uom == '' && currency == '') {
                error += "Cannot proceed. Please complete the line details.\n";
            }
           
        }
    }
    if (error != "") {
        MessageBox(error, Title, "error");
        return;
    }


    itemCode_glb = getDataOfGrid('nwGridCon', '', SPR_ITEMCODE - 1, _crnwTR);
    prConso_glb = getDataOfGrid('nwGridCon', '', SPR_CONSOPRNO - 1, _crnwTR);
    uom_glb = getDataOfGrid('nwGridCon', '', SPR_UOM - 1, _crnwTR);
    $("#txtItem").val(getDataOfGrid('nwGridCon', '', SPR_ITEMDESC - 1, _crnwTR));
    $("#idvallugUOM").val(getDataOfGrid('nwGridCon', '', SPR_UOM - 1, _crnwTR));
    $("#descvallugUOM").val(getDataOfGrid('nwGridCon', '', SPR_UOMDESC - 1, _crnwTR));
    $("#idvallugCurrency").val(getDataOfGrid('nwGridCon', '', SPR_CURRENCY - 1, _crnwTR));
    $("#descvallugCurrency").val(getDataOfGrid('nwGridCon', '', SPR_CURRDESC - 1, _crnwTR));
    $("#txtQtyPO").val(setNumReplace(getDataOfGrid('nwGridCon', 'input', SPR_POQTY - 1, _crnwTR), 5));

    //var excQty = crnwTR.find("td:eq(" + SPR_EXQTY + ")").is(":checked");
    //var excQty = $(`#nwGrid-nwData tr:eq(${_crnwTR})`).find(`td:eq(${SPR_EXQTY})`).is(":checked");
    var excQty = nwGridCon_Book.ActiveSheet.GetText(SPR_EXQTY, _crnwTR) == "1" ? true : false;
    
    if (excQty == true) {
        $("#chkExcQty").prop("checked", true);
    }
    else {
        $("#chkExcQty").prop("checked", false);
    }
    //let useLastPoPrice = crnwTR.find("td:eq(" + SPR_USELASTPOPRICE + ")").text();
    //let useLastPoPrice = $(`#nwGrid-nwData tr:eq(${_crnwTR})`).find(`td:eq(${SPR_USELASTPOPRICE}) input`).is(":checked") ? "1" : "0";
    //getDataOfGrid('nwGrid', '', SPR_USELASTPOPRICE, _crnwTR.index());
    //let isCanvasss = $(`#nwGrid-nwData tr:eq(${_crnwTR})`).find(`td:eq(${SPR_CANVASSTAG})`).text();

    let useLastPoPrice = nwGridCon_Book.ActiveSheet.GetText(SPR_USELASTPOPRICE - 1, _crnwTR) == "1" ? true : false;
    let isCanvasss = nwGridCon_Book.ActiveSheet.GetText(SPR_CANVASSTAG - 1, _crnwTR);

    if (useLastPoPrice == "1" && isCanvasss != "1") {
        $("#chkUseLastPO").prop("checked", true);

    }
    else {
        $("#chkUseLastPO").prop("checked", false);
        $(`#nwGrid-nwData tr:eq(${_crnwTR})`).find(`td:eq(${SPR_USELASTPOPRICE}) input`).prop('checked', false);

        nwGridCon_Book.ActiveSheet.SetValue(SPR_USELASTPOPRICE, _crnwTR, false);
        nwGridCon_Book.ActiveSheet.SetText(SPR_USELASTPOPRICE, _crnwTR, "0");
    }
    //$('#nwGrid .tblGridBody tr td').removeClass("btnBlue");
    //$('#nwGrid .tblGridBody tr td').css("font-weight", "normal");
    //$('#nwGrid .tblGridBody tr:nth-child(' + (crnwTR.index() + 1) + ') td').css("font-weight", "bold");
    //$('#nwGrid .tblGridBody tr:nth-child(' + (crnwTR.index() + 1) + ') td').addClass("btnBlue");   

    //cust_GetPara();   

    //if (orderType != '' && vendor != '') {

    //}

    LoadSubGrid(prConso,prDocno, itemCode, uom, ordertypeCode, ordertypeDesc, vendorName, vatDesc, vatrate, 1);
});


function nwGrid_tdClick(nwGridObj, crTR, crTD) {
    if (nwGridObj == "nwGrid") {

        var row = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row
        var col = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().col

        if (SPR_USELASTPOPRICE == crTD.index()) {
            //let isUseLastPO = $(`#nwGrid .tblGridBody tr:eq(${crTR.index()}) td:eq(${crTD.index()}) input`).is(':checked');
            let isUseLastPO = nwGridCon_Book.ActiveSheet.GetText(col, row) == "1" ? true : false;

            $('#chkUseLastPO').trigger('click');
            if (isUseLastPO) {
                //$(`#nwGrid .tblGridBody tr:eq(${crTR.index()}) td:eq(${crTD.index()}) input`).prop('checked', true);
                nwGridCon_Book.ActiveSheet.SetValue(col, row, true);
            } else {
                //$(`#nwGrid .tblGridBody tr:eq(${crTR.index()}) td:eq(${crTD.index()}) input`).prop('checked', false);
                nwGridCon_Book.ActiveSheet.SetValue(col, row, false);
            }
        }
        
    }
    return true;
}

$(document).on("click", "#chkUseLastPO", function (e) {
    if ($(this).is(":checked")) {
        //let lastPOPrice = getNumReplace(getNum(_crnwTR.find("td:eq(" + SPR_LASTPOPRICE + ")").text()));
        //let discAmnt = getNumReplace(getNum(_crnwTR.find("td:eq(" + SPR_DISC_AMNT + ") input").val()));
        //let frghAmnt = getNumReplace(getNum(_crnwTR.find("td:eq(" + SPR_FRGHT_AMNT + ") input").val()));

        var nwGrid = nwGridCon_Book.ActiveSheet;
        var row = nwGrid.GetSelectedIndexes().row;

        let lastPOPrice = getNumReplace(getNum(nwGrid.GetText(SPR_LASTPOPRICE, row)));
        let discAmnt = getNumReplace(getNum(nwGrid.GetText(SPR_DISC_AMNT, row)));
        let frghAmnt = getNumReplace(getNum(nwGrid.GetText(SPR_FRGHT_AMNT, row)));

        if (getNumReplace(lastPOPrice) <= 0) {
            MessageBox("Cannot proceed. No Last PO Price available.", Title, "error");
            $("#chkUseLastPO").prop("checked", false);
            return;
        }

        if (lastPOPrice <= 0) {
            $("#txtLastPOPrice").val('');
        } else {
            $("#txtLastPOPrice").val(setNumReplace(lastPOPrice, 5));
        }


        $("#txtPOUCostVATEX").val(setNumReplace(lastPOPrice, 5));
        $("#txtPOUCostVATIN").val(setNumReplace(lastPOPrice, 5));

        $("#txtTotalDiscAmnt").val(setNumReplace(discAmnt, 5));
        $("#txtTotalFrgtAmnt").val(setNumReplace(frghAmnt, 5));

        var totalPOVATIN = 0, totalPOVATEX = 0, addVAT = 0, grossAmt = 0;
        var qtyPO = getNumReplace($("#txtQtyPO").val());
        var amtVATINPO = getNumReplace($("#txtPOUCostVATIN").val());
        var amtVATEXPO = getNumReplace($("#txtPOUCostVATEX").val());
        //let rate = _crnwTR.find('td:eq(' + SPR_VATRATE + ')').text();
        let rate = nwGrid.GetText(SPR_VATRATE, row)
        amtVATINPO = ((amtVATINPO * rate) + amtVATINPO)
        totalPOVATIN = ((amtVATINPO * qtyPO) - discAmnt) + ((frghAmnt * vatrate) + frghAmnt);

       

        //totalucostVATEX = ((ucostVATEX * qty) - discAmnt) + frghAmnt;
        totalPOVATEX = ((amtVATEXPO * qtyPO) - discAmnt) + frghAmnt;
        addVAT = totalPOVATIN - totalPOVATEX;



        //addVAT = totalPOVATEX * parseFloat(rate);
        grossAmt = totalPOVATEX - addVAT;

        $("#txtPOUCostVATIN").val(setNumReplace(amtVATINPO, 5));
        $("#txtTotalPOAmtVATIN").val(setNumReplace(totalPOVATIN, 2));
        $("#txtTotalPOAmtVATEX").val(setNumReplace(totalPOVATEX, 2));
        $("#txtAddVAT").val(setNumReplace(addVAT, 2));
        $("#txtGrossAmtVATIN").val(setNumReplace(grossAmt, 2));

        DisplayAmounts(_crnwTR, amtVATINPO, amtVATEXPO, totalPOVATEX);
        DisplayAmounts(row, amtVATINPO, amtVATEXPO, totalPOVATEX);

        //_crnwTR.find('td:eq(' + SPR_USELASTPOPRICE + ') input').prop('checked', true);
        nwGrid.SetValue(SPR_USELASTPOPRICE, row, true)
    }
    else {
        //$("#txtLastPOPrice").val("");
        $("#txtPOUCostVATEX").val("");
        $("#txtPOUCostVATIN").val("");
        $("#txtTotalPOAmtVATIN").val("");
        $("#txtTotalPOAmtVATEX").val("");
        $("#txtAddVAT").val("");
        $("#txtGrossAmtVATIN").val("");

        $("#txtTotalDiscAmnt").val("");
        $("#txtTotalFrgtAmnt").val("");

        //DisplayAmounts(_crnwTR, 0, 0, 0);
        DisplayAmounts(row, 0, 0, 0);

        //_crnwTR.find('td:eq(' + SPR_USELASTPOPRICE + ') input').prop('checked', false);

    }
});

var _crnwTR_DD = '';
var delDate_DD = '';
$(document).on("focus", ".dtpDeliveryDate_DD", function () {
    //_crnwTR_DD = crnwTR;
    _crnwTR_DD = nwGridDD_Book.ActiveSheet.GetSelectedIndexes().row;

    //delDate_DD = crnwTR.find("td:eq(" + SPR_DD_DELIVERYDATE + ") input").val();
    delDate_DD = nwGridDD_Book.ActiveSheet.GetValue(SPR_DD_DELIVERYDATE, _crnwTR_DD);
});

var numPoQty_DD = '';
$(document).on("focus", ".numPOQty_DD", function () {
    //_crnwTR_DD = crnwTR;
    _crnwTR_DD = nwGridDD_Book.ActiveSheet.GetSelectedIndexes().row;

    //numPoQty_DD = getNumReplace(getNum(_crnwTR_DD.find("td:eq(" + SPR_DD_QTYPO + ") input").val()));
    numPoQty_DD = nwGridDD_Book.ActiveSheet.GetValue(SPR_DD_QTYPO, _crnwTR_DD);
});

$(document).on('change', '.dtpDeliveryDate_DD', function (e) {

    var nwGrid = nwGridDD_Book.ActiveSheet;
    _crnwTR_DD = nwGrid.GetSelectedIndexes().row;


    //var delDate = _crnwTR_DD.find("td:eq(" + SPR_DD_DELIVERYDATE + ") input").val();
    var delDate = nwGrid.GetValue(SPR_DD_DELIVERYDATE, _crnwTR_DD);

    var currDate = $("#txtServerdate").val();

    //var xbool2 = nwDateMaskCheck(_crnwTR_DD.find("td:eq(" + SPR_DD_DELIVERYDATE + ") input").val());
    var xbool2 = nwDateMaskCheck(nwGrid.GetValue(SPR_DD_DELIVERYDATE, _crnwTR_DD));

    if (Date.parse(delDate) < Date.parse(currDate)) {
        MessageBox("Cannot proceed. Delivery date should not be earlier than the current server date.\n", "Delivery Details", "error");
        //_crnwTR_DD.find("td:eq(" + SPR_DD_DELIVERYDATE + ") input").val(delDate_DD);
        nwGrid.SetValue(SPR_DD_DELIVERYDATE, _crnwTR_DD, delDate_DD);
        return false;
    }
    else {
        //var prconso = _crnwTR_DD.find("td:eq(" + SPR_DD_PRCONSO + ")").text();
        //var itemCode = _crnwTR_DD.find("td:eq(" + SPR_DD_ITEMCODE + ")").text();
        //var prLineID = _crnwTR_DD.find("td:eq(" + SPR_DD_PRLINEID + ")").text();
        //var ddRowno = _crnwTR_DD.find("td:eq(" + SPR_DD_ROWNO + ")").text();
        //var vendor = _crnwTR_DD.find("td:eq(" + SPR_DD_VENDOR + ")").text();

        var prconso = nwGrid.GetText(SPR_DD_PRCONSO, _crnwTR_DD);
        var itemCode = nwGrid.GetText(SPR_DD_ITEMCODE, _crnwTR_DD);
        var prLineID = nwGrid.GetText(SPR_DD_PRLINEID, _crnwTR_DD);
        var ddRowno = nwGrid.GetText(SPR_DD_ROWNO, _crnwTR_DD);
        var vendor = nwGrid.GetText(SPR_DD_VENDOR, _crnwTR_DD);

        //let xxRow = $(`#nwGrid-nwData tr:eq(${_crnwTR.index()})`).find(`td:eq(${SPR_ALT_LINEID})`).text();
        let xxRow = nwGrid.GetText(SPR_ALT_LINEID, _crnwTR_DD);

        let id = prconso + itemCode + prLineID + ddRowno + vendor + (xxRow);

        StoreUpdatedJson_DD(id);
        nwJsonUpdateValue_DD(jsonDelDtls, _crnwTR_DD.index());
    }

    if (xbool2 == false) {
        //_crnwTR_DD.find("td:eq(" + SPR_DD_DELIVERYDATE + ") input").val("");
        //_crnwTR_DD.find("td:eq(" + SPR_DD_DELIVERYDATE + ") input").focus();

        nwGrid.SetValue(SPR_DD_DELIVERYDATE, _crnwTR_DD, "");
    }

    if (e.which == 13) {
        $("#nwGridDDCon").trigger("focusout");
    }
});

$(document).on('change', '.numPOQty_DD', function () {

    nwGrid = nwGridDD_Book.ActiveSheet;
    var row = nwGridDD_Book.ActiveSheet.GetSelectedIndexes().row

    //var prQty = getNumReplace(getNum(_crnwTR_DD.find("td:eq(" + SPR_DD_PRQTY + ")").text()));
    //var poQty = getNumReplace(getNum(_crnwTR_DD.find("td:eq(" + SPR_DD_QTYPO + ") input").val()));
    //var itemCode = _crnwTR_DD.find("td:eq(" + SPR_DD_ITEMCODE + ")").text();
    //var vendor = _crnwTR_DD.find("td:eq(" + SPR_DD_VENDOR + ")").text();
    //let prDocno = _crnwTR_DD.find("td:eq(" + SPR_DD_PRDOCNO + ")").text();

    var prQty = getNumReplace(getNum(nwGrid.GetText(SPR_DD_PRQTY, row)));
    var poQty = getNumReplace(getNum(nwGrid.GetText(SPR_DD_QTYPO, row)));
    var itemCode = nwGrid.GetText(SPR_DD_ITEMCODE, row);
    var vendor = nwGrid.GetText(SPR_DD_VENDOR, row);
    let prDocno = nwGrid.GetText(SPR_DD_PRDOCNO, row);

    //var len = nwGrid.find('tr').length;
    var len = nwGrid.GetMaxRow();

    let poQty_DD = 0;
    for (var x = 0; x <= len - 1; x++) {
        //let vendor_dd = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_VENDOR + ')').text();
        //let itemcode_dd = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_ITEMCODE + ')').text();
        //let prqty_dd = getNumReplace(getNum(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRQTY + ')').text()));
        //let prDocno_dd = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRDOCNO + ')').text();

        let vendor_dd = nwGrid.GetText(SPR_DD_VENDOR, x);
        let itemcode_dd = nwGrid.GetText(SPR_DD_ITEMCODE, x);
        let prqty_dd = getNumReplace(getNum(nwGrid.GetText(SPR_DD_PRQTY, x)));
        let prDocno_dd = nwGrid.GetText(SPR_DD_PRDOCNO, x);


        if (vendor_dd == vendor && itemcode_dd == itemCode && prqty_dd > 0 && prDocno == prDocno_dd) {
            //poQty_DD += getNumReplace(getNum(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPO + ') input').val()));
            poQty_DD += getNumReplace(getNum(nwGrid.GetValue(SPR_DD_QTYPO, x)));
        }
    }

    if (poQty_DD > prQty) {
        MessageBox("Cannot proceed. Quantity for PO should not be greater than the PR Qty Before PO.", "Delivery Details", "error");
        //_crnwTR_DD.find("td:eq(" + SPR_DD_QTYPO + ") input").val(setNumReplace(numPoQty_DD, 5));

        nwGrid.SetValue(SPR_DD_QTYPO, row, setNumReplace(numPoQty_DD, 5));
        return;
    }
    else {
        let remQty = 0;
        remQty = prQty - poQty;

        //_crnwTR_DD.find("td:eq(" + SPR_DD_REMQTY + ")").text(setNumReplace(remQty, 5));
        nwGrid.SetValue(SPR_DD_REMQTY, row, setNumReplace(remQty, 5));

        //var prconso = _crnwTR_DD.find("td:eq(" + SPR_DD_PRCONSO + ")").text();
        //var itemCode = _crnwTR_DD.find("td:eq(" + SPR_DD_ITEMCODE + ")").text();
        //var prLineID = _crnwTR_DD.find("td:eq(" + SPR_DD_PRLINEID + ")").text();
        //var ddRowno = _crnwTR_DD.find("td:eq(" + SPR_DD_ROWNO + ")").text();
        //var vendor = _crnwTR_DD.find("td:eq(" + SPR_DD_VENDOR + ")").text();

        var prconso = nwGrid.GetValue(SPR_DD_PRCONSO, row);
        var itemCode = nwGrid.GetValue(SPR_DD_ITEMCODE, row);
        var prLineID = nwGrid.GetValue(SPR_DD_PRLINEID, row);
        var ddRowno = nwGrid.GetValue(SPR_DD_ROWNO, row);
        var vendor = nwGrid.GetValue(SPR_DD_VENDOR, row);

        StoreUpdatedJson_DD(prconso + itemCode + prLineID + ddRowno + vendor + (_crnwTR.index() + 1));
        nwJsonUpdateValue_DD(jsonDelDtls, _crnwTR_DD.index());



        let tmpJsonx = jsonDelDtls.filter(i => (i.prConso + i.itemCode + i.vendor + i.mainRowNum) == (prconso + itemCode + vendor + (_crnwTR.index() + 1)));
        let totalx = 0;
        for (var i in tmpJsonx) {
            totalx += parseFloat(tmpJsonx[i].qtyPo.replace(/,/g, ""));
        }
        //_crnwTR.find('td:eq(' + SPR_POQTY + ') input').val(setNumReplace(totalx, 5));
        nwGrid.SetValue(SPR_POQTY, row, setNumReplace(totalx, 5));
    }
});

function HasJsonTempCanvass(recuser, prconso, item) {
    return jsonCanvassDtls.findIndex(i => (i.recuser + i.prconso + i.itemCode) == recuser + prconso + item)
}

function HasJsonTempCanvassPRConso(recuser, prconso) {
    return jsonCanvassDtls.findIndex(i => (i.recuser + i.prconso) == recuser + prconso)
}

function FilterJsonCanvassInitial(recuser, prconso) {
    return jsonCanvassDtls.filter(i => (i.recuser + i.prconso) != recuser + prconso)
}

function SaveJsonCanvassInitial(recuser, prconso) {
    //Filter Data
    jsonCanvassDtls = FilterJsonCanvassInitial(recuser, prconso);

    for (var i = 0; i < jsonCanvassDtlsFiltered.length; i++) {
        var Store = {};

        Store["recuser"] = jsonCanvassDtlsFiltered[i].recuser;
        Store["prconso"] = jsonCanvassDtlsFiltered[i].prconso;
        Store["itemCode"] = jsonCanvassDtlsFiltered[i].itemCode;
        Store["itemDesc"] = jsonCanvassDtlsFiltered[i].itemDesc;
        Store["uomCode"] = jsonCanvassDtlsFiltered[i].uomCode;
        Store["uom"] = jsonCanvassDtlsFiltered[i].uom;
        Store["qty"] = jsonCanvassDtlsFiltered[i].qty;
        Store["vendoruomcode"] = jsonCanvassDtlsFiltered[i].vendoruomcode;
        Store["vendoruom"] = jsonCanvassDtlsFiltered[i].vendoruom;
        Store["vendorqty"] = jsonCanvassDtlsFiltered[i].vendorqty;
        Store["ucostVATIN"] = jsonCanvassDtlsFiltered[i].ucostVATIN;
        Store["ucostVATEX"] = jsonCanvassDtlsFiltered[i].ucostVATEX;
        Store["vendorCode"] = jsonCanvassDtlsFiltered[i].vendorCode;
        Store["vendorName"] = jsonCanvassDtlsFiltered[i].vendorName;
        Store["vendorContact"] = jsonCanvassDtlsFiltered[i].vendorContact;
        Store["remarks"] = jsonCanvassDtlsFiltered[i].remarks;
        Store["rowno"] = jsonCanvassDtlsFiltered[i].rowno;

        jsonCanvassDtls.push(Store);
    }
}

function FilterJsonCanvass(recuser, prconso, vendorcode, vendorname, itemcode, uom) {
    return jsonCanvassDtls.filter(i => (i.recuser + i.prconso + i.vendorCode + i.vendorName + i.itemCode + i.uom) != recuser + prconso + vendorcode + vendorname + itemcode + uom)
}

function SaveJsonCanvass(recuser, prconso, vendorcode, vendorname, itemcode, uom) {
    //Filter Data
    jsonCanvassDtls = FilterJsonCanvass(recuser, prconso, vendorcode, vendorname, itemcode, uom);

    for (var i = 0; i < jsonCanvassDtlsFiltered.length; i++) {
        var Store = {};

        let _recuser = jsonCanvassDtlsFiltered[i].recuser;
        let _prconso = jsonCanvassDtlsFiltered[i].prconso;
        let _vendorcode = jsonCanvassDtlsFiltered[i].vendorCode;
        let _vendorname = jsonCanvassDtlsFiltered[i].vendorName;
        let _itemcode = jsonCanvassDtlsFiltered[i].itemCode;
        let _uom = jsonCanvassDtlsFiltered[i].uom;

        if (_recuser == recuser && _prconso == prconso && _vendorcode == vendorcode && _vendorname == vendorname && _itemcode == itemcode && _uom == uom) {
            Store["recuser"] = jsonCanvassDtlsFiltered[i].recuser;
            Store["prconso"] = jsonCanvassDtlsFiltered[i].prconso;
            Store["itemCode"] = jsonCanvassDtlsFiltered[i].itemCode;
            Store["itemDesc"] = jsonCanvassDtlsFiltered[i].itemDesc;
            Store["uomCode"] = jsonCanvassDtlsFiltered[i].uomCode;
            Store["uom"] = jsonCanvassDtlsFiltered[i].uom;
            Store["qty"] = jsonCanvassDtlsFiltered[i].qty;
            Store["vendoruomcode"] = jsonCanvassDtlsFiltered[i].vendoruomcode;
            Store["vendoruom"] = jsonCanvassDtlsFiltered[i].vendoruom;
            Store["vendorqty"] = jsonCanvassDtlsFiltered[i].vendorqty;
            Store["ucostVATIN"] = jsonCanvassDtlsFiltered[i].ucostVATIN;
            Store["ucostVATEX"] = jsonCanvassDtlsFiltered[i].ucostVATEX;
            Store["vendorCode"] = jsonCanvassDtlsFiltered[i].vendorCode;
            Store["vendorName"] = jsonCanvassDtlsFiltered[i].vendorName;
            Store["vendorContact"] = jsonCanvassDtlsFiltered[i].vendorContact;
            Store["remarks"] = jsonCanvassDtlsFiltered[i].remarks;
            Store["rowno"] = jsonCanvassDtlsFiltered[i].rowno;

            jsonCanvassDtls.push(Store);
        }

    }
}



function setAllocProcProperties(row) {
    //$("#nwGrid tbody tr:eq(" + row + ") td:eq(" + SPR_CD_ALLOCPROCESS + ") button").removeClass("btnBlue");
    //$("#nwGridChargeDtlsCon tbody tr:eq(" + row + ") td:eq(" + SPR_CD_ALLOCPROCESS + ") button").addClass("btnGreen");

    nwGridCon_Book.ActiveSheet.SetBackground(SPR_CD_ALLOCPROCESS, row, "gainsboro");
}

function setjsonCanvassDtlsFiltered(json, isOverride) {
    if (jsonCanvassDtlsFiltered.length > 0 && (!isOverride)) {
        for (let i = 0; i <= json.length - 1; i++) {
            jsonCanvassDtlsFiltered.push(json[i]);
        }
    } else {
        jsonCanvassDtlsFiltered = json;
    }


    if (jsonCanvassDtls.length > 0) { //if not empty

    }


}

var jsonCanvassNoVendorCode = [];

function CanvassDtls() {
    //nwGrid = $("#nwGrid .tblGridBody");
    //var len = nwGrid.find('tr').length;

    nwGrid = nwGridCon_Book.ActiveSheet;
    var len = nwGrid.GetMaxRow();

    jsonCanvassNoVendorCode = bruteForceSearchJSON(jsonCanvassDtls, "vendorCode", "");
    if (jsonCanvassNoVendorCode.length > 0) {
        $('#btnUpdateunaccreditedVendor').enable(true);

    } else {
        $('#btnUpdateunaccreditedVendor').enable(false);
    }

    for (var x = 0; x <= len - 1; x++) {
        //var item = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_ITEMCODE + ')').text();
        //var prconso = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_CONSOPRNO + ')').text();
        //var vendor = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_VENDORCODE + ')').text();
        //let poQty = getNumReplace(getNum(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_POQTY + ') input').val()));

        var item = nwGrid.GetText(SPR_ITEMCODE, x);
        var prconso = nwGrid.GetText(SPR_CONSOPRNO, x);
        var vendor = nwGrid.GetText(SPR_VENDORCODE, x);
        let poQty = getNumReplace(getNum(nwGrid.GetText(SPR_POQTY, x)));

        for (var i = 0; i < jsonCanvassDtlsFiltered.length; i++) {
            var item_c = jsonCanvassDtlsFiltered[i].itemCode;
            var prconso_c = jsonCanvassDtlsFiltered[i].prconso;
            var vendor_c = jsonCanvassDtlsFiltered[i].vendorCode;

            if (item_c == item && prconso_c == prconso) {
                //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_CANVASSDTLS + ')').removeClass("btnGray");
                //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_CANVASSDTLS + ')').addClass("btnGreen");
                //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_CANVASSDTLS + ')').addClass("btnCanvassDtls");
                //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_CANVASSTAG + ')').text("1");
                //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_SELECT + ') input').prop("checked", true);

                nwGrid.SetBackground(SPR_CANVASSTAG, x, "#41cc72");
                nwGrid.SetText(SPR_CANVASSTAG, x, "1");
                nwGrid.SetValue(SPR_CANVASSTAG, x, true);
            }
            if (item_c == item && prconso_c == prconso && vendor_c == vendor && vendor != "") {
                let ucostVATEX = setNumReplace(getNum(jsonCanvassDtlsFiltered[i].ucostVATEX), 5);
                let ucostVATIN = setNumReplace(getNum(jsonCanvassDtlsFiltered[i].ucostVATIN), 5);
                let LwstQouteUCVATEX = setNumReplace(getNum(jsonCanvassDtlsFiltered[i].LwstQouteUCVATEX), 5);
                let LwstQouteUCVATIN = setNumReplace(getNum(jsonCanvassDtlsFiltered[i].LwstQouteUCVATIN), 5);

                

                //let discAmnt = getNumReplace(getNum(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DISC_AMNT + ') input').val()));
                //let frgtAmnt = getNumReplace(getNum(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_FRGHT_AMNT + ') input').val()));

                let discAmnt = getNumReplace(getNum(nwGrid.SetText(SPR_DISC_AMNT, x, "")));
                let frgtAmnt = getNumReplace(getNum(nwGrid.SetText(SPR_FRGHT_AMNT, x, "")));


                let currTotal = (poQty * getNumReplace(getNum(jsonCanvassDtlsFiltered[i].ucostVATEX)));

                let currTotalVAIN = (poQty * getNumReplace(getNum(jsonCanvassDtlsFiltered[i].ucostVATIN)));

                let totalPOAmnt = (currTotal - parseFloat(discAmnt)) + parseFloat(frgtAmnt);

             

                //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_LWST_QUOTE_UC_VATEX + ')').text(LwstQouteUCVATEX);
                //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_LWST_QUOTE_UC_VATIN + ')').text(LwstQouteUCVATIN);
                nwGrid.SetText(SPR_LWST_QUOTE_UC_VATEX, x, LwstQouteUCVATEX);
                nwGrid.SetText(SPR_LWST_QUOTE_UC_VATIN, x, LwstQouteUCVATIN);

                //uncomment me

                //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_POUNITCOST_VATEX + ') input').val(ucostVATEX);
                //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_POUNITCOSTVATIN + ') input').val(ucostVATIN
                nwGrid.SetValue(SPR_POUNITCOST_VATEX, x, ucostVATEX);
                nwGrid.SetValue(SPR_POUNITCOSTVATIN, x, ucostVATIN);
              

                //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_POTOTALAMT_VATEX + ')').text(setNumReplace(totalPOAmnt, 2));
                //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_POTOTALAMT_VATIN + ')').text(setNumReplace(currTotalVAIN, 2));
                nwGrid.SetText(SPR_POTOTALAMT_VATEX, x, setNumReplace(totalPOAmnt, 2));
                nwGrid.SetText(SPR_POTOTALAMT_VATIN, x, setNumReplace(currTotalVAIN, 2));


                let ttlSavAmnt = setNumReplace((getNumReplace(getNum(LwstQouteUCVATEX)) - getNumReplace(getNum(ucostVATEX))) * poQty, 2);
                let ttlSavAmntVATIN = setNumReplace((getNumReplace(getNum(LwstQouteUCVATIN)) - getNumReplace(getNum(ucostVATIN))) * poQty, 2);

                //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_PO_SAVEAMNT_VATEX + ')').text(ttlSavAmnt);
                nwGrid.SetText(SPR_PO_SAVEAMNT_VATEX, x, ttlSavAmnt);

                //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_PO_SAVEAMNT_VATIN + ')').text(ttlSavAmntVATIN);
                nwGrid.SetText(SPR_PO_SAVEAMNT_VATIN, x, ttlSavAmntVATIN);

            }
        }
    }
}

var glbPOUnitCostVATEX = 0.00000, glbPOUnitCostVATIN = 0.00000;
$(document).on('click', '#txtPOUCostVATEX', function () {
    glbPOUnitCostVATEX = getNumReplace($(this).val());
    let vatrate = getNumReplace(getNum($("#txtVATRate").val()));
    glbPOUnitCostVATIN = glbPOUnitCostVATEX * (1 + vatrate);
});

$(document).on('click', '#txtPOUCostVATIN', function () {
    glbPOUnitCostVATIN = getNumReplace($(this).val());
    let vatrate = getNumReplace(getNum($("#txtVATRate").val()));
    glbPOUnitCostVATEX = glbPOUnitCostVATIN / (1 + vatrate);
});

$(document).on('click', '.txtLINUnitCostVATEX', function () {
    glbPOUnitCostVATEX = getNumReplace($(this).val());
    let vatrate = getNumReplace(getNum($("#txtVATRate").val()));
    glbPOUnitCostVATIN = glbPOUnitCostVATEX * (1 + vatrate);
});

$(document).on('click', '.txtLINUnitCostVATEX', function () {
    glbPOUnitCostVATIN = getNumReplace($(this).val());
    let vatrate = getNumReplace(getNum($("#txtVATRate").val()));
    glbPOUnitCostVATEX = glbPOUnitCostVATIN / (1 + vatrate);
});

$(document).on('change', '#txtPOUCostVATIN', function () {

    var nwGrid = nwGridCon_Book.ActiveSheet;
    var row = nwGrid.GetSelectedIndexes().row;

    let vatrate = getNumReplace(getNum($("#txtVATRate").val()));
    let ucostVATIN = getNumReplace(getNum($(this).val()));
    let qty = getNumReplace(getNum($("#txtQtyPO").val()));
    let origVATEX = getNumReplace(getNum($("#txtLastPOPrice").val()));
    let ucostVATEX = 0.00000, totalucostVATEX = 0.00, totalucostVATIN = 0.00, addvat = 0.00, grossamt = 0.00, canvassUCost = 0.00000;

    //let discAmnt = getNumReplace(getNum(crnwTR.find("td:eq(" + SPR_DISC_AMNT + ") input").val()));
    //let frghAmnt = getNumReplace(getNum(crnwTR.find("td:eq(" + SPR_FRGHT_AMNT + ") input").val()));
    let discAmnt = getNumReplace(getNum(nwGrid.GetValue(SPR_DISC_AMNT, row)));
    let frghAmnt = getNumReplace(getNum(nwGrid.GetValue(SPR_FRGHT_AMNT, row)));

    ucostVATEX = getNumReplace(getNum((ucostVATIN / (1 + vatrate)).toFixed(5)));
    //check if Unit cost is higher than the PR Amount
    let prUnitCost = getPRUnitCost();
    var recuser = $("#txtRecuser").val();

    //var prconso = crnwTR.find("td:eq(" + SPR_CONSOPRNO + ")").text();
    //var item = crnwTR.find("td:eq(" + SPR_ITEMCODE + ")").text();
    var prconso = nwGrid.GetText(SPR_DISC_AMNT, row);
    var item = nwGrid.GetText(SPR_DISC_AMNT, row);

    jsonTmpx = jsonCanvassDtls.filter(i =>(i.recuser + i.prconso + i.itemCode) == recuser + prconso + item);
    if (jsonTmpx.length > 0 && jsonTmpx != undefined) {
        canvassUCost = getNumReplace(getNum(jsonTmpx[0]["ucostVATIN"]));
    }
    if (ucostVATIN > canvassUCost && jsonTmpx.length > 0) {
        MessageBox("PO Unit Cost (VATIN) should not be greater than the Canvassed Unit Cost.\n", Title, 'error');
        $(this).val(glbPOUnitCostVATIN);
        $('#txtPOUCostVATEX').val(glbPOUnitCostVATEX);
        ucostVATEX = glbPOUnitCostVATEX;
        ucostVATIN = glbPOUnitCostVATIN;
    } else if (ucostVATEX > prUnitCost) {
        MessageBox("PO Unit Cost is greater than the PR Unit Cost.\n", Title, 'info');
    }
    totalucostVATEX = ((ucostVATEX * qty) - discAmnt) + frghAmnt;
    //totalucostVATIN = ucostVATIN * qty;

    totalucostVATIN = ((ucostVATIN * qty) - discAmnt) + ((frghAmnt * vatrate) + frghAmnt);

    addvat = totalucostVATIN - totalucostVATEX;

    //addvat = totalucostVATEX * parseFloat(vatrate);
    grossamt = totalucostVATEX + addvat;

    $("#txtPOUCostVATEX").val(setNumReplace(ucostVATEX, 5));
    $("#txtTotalPOAmtVATIN").val(setNumReplace(totalucostVATIN, 2));
    $("#txtTotalPOAmtVATEX").val(setNumReplace(totalucostVATEX, 2));

    $("#txtTotalDiscAmnt").val(setNumReplace(discAmnt, 5));
    $("#txtTotalFrgtAmnt").val(setNumReplace(frghAmnt, 5));

    $("#txtAddVAT").val(setNumReplace(addvat, 2));
    $("#txtGrossAmtVATIN").val(setNumReplace(grossamt, 2));

    //DisplayAmounts(_crnwTR, ucostVATIN, ucostVATEX, totalucostVATEX);
    DisplayAmounts(row, ucostVATIN, ucostVATEX, totalucostVATEX);
    UseLastPOPrice(ucostVATEX, origVATEX);
});


$(document).on('change', '.txtLINUnitCostVATIN', function () {
    nwGrid = nwGridCon_Book.ActiveSheet;
    var row = nwGrid.GetSelectedIndexes().row;

    let vatrate = getNumReplace(getNum($("#txtVATRate").val()));

    //let ucostVATIN = getNumReplace(getNum(crnwTR.find("td:eq(" + SPR_POUNITCOSTVATIN + ") input").val()));
    let ucostVATIN = getNumReplace(getNum(nwGrid.GetValue(SPR_POUNITCOSTVATIN, row)));


    let qty = getNumReplace(getNum($("#txtQtyPO").val()));
    let origVATEX = getNumReplace(getNum($("#txtLastPOPrice").val()));
    let ucostVATEX = 0.00000, totalucostVATEX = 0.00, totalucostVATIN = 0.00, addvat = 0.00, grossamt = 0.00, canvassUCost = 0.00000;


    //let discAmnt = getNumReplace(getNum(crnwTR.find("td:eq(" + SPR_DISC_AMNT + ") input").val()));
    //let frghAmnt = getNumReplace(getNum(crnwTR.find("td:eq(" + SPR_FRGHT_AMNT + ") input").val()));
    let discAmnt = getNumReplace(getNum(nwGrid.GetValue(SPR_DISC_AMNT, row)));
    let frghAmnt = getNumReplace(getNum(nwGrid.GetValue(SPR_FRGHT_AMNT, row)));

    ucostVATEX = getNumReplace(getNum((ucostVATIN / (1 + vatrate)).toFixed(5)));
    //check if Unit cost is higher than the PR Amount
    let prUnitCost = getPRUnitCost();
    var recuser = $("#txtRecuser").val();

    //var prconso = crnwTR.find("td:eq(" + SPR_CONSOPRNO + ")").text();
    //var item = crnwTR.find("td:eq(" + SPR_ITEMCODE + ")").text();
    var prconso = nwGrid.GetValue(SPR_CONSOPRNO, row);
    var item = nwGrid.GetValue(SPR_ITEMCODE, row);

    jsonTmpx = jsonCanvassDtls.filter(i =>(i.recuser + i.prconso + i.itemCode) == recuser + prconso + item);
    if (jsonTmpx.length > 0 && jsonTmpx != undefined) {
        canvassUCost = getNumReplace(getNum(jsonTmpx[0]["ucostVATIN"]));
    }


    if (ucostVATIN > canvassUCost && jsonTmpx.length > 0) {
        MessageBox("PO Unit Cost (VATIN) should not be greater than the Canvassed Unit Cost.\n", Title, 'error');
        $(this).val(glbPOUnitCostVATIN);
        $('#txtPOUCostVATEX').val(glbPOUnitCostVATEX);
        ucostVATEX = glbPOUnitCostVATEX;
        ucostVATIN = glbPOUnitCostVATIN;
    } else if (ucostVATEX > prUnitCost) {
        MessageBox("PO Unit Cost is greater than the PR Unit Cost.\n", Title, 'info');
    }


    totalucostVATEX = ((ucostVATEX * qty) - discAmnt) + frghAmnt;
    //totalucostVATIN = ucostVATIN * qty;
    totalucostVATIN = ((ucostVATIN * qty) - discAmnt) + ((frghAmnt * vatrate) + frghAmnt);
    addvat = totalucostVATIN - totalucostVATEX;

    //addvat = totalucostVATEX * parseFloat(vatrate);
    grossamt = totalucostVATEX + addvat;

    $("#txtPOUCostVATEX").val(setNumReplace(ucostVATEX, 5));
    $("#txtPOUCostVATIN").val(setNumReplace(ucostVATIN, 5));
    $("#txtTotalPOAmtVATIN").val(setNumReplace(totalucostVATIN, 2));
    $("#txtTotalPOAmtVATEX").val(setNumReplace(totalucostVATEX, 2));

    $("#txtTotalDiscAmnt").val(setNumReplace(discAmnt, 5));
    $("#txtTotalFrgtAmnt").val(setNumReplace(frghAmnt, 5));

    $("#txtAddVAT").val(setNumReplace(addvat, 2));
    $("#txtGrossAmtVATIN").val(setNumReplace(grossamt, 2));

    DisplayAmounts(_crnwTR, ucostVATIN, ucostVATEX, totalucostVATEX);
    UseLastPOPrice(ucostVATEX, origVATEX);
});

$(document).on('change', '.txtLINUnitCostVATEX', function () {
    let ucostVATIN = 0.00000, totalucostVATIN = 0.00, totalucostVATEX = 0.00, addvat = 0.00, grossamt = 0.00, canvassUCost = 0.00000;
    let vatrate = getNumReplace(getNum($("#txtVATRate").val()));

    nwGrid = nwGridCon_Book.ActiveSheet;
    var row = nwGrid.GetSelectedIndexes().row;

    //let ucostVATEX = getNumReplace(getNum(crnwTR.find("td:eq(" + SPR_POUNITCOST_VATEX + ") input").val()));
    //let discAmnt = getNumReplace(getNum(crnwTR.find("td:eq(" + SPR_DISC_AMNT + ") input").val()));
    //let frghAmnt = getNumReplace(getNum(crnwTR.find("td:eq(" + SPR_FRGHT_AMNT + ") input").val()));
    let ucostVATEX = getNumReplace(getNum(nwGrid.GetValue(SPR_POUNITCOST_VATEX, row)));
    let discAmnt = getNumReplace(getNum(nwGrid.GetValue(SPR_DISC_AMNT, row)));
    let frghAmnt = getNumReplace(getNum(nwGrid.GetValue(SPR_FRGHT_AMNT, row)));

    let frgtAmntVATIN = getNumReplace(getNum(frghAmnt * (1 + parseFloat(vatrate)))).toFixed(5);
    let dscAmntVATIN = getNumReplace(getNum(discAmnt * (1 + parseFloat(vatrate)))).toFixed(5);
    ucostVATIN = getNumReplace(getNum((ucostVATEX * (1 + vatrate)).toFixed(5)));
    //check if Unit cost is higher than the PR Amount
    let prUnitCost = getPRUnitCost();

    var recuser = $("#txtRecuser").val();

    //var prconso = crnwTR.find("td:eq(" + SPR_CONSOPRNO + ")").text();
    //var item = crnwTR.find("td:eq(" + SPR_ITEMCODE + ")").text();
    var prconso = nwGrid.GetText(SPR_CONSOPRNO, row);
    var item = nwGrid.GetText(SPR_ITEMCODE, row);


    jsonTmpx = jsonCanvassDtls.filter(i =>(i.recuser + i.prconso + i.itemCode) == recuser + prconso + item);
    if (jsonTmpx.length > 0 && jsonTmpx != undefined) {
        canvassUCost = getNumReplace(getNum(jsonTmpx[0]["ucostVATEX"]));
    }
    if (ucostVATEX > canvassUCost && jsonTmpx.length > 0) {
        if (!isTrigger) {
            MessageBox("PO Unit Cost (VATEX) should not be greater than the Canvassed Unit Cost.\n", Title, 'error');
            $(this).val(setNumReplace(glbPOUnitCostVATEX, 5));
            $('#txtPOUCostVATIN').val(setNumReplace(glbPOUnitCostVATIN, 5));
            ucostVATIN = glbPOUnitCostVATIN;
            ucostVATEX = glbPOUnitCostVATEX;
        }
        isTrigger = false;


    } else if (ucostVATEX > prUnitCost) {
        if (!isTrigger) {
            MessageBox("PO Unit Cost is greater than the PR Unit Cost.\n", Title, 'info');
        }
        isTrigger = false;

    }







    let qty = getNumReplace($("#txtQtyPO").val());
    let origVATEX = getNumReplace($("#txtLastPOPrice").val());



    //totalucostVATIN = ucostVATIN * qty;
    totalucostVATIN = ((ucostVATIN * qty) - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN);
    totalucostVATEX = ((ucostVATEX * qty) - discAmnt) + frghAmnt;

    addvat = totalucostVATIN - totalucostVATEX;
    //addvat = totalucostVATEX * parseFloat(vatrate);
    //grossamt = totalucostVATEX + addvat;


    grossamt = ((ucostVATIN * qty) - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN)

    $("#txtPOUCostVATIN").val(setNumReplace(ucostVATIN, 5));
    $("#txtPOUCostVATEX").val(setNumReplace(ucostVATEX, 5));
    $("#txtTotalPOAmtVATIN").val(setNumReplace(totalucostVATIN, 2));
    $("#txtTotalPOAmtVATEX").val(setNumReplace(totalucostVATEX, 2))
    $("#txtAddVAT").val(setNumReplace(addvat, 2));
    $("#txtGrossAmtVATIN").val(setNumReplace(grossamt, 2));


    $("#txtTotalDiscAmnt").val(setNumReplace(discAmnt, 5));
    $("#txtTotalFrgtAmnt").val(setNumReplace(frghAmnt, 5));

    DisplayAmounts(_crnwTR, ucostVATIN, ucostVATEX, totalucostVATEX);
    UseLastPOPrice(ucostVATEX, origVATEX);
    


});

$(document).on('change', '#txtPOUCostVATEX', function () {
    let ucostVATIN = 0.00000, totalucostVATIN = 0.00, totalucostVATEX = 0.00, addvat = 0.00, grossamt = 0.00, canvassUCost = 0.00000;
    let vatrate = getNumReplace(getNum($("#txtVATRate").val()));
    let ucostVATEX = getNumReplace($(this).val());

    nwGrid = nwGridCon_Book.ActiveSheet;
    var row = nwGrid.GetSelectedIndexes().row;

    //let discAmnt = getNumReplace(getNum(crnwTR.find("td:eq(" + SPR_DISC_AMNT + ") input").val()));
    //let frghAmnt = getNumReplace(getNum(crnwTR.find("td:eq(" + SPR_FRGHT_AMNT + ") input").val()));
    let discAmnt = getNumReplace(getNum(nwGrid.GetValue(SPR_DISC_AMNT - 1, row)));
    let frghAmnt = getNumReplace(getNum(nwGrid.GetValue(SPR_FRGHT_AMNT - 1, row)));
    

    ucostVATIN = getNumReplace(getNum((ucostVATEX * (1 + vatrate)).toFixed(5)));
    //check if Unit cost is higher than the PR Amount
    let prUnitCost = getPRUnitCost();

    var recuser = $("#txtRecuser").val();
    //var prconso = crnwTR.find("td:eq(" + SPR_CONSOPRNO + ")").text();
    //var item = crnwTR.find("td:eq(" + SPR_ITEMCODE + ")").text
    var prconso = nwGrid.GetText(SPR_CONSOPRNO, row);
    var item = nwGrid.GetText(SPR_ITEMCODE, row);


    jsonTmpx = jsonCanvassDtls.filter(i =>(i.recuser + i.prconso + i.itemCode) == recuser + prconso + item);
    if (jsonTmpx.length > 0 && jsonTmpx != undefined) {
        canvassUCost = getNumReplace(getNum(jsonTmpx[0]["ucostVATEX"]));
    }
    if (ucostVATEX > canvassUCost && jsonTmpx.length > 0) {
        if (!isTrigger) {
            MessageBox("PO Unit Cost (VATEX) should not be greater than the Canvassed Unit Cost.\n", Title, 'error');
            $(this).val(setNumReplace(glbPOUnitCostVATEX, 5));
            $('#txtPOUCostVATIN').val(setNumReplace(glbPOUnitCostVATIN, 5));
            ucostVATIN = glbPOUnitCostVATIN;
            ucostVATEX = glbPOUnitCostVATEX;
        }
        isTrigger = false;


    } else if (ucostVATEX > prUnitCost) {
        if (!isTrigger) {
            MessageBox("PO Unit Cost is greater than the PR Unit Cost.\n", Title, 'info');
        }
        isTrigger = false;

    }

    let frgtAmntVATIN = getNumReplace(getNum(frghAmnt * (1 + parseFloat(vatrate)))).toFixed(5);
    let dscAmntVATIN = getNumReplace(getNum(discAmnt * (1 + parseFloat(vatrate)))).toFixed(5);


    let qty = getNumReplace($("#txtQtyPO").val());
    let origVATEX = getNumReplace($("#txtLastPOPrice").val());

   
    //totalucostVATEX = ucostVATEX * qty;
    totalucostVATIN = ((ucostVATIN * qty) - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN);
    totalucostVATEX = ((ucostVATEX * qty) - discAmnt) + frghAmnt;
    addvat = totalucostVATIN - totalucostVATEX;
    //addvat = totalucostVATEX * parseFloat(vatrate);
    //grossamt = totalucostVATEX + addvat;
    grossamt = ((ucostVATIN * qty) - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN)
    $("#txtPOUCostVATIN").val(setNumReplace(ucostVATIN, 5));
    $("#txtTotalPOAmtVATIN").val(setNumReplace(totalucostVATIN, 2));
    $("#txtTotalPOAmtVATEX").val(setNumReplace(totalucostVATEX, 2))
    $("#txtAddVAT").val(setNumReplace(addvat, 2));
    $("#txtGrossAmtVATIN").val(setNumReplace(grossamt, 2));

    $("#txtTotalDiscAmnt").val(setNumReplace(discAmnt, 5));
    $("#txtTotalFrgtAmnt").val(setNumReplace(frghAmnt, 5));

    DisplayAmounts(_crnwTR, ucostVATIN, ucostVATEX, totalucostVATEX);
    UseLastPOPrice(ucostVATEX, origVATEX);
});

function UseLastPOPrice(vatex, origvatex) {

    var row = nwGrid.GetSelectedIndexes().row;
    //var row = $('#cboxRowNumber').val();

    if (vatex == 0 || origvatex == 0) {
        $("#chkUseLastPO").prop("checked", false);
        //_crnwTR.find("td:eq(" + SPR_USELASTPOPRICE + ") input").prop('checked', false)
        nwGridCon_Book.ActiveSheet.SetValue(SPR_USELASTPOPRICE - 1, row, "0");
    } else if (vatex != origvatex) {
        $("#chkUseLastPO").prop("checked", false);
        //_crnwTR.find("td:eq(" + SPR_USELASTPOPRICE + ") input").prop('checked', false)
        nwGridCon_Book.ActiveSheet.SetValue(SPR_USELASTPOPRICE - 1, row, "0");
    }
    else {
        $("#chkUseLastPO").prop("checked", true);
        //_crnwTR.find("td:eq(" + SPR_USELASTPOPRICE + ") input").prop('checked', true)
        nwGridCon_Book.ActiveSheet.SetValue(SPR_USELASTPOPRICE - 1, row, "1");
    }
}

var qtypo_orig = '';
$(document).on("focus", ".numPOQty", function (e) {
    isQtyClick = true;
    //_crnwTR = crnwTR;

    nwGrid = nwGridCon_Book.ActiveSheet;
    var row = nwGrid.GetSelectedIndexes().row;

    //qtypo_orig = getNumReplace(getNum(_crnwTR.find("td:eq(" + SPR_POQTY + ") input").val()));
    qtypo_orig = getNumReplace(getNum(nwGrid.GetValue(SPR_POQTY - 1, row)));
});








$(document).on("change", ".numPOQty", function (e) {
    //let prconso = _crnwTR.find("td:eq(" + SPR_CONSOPRNO + ")").text();
    //let itemcode = _crnwTR.find("td:eq(" + SPR_ITEMCODE + ")").text();
    //let vendor = _crnwTR.find("td:eq(" + SPR_VENDORCODE + ")").text();
    //let ordertype = _crnwTR.find("td:eq(" + SPR_ORDERTYPECODE + ")").text();
    //let vat = _crnwTR.find("td:eq(" + SPR_VATCODE + ")").text();
    //let ewt = _crnwTR.find("td:eq(" + SPR_EWTCODE + ")").text();
    //let origPOQty = getNumReplace(_crnwTR.find("td:eq(" + SPR_ORIGPOQTY + ")").text());
    //let prQty = getNumReplace(getNum(_crnwTR.find("td:eq(" + SPR_PRQTY + ")").text()));
    //let prTag = _crnwTR.find("td:eq(" + SPR_ITEM_TYPE + ")").text();

    //let poQty = getNumReplace(getNum(_crnwTR.find('td:eq(' + SPR_POQTY + ') input').val()));
    //let factor = getNumReplace(_crnwTR.find("td:eq(" + SPR_FACTOR + ")").text());
    //let ucostVATEX = getNumReplace(getNum(_crnwTR.find('td:eq(' + SPR_POUNITCOST_VATEX + ') input').val()));
    //let discAmntM = getNumReplace(getNum(_crnwTR.find('td:eq(' + SPR_DISC_AMNT + ') input').val()));
    //let frgtAmntM = getNumReplace(getNum(_crnwTR.find('td:eq(' + SPR_FRGHT_AMNT + ') input').val()));

    nwGrid = nwGridCon_Book.ActiveSheet;
    var row = nwGrid.GetSelectedIndexes().row;

    let prconso = nwGrid.GetText(SPR_CONSOPRNO, row);
    let itemcode = nwGrid.GetText(SPR_ITEMCODE, row);
    let vendor = nwGrid.GetText(SPR_VENDORCODE, row);
    let ordertype = nwGrid.GetText(SPR_ORDERTYPECODE, row);
    let vat = nwGrid.GetText(SPR_VATCODE, row);
    let ewt = nwGrid.GetText(SPR_EWTCODE, row);
    let origPOQty = nwGrid.GetText(SPR_ORIGPOQTY, row);
    let prQty = nwGrid.GetText(SPR_PRQTY, row);
    let prTag = nwGrid.GetText(SPR_ITEM_TYPE, row);

    let poQty = nwGrid.GetValue(SPR_POQTY, row);
    let factor = nwGrid.GetValue(SPR_FACTOR, row);
    let ucostVATEX = nwGrid.GetValue(SPR_POUNITCOST_VATEX, row);
    let discAmntM = nwGrid.GetValue(SPR_DISC_AMNT, row);
    let frgtAmntM = nwGrid.GetValue(SPR_FRGHT_AMNT, row);


    let vatrate = getNumReplace(getNum($("#txtVATRate").val()));
    let ucostVATIN = 0.00000, totalucostVATIN = 0.00, totalucostVATEX = 0.00, addvat = 0.00, grossamt = 0.00;

    let discAmnt = 0;

    $('#Message_No').css('display', '');
    $('#Message_Cancel').css('display', '');

    //nwGrid = $("#nwGrid .tblGridBody");

    //let xxRow = $(`#nwGrid-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${SPR_ALT_LINEID})`).text();
    let xxRow = nwGrid.GetText(SPR_ALT_LINEID, row);

    //var len = nwGrid.find('tr').length;
    var len = nwGrid.GetMaxRow();

    let poQty_l = 0;
    for (var x = 0; x <= len - 1; x++) {
        //let prcono_l = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_CONSOPRNO + ')').text();
        //let itemcode_l = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_ITEMCODE + ')').text();
        //let origPOQty_l = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_ORIGPOQTY + ')').text();

        let prcono_l = nwGrid.GetText(SPR_CONSOPRNO, x);
        let itemcode_l = nwGrid.GetText(SPR_ITEMCODE, x);
        let origPOQty_l = nwGrid.GetText(SPR_ORIGPOQTY, x);

        //discAmnt += getNumReplace(getNum(_crnwTR.find('td:eq(' + SPR_DISC_AMNT + ') input').val()));
        discAmnt += getNumReplace(getNum(nwGrid.GetValue(SPR_DISC_AMNT, x)));

        if (itemcode == itemcode_l && prconso == prcono_l && origPOQty == origPOQty_l) {
            //poQty_l += getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_POQTY + ') input').val());
            poQty_l += getNumReplace(nwGrid.GetValue(SPR_POQTY, x));
        }
    }

    if (poQty_l > prQty) {
        setTimeout(() => {
            MessageBox("Cannot proceed. PO Quantity should not exceed PR Quantity before PO.", Title, 'error')

            //_crnwTR.find('td:eq(' + SPR_POQTY + ') input').val(setNumReplace(qtypo_orig, 5));
            nwGrid.SetValue(SPR_POQTY, row, setNumReplace(qtypo_orig, 5));
        }, 50)

        return;
    }
    else {
        if (poQty != origPOQty) {
            if (discAmnt > 0) {
                //clear discount and freight amount
                if (isFROMApplPO) {
                    MessageBox("Quantity for PO Changed, Discount Amount (VATEX) and Freight Amount (VATEX) will be cleared", Title, 'question');
                    $('td[data-label="Discount Amount (VATEX)"] input').html('');
                    $('td[data-label="Freight Amount (VATEX)"] input').html('');
                    isFROMApplPO = false;
                }

            }

        }


        if (vendor != "" && ordertype != "" && vat != "" && ewt != "") {
            $("#txtQtyPO").val(setNumReplace(poQty, 5));

            ucostVATIN = ucostVATEX * (1 + vatrate);


            //totalucostVATIN = ucostVATIN * poQty;
            totalucostVATIN = ((ucostVATIN * qty) - discAmnt) + ((frghAmnt * vatrate) + frghAmnt);
            //totalucostVATEX = ucostVATEX * poQty;
            totalucostVATEX = ((poQty * ucostVATEX) - discAmntM) + frgtAmntM;
            addvat = totalucostVATIN - totalucostVATEX;
            //addvat = totalucostVATEX * parseFloat(vatrate);
            grossamt = totalucostVATEX + addvat;

            $("#txtPOUCostVATEX").val(setNumReplace(ucostVATEX, 5));
            $("#txtPOUCostVATIN").val(setNumReplace(ucostVATIN, 5));
            $("#txtTotalPOAmtVATIN").val(setNumReplace(totalucostVATIN, 2));
            $("#txtTotalPOAmtVATEX").val(setNumReplace(totalucostVATEX, 2))
            $("#txtAddVAT").val(setNumReplace(addvat, 2));
            $("#txtGrossAmtVATIN").val(setNumReplace(grossamt, 2));


            $("#txtTotalDiscAmnt").val(setNumReplace(discAmntM, 5));
            $("#txtTotalFrgtAmnt").val(setNumReplace(frgtAmntM, 5));


            DisplayAmounts(_crnwTR, ucostVATIN, ucostVATEX, totalucostVATEX);
            nwParameter_Add("origPOQty", origPOQty);
            nwParameter_Add("poQty", poQty);
            nwParameter_Add("prTag", prTag);
            nwParameter_Add("hasJson", HasJsonTempDelDtl(prconso, itemcode, vendor, xxRow) >= 0 ? true : false);




            distributeQty4PO(this, prconso, itemcode, vendor, xxRow, poQty)



        } else {
            distributeQty4PO(this, prconso, itemcode, vendor, xxRow, poQty)

        }
    }
});


function distributeQty4PO(_this, prconso, itemcode, vendor, xxRow, poQty) {

    let xID = (prconso + itemcode + vendor + xxRow)

    let xJSON = jsonDelDtls.filter(i =>(i.prConso + i.itemCode + i.vendor + i.mainRowNum) == xID);
    jsonDelDtls = jsonDelDtls.filter(i =>(i.prConso + i.itemCode + i.vendor + i.mainRowNum) != (xID));


    let xtmpJsonDelDtls = [];

    let xVal = poQty;
    for (var i in xJSON) {
        let OrigprQtyB4PO = xJSON[i].OrigprQtyB4PO;
        let index = Object.keys(xJSON).indexOf(i);
        if (xVal > OrigprQtyB4PO && index > 0) {
            if (parseFloat(xtmpJsonDelDtls[i - 1].qtyPo) >= xVal) {
                xJSON[i].qtyPo = setNumReplace(0, 5) + "";
                xJSON[i].remQty4PO = setNumReplace((xJSON[i].prQtyB4PO - 0), 5) + "";
                xtmpJsonDelDtls.push(xJSON[i]);
            } else {
                let xAmnt = xVal - xJSON[i].prQtyB4PO
                if (xAmnt < parseFloat(xtmpJsonDelDtls[i - 1].remQty4PO)) {
                    let nQtyPo = (parseFloat(xtmpJsonDelDtls[i - 1].qtyPo) + xAmnt);
                    let nRemQty4PO = (parseFloat(xtmpJsonDelDtls[i - 1].remQty4PO) - xAmnt);

                    xtmpJsonDelDtls[i - 1].qtyPo = setNumReplace(nQtyPo, 5) + "";
                    xtmpJsonDelDtls[i - 1].remQty4PO = setNumReplace(nRemQty4PO, 5) + "";
                } else {
                    xJSON[i].qtyPo = setNumReplace(xVal, 5) + "";
                    xJSON[i].remQty4PO = setNumReplace((parseFloat(xJSON[i].prQtyB4PO.replace(/,/g, "")) - xVal), 5) + "";
                    xtmpJsonDelDtls.push(xJSON[i]);
                }
            }
        } else {
            let prQtyB4PO = xJSON[i].prQtyB4PO;
            if (prQtyB4PO == "") {
                prQtyB4PO = "0";
            }
            if (xVal > prQtyB4PO) {



                xJSON[i].qtyPo = setNumReplace(prQtyB4PO, 5) + "";
                xJSON[i].remQty4PO = setNumReplace((parseFloat(prQtyB4PO.replace(/,/g, "")) - parseFloat(prQtyB4PO.replace(/,/g, ""))), 5) + "";
                xtmpJsonDelDtls.push(xJSON[i]);

                xVal -= parseFloat(prQtyB4PO);
            } else if (xVal == 0) {
                xJSON[i].qtyPo = setNumReplace(0, 5) + "";
                xJSON[i].remQty4PO = setNumReplace((parseFloat(xJSON[i].prQtyB4PO.replace(/,/g, "")) - 0), 5) + "";
                xtmpJsonDelDtls.push(xJSON[i]);
            } else {
                xJSON[i].qtyPo = setNumReplace(xVal, 5) + "";
                xJSON[i].remQty4PO = setNumReplace((parseFloat(xJSON[i].prQtyB4PO.replace(/,/g, "")) - xVal), 5) + "";
                xtmpJsonDelDtls.push(xJSON[i]);
                xVal = 0;
            }



        }
    }

    for (var z in xtmpJsonDelDtls) {
        jsonDelDtls.push(xtmpJsonDelDtls[z]);
    }
    $(_this).trigger('click');
    $(_this).trigger('focus');
}

function DisplayAmounts(row, vatin, vatex, totalvatex) {

    nwGrid = nwGridCon_Book.ActiveSheet;
    var row = nwGrid.GetSelectedIndexes().row;

    //row.find('td:eq(' + SPR_POUNITCOST_VATEX + ') input').val(setNumReplace(vatex, 5));
    nwGrid.SetValue(SPR_POUNITCOST_VATEX, row, setNumReplace(vatex, 5));

    let lwstQuoute = 0;
    let lwstQuouteVATIN = 0;
    if (jsonCanvassDtlsFiltered.length <= 0) {

        //row.find('td:eq(' + SPR_LWST_QUOTE_UC_VATEX + ')').text(setNumReplace(vatex, 5));
        //row.find('td:eq(' + SPR_LWST_QUOTE_UC_VATIN + ')').text(setNumReplace(vatin, 5));
        nwGrid.SetValue(SPR_LWST_QUOTE_UC_VATEX, row, setNumReplace(vatex, 5));
        nwGrid.SetValue(SPR_LWST_QUOTE_UC_VATIN, row, setNumReplace(vatin, 5));

        lwstQuoute = vatex;
        lwstQuouteVATIN = vatin;
    } else {
        //lwstQuoute = getNumReplace(getNum(row.find('td:eq(' + SPR_LWST_QUOTE_UC_VATEX + ')').text()));
        //lwstQuouteVATIN = getNumReplace(getNum(row.find('td:eq(' + SPR_LWST_QUOTE_UC_VATIN + ')').text()));
        lwstQuoute = getNumReplace(getNum(nwGrid.GetText(SPR_LWST_QUOTE_UC_VATEX, row)));
        lwstQuouteVATIN = getNumReplace(getNum(nwGrid.GetText(SPR_LWST_QUOTE_UC_VATIN, row)));
    }

    //let qtyForPO = getNumReplace(getNum(row.find('td:eq(' + SPR_POQTY + ') input').val()));
    let qtyForPO = getNumReplace(getNum(nwGrid.GetValue(SPR_POQTY, row)));

    //row.find('td:eq(' + SPR_PO_SAVEAMNT_VATEX + ')').text(setNumReplace(((lwstQuoute - vatex) * qtyForPO), 2)); //compute save amount
    //row.find('td:eq(' + SPR_PO_SAVEAMNT_VATIN + ')').text(setNumReplace(((lwstQuouteVATIN - vatin) * qtyForPO), 2)); //compute save amount
    nwGrid.SetValue(SPR_PO_SAVEAMNT_VATEX, row, setNumReplace(((lwstQuoute - vatex) * qtyForPO), 2));
    nwGrid.SetValue(SPR_PO_SAVEAMNT_VATIN, row, setNumReplace(((lwstQuouteVATIN - vatin) * qtyForPO), 2));

    //let frgtAmnt = getNumReplace(getNum(row.find('td:eq(' + SPR_FRGHT_AMNT + ') input').val()));
    //let dscAmnt = getNumReplace(getNum(row.find('td:eq(' + SPR_DISC_AMNT + ') input').val()));
    let frgtAmnt = nwGrid.GetValue(SPR_FRGHT_AMNT, row);
    let dscAmnt = nwGrid.GetValue(SPR_DISC_AMNT, row);

    //let vatrate = getNumReplace(getNum(row.find("td:eq(" + SPR_VATRATE + ")").text()));
    let vatrate = nwGrid.GetText(SPR_VATRATE, row);


    let frgtAmntVATIN = getNumReplace(getNum(frgtAmnt * (1 + parseFloat(vatrate)))).toFixed(5);
    let dscAmntVATIN = getNumReplace(getNum(dscAmnt * (1 + parseFloat(vatrate)))).toFixed(5);

    grossamt = (qtyForPO * vatin - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN);

    //row.find('td:eq(' + SPR_POTOTALAMT_VATEX + ')').text(setNumReplace(totalvatex, 2));
    //row.find('td:eq(' + SPR_POTOTALAMT_VATIN + ')').text(setNumReplace(grossamt, 2));
    //row.find('td:eq(' + SPR_POUNITCOSTVATIN + ') input').val(setNumReplace(vatin, 5));
    nwGrid.SetText(SPR_POTOTALAMT_VATEX, row, setNumReplace(totalvatex, 2));
    nwGrid.SetText(SPR_POTOTALAMT_VATIN, row, setNumReplace(grossamt, 2));
    nwGrid.SetValue(SPR_POUNITCOSTVATIN, row, setNumReplace(vatin, 5));
}

function jsonfilter_DD_Exclude(json, consoID) {
    return json.filter(i => i.prConso + i.itemCode + i.prLineID + i.rowno + i.vendor + i.mainRowNum != consoID);
}

function HasJsonTempDelDtl(prconso, itemcode, vendor, xxRowNum) {
    return jsonDelDtls.findIndex(i => (i.prConso + i.itemCode + i.vendor + i.mainRowNum) == prconso + itemcode + vendor + xxRowNum)

}

function FilterJsonDelDtl(prconso, itemcode, vendor, xxRow) {
    return jsonDelDtls.filter(i => (i.prConso + i.itemCode + i.vendor + i.mainRowNum) != prconso + itemcode + vendor + xxRow)
}

function StoreInJson_DD(prconso, itemcode, vendor, xxRow) {
    jsonDelDtls = FilterJsonDelDtl(prconso, itemcode, vendor, xxRow);
    for (var i = 0; i < jsonDelDtlsFiltered.length; i++) {
        var store = {};
        store["delDate"] = jsonDelDtlsFiltered[i].delDate;
        store["reqDelDate"] = jsonDelDtlsFiltered[i].reqDelDate;
        store["qtyPo"] = jsonDelDtlsFiltered[i].qtyPo;
        store["poUOMDesc"] = jsonDelDtlsFiltered[i].poUOMDesc;
        store["reqUOMDesc"] = jsonDelDtlsFiltered[i].reqUOMDesc;
        store["prQtyB4PO"] = jsonDelDtlsFiltered[i].prQtyB4PO;
        store["remQty4PO"] = jsonDelDtlsFiltered[i].remQty4PO;
        store["excessQty"] = jsonDelDtlsFiltered[i].excessQty;
        store["location"] = jsonDelDtlsFiltered[i].location;
        store["locDesc"] = jsonDelDtlsFiltered[i].locDesc;
        store["subLocation"] = jsonDelDtlsFiltered[i].subLocation;
        store["subLocDesc"] = jsonDelDtlsFiltered[i].subLocDesc;
        store["DeliveryAddress"] = jsonDelDtlsFiltered[i].DeliveryAddress;
        store["DelRecipient"] = jsonDelDtlsFiltered[i].DelRecipient;
        store["prDocno"] = jsonDelDtlsFiltered[i].prDocno;
        store["prConso"] = jsonDelDtlsFiltered[i].prConso;
        store["itemCode"] = jsonDelDtlsFiltered[i].itemCode;
        store["prLineID"] = jsonDelDtlsFiltered[i].prLineID;
        store["lineID"] = jsonDelDtlsFiltered[i].lineID;
        store["rowno"] = jsonDelDtlsFiltered[i].rowno;
        store["poUOMCode"] = jsonDelDtlsFiltered[i].poUOMCode;
        store["reqUOMCode"] = jsonDelDtlsFiltered[i].reqUOMCode;
        store["vendor"] = jsonDelDtlsFiltered[i].vendor;
        store["OrigqtyPo"] = jsonDelDtlsFiltered[i].OrigqtyPo;
        store["OrigprQtyB4PO"] = jsonDelDtlsFiltered[i].OrigprQtyB4PO;
        store["prTag"] = jsonDelDtlsFiltered[i].prTag;
        store["mainRowNum"] = jsonDelDtlsFiltered[i].mainRowNum;
        jsonDelDtls.push(store);
    }
}

function FilterJsonDelDtl_tmp(prconso, itemcode, rownum) {
    return jsonDelDtls.filter(i => (i.prConso + i.itemCode + i.prLineID) != prconso + itemcode + rownum)
}
function removeDDDtls(index) {

    jsonDelDtls = jsonDelDtls.filter(col => col["prLineID"] != index);

}



function StoreUpdatedJson_DD(consoID) {
    let tmpJson = jsonfilter_DD_Exclude(jsonDelDtls, consoID);
    if (tmpJson.length > 0) {
        jsonDelDtls = jsonfilter_DD_Exclude(jsonDelDtls, consoID);
        var store = {};

        //nwGrid = $("#nwGridDDCon .tblGridBody tbody ");
        //var length = nwGrid.find("tr").length;
        nwGrid = nwGridCon_Book.ActiveSheet;
        var length = nwGrid.GetMaxRow();
        var row = nwGrid.GetSelectedIndexes().row;

        for (var i = 0; i < length; i++) {
            store = {};

            //var prconso = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_PRCONSO + ')').text();
            //var item = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_ITEMCODE + ')').text();
            //var prlineid = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_PRLINEID + ')').text();
            //var ddrowno = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_ROWNO + ')').text();
            //var vendor = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_VENDOR + ')').text();
            //var mainrowno = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_MAINROWNO + ')').text

            var prconso = nwGrid.GetText(SPR_DD_PRCONSO, i);
            var item = nwGrid.GetText(SPR_DD_ITEMCODE, i);
            var prlineid = nwGrid.GetText(SPR_DD_PRLINEID, i);
            var ddrowno = nwGrid.GetText(SPR_DD_ROWNO, i);
            var vendor = nwGrid.GetText(SPR_DD_VENDOR, i);
            var mainrowno = nwGrid.GetText(SPR_DD_MAINROWNO, i);

            if ((prconso + item + prlineid + ddrowno + vendor + mainrowno) == consoID) {
                //store["delDate"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_DELIVERYDATE + ') input').val();
                //store["reqDelDate"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_REQDELDATE + ')').text();
                //store["qtyPo"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_QTYPO + ') input').val();
                //store["poUOMDesc"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_UOM + ')').text();
                //store["reqUOMDesc"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_REQUOM + ')').text();
                //store["prQtyB4PO"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_PRQTY + ')').text();
                //store["remQty4PO"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_REMQTY + ')').text();
                //store["excessQty"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_EXQTY + ')').text();
                //store["location"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_LOCATION + ')').text();
                //store["locDesc"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_LOCDESC + ')').text();
                //store["subLocation"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_SUBLOC + ')').text();
                //store["subLocDesc"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_SUBLOCDESC + ')').text();
                //store["DeliveryAddress"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_DELADD + ')').text();
                //store["prDocno"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_PRDOCNO + ')').text();
                //store["prConso"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_PRCONSO + ')').text();
                //store["itemCode"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_ITEMCODE + ')').text();
                //store["prLineID"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_PRLINEID + ')').text();
                //store["lineID"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_LINEID + ')').text();
                //store["rowno"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_ROWNO + ')').text();
                //store["poUOMCode"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_POUOMCODE + ')').text();
                //store["reqUOMCode"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_REQUOMCODE + ')').text();
                //store["vendor"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_VENDOR + ')').text();
                //store["OrigqtyPo"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_QTYPO_ORIG + ')').text();
                //store["OrigprQtyB4PO"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_QTYPR_ORIG + ')').text();
                //store["prTag"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_PRTAG + ')').text();
                //store["DelRecipient"] = nwGrid.find('tr:eq(' + i + ') td:eq(' + SPR_DD_DELRECEIPT + ')').text();
                //store["mainRowNum"] = $(`#nwGrid-nwData tr:eq(${_crnwTR.index()})`).find(`td:eq(${SPR_ALT_LINEID})`).text();

                store["delDate"] = nwGrid.GetValue(SPR_DD_DELIVERYDATE, i);
                store["reqDelDate"] = nwGrid.GetText(SPR_DD_REQDELDATE, i);
                store["qtyPo"] = nwGrid.GetValue(SPR_DD_QTYPO, i);
                store["poUOMDesc"] = nwGrid.GetText(SPR_DD_UOM, i);
                store["reqUOMDesc"] = nwGrid.GetText(SPR_DD_REQUOM, i);
                store["prQtyB4PO"] = nwGrid.GetText(SPR_DD_PRQTY, i);
                store["remQty4PO"] = nwGrid.GetText(SPR_DD_REMQTY, i);
                store["excessQty"] = nwGrid.GetText(SPR_DD_EXQTY, i);
                store["location"] = nwGrid.GetText(SPR_DD_LOCATION, i);
                store["locDesc"] = nwGrid.GetText(SPR_DD_LOCDESC, i);
                store["subLocation"] = nwGrid.GetText(SPR_DD_SUBLOC, i);
                store["subLocDesc"] = nwGrid.GetText(SPR_DD_SUBLOCDESC, i);
                store["DeliveryAddress"] = nwGrid.GetText(SPR_DD_DELADD, i);
                store["prDocno"] = nwGrid.GetText(SPR_DD_PRDOCNO, i);
                store["prConso"] = nwGrid.GetText(SPR_DD_PRCONSO, i);
                store["itemCode"] = nwGrid.GetText(SPR_DD_ITEMCODE, i);
                store["prLineID"] = nwGrid.GetText(SPR_DD_PRLINEID, i);
                store["lineID"] = nwGrid.GetText(SPR_DD_LINEID, i);
                store["rowno"] = nwGrid.GetText(SPR_DD_ROWNO, i);
                store["poUOMCode"] = nwGrid.GetText(SPR_DD_POUOMCODE, i);
                store["reqUOMCode"] = nwGrid.GetText(SPR_DD_REQUOMCODE, i);
                store["vendor"] = nwGrid.GetText(SPR_DD_VENDOR, i);
                store["OrigqtyPo"] = nwGrid.GetText(SPR_DD_QTYPO_ORIG, i);
                store["OrigprQtyB4PO"] = nwGrid.GetText(SPR_DD_QTYPR_ORIG, i);
                store["prTag"] = nwGrid.GetText(SPR_DD_PRTAG, i);
                store["DelRecipient"] = nwGrid.GetText(SPR_DD_DELRECEIPT, i);
                store["mainRowNum"] = nwGrid.GetText(SPR_ALT_LINEID, i);
                jsonDelDtls.push(store);



            }



        }
    }


}

function nwJsonUpdateValue_DD(json, xRow) {
    var results = [];
    //nwGrid = $("#nwGridDDCon .tblGridBody tbody ");

    nwGrid = nwGridDD_Book.ActiveSheet;

    //var prconso = $('#nwGridDDCon .tblGridBody tr:nth-child(' + (xRow + 1) + ') td:nth-child(' + (SPR_DD_PRCONSO + 1) + ')').text();
    //var itemcode = $('#nwGridDDCon .tblGridBody tr:nth-child(' + (xRow + 1) + ') td:nth-child(' + (SPR_DD_ITEMCODE + 1) + ')').text();
    //var prLineID = $('#nwGridDDCon .tblGridBody tr:nth-child(' + (xRow + 1) + ') td:nth-child(' + (SPR_DD_PRLINEID + 1) + ')').text();
    //var ddRowno = $('#nwGridDDCon .tblGridBody tr:nth-child(' + (xRow + 1) + ') td:nth-child(' + (SPR_DD_ROWNO + 1) + ')').text();
    //var vendor = $('#nwGridDDCon .tblGridBody tr:nth-child(' + (xRow + 1) + ') td:nth-child(' + (SPR_DD_VENDOR + 1) + ')').text();

    var prconso = nwGrid.GetText(SPR_DD_PRCONSO, (xRow + 1));
    var itemcode = nwGrid.GetText(SPR_DD_ITEMCODE, (xRow + 1));
    var prLineID = nwGrid.GetText(SPR_DD_PRLINEID, (xRow + 1));
    var ddRowno = nwGrid.GetText(SPR_DD_ROWNO, (xRow + 1));
    var vendor = nwGrid.GetText(SPR_DD_VENDOR, (xRow + 1));
    
    try {
        for (var j = 0; j <= json.length; j++) {
            if (json[j]['prConso'] == prconso && json[j]['itemCode'] == itemcode && json[j]['prLineID'] == prLineID && json[j]['rowno'] == ddRowno && json[j]['vendor'] == vendor) {

                //json[j]['delDate'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_DELIVERYDATE + ') input').val();
                //json[j]['reqDelDate'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_REQDELDATE + ')').text();
                //json[j]['qtyPo'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_QTYPO + ') input').val();
                //json[j]['poUOMDesc'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_UOM + ')').text();
                //json[j]['reqUOMDesc'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_REQUOM + ')').text();
                //json[j]['prQtyB4PO'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_PRQTY + ')').text();
                //json[j]['remQty4PO'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_REMQTY + ')').text();
                //json[j]['excessQty'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_EXQTY + ')').text();
                //json[j]['location'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_LOCATION + ')').text();
                //json[j]['locDesc'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_LOCDESC + ')').text();
                //json[j]['subLocation'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_SUBLOC + ')').text();
                //json[j]['subLocDesc'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_SUBLOCDESC + ')').text();
                //json[j]['prDocno'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_PRDOCNO + ')').text();
                //json[j]['prConso'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_PRCONSO + ')').text();
                //json[j]['itemCode'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_ITEMCODE + ')').text();
                //json[j]['prLineID'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_PRLINEID + ')').text();
                //json[j]['lineID'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_LINEID + ')').text();
                //json[j]['rowno'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_ROWNO + ')').text();
                //json[j]['poUOMCode'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_POUOMCODE + ')').text();
                //json[j]['reqUOMCode'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_REQUOMCODE + ')').text();
                //json[j]['vendor'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_VENDOR + ')').text();
                //json[j]['OrigqtyPo'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_QTYPO_ORI, + ')').text();
                //json[j]['OrigprQtyB4PO'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_QTYPR_ORIG + ')').text();
                //json[j]['prTag'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_PRTAG + ')').text();
                //json[j]['DelRecipient'] = nwGrid.find('tr:eq(' + xRow + ') td:eq(' + SPR_DD_DELRECEIPT + ')').text();

                json[j]['delDate'] = nwGrid.GetValue(SPR_DD_DELIVERYDATE, (xRow + 1));
                json[j]['reqDelDate'] = nwGrid.GetText(SPR_DD_REQDELDATE, (xRow + 1));
                json[j]['qtyPo'] = nwGrid.GetValue(SPR_DD_QTYPO, (xRow + 1));
                json[j]['poUOMDesc'] = nwGrid.GetText(SPR_DD_UOM, (xRow + 1));
                json[j]['reqUOMDesc'] = nwGrid.GetText(SPR_DD_REQUOM, (xRow + 1));
                json[j]['prQtyB4PO'] = nwGrid.GetText(SPR_DD_PRQTY, (xRow + 1));
                json[j]['remQty4PO'] = nwGrid.GetText(SPR_DD_REMQTY, (xRow + 1));
                json[j]['excessQty'] = nwGrid.GetText(SPR_DD_EXQTY, (xRow + 1));
                json[j]['location'] = nwGrid.GetText(SPR_DD_LOCATION, (xRow + 1));
                json[j]['locDesc'] = nwGrid.GetText(SPR_DD_LOCDESC, (xRow + 1));
                json[j]['subLocation'] = nwGrid.GetText(SPR_DD_SUBLOC, (xRow + 1));
                json[j]['subLocDesc'] = nwGrid.GetText(SPR_DD_SUBLOCDESC, (xRow + 1));
                json[j]['prDocno'] = nwGrid.GetText(SPR_DD_PRDOCNO, (xRow + 1));
                json[j]['prConso'] = nwGrid.GetText(SPR_DD_PRCONSO, (xRow + 1));
                json[j]['itemCode'] = nwGrid.GetText(SPR_DD_ITEMCODE, (xRow + 1));
                json[j]['prLineID'] = nwGrid.GetText(SPR_DD_PRLINEID, (xRow + 1));
                json[j]['lineID'] = nwGrid.GetText(SPR_DD_LINEID, (xRow + 1));
                json[j]['rowno'] = nwGrid.GetText(SPR_DD_ROWNO, (xRow + 1));
                json[j]['poUOMCode'] = nwGrid.GetText(SPR_DD_POUOMCODE, (xRow + 1));
                json[j]['reqUOMCode'] = nwGrid.GetText(SPR_DD_REQUOMCODE, (xRow + 1));
                json[j]['vendor'] = nwGrid.GetText(SPR_DD_VENDOR, (xRow + 1));
                json[j]['OrigqtyPo'] = nwGrid.GetText(SPR_DD_QTYPO_ORI, (xRow + 1));
                json[j]['OrigprQtyB4PO'] = nwGrid.GetText(SPR_DD_QTYPR_ORIG, (xRow + 1));
                json[j]['prTag'] = nwGrid.GetText(SPR_DD_PRTAG, (xRow + 1));
                json[j]['DelRecipient'] = nwGrid.GetText(SPR_DD_DELRECEIPT, (xRow + 1));
                results = json[j];

            }
        }
    } catch (err) { }

    return results;
}

var dd_currRow = "";
$(document).on("click", "#nwGridDDCon", function (e) {
    dd_currRow = crnwTR;
});

function defaultonload(code, description) {
    $('div.atlContainer[nwtype="PRConsolidationNo"] div.innertext').append(GenerateLookupListDataHTML(code, description));
}


$(document).on("click", "#btnApplySingleDelDate_DD", function (e) {
    //nwLoading_Start("xbtnApplySingleDelDate_DD", crLoadingHTML);
    //nwPopupForm_ShowModal("ApplySingleDelDate");
    //$("#dtpDeliveryDate_ASDD").val("");
    //nwLoading_End('xbtnApplySingleDelDate_DD');
    nwLoading_Start("xApplySingleDelDate_Item", crLoadingHTML);
    nwPopupForm_ShowModal("ApplySingleDelDate_Item");
    $("#dtpDeliveryDate_ASDDI").val("");
    $(".atlContainer.atl_Item").find(".innertext .spantext").remove();
    jsonSingleDelDtls = [];
    jsonSingleDelDtlsFiltered = [];
    nwLoading_End('xApplySingleDelDate_Item');
});

$(document).on("click", "#btnApplySingleDelDate", function (e) {
    nwLoading_Start("xApplySingleDelDate_Item", crLoadingHTML);
    nwPopupForm_ShowModal("ApplySingleDelDate_Item");
    $("#dtpDeliveryDate_ASDDI").val("");
    $(".atlContainer.atl_Item").find(".innertext .spantext").remove();
    jsonSingleDelDtls = [];
    jsonSingleDelDtlsFiltered = [];
    nwLoading_End('xApplySingleDelDate_Item');
});

$(document).on("click", "#btnApplyOneVendor", function (e) {
    nwLoading_Start("xbtnApplyOneVendor", crLoadingHTML);
    nwPopupForm_ShowModal("ApplyOneVendor");
    ClearApplyToOneVendor();
    nwLoading_End('xbtnApplyOneVendor');
});

function ClearApplyToOneVendor() {
    $("#idvallugVendor_AOV").val("");
    $("#descvallugVendor_AOV").val("");
    $("#txtVendorTIN_AOV").val("");
    $("#txtVendorAddress").val("");
    $("#idvallugOrderType_AOV").val("");
    $("#descvallugOrderType_AOV").val("");
}

var delDate_ASDD = '';
$(document).on("focus", "#dtpDeliveryDate_ASDD", function () {
    delDate_ASDD = $(this).val();
});

$(document).on('change', '#dtpDeliveryDate_ASDD', function () {
    var delDate = $(this).val();
    var currDate = $("#txtServerdate").val();

    var xbool2 = nwDateMaskCheck($(this).val());

    if (Date.parse(delDate) < Date.parse(currDate)) {
        MessageBox("Cannot proceed. Delivery date should not be earlier than the current server date.\n", "Apply Single Delivery Date", "error");
        $(this).val(delDate_ASDD);
        return false;
    }

    if (xbool2 == false) {
        $(this).val("");
        $(this).focus();
    }
});

$(document).on('click', '#btnProcess_ASDD', function () {
    var delDate_ASDD = $("#dtpDeliveryDate_ASDD").val();

    if (delDate_ASDD == '') {
        MessageBox("Cannot be processed. Delivery Date is required.", "Apply Single Delivery Date", "error");
        return;
    }

    //nwGrid = $("#nwGridDDCon .tblGridBody");
    //var len = nwGrid.find('tr').length;

    nwGrid = nwGridDD_Book.ActiveSheet;
    var len = nwGrid.GetMaxRow();
    var row = nwGrid.GetSelectedIndexes().row;

    for (var x = 0; x < len; x++) {
        //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_DELIVERYDATE + ') input').val(delDate_ASDD);
        nwGrid.SetValue(SPR_DD_DELIVERYDATE, x, delDate_ASDD);

        //let prconso = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRCONSO + ')').text();
        //let itemCode = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_ITEMCODE + ')').text();
        //let prLineID = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRLINEID + ')').text();
        //let ddRowno = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_ROWNO + ')').text();
        //let vendor = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_VENDOR + ')').text();
        //let xxRow = $(`#nwGrid-nwData tr:eq(${_crnwTR.index()})`).find(`td:eq(${SPR_ALT_LINEID})`).text();

        let prconso = nwGrid.GetValue(SPR_DD_PRCONSO, x);
        let itemCode = nwGrid.GetValue(SPR_DD_ITEMCODE, x);
        let prLineID = nwGrid.GetValue(SPR_DD_PRLINEID, x);
        let ddRowno = nwGrid.GetValue(SPR_DD_ROWNO, x);
        let vendor = nwGrid.GetValue(SPR_DD_VENDOR, x);

        let xxRow = nwGridDD_Book.ActiveSheet.GetText(SPR_ALT_LINEID, x);

        StoreUpdatedJson_DD(prconso + itemCode + prLineID + ddRowno + vendor + (xxRow));
        nwJsonUpdateValue_DD(jsonDelDtls, x);
    }
    nwPopupForm_HideModal('ApplySingleDelDate');
});

var delDate_ASDDI = '';
$(document).on("focus", "#dtpDeliveryDate_ASDDI", function () {
    delDate_ASDDI = $(this).val();
});

$(document).on('change', '#dtpDeliveryDate_ASDDI', function () {
    var delDate = $(this).val();
    var currDate = $("#txtServerdate").val();

    var xbool2 = nwDateMaskCheck($(this).val());

    if (Date.parse(delDate) < Date.parse(currDate)) {
        MessageBox("Cannot proceed. Delivery date should not be earlier than the current server date.\n", "Apply Single Delivery Date", "error");
        $(this).val(delDate_ASDDI);
        return false;
    }

    if (xbool2 == false) {
        $(this).val("");
        $(this).focus();
    }
});

$(document).on('click', '#btnProcess_ASDDI', function () {
    var delDate_ASDDI = $("#dtpDeliveryDate_ASDDI").val();

    if (delDate_ASDDI == "") {
        MessageBox("Cannot be processed. Delivery Date is required.\n", "Apply Single Delivery Date", "error");
        return;
    }
    else {


        nwLoading_Start("xbtnProcess_ASDDI", crLoadingHTML);


        SaveJsonSingleDelDtls();
        ApplyDeliveryDtls();
        nwPopupForm_HideModal('ApplySingleDelDate_Item');





        nwLoading_End('xbtnProcess_ASDDI');

    }
});



$(document).on('click', '.chkapprove', function () {
    var isCheckAll = true;
    nwGrid = $("#nwGridProcessCon .tblGridBody");
    var count = nwGrid.find("tr").length;

    for (var i = 0; i < count; i++) {
        if (nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + (SPR_P_SELECT) + ") input").is(":checked") == false) {
            isCheckAll = false;
        }
    }
    if (isCheckAll == true) {
        $(".nwCheckBoxTot.nwCheckBoxTot1.chkapprove").prop("checked", true);
    }

});



$(document).on("click", ".chkExQty", function (e) {

    _crnwTR = crnwTR;

    let isChecked = false;

    let uom = _crnwTR.find("td:eq(" + SPR_UOM + ")").text();
    let origuom = _crnwTR.find("td:eq(" + SPR_ORIGUOM + ")").text();
    let prconso = _crnwTR.find("td:eq(" + SPR_CONSOPRNO + ")").text();
    let itemcode = _crnwTR.find("td:eq(" + SPR_ITEMCODE + ")").text();
    let vendor = _crnwTR.find("td:eq(" + SPR_VENDORCODE + ")").text();
    let origPOQty = getNumReplace(getNum(_crnwTR.find("td:eq(" + SPR_ORIGPOQTY + ")").text()));
    let prQty = getNumReplace(getNum(_crnwTR.find("td:eq(" + SPR_PRQTY + ")").text()));
    let poQty = getNumReplace(getNum(_crnwTR.find('td:eq(' + SPR_POQTY + ') input').val()));
    let factor = getNumReplace(_crnwTR.find("td:eq(" + SPR_FACTOR + ")").text());
    let ucostVATEX = getNumReplace(getNum(_crnwTR.find('td:eq(' + SPR_POUNITCOST_VATEX + ') input').val()));
    let vatrate = getNumReplace(getNum($("#txtVATRate").val()));
    let discAmnt = getNumReplace(getNum(_crnwTR.find("td:eq(" + SPR_DISC_AMNT + ") input").val()));
    let frghAmnt = getNumReplace(getNum(_crnwTR.find("td:eq(" + SPR_FRGHT_AMNT + ") input").val()));
    let ucostVATIN = 0.00000, totalucostVATIN = 0.00, totalucostVATEX = 0.00, addvat = 0.00, grossamt = 0.00;
    let newPoQty = 0;

    if ($(this).is(":checked")) {
        if (uom != origuom) {

            isChecked = true;
            _crnwTR.find("td:eq(" + SPR_POQTY + ") input").val(setNumReplace((origPOQty / factor), 5));
            $("#txtQtyPO").val(setNumReplace((origPOQty / factor), 5));

            ucostVATIN = ucostVATEX * (1 + vatrate);
            totalucostVATIN = ucostVATIN * (origPOQty / factor);
            totalucostVATEX = ucostVATEX * (origPOQty / factor);
            addvat = totalucostVATIN - totalucostVATEX;
            //addvat = totalucostVATEX * parseFloat(vatrate);
            grossamt = totalucostVATEX + addvat;

            $("#txtPOUCostVATEX").val(setNumReplace(ucostVATEX, 5));
            $("#txtPOUCostVATIN").val(setNumReplace(ucostVATIN, 5));
            $("#txtTotalPOAmtVATIN").val(setNumReplace(totalucostVATIN, 2));
            $("#txtTotalPOAmtVATEX").val(setNumReplace(totalucostVATEX, 2))
            $("#txtAddVAT").val(setNumReplace(addvat, 2));
            $("#txtGrossAmtVATIN").val(setNumReplace(grossamt, 2));


            $("#txtTotalDiscAmnt").val(setNumReplace(discAmnt, 5));
            $("#txtTotalFrgtAmnt").val(setNumReplace(frghAmnt, 5));

            DisplayAmounts(_crnwTR, ucostVATIN, ucostVATEX, totalucostVATEX);
            nwParameter_Add("origPOQty", origPOQty);


        }
    }
    else {
        if (uom != origuom) {
            _crnwTR.find("td:eq(" + SPR_POQTY + ") input").val(setNumReplace(prQty, 5));
            $("#txtQtyPO").val(setNumReplace(prQty, 5));

            ucostVATIN = ucostVATEX * (1 + vatrate);
            //totalucostVATIN = ucostVATIN * prQty;
            totalucostVATIN = ((ucostVATIN * qty) - discAmnt) + ((frghAmnt * vatrate) + frghAmnt);
            //totalucostVATEX = ucostVATEX * prQty;
            totalucostVATEX = ((ucostVATEX * qty) - discAmnt) + frghAmnt;
            addvat = totalucostVATIN - totalucostVATEX;
            //addvat = totalucostVATEX * parseFloat(vatrate);
            grossamt = totalucostVATEX + addvat;

            $("#txtPOUCostVATEX").val(setNumReplace(ucostVATEX, 5));
            $("#txtPOUCostVATIN").val(setNumReplace(ucostVATIN, 5));
            $("#txtTotalPOAmtVATIN").val(setNumReplace(totalucostVATIN, 2));
            $("#txtTotalPOAmtVATEX").val(setNumReplace(totalucostVATEX, 2))
            $("#txtAddVAT").val(setNumReplace(addvat, 2));
            $("#txtGrossAmtVATIN").val(setNumReplace(grossamt, 2));

            $("#txtTotalDiscAmnt").val(setNumReplace(discAmnt, 5));
            $("#txtTotalFrgtAmnt").val(setNumReplace(frghAmnt, 5));

            DisplayAmounts(_crnwTR, ucostVATIN, ucostVATEX, totalucostVATEX);
            nwParameter_Add("origPOQty", prQty);
        }
    }
    let xxRow = $(`#nwGrid-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${SPR_ALT_LINEID})`).text();
    nwLoading_Start("actLoadDelDtls", crLoadingHTML);
    nwParameter_Add("poQty", poQty);
    //nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls));
    nwParameter_Add("hasJson", HasJsonTempDelDtl(prconso, itemcode, vendor, xxRow) >= 0 ? true : false);
    //nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls.filter(i =>(i.prConso + i.itemCode + i.vendor) == prconso + itemcode + vendor)));
    if (isChecked) {
        let newData = jsonDelDtls.filter(i =>(i.mainRowNum) == (xxRow) && (i.excessQty) == '');
        jsonDelDtls = jsonDelDtls.filter(i =>(i.mainRowNum) != (xxRow));

        for (let i = 0; i < newData.length; i++) {
            jsonDelDtls.push(newData[i]);
        }
    }

    let xJSON = jsonDelDtls.filter(i =>(i.prConso + i.itemCode + i.vendor + i.mainRowNum) == (prconso + itemcode + vendor + xxRow));
    nwParameter_Add("jsonDelDtls", xJSON.length > 0 ? JSON.stringify(xJSON) : "");
    func_ActionDriven("actLoadDelDtls", false);

});

function ClearPOItemAndCostDtls() {
    $("#txtItem").val("");
    $("#idvallugUOM").val("");
    $("#descvallugUOM").val("");
    $("#idvallugCurrency").val("");
    $("#descvallugCurrency").val("");
    $("#idvallugOrderType").val("");
    $("#descvallugOrderType").val("");
    $("#txtVendor").val("");
    $("#txtVATDesc").val("");
    $("#txtLastPOPrice").val("");
    $("#txtApprvDate").val("");
    $("#txtQtyPO").val("");
    $("#txtPOUCostVATEX").val("");
    $("#txtPOUCostVATIN").val("");
    $("#txtTotalPOAmtVATIN").val("");
    $("#txtTotalPOAmtVATEX").val("");
    $("#txtTotalDiscAmnt").val("");
    $("#txtTotalFrgtAmnt").val("");

    $("#txtAddVAT").val("");
    $("#txtGrossAmtVATIN").val("");
    $("#chkExcQty").prop("checked", false);
    $("#chkUseLastPO").prop("checked", false);
}

function LoadSubGrid(prconso,prdocno, itemcode, uom, ordertypecode, ordertypedesc, vendorname, vat, vatrate, isclick) {

    _crnwTR = $('#cboxRowNumber').val();

    $("#txtItem").val(getDataOfGrid('nwGridCon', '', SPR_ITEMDESC - 1, _crnwTR));
    $("#idvallugUOM").val(getDataOfGrid('nwGridCon', '', SPR_UOM - 1, _crnwTR));
    $("#descvallugUOM").val(getDataOfGrid('nwGridCon', '', SPR_UOMDESC - 1, _crnwTR));
    $("#idvallugCurrency").val(getDataOfGrid('nwGridCon', '', SPR_CURRENCY - 1, _crnwTR));
    $("#descvallugCurrency").val(getDataOfGrid('nwGridCon', '', SPR_CURRDESC - 1, _crnwTR));



    //var excQty = crnwTR.find("td:eq(" + SPR_EXQTY + ")").is(":checked");

    var excQty = nwGridCon_Book.ActiveSheet.GetValue(SPR_EXQTY - 1, _crnwTR); // $(`#nwGrid-nwData tr:eq(${_crnwTR})`).find(`td:eq(${SPR_EXQTY})`).is(":checked");


    if (excQty == true) {
        $("#chkExcQty").prop("checked", true);
    }
    else {
        $("#chkExcQty").prop("checked", false);
    }



    //let useLastPoPrice = $(`#nwGrid-nwData tr:eq(${_crnwTR.index()})`).find(`td:eq(${SPR_USELASTPOPRICE}) input`).is(":checked") ? "1" : "0"; //getNum(getDataOfGrid('nwGrid', '', SPR_USELASTPOPRICE, crnwTR.index()));
    let useLastPoPrice = nwGridCon_Book.ActiveSheet.GetValue(SPR_USELASTPOPRICE - 1, _crnwTR);

    //let isCanvass = $(`#nwGrid-nwData tr:eq(${_crnwTR.index()})`).find(`td:eq(${SPR_CANVASSTAG})`).text()
    let isCanvass = nwGridCon_Book.ActiveSheet.GetText(SPR_CANVASSTAG - 1, _crnwTR);

    let poQty = getNumReplace(getNum(getDataOfGrid('nwGridCon', 'input', SPR_POQTY - 1, _crnwTR)));
    let poVATEX = getNumReplace(getNum(getDataOfGrid('nwGridCon', 'input', SPR_POUNITCOST_VATEX - 1, _crnwTR)));
    let origPOVATEX = getNumReplace(getNum(getDataOfGrid('nwGridCon', '', SPR_LASTPOPRICE - 1, _crnwTR)));
    let approvalDateLastPO = getDataOfGrid('nwGridCon', '', SPR_LASTPOAPPRVDATE - 1, _crnwTR);

    let poVATIN = getNumReplace(getNum(getDataOfGrid('nwGridCon', 'input', SPR_POUNITCOSTVATIN - 1, _crnwTR)));
    let vendor = getDataOfGrid('nwGridCon', '', SPR_VENDORCODE - 1, _crnwTR);

    let frgtAmnt = getNumReplace(getNum(getDataOfGrid('nwGridCon', 'input', SPR_FRGHT_AMNT - 1, _crnwTR)));
    let dscAmnt = getNumReplace(getNum(getDataOfGrid('nwGridCon', 'input', SPR_DISC_AMNT - 1, _crnwTR)));

    let frgtAmntVATIN = getNumReplace(getNum(frgtAmnt * (1 + parseFloat(vatrate)))).toFixed(5);
    let dscAmntVATIN = getNumReplace(getNum(dscAmnt * (1 + parseFloat(vatrate)))).toFixed(5);

    let totalVATEX = 0, totalVATIN = 0, addVAT = 0, grossAmt = 0;

    if (useLastPoPrice == "1" && isCanvass != "1") {
        $("#chkUseLastPO").prop("checked", true);
        poVATEX = origPOVATEX;
        poVATIN = getNumReplace(getNum(((poVATEX * vatrate) + poVATEX).toFixed(5)));
        totalVATEX = ((poQty * poVATEX) - dscAmnt) + frgtAmnt;
        //totalVATIN = poQty * poVATIN;
        totalVATIN = ((poQty * poVATIN) - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN);
        addVAT = totalVATIN - totalVATEX;
        //addVAT = totalVATEX * parseFloat(vatrate);
        //grossAmt = totalVATEX + addVAT;

        grossamt = (poQty * poVATIN - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN);
    }
    else {
        $("#chkUseLastPO").prop("checked", false);
        poVATIN = (poVATEX * vatrate) + poVATEX;
        totalVATEX = ((poQty * poVATEX) - dscAmnt) + frgtAmnt;
        totalVATIN = ((poQty * poVATIN) - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN);
        addVAT = totalVATIN - totalVATEX;
        //addVAT = totalVATEX * parseFloat(vatrate);
        //grossAmt = totalVATEX + addVAT;
        grossamt = (poQty * poVATIN - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN);


        $('#txtApprvDate').val("");
        //$(`#nwGrid-nwData tr:eq(${_crnwTR.index()})`).find(`td:eq(${SPR_USELASTPOPRICE}) input`).prop('checked', false);
        nwGridCon_Book.ActiveSheet.SetText(SPR_CANVASSTAG - 1, _crnwTR, '0');
        

    }
    $("#idvallugOrderType").val(ordertypecode);
    $("#descvallugOrderType").val(ordertypedesc);
    $("#txtVendor").val(vendorname);
    $("#txtVATDesc").val(vat);
    $("#txtVATRate").val(vatrate);
    $("#txtQtyPO").val(getDataOfGrid('nwGridCon', 'input', SPR_POQTY - 1, _crnwTR));



    //let cdtag = crnwTR.find("td:eq(" + SPR_CANVASSTAG + ")").text();
    let cdtag = getDataOfGrid('nwGridCon', '', SPR_CANVASSTAG - 1, _crnwTR);
    if (cdtag == "1") {
        if (origPOVATEX <= 0) {
            $("#txtLastPOPrice").val('');
        } else {
            $('#txtApprvDate').val(approvalDateLastPO);
            $("#txtLastPOPrice").val(setNumReplace(origPOVATEX, 5));
        }
        if (nwDocno != "") {
            $("#txtPOUCostVATEX").enable(false);
            $("#txtPOUCostVATIN").enable(false);
            $("#chkUseLastPO").enable(false);

        } else {
            $("#txtPOUCostVATEX").enable(true);
            $("#txtPOUCostVATIN").enable(true);
        }
        $("#txtPOUCostVATEX").val(setNumReplace(poVATEX, 5));
        $("#txtPOUCostVATIN").val(setNumReplace(poVATIN, 5));
        $("#txtTotalPOAmtVATIN").val(setNumReplace(totalVATIN, 2));
        $("#txtTotalPOAmtVATEX").val(setNumReplace(totalVATEX, 2));

        $("#txtTotalDiscAmnt").val(setNumReplace(dscAmnt, 5));
        $("#txtTotalFrgtAmnt").val(setNumReplace(frgtAmnt, 5));

        $("#txtAddVAT").val(setNumReplace(addVAT, 2));
        $("#txtGrossAmtVATIN").val(setNumReplace(grossAmt, 2));
    }
    else {

        if (origPOVATEX <= 0) {
            $("#txtLastPOPrice").val('');
        } else {
            $('#txtApprvDate').val(approvalDateLastPO);
            $("#txtLastPOPrice").val(setNumReplace(origPOVATEX, 5));
        }


        if (nwDocno != "") {
            $("#txtPOUCostVATEX").enable(false);
            $("#txtPOUCostVATIN").enable(false);
            $("#chkUseLastPO").enable(false);

        } else {
            $("#txtPOUCostVATEX").enable(true);
            $("#txtPOUCostVATIN").enable(true);
        }
        $("#txtPOUCostVATEX").val(setNumReplace(poVATEX, 5));
        $("#txtPOUCostVATIN").val(setNumReplace(poVATIN, 5));
        $("#txtTotalPOAmtVATIN").val(setNumReplace(totalVATIN, 2));
        $("#txtTotalPOAmtVATEX").val(setNumReplace(totalVATEX, 2));

        $("#txtTotalDiscAmnt").val(setNumReplace(dscAmnt, 5));
        $("#txtTotalFrgtAmnt").val(setNumReplace(frgtAmnt, 5));

        $("#txtAddVAT").val(setNumReplace(addVAT, 2));
        $("#txtGrossAmtVATIN").val(setNumReplace(grossAmt, 2));
    }
    //RJL 10/02/2020 Enhancement
    //$("#txtLastPOPrice").val(setNumReplace(origPOVATEX, 5));
    //$("#txtPOUCostVATEX").val(setNumReplace(poVATEX, 5));
    //$("#txtPOUCostVATIN").val(setNumReplace(poVATIN, 5));
    //$("#txtTotalPOAmtVATIN").val(setNumReplace(totalVATIN, 2));
    //$("#txtTotalPOAmtVATEX").val(setNumReplace(totalVATEX, 2));
    //$("#txtAddVAT").val(setNumReplace(addVAT, 2));
    //$("#txtGrossAmtVATIN").val(setNumReplace(grossAmt, 2));


    //let xxRow = crnwTR.index() + 1;
    //$(`#nwGrid-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${SPR_ALT_LINEID})`).text();
    let xxRow = nwGridCon_Book.ActiveSheet.GetText(SPR_ALT_LINEID - 1, _crnwTR);
    

    loadPOPriceHistory(itemcode);
    loadRefReqDetails(prconso, itemcode);
    loadChrgnDtls(prconso, itemcode, uom);
    loadDelvryDtls(prconso,prdocno, itemcode, vendor, xxRow);
    isTrigger = true;
    $('#txtPOUCostVATEX').trigger('change');
    $('#txtPOUCostVATEX').trigger('focusout');

    //cust_GetPara();
    //nwParameter_Add("itemCode", itemcode);
    //nwParameter_Add("prConso", prconso);
    //nwParameter_Add("uom", uom);
    ////nwParameter_Add("origUOM", crnwTR.find("td:eq(" + SPR_ORIGUOM + ")").text());
    ////nwParameter_Add("poQty", crnwTR.find("td:eq(" + SPR_POQTY + ") input").val());
    ////nwParameter_Add("origPOQty", crnwTR.find("td:eq(" + SPR_ORIGPOQTY + ")").text());
    //nwParameter_Add("origUOM", getDataOfGrid('nwGrid', '', SPR_ORIGUOM, crnwTR.index()));
    //nwParameter_Add("poQty", getDataOfGrid('nwGrid', 'input', SPR_POQTY, crnwTR.index()));
    //nwParameter_Add("origPOQty", getDataOfGrid('nwGrid', '', SPR_ORIGPOQTY, crnwTR.index()));
    //nwParameter_Add("currRow", crnwTR.index());
    ////nwParameter_Add("lineID", crnwTR.find("td:eq(" + SPR_LINEID + ")").text());
    //nwParameter_Add("lineID", getDataOfGrid('nwGrid', '', SPR_LINEID, crnwTR.index()));
    //nwParameter_Add("isNewData", isNewData);
    //nwParameter_Add("isclick", isclick);
    //nwParameter_Add("vendor", vendor);
    //nwParameter_Add("jsonDelDtlsx", JSON.stringify(jsonDelDtls));
    //nwParameter_Add("hasJson", HasJsonTempDelDtl(prconso, itemcode, vendor) >= 0 ? true : false);
    //nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls.filter(i =>(i.prConso + i.itemCode + i.vendor) == prconso + itemcode + vendor)));
    //func_ActionDriven("actLoadSubGrid", false);
}



function jsonUpdatePoProceHist(itemCode, oldItemCode, json) {
    let xjson = JSON.parse(json);
    let tmpjsonPOPriceHist = jsonPOPriceHist.filter(e => e["itemCode"] != oldItemCode);
    if (tmpjsonPOPriceHist.length > 0) {
        jsonPOPriceHist = tmpjsonPOPriceHist.push(xjson[0]);
    } else {
        jsonPOPriceHist = xjson;
    }
}


function jsonUpdateRefReqDetails(itemCode, oldItemCode, prconso, json) {
    let xjson = JSON.parse(json);
    let tmpjsonRefReqDetails = jsonRefReqDetails.filter(e => e["itemCode"] != oldItemCode && e["consoPr"] != prconso);
    if (tmpjsonRefReqDetails.length > 0) {
        jsonRefReqDetails = tmpjsonRefReqDetails.push(xjson[0]);
    } else {
        jsonRefReqDetails = xjson;
    }

}

function jsonUpdateChrngDetails(prconso, itemcode, oldItemCode, uom, json) {
    let xjson = JSON.parse(json);
    let tmpjsonChrngDetails = jsonChrngDetails.filter(e => e["consoPR"] != prconso && e["itmCode"] != oldItemCode && e["uomCode"] != uom);
    if (tmpjsonChrngDetails.length > 0) {
        jsonChrngDetails = tmpjsonChrngDetails.push(xjson[0]);
    } else {
        jsonChrngDetails = xjson;
    }

}



function jsonUpdateDelvryDtls(prconso, itemcode, oldItemCode, vendor, json) {
    let xjson = JSON.parse(json);

    let tmpjsonDelDtls = jsonDelDtls.filter(e => e["itemCode"] != oldItemCode && e["prConso"] != prconso);
    if (tmpjsonDelDtls.length > 0) {
        jsonDelDtls = tmpjsonDelDtls.push(xjson[0]);
    } else {
        jsonDelDtls = xjson;
    }



}

function loadDelvryDtls(prconso, prdocno, itemcode, vendor, xxRow) {
    let tmpjsonDelDtls = jsonDelDtls.filter(e => e["itemCode"] == itemcode && e["prConso"] == prconso && e["prDocno"] == prdocno && e["mainRowNum"] == xxRow);
    nwGridDD_Book.ActiveSheet.RowCount = 0;

    if (tmpjsonDelDtls.length > 0) {
        nwGridDD_Book.ActiveSheet.RowCount = tmpjsonDelDtls.length;

        for (let index = 0; index < tmpjsonDelDtls.length; index++) {
            let value = tmpjsonDelDtls[index];

            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_DELIVERYDATE - 1, index, value["delDate"]);
            if (vendor.length > 0) value["vendor"] = vendor;
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_REQDELDATE - 1, index, value["reqDelDate"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_QTYPO - 1, index, value["qtyPo"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_UOM - 1, index, value["poUOMDesc"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_REQUOM - 1, index, value["reqUOMDesc"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_PRQTY - 1, index, value["prQtyB4PO"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_REMQTY - 1, index, value["remQty4PO"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_EXQTY - 1, index, value["excessQty"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_LOCATION - 1, index, value["location"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_LOCDESC - 1, index, value["locDesc"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_SUBLOC - 1, index, value["subLocation"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_SUBLOCDESC - 1, index, value["subLocDesc"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_DELADD - 1, index, value["DeliveryAddress"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_DELRECEIPT - 1, index, value["DelRecipient"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_PRDOCNO - 1, index, value["prDocno"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_PRCONSO - 1, index, value["prConso"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_ITEMCODE - 1, index, value["itemCode"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_PRLINEID - 1, index, value["prLineID"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_LINEID - 1, index, value["lineID"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_ROWNO - 1, index, value["rowno"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_POUOMCODE - 1, index, value["poUOMCode"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_REQUOMCODE - 1, index, value["reqUOMCode"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_VENDOR - 1, index, value["vendor"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_QTYPO_ORIG - 1, index, value["OrigqtyPo"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_QTYPR_ORIG - 1, index, value["OrigprQtyB4PO"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_PRTAG - 1, index, value["prTag"]);
            nwGridDD_Book.ActiveSheet.SetText(SPR_DD_MAINROWNO - 1, index, value["mainRowNum"]);
        }
    }
}


function loadPOPriceHistory(itemCode) {
    
    let tmpjsonPOPriceHist = jsonPOPriceHist.filter(e => e["itemCode"] == itemCode);    
    nwGridPPH_Book.ActiveSheet.RowCount = 0;
    //nwGridPPH_Book.ActiveSheet.GetMaxRow();
    if (tmpjsonPOPriceHist.length > 0) {
        nwGridPPH_Book.ActiveSheet.RowCount = tmpjsonPOPriceHist.length;        
        for (let index = 0; index < tmpjsonPOPriceHist.length; index++) {
            let value = tmpjsonPOPriceHist[index];

            
            nwGridPPH_Book.ActiveSheet.SetText(SPR_PPH_PODATE - 1,index, value["poDate"]);
            nwGridPPH_Book.ActiveSheet.SetText(SPR_PPH_PODOCNO - 1,index,value["docno"]);
            nwGridPPH_Book.ActiveSheet.SetText(SPR_PPH_VENDORCODE - 1,index, value["supplier"]);
            nwGridPPH_Book.ActiveSheet.SetText(SPR_PPH_VENDORNAME - 1,index, value["vendorName"]);
            nwGridPPH_Book.ActiveSheet.SetText(SPR_PPH_POUOM,index - 1, value["Description"]);
            nwGridPPH_Book.ActiveSheet.SetText(SPR_PPH_QTY - 1,index, value["poQty"]);
            nwGridPPH_Book.ActiveSheet.SetText(SPR_PPH_CURRENCY - 1,index, value["currency"]);
            nwGridPPH_Book.ActiveSheet.SetText(SPR_PPH_ORDERTYPE - 1,index, value["orderType"]);
            nwGridPPH_Book.ActiveSheet.SetText(SPR_PPH_UNITPRICEVATEX - 1,index, value["ucostVATEX"]);
            nwGridPPH_Book.ActiveSheet.SetText(SPR_PPH_UNITPRICEVATIN - 1,index, value["ucostVATIN"]);
            nwGridPPH_Book.ActiveSheet.SetText(SPR_PPH_TOTALPOAMTVATEX - 1,index, value["totalVATEX"]);
            nwGridPPH_Book.ActiveSheet.SetText(SPR_PPH_TOTALPOAMTVATIN - 1,index, value["totalVATIN"]);
            nwGridPPH_Book.ActiveSheet.SetText(SPR_PPH_PRUOM - 1,index, value["prUOM"]);
            nwGridPPH_Book.ActiveSheet.SetText(SPR_PPH_CONUCOSTVATEX - 1,index, value["ucostVATEX"]);
        }
    }
}




function loadChrgnDtls(prconso, itemcode, uomcode) {
    let tmpjsonChrngDetails = jsonChrngDetails.filter(e => e["consoPR"] == prconso && e["itmCode"] == itemcode && e["uomCode"] == uomcode);
    nwGridBCD_Book.ActiveSheet.RowCount = 0;

    if (tmpjsonChrngDetails.length > 0) {
        nwGridBCD_Book.ActiveSheet.RowCount = tmpjsonChrngDetails.length;

        for (let index = 0; index < tmpjsonChrngDetails.length; index++) {
            let value = tmpjsonChrngDetails[index];

            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_SEG1CODE - 1, index, value["seg1"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_SEG1DESC - 1, index, value["seg1desc"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_SEG2CODE - 1, index, value["seg2"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_SEG2DESC - 1, index, value["seg2desc"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_SEG3CODE - 1, index, value["seg3"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_SEG3DESC - 1, index, value["seg3desc"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_SEG4CODE - 1, index, value["seg4"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_SEG4DESC - 1, index, value["seg4desc"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_SEG5CODE - 1, index, value["seg5"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_SEG5DESC - 1, index, value["seg5desc"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_SEG6CODE - 1, index, value["seg6"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_SEG6DESC - 1, index, value["seg6desc"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_IGTCODE - 1, index, value["igt"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_IGTDESC - 1, index, value["igtdesc"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_LEVEL - 1, index, value["level"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_LEVELCLASS - 1, index, value["lvlclass"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_ITEMCODE - 1, index, value["itemCode"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_ITEMDESC - 1, index, value["itemDesc"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_PRDOCNO - 1, index, value["prDocno"]);
            nwGridBCD_Book.ActiveSheet.SetText(SPR_BCD_REQNO - 1, index, value["reqNo"]);
        }
    }
}


function loadRefReqDetails(prconso, itemcode) {
    let tmpjsonRefReqDetails = jsonRefReqDetails.filter(e => e["itemCode"] == itemcode && e["consoPr"] == prconso);
    nwGridRRD_Book.ActiveSheet.RowCount = 0;

    if (tmpjsonRefReqDetails.length > 0) {
        nwGridRRD_Book.ActiveSheet.RowCount = tmpjsonRefReqDetails.length;

        for (let index = 0; index < tmpjsonRefReqDetails.length; index++) {
            let value = tmpjsonRefReqDetails[index];

            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_PRDOCNO - 1, index, value["prDocno"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_PRDATE - 1, index, value["prDate"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_PRUOM - 1, index, value["uom"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_PRQTY - 1, index, value["prQty"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_CURRENCY - 1, index, value["currency"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_PRUNITCOSTVATEX - 1, index, value["ucostVATEX"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_PRUNITCOSTVATIN - 1, index, value["ucostVATIN"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_TOTALPRAMTVATEX - 1, index, value["totalVATEX"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_TOTALPRAMTVATIN - 1, index, value["totalVATIN"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_REQNAME - 1, index, value["reqName"]);

            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_PODUEDATE - 1, index, value["poDueDate"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_REQDOCNO - 1, index, value["RefDono"]);

            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_REQSUBDATE - 1, index, value["reqSubDate"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_REQAPPRVDATE - 1, index, value["reqApprvDate"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_REQOBJECTIVE - 1, index, value["reqObjective"]);

            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_RSNREQ - 1, index, value["reason"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_LOCATIONCODE - 1, index, value["locForm"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_LOCATIONDESC - 1, index, value["locFormDesc"]);

            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_CCCODE - 1, index, value["costCenter"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_CCDESC - 1, index, value["ccDesc"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_PARTICULARS - 1, index, value["particular"]);
            nwGridRRD_Book.ActiveSheet.SetText(SPR_RRD_PRTAGGING - 1, index, value["prtag"]);

            
            //$(`#nwGridRRD table tbody tr:eq(${index}) td:eq(${SPR_RRD_VIEW_REQ_ENTRY})`).removeClass("btnGray").addClass("btnGreen");
            //$(`#nwGridRRD table tbody tr:eq(${index}) td:eq(${SPR_RRD_VIEW_REQ_ENTRY}) div center`).html('...');

        }
    }
}





function LoadPOItemAndDtls(prconso, itemcode, uom, uomDesc, ordertypecode, ordertypedesc, vendorname, vat, vatrate, prTag, prDocno) {
    let vendor = crnwTR.find("td:eq(" + SPR_VENDORCODE + ")").text();


    $("#txtItem").val(crnwTR.find("td:eq(" + SPR_ITEMDESC + ")").text());
    $("#idvallugUOM").val(crnwTR.find("td:eq(" + SPR_UOM + ")").text());
    $("#descvallugUOM").val(crnwTR.find("td:eq(" + SPR_UOMDESC + ")").text());
    $("#idvallugCurrency").val(crnwTR.find("td:eq(" + SPR_CURRENCY + ")").text());
    $("#descvallugCurrency").val(crnwTR.find("td:eq(" + SPR_CURRDESC + ")").text());
    var excQty = crnwTR.find("td:eq(" + SPR_EXQTY + ")").is(":checked");
    if (excQty == true) {
        $("#chkExcQty").prop("checked", true);
    }
    else {
        $("#chkExcQty").prop("checked", false);
    }
    //$("#chkUseLastPO").prop("checked", true);
    $("#idvallugOrderType").val(ordertypecode);
    $("#descvallugOrderType").val(ordertypedesc);
    $("#txtVendor").val(vendorname);
    $("#txtVATDesc").val(vat);
    $("#txtVATRate").val(vatrate);
    $("#txtQtyPO").val(crnwTR.find("td:eq(" + SPR_POQTY + ") input").val());

    let origQtyPO = crnwTR.find("td:eq(" + SPR_ORIGPOQTY + ")").text().replace(/,/g, "");
    let factor = crnwTR.find("td:eq(" + SPR_FACTOR + ")").text().replace(/,/g, "");
    let qtyForPO = crnwTR.find("td:eq(" + SPR_POQTY + ") input").val().replace(/,/g, "");

    let origUOM = crnwTR.find("td:eq(" + SPR_ORIGUOM + ")").text();

    nwParameter_Add("itemCode", itemcode);
    nwParameter_Add("prConso", prconso);
    nwParameter_Add("vendor", vendor);
    nwParameter_Add("uom", uom);
    nwParameter_Add("origUOM", crnwTR.find("td:eq(" + SPR_ORIGUOM + ")").text());
    nwParameter_Add("txtQtyPO", qtyForPO);
    nwParameter_Add("ucostVATEX", crnwTR.find("td:eq(" + SPR_POUNITCOST_VATEX + ") input").val());
    nwParameter_Add("ucostVATIN", crnwTR.find("td:eq(" + SPR_POUNITCOSTVATIN + ") input").val());
    nwParameter_Add("totalVATEX", crnwTR.find("td:eq(" + SPR_POTOTALAMT_VATEX + ")").text());
    nwParameter_Add("totalVATIN", crnwTR.find("td:eq(" + SPR_POTOTALAMT_VATIN + ")").text());
    nwParameter_Add("currRow", crnwTR.index());
    nwParameter_Add("prTag", prTag);
    //nwParameter_Add("jsonDelDtls", JSON.stringify(jsonDelDtls));
    let isExcess = false;
    let xMainRowNum = 0;
    let currQtyForPO = parseFloat(qtyForPO);
    //let xxRow = crnwTR.index() + 1;
    let xxRow = $(`#nwGrid-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${SPR_ALT_LINEID})`).text();
    let tmpjsonxx = jsonDelDtls.filter(i =>(i.prConso + i.itemCode + i.vendor + i.mainRowNum + i.prDocno) == prconso + itemcode + vendor + xxRow + prDocno);
    if (tmpjsonxx.length > 0) {
        for (let i = 0; i < tmpjsonxx.length; i++) {
            tmpjsonxx[i]["poUOMCode"] = uom;
            tmpjsonxx[i]["poUOMDesc"] = uomDesc;
            
            //let val = tmpjsonxx[i].prQtyB4PO.replace(/,/g, "") % factor;
            let val = qtyForPO % factor;
            if (val == 0) {
                //let prQtyB4PO = (tmpjsonxx[i].prQtyB4PO / factor);
                let prQtyB4PO = (qtyForPO/ factor);
                if (qtyForPO >= 0) {
                    tmpjsonxx[i].prQtyB4PO = setNumReplace(prQtyB4PO, 5);
                    tmpjsonxx[i].qtyPo = setNumReplace(prQtyB4PO, 5);
                    tmpjsonxx[i].remQty4PO = setNumReplace(0, 5);

                    currQtyForPO -= parseFloat(prQtyB4PO);
                } else {
                    tmpjsonxx[i].prQtyB4PO = setNumReplace(prQtyB4PO, 5);
                    tmpjsonxx[i].qtyPo = setNumReplace(qtyForPO, 5);
                    tmpjsonxx[i].remQty4PO = setNumReplace(prQtyB4PO - qtyForPO, 5);

                    currQtyForPO = 0;
                }
            } else {
                isExcess = true;
                let prQtyB4PO = (tmpjsonxx[i].prQtyB4PO / factor);
                //let prQtyB4PO = (qtyForPO / factor);
                if (qtyForPO >= 0) {
                    tmpjsonxx[i].prQtyB4PO = setNumReplace(prQtyB4PO, 5);
                    tmpjsonxx[i].qtyPo = setNumReplace(prQtyB4PO, 5);
                    tmpjsonxx[i].remQty4PO = setNumReplace(0, 5);

                    currQtyForPO -= parseFloat(prQtyB4PO);
                } else {
                    tmpjsonxx[i].prQtyB4PO = setNumReplace(prQtyB4PO, 5);
                    tmpjsonxx[i].qtyPo = setNumReplace(qtyForPO, 5);
                    tmpjsonxx[i].remQty4PO = setNumReplace(prQtyB4PO - qtyForPO, 5);

                    currQtyForPO = 0;
                }
            }
        }
    }


    nwLoading_End('xUomTrigger')
    nwParameter_Add("hasJson", tmpjsonxx.length >= 0 ? true : false);
    nwParameter_Add("jsonDelDtls", JSON.stringify(tmpjsonxx));
    func_ActionDriven("actLoadDtlsbyUOM", false);
}

function enableRow(row, col) {
    $('#nwGrid .tblGridBody tr:nth-child(' + (parseInt(row) + 1) + ') td:nth-child(' + (parseInt(col) + 1) + ') input').enable(true)
}

function disableRow(row, col) {
    $('#nwGrid .tblGridBody tr:nth-child(' + (parseInt(row) + 1) + ') td:nth-child(' + (parseInt(col) + 1) + ') input').enable(false)
}

function DifferentUOM() {
    let uom = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_UOM + 1) + ')').text();
    let uomdesc = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_UOMDESC + 1) + ')').text();
    let origuom = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_ORIGUOM + 1) + ')').text();
    let origuomdesc = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_ORIGUOMDESC + 1) + ')').text();
    let factor = getNumReplace($('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_FACTOR + 1) + ')').text());
    let qtyPO = getNumReplace($('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_POQTY + 1) + ') input').val());
    let qtyPO_orig = getNumReplace($('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_ORIGPOQTY + 1) + ')').text());
    let prconso = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_CONSOPRNO + 1) + ')').text();
    let itemcode = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_ITEMCODE + 1) + ')').text();
    let vendor = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_VENDORCODE + 1) + ')').text();
    let baseQty = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_BASEQTY + 1) + ')').text();
    let excessQty = 0, qtyPOBase = 0;

    excessQty = qtyPO - qtyPO_orig;
    if (factor == 0) {
        factor = 1;
    }

    if (uom != origuom) {
        nwGrid = $("#nwGridDDCon .tblGridBody");
        var len = nwGrid.find('tr').length;
        //let hasExcess = false;

        for (var x = 0; x <= len - 1; x++) {
            //let dd_qtyPO = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPO_ORIG + ') input').val());
            //let dd_qtyPR = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPR_ORIG + ')').text());

            let dd_qtyPO = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPO_ORIG + ')').text());
            let dd_qtyPR = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPR_ORIG + ')').text());
            let new_ddQtyPO = 0, new_ddQtyPR = 0, new_ddQtyRem = 0, new_QtyExcess = 0;

            new_ddQtyPO = dd_qtyPO / factor;
            new_ddQtyPR = dd_qtyPR / factor;
            //new_ddQtyPO = qtyPO_orig / factor;
            //new_ddQtyPR = qtyPO_orig / factor;

            nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPO + ') input').val(setNumReplace(new_ddQtyPO, 5));
            nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRQTY + ')').text(setNumReplace(new_ddQtyPR, 5));
            nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_POUOMCODE + ')').text(uom);
            nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_UOM + ')').text(uomdesc);
            nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_LOCATION + ')').enable(false);
            nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_SUBLOC + ')').enable(false);
            nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_VENDOR + ')').text(vendor);
            //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_EXQTY + ')').text(setNumReplace(new_QtyExcess, 5));

            let prconso = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRCONSO + ')').text();
            let itemCode = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_ITEMCODE + ')').text();
            var prLineID = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRLINEID + ')').text();
            let ddRowno = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_ROWNO + ')').text();

            StoreUpdatedJson_DD(prconso + itemCode + prLineID + ddRowno + vendor + (_crnwTR.index() + 1));
            nwJsonUpdateValue_DD(jsonDelDtls, x);
        }

        if (excessQty > 0) {
            //nwGrid_AddRow("nwGridDDCon", 1);
            func_nwGrid_Insert('nwGridDDCon', 0, true);
            let excess_dd = excessQty * factor;
            $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_QTYPO + 1) + ') input').val(setNumReplace(excessQty, 5));
            $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_QTYPO + 1) + ') input').enable(false);
            $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_LOCATION + 1) + ')').enable(true);
            $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_SUBLOC + 1) + ')').enable(true);
            $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_UOM + 1) + ')').text(uomdesc);
            $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_POUOMCODE + 1) + ')').text(uom);
            $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_ROWNO + 1) + ')').text(len + 1);
            $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_LINEID + 1) + ')').text("0");
            $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_PRLINEID + 1) + ')').text(prLineID);
            $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_PRCONSO + 1) + ')').text(prconso);
            $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_ITEMCODE + 1) + ')').text(itemcode);
            $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_VENDOR + 1) + ')').text(vendor);
            $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_EXQTY + 1) + ')').text(setNumReplace(excess_dd, 5));

            let ddRowno = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_ROWNO + ')').text();

            StoreUpdatedJson_DD(prconso + itemCode + prLineID + ddRowno + vendor + (_crnwTR.index() + 1));
            nwJsonUpdateValue_DD(jsonDelDtls, x);
        }
    }
    else {
        $('#nwGridDDCon .tblGridBody tr td:nth-child(' + (SPR_DD_LOCATION + 1) + ')').enable(false);
        $('#nwGridDDCon .tblGridBody tr td:nth-child(' + (SPR_DD_SUBLOC + 1) + ')').enable(false);
        if (factor != 0) {
            nwGrid = $("#nwGridDDCon .tblGridBody");
            var len = nwGrid.find('tr').length;
            let dd_rowno = 0;
            for (var x = 0; x <= len - 1; x++) {
                //let dd_qtyPO = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPO_ORIG + ') input').val());
                //let dd_qtyPR = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPR_ORIG + ')').text());

                let dd_qtyPO = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPO_ORIG + ')').text());
                let dd_qtyPR = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPR_ORIG + ')').text());
                let dd_reqUOM = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_REQUOM + ')').text();
                let new_ddQtyPO = 0, new_ddQtyPR = 0, new_ddQtyRem = 0, new_QtyExcess = 0;

                if (dd_reqUOM != '') {
                    new_ddQtyPO = dd_qtyPO * factor;
                    new_ddQtyPR = dd_qtyPR * factor;

                    nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPO + ') input').val(setNumReplace(new_ddQtyPO, 5));
                    nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRQTY + ')').text(setNumReplace(new_ddQtyPR, 5));
                    nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_POUOMCODE + ')').text(uom);
                    nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_UOM + ')').text(uomdesc);
                    //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_EXQTY + ')').text(setNumReplace(new_QtyExcess, 5));

                    let prconso = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRCONSO + ')').text();
                    let itemCode = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_ITEMCODE + ')').text();
                    let prLineID = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRLINEID + ')').text();
                    let ddRowno = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_ROWNO + ')').text();
                    StoreUpdatedJson_DD(prconso + itemCode + prLineID + ddRowno + vendor + (_crnwTR.index() + 1));
                    nwJsonUpdateValue_DD(jsonDelDtls, x);
                }
                else {
                    dd_rowno = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_ROWNO + ')').text();
                }
            }
        }
    }
}

$(document).on("click", "#btnnwgRemarks", function (e) {
    ColorRemarks();
});

$(document).on("keypress", "#txtnwgRemarks", function (e) {
    if (e.which == 13) {
        ColorRemarks();
    }
});

function ColorRemarks() {
    if ($('#txtRemarksTag').val() == "nwGrid") {
        nwGrid = $("#nwGrid .tblGridBody tbody ");
        var length = nwGrid.find("tr").length;

        for (var i = 0; i < length; i++) {

            var text = nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") textarea").val();
            if (text != "") {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").removeClass("nwGButton");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").removeClass("btnBlue");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").addClass("btnGreen");
            }
            else {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").removeClass("btnGreen");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SPECNOTES + ") button").addClass("btnBlue");
            }
        }
    } else {
        nwGrid = $("#nwGridPayComponent .tblGridBody tbody ");
        var length = nwGrid.find("tr").length;
        for (var i = 0; i < length; i++) {

            var text = nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PC_REMARKS + ") textarea").val();
            if (text != "") {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PC_REMARKS + ") button").removeClass("nwGButton");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PC_REMARKS + ") button").removeClass("btnBlue");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PC_REMARKS + ") button").addClass("btnGreen");
            }
            else {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PC_REMARKS + ") button").removeClass("btnGreen");
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PC_REMARKS + ") button").addClass("btnBlue");
            }
        }
    }



    if (remarksConfig == "True") {
        $(".txtRefno").css({ "text-transform": "uppercase" });
        $("#txtnwgRemarks").css({ "text-transform": "uppercase" });
    }
    else {
        $(".txtRefno").css({ "text-transform": "none" });
        $("#txtnwgRemarks").css({ "text-transform": "none" });
    }
}

function ComputeDelDtlsByQtyPO() {
    let qtyPO = getNumReplace($('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_POQTY + 1) + ') input').val());
    let qtyPR = getNumReplace($('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_PRQTY + 1) + ')').text());
    let origQtyPO = getNumReplace($('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_ORIGPOQTY + 1) + ')').text());
    let factor = getNumReplace($('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_FACTOR + 1) + ')').text());
    let origuom = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_ORIGUOM + 1) + ')').text();
    let uom = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_UOM + 1) + ')').text();
    let uomdesc = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_UOMDESC + 1) + ')').text();
    let baseQty = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_BASEQTY + 1) + ')').text();

    let lessQtyPO = origQtyPO - qtyPO;
    let origLessQtyPO = origQtyPO - qtyPO;

    nwGrid = $("#nwGridDDCon .tblGridBody");
    var len = nwGrid.find('tr').length - 1;

    for (var x = len; x >= 0; x--) {
        //let dd_qtyPO = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPO_ORIG + ') input').val());
        //let dd_qtyPR = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPR_ORIG + ')').text());

        let dd_qtyPO = getNumReplace(getNum(nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_QTYPO_ORIG - 1) + ')').text()));
        let dd_qtyPR = getNumReplace(getNum(nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_QTYPR_ORIG - 1) + ')').text()));
        let dd_reqDelDate = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_REQDELDATE + ')').text();
        let new_ddQtyPO = 0, new_ddQtyPR = 0, new_ddQtyRem = 0, new_QtyExcess = 0;
        if (lessQtyPO > 0) {
            new_ddQtyRem = dd_qtyPR - lessQtyPO;
            if (new_ddQtyRem < 0) { //multiple row   
                new_ddQtyPO = lessQtyPO - dd_qtyPR;
                if (new_ddQtyPO > 0) {
                    lessQtyPO = new_ddQtyPO;
                    new_ddQtyPO = 0;
                }
                else {
                    lessQtyPO = 0;
                }
            }
            else { //last row
                new_ddQtyPO = dd_qtyPR - lessQtyPO;
                lessQtyPO = 0;
            }

            nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_QTYPO - 1) + ') input').val(setNumReplace(new_ddQtyPO, 5));

            let prconso = nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_PRCONSO - 1) + ')').text();
            let itemCode = nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_ITEMCODE - 1) + ')').text();
            let prLineID = nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_PRLINEID - 1) + ')').text();
            let ddRowno = nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_ROWNO - 1) + ')').text();
            let vendor = nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_VENDOR - 1) + ')').text();
            StoreUpdatedJson_DD(prconso + itemCode + prLineID + ddRowno + vendor + (_crnwTR.index() + 1));
            nwJsonUpdateValue_DD(jsonDelDtls, x);
        }
        else if (origLessQtyPO <= 0) {
            nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_QTYPO - 1) + ') input').val(setNumReplace(dd_qtyPR, 5));

            let prconso = nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_PRCONSO - 1) + ')').text();
            let itemCode = nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_ITEMCODE - 1) + ')').text();
            let prLineID = nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_PRLINEID - 1) + ')').text();
            let ddRowno = nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_ROWNO - 1) + ')').text();
            let vendor = nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_VENDOR - 1) + ')').text();
            StoreUpdatedJson_DD(prconso + itemCode + prLineID + ddRowno + vendor + (_crnwTR.index() + 1));
            nwJsonUpdateValue_DD(jsonDelDtls, x);
        }
    }

    if (origuom != uom) {
        $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_EXQTY + 1) + ')').enable(true);
        let prconso = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_CONSOPRNO + 1) + ')').text();
        let itemcode = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_ITEMCODE + 1) + ')').text();
        let vendor = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_VENDORCODE + 1) + ')').text();
        let pouom = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_UOM + 1) + ')').text();
        let pouomdesc = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_UOMDESC + 1) + ')').text();
        let excessQty = 0, qtyPOBase = 0;

        excessQty = qtyPO - origQtyPO;

        nwGrid = $("#nwGridDDCon .tblGridBody");
        var len = nwGrid.find('tr').length;

        for (var x = 0; x <= len - 1; x++) {
            //let dd_qtyPO = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPO_ORIG + ') input').val());
            //let dd_qtyPR = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPR_ORIG + ')').text());

            let dd_qtyPO = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_QTYPO_ORIG - 1) + ')').text());
            let dd_qtyPR = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_QTYPR_ORIG - 1) + ')').text());
            let new_ddQtyPO = 0, new_ddQtyPR = 0, new_ddQtyRem = 0, new_QtyExcess = 0;

            new_ddQtyPO = dd_qtyPO / factor;
            new_ddQtyPR = dd_qtyPR / factor;

            nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_QTYPO - 1) + ') input').val(setNumReplace(new_ddQtyPO, 5));
            nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_PRQTY - 1) + ')').text(setNumReplace(new_ddQtyPR, 5));
            nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_POUOMCODE - 1) + ')').text(uom);
            nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_UOM - 1) + ')').text(uomdesc);
            nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_LOCATION - 1) + ')').enable(false);
            nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_SUBLOC - 1) + ')').enable(false);
            nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_VENDOR - 1) + ')').text(vendor);

            let prconso = nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_PRCONSO - 1) + ')').text();
            let itemCode = nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_ITEMCODE - 1) + ')').text();
            var prLineID = nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_PRLINEID - 1) + ')').text();
            let ddRowno = nwGrid.find('tr:eq(' + x + ') td:eq(' + (SPR_DD_ROWNO - 1) + ')').text();

            StoreUpdatedJson_DD(prconso + itemCode + prLineID + ddRowno + vendor + (_crnwTR.index() + 1));
            nwJsonUpdateValue_DD(jsonDelDtls, x);
        }

        if (excessQty > 0) {
            let requom = $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_REQUOM + 1) + ')').text();
            if (requom != '') {

                let excess_dd = excessQty * factor;
                //nwGrid_AddRow("nwGridDDCon", 1);
                func_nwGrid_Insert('nwGridDDCon', 0, true);
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_QTYPO + 1) + ') input').val(setNumReplace(excessQty, 5));
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_QTYPO + 1) + ') input').enable(false);
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_LOCATION + 1) + ')').enable(true);
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_SUBLOC + 1) + ')').enable(true);
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_UOM + 1) + ')').text(pouomdesc);
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_POUOMCODE + 1) + ')').text(pouom);
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_ROWNO + 1) + ')').text(len + 2);
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_LINEID + 1) + ')').text("0");
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_PRLINEID + 1) + ')').text("0");
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_PRCONSO + 1) + ')').text(prconso);
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_ITEMCODE + 1) + ')').text(itemcode);
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_VENDOR + 1) + ')').text(vendor);
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_EXQTY + 1) + ')').text(setNumReplace(excess_dd, 5));

                StoreUpdatedJson_DD(prconso + itemcode + "0" + (len + 2) + vendor + (_crnwTR.index() + 1));
                nwJsonUpdateValue_DD(jsonDelDtls, len + 2);
            }
            else {
                let prLineID = $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_PRLINEID + 1) + ')').text();
                let rowno = $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_ROWNO + 1) + ')').text();
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_QTYPO + 1) + ') input').val(setNumReplace(excessQty, 5));
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_QTYPO + 1) + ') input').enable(false);
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_LOCATION + 1) + ')').enable(true);
                $('#nwGridDDCon .tblGridBody tr:nth-child(' + (1) + ') td:nth-child(' + (SPR_DD_SUBLOC + 1) + ')').enable(true);

                StoreUpdatedJson_DD(prconso + itemcode + prLineID + rowno + vendor + (_crnwTR.index() + 1));
                nwJsonUpdateValue_DD(jsonDelDtls, rowno);
            }

        }
    } else {
        $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_EXQTY + 1) + ')').enable(false);
    }



}

function UOMConversion() {
    let factor = getNumReplace(crnwTR.find("td:eq(" + SPR_FACTOR + ")").text());
    let poQtyOrig = getNumReplace(crnwTR.find("td:eq(" + SPR_ORIGPOQTY + ")").text());
    let poQty = getNumReplace(crnwTR.find("td:eq(" + SPR_POQTY + ") input").val());
    let prQty = getNumReplace(crnwTR.find("td:eq(" + SPR_PRQTY + ")").text());
    let ucostVATEX = getNumReplace(crnwTR.find("td:eq(" + SPR_POUNITCOST_VATEX + ") input").val());
    let ucostVATIN = getNumReplace(crnwTR.find("td:eq(" + SPR_POUNITCOSTVATIN + ") input").val());
    let origQtyPO = 0, newQtyPO = 0, newQtyPR = 0, newUcostVATEX = 0, totalVATEX = 0, newUcostVATIN = 0;

    let origuom = crnwTR.find("td:eq(" + SPR_ORIGUOM + ")").text();
    let uom = crnwTR.find("td:eq(" + SPR_UOM + ")").text();
    if (origuom != uom) {
        newQtyPO = poQty / factor;
        newQtyPR = prQty / factor;
        origQtyPO = poQtyOrig / factor;
        if (!crnwTR.find("td:eq(" + SPR_EXQTY + ") input").is(":checked")) {
            newQtyPO = Math.ceil(newQtyPO);
            newQtyPR = Math.ceil(newQtyPR);
        }
        newUcostVATEX = ucostVATEX * factor;
        newUcostVATIN = ucostVATIN * factor;
        totalVATEX = newUcostVATEX * newQtyPO;
        totalVATIN = newUcostVATIN * newQtyPO;

        crnwTR.find("td:eq(" + SPR_ORIGPOQTY + ")").text(setNumReplace(origQtyPO, 5));
        crnwTR.find("td:eq(" + SPR_POQTY + ") input").val(setNumReplace(newQtyPO, 5));
        crnwTR.find("td:eq(" + SPR_PRQTY + ")").text(setNumReplace(newQtyPR, 5));
        crnwTR.find("td:eq(" + SPR_POUNITCOST_VATEX + ") input").val(setNumReplace(newUcostVATEX, 5));
        crnwTR.find("td:eq(" + SPR_POTOTALAMT_VATEX + ")").text(setNumReplace(totalVATEX, 2));
        crnwTR.find("td:eq(" + SPR_POTOTALAMT_VATIN + ")").text(setNumReplace(totalVATIN, 2));
        crnwTR.find("td:eq(" + SPR_POUNITCOSTVATIN + ") input").val(setNumReplace(newUcostVATIN, 5));
    }
    else {
        if (factor != 0) {
            newQtyPO = poQtyOrig * factor;
            newQtyPR = poQtyOrig * factor;
            origQtyPO = poQtyOrig * factor;
            newUcostVATEX = ucostVATEX / factor;
            newUcostVATIN = ucostVATIN / factor;
            totalVATEX = newUcostVATEX * newQtyPO;
            totalVATIN = newUcostVATIN * newQtyPO;

            crnwTR.find("td:eq(" + SPR_ORIGPOQTY + ")").text(setNumReplace(origQtyPO, 5));
            crnwTR.find("td:eq(" + SPR_POQTY + ") input").val(setNumReplace(newQtyPO, 5));
            crnwTR.find("td:eq(" + SPR_PRQTY + ")").text(setNumReplace(newQtyPR, 5));
            crnwTR.find("td:eq(" + SPR_POUNITCOST_VATEX + ") input").val(setNumReplace(newUcostVATEX, 5));
            crnwTR.find("td:eq(" + SPR_POTOTALAMT_VATEX + ")").text(setNumReplace(totalVATEX, 2));
            crnwTR.find("td:eq(" + SPR_POTOTALAMT_VATIN + ")").text(setNumReplace(totalVATIN, 2));
            crnwTR.find("td:eq(" + SPR_POUNITCOSTVATIN + ") input").val(setNumReplace(newUcostVATIN, 5));
        }
    }
}

function DelDtlsProp() {
    //nwGrid = $("#nwGridDDCon .tblGridBody tbody ");
    //var length = nwGrid.find("tr").length;
    
    var length = nwGridDD_Book.ActiveSheet.GetMaxRow(); //crnwTable.find("tr").length;

    for (var i = 0; i < length; i++) {

        var isExcess = nwGridDD_Book.ActiveSheet.GetValue(SPR_DD_REQUOM - 1, i);

        if (isExcess == '') {
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DD_LOCATION + ")").enable(true);
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DD_SUBLOC + ")").enable(true);

            nwGridDD_Book.ActiveSheet.SetBackground(SPR_DD_LOCATION - 1, i, "cyan");
            nwGridDD_Book.ActiveSheet.SetBackground(SPR_DD_SUBLOC - 1, i, "cyan");

        }
        else {
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DD_LOCATION + ")").enable(false);
            //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DD_SUBLOC + ")").enable(false);

            nwGridDD_Book.ActiveSheet.SetBackground(SPR_DD_LOCATION - 1, i, "gainsboro");
            nwGridDD_Book.ActiveSheet.SetBackground(SPR_DD_SUBLOC - 1, i, "gainsboro");
        }
    }
}

$(document).on("click", "#btnRefresh_PPH", function (e) {
    nwLoading_Start("xbtnRefresh_PPH", crLoadingHTML);
    nwParameter_Add("itemCode", itemCode_glb);
    nwParameter_Add("cmbSortByName_PPH", $('#cmbSortByName_PPH').val());
    nwParameter_Add("cmbSortByAscDesc_PPH", $('#cmbSortByAscDesc_PPH').val());
    func_ActionDriven("actLoadPPH", false);
});

$(document).on("click", "#btnRefresh_RRD", function (e) {
    nwLoading_Start("xbtnRefresh_RRD", crLoadingHTML);
    nwParameter_Add("prConso", prConso_glb);
    nwParameter_Add("itemCode", itemCode_glb);
    nwParameter_Add("cmbSortByName_RRD", $('#cmbSortByName_RRD').val());
    nwParameter_Add("cmbSortByAscDesc_RRD", $('#cmbSortByAscDesc_RRD').val());
    func_ActionDriven("actLoadRRD", false);
});

$(document).on("click", "#btnRefresh_BCD", function (e) {
    nwLoading_Start("xbtnRefresh_BCD", crLoadingHTML);
    nwParameter_Add("prConso", prConso_glb);
    nwParameter_Add("itemCode", itemCode_glb);
    nwParameter_Add("uom", uom_glb);
    nwParameter_Add("cmbSortByName_BCD", $('#cmbSortByName_BCD').val());
    nwParameter_Add("cmbSortByAscDesc_BCD", $('#cmbSortByAscDesc_BCD').val());
    func_ActionDriven("actLoadBCD", false);
});

$(document).on("click", "#atlContainer.btnClearList", function (e) {
    let isClear = $(".innertext").text();

    if (isClear != "") {
        $(".atlContainer.atlContainer").find(".innertext .spantext").remove();
        msgBoxContainerQuestion = "btnClearList";
        parent_MessageBoxQuestion("This will clear all line details. Would you like to continue?", Title, "Question");

        return false;
    }
});



$(document).on('click', '.chkSelect', function () {
    var isCheckAll = true;
    nwGrid = $("#nwGrid .tblGridBody");
    var count = nwGrid.find("tr").length;

    for (var i = 0; i < count; i++) {
        if (nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + (SPR_SELECT) + ") input").is(":checked") == false) {
            isCheckAll = false;
        }
    }
    if (isCheckAll == true) {
        $(".nwCheckBoxTot.nwCheckBoxTot1.chkSelect").prop("checked", true);
    }

});

$(document).on('click', '#btnValList', function () {
    nwPopupForm_ShowModal('nwValidationList');
    nwGrid_TableAdjust('nwValidationList');
    func_ActionDriven("actLoadValidationList", false);
});

function EnableLoadDetails() {
    //$('#txtPOUCostVATEX').enable(true);
    //$('#txtPOUCostVATIN').enable(true);
    $('#chkUseLastPO').enable(true);

    $('#nwGrid').enable(true);
    $('#nwGridDDCon').enable(true);
    $('#btnUploadCanvass').enable(true);
    $('#btnApplyOneVendor').enable(true);
    $('#btnApplySingleDelDate').enable(true);

    $('#btnUpdateunaccreditedVendor').enable(false);
}

$(document).on('click', '#btnProcess_AOV', function () {
    let error = "";
    let vendor = $("#idvallugVendor_AOV").val();
    let ordertype = $("#idvallugOrderType_AOV").val();

    if (vendor == "" && ordertype == "") {
        error += "Cannot be processed. Vendor or Order Type is required.\n";
    }

    if (error != "") {
        MessageBox(error, "Apply to One Vendor/Order Type", "error");
        return;
    }

    nwLoading_Start("xbtnProcess_AOV", crLoadingHTML);

    nwGrid = $("#nwGrid .tblGridBody tbody");
    var length = nwGrid.find("tr").length;

    let vendorcode = $("#idvallugVendor_AOV").val();
    let vendorname = $("#descvallugVendor_AOV").val();
    let ordertypecode = $("#idvallugOrderType_AOV").val();
    let ordertypedesc = $("#descvallugOrderType_AOV").val();

    for (var i = 0; i < length; i++) {
        if (nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SELECT + ") input").is(":checked")) {
            if (ordertypecode != '') {
                //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ORDERTYPECODE + ")").text(ordertypecode);
                //nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ORDERTYPEDESC + ")").text(ordertypedesc);
            }
            if (vendorcode != '') {
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VENDORCODE + ")").text(vendorcode);
                nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_VENDORNAME + ")").text(vendorname);

                if ($('#tagCurrSelection').val() == "1") {
                    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CURRENCY + ")").enable(true);
                } else {
                    nwGrid.find("tr:eq(" + i + ")").find("td:eq(" + SPR_CURRENCY + ")").enable(false);
                }
            }
        }
    }

    for (let x = 0; x <= jsonDelDtls.length - 1; x++) {
        jsonDelDtls[x]["vendor"] = vendorcode;
    }


    nwParameter_Add_Table("nwGrid");
    func_ActionDriven("actLoadVATEWT", false);
});



function HasJsonTempSingelDelDtls(itemCode) {
    return jsonSingleDelDtls.findIndex(i => (i.itemCode) == itemCode)
}

function FilterJsonSingleDelDtls(itemCode) {
    return jsonSingleDelDtls.filter(i => (i.itemCode) != itemCode)
}

function SaveJsonSingleDelDtls() {
    //Filter Data
    var len = $('div.atl_Item .innertext').length;
    if (jsonSingleDelDtls.length == 0) {
        for (var i = 0; i < len; i++) {
            var lencode = $('.atlContainer.atl_Item:eq(' + i + ')').find('div.spantext').length;

            if (lencode > 0) {
                for (var j = 0; j < lencode; j++) {
                    var Store = {};
                    let item = $('.atlContainer.atl_Item:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');

                    Store["delDtls"] = $("#dtpDeliveryDate_ASDDI").val();
                    Store["itemCode"] = item;
                    jsonSingleDelDtls.push(Store);
                }
            }
            else {
                var Store = {};
                Store["delDtls"] = $("#dtpDeliveryDate_ASDDI").val();
                Store["itemCode"] = "";
                jsonSingleDelDtls.push(Store);
            }
        }
    }
    else {
        for (var i = 0; i < len; i++) {
            var lencode = $('.atlContainer.atl_Item:eq(' + i + ')').find('div.spantext').length;

            for (var j = 0; j < lencode; j++) {
                var Store = {};
                let item = $('.atlContainer.atl_Item:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');

                StoreUpdatedJson_SDD(item);
            }
        }
    }

}

function jsonfilter_SDD_Exclude(json, item) {
    return json.filter(i => i.itemCode != item);
}

function StoreUpdatedJson_SDD(item) {
    jsonSingleDelDtls = jsonfilter_SDD_Exclude(jsonSingleDelDtls, item);
    var store = {};

    var len = $('div.atlContainer').length;

    for (var i = 0; i < len; i++) {
        store = {};

        var lencode = $('.atlContainer.atl_Item:eq(' + i + ')').find('div.spantext').length;

        for (var j = 0; j < lencode; j++) {
            let itemcode = $('.atlContainer.atl_Item:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');
            if (item == itemcode) {
                store["delDtls"] = $("#dtpDeliveryDate_ASDDI").val();
                store["itemCode"] = item;
                jsonSingleDelDtls.push(store);
            }
        }
    }

}

function GetPrConsoHDR() {
    var len = $('div.atlContainer').length;
    for (var i = 0; i < len; i++) {
        store = {};
        var lencode = $('.atlContainer .atlContainer:eq(' + i + ')').find('div.spantext').length;

        for (var j = 0; j < lencode; j++) {
            let pchdr = $('.atlContainer .atlContainer:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');
            prconso_hdr = pchdr;
        }
    }
}

function ApplyDeliveryDtls() {
    nwGrid = $("#nwGridDDCon .tblGridBody");
    var len = nwGrid.find('tr').length;
    if (len > 0) {

        for (var x = 0; x <= len - 1; x++) {
            //let prconso = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRCONSO + ')').text();
            //let itemCode = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_ITEMCODE + ')').text();
            //let prLineID = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRLINEID + ')').text();
            //let ddRowno = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_ROWNO + ')').text();
            //let vendor = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_VENDOR + ')').text();
            //if (jsonSingleDelDtls.length > 0) {
            //    let item_sdd = jsonSingleDelDtls[0].itemCode;
            //    let deldate_sdd = jsonSingleDelDtls[0].delDtls;

            //    if (item_sdd != "") {
            //        if (item_sdd == itemCode) {
            //            nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_DELIVERYDATE + ') input').val(deldate_sdd);

            //            StoreUpdatedJson_DD(prconso + itemCode + prLineID + ddRowno + vendor);
            //            nwJsonUpdateValue_DD(jsonDelDtls, x);
            //        }
            //    }
            //    else {
            //        nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_DELIVERYDATE + ') input').val(deldate_sdd);
            //        StoreUpdatedJson_DD(prconso + itemCode + prLineID + ddRowno + vendor);
            //        nwJsonUpdateValue_DD(jsonDelDtls, x);
            //    }
            //}

            let maxRow = nwTempTable_Row_Count("nwGrid");
            for (let e = 0; e <= maxRow; e++) {
                let eItemCode = nwTempTable_RowData_Get("nwGrid", e, SPR_ITEMCODE - 1);
                let ePRConso = nwTempTable_RowData_Get("nwGrid", e, SPR_CONSOPRNO - 1);
                for (let i = 0; i <= jsonSingleDelDtls.length - 1; i++) {
                    let itemCode = jsonSingleDelDtls[i].itemCode;
                    let delDate = jsonSingleDelDtls[i].delDtls;



                    if (itemCode == "") {
                        for (let x = 0; x <= jsonDelDtls.length - 1; x++) {
                            if (ePRConso == jsonDelDtls[x].prConso) {
                                let tmpJsonDelDtls = jsonSingleDelDtls.filter(e => e.itemCode != ""); //kunin ang mga hndi nka blank
                                if (tmpJsonDelDtls.length > 0) {
                                    for (let z = 0; z <= tmpJsonDelDtls.length - 1; z++) {
                                        let zItemCode = tmpJsonDelDtls[z].itemCode;
                                        if (zItemCode != jsonDelDtls[x].itemCode) {
                                            let crnwPRConso = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRCONSO + ')').text();
                                            let crnwItemCode = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_ITEMCODE + ')').text();
                                            if (crnwPRConso == ePRConso && crnwItemCode != zItemCode) {
                                                nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_DELIVERYDATE + ') input').val(delDate);
                                            }
                                            jsonDelDtls[x].delDate = delDate;
                                        }
                                    }
                                } else {
                                    jsonDelDtls[x].delDate = delDate;
                                    nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_DELIVERYDATE + ') input').val(delDate);

                                }
                            }

                        }
                    } else {
                        for (let x = 0; x <= jsonDelDtls.length - 1; x++) {
                            if (ePRConso == jsonDelDtls[x].prConso) {
                                let xItemCode = jsonDelDtls[x].itemCode;
                                if (xItemCode == itemCode) {
                                    jsonDelDtls[x].delDate = delDate;
                                }
                            }

                        }
                    }
                }
            }
        }
    } else {
        let maxRow = nwTempTable_Row_Count("nwGrid");
        for (let e = 0; e <= maxRow; e++) {
            let eItemCode = nwTempTable_RowData_Get("nwGrid", e, SPR_ITEMCODE - 1);
            let ePRConso = nwTempTable_RowData_Get("nwGrid", e, SPR_CONSOPRNO - 1);
            for (let i = 0; i <= jsonSingleDelDtls.length - 1; i++) {
                let itemCode = jsonSingleDelDtls[i].itemCode;
                let delDate = jsonSingleDelDtls[i].delDtls;
                if (itemCode == "") {
                    for (let x = 0; x <= jsonDelDtls.length - 1; x++) {
                        if (ePRConso == jsonDelDtls[x].prConso) {
                            let tmpJsonDelDtls = jsonSingleDelDtls.filter(e => e.itemCode != ""); //kunin ang mga hndi nka blank
                            if (tmpJsonDelDtls.length > 0) {
                                for (let z = 0; z <= tmpJsonDelDtls.length - 1; z++) {
                                    let zItemCode = tmpJsonDelDtls[z].itemCode;
                                    if (zItemCode != jsonDelDtls[x].itemCode) {
                                        jsonDelDtls[x].delDate = delDate;
                                    }
                                }
                            } else {
                                jsonDelDtls[x].delDate = delDate;
                            }
                        }

                    }
                } else {
                    for (let x = 0; x <= jsonDelDtls.length - 1; x++) {
                        if (ePRConso == jsonDelDtls[x].prConso) {
                            let xItemCode = jsonDelDtls[x].itemCode;
                            if (xItemCode == itemCode) {
                                jsonDelDtls[x].delDate = delDate;
                            }
                        }

                    }
                }
            }
        }



    }
}


function ViewCanvassDtlsProp() {
    nwGrid = $("#nwGrid .tblGridBody");
    var len = nwGrid.find('tr').length;

    for (var x = 0; x <= len - 1; x++) {
        let docDtls = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DOCDETAILS + ')').text();
        if (docDtls != '') {
            nwParameter_Add("txtDocno", $('#txtDocno').val());
            nwParameter_Add("docDtls", docDtls);
            nwParameter_Add("rowno", x);
            func_ActionDriven("actVwCanvassTag", false);
        }

    }

}

//function CanvassProp() {
//    nwGrid = $("#nwGridCanvassCon .tblGridBody");
//    var len = nwGrid.find('tr').length;

//     Math.min.apply(Math, nwGrid);

//    for (var x = 0; x <= len - 1; x++) {
//        let amt = Math.min.apply(Math, getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_CD_UCOSTVATEX + ')').text()));
//    }

//}


function DisableGrid() {
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_SELECT + 1) + ') input').enable(false);
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_SELECT + 1) + ')').css("background-color", "gainsboro");
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_EXQTY + 1) + ') input').enable(false);
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_EXQTY + 1) + ')').css("background-color", "gainsboro");
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_POQTY + 1) + ') input').enable(false);
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_POQTY + 1) + ')').css("background-color", "gainsboro");
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_POQTY + 1) + ') input').css("background-color", "gainsboro");
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_POQTY + 1) + ') input').css("border", "none");

    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_DISC_AMNT + 1) + ') input').enable(false);
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_DISC_AMNT + 1) + ')').css("background-color", "gainsboro");
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_DISC_AMNT + 1) + ') input').css("background-color", "gainsboro");
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_DISC_AMNT + 1) + ') input').css("border", "none");

    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_FRGHT_AMNT + 1) + ') input').enable(false);
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_FRGHT_AMNT + 1) + ')').css("background-color", "gainsboro");
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_FRGHT_AMNT + 1) + ') input').css("background-color", "gainsboro");
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_FRGHT_AMNT + 1) + ') input').css("border", "none");

    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_CANVASSDTLS + 1) + ')').removeClass("btnCanvassDtls");
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_VIEWCANVASS + 1) + ')').removeClass("btnViewCanvass");
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_SPECNOTES + 1) + ') button').enable(false);
    $('#nwGrid .tblGridBody tr td:nth-child(' + (SPR_REVIEWATTACH + 1) + ') button').enable(false);
}

function ComputeByCanvassAmount() {
    if (jsonCanvassDtlsFiltered.length > 0) {
        let poQty = getNumReplace(_crnwTR.find("td:eq(" + SPR_POQTY + ") input").val());
        let poVATEX = getNumReplace(getNum(_crnwTR.find("td:eq(" + SPR_POUNITCOST_VATEX + ") input").val()));
        let poVATIN = getNumReplace(getNum(_crnwTR.find("td:eq(" + SPR_POUNITCOSTVATIN + ") input").val()));

        let discAmnt = getNumReplace(getNum(_crnwTR.find("td:eq(" + SPR_DISC_AMNT + ") input").val()));
        let frghAmnt = getNumReplace(getNum(_crnwTR.find("td:eq(" + SPR_FRGHT_AMNT + ") input").val()));

        let vatrate = getNumReplace(getNum(_crnwTR.find("td:eq(" + SPR_VATRATE + ")").text()));

        let totalVATEX = 0, totalVATIN = 0, addVAT = 0, grossAmt = 0;

        $("#chkUseLastPO").prop("checked", false);

        totalVATEX = ((poVATEX * poQty) - discAmnt) + frghAmnt 

        //totalucostVATEX = ((ucostVATEX * qty) - discAmnt) + frghAmnt;

        totalVATIN = ((poVATIN * poQty) - discAmnt) + ((frghAmnt * vatrate) + frghAmnt);
        addVAT = totalVATIN - totalVATEX;
        //addVAT = totalVATEX * parseFloat(vatrate);
        grossAmt = totalVATEX + addVAT;

        $("#txtPOUCostVATEX").val(setNumReplace(poVATEX, 5));
        $("#txtPOUCostVATIN").val(setNumReplace(poVATIN, 5));
        $("#txtTotalPOAmtVATIN").val(setNumReplace(totalVATIN, 2));
        $("#txtTotalPOAmtVATEX").val(setNumReplace(totalVATEX, 2));

        $("#txtTotalDiscAmnt").val(setNumReplace(discAmnt, 5));
        $("#txtTotalFrgtAmnt").val(setNumReplace(frghAmnt, 5));


        $("#txtAddVAT").val(setNumReplace(addVAT, 2));
        $("#txtGrossAmtVATIN").val(setNumReplace(grossAmt, 2));
    }
}

$(document).on("click", ".btnVwConsoPR", function (e) {
    nwLoading_Start("xbtnDtls", crLoadingHTML);

    var fullength = "";
    var title = "";
    var docno = $('#dimTableLookUp').find('tr:eq(' + 0 + ') td:eq(1)').text();

    if (docno.length > 0) {
        nwParameter_Add("urlPath", window.location.origin);

        title = "Consolidate PR Entry";
        fullength = "../../../PO/DocumentEntry/POConsolidatePREntry/POConsolidatePREntry.aspx?nwDocno=" + encodeURI(docno);
        $('.nwmenuFrame').attr("src", fullength);

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "98%" });
        $("#nwPopWindow").css({ "min-height": "98%" });
        nwPopupForm_ShowModal("nwPopWindow");
        $('.dimbgNWnwPopWindow').removeClass('openn');
        $('#nwPopWindow').addClass("zindexHigh");
    }
    nwLoading_End('xbtnDtls');
});

$(document).on("click", ".btnDLConsoPR", function (e) {
    let docno = $(this).attr('id') //$('#dimTableLookUp').find('tr:eq(' + 0 + ') td:eq(1)').text();
    if (docno != "") {
        nwLoading_Start("xbtnDLConsoPR", crLoadingHTML);
        nwParameter_Add("docno", docno);
        func_ActionDriven("actGenerateConsoPR", false);
    }

});

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

    $(`#nwGridBdgtCtrl-nwData tr`).each(function (i, n) {
        var $row = $(n);

        rmrks = $row.find(`td:eq(${BdgtCtrl.GRD_BCD_REMARKS})`).text() != "" ? true : false;
        rmrksMsg = $row.find(`td:eq(${BdgtCtrl.GRD_BCD_REMARKS})`).text();

        istagPerQty = $row.find(`td:eq(${BdgtCtrl.GRD_BCD_TAGISQTY})`).text() != "" ? true : false;

        if (rmrks) {

            if (istagPerQty) { //tagged as Quantity
                $row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_QTY})`).css('background-color', 'red');
                $row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_QTY})`).css('color', 'white');
            }
            else {
                $row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_AMNT})`).css('background-color', 'red');
                $row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_AMNT})`).css('color', 'white');
            }

            if (rmrksMsg.toLowerCase() == "nobudget") {
                $row.find(`td:eq(${BdgtCtrl.GRD_BCD_BEFORE_AMNT})`).css('background-color', 'red');
                $row.find(`td:eq(${BdgtCtrl.GRD_BCD_BEFORE_AMNT})`).css('color', 'white');

                $row.find(`td:eq(${BdgtCtrl.GRD_BCD_BEFORE_QTY})`).css('background-color', 'red');
                $row.find(`td:eq(${BdgtCtrl.GRD_BCD_BEFORE_QTY})`).css('color', 'white');

                $row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_QTY})`).css('background-color', 'red');
                $row.find(`td:eq(${BdgtCtrl.GRD_BCD_AFTER_QTY})`).css('color', 'white');
            }
        }
    });
}

$(document).on('click', '#btnAplyPODtls', function () {
    let maxRow = nwTempTable_Row_Count("nwGrid");
    let strError = "";
    for (let x = 0; x < maxRow; x++) {
        let itmC = nwTempTable_RowData_Get("nwGrid", x, SPR_ITEMCODE - 1);
        if (itmC != "") {
            let vendCode = nwTempTable_RowData_Get("nwGrid", x, SPR_VENDORCODE - 1);
            if (vendCode == "") {
                strError += `Cannot proceed. Vendor in row ${x + 1} is required.\n`;
            }
            let totalAmnt = nwTempTable_RowData_Get("nwGrid", x, SPR_POTOTALAMT_VATEX - 1);
            if (totalAmnt == "") {
                strError += `Cannot proceed. Total PO Amount (VATEX) in row ${x + 1} is required.\n`;
            }
        }
    }
    if (strError != "") {
        MessageBox(strError, Title, 'error');
    } else {
        let docno = $('#txtDocno').val();
        nwParameter_Add_Table("nwGrid");
        nwParameter_Add("isHideDiscAmnt", $('#isHideDiscAmnt').val());
        nwParameter_Add("isHideFreightAmnt", $('#isHideFreightAmnt').val());
        nwLoading_Start("actApplyPODetails", crLoadingHTML);
        nwPopupForm_ShowModal("applyPODtls");

        //let vendCodeList = getVendorList();

        //nwParameter_Add("txtDocno", docno);
        //nwParameter_Add("ventCodeList", vendCodeList);
        func_ActionDriven("actApplyPODetails", true);

    }
});


function getVendorList() {
    let strTmp = "";
    let maxRow = nwTempTable_Row_Count("nwGrid");
    for (let x = 0; x < maxRow; x++) {
        let itmC = nwTempTable_RowData_Get("nwGrid", x, SPR_ITEMCODE - 1);
        if (itmC != "") {
            let vendCode = nwTempTable_RowData_Get("nwGrid", x, SPR_VENDORCODE - 1);
            if (vendCode != "") {
                if (strTmp == "") {
                    strTmp = vendCode;
                } else {
                    if (!strTmp.includes(vendCode)) {
                        strTmp += "|" + vendCode;
                    }

                }
            }
        }
    }

    return strTmp;

}



$(document).on('click', '.btnPayComp', function () {
    let payCatCode = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", crnwTR.index(), SPR_PO_DTLS_PAY_CAT_CODE - 1);
    let payCat = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", crnwTR.index(), SPR_PO_DTLS_PAY_CAT - 1);
    let prConsoCode = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", crnwTR.index(), SPR_PO_DTLS_PRCONSO_CODE - 1);
    let txtVendorCode = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", crnwTR.index(), SPR_PO_DTLS_VENDOR_CODE - 1);
    let itemTypeCode = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", crnwTR.index(), SPR_PO_DTLS_ITEMTYPE_CODE - 1);

    let IS_PAY_COMP = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", crnwTR.index(), SPR_PO_DTLS_IS_PAY_COMP - 1);

    if (payCat != "" && IS_PAY_COMP == "1") {
        applyPOTRIndex = crnwTR.index();
        $('#idvallugPayCategory_PC').val(payCatCode);
        $('#descvallugPayCategory_PC').val(payCat);
        $('#txtItemTypeCode').val(itemTypeCode);
        $('#txtPRConsoCode').val(prConsoCode);
        $('#txtVendorCode').val(txtVendorCode);
        let docno = prConsoCode + txtVendorCode + itemTypeCode + payCatCode;
        nwParameter_Add("txtPaycatDocno", docno);
        nwPopupForm_ShowModal("nwPaymentComponent");

        nwParameter_Add("txtPayCatCode", payCatCode);
        func_ActionDriven("actpaymentComponent", true);
    }

});


function setPaymentCompGrid() {
    let maxRow = nwTempTable_Row_Count("nwGridPayComponent");
    nwGrid_AddRow("nwGridPayComponent", 1);
    let totalPercent = 0;
    for (let x = 0; x < maxRow; x++) {

        if ($(`#nwGridPayComponent table tbody tr:eq(${x}) td:eq(${SPR_PC_REMARKS}) textarea`).val() != "") {
            $(`#nwGridPayComponent table tbody tr:eq(${x}) td:eq(${SPR_PC_REMARKS}) button`).addClass("btnGreen");
        } else {
            $(`#nwGridPayComponent table tbody tr:eq(${x}) td:eq(${SPR_PC_REMARKS}) button`).addClass("btnBlue");
        }



        //disable balance column
        let isBalance = nwTempTable_RowData_Get("nwGridPayComponent", x, SPR_PC_ISDISABLE);
        if (isBalance == "1") {

            $(`#nwGridPayComponent table tbody tr:eq(${x}) td:eq(${SPR_PC_ITEMGRPTYPECODE})`).css("background-color", "gainsboro").enable(false);
            $(`#nwGridPayComponent table tbody tr:eq(${x}) td:eq(${SPR_PC_PERCBASEDONTOTALPO})`).css("background-color", "gainsboro").enable(false);

            totalPercent = parseFloat(100) - totalPercent;
            $(`#nwGridPayComponent table tbody tr:eq(${x}) td:eq(${SPR_PC_PERCBASEDONTOTALPO})`).text(setNumReplace(totalPercent, 5)).addClass("txtPercentTotal").enable(false);
        } else {
            $(`#nwGridPayComponent table tbody tr:eq(${x}) td:eq(${SPR_PC_ITEMGRPTYPECODE})`).css("background-color", "cyan").enable(true);
            $(`#nwGridPayComponent table tbody tr:eq(${x}) td:eq(${SPR_PC_PERCBASEDONTOTALPO})`).css("background-color", "white").enable(true);

            let pertTmp = nwTempTable_RowData_Get("nwGridPayComponent", x, SPR_PC_PERCBASEDONTOTALPO, 'input');
            totalPercent += (pertTmp.length > 0) ? parseFloat(pertTmp) : 0;



        }

        let isEnablePayTerm = nwTempTable_RowData_Get("nwGridPayComponent", x, SPR_PC_ISENABLEPAYTERM);

        if (isEnablePayTerm == "1") {
            $(`#nwGridPayComponent table tbody tr:eq(${x}) td:eq(${SPR_PC_PAYTERMCODE})`).css("background-color", "cyan").enable(true);
            $(`#nwGridPayComponent table tbody tr:eq(${x}) td:eq(${SPR_PC_PAYDATE})`).css("background-color", "white").enable(true);

        } else {
            $(`#nwGridPayComponent table tbody tr:eq(${x}) td:eq(${SPR_PC_PAYTERMCODE})`).css("background-color", "gainsboro").enable(false);
            $(`#nwGridPayComponent table tbody tr:eq(${x}) td:eq(${SPR_PC_PAYDATE})`).css("background-color", "white").enable(false);
        }

    }

    $(`#nwGridPayComponent table tbody tr:eq(${maxRow}) td:eq(${SPR_PC_PAYCOMPONENTDESC})`).text("TOTAL").css("font-weight", "bold").css("background-color", "gainsboro").enable(false);
    $(`#nwGridPayComponent table tbody tr:eq(${maxRow}) td:eq(${SPR_PC_ITEMGRPTYPECODE})`).css("background-color", "gainsboro").enable(false);
    $(`#nwGridPayComponent table tbody tr:eq(${maxRow}) td:eq(${SPR_PC_PAYTERMCODE})`).css("background-color", "gainsboro").enable(false);
    $(`#nwGridPayComponent table tbody tr:eq(${maxRow}) td:eq(${SPR_PC_REMARKS})`).html("").css("background-color", "gainsboro").enable(false);
    $(`#nwGridPayComponent table tbody tr:eq(${maxRow}) td:eq(${SPR_PC_PAYDATE})`).css("background-color", "gainsboro").enable(false);
    $(`#nwGridPayComponent table tbody tr:eq(${maxRow}) td:eq(${SPR_PC_PERCBASEDONTOTALPO})`).text("100.00").addClass("txtPercentTotal").enable(false);

}

var PC_totalPercent = 100;
$(document).on('change', '.txtPerc_PC', function () {
    let maxRow = nwTempTable_Row_Count("nwGridPayComponent");
    let isNeg = (parseFloat(PC_totalPercent) - parseFloat($(this).val())) < 0;
    if (parseFloat($(this).val()) > 100 || isNeg) {
        $(this).val(0.00);
    }
    PC_totalPercent = 0;
    for (let x = 0; x < maxRow; x++) {
        let isBalance = nwTempTable_RowData_Get("nwGridPayComponent", x, SPR_PC_ISDISABLE);
        if (isBalance == "1") {
            PC_totalPercent = parseFloat(100) - PC_totalPercent;
            $(`#nwGridPayComponent table tbody tr:eq(${x}) td:eq(${SPR_PC_PERCBASEDONTOTALPO})`).text(setNumReplace(PC_totalPercent, 2)).addClass("txtPercentTotal").enable(false);
        } else {

            $(`#nwGridPayComponent table tbody tr:eq(${x}) td:eq(${SPR_PC_PERCBASEDONTOTALPO})`).css("background-color", "white").enable(true);

            let pertTmp = nwTempTable_RowData_Get("nwGridPayComponent", x, SPR_PC_PERCBASEDONTOTALPO, 'input');
            PC_totalPercent += (pertTmp.length > 0) ? parseFloat(pertTmp) : 0;



        }
    }
});



$(document).on('change', '.txtPayDate_PC', function (e) {
    var startdate = Date.parse($(this).val());
    var serverDate = Date.parse(currentServerDate);
    var hasError = false;

    if (startdate != "") {
        if (startdate < serverDate) {
            nwTempTable_RowData_Set("nwGridPayComponent", crnwTR.index(), SPR_PC_PAYDATE, 'input')("")
            hasError = true;
            parent_MessageBox("Cannot proceed. Payment Date should be later than the current server date.", menuItemTitle_PC);
        }
    }

    if (nwTempTable_RowData_Get("nwGridPayComponent", crnwTR.index(), SPR_PC_PAYTERMCODE).length > 0 && !hasError) {
        msgBoxContainerQuestion = "txtPayDateChange_PC";
        parent_MessageBoxQuestion("Input of Payment Date with clear the selected Payment Term. Would you like to continue?", menuItemTitle_PC, "");
    }
});

function msgBoxContainerQuestionF(genID, answer) {
    cust_GetPara();
    if (genID == 'txtPayDateChange_PC') {
        if (answer == "Yes") {
            nwTempTable_RowData_Set("nwGridPayComponent", crnwTR.index(), SPR_PC_PAYTERMCODE)("")
            nwTempTable_RowData_Set("nwGridPayComponent", crnwTR.index(), SPR_PC_PAYTERMDESC)("")
        } else {


            nwTempTable_RowData_Set("nwGridPayComponent", crnwTR.index(), SPR_PC_PAYDATE, 'input')("")
        }
    }
    else if (genID == 'txtPayTermChange_PC') {
        if (answer == "Yes") {


            nwTempTable_RowData_Set("nwGridPayComponent", crnwTR.index(), SPR_PC_PAYDATE, 'input')("")
        } else {
            nwTempTable_RowData_Set("nwGridPayComponent", crnwTR.index(), SPR_PC_PAYTERMCODE)("")
            nwTempTable_RowData_Set("nwGridPayComponent", crnwTR.index(), SPR_PC_PAYTERMDESC)("")
        }
    } else if (genID == "txtSavePaymentComp") {
        if (answer == "Yes") {
            nwLoading_Start('actSavePayComponentData', crLoadingHTML);
            let prConsoCode = $('#txtPRConsoCode').val();
            let vendCode = $('#txtVendorCode').val();
            let itemTypeCode = $('#txtItemTypeCode').val();
            let payCatCode = $('#idvallugPayCategory_PC').val();
            let docno = prConsoCode + vendCode + itemTypeCode + payCatCode;
            nwParameter_Add("txtPaycatDocno", docno);
            nwParameter_Add_Table("nwGridPayComponentCon");
            func_ActionDriven('actSavePayComponentData', true);
        }
    } else if (genID == "txtSaveApplyPODtls") {
        if (answer == "Yes") {
            nwLoading_Start('actSaveGridPODetails', crLoadingHTML);
            nwParameter_Add_Table("nwGridApplyPODetailsCon");
            nwParameter_Add("txtDocno", $('#txtDocno').val());
            func_ActionDriven('actSaveGridPODetails', true);
        }
    } else if (genID == "btnClearConsoList") {
        if (answer == "Yes") {
            $(".atlContainer").find(".innertext .spantext").remove();
            nwGrid_RemoveRow("nwGrid", 0, $("#nwGrid .tblGridBody tr").length);
            nwGrid_RemoveRow("nwGridDDCon", 0, $("#nwGridDDCon .tblGridBody tr").length);
            nwGrid_RemoveRow("nwGridBCDCon", 0, $("#nwGridBCDCon .tblGridBody tr").length);
            nwGrid_RemoveRow("nwGridRRDCon", 0, $("#nwGridRRDCon .tblGridBody tr").length);
            nwGrid_RemoveRow("nwGridPPHCon", 0, $("#nwGridPPHCon .tblGridBody tr").length);
            $('.spantext').remove();
            $(".nwCheckBoxTot.nwCheckBoxTot1.chkSelect").prop("checked", false);
            ClearAllJSONStrings();
            ClearPOItemAndCostDtls();
            $('#btnValList').enable(false);
            $('#btnValList').removeClass('btnRed');
            $('#btnValList').addClass('btnGray');
            $("#btnUploadCanvass").enable(false);
            $("#btnApplyOneVendor").enable(false);
            $("#btnApplySingleDelDate").enable(false);
        }
    }
    if (genID == "btnSave") {
        if (answer == "Yes") {
            nwLoading_Start("xbtnSave", crLoadingHTML);
            nwParameter_Add("refno", $('#idvallugRefTranNo').val());
            nwParameter_Add("docno", tmpDocno);
            nwParameter_Add_Table('nwGridChargeDtlsCon');
            nwParameter_Add("row", currRow);
            func_ActionDriven('actbtnSave', false);
        } else if (answer == "No") {
            $('#txtValueDate').val(gblTxtValueDate);
        }
    }
    if (genID == "btnSaveUploading") {
        if (answer == "Yes") {
            nwLoading_Start("xbtnSaveUploading", crLoadingHTML);
            cust_GetPara();
            nwParameter_Add_Table("nwGridValListCon");
            func_ActionDriven("actSaveUploading", false);
        }
    }
    if (genID == "Processdata") {
        if (answer == "Yes") {
            nwLoading_Start("xProcessdata", crLoadingHTML);
            cust_GetPara();
            func_ActionDriven("actProcess", true);
        }
    }
    if (genID == "btnClearList") {
        if (answer == "Yes") {
            $(".atlContainer").find(".innertext .spantext").remove();
            nwGrid_RemoveRow("nwGrid", 0, $("#nwGrid .tblGridBody tr").length);
            nwGrid_RemoveRow("nwGridDDCon", 0, $("#nwGridDDCon .tblGridBody tr").length);
            nwGrid_RemoveRow("nwGridBCDCon", 0, $("#nwGridBCDCon .tblGridBody tr").length);
            nwGrid_RemoveRow("nwGridRRDCon", 0, $("#nwGridRRDCon .tblGridBody tr").length);
            nwGrid_RemoveRow("nwGridPPHCon", 0, $("#nwGridPPHCon .tblGridBody tr").length);
            $('.spantext').remove();
            $(".nwCheckBoxTot.nwCheckBoxTot1.chkSelect").prop("checked", false);
            ClearAllJSONStrings();
            ClearPOItemAndCostDtls();
            $('#btnValList').enable(false);
            $('#btnValList').removeClass('btnRed');
            $('#btnValList').addClass('btnGray');
            $("#btnUploadCanvass").enable(false);
            $("#btnApplyOneVendor").enable(false);
            $("#btnApplySingleDelDate").enable(false);
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
    if (genID == "btnSaveUpdateunaccreditedVendor") {
        if (answer == "Yes") {
            let strError = "";
            jsonUpdateunaccridtedVendor = []; //reset the saved data
            let maxRow = nwTempTable_Row_Count("nwGridUpdateunaccreditedVendorCon");
            for (let x = 0; x < maxRow; x++) {
                let vendorCode = nwTempTable_RowData_Get("nwGridUpdateunaccreditedVendorCon", x, SPR_UNACCREDITED_VEND_CODE - 1);
                if (vendorCode != "") {
                    let row = {};
                    let canvassedVendorName = nwTempTable_RowData_Get("nwGridUpdateunaccreditedVendorCon", x, SPR_UNACCREDITED_VEND_NAME - 1);
                    let vendorDesc = nwTempTable_RowData_Get("nwGridUpdateunaccreditedVendorCon", x, SPR_UNACCREDITED_VEND_DESC - 1);
                    row["canvassedVendorName"] = canvassedVendorName;
                    row["vendorCode"] = vendorCode;
                    row["vendorDesc"] = vendorDesc;
                    jsonUpdateunaccridtedVendor.push(row);
                }
            }

            updateCanvassDetails();


            ////update the canvass details
            //for (let i = 0; i < jsonUpdateunaccridtedVendor.length; i++){
            //    let canvassedVendorName = jsonUpdateunaccridtedVendor[i]["jsonUpdateunaccridtedVendor"];
            //    let vendorCode = jsonUpdateunaccridtedVendor[i]["vendorCode"];
            //    let vendorDesc = jsonUpdateunaccridtedVendor[i]["vendorDesc"];

            //    for (let z = 0; z < jsonCanvassDtls.length; z++){

            //    }
            //}


        }
    }
}

function updateCanvassDetails() {
    if (jsonUpdateunaccridtedVendor.length <= 0) {
        MessageBox("Cannot be saved. At least 1 line detail is required.", Title, "error");
    } else {
        for (let i = 0; i < jsonUpdateunaccridtedVendor.length; i++) {
            let canvassedVendorName = jsonUpdateunaccridtedVendor[i]["canvassedVendorName"];
            let vendorCode = jsonUpdateunaccridtedVendor[i]["vendorCode"];
            let vendorDesc = jsonUpdateunaccridtedVendor[i]["vendorDesc"];

            for (let z = 0; z < jsonCanvassDtls.length; z++) {
                let vendorCodex = jsonCanvassDtls[z]["vendorCode"];
                if (vendorCodex == "") {
                    let canvassedVendorNamex = jsonCanvassDtls[z]["vendorName"];
                    if (canvassedVendorNamex == canvassedVendorName) {
                        jsonCanvassDtls[z]["vendorCode"] = vendorCode;
                        jsonCanvassDtls[z]["vendorName"] = vendorDesc;
                    }
                }
            }

            for (let z = 0; z < jsonCanvassDtlsFiltered.length; z++) {
                let vendorCodex = jsonCanvassDtlsFiltered[z]["vendorCode"];
                if (vendorCodex == "") {
                    let canvassedVendorNamex = jsonCanvassDtlsFiltered[z]["vendorName"];
                    if (canvassedVendorNamex == canvassedVendorName) {
                        jsonCanvassDtlsFiltered[z]["vendorCode"] = vendorCode;
                        jsonCanvassDtlsFiltered[z]["vendorName"] = vendorDesc;
                    }
                }
            }
        }
        window_close('UpdateunaccreditedVendor');
    }


    //$('#btnUpdateunaccreditedVendor').removeClass("btnBlue").addClass("btnGreen");
}



$(document).on('click', '.nwgbtnRemarks', function () {
    if ($(this).attr('remarkstitle') == "Specifications/Notes") {
        $('#txtRemarksTag').val("nwGrid");
    } else {
        $('#txtRemarksTag').val("nwGridPayComponent");
    }
});


$(document).on('click', '#btnSavePaymentCompWindow', function () {
    msgBoxContainerQuestion = "txtSavePaymentComp";
    parent_MessageBoxQuestion("Would you like to save the current record?", menuItemTitle_PC, "");
});


function addThousandSeparatorONPOdtls() {


    let maxRow = nwTempTable_Row_Count("nwGridApplyPODetailsCon");
    for (let x = 0; x <= maxRow; x++) {
        let totalPOAmntVATEXBeforeDis = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", x, SPR_PO_DTLS_AMNT_VATEX_BEFORE_DISC_FRHT - 1, 'input');
        nwTempTable_RowData_Set("nwGridApplyPODetailsCon", x, SPR_PO_DTLS_AMNT_VATEX_BEFORE_DISC_FRHT, 'input')(setNumReplace(totalPOAmntVATEXBeforeDis, 2));

        let totalPOAmntVATINBeforeDis = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", x, SPR_PO_DTLS_AMNT_VATIN_BEFORE_DISC_FRHT - 1, 'input');
        nwTempTable_RowData_Set("nwGridApplyPODetailsCon", x, SPR_PO_DTLS_AMNT_VATIN_BEFORE_DISC_FRHT, 'input')(setNumReplace(totalPOAmntVATINBeforeDis, 2));

        let totalPOAmntVATEXAfterDis = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", x, SPR_PO_DTLS_AMNT_VATEX_AFTER_DISC_FRHT - 1, 'input');
        nwTempTable_RowData_Set("nwGridApplyPODetailsCon", x, SPR_PO_DTLS_AMNT_VATEX_AFTER_DISC_FRHT, 'input')(setNumReplace(totalPOAmntVATEXAfterDis, 2));

        let totalPOAmntVATINAfterDis = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", x, SPR_PO_DTLS_AMNT_VATIN_AFTER_DISC_FRHT - 1, 'input');
        nwTempTable_RowData_Set("nwGridApplyPODetailsCon", x, SPR_PO_DTLS_AMNT_VATIN_AFTER_DISC_FRHT, 'input')(setNumReplace(totalPOAmntVATINAfterDis, 2));

    }

}

function addThousandSep(str) {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function colorPaymentComponentBtn(hasPayComp, index) {
    if (hasPayComp == "1") {
        $(`#nwGridApplyPODetailsCon table tbody tr:eq(${index}) td:eq(${SPR_PO_DTLS_PAY_COMP})`).removeClass("btnBlue").addClass("btnGreen")
        $(`#nwGridApplyPODetailsCon table tbody tr:eq(${index}) td:eq(${SPR_PO_DTLS_HAS_PAY_COMP})`).html("1");
    } else {
        $(`#nwGridApplyPODetailsCon table tbody tr:eq(${index}) td:eq(${SPR_PO_DTLS_PAY_COMP})`).removeClass("btnGreen").addClass("btnBlue")
        $(`#nwGridApplyPODetailsCon table tbody tr:eq(${index}) td:eq(${SPR_PO_DTLS_HAS_PAY_COMP})`).html("");
    }
}

$(document).on('click', '#btnSaveApplyPODetails', function () {
    msgBoxContainerQuestion = "txtSaveApplyPODtls";
    parent_MessageBoxQuestion("Would you like to save the current record?", menuItemTitle_PC, "");
});

function colorApplyPODetailsGrid() {
    let maxRow = nwTempTable_Row_Count("nwGridApplyPODetailsCon");
    for (let z = 0; z < maxRow; z++) {
        let isPayComp = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", z, SPR_PO_DTLS_IS_PAY_COMP - 1);
        if (isPayComp == "1") {
            let hasPayComp = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", z, SPR_PO_DTLS_HAS_PAY_COMP - 1);
            if (hasPayComp == "1") {
                $(`#nwGridApplyPODetailsCon table tbody tr:eq(${z}) td:eq(${SPR_PO_DTLS_PAY_COMP})`).removeClass("btnGray").addClass("btnGreen");
            } else {
                $(`#nwGridApplyPODetailsCon table tbody tr:eq(${z}) td:eq(${SPR_PO_DTLS_PAY_COMP})`).removeClass("btnGreen").addClass("btnGray");
            }
            $(`#nwGridApplyPODetailsCon table tbody tr:eq(${z}) td:eq(${SPR_PO_DTLS_PAY_TERM})`).css("background-color", "gainsboro");
        } else {
            $(`#nwGridApplyPODetailsCon table tbody tr:eq(${z}) td:eq(${SPR_PO_DTLS_PAY_TERM})`).css("background-color", "cyan");
        }





    }
}


function bruteForceSearchJSON(json, searchField, searchVal) {
    let rslt = [];
    for (let i = 0; i < json.length; i++) {
        if (json[i][searchField] == searchVal) {
            //console.log(json[i])
            rslt.push(json[i]);
            //rslt = json[i];
        }
    }
    return rslt;
}





function distributeDiscAndFreightAmnt() {
    isFROMApplPO = true;

    let isToBeAppliedPerItem = $('#isToBeAppliedPerItem').val();
    let isToBeAppliedPerVendor = $('#isToBeAppliedPerVendor').val();
    let isHideDiscAmnt = $('#isHideDiscAmnt').val();
    let isHideFreightAmnt = $('#isHideFreightAmnt').val();
    let maxRow = nwTempTable_Row_Count("nwGrid");


    let totalPerItem = [];

    if (isToBeAppliedPerItem == '1') {
        for (let x = 0; x < maxRow; x++) {
            let prconso = nwTempTable_RowData_Get("nwGrid", x, SPR_CONSOPRNO - 1);
            if (totalPerItem[prconso] == undefined) {
                totalPerItem[prconso] = 0;
            }
            let qty = parseFloat(getNum(nwTempTable_RowData_Get("nwGrid", x, SPR_POQTY - 1, 'input').replace(/,/g, "")));
            let uc = parseFloat(getNum(nwTempTable_RowData_Get("nwGrid", x, SPR_POUNITCOST_VATEX - 1, 'input').replace(/,/g, "")));
            let total = uc * qty;
            totalPerItem[prconso] += (total);
        }
    }

    for (let x = 0; x < maxRow; x++) {
        let prconso = nwTempTable_RowData_Get("nwGrid", x, SPR_CONSOPRNO - 1);
        let prTag = nwTempTable_RowData_Get("nwGrid", x, SPR_ITEM_TYPE - 1);
        let vendor = nwTempTable_RowData_Get("nwGrid", x, SPR_VENDORCODE - 1);
        let docno = prconso + vendor + prTag + recUser;

        //the json find function is only available on ES6 Javascript
        //let jsonTmp = xjsonTmp.find(x =>  (x.prTag = prTag, x.VendorCode = vendor, x.prConso = prconso));
        let jsonTmp = bruteForceSearchJSON(jsonApplyPODetails, 'docno', docno);
        if (jsonTmp.length > 0) {
            $('#txtHasPODtls').val('1');
            $('#btnAplyPODtls').removeClass('btnBlue').addClass('btnGreen');

            let discAmnt = parseFloat(getNum(String(jsonTmp[0]["Disc_Amnt_VATEX"] || 0).replace(/,/g, "")));
            let frghtAmnt = parseFloat(getNum(String(jsonTmp[0]["Frght_Amnt_VATEX"] || 0).replace(/,/g, "")));
            let applyPOAmntVATEX = 0;


            let qtyForPO = parseFloat(getNum(nwTempTable_RowData_Get("nwGrid", x, SPR_POQTY - 1, 'input').replace(/,/g, "")))
            let poUC = parseFloat(getNum(nwTempTable_RowData_Get("nwGrid", x, SPR_POUNITCOST_VATEX - 1, 'input').replace(/,/g, "")));
            let poUCVATIN = parseFloat(getNum(nwTempTable_RowData_Get("nwGrid", x, SPR_POUNITCOSTVATIN - 1, 'input').replace(/,/g, "")));

            let mainDiscAmnt = 0, mainFrghtAmnt = 0;

            if (isToBeAppliedPerItem == '1') {
                applyPOAmntVATEX = totalPerItem[prconso];
            } else {
                applyPOAmntVATEX = parseFloat(getNum(String(jsonTmp[0]["TotalPOAmntVATEXBeforeDiscAndFrght"] || 0).replace(/,/g, "")));
            }

            mainDiscAmnt = parseFloat(discAmnt * ((poUC * qtyForPO) / applyPOAmntVATEX));
            mainFrghtAmnt = parseFloat(frghtAmnt * ((poUC * qtyForPO) / applyPOAmntVATEX));

            let vatrate = parseFloat(getNum(nwTempTable_RowData_Get("nwGrid", x, SPR_VATRATE - 1)));



             let frgtAmntVATIN = getNumReplace(getNum(mainFrghtAmnt * (1 + vatrate))).toFixed(5);
             let dscAmntVATIN = getNumReplace(getNum(mainDiscAmnt * (1 + vatrate))).toFixed(5);



            nwTempTable_RowData_Set("nwGrid", x, SPR_DISC_AMNT, 'input')(setNumReplace(mainDiscAmnt, 5))
            nwTempTable_RowData_Set("nwGrid", x, SPR_FRGHT_AMNT, 'input')(setNumReplace(mainFrghtAmnt, 5));


            let currTotal = (poUC * qtyForPO);
            let currTotalVATIN = (poUCVATIN * qtyForPO);

            let totalPOAmnt = (currTotal - parseFloat(mainDiscAmnt.toFixed(5))) + parseFloat(mainFrghtAmnt.toFixed(5));


            let grossamt = (currTotalVATIN - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN)
            nwTempTable_RowData_Set("nwGrid", x, SPR_POTOTALAMT_VATEX)(setNumReplace(totalPOAmnt, 2));
            nwTempTable_RowData_Set("nwGrid", x, SPR_POTOTALAMT_VATIN)(setNumReplace(grossamt, 2));

        }


    }

    if (isHideFreightAmnt == "0" && isToBeAppliedPerVendor == "1") {
        let jsonLen = jsonDiscFrghtConfig.length;
        for (let x = 1; x <= jsonLen; x++) {
            let prTag = jsonDiscFrghtConfig[x - 1]["PRTag"];
            let itemCode = jsonDiscFrghtConfig[x - 1]["itemCode"];
            let itemDesc = jsonDiscFrghtConfig[x - 1]["itemDesc"];
            let baseUOM = jsonDiscFrghtConfig[x - 1]["baseUOM"];
            let baseUUOMDesc = jsonDiscFrghtConfig[x - 1]["baseUUOMDesc"];
            let prQtyBeforePO = jsonDiscFrghtConfig[x - 1]["prQtyBeforePO"];
            let excludeQtyRndUp = jsonDiscFrghtConfig[x - 1]["excludeQtyRndUp"];
            let QtyForPO = jsonDiscFrghtConfig[x - 1]["QtyForPO"];
            let lwstQuoteUCVatex = jsonDiscFrghtConfig[x - 1]["lwstQuoteUCVatex"];
            let lwstQuoteUCVatin = jsonDiscFrghtConfig[x - 1]["lwstQuoteUCVatin"];
            let POUCVATEX = jsonDiscFrghtConfig[x - 1]["POUCVATEX"];
            let POUCVATIN = jsonDiscFrghtConfig[x - 1]["POUCVATIN"];
            let discAmntVATEX = jsonDiscFrghtConfig[x - 1]["discAmntVATEX"];
            let frghtAmntVATEX = jsonDiscFrghtConfig[x - 1]["frghtAmntVATEX"];
            let totalPOAmntVATEX = jsonDiscFrghtConfig[x - 1]["totalPOAmntVATEX"];
            let totalPOAmntVATIN = jsonDiscFrghtConfig[x - 1]["totalPOAmntVATIN"];
            let totalSvngVATEX = jsonDiscFrghtConfig[x - 1]["totalSvngVATEX"];
            let orderTypeCode = jsonDiscFrghtConfig[x - 1]["orderTypeCode"];
            let orderTypeDesc = jsonDiscFrghtConfig[x - 1]["orderTypeDesc"];
            let vendorCode = jsonDiscFrghtConfig[x - 1]["vendorCode"];
            let vendorName = jsonDiscFrghtConfig[x - 1]["vendorName"];


            let CurrencyCode = jsonDiscFrghtConfig[x - 1]["CurrencyCode"];
            let CurrencyDesc = jsonDiscFrghtConfig[x - 1]["CurrencyDesc"];


            let vatCode = jsonDiscFrghtConfig[x - 1]["vatCode"];
            let vatDesc = jsonDiscFrghtConfig[x - 1]["vatDesc"];

            let ewtCode = jsonDiscFrghtConfig[x - 1]["ewtCode"];
            let ewtDesc = jsonDiscFrghtConfig[x - 1]["ewtDesc"];


            let vatRate = jsonDiscFrghtConfig[x - 1]["vatRate"];
            let ItemGroupType = jsonDiscFrghtConfig[x - 1]["ItemGroupType"];

            let addIndex = (maxRow - 1) + (x - 1);

            func_nwGrid_Insert("nwGrid", addIndex, false); //insert another row
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_SELECT}) input`).prop('checked', true);
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_ITEM_TYPE})`).html(prTag).enable(false);
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_ITEMCODE})`).html(itemCode).enable(false);
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_ITEMDESC})`).html(itemDesc).enable(false);

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_SPECNOTES}) button`).addClass("btnBlue").enable(false);

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_UOM})`).html(baseUOM).enable(false);
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_UOMDESC})`).html(baseUUOMDesc).enable(false);

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_PRQTY})`).html(setNumReplace(prQtyBeforePO, 5));

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_EXQTY}) input`).prop('checked', false).enable(false);


            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_POQTY})`).css("background-color", 'gainsboro');
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_POQTY}) input`).val(setNumReplace(QtyForPO, 5));

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_POQTY}) input`).css("background-color", "gainsboro").enable(false);



            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_LWST_QUOTE_UC_VATEX})`).html(setNumReplace(lwstQuoteUCVatex, 5));
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_LWST_QUOTE_UC_VATIN})`).html(setNumReplace(lwstQuoteUCVatex, 5));

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_POUNITCOST_VATEX}) input`).val(setNumReplace(POUCVATEX, 5));


            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_DISC_AMNT})`).css("background-color", 'gainsboro');
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_DISC_AMNT}) input`).val(setNumReplace(discAmntVATEX, 2));

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_DISC_AMNT}) input`).css("background-color", "gainsboro").enable(false);


            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_FRGHT_AMNT})`).css("background-color", 'gainsboro');
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_FRGHT_AMNT}) input`).val(setNumReplace(frghtAmntVATEX, 2));
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_FRGHT_AMNT}) input`).css("background-color", "gainsboro").enable(false);

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_POTOTALAMT_VATEX})`).html(setNumReplace(totalPOAmntVATEX, 2));
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_POTOTALAMT_VATIN})`).html(setNumReplace(totalPOAmntVATIN, 2));


            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_PO_SAVEAMNT_VATEX})`).html(setNumReplace(totalSvngVATEX, 2));

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_PO_SAVEAMNT_VATIN})`).html(setNumReplace(totalSvngVATIN, 2));


            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_ORDERTYPECODE})`).html(orderTypeCode);
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_ORDERTYPEDESC})`).html(orderTypeDesc);

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_VENDORCODE})`).html(vendorCode).enable(false);
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_VENDORNAME})`).html(vendorName).enable(false);

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_CURRENCY})`).html(CurrencyCode).enable(false);
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_CURRDESC})`).html(CurrencyDesc)

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_VATCODE})`).html(vatCode).enable(false);
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_VATDESC})`).html(vatDesc).enable(false);



            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_EWTCODE})`).html(ewtCode).enable(false);
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_EWTDESC})`).html(ewtDesc).enable(false);

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_VATRATE})`).html(vatRate);


            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_FACTOR})`).html(QtyForPO);
            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_ORIGUOM})`).html(baseUOM);

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_USELASTPOPRICE}) input`).prop('checked', false);

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_LASTPOAPPRVDATE})`).html();

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_CONSOPRLINEID})`).html(0);


            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_CANVASSDTLS})`).addClass("btnGray").enable(false);

            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_REVIEWATTACH})`).addClass("btnGray").enable(false);


            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_CONSOPRNO})`).html("").enable(false);


            $(`#nwGrid table tbody tr:eq(${addIndex + 1}) td:eq(${SPR_IGTCODE})`).html(ItemGroupType).enable(false);



        }
    }
};



$(document).on('click', '.btnViewReqEntry', function () {
    let docno = nwTempTable_RowData_Get("nwGridRRDCon", crnwTR.index(), SPR_RRD_REQDOCNO - 1);
    if (docno != "") {
        var fullength = "../../../RM/DocumentEntry/RMRequestEntry/RMRequestEntry.aspx?nwDocno=" + docno + "";

        nwLoading_Start('xBtnRequestEntry', crLoadingHTML);
        nwPopupForm_Create("nwReqEntryFrm", true, fullength);
        $('#nwReqEntryFrm .BoxTitle').text("Request Entry");
        $("#nwReqEntryFrm").css({ "min-width": "98%" });
        $("#nwReqEntryFrm").css({ "min-height": "98%" });
        nwPopupForm_ShowModal("nwReqEntryFrm");
        nwLoading_End('xBtnRequestEntry');
    }

});
$(document).on('click', '.btnVwDtls', function (e) {
    console.log("test button");
    var vendorCode = $(this).attr('id');
    if (vendorCode.length > 0) {
        ViewItemDetails(vendorCode);
        $('#nwPopItemDetailsWindow').addClass("zindexHigh"); $('#dimbgNWLoadHstTemplate').addClass("zindexHigh2");
    }
    return false;
});





function func_LookUpSelect(idName, idNum) {
    if (idName == "lugVendor") {
        console.log("test lookup");
    }
}
function ViewItemDetails(vendorCode) {
    nwLoading_Start("xItemdetails", crLoadingHTML);
    var fullength = "";
    var title = "";

    title = "Vendor Information";
    fullength = "../../../AP/DataSetup/APSupplierInformation/APSupplierInformation.aspx?nwIsReport=1&nwDocno=" + encodeURI(vendorCode);
    $('.nwmenuFrame').attr("src", fullength);

    nwPopupForm_Create("nwPopItemDetailsWindow", true, fullength);
    $('#nwPopItemDetailsWindow .BoxTitle').text(title);

    $("#nwPopItemDetailsWindow").css({ "min-width": "98%" });
    $("#nwPopItemDetailsWindow").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopItemDetailsWindow");
    $('.dimbgNWnwPopWindow').removeClass('openn');
    nwLoading_End('xItemdetails');
}

var ApplyPORowDiscIndex = 0;
var ApplyPORowFrghtIndex = 0;
$(document).on('focus click', ".txtPODtls_DISC_AMNT_VATIN", function () {
    ApplyPORowDiscIndex = crnwTR.index();
    ApplyPORowFrghtIndex = crnwTR.index();
});


$(document).on('change blur', ".txtPODtls_DISC_AMNT_VATIN", function () {
    let discAmntVATIN = parseFloat(getNum($(this).val().replace(/,/g, "")));
    let vatRate = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_TAX_RATE - 1)));
    let discAmntVATEX = discAmntVATIN / (1 + vatRate)
    nwTempTable_RowData_Set("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_DISC_AMNT_VATEX, 'input')(setNumReplace(discAmntVATEX, 5));


    let frghtAmntVATEX = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_FRGHT_AMNT_VATEX - 1, 'input')));
    let frghtAmntVATIN = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_FRGHT_AMNT_VATIN - 1, 'input')));

    setTotalPOAmountAfter(discAmntVATEX, discAmntVATIN, frghtAmntVATEX, frghtAmntVATIN);
});


$(document).on('focus click', ".txtPODtls_DISC_AMNT_VATEX", function () {
    ApplyPORowDiscIndex = crnwTR.index();
    ApplyPORowFrghtIndex = crnwTR.index();
});


$(document).on('change blur', ".txtPODtls_DISC_AMNT_VATEX", function () {
    let discAmntVATEX = parseFloat(getNum($(this).val().replace(/,/g, "")));
    let vatRate = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_TAX_RATE - 1)));
    let discAmntVATIN = discAmntVATEX * (1 + vatRate);
    nwTempTable_RowData_Set("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_DISC_AMNT_VATIN, 'input')(setNumReplace(discAmntVATIN, 5));




    let frghtAmntVATEX = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_FRGHT_AMNT_VATEX - 1, 'input')));
    let frghtAmntVATIN = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_FRGHT_AMNT_VATIN - 1, 'input')));

    setTotalPOAmountAfter(discAmntVATEX, discAmntVATIN, frghtAmntVATEX, frghtAmntVATIN);

});



$(document).on('focus click', ".txtPODtls_FRGHT_AMNT_VATIN", function () {
    ApplyPORowDiscIndex = crnwTR.index();
    ApplyPORowFrghtIndex = crnwTR.index();
});


$(document).on('change blur', ".txtPODtls_FRGHT_AMNT_VATIN", function () {
    let frghtAmntVATIN = parseFloat(getNum($(this).val().replace(/,/g, "")));
    let vatRate = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowFrghtIndex, SPR_PO_DTLS_TAX_RATE - 1)));
    let frghtAmntVATEX = frghtAmntVATIN / (1 + vatRate)
    nwTempTable_RowData_Set("nwGridApplyPODetailsCon", ApplyPORowFrghtIndex, SPR_PO_DTLS_FRGHT_AMNT_VATEX, 'input')(setNumReplace(frghtAmntVATEX, 5));



    let discAmntVATEX = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_DISC_AMNT_VATEX - 1, 'input')));
    let discAmntVATIN = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_DISC_AMNT_VATIN - 1, 'input')));

    setTotalPOAmountAfter(discAmntVATEX, discAmntVATIN, frghtAmntVATEX, frghtAmntVATIN);

});


$(document).on('focus click', ".txtPODtls_FRGHT_AMNT_VATEX", function () {
    ApplyPORowDiscIndex = crnwTR.index();
    ApplyPORowFrghtIndex = crnwTR.index();
});


$(document).on('change blur', ".txtPODtls_FRGHT_AMNT_VATEX", function () {
    let frghtAmntVATEX = parseFloat(getNum($(this).val().replace(/,/g, "")));
    let vatRate = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowFrghtIndex, SPR_PO_DTLS_TAX_RATE - 1)));
    let frghtAmntVATIN = frghtAmntVATEX * (1 + vatRate);
    nwTempTable_RowData_Set("nwGridApplyPODetailsCon", ApplyPORowFrghtIndex, SPR_PO_DTLS_FRGHT_AMNT_VATIN, 'input')(setNumReplace(frghtAmntVATIN, 5));

    let discAmntVATEX = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_DISC_AMNT_VATEX - 1, 'input')));
    let discAmntVATIN = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_DISC_AMNT_VATIN - 1, 'input')));

    setTotalPOAmountAfter(discAmntVATEX, discAmntVATIN, frghtAmntVATEX, frghtAmntVATIN);

});





function setTotalPOAmountAfter(discVATEX, discVATIN, frghtVATEX, frghtVATIN) {
    let TotalPOAmntBeforeDiscVATIN = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_AMNT_VATIN_BEFORE_DISC_FRHT - 1, 'input')));

    let TotalPOAmntBeforeDiscVATEX = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_AMNT_VATEX_BEFORE_DISC_FRHT - 1, 'input')));



    let taxRate = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_TAX_RATE - 1)));

    let totalPOAmntAfterDiscVATEX = (TotalPOAmntBeforeDiscVATEX - discVATEX) + frghtVATEX;



    let totalPOAmntAfterDiscVATIN = (TotalPOAmntBeforeDiscVATIN - discVATIN) + frghtVATIN;

    if (frghtVATIN == 0 && discVATIN == 0) {
        totalPOAmntAfterDiscVATIN = TotalPOAmntBeforeDiscVATIN;
    }

    nwTempTable_RowData_Set("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_AMNT_VATEX_AFTER_DISC_FRHT, 'input')(setNumReplace(totalPOAmntAfterDiscVATEX, 2));
    nwTempTable_RowData_Set("nwGridApplyPODetailsCon", ApplyPORowDiscIndex, SPR_PO_DTLS_AMNT_VATIN_AFTER_DISC_FRHT, 'input')(setNumReplace(totalPOAmntAfterDiscVATIN, 2));
}

var xIndex = 0;
$(document).on('focus click', '.numDiscAmnt', function () {
    xIndex = crnwTR.index();
});

$(document).on('change focusout blur', '.numDiscAmnt', function () {
    let qtyForPO = parseFloat(getNumReplace(getNum(nwTempTable_RowData_Get("nwGrid", xIndex, SPR_POQTY - 1, 'input'))));
    let uCost = parseFloat(getNumReplace(getNum(nwTempTable_RowData_Get("nwGrid", xIndex, SPR_POUNITCOST_VATEX - 1, 'input'))));


    let uCostVATIN = parseFloat(getNumReplace(getNum(nwTempTable_RowData_Get("nwGrid", xIndex, SPR_POUNITCOSTVATIN - 1, 'input'))));

    let frgtAmnt = parseFloat(getNumReplace(getNum(nwTempTable_RowData_Get("nwGrid", xIndex, SPR_FRGHT_AMNT - 1, 'input'))));
    let dscAmnt = parseFloat(getNumReplace(getNum($(this).val())));

    let vatrate = getNumReplace(getNum($("#txtVATRate").val()));
    let currTotal = (qtyForPO * uCost);


    let currTotalVATIN = (qtyForPO * uCostVATIN);

    let totalPOAmnt = (currTotal - dscAmnt) + frgtAmnt;

    let ucostVATIN = uCost * (1 + vatrate);


    let frgtAmntVATIN = getNumReplace(getNum(frgtAmnt * (1 + vatrate))).toFixed(5);
    let dscAmntVATIN = getNumReplace(getNum(dscAmnt * (1 + vatrate))).toFixed(5);


   



    let totalucostVATIN = ((ucostVATIN * qtyForPO) - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN);
    let totalucostVATEX = ((qtyForPO * uCost) - dscAmnt) + frgtAmnt;
    let addvat = totalucostVATIN - totalucostVATEX;
    //let addvat = totalucostVATEX * parseFloat(vatrate);




    //let grossamt = totalucostVATEX + addvat;
    let grossamt = ((ucostVATIN * qtyForPO) - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN)
    nwTempTable_RowData_Set("nwGrid", xIndex, SPR_POTOTALAMT_VATEX)(setNumReplace(addThousandSep(totalPOAmnt), 2));
    nwTempTable_RowData_Set("nwGrid", xIndex, SPR_POTOTALAMT_VATIN)(setNumReplace(addThousandSep(grossamt), 2));
    $('#txtTotalPOAmtVATEX').val(setNumReplace(totalucostVATEX, 2));
    $('#txtTotalDiscAmnt').val(setNumReplace(dscAmnt, 5));
    $("#txtTotalFrgtAmnt").val(setNumReplace(frgtAmnt, 5));
    $('#txtAddVAT').val(setNumReplace(addvat, 2));
    $('#txtGrossAmtVATIN').val(setNumReplace(grossamt, 2));
});


$(document).on('focus click', '.numFrghtAmnt', function () {
    xIndex = crnwTR.index();
});

$(document).on('change focusout blur', '.numFrghtAmnt', function () {
    let qtyForPO = parseFloat(getNumReplace(getNum(nwTempTable_RowData_Get("nwGrid", xIndex, SPR_POQTY - 1, 'input'))));
    let uCost = parseFloat(getNumReplace(getNum(nwTempTable_RowData_Get("nwGrid", xIndex, SPR_POUNITCOST_VATEX - 1, 'input'))));

    let frgtAmnt = parseFloat(getNumReplace(getNum($(this).val())));
    let dscAmnt = parseFloat(getNumReplace(getNum(nwTempTable_RowData_Get("nwGrid", xIndex, SPR_DISC_AMNT - 1, 'input'))));
    let vatrate = getNumReplace(getNum($("#txtVATRate").val()));

    let currTotal = (qtyForPO * uCost);

    let ucostVATIN = uCost * (1 + vatrate);

    let totalPOAmnt = (currTotal - dscAmnt) + frgtAmnt;


    let frgtAmntVATIN = getNumReplace(getNum(frgtAmnt * (1 + vatrate))).toFixed(5);
    let dscAmntVATIN = getNumReplace(getNum(dscAmnt * (1 + vatrate))).toFixed(5);

    let totalucostVATIN = ((ucostVATIN * qtyForPO) - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN);
    let totalucostVATEX = ((qtyForPO * uCost) - dscAmnt) + frgtAmnt;
    let addvat = totalucostVATIN - totalucostVATEX;
    //let addvat = totalucostVATEX * parseFloat(vatrate);

 


    //let grossamt = totalucostVATEX + addvat;
    let grossamt = ((ucostVATIN * qtyForPO) - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN)


    nwTempTable_RowData_Set("nwGrid", xIndex, SPR_POTOTALAMT_VATEX)(setNumReplace(addThousandSep(totalPOAmnt), 2));
    nwTempTable_RowData_Set("nwGrid", xIndex, SPR_POTOTALAMT_VATIN)(setNumReplace(addThousandSep(grossamt), 2));
    $('#txtTotalDiscAmnt').val(setNumReplace(dscAmnt, 5));
    $("#txtTotalFrgtAmnt").val(setNumReplace(frgtAmnt, 5));

    $('#txtTotalPOAmtVATEX').val(setNumReplace(totalucostVATEX, 2));
    $('#txtAddVAT').val(setNumReplace(addvat, 2));
    $('#txtGrossAmtVATIN').val(setNumReplace(grossamt, 2));
});






function generateComboBox() {

    let maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();   
    let xOption = "";
    for (let x = 0; x < maxRow; x++) {

        //let itemDesc = nwTempTable_RowData_Get("nwGridCon", x, SPR_ITEMDESC - 1);
        let itemDesc = nwGridCon_Book.ActiveSheet.GetValue(SPR_ITEMDESC - 1, x);
        if (itemDesc != "") {
            xOption += `<option value='${x}'>Row ${x + 1} - ${itemDesc}</option>`;
        }
    }
    $('#cboxRowNumber').html(xOption);
}
$(document).on('change', '#cboxRowNumber', function () {
    let row = $(this).val();
    func_nwGrid_SetSelected("nwGridCon", SPR_ITEMDESC, row);
    $(`#nwGridCon table tbody tr:eq(${row}) td:eq(${SPR_ITEMDESC})`).click();
});


function closeIframeFromPurchaseOrder() {
    try {
        if (window.top != window.self) { //check if the menu item is in iframe
            //the parent is the menu item that call the other menu item in iframe
            parent.closePOAwrdEntry();
        }
    } catch (err) {
        console.log(err);
    }
}
function closeConsoPR() {
    try {
        window_close('nwPopWindowConsoPR');
    } catch (err) {
        console.log(err);
    }
}

function setDefaultFilter(code) {
    let xHtml = `<div class="spantext nwCuz133" nwcode="${code}">${code}</div>`;
    $('.atlContainer.atlContainer .innertext').append(xHtml);
}

function getPRUnitCost() {
    let xArr = [];
    let maxRow = nwTempTable_Row_Count("nwGridRRDCon");
    if (maxRow > 0) {
        for (let x = 0; x < maxRow; x++) {
            let prUC = getNumReplace(getNum(nwTempTable_RowData_Get("nwGridRRDCon", 0, SPR_RRD_PRUNITCOSTVATEX - 1)));
            xArr.push(prUC);
        }
    } else {
        xArr.push(0);
    }
    return Math.min.apply(null, xArr);
}



$(document).on('click', '#btnConso_PR', function (e) {
    var fullength = "";
    var title = "";
    var docno = "";

    title = "Consolidate PR";
    fullength = "../../../PO/DocumentEntry/POConsolidatePREntry/POConsolidatePREntry.aspx?isLink=1";
    $('.nwmenuFrame').attr("src", fullength);

    nwPopupForm_Create("nwPopWindowConsoPR", true, fullength);
    $('#nwPopWindowConsoPR .BoxTitle').text(title);

    $("#nwPopWindowConsoPR").css({ "min-width": "98%" });
    $("#nwPopWindowConsoPR").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopWindowConsoPR");
    $('.dimbgNWnwPopWindow').removeClass('openn');
});

function setDelDtls() {
    let uom = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_UOM + 1) + ')').text();
    let uomdesc = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_UOMDESC + 1) + ')').text();
    let origuom = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_ORIGUOM + 1) + ')').text();
    let origuomdesc = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_ORIGUOMDESC + 1) + ')').text();
    let factor = getNumReplace($('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_FACTOR + 1) + ')').text());
    let qtyPO = getNumReplace($('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_POQTY + 1) + ') input').val());
    let qtyPO_orig = getNumReplace($('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_ORIGPOQTY + 1) + ')').text());
    let prconso = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_CONSOPRNO + 1) + ')').text();
    let itemcode = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_ITEMCODE + 1) + ')').text();
    let vendor = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_VENDORCODE + 1) + ')').text();
    let baseQty = $('#nwGrid .tblGridBody tr:nth-child(' + (_crnwTR.index() + 1) + ') td:nth-child(' + (SPR_BASEQTY + 1) + ')').text();
    let excessQty = 0, qtyPOBase = 0;

    nwGrid = $("#nwGridDDCon .tblGridBody");
    var len = nwGrid.find('tr').length;

    for (var x = 0; x <= len - 1; x++) {
        //let dd_qtyPO = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPO_ORIG + ') input').val());
        //let dd_qtyPR = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPR_ORIG + ')').text());

        let dd_qtyPO = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_POQTY + ')').text());
        let dd_qtyPR = getNumReplace(nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPR_ORIG + ')').text());
        let new_ddQtyPO = 0, new_ddQtyPR = 0, new_ddQtyRem = 0, new_QtyExcess = 0;

        new_ddQtyPO = dd_qtyPO / factor;
        new_ddQtyPR = dd_qtyPR / factor;
        //new_ddQtyPO = qtyPO_orig / factor;
        //new_ddQtyPR = qtyPO_orig / factor;

        nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_QTYPO + ') input').val(setNumReplace(new_ddQtyPO, 5));
        nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRQTY + ')').text(setNumReplace(new_ddQtyPR, 5));
        nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_POUOMCODE + ')').text(uom);
        nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_UOM + ')').text(uomdesc);
        nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_LOCATION + ')').enable(false);
        nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_SUBLOC + ')').enable(false);
        nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_VENDOR + ')').text(vendor);
        //nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_EXQTY + ')').text(setNumReplace(new_QtyExcess, 5));

        let prconso = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRCONSO + ')').text();
        let itemCode = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_ITEMCODE + ')').text();
        var prLineID = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_PRLINEID + ')').text();
        let ddRowno = nwGrid.find('tr:eq(' + x + ') td:eq(' + SPR_DD_ROWNO + ')').text();

        StoreUpdatedJson_DD(prconso + itemCode + prLineID + ddRowno + vendor + (_crnwTR.index() + 1));
        nwJsonUpdateValue_DD(jsonDelDtls, x);
    }
}
function disablePODetailsTotalAmnt() {
    $('.txtPODtlsAmntVATEXBeforeDiscFrght').enable(false);
    $('.txtPODtlsAmntVATINBeforeDiscFrght').enable(false);
    $('.txtPODtlsAmntVATEXAfterDiscFrght').enable(false);
    $('.txtPODtlsAmntVATINAfterDiscFrght').enable(false);
}
$(document).on('click', '.btnReviewAttach', function () {
    if ($(this).attr('class').includes("btnGray")) {
        return false;
    }
    var docno = $('#txtDocno').val();

    let prDocno = nwTempTable_RowData_Get("nwGrid", crnwTR.index(), SPR_CONSOPRNO - 1);

    if (prDocno == "") {
        MessageBox("Cannot proceed. Data should be saved first", Title, 'error');
        return false;
    }
    var isView = nwDocno != "" ? true : false;
    if ($('#btnReqComp').attr('class').includes("btnGreen")) {
        var fullength = `../../../DC/DataSetup/DCViewAttachment/DCViewAttachment.aspx?nwCurrDocno=${encodeURI(prDocno)}&nwDocno=${encodeURI(docno)}&isView=${isView}`;

    } else {
        var fullength = `../../../DC/DataSetup/DCViewAttachment/DCViewAttachment.aspx?nwCurrDocno=${encodeURI(docno)}&nwDocno=${encodeURI(prDocno)}&isView=${isView}`;
    }
    fullength = `../../../DC/DataSetup/DCViewAttachment/DCViewAttachment.aspx?nwDocno=${encodeURI(prDocno)}&isView=${isView}`;

    nwLoading_Start('xbtnRvwAttach', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRvwAttach", true, fullength);
    $('#nwPopUpRvwAttach .BoxTitle').text("Review Attachment(s)");
    $("#nwPopUpRvwAttach").css({ "min-width": "98%" });
    $("#nwPopUpRvwAttach").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpRvwAttach");
    nwLoading_End('xbtnRvwAttach');
});

$(document).on('click', '.isGenAsOnePO', function () {
    tickGenerateAsOnePO();
});


function disableFieldsOnPODetails(row) {
    let nwGridApply = $(`#nwGridApplyPODetailsCon table tbody tr:eq(${row})`);

    nwGridApply.find(`td:eq(${SPR_PO_DTLS_IS_GEN_AS_1_PO}) input`).prop('checked', true);


    let vendCode = nwGridApply.find(`td:eq(${SPR_PO_DTLS_VENDOR_CODE})`).html();
    let prConso = nwGridApply.find(`td:eq(${SPR_PO_DTLS_PRCONSO_CODE})`).html();

    let defValue = $(`#nwGridApplyPODetailsCon table tbody tr:eq(${firstRowPerVendorConso[vendCode + prConso]})`);

    let payCatCode = defValue.find(`td:eq(${SPR_PO_DTLS_PAY_CAT_CODE})`).html();
    let payCatDesc = defValue.find(`td:eq(${SPR_PO_DTLS_PAY_CAT})`).html();


    //clear payment category and payment term
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_CAT})`).html(payCatDesc).css('background-color', 'gainsboro').enable(false);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_CAT_CODE})`).html(payCatCode).css('background-color', 'gainsboro').enable(false);


    let payTermCode = defValue.find(`td:eq(${SPR_PO_DTLS_PAY_TERM_CODE})`).html();
    let payTermDesc = defValue.find(`td:eq(${SPR_PO_DTLS_PAY_TERM})`).html();

    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_TERM})`).html(payTermDesc).css('background-color', 'gainsboro').enable(false);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_TERM_CODE})`).html(payTermCode).css('background-color', 'gainsboro').enable(false);


    //nwGridApply.find(`td:eq(${SPR_PO_DTLS_AMNT_VATEX_BEFORE_DISC_FRHT}) input`).val('');
    //nwGridApply.find(`td:eq(${SPR_PO_DTLS_AMNT_VATIN_BEFORE_DISC_FRHT}) input`).val('');

    //nwGridApply.find(`td:eq(${SPR_PO_DTLS_AMNT_VATEX_AFTER_DISC_FRHT}) input`).val('');
    //nwGridApply.find(`td:eq(${SPR_PO_DTLS_AMNT_VATIN_AFTER_DISC_FRHT}) input`).val('');


    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_COMP})`).removeClass("btnBlue").removeClass("btnGreen").addClass("btnGray");
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_COMP})`).enable(false);





    //$(`#nwGridApplyPODetailsCon table tbody tr:eq(${x}) td:eq(${SPR_PO_DTLS_IS_GEN_AS_1_PO}) input`).prop('checked', true);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_DISC_AMNT_VATEX})`).val('').css('background-color', 'gainsboro').enable(false);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_DISC_AMNT_VATEX}) input`).val('').css('background-color', 'gainsboro').enable(false);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_DISC_AMNT_VATIN})`).val('').css('background-color', 'gainsboro').enable(false);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_DISC_AMNT_VATIN}) input`).val('').css('background-color', 'gainsboro').enable(false);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATEX})`).val('').css('background-color', 'gainsboro').enable(false);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATEX}) input`).val('').css('background-color', 'gainsboro').enable(false);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATIN})`).val('').css('background-color', 'gainsboro').enable(false);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATIN}) input`).val('').css('background-color', 'gainsboro').enable(false);


    let particulars = defValue.find(`td:eq(${SPR_PO_DTLS_PARTICULARS}) input`).val();


    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PARTICULARS})`).css('background-color', 'gainsboro').enable(false);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PARTICULARS}) input`).val(particulars).css('background-color', 'gainsboro').enable(false);

    let other_pay_remarks = defValue.find(`td:eq(${SPR_PO_DTLS_OTHER_PAY_REMARKS}) input`).val();

    nwGridApply.find(`td:eq(${SPR_PO_DTLS_OTHER_PAY_REMARKS})`).css('background-color', 'gainsboro').enable(false);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_OTHER_PAY_REMARKS}) input`).val(other_pay_remarks).css('background-color', 'gainsboro').enable(false);

    let del_instructions = defValue.find(`td:eq(${SPR_PO_DTLS_DEL_INS}) input`).val();

    nwGridApply.find(`td:eq(${SPR_PO_DTLS_DEL_INS})`).css('background-color', 'gainsboro').enable(false);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_DEL_INS}) input`).val(del_instructions).css('background-color', 'gainsboro').enable(false);
}
function enableFieldsOnPODetails(row) {
    let nwGridApply = $(`#nwGridApplyPODetailsCon table tbody tr:eq(${row})`);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_IS_GEN_AS_1_PO}) input`).prop('checked', false);



    let dfault_PAY_CAT = nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_CAT_DEFAULT})`).html();
    let dfault_PAY_CAT_CODE = nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_CAT_CODE_DEFAULT})`).html();

    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_CAT})`).html(dfault_PAY_CAT).css('background-color', 'cyan').enable(true);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_CAT_CODE})`).html(dfault_PAY_CAT_CODE)


    let dfault_PAY_TERM = nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_TERM_DEFAULT})`).html();
    let dfault_PAY_TERM_CODE = nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_TERM_CODE_DEFAULT})`).html();

    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_TERM})`).html(dfault_PAY_TERM).css('background-color', 'cyan').enable(true);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_TERM_CODE})`).html(dfault_PAY_TERM_CODE);


    nwGridApply.find(`td:eq(${SPR_PO_DTLS_HAS_PAY_COMP})`).html(0);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_IS_PAY_COMP})`).html(0);

    let dfault_total_amnt_VATEX = setNumReplace(nwGridApply.find(`td:eq(${SPR_PO_DTLS_AMNT_VATEX_BEFORE_DISC_FRHT_DEFAULT}) input`).val(), 2);

    let dfault_total_amnt_VATIN = setNumReplace(nwGridApply.find(`td:eq(${SPR_PO_DTLS_AMNT_VATIN_BEFORE_DISC_FRHT_DEFAULT}) input`).val(), 2);

    nwGridApply.find(`td:eq(${SPR_PO_DTLS_AMNT_VATEX_BEFORE_DISC_FRHT}) input`).val(dfault_total_amnt_VATEX);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_AMNT_VATIN_BEFORE_DISC_FRHT}) input`).val(dfault_total_amnt_VATIN);

    nwGridApply.find(`td:eq(${SPR_PO_DTLS_AMNT_VATEX_AFTER_DISC_FRHT}) input`).val(dfault_total_amnt_VATEX);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_AMNT_VATIN_AFTER_DISC_FRHT}) input`).val(dfault_total_amnt_VATIN);


    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_COMP})`).removeClass("btnBlue").removeClass("btnGreen").addClass("btnGray");
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PAY_COMP})`).enable(true);



    nwGridApply.find(`td:eq(${SPR_PO_DTLS_DISC_AMNT_VATEX}) `).css('background-color', 'white').enable(true);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_DISC_AMNT_VATEX}) input`).css('background-color', 'white').enable(true);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_DISC_AMNT_VATIN}) `).css('background-color', 'white').enable(true);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_DISC_AMNT_VATIN}) input`).css('background-color', 'white').enable(true);

    nwGridApply.find(`td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATEX}) `).css('background-color', 'white').enable(true);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATEX}) input`).css('background-color', 'white').enable(true);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATIN}) `).css('background-color', 'white').enable(true);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATIN}) input`).css('background-color', 'white').enable(true);

    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PARTICULARS}) `).css('background-color', 'white').enable(true);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_PARTICULARS}) input`).css('background-color', 'white').enable(true);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_OTHER_PAY_REMARKS}) `).css('background-color', 'white').enable(true);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_OTHER_PAY_REMARKS}) input`).css('background-color', 'white').enable(true);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_DEL_INS}) `).css('background-color', 'white').enable(true);
    nwGridApply.find(`td:eq(${SPR_PO_DTLS_DEL_INS}) input`).css('background-color', 'white').enable(true);
}

var firstRowPerVendorConso = [];

function tickGenerateAsOnePO() {
    let maxRow = nwTempTable_Row_Count("nwGridApplyPODetailsCon");
    let vendorWithItemType = [];
    for (let i = 0; i < maxRow; i++) {
        console.log('vendorWithItemType is running');
        let vendor = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", i, SPR_PO_DTLS_VENDOR_CODE - 1);
        let prconso = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", i, SPR_PO_DTLS_PRCONSO_CODE - 1);
        if (vendorWithItemType[vendor + prconso] == undefined) { //if the index is not yet on array, insert the index
            vendorWithItemType[vendor + prconso] = 1;
        } else {// if the index is already on the array, increment the value
            vendorWithItemType[vendor + prconso] += 1;
        }

    }

    let currIndex = crnwTR.index();
    let currVendor = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", currIndex, SPR_PO_DTLS_VENDOR_CODE - 1);
    let currprconso = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", currIndex, SPR_PO_DTLS_PRCONSO_CODE - 1);
    let idString = currVendor + currprconso;
    let isGenPO = $(`#nwGridApplyPODetailsCon table tbody tr:eq(${currIndex}) td:eq(${SPR_PO_DTLS_IS_GEN_AS_1_PO}) input`).prop('checked');
    if (currVendor != "" && vendorWithItemType[idString] != undefined) {
        if (vendorWithItemType[idString] == 2) {
            //means auto tick
            for (let x = 0; x < maxRow; x++) {
                console.log('item type 2 is running');
                let vendor = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", x, SPR_PO_DTLS_VENDOR_CODE - 1);
                let itemType = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", x, SPR_PO_DTLS_ITEMTYPE_CODE - 1);
                let prconso = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", x, SPR_PO_DTLS_PRCONSO_CODE - 1);
                if ((vendor + prconso) == (idString)) {
                    if (firstRowPerVendorConso[idString] == undefined) {
                        firstRowPerVendorConso[idString] = x;// get the first occurance row of vendor
                    }
                    if (isGenPO) {
                        if (firstRowPerVendorConso[idString] != x) {
                            disableFieldsOnPODetails(x);
                        } else {
                            $(`#nwGridApplyPODetailsCon table tbody tr:eq(${x}) td:eq(${SPR_PO_DTLS_IS_GEN_AS_1_PO}) input`).prop('checked', true);
                        }
                    } else {
                        //$(`#nwGridApplyPODetailsCon table tbody tr:eq(${x}) td:eq(${SPR_PO_DTLS_IS_GEN_AS_1_PO}) input`).prop('checked', false);
                        if (firstRowPerVendorConso[idString] != x) {
                            enableFieldsOnPODetails(x);
                        }

                    }
                }
            }
        } else if (vendorWithItemType[idString] == 3) { //fix item type max 3
            let itemTypeTickPerVendor = [];
            for (let x = 0; x < maxRow; x++) {
                console.log('item type 3 is running');
                let vendor = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", x, SPR_PO_DTLS_VENDOR_CODE - 1);

                let prconso = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", x, SPR_PO_DTLS_PRCONSO_CODE - 1);
                if ((vendor + prconso) == (idString)) {
                    if (firstRowPerVendorConso[idString] == undefined) {
                        firstRowPerVendorConso[idString] = x;// get the first occurance row of vendor
                    }
                    let isGenPO = $(`#nwGridApplyPODetailsCon table tbody tr:eq(${x}) td:eq(${SPR_PO_DTLS_IS_GEN_AS_1_PO}) input`).prop('checked');
                    if (isGenPO) {
                        if (itemTypeTickPerVendor[idString] == undefined) {
                            itemTypeTickPerVendor[idString] = 1;
                        } else {
                            itemTypeTickPerVendor[idString] += 1;
                        }
                        if (x != 0) {
                            disableFieldsOnPODetails(x);
                        }

                    } else {
                        if (firstRowPerVendorConso[idString] != x) {
                            enableFieldsOnPODetails(x);
                        }
                    }
                    if (itemTypeTickPerVendor[idString] != undefined && itemTypeTickPerVendor[idString] == 3) {
                        $(`#nwGridApplyPODetailsCon table tbody tr:eq(${firstRowPerVendorConso[idString]}) td:eq(${SPR_PO_DTLS_IS_GEN_AS_1_PO}) input`).prop('checked', false);
                    }

                }
            }
        }
    }
}

function chkGenerateAsOnePO() {
    let maxRow = nwTempTable_Row_Count("nwGridApplyPODetailsCon");
    let vendorWithItemType = {};
    for (let i = 0; i < maxRow; i++) {
        let vendor = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", i, SPR_PO_DTLS_VENDOR_CODE - 1);
        let itemType = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", i, SPR_PO_DTLS_ITEMTYPE_CODE - 1);
        if (vendorWithItemType[vendor] == undefined) { //if the index is not yet on array, insert the index
            vendorWithItemType[vendor] = 1;
        } else {// if the index is already on the array, increment the value
            vendorWithItemType[vendor] += 1;
        }


        let isService = nwTempTable_RowData_Get("nwGridApplyPODetailsCon", i, SPR_PO_DTLS_IS_SERVICE - 1);
        if (isService == "1") {
            $(`#nwGridApplyPODetailsCon tr:eq(${i}) td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATEX})`).css("background-color", "gainsboro");
            $(`#nwGridApplyPODetailsCon tr:eq(${i}) td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATEX}) input`).css("background-color", "gainsboro").enable(false);
            $(`#nwGridApplyPODetailsCon tr:eq(${i}) td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATIN})`).css("background-color", "gainsboro");
            $(`#nwGridApplyPODetailsCon tr:eq(${i}) td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATIN}) input`).css("background-color", "gainsboro").enable(false);
        } else {
            $(`#nwGridApplyPODetailsCon tr:eq(${i}) td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATEX})`).css("background-color", "white");
            $(`#nwGridApplyPODetailsCon tr:eq(${i}) td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATEX}) input`).css("background-color", "white").enable(true);
            $(`#nwGridApplyPODetailsCon tr:eq(${i}) td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATIN})`).css("background-color", "white");
            $(`#nwGridApplyPODetailsCon tr:eq(${i}) td:eq(${SPR_PO_DTLS_FRGHT_AMNT_VATIN}) input`).css("background-color", "white").enable(true);
        }
    }

    for (let key of Object.keys(vendorWithItemType)) {
        if (vendorWithItemType[key] <= 1) {
            for (let x = 0; x < maxRow; x++) {
                $(`#nwGridApplyPODetailsCon table tbody tr:eq(${x}) td:eq(${SPR_PO_DTLS_IS_GEN_AS_1_PO}) input`).prop('checked', false).enable(false);
            }
        }
    }
}
$(document).on('click', "#btnUpdateunaccreditedVendor", function () {
    nwLoading_Start("actCreateGridUpdateunaccreditedVendor", crLoadingHTML);
    nwPopupForm_ShowModal("UpdateunaccreditedVendor");
    cust_GetPara();
    func_ActionDriven("actCreateGridUpdateunaccreditedVendor", false);
});
$(document).on('click', '#btnSaveUpdateunaccreditedVendor', function () {
    msgBoxContainerQuestion = "btnSaveUpdateunaccreditedVendor";
    parent_MessageBoxQuestion("Would you like to save the current record(s)?", Title, "Question");
    return true;
});

$(document).on('change', '#fileCon', function () {
    changeFile($(this)[0]);
});

$(document).on('click', '#btnupload', function () {
    upload();
});
function triggerKeypressOnPODtls() {
    $('.txtPODtls_Particulars').trigger('keypress');
    $('.txtPODtls_OthrPayRemrks').trigger('keypress');
    $('.txtPODtls_DelInstructions').trigger('keypress');
}
$(document).on('keypress', '.txtPODtls_Particulars, .txtPODtls_OthrPayRemrks, .txtPODtls_DelInstructions', function () {
    if (remarksConfig == "True") {
        $(this).css("text-transform", "uppercase");
    } else {
        $(this).css("text-transform", "none");
    }
});


function clearSubWindows() {
    nwGrid_RemoveRow("nwGridDDCon", 0, $("#nwGridDDCon .tblGridBody tr").length);
    nwGrid_RemoveRow("nwGridBCDCon", 0, $("#nwGridBCDCon .tblGridBody tr").length);
    nwGrid_RemoveRow("nwGridRRDCon", 0, $("#nwGridRRDCon .tblGridBody tr").length);
    nwGrid_RemoveRow("nwGridPPHCon", 0, $("#nwGridPPHCon .tblGridBody tr").length);
    ClearPOItemAndCostDtls();
}
var gblTxtValueDate;

$(document).on('focus', '#txtValueDate', function () {
    gblTxtValueDate = $(this).val();
});



$(document).on('change', '#txtValueDate', function () {
    let effectiveDate = $(this).val();
    let tag = isEffectiveWithPeriodDates(effectiveDate)

    if (effectiveDate == "") {
        return false;
    }

    if (gblTxtValueDate != effectiveDate) {
        let prConList = $(".atlContainer").find(".innertext .spantext").text();
        if (prConList != "") {
            msgBoxContainerQuestion = "btnClearConsoList";
            parent_MessageBoxQuestion("This will reset the selected PR Consolidation No. and line details. Do you wish to continue? ", Title, "Question");

            return false;
        }
    }

    if (Date.parse(effectiveDate) > Date.parse($('#txtServerdate').val())) {
        MessageBox("Cannot proceed. Value Date should not be later than the current server date.", Title, "error");
        $(this).val('');
        $(this).focus();
        return;
    } else if (tag == 0) {
        MessageBox("Cannot proceed. Value Date should be within the set period dates.", Title, 'error');
        $(this).val('');
        return;
    }
    //else if (tag == 2) {
    //    MessageBox("Cannot proceed. Period is already closed.", Title, 'error');
    //    $(this).val('');
    //}
    nwParameter_Add("idvallugLocation", $('#idvallugLocation').val());
    nwParameter_Add("txtValueDate", $('#txtValueDate').val());
    func_ActionDriven("actValDate", false);
});

function isEffectiveWithPeriodDates(effectiveDate) {
    let dateArr = effectiveDate.split("/");
    //let isEffectiveWithPeriodDates = false;
    let dateTag = 0; //tag 1 do not validate, tag 0, not in period dates, tag 2 period no is closed
    if (jsonPerDates.length <= 0) {
        //isEffectiveWithPeriodDates = true;
        dateTag = 1
    } else {
        let loc = $('#idvallugLocation').val();
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


function setDefaultDate() {
    $('#txtValueDate').val($('#txtServerdate').val());
    $('#txtValueDate').trigger('change');
    $('#txtValueDate').trigger('focusout');
}

function getMaxAltID() {
    let maxAltID = 0;
    let maxRow = nwTempTable_Row_Count("nwGrid");
    for (let i = 0; i < maxRow; i++) {
        let altMaxID = parseInt(nwTempTable_RowData_Get("nwGrid", i, SPR_ALT_LINEID - 1));
        if (altMaxID > maxAltID) {
            maxAltID = altMaxID;
        }
    }
    return maxAltID;
}
$(document).on("focus", ".txtLINUnitCostVATEX,.txtLINUnitCostVATIN", function () {
    _crnwTR = crnwTR;
});

function ComputeGridAmounts() {
    nwGrid = $("#nwGrid .tblGridBody");
    var len = nwGrid.find('tr').length;
    for (var x = 0; x <= len - 1; x++) {       
        let vatrate = getNumReplace(getNum(nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_VATRATE + ")").text()));
        let ucostVATIN = getNumReplace(getNum(nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_POUNITCOSTVATIN + ") input").val()));
        let qty = getNumReplace(getNum(nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_POQTY + ") input").val()));
        let origVATEX = getNumReplace(getNum(nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_LASTPOPRICE + ")").text()));
        let ucostVATEX = 0.00000, totalucostVATEX = 0.00, totalucostVATIN = 0.00, addvat = 0.00, grossamt = 0.00, canvassUCost = 0.00000;
        let discAmnt = getNumReplace(getNum(nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_DISC_AMNT + ") input").val()));
        let frghAmnt = getNumReplace(getNum(nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_FRGHT_AMNT + ") input").val()));

        ucostVATEX = getNumReplace(getNum((ucostVATIN / (1 + vatrate)).toFixed(5)));
        //check if Unit cost is higher than the PR Amount
        let prUnitCost = getPRUnitCost();
        var recuser = $("#txtRecuser").val();
        var prconso = nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_CONSOPRNO + ")").text();
        var item = nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_ITEMCODE + ")").text();

        jsonTmpx = jsonCanvassDtls.filter(i =>(i.recuser + i.prconso + i.itemCode) == recuser + prconso + item);
        if (jsonTmpx.length > 0 && jsonTmpx != undefined) {
            canvassUCost = getNumReplace(getNum(jsonTmpx[0]["ucostVATIN"]));
        }

        //if (ucostVATIN > canvassUCost && jsonTmpx.length > 0) {
        //    MessageBox("PO Unit Cost (VATIN) should not be greater than the Canvassed Unit Cost.\n", Title, 'error');
        //    $(this).val(glbPOUnitCostVATIN);
        //    $('#txtPOUCostVATEX').val(glbPOUnitCostVATEX);
        //    ucostVATEX = glbPOUnitCostVATEX;
        //    ucostVATIN = glbPOUnitCostVATIN;
        //} else if (ucostVATEX > prUnitCost) {
        //    MessageBox("PO Unit Cost is greater than the PR Unit Cost.\n", Title, 'info');
        //}

        totalucostVATEX = ((ucostVATEX * qty) - discAmnt) + frghAmnt;
        //totalucostVATIN = ucostVATIN * qty;
        totalucostVATIN = ((ucostVATIN * qty) - discAmnt) + ((frghAmnt * vatrate) + frghAmnt);
        addvat = totalucostVATIN - totalucostVATEX;

        //addvat = totalucostVATEX * parseFloat(vatrate);
        grossamt = totalucostVATEX + addvat;

        //UseLastPOPrice(ucostVATEX, origVATEX);
        let lwstQuoute = 0;
        let lwstQuouteVATIN = 0;
        if (jsonCanvassDtlsFiltered.length <= 0) {
            nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_LWST_QUOTE_UC_VATEX + ")").text(setNumReplace(ucostVATEX, 5));
            nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_LWST_QUOTE_UC_VATIN + ")").text(setNumReplace(ucostVATIN, 5));
            lwstQuoute = ucostVATEX;
            lwstQuouteVATIN = ucostVATIN;
        } else {
            lwstQuoute = getNumReplace(getNum(nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_LWST_QUOTE_UC_VATEX + ")").text()));
            lwstQuouteVATIN = getNumReplace(getNum(nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_LWST_QUOTE_UC_VATIN + ")").text()));
        }
        let qtyForPO = getNumReplace(getNum(nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_POQTY + ") input").val()));

        nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_PO_SAVEAMNT_VATEX + ")").text(setNumReplace(((lwstQuoute - ucostVATEX) * qty), 2));
        nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_PO_SAVEAMNT_VATIN + ")").text(setNumReplace(((lwstQuouteVATIN - ucostVATIN) * qty), 2));

        //let frgtAmnt = getNumReplace(getNum(row.find('td:eq(' + SPR_FRGHT_AMNT + ') input').val()));
        let frgtAmnt = getNumReplace(getNum(nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_FRGHT_AMNT + ") input").val()));
        //let dscAmnt = getNumReplace(getNum(row.find('td:eq(' + SPR_DISC_AMNT + ') input').val()));
        let dscAmnt = getNumReplace(getNum(nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_DISC_AMNT + ") input").val()));
        let frgtAmntVATIN = getNumReplace(getNum(frgtAmnt * (1 + parseFloat(vatrate)))).toFixed(5);
        let dscAmntVATIN = getNumReplace(getNum(dscAmnt * (1 + parseFloat(vatrate)))).toFixed(5);

        grossamt = (qty * ucostVATIN - parseFloat(dscAmntVATIN)) + parseFloat(frgtAmntVATIN);
        nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_POTOTALAMT_VATEX + ")").text(setNumReplace(totalucostVATEX, 2));
        nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_POTOTALAMT_VATEX + ")").text(setNumReplace(totalucostVATEX, 2));

        nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_POTOTALAMT_VATEX + ")").text(setNumReplace(totalucostVATEX, 2));
        nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_POTOTALAMT_VATIN + ")").text(setNumReplace(grossamt, 2));
        nwGrid.find("tr:eq(" + (x) + ")").find("td:eq(" + SPR_POUNITCOST_VATEX + ") input").val(setNumReplace(ucostVATEX, 5));
    }

}

function TemplateBtns() {
    //nwGridCon_Book.ActiveSheet.SetTemplate(SPR_SPECNOTES - 1, Spread_ALLROW, "remarks", "");
    //nwGridCon_Book.ActiveSheet.SetTextColor((SPR_SPECNOTES - 1), Spread_ALLROW, "#FFFFFF");
    //nwGridCon_Book.ActiveSheet.SetText2((SPR_SPECNOTES - 1), Spread_ALLROW, "Specifications/Notes");

    //nwGridCon_Book.ActiveSheet.SetTextColor((SPR_CANVASSDTLS - 1), Spread_ALLROW, "#FFFFFF");
    //nwGridCon_Book.ActiveSheet.SetText2((SPR_CANVASSDTLS - 1), Spread_ALLROW, "Canvass Details");

    //nwGridCon_Book.ActiveSheet.SetTextColor((SPR_REVIEWATTACH - 1), Spread_ALLROW, "#FFFFFF");
    //nwGridCon_Book.ActiveSheet.SetText2((SPR_REVIEWATTACH - 1), Spread_ALLROW, "Review Attachment(s)");
}

var isOpen = true;
$(document).on('click', '#btnCollapseAll', function () {
    CollapseAll(isOpen);

    isOpen = !isOpen ? true : false;

    $('#btnCollapseAll').html(isOpen ? "Collapse All" : "Expand All");

    return false;
});

function CollapseAll(isCollapsed) {
    if (isCollapsed) {
        $('#accordion_main .nk-li').removeClass("collapse");
    }
    else {
        $('#accordion_main .nk-li').addClass("collapse");
    }
}

$(document).on("change", 'input[name="tabs"]', function () {

    if ($('input[id="tab-one"]').is(':checked') ||
        $('input[id="tab-two"]').is(':checked') ||
        $('input[id="tab-three"]').is(':checked') ||
        $('input[id="tab-four"]').is(':checked') ||
        $('input[id="tab-five"]').is(':checked')
        ) {
        isOpen = true;
    }
    else {
        isOpen = false;
    }

    $('#btnCollapseAll').html(isOpen ? "Collapse All" : "Expand All");
});

$(document).on('click', '#btnCollapseAll', function () {
    CollapseAll(_isOpen);
    CheckOpenAll();
    return false;
});

function CheckOpenAll() {
    var isOpen = 0;
    var isClose = 0;
    $('#accordion_main .nk-li').each(function () {
        var val = $(this).hasClass("collapse");
        if (val) {
            isOpen += 1;
        } else {
            isClose += 1;
        }
    });
    var ExpandAll = false;
    if (isOpen == 0) {
        ExpandAll = false;
    }

    if (isClose == 0) {
        ExpandAll = true;
    }

    if (isOpen == 0 || isClose == 0) {
        $('#btnCollapseAll').text(ExpandAll ? "Collapse All" : "Expand All");
        _isOpen = ExpandAll ? true : false;
    }
  

}
function GetAddtoListFilters() {

    var len = $('div.atlContainer').length;
    for (var i = 0; i < len; i++) {
        var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
        var xvalue = "";
        var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
        for (var j = 0; j < lencode; j++) {
            if (xvalue != "") xvalue += "|";
            xvalue += $('.atlContainer:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');
        }

        nwParameter_Add(xkey, xvalue);
    }


};


$(document).on("click", ".btnGetlookup", function () {

    nwGrid = null; // if grid is click 
    var xtype = $(this).attr("nwtype");
    var selectedInput = xtype;
    GetAddtoListFilters();

    lookUpCustomize(selectedInput, 2);
});