var MenuItemTitle = "";

var nwGridConCustom_Book;
var nwGridConCustom_Sheet;

var GRD_STARTINDEX = 0,
            GRD_SELECT = ++GRD_STARTINDEX,
            GRD_ACCNO = ++GRD_STARTINDEX,
            GRD_CUSTNAME = ++GRD_STARTINDEX,
            GRD_UNITNO = ++GRD_STARTINDEX,
            GRD_DOCNO = ++GRD_STARTINDEX,
            GRD_ASSDUES = ++GRD_STARTINDEX,
            GRD_PARKING = ++GRD_STARTINDEX,
            GRD_SPECIALASS = ++GRD_STARTINDEX,
            GRD_OTHERAREA = ++GRD_STARTINDEX,
            GRD_NETOFVAT = ++GRD_STARTINDEX,
            GRD_VAT = ++GRD_STARTINDEX,
            GRD_GROSSAMOUNT = ++GRD_STARTINDEX,
            GRD_STATUS = ++GRD_STARTINDEX,
            GRD_ASSVAT = ++GRD_STARTINDEX,
            GRD_PARKINGVAT = ++GRD_STARTINDEX,
            GRD_SPECIALVAT = ++GRD_STARTINDEX,
            GRD_OTHERVAT = ++GRD_STARTINDEX,
            GRD_CUSTCODE = ++GRD_STARTINDEX;

var nwDocno = '';
var nwTranNo = '';
var jsonInvoiceType = [];
var InvoiceType = "";

function func_Reload() {
    var isContinue = true;
    crLnk = GetCurrentURL() + "PMOInvoiceEntryRegCharges_Gateway";
    crLnkGateKey = "PMOInvoiceEntryRegCharges";
    crnwTagSingleBind = true;

    DisableFields();
    nwDocno = getParameterByName('nwDocno');
    nwParameter_Add("nwTranNo", nwTranNo);
    var serverdate = new Date();
    $('#txtServerdate').val(serverdate);
    init_request();

    nwPopupForm_Create("nwInvoiceType", true);
    InvoiceType = getParameterByName("nwInvoiceType");
    if (InvoiceType == "INVREG") {
        EnableFields();
        func_ActionDriven("actNewData", false);
    }
    else {
        DisableFields();
    }
    return isContinue;
}

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    ClearFields();
    DisableFields();
    resetGrid();
    return isContinue;
}


