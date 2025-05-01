
var tag1 = "";
var tag2 = "";
var xsessionstamp = "";
var totalCurrentConsumption = 0;
var msgUtilities = "";
var allowable = "";
var nwDocno;

var nwGridCon_Book;
var nwGridCon_Sheet;

var SPR_startIndex = 0,
SPR_ACCNO = ++SPR_startIndex,
SPR_CUSTNAME = ++SPR_startIndex,
SPR_UNITNO = ++SPR_startIndex,
SPR_DOCNO = ++SPR_startIndex,
SPR_OB = ++SPR_startIndex,
SPR_OBIP = ++SPR_startIndex,
SPR_INTEREST = ++SPR_startIndex,
SPR_PENALTY = ++SPR_startIndex,
SPR_IP = ++SPR_startIndex,
SPR_NETVAT = ++SPR_startIndex,
SPR_VAT = ++SPR_startIndex,
SPR_GROSSAMNTIP = ++SPR_startIndex,
SPR_UNITCODE = ++SPR_startIndex;

var _indef;
var _enume;

function func_Reload() {
    crLnk = GetCurrentURL() + "PMOInvoiceEntryIntPen_Gateway";
    crLnkGateKey = "PMOInvoiceEntryIntPen";
    //crnwTagSingleBind = true;
    
    var isContinue = true;
    init_request();
    DisableFields();
    func_checkisView();
    ToolBoxGetData = false;

    return isContinue;
}

function func_ToolboxADD(indef, enume) {
    var isContinue = true;
    EnableFields();
    ClearFields();
    func_Toolbox_Clear();
    resetGrid();
    return isContinue;
}

var isCondition = true;
function func_ToolboxSave(indef, enume) {
    var isContinue = true;
    if (isCondition) {
        getMsgBox();
        isCondition = false;
    }
    else {
        cust_GetPara();
        parent_MessageBoxQuestionToolBox("Do you want to save the current record?", pageTitle, "", indef, enume);
        isCondition = true;
    }
    isContinue = false;

    return isContinue;
}

function func_ToolboxDelete(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to delete the current record?", pageTitle, "", indef, enume);
    isContinue = false;

    return isContinue;
}

function func_ToolboxRefresh(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    nwLoading_Start("xRefreshData", crLoadingHTML);
    isRefreshed = true;

    return isContinue;
}

function func_ToolboxInquire(indef, enume) {
    var isContinue = true;

    return isContinue;
}

