baseTitle = "Other Requests";

var nwDocno = '';
let showSummary = false;
let lastAction;

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

var nwGridMainCon_Book_AddOns;
var nwGridMainCon_Sheet_AddOns;

var nwGridMainCon_Book_Workers;
var nwGridMainCon_Sheet_Workers;

var nwGridMainCon_Book_ToolsMats;
var nwGridMainCon_Sheet_ToolsMats;

var
/* Addons */
    SPR_Addon_AddonItemCode = 1,
    SPR_Addon_AddonItemDesc = 2,
    SPR_Addon_Qty = 3,
    SPR_Addon_UOMCode = 4;

function func_Reload() {

    crLnk = GetCurrentURL() +"PMOOtherRequest_Gateway";
    crLnkGateKey = "PMOOtherRequest";

    crnwTagSingleBind = true;
    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    //DisableFields();

    nwParameter_Add("fromHist", getParameterByName("isView"));
    nwParameter_Add("fromDocno", getParameterByName("docno"));
    nwParameter_Add("tranType", getParameterByName("tt"));
    nwParameter_Add("nwtku", getParameterByName("nwtku"));
    func_ActionDriven("actOnLoading", false);

    return isContinue;
}

////////////////////////// Tool Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;

    //MessageBox("New", "Trial");
    //parent_MessageBoxQuestionToolBox("New parent message box", baseTitle, "", indef, enume);
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
    nwParameter_Add("nwtku", getParameterByName("nwtku"));
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
    nwParameter_Add("txtAccNo", $('#txtAccNo').val());
    //nwParameter_Add("cmbRequest", $('#cmbRequest').val());
    nwParameter_Add("cmbTranAct", $('#cmbTranAct').val());

    nwParameter_Add("txtDeliveryDate", $('#txtDeliveryDate').val());
    nwParameter_Add("txtDeliveryTime", $('#txtDeliveryTime').val());
    nwParameter_Add("nwtku", getParameterByName("nwtku"));

    nwParameter_Add("txtLocation", $('#txtLocation').val());
    nwParameter_Add("txtUnitNo", $('#txtUnitNo').val());
    nwParameter_Add("txtPropDate", $('#txtPropDate').val());

    nwParameter_Add("txtTenantName", $('#txtTenantName').val());
    nwParameter_Add("cmbDelivery", $('#cmbDelivery').val());
    nwParameter_Add("txtCarrier", $('#txtCarrier').val());
    nwParameter_Add("txtMoveIndate", $('#txtMoveIndate').val());
    nwParameter_Add("cmbUnitType", $('#cmbUnitType').val());

    nwParameter_Add("chkAccount", $('#chkAccount').is(":checked"));
    nwParameter_Add("chkCopyOfLease", $('#chkCopyOfLease').is(":checked"));
    nwParameter_Add("chkResidentInfo", $('#chkResidentInfo').is(":checked"));
    nwParameter_Add("chkOrientation", $('#chkOrientation').is(":checked"));
    nwParameter_Add("chkInformation", $('#chkInformation').is(":checked"));
    nwParameter_Add("chkEnsureFire", $('#chkEnsureFire').is(":checked"));
    nwParameter_Add("chkSprinkler", $('#chkSprinkler').is(":checked"));
    nwParameter_Add("chkPhoto", $('#chkPhoto').is(":checked"));
    nwParameter_Add("chkWorkPer", $('#chkWorkPer').is(":checked"));
    nwParameter_Add("chkAmenitiesRoom", $('#chkAmenitiesRoom').is(":checked"));
    nwParameter_Add("chkConcernSlip", $('#chkConcernSlip').is(":checked"));
    nwParameter_Add("chkGatePass", $('#chkGatePass').is(":checked"));
    nwParameter_Add("chkAssoc", $('#chkAssoc').is(":checked"));
    nwParameter_Add("chkPark", $('#chkPark').is(":checked"));
    nwParameter_Add("chkWater", $('#chkWater').is(":checked"));
    nwParameter_Add("chkElec", $('#chkElec').is(":checked"));
    nwParameter_Add("chkAmen", $('#chkAmen').is(":checked"));
    nwParameter_Add("chkViol", $('#chkViol').is(":checked"));

    nwParameter_Add("txtTenantFullName", $('#txtTenantFullName').val());
    nwParameter_Add("txtMoveOutDate", $('#txtMoveOutDate').val());

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

    try {
        nwParameter_Add_DataSet("nwGridAddOn"); //nwGridAddOnCon
    } catch (ex) {
        //console.log(ex);
    }

    nwParameter_Add("txtResidentName", $('#txtResidentName').val());
    nwParameter_Add("txtWPUnitNo", $('#txtWPUnitNo').val());
    nwParameter_Add("txtUnitFloor", $('#txtUnitFloor').val());
    nwParameter_Add("txtPersonInCharge", $('#txtPersonInCharge').val());
    nwParameter_Add("dpPermitDate", $('#dpPermitDate').val());
    nwParameter_Add("txtTelNumber", $('#txtTelNumber').val());
    nwParameter_Add("dpPermitDate", $('#dpPermitDate').val());

    nwParameter_Add("natureWork", $('#cmbNatWork').val());
    nwParameter_Add("natOthersDesc", $('#natOthersDesc').val());

    nwParameter_Add("schedStartDate", $('#schedStartDate').val());
    nwParameter_Add("schedEndDate", $('#schedEndDate').val());
    nwParameter_Add("schedStartTime", $('#schedStartTime').val());
    nwParameter_Add("schedEndTime", $('#schedEndTime').val());
    nwParameter_Add("schedWorkDesc", $('#schedWorkDesc').val());

    nwParameter_Add("requestedBy", $('#requestedBy').val());
    nwParameter_Add("endorsedBy", $('#endorsedBy').val());
    nwParameter_Add("notedBy", $('#notedBy').val());
    nwParameter_Add("approvedBy", $('#approvedBy').val());

    try {
        nwParameter_Add_DataSet("nwGridWorkers"); //nwGridAddOnCon
    } catch (ex) {
        //console.log(ex);
    }

    try {
        nwParameter_Add_DataSet("nwGridMaterials"); //nwGridAddOnCon
    } catch (ex) {
        //console.log(ex);
    }

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
    $('.chk').prop('checked', false);
    $(".detailsTab").hide()
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
    func_ActionDriven("loadBindings", false);
}

