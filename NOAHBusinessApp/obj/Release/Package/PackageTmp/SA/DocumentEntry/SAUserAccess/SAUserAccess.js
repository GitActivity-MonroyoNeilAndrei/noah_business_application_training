
var nwaccess = "";

function func_Reload() {
    crLnk = "../SAUserAccess/SAUserAccess_Gateway";
    crLnkGateKey = "SAUserAccess";

 //DataAutoComputeGrid = false;

    $("#code").attr("disabled", true);
    $("#desc").attr("disabled", true);
    $("#module").attr("disabled", true);
    var isContinue = true;
//    $("#inCode").prop("disabled", true);
//    $("#inDesc").prop("disabled", true);
    init_request();
   crete_WindowBox("copyWindow");
  nwPopupForm_Create("nwPopup2");

    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    $("#lugCompany").val("");
    $("#lugUsername").val("");
    //$("#inPassword").val("");
    //$("#inCode").attr("disabled", false);
    //$("#inDesc").attr("disabled", false);
    //$("#inPassword").attr("disabled", false);

    isRefreshed = false;
    func_ViewPowerUsrGrid();
    $("#lugCompany").focus();
    //isContinue = false;

    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to save", "", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    isRefreshed = false;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to Delete?", "", "", indef, enume);
    isContinue = false;
    return isContinue;
}

var isRefreshed = false;
function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    $("#inCompany").attr("disabled", true);
    $("#inUsername").attr("disabled", true);
    isRefreshed = true;
    func_ViewPowerUsrGrid();
//    parent_MessageBoxQuestionToolBox("Do you want to Refresh", "", "", indef, enume);
//    isContinue = false;
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
    tableToPrint("nwExportContainer");
    return isContinue;
}

function func_ToolboxClosing(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxSearch(indef, enume) {
    var isContinue = true;
    return isContinue;
}

///////////////////// Bind tool
function cust_GetPara() {
    //clear_parameters();
    //crParaObj = "aagnone";
    get_parameters_default();
    nwParameter_Add("nwAPSearch", $('#nwAPSearch').val());
    nwParameter_Add("nwListbox1", $('#nwListbox1').val());
    nwParameter_Add("version", $('#version').val());
    nwParameter_Add("idvallugFromCompany", $('#idvallugFromCompany').val());
    nwParameter_Add("idvallugToCompany", $('#idvallugToCompany').val());
    nwParameter_Add("lugCompany", $('#idvallugCompany').val());
    nwParameter_Add("lugCompanyDesc", $('#descvallugCompany').val());
    nwParameter_Add("lugUsername", $('#idvallugUsername').val());

    nwParameter_Add("nwaccess", nwaccess);

    nwParameter_Add("SortColumn", $('#SortColumn').val());
    nwParameter_Add("SortOrder", $('#SortOrder').val());
    //nwParameter_Add_Table('nwGrid2');
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    $("#lugCompany").prop("disabled", true);
    $('#lugUsername').prop('disabled', true);
    //$('#inDesc').focus();
    return isContinue;
}


function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    func_ActionDriven("actBindCollection", false);
    //$("#inDesc").focus();
}
 
///////////////////////////////////////

function Lookup_DoneFunction(idName, idNum) {
//alert(idNum);

    if (idName == 'toolboxInquire') {
        cust_GetPara();
        func_ActionDriven("actBindCollection", false);
    }
    else if (idName == 'nwCopyfrmUser') {
      cust_GetPara();
      nwParameter_Add("nwcusercde", $('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(0)').text());
      nwLoading_Start('actLoadCopyFrom', crLoadingHTML);

      nwParameter_Add("Company", $('#idvallugCompany').val());
      nwParameter_Add("FromUser", $('#menuCreatorContainer .tablecontainter tr:eq(' + idNum + ') td:eq(0)').text());
      nwParameter_Add("ToUser", $('#idvallugUsername').val());

      func_ActionDriven("actLoadCopyFrom", false);
    }
   else if(idName == "lugCompany"){
   
//      if($('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(0)').text() == "-"){
//       $('#idvallugCompany').val("");
//       $('#descvallugCompany').val("");
//            }else{
//       $('#idvallugCompany').val($('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(0)').text());
//       $('#descvallugCompany').val($('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(1)').text());
//
   //            }
       nwLoading_Start('actGridInit', crLoadingHTML);
   $('#idvallugUsername').val('');
   $('#descvallugUsername').val('');

   func_ActionDriven("actGridInit", false);

        }
    else if (idName == 'lugUsername') {
//  if($('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(0)').text() == "-"){
//     $('#idvallugUsername').val("");
//     $('#descvallugUsername').val("");
//    }else{
//      
        //      }

        nwLoading_Start('actClearGrid', crLoadingHTML);
      cust_GetPara();
      func_ActionDriven("actClearGrid", false);
    }

    
   // $("#nwPager").html("");

//    else if (idName == 'lug_grid1') {
//        crnwTR.find('td:eq(2) button').text($('#dimTableLookUp tr:eq(0) td:eq(0)').text());
    //    }

    


}

