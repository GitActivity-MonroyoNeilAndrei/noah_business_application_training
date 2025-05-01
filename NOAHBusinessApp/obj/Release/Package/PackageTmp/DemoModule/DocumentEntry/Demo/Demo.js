baseTitle = "Demo";
function func_Reload() {

    crLnk = GetCurrentURL() + "Demo_Gateway";
    crLnkGateKey = "Demo";

    crnwTagSingleBind = true;
    var isContinue = true;
    init_request();
    ToolBoxGetData = false;

 


    return isContinue;
}
/* OLD JS */
function showDropCnt(event) {
    event.stopPropagation();
    hideAllDropCntOpts();
    const dropdown = event.currentTarget.querySelector(".nk-opt-conv");
    dropdown.style.display = "block";
}

function hideDropCntOpt(event) {
    event.stopPropagation();
    const dropdown = event.currentTarget;
    dropdown.style.display = "none";
}

function hideAllDropCntOpts() {
    const dropOpts = document.querySelectorAll(".nk-opt-conv");
    dropOpts.forEach(dropOpt => {
        dropOpt.style.display = "none";
    });
}

document.addEventListener("click", function () {
    hideAllDropCntOpts();
});

$(document).ready(function () {
    $(document).on("click", "#btnSampleShowAlert", function () {
        $(document).find(".alerts-parent").removeClass("hide");
    });

    $(document).on("click", "#btnSampleShowPopup", function () {
       
    });

    $(document).on("click", "#btnSampleShowMessageBox", function () {
        $(document).find(".msg-box").addClass("show");
    });

    $("#btnSampleFormLoad").on("click", function () {
        $(".spinner-load-c").css("display", "initial");
    });

    $(".spinner-load-c").on("click", function () {
        $(".spinner-load-c").css("display", "none");
    });

    $("#btnSampleContainerLoad").on("click", function () {
        $(".spinner-load-c-v2").css("display", "initial");
    });

    $(".spinner-load-c-v2").on("click", function () {
        $(".spinner-load-c-v2").css("display", "none");
    });

    $("#btnMessageBoxSave").on("click", function () {
        $(".nw-popup-box").removeClass("_closed");
        $(".nw-popup-parent").fadeIn();
    });

    $(".btn-popup-cancel").on("click", function () {
        $(".nw-popup-box").addClass("_closed");
        $(".nw-popup-parent").fadeOut();
    });

    slideAnimate();
    slideAnimateTop();
});

function slideAnimate() {
    $("#btnMessageBoxSave").on("click", function () {
        $(".cmpnt-box").fadeIn();
        $(".cmpnt-box-c").addClass("_show-box");
    });

    $(".cmpnt-box").on("click", function () {
        $(".cmpnt-box").fadeOut();
        $(".cmpnt-box-c").removeClass("_show-box");
    });
}

function slideAnimateTop() {
    $("#btnMessageBoxSaveTop").on("click", function () {
        $(".n-modal").fadeIn();
        $(".n-modal-c").addClass("n-modal-show");
    });

    $(".n-modal").on("click", function () {
        $(".n-modal").fadeOut();
        $(".n-modal-c").removeClass("n-modal-show");
    });
}


/*ARC-04152024 | Carousel Style="2"*/
$(document).ready(function () {
    let slideIndex = 1;
    showSlides(slideIndex);

    function showSlides(n) {
        let slides = $('.slide');
        let dots = $('.dot');

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        slides.hide();
        dots.removeClass('active');

        slides.eq(slideIndex - 1).show();
        dots.eq(slideIndex - 1).addClass('active');
    }

    window.plusSlides = function (n) {
        showSlides(slideIndex += n);
    }

    window.currentSlide = function (n) {
        showSlides(slideIndex = n);
    }
});


/*ARC-Modal Image*/
document.addEventListener("DOMContentLoaded", function () {
    var modal = document.getElementById("myModal");
    var img = document.getElementById("myImg");
    var modalImg = document.getElementById("img01");
    var captionText = document.getElementById("caption");
    var closeBtn = document.querySelector(".modal .close");

    img.onclick = function () {
        modal.classList.add("open");
        modalImg.src = this.src;
        captionText.innerHTML = this.alt;
    };

    closeBtn.onclick = function () {
        modal.classList.remove("open");
    };
});

