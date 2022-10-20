
function func_Reload() {
    crExportLnk = '../../../forms_standards/ExportToExcel.aspx';
    crLnk = "RoleAccess_Gateway.aspx";
    crSTDLnk = "../../../forms_standards/RunStandard.aspx";
    crLnkGateKey = "RoleAccess";
   
    var isContinue = true;
    $("#code").attr("disabled", true);
    $("#desc").attr("disabled", true);
    $("#module").attr("disabled", true);

    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);
    $("#lugCode2").val("");
    $("#lugCode").val("");
      $("#idvallugCode").val("");
    $("#descvallugCode").val("");
    nwPopupForm_Create("nwPopup2");
    init_request();
    $('#noah-webui-default-Export').enable(false);
    return isContinue;
}

////////////////////////// TOol Box

//$(function(){
//    nwPanelTab_Create("settingstabs");
//});

$(document).on("click", "#btnHistory", function (e) {
    if ($('#chkBox').prop('checked')) {
        nwParameter_Add("Company", $('#idvallugCode').val());
        nwParameter_Add("Role", $('#idvallugCode2').val());
    } else {
        nwParameter_Add("Company", '');
        nwParameter_Add("Role", '');
    }
    nwLoading_Start("actLoadMainHistorical", crLoadingHTML);
    func_ActionDriven("actLoadMainHistorical");
    return false;
});

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    $("#inCode").val("");
    $("#inDesc").val("");
    $("#inCode").attr("disabled", false);
    $("#inDesc").attr("disabled", false);
    $("#idvallugCode").val("");
    $("#descvallugCode").val("");
    $("#inCode").focus();
    $("#inSql").val("");
    $("#idvallugCode2").val("");
    $("#descvallugCode2").val("");
    
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
    cust_GetPara();
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    $("#inCode").attr("disabled", true);
    $("#inDesc").attr("disabled", true);
    
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

    nwParameter_Add("combobox1", $('#combobox1').val());
    nwParameter_Add("inSearch", $('#inSearch').val());
    nwParameter_Add("company", $("#idvallugCode").val());
    nwParameter_Add("companydesc", $("#descvallugCode").val());
    nwParameter_Add("roles", $("#idvallugCode2").val());

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
    return isContinue;
}



///////////////////// Bind tool
function cust_GetPara() {
  
    nwParameter_Add("inCode", $('#inCode').val());
    nwParameter_Add("inDesc", $('#inDesc').val());
    
    nwParameter_Add("lugCode", $("#idvallugCode").val());
    nwParameter_Add("lugCode2", $("#idvallugCode2").val());
    
    nwParameter_Add("combobox1", $('#combobox1').val());
    nwParameter_Add("inSearch", $('#inSearch').val()); 
    nwParameter_Add("version", $("#version").val());
    
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    $("#inCode").prop("disabled", true);
    $('#inDesc').prop('disabled', true);
    return isContinue;
    
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    func_ActionDriven("actBindCollection", false);
}


///////////////////////////////////////

function func_LookUpInitialize(lookupID)
{
    var isContinue = true;
       // alert("s");
     if(lookupID=="CopyFrom"){
         //crParaObj="aagnone";
         cust_GetPara();
     }
     nwParameter_Add("idvallugCode", $('#idvallugCode').val());
    return isContinue;
}


