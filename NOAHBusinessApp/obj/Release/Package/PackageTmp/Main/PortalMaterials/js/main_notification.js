
var xCounter = 0;
var gen_Noti_DateTime = "";
var isLoadedALL = false;


var nwIsOLDNotification = false;

$(function() {
    crLnk = "Modules_Gateway/noahweb_Gateway.aspx";
    crLnkGateKey = "aagMain";
    isLoadedALL = true;

    if (nwIsOLDNotification) {
        nwParameter_Add("isLoadedALL", isLoadedALL);
        func_ActionDriven("actNotificationRetrive", false);
    }

    try {
//       explorer_Select_Forms("emi-gen_NotiButton");
//        mainParent_minimize_Form();
//        //explorer_hidePane();
//        $("#emi-Form-gen_NotiButton").css("width","280px");
//        explorer_Select_Forms_Modal("emi-Form-gen_NotiButton");
//        var options = {};

    } catch (err) {
        //alert(err);
     }
});

function showNotification_x() {
   
       
    
   if (nwIsOLDNotification) {
       $("#gen_NotiCollect").show();
       $("#gen_NotiCollect").removeClass("nwHide");
       explorer_Select_Forms("emi-gen_NotiButton");
       mainParent_minimize_Form();
        $("#emi-Form-gen_NotiButton").css("width", "480px");
        explorer_Select_Forms_Modal("emi-Form-gen_NotiButton");
        $("#gen_NotiCon li").remove();
        $("#emi-Form-gen_NotiButton").effect("bounce", {}, 300);
    }
    else {
       $("#gen_NotiCollect").hide();
       setTimeout(function () { $("#gen_NotiCollect").hide(); }, 100);


       MenuLoad("P8SysNotificationHome247","azie247");


       //Modules_UI/mainMenu/HomePageNotif/HomePageNotif.aspx

    }
    // alert('asdasd');
}   

$(document).on("click", "#gen_NotiButton,#emi-gen_NotiButton", function () {
    if (nwIsOLDNotification) {
        nwParameter_Add("isLoadedALL", false);
        func_ActionDriven("actNotificationRetrive", false);
    }
    else {
        MenuLoad("P8SysNotificationHome247", "azie247");
    }
    
});

function gen_noti_AddTemp() {
    var xxer = "Print Your Oba Print Your Oba Print Your Oba Print Your Oba Print Your Oba ";
    xxer += xxer + xxer + xxer + xxer;
    xxer += xxer;
    gen_noti_Add("e-aag", xxer, "just now", "", "Message", "http://www.google.com.ph", "");
}

//




$(document).on("click", ".gen_NotiItem", function() {
try {
    if ($(this).parents(".ui-tabs-panel").attr("id") != "gen_NotiCollectSystem")
       explorer_Select_Forms(this);
    } catch (err) { }
});

var gen_noti_ID ="";
$(function(){
    $("body").append("<ul id='gen_NotiCon'></ul>");
});

var globalobj;

/*
var string = 'Hello World!';

// Encode the String
var encodedString = btoa(string);
console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"

// Decode the String
var decodedString = atob(encodedString);
console.log(decodedString); // Outputs: "Hello World!"
*/

function gen_noti_Add(a, b, c, d, e, f, g,h,i,isLoaded,ID) {
    xCounter++;

        try {
            var s = atob(b);
            b = s;
        } catch (err) { }
       
        if (d == null || d == "") d = "custom_materials/materials/system_images/ThemeImage/icon.png";
        if (g == null || g == "") g = d;
        
        if(gen_noti_ID=="" || gen_noti_ID == undefined) gen_noti_ID=xCounter;
        
        if(gen_noti_ID == undefined)gen_noti_ID=xCounter;
        var txtext = "<li id=\"gen_NotiItem" + gen_noti_ID + "\" style=\"margin-left: 530px; margin-bottom: 100px;\"><div class=\"gen_NotiItem\"> " +
            "<div><b>" + a + "</b></div>" +
            "<div style=\"overflow-y: auto; width: 200px; height: 100px;\">" + b + "</div>"
            + "<button style=\"float:left; margin-left: 160px; margin-top: 30px; border-radius: 4px; background-color: #73BF44; color: white; font-weight: bold; border-color: #73BF44;\" id=\"btnNotifMsg\" tempattr=\"gen_NotiItem" + gen_noti_ID + "\">OK</button>"
            + "</div></li>";


        
        if (isLoaded == undefined) {
            $("#gen_NotiCon").prepend(txtext);
        }
        
        $("#gen_NotiItem" + gen_noti_ID).hide();
        $("#gen_NotiItem" + gen_noti_ID).css("margin-bottom", "10px");
        $("#gen_NotiItem" + gen_noti_ID).fadeIn(800);
        $("#gen_NotiItem" + gen_noti_ID).animate({ 'margin-bottom': '1px' });
        var obj = $("#gen_NotiItem" + gen_noti_ID);
        //globalobj = obj;

        txtext = "";
        var target = document.createElement("div");
        if(h == "1") $(target).addClass("unread");
        
        $(target).addClass("gen_NotiItem");
        $(target).attr("id", "emi-gen_NotiItemList" + gen_noti_ID);

        
        txtext += "<div  class=\"gen_NotiItem1\"><img src=\"materials/system_images/nw_trans.png\" style=\"background-image:url(" + d + ")\"/></div>";
        txtext += "<div  class=\"gen_NotiItem2\"><span class=\"gen_NotiID\"><b>" + a + "</b><br/></span>";
        txtext += "<span class=\"gen_NotiTime\">" + c + "</span>";
        txtext += "<span  class=\"gen_Notimsg\">" + b + "</span>";

        try {
            txtext += explorer_Create_FormsInfo(e, f, g);
        }
        catch (err) {
           // alert(err);
        }

        txtext += "</div>";
        
        $(target).html(txtext);
    
            try{
                
                $("div#emi-gen_NotiItemList" + gen_noti_ID).remove();
                //alert("div#emi-gen_NotiItemList" + gen_noti_ID);
            }catch(err){}
    //alert(i);
    //$("#gen_NotiCollect").prepend(target);
        if (i == 0) {
            //$("#gen_NotiCollect #gen_NotiCollectSystem").html("");
            $("#gen_NotiCollect #gen_NotiCollectTrans").prepend(target);
        }
        else {
            //$("#gen_NotiCollect #gen_NotiCollectSystem").html("");
            $("#gen_NotiCollect #gen_NotiCollectSystem").prepend(target);
        }


//        if (isLoaded == undefined) {
//            $(target).hide();
//            $(target).fadeIn(800);
//            disableSelection(target);

//            window.setTimeout(function() {
//                gen_noti_Remove(obj);
//            }, 7000);
//        }

     //   if (b.trim() != "" && $('#emi-Form-gen_NotiButton').css('display') != 'block') { showNotification_x(); }  
}

