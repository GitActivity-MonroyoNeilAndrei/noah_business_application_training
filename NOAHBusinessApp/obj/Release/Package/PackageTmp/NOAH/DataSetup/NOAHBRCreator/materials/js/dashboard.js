//    # BRSS DASHBOARD DESIGNER
//    # Company Owner: Forecasting and Planning Technologies Inc. | NOAH Business Applications | PROMPTUS 8
//    # Developer : Rico P. Buenviaje
//    # Designer : Rico P. Buenviaje
//    # Date Created : September 04, 2023
//    # Date Modified : 



// $(document).on("click", ".app-icons", function () {
//     const actionDivTarget = $(`#${$(this).attr("data-content")}`)

//     $(".app-aside-container").removeClass("show")
//     $(".app-aside-container").toggleClass("hide")

//     $(".app-icons").removeClass("selected");
//     $(this).addClass("selected");

//     actionDivTarget.removeClass("hide")
//     actionDivTarget.toggleClass("show")
// });


$(document).on("click", ".app-icons", function () {
    const actionDivTarget = $(`#${$(this).attr("data-content")}`);

    actionDivTarget.toggleClass("show");
    $(this).toggleClass("selected");
    $(".app-icons").not(this).removeClass("selected");
    $(".app-aside-container").not(actionDivTarget).removeClass("show");
});


$(document).on("click", ".app-btn-hide-sb", function () {
    $(this).toggleClass("active")
    $(".app-sidebar").toggleClass("hide");

    $(".app-aside-container").removeClass("show")

    $(".app-icons").removeClass("selected")
});

