
const pageTitle = "Basic Information";

function func_Reload() {
    crLnk = "../BasicInformation/BasicInformation_Gateway";
    crLnkGateKey = "BasicInformation";

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();

    return isContinue;
}

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    return isContinue;
}

function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
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
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
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
    
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {

}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xLoading", crLoadingHTML);
    func_ActionDriven("actBindCollectionEmpty", false);
}

function Lookup_DoneFunction(idName, idNum) {
}

function func_LookUpInitialize(idName) {
    
}

function EnableFields() {
    
}

function DisableFields() {
    $("#txtCustName").enable(false);

    $("#txtMobileNo").enable(false);
    $("#txtEmailAdd").enable(false);
    $("#txtPhoneNo").enable(false);

    $("#txtAccNo").enable(false);
    $("#txtAccStats").enable(false);

    $("#txtBaseUnit").enable(false);
    $("#txtBaseUnitDesc").enable(false);
    $("#txtInventType").enable(false);

    $("#txtAddUnit1").enable(false);
    $("#txtAddUnit1Desc").enable(false);
    $("#txtInventType1").enable(false);
}

function EnableFieldsDone() {
    //Binding Done

}

function DisableFieldsEmpty() {
    
}

function ClearFields() {
    
}

function RefreshData() {
    
}

$(document).on("change", "#dpAccNo", function (e) {
    func_ActionDriven("actGetDataDetails", true);
});
