﻿var defaultloc = "";
var currentYear = "";
var currentDate = "";
var lookupFilter = "''";
var lookupFilter1 = "''";

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

var currTR
var SPR_TIN = 1,
            SPR_REGNAME = 2,
            SPR_SUPNAME = 3,
            SPR_SUPADD = 4,
            SPR_GROSS = 5,
            SPR_EXEMPT = 6,
            SPR_ZERORATED = 7,
            SPR_TAXABLE = 8,
            SPR_SERVICES = 9,
            SPR_CAPITALGOODS = 10,
            SPR_OTHERTHANCAPITALGOODS = 11,
            SPR_INPUTTAX = 12,
            SPR_GROSSTAXABLE = 13;

//var SPR_ACCOUNTDESC = 8;
//var SPR_PARTICULARS = 9;
//var SPR_BEGBAL = 12;
//var SPR_HOMEDEBIT = 13;
//var SPR_HOMECREDIT = 14;
//var SPR_ENDINGBAL = 15;

var BasedTitle = "";
$(document).on("click", "button", function () {
    return false;
});

function func_Reload() {
    LoadStringsCases();
    crLnk = GetCurrentURL() + "APVATReport_Gateway";
    crLnkGateKey = "APVATReport";
    $("#settingstabs").loadAddtoList({ list: ["Location with Accountable Forms"], icon: true });

    var isContinue = true;
    init_request();
    //nwPopupForm_Create("win_columns");
    //nwPopupForm_Create("frm_totals"); // create form

    //$('#txtDateTo').datepicker();
    //$('#txtDateFrom').datepicker();

    ////$('#txtAnually').mask('?9999');
    //$('#txtDateTo').mask('?99/99/9999');
    //$('#txtDateFrom').mask('?99/99/9999');


    ToolBoxGetData = false;
    //$("#nwGrid1").find("input,button,textarea").attr("disabled", "disabled");
    //nwPopupForm_Create("nwmodal1");

    //nwPopupForm_Modal("nwmodal1");
    $('#txtCurrentDate').val('')
    $('#cmbMonth').enable(true);
    $('#cboAnnual').enable(false);
    $('#cmbQuarter').enable(true);
    $('#txtDateFrom').enable(false);
    $('#txtDateTo').enable(false);
    $('#cmbQuarter').enable(false);



    return isContinue;
}
////////////////////////// TOol Box


function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    $("#cmbMonth").enable(true);
    $("#radioMonthly").prop("checked", true);
    func_Toolbox_Clear();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", "Banks", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", "Banks", "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;

    //var err = Validations();

    //if(err != ""){
    //    MessageBox(err,BasedTitle);
    //    isContinue = false;
    //}
    cust_GetPara();
    getloadfilterexport()
    //isRefreshed = true;

    return isContinue;
}


function defaultonload(code, description) {
    $('div.atlContainer[nwtype="LocationwithAccountableForms"] div.innertext').append(GenerateLookupListDataHTML(code, description));
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
    //var isContinue = true;
    //getloadfilterexport();
    //cust_GetPara();
    //return isContinue;
    var isContinue = true;
    isContinue = false;
    fn_ExportGrid("nwGridMainCon");
    return isContinue;

}

function func_ToolboxPrint(indef, enume) {
    var isContinue = true;
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

    GetAddtoListFilters()
    nwParameter_Add("DateGridHeader", getYearGridHeader(2));
    nwParameter_Add("idvallugPerMainAccount", "idvallugPerMainAccount")
    getDateFilter()
    nwParameter_Add("DocumentType", getDocumentType());

}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwParameter_Add("txtCode", $("#txtCode").val());
    // EnableFieldsDone();
    nwLoading_Start("actBindCollection", crLoadingHTML);
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("actBindCollectionEmpty", crLoadingHTML);
    nwParameter_Add("TotalRecords", $('div.BN-record span').text());
    //	DisableFieldsEmpty();
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////
var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    var id = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
    var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();
    // if (idName == 'tdMainFrom') {
    //    $('#'+idName).text(id)
    //}

    //     if (idName == 'tdMainFrom') {
    //        $('#tdAccountFrom').text(desc)
    //     }
    //     
    //     if (idName == 'tdMainTo') {
    //        $('#tdAccountTo').text(desc)
    //     }
}

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var value = "<option value='" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "'>" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + " - " + addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text() + "</option>"

    $('#cmb' + currTR).append(value)
    return null;
}

