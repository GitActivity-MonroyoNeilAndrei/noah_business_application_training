var isnew = 0;
var checksupplier = "";
var filter = "";
var PeriodDateFrom;
var PeriodDateTo;
var currentRecUser;
var CurrentServerDate = "";
var basedTitle = "AP Debit Memo Entry";

var nwGridDebitNoteWithRefereceCon_Book;
var nwGridDebitNoteWithRefereceCon_Sheet;

var nwGridDebitNoteWithRefereceDetailsCon_Book;
var nwGridDebitNoteWithRefereceDetailsCon_Sheet;

var nwGridDebitNoteWithoutRefereceCon_Book;
var nwGridDebitNoteWithoutRefereceCon_Sheet;

var nwGridLineDetails_Book;
var nwGridLineDetails_Sheet;

var nwGridDetailsLD_Book;
var nwGridDetailsLD_Sheet;

var nwGridLDWithout_Book;
var nwGridLDWithout_Sheet;

var nwGridLDTotalAPV_Book;
var nwGridLDTotalAPV_Sheet;

var nwGridJECon_Book;
var nwGridJECon_Sheet;

var nwGridApproval_Book;
var nwGridApproval_Sheet;

var nwGridCon3_Book;
var nwGridCon3_Sheet;

var nwGridConMain6_Book;
var nwGridConMain6_Sheet;

var nwGridAttCon_Book;
var nwGridAttCon_Sheet;

var _row = 0;
var _col = 0;
var _canvasID;

var _GridLU;

var SPR_LINETYPE = 1,
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

var SPR_without_LINETYPE = 1,
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

var SPR_LD_LINETYPE = 1,
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

var SPR_LDW_REASON = 1,
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
    SPR_LDW_REQSUBACCOUNT=30,
    SPR_LDW_REQSLTYPE=31,
    SPR_LDW_REQPERIODTOCOVER = 32,
    SPR_LDW_TAXRATE = 33,
    SPR_LDW_CLAIMEDPERCENT = 34;


var SPR_TOTAL_APVNO = 1,
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

var flag;
var isResetTax = false;
var nwDocno = '';
var lastsegment = '';
var remarksConfig = '';
var defaultLocSegCode = '';
var defaultCCSegCode = '';
var seg1Desc = '';
var ccflag = '';
var pcflag = '';
var isAllowCurrency = '';
var isAllowTax = '';
var allowTaxPerTrantype = '';
var inputConfig = '';
var recuser_glb = '';
var defaultLocCode = '';
var defaultLocDesc = '';
var defaultCCCode = '';
var defaultCCDesc = '';

//JSON Strings
var jsonCommonSegments = [];
var jsonPerDates = [];
var jsonPerDatesClosing = [];

function func_Reload() {
    crLnk = GetCurrentURL() + "APDebitMemoEntry_Gateway";
    crLnkGateKey = "APDebitMemoEntry";
    crnwTagSingleBind = true;

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();

    nwDocno = getParameterByName('nwDocno');

    nwPopupForm_Create("nwGenerateRemarks", true);
    nwPopupForm_Create("nwGenerateGriddebitwith", true);
    nwPopupForm_Create("nwGenerateDetails", true);
    nwPopupForm_Create("nwGenerateGriddebitwithout", true);
    nwPopupForm_Create("nwGenerateGridLineDetails", true);
    nwPopupForm_Create("nwGenerateDetailsLD", true);
    nwPopupForm_Create("nwGenerateGridLDWithout", true);
    nwPopupForm_Create("nwGenerateGridTotalAPV", true);
    nwPopupForm_Create("nwGenerateGridJE", true);
    nwPopupForm_Create("nwGenerateApproval", true);
    nwPopupForm_Create("nwGeneratedissappRemarks", true);
    nwPopupForm_Create("FormProcess", true);    
    
    nwPopupForm_Create("attachment", true);
    nwPopupForm_Create("nwUploadCon");
    nwPopupForm_Create("FormDetails");
    nwPopupForm_Create("popAtt", true);

    $('#cbtrade').prop("checked", true);
    $('#txtValueDate').datepicker();
    $('#txtValueDate').mask('99/99/9999');

    return isContinue;
}

////////////////////////// TOol Box
function mainLoad() {
    nwParameter_Add("nwDocno", nwDocno);
    if (nwDocno != '') {
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox").visible(false);       
    }
}

function func_ToolboxADD(indef, enume) {
    isnewrow = 1;
    var isContinue = true;
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();    
    toolboxnew();
    $("#idvallugLocForm").focus();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", basedTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", basedTitle, "", indef, enume);
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
    nwPopupForm_ShowModal("FormProcess");
    $('#FormProcess .modal-hdr-title').text("Process");
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
    
    nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
    nwParameter_Add("idvallugSubPayee", $('#idvallugSubPayee').val());
    nwParameter_Add("idvallugPayee", $('#idvallugPayee').val());
    nwParameter_Add("txtDateSubmitted", $('#txtDateSubmitted').val());
    nwParameter_Add("txtDatePosted", $('#txtDatePosted').val());
    nwParameter_Add("txtref", $('#txtref').val());
    nwParameter_Add("txtRefDate", $('#txtRefDate').val());
 //   nwParameter_Add("issupplierqwe",  crnwTR.find("td:eq(" + SPR_ISSUPPLIER + ")").text());
   
//    nwParameter_Add("issupplierqwe", checksupplier);
    nwParameter_Add("txtApDmStatus", $('#txtApDmStatus').val());
    nwParameter_Add("flag", flag);
    nwParameter_Add("txtReasonDisApproval", $('#txtReasonDisApproval').val());

    nwParameter_Add('TranType', $('#cbtrade').prop("checked") ? 'PDMTRD' : 'PDMNTR');
    nwParameter_Add('TradeType', $('#cbtrade').prop("checked") ? 'TR' : 'NT');

    nwParameter_Add("txtDocNo", $('#txtDMno').val());

    nwParameter_Add("TranNo", $('#txtDMno').val());
    nwParameter_Add("txtDMno", $('#txtDMno').val());
    //nwParameter_Add_Table('nwGridCon6');
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("txtDocnoAtt", $('#txtDMno').val()); // Customize //change Docno id
    //nwParameter_Add("txtTranTypeAtt", $('#cbtrade').prop("checked") ? 'PDMTRD' : 'PDMNTR');  // Customize //change Trantype
    nwParameter_Add("isResetTax", isResetTax);
    try { nwParameter_Add_DataSet("nwGridDebitNoteWithRefereceCon"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridDebitNoteWithRefereceDetailsCon"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridDebitNoteWithoutRefereceCon"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridLineDetails"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridDetailsLD"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridLDWithout"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridLDTotalAPV"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridJECon"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridApproval"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridCon3"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridConMain6"); } catch (e) { }
    try { nwParameter_Add_DataSet("nwGridAttCon"); } catch (e) { }
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    isResetTax = false;
    RefreshData();
    nwLoading_Start("xactBindCollection", crLoadingHTML);   
    func_ActionDriven('actBindCollection', true);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("actBindCollectionEmpty", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}

function getGridData(idnum, index) {
    var data = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
}


function getDataOfGrid(nwGrid, type, col, row) {
    var data = '';
    var Grid;

    if (nwGrid == "nwGridDebitNoteWithReferece") {
        Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;
    }
    else if (nwGrid == "nwGridDebitNoteWithoutReferece") {
        Grid = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet;
    }

    if (type == 'input' || type == 'textarea')
        data = Grid.GetValue(col, row);
    else
        data = Grid.GetText(col, row);

    return data;
}

function getNum(val) {
    if (isNaN(val) || val == '') {
        val = 0
    }
    return val;
}

function getNumReplace(val) {
    val = getNum(parseFloat(val.toString().replace(/,/g, "")))
    return val;
}

function setNumReplace(val, decimal) {
    val = getNum(parseFloat(val.toString().replace(/,/g, "")))
    val = val.toFixed(decimal).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return val;
}


var temp_crnwTR = "";
var isbuttonclick = false;

function cust_LookupButton() {
    isbuttonclick = true;
}

$(document).on("mousedown", ".btnVendorInfo", function () {
    cust_LookupButton();    
});

