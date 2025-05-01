var nwDocno = '';
var menuTitle = 'Budget Availability Report';
var currentDate = "";
var currentYear = "";
var currMonth = "";

var static
SPR_INDEX = 1,
SPR_PRDOCNO = SPR_INDEX,
SPR_ITEMGROUPTYPECODE = ++SPR_INDEX,
SPR_ITEMGROUPTYPEDESC = ++SPR_INDEX,
SPR_PRDATE = ++SPR_INDEX,
SPR_DETAILSBTN = ++SPR_INDEX,
SPR_REVIEWATTACHBTN = ++SPR_INDEX,
SPR_PRTAGGING = ++SPR_INDEX,
SPR_ASSTOCODE = ++SPR_INDEX,
SPR_EMPNAME = ++SPR_INDEX,
SPR_PODUEDATE = ++SPR_INDEX,
SPR_RMARKSBYOFFICER = ++SPR_INDEX,
SPR_ASSDATE = ++SPR_INDEX,
SPR_ASSBY = ++SPR_INDEX,
SPR_LOCCODE = ++SPR_INDEX,
SPR_LOCDESC = ++SPR_INDEX,
SPR_COSTCODE = ++SPR_INDEX,
SPR_COSTDESC = ++SPR_INDEX,
SPR_REQNAME = ++SPR_INDEX,
SPR_REQOBJ = ++SPR_INDEX,
SPR_REFREQDOC = ++SPR_INDEX,
SPR_REASSSGNTHIST = ++SPR_INDEX,
SPR_HASREVIEW = ++SPR_INDEX,
SPR_HASREASSIGNHIST = ++SPR_INDEX,
SPR_LAST_INDEX = SPR_INDEX;

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;
var selectFrom = true;
var jsonSegment = [];

function func_Reload() {
    
    crLnk = GetCurrentURL() + "ADBBdgtAvailabilityRpt_Gateway";
    crLnkGateKey = "ADBBdgtAvailabilityRpt";
    var isContinue = true;
    $("#settingstabs").loadAddtoList({
        list: ["SBU", "Seg1", "Seg2", "Seg3", "Seg4", "Seg5", "Seg6", "Item Group Type", "Item Level", "Item"], icon: true
    });
 
    nwPopupForm_Create("nwReassignmentHistory", true);


    $('#isSegmen1').prop('checked', true);
    $('#isSegmen1').enable(false);



    cust_GetPara();
 
    setDefaults();
    init_request();
    ToolBoxGetData = false;
    disableBtn();
    return isContinue;
}

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    resetFilter();
    $('#nwGridView').enable(true)
    $("#noah-webui-Toolbox").bindingExport().enable(true);
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
    
    getloadfilterexport();
    nwLoading_Start(`xRefreshBtn`, crLoadingHTML);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
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
    isContinue = false;
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
    GetAddtoListFilters();
    GetAddtoListFilters_Desc();
    nwParameter_Add("isPerCostCenter", $('#isPerCostCenter').is(':checked'));
    nwParameter_Add("isAllCostCenter", $('#isAllCostCenter').is(':checked'));

    nwParameter_Add("isAnnual", $('#isAnnual').is(':checked'));
    nwParameter_Add("txtBdgtYear", $('#txtBdgtYear').val());
    nwParameter_Add("isMonthly", $('#isMonthly').is(':checked'));
    nwParameter_Add("txtFrom", $('#txtFrom').val());
    nwParameter_Add("txtTo", $('#txtTo').val());

    nwParameter_Add("isSegmen1", $('#isSegmen1').is(':checked'));
    nwParameter_Add("isSegmen2", $('#isSegmen2').is(':checked'));
    nwParameter_Add("isSegmen3", $('#isSegmen3').is(':checked'));
    nwParameter_Add("isSegmen4", $('#isSegmen4').is(':checked'));
    nwParameter_Add("isSegmen5", $('#isSegmen5').is(':checked'));
    nwParameter_Add("isSegmen6", $('#isSegmen6').is(':checked'));

    nwParameter_Add("isItemGrpType", $('#isItemGrpType').is(':checked'));
    nwParameter_Add("isItmLevel", $('#isItmLevel').is(':checked'));
    nwParameter_Add("isItem", $('#isItem').is(':checked'));
    nwParameter_Add("selectFrom", selectFrom);

    let nwRecUser = getParameterByName("nwRecUser");
    let nwCostCenter = getParameterByName("nwCostCenter");
    let nwCostCenterDesc = getParameterByName("nwCostCenterDesc");
    let nwLocForm = getParameterByName("nwLocForm");
    nwParameter_Add("nwRecUser", nwRecUser);
    nwParameter_Add("nwCostCenter", nwCostCenter);
    nwParameter_Add("nwCostCenterDesc", nwCostCenterDesc);
    nwParameter_Add("nwLocForm", nwLocForm);
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