function Lookup_DoneFunction(idName, idNum) {

    if (idName == 'toolboxInquire') {
        cust_GetPara();
        func_ActionDriven("actBindCollection", false);
    }

    else if (idName == 'lug_grid1') {
       
        crnwTR.find('td:eq(2) button').text($('#dimTableLookUp tr:eq(1) td:eq(2)').text());
    }  
     else if (idName == 'lugCode2' ) {
    // alert(lugCode2);
        cust_GetPara();   
             if($('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(0)').text() == "-"){
             $("#idvallugCode2").val("");
             $("#descvallugCode2").val("");
              }else{
        $("#nwPager").html("");
    //    crnwTR.find('.nwGrid2 td:eq(2) button').text($('#dimTableLookUp tr:eq(1) td:eq(2)').text());     
        func_ActionDriven("actBindCollection", false);
        }
       }
      else if (idName == 'CopyFrom'){
     
        nwParameter_Add("CopyFrom", $('#dimTableLookUp tr:eq(0) td:eq(0)').text());  
        cust_GetPara();

        nwParameter_Add("lugCode2", $('#dimTableLookUp tr:eq(0) td:eq(0)').text());
       
        nwParameter_Add("version", $('#version').val());  
         nwLoading_Start('actcopyfromweb', crLoadingHTML);
         func_ActionDriven("actcopyfromweb", false);  
//        if($('#version').val() == "1"){
//        
//            func_ActionDriven("actcopyfrom", false);  }else{
//            func_ActionDriven("actcopyfromweb", false);  
//        }         
      }else if (idName == 'lugCode'){
         if($('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(0)').text() == "-"){
         $("#idvallugCode").val("");
         $("#descvallugCode").val("");
          }
        }
}



function nwGrid_AddtoListDone(nwGridID,crnwTRtemp, addtoListTableRec, index) {
   //alert(addtoListTableRec);
    //alert(adcust_GetPara();  dtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').html());
   
   if (nwGridID == "grid2" || nwGridID == "nwGrid2"){ 
   
       var value1=addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
       var value2=addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
        // cust_GetPara();   
      // if (check_duplicate(addtoListTableRec) && value1.replace(" ","") !="")
      //{          
            crnwTRtemp.find('td:eq(2) button').text(value1);
            crnwTRtemp.find('td:eq(3)').text(value2);      
           // func_ActionDriven("actLoadGrid", false); 
             
      // }  
    }
    else if (nwGridID == "grid1" || nwGridID == "nwGrid1"){
     var value3=addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
       var value4=addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
//     if (check_duplicate(addtoListTableRec) && value1.replace(" ","") !="")
//      {
        crnwTRtemp.find('td:eq(2)').text(value3);
        crnwTRtemp.find('td:eq(3)').text(value3);
//       }  
    }
    return crnwTRtemp;

//    crnwTRtemp.find('td:eq(2) button').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text());
//    crnwTRtemp.find('td:eq(3) input').val(addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text());
//    return crnwTRtemp;
}

function nwGrid_AddtoListDoneCustom(nwGridID,addtoListTableRec)
{
    if (nwGridID == "addmodule" || 1==1){

    }
}


function nwGrdi_Change(nwobj, nwobjrow, nwobjitem) {
    // alert(nwobj.attr('id'));
    //  nwobj.hide();
    var ss = nwobjitem.find('#selecta').val();

}
function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
    var ss = nwobjitem.find('#selecta').val();
    /// nwobjrow.css('background-color', 'black');
    // alert(crnwTD.attr('class'));
}


