var defaultloc = "";
var currentYear = "";
var currentDate = "";
var lookupFilter = "''";
var lookupFilter1 = "''";
var currTR = 0;
var json = [];
var jsonHist = [];
var crntRow = 0;

var SPR_RowNum = 1,
            SPR_TransactionType = 2,
            SPR_TransactionNo = 3,
            SPR_TransactionDate = 4,
            SPR_ExpirationDate = 5,
            SPR_HoldingExpirationDate = 6,
            SPR_CustomerName = 7,
            SPR_CustomerClassification = 8,
            SPR_Project = 9,
            SPR_UnitCode = 10,
            SPR_UnitDescription = 11,
            SPR_TotalContractPrice = 12,
            SPR_SourceofSale = 13,
            SPR_ApprovalDate = 14,
            SPR_ApprovedBy = 15,
            SPR_ApprovalHist = 16,
            SPR_Status = 17,
            SPR_TranType = 18;

var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

//var SPR_ACCOUNTDESC = 8;
//var SPR_PARTICULARS = 9;
//var SPR_BEGBAL = 12;
//var SPR_HOMEDEBIT = 13;
//var SPR_HOMECREDIT = 14;
//var SPR_ENDINGBAL = 15;

var BasedTitle= "";
$(document).on("click", "button",  function() { 
    return false;
});
 
function func_Reload() {
    LoadStringsCases();
    crLnk = "../REMyTransactionsSummary/REMyTransactionsSummary_Gateway";
    crLnkGateKey = "REMyTransactionsSummary";

    
    var isContinue = true;
    init_request();
    //nwPopupForm_Create("win_columns");
    //nwPopupForm_Create("frm_totals"); // create form

    $('#txtDateTo').datepicker();
    $('#txtDateFrom').datepicker();
    

    // Addtolist codes #1
    $("#settingstabs").loadAddtoList({ list: ["Transaction Type", "Project", "Unit", "Customer", "Customer Classification", "Source of Sale"], icon: true });
    

    //$('#cboAnnual').mask('?9999'); please check
    $('#txtDateTo').mask('?99/99/9999');
    $('#txtDateFrom').mask('?99/99/9999');


     
    ToolBoxGetData = false;
    nwParameter_Add("DateGridHeader", getYearGridHeader(3));
  

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
    
  
    getloadfilter();
     cust_GetPara();
     getloadfilterexport()
    //isRefreshed = true;
 
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
    var isContinue = false;
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
    nwParameter_Add("DateGridHeader", getYearGridHeader(2));
    nwParameter_Add("idvallugPerMainAccount", "idvallugPerMainAccount");
    getDateFilter();
    nwParameter_Add("DocumentType", getDocumentType());
    
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    RefreshData();
    nwParameter_Add("txtCode", $("#txtCode").val());
   // EnableFieldsDone();
    nwLoading_Start("xSample",crLoadingHTML); 
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {

    nwLoading_Start("xSample", crLoadingHTML);
    RefreshData();

	nwParameter_Add("TotalRecords", $('div.BN-record span').text());
	//	DisableFieldsEmpty();
	func_ActionDriven("actBindCollectionEmpty", false);
} 

function RefreshData() {
    var TotalRecords = $('div.BNrecord span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}


///////////////////////////////////////
var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    var id = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(0)").text();
    var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(1)").text();

}

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
  var value = "<option value='"+addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text()+"'>"+addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text()+" - "+addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text()+"</option>"
 
  $('#cmb'+currTR).append(value)
    return null;
}

//function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index){
//    var value = "<option value='" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "'>" + addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text() + "</option>"

//    $('#cmb' + verID).append(value);
//}

function nwGrdi_Change(nwobj, nwobjrow, nwobjitem) {
  
    var ss = nwobjitem.find('#selecta').val();

}

function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
    var ss = nwobjitem.find('#selecta').val();

}