function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {
    var value = "<option value='" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "'>" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "</option>"

    $('#cmb' + verID).append(value)
}

function nwGrdi_Change(nwobj, nwobjrow, nwobjitem) {
    // alert(nwobj.attr('id'));
    //  nwobj.hide();
    var ss = nwobjitem.find('#selecta').val();
    //  nwobjrow.css('background-color', 'black');
    //  nwobjrow.find('td').css('background-color', 'rgba(0,0,0,0.1)');
    //$(nwobjrow).css('background-color', 'black');
}

function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
    var ss = nwobjitem.find('#selecta').val();
    /// nwobjrow.css('background-color', 'black');
    // alert(crnwTD.attr('class'));
}

function EnableFields() {
    $('.nwLeftheader').enable(true);
    $('#nwGridMain').enable(true)
    $('.nwRightheader').enable(true);

}

function DisableFieldscustom() {
    $('.nwLeftheader').enable(false);
    $('#nwGridMain').enable(false)
    $('.nwRightheader').enable(false);

}


function DisableFields() {
    $('.nwLeftheader').enable(true);
    $('.nwRightheader').enable(true);
    $(".nwLeftheader input[type='text']").enable(false);
    $(".nwLeftheader select").enable(false);
    $("#nwGridFilterCon").enable(false);
    $("#txtAnually").enable(false);
}

function EnableFieldsDone() {//Binding Done
    $("#txtCode").prop("disabled", true);
    $("#txtDescription").prop("disabled", false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);

    $("#noah-webui-Toolbox").bindingDelete().visible(true);
}

function DisableFieldsDone() { // For Refresh
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0') {
        $("#txtCode").prop("disabled", true);
        $("#txtDescription").prop("disabled", false);

        $("#noah-webui-Toolbox").bindingNew().enable(true);
        $("#noah-webui-Toolbox").bindingDelete().visible(true);
        $("#noah-webui-Toolbox").bindingExport().enable(true);
        $("#noah-webui-Toolbox").bindingInquire().enable(true);
        $("#noah-webui-Toolbox").bindingDelete().enable(true);
        $("#noah-webui-Toolbox").bindingSave().enable(true);
    }
}

function DisableFieldsEmpty() {
    $("#txtCode").prop("disabled", true);
    $("#txtDescription").prop("disabled", true);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
}

function ClearFields() {
    $('.RightFilterHeader').html("");
    $('#nwGridFilterCon td').html("&nbsp;")
    DisableFields();
    ClearDateFilter();
    clearlookupval();

    //$('input[type="radio"]').prop("checked",false); 
}
function clearlookupval() {
    if ($('#chckMainAccount').prop("checked")) {
        $('#descvallugPerMainAccount').val("");
        $('#idvallugPerMainAccount').val("");
        $('#idvallugPerSubAccount').val("");
        $('#descvallugPerSubAccount').val("");
        $('#lugPerMainAccount').addClass("adisabled");
        $('#lugPerSubAccount').addClass("adisabled");
        $('#chckMainAccount').prop("checked", false)
    }
    if ($('#chckSubAccount').prop("checked")) {
        $('#descvallugPerMainAccount').val("");
        $('#idvallugPerMainAccount').val("");
        $('#idvallugPerSubAccount').val("");
        $('#descvallugPerSubAccount').val("");
        $('#lugPerMainAccount').addClass("adisabled");
        $('#lugPerSubAccount').addClass("adisabled");
        $('#chckSubAccount').prop("checked", false)


    }
    func_ActionDriven("actCleargrid", false);

}