function nwGrid_tdClick(nwobjID) {
 nwParameter_Add("version", $('#version').val());
    if (nwobjID == "grid1") {
        //alert(crnwTD.index());
        if (crnwTD.index() == 2) {
            var selectedInput = "adduser";
            lookUpCustomize(selectedInput, 2);
        }
    }
    
    else if (nwobjID == "grid2") {
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
}

 function func_nwGrid_DeleteFinal()
 {
     if(crnwTable.find("tr").length <= 0)
        func_nwGrid_AddRow(crnwTable.parents(".nwGrid").parent().attr("id"));
        
 }

/////////////

//var something = 999;
//var something_cachedValue = something;

function msgBoxContainerQuestionF(genID, answer) {
    //alert(genID + " = " + answer)
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

}


function check_duplicate(addtoListTableRec){
    crnwTable = $("#nwGrid2 .tblGridBody");
    
    var temp_table = crnwTable;
    var rowcount = temp_table.find("tr").length;
    var isTerminate=false;
    var rowcount2 = addtoListTableRec.find("tr").length;
    
    for(var i= 0 ; i <= rowcount; i++ )
    {
        for(var i2=0; i2<= rowcount2; i2++)
        {
           //alert(crnwTable.find("tr:eq(" + i + ") td:eq(2) button").text() + "|||/n" + $('#dimTableLookUp tr:eq(0) td:eq(0)').text());
//            alert(crnwTable.find("tr:eq(" + i + ") td:eq(2)").text() + "=="+ 
//               addtoListTableRec.find('tr:eq(' + i2 + ') td:eq(1)').text());
               
            if(crnwTable.find("tr:eq(" + i + ") td:eq(2) ").text() == 
               addtoListTableRec.find('tr:eq(' + i2 + ') td:eq(1)').text()
               )
                    {                   
                        isTerminate =true;
                        break;
                    }
        
                if (isTerminate)break;
         }
    }    
    return isTerminate;  
}

//$(document).on("click","button",function(){
//return false;

//});

$(document).on("click","#addmodule",function(){
    var selectedInput = "addmodule";
    crnwTR= $("#grid2 .tblGridBody tr:eq(0)");
    crnwTD= $("#grid2 .tblGridBody tr:eq(0) td:eq(2)");
    crnwTable = $("#grid2 .tblGridBody");
    crnwTableCon= $("#grid2.nwGrid");
     lookUpCustomize(selectedInput, 2);
});

$(document).on("click","#adduser",function(){
    var selectedInput = "adduser";
    crnwTR= $("#grid1 .tblGridBody tr:eq(0)");
    crnwTD= $("#grid1 .tblGridBody tr:eq(0) td:eq(2)");
    crnwTable = $("#grid1 .tblGridBody");
    crnwTableCon= $("#grid1.nwGrid");
     lookUpCustomize(selectedInput, 2);
        
});

$(document).on("click","#LoadRole",function(){
 nwParameter_Add("version", $('#version').val());
  $("#nwPager").html("");
  if ($("#idvallugCode2").val() == "" || $("#idvallugCode").val() == "") {

      var err = "";

      if ($('#idvallugCode').val() == "")
          err += "Cannot proceed. Company is required. \n";

      if ($('#idvallugCode2').val() == "")
          err += "Cannot proceed. User Role is required.";

      MessageBox(err, "Role Access", "error");
  }
  else {
      $('#noah-webui-default-Export').enable(true);
      cust_GetPara();
      $(".history_switch").prop("disabled", false);
      $('#chkBox').prop('checked', true);
      var selectedInput = "LoadRole";
      func_ActionDriven("actLoadGrid", false);

  }
  return false;
});


$(document).on("click","#SaveRole",function(){
   nwParameter_Add("version", $('#version').val()); 
   if ($("#idvallugCode").val() == "" || $("#idvallugCode2").val() == "")
    {         
       var err = "";

       if ($('#idvallugCode').val() == "")
           err += "Cannot proceed. Company is required. \n";

       if ($('#idvallugCode2').val() == "")
           err += "Cannot proceed. User Role is required.";

       MessageBox(err, "Roles Access", "error");
        
    }
    else{

                cust_GetPara();
                nwParameter_Add_Table('nwGrid2');
                 nwLoading_Start('actSave', crLoadingHTML);
                func_ActionDriven("actSave", false);    
        
       
    }

    return false;
});

$(document).on("click","#CopyFrom",function(){

    if ($("#idvallugCode").val() == "" || $("#idvallugCode2").val() == "")
    {         
        var err = "";

        if ($('#idvallugCode').val() == "")
            err += "Cannot proceed. Company is required. \n";

        if ($('#idvallugCode2').val() == "")
            err += "Cannot proceed. User Role is required.";

        MessageBox(err, "Roles Access", "error");

    } 
    else{
   
   var selectedInput = "CopyFrom";
     cust_GetPara(); 
     //func_LookUpInitialize("CopyFrom");   
     lookUpCustomize(selectedInput, 1);  

    }

    return false;

});


$(document).on("click","#copyuser",function(){
    var selectedInput = "copyuser";
     lookUpCustomize(selectedInput, 1);     
});

function cust_LookUpLoad()
{
     
    if($("#idvallugCode").val() == "")
    {    
        return false;
    }
    else {
    var selectedInput = "lug_grid1";
     lookUpCustomize(selectedInput, 2);     
     }   
}

//RIGHT CLICK

$(function () {
    $.contextMenu({
        selector: '#nwgrid-nwData > tbody > tr', //'#grid1-nwData > tbody > tr', #dataset0 > td:nth-child(5) > input
        callback: function (key, options) {
            if (key == "ALL") { CheckAllRow(true) }
            else if (key == "None") { CheckAllRow(false) }
            else {
                return false;
            }
        },
        items: test()
    });
});

var x = [];
function test() {

    x = {
        "ALL": { name: "Select All", icon: " " },
        "None": { name: "Select None", icon: " " }
    }
    return x;
}

function CheckAllRow(isSelectAll) {
    crnwTable = $("#nwgrid-nwData");

    $(crnwTR).find(' td  > input').prop('checked', isSelectAll);

    $(crnwTable).find("tr.p8rowselected").find(' td  > input').prop('checked', isSelectAll);

}


//function func_LoadPager(pageno){
//    //alert("sada");
    
//    $(".PagerNum").removeClass("nwSelected");
//    $("#nwPager .PagerNum:eq("+(pageno-1)+")").addClass("nwSelected");
    
//    var based = 1;
//    var baseadd = 30;
    
//   var baseaddtemp = 0;
//   var finalrange = 0;
   
//   baseaddtemp = baseadd * (pageno - 1);
//   based = baseaddtemp + based;
//   finalrange = baseadd * pageno;
   
//   clear_parameters();
//   cust_GetPara();
//   nwParameter_Add("based", based);
//   nwParameter_Add("finalrange", finalrange);
//   nwParameter_Add("version", $('#version').val());
//   func_ActionDriven("actPagerClick", false);
//}

$(document).on("change", "#version", function() {

 $("#nwPager").html("");
  func_ActionDriven("actBindCollection", false);
    
});


//function CreateCheckBox(){ 
//$('#grid2Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(5)').html('<input id="CanAccessHeader" type="checkbox"> <label for="CanAccessHeader" title="Access">Access</label>'); 
//$('#grid2Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(6)').html('<input id="CanAddHeader" type="checkbox"> <label for="CanAddHeader" title="Add">Add</label>'); 
//$('#grid2Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(7)').html('<input id="CanEditHeader" type="checkbox"> <label for="CanEditHeader" title="Edit">Edit</label>'); 
//$('#grid2Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(8)').html('<input id="CanDeleteHeader" type="checkbox">  <label for="CanDeleteHeader" title="Delete">Delete</label>'); 
//$('#grid2Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(9)').html('<input id="CanSaveHeader" type="checkbox"> <label for="CanSaveHeader" title="Save">Save</label>'); 
//$('#grid2Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(10)').html('<input id="CanPrintHeader" type="checkbox"> <label for="CanPrintHeader" title="Print">Print</label>'); 
//$('#grid2Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(11)').html('<input id="CanProcessHeader" type="checkbox"> <label for="CanProcessHeader" title="Process">Process</label>'); 
//$('#grid2Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(12)').html('<input id="CanImportHeader" type="checkbox"> <label for="CanImportHeader" title="Import">Import</label>'); 
//$('#grid2Data > div > div:nth-child(1) > table > thead > tr > th:nth-child(13)').html('<input id="CanExportHeader" type="checkbox"><label for="CanExportHeader" title="Export">Export</label>'); 
 
//}





//$(document).on("change", "#CanAccessHeader", function() {
// if($(this).prop('checked')){
//    CheckAll("CanAccess",true);
// }else{
//    CheckAll("CanAccess",false);
// }
//});
  
//$(document).on("change", "#CanAddHeader", function() {
// if($(this).prop('checked')){
//    CheckAll("CanAdd",true);
// }else{
//    CheckAll("CanAdd",false);
// }
//});

  
//$(document).on("change", "#CanEditHeader", function() {
// if($(this).prop('checked')){
//    CheckAll("CanEdit",true);
// }else{
//    CheckAll("CanEdit",false);
// }
//});

  
//$(document).on("change", "#CanDeleteHeader", function() {
// if($(this).prop('checked')){
//    CheckAll("CanDelete",true);
// }else{
//    CheckAll("CanDelete",false);
// }
//});

//$(document).on("change", "#CanSaveHeader", function() {
// if($(this).prop('checked')){
//    CheckAll("CanSave",true);
// }else{
//    CheckAll("CanSave",false);
// }
//});

//$(document).on("change", "#CanPrintHeader", function() {
// if($(this).prop('checked')){
//    CheckAll("CanPrint",true);
// }else{
//    CheckAll("CanPrint",false);
// }
//});

//$(document).on("change", "#CanProcessHeader", function() {
// if($(this).prop('checked')){
//    CheckAll("CanProcess",true);
// }else{
//    CheckAll("CanProcess",false);
// }
//});


//$(document).on("change", "#CanImportHeader", function() {
// if($(this).prop('checked')){
//    CheckAll("CanImport",true);
// }else{
//    CheckAll("CanImport",false);
// }
//});

//$(document).on("change", "#CanExportHeader", function() {
// if($(this).prop('checked')){
//    CheckAll("CanExport",true);
// }else{
//    CheckAll("CanExport",false);
// }
//});

  
//function CheckAll(colindex,isTrue){
//    $('.'+colindex).prop('checked',isTrue); 
//}
 
//function OnclickInit(i){
//    switch(i){
//        case 1:OnclickCheckBox("CanAccess","CanAccessHeader"); break;
//        case 2:OnclickCheckBox("CanAdd","CanAddHeader"); break;
//        case 3:OnclickCheckBox("CanEdit","CanEditHeader"); break;
//        case 4:OnclickCheckBox("CanDelete","CanDeleteHeader"); break;
//        case 5:OnclickCheckBox("CanSave","CanSaveHeader"); break;
//        case 6:OnclickCheckBox("CanPrint","CanPrintHeader"); break;
//        case 7:OnclickCheckBox("CanProcess","CanProcessHeader"); break; 
//        case 8:OnclickCheckBox("CanImport","CanImportHeader"); break; 
//        case 9:OnclickCheckBox("CanExport","CanExportHeader"); break;
//    } 
//}
 

//function OnclickCheckBox(selected,header){ 
//   // alert(selected);
//    var isCheckALL = true; 
//    $('.'+selected).each(function(){ 
//        if(!$(this).prop("checked")){ 
//        isCheckALL = false; 
//        }            
//    });
    
//    $('#'+header).prop('checked',isCheckALL);  
//}



//$(function() {
//    $.contextMenu({
//        selector: '#grid2-nwData > tbody > tr', //'#grid1-nwData > tbody > tr', 
//        callback: function(key, options) {
//        if (key == "ALL") { CheckAllRow(true) }
//        else if (key == "None") { CheckAllRow(false)}
//        else {
//            return false;
//         }
//        },
//        items: {
//           "ALL": { name: "Select All", icon: " " },
//           "None": { name: "Select None", icon: " " } 
//        }
//    }); 
//});

//function CheckAllRow(isSelectAll){   
//    crnwTable = $("#nwGrid2 .tblGridBody");
 
//    var colcount = crnwTable.find("td").length; 
   
//    $('#dataset'+crnwTR.index()+' > td > input').prop('checked',isSelectAll);
//    $(crnwTR).find(' td  > input').prop('checked', isSelectAll);
 
//    $(crnwTable).find("tr.p8rowselected").find(' td  > input').prop('checked', isSelectAll);
//}


$(document).on("click", "#nwgrid-nwData > tbody > tr", function (e) {
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
    $("#nwgrid-nwData").find("tr").addClass("p8rowselected");
});