function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
}
///////////////////////////////////////

function CreatedGridDone() {
    setTimeout(function () {
        try {
            nwGridMainCon_Book_AddOns.ActiveSheet.SetObjectType(4, Spread_ALLCOL, "buttonflat");
            nwGridMainCon_Book_AddOns.SetThemes(P8Themes.FANCY);
            nwGridMainCon_Book_AddOns.ActiveSheet.RenderStatus = true;
        } catch (err) {}

        try {
            nwGridMainCon_Book_Workers.ActiveSheet.SetObjectType(4, Spread_ALLCOL, "buttonflat");
            nwGridMainCon_Book_Workers.SetThemes(P8Themes.FANCY);
            nwGridMainCon_Book_Workers.ActiveSheet.RenderStatus = true;
        } catch (err) {}

        try {
            nwGridMainCon_Book_ToolsMats.ActiveSheet.SetObjectType(4, Spread_ALLCOL, "buttonflat");
            nwGridMainCon_Book_ToolsMats.SetThemes(P8Themes.FANCY);
            nwGridMainCon_Book_ToolsMats.ActiveSheet.RenderStatus = true;
        } catch (err) {}
    }, 1);
}

$(document).on("change", "#cmbAccNo", function (e) {

    var accNo = $('#cmbAccNo').val();
    nwParameter_Add("cmbAccNo", accNo);

    func_ActionDriven("load_defaults", false);

});

$(document).on("change", "#cmbRequest", function (e) {

    var req = $('#cmbRequest').val();
    nwParameter_Add("cmbRequest", req);
    func_ActionDriven("load_defaultsX", false);
    //func_ActionDriven("actGetDataDetails", true);
});

$(document).on("change", "#txtSQM", function (e) {  //Cost Per unit

    var ConNo = $('#txtConsumptionNo').val();
    var CostU = $('#txtSQM').val();
    
    if (ConNo != "" & CostU != "") {
        var amt = ConNo * CostU;
        $('#txtAmount').val(amt);
    }

});