function func_LookUpInitialize(lookupID)
{

    var isContinue = true;
    cust_GetPara();
    if(lookupID=="lugUserComp")nwParameter_Add("lugToCompany", $('#idvallugToCompany').val());
        if(lookupID=="lugUsername"){
         if($("#idvallugCompany").val() == ""){ 
         }else{      cust_GetPara();  return isContinue; } 
         }
         
         else{ return isContinue;
         }

         
}



function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {

    // alert(addtoListTableRec.html());
    // alert(addtoListTableRec.find('tr:eq(' + index + ') td:eq(0)').html());
    crnwTRtemp.find('td:eq(2) button').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text());
    crnwTRtemp.find('td:eq(3) input').val(addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text());
    crnwTRtemp.find('td:eq(5) input').val(addtoListTableRec.find('tr:eq(' + index + ') td:eq(3)').text());

    
    return crnwTRtemp;
}


function nwGrdi_Change(nwobj, nwobjrow, nwobjitem) {
    // alert(nwobj.attr('id'));
    //  nwobj.hide();
    var ss = nwobjitem.find('#selecta').val();
    nwobjrow.css('background-color', 'black');
    //  nwobjrow.find('td').css('background-color', 'rgba(0,0,0,0.1)');
    //$(nwobjrow).css('background-color', 'black');
}
function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
    var ss = nwobjitem.find('#selecta').val();
    /// nwobjrow.css('background-color', 'black');
    // alert(crnwTD.attr('class'));
}


function nwGrid_tdClick(nwobjID) {
 

        $("#code").val("");
        $("#desc").val("");
        $("#module").val("");
        nwParameter_Add("version", $('#version').val());
   // alert("wew");
    if (nwobjID == "grid1") { 
    

                  
            if(crnwTR.find('td:eq(2) div').hasClass('Version')){
            nwParameter_Add("modle",crnwTR.find('td:eq(1) ').text());
            if($('#version').val() == "0"){
               if (crnwTD.index() == 2) {
                     var item2 = crnwTR.find('td:eq(2) ').text();
                     nwParameter_Add("item2",item2);

                     func_ActionDriven("actDetails", false); 
                      $("#nwPopup2").attr("title", "DesktopVersion");
                     $("#nwPopup2").show();}
           }else{
               if (crnwTD.index() == 2){
                     var item2 = crnwTR.find('td:eq(2) ').text();

                     nwParameter_Add("item2",item2);
                     func_ActionDriven("actDetails", false); 
                     $("#nwPopup2").attr("title", "WebVersion");
                     $("#nwPopup2").show();
                     }
                     }
                     
                }else{
                }
                     
                  
            }

    else if (nwobjID == "grid2") {
        if (crnwTD.index() == 2) {
            var selectedInput = "lug_grid2";
            lookUpCustomize(selectedInput, 2);
        }
    }
    

                  
}




/////////////

//var something = 999;
//var something_cachedValue = something;

function make_Date() {
    $("table .isDate").datepicker();
}


function msgBoxContainerQuestionF(genID, answer) {
    if (genID == 1) {
        if (answer == "Yes") {
            func_saveCheck();
        }
        else {
            func_saveContinue();
        }
    }
    else if (genID == 2) {
        if (answer == "Yes") func_saveContinue();
    }
    
    else if (genID == 3) {
        if (answer == "Yes") alert("yes");
        else if (answer == "No") alert("no");
    }
    
     else if (genID == 12) {
         if (answer == "Yes") {


             clear_parameters();
             nwLoading_Start('actImportCompany', crLoadingHTML);
             nwParameter_Add("FromCompany", $('#idvallugFromCompany').val());
             nwParameter_Add("ToCompany", $('#idvallugToCompany').val());
             nwParameter_Add("UserComp", $('#idvallugUserComp').val());

             $('#idvallugCompany').val($('#idvallugToCompany').val());
             $('#descvallugCompany').val($('#descvallugToCompany').val());
             $('#idvallugUsername').val($('#idvallugUserComp').val());
             $('#descvallugUsername').val($('#descvallugUserComp').val());

             func_ActionDriven("actImportCompany", false);

         }
    }

}



