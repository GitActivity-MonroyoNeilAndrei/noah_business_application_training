var _canvasID;
var _row;
var _col;

var nwGridCon_Book;
var nwGridCon_Sheet;

var nwGridCon2Custom_Book;
var nwGridCon2Custom_Sheet;

var isrefresh = false;
var BasedTitle = "Salesperson Information";

var nwdocno = "";
var isView = "";
var SPR_startIndex = 1,
    SPR_DefDepoAcct = SPR_startIndex,
    SPR_BankCode = ++SPR_startIndex,
    SPR_Bank = ++SPR_startIndex,
    SPR_Payee = ++SPR_startIndex,
    SPR_BranchCode = ++SPR_startIndex,
    SPR_BranchName = ++SPR_startIndex,
    SPR_TypeOfAcctCode = ++SPR_startIndex,
    SPR_TypeOfAcct = ++SPR_startIndex,
    SPR_AcctNo = ++SPR_startIndex,
    SPR_FullAcctNo = ++SPR_startIndex,
    SPR_SwiftCode = ++SPR_startIndex,
    SPR_TypeOfPaymentCode = ++SPR_startIndex,
    SPR_TypeOfPayment = ++SPR_startIndex,
    SPR_PaymentInstruction = ++SPR_startIndex,
    SPR_SCReq = ++SPR_startIndex,
    SPR_AllBanks = ++SPR_startIndex;

function func_Reload() {
    //crLnk = "../../../forms_GateWay/noahweb_Gateway.aspx";
    crLnk = GetCurrentURL() + "LMSSalespersonInfo_Gateway";
    crLnkGateKey = "LMSSalespersonInfo";
    crnwTagSingleBind = true;

    DisableFields();

    nwdocno = getParameterByName("nwDocno");

    nwParameter_Add("bindnwDocno", nwdocno);
    isView = getParameterByName("isView");
    nwParameter_Add("bindisView", isView);
    //if (nwdocno != "" && isView == "true")
    //{
    //    getDocNo();
    //}

    //$('#txtPhoneBus').mask("(999) 9999-9999");
    $('#txtZipCode').mask('9999');
    $('#reqFA').hide();

    nwPopupForm_Create("nwVwUpdHst", true);

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    isrefresh = true;
    return isContinue;
}
////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    ClearFields();
    isrefresh = false;
    func_Toolbox_Clear();
    EnableFields();
    $("#txtCrossRefCode").focus();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    isrefresh = false;
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", BasedTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", BasedTitle, "", indef, enume);
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
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", BasedTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    isContinue = false;
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
    nwdocno = getParameterByName("nwDocno");
    nwParameter_Add("bindnwDocno", nwdocno);

    isView = getParameterByName("isView");
    nwParameter_Add("bindisView", isView);
    nwParameter_Add("txtSalesPersonCode", $('#txtSalesPersonCode').val());
    nwParameter_Add("txtSalesPersonName", $('#txtSalesPersonName').val());
    nwParameter_Add("txtCrossRefCode", $('#txtCrossRefCode').val());
    nwParameter_Add("idvallugPartyType", $('#idvallugPartyType').val());
    nwParameter_Add("descvallugPartyType", $('#descvallugPartyType').val());
    nwParameter_Add("idvallugSalutation", $('#idvallugSalutation').val());
    nwParameter_Add("descvallugSalutation", $('#descvallugSalutation').val());
    nwParameter_Add("txtLastName", $('#txtLastName').val());
    nwParameter_Add("txtFirstName", $('#txtFirstName').val());
    nwParameter_Add("txtMiddleName", $('#txtMiddleName').val());
    nwParameter_Add("txtMI", $('#txtMI').val());
    nwParameter_Add("idvallugNameSuffix", $('#idvallugNameSuffix').val());
    nwParameter_Add("descvallugNameSuffix", $('#descvallugNameSuffix').val());
    nwParameter_Add("txtDateOfBirth", $('#txtDateOfBirth').val());
    nwParameter_Add("txtAge", $('#txtAge').val());
    nwParameter_Add("txtPlaceOfBirth", $('#txtPlaceOfBirth').val());
    nwParameter_Add("idvallugGender", $('#idvallugGender').val());
    nwParameter_Add("descvallugGender", $('#descvallugGender').val());
    nwParameter_Add("idvallugCivilStats", $('#idvallugCivilStats').val());
    nwParameter_Add("descvallugCivilStats", $('#descvallugCivilStats').val());
    nwParameter_Add("idvallugJobTitle", $('#idvallugJobTitle').val());
    nwParameter_Add("descvallugJobTitle", $('#descvallugJobTitle').val());
    nwParameter_Add("idvallugRelationToDealer", $('#idvallugRelationToDealer').val());
    nwParameter_Add("descvallugRelationToDealer", $('#descvallugRelationToDealer').val());
    nwParameter_Add("chkisMultilpleDealer", $('#chkisMultilpleDealer').prop("checked"));
    nwParameter_Add("txtTaxIDNo", $('#txtTaxIDNo').val());
    nwParameter_Add("txtSSSNo", $('#txtSSSNo').val());
    nwParameter_Add("idvallugOtherID", $('#idvallugOtherID').val());
    nwParameter_Add("descvallugOtherID", $('#descvallugOtherID').val());
    nwParameter_Add("txtOtherIDNo", $('#txtOtherIDNo').val());
    //nwParameter_Add("txtLocCode", $('#txtLocCode').val());
    //nwParameter_Add("idvallugLocType", $('#idvallugLocType').val());
    nwParameter_Add("descvallugLocType", $('#descvallugLocType').val());
    nwParameter_Add("chkFullAddress", $('#chkFullAddress').prop("checked"));
    nwParameter_Add("txtFullAddress", $('#txtFullAddress').val());
    nwParameter_Add("txtUnitNo", $('#txtUnitNo').val());
    nwParameter_Add("txtFloorNo", $('#txtFloorNo').val());
    nwParameter_Add("txtBldgNo", $('#txtBldgNo').val());
    nwParameter_Add("txtBldgName", $('#txtBldgName').val());
    nwParameter_Add("txtLandmark", $('#txtLandmark').val());
    nwParameter_Add("txtStreetNo", $('#txtStreetNo').val());
    nwParameter_Add("txtStreetName", $('#txtStreetName').val());
    nwParameter_Add("txtLot", $('#txtLot').val());
    nwParameter_Add("txtBlock", $('#txtBlock').val());
    nwParameter_Add("txtPhase", $('#txtPhase').val());
    nwParameter_Add("txtSubdivision", $('#txtSubdivision').val());
    nwParameter_Add("txtZone", $('#txtZone').val());
    nwParameter_Add("idvallugArea", $('#idvallugArea').val());
    nwParameter_Add("descvallugArea", $('#descvallugArea').val());
    nwParameter_Add("idvallugStdBrgy", $('#idvallugStdBrgy').val());
    nwParameter_Add("descvallugStdBrgy", $('#descvallugStdBrgy').val());
    nwParameter_Add("txtAltBrgy", $('#txtAltBrgy').val());
    nwParameter_Add("idvallugMunicipality", $('#idvallugMunicipality').val());
    nwParameter_Add("descvallugMunicipality", $('#descvallugMunicipality').val());
    nwParameter_Add("txtProvinceCode", $('#txtProvinceCode').val());
    nwParameter_Add("txtProvince", $('#txtProvince').val());
    nwParameter_Add("txtRegionCode", $('#txtRegionCode').val());
    nwParameter_Add("txtRegion", $('#txtRegion').val());
    nwParameter_Add("txtZipCode", $('#txtZipCode').val());
    nwParameter_Add("txtPhoneBus", $('#txtPhoneBus').val());
    nwParameter_Add("txtMobile", $('#txtMobile').val());
    nwParameter_Add("txtEmailAdd", $('#txtEmailAdd').val());
    nwParameter_Add("txtApprovalID", $('#txtApprovalID').val());
    nwParameter_Add("txtRecStats", $('#txtRecStats').val());

    try {
        nwParameter_Add_DataSet("nwGrid");
    } catch (e) { }
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    nwLoading_Start("xSample", crLoadingHTML);
    cust_GetPara();
    isrefresh = true;
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("xSample", crLoadingHTML);
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////

