var mtitle = "Request for Extension Entry";

var crntRow = 0;
var SPR_ProjectCode = 1,
    SPR_ProjectName = 2,
    SPR_BlockFloor = 3,
    SPR_LotUnitSlotNo = 4,
    SPR_Customer = 5,
    SPR_HoldingDate = 6,
    SPR_HoldingExpiryDate = 7,
    SPR_HoldingExpiryExt = 8,
    SPR_QueueNo = 9,
    SPR_AgeinDays = 10,
    SPR_Docno = 11,
    SPR_Request = 12,
    SPR_UnitCode = 13;

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

function func_Reload() {

    //crnwTagSingleBind = true;

    crLnk = "../SBRequestForExtension/SBRequestForExtension_Gateway";
    crLnkGateKey = "SBRequestForExtension";

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();
    func_checkisView();

    return isContinue;
}

function func_checkisView() {
    if (getParameterByName("refDocno") != "") {
        $('#noah-webui-Toolbox').visible(false);
        nwParameter_Add("refDocno", getParameterByName("refDocno"));
        $('#noah-webui-default-Refresh').click();
        $('.hdrLbl').visible(false)
        $('#cmbProject').visible(false)
    } else {
        $('.hdrLbl').visible(true)
        $('#cmbProject').visible(true)
    }
}

///////////////////// Tool Box
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

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", mtitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", mtitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwLoading_Start("actbindcollection", crLoadingHTML);

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
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", mtitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxSearch(indef, enume) {
    var isContinue = true;
    isContinue = false;
    nwPopupForm_HideModal("nwSearch");
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", mtitle, "", indef, enume);
    return isContinue;
}

function func_Refresh() {
    cust_GetPara();
    func_ActionDriven("actRefresh", false);
    nwLoading_Start("actRefresh", crLoadingHTML);
}

$(document).on("click", "#btnProcess", function () {
    msgBoxContainerQuestion = "btnProcess";
    $('#Message_Cancel').visible(false);
    parent_MessageBoxQuestion("Do you want to process the current record?", mtitle, "Question");
});

$(document).on("click", "#btnRefresh", function () {
    cust_GetPara();
    func_ActionDriven("actbtnRefresh", false);
    nwLoading_Start("actbtnRefresh", crLoadingHTML);
});

///////////////////// Bind tool
function cust_GetPara() {
    nwParameter_Add("cmbProject", $('#cmbProject').val());
    nwParameter_Add("idvallugLocform", $('#idvallugLocform').val());
    nwParameter_Add("idvallugReason", $('#idvallugReason').val());
    nwParameter_Add("txtRemarks", $('#txtRemarks').val());
    nwParameter_Add("txtTransactionNo", $('#txtTransactionNo').val());
    nwParameter_Add("txtHoldingExpiryDate", $('#txtHoldingExpiryDate').val());
    nwParameter_Add("txtRefDocno", $('#txtRefDocno').val());
    nwParameter_Add("txtStatusCode", $('#txtStatusCode').val());
    nwParameter_Add("txtTransactionNo", $('#txtTransactionNo').val());

    nwParameter_Add("refDocno", getParameterByName("refDocno"));
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("actbindcollection", crLoadingHTML);
    nwParameter_Add("txtCode", $("#txtCode").val());
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("actbindcollection", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}

////////////////////////////////////////

function ClearFields() {
    $("#idvallugLocform").val("");
    $("#descvallugLocform").val("");
    $("#idvallugReason").val("");
    $("#descvallugReason").val("");
    $("#txtRemarks").val("");
    $("#txtTransactionNo").val("");
    $("#txtRequestDate").val("");
    $("#txtHoldingExpiryDate").val("");
    $("#txtStatus").val("");
    $("#txtReason").val("");
    $("#txtReturnRemarks").val("");
    $('#txtIsReq').val('');
    $('#nwtxt_RecUser').text('')
    $('#nwtxt_RecDate').text('')
    $('#nwtxt_ModUser').text('')
    $('#nwtxt_ModDate').text('')
}

function EnableFields() {
    $("#btnSave").enable(true);
    $("#lugLocform").enable(true);
    $("#lugReason").enable(true);
    $("#txtRemarks").enable(true);

    $("#btnReqCompliance").enable(true);
    $("#btnReqCompliance").addClass("btnOrange");
    $("#btnReqCompliance").removeClass("btnGreen");
    $("#btnReqCompliance").removeClass("btnGray");
}

function DisableFields() {
    $("#txtTransactionNo").enable(false);
    $("#txtRequestDate").enable(false);
    $("#txtHoldingExpiryDate").enable(false);
    $("#txtStatus").enable(false);
    $("#txtReason").enable(false);
    $("#txtReturnRemarks").enable(false);
    $('#lugLocform').enable(true);

    $("#btnReqCompliance").enable(false);
    $("#btnReqCompliance").addClass("btnGray");
    $("#btnReqCompliance").removeClass("btnGreen");
    $("#btnReqCompliance").removeClass("btnOrange");
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

function EnableFieldsDone() {//Binding Done
    $('#lugLocform').enable(false);
    $('#btnDelete').enable(true);
    $('#btnProcess').enable(true);

    if (getParameterByName("refDocno") != "") {
        $('#lugLocform').enable(false);
        $('#lugReason').enable(false);
        $('#txtRemarks').enable(false);
        $('#btnDelete').enable(false);
        $('#btnProcess').enable(false);
        $('.noah-webui-Toolbox').visible(false);
    }
}

function DisableFieldsEmpty() {
    $('#btnSave').enable(true);
    $('#btnDelete').enable(false);
    $('#btnProcess').enable(false);
    DisableFields();

    $("#btnReqCompliance").enable(true);
    $("#btnReqCompliance").addClass("btnOrange");
    $("#btnReqCompliance").removeClass("btnGreen");
    $("#btnReqCompliance").removeClass("btnGray");
}

function func_DisableHasData() {
    $('#btnDelete').enable(false);
    $('#btnProcess').enable(false);
    $('#btnSave').enable(false);
    $('#lugLocform').enable(false);
    $('#lugReason').enable(false)
    $('#txtRemarks').enable(false)

    $("#btnReqCompliance").enable(false);
    $("#btnReqCompliance").addClass("btnGray");
    $("#btnReqCompliance").removeClass("btnGreen");
    $("#btnReqCompliance").removeClass("btnOrange");
}

////////////////////////////////////////
var serverlink = "";
function func_WindowCloseTrigger(verID) {
    var isContinue = true;
    cust_GetPara();

    if (verID == "nwPopUpReqComp") {
        nwParameter_Add("txtTransactionNo", $('#txtTransactionNo').val());
        nwLoading_Start("actHasRqrdCompli", crLoadingHTML);
        func_ActionDriven('actHasRqrdCompli', false);
    }

    return isContinue;
}

function msgBoxContainerQuestionF(genID, answer) {

}

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'lugReason') {
        var isreq = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
        $('#txtIsReq').val(isreq);
    }
}

