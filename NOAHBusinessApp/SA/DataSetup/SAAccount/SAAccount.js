NaviationFlag = true;
var nwaccess = "";

var nwGrid1_Book;
var nwGrid1_Sheet;

$(function() {
if (getParameterByName("nwsecadmin") == "1")
    $('#noah-webui-default-New').hide();
});

function func_Reload()
{

    crnwTagSingleBind = true;
    crLnk = "../SAAccount/SAAccount_Gateway";
    crLnkGateKey = "SAAccount";

    $("#noah-webui-default-Delete").enable(false);
    $("#noah-webui-default-Save").enable(false);

    var isContinue = true;
    $("#inCode").prop("disabled", true);
    $("#inDesc").prop("disabled", true);
    $('#inPassword').prop("disabled", true);
    $('#inCheck3').prop("disabled", true);
    $('#inCheck4').prop("disabled", true);

    $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);

    init_request();

    //DisableFields(); //CAR: 02.11.2020
    //func_LoaderShow("Angelo", 0);
   
    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
    Clear_Footer();
    //EnableFields(); //CAR: 02.11.2020

   $(".history_switch").prop("disabled", true);
    $('#chkBox').prop('checked', true);

    var isContinue = true;
    $("#inCode").val("");
    $("#inDesc").val("");
    $("#inPassword").val("");
    $("#inCode").prop("disabled", false);
    $("#inDesc").prop("disabled", false);
    $('#inPassword').prop("disabled", false);
    $('#inCheck3').prop("disabled", false);
    $('#inCheck4').prop("disabled", false);
    refreshScreen();


    $("#inCode").focus();
    func_Toolbox_Clear();
    //isContinue = false;
    
     // func_ActionDriven("actTry", false);

    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    //alert(isClick);
    
    
    
    if (!isMessageQuestionNavigation){
        parent_MessageBoxQuestionToolBox("Would you like to save the current record?", "User Account", "", indef, enume);
        isContinue = false;
        isMessageQuestionNavigation = false;
    }

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Would you like to delete the current record?", "User Account", "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    isClick = false;
    cust_GetPara();
    $("#inCode").attr("disabled", true);
 //   $("#inDesc").attr("disabled", true);
    $("#inDesc").focus();
    isRefreshed = true; 
    //func_PromptSave(); 
    //    parent_MessageBoxQuestionToolBox("Do you want to Refresh", "", "", indef, enume);
    //  isContinue = false;

    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true); //CAR: 02.11.2020
    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    nwParameter_Add('nwaccess', nwaccess);

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
    //tableToPrint("nwExportContainer");
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

function func_LookUpInitialize(dimP)
{
        nwParameter_Add('nwaccess', nwaccess); 
        GetList();
        return true;
}


///////////////////// Bind tool
function cust_GetPara() {
    nwParameter_Add("inCode", $('#inCode').val());
    nwParameter_Add("inDesc", $('#inDesc').val());
    nwParameter_Add("inPassword", $('#inPassword').val());
    nwParameter_Add("isClick", isClick);
  
    nwParameter_Add("inCheck2", $("#inCheck2").prop("checked"));
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    isClick = false;
    $("#inCode").prop("disabled", true);
    $('#inDesc').prop('disabled', true);
    $('#inDesc').focus();
    return isContinue;
}

var xvalueXX=""; 
function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    isClick = false;
    $("#nwGrid1").removeClass("nwHide"); // custom


    nwParameter_Add("inCheck2", $("#inCheck2").prop("checked"));
    //##ARM## 01-28-2016
    if (unescape(xvalueXX) == "") xvalueXX = $("#inCode").val();
    else xvalueXX = $("#inCode").val();
    nwParameter_Add("inPassword", $("#inPassword").val());
    nwParameter_Add("inCode", xvalueXX);

    $("#inDesc").prop("disabled", false);
    $('#inPassword').prop("disabled", false);
    $('#inCheck3').prop("disabled", false);
    $('#inCheck4').prop("disabled", false);

    nwLoading_Start("actBindCollection", crLoadingHTML); 
    func_ActionDriven("actBindCollection", false);
    xvalueXX="";
    $("#inDesc").focus();

    //CAR: 02.11.2020
    $(".history_switch").prop("disabled", false);
    $('#chkBox').prop('checked', true);
}


