const pageTitle = "Deactivated Client Registration Summary";

let StartIndex = 1,
    SPR_CustomerCode = StartIndex,
    SPR_CustomerName = ++StartIndex,
    SPR_CustClass = ++StartIndex,
    SPR_DateCreated = ++StartIndex,
    SPR_CreatedBy = ++StartIndex,
    SPR_DeactivationDate = ++StartIndex,
    SPR_DeactivatedBy = ++StartIndex,
    SPR_RsnForDeactivation = ++StartIndex;

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;


//Custom Months. Function moment.mo does not work
//var theMonths = ["January", "February", "March", "April", "May",
  //"June", "July", "August", "September", "October", "November", "December"];


function func_Reload() {
    crLnk = "../SBDeactivatedClientRegSummRpt/SBDeactivatedClientRegSummRpt_Gateway";
    crLnkGateKey = "SBDeactivatedClientRegSummRpt";

    $("#settingstabs").loadAddtoList({ list: ["Customer", "Customer Classification"], icon: true });

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    DisableFields();

    return isContinue;
}

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
    parent_MessageBoxQuestionToolBox("Would you like to save the current record(s)?", pageTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to delete the current record(s)?", pageTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwLoading_Start("xLoading", crLoadingHTML);
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
    var isContinue = false;
    fn_ExportGrid("conGrid");
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

function cust_GetPara() {
    GetAddtoListFilters();
    nwParameter_Add("dateFilterSel", $('input[name=dateFilter]').filter(':checked').attr("filtername"));
    nwParameter_Add("dpMonthly", $("#dpMonthly").val());
    nwParameter_Add("dpAnnually", $("#dpAnnually").val());
    nwParameter_Add("dpQuarterly", $("#dpQuarterly").val());
    nwParameter_Add("txtFrom", $("#txtFrom").val());
    nwParameter_Add("txtTo", $("#txtTo").val());

    //nwParameter_Add("dbSortByCol", $("#dbSortByCol").val());
    //nwParameter_Add("dpSortByType", $("#dpSortByType").val());
    //nwParameter_Add_Table("conGrid", false);
    nwParameter_Add_Spread(nwGridMainCon_Book);
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {

}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xLoading", crLoadingHTML);
    func_ActionDriven("actBindCollectionEmpty", false);
}

function Lookup_DoneFunction(idName, idNum) {
}

function func_LookUpInitialize(idName) {
    if (idName === "Customer" || idName === "CustomerClassification") {
        nwParameter_Add("dateFilterSel", $('input[name=dateFilter]').filter(':checked').attr("filtername"));
        nwParameter_Add("dpMonthly", $("#dpMonthly").val());
        nwParameter_Add("dpAnnually", $("#dpAnnually").val());
        nwParameter_Add("dpQuarterly", $("#dpQuarterly").val());
        nwParameter_Add("txtFrom", $("#txtFrom").val());
        nwParameter_Add("txtTo", $("#txtTo").val());
        GetAddtoListFilters();
    }
}

function EnableFields() {
    //$(".inputFilter").not(".dpSort").prop("disabled", true);
    //$("#rdAnnually").prop("checked", true);
    //$("#dpAnnually").prop("disabled", false);
    //$(".dpSort").prop("disabled", false);
    //$(".lookupFilter").enable(true);
    LoadDefaults();
}

function DisableFields() {
    //$(".lookupFilter").enable(true);
}

function EnableFieldsDone() {//Binding Done
    //$("#noah-webui-Toolbox").bindingNew().enable(true);
    //$("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    //$(".lookupFilter").enable(true);
    //$("#noah-webui-Toolbox").bindingPrint().enable(true);
}

function DisableFieldsEmpty() {
    //$("#noah-webui-Toolbox").bindingNew().enable(true);
    //$("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    //$("#noah-webui-Toolbox").bindingPrint().enable(false);
}

function ClearFields() {
    $(".atlContainer").find(".innertext .spantext").remove();
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords === 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}



// Addtolist codes #4
$(document).on("click", ".btnGetlookup", function () {
    crnwTableCon = null; // if grid is click 
    var xtype = $(this).attr("nwtype");
    var selectedInput = xtype;
    GetAddtoListFilters();
    lookUpCustomize(selectedInput, 2);
    return false;
});

$(document).on("click", ".btnClearList", function () {
    crnwTableCon = null; // if grid is click 
    var xtype = $(this).attr("nwtype");
    $('div.atlContainer[nwtype=' + xtype + ']').find(".innertext").html("");
});
$(document).on('click', 'span.classx', function () {
    $(this).closest('div.spantext').remove();
});

// Addtolist codes #3
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

function getloadfilter() {
    var count = $('.atl_Project .spantext').length
    crnwTable = $("#nwGridMainCon .tblGridBody");
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.atl_Project .spantext:eq(' + i + ')').text().substring(0, $('.spantext:eq(' + i + ')').text().length - 1);

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

function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
}

function LoadDatePicker() {
    $(".txtDate").datepicker({
        showButtonPanel: true,
        changeYear: true,
        changeMonth: true,
        yearRange: (new Date($DateToday).getFullYear() - 3) + ':' + (new Date($DateToday).getFullYear() + 10)
    }).mask("99/99/9999");
}

$(document).on("click", ".rdDateFilter", function () {
    let xid = $(this).attr("id");
    let y = $("#dpAnnually").val();

    $(".inputFilter").not(".dpSort").prop("disabled", true);
    switch (xid) {
        case "rdMonthly":
            $("#dpMonthly").prop("disabled", false);
            $(".txtDate").val("");
            break;
        case "rdAnnually":
            $("#dpAnnually").prop("disabled", false);
            $(".txtDate").val("");
            break;
        case "rdQuarterly":
            $("#dpQuarterly").prop("disabled", false);
            $(".txtDate").val("");
            break;
        case "rdDateCovered":
            $(".txtDate").prop("disabled", false);
            nwParameter_Add("dpAnnually", $("#dpAnnually").val());
            func_ActionDriven("actSetDefVal", false);
            break;
    }
});

$(document).on('change', '#dpAnnually', function (e) {
    ReloadMonth();
    ReloadQuarter();
});

$(document).on('change', '#txtFrom', function () {
    $("#txtTo").val($(this).val());
});

$(document).on('change', '#txtTo', function () {
    var dfrom = $("#txtFrom").val();
    var dto = $(this).val();
});

//function LoadDefaults(defYear) {
//    let m = moment.months();
//    let q = ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"];
//    let y = defYear || moment(new Date($DateToday)).format("YYYY");
//    let html = "";

//    $('#dpAnnually').val(y);

//    $.each(m, function (k, v) {
//        html += `<option value="${v}, ${y}">${v}, ${y}</option>`;
//    });
//    $("#dpMonthly").html(html);

//    html = "";

//    $.each(q, function (k, v) {
//        html += `<option value="${k}">${v}, ${y}</option>`;
//    });
//    $("#dpQuarterly").html(html);
//}

//function getDateToday(years) {
//    return moment(new Date($DateToday)).format('MM/DD/' + years);
//}

$(document).on("blur", "#dpAnnually", function (e) {
    ReloadMonth();
    ReloadQuarter();
});

function ReloadMonth() {
    $('#dpMonthly').html("");
    $('#dpMonthly').append("<option value='January, " + $('#dpAnnually').val() + "'>January, " + $('#dpAnnually').val() + "</option>");
    $('#dpMonthly').append("<option value='February, " + $('#dpAnnually').val() + "'>February, " + $('#dpAnnually').val() + "</option>");
    $('#dpMonthly').append("<option value='March, " + $('#dpAnnually').val() + "'>March, " + $('#dpAnnually').val() + "</option>");
    $('#dpMonthly').append("<option value='April, " + $('#dpAnnually').val() + "'>April, " + $('#dpAnnually').val() + "</option>");
    $('#dpMonthly').append("<option value='May, " + $('#dpAnnually').val() + "'>May, " + $('#dpAnnually').val() + "</option>");
    $('#dpMonthly').append("<option value='June, " + $('#dpAnnually').val() + "'>June, " + $('#dpAnnually').val() + "</option>");
    $('#dpMonthly').append("<option value='July, " + $('#dpAnnually').val() + "'>July, " + $('#dpAnnually').val() + "</option>");
    $('#dpMonthly').append("<option value='August, " + $('#dpAnnually').val() + "'>August, " + $('#dpAnnually').val() + "</option>");
    $('#dpMonthly').append("<option value='September, " + $('#dpAnnually').val() + "'>September, " + $('#dpAnnually').val() + "</option>");
    $('#dpMonthly').append("<option value='October, " + $('#dpAnnually').val() + "'>October, " + $('#dpAnnually').val() + "</option>");
    $('#dpMonthly').append("<option value='November, " + $('#dpAnnually').val() + "'>November, " + $('#dpAnnually').val() + "</option>");
    $('#dpMonthly').append("<option value='December, " + $('#dpAnnually').val() + "'>December, " + $('#dpAnnually').val() + "</option>");
}
function ReloadQuarter() {
    $('#dpQuarterly').html("");
    $('#dpQuarterly').append("<option value='0'>1st Quarter, " + $('#dpAnnually').val() + "</option>");
    $('#dpQuarterly').append("<option value='1'>2nd Quarter, " + $('#dpAnnually').val() + "</option>");
    $('#dpQuarterly').append("<option value='2'>3rd Quarter, " + $('#dpAnnually').val() + "</option>");
    $('#dpQuarterly').append("<option value='3'>4th Quarter, " + $('#dpAnnually').val() + "</option>");
}

//function nwGrid_AddtoListDoneCustom($id, $this, i) {
//    addtoListDone($id, $this, i);
//}

function nwgrid_PaginationNavDone(gridID) {

}

//$(document).on("keyup blur", "#dpAnnually", function () {
//    if ($(this).val() === "") $(this).val(moment(new Date($DateToday)).format("YYYY"));

//    LoadDefaults($(this).val());
//});

// Addtolist codes #2
function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext" nwcode="' + xvalue + '" >' + xdisplay + '<span class="classx">x</span></div>';
};