function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
    }
    if (idName == "lugPayee") {    
        if (isbuttonclick) {
            isbuttonclick = false;
            ViewVendorInfo(getGridData(idNum, 0), getGridData(idNum, 8));
            $('#nwPopVendorInfoWindow').addClass("zindexHigh");
            return false;
        }
        else {
            var tin = getGridData(idNum, 5);
            var address = getGridData(idNum, 2);
            var currencycode = getGridData(idNum, 3);
            var currencydesc = getGridData(idNum, 4);

            if ($('#idvallugPayeeType').val() == "02") {
                $('#txtTin').val(tin);
                $('#txtPayeeAdress').val(address);
                $('#descvallugCurrency').val(currencydesc);
                $('#idvallugCurrency').val(currencycode);
            }
            else {
                $('#txtTin').val(tin);
                $('#txtPayeeAdress').val(address);
                $('#descvallugCurrency').val(currencydesc);
                $('#idvallugCurrency').val(currencycode);
            }

            $("#idvallugSubPayee").val(getGridData(idNum, 6));
            $("#descvallugSubPayee").val(getGridData(idNum, 7));
            $("#idvallugPayeeType").val(getGridData(idNum, 8));
            $("#descvallugPayeeType").val(getGridData(idNum, 9));

            if (getGridData(idNum, 10) == "1") {
                $("#lugCurrency").enable(true);
            }
            else {
                $("#lugCurrency").enable(false);
            }

            setforex();
        }
    }
    if (idName == "lugPayeeType")
    {
        if ($('#idvallugPayeeType').val() == "02") {
            payeetypesupplier();
        }
        else {
            payeetypeemployee();
        }
        lugpayeetypechange()
    }
    if (idName == "doccontrol")
    {
        var docctrlcode = getGridData(idNum, 0);                  
        var docctrldesc = getGridData(idNum, 1);

        _GridLU.SetText((SPR_DOCCODE - 1), _row, docctrlcode);
        _GridLU.SetText((SPR_DOCDESC - 1), _row, docctrldesc);
    }

    if (idName == "lugAPVNo_DebitwRef") {
        var code = getGridData(idNum, 1);
        var valuedate = getGridData(idNum, 2);
        var invoiceno = getGridData(idNum, 3);
        var payee = getGridData(idNum, 4);
        var totalamount = getGridData(idNum, 5);
        var openamount = getGridData(idNum, 6);
        var issupplier = getGridData(idNum, 7);
        var payeedesc = getGridData(idNum, 8);
        var slType = getGridData(idNum, 20);
        var slref = getGridData(idNum, 21);
        _GridLU.SetText((SPR_LINETYPE - 1), _row, 'Transaction');
        _GridLU.SetText((SPR_APVNO - 1), _row, code);
        _GridLU.SetText((SPR_APVDATE - 1), _row, valuedate);
        _GridLU.SetText((SPR_INVOICENO - 1), _row, invoiceno);
        _GridLU.SetText((SPR_PAYEEREF - 1), _row, payeedesc);
        _GridLU.SetText((SPR_APVAMOUNT - 1), _row, totalamount);
        _GridLU.SetText((SPR_OPENAMOUNT - 1), _row, openamount);
        _GridLU.SetText((SPR_ISSUPPLIER - 1), _row, issupplier);
        _GridLU.SetText((SPR_PAYEEREFCODE - 1), _row, payee);
        _GridLU.SetText((SPR_REQSLTYPE - 1), _row, slType);
        _GridLU.SetText((SPR_REQSLREF - 1), _row, slref);
        let remarks = $("#txtRemarks").val();
        let particulars = _GridLU.GetValue((SPR_PARTICULARS - 1), _row);
        if (particulars == "") {
            _GridLU.SetValue((SPR_PARTICULARS - 1), _row, remarks);
        }        
        _GridLU.SetBackground((SPR_PARTICULARS - 1), _row, "#006060");    
        //LoadCommonSegment(_row);
        LoadTotalAmounts();
    }
    if (idName == "lugRsn_DebitwRef") {
        _GridLU.SetText((SPR_REASON - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_REASONDESC - 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_REASONTYPE - 1), _row, getGridData(idNum, 2));
    }
    if (idName == 'lugPayee_DebitwRef') {
        _GridLU.SetText((SPR_PAYEEREFCODE - 1), _row, (getGridData(idNum, 0)));
        _GridLU.SetText((SPR_PAYEEREF - 1), _row, (getGridData(idNum, 1)));
        _GridLU.SetText((SPR_VATCODE - 1), _row, (getGridData(idNum, 3)));
        _GridLU.SetText((SPR_VATDESC - 1), _row, (getGridData(idNum, 4)));
        _GridLU.SetText((SPR_EWTCODE - 1), _row, (getGridData(idNum, 5)));
        _GridLU.SetText((SPR_EWTDESC - 1), _row, (getGridData(idNum, 6)));

        //if ($("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(6)").text() == "2" || $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(8)").text() == "0") {
        //    _GridLU.SetEnable((SPR_TAX, _row, false)
        //} else
        //    _GridLU.SetEnable((SPR_TAX, _row, true)
        let reqSL = getGridData(idNum, 9);
        let reqSA = getGridData(idNum, 10);
        ReqSLSA(reqSL, reqSA);
        GetAccountDescription();
        DebitNoteWRefComp(_row);
    }
    if (idName == 'lugIGT_DebitwRef') {
        //let validation_adv = getGridData(idNum, 13);
        //if (validation_adv == '0') {
        //    MessageBox("Cannot proceed. Payee has existing unliquidated advances.", "Charging Details", "error");
        //    return;
        //}
        //else {
            //if (igtcode_glb != getGridData(idNum, 0)) {
            //    _GridLU.SetText((SPR_CD_ITEMCODE - 1), _row, "");
            //    _GridLU.SetText((SPR_CD_ITEMDESC - 1), _row, "");
            //    _GridLU.SetText((SPR_CD_UOM - 1), _row, "");
            //}
            _GridLU.SetText((SPR_ITEMGROUPTYPE - 1), _row, getGridData(idNum, 0));
            _GridLU.SetText((SPR_ITEMGROUPTYPEDESC - 1), _row, getGridData(idNum, 1));
            _GridLU.SetText((SPR_VATCODE - 1), _row, getGridData(idNum, 3));
            _GridLU.SetText((SPR_VATDESC - 1), _row, getGridData(idNum, 4));
            _GridLU.SetText((SPR_EWTCODE - 1), _row, getGridData(idNum, 5));
            _GridLU.SetText((SPR_EWTDESC - 1), _row, getGridData(idNum, 6));
            _GridLU.SetText((SPR_SEG1 - 1), _row, getGridData(idNum, 9));
            _GridLU.SetText((SPR_REF1 - 1), _row, getGridData(idNum, 10));
            _GridLU.SetText((SPR_TAXRATE - 1), _row, getGridData(idNum, 14));
            _GridLU.SetText((SPR_TAXRATE2 - 1), _row, getGridData(idNum, 15));
            //let ucostvatin = getNumReplace(_GridLU.SetText((SPR_CD_UNITCOST_VATIN + ") input").val());
            //if (ucostvatin == 0 && _row == 0) {
            //    _GridLU.SetText((SPR_CD_QTY + ") input").val("1.00");
            //    _GridLU.SetText((SPR_CD_UNITCOST_VATIN + ") input").val($("#txtGrossAmt_CD").val());
            //}

            _GridLU.SetText((SPR_SEG2 - 1), _row, jsonCommonSegments[0]["com2Code"]);
            _GridLU.SetText((SPR_REF2 - 1), _row, jsonCommonSegments[0]["com2Desc"]);
            _GridLU.SetText((SPR_SEG3 - 1), _row, jsonCommonSegments[0]["com3Code"]);
            _GridLU.SetText((SPR_REF3 - 1), _row, jsonCommonSegments[0]["com3Desc"]);
            _GridLU.SetText((SPR_SEG4 - 1), _row, jsonCommonSegments[0]["com4Code"]);
            _GridLU.SetText((SPR_REF4 - 1), _row, jsonCommonSegments[0]["com4Desc"]);
            _GridLU.SetText((SPR_SEG5 - 1), _row, jsonCommonSegments[0]["com5Code"]);
            _GridLU.SetText((SPR_REF5 - 1), _row, jsonCommonSegments[0]["com5Desc"]);
            _GridLU.SetText((SPR_SEG6 - 1), _row, jsonCommonSegments[0]["com6Code"]);
            _GridLU.SetText((SPR_REF6 - 1), _row, jsonCommonSegments[0]["com6Desc"]);

            lastsegment = getGridData(idNum, 2);
            if (lastsegment == "04") {
                _GridLU.SetText((SPR_SEG4 - 1), _row, getGridData(idNum, 7));
                _GridLU.SetText((SPR_REF4 - 1), _row, getGridData(idNum, 8));
            }
            else if (lastsegment == "05") {
                _GridLU.SetText((SPR_SEG5 - 1), _row, getGridData(idNum, 7));
                _GridLU.SetText((SPR_REF5 - 1), _row, getGridData(idNum, 8));
            }
            else if (lastsegment == "06") {
                _GridLU.SetText((SPR_SEG6 - 1), _row, getGridData(idNum, 7));
                _GridLU.SetText((SPR_REF6 - 1), _row, getGridData(idNum, 8));
            }

            switch (defaultLocSegCode) {
                case "02":
                    _GridLU.SetText((SPR_SEG2 - 1), _row, (defaultLocCode));
                    _GridLU.SetText((SPR_REF2 - 1), _row, (defaultLocDesc));
                    _GridLU.SetBackground((SPR_SEG2 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_REF2 - 1), _row, "gainsboro");
                    break;
                case "03":
                    _GridLU.SetText((SPR_SEG3 - 1), _row, (defaultLocCode));
                    _GridLU.SetText((SPR_REF3 - 1), _row, (defaultLocDesc));
                    _GridLU.SetBackground((SPR_SEG3 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_REF3 - 1), _row, "gainsboro");
                    break;
                case "04":
                    _GridLU.SetText((SPR_SEG4 - 1), _row, (defaultLocCode));
                    _GridLU.SetText((SPR_REF4 - 1), _row, (defaultLocDesc));
                    _GridLU.SetBackground((SPR_SEG4 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_REF4 - 1), _row, "gainsboro");
                    break;
                case "05":
                    _GridLU.SetText((SPR_SEG5 - 1), _row, (defaultLocCode));
                    _GridLU.SetText((SPR_REF5 - 1), _row, (defaultLocDesc));
                    _GridLU.SetBackground((SPR_SEG5 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_REF5 - 1), _row, "gainsboro");
                    break;
                case "06":
                    _GridLU.SetText((SPR_SEG6 - 1), _row, (defaultLocCode));
                    _GridLU.SetText((SPR_REF6 - 1), _row, (defaultLocDesc));
                    _GridLU.SetBackground((SPR_SEG6 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_REF6 - 1), _row, "gainsboro");
                    break;
            }
            
            if (defaultCCCode != "") {
                switch (defaultCCSegCode) {
                    case "02":
                        _GridLU.SetText((SPR_SEG2- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_REF2- 1), _row, defaultCCDesc);
                        break;
                    case "03":
                        _GridLU.SetText((SPR_SEG3- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_REF3- 1), _row, defaultCCDesc);
                        break;
                    case "04":
                        _GridLU.SetText((SPR_SEG4- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_REF4- 1), _row, defaultCCDesc);
                        break;
                    case "05":
                        _GridLU.SetText((SPR_SEG5- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_REF5- 1), _row, defaultCCDesc);
                        break;
                    case "06":
                        _GridLU.SetText((SPR_SEG6- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_REF6- 1), _row, defaultCCDesc);
                        break;
                }
            }
            cust_GetPara();
            nwParameter_Add("idvallugRsnReq", _GridLU.GetText((SPR_REASON- 1), _row));
            nwParameter_Add("igtCode", getGridData(idNum, 0));
            nwParameter_Add("currRow", _row);
            nwParameter_Add("lastSegment", lastsegment);
            nwParameter_Add("type", "WREF");
            //nwParameter_Add_Table("nwGridDebitNoteWithRefereceCon");
            try {
                nwParameter_Add_DataSet("nwGridDebitNoteWithRefereceCon");
            } catch (e) { }
            func_ActionDriven("actLoadCashFlow", false);
            _GridLU.SetText((SPR_REQSLTYPE- 1), _row, getGridData(idNum, 11));
            _GridLU.SetText((SPR_REQSUBACCOUNT- 1), _row, getGridData(idNum, 12));
           

            let reqSL = getGridData(idNum, 11);
            let reqSA = getGridData(idNum, 12);
            ReqSLSA(reqSL, reqSA);
            ReqSLSA_woRef(reqSL, reqSA);


            _GridLU.SetText((SPR_REQSLTYPE- 1), _row, getGridData(idNum, 11));

            GetAccountDescription();
            _crnwTR = crnwTR;
            if (_GridLU.GetText((SPR_APVNO - 1), _row) != "") {
                ComputeAmountswRef();
            }
        //}

        //func_ActionDriven("actTagColor", false);
    }
    if (idName == "lugItemCode_DebitwRef") {        
        if (isbuttonclick) {
            isbuttonclick = false;
            ViewItemMaster(getGridData(idNum, 0));
            $('#nwPopItemMasterWindow').addClass("zindexHigh");
            return false;
        }
        else {
            _GridLU.SetText((SPR_ITEMCODE - 1), _row, getGridData(idNum, 0));
            _GridLU.SetText((SPR_ITEMDESC - 1), _row, getGridData(idNum, 1));
            //_GridLU.SetText((SPR_CD_UOM - 1), _row, getGridData(idNum, 2));
            _GridLU.SetText((SPR_ITEMGROUPTYPE - 1), _row, getGridData(idNum, 3));
            _GridLU.SetText((SPR_ITEMGROUPTYPEDESC - 1), _row, getGridData(idNum, 4));
            _GridLU.SetText((SPR_SEG1 - 1), _row, getGridData(idNum, 8));
            _GridLU.SetText((SPR_REF1 - 1), _row, getGridData(idNum, 9));
            _GridLU.SetText((SPR_VATCODE - 1), _row, getGridData(idNum, 13));
            _GridLU.SetText((SPR_VATDESC - 1), _row, getGridData(idNum, 14));
            _GridLU.SetText((SPR_EWTCODE - 1), _row, getGridData(idNum, 15));
            _GridLU.SetText((SPR_EWTDESC - 1), _row, getGridData(idNum, 16));
            _GridLU.SetText((SPR_TAXRATE - 1), _row, getGridData(idNum, 19));
            _GridLU.SetText((SPR_TAXRATE2 - 1), _row, getGridData(idNum, 20));

            //let ucostvatin = getNumReplace(_GridLU.SetText((SPR_CD_UNITCOST_VATIN + ") input").val());
            //if (ucostvatin == 0 && _row == 0) {
            //    _GridLU.SetText((SPR_CD_QTY + ") input").val("1.00");
            //    _GridLU.SetText((SPR_CD_UNITCOST_VATIN + ") input").val($("#txtGrossAmt_CD").val());
            //}
            _GridLU.SetText((SPR_SEG2 - 1), _row, jsonCommonSegments[0]["com2Code"]);
            _GridLU.SetText((SPR_REF2 - 1), _row, jsonCommonSegments[0]["com2Desc"]);
            _GridLU.SetText((SPR_SEG3 - 1), _row, jsonCommonSegments[0]["com3Code"]);
            _GridLU.SetText((SPR_REF3 - 1), _row, jsonCommonSegments[0]["com3Desc"]);
            _GridLU.SetText((SPR_SEG4 - 1), _row, jsonCommonSegments[0]["com4Code"]);
            _GridLU.SetText((SPR_REF4 - 1), _row, jsonCommonSegments[0]["com4Desc"]);
            _GridLU.SetText((SPR_SEG5 - 1), _row, jsonCommonSegments[0]["com5Code"]);
            _GridLU.SetText((SPR_REF5 - 1), _row, jsonCommonSegments[0]["com5Desc"]);
            _GridLU.SetText((SPR_SEG6 - 1), _row, jsonCommonSegments[0]["com6Code"]);
            _GridLU.SetText((SPR_REF6 - 1), _row, jsonCommonSegments[0]["com6Desc"]);

            lastsegment = getGridData(idNum, 7);
            var reqSL = getGridData(idNum, 10);
            var reqSA = getGridData(idNum, 11);
            var isPPE = getGridData(idNum, 12);                

            if (lastsegment == "04") {
                _GridLU.SetText((SPR_SEG4 - 1), _row, getGridData(idNum, 5));
                _GridLU.SetText((SPR_REF4 - 1), _row, getGridData(idNum, 6));
            }
            else if (lastsegment == "05") {
                _GridLU.SetText((SPR_SEG5 - 1), _row, getGridData(idNum, 5));
                _GridLU.SetText((SPR_REF5 - 1), _row, getGridData(idNum, 6));
            }
            else if (lastsegment == "06") {
                _GridLU.SetText((SPR_SEG5 - 1), _row, getGridData(idNum, 5));
                _GridLU.SetText((SPR_REF5 - 1), _row, getGridData(idNum, 6));
            }

            switch (defaultLocSegCode) {
                case "02":
                    _GridLU.SetText((SPR_SEG2- 1), _row, defaultLocCode);
                    _GridLU.SetText((SPR_REF2- 1), _row, defaultLocDesc);
                    _GridLU.SetBackground((SPR_SEG2 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_REF2 - 1), _row, "gainsboro");
                    break;
                case "03":
                    _GridLU.SetText((SPR_SEG3- 1), _row, defaultLocCode);
                    _GridLU.SetText((SPR_REF3- 1), _row, defaultLocDesc);
                    _GridLU.SetBackground((SPR_SEG3 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_REF3 - 1), _row, "gainsboro");
                    break;
                case "04":
                    _GridLU.SetText((SPR_SEG4- 1), _row, defaultLocCode);
                    _GridLU.SetText((SPR_REF4- 1), _row, defaultLocDesc);
                    _GridLU.SetBackground((SPR_SEG4 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_REF4 - 1), _row, "gainsboro");
                    break;
                case "05":
                    _GridLU.SetText((SPR_SEG5- 1), _row, defaultLocCode);
                    _GridLU.SetText((SPR_REF5- 1), _row, defaultLocDesc);
                    _GridLU.SetBackground((SPR_SEG5 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_REF5 - 1), _row, "gainsboro");
                    break;
                case "06":
                    _GridLU.SetText((SPR_SEG6- 1), _row, defaultLocCode);
                    _GridLU.SetText((SPR_REF6- 1), _row, defaultLocDesc);
                    _GridLU.SetBackground((SPR_SEG6 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_REF6 - 1), _row, "gainsboro");
                    break;
            }

            if (defaultCCCode != "") {
                switch (defaultCCSegCode) {
                    case "02":
                        _GridLU.SetText((SPR_SEG2- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_REF2- 1), _row, defaultCCDesc);
                        break;
                    case "03":
                        _GridLU.SetText((SPR_SEG3- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_REF3- 1), _row, defaultCCDesc);
                        break;
                    case "04":
                        _GridLU.SetText((SPR_SEG4- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_REF4- 1), _row, defaultCCDesc);
                        break;
                    case "05":
                        _GridLU.SetText((SPR_SEG5- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_REF5- 1), _row, defaultCCDesc);
                        break;
                    case "06":
                        _GridLU.SetText((SPR_SEG6- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_REF6- 1), _row, defaultCCDesc);
                        break;
                }
            }

            _GridLU.SetText((SPR_REQSLTYPE- 1), _row, reqSL);
            _GridLU.SetText((SPR_REQSUBACCOUNT- 1), _row, reqSA);
            ReqSLSA(reqSL, reqSA);
            GetAccountDescription();
            cust_GetPara();
            nwParameter_Add("idvallugRsnReq", _GridLU.GetText((SPR_REASON- 1), _row));
            nwParameter_Add("igtCode", getGridData(idNum, 3));
            nwParameter_Add("currRow", _row);
            nwParameter_Add("lastSegment", lastsegment);
            nwParameter_Add("type", "WREF");
            //nwParameter_Add_Table("nwGridDebitNoteWithRefereceCon");
            try {
                nwParameter_Add_DataSet("nwGridDebitNoteWithRefereceCon");
            } catch (e) { }
            func_ActionDriven("actLoadCashFlow", false);
        }
    //}
    }
    if (idName == "lugVAT_DebitwRef") {        
        _GridLU.SetText((SPR_VATCODE - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_VATDESC - 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_TAXRATE - 1), _row, getGridData(idNum, 2));
        _crnwTR = crnwTR;
        if (_GridLU.GetText((SPR_APVNO - 1), _row) != "") {
            ComputeAmountswRef();
        }
    }
    if (idName == "lugEWT_DebitwRef") {
        _GridLU.SetText((SPR_EWTCODE - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_EWTDESC - 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_TAXRATE2 - 1), _row, getGridData(idNum, 2));
        _crnwTR = crnwTR;
        if (_GridLU.GetText((SPR_APVNO - 1), _row) != "") {
            ComputeAmountswRef();
        }        
    }
    if (idName == 'lugSeg1_DebitwRef') {
        _GridLU.SetText((SPR_SEG1 - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_REF1 - 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_REQSUBACCOUNT - 1), _row, getGridData(idNum, 3));
        _GridLU.SetText((SPR_REQSLTYPE - 1), _row, getGridData(idNum, 2));

        concatdesc();
        checkisreqsubaccountindebitnotewithreference();
        checkisreqsltypeaccountindebitnotewithreference();
    }
    if (idName == 'lugSeg2_DebitwRef') {
        _GridLU.SetText((SPR_SEG2 - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_REF2 - 1), _row, getGridData(idNum, 1));
        concatdesc()
    }
    if (idName == 'lugSeg3_DebitwRef') {
        _GridLU.SetText((SPR_SEG3 - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_REF3 - 1), _row, getGridData(idNum, 1));
        concatdesc()
    }
    if (idName == 'lugSeg4') {
        var code = getGridData(idNum, 0);
        var desc = getGridData(idNum, 1);
        _GridLU.SetText((SPR_SEG4 - 1), _row, code);
        _GridLU.SetText((SPR_REF4 - 1), _row, desc);
        concatdesc()
    }
    if (idName == 'lugSeg5') {
        var code = getGridData(idNum, 0);
        var desc = getGridData(idNum, 1);
        _GridLU.SetText((SPR_SEG5 - 1), _row, code);
        _GridLU.SetText((SPR_REF5 - 1), _row, desc);
        concatdesc()
    }
    if (idName == 'lugSeg6') {
        var code = getGridData(idNum, 0);
        var desc = getGridData(idNum, 1);
        _GridLU.SetText((SPR_SEG6 - 1), _row, code);
        _GridLU.SetText((SPR_REF6 - 1), _row, desc);
        concatdesc()
    }
    if (idName == 'lugBankAccnt_DebitwRef') {
        _GridLU.SetText((SPR_SUBACCOUNT - 1), _row, getGridData(idNum, 0));        
    }
    if (idName == 'lugSLType_DebitwRef') {
        _GridLU.SetText((SPR_SUBLEDGERTYPE - 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_SLTYPECODE - 1), _row, getGridData(idNum, 0));        
    }
    if (idName == 'lugSLRef_DebitwRef') {        
        _GridLU.SetText((SPR_SUBSIDIARYLREF - 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_SLREFCODE - 1), _row, getGridData(idNum, 0));
    }

    //payeesubtype
    if (idName == 'lugSubPayee') {
        var type = getGridData(idNum, 0);
        $('#idvallugSubPayee').val(getGridData(idNum, 0));
        $('#descvallugSubPayee').val(getGridData(idNum, 1));
        lugpayeesubtypechange();
    }

    //Debit Note without Reference
    if (idName == 'lugReason_DebitwoRef') {
        _GridLU.SetText((SPR_without_LINETYPE - 1), _row, "Transaction");
        _GridLU.SetText((SPR_without_REASON - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_without_REASONDESC - 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_without_REASONTYPE - 1), _row, getGridData(idNum, 2));
        $("#idvallugAPControlAccnt").val(getGridData(idNum, 3));
        $("#descvallugAPControlAccnt").val(getGridData(idNum, 4));
        //_GridLU.SetText((SPR_without_APControlAcctCode - 1), _row, getGridData(idNum, 3));
        //_GridLU.SetText((SPR_without_APControlAcctDesc - 1), _row, getGridData(idNum, 4));
        _GridLU.SetText((SPR_without_PAYEECODE - 1), _row, $("#idvallugPayee").val());
        _GridLU.SetText((SPR_without_PAYEEREF - 1), _row, $("#descvallugPayee").val());
        let remarks = $("#txtRemarks").val();
        let particulars = _GridLU.GetValue((SPR_without_PARTICULARS - 1), _row);
        if (particulars == "") {
            _GridLU.SetValue((SPR_without_PARTICULARS - 1), _row, remarks);
        }        
        _GridLU.SetBackground((SPR_without_PARTICULARS - 1), _row, "#006060");
    }
    if (idName == 'lugPayeeRef_DebitwoRef') {
        _GridLU.SetText((SPR_without_PAYEECODE- 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_without_PAYEEREF- 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_without_VATCODE- 1), _row, getGridData(idNum, 3));
        _GridLU.SetText((SPR_without_VATDESC- 1), _row, getGridData(idNum, 4));
        _GridLU.SetText((SPR_without_EWTCODE- 1), _row, getGridData(idNum, 5));
        _GridLU.SetText((SPR_without_EWTDESC- 1), _row, getGridData(idNum, 6));

        //_GridLU.SetText((SPR_without_EWTDESC- 1), _row, getGridData(idNum, 6));
        //_GridLU.SetText((SPR_without_EWTDESC- 1), _row, getGridData(idNum, 6));


        //_GridLU.SetText((SPR_without_SEG1- 1), _row, '');
        //_GridLU.SetText((SPR_without_REF1- 1), _row, '');
        //_GridLU.SetText((SPR_without_ACCOUNTDESC- 1), _row, '');
    
        let reqSL = getGridData(idNum, 9);
        let reqSA = getGridData(idNum, 10);
        //ReqSLSA_woRef(reqSL, reqSA); --11/21/2022 03:50 PM NDB - Comment
        GetAccountDescription_woRef();
        DebitNoteAndLineDtlsWORefComp(_row);
    }
    if (idName == 'lugIGT_DebitwoRef') {
        _GridLU.SetText((SPR_without_ITEMGROUPTYPE - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_without_ITEMGROUPTYPEDESC - 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_without_VATCODE - 1), _row, getGridData(idNum, 3));
        _GridLU.SetText((SPR_without_VATDESC - 1), _row, getGridData(idNum, 4));
        _GridLU.SetText((SPR_without_EWTCODE - 1), _row, getGridData(idNum, 5));
        _GridLU.SetText((SPR_without_EWTDESC - 1), _row, getGridData(idNum, 6));
        _GridLU.SetText((SPR_without_SEG1 - 1), _row, getGridData(idNum, 9));
        _GridLU.SetText((SPR_without_REF1 - 1), _row, getGridData(idNum, 10));
        _GridLU.SetText((SPR_without_TAXRATE - 1), _row, getGridData(idNum, 14));
        _GridLU.SetText((SPR_without_TAXRATE2 - 1), _row, getGridData(idNum, 15));

        _GridLU.SetText((SPR_without_SEG2 - 1), _row, jsonCommonSegments[0]["com2Code"]);
        _GridLU.SetText((SPR_without_REF2 - 1), _row, jsonCommonSegments[0]["com2Desc"]);
        _GridLU.SetText((SPR_without_SEG3 - 1), _row, jsonCommonSegments[0]["com3Code"]);
        _GridLU.SetText((SPR_without_REF3 - 1), _row, jsonCommonSegments[0]["com3Desc"]);
        _GridLU.SetText((SPR_without_SEG4 - 1), _row, jsonCommonSegments[0]["com4Code"]);
        _GridLU.SetText((SPR_without_REF4 - 1), _row, jsonCommonSegments[0]["com4Desc"]);
        _GridLU.SetText((SPR_without_SEG5 - 1), _row, jsonCommonSegments[0]["com5Code"]);
        _GridLU.SetText((SPR_without_REF5 - 1), _row, jsonCommonSegments[0]["com5Desc"]);
        _GridLU.SetText((SPR_without_SEG6 - 1), _row, jsonCommonSegments[0]["com6Code"]);
        _GridLU.SetText((SPR_without_REF6 - 1), _row, jsonCommonSegments[0]["com6Desc"]);

        lastsegment = getGridData(idNum, 2);
        if (lastsegment == "04") {
            _GridLU.SetText((SPR_without_SEG4 - 1), _row, getGridData(idNum, 7));
            _GridLU.SetText((SPR_without_REF4 - 1), _row, getGridData(idNum, 8));
        }
        else if (lastsegment == "05") {
            _GridLU.SetText((SPR_without_SEG5 - 1), _row, getGridData(idNum, 7));
            _GridLU.SetText((SPR_without_REF5 - 1), _row, getGridData(idNum, 8));
        }
        else if (lastsegment == "06") {
            _GridLU.SetText((SPR_without_SEG6 - 1), _row, getGridData(idNum, 7));
            _GridLU.SetText((SPR_without_REF6 - 1), _row, getGridData(idNum, 8));
        }

        switch (defaultLocSegCode) {
            case "02":
                _GridLU.SetText((SPR_without_SEG2- 1), _row, defaultLocCode);
                _GridLU.SetText((SPR_without_REF2- 1), _row, defaultLocDesc);
                _GridLU.SetBackground((SPR_without_SEG2 - 1), _row, "gainsboro");
                _GridLU.SetBackground((SPR_without_REF2 - 1), _row, "gainsboro");
                break;
            case "03":
                _GridLU.SetText((SPR_without_SEG3- 1), _row, defaultLocCode);
                _GridLU.SetText((SPR_without_REF3- 1), _row, defaultLocDesc);
                _GridLU.SetBackground((SPR_without_SEG3 - 1), _row, "gainsboro");
                _GridLU.SetBackground((SPR_without_REF3 - 1), _row, "gainsboro");
                break;
            case "04":
                _GridLU.SetText((SPR_without_SEG4- 1), _row, defaultLocCode);
                _GridLU.SetText((SPR_without_REF4- 1), _row, defaultLocDesc);
                _GridLU.SetBackground((SPR_without_SEG4 - 1), _row, "gainsboro");
                _GridLU.SetBackground((SPR_without_REF4 - 1), _row, "gainsboro");
                break;
            case "05":
                _GridLU.SetText((SPR_without_SEG5- 1), _row, defaultLocCode);
                _GridLU.SetText((SPR_without_REF5- 1), _row, defaultLocDesc);
                _GridLU.SetBackground((SPR_without_SEG5 - 1), _row, "gainsboro");
                _GridLU.SetBackground((SPR_without_REF5 - 1), _row, "gainsboro");
                break;
            case "06":
                _GridLU.SetText((SPR_without_SEG6- 1), _row, defaultLocCode);
                _GridLU.SetText((SPR_without_REF6- 1), _row, defaultLocDesc);
                _GridLU.SetBackground((SPR_without_SEG6 - 1), _row, "gainsboro");
                _GridLU.SetBackground((SPR_without_REF6 - 1), _row, "gainsboro");
                break;
        }

        if (defaultCCCode != "") {
            switch (defaultCCSegCode) {
                case "02":
                    _GridLU.SetText((SPR_without_SEG2- 1), _row, defaultCCCode);
                    _GridLU.SetText((SPR_without_REF2- 1), _row, defaultCCDesc);
                    break;
                case "03":
                    _GridLU.SetText((SPR_without_SEG3- 1), _row, defaultCCCode);
                    _GridLU.SetText((SPR_without_REF3- 1), _row, defaultCCDesc);
                    break;
                case "04":
                    _GridLU.SetText((SPR_without_SEG4- 1), _row, defaultCCCode);
                    _GridLU.SetText((SPR_without_REF4- 1), _row, defaultCCDesc);
                    break;
                case "05":
                    _GridLU.SetText((SPR_without_SEG5- 1), _row, defaultCCCode);
                    _GridLU.SetText((SPR_without_REF5- 1), _row, defaultCCDesc);
                    break;
                case "06":
                    _GridLU.SetText((SPR_without_SEG6- 1), _row, defaultCCCode);
                    _GridLU.SetText((SPR_without_REF6- 1), _row, defaultCCDesc);
                    break;
            }
        }
        _GridLU.SetText((SPR_without_REQSLTYPE- 1), _row, getGridData(idNum, 11));
        _GridLU.SetText((SPR_without_REQSUBACCOUNT- 1), _row, getGridData(idNum, 12));


        let reqSL = getGridData(idNum, 11);
        let reqSA = getGridData(idNum, 12);

        ReqSLSA(reqSL, reqSA);
        ReqSLSA_woRef(reqSL, reqSA);
        GetAccountDescription_woRef();



        _GridLU.SetText((SPR_without_SUBSIDIARYTYPE - 1), _row, '');
        _GridLU.SetText((SPR_without_SLTYPECODE - 1), _row, '');
        _GridLU.SetText((SPR_without_SUBSIDIARYREF - 1), _row, '');
        _GridLU.SetText((SPR_without_SLREFCODE - 1), _row, '');
        cust_GetPara();
        nwParameter_Add("idvallugRsnReq", _GridLU.GetText((SPR_without_REASON- 1), _row));
        nwParameter_Add("igtCode", getGridData(idNum, 0));
        nwParameter_Add("currRow", _row);
        nwParameter_Add("lastSegment", lastsegment);
        nwParameter_Add("type", "WOREF");
        //nwParameter_Add_Table("nwGridDebitNoteWithoutRefereceCon");
        nwParameter_Add_DataSet("nwGridDebitNoteWithoutRefereceCon");
        func_ActionDriven("actLoadCashFlow", false);

        //tagColorWithOutRef();             
    }
    if (idName == "lugItemCode_DebitwoRef") {
        if (isbuttonclick) {
            isbuttonclick = false;
            ViewItemMaster(getGridData(idNum, 0));
            $('#nwPopItemMasterWindow').addClass("zindexHigh");
            return false;
        }
        else {
            _GridLU.SetText((SPR_without_ITEMCODE - 1), _row, getGridData(idNum, 0));
            _GridLU.SetText((SPR_without_ITEMDESC - 1), _row, getGridData(idNum, 1));
            //_GridLU.SetText((SPR_CD_UOM - 1), _row, getGridData(idNum, 2));
            _GridLU.SetText((SPR_without_ITEMGROUPTYPE - 1), _row, getGridData(idNum, 3));
            _GridLU.SetText((SPR_without_ITEMGROUPTYPEDESC - 1), _row, getGridData(idNum, 4));
            _GridLU.SetText((SPR_without_SEG1 - 1), _row, getGridData(idNum, 8));
            _GridLU.SetText((SPR_without_REF1 - 1), _row, getGridData(idNum, 9));
            _GridLU.SetText((SPR_without_VATCODE - 1), _row, getGridData(idNum, 13));
            _GridLU.SetText((SPR_without_VATDESC - 1), _row, getGridData(idNum, 14));
            _GridLU.SetText((SPR_without_EWTCODE - 1), _row, getGridData(idNum, 15));
            _GridLU.SetText((SPR_without_EWTDESC - 1), _row, getGridData(idNum, 16));
            _GridLU.SetText((SPR_without_TAXRATE - 1), _row, getGridData(idNum, 19));
            _GridLU.SetText((SPR_without_TAXRATE2 - 1), _row, getGridData(idNum, 20));

            //let ucostvatin = getNumReplace(_GridLU.SetText((SPR_CD_UNITCOST_VATIN + ") input").val());
            //if (ucostvatin == 0 && _row == 0) {
            //    _GridLU.SetText((SPR_CD_QTY + ") input").val("1.00");
            //    _GridLU.SetText((SPR_CD_UNITCOST_VATIN + ") input").val($("#txtGrossAmt_CD").val());
            //}
            _GridLU.SetText((SPR_without_SEG2 - 1), _row, jsonCommonSegments[0]["com2Code"]);
            _GridLU.SetText((SPR_without_REF2 - 1), _row, jsonCommonSegments[0]["com2Desc"]);
            _GridLU.SetText((SPR_without_SEG3 - 1), _row, jsonCommonSegments[0]["com3Code"]);
            _GridLU.SetText((SPR_without_REF3 - 1), _row, jsonCommonSegments[0]["com3Desc"]);
            _GridLU.SetText((SPR_without_SEG4 - 1), _row, jsonCommonSegments[0]["com4Code"]);
            _GridLU.SetText((SPR_without_REF4 - 1), _row, jsonCommonSegments[0]["com4Desc"]);
            _GridLU.SetText((SPR_without_SEG5 - 1), _row, jsonCommonSegments[0]["com5Code"]);
            _GridLU.SetText((SPR_without_REF5 - 1), _row, jsonCommonSegments[0]["com5Desc"]);
            _GridLU.SetText((SPR_without_SEG6 - 1), _row, jsonCommonSegments[0]["com6Code"]);
            _GridLU.SetText((SPR_without_REF6 - 1), _row, jsonCommonSegments[0]["com6Desc"]);

            lastsegment = getGridData(idNum, 7);
            var reqSL = getGridData(idNum, 10);
            var reqSA = getGridData(idNum, 11);
            var isPPE = getGridData(idNum, 12);

            if (lastsegment == "04") {
                _GridLU.SetText((SPR_without_SEG4 - 1), _row, getGridData(idNum, 7));
                _GridLU.SetText((SPR_without_REF4 - 1), _row, getGridData(idNum, 8));
            }
            else if (lastsegment == "05") {
                _GridLU.SetText((SPR_without_SEG5 - 1), _row, getGridData(idNum, 7));
                _GridLU.SetText((SPR_without_REF5 - 1), _row, getGridData(idNum, 8));
            }
            else if (lastsegment == "06") {
                _GridLU.SetText((SPR_without_SEG6 - 1), _row, getGridData(idNum, 7));
                _GridLU.SetText((SPR_without_REF6 - 1), _row, getGridData(idNum, 8));
            }

            switch (defaultLocSegCode) {
                case "02":
                    _GridLU.SetText((SPR_without_SEG2- 1), _row, defaultLocCode);
                    _GridLU.SetText((SPR_without_REF2- 1), _row, defaultLocDesc);
                    _GridLU.SetBackground((SPR_without_SEG2 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_without_REF2 - 1), _row, "gainsboro");
                    break;
                case "03":
                    _GridLU.SetText((SPR_without_SEG3- 1), _row, defaultLocCode);
                    _GridLU.SetText((SPR_without_REF3- 1), _row, defaultLocDesc);
                    _GridLU.SetBackground((SPR_without_SEG3 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_without_REF3 - 1), _row, "gainsboro");
                    break;
                case "04":
                    _GridLU.SetText((SPR_without_SEG4- 1), _row, defaultLocCode);
                    _GridLU.SetText((SPR_without_REF4- 1), _row, defaultLocDesc);
                    _GridLU.SetBackground((SPR_without_SEG4 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_without_REF4 - 1), _row, "gainsboro");
                    break;
                case "05":
                    _GridLU.SetText((SPR_without_SEG5- 1), _row, defaultLocCode);
                    _GridLU.SetText((SPR_without_REF5- 1), _row, defaultLocDesc);
                    _GridLU.SetBackground((SPR_without_SEG5 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_without_REF5 - 1), _row, "gainsboro");
                    break;
                case "06":
                    _GridLU.SetText((SPR_without_SEG6- 1), _row, defaultLocCode);
                    _GridLU.SetText((SPR_without_REF6- 1), _row, defaultLocDesc);
                    _GridLU.SetBackground((SPR_without_SEG6 - 1), _row, "gainsboro");
                    _GridLU.SetBackground((SPR_without_REF6 - 1), _row, "gainsboro");
                    break;
            }

            if (defaultCCCode != "") {
                switch (defaultCCSegCode) {
                    case "02":
                        _GridLU.SetText((SPR_without_SEG2- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_without_REF2- 1), _row, defaultCCDesc);
                        break;
                    case "03":
                        _GridLU.SetText((SPR_without_SEG3- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_without_REF3- 1), _row, defaultCCDesc);
                        break;
                    case "04":
                        _GridLU.SetText((SPR_without_SEG4- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_without_REF4- 1), _row, defaultCCDesc);
                        break;
                    case "05":
                        _GridLU.SetText((SPR_without_SEG5- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_without_REF5- 1), _row, defaultCCDesc);
                        break;
                    case "06":
                        _GridLU.SetText((SPR_without_SEG6- 1), _row, defaultCCCode);
                        _GridLU.SetText((SPR_without_REF6- 1), _row, defaultCCDesc);
                        break;
                }
            }

            _GridLU.SetText((SPR_without_REQSLTYPE- 1), _row, reqSL);
            _GridLU.SetText((SPR_without_REQSUBACCOUNT- 1), _row, reqSA);
            ReqSLSA_woRef(reqSL, reqSA);
            GetAccountDescription_woRef();
            cust_GetPara();
            nwParameter_Add("idvallugRsnReq", _GridLU.GetText((SPR_without_REASON- 1), _row));
            nwParameter_Add("igtCode", getGridData(idNum, 3));
            nwParameter_Add("currRow", _row);
            nwParameter_Add("lastSegment", lastsegment);
            nwParameter_Add("type", "WOREF");
            //nwParameter_Add_Table("nwGridDebitNoteWithoutRefereceCon");
            nwParameter_Add_DataSet("nwGridDebitNoteWithoutRefereceCon");
            func_ActionDriven("actLoadCashFlow", false);
        }
        //}
    }
    if (idName == "lugVAT_DebitwoRef") {
        _GridLU.SetText((SPR_without_VATCODE - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_without_VATDESC - 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_without_TAXRATE - 1), _row, getGridData(idNum, 2));
    }
    if (idName == "lugEWT_DebitwoRef") {
        _GridLU.SetText((SPR_without_EWTCODE - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_without_EWTDESC - 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_without_TAXRATE2 - 1), _row, getGridData(idNum, 2));
    }
    if (idName == 'lugSeg1_DebitwoRef') {
        _GridLU.SetText((SPR_without_SEG1 - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_without_REF1 - 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_without_REQSUBACCOUNT - 1), _row, getGridData(idNum, 3));
        _GridLU.SetText((SPR_without_REQSLTYPE - 1), _row, getGridData(idNum, 2));

        let reqSL = getGridData(idNum, 2);
        let reqSA = getGridData(idNum, 3);
        ReqSLSA_woRef(reqSL, reqSA);
        GetAccountDescription_woRef();

        _GridLU.SetText((SPR_without_SUBSIDIARYTYPE - 1), _row, '');
        _GridLU.SetText((SPR_without_SLTYPECODE - 1), _row, '');
        _GridLU.SetText((SPR_without_SUBSIDIARYREF - 1), _row, '');
        _GridLU.SetText((SPR_without_SLREFCODE - 1), _row, '');
    }
    if (idName == 'lugSeg2_DebitwoRef') {
        _GridLU.SetText((SPR_without_SEG2 - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_without_REF2 - 1), _row, getGridData(idNum, 1));
        GetAccountDescription_woRef();
    }
    if (idName == 'lugSeg3_DebitwoRef') {
        _GridLU.SetText((SPR_without_SEG3 - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_without_REF3 - 1), _row, getGridData(idNum, 1));
        GetAccountDescription_woRef();
    }
    if (idName == 'lugSeg4_DebitwoRef') {
        var code = getGridData(idNum, 0);
        var desc = getGridData(idNum, 1);
        _GridLU.SetText((SPR_without_SEG4 - 1), _row, code);
        _GridLU.SetText((SPR_without_REF4 - 1), _row, desc);
        GetAccountDescription_woRef();
    }
    if (idName == 'lugSeg5_DebitwoRef') {
        var code = getGridData(idNum, 0);
        var desc = getGridData(idNum, 1);
        _GridLU.SetText((SPR_without_SEG5 - 1), _row, code);
        _GridLU.SetText((SPR_without_REF5 - 1), _row, desc);
        GetAccountDescription_woRef();
    }
    if (idName == 'lugSeg6_DebitwoRef') {
        var code = getGridData(idNum, 0);
        var desc = getGridData(idNum, 1);
        _GridLU.SetText((SPR_without_SEG6 - 1), _row, code);
        _GridLU.SetText((SPR_without_REF6 - 1), _row, desc);
        GetAccountDescription_woRef();
    }
    if (idName == 'lugSLType_DebitwoRef') {
        _GridLU.SetText((SPR_without_SUBSIDIARYTYPE - 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_without_SLTYPECODE - 1), _row, getGridData(idNum, 0));
    }
    if (idName == 'lugSLRef_DebitwoRef') {
        _GridLU.SetText((SPR_without_SUBSIDIARYREF - 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_without_SLREFCODE - 1), _row, getGridData(idNum, 0));
    }
    if (idName == 'lugBankAccnt_DebitwoRef') {
        _GridLU.SetText((SPR_without_SUBACCOUNT - 1), _row, getGridData(idNum, 0));
    }   
    if (idName == "lugCtrlAcct_DebitwoRef") {
        _GridLU.SetText((SPR_without_APControlAcctCode - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_without_APControlAcctDesc - 1), _row, getGridData(idNum, 1));
    }        

    if (idName == 'lugTotalAPV')
    {                   
        _GridLU.SetText((SPR_TOTAL_APVNO - 1), _row, getGridData(idNum, 0));
        _GridLU.SetText((SPR_TOTAL_APVDATE - 1), _row, getGridData(idNum, 1));
        _GridLU.SetText((SPR_TOTAL_INVOICE - 1), _row, getGridData(idNum, 2));
        _GridLU.SetText((SPR_TOTAL_INVOICEDATE - 1), _row, getGridData(idNum, 3));
        _GridLU.SetText((SPR_TOTAL_AMTDUE - 1), _row, getGridData(idNum, 4));
        _GridLU.SetText((SPR_TOTAL_DPADV - 1), _row, getGridData(idNum, 5));
        _GridLU.SetText((SPR_TOTAL_DMAPP - 1), _row, getGridData(idNum, 6));
        _GridLU.SetText((SPR_TOTAL_RETENTION - 1), _row, getGridData(idNum, 7));
        _GridLU.SetText((SPR_TOTAL_NETAMT - 1), _row, getGridData(idNum, 8));    
        _GridLU.SetBackground((SPR_TOTAL_DETAILS - 1), _row, getGridData(idNum, 10));
        _GridLU.SetText((SPR_TOTAL_RCTAG - 1), _row, getGridData(idNum, 10));
        let remarks = $("#txtRemarks").val();
        let particulars = _GridLU.GetValue((SPR_TOTAL_REMARKS - 1), _row);
        if (particulars == "") {
            _GridLU.SetText((SPR_TOTAL_REMARKS - 1), _row, remarks);
        }        
        _GridLU.SetBackground((SPR_TOTAL_REMARKS - 1), _row, "#006060");

        //_GridLU.SetBackground((SPR_TOTAL_REMARKS - 1), _row, "Red");

        //Add Row
        if ((nwGridLDTotalAPV_Book.ActiveSheet.GetMaxRow() == (_row + 1)) && getGridData(idNum, 0) != "") {
            func_nwGrid_AddRow(`nwmyGridTotalAPV`, 1);
            TotalAPVProp();
        }        
    }
    if (idName == 'totalreason')
    {
        var code = getGridData(idNum, 0);
        var desc = getGridData(idNum, 1);
        var rsntype = getGridData(idNum, 2);

        _GridLU.SetText((SPR_TOTAL_REASON - 1), _row, code);
        _GridLU.SetText((SPR_TOTAL_REASONDESC - 1), _row, desc);
        _GridLU.SetText((SPR_TOTAL_REASONTYPE - 1), _row, rsntype);
    }  
    if (idName == 'lugLocForm') {
        $("#txtValueDate").val(CurrentServerDate);
        $("#lugPayee.lookups input").val('');
        $("#lugPayeeType.lookups input").val('');
        $("#lugSubPayee.lookups input").val('');
        $("#txtTin").val('');
        $("#txtPayeeAdress").val('');
        $("#txtCurrency").val('');
        cust_GetPara();
        nwParameter_Add("idvallugLocForm", $("#idvallugLocForm").val());
        nwParameter_Add("txtValueDate", $("#txtValueDate").val());
        func_ActionDriven("actValDate", false);
        setforex();
    }
    if (idName == 'lugCurrency') {
        SetForexHdr();
    }
}




