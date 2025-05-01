/// <reference path="APSupplierPaymentTermAssignment.js" />
var nwSupplierCode = "";
var nwIsReport;

var tradename = "";
var currentYear = "";
var currentDate = "";
var lookupFilter = "";
var isView = "";
var currTR
var BasedTitle = "Vendor Payment Term Assignment";

var serverDate = new Date();

var nwGridCon_Book;
var nwGridCon_Sheet;

var nwGridCon_Book1;
var nwGridCon_Sheet1;


startIdx = 0;
var Main = {
    SPR_PaytermCode: ++startIdx,
    SPR_PaytermDesc: ++startIdx,
    SPR_NoDays: ++startIdx,
    SPR_PaymentComp: ++startIdx,
    SPR_Effective: ++startIdx,
    SPR_Remove: ++startIdx,
}

startIdx = 0;
var PayComp = {
    SPR_PayCompCode: ++startIdx,
    SPR_PayCompDesc: ++startIdx,
    SPR_Percent: ++startIdx,
    SPR_ItmGrpTypeCode: ++startIdx,
    SPR_ItmGrpTypeDesc: ++startIdx,
    SPR_PayTermCode: ++startIdx,
    SPR_PayTermDesc: ++startIdx,
    SPR_Effective: ++startIdx,
}


$(document).on("click", "button", function () {
    return false;
});



function func_Reload() {

    
    crLnk = GetCurrentURL() + "APSupplierPaymentTermAssignment_Gateway";
    crLnkGateKey = "APSupplierPaymentTermAssignment";
    crnwTagSingleBind = true;
    LoadStringsCases();
    


    nwSupplierCode = getParameterByName('nwSupplierCode');
    nwIsReport = getParameterByName('nwIsReport');
    isView = getParameterByName('isView');
    nwParameter_Add('nwSupplierCode', nwSupplierCode);
    nwParameter_Add('nwIsReport', nwIsReport);

    tradename = getParameterByName('tradename');

    $('#lugsup,#lugpayterms').enable(false);
    $('#txteffdate,#txtnoday').enable(false);
    $('#txteffdate').datepicker();
    $('#txteffdate').mask('99/99/9999');

    nwPopupForm_Create("nwPayComp", false);

    var isContinue = true;
    ToolBoxGetData = true;
    init_request();

    cust_GetPara();

    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);
    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    Enabled();
    EnableFields();
    ClearFields();
    $('#lugsup,#txteffdate,#lugpayterms,#txtnoday').enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);

    func_Toolbox_Clear();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", "Vendor Payment Term Assignment", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", "Vendor Payment Term Assignment", "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;

    UponRefresh();

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
    cust_GetPara();
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

    nwParameter_Add('nwSupplierCode', nwSupplierCode);
    nwParameter_Add('nwIsReport', nwIsReport);
    nwParameter_Add('idvallugsupplier', $('#idvallugsupplier').val());
    nwParameter_Add('lookpayterms', $('#idvallugpayterms').val());
    nwParameter_Add('txtnoday', $('#txtnoday').val());

    nwParameter_Add('suppCode', $('#txtSuppCode').val());
    nwParameter_Add('payCateg', $('#idvallugPayCateg').val());
    nwParameter_Add('payTerm', $('#txtpayTerm').val());


    try {
        nwParameter_Add_Spread(nwGridCon_Book);
        nwParameter_Add_Spread(nwGridCon_Book1);
    } catch (ex) { }

}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwParameter_Add("txtCode", $("#txtCode").val());
    $('#lugsup,#lugpayterms').enable(false);
    $('#txteffdate,#txtnoday').enable(false);
    nwLoading_Start("xSample", crLoadingHTML);
    func_ActionDriven("actBindCollection", false);

}

