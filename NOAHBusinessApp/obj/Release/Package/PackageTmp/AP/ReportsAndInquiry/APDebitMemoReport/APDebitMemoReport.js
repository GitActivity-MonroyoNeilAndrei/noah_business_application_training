
var currentYear = "";
var currentDate = "";
var lookupFilter = "";
var currTR
var BasedTitle = "";
var lookupFilter1 = "";
var defaultloc = "";

var SPR_DATEPOSTED_SUM = 1,
    SPR_DEBITMEMONO_SUM = 2,
    SPR_PAYEETYPE_SUM = 3,
    SPR_PAYEESUBTYPE_SUM = 4,
    SPR_REFNO_SUM = 5,
    SPR_REFDATE_SUM = 6,
    SPR_PAYEECODE_SUM = 7,
    SPR_PAYEENAME_SUM = 8,
    SPR_CURRENCY_SUM = 9,
    SPR_OCYVATEX_SUM = 10,
    SPR_VAT_SUM = 11,
    SPR_AFTERVAT_SUM = 12,
    SPR_EWT_SUM = 13,
    SPR_NETAMOUNT_SUM = 14,
    SPR_NETAMOUNT_LOCAL_SUM = 15,
    SPR_NETAMOUNT_HOME_SUM = 16,
    SPR_REMARKS_SUM = 17,
    SPR_REVIEWAPPROVE_DTLS_SUM = 18,
    SPR_VIEWFORM_DTLS_SUM = 19,
    SPR_VIEWENTRYSCREEN_SUM = 20,
    SPR_REVIEWATTACH_SUM = 21,
    SPR_HASAPPROVAL_DTLS_SUM = 22,
    SPR_HASREVIEWATTACH_SUM = 23;

var SPR_DATEPOSTED_DTL = 1,
    SPR_DEBITMEMONO_DTL = 2,
    SPR_PAYEETYPE_DTL = 3,
    SPR_PAYEESUBTYPE_DTL = 4,
    SPR_REFNO_DTL = 5,
    SPR_REFDATE_DTL = 6,
    SPR_PAYEECODE_DTL = 7,
    SPR_PAYEENAME_DTL = 8,
    SPR_CURRENCY_DTL = 9,
    SPR_APVNO_DTL = 10,
    SPR_APVREFNO_DTL = 11,
    SPR_APVDATE_DTL = 12,
    SPR_OCYVATEX_DTL = 13,
    SPR_VAT_DTL = 14,
    SPR_AFTERVAT_DTL = 15,
    SPR_EWT_DTL = 16,
    SPR_NETAMOUNT_DTL = 17,
    SPR_NETAMOUNT_LOCAL_DTL = 18,
    SPR_NETAMOUNT_HOME_DTL = 19,
    SPR_REASON_DTL = 20,
    SPR_PARTICULAR_DTL = 21,
    SPR_REVIEWAPPROVE_DTLS_DTL = 22,
    SPR_VIEWFORM_DTLS_DTL = 23,
    SPR_VIEWENTRYSCREEN_DTL = 24,
    SPR_REVIEWATTACH_DTL = 25,
    SPR_HASAPPROVAL_DTLS_DTL = 26,
    SPR_HASREVIEWATTACH_DTL = 27;

var SPRNAME_DATEPOSTED = "Date Posted",
    SPRNAME_DEBITMEMONO = "Debit Memo No.",
    SPRNAME_PAYEETYPE = "Payee Type",
    SPRNAME_PAYEESUBTYPE = "Payee Sub Type",
    SPRNAME_REFNO = "Reference No.",
    SPRNAME_REFDATE = "Reference Date",
    SPRNAME_PAYEECODE = "Payee Code",
    SPRNAME_PAYEENAME = "Payee Name",
    SPRNAME_CURRENCY = "Currency",
    SPRNAME_OCYVATEX = "DM Amount (OCY VATEX)",
    SPRNAME_VAT = "VAT",
    SPRNAME_AFTERVAT = "DM Amount after VAT",
    SPRNAME_EWT = "EWT",
    SPRNAME_NETAMOUNT = "Net DM Amount",
    SPRNAME_NETAMOUNT_LOCAL = "Net DM Amount (Local)",
    SPRNAME_NETAMOUNT_HOME = "Net DM Amount (Home)",
    SPRNAME_REMARKS = "Remarks",
    SPRNAME_REVIEWAPPROVE_DTLS = "Review and Approval Details",
    SPRNAME_VIEWFORM_DTLS = "View Form Details",
    SPRNAME_VIEWENTRYSCREEN = "View Entry Screen",
    SPRNAME_REVIEWATTACH = "View Attachment(s)",
    SPRNAME_HASAPPROVAL_DTLS = "HASAPPROVAL_DTLS",
    SPRNAME_HASREVIEWATTACH = "HASREVIEWATTACH";

var jsonreports = [];

//var greenrow = new Array();
var lookupfilter = "''";
$(document).on("click", "button", function () {
    return false;
});
 
