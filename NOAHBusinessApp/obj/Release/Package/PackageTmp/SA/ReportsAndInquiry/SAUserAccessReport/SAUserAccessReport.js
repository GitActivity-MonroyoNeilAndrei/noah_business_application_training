
var nwaccess = "";

function func_Reload() {

    crLnk = "../SAUserAccessReport/SAUserAccessReport_Gateway";
    crLnkGateKey = "SAUserAccessReport";



    $("#code").attr("disabled", true);
    $("#desc").attr("disabled", true);
    $("#module").attr("disabled", true);
    var isContinue = true;
//    $("#inCode").prop("disabled", true);
//    $("#inDesc").prop("disabled", true);

    init_request();
   crete_WindowBox("copyWindow");
  nwPopupForm_Create("nwPopup2");
  $("#noah-webui-Toolbox").bindingExport().enable(false);
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
    ClearFields();
    $("#lugCompany").focus();
    //isContinue = false;

    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    ///alert("wewe");
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
  //  $("#inCompany").attr("disabled", true);
//    $("#inUsername").attr("disabled", true);
  //  isRefreshed = true;
 //   func_ViewPowerUsrGrid();
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
    nwParameter_Add("lugCompany", $('#idvallugCompany').val());
    nwParameter_Add("lugCompanyDesc", $('#descvallugCompany').val());
    nwParameter_Add("lugUsername", $('#idvallugUsername').val());
    nwParameter_Add("lugModule", $('#idvallugModule').val());
    nwParameter_Add("lugItem", $('#idvallugItem').val());

    nwParameter_Add("nwaccess", nwaccess);
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

    if (idName == 'toolboxInquire') {
        cust_GetPara();
        func_ActionDriven("actBindCollection", false);
    }
    else if (idName == 'nwCopyfrmUser') {
      cust_GetPara();
      nwParameter_Add("nwcusercde", $('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(0)').text());
      func_ActionDriven("actLoadCopyFrom", false);
    }
     else if (idName == 'lugUsername') {
      if($('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(0)').text() == "-"){
    $('#idvallugUsername').val("");
    $('#descvallugUsername').val("");
} else {
    cust_GetPara();

    $('#idvallugModule').val('');
    $('#descvallugModule').val('');

    $('#idvallugItem').val('');
    $('#descvallugItem').val('');
    
      func_ActionDriven("actClearGrid", false);}
    
    }
    else if (idName == 'lugCompany') {

    if($('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(0)').text() == "-"){
    $('#idvallugCompany').val("");
    $('#descvallugCompany').val("");
    }else{
    $('#idvallugCompany').val($('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(0)').text());
    $('#descvallugCompany').val($('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(1)').text());
}
    $('#idvallugUsername').val('');
    $('#descvallugUsername').val('');

    $('#idvallugModule').val('');
    $('#descvallugModule').val('');

    $('#idvallugItem').val('');
    $('#descvallugItem').val('');

    func_ActionDriven("actClearGrid", false);

}

else if (idName == 'lugModule') {

    $('#idvallugItem').val('');
    $('#descvallugItem').val('');

    func_ActionDriven("actClearGrid", false);

}
    $("#nwPager").html("");

//    else if (idName == 'lug_grid1') {
//        crnwTR.find('td:eq(2) button').text($('#dimTableLookUp tr:eq(0) td:eq(0)').text());
//    }
}

function func_LookUpInitialize(lookupID)
{

    var isContinue = true;
    cust_GetPara();
        if(lookupID=="lugUsername"){
         if($("#idvallugCompany").val() == ""){ 
         
         }else{ return isContinue; } }
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
        if (answer == "Yes")
        clear_parameters();
        nwParameter_Add("FromCompany", $('#idvallugFromCompany').val());
        nwParameter_Add("ToCompany", $('#idvallugToCompany').val());
         func_ActionDriven("actImportCompany", false);
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
   cust_GetPara();
    if($('#version').val() == "1"){
    func_ActionDriven("actSaveData", true);
    }else{
     func_ActionDriven("actSaveData2", true);
    }
});

$(document).on("click", "#nwLoadUsrAccess", function() {
if($('#nwAPSearch').val() == ""){
    cust_GetPara();
    func_ActionDriven("actLoadData", false);
    }else{
      cust_GetPara();   
       func_ActionDriven("actFilter", false);      
    }
});

var selectedInput = "lug_grid2";
            lookUpCustomize(selectedInput, 2);

$(document).on("click", "#nwImportfrmComp", function() {
  $('#copyWindow').show();
});

$(document).on("click", "#nwCopyfrmUser", function() {
    clear_parameters();
    cust_GetPara();
    var selectedInput = "nwCopyfrmUser";
    lookUpCustomize(selectedInput, 1);
});


$(document).on("click", "#btn_import", function() {
    var fromcomp = $("#idvallugFromCompany").val();
    var tocomp = $("#idvallugToCompany").val();
    
    if (fromcomp == "" || tocomp == "")
    {
        parent_MessageBox("From Company and To Company should not be blank!", "Warning", "");
        return;
    }
    
    
    if (fromcomp == tocomp)
    {
        parent_MessageBox("Invalid selection!", "Warning", "");
        return;
    }
    
    msgBoxContainerQuestion = 12;
    parent_MessageBoxQuestion("This will overwrite data in the destination Company. \n Do you want to continue?", "Import user Access", "");
    
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

$(document).on("click", "#Export", function() {
 func_ActionDriven("actExport", true);
});

function ClearFields() {

    $('#idvallugCompany').val('');
    $('#descvallugCompany').val('');
    $('#idvallugUsername').val('');
    $('#descvallugUsername').val('');
    $('#idvallugModule').val('');
    $('#descvallugModule').val('');
    $('#idvallugItem').val('');
    $('#descvallugItem').val('');

    func_ActionDriven("actClearGrid", false);

}

function nwgrid_PaginationNavDone(gridID) {
    $('.nwCheckBox').enable(false); 
    $('.nwCheckBoxTot').css('display', 'none');
}



