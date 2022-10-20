const title = "Holding of Unit";

let StartIndex_UnitDtls = 0,
    SPR_UnitCode = StartIndex_UnitDtls,
    SPR_ProjectCode = ++StartIndex_UnitDtls,
    SPR_Project = ++StartIndex_UnitDtls,
    SPR_PhaseTowerCode = ++StartIndex_UnitDtls,
    SPR_PhaseTower = ++StartIndex_UnitDtls,
    SPR_BlockFloorCode = ++StartIndex_UnitDtls,
    SPR_BlockFloor = ++StartIndex_UnitDtls,
    SPR_LotUnitSlotNoCode = ++StartIndex_UnitDtls,
    SPR_LotUnitSlotNo = ++StartIndex_UnitDtls,
    SPR_SellingPrice = ++StartIndex_UnitDtls,
    SPR_QueueNo = ++StartIndex_UnitDtls,
    SPR_AccNo = ++StartIndex_UnitDtls,
    SPR_RefBaseAddOn = ++StartIndex_UnitDtls,
    SPR_HasRefBaseAddOn = ++StartIndex_UnitDtls;

let StartIndex_RefbaseDtls = 0,
    SPR_RBAOUnitCode = StartIndex_RefbaseDtls,
    SPR_RBAOUnitDesc = ++StartIndex_RefbaseDtls;

var nwGridMainCon_BookUnit;
var nwGridMainCon_SheetUnit;

var nwGridMainCon_BookRBAO;
var nwGridMainCon_SheetRBAO;

var ServerLink = "";
var nwDocno = '';
var transno = "";
var uc = "";

var DateToday = "";
var HoldExpDate = "";
var MinDate = "";
var MaxDate = "";

function func_Reload() {

    //crnwTagSingleBind = true;
    nwTrustedLinks.push("fli.promptus8.com");//Kahit saan by CHOLO
    crLnk = "../SBHoldingOfUnit/SBHoldingOfUnit_Gateway";
    crLnkGateKey = "SBHoldingOfUnit";
    //nwPopupForm_Create("nwPopWindow2");

    transno = getParameterByName("transno");
    uc = getParameterByName("uc");

    nwParameter_Add("transno", transno);
    nwParameter_Add("unitCode", uc);

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();

    //nwPopupForm_Create("nwReferenceBaseAddOn");

    return isContinue;
}

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();

    onNewLoad();
    nwParameter_Add("unitCode", uc);

    return isContinue;
}

function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", title, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    $("#nwPopWindow2 .modal-box-s .modal-hdr .modal-hdr-title").text("Reason for deletion");
    nwPopupForm_ShowModal("nwPopWindow2");
    cust_GetPara();
    //parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", title, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwLoading_Start("xLoading", crLoadingHTML);
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
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", title, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    cust_GetPara();
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

function cust_GetPara() {

    nwParameter_Add("customerType", $("#rdIndividual").prop("checked") ? 0 : 1);
    nwParameter_Add("custClassification", $('#idvallugCustClassification').val());
    nwParameter_Add("proscustomer", $("#idvallugProsCustomer").val());
    nwParameter_Add("customer", $("#idvallugCustomer").val());
    nwParameter_Add("lastName", $("#txtLastName").val());
    nwParameter_Add("firstName", $("#txtFirstName").val());
    nwParameter_Add("middleName", $("#txtMiddleName").val());
    nwParameter_Add("regName", $("#txtRegName").val());
    nwParameter_Add("tradeName", $("#txtTradeName").val());
    nwParameter_Add("locCode", $("#idvallugLocAcctForms").val());
    nwParameter_Add("transNo", $("#txtTransactionNo").val());
    nwParameter_Add("holdingType", $("#idvallugHoldingType").val());
    nwParameter_Add("holdDate", $("#txtHoldingDate").val());
    nwParameter_Add("holdExpDate", $("#txtHoldingExpiryDate").val());
    nwParameter_Add("remarks", $("#txtRemarks").val());
    nwParameter_Add("recordStatus", $("#txtRecordStatus").val());
    nwParameter_Add("reasonForReturn", $("#txtReasonForReturnCode").val());
    nwParameter_Add("remarksForReturn", $("#txtRemarksForReturn").val());
    nwParameter_Add("saletype", $("#txtSaleType").val());

    nwDocno = getParameterByName('nwDocno');
    nwParameter_Add("nwDocno", nwDocno);

    nwParameter_Add("unitCode", uc);

    try {
        nwParameter_Add_DataSet("conUnitDtlsGrid");
    } catch (ex) {
        //console.log(ex);
    }

}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("xLoading", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xLoading", crLoadingHTML);
    RefreshData();
    cust_GetPara();
    func_ActionDriven("actBindCollectionEmpty", false);
}

