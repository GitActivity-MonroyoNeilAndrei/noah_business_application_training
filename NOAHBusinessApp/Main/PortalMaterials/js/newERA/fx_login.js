//    # NEW NOAH TENANT PORTAL
//    # Company Owner: Forecasting and Planning Technologies Inc. | NOAH Business Applications | PROMPTUS 8
//    # Developer : Alvin Diaz Benedicto | Ma. Edgarda Malvar
//    # Designer : Alvin Diaz Benedicto
//    # Date Created : September 23, 2020
//    # Date Modified : September 23, 2020 | ADB
//    # Date Modified : September 23, 2020 | ADB

$(document).ready(function () {
    "use strict";

    var $doc = $(document),
		$body = $('body');

    var $window = $(window);
    var i = 0;
    var typeSpeed = 80;
    var contentTitle = `Advance your online experience with the real-time completion of tasks at hand.`;

    // Typewriter Effect
    
    //setTimeout(typeWriter, 380, clearTimeout);
    //function typeWriter() {
    //    if (i < contentTitle.length) {
    //        document.getElementById("typeWriterFx1").innerHTML += contentTitle.charAt(i);
    //        i++;
    //        setTimeout(typeWriter, typeSpeed);
    //    }
    //}

    $doc.find(`body[ver="3"] .new-feat-img`).each(function (i) {
        $(this).css({
            "animation-delay": (0.22 * (i - .4)) + "s",
            "display": "inline-block",
        });
    });

    setTimeout(function () {
        $doc.find(`body[ver="3"] .new-login-text-c`).css("opacity", "1");
    }, 1000, clearTimeout);
});



//AUTO SLIDE IMAGE BVERSE

$(document).ready(function () {
    const nwSlideMain = document.getElementsByClassName("lgn-slider-img");
    let nwAutoPlay = document.getElementsByClassName("lgn-sliderCon")[0].getAttribute("nwData-autoplay");
    let nwSlide = nwSlideMain.length;
    const nwInterval = 3000;
    let nwSet;

    windowsOnload()
    function windowsOnload() {
        fnInitialize();
        nwSlideMain[0].style.opacity = "1";
    }

    function fnInitialize() {
        if (nwAutoPlay === "true")
            nwSet = setInterval(function () {
                fnNext();
            }, nwInterval);
    }

    function fnChange(index) {
        clearInterval(nwSet);
        count = index;
        for (var j = 0; j < nwSlide; j++) {
            nwSlideMain[j].style.opacity = "0";
        }
        nwSlideMain[count].style.opacity = "1";
    }

    let count = 0;

    function fnNext() {
        clearInterval(nwSet);
        nwSlideMain[count].style.opacity = "0";
        count++;

        if (count == nwSlide) {
            count = 0;
            nwSlideMain[count].style.opacity = "1";
        } else {
            nwSlideMain[count].style.opacity = "1";
        }
        fnInitialize()
    }

})