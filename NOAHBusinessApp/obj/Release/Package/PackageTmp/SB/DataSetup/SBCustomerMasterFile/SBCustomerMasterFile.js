let $DateToday = "";

var dtls = [];
var ctr1 = 0, ctr2 = 0, ctr3 = 0;
function func_Reload() {
    crLnk = "../SBCustomerMasterFile/SBCustomerMasterFile_Gateway";
    crLnkGateKey = "SBCustomerMasterFile";
    nwPopupForm_Create("nwCaptureForm");
    //create frame form
    nwPopupForm_Create("nwFrameForm");

    nwPopupForm_Create("nwUploadCon");
    nwPopupForm_Create("nwDesiredProperty");

    $(".txtTIN").mask('999-999-999-9999*');
    $("#txtVatRegTinCB").mask('999-999-999-99999');
    $("#txtNonVatRegTinCB").mask('999-999-999-99999');
    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();
    $("#noah-webui-Toolbox").bindingNew().visible(true);
    $("#noah-webui-Toolbox").bindingProcess().visible(false);

    SetDefaultIndividual();
    func_ActionDriven("actDesiredProperty", false);

    if (getParameterByName("nwCustno") != "") {
        Refresh();
    }

    return isContinue;
}


function Refresh() {
    $('#noah-webui-default-Refresh').click();
}