$(document).on("focus", "#inPassword", function() {
    nwParameter_Add("inPassword", $(this).val());
    func_ActionDriven("actpass", false);
}).on("click", "#inPassword", function() {
    nwParameter_Add("inPassword", $(this).val());
    func_ActionDriven("actpass", false);
});



$(document).on("focusout", ".tblGridBody input#timein", function() {
    var obj = $(this);
    if (obj.val().length <= 3){ 
        alert("invalid");
        obj.focus();
    }
    
});


//$(document).on("click", "#Button1", function() {nwListbox1
//    var obj = $(this);
//    var action = obj.val();
//    if (action == "Show"){
//        $('#nwGrid2con').show();
//        obj.val("Hide");
//    }
//    else
//    {
//        $('#nwGrid2con').hide();
//        obj.val("Show");
//    }
//    
//
//});

$(document).on("change", "#nwListbox1 ", function() {
    $('#nwAPSearch').val("");
    $('#nwAPSearch').focus();
});

$(document).on("focusout", "#nwGrid2 .tblGridBody input#quantity", function() {
    var obj = $(this);
        
      var qty1 = crnwTR.find("input#quantity").val();
      var qty2 = crnwTR.find("input#quantity2").val();
      
      var rem = qty2 - qty1;
     // $(".tblGridBody input#rem").text(rem);
      var finalc = nwCurrency(rem);
      var q1="0"; var q2="0";
      
      if (!(crnwTR.find("input#item").val().replace(" ","") == "")){
          if (!(crnwTR.find("input#quantity").val().replace(" ","") == "" || crnwTR.find("input#quantity").val().replace(" ","") =="NaN" ))
            q1= crnwTR.find("input#quantity").val();
          if (!(crnwTR.find("input#quantity2").val().replace(" ","") == "" || crnwTR.find("input#quantity2").val().replace(" ","") =="NaN" ))
            q2= crnwTR.find("input#quantity2").val();
           
            if (finalc < 0){
                alert("Invalid Quantity!")
                $(this).focus();
            }
            else{
                crnwTR.find("input#rem").val(finalc);
                crnwTR.find("input#quantity").val(nwCurrency(q1));
                crnwTR.find("input#quantity2").val(nwCurrency(q2));
            }
      }
     
          
      
      //alert(rem);
});



$(document).on("change", ".tblGridBody input.isDate", function() {
    if($(this).val().replace(" ","") == "") return;
    var isDup = check_duplicate();
    if(isDup){
        $(this).val("");
         $(this).focus();
     }
});




function check_duplicate(){
    crnwTable = $("#nwGrid1 .tblGridBody");
    crnwTR = $("#nwGrid1 .tblGridBody tr:eq(0)");
    crnwTD = $("#nwGrid1 .tblGridBody tr:eq(0) td:eq(0)");
    
    var temp_table = crnwTable;// loop
    var rowcount = temp_table.find("tr").length;
   // var colCount = $("#nwGrid1 .tblGridHeader").find("th").length - 1;
    
    var error="";
    var isTerminate=false;
    for(var i= 0 ; i <= rowcount; i++ )
    {
            for(var i2= 0 ; i2 <= rowcount; i2++ )
            {
                if(crnwTable.find("tr:eq(" + i + ") td:eq(4) input").val() == 
                   crnwTable.find("tr:eq(" + i2 + ") td:eq(4) input").val() && i != i2
                   && crnwTable.find("tr:eq(" + i + ") td:eq(4) input").val().replace(" ","") != ""
                   && crnwTable.find("tr:eq(" + i2 + ") td:eq(4) input").val().replace(" ","") != ""
                   )
                {
                    var msg = "duplicate" + i + " with" + i2;
                    //parent_MessageBox(msg, "Example", "");
                    msgBoxContainerQuestion ="3";
                    parent_MessageBoxQuestion(msg, "Example", "");
                    isTerminate =true;
                    break;
                }
            }
            if (isTerminate)break;
    }
    
    return isTerminate;
}

