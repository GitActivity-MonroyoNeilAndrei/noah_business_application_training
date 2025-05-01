var isnewrow = 0;
var newRow = true;
//var nwLink;
var menuTitle = "Vendor Information";
var nwIsReport;
var nwSupplierCode = "";
var arry = "";
var nwDocno = "";
var isVendLoc = false;

function func_Reload() {
    //LoadStringsCases();
    
    crLnk = GetCurrentURL() + "APSupplierInformation_Gateway";
    crLnkGateKey = "APSupplierInformation";
    crnwTagSingleBind = true;

    nwIsReport = getParameterByName('nwIsReport');
    nwParameter_Add("nwIsReport", nwIsReport);

    nwSupplierCode = getParameterByName('nwSupplierCode');
    nwParameter_Add("nwSupplierCode", nwSupplierCode);

    nwDocno = getParameterByName('nwDocno');
    nwParameter_Add("nwDocno", nwDocno);

    DisableFieldsDone();
    DisableFields();
    
    var isContinue = true;
    init_request();
    cust_GetPara();

    $('#txtDateBirth').datepicker();
    $('#txtDateBirth').mask('?99/99/9999');
    $('#noah-webui-default-Inquire').enable(true);
    /*===== MODAL =====*/
    nwPopupForm_Create("linkbir", true);
    nwPopupForm_Create("linkTaxInfo", true);
    nwPopupForm_Create("linkLocation", true);
    nwPopupForm_Create("linkContacts", true);
    nwPopupForm_Create("linkChildUnitsAcct", true);
    nwPopupForm_Create("linkBranchGrpAss", true);
    nwPopupForm_Create("linkPmtTermAss", true);
    nwPopupForm_Create("nwDisappDtls", true);

    return isContinue;
}

// function if nwIsReport
function nwIsRefresh() {
    if (nwIsReport == 1) {
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox").hide();
    }
    else if (nwDocno != "") {
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        nwParameter_Add('nwDocno', nwDocno);
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox").hide();
    }
}

var PrependZeros = function (str, len) {
    if (typeof str === 'number' || Number(str)) {
        str = str.toString();
        return (len - str.length > 0) ? new Array(len + 1 - str.length).join('0') + str : str;
    }
    else {
        for (var i = 0, spl = str.split(' ') ; i < spl.length; spl[i] = (Number(spl[i]) && spl[i].length < len) ? PrependZeros(spl[i], len) : spl[i], str = (i == spl.length - 1) ? spl.join(' ') : str, i++);
        return str;
    }
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    ClearFields();
    EnableFields();
    func_Toolbox_Clear();

    // $('#noah-webui-Toolbox-BindingNavigator').enable(false);
    func_ActionDriven("actHeadOffice", false);

    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", "Vendor Information", "", indef, enume);
    isContinue = false;
    $('#noah-webui-Toolbox-BindingNavigator').enable(true);
    return isContinue;
}


function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    $('#noah-webui-Toolbox-BindingNavigator').enable(true);
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", "Vendor Information", "", indef, enume);
    isContinue = false;


    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    isnewrow = 0;
    var isContinue = true;
    //ClearFields();
    cust_GetPara();
    ImportTagging = 2;
    refreshtoolbox();
    isRefreshed = true;
    $('#noah-webui-Toolbox-BindingNavigator').enable(true);
    $("#noah-webui-Toolbox").bindingImport().enable(true);
    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", "Vendor Information", "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    xaddtoList = 0;
    tmp = "";
    crnwTableCon = null;
    lookUpCustomize("lugimport", 2);
    return false;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    return isContinue;
    $('#noah-webui-Toolbox-BindingNavigator').enable(true);
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

    nwParameter_Add("nwSupplierCode", nwSupplierCode);
    nwParameter_Add("txtTinNumber", $('#txtTinNumber').val());
    nwParameter_Add("nwIsReport", nwIsReport);
    nwParameter_Add("isTrueOrFalse", validateTax());
    nwParameter_Add("isNewRow", newRow);
    nwParameter_Add("Individual", $('#Individual').prop("checked"));
    nwParameter_Add("Corporate", $('#Corporate').prop("checked"));
    nwParameter_Add("WithoutTIN", $('#WithoutTIN').prop("checked"));
    nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
    nwParameter_Add("idvallugPayeeSubType", $('#idvallugPayeeSubType').val());
    nwParameter_Add("idvallugVendorTier", $('#idvallugVendorTier').val());
    nwParameter_Add("txtCrossCode", $('#txtCrossCode').val());
    nwParameter_Add("idvallugCurrency", $('#idvallugCurrency').val());
    nwParameter_Add("txtRegName", $('#txtRegName').val());
    nwParameter_Add("txtTradeName", $('#txtTradeName').val());
    nwParameter_Add("txtCheckPayeeName", $('#txtCheckPayeeName').val());
    nwParameter_Add("txtAltCheckPayeeName", $('#txtAltCheckPayeeName').val());
    nwParameter_Add("LoadOwnerName", $('#chkLoadOwnersName').prop("checked"));
    nwParameter_Add("CurrencySelection", $('#CurrencySelection').prop("checked"));
    nwParameter_Add("isLumpsum", $('#rdbLumpsum').prop("checked"));
    nwParameter_Add("txtIndividual", $('#txtIndividual').val());
    nwParameter_Add("txtCorporate", $('#txtCorporate').val());
    nwParameter_Add("txtWithoutTIN", $('#txtWithoutTIN').val());
    nwParameter_Add("txtLoadOwnerName", $('#txtLoadOwnerName').val());
    nwParameter_Add("txtWebsite", $('#txtWebsite').val());
    nwParameter_Add("VendorId", $('#txtVendorID').val());
    nwParameter_Add("idvallugReferenceType", $('#idvallugReferenceType').val());
    nwParameter_Add("idvallugReference", $('#idvallugReference').val());
    nwParameter_Add("idvallugSalutation", $('#idvallugSalutation').val());
    nwParameter_Add("txtLastName", $('#txtLastName').val());
    nwParameter_Add("idvallugNameSuffix", $('#idvallugNameSuffix').val());
    nwParameter_Add("txtFirstName", $('#txtFirstName').val());
    nwParameter_Add("txtMidInitial", $('#txtMidInitial').val());
    nwParameter_Add("txtNickName", $('#txtNickName').val());
    nwParameter_Add("txtDateBirth", $('#txtDateBirth').val());
    nwParameter_Add("txtPlaceBirth", $('#txtPlaceBirth').val());
    nwParameter_Add("idvallugGender", $('#idvallugGender').val());
    nwParameter_Add("idvallugCivilStatus", $('#idvallugCivilStatus').val());
    nwParameter_Add("idvallugNationality", $('#idvallugNationality').val());
    nwParameter_Add("idvallugReligion", $('#idvallugReligion').val());
    nwParameter_Add("txtLocationCode", $('#txtLocationCode').val());
    nwParameter_Add("idvallugLocationType", $('#idvallugLocationType').val());
    nwParameter_Add("txtFullAddress", $('#txtFullAddress').val());
    nwParameter_Add("cbFullAddress", $('#cbFullAddress').prop("checked"));
    nwParameter_Add("txtUnitNo", $('#txtUnitNo').val());
    nwParameter_Add("txtFloorNo", $('#txtFloorNo').val());
    nwParameter_Add("txtBldgNo", $('#txtBldgNo').val());
    nwParameter_Add("txtEstablishment", $('#txtEstablishment').val());
    nwParameter_Add("txtBuilding", $('#txtBuilding').val());
    nwParameter_Add("txtLandmark", $('#txtLandmark').val());
    nwParameter_Add("txtStreetNo", $('#txtStreetNo').val());
    nwParameter_Add("txtStreetName", $('#txtStreetName').val());
    nwParameter_Add("txtLot", $('#txtLot').val());
    nwParameter_Add("txtBlock", $('#txtBlock').val());
    nwParameter_Add("txtPhase", $('#txtPhase').val());
    nwParameter_Add("txtSubdivision", $('#txtSubdivision').val());
    nwParameter_Add("txtZone", $('#txtZone').val());
    nwParameter_Add("idvallugArea", $('#idvallugArea').val());
    nwParameter_Add("idvallugStdBarangay", $('#idvallugStdBarangay').val());
    nwParameter_Add("txtAltBrgy", $('#txtAltBrgy').val());
    nwParameter_Add("idvallugMunicipality", $('#idvallugMunicipality').val());
    nwParameter_Add("idvallugProvince", $('#idvallugProvince').val());
    nwParameter_Add("idvallugRegion", $('#idvallugRegion').val());
    nwParameter_Add("idvallugCountry", $('#idvallugCountry').val());
    nwParameter_Add("idvallugInternationalSubGroup", $('#idvallugInternationalSubGroup').val());
    nwParameter_Add("idvallugInternationalGroup", $('#idvallugInternationalGroup').val());
    nwParameter_Add("txtZip", $('#txtZip').val());
    nwParameter_Add("txtPhone", $('#txtPhone').val());
    nwParameter_Add("txtLocal", $('#txtLocal').val());
    nwParameter_Add("txtMobile", $('#txtMobile').val());
    nwParameter_Add("txtEmailAdd", $('#txtEmailAdd').val());
    nwParameter_Add("txtFax", $('#txtFax').val());
    nwParameter_Add("idvallugBank", $('#idvallugBank').val());
    nwParameter_Add("descvallugBank", $('#descvallugBank').val());
    nwParameter_Add("txtBankAccountNo", $('#txtBankAccountNo').val());
    nwParameter_Add("txtBankAddress", $('#txtBankAddress').val());
       
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {

    $('#noah-webui-Toolbox-BindingNavigator').enable(true);
    cust_GetPara();
    EnableFieldsDone();
    isTicked();
    asterisk();
    nwLoading_Start("xBind", crLoadingHTML);
    func_ActionDriven("actBindCollection", false);
    DisabledFieldsUponRefresh();
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xBindEmpty", crLoadingHTML);
    nwParameter_Add("TotalRecords", $('div.BN-record span').text());
    DisableFieldsEmpty();
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////
var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {

    if (idName == 'toolboxInquire') {
    }

    if (idName == 'lugsupplier') {
        nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        func_ActionDriven("checkisbranch", true);
    }

    if (idName == 'lugStdBarangay') {
        var stdBrgy = $("#idvallugStdBarangay").val()
        var altBrgy = $('#txtAltBrgy').val();

        if (stdBrgy != "" && altBrgy == "") {
            $('#txtZip').val("");
            $('#txtZip').enable(false);
        } else if (stdBrgy == "" && altBrgy != "") {
            $('#txtZip').val("");
            $('#txtZip').enable(true);
        } else if (stdBrgy != "" && altBrgy != "") {
            $('#txtZip').val("");
            $('#txtZip').enable(false);
        }

        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var rgnCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var rgnDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var isgCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();
        var isgDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 11 + ") span").text();
        var igCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 12 + ") span").text();
        var igDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 13 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 14 + ") span").text();
        var zipCodeCnt = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 15 + ") span").text();

        //var muniCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
        //var muniDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(3)").text();
        //var provCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(4)").text();
        //var provDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(5)").text();
        //var rgnCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(6)").text();
        //var rgnDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(7)").text();
        //var cntryCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(8)").text();
        //var cntryDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(9)").text();
        //var isgCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(10)").text();
        //var isgDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(11)").text();
        //var igCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(12)").text();
        //var igDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(13)").text();
        //var zipCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(14)").text();
        //var zipCodeCnt = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(15)").text();

        if (stdBrgy != "") {
            $("#idvallugMunicipality").val(muniCode);
            $("#descvallugMunicipality").val(muniDesc);
            $("#idvallugProvince").val(provCode);
            $("#descvallugProvince").val(provDesc);
            $("#idvallugRegion").val(rgnCode);
            $("#descvallugRegion").val(rgnDesc);
            $("#idvallugCountry").val(cntryCode);
            $("#descvallugCountry").val(cntryDesc);
            $("#idvallugInternationalSubGroup").val(isgCode);
            $("#descvallugInternationalSubGroup").val(isgDesc);
            $("#idvallugInternationalGroup").val(igCode);
            $("#descvallugInternationalGroup").val(igDesc);
            $("#txtZip").val(zipCode);
            //$("#txtCntZip").val(zipCodeCnt);
        }

        if (stdBrgy != "")
            $("#txtAltBrgy").enable(false);
        else if (stdBrgy == "")
            $("#txtAltBrgy").enable(true);

        FullAddressValue();
        //$fn.xOnKeyUpEvents.xFullAddressValue();

        if (stdBrgy == "") {
            if (parseInt(zipCodeCnt) == 1)
                $("#txtZip").enable(false);
            else if (parseInt(zipCodeCnt) > 1) {
                $("#txtZip").val("");
                $("#txtZip").enable(true);
            }
        }
    }

    if (idName == 'lugMunicipality') {

        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var rgnCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var rgnDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var isgCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var isgDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var igCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();
        var igDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 11 + ") span").text();
        var zipCodeCnt = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 12 + ") span").text();
        

        //var provCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
        //var provDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(3)").text();
        //var rgnCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(4)").text();
        //var rgnDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(5)").text();
        //var cntCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(6)").text();
        //var cntDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(7)").text();
        //var isgCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(8)").text();
        //var isgDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(9)").text();
        //var igCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(10)").text();
        //var igDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(11)").text();
        //var zipCodeCnt = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(12)").text();

        $('#idvallugStdBarangay').val('');
        $('#descvallugStdBarangay').val('');

        $("#idvallugProvince").val(provCode);
        $("#descvallugProvince").val(provDesc);
        $("#idvallugRegion").val(rgnCode);
        $("#descvallugRegion").val(rgnDesc);
        $("#idvallugCountry").val(cntCode);
        $("#descvallugCountry").val(cntDesc);
        $("#idvallugInternationalSubGroup").val(isgCode);
        $("#descvallugInternationalSubGroup").val(isgDesc);
        $("#idvallugInternationalGroup").val(igCode);
        $("#descvallugInternationalGroup").val(igDesc);

        if ($("#idvallugStdBarangay").val() == "") {
            if (parseInt(zipCodeCnt) == 1)
                $("#txtZip").enable(false);
            else if (parseInt(zipCodeCnt) > 1) {
                $("#txtZip").val("");
                $("#txtZip").enable(true);
            }
        }
    }

    if (idName == "lugNameSuffix") {

        var LastName = $('#txtLastName').val();
        var FistName = $('#txtFirstName').val();
        var MiddleIntial = $('#txtMidInitial').val();
        var NameSuffix = $('#descvallugNameSuffix').val();
        var RegisterName = '';

        if (LastName.length > 0 && (FistName.length > 0 || MiddleIntial.length > 0 || NameSuffix.length > 0)) {
            LastName = LastName + ', ';
        }
        if (FistName.length > 0 && (MiddleIntial.length <= 0 && NameSuffix.length <= 0)) {
            FistName = FistName + ' ';
        }
        if (FistName.length > 0 && (MiddleIntial.length > 0 && NameSuffix.length <= 0)) {
            FistName = FistName + ' ';
        }
        if (FistName.length > 0 && (MiddleIntial.length <= 0 && NameSuffix.length > 0)) {
            FistName = FistName + ' ';
        }
        if (FistName.length > 0 && (MiddleIntial.length > 0 && NameSuffix.length > 0)) {
            FistName = FistName + ' ';
        }
        if (MiddleIntial.length > 0) {
            MiddleIntial = MiddleIntial.replace(',', '') + ' ';
        }

        RegisterName = LastName + FistName + NameSuffix + (MiddleIntial != "" ? '' + MiddleIntial : MiddleIntial);

        $('#txtRegName').val(RegisterName);

        if ($("#chkLoadOwnersName").prop("checked"))
            $('#txtCheckPayeeName').val(RegisterName);
    }
}

