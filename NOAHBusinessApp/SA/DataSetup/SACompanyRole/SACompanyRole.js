
function func_Reload() {
    crLnk = "../SACompanyRole_Gateway.aspx";
    crLnkGateKey = "SACompanyRole";

    //CAR: 02.11.2020
    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);

    var isContinue = true;
    $("#inCode").prop("disabled", true);
    $("#inDesc").prop("disabled", true);
    init_request();
     
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
    $("#inCode").val("");
     Clear_Footer();

    $("#inDesc").val("");
    $("#inCode").attr("disabled", false);
    $("#inDesc").attr("disabled", false);
    $("#idvallugCode").val("");
    $("#descvallugCode").val("");
    $("#inCode").focus();
    $("#inSql").val("");
    $("#idvallugCode2").val("");
    $("#descvallugCode2").val("");

    //CAR: 02.11.2020
    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);
    
    //isContinue = false;

    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to save the current record?", "Roles", "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to delete the current record?", "Roles", "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    $("#inCode").attr("disabled", true);
    $("#inDesc").attr("disabled", true);

    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);

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

}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    $("#inCode").prop("disabled", true);
    $('#inDesc').prop('disabled', true);
    return isContinue;
    
}
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();

    $("#inDesc").prop("disabled", false);
    func_ActionDriven("actBindCollection", false);

    //CAR: 02.11.2020
    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);

}


///////////////////////////////////////

function func_LookUpInitialize(lookupID)
{
    var isContinue = true;
        
        if(lookupID=="lugCode"){
        cust_GetPara();
           }
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
        nwParameter_Add("idvallugCode2 ", $('#dimTableLookUp tr:eq(0) td:eq(0)').text());  
    //    crnwTR.find('.nwGrid2 td:eq(2) button').text($('#dimTableLookUp tr:eq(1) td:eq(2)').text());     
        func_ActionDriven("actLoadGrid", false);
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

    if (nwobjID == "grid1") {
        //alert(crnwTD.index());
        if (crnwTD.index() == 2) {
            var selectedInput = "adduser";
            lookUpCustomize(selectedInput, 2);
        }
    }
    
    else if (nwobjID == "grid2") {
        if (crnwTD.index() == 2) {
            cust_LookUpLoad();
               
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



function Clear_Data(){
$("#inCode").val("");
$("#inDesc").val("");
$('#chkBox').prop('checked', true); //CAR: 02.11.2020
}

$(document).on("click", "#btnHistory", function (e) {
    if ($('#chkBox').prop('checked')) {
        nwParameter_Add("code", $('#inCode').val());
    } else {
        nwParameter_Add("code", '');
    }
    func_ActionDriven("actLoadMainHistorical");
    nwLoading_Start("actLoadMainHistorical", crLoadingHTML);
    return false;
});
 
 function Clear_Footer(){ 
$('#nwtxt_RecUser').text("");
$('#nwtxt_RecDate').text("");
$('#nwtxt_ModUser').text("");
$('#nwtxt_ModDate').text("");
}