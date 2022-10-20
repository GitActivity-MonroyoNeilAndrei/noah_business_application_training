
var filter = "";
var basedTitle = "Main";
var ctr = 0;
var $ServerLink = "";
var pcode = "", ptype = "",phtw="";
var cdef="#ffffff",creservedprogress = "",conholdbo="",cavail = "", creserved = "", conhold = "", csold = "",creopened=""; //colors
var recuser = "";
var unitcode = "";
var isBulk = false;
var pmsg = "";
var maxbulkqueue = 0;

var unitdtls = [];

var floorConfig = [];

var jsonfloorFinal = [];
var jsonfloor = [];
var selectedUnits = [];
var bunits = "";

let imgObj = [];

let unitImgObj = [];




function func_Reload() {
    crLnk = "Home_Gateway";
    crLnkGateKey = "Home";
    var isContinue = true;
    init_request();
    ToolBoxGetData = false;
    cust_GetPara();

    return isContinue;
}


function cust_GetPara() {
    nwParameter_Add("cmbPropertyType", $("#cmbPropertyType").val());
    nwParameter_Add("cmbLocation", $("#cmbLocation").val());
}


//EVENTS
$(document).on("click", "#btnClose2", function () {
    document.getElementById("myForm").style.display = "none";
});
//Logout
$(document).on('click', '#btnLogout', function () {
    //window.location.href = '../../../Login/default.aspx';
    func_ActionDriven("actLogout", false);
});
//Seller Info (My Info)
$(document).on('click', '#btnInfo', function () {
    //POPUP
    //$("#iframetitle").text("My Information");
    //$(document).find('#popup').fadeIn();
    //$("#iFrame1").attr("src", "../../../BM/DataSetup/BMSellerInformation/BMSellerInformation.aspx?nwdev=p8dev&nwu=" + recuser + "");

    //WITHIN
    $(document).find("#secLanding, .secProject, #secAvailabilityChart, #secBookingSummary, #secHoldingFrame,#secCommissionSummary").hide();
    $("#iframeTransactions").attr("src", "../../../BM/DataSetup/BMSellerInformation/BMSellerInformation.aspx?nwdev=p8dev&nwu=" + recuser + "");
    $("#iframeTransactions").css("height", "600px");
    $("#mi-title").text("My Information");
    $(document).find("#secTransactionSummary").fadeIn("fast");
});
//ENTRIES
var typecode = "", classcode = "", typedesc = "", classdesc = "", amountphp = "";
//Reservation Entry (My Transactions)
$(document).on('click', '#btnReseration', function () {
    ViewProjectSelection(true);
    $(document).find(".side-popup.clicked-lvl").fadeOut();
    $("#iframetitle").text("Reservation Details");
    $(document).find('#popup').fadeIn();
    unitcode = "";
    var isBulk = "0";
    if ($("#cbBulk").prop("checked") == true)
        isBulk = "1";
    else
        isBulk = "0";
    $("#iFrame1").attr("src", "../../../SB/DocumentEntry/SBReservationEntry/SBReservationEntry.aspx?nwdev=p8dev&nwu=" + recuser + "&nwUnitCode=" + unitcode + "&isBulk="+isBulk+"");
});
//Reservation Entry Per Unit
$(document).on('click', '#btnReserveNow', function () {
    var msg="";
    if ($("#amtp").text() == "0.00" || $("#amtp").text() == "...") {
        NoSellingPrice("Reserve Now");
    }
    if ($('#btnReseration').attr('hasAccess') == "") {
        NoAccess("Reserve Now");
    }
    if (($("#amtp").text() != "0.00" || $("#amtu").text() != "0.00" || $("#amte").text() != "0.00") && $('#btnReseration').attr('hasAccess') != "") {
        ViewProjectSelection(true);
        $(document).find(".side-popup.clicked-lvl").fadeOut();
        unitcode = $("#ucode").text();
        typecode = $("#typecode").text();
        classcode = $("#clsscode").text();

        $("#iframetitle").text("Reservation Details");
        $(document).find('#popup').fadeIn();
        var isBulk = "0";
        if ($("#cbBulk").prop("checked") == true)
            isBulk = "1";
        else
            isBulk = "0";
        var params = "nwu=" + recuser + "&nwUnitCode=" + unitcode + "&nwTypeCode=" + typecode + "&nwClassCode=" + classcode + "&isBulk="+isBulk+"";
        $("#iFrame1").attr("src", "../../../SB/DocumentEntry/SBReservationEntry/SBReservationEntry.aspx?nwdev=p8dev&" + params + "");
    }
});
//Holding Entry (My Transactions)
$(document).on('click', '#btnHoldingUnit', function () {
    ViewProjectSelection(true);

    $("#iframetitle").text("Holding of Unit");
    //document.getElementById("popup").style.display = "block";
    $(document).find('#popup').fadeIn();
    unitcode = "";
    var isBulk = "0";
    if ($("#cbBulk").prop("checked") == true)
        isBulk = "1";
    else
        isBulk = "0";
    $("#iFrame1").attr("src", "../../../SB/DocumentEntry/SBHoldingOfUnit/SBHoldingOfUnit.aspx?nwdev=p8dev&nwu=" + recuser + "&uc=" + unitcode + "&isBulk="+isBulk+"");
});
//Holding per unit
$(document).on('click', '.btn-hold', function () {
    var msg = "";
    if ($("#amtp").text() == "0.00" || $("#amtp").text() == "...") {
        NoSellingPrice("Hold");
    }
    if ($('#btnHoldingUnit').attr('hasAccess') == "") {
        NoAccess("Hold");
    }
    if (($("#amtp").text() != "0.00" || $("#amtu").text() != "0.00" || $("#amte").text() != "0.00") && $('#btnHoldingUnit').attr('hasAccess') != "") {
        ViewProjectSelection(true);
        $(document).find(".side-popup.clicked-lvl").fadeOut();
        unitcode = $("#ucode").text();
        typecode = $("#typecode").text();
        classcode = $("#clsscode").text();

        $("#iframetitle").text("Holding of Unit");
        $(document).find('#popup').fadeIn();
        var isBulk = "0";
        if ($("#cbBulk").prop("checked") == true)
            isBulk = "1";
        else
            isBulk = "0";
        var params = "nwu=" + recuser + "&uc=" + unitcode + "&nwTypeCode=" + typecode + "&nwClassCode=" + classcode + "&isBulk="+isBulk+"";
        $("#iFrame1").attr("src", "../../../SB/DocumentEntry/SBHoldingOfUnit/SBHoldingOfUnit.aspx?nwdev=p8dev&" + params + "");
    }
});
//Holding request for extension
$(document).on('click', '#btnHoldingExt', function () {
    ViewProjectSelection(true);

    $("#iframetitle").text("Holding - Request for Extension");
    $(document).find('#popup').fadeIn();
    unitcode = "";
    $("#iFrame1").attr("src", "../../../SB/DocumentEntry/SBRequestForExtension/SBRequestForExtension.aspx?nwdev=p8dev&nwu=" + recuser + "");
});
//Client Registration Deactivation
$(document).on('click', '#btnClientReg', function () {
    ViewProjectSelection(true);

    $("#iframetitle").text("Client Registration Deactivation");
    $(document).find('#popup').fadeIn();
    unitcode = "";
    $("#iFrame1").attr("src", "../../../SB/DocumentEntry/SBClientRegDeactivation/SBClientRegDeactivation.aspx?nwdev=p8dev&nwu=" + recuser + "");
});