function func_ToolboxNavigatorBind_Empty() {
    clearfield();
    nwParameter_Add("TotalRecords", $('div.BN-record span').text());
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////
var temp_crnwTR = "";
//function Lookup_DoneFunction(idName, idNum) {
//    var id = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
//    var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();
//    if (idName == 'lugGJFrom') {

//        lookUpCustomize("code", 1);
//    }

//    if (idName == 'lugpayterms') {

//        var code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
//        var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();
//        var days = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(2)").text();

//        crnwTR.find("td:eq(" + Main.SPR_PaytermCode + ")").text(code);
//        crnwTR.find("td:eq(" + Main.SPR_PaytermDesc + ")").text(desc);
//        crnwTR.find("td:eq(" + Main.SPR_NoDays + ")").text(days);

//        nwGrid_AddRow("nwGridCon", 1);

//    }

//    if (idName == 'tdMainTo') {
//        $('#tdAccountTo').text(desc)
//    }

//}

function Lookup_DoneFunction(idName, idNum) {

    var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum -1) + ")").find("td:eq(" + (0) + ") span").text();
    var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (1) + ") span").text();
    var noDays = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (2) + ") span").text();
    var col4 = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (3) + ") span").text();


    if (idName == 'toolboxInquire') {
        cust_GetPara();
    }


    if (idName == 'lugpayterms') {

        nwGridCon_Book.ActiveSheet.SetText((Main.SPR_PaytermCode - 1), _row, code);
        nwGridCon_Book.ActiveSheet.SetText((Main.SPR_PaytermDesc - 1), _row, desc);
        nwGridCon_Book.ActiveSheet.SetText((Main.SPR_NoDays - 1), _row, noDays);

        if (code != '') {
            nwGridCon_Book.ActiveSheet.SetEnable(Main.SPR_PaymentComp - 1, _row, false);
            nwGridCon_Book.ActiveSheet.SetBackground(Main.SPR_PaymentComp - 1, _row, 'gainsboro');
        }
        else {
            nwGridCon_Book.ActiveSheet.SetEnable(Main.SPR_PaymentComp - 1, _row, true);
            nwGridCon_Book.ActiveSheet.SetBackground(Main.SPR_PaymentComp - 1, _row, '#2f7dcb');
        }


        //var cnt = nwGridCon_Book.ActiveSheet.GetMaxRow();
        //cust_GetPara();
        //if ((cnt - 1) == _row) {
        //    nwGridCon_Book.ActiveSheet.RowAdd(cnt + 1);
        //    TemplateBtns();
        //}
        //func_ActionDriven("actButtonColor", false);


    }


    if (idName == 'lugPayCateg') {
        nwParameter_Add("payCat", code);

        //nwGridCon_Book1.ActiveSheet.SetText((PayComp.SPR_PayCompCode - 1), _row, code);
        //nwGridCon_Book1.ActiveSheet.SetText((PayComp.SPR_PayCompDesc - 1), _row, desc);
        //var cnt = nwGridCon_Book1.ActiveSheet.GetMaxRow();
        cust_GetPara();
        //if (cnt == 1) {
        //    nwGridCon_Book1.ActiveSheet.RowAdd(cnt);

        //}
        //disablePercent();
        
        nwLoading_Start("xbtnPayComp", crLoadingHTML);
        func_ActionDriven("actGeneratePayComp", true);

    }

    if (idName == 'lugItmGrpTypeCode') {

        nwGridCon_Book1.ActiveSheet.SetText((PayComp.SPR_ItmGrpTypeCode - 1), _row, code);
        nwGridCon_Book1.ActiveSheet.SetText((PayComp.SPR_ItmGrpTypeDesc - 1), _row, desc);
        var cnt = nwGridCon_Book1.ActiveSheet.GetMaxRow();
        cust_GetPara();
        if (cnt == 1) {
            nwGridCon_Book1.ActiveSheet.RowAdd(cnt);

        }

    }

    if (idName == 'lugPayTermCode') {

        nwGridCon_Book1.ActiveSheet.SetText((PayComp.SPR_PayTermCode - 1), _row, code);
        nwGridCon_Book1.ActiveSheet.SetText((PayComp.SPR_PayTermDesc - 1), _row, desc);
        var cnt = nwGridCon_Book1.ActiveSheet.GetMaxRow();
        cust_GetPara();
       
        if (cnt == 1) {
            nwGridCon_Book1.ActiveSheet.RowAdd(cnt);
        }

    }

    

    
}


function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var value = "<option value='" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "'>" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + " - " + addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text() + "</option>"

    $('#cmb' + currTR).append(value)
    return null;
}

function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {
    var value = "<option value='" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "'>" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + " - " + addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text() + "</option>"

    $('#cmb' + verID).append(value)
}

function nwGrdi_Change(nwobj, nwobjrow, nwobjitem) {
    var ss = nwobjitem.find('#selecta').val();
}

//function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {

//    var nwobjID = nwobj.attr('id');