function func_LookUpInitialize(lookupid) {
    cust_GetPara();

    if (lookupid == "lugAPVNo_DebitwRef") {
        var len = _GridLU.GetMaxRow();
        if (len >= 1) {
            var filter = "";
            for (var x = 0; x <= len; x++) {
                filter += _GridLU.GetText((SPR_APVNO - 1), x) + "|";
            }
            nwParameter_Add("filter", filter);
        } 
    }
    if (lookupid == "lugPayee_DebitwRef") {
        nwParameter_Add("Docno", _GridLU.GetText((SPR_APVNO - 1), _row));
        nwParameter_Add("igtCode", _GridLU.GetText((SPR_ITEMGROUPTYPE - 1), _row));
        nwParameter_Add("itemCode", _GridLU.GetText((SPR_ITEMCODE - 1), _row));
    }
    if (lookupid == "lugIGT_DebitwRef") {
        cust_GetPara();
        nwParameter_Add("vendor", _GridLU.GetText((SPR_PAYEEREFCODE - 1), _row));
        nwParameter_Add("rsnCode", _GridLU.GetText((SPR_REASON - 1), _row));
        nwParameter_Add("rsntype", _GridLU.GetText((SPR_REASONTYPE - 1), _row));
    }
    if (lookupid == "lugItemCode_DebitwRef") {
        cust_GetPara();
        nwParameter_Add("igtCode", _GridLU.GetText((SPR_ITEMGROUPTYPE - 1), _row));
        nwParameter_Add("vendor", _GridLU.GetText((SPR_PAYEEREFCODE - 1), _row));
        nwParameter_Add("rsnCode", _GridLU.GetText((SPR_REASON - 1), _row));
        nwParameter_Add("rsntype", _GridLU.GetText((SPR_REASONTYPE - 1), _row));
    }
    if (lookupid == "lugSLType_DebitwRef") {
        nwParameter_Add("seg1", _GridLU.GetText((SPR_SEG1 - 1), _row));
    }       
    if (lookupid == "lugSLRef_DebitwRef") {
        nwParameter_Add("sltype", _GridLU.GetText((SPR_SLTYPECODE - 1), _row));
    }
    if (lookupid == "lugBankAccnt_DebitwRef") {
        nwParameter_Add("seg1", _GridLU.GetText((SPR_SEG1 - 1), _row));
    }

    if (lookupid == "lugPayeeRef_DebitwoRef") {
        cust_GetPara();
        nwParameter_Add("igtCode", _GridLU.GetText((SPR_without_ITEMGROUPTYPE - 1), _row));
        nwParameter_Add("itemCode", _GridLU.GetText((SPR_without_ITEMCODE - 1), _row));
    }
    if (lookupid == "lugIGT_DebitwoRef") {
        cust_GetPara();
        nwParameter_Add("vendor", _GridLU.GetText((SPR_without_PAYEECODE - 1), _row));
        nwParameter_Add("rsnCode", _GridLU.GetText((SPR_without_REASON - 1), _row));
        nwParameter_Add("rsntype", _GridLU.GetText((SPR_without_REASONTYPE - 1), _row));
    }
    if (lookupid == "lugItemCode_DebitwoRef") {
        cust_GetPara();
        nwParameter_Add("igtCode", _GridLU.GetText((SPR_without_ITEMGROUPTYPE - 1), _row));
        nwParameter_Add("vendor", _GridLU.GetText((SPR_without_PAYEECODE - 1), _row));
        nwParameter_Add("rsnCode", _GridLU.GetText((SPR_without_REASON - 1), _row));
        nwParameter_Add("rsntype", _GridLU.GetText((SPR_without_REASONTYPE - 1), _row));
    }
    if (lookupid == "lugSLType_DebitwoRef") {
        nwParameter_Add("seg1", _GridLU.GetText((SPR_without_SEG1 - 1), _row));
    }       
    if (lookupid == "lugSLRef_DebitwoRef") {
        nwParameter_Add("sltype", _GridLU.GetText((SPR_without_SLTYPECODE - 1), _row));
    }
    if (lookupid == "lugBankAccnt_DebitwoRef") {
        nwParameter_Add("seg1", _GridLU.GetText((SPR_without_SEG1 - 1), _row));
    }

    if (lookupid == "lugTotalAPV") {
        filterofapvnofortotalapv();
        nwParameter_Add("idvallugCurrency", $("#idvallugCurrency").val());
    }         
}


function EnableFields() {
    $('#lugLocForm').enable(true);
    $('#lugPayeeType').enable(true);
    //$('#lugSubPayee').enable(true);
    $('#lugPayee').enable(true);
    $('#lugCurrency').enable(false);

    $('#btnRemarks').enable(true);
    $('#txtReasonDisApproval').enable(false);
    $('#btnSelectAppDetails').enable(true);
    //$('#btnDocumentAttached').enable(true);
    $('#btndebitnote').enable(false);
    $('#btndebitnotewithout').enable(false);
    $('#btnLineDetails').enable(false);
    $('#btnLineDetailswithout').enable(false);
    $('#btntotalAPV').enable(false);
    $('#btnJE').enable(false);
    $('#btnDisapprovalRemarks').enable(true);
    $('#txtValueDate').enable(true);
    $("#btnDocumentAttached").enable(false);
    $('#txtRefDate').enable(true);
    $("#txtValueDate").enable(true);
 
    $('#txtref').enable(true);
    $('#txtApDmStatus').enable(false);
    $('#txtRemarks').enable(true);    
}

function DisableFields() {
    $('#lugLocForm').enable(false);
    $('#lugPayeeType').enable(false);
    $('#lugSubPayee').enable(false);
    $('#lugPayee').enable(false);
    $('#lugCurrency').enable(false);

    $("#txtValueDate").enable(false);

    $('#btnRemarks').enable(false);
    $('#txtReasonDisApproval').enable(false);
    $('#btnSelectAppDetails').enable(false);
    $('#btnDocumentAttached').enable(false);
    $('#btndebitnote').enable(false);
    $('#btndebitnotewithout').enable(false);
    $('#btnLineDetails').enable(false);
    $('#btnLineDetailswithout').enable(false);
    $('#btntotalAPV').enable(false);
    $('#btnJE').enable(false);
    $('#btnDisapprovalRemarks').enable(false);
    $('#txtlocalforex').enable(false);
    $('#txtHomeforex').enable(false);
    $('#txtDMno').enable(false);
    $('#lugRsnDisapproval').enable(false);
    $('#txtDissRemarks').enable(false);
    $('#txtDebitNote').enable(false);
    $('#txtwDebitNote').enable(false);
    $('#txtTotalAPV').enable(false);
    $('#total').enable(false);
    $('.adisabled').enable(false);
    $('#txtRemarks').enable(false);

    $('#txtRefDate').enable(false);
    $('#txtRefDate').enable(false);
    $('#txtDateSubmitted').enable(false);
    $('#txtDatePosted').enable(false);
    $('#txtref').enable(false);
    $('#txtApDmStatus').enable(false);
    $('#cbpnontrade').enable(false);
    $('#cbtrade').enable(false);

    $('#txtTotalAPVAmount, #txtTotalOpenAmount').enable(false);
    $('#txtDPAdv, #txtDMApp, #txtRetention, #txtNetAmount').enable(false);
    $('#txtJESub, #txtVat, #txtVatafter, #txtEWT, #txtTotalAmt').enable(false);
}

function EnableFieldsDone() {//Binding Done
    $('#lugLocForm').enable(false);
    $('#lugPayeeType').enable(true);
    //$('#lugSubPayee').enable(true);
    $('#lugPayee').enable(true);
    $('#lugCurrency').enable(false);
    $("#txtRemarks").enable(true);
    $('#btnRemarks').enable(true);
    $('#txtReasonDisApproval').enable(false);
    $('#btnSelectAppDetails').enable(true);
    $('#btnDocumentAttached').enable(true);
    $('#btndebitnote').enable(true);
    $('#btndebitnotewithout').enable(true);
    $('#btnLineDetails').enable(true);
    $('#btnLineDetailswithout').enable(true);
    $('#btntotalAPV').enable(true);
    $('#btnJE').enable(true);
    $('#btnDisapprovalRemarks').enable(true);
       
    $('#txtref').enable(true);
    $('#txtRefDate').enable(true);
    $('#txtApDmStatus').enable(false);
    $('#cbpnontrade').enable(false);
    $('#cbtrade').enable(false);
    $("#txtValueDate").enable(true);
    
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingPrint().visible(true);
    $("#noah-webui-Toolbox").bindingPrint().enable(true);

    if (nwDocno != "") {
        $("#txtref").enable(false);
        $("#txtRefDate").enable(false);
        $("#txtRemarks").enable(false);
        $("#txtValueDate").enable(false);
    }
}


function DisableFieldsEmpty() {
    $('#lugLocForm').enable(false);
    $('#lugPayeeType').enable(false);
    //$('#lugSubPayee').enable(false);
    $('#lugPayee').enable(false);
    $('#lugCurrency').enable(false);


    $('#txtRemarks').enable(false);
    $('#btnRemarks').enable(true);
    $('#txtReasonDisApproval').enable(false);
    $('#btnSelectAppDetails').enable(true);
    $('#btnDocumentAttached').enable(false);
    $('#btndebitnote').enable(false);
    $('#btndebitnotewithout').enable(false);
    $('#btnLineDetails').enable(true);
    $('#btnLineDetailswithout').enable(true);
    $('#btntotalAPV').enable(false);
    $('#btnJE').enable(false);
    $('#btnDisapprovalRemarks').enable(true);


    $('#txtValueDate').enable(false);
    $('#txtRefDate').enable(false);
    $('#txtref').enable(false);
    $('#txtApDmStatus').enable(false);

   $('#lblRefNoisReq').addClass("refno");
    //$('#lblRefNoisReq').addClass("nwHideImportant");
    $('#lblRefNoisReq').removeClass("nwRequiredField");

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
    
}

//POP up for Debit Note With Reference
$(document).on("click", "#btndebitnote", function (e) {
    nwLoading_Start("xLodingDMBtn", crLoadingHTML);
    $('#txtTotalAPVAmount, #txtTotalOpenAmount').val("");
    defaultLocCode = $("#idvallugLocForm").val();
    defaultLocDesc = $("#descvallugLocForm").val();
    cust_GetPara();
    nwParameter_Add("IsTaxConvert", 0);
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("txtDMno", $('#txtDMno').val());
    $('#nwGenerateGriddebitwith .modal-hdr-title').text("Debit Note with Reference");
    nwPopupForm_ShowModal("nwGenerateGriddebitwith");
    func_ActionDriven("actGridDebitWithReference", true);
    return false;
});

//POP up for Debit Note With Reference DETAILS
$(document).on("click", ".btnDetails", function (e) {
    var docno = $('#txtDocno').val();
    var Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;
    var reftranno = Grid.GetText((SPR_APVNO - 1), _row);

    if (reftranno.length > 0) {
        var fullength = GetCurrentURL() + "../DCViewAttachment?nwDocno=" + reftranno + "";

        nwLoading_Start('xbtnRvwAttach', crLoadingHTML);
        nwPopupForm_Create("nwPopUpRvwAttach", true, fullength);
        $('#nwPopUpRvwAttach .modal-hdr-title').text("Review Attachment(s)");
        nwPopupForm_ShowModal("nwPopUpRvwAttach");
        nwLoading_End('xbtnRvwAttach');
    }
});


//POP up for Debit Note Without Reference 
$(document).on("click", "#btndebitnotewithout", function (e) {
    nwLoading_Start("xLodingDMBtn", crLoadingHTML);
    cust_GetPara();
    $("#idvallugAPControlAccnt, #descvallugAPControlAccnt").val("");
    defaultLocCode = $("#idvallugLocForm").val();
    defaultLocDesc = $("#descvallugLocForm").val();

    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("IsTaxConvert", 0);
    flag = 0;
    nwParameter_Add("flag", 0);
    $('#nwGenerateGriddebitwithout .modal-hdr-title').text("Debit Note without Reference");
    nwPopupForm_ShowModal("nwGenerateGriddebitwithout");
    func_ActionDriven("actGridDebitWithoutReference", true);

    return false;
});



//POP up for Line  Details Reference 
$(document).on("click", "#btnLineDetails", function (e) {
    nwLoading_Start("xLodingDMBtn", crLoadingHTML);
    cust_GetPara();
    nwParameter_Add("IsTaxConvert", 0);
    nwParameter_Add("nwDocno", nwDocno);
    $('#nwGenerateGridLineDetails .modal-hdr-title').text("Line Details with Reference");
    nwPopupForm_ShowModal("nwGenerateGridLineDetails");
    func_ActionDriven("actGridLineDetails", true);
    return false;

});


//POP up for Line  Details w Reference
$(document).on("click", ".btnLineDetailsLD", function (e) {
    var Grid = nwGridLineDetails_Book.ActiveSheet;
    if (Grid.GetText((SPR_LD_APVNO - 1), _row) == "")
        return;
    cust_GetPara();
    nwParameter_Add("APVNO", Grid.GetText((SPR_LD_APVNO - 1), _row));
    nwParameter_Add("apvAmount", Grid.GetText((SPR_LD_APVAMT - 1), _row));
    nwParameter_Add("apvRowno", Grid.GetText((SPR_LD_APVROWNO - 1), _row));
    nwParameter_Add("debitMemoNo", $("#txtDMno").val());
    nwParameter_Add("isResetTax", isResetTax);
    $('#APVDateLD').val(Grid.GetText((SPR_LD_APVDATE - 1), _row));
    $('#APVNoLD').val(Grid.GetText((SPR_LD_APVNO - 1), _row));
    $('#APVAmountLD').val(Grid.GetText((SPR_LD_APVAMT - 1), _row));

    $('#nwGenerateDetailsLD .modal-hdr-title').text("Line Details with Reference");
    nwPopupForm_ShowModal("nwGenerateDetailsLD");   
    func_ActionDriven("actGridLineDetails2", true);
    return false;

});



//POP up for Line  Details  Without Reference
$(document).on("click", "#btnLineDetailswithout", function (e) {
    //nwParameter_Add("IsTaxConvert", 0);
    //$('#nwGenerateGridLDWithout .modal-hdr-title').text(basedTitle);
    //nwPopupForm_ShowModal("nwGenerateGridLDWithout");
    //func_ActionDriven("actGridLineDetailsWithout", true);
    //return false;

    nwLoading_Start("xLodingDMBtn", crLoadingHTML);
    cust_GetPara();
    // same lang nman debit note without ref. ewanq bat pinaghiwalay pa.
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("IsTaxConvert", 0);
    flag = 1;
    nwParameter_Add("flag", 1);
    $('#nwGenerateGriddebitwithout .modal-hdr-title').text("Line Details without Reference");
    nwPopupForm_ShowModal("nwGenerateGriddebitwithout");
    func_ActionDriven("actGridDebitWithoutReference", true);

    return false;

});



//POP up for TOTAL APV
$(document).on("click", "#btntotalAPV", function (e) {
    nwLoading_Start("xLodingDMBtn", crLoadingHTML);
    cust_GetPara();
    nwParameter_Add("nwDocno", nwDocno);
    $('#nwGenerateGridTotalAPV .modal-hdr-title').text("Total APV Reference");
    nwPopupForm_ShowModal("nwGenerateGridTotalAPV");
    func_ActionDriven("actGridTotalAPV", true);
    return false;

});



//POP up for JE
$(document).on("click", "#btnJE", function (e) {
    nwLoading_Start("xLodingDMBtn", crLoadingHTML);
    cust_GetPara();
    $('#nwGenerateGridJE .modal-hdr-title').text("View Journal Entries");
    nwPopupForm_ShowModal("nwGenerateGridJE");
    func_ActionDriven("actGridJE", true);
    return false;
});

function ClearFields() {
    $('#idvallugLocForm,#descvallugLocForm,#idvallugPayeeType,#descvallugPayeeType,#idvallugSubPayee,#descvallugSubPayee,#idvallugPayee,#descvallugPayee,#txtTin,#txtCurrency,#idvallugCurrency,#descvallugCurrency,#txtDMno,#txtValueDate, #txtDatePosted, #txtRefDate, #txtref,#txtApDmStatus,#txtReasonDisApproval,#txtDebitNote,#txtwDebitNote,#txtLineDetails,#txtLineDetailwithout,#txtTotalAPV,#total,#txtremarksarea,#tfxtdisapproveremarksarea,#txtlocalforex,#txtHomeforex,#txtPayeeAdress').val('');
    $('#cbtrade').prop('checked', true);
    $('#cbpnontrade').prop('checked', false);
    $('#txtRemarks').val("")
    $('#txtDebitNote').val("0.00")
    $('#txtwDebitNote').val("0.00")
    $('#txtLineDetails').val("0.00")
    $('#txtLineDetailwithout').val("0.00")
    $('#txtTotalAPV').val("0.00")
    $('#total').val("0.00")
    $("#txtValueDate").val('');
    $('#idvallugRsnDisapproval, #descvallugRsnDisapproval, #txtDissRemarks').val("")
    setBtnRqmtCompli('');
}
function toolboxsetter()
{
    $('#noah-webui-Toolbox').bindingNavigator().visible(true);
    $('#noah-webui-Toolbox').bindingDelete().visible(true);
    $('#noah-webui-Toolbox').bindingNew().visible(true);
    $('#noah-webui-Toolbox').bindingSave().visible(true);
    $('#noah-webui-Toolbox').bindingDelete().enable(false);
    $('#noah-webui-Toolbox').bindingSave().enable(false);
    $('#noah-webui-Toolbox').bindingExport().visible(false);
    $('#noah-webui-Toolbox').bindingProcess().visible(true);
    $('#noah-webui-Toolbox').bindingProcess().enable(false);
    $('#noah-webui-Toolbox').bindingPrint().enable(false);
    $("#noah-webui-Toolbox").bindingPrint().visible(false);
}

