
var currentYear = "";
var currentDate = "";
var lookupFilter = "";
var currTR
var BasedTitle = "";
var lookupFilter1 = "";
var defaultloc = "";


var nwGridMainCon_Book;
var nwGridMainCon_Sheet;

var 
SPR_DOCNUM = 1,
SPR_VALUEDPOSTINGDATE = 2,
SPR_CREATEDBY = 3,
SPR_DATECREATED = 4,
SPR_MODIFIEDBY = 5,
SPR_DATEMODIFIED = 6,
SPR_PRINTEDBY = 7,
SPR_DATEPRINTED = 8,
SPR_STATUSgrid1 = 9,
SPR_DETAILS = 10,
SPR_APPROVALHIST = 11;
var
       SPR_DOCNO = 1,
       SPR_APPROVERCODE = 2,
       SPR_APPROVERDESC = 3,
       SPR_DATE = 4,
       SPR_STATUS = 5,
       SPR_REASON = 6,
       SPR_REMARKS = 7;
//var greenrow = new Array();
var lookupfilter = "''";
$(document).on("click", "button", function () {
    return false;
});
 
function func_Reload() {
    LoadStringsCases();
    crLnk = GetCurrentURL() + "APAlphalistReport_Gateway";
    crLnkGateKey = "APAlphalistReport";
    $("#settingstabs").loadAddtoList({ list: ["Location with Accountable Forms", "ATC", "Payee"], icon: true });
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

    $('#lugACT').enable(false);
    $('#lugSupplier').enable(false);

    $('#txtCurrentDate').val('')
    $('#cmbMonth').enable(true);
    $('#txtAnually').enable(false);
    $('#cmbQuarter').enable(true);
    $('#txtDateFrom').enable(false);
    $('#txtDateTo').enable(false);
    $('#cmbQuarter').enable(false);

    nwParameter_Add("txtCode", $("#txtCode").val());
     
    ToolBoxGetData = false;
    //$("#nwGrid1").find("input,button,textarea").attr("disabled", "disabled");
    //nwPopupForm_Create("nwmodal1");
    
    //nwPopupForm_Modal("nwmodal1");
    
    
  

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
    if ($('#radioMonthly').prop('checked')) {
        if ($('#cmbMonth').val() == 1) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
        }
        if ($('#cmbMonth').val() == 2) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
            if (parseInt($('#txtAnually').val()) % 4 == 0) {
                nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-29");
            }
            else {
                nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-28");
            }
        }
        if ($('#cmbMonth').val() == 3) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
        }
        if ($('#cmbMonth').val() == 4) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30");
        }
        if ($('#cmbMonth').val() == 5) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
        }
        if ($('#cmbMonth').val() == 6) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30");
        }
        if ($('#cmbMonth').val() == 7) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
        }
        if ($('#cmbMonth').val() == 8) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
        }
        if ($('#cmbMonth').val() == 9) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30");
        }
        if ($('#cmbMonth').val() == 10) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
        }
        if ($('#cmbMonth').val() == 11) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30");
        }
        if ($('#cmbMonth').val() == 12) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
        }
    }
    else if ($('#radioAnnual').prop('checked'))
    {
        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-1-1");
        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-12-31");
    }
    else if ($('#radioQuarter').prop('checked')) {
        if ($('#cmbQuarter').val() == 1) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-1-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-3-31");
            }
        if ($('#cmbQuarter').val() == 2) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-4-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-6-30");
        }
        if ($('#cmbQuarter').val() == 3) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-7-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-9-30");
        }
        if ($('#cmbQuarter').val() == 4) {
            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-10-1");
            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-12-31");
        }
    }
    else if ($('#radioDate').prop('checked')) {
        nwParameter_Add("datefilterfrom", $('#txtDateFrom').val());
        nwParameter_Add("datefilterto", $('#txtDateTo').val());
    }
     

    lookupFilter1 = "";
    $('#Filterluglocacc .spantext').each(function (index, option) {
        if (lookupFilter1 == "") {
            lookupFilter1 = "" + $(this).val() + "";
        } else {
            lookupFilter1 += "|" + $(this).val() + "";
        }
    });

    lookupFilter2 = "";
    $('#FilterlugPayee .spantext').each(function (index, option) {
        if (lookupFilter1 == "") {
            lookupFilter1 = "" + $(this).val() + "";
        } else {
            lookupFilter1 += "|" + $(this).val() + "";
        }
    });
 
    nwParameter_Add("luglocacc", lookupFilter1);
    nwParameter_Add("lugPayee", lookupFilter2);
 

    $("#noah-webui-Toolbox").bindingExport().enable(true);
    var isContinue = true;
    cust_GetPara(); 
    getloadfilterexport();
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