//    if (nwobjID == "nwGrid") {
//        if ((crnwTD.index() == Main.SPR_PaytermDesc)) {
//            var rows = nwLib.nwTempTable_Row_Count("nwGridCon");
//            var codeList = "";
//            for (var x = 0; x <= rows; x++) {
//                codeList += nwLib.nwTempTable_RowData_Get("nwGridCon ", x, Main.SPR_PaytermCode - 1) + '|';
//            }

//            cust_GetPara();
//            nwParameter_Add("codeList", codeList);
//            lookUpCustomize("lugpayterms", 1);

//        }
//    }

//}

function EnableFields() {
    $(".history_switch").enable(false);
    $('#chkBox').prop('checked', true);


}

function DisableFieldscustom() {
    $(".history_switch").enable(false);
    $('#chkBox').prop('checked', true);

}


function DisableFields() {


}

function EnableFieldsDone() {//Binding Done
    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);
}

function DisableFieldsDone() { // For Refresh
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0') {
        $("#txtCode").enable(false);
        $("#txtDescription").prop("disabled", false);


        $("#noah-webui-Toolbox").bindingNew().enable(true);
        $("#noah-webui-Toolbox").bindingDelete().visible(true);
        $("#noah-webui-Toolbox").bindingExport().enable(false);
        $("#noah-webui-Toolbox").bindingInquire().enable(false);
        $("#noah-webui-Toolbox").bindingDelete().enable(true);
        $("#noah-webui-Toolbox").bindingSave().enable(true);
    }
}

function DisableFieldsEmpty() {
    $("#txtCode").enable(false);
    $("#txtDescription").enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);

    $(".history_switch").enable(false);
    $('#chkBox').prop('checked', true);
}

function ClearFields() {
    $("#idvallugGJTo").val("");
    $("#idvallugGJFrom").val("");
    $('.RightFilterHeader').html("");
    $('#nwGridFilterCon td').html("&nbsp;");

    $("#date").val("");
    DisableFields();
    ClearDateFilter();
    $('#chkBox').prop('checked', true);
}

function msgBoxContainerQuestionF(genID, answer) {
    if (genID == 1) {
        if (answer == "Yes") {
           
        }
        else {
       
        }
    }
    else if (genID == 2) {
        if (answer == "Yes") func_saveContinue();
    }

}




function func_LookUpInitialize(dimP) {
    nwParameter_Add("lookupFilter", lookupFilter);
}

function disabled() {

    $("#lugsup").enable(false);
    $("#txtcrdate").enable(false);
    $("#txteffdate").enable(false);
    $("#chkcash").enable(false);

    $("#chkcash").prop("checked", false)
    $("#txtnoday").enable(false);

}
function Enabled() {
    $("#txteffdate").enable(true);
    $("#lugpayterms").removeClass('adisabled');
    $("#txtnoday").enable(false);


}
function clearfield() {
    $("#txtcrdate").val("");
    $("#txteffdate").val("");
    $("#idvallugpayterms").val("");
    $("#descvallugpayterms").val("");
    $("#txtnoday").val("");


}
function UponRefresh() {
    $("#noah-webui-default-Inquire").enable(true);
    $("#noah-webui-default-Export").enable(true);
    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);
}

function autoRefresh() {

    if (nwSupplierCode != "" && nwIsReport == 0) {
        nwLoading_Start('xSample', crLoadingHTML);
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox-BindingNavigator").hide();
        $("#noah-webui-default-New").hide();
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-default-Inquire").hide();
        $("#noah-webui-default-Save").show();
        $("#noah-webui-default-Save").enable(true);
        $("#noah-webui-default-Refresh").enable(true);
        $('#noah-webui-default-Refresh').show();
        $("#noah-webui-default-Export").show();
        $("#noah-webui-default-Export").enable(true);

        $("#nwGridCon").enable(true);

        $(".history_switch").prop("disabled", false);
        $('#chkBox').prop('checked', true);

    }

    else if (nwSupplierCode != "" && nwIsReport == 1) {
        nwLoading_Start('xSample', crLoadingHTML);
        nwParameter_Add('nwSupplierCode', nwSupplierCode);
        $('#noah-webui-default-Refresh').click();
        $("#noah-webui-Toolbox-BindingNavigator").hide();
        $("#noah-webui-default-New").hide();
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-default-Inquire").hide();
        $("#noah-webui-default-Save").show();
        $("#noah-webui-default-Save").enable(false);
        $('#noah-webui-default-Refresh').hide();
        $("#noah-webui-default-Refresh").enable(false);
        $("#noah-webui-default-Export").hide();
        $("#noah-webui-default-Export").enable(false);
        $("#nwGridCon").enable(false);

        $(".history_switch").prop("disabled", false);
        $('#chkBox').prop('checked', true);

    }

    else {
        $("#nwGridCon").enable(false);
        $("#noah-webui-default-New").hide();
        $("#noah-webui-default-Save").hide();
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-Toolbox-BindingNavigator").show();
        $("#noah-webui-Toolbox-BindingNavigator").enable(true);
        $("#noah-webui-default-Inquire").enable(false);
        $("#noah-webui-default-Export").enable(false);

        $(".history_switch").enable(false);
        $('#chkBox').prop('checked', true);

    }

}