function gen_noti_Remove(obj) {
    $(obj).fadeOut(1000);
    $(obj).animate({ 'margin-bottom': '-100px' }, 700);
    window.setTimeout(function() {
        $(obj).remove();
    }, 3000);
    // $(obj).fadeOut(700).remove();

}

$(document).on("mousedown", "#gen_NotiCollect>div", function() {
    gen_noti_Selct(this);
});


function gen_noti_Selct(obj) {
    $('.nwactive').removeClass("unread");
    $('.nwactive').removeClass("nwactive");
    $(obj).addClass("nwactive");
}


function disableSelection(target) {
    if (typeof target.onselectstart != "undefined") //IE route
        target.onselectstart = function() { return false }
    else if (typeof target.style.MozUserSelect != "undefined") //Firefox route
        target.style.MozUserSelect = "none"
    else //All other route (ie: Opera)
        target.onmousedown = function() { return false }
    target.style.cursor = "default"
}

//Sample usages
//disableSelection(document.body) //Disable text selection on entire body
//disableSelection(document.getElementById("mydiv")) //Disable text selection on element with


$(function() {

    $.contextMenu({
        selector: '#gen_NotiCollect>div.a',
        callback: function(key, options) {
            gen_noti_Selct(this);
            //            var m = "clicked: " + key;
            //            var isComponent = 0;
            //if (key == "rmenuClose") { mainParent_Close_Form(); }
            //else if (key == "rmenuCloseEx") { mainParent_Close_Form_Except(); }
            //else if (key == "rmenuCloseALL") { mainParent_Close_Form_All(); }
            //            else if (key == "property") { sidebarCaller(); }
            //            if (isComponent == 1) {
            //                var cid = $(this).attr("id");
            //                CreateComponent(cid);
            //                isComponent = 0;
            //            }

            //DropComponent(cid);
            // window.console && console.log(m) || alert(m);
        },
        items: {
            "rview": { name: "View", icon: "windowAddFav" },
            "sep2": "---------",
            "rremove": { name: "Remove to This", icon: "windowRemoveFav" }
        }
    });
});

$(document).on('click', '#btnNotifMsg', function() {
    var tempattr = $(this).attr('tempattr');
    var liObj = $('#' + tempattr + '');
    gen_noti_Remove(liObj);

});
$(document).on('click', '#h_compName', function () {
    MenuLoad("P8SysNotificationHome247", "azie247");

});



function GetNotification(a,b,c) {
    xCounter++;
    gen_noti_ID = xCounter;
    var txtext = "<li id=\"gen_NotiItem" + gen_noti_ID + "\" style=\"margin-left: 530px; margin-bottom: 100px;\"><div class=\"gen_NotiItem\"> " +
        "<div><b>" + a + "</b></div>" +
        "<div style=\"overflow-y: auto; width: 200px; height: 100px;\">" + b + "</div>"
        + "<button style=\"float:left; margin-left: 160px; margin-top: 30px; border-radius: 4px; background-color: #73BF44; color: white; font-weight: bold; border-color: #73BF44;\" id=\"btnNotifMsg\" tempattr=\"gen_NotiItem" + gen_noti_ID + "\">OK</button>"
        + "</div></li>";
    if (isLoaded == undefined) {
        $("#gen_NotiCon").prepend(txtext);
    }

}