//    var isContinue = true;
//    cust_GetPara();
//    getloadfilterexport();
//    if ($('#radioMonthly').prop('checked')) {
//        if ($('#cmbMonth').val() == 1) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
//        }
//        if ($('#cmbMonth').val() == 2) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-28");
//        }
//        if ($('#cmbMonth').val() == 3) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
//        }
//        if ($('#cmbMonth').val() == 4) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30");
//        }
//        if ($('#cmbMonth').val() == 5) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
//        }
//        if ($('#cmbMonth').val() == 6) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30");
//        }
//        if ($('#cmbMonth').val() == 7) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
//        }
//        if ($('#cmbMonth').val() == 8) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
//        }
//        if ($('#cmbMonth').val() == 9) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30");
//        }
//        if ($('#cmbMonth').val() == 10) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
//        }
//        if ($('#cmbMonth').val() == 11) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-30");
//        }
//        if ($('#cmbMonth').val() == 12) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31");
//        }
//    }
//    else if ($('#radioAnnual').prop('checked')) {
//        nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-1-1");
//        nwParameter_Add("datefilterto", $('#txtAnually').val() + "-12-31");
//    }
//    else if ($('#radioQuarter').prop('checked')) {
//        if ($('#cmbQuarter').val() == 1) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-1-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-3-31");
//        }
//        if ($('#cmbQuarter').val() == 2) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-4-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-6-30");
//        }
//        if ($('#cmbQuarter').val() == 3) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-7-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-9-30");
//        }
//        if ($('#cmbQuarter').val() == 4) {
//            nwParameter_Add("datefilterfrom", $('#txtAnually').val() + "-10-1");
//            nwParameter_Add("datefilterto", $('#txtAnually').val() + "-12-31");
//        }
//    }
//    else if ($('#radioDate').prop('checked')) {
//        nwParameter_Add("datefilterfrom", $('#txtDateFrom').val());
//        nwParameter_Add("datefilterto", $('#txtDateTo').val());
//    }

//    if ($('#rdncreated').prop('checked')) {
//        nwParameter_Add("createdby", $('#idvallugcreatedby').val());
//    }
//    else if ($('#rdnstatus').prop('checked')) {
//        nwParameter_Add("status", $('#descvallugstatus').val());

//    }
//    else if ($('#rdndocno').prop('checked')) {
//        nwParameter_Add("docnofrom", $('#idvallugdocfrom').val());
//        nwParameter_Add("docnoto", $('#idvallugdocto').val());


//    }

//    if ($('#idvallugfrom').val() != '') {
//        nwParameter_Add("transacttype", $('#idvallugfrom').val());
//    }
//    lookupFilter1 = "";
//    $('#cmbluglocacc option').each(function (index, option) {
//        if (lookupFilter1 == "") {
//            lookupFilter1 = "" + $(this).val() + "";
//        } else {
//            lookupFilter1 += "|" + $(this).val() + "";
//        }
//    });

