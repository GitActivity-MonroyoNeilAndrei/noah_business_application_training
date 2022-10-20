baseTitle = "Request Bulk for Holding";
var nwDocno = "";

var trantype = "";
var docno = "";
var status = "";
var url = "";

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;
var nwGridMainCon_Book2;
var nwGridMainCon_Sheet2;
var getrow;
var getcol;
var SPR_PROJECT = 1,
    SPR_PHASE_TOWER = 2,
    SPR_BLOCK_FLOOR = 3,
    SPR_LOT = 4,
    SPR_SELLING_PRICE = 5,
    SPR_QUEUE_NUM = 6;


       

function func_Reload() {

    //crnwTagSingleBind = true;
   // nwTrustedLinks.push("fli.promptus8.com");

    crLnk = "../SBRequestBulkHolding/SBRequestBulkHolding_Gateway";
    crLnkGateKey = "SBRequestBulkHolding";
    crnwTagSingleBind = true;


    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();

    nwDocno = getParameterByName("nwDocno");
    nwParameter_Add("nwDocno", nwDocno);
    trantype = 'BLKHLD';
    docno = $('#txtDocNo').val();
    status = $('#txtStatusCode').val();


    loadCompliance(trantype, docno, status);





    return isContinue;
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
    nwParameter_Add("Docno", $('#txtDocNo').val());
    nwParameter_Add("LocForm", $('#idvallugLocAcctForms').val());
    nwParameter_Add("ReasonBulkHold", $('#idvallugReasonBulkHold').val());
    nwParameter_Add("Customer", $("#idvallugCustomer").val());
    nwParameter_Add("Project", $("#idvallugProject").val());
    nwParameter_Add("sellerCode", $("#idvallugDirectSeller").val());
    nwParameter_Add("noUnitHeld", $("#txtnoUnitHeld").val());
    nwParameter_Add("Remarks", $("#txtRemarks").val());
    nwParameter_Add("DocDate", $("#txtDocDate").val());

    nwDocno = getParameterByName("nwDocno");
    nwParameter_Add('nwDocno', nwDocno);


}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    nwLoading_Start("xSample", crLoadingHTML);
    EnableFieldsDone();
    cust_GetPara();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xSample", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////

function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
}
function getLookupData2(idnum, index) {
    var data2 = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idnum + ")").find("td:eq(" + (index) + ")").text();
    return data2;
}

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
        nwParameter_Add("idvallugDirectSeller", getLookupData(idNum, 11));
        nwParameter_Add("idvallugProject", getLookupData(idNum, 7));

        //func_ActionDriven("actCallSeller", false);
        //func_ActionDriven("actSelectProject", false);


    }
    if (idName == 'lugDirectSeller') {
        nwParameter_Add("idvallugDirectSeller", getLookupData(idNum, 0));
        func_ActionDriven("actCallSeller", false);
    }

    if (idName == 'lugProject') {
        nwParameter_Add("idvallugProject", getLookupData(idNum, 0));
        func_ActionDriven("actSelectProject", false);
    }

    if (idName == 'Unit') {
        //nwGridMainCon_Book.ActiveSheet.SetText(getcol, getrow, getLookupData(idNum, 0));
        nwGridMainCon_Book.ActiveSheet.SetText((SPR_PROJECT-1), getrow, getLookupData(idNum, 0));
        nwGridMainCon_Book.ActiveSheet.SetText((SPR_PHASE_TOWER - 1), getrow, getLookupData(idNum, 1));
        nwGridMainCon_Book.ActiveSheet.SetText((SPR_BLOCK_FLOOR - 1), getrow, getLookupData(idNum, 2));
        nwGridMainCon_Book.ActiveSheet.SetText((SPR_LOT - 1), getrow, getLookupData(idNum, 3));
        nwGridMainCon_Book.ActiveSheet.SetText((SPR_SELLING_PRICE - 1), getrow, getLookupData(idNum, 4));
        nwGridMainCon_Book.ActiveSheet.SetText((SPR_QUEUE_NUM - 1), getrow, getLookupData(idNum, 5));

        if (nwGridMainCon_Book.ActiveSheet.GetText(0, nwGridMainCon_Book.ActiveSheet.GetMaxRow() - 1) != "") {
            nwGridMainCon_Book.ActiveSheet.RowAdd();
        }
    }
}

