var isnewrow = 0;
var SPR_BRANCH = 1,
    SPR_BRANCHNAME = 2,
    SPR_ADDRESS = 3,
    SPR_REMOVE = 4;

var tradename = "";
var nwSupplierCode = "";
var filter = "''";
var basedTitle = "Vendor Branch Group Assignment";
var nwIsReport = 0;
var nwGrid1Con_Book;
var nwGrid1Con_Sheet;

function func_Reload() {

    LoadStringsCases();

    crLnk = GetCurrentURL() + "APSupplierBranchGroupAss_Gateway";
    crLnkGateKey = "APSupplierBranchGroupAss";
    crnwTagSingleBind = true;

    DisableFields();

    nwSupplierCode = getParameterByName('nwSupplierCode');
    nwIsReport = getParameterByName('nwIsReport');

    nwParameter_Add("nwSupplierCode", nwSupplierCode);
    nwParameter_Add("nwIsReport", nwIsReport);

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    $('#txteffectivedate').datepicker();
    $('#txteffectivedate').mask('99/99/9999')


    $('#txtserverdate').datepicker();
    $('#txtserverdate').mask('99/99/9999')

    return isContinue;
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
        $('#noah-webui-default-Refresh').show();
        $("#noah-webui-default-Export").show();
        $("#noah-webui-default-Export").enable(true);
        $("#nwGrid1Con").enable(true);
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
        $('#noah-webui-default-Refresh').show();
        $("#noah-webui-default-Refresh").enable(false);
        $("#noah-webui-default-Export").show();
        $("#noah-webui-default-Export").enable(false);
        $("#nwGrid1Con").enable(false);
    }

    else {
        $("#nwGrid1Con").enable(false);
        $("#noah-webui-default-New").hide();
        $("#noah-webui-default-Save").hide();
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-Toolbox-BindingNavigator").show();
        $("#noah-webui-Toolbox-BindingNavigator").enable(true);
    }

}

$(document).on("click", "#btnCopyFrom", function (e) {

    if ($(this).enable()) {
        var code = $('#txtSupplierCode').val();
        var tradename = $('#txtTradeName').val();
        var EffectivityDate = $('#txteffectivedate').val();

        if (code == '' || tradename == '' || EffectivityDate == '') {
            MessageBox("Cannot Proceed. Please complete the header.", pageTitle);
            return true;
        }
        else {
            lookUpCustomize("lugCopyFrom", 1);
        }
    }
    return false;
});


////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    isnewrow = 1;
    var isContinue = true;
    toolboxnew();
    var serverdate = $('#txtserverdate').val();
    $('#txteffectivedate').val(serverdate);
    $('#nwGrid1Con').enable(true);

    if ($('#nwGrid1Con-nwData tbody tr').length == 1) {
        nwGrid_AddRow('nwGrid1Con', 5)
    }
    func_Toolbox_Clear();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", "Vendor Branch Group Assignment", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", "Vendor Branch Group Assignment", "", indef, enume);
    isContinue = false;


    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    isnewrow = 0;
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
    nwParameter_Add("nwIsReport", nwIsReport);
    nwParameter_Add("nwSupplierCode", nwSupplierCode);
    nwParameter_Add("idvallugsupplier", $('#idvallugsupplier').val());
    nwParameter_Add("effectivedate", $('#txteffectivedate').val());
    nwParameter_Add_DataSet("nwGrid1Con")

}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {

    cust_GetPara();
    EnableFieldsDone();
    nwLoading_Start("xSample", crLoadingHTML);
    func_ActionDriven("actBindCollection", true);
    nwParameter_Add("nwSupplierCode", $('#txtSupplierCode').val());
    nwParameter_Add("Tradename", $('#txtTradeName').val());
    $('txtEffectiveDate')
    if (nwSupplierCode.length > 0) {
        func_ActionDriven("actTradename", true);
    }


}

function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("xSample", crLoadingHTML);
    nwParameter_Add("TotalRecords", $('div.BN-record span').text());
    DisableFieldsEmpty();
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////
var validation = "";
var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {

    var code = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + idNum + ")").find("td:eq(0)").text();


    if (idName == 'toolboxInquire') {

    }
    if (idName == 'lugsupplier') {
        nwParameter_Add("supplier", $('#idvallugsupplier').val());
        func_ActionDriven("gettin", true);
    }

    if (idName == 'branch') {

        var codeVal = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (0) + ")").text();
        var descVal = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (1) + ")").text();
        var addVal = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ")").find("td:eq(" + (2) + ")").text();

        var row = nwGrid1Con_Book.ActiveSheet.CellSelected.row - 1;

        nwGrid1Con_Book.ActiveSheet.SetText(SPR_BASISCODE - 1, row, codeVal, true);
        nwGrid1Con_Book.ActiveSheet.SetText(SPR_BASISDESC - 1, row, descVal, true);
        nwGrid1Con_Book.ActiveSheet.SetText(SPR_ADDRESS - 1, row, addVal, true);
    }

    if (idName == 'lugCopyFrom') {
        nwParameter_Add("copyFromeffectiveDate", code)
        func_ActionDriven("actCopyFrom", true);
    }
}

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var cnt = nwLib.nwTempTable_Row_Count("nwGrid1Con");
    var code = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    var isValid = nwLib.nwTempTable_Column_ValueExist("nwGrid1Con", 1, code, false, "text", 0);

    if (isValid == false) {
        crnwTRtemp.find('td:eq(1)').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + SPR_BRANCH + ')').text());
        crnwTRtemp.find('td:eq(2)').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + SPR_BRANCHNAME + ')').text());
        crnwTRtemp.find('td:eq(3)').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(' + SPR_ADDRESS + ')').text());

        if (cnt == (crnwTR.index() + 1))
            nwGrid_AddRow("nwGrid1Con", 1);
    }
    else {
        crnwTRtemp = null;
    }
    return crnwTRtemp;
}

