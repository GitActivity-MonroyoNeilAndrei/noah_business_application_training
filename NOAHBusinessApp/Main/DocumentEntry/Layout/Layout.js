var $ServerLink = "";
const pageTitle = "";
//var jsonMainData = [];
var jsonNotifUnread = [];
var crLnkLayout = "";

var gen_disUname = "code";
var lnkHome = 0;

var jsonMainData;
var jsonMainCompany;

var nkmenutitle;
var nkmenuversion;
var isEmptyLayout = false;


function nkLocalStore(_jsonMainData, _jsonMainCompany) {
    localStorage["jsonMainData"] = _jsonMainData;
    localStorage["jsonMainCompany"] = _jsonMainCompany;
}

$(function () {
    try {
        if (jsonMainCompany == undefined) jsonMainCompany = [];
    } catch (err) { jsonMainCompany = []; }


    nwTrustedLinks.push('localhost');
    crLnkLayout = GetCurrentURL() + "../Layout/Layout_Gateway";
    setTimeout(function () {
        try {
            $("#btnLogoutF a").attr("href", GetCurrentURL() + "/account/LogOff/");
            nw_ReloadCompany();



            $("#uInfoLogTime").text(jsonMainData["UInfo"][0].userLoginLastFormat);

            var uname = jsonMainData["UInfo"][0].Description;
            var name = jsonMainData.UInfo[0].Code;

            $('#txtcUser').val(name); $('#txtcUser').prop("disabled", true);
            $('#txtcDesc').val(uname); $('#txtcDesc').prop("disabled", true);


            $('#uInfoName').text(uname);
            $('#uInfoType').text(name);
            $('#uInfoNameF').text(uname);
            $('#uInfoTypeF').text(name);
            $('#gtFname').text(uname);
            $('#dpAccountNo').html("");
            $('#dpAccountNoF').html("");
            for (var i = 0; i < jsonMainData["UPower"].length; i++) {
                var code = jsonMainData["UPower"][i]["code"];
                var desc = jsonMainData["UPower"][i]["description"];
                var user = jsonMainData["UPower"][i]["user"];
                if (gen_disUname == "code") desc = user;

                $('#dpAccountNo').append("<option nwvalue='" + user + "' value='" + code + "'>" + desc + "</option>");
                $('#dpAccountNoF').append("<option nwvalue='" + user + "' value='" + code + "'>" + desc + "</option>");
            }




            if (crUserSelect != "") {
                var scode = "";
                for (var i = 0; i < $("#dpAccountNo option").length; i++) {
                    var scode1 = $("#dpAccountNo").find("option:eq(" + i + ")").attr("nwvalue");
                    if (scode1 == crUserSelect) {
                        scode = $("#dpAccountNo").find("option:eq(" + i + ")").val();
                        break;
                    }
                }
                $("#dpAccountNo").val(scode);
                $("#dpAccountNoF").val(scode);
            }

            if (!(getParameterByName("nsu") != null && getParameterByName("nsu") != "")) {
                var value = $("#dpAccountNoF").val();
                nk_ChangeParam("nsu", value);
            }
            if (!(getParameterByName("nsc") != null && getParameterByName("nsc") != "")) {
                nw_ChangeCompanyParam();
            }

            nw_GetNotificationList("");
            nw_GetMenuitemList(crModule);

            fx_ExplorerTitleHide();

            nwLoading_End("nwInitLoad");
        } catch (err) { }
    }, 10);
    //crLnk = GetCurrentURL() + "../Layout/Layout_Gateway";
    //crLnkGateKey = "Layout";
    //func_ActionDriven("actAccess", false,GetCurrentURL() + "../Layout/Layout_Gateway");
    var isContinue = true;
    //init_request();
    //ToolBoxGetData = false;

    try {
        var pathname = window.location.pathname + "";


        //for (var i = 0; i < $("#mainFavList a").length; i++) {
        //    if (pathname.toLowerCase() == $("#mainFavList a:eq(" + i + ")").attr("href").toLowerCase())
        //        $("#mainFavList a:eq(" + i + ") .btn").addClass("selected");
        //}
        var umod = "";
        for (var i = 0; i < jsonMainData.UModules.length; i++) {
            umod += "<div cid='" + jsonMainData.UModules[i]["AppID"] + "' cabv='" + jsonMainData.UModules[i]["AppAbv"] + "' title='" + jsonMainData.UModules[i]["AppName"] + "' class='btn btn-modules'>" + jsonMainData.UModules[i]["AppName"] + "</div>";
        }
        $("#mainModList ").html(umod);

    } catch (err) { }

    try {
        nkmenutitle = nkmenutitle || "";
        if (nkmenutitle != "")
            document.title = nkmenutitle + " " + (nkmenuversion || "");
        $("#menuVersion").text(document.title);
    } catch (err) { }
});

