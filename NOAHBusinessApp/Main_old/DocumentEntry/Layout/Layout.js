var $ServerLink = "";

$(function () {
    nwTrustedLinks.push('localhost');

    $("#btnLogoutF a").attr("href", GetCurrentURL() + "../account/LogOff/");
    var uname = jsonMainData["UInfo"][0].Description;
    $('.welcome-username').text(uname);
    $('.nav-user-name').text(uname);

    //crLnk = GetCurrentURL() + "../Layout/Layout_Gateway";
    //crLnkGateKey = "Layout";

    func_ActionDriven("actAccess", false,GetCurrentURL() + "../Layout/Layout_Gateway");

    var isContinue = true;
    //init_request();
    ToolBoxGetData = false;
});


function ChangeBanner(image) {
    image = image.replaceAll("&amp;", "&");
    $('.hdr-bg').attr('src', $ServerLink + image);
}
//user image
function ChangeUserImage(image) {
    image = image.replaceAll("&amp;", "&");
    $(".welcome-user-img").css("background-image", "url(" + $ServerLink + image + ")");
    $(".nav-user-img").css("background-image", "url(" + $ServerLink + image + ")");
}

//customize aag
//$(document).on('click', '#btnInfo', function () {
//    window.location.href = GetCurrentURL() + '../BMSellerInformation';
//});

$(document).on('click', '#btnSellLineUp', function () {
    window.location.href = GetCurrentURL() + '../SBAnalyticsRprt';
});


$(document).on("click", ".nav-li", function (e) {
    var id = $(this).attr("id") || "";

    if (!!id) {
        var sib = $(this).siblings(`#navMob_${id.replace("btn", "")}`) || "";
        var x = parseInt($(e.target).position().left - 30);
        var y = parseInt($(e.target).outerHeight() + 16);

        if ($(window).width() >= 800)
            sib.css({ "left": x + "px", "top": y + "px" });
        else
            sib.css({ "left": "", "top": "" });

        //sib.length && sib.show();
        if (sib.length) {
            if (sib.css("display") == "block") {
                $(this).siblings(".nav-mob-ddli").hide();
                sib.hide();
            }
            else {
                $(this).siblings(".nav-mob-ddli").hide();
                sib.hide();
                sib.show();
            }
        }
        //sib.length && (sib.is(":visible")
        //    ? $(this).siblings(".nav-mob-ddli").hide() : $(this).siblings(".nav-mob-ddli").hide(), sib.show());

    }
    else {
        $(this).siblings(".nav-mob-ddli").hide();
    }
    $(".closeable-toggle-wrapper").off("mousemove");
    $(".closesable-wrapper").css("top", "58px");
});

$(document).on("click", ".nav-li", function () {
    var id = $(this).attr("id");
    if (id != "" || id != null) {
        $(document).find(".nav-li").removeClass("active");
        $(this).addClass("active");
        //$(document).find(".content-c").hide();
        switch (id) {
            case "btnHome":
                $(document).find("#secLanding").fadeIn("fast");
                $(document).find(".secProject, #secAvailabilityChart, #secBookingSummary, #secCommissionSummary, #secHoldingFrame, #secTransactionSummary").hide();
                break;
            case "btnCust":
                break;
            //case "btnInfo":
            //    break;
                //case "btnTransaction":
                //    if ($('.nav-mob-ddli').hasClass("active"))
                //    {
                //        $('.nav-mob-ddli').fadeOut();
                //    }
                //    break;
            case "btnCommissions":
                $(document).find("#secLanding, .secProject, #secAvailabilityChart, #secBookingSummary, #secHoldingFrame, #secTransactionSummary").hide();
                $(document).find("#secCommissionSummary").fadeIn("fast");
                break;

            default:
        }
    }
});

$(document).on('click', '.btn-cancel', function () {
    $(this).parents('.pdlg').fadeOut();
    $(this).parents('.iframe_main').fadeOut();
});

//NAVIGATIONS
$(document).on('click', '#btnHome2,#btnLOI', function () {
    try{document.getElementById("pdlg-container").innerHTML = "";}
    catch(e){}
    if (!window.location.href.includes("home"))
    {
        var tag = $(this).attr("tag");
        window.location.href = GetCurrentURL() + '../home/?nwtag=' + tag + '&a2z4i7e=&lky=QFs4MevhyGYsVEOoL1O0ph80lpkpCDKjceClyu8mufL9p3lKa3FzBIltuWgLNOo1mTw4c8Mr%2fGWmZb7u1FvcHg%3d%3d';
    }
        
});
//$(document).on('click', '.btnHomeTabs', function () {
//    $(".row-c.row-list-c").html("");
//    var tag = $(this).attr("tag");
//    if (tag == "1") {
//        $("#buttonsLOI").hide();
//        $("#buttonsHome").show();
//        $("#btnViewBulkDtls").show();
//    }
//    if (tag == "2") {
//        $("#buttonsHome").hide();
//        $("#buttonsLOI").show();
//        $("#btnViewBulkDtls").hide();
//    }