////////////////////////// TOol Box

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

    parent_MessageBoxQuestionToolBox("Would you like to save the current record(s)?", "Customer Information", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to delete the current record(s)?", "Customer Information", "", indef, enume);
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
    parent_MessageBoxQuestionToolBox("Would you like to process the current record(s)?", "Customer Information", "", indef, enume);
    isContinue = false;
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
    cust_GetPara();
    //tableToPrint("nwGridCon");
    //parent_MessageBox("Export","Export Sucess","");
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
    //  nwParameter_Add("approvalView", getParameterByName("rtype") == "0" ? true : false); //JEA
    nwParameter_Add("ddlsales", $('#ddlSourceofSale').val());
    nwParameter_Add("_url", getParameterByName("emp") || "");
    nwParameter_Add("nwCom", getParameterByName("nwCom"));
    nwParameter_Add("getCSD", $("#getCSD").val());

    var comp = "";
    var rname = "";
    var tname = ""; var fulladdress = "";
    var indiv = ""; var barangay = ""; var municipality = ""; var province = "";
    var zipcode = ""; var region = ""; var country = ""; var homeown = ""; var loctype = "";
    var landline = ""; var local = ''; var mobile = ''; var email = '';
    var isfull = false, reqbrgy = false;

    if ($('#cbIndividual').prop("checked") == true)//Individual
    {
        comp = false;
        indiv = true;
        province = $("#cmbProvince").val(); zipcode = $("#txtZipCode").val(); region = $("#txtRegionCode").val();
        municipality = $("#txtMunicipality").val() == "" ? $("#cmbMunicipality").val() : $("#txtMunicipality").val();
        barangay = $("#txtBarangay").val() == "" ? $("#cmbBarangay").val() : $("#txtBarangay").val();
        rname = $("#txtFullName").val(); tname = $("#txtFullName").val();
        landline = $("#txtLandlineNo").val(); local = $("#txtLocalNo").val();
        mobile = $("#txtMobileNo").val(); email = $("#txtEmail").val();
        fulladdress = $("#txtFullAddress").val(); country = $("#txtCountryCode").val();
        homeown = $("#cmbHomeOwn").val(); loctype = $("#cmbLocType").val();
        isfull = $("#chkFullAddress").prop("checked");
    }
    if ($('#cbCompany').prop("checked") == true)//Corporate
    {
        comp = true;
        indiv = false;
        province = $("#cmbProvinceCB").val(); zipcode = $("#txtZipCodeCB").val(); region = $("#txtRegionCodeCB").val();
        municipality = $("#txtMunicipalityCB").val() == "" ? $("#cmbMunicipalityCB").val() : $("#txtMunicipalityCB").val();
        barangay = $("#txtBarangayCB").val() == "" ? $("#cmbBarangayCB").val() : $("#txtBarangayCB").val();
        rname = $("#txtRegNameCB").val(); tname = $("#txtTradeNameCB").val();
        landline = $("#txtLandlineNoCB").val(); local = $("#txtLocalNoCB").val();
        mobile = $("#txtMobileNoCB").val(); email = $("#txtEmailCB").val();
        fulladdress = $("#txtFullAddressCB").val(); country = $("#txtCountryCodeCB").val();
        homeown = $("#cmbHomeOwnCB").val(); loctype = $("#cmbLocTypeCB").val();
        isfull = $("#chkFullAddressCB").prop("checked");
    }

    if (isfull == true)
        reqbrgy = false;
    else
        reqbrgy = true;
    //Main 
    nwParameter_Add("Individual", indiv);
    nwParameter_Add("Company", comp);
    nwParameter_Add("cbVIP", $("#cbVIP").prop("checked"));
    nwParameter_Add("cbNewInquiry", $("#cbNewInquiry").prop("checked"));
    nwParameter_Add("cbNewReservation", $("#cbNewReservation").prop("checked"));
    nwParameter_Add("cbTransfer", $("#cbTransfer").prop("checked"));
    nwParameter_Add("txtCode", $("#txtCode").val());
    nwParameter_Add("txtCodeCrossReference", $("#txtCodeCrossReference").val());
    nwParameter_Add("cmbCustClass", $("#cmbCustClass").val());
    nwParameter_Add("cmbVIPType", $("#cmbVIPType").val());
    nwParameter_Add("txtRecStatus", $("#txtRecStatus").val());
    nwParameter_Add("txtStatus", $("#txtStatus").val());

    //Individual / Corporate (Main)
    nwParameter_Add("cmbHomeOwn", homeown);
    nwParameter_Add("cmbLocType", loctype);
    nwParameter_Add("isFullAddress", isfull);
    nwParameter_Add("reqbrgy", reqbrgy);
    nwParameter_Add("cbVATCB", $("#cbVATCB").prop("checked"));
    nwParameter_Add("cbNVatCB", $("#cbNVatCB").prop("checked"));
    nwParameter_Add("txtVatRegTinCB", $("#txtVatRegTinCB").val());
    nwParameter_Add("txtNonVatRegTinCB", $("#txtNonVatRegTinCB").val());
    nwParameter_Add("txtRegName", rname);
    nwParameter_Add("txtTradeName", tname);
    nwParameter_Add("chkRepresentativeCB", $("#chkRepresentativeCB").val());
    nwParameter_Add("chkCoowner", $("#chkCoowner").prop('checked'));
    nwParameter_Add("txtLastName", $("#txtLastName").val());
    nwParameter_Add("txtFirstName", $("#txtFirstName").val());
    nwParameter_Add("txtMiddleName", $("#txtMiddleName").val());
    nwParameter_Add("txtmri", $("#txtmri").val());
    nwParameter_Add("cmbSuffix", $("#cmbSuffix").val());
    nwParameter_Add("cmbSalutation", $("#cmbSalutation").val());
    nwParameter_Add("cmbGender", $("#cmbGender").val());
    nwParameter_Add("txtMothersMaiden", $("#txtMothersMaiden").val());
    nwParameter_Add("txtBday", $("#txtBday").val());
    nwParameter_Add("txtAge", $("#txtStatus").val());
    nwParameter_Add("txtPlaceBirth", $("#txtPlaceBirth").val());
    nwParameter_Add("cmbCivilStatus", $("#cmbCivilStatus").val());
    nwParameter_Add("cmbNationality", $("#cmbNationality").val());
    nwParameter_Add("txtTIN", $("#txtTIN").val());
    nwParameter_Add("cmbOccupation", $("#cmbOccupation").val());
    nwParameter_Add("cmbPaymentOption", $("#cmbPaymentOption").val());
    nwParameter_Add("txtLandlineNo", landline);
    nwParameter_Add("txtLocalNo", local);
    nwParameter_Add("txtMobileNo", mobile);
    nwParameter_Add("txtEmail", email);
    nwParameter_Add("txtFullAddress", fulladdress);
    nwParameter_Add("cmbProvince", province);
    nwParameter_Add("cmbBarangay", barangay);
    nwParameter_Add("cmbMunicipality", municipality);
    nwParameter_Add("txtZipCode", zipcode);
    nwParameter_Add("txtRegionCode", region);
    nwParameter_Add("txtCountryCode", country);
    nwParameter_Add("cmbNatureOfBusinessCB", $("#cmbNatureOfBusinessCB").val());
    nwParameter_Add("cmbBusinessTypeCB", $("#cmbBusinessTypeCB").val());

    //Spouse Info
    nwParameter_Add("txtLastNameSP", $("#txtLastNameSP").val());
    nwParameter_Add("txtFirstNameSP", $("#txtFirstNameSP").val());
    nwParameter_Add("txtMiddleNameSP", $("#txtMiddleNameSP").val());
    nwParameter_Add("txtmriSP", $("#txtmriSP").val());
    nwParameter_Add("cmbSuffixSP", $("#cmbSuffixSP").val());
    nwParameter_Add("cmbSalutationSP", $("#cmbSalutationSP").val());
    nwParameter_Add("cmbGenderSP", $("#cmbGenderSP").val());
    nwParameter_Add("txtMothersMaidenSP", $("#txtMothersMaidenSP").val());
    nwParameter_Add("txtBdaySP", $("#txtBdaySP").val());
    nwParameter_Add("txtAgeSP", $("#txtAgeSP").val());
    nwParameter_Add("txtTINSP", $("#txtTINSP").val());
    nwParameter_Add("txtDateMarriageSP", $("#txtDateMarriageSP").val());
    nwParameter_Add("cmbNationalitySP", $("#cmbNationalitySP").val());
    nwParameter_Add("cmbOccupationSP", $("#cmbOccupationSP").val());
    nwParameter_Add("txtCompanySP", $("#txtCompanySP").val());
    nwParameter_Add("cmbNatureOfBusinessCB", $("#cmbNatureOfBusinessCB").val());


    //Employment Info
    nwParameter_Add("cmbEmpSubTypeEMP", $("#cmbEmpSubTypeEMP").val());
    nwParameter_Add("cmbEmpStatusEMP", $("#cmbEmpAreaEMP").val());
    nwParameter_Add("txtProfessionEMP", $("#txtProfessionEMP").val());
    nwParameter_Add("cmbNatureOfBusinessEMP", $("#cmbNatureOfBusinessEMP").val());
    nwParameter_Add("txtEmployerNameEMP", $("#txtEmployerNameEMP").val());
    nwParameter_Add("txtEmployerAddressEMP", $("#txtEmployerAddressEMP").val());
    nwParameter_Add("txtEmployerContactEMP", $("#txtEmployerContactEMP").val());
    nwParameter_Add("cmbPersonalIncomeEMP", $("#cmbPersonalIncomeEMP").val());
    nwParameter_Add("cmbHouseholdIncomeEMP", $("#cmbHouseholdIncomeEMP").val());
    nwParameter_Add("txtPositionEMP", $("#txtPositionEMP").val());

    //Coowner Info
    nwParameter_Add("txtLastNameCO", $("#txtLastNameCO").val());
    nwParameter_Add("txtFirstNameCO", $("#txtFirstNameCO").val());
    nwParameter_Add("txtMiddleNameCO", $("#txtMiddleNameCO").val());
    nwParameter_Add("txtmriCO", $("#txtmriCO").val());
    nwParameter_Add("cmbSuffixCO", $("#cmbSuffixCO").val());
    nwParameter_Add("cmbRelationshipCO", $("#cmbRelationshipCO").val());
    nwParameter_Add("cmbGenderCO", $("#cmbGenderCO").val());
    nwParameter_Add("coOwnerBday", $("#txtBdayCO").val());
    nwParameter_Add("txtAgeCO", $("#txtAgeCO").val());
    nwParameter_Add("txtPlaceBirthCO", $("#txtPlaceBirthCO").val());
    nwParameter_Add("cmbCivilStatusCO", $("#cmbCivilStatusCO").val());
    nwParameter_Add("cmbNationalityCO", $("#cmbNationalityCO").val());
    nwParameter_Add("txtTINCO", $("#txtTINCO").val());
    nwParameter_Add("txtResidentialAddressCO", $("#txtResidentialAddressCO").val());
    nwParameter_Add("txtProvincialAddressCO", $("#txtProvincialAddressCO").val());
    nwParameter_Add("txtLandlineNoCO", $("#txtLandlineNoCO").val());
    nwParameter_Add("txtLocalNoCO", $("#txtLocalNoCO").val());
    nwParameter_Add("txtMobileNoCO", $("#txtMobileNoCO").val());
    nwParameter_Add("txtEmailCO", $("#txtEmailCO").val());
    nwParameter_Add("txtEmployerNameCO", $("#txtEmployerNameCO").val());
    nwParameter_Add("txtEmployerAddressCO", $("#txtEmployerAddressCO").val());
    nwParameter_Add("txtEmployerContactCO", $("#txtEmployerAddressCO").val());
    nwParameter_Add("cmbHomeOwnCO", $("#cmbHomeOwnCOD").val());
    nwParameter_Add("txtRowID", $("#txtRowID").val());
    nwParameter_Add("txtPositionCO", $("#txtPositionCO").val());

    //Coowner Spouse
    nwParameter_Add("txtLastNameCOS", $("#txtLastNameCOS").val());
    nwParameter_Add("txtFirstNameCOS", $("#txtFirstNameCOS").val());
    nwParameter_Add("txtMiddleNameCOS", $("#txtMiddleNameCOS").val());
    nwParameter_Add("txtmriCOS", $("#txtmriCOS").val());
    nwParameter_Add("cmbSuffixCOS", $("#cmbSuffixCOS").val());
    nwParameter_Add("cmbSalutationCOS", $("#cmbSalutationCOS").val());
    nwParameter_Add("txtGenderCOS", $("#txtGenderCOS").val());
    nwParameter_Add("txtBdayCOS", $("#txtBdayCOS").val());
    nwParameter_Add("txtAgeCOS", $("#txtAgeCOS").val());
    nwParameter_Add("txtTINCOS", $("#txtTINCOS").val());
    nwParameter_Add("txtDateMarriageCOS", $("#txtDateMarriageCOS").val());
    nwParameter_Add("cmbNationalityCOS", $("#cmbNationalityCOS").val());
    nwParameter_Add("cmbOccupationCOS", $("#cmbOccupationCOS").val());
    nwParameter_Add("txtspouseID", $("#txtspouseID").val());

    //Attorney in-fact
    nwParameter_Add("txtLastNameAF", $("#txtLastNameAF").val());
    nwParameter_Add("txtFirstNameAF", $("#txtFirstNameAF").val());
    nwParameter_Add("txtMiddleNameAF", $("#txtMiddleNameAF").val());
    nwParameter_Add("txtmriAF", $("#txtmriAF").val());
    nwParameter_Add("cmbSuffixAF", $("#cmbSuffixAF").val());
    nwParameter_Add("txtEffectiveDateFromAF", $("#txtEffectiveDateFromAF").val());
    nwParameter_Add("txtEffectiveDateToAF", $("#txtEffectiveDateToAF").val());
    nwParameter_Add("cmbRelationshipAF", $("#cmbRelationshipAF").val());
    nwParameter_Add("cmbGenderAF", $("#cmbGenderAF").val());
    nwParameter_Add("txtBdayAF", $("#txtBdayAF").val());
    nwParameter_Add("txtAgeAF", $("#txtAgeAF").val());
    nwParameter_Add("txtTINAF", $("#txtTINAF").val());
    nwParameter_Add("cmbNationalityAF", $("#cmbNationalityAF").val());
    nwParameter_Add("txtHomeAddressAF", $("#txtHomeAddressAF").val());
    nwParameter_Add("txtBusinessAddressAF", $("#txtBusinessAddressAF").val());
    nwParameter_Add("txtLandlineNoAF", $("#txtLandlineNoAF").val());
    nwParameter_Add("txtLocalNoAF", $("#txtLocalNoAF").val());
    nwParameter_Add("txtMobileNoAF", $("#txtMobileNoAF").val());
    nwParameter_Add("txtEmailAF", $("#txtEmailAF").val());
    nwParameter_Add("cmbCivilStatusAF", $("#cmbCivilStatusAF").val());

    //preference info
    nwParameter_Add("cmbReasonForBuyingPI", $("#cmbReasonForBuyingPI").val());
    nwParameter_Add("txtOthersReasonPI", $("#txtOthersReasonPI").val());
    nwParameter_Add("txtDesiredPropertyPI", $("#txtDesiredPropertyPI").val());
    nwParameter_Add("txtOthersDesiredPI", $("#txtOthersDesiredPI").val());
    nwParameter_Add("cmbSourceOfAwarenessPI", $("#cmbSourceOfAwarenessPI").val());
    nwParameter_Add("txtOthersSourceOfAwarenessPI", $("#txtOthersSourceOfAwarenessPI").val());
    nwParameter_Add("cmbPriceRangePI", $("#cmbPriceRangePI").val());
    nwParameter_Add("cbYes", $("#cbYes").prop("checked"));
    nwParameter_Add("cbNo", $("#cbNo").prop("checked"));
    nwParameter_Add("txtNamePI", $("#txtNamePI").val());
    nwParameter_Add("txtMobileNoPI", $("#txtMobileNoPI").val());
    nwParameter_Add("txtEmailPI", $("#txtEmailPI").val());
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara(); nwLoading_Start("actBindCollection", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("actBindCollectionEmpty", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}


///////////////////////////////////////
var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    if (idName == "toolboxInquire") {
    }
    else if (idName == "lugCivilStatus") {
        func_checkCivilStatus();
    }
    else if (idName == "lugSalutation") {
        nwParameter_Add("salutation", $('#idvallugSalutation').val());
        func_ActionDriven("actSalutation", false);
    }
    else if (idName == "lugNationality") {
        var validateNationality = $("#idvallugNationality").val();
        if (validateNationality == 'FIL' || validateNationality == 'FILIPINO') {
            $('.lblPassport').html("Passport ID No.");
        }
        else {
            $('.lblPassport').html("Passport ID No. <span class='nwRequiredField'>*</span>");
        }
    }
    else if (idName == "lugCustTag") {
        var isvip = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();
        $('#txtIsVIP').val(isvip);
        $('#idvallugVIPType').val('')
        $('#descvallugVIPType').val('')
        if (isvip == 1) {
            $('#lugVIPType').enable(true);

        } else {
            $('#lugVIPType').enable(false);

        }
    }
}

function EnableFields() {
    $(".btn-default").enable(true); //Buttons
    $(".fsMain").enable(true);

    $("#grpSalesTag ").enable(true);
    $("#grpCustomerTypes ").enable(true);
    $("#cmbCustClass ").enable(true);
    $("#cmbVIPType ").enable(true);

    $(".fsIndividual").enable(true);
    $(".fsSpouseInfo").enable(true);
    $(" .fsEmploymentInfo").enable(true);
    $(".fsCoownerInfo-dsbld").enable(true);
    $(".fsCoOwnerSpouseInfo").enable(true);
    $(".fsCorporate").enable(true);
    $(".fsAttyInfo").enable(true);
    $(" .fsPreferenceInfo").enable(true);
    $(".dsbld").enable(false);

    $("#btnReqCompliance").enable(false);
    $('#btnReqCompliance').removeClass('btnOrange');
    $('#btnReqCompliance').removeClass('btnGreen');
    $('#btnReqCompliance').addClass('btnGray');
}

function func_ChangeCustType(id, isClear) {
    if (isClear == true)

     var tempsellerCode = $("#txtCode").val();


    ClearFields();
    func_CustType();
    func_CheckIfVIP();
    CheckIfOthers("cmbReasonForBuyingPI");
    CheckIfOthers("txtDesiredPropertyPI");
    CheckIfOthers("cmbSourceOfAwarenessPI");
    $(".chkDesiredProperty").prop("checked", false);
    $("#txtCode").val(tempsellerCode);

}

function SetDefaultIndividual() {
    $(".fsIndividual").show();
    $(".fsSpouseInfo").hide();
    $(".fsEmploymentInfo").show();
    $(".fsCoownerInfo").hide();
    $(".fsCoOwnerSpouseInfo").hide();
    $(".fsCorporate").hide();
    $(".fsAttyInfo").hide();
}
function SetDefaultCorporate() {
    $(".fsIndividual").hide();
    $(".fsSpouseInfo").hide();
    $(".fsEmploymentInfo").hide();
    $(".fsCoownerInfo").hide();
    $(".fsCoOwnerSpouseInfo").hide();
    $(".fsCorporate").show();
    $(".fsAttyInfo").hide();

    func_VatRegType();
}
function func_CheckIfVIP() {
    if ($("#cbVIP").prop("checked")) {
        $('.reqVIP').css("display", "inline");
        $("#cmbVIPType").enable(true);
    }
    else {
        $('.reqVIP').css("display", "none");
        $("#cmbVIPType").enable(false);
        $("#cmbVIPType").val('');
    }
}
function func_CustType() {
    //Individual
    if ($("#cbIndividual").prop("checked")) {
        $('.reqVIP').css("display", "none");
        $("#cmbVIPType").enable(false);
        $("#cbVIP").enable(true);
        SetDefaultIndividual();
    }
    //Corporate/Company
    if ($("#cbCompany").prop("checked")) {
        $('.reqVIP').css("display", "none");
        $("#cmbVIPType").enable(false);
        $("#cbVIP").enable(true);
        SetDefaultCorporate();
        if ($("#txtEffectiveDateFromAF").val() == "") {
            var date = formatDate($DateToday);
            $("#txtEffectiveDateFromAF").val(date);
            $("#txtEffectiveDateToAF").val(date);
        }
    }
    //$('.chkFullAddress').prop("checked",false);
    //document.getElementById("cmbMunicipality").innerHTML = "";
    //document.getElementById("cmbBarangay").innerHTML = "";
    $('.txtFullAddress').enable(false);
    $('.cmbProvince').enable(true);
    $('.cmbMunicipality').enable(true);
    $('.cmbBarangay').enable(true);
    $('.cmbHomeOwn').enable(true);
    $('.cmbLocType').enable(true);
}

function CheckIfWithRepresentative() {
    if ($("#chkRepresentativeCB").prop("checked") == true && $("#cbCompany").prop("checked") == true)
        $(".fsAttyInfo").show();
    else
        $(".fsAttyInfo").hide();
}

function CheckIfWithCoowner() {
    if ($("#chkCoowner").prop("checked") == true && $("#cbIndividual").prop("checked") == true)
        $(".fsCoownerInfo").show();
    else
        $(".fsCoownerInfo").hide();

}

function func_VatRegType() {

    $('#txtVatRegTinCB').enable(false);
    $('#txtNonVatRegTinCB').enable(false);

    if ($("#cbVATCB").prop("checked")) {
        $('#txtVatRegTinCB').enable(true);
        $('#txtNonVatRegTinCB').enable(false);
    } else if ($("#cbNVatCB").prop("checked")) {
        $('#txtNonVatRegTinCB').enable(true);
        $('#txtVatRegTinCB').enable(false);
    }
}

function func_disableVatRegType() {
    $('#cbVAT').enable(false);
    $('#cbNVat').enable(false);
}


function func_ClearVatRegType() {
    $('#txtVatRegTinCB').val('');
    $('#txtNonVatRegTinCB').val('');

}

function func_ClickVatReg() {
    func_ClearVatRegType();
    func_VatRegType();
}


function DisableFields() {
    $(".btn-default").enable(false);
    //$(".fsMain").enable(false);
    //$(" .fsIndividual").enable(false);
    //$(" .fsSpouseInfo").enable(false);
    //$(" .fsEmploymentInfo").enable(false);
    //$(".fsCoownerInfo-dsbld").enable(false);
    //$(" .fsCoOwnerSpouseInfo").enable(false);
    //$(".fsCorporate").enable(false);
    //$(" .fsAttyInfo").enable(false);
    //$(".fsPreferenceInfo").enable(false);


    $("#btnReqCompliance").enable(false);
    $('#btnReqCompliance').removeClass('btnOrange');
    $('#btnReqCompliance').removeClass('btnGreen');
    $('#btnReqCompliance').addClass('btnGray');
}

function EnableFieldsDone() {//Binding Done

    $(".fsMain ").enable(true);
    $("#grpSalesTag ").enable(false);
    $("#grpCustomerTypes ").enable(false);
    $("#cmbCustClass ").enable(false);
    $("#cmbVIPType ").enable(false);
    $("#cmbVIPType ").enable(false);
    $("#cmbVIPType ").enable(txtStatus);
    $("#dtpTranDate ").enable(txtStatus);
    

    $("#attachIDPicture").enable(true)
    $("#attachSignature").enable(true)

    $("#txtLastName").enable(false)
    $("#txtFirstName").enable(false)
    $("#txtMiddleName").enable(false)
    $("#cmbSalutation").enable(false)
    $("#cmbGender").enable(false)
    $("#chkCoowner").enable(false)
    $("#txtBday").enable(false)
    $("#cmbCivilStatus").enable(false)
    $("#cmbNationality").enable(false)
    $("#txtMobileNo").enable(false)
    $("#cmbSuffix").enable(false)
    $("#txtEmail").enable(false)

    $("#cmbReasonForBuyingPI").enable(false)
    $("#txtDesiredPropertyPI").enable(false)
    $("#btnAddDesiredProperty").enable(true)
    $("#cmbSourceOfAwarenessPI").enable(false)

    $("#txtRegNameCB").enable(false)
    $("#chkRepresentativeCB").enable(false)
    $("#txtTradeNameCB").enable(false)
    $("#txtLastNameAF").enable(false)
    $("#txtFirstNameAF").enable(false)
    $("#txtMiddleNameAF").enable(false)
    $("#cmbSuffixAF").enable(false)
    $("#txtEffectiveDateToAF").enable(false)
    $("#cmbRelationshipAF").enable(false)
    $("#cmbGenderAF").enable(false)
    $("#cmbCivilStatusAF").enable(false)
    $("#cmbNationalityAF").enable(false)

    $("#cmbHomeOwn").enable(false)
    $("#txtEmployerNameEMP").enable(false)
    $("#cmbEmpSubTypeEMP").enable(false)
    $("#txtPositionEMP").enable(false)

    $("#btnReqCompliance").enable(true);
    $("#noah-webui-Toolbox").bindingNew().visible(true);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().visible(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);


}


function DisableFieldsEmpty() {
    DisableFields();

    $("#noah-webui-Toolbox").bindingNew().visible(true);
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().visible(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

function func_enablePortal() {
    if ($("#cbIndividual").prop("checked")) {
        $('#lugSalutation').enable(true);
        $('#lugSuffix').enable(true);
        $('#txtPlaceBirth').enable(true);
        $('#lugGender').enable(true);
        $('#lugCivilStatus').enable(true);
        $('#lugNationality').enable(true);
        $('#lugOccupation').enable(true);
        $('#txtTIN').enable(true);
        $('#txtPassport').enable(true);
        $('#lugSourceOfIncome').enable(true);
        $('#txtTIN').enable(true);

        if ($('#idvallugSalutation').val() == '') {
            $('#attachIDPicture').enable(false);
            $('#attachSignature').enable(false);
            $('.btnlink').enable(false);
            $('.li-Shortcut').enable(false);
        } else {
            $('#attachIDPicture').enable(true);
            $('#attachSignature').enable(true);
            $('.btnlink').enable(true);
            $('.li-Shortcut').enable(true);
        }
    }
}

function clearUploadField() {
    $("#fileCon").val("");
    $(".bar").css("width", "0%");
    $(".percent").text("0%");
    $("#status").html("");
}

function ClearFields() {
    ctr1 = 0; ctr2 = 0; ctr3 = 0;
    //$("#cbVIP").prop('checked', false);
    $("#cbNewInquiry").prop('checked', false);
    $("#cbNewReservation").prop('checked', false);
    $("#cbTransfer").prop('checked', false);
    $("#txtCode").val('');
    $("#txtCodeCrossReference").val('');
    $("#cmbCustClass").val('');
    $("#cmbVIPType").val('');
    $("#txtStatus").val('');
    $("#txtRecStatus").val('');
    $(".txtName").val('');
    $(".txtFullName").val('');
    $(".cmbSalutation").val('');
    $(".cmbGender").val("");
    $("#chkCoowner").prop("checked", false);
    $(".txtMothersMaiden").val('');
    $(".txtBday").val('');
    $(".txtAge").val('');
    $(".txtPlaceBirth").val('');
    $(".cmbCivilStatus").val('');
    $(".cmbNationality").val('');
    $(".txtTIN").val('');
    $(".cmbOccupation").val('');
    $("#cmbSourceOfIncome").val('');
    $("#cmbPaymentOption").val('');
    $(".txtLandlineNo").val('');
    $(".txtLocalNo").val('');
    $(".txtMobileNo").val('');
    $(".txtEmail").val('');
    $(".chkFullAddress").prop("checked", false);
    $(".txtFullAddress").val('');
    $(".cmbProvince").val('');
    $(".cmbMunicipality").val('');
    $(".cmbBarangay").val('');
    $(".txtZipCode").val('');
    $(".txtRegion").val('');
    $(".txtCountry").val('');
    $(".txtRegionCode").val('');
    $(".txtCountryCode").val('');
    $(".cmbHomeOwn").val('');
    $(".cmbLocType").val('');
    $(".txtDateMarriage").val('');
    $(".txtCompany").val('');
    $("#cmbEmpSubTypeEMP").val('');
    $("#cmbEmpAreaEMP").val('');
    $("#cmbEmpStatusEMP").val('');
    $("#txtProfessionEMP").val('');
    $(".txtDepartment").val('');
    $(".txtDesignation").val('');
    $(".cmbNatureOfBusiness").val('');
    $(".txtEmployerName").val('');
    $(".txtEmployerAddress").val('');
    $(".txtEmployerContact").val('');
    $("#cmbPersonalIncomeEMP").val('');
    $("#cmbHouseholdIncomeEMP").val('');
    $(".cmbRelationship").val('');
    $("#txtResidentialAddressCO").val('');
    $("#txtProvincialAddressCO").val('');
    $("#txtRegNameCB").val('');
    $("#txtTradeNameCB").val('');
    $("#chkRepresentativeCB").prop("checked", false);
    $("#cbVATCB").prop("checked", false);
    $("#cbNVatCB").prop("checked", false);
    $("#txtVatRegTinCB").val('');
    $("#txtNonVatRegTinCB").val('');
    $("#txtEffectiveDateFromAF").val('');
    $("#txtEffectiveDateToAF").val('');
    $("#txtHomeAddressAF").val('');
    $("#txtBusinessAddressAF").val('');
    $(".cmbReasonForBuying").val('');
    $(".txtDesiredProperty").val('');
    $(".cmbSourceOfAwareness").val('');
    $(".cmbPriceRange").val('');
    $(".txtOthers").val('');
    $("#cbYes").prop("checked", false);
    $("#cbNo").prop("checked", false);
    $("#txtNamePI").val('');
    $(".txtPosition").val('');
    $(".cmbBusinessType").val('');

    CheckIfOthers("cmbReasonForBuyingPI");
    CheckIfOthers("txtDesiredPropertyPI");
    CheckIfOthers("cmbSourceOfAwarenessPI");
    $(".chkDesiredProperty").prop("checked", false);
}



let $btn = "";
$(document).on("click", "#profile-box #attachIDPicture", function (e) {
    $btn = "attachIDPicture";
    if ($("#txtCode").val() == '') {
        MessageBox("Cannot Proceed. Please save the record first.", "Customer Information");
        e.preventDefault();
        return true;
    }
    else {
        //$(".bar").css("width", "0%");
        //$(".percent").text("0%");
        //$("#status span").text("");
        clearUploadField();
        nwPopupForm_ShowModal("nwUploadCon");
    }
    return false;
});


$(document).on("click", "#signature-box #attachSignature", function (e) {
    $btn = "attachSignature";
    if ($("#txtCode").val() == '') {
        MessageBox("Cannot Proceed. Please save the record first.", "Customer Information");
        e.preventDefault();
        return true;
    }
    else {
        //$(".bar").css("width", "0%");
        //$(".percent").text("0%");
        //$("#status span").text("");
        clearUploadField();

        nwPopupForm_ShowModal("nwUploadCon");
    }
    return false;
});


var serverlink = "";
function func_WindowCloseTrigger(verID) {
    if (verID == "nwUploadCon") {
        if ($btn == "attachIDPicture") {
            var filepath = $("#nwUploadCon .noahdriveID").text();
            var path = "";
            serverlink = $('#txtServerLink').val();

            path = "\\" + 'SBCustomerMasterFile' + "\\" + filepath;

            if (filepath != "") {
                linkcat = serverlink + path;
                cust_GetPara();
                nwParameter_Add("path", path);
                func_ActionDriven("actSaveCustomerImage", false);
                nwLoading_Start('actSaveCustomerImage');
            }
        }

        if ($btn == "attachSignature") {
            var filepath = $("#nwUploadCon .noahdriveID").text();
            var path = "";
            serverlink = $('#txtServerLink').val();

            path = "\\" + 'SBCustomerMasterFile' + "\\" + filepath;

            if (filepath != "") {
                linkcat = serverlink + path;
                cust_GetPara();
                nwParameter_Add("path", path);
                func_ActionDriven("actSaveSignature", false);
                nwLoading_Start('actSaveSignature');
            }
        }
    }
    if (verID == "nwPopWindow") {
        //if ($('#nwPopWindow .BoxTitle').text() == 'Customer Co-Borrower/Co-Buyer') {
        //    if (isView != 1) {
        //        console.log(isEdited);
        //        if (isEdited == true) {
        //            var err = "";
        //            var len = cntInvld.length -1;
        //            for (var x=0; x <= len ; x++){
        //                err+=  "Cannot proceed. Please select a Reference Spouse or remove data selected in the Married Status Tagging field in row "+ cntInvld[x] +".", "Customer Co-Borrower/Co-Buyer", "";
        //            }
        //            MessageBox(err, "Customer Co-Borrower/Co-Buyer");
        //            return false;
        //        }
        //    }
        //} else {
        nwPopupForm_HideModal("nwPopWindow");
        // }
    }
    return true;
}


var isEdited = false;
var cntInvld = [];
//this function will call bay other menu
//function cust_CoborrowData(_data,_cntInvld ) {
//    isEdited = _data;
//    cntInvld = _cntInvld;
//   // alert(" this call the parent menu");
//}

//function func_WindowCloseTrigger(verid) {
//    var isContinue = true;
//    if (isEdited == true) {
//        MessageBox("invalid");
//    }

//    return isContinue;
//}


//var CustomerImagepath = '';
function func_setCustomerImage(CustomerImagepath) {

    if (CustomerImagepath == '' || CustomerImagepath == undefined) {
        $("#profile-img").css('background-image', "url('images/placeholder.png')");
    } else {
        serverlink = $("#txtServerLink").val();
        var fullpath = serverlink + CustomerImagepath;
        $("#profile-img").css('background-image', "url('" + fullpath + "')");
    }
}

//var CustomerSignPath = '';
function func_setCustomerSignImage(CustomerSignPath) {

    if (CustomerSignPath == '' || CustomerSignPath == undefined) {
        $("#profile-img-signature").css('background-image', "url('images/placeholder.png')");
    } else {
        serverlink = $("#txtServerLink").val();
        var fullpath = serverlink + CustomerSignPath;
        $("#profile-img-signature").css('background-image', "url('" + fullpath + "')");
    }
}



var serverDate = new Date();
function getAge(dateString) {
    var today = serverDate;
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    //if (age < 18) {
    //    MessageBox('Should be 18 up only.', 'Application Form');
    //    $("#txtBday").val('');
    //}
    if (age + '' == 'NaN' || age == NaN) {
        age = '';
    }

    return age;
}

$(document).on("keypress", ".txtBday", function (e) {
    var id = $(this).attr("id");
    var age = $(this).attr("age");
    var val = $("#" + id).val();
    $("#" + age).val(getAge(val || new Date("01/01/1900")));
    if ($("#" + id).val() == '') {
        $("#" + age).val('');
    }

});

$(document).on("change", ".txtBday", function (e) {
    var id = $(this).attr("id");
    var age = $(this).attr("age");
    var val = $("#" + id).val();
    $("#" + age).val(getAge(val || new Date("01/01/1900")));
    if ($("#" + id).val() == '') {
        $("#" + age).val('');
    }

    var csd = new Date($('#getCSD').val());
    var ag = $("#" + age).val();
    var bday = $("#" + id).val();

    if (bday > csd) {
        MessageBox("Cannot be continued. Future date is not allowed.", "Customer Information");
        $("#" + id).val('');
        $("#" + age).val('');
    }

    if (ag < 0) {
        MessageBox("Cannot be continued. Future date is not allowed.", "Customer Information");
        $("#" + id).val('');
        $("#" + age).val('');
    }
});



$(document).on('change', '.txtName', function () {
    var sec = $(this).attr("sec");
    var ln = $(".txtName#txtLastName" + sec).val();
    var fn = $(".txtName#txtFirstName" + sec).val();
    var mn = $(".txtName#txtMiddleName" + sec).val();
    CombineName(sec, ln, fn, mn);
});


function CombineName(sec, ln, fn, mn) {
    var registeredname = ln + ', ' + fn + " " + mn;
    $('#txtFullName' + sec).val(registeredname);
};

function ChangeCivilStatus(id) {
    var value = $("#" + id).val();
    if ($("#cbIndividual").prop("checked") == true) {
        if (value == "02")//Married
        {
            if (id == "cmbCivilStatus") {
                $(".fsSpouseInfo").show();
                var gender = $("#cmbGender").val();
                if (gender == "F")
                    $("#cmbGenderSP").val("M");
                if (gender == "M")
                    $("#cmbGenderSP").val("F");
            }

            if (id == "cmbCivilStatusCO") {
                $(".fsCoOwnerSpouseInfo").show();
                var genderco = $("#cmbGenderCO").val();
                if (genderco == "F")
                    $("#cmbGenderCOS").val("M");
                if (genderco == "M")
                    $("#cmbGenderCOS").val("F");
            }
        }
        else {
            if (id == "cmbCivilStatus")
                $(".fsSpouseInfo").hide();
            if (id == "cmbCivilStatusCO")
                $(".fsCoOwnerSpouseInfo").hide();
        }
    }
}

$(document).on('change', '.cmbGender', function () {
    var id = $(this).attr('id');
    var gender = $("#" + id).val();
    if (id == "cmbGender") {
        if (gender == "F")
            $("#cmbGenderSP").val("M");
        if (gender == "M")
            $("#cmbGenderSP").val("F");
    }

    if (id == "cmbGenderCO") {
        if (gender == "F")
            $("#cmbGenderCOS").val("M");
        if (gender == "M")
            $("#cmbGenderCOS").val("F");
    }
});


$(document).on('change blur', '#txtRegName', function () {
    var $this = $('#txtRegName').val()
    $('#txtTrdName').val($this);
});

$(document).on('input', '.txtMiddleName', function (e) {
    var id = $(this).attr("id");
    var sec = $(this).attr("sec");
    var str = $('#' + id).val();
    str = str.trim();
    //var res = str.substring(1, 0)
    var res = str.match(/\b(\w)/g);
    if (res == null || res == "")
        $('#txtmri' + sec).val('');
    else
        $('#txtmri' + sec).val(res.join('. ').toUpperCase() + '.');
    //CombineName();
});

//Province to Municipality
$(document).on('change', '.cmbProvince', function (e) {
    var code = $(this).val();
    nwParameter_Add("code", code);
    nwParameter_Add("qt", 12)
    if ($("#cbIndividual").prop("checked") == true) {
        document.getElementById("cmbMunicipality").innerHTML = "";
        document.getElementById("cmbBarangay").innerHTML = "";

        nwParameter_Add("cid", "#cmbMunicipality")
    }
    if ($("#cbCompany").prop("checked") == true) {
        document.getElementById("cmbMunicipalityCB").innerHTML = "";
        document.getElementById("cmbBarangayCB").innerHTML = "";
        nwParameter_Add("cid", "#cmbMunicipalityCB")
    }
    $(".txtZipCode ").val("");
    $(".txtRegionCode").val("");
    $(".txtRegion").val("");
    $(".txtCountryCode").val("");
    $(".txtCountry").val("");
    nwParameter_Add("txtCode", $("#txtCode").val());
    func_ActionDriven("actSpecialCombo", false);
});
//Municipality to Barangay
$(document).on('change', '.cmbMunicipality', function (e) {
    var code = $(this).val();
    var rcode = $('option:selected', this).attr('rcode');
    var rdesc = $('option:selected', this).attr('rdesc');
    var ccode = $('option:selected', this).attr('ccode');
    var cdesc = $('option:selected', this).attr('cdesc');

    $(".txtRegionCode").val(rcode);
    $(".txtRegion").val(rdesc);
    $(".txtCountryCode").val(ccode);
    $(".txtCountry").val(cdesc);

    nwParameter_Add("code", code);
    nwParameter_Add("qt", 13)
    if ($("#cbIndividual").prop("checked") == true) {
        document.getElementById("cmbBarangay").innerHTML = "";
        $(".txtZipCode ").val("");
        nwParameter_Add("cid", "#cmbBarangay")
    }
    if ($("#cbCompany").prop("checked") == true) {
        document.getElementById("cmbBarangayCB").innerHTML = "";
        $(".txtZipCode ").val("");
        nwParameter_Add("cid", "#cmbBarangayCB")
    }
    nwParameter_Add("txtCode", $("#txtCode").val());
    func_ActionDriven("actSpecialCombo", false);
});
//Municipality to Barangay
//$(document).on('change', '.cmbBarangay', function (e) {
//    var zip = $('option:selected', this).attr('sval');
//    $(".txtZipCode ").val(zip);
//});

//Civil Status Change
$(document).on('change', '.cmbCivilStatus', function (e) {
    var id = $(this).attr("id");
    ChangeCivilStatus(id);
});



var attachclick = '';
//For Uploading of Attachment
function changeFile(ver) {
    var file = ver.files[0];
    var name = file.name;
    var size = file.size;
    var type = file.type;
    type = name.slice((Math.max(0, name.lastIndexOf(".")) || Infinity) + 1);
    type = type.toLowerCase();
    $(".bar").css("width", "0%");
    $(".percent").text("0%");
    $("#status").html("");

    //Your validation
    currentName = name;
    if (size > 20242880) {
        MessageBox("Attachment does not follow file size requirement.", MenuItemTitle, "error"); $(ver).val("");
    }
    else if (name.includes("%") || name.includes("#")) {
        MessageBox("Cannot upload. File name should not have % or #.", "", "error");
        $(ver).val("");
    }
    else {

        //setTimeout(function () {
        //    $("#btnupload").click();
        //}, 100);


        upload();
    }
}

// Upload
function upload() {
    if ($("input[type = 'file']").val() == "") {
        $("#status").html("<span style=\"color:red;\">Please select file to upload!</span>");
        (function () {
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');
            $('form').ajaxForm({
                beforeSend: function () {

                },
                uploadProgress: function (event, position, total, percentComplete) {
                },
                success: function () {
                },
                complete: function (xhr) {
                }
            });
        })();
    } else {
        (function () {
            var bar = $('.bar');
            var percent = $('.percent');
            var status = $('#status');

            try {
                //

                var UploadFileName = '';
                var currentdate = new Date();
                var datetime = ''


                var d = new Date($.now());
                datetime = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear() + "_" + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

                UploadFileName = $("input[type = 'file']").val().split(/(\\|\/)/g).pop() + '_' + datetime.replace(/-|:| /g, '');
                var mydata = { "UploadFileName": UploadFileName };
                $('form').ajaxForm(
                {
                    data: mydata,
                    beforeSend: function () {
                        status.empty();
                        var percentVal = '0%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },

                    uploadProgress: function (event, position, total, percentComplete) {
                        var percentVal = percentComplete + '%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                        $("#status").text('Uploading...');
                    },

                    success: function () {
                        var percentVal = '100%';
                        bar.width(percentVal)
                        percent.html(percentVal);
                    },

                    complete: function (xhr) {
                        $('#status').html(xhr.responseText);

                        //setTimeout(function () {
                        //    window_close('nwUploadCon');
                        //}, 500);

                    }
                });
            } catch (err) {
                alert(err);
            }
        })();
    }
}

//Full Address
$(document).on('change', '.chkFullAddress', function (e) {
    var id = $(this).attr("id");
    CheckIfFullAddress(id, true);
});

$(document).on('click', '#btnAddCoowner', function (e) {
    $(".fsCoownerInfo-dsbld").enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    ClearCoowner();
    $(".dsbld").enable(false);
    $(".fsCoOwnerSpouseInfo").hide();
    $(".fsCoOwnerSpouseInfo").enable(true);
});
$(document).on('click', '#btnViewCoowner', function (e) {
    //nwPopupForm_ShowModal("nwPopWindow");
    nwParameter_Add("code", $("#txtCode").val());
    nwPopupForm_ShowModal("nwViewAllRecordsModal");
    func_ActionDriven("actViewCoownerDetails", false);
});

function ClearCoowner() {
    $("#txtLastNameCO").val('');
    $("#txtFirstNameCO").val('');
    $("#txtMiddleNameCO").val('');
    $("#txtmriCO").val('');
    $("#cmbSuffixCO").val('');

    $("#cmbRelationshipCO").val('');
    $("#cmbGenderCO").val('');
    $("#txtBdayCO").val('');
    $("#txtAgeCO").val('');
    $("#txtPlaceBirthCO").val('');
    $("#cmbCivilStatusCO").val('');
    $("#cmbNationalityCO").val('');
    $("#txtTINCO").val('');
    $("#txtResidentialAddressCO").val('');
    $("#txtProvincialAddressCO").val('');
    $("#txtLandlineNoCO").val('');
    $("#txtLocalNoCO").val('');
    $("#txtMobileNoCO").val('');
    $("#txtEmailCO").val('');
    $("#txtDepartmentCO").val('');
    $("#txtDesignationCO").val('');
    $("#txtEmployerNameCO").val('');
    $("#txtEmployerAddressCO").val('');
    $("#txtEmployerContactCO").val('');
    $("#txtPositionCO").val('');
    $("#cmbHomeOwnCO").val('');

    $("#txtLastNameCOS").val('');
    $("#txtFirstNameCOS").val('');
    $("#txtMiddleNameCOS").val('');
    $("#txtmriCOS").val('');
    $("#cmbSuffixCOS").val('');

    $("#cmbSalutationCOS").val('');
    $("#cmbGenderCOS").val('');
    $("#txtMothersMaidenCOS").val('');
    $("#txtBdayCOS").val('');
    $("#txtAgeCOS").val('');
    $("#txtTINCOS").val('');
    $("#txtDateMarriageCOS").val('');
    $("#cmbNationalityCOS").val('');
    $("#cmbOccupationCOS").val('');
    $("#txtCompanyCOS").val('');
}

//get date today
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
//check if fill address is ticked
function CheckIfFullAddress(id, isClear) {
    if ($("#" + id).prop("checked") == true) {
        $('.txtFullAddress').enable(true);
        $('.cmbProvince').enable(false);
        $('.cmbMunicipality').enable(false);
        $('.cmbBarangay').enable(false);

    }
    else {
        $('.txtFullAddress').enable(false);
        $('.cmbProvince').enable(true);
        $('.cmbMunicipality').enable(true);
        $('.cmbBarangay').enable(true);
    }
    if (isClear == true) {
        document.getElementById("cmbMunicipality").innerHTML = "";
        document.getElementById("cmbBarangay").innerHTML = "";
        document.getElementById("cmbMunicipalityCB").innerHTML = "";
        document.getElementById("cmbBarangayCB").innerHTML = "";
        $('.txtFullAddress').val('');
        $('.cmbProvince').val('');
        $('.cmbMunicipality').val('');
        $('.cmbBarangay').val('');
        $('.txtZipCode').val('');
        $('.txtRegion').val('');
        $('.txtRegionCode').val('');
        $('.txtCountry').val('');
        $('.txtCountryCode').val('');
    }

}
$(document).on('click', '.btn-cancel', function () {
    $(this).parents('.pdlg').fadeOut();
    $(this).parents('.iframe_main').fadeOut();
});

$(document).on("click", `.pdlg-btn-dlgactions[dlgact-type="resize"], .iframe-actions > .btn.btn-cancel`, function (e) {
    var $p = $(this).parents(`.iframe_main[canbefullwidth="true"]`);

    if ($(this).hasClass("btn-cancel")) {
        $p.attr("fw-state", "cancel");
    }

    if ($p.length) {
        if ($p.attr("fw-state") == "normal") {
            $p.parents("body.new-np").css("overflow", "hidden");
            $p.attr("fw-state", "maximize");
            $(this).attr("title", "Restore Down");
        }
        else {
            $p.parents("body.new-np").css("overflow", "");
            $p.attr("fw-state", "normal");
            $(this).attr("title", "Maximize");
        }
    };

});


//PAGINATION THINGS
function LoadCoowner(ix) {
    $("#txtLastNameCOD").val(dtls[ix - 1]["CoownerLastName"]);
    $("#txtFirstNameCOD").val(dtls[ix - 1]["CoownerFirstName"]);
    $("#txtMiddleNameCOD").val(dtls[ix - 1]["CoownerMiddleName"]);
    $("#txtmriCOD").val(dtls[ix - 1]["CoownerMI"]);
    $("#cmbSuffixCOD").val(dtls[ix - 1]["CoownerSuffix"]);

    $("#cmbRelationshipCOD").val(dtls[ix - 1]["CoownerRelationship"]);
    $("#cmbGenderCOD").val(dtls[ix - 1]["CoownerGender"]);
    $("#txtBdayCOD").val(dtls[ix - 1]["CoownerBirthday"]);
    $("#txtAgeCOD").val(dtls[ix - 1]["CoownerAge"]);
    $("#txtPlaceBirthCOD").val(dtls[ix - 1]["CoownerPlaceOfBirth"]);
    $("#cmbCivilStatusCOD").val(dtls[ix - 1]["CoownerCivilStatus"]);
    $("#cmbNationalityCOD").val(dtls[ix - 1]["CoownerNationality"]);
    $("#txtTINCOD").val(dtls[ix - 1]["CoownerTIN"]);
    $("#txtResidentialAddressCOD").val(dtls[ix - 1]["CoownerPresentAddress"]);
    $("#txtProvincialAddressCOD").val(dtls[ix - 1]["CoownerProvincialAddress"]);
    $("#txtLandlineNoCOD").val(dtls[ix - 1]["CoownerLandline"]);
    $("#txtLocalNoCOD").val(dtls[ix - 1]["CoownerLocal"]);
    $("#txtMobileNoCOD").val(dtls[ix - 1]["CoownerMobile"]);
    $("#txtEmailCOD").val(dtls[ix - 1]["CoownerEmail"]);
    $("#txtDepartmentCOD").val(dtls[ix - 1]["CoownerDepartment"]);
    $("#txtDesignationCOD").val(dtls[ix - 1]["CoownerDesignation"]);
    $("#txtEmployerNameCOD").val(dtls[ix - 1]["CoownerEmployerName"]);
    $("#txtEmployerAddressCOD").val(dtls[ix - 1]["CoownerEmployerAddress"]);
    $("#txtEmployerContactCOD").val(dtls[ix - 1]["CoownerEmployerContact"]);
    $("#txtPositionCOD").val(dtls[ix - 1]["CoownerPosition"]);
    $("#cmbHomeOwnCOD").val(dtls[ix - 1]["CoownerHomeOwnership"]);


    $("#txtLastNameCOSD").val(dtls[ix - 1]["CSpouseLastName"]);
    $("#txtFirstNameCOSD").val(dtls[ix - 1]["CSpouseFirstName"]);
    $("#txtMiddleNameCOSD").val(dtls[ix - 1]["CSpouseMiddleName"]);
    $("#txtmriCOSD").val(dtls[ix - 1]["CSpouseMI"]);
    $("#cmbSuffixCOSD").val(dtls[ix - 1]["CSpouseSuffix"]);

    $("#cmbSalutationCOSD").val(dtls[ix - 1]["CSpouseSalutation"]);
    $("#cmbGenderCOSD").val(dtls[ix - 1]["CSpouseGender"]);
    $("#txtMothersMaidenCOSD").val(dtls[ix - 1]["CSpouseMothersMaidenName"]);
    $("#txtBdayCOSD").val(dtls[ix - 1]["CSpouseBirthday"]);
    $("#txtAgeCOSD").val(dtls[ix - 1]["CSpouseAge"]);
    $("#txtTINCOSD").val(dtls[ix - 1]["CSpouseTIN"]);
    $("#txtDateMarriageCOSD").val(dtls[ix - 1]["CSpouseDateOfMarriage"]);
    $("#cmbNationalityCOSD").val(dtls[ix - 1]["CSpouseNationality"]);
    $("#cmbOccupationCOSD").val(dtls[ix - 1]["CSpouseOccupation"]);
    $("#txtCompanyCOSD").val(dtls[ix - 1]["CSpouseCompany"]);

    if (dtls[ix - 1]["CSpouseLastName"] == null || dtls[ix - 1]["CSpouseLastName"] == "") {
        $(".fsCoOwnerSpouseInfoDet").hide();
    }
    else {
        $(".fsCoOwnerSpouseInfoDet").show();
    }

    $(".fsSecDet.fsCoOwnerSpouseInfoDet").enable(false);
    $(".fsSecDet.fsCoownerInfoDet").enable(false);
}

//Pagination Custom Events
var maxcnt = $("#curCnt").attr("maxcnt");
var crntval = $("#curCnt").val();
//First
$(document).on("click", ".SpFirst", function () {
    $("#curCnt").val("1");
    crntval = $("#curCnt").val();
    LoadCoowner(crntval);
    $(this).enable(false);
    $(".SpPrev").enable(false);
    $(".SpNext").enable(true);
    $(".SpLast").enable(true);
});
//Next
$(document).on("click", ".SpNext", function () {
    maxcnt = parseInt($("#curCnt").attr("maxcnt"));
    $(".SpPrev").enable(true);
    $(".SpFirst").enable(true);
    crntval = parseInt($("#curCnt").val());
    crntval = crntval += 1;
    $("#curCnt").val(crntval);
    LoadCoowner(crntval);

    if (crntval == maxcnt) {
        $(this).enable(false);
        $(".SpLast").enable(false);
    }
    else {
        $(this).enable(true);
        $(".SpLast").enable(true);
    }
});
//Previous
$(document).on("click", ".SpPrev", function () {
    maxcnt = parseInt($("#curCnt").attr("maxcnt"));
    $(".SpNext").enable(true);
    $(".SpLast").enable(true);
    crntval = parseInt($("#curCnt").val());
    crntval = crntval -= 1;
    $("#curCnt").val(crntval);
    LoadCoowner(crntval);

    if (crntval == 1) {
        $(this).enable(false);
        $(".SpFirst").enable(false);
    }
    else {
        $(this).enable(true);
        $(".SpFirst").enable(true);
    }
});
//Last
$(document).on("click", ".SpLast", function () {
    $("#curCnt").val(maxcnt);
    crntval = $("#curCnt").val();
    LoadCoowner(crntval);
    $(this).enable(false);
    $(".SpNext").enable(false);
    $(".SpPrev").enable(true);
    $(".SpFirst").enable(true);
});

//text change
$(document).on("input", "#curCnt", function () {
    crntval = $(this).val();
    if (crntval > maxcnt) {
        maxcnt = parseInt($("#curCnt").attr("maxcnt"));
        $("#curCnt").val(maxcnt);
        $(".SpLast").click();
    }
    else {
        maxcnt = parseInt($("#curCnt").attr("maxcnt"));
        LoadCoowner(crntval);

        if (crntval == maxcnt) {
            $(".SpNext").enable(false);
            $(".SpLast").enable(false);
            $(".SpPrev").enable(true);
            $(".SpFirst").enable(true);
        }
        if (crntval == 1) {
            $(".SpNext").enable(true);
            $(".SpLast").enable(true);
            $(".SpPrev").enable(false);
            $(".SpFirst").enable(false);
        }
        else {
            $(".SpNext").enable(true);
            $(".SpLast").enable(true);
            $(".SpPrev").enable(true);
            $(".SpFirst").enable(true);
        }
    }
});

$(document).on('change', '#txtEffectiveDateToAF', function () {
    var currServerDate = $('#txtEffectiveDateFromAF').val();
    var effectivetyDate = $(this).val();

    if (Date.parse(effectivetyDate) < Date.parse(currServerDate)) {
        MessageBox("Cannot Proceed. Effective Date To should not be earlier than Effective Date From.", "Customer Information");
        $('#txtEffectiveDateToAF').val(currServerDate);
    }
});

function ShowPrintPreview(PDFUrl) {
    //  var docnoList = JSON.parse(DocnoJSON)

    //   var arrayDocno = nwCreate2DArray(docnoList.docnorownum.length);

    var ctr = 0;

    //$.each(docnoList.docnorownum, function (e, item) {
    //    arrayDocno[ctr][0] = item.Docno;
    //    arrayDocno[ctr][1] = item.RowNum;
    //    ctr++;
    //});

    // nwLoadPrint(PDFUrl, arrayDocno);
    nwLoadPrint(PDFUrl, '');
}

$(document).on("click", "#imgDesiredProperty", function (e) {
    nwPopupForm_ShowModal("nwDesiredProperty");
});



//Check if "Others" is selected
function CheckIfOthers(id) {
    var t = document.getElementById(id);

    switch (id) {
        case "cmbReasonForBuyingPI":
            var selectedText = "";
            if (t.options[t.selectedIndex] == undefined)
                selectedText = "";
            else
                selectedText = t.options[t.selectedIndex].text;
            if (selectedText == "Others")
                $("#txtOthersReasonPI").enable(true);
            else {
                $("#txtOthersReasonPI").enable(false);
                $("#txtOthersReasonPI").val('');
            }
            break;
        case "txtDesiredPropertyPI":
            selectedText = $("#" + id).val();
            if (selectedText.includes("Others"))
                $("#txtOthersDesiredPI").enable(true);
            else {
                $("#txtOthersDesiredPI").enable(false);
                $("#txtOthersDesiredPI").val('');
            }
            break;
        case "cmbSourceOfAwarenessPI":
            var selectedText = "";
            if (t.options[t.selectedIndex] == undefined)
                selectedText = "";
            else
                selectedText = t.options[t.selectedIndex].text;
            if (selectedText == "Others" || selectedText == "Booth")
                $("#txtOthersSourceOfAwarenessPI").enable(true);
            else {
                $("#txtOthersSourceOfAwarenessPI").enable(false);
                $("#txtOthersSourceOfAwarenessPI").val('');
            }
            break;
    }
}
$(document).on('change', '#cmbReasonForBuyingPI', function () {
    CheckIfOthers("cmbReasonForBuyingPI");
});
$(document).on('change', '#txtDesiredPropertyPI', function () {
    CheckIfOthers("txtDesiredPropertyPI");
});
$(document).on('change', '#cmbSourceOfAwarenessPI', function () {
    CheckIfOthers("cmbSourceOfAwarenessPI");
});

$(document).on('change', '.chkDesiredProperty', function () {
    var xxdesc = "", xxcode = "";
    var xxcustcode = $("#txtCode").val();
    nwParameter_Add("xxcustcode", xxcustcode);
    $('.chkDesiredProperty').each(function (i, obj) {
        if ($('#chk' + (i + 1)).prop("checked") == true) {
            xxdesc += $('#chk' + (i + 1)).attr("desc") + ";";
            nwParameter_Add("isdelete", 0);
        }
        else
            nwParameter_Add("isdelete", 1);

        xxcode = $('#chk' + (i + 1)).attr("code");
        nwParameter_Add("xxcode", xxcode);
        //func_ActionDriven("actInsertDesiredProperty", false);
    });
    $("#txtDesiredPropertyPI").val(xxdesc);
    CheckIfOthers("txtDesiredPropertyPI");
});

//check recommendation
function func_ChangeRecommendation(res, isClear) {
    switch (res) {
        case "Y":
            $(".reqrecom").show();
            $(".dsbldRecomm").enable(true);
            $("#lblEmailRecomm").css("margin-left", "28px");
            break;
        case "N":
            $(".reqrecom").hide();
            $(".dsbldRecomm").enable(false);
            $("#lblEmailRecomm").css("margin-left", "33px");
            break;
        default:
            $(".reqrecom").hide();
            $(".dsbldRecomm").enable(false);
            $("#lblEmailRecomm").css("margin-left", "33px");
            break;
    }
    if (isClear == true)
        $(".dsbldRecomm").val('');
}


$(document).on('click', '.rdoSalesTag', function () {

    var id = $(this).attr("id");
    switch (id) {
        case "cbNewInquiry":
            ctr1++;
            if ($("#" + id).prop("checked") == true && ctr1 % 2 == 0)
                $("#" + id).prop("checked", false);
            ctr2 = 0;
            ctr3 = 0;
            break;
        case "cbNewReservation":
            ctr2++;
            if ($("#" + id).prop("checked") == true && ctr2 % 2 == 0)
                $("#" + id).prop("checked", false);
            ctr1 = 0;
            ctr3 = 0;
            break
        case "cbTransfer":
            ctr3++;
            if ($("#" + id).prop("checked") == true && ctr3 % 2 == 0)
                $("#" + id).prop("checked", false);
            ctr1 = 0;
            ctr2 = 0;
            break
    }
});

$(document).on('focusout', '.txtTIN', function () {
    var id = $(this).attr("id");

    var tinvalues = [];
    if ($("#cbIndividual").prop("checked") == true) {
        tinvalues[0] = "txtTIN";
        tinvalues[1] = "txtTINSP";
        tinvalues[2] = "txtTINCO";
        tinvalues[3] = "txtTINCOS";

        for (var i = 0; i < tinvalues.length; i++) {
            if ($("#" + tinvalues[i]).val() == $("#" + id).val() && id != tinvalues[i]) {
                MessageBox("Cannot be continued. TIN is already existing.", "Customer Information");
                $("#" + id).val('');
            }

        }
    }
    if ($("#cbCompany").prop("checked") == true) {
        tinvalues[0] = "txtVatRegTinCB";
        tinvalues[1] = "txtNonVatRegTinCB";
        tinvalues[2] = "txtTINAF";

        for (var i = 0; i < tinvalues.length; i++) {
            if ($("#" + tinvalues[i]).val() == $("#" + id).val() && id != tinvalues[i]) {
                MessageBox("Cannot be continued. TIN is already existing.", "Customer Information");
                $("#" + id).val('');
            }
        }
    }


});


$(document).on("click", "#btnReqCompliance", function (e) {

    var trantype = 'REMCST';
    var docno = $('#txtCode').val();
    var status = $('#txtRecStatus').val();
    nwDocno = getParameterByName('nwDocno');

    if (status == "3" || nwDocno != "") {
        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&isView=true";

    } else {
        var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&isView=false";
    }


    nwLoading_Start('btnReqCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpReqComp", true, fullength);
    $('#nwPopUpReqComp .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpReqComp").css({ "min-width": "98%" });
    $("#nwPopUpReqComp").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpReqComp");
    nwLoading_End('btnReqCompliance');


});


function func_WindowCloseTrigger(verID) {
    var isContinue = true;
    var errorResult = "";
    var ICode = "";
    var currentRow = -1;
    var serverlink = "ss" //$("#txtserverlink").val();
    cust_GetPara();

    if (verID == "nwPopUpReqComp") {
        nwParameter_Add("txtTransactionNo", $('#txtTransactionNo').val());
        nwLoading_Start("actHasRqrdCompli", crLoadingHTML);
        func_ActionDriven('actHasRqrdCompli', false);
    }



    return isContinue;
}




$(document).on("click", "#btnAddDesiredProperty", function () {

    lookUpCustomize('CustomDesiredProperty', 2);




});


$(document).on("click", "#LookUpAddtoList", function () {


    var tableName = $(".nwlookupgridList ");
    var tempdescValue = "";
    var tempIndex = "";

    $('.nwlookupgridList  > tbody  > tr').each(function (index, tr) {

        if (tableName.find('tr:eq(' + index + ')').find("td:eq(0)").find("[type='checkbox']").prop('checked') == true) {
            tempdescValue += tableName.find('tr:eq(' + index + ')').find("td:eq(2)").text() + ";";
            tempIndex += index + ";";
        };
    });

    $("#txtDesiredPropertyPI").val(tempdescValue);
    $("#txtHiddenDesiredPrptyIndex").val(tempIndex);

    tempdescValue = tempdescValue.toUpperCase();
    if (tempdescValue.includes("OTHERS")) {
        $("#txtOthersDesiredPI").val("");
        $("#txtOthersDesiredPI").enable(true);
    } else {
        $("#txtOthersDesiredPI").val("");
        $("#txtOthersDesiredPI").enable(false);
    }





});


$(document).on("click", "#cbIndividual", function () {

    func_ChangeCustType('cbIndividual', true)

});

$(document).on("click", "#cbCompany", function () {

    func_ChangeCustType('cbCompany', true)

});


$(document).on("click", "#cbVIP", function () {

    func_CheckIfVIP();

});