function toolboxrefresh() {
    $('#noah-webui-Toolbox').bindingNavigator().visible(true);
    $('#noah-webui-Toolbox').bindingDelete().visible(true);
    $('#noah-webui-Toolbox').bindingNew().visible(true);
    $('#noah-webui-Toolbox').bindingNew().enable(true);
    $('#noah-webui-Toolbox').bindingSave().visible(true);
    $('#noah-webui-Toolbox').bindingDelete().enable(true);
    $('#noah-webui-Toolbox').bindingSave().enable(true);
    $('#noah-webui-Toolbox').bindingInquire().enable(true);
    $('#noah-webui-Toolbox').bindingExport().enable(true);
    $('#noah-webui-Toolbox').bindingProcess().enable(true);
    $('#noah-webui-Toolbox').bindingPrint().enable(true);
    $('#txtDescription').prop('disabled', false);
    $('#txtdaysnum').prop('disabled', false);
}

function toolboxnew() {
    $('#btnDisapprovalRemarks').prop('disabled', true);
    $('#btnSelectAppDetails').prop('disabled', true);
    $('#btnDocumentAttached').prop('disabled', true);
    $('#btnRemarks').prop('disabled', false);
    $('#cbpnontrade').enable(true);
    $('#cbtrade').enable(true);
    $('#noah-webui-Toolbox').bindingDelete().visible(false);
    $('#noah-webui-Toolbox').bindingPrint().enable(false);
    $('#btnDocumentAttached').removeClass('btn-default-green');
    $('#btnSelectAppDetails').removeClass('btn-default-green');
    $('#btndebitnote').removeClass('btn-default-green');
    $('#btndebitnotewithout').removeClass('btn-default-green');
    $('#btnLineDetails').removeClass('btn-default-green');
    $('#btnLineDetailswithout').removeClass('btn-default-green');
    $('#btntotalAPV').removeClass('btn-default-green');
    $('#btnJE').removeClass('btn-default-green');
}




$(document).on("click", "#btnDocumentAttached", function (e) {

    var trantype = "PDMEMO";
    var docno = $('#txtDMno').val();
    if(docno != ""){
        var isView = nwDocno != "" ? true : false;
        var fullength = GetCurrentURL() + "../DCRequirementCompliance?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=" + isView + "";
        nwLoading_Start('btnReqCompliance', crLoadingHTML);
        nwPopupForm_Create("ViewReqCompliance", true, fullength);
        $('#ViewReqCompliance .modal-hdr-title').text("Requirements Compliance");
        nwPopupForm_ShowModal("ViewReqCompliance");
        nwLoading_End('btnReqCompliance');
    }

    return false;
});

var dblClickGrid = "";
function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {

    var nwobjID = nwobj.attr('id');
    cust_GetPara();
    dblClickGrid = nwobjID;

    var col = crnwTD.index();
    var currRow = _row;  

    if (nwobjID == "nwGridDebitNoteWithReferece")
    {
        nwParameter_Add("APVNoPerRow", crnwTR.find("td:eq(" + SPR_APVNO + ")").text());

        if (crnwTD.index() != SPR_APVNO && crnwTR.find("td:eq(" + SPR_APVNO + ")").text() == "") {
            MessageBox("Cannot proceed. APV No. is required.", basedTitle);
            return;
        }
        if (crnwTD.index() == SPR_APVNO) {
            nwParameter_Add("chckAutoAllocate", $("#chckAutoAllocate").prop("checked"));
            lookUpCustomize("lugAPVNo_DebitwRef", 2);
        }
        if (crnwTD.index() == SPR_REASON) {
            //lookUpCustomize("reasondebitref", 1);
            lookUpCustomize("lugRsn_DebitwRef", 1);
        }
        if (crnwTD.index() == SPR_PAYEEREF) {            
            $('#txtisPayeeCode').val(crnwTR.find("td:eq(" + SPR_ISSUPPLIER + ")").text());
            //lookUpCustomize("referencedebit", 1);
            lookUpCustomize("lugPayee_DebitwRef", 1);
        }
        if (crnwTD.index() == SPR_ITEMGROUPTYPEDESC) {
            //lookUpCustomize("lugitemgroup", 1);
            lookUpCustomize("lugIGT_DebitwRef", 1);
        }
        if (crnwTD.index() == SPR_ITEMDESC) {
            //lookUpCustomize("lugitemgroup", 1);
            lookUpCustomize("lugItemCode_DebitwRef", 1);
        }
        if (crnwTD.index() == SPR_VATDESC) {
            //lookUpCustomize("lugitemgroup", 1);
            lookUpCustomize("lugVAT_DebitwRef", 1);
        }
        if (crnwTD.index() == SPR_EWTDESC) {
            //lookUpCustomize("lugitemgroup", 1);
            lookUpCustomize("lugEWT_DebitwRef", 1);
        }
        if (crnwTD.index() == SPR_SEG1) {
            lookUpCustomize("lugSeg1_DebitwRef", 1);
        }
        if (crnwTD.index() == SPR_SEG2) {
            lookUpCustomize("lugSeg2_DebitwRef", 1);
        }
        if (crnwTD.index() == SPR_SEG3) {
            lookUpCustomize("lugSeg3_DebitwRef", 1);
        }
        if (crnwTD.index() == SPR_SEG4) {
            lookUpCustomize("lugSeg4", 1);
        }
        if (crnwTD.index() == SPR_SEG5) {
            lookUpCustomize("lugSeg5", 1);
        }
        if (crnwTD.index() == SPR_SEG6) {
            lookUpCustomize("lugSeg6", 1);
        }
        if (crnwTD.index() == SPR_SUBLEDGERTYPE) {
            if (crnwTR.find("td:eq(" + SPR_REQSLTYPE + ")").text() == "1") {
                lookUpCustomize("lugSLType_DebitwRef", 1);
            }
        }
        if (crnwTD.index() == SPR_SUBSIDIARYLREF) {            
            if (crnwTR.find("td:eq(" + SPR_REQSLTYPE + ")").text() == "1") {
                lookUpCustomize("lugSLRef_DebitwRef", 1);
            }
        }           
        if (crnwTD.index() == SPR_SUBACCOUNT) {             
            if (crnwTR.find("td:eq(" + SPR_REQSUBACCOUNT + ")").text() == "1") {
                lookUpCustomize("lugBankAccnt_DebitwRef", 1);
            }
        }      
    }
    else if (nwobjID == "nwGridDebitNoteWithoutReferece") {
        if (crnwTD.index() == SPR_without_REASON) {
            nwParameter_Add("flag", flag);
            //lookUpCustomize("debitwoutrefreason", 1);
            lookUpCustomize("lugReason_DebitwoRef", 1);
        }
        if (crnwTD.index() == SPR_without_PAYEEREF) {
            //lookUpCustomize("debitwoutrefpayeeref", 1);
            lookUpCustomize("lugPayeeRef_DebitwoRef", 1);
        }
        if (crnwTD.index() == SPR_without_ITEMGROUPTYPEDESC) {
            //lookUpCustomize("debitwoutrefitemgroupitem", 1);
            lookUpCustomize("lugIGT_DebitwoRef", 1);
        }
        if (crnwTD.index() == SPR_without_ITEMDESC) {
            lookUpCustomize("lugItemCode_DebitwoRef", 1);
        }
        if (crnwTD.index() == SPR_without_VATDESC) {
            //lookUpCustomize("lugitemgroup", 1);
            lookUpCustomize("lugVAT_DebitwoRef", 1);
        }
        if (crnwTD.index() == SPR_without_EWTDESC) {
            //lookUpCustomize("lugitemgroup", 1);
            lookUpCustomize("lugEWT_DebitwoRef", 1);
        }
        if (crnwTD.index() == SPR_without_SEG1) {
            //lookUpCustomize("debitwoutrefmain", 1);
            lookUpCustomize("lugSeg1_DebitwoRef", 1);
        }
        if (crnwTD.index() == SPR_without_SEG2) {
            //lookUpCustomize("debitwoutrefprofitcenter", 1);
            lookUpCustomize("lugSeg2_DebitwoRef", 1);
        }
        if (crnwTD.index() == SPR_without_SEG3) {
            //lookUpCustomize("debitwoutrefcostcenter", 1);
            lookUpCustomize("lugSeg3_DebitwoRef", 1);
        }
        if (crnwTD.index() == SPR_without_SEG4) {
            //lookUpCustomize("debitwoutreflugSeg4", 1);
            lookUpCustomize("lugSeg4_DebitwoRef", 1);
        }
        if (crnwTD.index() == SPR_without_SEG5) {
            //lookUpCustomize("debitwoutreflugSeg5", 1);
            lookUpCustomize("lugSeg5_DebitwoRef", 1);
        }
        if (crnwTD.index() == SPR_without_SEG6) {
            //lookUpCustomize("debitwoutreflugSeg6", 1);
            lookUpCustomize("lugSeg6_DebitwoRef", 1);
        }
        if (crnwTD.index() == SPR_without_SUBSIDIARYTYPE) {            
            if (crnwTR.find("td:eq(" + SPR_without_REQSLTYPE + ")").text() == "1") {
                //lookUpCustomize("debitwoutrefsubledtype", 1);
                lookUpCustomize("lugSLType_DebitwoRef", 1);
            }
        }
        if (crnwTD.index() == SPR_without_SUBSIDIARYREF) {            
            if (crnwTR.find("td:eq(" + SPR_without_REQSLTYPE + ")").text() == "1") {
                //lookUpCustomize("debitwoutrefsubledref", 1);
                lookUpCustomize("lugSLRef_DebitwoRef", 1);
            }
        }
        if (crnwTD.index() == SPR_without_SUBACCOUNT) {            
            if (crnwTR.find("td:eq(" + SPR_without_REQSUBACCOUNT + ")").text() == "1") {
                //lookUpCustomize("debitwoutrefsubaccount", 1);
                lookUpCustomize("lugBankAccnt_DebitwoRef", 1);
            }
        }
        if (crnwTD.index() == SPR_without_APControlAcctCode) {
            //lookUpCustomize("lugControlAccount", 1);
            lookUpCustomize("lugCtrlAcct_DebitwoRef", 1);
        }
    }    

    else if(nwobjID == 'nwmyGridTotalAPV')
    {
        if (crnwTD.index() == SPR_TOTAL_APVNO)
        {          
            //lookUpCustomize("totalapvno", 1);
            lookUpCustomize("lugTotalAPV", 1);
        }
        if (crnwTD.index() == SPR_TOTAL_REASON)
        {
            lookUpCustomize("totalreason", 1);
        }
    }
      
}


$(document).on("change", "#txtref", function (e) {
    var refno = $('#txtref').val();
    if (refno != '') {
        $('#lblRefNoisReq').removeClass("refno");
        //$('#lblRefNoisReq').addClass("nwHideImportant");
        $('#lblRefNoisReq').addClass("nwRequiredField");
    } else {
        //$('#lblRefNoisReq').removeClass("nwHideImportant");
        $('#lblRefNoisReq').removeClass("nwRequiredField");
        $('#lblRefNoisReq').addClass("refno");
    }
});
     

//    if (valueDate > serverdate)
//    {
//        MessageBox("Value Date should be earlier or equal on current server date.", basedTitle)
//        $('#txtValueDate').val('')
//        return;
//    }

//    nwParameter_Add("idvallugLocForm", $("#idvallugLocForm").val());
//    nwParameter_Add("txtValueDate", $(this).val());
//    func_ActionDriven("actValueDateValidation", false);
//});



function setforex()
{
    var loc = $('#idvallugLocForm').val();
    var valuedate = $('#txtValueDate').val();
    var currency = $('#idvallugCurrency').val();
    if(loc.length>0 && currency.length>0)
    {
        nwLoading_Start("actsetforex", crLoadingHTML);
        cust_GetPara();
        func_ActionDriven("actsetforex", true); 
    }

}



$(document).on("click", "#btnDisapprovalRemarks", function (e) {
    nwPopupForm_ShowModal("nwGeneratedissappRemarks");
    return false;
});


function lugpayeetypechange() {
    $('#idvallugSubPayee').val('');
    $('#descvallugSubPayee').val('');
    $('#idvallugPayee').val('');
    $('#descvallugPayee').val('');
    $('#txtTin').val('');
    $('#txtPayeeAdress').val('');
    $('#txtCurrency').val('');
    $('#txtlocalforex').val('');
    $('#txtHomeforex').val('');
    $("#txtValueDate").val('');

}

function lugpayeesubtypechange() {
    $('#idvallugPayee').val('');
    $('#descvallugPayee').val('');
    $('#txtTin').val('');
    $('#txtPayeeAdress').val('');
    $('#txtCurrency').val(''); 
    $('#txtlocalforex').val('');
    $('#txtHomeforex').val('');
    $("#txtValueDate").val('');

}

function disabledbuttons() {
    if (nwDocno != "") {
        $('.nwgrid_buttons').enable(false);
    }
}

function concatdesc()
{
    var Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;
    var Main = Grid.GetText((SPR_REF1 - 1), _row);
    var Profit = Grid.GetText((SPR_REF2 - 1), _row);
    var Cost = Grid.GetText((SPR_REF3 - 1), _row);
    var ItemGroup = Grid.GetText((SPR_REF4 - 1), _row);
    var lugSeg5 = Grid.GetText((SPR_REF5 - 1), _row);
    var lugSeg6 = Grid.GetText((SPR_REF6 - 1), _row);
    if (Main != "" && Profit != "" && Cost != "" && ItemGroup != "" && lugSeg5 != "" && lugSeg6 != "") {
        Grid.SetText((SPR_ACCOUNTDESC - 1), _row, (Main + "  " + Profit + "  " + Cost + "  " + ItemGroup + " " + lugSeg5 + " " + lugSeg6));
    }

}


function concatdescwithoutref() {
    var Grid = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet;
    var Main = Grid.GetText((SPR_without_REF1 - 1), _row);
    var Profit = Grid.GetText((SPR_without_REF2 - 1), _row);
    var Cost = Grid.GetText((SPR_without_REF3 - 1), _row);
    var ItemGroup = Grid.GetText((SPR_without_REF4 - 1), _row);
    var WOlugSeg5 = Grid.GetText((SPR_without_REF5 - 1), _row);
    var WOlugSeg6 = Grid.GetText((SPR_without_REF6 - 1), _row);
    if (Main != "" && Profit != "" && Cost != "" && ItemGroup != "" && WOlugSeg5 != "" && WOlugSeg6 != "") {
        Grid.SetText((SPR_without_ACCOUNTDESC  - 1), _row, (Main + "  " + Profit + "  " + Cost + "  " + ItemGroup + " " + WOlugSeg5 + " " + WOlugSeg6));
    } 
}

function checkisreqsubaccountindebitnotewithreference(){
    var Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;
    var len = Grid.GetMaxRow();

    for (var i = 0; i < len; i++) {
        if (Grid.GetText((SPR_REQSUBACCOUNT - 1), i).length > 0)
        {
            if (Grid.GetText((SPR_REQSUBACCOUNT - 1), i) == "1") {
                Grid.SetBackground((SPR_SUBACCOUNT - 1), i, "cyan");
            }
            else {
                Grid.SetBackground((SPR_SUBACCOUNT - 1), i, "gainsboro");
            }
            Grid.SetText((SPR_SUBACCOUNT - 1), i, "");
        }
    }
}

function checkisreqsltypeaccountindebitnotewithreference() {
    var Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;
    var len = Grid.GetMaxRow();

    for (var i = 0; i < len; i++) {
        if (Grid.GetText((SPR_REQSLTYPE - 1), i).length > 0) {
            if (Grid.GetText((SPR_REQSLTYPE - 1), i) == "1") {
                Grid.SetBackground((SPR_SUBLEDGERTYPE - 1), i, "cyan");
                Grid.SetBackground((SPR_SUBSIDIARYLREF - 1), i, "cyan");
            }
            else {
                Grid.SetBackground((SPR_SUBLEDGERTYPE - 1), i, "gainsboro");
                Grid.SetBackground((SPR_SUBSIDIARYLREF - 1), i, "gainsboro");
            }
            Grid.SetText((SPR_SUBSIDIARYLREF - 1), i, "");
            Grid.SetText((SPR_SUBLEDGERTYPE - 1), i, "");
        }
    }
}
 
function checkisreqsubaccountindebitnotewithoutreference() {
    var Grid = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet;
    var len = Grid.GetMaxRow();

    for (var i = 0; i < len; i++) {
        if (Grid.GetText((SPR_without_REQSUBACCOUNT - 1), i).length > 0) {
            if (Grid.GetText((SPR_without_REQSUBACCOUNT - 1), i) == "1") {
                Grid.SetBackground((SPR_without_SUBACCOUNT - 1), i, "cyan");
            }
            else {
                Grid.SetBackground((SPR_without_SUBACCOUNT - 1), i, "gainsboro");
            }
            Grid.SetText((SPR_without_SUBACCOUNT - 1), i, "");
        }
    }
}

function checkisreqsltypeaccountindebitnotewithoutreference() {
    var Grid = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet;
    var len = Grid.GetMaxRow();

    for (var i = 0; i < len; i++) {
        if (Grid.GetText((SPR_without_REQSLTYPE - 1), i).length > 0) {
            if (Grid.GetText((SPR_without_REQSLTYPE - 1), i) == "1") {
                Grid.SetBackground((SPR_without_SUBSIDIARYTYPE - 1), i, "cyan");
                Grid.SetBackground((SPR_without_SUBSIDIARYREF - 1), i, "cyan");
            }
            else {
                Grid.SetBackground((SPR_without_SUBSIDIARYTYPE - 1), i, "gainsboro");
                Grid.SetBackground((SPR_without_SUBSIDIARYREF - 1), i, "gainsboro");
            }
            Grid.GetText((SPR_without_SUBSIDIARYTYPE - 1), i, "");
            Grid.GetText((SPR_without_SUBSIDIARYREF - 1), i, "");
        }
    }
}

function checkisreqsubaccountinlinedetailswithref() {
    var Grid = nwGridLineDetails_Book.ActiveSheet;
    var len = Grid.GetMaxRow();

    for (var i = 0; i < len; i++) {
        if (Grid.GetText((SPR_LD_REQSUBACCOUNT - 1), i).length > 0) {
            if (Grid.GetText((SPR_LD_REQSUBACCOUNT - 1), i) == "1") {
                Grid.SetBackground((SPR_LD_SUBACCOUNT - 1), i, "cyan");
            }
            else {
                Grid.SetBackground((SPR_LD_SUBACCOUNT - 1), i, "gainsboro");
            }
            Grid.SetText((SPR_LD_SUBACCOUNT - 1), i, "");
        }
    }
}





function checkisreqsltypeaccountinlinedetailswithref() {
    var Grid = nwGridLineDetails_Book.ActiveSheet;
    var len = Grid.GetMaxRow();

    for (var i = 0; i < len; i++) {
        if (Grid.GetText((SPR_LD_REQSLTYPE - 1), i).length > 0) {
            if (Grid.GetText((SPR_LD_REQSLTYPE - 1), i) == "1") {
                Grid.SetBackground((SPR_LD_SUBSIDIARYLEDGERTYPE - 1), i, "cyan");
                Grid.SetBackground((SPR_LD_SUBSIDIARYLEDGERREF - 1), i, "cyan");
            }
            else {
                Grid.SetBackground((SPR_LD_SUBSIDIARYLEDGERTYPE - 1), i, "gainsboro");
                Grid.SetBackground((SPR_LD_SUBSIDIARYLEDGERREF - 1), i, "gainsboro");
                Grid.SetText((SPR_LD_SUBSIDIARYLEDGERTYPE - 1), i, "");
                Grid.SetText((SPR_LD_SUBSIDIARYLEDGERREF - 1), i, "");
            }
        }
    }
}

function checkisreqsubaccountinlinedetailswithoutref() {
    var Grid = nwGridLDWithout_Book.ActiveSheet;
    var len = Grid.GetMaxRow();

    for (var i = 0; i < len; i++) {
        if (Grid.GetText((SPR_LDW_REQSUBACCOUNT - 1), i).length > 0) {
            if (Grid.GetText((SPR_LDW_REQSUBACCOUNT - 1), i) == "1") {
                Grid.SetBackground((SPR_LDW_SUBACCCOUNT - 1), i, "cyan");
            }
            else {
                Grid.SetBackground((SPR_LDW_SUBACCCOUNT - 1), i, "gainsboro");
            }
            Grid.SetText((SPR_LDW_SUBACCCOUNT - 1), i, "");
        }
    }
}

function checkisreqsltypeaccountinlinedetailswithoutref() {
    var Grid = nwGridLDWithout_Book.ActiveSheet;
    var len = Grid.GetMaxRow();

    for (var i = 0; i < len; i++) {
        if (Grid.GetText((SPR_LDW_REQSLTYPE - 1), i).length > 0) {
            if (Grid.GetText((SPR_LDW_REQSLTYPE - 1), i) == "1") {
                Grid.SetBackground((SPR_LDW_SUBSIDIARYLTYPE - 1), i, "cyan");
                Grid.SetBackground((SPR_LDW_SUBSIDIARYREF - 1), i, "cyan");
            }
            else {
                Grid.SetBackground((SPR_LDW_SUBSIDIARYLTYPE - 1), i, "gainsboro");
                Grid.SetBackground((SPR_LDW_SUBSIDIARYREF - 1), i, "gainsboro");
            }
            Grid.SetText((SPR_LDW_SUBSIDIARYLTYPE - 1), i, "");
            Grid.SetText((SPR_LDW_SUBSIDIARYREF - 1), i, "");
        }
    }
}

//Debit Note with Reference
$(document).on("click", "#debitnotewrefsaveExit", function (e) {
    nwLoading_Start("xactDebitwRefSave", crLoadingHTML);
    cust_GetPara();
    nwParameter_Add("ifTaxConvertIsClick", ifTaxConvertIsClick);
    nwParameter_Add("chckAutoAllocate", $("#chckAutoAllocate").prop("checked"));
    func_ActionDriven('actDebitwRefSave', true);
});


$(document).on("click", "#debitnotewoutrefsaveExit", function (e) {
    nwLoading_Start("xdebitnotewoutrefsaveExit", crLoadingHTML);
    cust_GetPara()
    func_ActionDriven('actdebitnotewoutrefsaveandexit', true);
});

//Line Details with Reference
$(document).on("click", "#linedetailwrefsaveExit", function (e) {
    nwLoading_Start("xSample", crLoadingHTML);
    cust_GetPara()
    func_ActionDriven('actlinedetailwrefsaveandexit', true);
});

$(document).on("click", "#linedetailwoutrefsaveExit", function (e) {
    cust_GetPara()
    func_ActionDriven('actlinedetailwoutrefsaveandexit', true);
});


$(document).on("click", "#totalsaveExit", function (e) {
    nwLoading_Start("xtotalsaveExit", crLoadingHTML);
    cust_GetPara()
    func_ActionDriven('acttotalsaveandexit', true);
});

$(document).on("change", ".dmqty", function (e) {
    computedmocyamount();
});
$(document).on("change", ".dmunit", function (e) {
    computedmocyamount();
});

$(document).on("change", ".linedetailswithoutrefquantity", function (e) {
    computedmocyamountwithoutref();
});
$(document).on("change", ".lindetailswithoutrefunitcost", function (e) {
    computedmocyamountwithoutref();
});

function computedmocyamount(){
    var Grid = nwGridLineDetails_Book.ActiveSheet;
    var len = Grid.GetMaxRow();

    for (var i = 0; i < len; i++)
    {
        var qty = Grid.GetText((SPR_LD_DMQTY - 1), i);
        var unit = Grid.GetText((SPR_LD_DMUNIT - 1), i);

        if (qty.length > 0 && unit.length > 0) {
            var dmocyamount = parseFloat(qty) * parseFloat(unit);
            Grid.SetText((SPR_LD_OCYAMMOUNT - 1), i, (dmocyamount));
        }
    }
}

function computedmocyamountwithoutref() {
    var Grid = nwGridLDWithout_Book.ActiveSheet;
    var len = Grid.GetMaxRow();

    for (var i = 0; i < len; i++) {
        var qty = Grid.GetText((SPR_LDW_QUANTITY - 1), i);
        var unit = Grid.GetText((SPR_LDW_UNITCOST - 1), i);

        if (qty.length > 0 && unit.length > 0) {
            var dmocyamount = parseFloat(qty) * parseFloat(unit);
            Grid.SetText((SPR_LDW_OCY - 1), i, (dmocyamount));
        }
    }
}

