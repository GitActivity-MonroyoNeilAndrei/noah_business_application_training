var isnewrow = 0;
var newRow = true;
//var nwLink;
var menuTitle = "Dealer Information";
var nwIsReport;
var nwSupplierCode = "";
var arry = "";
var nwDocno = "";
var isVendLoc = false;

var isOpen = true;
var _isOpen = true;

var nwGrid1Con_Book;
var nwGrid1Con_Sheet;

var nwGrid2Con_Book;
var nwGrid2Con_Sheet;

var nwGridConHist_Book;
var nwGridConHist_Sheet;

var nwGridCon3Custom_Book;
var nwGridCon3Custom_Sheet;



var
SPR_COMMSTYPE = 1,
SPR_PHONEBUSI = 2,
SPR_MOBILE = 3,
SPR_EMAILADD = 4,
SPR_COMMTYPECODE = 5;

var startIndex = 0,
        SPR_DDATICK = ++startIndex,
        SPR_BANK = ++startIndex,
        SPR_PAYEE = ++startIndex,
        SPR_BRANCHCODE = ++startIndex,
        SPR_BRANCHNAME = ++startIndex,      
       
        SPR_TYPEOFACCTDESC = ++startIndex,
        SPR_ACCTNO = ++startIndex,
        SPR_FULLACCTNO = ++startIndex,
        SPR_SWIFTCODE = ++startIndex,
        SPR_TYPEOFPAYMENT = ++startIndex,
        SPR_PAYMENTINSTRUC = ++startIndex,
        SPR_BANKCode = ++startIndex,
         SPR_TYPEOFACCT = ++startIndex,
        SPR_TYPEOFPAYMENTCODE = ++startIndex,
        SPR_reqswiftcode = ++startIndex;

function func_Reload() {
    crLnk = GetCurrentURL() + "LMSDealerInformation_Gateway";
    crLnkGateKey = "LMSDealerInformation";
    crnwTagSingleBind = true;

    nwIsReport = getParameterByName('nwIsReport');
    nwParameter_Add("nwIsReport", nwIsReport);

    nwSupplierCode = getParameterByName('nwSupplierCode');
    nwParameter_Add("nwSupplierCode", nwSupplierCode);

    nwDocno = getParameterByName('nwDocno');
    nwParameter_Add("nwDocno", nwDocno);
    //$('#tab-main-one, #tab-main-two, #tab-main-three, #tab-main-four, #tab-main-five, #tab-main-six, #tab-main-seven').prop('checked', false);
    $('#tab-one, #tab-two, #tab-three').prop('checked', false);
    DisableFieldsDone();
    DisableFields();
    var isContinue = true;
    init_request();
    cust_GetPara();

    $('#txtDateBirth').datepicker();
    $('#txtDateBirth').mask('?99/99/9999');
    //$('#txtVat').mask('?999-999-999-99999');
    //$('#txtNonVat').mask('?999-999-999-99999');
    $('#txtPhone').mask('?999999999999999');
    $('#txtLocal').mask('?999999999999999999');
    $('#txtMobile').mask('?999999999999');
    $('#txtFax').mask('?999999999999999999');
    //$('#txtphoneM').mask('?(999) 9999-9999');
    //$('#mobile').mask('?639 999999999');

    /*===== MODAL =====*/
    nwPopupForm_Create("linkbir", true);
    nwPopupForm_Create("linkTaxInfo", true);
    nwPopupForm_Create("linkLocation", true);
    nwPopupForm_Create("linkContacts", true);
    nwPopupForm_Create("linkChildUnitsAcct", true);
    nwPopupForm_Create("linkBranchGrpAss", true);
    nwPopupForm_Create("linkPmtTermAss", true);
    nwPopupForm_Create("nwDisappDtls", true);
    nwPopupForm_Create("nwUploadHistory", false);
    nwPopupForm_Create("actViewContacts", false);

    return isContinue;
}

// function if nwIsReport
function nwIsRefresh() {
    if (nwIsReport == 1) {
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox").hide();
    }
    else if (getParameterByName('nwDocno') != "") {
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        nwParameter_Add('nwDocno', getParameterByName('nwDocno'));
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox").hide();
        //func_ActionDriven("actHeadOffice", false);
    }
}

function setButtonsEnable() {
    $('#btnVendorLocation').enable(true);
    $('#btnVendorContact').enable(true);
    $('#btnDealerAssetAssign').enable(true);
    $('#btnSalespersonAssign').enable(true);
    $('#btnDealerBankAccountInfo').enable(true);
    $('#btnViewContacts').enable(true); 
    $('#btnViewUpdateHistory').enable(true);
    $('#btnReqCompliance').enable(true);
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
    
    //nwParameter_Add_Table("nwGrid1Con");
    //nwParameter_Add_Table("nwGrid2Con");
     $('#noah-webui-Toolbox-BindingNavigator').enable(false);
    func_ActionDriven("actHeadOffice", false);
    _checkAbove = false;
    $('#btnSalespersonAssign').removeClass('btnGreen');
    $('#btnSalespersonAssign').enable(false);
    $('#idvallugPartyType').focus();

    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", menuTitle, "", indef, enume);
    isContinue = false;
    $('#noah-webui-Toolbox-BindingNavigator').enable(true);
    return isContinue;
}


function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    $('#noah-webui-Toolbox-BindingNavigator').enable(true);
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", menuTitle, "", indef, enume);
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
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", menuTitle, "", indef, enume);
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

    //nwParameter_Add_Table("nwGrid1Con", true);
    //nwParameter_Add_Table("nwGrid2Con", true);
    //nwParameter_Add_Table("nwGrid1Con");

    try {
        nwParameter_Add_Spread(nwGrid1Con_Book);
        nwParameter_Add_Spread(nwGrid2Con_Book);
    } catch (ex) {
    }

    nwParameter_Add("idvallugPartyType", $('#idvallugPartyType').val());
    nwParameter_Add("idvallugDealerLoc", $('#idvallugDealerLoc').val());
    nwParameter_Add("idvallugIndustry", $('#idvallugIndustry').val());
    nwParameter_Add("idvallugIndustryScheme", $('#idvallugIndustryScheme').val());
    nwParameter_Add("idvallugEntityType", $('#idvallugEntityType').val());
    nwParameter_Add("idvallugBusinessReg", $('#idvallugBusinessReg').val());

    
    nwParameter_Add("txtVendorID", $('#txtVendorID').val());

    nwParameter_Add("txtVat", $('#txtVat').val());
    nwParameter_Add("txtNonVat", $('#txtNonVat').val());

    nwParameter_Add("idvallugEWT", $('#idvallugEWT').val());

    nwParameter_Add("rbVat", $('#rbVat').prop("checked"));
    nwParameter_Add("rbNonVat", $('#rbNonVat').prop("checked"));
    
    
    
    
    nwParameter_Add("cmbPrepMail", $('#cmbPrepMail').val());
    nwParameter_Add("txtRefCode", $('#txtRefCode').val());
    
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

    //PRESENT ADDRESS SIDE
    //nwParameter_Add("txtLocationCode", $('#txtLocationCode').val());
    //nwParameter_Add("idvallugLocationType", $('#idvallugLocationType').val());
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

    //PERMANENT ADDRESS SIDE
    nwParameter_Add("chkSamePresentAdd", $('#chkSamePresentAdd').prop("checked"));
    //nwParameter_Add("txtLocationCode2", $('#txtLocationCode2').val());
    //nwParameter_Add("idvallugLocationType2", $('#idvallugLocationType2').val());
    nwParameter_Add("cbFullAddress2", $('#cbFullAddress2').prop("checked"));
    nwParameter_Add("txtFullAddress2", $('#txtFullAddress2').val());
    nwParameter_Add("txtUnitNo2", $('#txtUnitNo2').val());
    nwParameter_Add("txtFloorNo2", $('#txtFloorNo2').val());
    nwParameter_Add("txtBldgNo2", $('#txtBldgNo2').val());
    nwParameter_Add("txtEstablishment2", $('#txtEstablishment2').val());
    nwParameter_Add("txtBuilding2", $('#txtBuilding2').val());
    nwParameter_Add("txtLandmark2", $('#txtLandmark2').val());
    nwParameter_Add("txtStreetNo2", $('#txtStreetNo2').val());
    nwParameter_Add("txtStreetName2", $('#txtStreetName2').val());
    nwParameter_Add("txtLot2", $('#txtLot2').val());
    nwParameter_Add("txtBlock2", $('#txtBlock2').val());
    nwParameter_Add("txtPhase2", $('#txtPhase2').val());
    nwParameter_Add("txtSubdivision2", $('#txtSubdivision2').val());
    nwParameter_Add("txtZone2", $('#txtZone2').val());
    nwParameter_Add("idvallugArea2", $('#idvallugArea2').val());
    nwParameter_Add("idvallugStdBarangay2", $('#idvallugStdBarangay2').val());
    nwParameter_Add("txtAltBrgy2", $('#txtAltBrgy2').val());
    nwParameter_Add("idvallugMunicipality2", $('#idvallugMunicipality2').val());
    nwParameter_Add("idvallugProvince2", $('#idvallugProvince2').val());
    nwParameter_Add("idvallugRegion2", $('#idvallugRegion2').val());
    nwParameter_Add("idvallugCountry2", $('#idvallugCountry2').val());
    
    nwParameter_Add("txtStatus", $('#txtStatus').val());

       
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

    if (idName == 'lugPartyType') {
        //nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        //func_ActionDriven("checkisbranch", true);
    }

    if (idName == 'lugDealerLoc') {
        //nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        //func_ActionDriven("checkisbranch", true);
    }
    
    if (idName == 'lugIndustry') {

        var scheme1id = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var scheme1desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();

        $("#idvallugIndustryScheme").val(scheme1id);
        $("#descvallugIndustryScheme").val(scheme1desc);

        //var scheme1id = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(5)").text();
        //var scheme1desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(3)").text();

        //$('#idvallugIndustryScheme').val(scheme1id);
        //$('#descvallugIndustryScheme').val(scheme1desc);
    }

    if (idName == 'lugIndustryScheme') {
        //nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        //func_ActionDriven("checkisbranch", true);
    }
    if (idName == 'lugEntityType') {
        //nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        //func_ActionDriven("checkisbranch", true);
    }

    if (idName == 'lugBusinessReg') {
        //nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        //func_ActionDriven("checkisbranch", true);
    }

    if (idName == 'lugEWT') {
        //nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        //func_ActionDriven("checkisbranch", true);
    }

    if (idName == 'lugCommsType') {


        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        //var code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (0) + ")").text();
        //var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (1) + ")").text();

        var row = nwGrid1Con_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGrid1Con_Book.ActiveSheet.SetText(SPR_COMMSTYPE - 1, row, desc);
        nwGrid1Con_Book.ActiveSheet.SetText(SPR_COMMTYPECODE - 1, row, code);
      

        //nwLib.nwTempTable_RowData_Set("nwGrid1Con", crnwTR.index(), SPR_COMMSTYPE)(desc);
        //nwLib.nwTempTable_RowData_Set("nwGrid1Con", crnwTR.index(), SPR_COMMTYPECODE)(code);
        nwParameter_Add("COMMTYPECode", code);
        func_ActionDriven("actChkPhoneMobEmail", false);


        //var email = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (2) + ")").text();
        //var landline = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (3) + ")").text();
        //var mobile = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (4) + ")").text();

        //crnwTR.find("td:eq(" + SPR_COMMSTYPE + ")").text(desc);

        //if(email == "1")
        //{
        //    $("#nwGrid1Con .tblGridBody").find("tr:eq("+crnwTR.index()+")").find("td:eq(2) input").enable(false);
        //    $("#nwGrid1Con .tblGridBody").find("tr:eq("+crnwTR.index()+")").find("td:eq(3) input").enable(false);
        //}
        //if(landline == "1")
        //{
        //    $("#nwGrid1Con .tblGridBody").find("tr:eq("+crnwTR.index()+")").find("td:eq(3) input").enable(false);
        //    $("#nwGrid1Con .tblGridBody").find("tr:eq("+crnwTR.index()+")").find("td:eq(4) input").enable(false);
        //}
        //if (mobile == "1")
        //{
        //    $("#nwGrid1Con .tblGridBody").find("tr:eq(" + crnwTR.index() + ")").find("td:eq(2) input").enable(false);
        //    $("#nwGrid1Con .tblGridBody").find("tr:eq(" + crnwTR.index() + ")").find("td:eq(4) input").enable(false);
        //}

    }

    if (idName == 'lugBank') {

        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        //var code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (0) + ")").text();
        //var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (1) + ")").text();

        var row = nwGrid2Con_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGrid2Con_Book.ActiveSheet.SetText(SPR_BANKCode - 1, row, code);
        nwGrid2Con_Book.ActiveSheet.SetText(SPR_BANK - 1, row, desc);


        //crnwTR.find("td:eq(" + SPR_BANKCode + ")").text(code);
        //crnwTR.find("td:eq(" + SPR_BANK + ")").text(desc);
        var tradenameMET = $('#txtTradeName').val();
        var tradenameCITI = $('#txtCheckPayeeName').val();
        if (code == 'METROBANK' || code == 'MBTC') {
            nwGrid2Con_Book.ActiveSheet.SetText(SPR_PAYEE - 1, row, (tradenameMET));
            //crnwTR.find("td:eq(" + SPR_PAYEE + ") input").val(tradenameMET);
            //$('#nwGrid2Con .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SWIFTCODE + ") input").css('background-color', 'gainsboro');
            //$('#nwGrid2Con .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SWIFTCODE + ")").enable(false);

        } else if (code == 'CITIBANK') {
            nwGrid2Con_Book.ActiveSheet.SetText(SPR_PAYEE - 1, row, (tradenameCITI));
            //crnwTR.find("td:eq(" + SPR_PAYEE + ") input").val(tradenameCITI);
            //$('#nwGrid2Con .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SWIFTCODE + ") input").css('background-color', 'white');
            //$('#nwGrid2Con .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SWIFTCODE + ")").enable(true);

        //} else if (code == 'MBTC') {
            //crnwTR.find("td:eq(" + SPR_PAYEE + ")").text(tradenameCITI);
        } else {
            nwGrid2Con_Book.ActiveSheet.SetText(SPR_PAYEE - 1, row, (tradenameCITI));
            //crnwTR.find("td:eq(" + SPR_PAYEE + ") input").val(tradenameCITI);
            //$('#nwGrid2Con .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SWIFTCODE + ") input").css('background-color', 'gainsboro');
            //$('#nwGrid2Con .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SWIFTCODE + ")").enable(false);

        }
        //nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        //func_ActionDriven("checkisbranch", true);
    }

    else if (idName == 'lugTypeofacct') {

        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text(); //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text(); //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        //var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();

        var row = nwGrid2Con_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGrid2Con_Book.ActiveSheet.SetText(SPR_TYPEOFACCTDESC - 1, row, desc);
        nwGrid2Con_Book.ActiveSheet.SetText(SPR_TYPEOFACCT - 1, row, code);
    }

    if (idName == 'lugTypeofpay') {

        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        //var code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (0) + ")").text();
        //var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (1) + ")").text();
        
        var row = nwGrid2Con_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGrid2Con_Book.ActiveSheet.SetText(SPR_TYPEOFPAYMENTCODE - 1, row, code);
        nwGrid2Con_Book.ActiveSheet.SetText(SPR_TYPEOFPAYMENT - 1, row, desc);
        nwGrid2Con_Book.ActiveSheet.SetText(SPR_reqswiftcode - 1, row, getGridData(idNum, 2));

        //crnwTR.find("td:eq(" + SPR_TYPEOFPAYMENTCODE + ")").text(code);
        //crnwTR.find("td:eq(" + SPR_TYPEOFPAYMENT + ")").text(desc);

        //crnwTR.find("td:eq(" + SPR_reqswiftcode + ")").text(getGridData(idNum, 2));
        //crnwTR.find("td:eq(" + SPR_SWIFTCODE + ") input").val('');
        //var reqswiftcode =
        //nwGrid2Con_Book.ActiveSheet.GetValue((SPR_reqswiftcode - 1), row)
        Cuz_nwGrid2_SwiftCode(crnwTR.index())

        nwParameter_Add("typeofpay",code);
        func_ActionDriven("actEnableSwift", true);
    }

    if (idName == 'OptLocForms') {
        //nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        //func_ActionDriven("checkisbranch", true);
    }

    


    if (idName == 'lugsupplier') {
        nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        func_ActionDriven("checkisbranch", true);
    }

    if (idName == 'lugArea') {
        $fn().xOnKeyUpEvents.xFullAddressValue();
    }

    if (idName == 'lugStdBarangay') {
        var stdBrgy = $("#idvallugStdBarangay").val()
        var altBrgy = $('#txtAltBrgy').val();

        if (stdBrgy != "" && altBrgy == "") {
            $('#txtZip').val("");
            $('#txtZip').prop('disabled', true);
        } else if (stdBrgy == "" && altBrgy != "") {
            $('#txtZip').val("");
            $('#txtZip').prop('disabled', false);
        } else if (stdBrgy != "" && altBrgy != "") {
            $('#txtZip').val("");
            $('#txtZip').prop('disabled', true);
        }

        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var rgnCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var rgnDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        //var muniCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(3)").text();
        //var muniDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(4)").text();
        //var provCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(5)").text();
        //var provDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(6)").text();
        //var rgnCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(7)").text();
        //var rgnDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(8)").text();
        //var cntryCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(9)").text();
        //var cntryDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(10)").text();


        //var isgCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(11)").text();
        //var isgDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(12)").text();
        //var igCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(13)").text();
        //var igDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(14)").text();

        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();

        //var zipCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
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

        $fn().xOnKeyUpEvents.xFullAddressValue();

        if (stdBrgy == "") {
            if (parseInt(zipCodeCnt) == 1)
                $("#txtZip").prop("disabled", true);
            else if (parseInt(zipCodeCnt) > 1) {
                $("#txtZip").val("");
                $("#txtZip").prop("disabled", false);
            }
        }
    }

    if (idName == 'lugMunicipality') {

        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var rgnCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var rgnDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var cntDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var isgCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var isgDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();
        var isgCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 11 + ") span").text();
        var igDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();
        var zipCodeCnt = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 12 + ") span").text();
        

        //var zipCode  = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
        //var provCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(3)").text();
        //var provDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(4)").text();
        //var rgnCode  = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(5)").text();
        //var rgnDesc  = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(6)").text();
        //var cntCode  = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(7)").text();
        //var cntDesc  = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(8)").text();
        //var isgCode  = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(9)").text();
        //var isgDesc  = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(10)").text();
        //var igCode   = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(11)").text();
        //var igDesc   = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(10)").text();
        //var zipCodeCnt = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(12)").text();

        //$('#idvallugStdBarangay').val('');
        //$('#descvallugStdBarangay').val('');

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
        $("#txtZip").val(zipCode);

        if ($("#idvallugStdBarangay").val() == "") {
            if (parseInt(zipCodeCnt) == 1)
                $("#txtZip").prop("disabled", true);
            else if (parseInt(zipCodeCnt) > 1) {
                $("#txtZip").val("");
                $("#txtZip").prop("disabled", false);
            }
        }
    }


    //PERMANENT
    if (idName == 'lugArea2') {
        $fn().xOnKeyUpEvents.xFullAddressValue2();
    }

    if (idName == 'lugStdBarangay2') {
        var stdBrgy = $("#idvallugStdBarangay2").val()
        var altBrgy = $('#txtAltBrgy2').val();

        if (stdBrgy != "" && altBrgy == "") {
            $('#txtZip2').val("");
            $('#txtZip2').prop('disabled', true);
        } else if (stdBrgy == "" && altBrgy != "") {
            $('#txtZip2').val("");
            $('#txtZip2').prop('disabled', false);
        } else if (stdBrgy != "" && altBrgy != "") {
            $('#txtZip2').val("");
            $('#txtZip2').prop('disabled', true);
        }

        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var rgnCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var rgnDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();
        //var muniCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(3)").text();
        //var muniDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(4)").text();
        //var provCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(5)").text();
        //var provDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(6)").text();
        //var rgnCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(7)").text();
        //var rgnDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(8)").text();
        //var cntryCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(9)").text();
        //var cntryDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(10)").text();


        //var isgCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(11)").text();
        //var isgDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(12)").text();
        //var igCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(13)").text();
        //var igDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(14)").text();

        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        //var zipCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
        //var zipCodeCnt = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(15)").text();

        if (stdBrgy != "") {
            $("#idvallugMunicipality2").val(muniCode);
            $("#descvallugMunicipality2").val(muniDesc);
            $("#idvallugProvince2").val(provCode);
            $("#descvallugProvince2").val(provDesc);
            $("#idvallugRegion2").val(rgnCode);
            $("#descvallugRegion2").val(rgnDesc);
            $("#idvallugCountry2").val(cntryCode);
            $("#descvallugCountry2").val(cntryDesc);
            //$("#idvallugInternationalSubGroup2").val(isgCode);
            //$("#descvallugInternationalSubGroup").val(isgDesc);
            //$("#idvallugInternationalGroup").val(igCode);
            //$("#descvallugInternationalGroup").val(igDesc);
            $("#txtZip2").val(zipCode);
            //$("#txtCntZip").val(zipCodeCnt);
        }

        if (stdBrgy != "")
            $("#txtAltBrgy2").enable(false);
        else if (stdBrgy == "")
            $("#txtAltBrgy2").enable(true);

        $fn().xOnKeyUpEvents.xFullAddressValue2();

        if (stdBrgy == "") {
            if (parseInt(zipCodeCnt) == 1)
                $("#txtZip2").prop("disabled", true);
            else if (parseInt(zipCodeCnt) > 1) {
                $("#txtZip2").val("");
                $("#txtZip2").prop("disabled", false);
            }
        }
    }

    if (idName == 'lugMunicipality2') {

        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var rgnCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var rgnDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var cntDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var isgCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var isgDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();
        var isgCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 11 + ") span").text();
        var igDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();
        var zipCodeCnt = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 12 + ") span").text();
        //var zipCode  = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
        //var provCode = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(3)").text();
        //var provDesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(4)").text();
        //var rgnCode  = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(5)").text();
        //var rgnDesc  = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(6)").text();
        //var cntCode  = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(7)").text();
        //var cntDesc  = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(8)").text();
        //var isgCode  = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(9)").text();
        //var isgDesc  = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(10)").text();
        //var igCode   = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(11)").text();
        //var igDesc   = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(10)").text();
        //var zipCodeCnt = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(12)").text();

        //$('#idvallugStdBarangay').val('');
        //$('#descvallugStdBarangay').val('');

        $("#idvallugProvince2").val(provCode);
        $("#descvallugProvince2").val(provDesc);
        $("#idvallugRegion2").val(rgnCode);
        $("#descvallugRegion2").val(rgnDesc);
        $("#idvallugCountry2").val(cntCode);
        $("#descvallugCountry2").val(cntDesc);
        $("#txtZip2").val(zipCode);
        //$("#idvallugInternationalSubGroup").val(isgCode);
        //$("#descvallugInternationalSubGroup").val(isgDesc);
        //$("#idvallugInternationalGroup").val(igCode);
        //$("#descvallugInternationalGroup").val(igDesc);

        if ($("#idvallugStdBarangay2").val() == "") {
            if (parseInt(zipCodeCnt) == 1)
                $("#txtZip2").prop("disabled", true);
            else if (parseInt(zipCodeCnt) > 1) {
                $("#txtZip2").val("");
                $("#txtZip2").prop("disabled", false);
            }
        }
    }
}
function getGridData(idnum, index) {
    var data = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idnum + ")").find("td:eq(" + (index) + ")").text();
    return data;
}