function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    cust_GetPara();

    parent_MessageBoxQuestionToolBox("Do you want to save the current record?", MenuItemTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", MenuItemTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    isRefreshed = true;
    return isContinue;

    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;
    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;

    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", MenuItemTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxImport(indef, enume) {
    var isContinue = true;
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

function cust_GetPara() {
    nwParameter_Add("idvallugInvoiceType", $('#idvallugInvoiceType').val());
    nwParameter_Add("idvallugLocAcctForms", $("#idvallugLocAcctForms").val());
    nwParameter_Add("idvallugPhase", $('#idvallugPhase').val());
    nwParameter_Add("txtParticular", $('#txtParticular').val());
    nwParameter_Add("txtInvoiceDate", $('#txtInvoiceDate').val());
    nwParameter_Add("cboMonthly", $('#cboMonthly').val());
    nwParameter_Add("cboYearly", $('#cboYearly').val());
    nwParameter_Add("txtTransactionNo", $('#txtTransactionNo').val());
    nwParameter_Add("txtStatus", $('#txtStatus').val());
    nwParameter_Add_DataSet("nwGridConCustom")
}

function setNumReplace(val, decimal) {
    val = (parseFloat(val.toString().replace(/,/g, ""))) || 0;
    val = val.toFixed(decimal).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return val;
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    cust_GetPara();
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara(); nwLoading_Start("xLoading", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xLoading", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords == 'of 0')
        DisableFieldsEmpty();
    else
        EnableFieldsDone();
}

function Lookup_DoneFunction(idName, idNum) {
    cust_GetPara();

    if (idName === "lugLocAccForms") {
    }

    else if (idName === "lugPhaseTower") {

    }
}

function func_LookUpInitialize(idName) {
    var isContinue = true;
    cust_GetPara();

    return isContinue;
}



function DisableFields() {
    $('#lugInvoiceType').enable(false);
    $('#txtDatePosted').enable(false);
    $('#txtTransactionNo').enable(false);
    $('#txtValueDate').enable(false);
    $('#txtReasonDisapp').enable(false);
    $('#txtDisappRemarks').enable(false);
    $('#lugLocAcctForms').enable(false);
    $('#lugPhase').enable(false);
    $('#nwGridConCustom').enable(false);
    $('#txtParticular').enable(false);
    $('#txtInvoiceDate').enable(false);
    $('#cboMonthly').enable(false);
    $('#cboYearly').enable(false);
    $('#btnReqCompliance').enable(false);
    $('#btnLoadDetails').enable(false);


    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingPrint().enable(false)
}


function EnableFields() {
    $('#lugLocAcctForms').enable(true);
    $('#lugPhase').enable(true);
    $('#txtParticular').enable(true);
    $('#txtInvoiceDate').enable(true);
    $('#cboMonthly').enable(true);
    $('#cboYearly').enable(true);
    $('#btnReqCompliance').enable(true);
    $('#nwGridConCustom').enable(true);
    $("div.spantext").remove();
}

function EnableFieldsDone() {//Binding Done
    $('#lugLocAcctForms').enable(true);
    $('#lugPhase').enable(true);
    $('#txtParticular').enable(true);
    $('#txtInvoiceDate').enable(true);
    $('#cboMonthly').enable(true);
    $('#cboYearly').enable(true);
    $('#btnReqCompliance').enable(true);
    $('#nwGridConCustom').enable(true);


    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
    $("#noah-webui-Toolbox").bindingExport().enable(true);
}

function getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var today = mm + '/' + dd + '/' + yyyy;
    return today;
}



function func_WindowCloseTrigger(verID) {
    var isContinue = true;

    if (verID == 'nwPopUpRequireCompliance') {

        nwParameter_Add("docno", $('#txtTransactionNo').val());
        nwParameter_Add("isHeader", true);
        func_ActionDriven("actChkReqComp", false);
    }
    return isContinue;
}


function DisableFieldsEmpty() {
    $('#txtDatePosted').enable(false);
    $('#txtTransactionNo').enable(false);
    $('#txtValueDate').enable(false);
    $('#txtReasonDisapp').enable(false);
    $('#txtDisappRemarks').enable(false);
    $('#lugLocAcctForms').enable(false);
    $('#lugPhase').enable(false);
    $('#nwGridConCustom').enable(false);
    $('#txtParticular').enable(false);
    $('#txtInvoiceDate').enable(false);
    $('#cboMonthly').enable(false);
    $('#cboYearly').enable(false);
    $('#btnReqCompliance').enable(false);
    $('#btnLoadDetails').enable(false);
    $("div.spantext").remove();

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
}

function disableselectdone() {
    $('.nwCheckBox1').enable(false);

}

function ClearFields() {

    $('#txtParticular').val("");
    $('#txtInvoiceDate').val("");
    $('#idvallugPhase').val("");
    $('#descvallugPhase').val("");
    $('#idvallugLocAcctForms').val("");
    $('#descvallugLocAcctForms').val("");
    $('#txtTransactionNo').val("");
    $('#txtValueDate').val("");
    $('#txtDatePosted').val("");
    $('#txtReasonDisapp').val("");
    $('#txtDisappRemarks').val("");
   
}

function getNum(xval) {
    if (xval == undefined) {
        return 0;
    }
    if (xval == "" || xval.length <= 0) {
        return 0
    }
    return xval;
}

function setNumReplace(val, decimal) {
    val = getNum(parseFloat(val.toString().replace(/,/g, "")));
    val = val.toFixed(decimal).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

    return val;
}

function button() {
    $("#btnExport").css("height", "75%");
}

function p8Spread_Click(canvasID, row, col) {

}


function getLookupData(idnum, index) {
    var data = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + (index) + ") span").text();
    return data;
}


