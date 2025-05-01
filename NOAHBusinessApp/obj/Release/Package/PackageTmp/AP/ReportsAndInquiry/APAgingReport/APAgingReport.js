var serverDate = new Date();
var nwDocno = '';
var menuTitle = 'Aging Report';
var currentDate = "";
var currentYear = "";

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

function func_Reload() {
    crLnk = GetCurrentURL() + "APAgingReport_Gateway";
    crLnkGateKey = "APAgingReport";
    $("#settingstabs").loadAddtoList({ list: ["Location with Accountable Forms", "Payee", "Segment 1"], icon: true });
    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DateFormat();// checkcolor

    nwPopupForm_Create("nwDocumentInquiry");
    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    
    $("#sortType").val('');
    $("#sortBy").val('');
    $('#nwGridView').enable(true)
    $("#cboMonthly").enable(true);
    $("#rbMonthly").prop("checked", true);

    func_Toolbox_Clear();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", menuTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", menuTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    nwLoading_Start(`xRefreshBtn`, crLoadingHTML);
    getloadfilterexport();
    isRefreshed = true;
    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;

    var x = $("#noah-webui-Toolbox").bindingProcess().enable();

    if (x == true) {
        nwPopupForm_ShowModal("nwProcessWindow");
    }

    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    getloadfilterexport();
    var isContinue = true;
    isContinue = false;
    fn_ExportGrid("nwConServiceStatus");
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
    getDateFilter();
    GetAddtoListFilters();
    nwParameter_Add("FromPayee", $('#idvallugFromPayee').val());
    nwParameter_Add("ToPayee", $('#idvallugToPayee').val());
    nwParameter_Add("dtAsofDate", $('#dtAsofDate').val());
    nwParameter_Add("radioDetailed", $('#radioDetailed').prop("checked"));
    nwParameter_Add("radioInvoice", $('#radioInvoice').prop("checked"));
    nwParameter_Add("radioSupplier", $('#radioSupplier').prop("checked"));

}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("actBindCollection", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}


function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("actBindCollectionEmpty", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}


///////////////////////////////////////

function func_LookUpInitialize(lookupName) {
    cust_GetPara();
}

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {

    if (idName == 'toolboxInquire') {
    }

    else if (idName == 'lugFromPayee') {
        var Code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
        var Employee = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();
        $("#idvallugFromPayee").val(Code);
        $("#descvallugFromPayee").val(Employee);
    }

    else if (idName == 'lugToPayee') {
        var Code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
        var Employee = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();
        $("#idvallugToPayee").val(Code);
        $("#descvallugToPayee").val(Employee);
    }
}

function getGridData(idnum, index) {
    var data = $(`#menuCreatorContainer .tablecontainter table tr:eq(${idnum
    })`).find(`td:eq(${index
    })`).text();
    return data;
}

function setGridData(nwGrid, type, col, row, val) { // Setting Text in Grid
    if (type == 'input')
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val(val);
    else
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text(val);
}

function EnableFields() {
    $('.nwLeftFilter').enable(true);
    $('.nwRightFilter').enable(true);
}

function EnableFieldsDone() {//Binding Done
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
}

function DisableFieldsEmpty() {
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
}

function ClearFields() {
    $("#dtAsofDate").val('')
    $("#radioDetailed").prop('checked', true);
    $("#idvallugFromPayee").val('');
    $("#descvallugFromPayee").val('');
    $("#idvallugToPayee").val('');
    $("#descvallugToPayee").val('');
    $(".atl_Locacc .innertext").text('');
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}


function isPercentage(value) {
    if (value == '') return;
    var val = '';

    var getBasePrice = 0.00;
    getBasePrice = parseFloat(value) || 0;

    if (getBasePrice > 100) {
        val = '';
    }
    else {

        if (val % 1 != 0) {
            val = getBasePrice.toFixed(2).toString() + '%'
        }
        else {
            val = getBasePrice.toString() + '%'
        }
    }

    return val;

}

function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
    if (nwDocno != '') return;
    var nwobjID = nwobj.attr('id');

    var col = crnwTD.index();

    if (nwobjID == "nwConOtherFeesDetails") {
        if (col == SPR_MISC_CODE) {
            lookUpCustomize("lugMiscList", 1);
        }
    }

    if (nwobjID == "nwConAdditionalDetails") {
        if (col == SPR_AINTERMENTTYPE) {
            lookUpCustomize("lugIntermentType", 1);
        }
    }
}



function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idnum + ")").find("td:eq(" + (index) + ")").text();
    return data;
}

function setGridData(nwGrid, type, col, row, val) {
    if (type == 'input')
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val(val);
    else
        $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text(val);
}