function func_WindowCloseTrigger(verID) {
    var isContinue = true;
    var errorResult = "";
    var ICode = "";
    
    cust_GetPara();

    if (verID == "nwPopUpReqComp") {
        nwParameter_Add("txtTransactionNo", $('#txtTransactionNo').val());
        nwLoading_Start("actHasRqrdCompli", crLoadingHTML);
        func_ActionDriven('actHasRqrdCompli', false);
    }
    return isContinue;
}

function EnableFields() { //Upon New
    $('.lookups').enable(true);
    $('.open').enable(true);
    $('#txtRemarks').enable(true);

    $("#btnReqCompliance").enable(false);
    $("#btnReqCompliance").addClass("btnGray");
    $("#btnReqCompliance").removeClass("btnGreen");
    $("#btnReqCompliance").removeClass("btnOrange");
    $('#nwGridCon1').enable(true);
    $('#nwGridCon2').enable(true);

    
}

function DisableFields() { //Upon New
    $('.lookups').enable(false);
    $('.open').enable(false);
    $('#txtRemarks').enable(false);

    $("#btnReqCompliance").enable(false);
    $("#btnReqCompliance").removeClass("btnOrange");
    $("#btnReqCompliance").removeClass("btnGreen");
    $("#btnReqCompliance").addClass("btnGray");

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $('#nwGridCon1').enable(false);
    $('#nwGridCon2').enable(false);

}

function EnableFieldsDone() { //Upon Refresh where record > 0   

    $('.lookups').enable(false);
    $('.open').enable(false);
    $('#txtRemarks').enable(true);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().visible(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().visible(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);

    //$("#noah-webui-default-currentRec").enable(true);

    $("#btnReqCompliance").enable(true);
    $('#btnReqCompliance').addClass('btnOrange');
    $('#btnReqCompliance').removeClass('btnGreen');
    $('#btnReqCompliance').removeClass('btnGray');

    $('#nwGridCon1').enable(true);
    $('#nwGridCon2').enable(true);

    trantype = 'BLKHLD';
    docno = $('#txtDocNo').val();
    status = $('#txtStatusCode').val();
    loadCompliance(trantype, docno, status); //back button is not working here 

}

function DisableFieldsEmpty() { //Upon Refresh where record < 0
    $('.lookups').enable(false);
    $('.open').enable(false);
    $('#txtRemarks').enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    //$("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);

    $("#btnReqCompliance").enable(false);
    $('#btnReqCompliance').removeClass('btnGreen');
    $('#btnReqCompliance').removeClass('btnOrange');
    $('#btnReqCompliance').addClass('btnGray');

    $('#nwGridCon1').enable(false);
    $('#nwGridCon2').enable(false);

}

function ClearFields() {
    $('.idval').val("");
    $('.descval').val("");
    $('.input').val("");
    $('#txtRemarks').val("");

    $('#btnReqCompliance').enable(false);
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
        $("#txtRemarks").prop("disabled", true);
    }
    else {
        $("#noah-webui-Toolbox").bindingDelete().enable(true);
        $("#noah-webui-Toolbox").bindingSave().enable(true);
        $("#txtRemarks").prop("disabled", false);
    }
}

function loadCompliance(trantype,docno,status){

    if (status == "3" || nwDocno != "") {
        var url = "../DCRequirementCompliance/?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=true";

    } else {
        var url = "../DCRequirementCompliance/?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=false";
        //var url = "SBSalesCallBL";

    }
    nwPopupForm_Create("RequirementCompliance", true, url);
}
$(document).on('click', '#btnReqCompliance', function () {
    nwPopupForm_ShowModal("RequirementCompliance");
    $("#RequirementCompliance .modal-hdr-title").text("Requirement Compliance");
});
//$(document).ready(function () {

//    $(".btn.btn-modal-back").on("click", function () {
//        $(".modal-s").removeClass("_show");
//        $(".modal-box-s").removeClass("_slide-m");
//    });
//});

$(document).on('click', '.btn-modal-back', function () {
    //$('#RequirementCompliance').hide();
            $(".modal-s").removeClass("_show");
            $(".modal-box-s").removeClass("_slide-m");
       
});


//$(document).on('change', '#idvallugDirectSeller', function () {
//    console.log('hello world');
//});

function p8Spread_Click(canvasID, row, col) {

    if (canvasID == "nwGridCon1") {
        if (col == (SPR_LOT - 1)) {
            var Unit = nwGridMainCon_Book.ActiveSheet.GetText(col, row);
            //if (nwGridMainCon_Book.ActiveSheet.GetEnabled(col, row)) {

                getcol = col;
                getrow = row;
                nwParameter_Add("Unit", Unit);
                lookUpCustomize("Unit", 1);

            //}
            
    
        }

    }
    return true;
}