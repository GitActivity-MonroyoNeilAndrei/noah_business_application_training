var isProcess;
var nwDocno = '';
var MenuItemTitle = "";
var serverDate = new Date();
var jsonGrid = [];
var jsonPerDates = [];
var jsonPerDatesClosing = [];

var nwTranNo = '';
var dblClickAddToList = 0;
var globalQtyRcv = 0;
var globalPOC = 0;
var globalOverrun = 0;
var globalLineType = 0;
var globalIsInv = "";
var globalRow = 0;

var isOpen = true;
var _isOpen = true;

var _row;

//Grid Main
var
    GRD_STARTINDEX = 1,
    GRD_LINETYPE = GRD_STARTINDEX,
    GRD_ITEMCODE = ++GRD_STARTINDEX,
    GRD_ITEMDESC = ++GRD_STARTINDEX,
    GRD_QTYRCV = ++GRD_STARTINDEX,
    GRD_COMPLETION = ++GRD_STARTINDEX,
    GRD_RCPT_UOM = ++GRD_STARTINDEX,
    GRD_RCPT_UOM_CODE = ++GRD_STARTINDEX,
    GRD_REQCOMPLIANCE = ++GRD_STARTINDEX,
    GRD_PARTICULARS = ++GRD_STARTINDEX,
    GRD_ORIGPOQTY = ++GRD_STARTINDEX,
    GRD_PURCHASE_UOM = ++GRD_STARTINDEX,
    GRD_PURCHASE_UOM_CODE = ++GRD_STARTINDEX,
    GRD_POQTY = ++GRD_STARTINDEX,
    GRD_PREVRCT = ++GRD_STARTINDEX,
    GRD_PREVPOC = ++GRD_STARTINDEX,
    GRD_POBAL = ++GRD_STARTINDEX,
    GRD_ALLOCATION = ++GRD_STARTINDEX,
    GRD_LINEID = ++GRD_STARTINDEX,
    GRD_HasDelDtl = ++GRD_STARTINDEX,
    GRD_OverrunRate = ++GRD_STARTINDEX,
    GRD_WEXPIRYDATE = ++GRD_STARTINDEX,
    GRD_WBATCHNO = ++GRD_STARTINDEX,
    GRD_INVENTORIABLE = ++GRD_STARTINDEX,
    GRD_ITEMGROUPTYPE = ++GRD_STARTINDEX,
    GRD_NOOFDECIMALS = ++GRD_STARTINDEX,
    GRD_REQDTLS = ++GRD_STARTINDEX,
    GRD_PREVRCPTS = ++GRD_STARTINDEX,
    GRD_HASREQDTLS = ++GRD_STARTINDEX,
    GRD_HASREQCOMP = ++GRD_STARTINDEX,
    GRD_HASPREVRCPTS = ++GRD_STARTINDEX,
    //GRD_LINEID1 = ++GRD_STARTINDEX,
    GRD_POLINEID = ++GRD_STARTINDEX,

    GRD_JRNL_OCYAMT = 9,

    LineItemIndex = 2,
    FreeGoodsIndex = 3,

    GRD_DA_DelDate = 1,
    GRD_DA_QtyToBeRcvd = 2,
    GRD_DA_ExpiryDate = 3,
    GRD_DA_BatchNo = 4,
    GRD_DA_POQTY = 5,
    GRD_DA_QtyRcvd = 6,
    GRD_DA_CurQtyRcvd = 7,
    GRD_DA_POQtyBal = 8,
    GRD_DA_WithExpiry = 9,
    GRD_DA_WithBatchNo = 10,

    GRD_RD_PRNO = 1,
    GRD_RD_REQNO = 2,
    GRD_RD_DATECREATED = 3,
    GRD_RD_DATEPOSTED = 4,
    GRD_RD_REQUESTOR = 5,
    GRD_RD_UOM = 6,
    GRD_RD_RQSTDQTY = 7,
    GRD_RD_ALLOCQTY = 8,
    GRD_RD_FORPR = 9,
    GRD_RD_QTYTOBEALLOC = 10,
    GRD_RD_OTHERQTY = 11,

    GRD_PR_RRNO = 1,
    GRD_PR_RCPTUOM = 2,
    GRD_PR_QTYRCVD = 3,
    GRD_PR_POC = 4,
    GRD_PR_QTYRCVDRCPT = 5,
    GRD_PR_DOCSTATUS = 6,
    GRD_PR_CREATEDBY = 7,
    GRD_PR_DATESUBMITTED = 8,
    GRD_PR_DATEPOSTED = 9,

     GRD_BD_POQTY = 1,
     GRD_BD_PURCHASEUOM = 2,
     GRD_BD_POQTYRU = 3,
     GRD_BD_PREVRCPTS = 4,
     GRD_BD_PREVPOC = 5,
     GRD_BD_POBAL = 6,
     GRD_BD_PREVIOUSRECEIPTS = 7;

var nwGridCon_Book_Custom;
var nwGridCon_Sheet_Custom;

var nwGridCon_Book_POBal;
var nwGridCon_Sheet_POBal;

var nwGridCon_Book_Dtl;
var nwGridCon_Sheet_Dtl;

var nwGridCon_Book_DtlsCon;
var nwGridCon_Sheet_DtlsCon;

var nwGridCon_Book_RcptsCon;
var nwGridCon_Sheet_RcptsCon;

var nwGridCon_Book_J;
var nwGridCon_Sheet_J;


function func_Reload() {
    //crLnk = "FIVRcptFromVendorEntry_Gateway.aspx";
    //crLnkGateKey = "FIVRcptFromVendorEntry";
    crLnk = GetCurrentURL() + "FIVRcptFromVendorEntry_Gateway";
    crLnkGateKey = "FIVRcptFromVendorEntry";
    crnwTagSingleBind = true;

    $('#txtValueDate').mask('99/99/9999');
    $('#dtpSIDate').mask('99/99/9999');
    $('#dtpDRDate').mask('99/99/9999');

    nwPopupForm_Create("nwJournalDetails", true);
    nwPopupForm_Create("nwRequestDetails", true);
    nwPopupForm_Create("nwPrevRcpts", true);
    nwPopupForm_Create("nwDeliveryDetailsWindow", true);
    


    nwTranNo = getParameterByName('nwTranNo');
    nwDocno = getParameterByName('nwDocno') != "" ? getParameterByName('nwDocno') : getParameterByName('nwTranNo');
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("nwTranNo", nwTranNo);

    $('#tab-one, #tab-two, #tab-three, #tab-four').prop('checked', false);

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();
    DateFormat();
    cust_GetPara();
    ClearFields();

    return isContinue;
}
//    var isContinue = true;
//    init_request();
//    ToolBoxGetData = false;

//    //DisableFields();
//    //DateFormat();
//    cust_GetPara();
//    ClearFields();

//    return isContinue;

//}

function mainload_custom() {
    nwParameter_Add("Docno", nwDocno);
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("nwTranNo", nwTranNo);

    if (nwDocno != '') {
        cust_GetPara();
        $("#noah-webui-Toolbox").bindingRefresh().click();
        $('.inputBox').enable(false);
    }
}

/* Tool Box */

function func_ToolboxADD(indef, enume) {
    var isContinue = true;

    if ($("#tagChkRcptRefNoConfig").val() == "0") {
        MessageBox("Cannot proceed. Please setup Receipt Reference No. Configuration.", MenuItemTitle, "error");
        isContinue = false;
    }
    else {
        EnableFields();
        ClearFields();
        func_Toolbox_Clear();
        //$('#idvallugLocForm').focus();
    }

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

    var prompt = "Do you want to process the current record?";
    crnwTable = $("#nwGridCon .tblGridBody tbody");
    var length = crnwTable.find("tr").length;

    for (var i = 0; i < length; i++) {
        if (crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + GRD_ITEMCODE + ")").text() != "") {
            var qty = parseFloat(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + GRD_QTYRCV + ") input").val()) || 0;
            var poc = parseFloat(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + GRD_COMPLETION + ") input").val()) || 0;
            if (qty == 0 && poc == 0) {
                prompt = "There are still line details with qty received equal to zero. <br /> Do you want to continue?";
                break;
            }
        }
    }

    parent_MessageBoxQuestionToolBox(prompt, MenuItemTitle, "", indef, enume);
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
    nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());
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
    GetAddtoListFilters();
    nwParameter_Add("LocAccntForms", $('#idvallugLocForm').val());
    nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());
    nwParameter_Add("idvallugPurchaseOrderNo", $('#idvallugPurchaseOrderNo').val());
    nwParameter_Add("idvallugLocForm", $('#idvallugLocForm').val());
    nwParameter_Add("idvallugDelLocForm", $('#idvallugDelLocForm').val());
    nwParameter_Add("idvallugSubLoc1", $('#idvallugSubLoc1').val());
    nwParameter_Add("idvallugVendor", $("#idvallugVendor").val());
    nwParameter_Add("txtSINo", $("#txtSINo").val());
    nwParameter_Add("dtpSIDate", $("#dtpSIDate").val());
    nwParameter_Add("txtCounterDate", $("#txtCounterDate").val());
    nwParameter_Add("txtDRNo", $("#txtDRNo").val());
    nwParameter_Add("dtpDRDate", $("#dtpDRDate").val());
    nwParameter_Add("txtParticular", $("#txtParticular").val());
    nwParameter_Add("txtDocDate", $("#txtDocDate").val());

    nwParameter_Add("txtDatePosted", $("#txtDatePosted").val());
    nwParameter_Add("tagDocdate", $("#tagDocdate").val());
    nwParameter_Add("nwDocno", nwDocno);
    nwParameter_Add("nwTranNo", nwTranNo);

    //try {
    //    nwParameter_Add_DataSet("nwGridConCustom");
    //} catch (ex)
    try {
        nwParameter_Add_Spread(nwGridCon_Book_Custom);
        nwParameter_Add_Spread(nwGridCon_Book_POBal);
        nwParameter_Add_Spread(nwGridCon_Book_Dtl);
        nwParameter_Add_Spread(nwGridCon_Book_DtlsCon);
        nwParameter_Add_Spread(nwGridCon_Book_RcptsCon);
        nwParameter_Add_Spread(nwGridCon_Book_J);

    } catch (ex) { }
    {
    }
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwParameter_Add("nwTranNo", nwTranNo);
    nwLoading_Start("xBind", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xBindEmpty", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}

function EnableFields() {
    //$("#idvallugPurchaseOrderNo").css({ "background-color": "#FFFFFF" });
    //$("#idvallugPurchaseOrderNo").prop("disabled", false);
    $("#lugPurchaseOrderNo").enable(true);

    $("#txtSINo").prop("disabled", false);
    $("#dtpSIDate").prop("disabled", false);
    $("#txtDRNo").prop("disabled", false);
    $("#dtpDRDate").prop("disabled", false);
    $("#txtParticular").prop("disabled", false);
    $("#txtDocDate").prop("disabled", false);
    //$("#btnReqCompliance").prop("disabled", true);
    //$("#btnViewJournal").prop("disabled", true);
    $("#btnViewApproverDetails").prop("disabled", true);
    $("#btnReqCompliance").prop("disabled", true);
    //$("#btnViewAttachment").prop("disabled", true);

    $("#btnViewJournal").enable(false);
    $("#btnReqCompliance").enable(false);
    $("#btnViewAttachment").enable(true);
    $("#nwGridConCustom").enable(false);

    $('.fldset_1').enable(true);
    $('.hasData').removeClass('btnGreen');

    //$("#btnViewAttachment").removeClass();
    $("#btnReqCompliance").removeClass("btnGreen");
    $("#btnReqCompliance").removeClass("btnOrange");
    $("#btnViewJournal").removeClass("btnGray");



    $("#noah-webui-Toolbox").bindingNew().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-default-Print").enable(false);

    //$('.btn-tb-new').enable(false);
    //$('.btn-tb-save').enable(true);
    //$('.btn-tb-delete').enable(false);
    //$('.btn-tb-inquire').enable(true);
    //$('.btn-tb-export').enable(false);
    //$('.btn-tb-process').enable(false);
    //$('.btn-tb-print').enable(false);
}

function DisableFields() {
    //$("#lugPurchaseOrderNo input").css({ "background-color": "#EEEEEE" });
    //$("#lugPurchaseOrderNo input").prop("disabled", true);
    //$("#lugPurchaseOrderNo button").enable(false);

    $("#lugPurchaseOrderNo").enable(false);
    $("#txtSINo").prop("disabled", true);
    $("#dtpSIDate").prop("disabled", true);
    //$("#txtCounterDate").prop("disabled", true);
    $("#txtDRNo").prop("disabled", true);
    $("#dtpDRDate").prop("disabled", true);
    $("#txtParticular").prop("disabled", true);
    $("#txtDocDate").prop("disabled", true);

    $("#btnViewAttachment").enable(false);
    $("#btnReqCompliance").enable(false);
    $("#btnViewJournal").enable(false);

    $("#nwGridConCustom").enable(false);
    $('.fldset_1').enable(false);

    $("#lugLocForm input").prop("disabled", true);
    $("#lugDelLocForm input").prop("disabled", true);
    $("#lugSubLoc1 input").prop("disabled", true);
    $("#lugCostCenter input").prop("disabled", true);
    $("#lugVendor input").prop("disabled", true);

    //$("#btnViewAttachment").removeClass().addClass("btnMedium");
    //$("#btnReqCompliance").removeClass("btnGreen");
    //$("#btnReqCompliance").removeClass("btnOrange");
    //$("#btnViewJournal").removeClass("btnGray");
    $("#btnAttachWindowSave2").enable(false);
    $("#btnSaveRequestDetails").enable(false);
    $("#nwGridConDeliveryDetails").enable(false);
    $("#nwGridPOBalDtlsCon").enable(false);
    $("#nwGridReqDtlsCon").enable(false);

    //$('.btn-tb-new').enable(true);
    //$('.btn-tb-save').enable(false);
    //$('.btn-tb-delete').enable(false);
    //$('.btn-tb-inquire').enable(true);
    //$('.btn-tb-export').enable(false);
    //$('.btn-tb-process').enable(false);
    //$('.btn-tb-print').enable(false);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-default-Print").enable(false);


    //$("#noah-webui-default-Print").enable(false);

}

function EnableFieldsDone() { //Binding Done
    $("#lugPurchaseOrderNo").enable(false);
    //$("#lugPurchaseOrderNo input").css({ "background-color": "#EEEEEE" });
    //$("#lugPurchaseOrderNo input").prop("disabled", true);
    //$("#lugPurchaseOrderNo button").enable(false);

    $("#txtSINo").prop("disabled", false);
    $("#dtpSIDate").prop("disabled", false);
    $("#txtDRNo").prop("disabled", false);
    $("#dtpDRDate").prop("disabled", false);

    $("#lugReceiver").addClass("adisabled");
    $("#txtParticular").prop("disabled", false);
    $("#txtDocDate").prop("disabled", true);

    $("#btnViewApproverDetails").prop("disabled", false);
    $("#btnViewAttachment").enable(true);
    $("#btnReqCompliance").enable(true);
    $("#btnViewJournal").enable(true);

    $("#nwGridConCustom").enable(true);
    $('.fldset_1').enable(true);

    //$('.btn-tb-new').enable(true);
    //$('.btn-tb-save').enable(true);
    //$('.btn-tb-delete').enable(true);
    //$('.btn-tb-inquire').enable(true);
    //$('.btn-tb-export').enable(true);
    //$('.btn-tb-process').enable(true);
    //$('.btn-tb-print').enable(true);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-default-Print").enable(true);

    if (nwDocno != '') {
        DisableFields();
        $("#btnReqCompliance").prop("disabled", false);
        $("#btnViewApproverDetails").prop("disabled", true);
        $("#btnDocAttach").prop("disabled", false);
        $('#noah-webui-Toolbox').css('display', 'none');
    }

    //$("#btnViewAttachment").removeClass().addClass("btnMedium");
    $("#btnViewJournal").removeClass("btnGray");
    $("#btnViewJournal").addClass("btnGray");
}

function DisableFieldsEmpty() {
    $("#lugPurchaseOrderNo").enable(false);
    //$("#lugPurchaseOrderNo input").css({ "background-color": "#EEEEEE" });
    //$("#lugPurchaseOrderNo input").prop("disabled", true);
    //$("#lugPurchaseOrderNo button").enable(false);

    $("#txtSINo").prop("disabled", true);
    $("#dtpSIDate").prop("disabled", true);
    $("#txtDRNo").prop("disabled", true);
    $("#dtpDRDate").prop("disabled", true);

    $("#lugReceiver").addClass("adisabled");
    $("#txtParticular").prop("disabled", true);
    $("#txtDocDate").prop("disabled", true);
    $("#btnViewApproverDetails").prop("disabled", true);
    $("#btnReqCompliance").prop("disabled", true);
    //$("#btnViewAttachment").removeClass().addClass("btnMedium");
    $("#btnReqCompliance").removeClass("btnGreen");
    $("#btnReqCompliance").removeClass("btnOrange");
    $("#nwGridConCustom").enable(false);


    $("#noah-webui-Toolbox").bindingNew().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    //$("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-default-Print").enable(false);
}

function ClearFields() {
    $("#lugPurchaseOrderNo input").val("");
    $("#lugLocForm input").val("");
    $("#lugDelLocForm input").val("");
    $("#lugSubLoc1 input").val("");
    $("#lugCostCenter input").val("");
    $("#lugVendor input").val("");
    $("#txtItemType").val("");
    $("#txtTotalQty").val("");

    $("#txtSINo").val("");
    $("#dtpSIDate").val("");
    $("#txtCounterDate").val("");
    $("#txtDRNo").val("");
    $("#dtpDRDate").val("");
    $("#txtParticular").val("");
    $("#txtDocDate").val("");

    $("#txtTransactionNo").val("");
    $("#txtValueDate").val("");
    $("#txtStatus").val("");
    $("#txtReasonDisapp").val("");
    $("#txtDisapprovalRemarks").val("");
    $("#txtDisapprovalRemarks").val("");
    $("#txtDisappRemarks").val("");

    $("#content_DelAlloc input").val("");
    $("#content_ReqAlloc input").val("");

    $('.spantext').remove();
}


function RefreshData() {
    DisableFields();
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

function p8Spread_DblClick(canvasID, row, col) {
    if (nwDocno != '') return;

   
    if (canvasID == "nwGridConCustom") {
        if ($('#idvallugPurchaseOrderNo').val() == '') {
            MessageBox("Cannot Proceed. Purchase Order No. is required.", MenuItemTitle);
            return true;
        }
        else {
        if (col == (GRD_LINETYPE - 1)) {
            lookUpCustomize("lugLineType", 1, "", true);
        }
            if (col == (GRD_ITEMCODE - 1)) {
                var PONo = $('#idvallugPurchaseOrderNo').val();
                var LineType = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_LINETYPE - 1), row);
                nwParameter_Add("delLocForm", $('#idvallugLocForm').val());
                nwParameter_Add("Subloc", $('#idvallugSubLoc1').val());
                nwParameter_Add("LineType", LineType);
                nwParameter_Add("PONo", PONo);
                nwParameter_Add("txtTransactionNo", $('#txtTransactionNo').val());
                nwParameter_Add("getConsoItem", getConsoItem("nwGridConCustom"));

                lookUpCustomize("lugItemCode", 2, undefined, true);

            }

            else if (col == (GRD_RCPT_UOM - 1)) {
                nwParameter_Add("delLocForm", $('#idvallugLocForm').val());
                nwParameter_Add("Subloc", $('#idvallugSubLoc1').val());
                nwParameter_Add("idvallugItemCode", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMCODE - 1), row));
                nwParameter_Add("PONo", $("#idvallugPurchaseOrderNo").val());
                nwParameter_Add("PurchaseUOM", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PURCHASE_UOM_CODE - 1), row));
                lookUpCustomize("lugPurchaseUOM", 1);

            }
        }

    }
    return true;
}

