var nwnotiflogDate ="";   // for Notif Logss
var nwInterfaceCurrentUser = "aagnone";
var nwCurrentLinkBase="";
var nwCurrentLinkBase2="";
var nwisConCurrentCheckingConnection = false;
var nwisConCurrentCheckingLog = false;
var nwisConCurrentCheckingNotif = false;


//var nwIsOLDNotification = false;


var nwConnectingLink ="Modules_Gateway/connect.aspx";

//nwCurrentLinkBase = ""; 


function func_Reload() {
    //crLnk = "Modules_Gateway/noahweb_Gateway.aspx";
    //crLnkGateKey = "aagChatMessage";
    var isContinue = false;
    return isContinue;
}


var maintimerx = 14000;
var maintimery = 0;



var maintimeryCheck = 0;
var maintimeryCheckExtra = 0;

var timer = $.timer(function() {
    maintimeryCheck += 1;
    try {
        if (nwisConCurrentCheckingConnection == false) {
            nwisConCurrentCheckingConnection = true;
            func_CallConnection(nwConnectingLink);
        }
    } catch (err) { }
    //if ($('#lblStatus').text() != "Connected")  return;

    if (maintimeryCheck >= 2) {
        //alert("wew");
        //nwParameter_Add("", "");
        var tempcrLnk = crLnk;
        var tempcrLnkGateKey = crLnkGateKey;
        crLnk = "Modules_Gateway/noahweb_Gateway.aspx";
        crLnkGateKey = "aagChatMessage";
        //alert("ahah");

        if (nwisConCurrentCheckingLog == false) {
            nwisConCurrentCheckingLog = true;
            func_ActionDriven("aagLoggedUser", false, undefined, "aagLoggedUser");
        }



        if (maintimeryCheckExtra >= 1 ) {
            crLnkGateKey = "aagMain"; isLoadedALL = false;
            nwParameter_Add("isLoadedALL", isLoadedALL);
            nwParameter_Add("nwnotiflogDate", nwnotiflogDate);

            if (nwisConCurrentCheckingNotif == false && nwIsOLDNotification) {
                nwisConCurrentCheckingNotif = true;//nwCurrentLinkBase + tempcrLnk
                func_ActionDriven("actNotificationRetriveRuntime", false, nwCurrentLinkBase + tempcrLnk, "actNotificationRetriveRuntime");
            }

            maintimeryCheckExtra = 0;
        }
        maintimeryCheckExtra += 1;

        crLnk = tempcrLnk;
        crLnkGateKey = tempcrLnkGateKey;
        //window.location.href = "default.aspx";
        maintimeryCheck = 0;
        //alert("yun");
    }
});

function func_RequestEnd(isSucessful, requestID, rdata, rurl) {
    if(requestID == "aagLoggedUser")
        nwisConCurrentCheckingLog = false;
    else if(requestID == "actNotificationRetriveRuntime")
        nwisConCurrentCheckingNotif =false;
    else if(requestID == "connection")
        nwisConCurrentCheckingConnection =false;
}


var xxxx = 0;
var timerx = $.timer(function() {
    maintimery += 1;
    if (maintimery >= 2) {
        //alert(maintimery);
        xxxx += 1;
        $("#temple").text("er:"+xxxx);
        //window.location.href = "default.aspx";
        maintimery = 0;
    }
});

timerx.set({ time: 1000, autostart: true });

timer.set({ time: maintimerx, autostart: true });

