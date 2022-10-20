//    # NOAH UI KIT
//    # Company Owner: Forecasting and Planning Technologies Inc. | NOAH Business Applications | PROMPTUS 8
//    # Developer : Alvin Diaz Benedicto | Rico P. Buenviaje
//    # Designer : Alvin Diaz Benedicto | Rico P. Buenviaje
//    # Date Created : August 27, 2019
//    # Date Modified : May 13, 2022 | RPB TBD Rics

(function () {
	"use strict";

	var $doc = $(document),
		$body = $('body');

	var initTimer;

	initTimer = setTimeout(initLoad, 0, clearTimeout(initTimer));

	// - - - F un c t i o n s - - - 
	function initLoad() {
		fnUIDropdown();
		fnGridSelectionActive();
		fnCheckActive();
		fnGridList();

		fnShowPopupMsg();
		fnDropDownWithIcon(); 
		fnCheckboxSelected();
		fnslideMsgPopUp(); 
		fnAniDropdown(); 
		fnCheckAll(); 
		fnMsgErrorPopUp();
		fnMsgSuccessPopUp(); 
		fnMsgInfoPopUp();
		fnMsgwithBg();
		fnClassBaseAni();
		fnCheckBox();
		fnIconizedHdrBtn();
	}


	// Component: Dropdown
	function fnUIDropdown() {

		// Click Event (Drop list)
		$doc.on("click", ".dropdown-button", function () {
			var $p = $(this).parents(".dropdown"), $s = $p.find(".dropdown-content");
			$s.finish();
			$s.css("display") == "block" ? $s.animate({ "opacity": "0", "margin-top": "8px" }, 120).fadeOut() : $s.show().animate({ "opacity": "1", "margin-top": "2px" }, 120);
			$p.toggleClass("expand");
		});

		// Filter
		$doc.on("keyup", ".dropdown-txtbox", function () {
			var $input = $(this),
				$list = $(this).parents(".dropdown").find(".dropdown-content"),
				filter = $input.val().toLowerCase(),
				item = $list.find(".dropdown-list");

			item.each(function (j) {
				var val = item.eq(j).text();
				val.toLowerCase().indexOf(filter) > -1 ? item.eq(j).css("display", "") : item.eq(j).hide();
			});
		}).on("change", ".dropdown-txtbox", function() {
			$(this).parents(".dropdown").find(".dropdown-list").css("display", "");
        });

		// Clear Filter
		$doc.on("click", ".dropdown-txtbox-clear", function () {
			$(this).siblings(".dropdown-txtbox").val("").focus();
		});
	}


	//function fnUICarousel() {
	$.fn.fnUICarousel = function (settings) {

		var defaultSet = $.extend({
			autoPlay: true,
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
		if (defaultSet.autoPlay) {
			var st;
			st = setTimeout(startCarousel, 0, clearTimeout(st));
			if (defaultSet.pauseOnHover) {
				// on mouseover stop the autoplay
				$carousel.on("mouseover", function () {
					clearInterval(carouselIntervalID);
				});
				// on mouseout starts the autoplay
				$carousel.on("mouseout", function () {
					startCarousel();
				});
			}
		}

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

		// fixWidthHeight: false,
		// fitOnMobile: true,
		// sliderWidth: 500,
		// sliderHeight: 300,
		// sliderMinWidth: "initial",
		// sliderMaxWidth: "initial",
		// sliderMinHeight: "initial",
		// sliderMaxHeight: "initial",

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


			// $carousel.css({
			// 	"width": pixelToVW(defaultSet.sliderWidth) + "px",
			// 	"min-width": defaultSet.sliderMinWidth,
			// 	"max-width": defaultSet.sliderMaxWidth,
			// 	"height": pixelToVH(defaultSet.sliderHeight) + "px",
			// 	"min-height": defaultSet.sliderMinHeight,
			// 	"max-height": defaultSet.sliderMaxHeight,
			// });
		}

		//$(window).resize();

		$carousel.next(".nk-carousel-thumb-cont").append("<div class='nk-carousel-thumb-cont-wrap'></div>");

		// add a dot for each slide
		$carousel.find(".nk-carousel-slide").on("each", function () {
			$carousel.find(".btn-carousel-dotnav-cont").append("<div class='btn btn-carousel-dotnav'></div>");
			$carousel.next(".nk-carousel-thumb-cont").find(".nk-carousel-thumb-cont-wrap").append("<div class='btn btn-carousel-thumb'><div><img /></div></div>");
			// $carousel.next(".nk-carousel-thumb-cont").find(".nk-carousel-thumb-cont-wrap").attr()
		});

		// add a thumbnail for each slide
		$carousel.find(".nk-carousel-slide").on("each", function () {
			$carousel.parents(".nk-image-viewer").append('<div class="nk-carousel-thumb-cont"></div>');
			$carousel.find(".btn-carousel-dotnav-cont").append("<div class='btn btn-carousel-dotnav'></div>");
			$carousel.next(".nk-carousel-thumb-cont").find(".nk-carousel-thumb-cont-wrap").append("<div class='btn btn-carousel-thumb'><div><img /></div></div>");
			$carousel.next(".nk-carousel-thumb-cont").find(".nk-carousel-thumb-cont-wrap").attr()
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
		})


		if (defaultSet.fixWidthHeight) {
			$carousel.css({
				"width": defaultSet.sliderWidth + "px",
				"height": defaultSet.sliderHeight + "px",
			});
		}

		// autoplay carousel
		function startCarousel() {
			clearInterval(carouselIntervalID);
			carouselIntervalID = setInterval(nextSlide, defaultSet.slideDelay);
		}

		// on navigation Button click
		$carousel.find(".btn-carousel-actnav-next").on("click", nextSlide);
		$carousel.find(".btn-carousel-actnav-prev").on("click", prevSlide);

		// go to next slide
		function nextSlide() {
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
			startCarousel();
		}

		return $carousel;
	};

	//}

	function fnUICarouselDefaults() {
	}

	function fnUIAutoPlayCarousel(delay) {
	}

	function fnUISlideCarousel() {
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
	
	// Draggable Grid List Items
	//function fnDraggableGridList() {

	//}

	$(document).ready(function () {
	    var dragDestIndex,
			draggedElIndex,
			rearranging = false,
			rearrangingDuration = 420,
			colCount;
	    var $draggableCont = $doc.find(".draggable-c"),
			$draggableItems,
			$draggedEl,
			draggedElContID;

	    fnInitDraggableGrid();
	    function fnInitDraggableGrid() {
	        $doc.find(".draggable-c").each(function () {
	            var $this = $(this);

	            $draggableCont = $doc.find("#" + $this.attr("id")) || "";
	            colCount = $this.attr("nk-col-count") || 1;
	            $draggableItems = $this.find(".draggable-item");

	            isNotNull($draggableCont) && arrangeItems($draggableItems, colCount, $draggableCont);
	        });
	    }

	    function arrangeItems(draggableItems, columnCount, draggableCont) {
	        if (!isNotNull(draggableCont)) return;

	        var $draggableCont = draggableCont,
				$draggableItems = draggableItems,
				colCount = columnCount;
	        var elWidth = $draggableCont.outerWidth() / colCount,
				elHeight = $draggableCont.find(".draggable-item").outerHeight();

	        for (var i = 0; i < $draggableItems.length; i++) {
	            var $item = $($draggableItems[i]);
	            var pos = {
	                x: parseInt(i % colCount),
	                y: parseInt(i / colCount)
	            };

	            $item.data("index", i);
	            $item.css({
	                top: Math.round(pos.y * elHeight) + "px",
	                left: Math.round(pos.x * elWidth) + "px",
	                width: Math.round(100 / colCount) + "%",
	            });
	        }
	    }

	    function rearrangeItems(arr, movedItemIndex, destinationIndex) {
	        var movedEl = arr.splice(movedItemIndex, 1)[0];
	        arr.splice(destinationIndex, 0, movedEl);
	        return arr;
	    }

	    $(window).resize(function () {
	        fnInitDraggableGrid();
	        getHighestItemHeight();
	    });

	    $doc.on("dragstart", ".draggable-item", function (e) {
	        var $this = $(this),
				id = $this.parents(".draggable-c").attr("id");
	        var sortedArr = [];

	        $draggedEl = $this;
	        draggedElContID = id;

	        if (!isNotNull(id)) return;

	        $draggableItems = $doc.find("#" + id).find(".draggable-item");
	        colCount = $doc.find("#" + id).attr("nk-col-count") || 1;

	        for (var i = 0; i < $draggableItems.length; i++) {
	            var elIndex = $($draggableItems[i]).data("index");
	            sortedArr[elIndex] = $draggableItems[i];
	        }

	        $draggableItems = sortedArr;
	        draggedElIndex = $this.data("index");

	        $this.css({
	            opacity: 0,
	        });
	    });

	    $doc.on("dragover", ".draggable-item", function (e) {
	        e.preventDefault();

	        if (rearranging) return;

	        var dragDestIndex = $(this).data("index");

	        draggedElIndex = $draggedEl.data("index");

	        if (draggedElIndex !== dragDestIndex) {
	            rearranging = true;

	            var $rearrangedEls = rearrangeItems($draggableItems, draggedElIndex, dragDestIndex);

	            arrangeItems($rearrangedEls, colCount, $doc.find("#" + draggedElContID));

	            setTimeout(function () {
	                rearranging = false;
	            }, rearrangingDuration);
	        }
	    });

	    $doc.on("dragend", ".draggable-item", function (e) {
	        e.preventDefault();
	        $(this).css({
	            opacity: 1,
	        });
	    });

	    $doc.on("drop", ".draggable-item", function (e) {
	        e.preventDefault();
	        rearranging = false;
	    });

	    getHighestItemHeight();
	    function getHighestItemHeight() {
	        var $dc = $doc.find(".draggable-c");

	        $dc.each(function (i) {
	            var $c = $(this).find(".draggable-item");
	            var hh = 0, lt = 0, tt = 0;

	            $c.css({ height: "", });

	            $c.each(function (j) {
	                var $this = $(this), $el, $el2;

	                if ($this.outerHeight() > hh) {
	                    hh = $this.outerHeight();
	                }
	                if ($this.position().top > lt) {
	                    lt = $this.position().top;
	                    tt = lt + hh;
	                }
	            });

	            $c.css({ height: hh + "px", });
	            $c.parents(".draggable-c").css({ height: tt + "px", });
	        });
	    }
	})

	function fnIconizedHdrBtn() {
		$doc.on("click", ".btn-iconized.btn-iconized-select, .btn-iconized.btn-iconized-delete", function () {
			$(this).siblings(".btn-iconized").removeClass("active");
			$(this).toggleClass("active");
			var c = $(this).attr("class").split(/\s+/);
			var $el = $(this).parents(".iconized-hdr-button").siblings(".draggable-c");
			if ($(this).hasClass("active")) {
				if (c.indexOf("btn-iconized-select") > -1)
					$el.attr("nk-select-mode", "select");
				else if (c.indexOf("btn-iconized-delete") > -1)
					$el.attr("nk-select-mode", "delete");
			}
			else
				$el.attr("nk-select-mode", "");
		});
	}

	//$(document).ready(function () {
	//    $(document).on("click", ".btn-iconized.btn-iconized-select, .btn-iconized.btn-iconized-delete", function () {
	//        $(this).siblings(".btn-iconized").removeClass("active");
	//        $(this).toggleClass("active");
	//        var c = $(this).attr("class").split(/\s+/);
	//        var $el = $(this).parents(".iconized-hdr-button").siblings(".draggable-c");
	//        if ($(this).hasClass("active")) {
	//            if (c.indexOf("btn-iconized-select") > -1)
	//                $el.attr("nk-select-mode", "select");
	//            else if (c.indexOf("btn-iconized-delete") > -1)
	//                $el.attr("nk-select-mode", "delete");
	//        }
	//        else
	//            $el.attr("nk-select-mode", "");
	//    });
	//})
	
	function fnGridSelectionActive() {
		$doc.on("click", ".di-inner", function () {
			var mode = $(this).parents(".draggable-c").attr("nk-select-mode");
			if (mode == "select") {
				$(this).removeClass("selected-remove");
				$(this).toggleClass("selected");
			}
			else if (mode == "delete") {
				$(this).removeClass("selected");
				$(this).toggleClass("selected-remove");
			}
		});
	}
	
	//function fnPagination() {

	//}

	$(document).ready(function () {
	    var $pg = $doc.find(".pagination-c");
	    var $ellipsis = `<div class="page-ellipsis hide">...</div>`;

	    $pg.each((i) => {
	        var $this = $pg.eq(i);
	        var currentpagenum = $this.attr("nk-current-page");
	        var currentpagecount = $this.attr("nk-page-count");
	        var pagethreshold = $this.attr("nk-page-threshold");

	        $this.attr("sid", `nkPagination${i}`);

	        (!currentpagenum || currentpagenum == 0) && $this.attr("nk-current-page", "1");
	        (!currentpagecount || currentpagecount == 0) && $this.attr("nk-page-count", "5");
	        (!pagethreshold || pagethreshold <= 0 || pagethreshold > 10) && $this.attr("nk-page-threshold", "10");

	        // get again the new value of the current page number and current page count
	        var recurrentpagenum = +$this.attr("nk-current-page");
	        var recurrentpagecount = +$this.attr("nk-page-count");
	        var repagethreshold = +$this.attr("nk-page-threshold");

	        $this.find(".page-count").length > 0 && $this.find(".page-count, .page-control").remove();

	        if ($this.find(".page-count").length < 1) {
	            var pagediv = document.createDocumentFragment();
	            for (let x = 1; x <= recurrentpagecount; x++) {
	                var $el = document.createElement("div");

	                $el.className = "page-count";
	                $el.innerHTML = x;
	                if (x == recurrentpagenum) $el.className += " selected";
	                if (x >= repagethreshold && x < recurrentpagecount) $el.className += " hide";
	                pagediv.appendChild($el);
	            }

	            setTimeout(() => {
	                $this.append(pagediv);
	            }, 100, clearTimeout);

	            setTimeout(() => {
	                var $page = $this.find(".page-count");

	                $page.first().after($ellipsis);
	                $page.last().before($ellipsis);
	                if ($this.find(".page-count").length > repagethreshold) {
	                    $this.find(".page-ellipsis:last").removeClass("hide")
	                }
	                $this.prepend(`<div class="page-control page-control-prev">Prev</div>`);
	                $this.append(`<div class="page-control page-control-next">Next</div>`);
	            }, 100, clearTimeout);
	        }
	    });

	    $doc.on("click", ".pagination-c .page-count:not(.hide)", function () {
	        var $this = $(this);
	        var $p = $(this).parents(".pagination-c");
	        var $page = $p.find(".page-count");
	        var $ellip = $p.find(".page-ellipsis");
	        var pagecount = $p.find(".page-count").length;
	        var threshold = $p.attr("nk-page-threshold") || 10;

	        $page.removeClass("selected");
	        $this.addClass("selected");

	        var a = threshold;
	        var b = pagecount;

	        if (b <= a) return;

	        if ($this.text() == "1") {
	            for (let x = 0; x < (b - 1) ; x++) {
	                $page.eq(x).removeClass("hide");
	                x >= (a - 1) && $page.eq(x).addClass("hide");
	            }
	            $page.eq(b - 1).removeClass("hide");
	            $ellip.first().addClass("hide");
	            $ellip.last().removeClass("hide");
	        }
	        else if ($this.text() == b) {
	            for (let x = a; x < b; x++) {
	                $page.eq(x - 1).removeClass("hide");
	                $page.eq(x - (a - 1)).addClass("hide");
	            }
	            $ellip.first().removeClass("hide");
	            $ellip.last().addClass("hide");
	        }
	    });

	    $doc.on("click", ".pagination-c .page-control.page-control-next", function () {
	        var $p = $(this).parents(".pagination-c");
	        var $page = $p.find(".page-count");
	        var $lastpage = $page.last();
	        var $selectedpage = $p.find(".page-count.selected");
	        var tempcount = +$selectedpage.text();
	        var targetcount = tempcount + 1;
	        var threshold = +$p.attr("nk-page-threshold");
	        var $ellip = $p.find(".page-ellipsis");

	        if (targetcount <= +$lastpage.text()) {
	            $page.removeClass("selected").eq(tempcount).addClass("selected");
	            $p.attr("nk-current-page", targetcount);

	            if (+targetcount >= threshold && targetcount < +$lastpage.text()) {
	                var tohidecount = targetcount - (threshold - 1);
	                $page.eq(tempcount).removeClass("hide");
	                $page.eq(tohidecount).addClass("hide");
	                $ellip.first().removeClass("hide");
	            }
	            (targetcount == (+$lastpage.text() - 1)) && $ellip.last().addClass("hide");
	        }
	    });

	    $doc.on("click", ".pagination-c .page-control.page-control-prev", function () {
	        var $p = $(this).parents(".pagination-c");
	        var $page = $p.find(".page-count");
	        var $firstpage = $page.first();
	        var $selectedpage = $p.find(".page-count.selected");
	        var tempcount = +$selectedpage.text() - 2;
	        var targetcount = tempcount + 1;
	        var threshold = +$p.attr("nk-page-threshold");
	        var $ellip = $p.find(".page-ellipsis");

	        if (targetcount >= +$firstpage.text()) {
	            $page.removeClass("selected").eq(tempcount).addClass("selected");
	            $p.attr("nk-current-page", targetcount);

	            var $toshow = $page.eq(tempcount);
	            if ($toshow.hasClass("hide")) {
	                var tohidecount = tempcount + (threshold - 2);
	                $toshow.removeClass("hide");
	                $page.eq(tohidecount).addClass("hide");
	                $ellip.last().removeClass("hide");
	            }

	            tempcount == 1 && $ellip.first().addClass("hide");
	        }
	    });
	})

    //Rico JS 232021
	function fnShowPopupMsg() {
	    $doc.on("click", "#btnSuccessPopup", function () {
	        $(".mdl-msg-sfp").addClass("active");
	    });

	    $doc.on("click", ".mdl-msg-sfbtn, .mdl-msg-sfx", function () {
	        $(".mdl-msg-sfp").removeClass("active");
	    });
	}


	// Component: Image Viewer
	$(document).ready(function () {
	    function setSlide(number) {
	        clearSelected();
	        currentSlide(number);
	        // document.querySelectorAll(".thumbImage")[number - 1].style.borderBottom = "6px solid purple";
	    }

	    function clearSelected() {
	        Array.from(document.querySelectorAll(".slth-img")).forEach(
                (item) => (item.style.borderBottom = "")
            );
	    }

	    var slideIndex = 1;
	    var prv = () => changeSlides(-1);
	    var nxt = () => changeSlides(1);

	    $doc.on("click", ".btnSlidePrev", prv);
	    $doc.on("click", ".btnSlideNext", nxt);

	    setTimeout(() => {
	        showSlides(slideIndex);
	    }, 80, clearTimeout);

	    function changeSlides(n) {
	        showSlides(slideIndex += n);
	    }

	    function currentSlide(n) {
	        showSlides(slideIndex = n);
	    }

	    function showSlides(n) {
	        var i;
	        var slides = document.getElementsByClassName("slide");

	        if (n > slides.length) slideIndex = 1;
	        if (n < 1) slideIndex = slides.length;

	        Array.from(slides).forEach((item) => (item.style.display = "none"));
	        slides[slideIndex - 1].style.display = "block";
	    }

	    $(document).on("click", ".slth-img", function (e) {
	        var index = $(this).parents(".slth-col").index() + 1;
	        setSlide(index);
	    });

	    // magnifier
	    var defaultMagnifierZoomVal = 4;
	    setTimeout(() => {
	        fnMagnifySlide("sliderImage0", defaultMagnifierZoomVal);
	    }, 100, clearTimeout);


	    $doc.on("change", "#chkSliderShowMagnifier", function () {
	        var $this = $(this), $p = $(this).parents(".slider-container");
	        var $mag = $p.find(".img-magnifier-glass");
	        var $btn = $p.find(".btnSlidePrev, .btnSlideNext");
	        var $slide = $p.find(".slide:visible").find("img").attr("id") || "";

	        // console.log($slide);
	        if ($this.is(":checked")) {
	            setTimeout(() => {
	                $btn.fadeOut();
	                $mag.fadeIn();
	                if (isNotNull($slide)) {
	                    fnMagnifySlide($slide, defaultMagnifierZoomVal);
	                }
	            }, 10, clearTimeout);
	        }
	        else {
	            setTimeout(() => {
	                $btn.fadeIn();
	                $mag.fadeOut();
	            }, 10, clearTimeout);
	        }
	    });

	    function fnMagnifySlide(imgID, zoom) {
	        var img, glass, w, h, bw;
	        img = document.getElementById(imgID);

	        /* Create magnifier glass: */
	        glass = document.createElement("div");
	        glass.setAttribute("class", "img-magnifier-glass");

	        /* Insert magnifier glass: */
	        img.parentElement.insertBefore(glass, img);

	        /* Set background properties for the magnifier glass: */
	        glass.style.backgroundImage = "url('" + img.src + "')";
	        glass.style.backgroundRepeat = "no-repeat";
	        glass.style.backgroundSize =
                img.width * zoom + "px " + img.height * zoom + "px";
	        bw = 3;
	        w = glass.offsetWidth / 2;
	        h = glass.offsetHeight / 2;

	        /* Execute a function when someone moves the magnifier glass over the image: */
	        glass.addEventListener("mousemove", moveMagnifier);
	        img.addEventListener("mousemove", moveMagnifier);

	        /*and also for touch screens:*/
	        glass.addEventListener("touchmove", moveMagnifier);
	        img.addEventListener("touchmove", moveMagnifier);
	        function moveMagnifier(e) {
	            var pos, x, y;
	            /* Prevent any other actions that may occur when moving over the image */
	            e.preventDefault();
	            /* Get the cursor's x and y positions: */
	            pos = getCursorPos(e);
	            x = pos.x;
	            y = pos.y;

	            /* Prevent the magnifier glass from being positioned outside the image: */
	            if (x > img.width - w / zoom)
	                x = img.width - w / zoom;
	            if (x < w / zoom)
	                x = w / zoom;
	            if (y > img.height - h / zoom)
	                y = img.height - h / zoom;
	            if (y < h / zoom)
	                y = h / zoom;

	            /* Set the position of the magnifier glass: */
	            glass.style.left = x - w + "px";
	            glass.style.top = y - h + "px";
	            /* Display what the magnifier glass "sees": */
	            glass.style.backgroundPosition = "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
	        }

	        function getCursorPos(e) {
	            var a, x = 0, y = 0;
	            e = e || window.event;

	            /* Get the x and y positions of the image: */
	            a = img.getBoundingClientRect();

	            /* Calculate the cursor's x and y coordinates, relative to the image: */
	            x = e.pageX - a.left;
	            y = e.pageY - a.top;

	            /* Consider any page scrolling: */
	            x = x - window.pageXOffset;
	            y = y - window.pageYOffset;
	            return { x: x, y: y };
	        }
	    }
	})

	//function activeSelect() {

	//}
	function fnDropDownWithIcon() {
        $doc.on("click", ".nf-default-opt", function() {
            $(this).parent().toggleClass("nf-active");
        })

        $doc.on("click", ".nf-opt-ul .nf-li", function () {
	        var currentSelected = $(this).html();
	        var wrapper = $(this).closest(".nf-select-c");
	        wrapper.find(".nf-default-opt .nf-li").html(currentSelected);
	        wrapper.removeClass("nf-active");
        })
	}

	//$(document).ready(function () {
	//    $(".nf-default-opt").click(function () {
	//        $(this).parent().toggleClass("nf-active");
	//    })

	//    $(".nf-opt-ul .nf-li").click(function () {
	//        var currentSelected = $(this).html();
	//        $(".nf-default-opt .nf-li").html(currentSelected);
	//        $(this).parents(".nf-select-c").removeClass("nf-active");
	//    });
	//})

	function fnCheckActive() {
	    $(".imgRdo").change(function () {
	        $(".img-rdo").removeClass('checked');
	        $(this).closest('.img-rdo').toggleClass('checked', this.checked);
	    });
	}

	function fnGridList() {
	    $doc.on("click", ".gridFolderItem", function () {
	        $(".gridFolderItem").removeClass("active");
	        $(this).addClass("active");
	    })


	    $doc.on("click", ".nwListView", function () {
	        $(".gridFolder").addClass("nwList");
	        $(".nwGridView").removeClass("hide");
	        $(".nwListView").addClass("hide");
	        //$(".nwGridView").show();
	    })

	    $doc.on("click", ".nwGridView", function () {
	        $(".gridFolder").removeClass("nwList");
	        $(".nwListView").removeClass("hide");
	        $(".nwGridView").addClass("hide");
	        //$(".nwGridView").hide();
	        //$(".nwListView").show();
	    })
	}
    //Component JS: CheckBox
	function fnCheckboxSelected() {
        $doc.on("change", ".check-group input:checkbox", function () {
            $(this).closest(".check-group").toggleClass('selected', this.checked);
        });
	}


	function fnslideMsgPopUp() {
	    $doc.on("click", "#btnMessageBoxSave", function () {
	        $(".nw-popup-box").removeClass("_closed");
	        $(".nw-popup-parent").fadeIn();
	    })

	    $doc.on("click", ".btn-popup-cancel", function () {
	        $(".nw-popup-box").addClass("_closed");
	        $(".nw-popup-parent").fadeOut();
	    })
	}

    //Component JS: Dropdown New

	function fnAniDropdown() {
	    $doc.on("click", ".menu-c", function (e) {
	        let option = $(this).children('span.select');
	        if ($(e.target).is('.menu-c,.select,.menu-icon')) {
	            $(this).toggleClass('menu-active');
	        }
	        if ($(e.target).is('.menu-dropdown-option')) {
	            option.text($(e.target).text());
	            $(this).removeClass('menu-active');
	        }
	    })
	}

	//Component JS: Checkbox with check all 
	function fnCheckAll() {

	    $doc.on("click", "input[type=checkbox][class=chk-all-s]", function () {
	        var cb = $(this),
                name = cb.attr('check-all-for');

	        if (name == null)
	            return false;

	        $('input[type=checkbox][name^=' + name + ']')
                .prop('checked', cb.prop('checked'))
                .click(function () {
                    if (!$(this).prop('checked'))
                        cb.prop('checked', false);
                });
	    })

	    $doc.on("click", "input[type=checkbox][class!=chk-all-s]", function () {
	        var cb = $(this),
                name = cb.attr('name');

	        if (name == null)
	            return false;
	        var allChildrenChecked = true;
	        $('input[type=checkbox][name^=' + name + ']').each(function () {
	            if (!$(this).prop('checked')) {
	                allChildrenChecked = false;
	                return;
	            }
	        });
	        $('input[type=checkbox][check-all-for^=' + name + ']').prop('checked', allChildrenChecked);
	    })
	}


	function fnMsgErrorPopUp() {
	    $doc.on("click", "#btnErrorModalDesign", function () {
	        $(".mdl-error-msg.mdl-error").removeClass("closed");
	        $(".dsg-modal-error").fadeIn();
	    })

	    $doc.on("click", "#btnerrorNo", function () {
	        $(".mdl-error-msg.mdl-error").addClass("closed");
	        $(".dsg-modal-error").fadeOut();
	    })
	}

	function fnMsgSuccessPopUp() {
	    $doc.on("click", "#btnSaveModalDesign", function () {
	        $(".mdl-save-msg.mdl-save").removeClass("closed");
	        $(".dsg-modal-save").fadeIn();
	    })

	    $doc.on("click", "#btnsaveNo", function () {
	        $(".mdl-save-msg.mdl-save").addClass("closed");
	        $(".dsg-modal-save").fadeOut();
	    })
	}

	function fnMsgInfoPopUp() {
	    $doc.on("click", "#btnInfoModalDesign", function () {
	        $(".mdl-info-msg.mdl-info").removeClass("closed");
	        $(".dsg-modal-info").fadeIn();
	    })

	    $doc.on("click", "#btninfoCancel", function () {
	        $(".mdl-info-msg.mdl-info").addClass("closed");
	        $(".dsg-modal-info").fadeOut();
	    })
	}

	function fnMsgwithBg() {
	    $doc.on("click", "#btnswBGModalDesign", function () {
	        $(".mdl-def-msg.mdl-def").removeClass("closed");
	        $(".dsg-modal-swBg").fadeIn();
	    })

	    $doc.on("click", "#btndefNo", function () {
	        $(".mdl-def-msg.mdl-def").addClass("closed");
	        $(".dsg-modal-swBg").fadeOut();
	    })
	}

	fnClassBaseAni()
	function fnClassBaseAni() {
	    $doc.on("click", "#btnAnimation", function () {
	        $('.dsg-mdl').fadeIn();
	        $('.dsg-mdl-c').addClass('active');
	    })

	    //closing pop up modal

	    $doc.on("click", ".dsg-btn-msg.dsg-no", function () {
	        $('.dsg-mdl').fadeOut();
	        $('.dsg-mdl-c').removeClass('active');
	    })
	}

    //Component JS: Checkbox with Input 
	function fnCheckBox() {

	    $doc.on("focus", "label.lbl-rdo.noah-forms-lbl.nf-opt-lbl input", function () {
	        $(this).closest("label.lbl-rdo.noah-forms-lbl.nf-opt-lbl").trigger("click")
	    })

	    $doc.on("focus", ".lbl-chk.nf-check-lbl input", function () {
	        $(this).closest(".lbl-chk.nf-check-lbl").trigger("click")
	    })

	    $doc.on("focus", ".lbl-chk.nf-wo-chk-lbl input", function () {
	        $(this).closest(".lbl-chk.nf-wo-chk-lbl").trigger("click")
	    })

	}
	
})();


$(document).ready(function () {

	$(document).find("#nkSlider1").fnUICarousel({
		autoHideNavButtons: true,
	});

	$(document).find("#nkSlider2").fnUICarousel({
		autoHideNavButtons: true,
		autoPlay: true,
		showDots: true,
		border: false,
		borderWidth: 1,
		borderStyle: "dashed",
		borderColor: "black",
		sliderWidth: 500,
		sliderHeight: 300,
		slideDelay: 2200,
		borderRadius: 6,
		zoomOnHover: true,
		autoHideSlideTitle: false,
	});

	$(document).find("#nkSlider3").fnUICarousel({
		sliderWidth: 600,
		sliderHeight: 400,
	});

});



$(document).ready(function () {
    $(".btn.btn-default.btn-edit").on("click", function () {
        $(".modal.modal-cc").addClass("modal-show");
        $(".modal-box.modal-box-cc").addClass("modal-box-slide");
    });

    $(".btn.btn-modal-bck-cc").on("click", function () {
        $(".modal.modal-cc").removeClass("modal-show");
        $(".modal-box.modal-box-cc").removeClass("modal-box-slide");
    });
});


$(document).ready(function () {
    $(".btn.btn-default.btn-edit-r, .table-hrd-icon.hrd-icon-create").on("click", function () {
        $(".modal.modal-right").addClass("modal-r-show");
        $(".modal-box.modal-box-right").addClass("modal-box-slide-r");
    });

    $(".btn.btn-modal-bck-right").on("click", function () {
        $(".modal.modal-right").removeClass("modal-r-show");
        $(".modal-box.modal-box-right").removeClass("modal-box-slide-r");
    });
});

$(document).ready(function () {
  
    $(".btn.btn-modal-back").on("click", function () {
        $(".modal-s").removeClass("_show");
        $(".modal-box-s").removeClass("_slide-m");
    });
});






//ADDED 06022021

$(document).on("click", ".btn.btn-sm-default.btn-sm-default-lookup", function () {
    var isContinue = lookUp($(this));
    if (isContinue) {
        fn_LoadModule("menuCreatorContainer");
    }
});
function fn_LoadModule(varID) {
    $("#" + varID).addClass("_show");
    $("#" + varID).find(".modal-box-s").addClass("_slide-m");
}










$(document).ready(function () {
    $(".table-header-mob").on("click", function () {
        $(this).next().addClass("show");
    });

    $(".hrd-closed-sb").on("click", function () {
        $(this).closest(".table-header-actions-c").removeClass("show")
    })
})