function GetNum(val) {
    try {
        val = parseFloat((val).replace(/,/g, "")) || 0;
    } catch (ex) { }
    return val;
}


function SetNum(val, decimal) {
    val = GetNum(val);
    decimal = decimal || 0;

    val = nwc(toFixed(val.toFixed(decimal))).substring(0, 33);
    if (decimal != 0) {
        val = val.includes(".") ? val : val + "." + val.repeat(decimal);
    }
    return val;
}

$(document).on("click", ".btnPrevRcpts", function () {
    nwLoading_Start("xLoadPrecRcpts", crLoadingHTML);

    nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());
    nwParameter_Add("idvallugPurchaseOrderNo", $("#idvallugPurchaseOrderNo").val());
    nwParameter_Add("idvallugDelLocForm", $("#idvallugDelLocForm").val());
    nwParameter_Add("idvallugSubLoc1", $("#idvallugSubLoc1").val());
    nwParameter_Add("txtItemCode", getGridData('nwGridCon', '', GRD_ITEMCODE, globalRow));
    nwParameter_Add("pUOM", getGridData('nwGridCon', '', GRD_PURCHASE_UOM_CODE, globalRow));
    nwParameter_Add("rUOM", getGridData('nwGridCon', '', GRD_RCPT_UOM_CODE, globalRow));

    $("#txtItemCode_pr").val(getGridData('nwGridCon', '', GRD_ITEMCODE, globalRow));
    $("#txtItemDesc_pr").val(getGridData('nwGridCon', '', GRD_ITEMDESC, globalRow));
    $("#txtPOQty_pr").val(getGridData('nwGridCon', '', GRD_ORIGPOQTY, globalRow));
    $("#txtPOUOMCode_pr").val(getGridData('nwGridCon', '', GRD_PURCHASE_UOM_CODE, globalRow));
    $("#txtPOUOMDesc_pr").val(getGridData('nwGridCon', '', GRD_PURCHASE_UOM, globalRow));
    $("#txtCurrRcptUOMCode_pr").val(getGridData('nwGridCon', '', GRD_RCPT_UOM_CODE, globalRow));
    $("#txtCurrRcptUOMDesc_pr").val(getGridData('nwGridCon', '', GRD_RCPT_UOM, globalRow));
    $("#txtTotalQtyRcvd_pr").val($("#txtTotalQty").val()); //crnwTR.find("td:eq(" + GRD_POQTY + ") input").val()

    nwPopupForm_ShowModal("nwPrevRcpts");
    func_ActionDriven("actPrevRcpts", false);
});

$(document).on('click', '#btnExportJrnl', function () {
    nwLoading_Start("xbtnExportJrnl", crLoadingHTML);
    nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());
    func_ActionDriven("actExport_Jrnl", false);
});


$(document).on("click", "#btnViewJournal", function () {
    nwLoading_Start("xLoadJournal", crLoadingHTML);
    nwPopupForm_ShowModal("nwJournalDetails");
    nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());

    func_ActionDriven("actGenerateJournal", false);
});

function chkValueDate() {
    let effectiveDate = $("#txtDocDate").val();
    let tag = isEffectiveWithPeriodDates(effectiveDate)

    if (Date.parse(effectiveDate) > Date.parse($('#txtServerdate').val())) {
        MessageBox("Cannot proceed. Value Date should not be later than the current server date.", MenuItemTitle, "error");
        $("#txtDocDate").val('');
    } else if (tag == 0) {
        MessageBox("Cannot proceed. Value Date should be within the set period dates.", MenuItemTitle, 'error');
        $("#txtDocDate").val('');
    }
    else {
        nwParameter_Add("idvallugaccform", $('#idvallugLocForm').val());
        nwParameter_Add("txtvaldate", $('#txtDocDate').val());
        func_ActionDriven("actValDate", false);
    }
    //else if (tag == 2) {
    //    MessageBox("Cannot proceed. Period is already closed.", MenuItemTitle, 'error');
    //    $("#txtDocDate").val('');
    //}
}

function isEffectiveWithPeriodDates(effectiveDate) {
    let dateArr = effectiveDate.split("/");
    //let isEffectiveWithPeriodDates = false;
    let dateTag = 0; //tag 1 do not validate, tag 0, not in period dates, tag 2 period no is closed
    if (jsonPerDates.length <= 0) {
        //isEffectiveWithPeriodDates = true;
        dateTag = 1
    } else {
        let loc = $('#idvallugDelLocForm').val();
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

function chkRefNo() {
    if ($("#txtSINo").val() != "") {
        $('#lblCounterDate').html('Counter Date<span class=\'nwRequiredField\'> *</span>');
        if (nwTranNo == "") $("#txtCounterDate").enable(true);
    }
    else {
        $('#lblCounterDate').html('Counter Date');
        $("#txtCounterDate").enable(false);
    }
}

function forLabel(tag) {
    if (tag == "1") {
        $('#lblRefNo').html('Ref. No. (BS/SI/SOA)<span class=\'nwRequiredField\'> *</span>');
        $('#lblRefDate').html('Ref. Date <span class=\'nwRequiredField\'> *</span>');
        $('#lblDRCOC').html('DR/COC No.<span class=\'nwRequiredField\'> *</span>');
        $('#lblDRCOCDate').html('DR/COC Date <span class=\'nwRequiredField\'> *</span>');
    }
    else if (tag == "2") {
        $('#lblRefNo').html('Ref. No. (BS/SI/SOA)<span class=\'kulayBlue\'> *</span>');
        $('#lblRefDate').html('Ref. Date <span class=\'kulayBlue\'> *</span>');
        $('#lblDRCOC').html('DR/COC No.<span class=\'kulayBlue\'> *</span>');
        $('#lblDRCOCDate').html('DR/COC Date <span class=\'kulayBlue\'> *</span>');
    }
    else if (tag == "3") {
        $('#lblDRCOC').html('DR/COC No.<span class=\'nwRequiredField\'> *</span>');
        $('#lblDRCOCDate').html('DR/COC Date <span class=\'nwRequiredField\'> *</span>');
    }
    else if (tag == "4") {
        $('#lblRefNo').html('Ref. No. (BS/SI/SOA)<span class=\'nwRequiredField\'> *</span>');
        $('#lblRefDate').html('Ref. Date <span class=\'nwRequiredField\'> *</span>');
    }
}

function disableExpDate() {
    //crnwTable = $("#nwGridConDeliveryID .tblGridBody tbody");
    //var globalRow = nwGridCon_Book_Custom.ActiveSheet.GetMaxRow();
    var length = nwGridCon_Book_Dtl.ActiveSheet.GetMaxRow();
    //var sumQtyRcvd = 0, sumPrevQtyRcvd = 0;
    //let qtyRcvd = parseFloat($("#txtQtyRcvd_DA").val()) || 0.00;
    //let poc = parseFloat($("#txtQtyRcvd_DA").val()) || 0.00;
    //var forCurQtyRcvd;
    //let qtyRcvd = parseFloat($("#txtQtyRcvd_DA").val()) || 0.00;
    //let poc = parseFloat($("#txtQtyRcvd_DA").val()) || 0.00;
    var sumQtyRcvd = 0, sumPrevQtyRcvd = 0;
    let qtyRcvd = GetNum($("#txtQtyRcvd_DA").val()) || 0.00;
    let poc = GetNum($("#txtQtyRcvd_DA").val()) || 0.00;

    for (var row = 0; row < length; row++) {
        //for (var i = 0; i < length; i++) {
        var isWithExpiry = nwGridCon_Book_Dtl.ActiveSheet.GetValue((GRD_DA_WithExpiry - 1), row);
        var isWithBatch = nwGridCon_Book_Dtl.ActiveSheet.GetValue((GRD_DA_WithBatchNo - 1), row);
        //var isWithExpiry = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + GRD_DA_WithExpiry + ")").text();
        //var isWithBatch = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + GRD_DA_WithBatchNo + ")").text();

        if (isWithExpiry == "True")
                {
        //if (isWithExpiry.toString().toLowerCase() == "true" || isWithExpiry.toString().toLowerCase() == "1") {
            nwGridCon_Book_Dtl.ActiveSheet.SetEnable((GRD_DA_ExpiryDate - 1), row, true);
            nwGridCon_Book_Dtl.ActiveSheet.SetBackground((GRD_DA_ExpiryDate - 1), row, "white");
            }
            else
            {
            //nwGridCon_Book_Dtl.ActiveSheet.SetEnable((GRD_DA_manufactureDate - 1), row, true);
            //nwGridCon_Book_Dtl.ActiveSheet.SetBackground((GRD_DA_manufactureDate - 1), row, "white");

            nwGridCon_Book_Dtl.ActiveSheet.SetEnable((GRD_DA_ExpiryDate - 1), row, false);
            nwGridCon_Book_Dtl.ActiveSheet.SetBackground((GRD_DA_ExpiryDate - 1), row, "gainsboro");

        }
        if (isWithBatch == "True")
        {

            nwGridCon_Book_Dtl.ActiveSheet.SetEnable((GRD_DA_BatchNo - 1), row, true);
            nwGridCon_Book_Dtl.ActiveSheet.SetBackground((GRD_DA_BatchNo - 1), row, "white");
        }
        else
        {

            nwGridCon_Book_Dtl.ActiveSheet.SetEnable((GRD_DA_BatchNo - 1), row, false);
            nwGridCon_Book_Dtl.ActiveSheet.SetBackground((GRD_DA_BatchNo - 1), row, "gainsboro");
        }
            for (var cnt = 0; cnt <= row; cnt++) {
            
                sumQtyRcvd += parseFloat(nwGridCon_Book_Dtl.ActiveSheet.GetValue((GRD_DA_QtyToBeRcvd - 1), cnt)) || 0.00;
            }

            if (row > 0)             
                sumPrevQtyRcvd += GetNum(nwGridCon_Book_Dtl.ActiveSheet.GetValue((GRD_DA_QtyToBeRcvd - 1), row - 1)) || 0.00;

            deci = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), globalRow));//.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

            nwGridCon_Book_Dtl.ActiveSheet.SetText((GRD_DA_QtyRcvd - 1), row, GetNum(sumPrevQtyRcvd).toFixed(poc > 0 ? 5 : deci));
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + GRD_DA_QtyRcvd + ")").text(parseFloat(sumPrevQtyRcvd).toFixed(poc > 0 ? 5 : nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), globalRow).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

            //deci = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), globalRow);//.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        
            var curQty = GetNum(nwGridCon_Book_Dtl.ActiveSheet.GetValue((GRD_DA_QtyToBeRcvd - 1), row)) || 0.00;//parseFloat(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + GRD_DA_QtyToBeRcvd + ") input").val().replace(/,/g, '')) || 0.00;
            var poQty = GetNum(nwGridCon_Book_Dtl.ActiveSheet.GetValue((GRD_DA_POQTY - 1), row)) || 0.00;//(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + GRD_DA_POQTY + ")").text().replace(/,/g, '')) || 0.00;
            var prevQtyRcvd = GetNum(nwGridCon_Book_Dtl.ActiveSheet.GetValue((GRD_DA_QtyRcvd - 1), row))//parseFloat(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + GRD_DA_QtyRcvd + ")").text().replace(/,/g, '')) || 0.00;
            var forPOQtyBal = GetNum(poQty) - GetNum(prevQtyRcvd) - GetNum(curQty);
            
       
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + GRD_DA_CurQtyRcvd + ")").text(crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + GRD_DA_QtyToBeRcvd + ") input").val());
            //crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + GRD_DA_POQtyBal + ")").text(parseFloat(forPOQtyBal).toFixed(poc > 0 ? 5 : getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            nwGridCon_Book_Dtl.ActiveSheet.SetText((GRD_DA_CurQtyRcvd - 1), row, curQty);
            nwGridCon_Book_Dtl.ActiveSheet.SetText((GRD_DA_POQtyBal - 1), row, GetNum(forPOQtyBal).toFixed(poc > 0 ? 5 : deci));//(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1)), globalRow).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')));
    }
    }


function defaultOnRqstDtls() {
   var QtyRcvd = GetNum($("#txtQtyRcvd_rd").val())
    POC = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_COMPLETION - 1), globalRow)),
    deci = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), globalRow)),
        currForPR = 0,
        currQtyRcvd = QtyRcvd;

    for (var i = 0; i < nwGridCon_Book_DtlsCon.ActiveSheet.GetMaxRow() ; i++) {
        if (currQtyRcvd <= 0)
            return;

        currForPR = GetNum(nwGridCon_Book_DtlsCon.ActiveSheet.GetValue((GRD_RD_FORPR - 1), i))

            if ((GetNum(currQtyRcvd) - GetNum(currForPR)) >= 0)
                nwGridCon_Book_DtlsCon.ActiveSheet.SetText((GRD_RD_QTYTOBEALLOC - 1), i, currForPR.toFixed(POC > 0 ? 5 : deci))
            else
                nwGridCon_Book_DtlsCon.ActiveSheet.SetText((GRD_RD_QTYTOBEALLOC - 1), i, Math.abs(currQtyRcvd).toFixed(POC > 0 ? 5 : deci))

            currQtyRcvd -= currForPR;

            //currForPR = parseFloat($(v).find(`td:eq(${GRD_RD_FORPR})`).text().replace(/,/g, '')) || 0;

            //if ((parseFloat(currQtyRcvd) - parseFloat(currForPR)) >= 0)
            //    $(v).find(`td:eq(${GRD_RD_QTYTOBEALLOC}) input`).val(currForPR.toFixed(POC > 0 ? 5 : getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)));
            //else
            //    $(v).find(`td:eq(${GRD_RD_QTYTOBEALLOC}) input`).val(Math.abs(currQtyRcvd).toFixed(POC > 0 ? 5 : getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)));

            //currQtyRcvd -= currForPR;
            //});
        }
        //computeTotalRqstDtls();
    }