function EnableFields() {

    $('#lugPartyType').enable(true);
    $('#lugDealerLoc').enable(true);
    $('#lugIndustry').enable(true);
    $('#lugIndustryScheme').enable(false);
    $('#lugEntityType').enable(true);
    $('#lugBusinessReg').enable(true);

    $('#nwGrid1Con').enable(true);
    $('#nwGrid2Con').enable(true);
   



    $('#rbVat').enable(true);
    $('#rbNonVat').enable(true);
    $('#rbNonVat').prop("checked", true);
    $('#txtRefCode').enable(true);
    $('#txtCheckPayeeName').enable(true);
    $('#txtVat').enable(false);
    $('#txtNonVat').enable(true);
    $('#lugPayeeSubType').removeClass("adisabled");
    $('#lugCurrency').removeClass("adisabled");
    $('#lugEWT').removeClass("adisabled");

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

    
    $('#cbFullAddress2').enable(true);
    $('#chkSamePresentAdd').enable(true);
    
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    //$("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);

    //$('#noah-webui-default-New').enable(false);
    //$('#noah-webui-default-Save').enable(true);
    //$('#noah-webui-default-Delete').enable(false);
    //$('#noah-webui-default-Delete').visible(false);
    //$('#noah-webui-default-Refresh').enable(true);
    //$('#noah-webui-default-Inquire').enable(false);
    //$('#noah-webui-default-Process').enable(false);
    //$('#noah-webui-default-Process').visible(true);
    //$('#noah-webui-default-Export').enable(false);

    $('#rdbLumpsum').enable(true);
    $('#rdbCheckIndividual').enable(true);

    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);
    $('#cbFullAddress').prop('checked', false);
    $('.fulladdress').hide();


    $('#txtFullAddress2').enable(false);
    $('#cbFullAddress2').enable(true);
    $('#txtUnitNo2').prop("disabled", false);
    $('#txtFloorNo2').prop("disabled", false);
    $('#txtBldgNo2').prop("disabled", false);
    $('#txtEstablishment2').prop("disabled", false);
    $('#txtBuilding2').prop("disabled", false);
    $('#txtLandmark2').prop("disabled", false);
    $('#txtStreetNo2').prop("disabled", false);
    $('#txtStreetName2').prop("disabled", false);
    $('#txtLot2').prop("disabled", false);
    $('#txtBlock2').prop("disabled", false);
    $('#txtPhase2').prop("disabled", false);
    $('#txtSubdivision2').prop("disabled", false);
    $('#txtZone2').prop("disabled", false);

    $('#lugArea2').enable(true);
    $('#lugStdBarangay2').enable(true);
    $('#lugMunicipality2').enable(true);

    //$('#lugStdBarangay2').addClass("adisabled");
    $('#txtAltBrgy2').prop("disabled", false);
    //$('#lugMunicipality2').addClass("adisabled");
    $('#lugProvince2').addClass("adisabled");
    $('#lugRegion2').addClass("adisabled");
    $('#txtZip2').prop("disabled", true);

    $('#rbVat').prop('checked', true);
    CheckTagBIRRegType();

    $('#lugPartyType').enable(true);
    $('#lugDealerLoc').enable(true);
    $('#lugIndustry').enable(true);
    $('#lugIndustryScheme').enable(false);
    $('#lugEntityType').enable(true);
    $('#lugBusinessReg').enable(true);
    //$('#btnSalespersonAssign').enable(true);
    //$('#btnReqCompliance').enable(true);
    $('#nwGrid1Con').enable(true);
    $('#cmbPrepMail').enable(true);
    $('#txtUnitNo').enable(true);
    $('#txtFloorNo').enable(true);
    $('#txtBldgNo').enable(true);
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
    $('#chkSamePresentAdd').enable(true);
    $('#nwGrid2Con').enable(true);
}

function DisableFields() {

    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);

    $('#btnReqCompliance').enable(false);
    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);
    $('#rbVat').prop("disabled", true);
    $('#rbNonVat').prop("disabled", true);
    $('#txtRefCode').prop("disabled", true);
    $('#txtVat').prop("disabled", true);
    $('#txtNonVat').prop("disabled", true);
    $('#lugEWT').addClass("adisabled");
    $('#txtCheckPayeeName').prop("disabled", true);
    $('#txtAltCheckPayeeName').prop("disabled", true);
    $('#chkLoadOwnersName').enable(false);
    $('#CurrencySelection').enable(false);
    $('#rdbLumpsum').enable(false);
    $('#rdbCheckIndividual').enable(false);
    $('#txtSuppliercode').prop("disabled", true);
    $('#lugPayeeSubType').addClass("adisabled");
    $('#txtCrossCode').prop("disabled", true);
    $('#lugCurrency').addClass("adisabled");
    $('#txtRegName').prop("disabled", true);
    $('#txtTradeName').prop("disabled", true);
    $('#txtWebsite').prop("disabled", true);
    $('#lugReferenceType').addClass("adisabled");
    $('#lugReference').addClass("adisabled");
    $('#txtVendorID').prop("disabled", true);
    $('#txtStatus').prop("disabled", true);
    $('#btnDisappRemarks').enable(false);
    $('#lugSalutation').addClass("adisabled");
    $('#txtLastName').prop("disabled", true);
    $('#lugNameSuffix').addClass("adisabled");
    $('#txtFirstName').prop("disabled", true);
    $('#txtMidInitial').prop("disabled", true);
    $('#txtNickName').prop("disabled", true);
    $('#txtDateBirth').prop("disabled", true);
    $('#txtAge').prop("disabled", true);
    $('#txtPlaceBirth').prop("disabled", true);
    $('#lugGender').addClass("adisabled");
    $('#lugCivilStatus').addClass("adisabled");
    $('#lugNationality').addClass("adisabled");
    $('#lugReligion').addClass("adisabled");
    //$('#txtLocationCode').prop("disabled", true);
    //$('#txtLocationCode2').prop("disabled", true);
    //$('#lugLocationType').addClass("adisabled");
    //$('#lugLocationType2').addClass("adisabled");

    $('#txtFullAddress').prop("disabled", true);
    $('#cbFullAddress').enable(false);

    $('#txtUnitNo').prop("disabled", true);
    $('#txtFloorNo').prop("disabled", true);
    $('#txtBldgNo').prop("disabled", true);
    $('#txtEstablishment').prop("disabled", true);
    $('#txtBuilding').prop("disabled", true);
    $('#txtLandmark').prop("disabled", true);
    $('#txtStreetNo').prop("disabled", true);
    $('#txtStreetName').prop("disabled", true);
    $('#txtLot').prop("disabled", true);
    $('#txtBlock').prop("disabled", true);
    $('#txtPhase').prop("disabled", true);
    $('#txtSubdivision').prop("disabled", true);
    $('#txtZone').prop("disabled", true);
    $('#lugArea').addClass("adisabled");
    $('#lugStdBarangay').addClass("adisabled");
    $('#txtAltBrgy').prop("disabled", true);
    $('#lugMunicipality').addClass("adisabled");
    $('#lugProvince').addClass("adisabled");
    $('#lugRegion').addClass("adisabled");
    $('#txtZip').prop("disabled", true);
    $('#txtPhone').prop("disabled", true);
    $('#txtLocal').prop("disabled", true);
    $('#txtMobile').prop("disabled", true);
    $('#txtEmailAdd').prop("disabled", true);
    $('#txtFax').prop("disabled", true);
    $('#lugBank').addClass("adisabled");
    $('#txtBankAccountNo').prop("disabled", true);
    $('#txtBankAddress').prop("disabled", true);
    
    $('.fulladdress').hide();

    //PERMANENT ADDRESS
    $('#txtFullAddress2').enable(false);
    $('#cbFullAddress2').enable(false);
    $('#txtUnitNo2').prop("disabled", true);
    $('#txtFloorNo2').prop("disabled", true);
    $('#txtBldgNo2').prop("disabled", true);
    $('#txtEstablishment2').prop("disabled", true);
    $('#txtBuilding2').prop("disabled", true);
    $('#txtLandmark2').prop("disabled", true);
    $('#txtStreetNo2').prop("disabled", true);
    $('#txtStreetName2').prop("disabled", true);
    $('#txtLot2').prop("disabled", true);
    $('#txtBlock2').prop("disabled", true);
    $('#txtPhase2').prop("disabled", true);
    $('#txtSubdivision2').prop("disabled", true);
    $('#txtZone2').prop("disabled", true);
    $('#lugArea2').addClass("adisabled");
    $('#lugStdBarangay2').addClass("adisabled");
    $('#txtAltBrgy2').prop("disabled", true);
    $('#lugMunicipality2').addClass("adisabled");
    $('#lugProvince2').addClass("adisabled");
    $('#lugRegion2').addClass("adisabled");
    $('#txtZip2').prop("disabled", true);

    //added by HRL
    $('#lugPartyType').enable(false);
    $('#lugDealerLoc').enable(false);
    $('#lugIndustry').enable(false);
    $('#lugIndustryScheme').enable(false);
    $('#lugEntityType').enable(false);
    $('#lugBusinessReg').enable(false);
    $('#btnSalespersonAssign').enable(false);
    $('#btnReqCompliance').enable(false);
    $('#nwGrid1Con').enable(false);
    $('#cmbPrepMail').enable(false);
    $('#txtUnitNo').enable(false);
    $('#txtFloorNo').enable(false);
    $('#txtBldgNo').enable(false);
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
    $('#chkSamePresentAdd').enable(false);
    $('#nwGrid2Con').enable(false);

    if (nwIsReport == 1) {
        $('#btnVendorLocation').enable(true);
        $('#btnVendorContact').enable(true);
        $('#btnDealerAssetAssign').enable(true);
        $('#btnSalespersonAssign').enable(true);
        $('#btnDealerBankAccountInfo').enable(true);
        $('#btnViewContacts').enable(true);
        $('#btnViewUpdateHistory').enable(true);
    }
    else {
        $('#btnVendorLocation').enable(false);
        $('#btnVendorContact').enable(false);
        $('#btnDealerAssetAssign').enable(false);
        $('#btnSalespersonAssign').enable(false);
        $('#btnDealerBankAccountInfo').enable(false);
        $('#btnViewContacts').enable(false);
        $('#btnViewUpdateHistory').enable(false);
    }

    




}

function DisabledFieldsUponRefresh() {
    $('#Individual').enable(false);
    $('#Corporate').enable(false);
    $('#WithoutTIN').enable(false);

    var isIndividual = $('#Individual').prop('checked');

    if (isIndividual) {
        $('#chkLoadOwnersName').prop("disabled", false);
        $('#txtRegisteredName').prop("disabled", true);
        //$('#txtTradeName').prop("disabled", false);
    }
    else {
        $('#txtLastName').prop("disabled", true);
        $('#txtFirstName').prop("disabled", true);
        $('#txtRegisteredName').prop("disabled", true);
        //$('#txtTradeName').prop("disabled", true);
        $('#chkLoadOwnersName').prop("disabled", true);
    }

    if (nwIsReport == 1) {
        $('#rdbLumpsum').enable(false);
        $('#rdbCheckIndividual').enable(false);
        $('#chkLoadOwnersName').enable(false);
        //$('#txtTradeName').prop("disabled", true);
    }
    else {
        if (!isIndividual)
            $('#chkLoadOwnersName').enable(false);
        else
            $('#chkLoadOwnersName').enable(true);
        $('#rdbLumpsum').enable(true);
        $('#rdbCheckIndividual').enable(true);
    }

    $('#txtMiddleName').prop("disabled", true);
    $('#lugPayeeSubType').addClass('adisabled');
    $('#txtcrosscode').prop("disabled", true);
    $('#lugcurrency').addClass('adisabled');
    $('#lugcountry').addClass('adisabled');

}

function EnableFieldsDone() {//Binding Done

    


    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);
    //$('#cbFullAddress').prop('checked', true);
    $('#txtRefCode').enable(true);
    $('#txtTradeName').enable(true);
    $('#txtCheckPayeeName').enable(true);

    $('#nwGrid2Con').enable(true);
    $('#chkSamePresentAdd').enable(true);
    $('#cmbPrepMail').enable(true);
    
    $('#rbVat').enable(false);
    $('#rbNonVat').enable(false);
    $('#txtVat').enable(false);
    $('#txtNonVat').enable(false);
    $('#rdbLumpsum').enable(true);
    $('#rdbCheckIndividual').enable(true);
    $('#txtSuppliercode').prop("disabled", true);
    $('#lugPayeeSubType').addClass("adisabled");
    $('#lugCurrency').addClass("adisabled");
    $('#btnDisappRemarks').enable(true);

    $('#lugPartyType').enable(true);
    $('#lugDealerLoc').enable(true);
    $('#lugIndustry').enable(true);
    $('#lugIndustryScheme').enable(false);
    $('#lugEntityType').enable(true);
    $('#lugBusinessReg').enable(true);
    $('#lugEWT').enable(true);

    $('#nwGrid1Con').enable(true);

    

    if (nwIsReport == 1) {
        DisableFields();
    }
    else {
        isTicked();
    }

    //$('#btnVendorLocation').enable(true);
    //$('#btnVendorContact').enable(true);
    $('#btnViewUpdateHistory').enable(true);

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
    }
    else {
        $('#noah-webui-default-Process').enable(true);
    }
    //if ($('#txtStatus').val() == 'Cancelled') {
    //    $('#noah-webui-default-Process').enable(false);
    //    $('#noah-webui-default-Save').enable(false);
    //    $('#noah-webui-default-Delete').enable(false);
    //}
    //else {
    //}

    $('#noah-webui-default-Export').enable(true);
    //$fn().xOnKeyUpEvents.xFullAddressValue();

    $('#txtRegName').prop("disabled", false);
    $('#txtTradeName').prop("disabled", false);
    $('#txtCheckPayeeName').prop("disabled", false);
    //processed();
    
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
        $("#noah-webui-Toolbox").bindingInquire().enable(false);
    }
}