///////////////////// Grid Events
function CreateGridDone() {

    var Gridrows = nwGridMainCon_Book.ActiveSheet.GetMaxRow();

    for (var y = 0; y <= Gridrows; y++) {
        var projCode = nwGridMainCon_Book.ActiveSheet.GetText(SPR_ProjectCode - 1, y) || "";
        if (projCode != "") {
            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_Request - 1, y, "orange");
        } else {
            nwGridMainCon_Book.ActiveSheet.SetBackground(SPR_Request - 1, y, "Gray");
        }
    }

}

function p8Spread_Click(canvasID, row, col) {

    if (canvasID == "nwGridMainCon") {

        if (col == (SPR_Request - 1)) {
            var docno = '';
            var unitC = '';
            docno = nwGridMainCon_Book.ActiveSheet.GetText((SPR_Docno - 1), nwGridMainCon_Book.ActiveSheet.GetSelectedIndexes().row);
            unitC = nwGridMainCon_Book.ActiveSheet.GetText((SPR_UnitCode - 1), nwGridMainCon_Book.ActiveSheet.GetSelectedIndexes().row);
            if (docno == "") {
                return false;
            } else {
                nwPopupForm_ShowModal("popup");
                $('#btnDelete').enable(false);
                $('#btnProcess').enable(false);
                ClearFields();
                DisableFields();
                $('#txtRefDocno').val(docno);

                cust_GetPara();
                nwParameter_Add("refDocno", getParameterByName("refDocno"));
                nwParameter_Add("unitC", unitC);

                func_ActionDriven("actLoadRequest", false);
                nwLoading_Start("actLoadRequest", crLoadingHTML);
            }
        }
    }

    //console.log("p8Spread_Change " + canvasID + " " + row + " " + col);
    return true;
}

///////////////////// Requirements
$(document).on("click", "#btnReqCompliance", function (e) {

    var trantype = 'HLDEXT';
    var docno = $('#txtTransactionNo').val();
    var status = $('#txtStatusCode').val();
    nwDocno = getParameterByName('refDocno');

    if (status == "3" || nwDocno != "") {
        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=true";

    } else {
        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=false";
    }

    nwLoading_Start('btnReqCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpReqComp", true, fullength);
    $('#nwPopUpReqComp .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpReqComp").css({ "min-width": "90%" });
    $("#nwPopUpReqComp").css({ "min-height": "90%" });
    nwPopupForm_ShowModal("nwPopUpReqComp");
    nwLoading_End('btnReqCompliance');

});