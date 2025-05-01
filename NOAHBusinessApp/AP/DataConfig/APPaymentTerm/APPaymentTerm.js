/// <reference path="APPaymentTerm.cshtml" />
function func_Reload() {
    crLnk = GetCurrentURL() + "APPaymentTerm_Gateway";
    crLnkGateKey = "APPaymentTerm";
    crnwTagSingleBind = true;

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();

    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {

    var isContinue = true;
    ClearFields();
    EnableFields();
    func_Toolbox_Clear();
    $('#txtCode').focus();
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
    nwParameter_Add("Code", $('#txtCode').val());
    nwParameter_Add("txtDescription", $('#txtDescription').val());
    nwParameter_Add("txtNumberOfDays", $('#txtNumberOfDays').val());
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("xBindCollection", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    RefreshData();
}


///////////////////////////////////////
function func_LookUpInitialize(lookupid) {

    cust_GetPara();
}

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
    }

    if (idName == 'lugCode') {
        $("#txtCode").val(getGridData(idNum, 0));
        $("#txtDescription").val(getGridData(idNum, 1));
        $("#txtNumberOfDays").val(getGridData(idNum, 2));
    }

    cust_GetPara();
}

function getGridData(idnum, index) {
    var data = $(`#menuCreatorContainer .tablecontainer table tr:eq(${idnum})`).find(`td:eq(${index})`).text();

    return data;
}

function EnableFields() {
    $("#txtCode").enable(true);
    $("#txtDescription").enable(true);
    $("#txtNumberOfDays").enable(true);
}

function DisableFields() {
    $("#txtCode").enable(false);
    $("#txtDescription").enable(false);
    $("#txtNumberOfDays").enable(false);

}

function EnableFieldsDone() {//Binding Done
    $("#txtCode").enable(false);
    $("#txtDescription").enable(true);
    $("#txtNumberOfDays").enable(true);

    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
}


function DisableFieldsEmpty() {
    $("#txtCode").enable(false);
    $("#txtDescription").enable(false);
    $("#txtNumberOfDays").enable(false);

    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

function ClearFields() {
    $("#txtCode").val("");
    $("#txtDescription").val("");
    $("#txtNumberOfDays").val("");
}