function nw_GetNotificationList(curdate) {

    if (isEmptyLayout == true) {

    } else {
        nwParameter_Add("curdate", curdate);
        nwLoading_SpinnerPrepend("conNotifLay");
        func_ActionDriven("actGetNotificationList", false, crLnkLayout);
    }
}
function nw_GetMenuitemListDetailsSearch(txtsearch) {
    var template2 = '<div class="menu-grp-lbl menuitem" mid="mn-{0}" title="{1}"><a href="{2}" id="{0}" class="no-urderline">{1}</a></div>';
    var jsonmenu = nwJson(jsonMainData['UAccess'], "ItemParentApplication", _crModule);

    for (var i = 0; i < jsonSub.length; i++) {

    }
}
function nw_GetMenuitemListDetails(_crModule) {
    var jsonmenu = nwJson(jsonMainData['UAccess'], "ItemParentApplication", _crModule);
    var template = '<div class="menu-grp-li" mid="mn-{0}"><div class="menu-grp-lbl">{1}</div><div class="menu-grp-ul">{2}</div></div>';
    var template2 = '<div class="menu-grp-lbl menuitem" mid="mn-{0}" title="{1}"><a href="{2}" id="{0}" class="no-urderline">{1}</a></div>';
    var parent = "root";
    var htmlparent = "#menuitemListData";
    $(htmlparent).html("");

    var jsonSub = nwJson(jsonmenu, "ItemParentItem", parent);
    //console.log(jsonSub);
    for (var i = 0; i < jsonSub.length; i++) {

        var link = jsonSub[i]["link"] || "";
        var ItemID = jsonSub[i]["ItemID"] || "";
        var ItemName = jsonSub[i]["ItemName"] || "";
        var version = jsonSub[i]["version"] || "";

        var value = $("#uInfoCompany").val();

        if (link.indexOf(".aspx") >= 0) {
            var templink = link;
            link = "Menuitem";
            if (link.indexOf("?") >= 0)
                link += "&nsc=" + value;
            else
                link += "?nsc=" + value;

            value = $("#dpAccountNoF").val();
            link += "&nsu=" + value;

            link += "&plink=" + (p8Encrypted(templink) + "").replaceAll("+", "AAGxAAG");
            link += "&nmid=" + (p8Encrypted(ItemID) + "").replaceAll("+", "AAGxAAG");
            link += "&ntitle=" + (p8Encrypted(ItemName) + "").replaceAll("+", "AAGxAAG");
            link += "&nver=" + (p8Encrypted(version) + "").replaceAll("+", "AAGxAAG");
        }
        else {
            if (link.indexOf("?") >= 0)
                link += "&nsc=" + value;
            else
                link += "?nsc=" + value;

            value = $("#dpAccountNoF").val();
            link += "&nsu=" + value;
            link += "&ntitle=" + (p8Encrypted(ItemName) + "").replaceAll("+", "AAGxAAG");
            link += "&nver=" + (p8Encrypted(version) + "").replaceAll("+", "AAGxAAG");
        }



        var content = nw_GetMenuitemListDetailsSub(ItemID, jsonmenu);
        if (jsonSub[i]["ItemType"] == "0") {
            if (content != "")
                $(htmlparent).append(String.Format(template, ItemID, ItemName, content));
        }
        else
            $(htmlparent).append(String.Format(template2, ItemID, ItemName, link));
    }
    fnMenuGroupTreeView();
}