function disabledall() {
    $("#lugsup").addClass('adisabled');
    $("#txteffdate").enable(false);
    $("#txtnoday").enable(false);
    $("#idvallugpayterms").addClass('adisabled');
    $("#lugpayterms").addClass('adisabled');
}


function enableEffdate() {
}
function disableEffdate() {
    $("#txteffdate").enable(false);
}


function linkaction() {
    $('#idvallugsup').val(nwSupplierCode);
    $('#descvallugsup').val(tradename);
    nwParameter_Add('looktradename', $('#idvallugsup').val());
    func_ActionDriven("actTradename", true);
}

function normalfunctionaction() {
    $('#nwGrid1Con').enable(false);
    $("#noah-webui-Toolbox").bindingInquire().visible(true);
    $("#noah-webui-Toolbox").bindingNew().visible(false);
    $("#noah-webui-Toolbox").bindingSave().visible(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);

}

function DisableFieldEffective(server) {

    var effectivedate = $("#txteffdate").val();


    if (Date.parse(effectivedate) == Date.parse(server)) {

        $("#noah-webui-Toolbox").bindingDelete().enable(false);
        $("#noah-webui-Toolbox").bindingSave().enable(true);
        $('#lugpayterms').removeClass('adisabled');
        $('#txteffdate').enable(true);
    }


    if (Date.parse(effectivedate) > Date.parse(server)) {
        $("#noah-webui-Toolbox").bindingDelete().enable(true);
        $("#noah-webui-Toolbox").bindingSave().enable(true);

        $('#lugpayterms').removeClass('adisabled');
        $('#txteffdate').enable(true);


    }
    if (Date.parse(effectivedate) < Date.parse(server)) {

        $("#noah-webui-Toolbox").bindingDelete().enable(false);
        $("#noah-webui-Toolbox").bindingSave().enable(false);

        $('#lugpayterms').addClass('adisabled');
        $('#txteffdate').enable(false);

    }
}

//$(document).on("change", ".txtEffDate", function (e) {
//    var cntRow = $(".txtEffDate").index(this);
//    chck = $(".txtEffDate:eq(" + cntRow + ")").val();



//    var d = new Date();
//    var month = d.getMonth() + 1;
//    var day = d.getDate();
//    var output = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + "/" + d.getFullYear();
//    var date = output

//    if (Date.parse(chck) < Date.parse(date)) {
//        MessageBox("Cannot proceed. Effective date must be equal or later than the current server date. \n", BasedTitle, "error");
//        $(".txtEffDate:eq(" + cntRow + ")").val("");
//    }
    
//    var gridLength = $('#nwGridCon .tblGridBody tr').length;
//    var effdates = $('#nwGridCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + Main.Main.SPR_Effective + ') input').val();

//    for (var x = 0; x <= gridLength; x++) {
//        var grdDate = $('#nwGridCon .tblGridBody tr:eq(' + x + ') td:eq(' + Main.SPR_Effective + ') input').val();

//        if (grdDate != "") {
//            if (x != crnwTR.index()) {
//                if (grdDate == effdates) {
//                    MessageBox("Cannot continue. Effective Date has been selected in row [" + (x + 1) + "].", BasedTitle, "error");
//                    $('#nwGridCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + Main.SPR_Effective + ') input').val('');
//                }
//            }
//        }
//    }

//});

