 var currentDate = new Date();
  var day = currentDate.getDate();
   var month = currentDate.getMonth() + 1;
   var year = currentDate.getFullYear();

   var nwaccess = "";
   
function func_Reload() {

    crLnk = GetCurrentURL() + "SAUserActivityLog_Gateway";
    crLnkGateKey = "SAUserActivityLog";

    var isContinue = true;

    init_request();

    $('#noah-webui-Toolbox').bindingExport().enable(false);
    
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
    $("#inDesc").val("");
    $("#inCode").attr("disabled", false);
    $("#inDesc").attr("disabled", false);
    $("#idvallugCode").val("");
    $("#descvallugCode").val("");
    $("#inCode").focus();

    //isContinue = false;
    ClearFields();

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
 //$("#nwPager").html("");
    var isContinue = true;
    cust_GetPara();
    $("#inCode").attr("disabled", true);
    $("#inDesc").attr("disabled", true);
    validDate();
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
 //   nwParameter_Add_Table("#nwGrid2");
    nwParameter_Add("inCode", $('#inCode').val());
    nwParameter_Add("inDesc", $('#inDesc').val());
    nwParameter_Add("lugCode", $("#idvallugCode").val());
    nwParameter_Add("lugCode2", $("#idvallugCode2").val());
    nwParameter_Add("CompanyDesc", $("#descvallugCode2").val());
   nwParameter_Add("lugCode3", $("#idvallugCode3").val());
   nwParameter_Add("txtSearch", $("#txtSearch").val());
   
    nwParameter_Add("combobox1", $('#combobox1').val());
    nwParameter_Add("thru", $('#thru').val());
    nwParameter_Add("from", $('#from').val());

    nwParameter_Add("nwaccess", nwaccess);
    
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

function Lookup_DoneFunction(idName, idNum) {


    if (idName == 'toolboxInquire') {
        cust_GetPara();
        func_ActionDriven("actBindCollection", false);
    }

    else if (idName == 'lugCode') {
 if($('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(0)').text() == "-"){
        $("#idvallugCode").val("");
        $("#descvallugCode").val("");
    }
    $('#idvallugCode2').val('');
    $('#descvallugCode2').val('');

    func_ActionDriven("actClearGrid", false);
    
    }  
    
    else if (idName == 'lugCode2') {
 if($('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(0)').text() == "-"){
        $("#idvallugCode2").val("");
        $("#descvallugCode2").val("");
    }

    func_ActionDriven("actClearGrid", false);
     
    }  
    else if (idName == 'copyuser') {
        cust_GetPara();
        nwParameter_Add("userCode", $('#dimTableLookUp tr:eq(0) td:eq(0)').text());
        func_ActionDriven("actLoadGrid", false);
    }
    else if(idName == 'lugCode3'){
     if($('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(0)').text() == "-"){
        $("#idvallugCode3").val("");
        $("#descvallugCode3").val("");
    }

    $('#idvallugCode').val('');
    $('#descvallugCode').val('');
    $('#idvallugCode2').val('');
    $('#descvallugCode2').val('');

    func_ActionDriven("actClearGrid", false);
     
    }

}



function nwGrid_AddtoListDone(nwGridID,crnwTRtemp, addtoListTableRec, index) {
   //alert(addtoListTableRec);
    //alert(addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').html());
   
   if (nwGridID == "grid2" || nwGridID == "nwGrid2"){      
       var value1=addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
       var value2=addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
       
      // if (check_duplicate(addtoListTableRec) && value1.replace(" ","") !="")
      //{          
            crnwTRtemp.find('td:eq(2)').text(value1);
            crnwTRtemp.find('td:eq(3)').text(value2);        
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

    cust_GetPara();
    if (nwGridID == "addmodule" || 1==1){

    }
}


function func_LookUpInitialize(lookupID)
{

    var isContinue = true;
       cust_GetPara();
        if(lookupID==""){
         crParaObj="aagnone";
         }
    return isContinue;
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

    if (nwobjID == "grid1") {
        //alert(crnwTD.index());
        if (crnwTD.index() == 2) {
           // var selectedInput = "adduser";
         //   lookUpCustomize(selectedInput, 2);
        }
    }
    
    else if (nwobjID == "grid2") {
        if (crnwTD.index() == 2) {
         //   var selectedInput = "addmodule";
          //  lookUpCustomize(selectedInput, 2);
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

function func_LoadPager(pageno){
    //alert("sada");
    
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
   nwParameter_Add("version", $('#version').val());
   func_ActionDriven("actPagerClick", false);
}


//$(document).on("focus", "#from", function() {
//    $(this).mask("99/99/9999");
//});


//$(document).on("focus", "#thru", function() {
//    $(this).mask("99/99/9999");
//});


function LoadpagerInit(ver){
    cust_GetPara();
    LoadPage(ver,"actLoadPager");
}

function LoadPage(flag,actiondriven){
    try{
  
    $('#nwloading').css("display","block");
    var PresentPage = $('#Input-Pager').val();
    var MaxPage = $('#Max-Pager').text();
    var PageRowNum = $('#Input-Pager-Row').val();
    PageRowNum = parseInt(PageRowNum);
    if(flag == ""){flag = 2;}
    if(parseInt(PresentPage) > parseInt(MaxPage)){
    PresentPage = MaxPage;
    }
    nwParameter_Add("Pager-RowNum", PageRowNum);
    nwParameter_Add("Pager-PresentPage", PresentPage);
    nwParameter_Add("Pager-Flag", flag);
    nwParameter_Add("Pager-Maxpage", MaxPage);
    func_ActionDriven(actiondriven, false);
    }catch(err){$('#nwloading').css("display","none");}
}

$.fn.enterKey = function (fnc) {
    return this.each(function () {
        $(this).keypress(function (ev) {
            var keycode = (ev.keyCode ? ev.keyCode : ev.which);
            if (keycode == '13') {
                fnc.call(this, ev);
            }
        })
    })
}

var inputfocus = "0";
$(document).on("focus", ".Input-Pager-Enter", function(){
inputfocus = "1";
}).on("focusout", ".Input-Pager-Enter", function(){
inputfocus = "0";
});

$(document).enterKey(function () {
    if(inputfocus == "1"){
    //alert("ww");
    cust_GetPara();
    LoadPage("","actLoadPager");
    }
    
});
$(document).on("keypress", "#txtSearch", function(e){

    if(e.which ==13){
      $('#noah-webui-default-Refresh').click();
    }
  
});

      

$(document).on("click", "button", function(){
   return false;
});

function ClearFields() {

    $('#idvallugCode3').val('');
    $('#descvallugCode3').val('');
    $('#idvallugCode2').val('');
    $('#descvallugCode2').val('');
    $('#idvallugCode').val('');
    $('#descvallugCode').val('');
    $('#txtSearch').val('');
    $('#from').val('');
    $('#thru').val('');

    func_ActionDriven("actClearGrid", false);

}
function validDate() {

    var from = $('#from').val();
    var thru = $('#thru').val();

    if (from > thru) {
        nwParameter_Add("InvalidDate", "1");
    }

}

$(document).on('change', '#from', function () {

    var DateFrom = new Date($(this).val());
    var DateTo = new Date($('#thru').val());

    if (DateFrom > DateTo) {
        MessageBox("From Date should not be later than To Date.", "User Activity Log");
        $(this).val('');
    }

});

$(document).on('change', '#thru', function () {

    var DateFrom = new Date($('#from').val());
    var DateTo = new Date($(this).val());

    if (DateFrom > DateTo) {
        MessageBox("To Date should not be earlier than From Date. ", "User Activity Log");
        $(this).val('');
    }

});