var isBadgeUpdate = true;
var isBadgeUpdateParallel = true;
var xbadgeDuration = 10000;
var timerxBadge = $.timer(function() {
    if (nwCurrentLinkBase == undefined) nwCurrentLinkBase = "";
    //alert("awts" + crLnkGateKey);
    var xobjects = ".emi-menuItem .emi-formtitle .notification-bubble";
    var xobjectsCon = ".emi-title";
    var interfacetype = "1";
    var tempcrLnk = crLnk;
    crLnk = "Modules_Gateway/noahweb_Gateway.aspx";
    if (crLnkGateKey == "nwHomePage") {
        xobjects = ".MenuItemClass .notification-bubble";
        xobjectsCon = ".MenuItemClass";
        interfacetype = "2";
    }

    var xcounter = $(xobjects).length;
    var xmenu = "";
    for (var i = 0; i < xcounter; i++) {

        var xcounterx = 1;
        try {
            xcounterx = $(xobjects + ":eq(" + i + ")").parents(xobjectsCon).attr("nwloadingCount");
            if (xcounterx == undefined) xcounterx = 1;
            else xcounterx = parseInt(xcounterx) + 1;
            $(xobjects + ":eq(" + i + ")").parents(xobjectsCon).attr("nwloadingCount", xcounterx);
        } catch (err) { }

        if ($(xobjects + ":eq(" + i + ")").parents(xobjectsCon).attr("nwloading") == "loading" && xcounterx < 2) {
            continue;
        }
        else {
            $(xobjects + ":eq(" + i + ")").parents(xobjectsCon).attr("nwloadingCount", "0");
        }
        

        var url = $(xobjects + ":eq(" + i + ")").parents(xobjectsCon).attr("id"); //emi-title
        if (url == undefined)
            url = $(xobjects + ":eq(" + i + ")").parents(xobjectsCon).attr("mnuitm");

        try {
            $(xobjects + ":eq(" + i + ")").parents(xobjectsCon).attr("nwloading", "loading");
        }
        catch (err) { }

        if (i >= 1) xmenu += "@#@";

        url = url.replace("emi-T", "");
        url = url.replace("mi-", "");

        xmenu += url;
        if (isBadgeUpdateParallel == true) {
            clear_parameters();
            nwParameter_Add("mCode", url);
            func_ActionDriven("actReloadNotificationBadge", false, nwCurrentLinkBase + tempcrLnk);
        }
    }
    if (isBadgeUpdateParallel == false) {
        nwParameter_Add("mCode", url);
        func_ActionDriven("actReloadNotificationBadge", false, nwCurrentLinkBase + tempcrLnk);
    }
});

setTimeout(function() {
    if (isBadgeUpdate == true) timerxBadge.set({ time: xbadgeDuration, autostart: true });
}, xbadgeDuration + 2000);


function func_CallConnection(rurl)
{
    
    $('#lblStatus').text("Connecting...");
    rurl = nwCurrentLinkBase + rurl;
    var data;
    $.post(rurl, data, function(data, status) {
        $('#lblStatus').text("Connected");
        func_RequestEnd(true, "connection");
      
    }).fail(function() {
        $('#lblStatus').text("Disconnected");
        func_RequestEnd(false, "connection");
    });
}

function AutoLogoutStart()
{
        crLnkGateKey = "AutoLogout";
        func_ActionDriven("", false);
        crLnkGateKey = tempcrLnkGateKey;
}
    

function AutoLogout()
{
    setTimeout(function() {
       try{
       window.location.replace("default.aspx?a2z4i7e=023015141182140148005194003076082044168221064195");
        //window.close();
       }catch(err){}
    }, 2000);
}
function AutoLogoutRecuser(message) {

    if (message != undefined && (message) != "") message = "&nwm=" + message;
    else message = "";
    setTimeout(function() {
        try {
            window.location.replace("default.aspx?a2z4i7e=244248241028051168215016082149057192223228191115" + message);
            //window.close();
        } catch (err) { }
    }, 100);
}
function ExpireSessionLogout(message) {

    if (message != undefined && (message) != "") message = "&nwm=" + message;
    else message = "";
    setTimeout(function() {
        try {
            window.location.replace("default.aspx?a2z4i7e=104086100041151156236247047032091134008078026211" + message);
            //window.close();
        } catch (err) { }
    }, 2000);
}

function AutoLogoutIdle()
{
        crLnkGateKey = "IdleLogout";
        func_ActionDriven("LogoutbyIdle", false);
        crLnkGateKey = tempcrLnkGateKey;
}