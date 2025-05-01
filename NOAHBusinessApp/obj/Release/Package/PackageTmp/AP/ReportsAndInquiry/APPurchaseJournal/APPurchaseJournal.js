var defaultloc = "";
var currentYear = "";
var currentDate = "";
var lookupFilter = "''";
var lookupFilter1 = "''";
var currTR
var SPR_ACCOUNTDESC = 8;
var SPR_PARTICULARS = 9;
var SPR_BEGBAL = 12;
var SPR_HOMEDEBIT = 13;
var SPR_HOMECREDIT = 14;
var SPR_ENDINGBAL = 15;
var BasedTitle = "";


$(document).on("click", "button", function () {
    return false;
});

function func_Reload() {
    LoadStringsCases();

    crLnk = crLnk = GetCurrentURL() + "APPurchaseJournal_Gateway";
    crLnkGateKey = "APPurchaseJournal";
    $("#settingstabs").loadAddtoList({ list: ["Location with Accountable Forms", "Payee"], icon: true });

    var isContinue = true;
    init_request();
    nwPopupForm_Create("frm_CSV");
    //nwPopupForm_Create("frm_totals"); // create form



    $('#txtAnually').mask('?9999');
    $('#txtCurrentDate').val('')

    $('#cmbMonth').enable(true);
    $('#txtAnually').enable(false);
    $('#cmbQuarter').enable(true);
    $('#txtDateFrom').enable(false);
    $('#txtDateTo').enable(false);
    $('#cmbQuarter').enable(false);


    ToolBoxGetData = false;
    //$("#nwGrid1").find("input,button,textarea").attr("disabled", "disabled");
    //nwPopupForm_Create("nwmodal1");

    //nwPopupForm_Modal("nwmodal1");
    //  nwPopupForm_Show("frm_CSV");


    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;

    EnableFields();
    ClearFields();
    $("#cmbMonth").enable(true);
    $("#radioMonthly").prop("checked", true);
    cust_GetPara();
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

    var err = Validations();

    if (err != "") {
        MessageBox(err, BasedTitle);
        isContinue = false;
    }
    cust_GetPara();
    getloadfilterexport();

    isRefreshed = true;

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
    getDateFilter();
    getAPTypeVal();
    getloadfilterexport();
    nwParameter_Add("DateGridHeader", getYearGridHeader(2));
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    nwLoading_Start("actBindCollection", crLoadingHTML);
    cust_GetPara();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {

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

    var ss = nwobjitem.find('#selecta').val();

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

    //$('input[type="radio"]').prop("checked",false); 
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




$(document).on("change", "input[name='datefilter']", function (e) {
    //DisableFields();
    //ClearDateFilter();
    //if ($(this).prop("checked")) {
    //    var id = $(this).attr("id")

    //    if (id == "radioMonthly") {
    //        $('#cmbMonth').enable(true);
    //    } else if (id == "radioDate") {
    //        $('#txtDateFrom').enable(true);
    //        $('#txtDateTo').enable(true);
    //        $('#txtDateFrom').val(currentDate);
    //        $('#txtDateTo').val(currentDate);
    //    }
    //    else if (id == "radioAnnual") {
    //        //if ($('#txtAnually').val() == "")
    //        //    $('#txtAnually').val(currentYear);
    //        //$('#txtAnually').enable(true);
    //        $('#txtAnually').enable(true);
    //    }
    //    else if (id == "radioQuarter") {
    //        $('#cmbQuarter').enable(true);
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
        else if (id == "radioForthePeriod") {

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

    if ($("#txtAnually").val() == "")
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
    //if($('#radioMonthly').prop("checked")){
    //     //dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
    //    //dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31";
    //    var dateFilterFrom = new Date($('#txtAnually').val(), $('#cmbMonth').val() - 1, 1);
    //    var dateFilterTo = new Date($('#txtAnually').val(), $('#cmbMonth').val(), 0);
    //    dateFilterFrom = formatDate(dateFilterFrom);
    //    dateFilterTo = formatDate(dateFilterTo);
    //} 
    if ($('#radioMonthly').prop('checked')) {
        if ($('#cmbMonth').val() == 1) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31";
        }
        if ($('#cmbMonth').val() == 2) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-28";
        }
        if ($('#cmbMonth').val() == 3) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31";
        }
        if ($('#cmbMonth').val() == 4) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30";
        }
        if ($('#cmbMonth').val() == 5) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31";
        }
        if ($('#cmbMonth').val() == 6) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30";
        }
        if ($('#cmbMonth').val() == 7) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31";
        }
        if ($('#cmbMonth').val() == 8) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31";
        }
        if ($('#cmbMonth').val() == 9) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30";
        }
        if ($('#cmbMonth').val() == 10) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31";
        }
        if ($('#cmbMonth').val() == 11) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30";
        }
        if ($('#cmbMonth').val() == 12) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31";
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

    lookupFilter1 = "";
    $('#cmbluglocacc option').each(function (index, option) {
        if (lookupFilter1 == "") {
            lookupFilter1 = "'" + $(this).val() + "'";
        } else {
            lookupFilter1 += ",'" + $(this).val() + "'";
        }
    });

    lookupFilter2 = "";
    $('#cmblugpayee option').each(function (index, option) {
        if (lookupFilter2 == "") {
            lookupFilter2 = "'" + $(this).val() + "'";
        } else {
            lookupFilter2 += ",'" + $(this).val() + "'";
        }
    });


    nwParameter_Add("lookupFilter1", lookupFilter1);
    nwParameter_Add("lookupFilter2", lookupFilter2);
}