function EnableFields() {
    $('#Individual').enable(true);
    $('#Corporate').enable(true);
    $('#WithoutTIN').enable(true);
    $('#txtCheckPayeeName').enable(true);
    $('#lugPayeeSubType').enable(true);
    $('#lugVendorTier').enable(true);
    $('#lugCurrency').enable(true);
    $('#btnDisappRemarks').enable(false);
    $('#btnReqCompliance').enable(false);
    $('#btnVendorLocation').enable(false);
    $('#btnVendorContact').enable(false);
    $('#btnVendorTaxInfo').enable(false);
    $('#btnVendorBIR').enable(false);
    $('#btnVendorChildAccount').enable(false);
    $('#btnVendorBranch').enable(false);
    $('#btnPaymentTerm').enable(false);
    $('#btnBasisforAgingAssignment').enable(false);

    $('#txtFullAddress').enable(true);
    $('#cbFullAddress').enable(true);

    $('#noah-webui-default-New').enable(false);
    $('#noah-webui-default-Save').enable(true);
    $('#noah-webui-default-Delete').enable(false);
    $('#noah-webui-default-Delete').visible(false);
    $('#noah-webui-default-Refresh').enable(true);
    $('#noah-webui-default-Inquire').enable(true);
    $('#noah-webui-default-Process').enable(false);
    $('#noah-webui-default-Export').enable(false);

    $('#rdbLumpsum').enable(true);
    $('#rdbCheckIndividual').enable(true);

    $(".history_switch").enable(false);
    $('#chkBox').prop('checked', true);
    $('#cbFullAddress').prop('checked', false);
    $('.fulladdress').hide();

}

function DisableFields() {

    $(".history_switch").enable(false);
    $('#chkBox').prop('checked', true);
    $('#Individual').enable(false);
    $('#Corporate').enable(false);
    $('#WithoutTIN').enable(false);
    $('#txtCheckPayeeName').enable(false);
    $('#txtAltCheckPayeeName').enable(false);
    $('#chkLoadOwnersName').enable(false);
    $('#CurrencySelection').enable(false);
    $('#rdbLumpsum').enable(false);
    $('#rdbCheckIndividual').enable(false);
    $('#txtSuppliercode').enable(false);
    $('#lugPayeeSubType').enable(false);
    $('#luglugVendorTier').enable(false);
    $('#txtCrossCode').enable(false);
    $('#lugCurrency').enable(false);
    $('#txtRegName').enable(false);
    $('#txtTradeName').enable(false);
    $('#txtWebsite').enable(false);
    $('#lugReferenceType').enable(false);
    $('#lugReference').enable(false);
    $('#txtVendorID').enable(false);
    $('#txtStatus').enable(false);
    $('#btnDisappRemarks').enable(false);
    $('#lugSalutation').enable(false);
    $('#txtLastName').enable(false);
    $('#lugNameSuffix').enable(false);
    $('#txtFirstName').enable(false);
    $('#txtMidInitial').enable(false);
    $('#txtNickName').enable(false);
    $('#txtDateBirth').enable(false);
    $('#txtAge').enable(false);
    $('#txtPlaceBirth').enable(false);
    $('#lugGender').enable(false);
    $('#lugCivilStatus').enable(false);
    $('#lugNationality').enable(false);
    $('#lugReligion').enable(false);
    $('#txtLocationCode').enable(false);
    $('#lugLocationType').enable(false);

    $('#txtFullAddress').enable(false);
    $('#cbFullAddress').enable(false);

    $('#txtUnitNo').enable(false);
    $('#txtFloorNo').enable(false);
    $('#txtBldgNo').enable(false);
    $('#txtEstablishment').enable(false);
    $('#txtBuilding').enable(false);
    $('#txtLandmark').enable(false);
    $('#txtStreetNo').enable(false);
    $('#txtStreetName').enable(false);
    $('#txtLot').enable(false);
    $('#txtBlock').enable(false);
    $('#txtPhase').enable(false);
    $('#txtSubdivision').enable(false);
    $('#txtZone').enable(false);
    $('#lugArea').enable(false);
    $('#lugStdBarangay').enable(false);
    $('#txtAltBrgy').enable(false);
    $('#lugMunicipality').enable(false);
    $('#lugProvince').enable(false);
    $('#lugRegion').enable(false);
    $('#txtZip').enable(false);
    $('#txtPhone').enable(false);
    $('#txtLocal').enable(false);
    $('#txtMobile').enable(false);
    $('#txtEmailAdd').enable(false);
    $('#txtFax').enable(false);
    $('#lugBank').enable(false);
    $('#txtBankAccountNo').enable(false);
    $('#txtBankAddress').enable(false);
    
    $('.fulladdress').hide();

    if (nwIsReport == 1) {
        $('#btnReqCompliance').enable(true);
        $('#btnVendorLocation').enable(true);
        $('#btnVendorContact').enable(true);
        $('#btnVendorTaxInfo').enable(true);
        $('#btnVendorBIR').enable(true);
        $('#btnVendorChildAccount').enable(true);
        $('#btnVendorBranch').enable(true);
        $('#btnBasisforAgingAssignment').enable(true);
        $('#btnPaymentTerm').enable(true);
    }
    else {
        $('#btnVendorLocation').enable(false);
        $('#btnReqCompliance').enable(false);
        $('#btnVendorContact').enable(false);
        $('#btnVendorTaxInfo').enable(false);
        $('#btnVendorBIR').enable(false);
        $('#btnVendorChildAccount').enable(false);
        $('#btnVendorBranch').enable(false);
        $('#btnBasisforAgingAssignment').enable(false);
        $('#btnPaymentTerm').enable(false);
    }
}

function DisabledFieldsUponRefresh() {
    $('#Individual').enable(false);
    $('#Corporate').enable(false);
    $('#WithoutTIN').enable(false);

    var isIndividual = $('#Individual').prop('checked');

    if (isIndividual) {
        $('#chkLoadOwnersName').enable(true);
        $('#txtRegisteredName').enable(false);
        $('#txtTradeName').enable(true);
    }
    else {
        $('#txtLastName').enable(false);
        $('#txtFirstName').enable(false);
        $('#txtRegisteredName').enable(false);
        $('#txtTradeName').enable(false);
        $('#chkLoadOwnersName').enable(false);
    }

    if (nwIsReport == 1) {
        $('#rdbLumpsum').enable(false);
        $('#rdbCheckIndividual').enable(false);
        $('#chkLoadOwnersName').enable(false);
        $('#txtTradeName').enable(false);
    }
    else {
        if (!isIndividual)
            $('#chkLoadOwnersName').enable(false);
        else
            $('#chkLoadOwnersName').enable(true);
            $('#rdbLumpsum').enable(true);
            $('#rdbCheckIndividual').enable(true);
    }

    let disableCIT = [
     'Approved',
     'For Approval',
    ];

    if (disableCIT.includes($('#txtStatus').val())) {
        $('#rdbLumpsum').enable(false);
        $('#rdbCheckIndividual').enable(false);
    }
    else {
        $('#rdbLumpsum').enable(true);
        $('#rdbCheckIndividual').enable(true);
    }

    $('#txtMiddleName').enable(false);
    $('#lugPayeeSubType').enable(false);
    $('#lugVendorTier').enable(false);
    $('#txtcrosscode').enable(false);
    $('#lugcurrency').enable(false);
    $('#lugcountry').enable(false);

}

function EnableFieldsDone() {//Binding Done

    $(".history_switch").enable(true);
    $('#chkBox').prop('checked', true);
    //$('#cbFullAddress').prop('checked', true);
    $('#Individual').enable(false);
    $('#Corporate').enable(false);
    $('#WithoutTIN').enable(false);
    $('#rdbLumpsum').enable(true);
    $('#rdbCheckIndividual').enable(true);
    $('#txtSuppliercode').enable(false);
    $('#lugPayeeSubType').enable(false);
    $('#lugVendorTier').enable(false);
    $('#lugCurrency').enable(false);
    $('#btnDisappRemarks').enable(true);

    if (nwIsReport == 1) {
        DisableFields();
    }
    else {
        isTicked();
    }

    $('#btnVendorLocation').enable(true);
    $('#btnReqCompliance').enable(true);
    $('#btnBasisforAgingAssignment').enable(true);
    $('#btnVendorContact').enable(true);
    $('#btnVendorTaxInfo').enable(true);
    $('#btnVendorBIR').enable(true);
    $('#btnVendorChildAccount').enable(true);
    $('#btnVendorBranch').enable(true);
    $('#btnPaymentTerm').enable(true);
    $('#noah-webui-default-New').enable(true);
    $('#noah-webui-default-Save').enable(true);
    $('#noah-webui-default-Delete').enable(true);
    $('#noah-webui-default-Delete').visible(true);
    $('#noah-webui-default-Refresh').enable(true);
    $('#noah-webui-default-Inquire').enable(true);
    $('#noah-webui-default-Process').visible(true);


    let ArrDisable = [
        'Approved',
        'Cancelled',
        'For Approval',
        'Loaded and Approved'
    ];

    if (ArrDisable.includes($('#txtStatus').val())) {
        $('#noah-webui-default-Process').enable(false);
        $('#noah-webui-default-Save').enable(false);
        $('#noah-webui-default-Delete').enable(false);
        $('#rdbLumpsum').enable(false);
        $('#rdbCheckIndividual').enable(false);
    }
    else {
        $('#noah-webui-default-Process').enable(true);
        $('#rdbCheckIndividual').enable(true);
    }

 

    //if ($('#txtStatus').val() == 'Cancelled') {
    //    $('#noah-webui-default-Process').enable(false);
    //    $('#noah-webui-default-Save').enable(false);
    //    $('#noah-webui-default-Delete').enable(false);
    //}
    //else {
    //}

    $('#noah-webui-default-Export').enable(true);
    GetAge($('#txtDateBirth').val());
    //FullAddressValue();
    //$fn.xOnKeyUpEvents.xFullAddressValue();
}

function DisableFieldsDone() { // For Refresh

    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0') {
        DisableFieldsEmpty();
        $("#noah-webui-Toolbox").bindingNew().enable(true);
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#noah-webui-Toolbox").bindingDelete().enable(false);
        $("#noah-webui-Toolbox").bindingDelete().visible(true);
        $("#noah-webui-Toolbox").bindingRefresh().enable(true);
        $("#noah-webui-Toolbox").bindingExport().enable(false);
        $("#noah-webui-Toolbox").bindingProcess().enable(false);
        $("#noah-webui-Toolbox").bindingProcess().visible(true);
        $("#noah-webui-Toolbox").bindingInquire().enable(true);
    }
}

function DisableFieldsEmpty() {

    $(".history_switch").enable(false);
    $('#chkBox').prop('checked', true);

    DisableFields();
}

function ClearFields() {
    $('#chkBox').prop('checked', true);
    $('#txtSuppliercode').val('');
    $('#idvallugPayeeSubType').val('');
    $('#descvallugPayeeSubType').val('');
    $('#idvallugVendorTier').val('');
    $('#descvallugVendorTier').val('');
    $('#txtCrossCode').val('');
    $('#idvallugCurrency').val('');
    $('#descvallugCurrency').val('');
    $('#txtRegName').val('');
    $('#txtTradeName').val('');
    $('#txtCheckPayeeName').val('');
    $('#txtAltCheckPayeeName').val('');
    $('#txtWebsite').val('');
    $('#txtVendorID').val('');
    $('#txtStatus').val('');
    $('#idvallugSalutation').val('');
    $('#descvallugSalutation').val('');
    $('#txtLastName').val('');
    $('#idvallugNameSuffix').val('');
    $('#descvallugNameSuffix').val('');
    $('#txtFirstName').val('');
    $('#txtMidInitial').val('');
    $('#txtNickName').val('');
    $('#txtDateBirth').val('');
    $('#txtAge').val('');
    $('#txtPlaceBirth').val('');
    $('#idvallugGender').val('');
    $('#descvallugGender').val('');
    $('#idvallugCivilStatus').val('');
    $('#descvallugCivilStatus').val('');
    $('#idvallugNationality').val('');
    $('#descvallugNationality').val('');
    $('#idvallugReligion').val('');
    $('#descvallugReligion').val('');
    $('#txtLocationCode').val('');
    $('#txtFullAddress').val('');
    $('#txtUnitNo').val('');
    $('#txtFloorNo').val('');
    $('#txtBldgNo').val('');
    $('#txtEstablishment').val('');
    $('#txtBuilding').val('');
    $('#txtLandmark').val('');
    $('#txtStreetNo').val('');
    $('#txtStreetName').val('');
    $('#txtLot').val('');
    $('#txtBlock').val('');
    $('#txtPhase').val('');
    $('#txtSubdivision').val('');
    $('#txtZone').val('');
    $('#idvallugArea').val('');
    $('#descvallugArea').val('');
    $('#idvallugStdBarangay').val('');
    $('#descvallugStdBarangay').val('');
    $('#txtAltBrgy').val('');
    $('#idvallugMunicipality').val('');
    $('#descvallugMunicipality').val('');
    $('#idvallugProvince').val('');
    $('#descvallugProvince').val('');
    $('#idvallugRegion').val('');
    $('#descvallugRegion').val('');
    $('#idvallugCountry').val('');
    $('#descvallugCountry').val('');
    $('#idvallugInternationalSubGroup').val('');
    $('#descvallugInternationalSubGroup').val('');
    $('#idvallugInternationalGroup').val('');
    $('#descvallugInternationalGroup').val('');
    $('#txtZip').val('');
    $('#txtPhone').val('');
    $('#txtLocal').val('');
    $('#txtMobile').val('');
    $('#txtEmailAdd').val('');
    $('#txtFax').val('');
    $('#idvallugBank').val('');
    $('#descvallugBank').val('');
    $('#txtBankAccountNo').val('');
    $('#txtIndividual').val('');
    $('#txtCorporate').val('');
    $('#txtWithoutTIN').val('');
    $('#txtLoadOwnerName').val('');
    $('#chkLoadOwnersName').prop('checked', false);
    $('#CurrencySelection').prop('checked', false);
    $('#txtBankAddress').val('');

}