var temp_crnwTR = "";
var temp_crnwTD = "";


function EnableFields() {
    $('#txtSalesPersonCode').enable(false);
    $('#txtSalesPersonName').enable(false);
    $('#txtCrossRefCode').enable(true);
    $('#lugPartyType').enable(true);
    $('#lugSalutation').enable(true);
    $('#txtLastName').enable(true);
    $('#txtFirstName').enable(true);
    $('#txtMiddleName').enable(true);
    $('#txtMI').enable(false);
    $('#lugNameSuffix').enable(true);
    $('#txtDateOfBirth').enable(true);
    $('#txtAge').enable(false);
    $('#txtPlaceOfBirth').enable(true);
    $('#lugGender').enable(true);
    $('#lugCivilStats').enable(true);
    $('#lugJobTitle').enable(true);
    $('#lugRelationToDealer').enable(true);
    $('#chkisMultilpleDealer').enable(true);
    $('#txtTaxIDNo').enable(true);
    $('#txtSSSNo').enable(true);
    $('#lugOtherID').enable(true);
    $('#txtOtherIDNo').enable(true);
    $('#txtLocCode').enable(false);
    $('#lugLocType').enable(true);
    $('#idvallugLocType').enable(false);
    $('#idvallugLocType').prop("disabled", true);
    $('#idvallugLocType').css("background-color", "#F0F0F0");
    $('#chkFullAddress').enable(true);
    $('#txtFullAddress').enable(false);
    $('#txtUnitNo').enable(true);
    $('#txtFloorNo').enable(true);
    $('#txtBldgNo').enable(true);
    $('#txtBldgName').enable(true);
    $('#txtLandmark').enable(true);
    $('#txtStreetNo').enable(true);
    $('#txtStreetName').enable(true);
    $('#txtLot').enable(true);
    $('#txtBlock').enable(true);
    $('#txtPhase').enable(true);
    $('#txtSubdivision').enable(true);
    $('#txtZone').enable(true);
    $('#lugArea').enable(true);
    $('#lugStdBrgy').enable(true);
    $('#txtAltBrgy').enable(true);
    $('#lugMunicipality').enable(true);
    $('#txtProvince').enable(false);
    $('#txtRegion').enable(false);
    $('#txtZipCode').enable(true);
    $('#txtPhoneBus').enable(true);
    $('#txtMobile').enable(true);
    $('#txtEmailAdd').enable(true);
    $('#txtApprovalID').enable(false);
    $('#txtRecStats').enable(false);
    $('#btnReqCompHDR').enable(false);
    $('#btnVwUpdHistory').enable(false);
    $('#nwGrid').enable(true);
}

function DisableFields() {
    $('#txtSalesPersonCode').enable(false);
    $('#txtSalesPersonName').enable(false);
    $('#txtCrossRefCode').enable(false);
    $('#lugPartyType').enable(false);
    $('#lugSalutation').enable(false);
    $('#txtLastName').enable(false);
    $('#txtFirstName').enable(false);
    $('#txtMiddleName').enable(false);
    $('#txtMI').enable(false);
    $('#lugNameSuffix').enable(false);
    $('#txtDateOfBirth').enable(false);
    $('#txtAge').enable(false);
    $('#txtPlaceOfBirth').enable(false);
    $('#lugGender').enable(false);
    $('#lugCivilStats').enable(false);
    $('#lugJobTitle').enable(false);
    $('#lugRelationToDealer').enable(false);
    $('#chkisMultilpleDealer').enable(false);
    $('#txtTaxIDNo').enable(false);
    $('#txtSSSNo').enable(false);
    $('#lugOtherID').enable(false);
    $('#txtOtherIDNo').enable(false);
    $('#txtLocCode').enable(false);
    $('#lugLocType').enable(false);
    $('#chkFullAddress').enable(false);
    $('#txtFullAddress').enable(false);
    $('#txtUnitNo').enable(false);
    $('#txtFloorNo').enable(false);
    $('#txtBldgNo').enable(false);
    $('#txtBldgName').enable(false);
    $('#txtLandmark').enable(false);
    $('#txtStreetNo').enable(false);
    $('#txtStreetName').enable(false);
    $('#txtLot').enable(false);
    $('#txtBlock').enable(false);
    $('#txtPhase').enable(false);
    $('#txtSubdivision').enable(false);
    $('#txtZone').enable(false);
    $('#lugArea').enable(false);
    $('#lugStdBrgy').enable(false);
    $('#txtAltBrgy').enable(false);
    $('#lugMunicipality').enable(false);
    $('#txtProvince').enable(false);
    $('#txtRegion').enable(false);
    $('#txtZipCode').enable(false);
    $('#txtPhoneBus').enable(false);
    $('#txtMobile').enable(false);
    $('#txtEmailAdd').enable(false);
    $('#txtApprovalID').enable(false);
    $('#txtRecStats').enable(false);
    $('#btnReqCompHDR').enable(false);
    $('#btnVwUpdHistory').enable(false);
    $('#nwGrid').enable(false);

    $("#noah-webui-Toolbox").bindingImport().enable(false);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    //$("#noah-webui-Toolbox").bindingProcess().visible(false);

    if ($('#txtRecStats').val().toLowerCase() == "cancelled") {
        $("#noah-webui-Toolbox").bindingSave().enable(false);
    }
}

function EnableFieldsDone() {//Binding Done
    EnableFields();
    $('#btnReqCompHDR').enable(true);
    $('#btnVwUpdHistory').enable(true);
    $('#txtPlaceOfBirth').enable(false);
    $('#lugGender').enable(false);
    $('#lugCivilStats').enable(false);
    $('#lugJobTitle').enable(false);
    $('#lugRelationToDealer').enable(false);
    $('#txtTaxIDNo').enable(false);
    $('#lugOtherID').enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);

    chkIfDisabled();
}

function chkIfDisabled() {
    if ($('#txtRecStats').val() == "Cancelled" || $('#txtRecStats').val() == "For Approval" || nwdocno != "" || $('#txtRecStats').val() == "Approved" || nwdocno != "") {
        DisableFields();
        $("#noah-webui-Toolbox").bindingDelete().enable(false);
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#noah-webui-Toolbox").bindingProcess().enable(false);
        $('#btnReqCompHDR').enable(true);
        $('#btnVwUpdHistory').enable(true);
    }
}

function DisableFieldsEmpty() {
    DisableFields();
    $('#btnReqCompHDR').enable(false);
    $('#btnVwUpdHistory').enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
}

