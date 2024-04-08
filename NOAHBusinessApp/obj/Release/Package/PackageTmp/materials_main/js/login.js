

var btnLogin = $('#Button1');
var popValidating = $('#popValidating');
var txtUsername = $('#txtUsername');
var btnTopNav = $('#btnTopNav');
var annContainer = $('#annContainer');
var HD_logincounter = "0";
var userKey = "";



$(document).ready(function () {

    if (window.location.href.toLocaleLowerCase().indexOf("/login") < 0) {
        if (window.location.pathname.endsWith("/"))
            window.location = window.location.origin + window.location.pathname + "login" + window.location.search;
        else 
            window.location = window.location.origin + window.location.pathname + "/login" + window.location.search;
    }

    //crExportLnk = 'forms_standards/ExportToExcel.aspx';
    //crSTDLnk = "forms_standards/RunStandard.aspx";
    crLnk = window.location.pathname +  "/Login_Gateway";

    crLnkGateKey = "aagLogin";
    //crSTDLnk = "Login";



    btnLogin = $('#Button1');
    popValidating = $('#popValidating');
    txtUsername = $('#txtUsername');
    btnTopNav = $('#btnTopNav');
    annContainer = $('#annContainer');
    func_ActionDriven("actLoginLoad", false);


    //txtUsername.focus();

    btnLogin.on('click', function () {

        if ($('#popValidating').hasClass("show") == false) {
            LoadingStart();
            func_ActionDriven("actLogin", false);
        }

        return false;
    });

    popValidating.on('click', function () {
        // popValidating.removeClass('show');popValidating.addClass('hide');
       // popValidating.addClass('hide');

    });
    

 
    btnTopNav.on('click', function () {
        if (btnTopNav.hasClass('open')) {
            btnTopNav.removeClass('open');
            annContainer.removeClass('open');
        }
        else {
            btnTopNav.addClass('open');
            annContainer.addClass('open');
        }
    });


    $(document).on("change", "#txtUsername", function () {
        LoadingStart();
        func_ActionDriven("actUserValidate", false);

      

        
        return false;
    });
    $(document).on("keypress", "#txtPassword", function (e) {
        if (e.which == 13) {
            $('#Button1').click();
        }
        //return false;
    });
    
});

var otherLogin1 = "";
var otherLogin2 = "";
var otherLogin3 = "";
function LoadingStart() {
    nwParameter_Add("otherLogin1", otherLogin1);
    nwParameter_Add("otherLogin2", otherLogin2);
    nwParameter_Add("otherLogin3", otherLogin3);

    nwParameter_Add("txtUsername", $('#txtUsername').val());
    nwParameter_Add("txtPassword", $('#txtPassword').val());

    nwParameter_Add("company", getParameterByName("company"));

    var AD = $('#nwWindowsAuth').prop('checked');

    if (AD == undefined)
        AD = false;

    nwParameter_Add("cbxAD", AD); //to be follow
    nwParameter_Add("poweruser", $('#poweruser').val());
    nwParameter_Add("dpCombo", $('#dpCombo').val());
    nwParameter_Add("dpCombo_Text", $('#dpCombo option:selected').text());
    nwParameter_Add("baseSessionID", baseSessionID);
    nwParameter_Add("txtCaptcha", $('#txtCaptcha').val());

    nwParameter_Add("HD_logincounter", HD_logincounter);

    var strURL = window.location.href.substring(window.location.href.indexOf(window.location.search));

    if (!(strURL.indexOf("#") == 0 || strURL.indexOf("?") == 0))
        strURL = "";

    nwParameter_Add("Request_Url_Query", strURL);
    nwParameter_Add("txtUsername", $('#txtUsername').val());




    popValidating.removeClass('hide');
    popValidating.addClass('show');
}
function LoadingClose() {
    popValidating.removeClass('show'); popValidating.addClass('hide');
}












// Project: NOAH APPLICATION
// Created by: ADB
// Date created: 01-30-2019
// ------
// Modified by: ADB / Other name / Other name / 
// Date modified: 01-31-2019 / Date modified / Date modified /


