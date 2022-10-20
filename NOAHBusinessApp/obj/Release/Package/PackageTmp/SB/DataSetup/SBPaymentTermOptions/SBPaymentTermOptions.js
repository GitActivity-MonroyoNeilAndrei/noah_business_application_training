var defaultloc = "";
var currentYear = "";
var currentDate = "";
var lookupFilter = "''";
var lookupFilter1 = "''";
var currTR = 0;
var json = [];
var crntRow = 0;
var pager;

var SPR_TransactionType = 1,
            SPR_TransactionNo = 2,
            SPR_TransactionDate = 3,
            SPR_ExpirationDate = 4,
            SPR_CustomerName = 5,
            SPR_CustomerClassification = 6,
            SPR_Project = 7,
            SPR_UnitCode = 8,
            SPR_UnitDescription = 9,
            SPR_TotalContractPrice = 10,
            SPR_SourceofSale = 11,
            SPR_ApprovalDate = 12,
            SPR_ApprovedBy = 13,
            SPR_ApprovalHist = 14,
            SPR_Status = 15,
            SPR_TranType = 16;

var BasedTitle = "";
function func_Reload() {
    LoadStringsCases();
    crLnk = "../SBPaymentTermOptions/SBPaymentTermOptions_Gateway";
    crLnkGateKey = "SBPaymentTermOptions";
    var isContinue = true;
    crnwTagSingleBind = true;
    init_request();
    ToolBoxGetData = false;
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
    cust_GetPara();
    return isContinue;
}


function defaultonload(code, description) {
    $('div.atlContainer[nwtype="luglocacc"] div.innertext').append(GenerateLookupListDataHTML(code, description));
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
    //var isContinue = true;
    //isContinue = false;
    //fn_ExportGrid("nwGridView");
    //return isContinue;

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

    GetAddtoListFilters();

}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwParameter_Add("txtCode", $("#txtCode").val());
    // EnableFieldsDone();
    nwLoading_Start("xSample", crLoadingHTML);
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("xSample", crLoadingHTML);
    nwParameter_Add("TotalRecords", $('div.BN-record span').text());
    //	DisableFieldsEmpty();
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////
var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    var id = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
    var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();
    //if (idName == 'lugPaymentTerm') {
    //    $("#idvallugDesignation").val(getLookupData(idNum, 2));
    //    $("#descvallugDesignation").val(getLookupData(idNum, 3));
    //    $("#descvallugTaxIDNo").val(getLookupData(idNum, 4));
    //    $("#lugDesignation").enable(false);
    //}
}

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
    var value = "<option value='" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "'>" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + " - " + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "</option>"

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

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
}

function ClearFields() {
    DisableFields();
    ClearDateFilter();
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
    $("#settingstabs").loadAddtoList({ list: ["Payment Term"], icon: true });
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
    var xChecked = "";
    var xvalue = "";
    var xdisplay = "";
    xChecked = addtoListTableRec.find('tr:eq(' + index + ')').find('input[type="checkbox"]').prop('checked');
    xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

    if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
        if (xChecked) {

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