function DisableFieldsEmpty() {

    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);

    DisableFields();
}

function ClearFields() {
    $('#chkBox').prop('checked', true);
    $('#txtSuppliercode').val('');

    
    $('#idvallugPartyType').val('');
    $('#descvallugPartyType').val('');

    $('#idvallugDealerLoc').val('');
    $('#descvallugDealerLoc').val('');
    $('#idvallugIndustry').val('');
    $('#descvallugIndustry').val('');
    $('#idvallugIndustryScheme').val('');
    $('#descvallugIndustryScheme').val('');
    $('#idvallugEntityType').val('');
    $('#descvallugEntityType').val('');
    $('#idvallugBusinessReg').val('');
    $('#descvallugBusinessReg').val('');
    $('#rbVat').prop("disabled", true);
    $('#rbNonVat').prop("disabled", true);

    $('#idvallugPayeeSubType').val('');
    $('#descvallugPayeeSubType').val('');
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
    //$('#txtLocationCode').val('');
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
    $('#txtRefCode').val('');
    $('#txtVat').val('');
    $('#txtNonVat').val('');
    $('#idvallugEWT').val('');
    $('#descvallugEWT').val('');
    //$('#idvallugLocationType').val('');
    //$('#descvallugLocationType').val('');

    //added by HRL
    $('#idvallugPartyType').val('');
    $('#descvallugPartyType').val('');

    $('#chkSamePresentAdd').prop('checked', false);

    //$('#txtLocationCode2').val('');
    //$('#idvallugLocationType2').val('');
    //$('#descvallugLocationType2').val('');
    $('#txtFullAddress2').val('');
    $('#txtUnitNo2').val('');
    $('#txtFloorNo2').val('');
    $('#txtBldgNo2').val('');
    $('#txtBuilding2').val('');
    $('#txtLandmark2').val('');
    $('#txtStreetNo2').val('');
    $('#txtStreetName2').val('');
    $('#txtLot2').val('');
    $('#txtBlock2').val('');
    $('#txtPhase2').val('');
    $('#txtSubdivision2').val('');
    $('#txtZone2').val('');
    $('#idvallugArea2').val('');
    $('#descvallugArea2').val('');

    $('#idvallugStdBarangay2').val('');
    $('#descvallugStdBarangay2').val('');
    $('#txtAltBrgy2').val('');
    $('#idvallugMunicipality2').val('');
    $('#descvallugMunicipality2').val('');
    $('#idvallugProvince2').val('');
    $('#descvallugProvince2').val('');
    $('#idvallugRegion2').val('');
    $('#descvallugRegion2').val('');
    $('#idvallugCountry2').val('');
    $('#descvallugCountry2').val('');
    $('#txtZip2').val('');

}

function isTicked() {
    if (nwIsReport == "") {
            $('#txtCrossCode').prop("disabled", false);
            $('#txtRegName').prop("disabled", false);
            $('#txtTradeName').prop("disabled", false);
            $('#txtAltCheckPayeeName').prop("disabled", true);
            $('#txtWebsite').prop("disabled", false);
            $('#lugReferenceType').removeClass("adisabled");
            $('#lugReference').removeClass("adisabled");
            $('#txtVendorID').prop("disabled", true);
            $('#txtStatus').prop("disabled", true);
            //$('#txtCheckPayeeName').prop("disabled", true);
            $('#chkLoadOwnersName').enable(true);
            $('#CurrencySelection').enable(true);

            //$("#txtTradeName").keyup(function () {
            //        $('#txtCheckPayeeName').val($('#txtTradeName').val());
            //});

            $('#lugSalutation').removeClass("adisabled");
            $('#txtLastName').prop("disabled", false);
            $('#lugNameSuffix').removeClass("adisabled");
            $('#txtFirstName').prop("disabled", false);
            $('#txtMidInitial').prop("disabled", false);
            $('#txtNickName').prop("disabled", false);
            $('#txtDateBirth').prop("disabled", false);
            $('#txtAge').prop("disabled", true);
            $('#txtPlaceBirth').prop("disabled", false);
            $('#lugGender').removeClass("adisabled");
            $('#lugCivilStatus').removeClass("adisabled");
            $('#lugNationality').removeClass("adisabled");
            $('#lugReligion').removeClass("adisabled");

            if ($('#chkSamePresentAdd').prop('checked') == true) {
                //$('#txtLocationCode2').prop("disabled", true);
                //$('#lugLocationType2').addClass("adisabled");
                $('#cbFullAddress2').enable(false);
                $('#txtFullAddress2').enable(false);
                $('#txtUnitNo2').prop("disabled", true);
                $('#txtFloorNo2').prop("disabled", true);
                $('#txtBldgNo2').prop("disabled", true);
                $('#txtBuilding2').prop("disabled", true);
                $('#txtLandmark2').prop("disabled", true);
                $('#txtStreetNo2').prop("disabled", true);
                $('#txtStreetName2').prop("disabled", true);
                $('#txtLot2').prop("disabled", true);
                $('#txtBlock2').prop("disabled", true);
                $('#txtPhase2').prop("disabled", true);
                $('#txtSubdivision2').prop("disabled", true);
                $('#txtZone2').prop("disabled", true);
                $('#lugArea2').addClass("adisabled");
                $('#lugStdBarangay2').addClass("adisabled");
                $('#txtAltBrgy2').prop("disabled", true);
                $('#lugMunicipality2').addClass("adisabled");
                $('#lugProvince2').addClass("adisabled");
                $('#lugCountry2').addClass("adisabled");
                $('#lugRegion2').addClass("adisabled");
                $('#txtZip2').enable(false);
               
            }
            else {
                //$('#txtLocationCode2').prop("disabled", true);
                //$('#lugLocationType2').addClass("adisabled");
                $('#cbFullAddress2').enable(true);
                $('#txtFullAddress2').enable(true);
                $('#txtUnitNo2').prop("disabled", false);
                $('#txtFloorNo2').prop("disabled", false);
                $('#txtBldgNo2').prop("disabled", false);
                $('#txtBuilding2').prop("disabled", false);
                $('#txtLandmark2').prop("disabled", false);
                $('#txtStreetNo2').prop("disabled", false);
                $('#txtStreetName2').prop("disabled", false);
                $('#txtLot2').prop("disabled", false);
                $('#txtBlock2').prop("disabled", false);
                $('#txtPhase2').prop("disabled", false);
                $('#txtSubdivision2').prop("disabled", false);
                $('#txtZone2').prop("disabled", false);
                $('#lugArea2').removeClass("adisabled");
                $('#lugStdBarangay2').removeClass("adisabled");
                $('#txtAltBrgy2').prop("disabled", false);
                $('#lugMunicipality2').removeClass("adisabled");
                //$('#lugProvince2').removeClass("adisabled");
                //$('#lugCountry2').removeClass("adisabled");
                //$('#lugRegion2').removeClass("adisabled");
                $('#txtZip2').enable(false);
                $fn().xOnClickEvents.xCheckBoxFullAddressTrigger2();
                //$fn().xOnKeyUpEvents.xFullAddressValue2();
            }

            //$('#txtLocationCode').prop("disabled", true);
            //$('#lugLocationType').addClass("adisabled");
            $('#txtUnitNo').prop("disabled", false);
            $('#txtFloorNo').prop("disabled", false);
            $('#txtBldgNo').prop("disabled", false);
            $('#txtEstablishment').prop("disabled", false);
            $('#txtBuilding').prop("disabled", false);
            $('#txtLandmark').prop("disabled", false);
            $('#txtStreetNo').prop("disabled", false);
            $('#txtStreetName').prop("disabled", false);
            $('#txtLot').prop("disabled", false);
            $('#txtBlock').prop("disabled", false);
            $('#txtPhase').prop("disabled", false);
            $('#txtSubdivision').prop("disabled", false);
            $('#txtZone').prop("disabled", false);
            $('#lugArea').removeClass("adisabled");
            $('#lugStdBarangay').removeClass("adisabled");
            $('#txtAltBrgy').prop("disabled", false);
            $('#lugMunicipality').removeClass("adisabled");
            $('#lugProvince').addClass("adisabled");
            $('#lugCountry').addClass("adisabled");
            $('#lugInternationalSubGroup').addClass("adisabled");
            $('#lugInternationalGroup').addClass("adisabled");
            $('#lugRegion').addClass("adisabled");
            enablezipCode();
            $('#txtPhone').prop("disabled", false);
            $('#txtLocal').prop("disabled", false);
            $('#txtMobile').prop("disabled", false);
            $('#txtEmailAdd').prop("disabled", false);
            $('#txtFax').prop("disabled", false);
            $('#lugBank').removeClass("adisabled");
            $('#txtBankAccountNo').prop("disabled", false);
            $('#txtBankAddress').prop("disabled", false);
            $('.lastName').show();
            $('.firstName').show();
            $('.astPhoneNo').show();
            $('.astMobileNo').show();
            $('.regName').hide();
        

    }
    else {
        DisableFields();
    }
    $fn().xOnClickEvents.xRadioButtonTaxRegTrigger();
}

function asterisk() {
    $fn().xOnClickEvents.xRadioButtonTaxRegTrigger();
}

function getHOfficeCode() {
    var Supcode = $('#txtSuppliercode').val();
    return Supcode;
}





$(document).on("click", "#btnVendorTaxInfo", function (e) {
    var id = $('#txtSuppliercode').val();
    nwParameter_Add("supcode", id);

    if (id.length > 0) {
        var title = "Vendor Taxes Information";
        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" || $('#txtStatus').val() == "Loaded and Approved" ? true : false;
        var fullength = GetCurrentURL() + "../APSupplierTaxesInformation?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "80%" });
        $("#nwPopWindow").css({ "min-height": "90%" });
        $("#nwPopWindow").css({ "height": "90%" });
        nwPopupForm_ShowModal("nwPopWindow");
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
    nwParameter_Add("supcode", id);

    if (id.length > 0) {
        //insert here
        var title = "Vendor System Permit";
        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;
        var fullength = GetCurrentURL() + "../APSupplierBIRCASPermit?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwPopWindow", true, fullength);

        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "95%" });
        $("#nwPopWindow").css({ "min-height": "95%" });
        $("#nwPopWindow").css({ "height": "95%" });
        nwPopupForm_ShowModal("nwPopWindow");

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

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "95%" });
        $("#nwPopWindow").css({ "min-height": "95%" });
        $("#nwPopWindow").css({ "height": "95%" });
        nwPopupForm_ShowModal("nwPopWindow");

    }
    return false;
});

//Start of Requirements Compliance
$(document).on("click", "#btnReqCompliance", function (e) {
    var id = 'DLRINF';
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

        var fullength = GetCurrentURL() + "../APSupplierContacts?nwParam=1&nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "95%" });
        $("#nwPopWindow").css({ "min-height": "95%" });
        $("#nwPopWindow").css({ "height": "95%" });
        nwPopupForm_ShowModal("nwPopWindow");

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
        var fullength = GetCurrentURL() + "../APSupplierChildUnitAccounting?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "70%" });
        $("#nwPopWindow").css({ "min-height": "95%" });
        $("#nwPopWindow").css({ "height": "95%" });
        nwPopupForm_ShowModal("nwPopWindow");

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

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "80%" });
        $("#nwPopWindow").css({ "min-height": "90%" });
        $("#nwPopWindow").css({ "height": "90%" });
        nwPopupForm_ShowModal("nwPopWindow");

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

        nwPopupForm_Create("nwPopWindow", true, fullength);

        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "70%" });
        $("#nwPopWindow").css({ "min-height": "95%" });
        $("#nwPopWindow").css({ "height": "95%" });
        nwPopupForm_ShowModal("nwPopWindow");

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

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "70%" });
        $("#nwPopWindow").css({ "min-height": "95%" });
        $("#nwPopWindow").css({ "height": "95%" });
        nwPopupForm_ShowModal("nwPopWindow");

    }
    return false;
});

$(document).on("click", "#btnDisappRemarks", function (e) {
    nwPopupForm_ShowModal("nwDisappDtls");
    return false;
});

$(document).on("click", "#btnViewUpdateHistory", function (e) {
    nwLoading_Start("xLoadViewUpdateHistory", crLoadingHTML);

    nwPopupForm_ShowModal('nwUploadHistory');
    nwParameter_Add("txtSuppliercode", $("#txtSuppliercode").val());
    func_ActionDriven("actViewUpdateHistory", false);

    return false;
});

