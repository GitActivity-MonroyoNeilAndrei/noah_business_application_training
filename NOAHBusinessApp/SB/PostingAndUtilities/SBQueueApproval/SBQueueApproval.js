const pageTitle = "Queue Approval";

let StartIndex = 1,
    SPR_CheckBox = StartIndex,
    SPR_ID = ++StartIndex,
    SPR_SellerCode = ++StartIndex,
    SPR_SellerName = ++StartIndex,
    SPR_CustomerCode = ++StartIndex,
    SPR_CustomerName = ++StartIndex,
    SPR_UnitCode = ++StartIndex,
    SPR_UnitDesc = ++StartIndex,
    SPR_QueueNumber = ++StartIndex;

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

function func_Reload() {
    crLnk = "../SBQueueApproval/SBQueueApproval_Gateway";
    crLnkGateKey = "SBQueueApproval";

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
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to save the current record(s)?", pageTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to delete the current record(s)?", pageTitle, "", indef, enume);
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
    parent_MessageBoxQuestionToolBox("Would you like to process the current record(s)?", pageTitle, "", indef, enume);
    isContinue = false;
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
    nwParameter_Add_Spread(nwGridMainCon_Book);
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
    
}

function EnableFieldsDone() {//Binding Done
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
}

function DisableFieldsEmpty() {
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
}

function ClearFields() {
    
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords === 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}



function nwgrid_PaginationNavDone(gridID) {

}