function msgBoxContainerQuestionF(genID, answer) {
    if (genID == 1) {
        if (answer == "Yes") {
            //func_saveCheck();
        }
        else {
            //func_saveContinue();
        }
    }
    else if (genID == 2) {
        if (answer == "Yes") func_saveContinue();
    }

}


$(document).on("keyup blur", "#txtCode", function (e) {
    var str = $("#txtCode").val();
    var res = str.replace(/'|%/g, "");
    $("#txtCode").val(res);
});

$(document).on("keypress blur", "#txtCode", function (e) {
    if (e.which == 37 || e.which == 39)
        return false;
});

$(document).on("change", "#chckAccountDetails", function (e) {
    $('#nwGridFilterCon').enable($(this).prop("checked"))
    $('.nwRightheader .noah-webui-containerRow').enable(!$(this).prop("checked"))
    $('.RightFilterHeader').html("");
    $('#nwGridFilterCon td').html("&nbsp;")
});

$(document).on("change", "input[name='dateFilter']", function (e) {
    //DisableFields();
    //ClearDateFilter();
    //if ($(this).prop("checked")) {

    //    var id = $(this).attr("id")

    //    if (id == "radioMonthly") {

    //        $('#cmbMonth').prop("disabled", false);

    //    } else if (id == "rbForThePeriod") {

    //        $('#txtDateFrom').enable(true);
    //        $('#txtDateTo').enable(true);
    //        $('#txtDateFrom').val(currentDate);
    //        $('#txtDateTo').val(currentDate);
    //    }
    //    else if (id == "rbAnnual") {
    //        if ($('#txtAnually').val() == "")
    //            $('#txtAnually').val(currentYear);

    //        $('#txtAnually').prop("disabled", false);
    //    }
    //    else if (id == "rbQuarter") {
    //        $('#radioQuarter').prop("disabled", false);
    //    }
    //}

    if ($(this).prop("checked")) {
        var id = $(this).attr("id")

        if (id == "radioMonthly") {
            $('#txtCurrentDate').val('')
            $('#cmbMonth').enable(true);
            $('#txtAnually').enable(false);
            $('#cmbQuarter').enable(true);
            $('#txtDateFrom').enable(false);
            $('#txtDateTo').enable(false);
            $('#cmbQuarter').enable(false);

            $('#txtCurrentDate').val('')

        } else if (id == "radioDate") {
            $('#txtDateFrom').val(currentDate);
            $('#txtDateTo').val(currentDate);
            $('#cmbMonth').enable(false);
            $('#txtAnually').enable(false);
            $('#cmbQuarter').enable(false);
            $('#txtDateFrom').enable(true);
            $('#txtDateTo').enable(true);
        }
        else if (id == "radioAnnual") {
            if ($('#txtAnually').val() == "")
                $('#cmbMonth').enable(false);
            $('#cmbQuarter').enable(false);
            $('#cmbMonth').enable(false);
            $('#txtAnually').enable(true);
        }
        else if (id == "radioQuarter") {
            $('#cmbMonth').enable(false);
            $('#txtAnually').enable(false);
            $('#cmbQuarter').enable(true);
        }
        else if (id == "radioAsOf") {
            getDate();
            $('#txtDateFrom').enable(false);
            $('#txtDateTo').enable(false);
        }
        else if (id == "radioDate") {

        }


    }

    function ClearDateFilter() {
        $("#cmbMonth").val("1");
        $("#cmbQuarter").val("1");

        if ($("#txtAnually").val() == "")
            $("#txtAnually").val(currentYear);

        $("#txtDateFrom").val("");
        $("#txtDateTo").val("");
    }
});


function ClearDateFilter() {
    $("#cmbMonth").val("1");
    $("#cmbQuarter").val("1");
    
    if($("#txtAnually").val() == "")
        $("#txtAnually").val(currentYear);
    
    $("#txtDateFrom").val("");
    $("#txtDateTo").val("");
}


$(document).on("blur", "#txtAnually", function () {
    if ($(this).val() == "") {
        $(this).val(currentYear)
    }

    ReloadMonth()
    ReloadQuarter()
});


getDateFilter();
cust_GetPara();

function ReloadQuarter() {
    $('#cmbQuarter').html("");
    $('#cmbQuarter').append("<option value='1'>1st Quarter, " + $('#txtAnually').val() + "</option>");
    $('#cmbQuarter').append("<option value='2'>2nd Quarter, " + $('#txtAnually').val() + "</option>");
    $('#cmbQuarter').append("<option value='3'>3rd Quarter, " + $('#txtAnually').val() + "</option>");
    $('#cmbQuarter').append("<option value='4'>4th Quarter, " + $('#txtAnually').val() + "</option>");
}
function ReloadMonth() {
    $('#cmbMonth').html("");
    $('#cmbMonth').append("<option value='01'>January, " + $('#txtAnually').val() + "</option>");
    $('#cmbMonth').append("<option value='02'>February, " + $('#txtAnually').val() + "</option>");
    $('#cmbMonth').append("<option value='03'>March, " + $('#txtAnually').val() + "</option>");
    $('#cmbMonth').append("<option value='04'>April, " + $('#txtAnually').val() + "</option>");
    $('#cmbMonth').append("<option value='05'>May, " + $('#txtAnually').val() + "</option>");
    $('#cmbMonth').append("<option value='06'>June, " + $('#txtAnually').val() + "</option>");
    $('#cmbMonth').append("<option value='07'>July, " + $('#txtAnually').val() + "</option>");
    $('#cmbMonth').append("<option value='08'>August, " + $('#txtAnually').val() + "</option>");
    $('#cmbMonth').append("<option value='09'>September, " + $('#txtAnually').val() + "</option>");
    $('#cmbMonth').append("<option value='10'>October, " + $('#txtAnually').val() + "</option>");
    $('#cmbMonth').append("<option value='11'>November, " + $('#txtAnually').val() + "</option>");
    $('#cmbMonth').append("<option value='12'>December, " + $('#txtAnually').val() + "</option>");
}



function getDateFilter() {
    var dateFilterFrom = "";
    var dateFilterTo = "";
    if ($('#radioMonthly').prop("checked")) {
        dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
        var month = $('#cmbMonth').val()
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31";
        }
        else if (month == 4 || month == 6 || month == 9 || month == 11) {
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30";
        }
        else if (month == 2) {
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-28";
        }

    }

    if ($('#radioAnnual').prop("checked")) {
        dateFilterFrom = $('#txtAnually').val() + "-1-1";
        dateFilterTo = $('#txtAnually').val() + "-12-31";
    }

    if ($('#radioQuarter').prop("checked")) {
        if ($('#cmbQuarter').val() == 1) {
            dateFilterFrom = $('#txtAnually').val() + "-1-1";
            dateFilterTo = $('#txtAnually').val() + "-3-31";
        }
        if ($('#cmbQuarter').val() == 2) {
            dateFilterFrom = $('#txtAnually').val() + "-4-1";
            dateFilterTo = $('#txtAnually').val() + "-6-30";
        }
        if ($('#cmbQuarter').val() == 3) {
            dateFilterFrom = $('#txtAnually').val() + "-7-1";
            dateFilterTo = $('#txtAnually').val() + "-9-30";
        }
        if ($('#cmbQuarter').val() == 4) {
            dateFilterFrom = $('#txtAnually').val() + "-10-1";
            dateFilterTo = $('#txtAnually').val() + "-12-31";
        }
    }

    if ($('#radioDate').prop("checked")) {
        dateFilterFrom = $('#txtDateFrom').val();
        dateFilterTo = $('#txtDateTo').val();
    }
    nwParameter_Add("dateFilterFrom", dateFilterFrom);
    nwParameter_Add("dateFilterTo", dateFilterTo);

    nwParameter_Add("SubAccount", $('#idvallugPerSubAccount').val());
    nwParameter_Add("MainAccount", $('#idvallugPerMainAccount').val());
    lookupFilter1 = "";
    $('#cmbluglocacc option').each(function (index, option) {
        if (lookupFilter1 == "") {
            lookupFilter1 = "'" + $(this).val() + "'";
        } else {
            lookupFilter1 += ",'" + $(this).val() + "'";
        }
    });

    nwParameter_Add("lookupFilter1", lookupFilter1);
}

