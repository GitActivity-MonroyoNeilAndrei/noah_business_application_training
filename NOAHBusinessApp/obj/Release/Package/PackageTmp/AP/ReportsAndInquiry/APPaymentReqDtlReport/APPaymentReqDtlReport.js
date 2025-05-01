var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

var serverDate = new Date();
var nwDocno = '';
var menuTitle = 'Payment Request Detailed Report';
var currentDate = "";
var currentYear = "";
var firstDay = "";
var lastDat = "";
var lblCC = "";

let
SPR_STARTINDEX = 0,
SPR_PAYMENTREQUESTNO = ++SPR_STARTINDEX,
SPR_APVNO = ++SPR_STARTINDEX,
SPR_POSTINGDATE = ++SPR_STARTINDEX,
SPR_REFERENCENO = ++SPR_STARTINDEX,
SPR_REFERENCEDATE = ++SPR_STARTINDEX,
SPR_DRCOCNO = ++SPR_STARTINDEX,
SPR_DRCOCDATE = ++SPR_STARTINDEX,
SPR_PAYEECODE = ++SPR_STARTINDEX,
SPR_PAYEENAME = ++SPR_STARTINDEX,
SPR_CURRENCY = ++SPR_STARTINDEX,
SPR_PRFREMARKS = ++SPR_STARTINDEX,
SPR_APVPARTICULARS = ++SPR_STARTINDEX,
SPR_ITEMGROUPTYPECODE = ++SPR_STARTINDEX,
SPR_ITEMGROUPTYPEDESC = ++SPR_STARTINDEX,
SPR_ITEMCODE = ++SPR_STARTINDEX,
SPR_ITEMDESC = ++SPR_STARTINDEX,
SPR_UOM = ++SPR_STARTINDEX,
SPR_QTY = ++SPR_STARTINDEX,
SPR_UNITCOSTVATIN = ++SPR_STARTINDEX,
SPR_UNITCOSTVATEX = ++SPR_STARTINDEX,
SPR_OCYAMOUNTVATIN = ++SPR_STARTINDEX,
SPR_OCYAMOUNTVATEX = ++SPR_STARTINDEX,
SPR_VAT = ++SPR_STARTINDEX,
SPR_EWT = ++SPR_STARTINDEX,
SPR_TOTALAMOUNT = ++SPR_STARTINDEX,
SPR_TAXDESCVAT = ++SPR_STARTINDEX,
SPR_TAXDESCEWT = ++SPR_STARTINDEX,
SPR_ACCOUNTDESCRIPTION = ++SPR_STARTINDEX,
SPR_SEG1 = ++SPR_STARTINDEX,
SPR_SEG2 = ++SPR_STARTINDEX,
SPR_SEG3 = ++SPR_STARTINDEX,
SPR_SEG4 = ++SPR_STARTINDEX,
SPR_SEG5 = ++SPR_STARTINDEX,
SPR_SEG6 = ++SPR_STARTINDEX,
SPR_OTHERREFERENCENO = ++SPR_STARTINDEX,
SPR_OTHERREFERENCEDATE = ++SPR_STARTINDEX,
SPR_REMARKSPERLINEITEM = ++SPR_STARTINDEX,
SPR_CONSUMPTION = ++SPR_STARTINDEX;

