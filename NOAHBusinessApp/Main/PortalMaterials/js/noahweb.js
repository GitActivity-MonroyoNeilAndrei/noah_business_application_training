var sessioncheckerX = "";
var nwMainUser="";
var nwMainComp = "";

$(function() {
    $(document).on("mousedown", "#btnUpClick", function () {
       
        if ($(this).hasClass("down")) {
            $(this).removeClass("down");
            $("#activeformsContainer").removeClass("down");
            $("#explorerMenuItemsContainer").removeClass("down");
        }
        else {
            $("#activeformsContainer").addClass("down");
            $("#explorerMenuItemsContainer").addClass("down");
            $(this).addClass("down");
        }
        nwinterface_ExplorerHeight();
        return false;
    });
    nwinterface_ExplorerHeight();
   
    $(window).resize(function () {
        nwinterface_ExplorerHeight();
    });

    if (getParameterByName("nwTMcode") != "") {
        
       
       // $("#button-hideexplorer").text("<<");
        $(".etitle").text("");
        
        $('#button-hideexplorer').click();
        //explorer_hidePane();
        setTimeout(function () { 
        var strParameterAdd = "";

        var uriParameters = location.search.substr(1).split('&');

        for (var i = 0; i < uriParameters.length; i++) {
            var parameter = uriParameters[i].split('=');
           

            if (parameter[0].indexOf("nwu") >= 0 ||
                parameter[0].indexOf("nwdev") >= 0 || 
                parameter[0].indexOf("nwcom") >= 0 ||
                parameter[0].indexOf("nwmid") >= 0 ||
                parameter[0].indexOf("nwcon") >= 0 ||
                parameter[0].indexOf("nwcomc") >= 0 ||
                parameter[0].indexOf("nwpu") >= 0)
                continue;

            if (strParameterAdd != "")
                strParameterAdd += "&";


            strParameterAdd += parameter[0] + "=" +parameter[1];
        }

        MenuLoad(getParameterByName("nwTMcode"), 'azie247', strParameterAdd);
        $("#emiMain").html("");
            //$(".etitle").removeClass("dock");
        $(document).find('#explorerMenuItemsHeaderButton .etitle').toggleClass('dock');
        $(".etitle").text("");
        setTimeout(function () { $("#emiMain").html(""); }, 500);
        }, 500);
    }
});



function nwinterface_ExplorerHeight() {
    setTimeout(function () {
        var xvalue =20;
        if ($('html').outerWidth() <= 800) xvalue = 50;
        $("#explorerMenuItems").outerHeight($("#explorerMenuItemsContainer").outerHeight() - ($("#activeformsContainer").outerHeight() + xvalue));
    }, 300);
}