function ClearFields() {
    $('#txtSalesPersonCode').val("");
    $('#txtSalesPersonName').val("");
    $('#txtCrossRefCode').val("");
    $('#idvallugPartyType').val("");
    $('#descvallugPartyType').val("");
    $('#idvallugSalutation').val("");
    $('#descvallugSalutation').val("");
    $('#txtLastName').val("");
    $('#txtFirstName').val("");
    $('#txtMiddleName').val("");
    $('#txtMI').val("");
    $('#idvallugNameSuffix').val("");
    $('#descvallugNameSuffix').val("");
    $('#txtDateOfBirth').val("");
    $('#txtAge').val("");
    $('#txtPlaceOfBirth').val("");
    $('#idvallugGender').val("");
    $('#descvallugGender').val("");
    $('#idvallugCivilStats').val("");
    $('#descvallugCivilStats').val("");
    $('#idvallugJobTitle').val("");
    $('#descvallugJobTitle').val("");
    $('#idvallugRelationToDealer').val("");
    $('#descvallugRelationToDealer').val("");
    $('#chkisMultilpleDealer').prop("checked", false);
    $('#txtTaxIDNo').val("");
    $('#txtSSSNo').val("");
    $('#idvallugOtherID').val("");
    $('#descvallugOtherID').val("");
    $('#txtOtherIDNo').val("");
    $('#txtLocCode').val("");
    $('#idvallugLocType').val("");
    $('#descvallugLocType').val("");
    $('#chkFullAddress').prop("checked", false);
    $('#txtFullAddress').val("");
    $('#txtUnitNo').val("");
    $('#txtFloorNo').val("");
    $('#txtBldgNo').val("");
    $('#txtBldgName').val("");
    $('#txtLandmark').val("");
    $('#txtStreetNo').val("");
    $('#txtStreetName').val("");
    $('#txtLot').val("");
    $('#txtBlock').val("");
    $('#txtPhase').val("");
    $('#txtSubdivision').val("");
    $('#txtZone').val("");
    $('#idvallugArea').val("");
    $('#descvallugArea').val("");
    $('#idvallugStdBrgy').val("");
    $('#descvallugStdBrgy').val("");
    $('#txtAltBrgy').val("");
    $('#idvallugMunicipality').val("");
    $('#descvallugMunicipality').val("");
    $('#txtProvince').val("");
    $('#txtRegion').val("");
    $('#txtZipCode').val("");
    $('#txtPhoneBus').val("");
    $('#txtMobile').val("");
    $('#txtEmailAdd').val("");
    $('#txtApprovalID').val("");
    $('#txtRecStats').val("");
    //$('#chkGridToggle').prop("checked", false);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else {
        EnableFieldsDone();
        if (isView == "true") {
            $('#noah-webui-Toolbox').visible(false);
        }
    }

}


$(function () {
    $('#txtVatrate').on('keypress', function (e) {
        if (e.which == 32)
            return false;
    });
});

function isNewGrid(well) {
    var SBAITable = $("#nwConGrid .tblGridBody");
    var SBAITableLen = SBAITable.find("tr").length;
    for (var i = 0; i < SBAITableLen ; i++) {
        if (!well) {
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_DefDepoAcct + ')').css("background", "gainsboro");
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_Payee + ')').css("background", "gainsboro");
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_BranchCode + ')').css("background", "gainsboro");
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_BranchName + ')').css("background", "gainsboro");
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_TypeOfAcct + ')').css("background", "gainsboro");
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_TypeOfAcct + ')').find(".nwSelect").css("background", "gainsboro");
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_AcctNo + ')').css("background", "gainsboro");
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SwiftCode + ')').css("background", "gainsboro");
        }
        else {
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_DefDepoAcct + ')').css("background", "");
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_Payee + ')').css("background", "");
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_BranchCode + ')').css("background", "");
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_BranchName + ')').css("background", "");
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_TypeOfAcct + ')').css("background", "");
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_TypeOfAcct + ')').find(".nwSelect").css("background", "");
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_AcctNo + ')').css("background", "");
            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SwiftCode + ')').css("background", "");
        }
    }
}

function CreateGridDone() {
    //var SBAITable = $("#nwConGrid .tblGridBody");
    //var SBAITableLen = SBAITable.find("tr").length;
    //chkIfDisabled();
    //if ($("#txtRecStats").val().toLowerCase() == "approved" || $("#txtRecStats").val().toLowerCase() == "for approval") {
    //    $('#nwConGrid').enable(true);
    //    $('#nwConGrid input, #nwConGrid select').enable(false);
    //    $('.nwgrid_buttons').enable(false);
    //}
    //for (var i = 0; i < SBAITableLen ; i++) {
    //    SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_PaymentInstruction + ')').find(".nwgbtnRemarks").removeClass("nwGreen");

    //    if (SBAITable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PaymentInstruction + ")").find(".nwgRemarks").val().length <= 0) {
    //        SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_PaymentInstruction + ')').find(".nwgbtnRemarks").removeClass("btnGreen");
    //        SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_PaymentInstruction + ')').find(".nwgbtnRemarks").addClass("btnBlue");
    //    }
    //    else {
    //        SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_PaymentInstruction + ')').find(".nwgbtnRemarks").removeClass("btnBlue");
    //        SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_PaymentInstruction + ')').find(".nwgbtnRemarks").addClass("btnGreen");
    //    }

    //    if ($("#txtRecStats").val().toLowerCase() == "approved" || $("#txtRecStats").val().toLowerCase() == "for approval") {
    //        if (SBAITable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_Bank + ")").text().length > 0 ||
    //            SBAITable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_Payee + ")").find(".txtSPR_Payee").val().length > 0) {
    //            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_PaymentInstruction + ')').find(".nwgbtnRemarks").enable(true);
    //            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_PaymentInstruction + ')').find(".nwgbtnRemarks").attr("disabled", false);
    //        }
    //        else {
    //            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_PaymentInstruction + ')').find(".nwgbtnRemarks").enable(false);
    //            SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_PaymentInstruction + ')').find(".nwgbtnRemarks").attr("disabled", true);
    //        }
    //        SBAITable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_Bank + ")").enable(false);
    //        SBAITable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_TypeOfPayment + ")").enable(false);
    //        SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_DefDepoAcct + ')').css("background", "gainsboro");
    //        SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_Payee + ')').css("background", "gainsboro");
    //        SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_BranchCode + ')').css("background", "gainsboro");
    //        SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_BranchName + ')').css("background", "gainsboro");
    //        SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_TypeOfAcct + ')').css("background", "gainsboro");
    //        SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_TypeOfAcct + ')').find(".nwSelect").css("background", "gainsboro");
    //        SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_AcctNo + ')').css("background", "gainsboro");
    //        SBAITable.find("tr:eq(" + i + ")").find('td:eq(' + SPR_SwiftCode + ')').css("background", "gainsboro");
    //    }
    //}
    //$('.nwCheckBoxTot1').visible(false);

    

    //V10
    var grid = nwGridCon_Book.ActiveSheet;

    
    grid.SetDataType(SPR_Payee - 1, Spread_ALLROW, "text");
    grid.SetMaxLength(SPR_Payee - 1, Spread_ALLROW, 80);

    grid.SetDataType(SPR_BranchCode - 1, Spread_ALLROW, "text");
    grid.SetMaxLength(SPR_BranchCode - 1, Spread_ALLROW, 80);

    grid.SetDataType(SPR_BranchName - 1, Spread_ALLROW, "text");
    grid.SetMaxLength(SPR_BranchName - 1, Spread_ALLROW, 80);

    grid.SetDataType(SPR_AcctNo - 1, Spread_ALLROW, "text");
    grid.SetMaxLength(SPR_AcctNo - 1, Spread_ALLROW, 30);

    grid.SetDataType(SPR_SwiftCode - 1, Spread_ALLROW, "text");
    grid.SetMaxLength(SPR_SwiftCode - 1, Spread_ALLROW, 80);

    grid.SetTemplate(SPR_PaymentInstruction - 1, Spread_ALLROW, "remarks", "");
    grid.SetTextColor(SPR_PaymentInstruction - 1, Spread_ALLROW, "#FFFFFF");
    grid.SetText2(SPR_PaymentInstruction - 1, Spread_ALLROW, "...");
    if (isRefresh)
        grid.SetBackground(SPR_PaymentInstruction - 1, Spread_ALLROW, "#2f7dcb");
    else
        grid.SetBackground(SPR_PaymentInstruction - 1, Spread_ALLROW, "gainsboro");

}

