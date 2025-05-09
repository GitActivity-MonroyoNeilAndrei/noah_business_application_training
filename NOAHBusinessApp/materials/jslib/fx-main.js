//    # NEW NOAH WEB UI
//    # Company Owner: Forecasting and Planning Technologies Inc. | NOAH Business Applications | PROMPTUS 8
//    # Developer : Rico P. Buenviaje
//    # Designer : Rico P. Buenviaje
//    # Date Created : August 14, 2020
//    # Date Modified : Sept 27, 2021 | RPB

function fnMenuGroupTreeView() {
    var $el = $(document).find(".menu-grp-lbl");
    $el.each(function (i) {
        $el.eq(i).on("click", function () {
            var $p = $(this).parents(".menu-grp-li").eq(0),
                $s = $(this).siblings(".menu-grp-ul").eq(0);

            $p.toggleClass("collapse");
            $el.removeClass("selected");
            $(this).toggleClass("selected");

            if ($p.hasClass("collapse")) {
                $s.animate({ height: $s.get(0).scrollHeight }, 180,
                    function () { $(this).height("auto"); });
            }
            else {
                $s.animate({ height: 0 }, 120,
                    function () { $(this).height("0"); });
            }
        });
        $el.eq(i).siblings(".menu-grp-ul").length > 0 && $el.eq(i).addClass("nested");
    });
}


