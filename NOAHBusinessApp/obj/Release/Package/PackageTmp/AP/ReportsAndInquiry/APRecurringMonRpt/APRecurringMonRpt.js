var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

var serverDate = new Date();
var nwDocno = '';
var menuTitle = '';
var currentDate = "";
var currentYear = "";
var firstDay = "";
var lastDat = "";
var lblCC = "";

var startIndex = 0,
    SPR_SUM_PRFNO = ++startIndex,
    SPR_SUM_APVNO = ++startIndex,
    SPR_SUM_POSTINGDATE = ++startIndex,
    SPR_SUM_VENDORCODE = ++startIndex,
    SPR_SUM_VENDORNAME = ++startIndex,
    SPR_SUM_APVREMARKS = ++startIndex,
    SPR_SUM_RECURAMT = ++startIndex,
    SPR_SUM_NEXTRECURDATE = ++startIndex,
    SPR_SUM_NOREMPERIOD = ++startIndex,
    SPR_SUM_ENDRECURDATE = ++startIndex,
    SPR_SUM_VIEWENTRYSCREEN = ++startIndex,
    SPR_SUM_VIEWFORM = ++startIndex,
    SPR_SUM_NOPERIODRECUR = ++startIndex,
    SPR_SUM_LASTRECURDATE = ++startIndex,
    SPR_SUM_TOTALAMTRECUR = ++startIndex,
    SPR_SUM_REMNOPERIOD = ++startIndex;

function func_Reload() {

    crLnk = GetCurrentURL() + "APRecurringMonRpt_Gateway";
    crLnkGateKey = "APRecurringMonRpt";

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    $("#settingstabs").loadAddtoList({ list: ["Recurring: PRF No.", "Recurring: APV No.", "Vendor/Payee", "Created By"], icon: true });
    DateFormat();// checkcolor
    nwPopupForm_Create("nwViewAllocDtls", true);
    nwPopupForm_Create("nwDocumentInquiry");
    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    $("#noah-webui-Toolbox").bindingExport().enable(false);

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

    if ($('#rbForThePeriod').prop("checked")) {
        let msg = "";
        if ($("#dtFrom").val() == "")
            msg += "For the Period: From is required.";

        if (msg != "") {
            setTimeout(function () {
                MessageBox(msg, menuTitle, "error");
                return;
            }, 100);
        }
    }

    cust_GetPara();
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    nwLoading_Start(`xRefreshBtn`, crLoadingHTML);

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
    isContinue = false;
    getloadfilterexport();
    fn_ExportGrid("nwGridMainCon");
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
    nwParameter_Add("dtpAsOfDate", $("#dtpAsOfDate").val());
    nwParameter_Add("rbSummary", $("#rbSummary").prop("checked"));
    getloadfilterexport();
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("xSample", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}


function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xSample", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}


///////////////////////////////////////

function func_LookUpInitialize(lookupName) {
    cust_GetPara();
}

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {

}

function getGridData(idnum, index) {
    var data = $(`#menuCreatorContainer .tablecontainter table tr:eq(${idnum
    })`).find(`td:eq(${index
    })`).text();
    return data;
}

function getloadfilterexport() {
    var count = $('.spantext').length;
    crnwTable = $("#nwConAcctSeg .tblGridBody");
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.atl_Location .spantext:eq(' + i + ')').text().substring(0, $('.atl_Location .spantext:eq(' + i + ')').text().length - 1);

        if (loc.length > 0) {
            allloc += loc + "|";
        }
    }
    allloc = allloc.substring(0, allloc.length - 1)
    if (allloc.length == 0) {
        nwParameter_Add("LocationFilter", "MULTIPLE LOCATION (See Footnote)");
    } else {
        nwParameter_Add("LocationFilter", allloc);
    }
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
    $('.RightFilterHeader').html("");
    $('#nwGridFilterCon td').html("&nbsp;");
    DisableFields();
    ClearDateFilter();
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

$(function () {
    $("#settingstabs").tabs();
});

function DateFormat() {
    $('.custom-datepicker').datepicker({ maxDate: '0' });
}

function window_close(window) {
    nwPopupForm_HideModal(window);
}

function msgBoxContainerQuestionF(id, answer) {
    if (answer == "Yes") {
        if (DtlsPromptName == "CSVFile") {
            cust_GetPara();
            nwLoading_Start("xSample", crLoadingHTML);
            nwLoading_Start("xGenerateTxt", crLoadingHTML);
            nwParameter_Add_Table('nwGridMainCon');
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

            $('#cboMonthly').prop("disabled", false);

        } else if (id == "rbForThePeriod") {

            $('#dtFrom').enable(true);
            $('#dtTo').enable(true);
            $('#dtFrom').val(currentDate);
            $('#dtTo').val(currentDate);
        }
        else if (id == "rbAnnual") {
            if ($('#cboAnnual').val() == "")
                $('#cboAnnual').val(currentYear);

            $('#cboAnnual').prop("disabled", false);
        }
        else if (id == "rbQuarter") {
            $('#cboQuarterly').prop("disabled", false);
        }
    }
});