$(document).on("change", "#txtDateFrom", function (e) {
    if ($(this).val() == "") {
        $('#txtDateTo').val("")
        return;
    }

    if ($(this).val() > $('#txtDateTo').val())
        $('#txtDateTo').val($(this).val())
});


$(document).on("change", "#txtDateTo", function (e) {
    if ($(this).val() == "") {
        $('#txtDateFrom').val("")
        return;
    }

    var From = new Date($('#txtDateFrom').val())
    var To = new Date($(this).val())
    if (To < From)
        $('#txtDateFrom').val($(this).val())
});

$(document).on("change", "#chckSubAccount", function (e) {
    // $('#lugPerSubAccount input').val(""); 
    if ($(this).prop("checked")) {
        $('#lugPerSubAccount').removeClass("adisabled");
        //$('#chckMainAccount').prop('checked', false);

        //$('#idvallugPerMainAccount').val("");
        //$('#descvallugPerMainAccount').val("");
    }
    else {
        $('#lugPerSubAccount').addClass("adisabled");
        $('#idvallugPerSubAccount').val("");
        $('#descvallugPerSubAccount').val("");
    }


});


$(document).on("change", "#chckMainAccount", function (e) {
    // $('#lugPerMainAccount input').val("");  
    if ($(this).prop("checked")) {

        $('#lugPerMainAccount').removeClass("adisabled");
        //$('#chckSubAccount').prop('checked', false);
        //$('#idvallugPerSubAccount').val("");
        //$('#descvallugPerSubAccount').val("");

    }
    else {
        $('#lugPerMainAccount').addClass("adisabled");
        $('#idvallugPerMainAccount').val("");
        $('#descvallugPerMainAccount').val("");
    }

});