function computeTotalRqstDtls() {
    var QtyRcvd = GetNum($("#txtQtyRcvd_rd").val())
    POC = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_COMPLETION - 1), globalRow)),
        AllocQty = 0,
        UnallocQty = 0;


    for (var i = 0; i < nwGridCon_Book_DtlsCon.ActiveSheet.GetMaxRow() ; i++) {
        AllocQty += GetNum(nwGridCon_Book_DtlsCon.ActiveSheet.GetValue((GRD_RD_QTYTOBEALLOC - 1), i))
    }
    if (parseFloat(AllocQty) == 0) {
        defaultOnRqstDtls();
    }


    $("#txtAllocQty_rd").val(AllocQty.toFixed(POC > 0 ? 5 : POC).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    $("#txtUnallocQty_rd").val((QtyRcvd - AllocQty).toFixed(POC > 0 ? 5 : POC).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    //$("#txtAllocQty_rd").val(parseFloat(AllocQty).toFixed(POC > 0 ? 5 : getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    //$("#txtUnallocQty_rd").val((parseFloat(QtyRcvd) - parseFloat(AllocQty)).toFixed(POC > 0 ? 5 : getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
}
















//function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
//    if (nwDocno != '') return;

//    var nwobjID = nwobj.attr('id');
//    var col = crnwTD.index();
//    var lineType = '';

//    if (nwobjID == "nwGridCon") {
//        if ($('#idvallugPurchaseOrderNo').val() == '') {
//            MessageBox("Cannot Proceed. Purchase Order No. is required.", MenuItemTitle);
//            return true;
//        }
//        else {
//            if (col == GRD_ITEMCODE) {
//                dblClickAddToList = GRD_ITEMCODE;
//                var PONo = $('#idvallugPurchaseOrderNo').val();
//                var lineType = $('.nwLineType:eq(' + crnwTR.index() + ') option:selected').val();
//                nwParameter_Add("delLocForm", $('#idvallugDelLocForm').val());
//                nwParameter_Add("Subloc", $('#idvallugSubLoc1').val());
//                nwParameter_Add("LineType", lineType);
//                nwParameter_Add("PONo", PONo);
//                nwParameter_Add("txtTransactionNo", $('#txtTransactionNo').val());
//                nwParameter_Add("getConsoItem", getConsoItem("nwGridCon"));

//                lookUpCustomize("lugItemCode", 2);
//            }
//            else if (col == GRD_RCPT_UOM) {
//                nwParameter_Add("delLocForm", $('#idvallugDelLocForm').val());
//                nwParameter_Add("Subloc", $('#idvallugSubLoc1').val());
//                nwParameter_Add("idvallugItemCode", getGridData('nwGridCon', '', GRD_ITEMCODE, crnwTR.index()));
//                nwParameter_Add("PONo", $("#idvallugPurchaseOrderNo").val());
//                nwParameter_Add("PurchaseUOM", getGridData('nwGridCon', '', GRD_PURCHASE_UOM_CODE, crnwTR.index()));

//                lookUpCustomize("lugPurchaseUOM", 1);
//            }
//        }
//    }
//}

function getConsoItem(gridName) {
    var result = "";
    var count = nwGridCon_Book_Custom.ActiveSheet.GetMaxRow();

    for (var i = 0; i < count; i++) {
        var itemcode = nwGridCon_Book_Custom.ActiveSheet.GetValue(GRD_ITEMCODE, i);
        if (itemcode != "")
            result += nwGridCon_Book_Custom.ActiveSheet.GetValue(GRD_ITEMCODE, i);
    }

    return result;
}




//function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
//    if (nwGridID == "nwGridConCustom") {
//        var col = nwGridCon_Book_Custom.ActiveSheet.CellSelected.col - 1;
//        var row = nwGridCon_Book_Custom.ActiveSheet.CellSelected.row - 1;

//        if (col == SPR_CODE - 1) {

//            var mainCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
//            var mainDesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

//            //crnwTRtemp[SPR_CODE - 1] = mainCode;
//            //crnwTRtemp[SPR_DESCRIPTION - 1] = mainDesc;

//        }
//    }

//    return crnwTRtemp;
//}



function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var curr_nwGrid = nwGridID;
    var isValid = false;
    var cnt = nwLib.nwTempTable_Row_Count(curr_nwGrid);
    var code;

    var col = nwGridCon_Book_Custom.ActiveSheet.CellSelected.col - 1;

    //if (curr_nwGrid == 'nwGridConCustom') {
    //    if (crnwTD.index() == GRD_ITEMCODE) {
    //        code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text() + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
    //        isExist = nwLib.nwTempTable_Column_ValueExist(curr_nwGrid, GRD_LINEID, code, false, "text", 0);
    //    }
    if (curr_nwGrid == 'nwGridConCustom') {
        if (col == GRD_ITEMCODE - 1) {
            code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text() + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
            isExist = nwLib.nwTempTable_Column_ValueExist(curr_nwGrid, GRD_LINEID, code, false, "text", 0);
        }
        //}
        //if (curr_nwGrid == 'nwGridCon') {
        //    if (crnwTD.index() == GRD_ITEMCODE)
        //    {
        //        code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text() + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
        //        isExist = nwLib.nwTempTable_Column_ValueExist(curr_nwGrid, GRD_LINEID, code, false, "text", 0);
        //    }
        //else if (crnwTD.index() == GRD_PONO)
        //{
        //    code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text() + addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text() + addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();
        //    isExist = nwLib.nwTempTable_Column_ValueExist(curr_nwGrid, GRD_LINEID, code, false, "text", 0);
        //}
    }

    //if (curr_nwGrid == 'nwGridCon') {

    //    if (isExist == false) {
    //        if (crnwTD.index() == GRD_ITEMCODE)
    //        {
    //            var ItemCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    //            var ItemDesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
    //            var PurchaseUOMCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
    //            var PurchaseUOMDesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();
    //            var RcptUOMCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
    //            var RcptUOMDesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();
    //            var PONo = addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text();
    //            var PODate = addtoListTableRec.find('tr:eq(' + index + ') td:eq(6)').text();
    //            var QtyRecv = (parseFloat(addtoListTableRec.find('tr:eq(' + index + ') td:eq(8)').text().replace(/,/g, "")) || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    //            var Completion = (parseFloat(addtoListTableRec.find('tr:eq(' + index + ') td:eq(9)').text().replace(/,/g, "")) || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    //            var POQty = (parseFloat(addtoListTableRec.find('tr:eq(' + index + ') td:eq(10)').text().replace(/,/g, "")) || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    //            var PrevRcpt = (parseFloat(addtoListTableRec.find('tr:eq(' + index + ') td:eq(11)').text().replace(/,/g, "")) || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    //            var POBal = (parseFloat(addtoListTableRec.find('tr:eq(' + index + ') td:eq(12)').text().replace(/,/g, "")) || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    //            var RemCompletion = (parseFloat(addtoListTableRec.find('tr:eq(' + index + ') td:eq(13)').text().replace(/,/g, "")) || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    //            var LineType = addtoListTableRec.find('tr:eq(' + index + ') td:eq(14)').text();
    //            var ProJPO = addtoListTableRec.find('tr:eq(' + index + ') td:eq(7)').text();
    //            var overrunRate = addtoListTableRec.find('tr:eq(' + index + ') td:eq(15)').text();
    //            var specs = addtoListTableRec.find('tr:eq(' + index + ') td:eq(16)').text();
    //            var isReqWithExpiryDate = addtoListTableRec.find('tr:eq(' + index + ') td:eq(17)').text();
    //            var isReqWithBatchNo = addtoListTableRec.find('tr:eq(' + index + ') td:eq(18)').text();
    //            var inventoriable = addtoListTableRec.find('tr:eq(' + index + ') td:eq(19)').text();
    //            var hasPrevRcpts = addtoListTableRec.find('tr:eq(' + index + ') td:eq(21)').text();
    //            var deci = addtoListTableRec.find('tr:eq(' + index + ') td:eq(22)').text();
    //        }
    if (curr_nwGrid == 'nwGridConCustom') {

        if (isExist == false) {
            if (col == GRD_ITEMCODE - 1) {
            //if (crnwTD.index() == GRD_ITEMCODE) {
                var ItemCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
                var ItemDesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
                var PurchaseUOMCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
                var PurchaseUOMDesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();
                var RcptUOMCode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
                var RcptUOMDesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(4)').text();
                var PONo = addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text();
                var PODate = addtoListTableRec.find('tr:eq(' + index + ') td:eq(6)').text();
                var QtyRecv = (parseFloat(addtoListTableRec.find('tr:eq(' + index + ') td:eq(8)').text().replace(/,/g, "")) || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                var Completion = (parseFloat(addtoListTableRec.find('tr:eq(' + index + ') td:eq(9)').text().replace(/,/g, "")) || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                var POQty = (parseFloat(addtoListTableRec.find('tr:eq(' + index + ') td:eq(10)').text().replace(/,/g, "")) || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                var PrevRcpt = (parseFloat(addtoListTableRec.find('tr:eq(' + index + ') td:eq(11)').text().replace(/,/g, "")) || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                var POBal = (parseFloat(addtoListTableRec.find('tr:eq(' + index + ') td:eq(12)').text().replace(/,/g, "")) || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                var RemCompletion = (parseFloat(addtoListTableRec.find('tr:eq(' + index + ') td:eq(13)').text().replace(/,/g, "")) || 0).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                var LineType = addtoListTableRec.find('tr:eq(' + index + ') td:eq(14)').text();
                var ProJPO = addtoListTableRec.find('tr:eq(' + index + ') td:eq(7)').text();
                var overrunRate = addtoListTableRec.find('tr:eq(' + index + ') td:eq(15)').text();
                var specs = addtoListTableRec.find('tr:eq(' + index + ') td:eq(16)').text();
                var isReqWithExpiryDate = addtoListTableRec.find('tr:eq(' + index + ') td:eq(17)').text();
                var isReqWithBatchNo = addtoListTableRec.find('tr:eq(' + index + ') td:eq(18)').text();
                var inventoriable = addtoListTableRec.find('tr:eq(' + index + ') td:eq(19)').text();
                var hasPrevRcpts = addtoListTableRec.find('tr:eq(' + index + ') td:eq(21)').text();
                var deci = addtoListTableRec.find('tr:eq(' + index + ') td:eq(22)').text();
                var polineid = addtoListTableRec.find('tr:eq(' + index + ') td:eq(23)').text();
 
                crnwTRtemp[GRD_POLINEID - 1] = polineid;
                crnwTRtemp[GRD_ITEMCODE - 1] = ItemCode;
                crnwTRtemp[GRD_ITEMDESC - 1] = ItemDesc;
                crnwTRtemp[GRD_PURCHASE_UOM_CODE - 1] = PurchaseUOMCode;
                crnwTRtemp[GRD_PURCHASE_UOM - 1] = PurchaseUOMDesc;
                crnwTRtemp[GRD_RCPT_UOM_CODE - 1] = RcptUOMCode;
                crnwTRtemp[GRD_RCPT_UOM - 1] = RcptUOMDesc;
                crnwTRtemp[GRD_ORIGPOQTY - 1] = POQty;
                crnwTRtemp[GRD_POQTY - 1] = POQty;
                crnwTRtemp[GRD_PREVRCT - 1] = PrevRcpt;
                crnwTRtemp[GRD_POBAL - 1] = POBal;
                crnwTRtemp[GRD_LINETYPE - 1] = LineType;
                crnwTRtemp[GRD_OverrunRate - 1] = overrunRate;
                crnwTRtemp[GRD_PARTICULARS - 1] = specs;
                crnwTRtemp[GRD_INVENTORIABLE - 1] = inventoriable;
                crnwTRtemp[GRD_NOOFDECIMALS - 1] = deci;
                //crnwTRtemp[GRD_AMOUNT - 1] = amt;
                crnwTRtemp[GRD_WEXPIRYDATE - 1] = isReqWithExpiryDate;
                crnwTRtemp[GRD_WBATCHNO - 1] = isReqWithBatchNo;
                crnwTRtemp[GRD_LINEID - 1] = (PONo + ItemCode + PurchaseUOMCode);

                //var LineID1 = getLineID();
                //updateLineID();
                //crnwTRtemp[GRD_LINEID1 - 1] = LineID1;
            }
            






            //crnwTRtemp.find(`td:eq(${GRD_QTYRCV})`).html("<input value='" + QtyRecv + "' maxlength='30' class='isNumber numC numQTYRCV' nwdp='" + deci + "' nwformula=''>");

            //crnwTRtemp.find('td:eq(' + GRD_ITEMCODE + ')').text(ItemCode);
            //crnwTRtemp.find('td:eq(' + GRD_ITEMDESC + ')').text(ItemDesc);
            ////if (LineType == "2") {
            //    crnwTRtemp.find('td:eq(' + GRD_PURCHASE_UOM_CODE + ')').text(PurchaseUOMCode);
            //    crnwTRtemp.find('td:eq(' + GRD_PURCHASE_UOM + ')').text(PurchaseUOMDesc);
            ////}
            //crnwTRtemp.find('td:eq(' + GRD_RCPT_UOM_CODE + ')').text(RcptUOMCode);
            //crnwTRtemp.find('td:eq(' + GRD_RCPT_UOM + ')').text(RcptUOMDesc);

            ////crnwTRtemp.find('td:eq(' + GRD_QTYRCV + ') input').val(POBal);
            ////crnwTRtemp.find('td:eq(' + GRD_COMPLETION + ') input').val(Completion);
            //crnwTRtemp.find('td:eq(' + GRD_ORIGPOQTY + ')').text(POQty);
            //crnwTRtemp.find('td:eq(' + GRD_POQTY + ') input').val(POQty);
            //crnwTRtemp.find('td:eq(' + GRD_PREVRCT + ') input').val(PrevRcpt);
            //crnwTRtemp.find('td:eq(' + GRD_POBAL + ') input').val(POBal);

            ////crnwTRtemp.find('td:eq(' + GRD_LINETYPE + ') :nth-child(' + LineType + ')').prop('selected', true);
            //crnwTRtemp.find('td:eq(' + GRD_LINETYPE + ') option[value=' + LineType + ']').prop('selected', true);
            //crnwTRtemp.find('td:eq(' + GRD_LINETYPE + ') select').enable(true);
            //crnwTRtemp.find('td:eq(' + GRD_OverrunRate + ')').text(overrunRate);
            //crnwTRtemp.find('td:eq(' + GRD_PARTICULARS + ')').find('textarea').text(specs);
            //crnwTRtemp.find('td:eq(' + GRD_INVENTORIABLE + ')').text(inventoriable);
            //crnwTRtemp.find('td:eq(' + GRD_NOOFDECIMALS + ')').text(deci);

            //if (specs != "")
            //    crnwTRtemp.find(`td:eq(${GRD_PARTICULARS}) button`).addClass("btnGreen");
            //else
            //    crnwTRtemp.find(`td:eq(${GRD_PARTICULARS}) button`).removeClass("btnGreen");

            //crnwTRtemp.find('td:eq(' + GRD_WEXPIRYDATE + ')').text(isReqWithExpiryDate);
            //crnwTRtemp.find('td:eq(' + GRD_WBATCHNO + ')').text(isReqWithBatchNo);
            //crnwTRtemp.find('td:eq(' + GRD_LINEID + ')').text(PONo + ItemCode + PurchaseUOMCode);

            //if (PrevRcpt.replaceAll(',', '') > 0) {
            //    crnwTRtemp.find(`td:eq(${GRD_COMPLETION}) input`).enable(false);
            //    crnwTRtemp.find(`td:eq(${GRD_COMPLETION}) input`).addClass("backgroundgainsboro");
            //    crnwTRtemp.find(`td:eq(${GRD_COMPLETION})`).addClass("backgroundgainsboro");
            //}
            //else {
            //    crnwTRtemp.find(`td:eq(${GRD_COMPLETION}) input`).enable(true);
            //    crnwTRtemp.find(`td:eq(${GRD_COMPLETION}) input`).removeClass("backgroundgainsboro");
            //    crnwTRtemp.find(`td:eq(${GRD_COMPLETION})`).removeClass("backgroundgainsboro");
            //}

            //if (RemCompletion > 0 && RemCompletion < 100) {
            //    crnwTRtemp.find(`td:eq(${GRD_QTYRCV}) input`).enable(false);
            //    crnwTRtemp.find(`td:eq(${GRD_QTYRCV}) input`).addClass("backgroundgainsboro");
            //    crnwTRtemp.find(`td:eq(${GRD_QTYRCV})`).addClass("backgroundgainsboro");
            //}
            //else {
            //    crnwTRtemp.find(`td:eq(${GRD_QTYRCV}) input`).enable(true);
            //    crnwTRtemp.find(`td:eq(${GRD_QTYRCV}) input`).removeClass("backgroundgainsboro");
            //    crnwTRtemp.find(`td:eq(${GRD_QTYRCV})`).removeClass("backgroundgainsboro");
            //}

            //// if inventorialble
            //if (inventoriable == 1) {
            //    crnwTRtemp.find('td:eq(' + GRD_QTYRCV + ') input').enable(true);
            //    crnwTRtemp.find('td:eq(' + GRD_QTYRCV + ')').removeClass("backgroundgainsboro");
            //    crnwTRtemp.find('td:eq(' + GRD_ALLOCATION + ')').enable(true);
            //    crnwTRtemp.find('td:eq(' + GRD_COMPLETION + ') input').enable(false);
            //    crnwTRtemp.find('td:eq(' + GRD_COMPLETION + ')').addClass("backgroundgainsboro");
            //}
            //else if ((inventoriable != 1) && (crnwTRtemp.find('td:eq(' + GRD_PREVRCT + ')').text() > 0)) {
            //    crnwTRtemp.find('td:eq(' + GRD_QTYRCV + ') input').enable(true);
            //    crnwTRtemp.find('td:eq(' + GRD_QTYRCV + ')').removeClass("backgroundgainsboro");
            //    crnwTRtemp.find('td:eq(' + GRD_ALLOCATION + ')').enable(true);
            //    crnwTRtemp.find('td:eq(' + GRD_COMPLETION + ') input').enable(false);
            //    crnwTRtemp.find('td:eq(' + GRD_COMPLETION + ')').addClass("backgroundgainsboro");
            //}
            ////else if ((inventoriable != 1) && (crnwTRtemp.find('td:eq(' + GRD_RemCompletion + ')').text() > 100)) {
            ////    crnwTRtemp.find('td:eq(' + GRD_QTYRCV + ') input').enable(false);
            ////    crnwTRtemp.find('td:eq(' + GRD_QTYRCV + ')').addClass("backgroundgainsboro");
            ////    crnwTRtemp.find('td:eq(' + GRD_ALLOCATION + ')').enable(false);
            ////    crnwTRtemp.find('td:eq(' + GRD_COMPLETION + ') input').enable(true);
            ////    crnwTRtemp.find('td:eq(' + GRD_COMPLETION + ')').removeClass("backgroundgainsboro");
            ////}
            //else {
            //    crnwTRtemp.find('td:eq(' + GRD_QTYRCV + ') input').enable(true);
            //    crnwTRtemp.find('td:eq(' + GRD_QTYRCV + ')').removeClass("backgroundgainsboro");
            //    crnwTRtemp.find('td:eq(' + GRD_ALLOCATION + ')').enable(true);
            //    crnwTRtemp.find('td:eq(' + GRD_COMPLETION + ') input').enable(true);
            //    crnwTRtemp.find('td:eq(' + GRD_COMPLETION + ')').removeClass("backgroundgainsboro");
            //}

            //if ($("#txtItemType").val().includes("Goods")) {
            //    crnwTRtemp.find(`td:eq(${GRD_COMPLETION}) input`).enable(false);
            //    crnwTRtemp.find(`td:eq(${GRD_COMPLETION})`).css('background-color', 'gainsboro');
            //    crnwTRtemp.find(`td:eq(${GRD_COMPLETION})`).addClass("backgroundgainsboro");
            //}

            //if (hasPrevRcpts != '') {
            //    crnwTRtemp.find(`td:eq(${GRD_PREVRCPTS}) button`).addClass("btnGreen");
            //}
            //else {
            //    crnwTRtemp.find(`td:eq(${GRD_PREVRCPTS}) button`).removeClass("btnGreen");
            //}

            //if (cnt == (crnwTR.index() + 1)) {
            //    nwGrid_AddRow(curr_nwGrid, 1);
            //}
        }
        else {
            crnwTRtemp = null;
        }
    }

    return crnwTRtemp;
}

function nwGrid_AddtoListLoaded(verID) {
    // $("#nwGridCon tr td:nth-child(2)").css("background-color", "gainsboro");
}

var
RCPT_UOM_CODE_tmp = '';
RCPT_UOM_tmp = '',
QTYRCV_tmp = 0,
POQTY_tmp = 0,
PREVRCT_tmp = 0,
POBAL_tmp = 0,
NOOFDECIMAL_tmp = 0;
TempLineID = '';

function func_LookUpInitialize(dimP) {
    if (dimP == 'lugPurchaseOrderNo') {
        if ($("#txtChkAllowBackdate").val() == "1" && $("#txtDocDate") == "") {
            setTimeout(function () {
                MessageBox("Cannot proceed. Value Date is required.", MenuItemTitle, "error");
                $("#txtCounterDate").val("");
            }, 500);
        }
    }
    else if (dimP == "lugItemCode") {
        nwParameter_Add("PONo", $("#idvallugPurchaseOrderNo").val());
        nwParameter_Add("idvallugLocForm", $("#idvallugLocForm").val());
        nwParameter_Add("delLocForm", $("#idvallugDelLocForm").val());
        nwParameter_Add("idvallugSubLoc1", $("#idvallugSubLoc1").val());
        nwParameter_Add("LineType", $('.nwLineType:eq(' + crnwTR.index() + ') option:selected').val());
        nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());
        nwParameter_Add("txtValueDate", $("#txtValueDate").val());
        nwParameter_Add("getConsoItem", getConsoItem("nwGridCon"));
    }
}

function Lookup_DoneFunction(idName, idNum) {
    var DelID = '';

    if (idName == 'toolboxInquire') {

    }
    else if (idName == 'lugLineType') {
        var row = nwGridCon_Book_Custom.ActiveSheet.GetSelectedIndexes().row;
        nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_LINETYPE - 1), row, getLookupData(idNum, 0))
        nwGridCon_Book_Custom.ActiveSheet.SetText2((GRD_LINETYPE - 1), row, getLookupData(idNum, 1))
    }
         if (idName == 'lugPurchaseOrderNo') {
        var locCode = getLookupData(idNum, 4);
        var locDesc = getLookupData(idNum, 5);
        var dellocCode = getLookupData(idNum, 6);
        var dellocDesc = getLookupData(idNum, 7);
        var subLocCode = getLookupData(idNum, 8);
        var subLocDesc = getLookupData(idNum, 9);
        var costCenCode = getLookupData(idNum, 10);
        var costCenDesc = getLookupData(idNum, 11);
        var vendorCode = getLookupData(idNum, 12);
        var vendorDesc = getLookupData(idNum, 13);
        var itemType = getLookupData(idNum, 14);
        var remarks = getLookupData(idNum, 15);

        $("#idvallugLocForm").val(locCode);
        $("#descvallugLocForm").val(locDesc);
        $("#idvallugDelLocForm").val(dellocCode);
        $("#descvallugDelLocForm").val(dellocDesc);
        $("#idvallugSubLoc1").val(subLocCode);
        $("#descvallugSubLoc1").val(subLocDesc);
        $("#idvallugCostCenter").val(costCenCode);
        $("#descvallugCostCenter").val(costCenDesc);
        $("#idvallugVendor").val(vendorCode);
        $("#descvallugVendor").val(vendorDesc);
        $("#txtItemType").val(itemType);
        $("#txtParticular").val(remarks);
        $("#txtDocDate").val("");

        $("#btnViewAttachment").enable(true);
        $("#nwGridConCustom").enable(true);

        $("#content_DelAlloc input").val("");
        $("#content_ReqAlloc input").val("");

        nwParameter_Add("idvallugPurchaseOrderNo", getLookupData(idNum, 0));
        nwParameter_Add("idvallugDelLocForm", dellocCode);
        nwParameter_Add("idvallugSubLoc1", subLocCode);
        nwParameter_Add("isInventoriable", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_INVENTORIABLE - 1), _row));
        func_ActionDriven("actGenerateGrid", false);
    }

    else if (idName == 'lugItemCode') {
        var row = nwGridCon_Book_Custom.ActiveSheet.GetSelectedIndexes().row;
        nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_ITEMCODE - 1), row, getLookupData(idNum, 0))
        nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_ITEMDESC - 1), row, getLookupData(idNum, 1))
        nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_RCPT_UOM_CODE - 1), row, getLookupData(idNum, 2))
        nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_RCPT_UOM - 1), row, getLookupData(idNum, 3))
        nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_NUMERIC_DECIMAL_PLACE - 1), row, getLookupData(idNum, 4))
        nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_CURRENCY - 1), row, getLookupData(idNum, 5))
        nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_QUANTITY - 1), row, (0).toFixed(2))
        nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_UNITCOST - 1), row, (0).toFixed(5))
        nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_OCY_AMOUNT - 1), row, (0).toFixed(2))
        nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_OverrunRate - 1), row, getLookupData(idNum, 14))
       
    }

    else if (idName == 'lugPurchaseUOM') {
        var row = nwGridCon_Book_Custom.ActiveSheet.GetSelectedIndexes().row;
        var hasDTL = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_HasDelDtl - 1), row) == "1";
        var PONo = $("#idvallugPurchaseOrderNo").val();
        var ItemCode = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMCODE - 1), row);
        var PurchUOM = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PURCHASE_UOM_CODE - 1), row);
     
        var ItemUOM = PONo + ItemCode + PurchUOM;

        if (nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_RCPT_UOM_CODE - 1), row) != getLookupData(idNum, 0) && hasDTL == true) {
            RCPT_UOM_CODE_tmp = getLookupData(idNum, 0);
            RCPT_UOM_tmp = getLookupData(idNum, 1);
            POQTY_tmp = getLookupData(idNum, 2);
            PREVRCT_tmp = getLookupData(idNum, 3);
            POBAL_tmp = getLookupData(idNum, 5);
            NOOFDECIMAL_tmp = getLookupData(idNum, 6);
            TempLineID = ItemUOM;

            msgBoxContainerQuestion = "isChangePurchsUOM";
            parent_MessageBoxQuestionRBG(`Changing the Purchase UOM will reset the data in the Delivery Allocation. Do you want to proceed?`, MenuItemTitle, "Question");
            _crnwTRTemp = crnwTR;
        }
        else {
            var row = nwGridCon_Book_Custom.ActiveSheet.GetSelectedIndexes().row;
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_RCPT_UOM_CODE - 1), row, getLookupData(idNum, 0));
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_RCPT_UOM - 1), row, getLookupData(idNum, 1));
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_QTYRCV - 1), row, '0.00');
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_COMPLETION - 1), row, '0');
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_POQTY - 1), row, getLookupData(idNum, 2));
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_PREVRCT - 1), row, getLookupData(idNum, 3));
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_POBAL - 1), row, getLookupData(idNum, 5));
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_NOOFDECIMALS - 1), row, getLookupData(idNum, 6));
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_QTYRCV - 1), row, attr("nwdp", getLookupData(idNum, 6)));
       }
    }

    var cnt = $('#nwGridCon-nwData tr').length;
    if (cnt == (crnwTR.index() + 1)) {
        nwGrid_AddRow('nwGridCon', 1);
    }
}