function isTicked() {
    if (nwIsReport == "") {
        if ($('#Individual').prop('checked') == true) {

            $('#txtCrossCode').enable(true);
            $('#txtRegName').enable(false);
            $('#txtTradeName').enable(true);
            $('#txtAltCheckPayeeName').enable(false);
            $('#txtWebsite').enable(true);
            $('#lugReferenceType').enable(true);
            $('#lugReference').enable(true);
            $('#txtVendorID').enable(false);
            $('#txtStatus').enable(false);
            //$('#txtCheckPayeeName').enable(false);
            $('#chkLoadOwnersName').enable(true);
            $('#CurrencySelection').enable(true);

            $("#txtTradeName").keyup(function () {
                if (!$('#chkLoadOwnersName').prop('checked')) {
                    //$('#txtCheckPayeeName').val($('#txtTradeName').val());
                }
            });

            $("#chkLoadOwnersName").click(function () {
                if ($('#chkLoadOwnersName').prop('checked')) {
                    $('#txtCheckPayeeName').val($('#txtRegName').val());
                }
                //else {
                //    $('#txtCheckPayeeName').val($('#txtTradeName').val());
                //}
            });

            $('#lugSalutation').enable(true);
            $('#txtLastName').enable(true);
            $('#lugNameSuffix').enable(true);
            $('#txtFirstName').enable(true);
            $('#txtMidInitial').enable(true);
            $('#txtNickName').enable(true);
            $('#txtDateBirth').enable(true);
            $('#txtAge').enable(false);
            $('#txtPlaceBirth').enable(true);
            $('#lugGender').enable(true);
            $('#lugCivilStatus').enable(true);
            $('#lugNationality').enable(true);
            $('#lugReligion').enable(true);
            $('#txtLocationCode').enable(false);
            $('#lugLocationType').enable(false);
            $('#txtUnitNo').enable(true);
            $('#txtFloorNo').enable(true);
            $('#txtBldgNo').enable(true);
            $('#txtEstablishment').enable(true);
            $('#txtBuilding').enable(true);
            $('#txtLandmark').enable(true);
            $('#txtStreetNo').enable(true);
            $('#txtStreetName').enable(true);
            $('#txtLot').enable(true);
            $('#txtBlock').enable(true);
            $('#txtPhase').enable(true);
            $('#txtSubdivision').enable(true);
            $('#txtZone').enable(true);
            $('#lugArea').enable(true);
            $('#lugStdBarangay').enable(true);
            $('#txtAltBrgy').enable(true);
            $('#lugMunicipality').enable(true);
            $('#lugProvince').enable(false);
            $('#lugCountry').enable(false);
            $('#lugInternationalSubGroup').enable(false);
            $('#lugInternationalGroup').enable(false);
            $('#lugRegion').enable(false);
            enablezipCode();
            $('#txtPhone').enable(true);
            $('#txtLocal').enable(true);
            $('#txtMobile').enable(true);
            $('#txtEmailAdd').enable(true);
            $('#txtFax').enable(true);
            $('#lugBank').enable(true);
            $('#txtBankAccountNo').enable(true);
            $('#txtBankAddress').enable(true);
            $('.lastName').show();
            $('.firstName').show();
            $('.astPhoneNo').show();
            $('.astMobileNo').show();
            $('.regName').hide();
        }
        else if ($('#Corporate').prop('checked') == true) {

            $('#txtCrossCode').enable(true);
            $('#txtRegName').enable(true);
            $('#txtTradeName').enable(true);
            //$('#txtCheckPayeeName').enable(false);
            $('#txtWebsite').enable(true);
            $('#lugReferenceType').enable(true);
            $('#lugReference').enable(true);
            $('#txtVendorID').enable(false);
            $('#txtStatus').enable(false);
            $('#chkLoadOwnersName').enable(false);
            $('#CurrencySelection').enable(true);
            $('#lugSalutation').enable(false);
            $('#txtLastName').enable(false);
            $('#lugNameSuffix').enable(false);
            $('#txtFirstName').enable(false);
            $('#txtMidInitial').enable(false);
            $('#txtNickName').enable(false);
            $('#txtDateBirth').enable(false);
            $('#txtAge').enable(false);
            $('#txtPlaceBirth').enable(false);
            $('#lugGender').enable(false);
            $('#lugCivilStatus').enable(false);
            $('#lugNationality').enable(false);
            $('#lugReligion').enable(false);
            $('#txtLocationCode').enable(false);
            $('#lugLocationType').enable(false);
            $('#txtUnitNo').enable(true);
            $('#txtFloorNo').enable(true);
            $('#txtBldgNo').enable(true);
            $('#txtEstablishment').enable(true);
            $('#txtBuilding').enable(true);
            $('#txtLandmark').enable(true);
            $('#txtStreetNo').enable(true);
            $('#txtStreetName').enable(true);
            $('#txtLot').enable(true);
            $('#txtBlock').enable(true);
            $('#txtPhase').enable(true);
            $('#txtSubdivision').enable(true);
            $('#txtZone').enable(true);
            $('#lugArea').enable(true);
            $('#lugStdBarangay').enable(true);
            $('#txtAltBrgy').enable(true);
            $('#lugMunicipality').enable(true);
            $('#lugProvince').enable(false);
            $('#lugCountry').enable(false);
            $('#lugInternationalSubGroup').enable(false);
            $('#lugInternationalGroup').enable(false);
            $('#lugRegion').enable(false);
            enablezipCode();
            //$('#txtCheckPayeeName').val($('#txtRegName').val());

            $("#txtTradeName").keyup(function () {

                if ($('#Corporate').prop('checked') == true) {
                    //$('#txtCheckPayeeName').val($('#txtRegName').val());
                }
            });

            $('#txtPhone').enable(true);
            $('#txtLocal').enable(true);
            $('#txtMobile').enable(true);
            $('#txtEmailAdd').enable(true);
            $('#txtFax').enable(true);
            $('#lugBank').enable(true);
            $('#txtBankAccountNo').enable(true);
            $('#txtBankAddress').enable(true);
            $('.lastName').hide();
            $('.firstName').hide();
            $('.astPhoneNo').show();
            $('.astMobileNo').show();
            $('.regName').show();
        }
        else if ($('#WithoutTIN').prop('checked') == true) {

            $('#txtCrossCode').enable(true);
            $('#txtRegName').enable(true);
            $('#txtTradeName').enable(true);
            //$('#txtCheckPayeeName').enable(false);
            $('#txtWebsite').enable(true);
            $('#lugReferenceType').enable(true);
            $('#lugReference').enable(true);
            $('#txtStatus').enable(false);
            $('#chkLoadOwnersName').enable(false);
            $('#CurrencySelection').enable(true);
            $('#lugSalutation').enable(false);
            $('#txtLastName').enable(false);
            $('#lugNameSuffix').enable(false);
            $('#txtFirstName').enable(false);
            $('#txtMidInitial').enable(false);
            $('#txtNickName').enable(false);
            $('#txtDateBirth').enable(false);
            $('#txtAge').enable(false);
            $('#txtPlaceBirth').enable(false);
            $('#lugGender').enable(false);
            $('#lugCivilStatus').enable(false);
            $('#lugNationality').enable(false);
            $('#lugReligion').enable(false);
            $('#txtLocationCode').enable(false);
            $('#lugLocationType').enable(false);
            $('#txtUnitNo').enable(true);
            $('#txtFloorNo').enable(true);
            $('#txtBldgNo').enable(true);
            $('#txtEstablishment').enable(true);
            $('#txtBuilding').enable(true);
            $('#txtLandmark').enable(true);
            $('#txtStreetNo').enable(true);
            $('#txtStreetName').enable(true);
            $('#txtLot').enable(true);
            $('#txtBlock').enable(true);
            $('#txtPhase').enable(true);
            $('#txtSubdivision').enable(true);
            $('#txtZone').enable(true);
            $('#lugArea').enable(true);
            $('#lugStdBarangay').enable(true);
            $('#txtAltBrgy').enable(true);
            $('#lugMunicipality').enable(true);
            $('#lugProvince').enable(false);
            $('#lugCountry').enable(false);
            $('#lugInternationalSubGroup').enable(false);
            $('#lugInternationalGroup').enable(false);
            $('#lugRegion').enable(false);
            enablezipCode();
            $('#txtPhone').enable(true);
            $('#txtLocal').enable(true);
            $('#txtMobile').enable(true);
            $('#txtEmailAdd').enable(true);
            $('#txtFax').enable(true);
            $('#lugBank').enable(true);
            $('#txtBankAccountNo').enable(true);
            $('#txtBankAddress').enable(true);            
            $('.lastName').hide();
            $('.firstName').hide();
            $('.astPhoneNo').show();
            $('.astMobileNo').show();
            $('.regName').show();
        }
    }
    else {
        DisableFields();
    }
    xRadioButtonTaxRegTrigger();
    //$fn.xOnClickEvents.xRadioButtonTaxRegTrigger();
}

function asterisk() {
    if ($('#Individual').prop('checked') == true) {
        $('.req1').addClass('hideasterisk');
        $('.req2').removeClass('hideasterisk');
        $('.req3').removeClass('hideasterisk');
        $('.req4').removeClass('hideasterisk');
        $('.req5').removeClass('hideasterisk');
        $('.req6').removeClass('hideasterisk');
        $('.req7').removeClass('hideasterisk');
        $('.req8').removeClass('hideasterisk');
        $('.req9').removeClass('hideasterisk');
    } else if ($('#Corporate').prop('checked') == true) {
        $('.req1').removeClass('hideasterisk');
        $('.req2').addClass('hideasterisk');
        $('.req3').addClass('hideasterisk');
        $('.req4').addClass('hideasterisk');
    }
    else if ($('#WithoutTIN').prop('checked') == true) {
        $('.req1').addClass('hideasterisk');
        $('.req2').addClass('hideasterisk');
        $('.req3').addClass('hideasterisk');
        $('.req4').addClass('hideasterisk');
    }

    xRadioButtonTaxRegTrigger();
    //$fn.xOnClickEvents.xRadioButtonTaxRegTrigger();
}


$(document).on("change", "#Individual", function (e) {
    isTicked();
    asterisk();
    //ClearFields();

    $('#txtRegName').val('');
    $('#txtTradeName').val('');
});

$(document).on("change", "#Corporate", function (e) {
    isTicked();
    asterisk();
    //ClearFields();

    $('#txtRegName').val('');
    $('#txtTradeName').val('');
    $('#chkLoadOwnersName').prop('checked', false);
    $('#lugSalutation input').val('');
    $('#txtLastName').val('');
    $('#idvallugNameSuffix').val('');
    $('#descvallugNameSuffix').val('');
    $('#txtFirstName').val('');
    $('#txtMidInitial').val('');
    $('#txtNickName').val('');
    $('#txtDateBirth').val('');
    $('#txtAge').val('');
    $('#txtPlaceBirth').val('');
    $('#lugGender input').val('');
    $('#lugCivilStatus input').val('');
    $('#lugNationality input').val('');
    $('#lugReligion input').val('');
});

$(document).on("change", "#WithoutTIN", function (e) {
    isTicked();
    asterisk();
    //ClearFields();

    $('#txtRegName').val('');
    $('#txtTradeName').val('');
    $('#chkLoadOwnersName').prop('checked', false);
    $('#lugSalutation input').val('');
    $('#txtLastName').val('');
    $('#idvallugNameSuffix').val('');
    $('#descvallugNameSuffix').val('');
    $('#txtFirstName').val('');
    $('#txtMidInitial').val('');
    $('#txtNickName').val('');
    $('#txtDateBirth').val('');
    $('#txtAge').val('');
    $('#txtPlaceBirth').val('');
    $('#lugGender input').val('');
    $('#lugCivilStatus input').val('');
    $('#lugNationality input').val('');
    $('#lugReligion input').val('');
});

$(document).on("change", "#txtRegName", function (e) {
    fillCheckPayeeName();
    
});

$(document).on("change", "#txtTradeName", function (e) {
    fillCheckPayeeName();
});

function fillCheckPayeeName() {
    var payeename = "";
    if ($('#Individual').prop("checked")) {
        payeename = $('#txtTradeName').val();
    } else if ($('#Corporate').prop("checked")) {
        payeename = $('#txtRegName').val();
    } else if ($('#WithoutTIN').prop("checked")) {
        payeename = $('#txtTradeName').val();
    }

    $('#txtCheckPayeeName').val(payeename);
}

function getHOfficeCode() {
    var Supcode = $('#txtSuppliercode').val();
    return Supcode;
}



var isContinue = true;
function func_WindowCloseTrigger(verID) {
    if (verID == "nwVendorContact") {

     //($('#nwVendorContact .BoxTitle').text() == "Vendor Contacts") 
            nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
            nwParameter_Add("Corporate", $('#Corporate').prop("checked"));
            nwParameter_Add("WithoutTIN", $('#WithoutTIN').prop("checked"));
            nwParameter_Add("nwIsReport", nwIsReport);
            func_ActionDriven("actValidateContacts", false);
            return false;
        }


  else if (verID == "nwVendorTaxInfo") {

       //($('#nwVendorTaxInfo .BoxTitle').text() == "Vendor Taxes Information") 
            nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
            nwParameter_Add("VendorId", $('#txtVendorID').val());
            nwParameter_Add("Individual", $('#Individual').prop("checked"));
            nwParameter_Add("Corporate", $('#Corporate').prop("checked"));
            nwParameter_Add("WithoutTIN", $('#WithoutTIN').prop("checked"));
            func_ActionDriven("actAccess", false);
        }
    
  else if (verID == "nwPaymentTerm") {
      nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
      nwParameter_Add("VendorId", $('#txtVendorID').val());
      func_ActionDriven("actLoadButtons", false);
  }

  else if (verID == "nwBasisforAgingAssignment") {
      nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
      nwParameter_Add("VendorId", $('#txtVendorID').val());
      func_ActionDriven("actLoadButtons", false);
  }

  else if (verID == "nwVendorTaxInfo") {
      nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
      nwParameter_Add("VendorId", $('#txtVendorID').val());
      func_ActionDriven("actLoadButtons", false);
  }

  else if (verID == "nwVendorBIR") {
      nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
      nwParameter_Add("VendorId", $('#txtVendorID').val());
      func_ActionDriven("actLoadButtons", false);
  }
    
  else if (verID == "nwPopUpRequireCompliance") {
      nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
      nwParameter_Add("VendorId", $('#txtVendorID').val());
      func_ActionDriven("actLoadButtons", false);
  }
    return isContinue;
}

$(document).on("click", "#btnVendorTaxInfo", function (e) {
    var id = $('#txtSuppliercode').val();
    nwParameter_Add("supcode", id);

    if (id.length > 0) {
        var title = "Vendor Taxes Information";
        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" || $('#txtStatus').val() == "Loaded and Approved" ? true : false;
        var fullength = GetCurrentURL() + "../APSupplierTaxesInformation?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwVendorTaxInfo", true, fullength);
        $('#nwVendorTaxInfo .modal-hdr-title').text(title);
        nwPopupForm_ShowModal("nwVendorTaxInfo");
    }
    return false;


});

//document.addEventListener("DOMContentLoaded", () => {
//    let btnBIR = document.getElementById('btnVendorBIR');

//    btnBIR.addEventListener('click', () => {
//        let vendorCode = document.getElementById('txtSuppliercode').value;
//        $('#idvallugsupplier').val(vendorCode);
//    });
//});


$(document).on("click", "#btnVendorBIR", function (e) {
    var id = $('#txtSuppliercode').val();
    //$('#idvallugsupplier').val(vendorCode);
    nwParameter_Add("supcode", id);

    if (id.length > 0) {
        //insert here
        var title = "Vendor System Permit";
        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;
        var fullength = GetCurrentURL() + "../APSupplierBIRCASPermit?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwVendorBIR", true, fullength);
        $('#nwVendorBIR .modal-hdr-title').text(title);
        nwPopupForm_ShowModal("nwVendorBIR");

    }
    return false;
});

// Vendor Location
$(document).on("click", "#btnVendorLocation", function (e) {
    var id = $('#txtSuppliercode').val();
    nwParameter_Add("supcode", id);
    if (id.length > 0) {
        //insert here
        var title = "Vendor Location";
        var isView =  $('#txtStatus').val() == "Cancelled" ? true : false;

        if (isView && nwIsReport == "")
            nwIsReport = "1";

        var fullength = GetCurrentURL() + "../APSupplierLocation?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwVendorLocation", true, fullength);
        $('#nwVendorLocation .modal-hdr-title').text(title);
        nwPopupForm_ShowModal("nwVendorLocation");

    }
    return false;
});

//Start of Requirements Compliance
$(document).on("click", "#btnReqCompliance", function (e) {
    var id = 'VENENR';
    var SupplierCode = $('#txtVendorID').val();
    nwParameter_Add("supcode", id);
    if (id.length > 0) {
        //insert here
        var title = "Requirements Compliance";

        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;

        var fullength = GetCurrentURL() + "../DCREQUIREMENTCOMPLIANCE?nwIsReport=" + nwIsReport + "&TranType=" + encodeURI(id) + "&TransactionNo=" + encodeURI(SupplierCode) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
        $('#nwPopUpRequireCompliance .modal-hdr-title').text(title);
        nwPopupForm_ShowModal("nwPopUpRequireCompliance");

        }
        return false;
});
//End of Requirements Compliance