function func_LookUpInitialize(lookupName) {
    cust_GetPara();
}

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
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

}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

$(function () {
    $("#settingstabs").tabs();
});

$(function () {
    $("#settingstabs1").tabs();
});




/******** CHANGE EVENTS ********/
$(document).on("change", "input[name='dateFilter']", function (e) {
    DisableFields();

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

function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idnum + ")").find("td:eq(" + (index) + ")").text();
    return data;
}

function DisableFields() {
    $('.nwLeftFilter').enable(true);
    

}
function disableBtn() {
    $('.btnDetails').enable(false);
    $('.btnReviewAttachment').enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    //$('.btnReassignmentHist').enable(false);
   
}

function setDefaults() {
    $('#isPerCostCenter').prop('checked', true);
    $('#isAnnual').prop('checked', true);
    $('#txtFrom').enable(false);
    $('#txtTo').enable(false);
}

$(document).on('click', '.btnDetails', function () {
    let docno = nwTempTable_RowData_Get("nwGridMainCon", crnwTR.index() - 1, SPR_REFREQDOC - 1);
    if (docno != "") {
        var title = "";
        var fullength = "";
        nwLoading_Start("nwDetails", crLoadingHTML);
        title = "Request Entry";
        fullength = "../../../RM/DocumentEntry/RMRequestEntry/RMRequestEntry.aspx?nwDocno=" + encodeURI(docno) + "";
        nwPopupForm_Create("nwPopWindow", true, fullength);
        $("#nwPopWindow").css({ "min-width": "100%" });
        $("#nwPopWindow").css({ "min-height": "100%" });
        $('#nwPopWindow .BoxTitle').text(title);
        nwPopupForm_ShowModal("nwPopWindow");

        nwLoading_End('nwDetails');
    } else {

        MessageBox("Cannot proceed. Document No. is required", menuTitle, "error");
    }
});
$(document).on('click', '.btnReassignmentHist', function () {
    let btnClass = $(`#nwGridMainCon tr:eq(${crnwTR.index()}) td:eq(${SPR_REASSSGNTHIST}) button`).attr('class');
    if (btnClass.includes("btnGreen")) {
        nwLoading_Start("actReassignmentHistory", crLoadingHTML);
        let index = crnwTR.index() - 1;
        let docno = nwTempTable_RowData_Get("nwGridMainCon", index, SPR_PRDOCNO - 1);
        let refdocno = nwTempTable_RowData_Get("nwGridMainCon", index, SPR_REFREQDOC - 1);
        $('#ReassgnmentHistPRDocno').val(docno);
        nwParameter_Add("docno", docno);
        nwParameter_Add("refDocno", refdocno);
        func_ActionDriven("actReassignmentHistory", false);
        nwPopupForm_ShowModal("nwReassignmentHistory");
    }
});
$(document).on('click', '.btnReviewAttachment', function () {
    let docno = nwTempTable_RowData_Get("nwGridMainCon", crnwTR.index() - 1, SPR_PRDOCNO - 1);
    if(docno != ""){
        var title = "";
        var fullength = "";
        nwLoading_Start("nwReviewAttachment", crLoadingHTML);
        title = "Review Attachment";
        var fullength = "../../../DC/DataSetup/DCViewAttachment/DCViewAttachment.aspx?nwDocno=" + docno + "&isView=true";
        nwPopupForm_Create("nwPopWindow", true, fullength);
        $("#nwPopWindow").css({ "min-width": "100%" });
        $("#nwPopWindow").css({ "min-height": "100%" });
        $('#nwPopWindow .BoxTitle').text(title);
        nwPopupForm_ShowModal("nwPopWindow");

        nwLoading_End('nwReviewAttachment');
    }
    
})






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