//    nwParameter_Add("lookupFilter1", lookupFilter1);
//    return isContinue;
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
    getDateFilter();
    GetAddtoListFilters();

    getSuppVal();

    var Doctype = "";
    var datefilter = "";

    if ($('#radioAll').prop('checked')) {
        Doctype = '';
    } else if ($('#radioAPV').prop('checked')) {
        Doctype = '1';
    } else if ($('#radioDebitMemo').prop('checked')) {
        Doctype ='2';
    } else if ($('#radioPayRelease').prop('checked')) {
        Doctype = '0';
    } else if ($('#radioVoid').prop('checked')) {
        Doctype = '3';
    } else if ($('#radioCancellation').prop('checked')) {
        Doctype = '4';
    }else if ($('#radioADMCan').prop('checked')) {
        Doctype = '5';
    }

    if ($('#radioMonthly').prop('checked')) {
        datefilter = 'Month';
    } else if ($('#radioAnnual').prop('checked')) {
        datefilter = 'Year';
    } else if ($('#radioQuarter').prop('checked')) {
        datefilter = 'Quarter';
    }

    nwParameter_Add("DateFilter", datefilter);
    nwParameter_Add("DocumentType", Doctype);    

    nwParameter_Add("doctype", $("input[name='DocumentType']:checked").attr("id"));
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    RefreshData();
    nwLoading_Start("actBindCollection", crLoadingHTML);
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() { 
    nwLoading_Start("actBindCollectionEmpty", crLoadingHTML);
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
  
 var value = "<option value='"+addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text()+"'>"+addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text()+"</option>"
 
 $('#cmb' + verID).append(value)

 $('#lugdocfrom input').val("");
 $('#lugdocto input').val("");
 $('#lugcreatedby input').val("");
 $('#lugstatus input').val("");

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
     //$(".nwCustBtn").enable(false);
}

function EnableFieldsDone() {//Binding Done
    $("#txtCode").prop("disabled", true);
    $("#txtDescription").prop("disabled", false);
    $("#nwCustBtn").enable(false);
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
    $('#idvallugSupplier').val('');
    $('#descvallugSupplier').val('');
    $('#idvallugACT').val();
    $('#descvallugACT').val();

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

$(document).on("change","input[name='datefilter']", function(e) {
    //DisableFields();
    //ClearDateFilter();
    //if($(this).prop("checked")){
    //    var id = $(this).attr("id")
    //    if(id == "radioMonthly"){ 
    //        $('#cmbMonth').enable(true);
    //    }else if(id == "radioDate"){
    //        $('#txtDateFrom').enable(true);
    //        $('#txtDateTo').enable(true);
    //        $('#txtDateFrom').val(currentDate);
    //        $('#txtDateTo').val(currentDate);
    //    }
    //    else if(id == "radioAnnual"){
    //        if( $('#txtAnually').val() == "")
    //            $('#txtAnually').val(currentYear);
            
    //        $('#txtAnually').enable(true);
    //    }
    //    else if(id == "radioQuarter"){
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

            $('#txtCurrentDate').val('');
            $("#nwCustBtn").enable(true);

        } else if (id == "radioDate") {
            $('#txtDateFrom').val(currentDate);
            $('#txtDateTo').val(currentDate);
            $('#cmbMonth').enable(false);
            $('#txtAnually').enable(false);
            $('#cmbQuarter').enable(false);
            $('#txtDateFrom').enable(true);
            $('#txtDateTo').enable(true);
            $("#nwCustBtn").enable(false);
        }
        else if (id == "radioAnnual") {
            if ($('#txtAnually').val() == "")
                $('#cmbMonth').enable(false);
            $('#cmbQuarter').enable(false);
            $('#cmbMonth').enable(false);
            $('#txtAnually').enable(true);
            $("#nwCustBtn").enable(true);
        }
        else if (id == "radioQuarter") {
            $('#cmbMonth').enable(false);
            $('#txtAnually').enable(false);
            $('#cmbQuarter').enable(true);
            $("#nwCustBtn").enable(true);
        }
        else if (id == "radioAsOf") {
            getDate();
            $('#txtDateFrom').enable(false);
            $('#txtDateTo').enable(false);
            $("#nwCustBtn").enable(false);
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
    GetAddtoListFilters();
    filter2x();
    getDateFilters();

   // cust_GetPara();
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
        dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
        dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31";
        if ($('#cmbMonth').val() == 1) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
            dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-31";
        }
        if ($('#cmbMonth').val() == 2) {
            dateFilterFrom = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-1";
            if (parseInt($('#txtAnually').val()) % 4 == 0) {
                dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-29";
            }
            else {
                dateFilterTo = $('#txtAnually').val() + "-" + $('#cmbMonth').val() + "-28";
            }
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

$(document).on("change", "#txtDateFrom", function (e) {
    var dateFrom = $(this).val();
    var dateTo = $('#txtDateTo').val();

    if (dateFrom == "") {
        $('#txtDateTo').val("");
        return;
    }

    if (Date.parse(dateFrom) > Date.parse(dateTo))
        $('#txtDateTo').val($(this).val());
});

$(document).on("change", "#txtDateTo", function (e) {
    var dateTo = $(this).val();
    var dateFrom = $('#txtDateFrom').val();

    if (dateTo == "") {
        $('#txtDateFrom').val("");
        return;
    }

    if (Date.parse(dateTo) < Date.parse(dateFrom))
        $('#txtDateFrom').val($(this).val());
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
    $('.atlContainer').closest('div.spantext').remove();
    $('#lugACT input').val('')
    $('#radioAll').prop("checked", true)
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

    return '<div class="spantext" nwcode="' + xvalue + '" class="nwCuz014">' + xdisplay + '<span class="classx">x</span></div>';

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
    var xvalue = ""; 
    var xdisplay = ""; 
    xvalue = addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
    xdisplay = addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();

    //if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {

    //    $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));

    //}


    if (verID == 'ATC') {
        if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
            $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xvalue));
        }
    }
    else {
        if ($('div.atlContainer[nwtype="' + verID + '"]').find('div.spantext[nwcode="' + xvalue + '"]').length < 1) {
            $('div.atlContainer[nwtype="' + verID + '"] div.innertext').append(GenerateLookupListDataHTML(xvalue, xdisplay));
        }
    }
 
}

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
        crnwTable.find("tr:eq(4)").find('td:eq(1) ').text('LOCATION NAME: All Locations');
    } else {
        crnwTable.find("tr:eq(4)").find('td:eq(1) ').text('LOCATION NAME: ' + allloc);
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
        nwParameter_Add("LocationFilter", "");
    } else {
        nwParameter_Add("LocationFilter", allloc);
    }
}