// Vendor Contacts
$(document).on("click", "#btnVendorContact", function (e) {
    var id = $('#txtSuppliercode').val();
    nwParameter_Add("supcode", id);
    if (id.length > 0) {
        //insert here
        var title = "Vendor Contacts";
        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;

        var fullength = GetCurrentURL() + "../APSupplierContacts?nwParam=1&nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&nwFromVendor=1&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwVendorContact", true, fullength);
        $('#nwVendorContact .modal-hdr-title').text(title);
        nwPopupForm_ShowModal("nwVendorContact");

    }
    return false;
});

$(document).on("click", "#btnVendorChildAccount", function (e) {
    var id = $('#txtSuppliercode').val();
    nwParameter_Add("supcode", id);
    if (id.length > 0) {
        //insert here
        var title = "Vendor Child Units - Accounting";
        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;
        var fullength = "../APSupplierChildUnitAccounting?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwVendorChildAccount", true, fullength);
        $('#nwVendorChildAccount .modal-hdr-title').text(title);
        nwPopupForm_ShowModal("nwVendorChildAccount");

    }
    return false;
});


$(document).on("click", "#btnBasisforAgingAssignment", function (e) {
    var id = $('#txtSuppliercode').val();
    nwParameter_Add("supcode", id);
    if (id.length > 0) {
        //insert here
        var title = "Vendor Basis for Aging Assignment";
        //var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;
        var isView = $('#txtStatus').val() == "Cancelled" ? true : false;
        var fullength = GetCurrentURL() + "../APSupplierBasisForAgingAssignment?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwBasisforAgingAssignment", true, fullength);
        $('#nwBasisforAgingAssignment .modal-hdr-title').text(title);
        nwPopupForm_ShowModal("nwBasisforAgingAssignment");

    }
    return false;
});

$(document).on("click", "#btnVendorBranch", function (e) {

    var id = $('#txtSuppliercode').val();

    nwParameter_Add("supcode", id);

    if (id.length > 0) {
        //insert here
        var title = "Vendor Branch Group Assignment";
        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;
        var fullength = GetCurrentURL() + "../APSupplierBranchGroupAss?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwVendorBranch", true, fullength);
        $('#nwVendorBranch .modal-hdr-title').text(title);
        nwPopupForm_ShowModal("nwVendorBranch");

    }
    return false;
});

$(document).on("click", "#btnPaymentTerm", function (e) {

    var id = $('#txtSuppliercode').val();
    nwParameter_Add("supcode", id);

    if (id.length > 0) {
        //insert here
        var title = "Vendor Payment Term Assignment";
        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;
        var fullength = GetCurrentURL() + "../APSupplierPaymentTermAssignment?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwPaymentTerm", true, fullength);
        $('#nwPaymentTerm .modal-hdr-title').text(title);
        nwPopupForm_ShowModal("nwPaymentTerm");

    }
    return false;
});

$(document).on("click", "#btnDisappRemarks", function (e) {
    nwPopupForm_ShowModal("nwDisappDtls");
    return false;
});

/*===== MAIN LOAD - ENABLING / DISABLING TAX REG TYPE =====*/
function disableradio() {
    $('#Individual').enable(false);
    $('#Corporate').enable(false);
    $('#WithoutTIN').enable(false);

    if (nwIsReport == 1) {
        $('#chkLoadOwnersName').enable(false);
        $('#rdbLumpsum').enable(false);
        $('#rdbCheckIndividual').enable(false);
    }
}

function defaultTaxRegType() {
    $('#Individual').prop("checked", true);
    $('#rdbLumpsum').prop('checked', true);
}

//$(document).on('click', 'span.classx', function () {
//    $(this).closest('div.spantext').remove();
//});

//$(document).on("click", ".btnGetlookup", function () {
//    crnwTableCon = null; // if grid is click 
//    var xtype = $(this).attr("nwtype");
//    var selectedInput = xtype;
//    lookUpCustomize(selectedInput, 2);
//});

//var lugImportCode = "";
//var ImportTagging = 1;
//function nwGrid_AddtoListLoaded(verID) {
//    if (verID == 'lugimport') {
//        ImportTagging = 1;
//        nwParameter_Add("ImportCode", lugImportCode);
//        func_ActionDriven("actImport", false);
//    }
//}

//function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {
//    var xvalue = "";
//    var xdisplay = "";

//    if (verID == "lugaltpayeesubtype") {
//        xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
//        xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

//        if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
//            $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
//        }
//    }
//    if (verID == 'lugimport') {

//        //var individual = addtoListTableRec.find('tr:eq(' + index + ') td:eq(5)').text();
//        //var corporate = addtoListTableRec.find('tr:eq(' + index + ') td:eq(6)').text();
//        var suppliercode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
//        lugImportCode += suppliercode + "|";
//        //var fname = addtoListTableRec.find('tr:eq(' + index + ') td:eq(8)').text();
//        //var mname = addtoListTableRec.find('tr:eq(' + index + ') td:eq(9)').text();
//        //var lname = addtoListTableRec.find('tr:eq(' + index + ') td:eq(7)').text();
//        //var registeredname = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
//        //var phonenum = addtoListTableRec.find('tr:eq(' + index + ') td:eq(24)').text();
//        //var mobilenum = addtoListTableRec.find('tr:eq(' + index + ') td:eq(17)').text();
//        //var tintaxinfo = addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text();
//        //var taxcodetaxinfo = addtoListTableRec.find('tr:eq(' + index + ') td:eq(24)').text();
//        //var fulladdress = addtoListTableRec.find('tr:eq(' + index + ') td:eq(23)').text();
//        //var payeesubtypecode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(25)').text();
//        //var payeesubtypedesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(26)').text();
//        //var currencycode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(27)').text();
//        //var currencydesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(28)').text();
//        //var countrycode = addtoListTableRec.find('tr:eq(' + index + ') td:eq(29)').text();
//        //var countrydesc = addtoListTableRec.find('tr:eq(' + index + ') td:eq(30)').text();
//        //var individual = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(4)").text();
//        //var corporate = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(5)").text();
//        //var suppliercode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();
//        //var fname = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(7)").text();
//        //var mname = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(8)").text();
//        //var lname = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(6)").text();
//        //var registeredname = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
//        //var phonenum = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(23)").text();
//        //var mobilenum = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(16)").text();
//        //var tintaxinfo = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
//        //var taxcodetaxinfo = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(23)").text();
//        //var fulladdress = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(22)").text();

//        //if (individual == "true") {
//        //    $('#Individual').prop('checked', true)
//        //}
//        //else if (corporate == "true") {
//        //    $('#Corporate').prop('checked', true)
//        //}
//        //else {
//        //    $('#WithoutTIN').prop('checked', true)
//        //}

//        //$('#txtSuppliercode').val('A-' + suppliercode)
//        //$('#txtLastName').val(lname)
//        //$('#txtFirstName').val(fname)
//        //$('#txtMiddleName').val(mname)
//        //$('#txtRegisteredName').val(registeredname)
//        //$('#idvallugPayeeSubType').val('')
//        //$('#descvallugPayeeSubType').val('')
//        //$('#txtcrosscode').val(suppliercode)
//        //$('#idvallugcurrency').val('')
//        //$('#descvallugcurrency').val('')
//        //$('#idvallugcountry').val('')
//        //$('#descvallugcountry').val('')
//        //$('#txtphone').val(phonenum)
//        //$('#txtlocal').val('')
//        //$('#txtfax').val('')
//        //$('#txtmobile').val(mobilenum)
//        //$('#txtemail').val('')
//        //$('#txtwebsite').val('')
//        //$('#txthob1').val('')
//        //$('#txthob2').val('')
//        //$('#txtsupplierstatus').val('')
//        //$('#txtsuppliercodezxc').val('A-' + suppliercode)
//        //$('#txttinzxc').val(tintaxinfo)
//        //$('#txttaxcodezxc').val(taxcodetaxinfo)
//        //$('#txtfulladdress').val(fulladdress)
//        //$('#idvallugPayeeSubType').val(payeesubtypecode)
//        //$('#descvallugPayeeSubType').val(payeesubtypedesc)
//        //$('#idvallugcurrency').val(currencycode)
//        //$('#descvallugcurrency').val(currencydesc)
//        //$('#idvallugcountry').val(countrycode)
//        //$('#descvallugcountry').val(countrydesc)

//        //if (corporate) {
//        //    $('#txtTradeName').val(suppliercode)
//        //}
//        //if (individual) {
//        //    $('#txtTradeName').val(lname + ' ' + fname + ' ' + lname)
//        //}
//    }

//}

//function GenerateLookupListDataHTML(xvalue, xdisplay) {
//    return '<div class="spantext" nwcode="' + xvalue + '" style="display:inline-block;margin-right: 3px;margin-bottom: 3px;">' + xdisplay + '<span class="classx">x</span></div>';
//};

//function GetAddtoListFilters() {
//    var len = $('div.atlContainer').length;
//    for (var i = 0; i < len; i++) {
//        var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
//        var xvalue = "";
//        var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
//        for (var j = 0; j < lencode; j++) {
//            if (xvalue != "") xvalue += "|";
//            xvalue += $('.atlContainer:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');
//        }
//        nwParameter_Add(xkey, xvalue);
//    }
//};

//function func_LookUpInitialize(lookupid) {
//    if (lookupid == "lugPayeeSubType") {
//        GetAddtoListFilters();
//    }
//}

//function custompayee(xvalue1, xdisplay1) {
//    if ($('div.atlContainer[nwtype="lugaltpayeesubtype"]').find('div.spantext[nwcode="' + xvalue1 + '"]').length < 1) {
//        $('div.atlContainer[nwtype="lugaltpayeesubtype"] div.innertext').append(CustomLookupListDataHTML(xvalue1, xdisplay1));
//    }
//}

//function CustomLookupListDataHTML(xvalue, xdisplay) {
//    return '<div class="spantext" nwcode="' + xvalue + '" style="display:inline-block;margin-right: 3px;margin-bottom: 3px;">' + xdisplay + '<span class="classx">x</span></div>';
//};

function func_LookUpInitialize(xID) {

}


$(document).on('keyup', '#txtAltBrgy', function (e) {
    var stdBrgy = $("#idvallugStdBarangay").val()
    var altBrgy = $('#txtAltBrgy').val();

    if (stdBrgy != "" && altBrgy == "") {
        $('#txtZip').enable(false);
    } else if (stdBrgy == "" && altBrgy != "") {
        $('#txtZip').val("");
        $('#txtZip').enable(true);
    } else if (stdBrgy != "" && altBrgy != "") {
        $('#txtZip').enable(false);
    } else if (stdBrgy == "" && altBrgy == "") {
        $('#txtZip').val("");
        $('#txtZip').enable(false);
    }

    if (altBrgy != "")
        $("#lugStdBarangay input").va("");
});


$(document).on('change', '#idvallugStdBarangay', function (e) {

    var stdBrgy = $("#idvallugStdBarangay").val()
    var altBrgy = $('#txtAltBrgy').val();

    if (stdBrgy != "" && altBrgy == "") {
        $('#txtZip').val("");
        $('#txtZip').enable(false);
    } else if (stdBrgy == "" && altBrgy != "") {
        $('#txtZip').enable(true);
        $('#txtZip').val("");
    } else if (stdBrgy != "" && altBrgy != "") {
        $('#txtZip').val("");
        $('#txtZip').enable(false);
    } else if (stdBrgy == "" && altBrgy == "") {
        $('#txtZip').val("");
        $('#txtZip').enable(false);
    }
});

$(document).on('paste', '#txtZip', function () {
    if (event.clipboardData.getData('text/plain').match(/^[0-9]\d*$/i)) {
        if (event.clipboardData.getData('text/plain').length > 5) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return false;
    }
});

$(document).on('drop', '#txtZip', function () {
    return false;
});

$(document).on('dragstart', '#txtZip', function () {
    return false;
});


function NumbersOnly(keyCode, which) {
    var keyCode = (keyCode ? keyCode : which);
    if ((keyCode >= 48 && keyCode <= 57))
        return true
    else
        return false;
}

$(document).on('keypress', '#txtZip', function (e) {
    return NumbersOnly(e.keyCode, e.which);
});

function GetDate() {

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + "/" + d.getFullYear();
    return output;
}

$(document).on("change", "#txtDateBirth", function () {

    var curDate = GetDate();

    if (Date.parse($('#txtDateBirth').val()) > Date.parse(curDate)) {
        MessageBox("Cannot proceed. Date of Birth should be equal to or earlier than the current server date. \n", menuTitle, "error");
        $('#txtDateBirth').val('');
        $('#txtDateBirth').mask('?99/99/9999');
        $('#txtAge').val('');
    }
    else {
        GetAge($('#txtDateBirth').val());
    }
});

function GetAge(txtBirthday) {

    var dob = txtBirthday;
    if (dob != '') {
        dob = new Date(dob);
        var today = new Date();
        var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000));
        $('#txtAge').val(Math.abs(age));
    }
    else
        $('#txtAge').val('');
}

$(document).on("keyup", "#txtRegName", function () {

    var regName = $('#txtRegName').val();
    //$('#txtCheckPayeeName').val(regName);

});

$(document).on("keyup", "#txtFirstName", function () {
    var LastName = $('#txtLastName').val();
    var FistName = $('#txtFirstName').val();
    var MiddleIntial = $('#txtMidInitial').val();
    var NameSuffix = $('#descvallugNameSuffix').val();
    var RegisterName = '';
    if (LastName.length > 0 && (FistName.length > 0 || MiddleIntial.length > 0 || NameSuffix.length > 0))
        LastName = LastName + ', ';

    if (FistName.length > 0 && (MiddleIntial.length <= 0 && NameSuffix.length <= 0))
        FistName = FistName + ' ';

    if (FistName.length > 0 && (MiddleIntial.length > 0 && NameSuffix.length <= 0))
        FistName = FistName + ' ';

    if (FistName.length > 0 && (MiddleIntial.length <= 0 && NameSuffix.length > 0))
        FistName = FistName + ' ';

    if (FistName.length > 0 && (MiddleIntial.length > 0 && NameSuffix.length > 0))
        FistName = FistName + ' ';

    //if (MiddleIntial.length > 0)
    //    MiddleIntial = MiddleIntial.replace(',', '') + ' ';

    //Last Name, First Name Name Suffix Code Middle Name
    //Example: Dela Cruz, Juan Jr. Garcia

    RegisterName = LastName + FistName + NameSuffix + ' ' + MiddleIntial
    $('#txtRegName').val(RegisterName)

    if ($('#chkLoadOwnersName').prop("checked")) {
        $('#txtCheckPayeeName').val(RegisterName);
    }
});

$(document).on("keyup", "#txtLastName", function () {

    var LastName = $('#txtLastName').val();
    var FistName = $('#txtFirstName').val();
    var MiddleIntial = $('#txtMidInitial').val();
    var NameSuffix = $('#descvallugNameSuffix').val();

    var RegisterName = '';
    if (LastName.length > 0 && (FistName.length > 0 || MiddleIntial.length > 0 || NameSuffix.length > 0))
        LastName = LastName + ', ';

    if (FistName.length > 0 && (MiddleIntial.length <= 0 && NameSuffix.length <= 0))
        FistName = FistName + ' ';

    if (FistName.length > 0 && (MiddleIntial.length > 0 && NameSuffix.length <= 0))
        FistName = FistName + ' ';

    if (FistName.length > 0 && (MiddleIntial.length <= 0 && NameSuffix.length > 0))
        FistName = FistName + ' ';

    if (FistName.length > 0 && (MiddleIntial.length > 0 && NameSuffix.length > 0))
        FistName = FistName + ' ';

    //if (MiddleIntial.length > 0)
    //    MiddleIntial = MiddleIntial.replace(',', '') + ' ';

    //Last Name, First Name Name Suffix Code Middle Name
    //Example: Dela Cruz, Juan Jr. Garcia
    RegisterName = LastName + FistName + NameSuffix + ' ' + MiddleIntial
    $('#txtRegName').val(RegisterName);

    if ($('#chkLoadOwnersName').prop("checked")) {
        $('#txtCheckPayeeName').val(RegisterName);
    }
});

