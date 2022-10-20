NaviationFlag = true;
var modwindow = "";

//## Initialize page wrapper to be copied ##
$(document).ready(function(){
    modwindow = $('#page-wrapper').html();
    
    
});
//##################

function func_Reload() {
    crSTDLnk = "forms_standards/RunStandard.aspx";
    crLnk = "../Modules_Gateway/noahweb_Gateway.aspx";
    crLnkGateKey = "nwHomePage";
    var isContinue = true;


    init_request();
    setTimeout(function() {
        $('#li_changepassword a').show();

    }, 500);
    
    //func_LoaderShow("Angelo", 0);
   
    return isContinue;
}

////////////////////////// TOol Box

function func_ToolboxADD(indef, enume) {
Clear_Footer();
    var isContinue = true;

    return isContinue;
}
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
   
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
   
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

///////////////////// Bind tool
function cust_GetPara() {
   
}


function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    isClick = false;
    
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    
}






///////////////////////////////////////

function Lookup_DoneFunction(idName, idNum) {
    if (idName == 'toolboxInquire') {
        
    }

  
}



function nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, index) {
 
      var value3=addtoListTableRec.find('tr:eq(' + index + ') td:eq(1)').text();
      var value4=addtoListTableRec.find('tr:eq(' + index + ') td:eq(2)').text();
     
      
       
       
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
   
    var ss = nwobjitem.find('#selecta').val();
    nwobjrow.css('background-color', 'black');
    
}
function nwGrdi_DblClick(nwobj, nwobjrow, nwobjitem) {
    var ss = nwobjitem.find('#selecta').val();
    
}


function nwGrid_tdClick(nwobjID) {

    
}




/////////////

//var something = 999;
//var something_cachedValue = something;



function msgBoxContainerQuestionF(genID, answer) {
    if (genID == 1) {
        if (answer == "Yes") {
            
        }
        else {
           
        }
    } 
    else if (genID == 2) {
        
    }

}

var isClick = false;
var isRefreshed = false;

//$(document).on('click', '#sidbarlisting li', function(){
//   
//    
//    if($(this).find('ul.collapse').hasClass('in')){
//    
//        $('#sidbarlisting ul').removeClass('in');
//        
//    }
//    else {
//        
//        $('#sidbarlisting ul').removeClass('in');
//        $(this).find('ul.collapse').addClass('in');
//    }
//});


//## MENU ITEM ##
$(document).on('click', "#sidbarlisting li.MenuItemClass", function() {
   

    var xmenuitemid = $(this).attr('mnuitm');
    $('#page-wrapper div.nw-MobWindow.nwPageContainer').removeClass('Active');

    if ($('button.navbar-toggle').css("display") != "none") $('button.navbar-toggle').click();
    if ($('#menuwindow-' + xmenuitemid).length > 0) {
        $('#menuwindow-' + xmenuitemid).addClass('Active');
        var xversion = $('#menuitemlinks div.lst-' + xmenuitemid.replace('mi-', '') + ' span.lst-version').text();
        $('#wrapperitemid').text(xversion);
        return false;
    }

    var xlink = $('#menuitemlinks div.lst-' + xmenuitemid.replace('mi-', '') + ' span.lst-link').text();
    var xversion = $('#menuitemlinks div.lst-' + xmenuitemid.replace('mi-', '') + ' span.lst-version').text();
    var testttt = $.parseHTML(modwindow);
    var xtemp = $(testttt[1]).attr('id', 'menuwindow-' + xmenuitemid);
    if (getParameterByName('nwdev') == "p8dev") {
        if (xlink.indexOf("nwdev") < 0) {
            xlink = xlink + "&nwdev=p8dev";
        }
    }
    xtemp.find('iframe.nw-MobWindow').attr("src", xlink);
    $('#wrapperitemid').html(xversion);
  
    $("#page-wrapper").append(xtemp);
    
    //$("#page-wrapper").
    
     //alert(xversion)
});

function AddMenuItemInPanel(_id, _link, _version) {
    $('#page-wrapper div.nw-MobWindow.nwPageContainer').removeClass('Active');

    if ($('#menuwindow-' + _id).length > 0) {
        $('#menuwindow-' + _id).addClass('Active');
        return false;
    }
    var testttt = $.parseHTML(modwindow);
    var xtemp = $(testttt[1]).attr('id', 'menuwindow-' + _id);
    if (getParameterByName('nwdev') == "p8dev") {
        if (_link.indexOf("nwdev") < 0) {
            _link = _link + "&nwdev=p8dev";
        }
    }
    xtemp.find('iframe.nw-MobWindow').attr("src", _link);
    $('#wrapperitemid').html(_version);
    $("#page-wrapper").append(xtemp);
}
//###########


