baseTitle = "Request Bulk for Holding";
var nwDocno = "";

function func_Reload() {

    //crnwTagSingleBind = true;

    crLnk = "../SBRequestBulkHolding_Gateway";
    crLnkGateKey = "SBRequestBulkHolding";


    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();

    nwDocno = getParameterByName("nwDocno");
    nwParameter_Add("nwDocno", nwDocno);

    return isContinue;
}


////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    return isContinue;
}

function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", baseTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", baseTitle, "", indef, enume);
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
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    nwLoading_Start("xSample", crLoadingHTML);
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
    nwParameter_Add("Docno", $('#txtDocNo').val());
    nwParameter_Add("LocForm", $('#idvallugLocAcctForms').val());
    nwParameter_Add("ReasonBulkHold", $('#idvallugReasonBulkHold').val());
    nwParameter_Add("Customer", $("#idvallugCustomer").val());
    nwParameter_Add("Project", $("#idvallugProject").val());
    nwParameter_Add("noUnitHeld", $("#txtnoUnitHeld").val());
    nwParameter_Add("Remarks", $("#txtRemarks").val());
    nwParameter_Add("DocDate", $("#txtDocDate").val());

    nwDocno = getParameterByName("nwDocno");
    nwParameter_Add('nwDocno', nwDocno);
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    nwLoading_Start("xSample", crLoadingHTML);
    cust_GetPara();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xSample", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
    }
}

function func_WindowCloseTrigger(verID) {
    var isContinue = true;
    var errorResult = "";
    var ICode = "";
    
    cust_GetPara();

    if (verID == "nwPopUpReqComp") {
        nwParameter_Add("txtTransactionNo", $('#txtTransactionNo').val());
        nwLoading_Start("actHasRqrdCompli", crLoadingHTML);
        func_ActionDriven('actHasRqrdCompli', false);
    }
    return isContinue;
}

function EnableFields() { //Upon New
    $('.lookups').enable(true);
    $('.open').enable(true);
    $('#txtRemarks').enable(true);

    $("#btnReqCompliance").enable(false);
    $("#btnReqCompliance").addClass("btnGray");
    $("#btnReqCompliance").removeClass("btnGreen");
    $("#btnReqCompliance").removeClass("btnOrange");
}

function DisableFields() { //Upon New
    $('.lookups').enable(false);
    $('.open').enable(false);
    $('#txtRemarks').enable(false);

    $("#btnReqCompliance").enable(false);
    $("#btnReqCompliance").removeClass("btnOrange");
    $("#btnReqCompliance").removeClass("btnGreen");
    $("#btnReqCompliance").addClass("btnGray");

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().visible(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().visible(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-default-currentRec").enable(false);
}

function EnableFieldsDone() { //Upon Refresh where record > 0   
    $('.lookups').enable(false);
    $('.open').enable(false);
    $('#txtRemarks').enable(true);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().visible(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().visible(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-default-currentRec").enable(true);

    $("#btnReqCompliance").enable(true);
    $('#btnReqCompliance').addClass('btnOrange');
    $('#btnReqCompliance').removeClass('btnGreen');
    $('#btnReqCompliance').removeClass('btnGray');
}

function DisableFieldsEmpty() { //Upon Refresh where record < 0
    $('.lookups').enable(false);
    $('.open').enable(false);
    $('#txtRemarks').enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingNew().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingExport().visible(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);

    $("#btnReqCompliance").enable(false);
    $('#btnReqCompliance').removeClass('btnGreen');
    $('#btnReqCompliance').removeClass('btnOrange');
    $('#btnReqCompliance').addClass('btnGray');

}

function ClearFields() {
    $('.idval').val("");
    $('.descval').val("");
    $('.input').val("");
    $('#txtRemarks').val("");

    $('#btnReqCompliance').enable(false);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

function isExists(isEnabled) {
    if (isEnabled == 1) {
        $("#noah-webui-Toolbox").bindingDelete().enable(false);
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#txtRemarks").prop("disabled", true);
    }
    else {
        $("#noah-webui-Toolbox").bindingDelete().enable(true);
        $("#noah-webui-Toolbox").bindingSave().enable(true);
        $("#txtRemarks").prop("disabled", false);
    }
}

$(document).on("click", "#btnReqCompliance", function (e) {

    var trantype = 'BLKHLD';
    var docno = $('#txtDocNo').val();
    var status = $('#txtStatusCode').val();
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
