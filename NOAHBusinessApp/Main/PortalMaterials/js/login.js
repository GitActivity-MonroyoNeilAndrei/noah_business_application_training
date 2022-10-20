$(document).on('keypress', '#txtPassword', function(e) {
if (e.which == 13) { $('#Button1').click(); }
});
$(document).on('change', '#txtUsername', function(e) {
        $(".MainPane").css("-webkit-filter","blur(2px)");
         $(".MainPane").css("-moz-filter","blur(2px)");
         $(".MainPane").css("-o-filter","blur(2px)");
         $(".MainPane").css("-ms-filter","blur(2px)");
         $(".MainPane").css("filter","blur(2px)");
         $(".MainPane").addClass("backgroundblur");
         
        $("body").append("<div id='p8usercheckerlogin' style='width: 100%;height: 100%; position: fixed;background-color: rgba(0, 0, 0, 0.5);color: white;font-size: 14px;font-family: arial;left: 0;top: 0px;text-align: center;'><div style='margin-top: 25%; text-indent: 30px;;'>Validating...</div></div>");
});

$(function() {
    crSTDLnk = "forms_standards/RunStandard.aspx";

    //alert(nwisMobile); nwisMobile = true;
    if (nwisMobile == true) { // && $(window).width() <= 490
        $('body').css("zoom", "1.7");
    }

    try {
        $('#p8usercheckerlogin').remove();
    } catch (err) { }

    $('#version').show();

});