function nwCuzButtonColor() {
    var SBAITables = $("#nwConGrid .tblGridBody");
    SBAITables.find("tr:eq(" + crnwTR.index() + ")").find('td:eq(' + SPR_PaymentInstruction + ')').find(".nwgbtnRemarks").removeClass("nwGreen");

    if (SBAITables.find("tr:eq(" + crnwTR.index() + ")").find("td:eq(" + SPR_PaymentInstruction + ")").find(".nwgRemarks").val().length <= 0) {
        SBAITables.find("tr:eq(" + crnwTR.index() + ")").find('td:eq(' + SPR_PaymentInstruction + ')').find(".nwgbtnRemarks").removeClass("btnGreen");
        SBAITables.find("tr:eq(" + crnwTR.index() + ")").find('td:eq(' + SPR_PaymentInstruction + ')').find(".nwgbtnRemarks").addClass("btnBlue");
    }
    else {
        SBAITables.find("tr:eq(" + crnwTR.index() + ")").find('td:eq(' + SPR_PaymentInstruction + ')').find(".nwgbtnRemarks").removeClass("btnBlue");
        SBAITables.find("tr:eq(" + crnwTR.index() + ")").find('td:eq(' + SPR_PaymentInstruction + ')').find(".nwgbtnRemarks").addClass("btnGreen");
    }
}

function getDocNo() {
    nwdocno = getParameterByName("nwDocno");
    isView = getParameterByName("isView");

    if (nwdocno != "" && isView == "true") {
        $('#noah-webui-Toolbox').visible(false);
        nwParameter_Add("bindnwDocno", nwdocno); nwParameter_Add("bindisView", isView);
        $('#noah-webui-default-Refresh').click();
    }
}

function nwGrdi_DblClick(nwGridObj, crTR, crTD) {
    if (nwGridObj.attr("id") == "nwGrid") {
        if (crnwTD.index() == SPR_Bank) {
            lookUpCustomize("lugBank", 1);
        }
        if (crnwTD.index() == SPR_TypeOfPayment) {
            lookUpCustomize("lugTypeOfPayment", 1);
        }
    }
}

function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idnum-1) + ")").find("td:eq(" + (index) + ") span").text();
    return data;
}

function func_LookUpInitialize(dimP) {
    var grid = nwGridCon_Book.ActiveSheet;
    var row = grid.GetSelectedIndexes().row;
    var isContinue = true;
    cust_GetPara();

    if (dimP == "lugPartyType") { }

    if (dimP == "lugSalutation") { }

    if (dimP == "lugNameSuffix") { }

    if (dimP == "lugGender") { }

    if (dimP == "lugCivilStats") { }

    if (dimP == "lugJobTitle") { }

    if (dimP == "lugRelationToDealer") { }

    if (dimP == "lugOtherID") { }

    if (dimP == "lugLocType") { }

    if (dimP == "lugArea") { }

    if (dimP == "lugStdBrgy") { }

    if (dimP == "lugMunicipality") { }

    if (dimP == "lugBank") {
        var paytype = grid.GetText(SPR_TypeOfPaymentCode, row);
        var chkAllBanks = grid.GetText(SPR_AllBanks, row);

        nwParameter_Add("payment", paytype);
        nwParameter_Add("allbanks", chkAllBanks);
    }

    if (dimP == "lugTypeOfPayment") { }

    return isContinue;
}

function Lookup_DoneFunction(idName, idNum) {
    var grid = nwGridCon_Book.ActiveSheet;
    var row = grid.GetSelectedIndexes().row;



    if (idName == "lugPartyType") { }

    if (idName == "lugSalutation") { }

    if (idName == "lugNameSuffix") {
        var txtns = $("#idvallugNameSuffix").val();
        if (txtns == "") {
            setSalesPersonName();
        }
        else {
            setSalesPersonName();
        }
    }

    if (idName == "lugGender") { }

    if (idName == "lugCivilStats") { }

    if (idName == "lugJobTitle") { }

    if (idName == "lugRelationToDealer") { }

    if (idName == "lugOtherID") { }

    if (idName == "lugLocType") { }

    if (idName == "lugArea") {
        if (!$('#chkFullAddress').prop("checked")) {
            setFullAdd();
        }
    }

    if (idName == "lugStdBrgy") {
        if ($('#idvallugStdBrgy').val() != "") {
            $('#idvallugMunicipality').val(getLookupData(idNum, 2));
            $('#descvallugMunicipality').val(getLookupData(idNum, 3));
            $('#txtProvinceCode').val(getLookupData(idNum, 4));
            $('#txtProvince').val(getLookupData(idNum, 5));
            $('#txtRegionCode').val(getLookupData(idNum, 6));
            $('#txtRegion').val(getLookupData(idNum, 7));
            $('#txtZipCode').val(getLookupData(idNum, 8));

            $('#txtAltBrgy').enable(false);
            $('#txtAltBrgy').val("");
        }
        else {
            $('#txtAltBrgy').enable(true);
            $('#txtAltBrgy').val("");
            $('#idvallugMunicipality').val("");
            $('#descvallugMunicipality').val("");
            $('#txtProvinceCode').val("");
            $('#txtProvince').val("");
            $('#txtRegionCode').val("");
            $('#txtRegion').val("");
            $('#txtZipCode').val("");
        }

        if (!$('#chkFullAddress').prop("checked")) {
            setFullAdd();
        }
    }

    if (idName == "lugMunicipality") {
        if ($('#idvallugMunicipality').val() != "") {
            $('#txtProvinceCode').val(getLookupData(idNum, 7));
            $('#txtProvince').val(getLookupData(idNum, 3));
            $('#txtRegionCode').val(getLookupData(idNum, 8));
            $('#txtRegion').val(getLookupData(idNum, 4));
            $('#txtZipCode').val(getLookupData(idNum, 2));
        }
        else {
            $('#idvallugMunicipality').val("");
            $('#descvallugMunicipality').val("");
            $('#txtProvinceCode').val("");
            $('#txtProvince').val("");
            $('#txtRegionCode').val("");
            $('#txtRegion').val("");
            $('#txtZipCode').val("");
        }

        if (!$('#chkFullAddress').prop("checked")) {
            setFullAdd();
        }
    }

    if (idName == "lugBank") {
        grid.SetText(SPR_BankCode - 1, row, getLookupData(idNum, 0));
        grid.SetText(SPR_Bank-1, row, getLookupData(idNum, 1));
        setFullAccNo();

        var xBankCode = grid.GetText(SPR_BankCode - 1, row);
        if (xBankCode == "METROBANK")
        {
            var xBranchCode = grid.GetText(SPR_BranchCode - 1, row);
            var xAcctNo = grid.GetText(SPR_AcctNo - 1, row);
            var finalTxt = xBranchCode + xAcctNo;
            grid.SetText(SPR_FullAcctNo - 1, row, finalTxt)
        }
    }

    if (idName == "lugTypeOfPayment") {
        grid.SetText(SPR_TypeOfPaymentCode - 1, row, getLookupData(idNum, 0));
        grid.SetText(SPR_TypeOfPayment - 1, row, getLookupData(idNum, 1));
        grid.SetText(SPR_SCReq - 1, row, getLookupData(idNum, 2));
        grid.SetText(SPR_AllBanks - 1, row, getLookupData(idNum, 3));

        if (getLookupData(idNum, 3).toLowerCase() == "0" || getLookupData(idNum, 3).toLowerCase() == "") {
            grid.SetText(SPR_BankCode - 1, row, "");
            grid.SetText(SPR_Bank - 1, row, "");
        }
    }

    if (idName == "lugTypeOfAccount") {
        grid.SetText(SPR_TypeOfAcctCode - 1, row, getLookupData(idNum, 0));
        grid.SetText(SPR_TypeOfAcct - 1, row, getLookupData(idNum, 1));
    } 
}