//REPORTS
//my Commissions
$(document).on('click', '#btnCommissions', function () {
    $(document).find("#secLanding, .secProject, #secAvailabilityChart, #secBookingSummary, #secHoldingFrame, #secTransactionSummary").hide();
    $(document).find("#secCommissionSummary").fadeIn("fast");

    $("#cbCutoffDate").prop("checked", true);
    var date = GetDateToday();
    $("#txtCOFrom").val(date);
    $("#txtCOTo").val(date);
    RefreshCommissions();
    func_ActionDriven("actGenerateCommissionCombos", true);
});
//My Transactions Summary
$(document).on('click', '#btnTransactionSummary', function () {
    $(document).find("#secLanding, .secProject, #secAvailabilityChart, #secBookingSummary, #secHoldingFrame,#secCommissionSummary").hide();
    $("#iframeTransactions").attr("src", "../../../RE/ReportsAndInquiry/REMyTransactionsSummary/REMyTransactionsSummary.aspx?nwdev=p8dev&nwu=" + recuser + "");
    $("#iframeTransactions").css("height", "600px");
    $("#mi-title").text("My Transactions Summary");
    $(document).find("#secTransactionSummary").fadeIn("fast");
});
//Inventory Availability Summary
$(document).on('click', '#btnInvAvailability', function () {
    $(document).find("#secLanding, .secProject, #secAvailabilityChart, #secBookingSummary, #secHoldingFrame,#secCommissionSummary").hide();
    $("#iframeTransactions").attr("src", "../../../RE/ReportsAndInquiry/REInvAvailabilitySummary/REInvAvailabilitySummary.aspx?nwdev=p8dev&nwu=" + recuser + "");
    $("#iframeTransactions").css("height", "600px");
    $("#mi-title").text("Inventory Availability Summary");
    $(document).find("#secTransactionSummary").fadeIn("fast");
});
//Client Registration Deactivation Summary
$(document).on('click', '#btnClientRegSummary', function () {
    $(document).find("#secLanding, .secProject, #secAvailabilityChart, #secBookingSummary, #secHoldingFrame,#secCommissionSummary").hide();
    $("#iframeTransactions").attr("src", "../../../SB/ReportsAndInquiry/SBDeactivatedClientRegSummRpt/SBDeactivatedClientRegSummRpt.aspx?nwdev=p8dev&nwu=" + recuser + "");
    $("#iframeTransactions").css("height", "600px");
    $("#mi-title").text("Client Registration Deactivation Summary");
    $(document).find("#secTransactionSummary").fadeIn("fast");
});

//same event on fx.js but for DB purposes here
$(document).on('click', '.list-item.btn', function (e) {
    //alert("clicked");
    pcode = $(this).attr("pcode");
    ptype = $(this).attr("ptype");
    phtw = $(this).attr("phtw");
    if ($("#cbRetail").prop("checked") == true)
    {
        $("#secAvailSumUA").hide();
        RefreshUnitAvailability(pcode, ptype, phtw);
        func_ActionDriven("actGenerateAvlSum", false);
        $(".pdlg-li").show();

        //e.preventDefault();
        $(document).find('#secLanding, #secBookingSummary').fadeOut('fast');
        //MAM
        var cid = $(this).attr("id");
        curSelectedID = cid;
        currentProperty = $('#' + cid + '.list-item.btn').attr("data-proptype");
        curUnit = $('#' + cid + '.list-item.btn').find(".li-item-name").text();

        RefreshUnit(currentProperty, true);

        //$(".main-c").animate({ scrollTop: 0 }, 600);
        //$(window).scrollTop(0);
    }
    if ($("#cbBulk").prop("checked") == true)
    {
        var code = pcode + ptype + phtw;
        code = code.replace(" ", "");
        if ($("#chk" + code).prop("checked") == true)
        {
            $("#chk" + code).prop("checked", false);
            $("#pdlg-" + code).attr("isSelected", "false");
            $("#pdlg-" + code).hide();
            $("#pdlg-" + code).enable(false);
        }
            
        else
        {
            $("#chk" + code).prop("checked", true);
            $("#pdlg-" + code).attr("isSelected", "true");
            $("#pdlg-" + code).show();
            $("#pdlg-" + code).enable(true);
        }
        
        var ccount = 0;
        $('.chkProjects').each(function (i, obj) {
            var selected = $(this).prop("checked");
            if (selected == true ) {
                ccount++;
            }
            if(ccount >= 1)
                $("#btnProceedBulk").enable(true);
            else
                $("#btnProceedBulk").enable(false);
        });
        //Reset Units
        ResetBulkUnits();
    }
});
//Proceed to Bulk
$(document).on('click', '#btnProceedBulk', function () {
    if ($('#btnHoldingUnit').attr('hasAccess') == "") {
        pmsg = "";
        NoAccess("Bulk Holding");
    }
    else
    {
        ViewProjectSelection(false);
        $(document).find(".side-popup.clicked-lvl").fadeOut();
        var ctr = 0;
        ResetBulkUnits();
        $('.pdlg-li').each(function (i, obj) {
            var id = $(this).attr("id");
            var selected = $(this).attr("isSelected");
            var val = $(this).text();
            if (selected == "true" && ctr < 1) {
                pcode = $("#" + id).attr("pcode");
                ptype = $("#" + id).attr("ptype");
                phtw = $("#" + id).attr("phtw");
                $("#secAvailSumUA").hide();
                RefreshUnitAvailability(pcode, ptype, phtw);
                func_ActionDriven("actGenerateAvlSum", false);
                CallProjectBulk(val);
                ctr++;
            }
        });
    }
});
////Refresh upon back
$(document).on('click', '.btn-cancel', function () {
    //$('.btnlinFloor.selected').click();
    nwParameter_Add("projectfilter", $("#cmbProject").val());
    nwParameter_Add("isMain", true);
    func_ActionDriven("actGenerateBookingSummary", false);

    if($("#iframetitle").text() == "Holding of Unit") //Reset Units upon hold
    {
        ResetBulkUnits();
    }
});

//BACK button (from unit availability to landing page)
$(document).on('click', '.secProject .btnReturn', function () {
    if (bunits != "")
    {
        if ($("#cbBulk").prop("checked") == true)
            $(".pdlg-ul").hide();
        else
            $(".pdlg-li").hide();
        $(".pdlg-title").text("Note");
        $(".messagecont").text("Note: This will clear the currently selected units.");
        $(".pdlg-ul#pdlg-msg").show();
        $(document).find('#pdlgProject').fadeIn();
    }
    BackToLandingPage();
});
//Home
$(document).on('click', '#btnHome', function () {
    ResetBulkUnits();
});
//Generate Unit Availability Summary
$(document).on('click', '#btnGenAvailability', function (e) {
    //$(document).find('#secAvailSumUA').fadeIn();
    if ($("#secAvailSumUA").css("display") == "block")
        $(document).find('#secAvailSumUA').hide();
    else
        $(document).find('#secAvailSumUA').show();
});
//Export to Excel
$(document).on('click', '#btnExport', function (e) {
    nwParameter_Add("pcode", pcode);
    nwParameter_Add("ptype", ptype);
    nwParameter_Add("phtw", phtw);
    func_ActionDriven("actExportToExcel", false);
});
//select another project
$(document).on('click', '.pdlg-li', function (e) {
    var title = $(this).attr("title");
    pcode = $(this).attr("pcode");
    ptype = $(this).attr("ptype");
    phtw = $(this).attr("phtw");
    $("#listTitle").text(title);
    nwParameter_Add("pcode", pcode);
    nwParameter_Add("ptype", ptype);
    nwParameter_Add("phtw", phtw);
    func_ActionDriven("actGenerateAvlSum", false);
    RefreshUnitAvailability(pcode, ptype, phtw);
    Select($(this).text());
    $(document).find('#secAvailSumUA').fadeOut();
});
//generate booking summary
$(document).on('click', '.hdr-tile,#btnBookingSummary', function (e) {
    nwParameter_Add("projectfilter", $("#cmbProject").val());
    nwParameter_Add("isMain",true);
    func_ActionDriven("actGenerateBookingSummary", false);
});
//generate booking summary upon filter
$(document).on('change', '#cmbProject', function (e) {
    nwParameter_Add("projectfilter", $("#cmbProject").val());
    nwParameter_Add("isMain", false);
    func_ActionDriven("actGenerateBookingSummary", false);
});
//booking summary detailed
$(document).on('click', '.lotunitdtls', function (e) {
    $("#iframetitle").text("My Booking Summary Details");
    var units = $(this).attr('lotunitcode');
    $(document).find('#popup').fadeIn();
    $("#iFrame1").attr("src", "../../../MW/DocumentEntry/BookingSummary/BookingSummary.aspx?nwdev=p8dev&nwu=" + recuser + "&nwUnits=" + units + "");
});
//commission for pickup detailed
$(document).on('click', '.forpickupdtls', function (e) {
    $("#iframetitle").text("Commission For Pickup Details");
    var acctno = $(this).attr('acctno');
    var cust = $(this).attr('cust');
    var unitdesc = $(this).attr('unitdesc');
    var total = $(this).attr('total');
    $(document).find('#popup').fadeIn();
    var params = "&nwAcctNo=" + acctno + "&nwCust=" + cust + "&nwUnitDesc=" + unitdesc + "&nwTotal=" + total + "";
    $("#iFrame1").attr("src", "../../../MW/DocumentEntry/CommForPickupDtls/CommForPickupDtls.aspx?nwdev=p8dev&nwu=" + recuser + params + "");
});
//Entry and Reports Access
$(document).on('click', '#btnTransaction,#btnMore', function () {
    func_ActionDriven("actCheckAccess", false);
});

