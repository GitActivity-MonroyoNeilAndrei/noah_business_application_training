baseTitle = "Request Entry";
modaltitle = baseTitle;

var nwDocno = '';
let btnNext = false;
let lastAction;

function func_Reload() {

    crLnk = GetCurrentURL() +"PMORequestEntry_Gateway";
    crLnkGateKey = "PMORequestEntry";
    crnwTagSingleBind = true;
    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    ClearFields();


    nwParameter_Add("nwtku", getParameterByName("nwtku"));
    nwParameter_Add("fromHist", getParameterByName("isView"));
    nwParameter_Add("fromDocno", getParameterByName("docno"));

    func_ActionDriven("actLoadDefaults", false);
    nwLoading_Start("actLoadDefaults", crLoadingHTML);

    return isContinue;
}

////////////////////////// Tool Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;

    nwParameter_Add("nwtku", getParameterByName("nwtku"));
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
    nwParameter_Add("nwtku", getParameterByName("nwtku"));
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
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

    nwParameter_Add("nwtku", getParameterByName("nwtku"));
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
    $('#dpPropDate').enable(true);
    $('#txtRemarks').enable(true);
    $('#txtNoConsumption').enable(true);

    $("#noah-webui-Toolbox").bindingProcess().enable(false);
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


function Lookup_DoneFunction(idName, idNum) {

    var blank = "";

    if (idName == 'toolboxInquire') {
        nwParameter_Add("txtTrasactionNo", getLookupData(idNum, 0));
    }
    func_ActionDriven("actLoadBindings", false);
}

function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
}

$(document).on("change", "#txtSQM", function (e) {  //Cost Per unit

    var ConNo = $('#txtConsumptionNo').val();
    var CostU = $('#txtSQM').val();
    
    if (ConNo != "" & CostU != "") {
        var amt = ConNo * CostU;
        $('#txtAmount').val(amt);
    }
});

$(document).on("change", "#txtConsumptionNo", function (e) {  //No of Consumption

    //compAMT();
});

//$(document).on("change", "#txtAmount", function (e) {  // Amount

//    try {
//        nwParameter_Add("amt", $('#txtAmount').val());
//        nwParameter_Add("vat", $('#txtVAT').val());
//        nwParameter_Add("cwt", $('#txtCWT').val());

//        func_ActionDriven("actFromAmt", false);
//        console.log("clicked");
//    } catch (e) {
//        console.log(e.toString());
//    }
//});

$(document).on("click", "#btnReqCompliance", function (e) {
    const btnDisabled = $(this).hasClass('cst-dis');

    if (!btnDisabled) {
        var trantype = $('#cmbTranAct').val();
        var docno = $('#txtTranNo').val();
        var status = $('#txtStatusCode').val();
        nwDocno = "";//getParameterByName('nwDocno');

        if (status == "3" || nwDocno != "") {
            var fullength = GetCurrentURL() + "../DCRequirementCompliance?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=true&nkpop=y";
            //var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=true";

        } else {
            var fullength = GetCurrentURL() + "../DCRequirementCompliance?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=false&nkpop=y";
            //var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=false";
        }

        nwLoading_Start('btnReqCompliance', crLoadingHTML);
        nwPopupForm_Create("nwPopUpReqComp", true, fullength);
        $('#nwPopUpReqComp .BoxTitle').text("Requirements Compliance");
        $("#nwPopUpReqComp").css({ "min-width": "80%" });
        $("#nwPopUpReqComp").css({ "min-height": "80%" });
        nwPopupForm_ShowModal("nwPopUpReqComp");
        nwLoading_End('btnReqCompliance');
    }
});

///////////////////////////////////////

function LoadfromReq() {
    ////

    console.log("loadfromreq");
    var value = $('#txtConsump').val();

    if (value == 1 || value == 5) {
        $('#txtNoConsumption').enable(true);
        $('#txtNoConsumption').val(0);
    } else {
        $('#txtNoConsumption').enable(false);
        $('#txtNoConsumption').val(1);
    }
}