$(document).on("click", "#nwSaveUseAcs", function() {

if($('#idvallugCompany').val() != "" && $('#idvallugUsername').val() != ""){
   cust_GetPara();
            
             if($('#version').val() == "1"){
                func_ActionDriven("actSaveData", true);
            }else{
                nwLoading_Start('actSaveData2', crLoadingHTML);
                func_ActionDriven("actSaveData2", true);
            }
} else {

    var error = "";

        if ($('#idvallugCompany').val() == "")
        error = "Cannot Save. Company is required. \n";

        if ($('#idvallugUsername').val() == "")
            error += "Cannot Save. Username is required.";
         //func_ActionDriven("actCodeRequired", false);

        MessageBox(error, "User Access", "error");
    }
});

$(document).on("click", "#nwLoadAccess", function() {

    var Sortby = $('#SortColumn').val();
    var Sortorder = $('#SortOrder').val();

    if (Sortby != '' && Sortorder == '') {

        MessageBox("Ascending/Descending is required.", "User Access");

    }
    else {

        
        if ($('#idvallugCompany').val() != "" && $('#idvallugUsername').val() != "") {
            nwLoading_Start('actLoadData', crLoadingHTML);
            if ($('#nwAPSearch').val() == "") {
                cust_GetPara();

                func_ActionDriven("actLoadData", false);
            } else {
                cust_GetPara();
                func_ActionDriven("actFilter", false);
            }
        } else {
            //func_ActionDriven("actCodeRequired", false);
            var err = "";

            if ($('#idvallugCompany').val() == "")
                err += "Cannot proceed. Company is required. \n";

            if ($('#idvallugUsername').val() == "")
                err += "Cannot proceed. Username is required.";

            MessageBox(err, "User Access", "error");
        }
    }

    return false;
});

//var selectedInput = "lug_grid2";
// lookUpCustomize(selectedInput, 2);

$(document).on("click", "#nwImportfrmComp", function() {
    $('#copyWindow').show();
    ClearFields();
    if ($('#idvallugCompany').val() != "" && $('#idvallugUsername').val() != "") {

    } else {
        func_ActionDriven("actCodeRequired", false);
    }
});

$(document).on("click", "#nwCopyfrmUser", function() {
    if($('#idvallugCompany').val() != "" && $('#idvallugUsername').val() != ""){
        clear_parameters();
        cust_GetPara();
        var selectedInput = "nwCopyfrmUser";
        lookUpCustomize(selectedInput, 1);
    } else
    {
        var err = "";

        if ($('#idvallugCompany').val() == "")
            err += "Cannot Proceed. Company is required. \n";

        if ($('#idvallugUsername').val() == "")
            err += "Cannot Proceed. Username is required.";

        MessageBox(err, "User Access", "error");
    }
});


$(document).on("click", "#btn_import", function() {
    var fromcomp = $("#idvallugFromCompany").val();
    var tocomp = $("#idvallugToCompany").val();
    var touser = $("#idvallugUserComp").val();
    var err = "";

    if (fromcomp == "")
        err += "Cannot be imported. From Company is required. \n";

    if (tocomp == "")
        err += "Cannot be imported. To Company is required. \n";

    if (touser == "")
        err += "Cannot be imported. To Company User is required. \n";

    if (err.length > 0) {
        parent_MessageBox(err, "Import User Access", "error");
        return;
    }
    
    if (fromcomp == tocomp)
    {
        parent_MessageBox("Invalid selection!", "Warning", "error");
        return;
    }
    
    msgBoxContainerQuestion = 12;
    parent_MessageBoxQuestion("This will overwrite data in the Destination Company. \n Do you want to continue?", "Import User Access", "");
    
    return false;

});


function func_LoadPager(pageno){
    $(".PagerNum").removeClass("nwSelected");
    $("#nwPager .PagerNum:eq("+(pageno-1)+")").addClass("nwSelected");
    
    var based = 1;
    var baseadd = 30;
    
   var baseaddtemp = 0;
   var finalrange = 0;
   
   baseaddtemp = baseadd * (pageno - 1);
   based = baseaddtemp + based;
   finalrange = baseadd * pageno;
   
   
   clear_parameters();
   cust_GetPara();
   nwParameter_Add("based", based);
   nwParameter_Add("finalrange", finalrange);
   func_ActionDriven("actPagerClick", false);
    
}

function func_ViewPowerUsrGrid()
{
    if (isRefreshed)
    {
        $("#nwGrid1").css("dispaly", "block");
    }
    else
    {
         $("#nwGrid1").css("dispaly", "none");
    }
}

$(document).on("click","button",function(){
return false;
});