window.onload = function () {

    // alert('custom.js was loaded.');

    // LOAD POPUP FOR DATA PRIVACY POLICY
    popupCookies();

    // Mouse Tooltip for Header Title
    $('.header .Title, .header .logo').attr('Title', 'Return Home');

    // It shows the popup container of data privacy terms
    function popupCookies() {
        var body = $('body');

        body.append("<style>.popupCookies { position: fixed; display: block; width: 88%; height: auto; padding: 14px 6%; background-color: #00204f;background-color: #171717;bottom: 0; z-index: 9999; color: #fafafa; font-family: 'Segoe UI'; font-size: 15px; opacity: .98; -webkit-animation: toastbottom 2s; -moz-animation: toastbottom 2s; animation: toastbottom 2s; -webkit-box-shadow: 0 -6px 12px rgba(0,0,0,.16); -moz-box-shadow: 0 -6px 12px rgba(0,0,0,.16); box-shadow: 0 -6px 12px rgba(0,0,0,.16); -webkit-box-sizing: initial; -moz-box-sizing: initial; box-sizing: initial; } .popupCookies.hidden2 { -webkit-animation: toasthide 2s; -moz-animation: toasthide 2s; animation: toasthide 2s; } .popupCookies > div { display: inline-block; height: 100%; margin: 0 auto; vertical-align: middle; } .cookies-content { width: 70%; } .cookies-cont-button { width: 28%; text-align: center; } .btn-cookies { display: block; margin: 2px auto; padding: 10px 14px; width: 160px; border: 2px solid #2267bb; background-color: #2267bb; border-radius: 3px; font-size: 13px; text-align: center; color: #fafafa; font-family: 'Century Gothic'; cursor: pointer; font-weight: bold; -webkit-transition: .2s ease-out all; -moz-transition: .2s ease-out all; transition: .2s ease-out all; } .btn-cookies#btnViewPolicy { border-color: transparent; border: 2px solid transparent; background-color: transparent; opacity: .7; -webkit-transition: .2s ease-out all; -moz-transition: .2s ease-out all; transition: .2s ease-out all; } .btn-cookies#btnViewPolicy:hover { opacity: 1; } .btn-cookies#btnViewPolicy > a { text-decoration: none; color: #dddddd !important; } .btn-cookies#btnAcceptPolicy { text-transform: uppercase; } .btn-cookies#btnAcceptPolicy:hover { color: #efefef !important; border: 2px solid #efefef; background-color: #041732; } a { -webkit-user-select: none; -moz-user-select: none; user-select: none; } .content-title-container { display: block; padding: 20px 0; margin: 20px auto; position: relative; } .content-title { font-family: 'Century Gothic', Calibri; font-size: 20px; color: #2f2f2f; display: block; padding: 2px 20px; text-align: center; font-weight: bold; } .content-sub-title { font-family: 'Century Gothic', Calibri; font-size: 18px; color: #2f2f2f; display: block; padding: 0 20px; text-align: center; font-weight: bold; } .content-text { margin: 0 auto; margin-top: 20px; padding: 20px; width: 70%; color: #3f3f3f; font-size: 15px; font-family: 'Segoe UI', Calibri; text-align: justify; word-spacing: .1em; } .content-text h4 { text-transform: uppercase; text-decoration: underline; display: block; text-align: left; margin: 0; margin-bottom: 10px; font-size: 16px; font-family: 'Arial', Calibri; } .content-text p { margin: 20px 0; display: block; font-size: 15px; line-height: 20px; } .content-text ul, .content-text ol { margin: unset; padding-left: 30px; margin-bottom: 30px; margin-top: 20px; } .content-text li { margin: 4px 0; list-style: inherit; display: list-item; } .content-text li span { margin: 0 !important; font-weight: bold; } .text-blue { color: mediumblue; } .spacer-40 { display: block; margin: 50px 0; } .content-title-container:before { content: ''; position: absolute; left: 50%; bottom: 0; height: 1px; width: 60%; background: -webkit-linear-gradient(to right, #cc9308, #0015d0); background: -moz-linear-gradient(to right, #cc9308, #0015d0); background: linear-gradient(to right, #cc9308, #0015d0); -webkit-transform: translateX(-50%); -moz-transform: translateX(-50%); transform: translateX(-50%); } .header .Title, .header .logo { cursor: pointer !important; } @keyframes toastbottom { 0% { bottom: -100%; opacity: 0; } 80% { opacity: .56; } 100% { bottom: 0; opacity: .98; } } @keyframes toasthide { 0% { bottom: 0; } 100% { opacity: 0; bottom: -100%; display: none; } } @media (max-width: 480px) { .popupCookies > div { display: block; width: 100%; text-align: justify; } .btn-cookies#btnAcceptPolicy { margin-top: 12px; } .btn-cookies { width: 70%; } }</style>");

        var str = "NOAH Business Applications' privacy practices are developed in accordance with Republic Act No. 10173 or the Data Privacy Act of 2012 and its implementing rules and regulations (collectively, the “DPA”).";
        // It will append the container popup of data privacy terms and the setCookies() & getCookies() function
        body.append('<div class="popupCookies" id="popupCookies"> <div class="cookies-content">' + str + '</div><div class="cookies-cont-button"> <div id="btnAcceptPolicy" class="btn-cookies">I Accept the terms</div> <div id="btnViewPolicy" class="btn-cookies"><a>View Privacy Policy</a></div> </div></div><script type="text/javascript">$(document).ready(function () { getCookies(); }); function setCookies() { var acceptcookie = "1"; var popupCookies = $(".popupCookies"); var timer; localStorage.setItem("nwcookie", JSON.stringify(acceptcookie)); popupCookies.addClass("hidden2"); clearTimeout(timer); timer = setTimeout(function () { document.getElementById("popupCookies").style.display = "none"; }, 1800); } function getCookies() { let lscookie = localStorage.getItem("nwcookie"), cookieObj = JSON.parse(lscookie); if (cookieObj != null) { document.getElementById("popupCookies").style.display = "none"; } } </script>');
    }

    $(document).ready(function () { getCookies(); }); function setCookies() { var acceptcookie = "1"; var popupCookies = $(".popupCookies"); var timer; localStorage.setItem("nwcookie", JSON.stringify(acceptcookie)); popupCookies.addClass("hidden2"); clearTimeout(timer); timer = setTimeout(function () { document.getElementById("popupCookies").style.display = "none"; }, 1800); } function getCookies() { let lscookie = localStorage.getItem("nwcookie"), cookieObj = JSON.parse(lscookie); if (cookieObj != null) { document.getElementById("popupCookies").style.display = "none"; } }
    $(document).on('click', '#btnAcceptPolicy', function () {
        setCookies();
    });
    $(document).on('click', '#btnViewPolicy', function () {
        try {
            //window.location.href = $('#nwLogViewPolicy').text();
            window.location.href = 'https://federalland.ph/privacy-policy/';
        } catch (err) {

        }
    });

    // When Logo and Title in the header is click you will return to the homepage
    $(document).on('click', '.header .Title, .header .logo', function () {
        try {
            window.location.href = '/';
        } catch (err) {

        }
    });


};