function nwGrdi_Change(nwobj, nwobjrow, nwobjitem) {
}

function p8Spread_DblClick(canvasID, row, col) {
    p8Spread_CurBook = canvasID

    var effdate = $('.txtEffectiveDate').val();
    var SupplierCode = $("#idvallugsupplier").val();

    if (SupplierCode == "" || $('#nwGrid1Con').hasClass('noah-webui-disabled'))
        return false;

    if (canvasID == "nwGrid1Con") {
        if (col == SPR_BRANCH - 1) {

            var rows = nwGrid1Con_Book.ActiveSheet.GetMaxRow();
            var codeList = "";

            for (var x = 0; x <= rows; x++) {
                codeList += nwGrid1Con_Book.ActiveSheet.GetValue(SPR_BRANCH - 1, x); + '|';
            }

            cust_GetPara();
            nwParameter_Add('codeList', codeList);

            lookUpCustomize("branch", 1);
        }
    }
    return true;
}

//function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {

//    var effdate = $('#txtEffectiveDate').val();
//    var nwobjID = nwobj.attr('id');

//    if (nwobjID == "nwGrid1") {
//        if (crnwTD.index() == SPR_BRANCH) {

//            var rows = nwLib.nwTempTable_Row_Count("nwGrid1Con");
//            var codeList = "";
//            for (var x = 0; x <= rows; x++) {
//                codeList += nwLib.nwTempTable_RowData_Get("nwGrid1Con ", x, SPR_BRANCH - 1) + '|';
//            }

//            cust_GetPara();
//            nwParameter_Add('codeList', codeList);
//            lookUpCustomize("branch", 1);
//        }
//    }

//}

function EnableFields() {
    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);
}

function DisableFields() {
    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);
    $('#txtTinNo').enable(false);
}

function EnableFieldsDone() {//Binding Done

    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);
    DisableFieldsDone()
}

function DisableFieldsDone() { // For Refresh
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0') {
        $("#noah-webui-Toolbox-BindingNavigator").hide();
        $("#noah-webui-default-New").show();
        $("#noah-webui-default-New").enable(true);
        $("#noah-webui-default-Refresh").show();
        $("#noah-webui-default-Refresh").enable(true);
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-default-Inquire").hide();
        $("#noah-webui-default-Inquire").enable(false);
        $("#noah-webui-default-Save").show();
        $("#noah-webui-default-Save").enable(false);
        $("#noah-webui-default-Export").show();
        $("#noah-webui-default-Export").enable(false);
        $("#nwGrid1Con").enable(true);
    } else {
        $("#noah-webui-Toolbox-BindingNavigator").hide();
        $("#noah-webui-default-New").hide();
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-default-Inquire").show();
        $("#noah-webui-default-Inquire").enable(true);
        $("#noah-webui-default-Save").show();
        $("#noah-webui-default-Save").enable(true);
        $("#noah-webui-default-Export").show();
        $("#noah-webui-default-Export").enable(true);
        $("#nwGrid1Con").enable(false);
    }
}

function RefreshData() {

}


function DisableFieldsEmpty() {

    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);

}

function ClearFields() {

}

function toolboxnew() {
    $("#noah-webui-Toolbox").bindingNew().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $('#lugsupplier').removeClass('adisabled');
    $('#txteffectivedate').enable(true);
    $('#txteffectivedate').val('');
    $('#idvallugsupplier').val('');
    $('#descvallugsupplier').val('');
    $('#nwGrid1Con').removeClass('noah-webui-disabled');
}

function lapse() {

    var effectiveDate = $('#txteffectivedate').val();
    var serverDate = getCurrentDate();

    if (effectiveDate == serverDate) {

        $("#noah-webui-default-Save").enable(true);
        $("#noah-webui-default-Delete").enable(false);
        $('#nwGrid1Con').enable(true);
    }

    else if (effectiveDate > serverDate) {
        $("#noah-webui-default-Save").enable(true);
        $("#noah-webui-default-Delete").enable(true);
        $('#nwGrid1Con').enable(true);
    }

    else {
        $("#noah-webui-default-Save").enable(false);
        $("#noah-webui-default-Delete").enable(false);
        $('#nwGrid1Con').enable(false);

    }

    $('#txteffectivedate').prop("disabled", true);
}
function savetoolbox() {
    clear();
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);

}
function clear() {


}


