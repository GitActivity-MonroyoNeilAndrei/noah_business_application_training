function func_Reload() {  
    crLnk = GetCurrentURL() + "LMSBorrowerType_Gateway";
    crLnkGateKey = "LMSBorrowerType";
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
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    $('#txtCode').focus();
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Would you like to save the current record?", "Borrower Type", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to delete the current record?", "Borrower Type", "", indef, enume);
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
    nwParameter_Add("inCode", $('#idvallugDa').val());
    nwParameter_Add("inTableName", $('#nwTableName').val());
    nwParameter_Add("nwScreenID", $('#nwScreenID').val());

    nwParameter_Add("isChk2P", $("#isChk2P").prop('checked'));
    nwParameter_Add("isChk3P", $("#isChk3P").prop('checked'));
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara(); nwLoading_Start("xLoadingInt", crLoadingHTML);
    nwParameter_Add("txtCode", $("#txtCode").val());
    nwParameter_Add("txtDescription", $("#txtDescription").val());
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xSample", crLoadingHTML);
    js.ADD("RefreshData();");
    func_ActionDriven("actBindCollectionEmpty", false);
}


///////////////////////////////////////

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
    }
}

function EnableFields() {
    $("#txtCode").prop("disabled", false);
    $("#txtDescription").prop("disabled", false);
    $("#isChk2P,#isChk3P").enable(true);
    //$("#cb2P").prop("disabled", false);
    //$("#ccb3P").enable(true);
   
}

function DisableFields() {
    $("#txtCode").prop("disabled", true);
    $("#txtDescription").prop("disabled", true);
    $("#isChk2P,#isChk3P").enable(false);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);

    $("#noah-webui-Toolbox").bindingExport().enable(false);

    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);

}

function EnableFieldsDone() {//Binding Done
    $("#txtCode").prop("disabled", true);
    $("#txtDescription").prop("disabled", false);
    $("#txtDescription").prop("disabled", false);    
    $("#isChk2P,#isChk3P").enable(true);
    
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
}


function DisableFieldsEmpty() {
    $("#txtCode").prop("disabled", true);
    $("#txtDescription").prop("disabled", true);
    
    $("#isChk2P,#isChk3P").enable(false);
    //$("#cb2P").prop("disabled", true);
    //$("#cb3P").enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
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
    $("#isChk2P").prop("checked", true);
    //$("#cb3P").prop("checked", false);
}


$(document).on("keypress", "#txtCode", function (e) {
    var key = e.keyCode;
    if (key == 39 || key == 34 || key == 37) {
        return false;
    }
    else {
        return true;
    }
    nwParameter_Add("key", key);
});

$(document).on("keyup blur", "#txtCode", function (e) {
    var str = $("#txtCode").val();
    var res = str.replace(/'|\"|%/g, "");
    $("#txtCode").val(res);
});

$(document).on("keypress blur", "#txtCode", function (e) {
    if (e.which == 37 || e.which == 39 || e.which == 37)
        return false;
});