$(document).on("click", "#btnUpdateHistoryExport", function (e) {
    nwLoading_Start("xExportViewUpdateHistory", crLoadingHTML);
    nwParameter_Add("txtSuppliercode", $("#txtSuppliercode").val());
    func_ActionDriven("actExportUpdateHistory", false);

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


function func_LookUpInitialize(xID) {

}


$(document).on('keyup', '#txtAltBrgy', function (e) {
    var stdBrgy = $("#idvallugStdBarangay").val()
    var altBrgy = $('#txtAltBrgy').val();

    if (stdBrgy != "" && altBrgy == "") {
        $('#txtZip').prop("disabled", true);
    } else if (stdBrgy == "" && altBrgy != "") {
        $('#txtZip').val("");
        $('#txtZip').prop("disabled", false);
    } else if (stdBrgy != "" && altBrgy != "") {
        $('#txtZip').prop("disabled", true);
    } else if (stdBrgy == "" && altBrgy == "") {
        $('#txtZip').val("");
        $('#txtZip').prop("disabled", true);
    }

    //if (altBrgy != "")
    //    $("#lugStdBarangay input").va("");
    //$("#lugStdBarangay input").va
});


$(document).on('change', '#idvallugStdBarangay', function (e) {

    var stdBrgy = $("#idvallugStdBarangay").val()
    var altBrgy = $('#txtAltBrgy').val();

    if (stdBrgy != "" && altBrgy == "") {
        $('#txtZip').val("");
        $('#txtZip').prop("disabled", true);
    } else if (stdBrgy == "" && altBrgy != "") {
        $('#txtZip').prop("disabled", false);
        $('#txtZip').val("");
    } else if (stdBrgy != "" && altBrgy != "") {
        $('#txtZip').val("");
        $('#txtZip').prop("disabled", true);
    } else if (stdBrgy == "" && altBrgy == "") {
        $('#txtZip').val("");
        $('#txtZip').prop("disabled", true);
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

$(document).on('keyup', '#txtAltBrgy2', function (e) {
    var stdBrgy = $("#idvallugStdBarangay").val()
    var altBrgy = $('#txtAltBrgy').val();

    if (stdBrgy != "" && altBrgy == "") {
        $('#txtZip2').prop("disabled", true);
    } else if (stdBrgy == "" && altBrgy != "") {
        $('#txtZip2').val("");
        $('#txtZip2').prop("disabled", false);
    } else if (stdBrgy != "" && altBrgy != "") {
        $('#txtZip2').prop("disabled", true);
    } else if (stdBrgy == "" && altBrgy == "") {
        $('#txtZip2').val("");
        $('#txtZip2').prop("disabled", true);
    }

    //if (altBrgy != "")
    //    $("#lugStdBarangay input").va("");
    //$("#lugStdBarangay input").va
});


$(document).on('change', '#idvallugStdBarangay2', function (e) {

    var stdBrgy = $("#idvallugStdBarangay").val()
    var altBrgy = $('#txtAltBrgy').val();

    if (stdBrgy != "" && altBrgy == "") {
        $('#txtZip2').val("");
        $('#txtZip2').prop("disabled", true);
    } else if (stdBrgy == "" && altBrgy != "") {
        $('#txtZip2').prop("disabled", false);
        $('#txtZip2').val("");
    } else if (stdBrgy != "" && altBrgy != "") {
        $('#txtZip2').val("");
        $('#txtZip2').prop("disabled", true);
    } else if (stdBrgy == "" && altBrgy == "") {
        $('#txtZip2').val("");
        $('#txtZip2').prop("disabled", true);
    }
});

$(document).on('paste', '#txtZip2', function () {
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

$(document).on('drop', '#txtZip2', function () {
    return false;
});

$(document).on('dragstart', '#txtZip2', function () {
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

//$(document).on("keyup", "#idvallugMunicipality", function () {

//    if ($("#idvallugMunicipality").val() == "") {
//        $("#descvallugMunicipality").val('')
//        $("#idvallugStdBarangay").val('');
//        $("#descvallugStdBarangay").val('');
//        $("#idvallugProvince").val('');
//        $("#descvallugProvince").val('');
//        $("#idvallugRegion").val('');
//        $("#descvallugRegion").val('');
//        $("#idvallugCountry").val('');
//        $("#descvallugCountry").val('');
//        $("#idvallugInternationalSubGroup").val('');
//        $("#descvallugInternationalSubGroup").val('');
//        $("#idvallugInternationalGroup").val('');
//        $("#descvallugInternationalGroup").val('');
//        $('#txtZip').val('');
//    }
//});

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

//$(document).on("focusout", "#idvallugMunicipality", function () {

//    if ($("#idvallugMunicipality").val() == "") {
//        $("#descvallugMunicipality").val('')
//        $("#idvallugStdBarangay").val('');
//        $("#descvallugStdBarangay").val('');
//        $("#idvallugProvince").val('');
//        $("#descvallugProvince").val('');
//        $("#idvallugRegion").val('');
//        $("#descvallugRegion").val('');
//        $("#idvallugCountry").val('');
//        $("#descvallugCountry").val('');
//        $("#idvallugInternationalSubGroup").val('');
//        $("#descvallugInternationalSubGroup").val('');
//        $("#idvallugInternationalGroup").val('');
//        $("#descvallugInternationalGroup").val('');
//        $('#txtZip').val('');
//    }
//});


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
        $('#txtZip').prop("disabled", true);
    } else if (alternateBarangay != "" && standardBarangay == "") {
        $('#txtZip').prop("disabled", false);
    } else if (alternateBarangay == "" && standardBarangay != "") {
        $('#txtZip').prop("disabled", true);
    } else if (alternateBarangay == "" && standardBarangay == "") {
        $('#txtZip').prop("disabled", true);
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

function window_close(verID) {
    //if (verID == "nwPopWindow") {
    //    //nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
    //    //nwParameter_Add("VendorId", $('#txtVendorID').val());
    //    //func_ActionDriven("actLoadButtons", false);


    //    if ($('#nwPopWindow .BoxTitle').text() == "Requirements Compliance") {
    if (verID == "nwPopUpRequireCompliance") {
            cust_GetPara();
            nwLoading_Start("actHasRqrdCompli", crLoadingHTML);
            func_ActionDriven('actHasRqrdCompli', false);
        }

    //    if ($('#nwPopWindow .BoxTitle').text() == "Salesperson Assignment") {
    //        cust_GetPara();
    //        nwLoading_Start("actHasSalesPerson", crLoadingHTML);
    //        func_ActionDriven('actHasSalesPerson', false);
    //    }
        
        
    //}
    else if (verID == "nwPopWindowSPSASS") {
        cust_GetPara();
        nwLoading_Start("actHasSalesPerson", crLoadingHTML);
        func_ActionDriven("actHasSalesPerson", false);
    }
    nwPopupForm_HideModal(verID);
}

function validateTax() {
    if ($("#btnVendorTaxInfo").hasClass("noah-webui-disabled") == false) {
        return true;
    }
    else {
        return false;
    }
}

$(document).on("click", "#btnHistory", function (e) {
    if ($('#chkBox').prop('checked')) {
        nwParameter_Add("code", $('#txtSuppliercode').val());
    }
    else {
        nwParameter_Add("code", '%');
    }
    func_ActionDriven("LoadHistorical");
    return false;
});

$(document).on("change focusout", "#txtNickName", function () {
    $fn().xFormatNickName();
});

$(document).on("change focusout", "#txtPlaceBirth", function () {
    $fn().xFormatBirthPlace();
});

$(document).on("keyup", "#txtUnitNo", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#txtFloorNo", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#txtBldgNo", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#txtEstablishment", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#txtBuilding", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#txtLandmark", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#txtStreetNo", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#txtStreetName", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#txtLot", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#txtBlock", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#txtPhase", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#txtSubdivision", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#txtZone", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#idvallugArea", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#idvallugStdBarangay", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#txtAltBrgy", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("keyup", "#idvallugMunicipality", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("click", "#cbFullAddress", function () {
    $fn().xOnClickEvents.xCheckBoxFullAddressTrigger();
    $fn().xOnKeyUpEvents.xFullAddressValue();
});

$(document).on("click", "#cbFullAddress2", function () {
    $fn().xOnClickEvents.xCheckBoxFullAddressTrigger2();
    $fn().xOnKeyUpEvents.xFullAddressValue2();

});

//PERMANENT ADD
$(document).on("keyup", "#txtUnitNo2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#txtFloorNo2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#txtBldgNo2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#txtEstablishment2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#txtBuilding2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#txtLandmark2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#txtStreetNo2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#txtStreetName2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#txtLot2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#txtBlock2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#txtPhase2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#txtSubdivision2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#txtZone2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#idvallugArea2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#idvallugStdBarangay2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#txtAltBrgy2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});

$(document).on("keyup", "#idvallugMunicipality2", function () {
    $fn().xOnKeyUpEvents.xFullAddressValue2();
});


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
    parent_MessageBoxQuestion("Registered Name already exists.\nDo you want to proceed?", menuTitle, "Question");
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
        $("#noah-webui-default-Export").show();
        $("#noah-webui-Toolbox-BindingNavigator").show();
        $("#noah-webui-Toolbox-BindingNavigator").enable(true);
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

$(document).on("change", "#rbVat", function (e) {
    CheckTagBIRRegType();
});

$(document).on("change", "#rbNonVat", function (e) {
    CheckTagBIRRegType();
});

function CheckTagBIRRegType() {
    var vat = $("#rbVat").prop("checked"),
        nonvat = $("#rbNonVat").prop("checked");

    if (vat == true && isNewRow) {
        $("#txtVat").enable(true);
        $("#txtNonVat").enable(false);
        $("#txtNonVat").val("");
    }
    else { (nonvat == true && isNewRow) 
        $("#txtNonVat").enable(true);
        $("#txtVat").enable(false);
        $("#txtVat").val("");
    }
    //else {
    //    $("#rbVat").enable(false);
    //    $("#rbNonVat").enable(false);
    //    $("#txtVat").val("");
    //    $("#txtNonVat").val("");
    //}
}



//$(document).on('click', '#btnCollapseAll', function () {
//    if ($("#btnCollapseAll").text() == 'Expand All') {
//        $("#btnCollapseAll").text("Collapse All");
//        $('#tab-main-one,#tab-main-two, #tab-main-three').prop('checked', true);
//        //window.location.href = window.location.href.replace(window.location.hash, "") + "#contentCollapse";
//    }
//    else {
//        $("#btnCollapseAll").text("Expand All");
//        $('#tab-main-one,#tab-main-two, #tab-main-three').prop('checked', false);
//    }
//});


//$(document).on('click', '#btnCollapseAll', function (e) {
//    if ($("#btnCollapseAll").text() == "Collapse All") {
//        $("#btnCollapseAll").text("Expand All");
//        $('#tab-main-one,#tab-main-two, #tab-main-three').prop('checked', false);
//        //window.location.href = window.location.href.replace(window.location.hash, "") + "#contentCollapse";
//    }
//    else {
        
//        $('#tab-main-one,#tab-main-two, #tab-main-three').prop('checked', true);
//        $("#btnCollapseAll").text("Collapse All");
//    }

//});

//function toggleButtonText() {
//    var button = document.getElementById("btnCollapseAll");

//    if (button.textContent === "Collapse All") {
//        button.textContent = "Expand All";
//        $('#tab-main-one,#tab-main-two, #tab-main-three').prop('checked', false);
//    } else {
//        button.textContent = "Collapse All";
//        $('#tab-main-one,#tab-main-two, #tab-main-three').prop('checked', true);
//    }
//}

$(document).on("change", 'input[name="tabs"]', function () {
    if ($('input[id="tab-one"]').is(':checked') ||
        $('input[id="tab-two"]').is(':checked') ||
        $('input[id="tab-three"]').is(':checked')
        //$('input[id="tab-four"]').is(':checked')
        //$('input[id="tab-five"]').is(':checked')
        ) {
        isOpen = true;
    }
    else {
        isOpen = false;
    }

    $('#btnCollapseAll').html(isOpen ? "Collapse All" : "Expand All");
});


$(document).on('click', '#btnCollapseAll', function () {
    if (_isOpen) {
        $('#accordion_main .nk-li').removeClass("collapse");
    }
    else {
        $('#accordion_main .nk-li').addClass("collapse");
    }

    CheckOpenAll();
    return false;
});

function CollapseAll(isCollapsed) {
    if (isCollapsed) {
        $('#accordion_main .nk-li').removeClass("collapse");
    }
    else {
        $('#accordion_main .nk-li').addClass("collapse");
    }
}

function CheckOpenAll() {
    var isOpen = 0;
    var isClose = 0;
    $('#accordion_main .nk-li').each(function () {
        var val = $(this).hasClass("collapse");
        if (val) {
            isOpen += 1;
        } else {
            isClose += 1;
        }
    });
    var ExpandAll = false;
    if (isOpen == 0) {
        ExpandAll = false;
    }

    if (isClose == 0) {
        ExpandAll = true;
    }

    if (isOpen == 0 || isClose == 0) {
        $('#btnCollapseAll').text(ExpandAll ? "Collapse All" : "Expand All");
        _isOpen = ExpandAll ? true : false;
    }

}

function CollapseAll(isCollapsed) {
    $('#tab-one,#tab-two,#tab-three').prop('checked', isCollapsed);
}

function p8Spread_DblClick(canvasID, row, col) {

    cust_GetPara();
    p8Spread_CurBook = canvasID
    if (canvasID == "nwGrid1Con") {
        if (col == SPR_COMMSTYPE -1) {
            lookUpCustomize("lugCommsType", 1,"",true);
        }
    }

    if (canvasID == "nwGrid2Con") {
        var currBank = nwGrid2Con_Book.ActiveSheet.GetValue(SPR_BANK - 1, col);
        var currtypeofpay = nwGrid2Con_Book.ActiveSheet.GetValue(SPR_TYPEOFPAYMENTCODE - 1, col);
        //var currBank = crnwTR.find("td:eq(" + SPR_BANK + ")").text();
        //var currtypeofpay = crnwTR.find("td:eq(" + SPR_TYPEOFPAYMENTCODE + ")").text();
        nwParameter_Add("currBank", currBank);
        nwParameter_Add("currtypeofpay", currtypeofpay);

        if (col == SPR_BANK -1) {
            lookUpCustomize("lugBank", 1, "", true);
        }

        if (col == SPR_TYPEOFACCTDESC - 1) {
            lookUpCustomize("lugTypeofacct", 1,"", true);
        }

        if (col == SPR_TYPEOFPAYMENT -1) {
            lookUpCustomize("lugTypeofpay", 1,"",true);
        }

    }
    return true;
}

//function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {

//    //var seller = $('#idvallugPaymentMethod').val();
//    //var effdate = $('#txtEffectiveDate').val();
//    cust_GetPara();
//    var nwobjID = nwobj.attr('id');
//    if (nwobjID == "nwGrid1") {
//        if (crnwTD.index() == SPR_COMMSTYPE) {
//            //if (seller == "" || effdate == "") { MessageBox("Please Complete Header Details First.", pageTitle) } else {
//            lookUpCustomize("lugCommsType", 1);
//            //nwGrid_AddRow('nwGrid1Con', 1);
//            //}
//        }
//    }

//    if (nwobjID == "nwGrid2") {
//        var currBank = crnwTR.find("td:eq(" + SPR_BANK + ")").text();
//        var currtypeofpay = crnwTR.find("td:eq(" + SPR_TYPEOFPAYMENTCODE + ")").text();
//        nwParameter_Add("currBank", currBank);
//        nwParameter_Add("currtypeofpay", currtypeofpay);
        
//        if (crnwTD.index() == SPR_BANK) {
//            //if (seller == "" || effdate == "") { MessageBox("Please Complete Header Details First.", pageTitle) } else {
//            lookUpCustomize("lugBank", 1);
//            //nwGrid_AddRow('nwGrid1Con', 1);
//            //}
//        }
//        if (crnwTD.index() == SPR_TYPEOFPAYMENT) {
//            //if (seller == "" || effdate == "") { MessageBox("Please Complete Header Details First.", pageTitle) } else {
//            lookUpCustomize("lugTypeofpay", 1);
//            //nwGrid_AddRow('nwGrid1Con', 1);
//            //}
//        }
//    }

    

//}



$(document).on("click", "#chkSamePresentAdd", function (e) {
    //PERMANENT ADDRESS
    isChk();
});


function isChk() {
    if ($('#chkSamePresentAdd').is(":checked")) {
        $('#txtFullAddress2').enable(false);
        $('#cbFullAddress2').enable(false);
        $('#txtUnitNo2').prop("disabled", true);
        $('#txtFloorNo2').prop("disabled", true);
        $('#txtBldgNo2').prop("disabled", true);
        $('#txtEstablishment2').prop("disabled", true);
        $('#txtBuilding2').prop("disabled", true);
        $('#txtLandmark2').prop("disabled", true);
        $('#txtStreetNo2').prop("disabled", true);
        $('#txtStreetName2').prop("disabled", true);
        $('#txtLot2').prop("disabled", true);
        $('#txtBlock2').prop("disabled", true);
        $('#txtPhase2').prop("disabled", true);
        $('#txtSubdivision2').prop("disabled", true);
        $('#txtZone2').prop("disabled", true);
        $('#lugArea2').addClass("adisabled");
        $('#lugStdBarangay2').addClass("adisabled");
        $('#txtAltBrgy2').prop("disabled", true);
        $('#lugMunicipality2').addClass("adisabled");
        $('#lugProvince2').addClass("adisabled");
        $('#lugRegion2').addClass("adisabled");
        $('#lugCountry2').addClass("adisabled");
        $('#txtZip2').prop("disabled", true);

        $('#cbFullAddress2').prop("checked", false);
        $('#txtFullAddress2').val('');
        
        $('#txtUnitNo2').val('');
        $('#txtFloorNo2').val('');
        $('#txtBldgNo2').val('');
        //$('#txtEstablishment2').prop("disabled", true);
        $('#txtBuilding2').val('');
        $('#txtLandmark2').val('');
        $('#txtStreetNo2').val('');
        $('#txtStreetName2').val('');
        $('#txtLot2').val('');
        $('#txtBlock2').val('');
        $('#txtPhase2').val('');
        $('#txtSubdivision2').val('');
        $('#txtZone2').val('');
        $('#idvallugArea2,#descvallugArea2').val('');
        $('#idvallugStdBarangay2,#descvallugStdBarangay2').val('');
        $('#txtAltBrgy2').val('');
        $('#idvallugMunicipality2,#descvallugMunicipality2').val('');
        $('#idvallugProvince2,#descvallugProvince2').val('');
        $('#idvallugRegion2,#descvallugRegion2').val('');
        $('#idvallugCountry2,#descvallugCountry2').val('');
        $('#txtZip2').val('');

    } else {
        $('#txtFullAddress2').enable(false);
        $('#cbFullAddress2').enable(true);
        $('#txtUnitNo2').prop("disabled", false);
        $('#txtFloorNo2').prop("disabled", false);
        $('#txtBldgNo2').prop("disabled", false);
        $('#txtEstablishment2').prop("disabled", false);
        $('#txtBuilding2').prop("disabled", false);
        $('#txtLandmark2').prop("disabled", false);
        $('#txtStreetNo2').prop("disabled", false);
        $('#txtStreetName2').prop("disabled", false);
        $('#txtLot2').prop("disabled", false);
        $('#txtBlock2').prop("disabled", false);
        $('#txtPhase2').prop("disabled", false);
        $('#txtSubdivision2').prop("disabled", false);
        $('#txtZone2').prop("disabled", false);
        $('#lugArea2').addClass("adisabled");
        $('#lugStdBarangay2').addClass("adisabled");
        $('#txtAltBrgy2').prop("disabled", false);
        $('#lugMunicipality2').addClass("adisabled");
        $('#lugProvince2').addClass("adisabled");
        $('#lugRegion2').addClass("adisabled");
        $('#txtZip2').prop("disabled", true);
        $('#lugArea2').enable(true);
        $('#lugStdBarangay2').enable(true);
        $('#lugMunicipality2').enable(true);
    }
}

function p8Spread_Click(canvasID, row, col) {

    if (canvasID == "nwGrid1Con") {
        if (col == SPR_MOBILE - 1) {
            nwGrid1Con_Book.ActiveSheet.SetMaxLength(SPR_MOBILE - 1, 0, "12")
        }
        if (col == SPR_PHONEBUSI - 1) {
            nwGrid1Con_Book.ActiveSheet.SetMaxLength(SPR_PHONEBUSI - 1, 0, "15")
        }

    }

    if (canvasID == "nwGrid2Con") {
        if (col == SPR_ACCTNO - 1) {
            nwGrid1Con_Book.ActiveSheet.SetMaxLength(SPR_ACCTNO - 1, 0, "30")
        }
    }

    return true;
}

function p8Spread_Change(canvasID, row, col) {
    if (canvasID == "nwGrid2Con") {


        if (col == SPR_BRANCHCODE - 1) {
            var s1 = nwGrid2Con_Book.ActiveSheet.GetValue(SPR_BRANCHCODE - 1, row);//$(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_BRANCHCODE + `) input`).val();
            var s2 = nwGrid2Con_Book.ActiveSheet.GetValue(SPR_ACCTNO - 1, row)//$(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_ACCTNO + `) input`).val();
            var fullacctno = s1 + s2;

            nwGrid2Con_Book.ActiveSheet.SetValue(SPR_FULLACCTNO - 1, row, (fullacctno))
            //$(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_FULLACCTNO + `)`).text(fullacctno);
        }
        else if (col == SPR_ACCTNO - 1) {
            var s1 = nwGrid2Con_Book.ActiveSheet.GetValue(SPR_BRANCHCODE - 1, row);
            var s2 = nwGrid2Con_Book.ActiveSheet.GetValue(SPR_ACCTNO - 1, row)
            var fullacctno = s1 + s2;

            nwGrid2Con_Book.ActiveSheet.SetValue(SPR_FULLACCTNO - 1, row, (fullacctno))
        }
    }
    return true;
}

function nwGrid_Change(nwobj, nwobjrow, nwobjitem) {
    var nwobjID = nwobj.attr("id");
    var nwobjTR = crnwTR.index();
    var nwobjTD = crnwTD.index();

    if (nwobjID == "nwGrid2") {
        //if (!checkrequiredfields()) {
        //    return false;
        //}
        if (nwobjTD == SPR_DDATICK) {
    
            $('#nwGrid2Con .tblGridBody').find("tr:not(:eq(" + nwobjTR + "))").find('td:eq(' + SPR_DDATICK + ") input").prop("checked", false);
         //   $('#nwGrid2Con .tblGridBody').find("tr:eq(" + nwobjTR + ")").find('td:eq(' + SPR_DDATICK + ") input").prop("checked", value);
        }

    }
    return true;
}



//$(document).on("change", ".chkdda", function (e) {
//    var value = $(this).prop("checked");
//    $('#nwGrid2Con .tblGridBody').find("tr").find('td:eq(' + SPR_DDATICK + ") input").prop("checked",false);
//    $('#nwGrid2Con .tblGridBody').find("tr:eq("+crnwTR.index()+")").find('td:eq(' + SPR_DDATICK + ") input").prop("checked", value);
//    //var length = $(`#nwGrid2 tr`).length;

//    //if ($(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(1) input`).prop("checked")) {
//    //    //var y = $(`#nwGrid1Con-nwData tr:eq(${crnwTR.index() - 1}) td:eq(3) input`).val();
//    //    //$(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(3) input`).val('');
//    //    var count = crnwTR.index();
//    //    //$(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(3) input`).enable(false);
//    //    //$(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(3)`).css("background-color", "#E7E7E7");
//    //    //$(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(2) input`).val($(`#nwGrid1Con-nwData tr:eq(${crnwTR.index() - 1}) td:eq(3) input`).val());
//    //    //$(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(4) input`).enable(true);
//    //    //$(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(4)`).css("background-color", "white");

//    //    for (x = crnwTR.index() + 1; x < length; x++) {
//    //        $(`#nwGrid2-nwData tr:eq(${x}) td:eq(1) input`).enable(false);

//    //        //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(2) input`).enable(false);
//    //        //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(3) input`).enable(false);
//    //        //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(4) input`).enable(false);

//    //        //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(2)`).css("background-color", "#E7E7E7");
//    //        $(`#nwGrid2-nwData tr:eq(${x}) td:eq(1)`).css("background-color", "#E7E7E7");
//    //        //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(3)`).css("background-color", "#E7E7E7");
//    //        //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(4)`).css("background-color", "#E7E7E7");

//    //        //$(`#nwGrid2-nwData tr:eq(${x}) td:eq(1) input`).val("");
//    //        //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(2) input`).val("");
//    //        //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(4) input`).val("");
//    //    }
//    //    for (z = crnwTR.index() ; z > 0; z--) {
//    //        $(`#nwGrid2-nwData tr:eq(${z - 1}) td:eq(1)`).css("background-color", "#E7E7E7");
//    //        $(`#nwGrid2-nwData tr:eq(${z - 1}) td:eq(1)`).enable(false);

//    //        //$(`#nwGrid1Con-nwData tr:eq(${z - 1}) td:eq(4)`).css("background-color", "white");
//    //        //$(`#nwGrid1Con-nwData tr:eq(${z - 1}) td:eq(4) input`).enable(true);
//    //    }

//    //    _checkAbove = true;
//    //} else {
//    //    //var y = $(`#nwGrid1Con-nwData tr:eq(${crnwTR.index() - 1}) td:eq(3) input`).val();
//    //    //if ($(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(2) input`).val() != "") {
//    //    //    $(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(3) input`).enable(true);
//    //    //    $(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(4) input`).enable(true);
//    //    //    $(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(3)`).css("background-color", "white");
//    //    //    $(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(4)`).css("background-color", "white");
//    //    //}

//    //    for (x = 0; x < length; x++) {
//    //        $(`#nwGrid2-nwData tr:eq(${x}) td:eq(1) input`).enable(true);
//    //        $(`#nwGrid2-nwData tr:eq(${x}) td:eq(1)`).css("background-color", "white");
//    //    }
//    //    for (z = crnwTR.index() ; z > 0; z--) {
//    //        $(`#nwGrid2-nwData tr:eq(${z - 1}) td:eq(1)`).css("background-color", "white");
//    //        $(`#nwGrid2-nwData tr:eq(${z - 1}) td:eq(1)`).enable(true);
//    //    }
//    //    //if (y != "") {
//    //    //    y++;
//    //    //    //$(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(2) input`).val(y);
//    //    //    var count = crnwTR.index();
//    //    //}
//    //    _checkAbove = false;
//    //}
//});


//$(document).on("focusout", "#txtBranchCode", function (e) {
    
//    var s1 = $(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_BRANCHCODE + `) input`).val();
//    var s2 = $(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_ACCTNO + `) input`).val();
//    var fullacctno = s1 + s2;
//    $(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_FULLACCTNO + `)`).text(fullacctno);

//});

//$(document).on("focusout", "#txtAcctno", function (e) {

//    var s1 = $(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_BRANCHCODE + `) input`).val();
//    var s2 = $(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_ACCTNO + `) input`).val();
//    var fullacctno = s1 + s2;
//    $(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_FULLACCTNO + `)`).text(fullacctno);

//});

function isCheckedCol1() {

}


$(document).on("focusout", "#txtSwiftBICCode", function (e) {

    if (e.which === 32)
        return false;

});
$(document).on("focusout", "#txtSwiftBICCode", function (e) {

    this.value = this.value.replace(/\s/g, "");

});

$(document).on("click", "#btnSalespersonAssign", function(){
    var id = 'DLRINF';
    var SupplierCode = $('#txtVendorID').val();
    nwParameter_Add("supcode", id);
    if (id.length > 0 && SupplierCode.length > 0) {
        //insert here
        var title = "Salesperson Assignment";
        //var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;
        var isView = false;
        if (nwDocno != "") {
            isView = true;
        }
        var fullength = GetCurrentURL() + "../LMSSalespersonAssign?nwDealer=" + encodeURI(SupplierCode) + "&nwTrantype=" + encodeURI(id) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwPopWindowSPSASS", true, fullength);
        $('#nwPopWindowSPSASS .modal-hdr-title').text(title);
        nwPopupForm_ShowModal("nwPopWindowSPSASS");
    }
    return false;
});


function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}


function initM() {
    var row = nwGrid1Con_Book.ActiveSheet.GetSelectedIndexes().row;

    nwGrid1Con_Book.ActiveSheet.SetBackground(SPR_PHONEBUSI - 1, row, "gainsboro");
    nwGrid1Con_Book.ActiveSheet.SetBackground(SPR_MOBILE - 1, row, "gainsboro");
    nwGrid1Con_Book.ActiveSheet.SetBackground(SPR_EMAILADD - 1, row, "gainsboro");
    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_PHONEBUSI + ")").css('background-color', 'gainsboro')
    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_MOBILE + ")").css('background-color', 'gainsboro')
    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_EMAILADD + ")").css('background-color', 'gainsboro')

    nwGrid1Con_Book.ActiveSheet.SetEnable(SPR_PHONEBUSI - 1, row, false);
    nwGrid1Con_Book.ActiveSheet.SetEnable(SPR_MOBILE - 1, row, false);
    nwGrid1Con_Book.ActiveSheet.SetEnable(SPR_EMAILADD - 1, row, false);
    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_PHONEBUSI + ")").html('<input disabled />')
    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_MOBILE + ")").html('<input disabled />')
    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_EMAILADD + ")").html('<input disabled />')

    nwGrid1Con_Book.ActiveSheet.SetText(SPR_PHONEBUSI - 1, row, '');
    nwGrid1Con_Book.ActiveSheet.SetText(SPR_MOBILE - 1, row, '');
    nwGrid1Con_Book.ActiveSheet.SetText(SPR_EMAILADD - 1, row, '');
    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_PHONEBUSI + ")").val('')
    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_MOBILE + ")").val('')
    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_EMAILADD + ")").val('')

}