function EnableFields() { 
     $('.nwLeftheader').enable(true);
     $('#nwGridMain').enable(true)
     $('.nwRightheader').enable(true);

     //$(".atlContainer:eq(0)").append(GenerateLookupListDataHTML("c002", "CUstomer 2"));
     //$(".atlContainer:eq(1)").append(GenerateLookupListDataHTML("c002", "CUstomer 2"));
     //$(".atlContainer:eq(2)").append(GenerateLookupListDataHTML("c002", "CUstomer 2"));
     //$(".atlContainer:eq(3)").append(GenerateLookupListDataHTML("c002", "CUstomer 2"));
     //$(".atlContainer:eq(4)").append(GenerateLookupListDataHTML("c002", "CUstomer 2"));
     //$(".atlContainer:eq(5)").append(GenerateLookupListDataHTML("c002", "CUstomer 2"));
}

function DisableFieldscustom() {
     $('.nwLeftheader').enable(false);
     $('#nwGridMain').enable(false)
     $('.nwRightheader').enable(false);
    
}


function DisableFields() {
  
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
    clearlookupval();
    
    //$('input[type="radio"]').prop("checked",false); 
}
function clearlookupval() {
    if ($('#chckMainAccount').prop("checked")) {
    $('#descvallugPerMainAccount').val("");
    $('#idvallugPerMainAccount').val("");
    $('#idvallugPerSubAccount').val("");
    $('#descvallugPerSubAccount').val("");
    $('#lugPerMainAccount').addClass("adisabled");
         $('#lugPerSubAccount').addClass("adisabled");
    $('#chckMainAccount').prop("checked", false)
    }
    if ($('#chckSubAccount').prop("checked")) {
    $('#descvallugPerMainAccount').val("");
    $('#idvallugPerMainAccount').val("");
    $('#idvallugPerSubAccount').val("");
    $('#descvallugPerSubAccount').val("");
         $('#lugPerMainAccount').addClass("adisabled");
         $('#lugPerSubAccount').addClass("adisabled");
         $('#chckSubAccount').prop("checked", false)

        
}
    func_ActionDriven("actCleargrid", false);

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


$(document).on("keyup blur","#txtCode", function(e) {
      var str = $("#txtCode").val();
      var res = str.replace(/'|%/g, "");
      $("#txtCode").val(res);
});

$(document).on("keypress blur", "#txtCode", function(e) {
      if(e.which == 37 || e.which == 39)
      return false;
});

$(document).on("change","#chckAccountDetails", function(e) {
    $('#nwGridFilterCon').enable($(this).prop("checked"))
    $('.nwRightheader .noah-webui-containerRow').enable(!$(this).prop("checked")) 
    $('.RightFilterHeader').html("");
    $('#nwGridFilterCon td').html("&nbsp;")
});

$(document).on("change", "input[name='datefilter']", function (e) {
    DisableFields();
    ClearDateFilter();
    if ($(this).prop("checked")) {
        var id = $(this).attr("id")

        if (id == "radioMonthly") {
            clearlookupval();
            $('#cmbMonth').enable(true);
            $(".nwCustBtn").enable(true);
        } else if (id == "radioDate") {
            $('#txtDateFrom').enable(true);
            $('#txtDateTo').enable(true);
            $('#txtDateFrom').val(currentDate);
            $('#txtDateTo').val(currentDate);
            clearlookupval();
            $(".nwCustBtn").enable(false);
        }
        else if (id == "radioAnnual") {
            if ($('#cboAnnual').val() == "")
                $('#cboAnnual').val(currentYear);
            clearlookupval();
            $('#cboAnnual').enable(true);
            $(".nwCustBtn").enable(false);
        }
        else if (id == "radioQuarter") {
            $('#cmbQuarter').enable(true);
            clearlookupval();
            $(".nwCustBtn").enable(false);
        } 
    }
});


function ClearDateFilter() {
    $("#cmbMonth").val("1");
    $("#cmbQuarter").val("1");
    
    if($("#cboAnnual").val() == "")
        $("#cboAnnual").val(currentYear);
    
    $("#txtDateFrom").val("");
    $("#txtDateTo").val("");
}

 


$(document).on("blur", "#cboAnnual", function() {   
    if($(this).val() == ""){
         $(this).val(currentYear)
    } 
    
    ReloadMonth()
    ReloadQuarter()
});


getDateFilter();
cust_GetPara();
 
function ReloadQuarter(){ 
$('#cmbQuarter').html("");
$('#cmbQuarter').append("<option value='1'>1st Quarter, "+ $('#cboAnnual').val()+"</option>");
$('#cmbQuarter').append("<option value='2'>2nd Quarter, "+ $('#cboAnnual').val()+"</option>");
$('#cmbQuarter').append("<option value='3'>3rd Quarter, "+ $('#cboAnnual').val()+"</option>");
$('#cmbQuarter').append("<option value='4'>4th Quarter, "+ $('#cboAnnual').val()+"</option>"); 
}

function ReloadMonth(){ 
$('#cmbMonth').html("");
$('#cmbMonth').append("<option value='1'>January, "+ $('#cboAnnual').val()+"</option>");
$('#cmbMonth').append("<option value='2'>February, "+ $('#cboAnnual').val()+"</option>");
$('#cmbMonth').append("<option value='3'>March, "+ $('#cboAnnual').val()+"</option>");
$('#cmbMonth').append("<option value='4'>April, "+ $('#cboAnnual').val()+"</option>"); 
$('#cmbMonth').append("<option value='5'>May, "+ $('#cboAnnual').val()+"</option>"); 
$('#cmbMonth').append("<option value='6'>June, "+ $('#cboAnnual').val()+"</option>"); 
$('#cmbMonth').append("<option value='7'>July, "+ $('#cboAnnual').val()+"</option>"); 
$('#cmbMonth').append("<option value='8'>August, "+ $('#cboAnnual').val()+"</option>"); 
$('#cmbMonth').append("<option value='9'>September, "+ $('#cboAnnual').val()+"</option>"); 
$('#cmbMonth').append("<option value='10'>October, "+ $('#cboAnnual').val()+"</option>"); 
$('#cmbMonth').append("<option value='11'>November, "+ $('#cboAnnual').val()+"</option>"); 
$('#cmbMonth').append("<option value='12'>December, "+ $('#cboAnnual').val()+"</option>"); 
}


function getDateFilter(){
    var dateFilterFrom = "";
    var dateFilterTo = "";
    var fieldsets = "";
   if($('#radioMonthly').prop("checked")){
        dateFilterFrom = $('#cboAnnual').val() + "-" + $('#cmbMonth').val() + "-1";
        var month = $('#cmbMonth').val()
        if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cmbMonth').val() + "-31";
        }
        else if (month == 4 || month == 6 || month == 9 || month == 11) {
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cmbMonth').val() + "-30";
        }
        else if (month == 2) {
            dateFilterTo = $('#cboAnnual').val() + "-" + $('#cmbMonth').val() + "-28";
        }

   } 
   
   if($('#radioAnnual').prop("checked")){
        dateFilterFrom = $('#cboAnnual').val() + "-1-1";
        dateFilterTo = $('#cboAnnual').val() + "-12-31";
   } 
   
   if($('#radioQuarter').prop("checked")){
        if($('#cmbQuarter').val() == 1){
            dateFilterFrom = $('#cboAnnual').val() + "-1-1";
            dateFilterTo = $('#cboAnnual').val() + "-3-31";
        }
        if($('#cmbQuarter').val() == 2){
            dateFilterFrom = $('#cboAnnual').val() + "-4-1";
            dateFilterTo = $('#cboAnnual').val() + "-6-30";
        }
        if($('#cmbQuarter').val() == 3){
            dateFilterFrom = $('#cboAnnual').val() + "-7-1";
            dateFilterTo = $('#cboAnnual').val() + "-9-30";
        }
        if($('#cmbQuarter').val() == 4){
            dateFilterFrom = $('#cboAnnual').val() + "-10-1";
            dateFilterTo = $('#cboAnnual').val() + "-12-31";
        }
   } 
   
   if($('#radioDate').prop("checked")){
        dateFilterFrom = $('#txtDateFrom').val();
        dateFilterTo = $('#txtDateTo').val();
   }

   nwParameter_Add("dateFilterFrom",dateFilterFrom);
   nwParameter_Add("dateFilterTo",dateFilterTo);
   
  
}
  
$(document).on("change", "#txtDateFrom", function(e) {
   if($(this).val() == "")
        {
             $('#txtDateTo').val("")
             return;
        }
        
    if($(this).val() > $('#txtDateTo').val())
        $('#txtDateTo').val($(this).val())
});


$(document).on("change", "#txtDateTo", function(e) { 
     if($(this).val() == "")
        {
             $('#txtDateFrom').val("")
             return;
        }
        
     var From = new Date($('#txtDateFrom').val())
     var To = new Date($(this).val())
     if (To < From)
         $('#txtDateFrom').val($(this).val())
});

$(document).on("change", "#chckSubAccount", function(e) { 
   // $('#lugPerSubAccount input').val(""); 
    if ($(this).prop("checked")) {
        $('#lugPerSubAccount').removeClass("adisabled");

    }
    else {
        $('#lugPerSubAccount').addClass("adisabled");
        $('#idvallugPerSubAccount').val("");
        $('#descvallugPerSubAccount').val("");
    }
       
 
});


$(document).on("change", "#chckMainAccount", function(e) { 
    // $('#lugPerMainAccount input').val("");  
     if ($(this).prop("checked")) {

         $('#lugPerMainAccount').removeClass("adisabled");

         
     }
     else {
         $('#lugPerMainAccount').addClass("adisabled");
         $('#idvallugPerMainAccount').val("");
         $('#descvallugPerMainAccount').val("");
     }
        
});

        

function BoldfontParticulars() {

    crnwTable = $("#nwGridMainCon .tblGridBody");

    var count = crnwTable.find("tr").find("td:eq(" + SPR_ACCOUNTDESC + ")").length;

    var value = "";

    for (var i = 0; i < count; i++) {

        value = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").text();

        if (value =="BEGINNING BALANCE: ") {
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BaseAmount + ")").enable(false);
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BEGBAL + ")").addClass("dataset4");
            
        }

        if (value == "TOTAL: ") {
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BaseAmount + ")").enable(false);
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_HOMEDEBIT + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_HOMECREDIT + ")").addClass("dataset4");

        }
        if (value == "ENDING BALANCE: ") {
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BaseAmount + ")").enable(false);
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ENDINGBAL + ")").addClass("dataset4");

        }
       

    }
}