//change of preferred property type
$(document).on('change', '#cmbPropertyType,#cmbLocation', function () {
    //var loc = $(this).val().replace(/\s/g, "");
    //$([document.documentElement, document.body]).animate({
    //    scrollTop: $("#titleList" + loc + "").offset().top
    //}, 1000);
    $(".row-list-c").remove();
    cust_GetPara();
    func_ActionDriven("actChangeFilter", false);
});

var uprice = "";
//click unit block
$(document).on('click', '.lvl-c', function () {
    var unitcode = $(this).attr("code");
    uprice = $(this).attr("uprice");
    RefreshSliderPerUnit(pcode, ptype, phtw, unitcode);
    $(document).find('.side-popup.clicked-lvl').fadeIn();
    nwParameter_Add("pcode", pcode);
    nwParameter_Add("phase", pcode);
    nwParameter_Add("ptype", ptype);
    nwParameter_Add("phtw", phtw);
    nwParameter_Add("status", $(this).attr("status"));
    nwParameter_Add("unitcode", unitcode);
    func_ActionDriven("actLoadUnitDetails", false);
    if ($("#cbBulk").prop("checked") == true)
        nwParameter_Add("trantype", "BCHHLD");
    else
        nwParameter_Add("trantype", "HOLDPR");
    func_ActionDriven("actCheckQueue", false);
    if ($("#cbBulk").prop("checked") == true)
        $("#chk" + unitcode).click();
});


$(document).on('change', '.chkUnits', function () {
    var id = $(this).attr("id");
    var ccode = $(this).attr("code");
    var selected = $("#" + id).prop("checked");
    if (selected == true) {
        //nwParameter_Add("unitcode", ccode);
        //nwParameter_Add("id", id);
        //nwParameter_Add("isselected", true);
        //nwParameter_Add("mode", "chkUnits");
        //func_ActionDriven("actGetUnitPrice", false);
        CheckIfHasPriceBulk(ccode, id, uprice, "chkUnits");
    }
    if (selected == false) {
        AddToSelectedBulk(ccode, "delete");
    }
});