function Validations() {
    var err = "";
    if ($('#radioDate').prop("checked")) {
        if ($('#txtDateTo').val() == "" || $('#txtDateFrom').val() == "") {
            err += "Date is invalid. <br>";
        }
    }
    return err;
}

$(document).on("change", "#txtDateFrom", function (e) {
    var dateFrom = $(this).val();
    var dateTo = $('#txtDateTo').val();

    if (dateFrom == "") {
        $('#txtDateTo').val("");
        return;
    }

    //if (Date.parse(dateFrom) > Date.parse(dateTo))
    //    $('#txtDateTo').val($(this).val());
});

$(document).on("change", "#txtDateTo", function (e) {
    var dateTo = $(this).val();
    var dateFrom = $('#txtDateFrom').val();

    if (dateTo == "") {
        $('#txtDateFrom').val("");
        return;
    }

    //if (Date.parse(dateTo) < Date.parse(dateFrom))
    //    $('#txtDateFrom').val($(this).val());
});






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


$(document).on('click', 'span.classx', function () {
    $(this).closest('div.spantext').remove();
});

//add to list


function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {
    //var value = "<option value='" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "'>" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "</option>"

    //$('#cmbluglocacc').append(value)
    var xvalue = "";
    var xdisplay = "";
    xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
    if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
        $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
    }


}


function getloadfilter() {



    var count = $('.spantext').length;
    crnwTable = $("#nwGridMainCon .tblGridBody");
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.atl_Project .spantext:eq(' + i + ')').text().substring(0, $('.atl_Project .spantext:eq(' + i + ')').text().length - 1);

        if (loc.length > 0) {
            allloc += loc + ";";
        }
    }
    allloc = allloc.substring(0, allloc.length - 1);
    if (allloc.length == 0) {
        allloc = "All Locations";
    }

    nwParameter_Add(allloc);

    // crnwTable.find("tr:eq(4)").find('td:eq(1) ').text('LOCATION NAME: ' + allloc);
}



function getYearGridHeader(type) {
    switch (type) {
        case 1:
            //return "As of Date: " + $('.isNumber.hasDatepicker').val();
            return "As of Date: " + $('.custom-datepicker .hasDatepicker').val();
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





function func_LookUpInitialize(lookupid) {
    getDateFilter();
    cust_GetPara();

}





function getloadfilterexport() {
    var count = $('.spantext').length;
    crnwTable = $("#nwGridMainCon .tblGridBody");
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.atl_LocationwithAccountableForms  .spantext:eq(' + i + ')').text().substring(0, $('.atl_LocationwithAccountableForms  .spantext:eq(' + i + ')').text().length - 1);

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
var gridID = "";

$(document).on("click", "#btncsvfile", function () {
    cust_GetPara()
    gridID = "nwGridCSV"
    func_ActionDriven("actloadcsvfile", true);
    nwPopupForm_Show("frm_CSV");

});

$(document).on("click", "#btnExportCSV", function () {
    cust_GetPara();
    nwParameter_Add("gridID", gridID);
    nwParameter_Add_Table("nwGridCSV");
    nwParameter_Add_Table("nwGridCSV2");
    func_ActionDriven("actcreatecsvfile", true);
    nwPopupForm_Show("frm_CSV");

});



$(document).on("click", "#btncsvfilerr", function () {
    cust_GetPara()
    gridID = "nwGridCSV2"
    func_ActionDriven("actloadcsvfilerr", true);
    nwPopupForm_Show("frm_CSV");

});

function getAPTypeVal() {
    var APTypeID = $('input[name = aptypefilter]:checked').attr("id");
    var APTypeRadVal;

    if (APTypeID == "radioall")
        APTypeRadVal = 0;

    else if (APTypeID == "radiotrade")
        APTypeRadVal = 1;

    else if (APTypeID == "radionontrade")
        APTypeRadVal = 2;

    nwParameter_Add("APTypeRadVal", APTypeRadVal);
}


function txtAnuallyVal(arrayList) {
    //MessageBox(arrayList);

    //var options = arrayList;
    //$('#txtAnually').empty();
    //$.each(options, function (i, p) {
    //    $('#txtAnually').append($('<option></option>').val(p).html(p));
    //});


    var options = '';
    arrayList = arrayList.split(',');
    for (var i = 0; i < arrayList.length; i++) {
        options += '<option value="' + arrayList[i] + '">' + arrayList[i] + '</option>';
    }
    $('#txtAnually').html(options);
}

$(document).on("click", "#csvRR", function () {
    nwLoading_Start("xExportCSVRR", crLoadingHTML);
    cust_GetPara();
    func_ActionDriven("actLoadExportCsvRR", true);
});

function downloadgentext(filepath) {

    $('#aDownloadgentext').attr({ "href": "", "title": "\'DOWNLOAD\'", "download": "", "target": "_blank" });
    $('#aDownloadgentext').attr({ "href": filepath, "title": "\'DOWNLOAD\'", "download": "", "target": "_blank" });
    $('#aDownloadgentext')[0].click();
}

$(document).on("change", "#txtDateTo", function (e) {
    let datefrom = $("#txtDateFrom").val();
    let dateto = $("#txtDateTo").val();

    if (Date.parse(dateto) < Date.parse(datefrom)) {
        $("#txtDateTo").val("");
        MessageBox("Cannot proceed. Date Covered: To should be later than Date Covered: From.", "Purchase Journal Book");
    }

});

$(document).on("change", "#txtDateFrom", function (e) {
    let datefrom = $("#txtDateFrom").val();
    let dateto = $("#txtDateTo").val();

    if (Date.parse(datefrom) > Date.parse(dateto)) {
        $("#txtDateFrom").val("");
        MessageBox("Cannot proceed. Date Covered: From should be earlier than Date Covered: To.", "Purchase Journal Book");
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