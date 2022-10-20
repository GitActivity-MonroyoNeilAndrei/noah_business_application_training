var $ServerLink = "";

$(function () {
    nwTrustedLinks.push('localhost');


    var uname = jsonMainData["UInfo"][0].Description;
    $('.welcome-username').text(uname);
    $('.nav-user-name').text(uname);

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
            case "btnInfo":
                break;
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