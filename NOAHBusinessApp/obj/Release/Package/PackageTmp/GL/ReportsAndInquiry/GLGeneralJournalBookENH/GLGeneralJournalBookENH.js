var currentMonth = "";
var currentYear = "";
var currentDate = "";
var currTR
var _Location = "";
var BasedTitle= "";

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

var jsonSegment = [];
 
function func_Reload() {
    LoadStringsCases();
    crLnk = GetCurrentURL() + "GLGeneralJournalBookENH_Gateway";
    crLnkGateKey = "GLGeneralJournalBookENH";

    
    var isContinue = true;
    init_request();


    $("#settingstabs").loadAddtoList({ list: ["Customer", "Unit", "Transaction No."], icon: true });
    $("#settingstabs").enable(true);
    ToolBoxGetData = false;

    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    $("#cmbMonth").enable(true);
    $("#radioMonthly").prop("checked",true);
    func_Toolbox_Clear();
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", BasedTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", BasedTitle, "", indef, enume);
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
    $("#settingstabs").enable(true);
    //isRefreshed = true;
 
    return isContinue;
}

function defaultonload(code, description, seg) {
    $('div.atlContainer[nwtype="' + seg + '"] div.innertext').append(GenerateLookupListDataHTML(code, description));
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

    //cust_GetPara();
    //return isContinue;
    var isContinue = true;
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
   
    $t().getAddtoListFilters();
    nwParameter_Add("DateGridHeader", getYearGridHeader(2));
    nwParameter_Add("idvallugPhaseTower", $('#idvallugPhaseTower').val());
    nwParameter_Add("idvallugInvoiceType", $('#idvallugInvoiceType').val());
    nwParameter_Add("dtpDateTo", $('#dtpDateTo').val());
    nwParameter_Add("dtpDateTo", $('#dtpDateTo').val());
    getloadfilterexport();
}
function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("xLoading",crLoadingHTML); 
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {

		nwLoading_Start("xLoading", crLoadingHTML); 
		nwParameter_Add("TotalRecords", $('div.BN-record span').text());
		func_ActionDriven("actBindCollectionEmpty", false);
} 