$(document).on('click', '#btnReqCompliance', function () {
    var trantype = 'INVBTH';
    var docno = $('#txtTransactionNo').val();
    var isView = nwDocno != "" ? true : false;

    if (docno == "") {
        MessageBox("Cannot proceed. Data should be saved first", MenuItemTitle, 'error');
        return false;
    }

    var fullength = GetCurrentURL() + `../DCRequirementCompliance?TransactionNo=${encodeURI(docno)}&TranType=${encodeURI(trantype)}&isView=${encodeURI(isView)}`;

    nwLoading_Start('xReqCompliance', crLoadingHTML);
    nwPopupForm_Create("nwPopUpRequireCompliance", true, fullength);
    $('#nwPopUpRequireCompliance .modal-hdr-title').text("Requirements Compliance");
    $("#nwPopUpRequireCompliance").css({ "min-width": "98%" });
    $("#nwPopUpRequireCompliance").css({ "min-height": "98%" });
    nwPopupForm_ShowModal("nwPopUpRequireCompliance");
    nwLoading_End('xReqCompliance');
});

function ReloadMonth() {
    $('#cboMonthly').html("");
    $('#cboMonthly').append("<option value='01'>January " + "</option>");
    $('#cboMonthly').append("<option value='02'>February " + "</option>");
    $('#cboMonthly').append("<option value='03'>March " + "</option>");
    $('#cboMonthly').append("<option value='04'>April " + "</option>");
    $('#cboMonthly').append("<option value='05'>May " + "</option>");
    $('#cboMonthly').append("<option value='06'>June " + "</option>");
    $('#cboMonthly').append("<option value='07'>July " + "</option>");
    $('#cboMonthly').append("<option value='08'>August " + "</option>");
    $('#cboMonthly').append("<option value='09'>September " + "</option>");
    $('#cboMonthly').append("<option value='10'>October " + "</option>");
    $('#cboMonthly').append("<option value='11'>November " + "</option>");
    $('#cboMonthly').append("<option value='12'>December " + "</option>");
}

function ClearDateFilter() {
    $("#cboMonth").val("1");
}

function setToCurrentDate() {

    let xArr = CurrentDate.split("/")

    let month = xArr[0];
    let year = xArr[2];


    $('#cboMonthly').val(month);

}

$(document).on("click", "#btnLoadDetails", function () {
   if ($("#nwGridConCustom").enable()) {
       if ($('#idvallugLocAccForms').val() != '' && $('#idvallugPhase').val() != '' && $('#txtParticular').val() != '' && $('#cboYearly').val() != '' && $('#cboMonthly').val() != '' && $('#txtInvoiceDate').val() != '') {
            nwLoading_Start("actLoadDetails", crLoadingHTML);
            cust_GetPara();
            func_ActionDriven("actLoadDetails", false);

        } else {
            MessageBox("Please complete the required header first.", pageTitle);
        }
    }

    return false;
});

function GridProp() {

    setTimeout(function () {
        $("#btnLoadDetails").addClass("btn-default");
        $("#btnLoadDetails").addClass("btn-default-orange");

        getTotalGrid();
    }, 150);
}

$(document).on('click', '#btnProceed', function () {
    var isContinue = false;
    //UponNew()

    var link = $("#cbInvoiceType").find("option:Selected").attr("nvalue");
    window.location = link;
    return isContinue;
});

function getInvoiceType() {
    $("#cbInvoiceType").html("");
    for (var i = 0; i < jsonInvoiceType.length; i++) {
        var link = GetCurrentURL() + "../" + jsonInvoiceType[i]["Code"];
        var value = getParameterByName("nsc");;

        if (link.indexOf("?") >= 0)
            link += "&nsc=" + value;
        else
            link += "?nsc=" + value;

        value = getParameterByName("nsu");;
        link += "&nsu=" + value;
        link += "&nwInvoiceType=" + jsonInvoiceType[i]["InvoiceType"];

        var data = "<option value='" + jsonInvoiceType[i]["Code"] + "' nvalue='" + link + "'>" + jsonInvoiceType[i]["Description"] + "</option>";
        $("#cbInvoiceType").append(data);
    }
}