function func_Reload() {
    //LoadStringsCases();
    crLnk = GetCurrentURL() + "APDebitMemoReport_Gateway";
    crLnkGateKey = "APDebitMemoReport";

    var isContinue = true;
    init_request();
    nwPopupForm_Create("nwGenerateDissapprovalH", true);
    nwPopupForm_Create("nwGeneratedetails", true);
    //nwPopupForm_Create("frm_totals"); // create form

    $('#txtDateTo').datepicker();
    $('#txtDateFrom').datepicker();
    
    $('#txtAnually').mask('?9999');
    $('#txtDateTo').mask('?99/99/9999');
    $('#txtDateFrom').mask('?99/99/9999');

    nwParameter_Add("txtCode", $("#txtCode").val());
    $('#lugdocfrom,#lugdocto').enable(true);
    ToolBoxGetData = false;

    $("#settingstabs").loadAddtoList({ list: ["Location with Accountable Forms", "Payee","Debit Memo No."], icon: true });
   
    nwPopupForm_Create("nwRemarks", false);

    $('#txtCurrentDate').val('')
    $('#cmbMonth').enable(true);
    $('#txtAnually').enable(false);
    $('#cmbQuarter').enable(true);
    $('#txtDateFrom').enable(false);
    $('#txtDateTo').enable(false);
    $('#cmbQuarter').enable(false);

    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    $("#cmbMonth").enable(true);
    $("#radioMonthly").prop("checked", true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
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
    //cust_GetPara();
    //getloadfilterexport();
    //var isContinue = true;
    //isContinue = false;
    fn_ExportGrid("nwGridMainCon");
    return isContinue;
    //var isContinue = true;
    //cust_GetPara();
    //getloadfilterexport();
    //if ($('#radioMonthly').prop('checked')) {
    //    if ($('#cmbMonth').val() == 1) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
    //    }
    //    if ($('#cmbMonth').val() == 2) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-28");
    //    }
    //    if ($('#cmbMonth').val() == 3) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
    //    }
    //    if ($('#cmbMonth').val() == 4) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30");
    //    }
    //    if ($('#cmbMonth').val() == 5) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
    //    }
    //    if ($('#cmbMonth').val() == 6) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30");
    //    }
    //    if ($('#cmbMonth').val() == 7) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
    //    }
    //    if ($('#cmbMonth').val() == 8) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
    //    }
    //    if ($('#cmbMonth').val() == 9) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30");
    //    }
    //    if ($('#cmbMonth').val() == 10) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
    //    }
    //    if ($('#cmbMonth').val() == 11) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30");
    //    }
    //    if ($('#cmbMonth').val() == 12) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
    //    }
    //}
    //else if ($('#radioAnnual').prop('checked')) {
    //    nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-1-1");
    //    nwParameter_Add("datefilterto", $('#txtAnually').val() + "-12-31");
    //}
    //else if ($('#radioQuarter').prop('checked')) {
    //    if ($('#cmbQuarter').val() == 1) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-1-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-3-31");
    //    }
    //    if ($('#cmbQuarter').val() == 2) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-4-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-6-30");
    //    }
    //    if ($('#cmbQuarter').val() == 3) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-7-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-9-30");
    //    }
    //    if ($('#cmbQuarter').val() == 4) {
    //        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-10-1");
    //        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-12-31");
    //    }
    //}
    //else if ($('#radioDate').prop('checked')) {
    //    nwParameter_Add("datefilterfrom", $('#txtDateFrom').val());
    //    nwParameter_Add("datefilterto", $('#txtDateTo').val());
    //}

    //if ($('#rdncreated').prop('checked')) {
    //    nwParameter_Add("createdby", $('#idvallugcreatedby').val());
    //}
    //else if ($('#rdnstatus').prop('checked')) {
    //    nwParameter_Add("status", $('#descvallugstatus').val());

    //}
    //else if ($('#rdndocno').prop('checked')) {
    //    nwParameter_Add("docnofrom", $('#idvallugdocfrom').val());
    //    nwParameter_Add("docnoto", $('#idvallugdocto').val());


    //}

    //if ($('#idvallugfrom').val() != '') {
    //    nwParameter_Add("transacttype", $('#idvallugfrom').val());
    //}
    //lookupFilter1 = "";
    //$('#cmbluglocacc option').each(function (index, option) {
    //    if (lookupFilter1 == "") {
    //        lookupFilter1 = "" + $(this).val() + "";
    //    } else {
    //        lookupFilter1 += "|" + $(this).val() + "";
    //    }
    //});

    //nwParameter_Add("lookupFilter1", lookupFilter1);
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

    nwParameter_Add("DateGridHeader", getYearGridHeader(2));    
    getDateFilter()
    getloadfilterexport();
    getloadfilter();
    GetAddtoListFilters()

    //radio buttons
    nwParameter_Add("radioAllPayee", $(`#radioAllPayee`).is(':checked'));
    nwParameter_Add("radioPayeeVendor", $(`#radioPayeeVendor`).is(':checked'));
    nwParameter_Add("radioPayeeEmployee", $(`#radioPayeeEmployee`).is(':checked'));

    nwParameter_Add("radioSummary", $(`#radioSummary`).is(':checked'));
    nwParameter_Add("radioDetailed", $(`#radioDetailed`).is(':checked'));

}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    RefreshData();
    nwLoading_Start("xSample",crLoadingHTML); 
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() { 
		nwLoading_Start("xSample", crLoadingHTML); 
		nwParameter_Add("TotalRecords", $('div.BN-record span').text());
		func_ActionDriven("actBindCollectionEmpty", false);
} 

var temp_crnwTR = "";
function Lookup_DoneFunction(idName, idNum) {
    var id = $('#idvallugfrom').val();
    var desc = $('#descvallugfrom').val();
    if (idName == "lugfrom") {
        $('#idvallugto').val(id);
        $('#descvallugto').val(desc);
    }
    else if (idName == "lugto") {
        if (id == "") {
            $('#idvallugto').val('');
            $('#descvallugto').val('');
        }
    }

    if (idName == "lugdocfrom") {
        $('#idvallugdocto').val($('#idvallugdocfrom').val());
        $('#descvallugdocto').val($('#idvallugdocfrom').val());
    }


}

function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
  
  var value = "<option value='"+addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text()+"'>"+addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text()+" - "+addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text()+"</option>"
  $('#cmb'+currTR).append(value)
  
  $('#lugdocfrom input').val("");
  $('#lugdocto input').val("");
  $('#lugcreatedby input').val("");
  $('#lugstatus input').val("");

  return null;
}

function nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, index) {

    var xvalue = "";
    var xdisplay = "";
    xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

    if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
        $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
    }
}



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
        $("#noah-webui-Toolbox").bindingExport().enable(true);   
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

//$(document).on("change","input[name='datefilter']", function(e) {
//    //DisableFields();
//    //ClearDateFilter();
//    //if($(this).prop("checked")){
//    //    var id = $(this).attr("id")
//    //    if(id == "radioMonthly"){ 
//    //        $('#cmbMonth').enable(true);
//    //    }else if(id == "radioDate"){
//    //        $('#txtDateFrom').enable(true);
//    //        $('#txtDateTo').enable(true);
//    //        $('#txtDateFrom').val(currentDate);
//    //        $('#txtDateTo').val(currentDate);
//    //    }
//    //    else if(id == "radioAnnual"){
//    //        if( $('#txtAnually').val() == "")
//    //            $('#txtAnually').val(currentYear);
            