function BoldfontParticulars() {

    crnwTable = $("#nwGridMainCon .tblGridBody");

    var count = crnwTable.find("tr").find("td:eq(" + SPR_ACCOUNTDESC + ")").length;

    var value = "";

    for (var i = 0; i < count; i++) {

        value = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").text();

        if (value == "BEGINNING BALANCE: ") {
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BaseAmount + ")").enable(false);
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BEGBAL + ")").addClass("dataset4");

        }

        if (value == "TOTAL: ") {
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BaseAmount + ")").enable(false);
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_HOMEDEBIT + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_HOMECREDIT + ")").addClass("dataset4");

        }
        if (value == "ENDING BALANCE: ") {
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BaseAmount + ")").enable(false);
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ENDINGBAL + ")").addClass("dataset4");

        }


    }
}

function checkcolor() {

    crnwTable = $("#nwGridMainCon .tblGridBody");

    var count = crnwTable.find("tr").find("td:eq(" + SPR_ZERORATED + ")").length;

    var value = "";

    for (var i = 0; i < count; i++) {

        value = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ZERORATED + ") textarea").val();

        if (value == "" || value == "0") {
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BaseAmount + ")").enable(false);
            //crnwTR.find("td:eq(" + SPR_Particulars + ") .nwgbtnRemarks").removeClass('colorgreen');
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_Particulars + ") ,nwgbtnRemarks").removeClass("colorgreen");
        }
        else {
            // crnwTR.find("td:eq(" + SPR_Particulars + ") .nwgbtnRemarks").addClass('colorgreen');
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ZERORATED + ") .nwgbtnRemarks").addClass("colorgreen");
            $("#txtnwgRemarks").enable(false);

        }

    }
}