function getLookupData(idnum, index) {
    //var data = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idnum + ")").find("td:eq(" + (index) + ")").text();
    var data = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
}

function setGridData(nwGrid, type, col, row, val) {
    if (type == 'input')
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val(val);
    else
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text(val);
}

function getGridData(nwGrid, type, col, row) {
    var data = '';
    if (type == 'input')
        data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val();
    else
        data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text();
    return data;
}

function setGridDataCSS(nwGrid, type, col, row, prop, propval) {
    if (type == 'input')
        $(`#${nwGrid}-nwData tr:eq(${row}) td:eq(${col}) input`).css(`${prop}`, `${propval}`);
    else
        $(`#${nwGrid}-nwData tr:eq(${row}) td:eq(${col})`).css(`${prop}`, `${propval}`);
}

function DateFormat() {
    $('.custom-datepicker').datepicker();
}

function isnull(value, replaceString) {
    return value == replaceString ? replaceString : value + ' ';
}


function func_WindowCloseTrigger(verID) {
    let isContinue = true;
    cust_GetPara();

    if (verID == "nwPopUpRequireCompliance") {
        nwParameter_Add("Docno", $("#txtTransactionNo").val());
        func_ActionDriven("actChkReqComp", false);
    }

    else if (verID == "nwPopUpRequireComplianceL") {
        nwParameter_Add("Docno", $("#txtTransactionNo").val());
        func_ActionDriven("actGenerateGridReqComp", false);
    }

    return isContinue;
}


$(document).on("change", "#dtpSIDate", function (e) {
    $("#txtCounterDate").val($(this).val());
    //$("#txtDocDate").val($(this).val());
});

$(document).on("change", "#dtpDRDate", function (e) {
    $("#txtDocDate").val($(this).val());
});

$(document).on("change", "#txtCounterDate", function (e) {
    var today = new Date();
    var currDay = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    if (Date.parse(currDay) < Date.parse($(this).val())) {
        setTimeout(function () {
            MessageBox("Cannot proceed. Counter Date should not be later than the current server date.", MenuItemTitle, "error");
            $("#txtCounterDate").val("");
        }, 500);
    }
});

$(document).on('change', '.txtExpiryDate ', function () {
    var valuedate = $('#txtValueDate').val();
    var expDate = $(this).val();

    if (Date.parse(expDate) < Date.parse(valuedate)) {
        MessageBox("Expiry Date should not be earlier than Receipt Date.", MenuItemTitle);
        $(this).val('');
    }
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

function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext genLuCss" nwcode="' + xvalue + '">' + xdisplay + '<span class="classx">x</span></div>';
};

function GetAddtoListFilters() {
    var len = $('div.atlContainer').length;
    for (var i = 0; i < len; i++) {
        var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
        var xvalue = "";
        var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
        for (var j = 0; j < lencode; j++) {
            if (xvalue != "") xvalue += ",";
            xvalue += $('.atlContainer:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');
        }
        nwParameter_Add(xkey, xvalue);
    }
};

$(document).on("click", ".btnGetlookup", function () {
    crnwTableCon = null; // if grid is click 

    var xtype = $(this).attr("nwtype");
    var selectedInput = xtype;
    lookUpCustomize(selectedInput, 2);

});

function setGridProperties() {
    try {

        var cnt = nwGridCon_Book_Custom.ActiveSheet.GetMaxRow();
        for (var row = 0; row < cnt; row++) {
            var itemcode = nwGridCon_Book_Custom.ActiveSheet.GetText(GRD_ITEMCODE - 1, row);
            var particulars = nwGridCon_Book_Custom.ActiveSheet.GetValue(GRD_PARTICULARS - 1, row).replace("...", "").replace("anwNewXLineX", "");
            var lineType = nwGridCon_Book_Custom.ActiveSheet.GetValue(GRD_LINETYPE - 1, row);
            var rcpt = nwGridCon_Book_Custom.ActiveSheet.GetValue(GRD_QTYRCV - 1, row);
            var poc = nwGridCon_Book_Custom.ActiveSheet.GetText(GRD_COMPLETION - 1, row);
            var PrevRcpt = parseFloat(nwGridCon_Book_Custom.ActiveSheet.GetValue(GRD_PREVRCT - 1, row)) || 0;
            var PrevPOC = parseFloat(nwGridCon_Book_Custom.ActiveSheet.GetText(GRD_PREVPOC - 1, row).replace(/,/g, "")) || 0;
            var HasDelDTL = nwGridCon_Book_Custom.ActiveSheet.GetText(GRD_HasDelDtl - 1, row);
            var inventoriable = nwGridCon_Book_Custom.ActiveSheet.GetText(GRD_INVENTORIABLE - 1, row);
            var HasReqDtls = nwGridCon_Book_Custom.ActiveSheet.GetText(GRD_HASREQDTLS - 1, row);
            var HasReqComp = nwGridCon_Book_Custom.ActiveSheet.GetText(GRD_HASREQCOMP - 1, row);
            var HasPrevRcpts = nwGridCon_Book_Custom.ActiveSheet.GetText(GRD_HASPREVRCPTS - 1, row);
            var deci = parseInt(nwGridCon_Book_Custom.ActiveSheet.GetText(GRD_NOOFDECIMALS - 1, row).replace(/,/g, "")) || 0;
            try { }
            catch (ex) { }
            nwGridCon_Book_Custom.ActiveSheet.SetTextColor(GRD_PARTICULARS - 1, row, "white");

            if (particulars != '') {
                nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_PARTICULARS - 1, row, "green");
                nwGridCon_Book_Custom.ActiveSheet.SetTextColor(GRD_PARTICULARS - 1, row, "white");
            }
            else {
                nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_PARTICULARS - 1, row, "white");
            }

            if (PrevRcpt > 0 && PrevRcpt % 1 == 0) {

                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_COMPLETION - 1, row, false);
                nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_COMPLETION - 1, row, "gainsboro");

            }

            if (PrevPOC > 0) {
                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_QTYRCV - 1, row, false);
                nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_QTYRCV - 1, row, "gainsboro");
            }

            if (HasDelDTL != '') {
                nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_ALLOCATION - 1, row, "green");
            }
            else {
                nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_ALLOCATION - 1, row, "white");
            }

            if (HasReqDtls != '') {
                nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_REQDTLS - 1, row, "green");
            }
            else {
                nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_REQDTLS - 1, row, "white");
            }

            if (HasPrevRcpts != '') {
                nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_PREVRCPTS - 1, row, "green");
            }
            else {
                nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_PREVRCPTS - 1, row, "white");
            }

            if (itemcode != '') {
                if (HasReqComp == '1' || HasReqComp == 'true') {
                    nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_REQCOMPLIANCE - 1, row, "green");
                }
                else if ($("#txtTransactionNo").val() != "") {
                    nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_REQCOMPLIANCE - 1, row, "orange");
                }
                else {
                    nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_REQCOMPLIANCE - 1, row, false);
                }
            }

            if (rcpt > 0 && !isNewRow) {
                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_COMPLETION - 1, row, false);
                nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_COMPLETION - 1, row, "gainsboro");
            }

            if (poc > 0 && !isNewRow) {
                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_QTYRCV - 1, row, false);
                nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_QTYRCV - 1, row, "gainsboro");
            }

            if ($("#txtItemType").val().includes("Goods")) {
                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_COMPLETION - 1, row, false);
                nwGridCon_Book_Custom.ActiveSheet.SetBackground(GRD_COMPLETION - 1, row, "gainsboro");
            }

            if ($("#idvallugPurchaseOrderNo").val() == "") {
                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_QTYRCV - 1, row, false);
                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_COMPLETION - 1, row, false);
                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_REQCOMPLIANCE - 1, row, false);
                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_ALLOCATION - 1, row, false);
                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_REQDTLS - 1, row, false);
                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_PREVRCPTS - 1, row, false);
                $(".nwgbtnRemarks").enable(false);
            }

            if (nwTranNo != "") {
                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_QTYRCV - 1, row, false);
                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_COMPLETION - 1, row, false);
            }

            if (itemcode != "")
                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_LINETYPE - 1, row, false);
            else
                nwGridCon_Book_Custom.ActiveSheet.SetEnable(GRD_LINETYPE - 1, row, true);
        }
    } catch (ex) { }
}

function setGridPropertiesJrnl() {
    var cnt = nwGridCon_Book_J.ActiveSheet.GetMaxRow();
    for (var row = 0; row < cnt; row++) {
        var ocy = nwGridCon_Book_J.ActiveSheet.GetValue((GRD_JRNL_OCYAMT - 1), row);
        if (ocy.includes("-")) {
            nwGridCon_Book_J.ActiveSheet.SetValue((GRD_JRNL_OCYAMT - 1), row, "(" + ocy.replace("-", "") + ")");
        }
    }
}
//    var cnt = nwLib.nwTempTable_Row_Count("nwGridJournal");
//    crnwTable = $("#nwGridJournal .tblGridBody");

//    for (var row = 0; row <= cnt; row++) {
//        var ocy = $(`#nwGridJournal-nwData tr:eq(${row})`).find(`td:eq(${GRD_JRNL_OCYAMT})`).text();

//        if (ocy.includes("-"))
//            $(`#nwGridJournal-nwData tr:eq(${row})`).find(`td:eq(${GRD_JRNL_OCYAMT})`).text("(" + ocy.replace("-", "") + ")");
//    }
//}

/******** CLICK EVENTS ********/

//$(document).on("click", "#nwGridConCustom .nwgrid_Insert", function () {

//    $(`.nwLineType:eq(${(crnwTR.index() - 1)}) :nth-child(${FreeGoodsIndex})`).prop('selected', true);
//    crnwTR.find("tr:eq(" + (crnwTR.index() - 1) + ") td:eq(" + GRD_PONO + ")").addClass("backgroundgainsboro");

//    crnwTable = $("#nwGridConCustom .tblGridBody");
//    crnwTable.find("tr:eq(" + (crnwTR.index() - 1) + ") td:eq(" + GRD_PONO + ")").addClass("backgroundgainsboro");

//    return false;
//});

$(document).on('click', '#btnViewAttachment', function () {
    var podocno = $('#idvallugPurchaseOrderNo').val();
    var docno = $('#txtTransactionNo').val();

    var fullength = "DCViewAttachment?nwDocno=" + podocno + "&nwCurrDocno=" + docno + "";

    if (nwDocno != "")
        fullength = "DCViewAttachment?isView=true&nwDocno=" + podocno + "&nwCurrDocno=" + docno + "";

    nwLoading_Start('xLoadPop', crLoadingHTML);
    nwPopupForm_Create("nwPopUpViewAttachment", true, fullength);
    $('#nwPopUpViewAttachment .BoxTitle').text("Review Attachment(s)");
    $("#nwPopUpViewAttachment").css({ "min-width": "98%" });
    $("#nwPopUpViewAttachment").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpViewAttachment");
    nwLoading_End('xLoadPop');
});

$(document).on('click', '#btnReqCompliance', function () {
    var trantype = "RCTVEN";
    var docno = $('#txtTransactionNo').val();
    var applyto = $('#idvallugPurchaseOrderNo').val();

    var fullength = "DCREQUIREMENTCOMPLIANCE?TransactionNo=" + docno + "&nwApplyTo=" + applyto + "&TranType=" + trantype + "";

    if (nwDocno != "")
        fullength = "DCREQUIREMENTCOMPLIANCE?isView=true&TransactionNo=" + docno + "&TranType=" + trantype + "";

    nwLoading_Start('xLoadPop', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
    $('#nwPopUpRequireCompliance .modal-hdr-title').text("Requirements Compliance");
    nwPopupForm_ShowModal("nwPopUpRequireCompliance");
    nwLoading_End('xLoadPop');
});

$(document).on('click', '.ReqCompliance', function () {
    var trantype = "RCTVEN";
    var docno = $('#txtTransactionNo').val();
    var applyto = $('#idvallugRefReqStockNo').val();
    var lineID = crnwTR.index() + 1; //getGridData('nwGridConCustom', '', GRD_LINEID, crnwTR.index());
    var itemGrpType = crnwTR.find("td:eq(" + GRD_ITEMGROUPTYPE + ")").text();//getGridData('nwGridConCustom', '', GRD_ITEMGROUPTYPE, crnwTR.index());

    var fullength = "DCREQUIREMENTCOMPLIANCE?TransactionNo=" + docno + "&nwApplyTo=" + applyto + "&TranType=" + trantype + "&nwItemG=" + itemGrpType + "&nwLineID=" + lineID + "&nwRownum=" + lineID + "";

    if (nwDocno != "")
        fullength = "DCREQUIREMENTCOMPLIANCE?isView=true&TransactionNo=" + docno + "&TranType=" + trantype + "&nwItemG=" + itemGrpType + "&nwLineID=" + lineID + "&nwRownum=" + lineID + "";

    nwLoading_Start('xLoadPop', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRequireComplianceL", true, fullength);
    $('#nwPopUpRequireComplianceL .modal-hdr-title').text("Requirements Compliance");
    nwPopupForm_ShowModal("nwPopUpRequireComplianceL");
    nwLoading_End('xLoadPop');
});

//function loadPOBalanceDetails() {
//    nwLib.nwTempTable_RowData_Set('nwGridPOBalDtls', 0, GRD_BD_POQTY, '')(getGridData('nwGridCon', '', GRD_ORIGPOQTY, globalRow));
//    nwLib.nwTempTable_RowData_Set('nwGridPOBalDtls', 0, GRD_BD_PURCHASEUOM, '')(getGridData('nwGridCon', '', GRD_PURCHASE_UOM, globalRow));
//    nwLib.nwTempTable_RowData_Set('nwGridPOBalDtls', 0, GRD_BD_POQTYRU, '')(getGridData('nwGridCon', 'input', GRD_POQTY, globalRow));
//    nwLib.nwTempTable_RowData_Set('nwGridPOBalDtls', 0, GRD_BD_PREVRCPTS, '')(getGridData('nwGridCon', 'input', GRD_PREVRCT, globalRow));
//    nwLib.nwTempTable_RowData_Set('nwGridPOBalDtls', 0, GRD_BD_PREVPOC, '')(getGridData('nwGridCon', '', GRD_PREVPOC, globalRow));
//    nwLib.nwTempTable_RowData_Set('nwGridPOBalDtls', 0, GRD_BD_POBAL, '')(getGridData('nwGridCon', 'input', GRD_POBAL, globalRow));

//    if (getGridData('nwGridCon', '', GRD_HASPREVRCPTS, globalRow) == "1")
//        $(`#nwGridPOBalDtls-nwData tr:eq(${globalRow})`).find(`td:eq(${GRD_BD_PREVIOUSRECEIPTS}) button`).addClass("btnGreen");
//    else 
//        $(`#nwGridPOBalDtls-nwData tr:eq(${globalRow})`).find(`td:eq(${GRD_BD_PREVIOUSRECEIPTS}) button`).removeClass("btnGreen");
//}

function loadPOBalanceDetails() {
    var poqty = parseFloat(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_POQTY - 1), globalRow)) || 0;
    var prevrct = parseFloat(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PREVRCT - 1), globalRow)) || 0;
    var qtyrcv = parseFloat(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_QTYRCV - 1), globalRow)) || 0;
    var origpoqty = parseFloat(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ORIGPOQTY - 1), globalRow)) || 0;
    var purchase_uom = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PURCHASE_UOM - 1), globalRow);
    var prevpoc = parseFloat(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PREVPOC - 1), globalRow)) || 0;
    var Bal = (poqty - prevrct - qtyrcv)
    // var Bal = (parseFloat(getGridData('nwGridCon', 'input', GRD_POQTY, globalRow).replaceAll(",", "") || 0) - parseFloat(getGridData('nwGridCon', 'input', GRD_PREVRCT, globalRow).replaceAll(",", "") || 0) - parseFloat(getGridData('nwGridCon', 'input', GRD_QTYRCV, globalRow).replaceAll(",", "") || 0)).toFixed(2)	
    //nwGridCon_Book_POBal.ActiveSheet.SetText(SPR_envTypeCode - 1, nwcurRow, code, true);
    nwGridCon_Book_POBal.ActiveSheet.SetText((GRD_BD_POQTY - 1), 0, origpoqty, true);
    nwGridCon_Book_POBal.ActiveSheet.SetText((GRD_BD_PURCHASEUOM - 1), 0, purchase_uom, true);
    nwGridCon_Book_POBal.ActiveSheet.SetText((GRD_BD_POQTYRU - 1), 0, poqty, true);
    nwGridCon_Book_POBal.ActiveSheet.SetText((GRD_BD_PREVRCPTS - 1), 0, prevrct, true);
    nwGridCon_Book_POBal.ActiveSheet.SetText((GRD_BD_PREVPOC - 1), 0, prevpoc, true);
    nwGridCon_Book_POBal.ActiveSheet.SetText((GRD_BD_POBAL - 1), 0, Bal, true);
    nwGridCon_Book_POBal.ActiveSheet.SetText((GRD_BD_CurQtyRcvd - 1), 0, qtyrcv, true);

    POBalance = Bal;
    if (nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_HASPREVRCPTS - 1), globalRow) == "1")
        nwGridCon_Book_POBal.ActiveSheet.SetBackground((GRD_BD_PREVIOUSRECEIPTS - 1), globalRow, "green");
    else
        nwGridCon_Book_POBal.ActiveSheet.SetBackground((GRD_BD_PREVIOUSRECEIPTS - 1), globalRow, "white");
}

