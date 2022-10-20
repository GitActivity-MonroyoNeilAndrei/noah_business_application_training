//    # NEW NOAH SELLER PORTAL
//    # Company Owner: Forecasting and Planning Technologies Inc. | NOAH Business Applications | PROMPTUS 8
//    # Developer : Alvin Diaz Benedicto | Ma. Edgarda Malvar
//    # Designer : Alvin Diaz Benedicto
//    # Date Created : December 04, 2019
//    # Date Modified : December 04, 2019 | ADB
//    # Date Modified : December 05, 2019 | MAM


(function ($) {
    "use strict";

    var $doc = $(document),
		$body = $('body');

    var initTimer;

    var curSelectedID = "", curUnit = "", currentProperty = "";

    initTimer = setTimeout(initLoad, 0, clearTimeout(initTimer));

    // - - - F un c t i o n s - - - 
    function initLoad() {
        fnAccordion();
    }
    // Accordion
    function fnAccordion() {
        $doc.on("click", ".nk-accordion .nk-li .nk-li-title", function () {
            $(this).parents('.nk-li').siblings().removeClass('collapse');

            if ($(this).parents('.nk-li').hasClass('collapse')) {
                $(this).parents('.nk-li').removeClass('collapse');
            }
            else $(this).parents('.nk-li').addClass('collapse');
        });
    }

    //function fnCarousel() {
    $.fn.fnCarousel = function (settings) {

        var defaultSet = $.extend({
            autoPlay: false,
            slideDelay: 6000,
            slideEffect: "fade",
            fadeSpeed: 360,
            showControls: true,
            showNavButtons: true,
            autoHideNavButtons: false,
            showDots: true,
            zoomOnHover: false,
            showSlideTitle: true,
            autoHideSlideTitle: true,
            slideTitlePosition: "top right",
            fixWidthHeight: true,
            autoFitOnAnyDevice: true,
            sliderWidth: 500,
            sliderHeight: 300,
            sliderMinWidth: "initial",
            sliderMaxWidth: "initial",
            sliderMinHeight: "initial",
            sliderMaxHeight: "initial",
            border: false,
            borderWidth: 2,
            borderStyle: "solid",
            borderColor: "#bbbbbb",
            borderRadius: 4,
            pauseOnHover: true,
        }, settings);

        var arrBorderStyles = ["dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset", "none", "hidden"];

        var $carousel = $(this),
	    	slideCount = $carousel.find(".nk-carousel-slide").length, 			// Number of slides
	    	currentSlide = 0, 													// current position of carousal
	    	carouselIntervalID, 												// used to clear autoplay
	    	act = 'n',															// action if Next or Previous
			lastIndex = 0;

        // if autoPlay is on (auto slide)
        //if (defaultSet.autoPlay) {
        //    var st;
        //    st = setTimeout(startCarousel, 0, clearTimeout(st));
        //    if (defaultSet.pauseOnHover) {
        //        // on mouseover stop the autoplay
        //        $carousel.on("mouseover", function () {
        //            clearInterval(carouselIntervalID);
        //        });
        //        // on mouseout starts the autoplay
        //        $carousel.on("mouseout", function () {
        //            startCarousel();
        //        });
        //    }
        //}

        // if showControls (next, prev, dots buttons) is true
        if (defaultSet.showControls) {
            // if showNavButtons (next and prev button) is true
            if (defaultSet.showNavButtons)
                $carousel.find(".btn-carousel-actnav").addClass('show');
            // if showNavButtons (next and prev button) is false
            if (!defaultSet.showNavButtons)
                $carousel.find(".btn-carousel-actnav").hide();

            // if showDots (next and prev button) is true
            if (!defaultSet.showDots)
                $carousel.find(".btn-carousel-dotnav-cont").hide();

            // if autoHideNavButtons (next and prev buttons) is true
            defaultSet.autoHideNavButtons && $carousel.find(".btn-carousel-actnav").addClass('autohide');
        }

        // if showControls (next, prev, dots buttons) is false
        defaultSet.showControls || $carousel.find(".nk-carousel-actnav, .btn-carousel-dotnav-cont").hide();

        // if zoomOnHover is true (zoom effect on slider mouse hover)
        defaultSet.zoomOnHover && $carousel.find(".nk-carousel-slide").addClass('zoom');

        // if showSlideTitle (slide title) is true
        if (defaultSet.showSlideTitle) {
            // if autoHideSlideTitle (slide title) is false
            defaultSet.autoHideSlideTitle || $carousel.find(".nk-carousel-slide-title").show();
            // if autoHideSlideTitle (slide title) is true
            defaultSet.autoHideSlideTitle && $carousel.find(".nk-carousel-slide-title").addClass('autohide');
        }

        // if showSlideTitle (slide title) is false
        defaultSet.showSlideTitle || $carousel.find(".nk-carousel-slide-title").hide();

        if (defaultSet.fixWidthHeight) {
            $carousel.css({
                "width": String(defaultSet.sliderWidth).replace("px", "") + "px",
                "min-width": String(defaultSet.sliderWidth).replace("px", "") + "px",
                "max-width": String(defaultSet.sliderWidth).replace("px", "") + "px",
                "height": String(defaultSet.sliderHeight).replace("px", "") + "px",
                "min-height": String(defaultSet.sliderHeight).replace("px", "") + "px",
                "max-height": String(defaultSet.sliderHeight).replace("px", "") + "px",
            });
        }

        if (defaultSet.autoFitOnAnyDevice) {
            $(window).on("resize", function () {
                if (defaultSet.sliderWidth <= $(window).width()) {

                }
            });
        }


        $(window).resize();

        $carousel.next(".nk-carousel-thumb-cont").append("<div class='nk-carousel-thumb-cont-wrap'></div>");

        // add a dot for each slide
        $carousel.find(".nk-carousel-slide").on("each", function () {
            $carousel.find(".btn-carousel-dotnav-cont").append("<div class='btn btn-carousel-dotnav'></div>");
            $carousel.next(".nk-carousel-thumb-cont").find(".nk-carousel-thumb-cont-wrap").append("<div class='btn btn-carousel-thumb'><div><img /></div></div>");
            $carousel.next(".nk-carousel-thumb-cont").find(".nk-carousel-thumb-cont-wrap").attr();
        });

        // add a thumbnail for each slide
        $carousel.find(".nk-carousel-slide").on("each", function () {
            $carousel.parents(".nk-image-viewer").append('<div class="nk-carousel-thumb-cont"></div>');
            $carousel.find(".btn-carousel-dotnav-cont").append("<div class='btn btn-carousel-dotnav'></div>");
            $carousel.next(".nk-carousel-thumb-cont").find(".nk-carousel-thumb-cont-wrap").append("<div class='btn btn-carousel-thumb'><div><img /></div></div>");
            $carousel.next(".nk-carousel-thumb-cont").find(".nk-carousel-thumb-cont-wrap").attr();
        });

        // put a show class on the first slide
        $carousel.find(".nk-carousel-slide").first().addClass("show s");

        // put a selected class on the first dot navigation
        $carousel.find(".btn-carousel-dotnav").first().addClass("selected");

        // fadeout all slide except on slide that has a show class
        $carousel.find(".nk-carousel-slide").not(".show").hide();

        // set css for slides
        $carousel.find(".nk-carousel-slide").css({
            'animation-duration': defaultSet.fadeSpeed / 1000 + "s", 			// set the animation duration of slide (please do not modify for better animation)

        });



        // 
        $carousel.css({
            //"border": ((!isNaN(defaultSet.borderWidth) ? defaultSet.borderWidth : 0) + "px") + " " +(arrBorderStyles.includes(defaultSet.borderStyle) ? defaultSet.borderStyle : "solid") + " " + ((typeof defaultSet.borderColor === "string" || defaultSet.borderColor instanceof String) ? defaultSet.borderColor : "transparent"),
            "border": defaultSet.borderWidth + "px" + " " + defaultSet.borderStyle + " " + defaultSet.borderColor,
            "border-radius": defaultSet.borderRadius + "px",
            "width": pixelToVW(defaultSet.sliderWidth) + "vw",
            "min-width": defaultSet.sliderMinWidth,
            "max-width": defaultSet.sliderMaxWidth,
            "height": pixelToVW(defaultSet.sliderHeight) + "vw",
            "min-height": defaultSet.sliderMinHeight,
            "max-height": defaultSet.sliderMaxHeight,
        });
        $carousel.next(".nk-carousel-thumb-cont").css({
            "width": Math.round($carousel.outerWidth()),
        });
        $carousel.next(".nk-carousel-thumb-cont").find(".btn.btn-carousel-thumb").css({
            "width": Math.round($carousel.outerWidth() / 5),
            "height": Math.round($carousel.outerWidth() / 5),
        });


        if (defaultSet.fixWidthHeight) {
            $carousel.css({
                "width": defaultSet.sliderWidth + "px",
                "height": defaultSet.sliderHeight + "px",
            });
        }

        // autoplay carousel
        //function startCarousel() {
        //    clearInterval(carouselIntervalID);
        //    carouselIntervalID = setInterval(nextSlide, defaultSet.slideDelay);
        //}


        // on navigation Button click
        $carousel.find(".btn-carousel-actnav-next").on("click", nextSlide);
        $carousel.find(".btn-carousel-actnav-prev").on("click", prevSlide);

        // go to next slide
        function nextSlide() {
            slideCount = $carousel.find(".nk-carousel-slide").length
            act = "n";
            currentSlide = $carousel.find(".nk-carousel-slide.show").index() + 1;
            if (currentSlide > slideCount - 1) currentSlide = 0;
            changeSlide(currentSlide, act);
        }

        // go to previous slide
        function prevSlide() {
            act = "p";
            currentSlide = $carousel.find(".nk-carousel-slide.show").index() - 1;
            if (currentSlide < 0) currentSlide = slideCount - 1;
            changeSlide(currentSlide, act);
        }

        $carousel.siblings(".btn-carousel-actnav-next").on("click", nextSlide);
        $carousel.siblings(".btn-carousel-actnav-prev").on("click", prevSlide);

        // Custom carousel fn for demo of AboitizLand
        function fnCustomActNavCarousel() {
        }

        // when the user use the dot button to navigate
        $carousel.find(".btn-carousel-dotnav").on("click", function (e) {
            lastIndex = currentSlide;
            currentSlide = $(this).index();
            if (currentSlide !== lastIndex) {
                (currentSlide > lastIndex) ? act = "n" : act = "p";
                changeSlide(currentSlide, act);
            }
        });

        //this changes the image and button selection
        function changeSlide() {
            $carousel.find(".nk-carousel-slide.show").removeClass("show n p s").fadeOut(defaultSet.fadeSpeed * 2);
            $carousel.find(".nk-carousel-slide").eq(currentSlide).addClass("show" + " " + act).fadeIn(defaultSet.fadeSpeed);

            // setting the dots on what slide is active
            $carousel.find(".btn-carousel-dotnav.selected").removeClass("selected");
            $carousel.find(".btn-carousel-dotnav").eq(currentSlide).addClass("selected");
            //startCarousel();
        }

        return $carousel;
    };

    //}

    function fnCarouselDefaults() {
    }

    function fnAutoPlayCarousel(delay) {
    }

    function fnSlideCarousel() {
    }
    function isNotNull(str) {
        if (str !== '' || str !== null || str !== undefined || typeof str !== 'undefined' || typeof str !== 'object' || str.length !== 0) return true;
        else return false;
    }

    // Responsive Converter
    function pixelToVH(value) {
        return ((100 * value) / window.innerHeight).toFixed(2);
    }
    function pixelToVW(value) {
        return ((100 * value) / window.innerWidth).toFixed(2);
    }
    function vhToPixel(value) {
        return ((window.innerHeight * value) / 100).toFixed(2) + "px";
    }
    function vwToPixel(value) {
        return ((window.innerWidth * value) / 100).toFixed(2) + "px";
    }





})(jQuery);