function checkcolor() {

    crnwTable = $("#nwGridMainCon .tblGridBody");

    var count = crnwTable.find("tr").find("td:eq(" + SPR_ZERORATED + ")").length;

    var value = "";

    for (var i = 0; i < count; i++) {

        value = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ZERORATED + ") textarea").val();

        if (value == "" || value == "0") {
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BaseAmount + ")").enable(false);
            //crnwTR.find("td:eq(" + SPR_Particulars + ") .nwgbtnRemarks").removeClass('colorgreen');
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_Particulars + ") ,nwgbtnRemarks").removeClass("colorgreen");
        }
        else {
            // crnwTR.find("td:eq(" + SPR_Particulars + ") .nwgbtnRemarks").addClass('colorgreen');
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ZERORATED + ") .nwgbtnRemarks").addClass("colorgreen");
            $("#txtnwgRemarks").enable(false);

        }

    }
}

function boldfontexport() {

    crnwTable = $("#nwExportGen-nwData");

    var count = crnwTable.find("tr").find("td:eq(" + SPR_PARTICULARS + ")").length;

    var value = "";

    for (var i = 0; i < count; i++) {

        value = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").text();

        if (value == "BEGINNING BALANCE: ") {
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BaseAmount + ")").enable(false);
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BEGBAL + ")").addClass("dataset4");

        }

        if (value == "TOTAL: ") {
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BaseAmount + ")").enable(false);
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_HOMEDEBIT + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_HOMECREDIT + ")").addClass("dataset4");

        }
        if (value == "ENDING BALANCE: ") {
            // crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_BaseAmount + ")").enable(false);
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ACCOUNTDESC + ")").addClass("dataset4");
            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_ENDINGBAL + ")").addClass("dataset4");

        }


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
    //$("#settingstabs").tabs();
});