function setFullAccNo() {

    var crnwTables1 = nwGridCon_Book.ActiveSheet;
    var itemcounts1 = crnwTables1.GetMaxRow();
    var mbtcFound = false;

    for (var i = 0; i < itemcounts1; i++) {
        var col3 = crnwTables1.GetText(SPR_Bank, i);

        // Check if "MBTC" is in the SPR_Bank column
        if (col3.indexOf("MBTC") !== -1) {
            mbtcFound = true;
        }
    }

    // Update #ForFullAcctNo based on whether "MBTC" was found
    crnwTables1.SetText(SPR_Bank, i, mbtcFound ? "*" : "");
}

function setSalesPersonName() {
    var fName = $('#txtFirstName').val();
    var mName = $('#txtMiddleName').val();
    var lName = $('#txtLastName').val();
    var NameS = $('#descvallugNameSuffix').val();
    var SPName = (fName == "" ? "" : fName + " ") + (mName == "" ? "" : mName + " ") + (lName == "" ? "" : lName) + (NameS == "" ? "" : " " + NameS);

    $('#txtSalesPersonName').val(SPName);

    var crnwTables1 = $("#nwConGrid .tblGridBody");
    var itemcounts1 = crnwTables1.find("tr").length;
    for (var i = 0; i < itemcounts1 ; i++) {
        var col1 = crnwTables1.find("tr:eq(" + i + ")").find("td:eq(" + SPR_DefDepoAcct + ")").find(".chkSPR_DefDepoAcct").prop("checked");
        var col2 = crnwTables1.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BankCode + ")").text();
        var col3 = crnwTables1.find("tr:eq(" + i + ")").find("td:eq(" + SPR_Bank + ")").text();
        var col4 = crnwTables1.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BranchCode + ")").find(".txtSPR_BranchCode").val();
        var col5 = crnwTables1.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BranchName + ")").find(".txtSPR_BranchName").val();
        var col6 = crnwTables1.find("tr:eq(" + i + ")").find("td:eq(" + SPR_TypeOfAcct + ")").find(".nwSelect").val();
        var col7 = crnwTables1.find("tr:eq(" + i + ")").find("td:eq(" + SPR_AcctNo + ")").find(".txtSPR_AcctNo").val();
        var col8 = crnwTables1.find("tr:eq(" + i + ")").find("td:eq(" + SPR_FullAcctNo + ")").text();
        var col9 = crnwTables1.find("tr:eq(" + i + ")").find("td:eq(" + SPR_SwiftCode + ")").find(".txtSPR_SwiftCode").val();
        var col10 = crnwTables1.find("tr:eq(" + i + ")").find("td:eq(" + SPR_TypeOfPaymentCode + ")").text();
        var col11 = crnwTables1.find("tr:eq(" + i + ")").find("td:eq(" + SPR_TypeOfPayment + ")").text();
        var col12 = crnwTables1.find("tr:eq(" + i + ")").find("td:eq(" + SPR_PaymentInstruction + ")").find(".nwgRemarks").val();
        var col13 = crnwTables1.find("tr:eq(" + i + ")").find("td:eq(" + SPR_Payee + ")").find(".txtSPR_Payee").val();

        if ((col1 || col2.length > 0 || col3.length > 0 || col4.length > 0 || col5.length > 0 || col6.length > 0 || col7.length > 0 || col8.length > 0 || col9.length > 0 || col10.length > 0 || col11.length > 0 || col12.length > 0) && col13 / length <= 0) {
            crnwTables1.find("tr:eq(" + i + ")").find("td:eq(" + SPR_Payee + ")").find(".txtSPR_Payee").val(SPName);
        }
    }
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function clearAddDtls() {
    $('#txtFullAddress').val("");
    $('#txtUnitNo').val("");
    $('#txtFloorNo').val("");
    $('#txtBldgNo').val("");
    $('#txtBldgName').val("");
    $('#txtLandmark').val("");
    $('#txtStreetNo').val("");
    $('#txtStreetName').val("");
    $('#txtLot').val("");
    $('#txtBlock').val("");
    $('#txtPhase').val("");
    $('#txtSubdivision').val("");
    $('#txtZone').val("");
    //$('#idvallugArea').val("");
    //$('#descvallugArea').val("");
    //$('#idvallugStdBrgy').val("");
    //$('#descvallugStdBrgy').val("");
    //$('#txtAltBrgy').val("");
    //$('#idvallugMunicipality').val("");
    //$('#descvallugMunicipality').val("");
    //$('#txtProvince').val("");
    //$('#txtRegion').val("");
    //$('#txtZipCode').val("");
}