function nw_GetMenuitemListDetailsSub(parent, jsonmenu) {
    var template = '<div class="menu-grp-li" mid="mn-{0}"><div class="menu-grp-lbl">{1}</div><div class="menu-grp-ul">{2}</div></div>';
    var template2 = '<div class="menu-grp-lbl menuitem" mid="mn-{0}" title="{1}"><a href="{2}" id="{0}" class="no-urderline">{1}</a></div>';
    var stringcontent = "";

    var jsonSub = nwJson(jsonmenu, "ItemParentItem", parent);
    for (var i = 0; i < jsonSub.length; i++) {

        var link = jsonSub[i]["link"] || "";
        var ItemID = jsonSub[i]["ItemID"] || "";
        var ItemName = jsonSub[i]["ItemName"] || "";
        var version = jsonSub[i]["version"] || "";

        var value = $("#uInfoCompany").val();

        if (link.indexOf(".aspx") >= 0) {
            var templink = link;
            link = "Menuitem";
            if (link.indexOf("?") >= 0)
                link += "&nsc=" + value;
            else
                link += "?nsc=" + value;

            value = $("#dpAccountNoF").val();
            link += "&nsu=" + value;

            link += "&plink=" + (p8Encrypted(templink) + "").replaceAll("+", "AAGxAAG");
            link += "&nmid=" + (p8Encrypted(ItemID) + "").replaceAll("+", "AAGxAAG");
            link += "&ntitle=" + (p8Encrypted(ItemName) + "").replaceAll("+", "AAGxAAG");
            link += "&nver=" + (p8Encrypted(version) + "").replaceAll("+", "AAGxAAG");
        }
        else {
            if (link.indexOf("?") >= 0)
                link += "&nsc=" + value;
            else
                link += "?nsc=" + value;

            value = $("#dpAccountNoF").val();
            link += "&nsu=" + value;
            link += "&ntitle=" + (p8Encrypted(ItemName) + "").replaceAll("+", "AAGxAAG");
            link += "&nver=" + (p8Encrypted(version) + "").replaceAll("+", "AAGxAAG");
        }




        var content = nw_GetMenuitemListDetailsSub(ItemID, jsonmenu);
        if (jsonSub[i]["ItemType"] == "0") {
            if (content != "")
                stringcontent += (String.Format(template, ItemID, ItemName, content));
        }

        else
            stringcontent += (String.Format(template2, ItemID, ItemName, link));
    }

    return stringcontent;
}



function nw_GetMenuitemList(_crModule) {
    var jsonmenu = nwJson(jsonMainData['UAccess'], "ItemParentApplication", _crModule);
    var template = '<a href="{0}"  id="{1}" class="no-urderline"><div title="{3}" class="btn btn-modules btn-menuitem" cabv="{2}">{3}</div></a>';
    var template2 = '<div class="col col-3 with-spacing-4 col-mob"><a href="{0}" nwid="{1}" class="no-urderline fullwidth"><div class="spl-ms-widget2"><div class="spl-ms-widget-icon-wrap {2}"></div><div class="_details"><div class="spl-ms-widget2-count">15</div><div class="spl-ms-widget2-lbl">{3}</div></div></div></a></div>';

    for (var i = 0; i < jsonmenu.length; i++) {

        var link = jsonmenu[i]["link"];
        var value = $("#uInfoCompany").val();
        if (link.indexOf("?") >= 0)
            link += "&nsc=" + value;
        else
            link += "?nsc=" + value;

        value = $("#dpAccountNoF").val();
        link += "&nsu=" + value;


        $("#menucon ").append(String.Format(template, link, jsonmenu[i]["ItemID"], jsonmenu[i]["icon"], jsonmenu[i]["ItemName"]));

        //if ($("#overviewBoard").html() != undefined)
        //    $("#overviewBoard").append(String.Format(template2, link, jsonmenu[i]["ItemID"], jsonmenu[i]["icon"], jsonmenu[i]["ItemName"]));


    }
}



