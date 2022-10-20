function mainParent_dialog_Close(ver) {
   // var parentIDss = ver.parentNode.parentNode.id;
    // $("#" + parentIDss).css("display", "none");
    var temper = $(ver).parents(".noah-webui-dialog");
    //EDIT //06-07-2017 //ARM
    SaveToLogs("0", temper.find('div.noah-webui-dialog-title').text(), "Close", "forms_standards/RunStandard.aspx");
    temper.hide();
    
    try{
        var xIDx = $(temper).attr("id");
        nwLoading_End("x-"+xIDx);
    }
    catch (err) {
        //alert(err); 
     }
}


function mainParent_dialog_Maximize(ver) {
    var temper = $(ver).parents(".noah-webui-dialog");
    if (temper.hasClass("nwPopMaximize"))
        temper.removeClass("nwPopMaximize");
    else 
        temper.addClass("nwPopMaximize");
   // temper.hide();
//    try {
//        var xIDx = $(temper).attr("id");
//        nwLoading_End("x-" + xIDx);
//    }
//    catch (err) { alert(err); }
}



function mainParent_dialog_Open(verID) {

    if(verID == "noah-webui-Configuration"){
    
    crLnk = "Modules_Gateway/noahweb_Gateway.aspx";
    crLnkGateKey = "aagMain";
    func_ActionDriven("actLoadSystemConfiguration", false);
    }
    
    var w = $(window).width();
    var h = $(window).height();if (h < 650) h = 651;
    var d = document.getElementById(verID);
    var divW = $(d).width();
    var divH = $(d).height() + 30;
    
    d.style.position = "absolute";
    d.style.top = (h / 2) - (divH / 2) + "px";
    d.style.left = (w / 2) - (divW / 2) + "px";


    $("#" + verID).css("display", "block");
    
    mainParent_dialog_Open_Done(verID);
    $("#"+verID).resize();
}

function mainParent_dialog_Open_Done(verID) {

    if (verID == "noah-webui-ChangePassword") {
        $("#cpPassOld").val("");
        $("#cpPassNew").val("");
        $("#cpPassCon").val("");
        $('#cpPassOld').focus();
    }
}


function mainParentr_maximize_FormsHeader(ver) {
    var part = ver.parentNode;
    if (jQuery('#' + part.id).hasClass('dialog-Minimizer')) {
        $(".ApplicationFormsBlocker").css("display", "");
        $('#' + part.id).removeClass('dialog-Minimizer');
        mainParent_dialog_Open(part.id);
        
    }
    else {
        //var newer = $(part).find(".noah-webui-dialog-close:eq(0)");
        mainParent_maximize_Form(part.id);
        explorer_Select_Forms(part);
        //alert(newer.text());
        explorer_Select_FormsHeader(null, part.id);
    }
    explorer_Forms_ArrangeButtom();

}

//function mainParent_Hide_Forms(ver) {
//    var part = ver.parentNode;
//    mainParent_maximize_Form(part.id);
//    explorer_Select_Forms(part);

//}

function mainParent_minimizeHide_Form() {
    var tempid  = current_SelectedFormID.replace("emi-", "emi-Form-");
    var selectedv = $("#" + tempid).find('.nwhide');
   
    try { mainParent_minimize_Form(); } catch (err) { }
    explorer_Minimize_FormsHeader(selectedv);
    
}

var checkformshavebeenminimize = 0;
function mainParent_minimize_Form() {

checkformshavebeenminimize += 1;
    $('.nwmaximize').removeClass('nwmaximize');
    current_SelectedWindowType = 2;
    var tempid = current_SelectedFormID.replace("emi-", "emi-Form-");
    $('#' + tempid).removeClass('dialog-Minimizer noah-webui-dialog');
   
    $("div.ApplicationForms").addClass("noah-webui-dialog");
    $("div.ApplicationFormsHeader").addClass("noah-webui-dialog-header");
    $("div.ApplicationForms").addClass("dialogOpen");

    $("#toolBar-maxi-Buttons").css("display", "none");
    $("#mainContainer").addClass("nwHide");

    checkif_minimizealready();
    $("div.afcontainer").css("height", "");
    $("div.ApplicationForms").css("min-width", "");
   
    $("div.ApplicationForms.affull").css("min-width","");
    $("div.ApplicationForms.affull").removeClass("nwAAGMaximize");
    
    //$("div.afcontainer").css("min-height", "300px");
    $("div.ApplicationForms").css("position", "absolute");
    
    $("div.ApplicationForms").resizable();
    
}