function changeFullAddress(e, isNew) {
    if (e.prop("checked")) {
        $('#txtFullAddress').enable(true);
        $('#txtUnitNo').enable(false);
        $('#txtFloorNo').enable(false);
        $('#txtBldgNo').enable(false);
        $('#txtBldgName').enable(false);
        $('#txtLandmark').enable(false);
        $('#txtStreetNo').enable(false);
        $('#txtStreetName').enable(false);
        $('#txtLot').enable(false);
        $('#txtBlock').enable(false);
        $('#txtPhase').enable(false);
        $('#txtSubdivision').enable(false);
        $('#txtZone').enable(false);
        $('#lugArea').enable(true);
        //$('#lugStdBrgy').enable(false);
        //$('#txtAltBrgy').enable(false);
        //$('#lugMunicipality').enable(false);
        $('#txtProvince').enable(false);
        $('#txtRegion').enable(false);
        $('#txtZipCode').enable(true);

        $('#ForSN,#ForSD,#ForBld').text("");
        $('#ForFA').text("*");

        //clearAddDtls();
        if (isNew) {
            setFullAdd();
        }
    }
    else {
        $('#txtFullAddress').enable(false);
        $('#txtUnitNo').enable(true);
        $('#txtFloorNo').enable(true);
        $('#txtBldgNo').enable(true);
        $('#txtBldgName').enable(true);
        $('#txtLandmark').enable(true);
        $('#txtStreetNo').enable(true);
        $('#txtStreetName').enable(true);
        $('#txtLot').enable(true);
        $('#txtBlock').enable(true);
        $('#txtPhase').enable(true);
        $('#txtSubdivision').enable(true);
        $('#txtZone').enable(true);
        $('#lugArea').enable(true);
        //$('#lugStdBrgy').enable(true);
        //$('#txtAltBrgy').enable(true);
        //$('#lugMunicipality').enable(true);
        $('#txtProvince').enable(false);
        $('#txtRegion').enable(false);
        $('#txtZipCode').enable(true);

        $('#ForSN,#ForSD,#ForSB,#ForAB,#ForMN').text("*");
        $('#ForFA').text("");

        //clearAddDtls();
        if (isNew) {
            setFullAdd();
        }
    }
}

function isValidInput(input) {
    // Define a regular expression that allows only dash and numeric characters
    const regex = /^[0-9\-]+$/;

    // Test the input against the regular expression
    return regex.test(input);
}

function func_WindowCloseTrigger(verID) {
    cust_GetPara();

    if (verID == "nwPopUpRequireCompliance") {
        nwLoading_Start("actHasRqrdCompli", crLoadingHTML);
        func_ActionDriven('actHasRqrdCompli', false);
    }
    return true;
}

function nwGrid_Change(nwGridObj, crTR, crTD) {
    if (nwGridObj.attr("id") == "nwGrid") {
        if (crTD.index() == SPR_DefDepoAcct) {
            crnwTable = nwGridObj.find(".tblGridBody");//$("#nwGridDependent  .tblGridBody");

            var istick = crnwTable.find("tr:eq(" + crTR.index() + ")").find("td:eq(" + SPR_DefDepoAcct + ") input").prop("checked");
            crnwTable.find("tr").find("td:eq(" + SPR_DefDepoAcct + ") input").prop("checked", false);
            crnwTable.find("tr:eq(" + crTR.index() + ")").find("td:eq(" + SPR_DefDepoAcct + ") input").prop("checked", istick);
        }
    }
}

function setFullAdd() {
    let fullAdd = "";
    let txtUnitNo = $('#txtUnitNo').val();
    let txtFlrNo = $('#txtFloorNo').val();
    let txtBldgNo = $('#txtBldgNo').val();
    let txtBldgNm = $('#txtBldgName').val();
    let txtLndmrk = $('#txtLandmark').val();
    let txtStNo = $('#txtStreetNo').val();
    let txtStNm = $('#txtStreetName').val();
    let txtLot = $('#txtLot').val();
    let txtBlck = $('#txtBlock').val();
    let txtPhase = $('#txtPhase').val();
    let txtSubDiv = $('#txtSubdivision').val();
    let txtZone = $('#txtZone').val();
    let txtArea = $('#descvallugArea').val();
    let txtStdBrgy = $('#descvallugStdBrgy').val();
    let txtAltBrgy = $('#txtAltBrgy').val();
    let txtMuni = $('#descvallugMunicipality').val();
    let txtProvince = $('#txtProvince').val();
    let txtRegion = $('#txtRegion').val();
    let txtZipCode = $('#txtZipCode').val();

    if (!($('#chkFullAddress').prop("checked"))) {
        if (txtUnitNo != "")
            txtUnitNo += " ";
        if (txtFlrNo != "")
            txtFlrNo += " ";
        if (txtBldgNo != "")
            txtBldgNo += " ";
        if (txtBldgNm != "")
            txtBldgNm += " ";
        if (txtLndmrk != "")
            txtLndmrk += " ";
        if (txtStNo != "")
            txtStNo += " ";
        if (txtStNm != "")
            txtStNm += " ";
        if (txtLot != "")
            txtLot += " ";
        if (txtBlck != "")
            txtBlck += " ";
        if (txtPhase != "")
            txtPhase += " ";
        if (txtSubDiv != "")
            txtSubDiv += " ";
        if (txtZone != "")
            txtZone += " ";
        if (txtArea != "")
            txtArea += " ";
        if (txtStdBrgy != "")
            txtStdBrgy += ", ";
        if (txtAltBrgy != "")
            txtAltBrgy += ", ";
        if (txtMuni != "")
            txtMuni += ", ";
        if (txtProvince != "")
            txtProvince += ", ";
        if (txtRegion != "")
            txtRegion += ", ";
        if (txtZipCode != "")
            txtZipCode += " ";

        fullAdd = txtUnitNo + txtFlrNo + txtBldgNo + txtBldgNm + txtLndmrk + txtStNo + txtStNm + txtLot + txtBlck + txtPhase + txtSubDiv + txtZone + txtArea + txtStdBrgy + txtAltBrgy + txtMuni + txtProvince + txtRegion + txtZipCode;
    }
    else {
        if (txtArea != "")
            txtArea += " ";
        if (txtStdBrgy != "")
            txtStdBrgy += ", ";
        if (txtAltBrgy != "")
            txtAltBrgy += ", ";
        if (txtMuni != "")
            txtMuni += ", ";
        if (txtProvince != "")
            txtProvince += ", ";
        if (txtRegion != "")
            txtRegion += ", ";
        if (txtZipCode != "")
            txtZipCode += " ";

        fullAdd = txtArea + txtStdBrgy + txtAltBrgy + txtMuni + txtProvince + txtRegion + txtZipCode;
    }
    $('#txtFullAddress').val(fullAdd);
}

$(document).on("click", '#btnnwgRemarks', function (e) {
    nwCuzButtonColor();
    return true;
});

$(document).on("click", ".nwgbtnRemarks", function () {
    if ($("#txtRecStats").val().toLowerCase() == "approved" || $("#txtRecStats").val().toLowerCase() == "for approval") {
        $("#btnnwgRemarks").enable(false);
        $("#chknwgRemarks").enable(false);
        $("#txtnwgRemarks").enable(false);
    }
});

$(document).on("keypress keyup", "#txtUnitNo, #txtFloorNo, #txtBldgNo, #txtBldgName, #txtLandmark, #txtStreetNo, #txtStreetName, #txtLot, #txtBlock, #txtPhase, #txtSubdivision, #txtZone", function () {
    setFullAdd();
});

$(document).on("change", "#txtUnitNo, #txtFloorNo, #txtBldgNo, #txtBldgName, #txtLandmark, #txtStreetNo, #txtStreetName, #txtLot, #txtBlock, #txtPhase, #txtSubdivision, #txtZone", function () {
    setFullAdd();
});

$(document).on("keypree keyup", "#txtAltBrgy, #txtProvince, #txtRegion, #txtZipCode", function () {
    if (!($('#chkFullAddress').prop("checked")) || $(this).attr("id").includes("txtZipCode") || $(this).attr("id").includes("txtAltBrgy")) {
        setFullAdd();
    }
});

$(document).on("change", "#txtAltBrgy, #txtProvince, #txtRegion, #txtZipCode", function () {
    if (!($('#chkFullAddress').prop("checked")) || $(this).attr("id").includes("txtZipCode") || $(this).attr("id").includes("txtAltBrgy")) {
        setFullAdd();
    }
});

