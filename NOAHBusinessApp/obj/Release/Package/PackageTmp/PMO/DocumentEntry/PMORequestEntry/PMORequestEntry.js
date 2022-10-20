baseTitle = "Request Entry";

var nwDocno = '';
function func_Reload() {

    crnwTagSingleBind = true;

    crLnk = "../PMORequestEntry/PMORequestEntry_Gateway";
    crLnkGateKey = "PMORequestEntry";

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();

    return isContinue;
}

////////////////////////// Tool Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;

    MessageBox("New", "Trial");
    parent_MessageBoxQuestionToolBox("New parent message box", baseTitle, "", indef, enume);
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();

    return isContinue;
}

function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    console.log("func_ToolboxSave");
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
    nwParameter_Add("cmbAccNo", $('#cmbAccNo').val());
    nwParameter_Add("cmbRequest", $('#cmbRequest').val());
    nwParameter_Add("cmbTranAct", $('#cmbTranAct').val());

    nwParameter_Add("txtLocation", $('#txtLocation').val());
    nwParameter_Add("txtUnitNo", $('#txtUnitNo').val());
    nwParameter_Add("txtPropDate", $('#txtPropDate').val());
    nwParameter_Add("txtBasisBill", $('#txtBasisBill').val());
    nwParameter_Add("txtConsumptionNo", $('#txtConsumptionNo').val());
    nwParameter_Add("txtSQM", $('#txtSQM').val());
    nwParameter_Add("txtAmount", $('#txtAmount').val());
    nwParameter_Add("txtVATAmount", $('#txtVATAmount').val());
    nwParameter_Add("txtEWTAmount", $('#txtEWTAmount').val());
    nwParameter_Add("txtNETAmount", $('#txtNETAmount').val());
    nwParameter_Add("txtTranNo", $('#txtTranNo').val());
    nwParameter_Add("txtTranDate", $('#txtTranDate').val());
    nwParameter_Add("txtDateSub", $('#txtDateSub').val());
    nwParameter_Add("txtDatePosted", $('#txtDatePosted').val());
    nwParameter_Add("txtRemarks", $('#txtRemarks').val());
    nwParameter_Add("txtDocStatus", $('#txtDocStatus').val());
    nwParameter_Add("txtStatusCode", $('#txtStatusCode').val());

    nwDocno = getParameterByName('nwDocno');
    nwParameter_Add("nwDocno", nwDocno);

    nwParameter_Add("amt", $('#txtAmount').val());
    nwParameter_Add("vat", $('#txtVAT').val());
    nwParameter_Add("cwt", $('#txtCWT').val());
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

function func_WindowCloseTrigger(verID) {
    var isContinue = true;
    var errorResult = "";
    cust_GetPara();

    if (verID == "nwPopUpReqComp") {
        nwParameter_Add("txtTranNo", $('#txtTranNo').val());
        nwLoading_Start("actHasRqrdCompli", crLoadingHTML);
        func_ActionDriven('actHasRqrdCompli', false);
    }
    return isContinue;
}
///////////////////////////////////////

function EnableFields() { //Upon New
    $('#cmbTranAct').prop('disabled', false);
    $('#cmbRequest').prop('disabled', false);
    $('#cmbAccNo').prop('disabled', false);
    $('#txtPropDate').enable(true);
    $('#txtRemarks').enable(true);
    
    $('#btnReviewAttachment').enable(true);
    $('#btnReqCompliance').enable(true);
    //addbtnColorClass
}

function DisableFields() { //Upon New
    $('#cmbTranAct').prop('disabled', true);
    $('#cmbRequest').prop('disabled', true);
    $('#cmbAccNo').prop('disabled', true);
    $('#txtPropDate').enable(false);
    $('#txtRemarks').enable(false);

    $('#btnReviewAttachment').enable(false);
    $('#btnReqCompliance').enable(false);
}

function EnableFieldsDone() { //Upon Refresh where record > 0   
    $('#cmbTranAct').prop('disabled', true);
    $('#cmbRequest').prop('disabled', true);
    $('#cmbAccNo').prop('disabled', true);
    $('#txtPropDate').enable(false);
    $('#txtRemarks').enable(true);

    $('#btnReviewAttachment').enable(true);
    $('#btnReqCompliance').enable(true);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
}