$(function() {
    
    if(DetectMobile())
    {
        $('body').addClass("nwIsMobile");
    }
    else {
        $('body').removeClass("nwIsMobile");
    }

    crSTDLnk = "forms_standards/RunStandard.aspx";
    var startH = 0; var finalHeightresize = 0;
    var startH2 = 0;

    var startW = 0; var finalWidthresize = 0;
    var startW2 = 0;

    var mainWidth = 0;
    $(window).resize();

    $("#explorerContainer").resizable({ handles: 'e'
            , stop: function(event, ui) {
                $("#ApplicationFormsBlocker").css("display", "none");
                $(".ApplicationFormsBlocker").css("display", "none");
                // parentMain_SetSubFormsFit();
            }
            , start: function(event, ui) {
                startW = $(this).outerWidth();
                $("#ApplicationFormsBlocker").css("display", "block");
                $(".ApplicationFormsBlocker").css("display", "block");
                var lastwidth = $("#FormsContainer").css("width");
                lastwidth = lastwidth.replace("px", "");
                lastwidth = lastwidth.replace(" ", "");
                startW2 = parseFloat(lastwidth);
                //alert(mainWidth);#mainContainerContent
                var xlastwidth = $("body").css("width");
                xlastwidth = xlastwidth.replace("px", "");
                xlastwidth = xlastwidth.replace(" ", "");
                mainWidth = parseFloat(xlastwidth);

            }
         , resize: function(event, ui) {
             //alert(finalWidthresize );
             //finalWidthresize = startW - parseFloat($(this).outerWidth());
             //mainWidth = mainWidth - (startW2 + finalWidthresize);
             //finalWidthresize = startW2 + finalWidthresize - 2;

             //if (finalWidthresize > 0) finalWidthresize = finalWidthresize - (mainWidth * 0.2);


             var lastwidth = $("#explorerContainer").css("width");
             lastwidth = lastwidth.replace("px", "");
             lastwidth = lastwidth.replace(" ", "");
             startW2 = parseFloat(lastwidth);


             //else finalWidthresize = finalWidthresize - (mainWidth * 0.201);
             finalWidthresize = parseFloat($(this).outerWidth());
             finalWidthresize = (mainWidth * 1.02) - finalWidthresize;
             finalWidthresize = finalWidthresize - 10; // add 07/27/2015
             //finalWidthresize = (mainWidth * 0.7) + finalWidthresize; //-(mainWidth * 0.2);
             //finalWidthresize += mainWidth;
             //finalWidthresize = finalHeightresize / mainWidth * 100;
             //$("#FormsContainer").css("width", finalWidthresize + "%")


             $("#FormsContainer").css("width", finalWidthresize + "px");

             // $("#FormsContainer").css("margin-left", ($(this).outerWidth() * 0.99) + "px");

             //$("#activeformsContainer").animate({height: + finalHeightresize + px});
         }


    });


    //FormsContainer
    $("#explorerMenuItemsContainer").resizable({ handles: 's'
            , start: function(event, ui) {
                startH = $(this).outerHeight();
                var lastheight = $("#activeformsContainer").css("height");
                lastheight = lastheight.replace("px", "");
                lastheight = lastheight.replace(" ", "");
                startH2 = parseFloat(lastheight);
                //alert($(this).outerHeight());
            }
            , resize: function(event, ui) {

                finalHeightresize = startH - parseFloat($(this).outerHeight());
                //alert(finalHeightresize + " - " + lastheight);
                finalHeightresize = startH2 + finalHeightresize;
                $("#activeformsContainer").css("height", finalHeightresize + "px");

                //$("#activeformsContainer").animate({height: + finalHeightresize + px});
            }

    });
    $("div.noah-webui-dialog").draggable({ handle: ".noah-webui-dialog-header", scroll: false, delay: 0,
        stop: function(event, ui) {
            $("#ApplicationFormsBlocker").css("display", "none");
            $(".ApplicationFormsBlocker").css("display", "none");

        }
            , start: function(event, ui) {
                if ($(this).hasClass("nwPopMaximize")) return false;
                $("#ApplicationFormsBlocker").css("display", "block");
                $(".ApplicationFormsBlocker").css("display", "block");
            }
    });

    parentMain_SetSubFormsFit();
    parentMain_Set_InitialFunctions();

    $(document).on("click", "#mainContainerContent", function() {

        $(".toolBar-menu-sub-show").removeClass("toolBar-menu-sub-show");
    });

    $(document).on("click", ".aagmodule", function() {
        try {

            explorer_Select_Forms(this);
        } catch (err) { alert(err); }
    });


    nwPanelTab_Create("settingstabs");
    nwPanelTab_Create("gen_NotiCollect");

    crLnk = "Modules_Gateway/noahweb_Gateway.aspx";
    crLnkGateKey = "aagMain";
    
   
    nwParameter_Add("nwMainComp",nwMainComp); 
    func_ActionDriven("actFormRecentRet", false);
     nwParameter_Add("nwMainComp",nwMainComp); 
    func_ActionDriven("actFormFavRet", false);
    func_ActionDriven("actGetGen", false);
     nwParameter_Add("nwMainComp",nwMainComp); 
    func_ActionDriven("actLoadAccountSettings", false);
    func_ActionDriven("actLoadSystemConfiguration", false);

    func_ActionDriven("actLoadSystemDefault", false);


    nwParameter_Add("baseSessionID", baseSessionID);
    func_ActionDriven("actCheckSession", false);

});
function parentMain_SetSubFormsFit() {

    var afcontainerHeight = parentMain_MainHeight_for_Child_Forms("pixel");
    $(" .afcontainer").css("height", afcontainerHeight + "px");
}
function parentMain_SetSubFormsFitID(VarID) {

    var afcontainerHeight = parentMain_MainHeight_for_Child_Forms("pixel");
    
    if (!jQuery("#" + VarID).hasClass("dialogOpen"))
    $("#" + VarID + " .afcontainer").css("height", afcontainerHeight + "px");
}


function parentMain_Set_InitialFunctions() {
    var dae= document.getElementById("activeformsHeaderButton");
    explorer_ActiveForms_Button(dae);
    
}