///////////////////////////////////////
var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    //var id =$("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text();
    //var desc = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text();
    if (idname == "lugPhaseTower") {
        $('#idvallugPhaseTower').val($("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text());
        $('#descvallugPhaseTower').val($("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text());
        $('#idvallugProject').val($("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 2 + ") span").text());
        $('#descvallugProject').val($("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 3 + ") span").text());
        $('#idvallugItemGroup').val($("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 4 + ") span").text());
        $('#descvallugItemGroup').val($("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 5 + ") span").text());
        $('#idvallugItemGroupType').val($("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 6 + ") span").text());
        $('#descvallugItemGroupType').val($("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 7 + ") span").text());
    }
    else if (idname == "lugInvoiceType") {
        $('#idvallugInvoiceType').val($("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 0 + ") span").text());
        $('#descvallugInvoiceType').val($("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idNum - 1) + ") td:eq(" + 1 + ") span").text());
    }

}

function nwGrdi_Change(nwobj, nwobjrow, nwobjitem) {
    var ss = nwobjitem.find('#selecta').val();
}

function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
    var ss = nwobjitem.find('#selecta').val();
}

function EnableFields() {
    $('#lugPhaseTower').enable(true);
    $('#lugProject').enable(false);
    $('#lugItemGroup').enable(false);
    $('#lugItemGroupType').enable(false);
    $('#lugInvoiceType').enable(true);
    $('#dtpDateTo').enable(true);
    $('#dtpDateTo').enable(true);

    $('.nwLeftheader').enable(true);
    $('#nwGridMain').enable(true)
    $("#settingstabs").enable(true);
    $('#noah-webui-Toolbox').bindingRefresh().enable(true);
}

function DisableFieldscustom() {
     $('.nwLeftheader').enable(false);
     $('#nwGridMain').enable(false)
}


function DisableFields() {
    $('#lugPhaseTower').enable(true);
    $('#lugProject').enable(false);
    $('#lugItemGroup').enable(false);
    $('#lugItemGroupType').enable(false);
    $('#lugInvoiceType').enable(true);
    $('#dtpDateTo').enable(true);
    $('#dtpDateTo').enable(true);

    $('.nwLeftheader').enable(true); 
    $(".nwLeftheader input[type='text']").enable(false);
    $(".nwLeftheader input[type='number']").enable(false);
    $(".nwLeftheader select").enable(false);
    $("#nwGridFilterCon").enable(false);
}

function EnableFieldsDone() {//Binding Done

}


function DisableFieldsEmpty() {

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

}

$(document).on("change", "input[name='datefilter']", function (e) {
    DisableFields();
    ClearDateFilter();

});

function ClearDateFilter() {
    $("#dtpDateFrom").val("");
    $("#dtpDateTo").val("");
}

 

$(document).on("change", "#txtAnually", function () {
    nwLoading_Start("xactBeginAndEndFiscalYear", crLoadingHTML);
    if($(this).val() == ""){
         $(this).val(currentYear)
    } else if (parseInt($(this).val()) < 1990 || parseInt($(this).val()) > 9999) {
        $(this).val(currentYear)
    }
    CheckPeriodDates(this);
    ReloadMonth();
    ReloadQuarter();
    ClearDateFilter();
    nwParameter_Add("txtAnually", $('#txtAnually').val());
    nwParameter_Add("isQuarter", 0);
    func_ActionDriven("actBeginAndEndFiscalYear", false);

});

$(document).on("change", "#cmbQuarter", function () {
    nwLoading_Start("xactBeginAndEndFiscalYear", crLoadingHTML);
    nwParameter_Add("txtAnually", $('#txtAnually').val());
    nwParameter_Add("cmbQuarter", $(this).val());
    nwParameter_Add("isQuarter", 1);
    func_ActionDriven("actBeginAndEndFiscalYear", false);

});

 
function ReloadQuarter(){ 
$('#cmbQuarter').html("");
$('#cmbQuarter').append("<option value='1'>1st Quarter, "+ $('#txtAnually').val()+"</option>");
$('#cmbQuarter').append("<option value='2'>2nd Quarter, "+ $('#txtAnually').val()+"</option>");
$('#cmbQuarter').append("<option value='3'>3rd Quarter, "+ $('#txtAnually').val()+"</option>");
$('#cmbQuarter').append("<option value='4'>4th Quarter, " + $('#txtAnually').val() + "</option>");

}

function ReloadMonth(){ 
$('#cmbMonth').html("");
$('#cmbMonth').append("<option value='1'>January, "+ $('#txtAnually').val()+"</option>");
$('#cmbMonth').append("<option value='2'>February, "+ $('#txtAnually').val()+"</option>");
$('#cmbMonth').append("<option value='3'>March, "+ $('#txtAnually').val()+"</option>");
$('#cmbMonth').append("<option value='4'>April, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='5'>May, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='6'>June, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='7'>July, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='8'>August, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='9'>September, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='10'>October, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='11'>November, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='12'>December, "+ $('#txtAnually').val()+"</option>"); 
}


function getDateFilter(){
   var dateFilterFrom = "";
   var dateFilterTo = ""; 
   if($('#radioMonthly').prop("checked")){
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
   
   if($('#radioAnnual').prop("checked")){
        //dateFilterFrom = $('#txtAnually').val() + "-1-1";
        //dateFilterTo = $('#txtAnually').val() + "-12-31";
        dateFilterFrom = $('#txtBeginDate').val();
        dateFilterTo = $('#txtEndDate').val();
   } 
   
   if($('#radioQuarter').prop("checked")){
       dateFilterFrom = $('#txtBeginDate').val();
       dateFilterTo = $('#txtEndDate').val();
   } 
   
   if($('#radioDate').prop("checked")){
        dateFilterFrom = $('#dtpDateFrom').val();
        dateFilterTo = $('#dtpDateTo').val();
   }    
   nwParameter_Add("dateFilterFrom",dateFilterFrom);
   nwParameter_Add("dateFilterTo",dateFilterTo);
}
  
$(document).on("change", "#dtpDateFrom", function (e) {
    if ($(this).val() == "") {
        $('#dtpDateFrom').val(currentDate)
        $('#dtpDateTo').val(currentDate)
        return;
    }
    CheckPeriodDates(this);
    if (Date.parse($(this).val()) > Date.parse($('#dtpDateTo').val()))
        $('#dtpDateTo').val($(this).val())


});

$(document).on("change", "#dtpDateTo", function (e) {
    var From = new Date($('#dtpDateFrom').val())

    if ($(this).val() == "") {
        $('#dtpDateTo').val(From > Date.parse(currentDate) ? $('#dtpDateFrom').val() : currentDate)
    }
    CheckPeriodDates(this);
    var To = new Date($(this).val())
    if (To < From)
        $('#dtpDateFrom').val($(this).val())


});

$(document).on('click', 'span.classx', function () {
    $(this).closest('div.spantext').remove();
});

//add to list

function nwGrid_AddtoListDoneCustom($id, $this, i) {
    $t().addtoListDone($id, $this, i);
}


function getYearGridHeader(type) {
    
    return "DATE COVERED: " + $('#dtpDateFrom').val() + " - " + $('#dtpDateTo').val()
  
}


function func_LookUpInitialize(lookupid) {

    getDateFilter();
    cust_GetPara();

}
 


//function getloadfilterexport() {
//    var count = $('[nwtype="Location"] .spantext').length;
//    crnwTable = $("#nwGridMainCon .tblGridBody");
//    var allloc = "";
//    for (var i = 0; i <= count; i++) {
//        var loc = $('[nwtype="Location"] .spantext:eq(' + i + ')').text().substring(0, $('[nwtype="Location"] .spantext:eq(' + i + ')').text().length - 1);

//        if (loc.length > 0) {
//            allloc += loc + ";";
//        }
//    }
//    allloc = allloc.substring(0, allloc.length - 1)
//    if (allloc.length == 0) {
//        nwParameter_Add("LocationFilter", "All Location");
//    } else {
//        nwParameter_Add("LocationFilter", allloc);
//    }
//}


function getloadfilterexport() {
    var count = $('[nwtype="' + _Location + '"] .spantext').length;
    crnwTable = $("#nwGridMainCon .tblGridBody");
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('[nwtype="' + _Location + '"] .spantext:eq(' + i + ')').text().substring(0, $('[nwtype="' + _Location + '"] .spantext:eq(' + i + ')').text().length - 1);

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


function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext" nwcode="' + xvalue + '">' + xdisplay + '<span class="classx">x</span></div>';
};


function JSONParse(s) {
    // preserve newlines, etc - use valid JSON
    s = s.replace(/\\n/g, "\\n")
                         .replace(/\\'/g, "\\'")
                         .replace(/\\"/g, '\\"')
                         .replace(/\\&/g, "\\&")
                         .replace(/\\r/g, "\\r")
                         .replace(/\\t/g, "\\t")
                         .replace(/\\b/g, "\\b")
                         .replace(/\\f/g, "\\f");
    // remove non-printable and other non-valid JSON chars
    s = s.replace(/[\u0000-\u0019]+/g, "");
    var o = JSON.parse(s);
    return o;
}

$(document).on('click', '#btnCreateCSV', function () {
    nwLoading_Start("xLoading", crLoadingHTML);
    cust_GetPara();
    func_ActionDriven("actCreateCSV", false);
    return false;
});


var _jsonPeriodDates = [];
function LoadPeriodDates(jsonPeriodDates) {
    _jsonPeriodDates = [];
    _jsonPeriodDates = JSONParse(jsonPeriodDates);
}


var _DateOld = "";
$(document).on("focus click", "#dtpDateFrom", function (e) {
    _DateOld = $(this).val();
});
$(document).on("focus click", "#dtpDateTo", function (e) {
    _DateOld = $(this).val();
});
$(document).on("focus click", "#txtAnually", function (e) {
    _DateOld = $(this).val();
});

function CheckPeriodDates(_this) {
    var DateVal = $(_this).val();
    var Year = new Date(DateVal).getFullYear();
    var isValid = false;
    $.each(_jsonPeriodDates, function (i, item) {
        if (Year == item.Year) { isValid = true; return false; }
    });
    if (!isValid) { MessageBox("Cannot be continued. Date should be within Period Dates setup.", BasedTitle, "error"); $(_this).val(_DateOld); return false; }
}

$(document).on("input", "#txtAnually", function () {
    if ($(this).val().length >= 4) {
        $(this).val($(this).val().substr(0, 4));
    }
});

function ClearGrid() {
    cust_GetPara();
    func_ActionDriven("actCleargrid", false);
}