//function getGridData(nwGrid, type, col, row) {
//    var data = '';
//    if (type == 'input')
//        data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col}) input`).val();
//    else
//        data = $(`#${nwGrid}-nwData tr:eq(${row})`).find(`td:eq(${col})`).text();
//    return data;
//}


$(function () {
    $("#settingstabs").tabs();
});


function DateFormat() {
    $('.custom-datepicker').datepicker({ maxDate: '0' });
}

function PopWindow(itemGroup, valueDate) {

    var title = "";
    var fullength = "";

    title = "Set Project Hierarchy";
    fullength = `ConstructionHierarchySetup?nwdev=p8dev&ig=` + itemGroup + `&vd=` + valueDate;

    nwPopupForm_ShowModal("nwPopWindow");
    $('#nwPopWindow .BoxTitle').text(title);
    $('#frame_viewVendorReport').attr("src", fullength);
    nwLoading_End('xSample');
}


function window_close(window) {
    nwPopupForm_HideModal(window);
}

function msgBoxContainerQuestionF(id, answer) {

    if (id == "saveOtherFees") {
        if (answer == "Yes") {
            cust_GetPara();
            nwParameter_Add_Table('nwConOtherFeesDetails');
            func_ActionDriven('actSaveOtherFees', false);
        }
    }

    if (answer == "Yes") {
        if (DtlsPromptName == "CSVFile") {
            cust_GetPara();
            nwLoading_Start("xSample", crLoadingHTML);
            nwLoading_Start("xGenerateTxt", crLoadingHTML);
            nwParameter_Add_Table('nwConServiceStatus');
            func_ActionDriven("actGenerateText", false);
        }
    } else if (answer == "No") {

        if (DtlsPromptName == "CSVFile") {
            $("#dimbgNW").removeClass("openn");
            $("#dimMessageBox").css("display", 'none');
        }

    }

    DtlsPromptName = "";
}


/******** FUNCTION *********/
function isValidDate(dateString) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[1], 10);
    var month = parseInt(parts[0], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};


/******** CLICK EVENTS ********/
function getGridDataPerLine(nwGrid, type, col, row) {
    var data;
    if (type == `input`)
        data = $(`#${nwGrid
        }-nwData tr:eq(${row
        })`).find(`td:eq(${col
        }) input`).val();
    else
        data = $(`#${nwGrid
        }-nwData tr:eq(${row
        })`).find(`td:eq(${col
        })`).text();
    return data;
}


/******** CHANGE EVENTS ********/
$(document).on("change", "input[name='dateFilter']", function (e) {
    DisableFields();
    ClearDateFilter();
    if ($(this).prop("checked")) {

        var id = $(this).attr("id")

        if (id == "rbMonthly") {

            $('#cboMonthly').enable(true);

        } else if (id == "rbForThePeriod") {

            $('#dtFrom').enable(true);
            $('#dtTo').enable(true);
            $('#dtFrom').val(currentDate);
            $('#dtTo').val(currentDate);
        }
        else if (id == "rbAnnual") {
            if ($('#cboAnnual').val() == "")
                $('#cboAnnual').val(currentYear);

            $('#cboAnnual').enable(true);
        }
        else if (id == "rbQuarter") {
            $('#cboQuarterly').enable(true);
        }
    }
});

function DisableFields() {

    $('.nwLeftFilter').enable(true);
    //$('.nwLeftFilter').enable(true);
    $(".nwLeftFilter input[type='text']").enable(false);
    $(".nwLeftFilter #cboMonthly").enable(false);
    $(".nwLeftFilter #cboAnnual").enable(false);
    $(".nwLeftFilter #cboQuarterly").enable(false);
}

function ClearDateFilter() {
    $("#cboMonth").val("1");
    $("#cboQuarter").val("1");

    if ($("#cboAnnual").val() == "")
        $("#cboAnnual").val(currentYear);

    $("#dtFrom").val("");
    $("#dtTo").val("");
}

$(document).on("blur", "#cboAnnual", function () {
    if ($(this).val() == "") {
        $(this).val(currentYear)
    }

    ReloadMonth()
    ReloadQuarter()
});