function parentMain_MainHeight_for_Child_Forms(verType) {


    var mainheight = $("#mainContainerContent").css("height"); 
    mainheight = mainheight.replace("px", "");
    mainheight = mainheight.replace(" ", "");
    var mainheightF = parseFloat(mainheight);
    
    mainheight = $("#headerMenu").css("height");
    mainheight = mainheight.replace("px", "");
    mainheight = mainheight.replace(" ", "");
    var mainheightTemp = parseFloat(mainheight);
    mainheight = $("#footerMenu").css("height");
    mainheight = mainheight.replace("px", "");
    mainheight = mainheight.replace(" ", "");
    mainheightTemp += parseFloat(mainheight);
    
    if (verType == "perc") {
    mainheight = $("#footerMenu").css("height");
    mainheight = mainheight.replace("px", "");
    mainheight = mainheight.replace(" ", "");
    mainheightTemp += parseFloat(mainheight);
        mainheightTemp = mainheightF - mainheightTemp;
        mainheightF = mainheightTemp / mainheightF * 100;
    }
    else {
        //mainheightTemp -= (mainheightF * 0.025);
        mainheightF = mainheightF - mainheightTemp;
    }
  
    return mainheightF;
}



function parentMain_MenuSub(ver) {

    if ($("#" + ver.id + ' .toolBar-menu-sub').hasClass('toolBar-menu-sub-show')) {
        $('div.toolBar-menu-sub').removeClass('toolBar-menu-sub-show');
        $("#" + ver.id + ' .toolBar-menu-sub').removeClass('toolBar-menu-sub-show');
    }
    else {
        $('div.toolBar-menu-sub').removeClass('toolBar-menu-sub-show');
        $("#" + ver.id + ' .toolBar-menu-sub').addClass('toolBar-menu-sub-show');
    }

}


function parentMain_Close() {
    window.location = "logoutexit.aspx";
    window.close();
}

var globalLogOut = "";

function parentMain_Logout() {

    $('.message_content').css("margin-top", "22");
    $('#Message_Cancel').css("display", "none");
    msgBoxContainerQuestion = "logout";
    MessageBoxQuestion("Are you sure you want to quit all applications and log out now?", "Logout Window", "");
    //window.location = "logout.aspx";
}

//function msgBoxContainerQuestionF(msgBoxContainerQuestion, msgBoxContainerAnsweR) {
//    if (msgBoxContainerAnsweR == "Yes") {
//        
//    }
//    return false;
//}

function parentMain_MessageBox(){ 
}


function parentMain_LoadMessageboxes() {
    var str = "";
    str="<div id=\"msgBoxInfoContainer\" title=\" \"  style=\"word-wrap: break-word;\">" +
        "<div><div id=\"msgBoxInfoValue\" style=\"visibility:hidden\"></div>"+
	    "<div class=\"parameterItem\" style=\"width:325px\">"+
	    "<div id=\"msgBoxInfoMessage\"></div>"+
	    "</div></div></div>";
    $('body').append(str);
}
parentMain_LoadMessageboxes();
$(function() {

    $("#msgBoxInfoContainer").dialog({
        width: "370px",
        autoOpen: false,
        buttons: [
				    {
				        text: "ok",
				        click: function() {
				            $(this).dialog("close");
				        }

				    }
			    ]
    });

});




////////////////////////////





$(window).resize(function() {
    var xheight = $(document).outerHeight()+1 - ($('#headerMenu').outerHeight() + $('#footerMenu').outerHeight());
    // '98%'
    if (xheight <= 0) {
        $('#FormsContainer').css({
            width: ($(window).outerWidth() - $('#explorerContainer').outerWidth())
            , height: xheight 
        });

        $(".ApplicationForms").not('.dialogOpen').find('.afcontainer').css({
            width: ($(window).outerWidth() - $('#explorerContainer').outerWidth())
            , height: '98%'
        });
    }
    else {
        $('#FormsContainer').css({
            width: ($(window).outerWidth() - $('#explorerContainer').outerWidth())
            , height: xheight
        });
        
        $(".ApplicationForms").not('.dialogOpen').find('.afcontainer').css({
            width: ($(window).outerWidth() - $('#explorerContainer').outerWidth())
            , height: xheight
        });
    }

   if(xheight <=300)xheight=300; 
    $('#dimMessageBox').css({
        position: 'fixed',
        left: ($(window).outerWidth() - $('#dimMessageBox').outerWidth()) / 2
        , top: (xheight / 2) - ($('#dimMessageBox').outerHeight() / 2)
    });

    try {
        // parentMain_SetSubFormsFitID(current_SelectedFormID);
    } catch (err) { }

});


$(document).on("click", ".nwTheme_Item", function() {
    var ver = "";
    ver = $(this).attr("nwStyle");
    $("#nwThemeAAG").attr("href", ver);
    $("#mainContainer").hide();
    $("#mainContainer").fadeIn(300);
    
    //Added code to get current theme

    cur_theme = ver;
    
    //alert(ver);
});
$(document).on("click", "#settingstabsBut-3", function() {
    func_LoadThemes();
});