$(document).on("keydown keypress", ".txtSPR_SwiftCode", function (e) {
    var pressk = e.which;
    var pressk2 = e.keyCode;

    if (pressk == 32 || pressk2 == 32) {
        $(this).val($(this).val().replaceAll(" ", ""));
        return false;
    }
});

$(document).on("change", "#txtDateOfBirth", function (e) {
    try {
        var inputDate = $("#txtDateOfBirth").val();

        if (inputDate != '') {
            var today = new Date();
            var bdate = new Date(inputDate);

            // Check if the input date exceeds the current date
            if (bdate > today) {
                $("#txtDateOfBirth").val(''); // Clear the input if invalid
                $("#txtAge").val('');
                MessageBox("Cannot proceed. Date of Birth should not be later than the current date.", pageTitle, "error");
            }

            var age = today.getFullYear() - bdate.getFullYear();
            var m = today.getMonth() - bdate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < bdate.getDate())) {
                age--;
            }

            $("#txtAge").val(age);
        } else {
            $("#txtAge").val("");
        }
    } catch (error) {
        $("#txtDateOfBirth").val(''); // Clear the input if invalid
        $("#txtAge").val('');
        MessageBox("Cannot proceed. Date of Birth should not be later than the current date.", pageTitle, "error");

    }
});



function validatetxtTaxIDNoInput() {
    var TaxIDNo = $('#txtTaxIDNo').val();
    var inputValue = TaxIDNo.value.trim();

    // Check if the input length is less than 9 characters
    if (inputValue.length < 9) {
        // Display a message box if the input length is less than 9
        MessageBox("Cannot Save. Tax ID No. must be at least 9 characters long", pageTitle, "error");
    }
}



$(document).on("keyup keydown keypress change", "#txtFirstName,#txtLastName", function () {
    $('#txtFirstName').val(toTitleCase($('#txtFirstName').val()));
    $('#txtLastName').val(toTitleCase($('#txtLastName').val()));
    setSalesPersonName();
});

$(document).on("keyup keydown keypress change", "#txtMiddleName", function () {
    $('#txtMiddleName').val(toTitleCase($('#txtMiddleName').val()));
    var midIni = $('#txtMiddleName').val() == "" ? "" : $('#txtMiddleName').val().substr(0, 1) + '.';
    $('#txtMI').val(midIni);
    setSalesPersonName();
});


$(document).on("change", "#chkFullAddress", function () {
    changeFullAddress($(this), true);
    var ischeck = $("#chkFullAddress").prop("checked");
    if (ischeck)
    {
        $("#reqFA").show();
        $(".opt").hide();
    }   
    else
    {
        $("#reqFA").hide();
        $(".opt").show();
    }
        
});

$(document).on("click", "#chkFullAddress", function () {
    clearAddDtls();
});

$(document).on("click", "#txtSSSNo, #txtTaxIDNo", function () {
    $(this).select();
});

$(document).on("keyup keydown keypress", "#txtSSSNo, #txtTaxIDNo", function (e) {
    var sss = $(this).val();
    var sssNoD = $(this).val().replaceAll("-", "");
    var x = e.keyCode;
    var xfirst = sss.charAt(0);
    var xlatest = sss.charAt(sss.length - 1);
    if ((x != 110 && x != 190) && ((x >= 48 && x <= 57) || (x >= 96 && x <= 105)) || x == 8 || ((x == 189 || x == 109) && (xlatest != "-" && xfirst != "")) || (x == 45 && (xlatest != "-" && xfirst != ""))) {
        if ($(this).attr("id") == "txtTaxIDNo") {
            if (sssNoD.length >= 14 && x != 8) {
                return false;
            }
        }
        else if ($(this).attr("id") == "txtSSSNo") {
            if (sssNoD.length >= 11 && x != 8) {
                return false;
            }
        }
    }
    else {
        return false;
    }
});

$(document).on("keyup keydown keypress", "#txtMobile", function (e) {
    var Mob = $("#txtMobile").val();
    var MobNoD = $("#txtMobile").val();
    var x = e.keyCode;
    if ((x != 110 && x != 190) && ((x >= 48 && x <= 57) || (x >= 96 && x <= 105)) || x == 8) {
        if (Mob.length < 1 && x != 8) {
            $("#txtMobile").val("639" + Mob);
        }
        if (Mob.length > 1 && MobNoD.length < 12 && MobNoD.substring(0, 3) != "639" && x != 8) {
            $("#txtMobile").val("639" + Mob);
        }
        if (Mob.length > 1 && MobNoD.length < 3 && MobNoD.substring(0, 3) != "639" && x != 8) {
            $("#txtMobile").val("639");
        }
        if (MobNoD.length >= 12 && x != 8) {
            return false;
        }
    }
    else {
        return false;
    }
});

$(document).on("click", "#GridToggleTitle", function () {
    $("#chkGridToggle").click();
});


$(document).on("change", "#chkGridToggle", function () {
    if ($(this).prop("checked")) {
        $('#HDRGrid').css("display", "none");
        $('#mainGrid').css("display", "none");
    }
    else {
        $('#HDRGrid').css("display", "block");
        $('#mainGrid').css("display", "block");
    }
});