function chkEmailM() {
    var row = nwGrid1Con_Book.ActiveSheet.GetSelectedIndexes().row;

    nwGrid1Con_Book.ActiveSheet.SetBackground(SPR_EMAILADD - 1, row, "white");
    nwGrid1Con_Book.ActiveSheet.SetEnable(SPR_EMAILADD - 1, row, true);

    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_EMAILADD + ")").css('background-color', 'white')
    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_EMAILADD + ")").html('<input maxlength="80"/>')
    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_EMAILADD + ")").enable(true)

}

function chkPhoneM() {
    var row = nwGrid1Con_Book.ActiveSheet.GetSelectedIndexes().row;

    nwGrid1Con_Book.ActiveSheet.SetBackground(SPR_PHONEBUSI - 1, row, "white");
    nwGrid1Con_Book.ActiveSheet.SetEnable(SPR_PHONEBUSI - 1, row, true);
    nwGrid1Con_Book.ActiveSheet.SetBackground(SPR_MOBILE - 1, row, "white");
    nwGrid1Con_Book.ActiveSheet.SetEnable(SPR_MOBILE - 1, row, true);
    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_PHONEBUSI + ")").css('background-color', 'white')

    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_PHONEBUSI + ")").html('<input type="text" id="phone" pattern="\(\d{4}\) \d{4}-\d{4}"  onblur="formatPhoneNumber(this)" maxlength="12" placeholder="(____) ____-____"/>')
    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_PHONEBUSI + ")").enable(true)
    //$("#phone").mask('(9999) 9999-9999');
    

}



function chkMobileM() {
    var row = nwGrid1Con_Book.ActiveSheet.GetSelectedIndexes().row;

    nwGrid1Con_Book.ActiveSheet.SetBackground(SPR_MOBILE - 1, row, "white");
    nwGrid1Con_Book.ActiveSheet.SetEnable(SPR_MOBILE - 1, row, true);

    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_MOBILE + ")").css('background-color', 'white')

    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_MOBILE + ")").html('<input type="text" id="mobile"  maxlength="12" value="639" oninput="formatMobileNumber(this)"/>')//
    //$("#nwGrid1Con tr:eq(" + (crnwTR.index() + 1) + ")").find("td:eq(" + SPR_MOBILE + ")").enable(true)

}




function disColumn() {

    var maxRowComms = nwGrid1Con_Book.ActiveSheet.GetMaxRow();//nwLib.nwTempTable_Row_Count("nwGrid1Con");
    for (let i = 0; i < maxRowComms ; i++) {

        nwGrid1Con_Book.ActiveSheet.SetEnable(SPR_COMMSTYPE - 1, i, true);
        nwGrid1Con_Book.ActiveSheet.SetEnable(SPR_PHONEBUSI - 1, i, false);
        nwGrid1Con_Book.ActiveSheet.SetEnable(SPR_MOBILE - 1, i, false);
        nwGrid1Con_Book.ActiveSheet.SetEnable(SPR_EMAILADD - 1, i, false);

        //$('#nwGrid1Con .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_COMMSTYPE + ') ').enable(true);
        //$('#nwGrid1Con .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_PHONEBUSI + ') ').enable(false);
        //$('#nwGrid1Con .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_MOBILE + ') ').enable(false);
        //$('#nwGrid1Con .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_EMAILADD + ') ').enable(false);
    }


}

function CreateGrid2ConDone() {
    $(".nwCheckBoxTot.chkdda").hide()
    //$('#nwGrid2Con .tblGridBody').find("tr").find('td:eq(' + SPR_DDATICK + ")").enable(false);
    //$('#nwGrid2Con .tblGridBody').find("tr").find('td:eq(' + SPR_DDATICK + ")").attr("name", "chkdda");
    var maxRow = nwGrid2Con_Book.ActiveSheet.GetMaxRow();
    //var maxRow = nwLib.nwTempTable_Row_Count("nwGrid2Con");
    //var hastick = false;
    for (var i = 0; i < maxRow; i++) {

        Cuz_nwGrid2_SwiftCode(i);
        Cuz_nwGrid2_PaymentInstructionColor(i);
    }


}
function Cuz_nwGrid2_SwiftCode(row) {
    var reqswiftcode = nwGrid2Con_Book.ActiveSheet.GetValue((SPR_reqswiftcode - 1), row)
    //var reqswiftcode = $('#nwGrid2Con .tblGridBody tr:eq(' + row + ') td:eq(' + SPR_reqswiftcode + ")").text();
    //if (reqswiftcode == "1") {
    //    $('#nwGrid2Con .tblGridBody tr:eq(' + row + ') td:eq(' + SPR_SWIFTCODE + ")").enable(true);
    //} else {
    //    $('#nwGrid2Con .tblGridBody tr:eq(' + row + ') td:eq(' + SPR_SWIFTCODE + ")").enable(false);
    //}
}
function Cuz_nwGrid2_PaymentInstructionColor(row) {
    var paymentinstruc = nwGrid2Con_Book.ActiveSheet.GetText(SPR_PAYMENTINSTRUC - 1, row);
    //var paymentinstruc = $('#nwGrid2Con .tblGridBody tr:eq(' + row + ') td:eq(' + SPR_PAYMENTINSTRUC + ") textarea").val();
    //$('#nwGrid2Con .tblGridBody tr:eq(' + row + ') td:eq(' + SPR_PAYMENTINSTRUC + ") button").removeClass("btnBlue btnGreen");
    //if (!isNull(paymentinstruc)) {
    //    $('#nwGrid2Con .tblGridBody tr:eq(' + row + ') td:eq(' + SPR_PAYMENTINSTRUC + ") button").addClass("btnGreen"); 
    //} else {
    //    $('#nwGrid2Con .tblGridBody tr:eq(' + row + ') td:eq(' + SPR_PAYMENTINSTRUC + ") button").addClass("btnBlue");
    //}
    //if (!isNull(paymentinstruc)) {
    if (paymentinstruc == "1") {
        nwGrid2Con_Book.ActiveSheet.SetBackground(SPR_PAYMENTINSTRUC - 1, row, "green");
    }
    else {
        nwGrid2Con_Book.ActiveSheet.SetBackground(SPR_PAYMENTINSTRUC - 1, row, "#2689d8");
    }
    nwGrid2Con_Book.ActiveSheet.SetText2(SPR_PAYMENTINSTRUC - 1, row, "...");
    nwGrid2Con_Book.ActiveSheet.SetTextAlign(SPR_PAYMENTINSTRUC - 1, row, "center");
    nwGrid2Con_Book.ActiveSheet.SetBold(SPR_PAYMENTINSTRUC - 1, row, "bold");
    nwGrid2Con_Book.ActiveSheet.SetTextColor(SPR_PAYMENTINSTRUC - 1, row, "white");
}

function Cuz_nwGrid_PayInsEnabled() {
    var status = $('#txtStatus').val();
    if (status.toLowerCase() == "approved" || nwDocno != "") {
        $("#nwgRemarksCon").find("button,input,textarea").enable(false)
    } else {
        $("#nwgRemarksCon").find("button,input,textarea").enable(true)
    }
}

$(document).on("keydown", "#nwgRemarksCon", function (e) {
    var code = e.which;
    if (code == "13") {
        if ($("#chknwgRemarks").is(':checked')) {
            setTimeout(function () {
                Cuz_RemarksDone();
            }, 100);
            return isContinue;
        }
    }
});

$(document).on("click", '#btnnwgRemarks', function (e) {
    Cuz_RemarksDone();
    return true;
});

function Cuz_RemarksDone() {
    var nwobjTR = crnwTR.index();
    Cuz_nwGrid2_PaymentInstructionColor(nwobjTR);

}


//function nwGrid_Click(nwobj, nwobjrow, nwobjitem) {
//    var nwobjID = nwobj;
//    var nwobjTR = crnwTR.index();
//    var nwobjTD = crnwTD.index();

//    if (nwobjID == "nwGrid2") {
//        //if (!checkrequiredfields()) {
//        //    return false;
//        //}
//        if (nwobjTD == SPR_PAYMENTINSTRUC) {
//            Cuz_nwGrid_PayInsEnabled();
//        }

//    }
//    return true;
//}




function func_nwGrid_InsertDone() {
    var GridID = crnwTableCon.attr("id");
    if (GridID == "nwGrid2Con") {
        var row = crnwTR.index() - 1;
        Cuz_nwGrid2_SwiftCode(row)
    }
}

var isContinue = true;
//function func_WindowCloseTrigger(verID) {
//    if (verID == "nwPopUpRequireCompliance") {

//    //    if ($('#nwPopWindow .BoxTitle').text() == "Vendor Contacts") {
//    //        nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
//    //        nwParameter_Add("Corporate", $('#Corporate').prop("checked"));
//    //        nwParameter_Add("WithoutTIN", $('#WithoutTIN').prop("checked"));
//    //        nwParameter_Add("nwIsReport", nwIsReport);
//    //        func_ActionDriven("actValidateContacts", false);
//    //        return false;
//    //    }

//    //    if ($('#nwPopWindow .BoxTitle').text() == "Vendor Taxes Information") {
//    //        nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
//    //        nwParameter_Add("Individual", $('#Individual').prop("checked"));
//    //        nwParameter_Add("Corporate", $('#Corporate').prop("checked"));
//    //        nwParameter_Add("WithoutTIN", $('#WithoutTIN').prop("checked"));
//    //        func_ActionDriven("actAccess", false);
//    //    }

//        //if ($('#nwPopWindow .BoxTitle').text() == "Requirements Compliance") {
//            cust_GetPara();
//            //nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
//            //nwParameter_Add("Individual", $('#Individual').prop("checked"));
//            //nwParameter_Add("Corporate", $('#Corporate').prop("checked"));
//            //nwParameter_Add("WithoutTIN", $('#WithoutTIN').prop("checked"));
//            //func_ActionDriven("actAccess", false);
//            nwLoading_Start("actHasRqrdCompli", crLoadingHTML);
//            func_ActionDriven('actHasRqrdCompli', false);
//        }
//    else if (verID == "nwPopWindowSPSASS") {
//        //if ($('#nwPopWindow .BoxTitle').text() == "Salesperson Assignment") {
//            cust_GetPara();
//            nwLoading_Start("actHasSalesPerson", crLoadingHTML);
//            func_ActionDriven('actHasSalesPerson', false);  
//        }
    

//    //if (verID == "nwPopWindowSPSASS") {
//    //    nwParameter_Add("txtSuppliercode", $('#txtSuppliercode').val());
//    //    nwParameter_Add("VendorId", $('#txtVendorID').val());
//    //    func_ActionDriven("actHasSalesperson", false);
//    //}
    
    

//    return isContinue;
//}
//function processed() {

//    if ($('#txtStatus').val().toLowerCase() == "approved")
//    {

//        document.getElementById("btnCollapseAll").textContent = "Collapse All";
//        $('#tab-main-one,#tab-main-two, #tab-main-three').prop('checked', true);
//        DisableFields();
//        $('#btnSalespersonAssign,#btnReqCompliance,#btnViewContacts,#btnViewUpdateHistory').enable(true);
//        $('#nwGrid2Con').enable(true);
//        $("#nwGrid2Con input").enable(false);
//        //$("#nwGridCon1Custom td").css("background-color", "gainsboro");
//        $('#nwGrid2Con').find("input").parents("td").addClass("gainsboro");
//        $('#nwGrid2Con').find("select").parents("td").addClass("gainsboro");
//        $('#nwGrid2Con .nwgrid_Insert').enable(false);
//        $('#nwGrid2Con .nwgrid_Delete').enable(false);
//        $('#nwGrid2Con').find("td").enable(false);
//        $('#nwGrid2Con').find("button").parents("td").enable(true);
//        $('#nwGrid2Con').find("a").parents("td").enable(true);
//        $('#nwGrid2Con .nwgrid_SearchNext').enable(true);

//        var x = nwLib.nwTempTable_Row_Count("nwGrid2Con");
//        for (var i = 0; i < x; i++) {
//            var PayIns = $('#nwGrid2Con .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_PAYMENTINSTRUC + ') textarea').val() || "";
//            if (PayIns == "") {
//                $('#nwGrid2Con .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_PAYMENTINSTRUC + ')').enable(false)
//            }
//        }
//    }
        