function refreshtoolbox() {
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);

}


function filtereset() {
    filter = "''";
    isnewrow = 0;
}
$(document).on("change", "#txteffectivedate", function (e) {
    var serverdate = getCurrentDate();
    var effectivedate = $('#txteffectivedate').val();
    if (serverdate > effectivedate) {
        MessageBox("Effective Date Should be later than Current Server Date.", "Supplier Branch Group Assignment")
        $('#txteffectivedate').val(serverdate);

    }
});

function getCurrentDate() {
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
    var today = mm + '/' + dd + '/' + yyyy;
    return today;
}

function BranchFilter() {
    var brachfilter = "''";
    var len = crnwTable.find('tr').length;
    for (var x = 0; x <= len; x++) {
        if (crnwTable.find('tr:eq(' + x + ')').find('td:eq(' + SPR_BRANCH + ')').text() == "")
            continue;

        if (brachfilter == "''")
            brachfilter = "'" + crnwTable.find('tr:eq(' + x + ')').find('td:eq(' + SPR_BRANCH + ')').text() + "'";
        else
            brachfilter += ",'" + crnwTable.find('tr:eq(' + x + ')').find('td:eq(' + SPR_BRANCH + ')').text() + "'";
    }
    return brachfilter;

}

function linkaction() {
    $("#noah-webui-Toolbox").bindingInquire().visible(true);
    $('#txtSupplierCode').val(nwSupplierCode);
    $('#txtTradeName').val(tradename);
    $('#nwGrid1Con').enable(true);
    func_ActionDriven("actTradename", true);


}
function normalfunctionaction() {
    $('#nwGrid1Con').enable(false);
    $("#noah-webui-Toolbox").bindingInquire().visible(true);
    $("#noah-webui-Toolbox").bindingNew().visible(false);
    $("#noah-webui-Toolbox").bindingSave().visible(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
}

$(document).on("click", ".nwDelete", function () {

    if (nwIsReport == 1 || nwSupplierCode == "") {
        return;
    }

    var code = $('#nwGrid1Con .tblGridBody tr:eq(' + crnwTR.index() + ') td:eq(' + SPR_BRANCH + ')').text();

    if (code != "") {
        msgBoxContainerQuestion = "nwDelete";
        parent_MessageBoxQuestion("Do you wish to remove current row?", basedTitle, "");
    }

    else {
        MessageBox("No details found!", basedTitle, "error");
    }

});

function msgBoxContainerQuestionF(genID, answer) {

    if (genID == "nwDelete") {
        if (answer == "Yes") {
            $(".nwgrid_Delete").click();
            nwGrid_AddRow('nwGrid1Con', 1);
        }
    }


    else if (genID == "closing") {
        if (answer == "Yes") {
            isClose = true;
            parent.mainParent_Close_Form();
        }
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

function isViewReport() {
    if (nwSupplierCode != "" && nwIsReport == 0) {
        $("#noah-webui-Toolbox-BindingNavigator").hide();
        $("#noah-webui-default-New").show();
        $("#noah-webui-default-New").enable(true);
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-default-Inquire").hide();
        $("#noah-webui-default-Inquire").enable(false);
        $("#noah-webui-default-Save").show();
        $("#noah-webui-default-Save").enable(true);
        $("#noah-webui-default-Export").show();
        $("#noah-webui-default-Export").enable(true);
        $("#nwGrid1Con").enable(true);
    }

    else if (nwSupplierCode != "" && nwIsReport == 1) {
        $("#noah-webui-Toolbox-BindingNavigator").hide();
        $("#noah-webui-default-New").hide();
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-default-Inquire").show();
        $("#noah-webui-default-Inquire").enable(false);
        $("#noah-webui-default-Save").hide();
        $("#noah-webui-default-Save").enable(false);
        $("#noah-webui-default-Export").show();
        $("#noah-webui-default-Export").enable(false);
        $("#nwGrid1Con").enable(false);
    }
    else {
        $("#noah-webui-Toolbox-BindingNavigator").show();
        $("#noah-webui-default-New").hide();
        $('#noah-webui-default-Delete').hide();
        $("#noah-webui-default-Inquire").show();
        $("#noah-webui-default-Inquire").enable(true);
        $("#noah-webui-default-Save").hide();
        $("#noah-webui-default-Save").enable(true);
        $("#noah-webui-default-Export").show();
        $("#noah-webui-default-Export").enable(true);
        $("#nwGrid1Con").enable(false);
    }
}

function ExportToExcel() {
    try {
        window.open('ExporttoExcel.aspx', '_self', false);
    } catch (err) {

        window.open('../../../ExportToExcel.aspx', '_self', false);
    }
}