//style="display:inline-block;margin-right: 3px;margin-bottom: 3px;"
// Addtolist codes #2
function GenerateLookupListDataHTML(xvalue, xdisplay) {
    return '<div class="spantext" nwcode="' + xvalue + '" >' + xdisplay + '<span class="classx">x</span></div>';
};

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



function GetAddtoListFilters1() {
    var len = $('div.atlContainer').length;
    for (var i = 0; i < len; i++) {
        var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
        var xvalue = "";
        var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
        for (var j = 0; j < lencode; j++) {
            if (xvalue != "") xvalue += "|";
            xvalue +=  $(".atlContainer:eq(" + i + ") div.spantext:eq(" + j + ")").attr("nwcode") ;
        }

        nwParameter_Add(xkey, xvalue);
        $('#filterx').val(xvalue);
    }
};



//add to list


function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {

    var xvalue = "";
    var xdisplay = "";
        xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
        xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

        if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
            $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
        }
}




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

$(document).on('click', '.nwgbtnRemarks', function () {
    $('#btnnwgRemarks').enable(false);
    $('#txtnwgRemarks').enable(false);
    $('#chknwgRemarks').enable(false);
});


function getYearGridHeader(type) {
    switch (type) {
        case 1:
            return "As of Date: " + $('.isNumber.hasDatepicker').val();
            break;
        case 2:
            if ($('#radioAnnual').prop("checked")) {
                return "For the Year " + $('#cboAnnual').val();
            }

            else if ($('#radioMonthly').prop("checked")) {
                return "For the Month of " + $('#cmbMonth option:selected').text();
            }

            else if ($('#radioQuarter').prop("checked")) {
                return "For the " + $('#cmbQuarter option:selected').text()
            }

            else if ($('#radioDate').prop("checked")) {
                return "DATE COVERED: " + $('#txtDateFrom').val() + " - " + $('#txtDateTo').val()
            }
            else {
                return "For the Month ";
            }
            break;
        case 3:
            return "For the Month ";
            break;
    }
}