function ReloadMonth() {
    $('#cboMonthly').html("");
    $('#cboMonthly').append("<option value='1'>January, " + $('#cboAnnual').val() + "</option>");
    $('#cboMonthly').append("<option value='2'>February, " + $('#cboAnnual').val() + "</option>");
    $('#cboMonthly').append("<option value='3'>March, " + $('#cboAnnual').val() + "</option>");
    $('#cboMonthly').append("<option value='4'>April, " + $('#cboAnnual').val() + "</option>");
    $('#cboMonthly').append("<option value='5'>May, " + $('#cboAnnual').val() + "</option>");
    $('#cboMonthly').append("<option value='6'>June, " + $('#cboAnnual').val() + "</option>");
    $('#cboMonthly').append("<option value='7'>July, " + $('#cboAnnual').val() + "</option>");
    $('#cboMonthly').append("<option value='8'>August, " + $('#cboAnnual').val() + "</option>");
    $('#cboMonthly').append("<option value='9'>September, " + $('#cboAnnual').val() + "</option>");
    $('#cboMonthly').append("<option value='10'>October, " + $('#cboAnnual').val() + "</option>");
    $('#cboMonthly').append("<option value='11'>November, " + $('#cboAnnual').val() + "</option>");
    $('#cboMonthly').append("<option value='12'>December, " + $('#cboAnnual').val() + "</option>");
}
function ReloadQuarter() {
    $('#cboQuarterly').html("");
    $('#cboQuarterly').append("<option value='1'>1st Quarter, " + $('#cboAnnual').val() + "</option>");
    $('#cboQuarterly').append("<option value='2'>2nd Quarter, " + $('#cboAnnual').val() + "</option>");
    $('#cboQuarterly').append("<option value='3'>3rd Quarter, " + $('#cboAnnual').val() + "</option>");
    $('#cboQuarterly').append("<option value='4'>4th Quarter, " + $('#cboAnnual').val() + "</option>");
}



function leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function getDateFilter() {
    var dateFilterFrom = "";
    var dateFilterTo = "";

    if ($('#rbMonthly').prop("checked")) {

        if ($('#cboMonthly').val() == 1) {
            dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-31";
        }

        if ($('#cboMonthly').val() == 2) {

            if (leapYear($('#cboAnnual').val())) {
                dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-1";
                dateFilterTo = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-29";
            } else {
                dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-1";
                dateFilterTo = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-28";
            }
        }

        if ($('#cboMonthly').val() == 3) {
            dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-31";
        }
        if ($('#cboMonthly').val() == 4) {
            dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-30";
        }
        if ($('#cboMonthly').val() == 5) {
            dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-31";
        }
        if ($('#cboMonthly').val() == 6) {
            dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-30";
        }
        if ($('#cboMonthly').val() == 7) {
            dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-31";
        }
        if ($('#cboMonthly').val() == 8) {
            dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-31";
        }
        if ($('#cboMonthly').val() == 9) {
            dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-30";
        }
        if ($('#cboMonthly').val() == 10) {
            dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-31";
        }
        if ($('#cboMonthly').val() == 11) {
            dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-30";
        }
        if ($('#cboMonthly').val() == 12) {
            dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cboMonthly').val() + "-31";
        }
    }

    if ($('#rbAnnual').prop("checked")) {
        dateFilterFrom = $('#cboAnnual').val() + "-1-1";
        dateFilterTo = $('#cboAnnual').val() + "-12-31";
    }

    if ($('#rbQuarter').prop("checked")) {

        if ($('#cboQuarterly').val() == 1) {
            dateFilterFrom = $('#cboAnnual').val() + "-1-1";
            dateFilterTo = $('#cboAnnual').val() + "-3-31";
        }
        if ($('#cboQuarterly').val() == 2) {
            dateFilterFrom = $('#cboAnnual').val() + "-4-1";
            dateFilterTo = $('#cboAnnual').val() + "-6-30";
        }
        if ($('#cboQuarterly').val() == 3) {
            dateFilterFrom = $('#cboAnnual').val() + "-7-1";
            dateFilterTo = $('#cboAnnual').val() + "-9-30";
        }
        if ($('#cboQuarterly').val() == 4) {
            dateFilterFrom = $('#cboAnnual').val() + "-10-1";
            dateFilterTo = $('#cboAnnual').val() + "-12-31";
        }
    }

    if ($('#rbForThePeriod').prop("checked")) {
        dateFilterFrom = $('#dtFrom').val();
        dateFilterTo = $('#dtTo').val();
    }
   
    nwParameter_Add("dateFilterFrom", dateFilterFrom);
    nwParameter_Add("dateFilterTo", dateFilterTo);
    nwParameter_Add("SortBy", $("#sortBy").val());
    nwParameter_Add("SortType", $("#sortType").val());

}

$(document).on("click", ".btnGetlookup", function () {
    crnwTableCon = null; // if grid is click 

    var xtype = $(this).attr("nwtype");
    var selectedInput = xtype;
    lookUpCustomize(selectedInput, 2);

});

var serverDate = new Date();
function getAge(dateString) {

    var today = serverDate;
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age + '' == 'NaN' || age == NaN) {
        age = '';
    }

    return age;
}

function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext" nwcode="' + xvalue + '" class="nwCuz021">' + xdisplay + '<span class="classx">x</span></div>';
};