// Disable line if effective
function disableEffective() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + "/" + d.getFullYear();
    var date = output

    var rows = nwGridCon_Book.ActiveSheet.GetMaxRow();
    var effDate = "";
    for (var x = 0; x <= rows; x++) {
        effDate = nwLib.nwTempTable_RowData_Get("nwGridCon ", x, Main.SPR_Effective - 1, "input");
        //effDate = nwGridCon_Book.ActiveSheet.GetText((Main.SPR_Effective), x);

        if (Date.parse(effDate) < Date.parse(date)) {
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + (Main.SPR_PaytermDesc - 1) + ")").enable(false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + (Main.SPR_Effective - 1) + ") input").enable(false);
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + (Main.SPR_Effective - 1) + ")").css("background-color", "gainsboro");
            $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + (Main.SPR_Remove -  1) + ") button").enable(false);

            //nwGridCon_Book.ActiveSheet.SetEnable()
        }

    }

}

$(document).on("click", ".nwDelete", function () {
    if (nwIsReport == 1) return;

    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (month < 10 ? '0' : '') + month + '/' + (day < 10 ? '0' : '') + day + "/" + d.getFullYear();
    var date = output


    var code = $('#nwGridCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + Main.SPR_PaytermCode + ')').text();
    var effDate = $('#nwGridCon .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + Main.SPR_Effective + ') input').val();

    if (code != "" && (Date.parse(effDate) < Date.parse(date))) {
        return;
    }

    if (nwSupplierCode != "") {
        if (code != "" || effDate != "") {
            msgBoxContainerQuestion = "nwDelete";
            parent_MessageBoxQuestion("Do you wish to remove current row?", BasedTitle, "");
        }
        else {
            MessageBox("No details found!", BasedTitle, "error");
        }
    }


});


function msgBoxContainerQuestionF(genID, answer) {

    if (genID == "nwDelete") {
        if (answer == "Yes") {
            $(".nwgrid_Delete").click();
            nwGrid_AddRow('nwGridCon', 1);
        }
    }

    else if (genID == "closing") {
        if (answer == "Yes") {
            isClose = true;
            parent.mainParent_Close_Form();
        }
    }
}

// disable grid for viewing
function disableforView() {
    var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();
    for (var x = 0; x <= maxRow; x++) {
        $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + Main.SPR_Effective + ") input").enable(false);
        $("#nwGridCon .tblGridBody tr:eq(" + x + ") td:eq(" + Main.SPR_Effective + ")").css("background-color", "gainsboro");
    }
}

$(document).on('click', '.BoxClose', function (e) {
    $('.lookupcolSearch').val("");
});


$(document).keyup(function (e) {
    if (e.key === "Escape") {
        $('.lookupcolSearch').val("");
    }
});

function DisableUponView() {
    var isDisabled = isView.toLowerCase() == "true" ? true : false;

    if (!isDisabled) {

        $('#nwGrid').enable(true);
        $("#noah-webui-Toolbox").bindingSave().enable(true);
    }
}
function AddRowsx() {
    var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();
    //if (maxRow <= 0) {
    for (var row = 0; row <= (5 - maxRow) ; row++) {
            nwGridCon_Book.ActiveSheet.RowAdd(maxRow + 1);
         
        }
    //}


    nwGridCon_Book.ActiveSheet.SetPrecision(Main.SPR_NoDays - 1, Spread_ALLROW, 0);
}


function TemplateBtns() {
    //nwGridCon_Book.ActiveSheet.SetTextColor((Main.SPR_PaymentComp - 1), Spread_ALLROW, "#FFFFFF");
    //nwGridCon_Book.ActiveSheet.SetText2((Main.SPR_PaymentComp - 1), Spread_ALLROW, "Payment Component");


    var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();


    for (var row = 0; row <= maxRow; row++) {
        nwGridCon_Book.ActiveSheet.SetText((Main.SPR_PaymentComp - 1), row, "...");
        nwGridCon_Book.ActiveSheet.SetTextColor((Main.SPR_PaymentComp - 1), row, "White");
        nwGridCon_Book.ActiveSheet.SetFontSize((Main.SPR_PaymentComp - 1), row, "12");

        var PaytermCode = nwGridCon_Book.ActiveSheet.GetValue(Main.SPR_PaytermCode - 1, row);

        if (PaytermCode != '') {
            nwGridCon_Book.ActiveSheet.SetEnable(Main.SPR_PaymentComp - 1, row, false);
            nwGridCon_Book.ActiveSheet.SetBackground(Main.SPR_PaymentComp - 1, row, 'gainsboro');
        }
        else {
            var effective = nwGridCon_Book.ActiveSheet.GetValue(Main.SPR_Effective - 1, row);

            if (effective != '') {
                nwGridCon_Book.ActiveSheet.SetEnable(Main.SPR_PaymentComp - 1, row, true);
                nwGridCon_Book.ActiveSheet.SetBackground(Main.SPR_PaymentComp - 1, row, 'green');
                nwGridCon_Book.ActiveSheet.SetEnable(Main.SPR_PaytermDesc - 1, row, false);
                nwGridCon_Book.ActiveSheet.SetBackground(Main.SPR_PaytermDesc - 1, row, 'gainsboro');
                nwGridCon_Book.ActiveSheet.SetBackground(Main.SPR_Effective - 1, row, 'gainsboro');
                nwGridCon_Book.ActiveSheet.SetEnable(Main.SPR_Effective - 1, row, false);
            } else {
                nwGridCon_Book.ActiveSheet.SetEnable(Main.SPR_PaymentComp - 1, row, true);
                nwGridCon_Book.ActiveSheet.SetBackground(Main.SPR_PaymentComp - 1, row, '#2f7dcb');
            }
        }
    }
    cust_GetPara();
    //func_ActionDriven("actButtonColor", false);
}

