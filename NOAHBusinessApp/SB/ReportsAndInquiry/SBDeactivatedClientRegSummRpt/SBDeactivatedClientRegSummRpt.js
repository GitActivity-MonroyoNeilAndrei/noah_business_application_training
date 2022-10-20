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

function func_Reload() {
    crLnk = "../SBDeactivatedClientRegSummRpt_Gateway";
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

function cust_GetPara() {
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

    $t().getAddtoListFilters();
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
        $t().getAddtoListFilters();
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
            $(".txtDate").val(getDateToday(`${y}`));
            break;
    }
});

$(document).on('change', '#dpAnnually', function () {
    let m = moment.months();
    let q = ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"];
    let y = $("#dpAnnually").val();
    html = "";

    $.each(m, function (k, v) {
        html += `<option value="${v}, ${y}">${v}, ${y}</option>`;
    });
    $("#dpMonthly").html(html);

    html = "";

    $.each(q, function (k, v) {
        html += `<option value="${k}">${v}, ${y}</option>`;
    });
    $("#dpQuarterly").html(html);
});

$(document).on('change', '#txtFrom', function () {
    $("#txtTo").val($(this).val());
});

$(document).on('change', '#txtTo', function () {
    var dfrom = new Date($("#txtFrom").val());
    var dto = new Date($(this).val());

    if ($(this).val() === "") {
        $(this).val($("#txtFrom").val());
    } else if (moment(dfrom).isAfter(dto)) {
        $("#txtFrom").val($(this).val());
    }
});

function LoadDefaults(defYear) {
    let m = moment.months();
    let q = ["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"];
    let y = defYear || moment(new Date($DateToday)).format("YYYY");
    let html = "";

    $('#dpAnnually').val(y);

    $.each(m, function (k, v) {
        html += `<option value="${v}, ${y}">${v}, ${y}</option>`;
    });
    $("#dpMonthly").html(html);

    html = "";

    $.each(q, function (k, v) {
        html += `<option value="${k}">${v}, ${y}</option>`;
    });
    $("#dpQuarterly").html(html);
}

function getDateToday(years) {
    return moment(new Date($DateToday)).format('MM/DD/' + years);
}

function nwGrid_AddtoListDoneCustom($id, $this, i) {
    $t().addtoListDone($id, $this, i);
}

function nwgrid_PaginationNavDone(gridID) {

}

$(document).on("keyup blur", "#dpAnnually", function () {
    if ($(this).val() === "") $(this).val(moment(new Date($DateToday)).format("YYYY"));

    LoadDefaults($(this).val());
});

// Addtolist codes #2
function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext" nwcode="' + xvalue + '" >' + xdisplay + '<span class="classx">x</span></div>';
};


$(document).on("click", "#cbIndividual", function () {
    func_ChangeCustType('cbIndividual', true);
    return false;
});