function func_Reload() {
    crLnk = GetCurrentURL() + "APPaymentReqDtlReport_Gateway";
    crLnkGateKey = "APPaymentReqDtlReport";
    //crnwTagSingleBind = true;

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    $("#settingstabs").loadAddtoList({ list: ["Location", "Payee", "Payment Request No.", "APV No.", "Reference No."], icon: true });
    DateFormat();// checkcolor
    nwPopupForm_Create("nwViewAllocDtls", true);
    nwPopupForm_Create("nwDocumentInquiry");
    //$('#txtAnually').mask('9999');

    $('#cboMonthly').enable(true);
    $('#txtAnually').enable(false);
    $('#cboQuarterly').enable(true);
    $('#dtFrom').enable(false);
    $('#dtTo').enable(false);
    $('#cboQuarterly').enable(false);
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

    //if ($('#rbForThePeriod').prop("checked")) {
    //    let msg = "";
    //    if ($("#dtFrom").val() == "")
    //        msg += "For the Period: From is required.";

    //    if (msg != "") {
    //        setTimeout(function () {
    //            MessageBox(msg, menuTitle, "error");
    //            return;
    //        }, 100);
    //    }
    //}


    var errormsg = '';
    if ($('#rbForThePeriod').prop("checked")) {
        if ($('#dtFrom').val() == '') {
            errormsg += "Cannot proceed. Date Covered: From is required.\n";
            //MessageBox("Cannot be continued. Date Covered: To is required.", menuTitle, "error");
        }

        if ($('#dtTo').val() == '') {
            errormsg += "Cannot proceed. Date Covered: To is required.\n";
            //MessageBox("Cannot be continued. Date Covered: To is required.", menuTitle, "error");
        }

        if (errormsg != "") {
            MessageBox(errormsg, menuTitle, "error");
            isContinue = false;
            return isContinue;
        }
    }
    nwLoading_Start(`xRefreshBtn`, crLoadingHTML);
    cust_GetPara();
    $("#noah-webui-Toolbox").bindingExport().enable(true);


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
    nwParameter_Add("DateGridHeader", getYearGridHeader(2));
    nwParameter_Add("rbPCCA", $("#rbPCCA").prop("checked"));
    nwParameter_Add("rbForThePeriod", $("#rbForThePeriod").prop("checked"));
    nwParameter_Add("dtFrom", 'dtFrom');
    nwParameter_Add("dtTo", 'dtTo');
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
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.atl_Location .spantext:eq(' + i + ')').text().substring(0, $('.spantext:eq(' + i + ')').text().length - 1);

        if (loc.length > 0) {
            allloc += loc + ";";
        }
    }
    allloc = allloc.substring(0, allloc.length - 1)
    if (allloc.length == 0) {
        //nwParameter_Add("LocationFilter", "Multiple Locations");
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
            nwParameter_Add_Table('nwGridCon');
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
    //DisableFields();
    //ClearDateFilter();
    //if ($(this).prop("checked")) {

    //    var id = $(this).attr("id")

    //    if (id == "rbMonthly") {

    //        $('#cboMonthly').prop("disabled", false);

    //    } else if (id == "rbForThePeriod") {

    //        $('#dtFrom').enable(true);
    //        $('#dtTo').enable(true);
    //        $('#dtFrom').val(currentDate);
    //        $('#dtTo').val(currentDate);
    //    }
    //    else if (id == "rbAnnual") {
    //        if ($('#txtAnually').val() == "")
    //            $('#txtAnually').val(currentYear);

    //        $('#txtAnually').prop("disabled", false);
    //    }
    //    else if (id == "rbQuarter") {
    //        $('#cboQuarterly').prop("disabled", false);
    //    }
    //}

    if ($(this).prop("checked")) {
        var id = $(this).attr("id")

        if (id == "rbMonthly") {
            $('#txtCurrentDate').val('')
            $('#cboMonthly').enable(true);
            $('#txtAnually').enable(false);
            $('#cboQuarterly').enable(true);
            $('#dtFrom').enable(false);
            $('#dtTo').enable(false);
            $('#cboQuarterly').enable(false);

            $('#txtCurrentDate').val('')

        } else if (id == "rbForThePeriod") {
            $('#dtFrom').val(currentDate);
            $('#dtTo').val(currentDate);
            $('#cboMonthly').enable(false);
            $('#txtAnually').enable(false);
            $('#cboQuarterly').enable(false);
            $('#dtFrom').enable(true);
            $('#dtTo').enable(true);
        }
        else if (id == "rbAnnual") {
            if ($('#txtAnually').val() == "")
                $('#cboMonthly').enable(false);
            $('#cboQuarterly').enable(false);
            $('#cboMonthly').enable(false);
            $('#txtAnually').enable(true);
        }
        else if (id == "rbQuarter") {
            $('#cboMonthly').enable(false);
            $('#txtAnually').enable(false);
            $('#cboQuarterly').enable(true);
        }
        else if (id == "rbForThePeriod") {
            getDate();
            $('#dtFrom').enable(false);
            $('#dtTo').enable(false);
        }
        else if (id == "radioForthePeriod") {

        }


    }

    function ClearDateFilter() {
        $("#cboMonthly").val("1");
        $("#cboQuarterly").val("1");

        if ($("#txtAnually").val() == "")
            $("#txtAnually").val(currentYear);

        $("#dtFrom").val("");
        $("#dtTo").val("");
    }
});