var isThemLoaded = false;
function func_LoadThemes() {
    //alert("wew");
    if (isThemLoaded) return;
    var xcount = $(".nwTheme_Item").length;
    var tempValue="";
    for (var i = 0; i < xcount; i++) {
        tempValue =  $(".nwTheme_Item:eq(" + i + ")").attr("nwStyle");
        $(".nwTheme_Item:eq(" + i + ")").find("iframe").attr("src","noahwebtemplate.aspx?ter=" + tempValue);
    }
    isThemLoaded = true;
}


// AL REY Apply Changes on Themes 
var cur_theme = "";
$(document).on("click", "#btn_apply", function() {
     msgBoxContainerQuestion = 11;
        parent_MessageBoxQuestion("Do you want to apply current theme?", "Themes", "");

   
});

//ALREY Added funtion for Dialogbox


//ARM 







$(document).on("click","#sss",function(){

if(document.getElementById('checkbox').style.display == "block"){
  document.getElementById('checkbox').style.display = "none";
 }else{
 document.getElementById('checkbox').style.display = "block";
 }
});

$(document).on("click","#ssa",function(){

if(document.getElementById('checkbox').style.display == "block"){
  document.getElementById('checkbox').style.display = "none";
 }else{
 document.getElementById('checkbox').style.display = "block";
 }
});

$(document).on("focus", ".isNumber", function() {
  //  $(this).mask("99/99/9999");
});

function  nwUpdateTbl(company,code,txt,type,xx)
{
   // alert(code);
    if(type == "checkbox"){txt = xx; }
    var t = nwLib.nwTempTable_Column_ValueExist_Index(""+company.trim()+"", 1, ""+code.trim()+"");
    nwLib.nwTempTable_RowData_Set(""+company.trim()+"", t ,3)(txt);
   // temp = nwTempTable_Column_ValueExist_Index(""+company.trim()+"",1,""+company.trim()+"");
    temp = nwLib.nwTempTable_RowData_Get(""+company.trim()+"",0,1);
}

$(document).on("click", "#genSave", function() {
    nwParameter_Add("GenEmail", $('#emailcode_1').val());
    nwParameter_Add("GenContact", $('#contactcode').val());
    func_ActionDriven("actSaveGenerals", false);
});


$(document).on("click", "#emlb1", function() {
 var len = $("#email").find('input').length;
 $("#email").append("<div  id=\"rowsx_" + (len + 1) + "\"><div class=\"noah-webui-containerRowItem\"><button nvx=\"Email\" nwvalue=\""+(len + 1)+"\" class=\"round-button\">X</button><input  style=\"width:380px;  margin-left: 20px;\" nwvalue=\""+(len + 1)+"\" id=\"emailcode_"+(len + 1)+"\" onfocusout=\"saveinput(this.id)\" placeholder=\"Insert Email Here\" type=\"text\"/></div></div>");
});


$(document).on("click", "#smsb1", function() {
 var len = $("#Contact").find('input').length;
 $("#Contact").append("<div  id=\"rowss_" + (len + 1) + "\"><div class=\"noah-webui-containerRowItem\"><button  nvx=\"Sms\" nwvalue=\""+(len + 1)+"\" class=\"round-button\">X</button><input class='isNumber' style=\"width:380px;  margin-left: 20px;\" nwvalue=\""+(len + 1)+"\" id=\"contactcode_"+(len + 1)+"\" onfocusout=\"Ssaveinput(this.id)\" placeholder=\"Insert Contact Number Here\" type=\"text\"/></div></div>");
});


function saveinput(i){
var xcount = $("#"+i+"").attr("nwvalue");
var value = $("#"+i+"").val();
if(value == ""){}else{
nwParameter_Add("GenEmailvalue",value);
nwParameter_Add("GenValuePos", xcount);
func_ActionDriven("actSaveEmails", false);
}}


function Ssaveinput(i){
var xcount = $("#"+i+"").attr("nwvalue");
var value = $("#"+i+"").val();
if(value == ""){}else{
nwParameter_Add("GenSMSvalue",value);
nwParameter_Add("GenSMSValuePos", xcount);
func_ActionDriven("actSaveSMS", false);
}}



$(document).on("click", ".round-button", function() {
var type = $(this).attr("nvx");
var id = $(this).attr("nwvalue");
var xv;
if(type == "Email"){$("#rowsx_"+id).remove(); xv = 0;}else{$("#rowss_"+id).remove(); xv = 1;}
$(this).remove();
nwParameter_Add("status",id);
nwParameter_Add("type",xv);
func_ActionDriven("actDeleteGenerals", false);
 });



var notificationid = "";
var originalid = "";
function Delete_Notification(ver){
    //msgBoxContainerQuestion = 12; //REMOVED BY JNB 11-16-2018
    msgBoxContainerQuestion = 13; //ADDED BY JNB 11-16-2018
  originalid = ver;
  notificationid = ver.replace("emi-gen_NotiItemList", "");
  parent_MessageBoxQuestion("Do you want to delete the selected notification?", "Delete", "");


//ver.html("");
//alert(ver);
}