//project
var xcode = "";
var prevcode = "";
var xwidth = 1200;
var isclick = false;
$(document).on("click", ".btnlinFloor", function () {
    $(document).find('.side-popup.clicked-lvl').fadeOut("fast");
    //if (isclick == true) return;

    isclick = true;
    //nwLoading_Start("actLoadFloorDetail", crLoadingHTML);

    // setTimeout(function () {
    $(".btnlinFloor").removeClass("selected");
    $(this).addClass("selected");

    if ($('.selected').find('.stat').hasClass('isCoordinate') == false)
    {
        var code = $(this).attr("code");

        nwParameter_Add("selectedFloor", code);
        nwParameter_Add("pcode", pcode);
        nwParameter_Add("phtw", phtw);
        nwParameter_Add("ptype", ptype);
        if ($("#cbBulk").prop("checked") == true)
            nwParameter_Add("trantype", "BCHHLD");
        else
            nwParameter_Add("trantype", "HOLDPR");
        func_ActionDriven("actGenerateUnits", false);
        $("#unitMap").hide();
        $(".lvl-b-box").show();
    }
    else
    {
        $(".lvl-b-box").hide();
        $("#unitMap").show();

        var code = $(this).attr("code");

        //if (xcode == code) return;

        try {
            imagesrc = imagesrc.replace($ServerLink, "");
        } catch (err) { }


        if (xcode != "" && xcode != undefined) setJSON(xcode, imageMap.Data, imagesrc, xwidth);


        try {
            imageMap.Destroy();
        } catch (err) { }

        //nwLoading_Start("actLoadFloorDetail1", crLoadingHTML);
        setTimeout(function () {
            imagesrc = "";
            var xjson = getJSON(xcode, unitinto);
            var xyjson;
            if (xjson.length > 0) {
                xyjson = xjson[0];
                imagesrc = xyjson.img;
                xwidth = xyjson.width;
            }

            if (xwidth == undefined) xwidth = 1200;

            imageMap = new P8.ImageMap("unitMap", xwidth, $ServerLink + imagesrc);

            //css ng buttons
            var btnhideshow = "width: 50px;height: 28px;border: 1px solid transparent;background-color: #ffffff;border-radius: 4px;text-transform: capitalize;box-shadow: 0 1px 4px rgba(0,0,0,.20);cursor: pointer;outline: none;";
            var btnzoom = "font-size: 13px;border: none;background-color: #158adf;border-radius: 3px;font-weight: bold;font-family: 'Century Gothic', 'Segoe UI', sans-serif;display: inline-block;color: #ffffff;height: 25px;line-height: 24px;text-align: center;padding: 0 5px;letter-spacing: .4px;vertical-align: top;";
            var btnzoomin = "width: 25px;height: 25px;border-radius: 3px;border: 2px solid #dfdfdf;background-color: #ffffff;font-weight: bold;font-size: 16px;line-height: 23px;display: inline-block;vertical-align: top;cursor: pointer;text-align: center;padding: 0;padding-right: 1px;color: #333333;outline: none;";
            var btnzoomout = "width: 25px;height: 25px;border-radius: 3px;border: 2px solid #dfdfdf;background-color: #ffffff;font-weight: bold;font-size: 16px;line-height: 22px;display: inline-block;vertical-align: top;cursor: pointer;text-align: center;padding: 0;padding-right: 1px;color: #333333;outline: none;font-size: 17px;"
            var divzoom = "position: fixed;top: 11px;right: 10px;";

            

            $('#unitMap').contents().find("body").append("<style>div#btnzoom{" + divzoom + "}#btnhideshow{" + btnhideshow + "}#btnzoom #zoomperc{" + btnzoom + "}#btnzoomin{" + btnzoomin + "}button#btnzoomout{" + btnzoomout + "}</style>");
            if (xjson.length > 0) {
                try {
                    for (var i = 0; i < xyjson.object.length; i++)
                    {
                        var isEnableSelect = false;
                        if (xyjson.object[i].status == "003")
                        {
                            _class = "avail";
                            if (isBulk == true)
                            {
                                if(xyjson.object[i].UnitPrice == "0.00" || xyjson.object[i].UnitPrice == "0")
                                    isEnableSelect = false;
                                else
                                    isEnableSelect = true;
                            }
                                
                        }
                        else if (xyjson.object[i].status == "008")
                        {
                            _class = "hold";
                            if (isBulk == true)
                            {
                                if (xyjson.object[i].QueueNo < maxbulkqueue)
                                {
                                    if(xyjson.object[i].UnitPrice == "0.00" || xyjson.object[i].UnitPrice == "0")
                                        isEnableSelect = false;
                                    else
                                        isEnableSelect = true;
                                } 
                                else
                                    isEnableSelect = false;
                            }
                                
                        }  
                        else if (xyjson.object[i].status == "005")
                        {
                            _class = "reserved";
                            if (isBulk == true)
                                isEnableSelect = false;
                        }
                        else if (xyjson.object[i].status == "006")
                        {
                            _class = "sold";
                            if (isBulk == true)
                                isEnableSelect = false;
                        }  
                        else if (xyjson.object[i].status == "016")
                        {
                            _class = "reopened";
                            if (isBulk == true)
                                isEnableSelect = true;
                        }
                        else if (xyjson.object[i].status == "004")
                        {
                            _class = "reservedprogress";
                            if (isBulk == true)
                                isEnableSelect = false;
                        }
                        else if (xyjson.object[i].status == "007") {
                            _class = "onholdbo";
                            if (isBulk == true)
                                isEnableSelect = false;
                        }
                        else
                        {
                            if (xyjson.object[i]._class == "")
                                _class = "def";
                            else
                                _class = xyjson.object[i]._class;
                            if (isBulk == true)
                                isEnableSelect = false;
                        }
                        if (isBulk == true)
                        {
                            for (var j = 0; j < selectedUnits.length; j++) {
                                var code = xyjson.object[i].code;
                                var ccode = selectedUnits[j];
                                if (code == ccode) {
                                    xyjson.object[i].selected = true;
                                }
                            }
                        }
                        
                        imageMap.AddPin(xyjson.object[i].code, xyjson.object[i].description, xyjson.object[i].tooltip, xyjson.object[i].x, xyjson.object[i].y, xyjson.object[i].width, xyjson.object[i].height, xyjson.object[i].selected, isEnableSelect, _class);
                    }
                    //collor of pins
                    $('#unitMap').contents().find("body").append("<style>.def{background-color:" + cdef + " !important;}.onholdbo{background-color:" + conholdbo + " !important;}.reservedprogress{background-color:" + creservedprogress + " !important;}.avail{background-color:" + cavail + " !important;}.hold{background-color:" + conhold + " !important;}.reserved{background-color:" + creserved + " !important;}.sold{background-color:" + csold + " !important;}.reopened{background-color:" + creopened + " !important;}</style>");

                } catch (err) { }
                isclick = false;
            }
            //if ($("#cbRetail").prop("checked") == true)
            //{
                imageMap.SetViewMode("view")
                imageMap.viewMode = "view";
            //}
            

            //nwLoading_End("actLoadFloorDetail1");
        }, 1500);


        //alert(code);
        //nwPopupForm_Show("nwformAddUnit");

        nwParameter_Add("selectedFloor", code);
        nwParameter_Add("pcode", pcode);
        nwParameter_Add("phtw", phtw);
        nwParameter_Add("ptype", ptype);

        func_ActionDriven("actLoadFloorDetail", false);



        xcode = pcode + "-" + phtw + "-" + code;

        // isclick = false;

        // }, 100);
    }
    nwParameter_Add("isCoordinate", $('.btnlinFloor.selected').attr('isCoordinate'));
    func_ActionDriven("actUntCnt", false);
    return false;
});

//Pagination Custom Events
var maxcnt= $("#curCnt").attr("maxcnt");
var crntval = $("#curCnt").val();
//First
$(document).on("click", ".SpFirst", function () {
    $("#curCnt").val("1");
    crntval = $("#curCnt").val();
    LoadUnitDetailsMult(crntval);
    $(this).enable(false);
    $(".SpPrev").enable(false);
    $(".SpNext").enable(true);
    $(".SpLast").enable(true);
});
//Next
$(document).on("click", ".SpNext", function () {
    maxcnt = parseInt($("#curCnt").attr("maxcnt"));
    $(".SpPrev").enable(true);
    $(".SpFirst").enable(true);
    crntval = parseInt($("#curCnt").val());
    crntval = crntval += 1;
    $("#curCnt").val(crntval);
    LoadUnitDetailsMult(crntval);

    if(crntval == maxcnt)
    {
        $(this).enable(false);
        $(".SpLast").enable(false);
    }
    else {
        $(this).enable(true);
        $(".SpLast").enable(true);
    }
});
//Previous
$(document).on("click", ".SpPrev", function () {
    maxcnt = parseInt($("#curCnt").attr("maxcnt"));
    $(".SpNext").enable(true);
    $(".SpLast").enable(true);
    crntval = parseInt($("#curCnt").val());
    crntval = crntval -= 1;
    $("#curCnt").val(crntval);
    LoadUnitDetailsMult(crntval);

    if (crntval == 1) {
        $(this).enable(false);
        $(".SpFirst").enable(false);
    }
    else {
        $(this).enable(true);
        $(".SpFirst").enable(true);
    }
});
//Last
$(document).on("click", ".SpLast", function () {
    $("#curCnt").val(maxcnt);
    crntval = $("#curCnt").val();
    LoadUnitDetailsMult(crntval);
    $(this).enable(false);
    $(".SpNext").enable(false);
    $(".SpPrev").enable(true);
    $(".SpFirst").enable(true);
});

//text change
$(document).on("input", "#curCnt", function () {
    crntval = $(this).val();
    if (crntval > maxcnt) {
        maxcnt = parseInt($("#curCnt").attr("maxcnt"));
        $("#curCnt").val(maxcnt);
        $(".SpLast").click();
    }
    else
    {
        maxcnt = parseInt($("#curCnt").attr("maxcnt"));
        LoadUnitDetailsMult(crntval);

        if (crntval == maxcnt) {
            $(".SpNext").enable(false);
            $(".SpLast").enable(false);
            $(".SpPrev").enable(true);
            $(".SpFirst").enable(true);
        }
        if (crntval == 1) {
            $(".SpNext").enable(true);
            $(".SpLast").enable(true);
            $(".SpPrev").enable(false);
            $(".SpFirst").enable(false);
        }
        else {
            $(".SpNext").enable(true);
            $(".SpLast").enable(true);
            $(".SpPrev").enable(true);
            $(".SpFirst").enable(true);
        }
    }
});