function compAMT() {
    var ConNo = $('#txtNoConsumption').val();
    var CostU = $('#txtSQM').val();

    if (ConNo != "" && CostU != "") {
        var amtValue = ConNo * CostU;
        $('#txtAmount').val(amtValue.toFixed(2));
    }

    nwParameter_Add("amt", $('#txtAmount').val());
    nwParameter_Add("vat", $('#txtVAT').val());
    nwParameter_Add("cwt", $('#txtCWT').val());

    nwLoading_Start('actFromAmt', crLoadingHTML);
    func_ActionDriven("actFromAmt", false);
}

var genID;
function msgBoxContainerQuestionF(genID, answer) {

    if (answer == "Yes") {

        if (PromptID == "SaveDraft") {
            cust_GetPara();
            nwLoading_Start('actSave', crLoadingHTML);
            func_ActionDriven("actSave", false);
        }
        if (PromptID == "ProcessData") {
            var value = $('#txtTranNo').val();
            cust_GetPara();

            if (value == "") {
                nwLoading_Start('actOnlyProcess', crLoadingHTML);
                func_ActionDriven("actOnlyProcess", false);
            }
            else {
                nwLoading_Start('actProcess', crLoadingHTML);
                func_ActionDriven("actProcess", false)
            }
        }

        if (PromptID == "Cancel") {
            cust_GetPara();
            nwLoading_Start('actCancelRequest', crLoadingHTML);
            func_ActionDriven("actCancelRequest", false);
        }
    }
}

function disableTranTypeSelection() {
    $('#viewingRemarks').removeClass('nwHide');

    const pop = getParameterByName("isView");
    if (pop == "true") { }
    else {
        $('#okay-button').removeClass('nwHide');
    }

    $('#cancel-button').removeClass('nwHide');

    lastAction = "SaveDraft";

    $('#btnReqCompliance').removeClass('cst-dis');
    $('#btnReqCompliance').addClass('cst');

    $('#savedColumn').removeClass('nwHide');
}

function showTransactionNo() {
    $('#viewingRemarks').removeClass('nwHide');
    $('#cancel-button').removeClass('nwHide');

    let docno = $('#txtDocno').val();
    lastAction = "SaveDone";
    MessageBox("Entry has been Saved as Draft", "Service Entry", "");
}


function changeButton() {
    lastAction = "SaveDraft";

    $('#viewingRemarks').removeClass('nwHide');
    $('#cancel-button').removeClass('nwHide');
    $('#savedColumn').removeClass('nwHide');

    const pop = getParameterByName("isView");
    if (pop == "true") { }
    else {
        $('#okay-button').removeClass('nwHide');
    }

    $('#saveDraft-button').html('Save Changes');
    $('#process-button').addClass('nwHide');
    ///$('#back-button').addClass('nwHide');

    let docno = $('#txtTranNo').val();
    MessageBox("Your entry has been submitted.\n Transaction No.\n" + docno, "Service Entry", "");
}

function SaveDraft(indef, enume) {
    //var isContinue = true;
    cust_GetPara();
    PromptID = "SaveDraft";
    MessageBoxQuestion("Do you want to save the current record?", "Service Entry", "");
    isContinue = false;

    //return isContinue;
}

function CancelTransaction(indef, enume) {
    cust_GetPara();
    PromptID = "Cancel";
    MessageBoxQuestion("Do you want to cancel the current request?", "Service Entry", "");
    isContinue = false;
    //return isContinue;
}

function SaveDone(indef, enume) {
    //var isContinue = true;
    PromptID = "SaveDone";
    var savenwDocno = $('#txtDocno').val();
    MessageBox("Entry has been Saved as Draft", "Service Entry", "error");
    //MessageBox("Your entry has been submitted.\nTransaction No.\n" + savenwDocno + ".", "Service Entry", "error");
    isContinue = false;

    //return isContinue;
}