function DeleteAll(){
 msgBoxContainerQuestion = 12;
 parent_MessageBoxQuestion("Do you want to delete all notification?", "Delete", "");
}





//-------------------------------System Configuration Menu-------------------------------------//

$(document).on("click", "#SystemConfigSave", function() {
SaveConfiguration(); 
});

function SaveConfiguration(){
try{
 nwParameter_Add("PassContain", GetPasswordType());
 nwParameter_Add("DisableAccount", GetCheckBoxValue($('#squaredFour4').prop("checked")));
 nwParameter_Add("UseWindowAuthen", GetCheckBoxValue($('#squaredFour5').prop("checked")));
 nwParameter_Add("KeepHistory", $('#spinnyKeepHistory').val());
 nwParameter_Add("Attempt", $('#spinnyAttempt').val());
 nwParameter_Add("UIDMinLen", $('#spinnyUIDMinLen').val());
 nwParameter_Add("PWDMinLen", $('#spinnyPWDMinLen').val());
 nwParameter_Add("PasswordExpires", $('#spinnyPasswordExpires').val());
 nwParameter_Add("LogoutAfterIdle", $('#spinnyLogoutAfterIdle').val());
 nwParameter_Add("DisableAccountAfter", $('#spinnyDisableAccountAfter').val());

 nwParameter_Add("Prefix", GetCheckBoxValue($('#EPrefix').prop("checked")));
 nwParameter_Add("SingleInst", GetCheckBoxValue($('#checkSingleInst').prop("checked")));
 nwParameter_Add("ChangeCompany", GetCheckBoxValue($('#checkChangeCompany').prop("checked")));
 nwParameter_Add("UserActLog", GetCheckBoxValue($('#checkUserActLog').prop("checked")));
 
 nwParameter_Add("SystemConfigUsername", $('#SystemConfigUsername').val());
 nwParameter_Add("SystemConfigServer", $('#SystemConfigServer').val());
 nwParameter_Add("SystemConfigPassword", $('#SystemConfigPassword').val());
 nwParameter_Add("SystemConfigDatabase", $('#SystemConfigDatabase').val());
 nwParameter_Add("OverdideVersionInput", $('#OverdideVersionInput').val());   
 func_ActionDriven("actSystemConfiguration", false);

} catch (err) {
//alert(err);
}
}


function GetCheckBoxValue(Value){

if(Value == true){
Value = 1;
}else{
Value = 0;
}

return Value;
}


function GetPasswordType(){
    var Type = 0;
    var Value= "";
    if($('#squaredFour').prop("checked") == true){ Type = 2; Value = "A";}
    if($('#squaredFour2').prop("checked") == true){ Type = Type + 3; Value = "N"; }
    if($('#squaredFour3').prop("checked") == true){ Type = Type + 4;  Value = "S"; }
    if(Type == 5){ Value = "AN"; }
    if(Type == 6){ Value = "AS";}
    if(Type == 7){ Value = "NS"; }
    if(Type == 9){ Value = "ANS"; }
    return Value;
}

$(document).on("click", "#UpspinnyAttempt", function() {
$('#spinnyAttempt').val(SpinnerAdd($('#spinnyAttempt').val(),100));
});

$(document).on("click", "#DnspinnyAttempt", function() {
$('#spinnyAttempt').val(SpinnerMin($('#spinnyAttempt').val(),0));
});

$(document).on("focusout", "#spinnyAttempt", function() {
if(parseInt($(this).val()) >= 100){
$(this).val(100);
}
});

$(document).on("click", "#UpspinnyPWDMinLen", function() {
$('#spinnyPWDMinLen').val(SpinnerAdd($('#spinnyPWDMinLen').val(),50));
});

$(document).on("click", "#DnspinnyPWDMinLen", function() {
$('#spinnyPWDMinLen').val(SpinnerMin($('#spinnyPWDMinLen').val(),0));
});


$(document).on("focusout", "#spinnyPWDMinLen", function() {
if(parseInt($(this).val()) >= 50){
$(this).val(50);
}
});

$(document).on("click", "#UpspinnyUIDMinLen", function() {
$('#spinnyUIDMinLen').val(SpinnerAdd($('#spinnyUIDMinLen').val(),50));
});

$(document).on("click", "#DnspinnyUIDMinLen", function() {
$('#spinnyUIDMinLen').val(SpinnerMin($('#spinnyUIDMinLen').val(),0));
});


$(document).on("focusout", "#spinnyUIDMinLen", function() {
if(parseInt($(this).val()) >= 50){
$(this).val(50);
}
});



