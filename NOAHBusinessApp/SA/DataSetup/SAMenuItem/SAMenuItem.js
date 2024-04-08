
function func_Reload() {

    var isContinue = true;
    $("#inCode").prop("disabled", true);
    $("#inDesc").prop("disabled", true);
    $("#icon").prop("disabled", true);
    $("#inCode").val("");
    $("#desCode").val("");
    $("#lugCode2 .Lookup").prop("disabled", true);
    $("#link").val("");

    crLnk = GetCurrentURL() + "SAMenuItem_Gateway";
    crLnkGateKey = "SAMenuItem";
    init_request();
    isContinue = true;
    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
 Clear_Footer();

    $("#inCode").val("");
    $("#inDesc").val("");
    $("#inCode").attr("disabled", false);
    $("#inDesc").attr("disabled", false);
    $("#inCode").focus();
    $("#desCode").val("");
    $("#link").val("");
    $("#idvallugCode2").val("");
    $("#combobox1").val("");
    //alert("ss");
    //  func_ActionDriven("actBindCollection", false);
    //  func_ActionDriven("actLoadGrid", false);
    isContinue = true;
    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to save the current record?", "", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
     var isContinue = true;
   
     cust_GetPara();
     parent_MessageBoxQuestionToolBox("Would you like to delete the current record?", "", "", indef, enume);
     isContinue = false;
     return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    $("#inCode").attr("disabled", true);
  //  $("#inDesc").attr("disabled", true);
    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    return isContinue;
}

//function func_ToolboxProcess(indef, enume) {
//    alert("s");
//    var isContinue = true;
//    return isContinue;
//}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxExport(indef, enume) {

    var isContinue = true;
    return isContinue;
}

function func_ToolboxPrint(indef, enume) {
    var isContinue = true;
    tableToPrint("grid1Data");
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
    nwParameter_Add("OtherApp", $('#idvallugOtherApp').val());
    nwParameter_Add("desCode", $('#desCode').val());
    nwParameter_Add("combobox1", $('#combobox1').val());
    nwParameter_Add("link", $('#link').val());
    nwParameter_Add("exeversionmodule", $('#idvallugCode2').val());
    nwParameter_Add("icon", $('#icon').val());
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    $("#inCode").prop("disabled", true);
    $('#inDesc').prop('disabled', true);
    return isContinue;
}
function func_ToolboxNavigatorBind_Done() {
$("#radio2").prop("checked", false);
$("#radio1").prop("checked", false);
var str = $('#icon').val();
var n = str.search("icon_diskette.png");
    if(n == "-1"){
        
    }
    else{
    
       $("#radio1").prop("checked", true);
    }
   
 var  n2 = str.search("icona_menu_item.png");
     if(n2 == "-1"){
        
    }
    else{
       $("#radio2").prop("checked", true);
    }
    cust_GetPara();
    func_ActionDriven("actBindCollection", false);
}


///////////////////////////////////////


function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {

        cust_GetPara();
        func_ActionDriven("actBindCollection", false);
    }
    else if (idName == 'CopyFrom') {
        nwParameter_Add("CopyFrom", $('#dimTableLookUp tr:eq(0) td:eq(0)').text());
        cust_GetPara();
        func_ActionDriven("actcopyfrom", false);
    }
    else if (idName == 'lug_grid1') {
        var value1 = ("lug_grid1", $('#dimTableLookUp tr:eq(0) td:eq(1)').text());
        crnwTR.find('td:eq(5) input').val(value1);
    }
   else if (idName == 'lug_grid2') {
        var value1 = ("lug_grid2", $('#dimTableLookUp tr:eq(0) td:eq(1)').text());
        crnwTR.find('td:eq(6) input').val(value1);
    }
   else if (idName == 'lug_grid3') {
        var value1 = ("lug_grid3", $('#dimTableLookUp tr:eq(0) td:eq(1)').text());
        crnwTR.find('td:eq(4) input').val(value1);
    }
    
  else if (idName == 'lug_grid4') {
        var value1 = ("lug_grid4", $('#dimTableLookUp tr:eq(0) td:eq(1)').text());
        crnwTR.find('td:eq(6) input').val(value1);
    }
}



function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {

    crnwTRtemp.find('td:eq(2) button').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text());
    crnwTRtemp.find('td:eq(3) input').val(addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text());

    crnwTRtemp.find('td:eq(4) input').val("MR. " + addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text());

    return crnwTRtemp;
}


function nwGrdi_Change(nwobj, nwobjrow, nwobjitem) {

    var ss = nwobjitem.find('#selecta').val();
    nwobjrow.css('background-color', 'black');

}
function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
    var ss = nwobjitem.find('#selecta').val();

}
 var cc;
     var temp;