function checkif_minimizealready() {
    var counter = $("div.afcontainer").length;
    for (var i = 0; i < counter; i++) {
        if (jQuery("div.afcontainer:eq(" + i + ")").hasClass('dialogResized')) {
            $("div.afcontainer:eq(" + i + ")").removeClass("dialogMinimizeCon");
        }
        else {
            $("div.afcontainer:eq(" + i + ")").addClass("dialogMinimizeCon");
        }
    }
}

function mainParent_maximize_FormALL() {

    current_SelectedWindowType = 1;
    var verID =".ApplicationForms.affull ";
    $("" + verID ).removeClass("noah-webui-dialog");
    $("" + verID + " > .ApplicationFormsHeader").removeClass("noah-webui-dialog-header");
    $("" + verID ).removeClass("dialogOpen");
    $("#toolBar-maxi-Buttons").css("display", "block");
    $("#mainContainer").removeClass("nwHide");

   
    
    $("" + verID + "  .afcontainer").removeClass("dialogMinimizeCon");
    //$("div.afcontainer").css("min-height", "300px");
    $("" + verID).css("position", "relative");
    
    $("" + verID).addClass("nwAAGMaximize");
//    $("" + verID ).css("top", "2");
//    $("" + verID ).css("left", "2"); 


}

function mainParent_maximize_Form(verID) {

    current_SelectedWindowType = 1;
    $("#" + verID ).removeClass("noah-webui-dialog");
    $("#" + verID + " > .ApplicationFormsHeader").removeClass("noah-webui-dialog-header");
    $("#" + verID ).removeClass("dialogOpen");
    $("#toolBar-maxi-Buttons").css("display", "block");
    $("#mainContainer").removeClass("nwHide");
    
    $("#" + verID + "  .afcontainer").removeClass("dialogMinimizeCon");
    //$("div.afcontainer").css("min-height", "300px");
    $("#" + verID).css("position", "relative");
    
//    $("#" + verID ).css("top", "2");
//    $("#" + verID ).css("left", "2"); 
    $("" + verID).addClass("nwAAGMaximize");
}

function mainParent_Select_Form(ver)
{ 
   
    var parentID = ver.parentNode.id;
 //    alert(parentID);
    //parentID = parentID.replace("emi-Form-", "emi-");
    current_SelectedFormID = parentID;
    current_SelectedWindowType = 2;
    current_Form_zIndex += 1;
    $("#" + parentID).css("z-index", current_Form_zIndex);
    $('.emi-activeRow').removeClass("nwSelected");
    //alert(parentID.replace("Form", "FormA"));
    explorer_Select_Forms_SetSelected(parentID);
    //$("#" + parentID.replace("Form", "FormA")).addClass("nwSelected");
    
}

function explorer_Minimize_FormsHeader(ver) {
//alert("wew");
    var parentID = $(ver).parents('.ApplicationForms').attr('id');
//    var parentID = ver.parentNode.parentNode.id;

    
    current_SelectedFormID = parentID;
    current_SelectedWindowType = 3;
    current_Form_zIndex += 1;
    $("#" + parentID).css("z-index", current_Form_zIndex);
    $("#" + parentID).addClass("dialog-Minimizer");
    
    try{
        explorer_Forms_ArrangeButtom();
    }
    catch(err){}
}

function mainParent_Close_Form_Min(ver) {
    var parentID = ver.parentNode.parentNode.id;


    parentID = parentID.replace("emi-Form-", "emi-");
    current_SelectedFormID = parentID;
    current_SelectedWindowType = 2;
    mainParent_Close_Form();

}