const validateemail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-za-z\-0-9]+\.)+[a-za-z]{2,}))$/
    );
};

$(document).on('change', '#txtnewemail', function () {
    const email = $('#txtnewemail').val();
    if (validateemail(email)) {
        $("#txtnewemail").val();
    } else {
        MessageBox("Cannot proceed. Invalid Email Address", "error");
        return false;
    }

});




$(document).on("click", "#btnchangepass", function () {
    var msg = "Do you want to change your password?";
    var pageTitle = "Logout";


    var msgBox = new GenLib.MessageBoxQuestion("msglogout");
    msgBox.message = msg;
    msgBox.title = pageTitle;
    msgBox.buttonYes = function () {
        window.location = '/ChangePassword?nkpop=y';
    };
    msgBox.buttonNo = function () {

    };
    msgBox.Show();

    return false;
});

$(document).on("click", "#btnSettingsAddEmail", function () {
    var msg = "Do you want to change your email?";
    var pageTitle = "Logout";


    var msgBox = new GenLib.MessageBoxQuestion("msglogout");
    msgBox.message = msg;
    msgBox.title = pageTitle;
    msgBox.buttonYes = function () {


        var OTPType = "15";

        nwParameter_Add("OTPMethod", OTPType);

        func_ActionDriven('actGetOTP', false, crLnkLayout)
        nwLoading_Start('actGetOTP', crLoadingHTML);

    };
    msgBox.buttonNo = function () {

    };
    msgBox.Show();

    return false;
});


var msgOTPBox = new GenLib.MessageBoxInput("idOTPInput");

function showOTPInputWindow(infoDetail) {
    nwLoading_End('actGetOTP', crLoadingHTML);

    msgOTPBox.message = "A verification code has been sent to your current " + infoDetail + ".\nPlease enter the OTP code to change your " + infoDetail + ".\nOnce verified, your " + infoDetail + " will be updated.\n(Proceed with caution)";
    msgOTPBox.title = pageTitle;
    msgOTPBox.buttonOk = function () {

        var value = msgOTPBox.InputValue();

        nwParameter_Add("OTPMethod", infoDetail);
        nwParameter_Add("UserOTP", value);
        nwLoading_Start('actValidateOTP', crLoadingHTML);
        func_ActionDriven('actValidateOTP', false, crLnkLayout)
        return false;
    };
    msgOTPBox.Show();
}

function OTPValidationResult(result, infoDetail) {
    nwLoading_End('actValidateOTP', crLoadingHTML);

    if (result == "OTP_OK") {
        //msgOTPBox.Close();
        saveNewUserInfo(infoDetail)
    } else {
        let invalidResult = result == "OTP_INVALID" ? "Invalid OTP Code." : "OTP Code Expired.";
        msgOTPBox.LabelText(invalidResult);
        setTimeout(() => { msgOTPBox.LabelText(""); }, 3000);
    }
}

function showErrorWindow() {
    nwLoading_End('actGetOTP', crLoadingHTML);

    var msgBox = new GenLib.MessageBox("idOTPInput");
    msgBox.message = "An Error Occured";
    msgBox.title = pageTitle;
    msgBox.Show();
}

function saveNewUserInfo(infoDetail) {


    var saveInfo = $("#txtnewemail").val();



    nwParameter_Add("infoType", infoDetail);
    nwParameter_Add("nwtku", getParameterByName("nwtku"));
    nwParameter_Add("saveInfo", saveInfo);
    func_ActionDriven('actSaveNewInfo', false, crLnkLayout)
    nwLoading_Start('actSaveNewInfo', crLoadingHTML);
}


function nw_GetNotificationListRender() {
    var jsondata = jsonNotifUnread;
    for (var i = jsondata.length - 1; i >= 0 ; i--) {
        nw_GetNotificationAddItem(jsondata[i]["Title"], jsondata[i]["Message"], jsondata[i]["Recdate"]);
    }
}

