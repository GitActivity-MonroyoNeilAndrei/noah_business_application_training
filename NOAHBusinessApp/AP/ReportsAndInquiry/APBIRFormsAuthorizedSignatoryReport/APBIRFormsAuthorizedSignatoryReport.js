var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

var serverDate = new Date();
var nwDocno = '';
var menuTitle = 'BIR Forms Authorized Signatory Report';
var CurrentDate = new Date();
var currentYear = "";

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
    crLnk = GetCurrentURL() + "APBIRFormsAuthorizedSignatoryReport_Gateway";
    crLnkGateKey = "APBIRFormsAuthorizedSignatoryReport";

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    $("#settingstabs").loadAddtoList({ list: ["Location", "Signatory", "Designation"], icon: true });
    ClearFields();
    DisableFields();

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


function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;

    nwLoading_Start(`xRefreshBtn`, crLoadingHTML);
    cust_GetPara();
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);

    isRefreshed = true;
    return isContinue;
}


function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    isContinue = false;
    fn_ExportGrid("nwGridMainCon");
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
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("xactBindCollection", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}

///////////////////////////////////////

function func_LookUpInitialize(lookupName) {
    cust_GetPara();
}


function EnableFields() {

    ClearFields();
    ReloadQuarter();
    ReloadMonth();

    $('#cboMonthly').enable(true);
    $('#rbMonthly').prop('checked', true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
}

function EnableFieldsDone() {//Binding Done
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
}

function DisableFieldsEmpty() {
    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
}

function ClearFields() {
    ClearDateFilter();
    $('.spantext').remove();
    $('#cboMonthly').enable(true);
    $('#txtAnually').enable(false);
    $('#cboQuarterly').enable(true);
    $('#dtFrom').enable(false);
    $('#dtTo').enable(false);
    $('#cboQuarterly').enable(false);

    var currentYear = new Date().getFullYear();
    $('#txtAnually').val(currentYear);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

function msgBoxContainerQuestionF(id, answer) {
}

/******** CHANGE EVENTS ********/
$(document).on("change", "input[name='dateFilter']", function (e) {
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
            $('#dtFrom').val(CurrentDate);
            $('#dtTo').val(CurrentDate);
            $('#cboMonthly').enable(false);
            $('#txtAnually').enable(false);
            $('#cboQuarterly').enable(false);
            $('#dtFrom').enable(true);
            $('#dtTo').enable(true);
        }
        else if (id == "rbAnnual") {
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


});



function DisableFields() {
    ReloadQuarter();
    ReloadMonth();

    $('#cboMonthly').enable(true);
    $('#rbMonthly').prop('checked', true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
}

function ClearDateFilter() {
    $("#cboMonth").val("01");
    $("#cboQuarter").val("01");

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

function cuz_new() {
    ReloadQuarter();
    ReloadMonth();
    setToCurrentDate();

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

function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext" nwcode="' + xvalue + '" class="nwCuz024">' + xdisplay + '<span class="classx">x</span></div>';
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
    $('div.atlContainer[nwtype="Location"] div.innertext').append(GenerateLookupListDataHTML(code, description));
}


function DateToValidation() {
    var errormsg = '';
    if ($('#rbForThePeriod').prop("checked")) {
        if ($('#dtFrom').val() == '') {
            errormsg += "Cannot proceed. Date Covered: From is required.\n";
        }

        if ($('#dtTo').val() == '') {
            errormsg += "Cannot proceed. Date Covered: To is required.\n";
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


function serverClick() {
    document.getElementById("nwCreateButton2").click(); // Click on the checkbox
}


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