var main_CheckClosing = false;
function mainParent_Close_Form() {

    if(main_CheckClosing == true){
        msgBoxContainerQuestion = "windowsClose";
        MessageBoxQuestion("Are you sure you want to close the menu item?","Close Menu Window","");
    }
    else {
        mainParent_Close_Form_Continue();
    }

}

function mainParent_Close_Form_Continue(){
    
    var formIDc = current_SelectedFormID;
    formIDc = formIDc.replace("emi-Forms-","emi-");
    formIDc = formIDc.replace("emi-FormsA-","emi-");
    
    var formID = formIDc.replace("emi-", "emi-Form-");
    var formIDa = formIDc.replace("emi-", "emi-FormsA-");

    if (formIDc.endsWith("_fav") || formIDc.endsWith("_rec")) {
        formIDc = formIDc.substring(0, formIDc.length - 4);
    }
    if (formIDa.endsWith("_fav") || formIDa.endsWith("_rec")) {
        formIDa = formIDa.substring(0, formIDa.length - 4);
    }
    if (formID.endsWith("_fav") || formID.endsWith("_rec")) {
        formID = formID.substring(0, formID.length - 4);
    }

    
//  try { if ("emi-Form-gen_NotiButton" == formIDc) $("#gen_NotiConTemp").html($("#gen_NotiCollect")); }
//  catch (err) { }

    var title = $('#' + formIDa).children('div.emi-activeRowName').text();
  
    if(title == ""){
        title = $('#' + formID).children('div.noah-webui-dialog-title').text();
    }
    
    //
    // alert("aa");

    try {
        var xformID = formID+"_xform";
        var isContinue = document.getElementById(xformID).contentWindow.CloseMenuItem();
        if (isContinue == false) return false ;
    } catch (err) {
  
    }
   
 
    crLnk = "Modules_Gateway/noahweb_Gateway.aspx";
    crLnkGateKey = "aagMain";
    nwParameter_Add("MenuItem", title);

    if (formID == "emi-Form-gen_NotiButton") {
        $("#emi-gen_NotiButton .gen_LocHolder").remove();
        $('.gen_LocHolder').css("display", "none");
        $("#emi-gen_NotiButton").append($('.gen_LocHolder'));

    } else {
        nwParameter_Add("MenuItem", title);
        func_ActionDriven("actUpdateUserActivityLog", false);
        SaveToLogs("0", title, "Close", "forms_standards/RunStandard.aspx");
    }

    if (jQuery("#" + formID).hasClass("nwLoc")) {
        $("#nwMainForms").append($("#" + formID + " .gen_LocHolder>*:eq(0)"));
        $("#" + formID).remove();
    }
    else
    $("#" + formID).remove();
    $("#" + formIDa).remove();
    
    var index = -1;  //current_Form_History.indexOf(formIDc);

    for (var i = 0; i < current_Form_History.length; i++) {
        var xstr =current_Form_History[i];
        xstr = xstr.replace("emi-Forms-","emi-");
        xstr = xstr.replace("emi-FormsA-","emi-");
        if (xstr == formIDc) {
            index = i;
            break;
        }
    }

    //alert(current_Form_History + " " + index);

   //if(index == 1){
   // $("#toolBar-maxi-Buttons").css("display", "none");
   //     //document.title = 'Promptus8'
   //     document.title = $('#lblVersion').text();
   //     $('#nwHeaderTitle').text("");
   //     }else{
   // if(checkformshavebeenminimize >=2){
   //     $("#toolBar-maxi-Buttons").css("display", "none");
   //     //document.title = 'Promptus8'
   //        document.title = $('#lblVersion').text();
   //        $('#nwHeaderTitle').text(SetTitle($('#lblVersion').text()));
   //     }else{
   //     //document.title = 'Promptus8'
   //         //if() $("#toolBar-maxi-Buttons").css("display", "none");
            
            
   //         document.title = $('#lblVersion').text();
   //         $('#nwHeaderTitle').text(SetTitle($('#lblVersion').text()));
   //     }
   //}
    if (index > -1) {
        current_Form_History.splice(index, 1);
        if (current_Form_History.length >= 1) {
            current_SelectedFormID = current_Form_History[index - 1];
            //alert(current_Form_History[index - 1]);
        }
        else {
            current_SelectedFormID = "";
           // $("#toolBar-maxi-Buttons").css("display", "none");
        }
    }


    if ($('#FormsContainer .nwAAGMaximize').length <=0 && $('#activeformsList .formList .emi-activeRow').length <=0) {
        $("#mainContainer").addClass("nwHide");
    }
    if ($('#activeformsList .formList .emi-activeRow').length >= 1) {
        explorer_Form_Next();
    }
   
   // 

}