function func_callPower(){
    if($("#inCheck2").prop("checked")==false){
        //$("#nwGrid1").css("display", "none");
        $("#nwGrid1").addClass("nwHide");
             //$("#nwp-newuser").css("display", "none");
             $("#nwp-newuser").addClass("nwHide");
             $("#frmPowerUser").hide();
            }
            else {
                $("#frmPowerUser").show();
               //$("#nwGrid1").css("display", "block");
               //$("#nwp-newuser").css("display", "block");
                $("#nwp-newuser").removeClass("nwHide");
                $("#nwGrid1").removeClass("nwHide");
      }
      
                 nwLoading_End("xSample", crLoadingHTML);
                 nwLoading_End("xSampleX", crLoadingHTML);   
}




///////////////////////////////////////

function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
        cust_GetPara();
        nwParameter_Add("inCheck2", $("#inCheck2").prop("checked")); 
       // func_ActionDriven("actBindCollection", false);
    } 
    else if (idName == 'lug_grid1') {
        crnwTR.find('td:eq(2) button').text($('#dimTableLookUp tr:eq(0) td:eq(0)').text());
    }
}
 
function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
  //  alert("wew");
    // alert(addtoListTableRec.html());
    // alert(addtoListTableRec.find('tr:eq(' + index + ') td:eq(0)').html());
    
      var value3=addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
      var value4=addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
     
       // alert(value3);
      //  alert(value4);
       // alert();
       //var tempvalue = "";
     //  tempvalue = "<button class=\"lug_grid2\">"+value3+"</button>";
       //alert(tempvalue + " - " + nwLib.nwTempTable_RowData_Get(nwGridID,0,1));
       //alert(value3);
       //alert(nwLib.nwTempTable_RowData_Get(nwGridID,0,1));
       //alert(nwGridID);
       //var tem_table_length = 
       //alert(nwTempTable_Row_Count(nwGridID));
       
       //alert(nwLib.nwTempTable_RowData_Get(nwGridID,0,1));
       
       
       var isValid = nwLib.nwTempTable_Column_ValueExist(nwGridID,2,value3);  
       
       //alert(isValid);
     if(isValid == false){
        // crnwTRtemp.find('td:eq(2) button').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text());
         crnwTRtemp.find('td:eq(2)').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text());
         crnwTRtemp.find('td:eq(3)').text(addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text());
         }else{crnwTRtemp =  null; }
        //checknull("grid1");
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

    if (nwobjID == "powusergrid") {
        //alert(crnwTD.index());
        if (crnwTD.index() == 2) {
            
          //  var selectedInput = "UserLookup";
           // lookUpCustomize(selectedInput, 2);
        }
    }

    else if (nwobjID == "grid2") {
        if (crnwTD.index() == 2) {
            var selectedInput = "lug_grid2";
            lookUpCustomize(selectedInput, 2);
        }
    }
    else if (nwobjID = "grid1"){
     if (crnwTD.index() == 2) {
            
           // var selectedInput = "UserLookup";
          //  lookUpCustomize(selectedInput, 2);
            
        }
    }
}




/////////////

//var something = 999;
//var something_cachedValue = something;




var isClick = false;
var isRefreshed = false;
$(document).on("focus", "#inPassword", function() {
    if (isClick == false) {
        nwParameter_Add("inPassword", $(this).val());
        isClick = true;
        func_ActionDriven("actpass", false);
    }

}).on("click", "#inPassword", function() {
    nwParameter_Add("inPassword", $(this).val());
    isClick = true;
    // func_ActionDriven("actpass", false);

});

$(document).on("change", "#inCheck2", function() {
    if ($("#inCheck2").prop("checked") == true)
    {
        func_ViewPowerUsrGrid();
        $("#frmPowerUser").show();
    }
    else
    {
        //$("#nwGrid1").css("display", "none");
        $("#nwGrid1").addClass("nwHide");
        //$("#nwp-newuser").css("display", "none");
        $("#nwp-newuser").addClass("nwHide");
        $("#frmPowerUser").hide();
    }
    func_callPower();
});