$(document).on("click", "#btnReqCompliance", function (e) {
    const btnDisabled = $(this).hasClass('cst-dis');

    if (!btnDisabled) {
        var trantype = $('#cmbTranAct').val();
        var docno = $('#txtTranNo').val();
        var status = $('#txtDocStatus').val();
        nwDocno = getParameterByName('nwDocno');

        if (status == "3" || nwDocno != "") {
            var fullength = GetCurrentURL() + "../DCRequirementCompliance?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=true";
            //var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=true";

        } else {
            var fullength = GetCurrentURL() + "../DCRequirementCompliance?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=false";
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

//function AddGridTheme() {
//    //mSpreadBook.ActiveSheet.SetObjectType(4, Spread_ALLCOL, "buttonflat");
//    mSpreadBook.SetThemes(P8Themes.FANCY);
//    //mSpreadBook.ActiveSheet.SetObjectType(4, Spread_ALLCOL, "buttonflat");
//}


function goToSummary() {
    var currentContainer = $('.cst-container.active');
    var nextContainer = currentContainer.next('.cst-container');

    currentContainer.removeClass('active');
    nextContainer.addClass('active');

    var currentHeader = $('.cst-hrd-wrap.active');
    var nextHeader = currentHeader.next('.cst-hrd-wrap');

    currentHeader.removeClass('active');
    nextHeader.addClass('active');
}


let gridGenerated = false;
let wpGridsOk = false;

$(document).ready(function () {
    $('#next-button').click(function () {
        var dpTransact = $('#cmbTranAct').val();

        switch(dpTransact){
            case "WRKPMT":
                checkWorkPermitFields();
                break;
            case "REQGAP":
                checkGatePassFields();
                break;
            default:
                let noEmptyFields = checkEmptyFields();

                if (noEmptyFields) {
                    goToSummary();
                } else {
                    var msgBox = new GenLib.MessageBox("Error");
                    msgBox.message = "Please complete all fields!";
                    msgBox.title = baseTitle;
                    msgBox.buttonOk = function () {
                        return true;
                    };
                    msgBox.Show();
                    //MessageBox("Please Complete all Fields!", baseTitle, "error", "");
                }
                break;
        }
    });

    $('#back-button').click(function () {
        let isView = getParameterByName("isView");

        if (isView == "true") {
            const tt = getParameterByName("tt");

            if (tt == "WRKPMT") {
                if (wpGridsOk == false) {
                    showWPGrids();
                    wpGridsOk = true;
                }
            } else {
                if (gridGenerated == false) {

                    nwParameter_Add("txtTranNo", $('#txtTranNo').val());
                    func_ActionDriven('actShowGridGatePass', false);

                    gridGenerated = true;
                }
            }
            returnToFillOut();
        } else {
            returnToFillOut();
        }
    });

    $('#okay-button').click(function () {
        redirectLink();
    });

    $('#buttonProcess').click(function () {
        cust_GetPara();
        ProcessData();
    });

    $('#cancel-button').click(function () {
        CancelTransaction();
    });
});

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

function returnToFillOut() {
    var currentContainer = $('.cst-container.active');
    var prevContainer = currentContainer.prev('.cst-container');

    currentContainer.removeClass('active');
    prevContainer.addClass('active');

    var currentHeader = $('.cst-hrd-wrap.active');
    var prevHeader = currentHeader.prev('.cst-hrd-wrap');

    currentHeader.removeClass('active');
    prevHeader.addClass('active');
}


$(document).ready(function () {
    $('#cmbTranAct').on('change', function () {
        var selectedValue = $(this).val(); // Get the selected value

        selectedValue = getTransDesc(selectedValue);
        // Remove any previously added classes from .cst-st-container
        $('.cst-st-container').removeClass('selected');

        // Add the 'selected' class to the parent container based on the selected value
        $('.cst-tx').each(function () {
            var text = $(this).text();
            if (text === selectedValue) {
                $(this).parent('.cst-st-container').addClass('selected');
            }
        });

        var dpTransact = $('#cmbTranAct').val();

        switch (dpTransact) {
            case "REQGAP": {
                $('#txtTranType').val(selectedValue);

                nwParameter_Add('txtTranNo', '');
                nwParameter_Add("nwtku", getParameterByName("nwtku"));

                func_ActionDriven('actShowGridGatePass', false)
                nwLoading_Start('actShowGridGatePass', crLoadingHTML);
                break;
            }

            case "REQMOI": {
                $('#txtTranType').val(selectedValue);
                nwParameter_Add("nwtku", getParameterByName("nwtku"));
                break;
            }

            case "REQMOO": {
                $('#txtTranType').val(selectedValue);
                nwParameter_Add("nwtku", getParameterByName("nwtku"));
                break;
            }

            case "WRKPMT": {
                $('#txtTranType').val(selectedValue);

                nwParameter_Add('txtTranNo', '');
                nwParameter_Add("nwtku", getParameterByName("nwtku"));

                showWPGrids();
                break;
            }
                
        }
    });

    $('#buttonSave').click(function () {

        var dpTransact = $('#cmbTranAct').val();

            switch (dpTransact) {
                case "REQGAP":
                    cust_GetPara();
                    SaveDraft();
                    break;
                case "REQMOI":
                    cust_GetPara();
                    SaveDraft();
                    return "Move In";
                    break;
                case "REQMOO":
                    cust_GetPara();
                    SaveDraft();
                    return "Move Out";
                    break;
                case "WRKPMT":
                    cust_GetPara();
                    SaveDraft();
                    return "Work Permit";
                    break;
            }

       
    });

    $('#dpPermitDate').change(function () {
        var selectedDate = $(this).val();
        var today = new Date().toLocaleDateString();

        if (Date.parse(selectedDate) < Date.parse(today)) {
            MessageBox("Cannot proceed. Date should not be earlier today.\n", baseTitle, "error", "");
            $(this).val("");
            return false;
        }
    });

    $('#schedStartDate').change(function () {
        var selectedDate = $(this).val();
        var today = new Date().toLocaleDateString();

        if (Date.parse(selectedDate) < Date.parse(today)) {
            MessageBox("Cannot proceed. Date should not be earlier today.\n", baseTitle, "error", "");
            $(this).val("");
            return false;
        } else {
            $('#txtPropDate').val(selectedDate);
        }
    });

    $('#schedEndDate').change(function () {
        var selectedDate = $(this).val();
        var today = new Date().toLocaleDateString();

        if (Date.parse(selectedDate) < Date.parse(today)) {
            MessageBox("Cannot proceed. Date should not be earlier today.\n", baseTitle, "error", "");
            $(this).val("");
            return false;
        }
    });

    //$("#natWorkGrp").on("click", "input[type=checkbox]", clickCB);

});

function showWPGrids() {
    nwParameter_Add("tranType", $('#cmbTranAct').val());
    nwParameter_Add("txtTranNo", $('#txtTranNo').val());
    func_ActionDriven('actShowGridWorkPermit', false)
    nwLoading_Start('actShowGridWorkPermit', crLoadingHTML);

    nwParameter_Add("tranType", $('#cmbTranAct').val());
    nwParameter_Add("txtTranNo", $('#txtTranNo').val());
    func_ActionDriven('actShowGridWorkPermit2', false)
    nwLoading_Start('actShowGridWorkPermit2', crLoadingHTML);
}

function SaveDraft(indef, enume) {
    var isContinue = true;
    PromptID = "SaveDraft";
    MessageBoxQuestion("Do you want to save the current record?", "Service Entry", "");
    isContinue = false;

    return isContinue;
}

function ProcessData(indef, enume) {
    var isContinue = true;
    PromptID = "ProcessData";
    MessageBoxQuestion("Do you want to process the current record?", "Service Entry", "");
    isContinue = false;

    return isContinue;
}

function CancelTransaction(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    PromptID = "Cancel";
    MessageBoxQuestion("Do you want to cancel the current request?", "Service Entry", "");
    isContinue = false;

    return isContinue;
}

function showTransactionNo() {
    nwLoading_End('saveBtn_func');

    let docno = $('#txtTranNo').val();
    lastAction = "SaveDone";
    MessageBox("Your entry has been saved.", "Service Entry", "");
}

function disableTranTypeSelection() {
    nwLoading_End('saveBtn_func');

    lastAction = "SaveDraft";

    $('.nwgridButtons').find('.nwgrid_Delete').prop('disabled', true);
    $('#btnReqCompliance').removeClass('cst-dis');
    $('#btnReqCompliance').addClass('cst');
    $('#savedColumn').removeClass('nwHide');
    $('#cancel-button').removeClass('nwHide');

    const pop = getParameterByName("isView");
    if (pop == "true") { }
    else {
        $('#okay-button').removeClass('nwHide');
    }
}

function changeButton() {
    lastAction = "SaveDraft";

    const pop = getParameterByName("isView");
    if (pop == "true") { }
    else {
        $('#okay-button').removeClass('nwHide');
    }

    $('#buttonProcess').addClass('nwHide');
    $('#buttonSave').html('Save Changes');

    $('#cmbTranAct').prop('disabled', true);

    nwLoading_End('saveBtn_func');

    let docno = $('#txtTranNo').val();
    MessageBox("Your entry has been submitted.\n Transaction No.\n" + docno, "Service Entry", "");
}

function msgBoxContainerQuestionF(genID, answer) {

    if (answer == "Yes") {
        
        if (PromptID == "SaveDraft") {
            cust_GetPara();
            nwParameter_Add("ActionType", "SAVE");
            nwLoading_Start("saveBtn_func", crLoadingHTML);
            func_ActionDriven("saveBtn_func", false);
        }

        if (PromptID == "ProcessData") {
            cust_GetPara();
            nwParameter_Add("ActionType", "PROC");
            nwLoading_Start("saveBtn_func", crLoadingHTML);
            func_ActionDriven("saveBtn_func", false);
        }

        if (PromptID == "Cancel") {
            cust_GetPara();
            nwLoading_Start("actCancelTransaction", crLoadingHTML);
            func_ActionDriven("actCancelTransaction", false);
        }
    }
}

function CancelDone(result) {
    nwLoading_End('actCancelTransaction');
    if (result.includes("SAVED")) {
        let docno = $('#txtTranNo').val();
        setViewingOnly();
        MessageBox("Your request with Transaction No. " + docno + " has been cancelled.", "Other Requests", "");
    } else {
        MessageBox("Error: " + result, "Other Requests", "error");
    }
}

function setViewingOnly() {
    const isView = getParameterByName("isView")

    $('#cmbTranAct').prop('disabled', false);
    $('#actButtons').addClass('nwHide');
    $('#back-button').addClass('nwHide');

    if (isView != "true") {
        $('#okay-button').removeClass('nwHide');
    }
    $('#formTitle').addClass('nwHide');
    
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

function viewFromHistDone() {
    var selectedValue = $('#cmbTranAct').val(); // Get the selected value

    selectedValue = getTransDesc(selectedValue);
    // Remove any previously added classes from .cst-st-container
    $('.cst-st-container').removeClass('selected');

    // Add the 'selected' class to the parent container based on the selected value
    $('.cst-tx').each(function () {
        var text = $(this).text();
        if (text === selectedValue) {
            $(this).parent('.cst-st-container').addClass('selected');
        }
    });

    $('.nwgridButtons').find('.nwgrid_Delete').prop('disabled', true);

    const pop = getParameterByName("isView");
    if (pop == "true") { }
    else {
        $('#okay-button').removeClass('nwHide');
    }

    $('#btnReqCompliance').removeClass('cst-dis');
    $('#btnReqCompliance').addClass('cst');

    $('#cancel-button').removeClass('nwHide');
    $('#savedColumn').removeClass('nwHide');
    goToSummary();
}
    

function getTransDesc(tranID) {
    switch (tranID) {
        case "REQGAP":
            return "Gate Pass";
            break;
        case "REQMOI":
            return "Move In";
            break;
        case "REQMOO":
            return "Move Out";
            break;
        case "WRKPMT":
            return "Work Permit";
            break;
    }
}

$(document).ready(function () {
    $('#cmbNatWork').on('change', function () {
        if ($(this).val() == '999') {
            $('#natOthersDesc').removeClass('nwHide');
        } else {
            $('#natOthersDesc').val("");
            $('#natOthersDesc').addClass('nwHide');
        }
    });
});

$(document).on('change', '#txtDeliveryDate', function () {
    var selectedDate = $(this).val();
    var today = new Date().toLocaleDateString();

    if (Date.parse(selectedDate) < Date.parse(today)) {
        MessageBox("Cannot proceed. Date should not be earlier today.\n", baseTitle, "error", "");
        $(this).val("");
        return false;
    } else {
        $('#txtPropDate').val(selectedDate);
    }
});

$(document).on('change', '#txtMoveIndate', function () {
    var selectedDate = $(this).val();
    var today = new Date().toLocaleDateString();

    if (Date.parse(selectedDate) < Date.parse(today)) {
        MessageBox("Cannot proceed. Date should not be earlier today.\n", baseTitle, "error", "");
        $(this).val("");
        return false;
    } else {
        $('#txtPropDate').val(selectedDate);
    }
});

$(document).on('change', '#txtMoveOutDate', function () {
    var selectedDate = $(this).val();
    var today = new Date().toLocaleDateString();

    if (Date.parse(selectedDate) < Date.parse(today)) {
        MessageBox("Cannot proceed. Date should not be earlier today.\n", baseTitle, "error", "");
        $(this).val("");
        return false;
    } else {
        $('#txtPropDate').val(selectedDate);
    }
});

let WPGrid = false;
let GPGrid = false;
function checkEmptyFields() {
    var dpTransact = $('#cmbTranAct').val();

    switch (dpTransact) {
        case "REQMOI": {
            const tenantFName = $('#txtTenantName').val();
            const moveInDate = $('#txtMoveIndate').val();
            const unitType = $('#cmbUnitType').val();

            let hasError;
            hasError = (tenantFName == "" || moveInDate == "" || unitType == "") ? true : false;

            if (hasError) {
                return false;
            } else {
                return true;
            }
            break;
        }
            
        case "REQMOO": {
            const tenantFName = $('#txtTenantFullName').val();
            const moveOutDate = $('#txtMoveOutDate').val();

            let hasError;
            hasError = (tenantFName == "" || moveOutDate == "") ? true : false;

            if (hasError) {
                return false;
            } else {
                return true;
            }
            break;
        }
    }
    
}

function checkGatePassFields() {
    const delivery = $('#cmbDelivery').val();
    const deliveryDate = $('#txtDeliveryDate').val();
    const deliveryTime = $('#txtDeliveryDate').val();
    const carrier = $('#txtCarrier').val();

    let hasError;
    hasError = (delivery == "" || deliveryDate == "" || deliveryTime == "" || carrier == "") ? true : false;

    if (!hasError) {
        if (GPGrid == false) {
            try {
                nwParameter_Add_DataSet("nwGridAddOn"); //nwGridAddOnCon
            } catch (ex) {
                //console.log(ex);
            }
            nwLoading_Start("checkGatePassGrid", crLoadingHTML);
            func_ActionDriven("checkGatePassGrid", false);
        } else {
            nwLoading_End('checkGatePassGrid');
            GPGrid = false;
            goToSummary();
        }
    } else {
        MessageBox("Please complete all fields!", "Service Entry", "error");
    }
}

function gatePassGridOk(gateGrid) {

    let ErrString = "";
    ErrString += gateGrid == "False" ? "Please input at least one (1) gate pass row." : "";

    if (ErrString != "") {
        nwLoading_End('checkGatePassGrid');
        MessageBox(ErrString, "Service Entry", "");
        GPGrid = false;
    } else {
        GPGrid = true;
        checkGatePassFields();
    }
}


function checkWorkPermitFields() {
    const unitNo = $('#txtWPUnitNo').val();
    const unitFlr = $('#txtUnitFloor').val();
    const personInCharge = $('#txtPersonInCharge').val();
    const telNum = $('#txtTelNumber').val();
    const natureWork = $('#cmbNatWork').val();

    let natDesc = true;
    if (natureWork == '999') {
        const natOthersDesc = $('#natOthersDesc').val();
        if (natOthersDesc == "") {
            natDesc = false;
        }
    }

    const startDate = $('#schedStartDate').val();
    const endDate = $('#schedEndDate').val();
    const startTime = $('#schedStartTime').val();
    const endTime = $('#schedEndTime').val();
    const workRemarks = $('#schedWorkDesc').val();

    let hasError;
    hasError = (unitNo == "" || unitFlr == "" || personInCharge == "" || telNum == "" || natureWork == "" || natDesc == false || natOthersDesc == "" || startDate == "" || endDate == "" || startTime == "" || endTime == "" || workRemarks == "") ? true : false;


    if (!hasError) {
        if (WPGrid == false) {
            try {
                nwParameter_Add_DataSet("nwGridWorkers"); //nwGridAddOnCon
            } catch (ex) {
                //console.log(ex);
            }

            try {
                nwParameter_Add_DataSet("nwGridMaterials"); //nwGridAddOnCon
            } catch (ex) {
                //console.log(ex);
            }
            nwLoading_Start("checkWPGrids", crLoadingHTML);
            func_ActionDriven("checkWPGrids", false);
        } else {
            nwLoading_End('checkWPGrids');
            goToSummary();
            WPGrid = false;
        }
    } else {
        MessageBox("Please complete all fields!", "Service Entry", "error");
    }
}

function workPermitOk(workGrid, matsGrid) {
    
    let ErrString = "";
    ErrString += workGrid == "False" ? "Please input at least one (1) worker detail\n" : "";
    ErrString += matsGrid == "False" ? "Please input at least one (1) material detail" : "";

    if (ErrString != "") {
        nwLoading_End('checkWPGrids');
        MessageBox(ErrString, "Service Entry", "");
        WPGrid = false;
    } else {
        WPGrid = true;
        checkWorkPermitFields();
    }
}