function mainParent_Next_Form() {
    var vindex = $('.emi-activeRow.nwSelected').index();
    var mindex = $('#activeformsList .formList .emi-activeRow.nwSelected').parents("#activeformsList .formList").find(".emi-activeRow").length-1;
    if(vindex >= mindex)
	    vindex = 0;
    else vindex ++;
    $("#activeformsList .formList .emi-activeRow:eq("+vindex+")").click();

}


function mainParent_Close_Form_Except() {
     if(main_CheckClosing == true){
        msgBoxContainerQuestion = "windowsCloseALLExcept";
        MessageBoxQuestion("Are you sure you want to close all menu items? Except current selected menu.","Close Menu Window","");
    }
    else {
       mainParent_Close_Form_Except_Continue() ;
    }

}

function mainParent_Close_Form_Except_Continue() {
    var formIDc = current_SelectedFormID;
    formIDc = formIDc.replace("emi-Forms-","emi-");
    formIDc = formIDc.replace("emi-FormsA-","emi-");
    var formID ="";var formIDc1 = "";
    var formIDa = "";
   
    var xcount =$('#FormsContainer').find('.ApplicationForms').length;//current_Form_History.length;
    var dataremove1 = new Array();
    var dataremove2 = new Array();
    for (var i = 0; i < xcount; i++) {
        //formIDc1 = current_Form_History[i];
        try{
        formIDc1 = $('#FormsContainer').find('.ApplicationForms:eq('+i+')').attr("id");
        formIDc1 = formIDc1.replace("emi-Form-","emi-");
        formIDc1 = formIDc1.replace("emi-Forms-","emi-");
        formIDc1 = formIDc1.replace("emi-FormsA-","emi-");
        
        formIDc1  = formIDc1.replace("-Form-Form-","-Form-");
        
        formID = formIDc1.replace("emi-", "emi-Form-");
        formIDa = formIDc1.replace("emi-", "emi-FormsA-");
        if (formID.replace("-Form-","-") == formIDc.replace("-Form-","-") ) {
            
        }
        else {

            try {

                var title = $('#' + formIDa).children('div.emi-activeRowName').text();
                if (title == "") {
                    title = $('#' + formID).children('div.noah-webui-dialog-title').text();
                }
                nwParameter_Add("MenuItem", title);
                func_ActionDriven("actUpdateUserActivityLog", false);
                SaveToLogs("0", title, "Close", "forms_standards/RunStandard.aspx");
            } catch (err) { }
            
            dataremove1.push(formID);
            dataremove2.push(formIDa);
           // $("#" + formID).remove();
           // $("#" + formIDa).remove();
        }
    } catch (err) { }

    }
    
    xcount = dataremove1.length;
    for (var i = 0; i < xcount; i++) {
        formID = dataremove1[i];
        formIDa = dataremove2[i];
        $("#" + formID).remove(); 
        $("#" + formIDa).remove();
    }
    current_Form_History = new Array();
    current_Form_History.push(formIDc);
    
    if (current_Form_History.length < 1) {
        current_SelectedFormID = "";
        //$("#toolBar-maxi-Buttons").css("display", "none");
        $("#mainContainer").addClass("nwHide");
    }
}

function mainParent_Close_Form_All() {
      if(main_CheckClosing == true){
        msgBoxContainerQuestion = "windowsCloseALL";
        MessageBoxQuestion("Are you sure you want to close all menu items?","Close Menu Window","");
    }
    else {
       mainParent_Close_Form_All_Continue() ;
    }
}