$(document).on('click', '#radioATC', function (e) {
    
    $('#lugACT').enable(true);
    $('#lugSupplier').enable(false);
    $('#lugSupplier').prop('checked', false);

});


$(document).on('click', '#radioSupplier', function (e) {

    $('#lugSupplier').enable(true);
    $('#lugACT').enable(false);
    $('#lugACT').prop('checked', false);


});

function getSuppVal() {
    if($('#radioSupplier').is(':checked') == true)
        nwParameter_Add("idvallugSupplier", $("#idvallugSupplier").val());
    else
        nwParameter_Add("idvallugSupplier", "");

}

$(document).on('click', '#radioSupplier', function () {
    $('#idvallugACT').val('');
    $('#descvallugACT').val('');
});


$(document).on('click', '#radioATC', function () { 
    $('#idvallugSupplier').val('');
    $('#descvallugSupplier').val('');
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

$(document).on('click', '#nwCustBtn', function () {
    nwLoading_Start("actcreateDatFile", crLoadingHTML);
    cust_GetPara();
    func_ActionDriven("actcreateDatFile", false);
});

function func_DownloadReceipt(xFileName) {
    var xfilearr = xFileName.split("**??**");

    for (var a = 0 ; a < xfilearr.length; a++) {
        $('#aDownload').attr("href", xfilearr[a]);
        $('#aDownload')[0].click();
        nwParameter_Add('xFileName', xFileName);
        $('#aDownload').attr("href", "#");
    }
    setTimeout(function () { func_ActionDriven("actDeletedTempFold", false); }, 10000);

}