function func_LookUpInitialize(lookupid) {
    getDateFilter();
    cust_GetPara();

}
 


function getloadfilterexport() {
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
        nwParameter_Add("LocationFilter", "All Locations");
    } else {
        nwParameter_Add("LocationFilter", allloc);
    }
}



function getDocumentType() {

    if ($('#radioAll').prop("checked"))
        return 0;
    if ($('#radioAPV').prop("checked"))
        return 1;
    if ($('#radioDebit').prop("checked"))
        return 2;
    if ($('#radioPaymentRelease').prop("checked"))
        return 3;
    if ($('#radioVoidChecks').prop("checked"))
        return 4;
    if ($('#radioNonCheckPayment').prop("checked"))
        return 5;

}

function func_removeButton() {
    $('#nwGridView .tblGrid_Panel1 .nwGridPage1 tr:nth-child(8) td:nth-child(' + SPR_ApprovalHist + ')').removeClass("nwGridbutton");
    $('#nwGridView .tblGrid_Panel1 .nwGridPage1 tr:nth-child(8) td:nth-child(' + SPR_ApprovalHist + ')').text("Approval History");
}



$(document).on('click', '.btnHist', function () {
    $("#iframetitle").text("Approval History");
    $('#iframeBtnMaximize').hide()
    $(document).find('#popup').fadeIn();
    $('#iframeBtnMaximize').hide()
   
    crntRow = this.parentNode.rowIndex;;
    var docno = $('#nwGridMainCon tbody tr:eq(' + crntRow + ') td:eq(' + (SPR_TransactionNo - 1) + ')').text();
    var trantype = $('#nwGridMainCon tbody tr:eq(' + crntRow + ') td:eq(' + (SPR_TranType - 1) + ')').text();
    $('#txtTransactionNo').val(docno);
    nwParameter_Add("trantype", trantype)
    nwParameter_Add("docno" ,docno )
    nwLoading_Start("actGenerateHistory", crLoadingHTML);
    func_ActionDriven("actGenerateHistory", false);
});


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


function func_replaceRemarks() {
    var len = $('#nwGridHist tbody tr').length;
    var remarks = '';
    for (var i = 1; i <= len ; i++) {
        remarks = $('#nwGridHist tbody tr:eq(' + i + ') td:eq(3)').text()
        remarks = remarks.replace("nwAps", "'")
        $('#nwGridHist tbody tr:eq(' + i + ') td:eq(3)').text(remarks)
    }
}