function mainParent_Close_Form_All_Continue() {
    var formIDc = current_SelectedFormID;
     formIDc = formIDc.replace("emi-Forms-","emi-");
     formIDc = formIDc.replace("emi-FormsA-","emi-");
    
    var formID = "";
    var formIDa = "";
    current_SelectedFormID = "";
    for (var i = $('#FormsContainer').find('.ApplicationForms').length-1; i >= 0 ; i--) {
        formIDc =$('#FormsContainer').find('.ApplicationForms:eq('+i+')').attr("id"); //current_Form_History[i];
        
                

        
        formID = formIDc.replace("emi-Form-", "emi-");
        formID = formID.replace("emi-", "emi-Form-");
        
        formIDa = formIDc.replace("emi-Form-","emi-");
        formIDa = formIDa.replace("emi-", "emi-FormsA-");
        
        formIDa  = formIDa.replace("-Form-Form-","-Form-");
        formID= formID.replace("-Form-Form-","-Form-");
        
       try {

        var title = $('#' + formIDa).children('div.emi-activeRowName').text();
            if (title == "") {
                title = $('#' + formID).children('div.noah-webui-dialog-title').text();
            }
            nwParameter_Add("MenuItem", title);
            func_ActionDriven("actUpdateUserActivityLog", false);
            SaveToLogs("0", title, "Close", "forms_standards/RunStandard.aspx");
        } catch (err) { }
        
        
        
        $("#" + formID).remove();
        $("#" + formIDa).remove();
        
        
    }
    current_Form_History = new Array();
    if (current_Form_History.length < 1) {
        current_SelectedFormID = "";
        $("#toolBar-maxi-Buttons").css("display", "none");
        $("#mainContainer").addClass("nwHide");
    }
}

function mainParent_Cascade_Form_All() {
    var formIDc = "";
    var formID = "";
    var formIDa = "";
    mainParent_minimize_Form();
    var top = 0;left = 0;

    $('.dialog-Minimizer').removeClass('dialog-Minimizer');
    
    for (var i = 0; i < $('#FormsContainer').find('.ApplicationForms').length; i++) {
        formIDc = $('#FormsContainer').find('.ApplicationForms:eq('+i+')').attr("id");//current_Form_History[i];
        
        formIDc = formIDc.replace("emi-Forms-","emi-");
        formIDc = formIDc.replace("emi-FormsA-","emi-");
        formIDc  = formIDc.replace("-Form-Form-","-Form-");
        
        formIDc = formIDc.replace("emi-Forms-","emi-");
        formIDc = formIDc.replace("emi-FormsA-","emi-");
        
        formID = formIDc.replace("emi-", "emi-Form-");
        formID  = formID.replace("-Form-Form-","-Form-");
        
        
        current_Form_zIndex += 1;
        $("#" + formID).css("left", left + "px");
        $("#" + formID).css("top", top + "px");
        $("#" + formID).css("z-index", current_Form_zIndex);
        $("#" + formID).css("height", nwdefault_FormHeight + "px");
        $("#" + formID).css("width", nwdefault_FormWidth + "px");
        $("#" + formID).css("max-height", "");
        $("#" + formID).css("min-height", "");
        top += 25;left += 20;
    }
}


//function mainParent_Tile_Horizontally() {
//    var formIDc = "";
//    var formID = "";
//    var formIDa = "";
//    mainParent_minimize_Form();
//    var top = 0; left = 0;
//    for (var i = 0; i < current_Form_History.length; i++) {
//        formIDc = current_Form_History[i];
//        formID = formIDc.replace("emi-", "emi-Form-");
//  
//        
//        current_Form_zIndex += 1;
//        $("#" + formID).css("left", left + "px");
//        $("#" + formID).css("top", top + "px");
//        $("#" + formID).css("z-index", current_Form_zIndex);
//        $("#" + formID).css("height", " 100px");
//        //$("#" + formID).css("max-height", "100px");
//        $("#" + formID).css("min-height", "100px");
//        top += 25; left += 20;
//    }
//}