//function HasValuePaymentTerm() {

//    setTimeout(function () {
//        var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();

//        for (var x = 0; x <= maxRow; x++) {
//            var Payterm = nwGridCon_Book.ActiveSheet.GetValue((Main.SPR_PaytermDesc - 1), x)
//            if (Payterm == "Due in 30 days	30") {
//                //continue;
            
//                nwGridCon_Book.ActiveSheet.SetBackground((Main.SPR_PaymentComp - 1), x, "gray")
//                nwGridCon_Book.ActiveSheet.SetEnable((Main.SPR_PaymentComp - 1), x, false)
           
//                } 
//            //else {
//            //    nwGridCon_Book.ActiveSheet.SetBackground((Main.SPR_PaymentComp - 1), x, "#2f7dcb")
//            //    nwGridCon_Book.ActiveSheet.SetEnable((Main.SPR_PaymentComp - 1), x, true)

//            //    }
            
//        }

//    }, 100);
//}

function p8Spread_Click(canvasID, row, col) {
    _canvasID = canvasID;
    _row = row;
    _col = col;
    var Grid;

    var x = $('#idvallugVendor').val();

    if (x == "") {
        MessageBox("Cannot proceed. Please complete the header details.", 'Vendor Item Taxes Assignment');
        return false;
    }

    if (!($("#" + canvasID).enable())) {
        return false;
    }

   

    if (canvasID == "nwGridCon") {
        
        var isEnabled = nwGridCon_Book.ActiveSheet.GetEnabled((Main.SPR_PaymentComp - 1), row);
        if (!isEnabled)
            return false;

        if (col == (Main.SPR_PaymentComp - 1)) {
            if (nwGridCon_Book.ActiveSheet.GetText((Main.SPR_Effective - 1), row) != "") {

                nweffectivedate = nwGridCon_Book.ActiveSheet.GetText((Main.SPR_Effective - 1), row);
                nwLoading_Start("xbtnPayComp", crLoadingHTML);
                nwParameter_Add("suppCode", $("#idvallugsupplier").val());
                nwParameter_Add("payCateg", $("#idvallugPayCateg").val());
                nwParameter_Add("EffectiveDate", nweffectivedate);

                $("#nwPayComp .modal-box-s").css({ "min-width": "75%" });
                $("#nwPayComp .modal-box-s").css({ "min-height": "75%" });
                nwPopupForm_ShowModal("nwPayComp");
                func_ActionDriven("actPayComp", false);

            }

            else {
                MessageBox("Cannot proceed. Please select Effective Date first", BasedTitle);
                return false;
            }

        }

    }


    return true;
}