$(document).on("change", "#version", function() {
 $("#nwPager").html("");
 func_ActionDriven("actClearGrid", false);
});





function CreateCheckBox(){
$('#grid1Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(5)').html('<input id="CanAccessHeader" type="checkbox"> <label for="CanAccessHeader" title="Access">Access</label>'); 
$('#grid1Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(6)').html('<input id="CanAddHeader" type="checkbox"> <label for="CanAddHeader" title="Add">Add</label>'); 
$('#grid1Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(7)').html('<input id="CanEditHeader" type="checkbox"> <label for="CanEditHeader" title="Edit">Edit</label>'); 
$('#grid1Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(8)').html('<input id="CanDeleteHeader" type="checkbox">  <label for="CanDeleteHeader" title="Delete">Delete</label>'); 
$('#grid1Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(9)').html('<input id="CanSaveHeader" type="checkbox"> <label for="CanSaveHeader" title="Save">Save</label>'); 
$('#grid1Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(10)').html('<input id="CanPrintHeader" type="checkbox"> <label for="CanPrintHeader" title="Print">Print</label>'); 
$('#grid1Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(11)').html('<input id="CanProcessHeader" type="checkbox"> <label for="CanProcessHeader" title="Process">Process</label>'); 
$('#grid1Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(12)').html('<input id="CanImportHeader" type="checkbox"> <label for="CanImportHeader" title="Import">Import</label>'); 
$('#grid1Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(13)').html('<input id="CanExportHeader" type="checkbox"><label for="CanExportHeader" title="Export">Export</label>'); 
}



$(document).on("change", "#CanAccessHeader", function() {
 if($(this).prop('checked')){
    CheckAll("CanAccess",true);
 }else{
    CheckAll("CanAccess",false);
 }
});
  
$(document).on("change", "#CanAddHeader", function() {
 if($(this).prop('checked')){
    CheckAll("CanAdd",true);
 }else{
    CheckAll("CanAdd",false);
 }
});

  
$(document).on("change", "#CanEditHeader", function() {
 if($(this).prop('checked')){
    CheckAll("CanEdit",true);
 }else{
    CheckAll("CanEdit",false);
 }
});

  
$(document).on("change", "#CanDeleteHeader", function() {
 if($(this).prop('checked')){
    CheckAll("CanDelete",true);
 }else{
    CheckAll("CanDelete",false);
 }
});

$(document).on("change", "#CanSaveHeader", function() {
 if($(this).prop('checked')){
    CheckAll("CanSave",true);
 }else{
    CheckAll("CanSave",false);
 }
});

$(document).on("change", "#CanPrintHeader", function() {
 if($(this).prop('checked')){
    CheckAll("CanPrint",true);
 }else{
    CheckAll("CanPrint",false);
 }
});

$(document).on("change", "#CanProcessHeader", function() {
 if($(this).prop('checked')){
    CheckAll("CanProcess",true);
 }else{
    CheckAll("CanProcess",false);
 }
});


$(document).on("change", "#CanImportHeader", function() {
 if($(this).prop('checked')){
    CheckAll("CanImport",true);
 }else{
    CheckAll("CanImport",false);
 }
});

$(document).on("change", "#CanExportHeader", function() {
 if($(this).prop('checked')){
    CheckAll("CanExport",true);
 }else{
    CheckAll("CanExport",false);
 }
});

$(document).on("focusout", "#CanExportHeader", function() { 
    crnwTable = $("#grid_arm .tblGridBody");
    //$('.nwgridSelected').removeClass("nwgridSelected"); 
    crnwTable.find("tr:eq(0) td:eq(1)").addClass("nwgridSelected");  
    crnwTable.find("tr:eq(0) td:eq(1)").click();  
});
  
 

function CheckAll(colindex,isTrue){
    $('.'+colindex).prop('checked',isTrue); 
}


//$(document).on("click", ".CanAccess", function() { 
//    var isCheckALL = true; 
//    $('.CanAccess').each(function(){ 
//        //alert($(this).prop("checked"));
//        if(!$(this).prop("checked")){ 
//        isCheckALL = false; 
//        }            
//    }); 
//   // if($(this).prop("checked")){isCheckALL = true;}
//     // alert(isCheckALL);
//    $('#CanAccessHeader').prop('checked',isCheckALL);  
//});