$(document).ready(function () {
    $(document).find("#nkSlider1").fnCarousel({
        sliderWidth: 800,
        sliderHeight: 500,
        borderRadius: 8,
        autoPlay: false,
        zoomOnHover: true,
        showDots: true,
        borderColor: '#dfdfdf',
    });
    $(document).find("#nkSlider2").fnCarousel({
        sliderWidth: 316,
        sliderHeight: 180,
        borderRadius: 8,
        autoPlay: false,
        zoomOnHover: true,
        showDots: true,
        borderColor: '#dfdfdf',
    });

    //
    $(document).on('click', '.hdr-tile,#btnBookingSummary', function (e) {
        e.preventDefault();
        //$(document).find('#secLanding').fadeOut('fast');
        $(document).find('#secBookingSummary').fadeIn();
        $(document).find("#secLanding, .secProject, #secAvailabilityChart, #secCommissionSummary, #secHoldingFrame, #secTransactionSummary").fadeOut('fast');
        var loc = "";
        if ($(this).attr("id") == "btnBookingSummary")
            loc = "reserved";
        else
            loc = $(this).attr("id").replace("btn", "");
        $(".main-c").animate({scrollTop: 0}, 600);
        $(window).scrollTop(0);

        setTimeout(function () {
            $([document.documentElement, document.body]).animate({
                scrollTop: $("#" + loc + "").offset().top
            }, 1000);
        }, 500);

    });

    //$(document).on('click', '#sdp1', function (e) {
    //	e.preventDefault();
    //	$(document).find('.secProject, #secBookingSummary').fadeOut('fast');
    //	$(document).find('#secAvailabilityChart').fadeIn();
    //	$(window).scrollTop(0);
    //});

    $(document).on('click', '#btnNavUser', function () {
        if ($(this).siblings('.nav-user-ddli').css('display') == 'none') {
            $(this).siblings('.nav-user-ddli').fadeIn('fast');
        }
        else {
            $(this).siblings('.nav-user-ddli').fadeOut('fast');
        }
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

    $(window).resize(function () {
        $(document).find(".nav-mob-ddli").css({
            "left": "",
            "top": "",
            "display": "",
        });
    });

    $(document).on("click", ".nav-mob-ddli-item", function () {
        $(this).parents(".nav-mob-ddli").fadeOut();
    });

    $(document).on('click', '.secProject .btnReturn', function () {
        curSelectedID = "";
        curUnit = "";
    });

    //$(document).on("mouseenter", `.pdlg-btn-dlgactions[dlgact-type="maximize"]`, function (e) {
    //    var state, curState = $(this).attr("data-state");
    //    $(this).attr("data-state", state => (curState == "normal" ? "Maximize" : "Restore Down"));
    //    console.log(state);
    //});

    $(document).on("click", `.pdlg-btn-dlgactions[dlgact-type="resize"], .iframe-actions > .btn.btn-cancel`, function (e) {
        var $p = $(this).parents(`.iframe_main[canbefullwidth="true"]`);

        if ($(this).hasClass("btn-cancel"))
        {
            $p.attr("fw-state", "cancel");
        }

        if ($p.length) {
            if ($p.attr("fw-state") == "normal") {
                $p.parents("body.new-np").css("overflow", "hidden");
                $p.attr("fw-state", "maximize");
                $(this).attr("title", "Restore Down");
            }
            else {
                $p.parents("body.new-np").css("overflow", "");
                $p.attr("fw-state", "normal");
                $(this).attr("title", "Maximize");
            }
        };
        
    });

    $(document).on("click", `.new-np[is-mobile="false"] .nav-li`, function (e) {
        //$(this).siblings(".nav-mob-ddli").hide();
    });

    $(".main-c").on("resize", isMobile);





    isMobile();
    //fnImagePlaceholder();
    closeableToggleContainer();



    //function fnImagePlaceholder() {
    //    setTimeout(function () {
    //        var $el = $(document).find(".li-img-c.cont");
    //        var str = `<div class="img-placeholder"></div>`;

    //        console.log($el.length);

    //        $el.each(function (e) {
    //            if (!~$el.eq(e).css("background-image").indexOf("url"))
    //                $el.eq(e).append(str);
    //            else {
    //                if ($el.eq(e).find(".img-placeholder").length)
    //                    $el.eq(e).find(".img-placeholder").remove();
    //            }
    //        });
    //    }, 1600, clearTimeout);
    //}

    function closeableToggleContainer() {
        var isTouchDevice = "ontouchstart" in document.documentElement;
        if (isMobile()) {
            console.log(`Client: Mobile || ${navigator.userAgent}`);
            $(".closeable-toggle-wrapper").each(function (d) {
                $(`.closeable-toggle-wrapper:eq(${d})`).on("touchstart", function (e) {
                    var mousemoveCount = [];
                    mousemoveCount.push(e.changedTouches[0].clientY);
                    $(`.closesable-wrapper:eq(${d})`).css("top", "");
                    alert();

                    if (isTouchDevice) {
                        $(`.nav-mob-ddli:eq(${d})`).on("touchmove", function (f) {
                            mousemoveCount.push(f.changedTouches[0].clientY);
                            $(`.closesable-wrapper:eq(${d})`).css("top", f.changedTouches[0].clientY);

                            if (f.changedTouches[0].clientY > ($(`.nav-mob-ddli:eq(${d})`).outerHeight() * 0.90) + 58) {
                                $(`.closesable-wrapper:eq(${d})`).css("top", "58px");
                                $(this).off('touchmove');
                                $(this).off('mousemove');
                            }
                        });

                        $(`.nav-mob-ddli:eq(${d})`).on("touchend", function (g) {
                            var wh = ($(`.nav-mob-ddli:eq(${d})`).outerHeight() * 0.25) + 58;

                            if (g.changedTouches[0].clientY <= wh) {
                                $(`.closesable-wrapper:eq(${d})`).css("top", "58px");
                            }
                            else if (g.changedTouches[0].clientY > wh && mousemoveCount.length > 2) {
                                $(`.nav-mob-ddli:eq(${d})`).fadeOut();
                                $(`.closesable-wrapper:eq(${d})`).css("top", "");
                            }
                            mousemoveCount = [];
                            $(this).off("touchmove touchstart");
                            $(this).css({
                                "background-color": "",
                                "-moz-cursor": "",
                                "cursor": "",
                            });
                        });
                    }
                });
            });
        }
        else {
            console.log(`Client: PC Web Browser || ${navigator.userAgent}`);
            $(".closeable-toggle-wrapper").each(function (d) {
                $(`.closeable-toggle-wrapper:eq(${d})`).on("mousedown", function (e) {
                    var mousemoveCount = [];
                    $(`.closesable-wrapper:eq((${d})`).css("top", "");

                    $(`.nav-mob-ddli:eq(${d})`).on('mousemove', function (f) {
                        mousemoveCount.push(f.clientY);
                        $(`.closesable-wrapper:eq(${d})`).css("top", f.clientY);

                        if (f.clientY > ($(`.nav-mob-ddli:eq(${d})`).outerHeight() * 0.90) + 58) {
                            $(`.closesable-wrapper:eq(${d})`).css("top", "58px");
                            $(this).off('mousemove');
                        }
                    }).on("mouseup", function (g) {
                        var wh = ($(`.nav-mob-ddli:eq(${d})`).outerHeight() * 0.25) + 58;

                        if (g.clientY <= wh) {
                            $(`.closesable-wrapper:eq(${d})`).css("top", "58px");
                        }
                        else if (g.clientY > wh && mousemoveCount.length > 2) {
                            $(`.nav-mob-ddli:eq(${d})`).fadeOut();
                            $(`.closesable-wrapper:eq(${d})`).css("top", "");
                        }
                        $(this).off("mousemove mousedown");
                        mousemoveCount = [];
                    });
                });
            });
        }
    }

    function isMobile() {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
            || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
            //$(document).find("body").attr("is-mobile", "true");
            return true;
        }
        else {
            //$(document).find("body").attr("is-mobile", "false");
            return false;
        }
    }

    $(document).on('click', '#secAvailabilityChart .btnReturn', function () {
        $(document).find('#secAvailabilityChart').fadeOut('fast');
        //$(document).find('.secProject').fadeIn();

        $(".main-c").animate({scrollTop: 0}, 600);
        $(window).scrollTop(0);

        currentProperty = $('#' + curSelectedID + '.list-item.btn').attr("data-proptype");

    });
    $(document).on('click', '#secTransactionSummary .btn-cancel', function () {
        $(document).find('#secTransactionSummary').fadeOut('fast');
        $(document).find("#secLanding").fadeIn();
    });

    $(document).on('click', '.lvl-c', function () {
        $(document).find('.side-popup.clicked-lvl').fadeIn();
    });

    $(document).on('click', '.btn-cancel', function () {
        $(this).parents('.pdlg').fadeOut();
        $(this).parents('.iframe_main').fadeOut();
    });

    //close
    $(document).on('click', '.btn-close', function () {
        //$(this).parents('.iframe_main').fadeOut();
        $("#iFrame1").attr("src", "");
        $(document).find('#popup').fadeOut(1000);
    });
    ////close
    //$(document).on('click', '#btnLogout', function () {
    //    window.location.href = '../../../Login/default.aspx';
    //});

    ////change of preferred location
    //$(document).on('change', '#cmbLocation', function () {
    //    var loc = $(this).val().replace(" ", "");
    //    $([document.documentElement, document.body]).animate({
    //        scrollTop: $("#" + loc + "").offset().top
    //    }, 1000);
    //});

    // 02-10-2020
    // On landing page card list selecton
    $(document).on("click", "#secLanding div.list-item", function () {
        $(document).find(".secProject .row-hdr .lbl-title-list").text($(this).find(".li-item-name").text());
        curUnit = $(this).find(".li-item-name").text();
    });

    // On Project page image selection
    $(document).on("click", ".secProject a .img-l", function () {
        //$(document).find("#secAvailabilityChart .row-hdr .lbl-title-list").text($(document).find(".secProject .row-hdr .lbl-title-list").text());
        $(document).find("#secAvailabilityChart .row-hdr .lbl-title-list").text(curUnit);
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

    //$(document).on("click", ".hdr-tile", function () {
    //    $(document).find("#secBookingSummary").fadeIn();

    //});

    $(document).find("table.--has-width").wrap("<div class='tbl-wrapper'></div>");

    //$("table").each(function (i) {
    //    var $tbl = $(this),
    //        tblid = $tbl.eq(i).attr("id"),
    //        $td = $tbl;
    //    switch ($tblid) {
    //        case "":
    //            break;
    //        default:

    //    }
    //    for (var x = 0; x < length; x++) {
    //        if ($td.text)//Select('Anuva-Azalea', '1');

    //    }
    //})

    $(document).find("table td:contains(Fully Paid)").parents("tr").addClass("--fully-paid");

    $(document).find(".nk .btn.btn-tlbr").each(function (index) {
        $(this).css({
            "animation-delay": (0.14 * (index - .4)) + "s",
            "display": "inline-block",
        });
    });

    //$(document).on("click", ".btn.btnReturn, .nav-li, #btnHold, #btnReserveNow", function () {
    //    $(document).find(".side-popup.clicked-lvl").fadeOut();
    //});

    $(document).find(".nk .row.content-centered > .col, .new-np .row-c.row-list-c").last().addClass("row-lastborder-c");
    $(document).find(".side-popup.clicked-lvl").children().css("position", "relative").wrapAll("<div class='wrapper-lvl-preview'>");
    $(document).find(".side-popup.clicked-lvl").append('<div class="pdlg-actions"><div class="btn btn-cancel">Cancel</div></div>');

    $(document).on("click", ".side-popup.clicked-lvl .pdlg-actions", function () {
        $(this).parents(".side-popup.clicked-lvl").fadeOut();
    });

    $(document).on("mousewheel DOMMouseScroll", ".main-c", function (e) {
        if (isMobile) {
            if ($(this).outerWidth() < 800) {
                if($(this).scrollTop() > 0) $(document).find(".nav-user").hide();
                else $(document).find(".nav-user").show();
            }
        }
    });

    $(".main-c").scroll(function (e) {
        if (isMobile) {
            if ($(this).outerWidth() < 800) {
                $(this).scrollTop() > 0
                ? $(document).find(".nav-user").hide()
                : $(document).find(".nav-user").show();
            }
        }
    });

    $(document).on("click", "#lblBulk", function () {
        $(document).find(".lblchk").addClass("_notext");
    });
});

//MAM
function RefreshUnit(cursel, isShow) {
    currentProperty = cursel;

    $(document).find('#secProject').fadeIn();
    $(document).find('#secAvailabilityChart').fadeIn();

    Select(curUnit);
}

function Select(val) {
    $('#listTitle').text(val);
    $('.btn-cancel').parents('.pdlg').fadeOut();
    $(document).find('.side-popup.clicked-lvl').fadeOut();
}


fnAnimateTlbrBtn();
function fnAnimateTlbrBtn() {
    //var $tlbrBtn = $(document).find(".nk .btn.btn-tlbr");
    //for (var i = 0; i < $tlbrBtn.length; i++) {
    //    $tlbrBtn.eq(i).css({
    //        "animation-delay": 0.2 * (0.18 + i) + "s",
    //        "display": "inline-block"
    //    });
    //}
    $(document).find(".nk .btn.btn-tlbr").each(function (index) {
        $(this).css({
            "animation-delay": 0.2 * (0.18 + index) + "s",
            "display": "inline-block",
        });
    });
}

function fnSetSelectedIframeHeight(id) {
    // Selecting the iframe element
    var iframe = document.getElementById(id);

    $(document).find("#" + id).css({
        "height": iframe.contentWindow.document.body.scrollHeight + 'px',
    });

    //if (iframe != null && iframe != undefined && iframe != "") {
    //    // Adjusting the iframe height onload event
    //    iframe.onload = function () {
    //        $(document).find("#" + id).css({
    //            "height": iframe.contentWindow.document.body.scrollHeight + 'px',
    //        });
    //    }
    //}
}

//window.onload = function () {

//    $(document).on("click", "#btnHome", fnShowHome);
//    $(window).resize(fnShowHome);

//    function fnShowHome() {
//        if ($(window).width() < 800) {
//            $(".nav-li").removeClass("active");
//            $("#btnHome").addClass("active");
//            $(".nav-mob-ddli").hide();
//            $("#secLanding").fadeIn();
//        }
//    }
//};