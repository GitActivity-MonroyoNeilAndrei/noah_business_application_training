
//
var func_TermCode = "";
var xdestinationPage = "home.aspx";
var isHaveKey = true;
function func_Reload() {
    LoadStringsCases();
    crLnk = "Modules_UI/OtherMenu/TermsAndConditions/TermsAndConditions_Gateway.aspx";
    crLnkGateKey = "TermsAndConditions";

    if (isHaveKey) {
        $("body").append("<div id='frmSecurity' nwTitle='Security' style='min-width:240px; min-height:140px'>Please re-enter Password<br><br><input id='txtKey' type='password' style='width:200px;'><br><br><button id='btnSubmit'>OK</button><a href='logout.aspx' style='color: darkblue;margin-left: 5px;'><button id='btnCancelMain'>Cancel</button></a></div>");
        nwPopupForm_Create("frmSecurity");
        nwPopupForm_ShowModal("frmSecurity");
        $('.BoxClose').hide();
        $("#txtKey").focus();
    }
    else {
        callTerms();
    }
    
    return isContinue;
}
function callTerms() {
    $("#TermsContent").html("<div style='padding:40px;color:black;text-align:center;'>Loading...</div>");
    func_ActionDriven("actLoadTermsMain", false);
}


$(document).on("keypress", "#txtKey", function(e) {
    if (e.which == 13) {
        $('#btnSubmit').click();
    }
   
});
$(document).on("click", "#btnCancel", function() {
    window.location.href = "logout.aspx";

    return false;
});
$(document).on("click", "#btnSubmit", function() {
    nwParameter_Add("xter", $('#txtKey').val());
    func_ActionDriven("actCheckKey", false);
    return false;
});


$(document).on("click", "#btnContinue", function() {
    var isChecked = $("#checkAgree").prop("checked");
    var xstring = "I Agree";
    var xheader = "Terms and Conditions";

    if ($("#checkTermsLabel").text() != undefined)
        xstring = $("#checkTermsLabel").text();

    if ($(".header").text() != undefined)
        xheader = $(".header").text();

    if (isChecked == false) {
        MessageBox("To continue Please Check '" + xstring + "'", xheader);
    }
    else {
        nwParameter_Add("checkSendToEmail", $('#checkSendToEmail').prop("checked"));
        nwParameter_Add("func_TermCode", func_TermCode);
        nwParameter_Add("xdestinationPage", xdestinationPage); 
        nwLoading_Start("actSetTermsMain", crLoadingHTML);
        func_ActionDriven("actSetTermsMain", false);

    }

    return false;
});


function func_WindowCloseTrigger(verID) {

    return false;
}