//Bulk Details
$(document).on("click", "#btnViewBulkDtls", function () {
    var descriptions = "";
    var selectedCounter = 0;
    var zerocnt= 0;
    $('.pdlg-li').each(function (i, obj) {
        var id = $(this).attr("id");
        var selected = $(this).attr("isSelected");
        var val = $(this).text();
        var cnt = $(this).attr("selectedCnt");
        
        if (selected == "true") {
            selectedCounter++;
            if(cnt == "0" || cnt == "")
            {
                descriptions += val + " has no selected unit(s). \n";
                zerocnt++;
            }
        }
    });
    if (selectedCounter >= 1 && zerocnt > 0) //Proceed
    {
        if ($("#cbBulk").prop("checked") == true)
            $(".pdlg-ul").hide();
        else
            $(".pdlg-li").hide();
        $(".pdlg-title").text("View Bulk Details");
        $(".messagecont").text(descriptions);
        $(".pdlg-ul#pdlg-msg").show();
        $(document).find('#pdlgProject').fadeIn();
    }
    else
    {
        ViewProjectSelection(false);
        $("#iframetitle").text("Bulk Unit Details");
        $(document).find('#popup').fadeIn();
        $("#iFrame1").attr("src", "../../../MW/DocumentEntry/BulkDetails/BulkDetails.aspx?nwdev=p8dev&nwu=" + recuser + "&nwUnits=" + bunits + "");
    }
});
//Select Another Project
$(document).on('click', '#btnSelectProject', function () {
    if ($(document).find('#pdlgProject').css('display') == 'none') {
        if ($("#cbBulk").prop("checked") == true)
            ViewProjectSelection(false);
        else
            ViewProjectSelection(true);
        $(document).find('#pdlgProject').fadeIn();
    }
    else {
        $(document).find('#pdlgProject').fadeOut();
    }
});
$(document).on('change', '#cmbProjectCOMM,#cmbCustomerCOMM', function () {
    RefreshCommissions();
});
$(document).on('focusout', '#txtCOFrom,#txtCOTo,#txtAsOfDate', function () {
    RefreshCommissions();
});

//FUNCTIONS
function GetDateToday()
{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    return today;
}
function GenerateProperty(jsonprop)
{
    //project type
    for(var i= 1; i <= jsonprop.length ; i++)
    {
        var valns = jsonprop[i - 1]["ProjectType"].replace(/\s/g, '');
        var vald = jsonprop[i - 1]["ProjectTypeDesc"].replace(/\s/g, '');
        $("#secLanding").append("<div class='row-c row-list-c'><div id='titleList" + vald + "' class='lbl-title-list'>" + jsonprop[i - 1]["ProjectTypeDesc"] + "</div><div class='list-items-c' id='titleItem" + valns + "'></div></div>");
    }

    
}
//Project
function GenerateProject(jsonproj, isGenerate) {
    //li-resi-tow-cavite-stt
    for (var j = 1; j <= jsonproj.length ; j++) {
        var valns = jsonproj[j - 1]["ProjectType"].replace(/\s/g, '');
        var projd = jsonproj[j - 1]["Project"].replace(/\s/g, '');
        var phstwr = jsonproj[j - 1]["PhaseTower"].replace(/\s/g, '');
        $("#titleItem" + valns + "").append("<div id='li-" + projd + valns + phstwr + "' class='list-item btn' pcode='" + jsonproj[j - 1]["Project"] + "' ptype='" + jsonproj[j - 1]["ProjectType"] + "' phtw='" + jsonproj[j - 1]["PhaseTower"] + "' data-loc1='" + jsonproj[j - 1]["LocAccwFormDesc"] + "' data-loc2='" + jsonproj[j - 1]["LocAccwFormDesc"] + "' data-loc3='' data-proptype='" + jsonproj[j - 1]["ProjectTypeDesc"] + "'><div class='li-img-c cont'></div><div class='li-item-name'>" + jsonproj[j - 1]["ProjectDesc"] + "</div><div class='li-item-loc'>" + jsonproj[j - 1]["LocAccwFormDesc"] + "</div></div>");
        if (isGenerate == "True")
        {
            $(".pdlg-ul").append("<div class='pdlg-li' id='pdlg-" + projd + valns + phstwr + "' isSelected='false' selectedCnt='0' pcode='" + projd + "' ptype='" + valns + "' phtw='" + phstwr + "' title='" + jsonproj[j - 1]["ProjectDesc"] + "'>" + jsonproj[j - 1]["ProjectDesc"] + " (" + jsonproj[j - 1]["ProjectTypeDesc"] + ")" + "</div>");
        }
        $("#cmbProject").append("<option value='" + projd + "'>" + jsonproj[j - 1]["ProjectDesc"] + "</option>");
    }
}
//project pictures
function GeneratePicture(projd,jspic)
{
    var pic = jspic[0]["Path"];
    var value = "";
    if (pic.toLowerCase().includes(".jpg") || pic.toLowerCase().includes(".jpeg") || pic.toLowerCase().includes(".png") || pic.toLowerCase().includes(".gif"))
    {
        value = "<div class='li-img-c' style='background-image:url(" + $ServerLink + pic + ")'><input type='checkbox' class='chk chkProjects' id='chk" + projd + "'><label class='lblchk' for='chk" + projd + "' style='float: right;'></label></div>";
    } 
    else
    {
        value = "<iframe class='li-img-c' src=" + $ServerLink + pic + "\><input type='checkbox' class='chk chkProjects' id='chk" + projd + "'><label class='lblchk' for='chk" + projd + "' style='float: right;'></label>";
    } 

    if (pic != "") {
        //$("#li-" + projd + " .li-img-c").css("background-image", "url(" + $ServerLink + pic + ")");
        $("#li-" + projd + " .li-img-c.cont").append(value);
    }
    else
    {
        value = "<input type='checkbox' class='chk chkProjects' id='chk" + projd + "'><label class='lblchk' for='chk" + projd + "' style='float: right;'></label><div class='li-img-c' style='background-image:url(../../../PortalMaterials/materials_main/media/images/img-default-image-placeholder.png);height: 60%;'></div>";
        $("#li-" + projd + " .li-img-c.cont").append(value);
    }
    if ($("#cbRetail").prop("checked") == true)
        ChangeSelectionType('R');
    if ($("#cbBulk").prop("checked") == true)
        ChangeSelectionType('B');
}
//user image
function ChangeUserImage(image)
{
    $(".welcome-user-img").css("background-image", "url(" + $ServerLink + image + ")");
    $(".nav-user-img").css("background-image", "url(" + $ServerLink + image + ")");
}
//banner
function ChangeBanner(image)
{
    $('.hdr-bg').attr('src', $ServerLink + image);
}
//carousel
function GeneratePictureCarousel(projd, jspic, type) {
    if (type == "big")
    {
        for (var i = 1; i <= jspic.length; i++) {
            var pic = jspic[i - 1]["Path"];
            
            var value = "";
            if (pic.toLowerCase().includes(".jpg") || pic.toLowerCase().includes(".jpeg") || pic.toLowerCase().includes(".png") || pic.toLowerCase().includes(".gif")) {
                value = "<div class='nk-carousel-slide scontent' style = 'background-image: url(" + $ServerLink + pic + ");'></div>";
            }
            else {
                value = "<iframe class='nk-carousel-slide scontent' src=" + $ServerLink + pic + "\>";
            }
            $("#nkSlider1").append(value);
        }
        $("#nkSlider1").find(".nk-carousel-slide.scontent").first().addClass("show s");
        $("#nkSlider1").find(".nk-carousel-slide").not(".show").hide();
    }

    if (type == "small")
    {
        for (var i = 1; i <= jspic.length; i++) {
            var pic = jspic[i - 1]["Path"];

            var value = "";
            if (pic.toLowerCase().includes(".jpg") || pic.toLowerCase().includes(".jpeg") || pic.toLowerCase().includes(".png") || pic.toLowerCase().includes(".gif")) {
                value = "<div class='nk-carousel-slide' style = 'background-image: url(" + $ServerLink + pic + ");'></div>";
            }
            else {
                value = "<iframe class='nk-carousel-slide' src=" + $ServerLink + pic + "\>";
            }
            $("#nkSlider2").append(value);
        }
        $("#nkSlider2").find(".nk-carousel-slide.scontent").first().addClass("show s");
        $("#nkSlider2").find(".nk-carousel-slide").not(".show").hide();
    }

}
    