$(document).on("click", "#cbIndividual", function () {
    func_ChangeCustType('cbIndividual', true);
    return false;
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
    return '<div class="spantext" nwcode="' + xvalue + '" style="display:inline-block;margin-right: 3px;margin-bottom: 3px;">' + xdisplay + '<span class="classx">x</span></div>';
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


$(document).on("click", ".btnGetlookup", function () {
    crnwTableCon = null; // if grid is click 
    var xtype = $(this).attr("nwtype");
    var selectedInput = xtype;
    GetAddtoListFilters();
    lookUpCustomize(selectedInput, 2);

});


$(document).on("click", ".btnClearList", function () {
    crnwTableCon = null; // if grid is click 
    var xtype = $(this).attr("nwtype");
    $('div.atlContainer[nwtype=' + xtype + ']').find(".innertext").html("");

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
    var xChecked = "";
    var xvalue = "";
    var xdisplay = "";
    xChecked = addtoListTableRec.find('tr:eq(' + index + ')').find('input[type="checkbox"]').prop('checked');
    xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

    if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
        if (xChecked == true) {

                $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
        }
    
    }
}



function func_LookUpInitialize(lookupid) {
    cust_GetPara();
}




function GenerateGrid(json, isPagination) {
    $("#nwGridMainCon").html("")
    $("#buttons").html("")
    $("#nwGridMainCon").append("<tr><th><div class=''> </th><th><div class='col1'>Project</th><th><div class='col2'>Block/Floor</th><th><div class='col3'>Lot/Unit/Slot</th><th><div class='col4'>Model</th><th><div class='col5'>Type</th><th><div class='col6'>Class</th><th><div class='col7'>Lot Area (SQM)</th><th><div class='col8'>Floor Area (SQM)</th><th><div class='col9'>Total Area (SQM)</th><th><div class='col10'>Total Contract Price</th><th><div class='col11'>Minimum Reservation Amount</th></tr>");
    //line
    for (var i = 1; i <= json.length ; i++) {
        $("#nwGridMainCon").append("<tr><td><div class=''>" + i + "</td><td data-lbl='Project'><div class='col1'>" + json[i - 1]["Project"] + "</td><td data-lbl='Block/Floor'><div class='col2'>" + json[i - 1]["Block/Floor"] + "</td><td data-lbl='Lot/Unit/Slot'><div class='col3'>" + json[i - 1]["Lot/Unit/Slot"] + "</td><td data-lbl='Model'><div class='col4'>" + json[i - 1]["Model"] + "</td><td data-lbl='Type'><div class='col5'>" + json[i - 1]["Type"] + "</td><td data-lbl='Class'><div class='col6'>" + json[i - 1]["Class"] + "</td><td data-lbl='Lot Area' class='smrNum'><div class='col7'>" + json[i - 1]["Lot Area (SQM)"] + "</td><td data-lbl='Floor Area' class='smrNum'><div class='col8'>" + json[i - 1]["Floor Area (SQM)"] + "</td><td data-lbl='Total Area' class='smrNum'><div class='col9'>" + json[i - 1]["Total Area (SQM)"] + "</td><td data-lbl='TCP' class='smrNum'><div class='col10'>" + json[i - 1]["Total Contract Price"] + "</td><td data-lbl='Min. Amount' class='smrNum'><div class='col11'>" + json[i - 1]["Minimum Reservation Amount"] + "</td></tr>");
    }
    $('#nwGridMainCon tbody').attr('id', 'nwGridMain')

    if ((isPagination == "true") && (json.length > 10)) {
        paginate();
    }


}

$(document).on('click', '.btn-cancel', function () {
    $(document).find('#popup').fadeOut();
});


$(document).on('click', '#nwGridMainCon', function () {
    highlight_row();
});

function highlight_row() {
    var table = document.getElementById('nwGridMainCon');
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        // Take each cell
        var cell = cells[i];
        // do something on onclick event for cell
        cell.onclick = function () {
            // Get the row id where the cell exists
            crntRow = this.parentNode.rowIndex;

            var rowsNotSelected = table.getElementsByTagName('tr');
            for (var row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].classList.remove('selected');
            }
            var rowSelected = table.getElementsByTagName('tr')[crntRow];
            //rowSelected.style.backgroundColor = "gainsboro";
            rowSelected.className += " selected";

        }
    }

}

function cust_GetParaSpread() {
    nwParameter_Add_Spread(nwGridMainCon_Book);
}


