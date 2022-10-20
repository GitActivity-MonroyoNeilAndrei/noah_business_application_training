
baseTitle = "Sales Call";

//?nwdev=p8dev&nwu=e-rjl

//var  SPR_BIRCODE = 1,
//SPR_BIRDESC = 2;
//SPR_ITEMGROUPTYPECODE = 3,
//SPR_ITEMGROUPTYPEDESC = 4,
//SPR_BASEUOM = 5,
//SPR_VATTAXDESC = 6,
//SPR_EWTDESC = 7,
//SPR_REMARKS = 8,
//SPR_TAGREMARKS = 9,
//SPR_VATTAXCODE = 10,
//SPR_EWTCODE = 11,
//SPR_BASEUOMCODE = 12;


//var _VatCode = "";
//var _VatDesc = "";
//var _EWTCode = "";
//var _EWTDesc = "";
var filter = "";

function func_Reload() {
    LoadStringsCases();
    crLnk = "../SBSalesCall/SBSalesCall_Gateway";
    crLnkGateKey = "SBSalesCall";
    DisableFields();
    //nwPopupForm_Create("nwPopWindow", false);

    $("#noah-webui-default-Inquire").enable(true);


    crnwTagSingleBind = true;

   
    var isContinue = true;
    init_request();
    ToolBoxGetData = false;

    //nwu = `nwu=${nwu}`;
    url = `SBSalesCallSummary`;
    nwPopupForm_Create("SalesCallSumm", false, url);

    //nwPopupForm_Create("SalesCallSumm", true); 
    $(`.dtpicker`).datetimepicker({
        timeFormat: `HH:mm:ss`,
        timeInput: true
    }).inputmask({
        //mask: "9999-99-99 99:99:99",
        mask: "99/99/9999 99:99:99",
        clearIncomplete: true
    });
    return isContinue;
}

////////////////////////// Tool Box

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    return isContinue;
}

function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", baseTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

//palatandaan

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", baseTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", baseTitle, "", indef, enume);
    isContinue = false;
    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    EnableFields();
    isRefreshed = true;
    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;

    isContinue = false;
    return isContinue;
}