function showUpdatedMsg() {
    nwLoading_End('actSaveNewInfo', crLoadingHTML);

    var msgBox = new GenLib.MessageBox("idInfosaved");
    msgBox.message = "Details updated Successfully!";
    msgBox.title = pageTitle;
    msgBox.Show();
}
function nw_GetNotificationAddItem(title, message, date) {
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
    $("#conNotifLay").prepend(strtemplate);
}


function nw_ReloadCompany() {
    $("#uInfoCompany").html("");
    var compsel = ""; var issame = false;
    for (var i = 0; i < jsonMainCompany.length; i++) {
        $("#uInfoCompany").append("<option nwvalue='" + jsonMainCompany[i]["Company"] + "' value='" + jsonMainCompany[i]["CompanyCode"] + "'>" + jsonMainCompany[i]["Description"] + "</option>");
        if (jsonMainCompany[i]["Company"] == crComp) {
            compsel = jsonMainCompany[i]["CompanyCode"];
            $("#uInfoCompany").val(compsel);
            issame = true;
        }
    }
    if (issame == false) $("#uInfoCompany").val(crComp);

    if (lnkHome == 1) {
        $("#lnkHome").text($("#uInfoCompany option:selected").text());
    }
}



$(document).on("click", "#btnLogout", function () {
    var msg = "Do you want to logout to the system?";
    var pageTitle = "Logout";

    var msgBox = new GenLib.MessageBoxQuestion("msglogout");
    msgBox.message = msg;
    msgBox.title = pageTitle;
    msgBox.buttonYes = function () {
        window.location = 'logout';
    };
    msgBox.buttonNo = function () {

    };
    msgBox.Show();

    return false;
});

$(document).on("change", "#dpAccountNo", function () {
    nw_ChangeAccount(this);
    return false;
});

$(document).on("change", "#dpAccountNoF", function () {
    nw_ChangeAccount(this);
    return false;
});

$(document).on("change", "#uInfoCompany", function () {
    nw_ChangeCompanyParam();

    // $("#dpAccountNoF").change();
    return false;
});
$(document).on("click", "#btnSettingsL", function () {
    $("#mdlSettings").show();
    return false;
});

function nw_ChangeCompanyParam() {
    var value = $("#uInfoCompany option:Selected").val();;//$("#uInfoCompany").val();
    nk_ChangeParam("nsc", value);
    console.log("run change company");
    nw_ReloadPage();
}

function nw_ChangeAccount(_this) {
    var value = $(_this).val();
    $("#dpAccountNo").val(value);
    $("#dpAccountNoF").val(value);
    nk_ChangeParam("nsu", value);
    // nw_ReloadPage();
    // nw_ChangeCompanyParam();
    console.log("run change account");


    nwParameter_Add("accountno", value);
    func_ActionDriven('actChangeUser', false, crLnkLayout);
    nwLoading_Start('actChangeUser', crLoadingHTML);
}
function nw_ReloadPage() {
    nwLoading_Start("nwChangeAccount", crLoadingHTML);
    location.reload();
}


$(document).on("contextmenu", "#menuitemListData a, #overviewBoard a", function (e) {
    e.preventDefault();
    // Get the link's URL
    var linkUrl = $(this).attr('href');

    // Position and show the custom context menu
    $('#RightClickContextMenu').css({
        top: e.pageY + 'px',
        left: e.pageX + 'px',
    }).show();

    // Store the link URL in the menu for use later
    $('#RightClickContextMenu').data('linkUrl', linkUrl);

    return false;
});

//$(document).on("mousedown", "#menuitemListData a, #overviewBoard a", function (e) {

//    var isvalid = true;
//    switch (event.which) {
//        case 1:
//            //alert('Left Mouse button pressed.');

//            break;
//        case 2:
//            alert('Middle Mouse button pressed.');
//            break;
//        case 3:
//            //alert('Right Mouse button pressed.');
//            //e.preventDefault();
//            var linkUrl = $(this).attr('href');
//            $('#RightClickContextMenu').css({
//                top: e.pageY + 'px',
//                left: e.pageX + 'px',
//            }).show();