function GetAddtoListFilters() {
    var len = $('div.atlContainer').length;
    for (var i = 0; i < len; i++) {
        var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
        var xvalue = "";
        var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
        for (var j = 0; j < lencode; j++) {
            if (xvalue != "") xvalue += ",";
            xvalue += $('.atlContainer:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');
        }
        nwParameter_Add(xkey, xvalue);
    }
};

$(document).on('click', 'span.classx', function () {
    $(this).closest('div.spantext').remove();
});

function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {

    var xvalue = "";
    var xdisplay = "";

    xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

    if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
        $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
    }
}

function defaultonload(code, description) {
    $('div.atlContainer[nwtype="LocationwithAccountableForms"] div.innertext').append(GenerateLookupListDataHTML(code, description));
}

function getloadfilter() {
    var count = $('.spantext').length;
    crnwTable = $("#nwConServiceStatus .tblGridBody");
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.atl_Branch .spantext:eq(' + i + ')').text().substring(0, $('.atl_Branch .spantext:eq(' + i + ')').text().length - 1);

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

function getloadfilterexport() {
    var count = $('.spantext').length;
    crnwTable = $("#nwConServiceStatus .tblGridBody");
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

function getYearGridHeader(type) {
    switch (type) {
        case 1:
            return "As of Date: " + $('.custom-datepicker .hasDatepicker').val();
            break;
        case 2:
            if ($('#rbAnnual').prop("checked")) {
                return "For the Year " + $('#cboAnnual').val();
            }

            if ($('#rbMonthly').prop("checked")) {
                return "For the Month of " + $('#cboMonthly option:selected').text();
            }

            if ($('#rbQuarter').prop("checked")) {
                return "For the " + $('#cboQuarterly option:selected').text()
            }

            if ($('#rbForThePeriod').prop("checked")) {
                return "DATE COVERED: " + $('#dtFrom').val() + " - " + $('#dtTo').val()
            }
            break;
    }
}

var DtlsPromptName = "";
$(document).on("click", '#nwCreateButton', function (e) {
    DtlsPromptName = "CSVFile";
    MessageBoxQuestion("Do you want to download CSV file?", "Uncontracted Sales Report");
    return false;
});

$(document).on("focusout", '#dtAsofDate', function (e) {
    if ($('#dtAsofDate').val() == "") {
        $('#dtAsofDate').val(currentDate)
    }
});

//function serverClick() {
//    document.getElementById("nwCreateButton2").click(); // Click on the checkbox
//}

//$(document).on("change blur", "#dtFrom, #dtTo", function (e) {
//    var from = $('#dtFrom').val();
//    var To = $('#dtTo').val();

//    if (Date.parse(from) > Date.parse(To)) {
//        MessageBox("Date from should not be later than the Date To.");
//        $('#dtFrom').val(getCurrentDate());
//        $('#dtTo').val(getCurrentDate());
//    }
//    return false;
//});

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

//$(document).on("change", '#dtFrom', function (e) {
//    var dtfrom = $('#dtFrom').val();
//    var dtto = $('#dtTo').val();
//    nwParameter_Add("dtFrom", dtfrom);
//    nwParameter_Add("dtTo", dtto);
//    func_ActionDriven("actSetperiodBeg", false);
//    return false;
//});

//$(document).on("change", '#dtTo', function (e) {
//    var dtfrom = $('#dtFrom').val();
//    var dtto = $('#dtTo').val();
//    nwParameter_Add("dtFrom", dtfrom);
//    nwParameter_Add("dtTo", dtto);
//    func_ActionDriven("actSetperiodBeg", false);
//    return false;
//});


function setalign() {
    $('#nwGridView-nwData tbody td:nth-child(20)').css("text-align", "right")
    $('#nwGridView-nwData tbody td:nth-child(21)').css("text-align", "right")

    $('#nwGridView-nwData tbody td:nth-child(22)').css("text-align", "right")
    $('#nwGridView-nwData tbody td:nth-child(23)').css("text-align", "right")

    $('#nwGridView-nwData tbody td:nth-child(28)').css("text-align", "right")
    $('#nwGridView-nwData tbody td:nth-child(29)').css("text-align", "right")
}

$(document).on("click","#radioDetailed, #radioInvoice, #radioSupplier",function(){
    if ($(this).attr("id") == "radioSupplier" || $(this).attr("id") == "radioInvoice") {
		$('#checkFullyPaid').enable(false);
		$('#checkFullyPaid').prop("checked",false);
    }else{
		$('#checkFullyPaid').enable(true);
    }
    nwLoading_Start("actRefreshGrid", crLoadingHTML);
    cust_GetPara();
    func_ActionDriven('actRefreshGrid', false);
});

var isCallInMenuItem = '';

function Message_OkF() {
    if (isCallInMenuItem == "1") {
        nwLoading_Start("xLoading", crLoadingHTML);
        func_ActionDriven("actInitialData", false);
    }
}