function EnableFields() {
    $(".lookups").removeClass("adisabled");
    $(".rdCustomerType").prop("disabled", false);

    $("#txtHoldingDate").enable(true);
    $("#txtHoldingExpiryDate").enable(true);
    $("#txtRemarks").enable(true);

    $("#btnReqCompliance").enable(false);
    $("#btnReqCompliance").addClass("btnGray");
    $("#btnReqCompliance").removeClass("btnGreen");
    $("#btnReqCompliance").removeClass("btnOrange");
}

function DisableFields() {
    $(".lookups").addClass("adisabled");
    $(".rdCustomerType").prop("disabled", true);

    $("#txtHoldingDate").enable(false);
    $("#txtHoldingExpiryDate").enable(false);
    $("#txtRemarks").enable(false);

    $("#btnReqCompliance").enable(false);
    $("#btnReqCompliance").removeClass("btnOrange");
    $("#btnReqCompliance").removeClass("btnGreen");
    $("#btnReqCompliance").addClass("btnGray");
}

function EnableFieldsDone() {//Binding Done
    $(".lookups").addClass("adisabled");
    $(".rdCustomerType").prop("disabled", true);

    $("#txtHoldingDate").enable(false);
    $("#txtHoldingExpiryDate").enable(false);
    $("#txtRemarks").enable(true);

    //$("#noah-webui-Toolbox").bindingNew().enable(false);
    $("#noah-webui-Toolbox").bindingNew().visible(false);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
}