function DisableFieldsEmpty() { //Upon Refresh where record < 0
    $('#cmbTranAct').prop('disabled', true);
    $('#cmbRequest').prop('disabled', true);
    $('#cmbAccNo').prop('disabled', true);
    $('#txtPropDate').enable(false);
    $('#txtRemarks').enable(false);

    $('#btnReviewAttachment').enable(false);
    $('#btnReqCompliance').enable(false);


    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);

}

function ClearFields() {
    $('.clr').val("");
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
    }
    else {
        $("#noah-webui-Toolbox").bindingDelete().enable(true);
        $("#noah-webui-Toolbox").bindingSave().enable(true);
    }
}

///////////////////////////////////////

$(document).on("change", "#cmbAccNo", function (e) {

    var accNo = $('#cmbAccNo').val();
    nwParameter_Add("cmbAccNo", accNo);

    func_ActionDriven("load_defaults", false);

});

$(document).on("change", "#cmbRequest", function (e) {

    var req = $('#cmbRequest').val();
    nwParameter_Add("cmbRequest", req);
    
    func_ActionDriven("load_defaultsX", false);

});

$(document).on("change", "#txtSQM", function (e) {  //Cost Per unit

    var ConNo = $('#txtConsumptionNo').val();
    var CostU = $('#txtSQM').val();
    
    if (ConNo != "" & CostU != "") {
        var amt = ConNo * CostU;
        $('#txtAmount').val(amt);
    }

});

$(document).on("change", "#txtConsumptionNo", function (e) {  //No of Consumption

    var ConNo = $('#txtConsumptionNo').val();
    var CostU = $('#txtSQM').val();
    
    var amt = ConNo * CostU;
    $('#txtAmount').val(amt);

    nwParameter_Add("amt", $('#txtAmount').val());
    nwParameter_Add("vat", $('#txtVAT').val());
    nwParameter_Add("cwt", $('#txtCWT').val());

    func_ActionDriven("load_fromAmt", false);
});

$(document).on("change", "#txtAmount", function (e) {  // Amount

    try {
        nwParameter_Add("amt", $('#txtAmount').val());
        nwParameter_Add("vat", $('#txtVAT').val());
        nwParameter_Add("cwt", $('#txtCWT').val());

        func_ActionDriven("load_fromAmt", false);
        console.log("clicked");
    } catch (e) {
        console.log(e.toString());
    }
});

$(document).on("change", "#txtConsump", function (e) {  // Enable No of consumption Trigger

    var value = $('#txtConsump').val();
   
    if (value == 1) {
        $('#txtConsumptionNo').enable(true);
    } else {
        $('#txtConsumptionNo').enable(false);
        $('#txtConsumptionNo').val(value);
    }

});

$(document).on("click", "#btnReqCompliance", function (e) {
    getcmbParams();
    var trantype = getParameterByName('cmbTranAct_code');
    var docno = $('#txtTranNo').val();
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
    $("#nwPopUpReqComp").css({ "min-width": "80%" });
    $("#nwPopUpReqComp").css({ "min-height": "80%" });
    nwPopupForm_ShowModal("nwPopUpReqComp");
    nwLoading_End('btnReqCompliance');
});

///////////////////////////////////////

function LoadfromReq() {
    ////
    var value = $('#txtConsump').val();

    if (value == 1) {
        $('#txtConsumptionNo').enable(true);
    } else {
        $('#txtConsumptionNo').enable(false);
        $('#txtConsumptionNo').val(value);
    }
    ////
    var ConNo = $('#txtConsumptionNo').val();
    var CostU = $('#txtSQM').val();

    if (ConNo != "" & CostU != "") {
        var amtValue = ConNo * CostU;
        $('#txtAmount').val(amtValue);
    }
    ////
    nwParameter_Add("amt", $('#txtAmount').val());
    nwParameter_Add("vat", $('#txtVAT').val());
    nwParameter_Add("cwt", $('#txtCWT').val());

    func_ActionDriven("load_fromAmt", false);
}

/////////////Custom for ToolBox
function thismethod() {
    console.log("onclick method");

    msgBoxContainerQuestion = "btnSaveCustom";
    parent_MessageBoxQuestion("Would you like to save the current record?", baseTitle, "Question");
    return true;
}

function msgBoxContainerQuestionF(genID, answer) {

    if (genID == "btnSaveCustom") {
        if (answer == "Yes") {
            cust_GetPara();
            func_ActionDriven("saveBtn_func", false);
        }
    }
}