function UponNew() {
    nwLoading_Start("UponNewLoading", crLoadingHTML);
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
}

function getTotalGrid() {
    var Grid = nwGridConCustom_Book.ActiveSheet;
    var maxRow = Grid.GetMaxRow();
    var ob = 0, obip = 0, interest = 0, penalty = 0, netvat = 0, vat = 0, grossamntip = 0;
    Grid.RowAdd(1, 1);

    for (var x = 0; x <= maxRow; x++) {
        ob += parseFloat(Grid.GetText((GRD_ASSDUES - 1), x).replaceAll(",", "")) || 0;
        obip += parseFloat(Grid.GetText((GRD_PARKING - 1), x).replaceAll(",", "")) || 0;
        interest += parseFloat(Grid.GetText((GRD_SPECIALASS - 1), x).replaceAll(",", "")) || 0;
        penalty += parseFloat(Grid.GetText((GRD_OTHERAREA - 1), x).replaceAll(",", "")) || 0;
        netvat += parseFloat(Grid.GetText((GRD_NETOFVAT - 1), x).replaceAll(",", "")) || 0;
        vat += parseFloat(Grid.GetText((GRD_VAT - 1), x).replaceAll(",", "")) || 0;
        grossamntip += parseFloat(Grid.GetText((GRD_GROSSAMOUNT - 1), x).replaceAll(",", "")) || 0;
    }

    Grid.SetText((GRD_DOCNO - 1), 0, "Total");
    Grid.SetTextAlign((GRD_DOCNO - 1), 0, "right");
    Grid.SetText((GRD_ASSDUES - 1), 0, setNumReplace(ob, 2));
    Grid.SetText((GRD_PARKING - 1), 0, setNumReplace(obip, 2));
    Grid.SetText((GRD_SPECIALASS - 1), 0, setNumReplace(interest, 2));
    Grid.SetText((GRD_OTHERAREA - 1), 0, setNumReplace(penalty, 2));
    Grid.SetText((GRD_NETOFVAT - 1), 0, setNumReplace(netvat, 2));
    Grid.SetText((GRD_VAT - 1), 0, setNumReplace(vat, 2));
    Grid.SetText((GRD_GROSSAMOUNT - 1), 0, setNumReplace(grossamntip, 2));
}

function resetGrid() {
    var Grid = nwGridConCustom_Book.ActiveSheet;
    var maxLen = Grid.GetMaxRow();

    Grid.RowDelete(0, maxLen);
    Grid.RowAdd(0, 2);

    Grid.SetText((GRD_DOCNO - 1), 0, "Total");
    Grid.SetTextAlign((GRD_DOCNO - 1), 0, "right");
    Grid.SetText((GRD_ASSDUES - 1), 0, setNumReplace(0, 2));
    Grid.SetText((GRD_PARKING - 1), 0, setNumReplace(0, 2));
    Grid.SetText((GRD_SPECIALASS - 1), 0, setNumReplace(0, 2));
    Grid.SetText((GRD_OTHERAREA - 1), 0, setNumReplace(0, 2));
    Grid.SetText((GRD_NETOFVAT - 1), 0, setNumReplace(0, 2));
    Grid.SetText((GRD_VAT - 1), 0, setNumReplace(0, 2));
    Grid.SetText((GRD_GROSSAMOUNT - 1), 0, setNumReplace(0, 2));
}

$(document).on("click", '#btnExport', function () {
    if ($("#nwGridConCustom").enable()) {
        if ($('#idvallugLocAcctForms').val() != '' && $('#idvallugPhase').val() != '' && $('#txtParticular').val() != '' && $('#txtInvoiceDate').val() != '' && $('#cboMonthly').val() != '' && $('#cboYearly').val() != '') {
            cust_GetPara();
            nwLoading_Start("xactDownloadtemplate", crLoadingHTML);
            func_ActionDriven("actDownloadtemplate", false);

        } else {
            MessageBox("Please complete the required header first.", pageTitle);
        }
    }

    return false;
});