function boldfontexport() {

    crnwTable = $("#nwExportGen-nwData");

    var count = crnwTable.find("tr").find("td:eq(" + SPR_PARTICULARS + ")").length;

    var value = "";

    for (var i = 0; i < count; i++) {

        value = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").text();

        if (value == "BEGINNING BALANCE: ") {
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BaseAmount + ")").enable(false);
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BEGBAL + ")").addClass("dataset4");

        }

        if (value == "TOTAL: ") {
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BaseAmount + ")").enable(false);
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_HOMEDEBIT + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_HOMECREDIT + ")").addClass("dataset4");

        }
        if (value == "ENDING BALANCE: ") {
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BaseAmount + ")").enable(false);
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ENDINGBAL + ")").addClass("dataset4");

        }


    }
}
$(document).on("click", ".RightFilterHeaderlookup", function () {
    lookupFilter = "''";
    $('#cmb' + $(this).attr("id") + " option").each(function (index, option) {
        if (lookupFilter == "''") {
            lookupFilter = "'" + $(this).val() + "'";
        } else {
            lookupFilter += ",'" + $(this).val() + "'";
        }
    });
    nwParameter_Add("lookupFilter", lookupFilter);
    currTR = $(this).attr("id");
    lookUpCustomize(currTR, 2);
});



$(function () {
    $("#settingstabs").tabs();
});

function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext" nwcode="' + xvalue + '" class="nwCuz010">' + xdisplay + '<span class="classx">x</span></div>';
};

function GetAddtoListFilters() {
    var len = $('div.atlContainer').length;
    for (var i = 0; i < len; i++) {
        var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
        var xvalue = "";
        var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
        for (var j = 0; j < lencode; j++) {
            if (xvalue != "") xvalue += "|";
            xvalue += $('.atlContainer:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');
        }

        nwParameter_Add(xkey, xvalue);
    }
};


function GetAddtoListFilters1() {
    var len = $('div.atlContainer').length;
    for (var i = 0; i < len; i++) {
        var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
        var xvalue = "";
        var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
        for (var j = 0; j < lencode; j++) {
            if (xvalue != "") xvalue += "|";
            xvalue += $(".atlContainer:eq(" + i + ") div.spantext:eq(" + j + ")").attr("nwcode");
        }

        nwParameter_Add(xkey, xvalue);
        $('#filterx').val(xvalue);
    }
};

$(document).on("click", ".btnGetlookup", function () {
    crnwTableCon = null; // if grid is click 
    var xtype = $(this).attr("nwtype");
    var selectedInput = xtype;
    GetAddtoListFilters();
    lookUpCustomize(selectedInput, 2);

});

//function nwGrid_AddtoListDoneCustom(nwGridID, addtoListTableRec, index) {

//}

$(document).on('click', 'span.classx', function () {
    $(this).closest('div.spantext').remove();
});

//add to list


function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {
    //var value = "<option value='" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "'>" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "</option>"

    //$('#cmbluglocacc').append(value)
    var xvalue = "";
    var xdisplay = "";

    //if (verID == "luglocacc" || verID == "lugModule") {
    xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

    if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
        $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
    }
    //  }



}



function getloadfilter() {
    var count = $('.spantext').length;
    crnwTable = $("#nwGridMainCon .tblGridBody");
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.spantext:eq(' + i + ')').text().substring(0, $('.spantext:eq(' + i + ')').text().length - 1);

        if (loc.length > 0) {
            allloc += loc + ";";
        }
    }
    allloc = allloc.substring(0, allloc.length - 1)
    if (allloc.length == 0) {
        allloc = "All Locations";
    }
    crnwTable.find("tr:eq(4)").find('td:eq(1) ').text('LOCATION NAME: ' + allloc);
}

$(document).on('click', '.nwgbtnRemarks', function () {
    $('#btnnwgRemarks').enable(false);
    $('#txtnwgRemarks').enable(false);
    $('#chknwgRemarks').enable(false);
});


function getYearGridHeader(type) {
    switch (type) {
        case 1:
            return "As of Date: " + $('.isNumber.hasDatepicker').val();
            break;
        case 2:
            if ($('#radioAnnual').prop("checked")) {
                return "For the Year " + $('#txtAnually').val();
            }

            if ($('#radioMonthly').prop("checked")) {
                return "For the Month of " + $('#cmbMonth option:selected').text();
            }

            if ($('#radioQuarter').prop("checked")) {
                return "For the " + $('#cmbQuarter option:selected').text()
            }

            if ($('#radioDate').prop("checked")) {
                return "DATE COVERED: " + $('#txtDateFrom').val() + " - " + $('#txtDateTo').val()
            }
            break;
    }
}