$(document).ready(function () {
    //nk_GetUInfo();

    var $doc = $(document);
    var $body = $(document).find("body");
    var winSize = $(window).width();

    $(window).resize(function () {
        winSize = $(window).width();

        // Below Ipad/Tablet Width
        if (winSize <= 768) {
            $doc.find(".btn-ham").removeClass("active");
            $doc.find(".left-pnl").removeClass("expand extented");
            
            setTimeout(() => {
                $doc.find("._white").fadeOut("fast");
            }, 100, clearTimeout);

            $doc.on("click", ".menu-grp-lbl", function () {
                $doc.find(".hdr-noah-c").addClass("hide");
                $doc.find(".frm-title-c").addClass("show");
            });
        }
        // Ipad/Tablet Width
        //if (winSize > 767) {
        //    $doc.find(".btn-ham").removeClass("active");
        //}
    });
    $(window).resize();

    //$doc.on("click", ".btn-ham", function () {
    //    var $this = $(this), $el = $doc.find(".left-pnl");
    //    $this.toggleClass("active");
    //    $this.hasClass("active") ? $el.addClass("expand") : $el.removeClass("expand");
    //});

    $doc.on("click", ".btn-modules", function (e) {
        var $this = $(this), $el = $doc.find(".btn-modules");

        if (!$this.hasClass("selected")) {
                $doc.find(".menu-grp-ul").animate({ height: 0 }, 120,
                    function () { $(this).css("height", ""); });
                $doc.find(".menu-grp-li").removeClass("collapse");
                $doc.find(".menu-grp-lbl").removeClass("selected");
        }

        $el.not(this).removeClass("selected");
        $this.addClass("selected");
        //if (!$this.hasClass("btn-menuitem")) {
        //    $this.parents(".left-pnl").addClass("extended expand");
        //    $doc.find(".btn-ham").addClass("active");
        //}
        //else {
        //    $this.parents(".left-pnl").removeClass("extended expand");
        //}
    });

    $doc.on("click", ".btn-left-pnl_b", function () {
        var $this = $(this), $el = $doc.find(".btn-left-pnl_b");
        $el.not(this).removeClass("selected");
        $this.addClass("selected");
        if (winSize < 768) return;
        $this.parents(".left-pnl").addClass("extended expand");
        $doc.find(".btn-ham").addClass("active");
    });

    $doc.on("focusin", '.left-pnl .search-c > input[type="text"]', function () {
        var $this = $(this);
        if (winSize >= 768) {
            $this.parents(".left-pnl").addClass("extended expand");
            $doc.find(".btn-ham").addClass("active");
        }
    });
    $doc.on("click", ".btn.btn-modules", function () {
        var $this = $(this);
        
         
            $this.parents(".left-pnl").addClass("extended expand");
            $doc.find(".btn-ham").addClass("active");

            var _crModule = $(this).attr("cid");
            nw_GetMenuitemListDetails(_crModule);
            if (winSize >= 768) { }
    });
    $doc.on("click", "#menuitemListDataClose", function () {
        var $this = $(this);
        if (winSize >= 768) {
            $this.parents(".left-pnl").removeClass("extended");
            $doc.find(".btn-ham").removeClass("active");
        }
    });

    

    //$doc.on("click", ".left-pnl .search-c > .btn.btn-search", function () {
    //    var $this = $(this);
    //    $this.parents(".left-pnl").addClass("extended expand");
    //    $doc.find(".btn-ham").addClass("active");
    //});

    //$doc.on("click", ".mdl-b-sec-body .btn-default-add-input", function () {
    //    var $this = $(this);
    //    var str = `<div class="row">
	//		<div class="col col-10 border-none v-align-mid">
	//		<input type="text" name="" class="txtbox" value="">
	//		</div>
	//		<div class="col col-2 v-align-mid">
	//		<div class="btn btn-sm-default btn-sm-delete"></div>
	//		</div>
	//		</div>`;

    //    $this.parents(".mdl-b-sec").find(".sec-row-c").append(str);
    //    var $sec = $this.parents(".mdl-b-sec-body");
    //    $sec.animate({
    //        scrollTop: $sec.get(0).scrollHeight,
    //    }, 320);
    //});

    $doc.on("click", ".btn-h-close", function () {
        $(this).parents(".mdl").fadeOut();
        $doc.find(".btn-hdr_r.btn-settings").removeClass("selected");
    });

    //$doc.on("click", ".btn.btn-msg-n", function () {
    //    $(this).parents(".mdl").fadeOut();
    //    $doc.find(".btn-hdr_r.btn-settings").removeClass("selected");
    //});

    //$doc.on("click", "#btnLogoutNoDemo", function () {
    //        $(this).parents(".mdl-cc").fadeOut("fast");
    //});

    $doc.on("click", ".btn-user-menu-s, .spl-settings", function () {
        $doc.find("#mdlSettings").fadeIn("fast");
        $doc.find(".menu-user-f").fadeOut("fast");
        $doc.find(".pnlCompany-c").fadeOut("fast");
        $doc.find(".pnlHelp-c").fadeOut("fast");
        $doc.find(".btn-hdr_r.btn-user").removeClass("selected");
        $doc.find(".btn-hdr_r.btn-settings").addClass("selected");
        //fnSettingsStickyHeaders();
    });

    //$doc.on("click", ".btn.btn-menu-m", function () {
    //    $doc.find("#mdlPrompt").fadeIn("fast");
    //    $doc.find(".menu-user-f").fadeOut("fast");
    //    $doc.find(".btn-hdr_r.btn-user").removeClass("selected");
    //    //fnLogoutMsg();
    //});

    $doc.on("click", "#btnPrompMsgOne", function () {
        $doc.find(".mdl-cc").fadeIn("2500");
       // fnLogoutMsg();
    });


    $doc.on("click", ".btn-hdr_r.btn-user", function () {
        var $this = $(this), $el = $doc.find(".menu-user-f");
        var s = "selected";
        $this.toggleClass(s);
        $this.hasClass(s) ? $el.show() : $el.fadeOut();
        $doc.find(".menu-notif-f").fadeOut();
        $doc.find(".btn-hdr_r.btn-notif").removeClass("selected");
    });

    ///Rico/ /*JMC 01/10/2025 UNCOMMENT IF NOTIFICATION ALREADY FUNCTIONAL*/
    $doc.on("click", ".btn.btn-hdr_r.btn-notif", function () {
        //$('.spl-sys-banner-text').text($('.spl-sys-r-subtitle').html().split('<br>')[0])

        var $this = $(this), $el = $doc.find(".menu-notif-f");
        var $closethis = $(this), $elem = $doc.find(".menu-user-f");
        var s = "selected";
        $this.toggleClass(s);
        $this.hasClass(s) ? $el.show() : $el.fadeOut();
        $doc.find(".menu-user-f").fadeOut();
        $doc.find(".btn-hdr_r.btn-user").removeClass("selected");
    });

    //

    $doc.on("click", ".btnNextWdg, .btnPrevWdg", function () {
        var $a = $(this).parents(".spl-msh-controls").siblings(".spl-msh-wdg");
        var $b = $(this).parents(".spl-msh-controls").find(".wdg-dot");
        var $c = $a.siblings(".selected");
        var i = ($c.index() + 1) - 1;

        if (i < 0 || i >= $a.length) i = 0;

        $a.removeClass("selected");
        $b.removeClass("selected");
        $a.eq(i).addClass("selected");
        $b.eq(i).addClass("selected");
    });

    $doc.on("click", ".btn-return-modules", function () {
        $doc.find(".left-pnl").removeClass("extended");
    });

    $doc.on("click", function (e) {
        if (winSize < 768) return;
        if ($(e.target).hasClass("left-pnl") || $(e.target).hasClass("btn-ham"))
            return;
        //For descendants of menu_content being clicked, remove this check if you do not want to put constraint on descendants.
        if ($(e.target).closest(".left-pnl").length)
            return;

        //Do processing of click event here for every element except with id menu_content
        //$doc.find(".left-pnl").removeClass("extended expand");
        $doc.find(".left-pnl").removeClass("extended");
        //$doc.find(".btn-ham").removeClass("active");
    });

    $doc.on("click", ".spl-switch.spl-switch-profile", function () {
        $(".container-flex._spl-container-mob").addClass("active");
        $(".spl-switch.spl-switch-dashboard-c").removeClass("spl-hide");
        $(".spl-switch.spl-switch-profile").addClass("spl-hide");
    });

    $doc.on("click", ".spl-switch.spl-switch-dashboard-c", function () {
        $(".container-flex._spl-container-mob").removeClass("active");
        $(".spl-switch.spl-switch-dashboard-c").addClass("spl-hide");
        $(".spl-switch.spl-switch-profile").removeClass("spl-hide");
    });

    //ThemeJS

    //PopUpTransJS

    $doc.on("click", ".mdl-help-user-menu,.spl-icon-user.spl-help", function () {
        $(".pnlHelp-c").fadeIn("fast");
        $(".menu-user-f").fadeOut("fast");
        $(".mdl").fadeOut("fast");
        $(".btn.btn-hdr_r.btn-user").removeClass("selected");
        $(".pnlCompany-c").fadeOut("fast");
        $(".spl-fav").fadeOut("fast");
        $(".spl-recent").fadeOut("fast");
    });

    $doc.on("click", ".spl-hrd-closeBtn", function () {
        $(".pnlHelp-c").fadeOut("fast");
    });

    $doc.on("click", ".mdl-comp-user-menu, .spl-icon-user.spl-company", function () {
        $(".pnlCompany-c").fadeIn("fast");
        $(".menu-user-f").fadeOut("fast");
        $(".mdl").fadeOut("fast");
        $(".btn.btn-hdr_r.btn-user").removeClass("selected");
        $(".pnlHelp-c").fadeOut("fast");
        $(".spl-fav").fadeOut("fast");
        $(".spl-recent").fadeOut("fast");
    });

    $doc.on("click", ".pnl-h-close", function () {
        $(".pnlCompany-c").fadeOut("fast");
    });

    $doc.on("click", ".btn-item-favorite", function () {
        $(".spl-fav").fadeIn("fast");
        $(".menu-user-f").fadeOut("fast");
        $(".mdl").fadeOut("fast");
        $(".btn.btn-hdr_r.btn-user").removeClass("selected");
        $(".pnlCompany-c").fadeOut("fast");
        $(".spl-recent").fadeOut("fast");
    });

    $doc.on("click", ".spl-fav-close", function () {
        $(".spl-fav").fadeOut("fast");
    });

    $doc.on("click", ".btn-item-recent", function () {
        $(".spl-recent").fadeIn("fast");
        $(".menu-user-f").fadeOut("fast");
        $(".mdl").fadeOut("fast");
        $(".btn.btn-hdr_r.btn-user").removeClass("selected");
        $(".pnlCompany-c").fadeOut("fast");
    });

    $doc.on("click", ".spl-recent-close", function () {
        $(".spl-recent").fadeOut("fast");
    });


    //ChatBoxTrans
    //$doc.on("click", ".spl-user-chat-dtls, .spl-user-msg-contact", function () {
    //    $(".spl-user-chatbox").addClass("_spl-chatbox")
    //});

    //$doc.on("click", ".hrd-close", function () {
    //    $(".spl-user-chatbox").removeClass("_spl-chatbox")
    //});

    //CompanyPanelJS
    $doc.on("click", ".spl-comp-select", function () {
        $(".spl-comp-select").removeClass("active");
        $(this).addClass("active");
    });

    // Functions
    fnMenuGroupTreeView();
    //function fnMenuGroupTreeView() {
    //    var $el = $doc.find(".menu-grp-lbl");
    //    $el.each(function (i) {
    //        $el.eq(i).on("click", function () {
    //            var $p = $(this).parents(".menu-grp-li").eq(0),
	//				$s = $(this).siblings(".menu-grp-ul").eq(0);

    //            $p.toggleClass("collapse");
    //            $el.removeClass("selected");
    //            $(this).toggleClass("selected");

    //            if ($p.hasClass("collapse")) {
    //                $s.animate({ height: $s.get(0).scrollHeight }, 180,
	//					function () { $(this).height("auto"); });
    //            }
    //            else {
    //                $s.animate({ height: 0 }, 120,
	//					function () { $(this).height("0"); });
    //            }
    //        });
    //        $el.eq(i).siblings(".menu-grp-ul").length > 0 && $el.eq(i).addClass("nested");
    //    });
    //}

    fnSetModuleIcon();
    function fnSetModuleIcon() {
        var $el = $doc.find(".btn-modules");
        //$el.each(function (i) {
        //    var $this = $el.eq(i),
        //        abbr = $this.attr("cabv");
		//		//str = $this.text(),
		//		//matches = str.match(/\b(\w)/g),
		//		//abbr = matches.join("").substring(0, 3);

        //   // $this.append(`<div class="mod-abbr">${abbr}</div>`);
        //});

        var $abbr = $doc.find(".mod-abbr");
        $abbr.each(function (i) {
            $abbr.eq(i).css({
                "animation-delay": 0.1 * (0.1 + i) + "s",
                "display": "block",
            }).delay(3500).queue(function (n) {
                $abbr.eq(i).css({
                    "animation-delay": "",
                    "display": "",
                }); n();
            });
        });
    }


    fnSettingsLeftBtns();
    function fnSettingsLeftBtns() {
        const btnSettings = document.querySelectorAll(".btn.btn-mdl-l")
        const contentSettings = document.querySelectorAll(".mdl-b-sec.mdl-b-sec-body")
        //const btn = $doc.find(".btn-mdl-l")

        btnSettings.forEach(function (btns) {
            btns.addEventListener("click", function (btn) {
                const btnSetting = btn.currentTarget
                const contentSettingID = document.getElementById(btnSetting.dataset.id)

                contentSettings.forEach(function (items) {
                    items.classList.remove("show")
                })

                btnSettings.forEach(function (selected) {
                    selected.classList.remove("selected")
                })
                contentSettingID.classList.add("show")
                btnSetting.classList.add("selected")
            })
        });

    }




    fnAniWdgItems();
    function fnAniWdgItems() {
        $doc.find('.spl-msh-wdg').each(function (a) {
            $(this).find("> div").each(function (b) {
                var $this = $(this);
                $this.css({
                    "animation-delay": 0.2 * (b + 0.6) + 's',
                });
            });
        });
    }


   // fnShowHideContainer();
    //function fnShowHideContainer() {
    //    const btns = document.querySelectorAll(".spl-sys-btn")
    //    const container = document.querySelectorAll(".spl-sys-container")

    //    btns.forEach(btn => {
    //        btn.addEventListener("click", (e) => {
    //            const selectedBtn = e.currentTarget
    //            const showContainer = document.getElementById(selectedBtn.dataset.content)

    //            container.forEach(containers => {
    //                if (containers !== showContainer) {
    //                    containers.classList.remove("show")
    //                }
    //            })

    //            showContainer.classList.add("show")
    //        })
    //    })
    //}

    function isNotNull(str) {
        if (str !== '' || str !== null || str !== undefined || typeof str !== 'undefined' || typeof str !== 'object' || str.length !== 0) return true;
        else return false;
    }

    //ChangeCompanyValueJS
    fnChangeCompany();
    function fnChangeCompany() {

        //CompanyPanelJS
        $doc.on("click", ".spl-comp-select", function () {
            $(".spl-comp-select").removeClass("active");
            $(this).addClass("active");
        });

        $doc.on("click", ".spl-action-btn.spl-change", function () {
            var abbr = $(document).find('.spl-comp-select.active .comp-abbr').text();

            localStorage.setItem('company', abbr);
            $("#uInfoCompany").html(localStorage.getItem('company'));
        })
    }

    fnChangeBgLvl();
    function fnChangeBgLvl() {
        $doc.on("click", ".lvl-c", function () {
            $('.lvl-c').removeClass('active');
            $(this).addClass('active');
        });
    }

    //ShowonReload
    showAbbrReload();
    function showAbbrReload() {
        const abbrReload = localStorage.getItem('company');
        if (abbrReload)
            $("#uInfoCompany").html(abbrReload);
    }

    //darkmode

    $(document).ready(function () {

        var addHours = function (dateParam, hourParam) {
            dateParam.setTime(dateParam.getTime() + (hourParam * 60 * 60 * 1000));
            return dateParam;
        };

        var test = function () {

            setTimeout(function () {

                var timenow = new Date();
                var min_time = new Date(timenow.getFullYear() + '-' + ((timenow.getMonth() + 1) + '').padStart(2, '0') + '-' + (timenow.getDate() + '').padStart(2, '0') + ' 17:59:00'); // 5:59pm
                addHours(timenow, 14);
                var max_time = new Date(timenow.getFullYear() + '-' + ((timenow.getMonth() + 1) + '').padStart(2, '0') + '-' + (timenow.getDate() + '').padStart(2, '0') + ' 07:59:00'); // 7:59am
      
                addHours(timenow, -14);
                if (min_time <= timenow && timenow <= max_time) {
                    $(".menu-user-greet-bg").addClass("_night");
                } else {
                    $(".menu-user-greet-bg").removeClass("_night");
                }

                test();

            }, 1000);

        };

        test();


    });



});