//}

$(document).on("click", "#btnViewContacts", function (e) {
    e.preventDefault();
    cust_GetPara();
    nwLoading_Start("actViewContacts", crLoadingHTML);
    //$("#actViewContacts").css({ "min-width": "85%" });
    //$("#actViewContacts").css({ "min-height": "485px" });
    nwPopupForm_ShowModal("actViewContacts");
    func_ActionDriven("actViewContacts", false);

    return false;
});

function isNull(id) {
    if (id == '' || id == null || id == undefined || typeof id == 'undefined' || typeof variable == 'object') {
        return true;
    }
    else {
        return false;
    }
}

//function formatPhoneNumber(input) {
//    // Remove non-digit characters
//    const phoneNumber = input.value.replace(/\D/g, '');

//    // Apply the desired format
//    const formattedPhoneNumber = phoneNumber.replace(/(\d{4})(\d{4})(\d{4})/, '($1) $2-$3');

//    // Update the input value
//    input.value = formattedPhoneNumber;


//}

$(document).ready(function () {
    //var maskBehavior = function (val) {
    //    return val.replace(/\D/g, '').length == 12 ? '(9999) 9999-9999' : '(999) 9999-9999';
    //};

    //var options = {
    //    onKeyPress: function (val, e, field, options) {
    //        field.mask(maskBehavior.apply({}, arguments), options);
    //    }
    //};

    //$('#phone').mask(maskBehavior, options);
});

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


function formatMobileNumber(input1) {
    // Remove non-digit characters
    const phoneNumber1 = input1.value.replace(/\D/g, '');

    // Apply the desired format
    const formattedPhoneNumber1 = `639${phoneNumber1.slice(3, 12)}`;

    // Update the input value
    input1.value = formattedPhoneNumber1;
}

function brgyLoad() {

    if ($('#idvallugStdBarangay').val() != "") {
        $('#txtAltBrgy').enable(false);
    }
    else
        $('#txtAltBrgy').enable(true);

    if ($('#txtAltBrgy').val() != "") {
        $('#lugStdBarangay,#lugMunicipality').enable(false);
    }
    else
        $('#lugStdBarangay,#lugMunicipality').enable(true);

    //===========
    if ($('#chkSamePresentAdd').prop("checked") == true)
    {
        $('#txtAltBrgy2').enable(false);
        $('#lugStdBarangay2,#lugMunicipality2').enable(false);

    }
    else{
    if ($('#idvallugStdBarangay2').val() != "") {
        $('#txtAltBrgy2').enable(false);
        $("#lugProvince2,#lugRegion2,#lugCountry2").enable(false);
    }
    else{
        $('#txtAltBrgy2').enable(true);
    $("#lugProvince2,#lugRegion2,#lugCountry2").enable(false);
    }


    if ($('#txtAltBrgy2').val() != "" ) {
        $('#lugStdBarangay2,#lugMunicipality2').enable(false);
        $("#lugProvince2,#lugRegion2,#lugCountry2").enable(false);
    }
    else{
        $('#lugStdBarangay2,#lugMunicipality2').enable(true);
        $("#lugProvince2,#lugRegion2,#lugCountry2").enable(false);
    }
    }
}

$(document).on('change', '#txtRefCode', function (e) {

    var txtRefCode = $("#txtRefCode").val();
    nwParameter_Add("txtRefCode", txtRefCode);
    nwLoading_Start("xactRefCodeChk", crLoadingHTML);
    func_ActionDriven("actRefCodeChk", false);
});
function applyMask() {
    var inputElement = document.getElementById('txtVat');
    var inputValue = inputElement.value;

    // Remove any non-alphanumeric characters
    inputValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');

    // Apply the specific mask pattern: 999-999-999-9999A or 999-999-999-99991
    inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{3})(\d{4})([a-zA-Z0-9])/, '$1-$2-$3-$4$5');

    // Update the input value
    inputElement.value = inputValue;
}
function applyMaskNon() {
    var inputElement = document.getElementById('txtNonVat');
    var inputValue = inputElement.value;

    // Remove any non-alphanumeric characters
    inputValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');

    // Apply the specific mask pattern: 999-999-999-9999A or 999-999-999-99991
    inputValue = inputValue.replace(/(\d{3})(\d{3})(\d{3})(\d{4})([a-zA-Z0-9])/, '$1-$2-$3-$4$5');

    // Update the input value
    inputElement.value = inputValue;
}

function enableSwift(withPay) {
    //if (withPay == true) {
    
    //    $('#nwGrid2Con .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SWIFTCODE + ") input").css('background-color', 'white');
    //    $('#nwGrid2Con .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SWIFTCODE + ")").enable(true);

    //}
    //else {
        
    //    $('#nwGrid2Con .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SWIFTCODE + ") input").css('background-color', 'gainsboro');
    //    $('#nwGrid2Con .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SWIFTCODE + ")").enable(false);

    //}

}

//$(document).on("click", "#txtPayee", function () {
//    if (this.value.length <= 0) {
//        if (crnwTR.find("td:eq(" + SPR_BANK + ")").text() != "MTBC") {
//            this.value = $('#txtCheckPayeeName').val();
//        }
//        else {
//            this.value = $('#txtRegName').val();
//        }
//    }
//});

//const title = "Dealer Information";