$(document).on("click", ".nwgrid_Insert", function () {
    return false;
});



function ris_reloaddeliverydetails_requestdelivery(col, row) {
  
    $("#nwGridPOBalDtlsCon").enable(true);
    $("#btnAttachWindowSave2").enable(true);
    $("#btnSaveRequestDetails").enable(true);
    $("#nwGridConDeliveryDetails").enable(true);
    $("#nwGridReqDtlsCon").enable(true);

    //Start Delivery Allocation
    globalQtyRcv = 0;
    globalPOC = 0;
    globalOverrun = 0;
    globalLineType = 0;


    var LineID = 0;
    try {

        LineID = parseInt(getNumReplace(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_LINEID - 1), row)));
    } catch (ex) { }
    $('#txtRefLineID').val(LineID1);


    var Item = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMDESC - 1), row);
    var ItemCode = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMCODE - 1), row);
    var PONo = $("#idvallugPurchaseOrderNo").val();
    var QtyRcv = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_QTYRCV - 1), row))
    var POC = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_COMPLETION - 1), row))
    var poQty = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_POQTY - 1), row))
    var PurcUOM = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PURCHASE_UOM_CODE - 1), row);
    var ReceiptUOM = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_RCPT_UOM_CODE - 1), row);
    var DELDELETED = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_HasDelDtl - 1), row);

    globalQtyRcv = QtyRcv;
    globalPOC = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_COMPLETION - 1), row));
    globalLineType = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_LINETYPE - 1), row);//$('.nwLineType:eq(' + row + ') option:selected').val();
    globalRow = nwGridCon_Book_Custom.ActiveSheet.GetSelectedIndexes().row;

    if (!$("#txtItemType").val().includes("Goods")) {
        if (POC > 0)
            QtyRcv = parseFloat(parseFloat(poQty) * (parseFloat(POC) / 100)).toFixed(5);
    }
    $('#idvallugItem').val(ItemCode);
    $('#descvallugItem').val(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMDESC - 1), row));
    $('#txtQtyRcvd_DA').val(parseFloat(QtyRcv).toFixed(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), row)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    $('#txtPOC_DA').val(POC);

    var Rownum = row + 1;
    $('#txtRownum').val(Rownum);

    var LineID1 = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_LINEID - 1), row);
    var POLineID = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_POLINEID - 1), row);

    $('#txtLineID1').val(LineID1);
    $('#txtPOLineID').val(POLineID);

    $('#txtPurchaseUOM').val(PurcUOM);
    $('#txtReceiptUOM').val(ReceiptUOM);
    GetAddtoListFilters();
    nwParameter_Add("Docno", $("#txtTransactionNo").val());
    nwParameter_Add("loc", $("#idvallugLocForm").val());
    nwParameter_Add("delLoc", $("#idvallugDelLocForm").val());
    nwParameter_Add("subloc", $("#idvallugSubLoc1").val());
    nwParameter_Add("txtRownum", $("#txtRownum").val());
    nwParameter_Add("txtLineID1", $('#txtLineID1').val());
    nwParameter_Add("txtPOLineID", $('#txtPOLineID').val());
    nwParameter_Add("idvallugItem", ItemCode);
    nwParameter_Add("DELDELETED", DELDELETED);
    nwParameter_Add("txtPONo", PONo);
    nwParameter_Add("txtPurchaseUOM", PurcUOM);
    nwParameter_Add("txtReceiptUOM", ReceiptUOM);
    nwParameter_Add("globalLineType", globalLineType);
    nwParameter_Add("noofDecimal", POC > 0 ? 5 : nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), row));
    nwParameter_Add("withExpiry", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_WEXPIRYDATE - 1), row));
    nwParameter_Add("withBatch", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_WBATCHNO - 1), row));
    nwParameter_Add("hasDelDtls", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_HasDelDtl - 1), row));
    nwParameter_Add("QtyRcv", QtyRcv);
    nwParameter_Add("txtRefLineID", $("#txtRefLineID").val());
    nwParameter_Add("particulars", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PARTICULARS - 1), row));

    func_ActionDriven("actDeliveryDetails", false);
    //End Delivery Allocation

    //Start REQUEST ALLOCATION
    var Rownum = nwGridCon_Book_Custom.ActiveSheet.GetSelectedIndexes().row + 1;
    globalQtyRcv = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_QTYRCV - 1), row);
    globalPOC = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_COMPLETION - 1), row);
    poQty = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_POQTY - 1), row));
    globalIsInv = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_INVENTORIABLE - 1), row);
    globalRow = nwGridCon_Book_Custom.ActiveSheet.GetSelectedIndexes().row;;
    $('#txtRownum').val(Rownum);

    nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());
    nwParameter_Add("idvallugPurchaseOrderNo", $("#idvallugPurchaseOrderNo").val());
    nwParameter_Add("idvallugLocForm", $("#idvallugLocForm").val());
    nwParameter_Add("idvallugDelLocForm", $("#idvallugDelLocForm").val());
    nwParameter_Add("idvallugSubLoc1", $("#idvallugSubLoc1").val());
    nwParameter_Add("txtItemCode", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMCODE - 1), row));
    nwParameter_Add("pUOM", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PURCHASE_UOM_CODE - 1), row));
    nwParameter_Add("rUOM", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_RCPT_UOM_CODE - 1), row));
    nwParameter_Add("isInventoriable", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_INVENTORIABLE - 1), row));
    nwParameter_Add("noofDecimal", globalPOC > 0 ? 5 : nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), row));
    nwParameter_Add("globalLineType", globalLineType);
    nwParameter_Add("hasReqDtls", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_HASREQDTLS - 1), row));

    var qty = parseFloat(globalQtyRcv.replace(/,/g, '')) || 0;
    if (globalPOC > 0)
        qty = parseFloat(parseFloat(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_POQTY - 1), row).replace(/,/g, '')) * (parseFloat(globalPOC) / 100)).toFixed(5);

    $("#idvallugItem_rd").val(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMCODE - 1), row));
    $("#descvallugItem_rd").val(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMDESC - 1), row));
    $("#txtQtyRcvd_rd").val(parseFloat(qty).toFixed(globalPOC > 0 ? 5 : nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), row)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));

    func_ActionDriven("actRequestDetails", false);
    //End REQUEST ALLOCATION

    loadPOBalanceDetails();
}

$(document).on("click", ".DetailsButton", function () {
    //var lineType = $('.nwLineType:eq(' + crnwTR.index() + ') option:selected').val();
    //if (lineType != 1)
    //    return;
    nwLoading_Start("xDeliveryDtlsLoading", crLoadingHTML);
    globalQtyRcv = 0;
    globalPOC = 0;
    globalOverrun = 0;
    globalLineType = 0;

    var Row = nwGridCon_Book_Custom.ActiveSheet.CellIndexes.Row;

    //var Item = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEM - 1), Row);
    var ItemCode = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMCODE - 1), Row)
    var PONo = $("#idvallugPurchaseOrderNo").val();
    var QtyRcv = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_QTYRCV - 1), Row) || 0;
    var POC = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_COMPLETION - 1), Row) || 0;
    var poQty = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_POQTY - 1), Row) || 0;
    var PurcUOM = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PURCHASE_UOM_CODE - 1), Row);
    var ReceiptUOM = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_RCPT_UOM_CODE - 1), Row);
    var DELDELETED = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_HasDelDtl - 1), Row);

    globalQtyRcv = QtyRcv;
    globalPOC = POC.replace(/,/g, "") || 0;
    globalOverrun = parseFloat(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_OverrunRate - 1), Row).replace(/,/g, "")) || 0;
    globalLineType = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_LINETYPE - 1), Row)
    globalRow = Row;
    //var ItemCode = getGridData('nwGridCon', '', GRD_ITEMCODE, crnwTR.index());
    //var PONo = $("#idvallugPurchaseOrderNo").val();
    //var QtyRcv = getGridData('nwGridCon', 'input', GRD_QTYRCV, crnwTR.index()).replace(/,/g, "") || 0;
    //var POC = getGridData('nwGridCon', 'input', GRD_COMPLETION, crnwTR.index()).replace(/,/g, "") || 0;
    //var poQty = getGridData('nwGridCon', 'input', GRD_POQTY, crnwTR.index()).replace(/,/g, "") || 0;
    //var PurcUOM = getGridData('nwGridCon', '', GRD_PURCHASE_UOM_CODE, crnwTR.index());
    //var ReceiptUOM = getGridData('nwGridCon', '', GRD_RCPT_UOM_CODE, crnwTR.index());
    //var DELDELETED = getGridData('nwGridCon', '', GRD_HasDelDtl, crnwTR.index());

    ////var PrevQty = parseFloat($(`#nwGridCon-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${GRD_PREVRCT}) input`).val().replace(/,/g, "")) || 0;

    //globalQtyRcv = QtyRcv;
    //globalPOC = getGridData('nwGridCon', 'input', GRD_COMPLETION, crnwTR.index()).replace(/,/g, "") || 0;
    //globalOverrun = parseFloat($(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_OverrunRate})`).text().replace(/,/g, "")) || 0;
    //globalLineType = $('.nwLineType:eq(' + crnwTR.index() + ') option:selected').val();
    //globalRow = crnwTR.index();

    //var DELDELETED = getGridData('nwGridCon', '', GRD_HasDelDtl, crnwTR.index());

    if (POC > 0)
        QtyRcv = parseFloat(parseFloat(poQty) * (parseFloat(POC) / 100)).toFixed(2);

    $('#idvallugItem').val(ItemCode);
    $('#descvallugItem').val(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMDESC - 1), Row));
    $('#txtQtyRcvd_DA').val(parseFloat(QtyRcv).toFixed(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), Row)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    $('#txtPOC_DA').val(parseFloat(POC).toFixed(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), Row)));
    //$('#idvallugItem').val(ItemCode);
    //$('#descvallugItem').val(getGridData('nwGridCon', '', GRD_ITEMDESC, crnwTR.index()));
    //$('#txtQtyRcvd_DA').val(parseFloat(QtyRcv).toFixed(getGridData('nwGridCon', '', GRD_NOOFDECIMALS, crnwTR.index())).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    //$('#txtPOC_DA').val(parseFloat(POC).toFixed(getGridData('nwGridCon', '', GRD_NOOFDECIMALS, crnwTR.index())));

    var Rownum = crnwTR.index() + 1;
    $('#txtRownum').val(Rownum);

    var LineID1 = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_LINEID - 1), Row);
    var POLineID = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_POLINEID - 1), Row);

    $('#txtLineID1').val(LineID1);
    $('#txtPOLineID').val(POLineID);

    $('#txtPurchaseUOM').val(PurcUOM);
    $('#txtReceiptUOM').val(ReceiptUOM);
    GetAddtoListFilters();
    nwParameter_Add("Docno", $("#txtTransactionNo").val());
    nwParameter_Add("loc", $("#idvallugLocForm").val());
    nwParameter_Add("delLoc", $("#idvallugDelLocForm").val());
    nwParameter_Add("subloc", $("#idvallugSubLoc1").val());
    nwParameter_Add("txtRownum", $("#txtRownum").val());
    nwParameter_Add("txtLineID1", $('#txtLineID1').val());
    nwParameter_Add("txtPOLineID", $('#txtPOLineID').val());
    nwParameter_Add("idvallugItem", ItemCode);
    nwParameter_Add("DELDELETED", DELDELETED);
    nwParameter_Add("txtPONo", PONo);
    nwParameter_Add("txtPurchaseUOM", PurcUOM);
    nwParameter_Add("txtReceiptUOM", ReceiptUOM);
    nwParameter_Add("globalLineType", globalLineType);
    nwParameter_Add("noofDecimal", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), Row));
    nwParameter_Add("withExpiry", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_WEXPIRYDATE - 1), Row));
    nwParameter_Add("withBatch", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_WBATCHNO - 1), Row));

    //nwParameter_Add("noofDecimal", getGridData('nwGridCon', '', GRD_NOOFDECIMALS, crnwTR.index()));
    //nwParameter_Add("withExpiry", getGridData('nwGridCon', '', GRD_WEXPIRYDATE, crnwTR.index()));
    //nwParameter_Add("withBatch", getGridData('nwGridCon', '', GRD_WBATCHNO, crnwTR.index()));

    nwPopupForm_ShowModal("nwDeliveryDetailsWindow");
    func_ActionDriven("actDeliveryDetails", false);
});

$(document).on("click", '#btnnwgRemarks', function (e) {
    //var gridIDCon = crnwTable.attr('id');

    //if ($(`#${gridIDCon} tr:eq(${crnwTR.index()}) td:eq(${GRD_PARTICULARS}) textarea`).val() != '') {
    //    $(`#${gridIDCon} tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_PARTICULARS}) button`).addClass("btnGreen");
    //}
    //else {
    //    $(`#${gridIDCon} tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_PARTICULARS}) button`).removeClass("btnGreen");
    //}
    var Row = nwGridCon_Book_Custom.ActiveSheet.CellIndexes.Row;
    if (nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PARTICULARS - 1), Row) != '') {
        nwGridCon_Book_Custom.ActiveSheet.SetBackground((GRD_PARTICULARS - 1), Row, "green")
    }
    else {
        nwGridCon_Book_Custom.ActiveSheet.SetBackground((GRD_PARTICULARS - 1), Row, "orange")
    }

    return true;
});

var tdTemp;
var trTemp;
var temval;

function ResetGrid() {
    var maxrow = nwGridCon_Book_Custom.ActiveSheet.GetMaxRow()
    for (var row = (maxrow - 1) ; row >= 0; row--) {
        nwGridCon_Book_Custom.ActiveSheet.RowDelete(row)
    }
    nwGridCon_Book_Custom.ActiveSheet.RowAdd()
}
//    nwGrid_ClearRange('nwGridCon', 1, 0, $("#nwGridCon th").size() - 1, $("#nwGridCon .tblGridBody tr").size());
//    nwGrid_RemoveRow("nwGridCon", 0, $("#nwGridCon .tblGridBody tr").size());
//    nwGrid_AddRow("nwGridCon", 1);
//}

function msgBoxContainerQuestionF(genID, answer) {
    if (genID == "resetGrid") {
        if (answer == "Yes") {
            ResetGrid();
        }
    }

    else if (genID == "isProcessDeliveryDetails") {
        if (answer == "Yes") {
            nwParameter_Add("Docno", $('#txtTransactionNo').val());
            nwParameter_Add("txtRownum", $('#txtRownum').val());
            nwParameter_Add("txtLineID1", $('#txtLineID1').val());
            nwParameter_Add("txtPOLineID", $('#txtPOLineID').val());

            nwParameter_Add("idvallugItem", $('#idvallugItem').val());
            nwParameter_Add("txtPONo", $('#idvallugPurchaseOrderNo').val());
            nwParameter_Add("txtTotalQtyRcvd", $('#txtTotalQtyRcvd').val());
            nwParameter_Add("txtPurchaseUOM", $('#txtPurchaseUOM').val());
            nwParameter_Add("txtReceiptUOM", $('#txtReceiptUOM').val());

            try {
                //nwParameter_Add_Spread(nwGridCon_Book_DtlsCon);
                nwParameter_Add_Spread(nwGridCon_Book_Dtl);
            } catch (ex) {

            }
            //nwParameter_Add_Table('nwGridConDeliveryDetails');

            func_ActionDriven('actSaveDeliveryDetails', false);
        }
    }

    else if (genID == "isChangeNum") {
        if (answer == "Yes") {
            var row = _row;
            var col = _col;
            nwGridCon_Book_Custom.ActiveSheet.SetBackground((GRD_ALLOCATION - 1), row, "gainsboro")
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_HasDelDtl - 1), row, "DELETED")
            nwGridCon_Book_Custom.ActiveSheet.SetBackground((GRD_REQDTLS - 1), row, "gainsboro")
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_HASREQDTLS - 1), row, "")
            //$(`#nwGridCon-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${GRD_ALLOCATION}) button`).removeClass("btnGreen");
            //$(`#nwGridCon-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${GRD_HasDelDtl})`).text("DELETED");
            //$(`#nwGridCon-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${GRD_REQDTLS}) button`).removeClass("btnGreen");
            //$(`#nwGridCon-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${GRD_HASREQDTLS})`).text("");

            nwParameter_Add("txtDocno", $("#txtTransactionNo").val());
            nwParameter_Add("txtPONo_ccd", $("#idvallugPurchaseOrderNo").val());
            nwParameter_Add("txtItemCode_ccd", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMCODE - 1), row));
            nwParameter_Add("txtPurchaseUOM_ccd", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PURCHASE_UOM_CODE - 1), row));
            //nwParameter_Add("txtItemCode_ccd", _crnwTRTemp.find("td:eq(" + GRD_ITEMCODE + ")").text());
            //nwParameter_Add("txtPurchaseUOM_ccd", _crnwTRTemp.find("td:eq(" + GRD_PURCHASE_UOM_CODE + ")").text());

            //func_ActionDriven('actDeleteDelDetails', false); //BABALIKAN

            if (tdTemp.index() == GRD_QTYRCV)
                validateQtyReceived();
        }
        else {
            var row = _row;
            var col = _col;
            if (col == (GRD_QTYRCV - 1)) {
                nwGridCon_Book_Custom.ActiveSheet.SetValue(col, row, numValues.toFixed(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), row)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))
            } else if (col == (GRD_COMPLETION - 1)) {
                nwGridCon_Book_Custom.ActiveSheet.SetValue(col, row, numValuesperc.toFixed(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), row)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'))

            }
        }

        //    setGridData('nwGridCon', 'input', tdTemp.index(), trTemp.index(), temval.toFixed(getGridData('nwGridCon', '', GRD_NOOFDECIMALS, trTemp.index())).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
        //}

        $(`#nwGridCon-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${GRD_ITEMDESC})`).click();
        txtTotalQty();
    }

    else if (genID == "isChangePurchsUOM") {
        if (answer == "Yes") {
            var Row = nwGridCon_Book_Custom.ActiveSheet.CellIndexes.Row;
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_RCPT_UOM_CODE - 1), Row, RCPT_UOM_CODE_tmp)
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_RCPT_UOM - 1), Row, RCPT_UOM_tmp)
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_QTYRCV - 1), Row, '0.00')
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_COMPLETION - 1), Row, '0')
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_POQTY - 1), Row, POQTY_tmp)
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_PREVRCT - 1), Row, PREVRCT_tmp)
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_POBAL - 1), Row, POBAL_tmp)
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_NOOFDECIMALS - 1), Row, NOOFDECIMAL_tmp)
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_LINEID - 1), Row, TempLineID)
            //setGridData('nwGridCon', '', GRD_RCPT_UOM_CODE, _crnwTRTemp.index(), RCPT_UOM_CODE_tmp);
            //setGridData('nwGridCon', '', GRD_RCPT_UOM, _crnwTRTemp.index(), RCPT_UOM_tmp);
            //setGridData('nwGridCon', 'input', GRD_QTYRCV, crnwTR.index(), '');
            //setGridData('nwGridCon', 'input', GRD_POQTY, crnwTR.index(), POQTY_tmp);
            //setGridData('nwGridCon', 'input', GRD_PREVRCT, crnwTR.index(), PREVRCT_tmp);
            //setGridData('nwGridCon', 'input', GRD_POBAL, crnwTR.index(), POBAL_tmp);
            //setGridData('nwGridCon', '', GRD_NOOFDECIMALS, crnwTR.index(), NOOFDECIMAL_tmp);
            //setGridData('nwGridCon', '', GRD_LINEID, _crnwTRTemp.index(), TempLineID);

            //$(`#nwGridCon-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${GRD_QTYRCV}) input`).attr("nwdp", NOOFDECIMAL_tmp);
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_QTYRCV - 1), Row, "nwdp", NOOFDECIMAL_tmp)
            nwGridCon_Book_Custom.ActiveSheet.SetBackground((GRD_ALLOCATION - 1), Row, "gainsboro")
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_HasDelDtl - 1), Row, "DELETED")
            //$(`#nwGridCon-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${GRD_ALLOCATION}) button`).removeClass("btnGreen");
            //$(`#nwGridCon-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${GRD_HasDelDtl})`).text("DELETED");
        }
    }

    else if (genID == "SaveRequestDetails") {
        if (answer == "Yes") {
            nwLoading_Start("xSaveRequestDetailsLoading", crLoadingHTML);
            var Row = nwGridCon_Book_Custom.ActiveSheet.CellIndexes.Row;

            nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());
            nwParameter_Add("txtRownum", $("#txtRownum").val());
            nwParameter_Add("txtLineID1", $('#txtLineID1').val());
            nwParameter_Add("txtPOLineID", $('#txtPOLineID').val());
            nwParameter_Add("txtItemCode_rd", $("#txtItemCode_rd").val());
            nwParameter_Add("uom", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PURCHASE_UOM_CODE - 1), Row));
            nwParameter_Add("jsonGrid", JSON.stringify(getRequestDtlsData("nwGridReqDtls")));
            nwParameter_Add_Spread("nwGridReqDtlsCon");
            func_ActionDriven("actSaveRequestDetails", false);
            }
        }

        if (DtlsPromptName == "PromptDeleteRow") {
            if (answer == "Yes") {
                nwLoading_Start("xDeleteRowMainLoad", crLoadingHTML);
                var Row = nwGridCon_Book_Custom.ActiveSheet.CellIndexes.Row;

                $("#dimMessageBox").css("display", 'none');
                nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());
                nwParameter_Add("txtPONo", $("#idvallugPurchaseOrderNo").val());
                nwParameter_Add("txtItemCode", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMCODE - 1), Row));
                nwParameter_Add("txtPurchaseUOM", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PURCHASE_UOM_CODE - 1), Row));
                //nwParameter_Add("txtItemCode", $(`#nwGridCon-nwData tr:eq(${indexdeleterow})`).find(`td:eq(${GRD_ITEMCODE})`).text());
                //nwParameter_Add("txtPurchaseUOM", $(`#nwGridCon-nwData tr:eq(${indexdeleterow})`).find(`td:eq(${GRD_PURCHASE_UOM_CODE})`).text());
                func_ActionDriven("actDeleteRowMain", false);

            }
            else if (answer == "No") {
                $("#dimbgNW").removeClass("openn");
                $("#dimMessageBox").css("display", 'none');
            }
        }
    }


