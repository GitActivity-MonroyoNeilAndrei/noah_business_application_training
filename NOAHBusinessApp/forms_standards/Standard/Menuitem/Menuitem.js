
var token = "";
var userid = "";

function func_Reload() {

    LoadStringsCases();
    crLnk = GetCurrentURL() + "Menuitem_Gateway";
    crLnkGateKey = "Menuitem";

    var isContinue = true;
   // init_request();
    ToolBoxGetData = false;

    
    return isContinue;
}
$(function () {
    nwTrustedLinks.push("noahstandardv10.promptus8.com");
    setTimeout(function () { nwLoading_End("actLoadMenuItemSec"); }, 1000);
});