function RefreshUnitAvailability(pcode,ptype,phtw)
{
    nwParameter_Add("pcode", pcode);
    nwParameter_Add("ptype", ptype);
    nwParameter_Add("phtw", phtw);
    RefreshSliderMain(pcode, ptype, phtw);
    nwParameter_Add("selectedFloor", $('.btnlinFloor.selected').attr('code'));
    func_ActionDriven("actRefreshUnitAvailability", false);
}
function RefreshSliderMain(pcode, ptype, phtw) {
    document.getElementById("nkSlider1").innerHTML = "";
    nwParameter_Add("carouseltype", "big");
    func_ActionDriven("actLoadCarouselImage", false);
}
function RefreshSliderPerUnit(pcode, ptype, phtw, code) {
    document.getElementById("nkSlider2").innerHTML = "";
    nwParameter_Add("pcode", pcode);
    nwParameter_Add("ptype", ptype);
    nwParameter_Add("phtw", phtw);
    nwParameter_Add("carouseltype", "small");
    nwParameter_Add("unitcode", code);
    func_ActionDriven("actLoadCarouselImage", false);
}

function Load_Done(idName, idNum)
{
    nwParameter_Add("pcode", pcode);
    nwParameter_Add("phtw", phtw);
    nwParameter_Add("ptype", ptype);
    func_ActionDriven("actLoadFloor", false);
}

function loadUnit() {
    $("#pxUnitCode").html("");

    for (var i = 0; i < jsonfloor.length; i++) {
        var floor = $('.btnlinFloor.selected').attr('code');

        if (jsonfloor[i].flr == floor) {
            $("#pxUnitCode").append("<option value='" + jsonfloor[i].UnitCode + "'>" + jsonfloor[i].UnitCode + "</option>")
        }

    }
}

var unitinto = [];
function setJSON(id, json, img, xwidth) {
    var xindex = nwJsonSearchIndex(unitinto, "id", id, true);
    if (xindex >= 0) {
        nwJsonReplaceValue(unitinto, xindex, "object", json);
        nwJsonReplaceValue(unitinto, xindex, "img", img);
        nwJsonReplaceValue(unitinto, xindex, "width", xwidth);
    }
    else
        unitinto.push({ id: id, object: json, img: img, width: xwidth });
}
function getJSON(id, json) {
    return nwJson(json, "id", id, true);
}

//Pin Click
function func_P8ImageMap_PinClick(itemobj) {
    unitcode = itemobj.id.replace("btn_", "");
    var id = itemobj.id;
    var uc = "", status = "", uprice = "";
    if (imageMap.Data.length > 0) {
        for (var x = 0; x < imageMap.Data.length; x++) {
            uc = imageMap.Data[x].code;
            var cls = imageMap.Data[x]._class;
            if (uc == unitcode && (imageMap.Data[x].selected == false || imageMap.Data[x].selected == "false")) {
                status = itemobj["className"].replace("pin ", "");
                uprice = itemobj["UnitPrice"];
                var select = $(this).text();
                var block = $(this).parents(".lvl-b-box").find(".lvl-b-label").text().replace("Block ", "BLK");
                var stat = ""
                switch(status)
                {
                    case "avail":
                        stat = "003";
                        break;
                    case "reopened":
                        stat = "003";
                        break;
                    case "hold":
                        stat = "008"
                        break;
                    case "sold":
                        stat = "006"
                        break;
                    case "reserved":
                        stat = "005";
                        break;
                    case "reservedprogress":
                        stat = "004";
                        break;
                    case "onholdbo":
                        stat = "007";
                        break;
                }
                GetUnitDetails(uc, stat);
                var msg = "";
                if (cls == "avail" || cls == "reopened" || (cls == "hold" && imageMap.Data[x].enable == "true"))
                {
                    CheckIfHasPriceBulk(uc, id, uprice, "mappin");
                }
                    
            }
            if (uc == unitcode && (imageMap.Data[x].selected == true || imageMap.Data[x].selected == "true")) {
                //$(document).find('.side-popup.clicked-lvl').fadeOut();
                if (cls == "avail" || cls == "reopened")
                    AddToSelectedBulk(unitcode, "delete");
            }
        }
    }
}

//GET Selected bulk units
function AddToSelectedBulk(code,fn)
{
    var num = 0;
    var scnt = 0;
    if (fn == "delete") //remove
    {
        num = selectedUnits.indexOf(code);
        if (num != -1)
            selectedUnits.splice(num, 1);

        scnt = $("#pdlg-" + pcode + ptype + phtw).attr("selectedCnt");
        scnt--;
        $("#pdlg-" + pcode + ptype + phtw).attr("selectedCnt", scnt.toString());
    }
    if (fn == "insert") //add
    {
        num = selectedUnits.length;
        if (num == 0)
            selectedUnits[num] = code;
        else
        {
            if(selectedUnits.includes(code) == false)
            {
                selectedUnits[num] = code;
            }
        }
        scnt = $("#pdlg-" + pcode + ptype + phtw).attr("selectedCnt");
        scnt++;
        $("#pdlg-" + pcode + ptype + phtw).attr("selectedCnt", scnt.toString());
    }
    if (selectedUnits.length > 1)
        $("#btnViewBulkDtls").enable(true);
    else
        $("#btnViewBulkDtls").enable(false);

    $("#cntUnits").text(selectedUnits.length);
    bunits = "";
    for (var i = 0; i < selectedUnits.length; i++) {
        bunits += selectedUnits[i] + "|";
    }
}

//function for Unit Details
function GetUnitDetails(code,status)
{
    RefreshSliderPerUnit(pcode, ptype, phtw, code);
    $(document).find('.side-popup.clicked-lvl').fadeIn();
    nwParameter_Add("pcode", pcode);
    nwParameter_Add("phase", pcode);
    nwParameter_Add("ptype", ptype);
    nwParameter_Add("unitcode", code);
    nwParameter_Add("status", status);
    func_ActionDriven("actLoadUnitDetails", false);
    if ($("#cbBulk").prop("checked") == true)
        nwParameter_Add("trantype", "BCHHLD");
    else
        nwParameter_Add("trantype", "HOLDPR");
    func_ActionDriven("actCheckQueue", false);
    func_ActionDriven("actCheckAccess", false);
}