function DisableFields() {

    $('.nwLeftFilter').enable(true);
    //$('.nwLeftFilter').enable(true);
    $(".nwLeftFilter input[type='text']").prop("disabled", true);
    $(".nwLeftFilter #cboMonthly").prop("disabled", true);
    $(".nwLeftFilter #txtAnually").prop("disabled", true);
    $(".nwLeftFilter #cboQuarterly").prop("disabled", true);
}

function ClearDateFilter() {
    $("#cboMonth").val("1");
    $("#cboQuarter").val("1");

    if ($("#txtAnually").val() == "")
        $("#txtAnually").val(currentYear);

    $("#dtFrom").val("");
    $("#dtTo").val("");
}

$(document).on("blur", "#txtAnually", function () {
    if ($(this).val() == "") {
        $(this).val(currentYear)
    }

    ReloadMonth()
    ReloadQuarter()
});
function ReloadMonth() {
    $('#cboMonthly').html("");
    $('#cboMonthly').append("<option value='01'>January, " + $('#txtAnually').val() + "</option>");
    $('#cboMonthly').append("<option value='02'>February, " + $('#txtAnually').val() + "</option>");
    $('#cboMonthly').append("<option value='03'>March, " + $('#txtAnually').val() + "</option>");
    $('#cboMonthly').append("<option value='04'>April, " + $('#txtAnually').val() + "</option>");
    $('#cboMonthly').append("<option value='05'>May, " + $('#txtAnually').val() + "</option>");
    $('#cboMonthly').append("<option value='06'>June, " + $('#txtAnually').val() + "</option>");
    $('#cboMonthly').append("<option value='07'>July, " + $('#txtAnually').val() + "</option>");
    $('#cboMonthly').append("<option value='08'>August, " + $('#txtAnually').val() + "</option>");
    $('#cboMonthly').append("<option value='09'>September, " + $('#txtAnually').val() + "</option>");
    $('#cboMonthly').append("<option value='10'>October, " + $('#txtAnually').val() + "</option>");
    $('#cboMonthly').append("<option value='11'>November, " + $('#txtAnually').val() + "</option>");
    $('#cboMonthly').append("<option value='12'>December, " + $('#txtAnually').val() + "</option>");
}
function ReloadQuarter() {
    $('#cboQuarterly').html("");
    $('#cboQuarterly').append("<option value='1'>1st Quarter, " + $('#txtAnually').val() + "</option>");
    $('#cboQuarterly').append("<option value='2'>2nd Quarter, " + $('#txtAnually').val() + "</option>");
    $('#cboQuarterly').append("<option value='3'>3rd Quarter, " + $('#txtAnually').val() + "</option>");
    $('#cboQuarterly').append("<option value='4'>4th Quarter, " + $('#txtAnually').val() + "</option>");
}


function leapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function getDateFilter() {
    var dateFilterFrom = "";
    var dateFilterTo = "";

    if ($('#rbMonthly').prop("checked")) {

        if ($('#cboMonthly').val() == 1) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-31";
        }

        if ($('#cboMonthly').val() == 2) {

            if (leapYear($('#txtAnually').val())) {
                dateFilterFrom = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-1";
                dateFilterTo = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-29";
            } else {
                dateFilterFrom = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-1";
                dateFilterTo = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-28";
            }
        }

        if ($('#cboMonthly').val() == 3) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-31";
        }
        if ($('#cboMonthly').val() == 4) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-30";
        }
        if ($('#cboMonthly').val() == 5) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-31";
        }
        if ($('#cboMonthly').val() == 6) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-30";
        }
        if ($('#cboMonthly').val() == 7) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-31";
        }
        if ($('#cboMonthly').val() == 8) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-31";
        }
        if ($('#cboMonthly').val() == 9) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-30";
        }
        if ($('#cboMonthly').val() == 10) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-31";
        }
        if ($('#cboMonthly').val() == 11) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-30";
        }
        if ($('#cboMonthly').val() == 12) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cboMonthly').val() + "-31";
        }
    }

    if ($('#rbAnnual').prop("checked")) {
        dateFilterFrom = $('#txtAnually').val() + "-1-1";
        dateFilterTo = $('#txtAnually').val() + "-12-31";
    }

    if ($('#rbQuarter').prop("checked")) {

        if ($('#cboQuarterly').val() == 1) {
            dateFilterFrom = $('#txtAnually').val() + "-1-1";
            dateFilterTo = $('#txtAnually').val() + "-3-31";
        }
        if ($('#cboQuarterly').val() == 2) {
            dateFilterFrom = $('#txtAnually').val() + "-4-1";
            dateFilterTo = $('#txtAnually').val() + "-6-30";
        }
        if ($('#cboQuarterly').val() == 3) {
            dateFilterFrom = $('#txtAnually').val() + "-7-1";
            dateFilterTo = $('#txtAnually').val() + "-9-30";
        }
        if ($('#cboQuarterly').val() == 4) {
            dateFilterFrom = $('#txtAnually').val() + "-10-1";
            dateFilterTo = $('#txtAnually').val() + "-12-31";
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

    //if($(this).val() > $('#dtTo').val())
    //    $('#dtTo').val($(this).val())
    var DateFrom = new Date($(this).val())
    var DateTo = new Date($('#dtTo').val())
    if (DateFrom > DateTo) {
        $(this).val("");
        MessageBox("Cannot proceed. Date Covered: From must not be later than Date Covered: To.", menuTitle, "error")//$('#dtTo').val($(this).val())
    }
});