//    //        $('#txtAnually').enable(true);
//    //    }
//    //    else if(id == "radioQuarter"){
//    //        $('#cmbQuarter').enable(true); 
//    //    } 
//    //}

//    if ($(this).prop("checked")) {
//        var id = $(this).attr("id")

//        if (id == "radioMonthly") {
//            $('#txtCurrentDate').val('')
//            $('#cmbMonth').enable(true);
//            $('#txtAnually').enable(false);
//            $('#cmbQuarter').enable(true);
//            $('#txtDateFrom').enable(false);
//            $('#txtDateTo').enable(false);
//            $('#cmbQuarter').enable(false);

//            $('#txtCurrentDate').val('')

//        } else if (id == "radioDate") {
//            $('#txtDateFrom').val(currentDate);
//            $('#txtDateTo').val(currentDate);
//            $('#cmbMonth').enable(false);
//            $('#txtAnually').enable(false);
//            $('#cmbQuarter').enable(false);
//            $('#txtDateFrom').enable(true);
//            $('#txtDateTo').enable(true);
//        }
//        else if (id == "radioAnnual") {
//            if ($('#txtAnually').val() == "")
//                $('#cmbMonth').enable(false);
//            $('#cmbQuarter').enable(false);
//            $('#cmbMonth').enable(false);
//            $('#txtAnually').enable(true);

//        }
//        else if (id == "radioQuarter") {
//            $('#cmbMonth').enable(false);
//            $('#txtAnually').enable(false);
//            $('#cmbQuarter').enable(true);
//        }
//        else if (id == "radioAsOf") {
//            getDate();
//            $('#txtDateFrom').enable(false);
//            $('#txtDateTo').enable(false);
//        }
//        else if (id == "radioForthePeriod") {

//        }


//    }

//    function ClearDateFilter() {
//        $("#cmbMonth").val("1");
//        $("#cmbQuarter").val("1");

//        if ($("#txtAnually").val() == "")
//            $("#txtAnually").val(currentYear);

//        $("#txtDateFrom").val("");
//        $("#txtDateTo").val("");
//    }
//});


$(document).on("change", "input[name='datefilter']", function (e) {
    //DisableFields();
    $('#cmbSortBy').enable(true);
    $('#cmbType').enable(true);
    //ClearDateFilter();
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

        }
        else if (id == "radioQuarter") {
            $('#cmbMonth').enable(false);
            $('#txtAnually').enable(false);
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

}); $(document).on("change", "input[name='datefilter']", function (e) {
    //DisableFields();
    $('#cmbSortBy').enable(true);
    $('#cmbType').enable(true);
    //ClearDateFilter();
    if ($(this).prop("checked")) {
        var id = $(this).attr("id")

        if (id == "radioMonthly") {

            $('#txtCurrrentTo').enable(false);
            $('#cmbMonth').enable(true);
            $(".nwCustBtn").enable(true);
            $('#radioDate').enable(true);
            $('#txtCurrentDate').val('')

            $("#txtDateFrom").enable(false);
            $('#txtDateTo').enable(false);
            $('#txtDateFrom').val('');
            $('#txtDateTo').val('');

        }
        else if (id == "radioDate") {
            $('#txtDateFrom').enable(true);
            $('#txtDateTo').enable(true);
            $('#txtDateFrom').val(currentDate);
            $('#txtDateTo').val(currentDate);
            $(".nwCustBtn").enable(false);
            $('#radioDate').enable(true);
            $('#txtCurrrentTo').enable(false);
            $('#txtCurrentDate').val('')
        }
        else if (id == "radioAnnual") {
            if ($('#txtAnually').val() == "")
                $('#txtCurrrentTo').enable(false);
            $('#txtAnually').val(currentYear);

            $('#txtAnually').enable(true);
            $(".nwCustBtn").enable(false);
            $('#radioDate').enable(true);
            $('#txtCurrentDate').val('');

            $("#txtDateFrom").enable(false);
            $('#txtDateTo').enable(false);
            $('#txtDateFrom').val('');
            $('#txtDateTo').val('');
        }
        else if (id == "radioQuarter") {
            $('#cmbQuarter').enable(true);
            $('#txtCurrrentTo').enable(true);

            $(".nwCustBtn").enable(false);
            $('#radioDate').enable(true);
            $('#txtCurrrentTo').enable(false);
            $('#txtCurrentDate').val('');

            $("#txtDateFrom").enable(false);
            $('#txtDateTo').enable(false);
            $('#txtDateFrom').val('');
            $('#txtDateTo').val('');
        }
        else if (id == "radioAsOf") {
            $('#cmbQuarter').enable(true);

            $(".nwCustBtn").enable(false);
            $('#radioDate').enable(true);
            $('#cmbSortBy').enable(true);
            $('#txtCurrrentTo').enable(true);
            $('#txtCurrentDate').enable(false);
            $('#cmbQuarter').enable(false);
            $('#cmbType').enable(true);
            getDate();
        }
        else if (id == "radioForthePeriod") {
            $('#cmbQuarter').enable(true);
            clearlookupval();
            $(".nwCustBtn").enable(false);
            $('#radioDate').enable(true);
            $('#cmbQuarter').enable(false);
            $('#txtCurrrentTo').enable(true);
            $('#txtCurrentDate').enable(false);
            $("#radioDate").enable(true);
            //$('#txtCurrentDate').val('')
        }
    }
});

function ClearDateFilter() {
    $("#cmbMonth").val("1");
    $("#cmbQuarter").val("1");
    
    if($("#txtAnually").val() == "")
        $("#txtAnually").val(currentYear);
    
    $("#txtDateFrom").val("");
    $("#txtDateTo").val("");
}

 


$(document).on("blur", "#txtAnually", function() {   
    if($(this).val() == ""){
         $(this).val(currentYear)
    } 
    
    ReloadMonth()
    ReloadQuarter()
});

function func_LookUpInitialize(dimP) {
    cust_GetPara();
    
    if (dimP == "Payee") {
        payeeType();
    } 
    
}
 

function payeeType() {
    var payee = "";
    
    if ($('#radioAllPayee').prop('checked')==true) {
        payee = "all";
    } else if ($('#radioSupplier').prop('checked') == true) {
        payee = "Supplier";
    } else if ($('#radioEmployee').prop('checked') == true) {
        payee = "Employee";
    }
    nwParameter_Add("PayeeType", payee);
}
 