function setDelDtlProperties(row) {
    nwGridCon_Book_Custom.ActiveSheet.SetBackground((GRD_ALLOCATION - 1), row, "green")
    nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_HasDelDtl - 1), row, "1")
    //$(`#nwGridCon-nwData tr:eq(${row})`).find(`td:eq(${GRD_ALLOCATION}) button`).addClass("btnGreen");
    //$(`#nwGridCon-nwData tr:eq(${row})`).find(`td:eq(${GRD_HasDelDtl})`).text("1");
}

$(document).on("change", "#txtSINo", function (e) {
    chkRefNo();
});



var _crnwTRTemp;
var _crnwTDTemp;

var numValues = 0;
var numValuesperc = 0;
var _row = 0;
var _col = 0;
function p8Spread_Focus(canvasID, row, col) {
    if (canvasID == "nwGridConCustom") {
        if (col == (GRD_QTYRCV - 1)) {
            numValues = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue(col, row))
        }
        //else if (col == (GRD_COMPLETION - 1)) {
        //    numValuesperc = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue(col, row))
        //}
    }
}
//$(document).on("focus", ".numQTYRCV, .numCOMPLETION", function (e) {
//    numValues = parseFloat($(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${crnwTD.index()}) input`).val().replace(/,/g, "")) || 0;
//    _crnwTRTemp = crnwTR;
//    _crnwTDTemp = crnwTD;
//});

//$(document).on("focus", ".numDAQtyToBeRcvd", function (e) {
//    //numValues = parseFloat($(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${crnwTD.index()}) input`).val().replace(/,/g, "")) || 0;
//    _crnwTRTemp = crnwTR;
//    _crnwTDTemp = crnwTD;
//});

//$(document).on("focus", ".txtPrcntg, .txtCCTotalAmt", function (e) {
//    _crnwTRTemp = crnwTR;
//    _crnwTDTemp = crnwTD;
//});

//$(document).on("focus", ".txtRDQtyToBeAlloc", function (e) {
//    _crnwTRTemp = crnwTR;
//    _crnwTDTemp = crnwTD;
//});

//$(document).on("focusout", ".numQTYRCV, .numCOMPLETION", function (e) {
//    var code = e.which;
//    trTemp = _crnwTRTemp;
//    tdTemp = _crnwTDTemp;
//    var hasDTL = getGridData('nwGridCon', '', GRD_HasDelDtl, crnwTR.index()) == "1";
//    var hasReqDtls = getGridData('nwGridCon', '', GRD_HASREQDTLS, crnwTR.index()) == "1";
//    if ((e.type == "keydown" && code == "13") || e.type == "focusout") {
//        if (hasDTL || hasReqDtls) {
//            if (numValues != parseFloat($(`#nwGridCon-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${_crnwTDTemp.index()}) input`).val().replace(/,/g, "")) || 0) {
//                trTemp = _crnwTRTemp;
//                tdTemp = _crnwTDTemp;
//                temval = numValues;

//                var msgCol = "";

//                msgCol = tdTemp.index() == GRD_QTYRCV ? "Qty Received" : "% of Completion";
//                msgBoxContainerQuestion = "isChangeNum";
//                parent_MessageBoxQuestionRBG(`Changing the ${msgCol} will reset the data in the Delivery Allocation and/or Request Allocation. Do you want to proceed?`, MenuItemTitle, "Question");
//                $('#Message_Cancel').hide();
//            }
//        }
//    }
//    if (!hasDTL && tdTemp.index() == GRD_QTYRCV)
//        validateQtyReceived();

//    txtTotalQty();
//});


//function validateQtyReceived() {
//    var QtyRcv = parseFloat($(`#nwGridCon-nwData tr:eq(${trTemp.index()})`).find(`td:eq(${tdTemp.index()}) input`).val().replace(/,/g, "")) || 0;
//    var POBAl = parseFloat($(`#nwGridCon-nwData tr:eq(${trTemp.index()})`).find(`td:eq(${GRD_POBAL}) input`).val().replace(/,/g, "")) || 0;
//    var POOrigQty = parseFloat($(`#nwGridCon-nwData tr:eq(${trTemp.index()})`).find(`td:eq(${GRD_POQTY}) input`).val().replace(/,/g, "")) || 0;
//    var lineType = $('.nwLineType:eq(' + trTemp.index() + ') option:selected').val();
//    var BasisForOverRun = parseFloat($(`#nwGridCon-nwData tr:eq(${trTemp.index()})`).find(`td:eq(${GRD_OverrunRate})`).text().replace(/,/g, "")) || 0;
//    var PrevQty = parseFloat($(`#nwGridCon-nwData tr:eq(${trTemp.index()})`).find(`td:eq(${GRD_PREVRCT}) input`).val().replace(/,/g, "")) || 0;
//    var deci = parseInt($(`#nwGridCon-nwData tr:eq(${trTemp.index()})`).find(`td:eq(${GRD_NOOFDECIMALS})`).text().replace(/,/g, "")) || 0;
function validateQtyReceived(index) {
    var Row = nwGridCon_Book_Custom.ActiveSheet.CellIndexes.Row;

    var QtyRcv = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_QTYRCV - 1), Row));
    var POBAl = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_POBAL - 1), Row));
    var POOrigQty = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_POQTY - 1), Row));
    var lineType = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_LINETYPE - 1), Row));
    var BasisForOverRun = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_OverrunRate - 1), Row));
    var PrevQty = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PREVRCT - 1), Row));
    var completion = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_COMPLETION - 1), Row));
    var deci = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), Row));

    if (lineType == 1) {
        if (QtyRcv > ((POOrigQty + (POOrigQty * (BasisForOverRun / 100))) - PrevQty)) {
            setTimeout(function () {
                MessageBox("Cannot proceed. Quantity received exceeds PO balance.", MenuItemTitle, "error");
            }, 100);
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_QTYRCV - 1), Row, (0).toFixed(deci))
            //$(`#nwGridCon-nwData tr:eq(${trTemp.index()})`).find(`td:eq(${tdTemp.index()}) input`).val((0).toFixed(deci));
            return true;
        }
    }

    if (QtyRcv > 0) {
        nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_COMPLETION - 1), Row, (completion).toFixed(5))
        //$(`#nwGridCon-nwData tr:eq(${trTemp.index()})`).find(`td:eq(${GRD_COMPLETION}) input`).val((0).toFixed(5));
    }
}

function txtTotalQty() {
    var QtyRcvd = 0;

    var cnt = nwGridCon_Book_Custom.ActiveSheet.GetMaxRow();
    for (var row = 0; row < cnt; row++) {
        QtyRcvd += GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_QTYRCV - 1), row).replace(/,/g, '')) || 0;
    }
    //var $row;
    //$.each($("#nwGridCon-nwData tr"), function (k, v) {
    //    $row = $(v);

    //    QtyRcvd += parseFloat($row.find(`td:eq(${GRD_QTYRCV}) input`).val().replace(/,/g, '')) || 0;
    //});

    $("#txtTotalQty").val(GetNum(QtyRcvd).toFixed(5).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
}

function txtTotalQtyRcvd() {
    var QtyRcvd = 0;

    var cnt = nwGridCon_Book_RcptsCon.ActiveSheet.GetMaxRow();
    for (var row = 0; row < cnt; row++) {
        QtyRcvd += GetNum(nwGridCon_Book_RcptsCon.ActiveSheet.GetValue((GRD_PR_QTYRCVD - 1), row).replace(/,/g, '')) || 0;
    }
    //var $row;
    //$.each($("#nwGridPrevRcpts-nwData tr"), function (k, v) {
    //    $row = $(v);

    //    QtyRcvd += parseFloat($row.find(`td:eq(${GRD_PR_QTYRCVD})`).text().replace(/,/g, '')) || 0;
    //});
    var globalRow = nwGridCon_Book_Custom.ActiveSheet.GetSelectedIndexes().row;
    deci = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), globalRow));
    //var deci = poc > 0 ? 5 : GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), globalRow));

    $("#txtTotalQtyRcvd_pr").val(GetNum(QtyRcvd).toFixed, deci)//.replace(/(\d)(?=(\d{3})+\.)/g, '$1,');//(getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
}


$(document).on("keydown", "#nwgRemarksCon", function (e) {
    var code = e.which;
    if (code == "13") {
        if ($("#chknwgRemarks").is(':checked')) {
            //var gridIDCon = crnwTable.attr('id');

            if ($('#txtnwgRemarks').val() != '') {
                nwGridCon_Book_Custom.ActiveSheet.SetBackground((GRD_PARTICULARS - 1), Row, "green")
                //$(`#${gridIDCon} tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_PARTICULARS}) button`).addClass("btnGreen");
            }
            else {
                nwGridCon_Book_Custom.ActiveSheet.SetBackground((GRD_PARTICULARS - 1), Row, "orange")
                //$(`#${gridIDCon} tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_PARTICULARS}) button`).removeClass("btnGreen");
            }
        }
    }
});

var getvalue = "";
function IntNDecimalFormat(GridName, KeyCode, IntLength, DecimalLength, spr) {
    var sliptvalue;

    //if (KeyCode == 109 || KeyCode == 189) {
    //    // IntLength = IntLength + 1;
    //    hasNeg = true;
    //}

    //if (hasNeg)
    //    IntLength = IntLength + 1;

    getvalue = crnwTable.find('tr:eq(' + currentRow + ') td:eq(' + spr + ') input').val().replace(",", "");

    //39 - right, 40 - down, 37 - left, 38 - up
    if (KeyCode == 8 || KeyCode == 37 || KeyCode == 38 || KeyCode == 39 || KeyCode == 40)
        return true;
    else if (KeyCode == 109)
        return true;

    if (getvalue.indexOf('.') != -1 && (KeyCode == 190 || KeyCode == 110 || KeyCode == 189))
        event.preventDefault();

    var positionCursor = crnwTable.find('tr:eq(' + currentRow + ') td:eq(' + spr + ') input').prop("selectionStart")
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
            // if ($('#txtLocal').val() == $('#txtHome').val())
            //{ $(this).val(crnwTable.find('tr:eq(' + currentRow + ') td:eq(' + SPR_RATETOHOME + ') input').val()) }
            return true;

    } else {

        if (KeyCode == 190 || KeyCode == 110) {
            if (getvalue.indexOf('.') != -1 && (KeyCode == 190 || KeyCode == 110))
                event.preventDefault();
        } else {
            if (getvalue.length >= IntLen)
                return false;
            else
                return true;
        }
    }
}

var currentRow = 0;
//$(document).on("focus", ".numQTYRCV, .numCOMPLETION, .numDAQtyToBeRcvd", function (e) {
//    currentRow = crnwTR.index();
//});

//var currAmnt;
//var wholeNum = 16;
//var precision = 5;

//$(document).on("keydown", ".numQTYRCV", function (e) {
//    var numQTYRCV = 0;
//    var wholeNum2 = 16;
//    var precision2 = parseInt($(`#nwGridCon-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${GRD_NOOFDECIMALS})`).text().replace(/,/g, "")) || 0;

//    if ($(this).val() != "")
//        numQTYRCV = $(this).val().replaceAll(",", "");

//    currAmnt = numQTYRCV;
//    var gridname = GRD_QTYRCV;
//    return IntNDecimalFormat("numQTYRCV", e.which, wholeNum2, precision2, gridname);
//});


//$(document).on("keydown", ".numDAQtyToBeRcvd", function (e) {
//    var numDAQtyToBeRcvd = 0;
//    var wholeNum2 = 16;
//    var precision2 = getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow) != "" ? getGridData('nwGridCon', '', GRD_NOOFDECIMALS, crnwTR.index()) : 0;

//    if ($(this).val() != "")
//        numDAQtyToBeRcvd = $(this).val().replaceAll(",", "");

//    currAmnt = numDAQtyToBeRcvd;
//    var gridname = GRD_DA_QtyToBeRcvd;
//    return IntNDecimalFormat("numDAQtyToBeRcvd", e.which, wholeNum2, precision2, gridname);
//});


//$(document).on("keydown", ".numCOMPLETION", function (e) {
//    var numCOMPLETION = 0;
//    var wholeNum2 = 16;
//    var precision2 = 5;

//    if ($(this).val() != "")
//        numCOMPLETION = $(this).val().replaceAll(",", "");

//    currAmnt = numCOMPLETION;
//    var gridname = GRD_COMPLETION;
//    return IntNDecimalFormat("numCOMPLETION", e.which, wholeNum2, precision2, gridname);
//});

//$(document).on("blur change", ".numQTYRCV, .numCOMPLETION, .numDAQtyToBeRcvd", function (e) {
//    var id = $(this).attr('class').split(' ')[0];
//    globalLineType = $('.nwLineType:eq(' + crnwTR.index() + ') option:selected').val();

//    if (id == 'numQTYRCV' && globalLineType == '1') {
//        var qtyRcv = parseFloat($(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_QTYRCV}) input`).val().replace(/,/g, "")) || 0;
//        var pobalance = parseFloat($(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_POBAL}) input`).val().replace(/,/g, "")) || 0;
//        var overrun = parseFloat($(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_OverrunRate})`).text().replace(/,/g, "")) || 0;
//        var toValidate = parseFloat(pobalance * ((100 + overrun)/100)) || 0;
//        var getDec = (qtyRcv - Math.floor(qtyRcv));
//        var deci = parseInt($(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_NOOFDECIMALS})`).text().replace(/,/g, "")) || 0;

//        var fromUOM = $(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_PURCHASE_UOM_CODE})`).text();
//        var toUOM = $(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_RCPT_UOM_CODE})`).text();

//        //if (getDec != 0.00 && fromUOM == toUOM) {
//            //MessageBox("Invalid. Receipt UOM is already in Base UOM.", MenuItemTitle);
//            //$(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_QTYRCV}) input`).val("")
//        //}
//        //else
//        if (qtyRcv > toValidate && globalLineType == '1') {
//            MessageBox("Cannot be continued. Total Qty Received exceed Total PO Qty.", MenuItemTitle, "error"); //Qty Received should not exceed the PO Balance plus its Overrun Rate.
//            $(`#nwGridCon-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_QTYRCV}) input`).val(pobalance.toFixed(deci))
//        }
//    }
//    else if (id == "numDAQtyToBeRcvd" && globalLineType == '1') {
//        var poc = parseInt($("#txtPOC_DA").val()) || 0;
//        var qtyRcv = parseFloat($(`#nwGridConDeliveryID-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_DA_QtyToBeRcvd})`).text().replace(/,/g, "")) || 0;
//        var pobalance = parseFloat($(`#nwGridConDeliveryID-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_DA_POQtyBal})`).text().replace(/,/g, "")) || 0;
//        var deci = poc > 0 ? 5 : parseInt($(`#nwGridCon-nwData tr:eq(${globalRow})`).find(`td:eq(${GRD_NOOFDECIMALS})`).text().replace(/,/g, "")) || 0;
//        var overrun = parseFloat(globalOverrun) || 0;
//        var toValidate = parseFloat(pobalance * ((100 + overrun) / 100)) || 0

//        if (parseFloat($("#txtQtyRcvd_DA").val()) != 0 && (qtyRcv > toValidate)) {
//            MessageBox("Cannot be continued. Total Qty Received exceed Total PO Qty.", MenuItemTitle, "error"); //Qty Received should not exceed the PO Balance plus its Overrun Rate.
//            $(`#nwGridConDeliveryID-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_DA_QtyToBeRcvd}) input`).val(pobalance)
//        }

//        if (parseFloat($("#txtQtyRcvd_DA").val()) == 0 && qtyRcv > 100) {
//            $(`#nwGridConDeliveryID-nwData tr:eq(${crnwTR.index()})`).find(`td:eq(${GRD_DA_QtyToBeRcvd}) input`).val(parseFloat(0).toFixed(deci));
//        }

//        disableExpDate();
//    }

//    if (!isNaN($(this).val())) {
//        $(this).val(commafyQty($(this).val()));
//    }

//    if (id != "numDAQtyToBeRcvd") {
//        $("#nwGridCon").click();
//        disableExpDate();
//    }
//    });


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

$(document).on("mousedown", "#btnAttachWindowSave2", function () {
  
    if (getTotalQtyTobeRcv("nwGridCon_Book_Dtl", nwGridCon_Book_Dtl.ActiveSheet.GetValue(GRD_DA_QtyToBeRcvd - 1)) != $("#txtQtyRcvd_DA").val().replace(/,/g, "")) {
        MessageBox("Cannot be saved. Total Qty to be Received should be equal to the Qty Received.", "Delivery Allocation", "error");
        return;
    }

    msgBoxContainerQuestion = "isProcessDeliveryDetails";
    $('#dimMessageBox').css("min-width", "350px");
    parent_MessageBoxQuestion("Do you want to save the record?", "Delivery Allocation", "Question");

    return false;
});

