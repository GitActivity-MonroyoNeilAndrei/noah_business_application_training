var isnew = 0;
var basedTitle = "Vendor Tiering Assignment";

function func_Reload() {

    crLnk = GetCurrentURL() + "APVendorTieringAssignment_Gateway";
    crLnkGateKey = "APVendorTieringAssignment";
    crnwTagSingleBind = true;

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();
    num;
    $("#noah-webui-Toolbox").bindingNew().visible(false);

    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    isnewrow = 1;
    var isContinue = true;
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    $('#txtCode').focus();
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    codeonpaste();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwParameter_Add("isnewrow", isnewrow);
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
    isnewrow = 0;
    cust_GetPara();
    nwLoading_Start("xRefreshBtn", crLoadingHTML);
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

    nwParameter_Add("txtCode", $('#txtCode').val());
    nwParameter_Add("txtDescription", $('#txtDescription').val());
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara(); nwLoading_Start("xSample", crLoadingHTML);
    RefreshData();
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

function EnableFields() {
    $("#txtCode").enable(true);
    $("#txtDescription").enable(true);
    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);
}

function DisableFields() {
    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);
    $("#txtCode").enable(false);
    $("#txtDescription").enable(false);

}

function EnableFieldsDone() {//Binding Done
    $("#txtCode").enable(false);
    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);
    $("#txtDescription").enable(true);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);

    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox-BindingNavigator").enable(true);

}


function DisableFieldsEmpty() {
    $("#txtCode").enable(false);
    $("#txtDescription").enable(false);
    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);

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
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();

}

function ClearFields() {
    $('#chkBox').prop('checked', true);
    $("#txtCode").val("");
    $("#txtDescription").val("");
}

$(document).on('click', '.BoxClose', function (e) {
    $('.lookupcolSearch').val("");
});


$(document).keyup(function (e) {
    if (e.key === "Escape") {
        $('.lookupcolSearch').val("");
    }
});