//generate line FOR BOOKING SUMMARY
function GenerateBookingSummaryTable(id,json,jsontotal,status)
{
    document.getElementById(id).innerHTML = "";
    //header
    $("#" + id + "").append("<tr><th>Project</th><th>Location</th><th>Block/Floor</th><th>Lot/Unit/Slot</th><th>Total Number of Units</th><th>Total Contract Price</th></tr>");
    //line
    for(var i = 1; i <= json.length ; i++)
    {
        $("#" + id + "").append("<tr><td data-lbl='Project'><div class='col1'>" + json[i - 1]["Project"] + "</div></td><td data-lbl='Location'><div class='col2'>" + json[i - 1]["Address"] + "</div></td><td data-lbl='Block/Floor'><div class='col3'>" + json[i - 1]["BlockFloor"] + "</div></td><td data-lbl='Lot/Unit/Slot' class='lotunitdtls' lotunitcode='" + json[i - 1]["LotUnitSlot"] + "'><div class='col4'>" + json[i - 1]["LotUnitSlotDesc"] + "</div></td><td class='--currency unittotal' data-lbl='Total Units'><div class='col5'>" + json[i - 1]["TotalUnits"] + "</div></td><td class='--currency unittcp' data-lbl='TCP'><div class='col6'>" + json[i - 1]["TCP"] + "</div></td></tr>");
    }
    //footer
    $("#" + id + "").append("<tr><td></td><td></td><td></td><td></td><td class='--currency --total --bold' data-lbl='Total Units'><div class='col5'>" + jsontotal[0]["TotalUnits"] + "</div></td><td class='--total --bold --currency' data-lbl='TCP'><div class='col6'>" + jsontotal[0]["TotalTCP"] + "</div></td></tr>");
}
//Generate Availability Summary
function GenerateAvlSumTable(id, json,isPagination) {
    document.getElementById(id).innerHTML = "";
    if (document.getElementById("buttons") != null)
        document.getElementById("buttons").innerHTML = "";//pagination
    
    //header
    $("#" + id + "").append("<tr><th>Project</th><th>Block/Floor</th><th>Lot/Unit/Slot</th><th>Type</th><th>Class</th><th>Selling Price</th><th>Reservation Amount</th></tr>");
    //line
    for (var i = 1; i <= json.length ; i++) {
        $("#" + id + "").append("<tr><td data-lbl='Project'><div class='col1'>" + json[i - 1]["Project"] + "</div></td><td data-lbl='Block/Floor'><div class='col2'>" + json[i - 1]["Block/Floor"] + "</div></td><td data-lbl='Lot/Unit/Slot'><div class='col3'>" + json[i - 1]["Lot/Unit/Slot"] + "</div></td><td data-lbl='Type'><div class='col4'>" + json[i - 1]["Inventory Type"] + "</div></td><td data-lbl='Class'><div class='col5'>" + json[i - 1]["Inventory Class"] + "</div></td><td class='--currency' data-lbl='Selling Price'><div class='col6'>" + json[i - 1]["Selling Price"] + "</div></td><td class='--currency' data-lbl='Reservation Amt'><div class='col7'>" + json[i - 1]["Minimum Reservation Amount"] + "</div></td></tr>");
    }
    //if ((isPagination == "true") && (json.length > 10)) {
    //    paginate(id);
    //}
}

function AddProperty(code,desc)
{
    $("#cmbPropertyType").append("<option value='" + code + "'>" + desc + "</option>")
}

function AddLocation(code,desc)
{
    $("#cmbLocation").append("<option value='" + code + "'>" + desc + "</option>")
}

//no project
function NoDetailsFound()
{
    $("#secLanding").append("<div class='row-c row-list-c'><div><b>No details found.</b></div></div>");
}


//Generate non-setup units
function GenerateNonSetupUnits(unitjson,maxqueue,user)
{
    maxbulkqueue = maxqueue;
    document.getElementById("boxcont").innerHTML = "";
    var chck = "";
    for (var i = 1; i <= unitjson.length ; i++)
    {
        var code = unitjson[i - 1]["UnitCode"];
        var stats = unitjson[i - 1]["unitstatus"];
        var uprice = unitjson[i - 1]["UnitPrice"];
        var queueno = unitjson[i - 1]["QueueNo"];
        var ruser = unitjson[i - 1]["Recuser"];
        if ($("#cbBulk").prop("checked") == true && ((queueno < maxqueue && stats == "008") || stats == "003"))
            chck = "<input type='checkbox' class='chk chkUnits' id='chk" + code + "' code='"+code+"'><label class='lblchk' for='chk" + code + "' style='float:right;padding-right: 0px;padding-left: 25px;'></label>";
        else
            chck = "";
        $(".lvl-c-box").append("<div class='lvl-c' style='color:white;text-shadow: -1px 2px 3px rgba(0, 0, 0, .18);background-color:" + unitjson[i - 1]["ColorSchm"] + "' status= '" + stats + "' uprice='"+uprice+"' code='" + code + "'>" + unitjson[i - 1]["Unit"] + "" + chck + "</div>");
    }
    $('.chkUnits').each(function (i, obj) {
        var code = $(this).attr("code");
        for (var i = 0; i < selectedUnits.length; i++)
        {
            var ccode = selectedUnits[i];
            if(ccode == code)
            {
                $("#chk" + code).prop("checked", true);
            }
        }
    });
}

//For multiple selling price
function LoadUnitDetailsMult(ix)
{
    $("#type").text(unitdtls[ix - 1]["UnitTypeDesc"]);
    $("#totarea").text(unitdtls[ix - 1]["TotalArea"]);
    $("#lotarea").text(unitdtls[ix - 1]["LotArea"]);
    $("#unitarea").text(unitdtls[ix - 1]["UnitArea"]);
    $("#clss").text(unitdtls[ix - 1]["UnitClassDesc"]);
    $("#rsrvamt").text(unitdtls[ix - 1]["MinReservationAmt"]);
    $("#amtp").text(unitdtls[ix - 1]["PHP"]);
    $("#amtu").text(unitdtls[ix - 1]["USD"]);
    $("#amte").text(unitdtls[ix - 1]["EUR"]);

    $("#ucode").text(unitdtls[ix - 1]["Code"]);
    $("#typecode").text(unitdtls[ix - 1]["UnitType"]);
    $("#clsscode").text(unitdtls[ix - 1]["UnitClass"]);
    $("#amtphp").text(unitdtls[ix - 1]["TCP"]);
    CheckMeasurements();
}

//function for checking value of measurements
function CheckMeasurements()
{
    if ($("#totarea").text() == "0.00 sqm")
        $(".grptotarea").hide();
    else
        $(".grptotarea").show();

    if ($("#lotarea").text() == "0.00 sqm")
        $(".grplotarea").hide();
    else
        $(".grplotarea").show();

    if ($("#unitarea").text() == "0.00 sqm")
        $(".grpunitarea").hide();
    else
        $(".grpunitarea").show();
}

function ExportToExcel(xlink, xparameters) {
    if (xparameters == undefined || xparameters == "undefined")
        xparameters = "";
    if (xlink == undefined) xlink = crExportLnk;
    var win = window.open(xlink + '?SessionID=' + ExportSessionID + SplitParameters(xparameters));

    var msg = "";

    if (!win) {
        //Broswer has blocked it
        //MessageBox('Please allow popups for this site');
        $(".pdlg-li").hide();
        $(".pdlg-title").text("Export to Excel");
        msg = "Please allow popups for this site";
        $(".messagecont").show().text(msg);
        $(document).find('#pdlgProject').fadeIn();
    } else {
        ViewProjectSelection(true);
    }

    return false;
}
//Change of Selection Type
function ChangeSelectionType(type)
{
    switch(type)
    {
        case "R"://Retail
            $(".lblchk").css("visibility", "hidden");
            $(".pdlg-li").show();
            $("#btnHold").show();
            $("#btnReserveNow").show();
            $("#divBulkDtls").hide();
            isBulk = false;
            break;
        case "B"://Bulk
            $(".lblchk").css("visibility", "visible");
            $(".pdlg-li").hide();
            $("#btnHold").hide();
            $("#btnReserveNow").hide();
            $("#divBulkDtls").show();
            isBulk = true;
            break;
    }
    $("#btnProceedBulk").enable(false);
    $(".chk").prop("checked", false);
    ResetBulkUnits();
}
function CallProjectBulk(val) {
    $(document).find('#secLanding, #secBookingSummary').fadeOut('fast');
    $(document).find('#secProject').fadeIn();
    $(document).find('#secAvailabilityChart').fadeIn();
    $('#listTitle').text(val);
    //$('.btn-cancel').parents('.pdlg').fadeOut();
    //$(document).find('.side-popup.clicked-lvl').fadeOut();
    $("#btnReserve").hide();

    $(".main-c").animate({ scrollTop: 0 }, 600);
    $(window).scrollTop(0);
}

function CheckIfHasPriceBulk(code,id,priceval,mode)
{
    var msg = "";
    if (priceval == "0.00" || priceval == "0" || priceval == "") {
        NoSellingPrice("Bulk Holding");
        if (mode == "mappin")
        {
            //imageMap.Data[x].selected = "false";
            $("#unitMap").contents().find("#" + id).find(".chbox").prop("checked", false);
        }
        else
            $("#" + id).prop("checked", false);
    }
    else {
        ViewProjectSelection(false);
        AddToSelectedBulk(code, "insert");
    }
}