function func_ToolboxExport(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxPrint(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxClosing(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxSearch(indef, enume) {
    var isContinue = true;
    isContinue = false;
    return isContinue;
}

///////////////////// Bind tool

function cust_GetPara() {
    nwParameter_Add("txtTransactionNo", $("#txtTransactionNo").val());
    //nwParameter_Add("txtMobileNo", $("#txtMobileNo").val());
    //nwParameter_Add("txtRemarks", $("#txtRemarks").val());
    nwParameter_Add("nwtxt_ModDate", $('#nwtxt_ModDate').text());
}

function func_ToolboxNavigatorBind(enume) {
    cust_GetPara();
    var isContinue = true;
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    nwLoading_Start("actBindCollection", crLoadingHTML);
    cust_GetPara();
    EnableFieldsDone();
    ChkBox_RDB_Checker();
    Done_Checker();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("actBindCollectionEmpty", crLoadingHTML);
    DisableFieldsEmpty();
    func_ActionDriven("actBindCollectionEmpty", false);
}

///////////////////////////////////////

function EnableFields() {
    //$(".history_switch").prop("disabled", true);
    //$('#chkBox').prop('checked', true);
    $("#lugSeller").enable(false);
    $("#lugProspectCust").enable(true);
    $("#lugSalesForceAct").enable(true);
    $("#lugLoc").enable(true);
    $("#lugProj").enable(true);
    $("#lugTowerPhase").enable(true);
    $("#txtMobileNo").enable(true);
    $("#txtEmailAdd").enable(true);
    $("#txtStartDate").enable(true);
    $("#txtEndDate").enable(true);
    $("#txtNotifSched").enable(true);
    $("#chkSMS").enable(true);
    $("#chkEmail").enable(true);
    $("#chkSeller").enable(true);
    $("#chkBuyer").enable(true);
    $("#chkImmediateSuperior").enable(true);
    $("#txtRemarks").enable(true);
    $("#txtRecordStat").enable(false);
    $("#rdbAttended").enable(false);
    $("#rdbResched").enable(false);
    $("#rdbCancel").enable(false);
    $("#btnViewRecords").enable(true);
}

function DisableFields() {
    //$(".history_switch").prop("disabled", true);
    //$('#chkBox').prop('checked', true);
    $("#lugSeller").enable(false);
    $("#lugProspectCust").enable(false);
    $("#lugSalesForceAct").enable(false);
    $("#lugLoc").enable(false);
    $("#lugProj").enable(false);
    $("#lugTowerPhase").enable(false);
    $("#txtMobileNo").enable(false);
    $("#txtEmailAdd").enable(false);
    $("#txtStartDate").enable(false);
    $("#txtEndDate").enable(false);
    $("#txtNotifSched").enable(false);
    $("#chkSMS").enable(false);
    $("#chkEmail").enable(false);
    $("#chkSeller").enable(false);
    $("#chkBuyer").enable(false);
    $("#chkImmediateSuperior").enable(false);
    $("#txtRemarks").enable(false);
    $("#txtRecordStat").enable(false);
    $("#rdbAttended").enable(false);
    $("#rdbResched").enable(false);
    $("#rdbCancel").enable(false);
    $("#btnViewRecords").enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
}

function EnableFieldsDone() {
    //Binding Done
    //$(".history_switch").prop("disabled", false);
    //$('#chkBox').prop('checked', true);
    $("#lugSeller").enable(false);
    $("#lugProspectCust").enable(false);
    $("#lugSalesForceAct").enable(false);
    $("#lugLoc").enable(false);
    $("#lugProj").enable(false);
    $("#lugTowerPhase").enable(false);
    $("#txtMobileNo").enable(true);
    $("#txtEmailAdd").enable(true);
    $("#txtStartDate").enable(false);
    $("#txtEndDate").enable(false);
    $("#txtNotifSched").enable(true);
    $("#chkSMS").enable(true);
    $("#chkEmail").enable(true);
    $("#chkSeller").enable(true);
    $("#chkBuyer").enable(true);
    $("#chkImmediateSuperior").enable(true);
    $("#txtRemarks").enable(true);
    $("#txtRecordStat").enable(false);
    $("#rdbAttended").enable(true);
    $("#rdbResched").enable(true);
    $("#rdbCancel").enable(true);
    $("#btnViewRecords").enable(true);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
}

function DisableFieldsEmpty() {
    //$(".history_switch").prop("disabled", true);
    //$('#chkBox').prop('checked', true);
    $("#lugSeller").enable(false);
    $("#lugProspectCust").enable(false);
    $("#lugSalesForceAct").enable(false);
    $("#lugLoc").enable(false);
    $("#lugProj").enable(false);
    $("#lugTowerPhase").enable(false);
    $("#txtMobileNo").enable(false);
    $("#txtEmailAdd").enable(false);
    $("#txtStartDate").enable(false);
    $("#txtEndDate").enable(false);
    $("#txtNotifSched").enable(false);
    $("#chkSMS").enable(false);
    $("#chkEmail").enable(false);
    $("#chkSeller").enable(false);
    $("#chkBuyer").enable(false);
    $("#chkImmediateSuperior").enable(false);
    $("#txtRemarks").enable(false);
    $("#txtRecordStat").enable(false);
    $("#rdbAttended").enable(false);
    $("#rdbResched").enable(false);
    $("#rdbCancel").enable(false);
    $("#btnViewRecords").enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
}

function ClearFields() {
    $("#idvallugProspectCust").val("");
    $("#descvallugProspectCust").val("");
    $("#idvallugSalesForceAct").val("");
    $("#descvallugSalesForceAct").val("");
    $("#idvallugLoc").val("");
    $("#descvallugLoc").val("");
    $("#idvallugProj").val("");
    $("#descvallugProj").val("");
    $("#idvallugTowerPhase").val("");
    $("#descvallugTowerPhase").val("");
    $("#txtMobileNo").val("");
    $("#txtEmailAdd").val("");
    $("#txtStartDate").val("");
    $("#txtEndDate").val("");
    $("#txtNotifSched").val("");
    $("#ComboBox1").val("");
    $("#chkSMS").prop('checked', false);
    $("#chkEmail").prop('checked', false);
    $("#ComboBox2").val("");
    $("#chkSeller").prop('checked', false);
    $("#chkBuyer").prop('checked', false);
    $("#chkImmediateSuperior").prop('checked', false);
    $("#txtRemarks").val("");
    $("#txtRecordStat").val("");
    $("#radiolists").val("");
    $("#rdbAttended").prop('checked', false);
    $("#rdbResched").prop('checked', false);
    $("#rdbCancel").prop('checked', false);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

/* ###STNDRD FUNC */

function formatDate(date) {
    var monthNames = [
      "01", "02", "03",
      "04", "05", "06", "07",
      "08", "09", "10",
      "11", "12"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return monthNames[monthIndex] + '/' + day + '/' + year;
}

function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
}

$(document).on('change', '#idvallugProsCust', function (e) {
    $("#descvallugProsCust").val() = "";
});

$(document).on('change', '#idvallugSalesForceAct', function (e) {
    $("#descvallugSalesForceAct").val() = "";
});

$(document).on('change', '#idvallugLoc', function (e) {
    $("#descvallugLoc").val() = "";
});

$(document).on('change', '#idvallugProj', function (e) {
    $("#descvallugProj").val() = "";
});

$(document).on('change', '#idvallugTowerPhase', function (e) {
    $("#descvallugTowerPhase").val() = "";
});

$(document).on('change', '#txtStartDate', function (e) {
    var serverdate = $("#txtServerDate").val();
    var datepickfrom = $("#txtStartDate").val();
    var datepickto = $("#txtEndDate").val();

    nwParameter_Add("serverdate", serverdate);
    nwParameter_Add("datepickfrom", datepickfrom);
    nwParameter_Add("datepickto", datepickto);
    func_ActionDriven("actValidateEffectiveDate");
});

$(document).on('change', '#txtEndDate', function (e) {
    var serverdate = $("#txtServerDate").val();
    var datepickfrom = $("#txtStartDate").val();
    var datepickto = $("#txtEndDate").val();

    nwParameter_Add("serverdate", serverdate);
    nwParameter_Add("datepickfrom", datepickfrom);
    nwParameter_Add("datepickto", datepickto);
    func_ActionDriven("actValidateEffectiveDate");
});


$(document).on('click', '#chkSMS', function (e) {
    var val0 = "";
    var val1 = "SMS";
    var val2 = "Email";

    if ($("#chkSMS").is(":checked") == true && $("#chkEmail").is(":checked") == true) {
        $("#ComboBox1").val(val1 + ',' + val2);
    }
    else if ($("#chkSMS").is(":checked")) {
        $("#ComboBox1").val(val1);
    }
    else if ($("#chkEmail").is(":checked")) {
        $("#ComboBox1").val(val2);
    }
    else {
        $("#ComboBox1").val(val0);
    }
});

$(document).on('click', '#chkEmail', function (e) {
    var val0 = "";
    var val1 = "SMS";
    var val2 = "Email";

    if ($("#chkSMS").is(":checked") == true && $("#chkEmail").is(":checked") == true) {
        $("#ComboBox1").val(val1 + ',' + val2);
    }
    else if ($("#chkSMS").is(":checked")) {
        $("#ComboBox1").val(val1);
    }
    else if ($("#chkEmail").is(":checked")) {
        $("#ComboBox1").val(val2);
    }
    else {
        $("#ComboBox1").val(val0);
    }
});


$(document).on('click', '#chkSeller', function (e) {
    var val0 = "";
    var val1 = "Seller";
    var val2 = "Buyer";
    var val3 = "Immediate Superior";

    if ($("#chkSeller").is(":checked") == true && $("#chkBuyer").is(":checked") == true && $("#chkImmediateSuperior").is(":checked") == true) {
        $("#ComboBox2").val(val1 + ',' + val2 + ',' + val3);
    }
    else if ($("#chkSeller").is(":checked") == true && $("#chkBuyer").is(":checked") == true) {
        $("#ComboBox2").val(val1 + ',' + val2);
    }
    else if ($("#chkSeller").is(":checked") == true && $("#chkImmediateSuperior").is(":checked") == true) {
        $("#ComboBox2").val(val1 + ',' + val3);
    }
    else if ($("#chkBuyer").is(":checked") == true && $("#chkImmediateSuperior").is(":checked") == true) {
        $("#ComboBox2").val(val2 + ',' + val3);
    }
    else if ($("#chkSeller").is(":checked") == true) {
        $("#ComboBox2").val(val1);
    }
    else if ($("#chkBuyer").is(":checked") == true) {
        $("#ComboBox2").val(val2);
    }
    else if ($("#chkImmediateSuperior").is(":checked") == true) {
        $("#ComboBox2").val(val3);
    }
    else {
        $("#ComboBox2").val(val0);
    }
});

$(document).on('click', '#chkBuyer', function (e) {
    var val0 = "";
    var val1 = "Seller";
    var val2 = "Buyer";
    var val3 = "Immediate Superior";

    if ($("#chkSeller").is(":checked") == true && $("#chkBuyer").is(":checked") == true && $("#chkImmediateSuperior").is(":checked") == true) {
        $("#ComboBox2").val(val1 + ',' + val2 + ',' + val3);
    }
    else if ($("#chkSeller").is(":checked") == true && $("#chkBuyer").is(":checked") == true) {
        $("#ComboBox2").val(val1 + ',' + val2);
    }
    else if ($("#chkSeller").is(":checked") == true && $("#chkImmediateSuperior").is(":checked") == true) {
        $("#ComboBox2").val(val1 + ',' + val3);
    }
    else if ($("#chkBuyer").is(":checked") == true && $("#chkImmediateSuperior").is(":checked") == true) {
        $("#ComboBox2").val(val2 + ',' + val3);
    }
    else if ($("#chkSeller").is(":checked") == true) {
        $("#ComboBox2").val(val1);
    }
    else if ($("#chkBuyer").is(":checked") == true) {
        $("#ComboBox2").val(val2);
    }
    else if ($("#chkImmediateSuperior").is(":checked") == true) {
        $("#ComboBox2").val(val3);
    }
    else {
        $("#ComboBox2").val(val0);
    }
});

$(document).on('click', '#chkImmediateSuperior', function (e) {
    var val0 = "";
    var val1 = "Seller";
    var val2 = "Buyer";
    var val3 = "Immediate Superior";

    if ($("#chkSeller").is(":checked") == true && $("#chkBuyer").is(":checked") == true && $("#chkImmediateSuperior").is(":checked") == true) {
        $("#ComboBox2").val(val1 + ',' + val2 + ',' + val3);
    }
    else if ($("#chkSeller").is(":checked") == true && $("#chkBuyer").is(":checked") == true) {
        $("#ComboBox2").val(val1 + ',' + val2);
    }
    else if ($("#chkSeller").is(":checked") == true && $("#chkImmediateSuperior").is(":checked") == true) {
        $("#ComboBox2").val(val1 + ',' + val3);
    }
    else if ($("#chkBuyer").is(":checked") == true && $("#chkImmediateSuperior").is(":checked") == true) {
        $("#ComboBox2").val(val2 + ',' + val3);
    }
    else if ($("#chkSeller").is(":checked") == true) {
        $("#ComboBox2").val(val1);
    }
    else if ($("#chkBuyer").is(":checked") == true) {
        $("#ComboBox2").val(val2);
    }
    else if ($("#chkImmediateSuperior").is(":checked") == true) {
        $("#ComboBox2").val(val3);
    }
    else {
        $("#ComboBox2").val(val0);
    }
});

$(document).on('click', '#rdbAttended', function () {
    var valdef = $("#txtRecordStat").val();
    var val1 = "Attended";
    var val2 = "Rescheduled";
    var val3 = "Cancel";
    var rdblist = $("#radiolists").val();

    if (rdblist == val1) {
        $("#noah-webui-Toolbox").bindingSave().enable(true);
        $("#rdbAttended").prop('checked', false);
        $("#radiolists").val(valdef);
    }
    else if (rdblist == val2) {
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#txtStartDate").val($("#txtOldStartDate").val());
        $("#txtEndDate").val($("#txtOldEndDate").val());
        $("#txtStartDate").enable(false);
        $("#txtEndDate").enable(false);
        $("#rdbResched").prop('checked', false);
        $("#rdbAttended").prop('checked', true);
        $("#radiolists").val(val1);
    }
    else if (rdblist == val3) {
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#rdbCancel").prop('checked', false);
        $("#rdbAttended").prop('checked', true);
        $("#radiolists").val(val1);
    }
    else {
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#rdbAttended").prop('checked', true);
        $("#radiolists").val(val1);
    }
});

$(document).on('click', '#rdbResched', function () {
    var valdef = $("#txtRecordStat").val();
    var val1 = "Attended";
    var val2 = "Rescheduled";
    var val3 = "Cancel";
    var rdblist = $("#radiolists").val();
    var forReSched = $("#forReSched").val();

    if (rdblist == val2) {
        if (forReSched == "") {
            $("#noah-webui-Toolbox").bindingSave().enable(false);
            $("#txtStartDate").enable(true);
            $("#txtEndDate").enable(true);
            $("#txtStartDate").val($("#txtServerDate").val());
            $("#txtEndDate").val($("#txtServerDate").val());
            $("#rdbResched").prop('checked', true);
            $("#radiolists").val(val2);
            $("#forReSched").val(val2);
        }
        else {
            $("#noah-webui-Toolbox").bindingSave().enable(true);
            $("#rdbResched").prop('checked', false);
            $("#txtStartDate").val($("#txtOldStartDate").val());
            $("#txtEndDate").val($("#txtOldEndDate").val());
            $("#txtStartDate").enable(false);
            $("#txtEndDate").enable(false);
            $("#radiolists").val(valdef);
            $("#forReSched").val("");
        }
    }
    else if (rdblist == val1) {
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#rdbAttended").prop('checked', false);
        $("#txtStartDate").enable(true);
        $("#txtEndDate").enable(true);
        $("#txtStartDate").val($("#txtServerDate").val());
        $("#txtEndDate").val($("#txtServerDate").val());
        $("#rdbResched").prop('checked', true);
        $("#radiolists").val(val2);
        $("#forReSched").val(val2);
    }
    else if (rdblist == val3) {
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#rdbCancel").prop('checked', false);
        $("#txtStartDate").enable(true);
        $("#txtEndDate").enable(true);
        $("#txtStartDate").val($("#txtServerDate").val());
        $("#txtEndDate").val($("#txtServerDate").val());
        $("#rdbResched").prop('checked', true);
        $("#radiolists").val(val2);
        $("#forReSched").val(val2);
    }
    else {
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        func_ActionDriven("actChangeServerDate");
        $("#txtStartDate").enable(true);
        $("#txtEndDate").enable(true);
        $("#txtStartDate").val($("#txtServerDate").val());
        $("#txtEndDate").val($("#txtServerDate").val());
        $("#rdbResched").prop('checked', true);
        $("#radiolists").val(val2);
        $("#forReSched").val(val2);
    }
});

$(document).on('click', '#rdbCancel', function () {
    var valdef = $("#txtRecordStat").val();
    var val1 = "Attended";
    var val2 = "Rescheduled";
    var val3 = "Cancel";
    var rdblist = $("#radiolists").val();

    if (rdblist == val3) {
        $("#noah-webui-Toolbox").bindingSave().enable(true);
        $("#rdbCancel").prop('checked', false);
        $("#radiolists").val(valdef);
    }
    else if (rdblist == val1) {
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#rdbAttended").prop('checked', false);
        $("#rdbCancel").prop('checked', true);
        $("#radiolists").val(val3);
    }
    else if (rdblist == val2) {
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#txtStartDate").val($("#txtOldStartDate").val());
        $("#txtEndDate").val($("#txtOldEndDate").val());
        $("#txtStartDate").enable(false);
        $("#txtEndDate").enable(false);
        $("#rdbResched").prop('checked', false);
        $("#rdbCancel").prop('checked', true);
        $("#radiolists").val(val3);
    }
    else {
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#rdbCancel").prop('checked', true);
        $("#radiolists").val(val3);
    }
});

$(document).on('click', '#btnViewRecords', function () {
    nwPopupForm_ShowModal("SalesCallSumm");
});

function Lookup_DoneFunction(idName, idNum) {

    //var code = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (0) + ")").text();
    //var desc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (1) + ")").text();
    //var tempdesc = $("#menuCreatorContainer .tablecontainter table tr:eq(" + idNum + ")").find("td:eq(" + (2) + ")").text();
    var blank = "";

    if (idName == 'toolboxInquire') {
        cust_GetPara();
    }

    if (idName == 'lugProspectCust') {
        $("#txtMobileNo").val(getLookupData(idNum, 2));
        $("#txtEmailAdd").val(getLookupData(idNum, 3));
    }

    if (idName == 'lugLoc') {
        $("#idvallugProj").val(blank);
        $("#descvallugProj").val(blank);

        $("#idvallugTowerPhase").val(blank);
        $("#descvallugTowerPhase").val(blank);
    }

    if (idName == 'lugProj') {
        $("#idvallugTowerPhase").val(blank);
        $("#descvallugTowerPhase").val(blank);
    }

}

function ChkBox_RDB_Checker() {

    var ComboBox1 = $("#ComboBox1").val();
    var ComboBox2 = $("#ComboBox2").val();

    if (ComboBox1 == "SMS,Email") {
        $("#chkSMS").prop('checked', true);
        $("#chkEmail").prop('checked', true);
    }
    else if (ComboBox1 == "SMS") {
        $("#chkSMS").prop('checked', true);
        $("#chkEmail").prop('checked', false);
    }
    else if (ComboBox1 == "Email") {
        $("#chkSMS").prop('checked', false);
        $("#chkEmail").prop('checked', true);
    }
    else {
        $("#chkSMS").prop('checked', false);
        $("#chkEmail").prop('checked', false);
    }

    if (ComboBox2 == "Seller,Buyer,Immediate Superior") {
        $("#chkSeller").prop('checked', true);
        $("#chkBuyer").prop('checked', true);
        $("#chkImmediateSuperior").prop('checked', true);
    }
    else if (ComboBox2 == "Seller,Buyer") {
        $("#chkSeller").prop('checked', true);
        $("#chkBuyer").prop('checked', true);
        $("#chkImmediateSuperior").prop('checked', false);
    }
    else if (ComboBox2 == "Buyer,Immediate Superior") {
        $("#chkSeller").prop('checked', false);
        $("#chkBuyer").prop('checked', true);
        $("#chkImmediateSuperior").prop('checked', true);
    }
    else if (ComboBox2 == "Seller,Immediate Superior") {
        $("#chkSeller").prop('checked', true);
        $("#chkBuyer").prop('checked', false);
        $("#chkImmediateSuperior").prop('checked', true);
    }
    else if (ComboBox2 == "Seller") {
        $("#chkSeller").prop('checked', true);
        $("#chkBuyer").prop('checked', false);
        $("#chkImmediateSuperior").prop('checked', false);
    }
    else if (ComboBox2 == "Buyer") {
        $("#chkSeller").prop('checked', false);
        $("#chkBuyer").prop('checked', true);
        $("#chkImmediateSuperior").prop('checked', false);
    }
    else if (ComboBox2 == "Immediate Superior") {
        $("#chkSeller").prop('checked', false);
        $("#chkBuyer").prop('checked', false);
        $("#chkImmediateSuperior").prop('checked', true);
    }
    else {
        $("#chkSeller").prop('checked', false);
        $("#chkBuyer").prop('checked', false);
        $("#chkImmediateSuperior").prop('checked', false);
    }

}

function Done_Checker() {
    var radiolists = $("#radiolists").val();

    if (radiolists == 'Cancel' || radiolists == 'Attended') {
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#noah-webui-Toolbox").bindingProcess().enable(false);
        $("#lugSeller").enable(false);
        $("#lugProspectCust").enable(false);
        $("#lugSalesForceAct").enable(false);
        $("#lugLoc").enable(false);
        $("#lugProj").enable(false);
        $("#lugTowerPhase").enable(false);
        $("#txtMobileNo").enable(false);
        $("#txtEmailAdd").enable(false);
        $("#txtStartDate").enable(false);
        $("#txtEndDate").enable(false);
        $("#txtNotifSched").enable(false);
        $("#chkSMS").enable(false);
        $("#chkEmail").enable(false);
        $("#chkSeller").enable(false);
        $("#chkBuyer").enable(false);
        $("#chkImmediateSuperior").enable(false);
        $("#txtRemarks").enable(false);
        $("#txtRecordStat").enable(false);
        $("#rdbAttended").enable(false);
        $("#rdbResched").enable(false);
        $("#rdbCancel").enable(false);
        $("#btnViewRecords").enable(true);
    }
    else if (radiolists == "Rescheduled") {
        $("#noah-webui-Toolbox").bindingSave().enable(false);
        $("#txtStartDate").enable(true);
        $("#txtEndDate").enable(true);
        $("#txtStartDate").val($("#txtServerDate").val());
        $("#txtEndDate").val($("#txtServerDate").val());
        $("#rdbResched").prop('checked', true);
        $("#forReSched").val(radiolists);
    }
}

