var $ServerLink = "";
const pageTitle = "";
//var jsonMainData = [];
var jsonNotifUnread = [];
var crLnkLayout = "";

var gen_disUname = "code";
var lnkHome = 0;



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
        for(var i=0; i < jsonMainData["UPower"].length; i++){
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
        
        if (!(getParameterByName("nsu") != null && getParameterByName("nsu") != ""))
        {
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
    ToolBoxGetData = false;

    try {
        var pathname = window.location.pathname + "";
        for (var i = 0; i < $("#mainModList a").length; i++) {
            if (pathname.toLowerCase() == $("#mainModList a:eq(" + i + ")").attr("href").toLowerCase())
                $("#mainModList a:eq(" + i + ") .btn").addClass("selected");
        }
    } catch (err) { }
});

function nw_GetNotificationList(curdate) {
    
    nwParameter_Add("curdate", curdate);
    nwLoading_SpinnerPrepend("conNotifLay");
    func_ActionDriven("actGetNotificationList", false, crLnkLayout);
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
           
        $("#menucon ").append(String.Format(template, link, jsonmenu[i]["ItemID"], jsonmenu[i]["icon"], jsonmenu[i]["ItemName"]));

        if ($("#overviewBoard").html() != undefined)
            $("#overviewBoard").append(String.Format(template2, link, jsonmenu[i]["ItemID"], jsonmenu[i]["icon"], jsonmenu[i]["ItemName"]));

        
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
        func_ActionDriven('actValidateOTP', false,crLnkLayout)
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
    func_ActionDriven('actSaveNewInfo', false,crLnkLayout)
    nwLoading_Start('actSaveNewInfo', crLoadingHTML);
}


function nw_GetNotificationListRender() {
    var jsondata = jsonNotifUnread;
    for (var i = jsondata.length-1; i >=0 ; i--){
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
function nw_GetNotificationAddItem(title,message,date){
    var strtemplate = "";
    var datetext = date;

    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    var options2 = { hour: 'numeric', minute: 'numeric' };
    var today = new Date(datetext);
    datetext = today.toLocaleDateString("en-US", options) + " | " + today.toLocaleTimeString("en-US", options2);
    strtemplate += "<div class='spl-sys-r-c' rdate='" + date + "'>";
    strtemplate += "<div class='spl-sys-r-text'>";
    strtemplate += "<div class='spl-sys-r-title'>"+title+"</div>";
    strtemplate += "<div class='spl-sys-r-subtitle'>"+ message +"</div>";
    strtemplate += "<div class='spl-sys-r-date'>" + datetext + "</div>";
    strtemplate += "</div>";
    strtemplate += "</div>";
    $("#conNotifLay").prepend(strtemplate);
}


function nw_ReloadCompany() {
    $("#uInfoCompany").html("");
    for (var i = 0; i < jsonMainCompany.length; i++) {
        $("#uInfoCompany").append("<option nwvalue='" + jsonMainCompany[i]["Company"] + "' value='" + jsonMainCompany[i]["CompanyCode"] + "'>" + jsonMainCompany[i]["Description"] + "</option>");
    }
    $("#uInfoCompany").val(crComp);

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
    $("#dpAccountNoF").change();
    return false;
});
$(document).on("click", "#btnSettingsL", function () {
    $("#mdlSettings").show();
    return false;
});

function nw_ChangeCompanyParam() {
    var value = $("#uInfoCompany").val();
    nk_ChangeParam("nsc", value);
}

function nw_ChangeAccount(_this) {
    var value = $(_this).val();
    $("#dpAccountNo").val(value);
    $("#dpAccountNoF").val(value);
    nk_ChangeParam("nsu", value);
    nw_ChangeCompanyParam();

    nwParameter_Add("accountno", value);
    func_ActionDriven('actChangeUser', false, crLnkLayout)
    nwLoading_Start('actChangeUser', crLoadingHTML);
}
function nw_ReloadPage() {
    nwLoading_Start("nwChangeAccount", crLoadingHTML);
    location.reload();
}