function DisableFields() {

    $('.nwLeftFilter').enable(true);
    //$('.nwLeftFilter').enable(true);
    $(".nwLeftFilter input[type='text']").prop("disabled", true);
    $(".nwLeftFilter #cboMonthly").prop("disabled", true);
    $(".nwLeftFilter #cboAnnual").prop("disabled", true);
    $(".nwLeftFilter #cboQuarterly").prop("disabled", true);
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
    nwParameter_Add("SortType", $("#sortType").val());

}

$(document).on("change", "#dtFrom", function (e) {
    if ($(this).val() == "") {
        $('#dtTo').val("")
        return;
    }

    //if($(this).val() > $('#txtDateTo').val())
    //    $('#txtDateTo').val($(this).val())
    var DateFrom = new Date($(this).val())
    var DateTo = new Date($('#dtTo').val())
    if (DateFrom > DateTo) {
        $(this).val("");
        MessageBox("For the Period: From must not be later the For the Period: To.", menuTitle, "error")//$('#dtTo').val($(this).val())
    }
});

$(document).on("click", ".btnGetlookup", function () {
    crnwTableCon = null; // if grid is click 

    var xtype = $(this).attr("nwtype");
    var selectedInput = xtype;

    cust_GetPara();
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
    if ($("#settingstabsBut-3").hasClass("ui-state-active")) {
        xdisplay = xvalue;
    }
    else if ($("#settingstabsBut-4").hasClass("ui-state-active")) {
        xdisplay = xvalue;
    }
    else if ($("#settingstabsBut-5").hasClass("ui-state-active")) {
        xdisplay = xvalue;
    }

    return '<div class="spantext" nwcode="' + xvalue + '" class="nwCuz024">' + xdisplay + '<span class="classx">x</span></div>';
};

function GetAddtoListFilters() {
    var len = $('div.atlContainer').length;
    for (var i = 0; i < len; i++) {
        var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
        var xvalue = "";
        var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
        for (var j = 0; j < lencode; j++) {
            if (xvalue != "") xvalue += "','";
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

    if (verID == 'RecurringPRFNo' || verID == 'RecurringAPVNo') {
        if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
            $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xvalue));
        }
    }
    else {
        if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
            $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
        }
    }
}

function defaultonload(code, description) {
    $('div.atlContainer[nwtype="lugPOLocation"] div.innertext').append(GenerateLookupListDataHTML(code, description));
}

//Row 5 for Refresh
function getloadfilter() {
    var count = $('.spantext').length;
    crnwTable = $("#nwGridMainCon .tblGridBody");
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.atl_Location .spantext:eq(' + i + ')').text().substring(0, $('.atl_Location .spantext:eq(' + i + ')').text().length - 1);

        if (loc.length > 0) {
            allloc += loc + "; ";
        }
    }
    allloc = allloc.substring(0, allloc.length - 1);
    allloc = allloc.slice(0, -1);
    if (allloc.length == 0) {
        allloc = "Multiple Locations(See Footnote)";
    }
    crnwTable.find("tr:eq(4)").find('td:eq(1) ').text('LOCATION NAME: ' + allloc);
}