//    $("#btnHome").attr("tag", tag);
//    cust_GetPara();
//    nwLoading_Start("actLoadLanding", crLoadingHTML);
//    func_ActionDriven("actLoadLanding", false);
//});
//prospect customer
$(document).on('click', '#btnProspectCust', function () {
    window.location.href = GetCurrentURL() + '../SBMyProspectCustomers';
});
//my customer
$(document).on('click', '#btnCustomerInfo', function () {
    window.location.href = GetCurrentURL() + '../SBCustomerMasterFile';
});
//sales call
$(document).on('click', '#btnSalesCall', function () {
    window.location.href = GetCurrentURL() + '../SBSalesCall';
});
//holding
$(document).on('click', '#btnHoldingUnit', function () {
    window.location.href = GetCurrentURL() + '../SBHoldingOfUnit';
});
//reservation
$(document).on('click', '#btnReseration', function () {
    window.location.href = GetCurrentURL() + '../SBReservationEntry';
});
//holding extension
$(document).on('click', '#btnHoldingExt', function () {
    window.location.href = GetCurrentURL() + '../SBRequestForExtension';
});
//client reg deact
$(document).on('click', '#btnClientReg', function () {
    window.location.href = GetCurrentURL() + '../SBClientRegDeactivation';
});
//Queue approval
$(document).on('click', '#btnQueueApproval', function () {
    window.location.href = GetCurrentURL() + '../SBQueueApproval';
});
//Lease to Own Entry
$(document).on('click', '#btnLeaseToOwn', function () {
    window.location.href = GetCurrentURL() + '../SPLTOEntry';
});
//IV Payment Term Grouping Entry
$(document).on('click', '#btnIVPayTermGroup', function () {
    window.location.href = GetCurrentURL() + '../IVPaymentTermGroupingEntry';
});
//Request for Bulk Holding
$(document).on('click', '#btnRequestBulkHold', function () {
    window.location.href = GetCurrentURL() + '../SBRequestBulkHolding';
});
//Transfer of Unit
$(document).on('click', '#btnTransOfUnit', function () {
    window.location.href = GetCurrentURL() + '../SBTransferOfUnit';
});
//Activity Details Entry
$(document).on('click', '#btnActDetEntry', function () {
    window.location.href = GetCurrentURL() + '../WFMActivityRqrmntComplianceEntry';
});
//inventory availability
$(document).on('click', '#btnInvAvailability', function () {
    window.location.href = GetCurrentURL() + '../REInvAvailabilitySummary';
});
//booking sumamry
$(document).on('click', '#btnBookingSummary', function () {
    window.location.href = GetCurrentURL() + '../MWMyBookingSummary';
});
//Transaction Summary
$(document).on('click', '#btnTransactionSummary', function () {
    window.location.href = GetCurrentURL() + '../REMyTransactionsSummary';
});
//Client Reg Summary
$(document).on('click', '#btnClientRegSummary', function () {
    window.location.href = GetCurrentURL() + '../SBDeactivatedClientRegSummRpt';
});
//Sales Call Report
$(document).on('click', '#btnSalesCallSummary', function () {
    window.location.href = GetCurrentURL() + '../SBSalesCallSummary';
});
//RE Line Up Transaction Report
$(document).on('click', '#btnLineUpTransRprt', function () {
    window.location.href = GetCurrentURL() + '../RELineUpTransactionReport';
});
//Letter of Intent (LOI)
$(document).on('click', '#btnLOIEntry', function () {
    window.location.href = GetCurrentURL() + '../SBLetterOfIntent';
});
//LOI Holding of Unit
$(document).on('click', '#btnLOIHoldUnit', function () {
    window.location.href = GetCurrentURL() + '../SPLOIHoldingOfUnit';
});
//My LOI Booking Summary
$(document).on('click', '#btnLOIMyBookSumm', function () {
    window.location.href = GetCurrentURL() + '../MWLOIMyBookingSummary';
});
//Ranking Summary
$(document).on('click', '#btnLOIRankSumm', function () {
    window.location.href = GetCurrentURL() + '../SPLOIRankingSummary';
});



//LogoutJS by RPB 11142022
$(document).ready(function () {
    $(".nav-user-dd").on("click", function () {
        $(this).toggleClass('active');
    })
})