function ProcessData(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    PromptID = "ProcessData";
    MessageBoxQuestion("Do you want to process the current record?", "Service Entry", "");
    isContinue = false;

    return isContinue;
}


function hideOkButton() {
    const isView = getParameterByName("isView");
    $('#btnReqCompliance').removeClass('cst-dis');
    $('#btnReqCompliance').addClass('cst');

    if (isView != "true") {
        $('#okay-button').removeClass('nwHide');

        let docStat = $('#txtDocStatCode').val();

        if ((docStat != "1" && docStat != "2") && docStat != "") {

            $('#back-button').addClass('nwHide');
        }
    }
}

$(document).ready(function () {
    $('#next-button').click(function () {
        if (btnNext == true) {
            compAMT();
            //cust_GetPara();
            var currentContainer = $('.cst-container.active');
            var nextContainer = currentContainer.next('.cst-container');

            currentContainer.removeClass('active');
            nextContainer.addClass('active');

            var currentHeader = $('.cst-hrd-wrap.active');
            var nextHeader = currentHeader.next('.cst-hrd-wrap');

            currentHeader.removeClass('active');
            nextHeader.addClass('active');
        }
    });

    $('#back-button').click(function () {
        let docStat = $('#txtDocStatCode').val();

        if ((docStat != "1" && docStat != "2") && docStat != "") {
            //redirectLink();
        } else {
            if (docStat == "2") {
                $('#cmbTranAct').prop('disabled', true);
            }

            var currentContainer = $('.cst-container.active');
            var prevContainer = currentContainer.prev('.cst-container');

            currentContainer.removeClass('active');
            prevContainer.addClass('active');

            var currentHeader = $('.cst-hrd-wrap.active');
            var prevHeader = currentHeader.prev('.cst-hrd-wrap');

            currentHeader.removeClass('active');
            prevHeader.addClass('active');
        }
    });

    $('#saveDraft-button').click(function () {
        cust_GetPara();
        SaveDraft();
    });

    $('#process-button').click(function () {
        cust_GetPara();
        ProcessData();
    });

    $('#cancel-button').click(function () {
        CancelTransaction();
    });

    $('#okay-button').click(function () {
        redirectLink();
    });
});



function manageTranButtons(saveType) {
    $('#savedColumn').removeClass('nwHide');

    let reqDesc = $("#cmbRequest option:selected").text();
    $('#txtRequestDesc').val(reqDesc);

    if (saveType != "1" && saveType != "2") {
        $('#saveControlsGrp').addClass("nwHide");
        $('#back-button').addClass('nwHide');
        $('#formTitle').addClass('nwHide');
        
    } else {
        if (saveType == "2") {
            $('#saveDraft-button').html("Save Changes");
            $('#process-button').addClass('nwHide');
        }
    }

    $('#viewingRemarks').removeClass("nwHide");
    $('#cancel-button').removeClass('nwHide');

    $('#btnReqCompliance').prop('disabled', false);
    $('#btnReqCompliance').removeClass('cst-dis');
    $('#btnReqCompliance').addClass('cst');

    $('#next-button').addClass('btn-default-darkblue');
    $('#next-button').removeClass('cst-dis');

    const pop = getParameterByName("isView");

    btnNext = true;
    $('#next-button').click();
}

function Message_Ok() {
    switch (lastAction) {
        case "SaveDraft":
            Message_close();
            break;
        case "SaveDone":
            Message_close();
            //redirectLink();
            break;
        default:
            Message_close();
            break;
    }

    lastAction = "";
}