//$(document).on("focusout", ".numDAQtyToBeRcvd", function () {
//    var poc = parseInt($("#txtPOC_DA").val()) || 0;
//    var QtyRcv = parseFloat($(`#nwGridConDeliveryID-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${_crnwTDTemp.index()}) input`).val().replace(/,/g, "")) || 0;
//    var POBAl = parseFloat($(`#nwGridConDeliveryID-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${GRD_DA_POQtyBal})`).text().replace(/,/g, "")) || 0;
//    var POQtyl = parseFloat($(`#nwGridConDeliveryID-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${GRD_DA_POQTY})`).text().replace(/,/g, "")) || 0;

//    var deci = poc > 0 ? 5 : parseInt($(`#nwGridCon-nwData tr:eq(${globalRow})`).find(`td:eq(${GRD_NOOFDECIMALS})`).text().replace(/,/g, "")) || 0;
//    var PrevQty = parseFloat($(`#nwGridCon-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${GRD_DA_QtyRcvd})`).text().replace(/,/g, "")) || 0;

//    if (globalLineType == 1) {
//        if (QtyRcv > ((POQtyl + (POQtyl * (globalOverrun / 100))) - PrevQty)) {
//            MessageBox("Qty to be Received should not be greater than PO Balance.", "Delivery Allocation", "error");
//            $(`#nwGridConDeliveryID-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${_crnwTDTemp.index()}) input`).val((0).toFixed(deci));
//            return true;
//        }
//    }
//    else {
//        if (QtyRcv > globalQtyRcv) {
//            MessageBox("Total Qty to be received in Delivery Allocation window must be equal to the Qty Received in the Line Details.", "Delivery Allocation", "error");
//            $(`#nwGridConDeliveryID-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${_crnwTDTemp.index()}) input`).val((0).toFixed(deci));
//            return true;
//        }
//    }

//    //disableExpDate();
//});


function getTotalQtyTobeRcv(id, col) {
    var qtyRcv = 0;
    try {

        var spread = nwGridCon_Book_Dtl.ActiveSheet;
        var cnt = spread.GetMaxRow()
        for (var row = 0; row < cnt; row++) {
            qtyRcv += GetNum(spread.GetValue(col, row));
        }
    } catch (ex) { }
    return qtyRcv;
}
//function getTotalQtyTobeRcv(id, col) {
//    var qtyRcv = 0;
//    var cnt = nwLib.nwTempTable_Row_Count(id);

//    for (var row = 0; row < cnt; row++) {
//        qtyRcv += parseFloat($(`#${id}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val().replace(/,/g, "")) || 0;
//    }

//    return qtyRcv;
//}



$(document).on("click", "#btnCopyRow", function (e) {
    crnwTable = $("#nwGridConDeliveryID .tblGridBody tbody");
    var length = crnwTable.find("tr").length;

    var delDelDate = crnwTable.find("tr:eq(" + (length - 1) + ")").find("td:eq(" + GRD_DA_DelDate + ")").text();
    var delQtyToBeRcvd = parseFloat(crnwTable.find("tr:eq(" + (length - 1) + ")").find("td:eq(" + GRD_DA_QtyToBeRcvd + ") input").val().replaceAll(',', '')) || 0.00;
    var delPOQty = parseFloat(crnwTable.find("tr:eq(" + (length - 1) + ")").find("td:eq(" + GRD_DA_POQTY + ")").text().replaceAll(',', '')) || 0.00;
    var delQtyRcvd = parseFloat(crnwTable.find("tr:eq(" + (length - 1) + ")").find("td:eq(" + GRD_DA_QtyRcvd + ")").text().replaceAll(',', '')) || 0.00;
    var delBal = parseFloat(crnwTable.find("tr:eq(" + (length - 1) + ")").find("td:eq(" + GRD_DA_POQtyBal + ")").text().replaceAll(',', '')) || 0.00;

    var delWExp = crnwTable.find("tr:eq(" + (length - 1) + ")").find("td:eq(" + GRD_DA_WithExpiry + ")").text();
    var delWBatch = crnwTable.find("tr:eq(" + (length - 1) + ")").find("td:eq(" + GRD_DA_WithBatchNo + ")").text();

    if ((delBal - delQtyToBeRcvd) != 0) {
        nwGrid_AddRow('nwGridConDeliveryID', 1);

        crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_DelDate + ")").text(delDelDate);

        crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_QtyToBeRcvd + ")").html("<input class='numDAQtyToBeRcvd isNumber' maxlength='28' value =''>");

        if (delWExp == 'True') {
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_ExpiryDate + ")").html('<input value="" class="nwDatePicker txtExpiryDate">');
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_ExpiryDate + ")").css('background-color', 'white');
        }
        else {
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_ExpiryDate + ")").enable(false);
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_ExpiryDate + ")").css('background-color', 'gainsboro');
        }

        if (delWBatch == 'True') {
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_BatchNo + ")").html("<input maxlength='80' value ='' />");
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_BatchNo + ")").css('background-color', 'white');
        }
        else {
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_BatchNo + ")").enable(false);
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_BatchNo + ")").css('background-color', 'gainsboro');
        }

        crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_POQTY + ")").text(delPOQty.toFixed(getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)));
        crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_QtyRcvd + ")").text(delQtyRcvd.toFixed(getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)));
        crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_POQtyBal + ")").text((delBal - delQtyToBeRcvd).toFixed(getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)));

        crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_WithExpiry + ")").text(delWExp);
        crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_WithBatchNo + ")").text(delWBatch);
    }

    return false;
});

$(document).on("click", "#btnInsertRowCustom", function (e) {
    crnwTable = $("#nwGridConDeliveryID .tblGridBody tbody");
    var length = crnwTable.find("tr").length;
    var curRow = crnwTR.index();

    var delDelDate = crnwTable.find("tr:eq(" + curRow + ")").find("td:eq(" + GRD_DA_DelDate + ")").text();
    var delQtyToBeRcvd = parseFloat(crnwTable.find("tr:eq(" + curRow + ")").find("td:eq(" + GRD_DA_QtyToBeRcvd + ") input").val().replaceAll(',', '')) || 0.00;
    var delPOQty = parseFloat(crnwTable.find("tr:eq(" + curRow + ")").find("td:eq(" + GRD_DA_POQTY + ")").text().replaceAll(',', '')) || 0.00;
    var delQtyRcvd = parseFloat(crnwTable.find("tr:eq(" + curRow + ")").find("td:eq(" + GRD_DA_QtyRcvd + ")").text().replaceAll(',', '')) || 0.00;
    var delBal = parseFloat(crnwTable.find("tr:eq(" + curRow + ")").find("td:eq(" + GRD_DA_POQtyBal + ")").text().replaceAll(',', '')) || 0.00;

    var delWExp = crnwTable.find("tr:eq(" + curRow + ")").find("td:eq(" + GRD_DA_WithExpiry + ")").text();
    var delWBatch = crnwTable.find("tr:eq(" + curRow + ")").find("td:eq(" + GRD_DA_WithBatchNo + ")").text();

    if ((delBal - delQtyToBeRcvd) != 0) {
        nwGrid_AddRow('nwGridConDeliveryID', 1);

        crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_DelDate + ")").text(delDelDate);

        crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_QtyToBeRcvd + ")").html("<input class='numDAQtyToBeRcvd isNumber' maxlength='28' value =''>");

        if (delWExp == 'True') {
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_ExpiryDate + ")").html('<input value="" class="nwDatePicker txtExpiryDate">');
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_ExpiryDate + ")").css('background-color', 'white');
        }
        else {
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_ExpiryDate + ")").enable(false);
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_ExpiryDate + ")").css('background-color', 'gainsboro');
        }

        if (delWBatch == 'True') {
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_BatchNo + ")").html("<input maxlength='80' value ='' />");
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_BatchNo + ")").css('background-color', 'white');
        }
        else {
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_BatchNo + ")").enable(false);
            crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_BatchNo + ")").css('background-color', 'gainsboro');
        }

        crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_POQTY + ")").text(delPOQty.toFixed(getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)));
        crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_QtyRcvd + ")").text(delQtyRcvd.toFixed(getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)));
        crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_POQtyBal + ")").text((delBal - delQtyToBeRcvd).toFixed(getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)));

        crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_WithExpiry + ")").text(delWExp);
        crnwTable.find("tr:eq(" + (length) + ")").find("td:eq(" + GRD_DA_WithBatchNo + ")").text(delWBatch);
    }

    return false;
});

$(document).on("mousedown", "#btnSaveRequestDetails", function () {
    var promptmessage = "";
    var spread = nwGridCon_Book_DtlsCon.ActiveSheet;

    var alloc = GetNum(spread.GetValue((GRD_RD_QTYTOBEALLOC - 1), _row));
    var qtyRec = GetNum($("#txtQtyRcvd_rd").val());
    var qtyRechdr = GetNum($("#txtTotalQty").val());

    if (alloc != qtyRec)
        promptmessage = "Cannot be continued. Qty to be Allocated should be equal to the Qty Received.";

    else if (qtyRechdr != qtyRec)
        promptmessage = "Cannot be continued. Qty Received should be equal to the Qty Received in the header.";

    var total = 0;

    var cnt = spread.GetMaxRow()
    for (var row = 0; row < cnt; row++) {
        total += GetNum(spread.GetValue(GRD_RD_QTYTOBEALLOC - 1, row));
    }


    let qty = GetNum($("#txtQtyRcvd_rd").val().replace(/,/g, '')) || 0;

    if (GetNum(total) != GetNum(qty)) {
        MessageBox(promptmessage, "Request Allocation", "error");
        return;
    }

    msgBoxContainerQuestion = "SaveRequestDetails";
    parent_MessageBoxQuestion("Do you want to save the current record?", "Request Allocation", "Question");
});



$(document).on("click", ".btnReqDtls", function () {
    nwLoading_Start("xLoadReqDtls", crLoadingHTML);
    var Rownum = nwGridCon_Book_Custom.ActiveSheet.CellIndexes.Row + 1;
    globalQtyRcv = nwGridCon_Book_Custom.GetValue(GRD_QTYRCV - 1, Row);
    globalPOC = nwGridCon_Book_Custom.GetValue(GRD_COMPLETION - 1, Row);
    globalIsInv = nwGridCon_Book_Custom.GetValue(GRD_INVENTORIABLE - 1, Row);
    globalLineType = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_LINETYPE - 1), Row)
    globalRow = nwGridCon_Book_Custom.ActiveSheet.CellIndexes.Row;

    //var Rownum = crnwTR.index() + 1;
    //globalQtyRcv = crnwTR.find("td:eq(" + GRD_QTYRCV + ") input").val();
    //globalPOC = crnwTR.find("td:eq(" + GRD_COMPLETION + ") input").val();
    //globalIsInv = crnwTR.find("td:eq(" + GRD_INVENTORIABLE + ")").text();
    //globalLineType = $('.nwLineType:eq(' + crnwTR.index() + ') option:selected').val();
    //globalRow = crnwTR.index();
    $('#txtRownum').val(Rownum);

    var LineID1 = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_LINEID - 1), Row)
    var POLineID = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_POLINEID - 1), Row)

    $('#txtLineID1').val(LineID1);
    $('#txtPOLineID').val(POLineID);

    nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());
    nwParameter_Add("idvallugPurchaseOrderNo", $("#idvallugPurchaseOrderNo").val());
    nwParameter_Add("idvallugLocForm", $("#idvallugLocForm").val());
    nwParameter_Add("idvallugDelLocForm", $("#idvallugDelLocForm").val());
    nwParameter_Add("idvallugSubLoc1", $("#idvallugSubLoc1").val());
    nwParameter_Add("txtItemCode", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMCODE - 1), Row));
    nwParameter_Add("pUOM", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PURCHASE_UOM_CODE - 1), Row));
    nwParameter_Add("rUOM", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_RCPT_UOM_CODE - 1), Row));
    nwParameter_Add("isInventoriable", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_INVENTORIABLE - 1), Row));
    nwParameter_Add("noofDecimal", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), Row));
    nwParameter_Add("globalLineType", globalLineType);


    var qty = parseFloat(globalQtyRcv.replace(/,/g, '')) || 0;
    if (globalPOC > 0)
        //qty = parseFloat(parseFloat(crnwTR.find("td:eq(" + GRD_POQTY + ") input").val().replace(/,/g, '')) * (parseFloat(globalPOC) / 100)).toFixed(2);
        qty = parseFloat(parseFloat(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_POQTY - 1), Row).replace(/,/g, '')) * (parseFloat(globalPOC) / 100)).toFixed(2);

    //$("#txtItemCode_rd").val(crnwTR.find("td:eq(" + GRD_ITEMCODE + ")").text());
    //$("#txtItemDesc_rd").val(crnwTR.find("td:eq(" + GRD_ITEMDESC + ")").text());
    //$("#txtQtyRcvd_rd").val(parseFloat(qty).toFixed(getGridData('nwGridCon', '', GRD_NOOFDECIMALS, crnwTR.index())).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
    $("#idvallugItem_rd").val(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMCODE - 1), Row));
    $("#descvallugItem_rd").val(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMDESC - 1), Row));
    $("#txtQtyRcvd_rd").val(parseFloat(qty).toFixed(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), Row)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));


    nwPopupForm_ShowModal("nwRequestDetails");
    func_ActionDriven("actRequestDetails", false);
});


//$(document).on("blur change", ".txtRDQtyToBeAlloc", function () {
//    var txtRDQtyToBeAlloc = _crnwTRTemp.find("td:eq(" + GRD_RD_QTYTOBEALLOC + ") input").val(); //$(this).val();
//    var forPR = parseFloat(_crnwTRTemp.find("td:eq(" + GRD_RD_FORPR + ")").text()) - parseFloat(_crnwTRTemp.find("td:eq(" + GRD_RD_OTHERQTY + ")").text());

//    var promptmessage = "";

//    if (globalIsInv == "1")
//        promptmessage = "Cannot be continued. Qty to be Allocated exceeds Without Allocation qty.\n";
//    else if (globalIsInv != "1")
//        promptmessage = "Cannot be continued. Qty Received exceeds PO Qty Balance.\n";

//    if (parseFloat(txtRDQtyToBeAlloc) > parseFloat(forPR)) {
//        setTimeout(function () {
//            MessageBox(promptmessage, "Request Allocation", "error");
//        }, 100);
//        $(this).val('0.00')
//    }
//    //else if (globalPOC > 0 && parseFloat(txtRDQtyToBeAlloc) > 100)
//    //{
//    //    MessageBox("Cannot be continued. Qty to be Allocated should not exceed 100.\n", "Request Allocation", "error");
//    //    $(this).val('')
//    //}

//    /////
//    var QtyRcvd = parseFloat($("#txtQtyRcvd_rd").val().replace(/,/g, '')) || 0,
//        POC = parseFloat(getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)) || 0,
//    AllocQty = 0;

//    var $row;
//    $.each($("#nwGridReqDtls-nwData tr"), function (k, v) {
//        $row = $(v);

//        AllocQty += parseFloat($row.find(`td:eq(${GRD_RD_QTYTOBEALLOC}) input`).val().replace(/,/g, '')) || 0;
//    });

//    $("#txtAllocQty_rd").val(parseFloat(AllocQty).toFixed(POC > 0 ? 5 : getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
//    $("#txtUnallocQty_rd").val((parseFloat(QtyRcvd) - parseFloat(AllocQty)).toFixed(POC > 0 ? 5 : getGridData('nwGridCon', '', GRD_NOOFDECIMALS, globalRow)).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
//});