$(document).on("keyup", "#txtMidInitial", function () {

    var LastName = $('#txtLastName').val();
    var FistName = $('#txtFirstName').val();
    var MiddleIntial = $('#txtMidInitial').val();
    var NameSuffix = $('#descvallugNameSuffix').val();
    var RegisterName = '';

    if (LastName.length > 0 && (FistName.length > 0 || MiddleIntial.length > 0 || NameSuffix.length > 0))
        LastName = LastName + ', ';

    if (FistName.length > 0 && (MiddleIntial.length <= 0 && NameSuffix.length <= 0))
        FistName = FistName + ' ';

    if (FistName.length > 0 && (MiddleIntial.length > 0 && NameSuffix.length <= 0))
        FistName = FistName + ' ';

    if (FistName.length > 0 && (MiddleIntial.length <= 0 && NameSuffix.length > 0))
        FistName = FistName + ' ';

    if (FistName.length > 0 && (MiddleIntial.length > 0 && NameSuffix.length > 0))
        FistName = FistName + ' ';

    //if (MiddleIntial.length > 0)
    //    MiddleIntial = MiddleIntial.replace(',', '') + ' ';

    //Last Name, First Name Name Suffix Code Middle Name
    //Example: Dela Cruz, Juan Jr. Garcia

    RegisterName = LastName + FistName + NameSuffix + ' ' + MiddleIntial
    $('#txtRegName').val(RegisterName);

    if ($('#chkLoadOwnersName').prop("checked")) {
        $('#txtCheckPayeeName').val(RegisterName);
    }
});

$(document).on("keyup", "#idvallugNameSuffix", function () {

    var LastName = $('#txtLastName').val();
    var FistName = $('#txtFirstName').val();
    var MiddleIntial = $('#txtMidInitial').val();
    var NameSuffix = $('#descvallugNameSuffix').val();
    var RegisterName = '';

    if (LastName.length > 0 && (FistName.length > 0 || MiddleIntial.length > 0 || NameSuffix.length > 0))
        LastName = LastName + ', ';

    if (FistName.length > 0 && (MiddleIntial.length <= 0 && NameSuffix.length <= 0))
        FistName = FistName + ' ';

    if (FistName.length > 0 && (MiddleIntial.length > 0 && NameSuffix.length <= 0))
        FistName = FistName + ' ';

    if (FistName.length > 0 && (MiddleIntial.length <= 0 && NameSuffix.length > 0))
        FistName = FistName + ' ';

    if (FistName.length > 0 && (MiddleIntial.length > 0 && NameSuffix.length > 0))
        FistName = FistName + ' ';

    //if (MiddleIntial.length > 0)
    //    MiddleIntial = MiddleIntial.replace(',', '') + ' ';

    //Last Name, First Name Name Suffix Code Middle Name
    //Example: Dela Cruz, Juan Jr. Garcia

    RegisterName = LastName + FistName + NameSuffix + ' ' + MiddleIntial
    $('#txtRegName').val(RegisterName);

    if ($('#chkLoadOwnersName').prop("checked")) {
        $('#txtCheckPayeeName').val(RegisterName);
    }


});

$(document).on("keyup", "#idvallugMunicipality", function () {

    if ($("#idvallugMunicipality").val() == "") {
        $("#descvallugMunicipality").val('')
        $("#idvallugStdBarangay").val('');
        $("#descvallugStdBarangay").val('');
        $("#idvallugProvince").val('');
        $("#descvallugProvince").val('');
        $("#idvallugRegion").val('');
        $("#descvallugRegion").val('');
        $("#idvallugCountry").val('');
        $("#descvallugCountry").val('');
        $("#idvallugInternationalSubGroup").val('');
        $("#descvallugInternationalSubGroup").val('');
        $("#idvallugInternationalGroup").val('');
        $("#descvallugInternationalGroup").val('');
        $('#txtZip').val('');
    }
});

$(document).on("change", "#idvallugMunicipality", function () {

    if ($("#idvallugMunicipality").val() == "") {
        $("#descvallugMunicipality").val('')
        $("#idvallugStdBarangay").val('');
        $("#descvallugStdBarangay").val('');
        $("#idvallugProvince").val('');
        $("#descvallugProvince").val('');
        $("#idvallugRegion").val('');
        $("#descvallugRegion").val('');
        $("#idvallugCountry").val('');
        $("#descvallugCountry").val('');
        $("#idvallugInternationalSubGroup").val('');
        $("#descvallugInternationalSubGroup").val('');
        $("#idvallugInternationalGroup").val('');
        $("#descvallugInternationalGroup").val('');
        $('#txtZip').val('');
    }
});

$(document).on("focusout", "#idvallugMunicipality", function () {

    if ($("#idvallugMunicipality").val() == "") {
        $("#descvallugMunicipality").val('')
        $("#idvallugStdBarangay").val('');
        $("#descvallugStdBarangay").val('');
        $("#idvallugProvince").val('');
        $("#descvallugProvince").val('');
        $("#idvallugRegion").val('');
        $("#descvallugRegion").val('');
        $("#idvallugCountry").val('');
        $("#descvallugCountry").val('');
        $("#idvallugInternationalSubGroup").val('');
        $("#descvallugInternationalSubGroup").val('');
        $("#idvallugInternationalGroup").val('');
        $("#descvallugInternationalGroup").val('');
        $('#txtZip').val('');
    }
});


$(document).on("keyup", "#idvallugStdBarangay", function () {

    if ($("#idvallugStdBarangay").val() == "") {
        $("#descvallugStdBarangay").val('');
        $('#txtZip').val('');
    }
});


$(document).on("change", "#idvallugStdBarangay", function () {

    if ($("#idvallugStdBarangay").val() == "") {
        $("#descvallugStdBarangay").val('');
        $('#txtZip').val('');
    }
});

var autoClick = false;
function openInNewTab() {
    var url = 'http://' + $('#txtWebsite').val();
    var win = window.open(url, '_blank');
    win.focus();
}

$(document).on('keypress', '#txtWebsite', function (e) {

    if (e.which == 64)
        return false;
});

$(document).on('change', '#txtWebsite', function (e) {

    var text = $('#txtWebsite').val();
    if (text.indexOf("@") != -1) {
        $('#txtWebsite').val('');
    }

    if (text.includes('.', 0)) {

    }
});

$(document).on('click', '.BoxClose', function (e) {
    $('.lookupcolSearch').val("");
});

$(document).on('click', '#txtWebsiteLink', function (e) {
    return false;
});

$(document).on('dblclick', '#txtWebsiteLink', function (e) {
    openInNewTab();
});

$(document).keyup(function (e) {
    if (e.key === "Escape") {
        $('.lookupcolSearch').val("");
    }
});

function access() {
    if ($('#Individual').prop('checked')) {
        $('#chkLoadOwnersName').enable(true);
        $('#btnVendorBranch').enable(false);
    }
    else if ($('#Corporate').prop('checked')) {
        $('#btnVendorTaxInfo').enable(true);
        $('#btnVendorBIR').enable(true);
        $('#chkLoadOwnersName').enable(false);
    }
    else if ($('#WithoutTIN').prop('checked')) {
        $('#btnVendorTaxInfo').enable(true);
        $('#btnVendorBIR').enable(false);
        $('#chkLoadOwnersName').enable(false);
    }
}

function enablezipCode() {
    var alternateBarangay = $('#txtAltBrgy').val();
    var standardBarangay = $('#idvallugStdBarangay').val();

    if (alternateBarangay != "" && standardBarangay != "") {
        $('#txtZip').enable(false);
    } else if (alternateBarangay != "" && standardBarangay == "") {
        $('#txtZip').enable(true);
    } else if (alternateBarangay == "" && standardBarangay != "") {
        $('#txtZip').enable(false);
    } else if (alternateBarangay == "" && standardBarangay == "") {
        $('#txtZip').enable(false);
        $('#txtZip').val('');
    }
}

/*=== EXCESS CODES ===*/
function refreshtoolbox() {
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
}

//function window_close(verID) {
//    if (verID == "nwPopWindow") {
//        nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
//        nwParameter_Add("VendorId", $('#txtVendorID').val());
//        func_ActionDriven("actLoadButtons", false);
        
//    }
//    nwPopupForm_HideModal(verID);
//}

function validateTax() {
    if ($("#btnVendorTaxInfo").hasClass("noah-webui-disabled") == false) {
        return true;
    }
    else {
        return false;
    }
}

//$(document).on("click", "#btnHistory", function (e) {
//    if ($('#chkBox').prop('checked')) {
//        nwParameter_Add("code", $('#txtSuppliercode').val());
//    }
//    else {
//        nwParameter_Add("code", '%');
//    }
//    func_ActionDriven("LoadHistorical");
//    return false;
//});

$(document).on("change focusout", "#txtNickName", function () {
    xFormatNickName();
    //$fn.xFormatNickName();
});

$(document).on("change focusout", "#txtPlaceBirth", function () {
    //$fn.xFormatBirthPlace();
    xFormatBirthPlace();
});

$(document).on("keyup", "#txtUnitNo", function () {
    //$fn.xOnKeyUpEvents.xFullAddressValue();
    FullAddressValue();
});

$(document).on("keyup", "#txtFloorNo", function () {
    //$fn.xOnKeyUpEvents.xFullAddressValue();
    FullAddressValue();
});

$(document).on("keyup", "#txtBldgNo", function () {
    //$fn.xOnKeyUpEvents.xFullAddressValue();
    FullAddressValue();
});

$(document).on("keyup", "#txtEstablishment", function () {
    //$fn.xOnKeyUpEvents.xFullAddressValue();
    FullAddressValue();
});

$(document).on("keyup", "#txtBuilding", function () {
    //$fn.xOnKeyUpEvents.xFullAddressValue();
    FullAddressValue();
});

$(document).on("keyup", "#txtLandmark", function () {
    //$fn.xOnKeyUpEvents.xFullAddressValue();
    FullAddressValue();
});

$(document).on("keyup", "#txtStreetNo", function () {
    //$fn.xOnKeyUpEvents.xFullAddressValue();
    FullAddressValue();
});

$(document).on("keyup", "#txtStreetName", function () {
    //$fn.xOnKeyUpEvents.xFullAddressValue();
    FullAddressValue();
});

$(document).on("keyup", "#txtLot", function () {
    //$fn.xOnKeyUpEvents.xFullAddressValue();
    FullAddressValue();
});

$(document).on("keyup", "#txtBlock", function () {
    //$fn.xOnKeyUpEvents.xFullAddressValue();
    FullAddressValue();
});

$(document).on("keyup", "#txtSubdivision", function () {
    //$fn.xOnKeyUpEvents.xFullAddressValue();
    FullAddressValue();
});

$(document).on("keyup", "#idvallugStdBarangay", function () {
    //$fn.xOnKeyUpEvents.xFullAddressValue();
    FullAddressValue();
});

$(document).on("keyup", "#txtAltBrgy", function () {
    //$fn.xOnKeyUpEvents.xFullAddressValue();
    FullAddressValue();
});

$(document).on("keyup", "#idvallugMunicipality", function () {
    //$fn.xOnKeyUpEvents.xFullAddressValue();
    FullAddressValue();
});

$(document).on("click", "#cbFullAddress", function () {
    isFullAddress();
    FullAddressValue();

    //$fn.xOnClickEvents.xCheckBoxFullAddressTrigger();
    //$fn.xOnKeyUpEvents.xFullAddressValue();
});


function isFullAddress() {
    //is check fulladress
    if ($('#cbFullAddress').prop('checked') == true) {
            
        $('#txtFullAddress').enable(true);
        $('#txtUnitNo').enable(false);
        $('#txtFloorNo').enable(false);
        $('#txtBldgNo').enable(false);
        $('#txtEstablishment').enable(false);
        $('#txtBuilding').enable(false);
        $('#txtLandmark').enable(false);
        $('#txtStreetNo').enable(false);
        $('#txtStreetName').enable(false);
        $('#txtLot').enable(false);
        $('#txtBlock').enable(false);
        $('#txtPhase').enable(false);
        $('#txtSubdivision').enable(false);
        $('#txtZone').enable(false);
        $('#lugArea').enable(true);
        $('#lugStdBarangay').enable(false);
        $('#txtAltBrgy').enable(false);
        $('#lugMunicipality').enable(false);
        $('#txtZip').enable(false);
        

        $('.fulladdress').show();
        $(".landmark").hide();
        $(".streetname").hide();
        $(".subdivision").hide();
        $(".standardbarangay").hide();
        $(".alternativebarangay").hide();
        $(".municipality").hide();

        $('#txtUnitNo').val('');
        $('#txtFloorNo').val('');
        $('#txtBldgNo').val('');
        $('#txtEstablishment').val('');
        $('#txtBuilding').val('');
        $('#txtLandmark').val('');
        $('#txtStreetNo').val('');
        $('#txtStreetName').val('');
        $('#txtLot').val('');
        $('#txtBlock').val('');
        $('#txtPhase').val('');
        $('#txtSubdivision').val('');
        $('#txtZone').val('');
        $('#lugArea').val('');
        $('#lugStdBarangay').val('');
        $('#txtAltBrgy').val('');
        $('#lugMunicipality').val('');
        $('#lugProvince').val('');
        $('#lugRegion').val('');
        $('#txtZip').val('');

        

    } else {

        $('#txtFullAddress').enable(false);
        $('#txtUnitNo').enable(true);
        $('#txtFloorNo').enable(true);
        $('#txtBldgNo').enable(true);
        $('#txtEstablishment').enable(true);
        $('#txtBuilding').enable(true);
        $('#txtLandmark').enable(true);
        $('#txtStreetNo').enable(true);
        $('#txtStreetName').enable(true);
        $('#txtLot').enable(true);
        $('#txtBlock').enable(true);
        $('#txtPhase').enable(true);
        $('#txtSubdivision').enable(true);
        $('#txtZone').enable(true);
        $('#lugArea').enable(true);
        $('#lugStdBarangay').enable(true);
        $('#txtAltBrgy').enable(true);
        $('#lugMunicipality').enable(true);
        $('#lugProvince').enable(true);
        $('#lugRegion').enable(true);
        $('#txtZip').enable(true);

        $('.fulladdress').hide();
        $(".landmark").show();
        $(".streetname").show();
        $(".subdivision").show();
        $(".standardbarangay").show();
        $(".alternativebarangay").show();
        $(".municipality").show();
    
        }

}