function redirectLink() {
    let nwtku = getParameterByName("nwtku");
    let nsc = getParameterByName("nsc");
    var redirectURL = "";

    if (nwtku != "")
        redirectURL = GetCurrentURL() + "../PMOTransaction_History?nwtku=" + nwtku + "&nsc=" + nsc + "&nkpop=y&nkmob=y";
    else
        redirectURL = GetCurrentURL() + "../PMOTransaction_History";

    location.href = redirectURL;
}


function cancelDone() {
    lastAction = "Cancel";

    $('#saveControlsGrp').addClass('nwHide');
    $('#back-button').addClass('nwHide');

    nwLoading_End('actCancelRequest');

    let docno = $('#txtTranNo').val();
    MessageBox("Your request with Transaction No. " + docno + " has been cancelled.", "Service Entry", "");
}

$(document).on("change", "#cmbTranAct", function (e) {
    var value = $('#cmbTranAct').val();

    if (value != "") {
        $('#txtBasisDesc').val();
        $('#txtNoConsumption').val();
        nwParameter_Add("cmbTranSelected", value);
        func_ActionDriven("actGetRequests", true);
    } else {
        var x = $('#cmbRequest');
        x.empty();
    }

    checkEmptyFields();
});

$(document).on("change", "#cmbRequest", function (e) {

    var req = $('#cmbRequest').val();
    var reqDesc = $('#cmbRequest :selected').text();
    var cosum = $('#txtNoConsumption').val();

    $('#txtConsumptionNo').val(cosum);
    $('#txtRequestDesc').val(reqDesc);

    nwParameter_Add("cmbReq", req);
    nwParameter_Add("nwtku", getParameterByName("nwtku"));
    func_ActionDriven("actGetDataDetails", false);
    checkEmptyFields();
    //compAMT();
});

$(document).on("change", "#txtNoConsumption", function (e) {
    var cosum1 = $('#txtNoConsumption').val();
    $('#txtConsumptionNo').val(cosum1);
    //compAMT();
    checkEmptyFields();
});

$(document).on('change', '#txtPropDate', function () {
    var selectedDate = $(this).val();
    var today = new Date().toLocaleDateString();

    if (Date.parse(selectedDate) < Date.parse(today)) {
        MessageBox("Cannot proceed. Date should not be earlier today.\n", modaltitle, "error");
        $(this).val("");
        return false;
    }
    $('#txtPropdateDesc').val(selectedDate);
    checkEmptyFields();
});

$(document).on("blur", "#txtNoConsumption", function (e) {
    checkEmptyFields();
});

$(document).on("blur", "#txtRemarks", function (e) {
    checkEmptyFields();
});

function checkEmptyFields() {
    var cmbTran = $('#cmbTranAct').val();
    var cmbReq = $('#cmbRequest').val();
    var dpPropDate = $('#txtPropDate').val();
    var txtNoConsump = $('#txtNoConsumption').val();
    var txtRemarks = $('#txtRemarks').val();

    let errCtr = 0;
    errCtr = (cmbTran == "" || cmbTran == null) ? ++errCtr : errCtr;
    errCtr = (cmbReq == "" || cmbReq == null) ? ++errCtr : errCtr;
    errCtr = (dpPropDate == "" || dpPropDate == null) ? ++errCtr : errCtr;
    errCtr = (txtNoConsump == "" || txtNoConsump == 0 || txtNoConsump == null) ? ++errCtr : errCtr;
    errCtr = (txtRemarks == "" || txtRemarks == null) ? ++errCtr : errCtr;

    //console.log(errCtr, cmbTran, cmbReq, dpPropDate, txtNoConsump, txtRemarks);

    if (errCtr == 0) {
        var element = document.getElementById("next-button");
        element.classList.add("btn-default-darkblue");
        element.classList.remove("cst-dis");
        
        $('#txtConsumptionNo').val($('#txtNoConsumption').val());

        btnNext = true;
    } else {
        var element = document.getElementById("next-button");
        element.classList.add("cst-dis");
        element.classList.remove("btn-default-darkblue");
        btnNext = false;
    }
}