function DebitMemoType() {
    var DebitMemoType = "";

    if ($('#radioAll').prop('checked') == true) {
        DebitMemoType = "all";
    } else if ($('#radioTrade').prop('checked') == true) {
        DebitMemoType = "trade";

    } 
    nwParameter_Add("DebitMemoType", DebitMemoType);
}



function ReloadQuarter(){ 
$('#cmbQuarter').html("");
$('#cmbQuarter').append("<option value='1'>1st Quarter, "+ $('#txtAnually').val()+"</option>");
$('#cmbQuarter').append("<option value='2'>2nd Quarter, "+ $('#txtAnually').val()+"</option>");
$('#cmbQuarter').append("<option value='3'>3rd Quarter, "+ $('#txtAnually').val()+"</option>");
$('#cmbQuarter').append("<option value='4'>4th Quarter, "+ $('#txtAnually').val()+"</option>"); 
}

function ReloadMonth(){ 
$('#cmbMonth').html("");
$('#cmbMonth').append("<option value='01'>January, "+ $('#txtAnually').val()+"</option>");
$('#cmbMonth').append("<option value='02'>February, "+ $('#txtAnually').val()+"</option>");
$('#cmbMonth').append("<option value='03'>March, "+ $('#txtAnually').val()+"</option>");
$('#cmbMonth').append("<option value='04'>April, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='05'>May, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='06'>June, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='07'>July, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='08'>August, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='09'>September, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='10'>October, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='11'>November, "+ $('#txtAnually').val()+"</option>"); 
$('#cmbMonth').append("<option value='12'>December, "+ $('#txtAnually').val()+"</option>"); 
}


