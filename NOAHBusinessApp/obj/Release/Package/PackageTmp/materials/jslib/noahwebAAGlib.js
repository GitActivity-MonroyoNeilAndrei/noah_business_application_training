/* # NoahWeb JS Library 3.1.0.17
# Company Owner: Forecasting and Planning Technologies Inc. / Promptus8 Inc.
# Developers : Angelo Carlo A. Gonzales
: Ma. Edgarda A. Malvar

# Date Created : May 2021
# Date Modified : December 04, 2024 12:01 PM  - before: 10-17-2024

For  NoahWeb Application and Promptus8 Modules used only. 

Illeggal used are Prohibited
Modification of this Library is Prohibited.
*/


var isNewRow = false;
var isContinueProcess = false;
var isContinueProcessCancel = false;
var ContinueProcess = false;
var isRefresh = false;
var isDataLookup = true;

var isContinuePress = false;

var crLnk = "forms_GateWay/noahweb_Gateway";
var crExportLnk = GetCurrentURL() + '../forms_standards/ExportToExcel';
var crExportPrintLnk = '../forms_standards/Standard/ExportPrint/default.aspx';
var crSTDLnk = GetCurrentURL() + "../RunStandard";
var crSTDImageEditor = GetCurrentURL() + "../forms_standards/ImageEditor/index.html";

var nwMenuID = "";

var crLnkGateKey = "";
var crLnkQu = "";
var crParaObj = "";//aagnone makes parameter null
var crnwTD;
var crnwTR;
var crnwTable;
var crnwTableCon;
var crnwLookupTable;

var crnwTagSingleBind = false;


var baseTitle = "";
var basePageID = "";
var baseSessionID = "";
var baseInterfaceUser = "";
var baseInterfacePowerUser = "";

var crToolIndex = -1;
var crToolRowNum = -1;
var crToolInquireKey = "";

var isContainsSensitive = true;
var nwisMobile = false; //initiate as false
var nwisServerSideMenu = true;


var crFunc = -1;
var crPos = -1;

var crToolBoxType = "cl";

var xx = 0;

var nwDevMode = false;
var nwDevCrushed = false;
var nwHelloAngelo = false;
var nwSec = false;
var nwInterfaceMode = false;
var ToolBoxGetData = false;

var isDataRequired = true; // indentify the 
var isStandard = true;
var isLookupCodeCombo = true;

var nwToolBoxConfig = new Array();
var nwToolBoxConfigS = "";
var nwToolBoxConfigC = "";
var nwToolBoxConfigT = "";

var collection_TempG = new Array();
var isAjax = false;

//## ARM ## 02-02-2016
//## Start ##
var isMessageQuestionNavigation = false;
var Navigation_recnum = "";
var Navigation_object = "";
var Navigation_nextID = "";
var Navigation_nextPrimarykey = "";
var NaviationFlag = false;
var Navigation_Next = false;
var nwLookupAutoSearch = false;
//## End ##
var DocFileSize = 5242880;

//Custom Variable
var custnwGridAdjust = false;

//EDIT //06-07-2017 //ARM
var xLOG_menuitem = "";
var xLOG_toolboxitem = "";

var ExportSessionID = "";
//EDIT //11-17-2017 //ARM
var _ToolBoxClicked = "";

//EDIT //01-10-2018 //arm
var _CustomizeLogs = false;

var nwlookupJSON = [];
var nwRemarksJSON = [];

var nwServerLink = "";
var nwServerPath = "";

//v10
var nwGridExport_Book;
var nwGridExport_Sheet;

var nwIsGetGridData = true;
var nwIsGetSpreadData = false;


var nwsessionticker;


function DetectMobile() {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
        return true;
    return false;
}

function libSkip() {
    try {
        if (aagmodi == true)
            return true;
    } catch (err) { }
    return false;
}

$(function () {
    BrowserCheck();
    // device detection
    nwisMobile = DetectMobile();

    if (nwBrowser == 'Safari') func_dllCallResource();


    if (nwBrowser_getEntriesByType() == undefined && nwisMobile == false) {
        setTimeout(function () {
            func_AAGChecker("7778");
        }, 300);
    }
    // alert(BrowserCheck());
});

function func_dllCallResource() {
    //!function(a){"use strict";"undefined"==typeof a&&(a={}),"undefined"==typeof a.performance&&(a.performance={}),a._perfRefForUserTimingPolyfill=a.performance,a.performance.userTimingJsNow=!1,a.performance.userTimingJsNowPrefixed=!1,a.performance.userTimingJsUserTiming=!1,a.performance.userTimingJsUserTimingPrefixed=!1,a.performance.userTimingJsPerformanceTimeline=!1,a.performance.userTimingJsPerformanceTimelinePrefixed=!1;var b,c,d=[],e=[],f=null;if("function"!=typeof a.performance.now){for(a.performance.userTimingJsNow=!0,e=["webkitNow","msNow","mozNow"],b=0;b<e.length;b++)if("function"==typeof a.performance[e[b]]){a.performance.now=a.performance[e[b]],a.performance.userTimingJsNowPrefixed=!0;break}var g=+new Date;a.performance.timing&&a.performance.timing.navigationStart?g=a.performance.timing.navigationStart:"undefined"!=typeof process&&"function"==typeof process.hrtime&&(g=process.hrtime(),a.performance.now=function(){var a=process.hrtime(g);return 1e3*a[0]+1e-6*a[1]}),"function"!=typeof a.performance.now&&(Date.now?a.performance.now=function(){return Date.now()-g}:a.performance.now=function(){return+new Date-g})}var h=function(){},i=function(){},j=[],k=!1,l=!1;if("function"!=typeof a.performance.getEntries||"function"!=typeof a.performance.mark){for("function"==typeof a.performance.getEntries&&"function"!=typeof a.performance.mark&&(l=!0),a.performance.userTimingJsPerformanceTimeline=!0,d=["webkit","moz"],e=["getEntries","getEntriesByName","getEntriesByType"],b=0;b<e.length;b++)for(c=0;c<d.length;c++)f=d[c]+e[b].substr(0,1).toUpperCase()+e[b].substr(1),"function"==typeof a.performance[f]&&(a.performance[e[b]]=a.performance[f],a.performance.userTimingJsPerformanceTimelinePrefixed=!0);h=function(a){j.push(a),"measure"===a.entryType&&(k=!0)};var m=function(){k&&(j.sort(function(a,b){return a.startTime-b.startTime}),k=!1)};if(i=function(a,c){for(b=0;b<j.length;)j[b].entryType===a&&("undefined"==typeof c||j[b].name===c)?j.splice(b,1):b++},"function"!=typeof a.performance.getEntries||l){var n=a.performance.getEntries;a.performance.getEntries=function(){m();var b=j.slice(0);return l&&n&&(Array.prototype.push.apply(b,n.call(a.performance)),b.sort(function(a,b){return a.startTime-b.startTime})),b}}if("function"!=typeof a.performance.getEntriesByType||l){var o=a.performance.getEntriesByType;a.performance.getEntriesByType=function(c){if("undefined"==typeof c||"mark"!==c&&"measure"!==c)return l&&o?o.call(a.performance,c):[];"measure"===c&&m();var d=[];for(b=0;b<j.length;b++)j[b].entryType===c&&d.push(j[b]);return d}}if("function"!=typeof a.performance.getEntriesByName||l){var p=a.performance.getEntriesByName;a.performance.getEntriesByName=function(c,d){if(d&&"mark"!==d&&"measure"!==d)return l&&p?p.call(a.performance,c,d):[];"undefined"!=typeof d&&"measure"===d&&m();var e=[];for(b=0;b<j.length;b++)"undefined"!=typeof d&&j[b].entryType!==d||j[b].name===c&&e.push(j[b]);return l&&p&&(Array.prototype.push.apply(e,p.call(a.performance,c,d)),e.sort(function(a,b){return a.startTime-b.startTime})),e}}}if("function"!=typeof a.performance.mark){for(a.performance.userTimingJsUserTiming=!0,d=["webkit","moz","ms"],e=["mark","measure","clearMarks","clearMeasures"],b=0;b<e.length;b++)for(c=0;c<d.length;c++)f=d[c]+e[b].substr(0,1).toUpperCase()+e[b].substr(1),"function"==typeof a.performance[f]&&(a.performance[e[b]]=a.performance[f],a.performance.userTimingJsUserTimingPrefixed=!0);var q={};"function"!=typeof a.performance.mark&&(a.performance.mark=function(b){var c=a.performance.now();if("undefined"==typeof b)throw new SyntaxError("Mark name must be specified");if(a.performance.timing&&b in a.performance.timing)throw new SyntaxError("Mark name is not allowed");q[b]||(q[b]=[]),q[b].push(c),h({entryType:"mark",name:b,startTime:c,duration:0})}),"function"!=typeof a.performance.clearMarks&&(a.performance.clearMarks=function(a){a?q[a]=[]:q={},i("mark",a)}),"function"!=typeof a.performance.measure&&(a.performance.measure=function(b,c,d){var e=a.performance.now();if("undefined"==typeof b)throw new SyntaxError("Measure must be specified");if(!c)return void h({entryType:"measure",name:b,startTime:0,duration:e});var f=0;if(a.performance.timing&&c in a.performance.timing){if("navigationStart"!==c&&0===a.performance.timing[c])throw new Error(c+" has a timing of 0");f=a.performance.timing[c]-a.performance.timing.navigationStart}else{if(!(c in q))throw new Error(c+" mark not found");f=q[c][q[c].length-1]}var g=e;if(d)if(g=0,a.performance.timing&&d in a.performance.timing){if("navigationStart"!==d&&0===a.performance.timing[d])throw new Error(d+" has a timing of 0");g=a.performance.timing[d]-a.performance.timing.navigationStart}else{if(!(d in q))throw new Error(d+" mark not found");g=q[d][q[d].length-1]}var i=g-f;h({entryType:"measure",name:b,startTime:f,duration:i})}),"function"!=typeof a.performance.clearMeasures&&(a.performance.clearMeasures=function(a){i("measure",a)})}"function"==typeof define&&define.amd?define([],function(){return a.performance}):"undefined"!=typeof module&&"undefined"!=typeof module.exports&&(module.exports=a.performance)}("undefined"!=typeof window?window:void 0);
    try {
        (function () {
            'use strict';
            var oldXHR, stateChangeHandler, prop;
            oldXHR = window.XMLHttpRequest;
            stateChangeHandler = function (evt) {
                try {
                    switch (this.readyState) {
                        case oldXHR.OPENED:
                            console.log('Request was made', this, evt); //, this, evt
                            break;
                        case oldXHR.DONE:

                            var responseHeaders = this.getAllResponseHeaders();
                            //  alert(this.responseText + " @@ " + oldXHR.responseURL + " @@ " + responseHeaders);

                            var urlx = oldXHR.responseURL;



                            var xidnex = urlx.replace("//", "@@").indexOf("/");
                            if (xidnex < 0) xidnex = urlx.length;
                            var host = urlx.substring(0, xidnex);
                            var xindexlink = host.replace("//", "@@").indexOf("@@");
                            if (xindexlink >= 0) { xindexlink += 2; host = host.substring(xindexlink); }

                            if (!(nwTrustedLinks.indexOf(host.toLowerCase()) > -1)) {
                                var crsecTempVar = host + "<br><br><br><u>" + host + "</u> : <b>" + "request" + "</b>-" + urlx;
                                func_AAGChecker("7778", crsecTempVar);
                            }
                            console.log('Request finished'); //, this, evt
                            break;
                    }
                } catch (err) {
                    //alert("Error: " + err + " " + this); 
                }
            };

            function newXHR() {
                var xhr = new oldXHR();
                xhr.addEventListener('readystatechange', stateChangeHandler);
                return xhr;
            }
            // Copy original states and toString
            for (prop in oldXHR)
                newXHR[prop] = oldXHR[prop];

            window.XMLHttpRequest = newXHR;
        })();

    } catch (err) {//alert("Error: " + err);
    }

}


function nwBrowser_getEntriesByType() {
    if (nwBrowser == 'Safari')
        return "";
    return window.performance.getEntriesByType;
}

var nwBrowser = "";
function BrowserCheck() {
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    // At least Safari 3+: "[object HTMLElementConstructor]"
    var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
    var isChrome = !!window.chrome && !!window.chrome.webstore;
    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;

    if (isOpera || (navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
        nwBrowser = 'Opera';
    }
    else if (isChrome || navigator.userAgent.indexOf("Chrome") != -1) {
        nwBrowser = 'Chrome';
    }
    else if (isSafari || navigator.userAgent.indexOf("Safari") != -1) {
        nwBrowser = 'Safari';
    }
    else if (isFirefox || navigator.userAgent.indexOf("Firefox") != -1) {
        nwBrowser = 'Firefox';
    }
    else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) //IF IE > 10
    {
        nwBrowser = 'IE';
    }
    else {
        nwBrowser = 'unknown';
    }

    return nwBrowser;
}


function requestFormAsync(data, rurl, requestID, requestType) {
    requestForm_PostAsync(data, rurl, requestID, requestType);
}

function requestForm(data, rurl, requestID, requestType) {
    requestForm_Post(data, rurl, requestID, requestType);
    // requestForm_Ajax(data, rurl);
}

var xpost;
function requestForm_Post(rdata, rurl, requestID, requestType) {
    //    start_Loading();
    // showLoader(true);
    if (requestType == undefined) requestType = "web request";
    if (requestID == undefined) requestID = func_nwRandomString(20);
    rurl = func_addQLink(rurl, requestID);

    crLoadingIDnum += 1;
    var reqnum = crLoadingIDnum;
    nwLoading_Start(reqnum);

    if (rurl.indexOf('?') != 0) {


        try {
            rdata.nwAccxx = nwToolBoxConfig.toString();
        } catch (err) { }

        try {
            //nwconsole.log(xpost.ReqType);
            if (xpost.ReqType.indexOf("Lookup-") == 0 && requestType.indexOf("Lookup-") == 0) {
                xpost.abort();
            }

        } catch (err) { }

        //setTimeout(function(){ 
        //  try {
        xpost = $.post(rurl, rdata, function (data, status) {
            //  alert(status + " " + rurl); //alert(data);


            data = data.replaceAll(">$(function(){", ">").replaceAll("});</script>", "</script>");

            try {
                $('#noahwebSedit').append(data);
            } catch (err) { }

            if (requestID == "nwdontclearparams") {
                clear_parametersResource();
            }
            else {
                clear_parameters();
            }

            $('.message_content').find('#pop_loader').remove();
            $('.message_content').find('table').css('display', '');
            nwLoading_End(reqnum);

            try {
                if (rurl.indexOf("nwmethod=get_Initialize") >= 0)
                    setTimeout(function () { nwLoading_End("nwFirstLoadDataAzie"); }, 100);
            } catch (err) { }
            try {
                setTimeout(function () { nwLoading_End("nwStandardLoading"); }, 10);
            } catch (err) { }

            setTimeout(function () {
                if (!(rurl.indexOf("RunStandard") >= 0)) {
                    if (data.indexOf('func_ToolboxData("#noah-webui-Toolbox-Grid"') < 0)
                        nwLoading_End("nwaagToolBox");
                }
                $("#aagLoadingNnwFirstLoadDataAzie").remove();
            }, 100);

            if (nwDevMode == false) {
                $('#noahwebSedit').html("");
            }

            try {
                func_LanguageConvertLang(jsonLang);
            } catch (err) { }

            try {
                func_RequestEnd(true, requestID, rdata, rurl);
            } catch (err) { }


        }, "html").fail(function () {
            // Handle error here
            try {
                func_RequestEnd(true, requestID, rdata, rurl);
            } catch (err) { }

            nwLoading_End(reqnum);
        });
        xpost.id = requestID;
        xpost.ReqType = requestType;

        //},10);

        //.error(function() { alert('Internal Server Error'); });
        //  } catch (err) { }
    }
}




function requestForm_PostAsync(rdata, rurl, requestID, requestType) {
    requestForm_Post(rdata, rurl, requestID, requestType);
}

function getParameterByName(name) {
    if (baseInterfaceUser != "" && name == "nwu") return baseInterfaceUser;
    if (baseInterfacePowerUser != "" && name == "nwpu") return baseInterfacePowerUser;

    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}




var crLoadingIDnum = 0;
//var crLoadingHTML = "<div class=\"nwLoadingMid\"><div class=\"nwLoadingInfo\">&nbsp; Loading...</div><div class=\"nwLoadingInfoCustom\">process</div></div>";
//crLoadingHTML = "<div class=\"nwLoadingMid\"><div class=\"nwLoadingImage\" ></div><div class=\"nwLoadingInfo\">Loading...</div></div>";
//crLoadingHTML = "<div class='nwLoadingMid'><div class='nwLoadingImage' ></div><div class='nwLoadingInfo'>Loading...</div><div class='loading'><div class='loadingball'></div><div class='loadingball'></div> <div class='loadingball'></div></div></div>";
var crLoadingHTML = "<div class='dot-spin'><div class='dot-spin-dot'></div><div class='dot-spin-dot'></div><div class='dot-spin-dot'></div><div class='dot-spin-dot'></div><div class='dot-spin-dot'></div><div class='dot-spin-dot'></div><div class='dot-spin-dot'></div><div class='dot-spin-dot'></div></div><div class='shadow'></div><div class='ldfx'><div class='txt'>Loading</div><div class='dtfrog'><div class='dtfrog-dot'></div><div class='dtfrog-dot'></div><div class='dtfrog-dot'></div></div></div>";



var nwLoadingDefault = false;
function nwLoading_Start(nwLoadingID, nwContainer, nwClass, nwTitle) {

    var isContinue = true;

    var isValid = false;
    if (isContinue && nwLoadingDefault && nwLoadingID != "0") {
        $("body div#nwLoadingContainer").append("<div id=\"aagLoadingN" + nwLoadingID + "\" style=\"display:none;\" class=\"nwLoading nwLoadingDefault\">" + crLoadingHTML + "</div>");
        isValid = true;
    } else if (isContinue && nwContainer != undefined && nwLoadingDefault == false && nwLoadingID != "0") {
        $("body div#nwLoadingContainer").append("<div id=\"aagLoadingN" + nwLoadingID + "\" style=\"display:none;\" class=\"nwLoading nwLoadingDefault " + nwClass + "\">" + nwContainer + "</div>");
        isValid = true;
    }

    if (nwTitle != undefined) {
        $("#aagLoadingN" + nwLoadingID).find(".txt").text(nwTitle);
    }

    try {
        if (isValid == true)
            $("#main-container").addClass("backgroundblur");
    }
    catch (err) { }

    setTimeout(function () {
        $("#aagLoadingN" + nwLoadingID).show();
    }, 10);

}
function nwLoading_End(nwLoadingID) {
    $("#aagLoadingN" + nwLoadingID + ".nwLoading").fadeOut().remove();
    try {
        if ($('#nwLoadingContainer').find(".nwLoading").length <= 0)
            $("#main-container").removeClass("backgroundblur");
    }
    catch (err) { }
}

var crLoadingSpinnerHTML = "<div class='show-loading'><div class='nwLoading loading-container'> <div class='dot-spin size'> <div class='dot-spin-dot'></div> <div class='dot-spin-dot'></div> <div class='dot-spin-dot'></div> <div class='dot-spin-dot'></div> <div class='dot-spin-dot'></div> <div class='dot-spin-dot'></div> <div class='dot-spin-dot'></div> <div class='dot-spin-dot'></div> </div> </div> </div>";
function nwLoading_SpinnerAppend(elemcontainer) {
    setTimeout(function () {
        $('#' + elemcontainer).append(crLoadingSpinnerHTML);
    }, 1);
}
function nwLoading_SpinnerPrepend(elemcontainer) {
    setTimeout(function () {
        $('#' + elemcontainer).prepend(crLoadingSpinnerHTML);
    }, 1);
}
function nwLoading_SpinnerEnd(elemcontainer) {
    setTimeout(function () {
        $('#' + elemcontainer).find('.show-loading').remove();
    }, 1);
}

function requestForm_Ajax(data, rurl) {

    var dataVal = JSON.stringify(data);
    start_Loading();
    if (nwDevMode == true) rurl += "&nwdev=p8dev";
    $.ajax({
        type: "POST",
        url: rurl,
        contentType: "application/json; charset=utf-8",
        data: dataVal,
        dataType: "json",
        success: function (data) {

            var htmlStr = data.d; //alert(htmlStr);
            $('#noahwebSedit').append(htmlStr);
            $('.message_content').find('#pop_loader').remove();

            $('.message_content').find('table').css('display', '');
            $('#dealerInfo').css('display', '');


            if (nwDevMode == false) {
                $('#noahwebSedit').html("");

            }

            end_Loading();
            clear_parameters();
        },
        error: function (data, status, err) {
            //alert(err);
            var htmlStr = data.d; //alert(htmlStr + " eroor");
            $('#noahwebSedit').html(htmlStr);
            $('.message_content').find('#pop_loader').remove();
            end_Loading();

        }, timeout: 500 // in milliseconds

    });
}

function func_nwHTMLReader(verstr) {
    var tempstr = verstr;

    tempstr = tempstr.replace(/</g, "!nwless!");
    //    tempstr= tempstr.replace(/>/g,"&#62;");
    //    tempstr= tempstr.replace(/'/g,"&#39;");
    //    tempstr= tempstr.replace(/"/g,"&#8220;");
    //    tempstr= tempstr.replace(/\//g,"&#47;");
    tempstr = tempstr.replace(/&/g, "!nwamp!");
    // tempstr= tempstr.replace(/ / /g,"&#47;");&#38;
    return tempstr;
}
function func_nwConvertParaValue() {

    for (var i = 0; i < $('.nwGrid').length; i++) {
        var xcon = $('.nwGrid:eq(' + i + ')').parent().attr("id");
        var nwinstance = $('.nwGrid:eq(' + i + ')').attr("nwinstance");
        if ((xcon + '') != "undefined")
            nwParameter_Add("nwgrid_nwinstance_" + xcon, nwinstance);
    }

    strParameter = func_nwHTMLReader(strParameter);
    strValue = func_nwHTMLReader(strValue);

    //     strParameter = p8Encrypted(strParameter);
    //     strValue= p8Encrypted(strValue);

}


function func_addQLink(strUrl, requestID) {
    // alert(strUrl);
    var xadd = ""; //"&nwu="+getParameterByName("nwu")+ "&nwmid="+getParameterByName("nwmid")  + "&nwcon="+getParameterByName("nwcon")  + "&nw="+getParameterByName("nw")+ "&nwuser="+getParameterByName("nwuser")+ "&nwcom="+getParameterByName("nwcom");
    if (strUrl.indexOf("?") == -1) {
        strUrl += "?aagGateMethod=" + crLnkGateKey + xadd + "&" + crLnkQu;
    }
    else {
        strUrl += "&aagGateMethod=" + crLnkGateKey + xadd + "&" + crLnkQu;
    }
    if (requestID != "undefined" && requestID != undefined) strUrl += "&requestID=" + requestID;

    if ((getParameterByName("nwdev") == "p8dev" || nwDevMode == true) && (strUrl.indexOf("nwdev=p8dev") == -1)) strUrl += "&nwdev=p8dev";
    //  if ((getParameterByName("nwdev") == "p8dev" && nwDevMode == true) && (strUrl.indexOf("nwdev=p8dev") == -1)) strUrl += "&nwdev=p8dev";


    if (!(strUrl.indexOf("nwcon=") >= 0))
        strUrl = strUrl + "&nwcon=" + getParameterByName("nwcon");
    if (!(strUrl.indexOf("nw=") >= 0))
        strUrl = strUrl + "&nw=" + getParameterByName("nw");
    if (!(strUrl.indexOf("nwuser=") >= 0))
        strUrl = strUrl + "&nwuser=" + getParameterByName("nwuser");
    if (!(strUrl.indexOf("nwcom=") >= 0))
        strUrl = strUrl + "&nwcom=" + getParameterByName("nwcom");
    if (!(strUrl.indexOf("nwcomc=") >= 0))
        strUrl = strUrl.replace() + "&nwcomc=" + getParameterByName("nwcomc");
    if (!(strUrl.indexOf("nwpu=") >= 0))
        strUrl = strUrl.replace() + "&nwpu=" + getParameterByName("nwpu");


    if (!(strUrl.indexOf("nwtku=") >= 0))
        strUrl = strUrl.replace() + "&nwtku=" + getParameterByName("nwtku");
    if (!(strUrl.indexOf("nsc=") >= 0))
        strUrl = strUrl.replace() + "&nsc=" + getParameterByName("nsc");
    if (!(strUrl.indexOf("nsu=") >= 0))
        strUrl = strUrl.replace() + "&nsu=" + getParameterByName("nsu");




    //  || (strUrl.indexOf("nwcomc=&")>=0)


    if ((strUrl.indexOf("&nwcon=&") >= 0))
        strUrl = strUrl.replace("&nwcon=&", "&nwcon=" + getParameterByName("nwcon") + "&");
    if ((strUrl.indexOf("&nw=&") >= 0))
        strUrl = strUrl.replace("&nw=&", "&nw=" + getParameterByName("nw") + "&");
    if ((strUrl.indexOf("&nwuser=&") >= 0))
        strUrl = strUrl.replace("&nwuser=&", "&nwuser=" + getParameterByName("nwuser") + "&");
    if ((strUrl.indexOf("&nwcom=&") >= 0))
        strUrl = strUrl.replace("&nwcom=&", "&nwcom=" + getParameterByName("nwcom") + "&");
    if ((strUrl.indexOf("&nwcomc=&") >= 0))
        strUrl = strUrl.replace("&nwcomc=&", "&nwcomc=" + getParameterByName("nwcomc") + "&");


    if ((strUrl.indexOf("&nwtku=&") >= 0))
        strUrl = strUrl.replace("&nwtku=&", "&nwtku=" + getParameterByName("nwtku") + "&");


    if ((strUrl.indexOf("&nsc=&") >= 0))
        strUrl = strUrl.replace("&nsc=&", "&nsc=" + getParameterByName("nsc") + "&");

    if ((strUrl.indexOf("&nsu=&") >= 0))
        strUrl = strUrl.replace("&nsu=&", "&nsu=" + getParameterByName("nsu") + "&");



    return strUrl;
}


function start_Loading() {

    $("#dimbgLoading").addClass("openn");
}

function end_Loading() {
    $("#dimbgLoading").removeClass("openn");
}


var strParameter = ""; var strParameterResource = "";
var strValue = ""; var strValueResource = "";
function clear_parameters() {
    strParameter = "";
    strValue = "";
    crParaObj = "";
}
function clear_parametersResource() {
    strParameterResource = "";
    strValueResource = "";
}

function nwParameter_AddResource(varPara, varValue) {
    if (varPara.replace(" ", "") == "") {
        strParameterResource = varPara;
        strValueResource += varValue;
    }
    else {
        strParameterResource += "#@#" + varPara;
        strValueResource += "#@#" + varValue;
    }
}
function nwParameter_Add(varPara, varValue) {

    if (varPara != undefined) varPara = (varPara + "").replaceAll("#@#", "^aagChardSplit^");
    if (varValue != undefined) varValue = (varValue + "").replaceAll("#@#", "^aagChardSplit^");


    if (varPara.replace(" ", "") == "") {
        strParameter = varPara;
        strValue = varValue;
    }
    else {
        strParameter += "#@#" + varPara;
        strValue += "#@#" + varValue;
    }
}

function nwParameter_Add_DataSet(Book) {

    var jsondataset = {};
    var Spread = Book;
    try {
        if (Spread.ActiveSheet.canvasID != "" && Spread.ActiveSheet.canvasID != undefined) {

        }
    } catch (err) {
        Spread = P8DataList[Book][0].sheet;
    }

    for (var isheet = 0; isheet < Spread.Sheet.length; isheet++) {
        var JsonData = [];
        for (var i = 0; i < Spread.Sheet[isheet].Data.length; i++) {
            var row = {};
            for (var ic = 0; ic < Spread.Sheet[isheet].ColumnConfig.length; ic++) {
                row[Spread.Sheet[isheet].ColumnConfig[ic].name] = Spread.Sheet[isheet].GetValue(ic, i) + "";
            }
            JsonData.push(row);
        }
        jsondataset[Spread.Sheet[isheet].SheetName] = JsonData;
    }
    var varValue = JSON.stringify(jsondataset);
    var varPara = Spread.ActiveSheet.canvasID;


    if (varPara != undefined) varPara = (varPara + "").replaceAll("#@#", "^aagChardSplit^");
    if (varValue != undefined) varValue = (varValue + "").replaceAll("#@#", "^aagChardSplit^");


    if (varPara.replace(" ", "") == "") {
        strParameter = varPara;
        strValue = varValue;
    }
    else {
        strParameter += "#@#" + varPara;
        strValue += "#@#" + varValue;
    }
}



function nwParameter_Add_Spread(Book) {

    var jsondataset = {}; var jsondatasetConfig = {};
    var Spread = Book;
    try {
        if (Spread.ActiveSheet.canvasID != "" && Spread.ActiveSheet.canvasID != undefined) {

        }
    } catch (err) {
        Spread = P8DataList[Book][0].sheet;
    }

    var instance = nwRandomString(30);
    for (var isheet = 0; isheet < Spread.Sheet.length; isheet++) {
        var JsonData = [];
        var JsonDataConfig = [];
        for (var i = 0; i < Spread.Sheet[isheet].Data.length; i++) {
            var row = {};
            var rowConfig = {};

            for (var ic = 0; ic < Spread.Sheet[isheet].ColumnConfig.length; ic++) {
                var config = Spread.Sheet[isheet].GetCell(ic, i);
                try {
                    row[Spread.Sheet[isheet].ColumnConfig[ic].name] = (config.value) + "";
                } catch (err) { }
                var obj = Spread.Sheet[isheet];
                var formula = obj.Data[i][_sfGetCellName(obj, ic)].formula || "";

                if (formula != "")
                    JsonDataConfig.push({ RowNumber: i + "", ColumnNumber: ic + "", ConfigType: "formula", Setting1: formula, Setting2: "", ID: instance + "-" + isheet });


                for (var icx = 0; icx < config.Config.length; icx++) {
                    var confgValue = config.Config[icx].element.value;
                    var confgType = config.Config[icx].id

                    if (confgType == "merge") {
                        var colspan = (confgValue[0].col2 - confgValue[0].col) + 1;
                        var rowspan = (confgValue[0].row2 - confgValue[0].row) + 1;
                        if (colspan <= 1) colspan = 1;
                        if (rowspan <= 1) rowspan = 1;
                        JsonDataConfig.push({ RowNumber: confgValue[0].row + "", ColumnNumber: confgValue[0].col + "", ConfigType: confgType, Setting1: (rowspan) + "", Setting2: (colspan) + "", ID: instance + "-" + isheet });
                    }
                    else {
                        //func_GetSpreadCOLROWConfig(JsonDataConfig, Spread.Sheet[isheet].ColumnConfig[icol], i + "", ic + "", instance + "-" + isheet);
                        JsonDataConfig.push({ RowNumber: i + "", ColumnNumber: ic + "", ConfigType: confgType, Setting1: confgValue, Setting2: "", ID: instance + "-" + isheet });
                    }
                    //  JsonDataConfig.push({ RowNumber: i + "", ColumnNumber: ic + "", ConfigType: confgType, Setting1: 4, Setting2: "", ID: instance + "-" + isheet });
                }




            }
            JsonData.push(row);
        }

        //column configs
        for (var icol = 0; icol < Spread.Sheet[isheet].ColumnConfig.length; icol++) {
            func_GetSpreadCOLROWConfig(JsonDataConfig, Spread.Sheet[isheet].ColumnConfig[icol], "", icol + "", instance + "-" + isheet, Spread.Sheet[isheet]);
        }


        // row and cell config
        for (var irow = 0; irow < Spread.Sheet[isheet].RowConfig.length; irow++) {
            var xirow = Spread.Sheet[isheet].RowConfig[irow].row;
            func_GetSpreadCOLROWConfig(JsonDataConfig, Spread.Sheet[isheet].RowConfig[irow].config, xirow + "", "", instance + "-" + isheet, Spread.Sheet[isheet]);
        }


        // generalconfig
        var valuex = "";
        valuex = Spread.Sheet[isheet].ColumnDataTypeStart || 0;
        JsonDataConfig.push({ RowNumber: "", ColumnNumber: "", ConfigType: "ColumnDataTypeStart", Setting1: valuex, Setting2: "", ID: instance });


        var valuex = "";
        valuex = Spread.Sheet[isheet].ExportHideZeroWidth || 0;
        JsonDataConfig.push({ RowNumber: "", ColumnNumber: "", ConfigType: "ExportHideZeroWidth", Setting1: valuex, Setting2: "", ID: instance });



        //Export Type
        JsonDataConfig.push({ RowNumber: "", ColumnNumber: "", ConfigType: "ExportType", Setting1: "spread", Setting2: "", ID: instance });
        JsonDataConfig.push({ RowNumber: "", ColumnNumber: "", ConfigType: "FreezeColumn", Setting1: (Spread.Sheet[isheet].FreezeCol + ""), Setting2: "", ID: instance });
        JsonDataConfig.push({ RowNumber: "", ColumnNumber: "", ConfigType: "FreezeRow", Setting1: (Spread.Sheet[isheet].FreezeRow + ""), Setting2: "", ID: instance });


        // generalconfig


        //for (var irow = 0; irow < Spread.Sheet[isheet].mergeList.length; irow++) {
        //    var confgValue = Spread.Sheet[isheet].mergeList[irow];
        //    JsonDataConfig.push({ RowNumber: confgValue.row + "", ColumnNumber: confgValue.col + "", ConfigType: "", Setting1: confgValue.row2, Setting2: confgValue.col2, ID: instance + "-" + isheet });
        //}


        jsondataset[Spread.Sheet[isheet].SheetName] = JsonData;
        jsondatasetConfig[Spread.Sheet[isheet].SheetName] = JsonDataConfig;
    }


    var varValue = JSON.stringify(jsondataset);
    var varPara = Spread.ActiveSheet.canvasID;

    if (varPara != undefined) varPara = (varPara + "").replaceAll("#@#", "^aagChardSplit^");
    if (varValue != undefined) varValue = (varValue + "").replaceAll("#@#", "^aagChardSplit^");

    if (varPara.replace(" ", "") == "") {
        strParameter = varPara;
        strValue = varValue;
    }
    else {
        strParameter += "#@#" + varPara;
        strValue += "#@#" + varValue;
    }


    // configs
    varValue = JSON.stringify(jsondatasetConfig);
    varPara = Spread.ActiveSheet.canvasID + "-Config";

    if (varPara != undefined) varPara = (varPara + "").replaceAll("#@#", "^aagChardSplit^");
    if (varValue != undefined) varValue = (varValue + "").replaceAll("#@#", "^aagChardSplit^");

    if (varPara.replace(" ", "") == "") {
        strParameter = varPara;
        strValue = varValue;
    }
    else {
        strParameter += "#@#" + varPara;
        strValue += "#@#" + varValue;
    }

    console.log(jsondataset);
    console.log(jsondatasetConfig);
}


function func_GetSpreadCOLROWConfig(JsonDataConfig, obj, ix, ic, instance, spread) {
    var valuex = "";

    ix = ix + "";
    ic = ic + "";

    if (obj == undefined) return valuex;

    valuex = (obj["FontFamily"] || obj["fontFamily"] || "");
    if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: ic, ConfigType: "font-family", Setting1: (valuex + ""), Setting2: "", ID: instance });

    valuex = (obj["FontSize"] || obj["fontSize"] || "");
    if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: ic, ConfigType: "font-size", Setting1: (valuex + ""), Setting2: "", ID: instance });

    valuex = (obj["FontStyle"] || obj["italic"] || "");
    if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: ic, ConfigType: "font-style", Setting1: (valuex + ""), Setting2: "", ID: instance });

    valuex = (obj["FontWeight"] || obj["BOLD"] || obj["bold"] || "");
    if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: ic, ConfigType: "font-weight", Setting1: (valuex + ""), Setting2: "", ID: instance });

    valuex = (obj["TextAlign"] || obj["textAlignment"] || "");
    if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: ic, ConfigType: "text-align", Setting1: (valuex + ""), Setting2: "", ID: instance });

    valuex = (obj["TextVertical"] || obj["textVertical"] || "");
    if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: ic, ConfigType: "vertical-align", Setting1: (valuex + ""), Setting2: "", ID: instance });


    valuex = (obj["TextColor"] || obj["textColor"] || obj["color"] || "");
    if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: ic, ConfigType: "color", Setting1: (valuex + ""), Setting2: "", ID: instance });

    valuex = (obj["TextDecoration"] || obj["underline"] || "");
    if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: ic, ConfigType: "text-decoration", Setting1: (valuex + ""), Setting2: "", ID: instance });

    valuex = (obj["backgroundColor"] || "");
    if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: ic, ConfigType: "background-color", Setting1: (valuex + ""), Setting2: "", ID: instance });

    var varloopindex = 1;
    if (ic == "") {
        ic = 0;
        varloopindex = spread.ColumnConfig.length;
    } else {
        ic = parseInt(ic);
    }
    for (var i = 0; i < varloopindex; i++) {
        var valueXC = "";
        valueXC = "borderWidthBottom"; valuex = (obj[valueXC] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: (ic + ""), ConfigType: valueXC, Setting1: (valuex + ""), Setting2: "", ID: instance });
        valueXC = "borderColorBottom"; valuex = (obj[valueXC] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: (ic + ""), ConfigType: valueXC, Setting1: (valuex + ""), Setting2: "", ID: instance });
        valueXC = "borderStyleBottom"; valuex = (obj[valueXC] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: (ic + ""), ConfigType: valueXC, Setting1: (valuex + ""), Setting2: "", ID: instance });

        valueXC = "borderWidthTop"; valuex = (obj[valueXC] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: (ic + ""), ConfigType: valueXC, Setting1: (valuex + ""), Setting2: "", ID: instance });
        valueXC = "borderColorTop"; valuex = (obj[valueXC] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: (ic + ""), ConfigType: valueXC, Setting1: (valuex + ""), Setting2: "", ID: instance });
        valueXC = "borderStyleTop"; valuex = (obj[valueXC] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: (ic + ""), ConfigType: valueXC, Setting1: (valuex + ""), Setting2: "", ID: instance });

        valueXC = "borderWidthLeft"; valuex = (obj[valueXC] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: (ic + ""), ConfigType: valueXC, Setting1: (valuex + ""), Setting2: "", ID: instance });
        valueXC = "borderColorLeft"; valuex = (obj[valueXC] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: (ic + ""), ConfigType: valueXC, Setting1: (valuex + ""), Setting2: "", ID: instance });
        valueXC = "borderStyleLeft"; valuex = (obj[valueXC] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: (ic + ""), ConfigType: valueXC, Setting1: (valuex + ""), Setting2: "", ID: instance });

        valueXC = "borderWidthRight"; valuex = (obj[valueXC] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: (ic + ""), ConfigType: valueXC, Setting1: (valuex + ""), Setting2: "", ID: instance });
        valueXC = "borderColorRight"; valuex = (obj[valueXC] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: (ic + ""), ConfigType: valueXC, Setting1: (valuex + ""), Setting2: "", ID: instance });
        valueXC = "borderStyleRight"; valuex = (obj[valueXC] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: ix, ColumnNumber: (ic + ""), ConfigType: valueXC, Setting1: (valuex + ""), Setting2: "", ID: instance });
        ic++;
    }




    // fow column only
    if (ix == "") {
        ic = parseInt(ic);

        valuex = (obj["width"] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: "", ColumnNumber: (ic - 1) + "", ConfigType: "ColumnWidth", Setting1: (valuex + ""), Setting2: "", ID: instance });

        valuex = (obj["dataType"] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: "", ColumnNumber: (ic) + "", ConfigType: "dataType", Setting1: (valuex + ""), Setting2: "", ID: instance });

        valuex = (obj["Precision"] || "");
        if (valuex != "") JsonDataConfig.push({ RowNumber: "", ColumnNumber: (ic) + "", ConfigType: "Precision", Setting1: (valuex + ""), Setting2: "", ID: instance });


    }
}

//loadSpread Dataloop
function func_CreateConfig(datax, conid, instanceID, totalcount, index, perpage, sheetno) {

    console.log("conid:" + conid + " |instanceID: " + instanceID + " |totalcount: " + totalcount + " |index: " + index + " |perpage: " + perpage + " |sheetno: " + sheetno);
    //if (sheetno + "" == "2") {
    //    console.log("AAAAA:" + conid + " | " + instanceID + " | " + totalcount + " | " + index + " | " + perpage + " | ##" + sheetno);
    //    alert(sheetno);
    //}

    var mbook = P8DataList[conid];

    if ((index > 1 && sheetno == 1) || (index >= 1 && sheetno >= 2)) {
        var baseindex = ((index - 1) * perpage);
        var name = mbook[0].sheet.Sheet[sheetno - 1].ColumnConfig;
        var obj = mbook[0].sheet.Sheet[sheetno - 1].Data;

        for (var i = 0; i < datax.length; i++) {
            for (var ic = 0; ic < name.length; ic++) {

                var data = datax[i][name[ic]["name"]];
                if (data == undefined) data = "";
                obj[baseindex + i][name[ic]["name"]].value = data;

            }
        }
    }


    //return;
    if (totalcount > (index * perpage)) {
        nwParameter_Add("conid", conid);
        nwParameter_Add("InstanceID", instanceID);
        nwParameter_Add("totalcount", totalcount);
        nwParameter_Add("index", index);
        nwParameter_Add("perpage", perpage);
        nwParameter_Add("sheetno", sheetno);

        nwLoading_Start("actLoadSpreadPageData", crLoadingHTML);
        //paramencrypt =false;
        func_ActionDriven("actLoadSpreadPageData", false, crSTDLnk);


    } else {
        setTimeout(function () {
            try { p8Spread_DataBindDone(conid) } catch (exx) { }
        }, 100);
    }
}



function nwParameter_Add_Table(nwobject, withrownum) {
    var tempID = nwLib.nwTempTable_CheckIfExist(nwobject);
    var _withrownum = true;

    if (_withrownum != undefined) _withrownum = withrownum;


    if (tempID != undefined && tempID != "") {
        nwParameter_Add_Table_nwGrid(nwobject, true, _withrownum);
    }
    else
        nwParameter_Add_Table_nwGrid(nwobject, false, _withrownum);
}


function nwParameter_Add_Table_nwGrid(nwobject, isNormal, _withrownum) {
    var strName = "";
    var strValuea = "";
    var strtempID = "";

    if (_withrownum == undefined) _withrownum = true;

    var xcounter = 0;
    if (isNormal)
        xcounter = 1;
    else
        xcounter = $(nwobject + ' ' + '.nwGrid').length;

    //alert(nwobject + " \n\n " + xcounter);

    var AZtempobj;
    var tempobj;
    var tablecontent = "";
    for (var i = 0; i < xcounter; i++) {
        tablecontent = "";
        strtempID = "";

        if (isNormal) {
            nwobject = nwTempTable_GetTableID(nwobject);
            tempobj = $("#" + nwobject);
        }
        else
            tempobj = $(nwobject + ' ' + '.nwGrid:eq(' + i + ')');


        AZtempobj = tempobj;

        strtempID = tempobj.parent().attr('id');
        var trcount = 0;
        var xstartindex = 1;
        var xstartindexTD = 0;
        var xid = $(tempobj).attr("id");
        if (isNormal) {

            trcount = $('#' + xid + ' > tbody > tr').length;

            // alert($('#' + xid + ' > tbody > tr').html() + "@" + $('#' + xid + '').find(".tblGridBody ").html() );
            if ($('#' + xid + ' > tbody > tr').html() == undefined && $('#' + xid + '').find(".tblGridBody").html() != undefined) {
                xid = $('#' + xid + ' .tblGridBody').attr("id");
                trcount = $('#' + xid + '  > tbody >  tr').length;

            }
            xstartindex = 0;

        }
        else {

            xid = tempobj.find('.tblGridBody').attr("id");
            trcount = tempobj.find('.tblGridBody >tbody >  tr').length;
            //trcount =$('#'+ xid +' > tbody > tr').length;
            xstartindex = 0;
        }


        if (_withrownum == false) {
            xstartindexTD = 1;
        }

        //console.log(trcount + " angelo");
        // alert(trcount +" xcounter||:" + xid);


        for (var i2 = xstartindex; i2 < trcount; i2++) {

            tablecontent += "#@aag@#";
            var temptrobj = $('#' + xid + '>tbody>tr:eq(' + i2 + ')'); //tempobj.find('tbody tr:eq(' + i2 + ')');
            var tdcount = $('#' + xid + '>tbody>tr:eq(' + i2 + ')>td').length;; // temptrobj.find('td').length;
            var temptrvalue = "";
            for (i3 = xstartindexTD; i3 < tdcount; i3++) {
                var temptdobj = $('#' + xid + '>tbody>tr:eq(' + i2 + ')>td:eq(' + i3 + ')') //temptrobj.find('td:eq(' + i3 + ')');
                var tempvalue = "";
                temptrvalue += "#aag#";

                var elementType = $(temptdobj).children().prop('tagName'); /// check type var is_element_input = $(this).is("input"); //true or false
                var elementTyper = (elementType + "").toLowerCase();

                if ($(temptdobj).hasClass("nwHTML")) {
                    tempvalue = $(temptdobj).html();
                } else {
                    if (elementTyper == "input") {
                        var xtempstr = $(temptdobj).children().attr("type");
                        if (xtempstr == "checkbox")
                            tempvalue = $(temptdobj).children().prop("checked");
                        else if (xtempstr == "radio")
                            tempvalue = $(temptdobj).children().prop("checked");
                        else tempvalue = $(temptdobj).children().val();
                    }
                        //if (elementTyper == "input") tempvalue = $(temptdobj).children().val();
                    else if (elementTyper == "textarea") tempvalue = $(temptdobj).children().val();
                    else if (elementTyper == "select") tempvalue = $(temptdobj).children().val();
                    else if (elementTyper == "button") tempvalue = $(temptdobj).children().text();
                    else if (elementTyper == "undefined" || elementType == undefined) tempvalue = $(temptdobj).text();
                    else {
                        tempvalue = $(temptdobj).children().text();
                    }
                }

                if (tempvalue != undefined) tempvalue = convertValue(tempvalue);

                temptrvalue += tempvalue;

            }
            tablecontent += temptrvalue.substring(5);
        }
        //  alert(nwobject + "@@@"+ strtempID+ "\n\n" + tablecontent);
        tablecontent = tablecontent.substring(7);

        var AZstrtempID = "";


        if (isNormal) {
            strName += "#@#" + nwobject; AZstrtempID = nwobject;
        }
        else {
            strName += "#@#" + strtempID; AZstrtempID = strtempID;
        }

        if ($(AZtempobj).find("div.nwGrid").attr("id") != undefined)
            AZtempobj = $(AZtempobj).find("div.nwGrid");


        strValuea += "#@#" + tablecontent + "X-WolverineAAG" + AZstrtempID;

        if (_withrownum == false) {
            strName += "#@#nwgrid_nwdeletecolumn_" + AZstrtempID;
            strValuea += "#@#" + "false";
        }

        strName += "#@#nwgrid_nwpagerdataeditable_" + AZstrtempID;
        strValuea += "#@#" + $(AZtempobj).attr("nwpagerdataeditable");

        strName += "#@#nwgrid_nwinstance_" + AZstrtempID;
        strValuea += "#@#" + $(AZtempobj).attr("nwinstance");

        strName += "#@#nwgrid_nwpager_" + AZstrtempID;
        strValuea += "#@#" + $(AZtempobj).attr("nwpager");

        strName += "#@#nwgrid_nwpagercount_" + AZstrtempID;
        strValuea += "#@#" + $(AZtempobj).attr("nwpagercount");

        strName += "#@#nwgrid_nwpagerindex_" + AZstrtempID;
        strValuea += "#@#" + $(AZtempobj).attr("nwpagerindex");


    }
    if (strParameter.replace(" ", "") == "") strName = strName.substring(3);
    if (strValue.replace(" ", "") == "") strValuea = strValuea.substring(3);
    //alert(strName); alert(strValuea);
    strParameter += strName;
    strValue += strValuea;
}

function get_parameters_default() {

    if (crParaObj == "aagnone") { return; }
    var tempcrParaObj = crParaObj; //alert(crParaObj);

    var nwobject = new Array(); nwobject = crParaObj.split(",");
    var xcount = nwobject.length;
    for (var i = 0; i < xcount; i++) {
        var tempr = nwobject[i];
        //if (tempr.replace(" ", "") != "")
        get_parameters_defaultF(tempr);
    }
    // alert(strParameter);
}

function get_parameters_defaultF(nwobject) {
    var strName = "";
    var strValuea = "";
    var strtempID = "";



    var elementType = $(nwobject).prop('tagName'); /// check type var is_element_input = $(this).is("input"); //true or false
    var elementTyper = (elementType + "").toLowerCase();



    if (elementTyper == "input") {
        var xtempstr = $(nwobject + ' ' + 'input:eq(' + i + ')').attr('type');
        if (xtempstr == "radio" ||
       xtempstr == "checkbox"
         ) {
            if ($(nwobject + ' ' + 'input:eq(' + i + ')').is(":checked")) strValuea += "#@#" + "true";
            else
                strValuea += "#@#" + "false";
        }
        else strValuea += "#@#" + convertValue($(nwobject + ' ' + 'input:eq(' + i + ')').val());
    }
    else if (elementTyper == "select") {
        strName += "#@#" + $(nwobject).attr("id");
        strValuea += "#@#" + convertValue($(nwobject).val());
    }
    else if (elementTyper == "textarea") {
        strName += "#@#" + $(nwobject).attr("id");
        strValuea += "#@#" + convertValue($(nwobject).val());
    }
    /// if container



    // var xcounter = $(nwobject + ' ' + 'input').length; //old
    //var xcounter = $(nwobject + ' ' + 'input').not(".nwGrid " + nwobject + " input").length;
    var xcounter = $(nwobject + ' input:not(.nwGrid input)').length;
    //$("input").not(".nwGrid input").length
    for (var i = 0; i < xcounter; i++) {

        //strtempID = $(nwobject + ' ' + 'input:eq(' + i + ')').attr("id");
        strtempID = $(nwobject + ' input:not(.nwGrid input):eq(' + i + ')').attr("id");

        if (strtempID != "__VIEWSTATE") {
            strName += "#@#" + strtempID;
            if ($(nwobject + ' input:not(.nwGrid input):eq(' + i + ')').attr('type') == "radio" ||
                $(nwobject + ' input:not(.nwGrid input):eq(' + i + ')').attr('type') == "checkbox"
         ) {
                if ($(nwobject + ' input:not(.nwGrid input):eq(' + i + ')').is(":checked")) strValuea += "#@#" + "true";
                else //if($('input:eq(' + i + ')').attr('checked', false)) 
                    strValuea += "#@#" + "false";
            }
            else strValuea += "#@#" + convertValue($(nwobject + ' input:not(.nwGrid input):eq(' + i + ')').val());
        }

    }

    var xcounter = $(nwobject + ' select:not(.nwGrid select)').length;
    for (var i = 0; i < xcounter; i++) {
        strName += "#@#" + $(nwobject + ' select:not(.nwGrid select):eq(' + i + ')').attr("id");
        strValuea += "#@#" + convertValue($(nwobject + ' select:not(.nwGrid select):eq(' + i + ')').val());
    }

    var xcounter = $(nwobject + ' textarea:not(.nwGrid textarea)').length;
    for (var i = 0; i < xcounter; i++) {
        strName += "#@#" + $(nwobject + ' textarea:not(.nwGrid textarea):eq(' + i + ')').attr("id");
        strValuea += "#@#" + convertValue($(nwobject + ' textarea:not(.nwGrid textarea):eq(' + i + ')').val());
    }


    var tempobj;

    if (nwIsGetGridData == true) {
        var xcounter1 = $(nwobject + ' ' + '.P8Grid').length;
        for (var i = 0; i < xcounter1; i++) {
            try {
                tempobj = $(nwobject + ' ' + '.P8Grid:eq(' + i + ')');
                var gridids = tempobj.attr("id");
                nwParameter_Add_Spread(P8DataList[gridids][0].sheet)
            } catch (err) {
            }
        }
    }
    if (nwIsGetSpreadData == true) {
        var xcounter1 = $(nwobject + ' ' + '.P8Spread').length;
        for (var i = 0; i < xcounter1; i++) {
            try {
                tempobj = $(nwobject + ' ' + '.P8Spread:eq(' + i + ')');
                var gridids = tempobj.attr("id");
                nwParameter_Add_Spread(P8DataList[gridids][0].sheet)
            } catch (err) {
            }
        }
    }


    var xcounter = $(nwobject + ' ' + '.nwGrid').length;
    var tablecontent = "";
    if (DataAutoComputeGrid == false) xcounter = 0; // make no nwGrid to be load


    for (var i = 0; i < xcounter; i++) {
        tablecontent = "";
        strtempID = "";
        tempobj = $(nwobject + ' ' + '.nwGrid:eq(' + i + ')');
        var tempobjGrid = tempobj;
        strtempID = tempobj.parent().attr('id');
        var trcount = tempobj.find(crParaObj + ' ' + '.tblGridBody tr').length;

        //console.log(trcount + " angelo");
        // if(tempobj.find("table.tblGridBody tbody") != undefined)
        tempobj = tempobj.find("table.tblGridBody tbody");

        for (var i2 = 0; i2 < trcount; i2++) {

            tablecontent += "#@aag@#";
            var temptrobj = tempobj.find('tr:eq(' + i2 + ')');
            var tdcount = temptrobj.find('td').length;
            var temptrvalue = "";
            for (i3 = 1; i3 < tdcount; i3++) {
                var temptdobj = temptrobj.find('td:eq(' + i3 + ')');
                var tempvalue = "";
                temptrvalue += "#aag#";
                var elementType = $(temptdobj).children().prop('tagName'); /// check type var is_element_input = $(this).is("input"); //true or false
                var elementTyper = (elementType + "").toLowerCase();
                if (elementTyper == "input") {
                    var xtempstr = $(temptdobj).children().attr("type");
                    if (xtempstr == "checkbox")
                        tempvalue = $(temptdobj).children().prop("checked");
                    else if (xtempstr == "radio")
                        tempvalue = $(temptdobj).children().prop("checked");
                    else tempvalue = $(temptdobj).children().val();

                }
                else if (elementTyper == "textarea") tempvalue = $(temptdobj).children().val();
                else if (elementTyper == "select") tempvalue = $(temptdobj).children().val();
                else if (elementTyper == "button") tempvalue = $(temptdobj).children().text();
                else if (elementTyper == "undefined" || elementType == undefined) tempvalue = $(temptdobj).text();
                else tempvalue = $(temptdobj).children().text();


                if (tempvalue != undefined) tempvalue = convertValue(tempvalue);

                temptrvalue += tempvalue;

            }
            tablecontent += temptrvalue.substring(5);

        }
        tablecontent = tablecontent.substring(7);
        strName += "#@#" + strtempID;
        strValuea += "#@#" + tablecontent + "X-WolverineAAG" + strtempID;



        strName += "#@#nwgrid_nwpagerdataeditable_" + strtempID;
        strValuea += "#@#" + $(tempobjGrid).attr("nwpagerdataeditable");


        strName += "#@#nwgrid_nwinstance_" + strtempID;
        strValuea += "#@#" + $(tempobjGrid).attr("nwinstance");

        strName += "#@#nwgrid_nwpager_" + strtempID;
        strValuea += "#@#" + $(tempobjGrid).attr("nwpager");

        strName += "#@#nwgrid_nwpagercount_" + strtempID;
        strValuea += "#@#" + $(tempobjGrid).attr("nwpagercount");

        strName += "#@#nwgrid_nwpagerindex_" + strtempID;
        strValuea += "#@#" + $(tempobjGrid).attr("nwpagerindex");
    }


    if (strParameter.replace(" ", "") == "") strName = strName.substring(3);
    if (strValue.replace(" ", "") == "") strValuea = strValuea.substring(3);
    strParameter += strName;
    strValue += strValuea;


    //if (strParameter!="") strParameter += "#@#isNewRow"; strValue += "#@#" + isNewRow;
}


function convertValue(tempvalue) {
    try {
        tempvalue = (tempvalue + "").replaceAll("#@aag@#", "^aagDataSplit^");
        tempvalue = (tempvalue + "").replaceAll("#aag#", "^aagRowSplit^");

        tempvalue = (tempvalue + "").replaceAll("#@#", "^aagChardSplit^");
        tempvalue = (tempvalue + "").replaceAll("#", "^aagSharp^");
        tempvalue = (tempvalue + "").replaceAll("@", "^aagAt^");
    } catch (err) { }

    return tempvalue;
}

var isbindNumfocus = false;
function LoadToolBoxFunc(isInit) {
    $(function () {

        //$(document).on("click", "div.noah-webui-Toolbox-Item", function() {
        $("div.btn-tb-action").click(function () {
            var verID = $(this).attr("id");

            if ($(":focus") == $('#noah-webui-default-currentRec') || isbindNumfocus == true)
                return;

            if (jQuery(this).hasClass('noah-webui-disabled')) return;
            var parent = this.parentNode;
            var recenum = 0;

            verID = $(this).index('.btn-tb-action');
            try {
                if ($(this).hasClass("btn-tb-new")) { verID = 0; _ToolBoxClicked = "1"; crlateststdbutton = "New"; }
                else if ($(this).hasClass("btn-tb-save")) { verID = 1; _ToolBoxClicked = "2"; crlateststdbutton = "Save"; }
                else if ($(this).hasClass("btn-tb-delete")) { verID = 2; _ToolBoxClicked = "3"; crlateststdbutton = "Delete"; }
                else if ($(this).hasClass("btn-tb-refresh")) {
                    verID = 3;
                    crinquireval = "";
                }
                else if ($(this).hasClass("btn-tb-inquire")) verID = 4;
                else if ($(this).hasClass("btn-tb-process")) { verID = 5; _ToolBoxClicked = "4"; crlateststdbutton = "Process"; }
                else if ($(this).hasClass("btn-tb-import")) { verID = 6; _ToolBoxClicked = "6"; crlateststdbutton = "Import"; }
                else if ($(this).hasClass("btn-tb-export")) { verID = 7; _ToolBoxClicked = "5"; crlateststdbutton = "Export"; }
                else if ($(this).hasClass("btn-tb-print")) verID = 8;
                else if ($(this).hasClass("btn-tb-closing")) verID = 9;
                else if ($(this).hasClass("btn-tb-search")) verID = 10;
            } catch (err) { }

            recenum = 0;
            var verIDn = verID + "";
            var isContinue = true;

            try { isContinue = func_ToolboxClient(verIDn, recenum); }
            catch (err) { }
            if (isContinue) {

                func_Toolbox(verIDn, recenum);
            }

            _ToolBoxClicked = "";
            DataAutoComputeGrid = true;


            return false;
        });
        if (isInit) func_reloadinit();
    });
}
LoadToolBoxFunc(true);

function func_ToolBox_Customize(varIndex, varRecNum) {
    var isContinue = true;
    crToolIndex = varIndex; crToolRowNum = varRecNum;
    try { isContinue = func_ToolboxClient(varIndex, varRecNum); }
    catch (err) { }
    if (isContinue) func_Toolbox(varIndex, varRecNum);
}

function func_ToolBox_Continue() {
    func_Toolbox(crToolIndex, crToolRowNum);
}


function func_reloadinit() {
    var isContinue = true;

    nwLoading_Start("nwFirstLoadDataAzie", crLoadingHTML,"","Opening");
    try {
        isContinue = func_Reload();

        if (crnwTagSingleBind == true)
            $("#noah-webui-default-Refresh").visible(false);
    }
    catch (err) { }
    return isContinue;
}

var nkLoadingText = "Loading";
function func_ToolboxClient(indef, enume) {
    var isContinue = true;

    //if (crToolboxNavigator == true) return false;

    var isValue = "1";
    try {
        if (nwToolBoxConfig[indef] != undefined)
            isValue = nwToolBoxConfig[indef];
    }
    catch (err) { }

    if (nwSec == true) isValue = "1";
    var ltext = "Loading";
    
    if (indef == 1) ltext = "Saving";
    else if (indef == 2) ltext = "Deleting";
    else if (indef == 5) ltext = "Processing";
    else if (indef == 7) ltext = "Exporting";
    nkLoadingText = ltext;


    nwLoading_Start("nwaagToolBox", crLoadingHTML, "", ltext);

    if (indef == 0) { if (isValue == "1") { DataAutoComputeGrid = false; crnwcodevalue = ""; func_ClearObjectsSysValue(); func_ClearFooter(); isNewRow = true; isContinue = func_ToolboxADD(indef, enume); } else { isContinue = false; } }
    else if (indef == 1) { if (isValue == "1") { isContinue = func_ToolboxSave(indef, enume); } else { isContinue = false; } }
    else if (indef == 2) { if (isValue == "1") { isContinue = func_ToolboxDelete(indef, enume); crnwcodevalue = ""; func_ToolboxData } else { isContinue = false; } }
    else if (indef == 3) { if (isValue == "1") { func_ClearObjectsSysValue(); DataAutoComputeGrid = false; isContinue = func_ToolboxRefresh(indef, enume); isRefresh = isContinue; isNewRow = false; } else { isContinue = false; } }
    else if (indef == 4) { if (isValue == "1") { DataAutoComputeGrid = false; isContinue = func_ToolboxInquire(indef, enume); if (isContinue) lookUp_inquire(); isContinue = false; } else { isContinue = false; } }
    else if (indef == 5) { if (isValue == "1") { isContinue = func_ToolboxProcess(indef, enume); } else { isContinue = false; } }
    else if (indef == 6) { if (isValue == "1") { DataAutoComputeGrid = false; isContinue = func_ToolboxImport(indef, enume); } else { isContinue = false; } }
    else if (indef == 7) { if (isValue == "1") { DataAutoComputeGrid = false; isContinue = func_ToolboxExport(indef, enume); } else { isContinue = false; } }
    else if (indef == 8) { if (isValue == "1") { isContinue = func_ToolboxPrint(indef, enume); } else { isContinue = false; } }
    else if (indef == 9) { if (isValue == "1") { isContinue = func_ToolboxClosing(indef, enume); DataAutoComputeGrid = false; } else { isContinue = false; } }
    else if (indef == 10) { if (isValue == "1") { toolbox_Search(); isContinue = func_ToolboxSearch(indef, enume); DataAutoComputeGrid = false; } else { isContinue = false; } }

    if (isContinue == false || indef == 4) nwLoading_End("nwaagToolBox");

    return isContinue;
}
function func_ClearFooter() {
    $('#nwtxt_RecUser').html('&nbsp;');
    $('#nwtxt_RecDate').html('&nbsp;');
    $('#nwtxt_ModUser').html('&nbsp;');
    $('#nwtxt_ModDate').html('&nbsp;');
}
function func_ClearObjectsSysValue() {
    $("input.idval").css("border-color", "");
    $("input.descval").css("border-color", "");
}

var DataAutoCompute = true;
var DataAutoComputeGrid = true;
function func_ToolboxDataAuto(isdata) {
    if (isdata == undefined) DataAutoCompute = true;
    else DataAutoCompute = isdata;

}





// for checking if focus input are on grid
// input,textarea   focus
$(document).on("focus", ".nwGrid input,.nwGrid  textarea,.nwGrid  select,.nwGrid  button", function () {
    if ($(this).parents(".nwGrid").attr("id") == undefined) {
        if ($(this).parents("#menuCreatorContainer").attr("id") == undefined)
            $('.nwGrid').removeClass("nwGridSelectedAAG");
    }
    else {
        if ($(this).parents("#menuCreatorContainer").attr("id") == undefined)
            $('.nwGrid').removeClass("nwGridSelectedAAG");
        $(this).parents(".nwGrid").addClass("nwGridSelectedAAG");
    }
    // currentFocusObj = this;

});

$.fn.nwToolbox = function (VerID) {
    // alert(button+ "-"+type+ "-"+data);
    var verID = $(this).attr("id");
    return this;
};

$.fn.bindingNavigator = function (VerID) {
    var verID = $(this).attr("id");
    var obj = $(this).find("#noah-webui-Toolbox-BindingNavigator");
    return obj;
};

$.fn.bindingNew = function (VerID) {
    var verID = $(this).attr("id");
    var obj = $(this).find("#noah-webui-default-New");
    return obj;
};
$.fn.bindingSave = function (VerID) {
    var verID = $(this).attr("id");
    var obj = $(this).find("#noah-webui-default-Save");
    return obj;
};
$.fn.bindingDelete = function (VerID) {
    var verID = $(this).attr("id");
    var obj = $(this).find("#noah-webui-default-Delete");
    return obj;
};
$.fn.bindingRefresh = function (VerID) {
    var verID = $(this).attr("id");
    var obj = $(this).find("#noah-webui-default-Refresh");
    return obj;
};
$.fn.bindingInquire = function (VerID) {
    var verID = $(this).attr("id");
    var obj = $(this).find("#noah-webui-default-Inquire");
    return obj;
};
$.fn.bindingProcess = function (VerID) {
    var verID = $(this).attr("id");
    var obj = $(this).find("#noah-webui-default-Process");
    return obj;
};
$.fn.bindingImport = function (VerID) {
    var verID = $(this).attr("id");
    var obj = $(this).find("#noah-webui-default-Import");
    return obj;
};
$.fn.bindingExport = function (VerID) {
    var verID = $(this).attr("id");
    var obj = $(this).find("#noah-webui-default-Export");
    return obj;
};
$.fn.bindingPrint = function (VerID) {
    var verID = $(this).attr("id");
    var obj = $(this).find("#noah-webui-default-Print");
    return obj;
};
$.fn.bindingSearch = function (VerID) {
    var verID = $(this).attr("id");
    var obj = $(this).find("#noah-webui-default-Search");
    return obj;
};



$.fn.visible = function (data) {
    var verID = $(this).attr("id");
    var obj = false;
    obj = data;
    if (obj == undefined) {
        if ($(this).css("display") == "none") obj = false;
        else obj = true;
    }
    else {
        if (obj == true) {
            $(this).show();
            $(this).removeClass("noah-webui-hidden");
        }
        else {
            $(this).hide();
            $(this).addClass("noah-webui-hidden");
        }
    }


    return obj;
};

jQuery.fn.outerHTML = function (s) {
    return s
    ? this.before(s).remove()
    : jQuery("<p>").append(this.eq(0).clone()).html();
};

$.fn.enable = function (data, isAll) {
    var verID = $(this).attr("id");
    var obj = false;
    obj = data;
    var xClass = "noah-webui-disabled";

    if ($(this).hasClass('lookups'))
        xClass = "adisabled";

    if (obj == undefined) {
        if ($(this).hasClass(xClass)) obj = false;
        else obj = true;
    }
    else {
        if (obj == true) {
            $(this).removeClass(xClass);

        }
        else $(this).addClass(xClass);

        if ($(this).hasClass('lookups')) {
            $(this).find("input.idval").prop("disabled", !obj);
            $(this).find("input.idval").attr("ondrop", obj);

        }

        else if ($(this).hasClass('rdo')) {
            if (obj == true) 
                $(this).parent().find("label.lbl-rdo").removeClass(xClass);
            else
                $(this).parent().find("label.lbl-rdo").addClass(xClass);

        }

    }



    if (obj == false) $(this).prop("disabled", true);
    else $(this).prop("disabled", false);

    if ($(this).hasClass('lookups'))
        ;
    else {
        func_nwChildEnable(this, obj, "input", isAll);
        func_nwChildEnable(this, obj, "button", isAll);
        func_nwChildEnable(this, obj, "textarea", isAll);
        func_nwChildEnable(this, obj, "select", isAll);
    }
    return obj;
};


// HI
function func_nwChildEnable(ver, objBool, objType, isAll) {
    var xcounter = 0;
    try {
        xcounter = parseInt($(ver).find(objType).length);
    }
    catch (err) { }

    for (var i = 0; i < xcounter; i++) {
        var xdisabled = $(ver).find(objType + ":eq(" + i + ")").attr("nwdisabled");
        if (xdisabled == undefined) xdisabled = $(ver).find(objType + ":eq(" + i + ")").prop("disabled");

        if (objBool == true) {


            if ((xdisabled + "") == "false" || (isAll == true && isAll != undefined))
                $(ver).find(objType + ":eq(" + i + ")").prop("disabled", false);
            else
                $(ver).find(objType + ":eq(" + i + ")").prop("disabled", true);


            $(ver).find(objType + ":eq(" + i + ")").attr("nwdisabled", xdisabled);
        }
        else {
            $(ver).find(objType + ":eq(" + i + ")").prop("disabled", true);
            $(ver).find(objType + ":eq(" + i + ")").attr("nwdisabled", xdisabled);
        }

    }
}

var Parser = {
    ParseInt: function (value, errorValue) {
        try {
            errorValue = parseInt(errorValue);
        } catch (err) { errorValue = 0; }
        try {
            value = parseInt(value);
        } catch (err) {
            value = errorValue;
        }
        return value;
    },
    ParseFloat: function (value, errorValue) {
        try {
            errorValue = parseFloat(errorValue);
        } catch (err) { errorValue = 0.0; }
        try {
            value = parseFloat(value);
        } catch (err) {
            value = errorValue;
        }
        return value;
    }
}



function func_aagCallMain() {
    //alert(nwDevMode);
    //alert(nwToolBoxConfig);
    if (nwDevMode == false) return;
    //return;

    var xcounter = nwToolBoxConfig.length;
    for (var i = 0; i < xcounter; i++) {
        nwToolBoxConfig[i] = "1";
    }


    if (nwDevMode == true) $('#noah-webui-Toolbox .noah-webui-Toolbox-Item').removeClass('noah-webui-disabled-P');
}

function func_getToolboxValidation() {
    nwParameter_Add("aagTB_primaryKey", crToolInquireKey);
    nwParameter_Add("aagTB_primaryKeyValue", crinquireval);
    nwParameter_Add("aagTB_MenuID", crLnkGateKey);
    nwParameter_Add("aagTB_recuser", $("#nwtxt_RecUser").attr("nwvalue"));
    nwParameter_Add("aagTB_recdate", $("#nwtxt_RecDate").attr("nwvalue"));
    nwParameter_Add("aagTB_moduser", $("#nwtxt_ModUser").attr("nwvalue"));
    nwParameter_Add("aagTB_moddate", $("#nwtxt_ModDate").attr("nwvalue"));
    nwParameter_Add("aagTB_status", $("#nwtxt_RecUser").attr("nwvaluestatus"));
}

function func_Toolbox(indef, enume) {

    if (indef == 1 || indef == 2 || indef == 5) {
        if (indef == 1 && isNewRow == true) {
            crinquireval = "";
        }
        func_getToolboxValidation();
    }

    if (isDataRequired == true && DataAutoCompute == true) {
        get_parameters_default();
    }
    else {
        if (ToolBoxGetData == true && DataAutoCompute == true) {
            get_parameters_default();
        }
    }


    var inder = "" + indef;
    var enumr = "" + enume;
    strParameter += "#@#isNewRow"; strValue += "#@#" + isNewRow;
    func_nwConvertParaValue();

    var data = { strMethod: inder, poz: enumr, strParameter: p8Encrypted(strParameter), strValue: p8Encrypted(strValue) };
    var rurl = crLnk + "?nwmethod=func_Toolbox"; //"forms_method/noah_maintenance.aspx/func_Toolbox";

    //ARM # EDIT: 10-24-2017
    var xlogid = "";
    if (indef == 0 || indef == 1 || indef == 2 || indef == 5 || indef == 7 || indef == 6) {
        if (indef == 1) { xlogid = "2"; xLOG_toolboxitem = "save"; }
        else if (indef == 2) { xlogid = "3"; xLOG_toolboxitem = "delete"; }
        else if (indef == 5) { xlogid = "4"; xLOG_toolboxitem = "process"; }
        else if (indef == 7) { xlogid = "5"; xLOG_toolboxitem = "export"; }
        else if (indef == 6) { xlogid = "6"; xLOG_toolboxitem = "import"; }
        else if (indef == 0) { xlogid = "1"; xLOG_toolboxitem = "new"; }
        _ToolBoxClicked = "";
        if (!_CustomizeLogs)
            SaveToLogs(xlogid, xLOG_menuitem, "", crSTDLnk);
        else {
            var xcustomremarks = "";

            try {
                xcustomremarks = func_SetRemarks(xLOG_toolboxitem, "");
            } catch (e) {

            }


            if (xcustomremarks == undefined || xcustomremarks == "undefined") {
                xcustomremarks = "";
            }

            SaveToLogs(xlogid, xLOG_menuitem, xcustomremarks, crSTDLnk);
        }
    }

    requestForm(data, rurl);

    DataAutoCompute = true;
    DataAutoComputeGrid = true;
}

function func_Toolbox_Clear() {
    func_GetBind_Clear("#noah-webui-Toolbox-Grid");
    xPrevXndex = -1;
    $('#noah-webui-Toolbox-BindingNavigator .BN-record span').text('of 0');
    $('#noah-webui-Toolbox-BindingNavigator #noah-webui-default-currentRec').val('0');

}

function func_ToolboxData(objectName, met) {

    nwParameter_Add('codevalue', crnwcodevalue);
    if (isDataRequired == true && ToolBoxGetData == true) {
        get_parameters_default();
    }
    //    if(crToolBoxType=="sv"){ 
    var objID = "#noah-webui-Toolbox-BindingNavigator";
    if (crToolBoxType == "sv") nwLoading_Start("nwaagToolBox", crLoadingHTML);
    var sss = func_GetBindCollection(objID);
    nwParameter_Add("BindCollection", sss);
    nwParameter_Add("rownum", 1);
    //  }
    nwParameter_Add("nwaagSessionID", baseSessionID);
    nwParameter_Add("nwaagPrimaryKeyvalue", crinquireval);

    func_nwConvertParaValue();


    var data = { tableName: objectName, getMethod: met, strParameter: p8Encrypted(strParameter), strValue: p8Encrypted(strValue) };
    var rurl = crLnk + "?nwmethod=getToolBoxData";
    requestForm(data, rurl);

    isNewRow = false;
    //crToolBoxType
}

function func_GetBindCollection(objID) {
    var tempr; var tempcrNaviID; var temprlin = "";
    var colbin = collection_TempG.length;

    for (var i = 0; i < colbin; i++) {
        tempr = collection_TempG[i].split("#@#");
        tempcrNaviID = tempr[i];

        if (objID == tempcrNaviID) {
            temprlin = tempr[1]; //.split("#aag#");//
            break;
        }
    }

    return temprlin;
}

function funct_LoadToolboxDataSV(sa, sc) {
    //   nwLoading_Start("nwaagToolBox",crLoadingHTML); 
    var tempr; var tempcrNaviID; var temprlin = "";
    var colbin = collection_TempG.length;
    var objID = "#noah-webui-Toolbox-BindingNavigator";

    temprlin = func_GetBindCollection(objID);


    nwParameter_Add("crToolInquireKey", crToolInquireKey);
    nwParameter_Add("BindCollection", temprlin);
    nwParameter_Add("nwaagTBName", "#noah-webui-Toolbox");
    nwParameter_Add("nwaagTBType", crToolBoxType);
    nwParameter_Add("nwaagSL", sa);
    nwParameter_Add("nwaagCon", sc);
    nwParameter_Add("nwaagSessionID", baseSessionID);
    nwParameter_Add("rownum", 1);

    nwParameter_Add("nwToolBoxConfigS", nwToolBoxConfigS);
    nwParameter_Add("nwToolBoxConfigC", nwToolBoxConfigC);
    nwParameter_Add("nwToolBoxConfigT", nwToolBoxConfigT);

    var standardCrLnk = crSTDLnk;
    func_Toolbox_Clear();
    func_ActionDriven("actLoadToolBox", false, standardCrLnk);
}

function func_ToolboxDataBat(tn, sa, sc, si, sb) {


    if (crToolBoxType == "sv") {
        funct_LoadToolboxDataSV(sa, sc);
        return;
    }
    else { }


    var data = { tableName: tn, sa: sa, sc: sc, si: si, sb: sb };
    var rurl = crLnk + "?nwmethod=getToolBoxDataRet";
    try { func_ToolboxDataLoaded(tn, si, sb); }
    catch (err) { }
    requestForm(data, rurl);
}
var xPrevXndex = -1;
function func_toolboxCountTotal() {
    if (crToolBoxType == "sv") {
        //        try { func_ToolboxNavigatorBind_Done();func_ToolboxNavigatorBind_DoneX(); }
        //        catch (err) { }
        return;
    }

    var xrow = $('#noah-webui-Toolbox-Grid tbody tr').length;
    $('#noah-webui-Toolbox-BindingNavigator .BN-record span').text('of ' + xrow);
    var xcval = $('#noah-webui-Toolbox-BindingNavigator #noah-webui-default-currentRec').val();


    if (parseInt(xrow) >= 0 && parseInt(xcval) <= 1) {

        if (parseInt(xrow) > 0) {
            $('#noah-webui-Toolbox-BindingNavigator #noah-webui-default-currentRec').val('1');
            func_GetBind("#noah-webui-Toolbox-BindingNavigator", "#noah-webui-Toolbox-Grid", 0);

            if (xPrevXndex < 0) {

                try { func_ToolboxNavigatorBind_Done(); func_ToolboxNavigatorBind_DoneX(); }
                catch (err) { }
                try { $('#aagLoadingNxSample.nwLoading').remove(); } catch (err) { }
                crToolboxNavigator = false;
            }
            xPrevXndex = parseInt(xcval);

            func_checkToolBox(parseInt(xrow), 1);
        }
        else if (parseInt(xrow) == 0) {
            $('#noah-webui-Toolbox-BindingNavigator #noah-webui-default-currentRec').val('0');
            try {
                func_ToolboxNavigatorBind_Empty();
            } catch (err) { }

        }
    }
}

function func_ToolboxDataRetst(isrefresh) {


    try { func_ToolboxDataLoaded(); }
    catch (err) { }

    var xval = $('#noah-webui-Toolbox-BindingNavigator .BN-record span').text().replace('of ', '');
    var xcval = $('#noah-webui-Toolbox-BindingNavigator #noah-webui-default-currentRec').val();

    if (xval != '0' && xcval == "0") {
        $('#noah-webui-Toolbox-BindingNavigator #noah-webui-default-currentRec').val('1');


        $('#noah-webui-Toolbox-BindingNavigator #noah-webui-default-next').removeClass('noah-webui-disabled');
        $('#noah-webui-Toolbox-BindingNavigator #noah-webui-default-last').removeClass('noah-webui-disabled');
    }
    else if (xval == "0") {
        $('#noah-webui-Toolbox-BindingNavigator .BN-button').addClass('noah-webui-disabled');

    }
    try { loc_LookupInquireGoto(crinquireval, isrefresh); }
    catch (err) { } //aagname
}

function toolbox_Search() {
    nwPopupForm_ShowModal("nwSearch");
    $("#nwSearchText").focus();
    $("#nwSearchText").val("");
}

function toolbox_SearchCheck() {
    //if (crnwTD == null) return;

    var xcolindex = crnwTD.index();
    var xrowindex = crnwTR.index();
    var xrowindexorig = parseInt(crnwTR.find("td:eq(0)").text().trim()); //crnwTR.index();
    var xcounter = crnwTR.length;
    var xText = $("#nwSearchText").val();
    var xTextOrig = xText;
    var xTextTemp = ""; var xidnex = -1;
    var isValid = false; var xadd = 1;
    if (xrowindex == 0) xadd = 1;
    else xadd = 0;

    //xcounter = 20;
    // xcounter = xrowindex
    xcounter = crnwTableCon.find(" .tblGridBody tr").length;

    xText = xText.toUpperCase();
    isValid = func_SearchCheckData(xText, xrowindex, xadd, xcounter, isValid, xcolindex);
    if (isValid == false && !(crnwTableCon.find(".nwgridctotal").text() > crnwTableCon.find(".nwgridcrindex").val()))
        isValid = func_SearchCheckData(xText, xrowindex, xadd, xcounter, isValid, xcolindex, (xrowindex + xadd));

    try {
        //  alert(isValid + " " + xTextTemp);
        if (isValid == false && crnwTableCon.find(".nwgridctotal").text() > crnwTableCon.find(".nwgridcrindex").val()) {
            //alert(xrowindexorig);
            nwParameter_Add("xText", xText);
            nwParameter_Add("xrowindexorig", xrowindexorig);
            nwParameter_Add("xcolindex", xcolindex);
            nwParameter_Add("crnwTableID", crnwTable.attr("id"));

            var standardCrLnk = crSTDLnk;
            grid_nwpageType = "1";
            func_nwGridPager(crnwTableCon.find(".nwgridcrindex"));
            // func_ActionDriven("", false, standardCrLnk);
            return false;
        }
    } catch (err) {
    }


    var frmTitle = $(crnwTD).attr("data-label") || "";
    nwPopupForm_HideModal("nwSearch");
    if (isValid == false)
        MessageBox("Cannot find :" + xTextOrig + "", frmTitle, "error", "#" + crnwTableCon.attr("id") + " input.nwgrid_SearchNext");
}
function func_SearchCheckData(xText, xrowindex, xadd, xcounter, isValid, xcolindex, z_xrowindex) {
    var xTextTemp;
    var isValid;
    var xstart = 0;
    var xend = 0;


    xadd = 0;

    if (z_xrowindex != undefined) {
        xstart = 0;
        xend = z_xrowindex;
    }
    else {
        xstart = xrowindex + xadd;
        xend = xcounter;
    }

    for (var i = xstart + 1; i < xend; i++) {


        var obj = crnwTableCon.find(" .tblGridBody tr:eq(" + i + ")"); //td:eq(" + xcolindex + ")
        // alert(obj.html() + " td:eq(" + xcolindex + ")");

        if (obj.find("td:eq(" + xcolindex + ")").css("display") == "none" || obj.find("td:eq(" + xcolindex + ")").css("visibility") == "hidden")
            continue;


        if (obj.find("td:eq(" + xcolindex + ") input").val() != undefined)
            xTextTemp = obj.find("td:eq(" + xcolindex + ") input").val();
        else if (obj.find("td:eq(" + xcolindex + ") textarea").val() != undefined)
            xTextTemp = obj.find("td:eq(" + xcolindex + ") textarea").val();
        else if (obj.find("td:eq(" + xcolindex + ") select").val() != undefined)
            xTextTemp = obj.find("td:eq(" + xcolindex + ") select").val();
            //        else if (obj.find("td:eq(" + xcolindex + ") button").text() != undefined)
            //            xTextTemp = obj.find("td:eq(" + xcolindex + ") button").text();
        else xTextTemp = obj.find("td:eq(" + xcolindex + ")").text();



        // xTextTemp = xTextTemp.replace(/ /g, '');
        xTextTemp = xTextTemp.toUpperCase();
        // console.log(xTextTemp + " - " + xText);

        if (xTextTemp.indexOf(xText) >= 0) {
            //console.log("pasok");

            crnwTD = crnwTable.find("tr:eq(" + i + ") td:eq(" + xcolindex + ")");
            crnwTR = crnwTable.find("tr:eq(" + i + ")");

            nwGrid_SetSelectedObjects(crnwTD);
            nwGrid_SetSelectedFunction();


            func_nwGridScrolling(40);

            isValid = true;
            xidnex = i;
            break;
        }


    }

    return isValid;
}



$(document).on("keypress", "#nwSearchText", function (e) {
    if (e.which == 13) {
        toolbox_SearchCheck();
    }
});
$(document).on("click", "#nwSearchBut", function (e) {
    toolbox_SearchCheck();
});

$(document).on("focus", "#noah-webui-default-currentRec", function (e) {
    try {
        var xcounter = $('#noah-webui-Toolbox-BindingNavigator .BN-record span').text().replace("of ", "");
        if (xcounter == "0") {
            $(this).blur();
            return false;
        }

        isbindNumfocus = true;
    } catch (err) { }

    noah_webui_default_currentRec = $(this).val();
});
$(document).on("blur", "#noah-webui-default-currentRec", function (e) {
    var xrow = $('#noah-webui-Toolbox-BindingNavigator .BN-record span').text().replace('of ').replace('undefined', '');
    if (($(this).val() == "" || ($(this).val() + "") == "NaN")) {
        $(this).val(noah_webui_default_currentRec); //return;
    }
    setTimeout(function () {
        isbindNumfocus = false;
    }, 400);
    func_ToolboxNavigatorInput(this, xrow); // crush

});
var noah_webui_default_currentRec = "";
$(document).on("keypress", "#noah-webui-default-currentRec", function (e) {

    var isval = $(this).parents(".noah-webui-Toolbox-BindingNavigator").hasClass('noah-webui-disabled');
    if (isval == true) return;

    var isContinue = true;
    var xrow = $('#noah-webui-Toolbox-BindingNavigator .BN-record span').text().replace('of ').replace('undefined', '');
    if (e.which == 13) {
        func_ToolboxNavigatorInput(this, xrow);
    }
});

function func_ToolboxNavigatorInput(ver, xrow) {
    var isContinue = true;
    crToolboxNavigator = true;
    if (($(ver).val() == "" || ($(ver).val() + "") == "NaN")) {
        $(ver).val(xrow); return;
    }

    var xcounter = $('#noah-webui-Toolbox-BindingNavigator .BN-record span').text().replace("of ", "");
    if (xcounter == "0") {
        //$(this).blur();
        return false;
    }

    try { isContinue = func_ToolboxNavigatorBind($(ver).val()); }
    catch (err) { isContinue = true; }
    if (isContinue) {
        func_checkToolBox(xrow, parseInt($(ver).val()));

        $('#noah-webui-default-currentRec').val(parseInt($(ver).val()));
        func_GetBind("#noah-webui-Toolbox-BindingNavigator", "#noah-webui-Toolbox-Grid", parseInt($(ver).val()) - 1);
        if (crToolBoxType == "sv") {
        }
        else {

            try { func_ToolboxNavigatorBind_Done(); func_ToolboxNavigatorBind_DoneX(); }
            catch (err) { }
            try { $('#aagLoadingNxSample.nwLoading').remove(); } catch (err) { }
            crToolboxNavigator = false;
        }

    }
}

function func_ToolboxNavigatorBind_DoneX() {
    clear_parameters();
    nwParameter_Add("nwtxt_RecUser", $('#nwtxt_RecUser').text());
    nwParameter_Add("nwtxt_ModUser", $('#nwtxt_ModUser').text());
    var standardCrLnk = crSTDLnk;
    func_ActionDriven("actLoadUserDescription", false, standardCrLnk);
}

$(function () {
    $("div.BN-button").mousedown(function (event) {

        var isval = $("div.BN-button").parents(".noah-webui-Toolbox-BindingNavigator").hasClass('noah-webui-disabled');
        if (isval == true) return;

        isContinuePress = true;
        var verID = $(this).attr("id");
        if (jQuery(this).hasClass('noah-webui-disabled')) return;
        var parent = this.parentNode;
        var recenum = 0;
        recenum = $('#noah-webui-default-currentRec').val();
        event.preventDefault();
        var isContinue = true;

        //## ARM ## 02-02-2016
        //## START ##
        Navigation_recnum = recenum;
        Navigation_object = verID;
        if (NaviationFlag && crToolBoxType != "sv") {
            if (!Navigation_Next) {
                try {
                    isContinue = checkBindingChanges();
                }
                catch (err) { }

                if (isContinue)
                    isContinue = func_ToolboxNavigatorClient(verID, recenum);
            }
            else {
                Navigation_Next = false;

                isContinue = func_ToolboxNavigatorClient(verID, recenum);

            }
        }
        else
            isContinue = func_ToolboxNavigatorClient(verID, recenum);
        //## END ##

        // isContinue = func_ToolboxNavigatorClient(verID, recenum);

        if (isContinue) {

        }

    }).mouseup(function () {
        //isContinuePress = false;
    });
});

var crToolboxNavigator = false;
function func_ToolboxNavigatorClient(met, enume) {
    var isContinue = false;

    crToolboxNavigator = true;

    var xrow = $('#noah-webui-Toolbox-BindingNavigator .BN-record span').text().replace('of ').replace('undefined', '');

    if (parseInt(enume) >= parseInt(xrow))
        enume = parseInt(xrow);
    if (parseInt(enume) <= 0)
        enume = 0;


    if (!isContinuePress) return isContinue;
    var ter = 0;
    if (met == "noah-webui-default-next") {
        ter = parseInt(enume) + 1;
    }
    else if (met == "noah-webui-default-last") {
        ter = parseInt(xrow);
    }
    else if (met == "noah-webui-default-previous") {
        var xrow = $('#noah-webui-Toolbox-Grid tbody tr').length;
        ter = parseInt(enume) - 1;
    }
    else if (met == "noah-webui-default-first") {
        ter = 1;
    }

    if (ter <= 0) {
        $('#noah-webui-default-previous').addClass("noah-webui-disabled");
        $('#noah-webui-default-first').addClass("noah-webui-disabled");

        //noah-webui-disabled

        return false;
    }
    else if (ter > parseInt(xrow) && met == "noah-webui-default-next") {
        $('#noah-webui-default-next').addClass("noah-webui-disabled");
        $('#noah-webui-default-last').addClass("noah-webui-disabled");
        return false;
    }
    else if (ter > parseInt(xrow) && met == "noah-webui-default-next") {
        $('#noah-webui-default-next').addClass("noah-webui-disabled");
        $('#noah-webui-default-last').addClass("noah-webui-disabled");
        return false;
    }

    try { isContinue = func_ToolboxNavigatorBind(enume); }
    catch (err) { isContinue = true; }
    if (isContinue) {
        func_checkToolBox(xrow, ter);
        $('#noah-webui-default-currentRec').val(ter);

        func_GetBind("#noah-webui-Toolbox-BindingNavigator", "#noah-webui-Toolbox-Grid", ter - 1);
        if (crToolBoxType == "sv") {
            nwLoading_Start("nwaagToolBox", crLoadingHTML);
        }
        else {

            try { func_ToolboxNavigatorBind_Done(); func_ToolboxNavigatorBind_DoneX(); }
            catch (err) { }
            try { $('#aagLoadingNxSample.nwLoading').remove(); } catch (err) { }
            crToolboxNavigator = false;
        }
    }

    return isContinue;
}

function func_checkToolBox(xrow, ter) {

    var xcounter = $('#noah-webui-Toolbox-BindingNavigator .BN-record span').text().replace("of ", "");

    if (xcounter == "0") {
        $('#noah-webui-default-first').addClass('noah-webui-disabled');
        $('#noah-webui-default-previous').addClass('noah-webui-disabled');
        $('#noah-webui-default-last').addClass('noah-webui-disabled');
        $('#noah-webui-default-next').addClass('noah-webui-disabled');
        return;
    }

    if (ter > 1) {
        $('#noah-webui-default-first').removeClass('noah-webui-disabled');
        $('#noah-webui-default-previous').removeClass('noah-webui-disabled');
    }
    if (parseInt(xrow) >= ter) {
        $('#noah-webui-default-last').removeClass('noah-webui-disabled');
        $('#noah-webui-default-next').removeClass('noah-webui-disabled');
    }
    if (parseInt(xrow) <= ter) {
        $('#noah-webui-default-last').addClass('noah-webui-disabled');
        $('#noah-webui-default-next').addClass('noah-webui-disabled');
    }
    if (1 >= ter) {
        $('#noah-webui-default-first').addClass('noah-webui-disabled');
        $('#noah-webui-default-previous').addClass('noah-webui-disabled');
    }
}

function lookUp_inquire() {
    var dimP = "toolboxInquire";

    $("#menuCreatorContainer .modal-hdr-title").text("Search Records");

    try {
        $('.lookupcolSearch').val("");
    } catch (err) { }
    nkLookupClearData();

    func_LookUpClass(dimP);
    var isContinue = true;
    try {

        isContinue = func_LookUpInitialize(dimP);
        if (!isContinue && isContinue != undefined) return false;
    }
    catch (err) {
    }

    $("#menuCreatorContainer").removeClass('list');
    $("#menuCreatorContainer").addClass('single');
    $("#menuCreatorContainer input.search").val('');
    // $("#menuCreatorContainer .LookUpRefresh").attr("onclick", "lookUpA('" + dimP + "')");
    // $("#menuCreatorContainer .search").attr("onclick", "" + dimP + "");

    var verTXT = $("#menuCreatorContainer input.search").val();
    refresh_Table(dimP, verTXT);
    fn_LoadModule("menuCreatorContainer");

   // $("#menuCreatorContainer input.search").focus();
    //$("#txtlookupsearchF").focus();

    setTimeout(function () {
        $("#menuCreatorContainer input.search").focus();
    }, 100);
}


$(function () {
    setTimeout(function () {
        if (crLnkGateKey != nwMenuID) {
            var standardCrLnk = crSTDLnk;
            nwLoading_Start("actLoadMenuItemSec", crLoadingHTML,"","Opening");
            nwParameter_Add("menuID", crLnkGateKey);
            nwParameter_Add("menuID2", nwMenuID);
            nwParameter_Add("data", getParameterByName("nwu"));
            func_ActionDriven("actLoadMenuItemSec", false, standardCrLnk);
        }
    }, 100);
});


function init_request() {
    var addcrLnkQu = "&nwu=" + getParameterByName("nwu") + "&nwmid=" + getParameterByName("nwmid") + "&nwcon=" + getParameterByName("nwcon") + "&nw=" + getParameterByName("nw") + "&nwuser=" + getParameterByName("nwuser") + "&nwcom=" + getParameterByName("nwcom") + "&nwcomc=" + getParameterByName("nwcomc");
    addcrLnkQu += "&a2z4i7e=" + getParameterByName("a2z4i7e") + "&";
    var data;

    setTimeout(function () { nwLoading_Start("nwFirstLoadDataAzie", crLoadingHTML); }, 100);




    func_nwConvertParaValue();

    var data = { strMethod: "get_Initialize", strParameter: p8Encrypted(strParameter), 'strValue': p8Encrypted(strValue) };
    var rurl = crLnk + "?nwmethod=get_Initialize&" + addcrLnkQu + crLnkQu;

    requestForm(data, rurl);
}

$(function () {  // nwinitial  initial first load / mainload
    isLibraryObject = true;
    baseSessionID = func_nwRandomString(30);


    // device detection
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
        nwisMobile = true;


    $('body').append("<div id=\"noahwebSedit\" class=\"nwHide\"></div>");
    $('body').append("<div id=\"nwExportContainerMainBut\" nwTitle=\"Export\" ><div><input id='nwExportContainerMainText'><button id=\"btnnwExportBut\" value\"Export\">Export to Excel</button>&nbsp;&nbsp;<button id=\"btnnwExportCSVBut\"  value\"Export\">Export to CSV</button> &nbsp;&nbsp;<button id=\"btnnwExportPrintBut\"  value=\"Print\">Print</button></div></div>");
    $('body').append("<div id='nwSnackbar'></div>");


    nwPopupForm_Create("nwExportContainerMainBut", false);
    $('body').append("<div id=\"nwLoadingContainer\"></div>");

    if (getParameterByName("nwdev") == "p8dev") {
        var xsec = $('#nwseckey').text();
        if (getParameterByName("nwseckey") == xsec && xsec != undefined && libSkip() == false) {

            var havekey = false;
            try {
                var req = new XMLHttpRequest();
                req.open('GET', document.location, false);
                req.send(null);
                var headers = req.getAllResponseHeaders();
                var headersList = headers.split("\n");
                for (var i = 0; i < headersList.length; i++) {
                    var headersListx = headersList[i].split(": ");

                    if (headersListx[0] == "nwseckey") {
                        havekey = true;
                        if ((getParameterByName("nwseckey") + "").indexOf(headersListx[1].replace('\r', "").replace('\n', "")) >= 0) {
                            nwDevMode = true;
                            break;
                        }

                    }
                }
            } catch (err) { }
            if (havekey == false) {
                nwDevMode = true;
            }

        }
        else if (xsec == undefined || xsec == "") {
            nwDevMode = true;
        }
        //nwDevMode = true;
    }



    crLnkQu = "nwu=" + getParameterByName("nwu") + "&nwmid=" + getParameterByName("nwmid") + "&nwcon=" + getParameterByName("nwcon") + "&nw=" + getParameterByName("nw") + "&nwuser=" + getParameterByName("nwuser") + "&nwcom=" + getParameterByName("nwcom") + "&nwcomc=" + getParameterByName("nwcomc");
    crLnkQu += "&a2z4i7e=" + getParameterByName("a2z4i7e") + "&";


    nwCallInitializeWithUI();

    isLibraryObject = false;


    //setInterval(function () {
    //    try {
    //        nwsessionticker = new Date(CookieGet("nwsessionticker"));
    //    } catch (er) { }

    //    if (nwsessionticker == undefined) {
    //        func_ActionDriven("actLoadSession", false, crSTDLnk, "nwdontclearparams");
    //    }
    //    else {
    //        const diffTime = Math.abs(new Date() - nwsessionticker);
    //        if (diffTime > 300000) {
    //            func_ActionDriven("actLoadSession", false, crSTDLnk, "nwdontclearparams");
    //        }
    //    }
    //}, 300010); //300
});

var nwcontainerhandle = false;

function nwCallInitializeWithUI() {
    $('button.LookUp').click(function () {
        return false;
    });


    try {
        $('.nwDateField').datepicker();
    } catch (err) { }
    try {
        $('.nwDateField').mask("99/99/9999");
    } catch (err) { }

    $(".isNumber").css("text-align", "right");
    set_LookUpName();
    LoadStringsCases(); LoadStringsNoSpace();


}


function nwCreate2DArray(rows) {
    var arr = [];
    for (var i = 0; i < rows; i++) {
        arr[i] = [];
    }
    return arr;
}


$(document).on("click", "#nwErrorSeeDetails", function () {


    nwPopupForm_ShowModal("nwErrorHandlerCon");
    setTimeout(function () { $("#nwErrorHandlerCon").css("z-index", "1000000001"); }, 100);

    fn_LoadModule("nwErrorHandlerCon");
    $("#nwErrorHandlerConText").html($("#nwErrorHandler").html());
    // $("#nwErrorHandlerCon").css("z-index", "100000");
});


$(document).on("focus", ".nwDatePick, .nwDatePicker", function () {
    var xID = $(this).attr("id");
    if (xID == "" || xID == undefined) { xID = nwRandomString(20); $(this).attr("id", xID); $(this).removeClass("nwhasDatePicker"); }

    if ($(this).hasClass("nwhasDatePicker")) return;


    $(this).removeClass('hasDatepicker');

    if (xID == undefined) {
        $(this).datepicker(); xID = $(this).attr("id");
    }


    $("#" + xID).datepicker();

    $(this).addClass("nwhasDatePicker");

    try { $(this).mask("99/99/9999"); } catch (err) { }
});
$(document).on("blur", ".hasDatepicker", function () {
    var isValid = nwDateChecker($(this).val());

    if (isValid == false && $(this).val() != "") {
        $(this).val("");
        // $(this).focus();
        return false;
    }

});

function nwRandomString(count) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    if (count == undefined) count = 1;

    for (var i = 0; i < count; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


function nwFormatMask(obj, format) {
    try {
        $(obj).mask(format);
    }
    catch (err) {
        try {
            console.write("FORMAT DLL needed; materials/jslib/noahweb_Format.js" + err);
        }
        catch (err) {
            console.write(err);
        }
    }

}

var _zoomsizevalue = 0;
var _zoomCounter = 0;
//_zoomsizevalue=$(window).width();
var _zoomsizevalueDate = new Date();
$(function () {
    _zoomsizevalue = $(window).width(); _zoomsizevalueDate = new Date();

});
$(window).on('zoom', function () {
    xpageTimerProg = 1;
    _zoomsizevalue = $(window).width();
    _zoomsizevalueDate = new Date();
});

$(window).resize(function () {

    var xheight = $(window).outerHeight();

    if (xheight >= 800) xheight = 800;
    // if(xheight <=300) xheight =300;

    $('#dimMessageBox').css({
        position: 'fixed',
        left: ($(window).outerWidth() - $('#dimMessageBox').outerWidth()) / 2,
        top: (xheight - $('#dimMessageBox').outerHeight()) / 2.5
    });

    //  $(window).css("background", "red");
    // alert("( " + $(window).outerHeight() + " -  " + $('#dimMessageBox').outerHeight() + " ) " + " /  " + 2);
    //$('#menuCreatorContainer').css({
    //    position: 'fixed',
    //    left: ($(window).outerWidth() - $('#menuCreatorContainer').outerWidth()) / 2,
    //    top: (xheight - $('#menuCreatorContainer').outerHeight()) / 2
    //});
    //var height = $('#menuCreatorContainer').outerHeight();
    //var contminus = 199;
    //if ($("#LookUpAddtoList").css("display") != "none") {
    //    contminus = contminus + 49;
    //}
    //else {
    //    contminus = contminus + 20;
    //}

    //var yheight = height - contminus;
    //var addminus = $(".LookuptableHeader").height() - 62;
    //yheight -= addminus;
    //if (yheight > 0) {
    //    $(".tablecontainter").height(yheight);
    //}

    //var xmainHeight = $(window).outerHeight();
    //var xheader = 0; var xfooter = 0;
    //if ($('#noah-webui-Toolbox').css("display") != "none")
    //    xheader = $('#noah-webui-Toolbox').outerHeight() + 2;
    //if ($('#noah-webui-Footer').css("display") != "none")
    //    xfooter = $('#noah-webui-Footer').outerHeight() + 2;


    //xmainHeight = xmainHeight - (xheader + xfooter);

    //if (xfooter <= 2 && xheader <= 2)
    //    xmainHeight += 20;

    //$('#main-container').css({
    //    width: $(window).outerWidth() - 2
    //, height: xmainHeight
    //});




    //var nwGridCount = $(".nwGrid").length;

    //for (var i = 0; i < nwGridCount; i++) {
    //    var xID = $(".nwGrid:eq(" + i + ")").parent().attr("id");
    //    // if ($("#" + xID).parents(".noah-webui-containerRow").parent().hasClass("noah-webui-container"))
    //    nwGrid_TableAdjust(xID);
    //    func_nwGridScrollingPane(0, xID);

    //    try {
    //        nwGrid_MergeResize(xID, window.devicePixelRatio >= 1.25 ? 0 : window.devicePixelRatio);
    //    } catch (err) { }
    //}

    if ($("body").width() <= 550) {
        $("body").addClass('modal-mobile');
    } else {
        $("body").removeClass('modal-mobile');
    }


});

function nwModal(nwobject) {
    //console.log(nwobject);
    //loader added

    $(nwobject).find('.message_content').prepend("<div id=\"pop_loader\" style=\"text-align:center;margin: 10% auto;\"><span class=\"pop-loader\" aria-label=\"Loading...\" aria-busy=\"true\" size=\"large\"></span><span style=\"display: inline-block;\">Loading...</span></div>");
    //end of loader
    $(nwobject).find('.message_content').find('table').css('display', 'none');
    $('#dealerInfo').css('display', 'none');

    var xtop = ($(window).height() - $(nwobject).outerHeight()) / 2;
    if (xtop <= 0) xtop = 0;
    $(nwobject).css({
        position: 'fixed',
        left: ($(window).width() - $(nwobject).outerWidth()) / 2,
        top: ($(window).height() - $(nwobject).outerHeight()) / 2
    });
}


var msgBoxContainerAnsweR = "";
var msgBoxContainerQuestion = "";
var msgBoxQuery = new Array();
var isMessageQuestionToolBox = false;

function Message_close() {

    var isnewLib = false;
    var isValid = true;
    if (MessageBoxID_AAG != undefined) {
        var isright = MessageBoxID_AAG.buttonClose();
        isValid = isright || true;
        isnewLib = true;
    }
    MessageBoxID_AAG = undefined;
    if (isValid == false) return false;

    isMessageQuestionToolBox = false;
    $("#mdlPrompt").fadeOut("fast");
}


function msgBoxContainerQuestionT(genID, answer) {
    try { func_ToolboxMessageBox(genID, answer); }
    catch (err) { }

    if (answer == "Yes") {
        func_Toolbox(crFunc, crPos);
    }
    else {

    }
    crFunc = -1;
    crPos = -1;
}

function Message_Cancel() {

    var isnewLib = false;
    var isValid = true;
    if (MessageBoxID_AAG != undefined) {
        var isright = MessageBoxID_AAG.buttonCancel();
        isValid = isright || true;
        isnewLib = true;
    }
    MessageBoxID_AAG = undefined;
    if (isValid == false) return false;


    Message_close();
    isContinueProcessCancel = true;
}



$(document).on("click", "#mdlPrompt #btnYes", function () {
    Message_Yes();
    return false;
});

function Message_Yes() {
    msgBoxContainerAnsweR = "Yes";
    var isValid = true;

    var isnewLib = false;
    if (MessageBoxID_AAG != undefined) {
        var isright = MessageBoxID_AAG.buttonYes();
        if (isright == undefined) isright = true;
        isValid = isright || true;
        isnewLib = true;
    }
    MessageBoxID_AAG = undefined;


    if (isMessageQuestionToolBox) {
        try { isValid = msgBoxContainerQuestionT(msgBoxContainerQuestion, msgBoxContainerAnsweR); }
        catch (err) { }
        nwLoading_Start("nwaagToolBox", crLoadingHTML,"",nkLoadingText);

        try {
            func_ToolboxMessageYes(msgBoxContainerQuestion);
        } catch (err) { }

    }
    else if (isMessageQuestionNavigation) {
        try {
            Navigation_Next = true;
            isValid = msgBoxContainerQuestionNav("BNButton", true);
            return false;
        }
        catch (err) { }
    }
    else {
        if (isnewLib == false) {
            try { isValid = msgBoxContainerQuestionF(msgBoxContainerQuestion, msgBoxContainerAnsweR); }
            catch (err) { }
        }


    }
    if (isValid == true || isValid == undefined) Message_close();
}

$(document).on("click", "#mdlPrompt #btnNo", function () {
    Message_No();
    return false;
});
function Message_No() {
    msgBoxContainerAnsweR = "No";
    var isValid = true;


    var isnewLib = false;
    if (MessageBoxID_AAG != undefined) {
        var isright = MessageBoxID_AAG.buttonNo();
        if (isright == undefined) isright = true;
        isValid = isright;
        isnewLib = true;
    }
    MessageBoxID_AAG = undefined;


    if (isMessageQuestionToolBox) {
        try { isValid = msgBoxContainerQuestionT(msgBoxContainerQuestion, msgBoxContainerAnsweR); }
        catch (err) { }

        try {
            func_ToolboxMessageYes(msgBoxContainerQuestion);
        } catch (err) { }
    }
    else if (isMessageQuestionNavigation) {
        try {
            Navigation_Next = true;
            isValid = msgBoxContainerQuestionNav("BNButton", false);
        }
        catch (err) { }
    }
    else {
        if (isnewLib == false) {
            try { isValid = msgBoxContainerQuestionF(msgBoxContainerQuestion, msgBoxContainerAnsweR); }
            catch (err) { }
        }
    }
    if (isValid == true || isValid == undefined) Message_close();
}


$(document).on("click", "#mdlPrompt #btnOk", function () {
    Message_Ok();
    return false;
});

function Message_Ok() {


    var isValid = true;
    var isnewLib = false;
    if (MessageBoxID_AAG != undefined) {
        var isright = MessageBoxID_AAG.buttonOk();
        if (isright == undefined) isright = true;
        isValid = isright;
        isnewLib = true;
    }

    if (isValid == false) return false;
    MessageBoxID_AAG = undefined;


    try { Message_OkF(); }
    catch (err) { }
    //Message_close();
    if (isValid == true || isValid == undefined) Message_close();
}

$(document).on("click", "#mdlPrompt #btnCancel", function () {
    Message_close();
    return false;
});


function MessageBox(message, title, icon, focusObject, isInput) {
    parent_MessageBox(message, title, icon, focusObject, isInput);
}
function MessageBoxQuestion(message, title, icon, focusObject, isInput) {
    parent_MessageBoxQuestion(message, title, icon, focusObject, isInput);
}

function parent_UILoadAlerts() {
    // Loads initial alerts upon laod
    $(".alert").each(function (i) {
        if (!$(this).hasClass("hide")) {
            $(this).css({
                "animation-delay": 0.2 * (0.20 + i) + "s",
                "display": "flex",
            });
        }
    });
}
$(document).on("click", ".btn.btn-alert-close", function () {
    $(this).parents(".alert").fadeOut().delay(300).remove();
});
function parent_MessageBox(message, title, icon, focusObject, isInput) {
    message = MessageBox_Replace(message);
    title = MessageBoxTitle_Replace(title);

    if (title == undefined) title = baseTitle;
    message = message.replaceAll("\n", "<br>");

    if (icon == "" || icon == undefined) icon = "info";


    if (isInput == true) {
        $("#mdlPrompt").find(".mdl-msg-input").show();
        $("#mdlPrompt").find("#btnCancel").show();
        $("#mdlPrompt").find(".mdl-msg-label").show();
        $("#mdlPrompt").find("#txt-msg-msgvalue").val("");
        $("#mdlPrompt").find("#txt-msg-msgvalue").focus();

    } else {
        $("#mdlPrompt").find(".mdl-msg-input").hide();
        $("#mdlPrompt").find("#btnCancel").hide();
        $("#mdlPrompt").find(".mdl-msg-label").hide();
    }

    $("#mdlPrompt").removeClass("question");
    $("#mdlPrompt").removeClass("error");
    $("#mdlPrompt").removeClass("info");
    $("#mdlPrompt").removeClass("warning");
    $("#mdlPrompt").addClass(icon);



    $("#mdlPrompt").find(".mdl-msg-title").text(title);
    $("#mdlPrompt").find(".mdl-msg-txt").html(message);
    $("#mdlPrompt").fadeIn("fast");

}

var MessageBoxID_AAG = undefined;
function parent_MessageBoxQuestion(message, title, icon, focusObject, isInput) {
    message = MessageBox_Replace(message);
    title = MessageBoxTitle_Replace(title);
    message = message.replaceAll("\n", "<br>");


    if (isInput == true) {
        $("#mdlPrompt").find(".mdl-msg-input").show();
        $("#mdlPrompt").find("#btnCancel").show();
        $("#mdlPrompt").find(".mdl-msg-label").show();
        $("#mdlPrompt").find(".mdl-msg-label").text("");
        $("#mdlPrompt").find("#txt-msg-msgvalue").val("");
        $("#mdlPrompt").find("#txt-msg-msgvalue").focus();

    } else {
        $("#mdlPrompt").find(".mdl-msg-input").hide();
        $("#mdlPrompt").find("#btnCancel").hide();
        $("#mdlPrompt").find(".mdl-msg-label").hide();
    }


    $("#mdlPrompt").addClass("question");
    $("#mdlPrompt").removeClass("info");
    $("#mdlPrompt").removeClass("error");
    $("#mdlPrompt").removeClass("warning");


    $("#mdlPrompt").find(".mdl-msg-title").text(title);
    $("#mdlPrompt").find(".mdl-msg-txt").html(message);
    $("#mdlPrompt").fadeIn("fast");

    isMessageBox = true;
}



function parent_MessageBoxQuestionToolBox(message, title, icon, indef, enume) {
    message = MessageBox_Replace(message);
    title = MessageBoxTitle_Replace(title);
    crFunc = indef;
    crPos = enume;
    isMessageQuestionToolBox = true;

    var msgBox = new GenLib.MessageBoxQuestion("toolboxPrompt", message, title);
    msgBox.buttonYes = function () {
        return true; // close the window // false will not close the window
    };
    msgBox.buttonNo = function () {
        return true; // close the window // false will not close the window
    };
    msgBox.Show();

}
function MessageBoxTitle_Replace(title) {
    title = title.replaceAll("Error [1205]:", "");
    return title;
}

var crlateststdbutton = "Process";
function MessageBox_Replace(msg) {
    if (msg.indexOf("deadlock victim") >= 0) {
        msg = "Your request has been submitted. Please click 'Ok' then click the '" + crlateststdbutton + "' button to complete the transaction.";
        crlateststdbutton = "Process";
    }

    msg = msg.replaceAll("Error(s) Found:\n", "");

    msg = msg.replaceAll("Saved successfully.", "Saved successfully");
    msg = msg.replaceAll("Deleted successfully.", "Deleted successfully");
    msg = msg.replaceAll("Process has successfully completed.", "Process completed");
    msg = msg.replaceAll("Process has successfully completed", "Process completed");

    msg = msg.replaceAll("Cannot Save. At least one line details is required", "Cannot be saved. At least one line detail is required");
    msg = msg.replaceAll("Cannot Save. One line details is required", "Cannot be saved. At least one line detail is required");
    msg = msg.replaceAll("Cannot Save. Line details is required", "Cannot be saved. At least one line detail is required");
    msg = msg.replaceAll("Cannot Save.", "Cannot be saved.");

    msg = msg.replaceAll("Do you want to process the current record?", "Would you like to process the current record?");
    msg = msg.replaceAll("Do you want to save the current record?", "Would you like to save the current record?");
    msg = msg.replaceAll("Do you want to process the current record?", "Would you like to process the transaction/s?");
    msg = msg.replaceAll("Do you want", "Would you like");

    msg = msg.replaceAll("Error [50000]:<br>", "");
    msg = msg.replaceAll("Error [50000]:", "");



    return msg;
}

///////////// doin stuff;
function doStuff() {
    if (isContinueProcess == false && isContinueProcessCancel == false) {//we want it to match
        setTimeout(doStuff, 50); //wait 50 millisecnds then recheck
        $("#inCode").val(parseInt($("#inCode").val()) + 1);
        return;
    }
    $("#inCode").val(isContinueProcess);
    return;
}


var nkcrLookupdimP = [];
var nkcrLookupArryData = [];
var nkcrLookupArryData2 = [];
var nkcrLookuptag = [];
function lookUpLoadDataSetupRuntime() {
    var data = nkcrLookupArryData;

    var optionfilter = [];
    var svalue = $("#txtlookupsearchF").val();
    var curdata;
    if (svalue.trim() != "") {
        var mainfilter = $("#nkcmb-mainfilter").val();
       
            if (mainfilter == "" || mainfilter == undefined) {
                for (var i = 0; i < nkcrLookupArryData2.length; i++) {
                    optionfilter.push({ "field": nkcrLookupArryData2[i]["Column1"], "value": svalue });
                }
            }
            else {
                optionfilter.push({ "field": mainfilter, "value": svalue });
            }
      


        var curdata = nwJsonContains(data, optionfilter, "", false);
    }
    else {
        curdata = data;
    }

    optionfilter = [];
    for (var i = 0; i < nkcrLookupArryData2.length; i++) {
        svalue = $(".lookupcolSearch:eq(" + i + ")").val();
        if (svalue.trim() == "") continue;
        optionfilter.push({ "field": nkcrLookupArryData2[i]["Column1"], "value": svalue });
    }
    if (optionfilter.length >= 1) {
        curdata = nwJsonContains(curdata, optionfilter, "", false);
    }


    lookUpLoadDataSetup(nkcrLookupdimP, curdata, nkcrLookupArryData2, nkcrLookuptag, false);

}


function lookUpLoadDataSetup(dimP, data, data2, tag, isnitial,nodataString,nodataStringCount) {
    if (tag == "list")
        $("#AddtolistCon").show();
    else
        $("#AddtolistCon").hide();

    var nodataStringX = "No Data Found!";
    if (nodataString != undefined && nodataString != "") nodataStringX = nodataString;

   

    if (isnitial == undefined)
        isnitial = true;

    if (isnitial == true) {
        nkcrLookupdimP = dimP;
        nkcrLookupArryData = data;
        nkcrLookupArryData2 = data2;
        nkcrLookuptag = tag;
    }
    //else {
    //    data = nkcrLookupArryData;
    //    data2 = nkcrLookupArryData2;
    //}
    
    $("#menuCreatorContainer").attr("crlookup", dimP);

    var xindex = nwJsonSearchIndex(nwlookupJSON, "id", dimP, false);
    if (xindex >= 0) nwJsonDelete(nwlookupJSON, xindex);
    nwlookupJSON.push({ id: dimP, data: data, data2: data2, nodataString: nodataString, nodataStringCount: nodataStringCount });


    if (nkisLookupReload == true) {
        nkisLookupReload = false;
        lookUpLoadDataSetupRuntime();
        return;
    }
        

    var optionstr = "";
    optionstr += "<option value=''>ALL</option>";
    for (var i = 0; i < data2.length; i++) {
        optionstr += "<option value='" + data2[i]["Column1"] + "'>" + data2[i]["Column1"] + "</option>";
    }
    if (isnitial == true) $("#menuCreatorContainer select.cmb").html(optionstr);

    if (nodataStringX != "No Data Found!") {
        $("#menuCreatorContainer .found-record span").html(nodataStringCount);
    }
    else {
        if (nodataStringCount == undefined) nodataStringCount = data.length;
        $("#menuCreatorContainer .found-record span").html(nodataStringCount);
    }
    

 

    var lookupHeaderhtml = "";
    var lookupBodyhtml = "";
    var totalcol = data2.length;

    lookupHeaderhtml += "<tr class='lookUpTRHeader'>";


    lookupHeaderhtml += "<th data-type='num' scope='col' class='tbl-row-num'></th>";

    if (tag == "list")
        lookupHeaderhtml += "<th data-type='num' scope='col' class='tbl-row-num'><input class='nwlookupgridcheck' type='checkbox'></th>";


    for (var i = 0; i < data2.length; i++) {
        var showhide = data2[i].showhide;
        if (showhide == "0") showhide = "nwHide";
        var align = data2[i].align || "";
        align = "nwLookupCon-A" + align.toLocaleLowerCase();

        lookupHeaderhtml += "<th data-type='str' scope='col' class='" + showhide + " " + align + "'>" + data2[i].Column1 + "</th>";
    }
    lookupHeaderhtml += "</tr>";
    lookupHeaderhtml += "<tr class='lookUpTRHeaderSearch'>";

    lookupHeaderhtml += "<th data-type='num' scope='col' class='tbl-row-num'></th>";

    if (tag == "list")
        lookupHeaderhtml += "<th data-type='num' scope='col' class='tbl-row-num'></th>";



    for (var i = 0; i < data2.length; i++) {
        var showhide = data2[i].showhide || "";
        if (showhide == "0") showhide = "nwHide";
        var align = data2[i].align || "";
        align = "nwLookupCon-A" + align.toLocaleLowerCase();

        lookupHeaderhtml += "<th data-type='str' scope='col' class='" + showhide + " " + align + "'><input type='text' name='' class='lookupcolSearch txtbox'></th>";
    }
    lookupHeaderhtml += "</tr>";



    for (var i = 0; i < data.length; i++) {
        lookupBodyhtml += "<tr class='lookuprow'>";

        lookupBodyhtml += "<th scope='row' class='tbl-row-num' row-th='#'><span class='wrap-td'>" + "</span></th>";
        if (tag == "list") {
            lookupBodyhtml += "<td class='chklist' row-th=''><input  class='nwlookupgridcheck' type='checkbox'></td>";

        }


        for (var i2 = 0; i2 < data2.length; i2++) {
            var colname = data2[i2].Column1;
            var value = data[i][colname] || "";

            var showhide = data2[i2].showhide;
            if (showhide == "0") showhide = "nwHide";
            var align = data2[i2].align || "";
            align = "nwLookupCon-A" + align.toLocaleLowerCase();

            lookupBodyhtml += "<td row-th='" + colname + "' class='" + showhide + " " + align + "'><span class='wrap-td'>" + value + "</span></td>";
        }
        lookupBodyhtml += "</tr>";
    }
    if (data.length <= 0) {
        if (tag == "list") totalcol += 1;
        
        lookupBodyhtml += "<tr class='nwLookup-Nodata'><td colspan='" + totalcol + "' class='nwLookup-Nodata'>" + nodataStringX + "</td></tr>";
    }

    if (isnitial == true) $("#nkLookupCon").find("table thead").html(lookupHeaderhtml);
    $("#nkLookupCon").find("table tbody").html(lookupBodyhtml);



    setTimeout(function () {
        lookupDataLoadList($('#' + dimP));
        lookupresizing();
    }, 10);
}

$(function () {
    lookupresizing();
});
function lookupresizing() {
    var totalheight = $("#menuCreatorContainer .modal-box-s").height();
    var hdrheight = $("#menuCreatorContainer .modal-hdr").outerHeight();
    var bodyheight = $("#menuCreatorContainer .nk-modal-body .row:eq(0) ").outerHeight();
    var footerheight = $("#menuCreatorContainer #lookupTable .row:eq(1) ").outerHeight();
    var allheight = totalheight - (hdrheight + bodyheight + footerheight);
    $("#nkLookupCon").height(allheight);
}
$(document).on("click", ".btn-modal-rescale-s", function () {

    setTimeout(function () {
      
        lookupresizing();
    }, 50);
});


$(document).on("mousedown", "#nkLookupCon .lookuprow", function () {
    var vindex = $(this).index() + 1;
    if ($("#menuCreatorContainer").hasClass("single")) {
        lookUpSelect(vindex);
    }
    else {

    }
})

function lookUpLoadData(dimP, alterLink) {
    var isContinue = true;
    try {
        $('.lookupcolSearch').val("");
    } catch (err) { }
    try {

        isContinue = func_LookUpInitialize(dimP);
        //if (!isContinue && isContinue != undefined) return;
    }
    catch (err) {
    }

    try { func_Check_Lookup(dimP); } catch (err) { }
    if (isDataRequired == true && isDataLookup == true) {
        get_parameters_default();

    }
    nwParameter_Add("aagSessionID", baseSessionID);
    nwParameter_Add("aagDataLoad", "YES");
    func_nwConvertParaValue();

    $('#' + dimP).addClass("lookupdataload");



    var data = { strSearch: "get" + dimP, poz: "", strParameter: p8Encrypted(strParameter), strValue: p8Encrypted(strValue) };
    if (alterLink != "" && alterLink != undefined) {
        var rurl = alterLink + "?nwmethod=get_LookUp";
        requestForm(data, rurl, undefined, "Lookups-Load");
    }
    else {
        var rurl = crLnk + "?nwmethod=get_LookUp";
        requestForm(data, rurl, undefined, "Lookups-Load");
    }

}


function nkLookupClearData() {
    $("#menuCreatorContainer select.cmb").html("");
    $("#menuCreatorContainer .found-record span").html("");
    $("#nkLookupCon").find("table tbody").html("");
    $("#nkLookupCon").find(".lookUpTRHeader").find("th").text("");
    $("#txtlookupsearchF").val("");
}


function lookUp(ver) {
    var dimP = $(ver).parents(".lookups").attr("id");
    if (dimP == undefined)
        dimP = $("#menuCreatorContainer").attr("crlookup");

    $("#menuCreatorContainer .modal-s .modal-hdr-title").text("Look Up");
    //$("#menuCreatorContainer .lookup_loading").show();


    nkLookupClearData();

    try {
        $('.lookupcolSearch').val("");
    } catch (err) { }

    func_LookUpClass(dimP);

    var isContinue = true;
    try {

        isContinue = func_LookUpInitialize(dimP);
        if (!isContinue && isContinue != undefined) return false;
    }
    catch (err) {
    }

    var codeval = $("#" + dimP + " input.descval").val();
    if (jQuery("#" + dimP).hasClass('adisabled') || jQuery("#" + dimP).hasClass('noah-webui-disabled')) return false;
    $("#menuCreatorContainer").removeClass('list');
    $("#menuCreatorContainer").addClass('single');
   // $("#menuCreatorContainer input.search").val('');

    var verTXT = $("#txtlookupsearchF").val();
    refresh_Table(dimP, verTXT);



    return true;
}

function func_LookUpName(dimP) {
    $(".modal-s .modal-hdr-title").text(dimP);
}

function func_LookUpClass(dimP) {
    $("#menuCreatorContainer .nk-modal-body").attr("class", "nk-modal-body");
    if (dimP != "")
        $("#menuCreatorContainer .nk-modal-body").addClass(dimP);

    $("#menuCreatorContainer .LookupID").text(dimP);
}


function lookUpCustomize(ver, verS, alterLink, isSpread) {
    var dimP = ver;
    try {
        $('.lookupcolSearch').val("");
    } catch (err) { }
    $("#menuCreatorContainer .lookup_loading").show();

    nkLookupClearData();
    try { var xvalid = func_LookUpInitialize(dimP); if (xvalid == false) return; } catch (err) { }


    if (jQuery("#" + dimP).hasClass('adisabled') || jQuery("#" + dimP).hasClass('noah-webui-disabled')) return;
    crnwlugSelected = "aagnwGridlug";

    func_LookUpClass(dimP);


    $("#menuCreatorContainer").removeClass('single');
    $("#menuCreatorContainer").removeClass('list');
    $("#menuCreatorContainer").removeClass('listcustom');
    $("#menuCreatorContainer").removeClass('p8spreadlookup');

    if (verS == 1) {
        $("#menuCreatorContainer").addClass('single');
    }
    else if (verS == 2) {
        $("#menuCreatorContainer").addClass('list');
    }
    else if (verS == 3) {
        $("#menuCreatorContainer").addClass('listcustom');
    }


    if (isSpread) {
        $("#menuCreatorContainer").addClass('p8spreadlookup');
    }


    $("#menuCreatorContainer input.search").val('');
    $("#menuCreatorContainer .LookUpRefresh").attr("onclick", "lookUpA('" + dimP + "')");
    $("#menuCreatorContainer .search").attr("onclick", "" + dimP + "");
    $("#menuCreatorContainer").fadeIn(200);
    //$("#dimbgNW").addClass("openn");
    //$("#dimbgNW").fadeIn(200);

    $("#menuCreatorContainer .tablecontainter").html("<div style=\"text-align:center;vertical-align:middle;\"><span class=\"pop-loader\" aria-label=\"Loading...\" aria-busy=\"true\" size=\"large\"></span><span style=\"display: inline-block;\">Loading...</span></div>");
    fn_LoadModule("menuCreatorContainer");

    var verTXT = $("#menuCreatorContainer input.search").val();
    refresh_Table(dimP, verTXT, alterLink);
    $(window).resize();
    //$("#menuCreatorContainer").css("position", "fixed");
    // $("#menuCreatorContainer input.search").focus();
}

function refresh_Table(dimP, verTXT, alterLink) {

    try { func_Check_Lookup(dimP); } catch (err) { }
    if (isDataRequired == true && isDataLookup == true) {

        get_parameters_default();

    }


    nwParameter_Add("aagSessionID", baseSessionID);
    var xoption = $("#lookupColumn option:selected").val();
    if (xoption == undefined) xoption = "aagALLDATA";



    var xtemp = "";
    xtemp = $("#menuCreatorContainer .ContainerContent ").attr("crLookup");
    if (dimP != xtemp) xoption = "aagALLDATA";

    var xfilters = "";
    for (var i = 1; i < $("#lookupColumn").find("option").length; i++) {
        xfilters += "#!aagFilter#" + $("#lookupColumn").find("option:eq(" + i + ")").val() + "#gg";
    }
    nwParameter_Add("aagLookUpColumnFilters", xfilters);

    nwParameter_Add("aagLookUpColumn", xoption);
    nwParameter_Add("aagLookUpPrevID", prev_LookUpID);
    var xvalue = "";
    try { xvalue = $("#txtlookupsearch").val().replaceAll("'", "''"); } catch (err) { }


    nwParameter_Add("aagLookUpSearch", xvalue);
    nw_dataLookup = [];
    $.each($('.lookUpTRHeaderSearch .lookupcolSearch'), function (index, object) {
        nw_dataLookup.push({ column: $(object).attr("search"), value: $(object).val() });
    });
    nwParameter_Add("aagLookUpSearchSub", JSON.stringify(nw_dataLookup));

    $("#menuCreatorContainer .ContainerContent ").attr("crLookup", dimP);





    func_nwConvertParaValue();

    var data = { strSearch: "get" + dimP, poz: verTXT, strParameter: p8Encrypted(strParameter), strValue: p8Encrypted(strValue) };


    if (alterLink != "" && alterLink != undefined) {
        var rurl = alterLink + "?nwmethod=get_LookUp";
        requestForm(data, rurl, undefined, "Lookup-Load");
    }
    else {
        var rurl = crLnk + "?nwmethod=get_LookUp";
        requestForm(data, rurl, undefined, "Lookup-Load");
    }

}

$(document).on("keypress", "#menuCreatorContainer div.searchDiv input.search", function (e) {


    if (e.which == 13) {
        var lookupID = $("#menuCreatorContainer div.LookupID").text();
        lookUpA(lookupID);
    }
});

var prev_LookUpID = "";
var xlook;
var xlook2;
var nw_dataLookup = [];
var nw_dataLookupFocus;

function lookUpA(vers) {

    setTimeout(function () { $('#menuCreatorContainerLoading').show(); }, 10);
    var dimP = vers;

    try { var xvalid = func_LookUpInitialize(dimP); if (xvalid == false) return; } catch (err) { }
    try { func_Check_Lookup(dimP); } catch (err) { }

    if (isDataRequired == true && isDataLookup == true) {
        get_parameters_default();
    }

    nwParameter_Add("aagSessionID", baseSessionID);
    var xoption = $("#lookupColumn option:selected").val();
    if (xoption == undefined) xoption = "aagALLDATA";



    nwParameter_Add("aagLookUpColumn", xoption);
    nwParameter_Add("aagLookUpPrevID", prev_LookUpID);
    nwParameter_Add("aagLookUpSearch", $("#txtlookupsearch").val());


    nw_dataLookup = [];
    $.each($('.lookUpTRHeaderSearch .lookupcolSearch'), function (index, object) {
        nw_dataLookup.push({ column: $(object).attr("search"), value: $(object).val() });
    });
    nwParameter_Add("aagLookUpSearchSub", JSON.stringify(nw_dataLookup));


    var xfilters = "";
    for (var i = 1; i < $("#lookupColumn").find("option").length; i++) {
        xfilters += "#!aagFilter#" + $("#lookupColumn").find("option:eq(" + i + ")").val() + "#gg";

    }
    nwParameter_Add("aagLookUpColumnFilters", xfilters);

    func_nwConvertParaValue();

    if ($("#txtlookupsearch").val() != "" && nwLookupAutoSearch == true) {
        var obj = $(".lookupheader th:eq(0)");
        var nwpager = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").attr("nwpager");
        var nwinstance = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").attr("nwinstance");
        var nwpagerindex = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").attr("nwpagerindex");
        var nwpagercount = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").attr("nwpagercount");
        var lookupID = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").parent().attr("id");
        var nwpagecurrent = 1;


        var xoption = $("#lookupColumn option:selected").val();
        if (xoption == undefined) xoption = "aagALLDATA";

        var xtemp = "";
        xtemp = $("#menuCreatorContainer .ContainerContent ").attr("crLookup");
        if (vers != xtemp) xoption = "aagALLDATA";

        var xfilters = "";
        for (var i = 1; i < $("#lookupColumn").find("option").length; i++) {
            xfilters += "#!aagFilter#" + $("#lookupColumn").find("option:eq(" + i + ")").val() + "#gg";
        }
        nwParameter_Add("aagLookUpColumnFilters", xfilters);
        nwParameter_Add("aagLookUpColumn", xoption);


        nwParameter_Add("nwpagecurrent", nwpagecurrent);
        nwParameter_Add("nwlookupID", $(".ContainerContent .LookupID").text());
        nwParameter_Add("nwpagerindex", nwpagerindex);
        nwParameter_Add("nwaagSessionID", baseSessionID);
        nwParameter_Add("nwpager", nwpager);
        nwParameter_Add("nwinstance", nwinstance);
        nwParameter_Add("nwpagerindex", nwpagerindex);
        nwParameter_Add("nwislist", $(".ContainerContent .lookupheader").hasClass("nwlookupgridList"));

        $(obj).parents(".ContainerContent").find(".tablecontainter").addClass("nwloadingdata");
        var standardCrLnk = crSTDLnk;

        nwParameter_Add("menuCreatorContainerDataType", $('#menuCreatorContainerDataType').text());

        //nwParameter_Add("nwpagesort", xcolumn);
        //        var nwsort = $(obj).attr("nwsort");
        //        if (nwsort == undefined) nwsort = "asc";
        //        nwParameter_Add("nwsort", nwsort);
        xlook = $('#menuCreatorContainer .tablecontainter .xslookup');
        xlook2 = $('#menuCreatorContainer .tablecontainter .xslookup2');
        func_ActionDriven("actNWLookUpSearch", false, standardCrLnk);
    }
    else {
        var data = { strSearch: "get" + dimP, poz: $("#menuCreatorContainer input.search").val().replaceAll("&#", "&%#").replaceAll("'", "''"), strParameter: p8Encrypted(strParameter), 'strValue': p8Encrypted(strValue) };
        var rurl = crLnk + "?nwmethod=get_LookUp";
        requestForm(data, rurl, undefined, "Lookup-Load");
        setTimeout(function () { $('.LookuptableHeader').css('opacity', 1); $('.tablecontainter').css('opacity', 1); });
    }
}



var crnwlugSelected = "";
var crnwcodevalue = "";
function lookUpSelect(idNum) {

    var idName = $('#menuCreatorContainer .LookupID').text();

    try {
        var isContinue = func_LookUpSelect(idName, idNum);
        if ((isContinue) == false) return false;
    } catch (err) { }



    var serCode = $('#menuCreatorContainer table tbody tr:eq(' + (idNum - 1) + ') td:eq(0)').text();
    var serDesc = $('#menuCreatorContainer table tbody tr:eq(' + (idNum - 1) + ') td:eq(1)').text();
    var objID = "#noah-webui-Toolbox-BindingNavigator";

    //$("#" + idName + " input").css("border-color", "");

    if (idName.substring(0, 3) == "get") idName = idName.substring(3);


    if (idName == 'toolboxInquire' && crnwlugSelected == "" && crnwTagSingleBind == true) {
        func_Toolbox_Clear();
        crnwcodevalue = serCode;
        func_ToolboxData("#noah-webui-Toolbox-Grid", "toolbox");
        isNewRow = false;
    }
    else if (idName == 'toolboxInquire' && crnwlugSelected == "") {

        var indexposition = loc_LookupInquire(idNum);
        if (indexposition !== -1) {
            $('#noah-webui-Toolbox-BindingNavigator #noah-webui-default-currentRec').val('' + (indexposition + 1));
            var xrow = $('#noah-webui-Toolbox-Grid tbody tr').length;

            if (crToolBoxType == "sv") { func_LoadBindSV(objID, "", "1", serCode); }
            else {
                func_checkToolBox(xrow, indexposition + 1);
                func_GetBind("#noah-webui-Toolbox-BindingNavigator", "#noah-webui-Toolbox-Grid", indexposition);

                try { func_ToolboxNavigatorBind_Done(); func_ToolboxNavigatorBind_DoneX(); }
                catch (err) { }
                //try { $('#aagLoadingNxSample.nwLoading').remove(); } catch (err) { }
                crToolboxNavigator = false;
            }
        }
        else {
            if (crToolBoxType == "sv") { func_LoadBindSV(objID, "", "1", serCode); }
        }
    }
    else if (crnwlugSelected == "aagnwGridlug") {
        $('#dimTableLookUp').html($('#menuCreatorContainer  table tr:eq(' + idNum + ')').clone());
    }
    else {
        $('#' + idName + " input.idval").val(serCode);
        $('#' + idName + " input.descval").val(serDesc);
    }

    var isValid = true;
    try { crnwLookupTable = $("#menuCreatorContainer .tablecontainter table"); isValid = Lookup_DoneFunction(idName, idNum); }
    catch (err) { }


    func_ClearLookup(isValid);


    if (isValid == true || isValid == undefined) PaneClose();

    setTimeout(function () {
        $('#' + idName + ' button.LookUp').focus();
    }, 200);
}

function func_ClearLookup(isValid) {
    try {
        if (isValid == true || isValid == undefined) {
            var xsession = $('#menuCreatorContainer .LookuptableHeader table').attr("nwinstance");
            func_ClearGridSession(xsession);
        }
    }
    catch (err) { }
}

function loc_LookupInquire(idNum) {
    var rowposition = -1;
    var serCode = $('#menuCreatorContainer  table tr:eq(' + idNum + ') td:eq(0)').text();
    var serCode2 = "";
    var tempitemCol = "";
    var xcount = $('#noah-webui-Toolbox-Grid').find('tr').length;
    var isValid = false;
    for (var i = 0; i < xcount; i++) {//serCode
        rowposition++;
        if (crToolInquireKey.replace(' ', '') != '') {
            tempitemCol = 'tr:eq(' + i + ') td.aag' + crToolInquireKey;
            serCode2 = $('#noah-webui-Toolbox-Grid').find(tempitemCol).text();
            if (serCode2 == serCode) {
                isValid = true;
                break;
            }
        }
        else {
            tempitemCol = 'tr:eq(' + i + ') td:eq(0)';
            // alert(tempitemCol);
            serCode2 = $('#noah-webui-Toolbox-Grid').find(tempitemCol).text();
            //
            if (serCode2 == serCode) {
                isValid = true;
                break;
            }
        }
        isValid = false;
    }
    if (!isValid) {
        rowposition = -1;
    }
    //  alert(crToolInquireKey);
    // alert("rowposition:" + rowposition);
    return rowposition;
}


var crinquireval = "";
function loc_LookupInquireWithValue(idValue) {
    crinquireval = idValue;
    isNewRow = false;
}

function loc_LookupInquireGoto(idValue, isrefresh) {

    if (crinquireval == undefined || crinquireval == "") return;


    if (crToolBoxType == "sv") {

        var objID = "#noah-webui-Toolbox-BindingNavigator";
        if (isrefresh == undefined) isrefresh = false;
        if (isrefresh) func_LoadBindSV(objID, "", "1", idValue);
        return;
    }

    var indexposition = -1;
    var rowposition = -1;
    var serCode = idValue;
    var serCode2 = "";
    var tempitemCol = "";
    var xcount = $('#noah-webui-Toolbox-Grid').find('tr').length;
    var isValid = false;
    for (var i = 0; i < xcount; i++) {//serCode
        rowposition++;
        if (crToolInquireKey.replace(' ', '') != '') {
            tempitemCol = 'tr:eq(' + i + ') td.aag' + crToolInquireKey;
            serCode2 = $('#noah-webui-Toolbox-Grid').find(tempitemCol).text();
            if (serCode2 == serCode) {
                isValid = true;
                break;
            }
        }
        else {
            tempitemCol = 'tr:eq(' + i + ') td:eq(0)';
            // alert(tempitemCol);
            serCode2 = $('#noah-webui-Toolbox-Grid').find(tempitemCol).text();
            //
            if (serCode2 == serCode) {
                isValid = true;
                break;
            }
        }
        isValid = false;
    }
    if (!isValid) {
        rowposition = -1;
    }
    indexposition = rowposition;


    if (indexposition !== -1) {
        $('#noah-webui-Toolbox-BindingNavigator #noah-webui-default-currentRec').val('' + (indexposition + 1));
        var xrow = $('#noah-webui-Toolbox-Grid tbody tr').length;
        func_checkToolBox(xrow, indexposition + 1);
        func_GetBind("#noah-webui-Toolbox-BindingNavigator", "#noah-webui-Toolbox-Grid", indexposition);
    }
    crinquireval = "";
}




function PaneClose() {
    $("#menuCreatorContainer .btn-modal-back").click();
    crnwlugSelected = "";
    try {
        nwPaneClosePostProcess();
    } catch (err) { }
}

function set_LookUpName() {
    var counter = $('div.lookups').length;
    var tempID = "";


    $('div.lookups input.descval').attr("disabled", true);
    for (var i = 0; i < counter; i++) {
        tempID = $('div.lookups:eq(' + i + ')').attr("id");
        $('div.lookups:eq(' + i + ') input.idval').attr("name", "idval" + tempID);
        $('div.lookups:eq(' + i + ') input.descval').attr("name", "descval" + tempID);
        $('div.lookups:eq(' + i + ') input.idval').attr("id", "idval" + tempID);
        $('div.lookups:eq(' + i + ') input.descval').attr("id", "descval" + tempID);

        $('div.lookups:eq(' + i + ') input.idval').attr("list", tempID + "_DataList");
        $('div.lookups:eq(' + i + ') input.idval').attr("autocomplete", "off");


        $('#nwDatalistCon').append("<datalist id='" + tempID + "_DataList' ></datalist>");

    }
    // $('div.lookups input').attr("ondrop", "return false;");


    if (isLookupCodeCombo == false) {
        $('div.lookups input.idval').attr("readonly", true);
    }
}

//LOOKUPCODE PRESS
//// idval press
var _lookupTabPress = false;
$(document).on("keydown", 'div.lookups input.descval', function (e) {
    if ($(this).parents("div.lookups").hasClass("adisabled")) {
        if (e.which == 9)
            return true;
        else return false;
    }

});
$(document).on("keydown", 'div.lookups input.idval', function (e) {

    if ($(this).parents("div.lookups").hasClass("adisabled")) {

        if (e.which == 9)
            return true;
        else if (e.ctrlKey && e.which == 67) { nwconsole.log("copied"); return true; }
        else return false;
    }

    if (e.which == 13) {
        $(this).blur();
        return false;
    }

    if ($(this).hasClass("nwDisabledAutoComplte")) return;
    if (e.which >= 37 && e.which <= 40) return false;
    if ($(this).parents('.lookups').hasClass('adisabled')) { return false; }



    if (e.which == 9 && prevLookUpCode != $(this).val()) _lookupTabPress = true; //else _lookupTabPress=false;


    if (prevLookUpCode == $(this).val() && (e.which == undefined)) { $(this).blur(); }

    prevLookUpCode = $(this).val();
    if (e.which == 113) // F2
    {
        $(this).parents(".lookups").find("button.LookUp").click();
    }


}).on("keyup", 'div.lookups input.idval', function (e) {
    if (e.which == 9) return true;
    this.value = this.value.toUpperCase();
    if (e.which >= 37 && e.which <= 40) return false;

    if ($(this).parents('.lookups').hasClass('adisabled')) {

        return false;
    }


    var xid = $(this).parents('.lookups').attr("id");
    if (e.which == 13) {

        $(this).blur();
        return false;
    }

    if (prevLookUpCode == $(this).val()) {

    }
    else $(this).parents('.lookups').find(" input.descval").val("");

    $('#txtlookupsearch').val($(this).val());

    // $('#menuCreatorContainer .tablecontainter > table').remove();


    lookUpA(xid); /// reload data lookup

    //if (lookupDataLoadList(this)) return;
    return;

    //$('#menuCreatorContainer div.searchDiv .LookUpRefresh').click();

});


/// idval focus
var prevLookUpCode = "";
$(document).on("focus", 'div.lookups input.idval', function (e) {

    if ($(this).parents('.lookups').hasClass("adisabled")) {
        $(this).attr("list", "");
        return false;
    }
    prevLookUpCode = $(this).val();

    //var xid = $(this).parents('.lookups').attr("id");
    //if(!$("#"+ xid).hasClass("lookupdataload")){
    //    setTimeout(function(){lookUpLoadData(xid);},5);
    //}

    $('#txtlookupsearch').val($(this).val());
    $('#menuCreatorContainer .tablecontainter > table').remove();
    var xid = $(this).parents('.lookups').attr("id");
    lookUpA(xid);
    return; //if (lookupDataLoadList(this)) 


});

function lookupDataLoadList(_this) {
    var lookupCode = $(_this).attr("id") + "";
    jsonData = nwJson(nwlookupJSON, "id", lookupCode, true);

    if (jsonData.length >= 1) {

        var data = jsonData[0].data;
        var data2 = jsonData[0].data2;
        $('#menuCreatorContainer .tablecontainter').html('<div class="LookupID">' + lookupCode + '</div>');
        $('#menuCreatorContainer .tablecontainter').append('<table class="nwLoopUpTableCon"><tr class="lookupextraC" style="display: none;"></tr></table>');

        var itemsLen = data.length;

        if (itemsLen >= 1000) itemsLen = 1000;



        $('#' + lookupCode + "_DataList").html("");
        for (var i = 0; i < itemsLen; i++) {


            var xcode = data[i][data2[0].Column1] || "";
            var xdesc = "";
            xcode = xcode.toUpperCase();

            if (xcode == "NO DATA FOUND!") continue;

            try { xdesc = data[i][data2[1].Column1] || ""; } catch (err) { }

            if (nwBrowser == 'Firefox')
                $('#' + lookupCode + "_DataList").append("<option nwdesc=" + xdesc + " value='" + xcode + "'/>");
            else
                $('#' + lookupCode + "_DataList").append("<option nwdesc='" + xdesc + "' value='" + xcode + "'>" + xdesc + "</option>");
        }


        //setTimeout(function () {
        //    for (var i = 0; i < xlen; i++) {
        //        var rowdata = "<tr>";
        //        for (var i2 = 0; i2 < data2.length; i2++) {
        //            rowdata += "<td>" + data[i][data2[i2].Column1] + "</td>";
        //        }
        //        rowdata += "<tr>";
        //        $('#menuCreatorContainer .tablecontainter .nwLoopUpTableCon').append(rowdata);
        //    }
        //},10);


        return true;
    }
    return false;
}


$(document).on("blur", 'div.lookups input.idval', function (e) {

    if ($(this).hasClass("nwDisabledAutoComplte")) return;
    if ($(this).parents('.lookups').hasClass('adisabled'))
        return false;

    if ($(this).val() == "" && prevLookUpCode == $(this).val()) {
        prevLookUpCode = "";
        return true;
    }

    // alert(prevLookUpCode +"=="+ $(this).val() + "=="+_lookupTabPress);

    // if (prevLookUpCode == $(this).val() && _lookupTabPress == false) { _lookupTabPress == false; return true; }

    // var xtry = 20;
    // while (xtry > 0) {
    var xindex = -1;

    try {
        xindex = nwJsonSearchIndex(nwlookupJSON, "id", $(this).parents('.lookups').attr("id"), false);
    } catch (err) { }

    if ($("#menuCreatorContainer .tablecontainter table").html() == undefined && xindex < 0) {

        var xobjectprev = this;
        setTimeout(function () {
            $(xobjectprev).blur();
            nwconsole.log("(lookup entry) re-processed.");
        }, 500);
        nwconsole.log("(lookup entry) trying again.....");
        return false;
    }

    //console.log($("#menuCreatorContainer .tablecontainter table").html());

    var xid = $(this).parents('.lookups').attr("id");

    var xobj = $("#" + xid + "_DataList");
    var xfer = "";
    var isInvalidCode = true;


    for (var i = 0; i < xobj.find("option").length; i++) {
        //alert(xobj.find("option:eq("+i+")").attr("value"));

        if ($(this).val() == xobj.find("option:eq(" + i + ")").attr("value")) {
            isInvalidCode = false;
            xfer = xobj.find("option:eq(" + i + ")").attr("nwdesc"); //
            break;
        }
    }


    if (xindex >= 0) {
        try {
            var json = nwJson(nwlookupJSON, "id", $(this).parents('.lookups').attr("id"), false);
            var jsonDatas = nwJson(json[0].data, json[0].data2[0].Column1 || "", $(this).val(), false);

            if (jsonDatas.length >= 1) {
                xfer = jsonDatas[0][json[0].data2[1].Column1];

                isInvalidCode = false;

                $('#menuCreatorContainer .tablecontainter').html('<div class="LookupID">' + xid + '</div>');
                $('#menuCreatorContainer .tablecontainter').append('<table class="nwLoopUpTableCon"><tr class="lookupextraC" style="display: none;"></tr></table>');

                var data = json[0].data;
                var data2 = json[0].data2;
                for (var i = 0; i < 1; i++) {
                    var rowdata = "<tr>";
                    for (var i2 = 0; i2 < data2.length; i2++) {
                        rowdata += "<td>" + data[i][data2[i2].Column1] + "</td>";
                    }
                    rowdata += "<tr>";
                    $('#menuCreatorContainer .tablecontainter .nwLoopUpTableCon').append(rowdata);
                }
            }

        } catch (err) { }
    }





    var xcolor = "red";
    if (((xfer == "" && isInvalidCode == true) && $(this).val() != "") || xfer == undefined) {

        //alert($(this).val() + " " + isInvalidCode);
        try {
            if ($(this).val() != "") Lookup_LoadFailed(xid, $(this).val());
        } catch (err) { }

        $(this).val("");
        try {
            $("#" + xid).find(" input.idval").css("border-color", xcolor);
            $("#" + xid).find(" input.descval").css("border-color", xcolor);

        }
        catch (err) { }

        try {

            crnwLookupTable = $("#menuCreatorContainer .tablecontainter table");
            Lookup_DoneFunction(xid, 1, $(this).val());
            func_ClearLookup(true);
            try {
                if ($(this).val() != "") Lookup_LoadFailed(xid, $(this).val());
            } catch (err) { }
        }
        catch (err) { }
    }
    else {

        $(this).parents('.lookups').find(" input.descval").val(xfer);
        $("#" + xid).find(" input.idval").css("border-color", "");
        $("#" + xid).find(" input.descval").css("border-color", "");

        try {
            Lookup_DoneFunction(xid, 1, $(this).val());
            func_ClearLookup(true);
        }
        catch (err) { }
    }

    _lookupTabPress = false;
    return false;


});

function func_xLookupLoaded(counter) {
    var obj = $('#menuCreatorContainer .tablecontainter > table');
    var objID = $('#menuCreatorContainer .tablecontainter .LookupID').text();
    var itemsLen = obj.find("tr").length;


    if (counter == undefined) counter = 51;
    if (itemsLen >= counter) itemsLen = 51;

    $('#' + objID + "_DataList").html("");



    for (var i = 0; i < itemsLen; i++) {

        if (obj.hasClass('lookUpTRHeader'));
        else
            var xcode = obj.find("tr:eq(" + i + ") td:eq(0)").text();
        var xdesc = "";

        xcode = xcode.toUpperCase();

        if (xcode == "NO DATA FOUND!") continue;

        try { xdesc = obj.find("tr:eq(" + i + ") td:eq(1)").text(); } catch (err) { }

        if (nwBrowser == 'Firefox')
            $('#' + objID + "_DataList").append("<option nwdesc=" + xdesc + " value='" + xcode + "'/>");
        else
            $('#' + objID + "_DataList").append("<option nwdesc='" + xdesc + "' value='" + xcode + "'>" + xdesc + "</option>");
    }


    $('.LookuptableHeader').css("margin-top", "5px");
    $('.LookuptableHeader').html("");
    $('.LookuptableHeader').append($('.lookupheader'));

    var xobj = $('.LookuptableHeader table.lookupheader tr:eq(0)');
    var xobjBody = $('.tablecontainter table tr:eq(1)');

    //alert(xobj.find("th").length);

    if (prev_LookUpID != objID) {

        $("#lookupColumn").html("");

        $("#lookupColumn").append("<option value='aagALLDATA'>ALL</option>");
        for (var i = 0; i < xobj.find("th").length; i++) {
            if (xobj.find("th:eq(" + i + ")").text() == ""
    || xobj.find("th:eq(" + i + ")").css("display") == "none"
    || xobj.find("th:nth-child(" + (i + 1) + ")").css("display") == "none"
    || xobj.find("th:nth-child(" + (i + 1) + ")").css("display") == "none"
    || xobjBody.find("td:eq(" + i + ")").css("display") == "none"
    || xobj.find("th:eq(" + i + ")").css("cursor") == "not-allowed !important"
    || xobj.find("th:eq(" + i + ")").css("cursor") == "not-allowed"
    ) continue;


            $("#lookupColumn").append("<option value=\"" + xobj.find("th:eq(" + i + ")").text().replaceAll("'", "\'") + "\">" + xobj.find("th:eq(" + i + ")").text().replaceAll("'", "\'") + "</option>");
        }
        //alert($('#menuCreatorContainer .tablecontainter > table').attr("nwlookfilter"));
        $("#lookupColumn").val($('#menuCreatorContainer .tablecontainter > table').attr("nwlookfilter"));
    }


    lookup_Resize(true);
    prev_LookUpID = objID;

    try { $("#menuCreatorContainer .searchDiv > .lookup_pageCount").remove(); $("#menuCreatorContainer .searchDiv > .lookup_buttonsCon").remove(); } catch (err) { }
    try { $("#menuCreatorContainer .searchDiv").append($(".lookup_buttonsCon")); } catch (err) { }
    $("#menuCreatorContainer .searchDiv").append($(".lookup_pageCount"));

    if ($("#menuCreatorContainer .lookup_buttonsCon").html() != undefined) $(".tablecontainter").addClass("nwPager");
    else $(".tablecontainter").removeClass("nwPager");



    $('#menuCreatorContainer .lookup_loading').hide();
    //$("#menuCreatorContainer input.search").focus();
    setTimeout(function () {
        $("#menuCreatorContainer input.search").focus();
    }, 100);
    $(window).resize();

}
function lookup_Resize(isfirstLoad) {
    var xobj = $('.LookuptableHeader table.lookupheader tr:eq(0)');
    var xobjSearch = $('.LookuptableHeader table.lookupheader tr:eq(1)');

    var xobjx = $('.tablecontainter table  tbody tr:eq(1)');

    xobjx.find(" td").css("min-width", "");
    xobjx.find(" td").css("max-width", "");
    xobjx.find(" td").css("width", "");

    var xcont = $('.tablecontainter table  tbody').html();

    $('.tablecontainter table  tbody').html(xcont);
    xobjx = $('.tablecontainter table  tbody tr:eq(1)');

    var xdefault = undefined;




    setTimeout(function () {
        if (xobjx.find("td:eq(0)").text() == "No Data Found!") { xdefault = 180; }

        for (var i = 0; i < xobj.find("th").length; i++) {
            if ($('.LookuptableHeader table.lookupheader ').hasClass("nwlookupgridList") && i == 0) {
                xobjx.find("td:eq(0)").css("min-width", "25px !important");
                xobj.find("th:eq(0)").css("min-width", "25px !important");
                xobjSearch.find("th:eq(0)").css("min-width", "25px !important");

                xobjx.find("td:eq(0)").css("max-width", "25px !important");
                xobj.find("th:eq(0)").css("max-width", "25px !important");
                xobjSearch.find("th:eq(0)").css("max-width", "25px !important");

                xobjx.find("td:eq(0)").css("width", "25px !important");
                xobj.find("th:eq(0)").css("width", "25px !important");
                xobjSearch.find("th:eq(0)").css("width", "25px !important");


                continue;
            }


            if ((i + 1) == xobj.find("th").length) {
                xobj.find("th:eq(" + i + ")").css("min-width", "18px");
                xobjSearch.find("th:eq(" + i + ")").css("min-width", "18px");
            }

            //xobjx.find("td:eq(" + i + ")").css("min-width", "inherit");
            //xobjx.find("td:eq(" + i + ")").css("max-width", "inherit");
            //xobjx.find("td:eq(" + i + ")").css("width", "inherit");

            xobj.find("th:eq(" + i + ")").css("min-width", "");
            xobj.find("th:eq(" + i + ")").css("max-width", "");
            xobj.find("th:eq(" + i + ")").css("width", "");

            xobjSearch.find("th:eq(" + i + ")").css("min-width", "");
            xobjSearch.find("th:eq(" + i + ")").css("max-width", "");
            xobjSearch.find("th:eq(" + i + ")").css("width", "");


            var x1 = xobjx.find("td:eq(" + i + ")").outerWidth();
            var x2 = xobj.find("th:eq(" + i + ")").width();
            var d1 = xobjx.find("td:eq(" + i + ")").css("display");

            // if (xdefault != undefined) x1 = xdefault;

            xobj.find("th:eq(" + i + ")").css("display", "");
            xobjSearch.find("th:eq(" + i + ")").css("display", "");
            if (d1 == "none") xobj.find("th:eq(" + i + ")").css("display", d1);
            if (d1 == "none") xobjSearch.find("th:eq(" + i + ")").css("display", d1);


            //alert(x1 + "@" + x2);
            try {
                x1 = (x1 + '').replace(" ", "").replace("px", "");
            } catch (err) { }

            var xed = 0;
            var xedInput = 10;
            if (x1 <= 150) xed = 0;


            if (x1 >= x2) {
                // if (x1 >= 200) x1 = 200;

                xobjx.find("td:eq(" + i + ")").css("min-width", (x1) + "px");
                xobjx.find("td:eq(" + i + ")").css("max-width", (x1) + "px ");
                xobjx.find("td:eq(" + i + ")").css("width", (x1) + "px ");

                xobj.find("th:eq(" + i + ")").css("min-width", (x1 - xed) + "px");
                xobj.find("th:eq(" + i + ")").css("max-width", (x1 - xed) + "px ");
                xobj.find("th:eq(" + i + ")").css("width", x1 + "px ");


                xobjSearch.find("th:eq(" + i + ")").css("min-width", (x1 - xed - 1) + "px");
                xobjSearch.find("th:eq(" + i + ")").css("max-width", (x1 - xed - 1) + "px ");
                xobjSearch.find("th:eq(" + i + ")").css("width", (x1 - xed - 1) + "px ");

                xobjSearch.find("th:eq(" + i + ") input").css("min-width", "91%");
                xobjSearch.find("th:eq(" + i + ") input").css("max-width", "95% ");
                xobjSearch.find("th:eq(" + i + ") input").css("width", "93% ");

            }
            else {
                //  if (x2 >= 200) x1 = 200;
                //                        xobjx.find("td:eq(" + i + ")").css("min-width", (x2) + "px");
                //                        xobjx.find("td:eq(" + i + ")").css("max-width", (x2) + "px");
                //                        xobjx.find("td:eq(" + i + ")").css("width", (x2) + "px");

                //                        xobj.find("th:eq(" + i + ")").css("min-width", x2 + "px");
                //                        xobj.find("th:eq(" + i + ")").css("max-width", x2 + "px");
                //                        xobj.find("th:eq(" + i + ")").css("width", x2 + "px");
                xobjx.find("td:eq(" + i + ")").css("min-width", (x1) + "px");
                xobjx.find("td:eq(" + i + ")").css("max-width", (x1) + "px ");
                xobjx.find("td:eq(" + i + ")").css("width", (x1) + "px ");

                xobj.find("th:eq(" + i + ")").css("min-width", (x1 - xed) + "px");
                xobj.find("th:eq(" + i + ")").css("max-width", (x1 - xed) + "px ");
                xobj.find("th:eq(" + i + ")").css("width", (x1) + "px");

                xobjSearch.find("th:eq(" + i + ")").css("min-width", (x1 - xed - 1) + "px");
                xobjSearch.find("th:eq(" + i + ")").css("max-width", (x1 - xed - 1) + "px ");
                xobjSearch.find("th:eq(" + i + ")").css("width", (x1 - xed - 1) + "px");

                xobjSearch.find("th:eq(" + i + ") input").css("min-width", "91%");
                xobjSearch.find("th:eq(" + i + ") input").css("max-width", "95% ");
                xobjSearch.find("th:eq(" + i + ") input").css("width", "93%");


            }
        }
        if (isfirstLoad == true) {
            xobj.append("<th style='min-width:18px;'></th>");
            xobjSearch.append("<th style='min-width:18px;'></th>");
            //aagedit2
        }
        for (var i = 0; i < nw_dataLookup.length; i++) {
            if (nw_dataLookup[i].value != undefined && nw_dataLookup[i].value != "")
                $('.lookupcolSearch[search="' + nw_dataLookup[i].column + '"]').val(nw_dataLookup[i].value);
        }
        try {
            $(nw_dataLookupFocus).focus();
        } catch (err) {

        }

    }, 1);
}


function func_xLookupListLoaded(objID) {

}






$(document).on("click", "#LookUpAddtoList", function () {
    var selectedCont = $(this).parent().parent().parent().parent();
    //alert(selectedCont.attr("id"));
    var selectedTable = selectedCont.find('table');
    var rcount = selectedTable.find('tbody tr').length;

    var isSpreadLookup = false;

    try {
        if ($("#menuCreatorContainer").hasClass('p8spreadlookup')) isSpreadLookup = true;
    } catch (err) { }

    try {
        if (isSpreadLookup) {
            try {
                _sfAddToList();
            } catch (err) { }
        }
        else if (crnwTableCon != null && $("#menuCreatorContainer").hasClass('list'))
            nwGrid_AddtoListDoneF();
        else if ($("#menuCreatorContainer").hasClass('listcustom')) //crnwTableCon != null  &&
        {
            var verID = $("#menuCreatorContainer .LookupID").text();
            var jsonTable = func_ConvertTableJSON($('#dimTableLookUpCon'));
            func_AddtoListDoneCustom(verID, jsonTable);
        }
        else {
            var verID = $("#menuCreatorContainer .LookupID").text();
            nwGrid_AddtoListDoneCustomF(verID);
        }
    }
    catch (err) { }

    PaneClose();
    //alert(selectedTable.attr('class') + " " + rcount);

});
function nwGrid_AddtoListDoneCustomF(verID) {
    var addtoListTableCount = $('#dimTableLookUpCon tbody tr').length;
    var addtoListTableRec = $('#dimTableLookUpCon tbody');
    var crnwTRtemp;
    for (var i = 0; i < addtoListTableCount; i++) {
        if ($('#dimTableLookUpCon tbody tr:eq(' + i + ') td:eq(0) input').prop("checked") == true)
            crnwTRtemp = nwGrid_AddtoListDoneCustom(verID, addtoListTableRec, i);
    }

    try {
        nwGrid_AddtoListLoaded(verID);
    }
    catch (err) { }
}

var customvarinc = 0; // customize
function nwGrid_AddtoListDoneF() {
    var xcount = $('#dimTableLookUpCon tbody tr').length;
    var addtoListTableTemplate = crnwTableCon.find('#nwGridRows tr:eq(0)').clone();
    var addtoListTableRec = $('#dimTableLookUp tbody');
    var addtoListTableCount = $('#dimTableLookUp tr').length;
    var nwGridID = crnwTableCon.attr("id");
    var crnwTRtempLast = crnwTR;

    var crnwTDText = "";


    var elementType = $(crnwTD).children().prop('tagName'); /// check type var is_element_input = $(this).is("input"); //true or false
    var elementTyper = (elementType + "").toLowerCase();

    if (elementTyper == "input") {
        var xtempstr = $(crnwTD).children().attr("type")
        if (xtempstr == "checkbox")
            tempvalue = $(crnwTD).children().prop("checked");
        else if (xtempstr == "radio")
            tempvalue = $(crnwTD).children().prop("checked");
        else tempvalue = $(crnwTD).children().val();

        crnwTDText = tempvalue;
    }

        // if (elementTyper == "input") crnwTDText = $(crnwTD).children().val();
    else if (elementTyper == "textarea") crnwTDText = $(crnwTD).children().val();
    else if (elementTyper == "select") crnwTDText = $(crnwTD).children().val();
    else if (elementTyper == "button") crnwTDText = $(crnwTD).children().text();
    else if (elementTyper == "undefined" || elementType == undefined) crnwTDText = crnwTD.text();
    else crnwTDText = crnwTD.text();

    var lastindex = -1;
    for (var i = 0; i < addtoListTableCount; i++) {
        var crnwTRtemp = addtoListTableTemplate.clone();

        var verID = '';
        customvarinc++;
        verID = "tempID" + customvarinc;
        crnwTRtemp.attr('id', verID);

        if ($("table#" + nwGridID + "-nwData").find("tbody tr").length <= 0)
            func_nwGrid_AddRow(nwGridID);
        try {
            // nwGrid_AddtoListDoneF()

            crnwLookupTable = $("#menuCreatorContainer .tablecontainter table");
            crnwTRtemp = nwGrid_AddtoListDone(nwGridID, crnwTRtemp, addtoListTableRec, i);
            try {
                if (crnwTRtemp == null) continue;
                if (crnwTRtempLast == undefined || crnwTRtempLast == 'undefined')
                    crnwTable.append(crnwTRtemp);
                else if (crnwTDText.replace(' ', '') == "") {
                    //                try{crnwTRtemp = func_privGetData(crnwTRtemp,crnwTR);}
                    //                catch(err){}
                    crnwTR.replaceWith(crnwTRtemp);
                    crnwTDText = "aagok";
                }
                else
                    crnwTRtemp.insertAfter(crnwTRtempLast);

                crnwTRtempLast = crnwTRtemp;
                lastindex = crnwTRtemp.index();
            } catch (err) { }
        } catch (err) { }
    }


    func_ListNumberFormat(crnwTable);



    try {
        //alert((lastindex+1) +"=="+ $("table#" + nwGridID + "-nwData").find("tbody tr").length);
        if (lastindex + 1 == $("table#" + nwGridID + "-nwData").find("tbody tr").length)
            nwGrid_AddRow(nwGridID, 1);

        nwGrid_AddtoListLoaded(crnwTable);
    }
    catch (err) { }
}


function nwGrid_TransferTemp(nwGridID, nwTempID) {
    nwGrid_TransferTemp(nwGridID, nwTempID, -1, -1, -1);
}



function nwGrid_TransferTemp(nwGridID, nwTempID, x1, y1, y2) {
    try {
        var xstart = 0; var xstartG = 0;
        nwGridID = nwGridID.replace("#", "");
        nwTempID = nwTempID.replace("#", "");
        //var xstart2= start2;
        var objnwGridID = $("#" + nwGridID + " .tblGridBody  tbody");
        var objnwTempID = $("#" + nwTempID + " tbody");
        var objnwTempIDTH = $("#" + nwTempID + " thead");
        var xcounter = objnwTempID.find("tr").length;
        var xcounterTH = objnwTempIDTH.find("tr th").length;
        var y1_f = 0;
        if (y1 != -1) {
            xstartG = x1;
            xcounter = y1;
            xcounter = (y2 - y1);
        }
        //  alert(nwGridID  + "," + nwTempID + "," +x1 + "," +y1 + "," +y2 + ":xcounter:" + xcounter);
        var xtext = "";
        //alert(xcounter + " " + xcounterTH);

        for (var i = xstart; i < xcounter; i++) {
            for (var i2 = 0; i2 < xcounterTH; i2++) {
                xtext = objnwTempID.find("tr:eq(" + i + ") td:eq(" + i2 + ")").html();
                //alert(xtext);
                objnwGridID.find("tr:eq(" + (i + xstartG) + ") td:eq(" + (i2 + 1) + ")").html(xtext);
                // nwTempTable_RowData_Set(nwGridID,i,i2+1)(xtext);
            }
        }

    } catch (err) { alert(err); }
}

function func_nwGrid_ColumnWidth(nwGridID, col, xwidth) {
    nwGrid_ColumnWidth(nwGridID, col, xwidth);
}

function nwGrid_ColumnWidth(nwGridID, col, xwidth) {

    $('#' + nwGridID + ' .tblGridBody').find("colgroup ").find('col:eq(' + col + ')').css("width", xwidth);
    $('#' + nwGridID + ' .tblGridBody').find("colgroup ").find('col:eq(' + col + ')').css("min-width", xwidth);
    $('#' + nwGridID + ' .tblGridBody').find("colgroup ").find('col:eq(' + col + ')').css("max-width", xwidth);
    $('#' + nwGridID + ' .tblGridHeader').find("colgroup ").find('col:eq(' + col + ')').css("width", xwidth);
    $('#' + nwGridID + ' .tblGridHeader').find("colgroup ").find('col:eq(' + col + ')').css("min-width", xwidth);
    $('#' + nwGridID + ' .tblGridHeader').find("colgroup ").find('col:eq(' + col + ')').css("max-width", xwidth);

    nwGrid_TableAdjust(nwGridID);
}


$(document).on("change", "table.nwlookupgridList th input.nwlookupgridcheck", function () {
    func_checkLookupList($(this).parents("th"));
});

function func_checkLookupList(ver) {
    if ($(ver).find("input").val() != undefined) {
    } else return;

    var n = $(ver).find('input.nwlookupgridcheck:checked').length;; //find('tbody tr:eq(' + i + ') td:eq(0) input:checked').length; //alert(n);
    if (n === 1) {
        $('input.nwlookupgridcheck').prop('checked', true);

        var nn = $("#menuCreatorContainer").find('tbody input.nwlookupgridcheck').length;
        for (var i = 1; i < nn; i++) {
            var ver1 = $("#menuCreatorContainer").find('tbody input.nwlookupgridcheck:eq(' + i + ')');
            var verObjID = $(ver1).parents("table.nwlookupgridList tr").find("td:eq(1)").text();
            Lookup_AddDataToList($(ver1).parents("table.nwlookupgridList tr"), verObjID);
        }

    }
    else {
        $('input.nwlookupgridcheck').prop('checked', false);

        var nn = $("#menuCreatorContainer").find('tbody input.nwlookupgridcheck').length;
        for (var i = 1; i < nn; i++) {
            var ver1 = $("#menuCreatorContainer").find('tbody input.nwlookupgridcheck:eq(' + i + ')');
            var verObjID = $(ver1).parents("table.nwlookupgridList tr").find("td:eq(1)").text();
            Lookup_RemoveDataToList(verObjID);
        }

    }
    Lookup_AddToListChecks();
}
function Lookup_AddToListChecks() {
    var lengthx = $(".tablecontainter table input.nwlookupgridcheck").length;
    var selall = true;
    for (let i = 0; i < lengthx; i++) {
        let vart = $(".tablecontainter table input.nwlookupgridcheck:eq(" + i + ")").prop("checked");
        if (vart == false) {
            selall = false;
            break;
        }
    }
    $("table.lookupheader input.nwlookupgridcheck").prop("checked", selall);
}


//aagedit
$(document).on("click", "table.nwlookupgridList tr td", function () {
    // if ($(this).index() > 1) return false;
    //alert($(this).index());

    //if ($(this).index() == 0) return false;
    if ($(this).find("input.nwlookupgridcheck").val() != undefined) return true;


    if ($(this).parents("table.nwlookupgridList tr").find("td:eq(0) input").prop("checked") == false) {

        $(this).parents("table.nwlookupgridList tr").find("td:eq(0) input").prop("checked", true);
        var verObjID = $(this).parents("table.nwlookupgridList tr").find("td:eq(1)").text();
        Lookup_AddDataToList($(this).parents("table.nwlookupgridList tr"), verObjID);
    }
    else if ($(this).parents("table.nwlookupgridList tr").find("td:eq(0) input").prop("checked") == true) {

        $(this).parents("table.nwlookupgridList tr").find("td:eq(0) input").prop("checked", false);
        var verObjID = $(this).parents("table.nwlookupgridList tr").find("td:eq(1)").text();
        Lookup_RemoveDataToList(verObjID);
    }
    Lookup_AddToListChecks();
});


$(document).on("click", "td input.nwlookupgridcheck", function () {
    var n = $("#menuCreatorContainer").find('tbody td input.nwlookupgridcheck:checked').length;
    var nn = $("#menuCreatorContainer").find('tbody td input.nwlookupgridcheck').length;
    if (n === nn) {
        $('th input.nwlookupgridcheck').prop('checked', true);

    }
    else {
        $('th input.nwlookupgridcheck').prop('checked', false);
    }

    if ($(this).parents(".lookUpTRHeader").hasClass("lookUpTRHeader"))
        return false;

    if ($(this).prop("checked") == true) {
        var verObjID = $(this).parents("table.nwlookupgridList tr").find("td:eq(1)").text();
        Lookup_AddDataToList($(this).parents("table.nwlookupgridList tr"), verObjID);
    }
    else {
        var verObjID = $(this).parents("table.nwlookupgridList tr").find("td:eq(1)").text();
        Lookup_RemoveDataToList(verObjID);
    }

});


function Lookup_AddDataToList(verObj, verObjID) {
    if ($(verObj).attr("nwdup") == "1")
        return false;
    Lookup_RemoveDataToList(verObjID);
    verObjID = verObjID.replaceAll(".", "_+_").replaceAll("#", "_-_").replaceAll("/", "_n_");;
    verObjID = "nwLookup-" + verObjID;

    var temp2 = "<tr id=\"" + verObjID + "\" class=\"" + verObjID + "\">" + $(verObj).html() + "</tr>";
    $('#dimTableLookUp').append(temp2);
}
function Lookup_RemoveDataToList(verObjID) {
    verObjID = verObjID.replaceAll(".", "_+_").replaceAll("#", "_-_").replaceAll("/", "_n_");;
    verObjID = "nwLookup-" + verObjID;

    try {
        $('#dimTableLookUp').find("#" + verObjID).remove();
        $('#dimTableLookUp').find("." + verObjID).remove();
    } catch (err) { }
}


function func_LookupLoadSelected() {
    if ($('#menuCreatorContainer').find("table").hasClass("nwlookupgridList")) {
        var nn = $('#menuCreatorContainer').find(".tablecontainter  table.nwlookupgridList").find("tbody > tr").length;
        var istotal = 0;
        for (var i = 1; i < nn; i++) {
            try {
                var verObjID = $("#menuCreatorContainer").find(".tablecontainter table.nwlookupgridList ").find('tbody tr:eq(' + i + ')').find("td:eq(1)").text();
                // verObjID=verObjID.replaceAll(".", "_+_").replaceAll("#", "_-_");
                verObjID = verObjID.replaceAll(".", "_+_").replaceAll("#", "_-_").replaceAll("/", "_n_");
                verObjID = "nwLookup-" + verObjID;

                if ($("#" + verObjID).html() != undefined) {
                    $("#menuCreatorContainer").find(".tablecontainter table.nwlookupgridList ").find('tbody tr:eq(' + i + ')').find("input.nwlookupgridcheck").prop("checked", true);
                    istotal += 1;
                }
            } catch (err) { }
        }
        if (istotal >= (nn - 1))
            $('#menuCreatorContainer .lookUpTRHeader .nwlookupgridcheck').prop("checked", true);
    }

    // $("#menuCreatorContainer").resize();
}



////////////////////////// Look up end

////////////////////////// Table

$(document).on("click", "tr", function () {

    var selectedTR = $(this);
    //    var to_inCode = selectedTR.find('td:eq(1)').val();
    //    var to_inDesc = selectedTR.find('td:eq(2)').attr('title');
    //    //alert(to_inCode);
    //    inCode.val(to_inCode);
    //    inDesc.val(to_inDesc);

});

function func_ListNumberFormat(verTable) {
    var xer = verTable.find('tr').length;
    var addValue = 0;



    try {
        if ($(verTable).attr("nwPager") != undefined)
            addValue = parseInt($(verTable).attr("nwPager")) * (parseInt($(verTable).attr("nwPagerIndex")) - 1);
        else
            addValue = parseInt($(verTable).parents(".nwGrid").attr("nwPager")) * (parseInt($(verTable).parents(".nwGrid").attr("nwPagerIndex")) - 1);

        // addValue = parseInt($(verTable).parents(".nwGrid").attr("nwPager")) * (parseInt($(verTable).parents(".nwGrid").attr("nwPagerIndex")) - 1);
    } catch (err) { }
    if ((addValue + '') == "NaN") addValue = 0;

    for (var i = -1; i < xer; i++) {
        verTable.find('tbody tr:eq(' + i + ') td:eq(0)').text(i + 1 + addValue);
    }
}


function nwGridLoading(nwGridID) {
    if ((getParameterByName("nwtype") || '') != "") $(".nwgrid_buttons").enable(false);
    $("#xscr" + nwGridID).remove();
}

var nwGrid_ID = 0;
$(document).on("click", ".nwGrid .nwgrid_AddNew", function () {
    if ($(this).parents(".nwGrid").hasClass("noah-webui-disabled") || $(this).parents(".nwGrid").parent().hasClass("noah-webui-disabled"))
        return false;
    if ((getParameterByName("nwtype") || '') != "")
        return false;


    func_nwGridAddRowBut(this);
    return false;
});
function func_nwGridAddRowBut(ver) {
    var selectedTR = $(ver);
    crnwTable = $(ver).parents(".nwGrid").find('.tblGridBody');
    //var tempTable = $(this).parent().parent().find('#nwGridRows');
    var tempTable = $(ver).parents(".nwGrid").find('#nwGridRows');


    var isContinue = true;
    try {
        isContinue = func_nwGrid_AddNewValidation(nwgridID);
    } catch (err) {
    }
    if (isContinue) {

        var varTRa = tempTable.find('tr:eq(0)').clone();
        nwGrid_ID += 1;
        varTRa.attr("aagRow" + nwGrid_ID);
        crnwTable.append(varTRa);
        func_ListNumberFormat(crnwTable);
        try { func_nwGrid_AddNewDone(); } catch (err) { }
    }
}


$(document).on("click", ".nwGrid .nwgrid_SearchFind", function () {

    if ((crnwTD == null || crnwTD.index() <= 0) || $(this).parents(".nwGrid").find("td.nwgridSelected").html() == undefined) {
        MessageBox("Please Select Cell", "", "", "#" + $(this).parents(".nwGrid").attr("id") + " input.nwgrid_SearchNext");
        return false;
    }
    if ($(this).parents(".nwGrid").find(".nwgrid_SearchNext").val() == "") {
        MessageBox("Please enter Keyword", "", "", "#" + $(this).parents(".nwGrid").attr("id") + " input.nwgrid_SearchNext");
        return false;
    }
    nwGrid_SetSelectedObjects(crnwTD);
    $('#nwSearch #nwSearchText').val($(this).parents(".nwGrid").find(".nwgrid_SearchNext").val());
    toolbox_SearchCheck();
    //toolbox_Search();
});
$(document).on("keypress", ".nwGrid input.nwgrid_SearchNext", function (e) {
    if (e.which == 13) {
        $(this).parents(".nwGrid").find(".nwgrid_SearchFind").click();
    }

});
$(document).on("focus", ".nwGrid input,.nwGrid textarea", function (e) {
    e.preventDefault();
});


$(document).on("click", ".nwGrid .nwgrid_Insert", function () {
    if ($(this).parents(".nwGrid").hasClass("noah-webui-disabled") || $(this).parents(".nwGrid").parent().hasClass("noah-webui-disabled"))
        return false;


    if ((getParameterByName("nwtype") || '') != "")
        return false;

    var selectedTR = $(this);
    crnwTable = $(this).parents(".nwGrid").find('.tblGridBody');
    var tempTable = $(this).parents(".nwGrid").find('#nwGridRows');

    if ($(crnwTD).parents(".nwGrid").find('#nwGridRows').html() != tempTable.html()) { return; }

    var isContinue = true;
    try {
        isContinue = func_nwGrid_InsertValidation();
    } catch (err) {
    }
    if (isContinue) {
        var varTRa = tempTable.find('tr:eq(0)').clone();
        nwGrid_ID += 1;
        varTRa.attr("aagRow" + nwGrid_ID);

        var temptdindex = crnwTR.find(crnwTD).index();
        var selectedTD = varTRa.find("td:eq(" + temptdindex + ")");
        //$('.tblGridBody tr td').removeClass('nwgridSelected');
        //selectedTD.addClass('nwgridSelected');

        // alert(crnwTable);

        varTRa.insertBefore(crnwTR);



        func_ListNumberFormat(crnwTable);
        //crnwTD =selectedTD;
        //crnwTR = varTRa;
        try { isContinue = func_nwGrid_InsertDone(); } catch (err) { }
    }
    return false;
});



function func_nwGrid_Insert(nwGridID, row, addUp) {

    var varparent = $("#" + nwGridID).find(".nwGrid").html() == undefined ? $("#" + nwGridID) : $("#" + nwGridID).find(".nwGrid");

    if ($(varparent).hasClass("noah-webui-disabled") || $(varparent).parent().hasClass("noah-webui-disabled"))
        return false;

    if ((getParameterByName("nwtype") || '') != "")
        return false;

    var xcrnwTable = $(varparent).find('.tblGridBody');
    var xcrnwTR = $(xcrnwTable).find("tr:eq(" + row + ")");
    var _this = $(xcrnwTR).find("td:eq(0)");
    var selectedTR = $(_this);
    var tempTable = $(varparent).find('#nwGridRows');
    if ($(varparent).find('#nwGridRows').html() != tempTable.html()) { return; }

    var isContinue = true;
    try {
        isContinue = func_nwGrid_InsertValidation();
    } catch (err) {
    }
    if (isContinue) {
        var varTRa = tempTable.find('tr:eq(0)').clone();
        nwGrid_ID += 1;
        varTRa.attr("aagRow" + nwGrid_ID);

        // var temptdindex = crnwTR.find(crnwTD).index();
        // var selectedTD = varTRa.find("td:eq(" + temptdindex + ")");

        if (addUp == undefined)
            addUp = true;

        if (addUp == true)
            varTRa.insertBefore(xcrnwTR);
        else
            varTRa.insertAfter(xcrnwTR);


        func_ListNumberFormat(xcrnwTable);
        try { isContinue = func_nwGrid_InsertDone(); } catch (err) { }
    }
}

$(document).on("click", ".nwGrid .nwgrid_CopyRow", function () {

    if ($(this).parents(".nwGrid").hasClass("noah-webui-disabled") || $(this).parents(".nwGrid").parent().hasClass("noah-webui-disabled"))
        return false;

    if ((getParameterByName("nwtype") || '') != "")
        return false;

    var selectedTR = $(this);
    crnwTable = $(this).parents(".nwGrid").find('.tblGridBody');
    var tempTable = $(this).parents(".nwGrid").find('#nwGridRows');
    var isContinue = true;

    if ($(crnwTD).parents(".nwGrid").find('#nwGridRows').html() != tempTable.html()) { return; }

    try {
        isContinue = func_nwGrid_CopyRowValidation();
    } catch (err) {
    }
    if (isContinue) {
        var varTRa = crnwTR.clone();
        nwGrid_ID += 1;
        varTRa.attr("aagRow" + nwGrid_ID);

        var temptdindex = crnwTR.find(crnwTD).index();
        var selectedTD = varTRa.find("td:eq(" + temptdindex + ")");

        varTRa.insertAfter(crnwTR);
        // varTRa.find(".nwgridSelected").removeClass("nwgridSelected");


        // alert($(varTRa).find(".nwhasDatePicker").length);

        $(varTRa).find(".hasDatepicker").attr("id", "");


        nwGrid_SetSelectedObjects(varTRa.find("td.nwgridSelected"));
        nwGrid_SetSelectedFunction();

        func_ListNumberFormat(crnwTable);
        try { isContinue = func_nwGrid_CopyRowDone(); } catch (err) { }
    }
    return false;
});


$(document).on("click", ".nwGrid .nwgrid_Delete", function () {
    if ($(this).parents(".nwGrid").hasClass("noah-webui-disabled") || $(this).parents(".nwGrid").parent().hasClass("noah-webui-disabled"))
        return false;

    if ((getParameterByName("nwtype") || '') != "")
        return false;

    var selectedTR = $(this);
    crnwTable = $(this).parent().parent().find('.tblGridBody');
    var tempTable = $(this).parents(".nwGrid").find('#nwGridRows');

    if ($(crnwTD).parents(".nwGrid").find('#nwGridRows').html() != tempTable.html()) { return; }


    var isContinue = true;
    try {
        isContinue = func_nwGrid_DeleteValidation();
    } catch (err) {
    }
    if (isContinue) {

        func_nwgrid_DeleteRow(crnwTD);


        try { func_nwGrid_DeleteDone(); } catch (err) { }
    }
    // alert($(this).parents(".nwGrid").find('.tblGridBody').find("tr").length +"@" + $(this).parents(".nwGrid").parent().attr("id"));
    if ($(this).parents(".nwGrid").find('.tblGridBody').find("tr").length <= 0) {
        //        var xinsert="";
        //        for(var i=0; i<$(this).parents(".nwGrid").find('#nwGridRows').find("tr:eq(0) td").length;i++ ){
        //            if(i>0) xinsert+="|";
        //            xinsert+="";
        //        }
        // nwLib.nwTempTable_AddRow($(this).parents(".nwGrid").parent().attr("id"),xinsert,"|");
        func_nwGridAddRowBut(this);
    }

    return false;
});

$(document).on("click", ".nwGrid .nwgrid_HeaderShowHide", function () {
    if ($(this).parents(".nwGrid").hasClass("noah-webui-disabled") || $(this).parents(".nwGrid").parent().hasClass("noah-webui-disabled"))
        return false;


    func_HideHeader(this);


    //nwGridSplitter


    /// $("#" + gridID).attr('nwsavecolumnID')
});

function func_HideHeader(_this) {
    var gridID = $(_this).parents(".nwGrid").attr("id");
    var buttonstatus = $(_this).attr('buttonstatus');
    var buttonindex = parseInt($(_this).attr('buttonindex'));


    if (buttonstatus == "true") {
        $("#" + gridID).addClass("nwGridHideHeader");
        $(_this).attr('buttonstatus', 'false');
        $(_this).text($(_this).attr('txtshow'));


        var headersize = 0;
        var hideheadersize = 0;
        var freezecount = $("#" + gridID).find(".tblGridBody tr.nwGridFreezeRow").length;

        for (var i = 0; i < buttonindex; i++) {
            $("#" + gridID).find(".tblGridBody tr:eq(" + i + ")").addClass("nwGridHideHeaderSub");
            $("#" + gridID).find(".tblGridBody tr:eq(" + i + ")").hide();
            hideheadersize += $("#" + gridID).find(".tblGridBody tr:eq(" + i + ")").height();
        }

        for (var i = buttonindex; i < freezecount; i++) {
            $("#" + gridID).find(".tblGridBody tr:eq(" + i + ")").addClass("nwGridRemainHeader");
            headersize += $("#" + gridID).find(".tblGridBody tr:eq(" + i + ")").height();
        }


        //hideheadersize -= 2;
        var sdata = parseInt(hideheadersize) - 7;
        if (freezecount >= 6) {
            var xdata = freezecount - 5;
            sdata = sdata - (xdata * 2.3);
        }
        //$("#" + gridID).append("<style id='" + gridID + "HeaderHide'>.nwGridSplitter{height:" + (headersize) + "px !important; } .nwGridRemainHeader{margin-top: -" + (sdata) + "px;}</style>");
        $("#" + gridID + " .nwGridSplitter").css("max-height", headersize + "px");
        $("#" + gridID + " .nwGridRemainHeader").css("margin-top", "-" + sdata + "px");


    }
    else {
        for (var i = 0; i < buttonindex; i++) {
            $("#" + gridID).find(".tblGridBody tr:eq(" + i + ")").show();
        }

        var freezecount = $("#" + gridID).find(".tblGridBody tr.nwGridFreezeRow").length;
        for (var i = 0; i < freezecount; i++) {
            $("#" + gridID).find(".tblGridBody tr:eq(" + i + ")").css("margin-top", "inherit");
        }

        $("#" + gridID).find(".tblGridBody").find(".nwGridSplitter").css("max-height", "inherit");

        $("#" + gridID).find(".tblGridBody tr.nwGridHideHeaderSub").removeClass("nwGridHideHeaderSub");
        $("#" + gridID).removeClass("nwGridHideHeader");
        $(_this).attr('buttonstatus', 'true');
        $(_this).text($(_this).attr('txthide'));

        $("#" + gridID + "HeaderHide").remove();
    }

    var xrow = $("#" + gridID).find(".tblGridBody tr").length;


}


$(document).on("click", ".nwGrid .nwgrid_SaveWidth", function () {
    if ($(this).parents(".nwGrid").hasClass("noah-webui-disabled") || $(this).parents(".nwGrid").parent().hasClass("noah-webui-disabled"))
        return false;

    if ((getParameterByName("nwtype") || '') != "")
        return false;


    if (($(this).parents(".nwGrid").attr('isresize') || '') != "1") {
        MessageBox("No changes have been made.", "Save Column Width");
        return false;
    }
    nwLoading_Start("actnwSaveColWidth", crLoadingHTML);


    var nwsavecolumnID = $(this).parents(".nwGrid").attr('nwsavecolumnID');
    if (nwsavecolumnID == "aagExportToExcel")
        nwsavecolumnID = crLnkGateKey + "-ExportExcel";



    var gridID = $(this).parents(".nwGrid").attr("id");
    nwParameter_Add("nwMenuID", nwsavecolumnID);
    nwParameter_Add("nwvarColWidth", nwgridGetColWith(this));
    var standardCrLnk = crSTDLnk;
    func_ActionDriven("actnwSaveColWidth", false, standardCrLnk);
    $(this).parents(".nwGrid").attr('isresize', 0);
    $(this).parents(".nwGrid").attr('isresetsize', 1);
    return false;
});
var xdelobj;
$(document).on("click", ".nwGrid .nwgrid_ResetWidth", function () {

    if ($(this).parents(".nwGrid").hasClass("noah-webui-disabled") || $(this).parents(".nwGrid").parent().hasClass("noah-webui-disabled"))
        return false;

    if ((getParameterByName("nwtype") || '') != "")
        return false;


    if (($(this).parents(".nwGrid").attr('isresize') || '') == "1"
        || ($(this).parents(".nwGrid").attr('isresetsize') || '1') == "1"
        ) {
    }
    else {
        MessageBox("No changes have been made.", "Reset Column Width");
        return false;
    }
    nwLoading_Start("actnwResetColWidth", crLoadingHTML);

    xdelobj = this;
    nwgridResetColWith(xdelobj);

    var gridID = $(this).parents(".nwGrid").attr("id");

    //$('#' + gridID).find('table.tblGridBody tr.nwGridFreezeRow td').attr("style", "width:initial !important;min-width:initial !important;max-width:initial !important;");


    //$('#' + gridID + ' table.tblGridBody tr.nwGridFreezeRow td').each(function (index) {
    //    $(this).css("width", "initial !important");
    //    $(this).css("min-width", "initial !important");
    //    $(this).css("max-width", "initial !important");
    //});


    $('#' + gridID + ' table.tblGridBody tr.nwGridFreezeRow td:not(.nwGridRownum )').each(function (index) {

        //console.log($(this).text() + ":" + index);
        var tdindex = $(this).parent().find(this).index();
        var srt = $(this).attr("style");
        var colgroup = $(this).parents('.tblGridBody').find('colgroup.colgroup');

        var xcounterPRight = $(this).css("padding-right").replace("px", "");
        var xcounterPLeft = $(this).css("padding-left").replace("px", "");

        var xwidth = parseFloat($(colgroup).find('col:eq(' + tdindex + ')').css('width').replace("px", "")) - (parseFloat(xcounterPRight) + parseFloat(xcounterPLeft));
        xwidth = parseFloat(xwidth) - (parseFloat(xcounterPRight) + parseFloat(xcounterPLeft));
        xwidth = xwidth - 1;
        xwidth = xwidth + "px";

        srt += ";width:" + xwidth + " !important; min-width:" + xwidth + " !important; max-width:" + xwidth + " !important;"
        $(this).attr("style", srt);
    });



    $("#" + gridID).find(".nwGridFreezeRow").removeClass("nwGridFreezeRow");
    $("#" + gridID).find(".nwGridSplitter").remove();

    setTimeout(function () {
        ////console.log("gridID:" + gridID);


        //var xdata = $('#' + gridID).find('.tblGridHeader colgroup col').length;
        //var borderWidth = 3;
        //for (var i = 1; i < xdata; i++) {

        //    var xwidth = $('#' + gridID).find('.tblGridHeader colgroup col:eq(' + i + ')').css("width");
        //    xwidth = xwidth.replace("px", "");
        //    xwidth = parseFloat(xwidth) - borderWidth;
        //    xwidth = xwidth + "px";
        //   // $('#' + gridID + ' .tblGridBody tr.nwGridFreezeRow td:nth-child(' + (i + 1) + '):not(.nwGridMergeTD)').css("width", xwidth);

        //    xwidth = $('#' + gridID).find('.tblGridHeader colgroup col:eq(' + i + ')').css("min-width");
        //    xwidth = xwidth.replace("px", "");
        //    xwidth = parseFloat(xwidth) - borderWidth;
        //    xwidth = xwidth + "px";
        //    //$('#' + gridID + ' .tblGridBody tr.nwGridFreezeRow td:nth-child(' + (i + 1) + '):not(.nwGridMergeTD)').css("min-width", xwidth);

        //    xwidth = $('#' + gridID).find('.tblGridHeader colgroup col:eq(' + i + ')').css("max-width");
        //    xwidth = xwidth.replace("px", "");
        //    xwidth = parseFloat(xwidth) - borderWidth;
        //    xwidth = xwidth + "px";
        //   // $('#' + gridID + ' .tblGridBody tr.nwGridFreezeRow td:nth-child(' + (i + 1) + '):not(.nwGridMergeTD)').css("max-width", xwidth);
        //}




        var obj = $("#" + gridID).find(".nwGridData");
        var colNum = obj.attr("freezecol");
        var rowNum = obj.attr("freezerow");
        $("#" + gridID).find(".nwGridFreezeRow").removeClass("nwGridFreezeRow");
        $("#" + gridID).find(".nwGridSplitter").remove();

        nwGrid_TableFreeze(gridID, colNum, rowNum, false);

        nwGrid_makeResize(gridID);
        nwGrid_MergeResize(gridID);


    }, 400);

    var nwsavecolumnID = $(this).parents(".nwGrid").attr('nwsavecolumnID');
    if (nwsavecolumnID == "aagExportToExcel")
        nwsavecolumnID = crLnkGateKey + "-ExportExcel";


    nwParameter_Add("nwMenuID", nwsavecolumnID);
    var standardCrLnk = crSTDLnk;

    func_ActionDriven("actnwResetColWidth", false, standardCrLnk);
    $(this).parents(".nwGrid").attr('isresize', 0);
    $(this).parents(".nwGrid").attr('isresetsize', 0);

    return false;
});

function nwgridGetColWith(ver) {
    var ColWidth = " ";
    var gridID = $(ver).parents(".nwGrid").attr("id");
    var isGroup = false;
    var xcount = 0;
    if ($('#' + gridID + ' .nwgrid_columnheaderGroup').html() != undefined)
        isGroup = true;


    if (isGroup == true) xcount = $('#' + gridID + ' table.tblGridHeader colgroup.colgroup col').length;
    else xcount = $('#' + gridID + ' table.tblGridHeader colgroup.colgroup col').length;

    //console.log(gridID + " " + xcount + " " + isGroup);
    for (xctr = 1; xctr < xcount; xctr++) {
        if (isGroup == true)
            ColWidth += $('#' + gridID + ' table.tblGridHeader colgroup.colgroup col:eq(' + xctr + ')').css("width").replace("px", "") + '|';
        else
            ColWidth += $('#' + gridID + ' table.tblGridHeader colgroup.colgroup col:eq(' + xctr + ')').css("width").replace("px", "") + '|';
    }

    return ColWidth.substring(1, ColWidth.length - 1);
}

function nwgridResetColWith(ver) {
    var ColWidth = " ";
    var gridID = $(ver).parents(".nwGrid").attr("id");
    var isGroup = false;
    var xcount = 0;
    if ($('#' + gridID + ' .nwgrid_columnheaderGroup').html() != undefined)
        isGroup = true;

    if (isGroup == true) xcount = $('#' + gridID + ' table.tblGridHeader colgroup.colgroup col').length;
    else xcount = $('#' + gridID + ' table.tblGridHeader colgroup.colgroup col').length;

    for (xctr = 1; xctr < xcount; xctr++) {
        var xval = $('#' + gridID + ' table.tblGridHeader colgroup.colgroup col:eq(' + xctr + ')').attr("nwcol");
        $('#' + gridID + ' table.tblGridHeader colgroup.colgroup col:eq(' + xctr + ')').css("width", xval);
        $('#' + gridID + ' table.tblGridHeader colgroup.colgroup col:eq(' + xctr + ')').css("max-width", xval);
        $('#' + gridID + ' table.tblGridHeader colgroup.colgroup col:eq(' + xctr + ')').css("min-width", xval);

        $('#' + gridID + ' table.tblGridBody colgroup.colgroup col:eq(' + xctr + ')').css("width", xval);
        $('#' + gridID + ' table.tblGridBody colgroup.colgroup col:eq(' + xctr + ')').css("max-width", xval);
        $('#' + gridID + ' table.tblGridBody colgroup.colgroup col:eq(' + xctr + ')').css("min-width", xval);

    }

}

$(document).on("click", ".nwgrid_buttonCustom", function (e) {
    if ((getParameterByName("nwtype") || '') != "")
        return false;

    if ($(this).parents(".nwGrid").hasClass("noah-webui-disabled") || $(this).parents(".nwGrid").parent().hasClass("noah-webui-disabled"))
        return false;

    var gridID = $(this).attr("nwid");

    try {
        func_nwGrid_CustomButton(gridID);
    } catch (err) { }

    return false;
});

$(document).on("keypress", ".nwgrid_Search", function (e) {

    // alert(e.which);
    if (e.which == 13) {
        var nwgridID = $(this).parents(".nwGrid").parent().attr("id");
        var nwinstance = $(this).parents(".nwGrid").attr("nwinstance");

        var nwpagerheader = $(this).parents(".nwGrid").attr("nwpagerheader");

        grid_nwpagerheader = nwpagerheader;
        var grid_obj = this;
        $(grid_obj).parents(".nwGrid").attr("nwpagerindex", grid_nwpagecurrent);
        $(grid_obj).parents(".nwGrid").find(".nwgridcrindex").prop("disabled", true);
        $(grid_obj).parents(".nwGrid .nwGridBlocker").remove();
        $(grid_obj).parents(".nwGrid").append("<div class='nwGridBlocker'></div>");


        grid_nwpagerheaderHTML = "";

        for (var i = 0; i < grid_nwpagerheader; i++) {
            grid_nwpagerheaderHTML += $(grid_obj).parents(".nwGrid").find(".tblGridBody tbody").find("tr:eq(" + i + ")").outerHTML();
        }
        try {
            grid_nwpagerheaderHTMLHeight = $(grid_obj).parents(".nwGrid").find('.nwGridSplitter').outerHTML();
        } catch (err) { }
        try {
            if (grid_nwpagefromIndex == 1)
                grid_nwpagerheaderHTMLStyle = $('#nwGridAttr' + $(grid_obj).parents(".nwGrid").attr("id")).html();

        } catch (err) { }



        nwParameter_Add("nwgridID", nwgridID);
        nwParameter_Add("nwinstance", nwinstance);
        nwParameter_Add("txtSearch", $(this).val());
        nwParameter_Add("nwpagerheader", nwpagerheader);
        var standardCrLnk = crSTDLnk;

        func_nwGridPager($(this), "nwsearch");
        //nwsearch
        //func_ActionDriven("actnwGridSearch", false, standardCrLnk);
        return false;
    }


});





$(document).on("click", ".nwGrid .nwCheckBoxTot", function () {
    var PID = $(this).parents(".nwGrid");
    var xIndex = $(this).parents("th").index();
    var isChecked = $(this).prop("checked");
    //isChecked

    var isContinue = true;

    try { isContinue = func_nwGrid_CheckBoxHeaderValidation($(this)); } catch (err) { }
    if (isContinue) {
        $(PID).find(".tblGrid_Panel1 .nwCheckBox" + xIndex + ":enabled").prop("checked", isChecked);

        var nwinstance = $(PID).attr("nwinstance");

        nwParameter_Add("xColumnIndex", xIndex);
        nwParameter_Add("isChecked", isChecked);
        nwParameter_Add("gridID", PID);
        nwParameter_Add("nwinstance", nwinstance);
        nwParameter_Add("nwaagSessionID", baseSessionID);
        var standardCrLnk = crSTDLnk;
        func_ActionDriven("actnwCheckBoxTot", false, standardCrLnk);


        /// function func_nwGrid_CheckBoxHeaderDone(nwgrid)
    }
});

$(document).on("click", ".nwGrid .nwCheckBox", function () {
    var PID = $(this).parents(".nwGrid");
    var xIndex = $(this).parents("td").index();
    var isChecked = $(this).prop("checked");

    var xTotal = $('input.nwCheckBox' + xIndex + '').length;
    var xTotalCheck = $('input.nwCheckBox' + xIndex + ':checked').length;

    if (xTotalCheck == xTotal) {
        $(PID).find(".nwCheckBoxTot" + xIndex + "").prop("checked", true);
        //alert( $(PID).find(".nwCheckBoxTot" +xIndex+"").prop("checked"));
    }
    else
        $(PID).find(".nwCheckBoxTot" + xIndex + "").prop("checked", false);
});


function func_nwGrid_ColumnHide(nwgridID, index) {
    nwgridID = nwgridID.replace("#", "");
    try { nwgridID = nwgridID.replace(" ", ""); }
    catch (err) { }
    crnwTable = $("#" + nwgridID + " .nwGrid").find('.tblGridBody');
    if (crnwTable == null) {
        crnwTable = $("#" + nwgridID + ".nwGrid").find('.tblGridBody');
        if (crnwTable == null) return false;
    }
    try {
        $("#aag" + nwgridID + "_col" + index).remove();
    } catch (err) { }

    var xscript = "<style id=\"aag" + nwgridID + "_col" + index + "\">#" + nwgridID + " .tblGrid_Panel1 .tblGridBody tr.nwGridFreezeRow td:nth-child(" + (index + 1) + ")";
    xscript += ",#" + nwgridID + " .tblGrid_Panel1 .tblGridBody tr td:nth-child(" + (index + 1) + ")";
    xscript += ",#" + nwgridID + " .tblGrid_Panel1 .tblGridBody col:nth-child(" + (index + 1) + ")";
    xscript += "{min-width: 0px !important;width: 0px !important; max-width: 0px !important;display:none}";

    xscript += "#" + nwgridID + "  .tblGridHeader tr th:nth-child(" + (index + 1) + ")";
    xscript += ",#" + nwgridID + "  .tblGridHeader  col:nth-child(" + (index + 1) + ")";
    xscript += "{min-width: 0px !important;width: 1px !important; max-width: 0px !important;display: none;}";
    //overflow:hidden;padding: 0;padding: 0;visibility: hidden;position:fixed
    xscript += "</style>";

    $("#nwStyleHeader").append(xscript);
    nwGrid_TableAdjust(nwgridID);
}
function func_nwGrid_ColumnShow(nwgridID, index) {
    nwgridID = nwgridID.replace("#", "");
    try { nwgridID = nwgridID.replace(" ", ""); }
    catch (err) { }
    crnwTable = $("#" + nwgridID + " .nwGrid").find('.tblGridBody');
    if (crnwTable == null) {
        crnwTable = $("#" + nwgridID + ".nwGrid").find('.tblGridBody');
        if (crnwTable == null) return false;
    }

    try {
        $("#aag" + nwgridID + "_col" + index).remove();
        nwGrid_TableAdjust(nwgridID);
    } catch (err) { }

}
function func_nwGrid_FontBold(nwgridID, rowindex, colindex, validity) {
    nwgridID = nwgridID.replace("#", "");
    rowindex = rowindex - 1;
    try { nwgridID = nwgridID.replace(" ", ""); }
    catch (err) { }
    crnwTable = $("#" + nwgridID + " .nwGrid").find('.tblGridBody');
    if (crnwTable == null || crnwTable.html() == undefined) {
        crnwTable = $("#" + nwgridID + ".nwGrid").find('.tblGridBody');
        if (crnwTable == null) return false;
    }
    //alert(validity + " @@@ " +crnwTable.html() );


    try {
        if (validity == true)
            crnwTable.find("tr:eq(" + rowindex + ") td:eq(" + colindex + ")").css("font-weight", "bold");
        else
            crnwTable.find("tr:eq(" + rowindex + ") td:eq(" + colindex + ")").css("font-weight", "normal");

    } catch (err) {
        //alert(err);
    }

}




function nwGrid_RemoveRow(nwgridID, from, to) {
    return func_nwGrid_RemoveRow(nwgridID, from, to);
}

function func_nwGrid_RemoveRow(nwgridID, from, to) {
    crnwTable = $("#" + nwgridID + "").find('.tblGridBody');
    try {

        crnwTable.find("tr").slice(from, to).remove();
        func_ListNumberFormat(crnwTable);
    } catch (err) { alert(err); }
}



function nwGrid_AddRow(nwgridID, count) {
    return func_nwGrid_AddRow(nwgridID, count);
}

function func_nwGrid_AddRow(nwgridID, count) {
    try { nwgridID = nwgridID.replace(" ", ""); }
    catch (err) { }
    crnwTable = $("#" + nwgridID + " .nwGrid").find('.tblGridBody');
    if (crnwTable == null || crnwTable.html() == undefined) {
        crnwTable = $("#" + nwgridID + ".nwGrid").find('.tblGridBody');

        if (crnwTable == null) return false;
    }

    var tempTable = $("#" + nwgridID + " .nwGrid").find('#nwGridRows');

    if (tempTable == null || tempTable.html() == undefined) {
        tempTable = $("#" + nwgridID + ".nwGrid").find('#nwGridRows');
        if (tempTable == null) return false;
    }
    //alert(nwgridID + " - " +tempTable.html());


    var isContinue = true;
    try {
        isContinue = func_nwGrid_AddNewValidation();
    } catch (err) {
    }
    if (isContinue) {
        var xcounter = 1;
        if (count != undefined) {
            xcounter = count;
        }
        try {
            for (var i = 0; i < xcounter; i++) {
                var varTRa = tempTable.find('tr:eq(0)').clone();
                nwGrid_ID += 1;

                varTRa.attr("aagRow" + nwGrid_ID);
                crnwTable.append(varTRa);
            }
        } catch (err) {
            //alert(err);
        }

        func_ListNumberFormat(crnwTable);
        try { func_nwGrid_AddNewDone(); } catch (err) { }
    }
    return false;
}





$(document).on("click", ".nwGrid .tblGridBody button", function (event) {
    event.preventDefault();
    return;
});

$(document).on("click", ".tblGridBody .nwGrid_Delete", function () {


    var selectedTR = $(this);
    crnwTD = $(this).parent();
    crnwTR = $(this).parent().parent();
    crnwTable = $(this).parent().parent().parent().parent();
    var isContinue = true;
    try {
        isContinue = func_nwGrid_Delete();
    } catch (err) {
    }
    if (isContinue) {
        var x = crnwTable.find('tr').length;
        if (x <= 1) {
            crnwTR.remove();
        }
        else {

            crnwTR.remove();
            func_ListNumberFormat(crnwTable);
        }
        try {
            func_nwGrid_DeleteFinal();
        } catch (err) {
        }
    }
    return false;
});

function func_nwgrid_DeleteRow(ver) {

    crnwTD = ver;
    crnwTR = $(ver).parents("tr");
    crnwTable = $(ver).parents("table");
    crnwTableCon = $(ver).parents(".nwGrid");

    var isContinue = true;
    try {
        isContinue = func_nwGrid_Delete();
    } catch (err) {
    }

    if (isContinue) {
        var x = crnwTable.find('tr').length;
        var tempTRidnex = crnwTR.index();
        var tempTDidnex = crnwTR.find(crnwTD).index();

        if (x <= 1) {
            crnwTR.remove();
        }
        else {
            crnwTR.remove();
            func_ListNumberFormat(crnwTable);
        }
        try {
            func_nwGrid_DeleteFinal();
        } catch (err) {
        }



        crnwTR = $(crnwTable).find("tr:eq(" + tempTRidnex + ")");

        crnwTD = $(crnwTR).find("td:eq(" + tempTDidnex + ")");
        $('.tblGridBody tr td').removeClass('nwgridSelected');
        $('.tblGridBody tr').removeClass('nwgridSelected');

        crnwTD.addClass('nwgridSelected');
        crnwTR.addClass('nwgridSelected');

    }
}

$(document).on("click", ".nwGrid .nwgrid_Export", function () {
    if ($(this).parents(".nwGrid").hasClass("noah-webui-disabled") || $(this).parents(".nwGrid").parent().hasClass("noah-webui-disabled"))
        return false;
    if ((getParameterByName("nwtype") || '') != "")
        return false;

    func_nwGrid_Export(this, "excel");
    return false;
});

function func_nwGrid_Export(ver, typex) {
    var isContinue = true;
    try {
        isContinue = func_nwGrid_ExportValidation();
    } catch (err) {
    }
    if (isContinue) {
        var xsession = $(ver).parents(".nwGrid").attr("nwinstance");
        ExportSessionID = xsession;
        var xID = $(ver).parents(".nwGrid").attr("id");



        if (typex == "excel")
            func_ExportToExcel(xID);
        else
            func_ExportToCSV(xID);


        try { isContinue = func_nwGrid_ExportDone(); } catch (err) { }
    }
}

function func_ExportisClient() {
    var svar = false;
    try {
        svar = p8Spread_JSExport;
    } catch (err) { }
    return svar;
}

function func_ExportGrid(gridID) {
    var gridInstance = $("#" + gridID).attr("id");
    if (gridInstance == undefined)
        gridInstance = $("#" + gridID).find(".nwGrid").attr("id");
    if (gridInstance == undefined) return;

    $('#nwExportContainerMainText').attr("gridtype", "");

    try {
        if (p8Spread_JSPrint == true) {
            $("#btnnwExportPrintBut").show();
            $("#nwExportContainerMainBut").width(385);
        } else {
            $("#btnnwExportPrintBut").hide();
            $("#nwExportContainerMainBut").width(0);
        }
    } catch (err) { }



    if ($("#" + gridID).hasClass("P8Spread")) {

        if (func_ExportisClient()) {

        } else {
            func_ExportPrepareData(gridID);
        }
        $('#nwExportContainerMainText').attr("gridtype", "spread");
        var strdata = false;
        try {
            strdata = p8Spread_JSExport;
        } catch (err) { }
        if (ExportSessionID == "" && strdata)
            $('#nwExportContainerMainText').val(gridInstance);
        else
            $('#nwExportContainerMainText').val(ExportSessionID);

    }
    else {
        $('#nwExportContainerMainText').val(gridInstance);
    }
    nwPopupForm_ShowModal("nwExportContainerMainBut");
    //$('#nwExportContainerMainBut').css("top", "100px");
}

function func_ExportPrepareData(gridID) {
    nwParameter_Add_Spread(P8DataList[gridID][0].sheet);
    nwParameter_Add("spreadID", gridID);
    nwParameter_Add("filename", $("#" + gridID).attr("p8title"));
    ExportSessionID = gridID + "-" + nwRandomString(50);
    nwParameter_Add("ExportSessionID", ExportSessionID);
    var standardCrLnk = crSTDLnk;
    nwLoading_Start("actExportConfigs", crLoadingHTML);
    func_ActionDriven("actExportConfigs", false, standardCrLnk);
}

function fn_ExportGrid(gridID) {
    nwLoading_Start("actExportExcelConfigSetup", crLoadingHTML);


    setTimeout(function () {
        func_ExportGrid(gridID);
        nwLoading_End("actExportExcelConfigSetup");
    }, 100);
}



$(document).on("click", "#btnnwExportBut", function () {
    var xsession = $('#nwExportContainerMainText').val();
    var gridtype = $('#nwExportContainerMainText').attr("gridtype");
    func_ExportToExcel(xsession, gridtype);

    nwPopupForm_HideModal("nwExportContainerMainBut");
    return false;
});
$(document).on("click", "#btnnwExportCSVBut", function () {
    var xsession = $('#nwExportContainerMainText').val();
    var gridtype = "spread";//$('#nwExportContainerMainText').attr("gridtype");
    func_ExportToCSV(xsession, gridtype);
    nwPopupForm_HideModal("nwExportContainerMainBut");
    return false;
});

$(document).on("click", "#btnnwExportPrintBut", function () {
    var xsession = $('#nwExportContainerMainText').val();
    var gridtype = $('#nwExportContainerMainText').attr("gridtype");
    func_ExportToPrint(xsession, gridtype);
    nwPopupForm_HideModal("nwExportContainerMainBut");
    return false;
});






////////////////////////// Table end


$(document).on("click", "button.nwButton", function () {
    return false;
});
$(document).on("mousedown", "button.nwButton", function () {
    return false;
});

$(document).on("focus", ".isNumber", function () {

    var wholenumber = -1;
    try {
        if ($(selectedInput).attr("nwwhole") != undefined) {
            wholenumber = parseInt($(selectedInput).attr("nwwhole"));
            if (wholenumber == 0) wholenumber = 1;
            if (wholenumber == NaN) wholenumber = -1;
        }
    } catch (err) { }

    var isnegative = false;
    var xxz = $(this).val();
    if (xxz.indexOf("-") >= 0) isnegative = true;
    xxz = xxz.replaceAll("%", "").replaceAll("`", "").replaceAll("'", "").replaceAll("-", "");
    var xxRet = xxz.split('.');
    var xers = 0;

    if (xxRet[0].length <= wholenumber) {
        $(this).attr("nwoldvalue", $(this).val());
    }

    return false;
});

var global_IsNumberDefault = 0;
$(document).on("change", ".isNumber", function () {
    var selectedInput = $(this);
    var xtag = selectedInput.attr("nwdp");

    if (xtag == undefined && global_IsNumberDefault == 1) xtag = 0;

    func_isnumber_makenumeric(selectedInput, xtag);

    if ($(this).hasClass("nwNegative") == false) {
        try {
            $(selectedInput).val($(selectedInput).val().replace("-", ""));
        } catch (err) { }
    }

    if ($(this).hasClass("hasDatepicker")) return true;
    $(this).val(nwremoveNumber($(selectedInput).val()));
});


$(document).on("focus", ".isNumber.numC", function () {
    var selectedInput = $(this);
    selectedInput.val(selectedInput.val().replace(/,/g, ''));
    selectedInput.val(selectedInput.val().replace(/undefined/g, ''));
    $(this).select();

    return false;
});


$(document).on("focusout", ".isNumber.numC", function () {
    var selectedInput = $(this);
    var xtag = selectedInput.attr("nwdp");
    var x = func_isnumber_makenumeric(selectedInput, xtag);

    if (x == false) return false;
});

$(document).on("focus", ".isNumber.nwPercent", function () {
    var selectedInput = $(this);
    selectedInput.val(selectedInput.val().replace(/,/g, ''));
    selectedInput.val(selectedInput.val().replace(/%/g, ''));
    selectedInput.val(selectedInput.val().replace(/undefined/g, ''));
    $(this).select(); return false;
});

$(document).on("focusout", ".isNumber.nwPercent", function () {
    var selectedInput = $(this);
    var xtag = selectedInput.attr("nwdp");
    func_isnumber_makenumeric(selectedInput, xtag);
});

//$(document).on("propertychange extChange ", ".isNumber.numC,.isNumber.nwPercent", function() {
//    var selectedInput = $(this);
//    var xtag = selectedInput.attr("nwdp");
//    func_isnumber_makenumeric(selectedInput, xtag);
//});

//$(".isNumber.numC").on('input propertychange', function() {
//    //$(this).trigger(keyup);
//// do ajax call here
//var selectedInput = $(this);
//var xtag = selectedInput.attr("nwdp");
//func_isnumber_makenumeric(selectedInput, xtag);
//});
$(document).on("click", ".nwGridSheetCon", function () {
    $(this).parents(".nwGridListPager").find('.nwGridSheetCon').removeClass("nwGSSelected");
    var xindex = $(this).index() - 1;
    $(this).parents(".nwGridListPager").parent().find(".nwGridListItem").hide();
    $(this).parents(".nwGridListPager").parent().find(".nwGridListItem:eq(" + xindex + ")").show();
    $(this).addClass("nwGSSelected");
});

var nwgrindconsize = 162;
var nwgrindconmargin = 0;
//                p8count p8curentsel
// nwGridListPager

function nwGridList_getwidth(xparent, xindex) {
    var xwidth = 0;

    for (var i = 0; i <= xindex; i++) {
        xwidth += $(xparent).find(".nwGridSheetCon:eq(" + i + ")").width() + nwgrindconmargin;
    }

    return xwidth;
}

$(document).on("click", ".nwGridList-first", function () {
    var listpager = $(this).parents(".nwGridListPager");
    var scrollxindex = $(this).parents("div.nwGridListPager").scrollLeft();
    var totalcount = $(this).parents("div.nwGridListPager").attr("p8count");
    var curreindex = $(this).parents("div.nwGridListPager").attr("p8curentsel");
    curreindex = 0;
    scrollxindex = nwgrindconsize * (curreindex);


    $(this).parents("div.nwGridListPager").attr("p8curentsel", (curreindex + 1));
    $(this).parents("div.nwGridListPager").scrollLeft(scrollxindex);
    $(this).parents("div.nwGridListNavControl").css("left", scrollxindex);
    $(listpager).find("div.nwGridSheetCon:eq(0)").css("margin-left", "");
});
$(document).on("click", ".nwGridList-previous", function () {
    var listpager = $(this).parents(".nwGridListPager");
    var scrollxindex = $(this).parents("div.nwGridListPager").scrollLeft();
    var totalcount = $(this).parents("div.nwGridListPager").attr("p8count");
    var curreindex = $(this).parents("div.nwGridListPager").attr("p8curentsel");
    var maxScroll = $(this).parents(".nwGridListConNav").width() - $(this).parents(".nwGridListPager").width();
    curreindex = parseInt(curreindex);
    totalcount = parseInt(totalcount);
    if (parseInt(curreindex) <= 1) return false;
    curreindex -= 1;
    scrollxindex = nwgrindconsize * (curreindex - 1);
    //scrollxindex=nwGridList_getwidth(listpager, (curreindex-1));

    while (scrollxindex >= maxScroll) {
        curreindex -= 1;
        scrollxindex = nwgrindconsize * (curreindex - 1);
        //  scrollxindex=nwGridList_getwidth(listpager, curreindex);
    }

    $(this).parents("div.nwGridListPager").attr("p8curentsel", (curreindex));
    $(this).parents("div.nwGridListPager").scrollLeft(scrollxindex);
    $(this).parents("div.nwGridListNavControl").css("left", $(this).parents("div.nwGridListPager").scrollLeft());
});
$(document).on("click", ".nwGridList-next", function () {
    var listpager = $(this).parents(".nwGridListPager");
    var scrollxindex = $(this).parents("div.nwGridListPager").scrollLeft();
    var totalcount = $(this).parents("div.nwGridListPager").attr("p8count");
    var curreindex = $(this).parents("div.nwGridListPager").attr("p8curentsel");
    curreindex = parseInt(curreindex);
    totalcount = parseInt(totalcount);
    if (parseInt(curreindex) >= parseInt(totalcount)) return false;
    curreindex += 1;
    scrollxindex = nwgrindconsize * (curreindex);
    //scrollxindex=nwGridList_getwidth(listpager, (curreindex-1));

    $(this).parents("div.nwGridListPager").attr("p8curentsel", (curreindex));
    $(this).parents("div.nwGridListPager").scrollLeft(scrollxindex);
    $(this).parents("div.nwGridListNavControl").css("left", $(this).parents("div.nwGridListPager").scrollLeft());
});

$(document).on("click", ".nwGridList-last", function () {
    var listpager = $(this).parents(".nwGridListPager");
    var scrollxindex = $(this).parents("div.nwGridListPager").scrollLeft();
    var totalcount = $(this).parents("div.nwGridListPager").attr("p8count");
    var curreindex = $(this).parents("div.nwGridListPager").attr("p8curentsel");
    curreindex = parseInt(curreindex);
    totalcount = parseInt(totalcount);
    scrollxindex = nwgrindconsize * (totalcount);
    scrollxindex = nwGridList_getwidth(listpager, curreindex);

    $(this).parents("div.nwGridListPager").attr("p8curentsel", (totalcount));
    $(this).parents("div.nwGridListPager").scrollLeft(scrollxindex);
    $(this).parents("div.nwGridListNavControl").css("left", $(this).parents("div.nwGridListPager").scrollLeft());

});



var crFormulaCellSelected = "";
$(document).on("keydown", ".nwGrid .tblGridBody input,.nwGrid .tblGridBody textarea", function (e) {

    if (e.which == 13 && e.shiftKey == false && !$(this).hasClass("nwtexteareEnter")) {

        //$('#nwInputDisableR').focus();
        var isContinue = true;
        try {
            isContinue = func_nwGrid_CellEnter();
        } catch (err) {
        }
        if (isContinue || isContinue == undefined)
            $(this).blur();
    }

});

var xxxx = 0;
var xformulaCellVal = ""; var xformulaCellClickVal = "";
$(document).on("focus", ".nwGrid .tblGridBody input,.nwGrid .tblGridBody textarea", function (e) {
    xformulaCellClickVal = $(this).val();
    var xxx = $(this).attr("nwFormula");
    if (xxx == undefined) return;
    xxx = xxx.toUpperCase();
    xxx = xxx.replace(" ", "");
    crFormulaCellSelected = "";

    if (xxx.indexOf("=") == 0) {
        $(this).val(xxx);
    }

    //;

    ////$(document).on("focusout", ".nwGrid input,.nwGrid textarea", function(e) {
    ////        $(this).blur();
    ////});

    //$(document)
    xformulaCellVal = $(this).val();

});
//.on("blur", ".nwGrid input,.nwGrid textarea", function(e) {        
//});

$(document).on("blur", ".nwGrid .tblGridBody input,.nwGrid .tblGridBody textarea", function (e) {
    // console.log("aaa");
    if (xformulaCellVal == $(this).val() && $(this).val() != "") {
        //alert(xformulaCellVal);
        xformulaCellVal == "";
        if ($(this).val() == "") return;

        if ($(this).val().indexOf("=") == 0) {

            $(this).attr("nwFormula", $(this).val());
            $(this).val(xformulaCellClickVal);
        }
        else {
            if ($(this).val() == xformulaCellClickVal) {
                xformulaCellClickVal = ""; xformulaCellVal == "";
                return;
            }
        }


        return
    }
    xformulaCellVal == "";


    var xxx = $(this).val();

    var xcol = $(this).parents("td").index();
    var xrow = $(this).parents("tr").index() + 1;
    var xcell = "";
    try {
        xcell = GetLetterByNumber(xcol, true) + xrow;
    }
    catch (err) { }

    // alert(xcell); 


    if (xxx.indexOf("=") == 0) {
        isNotFormula = false;
        func_FormulaLoad(this, e);
    }
    else {

        isNotFormula = true;
        var xClass = ".aagF" + xcell;
        var xcounter = $(this).parents(".nwGrid").find(xClass).length;
        // alert(xcounter + " " + xClass );

        for (var i = 0; i < xcounter; i++) {
            var obj = $(this).parents(".nwGrid").find(xClass + ":eq(" + i + ")");
            // obj.focus();
            func_FormulaLoad(obj, e, true);
        }
        isNotFormula = false;
        $(this).attr("nwFormula", "");
    }


});

var isNotFormula = true;



function func_FormulaLoad(obj, e, xTER) {

    var xcol = $(obj).parents("td").index();
    var xrow = $(obj).parents("tr").index() + 1;
    var xcell = "";

    try {
        xcell = GetLetterByNumber(xcol, true) + xrow;
    }
    catch (err) { }


    if (crFormulaCellSelected == xcell && isNotFormula == false) {
        MessageBox("Circular Reference Warning. \nThis action is not permitted!" + crFormulaCellSelected, "", "warning");
        crFormulaCellSelected = "";
        func_GetFormulaRefClear(obj);
        //  $(obj).attr("nwFormula","");
        return;
    }

    var xxx = $(obj).val();
    if (xTER == true) xxx = $(obj).attr("nwFormula");
    else crFormulaCellSelected = xcell;

    xxx = xxx.toUpperCase();
    xxx = xxx.replace(" ", "");

    //   alert(GetLetterByNumber(10,true) );
    $(obj).attr("aagFCon", "");

    if (xxx.indexOf("=") == 0) {
        var strError = "";
        try {
            $(obj).val("");
            var xtemp = "";
            xtemp = xxx.replaceAll("=", "").replaceAll("(", "#aag#").replaceAll(")", "#aag#").replaceAll("-", "#aag#").replaceAll("*", "#aag#").replaceAll("/", "#aag#").replaceAll("+", "#aag#");
            var xArry = xtemp.split("#aag#");
            var xArryVal = xtemp.split("#aag#");


            var crFormulaFunc = "";
            var crFormulaFuncTemp = "";
            var xval = "";
            for (var i = 0; i < xArry.length; i++) {
                try {
                    var importantCell = xArry[i];
                    xval = "";

                    crFormulaFuncTemp = func_GetFormulaFunc(importantCell);

                    if (crFormulaFuncTemp != "") { crFormulaFunc = crFormulaFuncTemp; continue; }

                    // Custom Function    like SUM
                    if (crFormulaFunc != "") {
                        try {
                            // get whole value of Custom Function
                            xval = func_GetFormulaRangeValue(importantCell, obj, crFormulaFunc);
                        } catch (err) {
                            xval = "";
                            //  xval = err;
                        }
                        if (xval == undefined || xval == "undefined" || xval == "") xArryVal[i] = "0";
                        else xArryVal[i] = xval + "";

                        // alert(xval + "@"+i);

                        crFormulaFunc = "";
                        continue;
                    }
                    // Custom Function 



                    var cellIndexConverted = cellA1ToIndex(importantCell);

                    xval = nwLib.nwTempTable_RowData_Get($(obj).parents(".nwGrid").parent().attr("id"), cellIndexConverted.row, cellIndexConverted.col, "input");



                    if (xval == undefined || xval == "undefined" || xval == "" || xval == "NaN" || xval == NaN) xArryVal[i] = "0";
                    else {
                        try {
                            xval = nwNumber(xval);
                            if (xval == NaN) xval = "0";
                        } catch (err) {
                            xval = "0";
                        }

                        xArryVal[i] = xval;
                    }




                } catch (err) {
                    xArryVal[i] = "nwaagdef";
                }
            }

            var finalFormula = xxx.replaceAll("=", "");
            var xtempClass = ""; var xFinalClass = "";
            xtempClass = $(obj).attr("class");
            if (xtempClass == undefined) xtempClass = "";
            else xtempClass = xtempClass.trim();

            var xtempClassArry = xtempClass.split(" ");

            for (var i = 0; i < xtempClassArry.length; i++) {
                if ((xtempClassArry[i]).indexOf("aagF") == 0) continue;
                xFinalClass = xFinalClass + xtempClassArry[i] + " ";
            }


            for (var i = 0; i < xArryVal.length; i++) {
                if (xArryVal[i] == "nwaagdef") continue;
                if ((xArryVal[i] + "").indexOf("-") == 0)
                    finalFormula = finalFormula.replaceAll(xArry[i], "(" + xArryVal[i] + ")");
                else
                    finalFormula = finalFormula.replaceAll(xArry[i], xArryVal[i]);

                xFinalClass = xFinalClass + "aagF" + xArry[i] + " ";
            }
            xFinalClass = xFinalClass + " " + $(obj).attr("aagFCon");
            $(obj).attr("aagFCon", "");

            $(obj).attr("class", xFinalClass);

            //  alert(finalFormula);
            finalFormula = func_GetFormulaReplace(finalFormula);

            $(obj).val(eval(finalFormula) + "");
            // alert(xArry+"\n\n"+xArryVal);
            // alert(xArry[0]+"\n\n" +  cellIndexConverted.row+ " " + cellIndexConverted.col);
            // alert(xtemp.split("#aag#")+"\n\n" +  cellIndexConverted.row+ " " + cellIndexConverted.col);

            func_ComputeFormula(xxx, obj);
            $(obj).attr("nwFormula", xxx);
        } catch (err) {
            strError = err;

        }


        if (strError != "") {
            $(obj).val(strError + "");
            $(obj).attr("nwFormula", xxx);
        }

    }
    else {

        func_GetFormulaRefClear(obj);
        crFormulaCellSelected = "";
        $(obj).attr("nwFormula", "");
    }

    // alert(xcell +  "-"  +$(".aagF"+xcell).length);
    for (var i = 0; i < $(".aagF" + xcell).length; i++) {
        // $(".aagF"+xcell+":eq("+i+")").focus();
        //$(".aagF"+xcell+":eq("+i+")").blur();

        func_FormulaLoad($(".aagF" + xcell + ":eq(" + i + ")"), null, true);
        //$(".aagF"+xcell).blur();
    }


}

function func_GetFormulaRefClear(obj) {
    var xtempClass = ""; var xFinalClass = "";
    xtempClass = $(obj).attr("class");
    xtempClass = xtempClass.trim();
    var xtempClassArry = xtempClass.split(" ");

    for (var i = 0; i < xtempClassArry.length; i++) {
        if ((xtempClassArry[i]).indexOf("aagF") == 0) continue;
        xFinalClass = xFinalClass + xtempClassArry[i] + " ";
    }

    $(obj).attr("class", xFinalClass);
}


var conFormulaFunc = new Array();
conFormulaFunc[0] = "SUM"; // function Name
conFormulaFunc[1] = "COUNTA"; // function Name
conFormulaFunc[2] = "COUNT"; // function Name
conFormulaFunc[3] = "MIN"; // function Name
conFormulaFunc[4] = "MAX"; // function Name
conFormulaFunc[5] = "AVG"; // function Name
conFormulaFunc[6] = "AVERAGE"; // function Name
//conFormulaFunc[0,1] = "+";     // Operational Type
//conFormulaFunc[0,2] = "";       // Sub Function

//conFormulaFunc[1,0] = "COUNT"; // function Name
//conFormulaFunc[1,1] = "+";     // Operational Type
//conFormulaFunc[1,2] = "";       // Sub Function
//conFormulaFunc[2,0] = "MAX"; // function Name
//conFormulaFunc[2,1] = "+";     // Operational Type
//conFormulaFunc[2,2] = "";       // Sub Function
//conFormulaFunc[3,0] = "MIN"; // function Name
//conFormulaFunc[3,1] = "+";     // Operational Type
//conFormulaFunc[3,2] = "";       // Sub Function



function func_GetFormulaFunc(crFormulaFunc) {
    crFormulaFunc = crFormulaFunc.toUpperCase();


    for (var i = 0; i < conFormulaFunc.length; i++) {
        //alert(conFormulaFunc+ '\n' +crFormulaFunc+"@"+i+"@"+ conFormulaFunc[i])+"@" + conFormulaFunc.length;
        if (crFormulaFunc == conFormulaFunc[i]) {
            break;
        }

        if (i == conFormulaFunc.length - 1) crFormulaFunc = "";
    }

    return crFormulaFunc;
}
function func_GetFormulaReplace(ExFormula) {
    for (var i = 0; i < conFormulaFunc.length; i++) {
        ExFormula = ExFormula.replaceAll(conFormulaFunc[i], "");
    }
    return ExFormula;
}



function func_GetFormulaRangeValue(ExFormula, obj, crFormulaFunc) {
    // ExFormula    A1:D2,D3
    var xvalue = 0.0;
    var xvalueTemp = "";
    var xType = "+";

    var ExFormulaArry = ExFormula.split(",");
    var xval = ""; var xvalF = "";
    var xminval = 0; var xmaxval = 0;
    var xcountval = 0;
    var xcountvalA = 0;

    var xmax = -1; var ymax = -1;
    var xmin = -1; var ymin = -1;

    for (var i = 0; i < ExFormulaArry.length; i++) {
        xvalueTemp = ExFormulaArry[i];
        if (xvalueTemp.indexOf(":") >= 1) {
            var xvalueTempArry = xvalueTemp.split(":");
            var tempstr;
            var cellIndexConverted = cellA1ToIndex(xvalueTempArry[0]);
            var cellIndexConverted2 = cellA1ToIndex(xvalueTempArry[1]);

            ymin = cellIndexConverted.row;
            xmin = cellIndexConverted.col;

            ymax = cellIndexConverted2.row;
            xmax = cellIndexConverted2.col;

            if (ymin > ymax) { tempstr = ymax; ymax = ymin; ymin = tempstr; }
            if (xmin > xmax) { tempstr = xmax; xmax = xmin; xmin = tempstr; }


            //  alert(xmin +"@"+ymin +"@"+xmax +"@"+ymax +"@");


            for (var i2 = ymin; i2 <= ymax; i2++) {
                for (var xcol = xmin; xcol <= xmax; xcol++) {

                    //xval= nwLib.nwTempTable_RowData_Get($(obj).parents(".nwGrid").parent().attr("id"),i2,xcol,"input");
                    xval = $("#" + $(obj).parents(".nwGrid").parent().attr("id")).find(".tblGridBody  tr:eq(" + i2 + ")  td:eq(" + (xcol + 1) + ") ").find("input").val();

                    func_GetFormulaRangeAddClass(xcol, i2, obj); // register Cell to the Class

                    // alert("Angelo" +"@"+ $(obj).html() +"@"+ $(obj).parents(".nwGrid").parent().attr("id")+ "@" +i2+ "@" +xcol + "@" +xval);

                    if (xvalF != "") xvalF = xvalF + xType;



                    if (xval == undefined || xval == "undefined" || xval == "") xvalF = xvalF + "0";
                    else {
                        try {
                            xvalF = xvalF + nwNumber(xval);
                        } catch (err) {
                            xvalF = xvalF + "0";
                        }
                    }


                    try {
                        if (xval != "") xcountvalA = xcountvalA + 1;
                        if (parseFloat(xval)) {
                            xcountval = xcountval + 1;
                        }
                        //    if(xval == "") xval ="0";


                        if (parseFloat(xval) >= xmaxval) xmaxval = parseFloat(xval);
                        if (parseFloat(xval) <= xminval) xminval = parseFloat(xval);
                        else {
                            if (xval != "" && xcountval == 1) xminval = parseFloat(xval);
                        }


                    } catch (err) { }

                }

            }

        }
        else {
            var cellIndexConverted = cellA1ToIndex(ExFormulaArry[i]);
            xval = nwLib.nwTempTable_RowData_Get($(obj).parents(".nwGrid").parent().attr("id"), cellIndexConverted.row, cellIndexConverted.col, "input");
            //    alert("Angelo" +"@"+ $(obj).html() +"@"+ $(obj).parents(".nwGrid").parent().attr("id")+ "@" +cellIndexConverted.row+ "@" +cellIndexConverted.col + "@" +xval);

            func_GetFormulaRangeAddClass(cellIndexConverted.col, cellIndexConverted.row, obj);
            if (xvalF != "") xvalF = xvalF + xType;

            if (xval == undefined || xval == "undefined" || xval == "") xvalF = xvalF + "0";
            else {
                try {
                    xvalF = xvalF + nwNumber(xval);
                } catch (err) {
                    xvalF = xvalF + "0";
                }
            }


            try {
                if (xval != "") xcountvalA = xcountvalA + 1;

                if (parseFloat(xval)) {
                    xcountval = xcountval + 1;
                }
                //   if(xval == "") xval ="0";
                //if(xminval == undefined )xminval =parseFloat(xval) ;

                if (parseFloat(xval) >= xmaxval) xmaxval = parseFloat(xval);
                if (parseFloat(xval) <= xminval) xminval = parseFloat(xval);
                else {
                    if (xval != "" && xcountval == 1) xminval = parseFloat(xval);
                }

            } catch (err) { }

        }



    }

    if (crFormulaFunc.toUpperCase() == "COUNT") xvalF = xcountval + "";
    else if (crFormulaFunc.toUpperCase() == "COUNTA") xvalF = xcountvalA + "";
    else if (crFormulaFunc.toUpperCase() == "MAX") xvalF = xmaxval + "";
    else if (crFormulaFunc.toUpperCase() == "MIN") xvalF = xminval + "";

    else if (crFormulaFunc.toUpperCase() == "AVERAGE") xvalF = "(" + xvalF + ")/" + (xcountval == 0 ? 1 : xcountval);
    else if (crFormulaFunc.toUpperCase() == "AVG") xvalF = "(" + xvalF + ")/" + (xcountval == 0 ? 1 : xcountval);



    xvalF = "(" + xvalF + ")";


    xvalue = eval(xvalF);


    return xvalue;
}

function func_GetFormulaRangeAddClass(col, row, obj) {
    var xcell = GetLetterByNumber(col + 1, true) + (row + 1);
    var xtemp = $(obj).attr("aagFCon");
    xcell = "aagF" + xcell;
    $(obj).attr("aagFCon", xtemp + " " + xcell);
}



function GetLetterByNumber(index, isUpper) {
    var strLetter = "";

    strLetter = GetExcelColumnName(index);

    if (!isUpper == true) strLetter = strLetter.toLowerCase();

    return strLetter;
}
function GetExcelColumnName(columnNumber) {
    var dividend = columnNumber;
    var columnName = "";
    var modulo;

    while (dividend > 0) {
        modulo = (dividend - 1) % 26;
        columnName = String.fromCharCode(65 + modulo) + columnName;
        dividend = parseInt((dividend - modulo) / 26);
    }

    return columnName;
}

// String Format
// replaceAll create
String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};
String.prototype.parseNumber = function () {
    var target = this;
    if (target == "" || target == NaN || (target + "") == "NaN" || target == undefined) target = 0;
    return parseFloat((target + "").replaceAll(",", ""));
};

if (!String.Format) {
    String.Format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
              ? args[number]
              : match
            ;
        });
    };
}

function func_ConvertTableJSON(object) {
    var tbl = $(object).find('tbody tr').get().map(function (row) {
        return $(row).find('td').get().map(function (cell) {
            return $(cell).html();
        });
    });

    return tbl;
}


function func_ComputeFormula(varFormula, verObj) {

}

/**
* Convert a cell reference from A1Notation to 0-based indices (for arrays)
* or 1-based indices (for Spreadsheet Service methods).
*
* @param {String}    cellA1   Cell reference to be converted.
* @param {Number}    index    (optional, default 0) Indicate 0 or 1 indexing
*
* @return {object}            {row,col}, both 0-based array indices.
*
* @throws                     Error if invalid parameter
*/
function cellA1ToIndex(cellA1, index) {
    // Ensure index is (default) 0 or 1, no other values accepted.
    index = index || 0;
    index = (index == 0) ? 0 : 1;

    // Use regex match to find column & row references.
    // Must start with letters, end with numbers.
    // This regex still allows induhviduals to provide illegal strings like "AB.#%123"
    var match = cellA1.match(/(^[A-Z]+)|([0-9]+$)/gm);

    if (match.length != 2) throw new Error("Invalid cell reference");

    var colA1 = match[0];
    var rowA1 = match[1];

    return {
        row: rowA1ToIndex(rowA1, index),
        col: colA1ToIndex(colA1, index)
    };
}

/**
* Return a 0-based array index corresponding to a spreadsheet column
* label, as in A1 notation.
*
* @param {String}    colA1    Column label to be converted.
*
* @return {Number}            0-based array index.
* @param {Number}    index    (optional, default 0) Indicate 0 or 1 indexing
*
* @throws                     Error if invalid parameter
*/
function colA1ToIndex(colA1, index) {
    if (typeof colA1 !== 'string' || colA1.length > 2)
        throw new Error("Expected column label.");

    // Ensure index is (default) 0 or 1, no other values accepted.
    index = index || 0;
    index = (index == 0) ? 0 : 1;

    var A = "A".charCodeAt(0);

    var number = colA1.charCodeAt(colA1.length - 1) - A;
    if (colA1.length == 2) {
        number += 26 * (colA1.charCodeAt(0) - A + 1);
    }
    return number + index;
}


/**
* Return a 0-based array index corresponding to a spreadsheet row
* number, as in A1 notation. Almost pointless, really, but maintains
* symmetry with colA1ToIndex().
*
* @param {Number}    rowA1    Row number to be converted.
* @param {Number}    index    (optional, default 0) Indicate 0 or 1 indexing
*
* @return {Number}            0-based array index.
*/
function rowA1ToIndex(rowA1, index) {
    // Ensure index is (default) 0 or 1, no other values accepted.
    index = index || 0;
    index = (index == 0) ? 0 : 1;

    return rowA1 - 1 + index;
}




function func_FormatNumericALL(parent, object) {
    var objectCount = $(parent).find(object).length;
    for (var i = 0; i < objectCount; i++) {
        var xobj = $(parent).find(object + ":eq(" + i + ")");
        var xtag = xobj.attr("nwdp");
        func_isnumber_makenumeric(xobj, xtag);
    }
}

function func_FormatNumeric(selectedInput, decimalpoint) {

    try {
        var xtag = $(selectedInput).attr("nwdp");
        if (decimalpoint >= 0) xtag = decimalpoint;

        func_isnumber_makenumeric(selectedInput, xtag);

    } catch (err) { }
}


var Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }
//var Base64 = { _keyStr: "ANGELOBCDFHIJKLMPQRSTUVWXYZcarlobdefghijkmnpqstuvwxyz2470135689+/=", encode: function(e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function(e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function(e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function(e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }
function func_nwEncript(xstring) {
    // Define the string
    var string = xstring;

    // Encode the String
    var encodedString = Base64.encode(string);
    // console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"
    // Decode the String
    // var decodedString = Base64.decode(encodedString);
    //console.log(decodedString); // Outputs: "Hello World!"

    return encodedString;
}

function func_nwDecript(xstring) {
    var decodedString = Base64.decode(xstring);
    return decodedString;
}
function func_nwRandomString(count) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    if (count == undefined) count = 10;
    for (var i = 0; i < count; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

///// once element created 
//$(document).bind("DOMSubtreeModified", function (evt) {
//    var eTarget = evt.target;
//    //  alert(jQuery(eTarget).hasClass('isNumber'))
//    //  $(eTarget).addClass("nwObjects");
//    if (jQuery(eTarget).hasClass('isNumber')) {
//        ;
//        func_isnumber_makenumeric(eTarget);
//    }
//});




function func_isnumber_makenumeric(selectedInput, decimalpoint, strPrefix, allowNegative) {




    try {
        if ($(selectedInput).hasClass("nwDatePick") == true
            || $(selectedInput).hasClass("nwDatePicker") == true
            || $(selectedInput).hasClass("hasDatepicker") == true
            ) {

            return true;
        }
    } catch (err) { }

    try {
        if ((!($(selectedInput).hasClass("numC") == true
            || $(selectedInput).hasClass("nwPercent") == true
            )) && decimalpoint == undefined) {


            return true;
        }
    } catch (err) { }

    if (!$(selectedInput).hasClass("numC") && decimalpoint == undefined) {
        var splix = $(selectedInput).val().split(".");
        if (splix[1] == "00") { $(selectedInput).val(splix[0]); decimalpoint = 0; }

        if (splix[1] != undefined && splix[1] != "00") {
            //alert(decimalpoint + " @ " + splix[1].length + " @ " + splix[1]);
            decimalpoint = splix[1].length;
        }

    }


    var wholenumber = -1;
    try {
        if ($(selectedInput).attr("nwwhole") != undefined) {
            wholenumber = parseInt($(selectedInput).attr("nwwhole"));
            if (wholenumber == 0) wholenumber = 1;
            if (wholenumber == NaN) wholenumber = -1;
        }
    } catch (err) { }


    try {
        var xdecimalpoint = 2;

        if (allowNegative == undefined) allowNegative = false;

        try {
            if (selectedInput.hasClass("nwNegative")) allowNegative = true;
        } catch (err) { }


        try { if (decimalpoint >= 0) xdecimalpoint = decimalpoint; } catch (err) { }

        var elementType = $(selectedInput).prop('tagName'); ///
        var elementTyper = (elementType + "").toLowerCase();
        var isPercent = $(selectedInput).hasClass("nwPercent");

        var xer = 0;

        if (elementTyper != "input" && elementTyper != "textarea") xer = selectedInput.text();
        else xer = selectedInput.val();



        var xxz = 0;
        xer = (xer + '').replace(/,/g, '');
        //if(decimalpoint == 3) alert(xer);
        if (xer == "") xer = "0";

        // alert(allowNegative + " " + xer);
        if (allowNegative == false && xer.indexOf("-") >= 0) xer = "0";
        // xer = xer.replaceAll("-","");



        xxz = xer;
        var isnegative = false;
        if (xxz.indexOf("-") >= 0) isnegative = true;
        xxz = xxz.replaceAll("%", "").replaceAll("`", "").replaceAll("'", "").replaceAll("-", "");



        var xxRet = xxz.split('.');
        var xers = 0;

        if (xxRet[0].length >= 21 && wholenumber == -1) wholenumber = 21;

        if (wholenumber >= 1) {

            if (xxRet[0].length > wholenumber) {
                ToastMessage("Invalid Input.");
                try { $(selectedInput).keypress(); } catch (err) { }

                xers = 0;
                // if (xxRet[0].length <= wholenumber) {
                var nwoldvalue = $(selectedInput).attr("nwoldvalue");
                $(selectedInput).val(nwoldvalue);
                //}

                xer = "";
                xxRet = xer.split('.');
                $(selectedInput).focus();
                return false;
            }

        }

        xer = ((xxz * 100) / 100).toFixed(xdecimalpoint);
        if (isnegative) xer = ((xxz * -1 * 100) / 100).toFixed(xdecimalpoint);
        var xxRet = xer.split('.');

        try { xxz = parseFloat(xer) } catch (err) { nwconsole.error(err); }
        if (xxz == NaN || (xxz + '') == "NaN") xxz = 0;
        xer = ((xxz * 100) / 100).toFixed(xdecimalpoint);





        try {
            xers = numberWithCommas(xxRet[0]);
        } catch (err) { }
        try {
            xers = xers + "." + xxRet[1].replace('.', '');
        } catch (err) {
        }


        if (strPrefix == undefined) strPrefix = "";
        if (isPercent == true) strPrefix = "%" + strPrefix;
        if (strPrefix != "" && strPrefix != undefined) xers = xers + strPrefix;



        if (elementTyper != "input" && elementTyper != "textarea") selectedInput.text(xers);
        else selectedInput.val(xers);


    } catch (err) { }
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function nwCurrency(x) {
    try {
        x = (x + '').replace(/,/g, "");
        var xer = parseFloat(x);

        xer = (Math.round(xer * 100) / 100).toFixed(2);  //(Math.ceil(xer * 100) / 100).toFixed(2); //Math.round(num * 100) / 100; //
        return xer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } catch (err) { alert(err); }
}

function nwNumber(x) {
    var xer = parseFloat(x.replace(/,/g, ""));
    var xers = 0;
    if (!isNaN(xer) && xer != "") xers = xer;

    return xers;
}

///////

function func_ClearTextBox() {
    $('input').not('#noah-webui-default-currentRec').val('');
    $('input.isNumber.numC').val('0.00');
}





///////////////////////////
function func_ActionDrivenAync(met, xisDataRequired, customlink, requestID) {
    func_ActionDriven("AngeloAsync" + met, xisDataRequired, customlink, requestID);
}

var paramencrypt = true;
function func_ActionDriven(met, xisDataRequired, customlink, requestID) {
    var isAync = false;
    if (met.indexOf("AngeloAsync") >= 0) {
        met = met.replace("AngeloAsync", "");
        isAync = true;
    }

    if (xisDataRequired == undefined && isDataRequired == true) xisDataRequired = true;

    if (xisDataRequired == true) {
        var xtemp = DataAutoComputeGrid;
        DataAutoComputeGrid = true;
        get_parameters_default();
        DataAutoComputeGrid = xtemp;
    }


    if (crLnkGateKey == "aagChatMessage") // for analyzer only
    {
        nwParameter_Add("nwInterfaceCurrentUser", nwInterfaceCurrentUser);
    }

    func_nwConvertParaValue();
    var data; var formData = new FormData();

    if (isAync) {

        var _strParameter = requestID == "nwdontclearparams" ? strParameterResource : strParameter;
        var _strValue = requestID == "nwdontclearparams" ? strValueResource : strValue;

        formData.append('strMethod', met);
        formData.append('strParameter', (paramencrypt == true ? p8Encrypted(_strParameter) : _strParameter));
        formData.append('strValue', (paramencrypt == true ? p8Encrypted(_strValue) : _strValue));
    }
    else {
        if (requestID == "nwdontclearparams") {
            var xstrParameterResource = p8Encrypted(strParameterResource);
            var xstrValueResource = p8Encrypted(strValueResource);
            data = { strMethod: met, strParameter: xstrParameterResource, 'strValue': xstrValueResource };
        }
        else {
            data = { strMethod: met, strParameter: (paramencrypt == true ? p8Encrypted(strParameter) : strParameter), 'strValue': (paramencrypt == true ? p8Encrypted(strValue) : strValue) };
        }
    }


    paramencrypt = true;
    var rurl = "";

    var xvarx = "&nwu=" + getParameterByName("nwu");
    xvarx = "";

    if (customlink != undefined && customlink != "") rurl = customlink + "?nwmethod=act_Method" + xvarx;
    else rurl = crLnk + "?nwmethod=act_Method" + xvarx;


    if (isAync) {
        requestFormAsync(formData, rurl, requestID);
    } else {
        requestForm(data, rurl, requestID);
    }




    if (_ToolBoxClicked != "") {
        _ToolBoxClicked = "";
        SaveToLogs(_ToolBoxClicked, xLOG_menuitem, "", crSTDLnk);

    }
}


function nwPopupForm_Modal(verID) {
    var nwobject;
    nwobject = nwPopupForm_extraCheckIfObject(verID);
    try {

        var top = 0;
        var left = 0;

        left = ($(window).width() - $(nwobject).outerWidth()) / 2;
        top = ($(window).height() - $(nwobject).outerHeight()) / 1.8;

        if (left <= 0) left = 0;
        if (top <= 0) top = 0;

        $(nwobject).css({
            position: 'fixed',
            left: left,
            top: top
        });
    }
    catch (err) {
        //alert(err);
    }
}

function nwPopupForm_extraCheckIfObject(verID) {
    var nwobject;
    try {
        if (jQuery.type(verID) === "string") {
            if (verID.substring(0, 1) == '#') {
                verID = verID.substring(1);
            }
            nwobject = $("#" + verID);
        }
        else
            nwobject = $("#" + verID);
    } catch (err) {
        // alert(err + " generic");
    }
    return nwobject;
}

function nwPopupForm_Create(verID, isResize, link) {
    crete_WindowBox(verID, isResize, link);
}


function nwPopupForm_BringToFront(verID, isMessageBox) {
    nwobject = nwPopupForm_extraCheckIfObject(verID);

    var xcount = $('.noah-webui-Window.nwShow').length;

    var tempzindexz = $('.noah-webui-Window.nwShow:eq(' + (xcount - 1) + ')').css("z-index");
    var tempzindex = parseInt(tempzindexz);
    tempzindex += 2;

    var origzindex = $(nwobject).css("z-index");
    if (tempzindex + "" === "undefined" || tempzindex + "" == "NaN")
        tempzindex = origzindex;


    var len = $('.noah-webui-Window.nwShow').length;
    var curmax = 0;
    for (var i = 0; i < len; i++) {
        var zindex = $('.noah-webui-Window.nwShow:eq(' + (i) + ')').css("z-index");
        if (parseInt(zindex) >= curmax)
            curmax = parseInt(zindex);
    }
    if (curmax <= 100) curmax = 100;
    tempzindex = curmax + 1;



    //nwconsole.log("window : " + xcount + " : " + $('.noah-webui-Window.nwShow:eq(' + (xcount - 1) + ')').attr("id") + "z-index:" + tempzindex);

    if (tempzindex >= 8999) tempzindex = 8888;

    if (isMessageBox == true) {

        var count = $('.dimbg').length;
        for (var i = 0; i < count; i++) {
            var zindex = $('.dimbg:eq(' + i + ')').css("z-index");
            //console.log(zindex);
            if (zindex > tempzindex) tempzindex = zindex;
        }

        $("#dimbgNW").css("z-index", parseInt(tempzindex) + 1);
        isMessageBox = false;
    }
    else {
        $("#dimbgNW" + verID).css("z-index", parseInt(tempzindex));
        $(nwobject).css("z-index", parseInt(tempzindex) + 1);
        $("#dimbgNW").css("z-index", 8999);
    }



}


function nwPopupForm_Show(verID, timer, link) {
    var nwobject;
    if (timer == null) timer = 0;
    nwobject = nwPopupForm_extraCheckIfObject(verID);

    if (link != null && link != undefined) {
        if (link.indexOf("?") >= 1)
            link = link + "&" + document.location.search.substring(1, document.location.search.length);
        else
            link = link + "" + document.location.search;
        $(nwobject).find("frame.nwmenuFrame").src = link;
    }


    nwobject.show(timer);

    nwPopupForm_BringToFront(verID);
    $(nwobject).addClass("nwShow");
}
function nwPopupForm_FadeIn(verID, timer, link) {
    var nwobject;
    if (timer == null) timer = 0;
    nwobject = nwPopupForm_extraCheckIfObject(verID);

    if (link != null && link != undefined) {
        if (link.indexOf("?") >= 1)
            link = link + "&" + document.location.search.substring(1, document.location.search.length);
        else
            link = link + "" + document.location.search;
        $(nwobject).find("frame.nwmenuFrame").src = link;
    }

    nwobject.fadeIn(timer);

    nwPopupForm_BringToFront(verID);
    $(nwobject).addClass("nwShow");
}




function nwPopupForm_ShowModal(verID, timer, link) {
    $("#" + verID).show();
    $("#" + verID).addClass("_show");
    $("#" + verID).find(".modal-box-s").addClass("_slide-m");

    var nwobject;
    nwobject = nwPopupForm_extraCheckIfObject(verID);
    if (timer == null || timer == undefined) timer = 0;
    if (link != null && link != undefined) {
        if (link.indexOf("?") >= 1)
            link = link + "&" + document.location.search.substring(1, document.location.search.length);
        else
            link = link + "" + document.location.search;
        $(nwobject).find("frame.nwmenuFrame").src = link;
    }



    try {
    //    $('#dimbgNW' + verID).remove();
    //    if (timer > 0) nwobject.show(timer);
    //    else nwobject.show();
        nwPopupForm_Modal(verID);
        nwobject.addClass("nwModal");
    //    $('body').prepend("<div id=\"dimbgNW" + verID + "\" class=\"dimbg openn dimbgNW" + verID + "\"></div>");
    //    $("#dimbgNW" + verID).insertBefore($("#" + verID));

    //    //$("#dimbgNW").fadeIn(400);

        nwPopupForm_BringToFront(verID);
        $(nwobject).addClass("nwShow");
    } catch (err) { }

}
function nwPopupForm_FadeInModal(verID, timer) {
    var nwobject;
    if (timer == null) timer = 0;
    nwobject = nwPopupForm_extraCheckIfObject(verID);
    try {
        $('#dimbgNW' + verID).remove();
        nwobject.fadeIn(timer);
        nwPopupForm_Modal(verID);
        nwobject.addClass("nwModal");

        $('body').prepend("<div id=\"dimbgNW" + verID + "\" class=\"dimbg openn dimbgNW" + verID + "\"></div>");
        $("#dimbgNW" + verID).insertAfter("#dimbgNW");
        $("#dimbgNW" + verID).fadeIn(400);

        nwPopupForm_BringToFront(verID);
        $(nwobject).addClass("nwShow");

    } catch (err) { }
}


function nwPopupForm_Hide(verID, timer) {
    if (timer == null) timer = 0;
    $('#' + verID).hide(timer);
    try {

        $('#dimbgNW' + verID).removeClass("oppen");
        if (verID != "") $('#dimbgNW' + verID).remove();
        $('div.dimbgNW' + verID).remove();
        $("#dimbgNW").fadeOut(200);
    } catch (err) { }
    $('#' + verID).removeClass("nwShow");
}
function nwPopupForm_FadeOut(verID, timer) {
    if (timer == null) timer = 0;
    $('#' + verID).fadeOut(timer);
    try {
        $('div#dimbgNW' + verID).removeClass("oppen");
        $('div#dimbgNW' + verID).remove();
        $("#dimbgNW").fadeOut(200);
    } catch (err) { }
    $('#' + verID).removeClass("nwShow");
}
function nwPopupForm_HideModal(verID, timer) {
    if (timer == null) timer = 0;
    $('#' + verID).hide(timer);
    $('div#dimbgNW' + verID).removeClass("oppen");
    $('div#dimbgNW' + verID).remove();

    $('div.dimbgNW' + verID).remove();
    $("#dimbgNW").fadeOut(200);

    $('#' + verID).removeClass("nwShow");
    //$("#dimbgNW").fadeOut(200);
}

function nwPopupForm_FadeOutModal(verID, timer) {
    if (timer == null) timer = 0;
    $('#' + verID).fadeOut(timer);
    $('#dimbgNW' + verID).remove();
    //$("#dimbgNW").fadeOut(200);

    try {
        $('div#dimbgNW' + verID).removeClass("oppen");
        $('div#dimbgNW' + verID).remove();
        $("#dimbgNW").fadeOut(200);
    } catch (err) { }

    $('#' + verID).removeClass("nwShow");
}




var isLibraryObject = false;
function crete_WindowBox(verID, isResize, link) {
    if ($("#" + verID).html() == undefined)
        $('body').append("<div id='" + verID + "' ></div>");


    var tempCon = $('#' + verID).html();
    var isMenuFrame = false;
    if (link != undefined) {
        if (link.indexOf("?") >= 1)
            link = link + "&" + document.location.search.substring(1, document.location.search.length);
        else
            link = link + "" + document.location.search;

        try {
            link = link.replace("&nkpop=y", "");
            link = link.replace("?nkpop=y", "");
        } catch (err) { }

        if (link.indexOf("?") >= 0) {
            link = link + "&nkpop=y";
        }
        else
            link = link + "?nkpop=y";


        tempCon = "<iframe class='nwmenuFrame' src=" + link + " ></iframe>";
        isMenuFrame = true;
    }


    var strTitle = $('#' + verID).attr("nwTitle");
    var verclass = $('#' + verID).attr("class") || "";
    //var verstyle = $('#' + verID).attr("style");

    $('#' + verID).attr("class", "noah-webui-Window  " + verclass);
    $('#' + verID).addClass("modal-s");
    if (link != undefined) {
        $('#' + verID).addClass("nkMenuPopup");
    }

    //setTimeout(function () {
    //    var verconstyle = $('#' + verID).find(".message_content").attr("style") + ";" + ($('#' + verID).attr("nwContentStyle") + '');

    //    if (verconstyle != undefined)
    //        $('#' + verID).find(".message_content").attr("style", verconstyle);

    //}, 500);

    if (strTitle == undefined || strTitle == "undefined") {
        strTitle = $('#' + verID).attr("title");
        if (strTitle == undefined || strTitle == "undefined") {
            strTitle = "";
        }
    }

    var strResize = "";
    if (isResize == true) {
        strResize = "<div class='btn btn-modal-rescale-s' nk-fx-click='press' title='Rescale'></div>";

    }


    //var strF = "<div class=\"dimMessageBoxHeader\">" +
    //       "<div class=\"BoxTitle\">" + strTitle + "</div>" + strResize + "<div onclick=\"window_close('" + verID + "')\" title=\"Close\" class=\"BoxClose\" onclick=\"\">X</div>" +
    //       "</div>" +
    //       "<div class=\"message_content\"> " + tempCon +
    //       "</div>";

    var strF = "<div class='modal-box-s'>" +
         "<div class='modal-box-bg'></div>" +
          "<div class='modal-hdr'>" +
             "<div class='btn btn-modal-back' nk-fx-click='press' ><span></span></div>" +
             "<div class='modal-hdr-title'>" + strTitle + "</div>" +
             strResize +
           "</div>" +
          "<div class='nk-modal-body'>" +
          tempCon +
          "</div>" +
          "</div>";


    //$('#' + verID).css({
    //    position: 'fixed',
    //    left: ($(window).width() - $('#' + verID).outerWidth()) / 2,
    //    top: ($(window).height() - $('#' + verID).outerHeight()) / 2.1
    //});

    $('#' + verID).html(strF);


    //try {
    //    $("#" + verID).draggable({
    //        handle: "div.dimMessageBoxHeader",
    //        scroll: false, delay: 0,
    //        stop: function () {
    //            func_WindowDragStop(this);
    //        }
    //    });
    //} catch (err) { }

    //try {
    //    if (isResize == true) $('#' + verID).resizable({
    //        stop: function (event, ui) {

    //            if ($(this).attr("id") == "nwExportContainerMain")
    //                func_ExportResize();
    //            else if ($(this).attr("id") == "nwgRemarksCon") {
    //                func_CMSresize('cmsnwgRemarks');
    //            }

    //        }, ghost: false
    //    });
    //} catch (err) { }

    //if (isMenuFrame) {
    //    $('#' + verID).find(".message_content").addClass("nwNoPadding");
    //    $('#' + verID).find(".message_content").addClass("nwNoOverflow");
    //    $('#' + verID + "").find(".message_content").css("padding", "0px !important");
    //    $('#' + verID + "").find(".message_content").css("overflow", "hidden !important");
    //}

    if (isLibraryObject)
        $('#' + verID).addClass("nwLibObj");



    // $('#' + verID).css("position", "absolute");

    return true;
}


function func_WindowDragStop(_this) {
    var top = $(_this).css("top");
    top = parseInt(top.replace("px"));
    if (top <= 0) {
        top = 0;
        $(_this).css("top", top);
    }

    var left = $(_this).css("left");
    left = parseInt(left.replace("px"));
    if (left <= -50) {
        left = 0;
        $(_this).css("left", left);
    }
}


function window_Resize(verID) {
    verID = verID.replace("#", "");
    if (verID == "menuCreatorContainer") {
        setTimeout(function () { func_LookupLoadSelected(); }, 10);
    }

    if ($("#" + verID).hasClass("nwMaximize")) {
        $('body').removeClass("nwbodMaximize");
        $("#" + verID).removeClass("nwMaximize");
    }
    else {
        $('body').addClass("nwbodMaximize");
        $("#" + verID).addClass("nwMaximize");
    }
    window_Resize_Grid(verID);


    if (verID == "menuCreatorContainer") lookup_Resize();
    else if (verID == "nwExportContainerMain")
        func_ExportResize();
    else if (verID == "nwgRemarksCon") {
        func_CMSresize('cmsnwgRemarks');
    }

}

function window_Resize_Grid(verID) {
    var xcount = $('#' + verID).find('.nwGridData').length;

    for (var i = 0; i < xcount; i++) {
        var xser = $('#' + verID).find('.nwGridData:eq(' + i + ')').scrollLeft();
        if (xser >= 1) xser = xser - 1;
        else xser = xser + 1;
        nwGrid_TableAdjust($('#' + verID).find('.nwGridData:eq(' + i + ')').parents(".nwGrid").attr("id"));
        $('#' + verID).find('.nwGridData:eq(' + i + ')').animate({ scrollLeft: xser }, 1);
        $('#' + verID).find('.nwGridData:eq(' + i + ')').animate({ scrollLeft: xser }, 1);
        $('#' + verID).find('.nwGridData:eq(' + i + ')').scrollLeft(xser);
    }


    $(window).resize();
}

function window_close(verID, _this) {
    widow_close(verID, _this);
}
function widow_close(verID, _this) {
    var isContinue = true;
    if (verID == undefined) return;

    var isnewLib = false;
    var isValid = true;
    if (MessageBoxID_AAG != undefined) {
        var isright = MessageBoxID_AAG.buttonClose();
        isContinue = isright || true;
        isnewLib = true;
    }
    MessageBoxID_AAG = undefined;
    if (isContinue == false) return false;



    if (isnewLib == false) {
        try {

            isContinue = func_WindowCloseTrigger(verID);
        } catch (err) {

        }
    }

    if (isContinue) {
        //$('#' + verID).css('display', 'none');

        //var xcount = $('#dimbgNW' + verID).length;

        //for (var i = 0; i < 4; i++) {
        //    if (verID == "") continue;
        //    try { $('#dimbgNW' + verID).remove(); } catch (err) { }
        //    try { $('#dimbgNW#' + verID).remove(); } catch (err) { }
        //}
        //// $('#dimbgNW').removeClass("openn");
        //$('#' + verID).hide();
        //$("#" + verID).removeClass("nwMaximize");

        //if ($('.nwMaximize').html() == undefined || $('.nwMaximize').length <= 0)
        //    $('body').removeClass("nwbodMaximize");

        //if (verID == "nwExportContainerMain") {
        //    func_ClearGridSession($('#nwExportContainer #nwExportGen').attr("nwinstance"));
        //}
        if (_this != undefined){
            var $a = $(_this).parents(".modal");
            $a.fadeOut();
            setTimeout(() => {
                $a.removeClass("show");
            }, 300, clearTimeout);
            setTimeout(() => {
                $a.css("display", "");
            }, 500, clearTimeout);
        }
    }

    try {
        func_WindowCloseDone(verID);
    } catch (err) {

    }

}

function nwUploadGrid_Reload() {

    if ($("#nwUploadGridLibCon").html() == undefined) {
        var upload_Object = "<div id='nwUploadGridLibCon' title='Upload' style='width: 350px; height: 250px'><div style='width: 80%; vertical-align: middle; margin: 0% auto; padding-top: 22px'><div><input id='fileCon' type='file' accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' name='nwUploadGridLibfile[]' onchange='nwUploadGrid_changeFile(this)' /><br> <input type='submit' style='display: block' value='Upload' id='nwUploadGridLibBtn' onclick='nwUploadGrid_upload();' /><div class='progress'><div class='bar' style='width: 0%;'></div> <div class='percent'>0%</div></div><div id='status' style='height: 20px;'></div><div><i>Notes:<br>Acceptable file types include xlx and xlsx up to 5mb only. </i></div> </div></div></div>";
        $("body").append(upload_Object);
    }
}


function func_ClearGridSession(sessionID) {

    if (libSkip() == true) return;

    nwParameter_Add("sessionID", sessionID);
    var standardCrLnk = crSTDLnk;
    func_ActionDriven("actRemoveResources", false, standardCrLnk);
}




function nwremoveNumber(myString) {
    try { myString = myString.replace(/[^\d.-]/g, ''); } catch (err) { }
    return myString;
}

// isNumber keypress isNumber keydown
$(document).on("keydown", ".isNumber", function (e) {
    // Allow: backspace, delete, tab, escape, enter and .



    var nwdp = $(this).attr("nwdp");
    if (nwdp == "0" && (event.keyCode == 110 || event.keyCode == 190)) return false;
    if (nwdp == undefined) nwdp = "2";


    var split = $(this).val().split(".");
    //console.log($(this).val() + " : " +event.keyCode+ " start: " + e.target.selectionStart + " end: " + e.target.selectionEnd + " : " + split[1]);
    if (split[1] == undefined) split[1] = "";

    if ((split[1] + "").length >= parseInt(nwdp) && e.target.selectionStart >= $(this).val().length - parseInt(nwdp) &&
        ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105))
        && e.target.selectionStart == e.target.selectionEnd
        && ($(this).hasClass("numC") && nwdp != "0")
        )
        return false;


    if ((event.keyCode == 189 || event.keyCode == 109) && $(this).hasClass("nwNegative") == false) {
        return false;
    }
    else if ((event.keyCode == 189 || event.keyCode == 109) && $(this).hasClass("nwNegative") == true) {
        try {
            var ctl = document.getElementById($(this).attr("id"));
            var startPos = ctl.selectionStart;
            var endPos = ctl.selectionEnd;

            if (startPos != 0) return false;
        } catch (err) { }
    }

    // dot .
    if (event.keyCode == 110 || event.keyCode == 190) {
        try {


            if ($(this).val().indexOf(".") >= 0)
                return false;

            else {
                if ($(this).hasClass("noDot")) return false;
                return true;
            }
        } catch (err) { }
    }


    if ($.inArray(event.keyCode, [192, 188, 190, 222, 220]) !== -1) return false;

    if ($.inArray(event.keyCode, [46, 8, 9, 27, 13, 190, 110]) !== -1 ||
        // Allow: Ctrl+A
            (event.keyCode == 65 && event.ctrlKey === true) ||
        // Allow: Ctrl+C
            (event.keyCode == 67 && event.ctrlKey === true) ||
        // Allow: Ctrl+V 
            (event.keyCode == 86 && event.ctrlKey === true) ||
        // Allow: Ctrl+X 
            (event.keyCode == 88 && event.ctrlKey === true) ||  // 67 86 88
        // Allow: home, end, left, right
            (event.keyCode >= 35 && event.keyCode <= 39)



        ) {

        // let it happen, don't do anything
        return;
    }
    else {
        // Ensure that it is a number and stop the keypress
        if (event.keyCode == 109 || event.keyCode == 189) {
            return true;
        }
        else if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {

            event.preventDefault();
        }
    }
});
//////// Merge


function func_p8GridMerge(nwgridID, xcol) {
    // alert(nwgridID);

    var xTable = $("#" + nwgridID).find(".tblGridBody");
    var xTableHDR = $("#" + nwgridID).find(".tblGridHeader");
    var crString = ""; var crStringTemp = "";
    var xrowCount = $(xTable).find("tbody tr").length;
    var xcolCount = $(xTableHDR).find("thead tr:eq(0)").find("th").length;
    var crTDp8; var prTDp8;
    // alert(xrowCount + " - " +xcolCount );

    var xcolC = 1;
    var xcolR = 1;

    if (xcol != undefined)
        xcolCount = parseInt(xcol);



    for (var i = 0; i < xrowCount; i++) {
        for (var i2 = 1; i2 < xcolCount; i2++) {
            crTDp8 = $(xTable).find("tbody tr:eq(" + i + ")").find("td:eq(" + i2 + ")");
            crStringTemp = $(crTDp8).text();

            if (i == 0 && i2 == 1) { crString = crStringTemp; prTDp8 = crTDp8; continue; }


            if (crStringTemp == "") { }
            else {
                if (crString == crStringTemp) {
                    xcolC += 1;
                    $(crTDp8).css("display", "none");
                }
                else {
                    //alert(crStringTemp + " - " + crString);

                    $(prTDp8).attr("colspan", xcolC); xcolC = 1; prTDp8 = crTDp8;
                }
            }
            crString = crStringTemp;
        }
    }

}
var tempJSON;
function nwGrid_SetJSONData(GridID, jsonData) {
    tempJSON = jsonData;
    var xtemplate = $('#nwGridRowTemplate' + GridID).html();
    //alert(xtemplate);
    try {
        xtemplate = xtemplate.replaceAll("#p8-L#", "<").replaceAll("#p8-R#", ">");
    } catch (err) { }

    var xRecord = "";
    var pager = 50;
    var colcount = $('#' + GridID).find(".tblGridHeader").find("th").length;

    for (var row = 0; row < pager; row++) {
        xRecord = xtemplate;
        try {
            for (var i = 0; i < colcount; i++) {
                xRecord = String.Format(xRecord, jsonData[row]["p8ColumnX-" + i]);
            }
        } catch (err) {
            nwconsole.log(err);
        }
        $('#' + GridID).find(".nwGridPage").append(xRecord);
    }

}

////////////////////////// Table
/// Set nwgrid current selected
function nwGrid_SetSelectedObjects(ver) {
    var isValid = false;
    var isValidRow = false;


    try {
        if (!($(ver).parents("tr").index() == $(crnwTD).parents("tr").index() &&
         $(ver).index() == $(crnwTD).index())
         && $(ver).parents('table.tblGridBody').attr("id") == crnwTable.attr("id")) isValid = true;
    } catch (err) { }
    try {
        if (!($(ver).parents("tr").index() == $(crnwTD).parents("tr").index())
         && $(ver).parents('table.tblGridBody').attr("id") == crnwTable.attr("id")) isValidRow = true;
    } catch (err) { }

    var pvnwTD = crnwTD;
    var pvnwTR = crnwTR;

    crnwTD = $(ver);
    crnwTR = $(ver).parent();
    crnwTable = $(ver).parents('table.tblGridBody');
    crnwTableCon = $(ver).parents('.nwGrid');

    try {
        if (isValid) func_nwGrid_CellChange(pvnwTR, pvnwTD);
    } catch (err) { }
    try {
        if (isValidRow) func_nwGrid_RowChange(pvnwTR, pvnwTD);
    } catch (err) { }

    try {
        $('.nwGrid').removeClass("nwGridSelectedAAG");
        crnwTableCon.addClass("nwGridSelectedAAG");
    } catch (err) { }
}

function nwGrid_SetSelectedFunction() {
    $(crnwTable).find('tr td').removeClass('nwgridSelected');
    $(crnwTable).find('tr td').removeClass('nwgridSelectedCells');

    //aagV


    var ParentI = $(crnwTable).parents('.nwGrid').attr("id");
    for (var i = 0; i < 4; i++) {
        var xobj = $("#ParentIAAG" + ParentI).find("div.nwGridBorderLine:eq(" + i + ")");
        xobj.css("height", "0px");
        xobj.css("width", "0px");
        xobj.css("top", "0px");
        xobj.css("left", "0px");
    }


    crnwTD.addClass('nwgridSelected');
    try { $(crnwTable).find('tr').removeClass('nwgridSelected'); crnwTR.addClass('nwgridSelected'); }
    catch (err) {
        try { crnwTD.parents("tr").addClass('nwgridSelected'); }
        catch (err) { }
    }
}


function func_nwGrid_SetSelected(nwgridID, colindex, rowindex) {
    nwGrid_SetSelectedGrid(nwgridID, colindex, rowindex);
}
function nwGrid_SetSelectedGrid(nwgridID, colindex, rowindex) {
    var objid;
    var xcol = 1;
    var xrow = 0;

    if (colindex != undefined && colindex >= 1) {
        xcol = colindex;
    }

    if (rowindex != undefined && rowindex >= 1) {
        xrow = rowindex;
    }



    try {
        nwgridID = nwgridID.replace(/#/g, "");
        nwgridID = "#" + nwgridID;
    } catch (err) { }

    try {
        $(nwgridID).find(".tblGridBody").find("td.nwgridSelected").removeClass("nwgridSelected");
    } catch (err) { }

    if ((rowindex != undefined && rowindex >= 0) && (colindex != undefined && colindex >= 1)) {
        objid = $(nwgridID).find(".tblGridBody").find("tbody tr:eq(" + xrow + ") td:eq(" + xcol + ")");
        objid.addClass("nwgridSelected");
    }
    else
        objid = $(nwgridID).find(".tblGridBody").find("td.nwgridSelected");



    if (objid.html() == undefined) {
        objid = $(nwgridID).find(".tblGridBody").find("tbody tr:eq(" + xrow + ") td:eq(" + xcol + ")");

        objid.addClass("nwgridSelected");
        try {
            objid.parents("table").find("tr").removeClass("nwgridSelected");
            objid.parents("tr").addClass("nwgridSelected");
        } catch (err) { }
    }
    else if (xrow != undefined && xcol != undefined) {
        objid = $(nwgridID).find(".tblGridBody").find("tbody tr:eq(" + xrow + ") td:eq(" + xcol + ")");

        objid.addClass("nwgridSelected");
        try {
            objid.parents("table").find("tr").removeClass("nwgridSelected");
            objid.parents("tr").addClass("nwgridSelected");
        } catch (err) { }
    }


    try {

        nwGrid_SetSelectedObjects(objid);
    } catch (err) { }
    //nwGrid_SetSelectedObjects
}

function nwGrid_Created(nwgridID) {
    var gridid = nwgridID;
    var objparent = $("#" + gridid).parents(".nwGridContainer");
    if (objparent.attr("id") != undefined) {
        for (var i = 0; i < objparent.find(".nwGridListItem").length; i++) {
            var gid = objparent.find(".nwGridListItem:eq(" + i + ")").find(".nwGrid").attr("id");
            nwGrid_CreatedFinal(gid);
        }
        if (objparent.find(".nwGridListItem").length <= 0) {
            nwGrid_CreatedFinal(nwgridID);
        }
    }
    else {
        nwGrid_CreatedFinal(nwgridID);
    }
}

function nwGrid_CreatedFinal(nwgridID) {
    try {

        //p8scripttype
        try {
            nwGrid_ScriptCreated(nwgridID);
        } catch (err) { }
        try {
            $('#' + nwgridID).find(".nwloadingdata").removeClass("nwloadingdata");
        } catch (err) { }
        func_nwGrid_nwtexteareEnterResize(nwgridID);
        func_nwGrid_Created(nwgridID);

    } catch (err) { }

    try {
        setTimeout(function () {
            nwGrid_MergeResize(nwgridID, window.devicePixelRatio >= 1.25 ? 0 : window.devicePixelRatio);
        }, 1000);
        //$(window).resize();
    } catch (err) { }
}

function nwGrid_ScriptCreated(nwgridID) {
    setTimeout(function () {
        var obj = $('#nwgridmergeScript_' + nwgridID);
        for (var i = 0; i < obj.find("span").length; i++) {
            var p8scripttype = obj.find("span:eq(" + i + ")").attr("p8scripttype");
            var p8value = obj.find("span:eq(" + i + ")").html();
            if (p8scripttype == "merge") {
                var arry = p8value.split("#");
                nwGrid_MergeCellSingle(nwgridID, Parser.ParseInt(arry[1]) + 1, Parser.ParseInt(arry[0]), Parser.ParseInt(arry[3]), Parser.ParseInt(arry[2]));
                //nwGrid_MergeCellSingle(nwgridID, Parser.ParseInt(arry[1]) + 1, arry[0], 1 + Parser.ParseInt(arry[3]) - Parser.ParseInt(arry[1]), 1 + Parser.ParseInt(arry[2]) - Parser.ParseInt(arry[0]));
                //nwGrid_MergeCellSingle(nwgridID, arry[1], arry[0], 1 + Parser.ParseInt(arry[3]) - Parser.ParseInt(arry[1]), 1 + Parser.ParseInt(arry[2]) - Parser.ParseInt(arry[0]));
                //nwGrid_MergeCellSingle(nwgridID, arry[1], arry[0], Parser.ParseInt(arry[1]) + (Parser.ParseInt(arry[3])-1), Parser.ParseInt(arry[0]) + (Parser.ParseInt(arry[2])-1));
            }
        }
    }, 10);
}


//nwGrid td change  
$(document).on("change", ".tblGridBody tr td", function () {
    var selectedTR = $(this);

    if (nwgrid_IsKeyboardPress == true)
        ;
    else {
        nwGrid_SetSelectedObjects(selectedTR);
        nwGrid_SetSelectedFunction();
    } nwgrid_IsKeyboardPress = false;

    var ParentI = crnwTableCon; //selectedTR.parents() ;//selectedTR.parent().parent().parent().parent().parent().parent().parent().parent();
    var rower = nwGrdi_Row(selectedTR);
    try { nwGrid_Change(ParentI, rower, selectedTR); }
    catch (err) { }
});

$(document).on('focus', '.tblGridBody tr td div[contenteditable]', function () {
    try {
        document.execCommand('selectAll', false, null);
    } catch (err) { }
});

$(document).on('focus', '.tblGridBody tr td [contenteditable]', function () {
    var $this = $(this);



    $this.data('before', $this.html());
    return $this;
}).on('blur keyup paste input', '.tblGridBody [contenteditable]', function () {
    var $this = $(this);
    if ($this.data('before') !== $this.html()) {
        $this.data('before', $this.html());
        // $this.trigger('change');

    }
    return $this;
});

//cell click
$(document).on("dblclick", ".tblGridBody tr td", function () {

    var selectedTR = $(this); crnwTD = selectedTR;


    //    crnwTR = $(crnwTD).parent();
    //    crnwTable = $(crnwTD).parents('table.tblGridBody');
    //    crnwTableCon = $(crnwTD).parents('.nwGrid');
    if (nwgrid_IsKeyboardPress == true)
        ;
    else {
        nwGrid_SetSelectedObjects(selectedTR);
        nwGrid_SetSelectedFunction();
    } nwgrid_IsKeyboardPress = false;

    if ($(this).parents(".noah-webui-disabled").attr("class") != undefined) return;
    //$('.tblGridBody tr td').removeClass('nwgridSelected');
    //  nwGrid_SetSelectedFunction();

    //08/10/2017 - PJS
    if ($(this).hasClass("noah-webui-disabled")) return;



    var ParentI = selectedTR.parent().parent().parent().parent().parent().parent().parent().parent();
    crnwTable = ParentI;
    var rower = nwGrdi_Row(selectedTR);
    crnwTR = rower;
    try { nwGrdi_DblClick(ParentI, rower, selectedTR); }
    catch (err) { }
    try { nwGrid_DblClick(ParentI, rower, selectedTR); }
    catch (err) { }
    func_callDefInput();
});


//nwGrid td click
var prnwTD;
$(document).on("mousedown", ".tblGridBody tr td", function (event) {

    if (event.which == 3) return;

    try {
        if ($(this).find("div[contenteditable]").attr("contenteditable") == "true" || $(this).find("div[contenteditable]").attr("contenteditable") == "plaintext-only") {
            $(this).find("div[contenteditable]").focus();
            document.execCommand('selectAll', false, null);
        }
        if ($(this).attr("contenteditable") == "true" || $(this).attr("contenteditable") == "plaintext-only") {
            $(this).focus();
            document.execCommand('selectAll', false, null);
        }
    } catch (err) { }


    try {
        if ($(this).find("div[contenteditable]").attr("contenteditable") == "true" || $(this).find("div[contenteditable]").attr("contenteditable") == "plaintext-only") {
            $(this).focus();
        }
    } catch (err) { }


    var selectedTR = $(this);

    if (nwgrid_IsKeyboardPress == true)
        ;
    else {
        nwGrid_SetSelectedObjects(selectedTR);
        nwGrid_SetSelectedFunction();
    } nwgrid_IsKeyboardPress = false;

    if ($(this).parents(".noah-webui-disabled").attr("class") != undefined) {
        var isContinue = false;
        try { isContinue = nwGrid_ClickDisabled(ParentI, rower, selectedTR); } catch (err) { }

        if (isContinue == false) return; // if isContinue == true  tutuloy sa current process > nwGrid_Click

    }

    xnwGrid_isHover = true;
    nwGrid_Selected(crnwTD);
    xnwGrid_isHover = false;

    //alert(selectedTR);
    //var ParentI = selectedTR.parent().parent().parent().parent().parent().parent().parent().parent().attr("id");
    var ParentI = $(this).parents('.nwGrid').attr("id");
    try {
        var rower = nwGrdi_Row(selectedTR);
        crnwTR = rower;
        try { nwGrid_tdClick(ParentI, rower, selectedTR); } catch (err) { }
        try { nwGrid_Click(ParentI, rower, selectedTR); } catch (err) { }
    }
    catch (err) { }
    func_callDefInput();

    try {
        if (nwisMobile)
            $(this).dblclick();

    } catch (err) { }
    //alert(selectedTR.parents("tr").index() +" - " +  selectedTR.index());
});

$(document).on("focus", ".nwGridDefInput", function (e) {
    nwGrid_SetSelectedGrid($(this).parents(".nwGrid").attr("id"), undefined, undefined);
});

var var_func_interface_active = 0;
$(document).on("mouseover", "body", function () {
    try {

        //var len = $('.nwGridComputeWidth').length;
        //for (var i = 0; i < len; i++) {
        //    var gridid = $('.nwGridComputeWidth:eq(' + i + ')').attr("id");
        //    nwGrdi_TableAdjust(gridid);
        //    $('.nwGridComputeWidth:eq(' + i + ')').removeClass("nwGridComputeWidth");
        //}
        //if (len >= 1) {
        //    $(window).resize();
        //}



        if (var_func_interface_active >= 30) {
            parent.func_interface_active();
            var_func_interface_active = 0;
        }
        var_func_interface_active++;

    } catch (err) { }
});


//$(document).on("keydown", ".nwGrid td.aagnwlookupgrid.nwgridSelected", function(event) {
//    try {
//   
//        if($(this).find("input.aagnwlookupgridchild") != undefined)
//        {
//            
//        }
//        else {

//        }
//       
//    }
//    catch (err) { }
//});

$(document).on("click", ".nkTable tr td", function () {
    crnwTD = $(this);
    crnwTR = $(this).parents("tr");
    crnwTable = $(this).parents("table");
});
$(document).on("click", ".nkTable tr td .btn-edit", function () {
    crnwTD = $(this).parents("td");
    crnwTR = $(this).parents("tr");
    crnwTable = $(this).parents("table");
});
$(document).on("click", ".nkTable tr td .attach-icon", function () {
    crnwTD = $(this).parents("td");
    crnwTR = $(this).parents("tr");
    crnwTable = $(this).parents("table");

    $("#myfile").val("");
    $(".percent").text("");
    $("#status").text("");
    $(".bar").width(0);

    nwPopupForm_ShowModal("nwUploadCon");

});
$(document).on("click", ".nkTable tr td .delete-icon", function () {
    crnwTD = $(this).parents("td");
    crnwTR = $(this).parents("tr");
    crnwTable = $(this).parents("table");

    crnwTD.find(".searchdoc-icon").removeClass("withattach");
    crnwTD.find(".attach-path").text("");

    try {
        func_AttachmentRemove();
    } catch (err) { }

});



$(document).on("click", ".nkTable tr td .searchdoc-icon", function () {
    crnwTD = $(this).parents("td");
    crnwTR = $(this).parents("tr");
    crnwTable = $(this).parents("table");
    var path = crnwTD.find(".attach-path").text();
    nwPopupForm_ShowModal("docviewer");
    $("#docid").attr("src", nwServerLink + path);

});





$(document).on("dblclick", ".nwGrid td.aagnwlookupgrid", function () {
    try {
        if ($(this).hasClass("aagnwlookupgrid")) {

            try {
                var isContinue = func_LookupDblClick($(this).attr("nwlookupid"));
                if (isContinue == false) return isContinue;
            } catch (err) { }

            if ($('#dimMessageBox').css("display") == "none") {

                lookUpCustomize($(this).attr("nwlookupid"), 1);
            }

        }
    }
    catch (err) { }
});

var islookupEditText = false;
$(document).on("blur", ".nwGrid td input.aagnwlookupgridchild", function () {

    var xval = $(this).val();
    var isLoaded = false;
    if (xval == "") {
        $('.aagnwlookupgridchild').remove();

        try {
            $(this).parent().find("input").removeClass("nwhide");
        } catch (err) { }

        return true;
    }
    try {
        $(this).parent().find("input").val(xval);
        $(this).parent().find("input").removeClass("nwhide");
        isLoaded = true;
    } catch (err) { }

    if (isLoaded == false) {
        try {
            $(this).parent().text(xval);
            isLoaded = true;
        } catch (err) { }
    }


    var lugcode = $(this).parent().attr("nwlookupid");
    var nwChar = $(this).val();
    nwLoading_Start("nwStandardLoading", crLoadingHTML);

    try {
        $('#menuCreatorContainer .tablecontainter > table').remove();
    } catch (err) { }
    crLooupTextSel = nwChar;

    try {
        nwGrid_Click(crnwTD.parents(".nwGrid").attr(id))
    } catch (err) { }
    try {
        nwGrid_DblClick(crnwTD.parents(".nwGrid"))
    } catch (err) { }
    try {
        nwGrdi_DblClick(crnwTD.parents(".nwGrid"))
    } catch (err) { }



    setTimeout(function () {
        nwParameter_Add("aagLookUpSearchCode", "true");
        nwParameter_Add("aagLookUpAutoDone", "true");
        $('#txtlookupsearch').val(nwChar);
        //lookUpA(lugcode);
    }, 10);
    $('.aagnwlookupgridchild').remove();
    islookupEditText = false;

});

$(document).on("keyup", ".nwGrid td input.aagnwlookupgridchild", function (e) {
    islookupEditText = true;
    var lugcode = $(this).parent().attr("nwlookupid");
    var nwChar = $(this).val();
    //nwLoading_Start("nwStandardLoading", crLoadingHTML);

    try {
        $('#menuCreatorContainer .tablecontainter > table').remove();
    } catch (err) { }
    crLooupTextSel = nwChar;
    try {
        nwGrid_Click(crnwTD.parents(".nwGrid").attr(id))
    } catch (err) { }
    try {
        nwGrid_DblClick(crnwTD.parents(".nwGrid"))
    } catch (err) { }
    try {
        nwGrdi_DblClick(crnwTD.parents(".nwGrid"))
    } catch (err) { }


    setTimeout(function () {
        nwParameter_Add("aagLookUpSearchCode", "true");
        $('#txtlookupsearch').val(nwChar);
        lookUpA(lugcode);
    }, 10);

});
$(document).on("keyup", "#txtlookupsearch", function (e) {

    if (nwLookupAutoSearch == true) {
        $("#txtlookupsearch").parents(".ContainerContent").find(".tablecontainter").addClass("nwloadingdata");
        setTimeout(function () {
            if (e.which != 13
            && !(e.which >= 37 && e.which <= 40)
            && !e.ctrlKey && !e.shiftKey
             ) {

                var txtsearch = $("#txtlookupsearch").val();
                txtsearch = "txtlookupsearch_aag" + txtsearch.replaceAll("@", "_").replaceAll(" ", "_").replaceAll("%", "_").replaceAll("#", "_").replaceAll(".", "_").replaceAll("%", "_").replaceAll("*", "_").replaceAll("]", "_").replaceAll("[", "_");
                $("#txtlookupsearch").attr("class", "search " + txtsearch);
                $('.LookuptableHeader').css('opacity', 0.7); $('.tablecontainter').css('opacity', 0.7);
                $('.LookUpRefresh').click();
            }

        }, 40);
    }
});
$(document).on("keyup", ".lookupcolSearch", function (e) {
    //$("#txtlookupsearch").parents(".ContainerContent").find(".tablecontainter").addClass("nwloadingdata");

    if (e.which == 13) {
        nw_dataLookupFocus = $(this);
        lookUpLoadDataSetupRuntime();
        return false;
    }

});
$(document).on("focus", ".lookupcolSearch", function (e) {
    $('#menuCreatorContainer .tablecontainter').scrollLeft($('#menuCreatorContainer .LookuptableHeader').scrollLeft());
});

//$(document).on("change", ".nwGrid td input.aagnwlookupgridchild", function() {
//    var lugcode = $(this).parent().attr("nwlookupid");
//    var nwChar = $(this).val();
//    nwLoading_Start("nwStandardLoading", crLoadingHTML);
//    $('#txtlookupsearch').val(nwChar);
//    try {
//        $('#menuCreatorContainer .tablecontainter > table').remove();
//    } catch (err) { }
//    crLooupTextSel = nwChar;

//    try {
//        nwGrid_Click(crnwTD.parents(".nwGrid").attr(id))
//    } catch (err) { }
//    try {
//        nwGrid_DblClick(crnwTD.parents(".nwGrid"))
//    } catch (err) { }
//    
//    setTimeout(function() {
//        nwParameter_Add("aagLookUpSearchCode", "true");
//        lookUpA(lugcode);
//    }, 10);

//});
//
var crLooupTextSel = "";
var crLooupTextObj = "";
function func_CallLookupDone() {
    var code = "";
    try {
        var xlength = $("#menuCreatorContainer .tablecontainter table").find("tr").length;
        var code = $("#menuCreatorContainer .tablecontainter table tr:eq(1)").find("td:eq(0)").text();
        var crnwTes = crLooupTextSel; //crnwTD.find("input.aagnwlookupgridchild").val();
        code = crnwTes;
        var lugcode = $("#menuCreatorContainer .LookupID").text();

        var isInvalidCode = true;
        for (var i = 0; i < xlength; i++) {
            if ($("#menuCreatorContainer .tablecontainter table tr:eq(" + i + ")").find("td:eq(0)").text().toUpperCase()
                == crnwTes.toUpperCase()) {
                isInvalidCode = false;
                code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + i + ")").find("td:eq(0)").text();
                break;
            }
        }



        if (xlength <= 2 && code != "" && code != undefined && isInvalidCode == false) {
            try {
                crLooupTextObj.find("input").val(code);
            } catch (err) {
                crLooupTextObj.text(code);
            }


            var tempTD = crnwTD;
            var tempTR = crnwTR;

            crnwTD = crLooupTextObj;
            crnwTR = crLooupTextObj.parent();

            Lookup_DoneFunction(lugcode, 1, code);
            crnwTD = tempTD;
            crnwTR = tempTR;

            func_ClearLookup(true);

        }
        else {
            if (crLooupTextObj == undefined) crLooupTextObj = crnwTD;
            try {
                $('.aagnwlookupgridchild').remove();
                crLooupTextObj.find("input").val("");
            } catch (err) { }
            //crLooupTextObj.text("");
            try {
                if (code != "") Lookup_LoadFailed(lugcode, code);
            } catch (err) { }
        }

        //var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(1)").find("td:eq(1)").text();
    } catch (err) { }


    // alert("sucess:" + code);


}


function getCaretPosition(editableDiv) {
    var caretPos = 0,
      sel, range;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            if (range.commonAncestorContainer.parentNode == editableDiv) {
                caretPos = range.endOffset;
            }
            else caretPos = range.endOffset;
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        if (range.parentElement() == editableDiv) {
            var tempEl = document.createElement("span");
            editableDiv.insertBefore(tempEl, editableDiv.firstChild);
            var tempRange = range.duplicate();
            tempRange.moveToElementText(tempEl);
            tempRange.setEndPoint("EndToEnd", range);
            caretPos = tempRange.text.length;
        }
    }
    return caretPos;
}

$(document).on("mousedown", "input,textarea", function () {

    if ($(this).parents(".nwGrid").html() == undefined) {
        currentClicksObj = $(this);
    }
    else {
        currentClicksObj = undefined;
    }

});

var currentClicksObj;
var nwgrid_IsKeyboardPress = false;
var keytemp_crnwTable = null;
var currentFocusObj;
var genvarkey = null;
var genprevindex = null;
var gencrnwTD = null;
var genIsButtonFrom = false;
/// keypress
/// arrow key arrowkey
/// nwgrid navigate 
/// nwgrid 
/// document keypress
//,input.nwGridDefInput
// e.ctrlKey && e.which e.shiftKey
$(document).on("keydown", "body", function (e) {


    if ($(":focus").hasClass("nwBarcode"))
        return true;


    try { func_KeyPress(e); } catch (err) { }

    if ($(":focus").hasClass("P8Spread_Input"))
        return true;

    //if loading or popup
    var numberLoading = $('.dimbg.openn').length + $('.nwLoading').length;
    if ($('#dimbgNW.openn').length >= 1) {
        if ($('#dimbgNW.openn').css("display") != "none") {
            numberLoading += 1;
        }
    }


    //if ($('.noah-webui-Standard').hasClass('noah-webui-Standard'))//noah-webui-Standard
    //console.log("aaa"+e.which);

    currentFocusObj = $(":focus");

    //if ($(currentFocusObj).parents("td").parents(".nwGrid").attr("id") != undefined &&
    //    !(e.which == 37 || e.which == 38 || e.which == 39 || e.which == 40 || e.which == 9)
    //) {
    //    if (e.which == 9) { genvarkey = 9; $(this).keydown(); return false; }


    //    return true;
    //}

    var isLookUpWindow = false;
    try {
        if ($('#menuCreatorContainer').css("display") != "none") {
            isLookUpWindow = true;
        }
    } catch (err) { }



    try {
        // console.log($(currentFocusObj).parents(".nwGrid").attr("id") + " " + ($(currentFocusObj).parents(".nwgrid_buttonsCon").index() + 1) + " == " + $(currentFocusObj).parents(".nwGrid").find("div.nwgridButtons").find("button.nwgrid_buttons").length);
        if ((
        ($(currentFocusObj).hasClass("nwgrid_buttons") && $(currentFocusObj).parents(".nwgrid_buttonsCon").index() + 1 < $(currentFocusObj).parents(".nwGrid").find("div.nwgridButtons").find(".nwgrid_buttons").length)
        || $(currentFocusObj).hasClass("nwgrid_SearchNext")
        )
       && e.which == 9
        ) {
            console.log(($(currentFocusObj).parents(".nwgrid_buttonsCon").index()) + "aaa" + $(currentFocusObj).parents(".nwGrid").find("div.nwgridButtons").find("button.nwgrid_buttons").length);
            return true;
        }

    } catch (err) { }

    try {
        // console.log($(currentFocusObj).parents(".nwGrid").attr("id") + " " + ($(currentFocusObj).parents(".nwgrid_buttonsCon").index() + 1) + " == " + $(currentFocusObj).parents(".nwGrid").find("div.nwgridButtons").find("button.nwgrid_buttons").length);
        if ($(currentFocusObj).parents(".nwgrid_buttonsCon").index() >= 0 && $(currentFocusObj).parents(".nwgrid_buttonsCon").index() + 1 == $(currentFocusObj).parents(".nwGrid").find("div.nwgridButtons").find("button.nwgrid_buttons").length
       && e.which == 9
        ) {
            genIsButtonFrom = true;
            nwGrid_SetSelectedGrid($(currentFocusObj).parents(".nwGrid").attr("id"), undefined, undefined);
            $(currentFocusObj).blur();
            genIsButtonFrom = false; return false; //hope 
        }

    } catch (err) { }


    var isnotGridObj = true;

    try {
        if ($(currentFocusObj).parents(".nwGrid").hasClass("nwGrid")) isnotGridObj = false;
    } catch (err) {
        isnotGridObj = true;
    }
    //console.log(1);//aaglog
    if (
        !$(currentFocusObj).hasClass("P8Spread_Input") &&
        currentFocusObj.prop("tagName") != undefined &&
        (e.which == 9
                || e.which == 40 || e.which == 38
                || e.which == 37 || e.which == 39
            )
        ) {


        var contentedit = currentFocusObj.attr("contenteditable") || "";

        if ((currentFocusObj.prop("tagName").toLowerCase() == "input"
        || currentFocusObj.prop("tagName").toLowerCase() == "button"
        || currentFocusObj.prop("tagName").toLowerCase() == "textarea"
        || currentFocusObj.prop("tagName").toLowerCase() == "select"
        || contentedit == "true"
        || contentedit == "plaintext-only"
        ) && isnotGridObj == false) {

            var xvalue = "";



            if (currentFocusObj.prop("tagName").toLowerCase() == "input"
               || currentFocusObj.prop("tagName").toLowerCase() == "textarea"
               || currentFocusObj.prop("tagName").toLowerCase() == "select"
                || contentedit.toLowerCase() == "true"
                || contentedit.toLowerCase() == "plaintext-only"

               ) {
                if (contentedit == "true" || contentedit == "plaintext-only") {
                    xvalue = currentFocusObj.text();

                    var xindex = getCaretPosition(currentFocusObj);

                    try {
                        if (window.getSelection && (e.which == 39 || e.which == 40 || e.which == 37 || e.which == 38)) {
                            sel = window.getSelection();
                            if (sel.rangeCount) {
                                range = sel.getRangeAt(0);


                                if (xindex == 0 && e.which == 38) {
                                    newNode = document.createElement("p");
                                    newNode.appendChild(document.createTextNode("p8endcheck"));
                                    range.insertNode(newNode);
                                    if (($(currentFocusObj).text() + "").startsWith("p8endcheck")
                                        || ($(currentFocusObj).html() + "").startsWith("<p>p8endcheck</p>")
                                        ) {
                                        xindex = 0;
                                    }
                                    else {
                                        xindex = 1;
                                    }
                                    $(currentFocusObj).html($(currentFocusObj).html().replaceAll("<p>p8endcheck</p>", ""));
                                }
                                else if ($(range.commonAncestorContainer.parentNode).html() == range.commonAncestorContainer) {
                                    if (xindex == xvalue.length - 1 && (e.which == 39 || e.which == 40))  // turn right down
                                        xindex = xvalue.length;
                                    else if (xindex == 0 && e.which == 37) {
                                        xindex = 0;
                                    }
                                    else xindex = 1;
                                }
                                else {
                                    //if newline

                                    if ((xindex == 0 && range.commonAncestorContainer.length == 1)
                                        ||
                                        (xindex >= range.commonAncestorContainer.length && (e.which == 39 || e.which == 40))) // turn right down
                                    {
                                        range.commonAncestorContainer.appendData("p8endcheck");
                                        if (($(currentFocusObj).text() + "").endsWith("p8endcheck")) {
                                            xindex = xvalue.length;
                                        }
                                        $(range.commonAncestorContainer.parentNode).html($(range.commonAncestorContainer.parentNode).html().replaceAll("p8endcheck", ""));
                                    }
                                    if (xindex == 0 && ($(currentFocusObj).text()).length >= 1 && (e.which == 40) && $(range.commonAncestorContainer).text() == '\n')  // down with zero index
                                    {
                                        xindex = 1;
                                    }
                                    else if (xindex >= ($(currentFocusObj).text()).length - 1 && (e.which == 40 || e.which == 39))  // down with zero index
                                    {
                                        xindex = xvalue.length;
                                    }


                                    else if (xindex == 0 && (e.which == 37)) {
                                        newNode = document.createElement("p");
                                        newNode.appendChild(document.createTextNode("p8endcheck"));
                                        range.insertNode(newNode);
                                        if (($(range.commonAncestorContainer.parentNode).text() + "").startsWith("p8endcheck")
                                            || ($(range.commonAncestorContainer.parentNode).html() + "").startsWith("<p>p8endcheck</p>")
                                            //|| ($(range.commonAncestorContainer).html() + "").startsWith("p8endcheck")
                                            //|| ($(range.commonAncestorContainer).html() + "").startsWith("<p>p8endcheck</p>")
                                            ) {
                                            xindex = 0;
                                        }
                                        else {
                                            xindex = 1;
                                        }
                                        $(range.commonAncestorContainer.parentNode).html($(range.commonAncestorContainer.parentNode).html().replaceAll("<p>p8endcheck</p>", ""));
                                    }

                                }

                            }
                        }
                    } catch (err) { }
                    //range.commonAncestorContainer.appendData("p8endcheck");


                    func_nwGridScrollingPane(e.which);



                    if (xindex > 0 && xindex < xvalue.length) {
                        return true;
                    }
                    if (xindex == xvalue.length && e.which == 37 && xvalue != "") {
                        return true;
                    }
                    if (xindex == 0 && e.which == 39 && xvalue != "") {
                        return true;
                    }

                }
                else
                    xvalue = currentFocusObj.val();

                func_nwGridScrollingPane(e.which);


                //console.log(e.target.selectionStart + " @@ " + xvalue.length + " @@ " + e.which);
                // Commented by KSG
                // ---- ** Added by JMR
                if ($(currentFocusObj).hasClass("nwtexteareEnter")) {
                    if (e.which == 38) {
                        if (e.target.selectionStart > 0 && e.target.selectionStart <= xvalue.length) {
                            return true;
                        }
                    }
                    else if (e.which == 40) {
                        if (e.target.selectionStart >= 0 && e.target.selectionStart < xvalue.length) {
                            return true;
                        }
                    }
                    else {

                        if (e.target.selectionStart > 0 && e.target.selectionStart < xvalue.length) {
                            return true;
                        }
                    }
                }
                else {
                    // ----- Original Code
                    if (e.target.selectionStart > 0 && e.target.selectionStart < xvalue.length) {
                        return true;
                    }
                    // -----
                }


                if (e.target.selectionStart == xvalue.length && e.which == 37 && xvalue != "") {
                    return true;
                }
                if (e.target.selectionStart == 0 && e.which == 39 && xvalue != "") {
                    return true;
                }

            } else {
                xvalue = currentFocusObj.text();
            }

            //e.target.selectionStart


            console.log(1.1); //aaglog

            if (e.which == 9 || e.which == 39)
                genvarkey = 39;
            else genvarkey = e.which;

            $(this).keydown();
            $(crnwTD).focus();
            //$(currentFocusObj).focusOut();
            setTimeout(function () {
                $(currentFocusObj).blur();


            }, 30);
            //func_nwGridAutoScroll(elementTyper, genvarkey);

            //$(crnwTableCon).find("table.tblGridBody").css("position", "fixed");
            //$(crnwTableCon).find("table.tblGridBody").css("position", "relative");

            return isnotGridObj;
        }
    }
    //console.log(2);//aaglog
    if (genvarkey != null) {
        // for recall for previous for hide column

        e.which = genvarkey;
        genvarkey = null;
    }

    //alert(e.which);
    var isselecttion = false;
    try {
        if ($("body").p8Selection() != "") isselecttion = true;;
    } catch (err) { isselecttion = false; }
    if (e.ctrlKey && e.which == 85 && isselecttion == false) return false; //ctr + u
    if (e.ctrlKey && e.which == 83) return false; //ctr + s
    if (e.ctrlKey && e.shiftKey) {
        return false;;
        if (e.which == 73 //ctr + shift + i
        || e.which == 75 //ctr + shift + k
        || e.which == 83 //ctr + shift + s
        || e.which == 81 //ctr + shift + Q
        || e.which == 67 //ctr + shift + C
        ) {

            return false;
        }
    }
    if (e.shiftKey) {
        if (e.which == 118 //shift + F7
     || e.which == 116 //shift + F5
        )
            return false;
    }



    if (e.ctrlKey && e.which == 76 && nwDevMode) {
        if ($("#nwlog_Con").html() == undefined) {
            $("body").append("<div id='nwlog_Con' style='min-width:400px;min-height:400px' nwTitle='Update Logs'><div class='nwlog_ConSub'><pre></pre></div></div>");
            isLibraryObject = true;
            nwPopupForm_Create("nwlog_Con", true);
            isLibraryObject = false;
        }
        else {
            $("#nwlog_Con .nwlog_ConSub").html("<pre></pre>");
        }
        nwPopupForm_ShowModal("nwlog_Con");
        $("#nwlog_Con .nwlog_ConSub pre").load("log.txt", function (response, status, xhr) {
            if (status == "error") {
                var msg = "No Logs Found.";
                $("#nwlog_Con .nwlog_ConSub pre").html(msg);
            }

        });


    }



    if (e.altKey) {
        if ($("#nwLoadingContainer").find("div").length >= 1 || (jQuery("#dimbgNW").outerWidth() >= 10 && jQuery("#dimbgNW").outerHeight() >= 10 && jQuery("#dimbgNW").css("display").indexOf("none"))) {
            //||  (jQuery("#dimbgNW").hasClass('openn') && !jQuery("#dimbgNW").css("display").indexOf("none")>=0)
        }
        else {
            if (numberLoading <= 0) {
                if (e.which == 78) // N
                {
                    if ($('#noah-webui-default-New.noah-webui-Toolbox-Item').hasClass("noah-webui-hidden")
                 || $('#noah-webui-default-New.noah-webui-Toolbox-Item').css("display") == "none")
                        ; else
                        $('#noah-webui-default-New.noah-webui-Toolbox-Item').click();
                }
                else if (e.which == 82) // R
                {
                    if ($('#noah-webui-default-Refresh.noah-webui-Toolbox-Item').hasClass("noah-webui-hidden")
                 || $('#noah-webui-default-Refresh.noah-webui-Toolbox-Item').css("display") == "none")
                        ; else
                        $('#noah-webui-default-Refresh.noah-webui-Toolbox-Item').click();
                }
                else if (e.which == 81) // Q
                {
                    if ($('#noah-webui-default-Inquire.noah-webui-Toolbox-Item').hasClass("noah-webui-hidden")
                 || $('#noah-webui-default-Inquire.noah-webui-Toolbox-Item').css("display") == "none")
                        ; else
                        $('#noah-webui-default-Inquire.noah-webui-Toolbox-Item').click();
                }
                else if (e.which == 83) // S
                {
                    if ($('#noah-webui-default-Save.noah-webui-Toolbox-Item').hasClass("noah-webui-hidden")
                 || $('#noah-webui-default-Save.noah-webui-Toolbox-Item').css("display") == "none")
                        ; else
                        $('#noah-webui-default-Save.noah-webui-Toolbox-Item').click();
                }
                else if (e.which == 68) // D
                {
                    if ($('#noah-webui-default-Delete.noah-webui-Toolbox-Item').hasClass("noah-webui-hidden")
                 || $('#noah-webui-default-Delete.noah-webui-Toolbox-Item').css("display") == "none")
                        ; else
                        $('#noah-webui-default-Delete.noah-webui-Toolbox-Item').click();
                }
                else if (e.which == 69) // E
                {
                    if ($('#noah-webui-default-Export.noah-webui-Toolbox-Item').hasClass("noah-webui-hidden")
                || $('#noah-webui-default-Export.noah-webui-Toolbox-Item').css("display") == "none")
                        ; else
                        $('#noah-webui-default-Export.noah-webui-Toolbox-Item').click();
                }
                else if (e.which == 84) // T
                {
                    if ($('#noah-webui-default-Process.noah-webui-Toolbox-Item').hasClass("noah-webui-hidden")
                || $('#noah-webui-default-Process.noah-webui-Toolbox-Item').css("display") == "none")
                        ; else
                        $('#noah-webui-default-Process.noah-webui-Toolbox-Item').click();
                }
                else if (e.which == 80) // P
                {
                    if ($('#noah-webui-default-Print.noah-webui-Toolbox-Item').hasClass("noah-webui-hidden")
                || $('#noah-webui-default-Print.noah-webui-Toolbox-Item').css("display") == "none")
                        ; else
                        $('#noah-webui-default-Print.noah-webui-Toolbox-Item').click();
                }

                else {
                    // if (e.which != 18) alert(e.which);
                }
            }
            else {
                return false;
            }
        }

        if (!(e.which >= 37 && e.which <= 40)) {
            if ($(currentFocusObj).hasClass("P8Spread_Input")) {
                //e.preventDefault();
                return true;
            }
            return false;
        }
    }

    if ($(currentFocusObj).hasClass("P8Spread_Input")) {
        // e.preventDefault();
        return true;
    }

    var isLookupsearch = false;
    if ($(currentFocusObj).hasClass("search")) {
        if ($(currentFocusObj).attr("id") == "txtlookupsearch") isLookupsearch = true;
    }
    if (isLookupsearch && e.which != 16) //e.shiftKey &&
    {
        var selected = $("#menuCreatorContainer").find(".tablecontainter tbody tr.LKselected");
        var xindex = -1;
        try { xindex = $(selected).index(); } catch (err) { }

        if (e.which == 27) // escape
        {
            func_windowsClosing(); return false;
        }
        else if (e.which == 13) {
            if (selected.html() != undefined) $(selected).mousedown();
        }



        //alert(e.which);
        if (e.which == 40) // down
        {
            //alert(selected);
            if (selected.html() == undefined) $("#menuCreatorContainer").find(".tablecontainter tbody tr:eq(1)").addClass("LKselected");
            else {
                xindex += 1;
                $("#menuCreatorContainer").find(".tablecontainter tbody tr").removeClass("LKselected");
                $("#menuCreatorContainer").find(".tablecontainter tbody tr:eq(" + xindex + ")").addClass("LKselected");
            }

            //  $("#txtlookupsearch").val($('.LKselected').offset().top + " " + $('.tablecontainter').scrollTop());
            //             if($('.LKselected').offset().top >= ($('.tablecontainter').height() - $('.tablecontainter').scrollTop()) )
            //                    $('.tablecontainter').scrollTop($('.LKselected').offset().top + $('.LKselected').height());
            //            



            //$('.tablecontainter').scrollTop($('.LKselected').offset().top+$('.LKselected').height());

            $("#txtlookupsearch").focus();
            $('#txtlookupsearchF').focus();
        }
        else if (e.which == 38)  // up
        {
            // alert(selected);
            if (selected.html() == undefined) $("#menuCreatorContainer").find(".tablecontainter tbody tr:eq(1)").addClass("LKselected");
            else {
                xindex -= 1;
                $("#menuCreatorContainer").find(".tablecontainter tbody tr").removeClass("LKselected");
                $("#menuCreatorContainer").find(".tablecontainter tbody tr:eq(" + xindex + ")").addClass("LKselected");
            }


            //$("#txtlookupsearch").val($('.LKselected').offset().top + " " + $('.tablecontainter').scrollTop());

            $("#txtlookupsearch").focus();
            $('#txtlookupsearchF').focus();
        }
        else if (e.which == 37) // left
        {
            $("div.lookupPrev").click();
        }
        else if (e.which == 39) // right
        {
            $("div.lookupNext").click();
        }

        return;
    }



    if (keytemp_crnwTable != null && keytemp_crnwTable != undefined) { crnwTable = keytemp_crnwTable; keytemp_crnwTable = null; }

    if (e.which == 113) // F2
    {
        try {
            keytemp_crnwTable = crnwTable;
            crnwTD.click();
            crnwTD.dblclick();

            if (crnwTD.hasClass("aagnwlookupgrid")) {
                lookUpCustomize(crnwTD.attr("nwlookupid"), 1);
            }
        }
        catch (err) { }
    }


    //console.log(3);//aaglog

    if (e.which == 27) // escape
    {
        func_windowsClosing(); return;
    }
    if (currentFocusObj.parents(".nwGrid").hasClass('nwGrid') == false && currentFocusObj.prop('tagName') != undefined) return true;
    else {
        var tagName = currentFocusObj.prop('tagName') || "";
        if (e.which == 8  /// back space
    && (currentFocusObj.attr("contenteditable") == "true" || currentFocusObj.attr("contenteditable") == "plaintext-only" || tagName.toLowerCase() == "input" || tagName.toLowerCase() == "textarea" || tagName.toLowerCase() == "select" || tagName.toLowerCase() == "button")
    )
            return true;
        //else if (e.which == 8)
        //    return false;
    }


    if (crnwTable == undefined || crnwTable == null) return true;
    if ($(crnwTable).parents(".nwGrid").attr("id") == undefined) return true;

    try {



        ////console.log((currentFocusObj.parents(".nwGrid").attr("id") == undefined &&
        //    (currentFocusObj == undefined || currentFocusObj.prop("tagName") == "INPUT" || currentFocusObj.prop("tagName") == "TEXTAREA" || currentFocusObj == "SELECT" || currentFocusObj.prop("tagName") == "BUTTON")
        //    && (!crnwTableCon.hasClass("nwGridSelectedAAG"))));

        ////console.log(currentFocusObj.prop("tagName") + " @ " + currentFocusObj.html() +" @ " + (currentFocusObj.parents(".nwGrid").attr("id") == undefined &&
        //   (currentFocusObj == undefined || currentFocusObj.prop("tagName") == undefined || currentFocusObj.prop("tagName") == "INPUT" || currentFocusObj.prop("tagName") == "TEXTAREA" || currentFocusObj == "SELECT" || currentFocusObj.prop("tagName") == "BUTTON")
        //   ));


        //console.log((!crnwTableCon.hasClass("nwGridSelectedAAG")));

        if (//currentFocusObj.parents(".nwGrid").attr("id") == undefined && 
            //  (currentFocusObj == undefined || currentFocusObj.prop("tagName") == undefined || currentFocusObj.prop("tagName") == "INPUT" || currentFocusObj.prop("tagName") == "TEXTAREA" || currentFocusObj == "SELECT" || currentFocusObj.prop("tagName") == "BUTTON")
            //   &&
        (!crnwTableCon.hasClass("nwGridSelectedAAG"))
        || crnwTableCon == undefined
        || (currentFocusObj.parents(".nwGrid").attr("id") != undefined && currentFocusObj.hasClass("nwgrid_buttons"))

        ) {

            // currentFocusObj = null;
            return true;
        }
        else {
            if (($(".nwGridSelectedAAG").attr("id") == undefined))
                return true;

            if (!crnwTableCon.hasClass("nwGridSelectedAAG")) {
                crnwTR = crnwTable.find("tr:eq(0)");
                crnwTD = crnwTable.find("tr:eq(0) td:eq(0)");
            }
        }

    } catch (err) {
        // alert(err);
        //return true;

    }

    var varobj = $(this).find(crnwTable).find("td.nwgridSelected");

    if (e.shiftKey) return;
    try {
        if (!($(varobj).prop("tagName").toLowerCase() == "input"
        || currentFocusObj.prop("tagName").toLowerCase() == "button"
        || currentFocusObj.prop("tagName").toLowerCase() == "textarea"
        || currentFocusObj.prop("tagName").toLowerCase() == "select"
        ) && !($(varobj).hasClass("hasDatepicker"))) $('.ui-datepicker').css("display", "none");
    } catch (err) { }

    var isReturn = true;
    var e_which = e.which;
    var isTabKey = false;
    if (e.which == 9) isTabKey = true;
    /// FOR nwGrid Arrow Key and tab


    ////
    //alert(String.fromCharCode(e.which));
    var character = String.fromCharCode(e.which);
    //nwconsole.log(character);
    if (character != "") {
        if ($(crnwTD).find("input.aagnwlookupgridchild").val() != undefined) {
            if (e_which == 9 || e_which == 39 || e_which == 37 || e_which == 38 || e_which == 40) {
                $(crnwTD).find("input.aagnwlookupgridchild").blur();

            }
            else {

            }
            //$(crnwTD).find("input.aagnwlookupgridchild").val($(crnwTD).text());
            //nwconsole.log($(crnwTD).find("input.aagnwlookupgridchild").val());
        }
        else {
            if (e_which == 9 || e_which == 39 || e_which == 37 || e_which == 38 || e_which == 40) {

            } else {
                var oldval = $(crnwTD).text();
                if ($(crnwTD).hasClass("aagnwlookupgrid") && !($(crnwTD).hasClass("aagnonEditable"))) {
                    var xcodeID = $(crnwTD).attr("nwlookupid");
                    crLooupTextObj = crnwTD;

                    $(crnwTD).find("input").not('.aagnwlookupgridchild').addClass("nwhide");
                    if ($(crnwTD).find("input").not('.aagnwlookupgridchild').val() != undefined)
                        $(crnwTD).prepend("<input class='aagnwlookupgridchild' list='" + xcodeID + "_DataList'  autocomplete='off' ondrop='return false;' />");
                    else
                        $(crnwTD).html("<input class='aagnwlookupgridchild' list='" + xcodeID + "_DataList'  autocomplete='off' ondrop='return false;' />");

                    if ($("#" + xcodeID + "_DataList").html() == undefined)
                        $('#nwDatalistCon').append("<datalist id='" + xcodeID + "_DataList' ></datalist>");

                    $(crnwTD).find("input.aagnwlookupgridchild").val(oldval);
                    $(crnwTD).find("input.aagnwlookupgridchild").focus();

                    //lookUpA(xcodeID);
                }
                else {
                    // key enter

                }



            }
        }
    }
    //

    //  console.log(e.which); //aaglog
    try {



        if (e_which == 9 || e_which == 39) // Tab key
        {
            isReturn = false;
            e_which = 39;
            //console.log(3.5);//aaglog

        }
        //console.log(4);//aaglog



        var selectedTR = $(varobj);
        var isValid = false;
        var rowcount = crnwTable.find("tr").length;
        var colcount = crnwTR.find("td").length;
        var elementType;
        var elementTyper;
        var indexCell = 0;
        var indexRow = 0;
        var xsides = "";
        var crcindex = crnwTD.index();
        var crrindex = crnwTR.index();

        //  console.log(e.which + "  " + e_which);
        if (e.ctrlKey && e.which == 67 && currentClicksObj == undefined) //copy
        {

            //if (crnwTD.find("div[contenteditable]").html() != undefined) {
            //    return true;
            //}


            var xtextToPutOnClipboard = crnwTD.text() + '';
            var xtextToPutOnClipboardHTML = crnwTD.text() + '';


            try {
                // alert(crnwTD.find("input").val());

                if (crnwTD.find("div[contenteditable=true]").text() != undefined && crnwTD.find("div[contenteditable=true]").text() != "") {

                    xtextToPutOnClipboard = crnwTD.find("div[contenteditable=true]").text();
                    xtextToPutOnClipboardHTML = xtextToPutOnClipboard;
                    crnwTD.find("div[contenteditable=true]").focus();
                    crnwTD.find("div[contenteditable=true]").select();
                } else if (crnwTD.find("div[contenteditable=plaintext-only]").text() != undefined && crnwTD.find("div[contenteditable=plaintext-only]").text() != "") {

                    xtextToPutOnClipboard = crnwTD.find("div[contenteditable=plaintext-only]").text();
                    xtextToPutOnClipboardHTML = xtextToPutOnClipboard;
                    crnwTD.find("div[contenteditable=plaintext-only]").focus();
                    crnwTD.find("div[contenteditable=plaintext-only]").select();
                }
                else if (crnwTD.find("input").val() != undefined) {

                    xtextToPutOnClipboard = crnwTD.find("input").val();
                    xtextToPutOnClipboardHTML = xtextToPutOnClipboard;
                }
                else if (crnwTD.find("textarea").val() != undefined) {

                    xtextToPutOnClipboard = crnwTD.find("textarea").val();
                    xtextToPutOnClipboardHTML = xtextToPutOnClipboard;
                }
                else if (crnwTD.find("select").val() != undefined) {

                    xtextToPutOnClipboard = crnwTD.find("select").val();
                    xtextToPutOnClipboardHTML = xtextToPutOnClipboard;
                }
                else if (crnwTD.find("button").text() != undefined && crnwTD.find("button").length >= 1) {

                    xtextToPutOnClipboard = crnwTD.find("button").text();
                    xtextToPutOnClipboardHTML = xtextToPutOnClipboard;
                }





            } catch (err) { }


            //visibility:hidden;
            crnwTD.append("<input class='nwGridCopy' style='padding:0;opacity:0;max-width:0px;width:0px;max-height:0;height:0;position:fixed;' />");
            $(crnwTableCon).find(".nwGridCopy").val(xtextToPutOnClipboard);
            $(crnwTableCon).find(".nwGridCopy").focus();
            $(crnwTableCon).find(".nwGridCopy").select();
            try {
                $(crnwTableCon).find(".nwGridCopy").setSelectionRange(0, 99999);
            } catch (err) { }

            document.execCommand("copy");

            setTimeout(function () {
                $(crnwTableCon).find(".nwGridCopy").remove();
            }, 1000);


            return false;
        }

        if (e_which == 40) // down
        {
            isValid = true;
            indexCell = crnwTD.index();
            indexRow = crnwTR.index() + 1;
            xsides = "top";


        }
        else if (e_which == 38)  // up
        {
            isValid = true;
            indexCell = crnwTD.index(),
            indexRow = crnwTR.index() - 1;
            xsides = "down";


            //  crnwTR.scrollTop(crnwTR.scrollTop() + crnwTR.outerHeight() * 2);

        }
        else if (e_which == 37) // left
        {
            isValid = true;
            indexCell = crnwTD.index() - 1,
            indexRow = crnwTR.index();
            xsides = "left";
        }
        else if (e_which == 39) // right
        {

            isValid = true;
            indexCell = crnwTD.index() + 1,
            indexRow = crnwTR.index();

            //alert(indexCell +"=="+ crnwTR.find("td").length);

            if (indexCell == crnwTR.find("td").length) // for Auto down
            {
                indexCell = 1;
                indexRow += 1;
                //   gencrnwTD = crnwTable.find("tr:eq(" + indexRow + ") td:eq(" + indexCell + ")");
            }

            //console.log(4.5);//aaglog
            xsides = "right";
        } else {

            func_nwGridScrolling(39);
            return true;
        }

        if (crnwTable.find(".nwGridSplitter").html() != undefined) {
            if (crnwTable.find(".nwGridSplitter").index() < crnwTR.index())
                indexRow = indexRow - 1;
        }
        if (indexRow >= crnwTable.find("tr").length)
            return false;



        if (colcount <= indexCell) return;
        if (rowcount <= indexRow) return;

        if (isValid == true) {
            try {
                //  var hasFocus = $(document.activeElement );
                // $(document.activeElement).css("background-color","red");
                // $(document.activeElement).focusout();
                //$(document.activeElement).blur();

                // if (isReturn==false) ;
            } catch (err) {
                //alert(err);
            }


            if (crnwTD.width() > 0) {
                gencrnwTD = crnwTD;
            }

            var isNotRealFocus = false;
            nwgrid_IsKeyboardPress = true;
            //console.log(5);//aaglog
            //   alert(indexCell + " " + indexRow);


            nwGrid_SetSelectedGrid(crnwTableCon.attr("id"), indexCell, indexRow);
            //alert(indexCell + " " + indexRow);
            //console.log(6);//aaglog

            if (crnwTD.width() <= 0 || crnwTD.css("display") == "none") {
                //e.which = 9;
                //console.log(6.5);//aaglog
                genvarkey = e_which;

                if (crnwTD.index() == genprevindex) // for deadlock with hide fields
                {
                    //  nwGrid_SetSelectedGrid(crnwTableCon.attr("id"), crcindex, crcindex);
                    genprevindex = -1;; //gencrnwTD.parent().index()

                    nwGrid_SetSelectedGrid(crnwTableCon.attr("id"), gencrnwTD.index(), indexRow);
                    genvarkey = null;;

                    return;
                }
                else {
                    if (e_which == 39) {

                        genvarkey = e_which;
                        $(this).keydown();
                        return false;
                    }
                }
                genprevindex = crnwTD.index();



                if (crnwTD.index() <= 0) return;
                else if (crnwTD.index() >= crnwTR.find("td").length - 1) return;

                //console.log(6.6 + " " + genprevindex);//aaglog
                genvarkey = e_which;
                $(this).keydown();
                //  return;
            }
            else genprevindex = -1;


            elementType = $(crnwTD).children().prop('tagName');


            //console.log(7);//aaglog

            if (elementType != undefined) {
                elementTyper = (elementType + "").toLowerCase();

                if ($(crnwTD).children().hasClass("nwgRemarks")) { elementTyper = "button"; isNotRealFocus = true; }

                // nwconsole.log("aa:" + e_which);
                try {
                    //  console.log(7.1)//aaglog
                    elementTyper = elementTyper.toLowerCase();
                    if (elementTyper == "input" || elementTyper == "textarea") {

                        //setTimeout(function () {
                        //    crnwTD.find(elementTyper).focus();
                        //}, 10);

                        // nwconsole.log("aa:" + e_which);
                    }



                    if (elementTyper.toLowerCase() == "select");
                    else {
                        if (elementTyper != "button") {

                            setTimeout(function () {
                                crnwTD.find(elementTyper).focus();


                                $(crnwTableCon).find("table.tblGridBody").css("position", "fixed");
                                $(crnwTableCon).find("table.tblGridBody").css("position", "relative");
                            }, 10);
                        }
                        else {
                            crnwTDTemp = crnwTD;
                            setTimeout(function () {

                                if (crnwTDTemp == crnwTD) {
                                    crnwTD.find(elementTyper).focus();
                                    $(crnwTableCon).find("table.tblGridBody").css("position", "fixed");
                                    $(crnwTableCon).find("table.tblGridBody").css("position", "relative");
                                }
                            }, 30);

                        }

                    }


                    // crnwTD.find(elementTyper).focus();
                    //  console.log(7.2 + " " + crnwTD.index() + " " + crnwTD.find(elementTyper).attr("class") + " " + elementTyper)//aaglog


                } catch (err) {

                    //console.log(7.3)//aaglog
                    func_callDefInput();
                }

            }
            else {
                //    var xobjtd= crnwTableCon.find("table.tblGridBody  tr:eq(" + indexRow+") td:eq(" +indexCell+")") ;
                //    if(xobjtd != undefined)func_nwGrid_Getparams(xobjtd);
                // func_callDefInput();
                //   alert("aaa");
                //   try{$(crnwTD).focus();}catch(err){}

                //   crnwTD.find(elementTyper).position().top
                if (isTabKey != true)
                    try { $(currentFocusObj).blur(); } catch (err) { }
                //  crnwTableCon.find("input.nwGridDefInput").focus();
            }

            if (isNotRealFocus) {
                //  alert(crnwTD.find(elementTyper).position().top)


            }


            //$('#textArea1').val(elementTyper + " " + indexRow + " "+ indexCell);

        }


    } catch (err) {

    }
    //console.log(8)//aaglog

    setTimeout(function () {
        func_nwGridAutoScroll(elementTyper, e_which);
    }, 10);

    setTimeout(function () {
        $('.tblGrid_Panel1').scrollLeft(0);
    }, 10);


    // try { crnwTD.find(elementTyper).focus(); } catch (err) { alert(err); }
    //console.log(9)//aaglog
    // console.log(isReturn);//aaglog
    // console.log($(":focus"));//aaglog
    // try { $(currentFocusObj).blur(); } catch (err) { }

    return isReturn;
});


function func_nwGridAutoScroll(elementTyper, e_which) {

    try {
        if (crnwTR == undefined || crnwTD == undefined) return;
    } catch (err) { }

    try { if (crnwTD.find(elementTyper).hasClass("hasDatepicker")) $('.ui-datepicker').css("display", "block"); } catch (err) { }

    var height = $(crnwTD).parents("tr").scrollHeight;
    $(crnwTableCon).find("table.tblGridBody").animate({ scrollTop: 0 }, 500);

    if (crnwTR.find("td").length == crnwTD.index())//+1
    {
        var xzwidth = $(crnwTableCon).find('.nwGridData').width();

        $(crnwTableCon).find('.nwGridData').scrollLeft(xzwidth);

        nwconsole.error("error top: " + xzwidth);

    }
    else {

        var xzwidth = 0;
        for (var i = 0; i < crnwTD.index() ; i++) {
            xzwidth += crnwTR.find("td:eq(" + i + ")").width();
        }

        var crScroll = $(crnwTableCon).find('.nwGridData').scrollLeft();
        var crWidth = $(crnwTableCon).find('.nwGridData').width();
        var crTHFreeze = 0;

        for (var i = 0; i < $(crnwTableCon).find('th.nwFreezePaneTH').length; i++) {
            crTHFreeze += $(crnwTableCon).find('th.nwFreezePaneTH:eq(' + i + ')').outerWidth();
        }
        xzwidth = xzwidth; // -((crnwTR.find("td:eq(0)").width() + 10)); //* 0.9;//

        ////console.log(crScroll + (crnwTR.find("td:eq(0)").width() + 10) <= crWidth);
        if (((xzwidth + crnwTD.width()) + crScroll) <= crWidth) {
            if (e_which == 37 && $(crnwTableCon).find('th.nwFreezePaneTH').length - 1 < crnwTD.index())
                xzwidth = 0;
            else if ($(crnwTableCon).find('th.nwFreezePaneTH').length > crnwTD.index())
                xzwidth = 0;
            else
                xzwidth = crScroll;
        }
        else {
            //if (crScroll == 0) crScroll += crTHFreeze;
            if (crTHFreeze >= 10)
                xzwidth = ((xzwidth - crTHFreeze) - 20);


            if (xzwidth <= 0) xzwidth = crTHFreeze;
            //xzwidth = crScroll + xzwidth + crnwTD.outerWidth();
            //$(crnwTableCon).find('.nwGridData').scrollLeft(xzwidth);
        }

        if (e_which == 37 || e_which == 39) {

            if (crnwTR.hasClass("nwGridFreezeRow"))//+1
            {
                $(crnwTableCon).find('.nwGridFreezeRow:eq(9)').css("position", "relative");
                setTimeout(function () {
                    $(crnwTableCon).find('.nwGridFreezeRow').css("position", "absolute");
                }, 0);
            }

            setTimeout(function () {

                $(crnwTableCon).find('.nwGridData').scrollLeft(xzwidth);

                // $(crnwTableCon).find("table.tblGridBody .nwGridFreezeRow").css("position", "relative");
                setTimeout(function () {
                    $(crnwTableCon).find("table.tblGridBody").css("position", "relative");

                    // $(crnwTableCon).find("table.tblGridBody .nwGridFreezeRow").css("position", "absolute");
                }, 1);

                //nwconsole.error("error baba: " + xzwidth + " " + false);

            }, 50);
        }


        // aag comment for revision

        var xzheight = 0;

        for (var i = 0; i < crnwTR.index() ; i++) {
            xzheight += crnwTable.find("tr:eq(" + i + ")").outerHeight();
        }
        //  if(crnwTR.index()>=2)xzheight -=25;

        //xzheight -=25;
        if (xzheight <= 50) xzheight = 1;
        else xzheight -= 50;



        var xfreezeHeight = 0;
        xfreezeHeight = $(crnwTableCon).find('.tblGrid_Panel1').find(".nwGridSplitter").outerHeight();
        if (xfreezeHeight == undefined) xfreezeHeight = 0;

        xzheight = xzheight - xfreezeHeight;
        if (xzheight <= 0) xzheight = 0;


        if (e_which == 38 || e_which == 40) {
            setTimeout(function () {

                $(crnwTableCon).find('.tblGrid_Panel1').scrollTop(xzheight);
                // aag comment for revision
            }, 10);
        }


    }
}

$(document).on("blur", ".nwGrid .nwgrid_buttonsCon button.nwgrid_buttons", function (e) {
    //console.log($(this).parents(".nwGrid").attr("id") + " "+ ($(this).parents(".nwgrid_buttonsCon").index() + 1) + " == " + $(this).parents(".nwGrid").find("div.nwgridButtons").find("button.nwgrid_buttons").length);
    //if ($(this).parents(".nwgrid_buttonsCon").index() + 1 == $(this).parents(".nwGrid").find("div.nwgridButtons").find("button.nwgrid_buttons").length) {
    //    alert("aaa");
    //    genIsButtonFrom = true;
    //    nwGrid_SetSelectedGrid($(this).parents(".nwGrid").attr("id"), 1, 1);
    //}
});;


function func_nwGridScrolling(e_which) {
    //console.log("wewew");
    var height = $(crnwTD).parents("tr").scrollHeight;
    $(crnwTableCon).find("table.tblGridBody").animate({ scrollTop: 0 }, 500);

    if (crnwTR.find("td").length == crnwTD.index())//+1
    {
        var xzwidth = $('#nwGridContactDetails .nwGridDataSub').width();
        $(crnwTableCon).find('.nwGridData').scrollLeft(xzwidth);
    }
    else {

        var xzwidth = 0;
        for (var i = 0; i < crnwTD.index() ; i++) {
            xzwidth += crnwTR.find("td:eq(" + i + ")").width();
        }

        var crScroll = $(crnwTableCon).find('.nwGridData').scrollLeft();
        var crWidth = $(crnwTableCon).find('.nwGridData').width();
        var crTHFreeze = 0;

        for (var i = 0; i < $(crnwTableCon).find('th.nwFreezePaneTH').length; i++) {
            crTHFreeze += $(crnwTableCon).find('th.nwFreezePaneTH:eq(' + i + ')').outerWidth();
        }
        xzwidth = xzwidth; // -((crnwTR.find("td:eq(0)").width() + 10)); //* 0.9;//

        ////console.log(crScroll + (crnwTR.find("td:eq(0)").width() + 10) <= crWidth);
        if (((xzwidth + crnwTD.width()) + crScroll) <= crWidth) {
            if (e_which == 37 && $(crnwTableCon).find('th.nwFreezePaneTH').length - 1 < crnwTD.index())
                xzwidth = 0;
            else if ($(crnwTableCon).find('th.nwFreezePaneTH').length > crnwTD.index())
                xzwidth = 0;
            else
                xzwidth = crScroll;
        }
        else {
            //if (crScroll == 0) crScroll += crTHFreeze;
            if (crTHFreeze >= 10)
                xzwidth = ((xzwidth - crTHFreeze) - 20);


            if (xzwidth <= 0) xzwidth = crTHFreeze;
            //xzwidth = crScroll + xzwidth + crnwTD.outerWidth();
            //$(crnwTableCon).find('.nwGridData').scrollLeft(xzwidth);
        }

        if (e_which == 37 || e_which == 39) {
            setTimeout(function () {
                $(crnwTableCon).find('.nwGridData').scrollLeft(xzwidth);
            }, 50);
        }


        // aag comment for revision

        var xzheight = 0;

        for (var i = 0; i < crnwTR.index() ; i++) {
            xzheight += crnwTable.find("tr:eq(" + i + ")").outerHeight();
        }
        //  if(crnwTR.index()>=2)xzheight -=25;

        //xzheight -=25;
        if (xzheight <= 50) xzheight = 1;
        else xzheight -= 50;

        if (e_which == 38 || e_which == 40) {
            setTimeout(function () {
                if (crnwTable.find(".nwGridSplitter").html() != undefined) {
                    xzheight = xzheight - crnwTable.find(".nwGridSplitter").outerHeight();
                    if (xzheight <= 0) xzheight = 0;
                }
                $(crnwTableCon).find('.tblGrid_Panel1').scrollTop(xzheight);
                // aag comment for revision
            }, 10);
        }




    }

    func_nwGridScrollingPane(e_which);


}
function func_nwGridScrollingPane(e_which, _gridID) {
    setTimeout(function () {

        var gridID = "";

        try {
            gridID = $(crnwTD).parents(".nwGrid").attr("id");
        } catch (err) { }

        if (_gridID != undefined) gridID = _gridID;

        //if (e_which == 38 || e_which == 40 || e_which == 37 || e_which == 39 || e_which == 0) {
        //    $('#' + gridID + ' .tblGrid_Panel1').scrollLeft(0);
        //}
        if (gridID != undefined) {
            $('#' + gridID + ' .nwGridDataSub div:eq(0)').width($('#' + gridID + ' .tblGrid_Panel1').width());
            $('#' + gridID + ' .nwGridDataSub div:eq(0)').css("left", -1 * $('#' + gridID + ' .tblGrid_Panel1').scrollLeft());
        }
    }, 51);
}



function func_windowsClosing() {
    if ($("#dimMessageBox").css("display") != "none")
        Message_close();
    else if ($("#menuCreatorContainer").css("display") != "none")
        PaneClose();
    else {
        var xcontainerS = $('.noah-webui-Window').length;
        for (var i = xcontainerS - 1; i >= 0; i--) {
            var xdisplay = $('.noah-webui-Window:eq(' + i + ')').css("display");
            var isboolx = false;
            try { if ((xdisplay + '').indexOf('none') >= 0) isboolx = false; else isboolx = true; } catch (err) { }
            if (isboolx == true) {
                // $('.noah-webui-Window:eq(' + i + ')').hide();
                // nwPopupForm_HideModal($('.noah-webui-Window:eq(' + i + ')').attr("id"));
                var xid = $('.noah-webui-Window:eq(' + i + ')').attr("id");
                $('.noah-webui-Window:eq(' + i + ')').find("div.BoxClose").click();

                break;
            }
        }
    }
    try {
        $('.noah-webui-dialog.mustClose').find(".noah-webui-dialog-close").click();
    } catch (err) { }
}


function func_callDefInput() {
    var elementType;
    var elementTyper;
    elementType = $(crnwTD).children().prop('tagName');
    if (elementType != undefined)
        elementTyper = (elementType + "").toLowerCase();


    if (elementTyper != "input"
&& elementTyper != "select"
&& elementTyper != "textarea"
&& elementTyper != "button"
) {
        //   crnwTableCon.find("input.nwGridDefInput").focus();

    }

}


var xnwGrid_isHover = false;
var xnwGrid_HoverStart;
var xnwGrid_HoverEnd;
var xnwGrid_HoverEndFin;
var xnwGrid_currentSelectedToCopy;



$(document).on("mousedown", ".tblGridBody tr td", function () {
    var selectedTR = $(this);
    nwGrid_SetSelectedObjects(selectedTR);
    nwGrid_SetSelectedFunction();

    if ($(this).parents(".noah-webui-disabled").attr("class") != undefined) return;
    // selectedTR.css("background-color","green");
    xnwGrid_isHover = true;
    xnwGrid_HoverStart = selectedTR;
    currentClicksObj = undefined;
    //$("#xdesx").val(crnwTable.attr("id"));


}).on("mouseover", ".tblGridBody tr td", function () {
    var vobj = this;
    nwGrid_Selected(vobj);

}).on("mouseup", ".tblGridBody tr td", function () {
    xnwGrid_isHover = false;

    $(xnwGrid_HoverStart).blur();
});


function nwGrid_Selected(vobj) {
    try {
        if ($(xnwGrid_HoverStart).index() <= 0) {
            xnwGrid_isHover = false;
        }
    } catch (err) { }

    if (xnwGrid_isHover == true) {
        if ($(crnwTable).attr("nwExcel") != "enable") return;

        $(crnwTable).find('tr td').removeClass('nwgridSelectedCells');

        var xValid = $(vobj).find('div.nwCell').attr("class");
        var xValid2 = $(vobj).html();
        if (!(xValid == "nwCell") && (xValid2.replace(" ", "").replace("<br>", "") == "")) {
            $(vobj).html("<div class='nwCell'></div>"); return;
        }

        var selectedTR = $(vobj);
        xnwGrid_HoverEnd = selectedTR;
        xnwGrid_HoverEndFin = xnwGrid_HoverEnd;

        var xTrminus = 0;
        if ($(xnwGrid_currentSelectedToCopy).find("tr.nwGridFreezeRow").length >= 1)
            xTrminus = 1;

        //selectedTR.css("background-color","red");
        var tdIndex = $(xnwGrid_HoverStart).index();
        var trIndex = $(xnwGrid_HoverStart).parents("tr").index() - xTrminus;
        var tdIndexPrev = $(xnwGrid_HoverEnd).index();
        var trIndexPrev = $(xnwGrid_HoverEnd).parents("tr").index() - xTrminus;

        var temp_xnwGrid_HoverStart = xnwGrid_HoverStart;
        var temp_xnwGrid_HoverEnd = xnwGrid_HoverEnd;
        var temp_xnwGrid_HoverEndFn = xnwGrid_HoverEnd;






        xnwGrid_currentSelectedToCopy = crnwTable;
        var ParentI = crnwTable.attr("id");
        var xvarTop = 0;
        var xvarLeft = 0;
        var NWG_SelTop = 0;
        var NWG_SelLeft = 0;
        var NWG_SelRight = 0;
        var NWG_SelBottom = 0;
        var xvarBorderSize = 2;
        var xvarTDcount = $(xnwGrid_currentSelectedToCopy).find("tr:eq(0) td").length;
        try {
            xvarTop = $(xnwGrid_HoverStart).position(crnwTable).top;
            xvarLeft = $(xnwGrid_HoverStart).position(crnwTable).left;
            NWG_SelTop = xvarTop;
            NWG_SelLeft = xvarLeft;
        }
        catch (err) { }





        var scriptR = "";
        $(crnwTable).find("td").removeClass("nwgridSelected");

        if ($(crnwTableCon).find("#ParentIAAG" + ParentI).attr("id") == undefined) {
            // alert();
            $(crnwTable).parent("div").prepend("<div id=\"ParentIAAG" + ParentI + "\" style=\"z-index: 1000;width:0px;height:0px; border:0px solid #323232; position:relative\"><div class=\"nwGridBorderLine\" style=\"height: 1px; width: 159px;display:block;top: 49px; left: 0px;\"></div><div class=\"nwGridBorderLine\" style=\"height: 110px; width: 1px; display: block; top: 49px; left: 0px;\"></div><div class=\"nwGridBorderLine\" style=\"height: 110px; width: 1px; display: block; top: 49px; left: 159px;\"></div><div class=\"nwGridBorderLine\" style=\"height: 1px; width: 159px; display: block; top: 159px; left: 0px;\"></div><div class=\"nwGridBorderBG\" style=\"height: 0px; width: 0px; display: block; top: 0px; left: 0px;\"></div></div>");

            //        $("#ParentIAAG"+ ParentI).prepend("<div class=\"nwGridBorderLine\" style=\"height: 1px; width: 159px; display: block; top: 49px; left: 0px;\"></div>");
            //        $("#ParentIAAG"+ ParentI).prepend("<div class=\"nwGridBorderLine\" style=\"height: 110px; width: 1px; display: block; top: 49px; left: 0px;\"></div>");
            //        $("#ParentIAAG"+ ParentI).prepend("<div class=\"nwGridBorderLine\" style=\"height: 1px; width: 159px; display: block; top: 249px; left: 0px;\"></div>");
            //        $("#ParentIAAG"+ ParentI).prepend("<div class=\"nwGridBorderLine\" style=\"height: 110px; width: 1px; display: block; top: 249px; left: 159px;\"></div>");
            //        
        }

        //ParentIAAGnwgridcomp2-nwData

        var isSingleColumn = false;
        for (var i = trIndex; i <= trIndexPrev; i++) {
            // scriptR += "#" + ParentI nwgridSelected
            for (var i2 = tdIndex; i2 <= tdIndexPrev; i2++) {
                $(crnwTable).find("tr:eq(" + i + ") td:eq(" + i2 + ")").addClass("nwgridSelectedCells");
            }
            if ((tdIndexPrev - tdIndex) == 0) isSingleColumn = true;
        }

        var xBcounter = $("#ParentIAAG" + ParentI).find("div.nwGridBorderLine").length;
        var xobj = $("#ParentIAAG" + ParentI).find("div.nwGridBorderBG:eq(0)");


        try {
            NWG_SelBottom = $(xnwGrid_HoverEndFin).position(crnwTable).top + $(xnwGrid_HoverEndFin).outerHeight();
            NWG_SelRight = $(xnwGrid_HoverEndFin).position(crnwTable).left + $(xnwGrid_HoverEndFin).outerWidth();
        }
        catch (err) { }

        //        $("#ParentIAAG"+ ParentI).find("div.nwGridBorderBG:eq(0)").css("height", NWG_SelBottom + "px");
        //        $("#ParentIAAG"+ ParentI).find("div.nwGridBorderBG:eq(0)").css("width",NWG_SelRight + "px");
        //        $("#ParentIAAG"+ ParentI).find("div.nwGridBorderBG:eq(0)").css("top",NWG_SelTop+ "px");
        //        $("#ParentIAAG"+ ParentI).find("div.nwGridBorderBG:eq(0)").css("left",NWG_SelLeft + "px"); // cause of lag


        /*
    
    if(tdIndex > tdIndexPrev){
        xnwGrid_HoverStart = temp_xnwGrid_HoverEnd;
        xnwGrid_HoverEnd = temp_xnwGrid_HoverStart;
        xnwGrid_HoverEndFin = xnwGrid_HoverEnd;
           
        tdIndex = $(xnwGrid_HoverStart).index();
        tdIndexPrev = $(xnwGrid_HoverEnd).index() ;
           
        //   alert(tdIndex + " " + tdIndexPrev);

           
           
          
        }
    
    if(trIndex > trIndexPrev){
        temp_xnwGrid_HoverStart = xnwGrid_HoverStart;
        temp_xnwGrid_HoverEnd = xnwGrid_HoverEnd;
           
        xnwGrid_HoverStart = temp_xnwGrid_HoverEnd;
        xnwGrid_HoverEnd = temp_xnwGrid_HoverStart;
        xnwGrid_HoverEndFin =xnwGrid_HoverEnd;
        trIndex = $(xnwGrid_HoverStart).parents("tr").index();
        trIndexPrev = $(xnwGrid_HoverEnd).parents("tr").index() ;
           
        //  alert(trIndex + " > " + trIndexPrev);
           
           
        }
    
    
        */

        var xtratop = 0;
        if (trIndex == 0) xtratop = 2;

        var xtraleft = 0;
        var xtraRight = 0;
        if (tdIndex == 0) xtraleft = 2;
        if (tdIndexPrev >= xvarTDcount - 1) xtraRight = 2;

        //  alert(tdIndexPrev+" >= "+(xvarTDcount-1) + " = " + xtraleft);

        //// Top




        xobj = $(crnwTableCon).find("#ParentIAAG" + ParentI).find("div.nwGridBorderLine:eq(0)");
        xobj.css("height", xvarBorderSize + "px");
        xobj.css("width", (NWG_SelRight - NWG_SelLeft + (xvarBorderSize * 2) - (xtraRight)) + "px");
        xobj.css("top", ((NWG_SelTop - xvarBorderSize) + xtratop) + "px");
        xobj.css("left", (NWG_SelLeft - xvarBorderSize) + "px");
        //        
        //        if(tdIndex > tdIndexPrev){
        //            NWG_SelRight= $(xnwGrid_HoverEndFin).position(crnwTable).left + $(xnwGrid_HoverEndFin).outerWidth() ;
        //            if(tdIndexPrev == 0)xtratop=2;
        //            xobj = $(crnwTableCon).find("#ParentIAAG"+ ParentI).find("div.nwGridBorderLine:eq(0)");
        //            xobj.css("height", xvarBorderSize + "px");
        //            xobj.css("width",(NWG_SelRight ) + "px");
        //            xobj.css("top",((NWG_SelTop-xvarBorderSize)+xtratop) + "px");
        //            xobj.css("left",(NWG_SelRight+xvarBorderSize) + "px");
        //        }
        //        

        //// Left

        xobj = $(crnwTableCon).find("#ParentIAAG" + ParentI).find("div.nwGridBorderLine:eq(1)");
        xobj.css("height", (NWG_SelBottom - NWG_SelTop + (xvarBorderSize * 2)) + "px");
        xobj.css("width", xvarBorderSize + "px");
        xobj.css("top", (NWG_SelTop - xvarBorderSize) + "px");
        xobj.css("left", ((NWG_SelLeft - xvarBorderSize) + xtraleft) + "px");

        //// Right    
        var xtraright = 0;
        if (tdIndexPrev == xvarTDcount - 1) xtraright = 2;
        //alert(tdIndexPrev + " - " +  (xvarTDcount-1) + " = " + xtraright);
        xobj = $(crnwTableCon).find("#ParentIAAG" + ParentI).find("div.nwGridBorderLine:eq(2)");
        xobj.css("height", (NWG_SelBottom - NWG_SelTop + (xvarBorderSize * 2) - xtraRight) + "px");
        xobj.css("width", (xvarBorderSize) + "px");
        xobj.css("top", (NWG_SelTop - xvarBorderSize) + "px");
        xobj.css("left", (NWG_SelRight - xtraright) + "px");

        //// Bottom 
        xobj = $(crnwTableCon).find("#ParentIAAG" + ParentI).find("div.nwGridBorderLine:eq(3)");
        xobj.css("height", xvarBorderSize + "px");
        xobj.css("width", (NWG_SelRight - NWG_SelLeft + (xvarBorderSize * 2) - (xtraRight)) + "px");
        xobj.css("top", (NWG_SelBottom) + "px");
        xobj.css("left", (NWG_SelLeft - xvarBorderSize) + "px");

        //         var NWG_SelTop =0;
        //        var NWG_SelLeft =0;
        //        var NWG_SelRight =0;
        //        var NWG_SelBottom =0;



        // $("#ParentIAAG"+ ParentI).css("top",$(xnwGrid_HoverStart).css("top"));
        //  $(xnwGrid_HoverStart).prepend($("#ParentIAAG"+ ParentI));

    }
    else {
        //  xnwGrid_currentSelectedToCopy=null;
    }

}



$(document).on("click", ".tblGridBody tr>td *", function () {
    func_nwGrid_Getparams(this);
});

$(document).on("focus", ".tblGridBody tr>td input,.tblGridBody tr>td select,.tblGridBody tr>td textarea", function () {
    func_nwGrid_Getparams(this);

    $(this).select();
});


//$(document).on("change", "select", function () {
//   
//     var xsel = $(this).prop('selectedIndex');
//      $(this).find("option").attr("selected","");

//    //$(this).find("option:eq("+xsel+")").attr("selected","");
//});



function func_nwGrid_Getparams(ver) {
    var selectedTR = ver;
    $('.tblGridBody tr td').removeClass('nwgridSelected');
    try {
        crnwTD = $(ver).parents(".tblGridBody tr>td");
        crnwTR = $(ver).parents(".tblGridBody tr");
        crnwTable = $(ver).parents(".tblGridBody");
        crnwTableCon = $(ver).parents('.nwGrid');
        crnwTD.addClass('nwgridSelected');
        var ParentI = $(ver).parents('.nwGrid').attr("id");
    }
    catch (err) { }
    try {
        nwGrid_tdClick(ParentI);
    }
    catch (err) { }

}


$(document).bind("keypress", function () {
    var selectedTD = $(".tblGridBody tr td.nwgridSelected").parent();
    var indexTD = $(selectedTD).index();
    var selectedTR = selectedTD.parent();
    var indexTR = $(selectedTR).index();
});

function nwGrid_Row(nwobjItem) {
    nwGrdi_Row(nwobjItem);
}
function nwGrdi_Row(nwobjItem) {

    var nwobjItemP = nwobjItem.parent();
    // alert(nwobjItemP.attr('class'));
    return nwobjItemP;
}

function nwGrid_TableAdjust(nwGridID) {
    nwGrdi_TableAdjust(nwGridID);
}
$(document).on("click", ".ui-tabs li.ui-state-default", function () {
    var href = $(this).find("a").attr("href");
    var xcounter = $(href).find(".nwGrid").length;
    for (var i = 0; i < xcounter; i++) {
        var xid = $(href).find(".nwGrid:eq(" + i + ")").attr("id");
        nwGrid_TableAdjust(xid);
    }

});


function nwGrid_SelectValueRetrive(nwGridID) {

    try {
        nwGridID = nwGridID.replace("#", "");
        var xcount = 0;
        xcount = $("#" + nwGridID + " .tblGridBody select.nwSelect").length;
        var tempStr = "";

        for (var i = 0; i < xcount; i++) {
            tempStr = $("#" + nwGridID + "  .tblGridBody select.nwSelect:eq(" + i + ")").attr("nwValue");
            if (tempStr == undefined || tempStr == "")
                continue;
            else
                $("#" + nwGridID + "  .tblGridBody select.nwSelect:eq(" + i + ")").val(tempStr);
            //$("#divMain").find("div.str")
        }
    } catch (err) { }
}


function nwGrdi_TableAdjust(nwGridID) {

    if (nwcontainerhandle == true) return;


    //var nwGridID = "nwGridMainCon";
    //var xparent = $("#" + nwGridID).find(".nwGridSplitter").parent();
    //var xcounter = $("#" + nwGridID).find(".nwGridSplitter").index();
    //var gzoom = parseInt(GetZoom());
    //var totalheight = 0;
    //for (var i = 0; i <= xcounter ; i++) {
    //    totalheight += $(xparent).find("tr:eq(" + i + ")").height() - 3.20;
    //}
    //if (xcounter <= 2) xcounter = 2;
    //if (gzoom <= -1)
    //    totalheight = (totalheight);
    //else
    //    totalheight

    //$("#" + nwGridID).find(".nwGridSplitter").height(totalheight);


    //console.log(nwGridID);

    //var scrollLeft = 0;

    //try {
    //    scrollLeft = $('#' + nwGridID + ' .nwGridData').scrollLeft();
    //} catch (err) { }

    try {
        nwGridID = nwGridID.replace("#", "");
        var tempWidth = $("#" + nwGridID).find(".tblGridBody").outerWidth();

        var numberOfTD = $("#" + nwGridID).find("#nwGridRows tr:eq(0) td").length;
        numberOfTD = 0;

        tempWidth = tempWidth + 17 - (0);
        if (tempWidth >= 70) {
            $("#" + nwGridID).find(".tblGrid_Panel1").outerWidth(tempWidth);
            // alert(tempWidth);
            $("#" + nwGridID).find("div.nwGridData > div.nwGridDataSub").outerWidth(tempWidth);
            $("#" + nwGridID).removeClass("nwGridComputeWidth");
        }
        else {
            $("#" + nwGridID).addClass("nwGridComputeWidth");

        }

        var obj = $("#" + nwGridID).find(".nwGridData");
        var xscroll = $(obj).scrollLeft();

        $(obj).scrollLeft(xscroll + 1); $(obj).scrollLeft(xscroll - 1);


    } catch (err) { }
}

//var nwGrid_isMouseOver=false;
//$(document).on("mouseover",".nwGrid",function(){
//    if(nwGrid_isMouseOver==true) return;
//        var nwGridID = $(this).attr("id");
//        nwGrid_TableAutoHeight(nwGridID);
//        nwGrid_isMouseOver=true;
//        
//}).on("mouseout",".nwGrid",function(){
//       // nwGrid_isMouseOver=false;
//});

function nwGrid_TableAutoHeight(nwGridID) {
    var scrollheight = 15;
    var xheightCon = $('#' + nwGridID + ' .nwGridData').outerHeight();
    var xheightHeader = $('#' + nwGridID + ' .tblGridHeader').outerHeight();
    var xheightBody = xheightCon - xheightHeader - scrollheight;

    $('#' + nwGridID + ' .tblGrid_Panel1').css("min-height", xheightBody + "px");
    $('#' + nwGridID + ' .tblGrid_Panel1').css("height", (xheightBody + 3) + "px");
}


function nwgrid_ResizeOnContainer(gridID, xminusHeight) {
    try {
        var xid = gridID;
        if (xminusHeight == undefined) xminusHeight = 0;
        var minusHeight = 15 + xminusHeight;
        var xobjexct = $('#' + gridID).parents('.noah-webui-container');

        if (xobjexct.html() == undefined || xobjexct == undefined)
            xobjexct = $('#' + gridID).parent();



        if ($('#' + gridID).find('.nwgridButtons') != undefined) minusHeight += $('#' + gridID).find('.nwgridButtons').outerHeight() + 15;
        else {
            if ($('#' + gridID).find('.nwgridButtons').display() != "none")
                minusHeight += $('#' + gridID).find('.nwgridButtons').outerHeight() + 15;
        }

        if (xobjexct == undefined) return;

        var xHeight = $('#' + gridID).parents('.noah-webui-container').outerHeight() - minusHeight;

        if (xHeight == undefined) xHeight = $('#' + gridID).parent().outerHeight() - minusHeight

        $('#' + xid + '.nwGrid').outerHeight(xHeight);
        $('#' + xid + '.nwGrid').css("max-height", xHeight);
        $('#' + xid + '.nwGrid').css("min-height", xHeight);

        $('#' + xid + ' .nwGridData').outerHeight(xHeight);
        $('#' + xid + ' .nwGridData').css("max-height", xHeight);
        $('#' + xid + ' .nwGridData').css("min-height", xHeight);

        nwGrid_TableAutoHeight(xid);
    } catch (err) {

        //alert(err);
    }
}


function func_ExportResize() {



    var xdata = $('#nwExportContainerMain .message_content').outerHeight() - 127;
    //$('#nwExportContainer .nwGrid').css('min-height', xdata + 'px');
    //$('#nwExportContainer .nwGrid').css('height', xdata + 'px');
    //$('#nwExportContainer .nwGridData').css('min-height', (xdata + 50) + 'px');
    //$('#nwExportContainer .nwGridData').css('max-height', (xdata + 50) + 'px');
    //$('#nwExportContainer .tblGrid_Panel1').css('min-height', xdata + 'px');
    //$('#nwExportContainer .tblGrid_Panel1').css('height', xdata + 'px');

    setTimeout(function () {
        nwGrid_TableAutoHeight('nwExportGen');
        $('#nwExportGen .nwGridData').scrollLeft($('#nwExportGen .nwGridData').scrollLeft() + 1);
        $('#nwExportGen .nwGridData').scrollLeft($('#nwExportGen .nwGridData').scrollLeft() - 1);
        var contentwidth = $("#nwExportGen").find(".nwGridDataSub").width() + 20;
        if ($(window).width() * 0.80 >= contentwidth) {
            $("#nwExportContainerMain").width(contentwidth);
            nwPopupForm_Modal("nwExportContainerMain");
        }
    }, 10);


}



var nwGrid_ScrollLevelID = 1; var nwGrid_ScrollLevelIDPrev = 1;
function nwGrid_TableFreeze(nwGridID, colNum, rowNum, isScrollCheck) {
    var rdate = new Date();

    nwGrid_TableAutoHeight(nwGridID);

    // alert(rdate);
    try {


        nwGridID = nwGridID.replace("#", "");
        var obj = $("#" + nwGridID).find(".nwGridData");


        obj.attr("freezecol", colNum);
        obj.attr("freezerow", rowNum);


        var xrowNum = 0;
        //alert("last:"+$("#" + nwGridID).find(" div.tblGrid_Panel1").outerHeight());
        try { if (rowNum != undefined) xrowNum = rowNum; }
        catch (err) { }

        //alert(xrowNum + " - " +rowNum);
        var xcountCol = $("#" + nwGridID).find(".tblGridBody tbody tr:eq(0) td").length;
        obj.addClass("nwFreezePane");
        //

        $("#" + nwGridID).find("tr").css("height", "inherit");
        $("#" + nwGridID + " .tblGridHeader tr:eq(0) th:eq(0)").css("position", "relative")


        var strData = "";



        var xBorderColor = $("#" + nwGridID).find(".tblGridBody tr td:eq(" + 0 + ")").css("border-right-color");
        var xBorderWidth = $("#" + nwGridID).find(".tblGridBody tr td:eq(" + 0 + ")").css("border-width");
        var xBorderStyle = $("#" + nwGridID).find(".tblGridBody tr td:eq(" + 0 + ")").css("border-style");

        if (xBorderStyle == "none" || xBorderStyle == "") xBorderStyle = "solid";
        if (xBorderWidth == "none" || xBorderWidth == "") xBorderWidth = "1px";

        var xBoxWidth = $("#" + nwGridID + "").width();
        $("#" + nwGridID).find(" div.tblGrid_Panel1").outerWidth(xBoxWidth);


        //alert(rdate + "-" +1 );
        //  Important to revise for Column Freeze Color
        $('#' + nwGridID).attr('nwcolfreeze', colNum);
        $('#' + nwGridID).find('div.tblGrid_Panel1').attr('nwcolfreeze', colNum);
        func_nwGridTableFreezeCol(nwGridID, colNum);

        $('#' + nwGridID).attr('nwrowfreeze', rowNum);
        $('#' + nwGridID).find('div.tblGrid_Panel1').attr('nwrowfreeze', rowNum);


        //alert(rdate + "-" +2 );
        for (var i = 0; i < $("#" + nwGridID).find("th").length; i++) {
            var bgcolor = $("#" + nwGridID).find("th:eq(" + i + ")").parents("tr").css("background-color");
            var bgImage = $("#" + nwGridID).find("th:eq(" + i + ")").parents("tr").css("background-image");

            if (bgcolor == "rgba(0, 0, 0, 0)" || bgImage == "none") {
                bgcolor = $("#" + nwGridID).find("th:eq(" + i + ")").parents("thead").css("background-color");
                bgImage = $("#" + nwGridID).find("th:eq(" + i + ")").parents("thead").css("background-image");
            }


            var bgcolorTH = "";

            bgcolorTH = $("#" + nwGridID).find("th:eq(" + i + ")").css("background-color");
            //alert(bgcolorTH);
            // if(bgcolorTH != undefined && bgcolorTH != "")
            //    bgcolor=bgcolorTH;

            if (bgcolor == "" || bgcolor == undefined) bgcolor = "#FFFFFF";


            $("#" + nwGridID).find("th:eq(" + i + ")").css("background-color", bgcolor);
            $("#" + nwGridID).find("th:eq(" + i + ")").css("background-image", bgImage);

        }



        var totalWidth = 0; var totalPadding = 2;
        totalWidth = totalWidth + parseFloat($("#" + nwGridID).find(".tblGridBody tr td:eq(0)").css("width").replace(" ", ""));
        for (var i = 0; i <= colNum; i++) {
            //var xWidth = $("#" + nwGridID).find(".tblGridBody tr td:eq(" + i + ")").css("width"); //+ " !important";
            var xWidth = $("#" + nwGridID).find(".tblGridBody colgroup col:eq(" + i + ")").css("width");
            if (i == 0) xWidth = parseInt(xWidth.replace("px", "")) - 7;
            else xWidth = parseInt(xWidth.replace("px", "")) - 4;


            xWidth = xWidth + "px";

            var xHeight = $("#" + nwGridID).find(".tblGridBody tr td:eq(" + i + ")").parents("tr").outerHeight() + "px !important";
            var xHeightP = parseFloat(xHeight.replace("px")) - totalPadding;
            xHeight = xHeightP + "px";

            if (i == 0) xHeight = "inherit !important";

            var xBorder = $("#" + nwGridID).find(".tblGridBody tr td:eq(" + i + ")").css("border");

            totalWidth = totalWidth + parseFloat($("#" + nwGridID).find(".tblGridBody tr td:eq(" + i + ")").css("width").replace(" ", ""));

            if (i == 0) strData += "#" + nwGridID + " .tblGridBody  tr.nwGridFreezeRow td:nth-child(" + (i + 1) + "){z-index:90; border:" + xBorder + ";width:" + xWidth + ";min-width:" + xWidth + ";max-width:" + xWidth + ";min-height:" + xHeight + ";max-height:" + xHeight + ";height:" + xHeight + ";}";
            else strData += "#" + nwGridID + " .tblGridBody tr.nwGridFreezeRow td:nth-child(" + (i + 1) + "){z-index:90; border:" + xBorder + ";width:" + xWidth + ";min-width:" + xWidth + ";max-width:" + xWidth + ";min-height:" + xHeight + ";max-height:" + xHeight + ";height:" + xHeight + ";}";

            if (i == 0) strData += "#" + nwGridID + " .tblGridBody  tr td:nth-child(" + (i + 1) + "){position:relative;}";
            else strData += "#" + nwGridID + " .tblGridBody tr td:nth-child(" + (i + 1) + "){position:relative;}";


            if (i == colNum) {
                //strData += "#" + nwGridID +  " .tblGridBody tr td:nth-child(" + (i+1) +"){border-right:" + xBorderWidth + " " + xBorderStyle + " " + xBorderColor +";}";
                strData += "#" + nwGridID + " .tblGridBody tr td:nth-child(" + (i + 1) + "){box-shadow:1px 0px 1px 0px " + xBorderColor + ";}";
            }

            if (i == 0) strData += "#" + nwGridID + " .tblGridHeader  tr th:nth-child(" + (i + 1) + "){position:absolute;z-index:100; border:" + xBorder + ";width:" + xWidth + ";min-width:" + xWidth + ";max-width:" + xWidth + ";}"; //min-height:" + xHeight + ";max-height:" + xHeight + ";height:" + xHeight + ";}";
            else strData += "#" + nwGridID + " .tblGridHeader tr th:nth-child(" + (i + 1) + "){position:relative;z-index:100; border:" + xBorder + ";width:" + xWidth + ";min-width:" + xWidth + ";max-width:" + xWidth + ";}"; //min-height:" + xHeight + ";max-height:" + xHeight + ";height:" + xHeight + ";}";

            if (i == colNum) {
                //strData += "#" + nwGridID +  " .tblGridHeader tr th:nth-child(" + (i+1) +"){border-right:" + xBorderWidth + " " + xBorderStyle + " " + xBorderColor +";}";
                strData += "#" + nwGridID + " .tblGridHeader tr th:nth-child(" + (i + 1) + "){box-shadow:1px 0px 1px 0px " + xBorderColor + ";}";
                //box-shadow: 0px 0px 0px 1px rgb(54, 54, 54);
            }

            $("#" + nwGridID).find("th:eq(" + i + ")").addClass("nwFreezePaneTH");

        }



        //xrowNum
        var xGetheight = 0; var xGettop = 0; var xGetheightTemp = 0;
        var xbordersize = 1; var xvalue = 0.0;
        var xbordersizeAdd = (0);
        $("#nwGridFreeze" + nwGridID).html('');
        $("#" + nwGridID).find(".tblGridBody tr").removeClass("nwGridFreezeRow");
        for (var i = 0; i < xrowNum; i++) {
            xGetheightTemp = $("#" + nwGridID).find(".tblGridBody tr:eq(" + i + ") td:eq(0)").outerHeight();//outerHeight
            var xGetheightTempX = xGetheightTemp + "";
            xGetheightTempX = xGetheightTempX.replace("px", "");

            $("#" + nwGridID).find(".tblGridBody tr:eq(" + i + ")").addClass("nwGridFreezeRow");


            xvalue = parseInt(xGetheight) - (xbordersize + xbordersize);

            //  if(i<1)xvalue=(xGetheight);
            // xbordersizeAdd += xbordersize;

            strData += " #" + nwGridID + " .tblGridBody tr:nth-child(" + (i + 1) + "){top:" + xvalue + "px;}";

            $("#" + nwGridID).find(".tblGridBody tr:eq(" + i + ")").css("height", (xGetheightTemp + xbordersize));
            xGetheight = xGetheight + parseInt(xGetheightTempX) - (xbordersize);//(xbordersizeAdd)
        }

        xGetheight += 3;
        // alert(rdate + "-" +3 );
        //  alert(xcountCol);

        var _zoomsizevalueX = 1536;
        var borderline = 2.85;

        if (nwBrowser == "Firefox") borderline -= 1.25;

        var gzoom = parseInt(GetZoom());

        //if (gzoom < 0) gzoom = 0;

        for (var i = 1; i < xcountCol; i++) {
            var xvarWidth = $("#" + nwGridID).find(".tblGridBody  .colgroup col:eq(" + i + ")").innerWidth();
            var xvarPadR = $("#" + nwGridID).find(".tblGridBody tr td:eq(" + i + ")").css("padding-right");
            var xvarPadL = $("#" + nwGridID).find(".tblGridBody tr td:eq(" + i + ")").css("padding-left");
            var xvarWidthT = xvarWidth + "";
            var xverw = parseFloat(xvarWidthT.replace("px", ""));
            xverw = xverw - parseFloat(xvarPadR.replace("px", ""));
            xverw = xverw - parseFloat(xvarPadL.replace("px", ""));
            xverw = xverw - (borderline); //+ (0.01 * gzoom * -1)
            strData += "#" + nwGridID + " .tblGridBody tr.nwGridFreezeRow td:nth-child(" + (i + 1) + "):not(.nwGridMergeTD){width:" + xverw + "px;max-width:" + xverw + "px ;}";
            //!important
            //min-width:" + xverw + "px ;
        }
        //




        // for freeze row
        if (xrowNum >= 1) {
            var xfer = $("#" + nwGridID).find(".tblGridBody tbody tr.nwGridFreezeRow").length - 1;

            //tr.nwGridFreezeRow:eq(" + xfer+ ")
            try {
                $("#" + nwGridID).find(".tblGridBody tbody ").find(".nwGridSplitter").remove();
            } catch (err) { }
            try {
                $("#" + nwGridID).find(".tblGridBody").find(".nwGridSplitter").remove();
            } catch (err) { }

            var _xGetheight = xGetheight;



            //_xGetheight = xGetheight - 9;

            $("#" + nwGridID).find(".tblGridBody tbody ").prepend("<div class=\"nwGridSplitter\" style=\" height: " + (_xGetheight) + "px;\"></div>");
            $("#" + nwGridID + " .nwGridSplitter").insertAfter($("#" + nwGridID).find(".tblGridBody tbody tr.nwGridFreezeRow:eq(" + xfer + ")"));

            strData += " #" + nwGridID + " .nwGridFreezeRow {position: absolute; z-index: 999;  width: 100%;" + "}";
            //strData +=" #"+ nwGridID + "  .tblGridBody tr.nwGridFreezeRow td {position: initial !important;  z-index: 1000 !important; " +"}" ;
            strData += " #" + nwGridID + " .nwGridFreezeRow:nth-child(" + xrowNum + "){border-bottom:1px solid " + xBorderColor + "}";
        }
        $("#nwGridFreeze" + nwGridID).html(strData);


        var jump = 500;
        $(obj).scroll(function () {


            var strDataF = "";
            // $("#nwgrid2").append($(obj).scrollLeft() + "<br>");
            var xvar = $(obj).scrollLeft();



            //setTimeout(function(){  }, 100);



            for (var i = 0; i <= colNum; i++) {
                strDataF += "#" + nwGridID + " .tblGridBody tr td:nth-child(" + (i + 1) + "){left:" + xvar + "px !important;z-index:1;opacity:1;}";
                strDataF += "#" + nwGridID + " .tblGridHeader tr th:nth-child(" + (i + 1) + "){left:" + xvar + "px !important;}";
            }


            $("." + nwGridID + "nwScrollSDK").remove();
            strDataF = "<style class='" + nwGridID + "nwScrollSDK'>" + strDataF + "</style>";
            $("#" + nwGridID).append(strDataF);

            // $("#nwGridFreezePos" + nwGridID).html(strDataF);

            var xBoxWidth = $("#" + nwGridID + "").width() + "";
            var xboxTemp = xBoxWidth.replace("px", "");
            var xBoxWidthF = parseFloat(xboxTemp) + xvar;
            $("#" + nwGridID).find(" div.tblGrid_Panel1").outerWidth(xBoxWidthF + "px");


        });



        var objF = $("#" + nwGridID).find(".tblGrid_Panel1");

        xbordersizeAdd = 0.3;
        $(objF).scroll(function () {
            var strDataF = "";
            // $("#nwgrid2").append($(obj).scrollLeft() + "<br>");
            var xvar = $(objF).scrollTop();
            var xheight = 0; var xtopTemp = "";
            var xheightTemp = parseFloat((xvar + "").replace("px", ""));

            xheight = xheightTemp;
            xbordersizeAdd = 0.0;

            for (var i = 0; i < xrowNum; i++) {

                xvalue = (xheight);
                //xbordersizeAdd+=(0.3)-(0.01*i);
                // if(i<1)xvalue=(xheight);
                // else xbordersizeAdd += xbordersize;

                // xvalue += i * xbordersize;

                xtopTemp = $("#" + nwGridID).find(".tblGridBody tr:eq(" + i + ")").outerHeight() - (totalPadding + 1.5) + 0.33; //totalPadding
                strDataF += "#" + nwGridID + " .tblGridBody tr:nth-child(" + (i + 1) + "){top:" + xvalue + "px !important;}";
                xheight = xheight + parseFloat((xtopTemp + "").replace("px", ""));
            }

            $("#nwGridFreezePosY" + nwGridID).html(strDataF);

            //            var xBoxWidth =$("#" + nwGridID + "").width() +"" ;
            //            var xboxTemp = xBoxWidth.replace("px","");
            //            var xBoxWidthF =  parseFloat(xboxTemp)+ xvar;
            //            $("#" + nwGridID).find(" div.tblGrid_Panel1").outerWidth(xBoxWidthF+"px"); 

            //        }
        });


        var xBoxWidth = $("#" + nwGridID + "").width() + "";
        var xboxTemp = xBoxWidth.replace("px", "");
        var xBoxWidthF = parseFloat(xboxTemp) + 17;
        var xBoxWidthFSub = $("#" + nwGridID).find(" div.nwGridDataSub").outerWidth();

        if (xBoxWidthFSub <= xBoxWidthF) xBoxWidthF = xBoxWidthFSub;

        $("#" + nwGridID).find(" div.tblGrid_Panel1").outerWidth(xBoxWidthF + "px");
        $("#" + nwGridID).find(" div.tblGrid_Panel1").css("max-width", "100%");
    } catch (err) {


    }
    //    $("#" + nwGridID+ " .nwGridData").resize(function() {
    //        alert("aa");
    //     //$(obj).animate({scrollLeft: 1});$(obj).animate({scrollLeft: 0});

    //    });

    try {
        //$(obj).scrollLeft(100);$(obj).scrollLeft(0); 
        if (isScrollCheck == undefined) isScrollCheck = true;

        if (isScrollCheck == true) {
            $(obj).animate({ scrollLeft: 10000000 }, 500); $(obj).animate({ scrollLeft: 0 }, 10);
            $(obj).scrollLeft(100); $(obj).scrollLeft(0);
        }

        // alert($(obj).attr("id"));

        //            var xBoxWidth =$("#" + nwGridID + "").width() +"" ;
        //            var xboxTemp = xBoxWidth.replace("px","");
        //            var xBoxWidthF =  parseFloat(xboxTemp)+ 0; 
        //            var xBoxWidthFSub =$("#" + nwGridID).find(" div.nwGridDataSub").outerWidth();
        //            
        //            if(xBoxWidthFSub <= xBoxWidthF) xBoxWidthF = xBoxWidthFSub+17;
        //            
        //            $("#" + nwGridID).find(" div.tblGrid_Panel1").outerWidth(xBoxWidthF+"px"); 

        //            var xBoxWidthF =  parseFloat($("#" + nwGridID).find("table.tblGridBody").outerWidth())+17; 
        //            var xBoxWidthFSub =$("#" + nwGridID).parents("div.nwGrid").outerWidth()+17;
        //            if(xBoxWidthFSub <= xBoxWidthF-30) xBoxWidthF = xBoxWidthFSub;
        //            
        //             $("#" + nwGridID).find(" div.tblGrid_Panel1").outerWidth(xBoxWidthF+"px"); 
        // $(obj).animate({scrollLeft: 100});$(obj).animate({scrollLeft: 0});
    }
    catch (err) {

    }

    setTimeout(function () {
        $("#" + nwGridID).find(".tblGrid_Panel1").scrollTop(100);
        setTimeout(function () {
            $("#" + nwGridID).find(".tblGrid_Panel1").scrollTop(0);
        }, 300);
    }, 300);


    //$("#" + nwGridID).find(".tblGrid_Panel1").scrollTop(1);

    //alert(rdate);
}

function GetZoom() {

    var zoomLevel;
    var screenCssPixelRatio = (window.outerWidth - 8) / window.innerWidth;
    if (screenCssPixelRatio >= .46 && screenCssPixelRatio <= .54) {
        zoomLevel = "-4";
    } else if (screenCssPixelRatio <= .64) {
        zoomLevel = "-3";
    } else if (screenCssPixelRatio <= .76) {
        zoomLevel = "-2";
    } else if (screenCssPixelRatio <= .92) {
        zoomLevel = "-1";
    } else if (screenCssPixelRatio <= 1.10) {
        zoomLevel = "0";
    } else if (screenCssPixelRatio <= 1.32) {
        zoomLevel = "1";
    } else if (screenCssPixelRatio <= 1.58) {
        zoomLevel = "2";
    } else if (screenCssPixelRatio <= 1.90) {
        zoomLevel = "3";
    } else if (screenCssPixelRatio <= 2.28) {
        zoomLevel = "4";
    } else if (screenCssPixelRatio <= 2.70) {
        zoomLevel = "5";
    } else {
        zoomLevel = "unknown";
    }
    return zoomLevel;
}


function func_nwGridTableFreezeCol(nwGridID, colNum) {

    var xxcounter = $("#" + nwGridID).find(".tblGridBody >tbody>*").length;
    var isddrowColor = false;
    var xvar = 0; var xheader = -1;
    var xisvalid = -1;
    try {
        xheader = parseInt($("#" + nwGridID).parent().find(".nwGrid").attr("nwpagerheader"));
    } catch (err) { xheader = -1; }

    if (xheader == -1) {
        try {
            xheader = parseInt($("#" + nwGridID).attr("nwpagerheader"));
        } catch (err) { xheader = -1; }
    }
    if (xheader == undefined) xheader = -1;

    //alert($("#" + nwGridID+".nwGrid").attr("nwinitflag") + "@@@" + $("#" + nwGridID).find(".nwGrid").attr("nwinitflag"));

    try {
        if ($("#" + nwGridID + ".nwGrid").attr("id") != undefined && $("#" + nwGridID + ".nwGrid").attr("nwinitflag") == "1") {
            xisvalid = 1;
            $("#" + nwGridID + ".nwGrid").attr("nwinitflag", "0");
        }
        else if ($("#" + nwGridID).find(".nwGrid").attr("id") != undefined && $("#" + nwGridID).find(".nwGrid").attr("nwinitflag") == "1") {
            xisvalid = 1;
            $("#" + nwGridID).find(".nwGrid").attr("nwinitflag", "0");
        }
    } catch (err) { xisvalid = -1; }

    //// dito and finddings ng color angelo

    for (var i = 0; i < xxcounter; i++) {
        //  if(i>= xheader){xvar=0;}else{ xvar=0;}
        if (i >= xheader && xisvalid == 1) { xvar = 1; } else { xvar = 0; }

        for (var i2 = 0; i2 <= colNum; i2++) {
            var bgcolor = ""; var bgcolorTD = "";
            var xobj = $("#" + nwGridID).find(".tblGridBody").find("tr:eq(" + (i) + ")").find("td:eq(" + i2 + ")");
            bgcolor = $("#" + nwGridID).find(".tblGridBody").find("tr:eq(" + (i + xvar) + ")").css("background-color");
            bgcolorTD = $("#" + nwGridID).find(".tblGridBody").find("tr:eq(" + (i) + ")").find("td:eq(" + i2 + ")").css("background-color");

            if (bgcolorTD != undefined && bgcolorTD != "" && bgcolorTD.replaceAll(" ", "") != "rgba(0,0,0,0)" && bgcolorTD != "transparent")
                bgcolor = bgcolorTD;

            if (bgcolor == "" || bgcolor == undefined) bgcolor = "#FFFFFF";
            if ($("#" + nwGridID).find(".tblGridBody").find("tr:eq(" + (i) + ")").parents().find($("#" + nwGridID).find(".tblGridBody").find("tr:eq(" + (i) + ")").find("td:eq(" + i2 + ")")).index() == 0);
            else
                $("#" + nwGridID).find(".tblGridBody").find("tr:eq(" + (i) + ")").find("td:eq(" + i2 + ")").css("background-color", bgcolor);

            if (isddrowColor == false) {
                var xobjX = $("#" + nwGridID).find("#nwGridRows ").find("tr").find("td:eq(" + i2 + ")");
                if (xobjX.css("background-color").replaceAll(" ", "") == "rgba(0,0,0,0)" || xobjX.css("background-color") == "rgba(0, 0, 0, 0)") {
                    xobjX.css("background-color", bgcolor);
                }
            }
        }
        isddrowColor = true;
    }

}




//});

////////////////////////// Table end

//// bindings start
function func_GetBind_Clear(bindTable) {

    try { $(bindTable).html(''); } catch (err) { }
}

function func_GetBind(objID, bindTable, rownum) {
    //noah-webui-Toolbox-BindingNavigator
    isNewRow = false;
    var colbin = collection_TempG.length;
    var tempr;
    var temprlin;
    var temprlinC = -1;
    var tempclin;
    var tempclinC = -1;

    var tempitemObj;
    var tempitemCol;
    var tempitemType;
    var tempitemTypeSub;

    var tempcrNaviID = "";
    var tempcrnwTR;

    if (crToolBoxType == "sv") {

        func_LoadBindSV(objID, bindTable, rownum);
        return;
    }

    for (var i = 0; i < colbin; i++) {
        tempr = collection_TempG[i].split("#@#");
        tempcrNaviID = tempr[i];

        if (objID == tempcrNaviID) {
            // alert(tempcrNaviID);
            temprlin = tempr[1].split("#aag#");
            temprlinC = temprlin.length;
            for (var i2 = 0; i2 < temprlinC; i2++) {
                tempclin = temprlin[i2].split("*aag*");
                tempclinC = tempclin.length;
                // alert(tempclinC);
                // alert(temprlin[i2] + " \n \n " + temprlinC);
                for (var i3 = 0; i3 < tempclinC; i3++) {
                    tempitemObj = tempclin[0];
                    tempitemCol = tempclin[1];
                    tempitemType = tempclin[2];
                    tempitemTypeSub = tempclin[3];
                    tempitemCol = func_GetBind_Value(tempitemCol, bindTable, rownum);
                    func_GetBind_Setter(tempitemObj, tempitemType, tempitemTypeSub, tempitemCol);

                    // alert(tempclin[0] + " " + tempclin[1] + " " + tempclin[2]);
                }

                //  alert(tempclin[0] + " " + tempclin[1] + " " + tempclin[2]);
            }
            $(bindTable).find('tr').removeClass('aagSelected');
            $(bindTable).find('tr:eq(' + (parseInt(rownum)) + ')').addClass('aagSelected');
            break;
        }
    }
}

function func_LoadBindSV(objID, bindTable, rownum, serCode) {
    var colbin = collection_TempG.length;
    var tempr;
    var temprlin;
    for (var i = 0; i < colbin; i++) {
        tempr = collection_TempG[i].split("#@#");
        tempcrNaviID = tempr[i];
        if (objID == tempcrNaviID) {
            temprlin = tempr[1]; //.split("#aag#");//
            break;
        }
    }

    if (serCode == undefined || serCode == "") {
        serCode = "aagnot";
        nwParameter_Add("serCodeRownum", rownum + 1);
    }

    nwParameter_Add("serCode", serCode);

    nwParameter_Add("crToolInquireKey", crToolInquireKey);

    nwParameter_Add("crToolInquireKey", crToolInquireKey);
    nwParameter_Add("rownum", rownum);
    nwParameter_Add("nwaagSessionID", baseSessionID);
    nwParameter_Add("BindCollection", temprlin);
    nwParameter_Add("NaviationFlag", NaviationFlag);
    nwParameter_Add("nwToolBoxConfigS", nwToolBoxConfigS);
    nwParameter_Add("nwToolBoxConfigC", nwToolBoxConfigC);
    nwParameter_Add("nwToolBoxConfigT", nwToolBoxConfigT);


    var standardCrLnk = crSTDLnk;
    nwLoading_Start('nwaagToolBox');
    func_ActionDriven("actLoadBind", false, standardCrLnk);
}

function func_GetBind_Value(tempitemCol, bindTable, rownum) {
    var valuer = "";
    //alert(tempitemCol + " " + $(bindTable).html() + " " + rownum);


    if (tempitemCol.indexOf("aagIndex") == 0) {
        tempitemCol = tempitemCol.replace("aagIndex", "");
        valuer = $(bindTable).find('tr:eq(' + parseInt(rownum) + ') td:eq(' + parseInt(tempitemCol) + ')').html();
    }
    else {
        tempitemCol = tempitemCol.toLowerCase();
        tempitemCol = 'tr:eq(' + parseInt(rownum) + ') td.aag' + tempitemCol;
        //alert(tempitemCol + " " + valuer);
        valuer = $(bindTable).find(tempitemCol).html();
    }
    //alert(valuer);
    return valuer;
}

function func_GetBind_Setter(tempitemObj, tempitemType, tempitemTypeSub, tempitemCol) {
    //alert(tempitemObj + " " + tempitemCol + " " + tempitemType);

    try {
        tempitemCol = tempitemCol.replaceAll("\\'", "'").replaceAll("&amp;", "&");
        tempitemCol = tempitemCol.replaceAll("&lt;", "<").replaceAll("&gt;", ">");
    } catch (err) { }

    if (tempitemType.toLowerCase() == "val") {

        $(tempitemObj).val(tempitemCol);
    }
    else if (tempitemType.toLowerCase() == "text") {
        $(tempitemObj).text(tempitemCol);
    }
    else if (tempitemType.toLowerCase() == "html") {

        $(tempitemObj).html(tempitemCol);
    }
    else if (tempitemType.toLowerCase() == "prop") {
        tempitemCol = tempitemCol.toLowerCase();
        var myBool = tempitemCol == "true";
        if (tempitemCol == "1") myBool = true;
        else if (tempitemCol == "0") myBool = false;

        $(tempitemObj).prop(tempitemTypeSub, myBool);
    }
    else if (tempitemType.toLowerCase() == "attr") {
        $(tempitemObj).attr(tempitemTypeSub, tempitemCol);
    }
    else if (tempitemType.toLowerCase() == "css") {
        $(tempitemObj).css(tempitemTypeSub, tempitemCol);
    }
    else if (tempitemType.toLowerCase() == "animate") {
        $(tempitemObj).animate({ tempitemTypeSub: tempitemCol });
    }
    else if (tempitemType.toLowerCase() == "function") {
        try {
            func_DataBindCustomLib(tempitemObj, tempitemCol, tempitemTypeSub);
        } catch (err) {
            nwconsole.error(err);
        }
    }
    else {
        //alert("no entry");
    }
}


function func_DataBindCustomLib(tempitemObj, tempitemCol, tempitemTypeSub) {
    tempitemCol = tempitemCol.replaceAll("nwNewLine", "\n");
    func_DataBindCustom(tempitemObj, tempitemCol, tempitemTypeSub);
}

////// bindings end


function nwPanelTab_Create(verid) {
    $("#" + verid).tabs();
}




//// print and export
var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name, filename) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }

        window.location.href = uri + base64(format(template, ctx))
        //     document.getElementById("dlink").href = uri + base64(format(template, ctx));
        //      document.getElementById("dlink").download = filename;
        //      document.getElementById("dlink").click();


    }
})()


function tableToPrint(divID) {

    var vcolor = $('body').css('background-color');
    var vscroll = $('body').css('overflow');
    $('body').css('background', 'none');
    $('.nwprinter').css('display', 'none');
    //var ver = document.getElementById(divID);


    $('body').addClass('nwprintScreenBod');
    $('#' + divID).addClass('nwprintScreen');
    $('#' + divID + " div").addClass('nwprintScreenC');
    $('body').css('overflow', 'visible');

    try { $('#' + divID + " .nwGridData").height("height", "1000% !important"); }
    catch (err) { }

    return;

    //    window.print();
    //    setTimeout(function() {

    //        $('#' + divID).removeClass('nwprintScreen');
    //        $('.nwprintScreenC').removeClass('nwprintScreenC');
    //        $('body').removeClass('nwprintScreenBod');
    //        $('body').css('overflow', vscroll);
    //        $('body').css('background-color', vcolor);
    //    }, 100);

}





//// print and export end


function LoadStringsCases() {
    $(function () {
        $("div.nwUpper input,input.nwUpper,textarea.nwUpper, input.nwCode,textarea.nwCode").bind("input", function (e) {
            if ($(this).hasClass("nwNotSensitive")) return true;
            this.value = this.value.toUpperCase();
        });
        $("div.nwLower input,input.nwLower,textarea.nwLower").bind("input", function (e) {
            this.value = this.value.toLowerCase();
        });
    });
}

function LoadStringsNoSpace() {
    $(function () {
        $("*.nwNoSpace input,input.nwNoSpace,textarea.nwNoSpace, input.nwCode").bind("input", function (e) {
            this.value = this.value.replace(/ /g, '');
        });
    });
}

$(document).on("keypress", "input.nwCode", function (e) {
    var key = e.keyCode;
    if (key == 39 || key == 34 || key == 37) {
        return false;
    }
    else {
        return true;
    }
});

$(document).on("keyup blur", "input.nwCode", function (e) {
    var str = $(this).val();
    var res = str.replace(/'|\"|%/g, "");
    $(this).val(res);
});

$(document).on("keypress blur", "input.nwCode", function (e) {
    if (e.which == 37 || e.which == 39 || e.which == 37)
        return false;
});


function nwDateChecker(nwDate) {
    // var time1 = new Date(Date.parse(nwDate));
    var text = nwDate;
    var comp = text.split('/');
    var m = parseInt(comp[0], 10);
    var d = parseInt(comp[1], 10);
    var y = parseInt(comp[2], 10);
    var date = new Date(y, m - 1, d);
    if (date.getFullYear() == y && date.getMonth() + 1 == m && date.getDate() == d) {
        return true;
    } else {
        return false;
    }

    return true;
}

function nwDateDiff(nwDate, nwDate2, nwFormat) {
    var result = "";
    var tempDate = "";
    var tempDate2 = "";
    var defaultDate = "01/01/1900 ";
    tempDate = nwDate;
    tempDate2 = nwDate2;
    var time1 = new Date(Date.parse(tempDate));
    var time2 = new Date(Date.parse(tempDate2));

    if ((time1 == "Invalid Date") || (time1 == "")
            && (time2 == "Invalid Date") || (time2 == "")
        ) {
        result = "invalid input(s)";
    }
    else {
        var date1 = time1; // 9:00 AM
        var date2 = time2; // 5:00 PM
        if (date2 < date1) {
            date2.setDate(date2.getDate() + 1);
        }
        var diff = date2 - date1;
        var msec = diff;

        var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
        msec -= dd * 1000 * 60 * 60 * 24;

        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;

        var ff = Math.floor(msec);
        msec -= ff * 1000;

        var fdd = dd + "";
        var fhh = hh + "";
        var fmm = mm + "";
        var fss = ss + "";
        var fff = ff + "";

        if (fdd.length < 2) fdd = "0" + fdd;
        if (fhh.length < 2) fhh = "0" + fhh;
        if (fmm.length < 2) fmm = "0" + fmm;
        if (fss.length < 2) fss = "0" + fss;

        if (fff.length < 3) fff = "0" + fff;
        if (fff.length < 3) fff = "0" + fff;

        if (nwFormat.indexOf("d") > -1) {
            if (result != "")
                result += ":";
            result += fdd;
        }
        if (nwFormat.indexOf("h") > -1) {
            if (result != "")
                result += ":";
            result += fhh;
        }
        if (nwFormat.indexOf("m") > -1) {
            if (result != "")
                result += ":";
            result += fmm;
        }
        if (nwFormat.indexOf("s") > -1) {
            if (result != "")
                result += ":";
            result += fss;
        }
        if (nwFormat.indexOf("f") > -1) {
            if (result != "")
                result += ":";
            result += fff;
        }


        if (nwFormat == "" || nwFormat == null)
            result = msec;
        // $("span.wew").text(fhh + ":" + fmm + ":" + fss);
    }

    return result;

}



function nwTimeDiff(nwTime, nwTime2, nwFormat) {
    var result = "";
    var tempTime = "";
    var tempTime2 = "";
    var defaultDate = "01/01/1900 ";
    tempTime = nwTime;
    tempTime2 = nwTime2;
    var time1 = new Date(Date.parse(defaultDate + tempTime));
    var time2 = new Date(Date.parse(defaultDate + tempTime2));

    if ((time1 == "Invalid Date") || (time1 == "")
            && (time2 == "Invalid Date") || (time2 == "")
        ) {
        result = "invalid input(s)";
    }
    else {
        var date1 = time1; // 9:00 AM
        var date2 = time2; // 5:00 PM
        if (date2 < date1) {
            date2.setDate(date2.getDate() + 1);
        }
        var diff = date2 - date1;
        var msec = diff;
        var hh = Math.floor(msec / 1000 / 60 / 60);
        msec -= hh * 1000 * 60 * 60;
        var mm = Math.floor(msec / 1000 / 60);
        msec -= mm * 1000 * 60;
        var ss = Math.floor(msec / 1000);
        msec -= ss * 1000;

        var fhh = hh + "";
        var fmm = mm + "";
        var fss = ss + "";

        if (fhh.length < 2) fhh = "0" + fhh;
        if (fmm.length < 2) fmm = "0" + fmm;
        if (fss.length < 2) fss = "0" + fss;

        if (nwFormat.indexOf("h") > -1) {
            if (result != "")
                result += ":";
            result += fhh;
        }
        if (nwFormat.indexOf("m") > -1) {
            if (result != "")
                result += ":";
            result += fmm;
        }
        if (nwFormat.indexOf("s") > -1) {
            if (result != "")
                result += ":";
            result += fss;
        }
        if (nwFormat == "" || nwFormat == null)
            result = msec;
        // $("span.wew").text(fhh + ":" + fmm + ":" + fss);
    }

    return result;
}

function nwDateMaskCheck(nwDate) {
    var isvalid = true;
    var tempTime = " 12:00 AM";
    var defaultDate = "";
    defaultDate = nwDate;
    var time1 = new Date(Date.parse(defaultDate + tempTime));
    if ((time1 == "Invalid Date") || (time1 == "")) {
        isvalid = false;
    }
    else {
        isvalid = true;
    }
    return isvalid;

}




function nwTimeMaskCheck(nwTime) {
    var isvalid = true;
    var tempTime = "";
    var defaultDate = "01/01/1900 ";
    tempTime = nwTime;
    var time1 = new Date(Date.parse(defaultDate + tempTime));
    if ((time1 == "Invalid Date") || (time1 == "")) {
        isvalid = false;
    }
    else {
        isvalid = true;
    }
    return isvalid;

}

function nwTimeMaskCreate(ver, xmessage) // required noahweb_Format.js
{
    var VarValue = "";
    try {
        VarValue = $(ver).val();
        $(ver).mask("99:99 aa");
        $(ver).addClass("nwTimebox");
        $(ver).val(VarValue);
        if ($(ver).attr("nwerrmessage") == undefined) {
            if (xmessage != undefined) $(ver).attr("nwerrmessage", xmessage);
        }
    } catch (err) {
        //alert(err)

    }

}
//
$(document).on("blur", ".nwTimebox", function () {
    try {
        var temphr = $(this).val();
        var isValid = nwTimeMaskCheck(temphr);
        var isValidX = true;
        if (isValid) {
            try {
                isValidX = nwTimeMaskDone(this);
            }
            catch (err) { }
        }
        else {
            try {
                isValidX = nwTimeMaskDone(this);
            }
            catch (err) { }
            if (isValidX == false) return;

            var xmessage = $(this).attr("nwerrmessage");
            if (xmessage == undefined) xmessage = "Invalid Time!";

            parent_MessageBox(xmessage, "Warning", "");
            $(this).val("");
        }

    } catch (err) {
        alert(err);
    }

});

function nwTimeCorrection(temphr) {

    if (temphr.indexOf("a") > -1 || temphr.indexOf("A") > -1) {
        temphr = temphr.substring(0, 6);
        temphr = temphr + "AM";

    }
    else if (temphr.indexOf("p") > -1 || temphr.indexOf("P") > -1) {

        temphr = temphr.substring(0, 6);

        temphr = temphr + "PM";

    }
    return temphr;

}





function nwTimeSetAMPM(ver) {
    var hrs = ver.getHours();
    var mins = ver.getMinutes();
    var ampm = "AM";

    if (hrs > 11) {
        ampm = "PM";
    }


    if (hrs > 12) {
        hrs = hrs - 12;
    }


    if (hrs.toString().length < 2)

        hrs = "0" + hrs;

    if (mins.toString().length < 1)

        mins = "00";

    else if (mins.toString().length < 2)

        mins = "0" + mins;


    var totime = hrs + ":" + mins + " " + ampm;

    return totime;

}


var nwconsole = {
    log: function (content) {
        try {
            nwlog(content);
        } catch (err) {
        }
    },
    error: function (content) {
        try {
            nwerror(content);
        } catch (err) {
        }
    }, warn: function (content) {
        try {
            nwwarn(content);
        } catch (err) {
        }
    }
}

function nwlog(content) {
    try {
        console.log(content);
    } catch (err) {

    }
}
function nwerror(content) {
    try {
        console.error(content);
    } catch (err) {

    }
}
function nwwarn(content) {
    try {
        console.warn(content);
    } catch (err) {

    }
}

/////////////////temp table lib

var nwtempValue;
var crnwRow = "very"; // should not be change
var crnwCol = "verx"; // should not be change
var crnwDefault = "nwDefault"; // should not be change
var crnwRowIndex = -1;
var crnwColIndex = -1;


var nwLib = {
    nwTempTable_Create: function (nwName, row, datasource, filterColumn, filterValue) {
        try {
            nwTempTable_Create(nwName, row, datasource, filterColumn, filterValue);
        } catch (err) { }
    },
    nwTempTable_Remove: function (nwName) {
        try {

            nwTempTable_Remove(nwName);
        } catch (err) { }
    },
    nwTempTable_ConvertToArray: function (nwName, seperator) {
        try {
            return nwTempTable_ConvertToArray(nwName, seperator);
        } catch (err) { var arry = new Array(); return arry; }
    },
    nwTempTable_ConvertToString: function (nwName, colseperator, rowseperator) {
        try {
            return nwTempTable_ConvertToArray(nwName, colseperator, rowseperator);
        } catch (err) { var xstring = ""; return xstring; }
    },

    nwTempTable_CheckIfExist: function (nwName) {
        try {
            return nwTempTable_CheckIfExist(nwName);
        } catch (err) { return false; }
    },
    nwTempTable_AddRow: function (nwName, nwRowData, nwSeperator) {
        try {
            nwTempTable_AddRow(nwName, nwRowData, nwSeperator);
        } catch (err) { return err; }
    },
    nwTempTable_RowData_Set: function (tableName, row, col, isHtmlType) {
        try {
            var xresult;
            function nwTempTable_Edit(data) {
                return nwTempTable_RowData_Set(tableName, row, col, isHtmlType)(data);
            }
            xresult = nwTempTable_Edit;
            return xresult;
        } catch (err) { return err; }
    },
    nwTempTable_RowData_Get: function (tableName, row, col, isHtmlType) {
        // alert( " % " + tableName.attr("id") + " % " + tableName + " , " + row  + ","+ col +"," +isHtmlType);
        try {
            //alert(tableName + " - " + tableName.attr(id));
            return nwTempTable_RowData_Get(tableName, row, col, isHtmlType);


        } catch (err) {
            //alert(err + " % " + tableName.attr("id") + " % " + tableName + " , " + row  + ","+ col +"," +isHtmlType);
            return err;
        }
    },
    nwTempTable_Row_Delete: function (tableName, rownum) {
        try {
            return nwTempTable_Row_Delete(tableName, rownum);
        } catch (err) { return err; }
    },



    nwTempTable_Overwrite: function (nwName, datasource, separator, filterColumn, filterValue) {
        nwTempTable_Overwrite(nwName, datasource, separator, filterColumn, filterValue);
    },
    nwTempTable_Overwrite_fromString: function (tableName, datasource, seperator, rowSeperator) {
        nwTempTable_Overwrite_fromString(tableName, datasource, seperator, rowSeperator);
    },
    nwTempTable_Column_ADD: function (tableName, colName, defaultvalue) {
        try {
            nwTempTable_Column_ADD(tableName, colName, defaultvalue);
        } catch (err) { }
    },

    //////////////////////////////
    nwTempTable_Row_Count: function (tableName) {
        try {
            return nwTempTable_Row_Count(tableName);
        } catch (err) { return err; }
    },
    nwTempTable_Row_DataCount: function (tableName) {
        try {
            return nwTempTable_Row_DataCount(tableName);
        } catch (err) { return err; }
    },

    ////////////////////////////////
    nwTempTable_Column_Count: function (tableName) {
        try {
            return nwTempTable_Column_Count(tableName);
        } catch (err) { return err; }
    },
    ///////////////////
    nwTempTable_Column_ValueExist: function (tableName, colnum, value, isSensitive, isHtmlType, currentIndex) {
        try {
            return nwTempTable_Column_ValueExist(tableName, colnum, value, isSensitive, isHtmlType, true, "1", currentIndex);
        } catch (err) { return err; }
    },
    nwTempTable_Column_ValueExist_Index: function (tableName, colnum, value, isSensitive, isHtmlType, currentIndex) {
        try {
            return nwTempTable_Column_ValueExist(tableName, colnum, value, isSensitive, isHtmlType, true, "2", currentIndex);
        } catch (err) { alert(err); return err; }
    },
    nwTempTable_Column_ValueExist_Count: function (tableName, colnum, value, isSensitive, isHtmlType, currentIndex) {
        try {
            return nwTempTable_Column_ValueExist(tableName, colnum, value, isSensitive, isHtmlType, true, "3", currentIndex);
        } catch (err) { return err; }
    },
    nwTempTable_Column_Delete_Case: function (tableName, rowtoSearch, value, isSensitive, isHtmlType) {
        try {
            return nwTempTable_Column_ValueExist(tableName, coltoSearch, value, isSensitive, isHtmlType, false, "4");
        } catch (err) { return err; }
    },

    nwTempTable_Column_Name: function (tableName, Column, value) {
        try {
            return nwTempTable_Column_Name(tableName, Column, value);
        } catch (err) { return err; }
    },

    /////////////////////////////////

    nwTempTable_Row_ValueExist: function (tableName, rownum, value, isSensitive, isHtmlType, currentIndex) {
        try {
            return nwTempTable_Column_ValueExist(tableName, rownum, value, isSensitive, isHtmlType, false, "1", currentIndex);
        } catch (err) { return err; }
    },
    nwTempTable_Row_ValueExist_Index: function (tableName, rownum, value, isSensitive, isHtmlType, currentIndex) {
        try {
            return nwTempTable_Column_ValueExist(tableName, rownum, value, isSensitive, isHtmlType, false, "2", currentIndex);
        } catch (err) { return err; }
    },
    nwTempTable_Row_ValueExist_Count: function (tableName, rownum, value, isSensitive, isHtmlType, currentIndex) {
        try {
            return nwTempTable_Column_ValueExist(tableName, rownum, value, isSensitive, isHtmlType, false, "3", currentIndex);
        } catch (err) { return err; }
    }, nwTempTable_Row_Delete_Case: function (tableName, coltoSearch, value, isSensitive, isHtmlType) {
        try {
            return nwTempTable_Column_ValueExist(tableName, coltoSearch, value, isSensitive, isHtmlType, true, "4");
        } catch (err) { return err; }
    }

    //////////////////////////////

}



function nwTempTable_Overwrite(tableName, datasource, seperator, filterColumn, filterValue) {
    var xfilterColumn = -1;
    var xfilterValue = "";
    if (filterColumn != undefined) xfilterColumn = parseInt(filterColumn);
    if (filterValue != undefined) xfilterValue = filterValue;

    $("#" + tableName).remove();
    $("#" + tableName + "nwtemplate").remove();
    nwTempTable_Create(tableName, seperator, datasource, xfilterColumn, xfilterValue);
}

function nwTempTable_Overwrite_fromString(tableName, datasource, seperator, rowSeperator) {

    var aryDataAR = new Array();
    var xcount = datasource.length;
    if (xcount >= 1) {
        aryDataAR = datasource.split(seperator);
    }

    nwTempTable_Create(tableName, rowSeperator, aryDataAR);
}

function nwTempTable_Remove(tableName) {

    tableName = nwTempTable_GetTableID(tableName);

    $("table#" + tableName + "nwtemplate.nwTempTableTemplate").remove();
    $("table#" + tableName + ".nwTempTable").remove();
}

function nwTempTable_Create(tableName, rowcount, datasource, filterColumn, filterValue) {
    var colnum = 2;
    var rownum = 0;
    var tempTH = "";
    var tempTR = "";
    var dataTR = "";
    var tempTD = "";
    var isData = false;

    var xfilterColumn = -1;
    var xfilterValue = "";

    if (filterColumn != undefined) { try { xfilterColumn = parseInt(filterColumn); } catch (err) { } }
    if (filterValue != undefined) { try { xfilterValue = filterValue; } catch (err) { } }





    if (datasource >= 1) {
        colnum = datasource;
        if (rowcount != undefined && rowcount >= 1) rownum = rowcount;
    }
    else {
        isData = true;

    }



    if (isData) {

        try { rownum = datasource.length; }
        catch (err) { rownum = 0; }
        var tempcol = 0;
        var tempstr = "";
        var maxcol = 0;
        var tempstrCheck = "";
        var xmaxCol = -1;
        var arryRev = new Array();
        var arryCount = -1;

        for (var i = 0; i < rownum; i++) // create columns
        {
            tempstr = datasource[i];
            tempcol = tempstr.split(rowcount);
            colnum = tempcol.length;
            if (xmaxCol == -1) xmaxCol = colnum;
            arryRev.push(i);

            if (colnum > xmaxCol) {

                // arryCount = arryRev.length;
                //for (var zi = 0; zi < arryCount; zi++) {
                tempstr = "";
                for (var i2 = 0; i2 < (colnum - xmaxCol) ; i2++) // create columns
                {
                    tempstr += "<td>" + "</td>";
                }
                dataTR = dataTR.replace(/#@aag@#/g, tempstr + "#@aag@#");
                //}
                xmaxCol = colnum;
                arryRev = new Array();
            }
            tempTD = "";

            try { tempstrCheck = tempcol[xfilterColumn]; } catch (err) { }

            // alert(tempstrCheck + " a " + xfilterValue);
            // alert("(" + xfilterColumn + " >= 0 && " + tempstrCheck + " == " + xfilterValue + ") || " + xfilterColumn + "===  -1");
            if ((xfilterColumn >= 0 && tempstrCheck == xfilterValue) || xfilterColumn === -1) {

                for (var i2 = 0; i2 < xmaxCol; i2++) // create columns
                {
                    try { tempstr = tempcol[i2]; if (tempstr == undefined) tempstr = ""; }
                    catch (err) { tempstr = ""; }
                    tempTD += "<td>" + tempstr + "</td>";
                }
                dataTR += "<tr>" + tempTD + "#@aag@#</tr>";
            }


            if (colnum > maxcol) maxcol = colnum;

        }
        colnum = maxcol;

    }
    // alert(dataTR);
    dataTR = dataTR.replace(/#@aag@#/g, "");
    //alert(dataTR);
    //alert(tableName + " " + colnum);
    for (var i = 1; i <= colnum; i++) // create columns
    {
        //if (!isData) 
        tempTD += "<td></td>";
        tempTH += "<th>Column" + i + "</th>";
    }
    //if (!isData)
    tempTR = "<tr>" + tempTD + "</tr>";

    tempTH = "<tr>" + tempTH + "</tr>";






    var isExist = nwTempTable_CheckIfExist(tableName);
    var tempcon = "<table class=\"nwTempTable\" id=\"" + tableName + "\"><thead>" + tempTH + "</thead></table>";
    var tempcontemp = "<table class=\"nwTempTableTemplate\" id=\"" + tableName + "nwtemplate\">" + tempTR + "</table>"



    if (!isExist) {

        $("#nwAAGsec").append(tempcon);

        if (!isData) {
            var temptr = $("#" + tableName + "nwtemplate tr:eq(0)").clone();
            for (var i = 0; i < rownum; i++) {
                temptr = $("#" + tableName + "nwtemplate tr:eq(0)").clone();
                $("#" + tableName).append(temptr);
            }


        }
        else {
            $("#" + tableName + "").append(dataTR);
            if (rownum > 0) $("#" + tableName).find("tbody tr:eq(" + (rownum - 1) + ")").addClass("nwSelected");
        }
        $("#nwAAGsec").append(tempcontemp);



    }
    else {
        //alert("already " + tableName + " exist");
    }

    $("#" + tableName + "nwtemplate").html(tempTR);
}




function nwTempTable_ConvertToArray(tableName, separator, rowseperator) {
    var temparr = new Array();
    var xseparator = "#@#";
    var yseperator = "#@aag@#";
    var isString = false;
    var fstring = "";
    var xtempFinal = "";

    try {
        if (separator != undefined) xseparator = separator;
    } catch (err) { }

    try {
        if (rowseperator != undefined && rowseperator != "") {
            yseperator = rowseperator;
            isString = true;
        }
    } catch (err) { isString = false; }


    tableName = nwTempTable_GetTableID(tableName);
    isExist = nwTempTable_CheckIfExist(tableName);
    if (isExist) {
        var obj = $("table#" + tableName);
        var xcount = obj.find("tbody tr").length;
        var xcountCol = obj.find("thead th").length;
        var xstr = "";

        for (var i = 0; i < xcount; i++) {
            xtempFinal = "";

            for (var i2 = 0; i2 < xcountCol; i2++) {
                if (i2 >= 1) xtempFinal += xseparator;
                try {
                    xstr = nwTempTable_RowData_Get(tableName, i, i2);
                } catch (err) { }
                xtempFinal += xstr;
            }
            if (isString) {
                if (i == 0) fstring = xtempFinal;
                else fstring += yseperator + xtempFinal;

            }
            else
                temparr.push(xtempFinal);
        }


    }

    if (isString == true) {
        return fstring;
    }
    else
        return temparr;
}


function nwTempTable_CheckIfExist(tableName) {
    var isExist = false;
    //tableName = nwTempTable_GetTableID(tableName);
    tableName = tableName.replace("#", "");
    var tempVar = $("table#" + tableName).attr("id");
    if (tempVar == undefined || tempVar == "undefined") {
        if (nwTempTable_CheckIfNWgrid(tableName)) isExist = true;
        else isExist = false;
    }
    else {
        isExist = true;
    }
    return isExist;
}

function nwTempTable_CheckIfNWgrid(tableName, checkID) {
    var isValid = false;
    var xcheckID = false; //return false;
    //try{
    if (tableName == undefined) return false;

    if (typeof tableName == "object") {
        tableName = tableName.attr("id");
        if (tableName == undefined) return false;
    }
    else
        tableName = tableName.replace("#", "");



    try {
        if (checkID != undefined && checkID != "undefined")
            xcheckID = checkID;
    }
    catch (err) { }

    //alert(  + " " + tableName);
    var idCheck = "";
    var tempidCheck = "";

    try {
        tempidCheck = $("#" + tableName + ">div.nwGrid .tblGridBody").attr("id");
        idCheck = "#" + tableName + ">div.nwGrid .tblGridBody";
    }
    catch (err) { }

    if (tempidCheck == "" || tempidCheck == undefined) {
        try {
            tempidCheck = $("#" + tableName + ".nwGrid .tblGridBody").attr("id");
            if (tempidCheck == "" || tempidCheck == undefined) idCheck = "";
            else {
                idCheck = "#" + tableName + ".nwGrid .tblGridBody";
            }

        }
        catch (err) { }
    }
    else {
        idCheck = "";
    }

    if (xcheckID == true) {
        return idCheck;
    }
    else {
        if (tempidCheck != undefined && tempidCheck != "" && tempidCheck != "undefined")
            isValid = true;
        else isValid = false;

        return isValid;
    }

    //}
    //catch(err){return false;}

    return false;
}


function nwTempTable_GetTableID(tableName) { // aagg
    var isExist = false;
    var tempID = tableName;
    var tableid = "";



    //alert(tableName + "aaaaa ");

    if (typeof tempID == "object")
        obj = tempID;
    else {
        isExist = nwTempTable_CheckIfExist(tempID);
        if (isExist) {
            var xisExist = nwTempTable_CheckIfNWgrid(tempID, true);

            if (xisExist != "") {
                obj = $(xisExist);
            }
            else {
                obj = $("#" + tempID);
            }
        }
        else {
            obj = $("" + tempID);
        }
    }


    try {
        if ($(obj).attr("id") != undefined)
            tableid = $(obj).attr("id");
        else
            tableid = tableName.replace("#", "");



        //        isExist = nwTempTable_CheckIfExist(tempID);
        //        if (!isExist) tableid = "";
    } catch (err) {

    }



    return tableid;
}


function nwTempTable_GetCurrentCol(tableName, aagrow, aagcol) {
    var isExist = nwTempTable_CheckIfExist(tableName);
    var crCol = -1;
    var crRow = -1;

    if (aagrow == "very") {
        crRow = $("#" + tableName + " tbody tr.nwSelected").index();
        if (crRow == undefined || crRow < 0) crRow = $("#" + tableName + " tbody tr.nwgridSelected").index() - 1;
    }
    else {
        crRow = aagrow;
    }

    if (aagcol == "verx") {
        crCol = $("#" + tableName + " tbody tr td.nwSelected").index();
        if (crCol == undefined || crCol < 0) crRow = $("#" + tableName + " tbody tr td.nwgridSelected").index();

    }
    else {
        crCol = aagcol;
    }

    crnwColIndex = crCol;
    crnwRowIndex = crRow;
}

function nwTempTable_ClearParam() {
    crnwColIndex = -1;
    crnwRowIndex = -1;
}

function nwTempTable_AddRow(tableName, nwRowData, nwSeperator) {
    tableName = nwTempTable_GetTableID(tableName);
    var isExist = false;
    var temptr = $("#" + tableName + "nwtemplate tr:eq(0)").clone();
    $("#" + tableName + "").append(temptr);
    $("#" + tableName + " tr").removeClass("nwSelected");
    $("#" + tableName + " td").removeClass("nwSelected");
    $(temptr).addClass("nwSelected");
    $(temptr).find("td:eq(0)").addClass("nwSelected");

    if (nwRowData != undefined && nwRowData != "") {
        var tempData = "";
        var xnwSeperator = "#@#";
        try {
            if (nwSeperator != undefined && nwSeperator != "") xnwSeperator = nwSeperator;
        } catch (err) { }
        var nwArry = nwRowData.split(xnwSeperator);
        var xcount = nwArry.length;
        for (var i = 0; i < xcount; i++) {
            tempData = "";
            tempData = nwArry[i];
            nwTempTable_RowData_Set(tableName, crnwRow, i)(tempData);
        }

    }

}

function nwTempTable_RowData_Set(tableName, row, col, isHtmlType) {
    tableName = nwTempTable_GetTableID(tableName);
    nwTempTable_GetCurrentCol(tableName, row, col);
    function nwTempTable_Edit(data) {
        var tableNamex = tableName;

        if ($("#" + tableName + "  > tbody > tr:eq(" + crnwRowIndex + ") > td:eq(" + crnwColIndex + ")").html() == undefined)
            tableName = "#" + tableName + "  tbody > tr:eq(" + crnwRowIndex + ") > td:eq(" + crnwColIndex + ")";
        else
            tableName = "#" + tableName + "  > tbody > tr:eq(" + crnwRowIndex + ") > td:eq(" + crnwColIndex + ")";


        var isnwCell = false;
        try {
            if ($(tableName).parents(".tblGridBody ").attr("nwcelldiv") == "enable")
                tableName += " div.nwCell";
        } catch (err) { }
        //else alert("hahah "+ tableNamex + " "+ $("#" + tableNamex + " ").attr("nwcelldiv"));

        var xisHtml = "html";
        try {
            xisHtml = isHtmlType;
        }
        catch (err) { }

        if (xisHtml == undefined || xisHtml == "undefined" || xisHtml == "") xisHtml = "html";



        if ($(tableName).find("input").val() != undefined || $(tableName).find("input").val() == "") $(tableName).find("input").val(data);
        if ($(tableName).find("textarea").val() != undefined || $(tableName).find("input").val() == "") $(tableName).find("textarea").val(data);

        nwTempTable_ClearParam();

        if (xisHtml == "text") $(tableName).text(data);
        else if (xisHtml == "html") $(tableName).html(data);
        else if (xisHtml == "button") $(tableName).find("button").text(data);
        else if (xisHtml.toLowerCase() == "inputcheck") {
            var isbool = data == "1" || data == "true" ? true : false; $(tableName).find("input").prop("checked", isbool);
        }
        else if (xisHtml.toLowerCase() == "input") $(tableName).find("input").val(data);
        else if (xisHtml.toLowerCase() == "textarea") $(tableName).find("textarea").val(data);
        else if (xisHtml.toLowerCase() == "select") $(tableName).find("select").val(data);

        else
            $(tableName).find(xisHtml).html(data);

        //alert(xisHtml.toLowerCase()+"-"+data);

        return data;
    }
    var xresult = nwTempTable_Edit;
    return xresult;
}


function nwTempTable_RowData_Get(tableName, row, col, isHtmlType) {
    //console.log("aag-id" +tableName.attr(id));

    var xtableName = nwTempTable_GetTableID(tableName);
    nwTempTable_GetCurrentCol(xtableName, row, col);
    var xresult = "";

    if (row == "very") row = crnwRowIndex;
    if (col == "verx") col = crnwColIndex;



    nwTempTable_ClearParam();

    var isnwGrid = nwTempTable_CheckIfNWgrid(xtableName);



    if (isnwGrid) {
        xtableName = "#" + tableName + " .tblGridBody tbody tr:eq(" + row + ") td:eq(" + (1 + col) + ")";
    }
    else {
        xtableName = "table#" + xtableName + " tbody tr:eq(" + row + ") td:eq(" + col + ")";
    }




    var xisHtml = "";

    if (isHtmlType != undefined && isHtmlType != "undefined") {



        try {
            xisHtml = isHtmlType;

            var temp_str2 = "";

            obj = $(xtableName);



            if (xisHtml == "text") temp_str2 = $(obj).text();
            else if (xisHtml == "html") temp_str2 = $(obj).html();
            else if (xisHtml == "button") temp_str2 = $(obj).find("button").text();
            else if (xisHtml.toLowerCase() == "inputcheck") temp_str2 = "" + $(obj).find("input").prop("checked");
            else if (xisHtml.toLowerCase() == "input") temp_str2 = "" + $(obj).find("input").val();
            else if (xisHtml.toLowerCase() == "textarea") temp_str2 = "" + $(obj).find("textarea").val();
            else if (xisHtml.toLowerCase() == "select") temp_str2 = "" + $(obj).find("select").val();
            //alert(temp_str2);
            xresult = temp_str2;
        } catch (err) {

            xresult = $(xtableName).html();
        }



    }
    else {


        // xtableName="#"+xtableName.replace("#","");
        xresult = $(xtableName).html();

        //alert(xtableName + " -@ " + xresult );

    }



    if (xresult == undefined || xresult == "undefined") xresult = "";

    return xresult;
}
function nwTempTable_Row_Count(tableName) {
    var xresult;
    tableName = nwTempTable_GetTableID(tableName);

    var xisExist = nwTempTable_CheckIfNWgrid(tableName, false);

    if (xisExist) {
        tableName = "#" + tableName + " .tblGridBody tbody tr";
        // alert(tableName);
    }
    else tableName = "#" + tableName + " tbody tr";
    xresult = $(tableName).length;
    return xresult;
}

function nwTempTable_Row_DataCount(tableName) {
    /// data row count
    var xresult;
    tableName = nwTempTable_GetTableID(tableName);

    var xisExist = nwTempTable_CheckIfNWgrid(tableName, false);

    if (xisExist) {
        tableName = "#" + tableName + " .tblGridBody tbody tr";
        // alert(tableName);
    }
    else tableName = "#" + tableName + " tbody tr";
    xresult = $(tableName).length;
    return xresult;
}



function nwTempTable_Row_Delete(tableName, rownum) {
    var xresult = 0;
    tableName = nwTempTable_GetTableID(tableName);
    var xrownum = -1;
    if (rownum == "very") {
        xrownum = $("#" + tableName + " tbody tr.nwSelected").index();

    }
    else {
        xrownum = rownum;
    }

    // alert(xrownum);

    xresult = $("#" + tableName + " tbody tr").length - 1;

    if (xrownum > xresult) return false;
    else if (xrownum < 0 || xrownum == undefined) return false;
    else {
        $("#" + tableName + " tbody tr:eq(" + xrownum + ")").remove();
    }


    return xresult;
}
function nwTempTable_CreateFilteredTable(tablename, verArray, tablename2) {


    var len = verArray.length;
    var verIndex = 0; //
    var xtotalLen = nwLib.nwTempTable_Row_Count(tablename);
    var xtotalColLen = nwLib.nwTempTable_Column_Count(tablename);
    var strindex = -1;

    var isMemTempTable = false;
    if (tablename2 == undefined || tablename2 == "undefined") {
        tablename2 = "nwaagtempmemtable";
        nwLib.nwTempTable_Overwrite(tablename2, xtotalColLen, 0);
        isMemTempTable = true;
    }

    var xisExist = nwTempTable_CheckIfNWgrid(tablename, true);
    if (xisExist) xtotalColLen -= 1;
    var isTemptable2Exist = false;
    isTemptable2Exist = nwTempTable_CheckIfExist(tablename2);


    if (isTemptable2Exist == false) {
        nwLib.nwTempTable_Overwrite(tablename2, xtotalColLen, 0);
    }



    if (len >= 1) {
        var verString = verArray[0];
        var vertempArray = verString.split("col:");

        strindex = vertempArray[0];
        strVer = vertempArray[1];
        //alert(len +" " + strindex + " " + strVer);
    }

    var verArrayTemp = [];
    var verArrayTempLast = [];
    var verArrayFinal = [];

    for (var i = 0; i < len; i++) {
        try {

            var verString = verArray[i];
            var vertempArray = verString.split("col:");
            var xstrindex = vertempArray[0];

            //alert(xstrindex + " " +  strindex + " == "  + (xstrindex == strindex) );

            if (xstrindex == strindex) {
                verArrayTemp.push(verString);
            }
            else {
                verArrayTempLast.push(verString);
            }
        } catch (err) { }
    }
    //alert(verArrayTemp);


    verArrayTemp = verArrayTemp.sort();


    verArrayTempLast = verArrayTempLast.sort();
    //verArrayFinal = verArrayTemp;


    var xcer = verArrayTemp.length;

    for (var i = 0; i < xcer; i++) {
        var verString = verArrayTemp[i];
        verArrayFinal.push(verString);
    }

    for (var i = 0; i < verArrayTempLast.length; i++) {
        var verString = verArrayTempLast[i];
        verArrayFinal.push(verString);
    }


    // alert(verArrayTemp + " # " + verArrayFinal + " # " + verArrayTempLast);
    //alert(verArrayTemp + " " + verArrayFinal);
    // alert(verArrayFinal);

    // alert(xtotalLen + " " + xcer);
    //return;
    var xrowData = "";
    var xrowDataSep = "aag#@#";
    var isDatavalid = true;
    var xtempValue = "";
    for (var ig = 0; ig < xcer; ig++) {
        var verString = verArrayTemp[ig];
        var vertempArray = verString.split("col:");
        strindex = vertempArray[0];
        strVer = vertempArray[1];
        // alert("insert:" + strindex + " " + strVer);

        for (var ifx = 0; ifx < xtotalLen; ifx++) {
            //var strindex = 0;
            //var strVer = "";
            //loop
            var xindexz = 0;
            try { xindexz = parseInt(strindex); }
            catch (err) { }

            // alert("COndition:" +xindexz +  " " +strVer +  " index:" + ifx);

            verIndex = nwLib.nwTempTable_Column_ValueExist_Index(tablename, xindexz, strVer, false, "text", ifx);

            //alert(verIndex);

            if (verIndex >= 0) {
                xrowData = "";
                isDatavalid = false;
                // alert(verIndex +  " - " + xtempValue + " count:" + xtotalColLen );
                for (var icol = 0; icol < xtotalColLen; icol++) {


                    xtempValue = nwLib.nwTempTable_RowData_Get(tablename, verIndex, icol, "text");
                    //alert(verIndex +  " " + xtempValue + " count:" + xtotalColLen );

                    var nwvalue = nwGetColValue(verArrayTempLast, icol, xtempValue);
                    //alert(nwvalue);

                    if (nwvalue == false) {
                        isDatavalid = false;
                        xrowData = "";
                    }
                    else {
                        if (icol >= 1) xrowData += xrowDataSep;
                        xrowData += xtempValue;
                        isDatavalid = true;
                    }

                    if (isDatavalid == false) {
                        break;
                    }

                }
                //alert("xrowData:" + xrowData);

                // alert(isDatavalid);
                if (isDatavalid == true) {
                    nwLib.nwTempTable_AddRow(tablename2, xrowData, xrowDataSep);
                    ifx = verIndex; // + 1;
                }

            }
            else if (verIndex <= -1) {
                ifx = xtotalLen + 1;
            }

        }
    }

    if (isMemTempTable) {
        var objFinal = $("table#" + tablename2 + ".nwTempTable");
        nwLib.nwTempTable_Remove(tablename2);
        return objFinal;
    }
    else {
        var objFinal = $("table#" + tablename2 + ".nwTempTable");
        return objFinal;
    }
}

function nwGetColValue(verArrayTempLast, colneed, colvalue) {
    var isValid = true;
    var xcol = ""; var strValue = "";

    xcol = "" + colneed;

    for (var i = 0; i < verArrayTempLast.length; i++) {
        var verString = verArrayTempLast[i];
        var vertempArray = verString.split("col:");
        var strindex = vertempArray[0];
        var strVer = vertempArray[1];
        if (xcol == strindex) {
            strValue = strVer;

            // alert(strValue + " == " + colvalue);

            if (strValue == colvalue) {
                isValid = true; break;
            }
            else isValid = false;


        }
        // verArrayFinal.push(verString);
    }


    return isValid;
}


function nwTempTable_Column_ADD(tableName, colName, defaultvalue) {
    tableName = nwTempTable_GetTableID(tableName);
    var isExist = nwTempTable_CheckIfExist(tableName);
    if (!isExist) return;
    if (defaultvalue == undefined) defaultvalue = "";
    var xcountCol = 0;
    xcountCol = $("#" + tableName).find("thead tr th").length;
    if (colName != "" && colName != undefined) {
        $("#" + tableName).find("thead tr").append("<th>" + colName + "</th>");
    }
    else {
        $("#" + tableName).find("thead tr").append("<th>Column" + xcountCol + "</th>");
    }
    var finalStr = "";
    if (defaultvalue != "" && colName != undefined) {
        finalStr = defaultvalue;
    }
    var xcount = $("#" + tableName).find("tbody tr").length;
    //for (var i = 0; i < xcount; i++) {
    $("#" + tableName).find("tbody tr").append("<td>" + finalStr + "</td>");
    //}
    $("#" + tableName + "nwtemplate").find("tbody tr").append("<td>" + finalStr + "</td>");
}
function nwTempTable_Column_Count(tableName) {
    var xresult;
    var isnwGrid = nwTempTable_CheckIfNWgrid(tableName);
    if (isnwGrid) {
        tableName = "#" + tableName + " .tblGridHeader thead th";
    }
    else {
        tableName = nwTempTable_GetTableID(tableName);
        tableName = "#" + tableName + " thead th";
    }
    // alert($(tableName).attr("id") +  " " + tableName);
    xresult = $(tableName).length;

    return xresult;
}

function nwTempTable_CellType(tableName, Row, Column, value) {

    var xresult;
    var isnwGrid = nwTempTable_CheckIfNWgrid(tableName);
    if (isnwGrid) {
        tableName = "#" + tableName + " .tblGrid_Panel1 tbody tr:eq(" + (Row) + ") td:eq(" + (Column + 1) + ")";
    }
    else {
        tableName = nwTempTable_GetTableID(tableName);
        tableName = "#" + tableName + " tbody tr:eq(" + (Row) + ") td:eq(" + (Column) + ")";
    }
    try {
        $(tableName).attr("nwtype", value);
    } catch (err) { }
    //return xresult;
}

function nwTempTable_TypeComboBoxList(tableName, Row, Column, Value, Sep) {
    var xresult;
    var isnwGrid = nwTempTable_CheckIfNWgrid(tableName);
    if (isnwGrid) {
        tableName = "#" + tableName + " .tblGrid_Panel1 tbody tr:eq(" + (Row) + ") td:eq(" + (Column + 1) + ")";
    }
    else {
        tableName = nwTempTable_GetTableID(tableName);
        tableName = "#" + tableName + " tbody tr:eq(" + (Row) + ") td:eq(" + (Column) + ")";
    }
    try {
        $(tableName).html("<select></select>");
        if (Sep == undefined || Sep == "") Sep = "\t";
        var xvalue = "";
        var xstyleArray = Value.split("\t");
        for (var i = 0; i < xstyleArray.length; i++) {
            xvalue = xstyleArray[i];
            $(tableName).find("select").append("<option value=\"" + xvalue + "\">" + xvalue + "</option>");
        }

    } catch (err) { }
    //return xresult;
}


function nwTempTable_Column_Name(tableName, Column, value) {

    var xresult;
    var isnwGrid = nwTempTable_CheckIfNWgrid(tableName);
    if (isnwGrid) {
        tableName = "#" + tableName + " .tblGridHeader thead th:eq(" + (Column + 1) + ") div:eq(0)";
    }
    else {
        tableName = nwTempTable_GetTableID(tableName);
        tableName = "#" + tableName + " thead th:eq(" + (Column) + ")";
    }
    try {
        $(tableName).html(value);
    } catch (err) { }
    //return xresult;
}

function nwTempTable_Column_ValueExist(tableName, colnum, value, isSensitive, isHtmlType, isCol, isType, currentIndex) {
    var xresult = false; // output if Value Exist
    var tempID = tableName;
    var obj;
    var xcountRow = 0;
    var xcolnum = -1;
    var xisHtml = "text";
    var xisSensitive = true;
    var xisCol = true;
    var xisType = "1";
    var xindex = -1;  // output of index of value
    var xcounter = 0;  // output of count of value exist
    var xisValidData = false;

    var xisnwGrid = false;

    try {
        xisnwGrid = nwTempTable_CheckIfNWgrid(tempID);
    } catch (err) { }



    var xcurrentIndex = 0;

    try {
        if (currentIndex != undefined && xcurrentIndex > -1)
            xcurrentIndex = currentIndex;
    } catch (err) {
        xcurrentIndex = 0;
    }

    try {
        xisCol = isCol;
    } catch (err) { }

    try {
        xisType = isType;
    } catch (err) { }

    if (isSensitive == undefined || isSensitive == "true" || isSensitive == true) xisSensitive = true;
    else
        xisSensitive = false;

    if (isHtmlType == undefined || isHtmlType == "text" || isHtmlType == "true" || isHtmlType == "" || isHtmlType == true) xisHtml = "text";
    else
        xisHtml = isHtmlType;


    if (isSensitive == undefined || isSensitive == "true") isSensitive = true;


    if (colnum == undefined || colnum < 0) xcolnum = 0;
    else
        xcolnum = colnum;



    if (typeof tempID == "object") {
        obj = tempID;

    }
    else {
        tempID = nwTempTable_GetTableID(tempID);
        if (nwTempTable_CheckIfExist(tempID))
            obj = $("#" + tempID);
        else {
            obj = $("" + tempID);
        }
    }

    if (obj == undefined) return false;
    xcountRow = $(obj).find("tr").length;

    if (value == undefined) value = "undefined";

    var temp_str1 = value;
    var temp_str2 = "";

    // alert(value + " aag " + temp_str1);



    if (xisCol) {
        //if(xisnwGrid)xcolnum +=1; // add due questionale issue
        //alert(obj + " - " + xcurrentIndex + " - " + xcountRow); // aagedit

        // var xsobject = $(obj).find("tbody tr td:nth-child(" + (xcolnum + 1) + "):contains(" + temp_str1 + ")");
        var xsobject = $(obj).find("tbody tr td:nth-child(" + (xcolnum + 1) + "):textEquals(" + temp_str1 + ")");
        var xcounterX = xsobject.length;

        if (xisType == "1") {
            if (xcounterX >= 1)
                return true;
            else return false;
        }
        else if (xisType == "2") {

        }
        else if (xisType == "3") {
            if (xcounterX >= 1)
                return xcounterX;
            else return xcounterX;
        }


        for (var i = xcurrentIndex; i < xcountRow; i++) {
            if (xisHtml == "text") temp_str2 = $(obj).find("tbody tr:eq(" + i + ") td:eq(" + xcolnum + ")").text();
            else if (xisHtml == "html") temp_str2 = $(obj).find("tbody tr:eq(" + i + ") td:eq(" + xcolnum + ")").html();
            else if (xisHtml == "button") temp_str2 = $(obj).find("tbody tr:eq(" + i + ") td:eq(" + xcolnum + ") button").text();
            else if (xisHtml.toLowerCase() == "inputcheck") temp_str2 = "" + $(obj).find("tbody tr:eq(" + i + ") td:eq(" + xcolnum + ") input").prop("checked");
            else if (xisHtml.toLowerCase() == "input") temp_str2 = "" + $(obj).find("tbody tr:eq(" + i + ") td:eq(" + xcolnum + ") input").val();
            else if (xisHtml.toLowerCase() == "textarea") temp_str2 = "" + $(obj).find("tbody tr:eq(" + i + ") td:eq(" + xcolnum + ") textarea").val();
            else if (xisHtml.toLowerCase() == "select") temp_str2 = "" + $(obj).find("tbody tr:eq(" + i + ") td:eq(" + xcolnum + ") select").val();

            xisValidData = false;
            try {
                xisValidData = func_AAGen_CompareString(temp_str2, temp_str1, xisSensitive);
            } catch (err) { }
            //alert(temp_str2 + " vs " + temp_str1 + " = " + xisValidData);



            if (xisValidData) {
                xresult = true;
                xindex = i;
                if (xisType == "3") xcounter += 1;
                else if (xisType == "4") {
                    xcounter += 1;
                    $(obj).find("tbody tr:eq(" + i + ")").addClass("nwAAGDelete");
                }
                else break;
            }
        }
    }
    else {

        xcountRow = $(obj).find("tbody tr:eq(" + colnum + ") td").length;

        //alert(xcountRow);
        for (var i = xcurrentIndex; i < xcountRow; i++) {
            if (xisHtml == "text") temp_str2 = $(obj).find("tbody tr:eq(" + xcolnum + ") td:eq(" + i + ")").text();
            else if (xisHtml == "html") temp_str2 = $(obj).find("tbody tr:eq(" + xcolnum + ") td:eq(" + i + ")").html();
            else if (xisHtml == "button") temp_str2 = $(obj).find("tbody tr:eq(" + xcolnum + ") td:eq(" + i + ") button").text();
            else if (xisHtml.toLowerCase() == "inputcheck") temp_str2 = "" + $(obj).find("tbody tr:eq(" + xcolnum + ") td:eq(" + i + ") input").prop("checked");
            else if (xisHtml.toLowerCase() == "input") temp_str2 = "" + $(obj).find("tbody tr:eq(" + xcolnum + ") td:eq(" + i + ") input").val();
            else if (xisHtml.toLowerCase() == "textarea") temp_str2 = "" + $(obj).find("tbody tr:eq(" + xcolnum + ") td:eq(" + i + ") textarea").val();
            else if (xisHtml.toLowerCase() == "select") temp_str2 = "" + $(obj).find("tbody tr:eq(" + xcolnum + ") td:eq(" + i + ") select").val();

            //if (xisSensitive) temp_str2 = temp_str2.toLowerCase();
            //alert(temp_str2 + " vs " + temp_str1 + " = " + xisValidData);

            xisValidData = false;
            try {
                xisValidData = func_AAGen_CompareString(temp_str2, temp_str1, xisSensitive);
            } catch (err) { }


            if (xisValidData) {
                xresult = true; xindex = i;
                if (xisType == "3") xcounter += 1;
                else if (xisType == "4") {
                    xcounter += 1;
                    $(obj).find("tbody tr:eq(" + i + ")").addClass("nwAAGDelete");

                }
                else break;
            }
        }
    }



    if (xisType == "1")
        return xresult;
    else if (xisType == "2")
        return xindex;
    else if (xisType == "3")
        return xcounter;
    else if (xisType == "4") {
        $(".nwAAGDelete").remove();
        return xcounter;
    } else
        return xresult;
}


$.expr[':'].textEquals = $.expr.createPseudo(function (arg) {
    return function (elem) {
        return $(elem).text().match("^" + arg + "$");
    };
});



function func_AAGen_CompareString(varStr, varStr2, isSensitive, varStrCheck) //varStr2 = %nwstring check if 2 string is equal or search
{

    var isValid = false;
    var xvarStr1 = "";
    var xvarStr2 = "";
    var xisSensitive = true;
    var xvarStrCheck = "%nwstring";
    var isSelection = false;

    try {
        xvarStr1 = varStr;
    }
    catch (err) { }
    try { xvarStr2 = varStr2; }
    catch (err) { }
    try {
        if (xisSensitive == false) isSensitive = false;
        else {
            if (varStrCheck != undefined)
                xvarStrCheck = varStrCheck.toLowerString();
        }
    }
    catch (err) { }
    try {
        if (varStrCheck != undefined)
            xvarStrCheck = varStrCheck.toLowerString();
    }
    catch (err) { }

    if (xisSensitive == undefined) xisSensitive = false;

    var xindexSelection = -1;
    var xindexSelectionStr = -1;
    var tempstr = xvarStr2.toLowerCase();

    if (xisSensitive == false) {
        xvarStr1 = xvarStr1.toLowerCase();
        xvarStr2 = xvarStr2.toLowerCase();
    }

    tempstr = tempstr.replace(" ", "");
    xindexSelection = tempstr.indexOf(xvarStrCheck + "");



    if (xindexSelection == 0) {  // '%nwstringSTRING'
        var xlength = 0; var xlengthStr = 0;
        var xtempstr1 = xvarStr1;

        tempstr = xvarStr2;
        tempstr = tempstr.replace(xvarStrCheck, "");
        xlength = tempstr.length;
        xlengthStr = xtempstr1.length;

        xindexSelectionStr = xvarStr1.indexOf(tempstr);
        if (xindexSelectionStr >= 0) {

            xlength = xlengthStr - parseInt(xlength);
            xtempstr1 = xtempstr1.substring(xlength, xlengthStr);

            if (xtempstr1 == tempstr)
                isValid = true;
        }

    }
    else if (xindexSelection >= 1) {   // 'STRING%nwstring'
        var xlength = 0; var xlengthStr = 0;
        var xtempstr1 = xvarStr1;

        tempstr = xvarStr2;

        tempstr = xvarStr2;
        tempstr = tempstr.replace(xvarStrCheck, "");
        xlength = tempstr.length;

        xindexSelection = xtempstr1.indexOf(tempstr);
        xlengthStr = xtempstr1.length;
        xtempstr1 = xtempstr1.replace(" ", "");
        xtempstr1 = xtempstr1.substring(0, xlength);

        if (xtempstr1 == tempstr)
            isValid = true;

    }
    else {



        if (xvarStr1 == xvarStr2)
            isValid = true;

        //  alert(xvarStr1 + " " + xvarStr2 + " " + isValid);
    }

    return isValid;
}



/////////////// end temptable lib

///////////////////////////////
/// Sec
///// dissable right click
$(function () {

    var tenth = ''; function ninth() {
        if (document.all) {
            (tenth);
            //    alert("Right Click Disable");
            return false;
        }
    }
    function twelfth(e) {
        if (document.layers || (document.getElementById && !document.all)) {
            if (e.which == 2 || e.which == 3) { (tenth); return false; }
        }
    }
    if (document.layers) { document.captureEvents(Event.MOUSEDOWN); document.onmousedown = twelfth; }
    else { document.onmouseup = twelfth; document.oncontextmenu = ninth; }

    //document.oncontextmenu=new Function('alert("Right Click Disable"); return false')
    try {
        if (!nwDevMode) document.oncontextmenu = new Function(' return false;');
    } catch (err) { }
    //document.oncontextmenu = new Function('rightClicks(this); return false;'); 

    //document.oncontextmenu= new function('rightClicks();return false');

    function disableselect(e) {
        return false
    }
    function reEnable() {
        return true
    }
    //function chechHighlited() { return true;}
    //if IE4+
    try {
        setTimeout(function () {
            document.onselectstart = new Function("function chechHighlited() { return true;} chechHighlited();");
        }, 100);

    } catch (err) { }
    //if NS6



    if (typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function () {
            return this.replace(/^\s+|\s+$/g, '');
        }
    }

});

$(document).keydown(function (e) {
    if (!nwDevMode) {
        if (e.which === 123) {
            return false;
        }
    }
});


var xpageTimerProg = 0;
var checkStatus;
var xsecfailed = false;
//var element = new Image();
var element = document.createElement('any');


element.__defineGetter__('id', function () {
    checkStatus = 'on';
});


setTimeout(function () {
    element = document.createElement('any');
    element.__defineGetter__('id', function () {
        checkStatus = 'on';
    });
}, 500);

var SessionLoaderCounter = 0;

//nwsecurity
$(function () {

    checkStatus = 'off';
    setInterval(function () {

        // checkStatus = 'off';

        if (SessionLoaderCounter >= 90 && nwisServerSideMenu) // renew Session every 1 minute 30 sec
        {
            var nwinstanceList = "";
            xcounter = $(".nwGrid").length;
            for (var i = 0; i < xcounter; i++) {
                if ($(".nwGrid:eq(" + i + ")").attr("nwinstance") != undefined)
                    nwinstanceList += "|" + $(".nwGrid:eq(" + i + ")").attr("nwinstance") + "|";
            }
            nwParameter_AddResource("nwinstanceList", nwinstanceList);
            nwParameter_AddResource("nwaagSessionID", baseSessionID);
            var standardCrLnk = crSTDLnk;
            func_ActionDriven("actRenewSources", false, standardCrLnk, "nwdontclearparams");
            SessionLoaderCounter = 0;
        }
        SessionLoaderCounter += 1;

        if (SessionLoaderCounter % 2 == 0) {
            nwSecCheckFile();
        }

        try {
            fn_GetSecure();
            if (!nwDevMode) console.log(element);

            for (var i = 0; i < $("script").length; i++) {
                if ($("script:eq(" + i + ")").parent().prop("tagName").toUpperCase() == "HTML") {
                    $("script:eq(" + i + ")").addClass("p8removescript");

                }
            }

            try {
                var xremarks = "";
                for (var i = 0; i < $("script.p8removescript").length; i++) {
                    xremarks += "-------------Start-----------------<br>";
                    xremarks += $("script.p8removescript:eq(" + i + ")").html() + "<br>";
                    xremarks += "-------------END-------------------<br>";
                }
                if ($("script.p8removescript").length >= 1) {
                    func_AAGChecker("7779", xremarks);
                }
            } catch (err) { }



            if ((checkStatus == 'on') && !nwDevMode) {
                // console.clear();
                nwClearing();

                try {
                    if (getParameterByName('a2z4i7e') != 'silver')
                        //func_AAGChecker(_zoomsizevalue+"=="+$(window).width());
                        func_AAGChecker("6903");
                }
                catch (err) { }

            }

            if (!nwDevMode) {

                try {







                    // if (nwsec)
                    if (xsecfailed == true) func_AAGChecker("6905");
                    if (isConsoleOpen() && nwaagDebugNum <= 2) {
                        func_AAGChecker("6905");
                        xsecfailed = true;
                        nwaagDebugNum++;
                    }
                    try {

                        if (window.console && (window.console.firebug || window.console.exception.name == "bound ")) {
                            // At this point, Firebug is enabled
                            // if (window.console.exception.name == "bound ")
                            console.log(window.console.exception.name);
                            func_AAGChecker("6906");
                            xsecfailed = true;
                        }
                    }
                    catch (err) {
                    }

                } catch (err) { }
                //  if (window.console.debug.toSource()) { alert("aaa"); }

                // console.log('is DevTools open?', window.devtools.open);
                //  console.log('is DevTools open?', window.detail.open);
                // window.detail.open = false;

                //console.log(checkStatus);
                //if (nwBrowser == 'Firefox' && nwInterfaceMode==false)
                //  func_AAGChecker("6905");
                // console.clear();
                // alert(devtools.);
                //  console.clear();
                nwClearing();
            }

        } catch (err) { }

    }, 1000);

});

//if (!"console" in window || typeof console == "undefined") {
//    var methods = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];
//    var emptyFn = function() { };
//    window.console = {};
//    for (var i = 0; i < methods.length; ++i) {
//        window.console[methods[i]] = emptyFn;
//    }
//}

var nwaagstartTime;
var nwaagendTime;
var nwaagDebugNum = 0;
var nwaagIsClosing = false;
$(function () {
    //
    var funcname = func_nwRandomString(30);
    $('body').append('<script>function az' + funcname + 'ie() { debugger; return true; }</script>');

    if (nwBrowser == "Firefox")
        $('body').append('<script>function isConsoleOpen() { if(nwDevCrushed){return false;} const startTime = new Date();nwaagstartTime=startTime; try{debugger;}catch(err){} var endTime = new Date(); nwaagendTime=endTime; return new Date() - startTime > 150; }</script>');
    else
        $('body').append('<script>function isConsoleOpen() { if(nwDevCrushed){return false;} const startTime = new Date();nwaagstartTime=startTime;  try{ debugger ;}catch(err){}  var endTime = new Date(); nwaagendTime=endTime; return new Date() - startTime > 150; }</script>');

    //if(nwBrowser != "Chrome")

    $('body').append('<script>function nwClearing(){}</script>'); //console.clear();

    // $('body').append('<script async>setInterval(function() { if((nwaagendTime - nwaagstartTime > 150) || nwaagendTime ==undefined) func_AAGChecker("6905"); }, 2000);</script>');

});

//$(function() {
//    $(window).resize(function() {
//        if (isConsoleOpen()) {
//            func_AAGChecker("6905");
//        }
//    });
//});



//window.addEventListener('devtoolschange', function(e) {
//if (!nwDevMode) func_AAGChecker("6099");
//});
//window.addEventListener('devtoolsopen', function(e) {
//    if (!nwDevMode) func_AAGChecker("6099");
//});
//window.addEventListener('devtoolsonload', function(e) {
//    if (!nwDevMode) func_AAGChecker("6099");
//});

function func_SecCheckMenu(varP, varD, varU) {
    if (top.location == self.location) {
        if (varP != true && varU != true) {
            func_AAGChecker("8001", "Access is not allowed.<br><br>" + self.location);
        }
        else if (varP == true) {
            func_AAGChecker("8002", "Access is not allowed.(invalid credentials)<br><br>" + self.location);
        }
        if (varU == false) {
            func_AAGChecker("8003", "Access is not allowed.(invalid user)<br><br>" + self.location);
        }
    }

    //if (varU == false) {
    //    func_AAGChecker("8003", "Access is not allowed.(invalid user)<br><br>" + self.location);
    //}

}






function fn_GetSecure() {

    if (_zoomsizevalue != $(window).width() || xpageTimerProg) {
        xpageTimerProg = 1; _zoomsizevalue = $(window).width();
    }
    else if (_zoomsizevalue == $(window).width()) {
        var _zoomsizevalueDateX = new Date();
        // alert(nwDateDiff(_zoomsizevalueDateX,_zoomsizevalueDate,"dd:hh:mm:ss:fff") );
        //if( nwDateDiff(_zoomsizevalueDateX,_zoomsizevalueDate) >=  )
        //    xpageTimerProg=0;
        // window.location = window.location +"#";    
        xpageTimerProg = 0;
    }
    if (_zoomCounter >= 1000) _zoomCounter = 1;
    _zoomCounter = _zoomCounter + 1;
    return "_zoomsizevalue:" + _zoomsizevalue + ";" +
            "$(window).width() " + $(window).width() + ";" +
            "xpageTimerProg:" + xpageTimerProg + ";"
    ;
}

//supported 
/*
Chrome DevTools
Safari DevTools
Firefox DevTools
Firebug
Firebug Lite
*/
(function () {
    'use strict';
    var devtools = {
        open: false,
        orientation: null
    };
    var threshold = 160;
    var emitEvent = function (state, orientation) {
        try {
            window.dispatchEvent(new CustomEvent('devtoolschange',
        {
            detail: {
                open: state,
                orientation: orientation
            }
        }));
        } catch (err) {
        }
    };

    setInterval(function () {
        if (xpageTimerProg == 0) return;

        var widthThreshold = window.outerWidth - window.innerWidth > threshold;
        var heightThreshold = window.outerHeight - window.innerHeight > threshold;
        var orientation = widthThreshold ? 'vertical' : 'horizontal';

        if ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) ||
                 widthThreshold || heightThreshold) {
            if (!devtools.open || devtools.orientation !== orientation) {
                emitEvent(true, orientation);
            }

            devtools.open = true;
            devtools.orientation = orientation;
        } else {
            if (devtools.open) {
                emitEvent(false, null);
            }

            devtools.open = false;
            devtools.orientation = null;
        }
    }, 1000);

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = devtools;
    } else {
        window.devtools = devtools;
    }
})();


//console.log('is DevTools open?', window.devtools.open);
if (window.devtools.open && !nwDevMode)
    if (getParameterByName('a2z4i7e') != 'silver') func_AAGChecker("6988");
// check it's orientation, null if not open
//console.log('and DevTools orientation?', window.devtools.orientation);

// get notified when it's opened/closed or orientation changes
window.addEventListener('devtoolschange', function (e) {
    // console.log('is DevTools open?', e.detail.open);
    //|| e.devtools.open
    if ((e.detail.open == true) && !nwDevMode)
        if (getParameterByName('a2z4i7e') != 'silver' && nwSec == false) func_AAGChecker("6996");
    // console.log('and DevTools orientation?', e.detail.orientation);
});


function func_AAGChecker(stradd, otherString) {
    var isContinue = true;

    //return true;

    //stradd = ""; // stradd+= fn_GetSecure();
    if (otherString == undefined) otherString = "";
    try {
        isContinue = func_CustomPageHacking();
    }
    catch (err) { }


    if (xpageTimerProg == 1 && nwBrowser != 'Firefox') {
        isContinue = false;
        xpageTimerProg = 0;
    }



    if (isContinue) {




        if (stradd == undefined) stradd = "";

        if ("7777" == stradd)
            $("body").html("<div id='xaggpromptus8dataremove' style='text-align:center;font-family:Tahoma ,Verdana; font-size:16px;'>Some Issue encountered to your computer/device.<b></b> Reason:<b>(3rd Party Conflicts,Addins,Device infected by Virus,Untrusted Malware,Injection,Hacking)</b></div><br> <div style='text-align:center'>Kindly turn off/disabled Addins/Plugin (if any) to access this application. Thank you.<br>this page will be redirected</div>Code:" + stradd + "; " + otherString);
        else if ("7778" == stradd)
            $("body").html("<div id='xaggpromptus8dataremove' style='text-align:center;font-family:Tahoma ,Verdana; font-size:16px;'>Some Issue encountered to your computer/device.<b></b> Reason:<b>(Browser not Supported)</b></div><br> <div style='text-align:center'>this page will be redirected</div>Code:" + stradd + "; " + otherString);
        else if ("7779" == stradd)
            $("body").html("<div id='xaggpromptus8dataremove' style='text-align:center;font-family:Tahoma ,Verdana; font-size:16px;'>Some Issue encountered to your computer/device.<b></b> Reason:<b>(3rd Party Conflicts,Addins,Device infected by Virus,Untrusted Malware,Injection,Hacking)</b></div><br> <div style='text-align:center'>Kindly turn off/disabled Addins/Plugin (if any) to access this application. Thank you.<br>this page will be redirected</div>Code:" + stradd + "; " + otherString);

        else
            $("body").html("<div id='xaggpromptus8dataremove' style='text-align:center;font-family:Tahoma ,Verdana; font-size:16px;'>Viewing <b>(inspect)element</b> are <b>NOT PERMITTED!</b></div><br> <div style='text-align:center'>this page will be redirected</div>Code:" + stradd + "; " + otherString);


        if (nwDevCrushed == false)
            p8report(stradd, otherString);

        nwaagIsClosing = true;
        nwDevCrushed = true;
        setTimeout(function () {
            nwDevCrushed = false;
        }, 2000);

        try {
            // unload all resources
            cleanup();
        } catch (err) { }


        try {
            $("head").html("");
        } catch (err) { }
        try { console.clear(); } catch (err) { }

        $("script").remove();
        $("style").remove();

        setTimeout(function () {
            top.location = "pagenotfound.html";
        }, 2000);
    }
}

function p8report(stradd, otherString) {
    try {
        nwParameter_AddResource("errorCode", stradd);
        nwParameter_AddResource("errorScript", otherString);
        nwParameter_AddResource("errorURL", window.location.href);
        nwParameter_AddResource("baseSessionID", baseSessionID);


        func_ActionDriven("actErrorLogs", false, crSTDLnk, "nwdontclearparams");
    } catch (err) { }
}


var foo = 'bar';
var cleanup = function () {
    delete window.foo;
    delete window.cleanup;
};





$(function () {
    try {
        $(".tblGridHeader th").resizable();
    } catch (err) { }

});


function nwGrid_makeResize(varID) {
    setTimeout(function () { nwGrid_makeResizeF(varID); }, 5);
}
function nwGrid_makeResizeF(varID) {

    $(function () {
        var xgridindex = 0;
        var xgridContainer;
        var xgridtempwidth = "";
        var xgridtempwidthAdd = "";
        var xgridtempwidthvalue = 0;
        var xgridcurrentHolder = "e";
        var xgridisGroup = false;
        var xgridHeaderHide = false;

        $(".nwGrid tr th").resizable({
            stop: function (event, ui) {
                // alert($(xgridContainer).attr("id"));

                if (xgridHeaderHide == true) {
                    return false;
                }

                // alert($(xgridContainer).find("table.tblGridHeader col:eq(" + xindex + ")").attr("style") );
                $(xgridContainer).find(".nwgrid_columnheaderGroup").insertAfter($(xgridContainer).find(".gvHeaderStyle"));
                xgridisGroup = false;

                var xcolSpan = $(this).attr("colspan");
                var xnwcolnum = $(this).attr("nwcolnum");
                var trIndex = $(this).index();
                // $(xgridContainer).find(".tblGridHeader tr:eq(1) th:eq()")
                if (xcolSpan > 1) {
                    xgridisGroup = true;
                }


                var xstyleTemp = $(xgridContainer).find("table.tblGridHeader col:eq(" + xindex + ")").attr("style");
                $(xgridContainer).find("table.tblGridHeader col:eq(" + xindex + ")").attr("style", "");
                $(xgridContainer).find(".tblGrid_Panel1 .tblGridBody col:eq(" + xindex + ")").attr("style", "");

                xgridtempwidth = $(this).css("width");



                xgridindex = $(xgridContainer).find(".tblGridHeader tr").find(this).index();

                //xgridtempwidth = $(this).outerWidth();
                //alert(xgridindex + " - " + xgridtempwidth);

                var xstyle = $(this).attr("style");
                var xstyleArray = xstyle.split(";");
                for (var i = 0; i < xstyleArray.length; i++) {

                    if (xstyleArray[i].indexOf("width") >= 0) {
                        var tempstrArray = xstyleArray[i].split(":");
                        xgridtempwidth = tempstrArray[1].replace(" ", "");
                        break;
                    }
                }

                //if (parseFloat(xgridtempwidth.replace("px").replace(" ", "")) <= 10) {
                //    xgridtempwidth = "0px";
                //    $(this).css("width", xgridtempwidth);
                //}


                //  alert(trIndex + " - " + xcolSpan);
                //alert(xstyle);
                // $("#Her").text("idnex:" +xgridindex + " : "+  xgridtempwidth);
                xgridtempwidthvalue = parseFloat(xgridtempwidth.replace("px").replace(" ", ""));
                var xbackground = $(xgridContainer).find("table.tblGridHeader col:eq(" + xindex + ")").css("background-color");

                if (xbackground == undefined || xbackground == "" || xbackground.replace(/ /g, "") == "rgba(0,0,0,0)")
                    xbackground = "#FFFFFF";


                if (xgridisGroup == false) {

                    xgridtempwidthAdd = (xgridtempwidthvalue) + "px";
                    $(xgridContainer).find("table.tblGridHeader col:eq(" + xindex + ")").attr("style", "min-width:" + xgridtempwidth + ";max-width:" + xgridtempwidth + ";width:" + xgridtempwidth);
                    $(xgridContainer).find(".tblGrid_Panel1 .tblGridBody col:eq(" + xindex + ")").attr("style", "max-width:" + xgridtempwidthAdd + ";width:" + xgridtempwidthAdd + ";background-color:" + xbackground);
                    $(xgridContainer).find(".tblGrid_Panel1 .tblGridBody tr.nwGridFreezeRow td:eq(" + xindex + "):not(.nwGridMergeTD)").attr("style", "max-width:" + xgridtempwidthAdd + ";width:" + xgridtempwidthAdd + ";background-color:" + xbackground);

                    //min-width:" + xgridtempwidthAdd + ";
                    //min-width:" + xgridtempwidthAdd + ";

                    try {
                        xgridtempwidth = $(this).css("width");
                        //xgridtempwidthAdd =xgridtempwidth;alert(xgridtempwidthAdd + " - " + xgridindex);
                        var xcountx = $(xgridContainer).find("tr.nwGridFreezeRow").length;
                        var xcounterPLeft = 0; var xcounterPRight = 0;
                        var xWidthx = 0;
                        for (var i = 0; i < xcountx; i++) {
                            if (i == 0) {
                                xcounterPRight = $(xgridContainer).find("tr.nwGridFreezeRow:eq(" + i + ") td:eq(" + (xgridindex) + ")").css("padding-right").replace("px", "");
                                xcounterPLeft = $(xgridContainer).find("tr.nwGridFreezeRow:eq(" + i + ") td:eq(" + (xgridindex) + ")").css("padding-left").replace("px", "");
                                xWidthx = parseFloat(xgridtempwidth.replace("px", "")) - (parseFloat(xcounterPRight) + parseFloat(xcounterPLeft));

                                xgridtempwidth = (xWidthx + 0.5) + "px"; // old value 2
                                xgridtempwidthAdd = xgridtempwidth;
                            }

                            xbackground = "inherit";
                            $(xgridContainer).find("tr.nwGridFreezeRow:eq(" + i + ") td:eq(" + (xgridindex) + "):not(.nwGridMergeTD)").attr("style", "min-width:" + xgridtempwidthAdd + " !important;max-width:" + xgridtempwidthAdd + " !important;width:" + xgridtempwidthAdd + " !important;" + ";background-color:" + xbackground);
                        }
                        // alert($(xgridContainer).find(" tr.nwGridFreezeRow td:eq(" + (xgridindex) + ")").html());
                    } catch (err) { alert(err); }
                }
                else {
                    // trIndex xcolSpan
                    //nwcolnum
                    var preTotal = 0; curTotal = 0;
                    var xcount = 0;
                    try { xcount = parseInt(xnwcolnum); } catch (err) { }
                    try { curTotal = parseFloat(xgridtempwidthvalue); } catch (err) { }

                    var xindexR = 0;
                    try { xindexR = parseInt(trIndex); } catch (err) { }

                    var colPerc = 0.0;

                    var colW = 0.0;

                    for (var i = 0; i < xcount; i++) {
                        if ($(xgridContainer).find("table.tblGridHeader tr:eq(1) th:eq(" + (xindexR + i) + ")").css("display") != "none") {
                            preTotal += $(xgridContainer).find("table.tblGridHeader tr:eq(1) th:eq(" + (xindexR + i) + ")").css("width").replace(" ", "").replace("px", "");
                        }
                    }

                    colPerc = curTotal / preTotal;

                    //alert(colPerc + " = " + curTotal + " / " + preTotal + ";" + xcount);

                    for (var i = 0; i < xcount; i++) {
                        if ($(xgridContainer).find("table.tblGridHeader tr.gvHeaderStyle th:eq(" + (xindexR + i) + ")").css("display") != "none") {
                            if (i == 0) $(xgridContainer).find("table.tblGridHeader col:eq(" + (xindexR + i) + ")").attr("style", xstyleTemp);

                            preTotal = $(xgridContainer).find("table.tblGridHeader col:eq(" + (xindexR + i) + ")").css("width").replace(" ", "").replace("px", "");
                            // $(xgridContainer).find("table.tblGridHeader tr:eq(1) th:eq(" + (xindexR + i) +")").css("width",(colPerc * preTotal) +"px");
                            xgridtempwidth = ((colPerc * preTotal)) + "px";
                            //alert(preTotal + " * " + colPerc + " = " + xgridtempwidth);
                            xgridtempwidthAdd = xgridtempwidth;

                            $(xgridContainer).find("table.tblGridHeader col:eq(" + (xindexR + i) + ")").attr("style", "min-width:" + xgridtempwidth + ";max-width:" + xgridtempwidth + ";width:" + xgridtempwidth);
                            $(xgridContainer).find(".tblGrid_Panel1 .tblGridBody col:eq(" + (xindexR + i) + ")").attr("style", "max-width:" + xgridtempwidthAdd + ";width:" + xgridtempwidthAdd + ";background-color:" + xbackground);

                            $(xgridContainer).find(".tblGrid_Panel1 .tblGridBody tr.nwGridFreezeRow td:eq(" + (xindexR + i) + ")").attr("style", "max-width:" + xgridtempwidthAdd + ";width:" + xgridtempwidthAdd + ";background-color:" + xbackground);

                            //min-width:" + xgridtempwidthAdd + ";
                            //min-width:" + xgridtempwidthAdd + ";
                        }
                    }





                }

                var xwidth = $(xgridContainer).find("table.tblGridHeader").css("width");
                var ywidth = $(xgridContainer).find(".tblGrid_Panel1").css("width");

                //              ywidth = ywidth.replace("px","");
                //              
                //              (parseFloat(ywidth+4))+"px";

                $(xgridContainer).find(".tblGrid_Panel1").attr("style", $(xgridContainer).find(".tblGrid_Panel1").attr("style").replace(" ", "").replace("width:", ""));

                $(xgridContainer).find(".tblGrid_Panel1").css("width", xwidth);


                nwGrid_TableAdjust($(xgridContainer).attr("id"));

                //$(xgridContainer).find(".tblGrid_Panel1").css("padding-right","4px");
                $(xgridContainer).find(".gvHeaderStyle").insertAfter($(xgridContainer).find(".nwgrid_columnheaderGroup"));

                // .nwGridData .tblGrid_Panel1

                try {
                    var xid = $(xgridContainer).attr("id");
                    $(xgridContainer).find(".nwGridFreezeRow").removeClass("nwGridFreezeRow");
                    $(xgridContainer).find(".nwGridSplitter").remove();

                    var colfreeze = $(xgridContainer).attr("nwcolfreeze");
                    var rowfreeze = $(xgridContainer).attr("nwrowfreeze");
                    nwGrid_TableFreeze(xid, colfreeze, rowfreeze, false);

                    nwGrid_MergeResize(xid);
                    nwGrid_TableAutoHeight(xid);
                } catch (err) { }

                $(".ui-resizable-handle.ui-resizable-e").css("height", "");



                $(xgridContainer).attr("isresize", 1);
            }
        , start: function (event, ui) {
            $(".ui-resizable-handle.ui-resizable-e").css("height", "inherit");
            xgridContainer = $(this).parents("div.nwGrid");
            xindex = $(xgridContainer).find(".tblGridHeader tr").find(this).index();

            var objh = $(xgridContainer).find(".nwgrid_HeaderShowHide");
            var objText = $(objh).text();
            // click show header to resize the column
            if ($(objh).attr("buttonstatus") + "" == "false") {
                MessageBox("Click " + objText + " button then resize the column width.", objText);
                xgridHeaderHide = true;
                return false;
            }
            else {
                xgridHeaderHide = false;
            }




        },
            resize: function (event, ui) {


                // xgridtempwidth = $(this).css("width");
            }
            //,alsoResize: "#" +  $(this).parents("div.nwGrid").attr("id") +  ".tblGridBody tr td" 
        , handles: 'e'
        , ghost: true, helper: "ui-resizable-helper"
        });


        // $("body").prepend("<span id=\"Her\"></span>");



        $(".nwGrid .tblGridHeader th.nwgrid_startbox").resizable({
            stop: function (event, ui) {
                // var tempheight =  $(this).css("height","");

                $(xgridContainer).find("table.tblGridHeader th.nwgrid_columnheader").css("height", "");
                //  $(this).css("height",tempheight);

                $(xgridContainer).find("table.tblGridHeader col:eq(" + xindex + ")").attr("style", "");
                $(xgridContainer).find(".tblGrid_Panel1 .tblGridBody col:eq(" + xindex + ")").attr("style", "");

                xgridtempwidth = $(this).css("width");
                xgridtempwidthvalue = parseFloat(xgridtempwidth.replace("px").replace(" ", ""));
                xgridtempwidthAdd = (xgridtempwidthvalue) + "px";

                $(xgridContainer).find("table.tblGridHeader col:eq(" + xindex + ")").attr("style", "min-width:" + xgridtempwidth + ";max-width:" + xgridtempwidth + ";width:" + xgridtempwidth);
                $(xgridContainer).find(".tblGrid_Panel1 .tblGridBody col:eq(" + xindex + ")").attr("style", "min-width:" + xgridtempwidthAdd + ";max-width:" + xgridtempwidthAdd + ";width:" + xgridtempwidthAdd);

                var xwidth = $(xgridContainer).find("table.tblGridHeader").css("width");
                var ywidth = $(xgridContainer).find(".tblGrid_Panel1").css("width");
                //alert(ywidth);
                $(xgridContainer).find(".tblGrid_Panel1").attr("style", $(xgridContainer).find(".tblGrid_Panel1").attr("style").replace(" ", "").replace("width:", ""));


                $(xgridContainer).find(".tblGridBody  tr.nwGridFreezeRow td:nth-child(1)").css("width", (xgridtempwidthvalue - 7) + "px");
                $(xgridContainer).find(".tblGridBody  tr.nwGridFreezeRow td:nth-child(1)").css("max-width", (xgridtempwidthvalue - 7) + "px");
                $(xgridContainer).find(".tblGridBody  tr.nwGridFreezeRow td:nth-child(1)").css("min-width", (xgridtempwidthvalue - 7) + "px");



                // $(xgridContainer).find(".tblGrid_Panel1").css("width",xwidth);
                try { } catch (err) { }
                nwGrid_TableAdjust($(xgridContainer).attr("id"));

            }
        , start: function (event, ui) {

            xindex = $(this).index();
            xgridContainer = $(this).parents("div.nwGrid");

        },
            resize: function (event, ui) {

            }
        , alsoResize: "#" + $(this).parents("div.nwGrid").attr("id") + " tr th"
        , handles: 'e,s'
        , ghost: true, helper: "ui-resizable-helper"
        });





        $(".nwGrid tr td.nwGridRownum").resizable({
            stop: function (event, ui) {
                // alert($(xgridContainer).attr("id"));
                // alert($(xgridContainer).find("table.tblGridHeader col:eq(" + xindex + ")").attr("style") );
                //alert(this.text());

                try { } catch (err) { }
            }
            , start: function (event, ui) {
                xindex = $(this).index();
                xgridContainer = $(this).parents("div.nwGrid");
                //$(xgridContainer).find("table.tblGridHeader col:eq(" + xindex + ")").attr("style","");
                //$(xgridContainer).find(".tblGrid_Panel1 .tblGridBody col:eq(" + xindex + ")").attr("style","");


                // alert(xindex);
            },
            resize: function (event, ui) {

            }
            , alsoResize: "#" + $(this).parents("div.nwGrid").attr("id") + ".tblGridBody tr td"
            , handles: 's'
            , ghost: true, helper: "ui-resizable-helper"
        });


    });
    try {
        //$(".nwGrid tr th:eq(1)").resizable();
        $(".nwGrid tr th:eq(1)").trigger('resize');
    }
    catch (err) {

    }
}

$(function () {
    var isIe = (navigator.userAgent.toLowerCase().indexOf("msie") != -1
         || navigator.userAgent.toLowerCase().indexOf("trident") != -1);
    $(document).bind('copy', function (e) {
        // alert('copy behaviour detected!');

    });

    $(document).keydown(function (e) {
        if (e.keyCode == 67 && e.ctrlKey) {
            // alert('ctrl C');
            //if(isIe)
            //nwGrid_Copy(e);
            //copyToClipboardCrossbrowser("wewe");
        }
    });
    document.addEventListener('copy', function (e) {
        //nwGrid_Copy(e);



        return;

    });


    function nwGrid_Copy(e) {
        var textToPutOnClipboard = "";
        var textToPutOnClipboardHTML = "";
        // alert("aa");
        try {

            try {
                if (xnwGrid_currentSelectedToCopy != undefined && xnwGrid_currentSelectedToCopy != null) {
                    // textToPutOnClipboard = $(crnwTD).text() + "\t<b>" +  $(crnwTD).text()+"2</b>" + "\r\n" +  $(crnwTD).text() +"3";

                    var xTrminus = 0;
                    if ($(xnwGrid_currentSelectedToCopy).find("tr.nwGridFreezeRow").length >= 1)
                        xTrminus = 1;

                    var xcount = $(xnwGrid_currentSelectedToCopy).find("td.nwgridSelectedCells").length;
                    var xvarTR = crnwTR;
                    var xstart = xvarTR.index() - xTrminus;
                    var xcountTD = $(crnwTR).find("td.nwgridSelectedCells").length;
                    if (xcountTD == 0)
                        xcountTD = $(xnwGrid_currentSelectedToCopy).find("td.nwgridSelectedCells:eq(0)").parent().find("td.nwgridSelectedCells").length;

                    var xcountTR = xcount / xcountTD;

                    //alert(xcountTR + "  = " + xcount+ " / "+ xcountTD + "  : xstart :" + xstart);


                    if (xcountTD <= 0) return;

                    var strText = ""; var strRow = "";
                    textToPutOnClipboard = "";
                    for (var i = 0; i < xcountTR; i++) {
                        strRow = "";
                        if (textToPutOnClipboard != "") textToPutOnClipboard += "\r\n";
                        for (var i2 = 0; i2 < xcountTD; i2++) {
                            strText = $(xnwGrid_currentSelectedToCopy).find("tr:eq(" + (xstart + i) + ") td.nwgridSelectedCells:eq(" + i2 + ")").text();
                            if (strRow != "") strRow += "\t";
                            if (strText == undefined || strText == "") strText = " ";
                            strRow += strText;
                        }
                        textToPutOnClipboard += strRow;


                        strRow = "";
                        textToPutOnClipboardHTML += "<tr>";
                        for (var i2 = 0; i2 < xcountTD; i2++) {
                            var obj = $(xnwGrid_currentSelectedToCopy).find("tr:eq(" + (xstart + i) + ") td.nwgridSelectedCells:eq(" + i2 + ")");
                            strText = obj.text();
                            strRow += "<td style=\"background-color:" + obj.css("background-color") + ";color:" + obj.css("color") + ";font-weight:" + obj.css("font-weight") + ";font-size:" + obj.css("font-size") + ";font-family:" + obj.css("font-family") + ";font-style:" + obj.css("font-style") + ";text-align:" + obj.css("text-align") + ";";
                            strRow += "border-right-width:" + obj.css("border-right-width") + ";border-right-style:" + obj.css("border-right-style") + ";border-right-color:" + obj.css("border-right-color") + ";";
                            strRow += "border-left-width:" + obj.css("border-left-weight") + ";border-left-style:" + obj.css("border-left-style") + ";border-left-color:" + obj.css("border-left-color") + ";";
                            strRow += "border-top-width:" + obj.css("border-top-width") + ";border-top-style:" + obj.css("border-top-style") + ";border-top-color:" + obj.css("border-top-color") + ";";
                            strRow += "border-bottom-width:" + obj.css("border-bottom-width") + ";border-bottom-style:" + obj.css("border-bottom-style") + ";border-bottom-color:" + obj.css("border-bottom-color") + ";";

                            strRow += "padding:" + obj.css("padding") + ";";
                            strRow += "\">";
                            if (strText == undefined || strText == "") strText = " ";
                            strRow += strText;
                            strRow += "</td>";
                        }

                        textToPutOnClipboardHTML += strRow;
                        textToPutOnClipboardHTML += "</tr>";
                    }

                    textToPutOnClipboardHTML = "<table border=\"0\" style=\"border-width:0px;\">" + textToPutOnClipboardHTML + "</table>";

                }

            } catch (err) { }



            if (isIe) {

                window.clipboardData.setData('Text', textToPutOnClipboard);
                window.clipboardData.setData('text/html', textToPutOnClipboardHTML);
            } else {

                // e.clipboardData.setData('text/plain', textToPutOnClipboard);



                e.clipboardData.setData('text/plain', textToPutOnClipboard);
                e.clipboardData.setData('text/html', textToPutOnClipboardHTML);



            }


            e.preventDefault();

        }
        catch (err) {
            alert(err);
            try {
                //  copyToClipboard(textToPutOnClipboardHTML);
                copyToClipboardCrossbrowser(textToPutOnClipboard);
            }
            catch (err) {
            }
        }
    }




    function copyToClipboard(text) {
        copyToClipboardCrossbrowser(text);
        //window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
    }

    function copyToClipboardCrossbrowser(s) {
        //s = document.getElementById(s).value;               

        if (window.clipboardData && clipboardData.setData) {
            clipboardData.setData("Text", s);
        }
        else {


            window.prompt("Copy to clipboard: Ctrl+C, Enter", s);

        }
    }


    // document.addEventListener('paste', function (e) {

    //    var textToPutOnClipboard = "";
    //    var textToPutOnClipboardHTML = "";
    //    try{

    //    if (isIe) {
    //        textToPutOnClipboard = window.clipboardData.getData('Text');    
    //    } else {
    //        textToPutOnClipboard=e.clipboardData.getData('text/plain');
    //        textToPutOnClipboardHTML=e.clipboardData.getData('text/html');
    //    }
    //    }catch(err){}
    //    
    //    // alert("paste:" + textToPutOnClipboard);
    //    //$("#xdesx").val(textToPutOnClipboardHTML);
    //    e.preventDefault();
    //  });



});

function nwGrid_MaxRow(nwgridID, row) {
    var xnwgridID = "";
    try { xnwgridID = nwgridID + ""; }
    catch (err) { }
    xnwgridID = xnwgridID.replace("#", "");

    try {
        var xrowCount = $("#" + nwgridID + " div.tblGrid_Panel1 table.tblGridBody tr").length;
        var isRemove = false;

        if (row < xrowCount) isRemove = true;
        // row > row2 add ++
        // row < row2 diff --

        //alert(row+"-"+xrowCount + "="  +isRemove );
        if (isRemove == false) {
            nwGrid_AddRow(nwgridID, row - xrowCount);
        }
        else {
            nwGrid_RemoveRow(nwgridID, row, xrowCount);
        }
    }
    catch (err) { }

}



function nwGrid_MergeCellSingle(nwgridID, col, row, colSpan, rowSpan) {
    var xnwgridID = "";

    if (rowSpan <= 0) rowSpan = 1;
    if (colSpan <= 0) colSpan = 1;

    try { xnwgridID = nwgridID + ""; }
    catch (err) { }
    xnwgridID = xnwgridID.replace("#", "");

    var objGrid = $("#" + xnwgridID + " div.tblGrid_Panel1 table.tblGridBody tbody");

    if (rowSpan > 1)
        objGrid.find("tr:eq(" + row + ") td:eq(" + col + ")").attr("rowspan", rowSpan);

    objGrid.find("tr:eq(" + row + ") td:eq(" + col + ")").attr("colspan", colSpan);

    objGrid.find("tr:eq(" + row + ") td:eq(" + col + ")").addClass("nwGridMergeTD");

    try {
        nwGrid_MergeResize(xnwgridID);
    } catch (err) { }

    nwGrid_MergeCell_HideComponent(objGrid, row, col, Parser.ParseInt(col) + Parser.ParseInt(colSpan) - 1, Parser.ParseInt(row) + Parser.ParseInt(rowSpan));

}

function nwGrid_MergeResize(nwgridID, aminus) {
    if (aminus == undefined) aminus = 0;
    var xnwgridID = "";
    try { xnwgridID = nwgridID + ""; }
    catch (err) { }
    xnwgridID = xnwgridID.replace("#", "");
    var objGrid = $("#" + xnwgridID + " div.tblGrid_Panel1 table.tblGridBody tbody");
    var objGridHDR = $("#" + xnwgridID + " table.tblGridHeader thead");
    for (var i = 0; i < $(objGrid).find(".nwGridMergeTD").length; i++) {
        try {
            var cobject = $(objGrid).find(".nwGridMergeTD:eq(" + i + ")");
            var xindex = $(cobject).parents("tr").find(cobject).index();
            var hdrCol = $(objGridHDR).find('tr.gvHeaderStyle');
            var xcolspan = $(objGrid).find(".nwGridMergeTD:eq(" + i + ")").attr("colspan");
            var xrowspan = $(objGrid).find(".nwGridMergeTD:eq(" + i + ")").attr("rowspan");
            var xwidth = 0;
            for (var ix = 0; ix < parseInt(xcolspan) ; ix++) {
                //xwidth += $(hdrCol).find("th:eq("+ (xindex+ix) +")").innerWidth();
                xwidth += $(hdrCol).find("th:eq(" + (xindex + ix) + ")").outerWidth();
                // xwidth += $(hdrCol).find("th:eq("+ (xindex+ix) +")").width();
            }
            xwidth -= (5 - aminus);// + (xwidth * 0.0005);
            $(cobject).css("width", xwidth + "px");
            $(cobject).css("min-width", xwidth + "px");
            $(cobject).css("max-width", xwidth + "px");

            setTimeout(function () {
                $(cobject).css("width", xwidth + "px");
                $(cobject).css("min-width", xwidth + "px");
                $(cobject).css("max-width", xwidth + "px");
            }, 100);

        } catch (err) { }
    }


}


function nwGrid_MergeCell(nwgridID, col, colcount, col_settings) {

    // col_settings = eg.( "1,0,1,0" )  1= merge 0 = not   
    var xnwgridID = "";

    try { xnwgridID = nwgridID + ""; }
    catch (err) { }
    xnwgridID = xnwgridID.replace("#", "");
    if (xnwgridID == "") return;

    //alert(nwgridID);

    var objGrid = $("#" + xnwgridID + " div.tblGrid_Panel1 table.tblGridBody tbody");
    var objGridHeader = $("#" + xnwgridID + " div.nwGridDataSub table.tblGridHeader thead");
    var xcount = objGrid.find("tr").length;
    var xcountHeaderCol = objGridHeader.find("tr:last-child th").length - 1;




    //alert(objGrid.html() + " \n\n " + xcount);

    var strCR = "";
    var strPrev = "";

    var colCR = -1;
    var rowCR = -1;
    colCR = 1; rowCR = 0;
    var rowSpan = 0;
    var colSpan = 0;
    var startcol = 1;


    if (col != undefined) {
        try { startcol = parseInt(col); } catch (err) { }
    }

    if (colcount != undefined) {
        try {
            xcountHeaderCol = parseInt(colcount);
            if (parseInt(colcount) + startcol > xcountHeaderCol) {
                // xcountHeaderCol = xcountHeaderCol - startcol;
            }
        } catch (err) { }
    }

    //alert("startcol:"+startcol + " xcountHeaderCol:"+xcountHeaderCol);

    var xtempcolor = "";

    for (var icol = startcol; icol <= xcountHeaderCol; icol++) {
        colCR = icol;
        for (var i = 0; i < xcount; i++) {
            strTemp = objGrid.find("tr:eq(" + i + ") td:eq(" + colCR + ")").text();

            if (objGrid.find("tr:eq(" + i + ") td:eq(" + colCR + ")").hasClass("gridhide")) continue;

            if (i == 0) {
                strCR = strTemp;
            }
            rowCR = i;

            // if(strTemp.replace(/ /g,"" ) != "" || 1==1){

            nwGrid_MergeCell_CheckRow(objGrid, rowCR, colCR, strTemp, xcountHeaderCol, xcount);
            rowSpan = temp_nwgrid_MC_Row - rowCR; rowSpan += 1;
            colSpan = temp_nwgrid_MC_Col - colCR; colSpan += 1;
            if (rowSpan > 1) {
                if (col_settings == undefined || col_settings == "") {
                    objGrid.find("tr:eq(" + i + ") td:eq(" + colCR + ")").attr("rowspan", rowSpan);
                    if (!(colSpan == "0" || colSpan == 0)) objGrid.find("tr:eq(" + i + ") td:eq(" + colCR + ")").attr("colspan", colSpan);
                }
                xtempcolor = objGrid.find("tr:eq(" + i + ") td:eq(" + colCR + ")").css("background-color");
                objGrid.find("tr:eq(" + i + ") td:eq(" + colCR + ")").addClass("nwUnMerge");
                // alert (strTemp + " " + i + "," + colCR + "," + (colCR+colSpan-1) + ","+(i+rowSpan));
                nwGrid_MergeCell_HideComponent(objGrid, i, colCR, colCR + colSpan - 1, i + rowSpan, xtempcolor);
            }
            else if (rowSpan == 1) {
                //if(colSpan >=2) alert (strTemp + " " + i + "," + colCR + "," + (colCR+colSpan-1) + ","+(i+rowSpan));
                // objGrid.find("tr:eq(" + i+ ") td:eq(" + colCR+ ")").attr("rowspan",rowSpan);
                if (col_settings == undefined || col_settings == "") {
                    if (!(colSpan == "0" || colSpan == 0)) objGrid.find("tr:eq(" + i + ") td:eq(" + colCR + ")").attr("colspan", colSpan);
                }
                //objGrid.find("tr:eq(" + i+ ") td:eq(" + colCR+ ")").addClass("nwUnMerge");
                xtempcolor = objGrid.find("tr:eq(" + i + ") td:eq(" + colCR + ")").css("background-color");
                nwGrid_MergeCell_HideComponent(objGrid, i, colCR, colCR + colSpan - 1, i + rowSpan, xtempcolor);
            }

            // alert("row:" + rowCR + "col:" + colCR+ " @ " + temp_nwgrid_MC_Row);
            //objGrid,Rindex,Cindex,xText,xcountHeaderCol,xcount
            // }

        }

    }
}

function nwGrid_MergeCell_HideComponent(objGrid, Rindex, Cindex, xcountHeaderCol, xcount, xtempcolor) {
    var colCR = 0;
    if (xcountHeaderCol <= -1) xcountHeaderCol = Cindex;

    // alert(Rindex + " , " + Cindex + " , " + xcountHeaderCol + " , " + xcount);

    for (var icol = Cindex; icol <= xcountHeaderCol; icol++) {
        colCR = icol;
        for (var i = Rindex; i < xcount; i++) {
            if (!(i == Rindex && colCR == Cindex)) {

                if (i != Rindex && objGrid.find("tr:eq(" + (i - 1) + ") td:eq(" + colCR + ")").parent(".nwGridFreezeRow").html() != undefined) {
                    objGrid.find("tr:eq(" + (i - 1) + ") td:eq(" + colCR + ")").addClass("gridhide2");

                    continue;
                }


                objGrid.find("tr:eq(" + i + ") td:eq(" + colCR + ")").addClass("gridhide");
                if (!(i == Rindex)) objGrid.find("tr:eq(" + i + ") td:eq(" + colCR + ")").addClass("gridhideTR");
                objGrid.find("tr:eq(" + i + ") td:eq(" + colCR + ")").addClass("gridhide_" + Rindex + "_" + Cindex);
                objGrid.find("tr:eq(" + i + ") td:eq(" + colCR + ")").css("background-color", xtempcolor);

            }
            if (i == xcount - 1) objGrid.find("tr:eq(" + i + ") td:eq(" + colCR + ")").addClass("gridLast");
        }

    }
}

function nwGrid_ClearRange(nwgridID, Cindex, Rindex, colSpan, rowSpan) {
    var xnwgridID = "";
    try { xnwgridID = nwgridID + ""; }
    catch (err) { }
    xnwgridID = xnwgridID.replace("#", "");

    var objGrid = $("#" + xnwgridID + " div.tblGrid_Panel1 table.tblGridBody tbody");

    for (var i2 = Rindex; i2 < (Rindex + rowSpan) ; i2++) {
        try {
            var objectRow;
            objectRow = objGrid.find("tr:eq(" + i2 + ")");
            //if(objectRow == undefined)objectRow
            for (var i = Cindex; i < (Cindex + colSpan) ; i++) {
                try {
                    var objectCol;
                    if (objectRow.find("td:eq(" + i + ") div.nwCell").hasClass() == "nwCell") {
                        objectCol = objectRow.find("td:eq(" + i + ") div.nwCell");
                    } else {
                        objectCol = objectRow.find("td:eq(" + i + ")");
                    }

                    var strtemplate = nwGrid_GetObjectTempalte(xnwgridID, i);
                    objectCol.html(strtemplate);

                    objectCol.attr("colspan", "1");
                    objectCol.attr("rowspan", "1");
                    objectCol.removeClass("gridhide");
                }
                catch (err) { }
            }

        }
        catch (err) { }
    }
}

function nwGrid_GetObjectTempalte(xnwgridID, col) {
    var strtemplate = "";

    try {
        strtemplate = $('#' + xnwgridID + "").find("#nwGridRows tr td:eq(" + col + ")").html();
    }
    catch (err) { strtemplate = ""; }

    return strtemplate;
}

/*

angelo Angelo Angelo
angelo Angelo Angelo
carlo  Angelo Carlo
carlo  Carlo  Carlo
Gonzales      Gonzales      Gonzales

*/

var temp_nwgrid_MC_Col = -1;
var temp_nwgrid_MC_Row = -1;
function nwGrid_MergeCell_CheckCol(objGrid, Rindex, Cindex, xText, xcountHeaderCol, xcount) {
    try {
        var tempText = "";
        var xcolumnLimit = xcountHeaderCol;
        temp_nwgrid_MC_Col = -1;

        //    if(xText == "3818")
        //    {
        //        alert(Rindex + "," + Cindex+ "," +xText+ "," +xcountHeaderCol+ "," +xcount);
        //    }

        // alert(Rindex + " " + xcount);
        var isvalid = false;
        if (Rindex == xcount) {
            for (var ic = Cindex; ic <= xcolumnLimit; ic++) {

                tempText = objGrid.find("tr:eq(" + Rindex + ") td:eq(" + ic + ")").text();

                //  alert("DE: " + tempText + " = "+ xText);
                if (tempText != xText) {
                    temp_nwgrid_MC_Col = ic - 1;
                    temp_nwgrid_MC_Row = Rindex;
                    break;
                }
                else {
                    temp_nwgrid_MC_Col = ic - 1;
                }
                if (ic >= xcolumnLimit - 1) {
                    temp_nwgrid_MC_Col = ic;
                }
            }

        }
        else {
            for (var i = Rindex; i < xcount; i++) {

                for (var ic = Cindex; ic < xcolumnLimit; ic++) {
                    tempText = objGrid.find("tr:eq(" + i + ") td:eq(" + ic + ")").text();
                    if (tempText != xText) {
                        temp_nwgrid_MC_Row = i + 1;
                        temp_nwgrid_MC_Col = ic - 1;
                        break;
                    }
                }
            }
        }

    } catch (err) { }
}

function nwGrid_MergeCell_CheckRow(objGrid, Rindex, Cindex, xText, xcountHeaderCol, xcount) {
    try {
        var tempText = "";
        var isvalid = false;
        temp_nwgrid_MC_Row = Rindex;

        for (var i = Rindex + 1; i < xcount; i++) {
            tempText = objGrid.find("tr:eq(" + i + ") td:eq(" + Cindex + ")").text();
            isvalid = objGrid.find("tr:eq(" + i + ") td:eq(" + Cindex + ")").hasClass("gridhide");

            //  alert( tempText + " != " +xText);
            if (tempText != xText || isvalid) {
                break;
            }
            temp_nwgrid_MC_Row = i;

        }
        nwGrid_MergeCell_CheckCol(objGrid, Rindex, Cindex, xText, xcountHeaderCol, temp_nwgrid_MC_Row);
    } catch (err) { }
}

//$(window).resize(function() {


//});


//function 



//$(function(){
//alert("wew");
function temp_AAGTableCaller() {
    var verArray = [];
    var tablename = "tempGrid";
    var tablename2 = "temptable411";

    //tablename ="temptable";

    // verArray[0] ="2col:3";
    //verArray[0] ="0col:1";
    verArray[0] = "0col:*";
    verArray[1] = "0col:1";

    verArray[3] = "2col:3";
    verArray[4] = "2col:#";

    //verArray[2] ="2col:6";
    // verArray[3] ="0col:4";
    // verArray[4] ="1col:22";
    //verArray[5] ="1col:5";
    // verArray[4] =""; verArray[5] =""; 
    //verArray[6] ="1col:6";

    //alert(verArray);
    //var objectTemp = 
    nwTempTable_CreateFilteredTable(tablename, verArray, tablename2);

    var varstr = nwLib.nwTempTable_ConvertToString(tablename2, "@apa@", "#row#");
    // alert(varstr);
}



//});


//$(function(){  /// end functions
$('input').keypress(function (e) {
    if (e.which == 13) return false;
});

$(document).on("change", "input, textarea", function () {
    var valuexorig = $(this).val();
    var valuex = $(this).val();
    var xlist = ['onclick', 'ondblclick', 'onkeydown', 'onkeypress', 'onkeyup', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onblur', 'onchange', 'onselect', 'onfocus', 'href'];

    var isContains = false;
    valuex = valuex.replaceAll("&lt;", "<");
    valuex = valuex.replaceAll("&gt;", ">");
    valuex = valuex.replaceAll("&#058;", ":");

    valuex = valuex.replaceAll("&#60;", "<");
    valuex = valuex.replaceAll("&#x3C;", "<");

    valuex = valuex.replaceAll("&#62;", ">");
    valuex = valuex.replaceAll("&#x3E;", ">");


    var isSpaceOnly = false;
    if (valuex.trim() == "" && valuexorig != "") {
        isSpaceOnly = true;
    }



    valuex = valuex.replaceAll(" ", "");
    for (var i = 0; i < xlist.length; i++) {
        if (valuex.indexOf(xlist[i] + "=") >= 0) {
            isContains = true;
        }
    }
    var ishtml = false;

    try {
        //check mga tags
        ishtml = /<\/?[a-z][\s\S]*>/i.test(valuex);

        //if (valuex) {
        //    alert(valuex + "\n" + $(this).attr("id"));
        //}
    } catch (err) { }


    if (ishtml || valuex.toLowerCase().indexOf("<script") >= 0
        || valuex.toLowerCase().indexOf("<img") >= 0
        || valuex.toLowerCase().indexOf("<style") >= 0
        || valuex.toLowerCase().indexOf("<link") >= 0
        || valuex.toLowerCase().indexOf("<meta") >= 0

        || valuex.toLowerCase().indexOf("</script") >= 0
        || valuex.toLowerCase().indexOf("</img") >= 0
        || valuex.toLowerCase().indexOf("</style") >= 0
        || valuex.toLowerCase().indexOf("</link") >= 0
        || valuex.toLowerCase().indexOf("</meta") >= 0
        || isContains == true
        || isSpaceOnly == true
        || valuex.toLowerCase().indexOf("javascript:") >= 0
         ) {
        $(this).val("");
        ToastMessage("Invalid input", 3000, "bottom");
    }

    return true;
});
//});


function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}

function nwLoadPopup(nwID, nweLink, nwTitle, Width, Height) {
    LoadPopup(nwID, nweLink, nwTitle, Width, Height)
}
function LoadPopup(nwID, nweLink, nwTitle, Width, Height) {
    var slected_col = nwID;
    var temp_colname = nwTitle;
    var nwcLink = nweLink;
    var xerWidth = "800px";
    var xerHeight = "900px";
    var referrer = "";
    if (Width != undefined && Width != "") xerWidth = Width;
    if (Height != undefined && Height != "") xerHeight = Height;

    try {
        referrer = top.location.href;
        var yhash = top.location.hash;
        var yindex = referrer.indexOf(yhash);

        if (yindex >= 1)
            referrer = referrer.substring(0, yindex);



        top.location = referrer + "#XacKsLnk";

        var xhref = window.location.href;
        var xhash = window.location.hash;
        var xsearch = window.location.search;
        var fulllength = xhref;
        var xindex = xhref.indexOf(xhash);
        if (xindex <= 0) {
            xindex = xhref.length;
        }
        fulllength = xhref.substring(0, xindex);

        var linker = "";
        // referrer=fulllength;

        var xaddlink = "";
        if (nwcLink.indexOf("?") >= 0) {
            if (nwDevMode) xaddlink = "&nwdev=p8dev";
        }
        else {
            if (nwDevMode) xaddlink = "?nwdev=p8dev";
        }
        //alert(xaddlink);
        nwcLink = nwcLink + xaddlink;

        linker = temp_colname + "p8avt1p8avt" + slected_col + "p8avt" + nwcLink + "p8avt" + xerWidth + "p8avt" + xerHeight + "";
        linker = func_nwEncript(linker);
        //func_GetAbsoluteURL()
        top.location = referrer + "#acKsLnk" + linker;

    } catch (err) {
        var xaddlink = "";
        if (nwcLink.indexOf("?") >= 0) {
            if (nwDevMode) xaddlink = "&nwdev=p8dev";
        }
        else {
            if (nwDevMode) xaddlink = "?nwdev=p8dev";
        }
        nwcLink = nwcLink + xaddlink;
        var linker = "";
        linker = temp_colname + "p8avt1p8avt" + slected_col + "p8avt" + nwcLink + "p8avt" + xerWidth + "p8avt" + xerHeight + "";
        linker = func_nwEncript(linker);
        nwcLink = "#acKsLnk" + linker;
        //parent.func_LoadPopUpOnScreen(nwcLink);
        var isPerWidth = false;
        var isPerHeight = false;
        if (xerWidth.indexOf("%") >= 1) isPerWidth = true;
        if (xerHeight.indexOf("%") >= 1) isPerHeight = true;

        var acWidth = 900;
        var acHeight = 450;

        acWidth = parseFloat(xerWidth.replace("px", "").replace("%", ""));
        acHeight = parseFloat(xerHeight.replace("px", "").replace("%", ""));


        if (isPerWidth) {
            acWidth = screen.width * (acWidth / 100);
        }
        if (isPerHeight) {
            acHeight = screen.width * (acHeight / 100);
        }




        var finalLink = "";
        var referrer = document.referrer;
        referrer = referrer.toLowerCase();

        var indexx = referrer.indexOf("home.aspx");
        if (indexx < 2)
            indexx = referrer.indexOf("homepage.aspx");

        if (indexx >= 2) {
            finalLink = referrer.substring(0, indexx);
            finalLink = finalLink + "/popup.aspx?t=" + nwcLink;
        }
        else
            finalLink = nwcLink;


        var x = screen.width / 2 - (acWidth / 2);
        var y = screen.height / 2 - (acHeight / 2);

        window.open(finalLink, 'winname', "directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,scrollbars=no,resizable=no,width=" + acWidth + ",height=" + acHeight + ",left=" + x + ",top=" + y + "");

    }
}



function nwReLoadBadge(nwmenuID) {
    try {
        var slected_col = nwmenuID;
        var referrer = "";

        referrer = top.location.href;
        var yhash = top.location.hash;
        var yindex = referrer.indexOf(yhash);

        if (yindex >= 1)
            referrer = referrer.substring(0, yindex);

        top.location = referrer + "#XacKsBdg";

        var xhref = window.location.href;
        var xhash = window.location.hash;
        var xsearch = window.location.search;
        var fulllength = xhref;
        var xindex = xhref.indexOf(xhash);
        if (xindex <= 0) {
            xindex = xhref.length;
        }
        fulllength = xhref.substring(0, xindex);

        var linker = "";

        linker = nwmenuID;
        linker = "" + func_nwEncript(linker) + "";
        //func_GetAbsoluteURL()
        top.location = referrer + "#acKsBdg" + linker;
    } catch (err) { }
}



function func_ExportToExcel(GridInstance, gridtype) {
    var isvalid = true;
    try {
        if (p8Spread_JSExport == true) {
            var book = p8Spread_Book(GridInstance);
            var filename = $("#" + GridInstance).attr("p8title");
            isvalid = false;
            p8Spread_Export(book, filename);
            return false;
        }
    } catch (err) { }
    try {
        if (isvalid == false) return;
        var xGridInstance = "";
        if (gridtype == "spread") {
            xGridInstance = GridInstance;
        }
        else
            xGridInstance = $("#" + GridInstance.replace("#", "")).find(".tblGridBody").parents(".nwGrid").attr("nwinstance");

        var xlink = crExportLnk;
        var win = window.open(xlink + '?SessionID=' + xGridInstance + "&extpye=excel");
    } catch (err) { }
}
function func_ExportToCSV(GridInstance, gridtype) {
    try {
        if (p8Spread_JSExport == true) {
            var book = p8Spread_Book(GridInstance);
            var filename = $("#" + GridInstance).attr("p8title");
            p8Spread_ExportCSV(book, filename);
            return false;
        }
    } catch (err) { }
    try {
        var xGridInstance = "";
        if (gridtype == "spread") {
            xGridInstance = GridInstance;
        }
        else
            xGridInstance = $("#" + GridInstance.replace("#", "")).find(".tblGridBody").parents(".nwGrid").attr("nwinstance");
        var xlink = crExportLnk;
        var win = window.open(xlink + '?SessionID=' + xGridInstance + "&extpye=csv");
    } catch (err) { }
}
function func_ExportToPrint(GridInstance, gridtype) {
    var filename = $("#" + GridInstance).attr("p8title");
    try {
        if (p8Spread_JSPrint == true) {
            nwLoading_Start("SpreadPrint", crLoadingHTML);
            setTimeout(function () {
                var book = p8Spread_Book(GridInstance);
                p8Spread_Print(book, filename);
                nwLoading_End("SpreadPrint");
            }, 100);
        }
    } catch (err) { }
}



function func_ExporttoPrint(xlink, xparameters) {
    if (xparameters == undefined || xparameters == "undefined")
        xparameters = "";
    if (xlink == undefined) xlink = crExportLnk;
    var win = window.open(xlink + '?SessionID=' + ExportSessionID + "&extpye=print" + SplitParameters(xparameters));

    if (win) {
        //Browser has allowed it to be opened
        // win.focus();
    } else {
        //Broswer has blocked it
        MessageBox('Please allow popups for this site');
    }

    return false;
}



function func_ExporttoCSV(xlink, xparameters) {
    if (xparameters == undefined || xparameters == "undefined")
        xparameters = "";
    if (xlink == undefined) xlink = crExportLnk;
    var win = window.open(xlink + '?SessionID=' + ExportSessionID + "&extpye=csv" + SplitParameters(xparameters));

    if (win) {
        //Browser has allowed it to be opened
        // win.focus();
    } else {
        //Broswer has blocked it
        MessageBox('Please allow popups for this site');
    }

    return false;
}



function func_ExporttoExcel(xlink, xparameters) {
    if (xparameters == undefined || xparameters == "undefined")
        xparameters = "";
    if (xlink == undefined) xlink = crExportLnk;
    var win = window.open(xlink + '?SessionID=' + ExportSessionID + SplitParameters(xparameters));
    //    var data;
    //    $.post(xlink + '?SessionID=' + ExportSessionID + SplitParameters(xparameters), data, function(data, status) {
    ////        //  alert(status + " " + rurl); //alert(data);
    ////        $('#noahwebSedit').append(data);
    ////        clear_parameters();
    ////        $('.message_content').find('#pop_loader').remove();
    ////        $('.message_content').find('table').css('display', '');
    ////        nwLoading_End(reqnum);
    ////        setTimeout(function() {
    ////            nwLoading_End("nwaagToolBox");
    ////        }, 100);
    //            
    ////        if (nwDevMode == false) {
    ////            $('#noahwebSedit').html("");
    ////        }

    //    });


    if (win) {
        //Browser has allowed it to be opened
        // win.focus();
    } else {
        //Broswer has blocked it
        MessageBox('Please allow popups for this site');
    }

    return false;
}

function SplitParameters(xparameters) {
    if (xparameters == "") return "";

    var xreturnstring = "&";
    var xrow_arry = xparameters.spilt("@@@");
    for (var i = 0; i < xrow_arry.length; i++) {
        var xcol_arry = xrow_arry[i].split("@@");
        for (var x = 0; x < xcol_arry.length; x++) {
            if (xreturnstring != "&") xreturnstring += "&";
            xreturnstring += xcol_arry[0] + "=" + xcol_arry[1];
        }
    }
    return xreturnstring;
}



//## ARM ## 02-02-2016
//## Start ##
function checkBindingChanges() {
    //get binding listings
    var xarry_bindings_list = collection_TempG[0].split('#@#')[1].split('#aag#');
    var xtotal_arrylist = xarry_bindings_list.length;
    for (var i = 0; i < xtotal_arrylist; i++) {
        var xarry_bindings = xarry_bindings_list[i].split('*aag*');

        if (xarry_bindings[0] == "#nwtxt_RecUser" || xarry_bindings[0] == "#nwtxt_ModUser"
    || xarry_bindings[0] == "#nwtxt_RecDate" || xarry_bindings[0] == "#nwtxt_ModDate")
            continue;

        var xpresentvalue = GetBindingValue(xarry_bindings[0], xarry_bindings[2], xarry_bindings[3]);
        var xbindvalue = checknoahwebuiToolboxGrid_changes(xarry_bindings[1]);
        // alert(xarry_bindings[0] + "              \n" + xarry_bindings[1]+ "              \n"  + xarry_bindings[2] + "              \n" + xarry_bindings[3] + "              \n" ); 
        //alert(xpresentvalue + "   |    " +xbindvalue);

        //  alert(xpresentvalue);
        xpresentvalue = xpresentvalue.replaceAll("\'", "'");
        // alert(xpresentvalue);

        if (xpresentvalue != xbindvalue) {
            isMessageQuestionNavigation = true;
            parent_MessageBoxQuestion("Do you want to save changes?", "Save", "");
            return false;
            break;

        }
    }
    return true;
}
function checknoahwebuiToolboxGrid_changes(xcolumn) {
    var xreturnvalue = "";
    xreturnvalue = $('#noah-webui-Toolbox-Grid tr:eq(' + (Navigation_recnum - 1).toString() + ') td.aag' + xcolumn).text();
    //alert(xreturnvalue);
    return xreturnvalue;

}


function GetBindingValue(xobjid, xtype, _xopt) {
    var xopt = "";
    if (_xopt != undefined && _xopt != 'undefined') {
        xopt = _xopt;
    }
    var xreturntext = "";
    try {
        switch (xtype) {
            case "val":
                //alert(xobjid + "   \n" + xtype + " \n" + _xopt);
                xreturntext = $(xobjid).val();
                break;

            case "text":
                xreturntext = $(xobjid).text();
                break;


            case "html":
                xreturntext = $(xobjid).html();
                break;


            case "prop":
                try { xreturntext = $(xobjid).prop(xopt); if (xreturntext == "true" || xreturntext) xreturntext = "1"; else xreturntext = "0"; }
                catch (err) { }
                break;
        }
    } catch (err) { }


    return xreturntext;
}

function msgBoxContainerQuestionNav(messageboxquestiontag, messageboxanswerYes) {
    if (messageboxquestiontag == undefined || messageboxquestiontag == 'undefined') {
        messageboxquestiontag = "";
    }

    if (messageboxquestiontag == "BNButton") {
        if (messageboxanswerYes) { //true
            try {
                $("div#noah-webui-default-Save.noah-webui-Toolbox-Item").trigger('click');
            } catch (err) { }
        }
        else { //false
            try {
                $("div#" + Navigation_object + ".BN-button").trigger('mousedown');
            }
            catch (err) { }
        }
    }
    else if (messageboxquestiontag == "BNToolbox") {
        if (messageboxanswerYes) { //true
        }
        else { //false

        }
    }
}
function ContinuetoToolboxNavigatorClient(doContinue) {

    if (doContinue == undefined || doContinue == 'undfined') doContinue = true;
    var isContinue = false;


    if (doContinue == true || doContinue == 'true') {
        if (isMessageQuestionNavigation) {
            isContinuePress = true;
            try {

                isContinue = func_ToolboxNavigatorResume(Navigation_object, Navigation_recnum, GetNextPrimaryKey(), crToolInquireKey);
            } catch (err) { };



        }
    }
    isMessageQuestionNavigation = false;


}
//for happiness
function GetNextPrimaryKey() {
    var xid = $("#noah-webui-Toolbox-Grid tbody tr.aagSelected").attr('id');
    xid = xid.replace('#noah-webui-Toolbox-Grid-tr', '');

    var xtotal = $("#noah-webui-Toolbox-Grid tbody tr").length;

    if (xtotal < xid) {
        return xid + 1;
    }
    else return xid;

}
$(document).on("click", "#btnnwExport", function () {
    func_ExportToExcel("nwExportContainer", 'spread');
    window_close('nwExportContainerMain');
});

$(document).on("click", "#btnnwExportCSV", function () {
    func_ExportToCSV("nwExportContainer", 'spread');
    window_close('nwExportContainerMain');
});
$(document).on("click", "#btnnwExportPrint", function () {
    func_ExportToPrint("nwExportContainer", 'spread');
    window_close('nwExportContainerMain');
});



$(document).on("click", "#btnnwgRemarks", function () {
    func_xnwgRemarks();

});
function func_xnwgRemarks() {
    var txtremarks = "";

    var remarksID = "";
    remarksID = $('#nwgRemarksCon').attr("remarksID") || "";

    var objbutton;
    var objtextarea;

    if (remarksID != "") {
        objtextarea = $("#" + remarksID).find('textarea');
        objbutton = $("#" + remarksID).find('button');
    }
    else {
        objtextarea = crnwTD.find('textarea');
        objbutton = crnwTD.find('button');
    }

    if ($('#nwgRemarksCon').attr("ishtml") == "true") {
        txtremarks = $('#cmsnwgRemarks .nwCMSContent').html();
    }
    else txtremarks = $('#txtnwgRemarks').val();

    var tempvalue = $("<div>" + txtremarks + "<div>").text().trim();
    if ($("<div>" + txtremarks + "<div>").find("img").html() != undefined) tempvalue = "-";
    if (tempvalue != "" && $('#nwgRemarksCon').attr("haveremarkstag") == "true") {
        objbutton.addClass("nwGreen");
    } else {
        objbutton.removeClass("nwGreen");
    }




    objtextarea.val(txtremarks);
    objbutton.focus();


    nwPopupForm_Hide("nwgRemarksCon");
    $('#txtnwgRemarks').val("");
    $('#cmsnwgRemarks .nwCMSContent').html("");
}


$(document).on("click", ".nwGrid button.nwgbtnRemarks", function () {
    func_xcallRemarks(this);
});
$(document).on("keypress", ".nwGrid button.nwgbtnRemarks", function (e) {
    if (e.which == 13) func_xcallRemarks();
});
function func_xcallRemarks(_this) {
    nwPopupForm_ShowModal("nwgRemarksCon");


    var remarksTitle = $(_this).attr("remarksTitle") || $(_this).text();

    $('#nwgRemarksCon').find('.BoxTitle').text(remarksTitle);




    var varid = $(_this).parents(".nwRemarks").attr("id");
    varid = (varid || "");
    $('#nwgRemarksCon').attr("remarksID", varid);


    var value = "";
    var maxlength = "500";

    if (varid != "") {
        value = $(_this).parents(".nwRemarks").find('textarea').val();
    }
    else {
        value = crnwTD.find('textarea').val().replaceAll("nwNewLine", "\n").replaceAll("anwNewXLineX", "\n");
        maxlength = crnwTD.find('textarea').attr("maxlength");
    }



    $('#txtnwgRemarks').hide();
    $('#cmsnwgRemarks').hide();


    if ($(_this).attr("ishtml") == "true") {
        $('#cmsnwgRemarks').show();
        if (!$('#cmsnwgRemarks').hasClass(".nwCMS"))
            $("#cmsnwgRemarks").CMS();
        $('#cmsnwgRemarks .nwCMSContent').focus();
        $('#cmsnwgRemarks .nwCMSContent').html(value);
        func_CMSresize('cmsnwgRemarks');
    }
    else {
        $('#txtnwgRemarks').show();
        $('#txtnwgRemarks').focus();
        $('#txtnwgRemarks').attr("maxlength", maxlength);
        $('#txtnwgRemarks').val(value);

    }


    //var xheight = $(this).height() - $(this).find(".nwCMSButton").height();
    //$(this).find(".nwCMSContent").height(xheight);


    $('#nwgRemarksCon').attr("haveremarkstag", $(_this).attr("haveremarkstag"));
    $('#nwgRemarksCon').attr("ishtml", $(_this).attr("ishtml"));


    try {
        func_nwGridRemarks(crnwTableCon.attr("id"));
    } catch (err) {
    }

}
$(document).on("keypress", "#txtnwgRemarks,#cmsnwgRemarks .nwCMSContent", function (e) {
    if (e.shiftKey && e.which == 13) return;

    if (e.which == 13 && $('#chknwgRemarks').prop("checked") == true) func_xnwgRemarks();

});

$(function () {

    $(".tablecontainter").scroll(function () {

        if (!$(".tablecontainter").find('table').hasClass('xscroll')) {
            var xvar = $(this).scrollTop();
            var trclone = $(".tablecontainter table tr.lookUpTRHeader").clone();

            $(".tablecontainter").find('table').addClass('xscroll');
            //  $(".tablecontainter table tr.lookUpTRHeader").css("visibility","hidden");
            //   $(".tablecontainter table").append(trclone);

            trclone.addClass("aagDatax");
            trclone.css("position", "absolute");
            trclone.css("top", xvar + "px");
            $(".tablecontainter").find('table').addClass('xscroll');

            for (var i = 0; i < trclone.find('th').length; i++) {
                trclone.find('th:eq(' + i + ')').css("min-width", $(".tablecontainter table tr.lookUpTRHeader").find('th:eq(' + i + ')').width() + "px");
                //$(".tablecontainter table tr.lookUpTRHeader").find('th:eq(' +i+')').outerWidth()
            }

            $('tr.lookUpTRHeader.aagDatax').css("margin-left", "-2px");

            //alert(jQuery('table.nwlookupgridList').hasClass('nwlookupgridList'));

            if (jQuery('table.nwlookupgridList').hasClass('nwlookupgridList'))
                $('tr.lookUpTRHeader.aagDatax').css("top", (96) + "px");
            else
                $('tr.lookUpTRHeader.aagDatax').css("top", (66) + "px");



        }
        $(".LookuptableHeader").scrollLeft($(this).scrollLeft());

        //$(".search").val(xvar);


    });

    $(".noah-webui-container").scroll(function () {


        var conheight = $(this).attr("conheight");
        //SSconsole.log(" scroll:" + $(this).scrollTop() + " height:" + $(this).height() + " conheight:" + conheight);
        if (conheight != undefined) {
            if ($(this).scrollTop() + $(this).height() < parseFloat(conheight)) {
                func_WebContainerResizer(this);
            }
        }


        // 
    });

});
$.fn.hasScrollHBar = function () {
    return this.get(0).scrollWidth > this.width();
}
$.fn.hasScrollVBar = function () {
    return this.get(0).scrollHeight > this.height();
}

function func_WebContainerResizer(_this, init) {
    var obj = $(_this);
    var xpadding = 2;

    try {
        var temp = $(obj).css("margin-bottom").replace("px", "");

        if (parseInt(temp) > xpadding)
            xpadding = xpadding - (parseInt(temp) - xpadding);
    } catch (err) { }


    var plustop = xpadding
    if ($(obj).hasScrollHBar()) {
        plustop = -10;
    }

    var xtop = $(obj).height() + $(obj).scrollTop() + plustop + parseInt($(obj).css("padding-top").replace("px", ""));
    //var xheight = $(obj).scrollHeight();

    var xheight = 0;
    //$(obj).children().each(function () {
    //    xheight += $(this).outerHeight(true); // true = include margins
    //});

    //if (xtop > xheight) {
    //    xtop = xheight - xpadding;
    //}

    // console.log("xheight" + xheight + " top:" + xtop + " xpadding:" + xpadding + " scroll:" + $(obj).scrollTop());


    $(obj).find('>.ui-resizable-handle').css("top", xtop);


    if (init == true) {
        $(obj).css("height", $(obj).height() + "px !important");

        $(obj).attr("conheight", $(obj)[0].scrollHeight + $(obj).height());
        $(obj).css("padding-bottom", "10px");
    }
}


Date.prototype.addDays = function (num) {
    var value = this.valueOf();
    value += 86400000 * num;
    return new Date(value);
};

Date.prototype.addSeconds = function (num) {
    var value = this.valueOf();
    value += 1000 * num;
    return new Date(value);
};

Date.prototype.addMinutes = function (num) {
    var value = this.valueOf();
    value += 60000 * num;
    return new Date(value);
};

Date.prototype.addHours = function (num) {
    var value = this.valueOf();
    value += 3600000 * num;
    return new Date(value);
};

Date.prototype.addMonths = function (num) {
    var value = new Date(this.valueOf());

    var mo = this.getMonth();
    var yr = this.getYear();

    mo = (mo + num) % 12;
    if (0 > mo) {
        yr += (this.getMonth() + num - mo - 12) / 12;
        mo += 12;
    }
    else
        yr += ((this.getMonth() + num - mo) / 12);

    value.setMonth(mo);
    value.setYear(yr);
    return value;
};

Date.prototype.addYears = function (num) {
    var value = new Date(this.valueOf());

    var mo = this.getMonth();
    var yr = this.getYear() + num;

    value.setMonth(mo);
    value.setYear(yr);
    return value;
};

// function func_GetURLPath()
// {
//        var pathname = window.location.pathname; // Returns path only
//        var url      = window.location.href;     // Returns full URL
//        
//        alert(getAbsolutePath());
// }

function func_GetAbsoluteURL() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}




jQuery.expr[':'].contains = function (a, i, m) {

    if (isContainsSensitive == false) return jQuery(a).text().indexOf(m[3].toUpperCase()) >= 0;

    return jQuery(a).text().toUpperCase()
    .indexOf(m[3].toUpperCase()) >= 0;
};



$(document).on("click", ".lookupheader th", function () {

});


function _sp_IsValid(i, u) {
    if (i >= u) {
        return true;
    }
    return false;
}


$(document).on("click", ".lookupNext,.lookupPrev,.lookupLast , .lookupFirst", function () {
    func_nwLookUpPager(this);
});
$(document).on("change", ".lookupcrindex", function (e) {
    var xtotal = $(".lookup_buttonsCon").find(".lookupctotal").text();
    xtotal = xtotal.replace(" ", ""); xtotal = xtotal.replace("of", "");
    var xindex = $(this).val();
    var xtotalNum = parseInt(xtotal);

    if (xtotalNum < parseInt(xindex))
        $(this).val(xtotalNum);
    else if (0 >= parseInt(xindex)) $(this).val(1);

    func_nwLookUpPager(this);
});

function func_nwLookUpPager(obj, sortObject) {

    try { func_Check_Lookup(dimP); } catch (err) { }

    if ($(obj).parents(".ContainerContent").hasClass("nwloadingdata")) return;

    var nwpager = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").attr("nwpager");
    var nwinstance = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").attr("nwinstance");
    var nwpagerindex = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").attr("nwpagerindex");
    var nwpagercount = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").attr("nwpagercount");
    var lookupID = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").parent().attr("id");
    var nwpagecurrent = 1;

    if (nwpagerindex + "" == "NaN" || nwpagerindex == undefined || nwpagerindex == "") nwpagerindex = "1";

    try {
        if (parseInt(nwpagerindex) <= 1 && ($(obj).hasClass("lookupPrev") || $(obj).hasClass("lookupFirst"))) return false;

        if (parseInt(nwpagerindex) >= parseInt(nwpagercount) && ($(obj).hasClass("lookupNext") || $(obj).hasClass("lookupLast"))) return false;


        try {
            $('#menuCreatorContainer .lookUpTRHeader .nwlookupgridcheck').prop("checked", false);
        } catch (err) { }

        if ($(obj).hasClass("lookupNext")) nwpagecurrent = parseInt(nwpagerindex) + 1;
        else if ($(obj).hasClass("lookupPrev")) nwpagecurrent = parseInt(nwpagerindex) - 1;
        else if ($(obj).hasClass("lookupFirst")) nwpagecurrent = 1;
        else if ($(obj).hasClass("lookupLast")) nwpagecurrent = parseInt(nwpagercount);
        else nwpagecurrent = $(obj).parents(".ContainerContent").find(".lookupcrindex").val();

        // alert(nwpagecurrent);

        $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").attr("nwpagerindex", nwpagecurrent);
        //  $(this).parents(".lookup").find(".lookupcrindex").val(nwpagecurrent);
        $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").find(".lookupcrindex").prop("disabled", true);

        //$(obj).parents(".nwGrid").append("<div class='nwGridBlocker'></div>");

        nwParameter_Add("nwpagecurrent", nwpagecurrent);
        nwParameter_Add("nwlookupID", $(".ContainerContent .LookupID").text());
        nwParameter_Add("nwpagerindex", nwpagerindex);
        nwParameter_Add("nwaagSessionID", baseSessionID);
        nwParameter_Add("nwpager", nwpager);
        nwParameter_Add("nwinstance", nwinstance);
        nwParameter_Add("nwpagerindex", nwpagerindex);
        nwParameter_Add("nwislist", $(".ContainerContent .lookupheader").hasClass("nwlookupgridList"));

        //MessageBox(nwpagecurrent+"@" + nwpagerindex);


        var xcolumn = $(obj).parents('#menuCreatorContainer').find(' .LookuptableHeader table').attr("nwcolumn");
        var xobj;
        var xindexs = 0;
        try {
            xindexs = parseInt(xcolumn);

            xobj = $(obj).parents('#menuCreatorContainer').find('.LookuptableHeader table tr th:eq(' + xindexs + ')');
            xcolumn = $(xobj).text();

            nwParameter_Add("nwpagesort", xcolumn);
            var nwsort = $(xobj).attr("nwsort");
            if (nwsort == undefined) nwsort = "asc";
            nwParameter_Add("nwsort", nwsort);
            //. alert(xcolumn + " " + nwsort);

        } catch (err) {
            // alert(err);
        }

        nwParameter_Add("menuCreatorContainerDataType", $('#menuCreatorContainerDataType').text());


        var xoption = $("#lookupColumn option:selected").val();
        if (xoption == undefined) xoption = "aagALLDATA";
        nwParameter_Add("aagLookUpColumn", xoption);
        nwParameter_Add("aagLookUpSearch", $("#txtlookupsearch").val());

        nw_dataLookup = [];
        $.each($('.lookUpTRHeaderSearch .lookupcolSearch'), function (index, object) {
            nw_dataLookup.push({ column: $(object).attr("search"), value: $(object).val() });
        });
        nwParameter_Add("aagLookUpSearchSub", JSON.stringify(nw_dataLookup));


        $("input.lookupcrindex").prop("disabled", true);
        $(obj).parents(".ContainerContent").find(".tablecontainter").addClass("nwloadingdata");
        var standardCrLnk = crSTDLnk;
        func_ActionDriven("actNWLookUpPage", false, standardCrLnk);

    } catch (err) {
        alert(err);
    }

}


$(document).on("click", ".nwgridNext,.nwgridPrev,.nwgridLast , .nwgridFirst", function () {
    func_nwGridPager(this);
});
$(document).on("change", ".nwgridcrindex", function (e) {
    var xtotal = $(this).parents(".nwGrid").find(".nwgridctotal").text();
    xtotal = xtotal.replace(" ", ""); xtotal = xtotal.replace("of", "");
    var xindex = $(this).val();
    var xtotalNum = parseInt(xtotal);

    if (xtotalNum < parseInt(xindex))
        $(this).val(xtotalNum);
    else if (0 >= parseInt(xindex)) $(this).val(1);

    func_nwGridPager(this);
});

$(document).on("click", "tr.lookUpTRHeader th", function (e) {


    if ($(this).find(".nwlookupgridcheck").prop("tagName") == "INPUT") {

        return true;
    }

    var obj = this;
    if ($(obj).attr("nwsort") == "asc") $(obj).attr("nwsort", "desc");
    else $(obj).attr("nwsort", "asc");

    $(obj).parents('#menuCreatorContainer .LookuptableHeader table').attr("nwcolumn", $(obj).index());

    //var xcolumn = $(obj).text().trim();

    //var nwpager = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").attr("nwpager");
    //var nwinstance = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").attr("nwinstance");
    //var nwpagerindex = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").attr("nwpagerindex");
    //var nwpagercount = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").attr("nwpagercount");
    //var lookupID = $(obj).parents(".ContainerContent").find(".LookuptableHeader .lookupheader").parent().attr("id");
    //var nwpagecurrent = 1;


    //nwParameter_Add("nwpagecurrent", nwpagecurrent);
    //nwParameter_Add("nwlookupID", $(".ContainerContent .LookupID").text());
    //nwParameter_Add("nwpagerindex", nwpagerindex);
    //nwParameter_Add("nwaagSessionID", baseSessionID);
    //nwParameter_Add("nwpager", nwpager);
    //nwParameter_Add("nwinstance", nwinstance);
    //nwParameter_Add("nwpagerindex", nwpagerindex);
    //nwParameter_Add("nwislist", $(".ContainerContent .lookupheader").hasClass("nwlookupgridList"));

    //$(obj).parents(".ContainerContent").find(".tablecontainter").addClass("nwloadingdata");
    //var standardCrLnk = crSTDLnk;

    //nwParameter_Add("menuCreatorContainerDataType", $('#menuCreatorContainerDataType').text());

    //nwParameter_Add("nwpagesort", xcolumn);
    //var nwsort = $(obj).attr("nwsort");
    //if (nwsort == undefined) nwsort = "asc";
    //nwParameter_Add("nwsort", nwsort);


    //var xoption = $("#lookupColumn option:selected").val();
    //if (xoption == undefined) xoption = "aagALLDATA";
    //nwParameter_Add("aagLookUpColumn", xoption);
    //nwParameter_Add("aagLookUpSearch", $("#txtlookupsearch").val());
    //nw_dataLookup = [];
    //$.each($('.lookUpTRHeaderSearch .lookupcolSearch'), function (index, object) {
    //    nw_dataLookup.push({ column: $(object).attr("search"), value: $(object).val() });
    //});
    //nwParameter_Add("aagLookUpSearchSub", JSON.stringify(nw_dataLookup));

    //$('#menuCreatorContainerLoading').show()
    //func_ActionDriven("actNWLookUpSort", false, standardCrLnk);


    // func_nwGridPager(this);
});





function func_nwGridPager(obj, nwGridtype) {
    if ($(obj).parents(".nwGrid").hasClass("nwloadingdata")) return;

    crnwTable = $(obj).parents(".nwGrid");

    var nwpagerheader = $(obj).parents(".nwGrid").attr("nwpagerheader");
    var nwpager = $(obj).parents(".nwGrid").attr("nwpager");
    var nwinstance = $(obj).parents(".nwGrid").attr("nwinstance");
    var nwpagerindex = $(obj).parents(".nwGrid").attr("nwpagerindex");
    var nwpagercount = $(obj).parents(".nwGrid").attr("nwpagercount");
    var nwgridID = $(obj).parents(".nwGrid").parent().attr("id");
    var nwgridIDSelf = $(obj).parents(".nwGrid").attr("id");
    var nwpagecurrent = 1;
    var nwPagerDataEditable = $(obj).parents(".nwGrid").attr("nwPagerDataEditable");
    var nwpagefromIndex = nwpagerindex;

    try {
        if (parseInt(nwpagerindex) <= 1 && ($(obj).hasClass("nwgridPrev") || $(obj).hasClass("nwgridFirst"))) return false;

        if (parseInt(nwpagerindex) >= parseInt(nwpagercount) && ($(obj).hasClass("nwgridNext") || $(obj).hasClass("nwgridLast"))) return false;


        if ($(obj).hasClass("nwgridNext")) nwpagecurrent = parseInt(nwpagerindex) + 1;
        else if ($(obj).hasClass("nwgridPrev")) nwpagecurrent = parseInt(nwpagerindex) - 1;
        else if ($(obj).hasClass("nwgridFirst")) nwpagecurrent = 1;
        else if ($(obj).hasClass("nwgridLast")) nwpagecurrent = parseInt(nwpagercount);

        else if ($(obj).hasClass("nwgrid_Search")) nwpagecurrent = 1;
        else nwpagecurrent = $(obj).parents(".nwGrid").find(".nwgridcrindex").val();


        grid_obj = obj;
        grid_nwpagerheader = nwpagerheader;
        grid_nwpagecurrent = nwpagecurrent;
        grid_nwgridID = nwgridID;
        grid_nwgridIDSelf = nwgridIDSelf;
        grid_nwpagerindex = nwpagerindex;
        grid_nwpager = nwpager;
        grid_nwinstance = nwinstance;
        grid_nwPagerDataEditable = nwPagerDataEditable;
        grid_nwpagefromIndex = nwpagefromIndex;


        if ($(obj).hasClass("nwgridNext")) { try { var isContinueProcess = fn_nwgridNext(nwgridID); if (isContinueProcess == false) return; } catch (err) { } }
        else if ($(obj).hasClass("nwgridPrev")) { try { var isContinueProcess = fn_nwgridPrev(nwgridID); if (isContinueProcess == false) return; } catch (err) { } }
        else if ($(obj).hasClass("nwgridFirst")) { try { var isContinueProcess = fn_nwgridFirst(nwgridID); if (isContinueProcess == false) return; } catch (err) { } }
        else if ($(obj).hasClass("nwgridLast")) { try { var isContinueProcess = fn_nwgridLast(nwgridID); if (isContinueProcess == false) return; } catch (err) { } }
        else if ($(obj).hasClass("nwgrid_Search")) { }
        else { try { var isContinueProcess = fn_nwgridTextIndex(nwgridID); if (isContinueProcess == false) return; } catch (err) { } }

        fn_nwgridContinueNavigation(nwGridtype);



    } catch (err) {
        //  alert(err);
    }
}

var grid_obj;
var grid_nwpagerheader;
var grid_nwpagerheaderHTML;
var grid_nwpagerheaderHTMLHeight;
var grid_nwpagerheaderHTMLStyle;
var grid_nwpagecurrent;
var grid_nwgridID;
var grid_nwgridIDSelf;
var grid_nwpagerindex;
var grid_nwpager;
var grid_nwinstance;
var grid_nwPagerDataEditable;
var grid_nwpagefromIndex;
var grid_nwpageType;

function fn_nwgridContinueNavigation(nwGridtype) {



    if (grid_obj == undefined) return;

    $(grid_obj).parents(".nwGrid").attr("nwpagerindex", grid_nwpagecurrent);
    //  $(this).parents(".nwGrid").find(".nwgridcrindex").val(nwpagecurrent);
    $(grid_obj).parents(".nwGrid").find(".nwgridcrindex").prop("disabled", true);

    $(grid_obj).parents(".nwGrid .nwGridBlocker").remove();
    $(grid_obj).parents(".nwGrid").append("<div class='nwGridBlocker'></div>");
    grid_nwpagerheaderHTML = "";

    for (var i = 0; i < grid_nwpagerheader; i++) {
        grid_nwpagerheaderHTML += $(grid_obj).parents(".nwGrid").find(".tblGridBody tbody").find("tr:eq(" + i + ")").outerHTML();
    }

    //if ($(grid_obj).parents(".nwGrid").find('.nwGridSplitter').outerHTML() != undefined)
    try {
        grid_nwpagerheaderHTMLHeight = $(grid_obj).parents(".nwGrid").find('.nwGridSplitter').outerHTML();
    } catch (err) { }
    try {
        //           if ($('#nwGridAttr' + $(grid_obj).parents(".nwGrid").attr("id") + "X").outerHTML() != undefined
        //            && $('#nwGridAttr' + $(grid_obj).parents(".nwGrid").attr("id") + "X").outerHTML() != ""
        //                )
        //               grid_nwpagerheaderHTMLStyle = $('#nwGridAttr' + $(grid_obj).parents(".nwGrid").attr("id")+"X").html();
        //           //else
        if (grid_nwpagefromIndex == 1)
            grid_nwpagerheaderHTMLStyle = $('#nwGridAttr' + $(grid_obj).parents(".nwGrid").attr("id")).html();


    } catch (err) { }


    nwParameter_Add("nwpagerheader", grid_nwpagerheader);

    nwParameter_Add("nwpagecurrent", grid_nwpagecurrent);
    nwParameter_Add("nwgridID", grid_nwgridID);
    nwParameter_Add("nwgridIDSelf", grid_nwgridIDSelf);

    nwParameter_Add("nwpagerindex", grid_nwpagerindex);
    nwParameter_Add("nwaagSessionID", baseSessionID);
    nwParameter_Add("nwpager", grid_nwpager);
    nwParameter_Add("nwpagefromIndex", grid_nwpagefromIndex);

    nwParameter_Add("nwinstance", grid_nwinstance);
    nwParameter_Add("nwpagerindex", grid_nwpagerindex);
    nwParameter_Add("nwPagerDataEditable", grid_nwPagerDataEditable);

    var frmTitle = $(crnwTD).attr("data-label") || "";
    nwParameter_Add("frmTitle", frmTitle);

    if (grid_nwPagerDataEditable == "true") {
        $("#" + grid_nwgridID).find(".nwGridData").addClass("backgroundblur");
        $("#" + grid_nwgridID).find(".nwgrid_buttonsCon").addClass("backgroundblur");

        $("#" + grid_nwgridID).find('.nwGridDataLoading').remove();
        $("#" + grid_nwgridID).prepend("<div class='nwGridDataLoading'><div class='nwGridLabel'>Updating...</div></div>");
        $("#" + grid_nwgridID).find(".nwGridDataLoading").css("width", $("#" + grid_nwgridID).outerWidth());
        $("#" + grid_nwgridID).find(".nwGridDataLoading").css("height", $("#" + grid_nwgridID).outerHeight() + 20);

        nwParameter_Add_Table(grid_nwgridID);
    }

    $(grid_obj).parents(".nwGrid").addClass("nwloadingdata");
    var standardCrLnk = crSTDLnk;

    if (grid_nwpageType == "1")
        func_ActionDriven("actnwGridFindNext", false, standardCrLnk);
    else if (nwGridtype == "nwsearch") {
        nwParameter_Add("strType", nwGridtype);
        if (grid_nwPagerDataEditable != "true") nwParameter_Add_Table(grid_nwgridID);
        func_ActionDriven("actnwGridSearch", false, standardCrLnk);
    }
    else
        func_ActionDriven("actNWGRIDPage", false, standardCrLnk);




    //call    nwgrid_PaginationNavDone(gridID)

    grid_nwpageType = "";

    grid_obj = undefined;
}


function func_nwGridFreezeRelease(gridID) {
    if ($('#' + gridID + '').find('.tblGridBody').find('.nwGridSplitter').length >= 2) { while ($('#' + gridID + '').find('.tblGridBody').find('.nwGridSplitter').length >= 2) { $('#' + gridID + '').find('.tblGridBody').find('.nwGridSplitter:eq(1)').remove(); } }
}






function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function getSelectedText() {
    if (document.all) {
        var selection = document.selection;
        var newRng = selection.createRange();
        newRng.select();
        return newRng.htmlText;
    } else {
        return document.getSelection();
    }
}

function replaceSelectedText(replacementText) {
    var sel, range;
    var xcontent = "";
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);
            xcontent = range.text;
            range.deleteContents();
            range.insertNode(document.createTextNode(replacementText));
            // $(sel).html("aaa");
            // alert($(sel).html());
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        xcontent = range.text;
        range.text = replacementText;
    }

    return xcontent;
}

function getSelectedText() {
    var sel, range;
    var xcontent = "";

    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount) {
            range = sel.getRangeAt(0);

            // xcontent = range;
            xcontent = getHTMLOfSelection();
        }
    } else if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        xcontent = range.text;
    }

    //    
    //    if (window.ActiveXObject) {
    //        var c = document.selection.createRange();
    //        return c.htmlText;
    //    }

    //    var nNd = document.createElement("span");
    //    var w = getSelection().getRangeAt(0);
    //    w.surroundContents(nNd);
    //    xcontent= nNd.innerHTML;
    //    

    //     if (document.selection) {
    //        var obj_xcontent= document.selection.createRange();
    //        xcontent = obj_xcontent;//$(obj_xcontent).html();
    //    } else {
    //        var selection = window.getSelection();
    //        if (selection.rangeCount > 0)
    //               var obj_xcontent= selection.getRangeAt(0);//.startContainer.parentNode;
    //                 xcontent = obj_xcontent;//$(obj_xcontent).html();
    //    }



    return xcontent;
}

function getHTMLOfSelection() {
    var range;
    if (document.selection && document.selection.createRange) {
        range = document.selection.createRange();
        return range.htmlText;
    }
    else if (window.getSelection) {
        var selection = window.getSelection();
        if (selection.rangeCount > 0) {
            range = selection.getRangeAt(0);
            var clonedSelection = range.cloneContents();
            var div = document.createElement('div');
            div.appendChild(clonedSelection);
            return div.innerHTML;
        }
        else {
            return '';
        }
    }
    else {
        return '';
    }
}



$.fn.p8Selection = function (xvalue) {
    //var  xvalue=$('#txtReplace').val();
    var xcontent = "";
    if (xvalue == undefined) {
        xcontent = getSelectedText();
    }
    else {
        var xcontent = replaceSelectedText("#@P8Selection@#");

        var elementType = $(this).prop('tagName'); /// check type var is_element_input = $(this).is("input"); //true or false
        var elementTyper = (elementType + "").toLowerCase();

        if (elementTyper == "input" || elementTyper == "textarea") {
            $(this).val($(this).val().replaceAll("#@P8Selection@#", xvalue));
        }
        else
            $(this).html($(this).html().replaceAll("#@P8Selection@#", xvalue));
    }

    return xcontent;
};


//window.addEventListener("beforeunload", function(e) {
//    var confirmationMessage = "\o/";
//    func_Cleaners();
//    return confirmationMessage;                            //Webkit, Safari, Chrome
//});

$(window).on('unload', function () {

    try {
        func_Unload();
    } catch (err) {

    }


    if (nwInterfaceMode == false)
        func_Cleaners();

});

function func_Cleaners() {

    var MultipleInstanceID = "";
    var LookupInstanceID = "";
    //(e || window.event).returnValue = confirmationMessage; //Gecko + IE
    LookupInstanceID = "nwLookUp-" + baseSessionID;
    MultipleInstanceID += "DataToolBox_" + baseSessionID;
    MultipleInstanceID += "|BindToolBox_" + baseSessionID;


    for (var i = 0; i < $('.nwGrid').length; i++) {
        var inx = $('.nwGrid:eq(' + i + ')').attr("nwinstance");
        MultipleInstanceID += "|nwaagGridSSX" + inx;
        MultipleInstanceID += "|nwaagGridSSXsample" + inx;
        // nwaagGridSSXWXISJQTS4G20162215062253635
    }

    for (var i = 0; i < $('#nwExportSessions span').length; i++) {
        var inxX = $('#nwExportSessions span:eq(' + i + ')').text();
        MultipleInstanceID += "|" + inxX;
    }


    nwParameter_Add("LookupInstanceID", LookupInstanceID);
    nwParameter_Add("MultipleInstanceID", MultipleInstanceID);
    func_ClearGridSession('');
    sleep(600);
}

//$.fn.greenify = function() {
//    this.css( "color", "green" );
//};
//


$.fn.p8Json = function (searchField, searchVal, isCaseSensitive) {
    nwJson(this, searchField, searchVal, isCaseSensitive);
};

function nwJson(json, searchField, searchVal, isCaseSensitive) {
    var results = [];
    if (isCaseSensitive == undefined) isCaseSensitive = true;
    for (var i = 0; i < json.length; i++) {
        if (isCaseSensitive == false) {
            if ((json[i][searchField] + '').toUpperCase() == (searchVal + "").toUpperCase()) {
                results.push(json[i]);
            }
        } else {
            if (json[i][searchField] == (searchVal + "") || (json[i][searchField] + '') == (searchVal + "")) {
                results.push(json[i]);
            }
        }
    }
    return results;
}

//searchFields = [{"field":"code","value": "test"},{"field":"description","value": "test"}]; 
// if more searchVals = null
function nwJsonContains(json, searchFields, searchVals, isCaseSensitive) {
    var results = [];
    var searchField = "";
    var searchVal = "";
    var xloop = 1;
    var xloopval = 1;
    var isString = true;
    var isStringval = true;

    if (typeof searchFields === 'string' || searchFields instanceof String) {
        searchField = searchFields;
        xloop = 1;
    }
    else {
        xloop = searchFields.length;
        isString = false;
    }

    if (isCaseSensitive == undefined) isCaseSensitive = true;
    // searchFields


    for (var i = 0; i < json.length; i++) {
        for (var i2 = 0; i2 < xloop; i2++) {
            if (isString == false) {
                searchField = searchFields[i2]["field"];
                searchVal = searchFields[i2]["value"];
            }

            if (isCaseSensitive == false) {
                if ((json[i][searchField] + '').toUpperCase().indexOf((searchVal + "").toUpperCase()) >= 0) {
                    results.push(json[i]);
                    break;
                }
            } else {
                if (json[i][searchField] == (searchVal + "") || (json[i][searchField] + '').indexOf((searchVal + "")) >= 0) {
                    results.push(json[i]);
                    break;
                }
            }
        }

    }

    return results;
}

function nwJsonSearchIndex(json, searchField, searchVal, isCaseSensitive) {
    var results = -1;
    if (isCaseSensitive == undefined) isCaseSensitive = true;
    for (var i = 0; i < json.length; i++) {
        if (isCaseSensitive == false) {
            if ((json[i][searchField] + '').toUpperCase() == (searchVal + "").toUpperCase()) {
                results = i; break;
            }
        } else {
            if (json[i][searchField] == (searchVal + "") || (json[i][searchField] + '') == (searchVal + "")) {
                results = i; break;
            }
        }
    }
    return results;
}


function nwJsonReplaceValue(json, rowIndex, arrayField, arrayValue) {
    var results = [];
    try {
        var i = -1;

        var arrayFieldX = arrayField;
        var arrayValueX = arrayValue;
        json[rowIndex][arrayField] = arrayValueX;
        results = json[rowIndex];
    } catch (err) { }
    return results;
}


function nwJsonDelete(json, rowIndex) {
    var results = json;
    try {
        json.splice(rowIndex, 1);
    } catch (err) { }
    return results;
}








function nwLoadPrint(nwfilelink, arryRecords) {


    setTimeout(function () {
        nwfilelink = nwfilelink.replace("#baselink", this.location.origin);

        $("#nwPrintPreviewCon").find("div.message_content").css("background-color", "#3d3d3d");

        var strpath = "../../../forms_standards/pdfviewer/";

        if (nwDevMode)
            strpath += "viewer.html?nwdev=p8dev&file=" + nwfilelink + "";
        else
            strpath += "viewer.html?file=" + nwfilelink + "";

        if (arryRecords.length >= 1) {
            var xstrpath = strpath;
            $("#nwPrintPreviewCon").find("iframe.nwPrintPreview").width("79%");
            $("#nwPrintPreviewCon").find("div.nwPrintPreviewBrowser").width("21%");
            $("#nwPrintPreviewCon").find("div.nwPrintPreviewBrowser").css("background-color", "#3d3d3d");

            var sstr = "<ul class='nwPrintSelector'  style='list-style-type: square; line-height: 22px;color:white;list-style-image: url(../../../forms_standards/pdfviewer/images/toolbarButton-sidebarToggle.png); cursor:pointer;'>";
            sstr += "<style>ul.nwPrintSelector li.nwSelected{ background-color:orange; }ul.nwPrintSelector li input{display:none;}</style>";
            // alert(arryRecords.length);
            console.log(arryRecords);
            for (var i = 0; i < arryRecords.length; i++) {
                if (arryRecords[i][1] != undefined)
                    sstr += "<li>" + arryRecords[i][0] + "<input value='" + xstrpath + "#page=" + arryRecords[i][1] + "' />" + "</li>";
            }
            sstr += "</ul>";
            $("#nwPrintPreviewCon").find("div.nwPrintPreviewBrowser").html(sstr);
        }


        strpath += "#page=1";
        $("#nwPrintPreviewCon").find("iframe.nwPrintPreview").attr("src", strpath);

        nwPopupForm_ShowModal("nwPrintPreviewCon");


    }, 300);
}

$(document).on("mousedown", "ul.nwPrintSelector li", function () {
    $("ul.nwPrintSelector li").removeClass("nwSelected");
    $(this).addClass("nwSelected");
    var strpath = $(this).find("input").val();

    $("#nwPrintPreviewCon").find(".ui-resizable-handle.ui-resizable-s").css("bottom", "inherit");

    // $("#nwPrintPreviewCon").find("iframe.nwPrintPreview").attr("src", "");

    strpath = strpath.replaceAll("#printbutton", "");
    $("#nwPrintPreviewCon").find("iframe.nwPrintPreview").attr("src", strpath);


    return false;
});


///P8 Treee
$(document).on("click", ".p8Tree-buttonCollapse", function () {
    func_p8TreeItems(this);

});
$(document).on("click", ".p8Tree-title", function () {
    func_p8TreeItemsSelect(this);

});


function func_p8TreeItems(ver) {

    var parentID = $(ver).parents(".p8-TreeList").attr("id");
    var parentIDsb = $(ver).parents(".p8-TreeList").attr("id");

    var xx = $("#" + parentIDsb + " .p8Tree-title:eq(0) .p8Tree-buttonCollapse").hasClass("p8Tree-Minusbtn");

    if (xx) {
        $("#" + parentID).css('overflow-y', 'hidden');
        $("#" + parentID).css('height', '16px');
        $("#" + parentID).css('overflow-x', 'hidden');
        $("#" + parentID + " .p8Tree-title:eq(0) .p8Tree-buttonCollapse").removeClass('p8Tree-open');
        $("#" + parentID + " .p8Tree-title:eq(0) .p8Tree-buttonCollapse").addClass('p8Tree-Plusbtn');
        $("#" + parentID + " .p8Tree-title:eq(0) .p8Tree-buttonCollapse").removeClass('p8Tree-Minusbtn');
    }
    else {
        $("#" + parentID).css('overflow-y', 'visible');
        $("#" + parentID).css('overflow-x', 'visible');
        $("#" + parentID).css('height', 'inherit');
        $("#" + parentID + " .p8Tree-title:eq(0) .p8Tree-buttonCollapse").addClass('p8Tree-open');
        $("#" + parentID + " .p8Tree-title:eq(0) .p8Tree-buttonCollapse").addClass('p8Tree-Minusbtn');
        $("#" + parentID + " .p8Tree-title:eq(0) .p8Tree-buttonCollapse").removeClass('p8Tree-Plusbtn');
    }
}

function func_p8TreeItemsSelect(ver) {

    var parentID = $(ver).parents(".p8-TreeItem").attr("id");

    var xx = jQuery("#" + parentID + " div.p8Tree-formtitle:eq(0)").hasClass('p8Tree-Selected');

    $(".p8Tree-title").css('background-color', ''); // alert(xx);
    $(".p8Tree-title").css('color', '');
    $(".p8Tree-title").removeClass('p8Tree-Selected');


    if (xx) {

    }
    else {

    }
    $("#" + parentID + " .p8Tree-title:eq(0)").css('background-color', 'darkblue');
    $("#" + parentID + " .p8Tree-title:eq(0)").css('color', 'white');
    $("#" + parentID + " .p8Tree-title:eq(0)").addClass('p8Tree-Selected');
}




var currentSubfoldr = "";
var jsonP8TreeData = [];
function func_p8TreeGetData(TreeID) {

    var ItemType = "";
    var ItemName = "";
    var ItemParentItem = "";
    var ItemParentApplication = "";
    var ItemLevel = "";
    var ItemSort = "";
    var icon = "";


    xcount = 1;
    xlevel = 0;
    var length = $("#" + TreeID).find("ul.p8-TreeView>li").length;
    length = length; //- 1;


    for (var i = 0; i < length; i++) {

        if ($("#" + TreeID).find("ul.p8-TreeView>li:eq(" + i + ")").hasClass("p8-TreeList") ||
          $("#" + TreeID).find("ul.p8-TreeView>li:eq(" + i + ")").hasClass("p8-TreeItem ")) {

        }
        else { continue; }

        var itemtyp = "0";



        if ($("#" + TreeID).find("ul.p8-TreeView>li:eq(" + i + ")").hasClass("p8-TreeItem ")) {
            itemtyp = "1";
        }

        ItemType = itemtyp;

        if ($("#" + TreeID).find("ul.p8-TreeView>li:eq(" + i + ")").hasClass("menuCreatorScreenEmpty")) {
            continue;
        }
        else if ($("#" + TreeID).find("ul.p8-TreeView>li:eq(" + i + ")").hasClass("p8-TreeList")) {
            $("#" + TreeID).find("ul.p8-TreeView>li:eq(" + i + ")")
            // nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 0)($("#lblCollection2").find("#ScreenMenuCreatorListContainer>li:eq(" + i + ")").attr("id"));
            // nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 2)($("#lblCollection2").find("#ScreenMenuCreatorListContainer>li:eq(" + i + ")>div:eq(1)").text());
        }

        else {
            var vcode = $("#" + TreeID).find("ul.p8-TreeView>li:eq(" + i + ") input").attr("name");
            try {
                vcode = vcode.replace("scC", "");
            } catch (err) {
            }

            nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 0)(vcode);
            nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 2)($("#lblCollection2").find("#ScreenMenuCreatorListContainer>li:eq(" + i + ")> span").text());
        }

        nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 3)("root");

        nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 4)($("#nwModules").val());

        nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 5)(xlevel.toString());

        nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 6)(xcount.toString());

        xcount++;

        //testing
        currentSubfoldr = $("#lblCollection2").find("#ScreenMenuCreatorListContainer>li:eq(" + i + ")>div:eq(1)").text();
        // alert(currentSubfoldr);
        if (itemtyp == "0") {
            var par = $("#lblCollection2").find("#ScreenMenuCreatorListContainer>li:eq(" + i + ")").attr("id");
            func_p8TreeGetDataLoop(par, xlevel + 1);
        }




    }



}


function func_p8TreeGetDataLoop(par, level) {
    var length = $("#" + par + ">.conItemList>ul>li").length;
    length = length - 1;
    //alert(currentSubfoldr + "  length: " + length + "  level: " + level);
    for (var i = 0; i < length; i++) {

        if ($("#" + par + ">.conItemList>ul>li:eq(" + i + ")").attr("class") == "menuCreatorScreenEmpty") {
            continue;
        }

        var itemtyp = "0";
        nwLib.nwTempTable_AddRow("temptable");

        if ($("#" + par + ">.conItemList>ul>li:eq(" + i + ")>div:eq(0)").attr("class") != "ContainerToolboxIconCollapseLogo") {
            itemtyp = "1";
        }



        if (itemtyp == "0") {
            nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 0)($("#" + par + ">.conItemList>ul>li:eq(" + i + ")").attr("id"));
            //alert("looping folder " + currentSubfoldr + " at " + $("#"+par+">.conItemList>ul>li:eq("+i+")>div:eq(1)").text() + " " + (i+1) + " out of " + length + " par is " + par);
        }
        else {
            try {
                nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 0)($("#" + par + ">.conItemList>ul>li:eq(" + i + ")>input").attr("name").replace("scC", ""));
            } catch (err) { alert(par + "@" + i + " \n\n " + err); }
            //alert("posting items " +  currentSubfoldr + " at " + $("#"+par+">.conItemList>ul>li:eq("+i+")>input").attr("name").replace("scC", "") + " " + (i+1) + " out of " + length + " par is " + par);
        }


        //alert(par + "   " + $("#"+par+">.conItemList>ul>li:eq("+i+")>div:eq(0)").attr("class") + " " + itemtyp);


        nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 1)(itemtyp);

        if (itemtyp == "0") {
            nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 2)($("#" + par + ">.conItemList>ul>li:eq(" + i + ")>div:eq(1)").text());
            //alert($("#"+par+">.conItemList>ul>li:eq("+i+")>div:eq(1)").text() + " " + i);
        }
        else {
            nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 2)($("#" + par + ">.conItemList>ul>li:eq(" + i + ")>span").text());
            //alert($("#"+par+">.conItemList>ul>li:eq("+i+")>span").text() + " " + i);
        }

        nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 3)(par);

        nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 4)($("#nwModules").val());

        nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 5)(level.toString());

        nwLib.nwTempTable_RowData_Set("temptable", crnwRow, 6)(xcount.toString());

        xcount++;

        if (itemtyp == "0") {
            var xpar = $("#" + par + ">.conItemList>ul>li:eq(" + i + ")").attr("id");
            func_p8TreeGetDataLoop(xpar, level + 1);
        }
    }
}


function nwPDFPrint(printCode) {
    var isValid = true;

    //window.frameElement.a().print();
    //  window.frameElement('PrintPreview').window.print();
    //  document.getElementById('PrintPreview').contentWindow.targetFunction();

    try {
        isValid = func_nwPrintPreview_PrintClick();

    }
    catch (err) { }

    //isValid = false;
    return isValid;
}

function nwPDFDownload(printCode) {
    var isValid = true;
    try {
        isValid = func_nwPrintPreview_DownloadClick();
    }
    catch (err) { }
    return isValid;
}



function nwPrintPreview_Print() {
    var strpath = "";
    strpath = $("#nwPrintPreviewCon").find("iframe.nwPrintPreview").attr("src");
    strpath = strpath.replaceAll("#printbutton", "");
    strpath += "#printbutton";
    $("#nwPrintPreviewCon").find("iframe.nwPrintPreview").attr("src", strpath);
    var el = document.getElementById('nwPrintPreview');
    getIframeWindow(el).nwPrintDocument();;

}

function nwPDFPrintFinal(printCode) {
    var isValid = true;

    try {
        func_nwPrintPreview_PrintDone();

    }
    catch (err) { }

    // console.log("success Print");
    //window.frameElement.a().print();
    //  window.frameElement('PrintPreview').window.print();
    //  document.getElementById('PrintPreview').contentWindow.targetFunction();
    //isValid = false;
    return isValid;
}

function Darat() {
    //console.log("success");
    return true;
}


//aagedit
function getIframeWindow(iframe_object) {
    var doc;
    if (iframe_object.contentWindow) {
        return iframe_object.contentWindow;
    }
    if (iframe_object.window) {
        return iframe_object.window;
    }

    if (!doc && iframe_object.contentDocument) {
        doc = iframe_object.contentDocument;
    }
    if (!doc && iframe_object.document) {
        doc = iframe_object.document;
    }
    if (doc && doc.defaultView) {
        return doc.defaultView;
    }

    if (doc && doc.parentWindow) {
        return doc.parentWindow;
    }
    return undefined;

}



function func_GetData(rdate) {
    //    for (var i = 0; i < $("script").length; i++) {
    //        try {
    //            if ($("script:eq(" + i + ")").attr("src") == undefined) continue;
    //            var xce = $("script:eq(" + i + ")").attr("src") + "?v=" + rdate;
    //            $("script:eq(" + i + ")").attr("src", xce);
    //         } catch (err) { }
    //    }

    //    for (var i = 0; i < $("link").length; i++) {
    //        try {
    //            if ($("link:eq(" + i + ")").attr("href") == undefined) continue;
    //            var xce = $("link:eq(" + i + ")").attr("href") + "?v=" + rdate;
    //            $("link:eq(" + i + ")").attr("href", xce);
    //        } catch (err) { }
    //    }
}

var nwTrustedLinks = ["www.fpti.com.ph", "translate.google.com", "translate.googleapis.com", "www.gstatic.com", "ssl.google-analytics.com", "docs.google.com", "www.google-analytics.com", "ajax.googleapis.com", "52.163.227.94"];
nwTrustedLinks.push(window.location.host);
nwTrustedLinks.push("noahapplication.com");
nwTrustedLinks.push("www.noahapplication.com");
nwTrustedLinks.push("mobile.noahapplication.com");
nwTrustedLinks.push("web.noahapplication.com");
nwTrustedLinks.push("tool.noahapplication.com");
nwTrustedLinks.push("dev.noahapplication.com");
nwTrustedLinks.push("apps.noahapplication.com");
nwTrustedLinks.push("app.noahapplication.com");
nwTrustedLinks.push("globe.moreforme.net");
nwTrustedLinks.push("fonts.googleapis.com");




nwTrustedLinks.push("gc.kis.v2.scr.kaspersky-labs.com");
nwTrustedLinks.push("ff.kis.v2.scr.kaspersky-labs.com");

nwTrustedLinks.push("apis.google.com");
nwTrustedLinks.push("accounts.google.com");

nwTrustedLinks.push("fli.promptus8.com");
nwTrustedLinks.push("bit.ly");


var crsecTempVar = "";
var detectInjection = function (knownHostsArray, vardetails) {

    var unknownHosts = [];
    var knownHosts = {};
    var foundHosts = {};

    if (nwisMobile != false) {
        // device detection
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
            nwisMobile = true;
    }




    if (nwBrowser == 'Safari' || nwBrowser == "IE") {

        var xscripts = document.getElementsByTagName('script');
        for (var i = 0; i < xscripts.length; i++) {
            try {

                // if ($("script:eq(" + i + ")").attr("src") == undefined) continue;
                var urlx = xscripts[i]["src"];
                var xidnex = urlx.replace("//", "@@").indexOf("/");
                if (xidnex < 0) xidnex = urlx.length;
                var host = urlx.substring(0, xidnex);
                var xindexlink = host.replace("//", "@@").indexOf("@@");
                if (xindexlink >= 0) { xindexlink += 2; host = host.substring(xindexlink); }

                // if (urlx.indexOf("https") >= 0)alert(urlx + "\n\n" + host);
                if (host == "") continue;

                if (!(nwTrustedLinks.indexOf(host.toLowerCase()) > -1)) {
                    unknownHosts.push(host);
                    crsecTempVar += "<br><br><u>" + host + "</u> : <b>" + "script" + "</b>-" + urlx;
                }
            } catch (err) {
            }
        }

        var xlink = document.getElementsByTagName('link');
        for (var i = 0; i < xlink.length; i++) {
            try {
                var urlx = xlink[i]["href"];
                var xidnex = urlx.replace("//", "@@").indexOf("/");
                if (xidnex < 0) xidnex = urlx.length;
                var host = urlx.substring(0, xidnex);
                var xindexlink = host.replace("//", "@@").indexOf("@@");
                if (xindexlink >= 0) { xindexlink += 2; host = host.substring(xindexlink); }
                if (host == "") continue;
                if (!(nwTrustedLinks.indexOf(host.toLowerCase()) > -1)) {
                    unknownHosts.push(host);
                    crsecTempVar += "<br><br><u>" + host + "</u> : <b>" + "link" + "</b>-" + urlx;
                }
            } catch (err) { }
        }

        var xiframe = document.getElementsByTagName('iframe');
        for (var i = 0; i < xiframe.length; i++) {
            try {
                var urlx = xiframe[i]["src"];
                var xidnex = urlx.replace("//", "@@").indexOf("/");
                if (xidnex < 0) xidnex = urlx.length;
                var host = urlx.substring(0, xidnex);
                var xindexlink = host.replace("//", "@@").indexOf("@@");
                if (xindexlink >= 0) { xindexlink += 2; host = host.substring(xindexlink); }

                if (host == "") continue;
                if (!(nwTrustedLinks.indexOf(host.toLowerCase()) > -1)) {
                    unknownHosts.push(host);
                    crsecTempVar += "<br><br><u>" + host + "</u> : <b>" + "iframe" + "</b>-" + urlx;
                }
            } catch (err) { }
        }


        return unknownHosts;
    }




    if (nwBrowser_getEntriesByType() == undefined && nwisMobile == false) {
        setTimeout(function () {
            func_AAGChecker("7778");
        }, 300);
    }



    var requests = window.performance.getEntriesByType("resource");


    for (var knownHost in knownHostsArray) {
        knownHosts[knownHostsArray[knownHost]] = true;
    }

    for (var requestIdx = 0; requestIdx < requests.length; requestIdx++) {
        var request = requests[requestIdx];
        var url = new URL(request.name);
        var host = url.host;

        // Aggregate all the requests from a host



        if (host in foundHosts) {
            foundHosts[host].push(request);
        }
        else {
            foundHosts[host] = new Array(request);
        }
    }

    for (var foundHost in foundHosts) {
        // If an unknown host is found, add it to a list.
        if (!(foundHost in knownHosts)) {


            if (foundHost == "") {
                continue; //aag
            }

            if (foundHost.toLowerCase().indexOf("localhost:") == 0) {

            } else {
                unknownHosts.push(foundHost);

                for (var i = 0; i < foundHosts[foundHost].length; i++) {
                    crsecTempVar += "<br><br><u>" + foundHost + "</u> : <b>" + foundHosts[foundHost][i]["initiatorType"] + "</b>-" + foundHosts[foundHost][i]["name"];
                }
            }

        }



    }




    return unknownHosts;
};

function nwCountChar(string) {
    var count = {};
    string.split('').forEach(function (s) {
        count[s] ? count[s]++ : count[s] = 1;
    });
    return count;
}

function nwGetDomain(url, subdomain) {
    subdomain = subdomain || false;

    url = url.replace(/(https?:\/\/)?(www.)?/i, '');

    if (!subdomain) {
        url = url.split('.');

        url = url.slice(url.length - 2).join('.');
    }

    if (url.indexOf('/') !== -1) {
        return url.split('/')[0];
    }

    return url;
}

window.addEventListener("load", function () {
    setTimeout(function () { nwSecCheckFile(); }, 500);
});

function nwSecCheckFile() {
    var vardetails;
    crsecTempVar = "";
    var scripts = detectInjection(nwTrustedLinks, vardetails);
    vardetails = crsecTempVar;


    //alert(scripts);
    if (!!scripts == true && scripts.length > 0) {
        for (var scriptsIdx = 0; scriptsIdx < scripts.length; scriptsIdx++) {
            var scr = scripts[scriptsIdx];
            // ga('send', 'event', 'load', 'unknown-host', scr, { 'nonInteraction': 1 });
            //nwconsole.warn("error: "+scr);
            func_AAGChecker("7777", scripts + vardetails); break;
        }
    }
}
var retrieveURL = function (filename) {
    var scripts = document.getElementsByTagName('script');
    if (scripts && scripts.length > 0) {
        for (var i in scripts) {
            if (scripts[i].src && scripts[i].src.match(new RegExp(filename + '\\.js$'))) {
                return scripts[i].src.replace(new RegExp('(.*)' + filename + '\\.js$'), '$1');
            }
        }
    }
};



//EDIT //06-06-2017 //ARM
function SaveToLogs(xlogid, xmenuitem, xremarks) {
    SaveToLogs(xlogid, xmenuitem, xremarks, "RunStandard");
}
function SaveToLogs(xlogid, xmenuitem, xremarks, xlink) {
    try {
        if (xmenuitem == "") xmenuitem = nwMenuID;
        nwParameter_AddResource("Log_Logid", xlogid);
        nwParameter_AddResource("Log_Remarks", xremarks);
        nwParameter_AddResource("Log_MenuItem", "Interface " + xmenuitem);
        func_ActionDriven("actSaveToLogs", false, xlink, "nwdontclearparams");

    } catch (err) { }
}

/*

*/
var CryptoJS = CryptoJS || function (u, p) {
    var d = {}, l = d.lib = {}, s = function () { }, t = l.Base = { extend: function (a) { s.prototype = this; var c = new s; a && c.mixIn(a); c.hasOwnProperty("init") || (c.init = function () { c.$super.init.apply(this, arguments) }); c.init.prototype = c; c.$super = this; return c }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } },
    r = l.WordArray = t.extend({
        init: function (a, c) { a = this.words = a || []; this.sigBytes = c != p ? c : 4 * a.length }, toString: function (a) { return (a || v).stringify(this) }, concat: function (a) { var c = this.words, e = a.words, j = this.sigBytes; a = a.sigBytes; this.clamp(); if (j % 4) for (var k = 0; k < a; k++) c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - 8 * (k % 4) & 255) << 24 - 8 * ((j + k) % 4); else if (65535 < e.length) for (k = 0; k < a; k += 4) c[j + k >>> 2] = e[k >>> 2]; else c.push.apply(c, e); this.sigBytes += a; return this }, clamp: function () {
            var a = this.words, c = this.sigBytes; a[c >>> 2] &= 4294967295 <<
            32 - 8 * (c % 4); a.length = u.ceil(c / 4)
        }, clone: function () { var a = t.clone.call(this); a.words = this.words.slice(0); return a }, random: function (a) { for (var c = [], e = 0; e < a; e += 4) c.push(4294967296 * u.random() | 0); return new r.init(c, a) }
    }), w = d.enc = {}, v = w.Hex = {
        stringify: function (a) { var c = a.words; a = a.sigBytes; for (var e = [], j = 0; j < a; j++) { var k = c[j >>> 2] >>> 24 - 8 * (j % 4) & 255; e.push((k >>> 4).toString(16)); e.push((k & 15).toString(16)) } return e.join("") }, parse: function (a) {
            for (var c = a.length, e = [], j = 0; j < c; j += 2) e[j >>> 3] |= parseInt(a.substr(j,
            2), 16) << 24 - 4 * (j % 8); return new r.init(e, c / 2)
        }
    }, b = w.Latin1 = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var e = [], j = 0; j < a; j++) e.push(String.fromCharCode(c[j >>> 2] >>> 24 - 8 * (j % 4) & 255)); return e.join("") }, parse: function (a) { for (var c = a.length, e = [], j = 0; j < c; j++) e[j >>> 2] |= (a.charCodeAt(j) & 255) << 24 - 8 * (j % 4); return new r.init(e, c) } }, x = w.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(b.stringify(a))) } catch (c) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return b.parse(unescape(encodeURIComponent(a))) } },
    q = l.BufferedBlockAlgorithm = t.extend({
        reset: function () { this._data = new r.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = x.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (a) { var c = this._data, e = c.words, j = c.sigBytes, k = this.blockSize, b = j / (4 * k), b = a ? u.ceil(b) : u.max((b | 0) - this._minBufferSize, 0); a = b * k; j = u.min(4 * a, j); if (a) { for (var q = 0; q < a; q += k) this._doProcessBlock(e, q); q = e.splice(0, a); c.sigBytes -= j } return new r.init(q, j) }, clone: function () {
            var a = t.clone.call(this);
            a._data = this._data.clone(); return a
        }, _minBufferSize: 0
    }); l.Hasher = q.extend({
        cfg: t.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { q.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (b, e) { return (new a.init(e)).finalize(b) } }, _createHmacHelper: function (a) {
            return function (b, e) {
                return (new n.HMAC.init(a,
                e)).finalize(b)
            }
        }
    }); var n = d.algo = {}; return d
}(Math);
(function () {
    var u = CryptoJS, p = u.lib.WordArray; u.enc.Base64 = {
        stringify: function (d) { var l = d.words, p = d.sigBytes, t = this._map; d.clamp(); d = []; for (var r = 0; r < p; r += 3) for (var w = (l[r >>> 2] >>> 24 - 8 * (r % 4) & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - 8 * ((r + 1) % 4) & 255) << 8 | l[r + 2 >>> 2] >>> 24 - 8 * ((r + 2) % 4) & 255, v = 0; 4 > v && r + 0.75 * v < p; v++) d.push(t.charAt(w >>> 6 * (3 - v) & 63)); if (l = t.charAt(64)) for (; d.length % 4;) d.push(l); return d.join("") }, parse: function (d) {
            var l = d.length, s = this._map, t = s.charAt(64); t && (t = d.indexOf(t), -1 != t && (l = t)); for (var t = [], r = 0, w = 0; w <
            l; w++) if (w % 4) { var v = s.indexOf(d.charAt(w - 1)) << 2 * (w % 4), b = s.indexOf(d.charAt(w)) >>> 6 - 2 * (w % 4); t[r >>> 2] |= (v | b) << 24 - 8 * (r % 4); r++ } return p.create(t, r)
        }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
})();
(function (u) {
    function p(b, n, a, c, e, j, k) { b = b + (n & a | ~n & c) + e + k; return (b << j | b >>> 32 - j) + n } function d(b, n, a, c, e, j, k) { b = b + (n & c | a & ~c) + e + k; return (b << j | b >>> 32 - j) + n } function l(b, n, a, c, e, j, k) { b = b + (n ^ a ^ c) + e + k; return (b << j | b >>> 32 - j) + n } function s(b, n, a, c, e, j, k) { b = b + (a ^ (n | ~c)) + e + k; return (b << j | b >>> 32 - j) + n } for (var t = CryptoJS, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++) b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0; r = r.MD5 = v.extend({
        _doReset: function () { this._hash = new w.init([1732584193, 4023233417, 2562383102, 271733878]) },
        _doProcessBlock: function (q, n) {
            for (var a = 0; 16 > a; a++) { var c = n + a, e = q[c]; q[c] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360 } var a = this._hash.words, c = q[n + 0], e = q[n + 1], j = q[n + 2], k = q[n + 3], z = q[n + 4], r = q[n + 5], t = q[n + 6], w = q[n + 7], v = q[n + 8], A = q[n + 9], B = q[n + 10], C = q[n + 11], u = q[n + 12], D = q[n + 13], E = q[n + 14], x = q[n + 15], f = a[0], m = a[1], g = a[2], h = a[3], f = p(f, m, g, h, c, 7, b[0]), h = p(h, f, m, g, e, 12, b[1]), g = p(g, h, f, m, j, 17, b[2]), m = p(m, g, h, f, k, 22, b[3]), f = p(f, m, g, h, z, 7, b[4]), h = p(h, f, m, g, r, 12, b[5]), g = p(g, h, f, m, t, 17, b[6]), m = p(m, g, h, f, w, 22, b[7]),
            f = p(f, m, g, h, v, 7, b[8]), h = p(h, f, m, g, A, 12, b[9]), g = p(g, h, f, m, B, 17, b[10]), m = p(m, g, h, f, C, 22, b[11]), f = p(f, m, g, h, u, 7, b[12]), h = p(h, f, m, g, D, 12, b[13]), g = p(g, h, f, m, E, 17, b[14]), m = p(m, g, h, f, x, 22, b[15]), f = d(f, m, g, h, e, 5, b[16]), h = d(h, f, m, g, t, 9, b[17]), g = d(g, h, f, m, C, 14, b[18]), m = d(m, g, h, f, c, 20, b[19]), f = d(f, m, g, h, r, 5, b[20]), h = d(h, f, m, g, B, 9, b[21]), g = d(g, h, f, m, x, 14, b[22]), m = d(m, g, h, f, z, 20, b[23]), f = d(f, m, g, h, A, 5, b[24]), h = d(h, f, m, g, E, 9, b[25]), g = d(g, h, f, m, k, 14, b[26]), m = d(m, g, h, f, v, 20, b[27]), f = d(f, m, g, h, D, 5, b[28]), h = d(h, f,
            m, g, j, 9, b[29]), g = d(g, h, f, m, w, 14, b[30]), m = d(m, g, h, f, u, 20, b[31]), f = l(f, m, g, h, r, 4, b[32]), h = l(h, f, m, g, v, 11, b[33]), g = l(g, h, f, m, C, 16, b[34]), m = l(m, g, h, f, E, 23, b[35]), f = l(f, m, g, h, e, 4, b[36]), h = l(h, f, m, g, z, 11, b[37]), g = l(g, h, f, m, w, 16, b[38]), m = l(m, g, h, f, B, 23, b[39]), f = l(f, m, g, h, D, 4, b[40]), h = l(h, f, m, g, c, 11, b[41]), g = l(g, h, f, m, k, 16, b[42]), m = l(m, g, h, f, t, 23, b[43]), f = l(f, m, g, h, A, 4, b[44]), h = l(h, f, m, g, u, 11, b[45]), g = l(g, h, f, m, x, 16, b[46]), m = l(m, g, h, f, j, 23, b[47]), f = s(f, m, g, h, c, 6, b[48]), h = s(h, f, m, g, w, 10, b[49]), g = s(g, h, f, m,
            E, 15, b[50]), m = s(m, g, h, f, r, 21, b[51]), f = s(f, m, g, h, u, 6, b[52]), h = s(h, f, m, g, k, 10, b[53]), g = s(g, h, f, m, B, 15, b[54]), m = s(m, g, h, f, e, 21, b[55]), f = s(f, m, g, h, v, 6, b[56]), h = s(h, f, m, g, x, 10, b[57]), g = s(g, h, f, m, t, 15, b[58]), m = s(m, g, h, f, D, 21, b[59]), f = s(f, m, g, h, z, 6, b[60]), h = s(h, f, m, g, C, 10, b[61]), g = s(g, h, f, m, j, 15, b[62]), m = s(m, g, h, f, A, 21, b[63]); a[0] = a[0] + f | 0; a[1] = a[1] + m | 0; a[2] = a[2] + g | 0; a[3] = a[3] + h | 0
        }, _doFinalize: function () {
            var b = this._data, n = b.words, a = 8 * this._nDataBytes, c = 8 * b.sigBytes; n[c >>> 5] |= 128 << 24 - c % 32; var e = u.floor(a /
            4294967296); n[(c + 64 >>> 9 << 4) + 15] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360; n[(c + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360; b.sigBytes = 4 * (n.length + 1); this._process(); b = this._hash; n = b.words; for (a = 0; 4 > a; a++) c = n[a], n[a] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360; return b
        }, clone: function () { var b = v.clone.call(this); b._hash = this._hash.clone(); return b }
    }); t.MD5 = v._createHelper(r); t.HmacMD5 = v._createHmacHelper(r)
})(Math);
(function () {
    var u = CryptoJS, p = u.lib, d = p.Base, l = p.WordArray, p = u.algo, s = p.EvpKDF = d.extend({ cfg: d.extend({ keySize: 4, hasher: p.MD5, iterations: 1 }), init: function (d) { this.cfg = this.cfg.extend(d) }, compute: function (d, r) { for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q;) { n && s.update(n); var n = s.update(d).finalize(r); s.reset(); for (var a = 1; a < p; a++) n = s.finalize(n), s.reset(); b.concat(n) } b.sigBytes = 4 * q; return b } }); u.EvpKDF = function (d, l, p) {
        return s.create(p).compute(d,
        l)
    }
})();
CryptoJS.lib.Cipher || function (u) {
    var p = CryptoJS, d = p.lib, l = d.Base, s = d.WordArray, t = d.BufferedBlockAlgorithm, r = p.enc.Base64, w = p.algo.EvpKDF, v = d.Cipher = t.extend({
        cfg: l.extend(), createEncryptor: function (e, a) { return this.create(this._ENC_XFORM_MODE, e, a) }, createDecryptor: function (e, a) { return this.create(this._DEC_XFORM_MODE, e, a) }, init: function (e, a, b) { this.cfg = this.cfg.extend(b); this._xformMode = e; this._key = a; this.reset() }, reset: function () { t.reset.call(this); this._doReset() }, process: function (e) { this._append(e); return this._process() },
        finalize: function (e) { e && this._append(e); return this._doFinalize() }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (e) { return { encrypt: function (b, k, d) { return ("string" == typeof k ? c : a).encrypt(e, b, k, d) }, decrypt: function (b, k, d) { return ("string" == typeof k ? c : a).decrypt(e, b, k, d) } } }
    }); d.StreamCipher = v.extend({ _doFinalize: function () { return this._process(!0) }, blockSize: 1 }); var b = p.mode = {}, x = function (e, a, b) {
        var c = this._iv; c ? this._iv = u : c = this._prevBlock; for (var d = 0; d < b; d++) e[a + d] ^=
        c[d]
    }, q = (d.BlockCipherMode = l.extend({ createEncryptor: function (e, a) { return this.Encryptor.create(e, a) }, createDecryptor: function (e, a) { return this.Decryptor.create(e, a) }, init: function (e, a) { this._cipher = e; this._iv = a } })).extend(); q.Encryptor = q.extend({ processBlock: function (e, a) { var b = this._cipher, c = b.blockSize; x.call(this, e, a, c); b.encryptBlock(e, a); this._prevBlock = e.slice(a, a + c) } }); q.Decryptor = q.extend({
        processBlock: function (e, a) {
            var b = this._cipher, c = b.blockSize, d = e.slice(a, a + c); b.decryptBlock(e, a); x.call(this,
            e, a, c); this._prevBlock = d
        }
    }); b = b.CBC = q; q = (p.pad = {}).Pkcs7 = { pad: function (a, b) { for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4) l.push(d); c = s.create(l, c); a.concat(c) }, unpad: function (a) { a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255 } }; d.BlockCipher = v.extend({
        cfg: v.cfg.extend({ mode: b, padding: q }), reset: function () {
            v.reset.call(this); var a = this.cfg, b = a.iv, a = a.mode; if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor; else c = a.createDecryptor, this._minBufferSize = 1; this._mode = c.call(a,
            this, b && b.words)
        }, _doProcessBlock: function (a, b) { this._mode.processBlock(a, b) }, _doFinalize: function () { var a = this.cfg.padding; if (this._xformMode == this._ENC_XFORM_MODE) { a.pad(this._data, this.blockSize); var b = this._process(!0) } else b = this._process(!0), a.unpad(b); return b }, blockSize: 4
    }); var n = d.CipherParams = l.extend({ init: function (a) { this.mixIn(a) }, toString: function (a) { return (a || this.formatter).stringify(this) } }), b = (p.format = {}).OpenSSL = {
        stringify: function (a) {
            var b = a.ciphertext; a = a.salt; return (a ? s.create([1398893684,
            1701076831]).concat(a).concat(b) : b).toString(r)
        }, parse: function (a) { a = r.parse(a); var b = a.words; if (1398893684 == b[0] && 1701076831 == b[1]) { var c = s.create(b.slice(2, 4)); b.splice(0, 4); a.sigBytes -= 16 } return n.create({ ciphertext: a, salt: c }) }
    }, a = d.SerializableCipher = l.extend({
        cfg: l.extend({ format: b }), encrypt: function (a, b, c, d) { d = this.cfg.extend(d); var l = a.createEncryptor(c, d); b = l.finalize(b); l = l.cfg; return n.create({ ciphertext: b, key: c, iv: l.iv, algorithm: a, mode: l.mode, padding: l.padding, blockSize: a.blockSize, formatter: d.format }) },
        decrypt: function (a, b, c, d) { d = this.cfg.extend(d); b = this._parse(b, d.format); return a.createDecryptor(c, d).finalize(b.ciphertext) }, _parse: function (a, b) { return "string" == typeof a ? b.parse(a, this) : a }
    }), p = (p.kdf = {}).OpenSSL = { execute: function (a, b, c, d) { d || (d = s.random(8)); a = w.create({ keySize: b + c }).compute(a, d); c = s.create(a.words.slice(b), 4 * c); a.sigBytes = 4 * b; return n.create({ key: a, iv: c, salt: d }) } }, c = d.PasswordBasedCipher = a.extend({
        cfg: a.cfg.extend({ kdf: p }), encrypt: function (b, c, d, l) {
            l = this.cfg.extend(l); d = l.kdf.execute(d,
            b.keySize, b.ivSize); l.iv = d.iv; b = a.encrypt.call(this, b, c, d.key, l); b.mixIn(d); return b
        }, decrypt: function (b, c, d, l) { l = this.cfg.extend(l); c = this._parse(c, l.format); d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt); l.iv = d.iv; return a.decrypt.call(this, b, c, d.key, l) }
    })
}();
(function () {
    for (var u = CryptoJS, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++) a[c] = 128 > c ? c << 1 : c << 1 ^ 283; for (var e = 0, j = 0, c = 0; 256 > c; c++) { var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4, k = k >>> 8 ^ k & 255 ^ 99; l[e] = k; s[k] = e; var z = a[e], F = a[z], G = a[F], y = 257 * a[k] ^ 16843008 * k; t[e] = y << 24 | y >>> 8; r[e] = y << 16 | y >>> 16; w[e] = y << 8 | y >>> 24; v[e] = y; y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e; b[k] = y << 24 | y >>> 8; x[k] = y << 16 | y >>> 16; q[k] = y << 8 | y >>> 24; n[k] = y; e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1 } var H = [0, 1, 2, 4, 8,
    16, 32, 64, 128, 27, 54], d = d.AES = p.extend({
        _doReset: function () {
            for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++) if (j < d) e[j] = c[j]; else { var k = e[j - 1]; j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255]) : (k = k << 8 | k >>> 24, k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255], k ^= H[j / d | 0] << 24); e[j] = e[j - d] ^ k } c = this._invKeySchedule = []; for (d = 0; d < a; d++) j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>>
            8 & 255]] ^ n[l[k & 255]]
        }, encryptBlock: function (a, b) { this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l) }, decryptBlock: function (a, c) { var d = a[c + 1]; a[c + 1] = a[c + 3]; a[c + 3] = d; this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s); d = a[c + 1]; a[c + 1] = a[c + 3]; a[c + 3] = d }, _doCryptBlock: function (a, b, c, d, e, j, l, f) {
            for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++) var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[n & 255] ^ c[p++], s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[g & 255] ^ c[p++], t =
            d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[h & 255] ^ c[p++], n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[k & 255] ^ c[p++], g = q, h = s, k = t; q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[n & 255]) ^ c[p++]; s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[g & 255]) ^ c[p++]; t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[h & 255]) ^ c[p++]; n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[k & 255]) ^ c[p++]; a[b] = q; a[b + 1] = s; a[b + 2] = t; a[b + 3] = n
        }, keySize: 8
    }); u.AES = p._createHelper(d)
})();


function encrypt(data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
}
function decrypt(data, key) {
    return CryptoJS.AES.decrypt(data, key).toString(CryptoJS.enc.Utf8);
}



var key = CryptoJS.enc.Utf8.parse('7766788782943247');
var iv = CryptoJS.enc.Utf8.parse('7766788782943247');
//function p8Encrypted(varstring){
//    return varstring;
//}
function p8Encrypted(varstring) {

    var encrypted = varstring;
    try {
        encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(varstring), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

    } catch (err) {
        nwconsole.log(err + "\n\n" + varstring);
    }
    return encrypted.toString();
}


function p8Decrypted(varstring) {

    var decrypted = varstring;
    try {
        decrypted = CryptoJS.AES.decrypt(CryptoJS.enc.Utf8.parse(varstring), key,
        {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

    } catch (err) {
        nwconsole.log(err + "\n\n" + varstring);
    }
    return decrypted.toString();
}

$(function () {

    //$('#expandToolbar').on('click', function () {
    //    expandToolbar();
    //});


});
$(document).on("click", "#expandToolbar", function () {
    expandToolbar();
});

//function expandToolbar() {
//    if (!$('#expandToolbar').hasClass('show')) {
//        //$('div#noah-webui-default-New, div#noah-webui-default-Save, div#noah-webui-default-Delete, div#noah-webui-default-Inquire, div#noah-webui-default-Process, div#noah-webui-default-Import, div#noah-webui-default-Export, div#noah-webui-default-Print').css('display', 'block');
//        $('#noah-webui-Toolbox').addClass('show');
//        $('#expandToolbar').addClass('show');
//    }
//    else {
//        //$('div#noah-webui-default-New, div#noah-webui-default-Save, div#noah-webui-default-Delete, div#noah-webui-default-Inquire, div#noah-webui-default-Process, div#noah-webui-default-Import, div#noah-webui-default-Export, div#noah-webui-default-Print').css('display', 'none');
//        $('#noah-webui-Toolbox').removeClass('show');
//        $('#expandToolbar').removeClass('show');
//    }
//}
function expandToolbar() {
    if (!$('#noah-webui-Toolbox').hasClass("show")) {
        //$('div#noah-webui-default-New, div#noah-webui-default-Save, div#noah-webui-default-Delete, div#noah-webui-default-Inquire, div#noah-webui-default-Process, div#noah-webui-default-Import, div#noah-webui-default-Export, div#noah-webui-default-Print').css('display', 'block');
        $('#noah-webui-Toolbox').addClass('show');
        $('#expandToolbar').addClass('show');
    }
    else {
        //$('div#noah-webui-default-New, div#noah-webui-default-Save, div#noah-webui-default-Delete, div#noah-webui-default-Inquire, div#noah-webui-default-Process, div#noah-webui-default-Import, div#noah-webui-default-Export, div#noah-webui-default-Print').css('display', 'none');
        $('#noah-webui-Toolbox').removeClass('show');
        $('#expandToolbar').removeClass('show');
    }
    $(window).resize();
}



var nwSnackbarTimeout;
var nwSnackbarTimeoutHide;
function ToastMessage(Message, time, position) {
    clearTimeout(nwSnackbarTimeout);
    clearTimeout(nwSnackbarTimeoutHide);


    $("#nwSnackbar").css("z-index", "100000000000000000000");
    $("#nwSnackbar").removeClass("top");
    if (position == "top") {
        $("#nwSnackbar").addClass("top");
    }
    else $("#nwSnackbar").addClass("bottom");





    if (time == undefined) time = 3000;
    var x = document.getElementById("nwSnackbar");
    $("#nwSnackbar").html(Message);
    $("#nwSnackbar").addClass("show");



    nwSnackbarTimeout = setTimeout(function () {
        $("#nwSnackbar").removeClass("show");
        $("#nwSnackbar").addClass("hide");
        nwSnackbarTimeoutHide = setTimeout(function () { $("#nwSnackbar").attr("class", ""); }, 1000);
    }, time);
}




$.fn.nwRemarks = function (option) {
    //hdrRemarks
    var remarksTitle = "Remarks";
    if (option.title != undefined) remarksTitle = option.title;
    if (option.type != undefined) option.type = option.type;

    var xtype = " ishtml='false' haveremarkstag='true' ";
    if (option.type == "html") xtype = " ishtml='true' haveremarkstag='true' ";

    this.addClass("nwRemarks");
    this.html("<div class='nwRemarksCon'><button style='min-width:100px; padding:3px;' class='btnnwRemarks' " + xtype + ">" + remarksTitle + "</button><textarea class='txtnwRemarks' style='display:none'></textarea></div>");
}
$(document).on("click", ".btnnwRemarks", function () {
    func_xcallRemarks(this);


    return false;
});



$.fn.CMS = function (option) {
    if (option == undefined) option = {};
    this.addClass("nwCMS");

    var size = ""; var defsize = (option.fontSize || "12px");
    var defsizeint = option.fontSize || "12px";
    defsizeint = defsizeint.replace("px", "");

    var fontfamily = "<option style='font-family:Arial'>Arial</option> <option style='font-family:Algerian'>Algerian</option> <option style='font-family:Calibri'>Calibri</option> <option style='font-family:Comic Sans MS'>Comic Sans MS</option> <option style='font-family:Monotype Corsiva'>Monotype Corsiva</option> <option style='font-family:Tahoma'>Tahoma</option> <option style='font-family:Verdana'>Verdana</option>";
    for (var i = 8; i <= 72; i++) {
        if ((defsizeint || 12) == i)
            size += "<option selected>" + i + "</option>";
        else
            size += "<option>" + i + "</option>";
    }

    var conheight = $(this).height();

    //defheight

    this.html("<div class='nwCMSButton'> <div class='nwCMSButtonGrp'> <button class='nwCMSBold'>B</button> <button class='nwCMSItalic'>I</button> <button class='nwCMSUnderline'>U</button> </div> <div class='nwCMSButtonGrp'> <div class='nwCMSBgColorBut' ><div><span style='background-color:yellow; font-size:9px; '>ab</span></div><div class='span' style='background-color:yellow'></div></div> <input class='nwCMSBgColor' value='white' type='color'> <div class='nwCMSTextColorBut'><div style='color:darkblue'>A</div><div class='span' ></div></div> <input class='nwCMSTextColor' value='black' type='color'> </div> <div class='nwCMSButtonGrp'> <select class='nwCMSFontFamily'>" + fontfamily + " </select> <select class='nwCMSFontSize'>" + size + "</select> </div> <div class='nwCMSButtonGrp'> <div class='nwCMSButtonLeft'> <hr/> <hr/> <hr/> <hr/> <hr/> <hr/> </div> <div class='nwCMSButtonCenter'> <hr/> <hr/> <hr/> <hr/> <hr/> <hr/> </div> <div class='nwCMSButtonRight'> <hr/> <hr/> <hr/> <hr/> <hr/> <hr/> </div> </div> </div> <div class='nwCMSContent' contenteditable='true' style='overflow: auto;font-size:" + defsize + ";height:" + defheight + "'></div>");

    var defheight = conheight - ($(this).find(".nwCMSBgColorBut").outerHeight() + parseInt($(this).find(".nwCMSBgColorBut").css("padding-top").replace("px", "")) + parseInt($(this).find(".nwCMSBgColorBut").css("padding-bottom").replace("px", "")) + parseInt($(this).find(".nwCMSContent").css("padding-top").replace("px", "")) + parseInt($(this).find(".nwCMSContent").css("padding-bottom").replace("px", ""))) - 8;
    $(this).find(".nwCMSContent").height(defheight);

    $(this).find('div.nwCMSContent[contenteditable]').bind('paste', function (e) {
        try {
            var data = e.originalEvent.clipboardData.items[0].getAsFile();
            var elem = this;
            var fr = new FileReader;
            fr.onloadend = function () {
                var img = new Image;
                img.onload = function () {
                    $(elem).append(img);
                };
                img.src = fr.result;
            };
            // fr.readAsDataURL(data);
        } catch (err) {

        }
        setTimeout(function () {
            $('div.nwCMSContent table[border="0"]').attr("border", "1");
            $('div.nwCMSContent table[cellpadding="0"]').attr("cellpadding", "2");
        }, 10);
    });


    //$(this).find(".nwCMSFontSize").val((option.fontSize || 12));
};

$.fn.CMSContent = function (option) {
    // for old code
    var value = $(this).find(".nwCMSContent").html();
    if (option == "text" && value != undefined) {
        value = $(this).find(".nwCMSContent").text();
        return value;
    }
    if (option == undefined) {
        value = $(this).html();
        return value;
    }
    return value;
};


//
function func_CMSresize(id) {
    var xheight = $("#" + id).outerHeight() - $("#" + id + " > .nwCMSButton").outerHeight() - 22;
    $("#" + id + " .nwCMSContent").height(xheight);
}


$.fn.CMSContentHTML = function (value) {
    if (value != undefined) $(this).find(".nwCMSContent").html(value);
    var value = $(this).find(".nwCMSContent").html();
    if (value == undefined) {
        value = $(this).html();
    }
    if (value.indexOf("CMSdefsize") >= 1) {

    }
    else {
        value = "<span CMSdefsize style='font-size:" + $(this).find(".nwCMSContent").css("font-size") + "'>" + value + "</span>";
    }


    return value;
};
$.fn.CMSContentText = function (value) {
    if (value != undefined) $(this).find(".nwCMSContent").text(value);
    var value = $(this).find(".nwCMSContent").text();

    if (value == undefined) {
        value = $(this).html();
    }
    return value;
};


function func_CMSAddObject(CMSID, content) {
    var parent = $("#" + CMSID);
    func_Highlight("fontSize", "7");
    $(parent).find('font[size=7]').html(content);
    $(parent).find('font[size=7]').css("font-size", "inherit");
    $(parent).find('font[size=7]').attr("size", "6");
}

$(document).on("click", ".nwCMS .nwCMSButtonGrp button", function (e) {
    e.preventDefault();
    return false;
});
$(document).on("change", ".nwCMS .nwCMSFontFamily", function (e) {
    func_Highlight("fontName", $(this).find("option:selected").text());
    e.preventDefault();
    return false;
});
$(document).on("change", ".nwCMS .nwCMSFontSize", function (e) {
    var value = $(this).find("option:selected").text();
    var parent = $(this).parents(".nwCMS");
    value = value.trim();
    func_Highlight("fontSize", value);
    $(parent).find('font[size=7]').css("font-size", value + "px");
    $(parent).find('font[size=7]').attr("size", "6");
    e.preventDefault();
    return false;
});

$(document).on("click", ".nwCMS .nwCMSBold", function (e) {
    func_Highlight("bold", "");
    return false;
});
$(document).on("click", ".nwCMS .nwCMSItalic", function (e) {
    func_Highlight("italic", "");
    return false;
});
$(document).on("click", ".nwCMS .nwCMSUnderline", function (e) {
    func_Highlight("underline", "");
    return false;
});

$(document).on("click", ".nwCMS .nwCMSBgColorBut", function (e) {
    var parent = $(this).parents(".nwCMS");
    $(parent).find(".nwCMSBgColor").click();
    return false;
});
$(document).on("change", ".nwCMS .nwCMSBgColor", function (e) {
    var parent = $(this).parents(".nwCMS");
    func_Highlight("backColor", $(parent).find(".nwCMSBgColor").val());
    $(this).val("");
    return false;
});

$(document).on("click", ".nwCMS .nwCMSTextColorBut", function (e) {
    var parent = $(this).parents(".nwCMS");
    $(parent).find(".nwCMSTextColor").click();

    return false;
});
$(document).on("change", ".nwCMS .nwCMSTextColor", function (e) {
    var parent = $(this).parents(".nwCMS");
    func_Highlight("foreColor", $(parent).find(".nwCMSTextColor").val());
    $(this).val("");
    return false;
});
$(document).on("click", ".nwCMS .nwCMSButtonLeft", function (e) {
    var parent = $(this).parents(".nwCMS");
    func_Highlight("justifyLeft", "");
    return false;
});
$(document).on("click", ".nwCMS .nwCMSButtonCenter", function (e) {
    var parent = $(this).parents(".nwCMS");
    func_Highlight("justifyCenter", "");
    return false;
});
$(document).on("click", ".nwCMS .nwCMSButtonRight", function (e) {
    var parent = $(this).parents(".nwCMS");
    func_Highlight("justifyRight", "");
    return false;
});

function func_MakeEditableAndHighlight(attr, value) {
    var range, sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    document.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    // Use HiliteColor since some browsers apply BackColor to the whole block
    if (document.execCommand("HiliteColor", false, value)) {
        document.execCommand(attr, false, value);
    }
    else {
        document.execCommand(attr, false, value);
    }
    document.designMode = "off";
}
function func_Highlight(attr, value) {
    var range, sel;
    if (window.getSelection) {
        // IE9 and non-IE
        try {
            if (!document.execCommand(attr, true, value)) {
                func_MakeEditableAndHighlight(attr, value);
            }
        } catch (ex) {
            func_MakeEditableAndHighlight(attr, value);
        }
    } else if (document.selection && document.selection.createRange) {
        // IE <= 8 case
        range = document.selection.createRange();
        range.execCommand(attr, true, value);
    }
}



function func_LanguageConvertLang(json) {
    for (var i = 0; i < json.length; i++) {
        var ID = json[i].ID;
        var Code = json[i].Code;
        var Content = json[i].Content;
        var ContentLang = json[i].ContentLang;
        var ObjectID = json[i].ObjectID;
        var Rownum = json[i].Rownum;

        if (ContentLang.trim() == "")
            continue;


        try {
            $(ObjectID).attr("convertHTML", ContentLang);
            $(ObjectID).html($(ObjectID).html().replaceAll(Content, ContentLang));
        } catch (err) { }
    }
}

function func_LanguageConvert(json, jsonOrig, lang) {

    $("body").attr("nwlang", lang);
    $("body").attr("nwlang2", lang);

    for (var i = 0; i < jsonOrig.length; i++) {
        var ID = jsonOrig[i].ID;
        var Code = jsonOrig[i].Code;
        var Content = jsonOrig[i].Content;
        var ContentLang = jsonOrig[i].ContentLang;
        var ObjectID = jsonOrig[i].ObjectID;
        var Rownum = jsonOrig[i].Rownum;

        try {
            $(ObjectID).attr("origHTML", Content);
            $(ObjectID).addClass("nwLangConvert");
        } catch (err) { }

    }

    jsonLang = json;
    jsonLangOrig = jsonOrig;

    func_LanguageConvertLang(jsonLang);



}

function func_LanguageRevert() {
    var lang = $("body").attr("nwlang") || "";

    for (var i = 0; i < $(".nwLangConvert").length; i++) {
        var Content = ""; var ContentLang = "";
        var ObjectID = $(".nwLangConvert:eq(" + i + ")");

        if (lang != "") {
            ContentLang = $(".nwLangConvert:eq(" + i + ")").attr("origHTML");
            Content = $(".nwLangConvert:eq(" + i + ")").attr("convertHTML");
        }
        else {
            Content = $(".nwLangConvert:eq(" + i + ")").attr("origHTML");
            ContentLang = $(".nwLangConvert:eq(" + i + ")").attr("convertHTML");
        }


        $(ObjectID).html($(ObjectID).html().replaceAll(Content, ContentLang));
    }
    if (lang != "") { $("body").attr("nwlang", ""); }
    else { $("body").attr("nwlang", $("body").attr("nwlang2")); }
}

function func_LanguageID(strID) {
    var xindex = strID.lastIndexOf("#");
    try {
        return strID.substring(xindex, strID.length);
    } catch (err) {
        return strID;
    }
}
// ©@
$(document).on("keydown", "body", function (e) {


    if (e.which == 71 && e.ctrlKey && nwDevMode == true) {

        if ($("#aagLanguageEditor").html() != undefined) {

        } else {
            funct_LanguageGet();
            var contentx = "<div id='aagLanguageEditor' style='box-shadow: 2px 2px 5px #b9b9b9;width:460px;min-height: 490px;max-height: 400px;position: fixed;overflow: hidden;z-index: 100000;background-color: rgba(255, 255, 255, 0.85);'>";
            contentx += "<div class='langHeader'>";
            contentx += "<div class='langHeaderContent'>";
            contentx += "<select id='langList'></select><button id='langBtnSave'>Save</button>";
            contentx += "</div>";
            contentx += "</div>";




            contentx += "<div class='langContent'></div></div>";
            $("body").append(contentx);
            $('#aagLanguageEditor').draggable({
                handle: "div.langHeader", scroll: false, delay: 0,
                stop: function () {
                    func_WindowDragStop(this);
                }
            }); //handle: "div.dimMessageBoxHeader",
            $('#aagLanguageEditor').resizable();
            //nwPopupForm_Create("aagLanguageEditor", true);

            $("#langList").html("<option>select</option>");
            for (var i = 0; i < jsonLangList.length; i++) {
                $("#langList").append("<option value='" + jsonLangList[i].Code + "'>" + jsonLangList[i].Description + "</option>");
            }
        }


        nwPopupForm_Modal('aagLanguageEditor');
        var content = "";
        var contentlib = "";
        content += "<style>";

        content += "div#aagLanguageEditor{font-family: Verdana;font-size: 12px;}";
        content += ".langContent{overflow: auto; max-height: 438px;margin-top: 36px;}";
        content += ".langHeader{min-height:25px;background-color:#AEAEAE;position: fixed; width: inherit;}";
        content += ".LangitemObject div.SubText{font-size: 9px;}";
        content += ".LangitemObject span{font-weight: bold; color: #3b4667;}";
        content += ".langHeaderContent {padding: 6px;}";



        content += ".Langitem{margin:3px;border:1px solid gray;padding: 5px; border-radius: 4px;}";
        content += ".LangitemGroup{ margin: 5px; border: 1px solid #d8d8d8;}";


        content += ".LangitemOrginalText{padding:3px;min-height: 16px;background-color: #f6f6f6;padding-left:88px;}";
        content += ".LangitemOrginalText:before{margin-left: -85px;width: 85px; content: 'full text';font-size: 12px;font-weight: bold;color: #005003;display: inline-block;}";

        content += ".LangitemOrginalText{-webkit-user-select: text;-moz-user-select: text;-ms-user-select: text;user-select: text;}";



        content += ".LangitemOrginal{padding:3px;min-height: 16px;background-color: #ffffbf;padding-left:88px;}";
        content += ".LangitemOrginal:before{margin-left: -85px;width: 85px; content: 'text';font-size: 12px;font-weight: bold;color: #01388a;display: inline-block;}";

        content += ".LangitemConvert{padding:3px;min-height: 16px;padding-left:88px;background-color: #ffffff;}";
        content += ".LangitemConvert:before{margin-left: -85px;width: 85px; content: 'converted';font-size: 12px;font-weight: bold;color: #880000;display: inline-block;}";


        content += ".LangSubTitle{font-size:16px ;font-weight: bold;background-color: #005400; color: white; padding: 10px;}";
        content += ".LangSubCon{margin-top:15px;}";
        content += "</style>";

        content += "<div style='padding:5px;padding-top:0px;'>";

        content += "";
        var content1 = "";
        var content2 = "";
        var contentTemp = "";

        var contenteditble = "plaintext-only";

        if (nwBrowser == 'Firefox') contenteditble = "true";

        for (var i = 0; i < jsonLangOrig.length; i++) {
            contentTemp = "";
            contentTemp += "<div nwid='" + jsonLangOrig[i].ObjectID + "' class='Langitem'>";

            contentTemp += "<div class='LangitemObject'><span>";
            contentTemp += func_LanguageID(jsonLangOrig[i].ObjectID);
            contentTemp += "</span><div class='SubText'>";
            contentTemp += jsonLangOrig[i].ObjectID;
            contentTemp += "</div>";
            contentTemp += "</div>";


            contentTemp += "<div class='LangitemOrginalText'>";
            contentTemp += jsonLangOrig[i].Content;
            contentTemp += "</div>";


            var jsonTemp = nwJson(jsonLang, "ObjectID", jsonLangOrig[i].ObjectID);

            for (var i2 = 0; i2 < jsonTemp.length; i2++) {
                contentTemp += "<div class='LangitemGroup'>";
                contentTemp += "<div class='LangitemOrginal' contenteditable='" + contenteditble + "'>";
                contentTemp += jsonTemp[i2].Content;
                contentTemp += "</div>";
                contentTemp += "<div class='LangitemConvert' contenteditable='" + contenteditble + "'>";
                contentTemp += jsonTemp[i2].ContentLang;
                contentTemp += "</div>";
                contentTemp += "</div>";
            }




            contentTemp += "</div>";

            if (jsonLangOrig[i].ObjectType == "lib")
                content2 += contentTemp;
            else
                content1 += contentTemp;
        }

        content += "<div nwobjectType='' class='LangSubCon'><div class='LangSubTitle'>Content</div>";
        content += content1 + "</div>";

        content += "<div nwobjectType='lib' class='LangSubCon'><div class='LangSubTitle'>Library based</div>";
        content += content2 + "</div>";




        content += "</div>";

        $('#aagLanguageEditor .langContent').html(content + contentlib);
        //nwPopupForm_Show("aagLanguageEditor");
        return false;
    }
});


$(document).on("click", "#langBtnSave", function () {

    nwParameter_Add("nwLang", $('#langList option:selected').val());
    var standardCrLnk = crSTDLnk;


    var jsonText = [];
    var jsonTextTrans = [];
    var objx = $('#aagLanguageEditor');
    for (var i = 0; i < objx.find(".Langitem").length; i++) {
        var item = objx.find(".Langitem:eq(" + i + ")");

        jsonText.push({
            Code: crLnkGateKey
            , Content: item.find(".LangitemOrginalText").text()
            , ObjectID: item.attr("nwid")
            , ObjectType: item.parents(".LangSubCon").attr("nwobjectType")
            , Rownum: 1
        });

        for (var i2 = 0; i2 < item.find(".LangitemGroup").length; i2++) {
            var itemG = item.find(".LangitemGroup:eq(" + i2 + ")");
            jsonTextTrans.push({
                Code: crLnkGateKey
              , Content: itemG.find(".LangitemOrginal").text()
              , ContentLang: itemG.find(".LangitemConvert").text()
              , Lang: $('#langList').val()
              , ObjectID: item.attr("nwid")
              , ObjectType: item.parents(".LangSubCon").attr("nwobjectType")
              , Rownum: i2 + 1
            });

        }

    }

    nwParameter_Add("jsonText", JSON.stringify(jsonText));
    nwParameter_Add("jsonTextTrans", JSON.stringify(jsonTextTrans));
    nwLoading_Start("actLanguageSave", crLoadingHTML);
    func_ActionDriven("actLanguageSave", false, standardCrLnk);


});


var jsonLangOrig = [];
var jsonLang = [];
var jsonLang2 = [];
var jsonLangList = [];
function funct_LanguageGet() {

    $("*").each(function (index) {
        var tagname = $(this).prop("tagName");
        var content = $(this).html();
        var contentText = $(this).text();
        if (tagname == undefined) tagname = "";
        if ($(this).find("input").html() != undefined
          || $(this).find("style").html() != undefined
          || $(this).find("script").html() != undefined
          || $(this).find("textarea").html() != undefined
          || $(this).find("div").html() != undefined
          || $(this).find("table").html() != undefined
          || $(this).find("tr").html() != undefined
          || $(this).find("td").html() != undefined
          || $(this).find("svg").html() != undefined
          || $(this).find("button").html() != undefined
          || $(this).find("select").html() != undefined
          || $(this).find("option").html() != undefined
            //|| $(this).find("span").html() != undefined
            //|| $(this).find("a").html() != undefined
            //|| $(this).find("b").html() != undefined
            //|| $(this).find("i").html() != undefined
            //|| $(this).find("u").html() != undefined
            //|| $(this).find("strong").html() != undefined


          || $(this).parents(".BoxResize").html() != undefined
          || $(this).hasClass("BoxClose")
          || $(this).hasClass("BoxResize")



          || tagname.toUpperCase() == "NOSCRIPT"
          || tagname.toUpperCase() == "STYLE"
          || tagname.toUpperCase() == "SCRIPT"
          || tagname.toUpperCase() == "SVG"
          || tagname.toUpperCase() == "G"
          || tagname.toUpperCase() == "PATH"
          || tagname.toUpperCase() == "CIRCLE"




          || content.trim() == ""
          ) {

        }
        else {
            var xobject = $(this);
            var objx = $(xobject).clone();
            $(objx).find("a,b,i,u,strong,h1,h2,h3,h4,h5,h6,font,span").remove();
            content = objx.html().trim();
            contentText = objx.text().trim();

            if (contentText.trim() != "") {
                var dataID = "";

                var tagName = $(xobject).prop("tagName");
                var i = 0; var varTrue = true;

                var isnwLibObj = false;

                if ($(xobject).parents(".nwLibObj").html() != undefined)
                    isnwLibObj = true;




                while (base_x != "HTML") {
                    if (i > 21) break;
                    i++;
                    varTrue = true;
                    var base_x = $(xobject).prop("tagName");

                    if ((base_x + "").indexOf("ASP:") >= 0) continue;
                    if (base_x == undefined
                     || base_x == "HTML" || base_x == "BODY" || base_x == "HEAD") varTrue = false;

                    if ($(xobject).hasClass("nwLibObj")) varTrue = false;


                    var id_x = $(xobject).attr("id");
                    var class_x = $(xobject).attr("class");
                    var index_x = $(xobject).index();

                    if (id_x == undefined) id_x = "";
                    else id_x = "#" + id_x;
                    if (class_x == undefined) class_x = "";
                    else {
                        class_x = class_x.trim();
                        class_x = "." + class_x.replaceAll("undefined", "").replaceAll("  ", " ").replaceAll("  ", " ").replaceAll("  ", " ").replaceAll(" ", ".");
                    }

                    if (varTrue)
                        dataID = base_x + ":nth-child(" + (index_x + 1) + ")" + id_x + class_x + " " + dataID;
                    else
                        dataID = base_x + id_x + class_x + " " + dataID;


                    if (varTrue == false) break;

                    xobject = $(xobject).parent();
                }

                dataID = dataID.replaceAll(".nwLangConvert", "");
                dataID = dataID.trim();



                // console.log(dataID + " : " + content.trim());
                var Rownum = 1;
                var ID = crLnkGateKey + "-" + dataID + "-" + (Rownum + "");
                var lang = $("body").attr("nwlang2");
                var lib = isnwLibObj ? "lib" : "";



                if (tagname.toUpperCase() == "OPTION") {
                    if (nwJsonSearchIndex(jsonLang2, "ID", ID, false) < 0) {
                        jsonLang2.push({
                            Content: content.trim()
                             , Code: crLnkGateKey
                             , ObjectID: dataID
                             , Rownum: 1
                             , ContentLang: ""
                             , Lang: lang
                             , ObjectType: lib
                             , ID: ID
                        });

                    }
                }
                else {
                    if (nwJsonSearchIndex(jsonLang, "ID", ID, false) < 0) {
                        jsonLang.push({
                            Content: content.trim()
                             , Code: crLnkGateKey
                             , ObjectID: dataID
                             , Rownum: 1
                             , ContentLang: ""
                             , Lang: lang
                             , ObjectType: lib
                             , ID: ID
                        });



                        jsonLangOrig.push({
                            Content: content.trim()
                             , Code: crLnkGateKey
                             , ObjectID: dataID
                             , Rownum: 1
                             , ObjectType: lib
                             , ID: ID
                        });
                    }
                }

            }
        }

    });
}





var varnwtexteareEnter;


//  changes mouse cursor when highlighting loawer right of box
$(document).on('mousemove', '.nwGrid tr td textarea.nwtexteareEnter', function (e) {
    var a = $(this).offset().top + $(this).outerHeight() - 16,	//	top border of bottom-right-corner-box area
        b = $(this).offset().left + $(this).outerWidth() - 16;	//	left border of bottom-right-corner-box area
    $(this).css({
        cursor: e.pageY > a && e.pageX > b ? 'nw-resize' : ''
    });
})

//  the following simple make the textbox "Auto-Expand" as it is typed in
.on('keyup', '.nwGrid tr td textarea.nwtexteareEnter', function (e) {
    //  the following will help the text expand as typing takes place

    var getcurrscroll = $(this).parents('.tblGrid_Panel1').scrollTop();

    $(this).height(12);

    //------ JMR (Adding height)
    $(this).height($(this).height() + (this.scrollHeight - 10));
    $(this).parents('.tblGrid_Panel1').scrollTop(getcurrscroll);


});


function func_nwGrid_nwtexteareEnterResize(nwGridID) {
    setTimeout(function () {
        $.each($("#" + nwGridID + ' tr td textarea.nwtexteareEnter'), function (index, object) {
            $(this).height(12);

            var ix = 0;
            while ($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
                $(this).height($(this).height() + 2);
                // $(this).outerHeight($(this).outerHeight() + 1);
                // $(this).css("height", $(this).outerHeight() + 1 + "px");
                ix++;
                if (ix >= 1000) break;

            };
        });
    }, 100);
}


$(document).on("click", "#noah-webui-default-New", function () {
    $(document).find("#noah-webui-Toolbox, #expandToolbar").removeClass("show");
});





function func_SpreadExport(varID) {
    setTimeout(function () {
        nwLoading_Start("actExportConfigsConfig", crLoadingHTML);
    }, 1);
    setTimeout(function () {
        nwParameter_Add_Spread(varID);

        nwLoading_End("actExportConfigsConfig");
    }, 1);


    func_ExportGrid(varID);

}
function func_SpreadCreated(spreadID) {
    var isclass = $("#" + spreadID).parents(".noah-webui-container").hasClass("noah-webui-container");
    try {
        p8Spread_Created(spreadID);
    } catch (err) {

    }

    if (isclass) {
        setTimeout(function () {
            func_SpreadResizeonContainer($("#" + spreadID).parents(".noah-webui-container"));
            //$("#" + spreadID).parents(".noah-webui-container").height($("#" + spreadID).parents(".noah-webui-container").height()+5);
        }, 210);
        setTimeout(function () {
            if ($("#" + spreadID).html().trim() == "") {
                P8DataList[spreadID][0].sheet.ActiveSheet.Refresh();
                setTimeout(function () {
                    $("#" + spreadID + "_P8Spread_ScrollBot").click();
                    $("#" + spreadID + "_P8Spread_ScrollUp").click();
                }, 1000);
            }
        }, 500);
        setTimeout(function () {
            if ($("#" + spreadID).html().trim() == "") {
                P8DataList[spreadID][0].sheet.ActiveSheet.Refresh();
                setTimeout(function () {
                    $("#" + spreadID + "_P8Spread_ScrollBot").click();
                    $("#" + spreadID + "_P8Spread_ScrollUp").click();
                }, 1000);
            }
        }, 1000);
        setTimeout(function () {
            if ($("#" + spreadID).html().trim() == "") {
                P8DataList[spreadID][0].sheet.ActiveSheet.Refresh();
                setTimeout(function () {
                    $("#" + spreadID + "_P8Spread_ScrollBot").click();
                    $("#" + spreadID + "_P8Spread_ScrollUp").click();
                }, 1000);
            }
        }, 2000);

    }

    if (spreadID == 'nwExportContainer') {
        var strtitle = $('#nwExportContainer').attr("p8title") || "";
        if (strtitle.indexOf("Exported Data") >= 0 && (baseTitle || "") != "") {
            strtitle = baseTitle + " " + "Listing";
            $('#nwExportContainer').attr("p8title", strtitle);
        }
        $("#nwExportContainerMain .modal-hdr-title").text(strtitle);
    }
}


function func_SpreadResizeonContainer(_this) {
    var containerID = $(_this).find("div.P8Spread").attr("id");
    setTimeout(function () {
        var heightorig = $(_this).outerHeight();
        var height = $(_this).outerHeight() - 55;

        if ($(_this).find("div.P8Spread").find("table.P8Spread_HeaderButtons").html() != undefined)
            height = height - $(_this).find("div.P8Spread").find("table.P8Spread_HeaderButtons").outerHeight();

        $(_this).find("div.P8Spread").height(height);
        $(_this).css("overflow-y", "hidden");
        setTimeout(function () {
            _sfResizeScroll(containerID);
        }, 10);
    }, 10);

    setTimeout(function () {
        _sfResizeScroll(containerID);
    }, 600);


}





var Parser = {
    isNumber: function (value) {
        var fvalue = true;
        try {
            if (isNaN(fvalue)) fvalue = false;
        } catch (err) {
            fvalue = false;
        }
        return fvalue;
    },
    ParseDouble: function (value) {
        var fvalue = 0.0;
        try {
            fvalue = parseFloat(value + "");
        } catch (err) {

        }
        return fvalue;
    },
    ParseDecimal: function (value) {
        var fvalue = 0.0;
        try {
            fvalue = parseFloat(value + "");
        } catch (err) {

        }
        return fvalue;
    },
    ParseShort: function (value) {
        var fvalue = 0;
        try {
            fvalue = parseInt(value + "");
        } catch (err) {

        }
        return fvalue;
    },
    ParseString: function (value) {
        var fvalue = "";
        try {
            fvalue = value == undefined || value == NaN ? "" : (value + "");
        } catch (err) {

        }
        return fvalue;
    },
    ParseInt: function (value) {
        var fvalue = 0;
        try {
            fvalue = parseInt(value + "");
        } catch (err) {

        }
        return fvalue;
    }
};


(function () {
    if (window.hasRun === true)
        return true;  // Will ultimately be passed back to executeScript
    window.hasRun = true;
    // rest of code ... 
    // No return value here, so the return value is "undefined" (without quotes).
})();


var DW_PreviewJson = "";
var DW_URL = "";
function ShowDocWriterPreview(url, dtPreviewJson, filename, isModal) {
    var title = "";
    var fullength = "";
    title = "Document Writer Viewer";
    DW_PreviewJson = JSON.stringify(dtPreviewJson);
    DW_URL = url;
    fullength += url;

    if (fullength.indexOf("forms_standards/retrieve") <= 0)
        fullength += "forms_standards/retrieve/DocumentWriterViewer/index.html?";

    var frmlistParamSessionName = makeid(10);
    fullength += "&url=" + encodeURIComponent(url);
    fullength += "&frmlistParamSessionName=" + encodeURIComponent(frmlistParamSessionName);

    if (filename == undefined) filename = "Document";
    CookieSet(frmlistParamSessionName, filename, 1);

    nwPopupForm_Create("nwPopWindow", true, fullength);
    $('#nwPopWindow .BoxTitle').text(title);
    $("#nwPopWindow").css({ "width": "90%" });
    $("#nwPopWindow").css({ "height": "90%" });
    $('#nwPopWindow').find(".nwmenuFrame").attr("id", "framenwPopWindow");
    $('#nwPopWindow').find(".nwmenuFrame").attr("onload", "OnLoadDowWriter()");

    if (isModal == false) {
        nwPopupForm_Show("nwPopWindow");
        nwPopupForm_Modal("nwPopWindow");
    }
    else {
        nwPopupForm_ShowModal("nwPopWindow");
    }
}
function OnLoadDowWriter() {
    var receiverwindow = document.getElementById('framenwPopWindow').contentWindow;
    //DW_URL = DW_URL.replace("../../../..", origin);
    receiverwindow.postMessage(DW_PreviewJson, "*");
}
function en(c) {
    var x = 'charCodeAt', b, e = {}, f = c.split(""), d = [], a = f[0], g = 256; for (b = 1; b < f.length; b++) c =

    f[b], null != e[a + c] ? a += c : (d.push(1 < a.length ? e[a] : a[x](0)), e[a + c] = g, g++, a = c); d.push(1 < a.length ? e[a] :

    a[x](0)); for (b = 0; b < d.length; b++) d[b] = String.fromCharCode(d[b]); return d.join("")
}
function de(b) {
    var a, e = {}, d = b.split(""), c = f = d[0], g = [c], h = o = 256; for (b = 1; b < d.length; b++) a = d

    [b].charCodeAt(0), a = h > a ? d[b] : e[a] ? e[a] : f + c, g.push(a), c = a.charAt(0), e[o] = f + c, o++, f = a; return g.join("")

}
function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function DocumentWriter_Show(PDFUrl, DocnoJSON) {
    var docnoList = JSON.parse(DocnoJSON)
    var arrayDocno = nwCreate2DArray(docnoList.docnorownum.length);
    var ctr = 0;
    $.each(docnoList.docnorownum, function (e, item) {
        arrayDocno[ctr][0] = item.Docno;
        arrayDocno[ctr][1] = item.RowNum;
        ctr++;
    });
    nwLoadPrint(PDFUrl, arrayDocno);
}


function CookieGet(name) {
    var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
}
function CookieSet(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
}
function CookieDelete(name) { setCookie(name, '', -1); }


var GenLib = GenLib || {};
GenLib.MessageBoxQuestion = function (ID, message, title, icon) {
    this.id = ID;
    this.message = message || "";
    this.title = title || "";
    this.icon = icon || "question";
    this.buttonYes = function () { console.log(this.id + " yes") };
    this.buttonNo = function () { console.log(this.id + " no") };
    this.buttonOk = function () { console.log(this.id + " ok") };
    this.buttonCancel = function () { console.log(this.id + " cancel") };
    this.buttonClose = function () { console.log(this.id + " close") };
}
GenLib.MessageBoxQuestion.prototype.Show = function () {
    MessageBoxID_AAG = this;
    MessageBoxQuestion(this.message, this.title, this.icon);
}



GenLib.MessageBox = function (ID, message, title, icon) {
    this.id = ID;
    this.message = message || "";
    this.title = title || "";
    this.icon = icon || "info";
    this.buttonOk = function () { console.log(this.id + " ok") };
    this.buttonClose = function () { console.log(this.id + " close") };
}
GenLib.MessageBox.prototype.Show = function () {
    MessageBoxID_AAG = this;
    MessageBox(this.message, this.title, this.icon);
}

GenLib.MessageBoxInput = function (ID, message, title, icon) {
    this.id = ID;
    this.message = message || "";
    this.title = title || "";
    this.icon = icon || "info";

    this.buttonOk = function () { console.log(this.id + " ok") };
    this.buttonClose = function () { console.log(this.id + " close") };
}
GenLib.MessageBoxInput.prototype.Show = function () {
    MessageBoxID_AAG = this;
    MessageBox(this.message, this.title, this.icon, undefined, true);
}
GenLib.MessageBoxInput.prototype.InputValue = function () {
    return $("#txt-msg-msgvalue").val();
}
GenLib.MessageBoxInput.prototype.LabelText = function (value) {
    $("#mdlPrompt").find(".mdl-msg-label").hide();
    $("#mdlPrompt").find(".mdl-msg-label").text(value);
    $("#mdlPrompt").find(".mdl-msg-label").fadeIn(100);
}




function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

function nwValidateNumValue(total) {

    //console.log(total);
    if (total >= 100000000000000000.00 || total == NaN || (total + "") == "NaN") {
        MessageBox("Math Error.", "", "error");
        console.log("Math Error.");
        return false;
    } // aag Edit
    return true;
}

$(document).on("mousedown", "button.LookUp", function () {
    var isvalid = false;
    var eventx = $(this).attr("onclick") || "";
    if (eventx.indexOf("lookUp(this)") >= 0 || eventx == "") {
        lookUp(this);
        isvalid = false;
    }
    else {
        isvalid = true;
    }
    return isvalid;
});

function func_ImageEditorView(docno, serverPath, conid) {
    var fullength = crSTDImageEditor + "?TransactionNo=" + encodeURI(docno) + "&sl=" + encodeURI(serverPath);
    editmode = true;

    if (conid == undefined) conid = "";

    var imageCon = "nwImageEditor" + conid;

    nwLoading_Start('conLoadImageEditor', crLoadingHTML);
    nwPopupForm_Create(imageCon, true, fullength);
    $('#' + imageCon + ' .BoxTitle').text("Image Editor");
    $("#" + imageCon).css({ "min-width": "90%" });
    $("#" + imageCon).css({ "min-height": "90%" });
    nwPopupForm_ShowModal(imageCon);
    nwLoading_End('conLoadImageEditor');
}

function func_nwfixedUI() {
    var count = $(".P8Spread").length;

    for (var i = 0; i < count; i++) {
        var gridid = $(".P8Spread:eq(" + i + ")").attr("id");
        var xheight = $(".P8Spread:eq(" + i + ")").height();
        if (xheight <= 10) {
            xheight = 390;
            $(".P8Spread:eq(" + i + ")").height(xheight);
            $("#" + gridid + "_vw").height(xheight);
            $("#" + gridid + "_vw").attr("height", xheight);
        }
    }
    $(window).resize(); $(".nwGrid").find(".tblGridHeader th:eq(1)").resize();
}


function GOTOURL(url) {
    var spec = window.location.origin + window.location.pathname;
    if (spec.lastIndexOf("/") + 1 == spec.length)
        window.location = window.location.origin + window.location.pathname + url;//'../default/'
    else
        window.location = window.location.origin + window.location.pathname + '/' + url;//../default/'
}

function GetCurrentURL() {
    return window.location.protocol + "//" + window.location.host + (window.location.pathname + "/").replaceAll("//", "/");
}



/*Add To list function*/

$(function ($) {
    $.fn.loadAddtoList = function (opts) {
        var def = $.extend({
            id: this.attr("id"),
            list: ["List Name"],
            icon: false
        }, opts);


        return this.each(function () {
            let $this = $(this);
            //let ul = document.createElement("ul");
            var ul = "";

            // $this.addClass('tabContainer');
            $this.html("<div class='tabs-content'></div>");
            

            $.each(def.list, function (k, v) {
                //k = index  , v = text

                let val = v.replace(/[^a-zA-Z0-9]/g, '') || '';
                k++;
                let id = def.id + 'But-' + k;

                ul += "<input id='" + id + "' type='radio' class='tabs-rdb' checked='' name='" + def.id + "-tabs-f'>";
                ul += "<label for='" + id + "' class='tabs-lbl'>" + v + "</label>";

                ul += " <div class='tabs-text'>"
                      + "<div class='row'>"
                      + "<div class='col col-12 col-parent'>"
                      + "<div class='row'>"
                      + "<div class='col col-12'>"
                      + "<div class='btn-action-tab btn-add-list'>"
                      + "<div class='_btn-icon'></div>"
                      + "<div id='alt_" + val + "' nwtype='" + val + "' class='_lbl-txt btnGetlookup'>Add to list</div>"
                      + "</div>"
                      + "<div class='btn-action-tab btn-del-list'>"
                      + "<div class='_btn-icon'></div>"
                      + "<div class='_lbl-txt'>Clear list</div>"
                      + "</div>"
                      + "</div>"
                      + "</div>"
                      + "<div class='row'>"
                      + "<div class='col col-12'>"
                      + "<div class='nkTab-container _tab-container atlContainer' nwtype='" + val + "'><div class='innertext'></div></div>"
                      + "</div>"
                      + "</div>"
                      + "</div>"
                      + "</div>"
                      + "</div>";

            });
            $this.find(".tabs-content").append(ul);

        
                $("#" + def.id).find(".tabs-lbl:eq(0)").click();
          
            
        });

        //return true;
    };

}(jQuery));

$(document).on("click", ".btn-del-list", function () {
    $(this).parents(".tabs-text").find(".innertext").html("");
});


$(document).on("keypress", "#txtlookupsearchF", function (e) {
    if (e.which == 13) {
        lookUpLoadDataSetupRuntime();
        //$("#nkbtnsearch").click();
        return false;
    }
    
});
var nkisLookupReload = false;
$(document).on("click", "#nkbtnsearch", function (e) {
    var svalue = $("#txtlookupsearchF").val();
    nkisLookupReload = true;
    lookUpA($(".LookupID").text());
    //setTimeout(function () { $("#txtlookupsearchF").val(svalue); }, 100);
    return false;
});

$(document).on("change", "#nkcmb-mainfilter", function (e) {
    lookUpLoadDataSetupRuntime();
    return false;
});

function nk_ChangeParam(key, value) {
    const url = new URL(window.location);
    url.searchParams.set(key, value);
    window.history.pushState(null, '', url.toString());
}

function func_nwkInquire(primarykey) {
    if (primarykey == undefined || primarykey == "")
        primarykey = crinquireval;

    func_Toolbox_Clear();
    crnwcodevalue = primarykey;
    func_ToolboxData("#noah-webui-Toolbox-Grid", "toolbox");
    isNewRow = false;
}
function func_nwSTDButton(buttype) {

    if (buttype == "save") {
        $('#noah-webui-default-Save').enable(true);
        $('#noah-webui-default-Delete').enable(true);
        $('#noah-webui-default-Process').enable(true);
    }
    else if (buttype == "delete") {
        $('#noah-webui-default-Save').enable(false);
        $('#noah-webui-default-Delete').enable(false);
        $('#noah-webui-default-Process').enable(false);
    }
    else if (buttype == "process") {
        $('#noah-webui-default-Save').enable(false);
        $('#noah-webui-default-Delete').enable(false);
        $('#noah-webui-default-Process').enable(false);
    }
}

function func_nwsrcConvert(tkey) {
    return "url(" + crExportLnk + "?tct=ck&tck=" + tkey + ")";
}

$(document).tooltip({
    track: true
    , position: { my: "left+25 center", at: "right center" }

});


var curMouseoverIDLE = 0;
var MaxSessionMin = 60;
var MaxSessionSec = 60 * MaxSessionMin;
$(document).on("mouseover","body",function(){
    curMouseoverIDLE = 0;
});

setInterval(function(){
    curMouseoverIDLE +=1;
    if(curMouseoverIDLE >= MaxSessionSec){
        window.location = GetCurrentURL() + "../logout";
    }
}, 1000);

$(document).on("mouseover", ".descval", function () {
    var desc =  $(this).val();
    $(this).attr("title", desc);
});