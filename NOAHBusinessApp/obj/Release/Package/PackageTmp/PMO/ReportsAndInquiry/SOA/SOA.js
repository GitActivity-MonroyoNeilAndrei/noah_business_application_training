var serverDate = new Date();
var nwDocno = '';
var menuTitle = 'SOA';
var currentDate = "";
var currentYear = "";

var maxdata = 200;
var maxd = 200;
var mind = 0;
var datacnt = 5;
var bbc = "";

var
SPR_Code = 1,
SPR_Description = 2,
SPR_AttachImage = 3,
SPR_ViewImage = 4,
SPR_DeleteImage = 5,
SPR_FilePath1 = 6;

var
SPR_ProjCode = 1,
SPR_ProjDesc = 2,
SPR_ProjTypeCode = 3,
SPR_ProjTypeDesc = 4,
SPR_LocCode = 5,
SPR_LocDesc = 6,
SPR_ImagesCarousel = 7,
SPR_UnitDtls = 8,
SPR_AttachImageSDP = 9,
SPR_ViewImageSDP = 10,
SPR_DeleteImageSDP = 11,
SPR_FilePath2 = 12;

var $ServerLink = "";


var cuzrownum = 0;
var cuztag = false;

function func_Reload() {
    crnwTagSingleBind = true;
    crLnk = "../SOA/SOA_Gateway";
    crLnkGateKey = "SOA";



    var isContinue = true;

    init_request();

    //DisableFields(); //CAR: 02.11.2020
    //func_LoaderShow("Angelo", 0);

    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    $("#noah-webui-Toolbox").bindingExport().enable(false);

    $('#nwGridView').enable(true)
    $("#cboMonthly").enable(true);
    $("#rbMonthly").prop("checked", true);

    func_Toolbox_Clear();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", menuTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", menuTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;

    $("#noah-webui-Toolbox").bindingSave().enable(true);
    nwLoading_Start(`xRefreshBtn`, crLoadingHTML);
    cust_GetPara();
    EnableFields();
    isRefreshed = true;
    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = false;
    cust_GetPara();
    genID = "Approve";
    parent_MessageBoxQuestionToolBox("Do you want to approve this transaction?", "Approve", "Approve", indef, enume);
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    isContinue = false;
    fn_ExportGrid("nwGridView");
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
    nwParameter_Add("cuzrownum", cuzrownum);
    nwParameter_Add("nwTrantype", getParameterByName("nwTrantype"));
    nwParameter_Add("compcode", getParameterByName("nwComp"));
    nwParameter_Add("txtDocno", $("#txtDocno").val());
    nwParameter_Add("txtUser", $("#txtUser").val());
    nwParameter_Add("txtDateFrom", $('#txtDateFrom').val());
    nwParameter_Add("txtDateTo", $('#txtDateTo').val());

    GetAddtoListFilters();
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    nwLoading_Start("xSample", crLoadingHTML);
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("xSample", crLoadingHTML);
    cuzrownum = $("#noah-webui-default-currentRec").val();
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}


function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("xSample", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}


///////////////////////////////////////

//function func_LookUpInitialize(lookupName) {
//    cust_GetPara();
//}

function func_LookUpInitialize(dimP) {
    var isContinue = true;
    cust_GetPara();
    return isContinue;
}

var temp_crnwTR = "";
var remarksReq = "0";

function Lookup_DoneFunction(idName, idNum) {

    if (idName == 'lugReasonRevision' || idName == 'lugReasonCancellation') {

        remarksReq = "0";
        remarksReq = getLookupData(idNum, 2);

        if (idName == 'lugReasonRevision') {
            $('#txtRemarksCancel').val('');
            $('#txtReasonTypeReapproval').val(getLookupData(idNum, 3));
        }
        if (idName == 'lugReasonCancellation') {
            $('#txtRemarks').val('');
            $('#txtReasonTypeCnl').val(getLookupData(idNum, 3));
        }
    }
}

function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idnum + ")").find("td:eq(" + (index) + ")").text();
    return data;
}