function OnclickInit(i){
    switch(i){
        case 1:OnclickCheckBox("CanAccess","CanAccessHeader"); break;
        case 2:OnclickCheckBox("CanAdd","CanAddHeader"); break;
        case 3:OnclickCheckBox("CanEdit","CanEditHeader"); break;
        case 4:OnclickCheckBox("CanDelete","CanDeleteHeader"); break;
        case 5:OnclickCheckBox("CanSave","CanSaveHeader"); break;
        case 6:OnclickCheckBox("CanPrint","CanPrintHeader"); break;
        case 7:OnclickCheckBox("CanProcess","CanProcessHeader"); break; 
        case 8:OnclickCheckBox("CanImport","CanImportHeader"); break; 
        case 9:OnclickCheckBox("CanExport","CanExportHeader"); break;
    }
}

$(document).on("click", "#grid1-nwData > tbody > tr", function(e) {
    if (e.ctrlKey) {

    }
    else {
        $(".p8rowselected").removeClass("p8rowselected");
    }

    if ($(this).hasClass("p8rowselected")) {
        $(this).removeClass("p8rowselected");
    } else {
        $(this).addClass("p8rowselected");
    }
});

$(document).on("click", "th.nwgrid_startbox", function(e) {
    $("#grid1-nwData").find("tr").addClass("p8rowselected");
});



 

function OnclickCheckBox(selected,header){ 
   // alert(selected);
    var isCheckALL = true; 
    $('.'+selected).each(function(){ 
        if(!$(this).prop("checked")){ 
        isCheckALL = false; 
        }            
    });
    
    $('#'+header).prop('checked',isCheckALL);  
}


$(function() {
    $.contextMenu({
        selector: '#grid1-nwData > tbody > tr', //'#grid1-nwData > tbody > tr', #dataset0 > td:nth-child(5) > input
        callback: function(key, options) {
        if (key == "ALL") { CheckAllRow(true) }
        else if (key == "None") { CheckAllRow(false)}
        else {
            return false;
         }
        },
        items: test()
    });
});

var x = [];
function test() {
    
    x={"ALL": { name: "Select All", icon: " " },
       "None": { name: "Select None", icon: " " }
    }
    return x;
}
var nwuser = "";
function CheckAllRow(isSelectAll){   
    crnwTable = $("#grid_arm .tblGridBody");
 
    var colcount = crnwTable.find("td").length;

    // $('#dataset'+(crnwTR.index())+' > td  > input').prop('checked',isSelectAll);

    //crnwTR
    $(crnwTR).find(' td  > input').prop('checked', isSelectAll);
 
    $(crnwTable).find("tr.p8rowselected").find(' td  > input').prop('checked', isSelectAll);

    for (var i = 13; i <= 21; i++) {
        $(crnwTR).find(' td:eq('+i+')').text(nwuser);
        $(crnwTable).find("tr.p8rowselected").find('td:eq('+i+')').text(nwuser);
    }
    
}

function ClearFields() {

    $('#idvallugFromCompany').val('');
    $('#descvallugFromCompany').val('');
    $('#idvallugToCompany').val('');
    $('#descvallugToCompany').val('');
    $('#idvallugUserComp').val('');
    $('#descvallugUserComp').val('');

}


$(document).on('change', '.nwCheckBox', function() {


    var IndexTD = crnwTD.index();

    $(crnwTable).find("tr.p8rowselected").find('td:eq(' + (IndexTD + 9) + ')').text(nwuser);

});

$(document).on('change', '.nwCheckBoxTot', function() {

    var IndexTD = $(this).parents('th').index() ;

    nwParameter_Add("TableData", (IndexTD-1 + 9));

    $('#grid1-nwData').find("tr").find("td:eq(" + (IndexTD + 9) + ")").text(nwuser);


    nwParameter_Add("varInstancegr", $(this).parents(".nwGrid").attr("nwinstance"));
    func_ActionDriven("actCheckAll", false);
});

$(document).keypress(function(e) {

    var isFocus = $('#nwAPSearch').is(':focus');

    if (e.which == 13 && isFocus) {

        nwLoading_Start('actMethoLoading', crLoadingHTML);
        if ($('#idvallugCompany').val() != "" && $('#idvallugUsername').val() != "") {
            if ($('#nwAPSearch').val() == "") {
                cust_GetPara();

                func_ActionDriven("actLoadData", false);
            } else {
                cust_GetPara();
                func_ActionDriven("actFilter", false);
            }
        } else {
            func_ActionDriven("actCodeRequired", false);
        }

    }



});

//$(document).on('click', '#nwHistory', function () {

//    cust_GetPara();
//    func_ActionDriven("actHistory", false);


//    return false;

//});