function func_ViewPowerUsrGrid(){
    if (isRefreshed)
    {
        func_ActionDriven("actLoadEmptyGrid", false);
        //$("#nwGrid1").css("display", "block");
        $("#nwGrid1").removeClass("nwHide");
        //$("#nwp-newuser").css("display", "block");
        $("#nwp-newuser").removeClass("nwHide");
    }
    else
    {
        //$("#nwGrid1").css("display", "none");
        $("#nwGrid1").addClass("nwHide");
        //$("#nwp-newuser").css("display", "none");
         $("#nwp-newuser").addClass("nwHide");
    }
}

function func_PromptSave(){
    if ($("#inCheck2").prop("checked"))
    {
        msgBoxContainerQuestion = 11;
        parent_MessageBoxQuestion("Do you want to save current record?", "User Account", "");
    }
}

$(document).on("click", "button", function(e){
return false;
});

$(document).on("click", "#nwp-newuser", function(e){
    //  alert("wew");

    nwParameter_Add('nwaccess', nwaccess);
    crnwTable = $("#grid1 .tblGridBody");
    crnwTR= $("#grid1 .tblGridBody tr:eq(0)");
    crnwTD= $("#grid1 .tblGridBody tr:eq(0) td:eq(2)");
    crnwTable = $("#grid1 .tblGridBody");
    crnwTableCon= $("#grid1.nwGrid");
    var selectedInput = "UserLookup";
    lookUpCustomize(selectedInput, 2);
            
});

//ADDED BY JNB 12-03-2019
function GetList() {

    var row_count = nwTempTable_Row_Count("nwGrid1");
    var user_code = "";

    for (var x = 0; x < row_count; x++) {
    
        if (user_code != "")
            user_code += "|";

        user_code += nwLib.nwTempTable_RowData_Get("nwGrid1", x, 1);
    
    }

    user_code += "|" + $('#inCode').val();

    nwParameter_Add("user_code", user_code);

}


function refreshScreen(){
$("#inCheck1").prop("checked",false);
$("#inCheck2").prop("checked",false);
$("#inCheck3").prop("checked",false);
$("#inCheck4").prop("checked",false);
    //$("#nwGrid1").css("display", "none");
$("#nwGrid1").addClass("nwHide");
//$("#nwp-newuser").css("display", "none");
$("#nwp-newuser").addClass("nwHide");
//$(".history_switch").prop("disabled", false);
//$('#chkBox').prop('checked', true);

//EnableFieldsDone(); //CAR: 02.11.2020
 //func_ActionDriven("actLoadEmptyGrid", false);
}

 function func_nwGrid_DeleteFinal()
 {
     if(crnwTable.find("tr").length <= 0)
       func_nwGrid_AddRow(crnwTable.parents(".nwGrid").parent().attr("id")); 
 }
 
 
 function Clear_Footer()
 { 
    $('#nwtxt_RecUser').text("");
    $('#nwtxt_RecDate').text("");
    $('#nwtxt_ModUser').text("");
    $('#nwtxt_ModDate').text("");
    $('#chkBox').prop('checked', true); //CAR: 02.11.2020
 }

//CAR: 02.11.2020
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
    else if (genID == "closing") {
    if (answer == "Yes") {
            isClose = true;
            parent.mainParent_Close_Form();

        }
    }

}

var isClose = false;
window.CloseMenuItem = function(args) {
    var isContinue = true;
//    if (isClose == false) {
//        msgBoxContainerQuestion = "closing";
//        MessageBoxQuestion("cANNOT cLOSE");
//        isContinue = false;
//    }
    return isContinue;
}



function Message_OkF() {
    mainParent_Close_Form();
}


$(document).on('change', '#inCheck3', function () {

    if ($(this).prop('checked'))
        $('#inCheck4').prop('checked', false);

});

$(document).on('change', '#inCheck4', function () {

    if ($(this).prop('checked'))
        $('#inCheck3').prop('checked', false);

});