var temptop = 0; var templeft = 0;
var tempwidth = 0; var tempheight = 0;
var tempwidth2 = 0; var tempheight2 = 0;
var tempRownum = 0; var tempColumn = 0;
var FormMargin = 2;


//function mainParent_Tile_Vertically() {
//    var formIDc = "";
//    var formID = "";
//    var formIDa = "";
//    mainParent_minimize_Form();
//    var top = 0; var left = 0;
//    var width = 0; var height = 0;

//    var xcount = current_Form_History.length;
//    
//    extra_Tile_Vertically(xcount);
//    
//  //  New_extra_Tile_Vertically(xcount);
//    
//    var crData = 1;
//    crData = tempColumn;
//    for (var i = 0; i < xcount; i++) {
//        formIDc = current_Form_History[i];
//        formID = formIDc.replace("emi-", "emi-Form-");
//        current_Form_zIndex += 1;
//       
//        $("#" + formID).css("z-index", current_Form_zIndex);
//        //
//        //top += 25; left += 20;

//        if (crData<0) {
//            temptop += tempheight;
//            templeft = 0;
//            crData = tempColumn;
//        }
//        
//        crData -= 1;
//        
//        $("#" + formID).css("left", (templeft + FormMargin) + "px");
//        
//        $("#" + formID).css("top", (temptop + FormMargin) + "px");

//        $("#" + formID).css("height", (tempheight - (3 * FormMargin)) + "px");
//        
//        $("#" + formID).css("width", (tempwidth - (3 * FormMargin)) + "px");
//        
//        $("#" + formID).find(".afcontainer").css("height", "inherit");
// 
//        templeft += tempwidth;
//        
//    }
//}



function extra_Tile_Vertically(xcount) {

    var varParentW = 0;
    var varParentH = 0;
    varParentW = $("#FormsContainer").outerWidth();
    varParentH = $("#FormsContainer").outerHeight();
  //  alert(varParentW);
  //  alert(varParentW);
    temptop = 0;  templeft = 0;
    tempwidth = 0; tempheight = 0;
    tempwidth2 = 0; tempheight2 = 0;
    tempRownum = 0;tempColumn = 0;
    
    if (xcount <= 0) {
        return;
    }
    
    else if (xcount <= 1) {
        tempRownum = 1; tempColumn = xcount;
        tempwidth = varParentW;
        tempheight = varParentH;
        return;
    }
    
    else if (xcount <= 4) {
        tempRownum = 1;tempColumn = xcount;
        tempwidth = varParentW / xcount;
        tempheight = varParentH;
        tempwidth2 = tempwidth;
        tempheight2 = tempheight;
        return;
    }
    
    else if (xcount <= 6) {
        tempRownum = parseInt(xcount / 2);
        tempColumn = parseInt(xcount / tempRownum);
        tempwidth = varParentW / 2;
        tempheight = varParentH / tempRownum;
        tempwidth2 = tempwidth * (7-xcount);
        tempheight2 = tempheight / tempRownum;
        return;
    }
    
    else if (xcount <= 8) {
        tempwidth = varParentW / 4;
        tempheight = varParentH / 2;
        tempwidth2 = tempwidth * (9 - xcount);
        tempheight2 = tempheight / tempRownum;
        return;
    }

}


function New_extra_Tile_Vertically(xcount){
    var varParentW = 0;
    var varParentH = 0;
    var tempw = 0;
    var temph = 0;
    var MaxSize = 0;
    var total = 0;
    varParentW = $("#FormsContainer").outerWidth();
    varParentH = $("#FormsContainer").outerHeight();
}


var CheckTilePosition = 0;

var MainL = 0;
var MainT = 0;
var MainW = 0;
var MainH = 0;
var ColLoop = 1;
var RowLoop = 1;
var Colnum =0;
var Rownum =0;