function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return `<div class="spantext" nwcode="${xvalue}">${xdisplay}<span class="classx">x</span></div>`;
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
    $('div.atlContainer[nwtype="Seg2"] div.innertext').append(GenerateLookupListDataHTML(code, description));
}






function GetAddtoListFilters_Desc() {
    let i = 2;
    var len = $('div.atlContainer').length;
    var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
    var xvalue = "", xvalueTemp = "";
    var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
    for (var j = 0; j < lencode; j++) {
        if (xvalue != "") xvalue += "|";
        xvalueTemp = $('.atlContainer:eq(' + i + ') div.spantext:eq(' + j + ')').text();
        xvalueTemp = xvalueTemp.substring(0, (xvalueTemp.length - 1));
        xvalue += xvalueTemp;
    }
    nwParameter_Add(xkey + '_desc', xvalue);
};

function getloadfilter() {
    var count = $('.spantext').length;
    crnwTable = $("#nwConServiceStatus .tblGridBody");
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.atl_Location .spantext:eq(' + i + ')').text().substring(0, $('.atl_Branch .spantext:eq(' + i + ')').text().length - 1);

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


//function getloadfilterexport() {
//    var count = $('.spantext').length;
//    crnwTable = $("#nwGridCon .tblGridBody");
//    var allloc = "";
//    for (var i = 0; i <= count; i++) {
//        var loc = $('.atl_Location .spantext:eq(' + i + ')').text().substring(0, $('.atl_Location .spantext:eq(' + i + ')').text().length - 1);

//        if (loc.length > 0) {
//            allloc += loc + ";";
//        }
//    }
//    allloc = allloc.substring(0, allloc.length - 1)
//    if (allloc.length == 0) {
//        allloc = "All Locations";
//    }
//    crnwTable.find("tr:eq(4)").find('td:eq(1) ').text('LOCATION NAME: ' + allloc);
//}

function ClearGrid() {
    $(`[for="settingstabsBut-2"].tabs-lbl`).hide();
    $(`[for="settingstabsBut-3"].tabs-lbl`).hide();
    $(`[for="settingstabsBut-4"].tabs-lbl`).hide();
    $(`[for="settingstabsBut-5"].tabs-lbl`).hide();
    $(`[for="settingstabsBut-6"].tabs-lbl`).hide();
    $(`[for="settingstabsBut-7"].tabs-lbl`).hide();

    try {
        var startrow = 1;
        $.each(jsonSegment, function (i, item) {
            var description = item.Description;
            var row = (startrow + i + 1);
            $(`[for="settingstabsBut-${row}"].tabs-lbl`).text(description);
            $(`[for="settingstabsBut-${row}"].tabs-lbl`).show();
        });
    } catch (ex) {
        console.log(ex);
    }
}

function getloadfilterexport() {
    var count = $('.atl_Seg2 .spantext').length;
    crnwTable = $("#nwGridCon .tblGridBody");
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.atl_Seg2 .spantext:eq(' + i + ')').text().substring(0, $('.spantext:eq(' + i + ')').text().length - 1);

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

//Date Validations

$(document).on('change blur', '#PRDateFROM', function () {
    let PRDateTO = $('#PRDateTO').val();
    if (Date.parse(PRDateTO) < Date.parse($(this).val())) {
        MessageBox("Cannot proceed. PR Date From should not be later than the PR Date To.", menuTitle, 'error');
        $(this).val('');
    }

});


$(document).on('change blur', '#PRDateTO', function () {
    let PRDateFROM = $('#PRDateFROM').val();
    if (Date.parse(PRDateFROM) > Date.parse($(this).val())) {
        MessageBox("Cannot proceed. PR Date To should not be earlier than the PR Date From.", menuTitle, 'error');
        $(this).val('');
    }

});


$(document).on('change blur', '#assDateFROM', function () {
    let assDateTO = $('#assDateTO').val();
    if (Date.parse(assDateTO) < Date.parse($(this).val())) {
        MessageBox("Cannot proceed. Assignment Date From should not be later than the Assignment Date To.", menuTitle, 'error');
        $(this).val('');
    }

});


$(document).on('change blur', '#assDateTO', function () {
    let assDateFROM = $('#assDateFROM').val();
    if (Date.parse(assDateFROM) > Date.parse($(this).val())) {
        MessageBox("Cannot proceed. Assignment Date To should not be earlier than the Assignment Date From.", menuTitle, 'error');
        $(this).val('');
    }

});


function resetFilter() {
    $('#isPerCostCenter').prop('checked', true);
    $('#isAnnual').prop('checked', true);
    $('#txtBdgtYear').enable(true);
    $('#txtFrom').enable(false);
    $('#txtTo').enable(false);
    $('#isSegmen4').prop('checked', true);



    $('#isSegmen2').prop('checked', false);
    $('#isSegmen3').prop('checked', false);
    $('#isSegmen5').prop('checked', false);
    $('#isSegmen6').prop('checked', false);

    $('#isItemGrpType').prop('checked', false);
    $('#isItmLevel').prop('checked', false);
    $('#isItem').prop('checked', false);

    $('.atlContainer .innertext').html('');

    $('#txtFrom').val(currMonth);
    $('#txtTo').val(currMonth);
}
$(document).on('change', '#cboxPerItmGrpType', function () {
    if ($(this).is(':checked')) {
        $('#atl_ItemGroupType').enable(true);
        $('#atl_ItemGroupType.btnClearList').enable(true);
    } else {
        $('#atl_ItemGroupType').enable(false);
        $('#atl_ItemGroupType.btnClearList').enable(false);
        $('#atl_ItemGroupType.btnClearList').click();
    }
});

function setDefaultLocation(locCode, locDesc) {
    if (locCode != "") {
        let xhtml = `<div class="spantext nwCuz018" nwcode="${locCode}">${locDesc}<span class="classx" onclick="$t().remove(this)">x</span></div>`;
        $('.atlContainer.atl_Location .innertext').append(xhtml);
    }




}

$(document).on('click', '#isAnnual', function () {
    if ($(this).is(':checked')) {
        $('#txtFrom').enable(false);
        $('#txtTo').enable(false);
        $('#txtBdgtYear').enable(true);
        $('#txtFrom').val(1);
        $('#txtTo').val(12);
    }
});

$(document).on('click', '#isMonthly', function () {
    if($(this).is(':checked')){
        $('#txtFrom').enable(true);
        $('#txtTo').enable(true);
        $('#txtBdgtYear').enable(false);
        $('#txtFrom').val(currMonth);
        $('#txtTo').val(currMonth);
    }
   
});

$(document).on('change blur', '#txtFrom', function () {
    selectFrom = true;
});
$(document).on('change blur', '#txtTo', function () {
    selectFrom = false;
});

function addToSeg4(code, desc) {
    let html = `<div class="spantext nwCuz018" nwcode="${code}">${desc}<span class="classx" onclick="$t().remove(this)">x</span></div>`;
    $('.atlContainer.atl_Seg4 .innertext').append(html);
}