function getDateFilter(){
   var dateFilterFrom = "";
   var dateFilterTo = ""; 
   if($('#radioMonthly').prop("checked")){
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
   
   if($('#radioAnnual').prop("checked")){
        dateFilterFrom = $('#txtAnually').val() + "-1-1";
        dateFilterTo = $('#txtAnually').val() + "-12-31";
   } 
   
   if($('#radioQuarter').prop("checked")){
        if($('#cmbQuarter').val() == 1){
            dateFilterFrom = $('#txtAnually').val() + "-1-1";
            dateFilterTo = $('#txtAnually').val() + "-3-31";
        }
        if($('#cmbQuarter').val() == 2){
            dateFilterFrom = $('#txtAnually').val() + "-4-1";
            dateFilterTo = $('#txtAnually').val() + "-6-30";
        }
        if($('#cmbQuarter').val() == 3){
            dateFilterFrom = $('#txtAnually').val() + "-7-1";
            dateFilterTo = $('#txtAnually').val() + "-9-30";
        }
        if($('#cmbQuarter').val() == 4){
            dateFilterFrom = $('#txtAnually').val() + "-10-1";
            dateFilterTo = $('#txtAnually').val() + "-12-31";
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
   //if($(this).val() == "")
   //     {
   //          $('#txtDateTo').val("")
   //          return;
   //     }
        
   // if($(this).val() > $('#txtDateTo').val())
   //     $('#txtDateTo').val($(this).val())

    if ($(this).val() == "") {
        $('#txtDateTo').val("")
        return;
    }
    var dateto = new Date($('#txtDateTo').val());
    var datefrom = new Date($(this).val());
    if (dateto < datefrom)
        $('#txtDateTo').val($(this).val())
});


$(document).on("change", "input[name='PayeeType']", function (e) {
    $('div.atlContainer[nwtype="Payee"] div.innertext').html("")
});
 

$(document).on("change", "#txtDateTo", function(e) { 
    // if($(this).val() == "")
    //    {
    //         $('#txtDateFrom').val("")
    //         return;
    //    }
        
    //if($(this).val() < $('#txtDateFrom').val()) 
    //    $('#txtDateFrom').val($(this).val())

    if ($(this).val() == "") {
        $('#txtDateFrom').val("")
        return;
    }
    var dateto = new Date($(this).val());
    var datefrom = new Date($('#txtDateFrom').val());
    if (dateto < datefrom)
        $('#txtDateFrom').val($(this).val())
});

$(document).on("change", "#chckSubAccount", function(e) { 
    $('#lugPerSubAccount input').val(""); 
    if($(this).prop("checked"))
        $('#lugPerSubAccount').removeClass("adisabled");
    else
        $('#lugPerSubAccount').addClass("adisabled");
 
});


$(document).on("change", "#chckMainAccount", function(e) { 
     $('#lugPerMainAccount input').val("");  
    if($(this).prop("checked"))
        $('#lugPerMainAccount').removeClass("adisabled");
    else
        $('#lugPerMainAccount').addClass("adisabled");  
        
});



$('#rdncreated').click(function () {
    if ($('#rdncreated').prop("checked")) {
        $('#lugcreatedby').removeClass('adisabled');
    }
    else {
        $('#lugcreatedby').addClass('adisabled');
    }
});


$(document).on("change", "input[name='filterby']", function (e) {
    $('#idvallugdocfrom').val('');
    $('#descvallugdocfrom').val('');
    $('#idvallugdocto').val('');
    $('#descvallugdocto').val('');
    $('#idvallugcreatedby').val('');
    $('#descvallugcreatedby').val('');
    $('#idvallugstatus').val('');
    $('#descvallugstatus').val('');
    
       if ($('#rdndocno').prop("checked")) {
           $('#lugdocfrom').removeClass('adisabled');
           $('#lugdocto').removeClass('adisabled');
            $('#lugcreatedby').addClass('adisabled');
            $('#lugstatus').addClass('adisabled');
        }
       else if ($('#rdnstatus').prop("checked")) {
           $('#lugstatus').removeClass('adisabled');
           $('#lugdocfrom').addClass('adisabled');
           $('#lugdocto').addClass('adisabled');
           $('#lugcreatedby').addClass('adisabled');
       }
       else if($('#rdncreated').prop("checked")){
           $('#lugstatus').addClass('adisabled');
           $('#lugdocfrom').addClass('adisabled');
           $('#lugdocto').addClass('adisabled');
           $('#lugcreatedby').removeClass('adisabled');
       }
       
       
});


function newclearall()
{
    $('#idvallugto').val('');
    $('#idvallugfrom').val('');
    $('#descvallugto').val('');
    $('#descvallugfrom').val('');
    $('#txtDateFrom1').val('');
    $('#txtdateto1').val('');
    $('#idvallugcreatedby').val('');
    $('#descvallugcreatedby').val('');
    $('#idvallugstatus').val('');
    $('#descvallugstatus').val('');
    $('#txtDateFrom').val('');
    $('#txtDateTo').val('');
    $('#cmbluglocacc').find('option').remove();
    $('.spantext').closest('div.spantext').remove();
    
}

$(document).on("click", ".btn-approvalhist", function (e) {
    var id = crnwTR.find("td:eq(" + SPR_DOCNUM + ")").text();
    nwParameter_Add("subjournalid", id);
    if (id.length > 0) {
        $('#txtdocno').val(id);
     func_ActionDriven("OpenHistory", true);
    }
    return false;
});

$(document).on("click", ".btn-details", function (e) {
    var id = crnwTR.find("td:eq(" + SPR_DOCNUM + ")").text();
    nwParameter_Add("subjournalid", id);
    if (id.length > 0) {
        var title = "General Journal Entry";
        var fullength = "../../../GL/DocumentEntry/GLGeneralJournalEntry/GLGeneralJournalEntry.aspx?subjid=" + id + "&transaction=qweqw";
        $('#nwGeneratedetails .BoxTitle').text(title);
        $('#frame_details').attr("src", fullength);
        nwPopupForm_ShowModal("nwGeneratedetails");
    }
    return false;
});

function notemptyhistory()
{
        nwPopupForm_ShowModal("nwGenerateDissapprovalH");
    $('#txtnwgRemarks').enable(false);
    $('#chknwgRemarks').enable(false);   

}

function checkremarks() {
    crnwTable = $("#nwGrid2Con .tblGridBody");
    var length = crnwTable.find("tr").length;


    for (var i = 0; i < length; i++) {
        var identifyier = crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKS + ") textarea").val();
        if (identifyier != "") {

            crnwTable.find("tr:eq(" + i + ")").find("td:eq(" + SPR_REMARKS + ") button").addClass("colorgreen");
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

    currTR = $(this).attr("id");
    lookUpCustomize(currTR, 2);
});
//function defaultonload()
//{
//    $('#cmbluglocacc').append("<option value = '" + defaultloc + "'> " + defaultloc + " </ option >");
//}

function defaultonload(code, description) {
    $('div.atlContainer[nwtype="LocationwithAccountableForms"] div.innertext').append(GenerateLookupListDataHTML(code, description));
}

$(function () {

    $("#settingstabs").tabs();

});


function GenerateLookupListDataHTML(xvalue, xdisplay) {

    return '<div class="spantext" nwcode="' + xvalue + '" class="nwCuz013">' + xdisplay + '<span class="classx">x</span></div>';

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
    $('#lugdocfrom input').val("");
    $('#lugdocto input').val("");
    $('#lugcreatedby input').val("");
    $('#lugstatus input').val("");

    if ($('.atl_Payee').text().trim() == "") {
        $('#lugdocfrom,#lugdocto').enable(true);
    } else {
        $('#lugdocfrom,#lugdocto').enable(false);
    }

});






$(document).on('change', '.spantext', function () { 
    if ($('.atl_Payee').text().trim() == "") {
        $('#lugdocfrom,#lugdocto').enable(true);
    } else {
        $('#lugdocfrom,#lugdocto').enable(false);
    }

});

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


function filter2x() {

    var len = $('div.atlContainer').length;
    for (var i = 0; i < len; i++) {
        var xkey = $('div.atlContainer:eq(' + i + ')').attr('nwtype');
        var xvalue = "''";
        var lencode = $('.atlContainer:eq(' + i + ')').find('div.spantext').length;
        for (var j = 0; j < lencode; j++) {
            var dx = $('.atlContainer:eq(' + i + ') div.spantext:eq(' + j + ')').attr('nwcode');
            if (dx.length>0) {
                if (xvalue = "''") {
                    xvalue = "'" + dx + "'";
                }
                else {

                    xvalue += ",";
                    xvalue += "'" + dx + "'";
                }
            }
        }

        nwParameter_Add("filter", xvalue);
    }


};



function getloadfilter() {
    var count = $('.atl_LocationwithAccountableForms .spantext').length;
    crnwTable = $("#nwGridMainCon .tblGridBody");
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.atl_LocationwithAccountableForms .spantext:eq(' + i + ')').text().substring(0, $('.spantext:eq(' + i + ')').text().length - 1);

        if (loc.length > 0) {
            allloc += loc + ";";
        }
    }
    allloc = allloc.substring(0, allloc.length - 1)
    if (allloc.length == 0) {
        crnwTable.find("tr:eq(4)").find('td:eq(1) ').text('LOCATION NAME: All Locations');
        nwParameter_Add("LocationFilter", "All Locations");
    } else {
        crnwTable.find("tr:eq(4)").find('td:eq(1) ').text('LOCATION NAME: ' + allloc);
        nwParameter_Add("LocationFilter", allloc);
    }

}