//$(document).on("click", "#chckSubAccount", function () {
//    cust_GetPara();
//});


//$(document).on("click", "#chckMainAccount", function () {
//    cust_GetPara();
//});



function func_LookUpInitialize(lookupid) {
    //if (lookupid == "lugPerSubAccount") {
    //    getDateFilter();
    //    cust_GetPara();
    //}
    //if (lookupid == "lugPerMainAccount") {
    //    getDateFilter();
    //    cust_GetPara();
    //}
    //if (lookupid == "luglocacc") {
    //    getDateFilter();
    //    cust_GetPara();
    //}
    getDateFilter();
    cust_GetPara();

}



function getloadfilterexport() {
    var count = $('.spantext').length;
    crnwTable = $("#nwGridMainCon .tblGridBody");
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.spantext:eq(' + i + ')').text().substring(0, $('.spantext:eq(' + i + ')').text().length - 1);

        if (loc.length > 0) {
            allloc += loc + ";";
        }
    }
    allloc = allloc.substring(0, allloc.length - 1)
    if (allloc.length == 0) {
        nwParameter_Add("LocationFilter", "All Locations");
    } else {
        nwParameter_Add("LocationFilter", allloc);
    }
}



function getDocumentType() {

    if ($('#radioAll').prop("checked"))
        return 0;
    if ($('#radioAPV').prop("checked"))
        return 1;
    if ($('#radioDebit').prop("checked"))
        return 2;
    if ($('#radioPaymentRelease').prop("checked"))
        return 3;
    if ($('#radioVoidChecks').prop("checked"))
        return 4;
    if ($('#radioNonCheckPayment').prop("checked"))
        return 5;

}

$(document).on('click', '#nwCustBtn', function () {
    nwLoading_Start("actcreateDatFile", crLoadingHTML);
    cust_GetPara();
    nwParameter_Add("urlPath", window.location.origin);
    func_ActionDriven("actcreateDatFile", false);
});

function func_DownloadReceipt(xFileName) {
    var xfilearr = xFileName.split("**??**");

    for (var a = 0 ; a < xfilearr.length; a++) {
        $('#aDownload').attr("href", xfilearr[a]);
        $('#aDownload')[0].click();
        nwParameter_Add('xFileName', xFileName);
        $('#aDownload').attr("href", "#");
    }
    //setTimeout(function () { func_ActionDriven("actDeletedTempFold", false); }, 10000);

}

$(document).on('click', '#radioAll', function () {
    if ($(this).is(':checked')) {
        $('.nwCustBtnDiv button').enable(true);
    } else {
        $('.nwCustBtnDiv button').enable(false);
    }
});


$(document).on('click', '#radioAPV, #radioDebit, #radioPaymentRelease, #radioVoidChecks, #radioNonCheckPayment', function () {
    let isMonthly = $('#radioMonthly').is(':checked');
    if ($(this).is(':checked') && isMonthly) {
        $('.nwCustBtnDiv button').enable(false);
    } else {
        $('.nwCustBtnDiv button').enable(true);
    }
});

function setToCurrentDate() {

    let xArr = CurrentDate.split("/")

    let month = xArr[0];
    let year = xArr[2];


    $('#cmbMonth').val(month);
    $('#txtAnually').val(year);

    if (month == 1 || month == 2 || month == 3) {
        $('#cmbQuarter').val(1);
    } else if (month == 4 || month == 5 || month == 6) {
        $('#cmbQuarter').val(2);
    } else if (month == 7 || month == 8 || month == 9) {
        $('#cmbQuarter').val(3);
    } else if (month == 10 || month == 11 || month == 12) {
        $('#cmbQuarter').val(4);
    }

}