$(document).on("click", "#UpspinnyKeepHistory", function() {
$('#spinnyKeepHistory').val(SpinnerAdd($('#spinnyKeepHistory').val(),100));
});

$(document).on("click", "#DnspinnyKeepHistory", function() {
$('#spinnyKeepHistory').val(SpinnerMin($('#spinnyKeepHistory').val(),0));
});


$(document).on("focusout", "#spinnyKeepHistory", function() {
if(parseInt($(this).val()) >= 100){
$(this).val(100);
}
});


$(document).on("click", "#UpspinnyLogoutAfterIdle", function() {
$('#spinnyLogoutAfterIdle').val(SpinnerAdd($('#spinnyLogoutAfterIdle').val(),60));
});

$(document).on("click", "#DnspinnyLogoutAfterIdle", function() {
$('#spinnyLogoutAfterIdle').val(SpinnerMin($('#spinnyLogoutAfterIdle').val(),0));
});


$(document).on("focusout", "#spinnyLogoutAfterIdle", function() {
if(parseInt($(this).val()) >= 60){
$(this).val(60);
}
});


$(document).on("click", "#UpspinnyDisableAccountAfter", function() {
$('#spinnyDisableAccountAfter').val(SpinnerAdd($('#spinnyDisableAccountAfter').val(),365));
});

$(document).on("click", "#DnspinnyDisableAccountAfter", function() {
$('#spinnyDisableAccountAfter').val(SpinnerMin($('#spinnyDisableAccountAfter').val(),0));
});


$(document).on("focusout", "#spinnyDisableAccountAfter", function() {
if(parseInt($(this).val()) >= 365){
$(this).val(365);
}
});


$(document).on("click", "#UpspinnyPasswordExpires", function() {
$('#spinnyPasswordExpires').val(SpinnerAdd($('#spinnyPasswordExpires').val(),365));
});

$(document).on("click", "#DnspinnyPasswordExpires", function() {
$('#spinnyPasswordExpires').val(SpinnerMin($('#spinnyPasswordExpires').val(),0));
});


$(document).on("focusout", "#spinnyPasswordExpires", function() {
if(parseInt($(this).val()) >= 365){
$(this).val(365);
}
});


function SpinnerMin(value,Min){
if(value == ""){
value = 0;
}else if(parseInt(value) <= Min){
value = value;
}else{
value = parseInt(value) - 1;
}
return value;
}


function SpinnerAdd(value,Max){
if(value == ""){
value = 0;
}else if(parseInt(value) >= Max){
value = value;
}else{
value = parseInt(value) + 1;
}
return value;
}


function GetDefaultMenu(tempID,tempTITLE,tempICON,tempLINK){

var ver = { id:tempID,
            title:tempTITLE,
            icon:tempICON,
            link:tempLINK};
if(tempID != ""){
explorer_Select_Forms(ver);
}

}



//## ARM ## 2016-01-28##
//Hover Function: for automatic logout if idle
var limitLoginMin=99999999;
var xisActivebyHover = 0;

$(document).on("mouseover", "body", function() {
    //xisActivebyHover = 0;
    func_interface_active();
    //alert(xisActivebyHover);
});


function func_interface_active() {
    xisActivebyHover = 0;
}


var xisActive_timerRate = 1;
var xisActive_timer = setInterval(isActiveTimer_func, 10000);
function isActiveTimer_func() {
    if (xisActive_timerRate <= 6) {
        xisActive_timerRate++;
    }
    else {
        xisActivebyHover++;
        xisActive_timerRate = 1;
        if (limitLoginMin == 0) return;
        if (limitLoginMin <= xisActivebyHover) {

            //isAAGPermited=true;
            try { AutoLogoutIdle(); } catch (err) { }
        }
    }
}

var thisX;
$(document).on("click", ".nwcompData", function() {
    thisX = this;
    xMessageFlag = "1";
    MessageBoxQuestion("This will close all Active Forms. Do you wish to continue?", "", "");
    

});