/*ARC-Lightbox*/
$(document).ready(function () {
    function openModal() {
        $("#lightbox-modal").css("display", "block");
    }

    function closeModal() {
        $("#lightbox-modal").css("display", "none");
    }

    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let $slides = $(".lightbx-slides");
        let $dots = $(".demo");
        let $captionText = $("#caption");

        if (n > $slides.length) { slideIndex = 1; }
        if (n < 1) { slideIndex = $slides.length; }

        $slides.hide();
        $dots.removeClass("active");

        $slides.eq(slideIndex - 1).show();
        $dots.eq(slideIndex - 1).addClass("active");

        let caption = $dots.eq(slideIndex - 1).attr("alt");
        $captionText.text(caption);
    }

    $(".hover-shadow").on("click", function () {
        openModal();
        currentSlide($(this).parent().index() + 1);
    });

    $(".close").on("click", closeModal);
    $(".prev").on("click", function () { plusSlides(-1); });
    $(".next").on("click", function () { plusSlides(1); });

    $(".demo").on("click", function () {
        currentSlide($(this).parent().index() + 1);
    });
});



/*ARC-Slideshow Gallery*/ //TO BE FIX
$(document).ready(function () {
    let slideIndex = 1;
    showSlides(slideIndex);

    // Click handlers for next and previous buttons
    $(".prev-aa").on("click", function () {
        plusSlides(-1);
    });

    $(".next-aa").on("click", function () {
        plusSlides(1);
    });

    // Click handler for the thumbnail images
    $(".cursor").on("click", function () {
        let index = $(this).index() + 1; // Find the index of the clicked dot (adjusted for 1-based index)
        currentSlide(index);
    });

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let $slides = $(".slides-aa"); // Use jQuery to select all slides
        let $dots = $(".cursor"); // Use jQuery to select all dots
        let $captionText = $("#caption"); // Use jQuery to select the caption

        // Reset index if n exceeds the number of slides
        if (n > $slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = $slides.length;
        }

        // Hide all slides
        $slides.hide(); // jQuery's .hide() method hides the slides

        // Remove active class from all dots
        $dots.removeClass("active");

        // Show the current slide
        $slides.eq(slideIndex - 1).show(); // Show the current slide with jQuery's .eq() and .show()

        // Set active class to the current dot
        $dots.eq(slideIndex - 1).addClass("active");

        // Update caption
        $captionText.html($dots.eq(slideIndex - 1).attr("alt"));
    }
});