function filterofapvnofortotalapv()
{
    filter = "";
    var Grid = nwGridLDTotalAPV_Book.ActiveSheet;
    var length = Grid.GetMaxRow();

    for (var i = 0; i < length; i++) {
        if (filter == "") {
            filter = Grid.GetText((SPR_TOTAL_APVNO - 1), i);
        }
        else {
            filter += "|" + Grid.GetText((SPR_TOTAL_APVNO - 1), i);
        }
    }
    nwParameter_Add("filterx", filter);
}

$(document).on("click", "#NwProcess", function (e) {
    msgBoxContainerQuestion = "Processdata";
    parent_MessageBoxQuestion("Do you want to process the transaction(s)?", "Debit Memo Entry", "Question");
    return true;
});


function msgBoxContainerQuestionF(genID, answer) {
    cust_GetPara();
    if (genID == "Processdata") {
        if (answer == "Yes") {
            nwLoading_Start("xSample", crLoadingHTML);
            cust_GetPara();
            func_ActionDriven("actprocess", true);
        }
    }

    else if (genID == "btnAttachSave") {
        if (answer == "Yes") {
            nwLoading_Start("xSample", crLoadingHTML);
            cust_GetPara();
            nwParameter_Add("GeneralNo", $('#txtGJ').val());
            //nwParameter_Add_Table('nwGridCon6');
            try {
                nwParameter_Add_DataSet("nwGridConMain6");
            } catch (e) { }
            func_ActionDriven('actSaveAttachment', false);
        }
    }
    else if (genID == "btnattremove") {
        if (answer == "Yes") {
            nwGridConMain6_Book.ActiveSheet.GetText((SPR_FILEPATH - 1), _row);
            var tempindex = _row;

            nwGridAttCon_Book.ActiveSheet.SetBackground((SPR_VIEW - 1), _row, "#006060");
        }
    }

    else if (genID == "SaveDocAtt") {
        if (answer == "Yes") {
            nwLoading_Start("xSample", crLoadingHTML);
            cust_GetPara();
            //nwParameter_Add_Table('nwGridAttCon');
            try {
                nwParameter_Add_DataSet("nwGridAttCon");
            } catch (e) { }
            func_ActionDriven('actsaveAtt', false);
        }
    }
}

function removePrompt()
{
    MessageBox("Successfully removed.", basedTitle);
}
function processclose() { 
   nwPopupForm_HideModal("FormProcess");
}


var ifTaxConvertIsClick = 0;
$(document).on("click", "#debitnotewreftaxConvert", function (e) {
    nwLoading_Start("xLodingDMBtn", crLoadingHTML);
    cust_GetPara();
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("IsTaxConvert", 1);
    nwParameter_Add("flag", flag);
    nwParameter_Add("chckAutoAllocate", $("#chckAutoAllocate").prop("checked"));
    nwParameter_Add("txtTagPC", $("#txtTagPC").prop("checked"));
    ifTaxConvertIsClick = 1;
    nwParameter_Add("ifTaxConvertIsClick", ifTaxConvertIsClick);
    func_ActionDriven("actGridDebitWithReference", true);
    return false;
});

$(document).on("click", "#debitnotewrefresetTax", function (e) {
    nwLoading_Start("xLodingDMBtn", crLoadingHTML);
    nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.GetMaxRow() == 0 ? nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.RowAdd(0, 1) : "";
    cust_GetPara();
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("IsTaxConvert", 2);
    nwParameter_Add("flag", flag);
    nwParameter_Add("chckAutoAllocate", $("#chckAutoAllocate").prop("checked"));
    nwParameter_Add("txtTagPC", $("#txtTagPC").prop("checked"));
    ifTaxConvertIsClick = 0;
    isResetTax = true;
    nwParameter_Add("ifTaxConvertIsClick", ifTaxConvertIsClick);
    func_ActionDriven("actGridDebitWithReference", true);
    return false;
});

$(document).on("click", "#debitnotewoutreftaxConvert", function (e) {
    ifTaxConvertIsClick = 1;
    nwLoading_Start("xdebitnotewoutreftaxConvert", crLoadingHTML);
    cust_GetPara();
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("IsTaxConvert", 1);
    nwParameter_Add("flag", flag);
    func_ActionDriven("actGridDebitWithoutReference", true);
    return false;
});
$(document).on("click", "#debitnotewoutrefresetTax", function (e) {
    ifTaxConvertIsClick = 0;
    nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.GetMaxRow() == 0 ? nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.RowAdd(0, 1) : "";
    nwLoading_Start("xdebitnotewoutreftaxConvert", crLoadingHTML);
    cust_GetPara();
    nwParameter_Add("IsTaxConvert", 2);
    nwParameter_Add("flag", flag);
    func_ActionDriven("actGridDebitWithoutReference", true);
    return false;
});

$(document).on("click", "#linedetailwreftaxConvert", function (e) {
    nwLoading_Start("xSample", crLoadingHTML);
    cust_GetPara();
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("IsTaxConvert", 1);
    nwParameter_Add("isResetTax", isResetTax);
    nwParameter_Add("flag", flag);
    func_ActionDriven("actGridLineDetails", true);
    return false;
});

$(document).on("click", "#linedetailwrefresetTax", function (e) {
    isResetTax = true;
    nwGridLineDetails_Book.ActiveSheet.GetMaxRow() == 0 ? nwGridLineDetails_Book.ActiveSheet.RowAdd(0, 1) : "";
    cust_GetPara();
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("IsTaxConvert", 2);
    nwParameter_Add("flag", flag);
    func_ActionDriven("actGridLineDetails", true);
    return false;
});

$(document).on("click", "#linedetailwoutreftaxConvert", function (e) {
    cust_GetPara();
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("IsTaxConvert", 1);
    nwParameter_Add("flag", flag);
    func_ActionDriven("actGridLineDetailsWithout", true);
    return false;
});
$(document).on("click", "#linedetailwoutrefresetTax", function (e) {
    nwGridLDWithout_Book.ActiveSheet.GetMaxRow() == 0 ? nwGridLDWithout_Book.ActiveSheet.RowAdd(0, 1) : "";
    cust_GetPara();
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("IsTaxConvert", 2);
    nwParameter_Add("flag", flag);
    func_ActionDriven("actGridLineDetailsWithout", true);
    return false;
});