function getYearGridHeader(type) {
    switch (type) {
        case 1:
            return "As of Date: " + $('.isNumber.hasDatepicker').val();
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



$(document).on('click', '.nwgbtnRemarks', function () {
    $('#btnnwgRemarks').enable(false);
    $('#txtnwgRemarks').enable(false);
    $('#chknwgRemarks').enable(false);
});


function getloadfilterexport() {
    var count = $('.spantext').length;
    crnwTable = $("#nwGridMainCon .tblGridBody");
    var allloc = "";
    for (var i = 0; i <= count; i++) {
        var loc = $('.spantext:eq(' + i + ')').text().substring(0, $('.spantext:eq(' + i + ')').text().length - 1);

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

function ButtonSetText(startingRow)
{
    var isSummary = $(`#radioSummary`).is(':checked');


    $(`#nwGridView .tblGridBody tr:nth-child(${startingRow}) td:nth-child(${(isSummary ? SPR_REVIEWAPPROVE_DTLS_SUM : SPR_REVIEWAPPROVE_DTLS_DTL) + 1})`).text(SPRNAME_REVIEWAPPROVE_DTLS);
    $(`#nwGridView .tblGridBody tr:nth-child(${startingRow}) td:nth-child(${(isSummary ? SPR_REVIEWAPPROVE_DTLS_SUM : SPR_REVIEWAPPROVE_DTLS_DTL) + 1})`).removeClass("btnGray");

    $(`#nwGridView .tblGridBody tr:nth-child(${startingRow}) td:nth-child(${(isSummary ? SPR_VIEWFORM_DTLS_SUM : SPR_VIEWFORM_DTLS_DTL) + 1})`).text(SPRNAME_VIEWFORM_DTLS);
    $(`#nwGridView .tblGridBody tr:nth-child(${startingRow}) td:nth-child(${(isSummary ? SPR_VIEWFORM_DTLS_SUM : SPR_VIEWFORM_DTLS_DTL) + 1})`).removeClass("btnGray");

    $(`#nwGridView .tblGridBody tr:nth-child(${startingRow}) td:nth-child(${(isSummary ? SPR_VIEWENTRYSCREEN_SUM : SPR_VIEWENTRYSCREEN_DTL) + 1})`).text(SPRNAME_VIEWENTRYSCREEN);
    $(`#nwGridView .tblGridBody tr:nth-child(${startingRow}) td:nth-child(${(isSummary ? SPR_VIEWENTRYSCREEN_SUM : SPR_VIEWENTRYSCREEN_DTL) + 1})`).removeClass("btnGray");

    $(`#nwGridView .tblGridBody tr:nth-child(${startingRow}) td:nth-child(${(isSummary ? SPR_REVIEWATTACH_SUM : SPR_REVIEWATTACH_DTL) + 1})`).text(SPRNAME_REVIEWATTACH);
    $(`#nwGridView .tblGridBody tr:nth-child(${startingRow}) td:nth-child(${(isSummary ? SPR_REVIEWATTACH_SUM : SPR_REVIEWATTACH_DTL) + 1})`).removeClass("btnOrange");
}

$(document).on('click', '.ViewEntryScreen', function () {
    var isSummary = $(`#radioSummary`).is(':checked');
    var docno = $(`#nwGridView-nwData tr:eq(${crnwTR.index() - 1}) td:eq(${isSummary ? SPR_DEBITMEMONO_SUM : SPR_DEBITMEMONO_DTL})`).text()

    var fullength = "";
    var title = "";

    nwParameter_Add("urlPath", window.location.origin);

    if (hasDebitMemoNo(docno) >= 0) {

        nwLoading_Start("xbtnVwAttach", crLoadingHTML);

        title = "View Entry Screen";
        fullength = "../../../AP/DocumentEntry/APDebitMemoEntry/APDebitMemoEntry.aspx?nwDocno=" + encodeURI(docno);
        $('.nwmenuFrame').attr("src", fullength);

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "98%" });
        $("#nwPopWindow").css({ "min-height": "98%" });
        nwPopupForm_ShowModal("nwPopWindow");
        $('.dimbgNWnwPopWindow').removeClass('openn');

        nwLoading_End('xbtnVwAttach');
    }
});

$(document).on('click', '.ViewForm_dtls', function () {

    var isSummary = $(`#radioSummary`).is(':checked');
    var docno = $(`#nwGridView-nwData tr:eq(${crnwTR.index() - 1}) td:eq(${isSummary ? SPR_DEBITMEMONO_SUM : SPR_DEBITMEMONO_DTL})`).text()

    if (hasDebitMemoNo(docno) >= 0) {
        nwLoading_Start('LoadViewForm');
        nwParameter_Add("docno", docno);
        func_ActionDriven("actLoadViewForm");
    }

});

$(document).on('click', '.ReviewAttach', function () {

    var isSummary = $(`#radioSummary`).is(':checked');
    var fullength = "";
    var title = "";

    nwParameter_Add("urlPath", window.location.origin);
    var docno = $(`#nwGridView-nwData tr:eq(${crnwTR.index() - 1}) td:eq(${isSummary ? SPR_DEBITMEMONO_SUM : SPR_DEBITMEMONO_DTL})`).text()

    if (hasAttachedDocuments(docno) >= 0) {
        //nwLoading_Start("xbtnVwAttach", crLoadingHTML);

        title = "View Attachment(s)";
        fullength = `../../../DC/DataSetup/DCViewAttachment/DCViewAttachment.aspx?nwDocno=${encodeURI(docno)}&isView=true`;

        $('.nwmenuFrame').attr("src", fullength);

        nwPopupForm_Create("nwPopWindow", true, fullength);
        $('#nwPopWindow .BoxTitle').text(title);

        $("#nwPopWindow").css({ "min-width": "98%" });
        $("#nwPopWindow").css({ "min-height": "98%" });
        nwPopupForm_ShowModal("nwPopWindow");
        $('.dimbgNWnwPopWindow').removeClass('openn');

        //nwLoading_End("xbtnVwAttach");
    }
});


function hasAttachedDocuments(docno) {
    return jsonreports.findIndex(i => i["Debit Memo No."] == docno && i["HASREVIEWATTACH"] == 1);
}

function hasApprovalDetails(docno) {
    return jsonreports.findIndex(i => i["Debit Memo No."] == docno && i["HASAPPROVAL_DTLS"] == 1);
}

function hasDebitMemoNo(docno) {
    return jsonreports.findIndex(i => i["Debit Memo No."] == docno);
}


function ChangeBackGroundColor() {

    var isSummary = $(`#radioSummary`).is(':checked');
    var length = nwGridMainCon_Book.ActiveSheet.GetMaxRow();;
    var docno = "";
    nwGridMainCon_Book.ActiveSheet.RenderStatus = false;
    for (var i = 10; i < length - 3 ; i++) {
        docno = nwGridMainCon_Book.ActiveSheet.GetValue(isSummary ? (SPR_DEBITMEMONO_SUM-1) : (SPR_DEBITMEMONO_DTL-1), i);
        //docno = $(`#nwGridView .tblGridBody tr:eq(${i}) td:eq(${isSummary ? SPR_DEBITMEMONO_SUM : SPR_DEBITMEMONO_DTL})`).text();
        nwGridMainCon_Book.ActiveSheet.SetText(isSummary ? (SPR_REVIEWATTACH_SUM - 1) : (SPR_REVIEWATTACH_DTL - 1), 3, "...");
        nwGridMainCon_Book.ActiveSheet.SetTextAlign(isSummary ? (SPR_REVIEWATTACH_SUM - 1) : (SPR_REVIEWATTACH_DTL - 1), 2, "center");

        nwGridMainCon_Book.ActiveSheet.SetText(isSummary ? (SPR_REVIEWAPPROVE_DTLS_SUM - 1) : (SPR_REVIEWAPPROVE_DTLS_DTL - 1), 3, "...");
        nwGridMainCon_Book.ActiveSheet.SetTextAlign(isSummary ? (SPR_REVIEWAPPROVE_DTLS_SUM - 1) : (SPR_REVIEWAPPROVE_DTLS_DTL - 1), 2, "center");

        nwGridMainCon_Book.ActiveSheet.SetText(isSummary ? (SPR_VIEWFORM_DTLS_SUM - 1) : (SPR_VIEWFORM_DTLS_DTL - 1), 3, "...");
        nwGridMainCon_Book.ActiveSheet.SetTextAlign(isSummary ? (SPR_VIEWFORM_DTLS_SUM - 1) : (SPR_VIEWFORM_DTLS_DTL - 1), 2, "center");

        if (hasAttachedDocuments(docno) >= 0) {
            
            nwGridMainCon_Book.ActiveSheet.SetBackground(isSummary ? (SPR_REVIEWATTACH_SUM - 1) : (SPR_REVIEWATTACH_DTL - 1), i, "green");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(isSummary ? (SPR_REVIEWATTACH_SUM - 1) : (SPR_REVIEWATTACH_DTL - 1), i, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(isSummary ? (SPR_REVIEWATTACH_SUM - 1) : (SPR_REVIEWATTACH_DTL - 1), i, "bold");
            //$(`#nwGridView .tblGridBody tr:eq(${i}) td:eq(${isSummary ? SPR_REVIEWATTACH_SUM : SPR_REVIEWATTACH_DTL})`).addClass("btnGreen");
            //$(`#nwGridView .tblGridBody tr:eq(${i}) td:eq(${isSummary ? SPR_REVIEWATTACH_SUM : SPR_REVIEWATTACH_DTL})`).removeClass("btnGray");
        }
        else {
            nwGridMainCon_Book.ActiveSheet.SetBackground(isSummary ? (SPR_REVIEWATTACH_SUM - 1) : (SPR_REVIEWATTACH_DTL - 1), i, "gray");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(isSummary ? (SPR_REVIEWATTACH_SUM - 1) : (SPR_REVIEWATTACH_DTL - 1), i, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(isSummary ? (SPR_REVIEWATTACH_SUM - 1) : (SPR_REVIEWATTACH_DTL - 1), i, "bold");
        }


        if (hasApprovalDetails(docno) >= 0) {
            nwGridMainCon_Book.ActiveSheet.SetBackground(isSummary ? (SPR_REVIEWAPPROVE_DTLS_SUM - 1) : (SPR_REVIEWAPPROVE_DTLS_DTL - 1), i, "green");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(isSummary ? (SPR_REVIEWAPPROVE_DTLS_SUM - 1) : (SPR_REVIEWAPPROVE_DTLS_DTL - 1), i, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(isSummary ? (SPR_REVIEWAPPROVE_DTLS_SUM - 1) : (SPR_REVIEWAPPROVE_DTLS_DTL - 1), i, "bold");
            //$(`#nwGridView .tblGridBody tr:eq(${i}) td:eq(${isSummary ? SPR_REVIEWAPPROVE_DTLS_SUM : SPR_REVIEWAPPROVE_DTLS_DTL})`).addClass("btnGreen");
            //$(`#nwGridView .tblGridBody tr:eq(${i}) td:eq(${isSummary ? SPR_REVIEWAPPROVE_DTLS_SUM : SPR_REVIEWAPPROVE_DTLS_DTL})`).removeClass("btnGray");
        }
        else
        {
            nwGridMainCon_Book.ActiveSheet.SetBackground(isSummary ? (SPR_REVIEWAPPROVE_DTLS_SUM - 1) : (SPR_REVIEWAPPROVE_DTLS_DTL - 1), i, "gray");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(isSummary ? (SPR_REVIEWAPPROVE_DTLS_SUM - 1) : (SPR_REVIEWAPPROVE_DTLS_DTL - 1), i, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(isSummary ? (SPR_REVIEWAPPROVE_DTLS_SUM - 1) : (SPR_REVIEWAPPROVE_DTLS_DTL - 1), i, "bold");
        }


        if (hasDebitMemoNo(docno) >= 0) {
            nwGridMainCon_Book.ActiveSheet.SetBackground(isSummary ? (SPR_VIEWFORM_DTLS_SUM - 1) : (SPR_VIEWFORM_DTLS_DTL - 1), i, "green");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(isSummary ? (SPR_VIEWFORM_DTLS_SUM - 1) : (SPR_VIEWFORM_DTLS_DTL - 1), i, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(isSummary ? (SPR_VIEWFORM_DTLS_SUM - 1) : (SPR_VIEWFORM_DTLS_DTL - 1), i, "bold");

            nwGridMainCon_Book.ActiveSheet.SetBackground(isSummary ? (SPR_VIEWENTRYSCREEN_SUM - 1) : (SPR_VIEWENTRYSCREEN_DTL - 1), i, "green");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(isSummary ? (SPR_VIEWENTRYSCREEN_SUM - 1) : (SPR_VIEWENTRYSCREEN_DTL - 1), i, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(isSummary ? (SPR_VIEWENTRYSCREEN_SUM - 1) : (SPR_VIEWENTRYSCREEN_DTL - 1), i, "bold");

            //$(`#nwGridView .tblGridBody tr:eq(${i}) td:eq(${isSummary ? SPR_VIEWFORM_DTLS_SUM : SPR_VIEWFORM_DTLS_DTL})`).addClass("btnGreen");
            //$(`#nwGridView .tblGridBody tr:eq(${i}) td:eq(${isSummary ? SPR_VIEWFORM_DTLS_SUM : SPR_VIEWFORM_DTLS_DTL})`).removeClass("btnGray");

            //$(`#nwGridView .tblGridBody tr:eq(${i}) td:eq(${isSummary ? SPR_VIEWENTRYSCREEN_SUM : SPR_VIEWENTRYSCREEN_DTL})`).addClass("btnGreen");
            //$(`#nwGridView .tblGridBody tr:eq(${i}) td:eq(${isSummary ? SPR_VIEWENTRYSCREEN_SUM : SPR_VIEWENTRYSCREEN_DTL})`).removeClass("btnGray");

        }
        else
        {
            nwGridMainCon_Book.ActiveSheet.SetBackground(isSummary ? (SPR_VIEWFORM_DTLS_SUM - 1) : (SPR_VIEWFORM_DTLS_DTL - 1), i, "gray");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(isSummary ? (SPR_VIEWFORM_DTLS_SUM - 1) : (SPR_VIEWFORM_DTLS_DTL - 1), i, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(isSummary ? (SPR_VIEWFORM_DTLS_SUM - 1) : (SPR_VIEWFORM_DTLS_DTL - 1), i, "bold");

            nwGridMainCon_Book.ActiveSheet.SetBackground(isSummary ? (SPR_VIEWENTRYSCREEN_SUM - 1) : (SPR_VIEWENTRYSCREEN_DTL - 1), i, "gray");
            nwGridMainCon_Book.ActiveSheet.SetTextColor(isSummary ? (SPR_VIEWENTRYSCREEN_SUM - 1) : (SPR_VIEWENTRYSCREEN_DTL - 1), i, "white");
            nwGridMainCon_Book.ActiveSheet.SetBold(isSummary ? (SPR_VIEWENTRYSCREEN_SUM - 1) : (SPR_VIEWENTRYSCREEN_DTL - 1), i, "bold");

        }
    }

    nwGridMainCon_Book.ActiveSheet.RenderStatus = true;
}

function nwgrid_PaginationNavDone(gridID) {
    var isContinue = true;
    ChangeBackGroundColor();
    return isContinue;
}

$(document).on('click', '.ReviewApprove', function () {
   
    var isSummary = $(`#radioSummary`).is(':checked');
    var docno = $(`#nwGridView .tblGridBody tr:eq(${crnwTR.index() - 1}) td:eq(${isSummary ? SPR_DEBITMEMONO_SUM : SPR_DEBITMEMONO_DTL})`).text();

    if (hasDebitMemoNo(docno) >= 0) {
        nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
        nwPopupForm_ShowModal("nwRemarks");
        nwParameter_Add("docno", docno)
        func_ActionDriven("actViewApprovalDetails", false);
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

function p8Spread_Click(canvasID, row, col) {
    nwGridMainCon_Book.ActiveSheet.RenderStatus = false;
    var reportType = 0;
    var docno = '', trantype = '', menuitem = '', menulink = '', printingid = '', printingname = '';
    var isSummary = $(`#radioSummary`).is(':checked');
    

    if (row >= 10) {
        docno = nwGridMainCon_Book.ActiveSheet.GetValue(isSummary ? (SPR_DEBITMEMONO_SUM-1) : (SPR_DEBITMEMONO_DTL-1), row);

        if (col == (isSummary ? (SPR_REVIEWAPPROVE_DTLS_SUM - 1) : (SPR_REVIEWAPPROVE_DTLS_DTL - 1))) {
            
            if (hasDebitMemoNo(docno) >= 0) {
                nwLoading_Start('xbtnApprvDtls', crLoadingHTML);
                nwPopupForm_ShowModal("nwRemarks");
                nwParameter_Add("docno", docno)
                func_ActionDriven("actViewApprovalDetails", false);
            }
        }
        if (col == (isSummary ? (SPR_VIEWFORM_DTLS_SUM - 1) : (SPR_VIEWFORM_DTLS_DTL - 1))) {
          
            if (hasDebitMemoNo(docno) >= 0) {
                nwLoading_Start('LoadViewForm');
                nwParameter_Add("docno", docno);
                func_ActionDriven("actLoadViewForm");
            }
        }
        if (col == (isSummary ? (SPR_VIEWENTRYSCREEN_SUM - 1) : (SPR_VIEWENTRYSCREEN_DTL - 1))) {
            
            var fullength = "";
            var title = "";

            nwParameter_Add("urlPath", window.location.origin);

            if (hasDebitMemoNo(docno) >= 0) {

                nwLoading_Start("xbtnVwAttach", crLoadingHTML);

                title = "View Entry Screen";
                fullength = "../../../AP/DocumentEntry/APDebitMemoEntry/APDebitMemoEntry.aspx?nwDocno=" + encodeURI(docno);
                $('.nwmenuFrame').attr("src", fullength);

                nwPopupForm_Create("nwPopWindow", true, fullength);
                $('#nwPopWindow .BoxTitle').text(title);

                $("#nwPopWindow").css({ "min-width": "98%" });
                $("#nwPopWindow").css({ "min-height": "98%" });
                nwPopupForm_ShowModal("nwPopWindow");
                $('.dimbgNWnwPopWindow').removeClass('openn');

                nwLoading_End('xbtnVwAttach');
            }

        }
        if (col == (isSummary ? (SPR_REVIEWATTACH_SUM - 1) : (SPR_REVIEWATTACH_DTL - 1))) {

            var fullength = "";
            var title = "";

            nwParameter_Add("urlPath", window.location.origin);

            if (hasAttachedDocuments(docno) >= 0) {
                //nwLoading_Start("xbtnVwAttach", crLoadingHTML);

                title = "View Attachment(s)";
                fullength = `../../../DC/DataSetup/DCViewAttachment/DCViewAttachment.aspx?nwDocno=${encodeURI(docno)}&isView=true`;

                $('.nwmenuFrame').attr("src", fullength);

                nwPopupForm_Create("nwPopWindow", true, fullength);
                $('#nwPopWindow .BoxTitle').text(title);

                $("#nwPopWindow").css({ "min-width": "98%" });
                $("#nwPopWindow").css({ "min-height": "98%" });
                nwPopupForm_ShowModal("nwPopWindow");
                $('.dimbgNWnwPopWindow').removeClass('openn');

                //nwLoading_End("xbtnVwAttach");
            }

            
        }
       

    }

    nwGridMainCon_Book.ActiveSheet.RenderStatus = true;

}