function DisableFieldsEmpty() {
    $(".lookups").addClass("adisabled");
    $(".lookups").addClass("adisabled");

    $(".rdCustomerType").prop("disabled", true);

    $("#txtHoldingDate").enable(false);
    $("#txtHoldingExpiryDate").enable(false);
    $("#txtRemarks").enable(false);

    //$("#noah-webui-Toolbox").bindingNew().enable(false);
    $("#noah-webui-Toolbox").bindingNew().visible(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);

    $("#btnReqCompliance").enable(false);
    $('#btnReqCompliance').removeClass('btnGreen');
    $('#btnReqCompliance').removeClass('btnOrange');
    $('#btnReqCompliance').addClass('btnGray');
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords === 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

function ClearFields() {
    $('.clr').val("");
    $("div.dvinput input").val("");
    $("div.dvinput textarea").val("");
    $("div.lookups div.conval input").val("");
    $('#cmbReasonSelect').val("");

    $('#btnReqCompliance').enable(false);

    try {
        nwGridMainCon_BookUnit.ActiveSheet.Refresh();
    } catch (e) {
        //console.log(e.toString());
    }
}

function getLookupData(idname, idnum, index) {
    var data = $("#menuCreatorContainer ." + idname + " #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
}

function onNewLoad() {
    try {
        $("#txtHoldingDate, #txtHoldingExpiryDate").datepicker("destroy").inputmask("remove");
        $("#rdIndividual").prop("checked", true);

        $("#txtHoldingDate").loadDatetimepicker({ value: moment(new Date($DateToday)).format('MM/DD/YYYY HH:mm:ss') });
        $("#txtHoldingExpiryDate").loadDatetimepicker({ value: moment(new Date($HoldExpDate)).format('MM/DD/YYYY HH:mm:ss') });

    } catch (e) {
        console.log(e.toString());
    }
}

$(function ($) {
    $.fn.loadDatetimepicker = function (opts) {

        var def = $.extend({
            value: ""
        }, opts);

        return this.val(def.value).datetimepicker({
            timeFormat: 'HH:mm:ss'
        }).inputmask("datetime", {
            inputFormat: "MM/dd/yyyy HH:MM:ss",
            clearIncomplete: true
        });
    };

}(jQuery));

function Lookup_DoneFunction(idName, idNum) {
    let $t = $(`.tablecontainter .${idName} tbody tr:eq(${idNum})`);
    let code, desc;

    if (idName === "lugCustClassification") {
        code = getLookupData(idName,idNum,0);

        $("#idvallugCustomer").val("");
        $("#txtLastName").val("");
        $("#txtFirstName").val("");
        $("#txtMiddleName").val("");
        $("#txtRegName").val("");
        $("#txtTradeName").val("");

        nwParameter_Add("unitCode", uc);
        nwParameter_Add("custClassification", code);
        func_ActionDriven("actInitializeDetails", false)
    }

    else if (idName === "lugCustomer") {
        code = getLookupData(idName, idNum, 0);
        desc = getLookupData(idName, idNum, 1);
        let tradeName = getLookupData(idName, idNum, 2);
        let lastName = getLookupData(idName, idNum, 3);
        let firstName = getLookupData(idName, idNum, 4);
        let middleName = getLookupData(idName, idNum, 5);

        $("#txtRegName").val(desc);
        $("#txtTradeName").val(tradeName);
        $("#txtLastName").val(lastName);
        $("#txtFirstName").val(firstName);
        $("#txtMiddleName").val(middleName);
    }

    else if (idName === "lugProsCustomer") {
        code = getLookupData(idName, idNum, 0);
        $("#idvallugProsCustomer").val(code);
    }

    else if (idName === "lugRBAOUnitCode") {
        code = getLookupData(idName, idNum, 0);
        desc = getLookupData(idName, idNum, 1);

        nwGridMainCon_BookRBAO.ActiveSheet.SetText(SPR_RBAOUnitCode, nwGridMainCon_BookRBAO.ActiveSheet.GetSelectedIndexes().row, code)
        nwGridMainCon_BookRBAO.ActiveSheet.SetText(SPR_RBAOUnitDesc, nwGridMainCon_BookRBAO.ActiveSheet.GetSelectedIndexes().row, desc)
    }
}

function func_LookUpInitialize(idName) {
    var isContinue = true;

    if (idName === "toolboxInquire") {
        nwParameter_Add("unitCode", uc);
    }
    else if (idName === "lugCustomer") {
        nwParameter_Add("custClassification", $("#idvallugCustClassification").val());
        nwParameter_Add("customerType", $("#rdIndividual").prop("checked") ? 0 : 1);
        nwParameter_Add("unitCode", uc);
    }
    return isContinue;
}

function p8Spread_Click(canvasID, row, col) {

    if (canvasID == "conUnitDtlsGrid") {
        if (col == (SPR_RefBaseAddOn)) {

            var unit = '';
            unit = nwGridMainCon_BookUnit.ActiveSheet.GetText((SPR_UnitCode), nwGridMainCon_BookUnit.ActiveSheet.GetSelectedIndexes().row);

            if (unit != "") {
                nwLoading_Start("actRefBaseOnLoading", crLoadingHTML);
                nwParameter_Add("unitCode", unit);
                nwParameter_Add("unit", unit);
                nwPopupForm_ShowModal("nwReferenceBaseAddOn");
                cust_GetPara();
                func_ActionDriven("actRefBaseOn", false);
                nwGridMainCon_BookRBAO.ActiveSheet.SetText2(0, 0, unit);
            }
        }
    }

    return true;
}

function CreateUnitDtlsGridDone() {
    setTimeout(function () {
        var Gridrows = nwGridMainCon_BookUnit.ActiveSheet.GetMaxRow();

        for (var y = 0; y <= Gridrows; y++) {
            var unitcode = nwGridMainCon_BookUnit.ActiveSheet.GetText(SPR_UnitCode, y) || "";
            if (unitcode != "") {
                var HasRefBaseAddOn = nwGridMainCon_BookUnit.ActiveSheet.GetText(SPR_HasRefBaseAddOn, y) || "";
                if (HasRefBaseAddOn == "1") {
                    nwGridMainCon_BookUnit.ActiveSheet.SetBackground(SPR_RefBaseAddOn, y, "green");
                } else {
                    nwGridMainCon_BookUnit.ActiveSheet.SetBackground(SPR_RefBaseAddOn, y, "orange");
                }
            } else {
                break;
            }
        }
    }, 100);
}

function func_WindowCloseTrigger(verID) {
    var isContinue = true;
    var errorResult = "";
    var ICode = "";
    var currentRow = -1;
    var serverlink = "ss";
    cust_GetPara();


    if (verID == "nwPopUpReqComp") {
        nwParameter_Add("txtTransactionNo", $('#txtTransactionNo').val());
        nwLoading_Start("actHasRqrdCompli", crLoadingHTML);
        func_ActionDriven('actHasRqrdCompli', false);
    }

    return isContinue;
}

$(document).on("click", "#ReasonSelectbtn", function () {
    if ($("#cmbReasonSelect").val() == "" || $("#cmbReasonSelect").val() == " " || $("#cmbReasonSelect").val() == null) {
        MessageBox("Cannot proceed. Reason for Cancellation is required.", title, 'error');
        return false;
        nwParameter_Add("cmbReasonSelect", "");
        nwParameter_Add("DeletePass", "0");
    }
    else {
        nwParameter_Add("cmbReasonSelect", $("#cmbReasonSelect").val());
        nwParameter_Add("DeletePass", "1");
        func_ActionDriven("actDeleteData", false);
        nwLoading_Start("actDeleteData", crLoadingHTML);
    }
});

function showDeletedMessage(message) {
    if (message.toLowerCase().includes("error")) {
        MessageBox(message, title, 'error');
        nwPopupForm_HideModal("nwPopWindow2");
    }
    else {
        MessageBox(message, title, 'info');
        nwPopupForm_HideModal("nwPopWindow2");
    }
    nwLoading_End('actDeleteData');
}

function msgBoxContainerQuestionF(genID, answer) {

    if (genID == "btnSaveRefBase") {
        if (answer == "Yes") {
            nwParameter_Add_DataSet("nwGridRefBaseOn");
            cust_GetPara();

            func_ActionDriven("actbtnSaveRefBase", false);
        }
    }

}

$(document).on("change", "#txtHoldingDate", function (e) {
    try {
        if ($(this).val() !== "") {
            var holdDate = new Date($(this).val());
            var datetoday = new Date(moment(new Date(DateToday)).format('MM/DD/YYYY HH:mm:ss'));
            var holdExpDate = new Date(moment(new Date(HoldExpDate)).format('MM/DD/YYYY HH:mm:ss'));

            if (moment(holdDate).isBefore(datetoday)) {
                MessageBox("Cannot continue. Holding Date should not be earlier than the current server date.", title);
                $(this).val(moment(new Date(DateToday)).format('MM/DD/YYYY HH:mm:ss'));
            }
            else if (moment(holdExpDate).isBefore(holdDate)) {
                MessageBox("Cannot continue. Holding Expiry Date should not be earlier than the Holding Date.", title);
                $(this).val(moment(new Date(DateToday)).format('MM/DD/YYYY HH:mm:ss'));
            }
            $("#txtHoldingExpiryDate").val(moment(new Date($HoldExpDate)).format('MM/DD/YYYY HH:mm:ss'));
        }
        else {
            $("#txtHoldingExpiryDate").val("");
        }
    } catch (e) {
        console.log(e.toString());
    }
});

$(document).on("change", "#txtHoldingExpiryDate", function (e) {
    try {
        var hdate = $("#txtHoldingDate").val();
        var datetoday = new Date(moment(new Date(DateToday)).format('MM/DD/YYYY HH:mm:ss'));
        var holdDate = new Date(hdate);
        var holdExpDate = new Date($(this).val());

        if (moment(holdExpDate).isBefore(holdDate)) {
            MessageBox("Cannot continue. Holding Expiry Date should not be earlier than the Holding Date.", title);
            $(this).val(moment(new Date(HoldExpDate)).format('MM/DD/YYYY HH:mm:ss'));
        }
    } catch (e) {
        console.log(e.toString());
    }
});

$(document).on("change", ".rdCustomerType", function () {
    $("#idvallugCustomer").val("");
    $("#txtLastName").val("");
    $("#txtFirstName").val("");
    $("#txtMiddleName").val("");
    $("#txtRegName").val("");
    $("#txtTradeName").val("");
});

$(document).on("click", "#btnSaveRefBase", function (e) {
    msgBoxContainerQuestion = "btnSaveRefBase";
    parent_MessageBoxQuestion("Would you like to save the current record?", "Reference Base / Add On", "Question");
    return true;
});

$(document).on("click", "#btnRefreshRefBase", function (e) {
    try {
        cust_GetPara();
        func_ActionDriven("actbtnRefreshRefBase", false);
    } catch (e) {
        MessageBox(e.toString(), "Error");
    }
});

$(document).on("click", "#btnReqCompliance", function (e) {

    var trantype = "HOLDPR";
    var docno = $("#txtTransactionNo").val();
    nwDocno = getParameterByName("nwDocno");
    var isView = nwDocno != "" ? true : false;
    var forView = $("#txtRecordStatus").val() == "3" ? true : false;

    if (docno == "") {
        MessageBox("Cannot proceed. Data should be saved first.", title, "error");
        return false;
    }

    if (nwDocno == "") {
        var fullength = "../DCRequirementCompliance/?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=" + forView;
    } else {
        var fullength = "../DCRequirementCompliance/?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=true";
    }

    try {
        nwLoading_Start('btnReqCompliance', crLoadingHTML);
        nwPopupForm_Create("nwPopUpReqComp", true, fullength);
        $('#nwPopUpReqComp .BoxTitle').text("Requirements Compliance");
        $("#nwPopUpReqComp").css({ "min-width": "80%" });
        $("#nwPopUpReqComp").css({ "min-height": "80%" });
        nwPopupForm_ShowModal("nwPopUpReqComp");
        nwLoading_End('btnReqCompliance');
    } catch (err) {
        nwLoading_End('btnReqCompliance');
        MessageBox(err.toString(), title, "error");
    }

    return false;
});