function FormPosition(xcount){
//var DivisibleByThree = new Array(1,3,2,4, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60, 63, 66, 69, 72, 75, 78, 81, 84, 87, 90);
var varParentW = 0;
var varParentH = 0;
varParentW = $("#FormsContainer").outerWidth();
varParentH = $("#FormsContainer").outerHeight();

  //      if(isInArray(xcount, DivisibleByThree) == true){
        Rownum = xcount/3 ;  Colnum = xcount;
        Rownum =  Math.round(Rownum);
      //  if(xcount<=4){Colnum = 1;}
        if(xcount>4){Colnum = 3;}
        if(xcount>=7){ Rownum = 3; }
 
        if(xcount>=10){ Colnum = 4; }
        if(xcount>=13){ Colnum = 5; }
        if(xcount>=16){ Colnum = 6; }
        if(xcount>=19){ Colnum = 7;}
        if(xcount>=22){ Colnum = 8;}
        if(xcount>=25){ Colnum = 9;}
        if(xcount>=28){ Colnum = 10;}
        if(xcount>=31){ Colnum = 11;}
        if(xcount>=34){ Colnum = 12;}
        if(xcount>=40){ Colnum = 13;}
        if(xcount>=43){ Colnum = 14;}
        if(xcount>=46){ Colnum = 15;}
        if(xcount>=49){ Colnum = 16;}
        if(xcount>=52){ Colnum = 17;}
        if(xcount <= 4){Rownum = 1;}
        CalculateWidthAndHeightFix(varParentW,varParentH,Colnum,Rownum);
 //   }else{
            if(isEven(xcount) == true){
                
            }else{
                
            }
     //   }
}


function isInArray(value, array) {
  return array.indexOf(value) > -1;
}


function isEven(value){
    if (value%2 == 0)
        return true;
    else
        return false;
}


function CalculateWidthAndHeightFix(ParentWidth,ParentHeight,Colnum,Rownum){
var tempw = 0;
var temph = 0;
if(CheckTilePosition == 1){
tempw = Colnum;
temph = Rownum;
Colnum = temph;
Rownum = tempw;
}
MainW = (ParentWidth/Colnum)-3;
MainH = (ParentHeight/Rownum)-3;


if(MainW<=MainH){}
}


function CalculatePostionFix(Colnum,Rownum){
//if(MainL == 0 && MainT == 0){
if(RowLoop == Rownum){ 
MainL = MainW*ColLoop; RowLoop=1; MainT=0; ColLoop++; 
}else{ MainT = MainH*RowLoop; RowLoop++;}


//}else{
//if(RowLoop == Rownum){ MainL = MainW+5; RowLoop=0; MainT=0; ColLoop++; }else{ MainT = MainH; }
//RowLoop++;
//}
}

function initialize(){
 MainL = 0;
 MainT = 0;
 MainW = 0;
 MainH = 0;
 ColLoop = 1;
 RowLoop = 1;
 Colnum =0;
 Rownum =0;
}


function ColumnForImbalanceForm(xcount){
var ColumnPosition = new Array();
switch(xcount){
case xcount<=7:
Colnum = 3;
break;
case xcount<=11:
Colnum = 4;
break;
return Colnum;
}
}
var arrfordynamicrow = [];

function ImbaLancePosition(xcount){
Colnum = ColumnForImbalanceForm(xcount);
arrfordynamicrow[Colnum];
}