function p8Spread_DblClick(canvasID, row, col) {
    _canvasID = canvasID;
    _row = row;
    _col = col;
    var Grid;

    var currentRow = row;

    if (!($("#" + canvasID).enable())) {
        return false;
    }

    if (canvasID == "nwGridCon") {
        if (col == (Main.SPR_PaytermDesc - 1)) {
            var maxRow = nwGridCon_Book.ActiveSheet.GetMaxRow();
            var codeList = "";
            for (var x = 0; x <= maxRow; x++) {

                codeList += "|" + nwGridCon_Book.ActiveSheet.GetText((Main.SPR_PaytermCode - 1), x);
            }
            cust_GetPara();
            nwParameter_Add("codeList", codeList);
            lookUpCustomize("lugpayterms", 1, undefined, true);
            
        }

    }

    if (canvasID == "nwGridConPayComp") {
        if (col == (PayComp.SPR_ItmGrpTypeCode - 1)) {
            var maxRow = nwGridCon_Book1.ActiveSheet.GetMaxRow();
            //var codeList = "";
            //for (var x = 0; x <= maxRow; x++) {

            //    codeList += "|" + nwGridCon_Book.ActiveSheet.GetText((Main.SPR_PaytermCode - 1), x);
            //}
            cust_GetPara();
            lookUpCustomize("lugItmGrpTypeCode", 1, undefined, true);

        }

        if (col == (PayComp.SPR_PayTermCode - 1)) {
            var maxRow = nwGridCon_Book1.ActiveSheet.GetMaxRow();
            //var codeList = "";
            //for (var x = 0; x <= maxRow; x++) {

            //    codeList += "|" + nwGridCon_Book.ActiveSheet.GetText((Main.SPR_PaytermCode - 1), x);
            //}
            cust_GetPara();
            lookUpCustomize("lugPayTermCode", 1, undefined, true);

        }

    }

    return true;
}
$(document).on('click', '.nwgrid_Delete', function (e) {
    var cnt = nwGridCon_Book.ActiveSheet.GetMaxRow();
    if (cnt <= 0) {
        nwGridCon_Book.ActiveSheet.RowAdd(1);
    }
});

function EnableAll() {
    $('#lugPayCateg').enable(true);
    $("#lugsup").addClass('adisabled');
    $("#txteffdate").enable(true);
    $("#txtnoday").enable(false);
    $("#idvallugpayterms").removeClass('adisabled');
    

}

function p8Spread_Change(canvasID, row, col) {
    if (canvasID == "nwGridCon") {
        if (col == Main.SPR_Effective - 1) {
            dtDelDate();
        }
        var cnt = nwGridCon_Book.ActiveSheet.GetMaxRow();
        if ((cnt - 1) == row) {
            nwGridCon_Book.ActiveSheet.RowAdd(cnt + 1);
            TemplateBtns();
        }
    }

    if (canvasID == "nwGridConPayComp") {
        if (col == PayComp.SPR_Percent - 1) {
            
            var PBTPOP = nwGridCon_Book1.ActiveSheet.GetText(PayComp.SPR_Percent - 1, nwGridCon_Book1.ActiveSheet.GetSelectedIndexes().row);
            var maxRow = nwGridCon_Book1.ActiveSheet.GetMaxRow();
            var totalBal = 0;
            let numericValue = parseFloat(PBTPOP);
            if (numericValue > 100) {
                MessageBox("Percentage (%) Based on Total PO Price must not be greater than 100", BasedTitle, 'error');
                nwGridCon_Book1.ActiveSheet.SetText((PayComp.SPR_Percent - 1), row, "0.00");
            }
            for (var x = 0; x <= maxRow; x++) {
                if (nwGridCon_Book1.ActiveSheet.GetText(PayComp.SPR_PayCompCode - 1, x) != "03") {
                    totalBal += parseFloat(nwGridCon_Book1.ActiveSheet.GetText(PayComp.SPR_Percent - 1, x)) || 0;
                }
            }

            if (totalBal > 100) {
                MessageBox("Sum of Percentage (%) Based on Total PO Price must not be greater than 100", BasedTitle, 'error');
                nwGridCon_Book1.ActiveSheet.SetText((PayComp.SPR_Percent - 1), row, "0.00");
            } else {
                for (var x = 0; x <= maxRow; x++) {
                    if (nwGridCon_Book1.ActiveSheet.GetText(PayComp.SPR_PayCompCode - 1, x) == "03") {
                        nwGridCon_Book1.ActiveSheet.SetText((PayComp.SPR_Percent - 1), x, (parseFloat(100) - parseFloat(totalBal)));

                    }
                }
            }
            


        }
        var cnt = nwGridCon_Book1.ActiveSheet.GetMaxRow();
        if ((cnt - 1) == row) {
            nwGridCon_Book.ActiveSheet.RowAdd(cnt + 1);
            TemplateBtns();
        }
    }
    

    return true;
}