function FullAddressValue() {

    var unitno = $('#txtUnitNo').val();
    var flrno = $('#txtUnitNo').val();
    var bldgno = $('#txtUnitNo').val();
    var estab = $('#txtUnitNo').val();
    var bldg = $('#txtUnitNo').val();
    var landmark = $('#txtUnitNo').val();
    var StreetNo = $('#txtUnitNo').val();
    var StreetName = $('#txtUnitNo').val();
    var Lot = $('#txtUnitNo').val();
    var Block = $('#txtUnitNo').val();
    var Subdivision = $('#txtUnitNo').val();
    var StandardBarangay = $('#txtUnitNo').val();
    var AlternativeBarangay = $('#txtUnitNo').val();
    var Municipality = $('#txtUnitNo').val();
    var Province = $('#txtUnitNo').val();
    var cbFullAddress = $('#cbFullAddress').is('checked');
    var FullAddress = $('#txtFullAddress').val();

                if (unitno.length > 0)
                    unitno = unitno + ' ';
                if (flrno.length > 0)
                    flrno = flrno + ' ';
                if (bldgno.length > 0)
                    bldgno = bldgno + ' ';
                if (estab.length > 0)
                    estab = estab + ' ';
                if (bldg.length > 0)
                    bldg = bldg + ' ';
                if (landmark.length > 0)
                    landmark = landmark + ' ';
                if (StreetNo.length > 0)
                    StreetNo = StreetNo + ' ';
                if (StreetName.length > 0)
                    StreetName = StreetName + ', ';
                if (Lot.length > 0)
                    Lot = Lot + ' ';
                if (Block.length > 0)
                    Block = Block + ' ';
                if (Subdivision.length > 0)
                    Subdivision = Subdivision + ', ';
                if (StandardBarangay.length > 0)
                    StandardBarangay = StandardBarangay + ', ';
                if (AlternativeBarangay.length > 0)
                    AlternativeBarangay = AlternativeBarangay + ', ';
                if (Municipality.length > 0)
                    Municipality = Municipality.replace(',', '') + ' ';

                if (cbFullAddress == true) {
                    $('#txtFullAddress').val('');
                }
                else {
                    FullAddress = unitno + flrno + bldgno + estab + bldg + landmark + StreetNo + StreetName + Lot + Block + Subdivision + StandardBarangay + AlternativeBarangay + Municipality + Province;
                    //$fn.xHeaderDetails.FullAddress.val(FullAddress);
                    $('#txtFullAddress').val(FullAddress);
                }


            }



//function window_close(verID) {
//    var isContinue = true;
//    if (verID == "nwPopWindow1") {
//        nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
//        func_ActionDriven("actLoadButtons", false);
//    }
//    nwPopupForm_HideModal(verID);

//    var arry = [];
//    arry = JSON.parse(sessionStorage.getItem("jsArray"));

//    if (arry == "00000" && arry != "" && arry != null) {
//        // $('#btnBasisforAgingAssignment').enable(true);
//    }
//    else {
//        //  $('#btnBasisforAgingAssignment').enable(false);
//    }

//    nwParameter_Add("jsArray", arry);
//    return isContinue;
//}


function getValueOfTin() {
    arry = [];
    let Tin = $('#txtTinNumber').val();
    var LastFive = Tin.substr(Tin.length - 5);

    if (LastFive == "00000") {
        $("#btnBasisforAgingAssignment").enable(true);
    }
    else {
        $("#btnBasisforAgingAssignment").enable(false);
    }
}

function regNameExist()
{
    msgBoxContainerQuestion = "VendorValidation";
    parent_MessageBoxQuestion("Registered Name already exists.\nDo you want to proceed?", "Vendor Information", "Question");
}

function autoRefresh() {
    if (nwSupplierCode != "" && nwIsReport == 0) {
        nwLoading_Start('xBind', crLoadingHTML);
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        //$('#noah-webui-default-Refresh').click(); //commented by: gg 10/26/2020
        $("#noah-webui-Toolbox-BindingNavigator").hide();
        $("#noah-webui-default-New").hide();
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-default-Inquire").hide();
        $("#noah-webui-default-Save").show();
        $("#noah-webui-default-Save").enable(true);
        $('#noah-webui-default-Refresh').show();
        $("#noah-webui-default-Export").show();
        $("#noah-webui-default-Export").enable(true);
    }

    else if (nwSupplierCode != "" && nwIsReport == 1) {
        nwLoading_Start('xBind', crLoadingHTML);
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        //$('#noah-webui-default-Refresh').click(); //commented by: gg 10/26/2020
        $("#noah-webui-Toolbox-BindingNavigator").hide();
        $("#noah-webui-default-New").hide();
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-default-Inquire").hide();
        $("#noah-webui-default-Save").show();
        $("#noah-webui-default-Save").enable(false);
        $('#noah-webui-default-Refresh').show();
        $("#noah-webui-default-Refresh").enable(false);
        $("#noah-webui-default-Export").show();
        $("#noah-webui-default-Export").enable(false);
    }
    else {
        $("#nwGrid1Con").enable(false);
        //$("#noah-webui-default-New").hide();
        //$("#noah-webui-default-Save").hide();
        //$('#noah-webui-default-Delete').hide();
        $("#noah-webui-Toolbox-BindingNavigator").show();
        $("#noah-webui-Toolbox-BindingNavigator").enable(true);
    }

}

function fullAdd() {

 
     let add = $('#cbFullAddress').prop("checked");
    if (add == false) {
        $('#txtFullAddress').val('')
    } else {
       
    }  
}

setTimeout(function () {
    $('input').attr("autocomplete", "off");
}, 1000);

function msgBoxContainerQuestionF(genID, answer) {
    if (genID == "VendorValidation") {
        if (answer == "Yes") {
            cust_GetPara();
            func_ActionDriven("actSavewithRegNameExists", false);
        }
    }
}

//=================

const title = "Vendor Information";

let $DateToday = "";
//let $ServerLink = "";


function xRadioButtonTaxRegTrigger() {

    if ($('#Individual').prop('checked') == true) {

        $('#idvallugPayeeSubType').enable(true);
        $("#idvallugCurrency").enable(true);
        $("#idvallugSalutation").enable(true);
        $("#idvallugNameSuffix").enable(true);
        $("#idvallugGender").enable(true);
        $("#idvallugCivilStatus").enable(true);
        $("#idvallugNationality").enable(true);
        $("#idvallugReligion").enable(true);
        $("#idvallugLocationType").enable(true);
        $("#idvallugArea").enable(true);
        $("#idvallugStdBarangay").enable(true);
        $("#idvallugMunicipality").enable(true);
        $("#idvallugBank").enable(true);
        $("#idvallugLocationType").enable(false);
    }
    else {

        $("#idvallugSalutation").enable(false);
        $("#idvallugNameSuffix").enable(false);
        $("#idvallugGender").enable(false);
        $("#idvallugCivilStatus").enable(false);
        $("#idvallugNationality").enable(false);
        $("#idvallugReligion").enable(false);
        $("#idvallugLocationType").enable(false);
    }
}

function xFullAddress() {
           
    if ($('#cbFullAddress').prop('checked') == true) {

    //var isFullAddress = $('#cbFullAddress').is(":checked");

    //if (isFullAddress) {
  
        xDisableAddressDetails();
    
    }
    else {

        xEnableAddressDetails();
      
    }
}

function xDisableAddressDetails() {


    $('#txtFullAddress').enable(true);
    $('#txtUnitNo').enable(false);
    $('#txtFloorNo').enable(false);
    $('#txtBldgNo').enable(false);
    $('#txtEstablishment').enable(false);
    $('#txtBuilding').enable(false);
    $('#txtLandmark').enable(false);
    $('#txtStreetNo').enable(false);
    $('#txtStreetName').enable(false);
    $('#txtLot').enable(false);
    $('#txtBlock').enable(false);
    $('#txtPhase').enable(false);
    $('#txtSubdivision').enable(false);
    $('#txtZone').enable(false);
    $('#lugArea').enable(false);
    $('#lugStdBarangay').enable(false);
    $('#txtAltBrgy').enable(false);
    $('#lugMunicipality').enable(false);
    $('#txtZip').enable(false);

    

}

function xEnableAddressDetails() {

    $('#txtFullAddress').enable(false);
    $('#txtUnitNo').enable(true);
    $('#txtFloorNo').enable(true);
    $('#txtBldgNo').enable(true);
    $('#txtEstablishment').enable(true);
    $('#txtBuilding').enable(true);
    $('#txtLandmark').enable(true);
    $('#txtStreetNo').enable(true);
    $('#txtStreetName').enable(true);
    $('#txtLot').enable(true);
    $('#txtBlock').enable(true);
    $('#txtPhase').enable(true);
    $('#txtSubdivision').enable(true);
    $('#txtZone').enable(true);
    $('#lugArea').enable(true);
    $('#lugStdBarangay').enable(true);
    $('#txtAltBrgy').enable(true);
    $('#lugMunicipality').enable(true);
    $('#lugProvince').enable(true);
    $('#lugRegion').enable(true);
    $('#txtZip').enable(true);
   
}


function xFormatNickName() {
    let value = $('#txtNickName').val();
    let worArr = value.split(' ');
    let tempArr = [];
    worArr.forEach(x => {
        let fStr = x.substring(1, x.length);
        tempArr.push(x.charAt(0).toUpperCase() + fStr.toLowerCase());
    })

    value = tempArr.join(" ");
    $('#txtNickName').val(value);
}

function xFormatBirthPlace() {
    let value = $('#txtPlaceBirth').val();
    let worArr = value.split(' ');
    let tempArr = [];
    worArr.forEach(x => {
        let fStr = x.substring(1, x.length);
        tempArr.push(x.charAt(0).toUpperCase() + fStr.toLowerCase());
    })

    value = tempArr.join(" ");
    $('#txtPlaceBirth').val(value);
}

function xValidateApprove() {
    var xStatus = $('#txtStatus').val();

    if (xStatus == "Approved" || xStatus == "Cancelled" || xStatus == "For Approval") {
        /* Disable the fields */
        xDisableFields();       
        $("#txtFullAddress").enable(false);
    }
        /* Disable the fields */
    else if (xStatus == "Saved" || xStatus.includes == "Disapproved") {
        xEnableFields();
        xIndividualDetails();
        xFullAddress();
    }
}

function xDisableFields() {

    $('#txtCrossCode').enable(false);
    $('#CurrencySelection').enable(false);
    $('#txtRegName').enable(false);
    $('#txtTradeName').enable(false);
    $('#chkLoadOwnersName').enable(false);
    $('#txtCheckPayeeName').enable(false);
    $('.radiodesign').enable(false);
    $('#txtWebsite').enable(false);
    $('#lugSalutation').enable(false);
    $('#txtLastName').enable(false);
    $('#lugNameSuffix').enable(false);
    $('#txtFirstName').enable(false);
    $('#txtMidInitial').enable(false);
    $('#txtNickName').enable(false);
    $('#txtDateBirth').enable(false);
    $('#txtPlaceBirth').enable(false);
    $('#lugGender').enable(false);
    $('#lugCivilStatus').enable(false);
    $('#lugNationality').enable(false);
    $('#lugReligion').enable(false);
    $('#txtUnitNo').enable(false);
    $('#txtFloorNo').enable(false);
    $('#txtBldgNo').enable(false);
    $('#txtEstablishment').enable(false);
    $('#txtBuilding').enable(false);
    $('#txtLandmark').enable(false);
    $('#txtStreetNo').enable(false);
    $('#txtStreetName').enable(false);
    $('#txtLot').enable(false);
    $('#txtBlock').enable(false);
    $('#txtPhase').enable(false);
    $('#txtSubdivision').enable(false);
    $('#txtZone').enable(false);
    $('#lugArea').enable(false);
    $('#lugStdBarangay').enable(false);
    $('#txtAltBrgy').enable(false);
    $('#lugMunicipality').enable(false);
    $('#txtPhone').enable(false);
    $('#txtLocal').enable(false);
    $('#txtMobile').enable(false);
    $('#txtEmailAdd').enable(false);
    $('#txtFax').enable(false);
    $('#lugBank').enable(false);
    $('#txtBankAccountNo').enable(false);
    $('#txtBankAddress').enable(false);
    $('#cbFullAddress').enable(false);
}

function xEnableFields() {
    if ($('#Individual').prop('checked') == true) {
       
        $('#txtRegName').enable(false);
    }
    else
    {
        $('#txtRegName').enable(true);
      
        $('#txtCrossCode').enable(true);
        $('#CurrencySelection').enable(true);
        $('#txtTradeName').enable(true);
        $('#chkLoadOwnersName').enable(true);
        $('#txtCheckPayeeName').enable(true);
        $('.radiodesign').enable(true);
        $('#txtWebsite').enable(true);
        $('#lugSalutation').enable(true);
        $('#txtLastName').enable(true);
        $('#lugNameSuffix').enable(true);
        $('#txtFirstName').enable(true);
        $('#txtMidInitial').enable(true);
        $('#txtNickName').enable(true);
        $('#txtDateBirth').enable(true);
        $('#txtPlaceBirth').enable(true);
        $('#lugGender').enable(true);
        $('#lugCivilStatus').enable(true);
        $('#lugNationality').enable(true);
        $('#lugReligion').enable(true);
        $('#txtUnitNo').enable(true);
        $('#txtFloorNo').enable(true);
        $('#txtBldgNo').enable(true);
        $('#txtEstablishment').enable(true);
        $('#txtBuilding').enable(true);
        $('#txtLandmark').enable(true);
        $('#txtStreetNo').enable(true);
        $('#txtStreetName').enable(true);
        $('#txtLot').enable(true);
        $('#txtBlock').enable(true);
        $('#txtPhase').enable(true);
        $('#txtSubdivision').enable(true);
        $('#txtZone').enable(true);
        $('#lugArea').enable(true);
        $('#lugStdBarangay').enable(true);
        $('#txtAltBrgy').enable(true);
        $('#lugMunicipality').enable(true);
        $('#txtPhone').enable(true);
        $('#txtLocal').enable(true);
        $('#txtMobile').enable(true);
        $('#txtEmailAdd').enable(true);
        $('#txtFax').enable(true);
        $('#lugBank').enable(true);
        $('#txtBankAccountNo').enable(true);
        $('#txtBankAddress').enable(true);
        $('#cbFullAddress').enable(true);

      
    }
}

function xIndividualDetails() {
    if ($('#Corporate').prop('checked') == true) {
    //var isCorporate = $('#Corporate').prop("checked");

    //if (isCorporate) {
        xDisableIndividualDetails();
    }
    else {
        xEnableIndividualDetails();
    }
}
/* Disable all Individual Details */
function xDisableIndividualDetails() {
    $("#lugSalutation").enable(false);
    $("#txtLastName").enable(false);
    $("#lugNameSuffix").enable(false);
    $("#txtFirstName").enable(false);
    $("#txtMidInitial").enable(false);
    $("#txtNickName").enable(false);
    $("#txtDateBirth").enable(false);
    $("#txtPlaceBirth").enable(false);
    $("#lugGender").enable(false);
    $("#lugCivilStatus").enable(false);
    $("#lugNationality").enable(false);
    $("#lugReligion").enable(false);
   
}

function xEnableIndividualDetails() {

    $("#lugSalutation").enable(true);
    $("#txtLastName").enable(true);
    $("#lugNameSuffix").enable(true);
    $("#txtFirstName").enable(true);
    $("#txtMidInitial").enable(true);
    $("#txtNickName").enable(true);
    $("#txtDateBirth").enable(true);
    $("#txtPlaceBirth").enable(true);
    $("#lugGender").enable(true);
    $("#lugCivilStatus").enable(true);
    $("#lugNationality").enable(true);
    $("#lugReligion").enable(true);

}

function xDisableAllLookupCode() {
   
    $("#idvallugPayeeSubType").enable(false);
    $("#idvallugCurrency").enable(false);
    $("#idvallugSalutation").enable(false);
    $("#idvallugNameSuffix").enable(false);
    $("#idvallugGender").enable(false);
    $("#idvallugCivilStatus").enable(false);
    $("#idvallugNationality").enable(false);
    $("#idvallugReligion").enable(false);
    $("#idvallugNationality").enable(false);
    $("#idvallugArea").enable(false);
    $("#idvallugStdBarangay").enable(false);
    $("#idvallugMunicipality").enable(false);
    $("#idvallugProvince").enable(false);
    $("#idvallugRegion").enable(false);
    $("#idvallugCountry").enable(false);
    $("#idvallugInternationalSubGroup").enable(false);
    $("#idvallugInternationalGroup").enable(false);
    $("#idvallugBank").enable(false);
   
}