var xMessageFlag = "";
function msgBoxContainerQuestionF(genID, answer) {
    if (genID == 11) {
        if (answer == "Yes") {
            nwParameter_Add("cur_theme", cur_theme);
            func_ActionDriven("actApplyTheme", false);
        }
    } else if (genID == 13) {
        nwParameter_Add("originalid", originalid);
        nwParameter_Add("notificationid", notificationid);
        func_ActionDriven("actDeleteNotification", false);
    } else if (genID == 12) {
        if (answer == "Yes") {
            func_ActionDriven("actDeleteAll", false);
        } 
    }
    if (xMessageFlag == "1") {
        if (answer == "Yes") {
            mainParent_Close_Form_All();
            try {
                $('.nwcompDataChange').removeClass("nwcompDataChange");

                nwParameter_Add("strCompID", $(thisX).attr("nwcompID"));
                parentMainCrComp = $(thisX).attr("nwcompID");

                nwLoading_Start("actReloadCompany", crLoadingHTML);
                func_ActionDriven("actReloadCompany", false);
                setTimeout(function() {
                    $(thisX).addClass("nwcompDataChange");
                    $('span#lblCompany').text($(thisX).find('.toolBar-menu-sub-label').text());
                }, 300);
                xMessageFlag = "";
            } catch (err) { }
        }
        
        else {

        }
    }

    if (genID == "logout") {
        if (answer == "Yes") {
            mainParent_Close_Form_All_Continue();
           
            var isContinue = true;
            try { SignOutSys(); } catch (err) { }

            if (isContinue)  window.location = "logout.aspx";
        }
    }
    
    if(genID == "windowsClose"){
        if (answer == "Yes") {
            mainParent_Close_Form_Continue();
        }
    }
    else if(genID == "windowsCloseALLExcept"){
        if (answer == "Yes") {
            mainParent_Close_Form_Except_Continue();
        }
    }
    else if(genID == "windowsCloseALL"){
        if (answer == "Yes") {
            mainParent_Close_Form_All_Continue();
        }
    }
 

}





//




$(window).bind('hashchange', function() {
    var url = window.location + '';
    //
    //alert(url.indexOf("#acKsLnk"));
    var xindex = url.indexOf("#acKsLnk");
    var xindexBadge = url.indexOf("#acKsBdg");
    if (xindex >= 0) {
        url = url.substring(xindex + 8, url.length);
        //        nwParameter_Add("url", url);
        //        func_ActionDriven("actLoadPopUpOnScreen", false) ;
        // Create Base64 Object
        url = func_nwDecript(url);
        func_LoadPopUpOnScreen(url);
    }
    else if (xindexBadge >= 1) {
        url = url.substring(xindexBadge + 8, url.length);
        url = func_nwDecript(url);

        nwParameter_Add("mCode", url);
        func_ActionDriven("actReloadNotificationBadge", false);
        //
    }
});




function func_LoadPopUpOnScreen(url)
{
      // url=url.substring(xindex + 8,url.length);
        var xsplit = url;
        var xsplits = xsplit.split("p8avt");
        
        var xtitle=xsplits[0];
        var xtype = xsplits[1];
        var xID = xsplits[2];
        var xcontent = xsplits[3];
        
        var xwidth = "80%";
        var xheight = "80%";

        try {
            xwidth = xsplits[4];
            xheight = xsplits[5];
            xwidth = xwidth.indexOf("%") >= 1 ? ($(window).outerWidth() * parseFloat(xheight.replace("%", "")) / 100) + "px" : xwidth.replace("px", "") + "px";
            xheight = xheight.indexOf("%") >= 1 ? ($(window).outerHeight() * parseFloat(xheight.replace("%", "")) / 100) + "px" : xheight.replace("px", "") + "px";
        } catch (err) { }
         
        //#acKsLnkCategory6p8avt1p8avt6p8avtE-Procurement/OpenForBiddingCat.aspx?id=6p8avt815pxp8avt600px
        var xIDx="aag-silver-"+xID.replace(/ /g,'');
        func_PopupWindow(xIDx, true, "mustClose");
        if(xtype == 1){
           $("#"+xIDx).find('.noah-webui-dialog-title').text(xtitle);
           $("#"+xIDx).find('.xframe').attr("src",xcontent);
        }
       
        
        if(xtype != "" && xtype != undefined){
        
//       $("#p8ModalClose").click();
        setTimeout(function(){  
//             $("a#aagInlineForm").click();
//            $("#p8ModalLabel").text(xsplits[0]);

         }, 500);


     }

       $("#" + xIDx).find('noah-webui-dialog-content').hide();
       setTimeout(function() {
       $("#" + xIDx).find('noah-webui-dialog-content').show();
       }, 100);
        
         nwLoading_Start("x-"+xIDx,crLoadingHTML);
         $(".nwLoadingInfo,.nwLoadingInfoCustom").text("");
         $("#aagLoadingNx-"+xIDx).css("z-index","1");
         $("#"+xIDx).css("z-index","3201");
         
         
        
}


