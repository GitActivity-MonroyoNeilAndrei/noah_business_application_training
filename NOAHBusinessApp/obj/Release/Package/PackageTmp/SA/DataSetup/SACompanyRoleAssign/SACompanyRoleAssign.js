
function func_Reload() {
    crLnk = "../SACompanyRoleAssign_Gateway.aspx";
    crLnkGateKey = "SACompanyRoleAssign";


    var isContinue = true;
    $("#inCode").prop("disabled", true);
    $("#inDesc").prop("disabled", true);
    //$(".LookUp").prop("disabled", true);
    $("#nwGrid2").find("input,button,textarea").attr("disabled", "disabled");
    $(".nwgrid_AddNew").prop("disabled", true);
    init_request();

    $('#lugCode').enable(false);
    $('#lugCode2').enable(false);

    $('#noah-webui-default-Delete').enable(false);

   // nwPopupForm_Create("ccc");
   // $("#ccc").show();
    
    // func_ToolboxData("#noah-webui-Toolbox-Grid", "toolbox");
    return isContinue;
}

////////////////////////// TOol Box

$(function(){
    nwPanelTab_Create("settingstabs");
});

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    
    Clear_Footer();
    $("#inCode").val("");
    $("#inDesc").val("");
    $("#inCode").attr("disabled", false);
    $("#inDesc").attr("disabled", false);
    $(".LookUp").prop("disabled", false);
    $(".nwgrid_AddNew").prop("disabled", false);
    $("#idvallugCode").val("");
    $("#descvallugCode").val("");
    $("#inCode").focus();
    $("#inSql").val("");
    $("#idvallugCode2").val("");
    $("#descvallugCode2").val("");

    $('#lugCode').enable(true);
    $('#lugCode2').enable(true);
    
    //isContinue = false;

    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to save the current record?", "Company Roles Assignment", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to delete the current record?", "Company Roles Assignment", "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    $("#inCode").attr("disabled", true);
    $("#inDesc").attr("disabled", true);
    $('#noah-webui-default-Delete').enable(true);
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

    nwParameter_Add("idvallugCode", $('#idvallugCode').val());
    nwParameter_Add("idvallugCode2", $('#idvallugCode2').val());

}
function func_Check_Lookup() {
    nwParameter_Add("nwgrid_nwinstance_nwGrid2", $("#grid2").attr("nwinstance"));
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    $("#inCode").prop("disabled", true);
    $('#inDesc').prop('disabled', true);
    return isContinue;
    
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    $('#lugCode').enable(false);
    $('#lugCode2').enable(false);
    func_ActionDriven("actBindCollection", false);
}


///////////////////////////////////////

function func_LookUpInitialize(lookupID)
{
    var isContinue = true;
        
    cust_GetPara();

        GetList();


    return isContinue;
}

function GetList() {

    var row_count = nwTempTable_Row_Count("nwGrid2");
    var user_code = "";

    for (var x = 0; x < row_count; x++) {

        if (user_code != "")
            user_code += "|";

        user_code += $('#nwGrid2 tr:eq(' + x + ') td:eq(2) button').text();

    }

    nwParameter_Add("user_code", user_code);

}


function Lookup_DoneFunction(idName, idNum) {

    if (idName == 'toolboxInquire') {
        cust_GetPara();
        //func_ActionDriven("actBindCollection", false);
    }

    else if (idName == 'lug_grid1') {
       
        crnwTR.find('td:eq(2) button').text($('#dimTableLookUp tr:eq(1) td:eq(2)').text());
        
    }  
     else if (idName == 'lugCode2' ) {
    // alert(lugCode2);
        cust_GetPara();   
        nwParameter_Add("idvallugCode2 ", $('#dimTableLookUp tr:eq(0) td:eq(0)').text());  
    //    crnwTR.find('.nwGrid2 td:eq(2) button').text($('#dimTableLookUp tr:eq(1) td:eq(2)').text());     
        //func_ActionDriven("actLoadGrid", false);
       }
     
      
}



function nwGrid_AddtoListDone(nwGridID,crnwTRtemp, addtoListTableRec, index) {
   //alert(addtoListTableRec);
    //alert(adcust_GetPara();  dtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').html());
   
   if (nwGridID == "grid2" || nwGridID == "nwGrid2"){ 
   
       var value1=addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
       var value2=addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
         
      var isValid = nwLib.nwTempTable_Column_ValueExist(nwGridID,2,value1); 
          
     if(isValid == false){crnwTRtemp.find('td:eq(3)').text(value2); crnwTRtemp.find('td:eq(2) button').text(value1);}else{crnwTRtemp =  null; }
  

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

    if (nwobjID == "grid1") {
        //alert(crnwTD.index());
        if (crnwTD.index() == 2) {


            var selectedInput = "adduser";
            lookUpCustomize(selectedInput, 2);
        }
    }
    
    else if (nwobjID == "grid2") {
    
        if (crnwTD.index() == 2) {
          cust_GetPara();
         // alert("ww");
          var selectedInput = "lug_grid1";
          lookUpCustomize(selectedInput, 2);
               
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


$(document).on("click","button",function(){
return false;

});

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

$(document).on("click","#copymodule",function(){
    var selectedInput = "copymodule";
     lookUpCustomize(selectedInput, 1);     
});

$(document).on("click","#copyuser",function(){
    var selectedInput = "copyuser";
     lookUpCustomize(selectedInput, 1);     
});




//$(document).on("click","#nwGrid2 td button.lug_grid1",function(){

//});



function  cust_LookUpLoad()
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






 
 function Clear_Footer(){ 
$('#nwtxt_RecUser').text("");
$('#nwtxt_RecDate').text("");
$('#nwtxt_ModUser').text("");       
$('#nwtxt_ModDate').text("");
 }



 function EnableFieldsDone() {//Binding Done
     $(".history_switch").prop("disabled", false);
     $('#chkBox').prop('checked', true);
 }

 function DefaultCheck() {
     $('#chkBox').prop('checked', true);
 }