$(document).on('click', '#btnReqCompHDR', function () {
    var trantype = 'SLSPRN'
    var docno = $('#txtApprovalID').val();
    var stats = $('#txtRecStats').val();
    isHeader = true;
    if (docno == "") {
        MessageBox("Cannot proceed. Data should be saved first", BasedTitle, "error");
        return false;
    }

    if (nwdocno != "" || stats.toLowerCase() == "approved" || stats.toLowerCase() == "for approval") {

        var fullength = GetCurrentURL() + "../DCRequirementCompliance?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=true";
    }
    else {
        var fullength = GetCurrentURL() + "../DCRequirementCompliance?TransactionNo=" + docno + "&TranType=" + trantype;
    }

    nwLoading_Start('xbtnReqmtCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
    $('#nwPopUpRequireCompliance .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpRequireCompliance").css({ "min-width": "98%" });
    $("#nwPopUpRequireCompliance").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpRequireCompliance");
    nwLoading_End('xbtnReqmtCompliance');

    return false;
});

//$(document).on("keyup keydown keypress", ".txtSPR_BranchCode,.txtSPR_AcctNo", function () {
//    var grid = nwGridCon_Book.ActiveSheet;
//    var row = grid.GetSelectedIndexes().row;

//    var xBranchCode = grid.GetText(SPR_BranchCode, row);
//    var xAcctNo = grid.GetText(SPR_AcctNo, row);
//    var finalTxt = xBranchCode + xAcctNo;

//    grid.SetText(SPR_FullAcctNo-1, row, finalTxt)
//});

$(document).on("click", "#btnVwUpdHistory", function (e) {
    e.preventDefault();
    cust_GetPara();

    nwLoading_Start("actVwUpdHst", crLoadingHTML);
    //$("#nwVwUpdHst").css({ "min-width": "68%" });
    //$("#nwVwUpdHst").css({ "min-height": "290px" });

    nwPopupForm_ShowModal("nwVwUpdHst");
    func_ActionDriven("actVwUpdHst", false);


    return false;
});

$(document).on("click", "#btnVwUpdHstRefresh", function (e) {
    e.preventDefault();
    cust_GetPara();
    nwLoading_Start("actVwUpdHst", crLoadingHTML);
    func_ActionDriven("actVwUpdHst", false);

    return false;
});

$(document).on("click", "#btnVwUpdHstExport", function () {
    fn_ExportGrid("nwGridCon2Custom");
    //return false;
})

$(document).on("click", ".txtSPR_Payee", function () {
    if (crnwTR.find("td:eq(" + SPR_Payee + ")").find(".txtSPR_Payee").val() == "") {
        crnwTR.find("td:eq(" + SPR_Payee + ")").find(".txtSPR_Payee").val($("#txtSalesPersonName").val());
    }
});

$(document).on("click", ".nwgrid_Insert", function () {
    CreateGridDone();
});

function func_nwGrid_DeleteValidation() {
    return true;
}

function func_nwGrid_InsertValidation() {
    return true;
}

function validateAltbrgy(input) {
    // Remove non-numeric characters

    if (input.value != "") {
        $('#lugStdBrgy').enable(false);
        $('#idvallugStdBrgy,#descvallugStdBrgy,#idvallugMunicipality,#descvallugMunicipality,#txtProvinceCode,#txtProvince,#txtRegionCode,#txtRegion,#txtZipCode').val('');
    }
    else {
        $('#lugStdBrgy').enable(true);
        $('#txtAltBrgy').val('');
    }


}

//$(document).on("change", "#txtAltBrgy", function () {
//    $('#lugStdBarangay').enable(true);
//    $('#txtAltBrgy').val('');
//});

$(document).on("click", "#txtMobile", function () {
    if ($(this).val() == "") {
        $(this).val("639");
    }
});

function chkBarangays() {
    if ($('#idvallugStdBrgy').val() != "") {
        $('#txtAltBrgy').enable(false);
    }
    else if ($('#txtAltBrgy').val() != "") {
        $('#lugStdBrgy').enable(false);
    }
    else {
        $('#txtAltBrgy').enable(true);
        $('#lugStdBrgy').enable(true);
    }
}

//$(document).ready(function () {
//    var maskBehavior = function (val) {
//        return val.replace(/\D/g, '').length == 12 ? '(9999) 9999-9999' : '(999) 9999-9999';
//    };

//    var options = {
//        onKeyPress: function (val, e, field, options) {
//            field.mask(maskBehavior.apply({}, arguments), options);
//        }
//    };

//    $('#txtPhoneBus').mask(maskBehavior, options);
//});

function formatPhoneNumber(input) {
    // Remove non-digit characters
    const phoneNumber = input.value.replace(/\D/g, '');

    // Determine the appropriate format
    let formattedPhoneNumber;
    if (phoneNumber.length == 12) {
        formattedPhoneNumber = phoneNumber.replace(/(\d{4})(\d{4})(\d{4})/, '($1) $2-$3');
    } else if (phoneNumber.length == 11) {
        formattedPhoneNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '($1) $2-$3');
    } else
        formattedPhoneNumber = '';

    // Update the input value
    input.value = formattedPhoneNumber;
}

function p8Spread_DblClick(canvasID, row, col) {
var isContinue = true;

if (canvasID == "nwGrid") {
    if ($('#nwGrid').enable() == false) {
        return false;
    }

    if (col == (SPR_Bank - 1)) {
        lookUpCustomize("lugBank", 1, undefined, true);
    }

    if (col == (SPR_TypeOfAcct - 1)) {
        lookUpCustomize("lugTypeOfAccount", 1, undefined, true);
    }

    if (col == (SPR_TypeOfPayment - 1)) {
        lookUpCustomize("lugTypeOfPayment", 1, undefined, true);
    }

}
return isContinue;
}


function enableGridInput() {
    var grid = nwGridCon_Book.ActiveSheet;
    grid.SetEnable(SPR_Payee - 1, Spread_ALLROW, true);
    grid.SetEnable(SPR_BranchCode - 1, Spread_ALLROW, true);
    grid.SetEnable(SPR_BranchName - 1, Spread_ALLROW, true);
    grid.SetEnable(SPR_AcctNo - 1, Spread_ALLROW, true);
    //grid.SetEnable(SPR_FullAcctNo - 1, Spread_ALLROW, true);
    grid.SetEnable(SPR_SwiftCode - 1, Spread_ALLROW, true);
    grid.SetTextAlign(SPR_PaymentInstruction - 1, Spread_ALLROW, "center");
    grid.SetBackground(SPR_PaymentInstruction - 1, Spread_ALLROW, "#2f7dcb");
}

function disableGridInput() {
    var grid = nwGridCon_Book.ActiveSheet;
    grid.SetEnable(SPR_Payee - 1, Spread_ALLROW, false);
    grid.SetEnable(SPR_BranchCode - 1, Spread_ALLROW, false);
    grid.SetEnable(SPR_BranchName - 1, Spread_ALLROW, false);
    grid.SetEnable(SPR_AcctNo - 1, Spread_ALLROW, false);
    //grid.SetEnable(SPR_FullAcctNo - 1, Spread_ALLROW, false);
    grid.SetEnable(SPR_SwiftCode - 1, Spread_ALLROW, false);
    grid.SetTextAlign(SPR_PaymentInstruction - 1, Spread_ALLROW, "center");
}

function p8Spread_Change(canvasID, row, col) {
    if ($("#" + canvasID).hasClass("noah-webui-disabled")) { return false; }
    var isContinue = true;
    _canvasID = canvasID;
    _row = row;
    _col = col;

    if (canvasID == "nwGrid")
    {
        var grid = nwGridCon_Book.ActiveSheet;
        if (col == (SPR_BranchCode - 1) || col == (SPR_AcctNo - 1))
        {
            var xBankCode = grid.GetText(SPR_BankCode - 1, row);
            
            if (xBankCode == "METROBANK")
            {
                var xBranchCode = grid.GetText(SPR_BranchCode - 1, row);
                var xAcctNo = grid.GetText(SPR_AcctNo - 1, row);
                var finalTxt = xBranchCode + xAcctNo;
                grid.SetText(SPR_FullAcctNo - 1, row, finalTxt)
            }

        }
    }
}

function p8Spread_Click(canvasID, row, col) {
    if ($("#" + canvasID).hasClass("noah-webui-disabled")) { return false; }
    var isContinue = true;
    _row = row;
    _col = col;

    if (canvasID == "nwGrid") {

        var grid = nwGridCon_Book.ActiveSheet;

        if (col == SPR_DefDepoAcct-1) {
            //var istick = grid.GetText(SPR_DefDepoAcct - 1, x) == "1" ? true : false;
            var istick = grid.GetText(SPR_DefDepoAcct - 1, x);

            for (var x = 0; x < grid.GetMaxRow() ; x++) {
                grid.SetText(SPR_DefDepoAcct - 1, x, "");
            }
            grid.SetText(SPR_DefDepoAcct - 1, row, istick);
        }

    }

    return isContinue;
}

$(document).on("keyup keydown keypress change", "#txtFirstName,#txtLastName,#txtMiddleName", function () {
    var grid = nwGridCon_Book.ActiveSheet;
    var name = $('#txtSalesPersonName').val();

    for (var x = 0; x < grid.GetMaxRow() ; x++) {
        grid.SetText(SPR_Payee - 1, x, name);
    }
    
});