function func_ToolboxProcess(indef, enume) {
    var isContinue = true;
    cust_GetPara();
    parent_MessageBoxQuestionToolBox("Do you want to process the current record?", pageTitle, "", indef, enume);
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

function func_checkisView() {
    if (getParameterByName("nwDocno") != "") {
        nwDocno = getParameterByName("nwDocno");
        $('#noah-webui-Toolbox-BindingNavigator').visible(false);
        $('#noah-webui-default-Refresh').click();
    }
    else
        nwDocno = '';
}

function cust_GetPara() {
    nwDocno = getParameterByName("nwDocno");
    nwParameter_Add("nwDocno", nwDocno);

    nwParameter_Add("LocAccountFormCode", $('#idvallugAccountableForms').val());
    nwParameter_Add("idvallugLocAccForms", $('#idvallugLocAccForms').val());
    nwParameter_Add("idvallugPhaseTower", $('#idvallugPhaseTower').val());
    nwParameter_Add("txtRemarks", $('#txtRemarks').val());
    nwParameter_Add("ddIPType", $('#ddIPType').val());
    nwParameter_Add("ddBPMonth", $('#ddBPMonth').val());
    nwParameter_Add("ddBPYear", $('#ddBPYear').val());
    nwParameter_Add("txtInvoiceDate", $('#txtInvoiceDate').val());

    nwParameter_Add("txtBatchNo", $('#txtBatchNo').val());
    nwParameter_Add("txtDateSubmit", $('#txtDateSubmit').val());
    nwParameter_Add("txtDatePosted", $('#txtDatePosted').val());
    nwParameter_Add("idvallugRsnDisApp", $('#idvallugRsnDisApp').val());
    nwParameter_Add("txtDisAppRemarks", $('#txtDisAppRemarks').val());

    nwParameter_Add("txtStatus", $('#txtStatusCode').val());
    nwParameter_Add("txtInterestRate", $('#txtInterestRate').val());
    nwParameter_Add("txtPenaltyRate", $('#txtPenaltyRate').val());
    nwParameter_Add("txtIntCharge", $('#txtIntCharge').val());
    nwParameter_Add("txtPenCharge", $('#txtPenCharge').val());
    nwParameter_Add("txtTaxCode", $('#txtTaxCode').val());

    try{
        nwParameter_Add_DataSet("nwGridCon");
    } catch (e) {  }
}

function func_ToolboxNavigatorBind(enume) {
    var isContinue = true;
    cust_GetPara();
    return isContinue;
}

function func_ToolboxNavigatorBind_Done() {
    cust_GetPara();
    nwLoading_Start("xactBindCollection", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollection", false);
}

function func_ToolboxNavigatorBind_Empty() {
    nwLoading_Start("xactBindCollectionEmpty", crLoadingHTML);
    RefreshData();
    func_ActionDriven("actBindCollectionEmpty", false);
}

function RefreshData() {
    var TotalRecords = $('div.BN-record span').text();
    if (TotalRecords === 'of 0') {
        DisableFieldsEmpty();
    }
    else {
        EnableFieldsDone();
    }
}

function getGridData(idnum, index) {
    var data = $("#menuCreatorContainer .nk-modal-body #nkLookupCon table tbody tr:eq(" + (idnum - 1) + ") td:eq(" + index + ") span").text();
    return data;
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

function EnableFields() {
    $('#lugLocAccForms').enable(true);
    $('#lugPhaseTower').enable(true);
    $('#txtRemarks').enable(true);
    $('#ddIPType').enable(true);
    $('#ddBPMonth').enable(true);
    $('#ddBPYear').enable(true);
    $('#txtInvoiceDate').enable(true);

    $('#btnDocumentAttached').enable(false);

    $('#nwGridCon').enable(true);

    $("#noah-webui-Toolbox").bindingNew().enable(false);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
}

function DisableFields() {
    $('#lugLocAccForms').enable(false);
    $('#lugPhaseTower').enable(false);
    $('#txtRemarks').enable(false);
    $('#ddIPType').enable(false);
    $('#ddBPMonth').enable(false);
    $('#ddBPYear').enable(false);
    $('#txtInvoiceDate').enable(false);
    $('#txtBatchNo').enable(false);
    $('#txtDateSubmit').enable(false);
    $('#txtDatePosted').enable(false);
    $('#lugRsnDisApp').enable(false);
    $('#txtDisAppRemarks').enable(false);

    $('#btnDocumentAttached').enable(false);

    $('#nwGridCon').enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
    $("#noah-webui-Toolbox").bindingExport().enable(false);
    $("#noah-webui-Toolbox").bindingExport().visible(false);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
}

function EnableFieldsDone() {//Binding Done
    $('#lugLocAccForms').enable(false);
    $('#lugPhaseTower').enable(false);
    $('#txtRemarks').enable(false);
    $('#ddIPType').enable(false);
    $('#ddBPMonth').enable(false);
    $('#ddBPYear').enable(false);
    $('#txtInvoiceDate').enable(false);

    $('#btnDocumentAttached').enable(true);

    $('#nwGridCon').enable(true);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(true);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(true);
}

function DisableFieldsEmpty() {
    $('#lugLocAccForms').enable(false);
    $('#lugPhaseTower').enable(false);
    $('#txtRemarks').enable(false);
    $('#ddIPType').enable(false);
    $('#ddBPMonth').enable(false);
    $('#ddBPYear').enable(false);
    $('#txtInvoiceDate').enable(false);

    $('#btnDocumentAttached').enable(false);

    $('#nwGridCon').enable(false);

    $("#noah-webui-Toolbox").bindingNew().enable(true);
    $("#noah-webui-Toolbox").bindingSave().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().enable(false);
    $("#noah-webui-Toolbox").bindingDelete().visible(true);
    $("#noah-webui-Toolbox").bindingRefresh().enable(true);
    $("#noah-webui-Toolbox").bindingProcess().enable(false);
    $("#noah-webui-Toolbox").bindingInquire().enable(false);
}

function ClearFields() {
    $('.clrs').val("");
    $('#txtRemarks').val("");
    $('#ddIPType').val("");
    $('#ddBPMonth').val("");
    $('#ddBPYear').val("");
    $('#txtInvoiceDate').val("");

    $('#txtBatchNo').val("");
    $('#txtDateSubmit').val("");
    $('#txtDatePosted').val("");
    $('#txtDisAppRemarks').val("");
}

function showAllowable(msg) {
    cust_GetPara();
    if (msg != "") {
        var msgBox = new GenLib.MessageBox("id");
        var msgBox2 = new GenLib.MessageBox("id2");
        msgBox.message = msg;
        msgBox.title = pageTitle;

        msgBox.buttonOk = function () {
            setTimeout(function () {
                cust_GetPara();
                $('#noah-webui-default-Save').click();
            }, 200);
            return true; // close the window // false will not close the window
        };
        msgBox.buttonClose = function () {
            return true; // close the window // false will not close the window
        };
        msgBox.Show();
    } else {
        setTimeout(function () {
            cust_GetPara();
            $('#noah-webui-default-Save').click();
        }, 200);
    }
}

function isValid(value) {
    var x;
    if (!isFinite(value)) {
        x = 0;
    } else if (value.length <= 0) {
        x = 0;
    }else {
        x = value;
    }
    return x;
}

function getMsgBox() {
    cust_GetPara();
    nwParameter_Add_Table("dvgridentry", false);
    nwLoading_Start("xactGenerateMsg", crLoadingHTML);
    func_ActionDriven("actGenerateMsg", false);
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
        nwParameter_Add("txtBatchNo", $('#txtBatchNo').val());
        func_ActionDriven("actchkIfhasReqComp", false);
    }

    return isContinue;
}

function ReloadMonth() {
    var currentTime = new Date();
    var year = currentTime.getFullYear();
    var month = currentTime.getMonth() + 1;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $('#ddBPMonth').html("");
    for (var x = 0; x < 12; x++) {
        var y = x;
        year = currentTime.getFullYear();
        if (y > 11) {
            y = y - 12;
            year = year + 1;
        } else if (y <= -1) {
            y = y + 11;
            year = year - 1;
        }
        //$('#ddBPMonth').append("<option value='" + monthNames[y] + " " + year + "'>" + monthNames[y] + ", " + year + "</option>");
        $('#ddBPMonth').append("<option value='" + (x + 1) + "'>" + monthNames[y] + "</option>");
    }
    $('#ddBPMonth').val(monthNames[month - 1] + " " + year);
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

function p8Spread_Click(canvasID, row, col) {
    _canvasID = canvasID;
    _row = row;
    _col = col;
    var Grid;

    if (!($("#" + canvasID).enable())) {
        return false;
    }

    return true;
}

function p8Spread_DblClick(canvasID, row, col) {
    _canvasID = canvasID;
    _row = row;
    _col = col;
    var Grid;

    if (!($("#" + canvasID).enable())) {
        return false;
    }

    return true;
}

function resetGrid() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var maxLen = Grid.GetMaxRow();

    Grid.RowDelete(0, maxLen);
    Grid.RowAdd(0, 2);

    Grid.SetText((SPR_DOCNO - 1), 0, "Total");
    Grid.SetTextAlign((SPR_DOCNO - 1), 0, "right");
    Grid.SetText((SPR_OB - 1), 0, setNumReplace(0, 2));
    Grid.SetText((SPR_OBIP - 1), 0, setNumReplace(0, 2));
    Grid.SetText((SPR_INTEREST - 1), 0, setNumReplace(0, 2));
    Grid.SetText((SPR_PENALTY - 1), 0, setNumReplace(0, 2));
    Grid.SetText((SPR_IP - 1), 0, setNumReplace(0, 2));
    Grid.SetText((SPR_NETVAT - 1), 0, setNumReplace(0, 2));
    Grid.SetText((SPR_VAT - 1), 0, setNumReplace(0, 2));
    Grid.SetText((SPR_GROSSAMNTIP - 1), 0, setNumReplace(0, 2));

    //getTotalGrid();
}

function getTotalGrid() {
    var Grid = nwGridCon_Book.ActiveSheet;
    var maxRow = Grid.GetMaxRow();
    var ob = 0, obip = 0, interest = 0, penalty = 0, ip = 0, netvat = 0, vat = 0, grossamntip = 0;
    Grid.RowAdd(1, 1);

    for (var x = 0; x <= maxRow; x++) {
        ob += parseFloat(Grid.GetText((SPR_OB - 1), x).replaceAll(",", "")) || 0;
        obip += parseFloat(Grid.GetText((SPR_OBIP - 1), x).replaceAll(",", "")) || 0;
        interest += parseFloat(Grid.GetText((SPR_INTEREST - 1), x).replaceAll(",", "")) || 0;
        penalty += parseFloat(Grid.GetText((SPR_PENALTY - 1), x).replaceAll(",", "")) || 0;
        ip += parseFloat(Grid.GetText((SPR_IP - 1), x).replaceAll(",", "")) || 0;
        netvat += parseFloat(Grid.GetText((SPR_NETVAT - 1), x).replaceAll(",", "")) || 0;
        vat += parseFloat(Grid.GetText((SPR_VAT - 1), x).replaceAll(",", "")) || 0;
        grossamntip += parseFloat(Grid.GetText((SPR_GROSSAMNTIP - 1), x).replaceAll(",", "")) || 0;
    }

    Grid.SetText((SPR_DOCNO - 1), 0, "Total");
    Grid.SetTextAlign((SPR_DOCNO - 1), 0, "right");
    Grid.SetText((SPR_OB - 1), 0, setNumReplace(ob, 2));
    Grid.SetText((SPR_OBIP - 1), 0, setNumReplace(obip, 2));
    Grid.SetText((SPR_INTEREST - 1), 0, setNumReplace(interest, 2));
    Grid.SetText((SPR_PENALTY - 1), 0, setNumReplace(penalty, 2));
    Grid.SetText((SPR_IP - 1), 0, setNumReplace(ip, 2));
    Grid.SetText((SPR_NETVAT - 1), 0, setNumReplace(netvat, 2));
    Grid.SetText((SPR_VAT - 1), 0, setNumReplace(vat, 2));
    Grid.SetText((SPR_GROSSAMNTIP - 1), 0, setNumReplace(grossamntip, 2));

    $("#btnLoadDetails").addClass("btn-default btn-default-orange");

    //Grid.SetEnable((SPR_SELECT - 1), Spread_ALLROW, $('#nwGridCon').enable());
}

$(document).on("click", '#btnLoadDetails', function () {
    if ($("#nwGridCon").enable()) {
        if ($('#idvallugLocAccForms').val() != '' && $('#idvallugPhaseTower').val() != '' && $('#txtRemarks').val() != '' && $('#ddIPType').val() != '' && $('#ddBPMonth').val() != '' && $('#ddBPYear').val() != '' && $('#txtDueDate').val() != '' && $('#txtInvoiceDate').val() != '') {
            nwLoading_Start("xactLoadDetails", crLoadingHTML);
            cust_GetPara();
            func_ActionDriven("actLoadDetails");

        } else {
            MessageBox("Please complete the required header first.", pageTitle);
        }
    }

    return false;
});

$(document).on("change", "#ddBPMonth, #ddBPYear", function (e) {
    resetGrid();
});

$(document).on("change", "#txtInvoiceDate", function (e) {
    var InvoiceDate = $(this).val();
    if (InvoiceDate == '__/__/____')
        InvoiceDate = '';
    if (InvoiceDate != "") {
        var serverdate = getCurrentDate();

        if (Date.parse(InvoiceDate) < Date.parse(serverdate)) {
            MessageBox("Cannot be continued. Invoice Date should be equal to or later than the current server date.", "Utilities Billing Threshold", "error");
            $("#txtInvoiceDate").val("");
        }
    }
});

$(document).on("click", '#btnExport', function () {
    if ($("#nwGridCon").enable()) {
        if ($('#idvallugLocAccForms').val() != '' && $('#idvallugPhaseTower').val() != '' && $('#txtRemarks').val() != '' && $('#ddIPType').val() != '' && $('#ddBPMonth').val() != '' && $('#ddBPYear').val() != '' && $('#txtDueDate').val() != '' && $('#txtInvoiceDate').val() != '') {
            cust_GetPara();
            nwLoading_Start("xactDownloadtemplate", crLoadingHTML);
            func_ActionDriven("actDownloadtemplate", false);

        } else {
            MessageBox("Please complete the required header first.", pageTitle);
        }
    }

    return false;
});

$(document).on("click", "#btnDocumentAttached", function (e) {

    var trantype = "INVOIC";
    var docno = $('#txtBatchNo').val();
    if (docno != "") {
        var isView = nwDocno != "" ? true : false;
        var fullength = GetCurrentURL() + "../DCRequirementCompliance?TransactionNo=" + docno + "&TranType=" + trantype + "&isView=" + isView + "";
        nwLoading_Start('btnReqCompliance', crLoadingHTML);
        nwPopupForm_Create("ViewReqCompliance", true, fullength);
        $('#ViewReqCompliance .modal-hdr-title').text("Requirements Compliance");
        nwPopupForm_ShowModal("ViewReqCompliance");
        nwLoading_End('btnReqCompliance');
    }

    return false;
});