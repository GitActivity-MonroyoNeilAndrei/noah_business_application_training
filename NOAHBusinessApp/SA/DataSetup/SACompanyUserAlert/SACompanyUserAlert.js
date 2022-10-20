
function func_Reload() {

    crLnk = "../SACompanyUserAlert/SACompanyUserAlert_Gateway";
    crLnkGateKey = "SACompanyUserAlert";

          var isContinue = true;
      $("#code").attr("disabled", true);
    $("#desc").attr("disabled", true);
    $("#module").attr("disabled", true);
 //   $("#inCode").prop("disabled", true);
   // $("#inDesc").prop("disabled", true);
    $("#lugCode2").val("");
  //  $("#descvallugCode2").val("");
    $("#lugCode").val("");
  //  $("#descvallugCode").val("");
      $("#idvallugCode").val("");
    $("#descvallugCode").val("");
   // alert("ssss");
  nwPopupForm_Create("nwPopup2");
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
      cust_GetPara();
       // alert("s");
        if(lookupID=="CopyFrom"){
         crParaObj="aagnone";
         }else if(lookupID == "lugCode2"){
       
         cust_GetPara();
         
         }
        
    return isContinue;
}



function Lookup_DoneFunction(idName, idNum) {

    if (idName == 'toolboxInquire') {
        cust_GetPara();
        
    }

    else if (idName == 'lugCode') {

        nwLoading_Start("actInitializeGrid", crLoadingHTML);

        $("#idvallugCode2").val("");
        $("#descvallugCode2").val("");

      func_ActionDriven("actInitializeGrid", false);

    }  
     else if (idName == 'lugCode2' ) {
     
     if($('#menuCreatorContainer .tablecontainter tr:eq('+ idNum +') td:eq(0)').text() == "-"){
       $("#idvallugCode2").val("");
      $("#descvallugCode2").val("");
     }else{}
       
       
       }
       
      else if (idName == 'CopyFrom'){
     
          nwLoading_Start("actcopyfromweb", crLoadingHTML);

          var Company = $("#idvallugCode").val();
          var User = $('#menuCreatorContainer .tablecontainter tr:eq(' + idNum + ') td:eq(0)').text();

          nwParameter_Add("Company", Company);
          nwParameter_Add("User", User);

        func_ActionDriven("actcopyfromweb", false);  
            
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

$(document).on("click", "#LoadUserAlert", function () {

    var Company = $("#idvallugCode").val();
    var User = $("#idvallugCode2").val();
    var Filter = $("#inSearch").val();
    var Error = "";

    if (Company.length <= 0) {

        Error += "Cannot proceed. Company is required. \n";

    }

    if (User.length <= 0) {

        Error += "Cannot proceed. User is required.";

    }

    if (Error.length > 0) {

        MessageBox(Error, "Company User Alert", "error");

    }
    else {

        nwLoading_Start("actLoadGrid", crLoadingHTML);
        cust_GetPara();
        nwParameter_Add("Company", Company);
        nwParameter_Add("User", User);
        nwParameter_Add("Filter", Filter);
        nwParameter_Add("Type", $('#combobox1').val());

        func_ActionDriven("actLoadGrid", false);

    }
   


    


});


$(document).on("click","#SaveUserAlert",function(){
    var Company = $("#idvallugCode").val();
    var User = $("#idvallugCode2").val();
    var Filter = $("#inSearch").val();
    var Error = "";

    if (Company.length <= 0) {

        Error += "Cannot be saved. Company is required. \n";

    }

    if (User.length <= 0) {

        Error += "Cannot be saved. User is required.";

    }

    if (Error.length > 0) {

        MessageBox(Error, "Company User Alert", "error");

    }
    else {

        nwLoading_Start("actSave", crLoadingHTML);
                cust_GetPara(); 
                func_ActionDriven("actSave", true);    

     }  
});

$(document).on("click","#CopyFrom",function(){

    var Company = $("#idvallugCode").val();
    var User = $("#idvallugCode2").val();
    var Filter = $("#inSearch").val();
    var Error = "";

    if (Company.length <= 0) {

        Error += "Cannot be saved. Company is required. \n";

    }

    if (User.length <= 0) {

        Error += "Cannot be saved. User is required.";

    }

    if (Error.length > 0) {

        MessageBox(Error, "Company User Alert", "error");

    }
    else {
   
   var selectedInput = "CopyFrom";
     cust_GetPara(); 
     func_LookUpInitialize("CopyFrom");   
     lookUpCustomize(selectedInput, 1);  

     }  

});


$(document).on("click","#copyuser",function(){
    var selectedInput = "copyuser";
     lookUpCustomize(selectedInput, 1);     
});

$(document).on("change","#combobox1",function(){

});
 

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

$(document).on("change", "#version", function() {

 $("#nwPager").html("");
  func_ActionDriven("actBindCollection", false);
    
});


   