function dtDelDate() {


    var date = new Date(serverDate.getTime());
    var curdate = ((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
    var DelDate = nwGridCon_Book.ActiveSheet.GetText(Main.SPR_Effective - 1, nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row);

    if (Date.parse(curdate) > Date.parse(DelDate)) {
        MessageBox("Effective Date should not be earlier than the current server date.", BasedTitle, 'error');
        nwGridCon_Book.ActiveSheet.SetText(Main.SPR_Effective - 1, nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row, "");
    }
    else if (DelDate != "") {
        if (ChkDuplicateDates(DelDate, nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row)) {
            nwGridCon_Book.ActiveSheet.SetText((Main.SPR_Effective - 1), nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row, "");
            MessageBox(`Cannot proceed. Duplicate Effective Date.`, BasedTitle, 'error');
            return false;
        }
    }
    
    

}

function ChkDuplicateDates(delDate, index) {


    var isDuplicate = false;

    for (i = 0; i <= nwGridCon_Book.ActiveSheet.GetMaxRow(); i++) {

        if (nwGridCon_Book.ActiveSheet.GetText(Main.SPR_Effective - 1, i) == delDate
            && index != i
           ) {
            isDuplicate = true;
        }
    }

    return isDuplicate;
}

$(document).on("click", "#btnApplyToOneLocSave", function () {

    msgBoxContainerQuestion = "isbtnApplyToOneLocSave";
    parent_MessageBoxQuestion("Do you want to save the record?", BasedTitle, "Question");

    return false;
});

var nweffectivedate;

function msgBoxContainerQuestionF(genID, answer) {
    if (genID == "isbtnApplyToOneLocSave") {
        if (answer == 'Yes') {
            nwLoading_Start("actSave", crLoadingHTML); //same procedure in changing of currency
            cust_GetPara();
            nwParameter_Add('suppCode', $('#idvallugsupplier').val());
            nwParameter_Add('EffectiveDate', nweffectivedate);
            func_ActionDriven("actSave", false);
           
                nwGridCon_Book.ActiveSheet.SetEnable(Main.SPR_PaytermDesc - 1, row, false);
                nwGridCon_Book.ActiveSheet.SetBackground(Main.SPR_PaytermDesc - 1, row, 'gainsboro');
                nwGridCon_Book.ActiveSheet.SetBackground(Main.SPR_PaymentComp - 1, row, 'green');
                nwGridCon_Book.ActiveSheet.SetBackground(Main.SPR_Effective - 1, row, 'gainsboro');
                nwGridCon_Book.ActiveSheet.SetEnable(Main.SPR_Effective - 1, row, false);
        }
    }
    
}

function disablePercent() {
    var maxRow = nwGridCon_Book1.ActiveSheet.GetMaxRow();
    for (var x = 0; x <= maxRow; x++) {
        if (nwGridCon_Book1.ActiveSheet.GetText(PayComp.SPR_PayCompCode - 1, x) == "03") {
            nwGridCon_Book1.ActiveSheet.SetEnable(PayComp.SPR_Percent - 1, x, false);
            nwGridCon_Book1.ActiveSheet.SetBackground(PayComp.SPR_Percent - 1, x, 'gainsboro')
        }
    }
}
//$(document).on("click", "#nwPayComp  .btn-modal-back", function () {
//    nwLoading_Start("xbtnactPayCompProp", crLoadingHTML);
//    var curIndex = nwGridCon_Book.ActiveSheet.GetSelectedIndexes().row;
//    nwParameter_Add('curPayTerm', nwGridCon_Book.ActiveSheet.GetText(PayComp.SPR_PayCompCode - 1, curIndex));
//    nwParameter_Add('curIndex', curIndex);
//    cust_GetPara();
//    func_ActionDriven("actPayCompProp", false);
//    $('#idvallugPayCateg,#descvallugPayCateg').val('');
//    return false;
//});

//function disablelookup() {
//    var maxRow = nwGridCon_Book1.ActiveSheet.GetMaxRow();
//    for (var x = 0; x <= maxRow; x++) {
//        var WithExpiry = nwGridCon_Book1.ActiveSheet.GetValue((PayComp.SPR_Rowno - 1), row)
//        if (WithExpiry == "1") {
//            nwGridCon_Book.ActiveSheet.SetEnable(Main.SPR_PaytermDesc - 1, x, false);
//            nwGridCon_Book.ActiveSheet.SetBackground(PayComp.SPR_PaytermDesc - 1, x, 'gainsboro')
//        }
//    }
//}