//            // Store the link URL in the menu for use later
//            $('#RightClickContextMenu').data('linkUrl', linkUrl);
//            isvalid = false;
//            break;
//        default:
//            alert('You have a strange Mouse!');
//    }


//    return isvalid;
//});



$(document).on("click", "#openNewTab", function (e) {
    var linkUrl = $('#RightClickContextMenu').data('linkUrl');
    window.open(linkUrl, '_blank');
    $('#RightClickContextMenu').hide();
    return false;
});


$(document).on('click', function (e) {
    // Check if the context menu is visible
    if ($('#RightClickContextMenu').is(':visible')) {
        $('#RightClickContextMenu').hide();
    }
});

$(document).on('keypress', "#txt-SearchMenuItem", function (e) {
    if (e.which == 13) {
        nk_SearchMenu();
        return false;
    }

});


function nk_SearchMenu() {

    var jsonmenu = nwJson(jsonMainData['UAccess'], "ItemType", "1");
    var jsonmenuData = [];
    var htmlparent = "#menuitemListData";
    var stext = $("#txt-SearchMenuItem").val();
    $(htmlparent).html("");
    if (stext != "") {
        for (var i = 0; i < jsonmenu.length; i++) {
            var isvalid = true;
            stext = stext.toLowerCase();
            //var stextdata = stext.split(" ");
            stext = stext.toLowerCase();
            var stextdata = stext;

            var stext2 = jsonmenu[i]["ItemName"];
            stext2 = stext2.toLowerCase();
            //var stextdata2 = stext2.split(" ");
            var stextdata2 = stext2;

            //for (var i2 = 0; i2 < stextdata.length; i2++) {
            //    if (!stextdata2[i2].includes(stextdata)) //JMC011425
            //        isvalid = false;
            //}
            //if (isvalid)
            if (stextdata2.includes(stextdata))
                jsonmenuData.push(jsonmenu[i]);
        }
        var template2 = '<div class="menu-grp-lbl menuitem" mid="mn-{0}" title="{1}"><a href="{2}" id="{0}" class="no-urderline">{1}</a></div>';
        var stringcontent = "";
        for (var i = 0; i < jsonmenuData.length; i++) {
            var link = jsonmenuData[i]["link"] || "";
            var ItemID = jsonmenuData[i]["ItemID"] || "";
            var ItemName = jsonmenuData[i]["ItemName"] || "";
            var version = jsonmenuData[i]["version"] || "";

            var value = $("#uInfoCompany").val();

            if (link.indexOf(".aspx") >= 0) {
                var templink = link;
                link = "Menuitem";
                if (link.indexOf("?") >= 0)
                    link += "&nsc=" + value;
                else
                    link += "?nsc=" + value;

                value = $("#dpAccountNoF").val();
                link += "&nsu=" + value;

                link += "&plink=" + (p8Encrypted(templink) + "").replaceAll("+", "AAGxAAG");
                link += "&nmid=" + (p8Encrypted(ItemID) + "").replaceAll("+", "AAGxAAG");
                link += "&ntitle=" + (p8Encrypted(ItemName) + "").replaceAll("+", "AAGxAAG");
                link += "&nver=" + (p8Encrypted(version) + "").replaceAll("+", "AAGxAAG");
            }
            else {
                if (link.indexOf("?") >= 0)
                    link += "&nsc=" + value;
                else
                    link += "?nsc=" + value;

                value = $("#dpAccountNoF").val();
                link += "&nsu=" + value;
                link += "&ntitle=" + (p8Encrypted(ItemName) + "").replaceAll("+", "AAGxAAG");
                link += "&nver=" + (p8Encrypted(version) + "").replaceAll("+", "AAGxAAG");
            }

            stringcontent += (String.Format(template2, ItemID, ItemName, link));
        }

        $(htmlparent).html(stringcontent);
    }
}