function ResetBulkUnits()
{
    $("#btnViewBulkDtls").enable(false);
    selectedUnits = [];
    bunits = "";
    $("#cntUnits").text("0");
    $(".chkUnits").prop("checked", false);
    $("#unitMap").contents().find(".chbox").prop("checked", false);
    $(".pdlg-li").attr("selectedCnt", "0");
}

//No selling price
function NoSellingPrice(title) {
    pmsg = "";
    if ($("#cbBulk").prop("checked") == true)
        $(".pdlg-ul").hide();
    else
        $(".pdlg-li").hide();
    $(".pdlg-title").text(title);
    pmsg += "Cannot be continued. Selling price is required. \n";
    $(".messagecont").text(pmsg);
    $(".pdlg-ul#pdlg-msg").show();
    $(document).find('#pdlgProject').fadeIn();
}
//No access to menu item
function NoAccess(title)
{
    if (pmsg != "Cannot be continued. Selling price is required. \n")
        pmsg = "";
    if ($("#cbBulk").prop("checked") == true)
        $(".pdlg-ul").hide();
    else
        $(".pdlg-li").hide();
    $(".pdlg-title").text(title);
    pmsg += "You have no access rights to this menu item. Please contact your system administrator.";
    $(".messagecont").text(pmsg);
    $(".pdlg-ul#pdlg-msg").show();
    $(document).find('#pdlgProject').fadeIn();
}
//View project lists again
function ViewProjectSelection(notisBulk)
{
    if (notisBulk == true)
        $(".pdlg-li").show();
    if ($("#cbBulk").prop("checked") == true)
        $(".pdlg-ul").show();
    $(".pdlg-title").text("Select another Project/Phase/Tower");
    $(".pdlg-ul#pdlg-msg").hide();
    pmsg = "";
    $(".messagecont").text("");
    //$(document).find(".side-popup.clicked-lvl").fadeOut();
}

//Back to Landing Page
function BackToLandingPage()
{
    $(document).find('.secProject').fadeOut('fast');
    $(document).find('#secAvailabilityChart').fadeOut('fast');
    $(document).find('#secLanding').fadeIn();
    $(".main-c").animate({ scrollTop: 0 }, 600);
    $(window).scrollTop(0);
}

//Refresh Commissions table
function RefreshCommissions()
{
    if ($("#cbAsOfDate").prop("checked") == true)
        nwParameter_Add("CommMode", 1);
    if ($("#cbCutoffDate").prop("checked") == true)
        nwParameter_Add("CommMode", 2);
    nwParameter_Add("datesingle", $("#txtAsOfDate").val());
    nwParameter_Add("from", $("#txtCOFrom").val());
    nwParameter_Add("to", $("#txtCOTo").val());
    nwParameter_Add("project", $("#cmbProjectCOMM").val());
    nwParameter_Add("customer", $("#cmbCustomerCOMM").val());
    func_ActionDriven("actGenerateCommissions", true);
}

//generate line FOR COMMISSIONS
function GenerateCommissionsTable(id, json, jsontotal) {
    document.getElementById(id).innerHTML = "";
    if (document.getElementById("buttons") != null)
        document.getElementById("buttons").innerHTML = "";//pagination

    //header
    $("#" + id + "").append("<tr><th>Project</th><th>Block/Floor</th><th>Lot/Unit/Slot</th><th>Account Status</th><th>Customer</th><th>Account No.</th><th>Total Commission Amount</th><th>Total Commission Received</th><th>Total Commission for Pick-up</th><th>Balance</th><th>Customer Release Status</th></tr>");
    //line
    for (var i = 1; i <= json.length ; i++) {
        $("#" + id + "").append("<tr><td data-lbl='Project'><div class='col1'>" + json[i - 1]["Project"] + "</div></td><td data-lbl='Block/Floor'><div class='col2'>" + json[i - 1]["BlockFloor"] + "</div></td><td data-lbl='Lot/Unit/Slot'><div class='col3'>" + json[i - 1]["LotUnitSlot"] + "</div></td><td data-lbl='Account Status'><div class='col4'>" + json[i - 1]["AccountStatus"] + "</div></td><td data-lbl='Customer'><div class='col5'>" + json[i - 1]["Customer"] + "</div></td><td data-lbl='Account No.'><div class='col6'>" + json[i - 1]["AccountNo"] + "</div></td><td data-lbl='Total Amount' class='--currency'><div class='col7'>" + json[i - 1]["TotalCommAmt"] + "</div></td><td data-lbl='Total Received' class='--currency'><div class='col8'>" + json[i - 1]["TotalCommRcvd"] + "</div></td><td data-lbl='Total For Pickup' class='--currency forpickupdtls' acctno='" + json[i - 1]["AccountNo"] + "' unitdesc='" + json[i - 1]["UnitDesc"] + "' cust='" + json[i - 1]["Customer"] + "' total='" + json[i - 1]["TotalCommAmt"] + "'><div class='col9'>" + json[i - 1]["TotalCommForPickup"] + "</div></td><td data-lbl='Balance' class='--currency'><div class='col10'>" + json[i - 1]["Balance"] + "</div></td><td data-lbl='C.R. Status'><div class='col11'>" + json[i - 1]["CRStatus"] + "</div></td></tr>");
    }
    //footer
    $("#" + id + "").append("<tr><td class='--bold'>TOTALS</td><td></td><td></td><td></td><td></td><td></td><td data-lbl='Total Amount' class='--bold --currency'><div class='col7'>" + jsontotal[0]["TotalCommAmt"] + "</div></td><td data-lbl='Total Received' class='--bold --currency'><div class='col8'>" + jsontotal[0]["TotalCommRcvd"] + "</div></td><td data-lbl='Total For Pickup' class='--bold --currency'><div class='col9'>" + jsontotal[0]["TotalCommForPickup"] + "</div></td><td data-lbl='Balance' class='--bold --currency'><div class='col10'>" + jsontotal[0]["Balance"] + "</div></td><td></td></tr>");

    //add class if fully paid
    $(document).find("table td:nth-child(11):contains(Fully Paid)").parents("tr").addClass("--fully-paid");
}

function GenerateCommissionsTotals(json) {
    $("#commTotalNo").text(json[0]["Count"]);
    $("#commTotalAmt").text(json[0]["TotalCommAmt"]);
    $("#commTotalRcvd").text(json[0]["TotalCommRcvd"]);
    $("#commTotalForPickup").text(json[0]["TotalCommForPickup"]);
    $("#commBalance").text(json[0]["Balance"]);
}

function GenerateCommissionCombos(id,json)
{
    for(var i=0; i < json.length; i++)
    {
        $("#" + id).append("<option value='" + json[i]["Code"] + "'>" + json[i]["Desc"] + "</option>");
    }
}
function ChangeCommisionDate(mode)
{
    var date = GetDateToday();
    switch(mode)
    {
        case "1":
            $("#txtAsOfDate").enable(true);
            $("#txtCOFrom").enable(false);
            $("#txtCOTo").enable(false);
            $("#txtAsOfDate").val(date);
            $("#txtCOFrom").val('');
            $("#txtCOTo").val('');
            break;
        case "2":
            $("#txtAsOfDate").enable(false);
            $("#txtCOFrom").enable(true);
            $("#txtCOTo").enable(true);
            $("#txtAsOfDate").val('');
            $("#txtCOFrom").val(date);
            $("#txtCOTo").val(date);
            break;
    }

    RefreshCommissions();
}

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