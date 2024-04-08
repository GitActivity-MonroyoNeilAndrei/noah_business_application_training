
var token = "";
var userid = "";

function func_Reload() {

    LoadStringsCases();
    crLnk = GetCurrentURL() + "ForgotPassword_Gateway";
    crLnkGateKey = "ForgotPassword";

    var isContinue = true;
    init_request();
    ToolBoxGetData = false;

    
    return isContinue;
}

$(document).on('click', '#btnSubmit', function () {

    nwLoading_Start('actUserCode', crLoadingHTML);
    nwParameter_Add("txtUserCode", $("#txtUserCode").val());
    func_ActionDriven("actUserCode", true);
});

$(document).on('click', '#lblResendOtp', function () {

    nwLoading_Start('actUserCode', crLoadingHTML);
    nwParameter_Add("txtUserCode", $("#txtUserCode").val());
    func_ActionDriven("actUserCode", true);
});

$(document).on('click', '#btnSubmitOTP', function () {

    nwLoading_Start('actOTP', crLoadingHTML);
    nwParameter_Add("token", token);
    nwParameter_Add("userid", userid);
    nwParameter_Add("OTPCode", $("#txtOTP").val());
    func_ActionDriven("actOTP", true);
});
$(document).on('click', '#btnSubmitChange', function () {

    nwLoading_Start('actSubmitChange', crLoadingHTML);
    nwParameter_Add("txtPassword1", $("#txtPassword1").val());
    nwParameter_Add("txtPassword2", $("#txtPassword2").val());
    nwParameter_Add("token", token);
    func_ActionDriven("actSubmitChange", true);
});

function cuz_CallVerifyEmail() {
    $("#frmEnterUser").hide();
    $("#frmEnterOTP").show();
    $("#imgEmail").show();
    $("#imgSMS").hide();
    $("#lblOTPtext").text("Please enter verification code sent to your email address");
    $("#txtOTP").attr("noahvalue", "email");
    $("#txtOTP").focus();
}
function cuz_CallVerifySMS() {
    $("#frmEnterUser").hide();
    $("#frmEnterOTP").show();
    $("#imgEmail").hide();
    $("#imgSMS").show();
    $("#lblOTPtext").text("Please enter verification code sent to your registered number");
    $("#txtOTP").attr("noahvalue", "sms");
    $("#txtOTP").focus();
}

function cuz_CallChangePass() {
    $("#frmEnterUser").hide();
    $("#frmEnterOTP").hide();
    $("#frmEnterNewPass").show();
}


function cuz_GoLogin() {
    window.location = "Login";
}