function func_PopupWindow(verID,isResize,xclass)
{
    var xmaximize = "";
    if (xclass == undefined) xclass = "";
    if (isResize == true)
        xmaximize = "<div class='noah-webui-dialog-close' title='Maximize/Minimize' onclick='mainParent_dialog_Maximize(this)'><span style='ne-height: 12px;vertical-align: middle;text-shadow: 0px 0px 1px black;font-size: 9px;font-weight: normal;'>[]</span></div>";

    var xfrm = '<div id="' + verID + '" class="noah-webui-dialog ' + xclass + '" style="width:80%;height:80%;" >' 
            +'<div class="noah-webui-dialog-header"> '
            +      ' <div class="noah-webui-dialog-icon"></div>'
            +       '<div class="noah-webui-dialog-title"></div>'
            +       '<div class="noah-webui-dialog-close" title="close" onclick="mainParent_dialog_Close(this)">X</div>'
            + xmaximize
            +'</div>'
            +'<div class="ApplicationFormsBlocker" style="background-color:transparent !important;  margin-top: 22px;position: absolute;display:none ;top: 0px;"></div><div class="noah-webui-dialog-content">'+
                '<iframe class="xframe" src="" style="margin-left: -2px;border-top-color: transparent;width: 100%;height: 100%;"></iframe>'
            +'</div>'
            +'</div>';
            

   $('body').append(xfrm);
   $("div.noah-webui-dialog.mustClose").draggable({ handle: ".noah-webui-dialog-header", scroll: false, delay: 0,
       stop: function(event, ui) {
           $(".ApplicationFormsBlocker").css("display", "none");
       },
       drag: function(event, ui) {
           var xdeiv = $(window).outerHeight() - 20;
           var ldeiv = $(window).outerWidth();
           // var xvalue = $(event).top();

           var offset = $(this).offset();
           var xPos = offset.left;
           var yPos = offset.top;
           var xwidthx = 0;

           var xtop = $(this).css("top").replace("px", "");
           var xleft = $(this).css("left").replace("px", "");
           var xwidth = $(this).css("width").replace("px", "");


           yPos = parseInt(xtop);
           xPos = parseInt(xleft);
           xwidthx = parseInt(xwidth);

           // console.log(yPos + " " + xdeiv);
           if (yPos > xdeiv) {
               // offset.top = yPos - 3;
               $(this).css("top", (xdeiv - 1) + "px");
               // $(this).offset().top = yPos - 3;
               return false;
           }
           else if (yPos < 1) {
               $(this).css("top", (1) + "px");
               return false;
           }

           if (xPos < (xwidthx-20) *-1) {
             //  $(this).css("left", (1) + "px");
               return false;
           }
           else if (xPos > ldeiv) {
               $(this).css("left", (ldeiv - 20) + "px");
               return false;
           }


           // $('#posX').text('x: ' + xPos);
           // $('#posY').text('y: ' + yPos);

           //  console.log();
           // alert(xdeiv);

       }
            , start: function(event, ui) {
                var offset = $(this).offset();
                var xPos = offset.left;
                var yPos = offset.top;
                //if (yPos >= 0)
                $(this).css("top", (1) + "px");


                $(".ApplicationFormsBlocker").css("display", "block");
            }
   });

  
   mainParent_dialog_Open(verID);
}


var main_CheckNotifVisible;

function mainParent_NotifView() {
    if (main_CheckNotifVisible == undefined || main_CheckNotifVisible == true) {
       // alert(main_CheckNotifVisible);
    }
    else {
        $('#emi-Form-gen_NotiButton').hide();
        setTimeout(function() {
            mainParent_Close_Form();
        }, 100);
    }
}


function Message_OkF() {
    if (sessioncheckerX == "1") {
        
    }
}

function Logout_savelogs() {
    SaveToLogs("9", "Interface", "logout", "forms_standards/RunStandard.aspx");
}


//$(function(){
//    LoadPopup("ID12121","http://122.54.1.133/Eprocurement/SG/DataSetup/CompanyCurrencyAssign/SGCompanyCurrencyAssign.aspx?nwu=050248151241168167023151104223116081135248023067&nwcom=CPGI&nwmid=080191039140192137090242036191054201100123240206046070178113211228181154142240146007045143224189&nwcon=133171124156105200156176060207165016072052247152169092173074082177113195214126203064187205113150063131225118080242146018042065136007129093122200132164140091216148028015135038032182044033139180118225023097194010227165136109075139007023235033241088227103226228228143253095218116021220006092027245033056041101009118168045091198250096095247063025016065226163185156192130032012060255069115245002244074138222021121044191176247050014233037145211022241226185198130244069160169192129110096&a2z4i7e=silver","Sample Title","80%","80%");
//    
//});

function StartLoad(){
 $(".blockdiv").show();
 $(".loader").show();
 //$("#main").addClass("backgroundblur");
 $("#Screenload").html("Loading...");


}

function AfterLoad(){


       $(".blockdiv").hide("fade",500);
       $("#loadcontentCon").hide("fade",500);
       $(".loader").hide("fade",500);
       
       $("#mainContainer").removeClass("backgroundblur");
       $("#Screenload").html("LOADING");
}