function getGridData(idnum, index) {
    var data = $(`#menuCreatorContainer .tablecontainter table tr:eq(${idnum
    })`).find(`td:eq(${index
    })`).text();
    return data;
}

function setGridData(nwGrid, type, col, row, val) { // Setting Text in Grid
    if (type == 'input')
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val(val);
    else
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text(val);
}

function EnableFields() {
    $('#nwGrid1').enable(true);
    $(".li-Shortcut").enable(true);
    $("#txtAppName").enable(true);
}

function EnableFieldsDone() {//Binding Done

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
}

function DisableFieldsEmpty() {

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
}

function ClearFields() {
    $("#txtAppName").val("");
    DisableFields();
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {


}

function setGridData(nwGrid, type, col, row, val) {
    if (type == 'input')
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val(val);
    else
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text(val);
}

function window_close(window) {
    nwPopupForm_HideModal(window);
}


function DisableFields() {
    $('#nwGrid1').enable(false);
    $(".li-Shortcut").enable(false);
    $("#txtAppName").enable(false);
}

function ClearDateFilter() {
    $("#cboMonth").val("1");
    $("#cboQuarter").val("1");

    if ($("#cboAnnual").val() == "")
        $("#cboAnnual").val(currentYear);

    $("#dtFrom").val("");
    $("#dtTo").val("");

    $("#dtFrom2").val("");
    $("#dtTo2").val("");
}

var genID;
function msgBoxContainerQuestionF(genID, answer) {
    //if (genID == "DeleteAttachment") {
    //    if (answer == "Yes") {
    //        crnwTR.find("td:eq(" + SPR_FilePath1 + ")").text("");
    //        crnwTR.find("td:eq(" + SPR_ViewImage + ") button").removeClass("buttonBlue");
    //        crnwTR.find("td:eq(" + SPR_DeleteImage + ") button").removeClass("buttonRed");
    //    }
    //}
    if (answer == "Yes") {
        if (PromptID == "Approve") {
            nwParameter_Add("txtDocno", $('#txtDocno').val());
            nwParameter_Add("curr_Level", $('#curr_Level').val());
            nwParameter_Add("curr_Status", $('#curr_Status').val());
            nwParameter_Add("curr_ApprovedStatus", $('#curr_ApprovedStatus').val());
            nwParameter_Add("curr_DisapprovedStatus", $('#curr_DisapprovedStatus').val());
            nwParameter_Add("curr_CancellationStatus", $('#curr_CancellationStatus').val());
            nwParameter_Add("ProcessType", "Approved");
            func_ActionDriven("actProcess", false);
        }

        if (PromptID == "Disapprove") {
            nwParameter_Add("txtDocno", $('#txtDocno').val());
            nwParameter_Add("curr_Level", $('#curr_Level').val());
            nwParameter_Add("curr_Status", $('#curr_Status').val());
            nwParameter_Add("curr_ApprovedStatus", $('#curr_ApprovedStatus').val());
            nwParameter_Add("curr_DisapprovedStatus", $('#curr_DisapprovedStatus').val());
            nwParameter_Add("curr_CancellationStatus", $('#curr_CancellationStatus').val());
            nwParameter_Add("txtRemarks", $('#txtRemarks').val());
            nwParameter_Add("ReasonReapproval", $('#idvallugReasonRevision').val());
            nwParameter_Add("ProcessType", "Disapproved");
            nwParameter_Add("ReasonType", $('#txtResTypeRevision').val());
            window_close("popup");

            func_ActionDriven("actProcess", false);

            $('#idvallugReasonRevision').val('');
            $('#descvallugReasonDisReapproval').val('');
            $('#txtRemarks').val('');
        }

        if (PromptID == "Cancel") {
            nwParameter_Add("txtDocno", $('#txtDocno').val());
            nwParameter_Add("curr_Level", $('#curr_Level').val());
            nwParameter_Add("curr_Status", $('#curr_Status').val());
            nwParameter_Add("curr_ApprovedStatus", $('#curr_ApprovedStatus').val());
            nwParameter_Add("curr_DisapprovedStatus", $('#curr_DisapprovedStatus').val());
            nwParameter_Add("curr_CancellationStatus", $('#curr_CancellationStatus').val());
            nwParameter_Add("txtRemarksCancel", $('#txtRemarksCancel').val());
            nwParameter_Add("ReasonDisapproval", $('#idvallugReasonCancellation').val());
            nwParameter_Add("ProcessType", "Cancelled");
            nwParameter_Add("ReasonType", $('#txtResTypeCancellation').val());
            window_close("popup1");

            func_ActionDriven("actProcess", false);

            $('#idvallugReasonCancellation').val('');
            $('#descvallugReasonCancellation').val('');
            $('#txtRemarksCancel').val('');
        }
        if (PromptID == "Reassign") {
            nwParameter_Add("txtDocno", $('#txtDocno').val());
            nwParameter_Add("curr_Level", $('#curr_Level').val());
            nwParameter_Add("curr_Status", $('#curr_Status').val());
            nwParameter_Add("curr_ApprovedStatus", $('#curr_ApprovedStatus').val());
            nwParameter_Add("curr_DisapprovedStatus", $('#curr_DisapprovedStatus').val());
            nwParameter_Add("curr_CancellationStatus", $('#curr_CancellationStatus').val());
            nwParameter_Add("assignCode", $('#idvallugReassignTo').val());
            nwParameter_Add("ProcessType", "Reassign");
            //nwParameter_Add("ReasonType", $('#txtResTypeCancellation').val());
            window_close("popup4");

            func_ActionDriven("actProcess", false);

            $('#idvallugReassignTo').val('');
            $('#descvallugReassignTo').val('');
        }
    }
}

// EVENTS
$(document).on('click', '.btn-cancel', function () {
    $(this).parents('.pdlg').fadeOut();
    $(this).parents('.iframe_main').fadeOut();
});
$(document).on('click', '#btnAttachments', function () {

});

$(document).on('click', '#btnCancelRevision', function () {
    $('#idvallugReasonRevision').val('');
    $('#descvallugReasonDisReapproval').val('');
    $('#txtRemarks').val('');
    window_close('popup')
});
$(document).on('click', '#btnCancelCancellation', function () {
    $('#idvallugReasonRevision').val('');
    $('#descvallugReasonDisReapproval').val('');
    $('#txtRemarks').val('');
    window_close('popup1')
});
$(document).on('click', '#btnCancelReassign', function () {
    $('#idvallugReassignTo').val('');
    $('#descvallugReassignTo').val('');
    $('#txtRemarks').val('');
    window_close('popup4')
});



var PromptID = "";
function ViewAttachments() {
    cust_GetPara();
    func_ActionDriven("actLoadAttachments");
    $(".iframe_main").fadeOut();
    $("#popup2").fadeIn();
}
function ProcessApprove(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    PromptID = "Approve";
    MessageBoxQuestion("Do you want to Approve this transaction?", "Approve", "");
    isContinue = false;

    return isContinue;
}

var ProcessType = "";
function ProcessDisapprove(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    $('#idvallugReasonRevision').val('');
    $('#descvallugReasonRevision').val('');
    $('#txtRemarks').val('');
    ProcessType = "Revision"
    $(".iframe_main").hide();
    $("#popup").fadeIn();
    isContinue = false;

    return isContinue;
}

function ProcessCancel(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    $('#idvallugReasonCancellation').val('');
    $('#descvallugReasonCancellation').val('');
    $('#txtRemarksCancel').val('');
    ProcessType = "Disapprove"
    $(".iframe_main").hide();
    $("#popup1").fadeIn();
    isContinue = false;
    return isContinue;
}
function ProcessReassign(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    $('#idvallugReassignTo').val('');
    $('#descvallugReassignTo').val('');
    ProcessType = "Reassign"
    $(".iframe_main").hide();
    $("#popup4").fadeIn();
    isContinue = false;
    return isContinue;
}
function ProcessSubmit() {

    var remarksx = $('#txtRemarks').val() == "" ? $('#txtRemarksCancel').val() : $('#txtRemarks').val();

    switch (ProcessType) {
        case 'Revision':
            if ($('#idvallugReasonRevision').val() == "") {
                MessageBox("Cannot submit. Reason is required.", "Disapprove for Revision", "");
                return false;
            }
            break;

        case 'Disapprove':
            if ($('#idvallugReasonCancellation').val() == "") {
                MessageBox("Cannot submit. Reason is required.", "Disapprove for Cancellation", "");
                return false;
            }
        case 'Reassign':
            if ($('#idvallugReassignTo').val() == "") {
                MessageBox("Cannot submit. Reassign To is required.", "ReassignbtnCancelCancellation", "");
                return false;
            }
            break;

    }

    if (remarksReq.toUpperCase() == "YES" && remarksx == "") {
        var msg = '';
        if (ProcessType == 'Revision')
            msg = 'Disapprove for Revision'
        else if (ProcessType == 'Disapprove')
            msg = 'Disapprove for Cancellation'

        MessageBox('Cannot submit. Remarks is required.', msg, '');
    }
    else {
        if (ProcessType == "Revision") {
            PromptID = "Disapprove";
            MessageBoxQuestion("Do you want to Disapprove this transaction?", "Disapprove for Revision", "");
        }
        else if (ProcessType == "Disapprove") {

            PromptID = "Cancel";
            MessageBoxQuestion("Do you want to Cancel this transaction?", "Disapprove for Cancellation", "");
        }
        else if (ProcessType == "Reassign") {

            PromptID = "Reassign";
            MessageBoxQuestion("Do you want to Reassign this transaction?", "Reassign", "");
        }
    }
}


$(document).on('click', '.btn-default', function () {
    var id = $(this).attr("id");
    switch (id) {
        case "btnApprove":
            ProcessApprove();
            break;
        case "btnDspvdRvsn":
            ProcessDisapprove();
            break;
        case "btnDspvdCncl":
            ProcessCancel();
            break;
        case "btnReassign":
            ProcessReassign();
            break;
        case "btnAttachments":
            ViewAttachments();
            break;
    }
});
$(document).on('click', '.btnViewImage', function () {
    var file = $(this).attr("filepath");
    var str = $ServerLink + file;
    nwParameter_Add("link", str);
    func_ActionDriven("actViewImage", false);

    if (str.match(/[^/]+(jpg|png|gif)$/)) {
        $("#divCon1").show();
        $("#divCon").hide();
    }
    else {
        $("#divCon").show();
        $("#divCon1").hide();
    }
    nwPopupForm_ShowModal("frmdivCon");
});



//FUNCTIONS
function ShowDocWriterPreviewPortal(url, dtPreviewJson, filename) {
    var title = "";
    var fullength = "";
    title = "Document Writer Viewer";
    PreviewJson = JSON.stringify(dtPreviewJson);
    fullength += url;

    if (fullength.indexOf("forms_standards/retrieve") <= 0)
        fullength += "forms_standards/retrieve/DocumentWriterViewer/index.html?nwcomc=" + bbc + "";
    //?url=" + encodeURIComponent(url);// + "&frmlistParam=" + encodeURIComponent(PreviewJson);

    if (filename == undefined) filename = "Document";
    CookieSet("frmlistParam", PreviewJson, 1);
    CookieSet("frmlistParamName", filename, 1);
    $('#frForms').attr('src', fullength);
}
function ShowPrintPreview(PDFUrl) {

    var ctr = 0;
    nwLoadPrint(PDFUrl, '');
}
function HasAttachment() {
    $('#nwGrid1-nwData tbody tr').each(function () {
        var value = $(this).find("td:eq(" + SPR_FilePath1 + ")").text();
        if (value != "") {
            $(this).find("td:eq(" + SPR_ViewImage + ") button").addClass("buttonBlue");
            $(this).find("td:eq(" + SPR_DeleteImage + ") button").addClass("buttonRed");
        }
    })
}


function LoadForm(url) {
    $('#frForms').attr('src', url);
    //$('#divTermsOfUse').modal("show");
    return false;
}

function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext" nwcode="' + xvalue + '" style="display:inline-block;margin-right: 3px;margin-bottom: 3px;">' + xdisplay + '<span class="classx">x</span></div>';
};
function GetAddtoListFilters() {
    var len = $('div.atlContainer').length;
    for (var i = 0; i < len; i++) {
        var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
        var xvalue = "";
        var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
        for (var j = 0; j < lencode; j++) {
            if (xvalue != "") xvalue += ",";
            xvalue += $('.atlContainer:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');
        }
        nwParameter_Add(xkey, xvalue);
    }
};