//Row 7 for Date Filter
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
    MessageBoxQuestion("Do you want to download CSV file?", "Daily Collection Report");

    return false;
});

function serverClick() {
    document.getElementById("nwCreateButton2").click(); // Click on the checkbox
}

$(document).on('click', '.btnAllocDetails', function (e) {

    return false;


    var loc = crnwTR.find("td:eq(" + SPR_LOCATION + ")").text();
    var subloc = crnwTR.find("td:eq(" + SPR_SUBLOCATION + ")").text();
    var projbudg = crnwTR.find("td:eq(" + SPR_PROJBUDJITEM + ")").text();
    var item = crnwTR.find("td:eq(" + SPR_ITEMCODE + ")").text();

    var allc = crnwTR.find("td:eq(" + SPR_ALLOCQTY + ")").text();
    var forpr = crnwTR.find("td:eq(" + SPR_FORPR + ")").text();

    $('#txtLocation').val(loc);
    $('#txtSubLocation').val(subloc);
    $('#txtProjBudgItem').val(projbudg);
    $('#txtItem').val(item);
    $('#txtTtlRemQty').val('0.00');
    $('#txtTtlAllocStks').val(allc);
    $('#txtForPR').val(forpr);



    nwPopupForm_ShowModal("nwViewAllocDtls");
    func_ActionDriven("actViewAllocDtls", false);
});


$(document).on("click", ".btnReviewAttach", function () {
    nwLoading_Start("xbtnVwAttach", crLoadingHTML);

    var docno = crnwTR.find("td:eq(" + SPR_RRNO + ")").text();

    if (docno.length > 0) {
        var fullength = "";
        var title = "";

        nwParameter_Add("urlPath", window.location.origin);

        title = "Review Attachment(s)";
        fullength = "DC/DataSetup/DCViewAttachment/DCViewAttachment?isView=true&nwDocno=" + encodeURI(docno);
        $('.nwmenuFrame').attr("src", fullength);

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "98%" });
        $("#nwPopWindow").css({ "min-height": "98%" });
        nwPopupForm_ShowModal("nwPopWindow");
        $('.dimbgNWnwPopWindow').removeClass('openn');
    }

    nwLoading_End('xbtnVwAttach');
});

function p8Spread_Click(canvasID, row, col) {
    console.log("p8Spread_Click " + canvasID + " " + row + " " + col);

    $('#txtCanvasClick').text(canvasID);
    $('#txtRowClick').text(row);
    $('#txtColumnClick').text(col);

    if (row >= 10) {
        //if (nwGridMainCon_Book.ActiveSheet.GetEnabled(col, row)) {
        //    if (nwGridMainCon_Book.ActiveSheet.GetBackground(col, row) == "green") {
        if ($('#rbSummary').is(':checked')) {
            if (col == SPR_SUM_VIEWENTRYSCREEN - 1) {
                ViewPRFScreen(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_SUM_PRFNO - 1, row));
            }
            if (col == SPR_SUM_VIEWFORM - 1) {
                ViewPRFForm(nwGridMainCon_Book.ActiveSheet.GetValue(SPR_SUM_PRFNO - 1, row));
            }
        }
        //}
        //}
    }
}

function ViewPRFScreen(docno) {
    nwLoading_Start("xbtnDtls", crLoadingHTML);
    var fullength = "";
    var title = "";

    if (docno.length > 0) {
        nwParameter_Add("urlPath", window.location.origin);

        title = "Payment Request Entry";
        fullength = GetCurrentURL() + "../APPaymentRequestEntry?nwDocno=" + encodeURI(docno);
        $('.nwmenuFrame').attr("src", fullength);

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "98%" });
        $("#nwPopWindow").css({ "min-height": "98%" });
        nwPopupForm_ShowModal("nwPopWindow");
        $('.dimbgNWnwPopWindow').removeClass('openn');
    }
    nwLoading_End('xbtnDtls');
}

function ViewPRFForm(docno) {
    nwLoading_Start("xbtnVwForms", crLoadingHTML);
    nwParameter_Add("docno", docno);
    func_ActionDriven("actViewForms", false);
}