/*ARC-READ MORE/LESS*/
function toggleMoreAb() {
    var dots = document.getElementById("dots-ab");
    var moreText = document.getElementById("more-ab");
    var btnText = document.getElementById("moreBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}

function toggleMoreAa() {
    var dots = document.getElementById("dots-aa");
    var moreText = document.getElementById("more-aa");
    var btnText = document.getElementById("seeBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "See more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "See less";
        moreText.style.display = "inline";
    }
}

//DRAGGABLE AUTO SLIDE GALLERY-ARC7092024
$(document).ready(function () {
    const $slideContainer = $(".slider-banner");
    const $slidesFlex = $(".slides-flex");
    const $navigation = $(".navigation");

    (function slider(container, slidesFlex, navigation) {
        let initialX,
            finalX,
            leftPos = -100,
            clicked = false,
            counter = 0,
            slideDistance,
            interval = null,
            numberOfSlides = slidesFlex.children().length,
            slidesWidth = slidesFlex.width(),
            threshold = 40;

        createInterval();

        container.on("mousedown", dragStart);
        container.on("touchstart", dragStart);
        container.on("touchmove", dragging);
        container.on("touchend", dragStop);

        function moveSlide() {
            slidesFlex.css("left", `${leftPos * counter}%`);

            for (let i = 0; i < numberOfSlides; i++) {
                $(`#radio_${i + 1}`).prop("checked", false);
            }

            $(`#radio_${counter + 1}`).prop("checked", true);
        }

        function animate() {
            if (clicked) return;
            counter++;
            if (counter > numberOfSlides - 1) {
                counter = 0;
                slidesFlex.css("transition", "none");
            } else {
                slidesFlex.css("transition", "0.8s");
            }
            moveSlide();
        }

        function createInterval() {
            if (!interval) {
                interval = setInterval(animate, 5000);
            }
        }

        function dragStart(e) {
            clearInterval(interval);
            interval = null;

            if ($(navigation).has(e.target).length) {
                counter = e.target.id ? parseInt(e.target.id) - 1 : counter;
                slidesFlex.css("transition", "0.8s");
                moveSlide();
                createInterval();
                return;
            }
            e.preventDefault();

            slidesFlex.css("transition", "0.5s");
            container.css("cursor", "grabbing");
            $("body").css("cursor", "grabbing");

            clicked = true;

            if (e.type == "touchstart") {
                initialX = e.touches[0].clientX;
            } else {
                initialX = e.clientX;
                $(document).on("mousemove", dragging);
                $(document).on("mouseup", dragStop);
            }
        }

        function dragging(e) {
            if (!clicked) return;

            if (e.type == "touchmove") {
                finalX = e.touches[0].clientX;
            } else {
                finalX = e.clientX;
            }

            let currentPosition = counter * leftPos;

            slideDistance = ((initialX - finalX) / (slidesWidth / numberOfSlides)) * 100;

            if (Math.abs(slideDistance) < threshold) {
                slidesFlex.css("left", `${currentPosition - slideDistance}%`);
            }
        }

        function dragStop(e) {
            if ($(navigation).has(e.target).length) return;

            if (finalX < initialX && counter < numberOfSlides - 1 && slideDistance >= threshold) {
                counter++;
            } else if (finalX > initialX && counter > 0 && -slideDistance >= threshold) {
                counter--;
            }
            moveSlide();

            createInterval();
            $("body").css("cursor", "default");
            container.css("cursor", "grab");
            initialX = undefined;
            finalX = undefined;
            clicked = false;
            $(document).off("mousemove");
            $(document).off("mouseup");
        }
    })($slideContainer, $slidesFlex, $navigation);
});
/*ARC-Disabled Fields*/
$(document).ready(function () {
    $('.adisabled').each(function () {
        $(this).find('input.txtbox').attr('disabled', 'disabled');

        $(this).find('.btn-sm-default-lookup').css('pointer-events', 'none');

        $(this).find('textarea.txtarea').attr('disabled', 'disabled');
    });
});

// ARC - PROGRESS BAR ANIMATION
function handleProgressBar(buttonId, progressBarId) {
    $(document).on("click", buttonId, function () {
        var $progressBar = $(progressBarId + " .progressbar-line");

        if ($progressBar.data("animating")) {
            $progressBar.stop().data("animating", false).css("width", "0%").text("0%");
        } else {
            $progressBar.data("animating", true).animate({ width: "100%" }, {
                duration: 2000,
                step: function (now) {
                    $progressBar.text(Math.round(now) + "%");
                },
                complete: function () {
                    $progressBar.data("animating", false);
                }
            });
        }
    });
}

// Initialize all progress bars
handleProgressBar("#btnProgressBar-aa", "#progressbar-aa");
handleProgressBar("#btnProgressBar-ab", "#progressbar-ab");
handleProgressBar("#btnProgressBar-ac", "#progressbar-ac");
handleProgressBar("#btnProgressBar-ad", "#progressbar-ad");
handleProgressBar("#btnProgressBar-ae", "#progressbar-ae");
handleProgressBar("#btnProgressBar-af", "#progressbar-af");


/*RANGE INPUT - ARC09092024*/
$(document).ready(function () {
    $('.custom-range').on('input', function () {
        let value = $(this).val();
        $(this).css('background-size', value + '% 100%');
    });
});

//Image Slider - ARC07152024
$(document).ready(function () {
    const $scrollContainer = $('.scroll-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    function handleMouseDown(e) {
        isDown = true;
        $scrollContainer.addClass('active');
        startX = e.pageX - $scrollContainer.offset().left;
        scrollLeft = $scrollContainer.scrollLeft();
    }

    function handleMouseLeave() {
        isDown = false;
        $scrollContainer.removeClass('active');
    }

    function handleMouseUp() {
        isDown = false;
        $scrollContainer.removeClass('active');
    }

    function handleMouseMove(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - $scrollContainer.offset().left;
        const walk = x - startX; // Adjust the scroll speed if needed
        $scrollContainer.scrollLeft(scrollLeft - walk);
    }

    function handleTouchStart(e) {
        isDown = true;
        $scrollContainer.addClass('active');
        startX = e.touches[0].pageX - $scrollContainer.offset().left;
        scrollLeft = $scrollContainer.scrollLeft();
    }

    function handleTouchEnd() {
        isDown = false;
        $scrollContainer.removeClass('active');
    }

    function handleTouchMove(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - $scrollContainer.offset().left;
        const walk = x - startX; // Adjust the scroll speed if needed
        $scrollContainer.scrollLeft(scrollLeft - walk);
    }

    $scrollContainer.on('mousedown', handleMouseDown);
    $scrollContainer.on('mouseleave', handleMouseLeave);
    $scrollContainer.on('mouseup', handleMouseUp);
    $scrollContainer.on('mousemove', handleMouseMove);

    // Touch events
    $scrollContainer.on('touchstart', handleTouchStart);
    $scrollContainer.on('touchend', handleTouchEnd);
    $scrollContainer.on('touchmove', handleTouchMove);
});

// For datepicker format convertion
(function ($) {
    var originalVal = $.fn.val;

    $.fn.val = function (value) {
        if (this.hasClass('txtbox-date') && value && /^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
            let parts = value.split('/');
            value = `${parts[2]}-${parts[0]}-${parts[1]}`;
        }
        return originalVal.apply(this, arguments.length ? [value] : []);
    };
})(jQuery);

// copy color name
$(document).ready(function () {
    $("[class*='picker']").on("click", function () {
        var textToCopy = $(this).text();

        var tempInput = $("<input>");
        $("body").append(tempInput);

        tempInput.val(textToCopy).select();

        document.execCommand("copy");

        tempInput.remove();

        alert("Copied: " + textToCopy);
    });
});

// DRAG & DROP CONTAINER
$(function () {
    $("#sortable1").sortable({
        connectWith: ".js-sort-list"
    });

    $("#sortable2, #sortable3, #sortable4, #sortable5, #sortable6, #sortable7").sortable({
        connectWith: "#sortable2, #sortable3, #sortable4, #sortable5, #sortable6, #sortable7",
        cancel: ".dropfalse, .ui-state-default.ui-sortable-handle.open", // Make 'root' undraggable
    });

    $("#sortable1, #sortable2, .nk-list-label").disableSelection();
});

$(function () {
    $(".ui-state-default.ui-sortable-handle").on("click", function () {
        $(this).toggleClass("close open");

        if ($(this).hasClass("open")) {
            $(this).next().slideDown();
        } else {
            $(this).next().slideUp();
        }
    });

    $("#sortable3, #sortable4, #sortable5, #sortable6, #sortable7").on("click", function () {
        $(this).toggleClass("close open");

        if ($(this).hasClass("open")) {
            $(this).children().slideDown(); // Shows items inside
        } else {
            $(this).children().slideUp(); // Hides items inside
        }
    });
});

$(function () {
    const handleDOMChanges = function (mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                const container = mutation.target;
                if ($(container).find("> div").length > 0) {
                    $(container).removeClass("close").addClass("open");
                    break;
                }
            }
        }
    };

    $(".dropfalse").each(function () {
        const observer = new MutationObserver(handleDOMChanges);
        observer.observe(this, { childList: true, subtree: true });
    });
});