function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {

    var xvalue = "";
    var xdisplay = "";

    xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

    if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
        $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
    }
}

$(document).on("click", ".btnGetlookup", function () {
    cust_GetPara();
    crnwTableCon = null; // if grid is click

    var xtype = $(this).attr("nwtype");
    var selectedInput = xtype;
    lookUpCustomize(selectedInput, 2);

});

function ProcessSubmitFilter() {

    nwParameter_Add("txtDateFrom", $('#txtDateFrom').val());
    nwParameter_Add("txtDateTo", $('#txtDateTo').val());
    nwParameter_Add("lugLocation", $('#lugLocation').val());
    nwParameter_Add("lugVendor", $('#lugVendor').val());
    nwParameter_Add("lugDocno", $('#lugDocno').val());
    nwParameter_Add("lugRequestor", $('#lugRequestor').val());

    //$('#noah-webui-default-Refresh').click();

    window_close('popup3');
}

$(document).on('click', '#btnCancelFilter', function () {
    BtnClearFilters();
    window_close('popup3');
});

function BtnClearFilters() {
    $('.spantext').remove();
    $('#txtDateFrom').val('');
    $('#txtDateTo').val('');
}

function ClearFilters() {
    $('.atl_Location .spantext').remove();
    $('.atl_CostCenter .spantext').remove();
    $('.atl_Docno .spantext').remove();
    $('.atl_Requestor .spantext').remove();

    $('#txtDateFrom').val('');
    $('#txtDateTo').val('');
}