$(document).ready(function () {
    $(".theme-w").on("click", function () {
        localStorage.setItem('active-theme', $(this).attr('value'));
        $(".main-c").removeClass("theme_secondary_green");
        $(".main-c").removeClass("theme_secondary_default");
        $(".main-c").removeClass("theme_secondary_pink");
        $(".main-c").removeClass("theme_secondary_red");
        $(".main-c").removeClass("theme_secondary_purple");
        $(".main-c").removeClass("theme_secondary_dark");
        $('.main-c').addClass($(this).attr('value'));
    });

    var lastSelectedTheme = localStorage.getItem("active-theme");
    if (lastSelectedTheme != null) {
        $(`.theme-w[value="${lastSelectedTheme}"]`).click();
    }
});

$(document).ready(function () {

    $(window).scroll(function () {
        var scroll = $(window).scrollTop();

        if (scroll >= 150) {
            $(".nk-toolbar-c").addClass("fixed");
        } else {
            $(".nk-toolbar-c").removeClass("fixed");
        }
    });

});
$(document).on("click", ".btn-ham", function () {
    var $this = $(this), $el = $(document).find(".left-pnl");
    $this.toggleClass("active");
    if ($this.hasClass("active")) {
        fx_ExplorerTitleHide();
        
    } else {
        fx_ExplorerTitleShow();
    }

    $this.hasClass("active") ? $el.addClass("expand") : $el.removeClass("expand");

    setTimeout(function () {
        nkspread_resize();
    }, 250);

});

function fx_ExplorerTitleShow() {
    //var $el2 = $(document).find(".btn-modules");
    //$el2.each(function (i) {
    //    var $_this = $el2.eq(i);
    //    $_this.attr("title", $_this.attr("nwtitle"));
    //    $_this.attr("nwtitle", "");
    //});
}

function fx_ExplorerTitleHide() {
    //var $el2 = $(document).find(".btn-modules");
    //$el2.each(function (i) {
    //    var $_this = $el2.eq(i);
    //    $_this.attr("nwtitle", $_this.attr("title"));
    //    $_this.attr("title", "");
    //});
}