function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var value1 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    var value2 = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
    var cnt = nwLib.nwTempTable_Row_Count(nwGridID);

    if (nwGridID == "nwGridDebitNoteWithRefereceCon")
    {
        var Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;
        var collength = Grid.GetMaxCol();
        var col = Grid.GetSelectedIndexes().col;
        var row = Grid.GetSelectedIndexes().row;
        var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
        var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
        //if (col == SPR_LINETYPE - 1) {
            var data = Grid.GetValue(SPR_LINETYPE - 1, _row);
            var hasValue = false;
            if (index == 0 && data == "") {
                for (coli = 0; coli < collength; coli++) {
                    if ((SPR_LINETYPE - 1) == coli
                        || (SPR_APVNO - 1) == coli) {
                        continue;
                    }
                    var value = Grid.GetValue(coli, _row);
                    if (value != "") {
                        hasValue = true;
                        break;
                    }
                }
            }
            if (hasValue) {
                crnwTRtemp = null;
            } else {
                crnwTRtemp[SPR_LINETYPE - 1] = "Transaction";
                crnwTRtemp[SPR_APVNO - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
                crnwTRtemp[SPR_APVDATE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
                crnwTRtemp[SPR_INVOICENO - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
                crnwTRtemp[SPR_INVOICEDATE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();
                crnwTRtemp[SPR_PAYEEREFCODE - 1] = $('#idvallugPayee').val();
                crnwTRtemp[SPR_PAYEEREF - 1] = $('#descvallugPayee').val();
                crnwTRtemp[SPR_SEG2 - 1] = $('#idvallugLocForm').val();
                crnwTRtemp[SPR_APVAMOUNT - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text();
                crnwTRtemp[SPR_OPENAMOUNT - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(6)').text();
                crnwTRtemp[SPR_SEG3 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(7)').text();
                crnwTRtemp[SPR_SEG4 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(8)').text();
                crnwTRtemp[SPR_RCTAG - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(9)').text();
                crnwTRtemp[SPR_PARTICULARS - 1] = $("#txtRemarks").val();

                //crnwTRtemp.find('td:eq(' + SPR_PARTICULARS + ')').removeClass("btnRed").removeClass("btnGray").removeClass("btnYellow").removeClass("btnBlue").removeClass("btnGreen");
                //crnwTRtemp.find('td:eq(' + SPR_PARTICULARS + ') button').removeClass("btnRed").removeClass("btnGray").removeClass("btnYellow").removeClass("btnBlue").removeClass("btnGreen");
                //crnwTRtemp.find('td:eq(' + SPR_PARTICULARS + ')').addClass("btnGreen");
                //crnwTRtemp.find('td:eq(' + SPR_PARTICULARS + ') button').addClass("btnGreen");
            }
        //}
    }

    else if (nwGridID == "nwmyGridLineDetails") {
        var Grid = nwmyGridLineDetails_Book.ActiveSheet;
        var collength = Grid.GetMaxCol();
        var col = Grid.GetSelectedIndexes().col;
        var row = Grid.GetSelectedIndexes().row;
        var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
        var desc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
        //if (col == SPR_LD_LINETYPE - 1) {
        var data = Grid.GetValue(SPR_LD_LINETYPE - 1, _row);
        var hasValue = false;
        if (index == 0 && data == "") {
            for (coli = 0; coli < collength; coli++) {
                if ((SPR_LD_LINETYPE - 1) == coli
                    || (SPR_LD_APVNO - 1) == coli) {
                    continue;
                }
                var value = Grid.GetValue(coli, _row);
                if (value != "") {
                    hasValue = true;
                    break;
                }
            }
        }
        if (hasValue) {
            crnwTRtemp = null;
        } else {
            crnwTRtemp[SPR_LD_LINETYPE - 1] = "Transaction";
            crnwTRtemp[SPR_LD_APVNO - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text()
            crnwTRtemp[SPR_LD_APVDATE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
            crnwTRtemp[SPR_LD_INVOICENO - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();
            crnwTRtemp[SPR_LD_INVOICEDATE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text();
            crnwTRtemp[SPR_LD_PAYEEREFCODE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(6)').text();
            crnwTRtemp[SPR_LD_PAYEEREF - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(7)').text();
            crnwTRtemp[SPR_LD_ITEMGROUPTYPE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(8)').text();
            crnwTRtemp[SPR_LD_TAX - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(9)').text();
            crnwTRtemp[SPR_LD_APVAMT - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(10)').text();
            crnwTRtemp[SPR_LD_APVROWNO - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(13)').text();
            crnwTRtemp[SPR_LD_PARTICULARS - 1] = $("#txtRemarks").val();

            crnwTRtemp[SPR_LD_TAXRATE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(15)').text();
            crnwTRtemp[SPR_LD_CLAIMEDPERCENT - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(16)').text();
            crnwTRtemp[SPR_LD_OCYAMMOUNTVATEX - 1] = '0.00';

            crnwTRtemp[SPR_LD_SEG1 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(17)').text();
            crnwTRtemp[SPR_LD_SEG2 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(18)').text();
            crnwTRtemp[SPR_LD_SEG3 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(19)').text();
            crnwTRtemp[SPR_LD_SEG4 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(20)').text();
            crnwTRtemp[SPR_LD_SEG5 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(21)').text();
            crnwTRtemp[SPR_LD_SEG6 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(22)').text();
            crnwTRtemp[SPR_LD_ACCOUNTDESCRIPTION - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(23)').text();

            crnwTRtemp[SPR_LD_REF1 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(24)').text();
            crnwTRtemp[SPR_LD_REF2 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(25)').text();
            crnwTRtemp[SPR_LD_REF3 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(26)').text();
            crnwTRtemp[SPR_LD_REF4 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(27)').text();
            crnwTRtemp[SPR_LD_REF5 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(28)').text();
            crnwTRtemp[SPR_LD_REF6 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(29)').text();

            crnwTRtemp[SPR_LD_REQSUBACCOUNT - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(30)').text();
            crnwTRtemp[SPR_LD_REQSLTYPE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(31)').text();
            crnwTRtemp[SPR_LD_REQSLREF - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(32)').text();

            crnwTRtemp[SPR_LD_SEG2 - 1] = $("#idvallugLocForm").val();
            crnwTRtemp[SPR_LD_REF2 - 1] = $("#descvallugLocForm").val();
            crnwTRtemp[SPR_LD_TAXRATE2 - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(34)').text();

            crnwTRtemp[SPR_LD_SUBSIDIARYLEDGERTYPE - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(35)').text();
            crnwTRtemp[SPR_LD_SUBSIDIARYLEDGERREF - 1] = addtoListTableRec.find('tr:eq(' + index + ') td:eq(36)').text();

            //crnwTRtemp.find('td:eq(' + SPR_PARTICULARS + ')').removeClass("btnRed").removeClass("btnGray").removeClass("btnYellow").removeClass("btnBlue").removeClass("btnGreen");
            //crnwTRtemp.find('td:eq(' + SPR_PARTICULARS + ') button').removeClass("btnRed").removeClass("btnGray").removeClass("btnYellow").removeClass("btnBlue").removeClass("btnGreen");
            //crnwTRtemp.find('td:eq(' + SPR_PARTICULARS + ')').addClass("btnGreen");
            //crnwTRtemp.find('td:eq(' + SPR_PARTICULARS + ') button').addClass("btnGreen");
        }
        //}

        //crnwTRtemp.find('td:eq(' + SPR_LD_EmpSuppTagging + ') ').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(33)').text());
        //crnwTRtemp.find('td:eq(' + SPR_LD_TagTaxEnableDisable + ') ').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(34)').text());
        //if (addtoListTableRec.find('tr:eq(' + index + ') td:eq(33)').text() == "2" || addtoListTableRec.find('tr:eq(' + index + ') td:eq(34)').text() == "0") {
        //    Grid.SetEnable((SPR_LD_TAX - 1), _row, false)
        //} else
        //    Grid.SetEnable((SPR_LD_TAX - 1), _row, true)

        //if (addtoListTableRec.find('tr:eq(' + index + ') td:eq(9)').text() == "02") 
        //    crnwTRtemp.find('td:eq(' + SPR_TAX + ') ').enable(false)
        //else
        //    crnwTRtemp.find('td:eq(' + SPR_TAX + ') ').enable(true)


        

        //crnwTRtemp.find('td:eq(' + SPR_ISSUPPLIER + ') ').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(8)').text())

        //if (addtoListTableRec.find('tr:eq(' + index + ') td:eq(8)').text() == "02")
        //    crnwTRtemp.find('td:eq(' + SPR_LD_TAX + ') ').enable(false)
        //else
        //    crnwTRtemp.find('td:eq(' + SPR_LD_TAX + ') ').enable(true)
         
        //crnwTRtemp.find('td:eq(' + SPR_LD_SUBACCOUNT + ') ').enable(false)
        //crnwTRtemp.find('td:eq(' + SPR_LD_SUBSIDIARYLEDGERTYPE + ') ').enable(false)
        //crnwTRtemp.find('td:eq(' + SPR_LD_SUBSIDIARYLEDGERREF + ') ').enable(false)

    }

    else if (cnt == (_row + 1)) {
        nwGrid_AddRow(nwGridID, 1);
    }
    else if (nwGridID == "nwGridAtt") {
        crnwTRtemp[SPR_DOCCODE - 1] = value1;
        crnwTRtemp[SPR_DOCDESC - 1] = value2;
        nwGrid_AddRow("nwGridAttCon", 1);
    }
	
    return crnwTRtemp;
}

function makeparticulargreendbnotewref() {
    var Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;
    var lenx = Grid.GetMaxRow();
    for (var i = 0; i < lenx; i++) {
        if (Grid.GetText((SPR_REQSUBACCOUNT - 1), i) == "" || Grid.GetText((SPR_REQSUBACCOUNT - 1), i) == "0")
            Grid.SetBackground((SPR_SUBACCOUNT - 1), i, "gainsboro");
        else
            Grid.SetBackground((SPR_SUBACCOUNT - 1), i, "cyan");
         
        if (Grid.GetText((SPR_REQSLREF - 1), i) == "" || Grid.GetText((SPR_REQSLREF - 1), i) == "0")
            Grid.SetBackground((SPR_SUBSIDIARYLREF - 1), i, "gainsboro");
        else
            Grid.SetBackground((SPR_SUBSIDIARYLREF - 1), i, "cyan");
         
        if (Grid.GetText((SPR_REQSLTYPE - 1), i) == "" || Grid.GetText((SPR_REQSLTYPE - 1), i) == "0")
            Grid.SetBackground((SPR_SUBLEDGERTYPE - 1), i, "gainsboro");
        else
            Grid.SetBackground((SPR_SUBLEDGERTYPE - 1), i, "cyan");
    }
}


function makeparticulargreendbnotewoutref() {
    var Grid = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet;
    var lenx = Grid.GetMaxRow();

    for (var i = 0; i < lenx; i++) {
        if (Grid.GetText((SPR_without_REQSUBACCOUNT - 1), i) == "" || Grid.GetText((SPR_without_REQSUBACCOUNT - 1), i) == "0")
            Grid.SetBackground((SPR_without_SUBACCOUNT - 1), i, "gainsboro");
        else
            Grid.SetBackground((SPR_without_SUBACCOUNT - 1), i, "cyan");

        if (Grid.GetText((SPR_without_REQSLREF - 1), i) == "" || Grid.GetText((SPR_without_REQSLREF - 1), i) == "0")
            Grid.SetBackground((SPR_without_SUBSIDIARYREF - 1), i, "gainsboro");
        else
            Grid.SetBackground((SPR_without_SUBSIDIARYREF - 1), i, "cyan");

        if (Grid.GetText((SPR_without_REQSLTYPE - 1), i) == "" || Grid.GetText((SPR_without_REQSLTYPE - 1), i) == "0")
            Grid.SetBackground((SPR_without_SUBSIDIARYTYPE - 1), i, "gainsboro");
        else
            Grid.SetBackground((SPR_without_SUBSIDIARYTYPE - 1), i, "cyan");
    }
}


function makeparticulargreenldwref() {
    var Grid = nwGridLineDetails_Book.ActiveSheet;
    var lenx = Grid.GetMaxRow();

    for (var i = 0; i < lenx; i++) {
        if (Grid.GetText((SPR_LD_REQSUBACCOUNT - 1), i) == "" || Grid.GetText((SPR_LD_REQSUBACCOUNT - 1), i) == "0")
            Grid.SetBackground((SPR_LD_SUBACCOUNT - 1), i, "gainsboro");
        else
            Grid.SetBackground((SPR_LD_SUBACCOUNT - 1), i, "cyan");

        if (Grid.GetText((SPR_LD_REQSLTYPE - 1), i) == "" || Grid.GetText((SPR_LD_REQSLTYPE - 1), i) == "0")
            Grid.SetBackground((SPR_LD_SUBSIDIARYLEDGERREF - 1), i, "gainsboro");
        else
            Grid.SetBackground((SPR_LD_SUBSIDIARYLEDGERREF - 1), i, "cyan");

        if (Grid.GetText((SPR_LD_REQSLTYPE - 1), i) == "" || Grid.GetText((SPR_LD_REQSLTYPE - 1), i) == "0")
            Grid.SetBackground((SPR_LD_SUBSIDIARYLEDGERTYPE - 1), i, "gainsboro");
        else
            Grid.SetBackground((SPR_LD_SUBSIDIARYLEDGERTYPE - 1), i, "cyan");

    }
}


function makeparticulargreenldwoutref() {
    var Grid = nwGridLDWithout_Book.ActiveSheet;
    var lenx = Grid.GetMaxRow();
    for (var i = 0; i < lenx; i++) {
        if (Grid.GetValue((SPR_LDW_REMARKS - 1), i).length > 0)
            Grid.SetBackground((SPR_LDW_REMARKS - 1), i, "#006060");

    }
}

$(document).on("click", "#btnnwgRemarks", function (e) {
    //makeparticulargreendbnotewref()
    //makeparticulargreendbnotewoutref()
    makeparticulargreenldwref() 
    makeparticulargreenldwoutref() 
});

$(document).on("click", ".SPR_TOTAL_DETAILS", function (e) { 
    var docno = $('#txtDocno').val();
    var reftranno = nwGridLDTotalAPV_Book.ActiveSheet.GetText((SPR_TOTAL_APVNO - 1), _row);

    if (reftranno.length > 0) {
        var fullength = GetCurrentURL() + "../DCViewAttachment?nwDocno=" + reftranno + "";

        nwLoading_Start('xbtnRvwAttach', crLoadingHTML);
        nwPopupForm_Create("nwPopUpRvwAttach", true, fullength);
        $('#nwPopUpRvwAttach .modal-hdr-title').text("Review Attachment(s)");
        nwPopupForm_ShowModal("nwPopUpRvwAttach");
        nwLoading_End('xbtnRvwAttach');
    }
});

var _crnwTR = "";
$(document).on("focus", ".numVATIN, .numVATEX", function (e) {
    _crnwTR = crnwTR;
});
 
$(document).on("change", ".numVATIN", function (e) {
    var indxRow = $(".SPR_DVAMOUNT input").index(this);
    if (getDataOfGrid('nwGridDebitNoteWithReferece', '', (SPR_APVNO - 1), _row) == "") {
        $(this).val("");
        MessageBox("Cannot proceed. APV No. is required.", basedTitle);
        return;
    }

    let ocyvatex = 0, vat = 0, ewt = 0, netamt = 0;
    let ocyvatin = getNumReplace(getDataOfGrid('nwGridDebitNoteWithReferece', 'input', (SPR_DVAMOUNT - 1), _row));
    let vatrate = getNumReplace(getDataOfGrid('nwGridDebitNoteWithReferece', '', (SPR_TAXRATE - 1), _row));
    let ewtrate = getNumReplace(getDataOfGrid('nwGridDebitNoteWithReferece', '', (SPR_TAXRATE2 - 1), _row));
    let openamt = getNumReplace(getDataOfGrid('nwGridDebitNoteWithReferece', '', (SPR_OPENAMOUNT - 1), _row));
    
    ocyvatex = ocyvatin / (1 + (vatrate / 100));
    vat = ocyvatin - ocyvatex;
    ewt = ocyvatex * (ewtrate / 100);
    netamt = ocyvatex + vat - ewt;

    if (netamt > openamt) {
        setTimeout(function () {
            MessageBox("Cannot proceed. Net Amount should not exceed Outstanding Balance.", basedTitle, 'error');
        }, 100);        
        $(this).val('');
        nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_DVAMOUNTVATEX - 1), _row, "");
        nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_VAT - 1), _row, "");
        nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_EWT - 1), _row, "");
        nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_NETAMT - 1), _row, "");
        return false;
    }

    nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_DVAMOUNTVATEX - 1), _row, setNumReplace(ocyvatex, 2));
    nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_VAT - 1), _row, setNumReplace(vat, 2));
    nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_EWT - 1), _row, setNumReplace(ewt, 2));
    nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_NETAMT - 1), _row, setNumReplace(netamt, 2));
});

$(document).on("change", ".numVATEX", function (e) {
    var indxRow = $(".SPR_DVAMOUNT input").index(this);
    if (getDataOfGrid('nwGridDebitNoteWithReferece', '', (SPR_APVNO - 1), _row) == "") {
        $(this).val("");
        MessageBox("Cannot proceed. APV No. is required.", basedTitle);
        return;
    }

    let ocyvatin = 0, vat = 0, ewt = 0, netamt = 0;
    let ocyvatex = getNumReplace(getDataOfGrid('nwGridDebitNoteWithReferece', 'input', (SPR_DVAMOUNTVATEX - 1), _row));
    let vatrate = getNumReplace(getDataOfGrid('nwGridDebitNoteWithReferece', '', (SPR_TAXRATE - 1), _row));
    let ewtrate = getNumReplace(getDataOfGrid('nwGridDebitNoteWithReferece', '', (SPR_TAXRATE2 - 1), _row));
    let openamt = getNumReplace(getDataOfGrid('nwGridDebitNoteWithReferece', '', (SPR_OPENAMOUNT - 1), _row));

    ocyvatin = ocyvatex * (1 + (vatrate / 100));
    vat = ocyvatin - ocyvatex;
    ewt = ocyvatex * (ewtrate / 100);
    netamt = ocyvatex + vat - ewt;

    if (netamt > openamt) {
        setTimeout(function () {
            MessageBox("Cannot proceed. Net Amount should not exceed Outstanding Balance.", basedTitle, 'error');
        }, 100);        
        $(this).val('');
        nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_DVAMOUNT - 1), _row, "");
        nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_VAT - 1), _row, "");
        nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_EWT - 1), _row, "");
        nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_NETAMT - 1), _row, "");
        return false;
    }

    nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_DVAMOUNT - 1), _row, setNumReplace(ocyvatin, 2));
    nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_VAT - 1), _row, setNumReplace(vat, 2));
    nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_EWT - 1), _row, setNumReplace(ewt, 2));
    nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_NETAMT - 1), _row, setNumReplace(netamt, 2));
});

function addThousandSeparator(str) {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

$(document).on("focusin", ".SPR_PERIODFROM input,.SPR_PERIODTO input,.SPR_PARTICULARS input", function (e) {
    if (nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.GetText((SPR_APVNO - 1), _row) == "") {
        $(this).val("")
        MessageBox("APV No. is required.", basedTitle);
        return;
    }
});

var indxRow 
$(document).on("change", ".SPR_PERIODFROM", function (e) {
    var periodFrom = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.GetText((SPR_PERIODFROM - 1), _row);
    var periodTo = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.GetText((SPR_PERIODTO - 1), _row);

    if (Date.parse(periodFrom) > Date.parse(periodTo) && periodTo != '') {
        nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_PERIODFROM - 1), _row, "");
        MessageBox("Cannot proceed. Period From should not be later than the Period To.", "Debit Note with Reference", "error");
    }
});

$(document).on("change", ".SPR_PERIODTO", function (e) {
    var periodFrom = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.GetText((SPR_PERIODFROM - 1), _row);
    var periodTo = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.GetText((SPR_PERIODTO - 1), _row);

    if (Date.parse(periodFrom) > Date.parse(periodTo)) {
        nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetText((SPR_PERIODTO - 1), _row, "");
        MessageBox("Cannot proceed. Period To should not be earlier than the Period From.", "Debit Note with Reference", "error");
    }
});

$(document).on("change", ".SPR_without_PERIODFROM", function (e) {
    var periodFrom = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.GetText((SPR_without_PERIODFROM - 1), _row);
    var periodTo = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.GetText((SPR_without_PERIODTO - 1), _row);

    if (Date.parse(periodFrom) > Date.parse(periodTo) && periodTo != '') {
        nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText((SPR_without_PERIODFROM - 1), _row, "");
        MessageBox("Cannot proceed. Period From should not be later than the Period To.", "Debit Note without Reference", "error");
    }
});


$(document).on("change", ".SPR_without_PERIODTO", function (e) {
    var periodFrom = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.GetText((SPR_without_PERIODFROM - 1), _row);
    var periodTo = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.GetText((SPR_without_PERIODTO - 1), _row);

    if (Date.parse(periodFrom) > Date.parse(periodTo)) {
        nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText((SPR_without_PERIODTO - 1), _row, "");
        MessageBox("Cannot proceed. Period To should not be earlier than the Period From.", "Debit Note without Reference", "error");
    }
});

$(document).on("change", ".dtplinedetailsperiodto", function (e) {

    var PeriodFrom = nwGridLineDetails_Book.ActiveSheet.GetText((SPR_LD_PERIODFROM - 1), _row);
    var PeriodTo = nwGridLineDetails_Book.ActiveSheet.GetText((SPR_LD_PERIODTO - 1), _row);

    if (Date.parse(PeriodFrom) > Date.parse(PeriodTo)) {
        nwGridLineDetails_Book.ActiveSheet.SetText((SPR_LD_PERIODTO - 1), _row, "");
        MessageBox("Period To should be later than Period From.", basedTitle);
    }

});



function PreautoRefresh() {
    nwDocno = getParameterByName('nwDocno');

    if (nwDocno != "") {
        nwLoading_Start("xSample", crLoadingHTML);
        nwParameter_Add('nwDocno', nwDocno);
        $('#noah-webui-default-Refresh').click();
    }
}


function PostautoRefreshMainGrid() {
    if (nwDocno != "") {
        $('#noah-webui-Toolbox').addClass("ClassHideToolbar");
        $('#txtRemarks').enable(false); 
        $('#btnSelectAppDetails').enable(false);
        $('#NwSave').enable(false);
    }  
}


$(document).on("click", "#NwSave", function (e) {
    msgBoxContainerQuestion = "btnAttachSave";
    parent_MessageBoxQuestion("Do you want to save the current record?", basedTitle, "");
});

//function Message_Yes() {
    
   
//}

function ValidationAttach(Resultprompt)
{
    msgBoxContainerQuestion = "";
    nwPopupForm_HideModal("dimMessageBox");
    MessageBox(Resultprompt, basedTitle);
}

//function Message_No() {
//    DocumentAttachmentSave = "";
//    nwPopupForm_HideModal("dimMessageBox");
//}

//function Message_close() {
//    DocumentAttachmentSave = "";
//    nwPopupForm_HideModal("dimMessageBox");
//}

function AddRowInGrid(GridName)
{
    var getCurrGridCnt = nwTempTable_Row_Count(`${GridName}`);

    if ((getCurrGridCnt - 1) == _row)
        nwGrid_AddRow(`${GridName}`, 1);
}

$(document).on("change", ".SPR_LD_OCYAMMOUNT", function (e) {
    var indxRow = _row;
    var Grid = nwGridLineDetails_Book.ActiveSheet;

    if (Grid.GetText((SPR_LD_APVNO - 1), _row) == "") {
        $(this).val("")
        MessageBox("APV No. is required.", basedTitle);
        return;
    }

    var thisVal = $(this).val().replaceAll(",", "");
    var getUnitCVAT = getNum(parseFloat(Grid.GetText((SPR_LD_OCYAMMOUNT - 1), _row).replaceAll(",", "")));
    var getTaxRate = getNum(parseFloat(Grid.GetText((SPR_LD_TAXRATE - 1), _row).replaceAll(",", "")));
    var getTaxRate2 = getNum(parseFloat(Grid.GetText((SPR_LD_TAXRATE2 - 1), _row).replaceAll(",", "")));
    var getClaimedPercent = getNum(parseFloat(Grid.GetText((SPR_LD_CLAIMEDPERCENT - 1), _row).replaceAll(",", "")));

    if (getUnitCVAT == "" || isNaN(getUnitCVAT))
        getUnitCVAT = 0;
    if (getTaxRate == "" || isNaN(getTaxRate))
        getTaxRate = 0;
    if (getClaimedPercent == "" || isNaN(getClaimedPercent))
        getClaimedPercent = 0;
    var claimed = 0;
    claimed = ((getUnitCVAT / (1 + getTaxRate)) * (getTaxRate) * (getClaimedPercent));
    var vatex = getUnitCVAT - claimed;
    if (thisVal == "") thisVal = 0;

    Grid.SetText((SPR_LD_OCYAMMOUNTVATEX - 1), _row, vatex.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

});



function DebitNoteWRefComp(indxRow) {
    var getUnitCVAT = getNum(parseFloat(nwGridDebitNoteWithRefereceCon_Book.ActiveSheet((SPR_DVAMOUNT - 1), _row).replaceAll(",", "")));
    var getTaxRate = getNum(parseFloat(nwGridDebitNoteWithRefereceCon_Book.ActiveSheet((SPR_TAXRATE - 1), _row).replaceAll(",", "")));
    var getTaxRate2 = getNum(parseFloat(nwGridDebitNoteWithRefereceCon_Book.ActiveSheet((SPR_TAXRATE2 - 1), _row).replaceAll(",", "")));
    var getClaimedPercent = getNum(parseFloat(nwGridDebitNoteWithRefereceCon_Book.ActiveSheet((SPR_CLAIMEDPERCENT - 1), _row).replaceAll(",", "")));
    var balance = getNum(parseFloat(nwGridDebitNoteWithRefereceCon_Book.ActiveSheet((SPR_OPENAMOUNT - 1), _row).replaceAll(",", "")));

    if (getUnitCVAT == "" || isNaN(getUnitCVAT) )
        getUnitCVAT = 0;
    if (getTaxRate == "" || isNaN(getTaxRate) )
        getTaxRate = 0;
    if (getClaimedPercent == "" || isNaN(getClaimedPercent))
        getClaimedPercent = 0;
    if (balance == "" || isNaN(balance))
        balance = 0;
    var claimed = 0;
    claimed = ((getUnitCVAT / (1 + getTaxRate)) * (getTaxRate) * (getClaimedPercent));
    var vatex = getUnitCVAT - claimed;

    nwGridDebitNoteWithRefereceCon_Book.ActiveSheet((SPR_DVAMOUNTVATEX - 1), _row, vatex.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

}

function DebitNoteAndLineDtlsWORefComp(indxRow)
{
    var getAmtVATIN = getNum(parseFloat(nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.GetText((SPR_without_DMAMOUNT - 1), _row).replaceAll(",", "")));
    var getTaxRate = getNum(parseFloat(nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.GetText((SPR_without_TAXRATE - 1), _row).replaceAll(",", "")));
    var getTaxRate2 = getNum(parseFloat(nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.GetText((SPR_without_TAXRATE2 - 1), _row).replaceAll(",", "")));
    var getClaimedPercent = getNum(parseFloat(nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.GetText((SPR_without_CLAIMEDPERCENT - 1), _row).replaceAll(",", "")));

    if (getAmtVATIN == "" || isNaN(getAmtVATIN) )
        getAmtVATIN = 0;
    if (getTaxRate == "" || isNaN(getTaxRate) )
        getTaxRate = 0;
    if (getClaimedPercent == "" || isNaN(getClaimedPercent) )
        getClaimedPercent = 0;

    var claimed = 0;
    claimed = ((getAmtVATIN / (1 + getTaxRate)) * (getTaxRate) * (getClaimedPercent));
    var vatex = getAmtVATIN - claimed;

    //$("#nwGridDebitNoteWithoutReferece-nwData tr:eq(" + indxRow + ") td:eq(" + SPR_without_DMAMOUNTVATEX + ")").text(vatex.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
}

function nwGrid_AddtoListDoneCustomF(verID) {
    DisableColBranch();    
}



function nwGrid_AddtoListLoaded(tbl) {
    if (tbl = "nwGridDebitNoteWithRefereceCon") {
        LoadCommonSegment(tbl);
        LoadTotalAmounts();
        DebitwRefProp();
    }

    if (tbl = "nwmyGridLineDetails") {
        checkisreqsltypeaccountinlinedetailswithref();
        checkisreqsubaccountinlinedetailswithref();
    }
    DisableColBranch();

}

$(document).on("change", "#chckAutoAllocate", function (e) {
    nwLoading_Start("xAutoAllocateTag", crLoadingHTML);
    nwParameter_Add("chckAutoAllocate", $("#chckAutoAllocate").prop("checked"));
    cust_GetPara();
    func_ActionDriven("actClearDebitNoteWithRefUponAutoallocate", false);
})

function HdrColorFunc() {
    if(parseFloat($("#txtDebitNote").val()) > 0) {
        $("#btndebitnote").addClass("btn-default-green");
    }
    else {
        $("#btndebitnote").removeClass("btn-default-green");
        if (nwDocno != "") {
            $("#btndebitnote").enable(false);
        }
    }       

    if (parseFloat($("#txtwDebitNote").val()) > 0) {
        $("#btndebitnotewithout").addClass("btn-default-green");
    }      
    else {
        $("#btndebitnotewithout").removeClass("btn-default-green");
        if (nwDocno != "") {
            $("#btndebitnotewithout").enable(false);
        }
    }                  

    if (parseFloat($("#txtTotalAPV").val()) > 0) {
        $("#btntotalAPV").addClass("btn-default-green");
    }     
    else {
        $("#btntotalAPV").removeClass("btn-default-green");
        if (nwDocno != "") {
            $("#btntotalAPV").enable(false);
        }
    }       

    if (parseFloat($("#txtDebitNote").val()) > 0
            || parseFloat($("#txtwDebitNote").val()) > 0                
                        || parseFloat($("#txtTotalAPV").val()) > 0
       ) {
        $("#btnJE").removeClass("btn-default-gray");
        $("#btnJE").addClass("btn-default-green");
        $("#btnJE").enable(true);
        $("#lugPayee").addClass("adisabled");
    }
       
    else {
        $("#btnJE").removeClass("btn-default-green");
        $("#btnJE").addClass("btn-default-gray");
        $("#btnJE").enable(false);
        //$("#lugPayee").removeClass("adisabled");
    }


}


function func_nwGrid_DeleteDone() {
    DisableColBranch();
    LoadTotalAmounts();
}

function func_nwGrid_AddNewDone() {
    DisableColBranch();
}


function DisableColBranch()
{
    if ($("#txtBranchSeg").val() == "02") {
        //$("#nwGridDebitNoteWithReferece-nwData tr").each(
        //    function (e) {
        //        $(this).find("td:eq(" + SPR_SEG2 + ")").enable(false);
        //    });
        //$("#nwGridDebitNoteWithoutReferece-nwData tr").each(
        //    function (e) {
        //        $(this).find("td:eq(" + SPR_without_SEG2 + ")").enable(false);
        //    });
        //$("#nwmyGridLineDetails-nwData tr").each(
        //    function (e) {
        //        $(this).find("td:eq(" + SPR_LD_SEG2 + ")").enable(false);
        //    });
        try { nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetBackground((SPR_SEG2 - 1), Spread_ALLROW, "gainsboro"); } catch (e) { }
        try { nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetBackground((SPR_without_SEG2 - 1), Spread_ALLROW, "gainsboro"); } catch (e) { }
        try { nwGridLineDetails_Book.ActiveSheet.SetBackground((SPR_LD_SEG2 - 1), Spread_ALLROW, "gainsboro"); } catch (e) { }
    }

    else if ($("#txtBranchSeg").val() == "03") {
        //$("#nwGridDebitNoteWithReferece-nwData tr").each(
        //    function (e) {
        //        $(this).find("td:eq(" + SPR_SEG3 + ")").enable(false);
        //    });
        //$("#nwGridDebitNoteWithoutReferece-nwData tr").each(
        //    function (e) {
        //        $(this).find("td:eq(" + SPR_without_SEG3 + ")").enable(false);
        //    });
        //$("#nwmyGridLineDetails-nwData tr").each(
        //    function (e) {
        //        $(this).find("td:eq(" + SPR_LD_SEG3 + ")").enable(false);
        //    });
        try { nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetBackground((SPR_SEG3 - 1), Spread_ALLROW, "gainsboro"); } catch (e) { }
        try { nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetBackground((SPR_without_SEG3 - 1), Spread_ALLROW, "gainsboro"); } catch (e) { }
        try { nwGridLineDetails_Book.ActiveSheet.SetBackground((SPR_LD_SEG3 - 1), Spread_ALLROW, "gainsboro"); } catch (e) { }
    }

    else if ($("#txtBranchSeg").val() == "04") {
        //$("#nwGridDebitNoteWithReferece-nwData tr").each(
        //    function (e) {
        //        $(this).find("td:eq(" + SPR_SEG4 + ")").enable(false);
        //    });
        //$("#nwGridDebitNoteWithoutReferece-nwData tr").each(
        //    function (e) {
        //        $(this).find("td:eq(" + SPR_without_SEG4 + ")").enable(false);
        //    });
        //$("#nwmyGridLineDetails-nwData tr").each(
        //    function (e) {
        //        $(this).find("td:eq(" + SPR_LD_SEG4 + ")").enable(false);
        //    });
        try { nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetBackground((SPR_SEG4 - 1), Spread_ALLROW, "gainsboro"); } catch (e) { }
        try { nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetBackground((SPR_without_SEG4 - 1), Spread_ALLROW, "gainsboro"); } catch (e) { }
        try { nwGridLineDetails_Book.ActiveSheet.SetBackground((SPR_LD_SEG4 - 1), Spread_ALLROW, "gainsboro"); } catch (e) { }
    }

    else if ($("#txtBranchSeg").val() == "05") {
        //$("#nwGridDebitNoteWithReferece-nwData tr").each(
        //    function (e) {
        //        $(this).find("td:eq(" + SPR_SEG5 + ")").enable(false);
        //    });
        //$("#nwGridDebitNoteWithoutReferece-nwData tr").each(
        //    function (e) {
        //        $(this).find("td:eq(" + SPR_without_SEG5 + ")").enable(false);
        //    });
        //$("#nwmyGridLineDetails-nwData tr").each(
        //    function (e) {
        //        $(this).find("td:eq(" + SPR_LD_SEG5 + ")").enable(false);
        //    });
        try { nwGridDebitNoteWithRefereceCon_Book.ActiveSheet.SetBackground((SPR_SEG5 - 1), Spread_ALLROW, "gainsboro"); } catch (e) { }
        try { nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetBackground((SPR_without_SEG5 - 1), Spread_ALLROW, "gainsboro"); } catch (e) { }
        try { nwGridLineDetails_Book.ActiveSheet.SetBackground((SPR_LD_SEG5 - 1), Spread_ALLROW, "gainsboro"); } catch (e) { }
    }

}

function func_nwGrid_InsertDone() {
    var id = crnwTableCon.attr('id');

    if (id == "nwmyGridTotalAPV") {
        TotalAPVProp();
    }
    DisableColBranch();

}

function tagColor()
{
    checkisreqsubaccountindebitnotewithreference();
    checkisreqsltypeaccountindebitnotewithreference();
}

function tagColorWithOutRef()
{
    checkisreqsubaccountindebitnotewithoutreference();
    checkisreqsltypeaccountindebitnotewithoutreference();
}


function getNum(val) {
    if (isNaN(val) || val == '') {
        val = 0
    }
    return val;
}

function isnull(val) {
    var num = 0;
    if (val != '') {
        num = val;
    }
    return num;
}

//View Code Start
$(document).on("click", ".btnview", function () {
    var serverlink = $("#txtserverlink").val();
    //if debug
    //serverlink = serverlink.replaceAll('../', '');
    //serverlink = 'http://localhost/' + serverlink
    //
    var path = nwGridConMain6_Book.ActiveSheet.GetText((SPR_FILEPATH - 1), _row);
    if (path == "") {
        MessageBox("No attachment found.", "Document Attachment", "error");
        return false;
    }
    filepath = serverlink + path;
    nwviewattach(filepath);
});
function nwviewattach(filepath) {
    //inititalize
    $('#docattviewimg').attr('src', "");
    $('#docattviewlink').attr('src', "");
    $('#docattviewimg').removeClass('ratio');
    $('#docattviewpdfobjectlink').attr('data', "");
    $('#docattviewpdfembedlink').attr('src', "");
    $('#aDownload').attr({ "href": "", "title": "\'DOWNLOAD\'", "download": "", "target": "_blank" });
    //start
    if (checkextensionsimg(filepath)) {
        $('#docattviewimg').addClass('ratio');
        $('#docattviewimg').attr('src', filepath);
        nwPopupForm_ShowModal("docattview");
    }
    else if (checkextensionsadl(filepath)) {
        //$('#docattviewlink').attr('src', filepath);
        $('#aDownload').attr({ "href": filepath, "title": "\'DOWNLOAD\'", "download": "", "target": "_blank" });
        $('#aDownload')[0].click();
    }
    else {
        if (filepath.includes(".pdf")) {
            $('#docattviewpdfobjectlink').attr('data', filepath + "#toolbar=0");
            $('#docattviewpdfembedlink').attr('src', filepath + "#toolbar=0");
            nwPopupForm_ShowModal("docattview");
        } else {
            //$('#docattviewlink').attr('src', filepath);
            //nwPopupForm_ShowModal("docattview");
            $('#aDownload').attr({ "href": filepath, "title": "\'DOWNLOAD\'", "download": "", "target": "_blank" });
            $('#aDownload')[0].click();
        }
    }

    if (!checkextensionsadl(filepath)) {
        $('#aDownload').attr({ "href": filepath, "title": "\'DOWNLOAD\'", "download": "", "target": "_blank" });
    }
}

function checkextensionsimg(path) {
    path = path.toLowerCase();
    path = path.replace(path.substring(0, path.indexOf('.')), '');
    if (path.includes(".jpg") || path.includes(".jpeg") || path.includes(".png") || path.includes(".gif") || path.includes(".tiff") || path.includes(".psd")
        || path.includes(".eps") || path.includes(".indd") || path.includes(".raw")) {
        return true;
    }
    return false;
}

function checkextensionsadl(path) {
    path = path.toLowerCase();
    path = path.replace(path.substring(0, path.indexOf('.')), '');
    if (path.includes(".xls") || path.includes(".xlsb") || path.includes(".xlsm") || path.includes(".xlsx") || path.includes(".doc")
        || path.includes(".docx") || path.includes(".docm") || path.includes(".dotx") || path.includes(".dotm") || path.includes(".docb")
        || path.includes(".pptx") || path.includes(".pptm") || path.includes(".ppt")) {
        return true;
    }
    return false;
}

$(document).on("click", "#docattviewdownload", function (e) {
    e.preventDefault();  //stop the browser from following
    $('#aDownload')[0].click();
});
//View Code End


function makegreenpropertiesnotempty() {
    var Grid = nwGridAttCon_Book.ActiveSheet;
    var cnt = Grid.GetMaxRow();
    for (var row = 0; row <= cnt; row++) {
        if (Grid.GetText((SPR_FILEPATH - 1), row) != "") {
            Grid.SetBackground((SPR_VIEW - 1), row, "#006060");
        }
    }

    if (nwDocno != '') { //customize - change nwDocno
        $(".nwgrid_buttons").enable(false);
        $('#btnSaveDocAtt').enable(false);
    }
}

var linkcat = "";
//Action or Trigger When Closing of Pop-up
var xvaluePath = "";
var tempindex;

function func_WindowCloseTrigger(verID) {
    var isContinue = true;
    cust_GetPara();
    if (verID == "nwUploadCon") {
        tempindex = _row;

        var filepath = "";
        var path = "";
        var serverlink = $("#txtserverlink").val();
        //For Button Catalogue Attach
        filepath = $("#nwUploadCon .aagfilename").text();
        path = "\\" + 'APEntryFile' + "\\" + filepath;

        if (filepath != "") {
            linkcat = serverlink + path;
            nwGridAttCon_Book.ActiveSheet.SetText((SPR_FILEPATH - 1), _row, path);
            nwGridAttCon_Book.ActiveSheet.SetBackground((SPR_VIEW - 1), _row, "#006060");
        }
    }


    if (verID == 'nwGenerateGriddebitwith') {
        func_ActionDriven('actsetgenerate', true);

    }
    if (verID == 'nwGenerateGriddebitwithout') {
        func_ActionDriven('actsetgenerate', true);
    }
    if (verID == 'nwGenerateGridLineDetails') {
        func_ActionDriven('actsetgenerate', true);
    }
    if (verID == 'nwGenerateGridLDWithout') {
        func_ActionDriven('actsetgenerate', true);
    }
    if (verID == 'nwGenerateGridTotalAPV') {
        func_ActionDriven('actsetgenerate', true);
    }
    if (verID == 'nwgRemarksCon') {
        makeparticulargreendbnotewref()
        //makeparticulargreendbnotewoutref()
        makeparticulargreenldwref()
        makeparticulargreenldwoutref()
    }
    if (verID == 'nwPopUpRvwAttach') {
        nwLoading_Start("actCreateDebitwRefGrid_CloseTrig", crLoadingHTML);
        nwParameter_Add("IsTaxConvert", "0");
        nwParameter_Add("isCloseRevAt", "1");//isCloseRevAt
        nwParameter_Add("Rowno", _row);//_row;
        func_ActionDriven('actCreateDebitwRefGrid_CloseTrig', true);
    }

    return isContinue;
}

function LoadCommonSegment(tbl) {
    //nwParameter_Add_Table(tbl);
    try {
        nwParameter_Add_DataSet(tbl);
    } catch (e) { }
    //nwParameter_Add("currRow", row);
    cust_GetPara();
    func_ActionDriven("actLoadCommonSegments", false);
}

function LoadTotalAmounts() {
    //var apvAmount = 0;
    //var openAmount = 0;

    //if (apvAmount == "")
    //    apvAmount = 0;
    //if (openAmount == "")
    //    openAmount = 0;

    //crnwTable = $("#nwGridDebitNoteWithRefereceCon .tblGridBody");
    //var len = crnwTable.find('tr').length;

    //for (var x = 0; x <= len - 1; x++) {
    //    if (crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_LINETYPE + ')').text() == "Transaction") {

    //        apvAmount += parseFloat(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_APVAMOUNT + ')').text().replaceAll(",", ""));
    //        openAmount += parseFloat(crnwTable.find('tr:eq(' + x + ') td:eq(' + SPR_OPENAMOUNT + ')').text().replaceAll(",", ""));
    //    }        
    //}

    //$("#txtTotalAPVAmount").val(nwCurrency(apvAmount));
    //$("#txtTotalOpenAmount").val(nwCurrency(openAmount));

    //nwParameter_Add_Table("nwGridDebitNoteWithRefereceCon");
    try{
        nwParameter_Add_DataSet("nwGridDebitNoteWithRefereceCon");
    }catch (e){  }
    nwParameter_Add("chckAutoAllocate", $("#chckAutoAllocate").is(":checked"));
    func_ActionDriven("actLoadTotalAmounts", false);
}

function func_WindowCloseDone(verID) {
    var isContinue = true;
    cust_GetPara();

    if (verID == "ViewReqCompliance") {
        nwLoading_Start("actHasRqrdCompli", crLoadingHTML);
        func_ActionDriven('actHasRqrdCompli', false);
    }

  

    return isContinue;
}

function setBtnRqmtCompli(hasData) {
    if (hasData != '') {
        $('#btnDocumentAttached').removeClass('btn-default-orange');
        $('#btnDocumentAttached').addClass('btn-default-green');

    }
    else {
        $('#btnDocumentAttached').removeClass('btn-default-green');
        $('#btnDocumentAttached').addClass('btn-default-orange');
    }
}

function RemarksConfiguration() {
    if (remarksConfig == "True") {
        $("#txtRemarks").css({ "text-transform": "uppercase" });
        $("#txtnwgRemarks").css({ "text-transform": "uppercase" });
    }
    else {
        $("#txtRemarks").css({ "text-transform": "none" });
        $("#txtnwgRemarks").css({ "text-transform": "none" });
    }
}

function TotalAPVProp() {
    var Grid = nwGridLDTotalAPV_Book.ActiveSheet;
    var length = Grid.GetMaxRow();

    var isCheckAll = true;
    var hasData = false;
    setTimeout(function () { 
        for (var i = 0; i < length; i++) {              
            var ratag = Grid.GetText((SPR_TOTAL_RCTAG - 1), i);
            if (ratag == "Gray") {
                Grid.SetBackground((SPR_TOTAL_DETAILS - 1), i, "gainsboro"); 
            }
            else if (ratag == "Red") {
                Grid.SetBackground((SPR_TOTAL_DETAILS - 1), i, "Red");
            }
            else if (ratag == "Yellow") {
                Grid.SetBackground((SPR_TOTAL_DETAILS - 1), i, "Yellow");
            }
            else if (ratag == "Green") {
                Grid.SetBackground((SPR_TOTAL_DETAILS - 1), i, "#006060");
            }
            else {
                Grid.SetBackground((SPR_TOTAL_DETAILS - 1), i, "gainsboro");
            }

            var text = Grid.GetValue((SPR_TOTAL_REMARKS - 1), i);
            var apvno = Grid.GetText((SPR_TOTAL_APVNO - 1), i);
            if (text != "") {
                Grid.SetBackground((SPR_TOTAL_REMARKS - 1), i, "#006060");
            }
            else if (apvno != "" && text == "") {
                Grid.SetBackground((SPR_TOTAL_REMARKS - 1), i, "#1130c7");
            }
            else {
                Grid.SetBackground((SPR_TOTAL_REMARKS - 1), i, "gainsboro");
            }

            //Grid.SetFont((SPR_TOTAL_REMARKS - 1), i, "btnFont");

            nwGridLDTotalAPV_Book.ActiveSheet.SetTemplate((SPR_TOTAL_REMARKS - 1), i, "remarks", "");
            nwGridLDTotalAPV_Book.ActiveSheet.SetText2((SPR_TOTAL_REMARKS - 1), i, "...");
            nwGridLDTotalAPV_Book.ActiveSheet.SetTextColor((SPR_TOTAL_REMARKS - 1), i, "#FFFFFF");

            nwGridLDTotalAPV_Book.ActiveSheet.SetText2((SPR_TOTAL_DETAILS - 1), i, "...");
            //nwGridLDTotalAPV_Book.ActiveSheet.SetTextColor((SPR_TOTAL_DETAILS - 1), i, "#FFFFFF");
        }
    }, 150);

    if (nwDocno != "") {
        $("#totalsaveExit").enable(false);        
    }
}

function ParticularsProp() {
    var Grid = nwGridLDTotalAPV_Book.ActiveSheet;
    var length = Grid.GetMaxRow();

    for (var i = 0; i < length; i++) {
        var text = Grid.GetValue((SPR_TOTAL_REMARKS - 1), i);
        var apvno = Grid.GetText((SPR_TOTAL_APVNO - 1), i);
        if (text != "") {
            Grid.SetBackground((SPR_TOTAL_REMARKS - 1), i, "#006060");
        }
        else if (apvno != "" && text == "") {
            Grid.SetBackground((SPR_TOTAL_REMARKS - 1), i, "#1130c7");
        }
        else {
            Grid.SetBackground((SPR_TOTAL_REMARKS - 1), i, "gainsboro");
        }
    }
}

$(document).on('click', '.nwgbtnRemarks', function () {
    if (nwDocno != '') {
        $("#txtnwgRemarks").enable(false);
        $("#btnnwgRemarks").enable(false);
        $("#chknwgRemarks").enable(false);
    }
    if (ifTaxConvertIsClick == "1") {
        $("#txtnwgRemarks").enable(false);
        $("#btnnwgRemarks").enable(false);
        $("#chknwgRemarks").enable(false);
    }
    else {
        $("#txtnwgRemarks").enable(true);
        $("#btnnwgRemarks").enable(true);
        $("#chknwgRemarks").enable(true);
    }
});

$(document).on("click", "#btnnwgRemarks", function (e) {
    ParticularsProp();
    DebitwRefParticularsProp();
    ParticularswoProp();
});

$(document).on("keypress", "#txtnwgRemarks", function (e) {
    if (e.which == 13) {
        ParticularsProp();
        DebitwRefParticularsProp();
        ParticularswoProp();
    }
});

function DebitwRefParticularsProp() {
    var Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;
    var length = Grid.GetMaxRow();

    for (var i = 0; i < length; i++) {
        var text = Grid.GetValue((SPR_PARTICULARS - 1), i);
        var apvno = Grid.GetText((SPR_APVNO - 1), i);
        if (text != "") {
            Grid.SetBackground((SPR_PARTICULARS - 1), i, "#006060");
        }
        else if (apvno != "" && text == "") {
            Grid.SetBackground((SPR_PARTICULARS - 1), i, "#1130c7");
        }
        else {
            Grid.SetBackground((SPR_PARTICULARS - 1), i, "gainsboro");
        }
    }
}

function DebitwRefProp() {
    var Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;
    var length = Grid.GetMaxRow();

    for (var i = 0; i < length; i++) {
        var text = Grid.GetValue((SPR_PARTICULARS - 1), i);
        var apvno = Grid.GetText((SPR_APVNO - 1), i);
        if (text != "") {
            Grid.SetBackground((SPR_PARTICULARS - 1), i, "#006060");
        }
        else if (apvno != "" && text == "") {
            Grid.SetBackground((SPR_PARTICULARS - 1), i, "#1130c7");
        }
        else {
            Grid.SetBackground((SPR_PARTICULARS - 1), i, "gainsboro");
        }
        var linetype = Grid.GetText((SPR_LINETYPE - 1), i);
        var ratag = Grid.GetText((SPR_RCTAG - 1), i);
        if (ratag == "Gray" && linetype == "Transaction") {
            Grid.SetBackground((SPR_DETAILS - 1), i, "gainsboro");
        }
        else if (ratag == "Red" && linetype == "Transaction") {
            Grid.SetBackground((SPR_DETAILS - 1), i, "Red");
        }
        else if (ratag == "Yellow" && linetype == "Transaction") {
            Grid.SetBackground((SPR_DETAILS - 1), i, "Yellow");
        }
        else if (ratag == "Green" && linetype == "Transaction") {
            Grid.SetBackground((SPR_DETAILS - 1), i, "#006060");
        }
        else {
            Grid.SetBackground((SPR_DETAILS - 1), i, "gainsboro");
        }

        switch (lastsegment) {
            case "02":
                Grid.SetBackground((SPR_SEG2 - 1), i, "gainsboro");
                Grid.SetBackground((SPR_REF2 - 1), i, "gainsboro");
                break;

            case "03":
                Grid.SetBackground((SPR_SEG3 - 1), i, "gainsboro");
                Grid.SetBackground((SPR_REF3 - 1), i, "gainsboro");
                break;

            case "04":
                Grid.SetBackground((SPR_SEG4 - 1), i, "gainsboro");
                Grid.SetBackground((SPR_REF4 - 1), i, "gainsboro");
                break;

            case "05":
                Grid.SetBackground((SPR_SEG5 - 1), i, "gainsboro");
                Grid.SetBackground((SPR_REF5 - 1), i, "gainsboro");
                break;

            case "06":
                Grid.SetBackground((SPR_SEG6 - 1), i, "gainsboro");
                Grid.SetBackground((SPR_REF6 - 1), i, "gainsboro");
                break;
        }

        if (allowTaxPerTrantype == "1" && ifTaxConvertIsClick == "0") {
            Grid.SetBackground((SPR_VATDESC - 1), i, "cyan");
            Grid.SetBackground((SPR_EWTDESC - 1), i, "cyan");
        }
        else {
            Grid.SetBackground((SPR_VATDESC - 1), i, "gainsboro");
            Grid.SetBackground((SPR_EWTDESC - 1), i, "gainsboro");
        }

        let reqsl = Grid.GetText((SPR_REQSLTYPE - 1), i);
        let reqsubacct = Grid.GetText((SPR_REQSUBACCOUNT - 1), i);
        if (reqsl == "1" && ifTaxConvertIsClick == "0") {
            Grid.SetBackground((SPR_SUBLEDGERTYPE - 1), i, "cyan");
            Grid.SetBackground((SPR_SUBSIDIARYLREF - 1), i, "cyan");
        }
        else {
            Grid.SetBackground((SPR_SUBLEDGERTYPE - 1), i, "gainsboro");
            Grid.SetBackground((SPR_SUBSIDIARYLREF - 1), i, "gainsboro");
        }
        if (reqsubacct == "1" && ifTaxConvertIsClick == "0") {
            Grid.SetBackground((SPR_SUBACCOUNT - 1), i, "cyan");
        }
        else {
            Grid.SetBackground((SPR_SUBACCOUNT - 1), i, "gainsboro");
        }

        //Grid.SetFont((SPR_PARTICULARS - 1), i, "btnFont");
    }

    if (nwDocno != "") {
        $("#debitnotewrefresetTax").enable(false);
        $(".nwgrid_Insert").enable(false);
        $(".nwgrid_Delete").enable(false);
    }
}



function ReqSLSA(sl, sa) {
    var Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;
    if (sl == "1") {
        Grid.SetBackground((SPR_SUBLEDGERTYPE - 1), _row, "cyan");
        Grid.SetBackground((SPR_SUBSIDIARYLREF - 1), _row, "cyan");
        Grid.SetText((SPR_SUBLEDGERTYPE - 1), _row, "");
        Grid.SetText((SPR_SUBSIDIARYLREF - 1), _row, "");
        Grid.SetText((SPR_SLTYPECODE - 1), _row, "");
        Grid.SetText((SPR_SLREFCODE - 1), _row, "");
    }
    else {
        Grid.SetBackground((SPR_SUBLEDGERTYP - 1), _row, "gainsboro");
        Grid.SetBackground((SPR_SUBSIDIARYLREF - 1), _row, "gainsboro");
        Grid.SetText((SPR_SUBLEDGERTYPE - 1), _row, "");
        Grid.SetText((SPR_SUBSIDIARYLREF - 1), _row, "");
        Grid.SetText((SPR_SLTYPECODE - 1), _row, "");
        Grid.SetText((SPR_SLREFCODE - 1), _row, "");
    }
    if (sa == "1") {
        Grid.SetBackground((SPR_SUBACCOUNT - 1), _row, "cyan");
        Grid.SetText((SPR_SUBACCOUNT - 1), _row, "");
    }
    else {
        Grid.SetBackground((SPR_SUBACCOUNT - 1), _row, "gainsboro");
        Grid.SetText((SPR_SUBACCOUNT - 1), _row, "");
    }
}


function ViewItemMaster(itemcode) {
    nwLoading_Start("xItemMaster", crLoadingHTML);
    var fullength = "";
    var title = "";

    if (itemcode.length > 0) {
        title = "Item Master";
        fullength = GetCurrentURL() + "../SGItemMaster?nwItemDetails=" + encodeURI(itemcode);
        $('.nwmenuFrame').attr("src", fullength);

        nwPopupForm_Create("nwPopItemMasterWindow", true, fullength);
        $('#nwPopItemMasterWindow .modal-hdr-title').text(title);

        nwPopupForm_ShowModal("nwPopItemMasterWindow");
        $('.dimbgNWnwPopWindow').removeClass('openn');
    }
    nwLoading_End('xItemMaster');
}

function GetAccountDescription() {
    var Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;
    var seg1 = Grid.GetText((SPR_REF1 - 1), _row);
    var seg2 = Grid.GetText((SPR_REF2 - 1), _row);
    var seg3 = Grid.GetText((SPR_REF3 - 1), _row);
    var seg4 = Grid.GetText((SPR_REF4 - 1), _row);
    var seg5 = Grid.GetText((SPR_REF5 - 1), _row);
    var seg6 = Grid.GetText((SPR_REF6 - 1), _row);
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

    Grid.SetText((SPR_ACCOUNTDESC - 1), _row, descText);
}

function DebitwoRefProp() {
    var Grid = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet;
    var length = Grid.GetMaxRow();

    for (var i = 0; i < length; i++) {
        var text = Grid.GetValue((SPR_without_PARTICULARS - 1), i);
        var reason = Grid.GetText((SPR_without_REASON - 1), i);
        if (text != "") {
            Grid.SetBackground((SPR_without_PARTICULARS - 1), i, "#006060");
        }
        else if (reason != "" && text == "") {
            Grid.SetBackground((SPR_without_PARTICULARS - 1), i, "#1130c7");
        }
        else {
            Grid.SetBackground((SPR_without_PARTICULARS - 1), i, "gainsboro");
        }       

        switch (lastsegment) {
            case "02":
                Grid.SetBackground((SPR_without_SEG2 - 1), i, "gainsboro");
                Grid.SetBackground((SPR_without_REF2 - 1), i, "gainsboro");
                break;

            case "03":
                Grid.SetBackground((SPR_without_SEG3 - 1), i, "gainsboro");
                Grid.SetBackground((SPR_without_REF3 - 1), i, "gainsboro");
                break;

            case "04":
                Grid.SetBackground((SPR_without_SEG4 - 1), i, "gainsboro");
                Grid.SetBackground((SPR_without_REF4 - 1), i, "gainsboro");
                break;

            case "05":
                Grid.SetBackground((SPR_without_SEG5 - 1), i, "gainsboro");
                Grid.SetBackground((SPR_without_REF5 - 1), i, "gainsboro");
                break;

            case "06":
                Grid.SetBackground((SPR_without_SEG6 - 1), i, "gainsboro");
                Grid.SetBackground((SPR_without_REF6 - 1), i, "gainsboro");
                break;
        }

        if (allowTaxPerTrantype == "1" && ifTaxConvertIsClick == "0") {
            Grid.SetBackground((SPR_without_VATDESC - 1), i, "cyan");
            Grid.SetBackground((SPR_without_EWTDESC - 1), i, "cyan");
        }
        else {
            Grid.SetBackground((SPR_without_VATDESC - 1), i, "gainsboro");
            Grid.SetBackground((SPR_without_EWTDESC - 1), i, "gainsboro");
        }

        let reqsa = Grid.GetText((SPR_without_REQSUBACCOUNT - 1), i);
        let reqsl = Grid.GetText((SPR_without_REQSLTYPE - 1), i);
        if (reqsa == "1" && ifTaxConvertIsClick == "0") {
            Grid.SetBackground((SPR_without_SUBACCOUNT - 1), i, "cyan");
        }
        else {
            Grid.SetBackground((SPR_without_SUBACCOUNT - 1), i, "gainsboro");
        }
        if (reqsl == "1" && ifTaxConvertIsClick == "0") {
            Grid.SetBackground((SPR_without_SUBSIDIARYREF - 1), i, "cyan");
            Grid.SetBackground((SPR_without_SUBSIDIARYTYPE - 1), i, "cyan");
        }
        else {
            Grid.SetBackground((SPR_without_SUBSIDIARYREF - 1), i, "gainsboro");
            Grid.SetBackground((SPR_without_SUBSIDIARYTYPE - 1), i, "gainsboro");
        }

        //Grid.SetFont((SPR_without_PARTICULARS - 1), i, "btnFont");
    }

    if (nwDocno != "") {
        $("#debitnotewoutrefresetTax").enable(false);
        $("#debitnotewoutrefsaveExit").enable(false);
        $(".nwgrid_Insert").enable(false);
        $(".nwgrid_Delete").enable(false);
    }
}

function ReqSLSA_woRef(sl, sa) {
    var Grid = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet;
    if (sl == "1") {
        Grid.SetBackground((SPR_without_SUBSIDIARYREF - 1), _row, "cyan");
        Grid.SetBackground((SPR_without_SUBSIDIARYTYPE - 1), _row, "cyan");
        Grid.SetText((SPR_without_SUBSIDIARYREF - 1), _row, "");
        Grid.SetText((SPR_without_SUBSIDIARYTYPE - 1), _row, "");
        Grid.SetText((SPR_without_SLREFCODE - 1), _row, "");
        Grid.SetText((SPR_without_SLTYPECODE - 1), _row, "");
    }
    else {
        Grid.SetBackground((SPR_without_SUBSIDIARYREF - 1), _row, "gainsboro");
        Grid.SetBackground((SPR_without_SUBSIDIARYTYPE - 1), _row, "gainsboro");
        Grid.SetText((SPR_without_SUBSIDIARYREF - 1), _row, "");
        Grid.SetText((SPR_without_SUBSIDIARYTYPE - 1), _row, "");
        Grid.SetText((SPR_without_SLREFCODE - 1), _row, "");
        Grid.SetText((SPR_without_SLTYPECODE - 1), _row, "");
    }
    if (sa == "1") {
        Grid.SetBackground((SPR_without_SUBACCOUNT - 1), _row, "cyan");
        Grid.SetText((SPR_without_SUBACCOUNT - 1), _row, "");
    }
    else {
        Grid.SetBackground((SPR_without_SUBACCOUNT - 1), _row, "gainsboro");
        Grid.SetText((SPR_without_SUBACCOUNT - 1), _row, "");
    }
}

function GetAccountDescription_woRef() {
    var Grid = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet;
    var seg1 = Grid.GetText((SPR_without_REF1 - 1), _row);
    var seg2 = Grid.GetText((SPR_without_REF2 - 1), _row);
    var seg3 = Grid.GetText((SPR_without_REF3 - 1), _row);
    var seg4 = Grid.GetText((SPR_without_REF4 - 1), _row);
    var seg5 = Grid.GetText((SPR_without_REF5 - 1), _row);
    var seg6 = Grid.GetText((SPR_without_REF6 - 1), _row);
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

    Grid.SetText((SPR_without_ACCOUNTDESC - 1), _row, descText);
}

function ParticularswoProp() {
    var Grid = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet;
    var length = Grid.GetMaxRow();

    for (var i = 0; i < length; i++) {
        var text = Grid.GetValue((SPR_without_PARTICULARS - 1), i);
        var reason = Grid.GetText((SPR_without_REASON - 1), i);
        if (text != "") {
            Grid.SetBackground((SPR_without_PARTICULARS - 1), i, "#006060");
        }
        else if (reason != "" && text == "") {
            Grid.SetBackground((SPR_without_PARTICULARS - 1), i, "#1130c7");
        }
        else {
            Grid.SetBackground((SPR_without_PARTICULARS - 1), i, "gainsboro");
        }
    }
}

$(document).on("focus", ".numVATIN_woRef, .numVATEX_woRef", function (e) {
    _crnwTR = crnwTR;
});

$(document).on("change", ".numVATIN_woRef", function (e) {    
    let ocyvatex = 0, vat = 0, ewt = 0, netamt = 0;
    let ocyvatin = getNumReplace(getDataOfGrid('nwGridDebitNoteWithoutReferece', 'input', (SPR_without_DMAMOUNT - 1), _row));
    let vatrate = getNumReplace(getDataOfGrid('nwGridDebitNoteWithoutReferece', '', (SPR_without_TAXRATE - 1), _row));
    let ewtrate = getNumReplace(getDataOfGrid('nwGridDebitNoteWithoutReferece', '', (SPR_without_TAXRATE2 - 1), _row));

    ocyvatex = ocyvatin / (1 + (vatrate / 100));
    //vat = ocyvatin - ocyvatex;
    //ewt = ocyvatex * (ewtrate / 100);
    //netamt = ocyvatex + vat - ewt;
    nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText((SPR_without_DMAMOUNTVATEX - 1), _row, setNumReplace(ocyvatex, 2));
});

$(document).on("change", ".numVATEX_woRef", function (e) {  
    let ocyvatin = 0, vat = 0, ewt = 0, netamt = 0;
    let ocyvatex = getNumReplace(getDataOfGrid('nwGridDebitNoteWithoutReferece', 'input', (SPR_without_DMAMOUNTVATEX - 1), _row));
    let vatrate = getNumReplace(getDataOfGrid('nwGridDebitNoteWithoutReferece', '', (SPR_without_TAXRATE - 1), _row));
    let ewtrate = getNumReplace(getDataOfGrid('nwGridDebitNoteWithoutReferece', '', (SPR_without_TAXRATE2 - 1), _row));

    ocyvatin = ocyvatex * (1 + (vatrate / 100));
    //vat = ocyvatin - ocyvatex;
    //ewt = ocyvatex * (ewtrate / 100);
    //netamt = ocyvatex + vat - ewt;

    nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet.SetText((SPR_without_DMAMOUNT - 1), _row, setNumReplace(ocyvatin, 2));
});

$(document).on("change", "#txtRefDate", function (e) {    
    var refdate = $(this).val();
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + '/' + d.getFullYear();

    var xbool2 = nwDateMaskCheck($(this).val());    
    if (Date.parse(output) < Date.parse(refdate)) {
        MessageBox("Cannot proceed. Ref. Date must not be later than the current server date.\n", basedTitle, "error");
        $(this).val("");
        return false;
    }   
    if (xbool2 == false) {       
        $(this).val("");
        $(this).focus();        
    }
});

$(document).on("change", "#txtref", function (e) {
    cust_GetPara();
    nwParameter_Add("txtref", $(this).val());
    nwParameter_Add("idvallugPayee", $("#idvallugPayee").val());
    nwParameter_Add("txtDMno", $("#txtDMno").val());
    func_ActionDriven("actRefNoValidation", false);
});

function ViewVendorInfo(vendor, type) {
    nwLoading_Start("xVendorInfo", crLoadingHTML);
    var fullength = "";
    var title = "";    

    if (vendor.length > 0) {

        if (type == "01") {
            title = "Vendor Information";
            fullength = GetCurrentURL() + "../APSupplierInformation?nwSupplierCode=" + encodeURI(vendor) + "&nwDocno=" + encodeURI(vendor) + "&nwIsReport=1";
            $('.nwmenuFrame').attr("src", fullength);

            nwPopupForm_Create("nwPopVendorInfoWindow", true, fullength);
            $('#nwPopVendorInfoWindow .modal-hdr-title').text(title);

            nwPopupForm_ShowModal("nwPopVendorInfoWindow");
            $('.dimbgNWnwPopWindow').removeClass('openn');
        }
        //else if (type == "02") {
        //    title = "Vendor Information";
        //    fullength = GetCurrentURL() + "../AP/DataSetup/APSupplierInformation/APSupplierInformation.aspx?nwDocno=" + encodeURI(vendor) + "&nwIsReport=1";
        //    $('.nwmenuFrame').attr("src", fullength);

        //    nwPopupForm_Create("nwPopVendorInfoWindow", true, fullength);
        //    $('#nwPopVendorInfoWindow .modal-hdr-title').text(title);

        //    nwPopupForm_ShowModal("nwPopVendorInfoWindow");
        //    $('.dimbgNWnwPopWindow').removeClass('openn');
        //}

    }
    nwLoading_End('xVendorInfo');
}

function SetForexHdr() {
    var loc = $('#idvallugLocForm').val();    
    var currency = $('#idvallugCurrency').val();

    cust_GetPara();
    nwParameter_Add("idvallugLocForm", loc);
    nwParameter_Add("valueDate", CurrentServerDate);
    nwParameter_Add("idvallugCurrency", currency);

    if (loc.length > 0 && CurrentServerDate.length > 0 && currency.length > 0) {
        func_ActionDriven("actSetForex", true);
    }
}

$(document).on('click', '#btnExportJrnl', function () {
    //nwLoading_Start("xbtnExportJrnl", crLoadingHTML);
    //cust_GetPara();
    //func_ActionDriven("actExportJrnl", false);
    fn_ExportGrid("nwGridJECon");
});

function DisableDebitNotewRef() {
    var Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;
    var length = Grid.GetMaxRow();

    Grid.SetBackground((SPR_APVNO - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_REASON - 1), Spread_ALLROW, "gainsboro");
    Grid.SetEnable((SPR_PARTICULARS - 1), Spread_ALLROW, true);
    Grid.SetBackground((SPR_PAYEEREF - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_ITEMGROUPTYPEDESC - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_ITEMDESC - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_VATDESC - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_EWTDESC - 1), Spread_ALLROW, "gainsboro");
    Grid.SetEnable((SPR_DVAMOUNT - 1), Spread_ALLROW, false);
    Grid.SetEnable((SPR_DVAMOUNTVATEX - 1), Spread_ALLROW, false);
    Grid.SetBackground((SPR_SEG1 - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_SEG2 - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_SEG3 - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_SEG4 - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_SEG5 - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_SEG6 - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_SUBACCOUNT - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_SUBLEDGERTYPE - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_SUBSIDIARYLREF - 1), Spread_ALLROW, "gainsboro");
    Grid.SetEnable((SPR_PERIODFROM - 1), Spread_ALLROW, false);
    Grid.SetEnable((SPR_PERIODTO - 1), Spread_ALLROW, false);
    Grid.SetBackground((SPR_DVAMOUNT - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_DVAMOUNTVATEX - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_PERIODFROM - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_PERIODTO - 1), Spread_ALLROW, "gainsboro");

    for (var i = 0; i < length; i++) {
        var linetype = Grid.GetText((SPR_LINETYPE - 1), i);
        if (linetype != "Transaction") {
            Grid.SetEnable((SPR_PARTICULARS - 1), i, false);
        }       
    }
    
}

function DisableDebitNotewoRef() {
    var Grid = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet;
    var length = Grid.GetMaxRow();

    Grid.SetBackground((SPR_without_REASON - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_PAYEEREF - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_ITEMGROUPTYPEDESC - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_ITEMDESC - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_VATDESC - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_EWTDESC - 1), Spread_ALLROW, "gainsboro");
    Grid.SetEnable((SPR_without_DMAMOUNT - 1), Spread_ALLROW, false);
    Grid.SetEnable((SPR_without_DMAMOUNTVATEX - 1), Spread_ALLROW, false);
    Grid.SetBackground((SPR_without_SEG1 - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_SEG2 - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_SEG3 - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_SEG4 - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_SEG5 - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_SEG6 - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_SUBACCOUNT - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_SUBSIDIARYREF - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_SUBSIDIARYTYPE - 1), Spread_ALLROW, "gainsboro");
    Grid.SetEnable((SPR_without_PERIODFROM - 1), Spread_ALLROW, false);
    Grid.SetEnable((SPR_without_PERIODTO - 1), Spread_ALLROW, false);
    Grid.SetBackground((SPR_without_DMAMOUNT - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_DMAMOUNTVATEX - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_PERIODFROM - 1), Spread_ALLROW, "gainsboro");
    Grid.SetBackground((SPR_without_PERIODTO - 1), Spread_ALLROW, "gainsboro");

    for (var i = 0; i < length; i++) {
        var linetype = Grid.GetText((SPR_without_LINETYPE - 1), i);
        if (linetype != "Transaction") {
            Grid.SetEnable((SPR_without_PARTICULARS - 1), i, false);
        }
    }

}

function ComputeAmountswRef() {
    var Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;

    let ocyvatex = 0, vat = 0, ewt = 0, netamt = 0;
    let ocyvatin = getNumReplace(getDataOfGrid('nwGridDebitNoteWithReferece', 'input', (SPR_DVAMOUNT - 1), _row));
    let vatrate = getNumReplace(getDataOfGrid('nwGridDebitNoteWithReferece', '', (SPR_TAXRATE - 1), _row));
    let ewtrate = getNumReplace(getDataOfGrid('nwGridDebitNoteWithReferece', '', (SPR_TAXRATE2 - 1), _row));
    let openamt = getNumReplace(getDataOfGrid('nwGridDebitNoteWithReferece', '', (SPR_OPENAMOUNT - 1), _row));

    ocyvatex = ocyvatin / (1 + (vatrate / 100));
    vat = ocyvatin - ocyvatex;
    ewt = ocyvatex * (ewtrate / 100);
    netamt = ocyvatex + vat - ewt;

    Grid.SetText((SPR_DVAMOUNTVATEX - 1), _row, (setNumReplace(ocyvatex, 2)));
    Grid.SetText((SPR_DVAMOUNT - 1), _row, (setNumReplace(ocyvatin, 2)));
    Grid.SetText((SPR_VAT - 1), _row, (setNumReplace(vat, 2)));
    Grid.SetText((SPR_EWT - 1), _row, (setNumReplace(ewt, 2)));
    Grid.SetText((SPR_NETAMT - 1), _row, (setNumReplace(netamt, 2)));
}

$(document).on('change', '#txtValueDate', function () {
    let effectiveDate = $(this).val();
    let tag = isEffectiveWithPeriodDates(effectiveDate)

    if (Date.parse(effectiveDate) > Date.parse($('#txtServerdate').val())) {
        MessageBox("Cannot proceed. Value Date should not be later than the current server date.", basedTitle, "error");
        $(this).val('');
        $(this).focus();
    } else if (tag == 0) {
        MessageBox("Cannot proceed. Value Date should be within the set period dates.", basedTitle, 'error');
        $(this).val('');
    }
    //else if (tag == 2) {
    //    MessageBox("Cannot proceed. Period is already closed.", basedTitle, 'error');
    //    $(this).val('');
    //}
    else {
        cust_GetPara();
        nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
        nwParameter_Add("txtValueDate", $('#txtValueDate').val());
        func_ActionDriven("actValDate", false);
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
        let loc = $('#idvallugLocation').val();
        let mn = parseInt(dateArr[0]);
        //let perNo = jsonPerDates.filter(e => e["Month"] == mn && e["Year"] == year)[0].Periodno;
        let year = parseInt(dateArr[2]);
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

function newFunction() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var maxRow = Grid.GetMaxRow();
    Grid.RowDelete(0, maxRow);
    Grid.RowAdd(0, 5);
    CreateGridDone();
}

function Cuz_RemarksDone() {
    Cuz_nwGrid_Remarks(_row);
}

function Cuz_nwGrid_Remarks(row) {
    var Grid = nwGridCon_Book.ActiveSheet;
    var Remarks = Grid.GetValue((SPR_REMARKSOFF - 1), row);
    if (!isNull(Remarks)) {
        Grid.SetBackground((SPR_REMARKSOFF - 1), row, "#006060");
    } else {
        Grid.SetBackground((SPR_REMARKSOFF - 1), row, "#1130c7");
    }
}

function p8Spread_Click(canvasID, row, col) {
    _canvasID = canvasID;
    _row = row;
    _col = col;
    var Grid;

    if (!($("#" + canvasID).enable())) {
        return false;
    }

    if (canvasID == "nwGridDebitNoteWithRefereceCon") {
        Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;

        if (col != (SPR_APVNO - 1) && Grid.GetText((SPR_APVNO - 1), row) == "") {
            MessageBox("Cannot proceed. APV No. is required.", basedTitle);
            return false;
        }

        if (col == (SPR_PARTICULARS - 1)) {
            setTimeout(function () {
                $('#spreadRemarksCon .modal-hdr-title').text("Particulars");
                $('#spreadRemarksCon #txtSpreadRemarks').addClass("noresize");
            }, 150);
        }

        if (col == (SPR_DETAILS - 1)) {
            var docno = $('#txtDocno').val();
            var Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;
            var reftranno = Grid.GetText((SPR_APVNO - 1), _row);

            if (reftranno.length > 0) {
                var fullength = GetCurrentURL() + "../DCViewAttachment?nwDocno=" + reftranno + "";

                nwLoading_Start('xbtnRvwAttach', crLoadingHTML);
                nwPopupForm_Create("nwPopUpRvwAttach", true, fullength);
                $('#nwPopUpRvwAttach .modal-hdr-title').text("Review Attachment(s)");
                nwPopupForm_ShowModal("nwPopUpRvwAttach");
                nwLoading_End('xbtnRvwAttach');
            }
        }
    }

    if (canvasID == "nwGridDebitNoteWithoutRefereceCon") {
        Grid = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet;

        if (col == (SPR_without_PARTICULARS - 1)) {
            setTimeout(function () {
                $('#spreadRemarksCon .modal-hdr-title').text("Particulars");
                $('#spreadRemarksCon #txtSpreadRemarks').addClass("noresize");
            }, 150);
        }
    }

    if (canvasID == "nwGridLineDetails") {
        Grid = nwGridLineDetails_Book.ActiveSheet;

        if (col == (SPR_LD_DETAILS - 1)) {
            if (Grid.GetText((SPR_LD_APVNO - 1), _row) == "")
                return;

            nwParameter_Add("APVNO", Grid.GetText((SPR_LD_APVNO - 1), _row));
            nwParameter_Add("apvAmount", Grid.GetText((SPR_LD_APVAMT - 1), _row));
            nwParameter_Add("apvRowno", Grid.GetText((SPR_LD_APVROWNO - 1), _row));
            nwParameter_Add("debitMemoNo", $("#txtDMno").val());
            nwParameter_Add("isResetTax", isResetTax);
            $('#APVDateLD').val(Grid.GetText((SPR_LD_APVDATE - 1), _row));
            $('#APVNoLD').val(Grid.GetText((SPR_LD_APVNO - 1), _row));
            $('#APVAmountLD').val(Grid.GetText((SPR_LD_APVAMT - 1), _row));

            $('#nwGenerateDetailsLD .modal-hdr-title').text("Line Details with Reference");
            nwPopupForm_ShowModal("nwGenerateDetailsLD");
            func_ActionDriven("actGridLineDetails2", true);
        }
    }

    if (canvasID == "nwGridLDTotalAPV") {
        Grid = nwGridLDTotalAPV_Book.ActiveSheet;

        if (col == (SPR_TOTAL_DETAILS - 1)) {
            var docno = $('#txtDocno').val();
            var reftranno = nwGridLDTotalAPV_Book.ActiveSheet.GetText((SPR_TOTAL_APVNO - 1), _row);

            if (reftranno.length > 0) {
                var fullength = GetCurrentURL() + "../DCViewAttachment?nwDocno=" + reftranno + "";

                nwLoading_Start('xbtnRvwAttach', crLoadingHTML);
                nwPopupForm_Create("nwPopUpRvwAttach", true, fullength);
                $('#nwPopUpRvwAttach .modal-hdr-title').text("Review Attachment(s)");
                nwPopupForm_ShowModal("nwPopUpRvwAttach");
                nwLoading_End('xbtnRvwAttach');
            }
        }

        if (col == (SPR_TOTAL_REMARKS - 1)) {
            setTimeout(function () {
                $('#spreadRemarksCon .modal-hdr-title').text("Particulars");
                $('#spreadRemarksCon #txtSpreadRemarks').addClass("noresize");
            }, 150);
        }
    }

    return true;
}

function p8Spread_DblClick(canvasID, row, col) {
    _canvasID = canvasID;
    _row = row;
    _col = col;
    var Grid;

    if (canvasID == "nwGridDebitNoteWithRefereceCon") {
        Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;
        _GridLU = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;

        nwParameter_Add("APVNoPerRow", Grid.GetText((SPR_APVNO - 1), row));

        if (col != (SPR_APVNO - 1) && Grid.GetText((SPR_APVNO - 1), row) == "") {
            MessageBox("Cannot proceed. APV No. is required.", basedTitle);
            return false;
        }

        if (col == (SPR_APVNO - 1) && Grid.GetBackground((SPR_APVNO - 1), row) != "gainsboro") {
            nwParameter_Add("chckAutoAllocate", $("#chckAutoAllocate").prop("checked"));
            lookUpCustomize("lugAPVNo_DebitwRef", 2, undefined, true);
        }
        if (col == (SPR_REASON - 1) && Grid.GetBackground((SPR_REASON - 1), row) != "gainsboro") {
            //lookUpCustomize("reasondebitref", 1);
            lookUpCustomize("lugRsn_DebitwRef", 1);
        }
        if (col == (SPR_PAYEEREF - 1) && Grid.GetBackground((SPR_PAYEEREF - 1), row) != "gainsboro") {
            $('#txtisPayeeCode').val(Grid.GetText((SPR_ISSUPPLIER - 1), row));
            //lookUpCustomize("referencedebit", 1);
            lookUpCustomize("lugPayee_DebitwRef", 1);
        }
        if (col == (SPR_ITEMGROUPTYPEDESC - 1) && Grid.GetBackground((SPR_ITEMGROUPTYPEDESC - 1), row) != "gainsboro") {
            //lookUpCustomize("lugitemgroup", 1);
            lookUpCustomize("lugIGT_DebitwRef", 1);
        }
        if (col == (SPR_ITEMDESC - 1) && Grid.GetBackground((SPR_ITEMDESC - 1), row) != "gainsboro") {
            //lookUpCustomize("lugitemgroup", 1);
            lookUpCustomize("lugItemCode_DebitwRef", 1);
        }
        if (col == (SPR_VATDESC - 1) && Grid.GetBackground((SPR_VATDESC - 1), row) != "gainsboro") {
            //lookUpCustomize("lugitemgroup", 1);
            lookUpCustomize("lugVAT_DebitwRef", 1);
        }
        if (col == (SPR_EWTDESC - 1) && Grid.GetBackground((SPR_EWTDESC - 1), row) != "gainsboro") {
            //lookUpCustomize("lugitemgroup", 1);
            lookUpCustomize("lugEWT_DebitwRef", 1);
        }
        if (col == (SPR_SEG1 - 1) && Grid.GetBackground((SPR_SEG1 - 1), row) != "gainsboro") {
            lookUpCustomize("lugSeg1_DebitwRef", 1);
        }
        if (col == (SPR_SEG2 - 1) && Grid.GetBackground((SPR_SEG2 - 1), row) != "gainsboro") {
            lookUpCustomize("lugSeg2_DebitwRef", 1);
        }
        if (col == (SPR_SEG3 - 1) && Grid.GetBackground((SPR_SEG3 - 1), row) != "gainsboro") {
            lookUpCustomize("lugSeg3_DebitwRef", 1);
        }
        if (col == (SPR_SEG4 - 1) && Grid.GetBackground((SPR_SEG4 - 1), row) != "gainsboro") {
            lookUpCustomize("lugSeg4", 1);
        }
        if (col == (SPR_SEG5 - 1) && Grid.GetBackground((SPR_SEG5 - 1), row) != "gainsboro") {
            lookUpCustomize("lugSeg5", 1);
        }
        if (col == (SPR_SEG6 - 1) && Grid.GetBackground((SPR_SEG6 - 1), row) != "gainsboro") {
            lookUpCustomize("lugSeg6", 1);
        }
        if (col == (SPR_SUBLEDGERTYPE - 1) && Grid.GetBackground((SPR_SUBLEDGERTYPE - 1), row) != "gainsboro") {
            if (Grid.GetText((SPR_REQSLTYPE - 1), row) == "1") {
                lookUpCustomize("lugSLType_DebitwRef", 1);
            }
        }
        if (col == (SPR_SUBSIDIARYLREF - 1) && Grid.GetBackground((SPR_SUBSIDIARYLREF - 1), row) != "gainsboro") {
            if (Grid.GetText((SPR_REQSLTYPE - 1), row) == "1") {
                lookUpCustomize("lugSLRef_DebitwRef", 1);
            }
        }
        if (col == (SPR_SUBACCOUNT - 1) && Grid.GetBackground((SPR_SUBACCOUNT - 1), row) != "gainsboro") {
            if (Grid.GetText((SPR_REQSUBACCOUNT - 1), row) == "1") {
                lookUpCustomize("lugBankAccnt_DebitwRef", 1);
            }
        }
    }

    else if (canvasID == "nwGridDebitNoteWithoutRefereceCon") {
        Grid = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet;
        _GridLU = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet;

        if (col == (SPR_without_REASON - 1) && Grid.GetBackground((SPR_without_REASON - 1), row) != "gainsboro") {
            nwParameter_Add("flag", flag);
            //lookUpCustomize("debitwoutrefreason", 1);
            lookUpCustomize("lugReason_DebitwoRef", 1);
        }
        if (col == (SPR_without_PAYEEREF - 1) && Grid.GetBackground((SPR_without_PAYEEREF - 1), row) != "gainsboro") {
            //lookUpCustomize("debitwoutrefpayeeref", 1);
            lookUpCustomize("lugPayeeRef_DebitwoRef", 1);
        }
        if (col == (SPR_without_ITEMGROUPTYPEDESC - 1) && Grid.GetBackground((SPR_without_ITEMGROUPTYPEDESC - 1), row) != "gainsboro") {
            //lookUpCustomize("debitwoutrefitemgroupitem", 1);
            lookUpCustomize("lugIGT_DebitwoRef", 1);
        }
        if (col == (SPR_without_ITEMDESC - 1) && Grid.GetBackground((SPR_without_ITEMDESC - 1), row) != "gainsboro") {
            lookUpCustomize("lugItemCode_DebitwoRef", 1);
        }
        if (col == (SPR_without_VATDESC - 1) && Grid.GetBackground((SPR_without_VATDESC - 1), row) != "gainsboro") {
            //lookUpCustomize("lugitemgroup", 1);
            lookUpCustomize("lugVAT_DebitwoRef", 1);
        }
        if (col == (SPR_without_EWTDESC - 1) && Grid.GetBackground((SPR_without_EWTDESC - 1), row) != "gainsboro") {
            //lookUpCustomize("lugitemgroup", 1);
            lookUpCustomize("lugEWT_DebitwoRef", 1);
        }
        if (col == (SPR_without_SEG1 - 1) && Grid.GetBackground((SPR_without_SEG1 - 1), row) != "gainsboro") {
            //lookUpCustomize("debitwoutrefmain", 1);
            lookUpCustomize("lugSeg1_DebitwoRef", 1);
        }
        if (col == (SPR_without_SEG2 - 1) && Grid.GetBackground((SPR_without_SEG2 - 1), row) != "gainsboro") {
            //lookUpCustomize("debitwoutrefprofitcenter", 1);
            lookUpCustomize("lugSeg2_DebitwoRef", 1);
        }
        if (col == (SPR_without_SEG3 - 1) && Grid.GetBackground((SPR_without_SEG3 - 1), row) != "gainsboro") {
            //lookUpCustomize("debitwoutrefcostcenter", 1);
            lookUpCustomize("lugSeg3_DebitwoRef", 1);
        }
        if (col == (SPR_without_SEG4 - 1) && Grid.GetBackground((SPR_without_SEG4 - 1), row) != "gainsboro") {
            //lookUpCustomize("debitwoutreflugSeg4", 1);
            lookUpCustomize("lugSeg4_DebitwoRef", 1);
        }
        if (col == (SPR_without_SEG5 - 1) && Grid.GetBackground((SPR_without_SEG5 - 1), row) != "gainsboro") {
            //lookUpCustomize("debitwoutreflugSeg5", 1);
            lookUpCustomize("lugSeg5_DebitwoRef", 1);
        }
        if (col == (SPR_without_SEG6 - 1) && Grid.GetBackground((SPR_without_SEG6 - 1), row) != "gainsboro") {
            //lookUpCustomize("debitwoutreflugSeg6", 1);
            lookUpCustomize("lugSeg6_DebitwoRef", 1);
        }
        if (col == (SPR_without_SUBSIDIARYTYPE - 1) && Grid.GetBackground((SPR_without_SUBSIDIARYTYPE - 1), row) != "gainsboro") {
            if (Grid.GetText((SPR_without_REQSLTYPE - 1), row) == "1") {
                //lookUpCustomize("debitwoutrefsubledtype", 1);
                lookUpCustomize("lugSLType_DebitwoRef", 1);
            }
        }
        if (col == (SPR_without_SUBSIDIARYREF - 1) && Grid.GetBackground((SPR_without_SUBSIDIARYREF - 1), row) != "gainsboro") {
            if (Grid.GetText((SPR_without_REQSLTYPE - 1), row) == "1") {
                //lookUpCustomize("debitwoutrefsubledref", 1);
                lookUpCustomize("lugSLRef_DebitwoRef", 1);
            }
        }
        if (col == (SPR_without_SUBACCOUNT - 1) && Grid.GetBackground((SPR_without_SUBACCOUNT - 1), row) != "gainsboro") {
            if (Grid.GetText((SPR_without_REQSUBACCOUNT - 1), row) == "1") {
                //lookUpCustomize("debitwoutrefsubaccount", 1);
                lookUpCustomize("lugBankAccnt_DebitwoRef", 1);
            }
        }
        if (col == (SPR_without_APControlAcctCode - 1) && Grid.GetBackground((SPR_without_APControlAcctCode - 1), row) != "gainsboro") {
            //lookUpCustomize("lugControlAccount", 1);
            lookUpCustomize("lugCtrlAcct_DebitwoRef", 1);
        }
    }

    else if (canvasID == 'nwGridLDTotalAPV') {
        Grid = nwGridLDTotalAPV_Book.ActiveSheet;
        _GridLU = nwGridLDTotalAPV_Book.ActiveSheet;

        if (col == (SPR_TOTAL_APVNO - 1) && Grid.GetBackground((SPR_TOTAL_APVNO - 1), row) != "gainsboro") {
            //lookUpCustomize("totalapvno", 1);
            lookUpCustomize("lugTotalAPV", 1);
        }
        if (col == (SPR_TOTAL_REASON - 1) && Grid.GetBackground((SPR_TOTAL_REASON - 1), row) != "gainsboro") {
            lookUpCustomize("totalreason", 1);
        }
    }

    return true;
}

function p8Spread_Change(canvasID, row, col) {
    _canvasID = canvasID;
    _row = row;
    _col = col;
    var Grid;

    if (canvasID == "nwGridDebitNoteWithRefereceCon") {
        Grid = nwGridDebitNoteWithRefereceCon_Book.ActiveSheet;

        if (col == (SPR_PERIODFROM - 1)) {
            var periodFrom = Grid.GetText((SPR_PERIODFROM - 1), _row);
            var periodTo = Grid.GetText((SPR_PERIODTO - 1), _row);

            if (Date.parse(periodFrom) > Date.parse(periodTo) && periodTo != '') {
                Grid.SetText((SPR_PERIODFROM - 1), _row, "");
                MessageBox("Cannot proceed. Period From should not be later than the Period To.", "Debit Note with Reference", "error");
            }
        }

        if (col == (SPR_PERIODTO - 1)) {
            var periodFrom = Grid.GetText((SPR_PERIODFROM - 1), _row);
            var periodTo = Grid.GetText((SPR_PERIODTO - 1), _row);

            if (Date.parse(periodFrom) > Date.parse(periodTo)) {
                Grid.SetText((SPR_PERIODTO - 1), _row, "");
                MessageBox("Cannot proceed. Period To should not be earlier than the Period From.", "Debit Note with Reference", "error");
            }
        }
    }

    if (canvasID == "nwGridDebitNoteWithoutRefereceCon") {
        Grid = nwGridDebitNoteWithoutRefereceCon_Book.ActiveSheet;

        if (col == (SPR_without_PERIODFROM - 1)){
            var periodFrom = Grid.GetText((SPR_without_PERIODFROM - 1), _row);
            var periodTo = Grid.GetText((SPR_without_PERIODTO - 1), _row);

            if (Date.parse(periodFrom) > Date.parse(periodTo) && periodTo != '') {
                Grid.SetText((SPR_without_PERIODFROM - 1), _row, "");
                MessageBox("Cannot proceed. Period From should not be later than the Period To.", "Debit Note without Reference", "error");
            }
        }


        if (col == (SPR_without_PERIODTO - 1)) {
            var periodFrom = Grid.GetText((SPR_without_PERIODFROM - 1), _row);
            var periodTo = Grid.GetText((SPR_without_PERIODTO - 1), _row);

            if (Date.parse(periodFrom) > Date.parse(periodTo)) {
                Grid.SetText((SPR_without_PERIODTO - 1), _row, "");
                MessageBox("Cannot proceed. Period To should not be earlier than the Period From.", "Debit Note without Reference", "error");
            }
        }
    }

    if (canvasID == "nwGridLineDetails") {
        Grid = nwGridLineDetails_Book.ActiveSheet;

        if (col == (SPR_LD_PERIODTO - 1)) {
            var PeriodFrom = Grid.GetText((SPR_LD_PERIODFROM - 1), _row);
            var PeriodTo = Grid.GetText((SPR_LD_PERIODTO - 1), _row);

            if (Date.parse(PeriodFrom) > Date.parse(PeriodTo)) {
                Grid.SetText((SPR_LD_PERIODTO - 1), _row, "");
                MessageBox("Period To should be later than Period From.", basedTitle);
            }
        }
    }

    return true;
}