function func_WindowCloseTrigger(verID) {
    var isContinue = true;

    if (verID == 'popup3') {
        ClearFilters();
    }
    return isContinue;
}
function GenerateGridAttachment(id, json) {
    document.getElementById(id).innerHTML = "";
    var val = "";
    //header
    switch (id) {
        case "tblSourceDocs":
            val += "<th>Transaction No.</th>";
            val += "<th>Date Posted</th>";
            val += "<th>Form Details</th>";
            break;
        case "tblSupportingDocs":
            val += "<th>Transaction No.</th>";
            val += "<th>Description</th>";
            val += "<th>Attachment</th>";
            break;
    }


    $("#" + id + "").append("<tr>" + val + "</tr>");

    //line
    var vallin = "";
    for (var i = 0; i < json.length ; i++) {
        vallin = "";

        switch (id) {
            case "tblSourceDocs":
                vallin += "<td data-lbl='Docno'><div class='col1'>" + json[i]["docno"] + "</div></td>";
                vallin += "<td data-lbl='Date'><div class='col2'>" + json[i]["docDate"] + "</div></td>";
                vallin += "<td data-lbl='View'><div class='col3 buttonGridGreen btnViewImage' filepath='" + json[i]["printingID"] + "'>...</div></td>";
                break;
            case "tblSupportingDocs":
                var desc = json[i]["Description"];
                if (desc == "" || desc == null)
                    desc = json[i]["workInstructions"];
                vallin += "<td data-lbl='Docno'><div class='col1'>" + json[i]["docno"] + "</div></td>";
                vallin += "<td data-lbl='Description'><div class='col2'>" + desc + "</div></td>";
                vallin += "<td data-lbl='Attachment'><div class='col3 buttonGridGreen btnViewImage' filepath='" + json[i]["filebin"] + "'>...</div></td>";
                break;
        }



        $("#" + id + "").append("<tr class='tblrow' id='" + id + "-tblrow" + (i + 1) + "' rowno='" + (i + 1) + "'>" + vallin + "</tr>");
    }
}