function getRequestDtlsData(gridName) {
    var tempData = {};
    jsonGrid = [];

    var grid = nwGridCon_Book_DtlsCon.ActiveSheet;
    var count = grid.GetMaxRow();
    var xRow = 0;

    for (var i = 0; i < count; i++) {
        if (grid.GetText(GRD_RD_PRNO - 1, i) != "") {
            tempData = {};
            tempData["ItemCode"] = $("#txtItemCode_rd").val();
            tempData["PRNo"] = grid.GetText(GRD_RD_PRNO - 1, i);
            tempData["ReqNo"] = grid.GetText(GRD_RD_REQNO - 1, i);
            tempData["DateCreated"] = grid.GetText(GRD_RD_DATECREATED - 1, i);
            tempData["DatePosted"] = grid.GetText(GRD_RD_DATEPOSTED - 1, i);
            tempData["UOM"] = grid.GetText(GRD_RD_UOM - 1, i);
            tempData["ReqQty"] = grid.GetText(GRD_RD_RQSTDQTY - 1, i);
            tempData["AllocQty"] = grid.GetText(GRD_RD_ALLOCQTY - 1, i);
            tempData["ForPR"] = grid.GetText(GRD_RD_FORPR - 1, i);
            tempData["QtyToBeAlloc"] = grid.GetText(GRD_RD_QTYTOBEALLOC - 1, i);
            jsonGrid.push(tempData);
        }
    }
    return jsonGrid;
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var indexdeleterow;
$(document).on("click", "#nwGridCon", function (e) {
    if (crnwTR == null) return false;
    indexdeleterow = crnwTR.index();
});

var DtlsPromptName = "";
var IntializeDel = false;
//var cntdata;
function func_nwGrid_DeleteValidation() {
    //var nwobjID = nwobj.attr('id');
    var TableID = crnwTD.parents(".nwGrid").attr('id');
    var cntRows = nwTempTable_Row_Count("nwGridCon");
    var hasDelDtls = crnwTR.find("td:eq(" + GRD_HasDelDtl + ")").text();
    var hasReqDtls = crnwTR.find("td:eq(" + GRD_HASREQDTLS + ")").text();

    if (TableID == "nwGridCon") {
        if (indexdeleterow != cntRows - 1) {
            if (IntializeDel == false && (hasDelDtls == "1" || hasReqDtls == "1")) {
                DtlsPromptName = 'PromptDeleteRow';

                MessageBoxQuestion("Do you want to delete the current row on line details?", MenuItemTitle);
                $(".message_Cancel").visible(false);

                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }
    else {
        return true;
    }
}

function DeleteCLRowUponValidation() {
    IntializeDel = true;
    $("#nwGridCon .nwgrid_Delete.nwgrid_buttons").click();
    IntializeDel = false;
}



//function forLabel(tag, isboth) {
//    $('#lblRefNo').removeClass("isreqcustom");
//    $('#lblRefDate').removeClass("isreqcustom");
//    $('#lblDRCOC').removeClass("isreqcustom");
//    $('#lblDRCOCDate').removeClass("isreqcustom");
//    var isreq = "";
//    if (isboth == "2") {
//        isreq = "isreqcustomBlue";
//    } else {
//        isreq = "isreqcustom";
//    }
//    if (tag == "1") {
//        $('#lblRefNo').html('Ref. No. (BS/SI/SOA)<span class=\'nwRequiredField\'> *</span>');
//        $('#lblRefDate').html('Ref. Date <span class=\'nwRequiredField\'> *</span>');
//        $('#lblDRCOC').html('DR/COC No.<span class=\'nwRequiredField\'> *</span>');
//        $('#lblDRCOCDate').html('DR/COC Date <span class=\'nwRequiredField\'> *</span>');
//        $('#lblRefNo').addClass(isreq);
//        $('#lblRefDate').addClass(isreq);
//        $('#lblDRCOC').addClass(isreq);
//        $('#lblDRCOCDate').addClass(isreq);
//    }
//    else if (tag == "2") {
//        $('#lblRefNo').html('Ref. No. (BS/SI/SOA)<span class=\'kulayBlue\'> *</span>');
//        $('#lblRefDate').html('Ref. Date <span class=\'kulayBlue\'> *</span>');
//        $('#lblDRCOC').html('DR/COC No.<span class=\'kulayBlue\'> *</span>');
//        $('#lblDRCOCDate').html('DR/COC Date <span class=\'kulayBlue\'> *</span>');
//        $('#lblRefNo').addClass(isreq);
//        $('#lblRefDate').addClass(isreq);
//        $('#lblDRCOC').addClass(isreq);
//        $('#lblDRCOCDate').addClass(isreq);
//    }
//    else if (tag == "3") {
//        $('#lblDRCOC').html('DR/COC No.<span class=\'nwRequiredField\'> *</span>');
//        $('#lblDRCOCDate').html('DR/COC Date <span class=\'nwRequiredField\'> *</span>');
//        $('#lblDRCOC').addClass(isreq);
//        $('#lblDRCOCDate').addClass(isreq);
//    }
//    else if (tag == "4") {
//        $('#lblRefNo').html('Ref. No. (BS/SI/SOA)<span class=\'nwRequiredField\'> *</span>');
//        $('#lblRefDate').html('Ref. Date <span class=\'nwRequiredField\'> *</span>');
//        $('#lblRefNo').addClass(isreq);
//        $('#lblRefDate').addClass(isreq);
//    }
//}

$(document).on('click', '.btnVwDtls', function () {
    var itemCode = $(this).attr('id');

    if (itemCode.length > 0) {
        ViewItemDetails(itemCode);
        $('#nwPopItemDetailsWindow').addClass("zindexHigh"); $('#dimbgNWLoadHstTemplate').addClass("zindexHigh2");
    }
    return false;
});

function ViewItemDetails(itemcode) {
    nwLoading_Start("xItemdetails", crLoadingHTML);
    var fullength = "";
    var title = "";

    title = "Item Master";
    fullength = "../../../SG/DataSetup/SGItemMaster/SGItemMaster.aspx?nwItemDetails=" + encodeURI(itemcode);
    $('.nwmenuFrame').attr("src", fullength);

    nwPopupForm_Create("nwPopItemDetailsWindow", true, fullength);
    $('#nwPopItemDetailsWindow .BoxTitle').text(title);

    $("#nwPopItemDetailsWindow").css({ "min-width": "98%" });
    $("#nwPopItemDetailsWindow").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopItemDetailsWindow");
    $('.dimbgNWnwPopWindow').removeClass('openn');
    nwLoading_End('xItemdetails');
}



//$(document).on('click', '#btnCollapseAll', function () {
//    CollapseAll(isOpen);

//    isOpen = !isOpen ? true : false;

//    $('#btnCollapseAll').html(isOpen ? "Collapse All" : "Expand All");

//    return false;
//});

$(document).on("change", 'input[name="tabs"]', function () {
    if ($('input[id="tab-one"]').is(':checked') ||
        $('input[id="tab-two"]').is(':checked') ||
        $('input[id="tab-three"]').is(':checked') ||
        $('input[id="tab-four"]').is(':checked') 
        //$('input[id="tab-five"]').is(':checked')
        ) {
        isOpen = true;
    }
    else {
        isOpen = false;
    }

    $('#btnCollapseAll').html(isOpen ? "Collapse All" : "Expand All");
});


$(document).on('click', '#btnCollapseAll', function () {
    if (_isOpen) {
        $('#accordion_main .nk-li').removeClass("collapse");
    }
    else {
        $('#accordion_main .nk-li').addClass("collapse");
    }

    CheckOpenAll();
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

function CollapseAll(isCollapsed) {
    $('#tab-one,#tab-two,#tab-three,#tab-four').prop('checked', isCollapsed);
}

$(document).on('change', '#txtDocDate', function () {
    let effectiveDate = $(this).val();
    let tag = isEffectiveWithPeriodDates(effectiveDate)

    if (Date.parse(effectiveDate) > Date.parse($('#txtServerdate').val())) {
        MessageBox("Cannot proceed. Value Date should not be later than the current server date.", MenuItemTitle, "error");
        $(this).val('');
        $(this).focus();
    }
    else if (Date.parse($('#descvallugPurchaseOrderNo').val()) > Date.parse(effectiveDate)) {
        MessageBox("Cannot proceed. Value Date should not be earlier than the PO date.", MenuItemTitle, "error");
        $(this).val('');
        $(this).focus();
    }
    else if (tag == 0) {
        MessageBox("Cannot proceed. Value Date should be within the set period dates.", MenuItemTitle, 'error');
        $(this).val('');
        //} else if (tag == 2) {
        //    MessageBox("Cannot proceed. Period is already closed.", MenuItemTitle, 'error');
        //    $(this).val('');
    }
    else {
        nwParameter_Add("idvallugaccform", $('#idvallugLocForm').val());
        nwParameter_Add("txtvaldate", $('#txtDocDate').val());
        func_ActionDriven("actValDate", false);
    }

});

function ComputeLin(col, row, id) {
    //var id = $(this).attr('class').split(' ')[0];
    globalLineType = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_LINETYPE - 1), row);
    //numQTYRCV = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_QTYRCV - 1), row);
    //numDAQtyToBeRcvd = nwGridCon_Book_Dtl.ActiveSheet.GetValue((GRD_DA_QtyToBeRcvd - 1), row);
    //$("#chkLoadPOBalance").prop("checked", false);

    if (id == 'numQTYRCV' && globalLineType == '1') {
        var qtyRcv = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_QTYRCV - 1), row));
        var pobalance = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_POBAL - 1), row));
        var overrun = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_OverrunRate - 1), row));
        var toValidate = GetNum(pobalance * ((100 + overrun) / 100)) || 0;
        var getDec = (qtyRcv - Math.floor(qtyRcv));
        var deci = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), row));

        var fromUOM = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PURCHASE_UOM_CODE - 1), row);
        var toUOM = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_RCPT_UOM_CODE - 1), row);


        if (qtyRcv > toValidate && globalLineType == '1') {
            MessageBox("Cannot be continued. Total Qty Received exceed Total PO Qty.", MenuItemTitle, "error"); //Qty Received should not exceed the PO Balance plus its Overrun Rate.
            nwGridCon_Book_Custom.ActiveSheet.SetValue((GRD_QTYRCV - 1), row, pobalance.toFixed(deci));
        }
    }
    else if (id == "numDAQtyToBeRcvd" && globalLineType == '1') {
        var poc = GetNum($("#txtPOC_DA").val());
        var qtyRcv = GetNum(nwGridCon_Book_Dtl.ActiveSheet.GetValue((GRD_DA_QtyToBeRcvd - 1), row));
        var pobalance = GetNum(nwGridCon_Book_Dtl.ActiveSheet.GetValue((GRD_DA_POQtyBal - 1), row));
        var globalRow = nwGridCon_Book_Custom.ActiveSheet.GetSelectedIndexes().row;
        var deci = poc > 0 ? 5 : GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), globalRow));
        var overrun = parseFloat(globalOverrun) || 0;
        var toValidate = parseFloat(pobalance * ((100 + overrun) / 100)) || 0

        if (GetNum($("#txtQtyRcvd_DA").val()) != 0 && (qtyRcv > toValidate)) {
            MessageBox("Cannot be continued. Total Qty Received exceed Total PO Qty.", MenuItemTitle, "error"); //Qty Received should not exceed the PO Balance plus its Overrun Rate.
            nwGridCon_Book_Dtl.ActiveSheet.SetValue((GRD_DA_QtyToBeRcvd - 1), row, pobalance);
        }

        if (GetNum($("#txtQtyRcvd_DA").val()) == 0 && qtyRcv > 100) {
            nwGridCon_Book_Dtl.ActiveSheet.SetValue((GRD_DA_QtyToBeRcvd - 1), row, GetNum(0).toFixed(deci));
        }

        disableExpDate();
    }

    if (!isNaN($(this).val())) {
        $(this).val(commafyQty($(this).val()));
    }

    if (id != nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_QTYRCV - 1), row)) {
        //$("#nwGridCon").click();
        disableExpDate();
    }

    }



/******** CHANGE EVENTS ********/

function p8Spread_Click(canvasID, row, col) {
    if (canvasID == 'nwGridConCustom') {
        //ris_reloaddeliverydetails_requestdelivery(col, row);

        if (col == (GRD_ITEMDESC - 1)){
        }
        else if (col == (GRD_REQCOMPLIANCE - 1)) {
            var trantype = "RCTVEN";
            var docno = $('#txtTransactionNo').val();
            var applyto = $('#idvallugRefReqStockNo').val();
            var Row = nwGridCon_Book_Custom.ActiveSheet.CellIndexes.Row;
            var lineID = Row + 1; //getGridData('nwGridConCustom', '', GRD_LINEID, crnwTR.index());
            var itemGrpType = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMGROUPTYPE - 1), Row);

            var fullength = "DCREQUIREMENTCOMPLIANCE?TransactionNo=" + docno + "&nwApplyTo=" + applyto + "&TranType=" + trantype + "&nwItemG=" + itemGrpType + "&nwLineID=" + lineID + "&nwRownum=" + lineID + "";

            if (nwDocno != "")
                fullength = "DCREQUIREMENTCOMPLIANCE?isView=true&TransactionNo=" + docno + "&TranType=" + trantype + "&nwItemG=" + itemGrpType + "&nwLineID=" + lineID + "&nwRownum=" + lineID + "";

            nwLoading_Start('xLoadPop', crLoadingHTML);
            nwPopupForm_Create("nwPopUpRequireComplianceL", true, fullength);
            $('#nwPopUpRequireComplianceL .BoxTitle').text("Requirements Compliance");
            $("#nwPopUpRequireComplianceL").css({ "min-width": "98%" });
            $("#nwPopUpRequireComplianceL").css({ "min-height": "98%" });
            nwPopupForm_ShowModal("nwPopUpRequireComplianceL");
            nwLoading_End('xLoadPop');
        }
    }
    else if (canvasID == 'nwGridPOBalDtlsCon') {
        if (col == (GRD_BD_PREVIOUSRECEIPTS - 1)) {
            nwLoading_Start("xLoadPrecRcpts", crLoadingHTML);

            nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());
            nwParameter_Add("idvallugPurchaseOrderNo", $("#idvallugPurchaseOrderNo").val());
            nwParameter_Add("idvallugDelLocForm", $("#idvallugDelLocForm").val());
            nwParameter_Add("idvallugSubLoc1", $("#idvallugSubLoc1").val());
            nwParameter_Add("txtItemCode", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMCODE - 1), globalRow));
            nwParameter_Add("pUOM", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PURCHASE_UOM_CODE - 1), globalRow));
            nwParameter_Add("rUOM", nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_RCPT_UOM_CODE - 1), globalRow));

            //nwParameter_Add("txtItemCode", getGridData('nwGridCon', '', GRD_ITEMCODE, globalRow));
            //nwParameter_Add("pUOM", getGridData('nwGridCon', '', GRD_PURCHASE_UOM_CODE, globalRow));
            //nwParameter_Add("rUOM", getGridData('nwGridCon', '', GRD_RCPT_UOM_CODE, globalRow));

            $("#idvallugItemCode_pr").val(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMCODE - 1), globalRow));
            $("#descvallugItemCode_pr").val(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ITEMDESC - 1), globalRow));
            $("#txtPOQty_pr").val(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_ORIGPOQTY - 1), globalRow));
            $("#idvallugPOUOMCode_pr").val(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PURCHASE_UOM_CODE - 1), globalRow));
            $("#descvallugPOUOMCode_pr").val(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_PURCHASE_UOM - 1), globalRow));
            $("#idvallugCurrRcptUOMCode_pr").val(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_RCPT_UOM_CODE - 1), globalRow));
            $("#descvallugCurrRcptUOMCode_pr").val(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_RCPT_UOM - 1), globalRow));

            //$("#idvallugItemCode_pr").val(getGridData('nwGridCon', '', GRD_ITEMCODE, globalRow));
            //$("#descvallugItemCode_pr").val(getGridData('nwGridCon', '', GRD_ITEMDESC, globalRow));
            //$("#txtPOQty_pr").val(getGridData('nwGridCon', '', GRD_ORIGPOQTY, globalRow));
            //$("#idvallugPOUOMCode_pr").val(getGridData('nwGridCon', '', GRD_PURCHASE_UOM_CODE, globalRow));
            //$("#descvallugPOUOMCode_pr").val(getGridData('nwGridCon', '', GRD_PURCHASE_UOM, globalRow));
            //$("#idvallugCurrRcptUOMCode_pr").val(getGridData('nwGridCon', '', GRD_RCPT_UOM_CODE, globalRow));
            //$("#descvallugCurrRcptUOMCode_pr").val(getGridData('nwGridCon', '', GRD_RCPT_UOM, globalRow));
            $("#txtTotalQtyRcvd_pr").val($("#txtTotalQty").val()); //crnwTR.find("td:eq(" + GRD_POQTY + ") input").val()

            nwPopupForm_ShowModal("nwPrevRcpts");
            func_ActionDriven("actPrevRcpts", false);
        }

    }

}


function p8Spread_Change(canvasID, row, col) {

    if (canvasID == "nwGridConCustom") {
        try {
            ris_reloaddeliverydetails_requestdelivery(col, row);

        } catch (ex)
        {

        }
        if (col == (GRD_QTYRCV - 1) || col == (GRD_COMPLETION - 1)) {
            var hasDTL = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_HasDelDtl - 1), row) == "1";
            var hasReqDtls = nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_HASREQDTLS - 1), row) == "1";
            if (hasDTL || hasReqDtls) {

                _row = row;
                _col = col;

                var msgCol = "";

                msgCol = col == (GRD_QTYRCV - 1) ? "Qty Received" : "% of Completion";
                msgBoxContainerQuestion = "isChangeNum";
                parent_MessageBoxQuestion(`Changing the ${msgCol} will reset the data in the Delivery Allocation and/or Request Allocation. Do you want to proceed?`, MenuItemTitle, "Question");
                $('#Message_Cancel').hide();
                //msgCol = tdTemp.index() == GRD_QTYRCV ? "Qty Received" : "% of Completion";
                //msgBoxContainerQuestion = "isChangeNum";
                //parent_MessageBoxQuestionRBG(`Changing the ${msgCol} will reset the data in the Delivery Allocation and/or Request Allocation. Do you want to proceed?`, MenuItemTitle, "Question");
                //$('#Message_Cancel').hide();

                //}
            }
            if (!hasDTL && (col == (GRD_QTYRCV - 1) || col == (GRD_COMPLETION - 1)))
                validateQtyReceived(col);
            //if (!hasDTL && tdTemp.index() == GRD_QTYRCV)
            //    validateQtyReceived();

            txtTotalQty();

        }
        if (!hasDTL && col == (GRD_QTYRCV - 1)) {
            ComputeLin(col, row, 'numQTYRCV')
        }
        else if (!hasDTL && col == (GRD_COMPLETION - 1)) {
            ComputeLin(col, row, 'numCOMPLETION')
        }
        if (!hasDTL) {
            ris_reloaddeliverydetails_requestdelivery(col, row)
        }
    } else if (canvasID == "nwGridConDeliveryDetails") {
        if (col == (GRD_DA_QtyToBeRcvd - 1)) {
            var poc = GetNum($("#txtPOC_DA").val());
            var QtyRcv = GetNum(nwGridCon_Book_Dtl.ActiveSheet.GetValue((GRD_DA_QtyToBeRcvd - 1), row));
            var POBAl = GetNum(nwGridCon_Book_Dtl.ActiveSheet.GetValue((GRD_DA_POQtyBal - 1), row));
            var POQtyl = GetNum(nwGridCon_Book_Dtl.ActiveSheet.GetValue((GRD_DA_POQTY - 1), row));


            var mainrow = nwGridCon_Book_Custom.ActiveSheet.CellIndexes.Row;
            var deci = poc > 0 ? 5 : GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), mainrow));

            var PrevQty = GetNum(nwGridCon_Book_Dtl.ActiveSheet.GetValue((GRD_DA_QtyRcvd - 1), row));

            if (globalLineType == 1) {
                if (QtyRcv > GetNum(((POQtyl + (POQtyl * (globalOverrun / 100))) - PrevQty).toFixed(2))) {
                    MessageBox("Cannot proceed. Quantity received exceeds PO balance.", "Delivery Allocation", "error");
                    nwGridCon_Book_Dtl.ActiveSheet.SetValue((GRD_DA_QtyToBeRcvd - 1), row, (0).toFixed(deci))
                    return false;
                }
            }
            else {
                if (QtyRcv > globalQtyRcv) {
                    MessageBox("Total Qty to be received in Delivery Allocation window must be equal to the Qty Received in the Line Details.", "Delivery Allocation", "error");
                    //$(`#nwGridConDeliveryID-nwData tr:eq(${_crnwTRTemp.index()})`).find(`td:eq(${_crnwTDTemp.index()}) input`).val((0).toFixed(deci));
                    nwGridCon_Book_Dtl.ActiveSheet.SetValue((GRD_DA_QtyToBeRcvd - 1), row, (0).toFixed(deci))
                    return false;
                }
            }

            ComputeLin(col, row, 'numDAQtyToBeRcvd')
        } else if (col == (GRD_DA_DeliveredQty - 1)) {
            computeVariance(row);
        }
    } else if (canvasID == "nwGridReqDtlsCon") {
     
        if (col == (GRD_RD_QTYTOBEALLOC - 1)) {

            var txtRDQtyToBeAlloc = GetNum(nwGridCon_Book_DtlsCon.ActiveSheet.GetValue((GRD_RD_QTYTOBEALLOC - 1), row))
            var forPR = GetNum(nwGridCon_Book_DtlsCon.ActiveSheet.GetValue((GRD_RD_FORPR - 1), row)) - GetNum(nwGridCon_Book_DtlsCon.ActiveSheet.GetValue((GRD_RD_OTHERQTY - 1), row))

            var promptmessage = "";

            if (globalIsInv == "1")
                promptmessage = "Cannot be continued. Qty to be Allocated exceeds Without Allocation qty.\n";
            else if (globalIsInv != "1")
                promptmessage = "Cannot be continued. Qty Received exceeds PO Qty Balance.\n";

            if (txtRDQtyToBeAlloc > forPR) {
                setTimeout(function () {
                    MessageBox(promptmessage, "Request Allocation", "error");
                }, 100);
                //$(this).val('0.00')
                nwGridCon_Book_DtlsCon.ActiveSheet.SetValue((GRD_RD_QTYTOBEALLOC - 1), row, 0)
            }
            //else if (globalPOC > 0 && parseFloat(txtRDQtyToBeAlloc) > 100)
            //{
            //    MessageBox("Cannot be continued. Qty to be Allocated should not exceed 100.\n", "Request Allocation", "error");
            //    $(this).val('')
            //}

            /////
            var QtyRcvd = GetNum($("#txtQtyRcvd_rd").val())
            var globalRow = nwGridCon_Book_Custom.ActiveSheet.CellIndexes.Row;
            var deci = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_NOOFDECIMALS - 1), globalRow));
            POC = GetNum(nwGridCon_Book_Custom.ActiveSheet.GetValue((GRD_COMPLETION - 1), globalRow)),
                AllocQty = 0;

            for (var i = 0; i < nwGridCon_Book_DtlsCon.ActiveSheet.GetMaxRow() ; i++) {
                AllocQty += GetNum(nwGridCon_Book_DtlsCon.ActiveSheet.GetValue((GRD_RD_QTYTOBEALLOC - 1), i))
            }

            $("#txtAllocQty_rd").val(AllocQty.toFixed(POC > 0 ? 5 : POC).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
            $("#txtUnallocQty_rd").val((QtyRcvd - AllocQty).toFixed(POC > 0 ? 5 : POC).replace(/(\d)(?=(\d{3})+\.)/g, '$1,'));
        }
    }

}