function xEnableAllLookupCode() {

    $("#idvallugPayeeSubType").enable(true);
    $("#idvallugCurrency").enable(true);
    $("#idvallugSalutation").enable(true);
    $("#idvallugNameSuffix").enable(true);
    $("#idvallugGender").enable(true);
    $("#idvallugCivilStatus").enable(true);
    $("#idvallugNationality").enable(true);
    $("#idvallugReligion").enable(true);
    $("#idvallugNationality").enable(true);
    $("#idvallugArea").enable(true);
    $("#idvallugStdBarangay").enable(true);
    $("#idvallugMunicipality").enable(true);
    $("#idvallugBank").enable(true);

   
}

function $fn() {
    let $fn = {

        /* Header Details */
        xHeaderDetails: {

            /* radio button & checkboxes */
            Individual: $("#Individual"),
            Corporate: $("#Corporate"),
            WithoutTIN: $("#WithoutTIN"),
            AllowCurrencySelection: $("#CurrencySelection"),
            LoadOwnersName: $("#chkLoadOwnersName"),
            RadioDesign: $(".radiodesign"),
            Lumpsum: $("#rdbLumpsum"),
            PerTransaction: $("#rdbCheckIndividual"),
            FullAddressCheckbox: $("#cbFullAddress"),

            /* Textboxes and Lookups */
            SupplierCode: $("#txtSuppliercode"),
            LugPayeeSubType: $("#txtSuppliercode"),
            CrossRefCode: $("#txtCrossCode"),
            LugCurrency: $("#lugCurrency"),
            RegName: $("#txtRegName"),
            TradeName: $("#txtTradeName"),
            CheckPayeeName: $("#txtCheckPayeeName"),
            Website: $("#txtWebsite"),
            VendorID: $("#txtVendorID"),
            Status: $("#txtStatus"),
            LugSalutation: $("#lugSalutation"),
            LastName: $("#txtLastName"),
            LugNameSuffix: $("#lugNameSuffix"),
            FirstName: $("#txtFirstName"),
            MiddleInitial: $("#txtMidInitial"),
            NickName: $("#txtNickName"),
            BirthDate: $("#txtDateBirth"),
            Age: $("#txtAge"),
            BirthPlace: $("#txtPlaceBirth"),
            LugGender: $("#lugGender"),
            LugCivilStatus: $("#lugCivilStatus"),
            LugNationality: $("#lugNationality"),
            LugReligion: $("#lugReligion"),
            LocationCode: $("#txtLocationCode"),
            LugLocationType: $("#lugLocationType"),
            FullAddress: $("#txtFullAddress"),
            UnitNo: $("#txtUnitNo"),
            FloorNo: $("#txtFloorNo"),
            BuildingNo: $("#txtBldgNo"),
            EstablishmentName: $("#txtEstablishment"),
            BuildingName: $("#txtBuilding"),
            Landmark: $("#txtLandmark"),
            StreetNo: $("#txtStreetNo"),
            StreetName: $("#txtStreetName"),
            Lot: $("#txtLot"),
            Block: $("#txtBlock"),
            Phase: $("#txtPhase"),
            Subdivision: $("#txtSubdivision"),
            Zone: $("#txtZone"),
            LugArea: $("#lugArea"),
            LugStandardBarangay: $("#lugStdBarangay"),
            AlternativeBarangay: $("#txtAltBrgy"),
            LugMunicipality: $("#lugMunicipality"),
            LugProvince: $("#lugProvince"),
            LugRegion: $("#lugRegion"),
            LugCountry: $("#lugCountry"),
            LugInternationalSubGroup: $("#lugInternationalSubGroup"),
            LugInternationalGroup: $("#lugInternationalGroup"),
            ZipCode: $("#txtZip"),
            PhoneNo: $("#txtPhone"),
            Local: $("#txtLocal"),
            MobileNo: $("#txtMobile"),
            EmailAddress: $("#txtEmailAdd"),
            FaxNo: $("#txtFax"),
            LugBank: $("#lugBank"),
            BankAccountNo: $("#txtBankAccountNo"),
            BankAddress: $("#txtBankAddress"),

            /* Lookup Code & Description TextBoxes */
            PayeeSubTypeCode: $("#idvallugPayeeSubType"),
            PayeeSubTypeDesc: $("#descvallugPayeeSubType"),
            CurrencyCode: $("#idvallugCurrency"),
            CurrencyDesc: $("#descvallugCurrency"),
            SalutationCode: $("#idvallugSalutation"),
            SalutationDesc: $("#descvallugSalutation"),
            NameSuffixCode: $("#idvallugNameSuffix"),
            NameSuffixDesc: $("#descvallugNameSuffix"),
            GenderCode: $("#idvallugGender"),
            GenderDesc: $("#descvallugGender"),
            CivilStatusCode: $("#idvallugCivilStatus"),
            CivilStatusDesc: $("#descvallugCivilStatus"),
            NationalityCode: $("#idvallugNationality"),
            NationalityDesc: $("#descvallugNationality"),
            ReligionCode: $("#idvallugReligion"),
            ReligionDesc: $("#descvallugReligion"),
            LocationTypeCode: $("#idvallugLocationType"),
            LocationTypeDesc: $("#descvallugLocationType"),
            AreaCode: $("#idvallugArea"),
            AreaDesc: $("#descvallugArea"),
            StandardBarangayCode: $("#idvallugStdBarangay"),
            StandardBarangayDesc: $("#descvallugStdBarangay"),
            MunicipalityCode: $("#idvallugMunicipality"),
            MunicipalityDesc: $("#descvallugMunicipality"),
            ProvinceCode: $("#idvallugProvince"),
            ProvinceDesc: $("#descvallugProvince"),
            RegionCode: $("#idvallugRegion"),
            RegionDesc: $("#descvallugRegion"),
            CountryCode: $("#idvallugCountry"),
            CountryDesc: $("#descvallugCountry"),
            InternationalSubGroupCode: $("#idvallugInternationalSubGroup"),
            InternationalSubGroupDesc: $("#descvallugInternationalSubGroup"),
            InternationalGroupCode: $("#idvallugInternationalGroup"),
            InternationalGroupDesc: $("#descvallugInternationalGroup"),
            BankCode: $("#idvallugBank"),
            BankDesc: $("#descvallugBank"),

            /* Span Class Required Fields 'Main Location' */
            FullAddressClass: $('.fulladdress'),
            LandmarkClass: $(".landmark"),
            StreetNameClass: $(".streetname"),
            SubdivisionClass: $(".subdivision"),
            StandardBarangayClass: $(".standardbarangay"),
            AlternativeBarangayClass: $(".alternativebarangay"),
            MunicipalityClass: $(".municipality"),
        },

        /* Format the NickName Field */
        xFormatNickName: function () {
            let value = $('#txtNickName').val();
            let worArr = value.split(' ');
            let tempArr = [];
            worArr.forEach(x => {
                let fStr = x.substring(1, x.length);
                tempArr.push(x.charAt(0).toUpperCase() + fStr.toLowerCase());
            })

            value = tempArr.join(" ");
            $('#txtNickName').val(value);
        },

        /* Format the BirthPlace Field */
        xFormatBirthPlace: function () {
            let value = $('#txtPlaceBirth').val();
            let worArr = value.split(' ');
            let tempArr = [];
            worArr.forEach(x => {
                let fStr = x.substring(1, x.length);
                tempArr.push(x.charAt(0).toUpperCase() + fStr.toLowerCase());
            })

            value = tempArr.join(" ");
            $('#txtPlaceBirth').val(value);
        },

        /* Will Disable Fields Upon Refresh */
        xDisableFields: function () {
            $fn.xHeaderDetails.CrossRefCode.enable(false),
            $fn.xHeaderDetails.AllowCurrencySelection.enable(false),
            $fn.xHeaderDetails.RegName.enable(false),
            $fn.xHeaderDetails.TradeName.enable(false),
            $fn.xHeaderDetails.LoadOwnersName.enable(false),
            $fn.xHeaderDetails.CheckPayeeName.enable(false),
            $fn.xHeaderDetails.RadioDesign.enable(false),
            $fn.xHeaderDetails.Website.enable(false),
            $fn.xHeaderDetails.LugSalutation.enable(false),
            $fn.xHeaderDetails.LastName.enable(false),
            $fn.xHeaderDetails.LugNameSuffix.enable(false),
            $fn.xHeaderDetails.FirstName.enable(false),
            $fn.xHeaderDetails.MiddleInitial.enable(false),
            $fn.xHeaderDetails.NickName.enable(false),
            $fn.xHeaderDetails.BirthDate.enable(false),
            $fn.xHeaderDetails.BirthPlace.enable(false),
            $fn.xHeaderDetails.LugGender.enable(false),
            $fn.xHeaderDetails.LugCivilStatus.enable(false),
            $fn.xHeaderDetails.LugNationality.enable(false),
            $fn.xHeaderDetails.LugReligion.enable(false),
            $fn.xHeaderDetails.UnitNo.enable(false),
            $fn.xHeaderDetails.FloorNo.enable(false),
            $fn.xHeaderDetails.BuildingNo.enable(false),
            $fn.xHeaderDetails.EstablishmentName.enable(false),
            $fn.xHeaderDetails.BuildingName.enable(false),
            $fn.xHeaderDetails.Landmark.enable(false),
            $fn.xHeaderDetails.StreetNo.enable(false),
            $fn.xHeaderDetails.StreetName.enable(false),
            $fn.xHeaderDetails.Lot.enable(false),
            $fn.xHeaderDetails.Block.enable(false),
            $fn.xHeaderDetails.Phase.enable(false),
            $fn.xHeaderDetails.Subdivision.enable(false),
            $fn.xHeaderDetails.Zone.enable(false),
            $fn.xHeaderDetails.LugArea.enable(false),
            $fn.xHeaderDetails.LugStandardBarangay.enable(false),
            $fn.xHeaderDetails.AlternativeBarangay.enable(false),
            $fn.xHeaderDetails.LugMunicipality.enable(false),
            $fn.xHeaderDetails.PhoneNo.enable(false),
            $fn.xHeaderDetails.Local.enable(false),
            $fn.xHeaderDetails.MobileNo.enable(false),
            $fn.xHeaderDetails.EmailAddress.enable(false),
            $fn.xHeaderDetails.FaxNo.enable(false),
            $fn.xHeaderDetails.LugBank.enable(false),
            $fn.xHeaderDetails.BankAccountNo.enable(false),
            $fn.xHeaderDetails.BankAddress.enable(false),
            $fn.xHeaderDetails.FullAddressCheckbox.enable(false)
        },

        /* Will Enable Fields Upon Refresh */
        xEnableFields: function () {
            if ($fn.xHeaderDetails.Individual.is(":checked"))
                $fn.xHeaderDetails.RegName.enable(false);
            else
                $fn.xHeaderDetails.RegName.enable(true);

            $fn.xHeaderDetails.CrossRefCode.enable(true),
            $fn.xHeaderDetails.AllowCurrencySelection.enable(true),
            $fn.xHeaderDetails.TradeName.enable(true),
            $fn.xHeaderDetails.LoadOwnersName.enable(true),
            $fn.xHeaderDetails.CheckPayeeName.enable(true),
            $fn.xHeaderDetails.RadioDesign.enable(true),
            $fn.xHeaderDetails.Website.enable(true),
            $fn.xHeaderDetails.LugSalutation.enable(true),
            $fn.xHeaderDetails.LastName.enable(true),
            $fn.xHeaderDetails.LugNameSuffix.enable(true),
            $fn.xHeaderDetails.FirstName.enable(true),
            $fn.xHeaderDetails.MiddleInitial.enable(true),
            $fn.xHeaderDetails.NickName.enable(true),
            $fn.xHeaderDetails.BirthDate.enable(true),
            $fn.xHeaderDetails.BirthPlace.enable(true),
            $fn.xHeaderDetails.LugGender.enable(true),
            $fn.xHeaderDetails.LugCivilStatus.enable(true),
            $fn.xHeaderDetails.LugNationality.enable(true),
            $fn.xHeaderDetails.LugReligion.enable(true),
            $fn.xHeaderDetails.UnitNo.enable(true),
            $fn.xHeaderDetails.FloorNo.enable(true),
            $fn.xHeaderDetails.BuildingNo.enable(true),
            $fn.xHeaderDetails.EstablishmentName.enable(true),
            $fn.xHeaderDetails.BuildingName.enable(true),
            $fn.xHeaderDetails.Landmark.enable(true),
            $fn.xHeaderDetails.StreetNo.enable(true),
            $fn.xHeaderDetails.StreetName.enable(true),
            $fn.xHeaderDetails.Lot.enable(true),
            $fn.xHeaderDetails.Block.enable(true),
            $fn.xHeaderDetails.Phase.enable(true),
            $fn.xHeaderDetails.Subdivision.enable(true),
            $fn.xHeaderDetails.Zone.enable(true),
            $fn.xHeaderDetails.LugArea.enable(true),
            $fn.xHeaderDetails.LugStandardBarangay.enable(true),
            $fn.xHeaderDetails.AlternativeBarangay.enable(true),
            $fn.xHeaderDetails.LugMunicipality.enable(true),
            $fn.xHeaderDetails.PhoneNo.enable(true),
            $fn.xHeaderDetails.Local.enable(true),
            $fn.xHeaderDetails.MobileNo.enable(true),
            $fn.xHeaderDetails.EmailAddress.enable(true),
            $fn.xHeaderDetails.FaxNo.enable(true),
            $fn.xHeaderDetails.LugBank.enable(true),
            $fn.xHeaderDetails.BankAccountNo.enable(true),
            $fn.xHeaderDetails.BankAddress.enable(true),
            $fn.xHeaderDetails.FullAddressCheckbox.enable(true)
        },

        xIndividualDetails: function () {
            var isCorporate = $('#Corporate').prop("checked");

            if (isCorporate) {
                $fn.xDisableIndividualDetails();
            }
            else {
                $fn.xEnableIndividualDetails();
            }
        },
        /* Disable all Individual Details */
        xDisableIndividualDetails: function () {
            $fn.xHeaderDetails.LugSalutation.enable(false);
            $fn.xHeaderDetails.LastName.enable(false);
            $fn.xHeaderDetails.LugNameSuffix.enable(false);
            $fn.xHeaderDetails.FirstName.enable(false);
            $fn.xHeaderDetails.MiddleInitial.enable(false);
            $fn.xHeaderDetails.NickName.enable(false);
            $fn.xHeaderDetails.BirthDate.enable(false);
            $fn.xHeaderDetails.BirthPlace.enable(false);
            $fn.xHeaderDetails.LugGender.enable(false);
            $fn.xHeaderDetails.LugCivilStatus.enable(false);
            $fn.xHeaderDetails.LugNationality.enable(false);
            $fn.xHeaderDetails.LugReligion.enable(false);
            /**************************/
        },

        /* Enable all Individual Details */
        xEnableIndividualDetails: function () {
            $fn.xHeaderDetails.LugSalutation.enable(true);
            $fn.xHeaderDetails.LastName.enable(true);
            $fn.xHeaderDetails.LugNameSuffix.enable(true);
            $fn.xHeaderDetails.FirstName.enable(true);
            $fn.xHeaderDetails.MiddleInitial.enable(true);
            $fn.xHeaderDetails.NickName.enable(true);
            $fn.xHeaderDetails.BirthDate.enable(true);
            $fn.xHeaderDetails.BirthPlace.enable(true);
            $fn.xHeaderDetails.LugGender.enable(true);
            $fn.xHeaderDetails.LugCivilStatus.enable(true);
            $fn.xHeaderDetails.LugNationality.enable(true);
            $fn.xHeaderDetails.LugReligion.enable(true);
            /**************************/
        },

        xFullAddress: function () {
            var isFullAddress = $('#cbFullAddress').is(":checked");

            if (isFullAddress) {
                $fn.xDisableAddressDetails();
            }
            else {
                $fn.xEnableAddressDetails();
            }
        },
        /* Disable all Address Details */
        xDisableAddressDetails: function () {
            $fn.xHeaderDetails.FullAddress.enable(true);
            $fn.xHeaderDetails.UnitNo.enable(false);
            $fn.xHeaderDetails.FloorNo.enable(false);
            $fn.xHeaderDetails.BuildingNo.enable(false);
            $fn.xHeaderDetails.EstablishmentName.enable(false);
            $fn.xHeaderDetails.BuildingName.enable(false);
            $fn.xHeaderDetails.Landmark.enable(false);
            $fn.xHeaderDetails.StreetNo.enable(false);
            $fn.xHeaderDetails.StreetName.enable(false);
            $fn.xHeaderDetails.Lot.enable(false);
            $fn.xHeaderDetails.Block.enable(false);
            $fn.xHeaderDetails.Phase.enable(false);
            $fn.xHeaderDetails.Subdivision.enable(false);
            $fn.xHeaderDetails.Zone.enable(false);
            $fn.xHeaderDetails.LugArea.enable(false);
            $fn.xHeaderDetails.LugStandardBarangay.enable(false);
            $fn.xHeaderDetails.AlternativeBarangay.enable(false);
            $fn.xHeaderDetails.LugMunicipality.enable(false);
            $fn.xHeaderDetails.ZipCode.enable(false);
            /**************************/
        },

        /* Enable all Address Details */
        xEnableAddressDetails: function () {
            $fn.xHeaderDetails.FullAddress.enable(false);
            $fn.xHeaderDetails.UnitNo.enable(true);
            $fn.xHeaderDetails.FloorNo.enable(true);
            $fn.xHeaderDetails.BuildingNo.enable(true);
            $fn.xHeaderDetails.EstablishmentName.enable(true);
            $fn.xHeaderDetails.BuildingName.enable(true);
            $fn.xHeaderDetails.Landmark.enable(true);
            $fn.xHeaderDetails.StreetNo.enable(true);
            $fn.xHeaderDetails.StreetName.enable(true);
            $fn.xHeaderDetails.Lot.enable(true);
            $fn.xHeaderDetails.Block.enable(true);
            $fn.xHeaderDetails.Phase.enable(true);
            $fn.xHeaderDetails.Subdivision.enable(true);
            $fn.xHeaderDetails.Zone.enable(true);
            $fn.xHeaderDetails.LugArea.enable(true);
            $fn.xHeaderDetails.LugStandardBarangay.enable(true);
            $fn.xHeaderDetails.AlternativeBarangay.enable(true);
            $fn.xHeaderDetails.LugMunicipality.enable(true);
            $fn.xHeaderDetails.ZipCode.enable(true);
            /**************************/
        },


        /* Validation for Vendor Status */
        xValidateApprove: function () {
            var xStatus = $('#txtStatus').val();

            if (xStatus == "Approved" || xStatus == "Cancelled" || xStatus == "For Approval") {
                /* Disable the fields */
                $fn.xDisableFields();
                $fn.xHeaderDetails.FullAddress.enable(false);
            }
                /* Disable the fields */
            else if (xStatus == "Saved" || xStatus.includes("Disapproved")) {
                $fn.xEnableFields();
                $fn.xIndividualDetails();
                $fn.xFullAddress();
            }
        },

        /* Disable all Lookup Codes */
        xDisableAllLookupCode: function () {
            $fn.xHeaderDetails.PayeeSubTypeCode.enable(false);
            $fn.xHeaderDetails.CurrencyCode.enable(false);
            $fn.xHeaderDetails.SalutationCode.enable(false);
            $fn.xHeaderDetails.NameSuffixCode.enable(false);
            $fn.xHeaderDetails.GenderCode.enable(false);
            $fn.xHeaderDetails.CivilStatusCode.enable(false);
            $fn.xHeaderDetails.NationalityCode.enable(false);
            $fn.xHeaderDetails.ReligionCode.enable(false);
            $fn.xHeaderDetails.LocationTypeCode.enable(false);
            $fn.xHeaderDetails.AreaCode.enable(false);
            $fn.xHeaderDetails.StandardBarangayCode.enable(false);
            $fn.xHeaderDetails.MunicipalityCode.enable(false);
            $fn.xHeaderDetails.ProvinceCode.enable(false);
            $fn.xHeaderDetails.RegionCode.enable(false);
            $fn.xHeaderDetails.CountryCode.enable(false);
            $fn.xHeaderDetails.InternationalSubGroupCode.enable(false);
            $fn.xHeaderDetails.InternationalGroupCode.enable(false);
            $fn.xHeaderDetails.BankCode.enable(false);
            /**************************/
        },

        /* Enable all Lookup Codes */
        xEnableAllLookupCode: function () {
            $fn.xHeaderDetails.PayeeSubTypeCode.enable(true);
            $fn.xHeaderDetails.CurrencyCode.enable(true);
            $fn.xHeaderDetails.SalutationCode.enable(true);
            $fn.xHeaderDetails.NameSuffixCode.enable(true);
            $fn.xHeaderDetails.GenderCode.enable(true);
            $fn.xHeaderDetails.CivilStatusCode.enable(true);
            $fn.xHeaderDetails.NationalityCode.enable(true);
            $fn.xHeaderDetails.ReligionCode.enable(true);
            $fn.xHeaderDetails.AreaCode.enable(true);
            $fn.xHeaderDetails.StandardBarangayCode.enable(true);
            $fn.xHeaderDetails.MunicipalityCode.enable(true);
            $fn.xHeaderDetails.BankCode.enable(true);
            /**************************/
        },

        /* ON CLICK EVENTS */
        xOnClickEvents: {

            /* For Tax Registration Type Radio Buttons */
            xRadioButtonTaxRegTrigger: function () {
                let Individual = $fn.xHeaderDetails.Individual.is(":checked");

                if (Individual == true) {
        

                   

                    $fn.xHeaderDetails.PayeeSubTypeCode.enable(true);
                    $fn.xHeaderDetails.CurrencyCode.enable(true);
                    $fn.xHeaderDetails.SalutationCode.enable(true);
                    $fn.xHeaderDetails.NameSuffixCode.enable(true);
                    $fn.xHeaderDetails.GenderCode.enable(true);
                    $fn.xHeaderDetails.CivilStatusCode.enable(true);
                    $fn.xHeaderDetails.NationalityCode.enable(true);
                    $fn.xHeaderDetails.ReligionCode.enable(true);
                    $fn.xHeaderDetails.LocationTypeCode.enable(true);
                    $fn.xHeaderDetails.AreaCode.enable(true);
                    $fn.xHeaderDetails.StandardBarangayCode.enable(true);
                    $fn.xHeaderDetails.MunicipalityCode.enable(true);
                    $fn.xHeaderDetails.BankCode.enable(true);
                    $fn.xHeaderDetails.LocationTypeCode.enable(false);
                }
                else {
                    $fn.xHeaderDetails.SalutationCode.enable(false);
                    $fn.xHeaderDetails.NameSuffixCode.enable(false);
                    $fn.xHeaderDetails.GenderCode.enable(false);
                    $fn.xHeaderDetails.CivilStatusCode.enable(false);
                    $fn.xHeaderDetails.NationalityCode.enable(false);
                    $fn.xHeaderDetails.ReligionCode.enable(false);
                    $fn.xHeaderDetails.LocationTypeCode.enable(false);
                }
            },

            /* For Checkbox in Full Address */
            xCheckBoxFullAddressTrigger: function () {
                let cbFullAddress = $fn.xHeaderDetails.FullAddressCheckbox.is(":checked");

                if (cbFullAddress == true) {
                    $fn.xHeaderDetails.FullAddress.enable(true);
                    $fn.xHeaderDetails.UnitNo.enable(false);
                    $fn.xHeaderDetails.FloorNo.enable(false);
                    $fn.xHeaderDetails.BuildingNo.enable(false);
                    $fn.xHeaderDetails.EstablishmentName.enable(false);
                    $fn.xHeaderDetails.BuildingName.enable(false);
                    $fn.xHeaderDetails.Landmark.enable(false);
                    $fn.xHeaderDetails.StreetNo.enable(false);
                    $fn.xHeaderDetails.StreetName.enable(false);
                    $fn.xHeaderDetails.Lot.enable(false);
                    $fn.xHeaderDetails.Block.enable(false);
                    $fn.xHeaderDetails.Phase.enable(false);
                    $fn.xHeaderDetails.Subdivision.enable(false);
                    $fn.xHeaderDetails.Zone.enable(false);
                    $fn.xHeaderDetails.LugArea.enable(false);
                    $fn.xHeaderDetails.LugStandardBarangay.enable(false);
                    $fn.xHeaderDetails.AlternativeBarangay.enable(false);
                    $fn.xHeaderDetails.LugMunicipality.enable(false);
                    $fn.xHeaderDetails.ZipCode.enable(false);

                    $fn.xHeaderDetails.FullAddressClass.show();
                    $fn.xHeaderDetails.LandmarkClass.hide();
                    $fn.xHeaderDetails.StreetNameClass.hide();
                    $fn.xHeaderDetails.SubdivisionClass.hide();
                    $fn.xHeaderDetails.StandardBarangayClass.hide();
                    $fn.xHeaderDetails.AlternativeBarangayClass.hide();
                    $fn.xHeaderDetails.MunicipalityClass.hide();

                    $fn.xHeaderDetails.UnitNo.val('');
                    $fn.xHeaderDetails.FloorNo.val('');
                    $fn.xHeaderDetails.BuildingNo.val('');
                    $fn.xHeaderDetails.EstablishmentName.val('');
                    $fn.xHeaderDetails.BuildingName.val('');
                    $fn.xHeaderDetails.Landmark.val('');
                    $fn.xHeaderDetails.StreetNo.val('');
                    $fn.xHeaderDetails.StreetName.val('');
                    $fn.xHeaderDetails.Lot.val('');
                    $fn.xHeaderDetails.Block.val('');
                    $fn.xHeaderDetails.Phase.val('');
                    $fn.xHeaderDetails.Subdivision.val('');
                    $fn.xHeaderDetails.Zone.val('');
                    $fn.xHeaderDetails.AreaCode.val('');
                    $fn.xHeaderDetails.AreaDesc.val('');
                    $fn.xHeaderDetails.StandardBarangayCode.val('');
                    $fn.xHeaderDetails.StandardBarangayDesc.val('');
                    $fn.xHeaderDetails.AlternativeBarangay.val('');
                    $fn.xHeaderDetails.MunicipalityCode.val('');
                    $fn.xHeaderDetails.MunicipalityDesc.val('');
                    $fn.xHeaderDetails.ProvinceCode.val('');
                    $fn.xHeaderDetails.ProvinceDesc.val('');
                    $fn.xHeaderDetails.RegionCode.val('');
                    $fn.xHeaderDetails.RegionDesc.val('');
                    $fn.xHeaderDetails.CountryCode.val('');
                    $fn.xHeaderDetails.CountryDesc.val('');
                    $fn.xHeaderDetails.InternationalSubGroupCode.val('');
                    $fn.xHeaderDetails.InternationalSubGroupDesc.val('');
                    $fn.xHeaderDetails.InternationalGroupCode.val('');
                    $fn.xHeaderDetails.InternationalGroupDesc.val('');
                    $fn.xHeaderDetails.ZipCode.val('');
                }
                else {
                    $fn.xHeaderDetails.FullAddress.enable(false);
                    $fn.xHeaderDetails.UnitNo.enable(true);
                    $fn.xHeaderDetails.FloorNo.enable(true);
                    $fn.xHeaderDetails.BuildingNo.enable(true);
                    $fn.xHeaderDetails.EstablishmentName.enable(true);
                    $fn.xHeaderDetails.BuildingName.enable(true);
                    $fn.xHeaderDetails.Landmark.enable(true);
                    $fn.xHeaderDetails.StreetNo.enable(true);
                    $fn.xHeaderDetails.StreetName.enable(true);
                    $fn.xHeaderDetails.Lot.enable(true);
                    $fn.xHeaderDetails.Block.enable(true);
                    $fn.xHeaderDetails.Phase.enable(true);
                    $fn.xHeaderDetails.Subdivision.enable(true);
                    $fn.xHeaderDetails.Zone.enable(true);
                    $fn.xHeaderDetails.LugArea.enable(true);
                    $fn.xHeaderDetails.LugStandardBarangay.enable(true);
                    $fn.xHeaderDetails.AlternativeBarangay.enable(true);
                    $fn.xHeaderDetails.LugMunicipality.enable(true);

                    $fn.xHeaderDetails.FullAddressClass.hide();
                    $fn.xHeaderDetails.LandmarkClass.show();
                    $fn.xHeaderDetails.StreetNameClass.show();
                    $fn.xHeaderDetails.SubdivisionClass.show();
                    $fn.xHeaderDetails.StandardBarangayClass.show();
                    $fn.xHeaderDetails.AlternativeBarangayClass.show();
                    $fn.xHeaderDetails.MunicipalityClass.show();
                }
            }
        },

        /* ON KEYUP EVENTS */
        xOnKeyUpEvents: {

            xFullAddressValue: function () {
                let unitno = $fn.xHeaderDetails.UnitNo.val();
                let flrno = $fn.xHeaderDetails.FloorNo.val();
                let bldgno = $fn.xHeaderDetails.BuildingNo.val();
                let estab = $fn.xHeaderDetails.EstablishmentName.val();
                let bldg = $fn.xHeaderDetails.BuildingName.val();
                let landmark = $fn.xHeaderDetails.Landmark.val();
                let StreetNo = $fn.xHeaderDetails.StreetNo.val();
                let StreetName = $fn.xHeaderDetails.StreetName.val();
                let Lot = $fn.xHeaderDetails.Lot.val();
                let Block = $fn.xHeaderDetails.Block.val();
                let Subdivision = $fn.xHeaderDetails.Subdivision.val();
                let StandardBarangay = $fn.xHeaderDetails.StandardBarangayDesc.val();
                let AlternativeBarangay = $fn.xHeaderDetails.AlternativeBarangay.val();
                let Municipality = $fn.xHeaderDetails.MunicipalityDesc.val();
                let Province = $fn.xHeaderDetails.ProvinceDesc.val();
                let cbFullAddress = $fn.xHeaderDetails.FullAddressCheckbox.is(":checked");
                let FullAddress = '';

                if (unitno.length > 0)
                    unitno = unitno + ' ';
                if (flrno.length > 0)
                    flrno = flrno + ' ';
                if (bldgno.length > 0)
                    bldgno = bldgno + ' ';
                if (estab.length > 0)
                    estab = estab + ' ';
                if (bldg.length > 0)
                    bldg = bldg + ' ';
                if (landmark.length > 0)
                    landmark = landmark + ' ';
                if (StreetNo.length > 0)
                    StreetNo = StreetNo + ' ';
                if (StreetName.length > 0)
                    StreetName = StreetName + ', ';
                if (Lot.length > 0)
                    Lot = Lot + ' ';
                if (Block.length > 0)
                    Block = Block + ' ';
                if (Subdivision.length > 0)
                    Subdivision = Subdivision + ', ';
                if (StandardBarangay.length > 0)
                    StandardBarangay = StandardBarangay + ', ';
                if (AlternativeBarangay.length > 0)
                    AlternativeBarangay = AlternativeBarangay + ', ';
                if (Municipality.length > 0)
                    Municipality = Municipality.replace(',', '') + ' ';

                if (cbFullAddress == true) {
                    $fn.xHeaderDetails.FullAddress.val('');
                }
                else {
                    FullAddress = unitno + flrno + bldgno + estab + bldg + landmark + StreetNo + StreetName + Lot + Block + Subdivision + StandardBarangay + AlternativeBarangay + Municipality + Province;
                    $fn.xHeaderDetails.FullAddress.val(FullAddress);
                }


            }

        }

    }
    return $fn;
}