
var basedTitle = "Main";
var jsonNotifAll = [];

function func_Reload() {
    crLnk = GetCurrentURL() + "Home_Gateway";
    crLnkGateKey = "Home";
    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    cust_GetPara();
   // nw_GetNotificationAllList("");

    return isContinue;
}


function cust_GetPara() {

}

$(function() {
     nwLoading_SpinnerPrepend("conNotif");
})

function nw_GetNotificationAllList(curdate) {
    nwParameter_Add("curdate", curdate);
    func_ActionDriven("actGetNotificationAllList", false, crLnk);
}

function nw_GetNotificationAllListRender() {
    var jsondata = jsonNotifAll;
    for (var i = jsondata.length - 1; i >= 0 ; i--) {
        nw_GetNotificationAllAddItem(jsondata[i]["Title"], jsondata[i]["Message"], jsondata[i]["Recdate"]);
    }
    nw_GetNotificationAllRefresh();
}
function nw_GetNotificationAllAddItem(title, message, date) {
    var strtemplate = "";
    var datetext = date;

    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var options2 = { hour: 'numeric', minute: 'numeric' };
    var today = new Date(datetext);
    datetext = today.toLocaleDateString("en-US", options) + " | " + today.toLocaleTimeString("en-US", options2);



    strtemplate += "<div class='spl-sys-r-c' rdate='" + date + "'>";
    strtemplate += "<div class='spl-sys-r-text'>";
    strtemplate += "<div class='spl-sys-r-title'>" + title + "</div>";
    strtemplate += "<div class='spl-sys-r-subtitle'>" + message + "</div>";
    strtemplate += "<div class='spl-sys-r-date'>" + datetext + "</div>";
    strtemplate += "</div>";
    strtemplate += "</div>";
    $("#conNotif").prepend(strtemplate);
}


function nw_GetNotificationAllRefresh() {
    $(".spl-sys-r-subtitle").each(function () {
        var fnCheckText = $(this);
        var fnCheckEllipsis = fnCheckText[0].scrollHeight > fnCheckText[0].clientHeight;

        if (fnCheckEllipsis) {
            fnCheckText.addClass('active');
        } else {
            fnCheckText.addClass('inactive');
        }
    });

    $(".spl-sys-r-subtitle.active").click(function () {
        var notifTitle = $(this).siblings(".spl-sys-r-title").text();
        var notifDate = $(this).siblings(".spl-sys-r-date").text();
        var notifDetails = $(this).text();

        var notifTitleHTML = '<div class="spl-sys-tx">' + notifTitle + '</div>';
        var notifDateHTML = '<div class="spl-sys-sdt">' + notifDate + '</div>';
        var notifDetails = '<div class="spl-sys-stx">' + notifDetails + '</div>';

        $(".spl-sys-psntf-title").html(notifTitleHTML);
        $(".spl-sys-psntf-date").html(notifDateHTML);
        $(".spl-sys-psntf-content").html(notifDetails);

        $(".spl-sys-psntf").addClass('show');
    });

    $(".spl-sys-psntf-close.btnPopup").click(function () {
        $(".spl-sys-psntf-title").html('');
        $(".spl-sys-psntf-content").html('');
        $(".spl-sys-psntf-date").html('');

        $(".spl-sys-psntf").removeClass('show');
    });
}