function nwGrid_tdClick(nwobjID) {

    if (nwobjID == "grid1") {

        if (crnwTD.index() == 6) {
            
            var value1 = crnwTR.find('td:eq(3) select').val();
            
            if (value1 == "Fixed") {
                     
            }
            else if(value1 == "User Defined") {
              
               var value2 = crnwTR.find('td:eq(5) input').val();
              // alert(value2);
               if(value2 == "Password"){
                var selectedInput = "lug_grid2";
                lookUpCustomize(selectedInput, 1);
               }
               else if(value2 == "Date"){
                var selectedInput = "lug_grid4";
                lookUpCustomize(selectedInput, 1);
               } else{
               
               }

            
            } else if(value1 == "System Generated")
                    {
                   
                    
               }
      }

        else if (crnwTD.index() == 3) {
                
              var value1 =  crnwTR.find('td:eq(3) select').val();
              
             // alert(value1);
           //   alert(temp);

             if(value1 != temp){crnwTR.find('td:eq(4) input').val("");crnwTR.find('td:eq(6) input').val("");crnwTR.find('td:eq(5) input').val("");crnwTR.find('td:eq(7) input').val("");
           }
                if(value1 == "Fixed" ){
                    
                    crnwTR.find('td:eq(6) input').prop("disabled",true);
                    crnwTR.find('td:eq(5) input').prop("disabled",true);
                    crnwTR.find('td:eq(7) input').prop("disabled",true);
                    crnwTR.find('td:eq(4) input').prop("disabled",false);
                }else if(value1 == "User Defined"){
                      crnwTR.find('td:eq(5) input').prop("disabled",true);
                      crnwTR.find('td:eq(6) input').prop("disabled",true);
                     crnwTR.find('td:eq(7) input').prop("disabled",false);
                     crnwTR.find('td:eq(4) input').prop("disabled",true);
                }else if(value1 == "System Generated"){
                     crnwTR.find('td:eq(5) input').prop("disabled",true);
                     crnwTR.find('td:eq(6) input').prop("disabled",true);
                     crnwTR.find('td:eq(7) input').prop("disabled",false);
                     crnwTR.find('td:eq(4) input').prop("disabled",true);
                }
                temp = value1;
                cc = value1;
        } else if (crnwTD.index() == 4) {
              var value1 =  crnwTR.find('td:eq(3) select').val();
               if(value1 == "System Generated"){
              var selectedInput = "lug_grid3";
               lookUpCustomize(selectedInput, 1);
       }
      }
      else if (crnwTD.index() == 5) {
              var value1 =  crnwTR.find('td:eq(3) select').val();
               if(value1 == "User Defined"){
               crnwTR.find('td:eq(6) input').val("");
              var selectedInput = "lug_grid1";
               lookUpCustomize(selectedInput, 1);
       }
   
      }

    }
}
/////////////
function func_LookUpInitialize(lookupID) {
    var isContinue = true;
    cust_GetPara();
    if (lookupID == "lugCode2") {

        crParaObj = "aagnone";
    }

    return isContinue;
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
}

$(document).on("click", "button", function() {
    return false;

});
$(document).on("change", "#combobox1", function() {
    var filter;
    filter = $('#combobox1').val();
    $('#idvallugCode2').val("");
    if (filter == "CUSTOM") {
        $("#lugCode2 .Lookup").prop("disabled", true);
    }
    else {
        $("#lugCode2 .Lookup").prop("disabled", false);
    }
});


$(document).on("click", "#CopyFrom", function() {
    if ($("#inCode").val() == "") {
        parent_MessageBox("No Code Selected", "", "error");
        return false;
    }
    else {
        var selectedInput = "CopyFrom";
        cust_GetPara();
        func_LookUpInitialize("CopyFrom");
        lookUpCustomize(selectedInput, 1);
    }
});

$(document).on("click", "#AddButton", function() {
    func_nwGrid_AddRow("nwGrid1");
});

$(document).on("click", "#radio1", function() {
      $("#radio2").prop("checked", false);
      $("#icon").val("../materials/default_icons/icon_diskette.png")
});
$(document).on("click", "#radio2", function() {
      $("#radio1").prop("checked", false);
        $("#icon").val("../materials/default_icons/icona_menu_item.png")
});

 $(document).on("change", "#ss", function() {
  crnwTR.find('td:eq(4) input').val("");

});


function checknull(){

    crnwTable = $("#grid1 .tblGridBody");
   
    var data;
    var xrow = crnwTable.find("tr").length;

    var xcol = crnwTable.find("tr:eq(0) td").length - 3 ;

    for(var i=0;i<=xrow;i++){
         for(var a=0;a<=xcol;a++){
        data = crnwTable.find('tr:eq('+i+') td:eq('+a+')').text(); 
        if(data == ""){
        crnwTable.find('tr:eq('+i+') td:eq('+a+')').addClass("nqShow");  
        }else{
        
        }
        }
    }
};

 function Clear_Footer(){ 
$('#nwtxt_RecUser').text("");
$('#nwtxt_RecDate').text("");
$('#nwtxt_ModUser').text("");
$('#nwtxt_ModDate').text("");
}