//let $DateToday = "";
//let $ServerLink = "";

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
            FullAddressCheckbox2: $("#cbFullAddress2"),
            /* Textboxes and Lookups */

            //LocationCode2: $("#txtLocationCode2"),
            //LugLocationType2: $("#lugLocationType2"),
            FullAddress2: $("#txtFullAddress2"),
            UnitNo2: $("#txtUnitNo2"),
            FloorNo2: $("#txtFloorNo2"),
            BuildingNo2: $("#txtBldgNo2"),
            EstablishmentName2: $("#txtEstablishment2"),
            BuildingName2: $("#txtBuilding2"),
            Landmark2: $("#txtLandmark2"),
            StreetNo2: $("#txtStreetNo2"),
            StreetName2: $("#txtStreetName2"),
            Lot2: $("#txtLot2"),
            Block2: $("#txtBlock2"),
            Phase2: $("#txtPhase2"),
            Subdivision2: $("#txtSubdivision2"),
            Zone2: $("#txtZone2"),
            LugArea2: $("#lugArea2"),
            LugStandardBarangay2: $("#lugStdBarangay2"),
            AlternativeBarangay2: $("#txtAltBrgy2"),
            LugMunicipality2: $("#lugMunicipality2"),
            LugProvince2: $("#lugProvince2"),
            LugRegion2: $("#lugRegion2"),
            LugCountry2: $("#lugCountry2"),
            //LugInternationalSubGroup2: $("#lugInternationalSubGroup2"),
            //LugInternationalGroup2: $("#lugInternationalGroup2"),
            ZipCode2: $("#txtZip2"),


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
            //LocationCode: $("#txtLocationCode"),
            //LugLocationType: $("#lugLocationType"),
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
            //LocationTypeCode: $("#idvallugLocationType"),
            //LocationTypeDesc: $("#descvallugLocationType"),
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
            //PERMA ADD
            StandardBarangayCode2: $("#idvallugStdBarangay2"),
            StandardBarangayDesc2: $("#descvallugStdBarangay2"),
            MunicipalityCode2: $("#idvallugMunicipality2"),
            MunicipalityDesc2: $("#descvallugMunicipality2"),
            ProvinceCode2: $("#idvallugProvince2"),
            ProvinceDesc2: $("#descvallugProvince2"),
            RegionCode2: $("#idvallugRegion2"),
            RegionDesc2: $("#descvallugRegion2"),
            CountryCode2: $("#idvallugCountry2"),
            CountryDesc2: $("#descvallugCountry2"),
            AreaCode2: $("#idvallugArea2"),
            AreaDesc2: $("#descvallugArea2"),
            /* Span Class Required Fields 'Main Location' */
            FullAddressClass: $('.fulladdress'),
            LandmarkClass: $(".landmark"),
            StreetNameClass: $(".streetname"),
            SubdivisionClass: $(".subdivision"),
            StandardBarangayClass: $(".standardbarangay"),
            AlternativeBarangayClass: $(".alternativebarangay"),
            MunicipalityClass: $(".municipality"),
            //PERMA
            FullAddressClass2: $('.fulladdress2'),
            LandmarkClass2: $(".landmark2"),
            StreetNameClass2: $(".streetname2"),
            SubdivisionClass2: $(".subdivision2"),
            StandardBarangayClass2: $(".standardbarangay2"),
            AlternativeBarangayClass2: $(".alternativebarangay2"),
            MunicipalityClass2: $(".municipality2"),
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
            $fn.xHeaderDetails.CrossRefCode.prop("disabled", true),
            $fn.xHeaderDetails.AllowCurrencySelection.prop("disabled", true),
            $fn.xHeaderDetails.RegName.prop("disabled", true),
            //$fn.xHeaderDetails.TradeName.prop("disabled", true),
            $fn.xHeaderDetails.LoadOwnersName.prop("disabled", true),
            $fn.xHeaderDetails.CheckPayeeName.prop("disabled", true),
            $fn.xHeaderDetails.RadioDesign.prop("disabled", true),
            $fn.xHeaderDetails.Website.prop("disabled", true),
            $fn.xHeaderDetails.LugSalutation.enable(false),
            $fn.xHeaderDetails.LastName.prop("disabled", true),
            $fn.xHeaderDetails.LugNameSuffix.enable(false),
            $fn.xHeaderDetails.FirstName.prop("disabled", true),
            $fn.xHeaderDetails.MiddleInitial.prop("disabled", true),
            $fn.xHeaderDetails.NickName.prop("disabled", true),
            $fn.xHeaderDetails.BirthDate.prop("disabled", true),
            $fn.xHeaderDetails.BirthPlace.prop("disabled", true),
            $fn.xHeaderDetails.LugGender.enable(false),
            $fn.xHeaderDetails.LugCivilStatus.enable(false),
            $fn.xHeaderDetails.LugNationality.enable(false),
            $fn.xHeaderDetails.LugReligion.enable(false),
            $fn.xHeaderDetails.UnitNo.prop("disabled", true),
            $fn.xHeaderDetails.FloorNo.prop("disabled", true),
            $fn.xHeaderDetails.BuildingNo.prop("disabled", true),
            $fn.xHeaderDetails.EstablishmentName.prop("disabled", true),
            $fn.xHeaderDetails.BuildingName.prop("disabled", true),
            $fn.xHeaderDetails.Landmark.prop("disabled", true),
            $fn.xHeaderDetails.StreetNo.prop("disabled", true),
            $fn.xHeaderDetails.StreetName.prop("disabled", true),
            $fn.xHeaderDetails.Lot.prop("disabled", true),
            $fn.xHeaderDetails.Block.prop("disabled", true),
            $fn.xHeaderDetails.Phase.prop("disabled", true),
            $fn.xHeaderDetails.Subdivision.prop("disabled", true),
            $fn.xHeaderDetails.Zone.prop("disabled", true),
            $fn.xHeaderDetails.LugArea.enable(false),
            $fn.xHeaderDetails.LugStandardBarangay.enable(false),
            $fn.xHeaderDetails.AlternativeBarangay.prop("disabled", true),
            $fn.xHeaderDetails.LugMunicipality.enable(false),

            //PERMA
            $fn.xHeaderDetails.UnitNo2.prop("disabled", true),
            $fn.xHeaderDetails.FloorNo2.prop("disabled", true),
            $fn.xHeaderDetails.BuildingNo2.prop("disabled", true),
            $fn.xHeaderDetails.EstablishmentName2.prop("disabled", true),
            $fn.xHeaderDetails.BuildingName2.prop("disabled", true),
            $fn.xHeaderDetails.Landmark2.prop("disabled", true),
            $fn.xHeaderDetails.StreetNo2.prop("disabled", true),
            $fn.xHeaderDetails.StreetName2.prop("disabled", true),
            $fn.xHeaderDetails.Lot2.prop("disabled", true),
            $fn.xHeaderDetails.Block2.prop("disabled", true),
            $fn.xHeaderDetails.Phase2.prop("disabled", true),
            $fn.xHeaderDetails.Subdivision2.prop("disabled", true),
            $fn.xHeaderDetails.Zone2.prop("disabled", true),
            $fn.xHeaderDetails.LugArea2.enable(false),
            $fn.xHeaderDetails.LugStandardBarangay2.enable(false),
            $fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", true),
            $fn.xHeaderDetails.LugMunicipality2.enable(false),
            //END

            $fn.xHeaderDetails.PhoneNo.prop("disabled", true),
            $fn.xHeaderDetails.Local.prop("disabled", true),
            $fn.xHeaderDetails.MobileNo.prop("disabled", true),
            $fn.xHeaderDetails.EmailAddress.prop("disabled", true),
            $fn.xHeaderDetails.FaxNo.prop("disabled", true),
            $fn.xHeaderDetails.LugBank.enable(false),
            $fn.xHeaderDetails.BankAccountNo.prop("disabled", true),
            $fn.xHeaderDetails.BankAddress.prop("disabled", true),
            $fn.xHeaderDetails.FullAddressCheckbox.enable(false),
            $fn.xHeaderDetails.FullAddressCheckbox2.enable(false)
        },

        /* Will Enable Fields Upon Refresh */
        xEnableFields: function () {
            //if ($fn.xHeaderDetails.Individual.is(":checked"))
            //    $fn.xHeaderDetails.RegName.prop("disabled", true);
            //else
            //    $fn.xHeaderDetails.RegName.prop("disabled", false);

            $fn.xHeaderDetails.RegName.prop("disabled", false);
            $fn.xHeaderDetails.CrossRefCode.prop("disabled", false),
            $fn.xHeaderDetails.AllowCurrencySelection.prop("disabled", false),
            $fn.xHeaderDetails.TradeName.prop("disabled", false),
            //$fn.xHeaderDetails.LoadOwnersName.prop("disabled", false),
            $fn.xHeaderDetails.CheckPayeeName.prop("disabled", false),
            $fn.xHeaderDetails.RadioDesign.enable(true),
            $fn.xHeaderDetails.Website.prop("disabled", false),
            $fn.xHeaderDetails.LugSalutation.enable(true),
            $fn.xHeaderDetails.LastName.prop("disabled", false),
            $fn.xHeaderDetails.LugNameSuffix.enable(true),
            $fn.xHeaderDetails.FirstName.prop("disabled", false),
            $fn.xHeaderDetails.MiddleInitial.prop("disabled", false),
            $fn.xHeaderDetails.NickName.prop("disabled", false),
            $fn.xHeaderDetails.BirthDate.prop("disabled", false),
            $fn.xHeaderDetails.BirthPlace.prop("disabled", false),
            $fn.xHeaderDetails.LugGender.enable(true),
            $fn.xHeaderDetails.LugCivilStatus.enable(true),
            $fn.xHeaderDetails.LugNationality.enable(true),
            $fn.xHeaderDetails.LugReligion.enable(true),
            $fn.xHeaderDetails.UnitNo.prop("disabled", false),
            $fn.xHeaderDetails.FloorNo.prop("disabled", false),
            $fn.xHeaderDetails.BuildingNo.prop("disabled", false),
            $fn.xHeaderDetails.EstablishmentName.prop("disabled", false),
            $fn.xHeaderDetails.BuildingName.prop("disabled", false),
            $fn.xHeaderDetails.Landmark.prop("disabled", false),
            $fn.xHeaderDetails.StreetNo.prop("disabled", false),
            $fn.xHeaderDetails.StreetName.prop("disabled", false),
            $fn.xHeaderDetails.Lot.prop("disabled", false),
            $fn.xHeaderDetails.Block.prop("disabled", false),
            $fn.xHeaderDetails.Phase.prop("disabled", false),
            $fn.xHeaderDetails.Subdivision.prop("disabled", false),
            $fn.xHeaderDetails.Zone.prop("disabled", false),
            $fn.xHeaderDetails.LugArea.enable(true),
            $fn.xHeaderDetails.LugStandardBarangay.enable(true),
            $fn.xHeaderDetails.AlternativeBarangay.prop("disabled", false),
            $fn.xHeaderDetails.LugMunicipality.enable(true),
            //PERMA
            $fn.xHeaderDetails.UnitNo2.prop("disabled", false),
            $fn.xHeaderDetails.FloorNo2.prop("disabled", false),
            $fn.xHeaderDetails.BuildingNo2.prop("disabled", false),
            $fn.xHeaderDetails.EstablishmentName2.prop("disabled", false),
            $fn.xHeaderDetails.BuildingName2.prop("disabled", false),
            $fn.xHeaderDetails.Landmark2.prop("disabled", false),
            $fn.xHeaderDetails.StreetNo2.prop("disabled", false),
            $fn.xHeaderDetails.StreetName2.prop("disabled", false),
            $fn.xHeaderDetails.Lot2.prop("disabled", false),
            $fn.xHeaderDetails.Block2.prop("disabled", false),
            $fn.xHeaderDetails.Phase2.prop("disabled", false),
            $fn.xHeaderDetails.Subdivision2.prop("disabled", false),
            $fn.xHeaderDetails.Zone2.prop("disabled", false),
            $fn.xHeaderDetails.LugArea2.enable(true),
            $fn.xHeaderDetails.LugStandardBarangay2.enable(true),
            $fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", false),
            $fn.xHeaderDetails.LugMunicipality2.enable(true),
            //END
            $fn.xHeaderDetails.PhoneNo.prop("disabled", false),
            $fn.xHeaderDetails.Local.prop("disabled", false),
            $fn.xHeaderDetails.MobileNo.prop("disabled", false),
            $fn.xHeaderDetails.EmailAddress.prop("disabled", false),
            $fn.xHeaderDetails.FaxNo.prop("disabled", false),
            $fn.xHeaderDetails.LugBank.enable(true),
            $fn.xHeaderDetails.BankAccountNo.prop("disabled", false),
            $fn.xHeaderDetails.BankAddress.prop("disabled", false),
            $fn.xHeaderDetails.FullAddressCheckbox.enable(true),
            $fn.xHeaderDetails.FullAddressCheckbox2.enable(true)
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
            $fn.xHeaderDetails.LastName.attr("disabled", "disabled");
            $fn.xHeaderDetails.LugNameSuffix.enable(false);
            $fn.xHeaderDetails.FirstName.attr("disabled", "disabled");
            $fn.xHeaderDetails.MiddleInitial.attr("disabled", "disabled");
            $fn.xHeaderDetails.NickName.attr("disabled", "disabled");
            $fn.xHeaderDetails.BirthDate.attr("disabled", "disabled");
            $fn.xHeaderDetails.BirthPlace.attr("disabled", "disabled");
            $fn.xHeaderDetails.LugGender.enable(false);
            $fn.xHeaderDetails.LugCivilStatus.enable(false);
            $fn.xHeaderDetails.LugNationality.enable(false);
            $fn.xHeaderDetails.LugReligion.enable(false);
            /**************************/
        },

        /* Enable all Individual Details */
        xEnableIndividualDetails: function () {
            $fn.xHeaderDetails.LugSalutation.enable(true);
            $fn.xHeaderDetails.LastName.removeAttr("disabled");
            $fn.xHeaderDetails.LugNameSuffix.enable(true);
            $fn.xHeaderDetails.FirstName.removeAttr("disabled");
            $fn.xHeaderDetails.MiddleInitial.removeAttr("disabled");
            $fn.xHeaderDetails.NickName.removeAttr("disabled");
            $fn.xHeaderDetails.BirthDate.removeAttr("disabled");
            $fn.xHeaderDetails.BirthPlace.removeAttr("disabled");
            $fn.xHeaderDetails.LugGender.enable(true);
            $fn.xHeaderDetails.LugCivilStatus.enable(true);
            $fn.xHeaderDetails.LugNationality.enable(true);
            $fn.xHeaderDetails.LugReligion.enable(true);
            /**************************/
        },

        xFullAddress: function () {
            var isFullAddress = $('#cbFullAddress').is(":checked");
            var isFullAddress2 = $('#chkSamePresentAdd').is(":checked");
            var isPermanentaddChkSame = $('#chkSamePresentAdd').is(":checked");

            if (isFullAddress) {
                $fn.xDisableAddressDetails();
            }
            else {
                $fn.xEnableAddressDetails();
            }

            if (isPermanentaddChkSame) {
                $fn.xDisableAddressDetails3();
            }
            else {
                $fn.xEnableAddressDetails3();
            }


            if (isFullAddress2) {
                $fn.xDisableAddressDetails2();
            }
            else {
                $fn.xEnableAddressDetails2();
            }
        },
        //1
        /* Disable all Address Details */
        xDisableAddressDetails: function () {
            $fn.xHeaderDetails.FullAddress.prop("disabled", false);
            $fn.xHeaderDetails.UnitNo.prop("disabled", true);
            $fn.xHeaderDetails.FloorNo.prop("disabled", true);
            $fn.xHeaderDetails.BuildingNo.prop("disabled", true);
            $fn.xHeaderDetails.EstablishmentName.prop("disabled", true);
            $fn.xHeaderDetails.BuildingName.prop("disabled", true);
            $fn.xHeaderDetails.Landmark.prop("disabled", true);
            $fn.xHeaderDetails.StreetNo.prop("disabled", true);
            $fn.xHeaderDetails.StreetName.prop("disabled", true);
            $fn.xHeaderDetails.Lot.prop("disabled", true);
            $fn.xHeaderDetails.Block.prop("disabled", true);
            $fn.xHeaderDetails.Phase.prop("disabled", true);
            $fn.xHeaderDetails.Subdivision.prop("disabled", true);
            $fn.xHeaderDetails.Zone.prop("disabled", true);
            $fn.xHeaderDetails.LugArea.enable(false);
            $fn.xHeaderDetails.LugStandardBarangay.enable(false);
            $fn.xHeaderDetails.AlternativeBarangay.prop("disabled", true);
            $fn.xHeaderDetails.LugMunicipality.enable(false);
            $fn.xHeaderDetails.ZipCode.prop("disabled", true);


            /**************************/
        },

        /* Enable all Address Details */
        xEnableAddressDetails: function () {
            $fn.xHeaderDetails.FullAddress.prop("disabled", true);
            $fn.xHeaderDetails.UnitNo.prop("disabled", false);
            $fn.xHeaderDetails.FloorNo.prop("disabled", false);
            $fn.xHeaderDetails.BuildingNo.prop("disabled", false);
            $fn.xHeaderDetails.EstablishmentName.prop("disabled", false);
            $fn.xHeaderDetails.BuildingName.prop("disabled", false);
            $fn.xHeaderDetails.Landmark.prop("disabled", false);
            $fn.xHeaderDetails.StreetNo.prop("disabled", false);
            $fn.xHeaderDetails.StreetName.prop("disabled", false);
            $fn.xHeaderDetails.Lot.prop("disabled", false);
            $fn.xHeaderDetails.Block.prop("disabled", false);
            $fn.xHeaderDetails.Phase.prop("disabled", false);
            $fn.xHeaderDetails.Subdivision.prop("disabled", false);
            $fn.xHeaderDetails.Zone.prop("disabled", false);
            $fn.xHeaderDetails.LugArea.enable(true);
            $fn.xHeaderDetails.LugStandardBarangay.enable(true);
            $fn.xHeaderDetails.AlternativeBarangay.prop("disabled", false);
            $fn.xHeaderDetails.LugMunicipality.enable(true);
            $fn.xHeaderDetails.ZipCode.prop("disabled", false);



            /**************************/
        },

        //2 PERMANENT

        /* Disable all Address Details */
        xDisableAddressDetails2: function () {

            //PERMA
            $fn.xHeaderDetails.FullAddress2.enable(true);
            $fn.xHeaderDetails.UnitNo2.prop("disabled", true);
            $fn.xHeaderDetails.FloorNo2.prop("disabled", true);
            $fn.xHeaderDetails.BuildingNo2.prop("disabled", true);
            $fn.xHeaderDetails.EstablishmentName2.prop("disabled", true);
            $fn.xHeaderDetails.BuildingName2.prop("disabled", true);
            $fn.xHeaderDetails.Landmark2.prop("disabled", true);
            $fn.xHeaderDetails.StreetNo2.prop("disabled", true);
            $fn.xHeaderDetails.StreetName2.prop("disabled", true);
            $fn.xHeaderDetails.Lot2.prop("disabled", true);
            $fn.xHeaderDetails.Block2.prop("disabled", true);
            $fn.xHeaderDetails.Phase2.prop("disabled", true);
            $fn.xHeaderDetails.Subdivision2.prop("disabled", true);
            $fn.xHeaderDetails.Zone2.prop("disabled", true);
            $fn.xHeaderDetails.LugArea2.enable(false);
            $fn.xHeaderDetails.LugStandardBarangay2.enable(false);
            $fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", true);
            $fn.xHeaderDetails.LugMunicipality2.enable(false);
            $fn.xHeaderDetails.ZipCode2.prop("disabled", true);
            /**************************/
        },


        /* Enable all Address Details */
        xEnableAddressDetails2: function () {


            //PERMA
            $fn.xHeaderDetails.FullAddress2.enable(false);
            $fn.xHeaderDetails.UnitNo2.prop("disabled", false);
            $fn.xHeaderDetails.FloorNo2.prop("disabled", false);
            $fn.xHeaderDetails.BuildingNo2.prop("disabled", false);
            $fn.xHeaderDetails.EstablishmentName2.prop("disabled", false);
            $fn.xHeaderDetails.BuildingName2.prop("disabled", false);
            $fn.xHeaderDetails.Landmark2.prop("disabled", false);
            $fn.xHeaderDetails.StreetNo2.prop("disabled", false);
            $fn.xHeaderDetails.StreetName2.prop("disabled", false);
            $fn.xHeaderDetails.Lot2.prop("disabled", false);
            $fn.xHeaderDetails.Block2.prop("disabled", false);
            $fn.xHeaderDetails.Phase2.prop("disabled", false);
            $fn.xHeaderDetails.Subdivision2.prop("disabled", false);
            $fn.xHeaderDetails.Zone2.prop("disabled", false);
            $fn.xHeaderDetails.LugArea2.enable(true);
            $fn.xHeaderDetails.LugStandardBarangay2.enable(true);
            $fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", false);
            $fn.xHeaderDetails.LugMunicipality2.enable(true);
            $fn.xHeaderDetails.ZipCode2.prop("disabled", false);
            /**************************/
        },
        //3
        /* Disable all Address Details */
        xDisableAddressDetails3: function () {

            //PERMA
            $fn.xHeaderDetails.FullAddress2.enable(true);
            $fn.xHeaderDetails.UnitNo2.prop("disabled", true);
            $fn.xHeaderDetails.FloorNo2.prop("disabled", true);
            $fn.xHeaderDetails.BuildingNo2.prop("disabled", true);
            $fn.xHeaderDetails.EstablishmentName2.prop("disabled", true);
            $fn.xHeaderDetails.BuildingName2.prop("disabled", true);
            $fn.xHeaderDetails.Landmark2.prop("disabled", true);
            $fn.xHeaderDetails.StreetNo2.prop("disabled", true);
            $fn.xHeaderDetails.StreetName2.prop("disabled", true);
            $fn.xHeaderDetails.Lot2.prop("disabled", true);
            $fn.xHeaderDetails.Block2.prop("disabled", true);
            $fn.xHeaderDetails.Phase2.prop("disabled", true);
            $fn.xHeaderDetails.Subdivision2.prop("disabled", true);
            $fn.xHeaderDetails.Zone2.prop("disabled", true);
            $fn.xHeaderDetails.LugArea2.enable(false);
            $fn.xHeaderDetails.LugStandardBarangay2.enable(false);
            $fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", true);
            $fn.xHeaderDetails.LugMunicipality2.enable(false);
            $fn.xHeaderDetails.ZipCode2.prop("disabled", true);
            /**************************/
        },

        /* Enable all Address Details */
        xEnableAddressDetails3: function () {


            //PERMA
            $fn.xHeaderDetails.FullAddress2.enable(false);
            $fn.xHeaderDetails.UnitNo2.prop("disabled", false);
            $fn.xHeaderDetails.FloorNo2.prop("disabled", false);
            $fn.xHeaderDetails.BuildingNo2.prop("disabled", false);
            $fn.xHeaderDetails.EstablishmentName2.prop("disabled", false);
            $fn.xHeaderDetails.BuildingName2.prop("disabled", false);
            $fn.xHeaderDetails.Landmark2.prop("disabled", false);
            $fn.xHeaderDetails.StreetNo2.prop("disabled", false);
            $fn.xHeaderDetails.StreetName2.prop("disabled", false);
            $fn.xHeaderDetails.Lot2.prop("disabled", false);
            $fn.xHeaderDetails.Block2.prop("disabled", false);
            $fn.xHeaderDetails.Phase2.prop("disabled", false);
            $fn.xHeaderDetails.Subdivision2.prop("disabled", false);
            $fn.xHeaderDetails.Zone2.prop("disabled", false);
            $fn.xHeaderDetails.LugArea2.enable(true);
            $fn.xHeaderDetails.LugStandardBarangay2.enable(true);
            $fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", false);
            $fn.xHeaderDetails.LugMunicipality2.enable(true);
            $fn.xHeaderDetails.ZipCode2.prop("disabled", false);
            /**************************/
        },



        /* Validation for Vendor Status */
        xValidateApprove: function () {
            var xStatus = $('#txtStatus').val();

            if (xStatus == "Approved" || xStatus == "Cancelled" || xStatus == "For Approval") {
                /* Disable the fields */
                $fn.xDisableFields();
                $fn.xHeaderDetails.FullAddress.prop("disabled", true);
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
            $fn.xHeaderDetails.PayeeSubTypeCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.CurrencyCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.SalutationCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.NameSuffixCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.GenderCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.CivilStatusCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.NationalityCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.ReligionCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.LocationTypeCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.AreaCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.StandardBarangayCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.MunicipalityCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.ProvinceCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.RegionCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.CountryCode.attr("disabled", "disabled");
            //PERMA
            $fn.xHeaderDetails.StandardBarangayCode2.attr("disabled", "disabled");
            $fn.xHeaderDetails.MunicipalityCode2.attr("disabled", "disabled");
            $fn.xHeaderDetails.ProvinceCode2.attr("disabled", "disabled");
            $fn.xHeaderDetails.RegionCode2.attr("disabled", "disabled");
            $fn.xHeaderDetails.CountryCode2.attr("disabled", "disabled");

            $fn.xHeaderDetails.InternationalSubGroupCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.InternationalGroupCode.attr("disabled", "disabled");
            $fn.xHeaderDetails.BankCode.attr("disabled", "disabled");
            /**************************/
        },

        /* Enable all Lookup Codes */
        xEnableAllLookupCode: function () {
            $fn.xHeaderDetails.PayeeSubTypeCode.removeAttr("disabled");
            $fn.xHeaderDetails.CurrencyCode.removeAttr("disabled");
            $fn.xHeaderDetails.SalutationCode.removeAttr("disabled");
            $fn.xHeaderDetails.NameSuffixCode.removeAttr("disabled");
            $fn.xHeaderDetails.GenderCode.removeAttr("disabled");
            $fn.xHeaderDetails.CivilStatusCode.removeAttr("disabled");
            $fn.xHeaderDetails.NationalityCode.removeAttr("disabled");
            $fn.xHeaderDetails.ReligionCode.removeAttr("disabled");
            $fn.xHeaderDetails.AreaCode.removeAttr("disabled");
            $fn.xHeaderDetails.StandardBarangayCode.removeAttr("disabled");
            $fn.xHeaderDetails.MunicipalityCode.removeAttr("disabled");
            //PERMA
            $fn.xHeaderDetails.AreaCode2.removeAttr("disabled");
            $fn.xHeaderDetails.StandardBarangayCode2.removeAttr("disabled");
            $fn.xHeaderDetails.MunicipalityCode2.removeAttr("disabled");

            $fn.xHeaderDetails.BankCode.removeAttr("disabled");
            /**************************/
        },

        /* ON CLICK EVENTS */
        xOnClickEvents: {

            /* For Tax Registration Type Radio Buttons */
            xRadioButtonTaxRegTrigger: function () {
                let Individual = $fn.xHeaderDetails.Individual.is(":checked");

                if (Individual == true) {
                    $fn.xHeaderDetails.PayeeSubTypeCode.removeAttr("disabled");
                    $fn.xHeaderDetails.CurrencyCode.removeAttr("disabled");
                    $fn.xHeaderDetails.SalutationCode.removeAttr("disabled");
                    $fn.xHeaderDetails.NameSuffixCode.removeAttr("disabled");
                    $fn.xHeaderDetails.GenderCode.removeAttr("disabled");
                    $fn.xHeaderDetails.CivilStatusCode.removeAttr("disabled");
                    $fn.xHeaderDetails.NationalityCode.removeAttr("disabled");
                    $fn.xHeaderDetails.ReligionCode.removeAttr("disabled");
                    $fn.xHeaderDetails.LocationTypeCode.removeAttr("disabled");
                    $fn.xHeaderDetails.AreaCode.removeAttr("disabled");
                    $fn.xHeaderDetails.StandardBarangayCode.removeAttr("disabled");
                    $fn.xHeaderDetails.MunicipalityCode.removeAttr("disabled");
                    //PERMA
                    $fn.xHeaderDetails.AreaCode2.removeAttr("disabled");
                    $fn.xHeaderDetails.StandardBarangayCode2.removeAttr("disabled");
                    $fn.xHeaderDetails.MunicipalityCode2.removeAttr("disabled");

                    $fn.xHeaderDetails.BankCode.removeAttr("disabled");
                    $fn.xHeaderDetails.LocationTypeCode.attr("disabled", "disabled");
                }
                else {
                    $fn.xHeaderDetails.SalutationCode.attr("disabled", "disabled");
                    $fn.xHeaderDetails.NameSuffixCode.attr("disabled", "disabled");
                    $fn.xHeaderDetails.GenderCode.attr("disabled", "disabled");
                    $fn.xHeaderDetails.CivilStatusCode.attr("disabled", "disabled");
                    $fn.xHeaderDetails.NationalityCode.attr("disabled", "disabled");
                    $fn.xHeaderDetails.ReligionCode.attr("disabled", "disabled");
                    $fn.xHeaderDetails.LocationTypeCode.attr("disabled", "disabled");
                }
            },

            /* For Checkbox in Full Address */
            xCheckBoxFullAddressTrigger: function () {
                let cbFullAddress = $fn.xHeaderDetails.FullAddressCheckbox.is(":checked");

                if (cbFullAddress == true) {
                    $fn.xHeaderDetails.FullAddress.prop("disabled", false);
                    $fn.xHeaderDetails.UnitNo.prop("disabled", true);
                    $fn.xHeaderDetails.FloorNo.prop("disabled", true);
                    $fn.xHeaderDetails.BuildingNo.prop("disabled", true);
                    $fn.xHeaderDetails.EstablishmentName.prop("disabled", true);
                    $fn.xHeaderDetails.BuildingName.prop("disabled", true);
                    $fn.xHeaderDetails.Landmark.prop("disabled", true);
                    $fn.xHeaderDetails.StreetNo.prop("disabled", true);
                    $fn.xHeaderDetails.StreetName.prop("disabled", true);
                    $fn.xHeaderDetails.Lot.prop("disabled", true);
                    $fn.xHeaderDetails.Block.prop("disabled", true);
                    $fn.xHeaderDetails.Phase.prop("disabled", true);
                    $fn.xHeaderDetails.Subdivision.prop("disabled", true);
                    $fn.xHeaderDetails.Zone.prop("disabled", true);
                    //$fn.xHeaderDetails.LugArea.enable(false);
                    //$fn.xHeaderDetails.LugStandardBarangay.enable(false);
                    //$fn.xHeaderDetails.AlternativeBarangay.prop("disabled", true);
                    //$fn.xHeaderDetails.LugMunicipality.enable(false);
                    //$fn.xHeaderDetails.ZipCode.prop("disabled", true);

                    $fn.xHeaderDetails.FullAddressClass.show();
                    $fn.xHeaderDetails.LandmarkClass.hide();
                    $fn.xHeaderDetails.StreetNameClass.hide();
                    $fn.xHeaderDetails.SubdivisionClass.hide();
                    //$fn.xHeaderDetails.StandardBarangayClass.hide();
                    //$fn.xHeaderDetails.AlternativeBarangayClass.hide();
                    //$fn.xHeaderDetails.MunicipalityClass.hide();

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
                    //$fn.xHeaderDetails.AreaCode.val('');
                    //$fn.xHeaderDetails.AreaDesc.val('');
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
                    $fn.xHeaderDetails.FullAddress.prop("disabled", true);
                    $fn.xHeaderDetails.UnitNo.prop("disabled", false);
                    $fn.xHeaderDetails.FloorNo.prop("disabled", false);
                    $fn.xHeaderDetails.BuildingNo.prop("disabled", false);
                    $fn.xHeaderDetails.EstablishmentName.prop("disabled", false);
                    $fn.xHeaderDetails.BuildingName.prop("disabled", false);
                    $fn.xHeaderDetails.Landmark.prop("disabled", false);
                    $fn.xHeaderDetails.StreetNo.prop("disabled", false);
                    $fn.xHeaderDetails.StreetName.prop("disabled", false);
                    $fn.xHeaderDetails.Lot.prop("disabled", false);
                    $fn.xHeaderDetails.Block.prop("disabled", false);
                    $fn.xHeaderDetails.Phase.prop("disabled", false);
                    $fn.xHeaderDetails.Subdivision.prop("disabled", false);
                    $fn.xHeaderDetails.Zone.prop("disabled", false);
                    $fn.xHeaderDetails.LugArea.enable(true);
                    $fn.xHeaderDetails.LugStandardBarangay.enable(true);
                    $fn.xHeaderDetails.AlternativeBarangay.prop("disabled", false);
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
            },

            /* For Checkbox in Full Address */
            xCheckBoxFullAddressTrigger2: function () {
                let cbFullAddress2 = $fn.xHeaderDetails.FullAddressCheckbox2.is(":checked");

                if (cbFullAddress2 == true) {
                    $fn.xHeaderDetails.FullAddress2.enable(true);
                    $fn.xHeaderDetails.UnitNo2.prop("disabled", true);
                    $fn.xHeaderDetails.FloorNo2.prop("disabled", true);
                    $fn.xHeaderDetails.BuildingNo2.prop("disabled", true);
                    $fn.xHeaderDetails.EstablishmentName2.prop("disabled", true);
                    $fn.xHeaderDetails.BuildingName2.prop("disabled", true);
                    $fn.xHeaderDetails.Landmark2.prop("disabled", true);
                    $fn.xHeaderDetails.StreetNo2.prop("disabled", true);
                    $fn.xHeaderDetails.StreetName2.prop("disabled", true);
                    $fn.xHeaderDetails.Lot2.prop("disabled", true);
                    $fn.xHeaderDetails.Block2.prop("disabled", true);
                    $fn.xHeaderDetails.Phase2.prop("disabled", true);
                    $fn.xHeaderDetails.Subdivision2.prop("disabled", true);
                    $fn.xHeaderDetails.Zone2.prop("disabled", true);
                    //$fn.xHeaderDetails.LugArea.enable(false);
                    //$fn.xHeaderDetails.LugStandardBarangay2.enable(false);
                    //$fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", true);
                    //$fn.xHeaderDetails.LugMunicipality2.enable(false);
                    //$fn.xHeaderDetails.ZipCode2.prop("disabled", true);
                    //$fn.xHeaderDetails.ZipCode2.enable(false);

                    $fn.xHeaderDetails.FullAddressClass2.show();
                    $fn.xHeaderDetails.LandmarkClass2.hide();
                    $fn.xHeaderDetails.StreetNameClass2.hide();
                    $fn.xHeaderDetails.SubdivisionClass2.hide();
                    //$fn.xHeaderDetails.StandardBarangayClass2.hide();
                    //$fn.xHeaderDetails.AlternativeBarangayClass2.hide();
                    $fn.xHeaderDetails.MunicipalityClass2.hide();

                    $fn.xHeaderDetails.UnitNo2.val('');
                    $fn.xHeaderDetails.FloorNo2.val('');
                    $fn.xHeaderDetails.BuildingNo2.val('');
                    $fn.xHeaderDetails.EstablishmentName2.val('');
                    $fn.xHeaderDetails.BuildingName2.val('');
                    $fn.xHeaderDetails.Landmark2.val('');
                    $fn.xHeaderDetails.StreetNo2.val('');
                    $fn.xHeaderDetails.StreetName2.val('');
                    $fn.xHeaderDetails.Lot2.val('');
                    $fn.xHeaderDetails.Block2.val('');
                    $fn.xHeaderDetails.Phase2.val('');
                    $fn.xHeaderDetails.Subdivision2.val('');
                    $fn.xHeaderDetails.Zone2.val('');
                    //$fn.xHeaderDetails.AreaCode.val('');
                    //$fn.xHeaderDetails.AreaDesc.val('');
                    $fn.xHeaderDetails.LugStandardBarangay2.val('');
                    //$fn.xHeaderDetails.StandardBarangayDesc2.val('');
                    $fn.xHeaderDetails.AlternativeBarangay2.val('');
                    $fn.xHeaderDetails.LugMunicipality2.val('');
                    //$fn.xHeaderDetails.MunicipalityDesc2.val('');


                    $fn.xHeaderDetails.LugProvince2.val('');
                    //$fn.xHeaderDetails.ProvinceDesc2.val('');
                    $fn.xHeaderDetails.LugRegion2.val('');
                    //$fn.xHeaderDetails.RegionDesc2.val('');
                    $fn.xHeaderDetails.LugCountry2.val('');
                    //$fn.xHeaderDetails.CountryDesc2.val('');
                    //$fn.xHeaderDetails.InternationalSubGroupCode2.val('');
                    //$fn.xHeaderDetails.InternationalSubGroupDesc2.val('');
                    //$fn.xHeaderDetails.InternationalGroupCode2.val('');
                    //$fn.xHeaderDetails.InternationalGroupDesc2.val('');
                    $fn.xHeaderDetails.StandardBarangayCode2.val('');
                    $fn.xHeaderDetails.StandardBarangayDesc2.val('');
                    $fn.xHeaderDetails.AlternativeBarangay2.val('');
                    $fn.xHeaderDetails.MunicipalityCode2.val('');
                    $fn.xHeaderDetails.MunicipalityDesc2.val('');
                    $fn.xHeaderDetails.ProvinceCode2.val('');
                    $fn.xHeaderDetails.ProvinceDesc2.val('');
                    $fn.xHeaderDetails.RegionCode2.val('');
                    $fn.xHeaderDetails.RegionDesc2.val('');
                    $fn.xHeaderDetails.CountryCode2.val('');
                    $fn.xHeaderDetails.CountryDesc2.val('');


                    $fn.xHeaderDetails.ZipCode2.val('');
                }
                else {
                    $fn.xHeaderDetails.FullAddress2.enable(false);
                    $fn.xHeaderDetails.UnitNo2.prop("disabled", false);
                    $fn.xHeaderDetails.FloorNo2.prop("disabled", false);
                    $fn.xHeaderDetails.BuildingNo2.prop("disabled", false);
                    $fn.xHeaderDetails.EstablishmentName2.prop("disabled", false);
                    $fn.xHeaderDetails.BuildingName2.prop("disabled", false);
                    $fn.xHeaderDetails.Landmark2.prop("disabled", false);
                    $fn.xHeaderDetails.StreetNo2.prop("disabled", false);
                    $fn.xHeaderDetails.StreetName2.prop("disabled", false);
                    $fn.xHeaderDetails.Lot2.prop("disabled", false);
                    $fn.xHeaderDetails.Block2.prop("disabled", false);
                    $fn.xHeaderDetails.Phase2.prop("disabled", false);
                    $fn.xHeaderDetails.Subdivision2.prop("disabled", false);
                    $fn.xHeaderDetails.Zone2.prop("disabled", false);
                    $fn.xHeaderDetails.LugArea2.enable(true);
                    $fn.xHeaderDetails.LugStandardBarangay2.enable(true);
                    $fn.xHeaderDetails.AlternativeBarangay2.prop("disabled", false);
                    $fn.xHeaderDetails.AlternativeBarangay2.enable(true);
                    //$fn.xHeaderDetails.LugMunicipality2.enable(true);

                    $fn.xHeaderDetails.ZipCode2.enable(true);

                    $fn.xHeaderDetails.FullAddressClass2.hide();
                    $fn.xHeaderDetails.LandmarkClass2.show();
                    $fn.xHeaderDetails.StreetNameClass2.show();
                    $fn.xHeaderDetails.SubdivisionClass2.show();
                    $fn.xHeaderDetails.StandardBarangayClass2.show();
                    $fn.xHeaderDetails.AlternativeBarangayClass2.show();
                    $fn.xHeaderDetails.MunicipalityClass2.show();
                }
            }

        },



        /* ON KEYUP EVENTS */
        xOnKeyUpEvents: {

            xFullAddressValue: function () {
                let unitno = $fn.xHeaderDetails.UnitNo.val();
                let flrno = $fn.xHeaderDetails.FloorNo.val();
                let bldgno = $fn.xHeaderDetails.BuildingNo.val();
                let bldg = $fn.xHeaderDetails.BuildingName.val();
                let landmark = $fn.xHeaderDetails.Landmark.val();
                let StreetNo = $fn.xHeaderDetails.StreetNo.val();
                let StreetName = $fn.xHeaderDetails.StreetName.val();
                let Lot = $fn.xHeaderDetails.Lot.val();
                let Block = $fn.xHeaderDetails.Block.val();
                let Phase = $fn.xHeaderDetails.Phase.val();
                let Subdivision = $fn.xHeaderDetails.Subdivision.val();
                let Zone = $fn.xHeaderDetails.Zone.val();
                let Area = $fn.xHeaderDetails.AreaDesc.val();
                let StandardBarangay = $fn.xHeaderDetails.StandardBarangayDesc.val();
                let AlternativeBarangay = $fn.xHeaderDetails.AlternativeBarangay.val();
                let Municipality = $fn.xHeaderDetails.MunicipalityDesc.val();
                let Province = $fn.xHeaderDetails.ProvinceDesc.val();
                let Region = $fn.xHeaderDetails.RegionDesc.val();
                let Couintry = $fn.xHeaderDetails.CountryDesc.val();
                let Zipcode = $fn.xHeaderDetails.ZipCode.val();
                let cbFullAddress = $fn.xHeaderDetails.FullAddressCheckbox.is(":checked");
                let FullAddress = '';

                if (unitno.length > 0)
                    unitno = unitno + ' ';
                if (flrno.length > 0)
                    flrno = flrno + ' ';
                if (bldgno.length > 0)
                    bldgno = bldgno + ' ';
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
                if (Phase.length > 0)
                    Phase = Phase + ' ';
                if (Subdivision.length > 0)
                    Subdivision = Subdivision + ', ';
                if (Zone.length > 0)
                    Zone = Zone + ', ';
                if (Area.length > 0)
                    Area = Area + ', ';
                if (StandardBarangay.length > 0)
                    StandardBarangay = StandardBarangay + ', ';
                if (AlternativeBarangay.length > 0)
                    AlternativeBarangay = AlternativeBarangay + ', ';
                if (Municipality.length > 0)
                    Municipality = Municipality.replace(',', '') + ' ';
                if (Province.length > 0)
                    Province = Province.replace(',', '') + ' ';
                if (Region.length > 0)
                    Region = Region.replace(',', '') + ' ';
                if (Couintry.length > 0)
                    Couintry = Couintry.replace(',', '') + ' ';
                if (Zipcode.length > 0)
                    Zipcode = Zipcode.replace(',', '') + ' ';

                if (cbFullAddress == true) {
                    //$fn.xHeaderDetails.FullAddress.val('');
                }
                else {
                    FullAddress = unitno + flrno + bldgno + bldg + landmark + StreetNo + StreetName + Lot + Block + Phase + Subdivision + Zone + Area + StandardBarangay + AlternativeBarangay + Municipality + Province + Region + Couintry + Zipcode;
                    $fn.xHeaderDetails.FullAddress.val(FullAddress);
                }


            },

            xFullAddressValue2: function () {
                let unitno2 = $fn.xHeaderDetails.UnitNo2.val();
                let flrno2 = $fn.xHeaderDetails.FloorNo2.val();
                let bldgno2 = $fn.xHeaderDetails.BuildingNo2.val();
                let bldg2 = $fn.xHeaderDetails.BuildingName2.val();
                let landmark2 = $fn.xHeaderDetails.Landmark2.val();
                let StreetNo2 = $fn.xHeaderDetails.StreetNo2.val();
                let StreetName2 = $fn.xHeaderDetails.StreetName2.val();
                let Lot2 = $fn.xHeaderDetails.Lot2.val();
                let Block2 = $fn.xHeaderDetails.Block2.val();
                let Phase2 = $fn.xHeaderDetails.Phase2.val();
                let Subdivision2 = $fn.xHeaderDetails.Subdivision2.val();
                let Zone2 = $fn.xHeaderDetails.Zone2.val();
                let Area2 = $fn.xHeaderDetails.AreaDesc2.val();




                let StandardBarangay2 = $fn.xHeaderDetails.StandardBarangayDesc2.val();
                let AlternativeBarangay2 = $fn.xHeaderDetails.AlternativeBarangay2.val();
                let Municipality2 = $fn.xHeaderDetails.MunicipalityDesc2.val();
                let Province2 = $fn.xHeaderDetails.ProvinceDesc2.val();
                let Region2 = $fn.xHeaderDetails.RegionDesc2.val();
                let Country2 = $fn.xHeaderDetails.CountryDesc2.val();
                let ZipCode2 = $fn.xHeaderDetails.ZipCode2.val();
                let cbFullAddress2 = $fn.xHeaderDetails.FullAddressCheckbox2.is(":checked");
                let FullAddress2 = '';




                if (unitno2.length > 0)
                    unitno2 = unitno2 + ' ';
                if (flrno2.length > 0)
                    flrno2 = flrno2 + ' ';
                if (bldgno2.length > 0)
                    bldgno2 = bldgno2 + ' ';
                if (bldg2.length > 0)
                    bldg2 = bldg2 + ' ';
                if (landmark2.length > 0)
                    landmark2 = landmark2 + ' ';
                if (StreetNo2.length > 0)
                    StreetNo2 = StreetNo2 + ' ';
                if (StreetName2.length > 0)
                    StreetName2 = StreetName2 + ', ';
                if (Lot2.length > 0)
                    Lot2 = Lot2 + ' ';
                if (Block2.length > 0)
                    Block2 = Block2 + ' ';
                if (Phase2.length > 0)
                    Phase2 = Phase2 + ' ';
                if (Subdivision2.length > 0)
                    Subdivision2 = Subdivision2 + ', ';
                if (Zone2.length > 0)
                    Zone2 = Zone2 + ', ';
                if (Area2.length > 0)
                    Area2 = Area2 + ', ';
                if (StandardBarangay2.length > 0)
                    StandardBarangay2 = StandardBarangay2 + ', ';
                if (AlternativeBarangay2.length > 0)
                    AlternativeBarangay2 = AlternativeBarangay2 + ', ';
                if (Municipality2.length > 0)
                    Municipality2 = Municipality2.replace(',', '') + ' ';
                if (Province2.length > 0)
                    Province2 = Province2.replace(',', '') + ' ';
                if (Region2.length > 0)
                    Region2 = Region2.replace(',', '') + ' ';
                if (Country2.length > 0)
                    Country2 = Country2.replace(',', '') + ' ';
                if (ZipCode2.length > 0)
                    ZipCode2 = ZipCode2.replace(',', '') + ' ';

                if (cbFullAddress2 == true) {
                    //$fn.xHeaderDetails.FullAddress.val('');
                }
                else {
                    FullAddress2 = unitno2 + flrno2 + bldgno2 + bldg2 + landmark2 + StreetNo2 + StreetName2 + Lot2 + Block2 + Phase2 + Subdivision2 + Zone2 + Area2 + StandardBarangay2 + AlternativeBarangay2 + Municipality2 + Province2 + Region2 + Country2 + ZipCode2;
                    $fn.xHeaderDetails.FullAddress2.val(FullAddress2);
                }


            }

        }

    }
    return $fn;
}