function mainParent_Tile_Vertically() {
    CheckTilePosition = 0;
    try{$('.dialog-Minimizer').removeClass('dialog-Minimizer');}catch(err){}
    initialize();
    var formIDc = "";
    var formID = "";
    var formIDa = "";
    mainParent_minimize_Form();
    var top = 0; var left = 0;
    var width = 0; var height = 0;

    var xcount = current_Form_History.length;
         xcount =$('#FormsContainer').find('.ApplicationForms').length;
    FormPosition(xcount);
    
  //  extra_Tile_Vertically(xcount); 
  //  New_extra_Tile_Vertically(xcount);

  
    var crData = 1;
    crData = tempColumn;
    for (var i = 0; i < xcount; i++) {
        formIDc = $('#FormsContainer').find('.ApplicationForms:eq('+i+')').attr('id');//current_Form_History[i];
        
        formIDc = formIDc.replace("emi-Form-","emi-");
        formIDc = formIDc.replace("emi-Forms-","emi-");
        formIDc = formIDc.replace("emi-FormsA-","emi-");

        formID = formIDc.replace("emi-", "emi-Form-");
        formID  = formID.replace("-Form-Form-","-Form-");
        
         
        current_Form_zIndex += 1;

        $("#" + formID).css("z-index", current_Form_zIndex);
        //
        //top += 25; left += 20;

        $("#" + formID).css("left", (MainL + FormMargin) + "px");
        
        $("#" + formID).css("top", (MainT + FormMargin) + "px");

        $("#" + formID).css("height", (MainH - (3 * FormMargin)) + "px");
        
        $("#" + formID).css("width", (MainW - (3 * FormMargin)) + "px");
        
        $("#" + formID).find(".afcontainer").css("height", "inherit");
          CalculatePostionFix(Colnum,Rownum);
    }
}


function mainParent_Tile_Horizontally() {
  CheckTilePosition = 1;
 try{$('.dialog-Minimizer').removeClass('dialog-Minimizer');}catch(err){}
    initialize();
    var formIDc = "";
    var formID = "";
    var formIDa = "";
    mainParent_minimize_Form();
    var top = 0; var left = 0;
    var width = 0; var height = 0;

    var xcount = current_Form_History.length;
    xcount =$('#FormsContainer').find('.ApplicationForms').length;
    FormPosition(xcount);
      CheckTile();
   //  alert("HEIGHT:" + MainH);
    // Reverse();
     //alert("HEIGHT:" + MainH);
  //  extra_Tile_Vertically(xcount); 
  //  New_extra_Tile_Vertically(xcount);

   
    var crData = 1;
    crData = tempColumn;
    for (var i = 0; i < xcount; i++) {
        //formIDc = current_Form_History[i];
          formIDc = $('#FormsContainer').find('.ApplicationForms:eq('+i+')').attr('id');//current_Form_History[i];
       
  
        formID = formIDc.replace("emi-", "emi-Form-");
        formID  = formID.replace("-Form-Form-","-Form-");
        current_Form_zIndex += 1;
       
        $("#" + formID).css("z-index", current_Form_zIndex);
        //
        //top += 25; left += 20;

        $("#" + formID).css("left", (MainL + FormMargin) + "px");
        
        $("#" + formID).css("top", (MainT + FormMargin) + "px");

        $("#" + formID).css("height", (MainH - (3 * FormMargin)) + "px");
        
        $("#" + formID).css("width", (MainW - (3 * FormMargin)) + "px");
        
        $("#" + formID).find(".afcontainer").css("height", "inherit");
          CalculatePostionFix(Colnum,Rownum);
    }
}


function CheckTile(){
var templ = 0;
var tempt = 0;
if(CheckTilePosition == 1){
templ = Colnum;
tempt = Rownum;
Colnum = tempt;
Rownum = templ
}
}


function Reverse(){
var tempw = 0;
var temph = 0;
tempw = MainW;
temph = MainH;
MainW = temph;
MainH = tempw;
}


//var xes = 5;
//var xe = 4;

//if (xes > xe) {
//    xe = 3;
//    parseInt(xes / xe)
//}


//var xx ;
//xx = parseInt(xes / xe); 

//alert(xx);

//EDIT //06-06-2017 //ARM
$(document).on('click', '.toolBar-menu-sub-row', function() {
    if ($(this).hasClass('aagAdmin')) return false;
    var xmenu = $(this).find('.toolBar-menu-sub-label').text();
    if ($(this).hasClass('aagmodule')) xmenu = $(this).find('.emi-info .emi-formtitle').text();
    if (xmenu == "Logout" || xmenu == "Exit") return false;
    nwParameter_Add("Log_Logid", "0");
    nwParameter_Add("Log_Remarks", "Open");
    nwParameter_Add("Log_MenuItem", "Interface " + xmenu);
    func_ActionDriven("actSaveToLogs", false, "forms_standards/RunStandard.aspx");
});
