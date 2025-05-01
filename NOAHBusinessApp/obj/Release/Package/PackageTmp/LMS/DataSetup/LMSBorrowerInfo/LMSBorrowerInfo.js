//var isnewrow = 0;
var newRow = true;
//var nwLink;
var menuTitle = "Borrower Information";
var nwIsReport;
var nwSupplierCode = "";
var arry = "";
var nwDocno = "";
var nwCode = "";
var isVendLoc = false;

var nwGridIndCon_Book;
var nwGridIndCon_Sheet;

var nwGridContactInfoCon_Book;
var nwGridContactInfoCon_Sheet;

var nwGridOthSrcIncInfoCon_Book;
var nwGridOthSrcIncInfoCon_Sheet;

var nwGridBorrowerInfoCon_Book;
var nwGridBorrowerInfoCon_Sheet;

var nwGridSigntrsInfoCon_Book;
var nwGridSigntrsInfoCon_Sheet;

var nwGridBenefOwnCon_Book;
var nwGridBenefOwnCon_Sheet;

var nwGridBankReferenceCon_Book;
var nwGridBankReferenceCon_Sheet;

var nwGridTradeReferenceCon_Book;
var nwGridTradeReferenceCon_Sheet;

var nwGridCreditLineCon_Book;
var nwGridCreditLineCon_Sheet;

var nwGridDependntInfoCon_Book;
var nwGridDependntInfoCon_Sheet;

var nwGridSpoCon_Book;
var nwGridSpoCon_Sheet;

var nwGridSpouseConInfoCon_Book;
var nwGridSpouseConInfoCon_Sheet;


var nwGridPaymentDtlsCon_Book;
var nwGridPaymentDtlsCon_Sheet;

var nwGridCoBorrowerContactInfoCon_Book;
var nwGridCoBorrowerContactInfoCon_Sheet;

var nwGridBorrOthSrcIncInfoCon_Book;
var nwGridBorrOthSrcIncInfoCon_Sheet;

var nwGridSigntryContactDtlsCon_Book;
var nwGridSigntryContactDtlsCon_Sheet;





//Line ID
var brlineid = 0;
var sglineid = 0;
var code;
var BTin;
var isEmail;
var isLandline;
var isMobile;

//Contact
var contInp;
var
SPR_COMMSTYPE = 1,
SPR_PHONEBUSI = 2,
SPR_MOBILE = 3,
SPR_EMAILADD = 4;

$.mask.definitions['9'] = '';$.mask.definitions['x'] = '[0-9]';
//var startIndex = 0,
//        SPR_DDATICK = ++startIndex,
//        SPR_BANK = ++startIndex,
//        SPR_PAYEE = ++startIndex,
//        SPR_BRANCHCODE = ++startIndex,
//        SPR_BRANCHNAME = ++startIndex,
//        SPR_TYPEOFACCT = ++startIndex,
//        SPR_ACCTNO = ++startIndex,
//        SPR_FULLACCTNO = ++startIndex,
//        SPR_SWIFTCODE = ++startIndex,
//        SPR_TYPEOFPAYMENT = ++startIndex,
//        SPR_PAYMENTINSTRUC = ++startIndex;

//Contact Info
var startIndex = 0,
SPR_CI_CommType = ++startIndex,
SPR_CI_CommCode = ++startIndex,
SPR_CI_Value = ++startIndex,
SPR_CI_CommTypeTag = ++startIndex;

//Other Source of Income Information
var startIndex2 = 0,
SPR_SrcIncInfo_SrcIncomeCode = ++startIndex2,
SPR_SrcIncInfo_SrcIncomDesc = ++startIndex2,
SPR_SrcIncInfo_MonthlyInc = ++startIndex2,
SPR_SrcIncInfo_JobTitle = ++startIndex2,
SPR_SrcIncInfo_JobTitleDesc = ++startIndex2;


var startIndex3 = 0,
  SPR_Depnfo_Relation = ++startIndex3,
  SPR_Depnfo_RelationDesc = ++startIndex3,
  SPR_Depnfo_Name = ++startIndex3,
  SPR_Depnfo_Birthdate = ++startIndex3,
  SPR_Depnfo_Age = ++startIndex3,
  SPR_Depnfo_School = ++startIndex3;

var startIndex4 = 0,
  SPR_SCI_CommType = ++startIndex4,
  SPR_SCI_CommCode = ++startIndex4,
  SPR_SCI_Value = ++startIndex4,
  SPR_SCI_CommTypeTag = ++startIndex4;


    var startIndex5 = 0,
        SPR_BInfo_RelationShip = ++startIndex5,
        SPR_BInfo_RelationShipDesc = ++startIndex5,
        SPR_BInfo_Salutation = ++startIndex5,
        SPR_BInfo_SalutationDesc = ++startIndex5,
        SPR_BInfo_LName = ++startIndex5,
        SPR_BInfo_Fname = ++startIndex5,
        SPR_BInfo_MName = ++startIndex5,
        SPR_BInfo_MtherMname = ++startIndex5,
        SPR_BInfo_namesuffix = ++startIndex5,
        SPR_BInfo_namesuffixDesc = ++startIndex5,
        SPR_BInfo_DateBirth = ++startIndex5,
        SPR_BInfo_PlaceBirth = ++startIndex5,
        SPR_BInfo_Gender = ++startIndex5,
        SPR_BInfo_GenderDesc = ++startIndex5,
        SPR_BInfo_maritalstatus = ++startIndex5,
        SPR_BInfo_maritalstatusDesc = ++startIndex5,
        SPR_BInfo_Nationality = ++startIndex5,
        SPR_BInfo_NationalityDesc = ++startIndex5,
        SPR_BInfo_Opsadilco = ++startIndex5,
        SPR_BInfo_Politic = ++startIndex5,
        SPR_BInfo_Politicposition = ++startIndex5,
        SPR_BInfo_PoliticpositionDesc = ++startIndex5,
        SPR_BInfo_Tin = ++startIndex5,
        SPR_BInfo_SSS = ++startIndex5,
        SPR_BInfo_Gsis = ++startIndex5,
        SPR_BInfo_Employmentsource = ++startIndex5,
        SPR_BInfo_EmploymentsourceDesc = ++startIndex5,
        SPR_BInfo_IDCode = ++startIndex5,
        SPR_BInfo_IDDesc = ++startIndex5,
        SPR_BInfo_IDNo = ++startIndex5,
        SPR_BInfo_ContctDetails = ++startIndex5,
        SPR_BInfo_LocDetails = ++startIndex5,
        SPR_BInfo_EmpInfo = ++startIndex5,
        SPR_BInfo_BusInfor = ++startIndex5,
        SPR_BInfo_OthSrc = ++startIndex5,
        SPR_BInfo_ReqCom = ++startIndex5,
        SPR_BInfo_RCTAG = ++startIndex5,
        SPR_BInfo_ConTAG = ++startIndex5,
        SPR_BInfo_LocTAG = ++startIndex5,
        SPR_BInfo_EmpTAG = ++startIndex5,
        SPR_BInfo_BusTAG = ++startIndex5,
        SPR_BInfo_OthSrcTag = ++startIndex5,
        SPR_BInfo_LINEID = ++startIndex5;

//Borrower Contact
var startIndex6 = 0,
  SPR_CCI_CommType = ++startIndex6,
  SPR_CCI_CommCode = ++startIndex6,
  SPR_CCI_Value = ++startIndex6,
  SPR_CCI_CommTypeTag = ++startIndex6;

//Borrower Other Source of Income Information
var startIndex7 = 0,
SPR_Borr_SrcIncomeCode = ++startIndex7,
SPR_Borr_SrcIncomDesc = ++startIndex7,
SPR_Borr_MonthlyInc = ++startIndex7,
SPR_Borr_JobTitle = ++startIndex7,
SPR_Borr_JobTitleDesc = ++startIndex7,
SPR_Borr_LineID = ++startIndex7;

//Signatories

var startIndex8 = 0,
   SPR_SgInfo_Relationship = ++startIndex8, //Contact
   SPR_SgInfo_RelationshipDesc = ++startIndex8,
   SPR_SgInfo_Salutation = ++startIndex8,
   SPR_SgInfo_SalutationDesc = ++startIndex8,
   SPR_SgInfo_LName = ++startIndex8,
   SPR_SgInfo_Fname = ++startIndex8,
   SPR_SgInfo_MName = ++startIndex8,
   SPR_SgInfo_MtherMname = ++startIndex8,
   SPR_SgInfo_namesuffix = ++startIndex8,
   SPR_SgInfo_namesuffixDesc = ++startIndex8, 
   SPR_SgInfo_DateBirth = ++startIndex8,
   SPR_SgInfo_PlaceBirth = ++startIndex8,
   SPR_SgInfo_Gender = ++startIndex8,
   SPR_SgInfo_GenderDesc = ++startIndex8,
   SPR_SgInfo_maritalstatus = ++startIndex8,
   SPR_SgInfo_maritalstatusDesc = ++startIndex8,
   SPR_SgInfo_Nationality = ++startIndex8,
   SPR_SgInfo_NationalityDesc = ++startIndex8,
   SPR_SgInfo_Opsadilco = ++startIndex8,
   SPR_SgInfo_Politic = ++startIndex8,
   SPR_SgInfo_Politicposition = ++startIndex8,
   SPR_SgInfo_PoliticpositionDesc = ++startIndex8,
   SPR_SgInfo_Tin = ++startIndex8,
   SPR_SgInfo_SSS = ++startIndex8,
   SPR_SgInfo_Gsis = ++startIndex8,
   SPR_SgInfo_Employmentsource = ++startIndex8,
   SPR_SgInfo_EmploymentsourceDesc = ++startIndex8,
   SPR_SgInfo_IDCode = ++startIndex8,
   SPR_SgInfo_IDDesc = ++startIndex8,
   SPR_SgInfo_IDNo = ++startIndex8,
   SPR_SgInfo_ContctDetails = ++startIndex8,
   SPR_SgInfo_LocDetails = ++startIndex8,
   SPR_SgInfo_EmpInfo = ++startIndex8,
   SPR_SgInfo_BusInfor = ++startIndex8,
   SPR_SgInfo_ReqCom = ++startIndex8,
   SPR_SgInfo_RCTAG = ++startIndex8,
   SPR_SgInfo_ConTAG = ++startIndex8,
   SPR_SgInfo_LocTAG = ++startIndex8,
   SPR_SgInfo_EmpTAG = ++startIndex8,
   SPR_SgInfo_BusTAG = ++startIndex8,
   SPR_SgInfo_LINEID = ++startIndex8;

//Signatori Contact


var startIndex9 = 0,
  SPR_SigCI_CommType = ++startIndex9,
  SPR_SigCI_CommCode = ++startIndex9,
  SPR_SigCI_Value = ++startIndex9,
  SPR_SigCI_CommTypeTag = ++startIndex9;



var startIndex10 = 0,
          SPR_BR_EffectiveDate = ++startIndex10,
          SPR_BR_Name = ++startIndex10,
          SPR_BR_BirthDate = ++startIndex10,
          SPR_BR_Nationality = ++startIndex10,
          SPR_BR_NationalityDesc = ++startIndex10,
          SPR_BR_Address = ++startIndex10,
          SPR_BR_Desig = ++startIndex10,
          SPR_BR_PerShare = ++startIndex10;

var startIndex12 = 0,
     SPR_TR_Name = ++startIndex12,
     SPR_TR_contactno = ++startIndex12,
     SPR_TR_Address = ++startIndex12,
     SPR_TR_ROWNO = ++startIndex12;

var startIndex20 = 0,
SPR_IDV_IDcode = ++startIndex20,
SPR_IDV_IDdesc = ++startIndex20,
SPR_IDV_IDno = ++startIndex20;


var startIndex22 = 0,
    SPR_CL_Currency = ++startIndex22,
    SPR_CL_Limit = ++startIndex22,
    SPR_CL_Utilization = ++startIndex22,
    SPR_CL_Available = ++startIndex22,
    SPR_CL_Calculation = ++startIndex22,
    SPR_CL_Status = ++startIndex22,
    SPR_CL_Effectivedate = ++startIndex22,
    SPR_CL_Expirydate = ++startIndex22,
    SPR_CL_UtilizeDtls = ++startIndex22;

var startIndex23 = 0,
SPR_DOCDETAILSCODEHDR = ++startIndex23;

var startIndex24 = 0,
SPR_direction = ++startIndex24,
        SPR_directiondesc = ++startIndex24,
        SPR_currency = ++startIndex24,
        SPR_currencydesc = ++startIndex24,
        SPR_method = ++startIndex24,
        SPR_methoddesc = ++startIndex24,
        SPR_initialMethod = ++startIndex24,
        SPR_initialMethoddesc = ++startIndex24,
        SPR_effectiveFor = ++startIndex24,
        SPR_effectiveFordesc = ++startIndex24,
        SPR_effectiveFrom = ++startIndex24,
        SPR_effectiveTo = ++startIndex24,
        SPR_ROWNO = ++startIndex24;

var startIndex25 = 0,
    SPR_bank = ++startIndex25,
    SPR_bankDesc = ++startIndex25,
    SPR_branch = ++startIndex25,
    SPR_cashtypecode = ++startIndex25,
    SPR_cashtype = ++startIndex25,
    SPR_accName = ++startIndex25,
    SPR_BR_Rowno = ++startIndex25;

var startIndex26 = 0,
    SPR_CODE = ++startIndex26,
    SPR_DESC = ++startIndex26;

var startIndex27 = 0,
    SPR_ConRefNo = ++startIndex27,
    SPR_Asset = ++startIndex27,
    SPR_AmmFin = ++startIndex27,
    SPR_Term = ++startIndex27,
    SPR_Vehicle = ++startIndex27,
    SPR_LoanMaturity = ++startIndex27;


function func_Reload() {
    //LoadStringsCases();


    crLnk = GetCurrentURL() + "LMSBorrowerInfo_Gateway";
    crLnkGateKey = "LMSBorrowerInfo";
    crnwTagSingleBind = true;

    nwIsReport = getParameterByName('nwIsReport');
    nwParameter_Add("nwIsReport", nwIsReport);

    nwSupplierCode = getParameterByName('nwSupplierCode');
    nwParameter_Add("nwSupplierCode", nwSupplierCode);

    nwDocno = getParameterByName('nwDocno');
    nwParameter_Add("nwDocno", nwDocno);

    nwCode = getParameterByName('nwCode');
    nwParameter_Add('nwCode', nwCode);

    
    //DisableFieldsDone();

    var isContinue = true;
    init_request();
    DisableFields();

    //$('#txtDateBirth').mask('');
    //$('#txt_ID_DateOfBirth').mask('');
    //$('.txt_BInfo_DateBirth').mask('');
    //$('#txt_OBI_StatmntDate').mask('');

    nwPopupForm_Create("nwBorrContactDtls", true);
    nwPopupForm_Create("nwBorrLocationDtls", true);
    nwPopupForm_Create("nwBorrEmployeeDtls", true);
    nwPopupForm_Create("nwBorrBussDtls", true);
    nwPopupForm_Create("nwOtrSrc", true);
    nwPopupForm_Create("nwSignaContactDtls", true);
    nwPopupForm_Create("nwSignaLocation", true);
    nwPopupForm_Create("nwSigEmpDtls", true);
    nwPopupForm_Create("nwSigBussDtls", true);
    nwPopupForm_Create("nwPaymentDtls", true);
    nwPopupForm_Create("nwUtilDtls", true);
    nwPopupForm_Create("nwDisappDtls", true);
    
    $('#noah-webui-default-Save').enable(false);
    $('#noah-webui-default-Delete').enable(false);
    $('#noah-webui-default-Process').enable(false);

    return isContinue;
}




function mainLoad() {
    if (nwDocno != "") {
        $('#noah-webui-Toolbox').visible(false);
        $('#noah-webui-Footer').visible(false);
        nwParameter_Add('nwDocno', nwDocno);
        $('#noah-webui-default-Refresh').click();
    }
}


function phoneBor(){
    $('#txt_CEI_PhoneNo').mask('?(xxx) xxx-xxxx');
    $('#txt_CBI_PhoneNo').mask('?(xxx) xxx-xxxx');
}

function phoneSig(){
    $('#txt_SigEI_PhoneNo').mask('?(xxx) xxx-xxxx');
    $('#txt_SigBI_PhoneNo').mask('?(xxx) xxx-xxxx');
}
// function if nwIsReport
function nwIsRefresh() {
    if (nwIsReport == 1) {
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        nwParameter_add('nwCode', nwCode)
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox").hide();
    }
    else if (nwDocno != "") {
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        nwParameter_add('nwCode', nwCode)
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

    //nwParameter_Add_Table("nwGrid1Con");
    //nwParameter_Add_Table("nwGrid2Con");
    $('#noah-webui-Toolbox-BindingNavigator').enable(false);
    //func_ActionDriven("actHeadOffice", false);
    _checkAbove = false;
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
    //isnewrow = 0;
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

    try{nwParameter_Add_Spread(nwGridContactInfoCon_Book);}catch(ex){};
    try{nwParameter_Add_Spread(nwGridDependntInfoCon_Book);}catch(ex){};
    try{nwParameter_Add_Spread(nwGridBorrowerInfoCon_Book);}catch(ex){};
    try{nwParameter_Add_Spread(nwGridSigntrsInfoCon_Book);}catch(ex){};
    try{nwParameter_Add_Spread(nwGridTradeReferenceCon_Book);}catch(ex){};
    try{nwParameter_Add_Spread(nwGridBankReferenceCon_Book);}catch(ex){};
    try{nwParameter_Add_Spread(nwGridCreditLineCon_Book);}catch(ex){};
    try{nwParameter_Add_Spread(nwGridPaymentDtlsCon_Book);}catch(ex){};
    try{nwParameter_Add_Spread(nwGridCoBorrowerContactInfoCon_Book);}catch(ex){};
    try{nwParameter_Add_Spread(nwGridSigntryContactDtlsCon_Book);}catch(ex){};
    try{nwParameter_Add_Spread(nwGridIndCon_Book);}catch(ex){};
    try{nwParameter_Add_Spread(nwGridSpoCon_Book);}catch(ex){};
    try { nwParameter_Add_Spread(nwGridSpouseConInfoCon_Book); } catch (ex) { };
    try { nwParameter_Add_Spread(nwGridBorrOthSrcIncInfoCon_Book); } catch (ex) { };
    try { nwParameter_Add_Spread(nwGridBenefOwnCon_Book); } catch (ex) { };

    //nwParameter_Add_Table("nwGridContactInfoCon", true);
    //nwParameter_Add_Table("nwGridDependntInfoCon", true);
    //nwParameter_Add_Table("nwGridBorrowerInfoCon", true);
    //nwParameter_Add_Table("nwGridSigntrsInfoCon", true);
    //nwParameter_Add_Table("nwGridTradeReferenceCon", true);
    //nwParameter_Add_Table("nwGridBankReferenceCon", true);
    //nwParameter_Add_Table("nwGridCreditLineCon", true);
    //nwParameter_Add_Table("nwGridPaymentDtlsCon", true);
    //nwParameter_Add_Table("nwGridCoBorrowerContactInfoCon", true);
    //nwParameter_Add_Table("nwGridSigntryContactDtlsCon", true);

    //nwParameter_Add_Table("nwGridIndCon", true);
    //nwParameter_Add_Table("nwGridSpoCon", true);

    nwParameter_Add('brlineid', brlineid);
    nwParameter_Add('sglineid', sglineid);
    nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());
    nwParameter_Add("cbIndvPolExpPer", $('#cbIndvPolExpPer').is(':checked'));
    nwParameter_Add("cbSIPolExpPer", $('#cbSIPolExpPer').is(':checked'));

    nwParameter_Add("rdbInd", $('#rdbInd').is(':checked'));
    nwParameter_Add("rdbBus", $('#rdbBus').is(':checked'));

    nwParameter_Add("rdbEmp", $('#rdbEmp').is(':checked'));
    nwParameter_Add("rdbBuss", $('#rdbBuss').is(':checked'));
    nwParameter_Add("rdbOthers", $('#rdbOthers').is(':checked'));

    nwParameter_Add("rdbEmp_Sps", $('#rdbEmp_Sps').is(':checked'));
    nwParameter_Add("rdbBuss_Sps", $('#rdbBuss_Sps').is(':checked'));
    nwParameter_Add("rdbOthers_Sps", $('#rdbOthers_Sps').is(':checked'));

    nwParameter_Add("chkMarried", $('#chkMarried').is(':checked'));
    
    //nwParameter_Add("txtBorrowersCode", $('#txtBorrowersCode').val());
    //DropDown
    nwParameter_Add("txt_OBI_Land", $('#txt_OBI_Land').val());
    nwParameter_Add("cmbLIPrepMail", $('#cmbLIPrepMail').val());
    nwParameter_Add("cmbSLIPrepMail", $('#cmbSLIPrepMail').val());
    nwParameter_Add("cmbCLIPrepMail", $('#cmbCLIPrepMail').val());
    nwParameter_Add("cmbSigLIPrepMail", $('#cmbSigLIPrepMail').val());

    //Main
    nwParameter_Add("idvallugPartyType", $('#idvallugPartyType').val());
    nwParameter_Add("descvallugPartyType", $('#descvallugPartyType').val());

    //
    nwParameter_Add("idvallugIndustry", $('#idvallugIndustry').val());
    nwParameter_Add("idvallugIndustryScheme", $('#idvallugIndustryScheme').val());
    nwParameter_Add("idvallugEntityType", $('#idvallugEntityType').val());
    nwParameter_Add("idvallugBusinessReg", $('#idvallugBusinessReg').val());
    nwParameter_Add("txtApprovalID", $('#txtApprovalID').val());


    nwParameter_Add("idvallugIDSalutation", $('#idvallugIDSalutation').val());
    nwParameter_Add("txt_ID_LastName", $('#txt_ID_LastName').val());
    nwParameter_Add("txt_ID_FirstName", $('#txt_ID_FirstName').val());
    nwParameter_Add("idvallugNameSuffix", $('#idvallugNameSuffix').val());
    nwParameter_Add("txt_ID_DateOfBirth", $('#txt_ID_DateOfBirth').val());
    nwParameter_Add("idvallugGender", $('#idvallugGender').val());
    nwParameter_Add("idvallugMaritalStatus", $('#idvallugMaritalStatus').val());
    nwParameter_Add("idvallugNationality", $('#idvallugNationality').val());
    nwParameter_Add("idvallugPolExpPer", $('#idvallugPolExpPer').val());
  
    nwParameter_Add("txt_CNID_RegistrdName", $('#txt_CNID_RegistrdName').val());
    nwParameter_Add("txt_CNID_TradeName", $('#txt_CNID_TradeName').val());
    nwParameter_Add("idvallugMSMETag", $('#idvallugMSMETag').val());
    nwParameter_Add("idvallugCNID_NatBu", $('#idvallugCNID_NatBu').val());
    nwParameter_Add("txt_CNID_TIN", $('#txt_CNID_TIN').val());
    nwParameter_Add("txt_CNID_TotalAsst", $('#txt_CNID_TotalAsst').val());
    nwParameter_Add("idvallugBusinessRegstrtn", $('#idvallugBusinessRegstrtn').val());
    nwParameter_Add("txt_CNID_NoEmp", $('#txt_CNID_NoEmp').val());

    nwParameter_Add("idvallugLIHomeOwnrshp", $('#idvallugLIHomeOwnrshp').val());
    nwParameter_Add("txt_LI_FullAddress", $('#txt_LI_FullAddress').val());
    nwParameter_Add("txt_LI_LengthStay", $('#txt_LI_LengthStay').val());
    nwParameter_Add("txt_LI_Landmark", $('#txt_LI_Landmark').val());
    nwParameter_Add("idvallugLIHomeOwnrshp2", $('#idvallugLIHomeOwnrshp2').val());
    nwParameter_Add("txt_LI_FullAddress2", $('#txt_LI_FullAddress2').val());
    nwParameter_Add("txt_LI_LengthStay2", $('#txt_LI_LengthStay2').val());
    nwParameter_Add("txt_LI_Landmark2", $('#txt_LI_Landmark2').val());

    nwParameter_Add("lugEIEmploymentType", $('#lugEIEmploymentType').val());
    nwParameter_Add("txt_EI_EmployerName", $('#txt_EI_EmployerName').val());
    nwParameter_Add("idvallugEIEmploymentStatus", $('#idvallugEIEmploymentStatus').val());
    nwParameter_Add("idvallugEINatureEmplymnt", $('#idvallugEINatureEmplymnt').val());
    nwParameter_Add("txt_EI_Years", $('#txt_EI_Years').val());
    nwParameter_Add("txt_EI_Month", $('#txt_EI_Month').val());
    nwParameter_Add("idvallugEIPosition", $('#idvallugEIPosition').val());
    nwParameter_Add("txt_EI_PhoneNo", $('#txt_LI_Landmark2').val());
    nwParameter_Add("txt_EI_MobileNo", $('#txt_EI_MobileNo').val());
    nwParameter_Add("txt_EI_EmailAdd", $('#txt_EI_EmailAdd').val());
    nwParameter_Add("idvallugEIBusinessIncSrc", $('#idvallugEIBusinessIncSrc').val());

    nwParameter_Add("txt_BI_BusinessName", $('#txt_BI_BusinessName').val());
    nwParameter_Add("idvallugBIBusinessType", $('#idvallugBIBusinessType').val());
    nwParameter_Add("idvallugBINatureBusiness", $('#idvallugBINatureBusiness').val());
    nwParameter_Add("idvallugBIOccptnPositn", $('#idvallugBIOccptnPositn').val());
    nwParameter_Add("idvallugBusinessRgstrtn", $('#idvallugBusinessRgstrtn').val());
    nwParameter_Add("txt_BI_PhoneNo", $('#txt_BI_PhoneNo').val());
    nwParameter_Add("txt_BI_MobileNo", $('#txt_BI_MobileNo').val());
    nwParameter_Add("txt_BI_EmailAdd", $('#txt_BI_EmailAdd').val());
    nwParameter_Add("idvallugBIBusinessIncSrc", $('#idvallugBIBusinessIncSrc').val());
    nwParameter_Add("txt_BI_Landmark", $('#txt_BI_Landmark').val());

    nwParameter_Add("txt_BI_Years", $('#txt_BI_Years').val());

    nwParameter_Add("cbSLISBLI", $('#cbSLISBLI').prop("checked"));
    nwParameter_Add("idvallugSLIHomeOwnrshp", $('#idvallugSLIHomeOwnrshp').val());
    nwParameter_Add("txt_SLI_FullAddress", $('#txt_SLI_FullAddress').val());
    nwParameter_Add("txt_SLI_LengthStay", $('#txt_SLI_LengthStay').val());
    nwParameter_Add("txt_SLI_Landmark", $('#txt_SLI_Landmark').val());
    nwParameter_Add("idvallugSLIHomeOwnrshp2", $('#idvallugSLIHomeOwnrshp2').val());
    nwParameter_Add("txt_SLI_FullAddress2", $('#txt_SLI_FullAddress2').val());
    nwParameter_Add("txt_SLI_LengthStay2", $('#txt_SLI_LengthStay2').val());
    nwParameter_Add("txt_SLI_Landmark2", $('#txt_SLI_Landmark2').val());

    nwParameter_Add("lugSEIEmploymentType", $('#lugSEIEmploymentType').val());
    nwParameter_Add("txt_SEI_EmployerName", $('#txt_SEI_EmployerName').val());
    nwParameter_Add("idvallugSEIEmploymentStatus", $('#idvallugSEIEmploymentStatus').val());
    nwParameter_Add("idvallugSEINatureEmplymnt", $('#idvallugSEINatureEmplymnt').val());
    nwParameter_Add("txt_SEI_Years", $('#txt_SEI_Years').val());
    nwParameter_Add("txt_SEI_Month", $('#txt_SEI_Month').val());
    nwParameter_Add("idvallugSEIPosition", $('#idvallugSEIPosition').val());

    nwParameter_Add("txt_SEI_PhoneNo", $('#txt_SEI_Landmark2').val());
    nwParameter_Add("txt_SEI_MobileNo", $('#txt_SEI_MobileNo').val());
    nwParameter_Add("txt_SEI_EmailAdd", $('#txt_SEI_EmailAdd').val());
    nwParameter_Add("idvallugSEIBusinessIncSrc", $('#idvallugSEIBusinessIncSrc').val());

    nwParameter_Add("txt_SBI_BusinessName", $('#txt_SBI_BusinessName').val());
    nwParameter_Add("idvallugSBIBusinessType", $('#idvallugSBIBusinessType').val());
    nwParameter_Add("idvallugSBINatureBusiness", $('#idvallugSBINatureBusiness').val());
    nwParameter_Add("idvallugSBIOccptnPositn", $('#idvallugSBIOccptnPositn').val());
    nwParameter_Add("idvallugBusinessRgstrtn", $('#idvallugBusinessRgstrtn').val());
    nwParameter_Add("txt_SBI_PhoneNo", $('#txt_SBI_PhoneNo').val());
    nwParameter_Add("txt_SBI_MoSBIleNo", $('#txt_SBI_MoSBIleNo').val());
    nwParameter_Add("txt_SBI_EmailAdd", $('#txt_SBI_EmailAdd').val());
    nwParameter_Add("idvallugSBIBusinessIncSrc", $('#idvallugSBIBusinessIncSrc').val());
    nwParameter_Add("txt_SBI_Landmark", $('#txt_SBI_Landmark').val());

    nwParameter_Add("txt_SBI_Years", $('#txt_SBI_Years').val());

    nwParameter_Add("cbCLISBLI", $('#cbCLISBLI').prop("checked"));
    nwParameter_Add("cmbCLIPrepMail", $("#cmbCLIPrepMail").val());
    nwParameter_Add("idvallugCLIHomeOwnrshp", $("#idvallugCLIHomeOwnrshp").val());
    nwParameter_Add("txt_CLI_LengthStay", $("#txt_CLI_LengthStay").val());
    nwParameter_Add("cb_CLI_FullAddress", $('#cb_CLI_FullAddress').prop("checked"));
    nwParameter_Add("txt_CLI_FullAddress", $('#txt_CLI_FullAddress').val());
    nwParameter_Add("txt_CLI_UnitNo", $("#txt_CLI_UnitNo").val());
    nwParameter_Add("txt_CLI_FloorNo", $("#txt_CLI_FloorNo").val());
    nwParameter_Add("txt_CLI_BldgNo", $("#txt_CLI_BldgNo").val());
    nwParameter_Add("txt_CLI_BuildingName", $("#txt_CLI_BuildingName").val());
    nwParameter_Add("txt_CLI_Landmark", $("#txt_CLI_Landmark").val());
    nwParameter_Add("txt_CLI_HouseNo", $("#txt_CLI_HouseNo").val());
    nwParameter_Add("txt_CLI_StreetName", $("#txt_CLI_StreetName").val());
    nwParameter_Add("txt_CLI_Lot", $("#txt_CLI_Lot").val());
    nwParameter_Add("txt_CLI_Block", $("#txt_CLI_Block").val());
    nwParameter_Add("txt_CLI_Phase", $("#txt_CLI_Phase").val());

    nwParameter_Add("txt_CLI_Subdivision", $("#txt_CLI_Subdivision").val());
    nwParameter_Add("txt_CLI_Zone", $("#txt_CLI_Zone").val());
    nwParameter_Add("idvallugCLIBarangay", $("#idvallugCLIBarangay").val());
    nwParameter_Add("idvallugCLIMunicipality", $("#idvallugCLIMunicipality").val());
    nwParameter_Add("descvallugCLIMunicipality", $("#descvallugCLIMunicipality").val());
    nwParameter_Add("txt_CLI_Zip", $("#txt_CLI_Zip").val());

    // For the second set of values
    nwParameter_Add("cbCLIPresentAdd", $("#cbCLIPresentAdd").prop("checked"));
    nwParameter_Add("idvallugCLIHomeOwnrshp2", $("#idvallugCLIHomeOwnrshp2").val());
    nwParameter_Add("txt_CLI_LengthStay2", $("#txt_CLI_LengthStay2").val());
    nwParameter_Add("cb_CLI_FullAddress2", $('#cb_CLI_FullAddress2').prop("checked"));
    nwParameter_Add("txt_CLI_FullAddress2", $('#txt_CLI_FullAddress2').val());

    nwParameter_Add("txt_CLI_UnitNo2", $("#txt_CLI_UnitNo2").val());
    nwParameter_Add("txt_CLI_FloorNo2", $("#txt_CLI_FloorNo2").val());
    nwParameter_Add("txt_CLI_BldgNo2", $("#txt_CLI_BldgNo2").val());
    nwParameter_Add("txt_CLI_BuildingName2", $("#txt_CLI_BuildingName2").val());
    nwParameter_Add("txt_CLI_Landmark2", $("#txt_CLI_Landmark2").val());
    nwParameter_Add("txt_CLI_HouseNo2", $("#txt_CLI_HouseNo2").val());
    nwParameter_Add("txt_CLI_StreetName2", $("#txt_CLI_StreetName2").val());
    nwParameter_Add("txt_CLI_Lot2", $("#txt_CLI_Lot2").val());
    nwParameter_Add("txt_CLI_Block2", $("#txt_CLI_Block2").val());
    nwParameter_Add("txt_CLI_Phase2", $("#txt_CLI_Phase2").val());
    nwParameter_Add("txt_CLI_Subdivision2", $("#txt_CLI_Subdivision2").val());
    nwParameter_Add("txt_CLI_Zone2", $("#txt_CLI_Zone2").val());
    nwParameter_Add("idvallugCLIBarangay2", $("#idvallugCLIBarangay2").val());
    nwParameter_Add("idvallugCLIMunicipality2", $("#idvallugCLIMunicipality2").val());
    nwParameter_Add("txt_CLI_Zip2", $("#txt_CLI_Zip2").val());

    nwParameter_Add("idvallugCEIEmploymentType", $("#idvallugCEIEmploymentType").val());
    nwParameter_Add("txt_CEI_EmployerName", $("#txt_CEI_EmployerName").val());
    nwParameter_Add("idvallugCEIEmploymentStatus", $("#idvallugCEIEmploymentStatus").val());
    nwParameter_Add("txt_CEI_JobTitle", $("#txt_CEI_JobTitle").val()); 
    nwParameter_Add("idvallugCEINatureEmplymnt", $("#idvallugCEINatureEmplymnt").val());
    nwParameter_Add("txt_CEI_Years", $("#txt_CEI_Years").val());
    nwParameter_Add("txt_CEI_Month", $("#txt_CEI_Month").val()); 
    nwParameter_Add("idvallugCEIPosition", $("#idvallugCEIPosition").val()); 
    nwParameter_Add("txt_CEI_GrossMnthlyIncm", $("#txt_CEI_GrossMnthlyIncm").val());
    nwParameter_Add("txt_CEI_PhoneNo", $("#txt_CEI_PhoneNo").val());
    nwParameter_Add("txt_CEI_MobileNo", $("#txt_CEI_MobileNo").val());
    nwParameter_Add("txt_CEI_EmailAdd", $("#txt_CEI_EmailAdd").val());
    nwParameter_Add("idvallugCEIBusinessIncSrc", $("#idvallugCEIBusinessIncSrc").val());
    nwParameter_Add("txt_CEI_EmploymentAddress", $("#txt_CEI_EmploymentAddress").val());
    nwParameter_Add("txt_CEI_UnitNo", $("#txt_CEI_UnitNo").val());
    nwParameter_Add("txt_CEI_FloorNo", $("#txt_CEI_FloorNo").val());
    nwParameter_Add("txt_CEI_BldgNo", $("#txt_CEI_BldgNo").val());
    nwParameter_Add("txt_CEI_BldgName", $("#txt_CEI_BldgName").val());
    nwParameter_Add("txt_CEI_House", $("#txt_CEI_House").val());
    nwParameter_Add("txt_CEI_StreetName", $("#txt_CEI_StreetName").val());
    nwParameter_Add("txt_CEI_Lot", $("#txt_CEI_Lot").val());
    nwParameter_Add("txt_CEI_Block", $("#txt_CEI_Block").val());
    nwParameter_Add("txt_CEI_Phase", $("#txt_CEI_Phase").val());
    nwParameter_Add("txt_CEI_Subdivision", $("#txt_CEI_Subdivision").val());
    nwParameter_Add("txt_CEI_Zone", $("#txt_CEI_Zone").val());
    nwParameter_Add("idvallugCEIBarangay", $("#idvallugCEIBarangay").val());
    nwParameter_Add("idvallugCEIMunicipality", $("#idvallugCEIMunicipality").val());
    nwParameter_Add("txt_CEI_Zip", $("#txt_CEI_Zip").val());

    nwParameter_Add("txt_CBI_BusinessName", $('#txt_CBI_BusinessName').val());
    nwParameter_Add("idvallugCBIBusinessType", $('#idvallugCBIBusinessType').val());
    nwParameter_Add("idvallugCBINatureBusiness", $('#idvallugCBINatureBusiness').val());
    nwParameter_Add("txt_CBI_JobTitle", $('#txt_CBI_JobTitle').val());
    nwParameter_Add("idvallugCBIOccptnPositn", $('#idvallugCBIOccptnPositn').val());
    nwParameter_Add("txt_CBI_Years", $('#txt_CBI_Years').val());
    nwParameter_Add("txt_CBI_Month", $('#txt_CBI_Month').val());
    nwParameter_Add("txt_CBI_PhoneNo", $('#txt_CBI_PhoneNo').val());
    nwParameter_Add("txt_CBI_MobileNo", $('#txt_CBI_MobileNo').val());
    nwParameter_Add("txt_CBI_EmailAdd", $('#txt_CBI_EmailAdd').val());
    nwParameter_Add("idvallugCBIBusinessIncSrc", $('#idvallugCBIBusinessIncSrc').val());
    nwParameter_Add("txt_CBI_BusinessAddress", $('#txt_CBI_BusinessAddress').val());

    nwParameter_Add("txt_CBI_GrossMnthlyIncm", $('#txt_CBI_GrossMnthlyIncm').val());
    nwParameter_Add("txt_CBI_UnitNo", $('#txt_CBI_UnitNo').val());
    nwParameter_Add("txt_CBI_FloorNo", $('#txt_CBI_FloorNo').val());
    nwParameter_Add("txt_CBI_BldgNo", $('#txt_CBI_BldgNo').val());
    nwParameter_Add("txt_CBI_BldgName", $('#txt_CBI_BldgName').val());
    nwParameter_Add("txt_CBI_House", $('#txt_CBI_House').val());
    nwParameter_Add("txt_CBI_StreetName", $('#txt_CBI_StreetName').val());
    nwParameter_Add("txt_CBI_Lot", $('#txt_CBI_Lot').val());
    nwParameter_Add("txt_CBI_Block", $('#txt_CBI_Block').val());
    nwParameter_Add("txt_CBI_Phase", $('#txt_CBI_Phase').val());
    nwParameter_Add("txt_CBI_Subdivision", $('#txt_CBI_Subdivision').val());
    nwParameter_Add("txt_CBI_Zone", $('#txt_CBI_Zone').val());
    nwParameter_Add("idvallugCBIBarangay", $('#idvallugCBIBarangay').val());
    nwParameter_Add("idvallugCBIMunicipality", $('#idvallugCBIMunicipality').val());
    nwParameter_Add("txt_CBI_Zip", $('#txt_CBI_Zip').val());

    nwParameter_Add("cmbSigLIPrepMail", $("#cmbSigLIPrepMail").val());
    nwParameter_Add("idvallugSigLIHomeOwnrshp", $("#idvallugSigLIHomeOwnrshp").val());
    nwParameter_Add("txt_SigLI_LengthStay", $("#txt_SigLI_LengthStay").val());

    nwParameter_Add("cb_SigLI_FullAddress", $('#cb_SigLI_FullAddress').prop("checked"));
    nwParameter_Add("txt_SigLI_FullAddress", $('#txt_SigLI_FullAddress').val());

    nwParameter_Add("txt_SigLI_UnitNo", $("#txt_SigLI_UnitNo").val());
    nwParameter_Add("txt_SigLI_FloorNo", $("#txt_SigLI_FloorNo").val());
    nwParameter_Add("txt_SigLI_BldgNo", $("#txt_SigLI_BldgNo").val());
    nwParameter_Add("txt_SigLI_BuildingName", $("#txt_SigLI_BuildingName").val());
    nwParameter_Add("txt_SigLI_Landmark", $("#txt_SigLI_Landmark").val());
    nwParameter_Add("txt_SigLI_HouseNo", $("#txt_SigLI_HouseNo").val());
    nwParameter_Add("txt_SigLI_StreetName", $("#txt_SigLI_StreetName").val());
    nwParameter_Add("txt_SigLI_Lot", $("#txt_SigLI_Lot").val());
    nwParameter_Add("txt_SigLI_Block", $("#txt_SigLI_Block").val());
    nwParameter_Add("txt_SigLI_Phase", $("#txt_SigLI_Phase").val());
    nwParameter_Add("txt_SigLI_Subdivision", $("#txt_SigLI_Subdivision").val());
    nwParameter_Add("txt_SigLI_Zone", $("#txt_SigLI_Zone").val());
    nwParameter_Add("idvallugSigLIBarangay", $("#idvallugSigLIBarangay").val());
    nwParameter_Add("idvallugSigLIMunicipality", $("#idvallugSigLIMunicipality").val());
    nwParameter_Add("txt_SigLI_Zip", $("#txt_SigLI_Zip").val());

    // For the second set of values
    nwParameter_Add("cbSigLIPresentAdd", $("#cbSigLIPresentAdd").prop("checked"));
    nwParameter_Add("idvallugSigLIHomeOwnrshp2", $("#idvallugSigLIHomeOwnrshp2").val());
    nwParameter_Add("txt_SigLI_LengthStay2", $("#txt_SigLI_LengthStay2").val());
    nwParameter_Add("cb_SigLI_FullAddress2", $('#cb_SigLI_FullAddress2').prop("checked"));
    nwParameter_Add("txt_SigLI_FullAddress2", $('#txt_SigLI_FullAddress2').val());
    nwParameter_Add("txt_SigLI_UnitNo2", $("#txt_SigLI_UnitNo2").val());
    nwParameter_Add("txt_SigLI_FloorNo2", $("#txt_SigLI_FloorNo2").val());
    nwParameter_Add("txt_SigLI_BldgNo2", $("#txt_SigLI_BldgNo2").val());
    nwParameter_Add("txt_SigLI_BuildingName2", $("#txt_SigLI_BuildingName2").val());
    nwParameter_Add("txt_SigLI_Landmark2", $("#txt_SigLI_Landmark2").val());
    nwParameter_Add("txt_SigLI_HouseNo2", $("#txt_SigLI_HouseNo2").val());
    nwParameter_Add("txt_SigLI_StreetName2", $("#txt_SigLI_StreetName2").val());
    nwParameter_Add("txt_SigLI_Lot2", $("#txt_SigLI_Lot2").val());
    nwParameter_Add("txt_SigLI_Block2", $("#txt_SigLI_Block2").val());
    nwParameter_Add("txt_SigLI_Phase2", $("#txt_SigLI_Phase2").val());
    nwParameter_Add("txt_SigLI_Subdivision2", $("#txt_SigLI_Subdivision2").val());
    nwParameter_Add("txt_SigLI_Zone2", $("#txt_SigLI_Zone2").val());
    nwParameter_Add("idvallugSigLIBarangay2", $("#idvallugSigLIBarangay2").val());
    nwParameter_Add("idvallugSigLIMunicipality2", $("#idvallugSigLIMunicipality2").val());
    nwParameter_Add("txt_SigLI_Zip2", $("#txt_SigLI_Zip2").val());

    nwParameter_Add("idvallugSigEIEmploymentType", $("#idvallugSigEIEmploymentType").val());
    nwParameter_Add("txt_SigEI_EmployerName", $("#txt_SigEI_EmployerName").val());
    nwParameter_Add("idvallugSigEIEmploymentStatus", $("#idvallugSigEIEmploymentStatus").val());
    nwParameter_Add("txt_SigEI_JobTitle", $("#txt_SigEI_JobTitle").val());
    nwParameter_Add("idvallugSigEINatureEmplymnt", $("#idvallugSigEINatureEmplymnt").val());
    nwParameter_Add("txt_SigEI_Years", $("#txt_SigEI_Years").val());
    nwParameter_Add("txt_SigEI_Month", $("#txt_SigEI_Month").val());
    nwParameter_Add("idvallugSigEIPosition", $("#idvallugSigEIPosition").val());
    nwParameter_Add("txt_SigEI_GrossMnthlyIncm", $("#txt_SigEI_GrossMnthlyIncm").val());
    nwParameter_Add("txt_SigEI_PhoneNo", $("#txt_SigEI_PhoneNo").val());
    nwParameter_Add("txt_SigEI_MobileNo", $("#txt_SigEI_MobileNo").val());
    nwParameter_Add("txt_SigEI_EmailAdd", $("#txt_SigEI_EmailAdd").val());
    nwParameter_Add("idvallugSigEIBusinessIncSrc", $("#idvallugSigEIBusinessIncSrc").val());
    nwParameter_Add("txt_SigEI_EmploymentAddress", $("#txt_SigEI_EmploymentAddress").val());
    nwParameter_Add("txt_SigEI_UnitNo", $("#txt_SigEI_UnitNo").val());
    nwParameter_Add("txt_SigEI_FloorNo", $("#txt_SigEI_FloorNo").val());
    nwParameter_Add("txt_SigEI_BldgNo", $("#txt_SigEI_BldgNo").val());
    nwParameter_Add("txt_SigEI_BldgName", $("#txt_SigEI_BldgName").val());
    nwParameter_Add("txt_SigEI_House", $("#txt_SigEI_House").val());
    nwParameter_Add("txt_SigEI_StreetName", $("#txt_SigEI_StreetName").val());
    nwParameter_Add("txt_SigEI_Lot", $("#txt_SigEI_Lot").val());
    nwParameter_Add("txt_SigEI_Block", $("#txt_SigEI_Block").val());
    nwParameter_Add("txt_SigEI_Phase", $("#txt_SigEI_Phase").val());
    nwParameter_Add("txt_SigEI_Subdivision", $("#txt_SigEI_Subdivision").val());
    nwParameter_Add("txt_SigEI_Zone", $("#txt_SigEI_Zone").val());
    nwParameter_Add("idvallugSigEIBarangay", $("#idvallugSigEIBarangay").val());
    nwParameter_Add("idvallugSigEIMunicipality", $("#idvallugSigEIMunicipality").val());
    nwParameter_Add("txt_SigEI_Zip", $("#txt_SigEI_Zip").val());

    nwParameter_Add("txt_SigBI_BusinessName", $('#txt_SigBI_BusinessName').val());
    nwParameter_Add("idvallugSigBIBusinessType", $('#idvallugSigBIBusinessType').val());
    nwParameter_Add("idvallugSigBINatureBusiness", $('#idvallugSigBINatureBusiness').val());
    nwParameter_Add("txt_SigBI_JobTitle", $('#txt_SigBI_JobTitle').val());
    nwParameter_Add("idvallugSigBIOccptnPositn", $('#idvallugSigBIOccptnPositn').val());
    nwParameter_Add("txt_SigBI_Years", $('#txt_SigBI_Years').val());
    nwParameter_Add("txt_SigBI_Month", $('#txt_SigBI_Month').val());
    nwParameter_Add("txt_SigBI_GrossMnthlyIncm", $('#txt_SigBI_GrossMnthlyIncm').val());
    nwParameter_Add("txt_SigBI_PhoneNo", $('#txt_SigBI_PhoneNo').val());
    nwParameter_Add("txt_SigBI_MobileNo", $('#txt_SigBI_MobileNo').val());
    nwParameter_Add("txt_SigBI_EmailAdd", $('#txt_SigBI_EmailAdd').val());
    nwParameter_Add("idvallugSigBIBusinessIncSrc", $('#idvallugSigBIBusinessIncSrc').val());
    nwParameter_Add("txt_SigBI_BusinessAddress", $('#txt_SigBI_BusinessAddress').val());
    nwParameter_Add("txt_SigBI_UnitNo", $('#txt_SigBI_UnitNo').val());
    nwParameter_Add("txt_SigBI_FloorNo", $('#txt_SigBI_FloorNo').val());
    nwParameter_Add("txt_SigBI_BldgNo", $('#txt_SigBI_BldgNo').val());
    nwParameter_Add("txt_SigBI_BldgName", $('#txt_SigBI_BldgName').val());
    nwParameter_Add("txt_SigBI_House", $('#txt_SigBI_House').val());
    nwParameter_Add("txt_SigBI_StreetName", $('#txt_SigBI_StreetName').val());
    nwParameter_Add("txt_SigBI_Lot", $('#txt_SigBI_Lot').val());
    nwParameter_Add("txt_SigBI_Block", $('#txt_SigBI_Block').val());
    nwParameter_Add("txt_SigBI_Phase", $('#txt_SigBI_Phase').val());
    nwParameter_Add("txt_SigBI_Subdivision", $('#txt_SigBI_Subdivision').val());
    nwParameter_Add("txt_SigBI_Zone", $('#txt_SigBI_Zone').val());
    nwParameter_Add("idvallugSigBIBarangay", $('#idvallugSigBIBarangay').val());
    nwParameter_Add("idvallugSigBIMunicipality", $('#idvallugSigBIMunicipality').val());
    nwParameter_Add("txt_SigBI_Zip", $('#txt_SigBI_Zip').val());

    nwParameter_Add("txt_LI_Remarks", $('#txt_LI_Remarks').val());
    nwParameter_Add("txt_LI_Remarks2", $('#txt_LI_Remarks2').val());
    nwParameter_Add("txt_EI_Remarks", $('#txt_EI_Remarks').val());
    nwParameter_Add("txt_BI_Remarks", $('#txt_BI_Remarks').val());
    nwParameter_Add("txt_SLI_Remarks", $('#txt_SLI_Remarks').val());
    nwParameter_Add("txt_SLI_Remarks2", $('#txt_SLI_Remarks2').val());
    nwParameter_Add("txt_SEI_Remarks", $('#txt_SEI_Remarks').val());
    nwParameter_Add("txt_SBI_Remarks", $('#txt_SBI_Remarks').val());
    nwParameter_Add("txt_CLI_Remarks", $('#txt_CLI_Remarks').val());
    nwParameter_Add("txt_CLI_Remarks2", $('#txt_CLI_Remarks2').val());
    nwParameter_Add("txt_CEI_Remarks", $('#txt_CEI_Remarks').val());
    nwParameter_Add("txt_CBI_Remarks", $('#txt_CBI_Remarks').val());
    nwParameter_Add("txt_SigLI_Remarks", $('#txt_SigLI_Remarks').val());
    nwParameter_Add("txt_SigLI_Remarks2", $('#txt_SigLI_Remarks2').val());
    nwParameter_Add("txt_SigEI_Remarks", $('#txt_SigEI_Remarks').val());
    nwParameter_Add("txt_SigBI_Remarks", $('#txt_SigBI_Remarks').val());

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




    //asterisk();
    nwLoading_Start("xBind", crLoadingHTML);
    func_ActionDriven("actBindCollection", false);
   // DisabledFieldsUponRefresh();
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xBindEmpty", crLoadingHTML);
    nwParameter_Add("TotalRecords", $('div.BN-record span').text());
    DisableFieldsEmpty();
    func_ActionDriven("actBindCollectionEmpty", false);
}


function SourceOfIncomeTagging() {
    if ($('#rdbEmp').is(':checked')) {
        $('.nwReq_EmpInfo').show();
    } else {
        $('.nwReq_EmpInfo').hide();
    }

    if ($('#rdbBuss').is(':checked')) {
        $('.nwreq_buss').show();
    } else {
        $('.nwreq_buss').hide();
    }

    //if ($('#rdbOthers').is(':checked')) {
    //    $('#nwGridOthSrcIncInfo tr th:nth-child(' + (SPR_SrcIncInfo_MonthlyInc + 1) + ')').removeClass('nwFieldreq');
    //} else {
    //    $('#nwGridOthSrcIncInfo tr th:nth-child(' + (SPR_SrcIncInfo_MonthlyInc + 1) + ')').addClass('nwFieldreq');
    //}
}


function SourceOfIncomeTagging_Spouse() {
    if ($('#rdbEmp_Sps').is(':checked')) {
        $('.nwReq_EmpInfo_Sps').show();
    } else {
        $('.nwReq_EmpInfo_Sps').hide();
    }

    if ($('#rdbBuss_Sps').is(':checked')) {
        $('.nwReq_Buss_Sps').show();
    } else {
        $('.nwReq_Bss_Sps').hide();
    }

}


function MarriedTagging() {
    if ($('#chkMarried').is(':checked')) {
        $('label.tabs-lbl[for=nkTabs_b_7]').show();
    } else {
        $('label.tabs-lbl[for=nkTabs_b_7]').hide();
    }
}


function BorrowerTypeTagging() {
    if ($('#rdbBus').is(':checked')) {
        $('label.tabs-lbl[for=nkTabs_b_2]').click();
        $('label.tabs-lbl[for=nkTabs_b_2]').show();

        //disable chk and color, and hide
        //Individual Details
        $('label.tabs-lbl[for=nkTabs_b_1]').hide();

        $('label.tabs-lbl[for=nkTabs_b_6]').hide();

        $('label.tabs-lbl[for=nkTabs_b_7]').hide();

        $('label.tabs-lbl[for=nkTabs_b_9]').show();

        $('label.tabs-lbl[for=nkTabs_b_10]').show();

        $('label.tabs-lbl[for=nkTabs_b_5]').hide();

        $('.accord-trade').enable(true);
        $('.accord-trade .nk-li-content').show();

        $('label.tabs-lbl[for=nkTabs_b_12]').show();

        $('label.tabs-lbl[for=nkTabs_b_8]').hide();

        $('#lugLIHomeOwnrshp').enable(false);
        $('#nwReq_lugLIHomeOwnrshp').hide();

        $('#lugLIHomeOwnrshp2').enable(false);
        $('#nwReq_lugLIHomeOwnrshp2').hide();

        $('#nwGridDependntInfoCon').enable(false);
    } else {
        $('label.tabs-lbl[for=nkTabs_b_1]').click();
        $('label.tabs-lbl[for=nkTabs_b_2]').hide();
        //disable chk and color, and hide
        //Individual Details
        $('label.tabs-lbl[for=nkTabs_b_1]').show();

        //Employment/Business information
        $('label.tabs-lbl[for=nkTabs_b_5]').show();


        $('label.tabs-lbl[for=nkTabs_b_6]').show();

        $('label.tabs-lbl[for=nkTabs_b_7]').hide();


        $('label.tabs-lbl[for=nkTabs_b_9]').hide();

        $('label.tabs-lbl[for=nkTabs_b_10]').hide();

        $('.accord-trade').enable(false);
        $('.accord-trade .nk-li-content').hide();

        $('label.tabs-lbl[for=nkTabs_b_8]').show();

        $('label.tabs-lbl[for=nkTabs_b_12]').hide();

        $('#lugLIHomeOwnrshp').enable(true);
        $('#nwReq_lugLIHomeOwnrshp').show();

        $('#lugLIHomeOwnrshp2').enable(true);
        $('#nwReq_lugLIHomeOwnrshp2').show();

        $('#nwGridDependntInfoCon').enable(true);
    }


}

///////////////////////////////////////
var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    $.mask.definitions['9'] = ''; $.mask.definitions['9'] = '[0-9]';
    if (idName == 'toolboxInquire') {
    }
    if (idName == 'lugBorrowerType') {
        
        var isindiv = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();


        if (isindiv == 1)
        {
            $('#rdbInd').prop('checked', true);
            $('#rdbBus').prop('checked', false);       
        }else {
            $('#rdbInd').prop('checked', false);
            $('#rdbBus').prop('checked', true);
        }

        

        BorrowerTypeTagging();

        EnableFields();

    }

    else if (idName == 'lugCommType') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();//$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text(); //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var tag = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text(); //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();

        var row = nwGridContactInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGridContactInfoCon_Book.ActiveSheet.SetText(SPR_CI_CommCode - 1, row, code);
        nwGridContactInfoCon_Book.ActiveSheet.SetText(SPR_CI_CommType - 1, row, desc);
        nwGridContactInfoCon_Book.ActiveSheet.SetText(SPR_CI_CommTypeTag - 1, row, tag);

        contactInp(row);

    }
    else if (idName == 'lugPrimSrcInc') {
        var isEmployee = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text(); 
        var isBusiness = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();//$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var isOther = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text(); //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();


        $('#rdbEmp').prop('checked', isEmployee == '1');
        $('#rdbBuss').prop('checked', isBusiness == '1');
        $('#rdbOthers').prop('checked', isOther == '1');

        SourceOfIncomeTagging();
    }
    
    else if (idName == 'lugSIPrimSrcInc') {
        var isEmployee = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text(); //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var isBusiness = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text(); //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var isOther = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text(); //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();


        $('#rdbEmp_Sps').prop('checked', isEmployee == '1');
        $('#rdbBuss_Sps').prop('checked', isBusiness == '1');
        $('#rdbOthers_Sps').prop('checked', isOther == '1');

        SourceOfIncomeTagging_Spouse();
    }

    else if (idName == 'lugDealerLoc') {
        //nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        //func_ActionDriven("checkisbranch", true);
    }

    else if (idName == 'lugIndustry') {
        //nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        //func_ActionDriven("checkisbranch", true);
    }

    else if (idName == 'lugIndustryScheme') {
        //nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        //func_ActionDriven("checkisbranch", true);
    }
    else if (idName == 'lugEntityType') {
        //nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        //func_ActionDriven("checkisbranch", true);
    }



    else if (idName == 'lugBank') {

        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text(); //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text(); //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        //var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();

        var row = nwGridBankReferenceCon_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGridBankReferenceCon_Book.ActiveSheet.SetText(SPR_bank - 1, row, code);
        nwGridBankReferenceCon_Book.ActiveSheet.SetText(SPR_bankDesc - 1, row, desc);
    }

    else if (idName == 'lugCashType') {

        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text(); //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text(); //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        //var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();

        var row = nwGridBankReferenceCon_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGridBankReferenceCon_Book.ActiveSheet.SetText(SPR_cashtypecode - 1, row, code);
        nwGridBankReferenceCon_Book.ActiveSheet.SetText(SPR_cashtype - 1, row, desc);
    }

    else if (idName == 'lugSrcIncInfo_SrcIncome') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text(); //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text(); //$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        
        var row = nwGridOthSrcIncInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGridOthSrcIncInfoCon_Book.ActiveSheet.SetText(SPR_SrcIncInfo_SrcIncomeCode - 1, row, code);
        nwGridOthSrcIncInfoCon_Book.ActiveSheet.SetText(SPR_SrcIncInfo_SrcIncomDesc - 1, row, desc);

    }

    else if (idName == 'lugSrcIncInfo_JobTitle') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text(); 
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text(); 

        var row = nwGridOthSrcIncInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGridOthSrcIncInfoCon_Book.ActiveSheet.SetText(SPR_SrcIncInfo_JobTitle - 1, row, code);
        nwGridOthSrcIncInfoCon_Book.ActiveSheet.SetText(SPR_SrcIncInfo_JobTitleDesc - 1, row, desc);
    }

    else if (idName == 'lugBorr_SrcIncome') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridBorrOthSrcIncInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGridBorrOthSrcIncInfoCon_Book.ActiveSheet.SetText(SPR_Borr_SrcIncomeCode - 1, row, code);
        nwGridBorrOthSrcIncInfoCon_Book.ActiveSheet.SetText(SPR_Borr_SrcIncomDesc - 1, row, desc);
        
    }

    else if (idName == 'lugBorr_JobTitle') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridBorrOthSrcIncInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGridBorrOthSrcIncInfoCon_Book.ActiveSheet.SetText(SPR_Borr_JobTitle - 1, row, code);
        nwGridBorrOthSrcIncInfoCon_Book.ActiveSheet.SetText(SPR_Borr_JobTitleDesc - 1, row, desc);
   
    }

    else if (idName == 'lugBR_Nationality') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridBenefOwnCon_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGridBenefOwnCon_Book.ActiveSheet.SetText(SPR_BR_Nationality - 1, row, code);
        nwGridBenefOwnCon_Book.ActiveSheet.SetText(SPR_BR_NationalityDesc - 1, row, desc);
    }

    

    else if (idName == 'lugSCI_CommType') {
        //var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        //crnwTR.find("td:eq(" + SPR_SCI_CommType + ")").text(code);

        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var tag = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();

        var row = nwGridSpouseConInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGridSpouseConInfoCon_Book.ActiveSheet.SetText(SPR_SCI_CommType - 1, row, desc);
        nwGridSpouseConInfoCon_Book.ActiveSheet.SetText(SPR_SCI_CommCode - 1, row, code);
        nwGridSpouseConInfoCon_Book.ActiveSheet.SetText(SPR_SCI_CommTypeTag - 1, row, tag);

        contactInp2(row);
        //func_ActionDriven("actChkPhoneMobEmail2", false);
    }

    else if (idName == 'lugCCI_CommType') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var tag = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();

        var row = nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetText(SPR_CCI_CommType - 1, row, desc);
        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetText(SPR_CCI_CommCode - 1, row, code);
        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetText(SPR_CCI_CommTypeTag - 1, row, tag);

        contactInp3(row);
        //func_ActionDriven("actChkPhoneMobEmail3", false);
    }

    else if (idName == 'lugSigCI_CommType') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var tag = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();

        var row = nwGridSigntryContactDtlsCon_Book.ActiveSheet.GetSelectedIndexes().row;

        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetText(SPR_SigCI_CommType - 1, row, desc);
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetText(SPR_SigCI_CommCode - 1, row, code);
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetText(SPR_SigCI_CommTypeTag - 1, row, tag);

        contactInp4(row);

        //func_ActionDriven("actChkPhoneMobEmail4", false);
    }


    else if (idName == 'lugDepnfo_Relation') {
        var rel = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridDependntInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridDependntInfoCon_Book.ActiveSheet.SetText(SPR_Depnfo_Relation - 1, row, rel);
        nwGridDependntInfoCon_Book.ActiveSheet.SetText(SPR_Depnfo_RelationDesc - 1, row, desc);

        countDep();
    }

    else if (idName == 'lugPD_Currency') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();

        var row = nwGridPaymentDtlsCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridPaymentDtlsCon_Book.ActiveSheet.SetText(SPR_currency - 1, row, code);
        nwGridPaymentDtlsCon_Book.ActiveSheet.SetText(SPR_currencydesc - 1, row, desc);

    }

    else if (idName == 'lugPD_EffectiveFor') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();

        var row = nwGridPaymentDtlsCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridPaymentDtlsCon_Book.ActiveSheet.SetText(SPR_effectiveFor - 1, row, code);
        nwGridPaymentDtlsCon_Book.ActiveSheet.SetText(SPR_effectiveFordesc - 1, row, desc);

    }
    else if (idName == 'lugPD_Direction') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();

        var row = nwGridPaymentDtlsCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridPaymentDtlsCon_Book.ActiveSheet.SetText(SPR_direction - 1, row, code);
        nwGridPaymentDtlsCon_Book.ActiveSheet.SetText(SPR_directiondesc - 1, row, desc);

    }
    else if (idName == 'lugPD_Method') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();

        var row = nwGridPaymentDtlsCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridPaymentDtlsCon_Book.ActiveSheet.SetText(SPR_method - 1, row, code);
        nwGridPaymentDtlsCon_Book.ActiveSheet.SetText(SPR_methoddesc - 1, row, desc);

    }
    else if (idName == 'lugPD_InitialMethod') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();

        var row = nwGridPaymentDtlsCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridPaymentDtlsCon_Book.ActiveSheet.SetText(SPR_initialMethod - 1, row, code);
        nwGridPaymentDtlsCon_Book.ActiveSheet.SetText(SPR_initialMethoddesc - 1, row, desc);

    }

    else if (idName == 'lugMaritalStatus') {
        var Code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var Desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var isMarried = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();

        $('#chkMarried').prop('checked', isMarried == '1');


        if (isMarried == '1') {
            $('#idvallugSIMaritalStatus').val(Code);
            $('#descvallugSIMaritalStatus').val(Desc);
        }

        MarriedTagging();
    }



    //Hre
    else if (idName == 'lugLIBarangay') {

        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text(); 
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc= $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugLIBarangay").val(brgyCode);
        $("#descvallugLIBarangay").val(brgyDesc);
        $("#txt_LI_Zip").val(zipCode);
        $("#idvallugLIMunicipality").val(muniCode);
        $("#descvallugLIMunicipality").val(muniDesc);
        $("#idvallugLIProvince").val(provCode)
        $("#descvallugLIProvince").val(provDesc);
        $("#idvallugLIRegion").val(regCode);
        $("#descvallugLIRegion").val(regDesc);
        $("#idvallugLICountry").val(cntryCode);
        $("#descvallugLICountry").val(cntryDesc); 
        fulladdressLocInfo();
    }

    else if (idName == 'lugLIBarangay2') {

        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugLIBarangay2").val(brgyCode);
        $("#descvallugLIBarangay2").val(brgyDesc);
        $("#txt_LI_Zip2").val(zipCode);
        $("#idvallugLIMunicipality2").val(muniCode);
        $("#descvallugLIMunicipality2").val(muniDesc);
        $("#idvallugLIProvince2").val(provCode)
        $("#descvallugLIProvince2").val(provDesc);
        $("#idvallugLIRegion2").val(regCode);
        $("#descvallugLIRegion2").val(regDesc);
        $("#idvallugLICountry2").val(cntryCode);
        $("#descvallugLICountry2").val(cntryDesc);
        fulladdressLocInfo2();
    }
    

    else if (idName == 'lugLIMunicipality') {

        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        $("#idvallugLIMunicipality").val(muniCode);
        $("#descvallugLIMunicipality").val(muniDesc);
        $("#idvallugLIProvince").val(provCode)
        $("#descvallugLIProvince").val(provDesc);
        $("#idvallugLIRegion").val(regCode);
        $("#descvallugLIRegion").val(regDesc);
        $("#idvallugLICountry").val(cntryCode);
        $("#descvallugLICountry").val(cntryDesc);
        $("#txt_LI_Zip").val(zipCode);
        //fulladdressLocInfo();
    }

    else if (idName == 'lugLIMunicipality2') {

        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        $("#idvallugLIMunicipality2").val(muniCode);
        $("#descvallugLIMunicipality2").val(muniDesc);
        $("#idvallugLIProvince2").val(provCode)
        $("#descvallugLIProvince2").val(provDesc);
        $("#idvallugLIRegion2").val(regCode);
        $("#descvallugLIRegion2").val(regDesc);
        $("#idvallugLICountry2").val(cntryCode);
        $("#descvallugLICountry2").val(cntryDesc);
        $("#txt_LI_Zip2").val(zipCode);
        //fulladdressLocInfo();
    }



    else if (idName == 'lugEIBarangay') {

        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugEIBarangay").val(brgyCode);
        $("#descvallugEIBarangay").val(brgyDesc);
        $("#txt_EI_Zip").val(zipCode);
        $("#idvallugEIMunicipality").val(muniCode);
        $("#descvallugEIMunicipality").val(muniDesc);
        $("#idvallugEIProvince").val(provCode)
        $("#descvallugEIProvince").val(provDesc);
        $("#idvallugEIRegion").val(regCode);
        $("#descvallugEIRegion").val(regDesc);
        $("#idvallugEICountry").val(cntryCode);
        $("#descvallugEICountry").val(cntryDesc);

        //$("#idvallugEIBarangay").val(brgyCode);
        //$("#descvallugEIBarangay").val(brgyDesc);
        //$("#txt_EI_Zip").val(zipCode);
        ////$("#idvallugEIMunicipality").val(muniCode);
        //$("#idvallugEIProvince").val(provCode);
        //$("#idvallugEIRegion").val(regCode);
        //$("#idvallugEICountry").val(cntryCode);
        employmentAddressEmpInfo();
    }

    else if (idName == 'lugEIMunicipality') {

        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        
        $("#idvallugEIMunicipality").val(muniCode);
        $("#descvallugEIMunicipality").val(muniDesc);
        $("#idvallugEIProvince").val(provCode)
        $("#descvallugEIProvince").val(provDesc);
        $("#idvallugEIRegion").val(regCode);
        $("#descvallugEIRegion").val(regDesc);
        $("#idvallugEICountry").val(cntryCode);
        $("#descvallugEICountry").val(cntryDesc);
        $("#txt_EI_Zip").val(zipCode);
        employmentAddressEmpInfo();
    }


    else if (idName == 'lugBIBarangay') {

        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugBIBarangay").val(brgyCode);
        $("#descvallugBIBarangay").val(brgyDesc);
        $("#txt_BI_Zip").val(zipCode);
        $("#idvallugBIMunicipality").val(muniCode);
        $("#descvallugBIMunicipality").val(muniDesc);
        $("#idvallugBIProvince").val(provCode)
        $("#descvallugBIProvince").val(provDesc);
        $("#idvallugBIRegion").val(regCode);
        $("#descvallugBIRegion").val(regDesc);
        $("#idvallugBICountry").val(cntryCode);
        $("#descvallugBICountry").val(cntryDesc);

        businessAddressEmpInfo();
    }

    else if (idName == 'lugBIMunicipality') {

        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        $("#idvallugBIMunicipality").val(muniCode);
        $("#descvallugBIMunicipality").val(muniDesc);
        $("#idvallugBIProvince").val(provCode)
        $("#descvallugBIProvince").val(provDesc);
        $("#idvallugBIRegion").val(regCode);
        $("#descvallugBIRegion").val(regDesc);
        $("#idvallugBICountry").val(cntryCode);
        $("#descvallugBICountry").val(cntryDesc);
        $("#txt_BI_Zip").val(zipCode);
        //businessAddressEmpInfo();
    }



    else if (idName == 'lugSEIMunicipality') {
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        $("#idvallugSEIMunicipality").val(muniCode);
        $("#descvallugSEIMunicipality").val(muniDesc);
        $("#idvallugSEIProvince").val(provCode)
        $("#descvallugSEIProvince").val(provDesc);
        $("#idvallugSEIRegion").val(regCode);
        $("#descvallugSEIRegion").val(regDesc);
        $("#idvallugSEICountry").val(cntryCode);
        $("#descvallugSEICountry").val(cntryDesc);
        $("#txt_SEI_Zip").val(zipCode);

        //employmentAddressSpoInfo();

    }


    else if (idName == 'lugSEIBarangay') {
        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugSEIBarangay").val(brgyCode);
        $("#descvallugSEIBarangay").val(brgyDesc);
        $("#txt_SEI_Zip").val(zipCode);
        $("#idvallugSEIMunicipality").val(muniCode);
        $("#descvallugSEIMunicipality").val(muniDesc);
        $("#idvallugSEIProvince").val(provCode)
        $("#descvallugSEIProvince").val(provDesc);
        $("#idvallugSEIRegion").val(regCode);
        $("#descvallugSEIRegion").val(regDesc);
        $("#idvallugSEICountry").val(cntryCode);
        $("#descvallugSEICountry").val(cntryDesc);
        employmentAddressSpoInfo();
    }



    else if (idName == 'lugSLIBarangay') {

        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugSLIBarangay").val(brgyCode);
        $("#descvallugSLIBarangay").val(brgyDesc);
        $("#txt_SLI_Zip").val(zipCode);
        $("#idvallugSLIMunicipality").val(muniCode);
        $("#descvallugSLIMunicipality").val(muniDesc);
        $("#idvallugSLIProvince").val(provCode)
        $("#descvallugSLIProvince").val(provDesc);
        $("#idvallugSLIRegion").val(regCode);
        $("#descvallugSLIRegion").val(regDesc);
        $("#idvallugSLICountry").val(cntryCode);
        $("#descvallugSLICountry").val(cntryDesc);
        fulladdressSpouseLocInfo();
    }

    else if (idName == 'lugSLIMunicipality') {

        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        $("#idvallugSLIMunicipality").val(muniCode);
        $("#descvallugSLIMunicipality").val(muniDesc);
        $("#idvallugSLIProvince").val(provCode)
        $("#descvallugSLIProvince").val(provDesc);
        $("#idvallugSLIRegion").val(regCode);
        $("#descvallugSLIRegion").val(regDesc);
        $("#idvallugSLICountry").val(cntryCode);
        $("#descvallugSLICountry").val(cntryDesc);
        $("#txt_SLI_Zip").val(zipCode);

    }



    else if (idName == 'lugSLIBarangay2') {
        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugSLIBarangay2").val(brgyCode);
        $("#descvallugSLIBarangay2").val(brgyDesc);
        $("#txt_SLI_Zip2").val(zipCode);
        $("#idvallugSLIMunicipality2").val(muniCode);
        $("#descvallugSLIMunicipality2").val(muniDesc);
        $("#idvallugSLIProvince2").val(provCode)
        $("#descvallugSLIProvince2").val(provDesc);
        $("#idvallugSLIRegion2").val(regCode);
        $("#descvallugSLIRegion2").val(regDesc);
        $("#idvallugSLICountry2").val(cntryCode);
        $("#descvallugSLICountry2").val(cntryDesc);
        fulladdressSpouseLocInfo2();
    }

    else if (idName == 'lugSLIMunicipality2') {
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        $("#idvallugSLIMunicipality2").val(muniCode);
        $("#descvallugSLIMunicipality2").val(muniDesc);
        $("#idvallugSLIProvince2").val(provCode)
        $("#descvallugSLIProvince2").val(provDesc);
        $("#idvallugSLIRegion2").val(regCode);
        $("#descvallugSLIRegion2").val(regDesc);
        $("#idvallugSLICountry2").val(cntryCode);
        $("#descvallugSLICountry2").val(cntryDesc);
        $("#txt_SLI_Zip2").val(zipCode);
    }

    else if (idName == 'lugSBIBarangay') {

        //var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        //var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();     
        //var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        //var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        //var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        //var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        //var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        //var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        //var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        //var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        //var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugSBIBarangay").val(brgyCode);
        $("#descvallugSBIBarangay").val(brgyDesc);
        $("#txt_SBI_Zip").val(zipCode);
        $("#idvallugSBIMunicipality").val(muniCode);
        $("#descvallugSBIMunicipality").val(muniDesc);
        $("#idvallugSBIProvince").val(provCode)
        $("#descvallugSBIProvince").val(provDesc);
        $("#idvallugSBIRegion").val(regCode);
        $("#descvallugSBIRegion").val(regDesc);
        $("#idvallugSBICountry").val(cntryCode);
        $("#descvallugSBICountry").val(cntryDesc);

        spouseAddressBorrInfo();
    }

    else if (idName == 'lugSBIMunicipality') {
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        //$("#idvallugSBIBarangay").val(brgyCode);
        //$("#descvallugSBIBarangay").val(brgyDesc);
        $("#txt_SBI_Zip").val(zipCode);
        $("#idvallugSBIMunicipality").val(muniCode);
        $("#descvallugSBIMunicipality").val(muniDesc);
        $("#idvallugSBIProvince").val(provCode)
        $("#descvallugSBIProvince").val(provDesc);
        $("#idvallugSBIRegion").val(regCode);
        $("#descvallugSBIRegion").val(regDesc);
        $("#idvallugSBICountry").val(cntryCode);
        $("#descvallugSBICountry").val(cntryDesc);

        spouseAddressBorrInfo();
    }

    else if (idName == 'lugCLIBarangay') {
        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugCLIBarangay").val(brgyCode);
        $("#descvallugCLIBarangay").val(brgyDesc);
        $("#txt_CLI_Zip").val(zipCode);
        $("#idvallugCLIMunicipality").val(muniCode);
        $("#descvallugCLIMunicipality").val(muniDesc);
        $("#idvallugCLIProvince").val(provCode)
        $("#descvallugCLIProvince").val(provDesc);
        $("#idvallugCLIRegion").val(regCode);
        $("#descvallugCLIRegion").val(regDesc);
        $("#idvallugCLICountry").val(cntryCode);
        $("#descvallugCLICountry").val(cntryDesc);

        fulladdressBorrLocInfo();
    }

    else if (idName == 'lugCLIMunicipality') {

        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        $("#idvallugCLIMunicipality").val(muniCode);
        $("#descvallugCLIMunicipality").val(muniDesc);
        $("#idvallugCLIProvince").val(provCode)
        $("#descvallugCLIProvince").val(provDesc);
        $("#idvallugCLIRegion").val(regCode);
        $("#descvallugCLIRegion").val(regDesc);
        $("#idvallugCLICountry").val(cntryCode);
        $("#descvallugCLICountry").val(cntryDesc);
        $("#txt_CLI_Zip").val(zipCode);


        fulladdressBorrLocInfo();
    }



    else if (idName == 'lugCLIBarangay2') {
        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugCLIBarangay2").val(brgyCode);
        $("#descvallugCLIBarangay2").val(brgyDesc);
        $("#txt_CLI_Zip2").val(zipCode);
        $("#idvallugCLIMunicipality2").val(muniCode);
        $("#descvallugCLIMunicipality2").val(muniDesc);
        $("#idvallugCLIProvince2").val(provCode)
        $("#descvallugCLIProvince2").val(provDesc);
        $("#idvallugCLIRegion2").val(regCode);
        $("#descvallugCLIRegion2").val(regDesc);
        $("#idvallugCLICountry2").val(cntryCode);
        $("#descvallugCLICountry2").val(cntryDesc);

        fulladdressBorrLocInfo2();

    }

    else if (idName == 'lugCLIMunicipality2') {
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        $("#idvallugCLIMunicipality2").val(muniCode);
        $("#descvallugCLIMunicipality2").val(muniDesc);
        $("#idvallugCLIProvince2").val(provCode)
        $("#descvallugCLIProvince2").val(provDesc);
        $("#idvallugCLIRegion2").val(regCode);
        $("#descvallugCLIRegion2").val(regDesc);
        $("#idvallugCLICountry2").val(cntryCode);
        $("#descvallugCLICountry2").val(cntryDesc);
        $("#txt_CLI_Zip2").val(zipCode);
        fulladdressBorrLocInfo2();

    }



    else if (idName == 'lugCEIMunicipality') {

        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        $("#idvallugCEIMunicipality").val(muniCode);
        $("#descvallugCEIMunicipality").val(muniDesc);
        $("#idvallugCEIProvince").val(provCode)
        $("#descvallugCEIProvince").val(provDesc);
        $("#idvallugCEIRegion").val(regCode);
        $("#descvallugCEIRegion").val(regDesc);
        $("#idvallugCEICountry").val(cntryCode);
        $("#descvallugCEICountry").val(cntryDesc);
        $("#txt_CEI_Zip").val(zipCode);

    }


    else if (idName == 'lugCEIBarangay') {



        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugCEIBarangay").val(brgyCode);
        $("#descvallugCEIBarangay").val(brgyDesc);
        $("#txt_CEI_Zip").val(zipCode);
        $("#idvallugCEIMunicipality").val(muniCode);
        $("#descvallugCEIMunicipality").val(muniDesc);
        $("#idvallugCEIProvince").val(provCode)
        $("#descvallugCEIProvince").val(provDesc);
        $("#idvallugCEIRegion").val(regCode);
        $("#descvallugCEIRegion").val(regDesc);
        $("#idvallugCEICountry").val(cntryCode);
        $("#descvallugCEICountry").val(cntryDesc);


        employmentAddressBorrInfo();

    }



    else if (idName == 'lugCBIBarangay') {
        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugCBIBarangay").val(brgyCode);
        $("#descvallugCBIBarangay").val(brgyDesc);
        $("#txt_CBI_Zip").val(zipCode);
        $("#idvallugCBIMunicipality").val(muniCode);
        $("#descvallugCBIMunicipality").val(muniDesc);
        $("#idvallugCBIProvince").val(provCode)
        $("#descvallugCBIProvince").val(provDesc);
        $("#idvallugCBIRegion").val(regCode);
        $("#descvallugCBIRegion").val(regDesc);
        $("#idvallugCBICountry").val(cntryCode);
        $("#descvallugCBICountry").val(cntryDesc);


        businessAddressBorrInfo();
    }

    else if (idName == 'lugCBIMunicipality') {
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        $("#idvallugCBIMunicipality").val(muniCode);
        $("#descvallugCBIMunicipality").val(muniDesc);
        $("#idvallugCBIProvince").val(provCode)
        $("#descvallugCBIProvince").val(provDesc);
        $("#idvallugCBIRegion").val(regCode);
        $("#descvallugCBIRegion").val(regDesc);
        $("#idvallugCBICountry").val(cntryCode);
        $("#descvallugCBICountry").val(cntryDesc);
        $("#txt_CBI_Zip").val(zipCode);


        businessAddressBorrInfo();
    }


    else if (idName == 'lugSigLIBarangay') {

        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugSigLIBarangay").val(brgyCode);
        $("#descvallugSigLIBarangay").val(brgyDesc);
        $("#txt_SigLI_Zip").val(zipCode);
        $("#idvallugSigLIMunicipality").val(muniCode);
        $("#descvallugSigLIMunicipality").val(muniDesc);
        $("#idvallugSigLIProvince").val(provCode)
        $("#descvallugSigLIProvince").val(provDesc);
        $("#idvallugSigLIRegion").val(regCode);
        $("#descvallugSigLIRegion").val(regDesc);
        $("#idvallugSigLICountry").val(cntryCode);
        $("#descvallugSigLICountry").val(cntryDesc);


        fulladdressSignaLocInfo();
    }

    else if (idName == 'lugSigLIMunicipality') {
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        $("#idvallugSigLIMunicipality").val(muniCode);
        $("#descvallugSigLIMunicipality").val(muniDesc);
        $("#idvallugSigLIProvince").val(provCode)
        $("#descvallugSigLIProvince").val(provDesc);
        $("#idvallugSigLIRegion").val(regCode);
        $("#descvallugSigLIRegion").val(regDesc);
        $("#idvallugSigLICountry").val(cntryCode);
        $("#descvallugSigLICountry").val(cntryDesc);
        $("#txt_SigLI_Zip").val(zipCode);
    }



    else if (idName == 'lugSigLIBarangay2') {
        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugSigLIBarangay2").val(brgyCode);
        $("#descvallugSigLIBarangay2").val(brgyDesc);
        $("#txt_SigLI_Zip2").val(zipCode);
        $("#idvallugSigLIMunicipality2").val(muniCode);
        $("#descvallugSigLIMunicipality2").val(muniDesc);
        $("#idvallugSigLIProvince2").val(provCode)
        $("#descvallugSigLIProvince2").val(provDesc);
        $("#idvallugSigLIRegion2").val(regCode);
        $("#descvallugSigLIRegion2").val(regDesc);
        $("#idvallugSigLICountry2").val(cntryCode);
        $("#descvallugSigLICountry2").val(cntryDesc);


        fulladdressSignaLocInfo2();
    }

    else if (idName == 'lugSigLIMunicipality2') {
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        $("#idvallugSigLIMunicipality2").val(muniCode);
        $("#descvallugSigLIMunicipality2").val(muniDesc);
        $("#idvallugSigLIProvince2").val(provCode)
        $("#descvallugSigLIProvince2").val(provDesc);
        $("#idvallugSigLIRegion2").val(regCode);
        $("#descvallugSigLIRegion2").val(regDesc);
        $("#idvallugSigLICountry2").val(cntryCode);
        $("#descvallugSigLICountry2").val(cntryDesc);
        $("#txt_SigLI_Zip2").val(zipCode);
    }

    //Borrower Info
    else if (idName == 'lugBInfo_RelationShip') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridBorrowerInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_RelationShip - 1, row, code);
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_RelationShipDesc - 1, row, desc);

        hideAst(code);
        //$('#nwGridBorrowerInfoCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_BInfo_LINEID + ')').text(getLineID()); //Pop
        //PropnwGridCon();
        
    }
    else if (idName == 'lugSgInfo_RelationShip') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();

        var row = nwGridSigntrsInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_Relationship - 1, row, code);
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_RelationshipDesc - 1, row, desc);

        //$('#nwGridBorrowerInfoCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_BInfo_LINEID + ')').text(getLineID()); //Pop
        //PropnwGridCon();

    }
    else if (idName == 'lugBInfo_Salutation') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridBorrowerInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_Salutation - 1, row, code);
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_SalutationDesc - 1, row, desc);
        hideAst(code);
        //$('#nwGridBorrowerInfoCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_BInfo_LINEID + ')').text(getLineID());
    }
    
    else if (idName == 'lugBInfo_namesuffix') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridBorrowerInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_namesuffix - 1, row, code);
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_namesuffixDesc - 1, row, desc);
        hideAst(code);
    }

    else if (idName == 'lugBInfo_Gender') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridBorrowerInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_Gender - 1, row, code);
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_GenderDesc - 1, row, desc);
        hideAst(code);
    }
    else if (idName == 'lugMaritalStatus') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        if (desc.toLowerCase().indexOf("married") == -1) {
            document.getElementById("lblSpsSalut").innerHTML = "Salutation<span class='nwOptionalField'>*</span>"
            document.getElementById("lblLstName").innerHTML = "Last Name<span class='nwOptionalField'>*</span>"
            document.getElementById("lblFrstName").innerHTML = "First Name<span class='nwOptionalField'>*</span>"
            document.getElementById("lblDOB").innerHTML = "Date of Birth<span class='nwOptionalField'>*</span>"
            document.getElementById("lblGender").innerHTML = "Gender<span class='nwOptionalField'>*</span>"
            document.getElementById("lblMarStats").innerHTML = "Marital Status<span class='nwOptionalField'>*</span>"
            document.getElementById("lblNationality").innerHTML = "Nationality<span class='nwOptionalField'>*</span>"
            document.getElementById("lblPSI").innerHTML = "Primary Source of Income<span class='nwOptionalField'>*</span>"
        }
        else {
            document.getElementById("lblSpsSalut").innerHTML = "Salutation<span class='nwRequiredField'>*</span>"
            document.getElementById("lblLstName").innerHTML = "Last Name<span class='nwRequiredField'>*</span>"
            document.getElementById("lblFrstName").innerHTML = "First Name<span class='nwRequiredField'>*</span>"
            document.getElementById("lblDOB").innerHTML = "Date of Birth<span class='nwRequiredField'>*</span>"
            document.getElementById("lblGender").innerHTML = "Gender<span class='nwRequiredField'>*</span>"
            document.getElementById("lblMarStats").innerHTML = "Marital Status<span class='nwRequiredField'>*</span>"
            document.getElementById("lblNationality").innerHTML = "Nationality<span class='nwRequiredField'>*</span>"
            document.getElementById("lblPSI").innerHTML = "Primary Source of Income<span class='nwRequiredField'>*</span>"
        }
        
    }

    else if (idName == 'lugBInfo_maritalstatus') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridBorrowerInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_maritalstatus - 1, row, code);
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_maritalstatusDesc - 1, row, desc);

        hideAst(code);
        
        
    }
 
    else if (idName == 'lugBInfo_Nationality') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();


        var row = nwGridBorrowerInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_Nationality - 1, row, code);
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_NationalityDesc - 1, row, desc);
        hideAst(code);
    }


    else if (idName == 'lugBInfo_Politicposition') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridBorrowerInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_Politicposition - 1, row, code);
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_PoliticpositionDesc - 1, row, desc);
        hideAst(code);
    }
   

    else if (idName == 'lugBInfo_Employmentsource') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var isEmp = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var isBus = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var isOth = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();

        var row = nwGridBorrowerInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_Employmentsource - 1, row, code);
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetText(SPR_BInfo_EmploymentsourceDesc - 1, row, desc);
        hideAst(code);
        

        //if (code.toLowerCase().indexOf("employment") >= 1) {
        //    document.body.innerHTML = '<div title="Employment Details">Employment Details<span class="nwRequiredField">*</span></div>';
        //}
    }




    //Signatories Info
    else if (idName == 'lugSgInfo_salutation') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridSigntrsInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_Salutation - 1, row, code);
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_SalutationDesc - 1, row, desc);


        //$('#nwGridSigntrsInfoCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SgInfo_LINEID + ')').text(getLineIDSig()); //Pop
        //PropnwGridCon2();
    }

    else if (idName == 'lugSgInfo_namesuffix') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridSigntrsInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_namesuffix - 1, row, code);
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_namesuffixDesc - 1, row, desc);
    }

    else if (idName == 'lugSgInfo_Gender') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridSigntrsInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_Gender - 1, row, code);
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_GenderDesc - 1, row, desc);
    }

    else if (idName == 'lugSgInfo_maritalstatus') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridSigntrsInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_maritalstatus - 1, row, code);
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_maritalstatusDesc - 1, row, desc);
    }

    else if (idName == 'lugSgInfo_Nationality') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridSigntrsInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_Nationality - 1, row, code);
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_NationalityDesc - 1, row, desc);
    }


    else if (idName == 'lugSgInfo_Politicposition') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();

        var row = nwGridSigntrsInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_Politicposition - 1, row, code);
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_PoliticpositionDesc - 1, row, desc);
    }

    else if (idName == 'lugSgInfo_Employmentsource') {
        var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var row = nwGridSigntrsInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_Employmentsource - 1, row, code);
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetText(SPR_SgInfo_EmploymentsourceDesc - 1, row, desc);
    }


    //New

    else if (idName == 'lugsupplier') {
        nwParameter_Add("suppliercode", $('#idvallugsupplier').val());
        func_ActionDriven("checkisbranch", true);
    }

    else if (idName == 'lugStdBarangay') {
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

        var muniCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var rgnCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var rgnDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();
        //var isgCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 11 + ") span").text();
        //var isgDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 12 + ") span").text();
        //var igCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 13 + ") span").text();
        //var igDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 14 + ") span").text();
        var zipCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        //var zipCodeCnt =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 15 + ") span").text();

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

        //$fn().xOnKeyUpEvents.xFullAddressValue();

        if (stdBrgy == "") {
            if (parseInt(zipCodeCnt) == 1)
                $("#txtZip").enable(false);
            else if (parseInt(zipCodeCnt) > 1) {
                $("#txtZip").val("");
                $("#txtZip").enable(true);
            }
        }
    }

    else if (idName == 'lugMunicipality') {

        var provCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var rgnCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var rgnDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var isgCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var isgDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var igCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();
        var igDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 11 + ") span").text();
        var zipCodeCnt =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 12 + ") span").text();

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

        if ($("#idvallugStdBarangay").val() == "") {
            if (parseInt(zipCodeCnt) == 1)
                $("#txtZip").enable(false);
            else if (parseInt(zipCodeCnt) > 1) {
                $("#txtZip").val("");
                $("#txtZip").enable(true);
            }
        }
    }


    //PERMANENT
    else if (idName == 'lugStdBarangay2') {
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

        var muniCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var rgnCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var rgnDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();
        //var isgCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 11 + ") span").text();
        //var isgDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 12 + ") span").text();
        //var igCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 13 + ") span").text();
        //var igDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 14 + ") span").text();
        var zipCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        //var zipCodeCnt =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 15 + ") span").text();

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

        //$fn().xOnKeyUpEvents.xFullAddressValue2();

        if (stdBrgy == "") {
            if (parseInt(zipCodeCnt) == 1)
                $("#txtZip2").enable(false);
            else if (parseInt(zipCodeCnt) > 1) {
                $("#txtZip2").val("");
                $("#txtZip2").enable(true);
            }
        }
    }

    else if (idName == 'lugMunicipality2') {

        var provCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var rgnCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var rgnDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var isgCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var isgDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var igCode =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();
        var igDesc =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 11 + ") span").text();
        var zipCodeCnt =  $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 12 + ") span").text();

        //$('#idvallugStdBarangay').val('');
        //$('#descvallugStdBarangay').val('');

        $("#idvallugProvince2").val(provCode);
        $("#descvallugProvince2").val(provDesc);
        $("#idvallugRegion2").val(rgnCode);
        $("#descvallugRegion2").val(rgnDesc);
        $("#idvallugCountry2").val(cntCode);
        $("#descvallugCountry2").val(cntDesc);
        //$("#idvallugInternationalSubGroup").val(isgCode);
        //$("#descvallugInternationalSubGroup").val(isgDesc);
        //$("#idvallugInternationalGroup").val(igCode);
        //$("#descvallugInternationalGroup").val(igDesc);

        if ($("#idvallugStdBarangay2").val() == "") {
            if (parseInt(zipCodeCnt) == 1)
                $("#txtZip2").enable(false);
            else if (parseInt(zipCodeCnt) > 1) {
                $("#txtZip2").val("");
                $("#txtZip2").enable(true);
            }
        }
    }


    else if (idName == 'lugSigEIMunicipality') {

        //var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        //var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        //var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        //var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        //var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();

        //$("#idvallugBIBarangay").val(brgyCode);
        //$("#descvallugBIBarangay").val(brgyDesc);
        //$("#txt_SEI_Zip").val(zipCode);
        $("#idvallugSigEIMunicipality").val(muniCode);
        $("#descvallugSigEIMunicipality").val(muniDesc);
        //$("#idvallugSigEIRegion").val(regCode);
        //$("#idvallugSigEICountry").val(cntryCode);
    }


    else if (idName == 'lugSigEIBarangay') {
        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();

        $("#idvallugSigEIBarangay").val(brgyCode);
        $("#descvallugSigEIBarangay").val(brgyDesc);
        $("#txt_SigEI_Zip").val(zipCode);
        $("#idvallugSigEIMunicipality").val(muniCode);
        $("#descvallugSigEIMunicipality").val(muniDesc);
        $("#idvallugSigEIProvince").val(provCode)
        $("#descvallugSigEIProvince").val(provDesc);
        $("#idvallugSigEIRegion").val(regCode);
        $("#descvallugSigEIRegion").val(regDesc);
        $("#idvallugSigEICountry").val(cntryCode);
        $("#descvallugSigEICountry").val(cntryDesc);;

        employmentAddressSigInfo();
    }
    else if (idName == 'lugSigEIMunicipality') {

        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        $("#idvallugSigEIMunicipality").val(muniCode);
        $("#descvallugSigEIMunicipality").val(muniDesc);
        $("#idvallugSigEIProvince").val(provCode)
        $("#descvallugSigEIProvince").val(provDesc);
        $("#idvallugSigEIRegion").val(regCode);
        $("#descvallugSigEIRegion").val(regDesc);
        $("#idvallugSigEICountry").val(cntryCode);
        $("#descvallugSigEICountry").val(cntryDesc);
        $("#txt_SigEI_Zip").val(zipCode);


        employmentAddressSigInfo();
    }

    else if (idName == 'lugSigBIBarangay') {

        var brgyCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var brgyDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 9 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 10 + ") span").text();


        $("#idvallugSigBIBarangay").val(brgyCode);
        $("#descvallugSigBIBarangay").val(brgyDesc);
        $("#txt_SigBI_Zip").val(zipCode);
        $("#idvallugSigBIMunicipality").val(muniCode);
        $("#descvallugSigBIMunicipality").val(muniDesc);
        $("#idvallugSigBIProvince").val(provCode)
        $("#descvallugSigBIProvince").val(provDesc);
        $("#idvallugSigBIRegion").val(regCode);
        $("#descvallugSigBIRegion").val(regDesc);
        $("#idvallugSigBICountry").val(cntryCode);
        $("#descvallugSigBICountry").val(cntryDesc);
        signaAddressBussInfo();
    }

    else if (idName == 'lugSigBIMunicipality') {

        var muniCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
        var muniDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
        var provCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text();
        var provDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text();
        var regCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text();
        var regDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text();
        var cntryCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text();
        var cntryDesc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text();
        var zipCode = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 8 + ") span").text();

        $("#idvallugSigBIMunicipality").val(muniCode);
        $("#descvallugSigBIMunicipality").val(muniDesc);
        $("#idvallugSigBIProvince").val(provCode)
        $("#descvallugSigBIProvince").val(provDesc);
        $("#idvallugSigBIRegion").val(regCode);
        $("#descvallugSigBIRegion").val(regDesc);
        $("#idvallugSigBICountry").val(cntryCode);
        $("#descvallugSigBICountry").val(cntryDesc);
        $("#txt_SigBI_Zip").val(zipCode);
        //$("#idvallugSigBIRegion").val(regCode);
        //$("#idvallugSigBICountry").val(cntryCode);

        signaAddressBussInfo();
    }


}


function EnableFields() {
    //$('#noah-webui-default-New').enable(false);
    $('#noah-webui-default-Save').enable(true);
    $('#noah-webui-default-Delete').enable(false);
    $('#noah-webui-default-Delete').visible(false);
    $('#noah-webui-default-Refresh').enable(true);
    $('#noah-webui-default-Inquire').enable(true);
    $('#noah-webui-default-Process').enable(false);
    $('#noah-webui-default-Export').enable(false);

    /*Main*/
    $("#lugBorrowerType").enable(true);
    $("#lugPartyType").enable(true);
    $("#txtCrossCode").enable(true);

    if ($('#idvallugBorrowerType').val() == '')
        return false;


    $('#nwGridContactInfoCon').enable(true);
    $('#nwGridDependntInfoCon').enable(true);
    $('#nwGridBorrowerInfoCon').enable(true);
    $('#nwGridSigntrsInfoCon').enable(true);
    $('#nwGridTradeReferenceCon').enable(true);
    $('#nwGridBankReferenceCon').enable(true);
    $('#nwGridCreditLineCon').enable(true);
    $('#nwGridPaymentDtlsCon').enable(true);
    $('#nwGridCoBorrowerContactInfoCon').enable(true);
    $('#nwGridSigntryContactDtlsCon').enable(true);


    $('#cbIndvPolExpPer').prop('disabled', false);
    $('#cbOpsaDilcoCorp').prop('disabled', false);
    $('#cbOpsaDilcoCorp').prop('disabled', false);
    $('#cbSLIPresentAdd').prop('disabled', false);
    $('#cbCLIPresentAdd').prop('disabled', false);
    $('#cbPresentAdd').prop('disabled', false);

    //$("#btnPaymentDetails").removeClass("btn-default-gray");
    //$("#btnPaymentDetails").addClass("btn-default-orange");

    
    $('#btnPaymentDetails').enable(false);

    $("txt_SEI_StreetName").enable(true);
    //Checkbox
    $('#cbOpsaDilcoIndv').prop('disabled', false);
    $('#cbOpsaDilcoCorp').prop('disabled', false);
    $('#cbSDOpsaSpouse').prop('disabled', false);

    $('#cb_LI_FullAddress').enable(true);
    $('#cb_LI_FullAddress2').enable(true);
    $('#cb_SLI_FullAddress').enable(true);
    $('#cb_SLI_FullAddress2').enable(true);
    $('#cb_CLI_FullAddress').enable(true);
    $('#cb_CLI_FullAddress2').enable(true);
    $('#cb_SigLI_FullAddress').enable(true);
    $('#cb_SigLI_FullAddress2').enable(true);


    //Line Buttons
    $('.btnContactDtlsBorr').enable(true);
    $('.btnLocDtlsBorr').enable(true);
    $('.btnEmpnfoBorr').enable(true);
    $('.btnBussInfoBorr').enable(true);
    $('.btnOthSrc').enable(true);
    $('.btnContactDtlsSigna').enable(true);
    $('.btnSignatoriesLocation').enable(true);
    $('.btnEmpnfoSigna').enable(true);
    $('.btnBussInfoSigna').enable(true);

    //Buttons
    $('#btnReqCompliance').enable(true);
    $('#btnReqComplianceSpouse').enable(true);

    //$('#btnDisappRemarks').enable(true);


    

    /*individual*/
    $("#lugIDSalutation").enable(true)
    $("#txt_ID_LastName").enable(true);
    $("#txt_ID_FirstName").enable(true);
    $("#txt_ID_MiddleName").enable(true);
    $("#txt_ID_MothersMaidenName").enable(true);
    $("#lugNameSuffix").enable(true)
    $("#txt_ID_DateOfBirth").enable(true);
    $("#txt_ID_PlaceOfBirth").enable(true);

    $("#lugGender").enable(true)
    $("#lugMaritalStatus").enable(true)
    $("#lugNationality").enable(true)
    $("#lugEducAttainment").enable(true)
    $("#txt_ID_TIN").enable(true);
    $("#txt_ID_SSS").enable(true);
    $("#txt_ID_GSIS").enable(true);
    $("#lugPolExpPer").enable(false);

    $("#lugPrimSrcInc").enable(true)
    
    $('#cbIndvPolExpPer').enable(true);

    /*Corp Non-Individual*/
    $("#txt_CNID_RegistrdName").enable(true);
    $("#txt_CNID_TradeName").enable(true);
    $("#lugEntityType").enable(true)
    $("#lugMSMETag").enable(true)
    $("#lugCNID_NatBu").enable(true)
    $("#txt_CNID_TIN").enable(true);
    $("#txt_CNID_TotalAsst").enable(true);
    $("#lugBusinessRegstrtn").enable(true)
    $("#txt_CNID_NoEmp").enable(true);







    //DisableREf

    /*Location Information*/
    $("#cmbLIPrepMail").enable(true);
    $("#lugLIHomeOwnrshp").enable(true)
    $("#txt_LI_FullAddress").enable(false);

    $("#txt_LI_LengthStay").enable(true);
    $("#txt_LI_UnitNo").enable(true);
    $("#txt_LI_FloorNo").enable(true);
    $("#txt_LI_BldgNo").enable(true);
    $("#txt_LI_BuildingName").enable(true);
    $("#txt_LI_Landmark").enable(true);
    $("#txt_LI_HouseNo").enable(true);
    $("#txt_LI_StreetName").enable(true);
    $("#txt_LI_Lot").enable(true);
    $("#txt_LI_Block").enable(true);
    $("#txt_LI_Phase").enable(true);
    $("#txt_LI_Subdivision").enable(true);
    $("#txt_LI_Zone").enable(true);

    $("#lugLIBarangay").enable(true)
    $("#lugLIMunicipality").enable(true)
    $("#lugLIProvince").enable(true)
    $("#lugLIRegion").enable(true)
    $("#lugLICountry").enable(true)

    $("#txt_LI_Zip").enable(true);
    $("#lugLIHomeOwnrshp2").enable(true)
    $("#txt_LI_FullAddress2").enable(false);
    $("#txt_LI_LengthStay2").enable(true);
    $("#txt_LI_UnitNo2").enable(true);
    $("#txt_LI_FloorNo2").enable(true);
    $("#txt_LI_BldgNo2").enable(true);
    $("#txt_LI_BuildingName2").enable(true);
    $("#txt_LI_Landmark2").enable(true);
    $("#txt_LI_HouseNo2").enable(true);
    $("#txt_LI_StreetName2").enable(true);
    $("#txt_LI_Lot2").enable(true);
    $("#txt_LI_Block2").enable(true);
    $("#txt_LI_Phase2").enable(true);
    $("#txt_LI_Subdivision2").enable(true);
    $("#txt_LI_Zone2").enable(true);

    $("#lugLIBarangay2").enable(true)
    $("#lugLIMunicipality2").enable(true)
    $("#lugLIProvince2").enable(true)
    $("#lugLIRegion2").enable(true)
    $("#lugLICountry2").enable(true)
    $("#txt_LI_Zip2").enable(true);
    $("#cbPresentAdd").enable(true);
    

    /* Employee Information */
    $("#lugEIEmploymentType").enable(true)
    $("#txt_EI_EmployerName").enable(true);
    $("#lugEIEmploymentStatus").enable(true)
    $("#txt_EI_JobTitle").enable(true)
    $("#lugEINatureEmplymnt").enable(true)
    $("#txt_EI_Years").enable(true);
    //$("#txt_EI_Month").enable(true);
    $("#lugEIPosition").enable(true);
    $("#txt_EI_GrossMnthlyIncm").enable(true);
    $("#txt_EI_PhoneNo").enable(true);
    $("#txt_EI_MobileNo").enable(true);
    $("#txt_EI_EmailAdd").enable(true);
    $("#lugEIBusinessIncSrc").enable(true)
    $("#txt_EI_EmploymentAddress").enable(false);
    $("#txt_EI_UnitNo").enable(true);
    $("#txt_EI_FloorNo").enable(true);
    $("#txt_EI_BldgNo").enable(true);
    $("#txt_EI_BldgName").enable(true);
    $("#txt_EI_House").enable(true);
    $("#txt_EI_StreetName").enable(true);
    $("#txt_EI_Lot").enable(true);
    $("#txt_EI_Block").enable(true);
    $("#txt_EI_Phase").enable(true);
    $("#txt_EI_Subdivision").enable(true);
    $("#txt_EI_Zone").enable(true);
    $("#lugEIBarangay").enable(true)
    $("#lugEIMunicipality").enable(true)
    $("#lugEIProvince").enable(true)
    $("#lugEIRegion").enable(true)
    $("#lugEICountry").enable(true)
    $("#txt_EI_Zip").enable(true);


    /* Business Information */
    $("#txt_BI_BusinessName").enable(true);
    $("#lugBIBusinessType").enable(true)
    $("#lugBINatureBusiness").enable(true)
    $("#txt_BI_JobTitle").enable(true);
    $("#lugBIOccptnPositn").enable(true)
    $("#txt_BI_Years").enable(true);
    //$("#txt_BI_Month").enable(true);
    $("#txt_BI_GrossMnthlyIncm").enable(true);
    $("#lugBIOccupation").enable(true)
    $("#txt_BI_TotalAsst").enable(true);
    $("#lugBusinessRgstrtn").enable(true)
    $("#txt_BI_NoEmployee").enable(true);
    $("#txt_BI_PhoneNo").enable(true);
    $("#txt_BI_MobileNo").enable(true);
    $("#txt_BI_EmailAdd").enable(true);
    $("#lugBIBusinessIncSrc").enable(true)
    $("#txt_BI_BusinessAddress").enable(false);
    $("#txt_BI_UnitNo").enable(true);
    $("#txt_BI_FloorNo").enable(true);
    $("#txt_BI_BldgNo").enable(true);
    $("#txt_BI_BldgName").enable(true);
    $("#txt_BI_Landmark").enable(true);
    $("#txt_BI_House").enable(true);
    $("#txt_BI_StreetName").enable(true);
    $("#txt_BI_Lot").enable(true);
    $("#txt_BI_Block").enable(true);
    $("#txt_BI_Phase").enable(true);
    $("#txt_BI_Subdivision").enable(true);
    $("#txt_BI_Zone").enable(true);
    $("#lugBIBarangay").enable(true)
    $("#lugBIMunicipality").enable(true)
    $("#lugBIProvince").enable(true)
    $("#lugBIRegion").enable(true)
    $("#lugBICountry").enable(true)
    $("#txt_BI_Zip").enable(true);

    /*Spouse Info*/
    $("#lugSISalutation").enable(true)
    $("#txt_SI_LastName").enable(true);
    $("#txt_SI_FirstName").enable(true);
    $("#txt_SI_MiddleName").enable(true);
    $("#txt_SI_MothersMaidenName").enable(true);
    $("#lugSINameSuffix").enable(true)
    $("#txt_SI_DateOfBirth").enable(true);
    $("#txt_SI_PlaceOfBirth").enable(true);
    $("#lugSIGender").enable(true)
    $("#lugSIMaritalStatus").enable(false)
    $("#lugSINationality").enable(true)
    $("#lugSIEducAttainment").enable(true)
    $("#txt_SI_TIN").enable(true);
    $("#txt_SI_SSS").enable(true);
    $("#txt_SI_GSIS").enable(true);
    $("#cbSIPolExpPer").enable(true);
    $("#lugSIPolExpPer").enable(false)
    $("#lugSIPrimSrcInc").enable(true)
    
    /* Spouse Location Information*/
    $("#cbSLISBLI").enable(true);
    $("#cmbSLIPrepMail").enable(true);
    $("#lugSLIHomeOwnrshp").enable(true)
    $("#txt_SLI_FullAddress").enable(false);
    $("#txt_SLI_LengthStay").enable(true);
    $("#txt_SLI_UnitNo").enable(true);
    $("#txt_SLI_FloorNo").enable(true);
    $("#txt_SLI_BldgNo").enable(true);
    $("#txt_SLI_BuildingName").enable(true);
    $("#txt_SLI_HouseNo").enable(true);
    $("#txt_SLI_HouseNo2").enable(true);
    $("#txt_SLI_Landmark").enable(true);
    $("#txt_SLI_HouseNo").enable(true);
    $("#txt_SLI_StreetName").enable(true);
    $("#txt_SLI_Lot").enable(true);
    $("#txt_SLI_Block").enable(true);
    $("#txt_SLI_Phase").enable(true);
    $("#txt_SLI_Subdivision").enable(true);
    $("#txt_SLI_Zone").enable(true);
    $("#lugSLIBarangay").enable(true)
    $("#lugSLIMunicipality").enable(true)
    $("#lugSLIProvince").enable(false)
    $("#lugSLIRegion").enable(false)
    $("#lugSLICountry").enable(false)
    $("#txt_SLI_Zip").enable(true);
    $("#lugSLIHomeOwnrshp2").enable(true)
    $("#txt_SLI_FullAddress2").enable(false);
    $("#txt_SLI_LengthStay2").enable(true);
    $("#txt_SLI_UnitNo2").enable(true);
    $("#txt_SLI_FloorNo2").enable(true);
    $("#txt_SLI_BldgNo2").enable(true);
    $("#txt_SLI_BuildingName2").enable(true);
    $("#txt_SLI_Landmark2").enable(true);
    $("#txt_SLI_HouseNo2").enable(true);
    $("#txt_SLI_StreetName2").enable(true);
    $("#txt_SLI_Lot2").enable(true);
    $("#txt_SLI_Block2").enable(true);
    $("#txt_SLI_Phase2").enable(true);
    $("#txt_SLI_Subdivision2").enable(true);
    $("#txt_SLI_Zone2").enable(true);
    $("#lugSLIBarangay2").enable(true)
    $("#lugSLIMunicipality2").enable(true)
    $("#lugSLIProvince2").enable(true)
    $("#lugSLIRegion2").enable(true)
    $("#lugSLICountry2").enable(true)
    $("#txt_SLI_Zip2").enable(true);

    /*Spouse Employee Information */
    $("#lugSEIEmploymentType").enable(true)
    $("#txt_SEI_EmployerName").enable(true);
    $("#lugSEIEmploymentStatus").enable(true)
    $("#txt_SEI_JobTitle").enable(true)
    $("#lugSEINatureEmplymnt").enable(true)
    $("#txt_SEI_Years").enable(true);
    //$("#txt_SEI_Month").enable(true);
    $("#lugSEIPosition").enable(true);
    $("#txt_SEI_GrossMnthlyIncm").enable(true);
    $("#txt_SEI_PhoneNo").enable(true);
    $("#txt_SEI_MobileNo").enable(true);
    $("#txt_SEI_EmailAdd").enable(true);
    $("#lugSEIBusinessIncSrc").enable(true)
    $("#txt_SEI_EmploymentAddress").enable(false);
    $("#txt_SEI_UnitNo").enable(true);
    $("#txt_SEI_FloorNo").enable(true);
    $("#txt_SEI_BldgNo").enable(true);
    $("#txt_SEI_BldgName").enable(true);
    $("#txt_SEI_House").enable(true);
    $("#txt_SEI_StreetName").enable(true);
    $("#txt_SEI_Lot").enable(true);
    $("#txt_SEI_Block").enable(true);
    $("#txt_SEI_Phase").enable(true);
    $("#txt_SEI_Subdivision").enable(true);
    $("#txt_SEI_Zone").enable(true);
    $("#lugSEIBarangay").enable(true);
    $("#lugSEIMunicipality").enable(true);
    $("#lugSEIProvince").enable(true);
    $("#lugSEIRegion").enable(true);
    $("#lugSEICountry").enable(true);
    $("#txt_SEI_Zip").enable(true);


    /*Spouse Business Information */
    $("#txt_SBI_BusinessName").enable(true);
    $("#lugSBIBusinessType").enable(true)
    $("#lugSBINatureBusiness").enable(true)
    $("#txt_SBI_JobTitle").enable(true);
    $("#lugSBIOccptnPositn").enable(true)
    $("#txt_SBI_Years").enable(true);
    //$("#txt_SBI_Month").enable(true);
    $("#txt_SBI_GrossMnthlyIncm").enable(true);
    $("#lugSBIMSMETagging").enable(true);
    $("#txt_SBI_TotalAsst").enable(true);
    $("#lugSBIBusinessRgstrtn").enable(true);
    $("#txt_SBI_NoEmployee").enable(true);
    $("#txt_SBI_PhoneNo").enable(true);
    $("#txt_SBI_MobileNo").enable(true);
    $("#txt_SBI_EmailAdd").enable(true);
    $("#lugSBIBusinessIncSrc").enable(true)
    $("#txt_SBI_BusinessAddress").enable(false);
    $("#txt_SBI_UnitNo").enable(true);
    $("#txt_SBI_FloorNo").enable(true);
    $("#txt_SBI_BldgNo").enable(true);
    $("#txt_SBI_BldgName").enable(true);
    $("#txt_SBI_Landmark").enable(true);
    $("#txt_SBI_House").enable(true);
    $("#txt_SBI_StreetName").enable(true);
    $("#txt_SBI_Lot").enable(true);
    $("#txt_SBI_Block").enable(true);
    $("#txt_SBI_Phase").enable(true);
    $("#txt_SBI_Subdivision").enable(true);
    $("#txt_SBI_Zone").enable(true);
    $("#lugSBIBarangay").enable(true)
    $("#lugSBIMunicipality").enable(true)
    $("#lugSBIProvince").enable(true)
    $("#lugSBIRegion").enable(true)
    $("#lugSBICountry").enable(true)
    $("#txt_SBI_Zip").enable(true)

    /*C Location Information*/
    $("#cbCLISBLI").enable(true);
    $("#cmbCLIPrepMail").enable(true);
    $("#lugCLIHomeOwnrshp").enable(true)
    $("#txt_CLI_FullAddress").enable(false);
    $("#txt_CLI_LengthStay").enable(true);
    $("#txt_CLI_UnitNo").enable(true);
    $("#txt_CLI_FloorNo").enable(true);
    $("#txt_CLI_BldgNo").enable(true);
    $("#txt_CLI_BuildingName").enable(true);
    $("#txt_CLI_Landmark").enable(true);
    $("#txt_CLI_HouseNo").enable(true);
    $("#txt_CLI_StreetName").enable(true);
    $("#txt_CLI_Lot").enable(true);
    $("#txt_CLI_Block").enable(true);
    $("#txt_CLI_Phase").enable(true);
    $("#txt_CLI_Subdivision").enable(true);
    $("#txt_CLI_Zone").enable(true);
    $("#lugCLIBarangay").enable(true)
    $("#lugCLIMunicipality").enable(true)
    $("#lugCLIProvince").enable(true)
    $("#lugCLIRegion").enable(true)
    $("#lugCLICountry").enable(true)
    $("#txt_CLI_Zip").enable(true);
    $("#lugCLIHomeOwnrshp2").enable(true)
    $("#txt_CLI_FullAddress2").enable(false);
    $("#txt_CLI_LengthStay2").enable(true);
    $("#txt_CLI_UnitNo2").enable(true);
    $("#txt_CLI_FloorNo2").enable(true);
    $("#txt_CLI_BldgNo2").enable(true);
    $("#txt_CLI_BuildingName2").enable(true);
    $("#txt_CLI_Landmark2").enable(true);
    $("#txt_CLI_HouseNo2").enable(true);
    $("#txt_CLI_StreetName2").enable(true);
    $("#txt_CLI_Lot2").enable(true);
    $("#txt_CLI_Block2").enable(true);
    $("#txt_CLI_Phase2").enable(true);
    $("#txt_CLI_Subdivision2").enable(true);
    $("#txt_CLI_Zone2").enable(true);
    $("#lugCLIBarangay2").enable(true)
    $("#lugCLIMunicipality2").enable(true)
    $("#lugCLIProvince2").enable(true);
    $("#lugCLIRegion2").enable(true)
    $("#lugCLICountry2").enable(true)
    $("#txt_CLI_Zip2").enable(true);

    /* C Employee Information */
    $("#lugCEIEmploymentType").enable(true)
    $("#txt_CEI_EmployerName").enable(true);
    $("#lugCEIEmploymentStatus").enable(true)
    $("#txt_CEI_JobTitle").enable(true)
    $("#lugCEINatureEmplymnt").enable(true)
    $("#lugCEIPosition").enable(true)
    $("#txt_CEI_Years").enable(true);
    //$("#txt_CEI_Month").enable(true);
    $("#txt_CEI_GrossMnthlyIncm").enable(true);
    $("#txt_CEI_PhoneNo").enable(true);
    $("#txt_CEI_MobileNo").enable(true);
    $("#txt_CEI_EmailAdd").enable(true);
    $("#lugCEIBusinessIncSrc").enable(true)
    $("#txt_CEI_EmployeeAddress").enable(false);
    $("#txt_CEI_UnitNo").enable(true);
    $("#txt_CEI_FloorNo").enable(true);
    $("#txt_CEI_BldgNo").enable(true);
    $("#txt_CEI_BldgName").enable(true);
    $("#txt_CEI_House").enable(true);
    $("#txt_CEI_StreetName").enable(true);

    $("#txt_CEI_Lot").enable(true);
    $("#txt_CEI_Block").enable(true);
    $("#txt_CEI_Phase").enable(true);
    $("#txt_CEI_Subdivision").enable(true);
    $("#txt_CEI_Zone").enable(true);
    $("#txt_CEI_StreetName").enable(true);
    $("#lugCEIBarangay").enable(true)
    $("#lugCEIMunicipality").enable(true)
    $("#lugCEIProvince").enable(true)
    $("#lugCEIRegion").enable(true)
    $("#lugCEICountry").enable(true)
    $("#txt_CEI_Zip").enable(true);


    /* C Business Information */
    $("#txt_CBI_BusinessName").enable(true);
    $("#lugCBIBusinessType").enable(true)
    $("#lugCBINatureBusiness").enable(true)
    $("#txt_CBI_JobTitle").enable(true);
    $("#lugCBIOccptnPositn").enable(true)
    $("#txt_CBI_Years").enable(true);
    //$("#txt_CBI_Month").enable(true);
    $("#txt_CBI_GrossMnthlyIncm").enable(true);
    $("#lugCBIMSMETagging").enable(true)
    $("#txt_CBI_TotalAsst").enable(true);
    $("#lugCBIBusinessRgstrtn").enable(true)
    $("#txt_CBI_NoEmployee").enable(true);
    $("#txt_CBI_PhoneNo").enable(true);
    $("#txt_CBI_MobileNo").enable(true);
    $("#txt_CBI_EmailAdd").enable(true);
    $("#lugCBIBusinessIncSrc").enable(true)
    $("#txt_CBI_BusinessAddress").enable(false);
    $("#txt_CBI_UnitNo").enable(true);
    $("#txt_CBI_FloorNo").enable(true);
    $("#txt_CBI_BldgNo").enable(true);
    $("#txt_CBI_BldgName").enable(true);
    $("#txt_CBI_Landmark").enable(true);
    $("#txt_CBI_House").enable(true);
    $("#txt_CBI_StreetName").enable(true);
    $("#txt_CBI_Lot").enable(true);
    $("#txt_CBI_Block").enable(true);
    $("#txt_CBI_Phase").enable(true);
    $("#txt_CBI_Subdivision").enable(true);
    $("#txt_CBI_Zone").enable(true);
    $("#lugCBIBarangay").enable(true)
    $("#lugCBIMunicipality").enable(true)
    $("#lugCBIProvince").enable(true)
    $("#lugCBIRegion").enable(true)
    $("#lugCBICountry").enable(true)
    $("#txt_CBI_Zip").enable(true);

    /*SpouseLocationInformation*/
    $("#cmbSLIPrepMail").enable(true);
    $("#lugSigLIHomeOwnrshp").enable(true)
    $("#lugSigLIHomeOwnrshp2").enable(true)
    $("#txt_SigLI_FullAddress").enable(false);
    $("#txt_SigLI_LengthStay").enable(true);
    $("#txt_SigLI_UnitNo").enable(true);
    $("#txt_SigLI_FloorNo").enable(true);
    $("#txt_SigLI_BldgNo").enable(true);
    $("#txt_SigLI_BuildingName").enable(true);
    $("#txt_SigLI_Landmark").enable(true);
    $("#txt_SigLI_HouseNo").enable(true);
    $("#txt_SigLI_StreetName").enable(true);
    $("#txt_SigLI_Lot").enable(true);
    $("#txt_SigLI_Block").enable(true);
    $("#txt_SigLI_Phase").enable(true);
    $("#txt_SigLI_HouseNo").enable(false);
    $("#txt_SigLI_Subdivision").enable(true);
    $("#txt_SigLI_Zone").enable(true);
    $("#lugSigLIBarangay").enable(true)
    $("#lugSigLIMunicipality").enable(true)
    $("#lugSigLIProvince").enable(true)
    $("#lugSigLIRegion").enable(true)
    $("#lugSigLICountry").enable(true)
    $("#txt_SigLI_Zip").enable(true);
    $("#txt_SigLI_HouseNo").enable(true);
    $("#lugSigLIHomeOwnrshp2").enable(true)

    $("#txt_SigLI_FullAddress2").enable(false);
    $("#txt_SigLI_LengthStay2").enable(true);
    $("#txt_SigLI_UnitNo2").enable(true);
    $("#txt_SigLI_FloorNo2").enable(true);
    $("#txt_SigLI_BldgNo2").enable(true);
    $("#txt_SigLI_BuildingName2").enable(true);
    $("#txt_SigLI_Landmark2").enable(true);
    $("#txt_SigLI_HouseNo2").enable(true);
    $("#txt_SigLI_StreetName2").enable(true);
    $("#txt_SigLI_Lot2").enable(true);
    $("#txt_SigLI_Block2").enable(true);
    $("#txt_SigLI_Phase2").enable(true);
    $("#txt_SigLI_Subdivision2").enable(true);
    $("#txt_SigLI_Zone2").enable(true);
    $("#lugSigLIBarangay2").enable(true)
    $("#lugSigLIMunicipality2").enable(true)
    $("#lugSigLIProvince2").enable(true)
    $("#lugSigLIRegion2").enable(true)
    $("#lugSigLICountry2").enable(true)
    $("#txt_SigLI_Zip2").enable(true);

    /*SpouseEmployeeInformation*/
    $("#lugSigEIEmploymentType").enable(true)
    $("#txt_SigEI_EmployerName").enable(true);
    $("#lugSigEIEmploymentStatus").enable(true)
    $("#lugSigEIJobTitle").enable(true);
    $("#lugSigEINatureEmplymnt").enable(true)
    $("#lugSigEIPosition").enable(true)
    
    $("#txt_SigEI_Years").enable(true);
    //$("#txt_SigEI_Month").enable(true);
    $("#txt_SigEI_GrossMnthlyIncm").enable(true);
    $("#txt_SigEI_PhoneNo").enable(true);
    $("#txt_SigEI_MobileNo").enable(true);
    $("#txt_SigEI_EmailAdd").enable(true);
    $("#lugSigEIBusinessIncSrc").enable(true)
    $("#txt_SigEI_EmploymentAddress").enable(false);
    $("#txt_SigEI_UnitNo").enable(true);
    $("#txt_SigEI_FloorNo").enable(true);
    $("#txt_SigEI_BldgNo").enable(true);
    $("#txt_SigEI_BldgName").enable(true);
    $("#txt_SigEI_House").enable(true);
    $("#txt_SigEI_StreetName").enable(true);
    $("#txt_SigEI_Lot").enable(true);
    $("#txt_SigEI_Block").enable(true);
    $("#txt_SigEI_Phase").enable(true);
    $("#txt_SigEI_Subdivision").enable(true);
    $("#txt_SigEI_Zone").enable(true);
    $("#lugSigEIBarangay").enable(true)
    $("#lugSigEIMunicipality").enable(true)
    $("#lugSigEIProvince").enable(true)
    $("#lugSigEIRegion").enable(true)
    $("#lugSigEICountry").enable(true)
    $("#txt_SigEI_Zip").enable(true);

    /*SpouseBusinessInformation*/
    $("#txt_SigBI_BusinessName").enable(true);
    $("#lugSigBIBusinessType").enable(true);
    $("#lugSigBINatureBusiness").enable(true);
    $("#txt_SigBI_JobTitle").enable(true);
    $("#lugSigBIOccptnPositn").enable(true);
    $("#txt_SigBI_Years").enable(true);
    //$("#txt_SigBI_Month").enable(true);
    $("#txt_SigBI_GrossMnthlyIncm").enable(true);
    $("#lugSigBIMSMETagging").enable(true);
    $("#txt_SigBI_TotalAsst").enable(true);
    $("#lugSigBIBusinessRgstrtn").enable(true);
    $("#txt_SigBI_NoEmployee").enable(true);
    $("#txt_SigBI_PhoneNo").enable(true);
    $("#txt_SigBI_MobileNo").enable(true);
    $("#txt_SigBI_EmailAdd").enable(true);
    $("#lugSigBIBusinessIncSrc").enable(true)
    $("#txt_SigBI_BusinessAddress").enable(false);
    $("#txt_SigBI_UnitNo").enable(true);
    $("#txt_SigBI_FloorNo").enable(true);
    $("#txt_SigBI_BldgNo").enable(true);
    $("#txt_SigBI_BldgName").enable(true);
    $("#txt_SigBI_Landmark").enable(true);
    $("#txt_SigBI_House").enable(true);
    $("#txt_SigBI_StreetName").enable(true);
    $("#txt_SigBI_Lot").enable(true);
    $("#txt_SigBI_Block").enable(true);
    $("#txt_SigBI_Phase").enable(true);
    $("#txt_SigBI_Subdivision").enable(true);
    $("#txt_SigBI_Zone").enable(true);
    $("#lugSigBIBarangay").enable(true);
    $("#lugSigBIMunicipality").enable(true);
    $("#lugSigBIProvince").enable(true);
    $("#lugSigBIRegion").enable(true);
    $("#lugSigBICountry").enable(true);
    $("#txt_SigBI_Zip").enable(true);

    /*Other Business Information*/
    $("#txt_OBI_StatmntDate").enable(true);
    $("#txt_OBI_NoMthsFinYear").enable(true);
    $("#txt_OBI_AuditQlity").enable(true);
    //$("#txt_OBI_Currency").enable(true);
    $("#lugOBICurrency").enable(true);
    $("#txt_OBI_BusinessRgstrtn").enable(true);
    $("#txt_OBI_NoEmp").enable(true);
    $("#txt_OBI_Land").enable(true);
    $("#txt_OBI_FinanclStatemnt").enable(true);
    $("#txt_OBI_TotalAssets").enable(true);
    $("#txt_OBI_TotalLbts").enable(true);
    $("#txt_OBI_Equity").enable(true);
    $("#txt_OBI_Revenue").enable(true);
    $("#txt_OBI_TotalExps").enable(true);
    $("#txt_OBI_NetProfit").enable(true);

    //remarks
    $('#txt_LI_Remarks').enable(true);
    $('#txt_LI_Remarks2').enable(true);
    $('#txt_EI_Remarks').enable(true);
    $('#txt_BI_Remarks').enable(true);
    $('#txt_SLI_Remarks').enable(true);
    $('#txt_SLI_Remarks2').enable(true);
    $('#txt_SEI_Remarks').enable(true);
    $('#txt_SBI_Remarks').enable(true);
    $('#txt_CLI_Remarks').enable(true);
    $('#txt_CLI_Remarks2').enable(true);
    $('#txt_CEI_Remarks').enable(true);
    $('#txt_CBI_Remarks').enable(true);
    $('#txt_SigLI_Remarks').enable(true);
    $('#txt_SigLI_Remarks2').enable(true);
    $('#txt_SigEI_Remarks').enable(true);
    $('#txt_SigBI_Remarks').enable(true);
    //$('#lugBorrowerType').enable(true);
    //$('#lugPartyType').enable(true);


    //$('#lugDealerLoc').enable(true);
    //$('#lugIndustry').enable(true);
    //$('#lugIndustryScheme').enable(true);
    //$('#lugEntityType').enable(true);
    //$('#lugBusinessReg').enable(true);

    //$('#nwGrid1Con').enable(true);
    //$('#nwGrid2Con').enable(true);

    $('#btnNewCreditLine').enable(false);
    //$('.classHeader,#btnCollapseAll').enable(true);
    //$('#tab-main-one,#tab-main-two,#tab-main-three,#tab-main-four,#tab-main-thirtyone,#tab-main-five,#tab-main-six,#tab-main-seven,#tab-main-eight,#tab-main-nine,#tab-main-ten,#tab-main-eleven,#tab-main-twelve,#tab-main-thirteen,#tab-main-fourteen,#tab-main-thirty,#tab-main-nineteen,#tab-main-twentytwo,#tab-main-thirtytwo,#tab-main-twentythree,#tab-main-twentyfour,#tab-main-twentyfive,#tab-main-twentysix').enable(true);
    ////$(".expandss").enable(true);
    //$('#btnCollapseAll').enable(true);
    //Check Box



    $("#lookupColumn").enable(true);
}

function DisableFields() {
    $('#nwReq').hide();
    $("#nwReq2").hide();
    $('#txtDependentsInfo').prop('disabled', true);

    $("#txtBorrowersCode").enable(false);
    $("#txtApprovalID").enable(false);
    $("#txtCrossCode").enable(false);
    $("#txtRecStatus").enable(false);

    $('#nwGridContactInfoCon').enable(false);
    $('#nwGridDependntInfoCon').enable(false);
    $('#nwGridBorrowerInfoCon').enable(false);
    $('#nwGridSigntrsInfoCon').enable(false);
    $('#nwGridTradeReferenceCon').enable(false);
    $('#nwGridBankReferenceCon').enable(false);
    $('#nwGridCreditLineCon').enable(false);
    $('#nwGridPaymentDtlsCon').enable(false);
    $('#nwGridCoBorrowerContactInfoCon').enable(false);
    $('#nwGridSigntryContactDtlsCon').enable(false);
    $('#nwGridOthSrcIncInfoCon').enable(false);

    $('#btnPaymentDetails').enable(false)

    $('#cb_LI_FullAddress').enable(false);
    $('#cb_LI_FullAddress2').enable(false);
    $('#cb_SLI_FullAddress').enable(false);
    $('#cb_SLI_FullAddress2').enable(false);
    $('#cb_CLI_FullAddress').enable(false);
    $('#cb_CLI_FullAddress2').enable(false);
    $('#cb_SigLI_FullAddress').enable(false);
    $('#cb_SigLI_FullAddress2').enable(false);
    $('#cbPresentAdd').enable(false);
    $('#cbSLIPresentAdd').enable(false);
    $('#cbCLIPresentAdd').enable(false);
    $('#cbSigLIPresentAdd').enable(false);

    //
    $("#txt_SEI_StreetName").enable(false);

    //Line Details
    $('.btnContactDtlsBorr').enable(false);
    $('.btnLocDtlsBorr').enable(false);
    $('.btnEmpnfoBorr').enable(false);
    $('.btnBussInfoBorr').enable(false);
    $('.btnOthSrc').enable(false);
    $('.btnContactDtlsSigna').enable(false);
    $('.btnSignatoriesLocation').enable(false);
    $('.btnEmpnfoSigna').enable(false);
    $('.btnBussInfoSigna').enable(false);

    //
    $('#btnReqCompliance').enable(false);
    $('#btnReqComplianceSpouse').enable(false);
    $('#btnDisappRemarks').enable(false);
    $('#cbOpsaDilcoIndv').prop('disabled', true);
    $('#cbOpsaDilcoCorp').prop('disabled', true);
    $('#cbSDOpsaSpouse').prop('disabled', true);

    //$("#txtDependentsInfo").enable(false);

    $("#lugLIBarangay").enable(false);
    $("#lugBorrowerType").enable(false);
    $("#lugPartyType").enable(false);


    /*individual*/
    $("#lugIDSalutation").enable(false);
    $("#txt_ID_LastName").enable(false);
    $("#txt_ID_FirstName").enable(false);
    $("#txt_ID_MiddleName").enable(false);
    $("#txt_ID_MothersMaidenName").enable(false);
    $("#lugNameSuffix").enable(false);
    $("#txt_ID_DateOfBirth").enable(false);
    $("#txt_ID_PlaceOfBirth").enable(false);
    $("#lugGender").enable(false);
    $("#lugMaritalStatus").enable(false);
    $("#lugNationality").enable(false);
    $("#lugEducAttainment").enable(false);
    $("#txt_ID_TIN").enable(false);
    $("#txt_ID_SSS").enable(false);
    $("#txt_ID_GSIS").enable(false);
    $("#lugPolExpPer").enable(false);
    $("#lugPrimSrcInc").enable(false);

    /*Corp Non-Individual*/
    $("#txt_CNID_RegistrdName").enable(false);
    $("#txt_CNID_TradeName").enable(false);
    $("#lugEntityType").enable(false);
    $("#lugMSMETag").enable(false);
    $("#lugCNID_NatBu").enable(false);
    $("#txt_CNID_TIN").enable(false);
    $("#txt_CNID_TotalAsst").enable(false);
    $("#lugBusinessRegstrtn").enable(false);
    $("#txt_CNID_NoEmp").enable(false);

    /*Location Information*/
    $("#cmbLIPrepMail").enable(false);
    $("#lugLIHomeOwnrshp").enable(false);
    $("#txt_LI_FullAddress").enable(false);
    $("#txt_LI_LengthStay").enable(false);
    $("#txt_LI_UnitNo").enable(false);
    $("#txt_LI_FloorNo").enable(false);
    $("#txt_LI_BldgNo").enable(false);
    $("#txt_LI_BuildingName").enable(false);
    $("#txt_LI_Landmark").enable(false);
    $("#txt_LI_HouseNo").enable(false);
    $("#txt_LI_StreetName").enable(false);
    $("#txt_LI_Lot").enable(false);
    $("#txt_LI_Block").enable(false);
    $("#txt_LI_Phase").enable(false);
    $("#txt_LI_Subdivision").enable(false);
    $("#txt_LI_Zone").enable(false);
    $("#lugLIBarangay").enable(false);
    $("#lugLIMunicipality").enable(false);
    $("#lugLIProvince").enable(false);
    $("#lugLIRegion").enable(false);
    $("#lugLICountry").enable(false);
    $("#txt_LI_Zip").enable(false);
    $("#lugLIHomeOwnrshp2").enable(false);
    $("#txt_LI_FullAddress2").enable(false);
    $("#txt_LI_LengthStay2").enable(false);
    $("#txt_LI_UnitNo2").enable(false);
    $("#txt_LI_FloorNo2").enable(false);
    $("#txt_LI_BldgNo2").enable(false);
    $("#txt_LI_BuildingName2").enable(false);
    $("#txt_LI_Landmark2").enable(false);
    $("#txt_LI_HouseNo2").enable(false);
    $("#txt_LI_StreetName2").enable(false);
    $("#txt_LI_Lot2").enable(false);
    $("#txt_LI_Block2").enable(false);
    $("#txt_LI_Phase2").enable(false);
    $("#txt_LI_Subdivision2").enable(false);
    $("#txt_LI_Zone2").enable(false);
    $("#lugLIBarangay2").enable(false);
    $("#lugLIMunicipality2").enable(false);
    $("#lugLIProvince2").enable(false);
    $("#lugLIRegion2").enable(false);
    $("#lugLICountry2").enable(false);
    $("#txt_LI_Zip2").enable(false);

    /* Employee Information */
    $("#lugEIEmploymentType").enable(false);
    $("#txt_EI_EmployerName").enable(false);
    $("#lugEIEmploymentStatus").enable(false);
    $("#lugEIJobTitle").enable(false);
    $("#lugEIPosition").enable(false);
    $("#lugEINatureEmplymnt").enable(false);
    $("#txt_EI_Years").enable(false);
    $("#txt_EI_Month").enable(false);
    $("#txt_EI_GrossMnthlyIncm").enable(false);
    $("#txt_EI_PhoneNo").enable(false);
    $("#txt_EI_MobileNo").enable(false);
    $("#txt_EI_EmailAdd").enable(false);
    $("#lugEIBusinessIncSrc").enable(false);
    $("#txt_EI_EmploymentAddress").enable(false);
    $("#txt_EI_UnitNo").enable(false);
    $("#txt_EI_FloorNo").enable(false);
    $("#txt_EI_BldgNo").enable(false);
    $("#txt_EI_BldgName").enable(false);
    $("#txt_EI_House").enable(false);
    $("#txt_EI_StreetName").enable(false);
    
    $("#txt_EI_Lot").enable(false);
    $("#txt_EI_Block").enable(false);
    $("#txt_EI_Phase").enable(false);
    $("#txt_EI_Subdivision").enable(false);
    $("#txt_EI_Zone").enable(false);
    $("#lugEIBarangay").enable(false);
    $("#lugEIMunicipality").enable(false);
    $("#lugEIProvince").enable(false);
    $("#lugEIRegion").enable(false);
    $("#lugEICountry").enable(false);
    $("#txt_EI_Zip").enable(false);
    $("#txt_EI_JobTitle").enable(false);

    /* Business Information */
    $("#txt_BI_BusinessName").enable(false);
    $("#lugBIBusinessType").enable(false);
    $("#lugBINatureBusiness").enable(false);
    $("#txt_BI_JobTitle").enable(false);
    $("#lugBIOccptnPositn").enable(false);
    $("#txt_BI_Years").enable(false);
    $("#txt_BI_Month").enable(false);
    $("#txt_BI_GrossMnthlyIncm").enable(false);
    $("#lugBIOccupation").enable(false);
    $("#txt_BI_TotalAsst").enable(false);
    $("#lugBusinessRgstrtn").enable(false);
    $("#txt_BI_NoEmployee").enable(false);
    $("#txt_BI_PhoneNo").enable(false);
    $("#txt_BI_MobileNo").enable(false);
    $("#txt_BI_EmailAdd").enable(false);
    $("#lugBIBusinessIncSrc").enable(false);
    $("#txt_BI_BusinessAddress").enable(false);
    $("#txt_BI_UnitNo").enable(false);
    $("#txt_BI_FloorNo").enable(false);
    $("#txt_BI_BldgNo").enable(false);
    $("#txt_BI_BldgName").enable(false);
    $("#txt_BI_Landmark").enable(false);
    $("#txt_BI_House").enable(false);
    $("#txt_BI_StreetName").enable(false);
    $("#txt_BI_Lot").enable(false);
    $("#txt_BI_Block").enable(false);
    $("#txt_BI_Phase").enable(false);
    $("#txt_BI_Subdivision").enable(false);
    $("#txt_BI_Zone").enable(false);
    $("#lugBIBarangay").enable(false);
    $("#lugBIMunicipality").enable(false);
    $("#lugBIProvince").enable(false);
    $("#lugBIRegion").enable(false);
    $("#lugBICountry").enable(false);
    $("#txt_BI_Zip").enable(false);

    /*Spouse Info*/
    $("#lugSISalutation").enable(false);
    $("#txt_SI_LastName").enable(false);
    $("#txt_SI_FirstName").enable(false);
    $("#txt_SI_MiddleName").enable(false);
    $("#txt_SI_MothersMaidenName").enable(false);
    $("#lugSINameSuffix").enable(false);
    $("#txt_SI_DateOfBirth").enable(false);
    $("#txt_SI_PlaceOfBirth").enable(false);
    $("#lugSIGender").enable(false);
    $("#lugSIMaritalStatus").enable(false);
    $("#lugSINationality").enable(false);
    $("#lugSIEducAttainment").enable(false);
    $("#txt_SI_TIN").enable(false);
    $("#txt_SI_SSS").enable(false);
    $("#txt_SI_GSIS").enable(false);
    $("#lugSIPolExpPer").enable(false);
    $("#lugSIPrimSrcInc").enable(false);

    /* Spouse Location Information*/
    $("#cbSLISBLI").enable(false);
    $("#cmbSLIPrepMail").enable(false);
    $("#lugSLIHomeOwnrshp").enable(false);
    $("#txt_SLI_FullAddress").enable(false);
    $("#txt_SLI_LengthStay").enable(false);
    $("#txt_SLI_UnitNo").enable(false);
    $("#txt_SLI_FloorNo").enable(false);
    $("#txt_SLI_BldgNo").enable(false);
    $("#txt_SLI_BuildingName").enable(false);
    $("#txt_SLI_Landmark").enable(false);
    $("#txt_SLI_HouseNo").enable(false);

    $("#txt_SLI_StreetName").enable(false);
    $("#txt_SLI_Lot").enable(false);
    $("#txt_SLI_Block").enable(false);
    $("#txt_SLI_Phase").enable(false);
    $("#txt_SLI_Subdivision").enable(false);
    $("#txt_SLI_Zone").enable(false);
    $("#lugSLIBarangay").enable(false);
    //$("#lugSLIMunicipality").enable(false);
    $("#lugSLIProvince").enable(false);
    $("#lugSLIRegion").enable(false);
    $("#lugSLICountry").enable(false);
    $("#txt_SLI_Zip").enable(false);
    $("#lugSLIHomeOwnrshp2").enable(false);
    $("#txt_SLI_FullAddress2").enable(false);
    $("#txt_SLI_LengthStay2").enable(false);
    $("#txt_SLI_UnitNo2").enable(false);
    $("#txt_SLI_FloorNo2").enable(false);
    $("#txt_SLI_BldgNo2").enable(false);
    $("#txt_SLI_BuildingName2").enable(false);
    $("#txt_SLI_HouseNo").enable(false);
    $("#txt_SLI_HouseNo2").enable(false);
    $("#txt_SLI_Landmark2").enable(false);
    $("#txt_SLI_HouseNo2").enable(false);
    $("#txt_SLI_StreetName2").enable(false);
    $("#txt_SLI_Lot2").enable(false);
    $("#txt_SLI_Block2").enable(false);
    $("#txt_SLI_Phase2").enable(false);
    $("#txt_SLI_Subdivision2").enable(false);
    $("#txt_SLI_Zone2").enable(false);
    $("#lugSLIBarangay2").enable(false);
    //$("#lugSLIMunicipality2").enable(false);
    $("#lugSLIProvince2").enable(false);
    $("#lugSLIRegion2").enable(false);
    $("#lugSLICountry2").enable(false);
    $("#txt_SLI_Zip2").enable(false);

    /*Spouse Employee Information */
    $("#lugSEIEmploymentType").enable(false);
    $("#txt_SEI_EmployerName").enable(false);
    $("#lugSEIEmploymentStatus").enable(false);
    $("#txt_SEI_JobTitle").enable(false);
    $("#lugSEINatureEmplymnt").enable(false);
    $("#txt_SEI_Years").enable(false);
    $("#txt_SEI_Month").enable(false);
    $("#lugSEIPosition").enable(false);
    $("#txt_SEI_GrossMnthlyIncm").enable(false);
    $("#txt_SEI_PhoneNo").enable(false);
    $("#txt_SEI_MobileNo").enable(false);
    $("#txt_SEI_EmailAdd").enable(false);
    $("#lugSEIBusinessIncSrc").enable(false);
    $("#txt_SEI_EmploymentAddress").enable(false);
    $("#txt_SEI_UnitNo").enable(false);
    $("#txt_SEI_FloorNo").enable(false);
    $("#txt_SEI_BldgNo").enable(false);
    $("#txt_SEI_BldgName").enable(false);
    $("#txt_SEI_House").enable(false);
    $("#txt_SEI_Lot").enable(false);
    $("#txt_SEI_Block").enable(false);
    $("#txt_SEI_Phase").enable(false);
    $("#txt_SEI_Subdivision").enable(false);
    $("#txt_SEI_Zone").enable(false);
    $("#lugSEIBarangay").enable(false);
    $("#lugSEIMunicipality").enable(false);
    $("#lugSEIProvince").enable(false);
    $("#lugSEIRegion").enable(false);
    $("#lugSEICountry").enable(false);
    $("#txt_SEI_Zip").enable(false);


    /*Spouse Business Information */
    $("#txt_SBI_BusinessName").enable(false);
    $("#lugSBIBusinessType").enable(false);
    $("#lugSBINatureBusiness").enable(false);
    $("#txt_SBI_JobTitle").enable(false);
    $("#lugSBIOccptnPositn").enable(false);
    $("#txt_SBI_Years").enable(false);
    $("#txt_SBI_Month").enable(false);
    $("#txt_SBI_GrossMnthlyIncm").enable(false);
    $("#lugSBIMSMETagging").enable(false);
    $("#txt_SBI_TotalAsst").enable(false);
    $("#lugBusinessRgstrtn").enable(false);
    $("#txt_SBI_NoEmployee").enable(false);
    $("#txt_SBI_PhoneNo").enable(false);
    $("#txt_SBI_MobileNo").enable(false);
    $("#txt_SBI_EmailAdd").enable(false);
    $("#lugSBIBusinessIncSrc").enable(false);
    $("#txt_SBI_BusinessAddress").enable(false);
    $("#txt_SBI_UnitNo").enable(false);
    $("#txt_SBI_FloorNo").enable(false);
    $("#txt_SBI_BldgNo").enable(false);
    $("#txt_SBI_BldgName").enable(false);
    $("#txt_SBI_Landmark").enable(false);
    $("#txt_SBI_House").enable(false);
    $("#txt_SBI_StreetName").enable(false);
    $("#txt_SBI_Lot").enable(false);
    $("#txt_SBI_Block").enable(false);
    $("#txt_SBI_Phase").enable(false);
    $("#txt_SBI_Subdivision").enable(false);
    $("#txt_SBI_Zone").enable(false);
    $("#lugSBIBarangay").enable(false);
    $("#lugSBIMunicipality").enable(false);
    $("#lugSBIProvince").enable(false);
    $("#lugSBIRegion").enable(false);
    $("#lugSBICountry").enable(false);
    $("#txt_SBI_Zip").enable(false);

    /*C Location Information*/
    $("#cbCLISBLI").enable(false);
    $("#cmbCLIPrepMail").enable(false);
    $("#lugCLIHomeOwnrshp").enable(false);
    $("#txt_CLI_FullAddress").enable(false);
    $("#txt_CLI_LengthStay").enable(false);
    $("#txt_CLI_UnitNo").enable(false);
    $("#txt_CLI_FloorNo").enable(false);
    $("#txt_CLI_BldgNo").enable(false);
    $("#txt_CLI_BuildingName").enable(false);
    $("#txt_CLI_Landmark").enable(false);
    $("#txt_CLI_HouseNo").enable(false);
    $("#txt_CLI_StreetName").enable(false);
    $("#txt_CLI_Lot").enable(false);
    $("#txt_CLI_Block").enable(false);
    $("#txt_CLI_Phase").enable(false);
    $("#txt_CLI_Subdivision").enable(false);
    $("#txt_CLI_Zone").enable(false);
    $("#txt_CLI_HouseNo").enable(false);
    $("#txt_CLI_HouseNo2").enable(false);
    $("#lugCLIBarangay").enable(false);
    $("#lugCLIMunicipality").enable(false);
    $("#lugCLIProvince").enable(false);
    $("#lugCLIRegion").enable(false);
    $("#lugCLICountry").enable(false);
    $("#txt_CLI_Zip").enable(false);
    $("#lugCLIHomeOwnrshp2").enable(false);
    $("#txt_CLI_FullAddress2").enable(false);
    $("#txt_CLI_LengthStay2").enable(false);
    $("#txt_CLI_UnitNo2").enable(false);
    $("#txt_CLI_FloorNo2").enable(false);
    $("#txt_CLI_BldgNo2").enable(false);
    $("#txt_CLI_BuildingName2").enable(false);
    $("#txt_CLI_Landmark2").enable(false);
    $("#txt_CLI_HouseNo2").enable(false);
    $("#txt_CLI_StreetName2").enable(false);
    $("#txt_CLI_Lot2").enable(false);
    $("#txt_CLI_Block2").enable(false);
    $("#txt_CLI_Phase2").enable(false);
    $("#txt_CLI_Subdivision2").enable(false);
    $("#txt_CLI_Zone2").enable(false);
    $("#lugCLIBarangay2").enable(false);
    $("#lugCLIMunicipality2").enable(false);
    $("#lugCLIProvince2").enable(false);
    $("#lugCLIRegion2").enable(false);
    $("#lugCLICountry2").enable(false);
    $("#txt_CLI_Zip2").enable(true);

    /* C Employee Information */
    $("#lugCEIEmploymentType").enable(false);
    $("#txt_CEI_EmployerName").enable(false);
    $("#lugCEIEmploymentStatus").enable(false);
    $("#txt_CEI_JobTitle").enable(false);
    $("#lugCEINatureEmplymnt").enable(false);
    $("#lugCEIPosition").enable(false);
    $("#txt_CEI_Years").enable(false);
    $("#txt_CEI_Month").enable(false);
    $("#txt_CEI_GrossMnthlyIncm").enable(false);
    $("#txt_CEI_PhoneNo").enable(false);
    $("#txt_CEI_MobileNo").enable(false);
    $("#txt_CEI_EmailAdd").enable(false);
    $("#lugCEIBusinessIncSrc").enable(false);
    $("#txt_CEI_EmploymentAddress").enable(false);
    $("#txt_CEI_UnitNo").enable(false);
    $("#txt_CEI_FloorNo").enable(false);
    $("#txt_CEI_BldgNo").enable(false);
    $("#txt_CEI_BldgName").enable(false);
    $("#txt_CEI_House").enable(false);
    $("#txt_CEI_StreetName").enable(false);
    $("#txt_CEI_Lot").enable(false);
    $("#txt_CEI_Block").enable(false);
    $("#txt_CEI_Phase").enable(false);
    $("#txt_CEI_Subdivision").enable(false);
    $("#txt_CEI_Zone").enable(false);
    $("#lugCEIBarangay").enable(false);
    $("#lugCEIMunicipality").enable(false);
    $("#lugCEIProvince").enable(false);
    $("#lugCEIRegion").enable(false);
    $("#lugCEICountry").enable(false);
    $("#txt_CEI_Zip").enable(false);


    /* Business Information */
    $("#txt_CBI_BusinessName").enable(false);
    $("#lugCBIBusinessType").enable(false);
    $("#lugCBINatureBusiness").enable(false);
    $("#txt_CBI_JobTitle").enable(false);
    $("#lugCBIOccptnPositn").enable(false);
    $("#txt_CBI_Years").enable(false);
    $("#txt_CBI_Month").enable(false);
    $("#txt_CBI_GrossMnthlyIncm").enable(false);
    $("#lugCBIMSMETagging").enable(false);
    $("#txt_CBI_TotalAsst").enable(false);
    $("#lugBusinessRgstrtn").enable(false);
    $("#txt_CBI_NoEmployee").enable(false);
    $("#txt_CBI_PhoneNo").enable(false);
    $("#txt_CBI_MobileNo").enable(false);
    $("#txt_CBI_EmailAdd").enable(false);
    $("#lugCBIBusinessIncSrc").enable(false);
    $("#txt_CBI_BusinessAddress").enable(false);
    $("#txt_CBI_UnitNo").enable(false);
    $("#txt_CBI_FloorNo").enable(false);
    $("#txt_CBI_BldgNo").enable(false);
    $("#txt_CBI_BldgName").enable(false);
    $("#txt_CBI_Landmark").enable(false);
    $("#txt_CBI_House").enable(false);
    $("#txt_CBI_StreetName").enable(false);
    $("#txt_CBI_Lot").enable(false);
    $("#txt_CBI_Block").enable(false);
    $("#txt_CBI_Phase").enable(false);
    $("#txt_CBI_Subdivision").enable(false);
    $("#txt_CBI_Zone").enable(false);
    $("#lugCBIBarangay").enable(false);
    $("#lugCBIMunicipality").enable(false);
    $("#lugCBIProvince").enable(false);
    $("#lugCBIRegion").enable(false);
    $("#lugCBICountry").enable(false);
    $("#txt_CBI_Zip").enable(false);

    /*SpouseLocationInformation*/
    $("#cmbSLIPrepMail").enable(false);
    $("#lugSigLIHomeOwnrshp").enable(false)
    $("#txt_SigLI_FullAddress").enable(false);
    $("#txt_SigLI_LengthStay").enable(false);
    $("#txt_SigLI_UnitNo").enable(false);
    $("#txt_SigLI_FloorNo").enable(false);
    $("#txt_SigLI_BldgNo").enable(false);
    $("#txt_SigLI_BuildingName").enable(false);
    $("#txt_SigLI_Landmark").enable(false);
    $("#txt_SigLI_HouseNo").enable(false);
    $("#txt_SigLI_HouseNo").enable(false);
    $("#txt_SigLI_StreetName").enable(false);
    $("#txt_SigLI_Lot").enable(false);
    $("#txt_SigLI_Block").enable(false);
    $("#txt_SigLI_Phase").enable(false);
    $("#txt_SigLI_Subdivision").enable(false);
    $("#txt_SigLI_Zone").enable(false);
    $("#lugSigLIBarangay").enable(false)
    $("#lugSigLIMunicipality").enable(false)
    $("#lugSigLIProvince").enable(false)
    $("#lugSigLIRegion").enable(false)
    $("#lugSigLICountry").enable(false)
    $("#txt_SigLI_Zip").enable(false);

    $("#lugSigLIHomeOwnrshp2").enable(false)
    $("#txt_SigLI_FullAddress2").enable(false);
    $("#txt_SigLI_LengthStay2").enable(false);
    $("#txt_SigLI_UnitNo2").enable(false);
    $("#txt_SigLI_FloorNo2").enable(false);
    $("#txt_SigLI_BldgNo2").enable(false);
    $("#txt_SigLI_BuildingName2").enable(false);
    $("#txt_SigLI_Landmark2").enable(false);
    $("#txt_SigLI_HouseNo2").enable(false);
    $("#txt_SigLI_StreetName2").enable(false);
    $("#txt_SigLI_Lot2").enable(false);
    $("#txt_SigLI_Block2").enable(false);
    $("#txt_SigLI_Phase2").enable(false);
    $("#txt_SigLI_Subdivision2").enable(false);
    $("#txt_SigLI_Zone2").enable(false);
    $("#lugSigLIBarangay2").enable(false)
    $("#lugSigLIMunicipality2").enable(false)
    $("#lugSigLIProvince2").enable(false)
    $("#lugSigLIRegion2").enable(false)
    $("#lugSigLICountry2").enable(false)
    $("#txt_SigLI_Zip2").enable(false);

    /*SpouseEmployeeInformation*/
    $("#lugSigEIEmploymentType").enable(false)
    $("#txt_SigEI_EmployerName").enable(false);
    $("#lugSigEIEmploymentStatus").enable(false)
    $("#lugSigEIJobTitle").enable(false);
    $("#lugSigEINatureEmplymnt").enable(false)
    $("#lugSigEIPosition").enable(false)
    $("#txt_SigEI_Years").enable(false);
    $("#txt_SigEI_Month").enable(false);
    $("#txt_SigEI_GrossMnthlyIncm").enable(false);
    $("#txt_SigEI_PhoneNo").enable(false);
    $("#txt_SigEI_MobileNo").enable(false);
    $("#txt_SigEI_EmailAdd").enable(false);
    $("#lugSigEIBusinessIncSrc").enable(false)
    $("#txt_SigEI_EmploymentAddress").enable(false);
    $("#txt_SigEI_UnitNo").enable(false);
    $("#txt_SigEI_FloorNo").enable(false);
    $("#txt_SigEI_BldgNo").enable(false);
    $("#txt_SigEI_BldgName").enable(false);
    $("#txt_SigEI_House").enable(false);
    $("#txt_SigEI_StreetName").enable(false);
    $("#txt_SigEI_Lot").enable(false);
    $("#txt_SigEI_Block").enable(false);
    $("#txt_SigEI_Phase").enable(false);
    $("#txt_SigEI_Subdivision").enable(false);
    $("#txt_SigEI_Zone").enable(false);
    $("#lugSigEIBarangay").enable(false)
    $("#lugSigEIMunicipality").enable(false)
    $("#lugSigEIProvince").enable(false)
    $("#lugSigEIRegion").enable(false)
    $("#lugSigEICountry").enable(false)
    $("#txt_SigEI_Zip").enable(false);

    /*Signatories BusinessInformation*/
    $("#txt_SigBI_BusinessName").enable(false);
    $("#lugSigBIBusinessType").enable(false)
    $("#lugSigBINatureBusiness").enable(false)

    $("#txt_SigBI_JobTitle").enable(false);
    $("#lugSigBIOccptnPositn").enable(false)
    $("#txt_SigBI_Years").enable(false);
    $("#txt_SigBI_Month").enable(false);
    $("#txt_SigBI_GrossMnthlyIncm").enable(false);
    $("#lugSigBIMSMETagging").enable(false)
    $("#txt_SigBI_TotalAsst").enable(false);
    $("#lugSigBIBusinessRgstrtn").enable(false)
    $("#txt_SigBI_NoEmployee").enable(false);
    $("#txt_SigBI_PhoneNo").enable(false);
    $("#txt_SigBI_MobileNo").enable(false);
    $("#txt_SigBI_EmailAdd").enable(false);
    $("#lugSigBIBusinessIncSrc").enable(false)
    $("#txt_SigBI_BusinessAddress").enable(false);
    $("#txt_SigBI_UnitNo").enable(false);
    $("#txt_SigBI_FloorNo").enable(false);
    $("#txt_SigBI_BldgNo").enable(false);
    $("#txt_SigBI_BldgName").enable(false);
    $("#txt_SigBI_Landmark").enable(false);
    $("#txt_SigBI_House").enable(false);
    $("#txt_SigBI_StreetName").enable(false);
    $("#txt_SigBI_Lot").enable(false);
    $("#txt_SigBI_Block").enable(false);
    $("#txt_SigBI_Phase").enable(false);
    $("#txt_SigBI_Subdivision").enable(false);
    $("#txt_SigBI_Zone").enable(false);
    $("#lugSigBIBarangay").enable(false)
    $("#lugSigBIMunicipality").enable(false)
    $("#lugSigBIProvince").enable(false)
    $("#lugSigBIRegion").enable(false)
    $("#lugSigBICountry").enable(false)
    $("#txt_SigBI_Zip").enable(false)

    /*Other Business Information*/
    $("#txt_OBI_StatmntDate").enable(false);
    $("#txt_OBI_NoMthsFinYear").enable(false);
    $("#txt_OBI_AuditQlity").enable(false);
    $("#txt_OBI_Currency").enable(false);
    $("#lugOBICurrency").enable(false)
    $("#txt_OBI_BusinessRgstrtn").enable(false);
    $("#txt_OBI_NoEmp").enable(false);
    $("#txt_OBI_Land").enable(false);
    $("#txt_OBI_FinanclStatemnt").enable(false);
    $("#txt_OBI_TotalAssets").enable(false);
    $("#txt_OBI_TotalLbts").enable(false);
    $("#txt_OBI_Equity").enable(false);
    $("#txt_OBI_Revenue").enable(false);
    $("#txt_OBI_TotalExps").enable(false);
    $("#txt_OBI_NetProfit").enable(false);

    //Checkbox

    $("cbOpsaDilco").enable(false);
    //if (nwIsReport == 1) {
    //    $('#btnVendorLocation').enable(true);
    //    $('#btnVendorContact').enable(true);
    //    $('#btnDealerAssetAssign').enable(true);
    //    $('#btnSalespersonAssign').enable(true);
    //    $('#btnDealerBankAccountInfo').enable(true);
    //    $('#btnViewContacts').enable(true);
    //    $('#btnViewUpdateHistory').enable(true);
    //}
    //else {
    //    $('#btnVendorLocation').enable(false);
    //    $('#btnVendorContact').enable(false);
    //    $('#btnDealerAssetAssign').enable(false);
    //    $('#btnSalespersonAssign').enable(false);
    //    $('#btnDealerBankAccountInfo').enable(false);
    //    $('#btnViewContacts').enable(false);
    //    $('#btnViewUpdateHistory').enable(false);
    //}
    $('#btnNewCreditLine').enable(true);

 

    //$(".expandss").enable(false);
    $('.classHeader,#btnCollapseAll').enable(false);
    $('#tab-main-one,#tab-main-two,#tab-main-three,#tab-main-four,#tab-main-thirtyone,#tab-main-five,#tab-main-six,#tab-main-seven,#tab-main-eight,#tab-main-nine,#tab-main-ten,#tab-main-eleven,#tab-main-twelve,#tab-main-thirteen,#tab-main-fourteen,#tab-main-thirty,#tab-main-nineteen,#tab-main-twentytwo,#tab-main-thirtytwo,#tab-main-twentythree,#tab-main-twentyfour,#tab-main-twentyfive,#tab-main-twentysix').enable(false);
}

function DisabledFieldsUponRefresh() {
    $('#Individual').enable(false);
    $('#Corporate').enable(false);
    $('#WithoutTIN').enable(false);

    var isIndividual = $('#Individual').prop('checked');

    if (isIndividual) {
        $('#chkLoadOwnersName').enable(true);
        $('#txtRegisteredName').enable(false);
        //$('#txtTradeName').enable(true);
    }
    else {
        $('#txt_ID_LastName').enable(false);
        $('#txt_ID_FirstName').enable(false);
        $('#txtRegisteredName').enable(false);
        //$('#txtTradeName').enable(false);
        $('#chkLoadOwnersName').enable(false);
    }

    if (nwIsReport == 1) {
        $('#rdbLumpsum').enable(false);
        $('#rdbCheckIndividual').enable(false);
        $('#chkLoadOwnersName').enable(false);
        //$('#txtTradeName').enable(false);
    }
    else {
        if (!isIndividual)
            $('#chkLoadOwnersName').enable(false);
        else
            $('#chkLoadOwnersName').enable(true);
        $('#rdbLumpsum').enable(true);
        $('#rdbCheckIndividual').enable(true);
    }

    $('#txt_ID_MiddleName').enable(false);
    $('#lugPayeeSubType').enable(false);
    //$('#txtCrossCode').enable(false);
    $('#lugcurrency').enable(false);
    $('#lugcountry').enable(false);
    $('#btnNewCreditLine').enable(true);
}

function EnableFieldsDone() {//Binding Done

    
    $('#txtCrossCode').enable(true);
    //main
    $('#lugBorrowerType').enable(true);
    $('#lugPartyType').enable(true);
 
    $('#lugOBICurrency').enable(true);
    $("#btnReqCompliance").enable(true);
    $("#btnReqComplianceSpouse").enable(true);
    $('#nwGridContactInfoCon').enable(true);
    $('#nwGridDependntInfoCon').enable(true);
    $('#nwGridBorrowerInfoCon').enable(true);
    $('#nwGridSigntrsInfoCon').enable(true);
    $('#nwGridTradeReferenceCon').enable(true);
    $('#nwGridBankReferenceCon').enable(true);
    $('#nwGridCreditLineCon').enable(true);
    $('#nwGridPaymentDtlsCon').enable(true);
    $('#nwGridCoBorrowerContactInfoCon').enable(true);
    $('#nwGridSigntryContactDtlsCon').enable(true);

    $('#btnNewCreditLine').enable(true);
    $("#btnPaymentDetails").removeClass("btn-default-gray");
    $("#btnPaymentDetails").addClass("btn-default-orange");

    $("#txt_LI_Zip2").enable(true);
    $('#btnPaymentDetails').enable(true);

    $("txt_SEI_StreetName").enable(true);
    //Checkbox
    $('#cbOpsaDilcoIndv').prop('disabled', false);
    $('#cbOpsaDilcoCorp').prop('disabled', false);
    $('#cbSDOpsaSpouse').prop('disabled', false);
    
    $('#cb_LI_FullAddress').enable(true);
    $('#cb_LI_FullAddress2').enable(true);
    $('#cb_SLI_FullAddress').enable(true);
    $('#cb_SLI_FullAddress2').enable(true);
    $('#cb_CLI_FullAddress').enable(true);
    $('#cb_CLI_FullAddress2').enable(true);
    $('#cb_SigLI_FullAddress').enable(true);
    $('#cb_SigLI_FullAddress2').enable(true);
    $('#cbPresentAdd').enable(true);
    $('#cbSLIPresentAdd').enable(true);
    $('#cbCLIPresentAdd').enable(true);
    $('#cbSigLIPresentAdd').enable(true);

    //Line Buttons
    $('.btnContactDtlsBorr').enable(true);
    $('.btnLocDtlsBorr').enable(true);
    $('.btnEmpnfoBorr').enable(true);
    $('.btnBussInfoBorr').enable(true);
    $('.btnOthSrc').enable(false);
    $('.btnContactDtlsSigna').enable(true);
    $('.btnSignatoriesLocation').enable(true);
    $('.btnEmpnfoSigna').enable(true);
    $('.btnBussInfoSigna').enable(true);

    //Buttons
    $('#btnReqCompliance').enable(true);
    $('#btnReqComplianceSpouse').enable(true);

    //$('#btnDisappRemarks').enable(true);


    /*Main*/
    $("#lugBorrowerType").enable(true);
    $("#lugPartyType").enable(true);

    /*individual*/
    $("#lugIDSalutation").enable(true)
    $("#txt_ID_LastName").enable(true);
    $("#txt_ID_FirstName").enable(true);
    $("#txt_ID_MiddleName").enable(true);
    $("#txt_ID_MothersMaidenName").enable(true);
    $("#lugNameSuffix").enable(true)
    $("#txt_ID_DateOfBirth").enable(true);
    $("#txt_ID_PlaceOfBirth").enable(true);

    $("#lugGender").enable(true)
    $("#lugMaritalStatus").enable(true)
    $("#lugNationality").enable(true)
    $("#lugEducAttainment").enable(true)
    $("#txt_ID_TIN").enable(true);
    $("#txt_ID_SSS").enable(true);
    $("#txt_ID_GSIS").enable(true);
    
    $("#lugPrimSrcInc").enable(true)
    $("#cbIndvPolExpPer").enable(true)
    /*Corp Non-Individual*/
    $("#txt_CNID_RegistrdName").enable(true);
    $("#txt_CNID_TradeName").enable(true);
    $("#lugEntityType").enable(true)
    $("#lugMSMETag").enable(true)
    $("#lugCNID_NatBu").enable(true)
    $("#txt_CNID_TIN").enable(true);
    $("#txt_CNID_TotalAsst").enable(true);
    $("#lugBusinessRegstrtn").enable(true)
    $("#txt_CNID_NoEmp").enable(true);

    /*Location Information*/
    $("#cmbLIPrepMail").enable(true);
    $("#lugLIHomeOwnrshp").enable(true)
    $("#txt_LI_FullAddress").enable(false);
    $("#txt_LI_LengthStay").enable(true);
    $("#txt_LI_UnitNo").enable(true);
    $("#txt_LI_FloorNo").enable(true);
    $("#txt_LI_BldgNo").enable(true);
    $("#txt_LI_BuildingName").enable(true);
    $("#txt_LI_Landmark").enable(true);
    $("#txt_LI_HouseNo").enable(true);
    $("#txt_LI_StreetName").enable(true);
    $("#txt_LI_Lot").enable(true);
    $("#txt_LI_Block").enable(true);
    $("#txt_LI_Phase").enable(true);
    $("#txt_LI_Subdivision").enable(true);
    $("#txt_LI_Zone").enable(true);

    $("#lugLIBarangay").enable(true)
    $("#lugLIMunicipality").enable(true)
    $("#lugLIProvince").enable(true)
    $("#lugLIRegion").enable(true)
    $("#lugLICountry").enable(true)

    $("#txt_LI_Zip").enable(true);
    if ($("#cbIndvPolExpPer").prop("checked")==false)
    $("#cbIndvPolExpPer").enable(false);
    

    /* Employee Information */
    $("#lugEIEmploymentType").enable(true)
    $("#txt_EI_EmployerName").enable(true);
    $("#lugEIEmploymentStatus").enable(true)
    $("#lugEIJobTitle").enable(true)
    $("#lugEINatureEmplymnt").enable(true)
    $("#txt_EI_Years").enable(true);
    //$("#txt_EI_Month").enable(true);
    $("#lugEIPosition").enable(true);
    $("#txt_EI_GrossMnthlyIncm").enable(true);
    $("#txt_EI_PhoneNo").enable(true);
    $("#txt_EI_MobileNo").enable(true);
    $("#txt_EI_EmailAdd").enable(true);
    $("#lugEIBusinessIncSrc").enable(true)
    $("#txt_EI_EmploymentAddress").enable(false);
    $("#txt_EI_UnitNo").enable(true);
    $("#txt_EI_FloorNo").enable(true);
    $("#txt_EI_BldgNo").enable(true);
    $("#txt_EI_BldgName").enable(true);
    $("#txt_EI_House").enable(true);
    $("#txt_EI_StreetName").enable(true);
    $("#txt_EI_Lot").enable(true);
    $("#txt_EI_Block").enable(true);
    $("#txt_EI_Phase").enable(true);
    $("#txt_EI_Subdivision").enable(true);
    $("#txt_EI_Zone").enable(true);
    $("#lugEIBarangay").enable(true)
    $("#lugEIMunicipality").enable(true)
    $("#lugEIProvince").enable(true)
    $("#lugEIRegion").enable(true)
    $("#lugEICountry").enable(true)
    $("#txt_EI_Zip").enable(true);


    /* Business Information */
    $("#txt_BI_BusinessName").enable(true);
    $("#lugBIBusinessType").enable(true)
    $("#lugBINatureBusiness").enable(true)
    $("#txt_BI_JobTitle").enable(true);
    $("#lugBIOccptnPositn").enable(true)
    $("#txt_BI_Years").enable(true);
    //$("#txt_BI_Month").enable(true);
    $("#txt_BI_GrossMnthlyIncm").enable(true);
    $("#lugBIOccupation").enable(true)
    $("#txt_BI_TotalAsst").enable(true);
    $("#lugBusinessRgstrtn").enable(false)
    $("#txt_BI_NoEmployee").enable(true);
    $("#txt_BI_PhoneNo").enable(true);
    $("#txt_BI_MobileNo").enable(true);
    $("#txt_BI_EmailAdd").enable(true);
    $("#lugBIBusinessIncSrc").enable(true)
    $("#txt_BI_BusinessAddress").enable(false);
    $("#txt_BI_UnitNo").enable(true);
    $("#txt_BI_FloorNo").enable(true);
    $("#txt_BI_BldgNo").enable(true);
    $("#txt_BI_BldgName").enable(true);
    $("#txt_BI_Landmark").enable(true);
    $("#txt_BI_House").enable(true);
    $("#txt_BI_StreetName").enable(true);
    $("#txt_BI_Lot").enable(true);
    $("#txt_BI_Block").enable(true);
    $("#txt_BI_Phase").enable(true);
    $("#txt_BI_Subdivision").enable(true);
    $("#txt_BI_Zone").enable(true);
    $("#lugBIBarangay").enable(true)
    $("#lugBIMunicipality").enable(true)
    $("#lugBIProvince").enable(true)
    $("#lugBIRegion").enable(true)
    $("#lugBICountry").enable(true)
    $("#txt_BI_Zip").enable(true);

    /*Spouse Info*/
    $("#lugSISalutation").enable(true)
    $("#txt_SI_LastName").enable(true);
    $("#txt_SI_FirstName").enable(true);
    $("#txt_SI_MiddleName").enable(true);
    $("#txt_SI_MothersMaidenName").enable(true);
    $("#lugSINameSuffix").enable(true)
    $("#txt_SI_DateOfBirth").enable(true);
    $("#txt_SI_PlaceOfBirth").enable(true);
    $("#lugSIGender").enable(true)
    $("#lugSIMaritalStatus").enable(true)
    $("#lugSINationality").enable(true)
    $("#lugSIEducAttainment").enable(true)
    $("#txt_SI_TIN").enable(true);
    $("#txt_SI_SSS").enable(true);
    $("#txt_SI_GSIS").enable(true);
    $("#lugSIPolExpPer").enable(true)
    $("#lugSIPrimSrcInc").enable(true)
    $("#cbSIPolExpPer").enable(true)
    /* Spouse Location Information*/
    $("#cbSLISBLI").enable(true);
    $("#cmbSLIPrepMail").enable(true);
    $("#lugSLIHomeOwnrshp").enable(true)
    $("#txt_SLI_FullAddress").enable(false);
    $("#txt_SLI_LengthStay").enable(true);
    $("#txt_SLI_UnitNo").enable(true);
    $("#txt_SLI_FloorNo").enable(true);
    $("#txt_SLI_BldgNo").enable(true);
    $("#txt_SLI_BuildingName").enable(true);
    $("#txt_SLI_HouseNo").enable(true);
    $("#txt_SLI_HouseNo2").enable(true);
    $("#txt_SLI_Landmark").enable(true);
    $("#txt_SLI_HouseNo").enable(true);
    $("#txt_SLI_StreetName").enable(true);
    $("#txt_SLI_Lot").enable(true);
    $("#txt_SLI_Block").enable(true);
    $("#txt_SLI_Phase").enable(true);
    $("#txt_SLI_Subdivision").enable(true);
    $("#txt_SLI_Zone").enable(true);
    $("#lugSLIBarangay").enable(true)
    $("#lugSLIMunicipality").enable(true)
    $("#lugSLIProvince").enable(false)
    $("#lugSLIRegion").enable(false)
    $("#lugSLICountry").enable(false)
    $("#txt_SLI_Zip").enable(true);
    $("#lugSLIHomeOwnrshp2").enable(true)
    $("#txt_SLI_FullAddress2").enable(false);
    $("#txt_SLI_LengthStay2").enable(true);
    $("#txt_SLI_UnitNo2").enable(true);
    $("#txt_SLI_FloorNo2").enable(true);
    $("#txt_SLI_BldgNo2").enable(true);
    $("#txt_SLI_BuildingName2").enable(true);
    $("#txt_SLI_Landmark2").enable(true);
    $("#txt_SLI_HouseNo2").enable(true);
    $("#txt_SLI_StreetName2").enable(true);
    $("#txt_SLI_Lot2").enable(true);
    $("#txt_SLI_Block2").enable(true);
    $("#txt_SLI_Phase2").enable(true);
    $("#txt_SLI_Subdivision2").enable(true);
    $("#txt_SLI_Zone2").enable(true);
    $("#lugSLIBarangay2").enable(true)
    $("#lugSLIMunicipality2").enable(true)
    $("#lugSLIProvince2").enable(true)
    $("#lugSLIRegion2").enable(true)
    $("#lugSLICountry2").enable(true)
    $("#txt_SLI_Zip2").enable(true);

    /*Spouse Employee Information */
    $("#lugSEIEmploymentType").enable(true)
    $("#txt_SEI_EmployerName").enable(true);
    $("#lugSEIEmploymentStatus").enable(true)
    $("#txt_SEI_JobTitle").enable(true)
    $("#lugSEINatureEmplymnt").enable(true)
    $("#txt_SEI_Years").enable(true);
    //$("#txt_SEI_Month").enable(true);
    $("#txt_SEI_GrossMnthlyIncm").enable(true);
    $("#lugSEIPosition").enable(true);
    $("#txt_SEI_PhoneNo").enable(true);
    $("#txt_SEI_MobileNo").enable(true);
    $("#txt_SEI_EmailAdd").enable(true);
    $("#lugSEIBusinessIncSrc").enable(true)
    $("#txt_SEI_EmploymentAddress").enable(false);
    $("#txt_SEI_UnitNo").enable(true);
    $("#txt_SEI_FloorNo").enable(true);
    $("#txt_SEI_BldgNo").enable(true);
    $("#txt_SEI_BldgName").enable(true);
    $("#txt_SEI_House").enable(true);
    $("#txt_SEI_Lot").enable(true);
    $("#txt_SEI_Block").enable(true);
    $("#txt_SEI_Phase").enable(true);
    $("#txt_SEI_Subdivision").enable(true);
    $("#txt_SEI_Zone").enable(true);
    $("#lugSEIBarangay").enable(true);
    $("#lugSEIMunicipality").enable(true);
    $("#lugSEIProvince").enable(true);
    $("#lugSEIRegion").enable(true);
    $("#lugSEICountry").enable(true);
    $("#txt_SEI_Zip").enable(true);


    /*Spouse Business Information */
    $("#txt_SBI_BusinessName").enable(true);
    $("#lugSBIBusinessType").enable(true)
    $("#lugSBINatureBusiness").enable(true)
    $("#txt_SBI_JobTitle").enable(true);
    $("#lugSBIOccptnPositn").enable(true)
    $("#txt_SBI_Years").enable(true);
    //$("#txt_SBI_Month").enable(true);
    $("#txt_SBI_GrossMnthlyIncm").enable(true);
    $("#lugSBIMSMETagging").enable(true);
    $("#txt_SBI_TotalAsst").enable(true);
    $("#lugSBIBusinessRgstrtn").enable(true);
    $("#txt_SBI_NoEmployee").enable(true);
    $("#txt_SBI_PhoneNo").enable(true);
    $("#txt_SBI_MobileNo").enable(true);
    $("#txt_SBI_EmailAdd").enable(true);
    $("#txt_SBI_BusinessAddress").enable(false);
    $('#lugSBIBusinessIncSrc').enable(true);
    $("#txt_SBI_UnitNo").enable(true);
    $("#txt_SBI_FloorNo").enable(true);
    $("#txt_SBI_BldgNo").enable(true);
    $("#txt_SBI_BldgName").enable(true);
    $("#txt_SBI_Landmark").enable(true);
    $("#txt_SBI_House").enable(true);
    $("#txt_SBI_StreetName").enable(true);
    $("#txt_SBI_Lot").enable(true);
    $("#txt_SBI_Block").enable(true);
    $("#txt_SBI_Phase").enable(true);
    $("#txt_SBI_Subdivision").enable(true);
    $("#txt_SBI_Zone").enable(true);
    $("#lugSBIBarangay").enable(true)
    $("#lugSBIMunicipality").enable(true)
    $("#lugSBIProvince").enable(true)
    $("#lugSBIRegion").enable(true)
    $("#lugSBICountry").enable(true)
    $("#txt_SBI_Zip").enable(true)

    /*C Location Information*/
    $("#cbCLISBLI").enable(true);
    $("#cmbCLIPrepMail").enable(true);
    $("#lugCLIHomeOwnrshp").enable(true)
    $("#txt_CLI_FullAddress").enable(false);
    $("#txt_CLI_LengthStay").enable(true);
    $("#txt_CLI_UnitNo").enable(true);
    $("#txt_CLI_FloorNo").enable(true);
    $("#txt_CLI_BldgNo").enable(true);
    $("#txt_CLI_BuildingName").enable(true);
    $("#txt_CLI_Landmark").enable(true);
    $("#txt_CLI_HouseNo").enable(true);
    $("#txt_CLI_StreetName").enable(true);
    $("#txt_CLI_Lot").enable(true);
    $("#txt_CLI_Block").enable(true);
    $("#txt_CLI_Phase").enable(true);
    $("#txt_CLI_Subdivision").enable(true);
    $("#txt_CLI_Zone").enable(true);
    $("#lugCLIBarangay").enable(true)
    $("#lugCLIMunicipality").enable(true)
    $("#lugCLIProvince").enable(true)
    $("#lugCLIRegion").enable(true)
    $("#lugCLICountry").enable(true)
    $("#txt_CLI_Zip").enable(true);
    $("#lugCLIHomeOwnrshp2").enable(true)
    $("#txt_CLI_FullAddress2").enable(false);
    $("#txt_CLI_LengthStay2").enable(true);
    $("#txt_CLI_UnitNo2").enable(true);
    $("#txt_CLI_FloorNo2").enable(true);
    $("#txt_CLI_BldgNo2").enable(true);
    $("#txt_CLI_BuildingName2").enable(true);
    $("#txt_CLI_Landmark2").enable(true);
    $("#txt_CLI_HouseNo2").enable(true);
    $("#txt_CLI_StreetName2").enable(true);
    $("#txt_CLI_Lot2").enable(true);
    $("#txt_CLI_Block2").enable(true);
    $("#txt_CLI_Phase2").enable(true);
    $("#txt_CLI_Subdivision2").enable(true);
    $("#txt_CLI_Zone2").enable(true);
    $("#lugCLIBarangay2").enable(true)
    $("#lugCLIMunicipality2").enable(true)
    $("#lugCLIProvince2").enable(true);
    $("#lugCLIRegion2").enable(true)
    $("#lugCLICountry2").enable(true)
    $("#txt_CLI_Zip2").enable(true);

    /* C Employee Information */
    $("#lugCEIEmploymentType").enable(true);
    $("#txt_CEI_EmployerName").enable(true);
    $("#lugCEIEmploymentStatus").enable(true);
    $("#txt_CEI_JobTitle").enable(true);
    $("#lugCEINatureEmplymnt").enable(true); 
    $("#lugCEIPosition").enable(true);
    $("#txt_CEI_Years").enable(true);
    //$("#txt_CEI_Month").enable(true);
    $("#txt_CEI_GrossMnthlyIncm").enable(true);
    $("#txt_CEI_PhoneNo").enable(true);
    $("#txt_CEI_MobileNo").enable(true);
    $("#txt_CEI_EmailAdd").enable(true);
    $("#lugCEIBusinessIncSrc").enable(true)
    $("#txt_CEI_EmployeeAddress").enable(false);
    $("#txt_CEI_UnitNo").enable(true);
    $("#txt_CEI_FloorNo").enable(true);
    $("#txt_CEI_BldgNo").enable(true);
    $("#txt_CEI_BldgName").enable(true);
    $("#txt_CEI_House").enable(true);
    $("#txt_CEI_StreetName").enable(true);

    $("#txt_CEI_Lot").enable(true);
    $("#txt_CEI_Block").enable(true);
    $("#txt_CEI_Phase").enable(true);
    $("#txt_CEI_Subdivision").enable(true);
    $("#txt_CEI_Zone").enable(true);
    $("#txt_CEI_StreetName").enable(true);
    $("#lugCEIBarangay").enable(true)
    $("#lugCEIMunicipality").enable(true)
    $("#lugCEIProvince").enable(true)
    $("#lugCEIRegion").enable(true)
    $("#lugCEICountry").enable(true)
    $("#txt_CEI_Zip").enable(true);


    /* C Business Information */
    $("#txt_CBI_BusinessName").enable(true);
    $("#lugCBIBusinessType").enable(true)
    $("#lugCBINatureBusiness").enable(true)
    $("#txt_CBI_JobTitle").enable(true);
    $("#lugCBIOccptnPositn").enable(true)
    $("#txt_CBI_Years").enable(true);
    //$("#txt_CBI_Month").enable(true);
    $("#txt_CBI_GrossMnthlyIncm").enable(true);
    $("#lugCBIMSMETagging").enable(true)
    $("#txt_CBI_TotalAsst").enable(true);
    $("#lugCBIBusinessRgstrtn").enable(true)
    $("#txt_CBI_NoEmployee").enable(true);
    $("#txt_CBI_PhoneNo").enable(true);
    $("#txt_CBI_MobileNo").enable(true);
    $("#txt_CBI_EmailAdd").enable(true);
    $("#lugCBIBusinessIncSrc").enable(true)
    $("#txt_CBI_BusinessAddress").enable(false);
    $("#txt_CBI_UnitNo").enable(true);
    $("#txt_CBI_FloorNo").enable(true);
    $("#txt_CBI_BldgNo").enable(true);
    $("#txt_CBI_BldgName").enable(true);
    $("#txt_CBI_Landmark").enable(true);
    $("#txt_CBI_House").enable(true);
    $("#txt_CBI_StreetName").enable(true);
    $("#txt_CBI_Lot").enable(true);
    $("#txt_CBI_Block").enable(true);
    $("#txt_CBI_Phase").enable(true);
    $("#txt_CBI_Subdivision").enable(true);
    $("#txt_CBI_Zone").enable(true);
    $("#lugCBIBarangay").enable(true)
    $("#lugCBIMunicipality").enable(true)
    $("#lugCBIProvince").enable(true)
    $("#lugCBIRegion").enable(true)
    $("#lugCBICountry").enable(true)
    $("#txt_CBI_Zip").enable(true);

    /*SpouseLocationInformation*/
    $("#cmbSLIPrepMail").enable(true);
    $("#lugSigLIHomeOwnrshp").enable(true)
    $("#lugSigLIHomeOwnrshp2").enable(true)
    $("#txt_SigLI_FullAddress").enable(false);
    $("#txt_SigLI_LengthStay").enable(true);
    $("#txt_SigLI_UnitNo").enable(true);
    $("#txt_SigLI_FloorNo").enable(true);
    $("#txt_SigLI_BldgNo").enable(true);
    $("#txt_SigLI_BuildingName").enable(true);
    $("#txt_SigLI_Landmark").enable(true);
    $("#txt_SigLI_HouseNo").enable(true);
    $("#txt_SigLI_StreetName").enable(true);
    $("#txt_SigLI_Lot").enable(true);
    $("#txt_SigLI_Block").enable(true);
    $("#txt_SigLI_Phase").enable(true);
    $("#txt_SigLI_HouseNo").enable(false);
    $("#txt_SigLI_Subdivision").enable(true);
    $("#txt_SigLI_Zone").enable(true);
    $("#lugSigLIBarangay").enable(true)
    $("#lugSigLIMunicipality").enable(true)
    $("#lugSigLIProvince").enable(true)
    $("#lugSigLIRegion").enable(true)
    $("#lugSigLICountry").enable(true)
    $("#txt_SigLI_Zip").enable(true);
    $("#txt_SigLI_HouseNo").enable(true);
    $("#lugSigLIHomeOwnrshp2").enable(true)

    $("#txt_SigLI_FullAddress2").enable(false);
    $("#txt_SigLI_LengthStay2").enable(true);
    $("#txt_SigLI_UnitNo2").enable(true);
    $("#txt_SigLI_FloorNo2").enable(true);
    $("#txt_SigLI_BldgNo2").enable(true);
    $("#txt_SigLI_BuildingName2").enable(true);
    $("#txt_SigLI_Landmark2").enable(true);
    $("#txt_SigLI_HouseNo2").enable(true);
    $("#txt_SigLI_StreetName2").enable(true);
    $("#txt_SigLI_Lot2").enable(true);
    $("#txt_SigLI_Block2").enable(true);
    $("#txt_SigLI_Phase2").enable(true);
    $("#txt_SigLI_Subdivision2").enable(true);
    $("#txt_SigLI_Zone2").enable(true);
    $("#lugSigLIBarangay2").enable(true)
    $("#lugSigLIMunicipality2").enable(true)
    $("#lugSigLIProvince2").enable(true)
    $("#lugSigLIRegion2").enable(true)
    $("#lugSigLICountry2").enable(true)
    $("#txt_SigLI_Zip2").enable(true);

    /*SpouseEmployeeInformation*/
    $("#lugSigEIEmploymentType").enable(true)
    $("#txt_SigEI_EmployerName").enable(true);
    $("#lugSigEIEmploymentStatus").enable(true)
    $("#lugSigEIJobTitle").enable(true);
    $("#lugSigEINatureEmplymnt").enable(true)
    $("#lugSigEIPosition").enable(true)
    $("#txt_SigEI_Years").enable(true);
    //$("#txt_SigEI_Month").enable(true);
    $("#txt_SigEI_GrossMnthlyIncm").enable(true);
    $("#txt_SigEI_PhoneNo").enable(true);
    $("#txt_SigEI_MobileNo").enable(true);
    $("#txt_SigEI_EmailAdd").enable(true);
    $("#lugSigEIBusinessIncSrc").enable(true)
    $("#txt_SigEI_EmploymentAddress").enable(false);
    $("#txt_SigEI_UnitNo").enable(true);
    $("#txt_SigEI_FloorNo").enable(true);
    $("#txt_SigEI_BldgNo").enable(true);
    $("#txt_SigEI_BldgName").enable(true);
    $("#txt_SigEI_House").enable(true);
    $("#txt_SigEI_StreetName").enable(true);
    $("#txt_SigEI_Lot").enable(true);
    $("#txt_SigEI_Block").enable(true);
    $("#txt_SigEI_Phase").enable(true);
    $("#txt_SigEI_Subdivision").enable(true);
    $("#txt_SigEI_Zone").enable(true);
    $("#lugSigEIBarangay").enable(true)
    $("#lugSigEIMunicipality").enable(true)
    $("#lugSigEIProvince").enable(true)
    $("#lugSigEIRegion").enable(true)
    $("#lugSigEICountry").enable(true)
    $("#txt_SigEI_Zip").enable(true);

    /*SpouseBusinessInformation*/
    $("#txt_SigBI_BusinessName").enable(true);
    $("#lugSigBIBusinessType").enable(true);
    $("#lugSigBINatureBusiness").enable(true);
    $("#txt_SigBI_JobTitle").enable(true);
    $("#lugSigBIOccptnPositn").enable(true);
    $("#txt_SigBI_Years").enable(true);
    //$("#txt_SigBI_Month").enable(true);
    $("#txt_SigBI_GrossMnthlyIncm").enable(true);
    $("#lugSigBIMSMETagging").enable(true);
    $("#txt_SigBI_TotalAsst").enable(true);
    $("#lugSigBIBusinessRgstrtn").enable(true);
    $("#txt_SigBI_NoEmployee").enable(true);
    $("#txt_SigBI_PhoneNo").enable(true);
    $("#txt_SigBI_MobileNo").enable(true);
    $("#txt_SigBI_EmailAdd").enable(true);
    $("#lugSigBIBusinessIncSrc").enable(true)
    $("#txt_SigBI_BusinessAddress").enable(false);
    $("#txt_SigBI_UnitNo").enable(true);
    $("#txt_SigBI_FloorNo").enable(true);
    $("#txt_SigBI_BldgNo").enable(true);
    $("#txt_SigBI_BldgName").enable(true);
    $("#txt_SigBI_Landmark").enable(true);
    $("#txt_SigBI_House").enable(true);
    $("#txt_SigBI_StreetName").enable(true);
    $("#txt_SigBI_Lot").enable(true);
    $("#txt_SigBI_Block").enable(true);
    $("#txt_SigBI_Phase").enable(true);
    $("#txt_SigBI_Subdivision").enable(true);
    $("#txt_SigBI_Zone").enable(true);
    $("#lugSigBIBarangay").enable(true);
    $("#lugSigBIMunicipality").enable(true);
    $("#lugSigBIProvince").enable(true);
    $("#lugSigBIRegion").enable(true);
    $("#lugSigBICountry").enable(true);
    $("#txt_SigBI_Zip").enable(true);

    /*Other Business Information*/
    $("#txt_OBI_StatmntDate").enable(true);
    $("#txt_OBI_NoMthsFinYear").enable(true);
    $("#txt_OBI_AuditQlity").enable(true);
    $("#txt_OBI_Currency").enable(true);
    $("#lugOBICurrency").enable(true);
    $("#txt_OBI_BusinessRgstrtn").enable(true);
    $("#txt_OBI_NoEmp").enable(true);
    $("#txt_OBI_Land").enable(true);
    $("#txt_OBI_FinanclStatemnt").enable(true);
    $("#txt_OBI_TotalAssets").enable(true);
    $("#txt_OBI_TotalLbts").enable(true);
    $("#txt_OBI_Equity").enable(true);
    $("#txt_OBI_Revenue").enable(true);
    $("#txt_OBI_TotalExps").enable(true);
    $("#txt_OBI_NetProfit").enable(true);

    $('#lugBorrowerType').enable(false);
    $('#lugPartyType').enable(false);


    //Check Box
    //remarks
    $('#txt_LI_Remarks').enable(true);
    $('#txt_LI_Remarks2').enable(true);
    $('#txt_EI_Remarks').enable(true);
    $('#txt_BI_Remarks').enable(true);
    $('#txt_SLI_Remarks').enable(true);
    $('#txt_SLI_Remarks2').enable(true);
    $('#txt_SEI_Remarks').enable(true);
    $('#txt_SBI_Remarks').enable(true);
    $('#txt_CLI_Remarks').enable(true);
    $('#txt_CLI_Remarks2').enable(true);
    $('#txt_CEI_Remarks').enable(true);
    $('#txt_CBI_Remarks').enable(true);
    $('#txt_SigLI_Remarks').enable(true);
    $('#txt_SigLI_Remarks2').enable(true);
    $('#txt_SigEI_Remarks').enable(true);
    $('#txt_SigBI_Remarks').enable(true);

    $('#txtDependentsInfo').enable(true);

    $('#btnViewUpdateHistory').enable(true);

    $('#noah-webui-default-New').enable(true);
    $('#noah-webui-default-Save').enable(true);
    $('#noah-webui-default-Delete').enable(true);
    $('#noah-webui-default-Delete').visible(true);
    $('#noah-webui-default-Refresh').enable(true);
    $('#noah-webui-default-Inquire').enable(true);
    $('#noah-webui-default-Process').visible(true);
    $('#noah-webui-default-Process').enable(true);

  

    $('#noah-webui-default-Export').enable(true);
    //$fn().xOnKeyUpEvents.xFullAddressValue();
    $('#btnNewCreditLine').enable(true);

    $('.classHeader,#btnCollapseAll').enable(true);
    $('#tab-main-one,#tab-main-two,#tab-main-three,#tab-main-four,#tab-main-thirtyone,#tab-main-five,#tab-main-six,#tab-main-seven,#tab-main-eight,#tab-main-nine,#tab-main-ten,#tab-main-eleven,#tab-main-twelve,#tab-main-thirteen,#tab-main-fourteen,#tab-main-thirty,#tab-main-nineteen,#tab-main-twentytwo,#tab-main-thirtytwo,#tab-main-twentythree,#tab-main-twentyfour,#tab-main-twentyfive,#tab-main-twentysix').enable(true);


    DisapprovalDetailsColor();
    
}


function DetailsForViewing()
{
    if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
        $('#noah-webui-default-Save').enable(false);
        $('#noah-webui-default-Delete').enable(false);
        $('#noah-webui-default-Process').enable(false);
        $('.txtArea').enable(false);
        $('.txtAreaField').enable(false);
        $('.lookups').enable(false);
        $('.CheckboxFA').enable(false);
        $('#nwGridContactInfoCon').enable(false);
        $('select').enable(false);
        $('.addchgLocInfo').enable(false);
        $('#nwGridBenefOwnCon').enable(false);
        $('#nwGridBankReferenceCon').enable(false);
        $('#nwGridTradeReferenceCon').enable(false);
        $('#txt_OBI_BusinessRgstrtn').enable(false);
        $('#txt_OBI_Revenue').enable(false);
        $('#btnNewCreditLine').enable(true);
        $('#txt_EI_Years').enable(false);
        $('#txt_EI_Month').enable(false);
        $('.addchgAddressEmpInfo').enable(false);
        $('#txt_BI_Years').enable(false);
        $('#txt_BI_Month').enable(false);
        $('.addchgBussAddEmpInfo').enable(false);
        $('#nwGridOthSrcIncInfoCon').enable(false);
        $('#nwGridDependntInfoCon').enable(false);
        $('#nwGridSpouseConInfoCon').enable(false);
        $('.addchgSpouseLocInfo').enable(false);
        $('#txt_SEI_Years').enable(false);
        $('#txt_SEI_Month').enable(false);
        $('.addchgAddressEmpSpoInfo').enable(false);
        $('#txt_SBI_Years').enable(false);
        $('#txt_SBI_Month').enable(false);
        $('.addchgSpoAddEmpInfo').enable(false);
        $('.addchgLocInfo2').enable(false);
        $('.addchgSpouseLocInfo2').enable(false);

    } else {
        $('#nwGridBenefOwnCon').enable(true);
    }
    func_ActionDriven("actEmpSourceAst", true);
}



function DisapprovalDetailsColor(){
    if ($('#idvallugReasonforDisapp').val() != "") {
        $('#btnDisappRemarks').enable(true);
        $('#btnDisappRemarks').removeClass('btn-default-gray');
        $('#btnDisappRemarks').addClass('btn-default-red');
    } else {
        $('#btnDisappRemarks').enable(false);
        $('#btnDisappRemarks').removeClass('btn-default-red');
        $('#btnDisappRemarks').addClass('btn-default-gray');
    }
}

function DisableFieldsDone() { // For Refresh
    //Line Buttons
    //$('.btnContactDtlsBorr').enable(true);
    //$('.btnLocDtlsBorr').enable(true);
    //$('.btnEmpnfoBorr').enable(true);
    //$('.btnBussInfoBorr').enable(true);

    //$('.btnContactDtlsSigna').enable(true);
    //$('.btnSignatoriesLocation').enable(true);
    //$('.btnEmpnfoSigna').enable(true);
    //$('.btnBussInfoSigna').enable(true);
    //$(".expandss").enable(true);
    $('.classHeader,#btnCollapseAll').enable(true);
    $('#tab-main-one,#tab-main-two,#tab-main-three,#tab-main-four,#tab-main-thirtyone,#tab-main-five,#tab-main-six,#tab-main-seven,#tab-main-eight,#tab-main-nine,#tab-main-ten,#tab-main-eleven,#tab-main-twelve,#tab-main-thirteen,#tab-main-fourteen,#tab-main-thirty,#tab-main-nineteen,#tab-main-twentytwo,#tab-main-thirtytwo,#tab-main-twentythree,#tab-main-twentyfour,#tab-main-twentyfive,#tab-main-twentysix').enable(true);
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
    else
        EnableFieldsDone();
}

function DisableFieldsEmpty() {

    $(".history_switch").enable(false);
    $('#chkBox').prop('checked', true);
    $('#btnNewCreditLine').enable(true);
    //$(".expandss").enable(false);
    $('.classHeader,#btnCollapseAll').enable(false);
    $('#tab-main-one,#tab-main-two,#tab-main-three,#tab-main-four,#tab-main-thirtyone,#tab-main-five,#tab-main-six,#tab-main-seven,#tab-main-eight,#tab-main-nine,#tab-main-ten,#tab-main-eleven,#tab-main-twelve,#tab-main-thirteen,#tab-main-fourteen,#tab-main-thirty,#tab-main-nineteen,#tab-main-twentytwo,#tab-main-thirtytwo,#tab-main-twentythree,#tab-main-twentyfour,#tab-main-twentyfive,#tab-main-twentysix').enable(false);
    //DisableFields();
}

function ClearFields() {
    $('#chkBox').prop('checked', true);
    $('#txtBorrowersCode').val('');
    $('#txt_LI_LengthStay2').val('');
    //Main
    $('#idvallugBorrowerType').val('');
    $('#descvallugBorrowerType').val('');

    $('#idvallugPartyType').val('');
    $('#descvallugPartyType').val('');
    $('#descvallugNameSuffix').val('');
    //Requirements
    $("#btnReqCompliance").enable(false);
    $('#btnReqCompliance').addClass('btn-default-gray');
    $('#btnReqCompliance').removeClass('btn-default-orange');
    $('#btnReqCompliance').removeClass('btn-default-green');

    //Requirements Spouse
    $("#btnReqComplianceSpouse").enable(false);
    $('#btnReqComplianceSpouse').addClass('btn-default-gray');
    $('#btnReqComplianceSpouse').removeClass('btn-default-orange');
    $('#btnReqComplianceSpouse').removeClass('btn-default-green');

    $('#idvallugBIOccupation').val('');
    $('#descvallugBIOccupation').val('');
    $('#txtStatusForEntry').val('1');
    //Main Header
    $('#txtBorrowersCode').val(''); 
    $('#idvallugPartyType').val(''); 
    $('#descvallugPartyType').val('');
    $('#idvallugBorrowerType').val(''); 
    $('#descvallugBorrowerType').val(''); 
    $('#txtCrossCode').val('');
    $('#txtRecStatus').val(''); 
    $('#txtApprovalID').val(''); 
    $('#idvallugIDSalutation').val('');
    $('#descvallugIDSalutation').val('');

    $('#rdbInd').prop('checked', false);
    $('#rdbBus').prop('checked', false);

    //Individual Details
    $('#idvallugIDSalutation').val(''); 
    $('#descvallugIDSalutation').val('');
    $('#txt_ID_LastName').val(''); 
    $('#txt_ID_FirstName').val(''); 
    $('#txt_ID_MiddleName').val(''); 
    $('#idvallugNameSuffix').val('');
    $('#descvallugNameSuffix').val(''); 
    //$('#idvallugNameSuffix').val(''); 
    //$('#descvallugNameSuffix').val(''); 
    $('#txt_ID_DateOfBirth').val(''); 
    $('#txt_ID_DateOfBirth').val(''); 
    $('#idvallugGender').val(''); 
    $('#descvallugGender').val(''); 
    $('#idvallugMaritalStatus').val(''); 
    $('#descvallugMaritalStatus').val(''); 
    $('#idvallugNationality').val(''); 
    $('#idvallugEducAttainment').val(''); 
    $('#descvallugEducAttainment').val('');
    $('#txt_ID_TIN').val(''); 
    $('#txt_ID_SSS').val('');
    $('#txt_ID_GSIS').val(''); 
    $('#cbOpsaDilcoIndv').prop('checked', false);
    $('#cbIndvPolExpPer').prop('checked', false);
    $('#rdbEmp').prop('checked', false);
    $('#rdbBuss').prop('checked', false);
    $('#rdbOthers').prop('checked', false);
    $('#chkMarried').prop('checked', false);

    $('#rdbEmp_Sps').prop('checked', false);
    $('#rdbBuss_Sps').prop('checked', false);
    $('#rdbOthers_Sps').prop('checked', false);

    $('#cbSDOpsaSpouse').prop('checked', false);
    $('#cbSIPolExpPer').prop('checked', false);
    $('#cbPresentAdd').prop('checked', false);
    
    
    $('#idvallugPolExpPer').val(''); 
    $('#descvallugPolExpPer').val(''); 
    $('#idvallugPrimSrcInc').val('');
    $('#descvallugPrimSrcInc').val('');




    //Corp
    $('#txt_CNID_RegistrdName').val(''); 
    $('#txt_CNID_TradeName').val('');
    $('#idvallugEntityType').val(''); 
    $('#descvallugEntityType').val(''); 
    //$('#cbOpsaDilcoCorp", "prop", "", "#noah-webui-Toolbox-BindingNavigator", "opsadilcoCp");
    $('#idvallugMSMETag').val('');
    $('#descvallugMSMETag').val('');
    $('#idvallugCNID_NatBu').val('');
    $('#descvallugCNID_NatBu').val('');
    $('#txt_CNID_TIN').val(''); 
    $('#txt_CNID_TotalAsst').val(''); 
    $('#idvallugBusinessRegstrtn').val(''); 
    $('#descvallugBusinessRegstrtn').val('');
    $('#txt_CNID_NoEmp').val(''); 
    //Loc
    $('#cmbLIPrepMail').val(''); 
    $('#idvallugLIHomeOwnrshp').val('');
    $('#desvallugLIHomeOwnrshp').val(''); 
    $('#cb_LI_FullAddress').val('');   
    $('#txt_LI_FullAddress').val(''); 
    $('#txt_LI_LengthStay').val(''); 
    $('#txt_LI_UnitNo').val(''); 
    $('#txt_LI_FloorNo').val(''); 
    $('#txt_LI_BldgNo').val(''); 
    $('#txt_LI_BuildingName').val(''); 
    $('#txt_LI_Landmark').val(''); 
    $('#txt_LI_HouseNo').val(''); 
    $('#txt_LI_StreetName').val(''); 
    $('#txt_LI_Lot').val('');
    $('#txt_LI_Block').val(''); 
    $('#txt_LI_Phase').val(''); 
    $('#txt_LI_Subdivision').val('');
    $('#txt_LI_Zone').val(''); 
    $('#idvallugLIBarangay').val(''); 
    $('#desvallugLIBarangay').val(''); 
    $('#idvallugLIMunicipality').val(''); 
    $('#desvallugLIMunicipality').val('');
    $('#idvallugLIProvince').val('');
    $('#desvallugLIProvince').val(''); 
    $('#idvallugLIRegion').val('');
    $('#desvallugLIRegion').val('');
    $('#idvallugLICountry').val('');
    $('#desvallugLICountry').val('');
    $('#txt_LI_Zip').val('');
    $('#idvallugLIHomeOwnrshp2').val(''); 
    $('#descvallugLIHomeOwnrshp2').val('');
    $('#txt_LI_FullAddress2').val(''); 
    $('#txt_LI_LengthStay2').val('');
    $('#txt_LI_UnitNo2').val(''); 
    $('#txt_LI_FloorNo2').val(''); 
    $('#txt_LI_BldgNo2').val(''); 
    $('#txt_LI_BuildingName2').val('');
    $('#txt_LI_Landmark2').val('');
    $('#txt_LI_HouseNo2').val(''); 
    $('#txt_LI_StreetName2').val('');
    $('#txt_LI_Lot2').val('');
    $('#txt_LI_Block2').val('');
    $('#txt_LI_Phase2').val(''); 
    $('#txt_LI_Subdivision2').val('')
    $('#txt_LI_Zone2').val(''); 
    $('#idvallugLIBarangay2').val(''); 
    $('#descvallugLIBarangay2').val('');
    $('#idvallugLIMunicipality2').val(''); 
    $('#descvallugLIMunicipality2').val(''); 
    $('#idvallugLIProvince2').val(''); 
    $('#desvallugLIProvince2').val('');
    $('#idvallugLIRegion2').val(''); 
    $('#descvallugLIRegion2').val(''); 
    $('#idvallugLICountry2').val(''); 
    $('#descvallugLICountry2').val(''); 
    $('#txt_LI_Zip2').val(''); 


    //Emp
    $('#idvallugEIEmploymentType').val(''); 
    $('#descvallugEIEmploymentType').val('');
    $('#txt_EI_EmployerName').val(''); 
    $('#idvallugEIEmploymentStatus').val('');
    $('#descvallugEIEmploymentStatus').val(''); 
    $('#txt_EI_JobTitle').val(''); 
    $('#idvallugEINatureEmplymnt').val(''); 
    $('#descvallugEINatureEmplymnt').val('');
    $('#txt_EI_Years').val(''); 
    $('#txt_EI_Month').val('');
    $('#idvallugEIPosition').val('');
    $('#descvallugEIPosition').val('');
    $('#txt_EI_GrossMnthlyIncm').val('');
    $('#txt_EI_PhoneNo').val('');
    $('#txt_EI_MobileNo').val('');
    $('#txt_EI_EmailAdd').val('');
    $('#idvallugEIBusinessIncSrc').val('');
    $('#descvallugEIBusinessIncSrc').val(''); 

    $('#txt_EI_EmploymentAddress').val('');
    $('#txt_EI_UnitNo').val(''); 
    $('#txt_EI_FloorNo').val(''); 
    $('#txt_EI_BldgNo').val(''); ;
    $('#txt_EI_BldgName').val('');
      
    $('#txt_EI_House').val(''); 
    $('#txt_EI_StreetName').val('');
    $('#txt_EI_Lot').val('');
    $('#txt_EI_Block').val('');
    $('#txt_EI_Phase').val('');
    $('#txt_EI_Subdivision').val('');
    $('#txt_EI_Zone').val('');
    $('#idvallugEIBarangay').val('');
    $('#descvallugEIBarangay').val(''); 
    $('#idvallugEIMunicipality').val(''); 
    $('#descvallugEIMunicipality').val('');
    $('#idvallugEIProvince').val(''); 
    $('#descvallugEIProvince').val(''); 
    $('#idvallugEIRegion').val('');
    $('#descvallugEIRegion').val(''); 
    $('#idvallugEICountry').val(''); 
    $('#descvallugEICountry').val(''); 
    $('#txt_EI_Zone').val('');


    //Business Info
    $('#txt_BI_BusinessName').val('');
    $('#idvallugBIBusinessType').val('');
    $('#descvallugBIBusinessType').val('');
    $('#idvallugBINatureBusiness').val('');
    $('#descvallugBINatureBusiness').val('');
    $('#txt_BI_JobTitle').val('');
    $('#idvallugBIOccptnPositn').val('');
    $('#descvallugBIOccptnPositn').val('');
    $('#txt_BI_Years').val('');
    $('#txt_BI_Month').val('');
    $('#txt_BI_GrossMnthlyIncm').val('');
    $('#idvallugBIMSMETagging').val('');
    $('#descvallugBIMSMETagging').val('');
    $('#txt_BI_TotalAsst').val('');
    $('#idvallugBusinessRgstrtn').val('');
    $('#descvallugBusinessRgstrtn').val('');
    $('#txt_BI_NoEmployee').val('');
    $('#txt_BI_PhoneNo').val('');
    $('#txt_BI_MobileNo').val('');
    $('#txt_BI_EmailAdd').val('');
    $('#idvallugBIBusinessIncSrc').val('');
    $('#descvallugBIBusinessIncSrc').val('');
    // $('#').val('');
    $('#txt_BI_BusinessAddress').val('');
    $('#txt_BI_UnitNo').val('');
    $('#txt_BI_FloorNo').val('');
    $('#txt_BI_BldgNo').val('');
    $('#txt_BI_BldgName').val('');
    $('#txt_BI_Landmark').val('');
    $('#txt_BI_House').val('');
    $('#txt_BI_StreetName').val('');
    $('#txt_BI_Lot').val('');
    $('#txt_BI_Block').val('');
    $('#txt_BI_Phase').val('');
    $('#txt_BI_Subdivision').val('');
    $('#txt_BI_Zone').val('');
    $('#idvallugBIBarangay').val('');
    $('#lugBIBarangay').val('');
    $('#idvallugBIMunicipality').val('');
    $('#descvallugBIMunicipality').val('');
    $('#idvallugBIProvince').val('');
    $('#descvallugBIProvince').val('');

    $('#idvallugBIRegion').val('');
    $('#descvallugBIRegion').val('');
    $('#idvallugBICountry').val(''); 
    $('#descvallugBICountry').val(''); 
    $('#txt_BI_Zip').val(''); 
     
    $('#idvallugSISalutation').val('');
    $('#descvallugSISalutation').val('');
    $('#txt_SI_LastName').val('');
    $('#txt_SI_FirstName').val('');
    $('#txt_SI_MiddleName').val('');
    $('#txt_SI_MothersMaidenName').val('');
    $('#idvallugSINameSuffix').val('');
    $('#descvallugSINameSuffix').val('');
    $('#txt_SI_DateOfBirth').val('');
    $('#idvallugSIGender').val('');
    $('#descvallugSIGender').val('');
    $('#idvallugSIMaritalStatus').val('');
    $('#descvallugSIMaritalStatus').val('');
    $('#idvallugSINationality').val('');
    $('#descvallugSINationality').val('');
    $('#idvallugSIEducAttainment').val('');
    $('#descvallugSIEducAttainment').val('');
    $('#txt_SI_TIN').val('');
    $('#txt_SI_SSS').val('');
    $('#txt_SI_GSIS').val('');
    //$('#cbOpsaDilcoIndv", "prop", "", "#noah-webui-Toolbox-BindingNavigator", "opsadilcoSID');
    //$('#cbIndvPolExpPer", "prop", "", "#noah-webui-Toolbox-BindingNavigator", "politicSID');
    $('#idvallugSIPolExpPer').val('');
    $('#descvallugSIPolExpPer').val('');
    $('#idvallugSIPrimSrcInc').val('');
    $('#descvallugSIPrimSrcInc').val('');

    // Spo Loc
    $('#cbSLISBLI').prop('checked',false);
    $('#cmbLIPrepMail').val('');
    $('#idvallugSLIHomeOwnrshp').val('');
    $('#descvallugSLIHomeOwnrshp').val('');
    $('#cb_SLI_FullAddress').val('');
    $('#txt_SLI_FullAddress').val('');
    $('#txt_SLI_LengthStay').val('');
    $('#txt_SLI_UnitNo').val('');
    $('#txt_SLI_FloorNo').val('');
    $('#txt_SLI_BldgNo').val('');
    $('#txt_SLI_BuildingName').val('');
    $('#txt_SLI_Landmark').val('');
    $('#txt_SLI_HouseNo').val('');
    $('#txt_SLI_StreetName').val('');
    $('#txt_SLI_Lot').val('');
    $('#txt_SLI_Block').val('');
    $('#txt_SLI_Phase').val('');
    $('#txt_SLI_Subdivision').val('');
    $('#txt_SLI_Zone').val('');
    $('#idvallugSLIBarangay').val('');
    $('#descvallugSLIBarangay').val('');
    $('#idvallugSLIMunicipality').val('');
    $('#descvallugSLIMunicipality').val('');
    $('#idvallugSLIProvince').val('');
    $('#descvallugSLIProvince').val('');
    $('#idvallugSLIRegion').val('');
    $('#descvallugSLIRegion').val('');
    $('#idvallugSLICountry').val('');
    $('#descvallugSLICountry').val('');
    $('#txt_SLI_Zip').val('');
    $('#idvallugSLIHomeOwnrshp2').val('');
    $('#descvallugSLIHomeOwnrshp2').val('');
    $('#txt_SLI_FullAddress2').val('');
    $('#txt_SLI_LengthStay2').val('');
    $('#txt_SLI_UnitNo2').val('');
    $('#txt_SLI_FloorNo2').val('');
    $('#txt_SLI_BldgNo2').val('');
    $('#txt_SLI_BuildingName2').val('');
    $('#txt_SLI_Landmark2').val('');
    $('#txt_SLI_HouseNo2').val('');
    $('#txt_SLI_StreetName2').val('');
    $('#txt_SLI_Lot2').val('');
    $('#txt_SLI_Block2').val('');
    $('#txt_SLI_Phase2').val('');
    $('#txt_SLI_Subdivision2').val('');
    $('#txt_SLI_Zone2').val('');
    $('#idvallugSLIBarangay2').val('');
    $('#descvallugSLIBarangay2').val('');
    $('#idvallugSLIMunicipality2').val('');
    $('#descvallugSLIMunicipality2').val('');
    $('#idvallugSLIProvince2').val('');
    $('#descvallugSLIProvince2').val('');
    $('#idvallugSLIRegion2').val('');
    $('#descvallugSLIRegion2').val('');
    $('#idvallugSLICountry2').val('');
    $('#descvallugSLICountry2').val('');
    $('#txt_SLI_Zip2').val('');

    $('#idvallugSISalutation').val('');
    $('#descvallugSISalutation').val('');
    $('#txt_SI_LastName').val('');
    $('#txt_SI_FirstName').val('');
    $('#txt_SI_MiddleName').val('');
    $('#txt_SI_MothersMaidenName').val('');
    $('#idvallugSINameSuffix').val('');
    $('#descvallugSINameSuffix').val('');
    $('#txt_SI_DateOfBirth').val('');
    $('#idvallugSIGender').val('');
    $('#descvallugSIGender').val('');
    $('#idvallugSIMaritalStatus').val('');
    $('#descvallugSIMaritalStatus').val('');
    $('#idvallugSINationality').val('');
    $('#descvallugSINationality').val('');
    $('#idvallugSIEducAttainment').val('');
    $('#descvallugSIEducAttainment').val('');
    $('#txt_SI_TIN').val('');
    $('#txt_SI_SSS').val('');
    $('#txt_SI_GSIS').val('');
    //$('#cbOpsaDilcoIndv", "prop", "", "#noah-webui-Toolbox-BindingNavigator", "opsadilcoSID');
    //$('#cbIndvPolExpPer", "prop", "", "#noah-webui-Toolbox-BindingNavigator", "politicSID');
    $('#idvallugSIPolExpPer').val('');
    $('#descvallugSIPolExpPer').val('');
    $('#idvallugSIPrimSrcInc').val('');
    $('#descvallugSIPrimSrcInc').val('');

    // Spo Loc
    $('#cmbLIPrepMail').val('');
    $('#idvallugSLIHomeOwnrshp').val('');
    $('#descvallugSLIHomeOwnrshp').val('');
    $('#cb_SLI_FullAddress').val('');
    $('#txt_SLI_FullAddress').val('');
    $('#txt_SLI_LengthStay').val('');
    $('#txt_SLI_UnitNo').val('');
    $('#txt_SLI_FloorNo').val('');
    $('#txt_SLI_BldgNo').val('');
    $('#txt_SLI_BuildingName').val('');
    $('#txt_SLI_Landmark').val('');
    $('#txt_SLI_HouseNo').val('');
    $('#txt_SLI_StreetName').val('');
    $('#txt_SLI_Lot').val('');
    $('#txt_SLI_Block').val('');
    $('#txt_SLI_Phase').val('');
    $('#txt_SLI_Subdivision').val('');
    $('#txt_SLI_Zone').val('');
    $('#idvallugSLIBarangay').val('');
    $('#descvallugSLIBarangay').val('');
    $('#idvallugSLIMunicipality').val('');
    $('#descvallugSLIMunicipality').val('');
    $('#idvallugSLIProvince').val('');
    $('#descvallugSLIProvince').val('');
    $('#idvallugSLIRegion').val('');
    $('#descvallugSLIRegion').val('');
    $('#idvallugSLICountry').val('');
    $('#descvallugSLICountry').val('');
    $('#txt_SLI_Zip').val('');
    $('#idvallugSLIHomeOwnrshp2').val('');
    $('#descvallugSLIHomeOwnrshp2').val('');
    $('#txt_SLI_FullAddress2').val('');
    $('#txt_SLI_LengthStay2').val('');
    $('#txt_SLI_UnitNo2').val('');
    $('#txt_SLI_FloorNo2').val('');
    $('#txt_SLI_BldgNo2').val('');
    $('#txt_SLI_BuildingName2').val('');
    $('#txt_SLI_Landmark2').val('');
    $('#txt_SLI_HouseNo2').val('');
    $('#txt_SLI_StreetName2').val('');
    $('#txt_SLI_Lot2').val('');
    $('#txt_SLI_Block2').val('');
    $('#txt_SLI_Phase2').val('');
    $('#txt_SLI_Subdivision2').val('');
    $('#txt_SLI_Zone2').val('');
    $('#idvallugSLIBarangay2').val('');
    $('#descvallugSLIBarangay2').val('');
    $('#idvallugSLIMunicipality2').val('');
    $('#descvallugSLIMunicipality2').val('');
    $('#idvallugSLIProvince2').val('');
    $('#descvallugSLIProvince2').val('');
    $('#idvallugSLIRegion2').val('');
    $('#descvallugSLIRegion2').val('');
    $('#idvallugSLICountry2').val('');
    $('#descvallugSLICountry2').val('');
    $('#txt_SLI_Zip2').val('');


    //Spouse Buss
    $('#idvallugSISalutation').val('');
    $('#descvallugSISalutation').val('');
    $('#txt_SI_LastName').val('');
    $('#txt_SI_FirstName').val('');
    $('#txt_SI_MiddleName').val('');
    $('#txt_SI_MothersMaidenName').val('');
    $('#idvallugSINameSuffix').val('');
    $('#descvallugSINameSuffix').val('');
    $('#txt_SI_DateOfBirth').val('');
    $('#idvallugSIGender').val('');
    $('#descvallugSIGender').val('');
    $('#idvallugSIMaritalStatus').val('');
    $('#descvallugSIMaritalStatus').val('');
    $('#idvallugSINationality').val('');
    $('#descvallugSINationality').val('');
    $('#idvallugSIEducAttainment').val('');
    $('#descvallugSIEducAttainment').val('');
    $('#txt_SI_TIN').val('');
    $('#txt_SI_SSS').val('');
    $('#txt_SI_GSIS').val('');
    //$('#cbOpsaDilcoIndv", "prop", "", "#noah-webui-Toolbox-BindingNavigator", "opsadilcoSID');
    //$('#cbIndvPolExpPer", "prop", "", "#noah-webui-Toolbox-BindingNavigator", "politicSID');
    $('#idvallugSIPolExpPer').val('');
    $('#descvallugSIPolExpPer').val('');
    $('#idvallugSIPrimSrcInc').val('');
    $('#descvallugSIPrimSrcInc').val('');

    // Spo Loc
    $('#cmbLIPrepMail').val('');
    $('#idvallugSLIHomeOwnrshp').val('');
    $('#descvallugSLIHomeOwnrshp').val('');
    $('#cb_SLI_FullAddress').val('');
    $('#txt_SLI_FullAddress').val('');
    $('#txt_SLI_LengthStay').val('');
    $('#txt_SLI_UnitNo').val('');
    $('#txt_SLI_FloorNo').val('');
    $('#txt_SLI_BldgNo').val('');
    $('#txt_SLI_BuildingName').val('');
    $('#txt_SLI_Landmark').val('');
    $('#txt_SLI_HouseNo').val('');
    $('#txt_SLI_StreetName').val('');
    $('#txt_SLI_Lot').val('');
    $('#txt_SLI_Block').val('');
    $('#txt_SLI_Phase').val('');
    $('#txt_SLI_Subdivision').val('');
    $('#txt_SLI_Zone').val('');
    $('#idvallugSLIBarangay').val('');
    $('#descvallugSLIBarangay').val('');
    $('#idvallugSLIMunicipality').val('');
    $('#descvallugSLIMunicipality').val('');
    $('#idvallugSLIProvince').val('');
    $('#descvallugSLIProvince').val('');
    $('#idvallugSLIRegion').val('');
    $('#descvallugSLIRegion').val('');
    $('#idvallugSLICountry').val('');
    $('#descvallugSLICountry').val('');
    $('#txt_SLI_Zip').val('');
    $('#idvallugSLIHomeOwnrshp2').val('');
    $('#descvallugSLIHomeOwnrshp2').val('');
    $('#txt_SLI_FullAddress2').val('');
    $('#txt_SLI_LengthStay2').val('');
    $('#txt_SLI_UnitNo2').val('');
    $('#txt_SLI_FloorNo2').val('');
    $('#txt_SLI_BldgNo2').val('');
    $('#txt_SLI_BuildingName2').val('');
    $('#txt_SLI_Landmark2').val('');
    $('#txt_SLI_HouseNo2').val('');
    $('#txt_SLI_StreetName2').val('');
    $('#txt_SLI_Lot2').val('');
    $('#txt_SLI_Block2').val('');
    $('#txt_SLI_Phase2').val('');
    $('#txt_SLI_Subdivision2').val('');
    $('#txt_SLI_Zone2').val('');
    $('#idvallugSLIBarangay2').val('');
    $('#descvallugSLIBarangay2').val('');
    $('#idvallugSLIMunicipality2').val('');
    $('#descvallugSLIMunicipality2').val('');
    $('#idvallugSLIProvince2').val('');
    $('#descvallugSLIProvince2').val('');
    $('#idvallugSLIRegion2').val('');
    $('#descvallugSLIRegion2').val('');
    $('#idvallugSLICountry2').val('');
    $('#descvallugSLICountry2').val('');
    $('#txt_SLI_Zip2').val('');




    //Co-borrower Loc
    $('#cbCLISBLI').prop('checked', false);
    $('#cmbLIPrepMail').val('');
    $('#idvallugCLIHomeOwnrshp').val('');
    $('#descvallugCLIHomeOwnrshp').val('');
    $('#cb_CLI_FullAddress').val('');
    $('#txt_CLI_FullAddress').val('');
    $('#txt_CLI_LengthStay').val('');
    $('#txt_CLI_UnitNo').val('');
    $('#txt_CLI_FloorNo').val('');
    $('#txt_CLI_BldgNo').val('');
    $('#txt_CLI_BuildingName').val('');
    $('#txt_CLI_Landmark').val('');
    $('#txt_CLI_HouseNo').val('');
    $('#txt_CLI_StreetName').val('');
    $('#txt_CLI_Lot').val('');
    $('#txt_CLI_Block').val('');
    $('#txt_CLI_Phase').val('');
    $('#txt_CLI_Subdivision').val('');
    $('#txt_CLI_Zone').val('');
    $('#idvallugCLIBarangay').val('');
    $('#descvallugCLIBarangay').val('');
    $('#idvallugCLIMunicipality').val('');
    $('#descvallugCLIMunicipality').val('');
    $('#idvallugCLIProvince').val('');
    $('#descvallugCLIProvince').val('');
    $('#idvallugCLIRegion').val('');
    $('#descvallugCLIRegion').val('');
    $('#idvallugCLICountry').val('');
    $('#descvallugCLICountry').val('');
    $('#txt_CLI_Zip').val('');

    $('#idvallugCLIHomeOwnrshp2').val('');
    $('#descvallugCLIHomeOwnrshp2').val('');
    $('#txt_CLI_FullAddress2').val('');
    $('#txt_CLI_LengthStay2').val('');
    $('#txt_CLI_UnitNo2').val('');
    $('#txt_CLI_FloorNo2').val('');
    $('#txt_CLI_BldgNo2').val('');
    $('#txt_CLI_BuildingName2').val('');
    $('#txt_CLI_Landmark2').val('');
    $('#txt_CLI_HouseNo2').val('');
    $('#txt_CLI_StreetName2').val('');
    $('#txt_CLI_Lot2').val('');
    $('#txt_CLI_Block2').val('');
    $('#txt_CLI_Phase2').val('');
    $('#txt_CLI_Subdivision2').val('');
    $('#txt_CLI_Zone2').val('');
    $('#idvallugCLIBarangay2').val('');
    $('#descvallugCLIBarangay2').val('');
    $('#idvallugCLIMunicipality2').val('');
    $('#descvallugCLIMunicipality2').val('');
    $('#idvallugCLIProvince2').val('');
    $('#descvallugCLIProvince2').val('');
    $('#idvallugCLIRegion2').val('');
    $('#descvallugCLIRegion2').val('');
    $('#idvallugCLICountry2').val('');
    $('#descvallugCLICountry2').val('');
    $('#txt_CLI_Zip2').val('');

    //$('#chkSamePresentAdd", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "permatagsamechk");
    //$('#cbFullAddress2", "prop", "checked", "#noah-webui-Toolbox-BindingNavigator", "permafulladdresstagchk");
    //PERMANENT

    //Spouse Emp
    $('#idvallugCEIEmploymentType').val('');
    $('#descvallugCEIEmploymentType').val('');
    $('#txt_CEI_EmployerName').val('');
    $('#idvallugCEIEmploymentStatus').val('');
    $('#descvallugCEIEmploymentStatus').val('');
    $('#txt_CEI_JobTitle').val('');
    $('#idvallugCEINatureEmplymnt').val('');
    $('#descvallugCEINatureEmplymnt').val('');
    $('#txt_CEI_Years').val('');
    $('#txt_CEI_Month').val('');
    $('#idvallugCEIPosition').val('');
    $('#descvallugCEIPosition').val('');
    $('#txt_CEI_GrossMnthlyIncm').val('');
    $('#txt_CEI_PhoneNo').val('');
    $('#txt_CEI_MobileNo').val('');
    $('#txt_CEI_EmailAdd').val('');
    $('#idvallugCEIBusinessIncSrc').val('');
    $('#descvallugCEIBusinessIncSrc').val('');
    //$('#').val('');
    $('#txt_CEI_EmploymentAddress').val('');
    $('#txt_CEI_UnitNo').val('');
    $('#txt_CEI_FloorNo').val('');
    $('#txt_CEI_BldgNo').val('');
    $('#txt_CEI_BldgName').val('');
    //$('#').val('');
    $('#txt_CEI_House').val('');
    $('#txt_CEI_StreetName').val('');
    $('#txt_CEI_Lot').val('');
    $('#txt_CEI_Block').val('');
    $('#txt_CEI_Phase').val('');
    $('#txt_CEI_Subdivision').val('');
    $('#txt_CEI_Zone').val('');
    $('#idvallugCEIBarangay').val('');
    $('#descvallugCEIBarangay').val('');
    $('#idvallugCEIMunicipality').val('');
    $('#descvallugCEIMunicipality').val('');
    $('#idvallugCEIProvince').val('');
    $('#descvallugCEIProvince').val('');
    $('#idvallugCEIRegion').val('');
    $('#descvallugCEIRegion').val('');
    $('#idvallugCEICountry').val('');
    $('#descvallugCEICountry').val('');
    $('#txt_CEI_Zone').val('');

    $('#txt_CBI_BusinessName').val('');
    $('#idvallugCBIBusinessType').val('');
    $('#descvallugCBIBusinessType').val('');
    $('#idvallugCBINatureBusiness').val('');
    $('#descvallugCBINatureBusiness').val('');
    $('#txt_CBI_JobTitle').val('');
    $('#idvallugCBIOccptnPositn').val('');
    $('#descvallugCBIOccptnPositn').val('');
    $('#txt_CBI_Years').val('');
    $('#txt_CBI_Month').val('');
    $('#txt_CBI_GrossMnthlyIncm').val('');
    $('#idvallugCBIMSMETagging').val('');
    $('#descvallugCBIMSMETagging').val('');
    $('#txt_CBI_TotalAsst').val('');
    $('#idvallugBusinessRgstrtn').val('');
    $('#descvallugBusinessRgstrtn').val('');
    $('#txt_CBI_NoEmployee').val('');
    $('#txt_CBI_PhoneNo').val('');
    $('#txt_CBI_MobileNo').val('');
    $('#txt_CBI_EmailAdd').val('');
    $('#idvallugCBIBusinessIncSrc').val('');
    $('#descvallugCBIBusinessIncSrc').val('');
    //$('#').val('');
    $('#txt_CBI_BusinessAddress').val('');
    $('#txt_CBI_UnitNo').val('');
    $('#txt_CBI_FloorNo').val('');
    $('#txt_CBI_BldgNo').val('');
    $('#txt_CBI_BldgName').val('');
    $('#txt_CBI_Landmark').val('');
    $('#txt_CBI_House').val('');
    $('#txt_CBI_StreetName').val('');
    $('#txt_CBI_Lot').val('');
    $('#txt_CBI_Block').val('');
    $('#txt_CBI_Phase').val('');
    $('#txt_CBI_Subdivision').val('');
    $('#txt_CBI_Zone').val('');
    $('#idvallugCBIBarangay').val('');
    $('#lugCBIBarangay').val('');
    $('#idvallugCBIMunicipality').val('');
    $('#descvallugCBIMunicipality').val('');
    $('#idvallugCBIProvince').val('');
    $('#descvallugCBIProvince').val('');
    $('#idvallugCBIRegion').val('');
    $('#descvallugCBIRegion').val('');
    $('#idvallugCBICountry').val('');
    $('#descvallugCBICountry').val('');
    $('#txt_CBI_Zip').val('');


    //

    $('#cmbSigLIPrepMail').val('');
    $('#idvallugSigLIHomeOwnrshp').val('');
    $('#descvallugSigLIHomeOwnrshp').val('');
    $('#cb_SigLI_FullAddress').val('');
    $('#txt_SigLI_FullAddress').val('');
    $('#txt_SigLI_LengthStay').val('');
    $('#txt_SigLI_UnitNo').val('');
    $('#txt_SigLI_FloorNo').val('');
    $('#txt_SigLI_BldgNo').val('');
    $('#txt_SigLI_BuildingName').val('');
    $('#txt_SigLI_Landmark').val('');
    $('#txt_SigLI_HouseNo').val('');
    $('#txt_SigLI_StreetName').val('');
    $('#txt_SigLI_Lot').val('');
    $('#txt_SigLI_Block').val('');
    $('#txt_SigLI_Phase').val('');
    $('#txt_SigLI_Subdivision').val('');
    $('#txt_SigLI_Zone').val('');
    $('#idvallugSigLIBarangay').val('');
    $('#descvallugSigLIBarangay').val('');
    $('#idvallugSigLIMunicipality').val('');
    $('#descvallugSigLIMunicipality').val('');
    $('#idvallugSigLIProvince').val('');
    $('#descvallugSigLIProvince').val('');
    $('#idvallugSigLIRegion').val('');
    $('#descvallugSigLIRegion').val('');
    $('#idvallugSigLICountry').val('');
    $('#descvallugSigLICountry').val('');
    $('#txt_SigLI_Zip').val('');

    $('#idvallugSigLIHomeOwnrshp2').val('');
    $('#descvallugSigLIHomeOwnrshp2').val('');
    $('#txt_SigLI_FullAddress2').val('');
    $('#txt_SigLI_LengthStay2').val('');
    $('#txt_SigLI_UnitNo2').val('');
    $('#txt_SigLI_FloorNo2').val('');
    $('#txt_SigLI_BldgNo2').val('');
    $('#txt_SigLI_BuildingName2').val('');
    $('#txt_SigLI_Landmark2').val('');
    $('#txt_SigLI_HouseNo2').val('');
    $('#txt_SigLI_StreetName2').val('');
    $('#txt_SigLI_Lot2').val('');
    $('#txt_SigLI_Block2').val('');
    $('#txt_SigLI_Phase2').val('');
    $('#txt_SigLI_Subdivision2').val('');
    $('#txt_SigLI_Zone2').val('');
    $('#idvallugSigLIBarangay2').val('');
    $('#descvallugSigLIBarangay2').val('');
    $('#idvallugSigLIMunicipality2').val('');
    $('#descvallugSigLIMunicipality2').val('');
    $('#idvallugSigLIProvince2').val('');
    $('#descvallugSigLIProvince2').val('');
    $('#idvallugSigLIRegion2').val('');
    $('#descvallugSigLIRegion2').val('');
    $('#idvallugSigLICountry2').val('');
    $('#descvallugSigLICountry2').val('');
    $('#txt_SigLI_Zip2').val('');

    $('#idvallugSigEIEmploymentType').val('');
    $('#descvallugSigEIEmploymentType').val('');
    $('#txt_SigEI_EmployerName').val('');
    $('#idvallugSigEIEmploymentStatus').val('');
    $('#descvallugSigEIEmploymentStatus').val('');
    $('#idvallugSigEIPosition').val('');
    $('#descvallugSigEIPosition').val('');
    
    
    $('#txt_SigEI_JobTitle').val('');
    $('#idvallugSigEINatureEmplymnt').val('');
    $('#descvallugSigEINatureEmplymnt').val('');
    $('#txt_SigEI_Years').val('');
    $('#txt_SigEI_Month').val('');
    $('#idvallugSigEIPosition').val('');
    $('#descvallugSigEIPosition').val('');
    $('#txt_SigEI_GrossMnthlyIncm').val('');
    $('#txt_SigEI_PhoneNo').val('');
    $('#txt_SigEI_MobileNo').val('');
    $('#txt_SigEI_EmailAdd').val('');
    $('#idvallugSigEIBusinessIncSrc').val('');
    $('#descvallugSigEIBusinessIncSrc').val('');
    //$('#').val('');
    $('#txt_SigEI_EmploymentAddress').val('');
    $('#txt_SigEI_UnitNo').val('');
    $('#txt_SigEI_FloorNo').val('');
    $('#txt_SigEI_BldgNo').val('');
    $('#txt_SigEI_BldgName').val('');
    //$('#').val('');
    $('#txt_SigEI_House').val('');
    $('#txt_SigEI_StreetName').val('');
    $('#txt_SigEI_Lot').val('');
    $('#txt_SigEI_Block').val('');
    $('#txt_SigEI_Phase').val('');
    $('#txt_SigEI_Subdivision').val('');
    $('#txt_SigEI_Zone').val('');
    $('#idvallugSigEIBarangay').val('');
    $('#descvallugSigEIBarangay').val('');
    $('#idvallugSigEIMunicipality').val('');
    $('#descvallugSigEIMunicipality').val('');
    $('#idvallugSigEIProvince').val('');
    $('#descvallugSigEIProvince').val('');
    $('#idvallugSigEIRegion').val('');
    $('#descvallugSigEIRegion').val('');
    $('#idvallugSigEICountry').val('');
    $('#descvallugSigEICountry').val('');
    $('#txt_SigEI_Zip').val('');

    $('#cmbSigLIPrepMail').val('');
    $('#idvallugSigLIHomeOwnrshp').val('');
    $('#descvallugSigLIHomeOwnrshp').val('');
    $('#cb_SigLI_FullAddress').val('');
    $('#txt_SigLI_FullAddress').val('');
    $('#txt_SigLI_LengthStay').val('');
    $('#txt_SigLI_UnitNo').val('');
    $('#txt_SigLI_FloorNo').val('');
    $('#txt_SigLI_BldgNo').val('');
    $('#txt_SigLI_BuildingName').val('');
    $('#txt_SigLI_Landmark').val('');
    $('#txt_SigLI_HouseNo').val('');
    $('#txt_SigLI_StreetName').val('');
    $('#txt_SigLI_Lot').val('');
    $('#txt_SigLI_Block').val('');
    $('#txt_SigLI_Phase').val('');
    $('#txt_SigLI_Subdivision').val('');
    $('#txt_SigLI_Zone').val('');
    $('#idvallugSigLIBarangay').val('');
    $('#descvallugSigLIBarangay').val('');
    $('#idvallugSigLIMunicipality').val('');
    $('#descvallugSigLIMunicipality').val('');
    $('#idvallugSigLIProvince').val('');
    $('#descvallugSigLIProvince').val('');
    $('#idvallugSigLIRegion').val('');
    $('#descvallugSigLIRegion').val('');
    $('#idvallugSigLICountry').val('');
    $('#descvallugSigLICountry').val('');
    $('#txt_SigLI_Zip').val('');

    $('#idvallugSigLIHomeOwnrshp2').val('');
    $('#descvallugSigLIHomeOwnrshp2').val('');
    $('#txt_SigLI_FullAddress2').val('');
    $('#txt_SigLI_LengthStay2').val('');
    $('#txt_SigLI_UnitNo2').val('');
    $('#txt_SigLI_FloorNo2').val('');
    $('#txt_SigLI_BldgNo2').val('');
    $('#txt_SigLI_BuildingName2').val('');
    $('#txt_SigLI_Landmark2').val('');
    $('#txt_SigLI_HouseNo2').val('');
    $('#txt_SigLI_StreetName2').val('');
    $('#txt_SigLI_Lot2').val('');
    $('#txt_SigLI_Block2').val('');
    $('#txt_SigLI_Phase2').val('');
    $('#txt_SigLI_Subdivision2').val('');
    $('#txt_SigLI_Zone2').val('');
    $('#idvallugSigLIBarangay2').val('');
    $('#descvallugSigLIBarangay2').val('');
    $('#idvallugSigLIMunicipality2').val('');
    $('#descvallugSigLIMunicipality2').val('');
    $('#idvallugSigLIProvince2').val('');
    $('#descvallugSigLIProvince2').val('');
    $('#idvallugSigLIRegion2').val('');
    $('#descvallugSigLIRegion2').val('');
    $('#idvallugSigLICountry2').val('');
    $('#descvallugSigLICountry2').val('');
    $('#txt_SigLI_Zip2').val('');

    $('#idvallugSigEIEmploymentType').val('');
    $('#descvallugSigEIEmploymentType').val('');
    $('#txt_SigEI_EmployerName').val('');
    $('#idvallugSigEIEmploymentStatus').val('');
    $('#descvallugSigEIEmploymentStatus').val('');
    $('#txt_SigEI_JobTitle').val('');
    $('#idvallugSigEINatureEmplymnt').val('');
    $('#descvallugSigEINatureEmplymnt').val('');
    $('#txt_SigEI_Years').val('');
    $('#txt_SigEI_Month').val('');
    $('#idvallugSigEIPosition').val('');
    $('#descvallugSigEIPosition').val('');
    $('#txt_SigEI_GrossMnthlyIncm').val('');
    $('#txt_SigEI_PhoneNo').val('');
    $('#txt_SigEI_MobileNo').val('');
    $('#txt_SigEI_EmailAdd').val('');
    $('#idvallugSigEIBusinessIncSrc').val('');
    $('#descvallugSigEIBusinessIncSrc').val('');
    //$('#').val('');
    $('#txt_SigEI_EmploymentAddress').val('');
    $('#txt_SigEI_UnitNo').val('');
    $('#txt_SigEI_FloorNo').val('');
    $('#txt_SigEI_BldgNo').val('');
    $('#txt_SigEI_BldgName').val('');
    //$('#').val('');
    $('#txt_SigEI_House').val('');
    $('#txt_SigEI_StreetName').val('');
    $('#txt_SigEI_Lot').val('');
    $('#txt_SigEI_Block').val('');
    $('#txt_SigEI_Phase').val('');
    $('#txt_SigEI_Subdivision').val('');
    $('#txt_SigEI_Zone').val('');
    $('#idvallugSigEIBarangay').val('');
    $('#descvallugSigEIBarangay').val('');
    $('#idvallugSigEIMunicipality').val('');
    $('#descvallugSigEIMunicipality').val('');
    $('#idvallugSigEIProvince').val('');
    $('#descvallugSigEIProvince').val('');
    $('#idvallugSigEIRegion').val('');
    $('#descvallugSigEIRegion').val('');
    $('#idvallugSigEICountry').val('');
    $('#descvallugSigEICountry').val('');
    $('#txt_SigEI_Zip').val('');

    $('#txt_SigBI_BusinessName').val('');
    $('#idvallugSigBIBusinessType').val('');
    $('#descvallugSigBIBusinessType').val('');
    $('#idvallugSigBINatureBusiness').val('');
    $('#descvallugSigBINatureBusiness').val('');
    $('#txt_SigBI_JobTitle').val('');
    $('#idvallugSigBIOccptnPositn').val('');
    $('#descvallugSigBIOccptnPositn').val('');
    $('#txt_SigBI_Years').val('');
    $('#txt_SigBI_Month').val('');
    $('#txt_SigBI_GrossMnthlyIncm').val('');
    $('#idvallugSigBIMSMETagging').val('');
    $('#descvallugSigBIMSMETagging').val('');
    $('#txt_SigBI_TotalAsst').val('');
    $('#idvallugBusinessRgstrtn').val('');
    $('#descvallugBusinessRgstrtn').val('');
    $('#txt_SigBI_NoEmployee').val('');
    $('#txt_SigBI_PhoneNo').val('');
    $('#txt_SigBI_MobileNo').val('');
    $('#txt_SigBI_EmailAdd').val('');
    $('#idvallugSigBIBusinessIncSrc').val('');
    $('#descvallugSigBIBusinessIncSrc').val('');
    //$('#').val('');
    $('#txt_SigBI_BusinessAddress').val('');
    $('#txt_SigBI_UnitNo').val('');
    $('#txt_SigBI_FloorNo').val('');
    $('#txt_SigBI_BldgNo').val('');
    $('#txt_SigBI_BldgName').val('');
    //$('#').val('');
    $('#txt_SigBI_House').val('');
    $('#txt_SigBI_StreetName').val('');
    $('#txt_SigBI_Lot').val('');
    $('#txt_SigBI_Block').val('');
    $('#txt_SigBI_Phase').val('');
    $('#txt_SigBI_Subdivision').val('');
    $('#txt_SigBI_Zone').val('');
    $('#idvallugSigBIBarangay').val('');
    $('#lugSigBIBarangay').val('');
    $('#idvallugSigBIMunicipality').val('');
    $('#descvallugSigBIMunicipality').val('');
    $('#idvallugSigBIProvince').val('');
    $('#descvallugSigBIProvince').val('');

    $('#idvallugSigBIRegion').val('');
    $('#descvallugSigBIRegion').val('');
    $('#idvallugSigBICountry').val('');
    $('#descvallugSigBICountry').val('');
    $('#txt_SigBI_Zip').val('');

    $('#txt_OBI_StatmntDate').val('');
    $('#txt_OBI_NoMthsFinYear').val('');
    $('#txt_OBI_AuditQlity').val('');
    $('#txt_OBI_Currency').val('');

    $('#idvallugOBICurrency').val('');
    $('#descvallugOBICurrency').val('');

    $('#txt_OBI_BusinessRgstrtn').val('');
    $('#txt_OBI_NoEmp').val('');
    $('#txt_OBI_Land').val('');
    $('#txt_OBI_FinanclStatemnt').val('');
    $('#txt_OBI_TotalAssets').val('');
    $('#txt_OBI_TotalLbts').val('');
    $('#txt_OBI_Equity').val('');
    $('#txt_OBI_Revenue').val('');
    $('#txt_OBI_TotalExps').val('');
    $('#txt_OBI_NetProfit').val('');
    $('#txt_EI_Zip').val('');
    $('#txt_ID_MothersMaidenName').val(''); 
    $('#txt_ID_PlaceOfBirth').val(''); 
    $('#txt_CEI_Zip').val(''); 
    $('#descvallugLIBarangay').val(''); 
    $('#descvallugLIMunicipality').val(''); 
    $('#descvallugLIProvince').val(''); 
    $('#descvallugLIRegion').val(''); 
    $('#descvallugLICountry').val(''); 
    $('#descvallugCBIBarangay').val(''); 
    $('#txtDependentsInfo').val(''); 
    $('#descvallugBIBarangay').val(''); 
    $('#txt_SI_PlaceOfBirth').val(''); 

    $('#descvallugNationality').val('');
    $('#txt_SBI_BusinessName').val(''); 
    $('#idvallugSBIBusinessType').val(''); 
    $('#descvallugSBIBusinessType').val(''); 
    $('#idvallugSBINatureBusiness').val(''); 
    $('#descvallugSBINatureBusiness').val(''); 
    $('#txt_SBI_JobTitle').val('');
    $('#idvallugSBIOccptnPositn').val('');
    $('#descvallugSBIOccptnPositn').val(''); 
    $('#txt_SBI_Years').val('');
    $('#txt_SBI_Month').val(''); 
    $('#txt_SBI_GrossMnthlyIncm').val(''); 
    $('#idvallugSBIMSMETagging').val(''); 
    $('#descvallugSBIMSMETagging').val('');
    $('#txt_SBI_TotalAsst').val(''); 
    $('#idvallugBusinessRgstrtn').val('');
    $('#descvallugBusinessRgstrtn').val(''); 
    $('#txt_SBI_NoEmployee').val('');
    $('#txt_SBI_PhoneNo').val('');
    $('#txt_SBI_MobileNo').val('');
    $('#txt_SBI_EmailAdd').val(''); 
    $('#idvallugSBIBusinessIncSrc').val(''); 
    $('#descvallugSBIBusinessIncSrc').val('');
    $('#txt_SBI_BusinessAddress').val('');
    $('#txt_SBI_UnitNo').val('');
    $('#txt_SBI_FloorNo').val('');
    $('#txt_SBI_BldgNo').val(''); 
    $('#txt_SBI_BldgName').val('');
    $('#txt_SBI_Landmark').val(''); 
    $('#txt_SBI_House').val('');
    $('#txt_SBI_StreetName').val('');
    $('#txt_SBI_Lot').val('');
    $('#txt_SBI_Block').val(''); 
    $('#txt_SBI_Phase').val('');
    $('#txt_SBI_Subdivision').val('');
    $('#txt_SBI_Zone').val(''); 
    $('#idvallugSBIBarangay').val('');
    $('#descvallugSBIBarangay').val(''); 
    $('#idvallugSBIMunicipality').val(''); 
    $('#descvallugSBIMunicipality').val('');
    $('#idvallugSBIProvince').val(''); 
    $('#descvallugSBIProvince').val('');

    $('#idvallugSBIRegion').val(''); 
    $('#descvallugSBIRegion').val(''); 
    $('#idvallugSBICountry').val('');
    $('#descvallugSBICountry').val('');
    $('#txt_SBI_Zip').val(''); 

    $('#descvallugLIHomeOwnrshp').val('');
    $('#idvallugSEIEmploymentType').val(''); 
    $('#descvallugSEIEmploymentType').val(''); 
    $('#txt_SEI_EmployerName').val(''); 
    $('#idvallugSEIEmploymentStatus').val('');
    $('#descvallugSEIEmploymentStatus').val(''); 
    $('#txt_SEI_JobTitle').val(''); 
    $('#idvallugSEINatureEmplymnt').val('');
    $('#descvallugSEINatureEmplymnt').val(''); 
    $('#txt_SEI_Years').val(''); 
    $('#txt_SEI_Month').val('');
    $('#idvallugSEIPosition').val(''); 
    $('#descvallugSEIPosition').val(''); 
    $('#txt_SEI_GrossMnthlyIncm').val(''); 
    $('#txt_SEI_PhoneNo').val(''); 
    $('#txt_SEI_MobileNo').val(''); 
    $('#txt_SEI_EmailAdd').val(''); 
    $('#idvallugSEIBusinessIncSrc').val(''); 
    $('#descvallugSEIBusinessIncSrc').val(''); 
    $('#txt_SEI_EmploymentAddress').val(''); 
    $('#txt_SEI_UnitNo').val('');
    $('#txt_SEI_FloorNo').val('');
    $('#txt_SEI_BldgNo').val(''); 
    $('#txt_SEI_BldgName').val('');
    $('#txt_SEI_House').val(''); 
    $('#txt_SEI_StreetName').val(''); 
    $('#txt_SEI_Lot').val(''); 
    $('#txt_SEI_Block').val(''); 
    $('#txt_SEI_Phase').val('');
    $('#txt_SEI_Subdivision').val(''); 
    $('#txt_SEI_Zone').val(''); 
    $('#idvallugSEIBarangay').val(''); 
    $('#descvallugSEIBarangay').val(''); 
    $('#idvallugSEIMunicipality').val(''); 
    $('#descvallugSEIMunicipality').val(''); 
    $('#idvallugSEIProvince').val('');
    $('#descvallugSEIProvince').val(''); 
    $('#idvallugSEIRegion').val(''); 
    $('#descvallugSEIRegion').val(''); 
    $('#idvallugSEICountry').val('');
    $('#descvallugSEICountry').val(''); 
    $('#txt_SEI_Zip').val('');

    $('#txt_LI_Remarks').val('');
    $('#txt_LI_Remarks2').val('');
    $('#txt_EI_Remarks').val('');
    $('#txt_BI_Remarks').val('');
    $('#txt_SLI_Remarks').val('');
    $('#txt_SLI_Remarks2').val('');
    $('#txt_SEI_Remarks').val('');
    $('#txt_SBI_Remarks').val('');
    $('#txt_CLI_Remarks').val('');
    $('#txt_CLI_Remarks2').val('');
    $('#txt_CEI_Remarks').val('');
    $('#txt_CBI_Remarks').val('');
    $('#txt_SigLI_Remarks').val('');
    $('#txt_SigLI_Remarks2').val('');
    $('#txt_SigEI_Remarks').val('');
    $('#txt_SigBI_Remarks').val('');

}


function removeDataBorLoc() {
    $('#cmbLIPrepMail').val('');
    $('#idvallugCLIHomeOwnrshp').val('');
    $('#descvallugCLIHomeOwnrshp').val('');
    $('#cb_CLI_FullAddress').val('');
    $('#txt_CLI_FullAddress').val('');
    $('#txt_CLI_LengthStay').val('');
    $('#txt_CLI_UnitNo').val('');
    $('#txt_CLI_FloorNo').val('');
    $('#txt_CLI_BldgNo').val('');
    $('#txt_CLI_BuildingName').val('');
    $('#txt_CLI_Landmark').val('');
    $('#txt_CLI_HouseNo').val('');
    $('#txt_CLI_StreetName').val('');
    $('#txt_CLI_Lot').val('');
    $('#txt_CLI_Block').val('');
    $('#txt_CLI_Phase').val('');
    $('#txt_CLI_Subdivision').val('');
    $('#txt_CLI_Zone').val('');
    $('#idvallugCLIBarangay').val('');
    $('#descvallugCLIBarangay').val('');
    $('#idvallugCLIMunicipality').val('');
    $('#descvallugCLIMunicipality').val('');
    $('#idvallugCLIProvince').val('');
    $('#descvallugCLIProvince').val('');
    $('#idvallugCLIRegion').val('');
    $('#descvallugCLIRegion').val('');
    $('#idvallugCLICountry').val('');
    $('#descvallugCLICountry').val('');
    $('#txt_CLI_Zip').val('');

    $('#idvallugCLIHomeOwnrshp2').val('');
    $('#descvallugCLIHomeOwnrshp2').val('');
    $('#txt_CLI_FullAddress2').val('');
    $('#txt_CLI_LengthStay2').val('');
    $('#txt_CLI_UnitNo2').val('');
    $('#txt_CLI_FloorNo2').val('');
    $('#txt_CLI_BldgNo2').val('');
    $('#txt_CLI_BuildingName2').val('');
    $('#txt_CLI_Landmark2').val('');
    $('#txt_CLI_HouseNo2').val('');
    $('#txt_CLI_StreetName2').val('');
    $('#txt_CLI_Lot2').val('');
    $('#txt_CLI_Block2').val('');
    $('#txt_CLI_Phase2').val('');
    $('#txt_CLI_Subdivision2').val('');
    $('#txt_CLI_Zone2').val('');
    $('#idvallugCLIBarangay2').val('');
    $('#descvallugCLIBarangay2').val('');
    $('#idvallugCLIMunicipality2').val('');
    $('#descvallugCLIMunicipality2').val('');
    $('#idvallugCLIProvince2').val('');
    $('#descvallugCLIProvince2').val('');
    $('#idvallugCLIRegion2').val('');
    $('#descvallugCLIRegion2').val('');
    $('#idvallugCLICountry2').val('');
    $('#descvallugCLICountry2').val('');
    $('#txt_CLI_Zip2').val('');

    $('#txt_CLI_Remarks').val('');
    $('#txt_CLI_Remarks2').val('');
}

function removeDataBorrEmp() {
    $('#descvallugCEIEmploymentStatus').val('');
    $('#descvallugCEINatureEmplymnt').val('');
    $('#descvallugCEIPosition').val('');
    $('#descvallugCEICountry').val('');

    $('#idvallugCEIEmploymentType').val('');
    $('#descvallugCEIEmploymentType').val('');
    $('#txt_CEI_EmployerName').val('');
    $('#idvallugCEIEmploymentStatus').val('');
    $('#idvallugCEIEmploymentStatus').val('');
    $('#txt_CEI_JobTitle').val('');
    $('#idvallugCEINatureEmplymnt').val('');
    $('#txt_CEI_Years').val('');
    $('#txt_CEI_Month').val('');
    $('#idvallugCEIPosition').val('');
    $('#txt_CEI_GrossMnthlyIncm').val('');
    $('#txt_CEI_PhoneNo').val('');
    $('#txt_CEI_MobileNo').val('');
    $('#txt_CEI_EmailAdd').val('');
    $('#idvallugCEIBusinessIncSrc').val('');
    $('#descvallugCEIBusinessIncSrc').val('');
    $('#txt_CEI_EmploymentAddress').val('');
    $('#txt_CEI_UnitNo').val('');
    $('#txt_CEI_FloorNo').val('');
    $('#txt_CEI_BldgNo').val('');
    $('#txt_CEI_BldgName').val('');
    $('#txt_CEI_House').val('');
    $('#txt_CEI_StreetName').val('');
    $('#txt_CEI_Lot').val('');
    $('#txt_CEI_Block').val('');
    $('#txt_CEI_Phase').val('');
    $('#txt_CEI_Subdivision').val('');
    $('#txt_CEI_Zone').val('');
    $('#idvallugCEIBarangay').val('');
    $('#descvallugCEIBarangay').val('');
    $('#idvallugCEIMunicipality').val('');
    $('#descvallugCEIMunicipality').val('');
    $('#idvallugCEIProvince').val('');
    $('#descvallugCEIProvince').val('');
    $('#idvallugCEIRegion').val('');
    $('#descvallugCEIRegion').val('');
    $('#idvallugCEICountry').val('');
    $('#descvallugCEIRegion').val('');
    $('#txt_CEI_Zip').val('');

    $('#txt_CEI_Remarks').val('');
} 

function removeDataBorrBuss() {
    $('#txt_CBI_BusinessName').val('');
    $('#idvallugCBIBusinessType').val('');
    $('#descvallugCBIBusinessType').val('');
    $('#idvallugCBINatureBusiness').val('');
    $('#descvallugCBINatureBusiness').val('');
    $('#txt_CBI_JobTitle').val('');
    $('#idvallugCBIOccptnPositn').val('');
    $('#descvallugCBIOccptnPositn').val('');
    $('#txt_CBI_Years').val('');
    $('#txt_CBI_Month').val('');
    $('#txt_CBI_PhoneNo').val('');
    $('#txt_CBI_MobileNo').val('');
    $('#txt_CBI_EmailAdd').val('');
    $('#idvallugCBIBusinessIncSrc').val('');
    $('#descvallugCBIBusinessIncSrc').val('');
    $('#txt_CBI_BusinessAddress').val('');
    $('#txt_CBI_UnitNo').val('');
    $('#txt_CBI_FloorNo').val('');
    $('#txt_CBI_BldgNo').val('');
    $('#txt_CBI_BldgName').val('');
    $('#txt_CBI_House').val('');
    $('#txt_CBI_StreetName').val('');
    $('#txt_CBI_Lot').val('');
    $('#txt_CBI_Block').val('');
    $('#txt_CBI_Phase').val('');
    $('#txt_CBI_Subdivision').val('');
    $('#txt_CBI_Zone').val('');
    $('#idvallugCBIBarangay').val('');
    $('#descvallugCBIBarangay').val('');
    $('#idvallugCBIMunicipality').val('');
    $('#descvallugCBIMunicipality').val('');
    $('#idvallugCBIProvince').val('');
    $('#descvallugCBIProvince').val('');
    $('#idvallugCBIRegion').val('');
    $('#descvallugCBIRegion').val('');
    $('#idvallugCBICountry').val('');
    $('#descvallugCBIRegion').val('');
    $('#txt_CBI_Zip').val('');

    $('#txt_CBI_GrossMnthlyIncm').val('');
    $('#descvallugCBICountry').val('');

    $('#txt_CBI_Remarks').val('');
}

function removeDataSigLoc() {
    $('#cmbSigLIPrepMail').val('');
    $('#idvallugSigLIHomeOwnrshp').val('');
    $('#descvallugSigLIHomeOwnrshp').val('');
    $('#cb_SigLI_FullAddress').val('');
    $('#txt_SigLI_FullAddress').val('');
    $('#txt_SigLI_LengthStay').val('');
    $('#txt_SigLI_UnitNo').val('');
    $('#txt_SigLI_FloorNo').val('');
    $('#txt_SigLI_BldgNo').val('');
    $('#txt_SigLI_BuildingName').val('');
    $('#txt_SigLI_Landmark').val('');
    $('#txt_SigLI_HouseNo').val('');
    $('#txt_SigLI_StreetName').val('');
    $('#txt_SigLI_Lot').val('');
    $('#txt_SigLI_Block').val('');
    $('#txt_SigLI_Phase').val('');
    $('#txt_SigLI_Subdivision').val('');
    $('#txt_SigLI_Zone').val('');
    $('#idvallugSigLIBarangay').val('');
    $('#descvallugSigLIBarangay').val('');
    $('#idvallugSigLIMunicipality').val('');
    $('#descvallugSigLIMunicipality').val('');
    $('#idvallugSigLIProvince').val('');
    $('#descvallugSigLIProvince').val('');
    $('#idvallugSigLIRegion').val('');
    $('#descvallugSigLIRegion').val('');
    $('#idvallugSigLICountry').val('');
    $('#descvallugSigLICountry').val('');
    $('#txt_SigLI_Zip').val('');

    $('#idvallugSigLIHomeOwnrshp2').val('');
    $('#descvallugSigLIHomeOwnrshp2').val('');
    $('#txt_SigLI_FullAddress2').val('');
    $('#txt_SigLI_LengthStay2').val('');
    $('#txt_SigLI_UnitNo2').val('');
    $('#txt_SigLI_FloorNo2').val('');
    $('#txt_SigLI_BldgNo2').val('');
    $('#txt_SigLI_BuildingName2').val('');
    $('#txt_SigLI_Landmark2').val('');
    $('#txt_SigLI_HouseNo2').val('');
    $('#txt_SigLI_StreetName2').val('');
    $('#txt_SigLI_Lot2').val('');
    $('#txt_SigLI_Block2').val('');
    $('#txt_SigLI_Phase2').val('');
    $('#txt_SigLI_Subdivision2').val('');
    $('#txt_SigLI_Zone2').val('');
    $('#idvallugSigLIBarangay2').val('');
    $('#descvallugSigLIBarangay2').val('');
    $('#idvallugSigLIMunicipality2').val('');
    $('#descvallugSigLIMunicipality2').val('');
    $('#idvallugSigLIProvince2').val('');
    $('#descvallugSigLIProvince2').val('');
    $('#idvallugSigLIRegion2').val('');
    $('#descvallugSigLIRegion2').val('');
    $('#idvallugSigLICountry2').val('');
    $('#descvallugSigLICountry2').val('');
    $('#txt_SigLI_Zip2').val('');

    $('#txt_SigLI_Remarks').val('');
    $('#txt_SigLI_Remarks2').val('');
}

function removeDataSigEmp() {
    $('#descvallugSigEIEmploymentStatus').val('');
    $('#descvallugSigEINatureEmplymnt').val('');
    $('#descvallugSigEIPosition').val('');
    $('#descvallugSigEICountry').val('');


    $('#idvallugSigEIEmploymentType').val('');
    $('#descvallugSigEIEmploymentType').val('');
    $('#txt_SigEI_EmployerName').val('');
    $('#idvallugSigEIEmploymentStatus').val('');
    $('#idvallugSigEIEmploymentStatus').val('');
    $('#txt_SigEI_JobTitle').val('');
    $('#idvallugSigEINatureEmplymnt').val('');
    $('#txt_SigEI_Years').val('');
    $('#txt_SigEI_Month').val('');
    $('#idvallugSigEIPosition').val('');
    $('#txt_SigEI_GrossMnthlyIncm').val('');
    $('#txt_SigEI_PhoneNo').val('');
    $('#txt_SigEI_MobileNo').val('');
    $('#txt_SigEI_EmailAdd').val('');
    $('#idvallugSigEIBusinessIncSrc').val('');
    $('#descvallugSigEIBusinessIncSrc').val('');
    $('#txt_SigEI_EmploymentAddress').val('');
    $('#txt_SigEI_UnitNo').val('');
    $('#txt_SigEI_FloorNo').val('');
    $('#txt_SigEI_BldgNo').val('');
    $('#txt_SigEI_BldgName').val('');
    $('#txt_SigEI_House').val('');
    $('#txt_SigEI_StreetName').val('');
    $('#txt_SigEI_Lot').val('');
    $('#txt_SigEI_Block').val('');
    $('#txt_SigEI_Phase').val('');
    $('#txt_SigEI_Subdivision').val('');
    $('#txt_SigEI_Zone').val('');
    $('#idvallugSigEIBarangay').val('');
    $('#descvallugSigEIBarangay').val('');
    $('#idvallugSigEIMunicipality').val('');
    $('#descvallugSigEIMunicipality').val('');
    $('#idvallugSigEIProvince').val('');
    $('#descvallugSigEIProvince').val('');
    $('#idvallugSigEIRegion').val('');
    $('#descvallugSigEIRegion').val('');
    $('#idvallugSigEICountry').val('');
    $('#descvallugSigEIRegion').val('');
    $('#txt_SigEI_Zip').val('');

    $('#txt_SigEI_Remarks').val('');
}

function removeDataSigBuss(){
    $('#txt_SigBI_BusinessName').val('');
    $('#idvallugSigBIBusinessType').val('');
    $('#descvallugSigBIBusinessType').val('');
    $('#idvallugSigBINatureBusiness').val('');
    $('#descvallugSigBINatureBusiness').val('');
    $('#txt_SigBI_JobTitle').val('');
    $('#idvallugSigBIOccptnPositn').val('');
    $('#descvallugSigBIOccptnPositn').val('');
    $('#txt_SigBI_Years').val(''); 
    $('#txt_SigBI_Month').val('');
    $('#txt_SigBI_PhoneNo').val('');
    $('#txt_SigBI_MobileNo').val('');
    $('#txt_SigBI_EmailAdd').val('');
    $('#idvallugSigBIBusinessIncSrc').val('');
    $('#descvallugSigBIBusinessIncSrc').val('');
    $('#txt_SigBI_BusinessAddress').val('');
    $('#txt_SigBI_UnitNo').val('');
    $('#txt_SigBI_FloorNo').val('');
    $('#txt_SigBI_BldgNo').val('');
    $('#txt_SigBI_BldgName').val('');
    $('#txt_SigBI_House').val('');
    $('#txt_SigBI_StreetName').val('');
    $('#txt_SigBI_Lot').val('');
    $('#txt_SigBI_Block').val('');
    $('#txt_SigBI_Phase').val('');
    $('#txt_SigBI_Subdivision').val('');
    $('#txt_SigBI_Zone').val('');
    $('#idvallugSigBIBarangay').val('');
    $('#descvallugSigBIBarangay').val('');
    $('#idvallugSigBIMunicipality').val('');
    $('#descvallugSigBIMunicipality').val('');
    $('#idvallugSigBIProvince').val('');
    $('#descvallugSigBIProvince').val('');
    $('#idvallugSigBIRegion').val('');
    $('#descvallugSigBIRegion').val('');
    $('#idvallugSigBICountry').val('');
    $('#descvallugSigBIRegion').val('');
    $('#txt_SigBI_Zip').val('');


    $('#txt_SigBI_GrossMnthlyIncm').val('');
    $('#descvallugSigBICountry').val('');

    $('#txt_SigBI_Remarks').val('');
}

function isTicked() {

}

//function asterisk() {
//    $fn().xOnClickEvents.xRadioButtonTaxRegTrigger();
//}

function getHOfficeCode() {
    var Supcode = $('#txtBorrowersCode').val();
    return Supcode;
}



$(document).on("click", "#btnVendorTaxInfo", function (e) {
    var id = $('#txtBorrowersCode').val();
    nwParameter_Add("supcode", id);

    if (id.length > 0) {
        var title = "Vendor Taxes Information";
        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" || $('#txtStatus').val() == "Loaded and Approved" ? true : false;
        var fullength = "../../../AP/DataSetup/APSupplierTaxesInformation/APSupplierTaxesInformation.aspx?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "80%" });
        $("#nwPopWindow").css({ "min-height": "90%" });
        $("#nwPopWindow").css({ "height": "90%" });
        nwPopupForm_ShowModal("nwPopWindow");
    }
    return false;


});


$(document).on("click", "#btnVendorBIR", function (e) {
    var id = $('#txtBorrowersCode').val();
    nwParameter_Add("supcode", id);

    if (id.length > 0) {
        //insert here
        var title = "Vendor System Permit";
        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;
        var fullength = "../../../AP/DataSetup/APSupplierBIRCASPermit/APSupplierBIRCASPermit.aspx?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

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
    var id = $('#txtBorrowersCode').val();
    nwParameter_Add("supcode", id);
    if (id.length > 0) {
        //insert here
        var title = "Vendor Location";
        var isView = $('#txtStatus').val() == "Cancelled" ? true : false;

        if (isView && nwIsReport == "")
            nwIsReport = "1";

        var fullength = "../../../AP/DataSetup/APSupplierLocation/APSupplierLocation.aspx?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "95%" });
        $("#nwPopWindow").css({ "min-height": "95%" });
        $("#nwPopWindow").css({ "height": "95%" });
        nwPopupForm_ShowModal("nwPopWindow");

    }
    return false;
});



// Vendor Contacts
$(document).on("click", "#btnVendorContact", function (e) {
    var id = $('#txtBorrowersCode').val();
    nwParameter_Add("supcode", id);
    if (id.length > 0) {
        //insert here
        var title = "Vendor Contacts";
        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;

        var fullength = "../../../AP/DataSetup/APSupplierContacts/APSupplierContacts.aspx?nwParam=1&nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

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
    var id = $('#txtBorrowersCode').val();
    nwParameter_Add("supcode", id);
    if (id.length > 0) {
        //insert here
        var title = "Vendor Child Units - Accounting";
        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;
        var fullength = "../../../AP/DataSetup/APSupplierChildUnitAccounting/APSupplierChildUnitAccounting.aspx?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

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
    var id = $('#txtBorrowersCode').val();
    nwParameter_Add("supcode", id);
    if (id.length > 0) {
        //insert here
        var title = "Vendor Basis for Aging Assignment";
        //var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;
        var isView = $('#txtStatus').val() == "Cancelled" ? true : false;
        var fullength = "../../../AP/DataSetup/APSupplierBasisForAgingAssignment/APSupplierBasisForAgingAssignment.aspx?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

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

    var id = $('#txtBorrowersCode').val();

    nwParameter_Add("supcode", id);

    if (id.length > 0) {
        //insert here
        var title = "Vendor Branch Group Assignment";
        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;
        var fullength = "../../../AP/DataSetup/APSupplierBranchGroupAss/APSupplierBranchGroupAss.aspx?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

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

    var id = $('#txtBorrowersCode').val();
    nwParameter_Add("supcode", id);

    if (id.length > 0) {
        //insert here
        var title = "Vendor Payment Term Assignment";
        var isView = $('#txtStatus').val() == "Approved" || $('#txtStatus').val() == "Cancelled" ? true : false;
        var fullength = "../../../AP/DataSetup/APSupplierPaymentTermAssignment/APSupplierPaymentTermAssignment.aspx?nwIsReport=" + nwIsReport + "&nwSupplierCode=" + encodeURI(id) + "&isView=" + encodeURI(isView);

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
    nwPopupForm_Show('nwUploadHistory');
    nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());
    func_ActionDriven("actViewUpdateHistory", false);

    return false;
});

$(document).on("click", "#btnPaymentDetails", function (e) {
    nwLoading_Start("nwLoadingPaymentDetails", crLoadingHTML);
    nwPopupForm_ShowModal("nwPaymentDtls");

    if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
        $('#btnsaveContacts').enable(false);
        $('#nwGridPaymentDtlsCon').enable(false);
    } else {
        $('#btnsaveContacts').enable(true);
        $('#nwGridPaymentDtlsCon').enable(true);
    }

    nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());
    func_ActionDriven("actPaymentDtls", false);
    return false;
});


$(document).on("click", ".btnUtilDtls", function (e) {
    nwLoading_Start("nwLoadingUtilDetails", crLoadingHTML);
    nwPopupForm_ShowModal('nwUtilDtls');
    nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());
    nwParameter_Add_Table('nwGridUtilDtlsCon', false);
    func_ActionDriven("actUtilDtls", false);
    return false;
});




var nwcurrIndex;



$(document).on("click", ".btnContactDtlsSigna", function (e) {
    nwcurrIndex = crnwTR.index();
    sglineid = $('#nwGridSigntrsInfoCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SgInfo_LINEID + ')').text();
    code = $("#txtBorrowersCode").val();

    if (code == '' || sglineid == '') {
        MessageBox('Cannot Proceed.  Please Save the record first.', menuTitle);
    }
    else {
        nwLoading_Start("xLoadContactDtlsSig", crLoadingHTML);
        nwPopupForm_ShowModal('nwSignaContactDtls');

        if (nwDocno != '' || $('#txtStatusForEntry').val() != '1')
            $('#btnsaveSCD').enable(false);
        else
            $('#btnsaveSCD').enable(true);

        $("#nwSignaContactDtls").css({ "min-width": "30%" });
        $("#nwSignaContactDtls").css({ "min-height": "30%" });
        nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());
        nwParameter_Add_Table('nwGridSigntryContactDtlsCon', false);
        nwParameter_Add('sglineid', sglineid);
        //contactInp4(val);
        //nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());
        func_ActionDriven("actViewContactDtlsSign", false);
    }
    return false;
});

//Borr  











$(document).on("click", ".btnSignatoriesLocation", function (e) {
    nwcurrIndex = crnwTR.index();
    sglineid = $('#nwGridSigntrsInfoCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SgInfo_LINEID + ')').text();
    code = $("#txtBorrowersCode").val();
    nwParameter_Add('sglineid', sglineid);
    nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());

    if (code == '' || sglineid == '') {
        MessageBox('Cannot Proceed.  Please Save the record first.', menuTitle);
    }
    else
    {
        nwLoading_Start("actnwSigLocDtls", crLoadingHTML);
        cust_GetPara();
        nwPopupForm_ShowModal('nwSignaLocation');

        if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
            $('#btnsaveLocSign').enable(false);
            $('.addchgSignaLocInfo').enable(false);
            $('.addchgSignaLocInfo2').enable(false);
        } else {
            $('#btnsaveLocSign').enable(true);
            $('#cbSigLIPresentAdd').enable(true);
            $('#cb_SigLI_FullAddress').enable(true);
            $('#cb_SigLI_FullAddress2').enable(true);
            $('#cmbSigLIPrepMail').enable(true);
            $('#lugSigLIHomeOwnrshp').enable(true);
            $('#lugSigLIHomeOwnrshp2').enable(true);

            isChkFullAdd5();
            isChkFullAdd6();
            
        }

        $("#nwSignaLocation").css({ "min-width": "80%" });
        $("#nwSignaLocation").css({ "min-height": "80%" });
        func_ActionDriven("actnwSigLocDtls", false);
    }
    return false;
});




$(document).on("click", ".btnEmpnfoSigna", function (e) {
    nwcurrIndex = crnwTR.index();
    sglineid = $('#nwGridSigntrsInfoCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SgInfo_LINEID + ')').text();
    code = $("#txtBorrowersCode").val();
    nwParameter_Add('sglineid', sglineid);
    nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());

    if (code == '' || sglineid == '') {
        MessageBox('Cannot Proceed.  Please Save the record first.', menuTitle);
    }
    else {
        nwLoading_Start("actnwSigEmpDtls", crLoadingHTML);

        if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
            $('#btnsaveEmpSign').enable(false);
            $('#txt_SigEI_Years, #txt_SigEI_Month').enable(false);
            $('.addchgAddressEmpSigInfo').enable(false);
        } else {
            $('#btnsaveEmpSign').enable(true);
            $('#txt_SigEI_Years, #txt_SigEI_Month').enable(true);
            $('.addchgAddressEmpSigInfo').enable(true);
            $('#lugSigEIEmploymentType').enable(true);
            $('#txt_SigEI_EmployerName').enable(true);
            $('#lugSigEIEmploymentStatus').enable(true);
            $('#txt_SigEI_JobTitle').enable(true);
            $('#lugSigEINatureEmplymnt').enable(true);
            $('#txt_SigEI_JobTitle').enable(true);
            $('#lugSigEIPosition').enable(true);
            $('#txt_SigEI_GrossMnthlyIncm').enable(true);
            $('#txt_SigEI_PhoneNo').enable(true);
            $('#txt_SigEI_MobileNo').enable(true);
            $('#txt_SigEI_EmailAdd').enable(true);
        }

        cust_GetPara();
        phoneSig();
        nwPopupForm_ShowModal('nwSigEmpDtls');
        func_ActionDriven("actnwSigEmpDtls", false);
    }
    return false;
});


$(document).on("click", ".btnBussInfoSigna", function (e) {
    nwcurrIndex = crnwTR.index();
    sglineid = $('#nwGridSigntrsInfoCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SgInfo_LINEID + ')').text();
    code = $("#txtBorrowersCode").val();
    nwParameter_Add('sglineid', sglineid);
    nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());

    if (code == '' || sglineid == '') {
        MessageBox('Cannot Proceed.  Please Save the record first.', menuTitle);
    }
    else {
        nwLoading_Start("actnwSigBussDtls", crLoadingHTML);
        cust_GetPara();
        phoneSig();
        //mobileFormat();
        nwPopupForm_Show('nwSigBussDtls');
        if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
            $('#btnsaveBussSign').enable(false);
            $('#txt_SigBI_Years, #txt_SigBI_Month').enable(false);
            $('.addchgSigAddBussInfo').enable(false);
            $('#txt_SigBI_EmailAdd').enable(false);
            $('#txt_SigBI_MobileNo').enable(false);
            $('#txt_SigBI_PhoneNo').enable(false);
            $('#txt_SigBI_GrossMnthlyIncm').enable(false);
            $('#txt_SigBI_JobTitle').enable(false);
            $('#txt_SigBI_BusinessName').enable(false);
            $('#lugSigBIBusinessType').enable(false);
            $('#lugSigBINatureBusiness').enable(false);
            $('#lugSigBIBusinessIncSrc').enable(false);
            $('#lugSigBIOccptnPositn').enable(false);
        } else {
            $('#btnsaveBussSign').enable(true);
            $('#txt_SigBI_Years, #txt_SigBI_Month').enable(true);
            $('.addchgAddressEmpSigInfo').enable(true);
            $('#lugSigBIEmploymentType').enable(true);
            $('#txt_SigBI_EmployerName').enable(true);
            $('#lugSigBIEmploymentStatus').enable(true);
            $('#txt_SigBI_JobTitle').enable(true);
            $('#lugSigBINatureEmplymnt').enable(true);
            $('#txt_SigBI_JobTitle').enable(true);
            $('#lugSigBIPosition').enable(true);
            $('#txt_SigBI_GrossMnthlyIncm').enable(true);
            $('#txt_SigBI_PhoneNo').enable(true);
            $('#txt_SigBI_MobileNo').enable(true);
            $('#txt_SigBI_EmailAdd').enable(true);
            $('#txt_SigBI_FloorNo').enable(true);
            $('#txt_SigBI_BldgNo').enable(true);
            $('#txt_SigBI_UnitNo').enable(true);
            $('.addchgSigAddBussInfo').enable(true);
            $('#txt_SigBI_BusinessName').enable(true);
            $('#lugSigBIBusinessType').enable(true);
            $('#lugSigBINatureBusiness').enable(true);
            $('#lugSigBIBusinessIncSrc').enable(true);
            $('#lugSigBIOccptnPositn').enable(true);
        }

        func_ActionDriven("actnwSigBussDtls", false);
    }
    return false;
});



$(document).on("click", "#btnsaveContacts", function (e) {

    //temp_crnwTR = crnwTR.find("td:eq(0)").text();
    msgBoxContainerQuestion = "savecontactdetails";
    parent_MessageBoxQuestion("Do you want to save the current record?", menuTitle, "");

    return false;

});
$(document).on("click", "#btnsaveLocBorr", function (e) {

    msgBoxContainerQuestion = "savelocborr";
    parent_MessageBoxQuestion("Do you want to save the current record?", menuTitle, "");

    return false;

});


$(document).on("click", "#btnsaveEmpBorr", function (e) {

    msgBoxContainerQuestion = "saveempborr";
    parent_MessageBoxQuestion("Do you want to save the current record?", menuTitle, "");

    return false;

});

$(document).on("click", "#btnsaveBussBorr", function (e) {

    msgBoxContainerQuestion = "savebussborr";
    parent_MessageBoxQuestion("Do you want to save the current record?", menuTitle, "");

    return false;

});


//////Signatories
$(document).on("click", "#btnsaveLocSign", function (e) {

    msgBoxContainerQuestion = "savelocsig";
    parent_MessageBoxQuestion("Do you want to save the current record?", menuTitle, "");

    return false;

});

$(document).on("click", "#btnsaveEmpSign", function (e) {

    msgBoxContainerQuestion = "saveempsig";
    parent_MessageBoxQuestion("Do you want to save the current record?", menuTitle, "");

    return false;

});

$(document).on("click", "#btnsaveBussSign", function (e) {

    msgBoxContainerQuestion = "savebussig";
    parent_MessageBoxQuestion("Do you want to save the current record?", menuTitle, "");

    return false;

});



//savecontactdetails
$(document).on("click", "#btnsaveBCD", function (e) {
    //temp_crnwTR = crnwTR.find("td:eq(0)").text();
    msgBoxContainerQuestion = "saveBCD";
    parent_MessageBoxQuestion("Do you want to save the current record?", menuTitle, "");

    return false;

});

//savecontactdetails
$(document).on("click", "#btnsaveSCD", function (e) {
    //temp_crnwTR = crnwTR.find("td:eq(0)").text();
    msgBoxContainerQuestion = "saveSCD";
    parent_MessageBoxQuestion("Do you want to save the current record?", menuTitle, "");

    return false;

});

$(document).on("click", "#btnsaveOthSrc", function (e) {
    //temp_crnwTR = crnwTR.find("td:eq(0)").text();
    msgBoxContainerQuestion = "saveOthSrc";
    parent_MessageBoxQuestion("Do you want to save the current record?", menuTitle, "");

    return false;

});


$(document).on("click", "#btnUpdateHistoryExport", function (e) {
    nwLoading_Start("xExportViewUpdateHistory", crLoadingHTML);
    nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());
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

    //if (altBrgy != "")
    //    $("#lugStdBarangay input").va("");
    //$("#lugStdBarangay input").va
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
var curCont;
var curRowBor;
var currRowEmp;
var curRowBuss;
var curRowOth;

var curSCont;
var cutSLog;
var curSEmp;
var CurSBuss;



$(document).on("click", "#btnHistory", function (e) {
    if ($('#chkBox').prop('checked')) {
        nwParameter_Add("code", $('#txtBorrowersCode').val());
    }
    else {
        nwParameter_Add("code", '%');
    }
    func_ActionDriven("LoadHistorical");
    return false;
});

function func_WindowCloseTrigger(verID) {
    var isContinue = true;
    if (nwDocno != "") {
        return isContinue;
    }

    if (verID == "nwPopWindow") {
        nwParameter_Add("txtBorrowersCode", $('#txtBorrowersCode').val());
        nwParameter_Add("VendorId", $('#txtVendorID').val());
        func_ActionDriven("actLoadButtons", false);
    }


    if (verID == "nwPopUpReqComplianceHdr") {
        nwLoading_Start("actHasReqComplianceHdr", crLoadingHTML);
        cust_GetPara();
        func_ActionDriven('actHasReqComplianceHdr', false);
    }

    if (verID == "nwPopUpReqSpoComplianceHdr") {
        nwLoading_Start("actHasReqSpoComplianceHdr", crLoadingHTML);
        cust_GetPara();
        func_ActionDriven('actHasReqSpoComplianceHdr', false);
    }

    if (verID == "nwPopUpReqComplianceLin") {
        nwLoading_Start("actHasReqComplianceLin", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("nwLineID", nwLineID);
        nwParameter_Add("currRow", currRow);
        func_ActionDriven("actHasReqComplianceLin", false);
    }

    if (verID == "nwPopUpReqComplianceLin2") {
        nwLoading_Start("actHasReqComplianceLin2", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("nwLineID", nwLineID2);
        nwParameter_Add("currRow", currRow2);
        func_ActionDriven("actHasReqComplianceLin2", false);
    }

    if (verID == "nwPaymentDtls") {
        cust_GetPara();
        nwLoading_Start("actHaPaymentDtlsColor", crLoadingHTML);
        func_ActionDriven("actHaPaymentDtlsColor", false);
    }

    if (verID == "nwCreditLine") {
        cust_GetPara();
        nwLoading_Start("nwCreditLine", crLoadingHTML);
        func_ActionDriven("nwCreditLine", false);
    }




    if (verID == "nwBorrContactDtls") {
        nwLoading_Start("nwBorrContactDtls", crLoadingHTML);
        cust_GetPara();
        //curCont = crnwTR.index();
        nwParameter_Add("curCont", nwcurrIndex);
        func_ActionDriven("nwBorrContactDtls", false);
    }


    if (verID == "nwBorrLocationDtls") {
        nwLoading_Start("nwBorrLocationDtls", crLoadingHTML);
        cust_GetPara();

        nwParameter_Add("curRowBor", nwcurrIndex);
        func_ActionDriven("nwBorrLocationDtls", false);
    }
    if (verID == "nwBorrEmployeeDtls") {
        nwLoading_Start("nwBorrEmployeeDtls", crLoadingHTML);
        cust_GetPara();

        nwParameter_Add("currRowEmp", nwcurrIndex);
        func_ActionDriven("nwBorrEmployeeDtls", false);
    }
    if (verID == "nwBorrBussDtls") {
        nwLoading_Start("nwBorrBussDtls", crLoadingHTML);
        cust_GetPara();

        nwParameter_Add("curRowBuss", nwcurrIndex);
        func_ActionDriven("nwBorrBussDtls", false);
    }

    if (verID == "nwOtrSrc") {
        nwLoading_Start("nwOtrSrc", crLoadingHTML);
        cust_GetPara();

        nwParameter_Add("curRowOth", nwcurrIndex);
        func_ActionDriven("nwOtrSrc", false);
    }


    if (verID == "nwSignaContactDtls") {
        nwLoading_Start("nwSignaContactDtls", crLoadingHTML);
        cust_GetPara();

        nwParameter_Add("curSCont", nwcurrIndex);
        func_ActionDriven("nwSignaContactDtls", false);
    }


    if (verID == "nwSignaLocation") {
        nwLoading_Start("nwSignaLocation", crLoadingHTML);
        cust_GetPara();

        nwParameter_Add("cutSLog", nwcurrIndex);
        func_ActionDriven("nwSignaLocation", false);
    }

    if (verID == "nwSigEmpDtls") {
        nwLoading_Start("nwSigEmpDtls", crLoadingHTML);
        cust_GetPara();

        nwParameter_Add("curSEmp", nwcurrIndex);
        func_ActionDriven("nwSigEmpDtls", false);
    }

    if (verID == "nwSigBussDtls") {
        nwLoading_Start("nwSigBussDtls", crLoadingHTML);
        cust_GetPara();

        nwParameter_Add("CurSBuss", nwcurrIndex);
        func_ActionDriven("nwSigBussDtls", false);
    }

    return isContinue;
}

function getValueOfTin() {
    arry = [];
    var Tin = $('#txtTinNumber').val();
    var LastFive = Tin.substr(Tin.length - 5);

    if (LastFive == "00000") {
        $("#btnBasisforAgingAssignment").enable(true);
    }
    else {
        $("#btnBasisforAgingAssignment").enable(false);
    }
}

function regNameExist() {
    msgBoxContainerQuestion = "VendorValidation";
    parent_MessageBoxQuestion("Registered Name already exists.\nDo you want to proceed?", menuTitle, "Question");
}

function autoRefresh() {
    if (nwSupplierCode != "" && nwIsReport == 0) {
        nwLoading_Start('xBind', crLoadingHTML);
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        nwParameter_Add('nwCode', nwCode);
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
        nwParameter_Add('nwCode', nwCode);
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

    else if (genID == "savecontactdetails") {
        if (answer == "Yes") {
            cust_GetPara();
            nwLoading_Start('actSavePaymentToTemp')
            //nwParameter_Add_Table('nwGridPaymentDtlsCon', false);
            nwParameter_Add_Spread(nwGridPaymentDtlsCon_Book);
            func_ActionDriven("actSavePaymentToTemp", false);
        }
    }
    else if (genID == "savelocborr") {
        if (answer == "Yes") {
            code = $("#txtBorrowersCode").val();
            cust_GetPara();
            nwLoading_Start('actSaveLocBorr')
            func_ActionDriven("actSaveLocBorr", false);
        }
    }

    else if (genID == "saveempborr") {
        if (answer == "Yes") {
            code = $("#txtBorrowersCode").val();
            cust_GetPara();
            nwLoading_Start('actSaveEmpBorr')
            func_ActionDriven("actSaveEmpBorr", false);
        }
    }

    else if (genID == "savebussborr") {
        if (answer == "Yes") {
            code = $("#txtBorrowersCode").val();
            cust_GetPara();
            nwLoading_Start('actSaveBussBorr')
            func_ActionDriven("actSaveBussBorr", false);
        }
    }
    else if (genID == "savelocsig") {
        if (answer == "Yes") {
            code = $("#txtBorrowersCode").val();
            cust_GetPara();
            nwLoading_Start('actSaveSigLoc')
            func_ActionDriven("actSaveSigLoc", false);
        }
    }
    else if (genID == "saveempsig") {
        if (answer == "Yes") {
            code = $("#txtBorrowersCode").val();
            cust_GetPara();
            nwLoading_Start('actSaveSigEmp')
            func_ActionDriven("actSaveSigEmp", false);
        }
    }
    
    else if (genID == "savebussig") {
        if (answer == "Yes") {
            code = $("#txtBorrowersCode").val();
            cust_GetPara();
            nwLoading_Start('actSaveSigBuss')
            func_ActionDriven("actSaveSigBuss", false);
        }
    }
    
    
    
    else if (genID == "saveBCD") {
        if (answer == "Yes") {
            //empCode = getParameterByName("emp");
            //nwParameter_Add("bindEmpCode", empCode);
            //nwParameter_Add("ROWNO", temp_crnwTR);
            //nwParameter_Add("ROWNO", ROWNO);
            cust_GetPara();
            nwParameter_Add_Table('nwGridCoBorrowerContactInfoCon', false);
            func_ActionDriven("actSaveBCDToTemp", false);
        }
    }

    else if (genID == "saveSCD") {
        if (answer == "Yes") {
            //empCode = getParameterByName("emp");
            //nwParameter_Add("bindEmpCode", empCode);
            //nwParameter_Add("ROWNO", temp_crnwTR);
            //nwParameter_Add("ROWNO", ROWNO);
            cust_GetPara();
            nwParameter_Add_Table('nwGridSigntryContactDtlsCon', false);
            func_ActionDriven("actSaveSCDToTemp", false);
        }
    }
    else if (genID == "saveOthSrc") {
        if (answer == "Yes") {
            cust_GetPara();
            nwParameter_Add_Table('nwGridBorrOthSrcIncInfoCon', false);
            func_ActionDriven("actSaveOthSrc", false);
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
    else if (nonvat == true && isNewRow) {
        $("#txtNonVat").enable(true);
        $("#txtVat").enable(false);
        $("#txtVat").val("");
    }
    else {
        $("#rbVat").enable(false);
        $("#rbNonVat").enable(false);
        $("#txtVat").enable(false);
        $("#txtNonVat").enable(false);
    }
}



//$(document).on('click', '#btnCollapseAll', function () {
//    if ($("#btnCollapseAll").text() === 'Expand All') {
//        $("#btnCollapseAll").text("Collapse All");
//        $('#tab-main-one, #tab-main-two, #tab-sub-three, #tab-main-four, #tab-main-five, #tab-main-six, #tab-main-seven, #tab-main-eight, #tab-main-nine, #tab-main-ten, #tab-main-eleven, #tab-main-twelve, #tab-main-thirteen,#tab-main-fourteen, #tab-main-fifthteen, #tab-main-sixteen, #tab-main-seventeen,#tab-main-eighteen, #tab-main-nineteen, #tab-main-twenty, #tab-main-twentytwo, #tab-main-twentythree, #tab-main-twentyfour, #tab-main-twentyfive, #tab-main-twentysix, #tab-main-twentyseven, #tab-main-twentyeight, #tab-main-twentynine, #tab-main-thirty,  #tab-main-thirtyone,  #tab-main-thirtytwo, #tab-main-thirtytres').prop('checked', true);
//        //window.location.href = window.location.href.replace(window.location.hash, "") + "#contentCollapse";
//    }
//    else {
//        $("#btnCollapseAll").text("Expand All");
//        $('#tab-main-one,#tab-main-two, #tab-main-three, #tab-main-four, #tab-main-five, #tab-main-six, #tab-main-seven, #tab-main-eight, #tab-main-nine, #tab-main-ten, #tab-main-eleven, #tab-main-twelve, #tab-main-thirteen, , #tab-main-fourteen, #tab-main-fifthteen, #tab-main-sixteen, #tab-main-seventeen, #tab-main-eighteen, #tab-main-nineteen, #tab-main-twenty, #tab-main-twentytwo, #tab-main-twentythree, #tab-main-twentyfour, #tab-main-twentyfive, #tab-main-twentysix, #tab-main-twentyseven, #tab-main-twentyeight, #tab-main-twentynine, #tab-main-thirt,  #tab-main-thirtyone,  #tab-main-thirtytwo, #tab-main-thirtytres').prop('checked', false);
//    }
//});

function toggleButtonText() {
    var button = document.getElementById("btnCollapseAll");

    if (button.textContent === "Expand All") {
        button.textContent = "Collapse All";
        $('#tab-main-one,#tab-main-two,#tab-main-three,#tab-main-four,#tab-main-thirtyone,#tab-main-five,#tab-main-six,#tab-main-seven,#tab-main-eight,#tab-main-nine,#tab-main-ten,#tab-main-eleven,#tab-main-twelve,#tab-main-thirteen,#tab-main-fourteen,#tab-main-thirty,#tab-main-nineteen,#tab-main-twentytwo,#tab-main-thirtytwo,#tab-main-twentythree,#tab-main-twentyfour,#tab-main-twentyfive,#tab-main-twentysix').prop('checked', true);

    } else {
        button.textContent = "Expand All";
        $('#tab-main-one,#tab-main-two,#tab-main-three,#tab-main-four,#tab-main-thirtyone,#tab-main-five,#tab-main-six,#tab-main-seven,#tab-main-eight,#tab-main-nine,#tab-main-ten,#tab-main-eleven,#tab-main-twelve,#tab-main-thirteen,#tab-main-fourteen,#tab-main-thirty,#tab-main-nineteen,#tab-main-twentytwo,#tab-main-thirtytwo,#tab-main-twentythree,#tab-main-twentyfour,#tab-main-twentyfive,#tab-main-twentysix').prop('checked', false);

    }
}



function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {

    //var seller = $('#idvallugPaymentMethod').val();
    //var effdate = $('#txtEffectiveDate').val();
    cust_GetPara();
    var nwobjID = nwobj.attr('id');
    if (nwobjID == "nwGridContactInfo") {
        if (crnwTD.index() == SPR_CI_CommType) {
            //if (seller == "" || effdate == "") { MessageBox("Please Complete Header Details First.", pageTitle) } else {
            lookUpCustomize("lugCommType", 1);
            //nwGrid_AddRow('nwGrid1Con', 1);
            //}
        }
    }

    if (nwobjID == "nwGridBankReference") {
        if (crnwTD.index() == SPR_bank) {
            //if (seller == "" || effdate == "") { MessageBox("Please Complete Header Details First.", pageTitle) } else {
            lookUpCustomize("lugBank", 1);
            //nwGrid_AddRow('nwGrid1Con', 1);
            //}
        }
    }

    

    if (nwobjID == "nwGridOthSrcIncInfo") {
        if (crnwTD.index() == SPR_SrcIncInfo_SrcIncomeCode) {
            //if (seller == "" || effdate == "") { MessageBox("Please Complete Header Details First.", pageTitle) } else {
            lookUpCustomize("lugSrcIncInfo_SrcIncome", 1);
            //nwGrid_AddRow('nwGrid1Con', 1);
            //}
        }
        if (crnwTD.index() == SPR_SrcIncInfo_JobTitle) {
            //if (seller == "" || effdate == "") { MessageBox("Please Complete Header Details First.", pageTitle) } else {
            lookUpCustomize("lugSrcIncInfo_JobTitle", 1);
            //nwGrid_AddRow('nwGrid1Con', 1);
            //}
        }
    }


    if (nwobjID == "nwGridBorrOthSrcIncInfo") {
        if (crnwTD.index() == SPR_Borr_SrcIncomeCode) {
            //if (seller == "" || effdate == "") { MessageBox("Please Complete Header Details First.", pageTitle) } else {
            lookUpCustomize("lugBorr_SrcIncome", 1);
            //nwGrid_AddRow('nwGrid1Con', 1);
            //}
        }
        if (crnwTD.index() == SPR_Borr_JobTitle) {
            //if (seller == "" || effdate == "") { MessageBox("Please Complete Header Details First.", pageTitle) } else {
            lookUpCustomize("lugBorr_JobTitle", 1);
            //nwGrid_AddRow('nwGrid1Con', 1);
            //}
        }
    }


    if (nwobjID == "nwGridSpouseConInfo") {
        if (crnwTD.index() == SPR_SCI_CommType) {
            //if (seller == "" || effdate == "") { MessageBox("Please Complete Header Details First.", pageTitle) } else {
            lookUpCustomize("lugSCI_CommType", 1);
            //nwGrid_AddRow('nwGrid1Con', 1);
            //}
        }

    }


    if (nwobjID == "nwGridCoBorrowerContactInfo") {
        if (crnwTD.index() == SPR_CCI_CommType) {
            //if (seller == "" || effdate == "") { MessageBox("Please Complete Header Details First.", pageTitle) } else {
            lookUpCustomize("lugCCI_CommType", 1);
            //nwGrid_AddRow('nwGrid1Con', 1);
            //}
        }

    }

    if (nwobjID == "nwGridSigntryContactDtls") {
        if (crnwTD.index() == SPR_SigCI_CommType) {
            //if (seller == "" || effdate == "") { MessageBox("Please Complete Header Details First.", pageTitle) } else {
            lookUpCustomize("lugSigCI_CommType", 1);
            //nwGrid_AddRow('nwGrid1Con', 1);
            //}
        }

    }

    if (nwobjID == "nwGridDependntInfo") {
        if (crnwTD.index() == SPR_Depnfo_Relation) {
            //if (seller == "" || effdate == "") { MessageBox("Please Complete Header Details First.", pageTitle) } else {
            lookUpCustomize("lugDepnfo_Relation", 1);
            //nwGrid_AddRow('nwGrid1Con', 1);
            //}
        }
    }

    if (nwobjID == "nwGridPaymentDtls") {
        if (crnwTD.index() == SPR_currency) {
            //if (seller == "" || effdate == "") { MessageBox("Please Complete Header Details First.", pageTitle) } else {
            lookUpCustomize("lugPD_Currency", 1);
            //nwGrid_AddRow('nwGrid1Con', 1);
            //}
        }
    }

    if (nwobjID == "nwGridBenefOwn") {
        if (crnwTD.index() == SPR_BR_Nationality) {
            lookUpCustomize("lugBR_Nationality", 1);
        }
        if (crnwTD.index() == SPR_BR_Desig) {
            lookUpCustomize("lugBR_Desig", 1);
        }

    }

    if (nwobjID == "nwGridBorrowerInfo") {
        if (crnwTD.index() == SPR_BInfo_RelationShip) {
            lookUpCustomize("lugBInfo_RelationShip", 1);
        }
        if (crnwTD.index() == SPR_BInfo_Salutation) {
            lookUpCustomize("lugBInfo_Salutation", 1);
        }
        
        if (crnwTD.index() == SPR_BInfo_namesuffix) {
            lookUpCustomize("lugBInfo_namesuffix", 1);
        }
        if (crnwTD.index() == SPR_BInfo_Gender) {
            lookUpCustomize("lugBInfo_Gender", 1);
        }
        if (crnwTD.index() == SPR_BInfo_maritalstatus) {
            lookUpCustomize("lugBInfo_maritalstatus", 1);
        }
        if (crnwTD.index() == SPR_BInfo_Nationality) {
            lookUpCustomize("lugBInfo_Nationality", 1);
        }
        if (crnwTD.index() == SPR_BInfo_Politicposition) {
            lookUpCustomize("lugBInfo_Politicposition", 1);
        }
        if (crnwTD.index() == SPR_BInfo_Employmentsource) {
            lookUpCustomize("lugBInfo_Employmentsource", 1);
        }

    }


    if (nwobjID == "nwGridSigntrsInfo") {
        if (crnwTD.index() == SPR_SgInfo_Salutation) {
            lookUpCustomize("lugSgInfo_salutation", 1);
        }

        if (crnwTD.index() == SPR_SgInfo_namesuffix) {
            lookUpCustomize("lugSgInfo_namesuffix", 1);
        }
        if (crnwTD.index() == SPR_SgInfo_Gender) {
            lookUpCustomize("lugSgInfo_Gender", 1);
        }
        if (crnwTD.index() == SPR_SgInfo_maritalstatus) {
            lookUpCustomize("lugSgInfo_maritalstatus", 1);
        }
        if (crnwTD.index() == SPR_SgInfo_Nationality) {
            lookUpCustomize("lugSgInfo_Nationality", 1);
        }
        if (crnwTD.index() == SPR_SgInfo_Politicposition) {
            lookUpCustomize("lugSgInfo_Politicposition", 1);
        }
        if (crnwTD.index() == SPR_SgInfo_Employmentsource) {
            lookUpCustomize("lugSgInfo_Employmentsource", 1);
        }

    }


}



$(document).on("click", "#chkSamePresentAdd", function (e) {
    //PERMANENT ADDRESS
    isChk();
});


function isChk() {
    if ($('#chkSamePresentAdd').is(":checked")) {
        $('#txtFullAddress2').enable(false);
        $('#cbPolExpPer2').enable(false);
        $('#txtUnitNo2').enable(false);
        $('#txtFloorNo2').enable(false);
        $('#txtBldgNo2').enable(false);
        $('#txtEstablishment2').enable(false);
        $('#txtBuilding2').enable(false);
        $('#txtLandmark2').enable(false);
        $('#txtHouseNo2').enable(false);
        $('#txtStreetName2').enable(false);
        $('#txtLot2').enable(false);
        $('#txtBlock2').enable(false);
        $('#txtPhase2').enable(false);
        $('#txtSubdivision2').enable(false);
        $('#txtZone2').enable(false);
        $('#lugArea2').enable(false);
        $('#lugStdBarangay2').enable(false);
        $('#txtAltBrgy2').enable(false);
        $('#lugMunicipality2').enable(false);
        $('#lugProvince2').enable(false);
        $('#lugRegion2').enable(false);
        $('#txtZip2').enable(false);
    } else {
        $('#txtFullAddress2').enable(true);
        $('#cbPolExpPer2').enable(true);
        $('#txtUnitNo2').enable(true);
        $('#txtFloorNo2').enable(true);
        $('#txtBldgNo2').enable(true);
        $('#txtEstablishment2').enable(true);
        $('#txtBuilding2').enable(true);
        $('#txtLandmark2').enable(true);
        $('#txtHouseNo2').enable(true);
        $('#txtStreetName2').enable(true);
        $('#txtLot2').enable(true);
        $('#txtBlock2').enable(true);
        $('#txtPhase2').enable(true);
        $('#txtSubdivision2').enable(true);
        $('#txtZone2').enable(true);
        //$('#lugArea2').enable(false);
        //$('#lugStdBarangay2').enable(false);
        $('#txtAltBrgy2').enable(true);
        //$('#lugMunicipality2').enable(false);
        $('#lugProvince2').enable(false);
        $('#lugRegion2').enable(false);
        $('#txtZip2').enable(false);
        $('#lugArea2').enable(true);
        $('#lugStdBarangay2').enable(true);
        $('#lugMunicipality2').enable(true);
    }

}


$(document).on("change", ".chkdda", function (e) {
    var length = $(`#nwGrid2 tr`).length;

    if ($(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(1) input`).prop("checked")) {
        //var y = $(`#nwGrid1Con-nwData tr:eq(${crnwTR.index() - 1}) td:eq(3) input`).val();
        //$(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(3) input`).val('');
        var count = crnwTR.index();
        //$(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(3) input`).enable(false);
        //$(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(3)`).css("background-color", "#E7E7E7");
        //$(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(2) input`).val($(`#nwGrid1Con-nwData tr:eq(${crnwTR.index() - 1}) td:eq(3) input`).val());
        //$(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(4) input`).enable(true);
        //$(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(4)`).css("background-color", "white");

        for (x = crnwTR.index() + 1; x < length; x++) {
            $(`#nwGrid2-nwData tr:eq(${x}) td:eq(1) input`).enable(false);
            $(`#nwGrid2 - nwData tr:eq(1) td:eq(8) input`).value();
            //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(2) input`).enable(false);
            //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(3) input`).enable(false);
            //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(4) input`).enable(false);

            //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(2)`).css("background-color", "#E7E7E7");
            $(`#nwGrid2-nwData tr:eq(${x}) td:eq(1)`).css("background-color", "#E7E7E7");
            //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(3)`).css("background-color", "#E7E7E7");
            //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(4)`).css("background-color", "#E7E7E7");

            //$(`#nwGrid2-nwData tr:eq(${x}) td:eq(1) input`).val("");
            //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(2) input`).val("");
            //$(`#nwGrid1Con-nwData tr:eq(${x}) td:eq(4) input`).val("");
        }
        for (z = crnwTR.index() ; z > 0; z--) {
            $(`#nwGrid2-nwData tr:eq(${z - 1}) td:eq(1)`).css("background-color", "#E7E7E7");
            $(`#nwGrid2-nwData tr:eq(${z - 1}) td:eq(1)`).enable(false);

            //$(`#nwGrid1Con-nwData tr:eq(${z - 1}) td:eq(4)`).css("background-color", "white");
            //$(`#nwGrid1Con-nwData tr:eq(${z - 1}) td:eq(4) input`).enable(true);
        }

        _checkAbove = true;
    } else {
        //var y = $(`#nwGrid1Con-nwData tr:eq(${crnwTR.index() - 1}) td:eq(3) input`).val();
        //if ($(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(2) input`).val() != "") {
        //    $(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(3) input`).enable(true);
        //    $(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(4) input`).enable(true);
        //    $(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(3)`).css("background-color", "white");
        //    $(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(4)`).css("background-color", "white");
        //}

        for (x = 0; x < length; x++) {
            $(`#nwGrid2-nwData tr:eq(${x}) td:eq(1) input`).enable(true);
            $(`#nwGrid2-nwData tr:eq(${x}) td:eq(1)`).css("background-color", "white");
        }
        for (z = crnwTR.index() ; z > 0; z--) {
            $(`#nwGrid2-nwData tr:eq(${z - 1}) td:eq(1)`).css("background-color", "white");
            $(`#nwGrid2-nwData tr:eq(${z - 1}) td:eq(1)`).enable(true);
        }
        //if (y != "") {
        //    y++;
        //    //$(`#nwGrid1Con-nwData tr:eq(${crnwTR.index()}) td:eq(2) input`).val(y);
        //    var count = crnwTR.index();
        //}
        _checkAbove = false;
    }
});


$(document).on("focusout", "#txtBranchCode", function (e) {

    var s1 = $(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_BRANCHCODE + `) input`).val();
    var s2 = $(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_ACCTNO + `) input`).val();
    var fullacctno = s1 + s2;
    $(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_FULLACCTNO + `)`).text(fullacctno);

});

$(document).on("focusout", "#txtAcctno", function (e) {

    var s1 = $(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_BRANCHCODE + `) input`).val();
    var s2 = $(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_ACCTNO + `) input`).val();
    var fullacctno = s1 + s2;
    $(`#nwGrid2-nwData tr:eq(${crnwTR.index()}) td:eq(` + SPR_FULLACCTNO + `)`).text(fullacctno);

});

//function isCheckedCol1() {
//    var rowno = 0;
//    var length = $(`#nwGrid2 tr`).length;
//    for (var xxx = 0; xxx < length; xxx++) {
//        if ($(`#nwGrid2-nwData tr:eq(${xxx}) td:eq(` + SPR_DDATICK + `) input`).prop("checked") == true) {
//            rowno = xxx;
//        }
//    }

//    for (var x1 = 0; x1 < length; x1++) {
//        if (x1 != rowno) {
//            $(`#nwGrid2-nwData tr:eq(${x1}) td:eq(` + SPR_DDATICK + `) input`).enable(false);
//            $(`#nwGrid2-nwData tr:eq(${x1}) td:eq(` + SPR_DDATICK + `)`).css("background-color", "#E7E7E7");
//        }
//    }
//}


$(document).on("focusout", "#txtSwiftBICCode", function (e) {

    if (e.which === 32)
        return false;

});
$(document).on("focusout", "#txtSwiftBICCode", function (e) {

    this.value = this.value.replace(/\s/g, "");

});

$(document).on("change", "#cbIndvPolExpPer", function (e) {
    cbIndvPolExpPer();
});

function cbIndvPolExpPer(){
    var isIndividual = $('#cbIndvPolExpPer').prop('checked');

    if (isIndividual) {
        $("#lugPolExpPer").enable(true);

        $("#nwReq").show();

        //$('#nwGridDependntInfo tr th:nth-child(' + (SPR_Depnfo_Relation + 1) + ')').addClass('nwFieldreq');
        //$('#nwGridDependntInfo tr th:nth-child(' + (SPR_Depnfo_Name + 1) + ')').addClass('nwFieldreq');
    } else {
        $("#lugPolExpPer").enable(false);
        $("#idvallugPolExpPer").val('');
        $("#descvallugPolExpPer").val('');

        $("#nwReq").hide();

        //$('#nwGridDependntInfo tr th:nth-child(' + (SPR_Depnfo_Relation + 1) + ')').removeClass('nwFieldreq');
        //$('#nwGridDependntInfo tr th:nth-child(' + (SPR_Depnfo_Name + 1) + ')').removeClass('nwFieldreq');
    }
}


$(document).on("click", "#cbSIPolExpPer", function (e) {
    cbIndvPolExpPer_Sps();
});

function cbIndvPolExpPer_Sps() {
    var isIndividual = $('#cbSIPolExpPer').prop('checked');

    if (isIndividual) {
        $("#lugSIPolExpPer").enable(true);
    } else {
        $("#lugSIPolExpPer").enable(false);
        $("#idvallugSIPolExpPer").val('');
        $("#descvallugSIPolExpPer").val('');
    }
}

$(document).on("change", ".addchgTD", function (e) {
    tradeName();
});

function tradeName() {
    var descText = "";

    var unit = '';

    unit = $("#txt_CNID_RegistrdName").val();

    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit);

    $("#txt_CNID_TradeName").val(descText.trim());
}


$(document).on("change", ".addchgLocInfo", function (e) {
    fulladdressLocInfo();
});

function fulladdressLocInfo() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_LI_UnitNo").val() != "" ? $("#txt_LI_UnitNo").val() + ", " : "";
    floor = $("#txt_LI_FloorNo").val() != "" ?  $("#txt_LI_FloorNo").val() + ", " : "";
    bldgno = $("#txt_LI_BldgNo").val() != "" ?  $("#txt_LI_BldgNo").val() + ", " : "";
    bldgname = $("#txt_LI_BuildingName").val() != "" ?  $("#txt_LI_BuildingName").val() + ", " : "";
    houseno = $("#txt_LI_HouseNo").val() != "" ?  $("#txt_LI_HouseNo").val() + ", " : "";
    streetname = $("#txt_LI_StreetName").val() != "" ?  $("#txt_LI_StreetName").val() + ", " : "";
    lot = $("#txt_LI_Lot").val() != "" ?  $("#txt_LI_Lot").val() + ", " : "";
    block = $("#txt_LI_Block").val() != "" ?  $("#txt_LI_Block").val() + ", " : "";
    phase = $("#txt_LI_Phase").val() != "" ?  $("#txt_LI_Phase").val() + ", " : "";
    subv = $("#txt_LI_Subdivision").val() != "" ?  $("#txt_LI_Subdivision").val() + ", " : "";
    zone = $("#txt_LI_Zone").val() != "" ?  $("#txt_LI_Zone").val() + ", " : "";
    brgy = $("#descvallugLIBarangay").val() != "" ?  $("#descvallugLIBarangay").val() + ", " : "";
    land = $("#txt_LI_Landmark").val() != "" ?  $("#txt_LI_Landmark").val() + ", " : "";
    mnpy = $("#descvallugLIMunicipality").val() != "" ?  $("#descvallugLIMunicipality").val() + ", " : "";
    prv = $("#descvallugLIProvince").val() != "" ?  $("#descvallugLIProvince").val() + ", " : "";
    reg = $("#descvallugLIRegion").val() != "" ?  $("#descvallugLIRegion").val() + ", " : "";
    cnty = $("#descvallugLICountry").val() != "" ?  $("#descvallugLICountry").val() + ", " : "";
    zip = $("#txt_LI_Zip").val().trim() != "" ?  $("#txt_LI_Zip").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname,land,  houseno,  streetname, lot,block,  phase,  subv,  zone,  brgy,  mnpy,  prv,  reg, cnty, zip);

    $("#txt_LI_FullAddress").val(descText.substring(0, descText.length - 2));
}

$(document).on("change", ".addchgLocInfo2", function (e) {
    fulladdressLocInfo2();
});

function fulladdressLocInfo2() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_LI_UnitNo2").val() != "" ? $("#txt_LI_UnitNo2").val() + ", " : "";
    floor = $("#txt_LI_FloorNo2").val() != "" ? $("#txt_LI_FloorNo2").val() + ", " : "";
    bldgno = $("#txt_LI_BldgNo2").val() != "" ? $("#txt_LI_BldgNo2").val() + ", " : "";
    bldgname = $("#txt_LI_BuildingName2").val() != "" ? $("#txt_LI_BuildingName2").val() + ", " : "";
    houseno = $("#txt_LI_HouseNo2").val() != "" ? $("#txt_LI_HouseNo2").val() + ", " : "";
    streetname = $("#txt_LI_StreetName2").val() != "" ? $("#txt_LI_StreetName2").val() + ", " : "";
    lot = $("#txt_LI_Lot2").val() != "" ? $("#txt_LI_Lot2").val() + ", " : "";
    block = $("#txt_LI_Block2").val() != "" ? $("#txt_LI_Block2").val() + ", " : "";
    phase = $("#txt_LI_Phase2").val() != "" ? $("#txt_LI_Phase2").val() + ", " : "";
    subv = $("#txt_LI_Subdivision2").val() != "" ? $("#txt_LI_Subdivision2").val() + ", " : "";
    zone = $("#txt_LI_Zone2").val() != "" ? $("#txt_LI_Zone2").val() + ", " : "";
    brgy = $("#descvallugLIBarangay2").val() != "" ? $("#descvallugLIBarangay2").val() + ", " : "";
    land = $("#txt_LI_Landmark2").val() != "" ? $("#txt_LI_Landmark2").val() + ", " : "";
    mnpy = $("#descvallugLIMunicipality2").val() != "" ? $("#descvallugLIMunicipality2").val() + ", " : "";
    prv = $("#descvallugLIProvince2").val() != "" ? $("#descvallugLIProvince2").val() + ", " : "";
    reg = $("#descvallugLIRegion2").val() != "" ? $("#descvallugLIRegion2").val() + ", " : "";
    cnty = $("#descvallugLICountry2").val() != "" ? $("#descvallugLICountry2").val() + ", " : "";
    zip = $("#txt_LI_Zip2").val().trim() != "" ? $("#txt_LI_Zip2").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_LI_FullAddress2").val(descText.trim().substring(0, descText.length - 2));
}

$(document).on("change", ".addchgSpouseLocInfo", function (e) {
    fulladdressSpouseLocInfo();
});


function fulladdressSpouseLocInfo() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_SLI_UnitNo").val() != "" ? $("#txt_SLI_UnitNo").val() + ", " : "";
    floor = $("#txt_SLI_FloorNo").val() != "" ? $("#txt_SLI_FloorNo").val() + ", " : "";
    bldgno = $("#txt_SLI_BldgNo").val() != "" ? $("#txt_SLI_BldgNo").val() + ", " : "";
    bldgname = $("#txt_SLI_BuildingName").val() != "" ? $("#txt_SLI_BuildingName").val() + ", " : "";
    houseno = $("#txt_SLI_HouseNo").val() != "" ? $("#txt_SLI_HouseNo").val() + ", " : "";
    streetname = $("#txt_SLI_StreetName").val() != "" ? $("#txt_SLI_StreetName").val() + ", " : "";
    lot = $("#txt_SLI_Lot").val() != "" ? $("#txt_SLI_Lot").val() + ", " : "";
    block = $("#txt_SLI_Block").val() != "" ? $("#txt_SLI_Block").val() + ", " : "";
    phase = $("#txt_SLI_Phase").val() != "" ? $("#txt_SLI_Phase").val() + ", " : "";
    subv = $("#txt_SLI_Subdivision").val() != "" ? $("#txt_SLI_Subdivision").val() + ", " : "";
    zone = $("#txt_SLI_Zone").val() != "" ? $("#txt_SLI_Zone").val() + ", " : "";
    brgy = $("#descvallugSLIBarangay").val() != "" ? $("#descvallugSLIBarangay").val() + ", " : "";
    land = $("#txt_SLI_Landmark").val() != "" ? $("#txt_SLI_Landmark").val() + ", " : "";
    mnpy = $("#descvallugSLIMunicipality").val() != "" ? $("#descvallugSLIMunicipality").val() + ", " : "";
    prv = $("#descvallugSLIProvince").val() != "" ? $("#descvallugSLIProvince").val() + ", " : "";
    reg = $("#descvallugSLIRegion").val() != "" ? $("#descvallugSLIRegion").val() + ", " : "";
    cnty = $("#descvallugSLICountry").val() != "" ? $("#descvallugSLICountry").val() + ", " : "";
    zip = $("#txt_SLI_Zip").val().trim() != "" ? $("#txt_SLI_Zip").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_SLI_FullAddress").val(descText.trim().substring(0, descText.length - 2));
}

$(document).on("change", ".addchgSpouseLocInfo2", function (e) {
    fulladdressSpouseLocInfo2();
});

function fulladdressSpouseLocInfo2() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_SLI_UnitNo2").val() != "" ? $("#txt_SLI_UnitNo2").val() + ", " : "";
    floor = $("#txt_SLI_FloorNo2").val() != "" ? $("#txt_SLI_FloorNo2").val() + ", " : "";
    bldgno = $("#txt_SLI_BldgNo2").val() != "" ? $("#txt_SLI_BldgNo2").val() + ", " : "";
    bldgname = $("#txt_SLI_BuildingName2").val() != "" ? $("#txt_SLI_BuildingName2").val() + ", " : "";
    houseno = $("#txt_SLI_HouseNo2").val() != "" ? $("#txt_SLI_HouseNo2").val() + ", " : "";
    streetname = $("#txt_SLI_StreetName2").val() != "" ? $("#txt_SLI_StreetName2").val() + ", " : "";
    lot = $("#txt_SLI_Lot2").val() != "" ? $("#txt_SLI_Lot2").val() + ", " : "";
    block = $("#txt_SLI_Block2").val() != "" ? $("#txt_SLI_Block2").val() + ", " : "";
    phase = $("#txt_SLI_Phase2").val() != "" ? $("#txt_SLI_Phase2").val() + ", " : "";
    subv = $("#txt_SLI_Subdivision2").val() != "" ? $("#txt_SLI_Subdivision2").val() + ", " : "";
    zone = $("#txt_SLI_Zone2").val() != "" ? $("#txt_SLI_Zone2").val() + ", " : "";
    brgy = $("#descvallugSLIBarangay2").val() != "" ? $("#descvallugSLIBarangay2").val() + ", " : "";
    land = $("#txt_SLI_Landmark2").val() != "" ? $("#txt_SLI_Landmark2").val() + ", " : "";
    mnpy = $("#descvallugSLIMunicipality2").val() != "" ? $("#descvallugSLIMunicipality2").val() + ", " : "";
    prv = $("#descvallugSLIProvince2").val() != "" ? $("#descvallugSLIProvince2").val() + ", " : "";
    reg = $("#descvallugSLIRegion2").val() != "" ? $("#descvallugSLIRegion2").val() + ", " : "";
    cnty = $("#descvallugSLICountry2").val() != "" ? $("#descvallugSLICountry2").val() + ", " : "";
    zip = $("#txt_SLI_Zip2").val().trim() != "" ? $("#txt_SLI_Zip2").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_SLI_FullAddress2").val(descText.trim().substring(0, descText.length - 2));
}

$(document).on("change", ".addchgBorrLocInfo", function (e) {
    fulladdressBorrLocInfo();
});


function fulladdressBorrLocInfo() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_CLI_UnitNo").val() != "" ? $("#txt_CLI_UnitNo").val() + ", " : "";
    floor = $("#txt_CLI_FloorNo").val() != "" ? $("#txt_CLI_FloorNo").val() + ", " : "";
    bldgno = $("#txt_CLI_BldgNo").val() != "" ? $("#txt_CLI_BldgNo").val() + ", " : "";
    bldgname = $("#txt_CLI_BuildingName").val() != "" ? $("#txt_CLI_BuildingName").val() + ", " : "";
    houseno = $("#txt_CLI_HouseNo").val() != "" ? $("#txt_CLI_HouseNo").val() + ", " : "";
    streetname = $("#txt_CLI_StreetName").val() != "" ? $("#txt_CLI_StreetName").val() + ", " : "";
    lot = $("#txt_CLI_Lot").val() != "" ? $("#txt_CLI_Lot").val() + ", " : "";
    block = $("#txt_CLI_Block").val() != "" ? $("#txt_CLI_Block").val() + ", " : "";
    phase = $("#txt_CLI_Phase").val() != "" ? $("#txt_CLI_Phase").val() + ", " : "";
    subv = $("#txt_CLI_Subdivision").val() != "" ? $("#txt_CLI_Subdivision").val() + ", " : "";
    zone = $("#txt_CLI_Zone").val() != "" ? $("#txt_CLI_Zone").val() + ", " : "";
    brgy = $("#descvallugCLIBarangay").val() != "" ? $("#descvallugCLIBarangay").val() + ", " : "";
    land = $("#txt_CLI_Landmark").val() != "" ? $("#txt_CLI_Landmark").val() + ", " : "";
    mnpy = $("#descvallugCLIMunicipality").val() != "" ? $("#descvallugCLIMunicipality").val() + ", " : "";
    prv = $("#descvallugCLIProvince").val() != "" ? $("#descvallugCLIProvince").val() + ", " : "";
    reg = $("#descvallugCLIRegion").val() != "" ? $("#descvallugCLIRegion").val() + ", " : "";
    cnty = $("#descvallugCLICountry").val() != "" ? $("#descvallugCLICountry").val() + ", " : "";
    zip = $("#txt_CLI_Zip").val().trim() != "" ? $("#txt_CLI_Zip").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_CLI_FullAddress").val(descText.trim().substring(0, descText.length - 2));
}

$(document).on("change", ".addchgBorrLocInfo2", function (e) {
    fulladdressBorrLocInfo2();
});

function fulladdressBorrLocInfo2() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_CLI_UnitNo2").val() != "" ? $("#txt_CLI_UnitNo2").val() + ", " : "";
    floor = $("#txt_CLI_FloorNo2").val() != "" ? $("#txt_CLI_FloorNo2").val() + ", " : "";
    bldgno = $("#txt_CLI_BldgNo2").val() != "" ? $("#txt_CLI_BldgNo2").val() + ", " : "";
    bldgname = $("#txt_CLI_BuildingName2").val() != "" ? $("#txt_CLI_BuildingName2").val() + ", " : "";
    houseno = $("#txt_CLI_HouseNo2").val() != "" ? $("#txt_CLI_HouseNo2").val() + ", " : "";
    streetname = $("#txt_CLI_StreetName2").val() != "" ? $("#txt_CLI_StreetName2").val() + ", " : "";
    lot = $("#txt_CLI_Lot2").val() != "" ? $("#txt_CLI_Lot2").val() + ", " : "";
    block = $("#txt_CLI_Block2").val() != "" ? $("#txt_CLI_Block2").val() + ", " : "";
    phase = $("#txt_CLI_Phase2").val() != "" ? $("#txt_CLI_Phase2").val() + ", " : "";
    subv = $("#txt_CLI_Subdivision2").val() != "" ? $("#txt_CLI_Subdivision2").val() + ", " : "";
    zone = $("#txt_CLI_Zone2").val() != "" ? $("#txt_CLI_Zone2").val() + ", " : "";
    brgy = $("#descvallugCLIBarangay2").val() != "" ? $("#descvallugCLIBarangay2").val() + ", " : "";
    land = $("#txt_CLI_Landmark2").val() != "" ? $("#txt_CLI_Landmark2").val() + ", " : "";
    mnpy = $("#descvallugCLIMunicipality2").val() != "" ? $("#descvallugCLIMunicipality2").val() + ", " : "";
    prv = $("#descvallugCLIProvince2").val() != "" ? $("#descvallugCLIProvince2").val() + ", " : "";
    reg = $("#descvallugCLIRegion2").val() != "" ? $("#descvallugCLIRegion2").val() + ", " : "";
    cnty = $("#descvallugCLICountry2").val() != "" ? $("#descvallugCLICountry2").val() + ", " : "";
    zip = $("#txt_CLI_Zip2").val().trim() != "" ? $("#txt_CLI_Zip2").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_CLI_FullAddress2").val(descText.trim().substring(0, descText.length - 2));
}

$(document).on("change", ".addchgSignaLocInfo", function (e) {
    fulladdressSignaLocInfo();
});

function fulladdressSignaLocInfo() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_SigLI_UnitNo").val() != "" ? $("#txt_SigLI_UnitNo").val() + ", " : "";
    floor = $("#txt_SigLI_FloorNo").val() != "" ? $("#txt_SigLI_FloorNo").val() + ", " : "";
    bldgno = $("#txt_SigLI_BldgNo").val() != "" ? $("#txt_SigLI_BldgNo").val() + ", " : "";
    bldgname = $("#txt_SigLI_BuildingName").val() != "" ? $("#txt_SigLI_BuildingName").val() + ", " : "";
    houseno = $("#txt_SigLI_HouseNo").val() != "" ? $("#txt_SigLI_HouseNo").val() + ", " : "";
    streetname = $("#txt_SigLI_StreetName").val() != "" ? $("#txt_SigLI_StreetName").val() + ", " : "";
    lot = $("#txt_SigLI_Lot").val() != "" ? $("#txt_SigLI_Lot").val() + ", " : "";
    block = $("#txt_SigLI_Block").val() != "" ? $("#txt_SigLI_Block").val() + ", " : "";
    phase = $("#txt_SigLI_Phase").val() != "" ? $("#txt_SigLI_Phase").val() + ", " : "";
    subv = $("#txt_SigLI_Subdivision").val() != "" ? $("#txt_SigLI_Subdivision").val() + ", " : "";
    zone = $("#txt_SigLI_Zone").val() != "" ? $("#txt_SigLI_Zone").val() + ", " : "";
    brgy = $("#descvallugSigLIBarangay").val() != "" ? $("#descvallugSigLIBarangay").val() + ", " : "";
    land = $("#txt_SigLI_Landmark").val() != "" ? $("#txt_SigLI_Landmark").val() + ", " : "";
    mnpy = $("#descvallugSigLIMunicipality").val() != "" ? $("#descvallugSigLIMunicipality").val() + ", " : "";
    prv = $("#descvallugSigLIProvince").val() != "" ? $("#descvallugSigLIProvince").val() + ", " : "";
    reg = $("#descvallugSigLIRegion").val() != "" ? $("#descvallugSigLIRegion").val() + ", " : "";
    cnty = $("#descvallugSigLICountry").val() != "" ? $("#descvallugSigLICountry").val() + ", " : "";
    zip = $("#txt_SigLI_Zip").val().trim() != "" ? $("#txt_SigLI_Zip").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_SigLI_FullAddress").val(descText.trim().substring(0, descText.length - 2));
}

$(document).on("change", ".addchgSignaLocInfo2", function (e) {
    fulladdressSignaLocInfo2();
});

function fulladdressSignaLocInfo2() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_SigLI_UnitNo2").val() != "" ? $("#txt_SigLI_UnitNo2").val() + ", " : "";
    floor = $("#txt_SigLI_FloorNo2").val() != "" ? $("#txt_SigLI_FloorNo2").val() + ", " : "";
    bldgno = $("#txt_SigLI_BldgNo2").val() != "" ? $("#txt_SigLI_BldgNo2").val() + ", " : "";
    bldgname = $("#txt_SigLI_BuildingName2").val() != "" ? $("#txt_SigLI_BuildingName2").val() + ", " : "";
    houseno = $("#txt_SigLI_HouseNo2").val() != "" ? $("#txt_SigLI_HouseNo2").val() + ", " : "";
    streetname = $("#txt_SigLI_StreetName2").val() != "" ? $("#txt_SigLI_StreetName2").val() + ", " : "";
    lot = $("#txt_SigLI_Lot2").val() != "" ? $("#txt_SigLI_Lot2").val() + ", " : "";
    block = $("#txt_SigLI_Block2").val() != "" ? $("#txt_SigLI_Block2").val() + ", " : "";
    phase = $("#txt_SigLI_Phase2").val() != "" ? $("#txt_SigLI_Phase2").val() + ", " : "";
    subv = $("#txt_SigLI_Subdivision2").val() != "" ? $("#txt_SigLI_Subdivision2").val() + ", " : "";
    zone = $("#txt_SigLI_Zone2").val() != "" ? $("#txt_SigLI_Zone2").val() + ", " : "";
    brgy = $("#descvallugSigLIBarangay2").val() != "" ? $("#descvallugSigLIBarangay2").val() + ", " : "";
    land = $("#txt_SigLI_Landmark2").val() != "" ? $("#txt_SigLI_Landmark2").val() + ", " : "";
    mnpy = $("#descvallugSigLIMunicipality2").val() != "" ? $("#descvallugSigLIMunicipality2").val() + ", " : "";
    prv = $("#descvallugSigLIProvince2").val() != "" ? $("#descvallugSigLIProvince2").val() + ", " : "";
    reg = $("#descvallugSigLIRegion2").val() != "" ? $("#descvallugSigLIRegion2").val() + ", " : "";
    cnty = $("#descvallugSigLICountry2").val() != "" ? $("#descvallugSigLICountry2").val() + ", " : "";
    zip = $("#txt_SigLI_Zip2").val().trim() != "" ? $("#txt_SigLI_Zip2").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_SigLI_FullAddress2").val(descText.trim().substring(0, descText.length - 2));
}


$(document).on("change", ".addchgAddressEmpInfo", function (e) {
    employmentAddressEmpInfo();
});


function employmentAddressEmpInfo() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_EI_UnitNo").val() != "" ? $("#txt_EI_UnitNo").val() + ", " : "";
    floor = $("#txt_EI_FloorNo").val() != "" ? $("#txt_EI_FloorNo").val() + ", " : "";
    bldgno = $("#txt_EI_BldgNo").val() != "" ? $("#txt_EI_BldgNo").val() + ", " : "";
    bldgname = $("#txt_EI_BldgName").val() != "" ? $("#txt_EI_BldgName").val() + ", " : "";
    houseno = $("#txt_EI_House").val() != "" ? $("#txt_EI_House").val() + ", " : "";
    streetname = $("#txt_EI_StreetName").val() != "" ? $("#txt_EI_StreetName").val() + ", " : "";
    lot = $("#txt_EI_Lot").val() != "" ? $("#txt_EI_Lot").val() + ", " : "";
    block = $("#txt_EI_Block").val() != "" ? $("#txt_EI_Block").val() + ", " : "";
    phase = $("#txt_EI_Phase").val() != "" ? $("#txt_EI_Phase").val() + ", " : "";
    subv = $("#txt_EI_Subdivision").val() != "" ? $("#txt_EI_Subdivision").val() + ", " : "";
    zone = $("#txt_EI_Zone").val() != "" ? $("#txt_EI_Zone").val() + ", " : "";
    brgy = $("#descvallugEIBarangay").val() != "" ? $("#descvallugEIBarangay").val() + ", " : "";
    land = "";
    mnpy = $("#descvallugEIMunicipality").val() != "" ? $("#descvallugEIMunicipality").val() + ", " : "";
    prv = $("#descvallugEIProvince").val() != "" ? $("#descvallugEIProvince").val() + ", " : "";
    reg = $("#descvallugEIRegion").val() != "" ? $("#descvallugEIRegion").val() + ", " : "";
    cnty = $("#descvallugEICountry").val() != "" ? $("#descvallugEICountry").val() + ", " : "";
    zip = $("#txt_EI_Zip").val().trim() != "" ? $("#txt_EI_Zip").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_EI_EmploymentAddress").val(descText.trim().substring(0, descText.length - 2));
}


$(document).on("change", ".addchgBussAddEmpInfo", function (e) {
    businessAddressEmpInfo();
});


function businessAddressEmpInfo() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_BI_UnitNo").val() != "" ? $("#txt_BI_UnitNo").val() + ", " : "";
    floor = $("#txt_BI_FloorNo").val() != "" ? $("#txt_BI_FloorNo").val() + ", " : "";
    bldgno = $("#txt_BI_BldgNo").val() != "" ? $("#txt_BI_BldgNo").val() + ", " : "";
    bldgname = $("#txt_BI_BldgName").val() != "" ? $("#txt_BI_BldgName").val() + ", " : "";
    houseno = $("#txt_BI_House").val() != "" ? $("#txt_BI_House").val() + ", " : "";
    streetname = $("#txt_BI_StreetName").val() != "" ? $("#txt_BI_StreetName").val() + ", " : "";
    lot = $("#txt_BI_Lot").val() != "" ? $("#txt_BI_Lot").val() + ", " : "";
    block = $("#txt_BI_Block").val() != "" ? $("#txt_BI_Block").val() + ", " : "";
    phase = $("#txt_BI_Phase").val() != "" ? $("#txt_BI_Phase").val() + ", " : "";
    subv = $("#txt_BI_Subdivision").val() != "" ? $("#txt_BI_Subdivision").val() + ", " : "";
    zone = $("#txt_BI_Zone").val() != "" ? $("#txt_BI_Zone").val() + ", " : "";
    brgy = $("#descvallugBIBarangay").val() != "" ? $("#descvallugBIBarangay").val() + ", " : "";
    land = "";
    mnpy = $("#descvallugBIMunicipality").val() != "" ? $("#descvallugBIMunicipality").val() + ", " : "";
    prv = $("#descvallugBIProvince").val() != "" ? $("#descvallugBIProvince").val() + ", " : "";
    reg = $("#descvallugBIRegion").val() != "" ? $("#descvallugBIRegion").val() + ", " : "";
    cnty = $("#descvallugBICountry").val() != "" ? $("#descvallugBICountry").val() + ", " : "";
    zip = $("#txt_BI_Zip").val().trim() != "" ? $("#txt_BI_Zip").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_BI_BusinessAddress").val(descText.trim().substring(0, descText.length - 2));
}


$(document).on("change", ".addchgEmpAddressBorrInfo", function (e) {
    employmentAddressBorrInfo();
});


function employmentAddressBorrInfo() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_CEI_UnitNo").val() != "" ? $("#txt_CEI_UnitNo").val() + ", " : "";
    floor = $("#txt_CEI_FloorNo").val() != "" ? $("#txt_CEI_FloorNo").val() + ", " : "";
    bldgno = $("#txt_CEI_BldgNo").val() != "" ? $("#txt_CEI_BldgNo").val() + ", " : "";
    bldgname = $("#txt_CEI_BldgName").val() != "" ? $("#txt_CEI_BldgName").val() + ", " : "";
    houseno = $("#txt_CEI_House").val() != "" ? $("#txt_CEI_House").val() + ", " : "";
    streetname = $("#txt_CEI_StreetName").val() != "" ? $("#txt_CEI_StreetName").val() + ", " : "";
    lot = $("#txt_CEI_Lot").val() != "" ? $("#txt_CEI_Lot").val() + ", " : "";
    block = $("#txt_CEI_Block").val() != "" ? $("#txt_CEI_Block").val() + ", " : "";
    phase = $("#txt_CEI_Phase").val() != "" ? $("#txt_CEI_Phase").val() + ", " : "";
    subv = $("#txt_CEI_Subdivision").val() != "" ? $("#txt_CEI_Subdivision").val() + ", " : "";
    zone = $("#txt_CEI_Zone").val() != "" ? $("#txt_CEI_Zone").val() + ", " : "";
    brgy = $("#descvallugCEIBarangay").val() != "" ? $("#descvallugCEIBarangay").val() + ", " : "";
    land = "";
    mnpy = $("#descvallugCEIMunicipality").val() != "" ? $("#descvallugCEIMunicipality").val() + ", " : "";
    prv = $("#descvallugCEIProvince").val() != "" ? $("#descvallugCEIProvince").val() + ", " : "";
    reg = $("#descvallugCEIRegion").val() != "" ? $("#descvallugCEIRegion").val() + ", " : "";
    cnty = $("#descvallugCEICountry").val() != "" ? $("#descvallugCEICountry").val() + ", " : "";
    zip = $("#txt_CEI_Zip").val().trim() != "" ? $("#txt_CEI_Zip").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_CEI_EmploymentAddress").val(descText.trim().substring(0, descText.length - 2));
}


$(document).on("change", ".addchgBussAddEmpInfo", function (e) {
    businessAddressBorrInfo();
});


function businessAddressBorrInfo() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_CBI_UnitNo").val() != "" ? $("#txt_CBI_UnitNo").val() + ", " : "";
    floor = $("#txt_CBI_FloorNo").val() != "" ? $("#txt_CBI_FloorNo").val() + ", " : "";
    bldgno = $("#txt_CBI_BldgNo").val() != "" ? $("#txt_CBI_BldgNo").val() + ", " : "";
    bldgname = $("#txt_CBI_BldgName").val() != "" ? $("#txt_CBI_BldgName").val() + ", " : "";
    houseno = $("#txt_CBI_House").val() != "" ? $("#txt_CBI_House").val() + ", " : "";
    streetname = $("#txt_CBI_StreetName").val() != "" ? $("#txt_CBI_StreetName").val() + ", " : "";
    lot = $("#txt_CBI_Lot").val() != "" ? $("#txt_CBI_Lot").val() + ", " : "";
    block = $("#txt_CBI_Block").val() != "" ? $("#txt_CBI_Block").val() + ", " : "";
    phase = $("#txt_CBI_Phase").val() != "" ? $("#txt_CBI_Phase").val() + ", " : "";
    subv = $("#txt_CBI_Subdivision").val() != "" ? $("#txt_CBI_Subdivision").val() + ", " : "";
    zone = $("#txt_CBI_Zone").val() != "" ? $("#txt_CBI_Zone").val() + ", " : "";
    brgy = $("#descvallugCBIBarangay").val() != "" ? $("#descvallugCBIBarangay").val() + ", " : "";
    land = "";
    mnpy = $("#descvallugCBIMunicipality").val() != "" ? $("#descvallugCBIMunicipality").val() + ", " : "";
    prv = $("#descvallugCBIProvince").val() != "" ? $("#descvallugCBIProvince").val() + ", " : "";
    reg = $("#descvallugCBIRegion").val() != "" ? $("#descvallugCBIRegion").val() + ", " : "";
    cnty = $("#descvallugCBICountry").val() != "" ? $("#descvallugCBICountry").val() + ", " : "";
    zip = $("#txt_CBI_Zip").val().trim() != "" ? $("#txt_CBI_Zip").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_CBI_BusinessAddress").val(descText.trim().substring(0, descText.length - 2));
}


$(document).on("change", ".addchgAddressEmpSpoInfo", function (e) {
    employmentAddressSpoInfo();
});


function employmentAddressSpoInfo() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_SEI_UnitNo").val() != "" ? $("#txt_SEI_UnitNo").val() + ", " : "";
    floor = $("#txt_SEI_FloorNo").val() != "" ? $("#txt_SEI_FloorNo").val() + ", " : "";
    bldgno = $("#txt_SEI_BldgNo").val() != "" ? $("#txt_SEI_BldgNo").val() + ", " : "";
    bldgname = $("#txt_SEI_BldgName").val() != "" ? $("#txt_SEI_BldgName").val() + ", " : "";
    houseno = $("#txt_SEI_House").val() != "" ? $("#txt_SEI_House").val() + ", " : "";
    streetname = $("#txt_SEI_StreetName").val() != "" ? $("#txt_SEI_StreetName").val() + ", " : "";
    lot = $("#txt_SEI_Lot").val() != "" ? $("#txt_SEI_Lot").val() + ", " : "";
    block = $("#txt_SEI_Block").val() != "" ? $("#txt_SEI_Block").val() + ", " : "";
    phase = $("#txt_SEI_Phase").val() != "" ? $("#txt_SEI_Phase").val() + ", " : "";
    subv = $("#txt_SEI_Subdivision").val() != "" ? $("#txt_SEI_Subdivision").val() + ", " : "";
    zone = $("#txt_SEI_Zone").val() != "" ? $("#txt_SEI_Zone").val() + ", " : "";
    brgy = $("#descvallugSEIBarangay").val() != "" ? $("#descvallugSEIBarangay").val() + ", " : "";
    land = "";
    mnpy = $("#descvallugSEIMunicipality").val() != "" ? $("#descvallugSEIMunicipality").val() + ", " : "";
    prv = $("#descvallugSEIProvince").val() != "" ? $("#descvallugSEIProvince").val() + ", " : "";
    reg = $("#descvallugSEIRegion").val() != "" ? $("#descvallugSEIRegion").val() + ", " : "";
    cnty = $("#descvallugSEICountry").val() != "" ? $("#descvallugSEICountry").val() + ", " : "";
    zip = $("#txt_SEI_Zip").val().trim() != "" ? $("#txt_SEI_Zip").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_SEI_EmploymentAddress").val(descText.trim().substring(0, descText.length - 2));
}


$(document).on("change", ".addchgSpoAddEmpInfo", function (e) {
    spouseAddressBorrInfo();
});


function spouseAddressBorrInfo() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_SBI_UnitNo").val() != "" ? $("#txt_SBI_UnitNo").val() + ", " : "";
    floor = $("#txt_SBI_FloorNo").val() != "" ? $("#txt_SBI_FloorNo").val() + ", " : "";
    bldgno = $("#txt_SBI_BldgNo").val() != "" ? $("#txt_SBI_BldgNo").val() + ", " : "";
    bldgname = $("#txt_SBI_BldgName").val() != "" ? $("#txt_SBI_BldgName").val() + ", " : "";
    houseno = $("#txt_SBI_House").val() != "" ? $("#txt_SBI_House").val() + ", " : "";
    streetname = $("#txt_SBI_StreetName").val() != "" ? $("#txt_SBI_StreetName").val() + ", " : "";
    lot = $("#txt_SBI_Lot").val() != "" ? $("#txt_SBI_Lot").val() + ", " : "";
    block = $("#txt_SBI_Block").val() != "" ? $("#txt_SBI_Block").val() + ", " : "";
    phase = $("#txt_SBI_Phase").val() != "" ? $("#txt_SBI_Phase").val() + ", " : "";
    subv = $("#txt_SBI_Subdivision").val() != "" ? $("#txt_SBI_Subdivision").val() + ", " : "";
    zone = $("#txt_SBI_Zone").val() != "" ? $("#txt_SBI_Zone").val() + ", " : "";
    brgy = $("#descvallugSBIBarangay").val() != "" ? $("#descvallugSBIBarangay").val() + ", " : "";
    land = "";
    mnpy = $("#descvallugSBIMunicipality").val() != "" ? $("#descvallugSBIMunicipality").val() + ", " : "";
    prv = $("#descvallugSBIProvince").val() != "" ? $("#descvallugSBIProvince").val() + ", " : "";
    reg = $("#descvallugSBIRegion").val() != "" ? $("#descvallugSBIRegion").val() + ", " : "";
    cnty = $("#descvallugSBICountry").val() != "" ? $("#descvallugSBICountry").val() + ", " : "";
    zip = $("#txt_SBI_Zip").val().trim() != "" ? $("#txt_SBI_Zip").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_SBI_BusinessAddress").val(descText.trim().substring(0, descText.length - 2));
}



$(document).on("change", ".addchgAddressEmpSigInfo", function (e) {
    employmentAddressSigInfo();
});


function employmentAddressSigInfo() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_SigEI_UnitNo").val() != "" ? $("#txt_SigEI_UnitNo").val() + ", " : "";
    floor = $("#txt_SigEI_FloorNo").val() != "" ? $("#txt_SigEI_FloorNo").val() + ", " : "";
    bldgno = $("#txt_SigEI_BldgNo").val() != "" ? $("#txt_SigEI_BldgNo").val() + ", " : "";
    bldgname = $("#txt_SigEI_BldgName").val() != "" ? $("#txt_SigEI_BldgName").val() + ", " : "";
    houseno = $("#txt_SigEI_House").val() != "" ? $("#txt_SigEI_House").val() + ", " : "";
    streetname = $("#txt_SigEI_StreetName").val() != "" ? $("#txt_SigEI_StreetName").val() + ", " : "";
    lot = $("#txt_SigEI_Lot").val() != "" ? $("#txt_SigEI_Lot").val() + ", " : "";
    block = $("#txt_SigEI_Block").val() != "" ? $("#txt_SigEI_Block").val() + ", " : "";
    phase = $("#txt_SigEI_Phase").val() != "" ? $("#txt_SigEI_Phase").val() + ", " : "";
    subv = $("#txt_SigEI_Subdivision").val() != "" ? $("#txt_SigEI_Subdivision").val() + ", " : "";
    zone = $("#txt_SigEI_Zone").val() != "" ? $("#txt_SigEI_Zone").val() + ", " : "";
    brgy = $("#descvallugSigEIBarangay").val() != "" ? $("#descvallugSigEIBarangay").val() + ", " : "";
    land = "";
    mnpy = $("#descvallugSigEIMunicipality").val() != "" ? $("#descvallugSigEIMunicipality").val() + ", " : "";
    prv = $("#descvallugSigEIProvince").val() != "" ? $("#descvallugSigEIProvince").val() + ", " : "";
    reg = $("#descvallugSigEIRegion").val() != "" ? $("#descvallugSigEIRegion").val() + ", " : "";
    cnty = $("#descvallugSigEICountry").val() != "" ? $("#descvallugSigEICountry").val() + ", " : "";
    zip = $("#txt_SigEI_Zip").val().trim() != "" ? $("#txt_SigEI_Zip").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_SigEI_EmploymentAddress").val(descText.trim().substring(0, descText.length - 2));
}


$(document).on("change", ".addchgSigAddBussInfo", function (e) {
    signaAddressBussInfo();
});


function signaAddressBussInfo() {
    var descText = "";

    var unit = '', floor = '', bldgno = '', bldgname = '', houseno = '', streetname = '', lot = '', block = '', phase = '', subv = '', zone = '', brgy = '', land = '', mnpy = '', prv = '', reg = '', cnty = '', zip = '';

    unit = $("#txt_SigBI_UnitNo").val() != "" ? $("#txt_SigBI_UnitNo").val() + ", " : "";
    floor = $("#txt_SigBI_FloorNo").val() != "" ? $("#txt_SigBI_FloorNo").val() + ", " : "";
    bldgno = $("#txt_SigBI_BldgNo").val() != "" ? $("#txt_SigBI_BldgNo").val() + ", " : "";
    bldgname = $("#txt_SigBI_BldgName").val() != "" ? $("#txt_SigBI_BldgName").val() + ", " : "";
    houseno = $("#txt_SigBI_House").val() != "" ? $("#txt_SigBI_House").val() + ", " : "";
    streetname = $("#txt_SigBI_StreetName").val() != "" ? $("#txt_SigBI_StreetName").val() + ", " : "";
    lot = $("#txt_SigBI_Lot").val() != "" ? $("#txt_SigBI_Lot").val() + ", " : "";
    block = $("#txt_SigBI_Block").val() != "" ? $("#txt_SigBI_Block").val() + ", " : "";
    phase = $("#txt_SigBI_Phase").val() != "" ? $("#txt_SigBI_Phase").val() + ", " : "";
    subv = $("#txt_SigBI_Subdivision").val() != "" ? $("#txt_SigBI_Subdivision").val() + ", " : "";
    zone = $("#txt_SigBI_Zone").val() != "" ? $("#txt_SigBI_Zone").val() + ", " : "";
    brgy = $("#descvallugSigBIBarangay").val() != "" ? $("#descvallugSigBIBarangay").val() + ", " : "";
    land = "";
    mnpy = $("#descvallugSigBIMunicipality").val() != "" ? $("#descvallugSigBIMunicipality").val() + ", " : "";
    prv = $("#descvallugSigBIProvince").val() != "" ? $("#descvallugSigBIProvince").val() + ", " : "";
    reg = $("#descvallugSigBIRegion").val() != "" ? $("#descvallugSigBIRegion").val() + ", " : "";
    cnty = $("#descvallugSigBICountry").val() != "" ? $("#descvallugSigBICountry").val() + ", " : "";
    zip = $("#txt_SigBI_Zip").val().trim() != "" ? $("#txt_SigBI_Zip").val() + ", " : "";
    //Unit No. Floor No., Bldg No., Bldg Name, House No., Street Name, Lot, Block, Phase, Subdivision, Zone, Barangay
    descText = descText.concat(unit, floor, bldgno, bldgname, land, houseno, streetname, lot, block, phase, subv, zone, brgy, mnpy, prv, reg, cnty, zip);

    $("#txt_SigBI_BusinessAddress").val(descText.trim().substring(0, descText.length - 2));
}


$(document).on("change", "#txt_ID_DateOfBirth", function (e) {
    var datepick = $("#txt_ID_DateOfBirth").val();
    var serverdate = $('#txtServerDate').val();


    if (Date.parse(datepick) > Date.parse(serverdate)) {
        $("#txt_ID_DateOfBirth").val('');
        parent_MessageBox("Cannot proceed. Date of Birth should not be later than current server date.", "Borrower Information", "error");  
        $(this).val(serverdate);
        $(this).focus();
    }

});

$(document).on("change", "#txt_OBI_StatmntDate", function (e) {
    var datepick = $("#txt_OBI_StatmntDate").val();
    var serverdate = $('#txtServerDate').val();


    if (Date.parse(datepick) > Date.parse(serverdate)) {
        $("#txt_OBI_StatmntDate").val('');
        parent_MessageBox("Cannot proceed. Statement Date should not allow date later than the current server date", "Borrower Information", "error");
        $(this).val(serverdate);
        $(this).focus();
    }

});


$(document).on("change", "#txt_SI_DateOfBirth", function (e) {
    var datepick = $("#txt_SI_DateOfBirth").val();
    var serverdate = $('#txtServerDate').val();


    if (Date.parse(datepick) > Date.parse(serverdate)) {
        $("#txt_SI_DateOfBirth").val('');
        parent_MessageBox("Cannot proceed. Date of Birth should not be later than current server date.", "Borrower Information", "error");  
        $(this).val(serverdate);
        $(this).focus();
    }

});

$(document).on("change", ".BR_dptDateTo", function (e) {
    var datepick = $(".BR_dptDateTo").val();
    var serverdate = $('#txtServerDate').val();


    if (Date.parse(datepick) > Date.parse(serverdate)) {
        $(".BR_dptDateTo").val('');
        parent_MessageBox("Cannot proceed. Effective Date should not be later than the current server date.", "Borrower Information", "error");
        $(this).val(serverdate);
        $(this).focus();
    }

});


function EffectiveDateValidation() {
    var effectivedate = $(".BR_dptDateTo").val();
    var serverdate = $("#txtServerDate").val();

    if (Date.parse(effectivedate) < Date.parse(serverdate)) {
        $('#noah-webui-Toolbox').bindingSave().enable(false);
        $('#noah-webui-Toolbox').bindingDelete().enable(false);
        $('#nwGridBenefOwnCon').enable(false);
        //$('#Copyfrom').enable(false);

    }
    else if (Date.parse(effectivedate) == Date.parse(serverdate)) {
        $('#noah-webui-Toolbox').bindingDelete().enable(false);
        $('#noah-webui-Toolbox').bindingSave().enable(true);
        $('#nwGridBenefOwnCon').enable(true);
        //$('#Copyfrom').enable(false);
        //$('.nwgrid_Delete').enable(false);
    }

    else {
        $('#noah-webui-default-Delete').enable(true);
        $('#noah-webui-Toolbox').bindingSave().enable(true);
        $('#nwGridMainCon').enable(true);
        //$('#Copyfrom').enable(true);
    }
}

function setGridData(nwGrid, type, col, row, val) {
    if (type == 'input')
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val(val);
    else
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text(val);
}

function getGridDataColumn(nwGrid, type, col, row) {
    var data = '';

    if (type == 'input')
        data = $(`#${nwGrid}-nwData td:eq(${col})`).find(`td:eq(${col}) input`).val();
    else
        data = $(`#${nwGrid}-nwData td:eq(${col})`).find(`td:eq(${col})`).text();

    return data;
}

function getGridData(nwGrid, type, col, row) {
    var data = '';

    if (type == 'input')
        data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val();
    else
        data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text();

    return data;
}



//$(document).on("change", ".nwInfoBirthdate", function () {
//    BirthDate(crnwTR.index());
//})

function BirthDate(row) {
    var FamInfoBirthdate = nwGridDependntInfoCon_Book.ActiveSheet.GetValue(SPR_Depnfo_Birthdate - 1, row);// getGridData('nwGridDependntInfo', 'input', SPR_Depnfo_Birthdate, row)
    var FamInfoBirthdeyt = new Date(FamInfoBirthdate);
    if (FamInfoBirthdeyt != '') {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var deytToday = mm + '/' + dd + '/' + yyyy;
        var deyt2day = new Date(deytToday);

        if (FamInfoBirthdeyt > deyt2day) {
            MessageBox("Cannot Proceed. Date of Birth should not be later than the current server date.", baseTitle);
            nwGridDependntInfoCon_Book.ActiveSheet.SetText(SPR_Depnfo_Birthdate - 1, row, deytToday);
            nwGridDependntInfoCon_Book.ActiveSheet.SetText(SPR_Depnfo_Age - 1, row, 0);
        }
        else {
            var dob = new Date(FamInfoBirthdate);
            var today = new Date();
            var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000)); //Age
            if (isNaN(age))
                age = "";

            nwGridDependntInfoCon_Book.ActiveSheet.SetText(SPR_Depnfo_Age - 1, row, age);
        }
    }
}


function getJsonBCD(ROWNO) {

    var jsonFilter = [];
    //check if may laman
    if (jsonSpouseDtl.length > 0) {
        jsonFilter = jsonSpouseDtl.filter(i => i["rowno"] === ROWNO);
    }

    if (jsonFilter.length > 0) {
        //populate fields
        $dtset.obj.custCode.val(jsonFilter[0]['communication'])
        $dtset.obj.lastName.val(jsonFilter[0]['value'])
    }
}



$(document).on("change", ".txt_SgInfo_DateBirth", function () {
    BirthDate2(crnwTR.index());
})

function BirthDate2(row) {
    var FamInfoBirthdate = getGridData('nwGridSigntrsInfo', 'input', SPR_SgInfo_DateBirth, row)
    var FamInfoBirthdeyt = new Date(FamInfoBirthdate);
    if (FamInfoBirthdeyt != '') {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var deytToday = mm + '/' + dd + '/' + yyyy;
        var deyt2day = new Date(deytToday);

        if (FamInfoBirthdeyt > deyt2day) {
            MessageBox("Cannot Proceed. Date of Birth should not be later than the current server date.", baseTitle);
            crnwTable.find('tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SgInfo_DateBirth + ') input').val(deytToday);
            //setGridData('nwGridDependntInfo', 'input', SPR_depnfo_Birthdate, row, '');
            //setGridData('nwGridDependntInfo', 'input', SPR_Depnfo_Age, row, '');
        }
        //else {
        //    dob = new Date(FamInfoBirthdate);
        //    var today = new Date();
        //    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000)); //Age
        //    //setGridData('nwGridDependntInfo', 'input', SPR_Depnfo_Age, row, age);
        //}
    }
}


//$(document).on("change", ".txt_SgInfo_DateBirth", function () {
//    BirthDate2(crnwTR.index());
//})

//function BirthDate2(row) {
//    var FamInfoBirthdate = getGridData('nwGridSigntrsInfo', 'input', SPR_SgInfo_DateBirth, row)
//    var FamInfoBirthdeyt = new Date(FamInfoBirthdate);
//    if (FamInfoBirthdeyt != '') {
//        var today = new Date();
//        var dd = today.getDate();
//        var mm = today.getMonth() + 1;

//        var yyyy = today.getFullYear();
//        if (dd < 10) {
//            dd = '0' + dd;
//        }
//        if (mm < 10) {
//            mm = '0' + mm;
//        }
//        var deytToday = mm + '/' + dd + '/' + yyyy;
//        var deyt2day = new Date(deytToday);

//        if (FamInfoBirthdeyt > deyt2day) {
//            MessageBox("Cannot Proceed. Date of Birth should not be later than the current server date.", baseTitle);
//            $(".txt_SgInfo_DateBirth").val('');
//            //setGridData('nwGridDependntInfo', 'input', SPR_Depnfo_Birthdate, row, '');
//            //setGridData('nwGridDependntInfo', 'input', SPR_Depnfo_Age, row, '');
//        }
//        //else {
//        //    dob = new Date(FamInfoBirthdate);
//        //    var today = new Date();
//        //    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000)); //Age
//        //    //setGridData('nwGridDependntInfo', 'input', SPR_Depnfo_Age, row, age);
//        //}
//    }
//}

$(document).on("change", ".txt_BR_BirthDate", function () {
    BirthDate3(crnwTR.index());
})

function BirthDate3(row) {
    var FamInfoBirthdate = getGridData('nwGridBenefOwn', 'input', SPR_BR_BirthDate, row)
    var FamInfoBirthdeyt = new Date(FamInfoBirthdate);
    if (FamInfoBirthdeyt != '') {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var deytToday = mm + '/' + dd + '/' + yyyy;
        var deyt2day = new Date(deytToday);

        if (FamInfoBirthdeyt > deyt2day) {
            MessageBox("Cannot Proceed. Date of Birth should not be later than the current server date.", baseTitle, "error");
            crnwTable.find('tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_BR_BirthDate + ') input').val(deytToday);
        }
    }
}


$(document).on("change", ".txt_BInfo_DateBirth", function () {
    BirthDate5(crnwTR.index());
})

function BirthDate5(row) {
    var FamInfoBirthdate = getGridData('nwGridBorrowerInfo', 'input', SPR_BInfo_DateBirth, row)
    var FamInfoBirthdeyt = new Date(FamInfoBirthdate);
    if (FamInfoBirthdeyt != '') {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var deytToday = mm + '/' + dd + '/' + yyyy;
        var deyt2day = new Date(deytToday);

        if (FamInfoBirthdeyt > deyt2day) {
            MessageBox("Cannot Proceed. Date of Birth should not be later than the current server date.", baseTitle);

            crnwTable.find('tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_BInfo_DateBirth + ') input').val(deytToday);

            //setGridData('nwGridDependntInfo', 'input', SPR_Depnfo_Birthdate, row, '');
            //setGridData('nwGridDependntInfo', 'input', SPR_Depnfo_Age, row, '');
        }
        //else {
        //    dob = new Date(FamInfoBirthdate);
        //    var today = new Date();
        //    var age = Math.floor((today - dob) / (365.25 * 24 * 60 * 60 * 1000)); //Age
        //    //setGridData('nwGridDependntInfo', 'input', SPR_Depnfo_Age, row, age);
        //}
    }
}


//$(document).on("change", ".nwInfoName", function () {
//    countDep(crnwTR.index());
//})

function countDep() {
    var maxRow = nwLib.nwTempTable_Row_Count("nwGridDependntInfoCon");
    var rela = "", name = "", dob = "", schEmp = "", val = "";
    $("#txtDependentsInfo").val(0);
    for (var i = 0; i < maxRow; i++) {
        val = $("#txtDependentsInfo").val();
        //$('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_effectiveFrom + ') input').val(formattedDate);

        
        rela = nwGridDependntInfoCon_Book.ActiveSheet.GetValue(SPR_Depnfo_Relation, i); //$('#nwGridDependntInfoCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Depnfo_Relation + ') ').text();
        name = nwGridDependntInfoCon_Book.ActiveSheet.GetValue(SPR_Depnfo_Name, i); //$('#nwGridDependntInfoCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Depnfo_Name + ') input').val();
        dob = nwGridDependntInfoCon_Book.ActiveSheet.GetValue(SPR_Depnfo_Birthdate, i); //$('#nwGridDependntInfoCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Depnfo_Birthdate + ') input').val();
        schEmp = nwGridDependntInfoCon_Book.ActiveSheet.GetValue(SPR_Depnfo_School, i); //$('#nwGridDependntInfoCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_Depnfo_School + ') input').val();

        if (rela != "" || name != "" || dob != "" || schEmp != "") {
            $("#txtDependentsInfo").val(parseInt(val) + 1);
        }
        if($("#txtDependentsInfo").val()==0)
        {
            $("#txtDependentsInfo").val('')
        }

    }
}

$(document).on("change", "#nwGridDependntInfoCon", function () {
    countDep();
})

$(document).on("click", "#nwGridDependntInfoCon .nwgrid_Delete", function () {
    countDep();
})
 

function getGridDataReq(nwGrid, type, col, row) {
    var data = '';

    if (type == 'input')
        data = $(`#${nwGrid2}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val();
    else
        data = $(`#${nwGrid2}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text();

    return data;
}

//function BirthDate(row) {
//    var FamInfoBirthdate = getGridDataReq('nwGridIndData', 'input', SPR_Depnfo_Birthdate, row)
//    var FamInfoBirthdeyt = new Date(FamInfoBirthdate);
//    if (FamInfoBirthdeyt != '') {

//    }
//}
//spread.nwobject(SPR_IDV_IDcode - 1).ColumnName("Communication Type");
//m_spread.nwobject(SPR_IDV_IDdesc - 1).ColumnName("Communication Type Desc");
//m_spread.nwobject(SPR_IDV_IDno 


$(document).on("change", "#cbPresentAdd", function (e) {
    //PERMANENT ADDRESS
    isChklocInfo();
});

function isChklocInfo() {
    if ($('#cbPresentAdd').is(":checked")) {
        $("#lugLIHomeOwnrshp2").enable(false);
        $("#txt_LI_FullAddress2").enable(false);
        $("#idvallugLIHomeOwnrshp2").enable(false);
        $("#desvallugLIHomeOwnrshp2").enable(false);
        $("#txt_LI_LengthStay2").enable(false);
        $("#txt_LI_UnitNo2").enable(false);
        $("#txt_LI_FloorNo2").enable(false);
        $("#txt_LI_BldgNo2").enable(false);
        $("#txt_LI_BuildingName2").enable(false);
        $("#txt_LI_Landmark2").prop("disabled", true)
        $("#txt_LI_HouseNo2").enable(false);
        $("#txt_LI_StreetName2").enable(false);
        $("#txt_LI_Lot2").enable(false);
        $("#txt_LI_Block2").enable(false);
        $("#txt_LI_Phase2").enable(false);
        $("#txt_LI_Subdivision2").enable(false);
        $("#txt_LI_Zone2").enable(false);
        $("#idvallugLIBarangay2").enable(false);
        $("#desvallugLIBarangay2").enable(false);
        $("#idvallugLIMunicipality2").enable(false);
        $("#desvallugLIMunicipality2").enable(false);
        $("#idvallugLIProvince2").enable(false);
        $("#desvallugLIProvince2").enable(false);
        $("#idvallugLIRegion2").enable(false);
        $("#desvallugLIRegion2").enable(false);
        $("#idvallugLICountry2").enable(false);
        $("#desvallugLICountry2").enable(false);
        $("#txt_LI_Zip2").enable(false);
        $("#lugLIBarangay2").enable(false);
        $("#lugLIMunicipality2").enable(false);
        $("#lugLIProvince2").enable(false);
        $("#lugLIRegion2").enable(false);
        $("#lugLICountry2").enable(false);
        $("#cb_LI_FullAddress2").prop("disabled", true).prop("checked",false);
        

        $("#lugLIHomeOwnrshp2").val('');
        $("#idvallugLIHomeOwnrshp2").val('');
        $("#descvallugLIHomeOwnrshp2").val('');
        $("#txt_LI_FullAddress2").val('');
        $("#txt_LI_LengthStay2").val('');
        $("#txt_LI_UnitNo2").val('');
        $("#txt_LI_FloorNo2").val('');
        $("#txt_LI_BldgNo2").val('');
        $("#txt_LI_BuildingName2").val('');
        $("#txt_LI_Landmark2").val('');
        $("#txt_LI_HouseNo2").val('');
        $("#txt_LI_StreetName2").val('');
        $("#txt_LI_Lot2").val('');
        $("#txt_LI_Block2").val('');
        $("#txt_LI_Phase2").val('');
        $("#txt_LI_Subdivision2").val('');
        $("#txt_LI_Zone2").val('');
        $("#idvallugLIBarangay2").val('');
        $("#descvallugLIBarangay2").val('');
        $("#idvallugLIMunicipality2").val('');
        $("#descvallugLIMunicipality2").val('');
        $("#idvallugLIProvince2").val('');
        $("#descvallugLIProvince2").val('');
        $("#idvallugLIRegion2").val('');
        $("#descvallugLIRegion2").val('');
        $("#idvallugLICountry2").val('');
        $("#descvallugLICountry2").val('');
        $("#txt_LI_Zip2").val('');
        $("#lugLIBarangay2").val('');
        $("#lugLIMunicipality2").val('');
        $("#lugLIProvince2").val('');
        $("#lugLIRegion2").val('');
        $("#lugLICountry2").val('');

    } else {
            
        if ($('#rdbInd').is(':checked'))
            $("#lugLIHomeOwnrshp2").enable(true);


        $("#idvallugLIHomeOwnrshp2").enable(true);
        $("#desvallugLIHomeOwnrshp2").enable(true);
        $("#txt_LI_LengthStay2").enable(true);
        $("#txt_LI_UnitNo2").enable(true);
        $("#txt_LI_FloorNo2").enable(true);
        $("#txt_LI_BldgNo2").enable(true);
        $("#txt_LI_BuildingName2").enable(true);
        $("#txt_LI_Landmark2").prop("disabled", false)
        $("#txt_LI_HouseNo2").enable(true);
        $("#txt_LI_StreetName2").enable(true);
        $("#txt_LI_Lot2").enable(true);
        $("#txt_LI_Block2").enable(true);
        $("#txt_LI_Phase2").enable(true);
        $("#txt_LI_Subdivision2").enable(true);
        $("#txt_LI_Zone2").enable(true);
        $("#txt_LI_Zip2").enable(true);
        $("#idvallugLIBarangay2").enable(true);
        $("#desvallugLIBarangay2").enable(true);
        $("#idvallugLIMunicipality2").enable(true);
        $("#desvallugLIMunicipality2").enable(true);
        $("#idvallugLIProvince2").enable(true);
        $("#desvallugLIProvince2").enable(true);
        $("#idvallugLIRegion2").enable(true);
        $("#desvallugLIRegion2").enable(true);
        $("#idvallugLICountry2").enable(true);
        $("#desvallugLICountry2").enable(true);
        $("#lugLIBarangay2").enable(true);
        $("#lugLIMunicipality2").enable(true);
        $("#lugLIProvince2").enable(true);
        $("#lugLIRegion2").enable(true);
        $("#lugLICountry2").enable(true);
        $("#cb_LI_FullAddress2").enable(true);
    }

}

$(document).on("change", "#cbSLIPresentAdd", function (e) {
    //PERMANENT ADDRESS
    isChkSLIlocInfo();
});

function isChkSLIlocInfo() {
    if ($('#cbSLIPresentAdd').is(":checked")) {
        $("#lugSLIHomeOwnrshp2").enable(false);
        $("#idvallugSLIHomeOwnrshp2").enable(false);
        $("#desvallugSLIHomeOwnrshp2").enable(false);
        $("#txt_SLI_FullAddress2").enable(false);
        $("#txt_SLI_LengthStay2").enable(false);
        $("#txt_SLI_UnitNo2").enable(false);
        $("#txt_SLI_FloorNo2").enable(false);
        $("#txt_SLI_BldgNo2").enable(false);
        $("#txt_SLI_BuildingName2").enable(false);
        $("#txt_SLI_Landmark2").prop("disabled", true)
        $("#txt_SLI_HouseNo2").enable(false);
        $("#txt_SLI_StreetName2").enable(false);
        $("#txt_SLI_Lot2").enable(false);
        $("#txt_SLI_Block2").enable(false);
        $("#txt_SLI_Phase2").enable(false);
        $("#txt_SLI_Subdivision2").enable(false);
        $("#txt_SLI_Zone2").enable(false);
        $("#idvallugSLIBarangay2").enable(false);
        $("#desvallugSLIBarangay2").enable(false);
        $("#idvallugSLIMunicipality2").enable(false);
        $("#desvallugSLIMunicipality2").enable(false);
        $("#idvallugSLIProvince2").enable(false);
        $("#desvallugSLIProvince2").enable(false);
        $("#idvallugSLIRegion2").enable(false);
        $("#desvallugSLIRegion2").enable(false);
        $("#idvallugSLICountry2").enable(false);
        $("#desvallugSLICountry2").enable(false);
        $("#txt_SLI_Zip2").enable(false);
        $("#lugSLIBarangay2").enable(false);
        $("#lugSLIMunicipality2").enable(false);
        $("#lugSLIProvince2").enable(false);
        $("#lugSLIRegion2").enable(false);
        $("#lugSLICountry2").enable(false);
        $("#cb_SLI_FullAddress2").prop("disabled", true).prop("checked",false);

        $("#lugSLIHomeOwnrshp2").val('');
        $("#idvallugSLIHomeOwnrshp2").val('');
        $("#descvallugSLIHomeOwnrshp2").val(''); 
        $("#txt_SLI_FullAddress2").val(''); 
        $("#txt_SLI_LengthStay2").val('');
        $("#txt_SLI_UnitNo2").val('');
        $("#txt_SLI_FloorNo2").val('');
        $("#txt_SLI_BldgNo2").val('');
        $("#txt_SLI_BuildingName2").val('');
        $("#txt_SLI_Landmark2").val('');
        $("#txt_SLI_HouseNo2").val('');
        $("#txt_SLI_StreetName2").val('');
        $("#txt_SLI_Lot2").val('');
        $("#txt_SLI_Block2").val('');
        $("#txt_SLI_Phase2").val('');
        $("#txt_SLI_Subdivision2").val('');
        $("#txt_SLI_Zone2").val('');
        $("#idvallugSLIBarangay2").val('');
        $("#descvallugSLIBarangay2").val('');
        $("#idvallugSLIMunicipality2").val('');
        $("#descvallugSLIMunicipality2").val('');
        $("#idvallugSLIProvince2").val('');
        $("#descvallugSLIProvince2").val('');
        $("#idvallugSLIRegion2").val('');
        $("#descvallugSLIRegion2").val('');
        $("#idvallugSLICountry2").val('');
        $("#descvallugSLICountry2").val('');
        $("#txt_SLI_Zip2").val('');
        $("#lugSLIBarangay2").val('');
        $("#lugSLIMunicipality2").val('');
        $("#lugSLIProvince2").val('');
        $("#lugSLIRegion2").val('');
        $("#lugSLICountry2").val('');
    } else {
        $("#lugSLIHomeOwnrshp2").enable(true);
        $("#idvallugSLIHomeOwnrshp2").enable(true);
        $("#desvallugSLIHomeOwnrshp2").enable(true);
        //$("#txt_SLI_FullAddress2").enable(true);
        $("#txt_SLI_LengthStay2").enable(true);
        $("#txt_SLI_UnitNo2").enable(true);
        $("#txt_SLI_FloorNo2").enable(true);
        $("#txt_SLI_BldgNo2").enable(true);
        $("#txt_SLI_BuildingName2").enable(true);
        $("#txt_SLI_Landmark2").prop("disabled", false)
        $("#txt_SLI_HouseNo2").enable(true);
        $("#txt_SLI_StreetName2").enable(true);
        $("#txt_SLI_Lot2").enable(true);
        $("#txt_SLI_Block2").enable(true);
        $("#txt_SLI_Phase2").enable(true);
        $("#txt_SLI_Subdivision2").enable(true);
        $("#txt_SLI_Zone2").enable(true);
        $("#idvallugSLIBarangay2").enable(true);
        $("#desvallugSLIBarangay2").enable(true);
        $("#idvallugSLIMunicipality2").enable(true);
        $("#desvallugSLIMunicipality2").enable(true);
        $("#idvallugSLIProvince2").enable(true);
        $("#desvallugSLIProvince2").enable(true);
        $("#idvallugSLIRegion2").enable(true);
        $("#desvallugSLIRegion2").enable(true);
        $("#idvallugSLICountry2").enable(true);
        $("#desvallugSLICountry2").enable(true);
        $("#txt_SLI_Zip2").enable(true);
        $("#lugSLIBarangay2").enable(true);
        $("#lugSLIMunicipality2").enable(true);
        $("#lugSLIProvince2").enable(true);
        $("#lugSLIRegion2").enable(true);
        $("#lugSLICountry2").enable(true);
        $("#cb_SLI_FullAddress2").enable(true);
    }

}

$(document).on("click", "#cbCLIPresentAdd", function (e) {
    //PERMANENT ADDRESS
    isChkCLIlocInfo();
});

function isChkCLIlocInfo() {
    if ($('#cbCLIPresentAdd').is(":checked")) {
        $("#lugCLIHomeOwnrshp2").enable(false);
        $("#idvallugCLIHomeOwnrshp2").enable(false);
        $("#desvallugCLIHomeOwnrshp2").enable(false);
        //$("#txt_CLI_FullAddress2").enable(false);
        $("#txt_CLI_LengthStay2").enable(false);
        $("#txt_CLI_UnitNo2").enable(false);
        $("#txt_CLI_FloorNo2").enable(false);
        $("#txt_CLI_BldgNo2").enable(false);
        $("#txt_CLI_BuildingName2").enable(false);
        $("#txt_CLI_Landmark2").prop("disabled", true)
        $("#txt_CLI_HouseNo2").enable(false);
        $("#txt_CLI_StreetName2").enable(false);
        $("#txt_CLI_Lot2").enable(false);
        $("#txt_CLI_Block2").enable(false);
        $("#txt_CLI_Phase2").enable(false);
        $("#txt_CLI_Subdivision2").enable(false);
        $("#txt_CLI_Zone2").enable(false);
        $("#idvallugCLIBarangay2").enable(false);
        $("#desvallugCLIBarangay2").enable(false);
        $("#idvallugCLIMunicipality2").enable(false);
        $("#desvallugCLIMunicipality2").enable(false); 
        $("#idvallugCLIProvince2").enable(false);
        $("#desvallugCLIProvince2").enable(false);
        $("#idvallugCLIRegion2").enable(false);
        $("#desvallugCLIRegion2").enable(false);
        $("#idvallugCLICountry2").enable(false);
        $("#desvallugCLICountry2").enable(false);
        $("#txt_CLI_Zip2").enable(true);
        $("#lugCLIBarangay2").enable(false);
        $("#lugCLIMunicipality2").enable(false);
        $("#lugCLIProvince2").enable(false);
        $("#lugCLIRegion2").enable(false);
        $("#lugCLICountry2").enable(false);
        $("#txt_CLI_Zip2").enable(false);
        $("#cb_CLI_FullAddress2").enable(false);
        //Clear Fields
        $("#lugCLIHomeOwnrshp2").val('');
        $("#idvallugCLIHomeOwnrshp2").val('');
        $("#descvallugCLIHomeOwnrshp2").val('');
        $("#txt_CLI_FullAddress2").val('');
        $("#txt_CLI_LengthStay2").val('');
        $("#txt_CLI_UnitNo2").val('');
        $("#txt_CLI_FloorNo2").val('');
        $("#txt_CLI_BldgNo2").val('');
        $("#txt_CLI_BuildingName2").val('');
        $("#txt_CLI_Landmark2").val('');
        $("#txt_CLI_HouseNo2").val('');
        $("#txt_CLI_StreetName2").val('');
        $("#txt_CLI_Lot2").val('');
        $("#txt_CLI_Block2").val('');
        $("#txt_CLI_Phase2").val('');
        $("#txt_CLI_Subdivision2").val('');
        $("#txt_CLI_Zone2").val('');
        $("#idvallugCLIBarangay2").val('');
        $("#descvallugCLIBarangay2").val('');
        $("#idvallugCLIMunicipality2").val('');
        $("#descvallugCLIMunicipality2").val('');
        $("#idvallugCLIProvince2").val('');
        $("#descvallugCLIProvince2").val('');
        $("#idvallugCLIRegion2").val('');
        $("#descvallugCLIRegion2").val('');
        $("#idvallugCLICountry2").val('');
        $("#descvallugCLICountry2").val('');
        $("#txt_CLI_Zip2").val('');
        $("#lugCLIBarangay2").val('');
        $("#lugCLIMunicipality2").val('');
        $("#lugCLIProvince2").val('');
        $("#lugCLIRegion2").val('');
        $("#lugCLICountry2").val('');
    } else {
        $("#lugCLIHomeOwnrshp2").enable(true);
        //$("#idvallugCLIHomeOwnrshp2").enable(true);
        //$("#descvallugCLIHomeOwnrshp2").enable(true);
        //$("#txt_CLI_FullAddress2").enable(true);
        $("#txt_CLI_LengthStay2").enable(true);
        $("#txt_CLI_UnitNo2").enable(true);
        $("#txt_CLI_FloorNo2").enable(true);
        $("#txt_CLI_BldgNo2").enable(true);
        $("#txt_CLI_BuildingName2").enable(true);
        $("#txt_CLI_Landmark2").prop("disabled", false)
        $("#txt_CLI_HouseNo2").enable(true);
        $("#txt_CLI_StreetName2").enable(true);
        $("#txt_CLI_Lot2").enable(true);
        $("#txt_CLI_Block2").enable(true);
        $("#txt_CLI_Phase2").enable(true);
        $("#txt_CLI_Subdivision2").enable(true);
        $("#txt_CLI_Zone2").enable(true);
        //$("#idvallugCLIBarangay2").enable(true);
        //$("#descvallugCLIBarangay2").enable(true);
        //$("#idvallugCLIMunicipality2").enable(true);
        //$("#descvallugCLIMunicipalIty2").enable(true);
        //$("#idvallugCLIProvince2").enable(true);
        //$("#descvallugCLIProvince2").enable(true);
        //$("#idvallugCLIRegion2").enable(true);
        //$("#descvallugCLIRegion2").enable(true);
        //$("#idvallugCLICountry2").enable(true);
        //$("#descvallugCLICountry2").enable(true);
        $("#lugCLIBarangay2").enable(true);
        $("#lugCLIMunicipality2").enable(true);
        $("#lugCLIProvince2").enable(true);
        $("#lugCLIRegion2").enable(true);
        $("#lugCLICountry2").enable(true);
        $("#txt_CLI_Zip2").enable(true);
        $("#cb_CLI_FullAddress2").enable(true);
    }

}
$(document).on("click", "#cb_LI_FullAddress", function (e) {
    isChkFullAdd();
});

function isChkFullAdd() {

    if ($('#cb_LI_FullAddress').is(":checked"))
    {
        $("#txt_LI_FullAddress").enable(true);

        $("#txt_LI_Subdivision").enable(false);
        $("#txt_LI_StreetName").enable(false);
        $("#txt_LI_UnitNo").enable(false);
        $("#txt_LI_FloorNo").enable(false);
        $("#txt_LI_BldgNo").enable(false);
        $("#txt_LI_BuildingName").enable(false);
        $("#txt_LI_HouseNo").enable(false);
        $("#txt_LI_Lot").enable(false);
        $("#txt_LI_Block").enable(false);
        $("#txt_LI_Phase").enable(false);
        $("#txt_LI_Zone").enable(false);
        $("#lugLIBarangay").enable(false);
        //$("#lugLIMunicipality").enable(true);
        $("#txt_LI_Landmark").enable(false);
        
        $("#nwReq_txt_LI_Landmark").hide();
        $("#txt_LI_Landmark").val('')
        $("#txt_LI_Subdivision").val('')
        $("#txt_LI_StreetName").val('')
        $("#txt_LI_UnitNo").val('')
        $("#txt_LI_FloorNo").val('')
        $("#txt_LI_BldgNo").val('')
        $("#txt_LI_BuildingName").val('')
        $("#txt_LI_HouseNo").val('')
        $("#txt_LI_Lot").val('')
        $("#txt_LI_Block").val('')
        $("#txt_LI_Phase").val('')
        $("#txt_LI_Zone").val('')
        $("#txt_LI_Zip").val('')
        $("#idvallugLIBarangay").val('')
        $("#descvallugLIBarangay").val('')


    } else {
        $("#txt_LI_FullAddress").enable(false);

        $("#txt_LI_Subdivision").enable(true);
        $("#txt_LI_StreetName").enable(true);
        $("#txt_LI_UnitNo").enable(true);
        $("#txt_LI_FloorNo").enable(true);
        $("#txt_LI_BldgNo").enable(true);
        $("#txt_LI_BuildingName").enable(true);
        $("#txt_LI_HouseNo").enable(true);
        $("#txt_LI_Lot").enable(true);
        $("#txt_LI_Block").enable(true);
        $("#txt_LI_Phase").enable(true);
        $("#txt_LI_Zone").enable(true);
        $("#lugLIBarangay").enable(true);
        //$("#lugLIMunicipality").enable(false);
        $("#txt_LI_Landmark").enable(true);

        $("#nwReq_txt_LI_Landmark").show();
        //$("#txt_LI_FullAddress").val(''); 
        //$("#txt_LI_Zip").val('')
    }
}

$(document).on("click", "#cb_LI_FullAddress2", function (e) {
    isChkFullAdd2();
});

function isChkFullAdd2() {
    if ($('#cb_LI_FullAddress2').is(":checked")) {
        $("#txt_LI_FullAddress2").enable(true);
        $("#txt_LI_Subdivision2").enable(false);
        $("#txt_LI_StreetName2").enable(false);
        $("#txt_LI_UnitNo2").enable(false);
        $("#txt_LI_FloorNo2").enable(false);
        $("#txt_LI_BldgNo2").enable(false);
        $("#txt_LI_BuildingName2").enable(false);
        $("#txt_LI_HouseNo2").enable(false);
        $("#txt_LI_Lot2").enable(false);
        $("#txt_LI_Block2").enable(false);
        $("#txt_LI_Phase2").enable(false);
        $("#txt_LI_Zone2").enable(false);
        $("#txt_LI_Landmark2").enable(false);
        $("#lugLIBarangay2").enable(false);
        $("#nwReq_txt_LI_Landmark2").hide();

        $("#txt_LI_Subdivision2").val('')
        $("#txt_LI_StreetName2").val('')
        $("#txt_LI_UnitNo2").val('')
        $("#txt_LI_FloorNo2").val('')
        $("#txt_LI_BldgNo2").val('')
        $("#txt_LI_BuildingName2").val('')
        $("#txt_LI_HouseNo2").val('')
        $("#txt_LI_Lot2").val('')
        $("#txt_LI_Block2").val('')
        $("#txt_LI_Phase2").val('')
        $("#txt_LI_Zone2").val('')
        $("#txt_LI_Zip2").val('')
        $("#txt_LI_Landmark2").val('')
        $("#idvallugLIBarangay2").val('')
        $("#descvallugLIBarangay2").val('')
    } else {
        $("#txt_LI_FullAddress2").enable(false);

        $("#txt_LI_Subdivision2").enable(true);
        $("#txt_LI_StreetName2").enable(true);
        $("#txt_LI_UnitNo2").enable(true);
        $("#txt_LI_FloorNo2").enable(true);
        $("#txt_LI_BldgNo2").enable(true);
        $("#txt_LI_BuildingName2").enable(true);
        $("#txt_LI_HouseNo2").enable(true);
        $("#txt_LI_Lot2").enable(true);
        $("#txt_LI_Block2").enable(true);
        $("#txt_LI_Phase2").enable(true);
        $("#txt_LI_Zone2").enable(true);
        $("#txt_LI_Landmark2").enable(true);
        $("#lugLIBarangay2").enable(true);
        //$("#lugLIMunicipality2").enable(true);

        $("#nwReq_txt_LI_Landmark2").show();
  
    }
}
$(document).on("change", "#cb_CLI_FullAddress", function (e) {
    isChkFullAdd3();
});

function isChkFullAdd3() {
    if ($('#cb_CLI_FullAddress').is(":checked")) {
        $("#txt_CLI_FullAddress").enable(true);


        $("#txt_CLI_Subdivision").enable(false);
        $("#txt_CLI_StreetName").enable(false);
        $("#txt_CLI_UnitNo").enable(false);
        $("#txt_CLI_FloorNo").enable(false);
        $("#txt_CLI_BldgNo").enable(false);
        $("#txt_CLI_BuildingName").enable(false);
        $("#txt_CLI_HouseNo").enable(false);
        $("#txt_CLI_Lot").enable(false);
        $("#txt_CLI_Block").enable(false);
        $("#txt_CLI_Phase").enable(false);
        $("#txt_CLI_Zone").enable(false);
        $("#txt_CLI_Landmark").enable(false);
        $("#lugCLIBarangay").enable(false);

        //$("#lugCLIMunicipality").enable(true);
        $("#txt_CLI_Subdivision").val('');
        $("#txt_CLI_StreetName").val('');
        $("#txt_CLI_UnitNo").val('');
        $("#txt_CLI_FloorNo").val('');
        $("#txt_CLI_BldgNo").val('');
        $("#txt_CLI_BuildingName").val('');
        $("#txt_CLI_HouseNo").val('');
        $("#txt_CLI_Lot").val('');
        $("#txt_CLI_Block").val('');
        $("#txt_CLI_Phase").val('');
        $("#txt_CLI_Zone").val('');
        $("#idvallugCLIBarangay").val('');
        $("#descvallugCLIBarangay").val('');
        $("#txt_CLI_Landmark").val('');

        $("#nwReq_txt_CLI_Landmark").hide();

    } else {
        $("#txt_CLI_FullAddress").enable(false);

        $("#txt_CLI_Subdivision").enable(true);
        $("#txt_CLI_StreetName").enable(true);
        $("#txt_CLI_UnitNo").enable(true);
        $("#txt_CLI_FloorNo").enable(true);
        $("#txt_CLI_BldgNo").enable(true);
        $("#txt_CLI_BuildingName").enable(true);
        $("#txt_CLI_HouseNo").enable(true);
        $("#txt_CLI_Lot").enable(true);
        $("#txt_CLI_Block").enable(true);
        $("#txt_CLI_Phase").enable(true);
        $("#txt_CLI_Zone").enable(true);
        $("#txt_CLI_Landmark").enable(true);

        //$("#lugCLIMunicipality").enable(false);
        $("#lugCLIBarangay").enable(true);

        $("txt_CLI_Landmark").val('');
        $("#idvallugCLIMunicipality").val('');
        $("#descvallugCLIMunicipality").val('');
        $("#idvallugCLIProvince").val('');
        $("#descvallugCLIProvince").val('');
        $("#idvallugCLIRegion").val('');
        $("#descvallugCLIRegion").val('');
        $("#idvallugCLICountry").val('');
        $("#descvallugCLICountry").val('');
        $("#txt_CLI_Zip").val('');

        $("#nwReq_txt_CLI_Landmark").show();
    }
}


$(document).on("click", "#cb_CLI_FullAddress2", function (e) {
    isChkFullAdd4();
});

function isChkFullAdd4() {
    if ($('#cb_CLI_FullAddress2').is(":checked")) {
        $("#txt_CLI_FullAddress2").enable(true);


        $("#txt_CLI_Subdivision2").enable(false);
        $("#txt_CLI_StreetName2").enable(false);
        $("#txt_CLI_UnitNo2").enable(false);
        $("#txt_CLI_FloorNo2").enable(false);
        $("#txt_CLI_BldgNo2").enable(false);
        $("#txt_CLI_BuildingName2").enable(false);
        $("#txt_CLI_HouseNo2").enable(false);
        $("#txt_CLI_Lot2").enable(false);
        $("#txt_CLI_Block2").enable(false);
        $("#txt_CLI_Phase2").enable(false);
        $("#txt_CLI_Zone2").enable(false);
        $("#txt_CLI_Landmark2").enable(false);
        $("#lugCLIBarangay2").enable(false);

        //$("#lugCLIMunicipality2").enable(true);
        $("#txt_CLI_Subdivision2").val('');
        $("#txt_CLI_StreetName2").val('');
        $("#txt_CLI_UnitNo2").val('');
        $("#txt_CLI_FloorNo2").val('');
        $("#txt_CLI_BldgNo2").val('');
        $("#txt_CLI_BuildingName2").val('');
        $("#txt_CLI_HouseNo2").val('');
        $("#txt_CLI_Lot2").val('');
        $("#txt_CLI_Block2").val('');
        $("#txt_CLI_Phase2").val('');
        $("#txt_CLI_Zone2").val('');
        $("#idvallugCLIBarangay2").val('');
        $("#descvallugCLIBarangay2").val('');
        $("#txt_CLI_Landmark2").val('');

        $("#nwReq_txt_CLI_Landmark2").hide();

    } else {

        $("#txt_CLI_FullAddress2").enable(false);

        $("#txt_CLI_Subdivision2").enable(true);
        $("#txt_CLI_StreetName2").enable(true);
        $("#txt_CLI_UnitNo2").enable(true);
        $("#txt_CLI_FloorNo2").enable(true);
        $("#txt_CLI_BldgNo2").enable(true);
        $("#txt_CLI_BuildingName2").enable(true);
        $("#txt_CLI_HouseNo2").enable(true);
        $("#txt_CLI_Lot2").enable(true);
        $("#txt_CLI_Block2").enable(true);
        $("#txt_CLI_Phase2").enable(true);
        $("#txt_CLI_Zone2").enable(true);
        $("#txt_CLI_Landmark2").enable(true);

        //$("#lugCLIMunicipality2").enable(false);
        $("#lugCLIBarangay2").enable(true);

        $("txt_CLI_Landmark2").val('');
        $("#idvallugCLIMunicipality2").val('');
        $("#descvallugCLIMunicipality2").val('');
        $("#idvallugCLIProvince2").val('');
        $("#descvallugCLIProvince2").val('');
        $("#idvallugCLIRegion2").val('');
        $("#descvallugCLIRegion2").val('');
        $("#idvallugCLICountry2").val('');
        $("#descvallugCLICountry2").val('');
        $("#txt_CLI_Zip2").val('');

        $("#nwReq_txt_CLI_Landmark2").show();
    }
}

$(document).on("click", "#cb_SigLI_FullAddress", function (e) {
    isChkFullAdd5();
});

function isChkFullAdd5() {
    if ($('#cb_SigLI_FullAddress').is(":checked")) {
        $("#txt_SigLI_FullAddress").enable(true);

        $("#txt_SigLI_Subdivision").enable(false);
        $("#txt_SigLI_StreetName").enable(false);
        $("#txt_SigLI_UnitNo").enable(false);
        $("#txt_SigLI_FloorNo").enable(false);
        $("#txt_SigLI_BldgNo").enable(false);
        $("#txt_SigLI_BuildingName").enable(false);
        $("#txt_SigLI_HouseNo").enable(false);
        $("#txt_SigLI_Lot").enable(false);
        $("#txt_SigLI_Block").enable(false);
        $("#txt_SigLI_Phase").enable(false);
        $("#txt_SigLI_Zone").enable(false);

        $("#lugSigLIBarangay").enable(false);

        $('#txt_SigLI_Landmark').enable(false);

        $("#txt_SigLI_Subdivision").val('')
        $("#txt_SigLI_StreetName").val('')
        $("#txt_SigLI_UnitNo").val('')
        $("#txt_SigLI_FloorNo").val('')
        $("#txt_SigLI_BldgNo").val('')
        $("#txt_SigLI_BuildingName").val('')
        $("#txt_SigLI_HouseNo").val('')
        $("#txt_SigLI_Lot").val('')
        $("#txt_SigLI_Block").val('')
        $("#txt_SigLI_Phase").val('')
        $("#txt_SigLI_Zone").val('')
        $("#txt_SigLI_Zip").val('')
        $("#txt_SigLI_Landmark").val('')
        $("#idvallugLIBarangay").val('')
        $("#descvallugLIBarangay").val('')

        $('#nwReq_txt_SigLI_Landmark').hide();

    } else {
        $("#txt_SigLI_FullAddress").enable(false);

        $("#txt_SigLI_Subdivision").enable(true);
        $("#txt_SigLI_StreetName").enable(true);
        $("#txt_SigLI_UnitNo").enable(true);
        $("#txt_SigLI_FloorNo").enable(true);
        $("#txt_SigLI_BldgNo").enable(true);
        $("#txt_SigLI_BuildingName").enable(true);
        $("#txt_SigLI_HouseNo").enable(true);
        $("#txt_SigLI_Lot").enable(true);
        $("#txt_SigLI_Block").enable(true);
        $("#txt_SigLI_Phase").enable(true);
        $("#txt_SigLI_Zone").enable(true);

        $("#lugSigLIBarangay").enable(true);
        $('#txt_SigLI_Landmark').enable(true);
        $('#nwReq_txt_SigLI_Landmark').show();
    }
}

$(document).on("click", "#cb_SigLI_FullAddress2", function (e) {
    isChkFullAdd6();
});

function isChkFullAdd6() {
    if ($('#cb_SigLI_FullAddress2').is(":checked")) {
        $("#txt_SigLI_FullAddress2").enable(true);

        $("#txt_SigLI_Subdivision2").enable(false);
        $("#txt_SigLI_StreetName2").enable(false);
        $("#txt_SigLI_UnitNo2").enable(false);
        $("#txt_SigLI_FloorNo2").enable(false);
        $("#txt_SigLI_BldgNo2").enable(false);
        $("#txt_SigLI_BuildingName2").enable(false);
        $("#txt_SigLI_HouseNo2").enable(false);
        $("#txt_SigLI_Lot2").enable(false);
        $("#txt_SigLI_Block2").enable(false);
        $("#txt_SigLI_Phase2").enable(false);
        $("#txt_SigLI_Zone2").enable(false);

        $("#lugSigLIBarangay2").enable(false);

        $('#txt_SigLI_Landmark2').enable(false);

        $("#txt_SigLI_Subdivision2").val('')
        $("#txt_SigLI_StreetName2").val('')
        $("#txt_SigLI_UnitNo2").val('')
        $("#txt_SigLI_FloorNo2").val('')
        $("#txt_SigLI_BldgNo2").val('')
        $("#txt_SigLI_BuildingName2").val('')
        $("#txt_SigLI_HouseNo2").val('')
        $("#txt_SigLI_Lot2").val('')
        $("#txt_SigLI_Block2").val('')
        $("#txt_SigLI_Phase2").val('')
        $("#txt_SigLI_Zone2").val('')
        $("#txt_SigLI_Zip2").val('')
        $("#txt_SigLI_Landmark2").val('')
        $("#idvallugLIBarangay2").val('')
        $("#descvallugLIBarangay2").val('')

        $('#nwReq_txt_SigLI_Landmark2').hide();

    } else {
        $("#txt_SigLI_FullAddress2").enable(false);

        $("#txt_SigLI_Subdivision2").enable(true);
        $("#txt_SigLI_StreetName2").enable(true);
        $("#txt_SigLI_UnitNo2").enable(true);
        $("#txt_SigLI_FloorNo2").enable(true);
        $("#txt_SigLI_BldgNo2").enable(true);
        $("#txt_SigLI_BuildingName2").enable(true);
        $("#txt_SigLI_HouseNo2").enable(true);
        $("#txt_SigLI_Lot2").enable(true);
        $("#txt_SigLI_Block2").enable(true);
        $("#txt_SigLI_Phase2").enable(true);
        $("#txt_SigLI_Zone2").enable(true);

        $("#lugSigLIBarangay2").enable(true);
        $('#txt_SigLI_Landmark2').enable(true);
        $('#nwReq_txt_SigLI_Landmark2').show();
    }
}

$(document).on("click", "#cb_SLI_FullAddress", function (e) {
    isChkFullAdd7();
});

function isChkFullAdd7() {
    if ($('#cb_SLI_FullAddress').is(":checked")) {
        $("#txt_SLI_FullAddress").enable(true);


        $("#txt_SLI_Subdivision").enable(false);
        $("#txt_SLI_StreetName").enable(false);
        $("#txt_SLI_UnitNo").enable(false);
        $("#txt_SLI_FloorNo").enable(false);
        $("#txt_SLI_BldgNo").enable(false);
        $("#txt_SLI_BuildingName").enable(false);
        $("#txt_SLI_HouseNo").enable(false);
        $("#txt_SLI_Lot").enable(false);
        $("#txt_SLI_Block").enable(false);
        $("#txt_SLI_Phase").enable(false);
        $("#txt_SLI_Zone").enable(false);
        $("#txt_SLI_Landmark").enable(false);
        $("#lugSLIBarangay").enable(false);

        //$("#lugSLIMunicipality").enable(true);

        $("#txt_SLI_Subdivision").val('')
        $("#txt_SLI_StreetName").val('')
        $("#txt_SLI_UnitNo").val('')
        $("#txt_SLI_FloorNo").val('')
        $("#txt_SLI_BldgNo").val('')
        $("#txt_SLI_BuildingName").val('')
        $("#txt_SLI_HouseNo").val('')
        $("#txt_SLI_Lot").val('')
        $("#txt_SLI_Block").val('')
        $("#txt_SLI_Phase").val('')
        $("#txt_SLI_Zone").val('')
        $("#txt_SLI_Zip").val('')
        $("#idvallugSLIBarangay").val('')
        $("#descvallugSLIBarangay").val('');
        $("#txt_SLI_Landmark").val('');

        $("#nwReq_txt_SLI_Landmark").hide();
    } else {
        $("#txt_SLI_FullAddress").enable(false);

        $("#txt_SLI_Subdivision").enable(true);
        $("#txt_SLI_StreetName").enable(true);
        $("#txt_SLI_UnitNo").enable(true);
        $("#txt_SLI_FloorNo").enable(true);
        $("#txt_SLI_BldgNo").enable(true);
        $("#txt_SLI_BuildingName").enable(true);
        $("#txt_SLI_HouseNo").enable(true);
        $("#txt_SLI_Lot").enable(true);
        $("#txt_SLI_Block").enable(true);
        $("#txt_SLI_Phase").enable(true);
        $("#txt_SLI_Zone").enable(true);
        $("#txt_SLI_Landmark").enable(true);
        $("#lugSLIBarangay").enable(true);
        //$("#lugSLIMunicipality").enable(false);

        $("#nwReq_txt_SLI_Landmark").show();
    }
}

$(document).on("click", "#cb_SLI_FullAddress2", function (e) {
    isChkFullAdd8();
});

function isChkFullAdd8() {
    if ($('#cb_SLI_FullAddress2').is(":checked")) {
        $("#txt_SLI_FullAddress2").enable(true);
      
        $("#txt_SLI_Subdivision2").enable(false);
        $("#txt_SLI_StreetName2").enable(false);
        $("#txt_SLI_UnitNo2").enable(false);
        $("#txt_SLI_FloorNo2").enable(false);
        $("#txt_SLI_BldgNo2").enable(false);
        $("#txt_SLI_BuildingName2").enable(false);
        $("#txt_SLI_HouseNo2").enable(false);
        $("#txt_SLI_Lot2").enable(false);
        $("#txt_SLI_Block2").enable(false);
        $("#txt_SLI_Phase2").enable(false);
        $("#txt_SLI_Zone2").enable(false);
        $("#txt_SLI_Landmark2").enable(false);
        $("#lugSLIBarangay2").enable(false);
        //$("#lugSLIMunicipality2").enable(true);

        $("#txt_SLI_Subdivision2").val('')
        $("#txt_SLI_StreetName2").val('')
        $("#txt_SLI_UnitNo2").val('')
        $("#txt_SLI_FloorNo2").val('')
        $("#txt_SLI_BldgNo2").val('')
        $("#txt_SLI_BuildingName2").val('')
        $("#txt_SLI_HouseNo2").val('')
        $("#txt_SLI_Lot2").val('')
        $("#txt_SLI_Block2").val('')
        $("#txt_SLI_Phase2").val('')
        $("#txt_SLI_Zone2").val('')
        $("#txt_SLI_Zip2").val('')
        $("#idvallugSLIBarangay2").val('')
        $("#descvallugSLIBarangay2").val('');
        $("#txt_SLI_Landmark2").val('');

        $("#nwReq_txt_SLI_Landmark2").hide();
    } else {
        $("#txt_SLI_FullAddress2").enable(false);

        $("#txt_SLI_Subdivision2").enable(true);
        $("#txt_SLI_StreetName2").enable(true);
        $("#txt_SLI_UnitNo2").enable(true);
        $("#txt_SLI_FloorNo2").enable(true);
        $("#txt_SLI_BldgNo2").enable(true);
        $("#txt_SLI_BuildingName2").enable(true);
        $("#txt_SLI_HouseNo2").enable(true);
        $("#txt_SLI_Lot2").enable(true);
        $("#txt_SLI_Block2").enable(true);
        $("#txt_SLI_Phase2").enable(true);
        $("#txt_SLI_Zone2").enable(true);
        $("#txt_SLI_Landmark2").enable(true);
        $("#lugSLIBarangay2").enable(true);
        //$("#lugSLIMunicipality2").enable(false);

        $("#nwReq_txt_SLI_Landmark").show();
    }
}


$(document).on("click", "#cbSigLIPresentAdd", function (e) {
    //PERMANENT ADDRESS
    isChkSigLIlocInfo();
});



function isChkSigLIlocInfo() {
    if ($('#cbSigLIPresentAdd').is(":checked")) {
        $("#lugSigLIHomeOwnrshp2").enable(false);
        $("#idvallugSigLIHomeOwnrshp2").enable(false);
        $("#desvallugSigLIHomeOwnrshp2").enable(false);
        $("#txt_SigLI_FullAddress2").enable(false);
        $("#txt_SigLI_LengthStay2").enable(false);
        $("#txt_SigLI_UnitNo2").enable(false);
        $("#txt_SigLI_FloorNo2").enable(false);
        $("#txt_SigLI_BldgNo2").enable(false);
        $("#txt_SigLI_BuildingName2").enable(false);
        $("#txt_SigLI_Landmark2").prop("disabled", true)
        $("#txt_SigLI_HouseNo2").enable(false);
        $("#txt_SigLI_StreetName2").enable(false);
        $("#txt_SigLI_Lot2").enable(false);
        $("#txt_SigLI_Block2").enable(false);
        $("#txt_SigLI_Phase2").enable(false);
        $("#txt_SigLI_Subdivision2").enable(false);
        $("#txt_SigLI_Zone2").enable(false);
        $("#idvallugSigLIBarangay2").enable(false);
        $("#desvallugSigLIBarangay2").enable(false);
        $("#idvallugSigLIMunicipality2").enable(false);
        $("#desvallugSigLIMunicipality2").enable(false);
        $("#idvallugSigLIProvince2").enable(false);
        $("#desvallugSigLIProvince2").enable(false);
        $("#idvallugSigLIRegion2").enable(false);
        $("#desvallugSigLIRegion2").enable(false);
        $("#idvallugSigLICountry2").enable(false);
        $("#desvallugSigLICountry2").enable(false);
        $("#txt_SigLI_Zip2").enable(false);
        $("#lugSigLIBarangay2").enable(false);
        $("#lugSigLIMunicipality2").enable(false);
        $("#lugSigLIProvince2").enable(false);
        $("#lugSigLIRegion2").enable(false);
        $("#lugSigLICountry2").enable(false);
        $("#cb_SigLI_FullAddress2").enable(false);
        //Clear fields
        $("#lugSigLIHomeOwnrshp2").val('');
        $("#idvallugSigLIHomeOwnrshp2").val('');
        $("#descvallugSigLIHomeOwnrshp2").val('');
        $("#txt_SigLI_FullAddress2").val('');
        $("#txt_SigLI_LengthStay2").val('');
        $("#txt_SigLI_UnitNo2").val('');
        $("#txt_SigLI_FloorNo2").val('');
        $("#txt_SigLI_BldgNo2").val('');
        $("#txt_SigLI_BuildingName2").val('');
        $("#txt_SigLI_Landmark2").val('');
        $("#txt_SigLI_HouseNo2").val('');
        $("#txt_SigLI_StreetName2").val('');
        $("#txt_SigLI_Lot2").val('');
        $("#txt_SigLI_Block2").val('');
        $("#txt_SigLI_Phase2").val('');
        $("#txt_SigLI_Subdivision2").val('');
        $("#txt_SigLI_Zone2").val('');
        $("#idvallugSigLIBarangay2").val('');
        $("#descvallugSigLIBarangay2").val('');
        $("#idvallugSigLIMunicipality2").val('');
        $("#descvallugSigLIMunicipality2").val('');
        $("#idvallugSigLIProvince2").val('');
        $("#descvallugSigLIProvince2").val('');
        $("#idvallugSigLIRegion2").val('');
        $("#descvallugSigLIRegion2").val('');
        $("#idvallugSigLICountry2").val('');
        $("#descvallugSigLICountry2").val('');
        $("#txt_SigLI_Zip2").val('');
        $("#lugSigLIBarangay2").val('');
        $("#lugSigLIMunicipality2").val('');
        $("#lugSigLIProvince2").val('');
        $("#lugSigLIRegion2").val('');
        $("#lugSigLICountry2").val('');
    } else {
        $("#lugSigLIHomeOwnrshp2").enable(true);
        //$("#idvallugSigLIHomeOwnrshp2").enable(true);
        //$("#descvallugSigLIHomeOwnrshp2").enable(true);
        $("#txt_SigLI_FullAddress2").enable(true);
        $("#txt_SigLI_LengthStay2").enable(true);
        $("#txt_SigLI_UnitNo2").enable(true);
        $("#txt_SigLI_FloorNo2").enable(true);
        $("#txt_SigLI_BldgNo2").enable(true);
        $("#txt_SigLI_BuildingName2").enable(true);
        $("#txt_SigLI_Landmark2").prop("disabled", false)
        $("#txt_SigLI_HouseNo2").enable(true);
        $("#txt_SigLI_StreetName2").enable(true);
        $("#txt_SigLI_Lot2").enable(true);
        $("#txt_SigLI_Block2").enable(true);
        $("#txt_SigLI_Phase2").enable(true);
        $("#txt_SigLI_Subdivision2").enable(true);
        $("#txt_SigLI_Zone2").enable(true);
        //$("#idvallugSigLIBarangay2").enable(true);
        //$("#descvallugSigLIBarangay2").enable(true);
        //$("#idvallugSigLIMunicipality2").enable(true);
        //$("#descvallugSigLIMunicipality2").enable(true);
        //$("#idvallugSigLIProvince2").enable(true);
        //$("#descvallugSigLIProvince2").enable(true);
        //$("#idvallugSigLIRegion2").enable(true);
        //$("#descvallugSigLIRegion2").enable(true);
        //$("#idvallugSigLICountry2").enable(true);
        //$("#descvallugSigLICountry2").enable(true);
        $("#lugSigLIBarangay2").enable(true);
        $("#lugSigLIMunicipality2").enable(true);
        $("#lugSigLIProvince2").enable(true);
        $("#lugSigLIRegion2").enable(true);
        $("#lugSigLICountry2").enable(true);
        $("#cb_SigLI_FullAddress2").enable(true);
    }

}

$(document).on('click', '#btnReqCompliance', function () {
    //var trantype = $("#txtTranType").val();
    var trantype = 'BRWINF';
    var docno = $('#txtApprovalID').val();
    var refdocno = $('#idvallugEvent').val();
    var isView = (nwDocno != '' || $('#txtStatusForEntry').val() != '1') ? 'true' : 'false';
    var Title = "Requirements Compliance";

    if (docno == "") {
        MessageBox("Cannot proceed. Data should be saved first", Title, "error");
        return false;
    }

    var fullength = GetCurrentURL() + "../DCRequirementCompliance?TransactionNo=" + docno + "&TranType=" + trantype + "&nwApplyTo=" + refdocno + "&isView=" + isView;

    nwLoading_Start('xbtnReqCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpReqComplianceHdr", true, fullength);
    $('#nwPopUpReqComplianceHdr .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpReqComplianceHdr").css({ "min-width": "98%" });
    $("#nwPopUpReqComplianceHdr").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpReqComplianceHdr");
    nwLoading_End('xbtnReqCompliance');

    return false;
});


$(document).on('click', '#btnReqComplianceSpouse', function () {
    //var trantype = $("#txtTranType").val();
    var trantype = 'BSPSIN';
    var docno = $('#txtApprovalID').val();
    var refdocno = $('#idvallugEvent').val();
    var isView = (nwDocno != '' || $('#txtStatusForEntry').val() != '1') != '' ? 'true' : 'false';
    if (docno == "") {
        MessageBox("Cannot proceed. Data should be saved first", Title, "error");
        return false;
    }

    var fullength = GetCurrentURL() + "../DCRequirementCompliance?TransactionNo=" + docno + "&TranType=" + trantype + "&nwApplyTo=" + refdocno + "&isView=" + isView;

    nwLoading_Start('xbtnReqSpoCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpReqSpoComplianceHdr", true, fullength);
    $('#nwPopUpReqSpoComplianceHdr .BoxTitle').text("Requirements Compliance");
    $("#nwPopUpReqSpoComplianceHdr").css({ "min-width": "98%" });
    $("#nwPopUpReqSpoComplianceHdr").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpReqSpoComplianceHdr");
    nwLoading_End('xbtnReqSpoCompliance');


    return false;
});

function ChkIfHasAttachment() {
    $(`#nwGrid2-nwData tr`).each(function (i, n) {
        var $row = $(n);
            $row.find(`td:eq(${SPR_DOCDETAILSCODEHDR}) text`).val;
    });
}

//function reqData(row) {
//    var ind = getGridData('nwGridIndCon', 'input', SPR_IDV_IDdesc, row)

//    $('#nwGrid2 .tblGridBody tr td:nth-child(7) ').text();

//    setGridData('nwGridIndCon', 'input', SPR_IDV_IDdesc, row);
//}



function PropnwGridContactInfo() {
    if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
        $('#nwGridContactInfoCon').enable(false);
        return;
    } else {
        $('#nwGridContactInfoCon').enable(true);
    }

    crnwTable = $("#nwGridContactInfoCon .tblGridBody tbody ");

    var length = nwGridConCustom_Book.ActiveSheet.GetMaxRow();

    for (var i = 0; i < length; i++) {
        contactInp((i + 1));
    }


}


function PropnwGridSpouseConInfo() {
    if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
        $('#nwGridSpouseConInfoCon').enable(false);
        return;
    } else {
        $('#nwGridSpouseConInfoCon').enable(true);
    }


    crnwTable = $("#nwGridSpouseConInfoCon .tblGridBody tbody ");

    var length = crnwTable.find("tr").length;

    for (var i = 0; i < length; i++) {
        contactInp2((i + 1));
    }


}

function PropnwGridDependntInfo() {
    if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
        $('#nwGridDependntInfoCon').enable(false);
        return;
    } else {
        $('#nwGridDependntInfoCon').enable(true);
    }
}


function PropnwGridOthSrcIncInfo() {
    if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
        $('#nwGridOthSrcIncInfoCon').enable(false);
        return;
    } else {
        $('#nwGridOthSrcIncInfoCon').enable(true);
    }
}

function PropnwGridBorrOthSrcIncInfo() {
    if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
        $('#nwGridBorrOthSrcIncInfoCon').enable(false);
        return;
    } else {
        $('#nwGridBorrOthSrcIncInfoCon').enable(true);
    }
}

function PropnwGridBenefOwn() {
    if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
        $('#nwGridBenefOwnCon').enable(false);
        return;
    } else {
        $('#nwGridBenefOwnCon').enable(true);
    }
}



function PropnwGridCoBorrowerContactInfo() {
    if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
        $('#nwGridCoBorrowerContactInfoCon').enable(false);
        return;
    } else {
        $('#nwGridCoBorrowerContactInfoCon').enable(true);
    }


    //crnwTable = $("#nwGridCoBorrowerContactInfoCon .tblGridBody tbody ");

    var length = nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.GetMaxRow();//crnwTable.find("tr").length;

    for (var i = 0; i < length; i++) {
        contactInp3((i + 1));
    }


}

function PropnwGridSigntryContactDtls() {
    if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
        $('#nwGridSigntryContactDtlsCon').enable(false);
        return;
    } else {
        $('#nwGridSigntryContactDtlsCon').enable(true);
    }



    //crnwTable = $("#nwGridSigntryContactDtlsCon .tblGridBody tbody ");

    var length = nwGridSigntryContactDtlsCon_Book.ActiveSheet.GetMaxRow();//crnwTable.find("tr").length;

    for (var i = 0; i < length; i++) {
        contactInp4((i + 1));
    }


}



function PropnwGridCon() {
    var length = nwGridBorrowerInfoCon_Book.ActiveSheet.GetMaxRow();

    nwGridBorrowerInfoCon_Book.ActiveSheet.ColumnConfig[SPR_BInfo_Opsadilco - 1].CheckBoxShow = false;
    nwGridBorrowerInfoCon_Book.ActiveSheet.ColumnConfig[SPR_BInfo_Politic - 1].CheckBoxShow = false;

    nwGridBorrowerInfoCon_Book.ActiveSheet.SetText2(SPR_BInfo_ReqCom - 1, Spread_ALLROW, "...");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetTextAlign(SPR_BInfo_ReqCom - 1, Spread_ALLROW, "center");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetBold(SPR_BInfo_ReqCom - 1, Spread_ALLROW, "bold");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetTextColor(SPR_BInfo_ReqCom - 1, Spread_ALLROW, "white");

    nwGridBorrowerInfoCon_Book.ActiveSheet.SetText2(SPR_BInfo_ContctDetails - 1, Spread_ALLROW, "...");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetTextAlign(SPR_BInfo_ContctDetails - 1, Spread_ALLROW, "center");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetBold(SPR_BInfo_ContctDetails - 1, Spread_ALLROW, "bold");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetTextColor(SPR_BInfo_ContctDetails - 1, Spread_ALLROW, "white");

    nwGridBorrowerInfoCon_Book.ActiveSheet.SetText2(SPR_BInfo_LocDetails - 1, Spread_ALLROW, "...");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetTextAlign(SPR_BInfo_LocDetails - 1, Spread_ALLROW, "center");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetBold(SPR_BInfo_LocDetails - 1, Spread_ALLROW, "bold");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetTextColor(SPR_BInfo_LocDetails - 1, Spread_ALLROW, "white");

    nwGridBorrowerInfoCon_Book.ActiveSheet.SetText2(SPR_BInfo_EmpInfo - 1, Spread_ALLROW, "...");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetTextAlign(SPR_BInfo_EmpInfo - 1, Spread_ALLROW, "center");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetBold(SPR_BInfo_EmpInfo - 1, Spread_ALLROW, "bold");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetTextColor(SPR_BInfo_EmpInfo - 1, Spread_ALLROW, "white");

    nwGridBorrowerInfoCon_Book.ActiveSheet.SetText2(SPR_BInfo_BusInfor - 1, Spread_ALLROW, "...");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetTextAlign(SPR_BInfo_BusInfor - 1, Spread_ALLROW, "center");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetBold(SPR_BInfo_BusInfor - 1, Spread_ALLROW, "bold");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetTextColor(SPR_BInfo_BusInfor - 1, Spread_ALLROW, "white");

    nwGridBorrowerInfoCon_Book.ActiveSheet.SetText2(SPR_BInfo_OthSrc - 1, Spread_ALLROW, "...");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetTextAlign(SPR_BInfo_OthSrc - 1, Spread_ALLROW, "center");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetBold(SPR_BInfo_OthSrc - 1, Spread_ALLROW, "bold");
    nwGridBorrowerInfoCon_Book.ActiveSheet.SetTextColor(SPR_BInfo_OthSrc - 1, Spread_ALLROW, "white");

    for (var i = 0; i < length; i++) {
        var rctag = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_RCTAG - 1, i);// crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_BInfo_RCTAG + ')').text();
        var lineID = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_LINEID - 1, i); //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_BInfo_LINEID + ')').text();
        var con = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_ConTAG - 1, i);// crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_BInfo_ConTAG + ')').text();
        var loc = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_LocTAG - 1, i); //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_BInfo_LocTAG + ')').text();
        var emp = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_EmpTAG - 1, i); //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_BInfo_EmpTAG + ')').text();
        var buss = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_BusTAG - 1, i); //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_BInfo_BusTAG + ')').text();
        var oth = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_OthSrcTag - 1, i); //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_BInfo_OthSrcTag + ')').text();
        
        var docno = $("#txtBorrowersCode").val();

        if (lineID != ''){
            if (docno != '') {
                if (rctag == '1') {
                    nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_ReqCom - 1, i, true);
                    nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_ReqCom - 1, i, "green");
                } else {
                    nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_ReqCom - 1, i, true);
                    nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_ReqCom - 1, i, "orange");
                }
            }
        } else {
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_ReqCom - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_ReqCom - 1, i, "gray");
        }
        


        if (lineID != '') {
            if (con == '1') {
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_ContctDetails - 1 , i, true);
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_ContctDetails - 1, i, "green");
            } else {
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_ContctDetails - 1, i, true);
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_ContctDetails - 1, i, "orange");
            }
        } else {
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_ContctDetails - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_ContctDetails - 1, i, "gray");
        }

        if (lineID != '') {
            if (loc != '') {
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_LocDetails - 1, i, true);
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_LocDetails - 1, i, "green");
            } else {
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_LocDetails - 1, i, true);
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_LocDetails - 1, i, "orange");
            }
        } else {
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_LocDetails - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_LocDetails - 1, i, "gray");
        }

        if (lineID != '') {
            if (emp == '1') {
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_EmpInfo - 1, i, true);
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_EmpInfo - 1, i, "green");
            } else {
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_EmpInfo - 1, i, true);
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_EmpInfo - 1, i, "orange");
            }
        } else {
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_EmpInfo - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_EmpInfo - 1, i, "gray");
        }

        if (lineID != '') {
            if (buss == '1') {
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_BusInfor - 1, i, true);
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_BusInfor - 1, i, "green");
            } else {
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_BusInfor - 1, i, true);
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_BusInfor - 1, i, "orange");
            }
        } else {
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_BusInfor - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_BusInfor - 1, i, "gray");
        }


        if (lineID != '') {
            if (oth == '1') {
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_OthSrc - 1, i, true);
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_OthSrc - 1, i, "green");
            } else {
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_OthSrc - 1, i, true);
                nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_OthSrc - 1, i, "orange");
            }
        } else {
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_OthSrc - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_OthSrc - 1, i, "gray");
        }


        var ispolitic = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_Politic - 1, i);

        if (ispolitic == '1') {
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_Politicposition - 1, i, true);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Politicposition - 1, i, "cyan");
        } else {
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_Politicposition - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Politicposition - 1, i, "gainsboro");
        }


        if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_RelationShipDesc - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_RelationShipDesc - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_Salutation - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Salutation - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_LName - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_LName - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_Fname - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Fname - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_MName - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_MName - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_MtherMname - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_MtherMname - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_namesuffix - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_namesuffix - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_DateBirth - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_DateBirth - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_PlaceBirth - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_PlaceBirth - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_Gender - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Gender - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_maritalstatus - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_maritalstatus - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_Nationality - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Nationality - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_Opsadilco - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Opsadilco - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_Politic - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Politic - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_Politicposition - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Politicposition - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_Tin - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Tin - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_SSS - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_SSS - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_Gsis - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Gsis - 1, i, "gainsboro");
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_Employmentsource - 1, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Employmentsource - 1, i, "gainsboro");
        }
    }


}

function PropnwGridCon2() {
    var length = nwGridSigntrsInfoCon_Book.ActiveSheet.GetMaxRow();

    nwGridSigntrsInfoCon_Book.ActiveSheet.ColumnConfig[SPR_SgInfo_Opsadilco - 1].CheckBoxShow = false;
    nwGridSigntrsInfoCon_Book.ActiveSheet.ColumnConfig[SPR_SgInfo_Politic - 1].CheckBoxShow = false;

    nwGridSigntrsInfoCon_Book.ActiveSheet.SetText2(SPR_SgInfo_ReqCom - 1, Spread_ALLROW, "...");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetTextAlign(SPR_SgInfo_ReqCom - 1, Spread_ALLROW, "center");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetBold(SPR_SgInfo_ReqCom - 1, Spread_ALLROW, "bold");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetTextColor(SPR_SgInfo_ReqCom - 1, Spread_ALLROW, "white");

    nwGridSigntrsInfoCon_Book.ActiveSheet.SetText2(SPR_SgInfo_ContctDetails - 1, Spread_ALLROW, "...");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetTextAlign(SPR_SgInfo_ContctDetails - 1, Spread_ALLROW, "center");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetBold(SPR_SgInfo_ContctDetails - 1, Spread_ALLROW, "bold");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetTextColor(SPR_SgInfo_ContctDetails - 1, Spread_ALLROW, "white");

    nwGridSigntrsInfoCon_Book.ActiveSheet.SetText2(SPR_SgInfo_LocDetails - 1, Spread_ALLROW, "...");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetTextAlign(SPR_SgInfo_LocDetails - 1, Spread_ALLROW, "center");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetBold(SPR_SgInfo_LocDetails - 1, Spread_ALLROW, "bold");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetTextColor(SPR_SgInfo_LocDetails - 1, Spread_ALLROW, "white");

    nwGridSigntrsInfoCon_Book.ActiveSheet.SetText2(SPR_SgInfo_EmpInfo - 1, Spread_ALLROW, "...");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetTextAlign(SPR_SgInfo_EmpInfo - 1, Spread_ALLROW, "center");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetBold(SPR_SgInfo_EmpInfo - 1, Spread_ALLROW, "bold");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetTextColor(SPR_SgInfo_EmpInfo - 1, Spread_ALLROW, "white");

    nwGridSigntrsInfoCon_Book.ActiveSheet.SetText2(SPR_SgInfo_BusInfor - 1, Spread_ALLROW, "...");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetTextAlign(SPR_SgInfo_BusInfor - 1, Spread_ALLROW, "center");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetBold(SPR_SgInfo_BusInfor - 1, Spread_ALLROW, "bold");
    nwGridSigntrsInfoCon_Book.ActiveSheet.SetTextColor(SPR_SgInfo_BusInfor - 1, Spread_ALLROW, "white");

    for (var i = 0; i < length; i++) {
        var rctag = nwGridSigntrsInfoCon_Book.ActiveSheet.GetValue(SPR_SgInfo_RCTAG - 1, i);// crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_RCTAG + ')').text();
        var lineID = nwGridSigntrsInfoCon_Book.ActiveSheet.GetValue(SPR_SgInfo_LINEID - 1, i); //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_LINEID + ')').text();
        var con = nwGridSigntrsInfoCon_Book.ActiveSheet.GetValue(SPR_SgInfo_ConTAG - 1, i);// crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ConTAG + ')').text();
        var loc = nwGridSigntrsInfoCon_Book.ActiveSheet.GetValue(SPR_SgInfo_LocTAG - 1, i); //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_LocTAG + ')').text();
        var emp = nwGridSigntrsInfoCon_Book.ActiveSheet.GetValue(SPR_SgInfo_EmpTAG - 1, i); //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_EmpTAG + ')').text();
        var buss = nwGridSigntrsInfoCon_Book.ActiveSheet.GetValue(SPR_SgInfo_BusTAG - 1, i); //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_BusTAG + ')').text();

        var docno = $("#txtBorrowersCode").val();

        if (lineID != '') {
            if (docno != '') {
                if (rctag == '1') {
                    nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_ReqCom - 1, i, true);
                    nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_ReqCom - 1, i, "green");
                } else {
                    nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_ReqCom - 1, i, true);
                    nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_ReqCom - 1, i, "orange");
                }
            }
        } else {
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_ReqCom - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_ReqCom - 1, i, "gray");
        }



        if (lineID != '') {
            if (con == '1') {
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_ContctDetails - 1, i, true);
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_ContctDetails - 1, i, "green");
            } else {
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_ContctDetails - 1, i, true);
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_ContctDetails - 1, i, "orange");
            }
        } else {
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_ContctDetails - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_ContctDetails - 1, i, "gray");
        }

        if (lineID != '') {
            if (loc != '') {
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_LocDetails - 1, i, true);
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_LocDetails - 1, i, "green");
            } else {
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_LocDetails - 1, i, true);
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_LocDetails - 1, i, "orange");
            }
        } else {
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_LocDetails - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_LocDetails - 1, i, "gray");
        }

        if (lineID != '') {
            if (emp == '1') {
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_EmpInfo - 1, i, true);
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_EmpInfo - 1, i, "green");
            } else {
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_EmpInfo - 1, i, true);
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_EmpInfo - 1, i, "orange");
            }
        } else {
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_EmpInfo - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_EmpInfo - 1, i, "gray");
        }

        if (lineID != '') {
            if (buss == '1') {
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_BusInfor - 1, i, true);
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_BusInfor - 1, i, "green");
            } else {
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_BusInfor - 1, i, true);
                nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_BusInfor - 1, i, "orange");
            }
        } else {
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_BusInfor - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_BusInfor - 1, i, "gray");
        }


        var ispolitic = nwGridSigntrsInfoCon_Book.ActiveSheet.GetValue(SPR_SgInfo_Politic - 1, i);

        if (ispolitic == '1') {
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_Politicposition - 1, i, true);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_Politicposition - 1, i, "cyan");
        } else {
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_Politicposition - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_Politicposition - 1, i, "gainsboro");
        }


        if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_RelationshipDesc - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_RelationshipDesc - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_Salutation - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_Salutation - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_LName - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_LName - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_Fname - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_Fname - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_MName - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_MName - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_MtherMname - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_MtherMname - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_namesuffix - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_namesuffix - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_DateBirth - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_DateBirth - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_PlaceBirth - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_PlaceBirth - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_Gender - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_Gender - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_maritalstatus - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_maritalstatus - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_Nationality - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_Nationality - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_Opsadilco - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_Opsadilco - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_Politic - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_Politic - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_Politicposition - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_Politicposition - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_Tin - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_Tin - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_SSS - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_SSS - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_Gsis - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_Gsis - 1, i, "gainsboro");
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_Employmentsource - 1, i, false);
            nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_Employmentsource - 1, i, "gainsboro");
        }
    }




    //crnwTable = $("#nwGridSigntrsInfoCon .tblGridBody tbody ");
    //var length = crnwTable.find("tr").length;

    //for (var i = 0; i < length; i++) {
    //    var rctag = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_RCTAG + ')').text();
    //    var lineID = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_LINEID + ')').text();
    //    var con = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ConTAG + ')').text();
    //    var loc = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_LocTAG + ')').text();
    //    var emp = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_EmpTAG + ')').text();
    //    var buss = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_BusTAG + ')').text();
    //    var docno = $("#txtBorrowersCode").val();


    //    if (lineID != '') {
    //        if (docno != '') {
    //            if (rctag == '1') {
    //                crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ReqCom + ')').removeClass("btn-default-gray");
    //                crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ReqCom + ')').removeClass("btn-default-orange");
    //                crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ReqCom + ')').addClass("btn-default-green");
    //            } else {
    //                crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ReqCom + ')').removeClass("btn-default-gray");
    //                crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ReqCom + ')').removeClass("btn-default-green");
    //                crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ReqCom + ')').addClass("btn-default-orange");
    //            }
    //        }
    //    } else {
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ReqCom + ')').removeClass("btn-default-green");
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ReqCom + ')').removeClass("btn-default-orange");
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ReqCom + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ReqCom + ')').addClass("btn-default-gray");
    //    }

   

    //    //Other Buttons

    //    if (lineID != '') {
    //        if (con == '1') {
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ContctDetails + ')').removeClass("btn-default-gray");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ContctDetails + ')').removeClass("btn-default-orange");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ContctDetails + ')').addClass("btn-default-green");
    //        } else {
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ContctDetails + ')').removeClass("btn-default-gray");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ContctDetails + ')').removeClass("btn-default-green");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ContctDetails + ')').addClass("btn-default-orange");
    //        }
    //    } else {
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ContctDetails + ')').removeClass("btn-default-green");
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ContctDetails + ')').removeClass("btn-default-orange");
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ContctDetails + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_ContctDetails + ')').addClass("btn-default-gray");
    //    }

    //    if (lineID != '') {
    //        if (loc == '1') {
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_LocDetails + ')').removeClass("btn-default-gray");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_LocDetails + ')').removeClass("btn-default-orange");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_LocDetails + ')').addClass("btn-default-green");
    //        } else {
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_LocDetails + ')').removeClass("btn-default-gray");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_LocDetails + ')').removeClass("btn-default-green");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_LocDetails + ')').addClass("btn-default-orange");
    //        }
    //    } else {
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_LocDetails + ')').removeClass("btn-default-green");
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_LocDetails + ')').removeClass("btn-default-orange");
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_LocDetails + ')').enable(false);
    //    }

    //    if (lineID != '') {
    //        if (emp == '1') {
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_EmpInfo + ')').removeClass("btn-default-gray");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_EmpInfo + ')').removeClass("btn-default-orange");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_EmpInfo + ')').addClass("btn-default-green");
    //        } else {
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_EmpInfo + ')').removeClass("btn-default-gray");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_EmpInfo + ')').removeClass("btn-default-green");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_EmpInfo + ')').addClass("btn-default-orange");
    //        }
    //    } else {
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_EmpInfo + ')').removeClass("btn-default-green");
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_EmpInfo + ')').removeClass("btn-default-orange");
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_EmpInfo + ')').enable(false);
    //    }

    //    if (lineID != '') {
    //        if (buss == '1') {
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_BusInfor + ')').removeClass("btn-default-gray");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_BusInfor + ')').removeClass("btn-default-orange");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_BusInfor + ')').addClass("btn-default-green");
    //        } else {
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_BusInfor + ')').removeClass("btn-default-gray");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_BusInfor + ')').removeClass("btn-default-green");
    //            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_BusInfor + ')').addClass("btn-default-orange");
    //        }

    //    } else {
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_BusInfor + ')').removeClass("btn-default-green");
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_BusInfor + ')').removeClass("btn-default-orange");
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_BusInfor + ')').enable(false);
    //    }

    //    if (crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Politic + ') input').is(':checked')) {
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Politicposition + ')').css('background-color', 'cyan');
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Politicposition + ')').enable(true);
    //    } else {
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Politicposition + ')').css('background-color', 'gainsboro');
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Politicposition + ')').enable(false);

    //    }


    //    if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Relationship + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Salutation + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_LName + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Fname + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_MName + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_MtherMname + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_namesuffix + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_DateBirth + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_PlaceBirth + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Gender + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_maritalstatus + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Nationality + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Opsadilco + ') input').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Politic + ') input').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Politicposition + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Tin + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_SSS + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Gsis + ')').enable(false);
    //        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Employmentsource + ')').enable(false);
    //    }
    //}
}



var nwLineID;
var currRow;


 var nwLineID2;
 var currRow2;
 $(document).on('click', '.btnReqComplianceSigna', function () {
     var trantype = 'BSIGNT';
     var docno = $('#txtApprovalID').val();
     var lineID = crnwTR.find("td:eq(" + SPR_SgInfo_LINEID + ")").text();
     var rowno = crnwTR.index() + 1;
     nwLineID2 = lineID;
     currRow2 = crnwTR.index();
     var refTranNo = "";
     var isView = (nwDocno != '' || $('#txtStatusForEntry').val() != '1') ? 'true' : 'false';


     if (docno == "" || lineID == "") {
         MessageBox("Cannot proceed. Data should be saved first", Title, "error");
         return false;
     }

     var fullength = GetCurrentURL() + "../DCRequirementCompliance?TransactionNo=" + docno + "&TranType=" + trantype + "&nwLineID=" + lineID + "&nwApplyTo=" + refTranNo + "&isView=" + isView;

     nwLoading_Start('xbtnReqCompliance3', crLoadingHTML);
     nwPopupForm_Create("nwPopUpReqComplianceLin2", true, fullength);
     $('#nwPopUpReqComplianceLin2 .BoxTitle').text("Requirements Compliance");
     $("#nwPopUpReqComplianceLin2").css({ "min-width": "98%" });
     $("#nwPopUpReqComplianceLin2").css({ "min-height": "98%" });
     nwPopupForm_ShowModal("nwPopUpReqComplianceLin2");
     nwLoading_End('xbtnReqCompliance3');

     return false;
 });




function enableButtons() {
    $('.btnContactDtlsBorr').enable(true);
    $('.btnLocDtlsBorr').enable(true);
    $('.btnEmpnfoBorr').enable(true);
    $('.btnBussInfoBorr').enable(true);
    $('.btnOthSrc').enable(true);
    $('.btnContactDtlsSigna').enable(true);
    $('.btnSignatoriesLocation').enable(true);
    $('.btnEmpnfoSigna').enable(true);
    $('.btnBussInfoSigna').enable(true);
}




function PaymentColor() {
    //var x = $('#nwGridPaymentDtlsCon tr').size()
    crnwTable = $("#nwGridPaymentDtlsCon .tblGridBody tbody");
    var length = crnwTable.find("tr").length;

    for (var i = 0; i < length; i++) {
        var curr = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_currency + ')').text();
        var from = $('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_effectiveFrom + ') input').val();
        var to = $('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_effectiveTo + ') input').val();
        if (from != "") {
            if (to != "") {
                if (curr == "") {
                    $("#btnPaymentDetails").removeClass("btn-default-gray");
                    $("#btnPaymentDetails").removeClass("btn-default-green");
                    $("#btnPaymentDetails").addClass("btn-default-orange");
                } else {
                    $("#btnPaymentDetails").removeClass("btn-default-orange");
                    $("#btnPaymentDetails").removeClass("btn-default-gray");
                    $("#btnPaymentDetails").addClass("btn-default-green");
                }
            }
        }
    }
}



function polexpoTick() {
    crnwTable = $("#nwGridBorrowerInfoCon .tblGridBody tbody");
    var length = crnwTable.find("tr").length;

    for (var i = 0; i < length; i++) {
        var tictok = crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_BInfo_Politic + ')').prop('checked');


        crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_BInfo_Politicposition + ')').enable(true);

        if (tictok == true) {
            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_BInfo_Politicposition + ')').enable(false);
        }
        else {
            crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_BInfo_Politicposition + ')').enable(true);
        }
    }
}

$(document).on("click", "#btnNewCreditLine", function () {
    var trantype = 'BRWINF';
    var BorrowerCode = $('#txtBorrowersCode').val();
    var isView = nwDocno != '' ? 'true' : 'false';
    var Title = "Credit Line";

    var fullength = "../../../LMS/DocumentEntry/LMSCreditLine/LMSCreditLine.aspx?BorrowerCode=" + BorrowerCode + "";

    nwLoading_Start('xbtnnwCreditLine', crLoadingHTML);
    nwPopupForm_Create("nwCreditLine", true, fullength);
    $('#nwCreditLine .BoxTitle').text(Title);
    $("#nwCreditLine").css({ "min-width": "98%" });
    $("#nwCreditLine").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwCreditLine");
    nwLoading_End('xbtnnwCreditLine');

    return false;
});




$(document).on("change", "#effectiveFrom", function (e) {

    var from = $('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_effectiveFrom + ') input').val();
    //var to = $('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_effectiveTo + ') input').val();
    var currentDate = new Date();

    // Extract the components of the date (month, day, year)
    var month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
    var day = currentDate.getDate();
    var year = currentDate.getFullYear();

    // Format the date as "MM/DD/YYYY"
    var formattedDate = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + '/' + year;

    if (Date.parse(from) < Date.parse(formattedDate)) {
        MessageBox("Cannot Proceed. Effective From must be equal or later than the current server date. \n", "Payment Details");
        $('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_effectiveFrom + ') input').val(formattedDate);
    }
    else
        return false;
});

$(document).on("change", "#effectiveTo", function (e) {

    var from = $('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_effectiveFrom + ') input').val();
    var to = $('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_effectiveTo + ') input').val();

    if (Date.parse(to) < Date.parse(from)) {
        MessageBox("Cannot Proceed. Effective To must be equal or later than Effective From. \n", "Payment Details");
        $('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + (SPR_effectiveTo - 1) + ') input').val(to);
    }
    else
        return false;
});



 // Assuming you have an HTML element with id 'effectiveFrom'


 // Function to set current date in MM/DD/YYYY format
 function setCurrentDate() {
     var currentDate = new Date();

     // Extract the components of the date (month, day, year)
     var month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
     var day = currentDate.getDate();
     var year = currentDate.getFullYear();

     // Format the date as "MM/DD/YYYY"
     var formattedDate = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + '/' + year;

     // Output the formatted date
     var maxRow = nwLib.nwTempTable_Row_Count("nwGridPaymentDtlsCon");
     for (var i = 0; i < maxRow; i++) {
         //$('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_effectiveFrom + ') input').val(formattedDate);
         $('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + i + ') td:eq(' + SPR_effectiveFrom + ') input').val(formattedDate);
     }

 }

$(document).on("click", ".nwgrid_Insert", function (e) {
    setCurrentDate();
});



function getLineID() {
    var x = $('#nwGridBorrowerInfoCon tr').size()
    var lineID = 0.00;
    var xlineID = 0.00;
    for (var i = 0; i <= x; i++) {
        var z = $("#nwGridBorrowerInfoCon tr:eq(" + (i) + ")").find('td:eq(' + (SPR_BInfo_RelationShip) + ')').text();
        if (z != "") {
            xlineID = parseFloat($("#nwGridBorrowerInfoCon tr:eq(" + (i) + ")").find('td:eq(' + (SPR_BInfo_LINEID) + ')').text()) || 0.00;

            if (xlineID >= lineID) {
                lineID = xlineID + 1;
            }
        }
    }

    return lineID == 0 ? 1 : lineID;
}

function getLineIDSig() {
    var x = $('#nwGridBorrowerInfoCon tr').size()
    var lineID = 0.00;
    var xlineID = 0.00;
    for (var i = 0; i <= x; i++) {
        var z = $("#nwGridSigntrsInfoCon tr:eq(" + (i) + ")").find('td:eq(' + (SPR_SgInfo_Salutation) + ')').text();
        if (z != "") {
            xlineID = parseFloat($("#nwGridSigntrsInfoCon tr:eq(" + (i) + ")").find('td:eq(' + (SPR_SgInfo_LINEID) + ')').text()) || 0.00;

            if (xlineID >= lineID) {
                lineID = xlineID + 1;
            }
        }
    }

    return lineID == 0 ? 1 : lineID;
}






//Contact Det
function contactInp(rowindex) {
    var val = nwGridContactInfoCon_Book.ActiveSheet.GetValue(SPR_CI_CommTypeTag - 1, rowindex);
    let value = nwGridContactInfoCon_Book.ActiveSheet.GetValue(SPR_CI_Value - 1, rowindex); 

    if (val.toLowerCase().includes('phone')) {
        nwGridContactInfoCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridContactInfoCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, true);
        nwGridContactInfoCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'white');
        nwGridContactInfoCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, value);

        //$("#nwGridContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ")").css('background-color', 'white'); //actChkPhoneMobEmail
        //$("#nwGridContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ")").html('<input class="txt_CI_Phone" maxlength="80"/>');
        //$('.txt_CI_Phone').mask('(xxx)xxx-xxxx');

        //$("#nwGridContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ") input").val(value);
    }

    else if (val.toLowerCase().includes('email')) {

        nwGridContactInfoCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridContactInfoCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, true);
        nwGridContactInfoCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'white');
        nwGridContactInfoCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, value);

        //$("#nwGridContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ")").css('background-color', 'white'); //actChkPhoneMobEmail
        //$("#nwGridContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ")").html('<input class="txt_CI_Email nwUpper" maxlength="80"/>');
        //$("#nwGridContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ") input").val(value);
    }


    else if (val.toLowerCase().includes('mob')) {
        nwGridContactInfoCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridContactInfoCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, true);
        nwGridContactInfoCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'white');
        nwGridContactInfoCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, value);

        //$("#nwGridContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ")").css('background-color', 'white');
        //$("#nwGridContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ")").html('<input class="txt_CI_mobile" maxlength="12"/>');
        //$.mask.definitions['9'] = '';
        //$.mask.definitions['x'] = '[0-9]';
        //$('.txt_CI_mobile').mask('639xxxxxxxxx');
        //$("#nwGridContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ") input").val(value);
    }
    else {
        nwGridContactInfoCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridContactInfoCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, false);
        nwGridContactInfoCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'gainsboro');
        nwGridContactInfoCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, '');

        //$("#nwGridContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ")").css('background-color', 'gainsboro');
        //$("#nwGridContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ")").val('');
        //$("#nwGridContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ")").html('<input disabled />');
    }

}






function contactInp2(rowindex) {
    var val = nwGridSpouseConInfoCon_Book.ActiveSheet.GetValue(SPR_CI_CommTypeTag - 1, rowindex);
    let value = nwGridSpouseConInfoCon_Book.ActiveSheet.GetValue(SPR_CI_Value - 1, rowindex); 


    if (val.toLowerCase().includes('phone')) {
        //$("#nwGridSpouseConInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SCI_Value + ")").css('background-color', 'white'); //actChkPhoneMobEmail
        //$("#nwGridSpouseConInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SCI_Value + ")").html('<input class="txt_SCI_Phone" maxlength="80"/>');
        //$('.txt_SCI_Phone').mask('(xxx)xxx-xxxx');

        //$("#nwGridSpouseConInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SCI_Value + ") input").val(value);
        nwGridSpouseConInfoCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value -  1, rowindex, 'celltext');
        nwGridSpouseConInfoCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, true);
        nwGridSpouseConInfoCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'white');
        nwGridSpouseConInfoCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, value);

    }
    else if (val.toLowerCase().includes('email')) {
        //$("#nwGridSpouseConInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SCI_Value + ")").css('background-color', 'white'); //actChkPhoneMobEmail
        //$("#nwGridSpouseConInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SCI_Value + ")").html('<input class="txt_SCI_Email nwUpper" maxlength="80"/>');

        //$("#nwGridSpouseConInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SCI_Value + ") input").val(value);

        nwGridSpouseConInfoCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridSpouseConInfoCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, true);
        nwGridSpouseConInfoCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'white');
        nwGridSpouseConInfoCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, value);

    }

    else if (val.toLowerCase().includes('mob')) {
        //$("#nwGridSpouseConInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SCI_Value + ")").css('background-color', 'white')
        //$("#nwGridSpouseConInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SCI_Value + ")").html('<input class="txt_SCI_mobile" maxlength="12"/>')

        //$.mask.definitions['9'] = '';
        //$.mask.definitions['x'] = '[0-9]';
        //$('.txt_SCI_mobile').mask('639xxxxxxxxx');

        //$("#nwGridSpouseConInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SCI_Value + ") input").val(value);

        nwGridSpouseConInfoCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridSpouseConInfoCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, true);
        nwGridSpouseConInfoCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'white');
        nwGridSpouseConInfoCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, value);


    }
    else {
        nwGridContactInfoCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridContactInfoCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, false);
        nwGridContactInfoCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'gainsboro');
        nwGridContactInfoCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, '');
        //$("#nwGridSpouseConInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SCI_Value + ")").css('background-color', 'gainsboro')
        //$("#nwGridSpouseConInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SCI_Value + ")").val('')
        //$("#nwGridSpouseConInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SCI_Value + ")").html('<input disabled />')
        //$("#nwGridSpouseConInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SCI_Value + ") input").val(value);
    }

}



function contactInp3(rowindex) {
    //var val = $("#nwGridCoBorrowerContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CCI_CommTypeTag + ")").text();
    //let value = $("#nwGridCoBorrowerContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ")").text();

    var val = nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.GetValue(SPR_CI_CommTypeTag - 1, rowindex);
    let value = nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.GetValue(SPR_CI_Value - 1, rowindex);


    if (val.toLowerCase().includes('phone')) {
        //$("#nwGridCoBorrowerContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CCI_Value + ")").css('background-color', 'white'); //actChkPhoneMobEmail
        //$("#nwGridCoBorrowerContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CCI_Value + ")").html('<input class="txt_CCI_Phone" maxlength="80"/>');
        //$('.txt_CCI_Phone').mask('(xxx)xxx-xxxx');

        //$("#nwGridCoBorrowerContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ") input").val(value);

        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, true);
        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'white');
        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, value);
    }

    else if (val.toLowerCase().includes('email')) {
        //$("#nwGridCoBorrowerContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CCI_Value + ")").css('background-color', 'white'); //actChkPhoneMobEmail
        //$("#nwGridCoBorrowerContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CCI_Value + ")").html('<input class="txt_CCI_Email nwUpper" maxlength="80"/>');

        //$("#nwGridCoBorrowerContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ") input").val(value);

        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, true);
        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'white');
        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, value);
    }

    else if (val.toLowerCase().includes('mob')) {
        //$("#nwGridCoBorrowerContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CCI_Value + ")").css('background-color', 'white');
        //$("#nwGridCoBorrowerContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CCI_Value + ")").html('<input class="txt_CCI_mobile" maxlength="12"/>');

        //$.mask.definitions['9'] = '';
        //$.mask.definitions['x'] = '[0-9]';
        //$('.txt_CCI_mobile').mask('639xxxxxxxxx');

        //$("#nwGridCoBorrowerContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ") input").val(value);

        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, true);
        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'white');
        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, value);
    }
    else {
        //$("#nwGridCoBorrowerContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CCI_Value + ")").css('background-color', 'gainsboro')
        //$("#nwGridCoBorrowerContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CCI_Value + ")").val('')
        //$("#nwGridCoBorrowerContactInfoCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CCI_Value + ")").html('<input disabled />')

        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, false);
        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'gainsboro');
        nwGridCoBorrowerContactInfoCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, value);
    }

}


function contactInp4(rowindex) {
    //var val = $("#nwGridSigntryContactDtlsCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SigCI_CommTypeTag + ")").text();
    //let value = $("#nwGridSigntryContactDtlsCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SigCI_Value + ")").text();

    var val = nwGridSigntryContactDtlsCon_Book.ActiveSheet.GetValue(SPR_CI_CommTypeTag - 1, rowindex);
    let value = nwGridSigntryContactDtlsCon_Book.ActiveSheet.GetValue(SPR_CI_Value - 1, rowindex); 


    if (val.toLowerCase().includes('phone')) {
        //$("#nwGridSigntryContactDtlsCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SigCI_Value + ")").css('background-color', 'white'); //actChkPhoneMobEmail
        //$("#nwGridSigntryContactDtlsCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_SigCI_Value + ")").html('<input class="txt_SigCI_Phone" maxlength="80"/>');
        //$('.txt_SigCI_Phone').mask('(xxx)xxx-xxxx');

        //$("#nwGridSigntryContactDtlsCon tr:eq(" + rowindex + ")").find("td:eq(" + SPR_CI_Value + ") input").val(value);
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, true);
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'white');
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, value);


    }

    else if (val.toLowerCase().includes('email')) {
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, true);
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'white');
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, value);
    }
    else if (val.toLowerCase().includes('mob')) {
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, true);
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'white');
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, value);
    }


    else {
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetObjectType(SPR_CI_Value - 1, rowindex, 'celltext');
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetEnable(SPR_CI_Value - 1, rowindex, false);
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetBackground(SPR_CI_Value - 1, rowindex, 'gainsboro');
        nwGridSigntryContactDtlsCon_Book.ActiveSheet.SetText(SPR_CI_Value - 1, rowindex, value);
    }

}



$(document).on("change", ".chkBInfo_Politic", function (e) {
    checkBPEP()
});

function checkBPEP() {
    var rowindex = nwGridBorrowerInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
    var isChecked = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_Politic - 1, (rowindex)) == '1';//$("#nwGridBorrowerInfoCon .tblGridBody tr:eq(" + crnwTR.index() + ")").find("td:eq(" + SPR_BInfo_Politic + ") input").prop("checked")
    
    if (isChecked) {
        // Checkbox is checked
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Politicposition - 1, rowindex, 'cyan');

    } else {
        // Checkbox is not checked
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Politicposition - 1, rowindex, 'gainsboro');
    }
  
}


$(document).on("change", ".chkSgInfo_Politic", function (e) {
    checkPPEP()
});

function checkPPEP() {
    var rowindex = nwGridSigntrsInfoCon_Book.ActiveSheet.GetSelectedIndexes().row;
    var isChecked = nwGridSigntrsInfoCon_Book.ActiveSheet.GetValue(SPR_SgInfo_Politic - 1, rowindex) == '1';

    if (isChecked) {
        // Checkbox is checked
        //nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_Politicposition - 1, rowindex, true);
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_SgInfo_Politicposition - 1, rowindex, 'cyan');
    } else {
        // Checkbox is not checked
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_Politicposition - 1, rowindex, false);
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetBackground(SPR_BInfo_Politicposition - 1, rowindex, 'gainsboro');
    }
}


//Individual SSS and GSIS
$(document).on('keydown', '#txt_ID_SSS', function (e) {
    return Cuz_NumberAndDashOnly($(this).val(), e, 10);
});

$(document).on('keydown', '#txt_ID_GSIS', function (e) {
    return Cuz_NumberAndDashOnly($(this).val(), e, 11);

});

$(document).on('keydown', '#txt_SI_SSS', function (e) {
    return Cuz_NumberAndDashOnly($(this).val(), e, 10);
});

$(document).on('keydown', '#txt_SI_GSIS', function (e) {
    return Cuz_NumberAndDashOnly($(this).val(), e, 11);

});



function borSSS() {
    $(document).on('keydown', '.txt_BInfo_SSS', function (e) {
        return Cuz_NumberAndDashOnly($(this).val(), e, 10);

    });
}


$(document).on('keydown', '.txt_BInfo_Gsis', function (e) {
    return Cuz_NumberAndDashOnly($(this).val(), e, 11);

});



function sigSSS() {
    $(document).on('keydown', '.txt_SgInfo_SSS', function (e) {
        return Cuz_NumberAndDashOnly($(this).val(), e, 10);
    });
}


$(document).on('keydown', '.txt_SgInfo_Gsis', function (e) {
    return Cuz_NumberAndDashOnly($(this).val(), e, 11);

});


function Cuz_NumberAndDashOnly(value, e, numberlen) {
    var key = e.key;
    var selectedtext = ''
    try {
        selectedtext = window.getSelection().toString();
    } catch (ex) { }
    if (['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', '-'].includes(key)) {
        return true;
    }
    var charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) //charCode != 189 && 
        return false;

    // var numberlen = 10;
    //  var value = $(_this).val();
    var numbercnt = 0;
    for (var i = 0; i < value.length; i++) {
        var currentChar = value[i];
        if (!isNaN(currentChar)) { // || currentChar == '-'
            numbercnt++;
        }
        if (numberlen <= numbercnt && selectedtext == '') {
            return false;
        }
    }
    return true;
}

function CreditLineColor() {
    //var x = $('#nwGridPaymentDtlsCon tr').size()
    //crnwTable = $("#nwGridCreditLineCon .tblGridBody tbody");
    nwGridCreditLineCon_Book.ActiveSheet.SetText2(SPR_CL_UtilizeDtls - 1, Spread_ALLROW, "...");
    nwGridCreditLineCon_Book.ActiveSheet.SetTextAlign(SPR_CL_UtilizeDtls - 1, Spread_ALLROW, "center");
    nwGridCreditLineCon_Book.ActiveSheet.SetBold(SPR_CL_UtilizeDtls - 1, Spread_ALLROW, "bold");
    nwGridCreditLineCon_Book.ActiveSheet.SetTextColor(SPR_CL_UtilizeDtls - 1, Spread_ALLROW, "white");

    var length = nwGridCreditLineCon_Book.ActiveSheet.GetMaxRow();

    for (var i = 0; i < length; i++) {
        var curr = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_CL_Currency - 1, i);
        if (curr == "") {
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_CL_UtilizeDtls, i, false);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_CL_UtilizeDtls, i, "gray");
        } else {
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_CL_UtilizeDtls, i, true);
            nwGridBorrowerInfoCon_Book.ActiveSheet.SetBackground(SPR_CL_UtilizeDtls, i, "blue");
        }
    }
}


function disableBPol() {
    //var x = $('#nwGridPaymentDtlsCon tr').size()
    //crnwTable = $("#nwGridBorrowerInfoCon .tblGridBody tbody");
    var length = nwGridBorrowerInfoCon_Book.ActiveSheet.GetMaxRow();

    for (var i = 0; i < length; i++) {
        nwGridBorrowerInfoCon_Book.ActiveSheet.SetEnable(SPR_BInfo_Politicposition - 1, i, true);
            //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_BInfo_Politicposition + ')').enable(false);
   }
}

function disablePPol() {
    //var x = $('#nwGridPaymentDtlsCon tr').size()
    crnwTable = nwGridSigntrsInfoCon_Book.ActiveSheet.GetMaxRow();//$("#nwGridSigntrsInfoCon .tblGridBody tbody");
    var length = crnwTable.find("tr").length;

    for (var i = 0; i < length; i++) {
        nwGridSigntrsInfoCon_Book.ActiveSheet.SetEnable(SPR_SgInfo_Politicposition - 1, i, true);
        //crnwTable.find('tr:eq(' + i + ') td:eq(' + SPR_SgInfo_Politicposition + ')').enable(false);
    }
}



$(document).on('click', '#cbSIPolExpPer', function (e) {
    if ($('#cbSIPolExpPer').prop("checked")) {
        $("#nwReq2").show();
    } else {
        $("#nwReq2").hide();
    }
});

function getNumReplace(val) {
    val = getNum(parseFloat(val.toString().replace(/,/g, "")))
    return val;
}

function setNumReplace(val, decimal) {
    val = getNum(parseFloat(val.toString().replace(/,/g, "")))
    val = val.toFixed(decimal);
    var dtnum = val.split('.', 100);

    var wholenum = dtnum[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    var decinum = dtnum[1];

    return wholenum + '.' + decinum;
}

function getNum(val) {
    if (isNaN(val) || val == '') {
        val = 0
    }
    return val;
}


var _crnwTR = "";


function hideAst(code) {
    if (code != "") {
        $('#nwGridBorrowerInfoCon th:eq(' + SPR_BInfo_ContctDetails + ') ').addClass('nwFieldreq');
        $('#nwGridBorrowerInfoCon th:eq(' + SPR_BInfo_LocDetails + ') ').addClass('nwFieldreq');
        func_ActionDriven("actEmpSourceAst", true);
    }
    else {
        $('#nwGridBorrowerInfoCon th:eq(' + SPR_BInfo_ContctDetails + ') ').removeClass('nwFieldreq');
        $('#nwGridBorrowerInfoCon th:eq(' + SPR_BInfo_LocDetails + ') ').removeClass('nwFieldreq')
       
    }
}

var inputText = document.querySelectorAll('input[type="text"]');
inputText.forEach(input => {
    input.addEventListener('input', function () {
        let capitalizedValue = this.value.toUpperCase();
        this.value = capitalizedValue;
    });
});

$(document).on("change", "#cbSLISBLI", function (e) {
    //PERMANENT ADDRESS
    isChkSLISBLI();
});

function isChkSLISBLI() {
    if ($('#cbSLISBLI').is(":checked")) {
        $('#cmbSLIPrepMail').val($('#cmbLIPrepMail').val());
        $('#idvallugSLIHomeOwnrshp').val($('#idvallugLIHomeOwnrshp').val());
        $('#descvallugSLIHomeOwnrshp').val($('#descvallugLIHomeOwnrshp').val());
        $('#cb_SLI_FullAddress').prop('checked', $('#cb_LI_FullAddress').is(':checked'));
        $('#txt_SLI_FullAddress').val($('#txt_LI_FullAddress').val());
        $('#txt_SLI_LengthStay').val($('#txt_LI_LengthStay').val());
        $('#txt_SLI_UnitNo').val($('#txt_LI_UnitNo').val());
        $('#txt_SLI_FloorNo').val($('#txt_LI_FloorNo').val());
        $('#txt_SLI_BldgNo').val($('#txt_LI_BldgNo').val());
        $('#txt_SLI_BuildingName').val($('#txt_LI_BuildingName').val());
        $('#txt_SLI_Landmark').val($('#txt_LI_Landmark').val());
        $('#txt_SLI_HouseNo').val($('#txt_LI_HouseNo').val());
        $('#txt_SLI_StreetName').val($('#txt_LI_StreetName').val());
        $('#txt_SLI_Lot').val($('#txt_LI_Lot').val());
        $('#txt_SLI_Block').val($('#txt_LI_Block').val());
        $('#txt_SLI_Phase').val($('#txt_LI_Phase').val());
        $('#txt_SLI_Subdivision').val($('#txt_LI_Subdivision').val());
        $('#txt_SLI_Zone').val($('#txt_LI_Zone').val());
        $('#idvallugSLIBarangay').val($('#idvallugLIBarangay').val());
        $('#descvallugSLIBarangay').val($('#descvallugLIBarangay').val());
        $('#idvallugSLIMunicipality').val($('#idvallugLIMunicipality').val());
        $('#descvallugSLIMunicipality').val($('#descvallugLIMunicipality').val());
        $('#idvallugSLIProvince').val($('#idvallugLIProvince').val());
        $('#descvallugSLIProvince').val($('#descvallugLIProvince').val());
        $('#idvallugSLIRegion').val($('#idvallugLIRegion').val());
        $('#descvallugSLIRegion').val($('#descvallugLIRegion').val());
        $('#idvallugSLICountry').val($('#idvallugLICountry').val());
        $('#descvallugSLICountry').val($('#descvallugLICountry').val());
        $('#txt_SLI_Zip').val($('#txt_LI_Zip').val());
        $('#txt_SLI_Remarks').val($('#txt_LI_Remarks').val());

        $('#cbSLIPresentAdd').prop('checked', $('#cbPresentAdd').is(':checked'));
        $('#idvallugSLIHomeOwnrshp2').val($('#idvallugLIHomeOwnrshp2').val());
        $('#descvallugSLIHomeOwnrshp2').val($('#descvallugLIHomeOwnrshp2').val());
        $('#cb_SLI_FullAddress2').prop('checked', $('#cb_LI_FullAddress2').is(':checked'));
        $('#txt_SLI_FullAddress2').val($('#txt_LI_FullAddress2').val());
        $('#txt_SLI_LengthStay2').val($('#txt_LI_LengthStay2').val());
        $('#txt_SLI_UnitNo2').val($('#txt_LI_UnitNo2').val());
        $('#txt_SLI_FloorNo2').val($('#txt_LI_FloorNo2').val());
        $('#txt_SLI_BldgNo2').val($('#txt_LI_BldgNo2').val());
        $('#txt_SLI_BuildingName2').val($('#txt_LI_BuildingName2').val());
        $('#txt_SLI_Landmark2').val($('#txt_LI_Landmark2').val());
        $('#txt_SLI_HouseNo2').val($('#txt_LI_HouseNo2').val());
        $('#txt_SLI_StreetName2').val($('#txt_LI_StreetName2').val());
        $('#txt_SLI_Lot2').val($('#txt_LI_Lot2').val());
        $('#txt_SLI_Block2').val($('#txt_LI_Block2').val());
        $('#txt_SLI_Phase2').val($('#txt_LI_Phase2').val());
        $('#txt_SLI_Subdivision2').val($('#txt_LI_Subdivision2').val());
        $('#txt_SLI_Zone2').val($('#txt_LI_Zone2').val());
        $('#idvallugSLIBarangay2').val($('#idvallugLIBarangay2').val());
        $('#descvallugSLIBarangay2').val($('#descvallugLIBarangay2').val());
        $('#idvallugSLIMunicipality2').val($('#idvallugLIMunicipality2').val());
        $('#descvallugSLIMunicipality2').val($('#descvallugLIMunicipality2').val());
        $('#idvallugSLIProvince2').val($('#idvallugLIProvince2').val());
        $('#descvallugSLIProvince2').val($('#descvallugLIProvince2').val());
        $('#idvallugSLIRegion2').val($('#idvallugLIRegion2').val());
        $('#descvallugSLIRegion2').val($('#descvallugLIRegion2').val());
        $('#idvallugSLICountry2').val($('#idvallugLICountry2').val());
        $('#descvallugSLICountry2').val($('#descvallugLICountry2').val());
        $('#txt_SLI_Zip2').val($('#txt_LI_Zip2').val());
        $('#txt_SLI_Remarks2').val($('#txt_LI_Remarks2').val());

        $('#cmbSLIPrepMail').enable(false);
        $('#lugSLIHomeOwnrshp').enable(false);
        //$('#descvallugSLIHomeOwnrshp').enable(false);
        $('#cb_SLI_FullAddress').enable(false);
        $('#txt_SLI_FullAddress').enable(false);
        $('#txt_SLI_LengthStay').enable(false);
        $('#txt_SLI_UnitNo').enable(false);
        $('#txt_SLI_FloorNo').enable(false);
        $('#txt_SLI_BldgNo').enable(false);
        $('#txt_SLI_BuildingName').enable(false);
        $('#txt_SLI_Landmark').enable(false);
        $('#txt_SLI_HouseNo').enable(false);
        $('#txt_SLI_StreetName').enable(false);
        $('#txt_SLI_Lot').enable(false);
        $('#txt_SLI_Block').enable(false);
        $('#txt_SLI_Phase').enable(false);
        $('#txt_SLI_Subdivision').enable(false);
        $('#txt_SLI_Zone').enable(false);
        $('#lugSLIBarangay').enable(false);
        //$('#descvallugSLIBarangay').val();
        $('#lugSLIMunicipality').enable(false);
        //$('#descvallugSLIMunicipality').val();
        //$('#idvallugSLIProvince').val();
        //$('#descvallugSLIProvince').val();
        //$('#idvallugSLIRegion').val();
        //$('#descvallugSLIRegion').val();
        //$('#idvallugSLICountry').val();
        //$('#descvallugSLICountry').val();
        $('#txt_SLI_Zip').enable(false);
        $('#txt_SLI_Remarks').enable(false);

        $('#cbSLIPresentAdd').enable(false);
        $('#lugSLIHomeOwnrshp2').enable(false);
        //$('#descvallugSLIHomeOwnrshp2').val();
        $('#cb_SLI_FullAddress2').enable(false);
        $('#txt_SLI_FullAddress2').enable(false);
        $('#txt_SLI_LengthStay2').enable(false);
        $('#txt_SLI_UnitNo2').enable(false);
        $('#txt_SLI_FloorNo2').enable(false);
        $('#txt_SLI_BldgNo2').enable(false);
        $('#txt_SLI_BuildingName2').enable(false);
        $('#txt_SLI_Landmark2').enable(false);
        $('#txt_SLI_HouseNo2').enable(false);
        $('#txt_SLI_StreetName2').enable(false);
        $('#txt_SLI_Lot2').enable(false);
        $('#txt_SLI_Block2').enable(false);
        $('#txt_SLI_Phase2').enable(false);
        $('#txt_SLI_Subdivision2').enable(false);
        $('#txt_SLI_Zone2').enable(false);
        $('#lugSLIBarangay2').enable(false);
        //$('#descvallugSLIBarangay2').val();
        $('#lugSLIMunicipality2').enable(false);
        //$('#descvallugSLIMunicipality2').val();
        //$('#idvallugSLIProvince2').val();
        //$('#descvallugSLIProvince2').val();
        //$('#idvallugSLIRegion2').val();
        //$('#descvallugSLIRegion2').val();
        //$('#idvallugSLICountry2').val();
        //$('#descvallugSLICountry2').val();
        $('#txt_SLI_Zip2').enable(false);
        $('#txt_SLI_Remarks2').enable(false);
    }
    else {
        $('#cmbSLIPrepMail').val('');
        $('#idvallugSLIHomeOwnrshp').val('');
        $('#descvallugSLIHomeOwnrshp').val('');
        $('#cb_SLI_FullAddress').prop('checked', false);
        $('#txt_SLI_FullAddress').val('');
        $('#txt_SLI_LengthStay').val('');
        $('#txt_SLI_UnitNo').val('');
        $('#txt_SLI_FloorNo').val('');
        $('#txt_SLI_BldgNo').val('');
        $('#txt_SLI_BuildingName').val('');
        $('#txt_SLI_Landmark').val('');
        $('#txt_SLI_HouseNo').val('');
        $('#txt_SLI_StreetName').val('');
        $('#txt_SLI_Lot').val('');
        $('#txt_SLI_Block').val('');
        $('#txt_SLI_Phase').val('');
        $('#txt_SLI_Subdivision').val('');
        $('#txt_SLI_Zone').val('');
        $('#idvallugSLIBarangay').val('');
        $('#descvallugSLIBarangay').val('');
        $('#idvallugSLIMunicipality').val('');
        $('#descvallugSLIMunicipality').val('');
        $('#idvallugSLIProvince').val('');
        $('#descvallugSLIProvince').val('');
        $('#idvallugSLIRegion').val('');
        $('#descvallugSLIRegion').val('');
        $('#idvallugSLICountry').val('');
        $('#descvallugSLICountry').val('');
        $('#txt_SLI_Zip').val('');
        $('#txt_SLI_Remarks').val('');

        $('#cbSLIPresentAdd').prop('checked',false);
        $('#idvallugSLIHomeOwnrshp2').val('');
        $('#descvallugSLIHomeOwnrshp2').val('');
        $('#cb_SLI_FullAddress2').prop('checked', false);
        $('#txt_SLI_FullAddress2').val('');
        $('#txt_SLI_LengthStay2').val('');
        $('#txt_SLI_UnitNo2').val('');
        $('#txt_SLI_FloorNo2').val('');
        $('#txt_SLI_BldgNo2').val('');
        $('#txt_SLI_BuildingName2').val('');
        $('#txt_SLI_Landmark2').val('');
        $('#txt_SLI_HouseNo2').val('');
        $('#txt_SLI_StreetName2').val('');
        $('#txt_SLI_Lot2').val('');
        $('#txt_SLI_Block2').val('');
        $('#txt_SLI_Phase2').val('');
        $('#txt_SLI_Subdivision2').val('');
        $('#txt_SLI_Zone2').val('');
        $('#idvallugSLIBarangay2').val('');
        $('#descvallugSLIBarangay2').val('');
        $('#idvallugSLIMunicipality2').val('');
        $('#descvallugSLIMunicipality2').val('');
        $('#idvallugSLIProvince2').val('');
        $('#descvallugSLIProvince2').val('');
        $('#idvallugSLIRegion2').val('');
        $('#descvallugSLIRegion2').val('');
        $('#idvallugSLICountry2').val('');
        $('#descvallugSLICountry2').val('');
        $('#txt_SLI_Zip2').val('');
        $('#txt_SLI_Remarks2').val('');

        $('#cmbSLIPrepMail').enable(true);
        $('#lugSLIHomeOwnrshp').enable(true);
        //$('#descvallugSLIHomeOwnrshp').enable(false);
        $('#cb_SLI_FullAddress').enable(true);
        $('#txt_SLI_FullAddress').enable(false);
        $('#txt_SLI_LengthStay').enable(true);
        $('#txt_SLI_UnitNo').enable(true);
        $('#txt_SLI_FloorNo').enable(true);
        $('#txt_SLI_BldgNo').enable(true);
        $('#txt_SLI_BuildingName').enable(true);
        $('#txt_SLI_Landmark').enable(true);
        $('#txt_SLI_HouseNo').enable(true);
        $('#txt_SLI_StreetName').enable(true);
        $('#txt_SLI_Lot').enable(true);
        $('#txt_SLI_Block').enable(true);
        $('#txt_SLI_Phase').enable(true);
        $('#txt_SLI_Subdivision').enable(true);
        $('#txt_SLI_Zone').enable(true);
        $('#lugSLIBarangay').enable(true);
        //$('#descvallugSLIBarangay').val();
        $('#lugSLIMunicipality').enable(true);
        $('#txt_SLI_Zip').enable(true);
        $('#txt_SLI_Remarks').enable(true);

        $('#cbSLIPresentAdd').enable(true);
        $('#lugSLIHomeOwnrshp2').enable(true);
        //$('#descvallugSLIHomeOwnrshp2').val();
        $('#cb_SLI_FullAddress2').enable(true);
        $('#txt_SLI_FullAddress2').enable(false);
        $('#txt_SLI_LengthStay2').enable(true);
        $('#txt_SLI_UnitNo2').enable(true);
        $('#txt_SLI_FloorNo2').enable(true);
        $('#txt_SLI_BldgNo2').enable(true);
        $('#txt_SLI_BuildingName2').enable(true);
        $('#txt_SLI_Landmark2').enable(true);
        $('#txt_SLI_HouseNo2').enable(true);
        $('#txt_SLI_StreetName2').enable(true);
        $('#txt_SLI_Lot2').enable(true);
        $('#txt_SLI_Block2').enable(true);
        $('#txt_SLI_Phase2').enable(true);
        $('#txt_SLI_Subdivision2').enable(true);
        $('#txt_SLI_Zone2').enable(true);
        $('#lugSLIBarangay2').enable(true);
        //$('#descvallugSLIBarangay2').val();
        $('#lugSLIMunicipality2').enable(true);
        $('#txt_SLI_Zip2').enable(true);
        $('#txt_SLI_Remarks2').enable(true);
    }

}

$(document).on("change", "#cbCLISBLI", function (e) {
    //PERMANENT ADDRESS
    isChkCLISBLI();
});

function isChkCLISBLI() {
    if ($('#cbCLISBLI').is(":checked")) {
        $('#cmbCLIPrepMail').val($('#cmbLIPrepMail').val());
        $('#idvallugCLIHomeOwnrshp').val($('#idvallugLIHomeOwnrshp').val());
        $('#descvallugCLIHomeOwnrshp').val($('#descvallugLIHomeOwnrshp').val());
        $('#cb_CLI_FullAddress').prop('checked', $('#cb_LI_FullAddress').is(':checked'));
        $('#txt_CLI_FullAddress').val($('#txt_LI_FullAddress').val());
        $('#txt_CLI_LengthStay').val($('#txt_LI_LengthStay').val());
        $('#txt_CLI_UnitNo').val($('#txt_LI_UnitNo').val());
        $('#txt_CLI_FloorNo').val($('#txt_LI_FloorNo').val());
        $('#txt_CLI_BldgNo').val($('#txt_LI_BldgNo').val());
        $('#txt_CLI_BuildingName').val($('#txt_LI_BuildingName').val());
        $('#txt_CLI_Landmark').val($('#txt_LI_Landmark').val());
        $('#txt_CLI_HouseNo').val($('#txt_LI_HouseNo').val());
        $('#txt_CLI_StreetName').val($('#txt_LI_StreetName').val());
        $('#txt_CLI_Lot').val($('#txt_LI_Lot').val());
        $('#txt_CLI_Block').val($('#txt_LI_Block').val());
        $('#txt_CLI_Phase').val($('#txt_LI_Phase').val());
        $('#txt_CLI_Subdivision').val($('#txt_LI_Subdivision').val());
        $('#txt_CLI_Zone').val($('#txt_LI_Zone').val());
        $('#idvallugCLIBarangay').val($('#idvallugLIBarangay').val());
        $('#descvallugCLIBarangay').val($('#descvallugLIBarangay').val());
        $('#idvallugCLIMunicipality').val($('#idvallugLIMunicipality').val());
        $('#descvallugCLIMunicipality').val($('#descvallugLIMunicipality').val());
        $('#idvallugCLIProvince').val($('#idvallugLIProvince').val());
        $('#descvallugCLIProvince').val($('#descvallugLIProvince').val());
        $('#idvallugCLIRegion').val($('#idvallugLIRegion').val());
        $('#descvallugCLIRegion').val($('#descvallugLIRegion').val());
        $('#idvallugCLICountry').val($('#idvallugLICountry').val());
        $('#descvallugCLICountry').val($('#descvallugLICountry').val());
        $('#txt_CLI_Zip').val($('#txt_LI_Zip').val());
        $('#txt_CLI_Remarks').val($('#txt_LI_Remarks').val());

        $('#cbCLIPresentAdd').prop('checked', $('#cbPresentAdd').is(':checked'));
        $('#idvallugCLIHomeOwnrshp2').val($('#idvallugLIHomeOwnrshp2').val());
        $('#descvallugCLIHomeOwnrshp2').val($('#descvallugLIHomeOwnrshp2').val());
        $('#cb_CLI_FullAddress2').prop('checked', $('#cb_LI_FullAddress2').is(':checked'));
        $('#txt_CLI_FullAddress2').val($('#txt_LI_FullAddress2').val());
        $('#txt_CLI_LengthStay2').val($('#txt_LI_LengthStay2').val());
        $('#txt_CLI_UnitNo2').val($('#txt_LI_UnitNo2').val());
        $('#txt_CLI_FloorNo2').val($('#txt_LI_FloorNo2').val());
        $('#txt_CLI_BldgNo2').val($('#txt_LI_BldgNo2').val());
        $('#txt_CLI_BuildingName2').val($('#txt_LI_BuildingName2').val());
        $('#txt_CLI_Landmark2').val($('#txt_LI_Landmark2').val());
        $('#txt_CLI_HouseNo2').val($('#txt_LI_HouseNo2').val());
        $('#txt_CLI_StreetName2').val($('#txt_LI_StreetName2').val());
        $('#txt_CLI_Lot2').val($('#txt_LI_Lot2').val());
        $('#txt_CLI_Block2').val($('#txt_LI_Block2').val());
        $('#txt_CLI_Phase2').val($('#txt_LI_Phase2').val());
        $('#txt_CLI_Subdivision2').val($('#txt_LI_Subdivision2').val());
        $('#txt_CLI_Zone2').val($('#txt_LI_Zone2').val());
        $('#idvallugCLIBarangay2').val($('#idvallugLIBarangay2').val());
        $('#descvallugCLIBarangay2').val($('#descvallugLIBarangay2').val());
        $('#idvallugCLIMunicipality2').val($('#idvallugLIMunicipality2').val());
        $('#descvallugCLIMunicipality2').val($('#descvallugLIMunicipality2').val());
        $('#idvallugCLIProvince2').val($('#idvallugLIProvince2').val());
        $('#descvallugCLIProvince2').val($('#descvallugLIProvince2').val());
        $('#idvallugCLIRegion2').val($('#idvallugLIRegion2').val());
        $('#descvallugCLIRegion2').val($('#descvallugLIRegion2').val());
        $('#idvallugCLICountry2').val($('#idvallugLICountry2').val());
        $('#descvallugCLICountry2').val($('#descvallugLICountry2').val());
        $('#txt_CLI_Zip2').val($('#txt_LI_Zip2').val());
        $('#txt_CLI_Remarks2').val($('#txt_LI_Remarks2').val());

        $('#cmbCLIPrepMail').enable(false);
        $('#lugCLIHomeOwnrshp').enable(false);
        //$('#descvallugCLIHomeOwnrshp').enable(false);
        $('#cb_CLI_FullAddress').enable(false);
        $('#txt_CLI_FullAddress').enable(false);
        $('#txt_CLI_LengthStay').enable(false);
        $('#txt_CLI_UnitNo').enable(false);
        $('#txt_CLI_FloorNo').enable(false);
        $('#txt_CLI_BldgNo').enable(false);
        $('#txt_CLI_BuildingName').enable(false);
        $('#txt_CLI_Landmark').enable(false);
        $('#txt_CLI_HouseNo').enable(false);
        $('#txt_CLI_StreetName').enable(false);
        $('#txt_CLI_Lot').enable(false);
        $('#txt_CLI_Block').enable(false);
        $('#txt_CLI_Phase').enable(false);
        $('#txt_CLI_Subdivision').enable(false);
        $('#txt_CLI_Zone').enable(false);
        $('#lugCLIBarangay').enable(false);
        //$('#descvallugCLIBarangay').val();
        $('#lugCLIMunicipality').enable(false);
        //$('#descvallugCLIMunicipality').val();
        //$('#idvallugCLIProvince').val();
        //$('#descvallugCLIProvince').val();
        //$('#idvallugCLIRegion').val();
        //$('#descvallugCLIRegion').val();
        //$('#idvallugCLICountry').val();
        //$('#descvallugCLICountry').val();
        $('#txt_CLI_Zip').enable(false);
        $('#txt_CLI_Remarks').enable(false);

        $('#cbCLIPresentAdd').enable(false);
        $('#lugCLIHomeOwnrshp2').enable(false);
        //$('#descvallugCLIHomeOwnrshp2').val();
        $('#cb_CLI_FullAddress2').enable(false);
        $('#txt_CLI_FullAddress2').enable(false);
        $('#txt_CLI_LengthStay2').enable(false);
        $('#txt_CLI_UnitNo2').enable(false);
        $('#txt_CLI_FloorNo2').enable(false);
        $('#txt_CLI_BldgNo2').enable(false);
        $('#txt_CLI_BuildingName2').enable(false);
        $('#txt_CLI_Landmark2').enable(false);
        $('#txt_CLI_HouseNo2').enable(false);
        $('#txt_CLI_StreetName2').enable(false);
        $('#txt_CLI_Lot2').enable(false);
        $('#txt_CLI_Block2').enable(false);
        $('#txt_CLI_Phase2').enable(false);
        $('#txt_CLI_Subdivision2').enable(false);
        $('#txt_CLI_Zone2').enable(false);
        $('#lugCLIBarangay2').enable(false);
        //$('#descvallugCLIBarangay2').val();
        $('#lugCLIMunicipality2').enable(false);
        //$('#descvallugCLIMunicipality2').val();
        //$('#idvallugCLIProvince2').val();
        //$('#descvallugCLIProvince2').val();
        //$('#idvallugCLIRegion2').val();
        //$('#descvallugCLIRegion2').val();
        //$('#idvallugCLICountry2').val();
        //$('#descvallugCLICountry2').val();
        $('#txt_CLI_Zip2').enable(false);
        $('#txt_CLI_Remarks2').enable(false);
    }
    else {
        $('#cmbCLIPrepMail').val('');
        $('#idvallugCLIHomeOwnrshp').val('');
        $('#descvallugCLIHomeOwnrshp').val('');
        $('#cb_CLI_FullAddress').prop('checked', false);
        $('#txt_CLI_FullAddress').val('');
        $('#txt_CLI_LengthStay').val('');
        $('#txt_CLI_UnitNo').val('');
        $('#txt_CLI_FloorNo').val('');
        $('#txt_CLI_BldgNo').val('');
        $('#txt_CLI_BuildingName').val('');
        $('#txt_CLI_Landmark').val('');
        $('#txt_CLI_HouseNo').val('');
        $('#txt_CLI_StreetName').val('');
        $('#txt_CLI_Lot').val('');
        $('#txt_CLI_Block').val('');
        $('#txt_CLI_Phase').val('');
        $('#txt_CLI_Subdivision').val('');
        $('#txt_CLI_Zone').val('');
        $('#idvallugCLIBarangay').val('');
        $('#descvallugCLIBarangay').val('');
        $('#idvallugCLIMunicipality').val('');
        $('#descvallugCLIMunicipality').val('');
        $('#idvallugCLIProvince').val('');
        $('#descvallugCLIProvince').val('');
        $('#idvallugCLIRegion').val('');
        $('#descvallugCLIRegion').val('');
        $('#idvallugCLICountry').val('');
        $('#descvallugCLICountry').val('');
        $('#txt_CLI_Zip').val('');
        $('#txt_CLI_Remarks').val('');

        $('#cbCLIPresentAdd').prop('checked', false);
        $('#idvallugCLIHomeOwnrshp2').val('');
        $('#descvallugCLIHomeOwnrshp2').val('');
        $('#cb_CLI_FullAddress2').prop('checked', false);
        $('#txt_CLI_FullAddress2').val('');
        $('#txt_CLI_LengthStay2').val('');
        $('#txt_CLI_UnitNo2').val('');
        $('#txt_CLI_FloorNo2').val('');
        $('#txt_CLI_BldgNo2').val('');
        $('#txt_CLI_BuildingName2').val('');
        $('#txt_CLI_Landmark2').val('');
        $('#txt_CLI_HouseNo2').val('');
        $('#txt_CLI_StreetName2').val('');
        $('#txt_CLI_Lot2').val('');
        $('#txt_CLI_Block2').val('');
        $('#txt_CLI_Phase2').val('');
        $('#txt_CLI_Subdivision2').val('');
        $('#txt_CLI_Zone2').val('');
        $('#idvallugCLIBarangay2').val('');
        $('#descvallugCLIBarangay2').val('');
        $('#idvallugCLIMunicipality2').val('');
        $('#descvallugCLIMunicipality2').val('');
        $('#idvallugCLIProvince2').val('');
        $('#descvallugCLIProvince2').val('');
        $('#idvallugCLIRegion2').val('');
        $('#descvallugCLIRegion2').val('');
        $('#idvallugCLICountry2').val('');
        $('#descvallugCLICountry2').val('');
        $('#txt_CLI_Zip2').val('');
        $('#txt_CLI_Remarks2').val('');

        $('#cmbCLIPrepMail').enable(true);
        $('#lugCLIHomeOwnrshp').enable(true);
        //$('#descvallugCLIHomeOwnrshp').enable(false);
        $('#cb_CLI_FullAddress').enable(true);
        $('#txt_CLI_FullAddress').enable(false);
        $('#txt_CLI_LengthStay').enable(true);
        $('#txt_CLI_UnitNo').enable(true);
        $('#txt_CLI_FloorNo').enable(true);
        $('#txt_CLI_BldgNo').enable(true);
        $('#txt_CLI_BuildingName').enable(true);
        $('#txt_CLI_Landmark').enable(true);
        $('#txt_CLI_HouseNo').enable(true);
        $('#txt_CLI_StreetName').enable(true);
        $('#txt_CLI_Lot').enable(true);
        $('#txt_CLI_Block').enable(true);
        $('#txt_CLI_Phase').enable(true);
        $('#txt_CLI_Subdivision').enable(true);
        $('#txt_CLI_Zone').enable(true);
        $('#lugCLIBarangay').enable(true);
        //$('#descvallugCLIBarangay').val();
        $('#lugCLIMunicipality').enable(true);
        $('#txt_CLI_Zip').enable(true);
        $('#txt_CLI_Remarks').enable(true);

        $('#cbCLIPresentAdd').enable(true);
        $('#lugCLIHomeOwnrshp2').enable(true);
        //$('#descvallugCLIHomeOwnrshp2').val();
        $('#cb_CLI_FullAddress2').enable(true);
        $('#txt_CLI_FullAddress2').enable(false);
        $('#txt_CLI_LengthStay2').enable(true);
        $('#txt_CLI_UnitNo2').enable(true);
        $('#txt_CLI_FloorNo2').enable(true);
        $('#txt_CLI_BldgNo2').enable(true);
        $('#txt_CLI_BuildingName2').enable(true);
        $('#txt_CLI_Landmark2').enable(true);
        $('#txt_CLI_HouseNo2').enable(true);
        $('#txt_CLI_StreetName2').enable(true);
        $('#txt_CLI_Lot2').enable(true);
        $('#txt_CLI_Block2').enable(true);
        $('#txt_CLI_Phase2').enable(true);
        $('#txt_CLI_Subdivision2').enable(true);
        $('#txt_CLI_Zone2').enable(true);
        $('#lugCLIBarangay2').enable(true);
        //$('#descvallugCLIBarangay2').val();
        $('#lugCLIMunicipality2').enable(true);
        $('#txt_CLI_Zip2').enable(true);
        $('#txt_CLI_Remarks2').enable(true);
    }

}

//$(document).on("change", "#txt_EI_Years", function () {
//    const txtEIYearsInput = document.getElementById('txt_EI_Years');
//    const selectedDate = new Date(txtEIYearsInput.value);
//    const currentDate = new Date();
//    const timeDifference = currentDate - selectedDate;
//    const years = Math.round(timeDifference / (365.25 * 24 * 60 * 60 * 1000));
//    $('#txt_EI_Month').val(years);
//});

function calculateAndSetYearsDifference(inputFieldId, resultFieldId) {
    const inputField = document.getElementById(inputFieldId);
    const resultField = document.getElementById(resultFieldId);
    const selectedDate = new Date(inputField.value);
    const currentDate = new Date();
    const timeDifference = currentDate - selectedDate;
    const years = Math.round(timeDifference / (365.25 * 24 * 60 * 60 * 1000));
    if (isNaN(years))
        resultField.value = 0;
    else
        resultField.value = years;
}



$(document).on("click", "#nwGridBorrowerInfoCon .nwgrid_Delete,#nwGridSigntrsInfoCon .nwgrid_Delete", function (e) {
    func_ActionDriven("actEmpSourceAst", true);
});

function addDecimalIfNotPresent(inputField) {
    let value = inputField.value;

    // Check if the value is empty or contains only spaces
    if (!value.trim()) {
        inputField.value = '0.00';
    } else if (value === '0') {
        inputField.value = '0.00';
    } else {
        if (inputField.value.indexOf('.') === -1) {
            var wholePart, decimalPart, inputStr, roundedNumber;
            
            if (inputField.value.length < 4) {
                inputField.value = value + '.00';
                inputStr = inputField.value.padStart('0', -4);
                wholePart = inputField.value.slice(0, -2);
                decimalPart = inputField.value.slice(-2);
            }
            combinedNumber = parseFloat(wholePart + '.' + decimalPart);
            roundedNumber = combinedNumber.toFixed(2);

            inputField.value = roundedNumber;
        }
        else {
            // If there are decimal places, ensure two decimal values
            let decimalValues = value.substring(inputField.value.indexOf('.') + 1);
            if (decimalValues.length === 1) {
                inputField.value = value + '0';
            } else if (decimalValues.length > 2) {
                inputField.value = value.substring(0, inputField.value.indexOf('.') + 3);
            }
        }
    }
}

//function IntNDecimalFormat(GridName, KeyCode, IntLength, DecimalLength) {
//    var sliptvalue;

//    //if (KeyCode == 109 || KeyCode == 189) {
//    //    // IntLength = IntLength + 1;
//    //    hasNeg = true;
//    //}

//    if (currVal.indexOf('-') == -1)
//        hasNeg = false;
//    else
//        hasNeg = true;


//    if (hasNeg)
//        IntLength = IntLength + 1;

//    var getvalue = $("#" + GridName).val();

//    //39 - right, 40 - down, 37 - left, 38 - up
//    if (KeyCode == 8 || KeyCode == 37 || KeyCode == 38 || KeyCode == 39 || KeyCode == 40)
//        return true;
//    else if (KeyCode == 189 || KeyCode == 109)
//        return true;

//    if ($("#" + GridName).val().indexOf('.') != -1 && (KeyCode == 190 || KeyCode == 110))
//        event.preventDefault();

//    var positionCursor = $("#" + GridName).prop("selectionStart");
//    //var positionCursor = $(".txtCntrMinVolReq").prop("selectionStart");
//    var ifIntOrDec;
//    var IntLen = IntLength;
//    var DecLen = DecimalLength;

//    if (getvalue.indexOf(".") != -1) {
//        sliptvalue = getvalue.split(".");
//        var WholeNumber = sliptvalue[0].length;
//        var DecimalPlace = sliptvalue[1].length;

//        if (positionCursor >= 1 && positionCursor <= WholeNumber)
//            ifIntOrDec = "Int";
//        else if (positionCursor >= (WholeNumber + 1) && positionCursor <= (WholeNumber + 1) + DecimalPlace)
//            ifIntOrDec = "Dec";

//        if (sliptvalue[0].length >= IntLen && ifIntOrDec == "Int")
//            return false;
//        else if (sliptvalue[1].length >= DecLen && ifIntOrDec == "Dec")
//            return false;
//        else
//            return true;

//    } else {

//        if (KeyCode == 190 || KeyCode == 110) {
//            if ($("#" + GridName).val().indexOf('.') != -1 && (KeyCode == 190 || KeyCode == 110))
//                event.preventDefault();
//        } else {
//            if (getvalue.length >= IntLen)
//                return false;
//            else
//                return true;
//        }
//    }
//}




var _crnwTR = "";
$(document).on('focus', '.txt_BR_PerShare ', function () {
    _crnwTR = crnwTR;
});

$(document).on('change blur input', '.txt_BR_PerShare', function () {

    var rate = getNumReplace(_crnwTR.find("td:eq(" + SPR_BR_PerShare + ") input").val()) || 0.00;
    var totalRate = 0.00;

    crnwTable = $("#nwGridBenefOwnData .tblGridBody tbody ");
    var maxRow = nwLib.nwTempTable_Row_Count("nwGridBenefOwnCon");

    for (var i = 0; i <= maxRow; i++) {
        var loopRate = getNumReplace(crnwTable.find("tr:eq(" + i + ")").find('td:eq(' + (SPR_BR_PerShare) + ') input').val()) || 0.00;
        totalRate += loopRate;

        if (totalRate > 100.00) {
            _crnwTR.find("td:eq(" + SPR_BR_PerShare + ") input").val('0.00');
            MessageBox('Cannot Proceed. Total Percentage of Shares cannot be exceeded 100.', menuTitle, 'error');
        }
    }


    

    return;

});

function LoadLocation() {
    if ($('#cbPresentAdd').prop("checked") == true) {
        $('#idvallugLIHomeOwnrshp2').val($('#idvallugLIHomeOwnrshp').val())
        $('#descvallugLIHomeOwnrshp2').val($('#descvallugLIHomeOwnrshp').val())
        $('#cb_LI_FullAddress2').prop("checked",$('#cb_LI_FullAddress').prop("checked"))
        $('#txt_LI_FullAddress2').val($('#txt_LI_FullAddress').val())
        $('#txt_LI_LengthStay2').val($('#txt_LI_LengthStay').val())
        $('#txt_LI_UnitNo2').val($('#txt_LI_UnitNo').val())
        $('#txt_LI_FloorNo2').val($('#txt_LI_FloorNo').val())
        $('#txt_LI_BldgNo2').val($('#txt_LI_BldgNo').val())
        $('#txt_LI_BuildingName2').val($('#txt_LI_BuildingName').val())
        $('#txt_LI_Landmark2').val($('#txt_LI_Landmark').val())
        $('#txt_LI_HouseNo2').val($('#txt_LI_HouseNo').val())
        $('#txt_LI_StreetName2').val($('#txt_LI_StreetName').val())
        $('#txt_LI_Lot2').val($('#txt_LI_Lot').val())
        $('#txt_LI_Block2').val($('#txt_LI_Block').val())
        $('#txt_LI_Phase2').val($('#txt_LI_Phase').val())
        $('#txt_LI_Subdivision2').val($('#txt_LI_Subdivision').val())
        $('#txt_LI_Zone2').val($('#txt_LI_Zone').val())
        $('#idvallugLIBarangay2').val($('#idvallugLIBarangay').val())
        $('#descvallugLIBarangay2').val($('#descvallugLIBarangay').val())
        $('#idvallugLIMunicipality2').val($('#idvallugLIMunicipality').val())
        $('#descvallugLIMunicipality2').val($('#descvallugLIMunicipality').val())
        $('#idvallugLIProvince2').val($('#idvallugLIProvince').val())
        $('#descvallugLIProvince2').val($('#descvallugLIProvince').val())
        $('#idvallugLIRegion2').val($('#idvallugLIRegion').val())
        $('#descvallugLIRegion2').val($('#descvallugLIRegion').val())
        $('#idvallugLICountry2').val($('#idvallugLICountry').val())
        $('#descvallugLICountry2').val($('#descvallugLICountry').val())
        $('#txt_LI_Zip2').val($('#txt_LI_Zip').val())
        $('#txt_LI_Remarks2').val($('#txt_LI_Remarks').val())
    }

    if ($('#cbSLIPresentAdd').prop("checked") == true) {
        $('#idvallugSLIHomeOwnrshp2').val($('#idvallugSLIHomeOwnrshp').val())
        $('#descvallugSLIHomeOwnrshp2').val($('#descvallugSLIHomeOwnrshp').val())
        $('#cb_SLI_FullAddress2').prop("checked", $('#cb_SLI_FullAddress').prop("checked"))
        $('#txt_SLI_FullAddress2').val($('#txt_SLI_FullAddress').val())
        $('#txt_SLI_LengthStay2').val($('#txt_SLI_LengthStay').val())
        $('#txt_SLI_UnitNo2').val($('#txt_SLI_UnitNo').val())
        $('#txt_SLI_FloorNo2').val($('#txt_SLI_FloorNo').val())
        $('#txt_SLI_BldgNo2').val($('#txt_SLI_BldgNo').val())
        $('#txt_SLI_BuildingName2').val($('#txt_SLI_BuildingName').val())
        $('#txt_SLI_Landmark2').val($('#txt_SLI_Landmark').val())
        $('#txt_SLI_HouseNo2').val($('#txt_SLI_HouseNo').val())
        $('#txt_SLI_StreetName2').val($('#txt_SLI_StreetName').val())
        $('#txt_SLI_Lot2').val($('#txt_SLI_Lot').val())
        $('#txt_SLI_Block2').val($('#txt_SLI_Block').val())
        $('#txt_SLI_Phase2').val($('#txt_SLI_Phase').val())
        $('#txt_SLI_Subdivision2').val($('#txt_SLI_Subdivision').val())
        $('#txt_SLI_Zone2').val($('#txt_SLI_Zone').val())
        $('#idvallugSLIBarangay2').val($('#idvallugSLIBarangay').val())
        $('#descvallugSLIBarangay2').val($('#descvallugSLIBarangay').val())
        $('#idvallugSLIMunicipality2').val($('#idvallugSLIMunicipality').val())
        $('#descvallugSLIMunicipality2').val($('#descvallugSLIMunicipality').val())
        $('#idvallugSLIProvince2').val($('#idvallugSLIProvince').val())
        $('#descvallugSLIProvince2').val($('#descvallugSLIProvince').val())
        $('#idvallugSLIRegion2').val($('#idvallugSLIRegion').val())
        $('#descvallugSLIRegion2').val($('#descvallugSLIRegion').val())
        $('#idvallugSLICountry2').val($('#idvallugSLICountry').val())
        $('#descvallugSLICountry2').val($('#descvallugSLICountry').val())
        $('#txt_SLI_Zip2').val($('#txt_SLI_Zip').val())
        $('#txt_SLI_Remarks2').val($('#txt_SLI_Remarks').val())
    }

    if ($('#cbCLIPresentAdd').prop("checked") == true) {
        $('#idvallugCLIHomeOwnrshp2').val($('#idvallugCLIHomeOwnrshp').val())
        $('#descvallugCLIHomeOwnrshp2').val($('#descvallugCLIHomeOwnrshp').val())
        $('#cb_CLI_FullAddress2').prop("checked", $('#cb_CLI_FullAddress').prop("checked"))
        $('#txt_CLI_FullAddress2').val($('#txt_CLI_FullAddress').val())
        $('#txt_CLI_LengthStay2').val($('#txt_CLI_LengthStay').val())
        $('#txt_CLI_UnitNo2').val($('#txt_CLI_UnitNo').val())
        $('#txt_CLI_FloorNo2').val($('#txt_CLI_FloorNo').val())
        $('#txt_CLI_BldgNo2').val($('#txt_CLI_BldgNo').val())
        $('#txt_CLI_BuildingName2').val($('#txt_CLI_BuildingName').val())
        $('#txt_CLI_Landmark2').val($('#txt_CLI_Landmark').val())
        $('#txt_CLI_HouseNo2').val($('#txt_CLI_HouseNo').val())
        $('#txt_CLI_StreetName2').val($('#txt_CLI_StreetName').val())
        $('#txt_CLI_Lot2').val($('#txt_CLI_Lot').val())
        $('#txt_CLI_Block2').val($('#txt_CLI_Block').val())
        $('#txt_CLI_Phase2').val($('#txt_CLI_Phase').val())
        $('#txt_CLI_Subdivision2').val($('#txt_CLI_Subdivision').val())
        $('#txt_CLI_Zone2').val($('#txt_CLI_Zone').val())
        $('#idvallugCLIBarangay2').val($('#idvallugCLIBarangay').val())
        $('#descvallugCLIBarangay2').val($('#descvallugCLIBarangay').val())
        $('#idvallugCLIMunicipality2').val($('#idvallugCLIMunicipality').val())
        $('#descvallugCLIMunicipality2').val($('#descvallugCLIMunicipality').val())
        $('#idvallugCLIProvince2').val($('#idvallugCLIProvince').val())
        $('#descvallugCLIProvince2').val($('#descvallugCLIProvince').val())
        $('#idvallugCLIRegion2').val($('#idvallugCLIRegion').val())
        $('#descvallugCLIRegion2').val($('#descvallugCLIRegion').val())
        $('#idvallugCLICountry2').val($('#idvallugCLICountry').val())
        $('#descvallugCLICountry2').val($('#descvallugCLICountry').val())
        $('#txt_CLI_Zip2').val($('#txt_CLI_Zip').val())
        $('#txt_CLI_Remarks2').val($('#txt_CLI_Remarks').val())
    }

    if ($('#cbSigLIPresentAdd').prop("checked") == true) {
        $('#idvallugSigLIHomeOwnrshp2').val($('#idvallugSigLIHomeOwnrshp').val())
        $('#descvallugSigLIHomeOwnrshp2').val($('#descvallugSigLIHomeOwnrshp').val())
        $('#cb_SigLI_FullAddress2').prop("checked", $('#cb_SigLI_FullAddress').prop("checked"))
        $('#txt_SigLI_FullAddress2').val($('#txt_SigLI_FullAddress').val())
        $('#txt_SigLI_LengthStay2').val($('#txt_SigLI_LengthStay').val())
        $('#txt_SigLI_UnitNo2').val($('#txt_SigLI_UnitNo').val())
        $('#txt_SigLI_FloorNo2').val($('#txt_SigLI_FloorNo').val())
        $('#txt_SigLI_BldgNo2').val($('#txt_SigLI_BldgNo').val())
        $('#txt_SigLI_BuildingName2').val($('#txt_SigLI_BuildingName').val())
        $('#txt_SigLI_Landmark2').val($('#txt_SigLI_Landmark').val())
        $('#txt_SigLI_HouseNo2').val($('#txt_SigLI_HouseNo').val())
        $('#txt_SigLI_StreetName2').val($('#txt_SigLI_StreetName').val())
        $('#txt_SigLI_Lot2').val($('#txt_SigLI_Lot').val())
        $('#txt_SigLI_Block2').val($('#txt_SigLI_Block').val())
        $('#txt_SigLI_Phase2').val($('#txt_SigLI_Phase').val())
        $('#txt_SigLI_Subdivision2').val($('#txt_SigLI_Subdivision').val())
        $('#txt_SigLI_Zone2').val($('#txt_SigLI_Zone').val())
        $('#idvallugSigLIBarangay2').val($('#idvallugSigLIBarangay').val())
        $('#descvallugSigLIBarangay2').val($('#descvallugSigLIBarangay').val())
        $('#idvallugSigLIMunicipality2').val($('#idvallugSigLIMunicipality').val())
        $('#descvallugSigLIMunicipality2').val($('#descvallugSigLIMunicipality').val())
        $('#idvallugSigLIProvince2').val($('#idvallugSigLIProvince').val())
        $('#descvallugSigLIProvince2').val($('#descvallugSigLIProvince').val())
        $('#idvallugSigLIRegion2').val($('#idvallugSigLIRegion').val())
        $('#descvallugSigLIRegion2').val($('#descvallugSigLIRegion').val())
        $('#idvallugSigLICountry2').val($('#idvallugSigLICountry').val())
        $('#descvallugSigLICountry2').val($('#descvallugSigLICountry').val())
        $('#txt_SigLI_Zip2').val($('#txt_SigLI_Zip').val())
        $('#txt_SigLI_Remarks2').val($('#txt_SigLI_Remarks').val())
    }
    
}


$.mask.definitions['9'] = '';
$.mask.definitions['9'] = '[0-9]';

$(document).on("keydown", "#txt_OBI_NetProfit", function (e) {
    currVal = $(this).val();
    return IntNDecimalFormat("txt_OBI_NetProfit", e.which, wholeNum, precision);
});

$(document).on("blur change", "#txt_OBI_NetProfit", function (e) {
    if ($(this).val != "")
        $(this).val(commafy($(this).val()));
});

function commafy(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    } else if (str[0].length == 0)
        str[0] = "0";

    if (str[0].length >= 1 && (str[1] == "" || str[1] == undefined))
        str[1] = "00";
    else if (str[1].length == 1) {
        str[1] += "0";
    }

    //if (str[1] && str[1].length >= 5) {
    //    str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    //}
    return str.join('.');
}

function IntNDecimalFormat(GridName, KeyCode, IntLength, DecimalLength) {
    var sliptvalue;

    //if (KeyCode == 109 || KeyCode == 189) {
    //    // IntLength = IntLength + 1;
    //    hasNeg = true;
    //}

    if (currVal.indexOf('-') == -1)
        hasNeg = false;
    else
        hasNeg = true;


    if (hasNeg)
        IntLength = IntLength + 1;

    var getvalue = $("#" + GridName).val();

    //39 - right, 40 - down, 37 - left, 38 - up
    if (KeyCode == 8 || KeyCode == 37 || KeyCode == 38 || KeyCode == 39 || KeyCode == 40)
        return true;
    else if (KeyCode == 189 || KeyCode == 109)
        return true;

    if ($("#" + GridName).val().indexOf('.') != -1 && (KeyCode == 190 || KeyCode == 110))
        event.preventDefault();

    var positionCursor = $("#" + GridName).prop("selectionStart");
    //var positionCursor = $(".txtCntrMinVolReq").prop("selectionStart");
    var ifIntOrDec;
    var IntLen = IntLength;
    var DecLen = DecimalLength;

    if (getvalue.indexOf(".") != -1) {
        sliptvalue = getvalue.split(".");
        var WholeNumber = sliptvalue[0].length;
        var DecimalPlace = sliptvalue[1].length;

        if (positionCursor >= 1 && positionCursor <= WholeNumber)
            ifIntOrDec = "Int";
        else if (positionCursor >= (WholeNumber + 1) && positionCursor <= (WholeNumber + 1) + DecimalPlace)
            ifIntOrDec = "Dec";

        if (sliptvalue[0].length >= IntLen && ifIntOrDec == "Int")
            return false;
        else if (sliptvalue[1].length >= DecLen && ifIntOrDec == "Dec")
            return false;
        else
            return true;

    } else {

        if (KeyCode == 190 || KeyCode == 110) {
            if ($("#" + GridName).val().indexOf('.') != -1 && (KeyCode == 190 || KeyCode == 110))
                event.preventDefault();
        } else {
            if (getvalue.length >= IntLen)
                return false;
            else
                return true;
        }
    }
}



$(document).on("click", "#noah-webui-default-Collapse", function (e) {
    if ($('#noah-webui-default-Collapse').text() == "Collapse") {
        $('#noah-webui-default-Collapse').text("Expand");
        $('.nk-li').prop('checked', false);
        $('#noah-webui-default-Collapse').removeClass("btn-tb-collapse")
        $('#noah-webui-default-Collapse').addClass("btn-tb-expand")
    }
    else {
        $('#noah-webui-default-Collapse').text("Collapse");
        $('.nk-li').prop('checked', true);
        $('#noah-webui-default-Collapse').removeClass("btn-tb-expand")
        $('#noah-webui-default-Collapse').addClass("btn-tb-collapse")
    }
    return false;
});

$(document).on("click", "#nkTabs_b_1", function (e) {
    setTimeout(function () {
        nwGridIndCon_Book.ActiveSheet.Refresh();
        //func_SpreadResizeonContainer($("#nwGridIndCon"));
    }, 100);
    //return false;
});


$(document).on("click", "#nkTabs_b_3", function (e) {
    setTimeout(function () {
        nwGridContactInfoCon_Book.ActiveSheet.Refresh();
        //func_SpreadResizeonContainer($("#nwGridContactInfoCon"));
    }, 100);
    //return false;
});

$(document).on("click", "#nkTabs_b_5", function (e) {
    setTimeout(function () {
        nwGridOthSrcIncInfoCon_Book.ActiveSheet.Refresh();
        //func_SpreadResizeonContainer($("#nwGridOthSrcIncInfoCon"));
    }, 100);
    //return false;
});

$(document).on("click", "#nkTabs_b_6", function (e) {
    setTimeout(function () {
        nwGridDependntInfoCon_Book.ActiveSheet.Refresh();
        //func_SpreadResizeonContainer($("#nwGridOthSrcIncInfoCon"));
    }, 100);
    //return false;
});

$(document).on("click", "#nkTabs_b_7", function (e) {
    setTimeout(function () {
        nwGridSpoCon_Book.ActiveSheet.Refresh();
        nwGridSpouseConInfoCon_Book.ActiveSheet.Refresh();
        //func_SpreadResizeonContainer($("#nwGridOthSrcIncInfoCon"));
    }, 100);
    //return false;
});

$(document).on("click", "#nkTabs_b_8", function (e) {
    setTimeout(function () {
        nwGridBorrowerInfoCon_Book.ActiveSheet.Refresh();
        //func_SpreadResizeonContainer($("#nwGridOthSrcIncInfoCon"));
    }, 100);
    //return false;
});

$(document).on("click", "#nkTabs_b_9", function (e) {
    setTimeout(function () {
        nwGridSigntrsInfoCon_Book.ActiveSheet.Refresh();
        //func_SpreadResizeonContainer($("#nwGridOthSrcIncInfoCon"));
    }, 100);
    //return false;
});

$(document).on("click", "#nkTabs_b_10", function (e) {
    setTimeout(function () {
        nwGridBenefOwnCon_Book.ActiveSheet.Refresh();
        //func_SpreadResizeonContainer($("#nwGridOthSrcIncInfoCon"));
    }, 100);
    //return false;
});

$(document).on("click", "#nkTabs_b_11", function (e) {
    setTimeout(function () {
        nwGridBankReferenceCon_Book.ActiveSheet.Refresh();
        nwGridTradeReferenceCon_Book.ActiveSheet.Refresh();
        //func_SpreadResizeonContainer($("#nwGridOthSrcIncInfoCon"));
    }, 100);
    //return false;
});

$(document).on("click", "#nkTabs_b_13", function (e) {
    setTimeout(function () {
        nwGridCreditLineCon_Book.ActiveSheet.Refresh();
        //func_SpreadResizeonContainer($("#nwGridOthSrcIncInfoCon"));
    }, 100);
    //return false;
});



function p8Spread_DblClick(canvasID, row, col) {

    if (nwDocno != '') return;

    if (canvasID == "nwGridContactInfoCon") {
        var Grid = nwGridContactInfoCon_Book.ActiveSheet;

        if (col == (SPR_CI_CommType - 1)) {
            lookUpCustomize("lugCommType", 1, undefined, true)
        }
    }

    else if (canvasID == "nwGridBankReferenceCon") {
        var Grid = nwGridBankReferenceCon_Book.ActiveSheet;

        if (col == (SPR_bank -1 )) {
            lookUpCustomize("lugBank", 1, undefined, true)
        }

        else if (col == (SPR_cashtype - 1)) {
            lookUpCustomize("lugCashType", 1, undefined, true)
        }
    }

    else if (canvasID == "nwGridOthSrcIncInfoCon") {
        var Grid = nwGridOthSrcIncInfoCon_Book.ActiveSheet;

        if (col == SPR_SrcIncInfo_SrcIncomeCode - 1) {
            lookUpCustomize("lugSrcIncInfo_SrcIncome", 1, undefined, true)
        }
        else if (col == SPR_SrcIncInfo_JobTitle - 1) {
            lookUpCustomize("lugSrcIncInfo_JobTitle", 1, undefined, true)
        }
    }

    else if (canvasID == "nwGridBorrOthSrcIncInfoCon") {
        var Grid = nwGridBorrOthSrcIncInfoCon_Book.ActiveSheet;

        if (col == (SPR_Borr_SrcIncomeCode - 1)) {
            lookUpCustomize("lugBorr_SrcIncome", 1, undefined, true)
        }
        else if (col == (SPR_Borr_JobTitle - 1)) {
            lookUpCustomize("lugBorr_JobTitle", 1, undefined, true)
        }
    }

    else if (canvasID == "nwGridSpouseConInfoCon") {
        var Grid = nwGridSpouseConInfoCon_Book.ActiveSheet;

        if (col == (SPR_SCI_CommType - 1)) {
            lookUpCustomize("lugSCI_CommType", 1, undefined, true)
        }
    }

    else if (canvasID == "nwGridCoBorrowerContactInfoCon") {
        var Grid = nwGridCoBorrowerContactInfoCon_Book.ActiveSheet;

        if (col == (SPR_CCI_CommType - 1)) {
            lookUpCustomize("lugCCI_CommType", 1, undefined, true)
        }
    }

    else if (canvasID == "nwGridSigntryContactDtlsCon") {
        var Grid = nwGridSigntryContactDtlsCon_Book.ActiveSheet;

        if (col == (SPR_SigCI_CommType - 1)) {
            lookUpCustomize("lugSigCI_CommType", 1, undefined, true)
        }
    }

    else if (canvasID == "nwGridDependntInfoCon") {
        var Grid = nwGridDependntInfoCon_Book.ActiveSheet;

        if (col == (SPR_SigCI_CommType - 1)) {
            lookUpCustomize("lugDepnfo_Relation", 1, undefined, true)
        }
    }

    else if (canvasID == "nwGridPaymentDtlsCon") {
        var Grid = nwGridPaymentDtlsCon_Book.ActiveSheet;

        if (col == (SPR_currencydesc - 1)) {
            lookUpCustomize("lugPD_Currency", 1, undefined, true)
        }
        else if (col == (SPR_directiondesc - 1)) {
            lookUpCustomize("lugPD_Direction", 1, undefined, true)
        }
        else if (col == (SPR_methoddesc - 1)) {
            lookUpCustomize("lugPD_Method", 1, undefined, true)
        }
        else if (col == (SPR_initialMethoddesc - 1)) {
            lookUpCustomize("lugPD_InitialMethod", 1, undefined, true)
        }
        else if (col == (SPR_effectiveFordesc - 1)) {
            lookUpCustomize("lugPD_EffectiveFor", 1, undefined, true)
        }
    }



    else if (canvasID == "nwGridBenefOwnCon") {
        var Grid = nwGridBenefOwnCon_Book.ActiveSheet;

        if (col == (SPR_BR_Nationality - 1)) {
            lookUpCustomize("lugBR_Nationality", 1, undefined, true)
        }
        //else if (col == (SPR_BR_Desig - 1)) {
        //    lookUpCustomize("lugBR_Desig", 1, undefined, true)
        //}
    }

    else if (canvasID == "nwGridBorrowerInfoCon") {
        var Grid = nwGridBorrowerInfoCon_Book.ActiveSheet;

        if (col == (SPR_BInfo_RelationShip - 1)) {
            lookUpCustomize("lugBInfo_RelationShip", 1, undefined, true)
        }
        else if (col == (SPR_BInfo_Salutation - 1)) {
            lookUpCustomize("lugBInfo_Salutation", 1, undefined, true)
        }
        else if (col == (SPR_BInfo_namesuffix - 1)) {
            lookUpCustomize("lugBInfo_namesuffix", 1, undefined, true)
        }
        else if (col == (SPR_BInfo_Gender - 1)) {
            lookUpCustomize("lugBInfo_Gender", 1, undefined, true)
        }
        else if (col == (SPR_BInfo_maritalstatus - 1)) {
            lookUpCustomize("lugBInfo_maritalstatus", 1, undefined, true)
        }
        else if (col == (SPR_BInfo_Nationality - 1)) {
            lookUpCustomize("lugBInfo_Nationality", 1, undefined, true)
        }
        else if (col == (SPR_BInfo_Politicposition - 1)) {
            lookUpCustomize("lugBInfo_Politicposition", 1, undefined, true)
        }
        else if (col == (SPR_BInfo_Employmentsource - 1)) {
            lookUpCustomize("lugBInfo_Employmentsource", 1, undefined, true)
        }
    }

    else if (canvasID == "nwGridSigntrsInfoCon") {
        var Grid = nwGridSigntrsInfoCon_Book.ActiveSheet;
        if (col == (SPR_SgInfo_RelationshipDesc - 1)) {
            lookUpCustomize("lugSgInfo_RelationShip", 1, undefined, true)
        }
        else if (col == (SPR_SgInfo_Salutation - 1)) {
            lookUpCustomize("lugSgInfo_salutation", 1, undefined, true)
        }
        else if (col == (SPR_SgInfo_namesuffix - 1)) {
            lookUpCustomize("lugSgInfo_namesuffix", 1, undefined, true)
        }
        else if (col == (SPR_SgInfo_Gender - 1)) {
            lookUpCustomize("lugSgInfo_Gender", 1, undefined, true)
        }
        else if (col == (SPR_SgInfo_maritalstatus - 1)) {
            lookUpCustomize("lugSgInfo_maritalstatus", 1, undefined, true)
        }
        else if (col == (SPR_SgInfo_Nationality - 1)) {
            lookUpCustomize("lugSgInfo_Nationality", 1, undefined, true)
        }
        else if (col == (SPR_SgInfo_Politicposition - 1)) {
            lookUpCustomize("lugSgInfo_Politicposition", 1, undefined, true)
        }
        else if (col == (SPR_SgInfo_Employmentsource - 1)) {
            lookUpCustomize("lugSgInfo_Employmentsource", 1, undefined, true)
        }
    }
}

function p8Spread_Change(canvasID, row, col) {
    if (canvasID == "nwGridDependntInfoCon") {
        if (col == SPR_Depnfo_Birthdate - 1) {
            BirthDate(row);
        } else if (col == SPR_BInfo_ContctDetails - 1) {
            nwcurrIndex = row;
            brlineid = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_LINEID - 1, row); //$('#nwGridBorrowerInfoCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_BInfo_LINEID + ')').text();
            code = $("#txtBorrowersCode").val();

            if (code == '' || brlineid == '') {
                MessageBox('Cannot Proceed.  Please Save the record first.', menuTitle);
            }
            else {
                nwLoading_Start("xactViewContactDtlsBorr", crLoadingHTML);
                nwPopupForm_ShowModal('nwBorrContactDtls');

                if (nwDocno != '' || $('#txtStatusForEntry').val() != '1')
                    $('#btnsaveBCD').enable(false);
                else
                    $('#btnsaveBCD').enable(true);

                $("#nwBorrContactDtls").css({ "min-width": "30%" });
                $("#nwBorrContactDtls").css({ "min-height": "30%" });
                nwParameter_Add_Table('nwGridCoBorrowerContactInfoCon', false);
                nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());
                nwParameter_Add('brlineid', brlineid);
                func_ActionDriven("actViewContactDtlsBorr", false);
            }
            return false;
        }
    } else if (canvasID == "nwGridPaymentDtlsCon") {
        if (col == SPR_effectiveFrom - 1) {
            var from = nwGridPaymentDtlsCon_Book.ActiveSheet.GetValue(SPR_effectiveFrom - 1, row);//$('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_effectiveFrom + ') input').val();
            //var to = $('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_effectiveTo + ') input').val();
            var currentDate = new Date();

            // Extract the components of the date (month, day, year)
            var month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
            var day = currentDate.getDate();
            var year = currentDate.getFullYear();

            // Format the date as "MM/DD/YYYY"
            var formattedDate = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + '/' + year;

            if (Date.parse(from) < Date.parse(formattedDate)) {
                MessageBox("Cannot Proceed. Effective From must be equal or later than the current server date. \n", "Payment Details");
                nwGridPaymentDtlsCon_Book.ActiveSheet.SetText(SPR_effectiveFrom - 1, row, formattedDate);//$('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_effectiveFrom + ') input').val(formattedDate);
            }
            else
                return false;
        } else if (col == SPR_effectiveTo - 1) {
            var from = nwGridPaymentDtlsCon_Book.ActiveSheet.GetValue(SPR_effectiveFrom - 1, row);//$('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_effectiveFrom + ') input').val();
            var to = nwGridPaymentDtlsCon_Book.ActiveSheet.GetValue(SPR_effectiveTo - 1, row);//$('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_effectiveTo + ') input').val();

            if (Date.parse(to) < Date.parse(from)) {
                MessageBox("Cannot Proceed. Effective To must be equal or later than Effective From. \n", "Payment Details");
                nwGridPaymentDtlsCon_Book.ActiveSheet.SetText(SPR_effectiveTo - 1, row, from);//$('#nwGridPaymentDtlsCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + (SPR_effectiveTo - 1) + ') input').val(to);
            }
            else
                return false;
        }
    }
}



function p8Spread_Click(canvasID, row, col) {



    if (canvasID == "nwGridBorrowerInfoCon") {


        if (col == SPR_BInfo_Politic - 1) {
            var isEnabled = nwGridBorrowerInfoCon_Book.ActiveSheet.GetEnabled(col, row);
            if (!isEnabled)
                return false;

            checkBPEP();
        }
        else if (col == SPR_BInfo_ContctDetails - 1) {
            nwcurrIndex = row;
            brlineid = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_LINEID - 1, row); //$('#nwGridBorrowerInfoCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_BInfo_LINEID + ')').text();
            code = $("#txtBorrowersCode").val();

            if (code == '' || brlineid == '') {
                MessageBox('Cannot Proceed.  Please Save the record first.', menuTitle);
            }
            else {
                nwLoading_Start("xactViewContactDtlsBorr", crLoadingHTML);
                nwPopupForm_ShowModal('nwBorrContactDtls');

                if (nwDocno != '' || $('#txtStatusForEntry').val() != '1')
                    $('#btnsaveBCD').enable(false);
                else
                    $('#btnsaveBCD').enable(true);

                $("#nwBorrContactDtls").css({ "min-width": "30%" });
                $("#nwBorrContactDtls").css({ "min-height": "30%" });
                nwParameter_Add_Table('nwGridCoBorrowerContactInfoCon', false);
                nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());
                nwParameter_Add('brlineid', brlineid);
                //nwParameter_Add('contInp', contInp);
                func_ActionDriven("actViewContactDtlsBorr", false);
            }
            return false;
        }
        else if (col == SPR_BInfo_LocDetails - 1) {
            nwcurrIndex = row;
            brlineid = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_LINEID - 1, row);
            code = $("#txtBorrowersCode").val();
            nwParameter_Add('brlineid', brlineid);
            nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());

            if (code == '' || brlineid == '') {
                MessageBox('Cannot Proceed.  Please Save the record first.', menuTitle);
            }
            else {
                nwLoading_Start("actnwBorrLocationDtls", crLoadingHTML);
                nwPopupForm_ShowModal('nwBorrLocationDtls');

                if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
                    $('#btnsaveLocBorr').enable(false);
                    $('.addchgBorrLocInfo').enable(false);
                    $('.addchgBorrLocInfo2').enable(false);
                    $('#cbCLISBLI').enable(false);
                } else {
                    $('#btnsaveLocBorr').enable(true);
                    $('#cbCLISBLI').enable(true);
                }



                $("#nwBorrLocationDtls").css({ "min-width": "80%" });
                $("#nwBorrLocationDtls").css({ "min-height": "80%" });
                cust_GetPara();
                func_ActionDriven("actnwBorrLocationDtls", false);
            }

            return false;
        }
        else if (col == SPR_BInfo_EmpInfo - 1) {
            nwcurrIndex = row;
            brlineid = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_LINEID - 1, row);
            code = $("#txtBorrowersCode").val();
            nwParameter_Add('brlineid', brlineid);
            nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());

            if (code == '' || brlineid == '') {
                MessageBox('Cannot Proceed.  Please Save the record first.', menuTitle);
            }
            else {
                nwLoading_Start("actnwBorrEmployeeDtls", crLoadingHTML);
                cust_GetPara();
                phoneBor();
                //mobileFormat();
                nwPopupForm_ShowModal('nwBorrEmployeeDtls');
                if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
                    $('#btnsaveEmpBorr').enable(false);
                    $('#txt_CEI_Years').enable(false);
                    $('#txt_CEI_Month').enable(false);
                    $('.addchgEmpAddressBorrInfo').enable(false);
                } else {
                    $('#btnsaveEmpBorr').enable(true);
                }


                func_ActionDriven("actnwBorrEmployeeDtls", false);
            }
            return false;
        }
        else if (col == SPR_BInfo_BusInfor - 1) {
            nwcurrIndex = row;
            brlineid = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_LINEID - 1, row);
            code = $("#txtBorrowersCode").val();
            nwParameter_Add('brlineid', brlineid);
            nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());

            if (code == '' || brlineid == '') {
                MessageBox('Cannot Proceed.  Please Save the record first.', menuTitle);
            }
            else {
                nwLoading_Start("actnwBorrBussDtls", crLoadingHTML);
                cust_GetPara();
                phoneBor();
                //mobileFormat();
                nwPopupForm_ShowModal('nwBorrBussDtls');
                if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
                    $('#btnsaveBussBorr').enable(false);
                    $('#txt_CBI_Years').enable(false);
                    $('#txt_CBI_Month').enable(false);
                } else {
                    $('#btnsaveBussBorr').enable(true);
                }


                func_ActionDriven("actnwBorrBussDtls", false);
            }
            return false;
        }
        else if (col == SPR_BInfo_OthSrc - 1) {
            nwcurrIndex = row;
            brlineid = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_LINEID - 1, row);
            code = $("#txtBorrowersCode").val();
            nwParameter_Add('brlineid', brlineid);
            nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());

            if (code == '' || brlineid == '') {
                MessageBox('Cannot Proceed.  Please Save the record first.', menuTitle);
            }
            else {
                nwLoading_Start("actOthSrc", crLoadingHTML);
                cust_GetPara();
                nwPopupForm_ShowModal('nwOtrSrc');
                if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
                    $('#btnsaveOthSrc').enable(false);
                } else {
                    $('#btnsaveOthSrc').enable(true);
                }

                func_ActionDriven("actOthSrc", false);
            }
            return false;
        }
        else if (col == SPR_BInfo_ReqCom - 1) {
            var trantype = 'BCOBUY';
            var docno = $('#txtApprovalID').val();
            var lineID = nwGridBorrowerInfoCon_Book.ActiveSheet.GetValue(SPR_BInfo_LINEID - 1, row);
            var rowno = row;
            nwLineID = lineID;
            currRow = row;
            var refTranNo = "";
            var isView = (nwDocno != '' || $('#txtStatusForEntry').val() != '1') ? 'true' : 'false';
            if (docno == "" || lineID == "") {
                MessageBox("Cannot proceed. Data should be saved first", Title, "error");
                return false;
            }

            var fullength = GetCurrentURL() + "../DCRequirementCompliance?TransactionNo=" + docno + "&TranType=" + trantype + "&nwLineID=" + lineID + "&nwApplyTo=" + refTranNo + "&isView=" + isView;

            nwLoading_Start('xbtnReqCompliance2', crLoadingHTML);
            nwPopupForm_Create("nwPopUpReqComplianceLin", true, fullength);
            $('#nwPopUpReqComplianceLin .BoxTitle').text("Requirements Compliance");
            $("#nwPopUpReqComplianceLin").css({ "min-width": "98%" });
            $("#nwPopUpReqComplianceLin").css({ "min-height": "98%" });
            nwPopupForm_ShowModal("nwPopUpReqComplianceLin");
            nwLoading_End('xbtnReqCompliance2');

            return false;
        }
    } else if (canvasID == "nwGridSigntrsInfoCon") {
        if (col == SPR_SgInfo_Politic - 1) {
            var isEnabled = nwGridSigntrsInfoCon_Book.ActiveSheet.GetEnabled(col, row);
            if (!isEnabled)
                return false;

            checkPPEP();
        }
        else if (col == SPR_SgInfo_ContctDetails - 1) {
            nwcurrIndex = row;
            sglineid = nwGridSigntrsInfoCon_Book.ActiveSheet.GetValue(SPR_SgInfo_LINEID - 1, row); //$('#nwGridBorrowerInfoCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_SgInfo_LINEID + ')').text();
            code = $("#txtBorrowersCode").val();

            if (code == '' || sglineid == '') {
                MessageBox('Cannot Proceed.  Please Save the record first.', menuTitle);
            }
            else {
                nwLoading_Start("xLoadContactDtlsSig", crLoadingHTML);
                nwPopupForm_ShowModal('nwSignaContactDtls');

                if (nwDocno != '' || $('#txtStatusForEntry').val() != '1')
                    $('#btnsaveSCD').enable(false);
                else
                    $('#btnsaveSCD').enable(true);

                $("#nwBorrContactDtls").css({ "min-width": "30%" });
                $("#nwBorrContactDtls").css({ "min-height": "30%" });
                nwParameter_Add_Table('nwGridCoBorrowerContactInfoCon', false);
                nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());
                nwParameter_Add('sglineid', sglineid);
                //nwParameter_Add('contInp', contInp);
                func_ActionDriven("actViewContactDtlsSign", false);
            }
            return false;
        }
        else if (col == SPR_SgInfo_LocDetails - 1) {
            nwcurrIndex = row;
            sglineid = nwGridSigntrsInfoCon_Book.ActiveSheet.GetValue(SPR_SgInfo_LINEID - 1, row);
            code = $("#txtBorrowersCode").val();
            nwParameter_Add('sglineid', sglineid);
            nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());

            if (code == '' || sglineid == '') {
                MessageBox('Cannot Proceed.  Please Save the record first.', menuTitle);
            }
            else {
                nwLoading_Start("actnwSigLocDtls", crLoadingHTML);
                cust_GetPara();
                nwPopupForm_ShowModal('nwSignaLocation');

                if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
                    $('#btnsaveLocSign').enable(false);
                    $('.addchgSignaLocInfo').enable(false);
                    $('.addchgSignaLocInfo2').enable(false);
                } else {
                    $('#btnsaveLocSign').enable(true);
                    $('#cbSigLIPresentAdd').enable(true);
                    $('#cb_SigLI_FullAddress').enable(true);
                    $('#cb_SigLI_FullAddress2').enable(true);
                    $('#cmbSigLIPrepMail').enable(true);
                    $('#lugSigLIHomeOwnrshp').enable(true);
                    $('#lugSigLIHomeOwnrshp2').enable(true);

                    isChkFullAdd5();
                    isChkFullAdd6();

                }

                $("#nwSignaLocation").css({ "min-width": "80%" });
                $("#nwSignaLocation").css({ "min-height": "80%" });
                func_ActionDriven("actnwSigLocDtls", false);
            }

            return false;
        }
        else if (col == SPR_SgInfo_EmpInfo - 1) {
            nwcurrIndex = row;
            sglineid = nwGridSigntrsInfoCon_Book.ActiveSheet.GetValue(SPR_SgInfo_LINEID - 1, row);
            code = $("#txtBorrowersCode").val();
            nwParameter_Add('sglineid', sglineid);
            nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());

            if (code == '' || sglineid == '') {
                MessageBox('Cannot Proceed.  Please Save the record first.', menuTitle);
            }
            else {
                nwLoading_Start("actnwSigEmpDtls", crLoadingHTML);

                if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
                    $('#btnsaveEmpSign').enable(false);
                    $('#txt_SigEI_Years, #txt_SigEI_Month').enable(false);
                    $('.addchgAddressEmpSigInfo').enable(false);
                } else {
                    $('#btnsaveEmpSign').enable(true);
                    $('#txt_SigEI_Years, #txt_SigEI_Month').enable(true);
                    $('.addchgAddressEmpSigInfo').enable(true);
                    $('#lugSigEIEmploymentType').enable(true);
                    $('#txt_SigEI_EmployerName').enable(true);
                    $('#lugSigEIEmploymentStatus').enable(true);
                    $('#txt_SigEI_JobTitle').enable(true);
                    $('#lugSigEINatureEmplymnt').enable(true);
                    $('#txt_SigEI_JobTitle').enable(true);
                    $('#lugSigEIPosition').enable(true);
                    $('#txt_SigEI_GrossMnthlyIncm').enable(true);
                    $('#txt_SigEI_PhoneNo').enable(true);
                    $('#txt_SigEI_MobileNo').enable(true);
                    $('#txt_SigEI_EmailAdd').enable(true);
                }

                cust_GetPara();
                phoneSig();
                nwPopupForm_ShowModal('nwSigEmpDtls');
                func_ActionDriven("actnwSigEmpDtls", false);
            }
            return false;
        }
        else if (col == SPR_SgInfo_BusInfor - 1) {
            nwcurrIndex = row;
            sglineid = nwGridSigntrsInfoCon_Book.ActiveSheet.GetValue(SPR_SgInfo_LINEID - 1, row);
            code = $("#txtBorrowersCode").val();
            nwParameter_Add('sglineid', sglineid);
            nwParameter_Add("txtBorrowersCode", $("#txtBorrowersCode").val());

            if (code == '' || sglineid == '') {
                MessageBox('Cannot Proceed.  Please Save the record first.', menuTitle);
            }
            else {
                nwLoading_Start("actnwSigBussDtls", crLoadingHTML);
                cust_GetPara();
                phoneSig();
                //mobileFormat();
                nwPopupForm_Show('nwSigBussDtls');
                if (nwDocno != '' || $('#txtStatusForEntry').val() != '1') {
                    $('#btnsaveBussSign').enable(false);
                    $('#txt_SigBI_Years, #txt_SigBI_Month').enable(false);
                    $('.addchgSigAddBussInfo').enable(false);
                    $('#txt_SigBI_EmailAdd').enable(false);
                    $('#txt_SigBI_MobileNo').enable(false);
                    $('#txt_SigBI_PhoneNo').enable(false);
                    $('#txt_SigBI_GrossMnthlyIncm').enable(false);
                    $('#txt_SigBI_JobTitle').enable(false);
                    $('#txt_SigBI_BusinessName').enable(false);
                    $('#lugSigBIBusinessType').enable(false);
                    $('#lugSigBINatureBusiness').enable(false);
                    $('#lugSigBIBusinessIncSrc').enable(false);
                    $('#lugSigBIOccptnPositn').enable(false);
                } else {
                    $('#btnsaveBussSign').enable(true);
                    $('#txt_SigBI_Years, #txt_SigBI_Month').enable(true);
                    $('.addchgAddressEmpSigInfo').enable(true);
                    $('#lugSigBIEmploymentType').enable(true);
                    $('#txt_SigBI_EmployerName').enable(true);
                    $('#lugSigBIEmploymentStatus').enable(true);
                    $('#txt_SigBI_JobTitle').enable(true);
                    $('#lugSigBINatureEmplymnt').enable(true);
                    $('#txt_SigBI_JobTitle').enable(true);
                    $('#lugSigBIPosition').enable(true);
                    $('#txt_SigBI_GrossMnthlyIncm').enable(true);
                    $('#txt_SigBI_PhoneNo').enable(true);
                    $('#txt_SigBI_MobileNo').enable(true);
                    $('#txt_SigBI_EmailAdd').enable(true);
                    $('#txt_SigBI_FloorNo').enable(true);
                    $('#txt_SigBI_BldgNo').enable(true);
                    $('#txt_SigBI_UnitNo').enable(true);
                    $('.addchgSigAddBussInfo').enable(true);
                    $('#txt_SigBI_BusinessName').enable(true);
                    $('#lugSigBIBusinessType').enable(true);
                    $('#lugSigBINatureBusiness').enable(true);
                    $('#lugSigBIBusinessIncSrc').enable(true);
                    $('#lugSigBIOccptnPositn').enable(true);
                }

                func_ActionDriven("actnwSigBussDtls", false);
            }
            return false;
        }
        else if (col == SPR_SgInfo_ReqCom - 1) {
            var trantype = 'BSIGNT';
            var docno = $('#txtApprovalID').val();
            var lineID = nwGridSigntrsInfoCon_Book.ActiveSheet.GetValue(SPR_SgInfo_LINEID - 1, row);
            var rowno = row;
            nwLineID = lineID;
            currRow = row;
            var refTranNo = "";
            var isView = (nwDocno != '' || $('#txtStatusForEntry').val() != '1') ? 'true' : 'false';


            if (docno == "" || lineID == "") {
                MessageBox("Cannot proceed. Data should be saved first", Title, "error");
                return false;
            }

            var fullength = "../../../DC/DataSetup/DCRequirementCompliance/DCRequirementCompliance.aspx?TransactionNo=" + docno + "&TranType=" + trantype + "&nwLineID=" + lineID + "&nwApplyTo=" + refTranNo + "&isView=" + isView;

            nwLoading_Start('xbtnReqCompliance3', crLoadingHTML);
            nwPopupForm_Create("nwPopUpReqComplianceLin2", true, fullength);
            $('#nwPopUpReqComplianceLin2 .BoxTitle').text("Requirements Compliance");
            $("#nwPopUpReqComplianceLin2").css({ "min-width": "98%" });
            $("#nwPopUpReqComplianceLin2").css({ "min-height": "98%" });
            nwPopupForm_ShowModal("nwPopUpReqComplianceLin2");
            nwLoading_End('xbtnReqCompliance3');

            return false;
        }
    } 
}