function validateAltbrgy(input) {
    // Remove non-numeric characters

    if (input.value != "") {
        $('#lugStdBarangay').enable(false);
        $('#idvallugStdBarangay,#descvallugStdBarangay,#idvallugMunicipality,#descvallugMunicipality,#idvallugProvince,#descvallugProvince,#idvallugRegion,#descvallugRegion,#idvallugCountry,#descvallugCountry').val('');
    }
    else {
        $('#lugStdBarangay').enable(true);
        $('#txtAltBrgy').val('');
    }


}
function validateVatInput() {
    var Birthdateold = $('#txtNonVATRegTin').val();
    var inputValue = Birthdateold.value.trim();

    // Check if the input length is less than 9 characters
    if (inputValue.length < 9) {
        // Display a message box if the input length is less than 9
        MessageBox("Cannot be Save. Vat Reg Tin must be at least 9 characters long", pageTitle, "error");
    }
}
function validateNonVatInput() {
    var Birthdateold = $('#txtVATRegTin').val();
    var inputValue = Birthdateold.value.trim();

    // Check if the input length is less than 9 characters
    if (inputValue.length < 9) {
        // Display a message box if the input length is less than 9
        MessageBox("Cannot be Save. Vat Reg Tin must be at least 9 characters long", pageTitle, "error");
    }
}

function validateAltbrgy1(input) {
    // Remove non-numeric characters

    if (input.value != "") {
        $('#lugStdBarangay2').enable(false);
        $('#idvallugStdBarangay2,#descvallugStdBarangay2,#idvallugMunicipality2,#descvallugMunicipality2,#idvallugProvince2,#descvallugProvince2,#idvallugRegion2,#descvallugRegion2,#idvallugCountry2,#descvallugCountry2').val('');
    }
    else {
        $('#lugStdBarangay2').enable(true);
        $('#txtAltBrgy2').val('');
    }


}

$(document).on("keyup keydown keypress", "#txtVat, #txtNonVat", function (e) {
    var sss = $(this).val();
    var sssNoD = $(this).val().replaceAll("-", "");
    var x = e.keyCode;
    var xfirst = sss.charAt(0);
    var xlatest = sss.charAt(sss.length - 1);
    if ((x != 110 && x != 190) && ((x >= 48 && x <= 57) || (x >= 96 && x <= 105)) || x == 8 || ((x == 189 || x == 109) && (xlatest != "-" && xfirst != "")) || (x == 45 && (xlatest != "-" && xfirst != ""))) {
        if (sssNoD.length >= 14 && x != 8) {
            return false;
        }
    }
    else {
        return false;
    }
});