$(document).on("change", "#dtTo", function (e) {
    if ($(this).val() == "") {
        $('#dtFrom').val("")
        return;
    }

    //if($(this).val() > $('#dtTo').val())
    //    $('#dtTo').val($(this).val())
    var DateFrom = new Date($(this).val())
    var DateTo = new Date($('#dtFrom').val())
    if (DateTo > DateFrom) {
        $(this).val("");
        MessageBox("Cannot proceed. Date Covered: To must not be earlier than Date Covered: From.", menuTitle, "error")//$('#dtTo').val($(this).val())
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
    $('div.atlContainer[nwtype="lugPOLocation"] div.innertext').append(GenerateLookupListDataHTML(code, description));
}

//Row 5 for Refresh
function getloadfilter() {
    var count = $('.spantext').length;
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.atl_Location .spantext:eq(' + i + ')').text().substring(0, $('.spantext:eq(' + i + ')').text().length - 1);

        if (loc.length > 0) {
            allloc += loc + ";";
        }
    }
    allloc = allloc.substring(0, allloc.length - 1)
    if (allloc.length == 0) {
        //nwParameter_Add("LocationFilter", "Multiple Locations");
    } else {
        nwParameter_Add("LocationFilter", allloc);
    }
}

function DateToValidation() {
    var errormsg = '';
    if ($('#rbForThePeriod').prop("checked")) {
        if ($('#dtFrom').val() == '') {
            errormsg += "Cannot proceed. Date Covered: From is required.\n";
            //MessageBox("Cannot be continued. Date Covered: To is required.", menuTitle, "error");
        }

        if ($('#dtTo').val() == '') {
            errormsg += "Cannot proceed. Date Covered: To is required.\n";
            //MessageBox("Cannot be continued. Date Covered: To is required.", menuTitle, "error");
        }

        if (errormsg != "") {
            MessageBox(errormsg, menuTitle, "error");
            return;
        }
    }
}

//Row 7 for Date Filter
function getYearGridHeader(type) {
    switch (type) {
        case 1:
            return "As of Date: " + $('.custom-datepicker .hasDatepicker').val();
            break;
        case 2:
            if ($('#rbAnnual').prop("checked")) {
                return "For the Year " + $('#txtAnually').val();
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
        fullength = "../../../DC/DataSetup/DCViewAttachment/DCViewAttachment.aspx?isView=true&nwDocno=" + encodeURI(docno);
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

function setToCurrentDate() {

    let xArr = CurrentDate.split("/")

    let month = xArr[0];
    let year = xArr[2];


    $('#cboMonthly').val(month);
    $('#txtAnually').val(year);

    if (month == 1 || month == 2 || month == 3) {
        $('#cboQuarterly').val(1);
    } else if (month == 4 || month == 5 || month == 6) {
        $('#cboQuarterly').val(2);
    } else if (month == 7 || month == 8 || month == 9) {
        $('#cboQuarterly').val(3);
    } else if (month == 10 || month == 11 || month == 12) {
        $('#cboQuarterly').val(4);
    }

}

$(document).on("change", "#txtAnually", function () {
    if ($(this).val().length < 4 || $(this).val().length > 4) {
        $(this).val("");
        return false;
    }
});