//## NOTIFICATION ##
$(document).on('click', 'ul.dropdown-menu.dropdown-messages li', function (){
 
    var xtimespan = $(this).find("span.pull-right.text-muted").text();
    var xsender = $(this).find("strong.div-messageSender").text()
    var xmessagebody = $(this).find("div.div-notifmessagebody").text()
    $('#myModalLabel').text(xsender);
    $("#myModal .modal-body").text(xmessagebody);
});


$(document).on("click", 'li.li-readmessage', function (){
    
    var xmenuitemid = "nwNotificationViewer";
    $('#page-wrapper div.nw-MobWindow.nwPageContainer').removeClass('Active');
    
     
    if ($('#menuwindow-'+ xmenuitemid).length > 0){
        $('#menuwindow-'+ xmenuitemid).addClass('Active');
        return true;
    }
    
    var xlink = $('ul.dropdown-menu.dropdown-messages li:eq(0) div.div-notifmessageid').text();
    var testttt = $.parseHTML(modwindow);
    var xtemp = $(testttt[1]).attr('id', 'menuwindow-' + xmenuitemid);
    xtemp.find('iframe.nw-MobWindow').attr("src",xlink);
    $("#page-wrapper").append(xtemp);
    
   
});

//##################



//## USER SETTINGS ##

$(document).on('click', 'ul.dropdown-menu.dropdown-user li', function() {
    $('#chgpwd-alert').html('');
    $('#chgpwd-name').val($('#hfuserid').val());
    $('#chgpwd-desc').val($('#hfuserdesc').val());
    $('#chgpwd-old').val('');
    $('#chgpwd-new').val('');
    $('#chgpwd-confrm').val('');
});
$(document).on('click', '#chgpwd-save', function() {
    nwParameter_Add("userid", $('#hfuserid').val());
    nwParameter_Add("oldpass", $('#chgpwd-old').val());
    nwParameter_Add("newpass", $('#chgpwd-new').val());
    nwParameter_Add("confirmpass", $('#chgpwd-confrm').val());  
    func_ActionDriven("actChangePassword", false);
});


//##################

//##  ADJUST HEIGHT OF MENU ITEM BAR  ##

$(function() {
var xx = $('div.nw-MobWindow.Active').css('max-height');
$('#sidbarlisting').css('max-height', (xx.replace('px','') - 20 + 'px'));
});

//##################

//## SETTINGS ##

$(document).on('focus', "#settings-mobnum", function(){ 
    $(this).mask("99999999999");
});

$(document).on('click', "#settings-save", function() {
    clear_parameters();
    nwParameter_Add("userid", $('#hfuserid').val());
    nwParameter_Add("email", $('#settings-email').val());
    nwParameter_Add("mobnum", $('#settings-mobnum').val());
    func_ActionDriven("actSaveContact", false);
    $('#profile-useremail').text($('#settings-email').val());
});

$(document).on('click', '#user-settings', function() {
   
    $("settings-email").val('');
    $("#settings-mobnum").val('');
    $('#settings-alert').html('');
    clear_parameters();
    nwParameter_Add("userid", $('#hfuserid').val());
    func_ActionDriven("actLoadContacts", false);
});
//##########################


$(window).bind('hashchange', function() {
    var url = window.location + '';
    //
    //alert(url.indexOf("#acKsLnk"));
    var xindex = url.indexOf("#acKsLnk");
    var xindexBadge = url.indexOf("#acKsBdg");
    if (xindex >= 0) {
        //        url = url.substring(xindex + 8, url.length);
        //        //        nwParameter_Add("url", url);
        //        //        func_ActionDriven("actLoadPopUpOnScreen", false) ;
        //        // Create Base64 Object
        //        url = func_nwDecript(url);
        //        func_LoadPopUpOnScreen(url);
    }
    else if (xindexBadge >= 1) {
        url = url.substring(xindexBadge + 8, url.length);
        url = func_nwDecript(url);
        
        nwParameter_Add("mCode", url);
        func_ActionDriven("actReloadNotificationBadge", false);
        //
    }
});


function explorer_hidePane() {

    $("#page-wrapper").css("margin-left", "0");
    $(".navbar-default.sidebar").hide();
    $('#button-showexplorer').css("display","");
  //  $(".navbar-default.sidebar").show();

}
function explorer_showPane() {

    $("#page-wrapper").css("margin-left", "250px");
    $(".navbar-default.sidebar").show();
    $('#button-showexplorer').css("display", "none");
    //  $(".navbar-default.sidebar").show();

}


//## ARM ## 2016-01-28##
//Hover Function: for automatic logout if idle
var limitLoginMin = 99999999;
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