$(document).ready(function () {
    $('div#navslider').each(function () {
        $(this).css('display', 'none');
    });
});



///Google

function GO_onSignIn(googleUser) {

    if (getParameterByName("nwout")=="abc") {
        if ('URLSearchParams' in window) {
            var searchParams = new URLSearchParams(window.location.search)
            searchParams.set('nwout', '');
            var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
            history.pushState(null, '', newRelativePathQuery);
        }
        googleLogout();
        return false;
    }

    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;


    LoadingStart();
    nwParameter_Add("token", id_token);
    func_ActionDriven("actSpecialLogin", false);

    console.log('id_token: ' + id_token);
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.


}
function GO_signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}


$(function () {

    var strMessage = getParameterByName("a2z4i7e");
    if (strMessage == "023015141182140148005194003076082044168221064195")
    {
        MessageBox("You’ve been logged off by the Administrator.  Please try again later.  Thank you.", "");
    }
    else if (strMessage == "104086100041151156236247047032091134008078026211")
    {
        MessageBox("Login Session Lost.", "");
    }
    if ('URLSearchParams' in window) {
        var searchParams = new URLSearchParams(window.location.search)
        searchParams.set('a2z4i7e', '');
        var newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
        history.pushState(null, '', newRelativePathQuery);
    }

});


function init() {
    gapi.load('auth2', function () {
        // Ready. 
        gapi.auth2.init(
        {
            client_id: 'deleted'
        });
    });
}
function googleLogout() {
   // alert("googleLogout start");
    //gapi.auth2.getAuthInstance().signOut();
    //OR (both are same)
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
   // alert("googleLogout done.");
}




//$(document).on('#registrationpass', function () {
//    console.log('clicked');
//    var userAgent = navigator.userAgent.toLowerCase();
//    if (userAgent.indexOf('android') > -1) {

//        //window.location.href = 'market://details?id=your.package.name';
//        console.log('android');
//    } else if (userAgent.indexOf('iphone') > -1 || userAgent.indexOf('ipod') > -1 || userAgent.indexOf('ipad') > -1) {

//        //window.location.href = 'https://apps.apple.com/app/your-app-id';
//        console.log('ios');
//    }
//});



$(document).ready(function () {
    $('#registrationpass').on('click', function () {
        console.log('clicked');
        var userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('android') > -1) {
            //window.location.href = 'market://details?id=your.package.name';
            console.log('android');
        } else if (userAgent.indexOf('iphone') > -1 || userAgent.indexOf('ipod') > -1 || userAgent.indexOf('ipad') > -1) {
            //window.location.href = 'https://apps.apple.com/app/your-app-id';
            console.log('ios');
        }
    });
});